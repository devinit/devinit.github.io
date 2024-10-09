(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_bar_cross_trace_calc_js-node_modules_plotly_js_src_-e3a09a"],{

/***/ "./node_modules/plotly.js/src/traces/bar/cross_trace_calc.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/cross_trace_calc.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var getAxisGroup = __webpack_require__(/*! ../../plots/cartesian/axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js").getAxisGroup;
var Sieve = __webpack_require__(/*! ./sieve.js */ "./node_modules/plotly.js/src/traces/bar/sieve.js");

/*
 * Bar chart stacking/grouping positioning and autoscaling calculations
 * for each direction separately calculate the ranges and positions
 * note that this handles histograms too
 * now doing this one subplot at a time
 */

function crossTraceCalc(gd, plotinfo) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    var fullLayout = gd._fullLayout;
    var fullTraces = gd._fullData;
    var calcTraces = gd.calcdata;
    var calcTracesHorz = [];
    var calcTracesVert = [];

    for(var i = 0; i < fullTraces.length; i++) {
        var fullTrace = fullTraces[i];
        if(
            fullTrace.visible === true &&
            Registry.traceIs(fullTrace, 'bar') &&
            fullTrace.xaxis === xa._id &&
            fullTrace.yaxis === ya._id
        ) {
            if(fullTrace.orientation === 'h') {
                calcTracesHorz.push(calcTraces[i]);
            } else {
                calcTracesVert.push(calcTraces[i]);
            }

            if(fullTrace._computePh) {
                var cd = gd.calcdata[i];
                for(var j = 0; j < cd.length; j++) {
                    if(typeof cd[j].ph0 === 'function') cd[j].ph0 = cd[j].ph0();
                    if(typeof cd[j].ph1 === 'function') cd[j].ph1 = cd[j].ph1();
                }
            }
        }
    }

    var opts = {
        mode: fullLayout.barmode,
        norm: fullLayout.barnorm,
        gap: fullLayout.bargap,
        groupgap: fullLayout.bargroupgap
    };

    setGroupPositions(gd, xa, ya, calcTracesVert, opts);
    setGroupPositions(gd, ya, xa, calcTracesHorz, opts);
}

function setGroupPositions(gd, pa, sa, calcTraces, opts) {
    if(!calcTraces.length) return;

    var excluded;
    var included;
    var i, calcTrace, fullTrace;

    initBase(sa, calcTraces);

    switch(opts.mode) {
        case 'overlay':
            setGroupPositionsInOverlayMode(pa, sa, calcTraces, opts);
            break;

        case 'group':
            // exclude from the group those traces for which the user set an offset
            excluded = [];
            included = [];
            for(i = 0; i < calcTraces.length; i++) {
                calcTrace = calcTraces[i];
                fullTrace = calcTrace[0].trace;

                if(fullTrace.offset === undefined) included.push(calcTrace);
                else excluded.push(calcTrace);
            }

            if(included.length) {
                setGroupPositionsInGroupMode(gd, pa, sa, included, opts);
            }
            if(excluded.length) {
                setGroupPositionsInOverlayMode(pa, sa, excluded, opts);
            }
            break;

        case 'stack':
        case 'relative':
            // exclude from the stack those traces for which the user set a base
            excluded = [];
            included = [];
            for(i = 0; i < calcTraces.length; i++) {
                calcTrace = calcTraces[i];
                fullTrace = calcTrace[0].trace;

                if(fullTrace.base === undefined) included.push(calcTrace);
                else excluded.push(calcTrace);
            }

            if(included.length) {
                setGroupPositionsInStackOrRelativeMode(gd, pa, sa, included, opts);
            }
            if(excluded.length) {
                setGroupPositionsInOverlayMode(pa, sa, excluded, opts);
            }
            break;
    }

    collectExtents(calcTraces, pa);
}

function initBase(sa, calcTraces) {
    var i, j;

    for(i = 0; i < calcTraces.length; i++) {
        var cd = calcTraces[i];
        var trace = cd[0].trace;
        var base = (trace.type === 'funnel') ? trace._base : trace.base;
        var b;

        // not sure if it really makes sense to have dates for bar size data...
        // ideally if we want to make gantt charts or something we'd treat
        // the actual size (trace.x or y) as time delta but base as absolute
        // time. But included here for completeness.
        var scalendar = trace.orientation === 'h' ? trace.xcalendar : trace.ycalendar;

        // 'base' on categorical axes makes no sense
        var d2c = sa.type === 'category' || sa.type === 'multicategory' ?
            function() { return null; } :
            sa.d2c;

        if(isArrayOrTypedArray(base)) {
            for(j = 0; j < Math.min(base.length, cd.length); j++) {
                b = d2c(base[j], 0, scalendar);
                if(isNumeric(b)) {
                    cd[j].b = +b;
                    cd[j].hasB = 1;
                } else cd[j].b = 0;
            }
            for(; j < cd.length; j++) {
                cd[j].b = 0;
            }
        } else {
            b = d2c(base, 0, scalendar);
            var hasBase = isNumeric(b);
            b = hasBase ? b : 0;
            for(j = 0; j < cd.length; j++) {
                cd[j].b = b;
                if(hasBase) cd[j].hasB = 1;
            }
        }
    }
}

function setGroupPositionsInOverlayMode(pa, sa, calcTraces, opts) {
    // update position axis and set bar offsets and widths
    for(var i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];

        var sieve = new Sieve([calcTrace], {
            sepNegVal: false,
            overlapNoMerge: !opts.norm
        });

        // set bar offsets and widths, and update position axis
        setOffsetAndWidth(pa, sieve, opts);

        // set bar bases and sizes, and update size axis
        //
        // (note that `setGroupPositionsInOverlayMode` handles the case barnorm
        // is defined, because this function is also invoked for traces that
        // can't be grouped or stacked)
        if(opts.norm) {
            sieveBars(sieve);
            normalizeBars(sa, sieve, opts);
        } else {
            setBaseAndTop(sa, sieve);
        }
    }
}

function setGroupPositionsInGroupMode(gd, pa, sa, calcTraces, opts) {
    var sieve = new Sieve(calcTraces, {
        sepNegVal: false,
        overlapNoMerge: !opts.norm
    });

    // set bar offsets and widths, and update position axis
    setOffsetAndWidthInGroupMode(gd, pa, sieve, opts);

    // relative-stack bars within the same trace that would otherwise
    // be hidden
    unhideBarsWithinTrace(sieve);

    // set bar bases and sizes, and update size axis
    if(opts.norm) {
        sieveBars(sieve);
        normalizeBars(sa, sieve, opts);
    } else {
        setBaseAndTop(sa, sieve);
    }
}

function setGroupPositionsInStackOrRelativeMode(gd, pa, sa, calcTraces, opts) {
    var sieve = new Sieve(calcTraces, {
        sepNegVal: opts.mode === 'relative',
        overlapNoMerge: !(opts.norm || opts.mode === 'stack' || opts.mode === 'relative')
    });

    // set bar offsets and widths, and update position axis
    setOffsetAndWidth(pa, sieve, opts);

    // set bar bases and sizes, and update size axis
    stackBars(sa, sieve, opts);

    // flag the outmost bar (for text display purposes)
    for(var i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];

        for(var j = 0; j < calcTrace.length; j++) {
            var bar = calcTrace[j];

            if(bar.s !== BADNUM) {
                var isOutmostBar = ((bar.b + bar.s) === sieve.get(bar.p, bar.s));
                if(isOutmostBar) bar._outmost = true;
            }
        }
    }

    // Note that marking the outmost bars has to be done
    // before `normalizeBars` changes `bar.b` and `bar.s`.
    if(opts.norm) normalizeBars(sa, sieve, opts);
}

function setOffsetAndWidth(pa, sieve, opts) {
    var minDiff = sieve.minDiff;
    var calcTraces = sieve.traces;

    // set bar offsets and widths
    var barGroupWidth = minDiff * (1 - opts.gap);
    var barWidthPlusGap = barGroupWidth;
    var barWidth = barWidthPlusGap * (1 - (opts.groupgap || 0));

    // computer bar group center and bar offset
    var offsetFromCenter = -barWidth / 2;

    for(var i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];
        var t = calcTrace[0].t;

        // store bar width and offset for this trace
        t.barwidth = barWidth;
        t.poffset = offsetFromCenter;
        t.bargroupwidth = barGroupWidth;
        t.bardelta = minDiff;
    }

    // stack bars that only differ by rounding
    sieve.binWidth = calcTraces[0][0].t.barwidth / 100;

    // if defined, apply trace offset and width
    applyAttributes(sieve);

    // store the bar center in each calcdata item
    setBarCenterAndWidth(pa, sieve);

    // update position axes
    updatePositionAxis(pa, sieve);
}

function setOffsetAndWidthInGroupMode(gd, pa, sieve, opts) {
    var fullLayout = gd._fullLayout;
    var positions = sieve.positions;
    var distinctPositions = sieve.distinctPositions;
    var minDiff = sieve.minDiff;
    var calcTraces = sieve.traces;
    var nTraces = calcTraces.length;

    // if there aren't any overlapping positions,
    // let them have full width even if mode is group
    var overlap = (positions.length !== distinctPositions.length);
    var barGroupWidth = minDiff * (1 - opts.gap);

    var groupId = getAxisGroup(fullLayout, pa._id) + calcTraces[0][0].trace.orientation;
    var alignmentGroups = fullLayout._alignmentOpts[groupId] || {};

    for(var i = 0; i < nTraces; i++) {
        var calcTrace = calcTraces[i];
        var trace = calcTrace[0].trace;

        var alignmentGroupOpts = alignmentGroups[trace.alignmentgroup] || {};
        var nOffsetGroups = Object.keys(alignmentGroupOpts.offsetGroups || {}).length;

        var barWidthPlusGap;
        if(nOffsetGroups) {
            barWidthPlusGap = barGroupWidth / nOffsetGroups;
        } else {
            barWidthPlusGap = overlap ? barGroupWidth / nTraces : barGroupWidth;
        }

        var barWidth = barWidthPlusGap * (1 - (opts.groupgap || 0));

        var offsetFromCenter;
        if(nOffsetGroups) {
            offsetFromCenter = ((2 * trace._offsetIndex + 1 - nOffsetGroups) * barWidthPlusGap - barWidth) / 2;
        } else {
            offsetFromCenter = overlap ?
                ((2 * i + 1 - nTraces) * barWidthPlusGap - barWidth) / 2 :
                -barWidth / 2;
        }

        var t = calcTrace[0].t;
        t.barwidth = barWidth;
        t.poffset = offsetFromCenter;
        t.bargroupwidth = barGroupWidth;
        t.bardelta = minDiff;
    }

    // stack bars that only differ by rounding
    sieve.binWidth = calcTraces[0][0].t.barwidth / 100;

    // if defined, apply trace width
    applyAttributes(sieve);

    // store the bar center in each calcdata item
    setBarCenterAndWidth(pa, sieve);

    // update position axes
    updatePositionAxis(pa, sieve, overlap);
}

function applyAttributes(sieve) {
    var calcTraces = sieve.traces;
    var i, j;

    for(i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];
        var calcTrace0 = calcTrace[0];
        var fullTrace = calcTrace0.trace;
        var t = calcTrace0.t;
        var offset = fullTrace._offset || fullTrace.offset;
        var initialPoffset = t.poffset;
        var newPoffset;

        if(isArrayOrTypedArray(offset)) {
            // if offset is an array, then clone it into t.poffset.
            newPoffset = Array.prototype.slice.call(offset, 0, calcTrace.length);

            // guard against non-numeric items
            for(j = 0; j < newPoffset.length; j++) {
                if(!isNumeric(newPoffset[j])) {
                    newPoffset[j] = initialPoffset;
                }
            }

            // if the length of the array is too short,
            // then extend it with the initial value of t.poffset
            for(j = newPoffset.length; j < calcTrace.length; j++) {
                newPoffset.push(initialPoffset);
            }

            t.poffset = newPoffset;
        } else if(offset !== undefined) {
            t.poffset = offset;
        }

        var width = fullTrace._width || fullTrace.width;
        var initialBarwidth = t.barwidth;

        if(isArrayOrTypedArray(width)) {
            // if width is an array, then clone it into t.barwidth.
            var newBarwidth = Array.prototype.slice.call(width, 0, calcTrace.length);

            // guard against non-numeric items
            for(j = 0; j < newBarwidth.length; j++) {
                if(!isNumeric(newBarwidth[j])) newBarwidth[j] = initialBarwidth;
            }

            // if the length of the array is too short,
            // then extend it with the initial value of t.barwidth
            for(j = newBarwidth.length; j < calcTrace.length; j++) {
                newBarwidth.push(initialBarwidth);
            }

            t.barwidth = newBarwidth;

            // if user didn't set offset,
            // then correct t.poffset to ensure bars remain centered
            if(offset === undefined) {
                newPoffset = [];
                for(j = 0; j < calcTrace.length; j++) {
                    newPoffset.push(
                        initialPoffset + (initialBarwidth - newBarwidth[j]) / 2
                    );
                }
                t.poffset = newPoffset;
            }
        } else if(width !== undefined) {
            t.barwidth = width;

            // if user didn't set offset,
            // then correct t.poffset to ensure bars remain centered
            if(offset === undefined) {
                t.poffset = initialPoffset + (initialBarwidth - width) / 2;
            }
        }
    }
}

function setBarCenterAndWidth(pa, sieve) {
    var calcTraces = sieve.traces;
    var pLetter = getAxisLetter(pa);

    for(var i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];
        var t = calcTrace[0].t;
        var poffset = t.poffset;
        var poffsetIsArray = Array.isArray(poffset);
        var barwidth = t.barwidth;
        var barwidthIsArray = Array.isArray(barwidth);

        for(var j = 0; j < calcTrace.length; j++) {
            var calcBar = calcTrace[j];

            // store the actual bar width and position, for use by hover
            var width = calcBar.w = barwidthIsArray ? barwidth[j] : barwidth;
            calcBar[pLetter] = calcBar.p + (poffsetIsArray ? poffset[j] : poffset) + width / 2;
        }
    }
}

