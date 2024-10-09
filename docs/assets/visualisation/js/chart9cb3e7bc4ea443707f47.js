(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_bar_plot_js"],{

/***/ "./node_modules/plotly.js/src/traces/bar/helpers.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/helpers.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

exports.coerceString = function(attributeDefinition, value, defaultValue) {
    if(typeof value === 'string') {
        if(value || !attributeDefinition.noBlank) return value;
    } else if(typeof value === 'number' || value === true) {
        if(!attributeDefinition.strict) return String(value);
    }

    return (defaultValue !== undefined) ?
      defaultValue :
      attributeDefinition.dflt;
};

exports.coerceNumber = function(attributeDefinition, value, defaultValue) {
    if(isNumeric(value)) {
        value = +value;

        var min = attributeDefinition.min;
        var max = attributeDefinition.max;
        var isOutOfBounds = (min !== undefined && value < min) ||
              (max !== undefined && value > max);

        if(!isOutOfBounds) return value;
    }

    return (defaultValue !== undefined) ?
      defaultValue :
      attributeDefinition.dflt;
};

exports.coerceColor = function(attributeDefinition, value, defaultValue) {
    if(tinycolor(value).isValid()) return value;

    return (defaultValue !== undefined) ?
      defaultValue :
      attributeDefinition.dflt;
};

exports.coerceEnumerated = function(attributeDefinition, value, defaultValue) {
    if(attributeDefinition.coerceNumber) value = +value;

    if(attributeDefinition.values.indexOf(value) !== -1) return value;

    return (defaultValue !== undefined) ?
      defaultValue :
      attributeDefinition.dflt;
};

exports.getValue = function(arrayOrScalar, index) {
    var value;
    if(!Array.isArray(arrayOrScalar)) value = arrayOrScalar;
    else if(index < arrayOrScalar.length) value = arrayOrScalar[index];
    return value;
};

exports.getLineWidth = function(trace, di) {
    var w =
        (0 < di.mlw) ? di.mlw :
        !isArrayOrTypedArray(trace.marker.line.width) ? trace.marker.line.width :
        0;

    return w;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/plot.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/plot.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");

var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var tickText = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js").tickText;

var uniformText = __webpack_require__(/*! ./uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js");
var recordMinTextSize = uniformText.recordMinTextSize;
var clearMinTextSize = uniformText.clearMinTextSize;

var style = __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/bar/style.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/bar/helpers.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/bar/constants.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js");

var attributeText = attributes.text;
var attributeTextPosition = attributes.textposition;

var appendArrayPointValue = __webpack_require__(/*! ../../components/fx/helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").appendArrayPointValue;

var TEXTPAD = constants.TEXTPAD;

function keyFunc(d) {return d.id;}
function getKeyFunc(trace) {
    if(trace.ids) {
        return keyFunc;
    }
}

function dirSign(a, b) {
    return (a < b) ? 1 : -1;
}

function getXY(di, xa, ya, isHorizontal) {
    var s = [];
    var p = [];

    var sAxis = isHorizontal ? xa : ya;
    var pAxis = isHorizontal ? ya : xa;

    s[0] = sAxis.c2p(di.s0, true);
    p[0] = pAxis.c2p(di.p0, true);

    s[1] = sAxis.c2p(di.s1, true);
    p[1] = pAxis.c2p(di.p1, true);

    return isHorizontal ? [s, p] : [p, s];
}

function transition(selection, fullLayout, opts, makeOnCompleteCallback) {
    if(!fullLayout.uniformtext.mode && hasTransition(opts)) {
        var onComplete;
        if(makeOnCompleteCallback) {
            onComplete = makeOnCompleteCallback();
        }
        return selection
          .transition()
          .duration(opts.duration)
          .ease(opts.easing)
          .each('end', function() { onComplete && onComplete(); })
          .each('interrupt', function() { onComplete && onComplete(); });
    } else {
        return selection;
    }
}

function hasTransition(transitionOpts) {
    return transitionOpts && transitionOpts.duration > 0;
}

function plot(gd, plotinfo, cdModule, traceLayer, opts, makeOnCompleteCallback) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;
    var fullLayout = gd._fullLayout;

    if(!opts) {
        opts = {
            mode: fullLayout.barmode,
            norm: fullLayout.barmode,
            gap: fullLayout.bargap,
            groupgap: fullLayout.bargroupgap
        };

        // don't clear bar when this is called from waterfall or funnel
        clearMinTextSize('bar', fullLayout);
    }

    var bartraces = Lib.makeTraceGroups(traceLayer, cdModule, 'trace bars').each(function(cd) {
        var plotGroup = d3.select(this);
        var trace = cd[0].trace;
        var isWaterfall = (trace.type === 'waterfall');
        var isFunnel = (trace.type === 'funnel');
        var isBar = (trace.type === 'bar');
        var shouldDisplayZeros = (isBar || isFunnel);

        var adjustPixel = 0;
        if(isWaterfall && trace.connector.visible && trace.connector.mode === 'between') {
            adjustPixel = trace.connector.line.width / 2;
        }

        var isHorizontal = (trace.orientation === 'h');
        var withTransition = hasTransition(opts);

        var pointGroup = Lib.ensureSingle(plotGroup, 'g', 'points');

        var keyFunc = getKeyFunc(trace);
        var bars = pointGroup.selectAll('g.point').data(Lib.identity, keyFunc);

        bars.enter().append('g')
            .classed('point', true);

        bars.exit().remove();

        bars.each(function(di, i) {
            var bar = d3.select(this);

            // now display the bar
            // clipped xf/yf (2nd arg true): non-positive
            // log values go off-screen by plotwidth
            // so you see them continue if you drag the plot
            var xy = getXY(di, xa, ya, isHorizontal);

            var x0 = xy[0][0];
            var x1 = xy[0][1];
            var y0 = xy[1][0];
            var y1 = xy[1][1];

            // empty bars
            var isBlank = (isHorizontal ? x1 - x0 : y1 - y0) === 0;

            // display zeros if line.width > 0
            if(isBlank && shouldDisplayZeros && helpers.getLineWidth(trace, di)) {
                isBlank = false;
            }

            // skip nulls
            if(!isBlank) {
                isBlank = (
                    !isNumeric(x0) ||
                    !isNumeric(x1) ||
                    !isNumeric(y0) ||
                    !isNumeric(y1)
                );
            }

            // record isBlank
            di.isBlank = isBlank;

            // for blank bars, ensure start and end positions are equal - important for smooth transitions
            if(isBlank) {
                if(isHorizontal) {
                    x1 = x0;
                } else {
                    y1 = y0;
                }
            }

            // in waterfall mode `between` we need to adjust bar end points to match the connector width
            if(adjustPixel && !isBlank) {
                if(isHorizontal) {
                    x0 -= dirSign(x0, x1) * adjustPixel;
                    x1 += dirSign(x0, x1) * adjustPixel;
                } else {
                    y0 -= dirSign(y0, y1) * adjustPixel;
                    y1 += dirSign(y0, y1) * adjustPixel;
                }
            }

            var lw;
            var mc;

            if(trace.type === 'waterfall') {
                if(!isBlank) {
                    var cont = trace[di.dir].marker;
                    lw = cont.line.width;
                    mc = cont.color;
                }
            } else {
                lw = helpers.getLineWidth(trace, di);
                mc = di.mc || trace.marker.color;
            }

            function roundWithLine(v) {
                var offset = d3.round((lw / 2) % 1, 2);

                // if there are explicit gaps, don't round,
                // it can make the gaps look crappy
                return (opts.gap === 0 && opts.groupgap === 0) ?
                    d3.round(Math.round(v) - offset, 2) : v;
            }

            function expandToVisible(v, vc, hideZeroSpan) {
                if(hideZeroSpan && v === vc) {
                    // should not expand zero span bars
                    // when start and end positions are identical
                    // i.e. for vertical when y0 === y1
                    // and for horizontal when x0 === x1
                    return v;
                }

                // if it's not in danger of disappearing entirely,
                // round more precisely
                return Math.abs(v - vc) >= 2 ? roundWithLine(v) :
                // but if it's very thin, expand it so it's
                // necessarily visible, even if it might overlap
                // its neighbor
                (v > vc ? Math.ceil(v) : Math.floor(v));
            }

            if(!gd._context.staticPlot) {
                // if bars are not fully opaque or they have a line
                // around them, round to integer pixels, mainly for
                // safari so we prevent overlaps from its expansive
                // pixelation. if the bars ARE fully opaque and have
                // no line, expand to a full pixel to make sure we
                // can see them

                var op = Color.opacity(mc);
                var fixpx = (op < 1 || lw > 0.01) ? roundWithLine : expandToVisible;

                x0 = fixpx(x0, x1, isHorizontal);
                x1 = fixpx(x1, x0, isHorizontal);
                y0 = fixpx(y0, y1, !isHorizontal);
                y1 = fixpx(y1, y0, !isHorizontal);
            }

            var sel = transition(Lib.ensureSingle(bar, 'path'), fullLayout, opts, makeOnCompleteCallback);
            sel
                .style('vector-effect', 'non-scaling-stroke')
                .attr('d', isNaN((x1 - x0) * (y1 - y0)) ? 'M0,0Z' : 'M' + x0 + ',' + y0 + 'V' + y1 + 'H' + x1 + 'V' + y0 + 'Z')
                .call(Drawing.setClipUrl, plotinfo.layerClipId, gd);

            if(!fullLayout.uniformtext.mode && withTransition) {
                var styleFns = Drawing.makePointStyleFns(trace);
                Drawing.singlePointStyle(di, sel, trace, styleFns, gd);
            }

            appendBarText(gd, plotinfo, bar, cd, i, x0, x1, y0, y1, opts, makeOnCompleteCallback);

            if(plotinfo.layerClipId) {
                Drawing.hideOutsideRangePoint(di, bar.select('text'), xa, ya, trace.xcalendar, trace.ycalendar);
            }
        });

        // lastly, clip points groups of `cliponaxis !== false` traces
        // on `plotinfo._hasClipOnAxisFalse === true` subplots
        var hasClipOnAxisFalse = trace.cliponaxis === false;
        Drawing.setClipUrl(plotGroup, hasClipOnAxisFalse ? null : plotinfo.layerClipId, gd);
    });

    // error bars are on the top
    Registry.getComponentMethod('errorbars', 'plot')(gd, bartraces, plotinfo, opts);
}

function appendBarText(gd, plotinfo, bar, cd, i, x0, x1, y0, y1, opts, makeOnCompleteCallback) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    var fullLayout = gd._fullLayout;
    var textPosition;

    function appendTextNode(bar, text, font) {
        var textSelection = Lib.ensureSingle(bar, 'text')
            .text(text)
            .attr({
                'class': 'bartext bartext-' + textPosition,
                'text-anchor': 'middle',
                // prohibit tex interpretation until we can handle
                // tex and regular text together
                'data-notex': 1
            })
            .call(Drawing.font, font)
            .call(svgTextUtils.convertToTspans, gd);

        return textSelection;
    }

    // get trace attributes
    var trace = cd[0].trace;
    var isHorizontal = (trace.orientation === 'h');

    var text = getText(fullLayout, cd, i, xa, ya);
    textPosition = getTextPosition(trace, i);

    // compute text position
    var inStackOrRelativeMode =
        opts.mode === 'stack' ||
        opts.mode === 'relative';

    var calcBar = cd[i];
    var isOutmostBar = !inStackOrRelativeMode || calcBar._outmost;

    if(!text ||
        textPosition === 'none' ||
        ((calcBar.isBlank || x0 === x1 || y0 === y1) && (
            textPosition === 'auto' ||
            textPosition === 'inside'))) {
        bar.select('text').remove();
        return;
    }

    var layoutFont = fullLayout.font;
    var barColor = style.getBarColor(cd[i], trace);
    var insideTextFont = style.getInsideTextFont(trace, i, layoutFont, barColor);
    var outsideTextFont = style.getOutsideTextFont(trace, i, layoutFont);

    // Special case: don't use the c2p(v, true) value on log size axes,
    // so that we can get correctly inside text scaling
    var di = bar.datum();
    if(isHorizontal) {
        if(xa.type === 'log' && di.s0 <= 0) {
            if(xa.range[0] < xa.range[1]) {
                x0 = 0;
            } else {
                x0 = xa._length;
            }
        }
    } else {
        if(ya.type === 'log' && di.s0 <= 0) {
            if(ya.range[0] < ya.range[1]) {
                y0 = ya._length;
            } else {
                y0 = 0;
            }
        }
    }

    // padding excluded
    var barWidth = Math.abs(x1 - x0) - 2 * TEXTPAD;
    var barHeight = Math.abs(y1 - y0) - 2 * TEXTPAD;

    var textSelection;
    var textBB;
    var textWidth;
    var textHeight;
    var font;

    if(textPosition === 'outside') {
        if(!isOutmostBar && !calcBar.hasB) textPosition = 'inside';
    }

    if(textPosition === 'auto') {
        if(isOutmostBar) {
            // draw text using insideTextFont and check if it fits inside bar
            textPosition = 'inside';

            font = Lib.ensureUniformFontSize(gd, insideTextFont);

            textSelection = appendTextNode(bar, text, font);

            textBB = Drawing.bBox(textSelection.node()),
            textWidth = textBB.width,
            textHeight = textBB.height;

            var textHasSize = (textWidth > 0 && textHeight > 0);
            var fitsInside = (textWidth <= barWidth && textHeight <= barHeight);
            var fitsInsideIfRotated = (textWidth <= barHeight && textHeight <= barWidth);
            var fitsInsideIfShrunk = (isHorizontal) ?
                (barWidth >= textWidth * (barHeight / textHeight)) :
                (barHeight >= textHeight * (barWidth / textWidth));

            if(textHasSize && (
                fitsInside ||
                fitsInsideIfRotated ||
                fitsInsideIfShrunk)
            ) {
                textPosition = 'inside';
            } else {
                textPosition = 'outside';
                textSelection.remove();
                textSelection = null;
            }
        } else {
            textPosition = 'inside';
        }
    }

    if(!textSelection) {
        font = Lib.ensureUniformFontSize(gd, (textPosition === 'outside') ? outsideTextFont : insideTextFont);

        textSelection = appendTextNode(bar, text, font);

        var currentTransform = textSelection.attr('transform');
        textSelection.attr('transform', '');
        textBB = Drawing.bBox(textSelection.node()),
        textWidth = textBB.width,
        textHeight = textBB.height;
        textSelection.attr('transform', currentTransform);

        if(textWidth <= 0 || textHeight <= 0) {
            textSelection.remove();
            return;
        }
    }

    var angle = trace.textangle;

    // compute text transform
    var transform, constrained;
    if(textPosition === 'outside') {
        constrained =
            trace.constraintext === 'both' ||
            trace.constraintext === 'outside';

        transform = toMoveOutsideBar(x0, x1, y0, y1, textBB, {
            isHorizontal: isHorizontal,
            constrained: constrained,
            angle: angle
        });
    } else {
        constrained =
            trace.constraintext === 'both' ||
            trace.constraintext === 'inside';

        transform = toMoveInsideBar(x0, x1, y0, y1, textBB, {
            isHorizontal: isHorizontal,
            constrained: constrained,
            angle: angle,
            anchor: trace.insidetextanchor
        });
    }

    transform.fontSize = font.size;
    recordMinTextSize(trace.type, transform, fullLayout);
    calcBar.transform = transform;

    transition(textSelection, fullLayout, opts, makeOnCompleteCallback)
        .attr('transform', Lib.getTextTransform(transform));
}

function getRotateFromAngle(angle) {
    return (angle === 'auto') ? 0 : angle;
}

function getRotatedTextSize(textBB, rotate) {
    var a = Math.PI / 180 * rotate;
    var absSin = Math.abs(Math.sin(a));
    var absCos = Math.abs(Math.cos(a));

    return {
        x: textBB.width * absCos + textBB.height * absSin,
        y: textBB.width * absSin + textBB.height * absCos
    };
}

function toMoveInsideBar(x0, x1, y0, y1, textBB, opts) {
    var isHorizontal = !!opts.isHorizontal;
    var constrained = !!opts.constrained;
    var angle = opts.angle || 0;
    var anchor = opts.anchor || 'end';
    var isEnd = anchor === 'end';
    var isStart = anchor === 'start';
    var leftToRight = opts.leftToRight || 0; // left: -1, center: 0, right: 1
    var toRight = (leftToRight + 1) / 2;
    var toLeft = 1 - toRight;

    var textWidth = textBB.width;
    var textHeight = textBB.height;
    var lx = Math.abs(x1 - x0);
    var ly = Math.abs(y1 - y0);

    // compute remaining space
    var textpad = (
        lx > (2 * TEXTPAD) &&
        ly > (2 * TEXTPAD)
    ) ? TEXTPAD : 0;

    lx -= 2 * textpad;
    ly -= 2 * textpad;

    var rotate = getRotateFromAngle(angle);
    if((angle === 'auto') &&
        !(textWidth <= lx && textHeight <= ly) &&
        (textWidth > lx || textHeight > ly) && (
        !(textWidth > ly || textHeight > lx) ||
        ((textWidth < textHeight) !== (lx < ly))
    )) {
        rotate += 90;
    }

    var t = getRotatedTextSize(textBB, rotate);

    var scale = 1;
    if(constrained) {
        scale = Math.min(
            1,
            lx / t.x,
            ly / t.y
        );
    }

    // compute text and target positions
    var textX = (
        textBB.left * toLeft +
        textBB.right * toRight
    );
    var textY = (textBB.top + textBB.bottom) / 2;
    var targetX = (
        (x0 + TEXTPAD) * toLeft +
        (x1 - TEXTPAD) * toRight
    );
    var targetY = (y0 + y1) / 2;
    var anchorX = 0;
    var anchorY = 0;
    if(isStart || isEnd) {
        var extrapad = (isHorizontal ? t.x : t.y) / 2;
        var dir = isHorizontal ? dirSign(x0, x1) : dirSign(y0, y1);

        if(isHorizontal) {
            if(isStart) {
                targetX = x0 + dir * textpad;
                anchorX = -dir * extrapad;
            } else {
                targetX = x1 - dir * textpad;
                anchorX = dir * extrapad;
            }
        } else {
            if(isStart) {
                targetY = y0 + dir * textpad;
                anchorY = -dir * extrapad;
            } else {
                targetY = y1 - dir * textpad;
                anchorY = dir * extrapad;
            }
        }
    }

    return {
        textX: textX,
        textY: textY,
        targetX: targetX,
        targetY: targetY,
        anchorX: anchorX,
        anchorY: anchorY,
        scale: scale,
        rotate: rotate
    };
}

function toMoveOutsideBar(x0, x1, y0, y1, textBB, opts) {
    var isHorizontal = !!opts.isHorizontal;
    var constrained = !!opts.constrained;
    var angle = opts.angle || 0;

    var textWidth = textBB.width;
    var textHeight = textBB.height;
    var lx = Math.abs(x1 - x0);
    var ly = Math.abs(y1 - y0);

    var textpad;
    // Keep the padding so the text doesn't sit right against
    // the bars, but don't factor it into barWidth
    if(isHorizontal) {
        textpad = (ly > 2 * TEXTPAD) ? TEXTPAD : 0;
    } else {
        textpad = (lx > 2 * TEXTPAD) ? TEXTPAD : 0;
    }

    // compute rotate and scale
    var scale = 1;
    if(constrained) {
        scale = (isHorizontal) ?
            Math.min(1, ly / textHeight) :
            Math.min(1, lx / textWidth);
    }

    var rotate = getRotateFromAngle(angle);
    var t = getRotatedTextSize(textBB, rotate);

    // compute text and target positions
    var extrapad = (isHorizontal ? t.x : t.y) / 2;
    var textX = (textBB.left + textBB.right) / 2;
    var textY = (textBB.top + textBB.bottom) / 2;
    var targetX = (x0 + x1) / 2;
    var targetY = (y0 + y1) / 2;
    var anchorX = 0;
    var anchorY = 0;

    var dir = isHorizontal ? dirSign(x1, x0) : dirSign(y0, y1);
    if(isHorizontal) {
        targetX = x1 - dir * textpad;
        anchorX = dir * extrapad;
    } else {
        targetY = y1 + dir * textpad;
        anchorY = -dir * extrapad;
    }

    return {
        textX: textX,
        textY: textY,
        targetX: targetX,
        targetY: targetY,
        anchorX: anchorX,
        anchorY: anchorY,
        scale: scale,
        rotate: rotate
    };
}

function getText(fullLayout, cd, index, xa, ya) {
    var trace = cd[0].trace;
    var texttemplate = trace.texttemplate;

    var value;
    if(texttemplate) {
        value = calcTexttemplate(fullLayout, cd, index, xa, ya);
    } else if(trace.textinfo) {
        value = calcTextinfo(cd, index, xa, ya);
    } else {
        value = helpers.getValue(trace.text, index);
    }

    return helpers.coerceString(attributeText, value);
}

function getTextPosition(trace, index) {
    var value = helpers.getValue(trace.textposition, index);
    return helpers.coerceEnumerated(attributeTextPosition, value);
}

function calcTexttemplate(fullLayout, cd, index, xa, ya) {
    var trace = cd[0].trace;
    var texttemplate = Lib.castOption(trace, index, 'texttemplate');
    if(!texttemplate) return '';
    var isWaterfall = (trace.type === 'waterfall');
    var isFunnel = (trace.type === 'funnel');

    var pLetter, pAxis;
    var vLetter, vAxis;
    if(trace.orientation === 'h') {
        pLetter = 'y';
        pAxis = ya;
        vLetter = 'x';
        vAxis = xa;
    } else {
        pLetter = 'x';
        pAxis = xa;
        vLetter = 'y';
        vAxis = ya;
    }

    function formatLabel(u) {
        return tickText(pAxis, u, true).text;
    }

    function formatNumber(v) {
        return tickText(vAxis, +v, true).text;
    }

    var cdi = cd[index];
    var obj = {};

    obj.label = cdi.p;
    obj.labelLabel = obj[pLetter + 'Label'] = formatLabel(cdi.p);

    var tx = Lib.castOption(trace, cdi.i, 'text');
    if(tx === 0 || tx) obj.text = tx;

    obj.value = cdi.s;
    obj.valueLabel = obj[vLetter + 'Label'] = formatNumber(cdi.s);

    var pt = {};
    appendArrayPointValue(pt, trace, cdi.i);

    if(isWaterfall) {
        obj.delta = +cdi.rawS || cdi.s;
        obj.deltaLabel = formatNumber(obj.delta);
        obj.final = cdi.v;
        obj.finalLabel = formatNumber(obj.final);
        obj.initial = obj.final - obj.delta;
        obj.initialLabel = formatNumber(obj.initial);
    }

    if(isFunnel) {
        obj.value = cdi.s;
        obj.valueLabel = formatNumber(obj.value);

        obj.percentInitial = cdi.begR;
        obj.percentInitialLabel = Lib.formatPercent(cdi.begR);
        obj.percentPrevious = cdi.difR;
        obj.percentPreviousLabel = Lib.formatPercent(cdi.difR);
        obj.percentTotal = cdi.sumR;
        obj.percenTotalLabel = Lib.formatPercent(cdi.sumR);
    }

    var customdata = Lib.castOption(trace, cdi.i, 'customdata');
    if(customdata) obj.customdata = customdata;
    return Lib.texttemplateString(texttemplate, obj, fullLayout._d3locale, pt, obj, trace._meta || {});
}

function calcTextinfo(cd, index, xa, ya) {
    var trace = cd[0].trace;
    var isHorizontal = (trace.orientation === 'h');
    var isWaterfall = (trace.type === 'waterfall');
    var isFunnel = (trace.type === 'funnel');

    function formatLabel(u) {
        var pAxis = isHorizontal ? ya : xa;
        return tickText(pAxis, u, true).text;
    }

    function formatNumber(v) {
        var sAxis = isHorizontal ? xa : ya;
        return tickText(sAxis, +v, true).text;
    }

    var textinfo = trace.textinfo;
    var cdi = cd[index];

    var parts = textinfo.split('+');
    var text = [];
    var tx;

    var hasFlag = function(flag) { return parts.indexOf(flag) !== -1; };

    if(hasFlag('label')) {
        text.push(formatLabel(cd[index].p));
    }

    if(hasFlag('text')) {
        tx = Lib.castOption(trace, cdi.i, 'text');
        if(tx === 0 || tx) text.push(tx);
    }

    if(isWaterfall) {
        var delta = +cdi.rawS || cdi.s;
        var final = cdi.v;
        var initial = final - delta;

        if(hasFlag('initial')) text.push(formatNumber(initial));
        if(hasFlag('delta')) text.push(formatNumber(delta));
        if(hasFlag('final')) text.push(formatNumber(final));
    }

    if(isFunnel) {
        if(hasFlag('value')) text.push(formatNumber(cdi.s));

        var nPercent = 0;
        if(hasFlag('percent initial')) nPercent++;
        if(hasFlag('percent previous')) nPercent++;
        if(hasFlag('percent total')) nPercent++;

        var hasMultiplePercents = nPercent > 1;

        if(hasFlag('percent initial')) {
            tx = Lib.formatPercent(cdi.begR);
            if(hasMultiplePercents) tx += ' of initial';
            text.push(tx);
        }
        if(hasFlag('percent previous')) {
            tx = Lib.formatPercent(cdi.difR);
            if(hasMultiplePercents) tx += ' of previous';
            text.push(tx);
        }
        if(hasFlag('percent total')) {
            tx = Lib.formatPercent(cdi.sumR);
            if(hasMultiplePercents) tx += ' of total';
            text.push(tx);
        }
    }

    return text.join('<br>');
}

module.exports = {
    plot: plot,
    toMoveInsideBar: toMoveInsideBar
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/style.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/style.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

var resizeText = __webpack_require__(/*! ./uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").resizeText;
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js");
var attributeTextFont = attributes.textfont;
var attributeInsideTextFont = attributes.insidetextfont;
var attributeOutsideTextFont = attributes.outsidetextfont;
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/bar/helpers.js");

function style(gd) {
    var s = d3.select(gd).selectAll('g.barlayer').selectAll('g.trace');
    resizeText(gd, s, 'bar');

    var barcount = s.size();
    var fullLayout = gd._fullLayout;

    // trace styling
    s.style('opacity', function(d) { return d[0].trace.opacity; })

    // for gapless (either stacked or neighboring grouped) bars use
    // crispEdges to turn off antialiasing so an artificial gap
    // isn't introduced.
    .each(function(d) {
        if((fullLayout.barmode === 'stack' && barcount > 1) ||
                (fullLayout.bargap === 0 &&
                 fullLayout.bargroupgap === 0 &&
                 !d[0].trace.marker.line.width)) {
            d3.select(this).attr('shape-rendering', 'crispEdges');
        }
    });

    s.selectAll('g.points').each(function(d) {
        var sel = d3.select(this);
        var trace = d[0].trace;
        stylePoints(sel, trace, gd);
    });

    Registry.getComponentMethod('errorbars', 'style')(s);
}

function stylePoints(sel, trace, gd) {
    Drawing.pointStyle(sel.selectAll('path'), trace, gd);
    styleTextPoints(sel, trace, gd);
}

function styleTextPoints(sel, trace, gd) {
    sel.selectAll('text').each(function(d) {
        var tx = d3.select(this);
        var font = Lib.ensureUniformFontSize(gd, determineFont(tx, d, trace, gd));

        Drawing.font(tx, font);
    });
}

function styleOnSelect(gd, cd, sel) {
    var trace = cd[0].trace;

    if(trace.selectedpoints) {
        stylePointsInSelectionMode(sel, trace, gd);
    } else {
        stylePoints(sel, trace, gd);
        Registry.getComponentMethod('errorbars', 'style')(sel);
    }
}

function stylePointsInSelectionMode(s, trace, gd) {
    Drawing.selectedPointStyle(s.selectAll('path'), trace);
    styleTextInSelectionMode(s.selectAll('text'), trace, gd);
}

function styleTextInSelectionMode(txs, trace, gd) {
    txs.each(function(d) {
        var tx = d3.select(this);
        var font;

        if(d.selected) {
            font = Lib.ensureUniformFontSize(gd, determineFont(tx, d, trace, gd));

            var selectedFontColor = trace.selected.textfont && trace.selected.textfont.color;
            if(selectedFontColor) {
                font.color = selectedFontColor;
            }

            Drawing.font(tx, font);
        } else {
            Drawing.selectedTextStyle(tx, trace);
        }
    });
}

function determineFont(tx, d, trace, gd) {
    var layoutFont = gd._fullLayout.font;
    var textFont = trace.textfont;

    if(tx.classed('bartext-inside')) {
        var barColor = getBarColor(d, trace);
        textFont = getInsideTextFont(trace, d.i, layoutFont, barColor);
    } else if(tx.classed('bartext-outside')) {
        textFont = getOutsideTextFont(trace, d.i, layoutFont);
    }

    return textFont;
}

function getTextFont(trace, index, defaultValue) {
    return getFontValue(
      attributeTextFont, trace.textfont, index, defaultValue);
}

function getInsideTextFont(trace, index, layoutFont, barColor) {
    var defaultFont = getTextFont(trace, index, layoutFont);

    var wouldFallBackToLayoutFont =
      (trace._input.textfont === undefined || trace._input.textfont.color === undefined) ||
      (Array.isArray(trace.textfont.color) && trace.textfont.color[index] === undefined);
    if(wouldFallBackToLayoutFont) {
        defaultFont = {
            color: Color.contrast(barColor),
            family: defaultFont.family,
            size: defaultFont.size
        };
    }

    return getFontValue(
      attributeInsideTextFont, trace.insidetextfont, index, defaultFont);
}

function getOutsideTextFont(trace, index, layoutFont) {
    var defaultFont = getTextFont(trace, index, layoutFont);
    return getFontValue(
      attributeOutsideTextFont, trace.outsidetextfont, index, defaultFont);
}

function getFontValue(attributeDefinition, attributeValue, index, defaultValue) {
    attributeValue = attributeValue || {};

    var familyValue = helpers.getValue(attributeValue.family, index);
    var sizeValue = helpers.getValue(attributeValue.size, index);
    var colorValue = helpers.getValue(attributeValue.color, index);

    return {
        family: helpers.coerceString(
          attributeDefinition.family, familyValue, defaultValue.family),
        size: helpers.coerceNumber(
          attributeDefinition.size, sizeValue, defaultValue.size),
        color: helpers.coerceColor(
          attributeDefinition.color, colorValue, defaultValue.color)
    };
}

function getBarColor(cd, trace) {
    if(trace.type === 'waterfall') {
        return trace[cd.dir].marker.color;
    }
    return cd.mc || trace.marker.color;
}

module.exports = {
    style: style,
    styleTextPoints: styleTextPoints,
    styleOnSelect: styleOnSelect,
    getInsideTextFont: getInsideTextFont,
    getOutsideTextFont: getOutsideTextFont,
    getBarColor: getBarColor,
    resizeText: resizeText
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/uniform_text.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/uniform_text.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

function resizeText(gd, gTrace, traceType) {
    var fullLayout = gd._fullLayout;
    var minSize = fullLayout['_' + traceType + 'Text_minsize'];
    if(minSize) {
        var shouldHide = fullLayout.uniformtext.mode === 'hide';

        var selector;
        switch(traceType) {
            case 'funnelarea' :
            case 'pie' :
            case 'sunburst' :
                selector = 'g.slice';
                break;
            case 'treemap' :
                selector = 'g.slice, g.pathbar';
                break;
            default :
                selector = 'g.points > g.point';
        }

        gTrace.selectAll(selector).each(function(d) {
            var transform = d.transform;
            if(transform) {
                transform.scale = (shouldHide && transform.hide) ? 0 : minSize / transform.fontSize;

                var el = d3.select(this).select('text');
                el.attr('transform', Lib.getTextTransform(transform));
            }
        });
    }
}

function recordMinTextSize(
    traceType, // in
    transform, // inout
    fullLayout // inout
) {
    if(fullLayout.uniformtext.mode) {
        var minKey = getMinKey(traceType);
        var minSize = fullLayout.uniformtext.minsize;
        var size = transform.scale * transform.fontSize;

        transform.hide = size < minSize;

        fullLayout[minKey] = fullLayout[minKey] || Infinity;
        if(!transform.hide) {
            fullLayout[minKey] = Math.min(
                fullLayout[minKey],
                Math.max(size, minSize)
            );
        }
    }
}

function clearMinTextSize(
    traceType, // in
    fullLayout // inout
) {
    var minKey = getMinKey(traceType);
    fullLayout[minKey] = undefined;
}

function getMinKey(traceType) {
    return '_' + traceType + 'Text_minsize';
}

module.exports = {
    recordMinTextSize: recordMinTextSize,
    clearMinTextSize: clearMinTextSize,
    resizeText: resizeText
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9oZWxwZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL3Bsb3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvdW5pZm9ybV90ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDhEQUFnQjtBQUN4QyxnQkFBZ0IsbUJBQU8sQ0FBQywwREFBWTtBQUNwQywwQkFBMEIscUdBQXdDOztBQUVsRSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxtQ0FBSTtBQUNyQixnQkFBZ0IsbUJBQU8sQ0FBQyw4REFBZ0I7O0FBRXhDLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixtQkFBbUIsbUJBQU8sQ0FBQyxvRkFBMEI7O0FBRXJELFlBQVksbUJBQU8sQ0FBQyxzRkFBd0I7QUFDNUMsY0FBYyxtQkFBTyxDQUFDLDBGQUEwQjtBQUNoRCxlQUFlLG1CQUFPLENBQUMsZ0VBQWdCO0FBQ3ZDLGVBQWUsc0hBQThDOztBQUU3RCxrQkFBa0IsbUJBQU8sQ0FBQywrRUFBZ0I7QUFDMUM7QUFDQTs7QUFFQSxZQUFZLG1CQUFPLENBQUMsaUVBQVM7QUFDN0IsY0FBYyxtQkFBTyxDQUFDLHFFQUFXO0FBQ2pDLGdCQUFnQixtQkFBTyxDQUFDLHlFQUFhO0FBQ3JDLGlCQUFpQixtQkFBTyxDQUFDLDJFQUFjOztBQUV2QztBQUNBOztBQUVBLDRCQUE0QixxSUFBNEQ7O0FBRXhGOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0QkFBNEIsRUFBRTtBQUNqRSx5Q0FBeUMsNEJBQTRCLEVBQUU7QUFDdkUsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUdBQXFHO0FBQ3JHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLG1DQUFtQzs7QUFFckU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOXdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxjQUFjLG1CQUFPLENBQUMsMEZBQTBCO0FBQ2hELFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixlQUFlLG1CQUFPLENBQUMsZ0VBQWdCOztBQUV2QyxpQkFBaUIsK0dBQW9DO0FBQ3JELGlCQUFpQixtQkFBTyxDQUFDLDJFQUFjO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxxRUFBVzs7QUFFakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsMkJBQTJCLEVBQUU7O0FBRWpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ5Y2IzZTdiYzRlYTQ0MzcwN2Y0Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG52YXIgdGlueWNvbG9yID0gcmVxdWlyZSgndGlueWNvbG9yMicpO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG5leHBvcnRzLmNvZXJjZVN0cmluZyA9IGZ1bmN0aW9uKGF0dHJpYnV0ZURlZmluaXRpb24sIHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZih0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmKHZhbHVlIHx8ICFhdHRyaWJ1dGVEZWZpbml0aW9uLm5vQmxhbmspIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2UgaWYodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZighYXR0cmlidXRlRGVmaW5pdGlvbi5zdHJpY3QpIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgIGRlZmF1bHRWYWx1ZSA6XG4gICAgICBhdHRyaWJ1dGVEZWZpbml0aW9uLmRmbHQ7XG59O1xuXG5leHBvcnRzLmNvZXJjZU51bWJlciA9IGZ1bmN0aW9uKGF0dHJpYnV0ZURlZmluaXRpb24sIHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZihpc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuXG4gICAgICAgIHZhciBtaW4gPSBhdHRyaWJ1dGVEZWZpbml0aW9uLm1pbjtcbiAgICAgICAgdmFyIG1heCA9IGF0dHJpYnV0ZURlZmluaXRpb24ubWF4O1xuICAgICAgICB2YXIgaXNPdXRPZkJvdW5kcyA9IChtaW4gIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA8IG1pbikgfHxcbiAgICAgICAgICAgICAgKG1heCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlID4gbWF4KTtcblxuICAgICAgICBpZighaXNPdXRPZkJvdW5kcykgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgIGRlZmF1bHRWYWx1ZSA6XG4gICAgICBhdHRyaWJ1dGVEZWZpbml0aW9uLmRmbHQ7XG59O1xuXG5leHBvcnRzLmNvZXJjZUNvbG9yID0gZnVuY3Rpb24oYXR0cmlidXRlRGVmaW5pdGlvbiwgdmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmKHRpbnljb2xvcih2YWx1ZSkuaXNWYWxpZCgpKSByZXR1cm4gdmFsdWU7XG5cbiAgICByZXR1cm4gKGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICBkZWZhdWx0VmFsdWUgOlxuICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5kZmx0O1xufTtcblxuZXhwb3J0cy5jb2VyY2VFbnVtZXJhdGVkID0gZnVuY3Rpb24oYXR0cmlidXRlRGVmaW5pdGlvbiwgdmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmKGF0dHJpYnV0ZURlZmluaXRpb24uY29lcmNlTnVtYmVyKSB2YWx1ZSA9ICt2YWx1ZTtcblxuICAgIGlmKGF0dHJpYnV0ZURlZmluaXRpb24udmFsdWVzLmluZGV4T2YodmFsdWUpICE9PSAtMSkgcmV0dXJuIHZhbHVlO1xuXG4gICAgcmV0dXJuIChkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgZGVmYXVsdFZhbHVlIDpcbiAgICAgIGF0dHJpYnV0ZURlZmluaXRpb24uZGZsdDtcbn07XG5cbmV4cG9ydHMuZ2V0VmFsdWUgPSBmdW5jdGlvbihhcnJheU9yU2NhbGFyLCBpbmRleCkge1xuICAgIHZhciB2YWx1ZTtcbiAgICBpZighQXJyYXkuaXNBcnJheShhcnJheU9yU2NhbGFyKSkgdmFsdWUgPSBhcnJheU9yU2NhbGFyO1xuICAgIGVsc2UgaWYoaW5kZXggPCBhcnJheU9yU2NhbGFyLmxlbmd0aCkgdmFsdWUgPSBhcnJheU9yU2NhbGFyW2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnRzLmdldExpbmVXaWR0aCA9IGZ1bmN0aW9uKHRyYWNlLCBkaSkge1xuICAgIHZhciB3ID1cbiAgICAgICAgKDAgPCBkaS5tbHcpID8gZGkubWx3IDpcbiAgICAgICAgIWlzQXJyYXlPclR5cGVkQXJyYXkodHJhY2UubWFya2VyLmxpbmUud2lkdGgpID8gdHJhY2UubWFya2VyLmxpbmUud2lkdGggOlxuICAgICAgICAwO1xuXG4gICAgcmV0dXJuIHc7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBzdmdUZXh0VXRpbHMgPSByZXF1aXJlKCcuLi8uLi9saWIvc3ZnX3RleHRfdXRpbHMnKTtcblxudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgdGlja1RleHQgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpLnRpY2tUZXh0O1xuXG52YXIgdW5pZm9ybVRleHQgPSByZXF1aXJlKCcuL3VuaWZvcm1fdGV4dCcpO1xudmFyIHJlY29yZE1pblRleHRTaXplID0gdW5pZm9ybVRleHQucmVjb3JkTWluVGV4dFNpemU7XG52YXIgY2xlYXJNaW5UZXh0U2l6ZSA9IHVuaWZvcm1UZXh0LmNsZWFyTWluVGV4dFNpemU7XG5cbnZhciBzdHlsZSA9IHJlcXVpcmUoJy4vc3R5bGUnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbnZhciBhdHRyaWJ1dGVUZXh0ID0gYXR0cmlidXRlcy50ZXh0O1xudmFyIGF0dHJpYnV0ZVRleHRQb3NpdGlvbiA9IGF0dHJpYnV0ZXMudGV4dHBvc2l0aW9uO1xuXG52YXIgYXBwZW5kQXJyYXlQb2ludFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meC9oZWxwZXJzJykuYXBwZW5kQXJyYXlQb2ludFZhbHVlO1xuXG52YXIgVEVYVFBBRCA9IGNvbnN0YW50cy5URVhUUEFEO1xuXG5mdW5jdGlvbiBrZXlGdW5jKGQpIHtyZXR1cm4gZC5pZDt9XG5mdW5jdGlvbiBnZXRLZXlGdW5jKHRyYWNlKSB7XG4gICAgaWYodHJhY2UuaWRzKSB7XG4gICAgICAgIHJldHVybiBrZXlGdW5jO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlyU2lnbihhLCBiKSB7XG4gICAgcmV0dXJuIChhIDwgYikgPyAxIDogLTE7XG59XG5cbmZ1bmN0aW9uIGdldFhZKGRpLCB4YSwgeWEsIGlzSG9yaXpvbnRhbCkge1xuICAgIHZhciBzID0gW107XG4gICAgdmFyIHAgPSBbXTtcblxuICAgIHZhciBzQXhpcyA9IGlzSG9yaXpvbnRhbCA/IHhhIDogeWE7XG4gICAgdmFyIHBBeGlzID0gaXNIb3Jpem9udGFsID8geWEgOiB4YTtcblxuICAgIHNbMF0gPSBzQXhpcy5jMnAoZGkuczAsIHRydWUpO1xuICAgIHBbMF0gPSBwQXhpcy5jMnAoZGkucDAsIHRydWUpO1xuXG4gICAgc1sxXSA9IHNBeGlzLmMycChkaS5zMSwgdHJ1ZSk7XG4gICAgcFsxXSA9IHBBeGlzLmMycChkaS5wMSwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gaXNIb3Jpem9udGFsID8gW3MsIHBdIDogW3AsIHNdO1xufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uKHNlbGVjdGlvbiwgZnVsbExheW91dCwgb3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgIGlmKCFmdWxsTGF5b3V0LnVuaWZvcm10ZXh0Lm1vZGUgJiYgaGFzVHJhbnNpdGlvbihvcHRzKSkge1xuICAgICAgICB2YXIgb25Db21wbGV0ZTtcbiAgICAgICAgaWYobWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICAgICAgb25Db21wbGV0ZSA9IG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0aW9uXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbihvcHRzLmR1cmF0aW9uKVxuICAgICAgICAgIC5lYXNlKG9wdHMuZWFzaW5nKVxuICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHsgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7IH0pXG4gICAgICAgICAgLmVhY2goJ2ludGVycnVwdCcsIGZ1bmN0aW9uKCkgeyBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhc1RyYW5zaXRpb24odHJhbnNpdGlvbk9wdHMpIHtcbiAgICByZXR1cm4gdHJhbnNpdGlvbk9wdHMgJiYgdHJhbnNpdGlvbk9wdHMuZHVyYXRpb24gPiAwO1xufVxuXG5mdW5jdGlvbiBwbG90KGdkLCBwbG90aW5mbywgY2RNb2R1bGUsIHRyYWNlTGF5ZXIsIG9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuXG4gICAgaWYoIW9wdHMpIHtcbiAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICAgIG1vZGU6IGZ1bGxMYXlvdXQuYmFybW9kZSxcbiAgICAgICAgICAgIG5vcm06IGZ1bGxMYXlvdXQuYmFybW9kZSxcbiAgICAgICAgICAgIGdhcDogZnVsbExheW91dC5iYXJnYXAsXG4gICAgICAgICAgICBncm91cGdhcDogZnVsbExheW91dC5iYXJncm91cGdhcFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGRvbid0IGNsZWFyIGJhciB3aGVuIHRoaXMgaXMgY2FsbGVkIGZyb20gd2F0ZXJmYWxsIG9yIGZ1bm5lbFxuICAgICAgICBjbGVhck1pblRleHRTaXplKCdiYXInLCBmdWxsTGF5b3V0KTtcbiAgICB9XG5cbiAgICB2YXIgYmFydHJhY2VzID0gTGliLm1ha2VUcmFjZUdyb3Vwcyh0cmFjZUxheWVyLCBjZE1vZHVsZSwgJ3RyYWNlIGJhcnMnKS5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgIHZhciBwbG90R3JvdXAgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgICAgICB2YXIgaXNXYXRlcmZhbGwgPSAodHJhY2UudHlwZSA9PT0gJ3dhdGVyZmFsbCcpO1xuICAgICAgICB2YXIgaXNGdW5uZWwgPSAodHJhY2UudHlwZSA9PT0gJ2Z1bm5lbCcpO1xuICAgICAgICB2YXIgaXNCYXIgPSAodHJhY2UudHlwZSA9PT0gJ2JhcicpO1xuICAgICAgICB2YXIgc2hvdWxkRGlzcGxheVplcm9zID0gKGlzQmFyIHx8IGlzRnVubmVsKTtcblxuICAgICAgICB2YXIgYWRqdXN0UGl4ZWwgPSAwO1xuICAgICAgICBpZihpc1dhdGVyZmFsbCAmJiB0cmFjZS5jb25uZWN0b3IudmlzaWJsZSAmJiB0cmFjZS5jb25uZWN0b3IubW9kZSA9PT0gJ2JldHdlZW4nKSB7XG4gICAgICAgICAgICBhZGp1c3RQaXhlbCA9IHRyYWNlLmNvbm5lY3Rvci5saW5lLndpZHRoIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpc0hvcml6b250YWwgPSAodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJyk7XG4gICAgICAgIHZhciB3aXRoVHJhbnNpdGlvbiA9IGhhc1RyYW5zaXRpb24ob3B0cyk7XG5cbiAgICAgICAgdmFyIHBvaW50R3JvdXAgPSBMaWIuZW5zdXJlU2luZ2xlKHBsb3RHcm91cCwgJ2cnLCAncG9pbnRzJyk7XG5cbiAgICAgICAgdmFyIGtleUZ1bmMgPSBnZXRLZXlGdW5jKHRyYWNlKTtcbiAgICAgICAgdmFyIGJhcnMgPSBwb2ludEdyb3VwLnNlbGVjdEFsbCgnZy5wb2ludCcpLmRhdGEoTGliLmlkZW50aXR5LCBrZXlGdW5jKTtcblxuICAgICAgICBiYXJzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdwb2ludCcsIHRydWUpO1xuXG4gICAgICAgIGJhcnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIGJhcnMuZWFjaChmdW5jdGlvbihkaSwgaSkge1xuICAgICAgICAgICAgdmFyIGJhciA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICAgICAgLy8gbm93IGRpc3BsYXkgdGhlIGJhclxuICAgICAgICAgICAgLy8gY2xpcHBlZCB4Zi95ZiAoMm5kIGFyZyB0cnVlKTogbm9uLXBvc2l0aXZlXG4gICAgICAgICAgICAvLyBsb2cgdmFsdWVzIGdvIG9mZi1zY3JlZW4gYnkgcGxvdHdpZHRoXG4gICAgICAgICAgICAvLyBzbyB5b3Ugc2VlIHRoZW0gY29udGludWUgaWYgeW91IGRyYWcgdGhlIHBsb3RcbiAgICAgICAgICAgIHZhciB4eSA9IGdldFhZKGRpLCB4YSwgeWEsIGlzSG9yaXpvbnRhbCk7XG5cbiAgICAgICAgICAgIHZhciB4MCA9IHh5WzBdWzBdO1xuICAgICAgICAgICAgdmFyIHgxID0geHlbMF1bMV07XG4gICAgICAgICAgICB2YXIgeTAgPSB4eVsxXVswXTtcbiAgICAgICAgICAgIHZhciB5MSA9IHh5WzFdWzFdO1xuXG4gICAgICAgICAgICAvLyBlbXB0eSBiYXJzXG4gICAgICAgICAgICB2YXIgaXNCbGFuayA9IChpc0hvcml6b250YWwgPyB4MSAtIHgwIDogeTEgLSB5MCkgPT09IDA7XG5cbiAgICAgICAgICAgIC8vIGRpc3BsYXkgemVyb3MgaWYgbGluZS53aWR0aCA+IDBcbiAgICAgICAgICAgIGlmKGlzQmxhbmsgJiYgc2hvdWxkRGlzcGxheVplcm9zICYmIGhlbHBlcnMuZ2V0TGluZVdpZHRoKHRyYWNlLCBkaSkpIHtcbiAgICAgICAgICAgICAgICBpc0JsYW5rID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNraXAgbnVsbHNcbiAgICAgICAgICAgIGlmKCFpc0JsYW5rKSB7XG4gICAgICAgICAgICAgICAgaXNCbGFuayA9IChcbiAgICAgICAgICAgICAgICAgICAgIWlzTnVtZXJpYyh4MCkgfHxcbiAgICAgICAgICAgICAgICAgICAgIWlzTnVtZXJpYyh4MSkgfHxcbiAgICAgICAgICAgICAgICAgICAgIWlzTnVtZXJpYyh5MCkgfHxcbiAgICAgICAgICAgICAgICAgICAgIWlzTnVtZXJpYyh5MSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZWNvcmQgaXNCbGFua1xuICAgICAgICAgICAgZGkuaXNCbGFuayA9IGlzQmxhbms7XG5cbiAgICAgICAgICAgIC8vIGZvciBibGFuayBiYXJzLCBlbnN1cmUgc3RhcnQgYW5kIGVuZCBwb3NpdGlvbnMgYXJlIGVxdWFsIC0gaW1wb3J0YW50IGZvciBzbW9vdGggdHJhbnNpdGlvbnNcbiAgICAgICAgICAgIGlmKGlzQmxhbmspIHtcbiAgICAgICAgICAgICAgICBpZihpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgeDEgPSB4MDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB5MSA9IHkwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW4gd2F0ZXJmYWxsIG1vZGUgYGJldHdlZW5gIHdlIG5lZWQgdG8gYWRqdXN0IGJhciBlbmQgcG9pbnRzIHRvIG1hdGNoIHRoZSBjb25uZWN0b3Igd2lkdGhcbiAgICAgICAgICAgIGlmKGFkanVzdFBpeGVsICYmICFpc0JsYW5rKSB7XG4gICAgICAgICAgICAgICAgaWYoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHgwIC09IGRpclNpZ24oeDAsIHgxKSAqIGFkanVzdFBpeGVsO1xuICAgICAgICAgICAgICAgICAgICB4MSArPSBkaXJTaWduKHgwLCB4MSkgKiBhZGp1c3RQaXhlbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB5MCAtPSBkaXJTaWduKHkwLCB5MSkgKiBhZGp1c3RQaXhlbDtcbiAgICAgICAgICAgICAgICAgICAgeTEgKz0gZGlyU2lnbih5MCwgeTEpICogYWRqdXN0UGl4ZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbHc7XG4gICAgICAgICAgICB2YXIgbWM7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlLnR5cGUgPT09ICd3YXRlcmZhbGwnKSB7XG4gICAgICAgICAgICAgICAgaWYoIWlzQmxhbmspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnQgPSB0cmFjZVtkaS5kaXJdLm1hcmtlcjtcbiAgICAgICAgICAgICAgICAgICAgbHcgPSBjb250LmxpbmUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIG1jID0gY29udC5jb2xvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGx3ID0gaGVscGVycy5nZXRMaW5lV2lkdGgodHJhY2UsIGRpKTtcbiAgICAgICAgICAgICAgICBtYyA9IGRpLm1jIHx8IHRyYWNlLm1hcmtlci5jb2xvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gcm91bmRXaXRoTGluZSh2KSB7XG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IGQzLnJvdW5kKChsdyAvIDIpICUgMSwgMik7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgZXhwbGljaXQgZ2FwcywgZG9uJ3Qgcm91bmQsXG4gICAgICAgICAgICAgICAgLy8gaXQgY2FuIG1ha2UgdGhlIGdhcHMgbG9vayBjcmFwcHlcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9wdHMuZ2FwID09PSAwICYmIG9wdHMuZ3JvdXBnYXAgPT09IDApID9cbiAgICAgICAgICAgICAgICAgICAgZDMucm91bmQoTWF0aC5yb3VuZCh2KSAtIG9mZnNldCwgMikgOiB2O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBleHBhbmRUb1Zpc2libGUodiwgdmMsIGhpZGVaZXJvU3Bhbikge1xuICAgICAgICAgICAgICAgIGlmKGhpZGVaZXJvU3BhbiAmJiB2ID09PSB2Yykge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGQgbm90IGV4cGFuZCB6ZXJvIHNwYW4gYmFyc1xuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHN0YXJ0IGFuZCBlbmQgcG9zaXRpb25zIGFyZSBpZGVudGljYWxcbiAgICAgICAgICAgICAgICAgICAgLy8gaS5lLiBmb3IgdmVydGljYWwgd2hlbiB5MCA9PT0geTFcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGZvciBob3Jpem9udGFsIHdoZW4geDAgPT09IHgxXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIGl0J3Mgbm90IGluIGRhbmdlciBvZiBkaXNhcHBlYXJpbmcgZW50aXJlbHksXG4gICAgICAgICAgICAgICAgLy8gcm91bmQgbW9yZSBwcmVjaXNlbHlcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModiAtIHZjKSA+PSAyID8gcm91bmRXaXRoTGluZSh2KSA6XG4gICAgICAgICAgICAgICAgLy8gYnV0IGlmIGl0J3MgdmVyeSB0aGluLCBleHBhbmQgaXQgc28gaXQnc1xuICAgICAgICAgICAgICAgIC8vIG5lY2Vzc2FyaWx5IHZpc2libGUsIGV2ZW4gaWYgaXQgbWlnaHQgb3ZlcmxhcFxuICAgICAgICAgICAgICAgIC8vIGl0cyBuZWlnaGJvclxuICAgICAgICAgICAgICAgICh2ID4gdmMgPyBNYXRoLmNlaWwodikgOiBNYXRoLmZsb29yKHYpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIWdkLl9jb250ZXh0LnN0YXRpY1Bsb3QpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBiYXJzIGFyZSBub3QgZnVsbHkgb3BhcXVlIG9yIHRoZXkgaGF2ZSBhIGxpbmVcbiAgICAgICAgICAgICAgICAvLyBhcm91bmQgdGhlbSwgcm91bmQgdG8gaW50ZWdlciBwaXhlbHMsIG1haW5seSBmb3JcbiAgICAgICAgICAgICAgICAvLyBzYWZhcmkgc28gd2UgcHJldmVudCBvdmVybGFwcyBmcm9tIGl0cyBleHBhbnNpdmVcbiAgICAgICAgICAgICAgICAvLyBwaXhlbGF0aW9uLiBpZiB0aGUgYmFycyBBUkUgZnVsbHkgb3BhcXVlIGFuZCBoYXZlXG4gICAgICAgICAgICAgICAgLy8gbm8gbGluZSwgZXhwYW5kIHRvIGEgZnVsbCBwaXhlbCB0byBtYWtlIHN1cmUgd2VcbiAgICAgICAgICAgICAgICAvLyBjYW4gc2VlIHRoZW1cblxuICAgICAgICAgICAgICAgIHZhciBvcCA9IENvbG9yLm9wYWNpdHkobWMpO1xuICAgICAgICAgICAgICAgIHZhciBmaXhweCA9IChvcCA8IDEgfHwgbHcgPiAwLjAxKSA/IHJvdW5kV2l0aExpbmUgOiBleHBhbmRUb1Zpc2libGU7XG5cbiAgICAgICAgICAgICAgICB4MCA9IGZpeHB4KHgwLCB4MSwgaXNIb3Jpem9udGFsKTtcbiAgICAgICAgICAgICAgICB4MSA9IGZpeHB4KHgxLCB4MCwgaXNIb3Jpem9udGFsKTtcbiAgICAgICAgICAgICAgICB5MCA9IGZpeHB4KHkwLCB5MSwgIWlzSG9yaXpvbnRhbCk7XG4gICAgICAgICAgICAgICAgeTEgPSBmaXhweCh5MSwgeTAsICFpc0hvcml6b250YWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VsID0gdHJhbnNpdGlvbihMaWIuZW5zdXJlU2luZ2xlKGJhciwgJ3BhdGgnKSwgZnVsbExheW91dCwgb3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjayk7XG4gICAgICAgICAgICBzZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJylcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGlzTmFOKCh4MSAtIHgwKSAqICh5MSAtIHkwKSkgPyAnTTAsMFonIDogJ00nICsgeDAgKyAnLCcgKyB5MCArICdWJyArIHkxICsgJ0gnICsgeDEgKyAnVicgKyB5MCArICdaJylcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldENsaXBVcmwsIHBsb3RpbmZvLmxheWVyQ2xpcElkLCBnZCk7XG5cbiAgICAgICAgICAgIGlmKCFmdWxsTGF5b3V0LnVuaWZvcm10ZXh0Lm1vZGUgJiYgd2l0aFRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGVGbnMgPSBEcmF3aW5nLm1ha2VQb2ludFN0eWxlRm5zKHRyYWNlKTtcbiAgICAgICAgICAgICAgICBEcmF3aW5nLnNpbmdsZVBvaW50U3R5bGUoZGksIHNlbCwgdHJhY2UsIHN0eWxlRm5zLCBnZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFwcGVuZEJhclRleHQoZ2QsIHBsb3RpbmZvLCBiYXIsIGNkLCBpLCB4MCwgeDEsIHkwLCB5MSwgb3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIGlmKHBsb3RpbmZvLmxheWVyQ2xpcElkKSB7XG4gICAgICAgICAgICAgICAgRHJhd2luZy5oaWRlT3V0c2lkZVJhbmdlUG9pbnQoZGksIGJhci5zZWxlY3QoJ3RleHQnKSwgeGEsIHlhLCB0cmFjZS54Y2FsZW5kYXIsIHRyYWNlLnljYWxlbmRhcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxhc3RseSwgY2xpcCBwb2ludHMgZ3JvdXBzIG9mIGBjbGlwb25heGlzICE9PSBmYWxzZWAgdHJhY2VzXG4gICAgICAgIC8vIG9uIGBwbG90aW5mby5faGFzQ2xpcE9uQXhpc0ZhbHNlID09PSB0cnVlYCBzdWJwbG90c1xuICAgICAgICB2YXIgaGFzQ2xpcE9uQXhpc0ZhbHNlID0gdHJhY2UuY2xpcG9uYXhpcyA9PT0gZmFsc2U7XG4gICAgICAgIERyYXdpbmcuc2V0Q2xpcFVybChwbG90R3JvdXAsIGhhc0NsaXBPbkF4aXNGYWxzZSA/IG51bGwgOiBwbG90aW5mby5sYXllckNsaXBJZCwgZ2QpO1xuICAgIH0pO1xuXG4gICAgLy8gZXJyb3IgYmFycyBhcmUgb24gdGhlIHRvcFxuICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnZXJyb3JiYXJzJywgJ3Bsb3QnKShnZCwgYmFydHJhY2VzLCBwbG90aW5mbywgb3B0cyk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEJhclRleHQoZ2QsIHBsb3RpbmZvLCBiYXIsIGNkLCBpLCB4MCwgeDEsIHkwLCB5MSwgb3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgIHZhciB4YSA9IHBsb3RpbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHBsb3RpbmZvLnlheGlzO1xuXG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgdGV4dFBvc2l0aW9uO1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kVGV4dE5vZGUoYmFyLCB0ZXh0LCBmb250KSB7XG4gICAgICAgIHZhciB0ZXh0U2VsZWN0aW9uID0gTGliLmVuc3VyZVNpbmdsZShiYXIsICd0ZXh0JylcbiAgICAgICAgICAgIC50ZXh0KHRleHQpXG4gICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgJ2NsYXNzJzogJ2JhcnRleHQgYmFydGV4dC0nICsgdGV4dFBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnLFxuICAgICAgICAgICAgICAgIC8vIHByb2hpYml0IHRleCBpbnRlcnByZXRhdGlvbiB1bnRpbCB3ZSBjYW4gaGFuZGxlXG4gICAgICAgICAgICAgICAgLy8gdGV4IGFuZCByZWd1bGFyIHRleHQgdG9nZXRoZXJcbiAgICAgICAgICAgICAgICAnZGF0YS1ub3RleCc6IDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLmZvbnQsIGZvbnQpXG4gICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMuY29udmVydFRvVHNwYW5zLCBnZCk7XG5cbiAgICAgICAgcmV0dXJuIHRleHRTZWxlY3Rpb247XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRyYWNlIGF0dHJpYnV0ZXNcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgaXNIb3Jpem9udGFsID0gKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpO1xuXG4gICAgdmFyIHRleHQgPSBnZXRUZXh0KGZ1bGxMYXlvdXQsIGNkLCBpLCB4YSwgeWEpO1xuICAgIHRleHRQb3NpdGlvbiA9IGdldFRleHRQb3NpdGlvbih0cmFjZSwgaSk7XG5cbiAgICAvLyBjb21wdXRlIHRleHQgcG9zaXRpb25cbiAgICB2YXIgaW5TdGFja09yUmVsYXRpdmVNb2RlID1cbiAgICAgICAgb3B0cy5tb2RlID09PSAnc3RhY2snIHx8XG4gICAgICAgIG9wdHMubW9kZSA9PT0gJ3JlbGF0aXZlJztcblxuICAgIHZhciBjYWxjQmFyID0gY2RbaV07XG4gICAgdmFyIGlzT3V0bW9zdEJhciA9ICFpblN0YWNrT3JSZWxhdGl2ZU1vZGUgfHwgY2FsY0Jhci5fb3V0bW9zdDtcblxuICAgIGlmKCF0ZXh0IHx8XG4gICAgICAgIHRleHRQb3NpdGlvbiA9PT0gJ25vbmUnIHx8XG4gICAgICAgICgoY2FsY0Jhci5pc0JsYW5rIHx8IHgwID09PSB4MSB8fCB5MCA9PT0geTEpICYmIChcbiAgICAgICAgICAgIHRleHRQb3NpdGlvbiA9PT0gJ2F1dG8nIHx8XG4gICAgICAgICAgICB0ZXh0UG9zaXRpb24gPT09ICdpbnNpZGUnKSkpIHtcbiAgICAgICAgYmFyLnNlbGVjdCgndGV4dCcpLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGxheW91dEZvbnQgPSBmdWxsTGF5b3V0LmZvbnQ7XG4gICAgdmFyIGJhckNvbG9yID0gc3R5bGUuZ2V0QmFyQ29sb3IoY2RbaV0sIHRyYWNlKTtcbiAgICB2YXIgaW5zaWRlVGV4dEZvbnQgPSBzdHlsZS5nZXRJbnNpZGVUZXh0Rm9udCh0cmFjZSwgaSwgbGF5b3V0Rm9udCwgYmFyQ29sb3IpO1xuICAgIHZhciBvdXRzaWRlVGV4dEZvbnQgPSBzdHlsZS5nZXRPdXRzaWRlVGV4dEZvbnQodHJhY2UsIGksIGxheW91dEZvbnQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlOiBkb24ndCB1c2UgdGhlIGMycCh2LCB0cnVlKSB2YWx1ZSBvbiBsb2cgc2l6ZSBheGVzLFxuICAgIC8vIHNvIHRoYXQgd2UgY2FuIGdldCBjb3JyZWN0bHkgaW5zaWRlIHRleHQgc2NhbGluZ1xuICAgIHZhciBkaSA9IGJhci5kYXR1bSgpO1xuICAgIGlmKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICBpZih4YS50eXBlID09PSAnbG9nJyAmJiBkaS5zMCA8PSAwKSB7XG4gICAgICAgICAgICBpZih4YS5yYW5nZVswXSA8IHhhLnJhbmdlWzFdKSB7XG4gICAgICAgICAgICAgICAgeDAgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4MCA9IHhhLl9sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZih5YS50eXBlID09PSAnbG9nJyAmJiBkaS5zMCA8PSAwKSB7XG4gICAgICAgICAgICBpZih5YS5yYW5nZVswXSA8IHlhLnJhbmdlWzFdKSB7XG4gICAgICAgICAgICAgICAgeTAgPSB5YS5fbGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB5MCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYWRkaW5nIGV4Y2x1ZGVkXG4gICAgdmFyIGJhcldpZHRoID0gTWF0aC5hYnMoeDEgLSB4MCkgLSAyICogVEVYVFBBRDtcbiAgICB2YXIgYmFySGVpZ2h0ID0gTWF0aC5hYnMoeTEgLSB5MCkgLSAyICogVEVYVFBBRDtcblxuICAgIHZhciB0ZXh0U2VsZWN0aW9uO1xuICAgIHZhciB0ZXh0QkI7XG4gICAgdmFyIHRleHRXaWR0aDtcbiAgICB2YXIgdGV4dEhlaWdodDtcbiAgICB2YXIgZm9udDtcblxuICAgIGlmKHRleHRQb3NpdGlvbiA9PT0gJ291dHNpZGUnKSB7XG4gICAgICAgIGlmKCFpc091dG1vc3RCYXIgJiYgIWNhbGNCYXIuaGFzQikgdGV4dFBvc2l0aW9uID0gJ2luc2lkZSc7XG4gICAgfVxuXG4gICAgaWYodGV4dFBvc2l0aW9uID09PSAnYXV0bycpIHtcbiAgICAgICAgaWYoaXNPdXRtb3N0QmFyKSB7XG4gICAgICAgICAgICAvLyBkcmF3IHRleHQgdXNpbmcgaW5zaWRlVGV4dEZvbnQgYW5kIGNoZWNrIGlmIGl0IGZpdHMgaW5zaWRlIGJhclxuICAgICAgICAgICAgdGV4dFBvc2l0aW9uID0gJ2luc2lkZSc7XG5cbiAgICAgICAgICAgIGZvbnQgPSBMaWIuZW5zdXJlVW5pZm9ybUZvbnRTaXplKGdkLCBpbnNpZGVUZXh0Rm9udCk7XG5cbiAgICAgICAgICAgIHRleHRTZWxlY3Rpb24gPSBhcHBlbmRUZXh0Tm9kZShiYXIsIHRleHQsIGZvbnQpO1xuXG4gICAgICAgICAgICB0ZXh0QkIgPSBEcmF3aW5nLmJCb3godGV4dFNlbGVjdGlvbi5ub2RlKCkpLFxuICAgICAgICAgICAgdGV4dFdpZHRoID0gdGV4dEJCLndpZHRoLFxuICAgICAgICAgICAgdGV4dEhlaWdodCA9IHRleHRCQi5oZWlnaHQ7XG5cbiAgICAgICAgICAgIHZhciB0ZXh0SGFzU2l6ZSA9ICh0ZXh0V2lkdGggPiAwICYmIHRleHRIZWlnaHQgPiAwKTtcbiAgICAgICAgICAgIHZhciBmaXRzSW5zaWRlID0gKHRleHRXaWR0aCA8PSBiYXJXaWR0aCAmJiB0ZXh0SGVpZ2h0IDw9IGJhckhlaWdodCk7XG4gICAgICAgICAgICB2YXIgZml0c0luc2lkZUlmUm90YXRlZCA9ICh0ZXh0V2lkdGggPD0gYmFySGVpZ2h0ICYmIHRleHRIZWlnaHQgPD0gYmFyV2lkdGgpO1xuICAgICAgICAgICAgdmFyIGZpdHNJbnNpZGVJZlNocnVuayA9IChpc0hvcml6b250YWwpID9cbiAgICAgICAgICAgICAgICAoYmFyV2lkdGggPj0gdGV4dFdpZHRoICogKGJhckhlaWdodCAvIHRleHRIZWlnaHQpKSA6XG4gICAgICAgICAgICAgICAgKGJhckhlaWdodCA+PSB0ZXh0SGVpZ2h0ICogKGJhcldpZHRoIC8gdGV4dFdpZHRoKSk7XG5cbiAgICAgICAgICAgIGlmKHRleHRIYXNTaXplICYmIChcbiAgICAgICAgICAgICAgICBmaXRzSW5zaWRlIHx8XG4gICAgICAgICAgICAgICAgZml0c0luc2lkZUlmUm90YXRlZCB8fFxuICAgICAgICAgICAgICAgIGZpdHNJbnNpZGVJZlNocnVuaylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRleHRQb3NpdGlvbiA9ICdpbnNpZGUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXh0UG9zaXRpb24gPSAnb3V0c2lkZSc7XG4gICAgICAgICAgICAgICAgdGV4dFNlbGVjdGlvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0ZXh0U2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRleHRQb3NpdGlvbiA9ICdpbnNpZGUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIXRleHRTZWxlY3Rpb24pIHtcbiAgICAgICAgZm9udCA9IExpYi5lbnN1cmVVbmlmb3JtRm9udFNpemUoZ2QsICh0ZXh0UG9zaXRpb24gPT09ICdvdXRzaWRlJykgPyBvdXRzaWRlVGV4dEZvbnQgOiBpbnNpZGVUZXh0Rm9udCk7XG5cbiAgICAgICAgdGV4dFNlbGVjdGlvbiA9IGFwcGVuZFRleHROb2RlKGJhciwgdGV4dCwgZm9udCk7XG5cbiAgICAgICAgdmFyIGN1cnJlbnRUcmFuc2Zvcm0gPSB0ZXh0U2VsZWN0aW9uLmF0dHIoJ3RyYW5zZm9ybScpO1xuICAgICAgICB0ZXh0U2VsZWN0aW9uLmF0dHIoJ3RyYW5zZm9ybScsICcnKTtcbiAgICAgICAgdGV4dEJCID0gRHJhd2luZy5iQm94KHRleHRTZWxlY3Rpb24ubm9kZSgpKSxcbiAgICAgICAgdGV4dFdpZHRoID0gdGV4dEJCLndpZHRoLFxuICAgICAgICB0ZXh0SGVpZ2h0ID0gdGV4dEJCLmhlaWdodDtcbiAgICAgICAgdGV4dFNlbGVjdGlvbi5hdHRyKCd0cmFuc2Zvcm0nLCBjdXJyZW50VHJhbnNmb3JtKTtcblxuICAgICAgICBpZih0ZXh0V2lkdGggPD0gMCB8fCB0ZXh0SGVpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgIHRleHRTZWxlY3Rpb24ucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYW5nbGUgPSB0cmFjZS50ZXh0YW5nbGU7XG5cbiAgICAvLyBjb21wdXRlIHRleHQgdHJhbnNmb3JtXG4gICAgdmFyIHRyYW5zZm9ybSwgY29uc3RyYWluZWQ7XG4gICAgaWYodGV4dFBvc2l0aW9uID09PSAnb3V0c2lkZScpIHtcbiAgICAgICAgY29uc3RyYWluZWQgPVxuICAgICAgICAgICAgdHJhY2UuY29uc3RyYWludGV4dCA9PT0gJ2JvdGgnIHx8XG4gICAgICAgICAgICB0cmFjZS5jb25zdHJhaW50ZXh0ID09PSAnb3V0c2lkZSc7XG5cbiAgICAgICAgdHJhbnNmb3JtID0gdG9Nb3ZlT3V0c2lkZUJhcih4MCwgeDEsIHkwLCB5MSwgdGV4dEJCLCB7XG4gICAgICAgICAgICBpc0hvcml6b250YWw6IGlzSG9yaXpvbnRhbCxcbiAgICAgICAgICAgIGNvbnN0cmFpbmVkOiBjb25zdHJhaW5lZCxcbiAgICAgICAgICAgIGFuZ2xlOiBhbmdsZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdHJhaW5lZCA9XG4gICAgICAgICAgICB0cmFjZS5jb25zdHJhaW50ZXh0ID09PSAnYm90aCcgfHxcbiAgICAgICAgICAgIHRyYWNlLmNvbnN0cmFpbnRleHQgPT09ICdpbnNpZGUnO1xuXG4gICAgICAgIHRyYW5zZm9ybSA9IHRvTW92ZUluc2lkZUJhcih4MCwgeDEsIHkwLCB5MSwgdGV4dEJCLCB7XG4gICAgICAgICAgICBpc0hvcml6b250YWw6IGlzSG9yaXpvbnRhbCxcbiAgICAgICAgICAgIGNvbnN0cmFpbmVkOiBjb25zdHJhaW5lZCxcbiAgICAgICAgICAgIGFuZ2xlOiBhbmdsZSxcbiAgICAgICAgICAgIGFuY2hvcjogdHJhY2UuaW5zaWRldGV4dGFuY2hvclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm0uZm9udFNpemUgPSBmb250LnNpemU7XG4gICAgcmVjb3JkTWluVGV4dFNpemUodHJhY2UudHlwZSwgdHJhbnNmb3JtLCBmdWxsTGF5b3V0KTtcbiAgICBjYWxjQmFyLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcblxuICAgIHRyYW5zaXRpb24odGV4dFNlbGVjdGlvbiwgZnVsbExheW91dCwgb3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjaylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIExpYi5nZXRUZXh0VHJhbnNmb3JtKHRyYW5zZm9ybSkpO1xufVxuXG5mdW5jdGlvbiBnZXRSb3RhdGVGcm9tQW5nbGUoYW5nbGUpIHtcbiAgICByZXR1cm4gKGFuZ2xlID09PSAnYXV0bycpID8gMCA6IGFuZ2xlO1xufVxuXG5mdW5jdGlvbiBnZXRSb3RhdGVkVGV4dFNpemUodGV4dEJCLCByb3RhdGUpIHtcbiAgICB2YXIgYSA9IE1hdGguUEkgLyAxODAgKiByb3RhdGU7XG4gICAgdmFyIGFic1NpbiA9IE1hdGguYWJzKE1hdGguc2luKGEpKTtcbiAgICB2YXIgYWJzQ29zID0gTWF0aC5hYnMoTWF0aC5jb3MoYSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogdGV4dEJCLndpZHRoICogYWJzQ29zICsgdGV4dEJCLmhlaWdodCAqIGFic1NpbixcbiAgICAgICAgeTogdGV4dEJCLndpZHRoICogYWJzU2luICsgdGV4dEJCLmhlaWdodCAqIGFic0Nvc1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIHRvTW92ZUluc2lkZUJhcih4MCwgeDEsIHkwLCB5MSwgdGV4dEJCLCBvcHRzKSB7XG4gICAgdmFyIGlzSG9yaXpvbnRhbCA9ICEhb3B0cy5pc0hvcml6b250YWw7XG4gICAgdmFyIGNvbnN0cmFpbmVkID0gISFvcHRzLmNvbnN0cmFpbmVkO1xuICAgIHZhciBhbmdsZSA9IG9wdHMuYW5nbGUgfHwgMDtcbiAgICB2YXIgYW5jaG9yID0gb3B0cy5hbmNob3IgfHwgJ2VuZCc7XG4gICAgdmFyIGlzRW5kID0gYW5jaG9yID09PSAnZW5kJztcbiAgICB2YXIgaXNTdGFydCA9IGFuY2hvciA9PT0gJ3N0YXJ0JztcbiAgICB2YXIgbGVmdFRvUmlnaHQgPSBvcHRzLmxlZnRUb1JpZ2h0IHx8IDA7IC8vIGxlZnQ6IC0xLCBjZW50ZXI6IDAsIHJpZ2h0OiAxXG4gICAgdmFyIHRvUmlnaHQgPSAobGVmdFRvUmlnaHQgKyAxKSAvIDI7XG4gICAgdmFyIHRvTGVmdCA9IDEgLSB0b1JpZ2h0O1xuXG4gICAgdmFyIHRleHRXaWR0aCA9IHRleHRCQi53aWR0aDtcbiAgICB2YXIgdGV4dEhlaWdodCA9IHRleHRCQi5oZWlnaHQ7XG4gICAgdmFyIGx4ID0gTWF0aC5hYnMoeDEgLSB4MCk7XG4gICAgdmFyIGx5ID0gTWF0aC5hYnMoeTEgLSB5MCk7XG5cbiAgICAvLyBjb21wdXRlIHJlbWFpbmluZyBzcGFjZVxuICAgIHZhciB0ZXh0cGFkID0gKFxuICAgICAgICBseCA+ICgyICogVEVYVFBBRCkgJiZcbiAgICAgICAgbHkgPiAoMiAqIFRFWFRQQUQpXG4gICAgKSA/IFRFWFRQQUQgOiAwO1xuXG4gICAgbHggLT0gMiAqIHRleHRwYWQ7XG4gICAgbHkgLT0gMiAqIHRleHRwYWQ7XG5cbiAgICB2YXIgcm90YXRlID0gZ2V0Um90YXRlRnJvbUFuZ2xlKGFuZ2xlKTtcbiAgICBpZigoYW5nbGUgPT09ICdhdXRvJykgJiZcbiAgICAgICAgISh0ZXh0V2lkdGggPD0gbHggJiYgdGV4dEhlaWdodCA8PSBseSkgJiZcbiAgICAgICAgKHRleHRXaWR0aCA+IGx4IHx8IHRleHRIZWlnaHQgPiBseSkgJiYgKFxuICAgICAgICAhKHRleHRXaWR0aCA+IGx5IHx8IHRleHRIZWlnaHQgPiBseCkgfHxcbiAgICAgICAgKCh0ZXh0V2lkdGggPCB0ZXh0SGVpZ2h0KSAhPT0gKGx4IDwgbHkpKVxuICAgICkpIHtcbiAgICAgICAgcm90YXRlICs9IDkwO1xuICAgIH1cblxuICAgIHZhciB0ID0gZ2V0Um90YXRlZFRleHRTaXplKHRleHRCQiwgcm90YXRlKTtcblxuICAgIHZhciBzY2FsZSA9IDE7XG4gICAgaWYoY29uc3RyYWluZWQpIHtcbiAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICBseCAvIHQueCxcbiAgICAgICAgICAgIGx5IC8gdC55XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY29tcHV0ZSB0ZXh0IGFuZCB0YXJnZXQgcG9zaXRpb25zXG4gICAgdmFyIHRleHRYID0gKFxuICAgICAgICB0ZXh0QkIubGVmdCAqIHRvTGVmdCArXG4gICAgICAgIHRleHRCQi5yaWdodCAqIHRvUmlnaHRcbiAgICApO1xuICAgIHZhciB0ZXh0WSA9ICh0ZXh0QkIudG9wICsgdGV4dEJCLmJvdHRvbSkgLyAyO1xuICAgIHZhciB0YXJnZXRYID0gKFxuICAgICAgICAoeDAgKyBURVhUUEFEKSAqIHRvTGVmdCArXG4gICAgICAgICh4MSAtIFRFWFRQQUQpICogdG9SaWdodFxuICAgICk7XG4gICAgdmFyIHRhcmdldFkgPSAoeTAgKyB5MSkgLyAyO1xuICAgIHZhciBhbmNob3JYID0gMDtcbiAgICB2YXIgYW5jaG9yWSA9IDA7XG4gICAgaWYoaXNTdGFydCB8fCBpc0VuZCkge1xuICAgICAgICB2YXIgZXh0cmFwYWQgPSAoaXNIb3Jpem9udGFsID8gdC54IDogdC55KSAvIDI7XG4gICAgICAgIHZhciBkaXIgPSBpc0hvcml6b250YWwgPyBkaXJTaWduKHgwLCB4MSkgOiBkaXJTaWduKHkwLCB5MSk7XG5cbiAgICAgICAgaWYoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICBpZihpc1N0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0WCA9IHgwICsgZGlyICogdGV4dHBhZDtcbiAgICAgICAgICAgICAgICBhbmNob3JYID0gLWRpciAqIGV4dHJhcGFkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRYID0geDEgLSBkaXIgKiB0ZXh0cGFkO1xuICAgICAgICAgICAgICAgIGFuY2hvclggPSBkaXIgKiBleHRyYXBhZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGlzU3RhcnQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRZID0geTAgKyBkaXIgKiB0ZXh0cGFkO1xuICAgICAgICAgICAgICAgIGFuY2hvclkgPSAtZGlyICogZXh0cmFwYWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFkgPSB5MSAtIGRpciAqIHRleHRwYWQ7XG4gICAgICAgICAgICAgICAgYW5jaG9yWSA9IGRpciAqIGV4dHJhcGFkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dFg6IHRleHRYLFxuICAgICAgICB0ZXh0WTogdGV4dFksXG4gICAgICAgIHRhcmdldFg6IHRhcmdldFgsXG4gICAgICAgIHRhcmdldFk6IHRhcmdldFksXG4gICAgICAgIGFuY2hvclg6IGFuY2hvclgsXG4gICAgICAgIGFuY2hvclk6IGFuY2hvclksXG4gICAgICAgIHNjYWxlOiBzY2FsZSxcbiAgICAgICAgcm90YXRlOiByb3RhdGVcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB0b01vdmVPdXRzaWRlQmFyKHgwLCB4MSwgeTAsIHkxLCB0ZXh0QkIsIG9wdHMpIHtcbiAgICB2YXIgaXNIb3Jpem9udGFsID0gISFvcHRzLmlzSG9yaXpvbnRhbDtcbiAgICB2YXIgY29uc3RyYWluZWQgPSAhIW9wdHMuY29uc3RyYWluZWQ7XG4gICAgdmFyIGFuZ2xlID0gb3B0cy5hbmdsZSB8fCAwO1xuXG4gICAgdmFyIHRleHRXaWR0aCA9IHRleHRCQi53aWR0aDtcbiAgICB2YXIgdGV4dEhlaWdodCA9IHRleHRCQi5oZWlnaHQ7XG4gICAgdmFyIGx4ID0gTWF0aC5hYnMoeDEgLSB4MCk7XG4gICAgdmFyIGx5ID0gTWF0aC5hYnMoeTEgLSB5MCk7XG5cbiAgICB2YXIgdGV4dHBhZDtcbiAgICAvLyBLZWVwIHRoZSBwYWRkaW5nIHNvIHRoZSB0ZXh0IGRvZXNuJ3Qgc2l0IHJpZ2h0IGFnYWluc3RcbiAgICAvLyB0aGUgYmFycywgYnV0IGRvbid0IGZhY3RvciBpdCBpbnRvIGJhcldpZHRoXG4gICAgaWYoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgIHRleHRwYWQgPSAobHkgPiAyICogVEVYVFBBRCkgPyBURVhUUEFEIDogMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0cGFkID0gKGx4ID4gMiAqIFRFWFRQQUQpID8gVEVYVFBBRCA6IDA7XG4gICAgfVxuXG4gICAgLy8gY29tcHV0ZSByb3RhdGUgYW5kIHNjYWxlXG4gICAgdmFyIHNjYWxlID0gMTtcbiAgICBpZihjb25zdHJhaW5lZCkge1xuICAgICAgICBzY2FsZSA9IChpc0hvcml6b250YWwpID9cbiAgICAgICAgICAgIE1hdGgubWluKDEsIGx5IC8gdGV4dEhlaWdodCkgOlxuICAgICAgICAgICAgTWF0aC5taW4oMSwgbHggLyB0ZXh0V2lkdGgpO1xuICAgIH1cblxuICAgIHZhciByb3RhdGUgPSBnZXRSb3RhdGVGcm9tQW5nbGUoYW5nbGUpO1xuICAgIHZhciB0ID0gZ2V0Um90YXRlZFRleHRTaXplKHRleHRCQiwgcm90YXRlKTtcblxuICAgIC8vIGNvbXB1dGUgdGV4dCBhbmQgdGFyZ2V0IHBvc2l0aW9uc1xuICAgIHZhciBleHRyYXBhZCA9IChpc0hvcml6b250YWwgPyB0LnggOiB0LnkpIC8gMjtcbiAgICB2YXIgdGV4dFggPSAodGV4dEJCLmxlZnQgKyB0ZXh0QkIucmlnaHQpIC8gMjtcbiAgICB2YXIgdGV4dFkgPSAodGV4dEJCLnRvcCArIHRleHRCQi5ib3R0b20pIC8gMjtcbiAgICB2YXIgdGFyZ2V0WCA9ICh4MCArIHgxKSAvIDI7XG4gICAgdmFyIHRhcmdldFkgPSAoeTAgKyB5MSkgLyAyO1xuICAgIHZhciBhbmNob3JYID0gMDtcbiAgICB2YXIgYW5jaG9yWSA9IDA7XG5cbiAgICB2YXIgZGlyID0gaXNIb3Jpem9udGFsID8gZGlyU2lnbih4MSwgeDApIDogZGlyU2lnbih5MCwgeTEpO1xuICAgIGlmKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICB0YXJnZXRYID0geDEgLSBkaXIgKiB0ZXh0cGFkO1xuICAgICAgICBhbmNob3JYID0gZGlyICogZXh0cmFwYWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0WSA9IHkxICsgZGlyICogdGV4dHBhZDtcbiAgICAgICAgYW5jaG9yWSA9IC1kaXIgKiBleHRyYXBhZDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0WDogdGV4dFgsXG4gICAgICAgIHRleHRZOiB0ZXh0WSxcbiAgICAgICAgdGFyZ2V0WDogdGFyZ2V0WCxcbiAgICAgICAgdGFyZ2V0WTogdGFyZ2V0WSxcbiAgICAgICAgYW5jaG9yWDogYW5jaG9yWCxcbiAgICAgICAgYW5jaG9yWTogYW5jaG9yWSxcbiAgICAgICAgc2NhbGU6IHNjYWxlLFxuICAgICAgICByb3RhdGU6IHJvdGF0ZVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldFRleHQoZnVsbExheW91dCwgY2QsIGluZGV4LCB4YSwgeWEpIHtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgdGV4dHRlbXBsYXRlID0gdHJhY2UudGV4dHRlbXBsYXRlO1xuXG4gICAgdmFyIHZhbHVlO1xuICAgIGlmKHRleHR0ZW1wbGF0ZSkge1xuICAgICAgICB2YWx1ZSA9IGNhbGNUZXh0dGVtcGxhdGUoZnVsbExheW91dCwgY2QsIGluZGV4LCB4YSwgeWEpO1xuICAgIH0gZWxzZSBpZih0cmFjZS50ZXh0aW5mbykge1xuICAgICAgICB2YWx1ZSA9IGNhbGNUZXh0aW5mbyhjZCwgaW5kZXgsIHhhLCB5YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBoZWxwZXJzLmdldFZhbHVlKHRyYWNlLnRleHQsIGluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVscGVycy5jb2VyY2VTdHJpbmcoYXR0cmlidXRlVGV4dCwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXRUZXh0UG9zaXRpb24odHJhY2UsIGluZGV4KSB7XG4gICAgdmFyIHZhbHVlID0gaGVscGVycy5nZXRWYWx1ZSh0cmFjZS50ZXh0cG9zaXRpb24sIGluZGV4KTtcbiAgICByZXR1cm4gaGVscGVycy5jb2VyY2VFbnVtZXJhdGVkKGF0dHJpYnV0ZVRleHRQb3NpdGlvbiwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBjYWxjVGV4dHRlbXBsYXRlKGZ1bGxMYXlvdXQsIGNkLCBpbmRleCwgeGEsIHlhKSB7XG4gICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG4gICAgdmFyIHRleHR0ZW1wbGF0ZSA9IExpYi5jYXN0T3B0aW9uKHRyYWNlLCBpbmRleCwgJ3RleHR0ZW1wbGF0ZScpO1xuICAgIGlmKCF0ZXh0dGVtcGxhdGUpIHJldHVybiAnJztcbiAgICB2YXIgaXNXYXRlcmZhbGwgPSAodHJhY2UudHlwZSA9PT0gJ3dhdGVyZmFsbCcpO1xuICAgIHZhciBpc0Z1bm5lbCA9ICh0cmFjZS50eXBlID09PSAnZnVubmVsJyk7XG5cbiAgICB2YXIgcExldHRlciwgcEF4aXM7XG4gICAgdmFyIHZMZXR0ZXIsIHZBeGlzO1xuICAgIGlmKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgcExldHRlciA9ICd5JztcbiAgICAgICAgcEF4aXMgPSB5YTtcbiAgICAgICAgdkxldHRlciA9ICd4JztcbiAgICAgICAgdkF4aXMgPSB4YTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwTGV0dGVyID0gJ3gnO1xuICAgICAgICBwQXhpcyA9IHhhO1xuICAgICAgICB2TGV0dGVyID0gJ3knO1xuICAgICAgICB2QXhpcyA9IHlhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdExhYmVsKHUpIHtcbiAgICAgICAgcmV0dXJuIHRpY2tUZXh0KHBBeGlzLCB1LCB0cnVlKS50ZXh0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdE51bWJlcih2KSB7XG4gICAgICAgIHJldHVybiB0aWNrVGV4dCh2QXhpcywgK3YsIHRydWUpLnRleHQ7XG4gICAgfVxuXG4gICAgdmFyIGNkaSA9IGNkW2luZGV4XTtcbiAgICB2YXIgb2JqID0ge307XG5cbiAgICBvYmoubGFiZWwgPSBjZGkucDtcbiAgICBvYmoubGFiZWxMYWJlbCA9IG9ialtwTGV0dGVyICsgJ0xhYmVsJ10gPSBmb3JtYXRMYWJlbChjZGkucCk7XG5cbiAgICB2YXIgdHggPSBMaWIuY2FzdE9wdGlvbih0cmFjZSwgY2RpLmksICd0ZXh0Jyk7XG4gICAgaWYodHggPT09IDAgfHwgdHgpIG9iai50ZXh0ID0gdHg7XG5cbiAgICBvYmoudmFsdWUgPSBjZGkucztcbiAgICBvYmoudmFsdWVMYWJlbCA9IG9ialt2TGV0dGVyICsgJ0xhYmVsJ10gPSBmb3JtYXROdW1iZXIoY2RpLnMpO1xuXG4gICAgdmFyIHB0ID0ge307XG4gICAgYXBwZW5kQXJyYXlQb2ludFZhbHVlKHB0LCB0cmFjZSwgY2RpLmkpO1xuXG4gICAgaWYoaXNXYXRlcmZhbGwpIHtcbiAgICAgICAgb2JqLmRlbHRhID0gK2NkaS5yYXdTIHx8IGNkaS5zO1xuICAgICAgICBvYmouZGVsdGFMYWJlbCA9IGZvcm1hdE51bWJlcihvYmouZGVsdGEpO1xuICAgICAgICBvYmouZmluYWwgPSBjZGkudjtcbiAgICAgICAgb2JqLmZpbmFsTGFiZWwgPSBmb3JtYXROdW1iZXIob2JqLmZpbmFsKTtcbiAgICAgICAgb2JqLmluaXRpYWwgPSBvYmouZmluYWwgLSBvYmouZGVsdGE7XG4gICAgICAgIG9iai5pbml0aWFsTGFiZWwgPSBmb3JtYXROdW1iZXIob2JqLmluaXRpYWwpO1xuICAgIH1cblxuICAgIGlmKGlzRnVubmVsKSB7XG4gICAgICAgIG9iai52YWx1ZSA9IGNkaS5zO1xuICAgICAgICBvYmoudmFsdWVMYWJlbCA9IGZvcm1hdE51bWJlcihvYmoudmFsdWUpO1xuXG4gICAgICAgIG9iai5wZXJjZW50SW5pdGlhbCA9IGNkaS5iZWdSO1xuICAgICAgICBvYmoucGVyY2VudEluaXRpYWxMYWJlbCA9IExpYi5mb3JtYXRQZXJjZW50KGNkaS5iZWdSKTtcbiAgICAgICAgb2JqLnBlcmNlbnRQcmV2aW91cyA9IGNkaS5kaWZSO1xuICAgICAgICBvYmoucGVyY2VudFByZXZpb3VzTGFiZWwgPSBMaWIuZm9ybWF0UGVyY2VudChjZGkuZGlmUik7XG4gICAgICAgIG9iai5wZXJjZW50VG90YWwgPSBjZGkuc3VtUjtcbiAgICAgICAgb2JqLnBlcmNlblRvdGFsTGFiZWwgPSBMaWIuZm9ybWF0UGVyY2VudChjZGkuc3VtUik7XG4gICAgfVxuXG4gICAgdmFyIGN1c3RvbWRhdGEgPSBMaWIuY2FzdE9wdGlvbih0cmFjZSwgY2RpLmksICdjdXN0b21kYXRhJyk7XG4gICAgaWYoY3VzdG9tZGF0YSkgb2JqLmN1c3RvbWRhdGEgPSBjdXN0b21kYXRhO1xuICAgIHJldHVybiBMaWIudGV4dHRlbXBsYXRlU3RyaW5nKHRleHR0ZW1wbGF0ZSwgb2JqLCBmdWxsTGF5b3V0Ll9kM2xvY2FsZSwgcHQsIG9iaiwgdHJhY2UuX21ldGEgfHwge30pO1xufVxuXG5mdW5jdGlvbiBjYWxjVGV4dGluZm8oY2QsIGluZGV4LCB4YSwgeWEpIHtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgaXNIb3Jpem9udGFsID0gKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpO1xuICAgIHZhciBpc1dhdGVyZmFsbCA9ICh0cmFjZS50eXBlID09PSAnd2F0ZXJmYWxsJyk7XG4gICAgdmFyIGlzRnVubmVsID0gKHRyYWNlLnR5cGUgPT09ICdmdW5uZWwnKTtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdExhYmVsKHUpIHtcbiAgICAgICAgdmFyIHBBeGlzID0gaXNIb3Jpem9udGFsID8geWEgOiB4YTtcbiAgICAgICAgcmV0dXJuIHRpY2tUZXh0KHBBeGlzLCB1LCB0cnVlKS50ZXh0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdE51bWJlcih2KSB7XG4gICAgICAgIHZhciBzQXhpcyA9IGlzSG9yaXpvbnRhbCA/IHhhIDogeWE7XG4gICAgICAgIHJldHVybiB0aWNrVGV4dChzQXhpcywgK3YsIHRydWUpLnRleHQ7XG4gICAgfVxuXG4gICAgdmFyIHRleHRpbmZvID0gdHJhY2UudGV4dGluZm87XG4gICAgdmFyIGNkaSA9IGNkW2luZGV4XTtcblxuICAgIHZhciBwYXJ0cyA9IHRleHRpbmZvLnNwbGl0KCcrJyk7XG4gICAgdmFyIHRleHQgPSBbXTtcbiAgICB2YXIgdHg7XG5cbiAgICB2YXIgaGFzRmxhZyA9IGZ1bmN0aW9uKGZsYWcpIHsgcmV0dXJuIHBhcnRzLmluZGV4T2YoZmxhZykgIT09IC0xOyB9O1xuXG4gICAgaWYoaGFzRmxhZygnbGFiZWwnKSkge1xuICAgICAgICB0ZXh0LnB1c2goZm9ybWF0TGFiZWwoY2RbaW5kZXhdLnApKTtcbiAgICB9XG5cbiAgICBpZihoYXNGbGFnKCd0ZXh0JykpIHtcbiAgICAgICAgdHggPSBMaWIuY2FzdE9wdGlvbih0cmFjZSwgY2RpLmksICd0ZXh0Jyk7XG4gICAgICAgIGlmKHR4ID09PSAwIHx8IHR4KSB0ZXh0LnB1c2godHgpO1xuICAgIH1cblxuICAgIGlmKGlzV2F0ZXJmYWxsKSB7XG4gICAgICAgIHZhciBkZWx0YSA9ICtjZGkucmF3UyB8fCBjZGkucztcbiAgICAgICAgdmFyIGZpbmFsID0gY2RpLnY7XG4gICAgICAgIHZhciBpbml0aWFsID0gZmluYWwgLSBkZWx0YTtcblxuICAgICAgICBpZihoYXNGbGFnKCdpbml0aWFsJykpIHRleHQucHVzaChmb3JtYXROdW1iZXIoaW5pdGlhbCkpO1xuICAgICAgICBpZihoYXNGbGFnKCdkZWx0YScpKSB0ZXh0LnB1c2goZm9ybWF0TnVtYmVyKGRlbHRhKSk7XG4gICAgICAgIGlmKGhhc0ZsYWcoJ2ZpbmFsJykpIHRleHQucHVzaChmb3JtYXROdW1iZXIoZmluYWwpKTtcbiAgICB9XG5cbiAgICBpZihpc0Z1bm5lbCkge1xuICAgICAgICBpZihoYXNGbGFnKCd2YWx1ZScpKSB0ZXh0LnB1c2goZm9ybWF0TnVtYmVyKGNkaS5zKSk7XG5cbiAgICAgICAgdmFyIG5QZXJjZW50ID0gMDtcbiAgICAgICAgaWYoaGFzRmxhZygncGVyY2VudCBpbml0aWFsJykpIG5QZXJjZW50Kys7XG4gICAgICAgIGlmKGhhc0ZsYWcoJ3BlcmNlbnQgcHJldmlvdXMnKSkgblBlcmNlbnQrKztcbiAgICAgICAgaWYoaGFzRmxhZygncGVyY2VudCB0b3RhbCcpKSBuUGVyY2VudCsrO1xuXG4gICAgICAgIHZhciBoYXNNdWx0aXBsZVBlcmNlbnRzID0gblBlcmNlbnQgPiAxO1xuXG4gICAgICAgIGlmKGhhc0ZsYWcoJ3BlcmNlbnQgaW5pdGlhbCcpKSB7XG4gICAgICAgICAgICB0eCA9IExpYi5mb3JtYXRQZXJjZW50KGNkaS5iZWdSKTtcbiAgICAgICAgICAgIGlmKGhhc011bHRpcGxlUGVyY2VudHMpIHR4ICs9ICcgb2YgaW5pdGlhbCc7XG4gICAgICAgICAgICB0ZXh0LnB1c2godHgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGhhc0ZsYWcoJ3BlcmNlbnQgcHJldmlvdXMnKSkge1xuICAgICAgICAgICAgdHggPSBMaWIuZm9ybWF0UGVyY2VudChjZGkuZGlmUik7XG4gICAgICAgICAgICBpZihoYXNNdWx0aXBsZVBlcmNlbnRzKSB0eCArPSAnIG9mIHByZXZpb3VzJztcbiAgICAgICAgICAgIHRleHQucHVzaCh0eCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaGFzRmxhZygncGVyY2VudCB0b3RhbCcpKSB7XG4gICAgICAgICAgICB0eCA9IExpYi5mb3JtYXRQZXJjZW50KGNkaS5zdW1SKTtcbiAgICAgICAgICAgIGlmKGhhc011bHRpcGxlUGVyY2VudHMpIHR4ICs9ICcgb2YgdG90YWwnO1xuICAgICAgICAgICAgdGV4dC5wdXNoKHR4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXh0LmpvaW4oJzxicj4nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcGxvdDogcGxvdCxcbiAgICB0b01vdmVJbnNpZGVCYXI6IHRvTW92ZUluc2lkZUJhclxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xuXG52YXIgcmVzaXplVGV4dCA9IHJlcXVpcmUoJy4vdW5pZm9ybV90ZXh0JykucmVzaXplVGV4dDtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgYXR0cmlidXRlVGV4dEZvbnQgPSBhdHRyaWJ1dGVzLnRleHRmb250O1xudmFyIGF0dHJpYnV0ZUluc2lkZVRleHRGb250ID0gYXR0cmlidXRlcy5pbnNpZGV0ZXh0Zm9udDtcbnZhciBhdHRyaWJ1dGVPdXRzaWRlVGV4dEZvbnQgPSBhdHRyaWJ1dGVzLm91dHNpZGV0ZXh0Zm9udDtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbmZ1bmN0aW9uIHN0eWxlKGdkKSB7XG4gICAgdmFyIHMgPSBkMy5zZWxlY3QoZ2QpLnNlbGVjdEFsbCgnZy5iYXJsYXllcicpLnNlbGVjdEFsbCgnZy50cmFjZScpO1xuICAgIHJlc2l6ZVRleHQoZ2QsIHMsICdiYXInKTtcblxuICAgIHZhciBiYXJjb3VudCA9IHMuc2l6ZSgpO1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG5cbiAgICAvLyB0cmFjZSBzdHlsaW5nXG4gICAgcy5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRbMF0udHJhY2Uub3BhY2l0eTsgfSlcblxuICAgIC8vIGZvciBnYXBsZXNzIChlaXRoZXIgc3RhY2tlZCBvciBuZWlnaGJvcmluZyBncm91cGVkKSBiYXJzIHVzZVxuICAgIC8vIGNyaXNwRWRnZXMgdG8gdHVybiBvZmYgYW50aWFsaWFzaW5nIHNvIGFuIGFydGlmaWNpYWwgZ2FwXG4gICAgLy8gaXNuJ3QgaW50cm9kdWNlZC5cbiAgICAuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmKChmdWxsTGF5b3V0LmJhcm1vZGUgPT09ICdzdGFjaycgJiYgYmFyY291bnQgPiAxKSB8fFxuICAgICAgICAgICAgICAgIChmdWxsTGF5b3V0LmJhcmdhcCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICBmdWxsTGF5b3V0LmJhcmdyb3VwZ2FwID09PSAwICYmXG4gICAgICAgICAgICAgICAgICFkWzBdLnRyYWNlLm1hcmtlci5saW5lLndpZHRoKSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ3NoYXBlLXJlbmRlcmluZycsICdjcmlzcEVkZ2VzJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHMuc2VsZWN0QWxsKCdnLnBvaW50cycpLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgc2VsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgdHJhY2UgPSBkWzBdLnRyYWNlO1xuICAgICAgICBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCk7XG4gICAgfSk7XG5cbiAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdzdHlsZScpKHMpO1xufVxuXG5mdW5jdGlvbiBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCkge1xuICAgIERyYXdpbmcucG9pbnRTdHlsZShzZWwuc2VsZWN0QWxsKCdwYXRoJyksIHRyYWNlLCBnZCk7XG4gICAgc3R5bGVUZXh0UG9pbnRzKHNlbCwgdHJhY2UsIGdkKTtcbn1cblxuZnVuY3Rpb24gc3R5bGVUZXh0UG9pbnRzKHNlbCwgdHJhY2UsIGdkKSB7XG4gICAgc2VsLnNlbGVjdEFsbCgndGV4dCcpLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgdHggPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBmb250ID0gTGliLmVuc3VyZVVuaWZvcm1Gb250U2l6ZShnZCwgZGV0ZXJtaW5lRm9udCh0eCwgZCwgdHJhY2UsIGdkKSk7XG5cbiAgICAgICAgRHJhd2luZy5mb250KHR4LCBmb250KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3R5bGVPblNlbGVjdChnZCwgY2QsIHNlbCkge1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuXG4gICAgaWYodHJhY2Uuc2VsZWN0ZWRwb2ludHMpIHtcbiAgICAgICAgc3R5bGVQb2ludHNJblNlbGVjdGlvbk1vZGUoc2VsLCB0cmFjZSwgZ2QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlUG9pbnRzKHNlbCwgdHJhY2UsIGdkKTtcbiAgICAgICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdlcnJvcmJhcnMnLCAnc3R5bGUnKShzZWwpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3R5bGVQb2ludHNJblNlbGVjdGlvbk1vZGUocywgdHJhY2UsIGdkKSB7XG4gICAgRHJhd2luZy5zZWxlY3RlZFBvaW50U3R5bGUocy5zZWxlY3RBbGwoJ3BhdGgnKSwgdHJhY2UpO1xuICAgIHN0eWxlVGV4dEluU2VsZWN0aW9uTW9kZShzLnNlbGVjdEFsbCgndGV4dCcpLCB0cmFjZSwgZ2QpO1xufVxuXG5mdW5jdGlvbiBzdHlsZVRleHRJblNlbGVjdGlvbk1vZGUodHhzLCB0cmFjZSwgZ2QpIHtcbiAgICB0eHMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciB0eCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGZvbnQ7XG5cbiAgICAgICAgaWYoZC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgZm9udCA9IExpYi5lbnN1cmVVbmlmb3JtRm9udFNpemUoZ2QsIGRldGVybWluZUZvbnQodHgsIGQsIHRyYWNlLCBnZCkpO1xuXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRGb250Q29sb3IgPSB0cmFjZS5zZWxlY3RlZC50ZXh0Zm9udCAmJiB0cmFjZS5zZWxlY3RlZC50ZXh0Zm9udC5jb2xvcjtcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkRm9udENvbG9yKSB7XG4gICAgICAgICAgICAgICAgZm9udC5jb2xvciA9IHNlbGVjdGVkRm9udENvbG9yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBEcmF3aW5nLmZvbnQodHgsIGZvbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRHJhd2luZy5zZWxlY3RlZFRleHRTdHlsZSh0eCwgdHJhY2UpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRldGVybWluZUZvbnQodHgsIGQsIHRyYWNlLCBnZCkge1xuICAgIHZhciBsYXlvdXRGb250ID0gZ2QuX2Z1bGxMYXlvdXQuZm9udDtcbiAgICB2YXIgdGV4dEZvbnQgPSB0cmFjZS50ZXh0Zm9udDtcblxuICAgIGlmKHR4LmNsYXNzZWQoJ2JhcnRleHQtaW5zaWRlJykpIHtcbiAgICAgICAgdmFyIGJhckNvbG9yID0gZ2V0QmFyQ29sb3IoZCwgdHJhY2UpO1xuICAgICAgICB0ZXh0Rm9udCA9IGdldEluc2lkZVRleHRGb250KHRyYWNlLCBkLmksIGxheW91dEZvbnQsIGJhckNvbG9yKTtcbiAgICB9IGVsc2UgaWYodHguY2xhc3NlZCgnYmFydGV4dC1vdXRzaWRlJykpIHtcbiAgICAgICAgdGV4dEZvbnQgPSBnZXRPdXRzaWRlVGV4dEZvbnQodHJhY2UsIGQuaSwgbGF5b3V0Rm9udCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHRGb250O1xufVxuXG5mdW5jdGlvbiBnZXRUZXh0Rm9udCh0cmFjZSwgaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgIHJldHVybiBnZXRGb250VmFsdWUoXG4gICAgICBhdHRyaWJ1dGVUZXh0Rm9udCwgdHJhY2UudGV4dGZvbnQsIGluZGV4LCBkZWZhdWx0VmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXRJbnNpZGVUZXh0Rm9udCh0cmFjZSwgaW5kZXgsIGxheW91dEZvbnQsIGJhckNvbG9yKSB7XG4gICAgdmFyIGRlZmF1bHRGb250ID0gZ2V0VGV4dEZvbnQodHJhY2UsIGluZGV4LCBsYXlvdXRGb250KTtcblxuICAgIHZhciB3b3VsZEZhbGxCYWNrVG9MYXlvdXRGb250ID1cbiAgICAgICh0cmFjZS5faW5wdXQudGV4dGZvbnQgPT09IHVuZGVmaW5lZCB8fCB0cmFjZS5faW5wdXQudGV4dGZvbnQuY29sb3IgPT09IHVuZGVmaW5lZCkgfHxcbiAgICAgIChBcnJheS5pc0FycmF5KHRyYWNlLnRleHRmb250LmNvbG9yKSAmJiB0cmFjZS50ZXh0Zm9udC5jb2xvcltpbmRleF0gPT09IHVuZGVmaW5lZCk7XG4gICAgaWYod291bGRGYWxsQmFja1RvTGF5b3V0Rm9udCkge1xuICAgICAgICBkZWZhdWx0Rm9udCA9IHtcbiAgICAgICAgICAgIGNvbG9yOiBDb2xvci5jb250cmFzdChiYXJDb2xvciksXG4gICAgICAgICAgICBmYW1pbHk6IGRlZmF1bHRGb250LmZhbWlseSxcbiAgICAgICAgICAgIHNpemU6IGRlZmF1bHRGb250LnNpemVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0Rm9udFZhbHVlKFxuICAgICAgYXR0cmlidXRlSW5zaWRlVGV4dEZvbnQsIHRyYWNlLmluc2lkZXRleHRmb250LCBpbmRleCwgZGVmYXVsdEZvbnQpO1xufVxuXG5mdW5jdGlvbiBnZXRPdXRzaWRlVGV4dEZvbnQodHJhY2UsIGluZGV4LCBsYXlvdXRGb250KSB7XG4gICAgdmFyIGRlZmF1bHRGb250ID0gZ2V0VGV4dEZvbnQodHJhY2UsIGluZGV4LCBsYXlvdXRGb250KTtcbiAgICByZXR1cm4gZ2V0Rm9udFZhbHVlKFxuICAgICAgYXR0cmlidXRlT3V0c2lkZVRleHRGb250LCB0cmFjZS5vdXRzaWRldGV4dGZvbnQsIGluZGV4LCBkZWZhdWx0Rm9udCk7XG59XG5cbmZ1bmN0aW9uIGdldEZvbnRWYWx1ZShhdHRyaWJ1dGVEZWZpbml0aW9uLCBhdHRyaWJ1dGVWYWx1ZSwgaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlVmFsdWUgfHwge307XG5cbiAgICB2YXIgZmFtaWx5VmFsdWUgPSBoZWxwZXJzLmdldFZhbHVlKGF0dHJpYnV0ZVZhbHVlLmZhbWlseSwgaW5kZXgpO1xuICAgIHZhciBzaXplVmFsdWUgPSBoZWxwZXJzLmdldFZhbHVlKGF0dHJpYnV0ZVZhbHVlLnNpemUsIGluZGV4KTtcbiAgICB2YXIgY29sb3JWYWx1ZSA9IGhlbHBlcnMuZ2V0VmFsdWUoYXR0cmlidXRlVmFsdWUuY29sb3IsIGluZGV4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZhbWlseTogaGVscGVycy5jb2VyY2VTdHJpbmcoXG4gICAgICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5mYW1pbHksIGZhbWlseVZhbHVlLCBkZWZhdWx0VmFsdWUuZmFtaWx5KSxcbiAgICAgICAgc2l6ZTogaGVscGVycy5jb2VyY2VOdW1iZXIoXG4gICAgICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5zaXplLCBzaXplVmFsdWUsIGRlZmF1bHRWYWx1ZS5zaXplKSxcbiAgICAgICAgY29sb3I6IGhlbHBlcnMuY29lcmNlQ29sb3IoXG4gICAgICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5jb2xvciwgY29sb3JWYWx1ZSwgZGVmYXVsdFZhbHVlLmNvbG9yKVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldEJhckNvbG9yKGNkLCB0cmFjZSkge1xuICAgIGlmKHRyYWNlLnR5cGUgPT09ICd3YXRlcmZhbGwnKSB7XG4gICAgICAgIHJldHVybiB0cmFjZVtjZC5kaXJdLm1hcmtlci5jb2xvcjtcbiAgICB9XG4gICAgcmV0dXJuIGNkLm1jIHx8IHRyYWNlLm1hcmtlci5jb2xvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIHN0eWxlVGV4dFBvaW50czogc3R5bGVUZXh0UG9pbnRzLFxuICAgIHN0eWxlT25TZWxlY3Q6IHN0eWxlT25TZWxlY3QsXG4gICAgZ2V0SW5zaWRlVGV4dEZvbnQ6IGdldEluc2lkZVRleHRGb250LFxuICAgIGdldE91dHNpZGVUZXh0Rm9udDogZ2V0T3V0c2lkZVRleHRGb250LFxuICAgIGdldEJhckNvbG9yOiBnZXRCYXJDb2xvcixcbiAgICByZXNpemVUZXh0OiByZXNpemVUZXh0XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG5mdW5jdGlvbiByZXNpemVUZXh0KGdkLCBnVHJhY2UsIHRyYWNlVHlwZSkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIG1pblNpemUgPSBmdWxsTGF5b3V0WydfJyArIHRyYWNlVHlwZSArICdUZXh0X21pbnNpemUnXTtcbiAgICBpZihtaW5TaXplKSB7XG4gICAgICAgIHZhciBzaG91bGRIaWRlID0gZnVsbExheW91dC51bmlmb3JtdGV4dC5tb2RlID09PSAnaGlkZSc7XG5cbiAgICAgICAgdmFyIHNlbGVjdG9yO1xuICAgICAgICBzd2l0Y2godHJhY2VUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdmdW5uZWxhcmVhJyA6XG4gICAgICAgICAgICBjYXNlICdwaWUnIDpcbiAgICAgICAgICAgIGNhc2UgJ3N1bmJ1cnN0JyA6XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnZy5zbGljZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0cmVlbWFwJyA6XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnZy5zbGljZSwgZy5wYXRoYmFyJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJ2cucG9pbnRzID4gZy5wb2ludCc7XG4gICAgICAgIH1cblxuICAgICAgICBnVHJhY2Uuc2VsZWN0QWxsKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSBkLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIGlmKHRyYW5zZm9ybSkge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5zY2FsZSA9IChzaG91bGRIaWRlICYmIHRyYW5zZm9ybS5oaWRlKSA/IDAgOiBtaW5TaXplIC8gdHJhbnNmb3JtLmZvbnRTaXplO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgndGV4dCcpO1xuICAgICAgICAgICAgICAgIGVsLmF0dHIoJ3RyYW5zZm9ybScsIExpYi5nZXRUZXh0VHJhbnNmb3JtKHRyYW5zZm9ybSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlY29yZE1pblRleHRTaXplKFxuICAgIHRyYWNlVHlwZSwgLy8gaW5cbiAgICB0cmFuc2Zvcm0sIC8vIGlub3V0XG4gICAgZnVsbExheW91dCAvLyBpbm91dFxuKSB7XG4gICAgaWYoZnVsbExheW91dC51bmlmb3JtdGV4dC5tb2RlKSB7XG4gICAgICAgIHZhciBtaW5LZXkgPSBnZXRNaW5LZXkodHJhY2VUeXBlKTtcbiAgICAgICAgdmFyIG1pblNpemUgPSBmdWxsTGF5b3V0LnVuaWZvcm10ZXh0Lm1pbnNpemU7XG4gICAgICAgIHZhciBzaXplID0gdHJhbnNmb3JtLnNjYWxlICogdHJhbnNmb3JtLmZvbnRTaXplO1xuXG4gICAgICAgIHRyYW5zZm9ybS5oaWRlID0gc2l6ZSA8IG1pblNpemU7XG5cbiAgICAgICAgZnVsbExheW91dFttaW5LZXldID0gZnVsbExheW91dFttaW5LZXldIHx8IEluZmluaXR5O1xuICAgICAgICBpZighdHJhbnNmb3JtLmhpZGUpIHtcbiAgICAgICAgICAgIGZ1bGxMYXlvdXRbbWluS2V5XSA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgIGZ1bGxMYXlvdXRbbWluS2V5XSxcbiAgICAgICAgICAgICAgICBNYXRoLm1heChzaXplLCBtaW5TaXplKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJNaW5UZXh0U2l6ZShcbiAgICB0cmFjZVR5cGUsIC8vIGluXG4gICAgZnVsbExheW91dCAvLyBpbm91dFxuKSB7XG4gICAgdmFyIG1pbktleSA9IGdldE1pbktleSh0cmFjZVR5cGUpO1xuICAgIGZ1bGxMYXlvdXRbbWluS2V5XSA9IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0TWluS2V5KHRyYWNlVHlwZSkge1xuICAgIHJldHVybiAnXycgKyB0cmFjZVR5cGUgKyAnVGV4dF9taW5zaXplJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVjb3JkTWluVGV4dFNpemU6IHJlY29yZE1pblRleHRTaXplLFxuICAgIGNsZWFyTWluVGV4dFNpemU6IGNsZWFyTWluVGV4dFNpemUsXG4gICAgcmVzaXplVGV4dDogcmVzaXplVGV4dFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=