function updatePositionAxis(pa, sieve, allowMinDtick) {
    var calcTraces = sieve.traces;
    var minDiff = sieve.minDiff;
    var vpad = minDiff / 2;

    Axes.minDtick(pa, sieve.minDiff, sieve.distinctPositions[0], allowMinDtick);

    for(var i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];
        var calcTrace0 = calcTrace[0];
        var fullTrace = calcTrace0.trace;
        var pts = [];
        var bar, l, r, j;

        for(j = 0; j < calcTrace.length; j++) {
            bar = calcTrace[j];
            l = bar.p - vpad;
            r = bar.p + vpad;
            pts.push(l, r);
        }

        if(fullTrace.width || fullTrace.offset) {
            var t = calcTrace0.t;
            var poffset = t.poffset;
            var barwidth = t.barwidth;
            var poffsetIsArray = Array.isArray(poffset);
            var barwidthIsArray = Array.isArray(barwidth);

            for(j = 0; j < calcTrace.length; j++) {
                bar = calcTrace[j];
                var calcBarOffset = poffsetIsArray ? poffset[j] : poffset;
                var calcBarWidth = barwidthIsArray ? barwidth[j] : barwidth;
                l = bar.p + calcBarOffset;
                r = l + calcBarWidth;
                pts.push(l, r);
            }
        }

        fullTrace._extremes[pa._id] = Axes.findExtremes(pa, pts, {padded: false});
    }
}

// store these bar bases and tops in calcdata
// and make sure the size axis includes zero,
// along with the bases and tops of each bar.
function setBaseAndTop(sa, sieve) {
    var calcTraces = sieve.traces;
    var sLetter = getAxisLetter(sa);

    for(var i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];
        var fullTrace = calcTrace[0].trace;
        var pts = [];
        var tozero = false;

        for(var j = 0; j < calcTrace.length; j++) {
            var bar = calcTrace[j];
            var base = bar.b;
            var top = base + bar.s;

            bar[sLetter] = top;
            pts.push(top);
            if(bar.hasB) pts.push(base);

            if(!bar.hasB || !bar.b) {
                tozero = true;
            }
        }

        fullTrace._extremes[sa._id] = Axes.findExtremes(sa, pts, {
            tozero: tozero,
            padded: true
        });
    }
}

function stackBars(sa, sieve, opts) {
    var sLetter = getAxisLetter(sa);
    var calcTraces = sieve.traces;
    var calcTrace;
    var fullTrace;
    var isFunnel;
    var i, j;
    var bar;

    for(i = 0; i < calcTraces.length; i++) {
        calcTrace = calcTraces[i];
        fullTrace = calcTrace[0].trace;

        if(fullTrace.type === 'funnel') {
            for(j = 0; j < calcTrace.length; j++) {
                bar = calcTrace[j];

                if(bar.s !== BADNUM) {
                    // create base of funnels
                    sieve.put(bar.p, -0.5 * bar.s);
                }
            }
        }
    }

    for(i = 0; i < calcTraces.length; i++) {
        calcTrace = calcTraces[i];
        fullTrace = calcTrace[0].trace;

        isFunnel = (fullTrace.type === 'funnel');

        var pts = [];

        for(j = 0; j < calcTrace.length; j++) {
            bar = calcTrace[j];

            if(bar.s !== BADNUM) {
                // stack current bar and get previous sum
                var value;
                if(isFunnel) {
                    value = bar.s;
                } else {
                    value = bar.s + bar.b;
                }

                var base = sieve.put(bar.p, value);

                var top = base + value;

                // store the bar base and top in each calcdata item
                bar.b = base;
                bar[sLetter] = top;

                if(!opts.norm) {
                    pts.push(top);
                    if(bar.hasB) {
                        pts.push(base);
                    }
                }
            }
        }

        // if barnorm is set, let normalizeBars update the axis range
        if(!opts.norm) {
            fullTrace._extremes[sa._id] = Axes.findExtremes(sa, pts, {
                // N.B. we don't stack base with 'base',
                // so set tozero:true always!
                tozero: true,
                padded: true
            });
        }
    }
}

function sieveBars(sieve) {
    var calcTraces = sieve.traces;

    for(var i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];

        for(var j = 0; j < calcTrace.length; j++) {
            var bar = calcTrace[j];

            if(bar.s !== BADNUM) {
                sieve.put(bar.p, bar.b + bar.s);
            }
        }
    }
}

function unhideBarsWithinTrace(sieve) {
    var calcTraces = sieve.traces;

    for(var i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];
        var fullTrace = calcTrace[0].trace;

        if(fullTrace.base === undefined) {
            var inTraceSieve = new Sieve([calcTrace], {
                sepNegVal: true,
                overlapNoMerge: true
            });

            for(var j = 0; j < calcTrace.length; j++) {
                var bar = calcTrace[j];

                if(bar.p !== BADNUM) {
                    // stack current bar and get previous sum
                    var base = inTraceSieve.put(bar.p, bar.b + bar.s);

                    // if previous sum if non-zero, this means:
                    // multiple bars have same starting point are potentially hidden,
                    // shift them vertically so that all bars are visible by default
                    if(base) bar.b = base;
                }
            }
        }
    }
}

// Note:
//
// normalizeBars requires that either sieveBars or stackBars has been
// previously invoked.
function normalizeBars(sa, sieve, opts) {
    var calcTraces = sieve.traces;
    var sLetter = getAxisLetter(sa);
    var sTop = opts.norm === 'fraction' ? 1 : 100;
    var sTiny = sTop / 1e9; // in case of rounding error in sum
    var sMin = sa.l2c(sa.c2l(0));
    var sMax = opts.mode === 'stack' ? sTop : sMin;

    function needsPadding(v) {
        return (
            isNumeric(sa.c2l(v)) &&
            ((v < sMin - sTiny) || (v > sMax + sTiny) || !isNumeric(sMin))
        );
    }

    for(var i = 0; i < calcTraces.length; i++) {
        var calcTrace = calcTraces[i];
        var fullTrace = calcTrace[0].trace;
        var pts = [];
        var tozero = false;
        var padded = false;

        for(var j = 0; j < calcTrace.length; j++) {
            var bar = calcTrace[j];

            if(bar.s !== BADNUM) {
                var scale = Math.abs(sTop / sieve.get(bar.p, bar.s));
                bar.b *= scale;
                bar.s *= scale;

                var base = bar.b;
                var top = base + bar.s;

                bar[sLetter] = top;
                pts.push(top);
                padded = padded || needsPadding(top);

                if(bar.hasB) {
                    pts.push(base);
                    padded = padded || needsPadding(base);
                }

                if(!bar.hasB || !bar.b) {
                    tozero = true;
                }
            }
        }

        fullTrace._extremes[sa._id] = Axes.findExtremes(sa, pts, {
            tozero: tozero,
            padded: padded
        });
    }
}

// find the full position span of bars at each position
// for use by hover, to ensure labels move in if bars are
// narrower than the space they're in.
// run once per trace group (subplot & direction) and
// the same mapping is attached to all calcdata traces
function collectExtents(calcTraces, pa) {
    var pLetter = getAxisLetter(pa);
    var extents = {};
    var i, j, cd;

    var pMin = Infinity;
    var pMax = -Infinity;

    for(i = 0; i < calcTraces.length; i++) {
        cd = calcTraces[i];
        for(j = 0; j < cd.length; j++) {
            var p = cd[j].p;
            if(isNumeric(p)) {
                pMin = Math.min(pMin, p);
                pMax = Math.max(pMax, p);
            }
        }
    }

    // this is just for positioning of hover labels, and nobody will care if
    // the label is 1px too far out; so round positions to 1/10K in case
    // position values don't exactly match from trace to trace
    var roundFactor = 10000 / (pMax - pMin);
    var round = extents.round = function(p) {
        return String(Math.round(roundFactor * (p - pMin)));
    };

    for(i = 0; i < calcTraces.length; i++) {
        cd = calcTraces[i];
        cd[0].t.extents = extents;

        var poffset = cd[0].t.poffset;
        var poffsetIsArray = Array.isArray(poffset);

        for(j = 0; j < cd.length; j++) {
            var di = cd[j];
            var p0 = di[pLetter] - di.w / 2;

            if(isNumeric(p0)) {
                var p1 = di[pLetter] + di.w / 2;
                var pVal = round(di.p);
                if(extents[pVal]) {
                    extents[pVal] = [Math.min(p0, extents[pVal][0]), Math.max(p1, extents[pVal][1])];
                } else {
                    extents[pVal] = [p0, p1];
                }
            }

            di.p0 = di.p + (poffsetIsArray ? poffset[j] : poffset);
            di.p1 = di.p0 + di.w;
            di.s0 = di.b;
            di.s1 = di.s0 + di.s;
        }
    }
}

function getAxisLetter(ax) {
    return ax._id.charAt(0);
}

module.exports = {
    crossTraceCalc: crossTraceCalc,
    setGroupPositions: setGroupPositions
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/hover.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/hover.js ***!
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




var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var fillText = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").fillText;
var getLineWidth = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/bar/helpers.js").getLineWidth;
var hoverLabelText = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js").hoverLabelText;
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

function hoverPoints(pointData, xval, yval, hovermode) {
    var barPointData = hoverOnBars(pointData, xval, yval, hovermode);

    if(barPointData) {
        var cd = barPointData.cd;
        var trace = cd[0].trace;
        var di = cd[barPointData.index];

        barPointData.color = getTraceColor(trace, di);
        Registry.getComponentMethod('errorbars', 'hoverInfo')(di, trace, barPointData);

        return [barPointData];
    }
}

function hoverOnBars(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var trace = cd[0].trace;
    var t = cd[0].t;
    var isClosest = (hovermode === 'closest');
    var isWaterfall = (trace.type === 'waterfall');
    var maxHoverDistance = pointData.maxHoverDistance;

    var posVal, sizeVal, posLetter, sizeLetter, dx, dy, pRangeCalc;

    function thisBarMinPos(di) { return di[posLetter] - di.w / 2; }
    function thisBarMaxPos(di) { return di[posLetter] + di.w / 2; }

    var minPos = isClosest ?
        thisBarMinPos :
        function(di) {
            /*
             * In compare mode, accept a bar if you're on it *or* its group.
             * Nearly always it's the group that matters, but in case the bar
             * was explicitly set wider than its group we'd better accept the
             * whole bar.
             *
             * use `bardelta` instead of `bargroupwidth` so we accept hover
             * in the gap. That way hover doesn't flash on and off as you
             * mouse over the plot in compare modes.
             * In 'closest' mode though the flashing seems inevitable,
             * without far more complex logic
             */
            return Math.min(thisBarMinPos(di), di.p - t.bardelta / 2);
        };

    var maxPos = isClosest ?
        thisBarMaxPos :
        function(di) {
            return Math.max(thisBarMaxPos(di), di.p + t.bardelta / 2);
        };

    function _positionFn(_minPos, _maxPos) {
        // add a little to the pseudo-distance for wider bars, so that like scatter,
        // if you are over two overlapping bars, the narrower one wins.
        return Fx.inbox(_minPos - posVal, _maxPos - posVal,
            maxHoverDistance + Math.min(1, Math.abs(_maxPos - _minPos) / pRangeCalc) - 1);
    }

    function positionFn(di) {
        return _positionFn(minPos(di), maxPos(di));
    }

    function thisBarPositionFn(di) {
        return _positionFn(thisBarMinPos(di), thisBarMaxPos(di));
    }

    function sizeFn(di) {
        var v = sizeVal;
        var b = di.b;
        var s = di[sizeLetter];

        if(isWaterfall) {
            var rawS = Math.abs(di.rawS) || 0;
            if(v > 0) {
                s += rawS;
            } else if(v < 0) {
                s -= rawS;
            }
        }

        // add a gradient so hovering near the end of a
        // bar makes it a little closer match
        return Fx.inbox(b - v, s - v, maxHoverDistance + (s - v) / (s - b) - 1);
    }

    if(trace.orientation === 'h') {
        posVal = yval;
        sizeVal = xval;
        posLetter = 'y';
        sizeLetter = 'x';
        dx = sizeFn;
        dy = positionFn;
    } else {
        posVal = xval;
        sizeVal = yval;
        posLetter = 'x';
        sizeLetter = 'y';
        dy = sizeFn;
        dx = positionFn;
    }

    var pa = pointData[posLetter + 'a'];
    var sa = pointData[sizeLetter + 'a'];

    pRangeCalc = Math.abs(pa.r2c(pa.range[1]) - pa.r2c(pa.range[0]));

    function dxy(di) { return (dx(di) + dy(di)) / 2; }
    var distfn = Fx.getDistanceFunction(hovermode, dx, dy, dxy);
    Fx.getClosest(cd, distfn, pointData);

    // skip the rest (for this trace) if we didn't find a close point
    if(pointData.index === false) return;

    // skip points inside axis rangebreaks
    if(cd[pointData.index].p === BADNUM) return;

    // if we get here and we're not in 'closest' mode, push min/max pos back
    // onto the group - even though that means occasionally the mouse will be
    // over the hover label.
    if(!isClosest) {
        minPos = function(di) {
            return Math.min(thisBarMinPos(di), di.p - t.bargroupwidth / 2);
        };
        maxPos = function(di) {
            return Math.max(thisBarMaxPos(di), di.p + t.bargroupwidth / 2);
        };
    }

    // the closest data point
    var index = pointData.index;
    var di = cd[index];

    var size = (trace.base) ? di.b + di.s : di.s;
    pointData[sizeLetter + '0'] = pointData[sizeLetter + '1'] = sa.c2p(di[sizeLetter], true);
    pointData[sizeLetter + 'LabelVal'] = size;

    var extent = t.extents[t.extents.round(di.p)];
    pointData[posLetter + '0'] = pa.c2p(isClosest ? minPos(di) : extent[0], true);
    pointData[posLetter + '1'] = pa.c2p(isClosest ? maxPos(di) : extent[1], true);
    pointData[posLetter + 'LabelVal'] = di.p;

    pointData.labelLabel = hoverLabelText(pa, pointData[posLetter + 'LabelVal']);
    pointData.valueLabel = hoverLabelText(sa, pointData[sizeLetter + 'LabelVal']);

    // spikelines always want "closest" distance regardless of hovermode
    pointData.spikeDistance = (sizeFn(di) + thisBarPositionFn(di)) / 2 - maxHoverDistance;
    // they also want to point to the data value, regardless of where the label goes
    // in case of bars shifted within groups
    pointData[posLetter + 'Spike'] = pa.c2p(di.p, true);

    fillText(di, trace, pointData);
    pointData.hovertemplate = trace.hovertemplate;

    return pointData;
}

function getTraceColor(trace, di) {
    var mc = di.mcc || trace.marker.color;
    var mlc = di.mlcc || trace.marker.line.color;
    var mlw = getLineWidth(trace, di);

    if(Color.opacity(mc)) return mc;
    else if(Color.opacity(mlc) && mlw) return mlc;
}

module.exports = {
    hoverPoints: hoverPoints,
    hoverOnBars: hoverOnBars,
    getTraceColor: getTraceColor
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/select.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/select.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function selectPoints(searchInfo, selectionTester) {
    var cd = searchInfo.cd;
    var xa = searchInfo.xaxis;
    var ya = searchInfo.yaxis;
    var trace = cd[0].trace;
    var isFunnel = (trace.type === 'funnel');
    var isHorizontal = (trace.orientation === 'h');
    var selection = [];
    var i;

    if(selectionTester === false) {
        // clear selection
        for(i = 0; i < cd.length; i++) {
            cd[i].selected = 0;
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            var di = cd[i];
            var ct = 'ct' in di ? di.ct : getCentroid(di, xa, ya, isHorizontal, isFunnel);

            if(selectionTester.contains(ct, false, i, searchInfo)) {
                selection.push({
                    pointNumber: i,
                    x: xa.c2d(di.x),
                    y: ya.c2d(di.y)
                });
                di.selected = 1;
            } else {
                di.selected = 0;
            }
        }
    }

    return selection;
};

function getCentroid(d, xa, ya, isHorizontal, isFunnel) {
    var x0 = xa.c2p(isHorizontal ? d.s0 : d.p0, true);
    var x1 = xa.c2p(isHorizontal ? d.s1 : d.p1, true);
    var y0 = ya.c2p(isHorizontal ? d.p0 : d.s0, true);
    var y1 = ya.c2p(isHorizontal ? d.p1 : d.s1, true);

    if(isFunnel) {
        return [(x0 + x1) / 2, (y0 + y1) / 2];
    } else {
        if(isHorizontal) {
            return [x1, (y0 + y1) / 2];
        } else {
            return [(x0 + x1) / 2, y1];
        }
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/sieve.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/sieve.js ***!
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



module.exports = Sieve;

var distinctVals = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").distinctVals;
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

/**
 * Helper class to sieve data from traces into bins
 *
 * @class
 *
 * @param {Array} traces
*   Array of calculated traces
 * @param {object} opts
 *  - @param {boolean} [sepNegVal]
 *      If true, then split data at the same position into a bar
 *      for positive values and another for negative values
 *  - @param {boolean} [overlapNoMerge]
 *     If true, then don't merge overlapping bars into a single bar
 */
function Sieve(traces, opts) {
    this.traces = traces;
    this.sepNegVal = opts.sepNegVal;
    this.overlapNoMerge = opts.overlapNoMerge;

    // for single-bin histograms - see histogram/calc
    var width1 = Infinity;

    var positions = [];
    for(var i = 0; i < traces.length; i++) {
        var trace = traces[i];
        for(var j = 0; j < trace.length; j++) {
            var bar = trace[j];
            if(bar.p !== BADNUM) positions.push(bar.p);
        }
        if(trace[0] && trace[0].width1) {
            width1 = Math.min(trace[0].width1, width1);
        }
    }
    this.positions = positions;

    var dv = distinctVals(positions);
    this.distinctPositions = dv.vals;
    if(dv.vals.length === 1 && width1 !== Infinity) this.minDiff = width1;
    else this.minDiff = Math.min(dv.minDiff, width1);

    this.binWidth = this.minDiff;

    this.bins = {};
}

/**
 * Sieve datum
 *
 * @method
 * @param {number} position
 * @param {number} value
 * @returns {number} Previous bin value
 */
Sieve.prototype.put = function put(position, value) {
    var label = this.getLabel(position, value);
    var oldValue = this.bins[label] || 0;

    this.bins[label] = oldValue + value;

    return oldValue;
};

/**
 * Get current bin value for a given datum
 *
 * @method
 * @param {number} position  Position of datum
 * @param {number} [value]   Value of datum
 *                           (required if this.sepNegVal is true)
 * @returns {number} Current bin value
 */
Sieve.prototype.get = function get(position, value) {
    var label = this.getLabel(position, value);
    return this.bins[label] || 0;
};

/**
 * Get bin label for a given datum
 *
 * @method
 * @param {number} position  Position of datum
 * @param {number} [value]   Value of datum
 *                           (required if this.sepNegVal is true)
 * @returns {string} Bin label
 * (prefixed with a 'v' if value is negative and this.sepNegVal is
 * true; otherwise prefixed with '^')
 */
Sieve.prototype.getLabel = function getLabel(position, value) {
    var prefix = (value < 0 && this.sepNegVal) ? 'v' : '^';
    var label = (this.overlapNoMerge) ?
        position :
        Math.round(position / this.binWidth);
    return prefix + label;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9jcm9zc190cmFjZV9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9zaWV2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw4REFBZ0I7QUFDeEMsMEJBQTBCLHFHQUF3QztBQUNsRSxhQUFhLGtIQUEyQzs7QUFFeEQsZUFBZSxtQkFBTyxDQUFDLGdFQUFnQjtBQUN2QyxXQUFXLG1CQUFPLENBQUMsd0ZBQTRCO0FBQy9DLG1CQUFtQixrSUFBc0Q7QUFDekUsWUFBWSxtQkFBTyxDQUFDLG9FQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHVCQUF1QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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QUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0OTYzYjQ0ZTk3MGIyYThkNmYxZDEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG52YXIgZ2V0QXhpc0dyb3VwID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4aXNfaWRzJykuZ2V0QXhpc0dyb3VwO1xudmFyIFNpZXZlID0gcmVxdWlyZSgnLi9zaWV2ZS5qcycpO1xuXG4vKlxuICogQmFyIGNoYXJ0IHN0YWNraW5nL2dyb3VwaW5nIHBvc2l0aW9uaW5nIGFuZCBhdXRvc2NhbGluZyBjYWxjdWxhdGlvbnNcbiAqIGZvciBlYWNoIGRpcmVjdGlvbiBzZXBhcmF0ZWx5IGNhbGN1bGF0ZSB0aGUgcmFuZ2VzIGFuZCBwb3NpdGlvbnNcbiAqIG5vdGUgdGhhdCB0aGlzIGhhbmRsZXMgaGlzdG9ncmFtcyB0b29cbiAqIG5vdyBkb2luZyB0aGlzIG9uZSBzdWJwbG90IGF0IGEgdGltZVxuICovXG5cbmZ1bmN0aW9uIGNyb3NzVHJhY2VDYWxjKGdkLCBwbG90aW5mbykge1xuICAgIHZhciB4YSA9IHBsb3RpbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHBsb3RpbmZvLnlheGlzO1xuXG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgZnVsbFRyYWNlcyA9IGdkLl9mdWxsRGF0YTtcbiAgICB2YXIgY2FsY1RyYWNlcyA9IGdkLmNhbGNkYXRhO1xuICAgIHZhciBjYWxjVHJhY2VzSG9yeiA9IFtdO1xuICAgIHZhciBjYWxjVHJhY2VzVmVydCA9IFtdO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZ1bGxUcmFjZSA9IGZ1bGxUcmFjZXNbaV07XG4gICAgICAgIGlmKFxuICAgICAgICAgICAgZnVsbFRyYWNlLnZpc2libGUgPT09IHRydWUgJiZcbiAgICAgICAgICAgIFJlZ2lzdHJ5LnRyYWNlSXMoZnVsbFRyYWNlLCAnYmFyJykgJiZcbiAgICAgICAgICAgIGZ1bGxUcmFjZS54YXhpcyA9PT0geGEuX2lkICYmXG4gICAgICAgICAgICBmdWxsVHJhY2UueWF4aXMgPT09IHlhLl9pZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmKGZ1bGxUcmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICAgICAgICAgICAgY2FsY1RyYWNlc0hvcnoucHVzaChjYWxjVHJhY2VzW2ldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsY1RyYWNlc1ZlcnQucHVzaChjYWxjVHJhY2VzW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZnVsbFRyYWNlLl9jb21wdXRlUGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2QgPSBnZC5jYWxjZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgY2QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIGNkW2pdLnBoMCA9PT0gJ2Z1bmN0aW9uJykgY2Rbal0ucGgwID0gY2Rbal0ucGgwKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBjZFtqXS5waDEgPT09ICdmdW5jdGlvbicpIGNkW2pdLnBoMSA9IGNkW2pdLnBoMSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBvcHRzID0ge1xuICAgICAgICBtb2RlOiBmdWxsTGF5b3V0LmJhcm1vZGUsXG4gICAgICAgIG5vcm06IGZ1bGxMYXlvdXQuYmFybm9ybSxcbiAgICAgICAgZ2FwOiBmdWxsTGF5b3V0LmJhcmdhcCxcbiAgICAgICAgZ3JvdXBnYXA6IGZ1bGxMYXlvdXQuYmFyZ3JvdXBnYXBcbiAgICB9O1xuXG4gICAgc2V0R3JvdXBQb3NpdGlvbnMoZ2QsIHhhLCB5YSwgY2FsY1RyYWNlc1ZlcnQsIG9wdHMpO1xuICAgIHNldEdyb3VwUG9zaXRpb25zKGdkLCB5YSwgeGEsIGNhbGNUcmFjZXNIb3J6LCBvcHRzKTtcbn1cblxuZnVuY3Rpb24gc2V0R3JvdXBQb3NpdGlvbnMoZ2QsIHBhLCBzYSwgY2FsY1RyYWNlcywgb3B0cykge1xuICAgIGlmKCFjYWxjVHJhY2VzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgdmFyIGV4Y2x1ZGVkO1xuICAgIHZhciBpbmNsdWRlZDtcbiAgICB2YXIgaSwgY2FsY1RyYWNlLCBmdWxsVHJhY2U7XG5cbiAgICBpbml0QmFzZShzYSwgY2FsY1RyYWNlcyk7XG5cbiAgICBzd2l0Y2gob3B0cy5tb2RlKSB7XG4gICAgICAgIGNhc2UgJ292ZXJsYXknOlxuICAgICAgICAgICAgc2V0R3JvdXBQb3NpdGlvbnNJbk92ZXJsYXlNb2RlKHBhLCBzYSwgY2FsY1RyYWNlcywgb3B0cyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAvLyBleGNsdWRlIGZyb20gdGhlIGdyb3VwIHRob3NlIHRyYWNlcyBmb3Igd2hpY2ggdGhlIHVzZXIgc2V0IGFuIG9mZnNldFxuICAgICAgICAgICAgZXhjbHVkZWQgPSBbXTtcbiAgICAgICAgICAgIGluY2x1ZGVkID0gW107XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBjYWxjVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2FsY1RyYWNlID0gY2FsY1RyYWNlc1tpXTtcbiAgICAgICAgICAgICAgICBmdWxsVHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG5cbiAgICAgICAgICAgICAgICBpZihmdWxsVHJhY2Uub2Zmc2V0ID09PSB1bmRlZmluZWQpIGluY2x1ZGVkLnB1c2goY2FsY1RyYWNlKTtcbiAgICAgICAgICAgICAgICBlbHNlIGV4Y2x1ZGVkLnB1c2goY2FsY1RyYWNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaW5jbHVkZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2V0R3JvdXBQb3NpdGlvbnNJbkdyb3VwTW9kZShnZCwgcGEsIHNhLCBpbmNsdWRlZCwgb3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihleGNsdWRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZXRHcm91cFBvc2l0aW9uc0luT3ZlcmxheU1vZGUocGEsIHNhLCBleGNsdWRlZCwgb3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdzdGFjayc6XG4gICAgICAgIGNhc2UgJ3JlbGF0aXZlJzpcbiAgICAgICAgICAgIC8vIGV4Y2x1ZGUgZnJvbSB0aGUgc3RhY2sgdGhvc2UgdHJhY2VzIGZvciB3aGljaCB0aGUgdXNlciBzZXQgYSBiYXNlXG4gICAgICAgICAgICBleGNsdWRlZCA9IFtdO1xuICAgICAgICAgICAgaW5jbHVkZWQgPSBbXTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGNhbGNUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjYWxjVHJhY2UgPSBjYWxjVHJhY2VzW2ldO1xuICAgICAgICAgICAgICAgIGZ1bGxUcmFjZSA9IGNhbGNUcmFjZVswXS50cmFjZTtcblxuICAgICAgICAgICAgICAgIGlmKGZ1bGxUcmFjZS5iYXNlID09PSB1bmRlZmluZWQpIGluY2x1ZGVkLnB1c2goY2FsY1RyYWNlKTtcbiAgICAgICAgICAgICAgICBlbHNlIGV4Y2x1ZGVkLnB1c2goY2FsY1RyYWNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaW5jbHVkZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2V0R3JvdXBQb3NpdGlvbnNJblN0YWNrT3JSZWxhdGl2ZU1vZGUoZ2QsIHBhLCBzYSwgaW5jbHVkZWQsIG9wdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZXhjbHVkZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2V0R3JvdXBQb3NpdGlvbnNJbk92ZXJsYXlNb2RlKHBhLCBzYSwgZXhjbHVkZWQsIG9wdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29sbGVjdEV4dGVudHMoY2FsY1RyYWNlcywgcGEpO1xufVxuXG5mdW5jdGlvbiBpbml0QmFzZShzYSwgY2FsY1RyYWNlcykge1xuICAgIHZhciBpLCBqO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgY2FsY1RyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2QgPSBjYWxjVHJhY2VzW2ldO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICAgICAgdmFyIGJhc2UgPSAodHJhY2UudHlwZSA9PT0gJ2Z1bm5lbCcpID8gdHJhY2UuX2Jhc2UgOiB0cmFjZS5iYXNlO1xuICAgICAgICB2YXIgYjtcblxuICAgICAgICAvLyBub3Qgc3VyZSBpZiBpdCByZWFsbHkgbWFrZXMgc2Vuc2UgdG8gaGF2ZSBkYXRlcyBmb3IgYmFyIHNpemUgZGF0YS4uLlxuICAgICAgICAvLyBpZGVhbGx5IGlmIHdlIHdhbnQgdG8gbWFrZSBnYW50dCBjaGFydHMgb3Igc29tZXRoaW5nIHdlJ2QgdHJlYXRcbiAgICAgICAgLy8gdGhlIGFjdHVhbCBzaXplICh0cmFjZS54IG9yIHkpIGFzIHRpbWUgZGVsdGEgYnV0IGJhc2UgYXMgYWJzb2x1dGVcbiAgICAgICAgLy8gdGltZS4gQnV0IGluY2x1ZGVkIGhlcmUgZm9yIGNvbXBsZXRlbmVzcy5cbiAgICAgICAgdmFyIHNjYWxlbmRhciA9IHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcgPyB0cmFjZS54Y2FsZW5kYXIgOiB0cmFjZS55Y2FsZW5kYXI7XG5cbiAgICAgICAgLy8gJ2Jhc2UnIG9uIGNhdGVnb3JpY2FsIGF4ZXMgbWFrZXMgbm8gc2Vuc2VcbiAgICAgICAgdmFyIGQyYyA9IHNhLnR5cGUgPT09ICdjYXRlZ29yeScgfHwgc2EudHlwZSA9PT0gJ211bHRpY2F0ZWdvcnknID9cbiAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gbnVsbDsgfSA6XG4gICAgICAgICAgICBzYS5kMmM7XG5cbiAgICAgICAgaWYoaXNBcnJheU9yVHlwZWRBcnJheShiYXNlKSkge1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgTWF0aC5taW4oYmFzZS5sZW5ndGgsIGNkLmxlbmd0aCk7IGorKykge1xuICAgICAgICAgICAgICAgIGIgPSBkMmMoYmFzZVtqXSwgMCwgc2NhbGVuZGFyKTtcbiAgICAgICAgICAgICAgICBpZihpc051bWVyaWMoYikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Rbal0uYiA9ICtiO1xuICAgICAgICAgICAgICAgICAgICBjZFtqXS5oYXNCID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgY2Rbal0uYiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IoOyBqIDwgY2QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjZFtqXS5iID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGIgPSBkMmMoYmFzZSwgMCwgc2NhbGVuZGFyKTtcbiAgICAgICAgICAgIHZhciBoYXNCYXNlID0gaXNOdW1lcmljKGIpO1xuICAgICAgICAgICAgYiA9IGhhc0Jhc2UgPyBiIDogMDtcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IGNkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY2Rbal0uYiA9IGI7XG4gICAgICAgICAgICAgICAgaWYoaGFzQmFzZSkgY2Rbal0uaGFzQiA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEdyb3VwUG9zaXRpb25zSW5PdmVybGF5TW9kZShwYSwgc2EsIGNhbGNUcmFjZXMsIG9wdHMpIHtcbiAgICAvLyB1cGRhdGUgcG9zaXRpb24gYXhpcyBhbmQgc2V0IGJhciBvZmZzZXRzIGFuZCB3aWR0aHNcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2FsY1RyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2FsY1RyYWNlID0gY2FsY1RyYWNlc1tpXTtcblxuICAgICAgICB2YXIgc2lldmUgPSBuZXcgU2lldmUoW2NhbGNUcmFjZV0sIHtcbiAgICAgICAgICAgIHNlcE5lZ1ZhbDogZmFsc2UsXG4gICAgICAgICAgICBvdmVybGFwTm9NZXJnZTogIW9wdHMubm9ybVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzZXQgYmFyIG9mZnNldHMgYW5kIHdpZHRocywgYW5kIHVwZGF0ZSBwb3NpdGlvbiBheGlzXG4gICAgICAgIHNldE9mZnNldEFuZFdpZHRoKHBhLCBzaWV2ZSwgb3B0cyk7XG5cbiAgICAgICAgLy8gc2V0IGJhciBiYXNlcyBhbmQgc2l6ZXMsIGFuZCB1cGRhdGUgc2l6ZSBheGlzXG4gICAgICAgIC8vXG4gICAgICAgIC8vIChub3RlIHRoYXQgYHNldEdyb3VwUG9zaXRpb25zSW5PdmVybGF5TW9kZWAgaGFuZGxlcyB0aGUgY2FzZSBiYXJub3JtXG4gICAgICAgIC8vIGlzIGRlZmluZWQsIGJlY2F1c2UgdGhpcyBmdW5jdGlvbiBpcyBhbHNvIGludm9rZWQgZm9yIHRyYWNlcyB0aGF0XG4gICAgICAgIC8vIGNhbid0IGJlIGdyb3VwZWQgb3Igc3RhY2tlZClcbiAgICAgICAgaWYob3B0cy5ub3JtKSB7XG4gICAgICAgICAgICBzaWV2ZUJhcnMoc2lldmUpO1xuICAgICAgICAgICAgbm9ybWFsaXplQmFycyhzYSwgc2lldmUsIG9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0QmFzZUFuZFRvcChzYSwgc2lldmUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRHcm91cFBvc2l0aW9uc0luR3JvdXBNb2RlKGdkLCBwYSwgc2EsIGNhbGNUcmFjZXMsIG9wdHMpIHtcbiAgICB2YXIgc2lldmUgPSBuZXcgU2lldmUoY2FsY1RyYWNlcywge1xuICAgICAgICBzZXBOZWdWYWw6IGZhbHNlLFxuICAgICAgICBvdmVybGFwTm9NZXJnZTogIW9wdHMubm9ybVxuICAgIH0pO1xuXG4gICAgLy8gc2V0IGJhciBvZmZzZXRzIGFuZCB3aWR0aHMsIGFuZCB1cGRhdGUgcG9zaXRpb24gYXhpc1xuICAgIHNldE9mZnNldEFuZFdpZHRoSW5Hcm91cE1vZGUoZ2QsIHBhLCBzaWV2ZSwgb3B0cyk7XG5cbiAgICAvLyByZWxhdGl2ZS1zdGFjayBiYXJzIHdpdGhpbiB0aGUgc2FtZSB0cmFjZSB0aGF0IHdvdWxkIG90aGVyd2lzZVxuICAgIC8vIGJlIGhpZGRlblxuICAgIHVuaGlkZUJhcnNXaXRoaW5UcmFjZShzaWV2ZSk7XG5cbiAgICAvLyBzZXQgYmFyIGJhc2VzIGFuZCBzaXplcywgYW5kIHVwZGF0ZSBzaXplIGF4aXNcbiAgICBpZihvcHRzLm5vcm0pIHtcbiAgICAgICAgc2lldmVCYXJzKHNpZXZlKTtcbiAgICAgICAgbm9ybWFsaXplQmFycyhzYSwgc2lldmUsIG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEJhc2VBbmRUb3Aoc2EsIHNpZXZlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEdyb3VwUG9zaXRpb25zSW5TdGFja09yUmVsYXRpdmVNb2RlKGdkLCBwYSwgc2EsIGNhbGNUcmFjZXMsIG9wdHMpIHtcbiAgICB2YXIgc2lldmUgPSBuZXcgU2lldmUoY2FsY1RyYWNlcywge1xuICAgICAgICBzZXBOZWdWYWw6IG9wdHMubW9kZSA9PT0gJ3JlbGF0aXZlJyxcbiAgICAgICAgb3ZlcmxhcE5vTWVyZ2U6ICEob3B0cy5ub3JtIHx8IG9wdHMubW9kZSA9PT0gJ3N0YWNrJyB8fCBvcHRzLm1vZGUgPT09ICdyZWxhdGl2ZScpXG4gICAgfSk7XG5cbiAgICAvLyBzZXQgYmFyIG9mZnNldHMgYW5kIHdpZHRocywgYW5kIHVwZGF0ZSBwb3NpdGlvbiBheGlzXG4gICAgc2V0T2Zmc2V0QW5kV2lkdGgocGEsIHNpZXZlLCBvcHRzKTtcblxuICAgIC8vIHNldCBiYXIgYmFzZXMgYW5kIHNpemVzLCBhbmQgdXBkYXRlIHNpemUgYXhpc1xuICAgIHN0YWNrQmFycyhzYSwgc2lldmUsIG9wdHMpO1xuXG4gICAgLy8gZmxhZyB0aGUgb3V0bW9zdCBiYXIgKGZvciB0ZXh0IGRpc3BsYXkgcHVycG9zZXMpXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhbGNUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNhbGNUcmFjZSA9IGNhbGNUcmFjZXNbaV07XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGNhbGNUcmFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGJhciA9IGNhbGNUcmFjZVtqXTtcblxuICAgICAgICAgICAgaWYoYmFyLnMgIT09IEJBRE5VTSkge1xuICAgICAgICAgICAgICAgIHZhciBpc091dG1vc3RCYXIgPSAoKGJhci5iICsgYmFyLnMpID09PSBzaWV2ZS5nZXQoYmFyLnAsIGJhci5zKSk7XG4gICAgICAgICAgICAgICAgaWYoaXNPdXRtb3N0QmFyKSBiYXIuX291dG1vc3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTm90ZSB0aGF0IG1hcmtpbmcgdGhlIG91dG1vc3QgYmFycyBoYXMgdG8gYmUgZG9uZVxuICAgIC8vIGJlZm9yZSBgbm9ybWFsaXplQmFyc2AgY2hhbmdlcyBgYmFyLmJgIGFuZCBgYmFyLnNgLlxuICAgIGlmKG9wdHMubm9ybSkgbm9ybWFsaXplQmFycyhzYSwgc2lldmUsIG9wdHMpO1xufVxuXG5mdW5jdGlvbiBzZXRPZmZzZXRBbmRXaWR0aChwYSwgc2lldmUsIG9wdHMpIHtcbiAgICB2YXIgbWluRGlmZiA9IHNpZXZlLm1pbkRpZmY7XG4gICAgdmFyIGNhbGNUcmFjZXMgPSBzaWV2ZS50cmFjZXM7XG5cbiAgICAvLyBzZXQgYmFyIG9mZnNldHMgYW5kIHdpZHRoc1xuICAgIHZhciBiYXJHcm91cFdpZHRoID0gbWluRGlmZiAqICgxIC0gb3B0cy5nYXApO1xuICAgIHZhciBiYXJXaWR0aFBsdXNHYXAgPSBiYXJHcm91cFdpZHRoO1xuICAgIHZhciBiYXJXaWR0aCA9IGJhcldpZHRoUGx1c0dhcCAqICgxIC0gKG9wdHMuZ3JvdXBnYXAgfHwgMCkpO1xuXG4gICAgLy8gY29tcHV0ZXIgYmFyIGdyb3VwIGNlbnRlciBhbmQgYmFyIG9mZnNldFxuICAgIHZhciBvZmZzZXRGcm9tQ2VudGVyID0gLWJhcldpZHRoIC8gMjtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYWxjVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjYWxjVHJhY2UgPSBjYWxjVHJhY2VzW2ldO1xuICAgICAgICB2YXIgdCA9IGNhbGNUcmFjZVswXS50O1xuXG4gICAgICAgIC8vIHN0b3JlIGJhciB3aWR0aCBhbmQgb2Zmc2V0IGZvciB0aGlzIHRyYWNlXG4gICAgICAgIHQuYmFyd2lkdGggPSBiYXJXaWR0aDtcbiAgICAgICAgdC5wb2Zmc2V0ID0gb2Zmc2V0RnJvbUNlbnRlcjtcbiAgICAgICAgdC5iYXJncm91cHdpZHRoID0gYmFyR3JvdXBXaWR0aDtcbiAgICAgICAgdC5iYXJkZWx0YSA9IG1pbkRpZmY7XG4gICAgfVxuXG4gICAgLy8gc3RhY2sgYmFycyB0aGF0IG9ubHkgZGlmZmVyIGJ5IHJvdW5kaW5nXG4gICAgc2lldmUuYmluV2lkdGggPSBjYWxjVHJhY2VzWzBdWzBdLnQuYmFyd2lkdGggLyAxMDA7XG5cbiAgICAvLyBpZiBkZWZpbmVkLCBhcHBseSB0cmFjZSBvZmZzZXQgYW5kIHdpZHRoXG4gICAgYXBwbHlBdHRyaWJ1dGVzKHNpZXZlKTtcblxuICAgIC8vIHN0b3JlIHRoZSBiYXIgY2VudGVyIGluIGVhY2ggY2FsY2RhdGEgaXRlbVxuICAgIHNldEJhckNlbnRlckFuZFdpZHRoKHBhLCBzaWV2ZSk7XG5cbiAgICAvLyB1cGRhdGUgcG9zaXRpb24gYXhlc1xuICAgIHVwZGF0ZVBvc2l0aW9uQXhpcyhwYSwgc2lldmUpO1xufVxuXG5mdW5jdGlvbiBzZXRPZmZzZXRBbmRXaWR0aEluR3JvdXBNb2RlKGdkLCBwYSwgc2lldmUsIG9wdHMpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBwb3NpdGlvbnMgPSBzaWV2ZS5wb3NpdGlvbnM7XG4gICAgdmFyIGRpc3RpbmN0UG9zaXRpb25zID0gc2lldmUuZGlzdGluY3RQb3NpdGlvbnM7XG4gICAgdmFyIG1pbkRpZmYgPSBzaWV2ZS5taW5EaWZmO1xuICAgIHZhciBjYWxjVHJhY2VzID0gc2lldmUudHJhY2VzO1xuICAgIHZhciBuVHJhY2VzID0gY2FsY1RyYWNlcy5sZW5ndGg7XG5cbiAgICAvLyBpZiB0aGVyZSBhcmVuJ3QgYW55IG92ZXJsYXBwaW5nIHBvc2l0aW9ucyxcbiAgICAvLyBsZXQgdGhlbSBoYXZlIGZ1bGwgd2lkdGggZXZlbiBpZiBtb2RlIGlzIGdyb3VwXG4gICAgdmFyIG92ZXJsYXAgPSAocG9zaXRpb25zLmxlbmd0aCAhPT0gZGlzdGluY3RQb3NpdGlvbnMubGVuZ3RoKTtcbiAgICB2YXIgYmFyR3JvdXBXaWR0aCA9IG1pbkRpZmYgKiAoMSAtIG9wdHMuZ2FwKTtcblxuICAgIHZhciBncm91cElkID0gZ2V0QXhpc0dyb3VwKGZ1bGxMYXlvdXQsIHBhLl9pZCkgKyBjYWxjVHJhY2VzWzBdWzBdLnRyYWNlLm9yaWVudGF0aW9uO1xuICAgIHZhciBhbGlnbm1lbnRHcm91cHMgPSBmdWxsTGF5b3V0Ll9hbGlnbm1lbnRPcHRzW2dyb3VwSWRdIHx8IHt9O1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG5UcmFjZXM7IGkrKykge1xuICAgICAgICB2YXIgY2FsY1RyYWNlID0gY2FsY1RyYWNlc1tpXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2FsY1RyYWNlWzBdLnRyYWNlO1xuXG4gICAgICAgIHZhciBhbGlnbm1lbnRHcm91cE9wdHMgPSBhbGlnbm1lbnRHcm91cHNbdHJhY2UuYWxpZ25tZW50Z3JvdXBdIHx8IHt9O1xuICAgICAgICB2YXIgbk9mZnNldEdyb3VwcyA9IE9iamVjdC5rZXlzKGFsaWdubWVudEdyb3VwT3B0cy5vZmZzZXRHcm91cHMgfHwge30pLmxlbmd0aDtcblxuICAgICAgICB2YXIgYmFyV2lkdGhQbHVzR2FwO1xuICAgICAgICBpZihuT2Zmc2V0R3JvdXBzKSB7XG4gICAgICAgICAgICBiYXJXaWR0aFBsdXNHYXAgPSBiYXJHcm91cFdpZHRoIC8gbk9mZnNldEdyb3VwcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJhcldpZHRoUGx1c0dhcCA9IG92ZXJsYXAgPyBiYXJHcm91cFdpZHRoIC8gblRyYWNlcyA6IGJhckdyb3VwV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmFyV2lkdGggPSBiYXJXaWR0aFBsdXNHYXAgKiAoMSAtIChvcHRzLmdyb3VwZ2FwIHx8IDApKTtcblxuICAgICAgICB2YXIgb2Zmc2V0RnJvbUNlbnRlcjtcbiAgICAgICAgaWYobk9mZnNldEdyb3Vwcykge1xuICAgICAgICAgICAgb2Zmc2V0RnJvbUNlbnRlciA9ICgoMiAqIHRyYWNlLl9vZmZzZXRJbmRleCArIDEgLSBuT2Zmc2V0R3JvdXBzKSAqIGJhcldpZHRoUGx1c0dhcCAtIGJhcldpZHRoKSAvIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvZmZzZXRGcm9tQ2VudGVyID0gb3ZlcmxhcCA/XG4gICAgICAgICAgICAgICAgKCgyICogaSArIDEgLSBuVHJhY2VzKSAqIGJhcldpZHRoUGx1c0dhcCAtIGJhcldpZHRoKSAvIDIgOlxuICAgICAgICAgICAgICAgIC1iYXJXaWR0aCAvIDI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdCA9IGNhbGNUcmFjZVswXS50O1xuICAgICAgICB0LmJhcndpZHRoID0gYmFyV2lkdGg7XG4gICAgICAgIHQucG9mZnNldCA9IG9mZnNldEZyb21DZW50ZXI7XG4gICAgICAgIHQuYmFyZ3JvdXB3aWR0aCA9IGJhckdyb3VwV2lkdGg7XG4gICAgICAgIHQuYmFyZGVsdGEgPSBtaW5EaWZmO1xuICAgIH1cblxuICAgIC8vIHN0YWNrIGJhcnMgdGhhdCBvbmx5IGRpZmZlciBieSByb3VuZGluZ1xuICAgIHNpZXZlLmJpbldpZHRoID0gY2FsY1RyYWNlc1swXVswXS50LmJhcndpZHRoIC8gMTAwO1xuXG4gICAgLy8gaWYgZGVmaW5lZCwgYXBwbHkgdHJhY2Ugd2lkdGhcbiAgICBhcHBseUF0dHJpYnV0ZXMoc2lldmUpO1xuXG4gICAgLy8gc3RvcmUgdGhlIGJhciBjZW50ZXIgaW4gZWFjaCBjYWxjZGF0YSBpdGVtXG4gICAgc2V0QmFyQ2VudGVyQW5kV2lkdGgocGEsIHNpZXZlKTtcblxuICAgIC8vIHVwZGF0ZSBwb3NpdGlvbiBheGVzXG4gICAgdXBkYXRlUG9zaXRpb25BeGlzKHBhLCBzaWV2ZSwgb3ZlcmxhcCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5QXR0cmlidXRlcyhzaWV2ZSkge1xuICAgIHZhciBjYWxjVHJhY2VzID0gc2lldmUudHJhY2VzO1xuICAgIHZhciBpLCBqO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgY2FsY1RyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2FsY1RyYWNlID0gY2FsY1RyYWNlc1tpXTtcbiAgICAgICAgdmFyIGNhbGNUcmFjZTAgPSBjYWxjVHJhY2VbMF07XG4gICAgICAgIHZhciBmdWxsVHJhY2UgPSBjYWxjVHJhY2UwLnRyYWNlO1xuICAgICAgICB2YXIgdCA9IGNhbGNUcmFjZTAudDtcbiAgICAgICAgdmFyIG9mZnNldCA9IGZ1bGxUcmFjZS5fb2Zmc2V0IHx8IGZ1bGxUcmFjZS5vZmZzZXQ7XG4gICAgICAgIHZhciBpbml0aWFsUG9mZnNldCA9IHQucG9mZnNldDtcbiAgICAgICAgdmFyIG5ld1BvZmZzZXQ7XG5cbiAgICAgICAgaWYoaXNBcnJheU9yVHlwZWRBcnJheShvZmZzZXQpKSB7XG4gICAgICAgICAgICAvLyBpZiBvZmZzZXQgaXMgYW4gYXJyYXksIHRoZW4gY2xvbmUgaXQgaW50byB0LnBvZmZzZXQuXG4gICAgICAgICAgICBuZXdQb2Zmc2V0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2Zmc2V0LCAwLCBjYWxjVHJhY2UubGVuZ3RoKTtcblxuICAgICAgICAgICAgLy8gZ3VhcmQgYWdhaW5zdCBub24tbnVtZXJpYyBpdGVtc1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbmV3UG9mZnNldC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmKCFpc051bWVyaWMobmV3UG9mZnNldFtqXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9mZnNldFtqXSA9IGluaXRpYWxQb2Zmc2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkgaXMgdG9vIHNob3J0LFxuICAgICAgICAgICAgLy8gdGhlbiBleHRlbmQgaXQgd2l0aCB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0LnBvZmZzZXRcbiAgICAgICAgICAgIGZvcihqID0gbmV3UG9mZnNldC5sZW5ndGg7IGogPCBjYWxjVHJhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBuZXdQb2Zmc2V0LnB1c2goaW5pdGlhbFBvZmZzZXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0LnBvZmZzZXQgPSBuZXdQb2Zmc2V0O1xuICAgICAgICB9IGVsc2UgaWYob2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHQucG9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3aWR0aCA9IGZ1bGxUcmFjZS5fd2lkdGggfHwgZnVsbFRyYWNlLndpZHRoO1xuICAgICAgICB2YXIgaW5pdGlhbEJhcndpZHRoID0gdC5iYXJ3aWR0aDtcblxuICAgICAgICBpZihpc0FycmF5T3JUeXBlZEFycmF5KHdpZHRoKSkge1xuICAgICAgICAgICAgLy8gaWYgd2lkdGggaXMgYW4gYXJyYXksIHRoZW4gY2xvbmUgaXQgaW50byB0LmJhcndpZHRoLlxuICAgICAgICAgICAgdmFyIG5ld0JhcndpZHRoID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwod2lkdGgsIDAsIGNhbGNUcmFjZS5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyBndWFyZCBhZ2FpbnN0IG5vbi1udW1lcmljIGl0ZW1zXG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBuZXdCYXJ3aWR0aC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmKCFpc051bWVyaWMobmV3QmFyd2lkdGhbal0pKSBuZXdCYXJ3aWR0aFtqXSA9IGluaXRpYWxCYXJ3aWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkgaXMgdG9vIHNob3J0LFxuICAgICAgICAgICAgLy8gdGhlbiBleHRlbmQgaXQgd2l0aCB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0LmJhcndpZHRoXG4gICAgICAgICAgICBmb3IoaiA9IG5ld0JhcndpZHRoLmxlbmd0aDsgaiA8IGNhbGNUcmFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIG5ld0JhcndpZHRoLnB1c2goaW5pdGlhbEJhcndpZHRoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdC5iYXJ3aWR0aCA9IG5ld0JhcndpZHRoO1xuXG4gICAgICAgICAgICAvLyBpZiB1c2VyIGRpZG4ndCBzZXQgb2Zmc2V0LFxuICAgICAgICAgICAgLy8gdGhlbiBjb3JyZWN0IHQucG9mZnNldCB0byBlbnN1cmUgYmFycyByZW1haW4gY2VudGVyZWRcbiAgICAgICAgICAgIGlmKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbmV3UG9mZnNldCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IGNhbGNUcmFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBuZXdQb2Zmc2V0LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsUG9mZnNldCArIChpbml0aWFsQmFyd2lkdGggLSBuZXdCYXJ3aWR0aFtqXSkgLyAyXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHQucG9mZnNldCA9IG5ld1BvZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZih3aWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0LmJhcndpZHRoID0gd2lkdGg7XG5cbiAgICAgICAgICAgIC8vIGlmIHVzZXIgZGlkbid0IHNldCBvZmZzZXQsXG4gICAgICAgICAgICAvLyB0aGVuIGNvcnJlY3QgdC5wb2Zmc2V0IHRvIGVuc3VyZSBiYXJzIHJlbWFpbiBjZW50ZXJlZFxuICAgICAgICAgICAgaWYob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0LnBvZmZzZXQgPSBpbml0aWFsUG9mZnNldCArIChpbml0aWFsQmFyd2lkdGggLSB3aWR0aCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRCYXJDZW50ZXJBbmRXaWR0aChwYSwgc2lldmUpIHtcbiAgICB2YXIgY2FsY1RyYWNlcyA9IHNpZXZlLnRyYWNlcztcbiAgICB2YXIgcExldHRlciA9IGdldEF4aXNMZXR0ZXIocGEpO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhbGNUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNhbGNUcmFjZSA9IGNhbGNUcmFjZXNbaV07XG4gICAgICAgIHZhciB0ID0gY2FsY1RyYWNlWzBdLnQ7XG4gICAgICAgIHZhciBwb2Zmc2V0ID0gdC5wb2Zmc2V0O1xuICAgICAgICB2YXIgcG9mZnNldElzQXJyYXkgPSBBcnJheS5pc0FycmF5KHBvZmZzZXQpO1xuICAgICAgICB2YXIgYmFyd2lkdGggPSB0LmJhcndpZHRoO1xuICAgICAgICB2YXIgYmFyd2lkdGhJc0FycmF5ID0gQXJyYXkuaXNBcnJheShiYXJ3aWR0aCk7XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGNhbGNUcmFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGNhbGNCYXIgPSBjYWxjVHJhY2Vbal07XG5cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBhY3R1YWwgYmFyIHdpZHRoIGFuZCBwb3NpdGlvbiwgZm9yIHVzZSBieSBob3ZlclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gY2FsY0Jhci53ID0gYmFyd2lkdGhJc0FycmF5ID8gYmFyd2lkdGhbal0gOiBiYXJ3aWR0aDtcbiAgICAgICAgICAgIGNhbGNCYXJbcExldHRlcl0gPSBjYWxjQmFyLnAgKyAocG9mZnNldElzQXJyYXkgPyBwb2Zmc2V0W2pdIDogcG9mZnNldCkgKyB3aWR0aCAvIDI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uQXhpcyhwYSwgc2lldmUsIGFsbG93TWluRHRpY2spIHtcbiAgICB2YXIgY2FsY1RyYWNlcyA9IHNpZXZlLnRyYWNlcztcbiAgICB2YXIgbWluRGlmZiA9IHNpZXZlLm1pbkRpZmY7XG4gICAgdmFyIHZwYWQgPSBtaW5EaWZmIC8gMjtcblxuICAgIEF4ZXMubWluRHRpY2socGEsIHNpZXZlLm1pbkRpZmYsIHNpZXZlLmRpc3RpbmN0UG9zaXRpb25zWzBdLCBhbGxvd01pbkR0aWNrKTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYWxjVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjYWxjVHJhY2UgPSBjYWxjVHJhY2VzW2ldO1xuICAgICAgICB2YXIgY2FsY1RyYWNlMCA9IGNhbGNUcmFjZVswXTtcbiAgICAgICAgdmFyIGZ1bGxUcmFjZSA9IGNhbGNUcmFjZTAudHJhY2U7XG4gICAgICAgIHZhciBwdHMgPSBbXTtcbiAgICAgICAgdmFyIGJhciwgbCwgciwgajtcblxuICAgICAgICBmb3IoaiA9IDA7IGogPCBjYWxjVHJhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGJhciA9IGNhbGNUcmFjZVtqXTtcbiAgICAgICAgICAgIGwgPSBiYXIucCAtIHZwYWQ7XG4gICAgICAgICAgICByID0gYmFyLnAgKyB2cGFkO1xuICAgICAgICAgICAgcHRzLnB1c2gobCwgcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZihmdWxsVHJhY2Uud2lkdGggfHwgZnVsbFRyYWNlLm9mZnNldCkge1xuICAgICAgICAgICAgdmFyIHQgPSBjYWxjVHJhY2UwLnQ7XG4gICAgICAgICAgICB2YXIgcG9mZnNldCA9IHQucG9mZnNldDtcbiAgICAgICAgICAgIHZhciBiYXJ3aWR0aCA9IHQuYmFyd2lkdGg7XG4gICAgICAgICAgICB2YXIgcG9mZnNldElzQXJyYXkgPSBBcnJheS5pc0FycmF5KHBvZmZzZXQpO1xuICAgICAgICAgICAgdmFyIGJhcndpZHRoSXNBcnJheSA9IEFycmF5LmlzQXJyYXkoYmFyd2lkdGgpO1xuXG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBjYWxjVHJhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBiYXIgPSBjYWxjVHJhY2Vbal07XG4gICAgICAgICAgICAgICAgdmFyIGNhbGNCYXJPZmZzZXQgPSBwb2Zmc2V0SXNBcnJheSA/IHBvZmZzZXRbal0gOiBwb2Zmc2V0O1xuICAgICAgICAgICAgICAgIHZhciBjYWxjQmFyV2lkdGggPSBiYXJ3aWR0aElzQXJyYXkgPyBiYXJ3aWR0aFtqXSA6IGJhcndpZHRoO1xuICAgICAgICAgICAgICAgIGwgPSBiYXIucCArIGNhbGNCYXJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgciA9IGwgKyBjYWxjQmFyV2lkdGg7XG4gICAgICAgICAgICAgICAgcHRzLnB1c2gobCwgcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdWxsVHJhY2UuX2V4dHJlbWVzW3BhLl9pZF0gPSBBeGVzLmZpbmRFeHRyZW1lcyhwYSwgcHRzLCB7cGFkZGVkOiBmYWxzZX0pO1xuICAgIH1cbn1cblxuLy8gc3RvcmUgdGhlc2UgYmFyIGJhc2VzIGFuZCB0b3BzIGluIGNhbGNkYXRhXG4vLyBhbmQgbWFrZSBzdXJlIHRoZSBzaXplIGF4aXMgaW5jbHVkZXMgemVybyxcbi8vIGFsb25nIHdpdGggdGhlIGJhc2VzIGFuZCB0b3BzIG9mIGVhY2ggYmFyLlxuZnVuY3Rpb24gc2V0QmFzZUFuZFRvcChzYSwgc2lldmUpIHtcbiAgICB2YXIgY2FsY1RyYWNlcyA9IHNpZXZlLnRyYWNlcztcbiAgICB2YXIgc0xldHRlciA9IGdldEF4aXNMZXR0ZXIoc2EpO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhbGNUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNhbGNUcmFjZSA9IGNhbGNUcmFjZXNbaV07XG4gICAgICAgIHZhciBmdWxsVHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG4gICAgICAgIHZhciBwdHMgPSBbXTtcbiAgICAgICAgdmFyIHRvemVybyA9IGZhbHNlO1xuXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjYWxjVHJhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBiYXIgPSBjYWxjVHJhY2Vbal07XG4gICAgICAgICAgICB2YXIgYmFzZSA9IGJhci5iO1xuICAgICAgICAgICAgdmFyIHRvcCA9IGJhc2UgKyBiYXIucztcblxuICAgICAgICAgICAgYmFyW3NMZXR0ZXJdID0gdG9wO1xuICAgICAgICAgICAgcHRzLnB1c2godG9wKTtcbiAgICAgICAgICAgIGlmKGJhci5oYXNCKSBwdHMucHVzaChiYXNlKTtcblxuICAgICAgICAgICAgaWYoIWJhci5oYXNCIHx8ICFiYXIuYikge1xuICAgICAgICAgICAgICAgIHRvemVybyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdWxsVHJhY2UuX2V4dHJlbWVzW3NhLl9pZF0gPSBBeGVzLmZpbmRFeHRyZW1lcyhzYSwgcHRzLCB7XG4gICAgICAgICAgICB0b3plcm86IHRvemVybyxcbiAgICAgICAgICAgIHBhZGRlZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN0YWNrQmFycyhzYSwgc2lldmUsIG9wdHMpIHtcbiAgICB2YXIgc0xldHRlciA9IGdldEF4aXNMZXR0ZXIoc2EpO1xuICAgIHZhciBjYWxjVHJhY2VzID0gc2lldmUudHJhY2VzO1xuICAgIHZhciBjYWxjVHJhY2U7XG4gICAgdmFyIGZ1bGxUcmFjZTtcbiAgICB2YXIgaXNGdW5uZWw7XG4gICAgdmFyIGksIGo7XG4gICAgdmFyIGJhcjtcblxuICAgIGZvcihpID0gMDsgaSA8IGNhbGNUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2FsY1RyYWNlID0gY2FsY1RyYWNlc1tpXTtcbiAgICAgICAgZnVsbFRyYWNlID0gY2FsY1RyYWNlWzBdLnRyYWNlO1xuXG4gICAgICAgIGlmKGZ1bGxUcmFjZS50eXBlID09PSAnZnVubmVsJykge1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgY2FsY1RyYWNlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgYmFyID0gY2FsY1RyYWNlW2pdO1xuXG4gICAgICAgICAgICAgICAgaWYoYmFyLnMgIT09IEJBRE5VTSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYmFzZSBvZiBmdW5uZWxzXG4gICAgICAgICAgICAgICAgICAgIHNpZXZlLnB1dChiYXIucCwgLTAuNSAqIGJhci5zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBjYWxjVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNhbGNUcmFjZSA9IGNhbGNUcmFjZXNbaV07XG4gICAgICAgIGZ1bGxUcmFjZSA9IGNhbGNUcmFjZVswXS50cmFjZTtcblxuICAgICAgICBpc0Z1bm5lbCA9IChmdWxsVHJhY2UudHlwZSA9PT0gJ2Z1bm5lbCcpO1xuXG4gICAgICAgIHZhciBwdHMgPSBbXTtcblxuICAgICAgICBmb3IoaiA9IDA7IGogPCBjYWxjVHJhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGJhciA9IGNhbGNUcmFjZVtqXTtcblxuICAgICAgICAgICAgaWYoYmFyLnMgIT09IEJBRE5VTSkge1xuICAgICAgICAgICAgICAgIC8vIHN0YWNrIGN1cnJlbnQgYmFyIGFuZCBnZXQgcHJldmlvdXMgc3VtXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKGlzRnVubmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYmFyLnM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBiYXIucyArIGJhci5iO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBiYXNlID0gc2lldmUucHV0KGJhci5wLCB2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9wID0gYmFzZSArIHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGJhciBiYXNlIGFuZCB0b3AgaW4gZWFjaCBjYWxjZGF0YSBpdGVtXG4gICAgICAgICAgICAgICAgYmFyLmIgPSBiYXNlO1xuICAgICAgICAgICAgICAgIGJhcltzTGV0dGVyXSA9IHRvcDtcblxuICAgICAgICAgICAgICAgIGlmKCFvcHRzLm5vcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgcHRzLnB1c2godG9wKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoYmFyLmhhc0IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB0cy5wdXNoKGJhc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgYmFybm9ybSBpcyBzZXQsIGxldCBub3JtYWxpemVCYXJzIHVwZGF0ZSB0aGUgYXhpcyByYW5nZVxuICAgICAgICBpZighb3B0cy5ub3JtKSB7XG4gICAgICAgICAgICBmdWxsVHJhY2UuX2V4dHJlbWVzW3NhLl9pZF0gPSBBeGVzLmZpbmRFeHRyZW1lcyhzYSwgcHRzLCB7XG4gICAgICAgICAgICAgICAgLy8gTi5CLiB3ZSBkb24ndCBzdGFjayBiYXNlIHdpdGggJ2Jhc2UnLFxuICAgICAgICAgICAgICAgIC8vIHNvIHNldCB0b3plcm86dHJ1ZSBhbHdheXMhXG4gICAgICAgICAgICAgICAgdG96ZXJvOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhZGRlZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNpZXZlQmFycyhzaWV2ZSkge1xuICAgIHZhciBjYWxjVHJhY2VzID0gc2lldmUudHJhY2VzO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhbGNUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNhbGNUcmFjZSA9IGNhbGNUcmFjZXNbaV07XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGNhbGNUcmFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGJhciA9IGNhbGNUcmFjZVtqXTtcblxuICAgICAgICAgICAgaWYoYmFyLnMgIT09IEJBRE5VTSkge1xuICAgICAgICAgICAgICAgIHNpZXZlLnB1dChiYXIucCwgYmFyLmIgKyBiYXIucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVuaGlkZUJhcnNXaXRoaW5UcmFjZShzaWV2ZSkge1xuICAgIHZhciBjYWxjVHJhY2VzID0gc2lldmUudHJhY2VzO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhbGNUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNhbGNUcmFjZSA9IGNhbGNUcmFjZXNbaV07XG4gICAgICAgIHZhciBmdWxsVHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG5cbiAgICAgICAgaWYoZnVsbFRyYWNlLmJhc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIGluVHJhY2VTaWV2ZSA9IG5ldyBTaWV2ZShbY2FsY1RyYWNlXSwge1xuICAgICAgICAgICAgICAgIHNlcE5lZ1ZhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvdmVybGFwTm9NZXJnZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjYWxjVHJhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFyID0gY2FsY1RyYWNlW2pdO1xuXG4gICAgICAgICAgICAgICAgaWYoYmFyLnAgIT09IEJBRE5VTSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzdGFjayBjdXJyZW50IGJhciBhbmQgZ2V0IHByZXZpb3VzIHN1bVxuICAgICAgICAgICAgICAgICAgICB2YXIgYmFzZSA9IGluVHJhY2VTaWV2ZS5wdXQoYmFyLnAsIGJhci5iICsgYmFyLnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHByZXZpb3VzIHN1bSBpZiBub24temVybywgdGhpcyBtZWFuczpcbiAgICAgICAgICAgICAgICAgICAgLy8gbXVsdGlwbGUgYmFycyBoYXZlIHNhbWUgc3RhcnRpbmcgcG9pbnQgYXJlIHBvdGVudGlhbGx5IGhpZGRlbixcbiAgICAgICAgICAgICAgICAgICAgLy8gc2hpZnQgdGhlbSB2ZXJ0aWNhbGx5IHNvIHRoYXQgYWxsIGJhcnMgYXJlIHZpc2libGUgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICBpZihiYXNlKSBiYXIuYiA9IGJhc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBOb3RlOlxuLy9cbi8vIG5vcm1hbGl6ZUJhcnMgcmVxdWlyZXMgdGhhdCBlaXRoZXIgc2lldmVCYXJzIG9yIHN0YWNrQmFycyBoYXMgYmVlblxuLy8gcHJldmlvdXNseSBpbnZva2VkLlxuZnVuY3Rpb24gbm9ybWFsaXplQmFycyhzYSwgc2lldmUsIG9wdHMpIHtcbiAgICB2YXIgY2FsY1RyYWNlcyA9IHNpZXZlLnRyYWNlcztcbiAgICB2YXIgc0xldHRlciA9IGdldEF4aXNMZXR0ZXIoc2EpO1xuICAgIHZhciBzVG9wID0gb3B0cy5ub3JtID09PSAnZnJhY3Rpb24nID8gMSA6IDEwMDtcbiAgICB2YXIgc1RpbnkgPSBzVG9wIC8gMWU5OyAvLyBpbiBjYXNlIG9mIHJvdW5kaW5nIGVycm9yIGluIHN1bVxuICAgIHZhciBzTWluID0gc2EubDJjKHNhLmMybCgwKSk7XG4gICAgdmFyIHNNYXggPSBvcHRzLm1vZGUgPT09ICdzdGFjaycgPyBzVG9wIDogc01pbjtcblxuICAgIGZ1bmN0aW9uIG5lZWRzUGFkZGluZyh2KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpc051bWVyaWMoc2EuYzJsKHYpKSAmJlxuICAgICAgICAgICAgKCh2IDwgc01pbiAtIHNUaW55KSB8fCAodiA+IHNNYXggKyBzVGlueSkgfHwgIWlzTnVtZXJpYyhzTWluKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2FsY1RyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2FsY1RyYWNlID0gY2FsY1RyYWNlc1tpXTtcbiAgICAgICAgdmFyIGZ1bGxUcmFjZSA9IGNhbGNUcmFjZVswXS50cmFjZTtcbiAgICAgICAgdmFyIHB0cyA9IFtdO1xuICAgICAgICB2YXIgdG96ZXJvID0gZmFsc2U7XG4gICAgICAgIHZhciBwYWRkZWQgPSBmYWxzZTtcblxuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgY2FsY1RyYWNlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgYmFyID0gY2FsY1RyYWNlW2pdO1xuXG4gICAgICAgICAgICBpZihiYXIucyAhPT0gQkFETlVNKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjYWxlID0gTWF0aC5hYnMoc1RvcCAvIHNpZXZlLmdldChiYXIucCwgYmFyLnMpKTtcbiAgICAgICAgICAgICAgICBiYXIuYiAqPSBzY2FsZTtcbiAgICAgICAgICAgICAgICBiYXIucyAqPSBzY2FsZTtcblxuICAgICAgICAgICAgICAgIHZhciBiYXNlID0gYmFyLmI7XG4gICAgICAgICAgICAgICAgdmFyIHRvcCA9IGJhc2UgKyBiYXIucztcblxuICAgICAgICAgICAgICAgIGJhcltzTGV0dGVyXSA9IHRvcDtcbiAgICAgICAgICAgICAgICBwdHMucHVzaCh0b3ApO1xuICAgICAgICAgICAgICAgIHBhZGRlZCA9IHBhZGRlZCB8fCBuZWVkc1BhZGRpbmcodG9wKTtcblxuICAgICAgICAgICAgICAgIGlmKGJhci5oYXNCKSB7XG4gICAgICAgICAgICAgICAgICAgIHB0cy5wdXNoKGJhc2UpO1xuICAgICAgICAgICAgICAgICAgICBwYWRkZWQgPSBwYWRkZWQgfHwgbmVlZHNQYWRkaW5nKGJhc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCFiYXIuaGFzQiB8fCAhYmFyLmIpIHtcbiAgICAgICAgICAgICAgICAgICAgdG96ZXJvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdWxsVHJhY2UuX2V4dHJlbWVzW3NhLl9pZF0gPSBBeGVzLmZpbmRFeHRyZW1lcyhzYSwgcHRzLCB7XG4gICAgICAgICAgICB0b3plcm86IHRvemVybyxcbiAgICAgICAgICAgIHBhZGRlZDogcGFkZGVkXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gZmluZCB0aGUgZnVsbCBwb3NpdGlvbiBzcGFuIG9mIGJhcnMgYXQgZWFjaCBwb3NpdGlvblxuLy8gZm9yIHVzZSBieSBob3ZlciwgdG8gZW5zdXJlIGxhYmVscyBtb3ZlIGluIGlmIGJhcnMgYXJlXG4vLyBuYXJyb3dlciB0aGFuIHRoZSBzcGFjZSB0aGV5J3JlIGluLlxuLy8gcnVuIG9uY2UgcGVyIHRyYWNlIGdyb3VwIChzdWJwbG90ICYgZGlyZWN0aW9uKSBhbmRcbi8vIHRoZSBzYW1lIG1hcHBpbmcgaXMgYXR0YWNoZWQgdG8gYWxsIGNhbGNkYXRhIHRyYWNlc1xuZnVuY3Rpb24gY29sbGVjdEV4dGVudHMoY2FsY1RyYWNlcywgcGEpIHtcbiAgICB2YXIgcExldHRlciA9IGdldEF4aXNMZXR0ZXIocGEpO1xuICAgIHZhciBleHRlbnRzID0ge307XG4gICAgdmFyIGksIGosIGNkO1xuXG4gICAgdmFyIHBNaW4gPSBJbmZpbml0eTtcbiAgICB2YXIgcE1heCA9IC1JbmZpbml0eTtcblxuICAgIGZvcihpID0gMDsgaSA8IGNhbGNUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2QgPSBjYWxjVHJhY2VzW2ldO1xuICAgICAgICBmb3IoaiA9IDA7IGogPCBjZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIHAgPSBjZFtqXS5wO1xuICAgICAgICAgICAgaWYoaXNOdW1lcmljKHApKSB7XG4gICAgICAgICAgICAgICAgcE1pbiA9IE1hdGgubWluKHBNaW4sIHApO1xuICAgICAgICAgICAgICAgIHBNYXggPSBNYXRoLm1heChwTWF4LCBwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoaXMgaXMganVzdCBmb3IgcG9zaXRpb25pbmcgb2YgaG92ZXIgbGFiZWxzLCBhbmQgbm9ib2R5IHdpbGwgY2FyZSBpZlxuICAgIC8vIHRoZSBsYWJlbCBpcyAxcHggdG9vIGZhciBvdXQ7IHNvIHJvdW5kIHBvc2l0aW9ucyB0byAxLzEwSyBpbiBjYXNlXG4gICAgLy8gcG9zaXRpb24gdmFsdWVzIGRvbid0IGV4YWN0bHkgbWF0Y2ggZnJvbSB0cmFjZSB0byB0cmFjZVxuICAgIHZhciByb3VuZEZhY3RvciA9IDEwMDAwIC8gKHBNYXggLSBwTWluKTtcbiAgICB2YXIgcm91bmQgPSBleHRlbnRzLnJvdW5kID0gZnVuY3Rpb24ocCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKE1hdGgucm91bmQocm91bmRGYWN0b3IgKiAocCAtIHBNaW4pKSk7XG4gICAgfTtcblxuICAgIGZvcihpID0gMDsgaSA8IGNhbGNUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2QgPSBjYWxjVHJhY2VzW2ldO1xuICAgICAgICBjZFswXS50LmV4dGVudHMgPSBleHRlbnRzO1xuXG4gICAgICAgIHZhciBwb2Zmc2V0ID0gY2RbMF0udC5wb2Zmc2V0O1xuICAgICAgICB2YXIgcG9mZnNldElzQXJyYXkgPSBBcnJheS5pc0FycmF5KHBvZmZzZXQpO1xuXG4gICAgICAgIGZvcihqID0gMDsgaiA8IGNkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgZGkgPSBjZFtqXTtcbiAgICAgICAgICAgIHZhciBwMCA9IGRpW3BMZXR0ZXJdIC0gZGkudyAvIDI7XG5cbiAgICAgICAgICAgIGlmKGlzTnVtZXJpYyhwMCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcDEgPSBkaVtwTGV0dGVyXSArIGRpLncgLyAyO1xuICAgICAgICAgICAgICAgIHZhciBwVmFsID0gcm91bmQoZGkucCk7XG4gICAgICAgICAgICAgICAgaWYoZXh0ZW50c1twVmFsXSkge1xuICAgICAgICAgICAgICAgICAgICBleHRlbnRzW3BWYWxdID0gW01hdGgubWluKHAwLCBleHRlbnRzW3BWYWxdWzBdKSwgTWF0aC5tYXgocDEsIGV4dGVudHNbcFZhbF1bMV0pXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBleHRlbnRzW3BWYWxdID0gW3AwLCBwMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaS5wMCA9IGRpLnAgKyAocG9mZnNldElzQXJyYXkgPyBwb2Zmc2V0W2pdIDogcG9mZnNldCk7XG4gICAgICAgICAgICBkaS5wMSA9IGRpLnAwICsgZGkudztcbiAgICAgICAgICAgIGRpLnMwID0gZGkuYjtcbiAgICAgICAgICAgIGRpLnMxID0gZGkuczAgKyBkaS5zO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRBeGlzTGV0dGVyKGF4KSB7XG4gICAgcmV0dXJuIGF4Ll9pZC5jaGFyQXQoMCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyb3NzVHJhY2VDYWxjOiBjcm9zc1RyYWNlQ2FsYyxcbiAgICBzZXRHcm91cFBvc2l0aW9uczogc2V0R3JvdXBQb3NpdGlvbnNcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEZ4ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meCcpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcblxudmFyIGZpbGxUZXh0ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuZmlsbFRleHQ7XG52YXIgZ2V0TGluZVdpZHRoID0gcmVxdWlyZSgnLi9oZWxwZXJzJykuZ2V0TGluZVdpZHRoO1xudmFyIGhvdmVyTGFiZWxUZXh0ID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKS5ob3ZlckxhYmVsVGV4dDtcbnZhciBCQUROVU0gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvbnVtZXJpY2FsJykuQkFETlVNO1xuXG5mdW5jdGlvbiBob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSkge1xuICAgIHZhciBiYXJQb2ludERhdGEgPSBob3Zlck9uQmFycyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSk7XG5cbiAgICBpZihiYXJQb2ludERhdGEpIHtcbiAgICAgICAgdmFyIGNkID0gYmFyUG9pbnREYXRhLmNkO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICAgICAgdmFyIGRpID0gY2RbYmFyUG9pbnREYXRhLmluZGV4XTtcblxuICAgICAgICBiYXJQb2ludERhdGEuY29sb3IgPSBnZXRUcmFjZUNvbG9yKHRyYWNlLCBkaSk7XG4gICAgICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnZXJyb3JiYXJzJywgJ2hvdmVySW5mbycpKGRpLCB0cmFjZSwgYmFyUG9pbnREYXRhKTtcblxuICAgICAgICByZXR1cm4gW2JhclBvaW50RGF0YV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBob3Zlck9uQmFycyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSkge1xuICAgIHZhciBjZCA9IHBvaW50RGF0YS5jZDtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgdCA9IGNkWzBdLnQ7XG4gICAgdmFyIGlzQ2xvc2VzdCA9IChob3Zlcm1vZGUgPT09ICdjbG9zZXN0Jyk7XG4gICAgdmFyIGlzV2F0ZXJmYWxsID0gKHRyYWNlLnR5cGUgPT09ICd3YXRlcmZhbGwnKTtcbiAgICB2YXIgbWF4SG92ZXJEaXN0YW5jZSA9IHBvaW50RGF0YS5tYXhIb3ZlckRpc3RhbmNlO1xuXG4gICAgdmFyIHBvc1ZhbCwgc2l6ZVZhbCwgcG9zTGV0dGVyLCBzaXplTGV0dGVyLCBkeCwgZHksIHBSYW5nZUNhbGM7XG5cbiAgICBmdW5jdGlvbiB0aGlzQmFyTWluUG9zKGRpKSB7IHJldHVybiBkaVtwb3NMZXR0ZXJdIC0gZGkudyAvIDI7IH1cbiAgICBmdW5jdGlvbiB0aGlzQmFyTWF4UG9zKGRpKSB7IHJldHVybiBkaVtwb3NMZXR0ZXJdICsgZGkudyAvIDI7IH1cblxuICAgIHZhciBtaW5Qb3MgPSBpc0Nsb3Nlc3QgP1xuICAgICAgICB0aGlzQmFyTWluUG9zIDpcbiAgICAgICAgZnVuY3Rpb24oZGkpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBJbiBjb21wYXJlIG1vZGUsIGFjY2VwdCBhIGJhciBpZiB5b3UncmUgb24gaXQgKm9yKiBpdHMgZ3JvdXAuXG4gICAgICAgICAgICAgKiBOZWFybHkgYWx3YXlzIGl0J3MgdGhlIGdyb3VwIHRoYXQgbWF0dGVycywgYnV0IGluIGNhc2UgdGhlIGJhclxuICAgICAgICAgICAgICogd2FzIGV4cGxpY2l0bHkgc2V0IHdpZGVyIHRoYW4gaXRzIGdyb3VwIHdlJ2QgYmV0dGVyIGFjY2VwdCB0aGVcbiAgICAgICAgICAgICAqIHdob2xlIGJhci5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiB1c2UgYGJhcmRlbHRhYCBpbnN0ZWFkIG9mIGBiYXJncm91cHdpZHRoYCBzbyB3ZSBhY2NlcHQgaG92ZXJcbiAgICAgICAgICAgICAqIGluIHRoZSBnYXAuIFRoYXQgd2F5IGhvdmVyIGRvZXNuJ3QgZmxhc2ggb24gYW5kIG9mZiBhcyB5b3VcbiAgICAgICAgICAgICAqIG1vdXNlIG92ZXIgdGhlIHBsb3QgaW4gY29tcGFyZSBtb2Rlcy5cbiAgICAgICAgICAgICAqIEluICdjbG9zZXN0JyBtb2RlIHRob3VnaCB0aGUgZmxhc2hpbmcgc2VlbXMgaW5ldml0YWJsZSxcbiAgICAgICAgICAgICAqIHdpdGhvdXQgZmFyIG1vcmUgY29tcGxleCBsb2dpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4odGhpc0Jhck1pblBvcyhkaSksIGRpLnAgLSB0LmJhcmRlbHRhIC8gMik7XG4gICAgICAgIH07XG5cbiAgICB2YXIgbWF4UG9zID0gaXNDbG9zZXN0ID9cbiAgICAgICAgdGhpc0Jhck1heFBvcyA6XG4gICAgICAgIGZ1bmN0aW9uKGRpKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpc0Jhck1heFBvcyhkaSksIGRpLnAgKyB0LmJhcmRlbHRhIC8gMik7XG4gICAgICAgIH07XG5cbiAgICBmdW5jdGlvbiBfcG9zaXRpb25GbihfbWluUG9zLCBfbWF4UG9zKSB7XG4gICAgICAgIC8vIGFkZCBhIGxpdHRsZSB0byB0aGUgcHNldWRvLWRpc3RhbmNlIGZvciB3aWRlciBiYXJzLCBzbyB0aGF0IGxpa2Ugc2NhdHRlcixcbiAgICAgICAgLy8gaWYgeW91IGFyZSBvdmVyIHR3byBvdmVybGFwcGluZyBiYXJzLCB0aGUgbmFycm93ZXIgb25lIHdpbnMuXG4gICAgICAgIHJldHVybiBGeC5pbmJveChfbWluUG9zIC0gcG9zVmFsLCBfbWF4UG9zIC0gcG9zVmFsLFxuICAgICAgICAgICAgbWF4SG92ZXJEaXN0YW5jZSArIE1hdGgubWluKDEsIE1hdGguYWJzKF9tYXhQb3MgLSBfbWluUG9zKSAvIHBSYW5nZUNhbGMpIC0gMSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9zaXRpb25GbihkaSkge1xuICAgICAgICByZXR1cm4gX3Bvc2l0aW9uRm4obWluUG9zKGRpKSwgbWF4UG9zKGRpKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGhpc0JhclBvc2l0aW9uRm4oZGkpIHtcbiAgICAgICAgcmV0dXJuIF9wb3NpdGlvbkZuKHRoaXNCYXJNaW5Qb3MoZGkpLCB0aGlzQmFyTWF4UG9zKGRpKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2l6ZUZuKGRpKSB7XG4gICAgICAgIHZhciB2ID0gc2l6ZVZhbDtcbiAgICAgICAgdmFyIGIgPSBkaS5iO1xuICAgICAgICB2YXIgcyA9IGRpW3NpemVMZXR0ZXJdO1xuXG4gICAgICAgIGlmKGlzV2F0ZXJmYWxsKSB7XG4gICAgICAgICAgICB2YXIgcmF3UyA9IE1hdGguYWJzKGRpLnJhd1MpIHx8IDA7XG4gICAgICAgICAgICBpZih2ID4gMCkge1xuICAgICAgICAgICAgICAgIHMgKz0gcmF3UztcbiAgICAgICAgICAgIH0gZWxzZSBpZih2IDwgMCkge1xuICAgICAgICAgICAgICAgIHMgLT0gcmF3UztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBhIGdyYWRpZW50IHNvIGhvdmVyaW5nIG5lYXIgdGhlIGVuZCBvZiBhXG4gICAgICAgIC8vIGJhciBtYWtlcyBpdCBhIGxpdHRsZSBjbG9zZXIgbWF0Y2hcbiAgICAgICAgcmV0dXJuIEZ4LmluYm94KGIgLSB2LCBzIC0gdiwgbWF4SG92ZXJEaXN0YW5jZSArIChzIC0gdikgLyAocyAtIGIpIC0gMSk7XG4gICAgfVxuXG4gICAgaWYodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICBwb3NWYWwgPSB5dmFsO1xuICAgICAgICBzaXplVmFsID0geHZhbDtcbiAgICAgICAgcG9zTGV0dGVyID0gJ3knO1xuICAgICAgICBzaXplTGV0dGVyID0gJ3gnO1xuICAgICAgICBkeCA9IHNpemVGbjtcbiAgICAgICAgZHkgPSBwb3NpdGlvbkZuO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc1ZhbCA9IHh2YWw7XG4gICAgICAgIHNpemVWYWwgPSB5dmFsO1xuICAgICAgICBwb3NMZXR0ZXIgPSAneCc7XG4gICAgICAgIHNpemVMZXR0ZXIgPSAneSc7XG4gICAgICAgIGR5ID0gc2l6ZUZuO1xuICAgICAgICBkeCA9IHBvc2l0aW9uRm47XG4gICAgfVxuXG4gICAgdmFyIHBhID0gcG9pbnREYXRhW3Bvc0xldHRlciArICdhJ107XG4gICAgdmFyIHNhID0gcG9pbnREYXRhW3NpemVMZXR0ZXIgKyAnYSddO1xuXG4gICAgcFJhbmdlQ2FsYyA9IE1hdGguYWJzKHBhLnIyYyhwYS5yYW5nZVsxXSkgLSBwYS5yMmMocGEucmFuZ2VbMF0pKTtcblxuICAgIGZ1bmN0aW9uIGR4eShkaSkgeyByZXR1cm4gKGR4KGRpKSArIGR5KGRpKSkgLyAyOyB9XG4gICAgdmFyIGRpc3RmbiA9IEZ4LmdldERpc3RhbmNlRnVuY3Rpb24oaG92ZXJtb2RlLCBkeCwgZHksIGR4eSk7XG4gICAgRnguZ2V0Q2xvc2VzdChjZCwgZGlzdGZuLCBwb2ludERhdGEpO1xuXG4gICAgLy8gc2tpcCB0aGUgcmVzdCAoZm9yIHRoaXMgdHJhY2UpIGlmIHdlIGRpZG4ndCBmaW5kIGEgY2xvc2UgcG9pbnRcbiAgICBpZihwb2ludERhdGEuaW5kZXggPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAvLyBza2lwIHBvaW50cyBpbnNpZGUgYXhpcyByYW5nZWJyZWFrc1xuICAgIGlmKGNkW3BvaW50RGF0YS5pbmRleF0ucCA9PT0gQkFETlVNKSByZXR1cm47XG5cbiAgICAvLyBpZiB3ZSBnZXQgaGVyZSBhbmQgd2UncmUgbm90IGluICdjbG9zZXN0JyBtb2RlLCBwdXNoIG1pbi9tYXggcG9zIGJhY2tcbiAgICAvLyBvbnRvIHRoZSBncm91cCAtIGV2ZW4gdGhvdWdoIHRoYXQgbWVhbnMgb2NjYXNpb25hbGx5IHRoZSBtb3VzZSB3aWxsIGJlXG4gICAgLy8gb3ZlciB0aGUgaG92ZXIgbGFiZWwuXG4gICAgaWYoIWlzQ2xvc2VzdCkge1xuICAgICAgICBtaW5Qb3MgPSBmdW5jdGlvbihkaSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKHRoaXNCYXJNaW5Qb3MoZGkpLCBkaS5wIC0gdC5iYXJncm91cHdpZHRoIC8gMik7XG4gICAgICAgIH07XG4gICAgICAgIG1heFBvcyA9IGZ1bmN0aW9uKGRpKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpc0Jhck1heFBvcyhkaSksIGRpLnAgKyB0LmJhcmdyb3Vwd2lkdGggLyAyKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB0aGUgY2xvc2VzdCBkYXRhIHBvaW50XG4gICAgdmFyIGluZGV4ID0gcG9pbnREYXRhLmluZGV4O1xuICAgIHZhciBkaSA9IGNkW2luZGV4XTtcblxuICAgIHZhciBzaXplID0gKHRyYWNlLmJhc2UpID8gZGkuYiArIGRpLnMgOiBkaS5zO1xuICAgIHBvaW50RGF0YVtzaXplTGV0dGVyICsgJzAnXSA9IHBvaW50RGF0YVtzaXplTGV0dGVyICsgJzEnXSA9IHNhLmMycChkaVtzaXplTGV0dGVyXSwgdHJ1ZSk7XG4gICAgcG9pbnREYXRhW3NpemVMZXR0ZXIgKyAnTGFiZWxWYWwnXSA9IHNpemU7XG5cbiAgICB2YXIgZXh0ZW50ID0gdC5leHRlbnRzW3QuZXh0ZW50cy5yb3VuZChkaS5wKV07XG4gICAgcG9pbnREYXRhW3Bvc0xldHRlciArICcwJ10gPSBwYS5jMnAoaXNDbG9zZXN0ID8gbWluUG9zKGRpKSA6IGV4dGVudFswXSwgdHJ1ZSk7XG4gICAgcG9pbnREYXRhW3Bvc0xldHRlciArICcxJ10gPSBwYS5jMnAoaXNDbG9zZXN0ID8gbWF4UG9zKGRpKSA6IGV4dGVudFsxXSwgdHJ1ZSk7XG4gICAgcG9pbnREYXRhW3Bvc0xldHRlciArICdMYWJlbFZhbCddID0gZGkucDtcblxuICAgIHBvaW50RGF0YS5sYWJlbExhYmVsID0gaG92ZXJMYWJlbFRleHQocGEsIHBvaW50RGF0YVtwb3NMZXR0ZXIgKyAnTGFiZWxWYWwnXSk7XG4gICAgcG9pbnREYXRhLnZhbHVlTGFiZWwgPSBob3ZlckxhYmVsVGV4dChzYSwgcG9pbnREYXRhW3NpemVMZXR0ZXIgKyAnTGFiZWxWYWwnXSk7XG5cbiAgICAvLyBzcGlrZWxpbmVzIGFsd2F5cyB3YW50IFwiY2xvc2VzdFwiIGRpc3RhbmNlIHJlZ2FyZGxlc3Mgb2YgaG92ZXJtb2RlXG4gICAgcG9pbnREYXRhLnNwaWtlRGlzdGFuY2UgPSAoc2l6ZUZuKGRpKSArIHRoaXNCYXJQb3NpdGlvbkZuKGRpKSkgLyAyIC0gbWF4SG92ZXJEaXN0YW5jZTtcbiAgICAvLyB0aGV5IGFsc28gd2FudCB0byBwb2ludCB0byB0aGUgZGF0YSB2YWx1ZSwgcmVnYXJkbGVzcyBvZiB3aGVyZSB0aGUgbGFiZWwgZ29lc1xuICAgIC8vIGluIGNhc2Ugb2YgYmFycyBzaGlmdGVkIHdpdGhpbiBncm91cHNcbiAgICBwb2ludERhdGFbcG9zTGV0dGVyICsgJ1NwaWtlJ10gPSBwYS5jMnAoZGkucCwgdHJ1ZSk7XG5cbiAgICBmaWxsVGV4dChkaSwgdHJhY2UsIHBvaW50RGF0YSk7XG4gICAgcG9pbnREYXRhLmhvdmVydGVtcGxhdGUgPSB0cmFjZS5ob3ZlcnRlbXBsYXRlO1xuXG4gICAgcmV0dXJuIHBvaW50RGF0YTtcbn1cblxuZnVuY3Rpb24gZ2V0VHJhY2VDb2xvcih0cmFjZSwgZGkpIHtcbiAgICB2YXIgbWMgPSBkaS5tY2MgfHwgdHJhY2UubWFya2VyLmNvbG9yO1xuICAgIHZhciBtbGMgPSBkaS5tbGNjIHx8IHRyYWNlLm1hcmtlci5saW5lLmNvbG9yO1xuICAgIHZhciBtbHcgPSBnZXRMaW5lV2lkdGgodHJhY2UsIGRpKTtcblxuICAgIGlmKENvbG9yLm9wYWNpdHkobWMpKSByZXR1cm4gbWM7XG4gICAgZWxzZSBpZihDb2xvci5vcGFjaXR5KG1sYykgJiYgbWx3KSByZXR1cm4gbWxjO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBob3ZlclBvaW50czogaG92ZXJQb2ludHMsXG4gICAgaG92ZXJPbkJhcnM6IGhvdmVyT25CYXJzLFxuICAgIGdldFRyYWNlQ29sb3I6IGdldFRyYWNlQ29sb3Jcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0UG9pbnRzKHNlYXJjaEluZm8sIHNlbGVjdGlvblRlc3Rlcikge1xuICAgIHZhciBjZCA9IHNlYXJjaEluZm8uY2Q7XG4gICAgdmFyIHhhID0gc2VhcmNoSW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBzZWFyY2hJbmZvLnlheGlzO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciBpc0Z1bm5lbCA9ICh0cmFjZS50eXBlID09PSAnZnVubmVsJyk7XG4gICAgdmFyIGlzSG9yaXpvbnRhbCA9ICh0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKTtcbiAgICB2YXIgc2VsZWN0aW9uID0gW107XG4gICAgdmFyIGk7XG5cbiAgICBpZihzZWxlY3Rpb25UZXN0ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGNsZWFyIHNlbGVjdGlvblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2RbaV0uc2VsZWN0ZWQgPSAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBkaSA9IGNkW2ldO1xuICAgICAgICAgICAgdmFyIGN0ID0gJ2N0JyBpbiBkaSA/IGRpLmN0IDogZ2V0Q2VudHJvaWQoZGksIHhhLCB5YSwgaXNIb3Jpem9udGFsLCBpc0Z1bm5lbCk7XG5cbiAgICAgICAgICAgIGlmKHNlbGVjdGlvblRlc3Rlci5jb250YWlucyhjdCwgZmFsc2UsIGksIHNlYXJjaEluZm8pKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBwb2ludE51bWJlcjogaSxcbiAgICAgICAgICAgICAgICAgICAgeDogeGEuYzJkKGRpLngpLFxuICAgICAgICAgICAgICAgICAgICB5OiB5YS5jMmQoZGkueSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkaS5zZWxlY3RlZCA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpLnNlbGVjdGVkID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3Rpb247XG59O1xuXG5mdW5jdGlvbiBnZXRDZW50cm9pZChkLCB4YSwgeWEsIGlzSG9yaXpvbnRhbCwgaXNGdW5uZWwpIHtcbiAgICB2YXIgeDAgPSB4YS5jMnAoaXNIb3Jpem9udGFsID8gZC5zMCA6IGQucDAsIHRydWUpO1xuICAgIHZhciB4MSA9IHhhLmMycChpc0hvcml6b250YWwgPyBkLnMxIDogZC5wMSwgdHJ1ZSk7XG4gICAgdmFyIHkwID0geWEuYzJwKGlzSG9yaXpvbnRhbCA/IGQucDAgOiBkLnMwLCB0cnVlKTtcbiAgICB2YXIgeTEgPSB5YS5jMnAoaXNIb3Jpem9udGFsID8gZC5wMSA6IGQuczEsIHRydWUpO1xuXG4gICAgaWYoaXNGdW5uZWwpIHtcbiAgICAgICAgcmV0dXJuIFsoeDAgKyB4MSkgLyAyLCAoeTAgKyB5MSkgLyAyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZihpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBbeDEsICh5MCArIHkxKSAvIDJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFsoeDAgKyB4MSkgLyAyLCB5MV07XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU2lldmU7XG5cbnZhciBkaXN0aW5jdFZhbHMgPSByZXF1aXJlKCcuLi8uLi9saWInKS5kaXN0aW5jdFZhbHM7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxuLyoqXG4gKiBIZWxwZXIgY2xhc3MgdG8gc2lldmUgZGF0YSBmcm9tIHRyYWNlcyBpbnRvIGJpbnNcbiAqXG4gKiBAY2xhc3NcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0cmFjZXNcbiogICBBcnJheSBvZiBjYWxjdWxhdGVkIHRyYWNlc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqICAtIEBwYXJhbSB7Ym9vbGVhbn0gW3NlcE5lZ1ZhbF1cbiAqICAgICAgSWYgdHJ1ZSwgdGhlbiBzcGxpdCBkYXRhIGF0IHRoZSBzYW1lIHBvc2l0aW9uIGludG8gYSBiYXJcbiAqICAgICAgZm9yIHBvc2l0aXZlIHZhbHVlcyBhbmQgYW5vdGhlciBmb3IgbmVnYXRpdmUgdmFsdWVzXG4gKiAgLSBAcGFyYW0ge2Jvb2xlYW59IFtvdmVybGFwTm9NZXJnZV1cbiAqICAgICBJZiB0cnVlLCB0aGVuIGRvbid0IG1lcmdlIG92ZXJsYXBwaW5nIGJhcnMgaW50byBhIHNpbmdsZSBiYXJcbiAqL1xuZnVuY3Rpb24gU2lldmUodHJhY2VzLCBvcHRzKSB7XG4gICAgdGhpcy50cmFjZXMgPSB0cmFjZXM7XG4gICAgdGhpcy5zZXBOZWdWYWwgPSBvcHRzLnNlcE5lZ1ZhbDtcbiAgICB0aGlzLm92ZXJsYXBOb01lcmdlID0gb3B0cy5vdmVybGFwTm9NZXJnZTtcblxuICAgIC8vIGZvciBzaW5nbGUtYmluIGhpc3RvZ3JhbXMgLSBzZWUgaGlzdG9ncmFtL2NhbGNcbiAgICB2YXIgd2lkdGgxID0gSW5maW5pdHk7XG5cbiAgICB2YXIgcG9zaXRpb25zID0gW107XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhY2UgPSB0cmFjZXNbaV07XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB0cmFjZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGJhciA9IHRyYWNlW2pdO1xuICAgICAgICAgICAgaWYoYmFyLnAgIT09IEJBRE5VTSkgcG9zaXRpb25zLnB1c2goYmFyLnApO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRyYWNlWzBdICYmIHRyYWNlWzBdLndpZHRoMSkge1xuICAgICAgICAgICAgd2lkdGgxID0gTWF0aC5taW4odHJhY2VbMF0ud2lkdGgxLCB3aWR0aDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zO1xuXG4gICAgdmFyIGR2ID0gZGlzdGluY3RWYWxzKHBvc2l0aW9ucyk7XG4gICAgdGhpcy5kaXN0aW5jdFBvc2l0aW9ucyA9IGR2LnZhbHM7XG4gICAgaWYoZHYudmFscy5sZW5ndGggPT09IDEgJiYgd2lkdGgxICE9PSBJbmZpbml0eSkgdGhpcy5taW5EaWZmID0gd2lkdGgxO1xuICAgIGVsc2UgdGhpcy5taW5EaWZmID0gTWF0aC5taW4oZHYubWluRGlmZiwgd2lkdGgxKTtcblxuICAgIHRoaXMuYmluV2lkdGggPSB0aGlzLm1pbkRpZmY7XG5cbiAgICB0aGlzLmJpbnMgPSB7fTtcbn1cblxuLyoqXG4gKiBTaWV2ZSBkYXR1bVxuICpcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBQcmV2aW91cyBiaW4gdmFsdWVcbiAqL1xuU2lldmUucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uIHB1dChwb3NpdGlvbiwgdmFsdWUpIHtcbiAgICB2YXIgbGFiZWwgPSB0aGlzLmdldExhYmVsKHBvc2l0aW9uLCB2YWx1ZSk7XG4gICAgdmFyIG9sZFZhbHVlID0gdGhpcy5iaW5zW2xhYmVsXSB8fCAwO1xuXG4gICAgdGhpcy5iaW5zW2xhYmVsXSA9IG9sZFZhbHVlICsgdmFsdWU7XG5cbiAgICByZXR1cm4gb2xkVmFsdWU7XG59O1xuXG4vKipcbiAqIEdldCBjdXJyZW50IGJpbiB2YWx1ZSBmb3IgYSBnaXZlbiBkYXR1bVxuICpcbiAqIEBtZXRob2RcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvbiAgUG9zaXRpb24gb2YgZGF0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBbdmFsdWVdICAgVmFsdWUgb2YgZGF0dW1cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlcXVpcmVkIGlmIHRoaXMuc2VwTmVnVmFsIGlzIHRydWUpXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBDdXJyZW50IGJpbiB2YWx1ZVxuICovXG5TaWV2ZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KHBvc2l0aW9uLCB2YWx1ZSkge1xuICAgIHZhciBsYWJlbCA9IHRoaXMuZ2V0TGFiZWwocG9zaXRpb24sIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5iaW5zW2xhYmVsXSB8fCAwO1xufTtcblxuLyoqXG4gKiBHZXQgYmluIGxhYmVsIGZvciBhIGdpdmVuIGRhdHVtXG4gKlxuICogQG1ldGhvZFxuICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uICBQb3NpdGlvbiBvZiBkYXR1bVxuICogQHBhcmFtIHtudW1iZXJ9IFt2YWx1ZV0gICBWYWx1ZSBvZiBkYXR1bVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAocmVxdWlyZWQgaWYgdGhpcy5zZXBOZWdWYWwgaXMgdHJ1ZSlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJpbiBsYWJlbFxuICogKHByZWZpeGVkIHdpdGggYSAndicgaWYgdmFsdWUgaXMgbmVnYXRpdmUgYW5kIHRoaXMuc2VwTmVnVmFsIGlzXG4gKiB0cnVlOyBvdGhlcndpc2UgcHJlZml4ZWQgd2l0aCAnXicpXG4gKi9cblNpZXZlLnByb3RvdHlwZS5nZXRMYWJlbCA9IGZ1bmN0aW9uIGdldExhYmVsKHBvc2l0aW9uLCB2YWx1ZSkge1xuICAgIHZhciBwcmVmaXggPSAodmFsdWUgPCAwICYmIHRoaXMuc2VwTmVnVmFsKSA/ICd2JyA6ICdeJztcbiAgICB2YXIgbGFiZWwgPSAodGhpcy5vdmVybGFwTm9NZXJnZSkgP1xuICAgICAgICBwb3NpdGlvbiA6XG4gICAgICAgIE1hdGgucm91bmQocG9zaXRpb24gLyB0aGlzLmJpbldpZHRoKTtcbiAgICByZXR1cm4gcHJlZml4ICsgbGFiZWw7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==