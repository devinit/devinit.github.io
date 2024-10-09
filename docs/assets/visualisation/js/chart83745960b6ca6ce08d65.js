(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_funnelarea_js"],{

/***/ "./node_modules/plotly.js/lib/funnelarea.js":
/*!**************************************************!*\
  !*** ./node_modules/plotly.js/lib/funnelarea.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/funnelarea */ "./node_modules/plotly.js/src/traces/funnelarea/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnelarea/attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnelarea/attributes.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var pieAttrs = __webpack_require__(/*! ../pie/attributes */ "./node_modules/plotly.js/src/traces/pie/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = {
    labels: pieAttrs.labels,
    // equivalent of x0 and dx, if label is missing
    label0: pieAttrs.label0,
    dlabel: pieAttrs.dlabel,
    values: pieAttrs.values,

    marker: {
        colors: pieAttrs.marker.colors,
        line: {
            color: extendFlat({}, pieAttrs.marker.line.color, {
                dflt: null,
                description: [
                    'Sets the color of the line enclosing each sector.',
                    'Defaults to the `paper_bgcolor` value.'
                ].join(' ')
            }),
            width: extendFlat({}, pieAttrs.marker.line.width, {dflt: 1}),
            editType: 'calc'
        },
        editType: 'calc'
    },

    text: pieAttrs.text,
    hovertext: pieAttrs.hovertext,

    scalegroup: extendFlat({}, pieAttrs.scalegroup, {
        description: [
            'If there are multiple funnelareas that should be sized according to',
            'their totals, link them by providing a non-empty group id here',
            'shared by every trace in the same group.'
        ].join(' ')
    }),

    textinfo: extendFlat({}, pieAttrs.textinfo, {
        flags: ['label', 'text', 'value', 'percent']
    }),

    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: ['label', 'color', 'value', 'text', 'percent']
    }),

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['label', 'text', 'value', 'percent', 'name']
    }),

    hovertemplate: hovertemplateAttrs({}, {
        keys: ['label', 'color', 'value', 'text', 'percent']
    }),

    textposition: extendFlat({}, pieAttrs.textposition, {
        values: ['inside', 'none'],
        dflt: 'inside'
    }),

    textfont: pieAttrs.textfont,
    insidetextfont: pieAttrs.insidetextfont,

    title: {
        text: pieAttrs.title.text,
        font: pieAttrs.title.font,
        position: extendFlat({}, pieAttrs.title.position, {
            values: ['top left', 'top center', 'top right'],
            dflt: 'top center'
        }),
        editType: 'plot'
    },

    domain: domainAttrs({name: 'funnelarea', trace: true, editType: 'calc'}),

    aspectratio: {
        valType: 'number',
        role: 'info',
        min: 0,
        dflt: 1,
        editType: 'plot',
        description: [
            'Sets the ratio between height and width'
        ].join(' ')
    },

    baseratio: {
        valType: 'number',
        role: 'info',
        min: 0,
        max: 1,
        dflt: 0.333,
        editType: 'plot',
        description: [
            'Sets the ratio between bottom length and maximum top length.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnelarea/base_plot.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnelarea/base_plot.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var plots = __webpack_require__(/*! ../../plots/plots */ "./node_modules/plotly.js/src/plots/plots.js");

exports.name = 'funnelarea';

exports.plot = function(gd, traces, transitionOpts, makeOnCompleteCallback) {
    plots.plotBasePlot(exports.name, gd, traces, transitionOpts, makeOnCompleteCallback);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    plots.cleanBasePlot(exports.name, newFullData, newFullLayout, oldFullData, oldFullLayout);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnelarea/calc.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnelarea/calc.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var pieCalc = __webpack_require__(/*! ../pie/calc */ "./node_modules/plotly.js/src/traces/pie/calc.js");

function calc(gd, trace) {
    return pieCalc.calc(gd, trace);
}

function crossTraceCalc(gd) {
    pieCalc.crossTraceCalc(gd, { type: 'funnelarea' });
}

module.exports = {
    calc: calc,
    crossTraceCalc: crossTraceCalc
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnelarea/defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnelarea/defaults.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/funnelarea/attributes.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;
var handleText = __webpack_require__(/*! ../bar/defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").handleText;
var handleLabelsAndValues = __webpack_require__(/*! ../pie/defaults */ "./node_modules/plotly.js/src/traces/pie/defaults.js").handleLabelsAndValues;

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var labels = coerce('labels');
    var values = coerce('values');

    var res = handleLabelsAndValues(labels, values);
    var len = res.len;
    traceOut._hasLabels = res.hasLabels;
    traceOut._hasValues = res.hasValues;

    if(!traceOut._hasLabels &&
        traceOut._hasValues
    ) {
        coerce('label0');
        coerce('dlabel');
    }

    if(!len) {
        traceOut.visible = false;
        return;
    }
    traceOut._length = len;

    var lineWidth = coerce('marker.line.width');
    if(lineWidth) coerce('marker.line.color', layout.paper_bgcolor);

    coerce('marker.colors');

    coerce('scalegroup');

    var textData = coerce('text');
    var textTemplate = coerce('texttemplate');
    var textInfo;
    if(!textTemplate) textInfo = coerce('textinfo', Array.isArray(textData) ? 'text+percent' : 'percent');

    coerce('hovertext');
    coerce('hovertemplate');

    if(textTemplate || (textInfo && textInfo !== 'none')) {
        var textposition = coerce('textposition');
        handleText(traceIn, traceOut, layout, coerce, textposition, {
            moduleHasSelected: false,
            moduleHasUnselected: false,
            moduleHasConstrain: false,
            moduleHasCliponaxis: false,
            moduleHasTextangle: false,
            moduleHasInsideanchor: false
        });
    }

    handleDomainDefaults(traceOut, layout, coerce);

    var title = coerce('title.text');
    if(title) {
        coerce('title.position');
        Lib.coerceFont(coerce, 'title.font', layout.font);
    }

    coerce('aspectratio');
    coerce('baseratio');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnelarea/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnelarea/index.js ***!
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



module.exports = {
    moduleType: 'trace',
    name: 'funnelarea',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/funnelarea/base_plot.js"),
    categories: ['pie-like', 'funnelarea', 'showLegend'],

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/funnelarea/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/funnelarea/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/funnelarea/defaults.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/funnelarea/layout_defaults.js"),

    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/funnelarea/calc.js").calc,
    crossTraceCalc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/funnelarea/calc.js").crossTraceCalc,

    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/funnelarea/plot.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/funnelarea/style.js"),
    styleOne: __webpack_require__(/*! ../pie/style_one */ "./node_modules/plotly.js/src/traces/pie/style_one.js"),

    meta: {
        description: [
            'Visualize stages in a process using area-encoded trapezoids. This trace can be used',
            'to show data in a part-to-whole representation similar to a "pie" trace, wherein',
            'each item appears in a single stage. See also the "funnel" trace type for a different',
            'approach to visualizing funnel data.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnelarea/layout_attributes.js":
/*!***************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnelarea/layout_attributes.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var hiddenlabels = __webpack_require__(/*! ../pie/layout_attributes */ "./node_modules/plotly.js/src/traces/pie/layout_attributes.js").hiddenlabels;

module.exports = {
    hiddenlabels: hiddenlabels,

    funnelareacolorway: {
        valType: 'colorlist',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the default funnelarea slice colors. Defaults to the main',
            '`colorway` used for trace colors. If you specify a new',
            'list here it can still be extended with lighter and darker',
            'colors, see `extendfunnelareacolors`.'
        ].join(' ')
    },
    extendfunnelareacolors: {
        valType: 'boolean',
        dflt: true,
        role: 'style',
        editType: 'calc',
        description: [
            'If `true`, the funnelarea slice colors (whether given by `funnelareacolorway` or',
            'inherited from `colorway`) will be extended to three times its',
            'original length by first repeating every color 20% lighter then',
            'each color 20% darker. This is intended to reduce the likelihood',
            'of reusing the same color when you have many slices, but you can',
            'set `false` to disable.',
            'Colors provided in the trace, using `marker.colors`, are never',
            'extended.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnelarea/layout_defaults.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnelarea/layout_defaults.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/funnelarea/layout_attributes.js");

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    coerce('hiddenlabels');
    coerce('funnelareacolorway', layoutOut.colorway);
    coerce('extendfunnelareacolors');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnelarea/plot.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnelarea/plot.js ***!
  \**************************************************************/
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

var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");

var barPlot = __webpack_require__(/*! ../bar/plot */ "./node_modules/plotly.js/src/traces/bar/plot.js");
var toMoveInsideBar = barPlot.toMoveInsideBar;
var uniformText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js");
var recordMinTextSize = uniformText.recordMinTextSize;
var clearMinTextSize = uniformText.clearMinTextSize;
var pieHelpers = __webpack_require__(/*! ../pie/helpers */ "./node_modules/plotly.js/src/traces/pie/helpers.js");
var piePlot = __webpack_require__(/*! ../pie/plot */ "./node_modules/plotly.js/src/traces/pie/plot.js");

var attachFxHandlers = piePlot.attachFxHandlers;
var determineInsideTextFont = piePlot.determineInsideTextFont;

var layoutAreas = piePlot.layoutAreas;
var prerenderTitles = piePlot.prerenderTitles;
var positionTitleOutside = piePlot.positionTitleOutside;
var formatSliceLabel = piePlot.formatSliceLabel;

module.exports = function plot(gd, cdModule) {
    var fullLayout = gd._fullLayout;

    clearMinTextSize('funnelarea', fullLayout);

    prerenderTitles(cdModule, gd);
    layoutAreas(cdModule, fullLayout._size);

    Lib.makeTraceGroups(fullLayout._funnelarealayer, cdModule, 'trace').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;

        setCoords(cd);

        plotGroup.each(function() {
            var slices = d3.select(this).selectAll('g.slice').data(cd);

            slices.enter().append('g')
                .classed('slice', true);
            slices.exit().remove();

            slices.each(function(pt, i) {
                if(pt.hidden) {
                    d3.select(this).selectAll('path,g').remove();
                    return;
                }

                // to have consistent event data compared to other traces
                pt.pointNumber = pt.i;
                pt.curveNumber = trace.index;

                var cx = cd0.cx;
                var cy = cd0.cy;
                var sliceTop = d3.select(this);
                var slicePath = sliceTop.selectAll('path.surface').data([pt]);

                slicePath.enter().append('path')
                    .classed('surface', true)
                    .style({'pointer-events': 'all'});

                sliceTop.call(attachFxHandlers, gd, cd);

                var shape =
                    'M' + (cx + pt.TR[0]) + ',' + (cy + pt.TR[1]) +
                    line(pt.TR, pt.BR) +
                    line(pt.BR, pt.BL) +
                    line(pt.BL, pt.TL) +
                    'Z';

                slicePath.attr('d', shape);

                // add text
                formatSliceLabel(gd, pt, cd0);
                var textPosition = pieHelpers.castOption(trace.textposition, pt.pts);
                var sliceTextGroup = sliceTop.selectAll('g.slicetext')
                    .data(pt.text && (textPosition !== 'none') ? [0] : []);

                sliceTextGroup.enter().append('g')
                    .classed('slicetext', true);
                sliceTextGroup.exit().remove();

                sliceTextGroup.each(function() {
                    var sliceText = Lib.ensureSingle(d3.select(this), 'text', '', function(s) {
                        // prohibit tex interpretation until we can handle
                        // tex and regular text together
                        s.attr('data-notex', 1);
                    });

                    var font = Lib.ensureUniformFontSize(gd, determineInsideTextFont(trace, pt, fullLayout.font));

                    sliceText.text(pt.text)
                        .attr({
                            'class': 'slicetext',
                            transform: '',
                            'text-anchor': 'middle'
                        })
                        .call(Drawing.font, font)
                        .call(svgTextUtils.convertToTspans, gd);

                    // position the text relative to the slice
                    var textBB = Drawing.bBox(sliceText.node());
                    var transform;

                    var x0, x1;
                    var y0 = Math.min(pt.BL[1], pt.BR[1]) + cy;
                    var y1 = Math.max(pt.TL[1], pt.TR[1]) + cy;

                    x0 = Math.max(pt.TL[0], pt.BL[0]) + cx;
                    x1 = Math.min(pt.TR[0], pt.BR[0]) + cx;

                    transform = toMoveInsideBar(x0, x1, y0, y1, textBB, {
                        isHorizontal: true,
                        constrained: true,
                        angle: 0,
                        anchor: 'middle'
                    });

                    transform.fontSize = font.size;
                    recordMinTextSize(trace.type, transform, fullLayout);
                    cd[i].transform = transform;

                    sliceText.attr('transform', Lib.getTextTransform(transform));
                });
            });

            // add the title
            var titleTextGroup = d3.select(this).selectAll('g.titletext')
                .data(trace.title.text ? [0] : []);

            titleTextGroup.enter().append('g')
                .classed('titletext', true);
            titleTextGroup.exit().remove();

            titleTextGroup.each(function() {
                var titleText = Lib.ensureSingle(d3.select(this), 'text', '', function(s) {
                    // prohibit tex interpretation as above
                    s.attr('data-notex', 1);
                });

                var txt = trace.title.text;
                if(trace._meta) {
                    txt = Lib.templateString(txt, trace._meta);
                }

                titleText.text(txt)
                    .attr({
                        'class': 'titletext',
                        transform: '',
                        'text-anchor': 'middle',
                    })
                .call(Drawing.font, trace.title.font)
                .call(svgTextUtils.convertToTspans, gd);

                var transform = positionTitleOutside(cd0, fullLayout._size);

                titleText.attr('transform',
                    'translate(' + transform.x + ',' + transform.y + ')' +
                    (transform.scale < 1 ? ('scale(' + transform.scale + ')') : '') +
                    'translate(' + transform.tx + ',' + transform.ty + ')');
            });
        });
    });
};

function line(a, b) {
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];

    return 'l' + dx + ',' + dy;
}

function getBetween(a, b) {
    return [
        0.5 * (a[0] + b[0]),
        0.5 * (a[1] + b[1])
    ];
}

function setCoords(cd) {
    if(!cd.length) return;

    var cd0 = cd[0];
    var trace = cd0.trace;

    var aspectratio = trace.aspectratio;

    var h = trace.baseratio;
    if(h > 0.999) h = 0.999; // TODO: may handle this case separately
    var h2 = Math.pow(h, 2);

    var v1 = cd0.vTotal;
    var v0 = v1 * h2 / (1 - h2);

    var totalValues = v1;
    var sumSteps = v0 / v1;

    function calcPos() {
        var q = Math.sqrt(sumSteps);
        return {
            x: q,
            y: -q
        };
    }

    function getPoint() {
        var pos = calcPos();
        return [pos.x, pos.y];
    }

    var p;
    var allPoints = [];
    allPoints.push(getPoint());

    var i, cdi;
    for(i = cd.length - 1; i > -1; i--) {
        cdi = cd[i];
        if(cdi.hidden) continue;

        var step = cdi.v / totalValues;
        sumSteps += step;

        allPoints.push(getPoint());
    }

    var minY = Infinity;
    var maxY = -Infinity;
    for(i = 0; i < allPoints.length; i++) {
        p = allPoints[i];
        minY = Math.min(minY, p[1]);
        maxY = Math.max(maxY, p[1]);
    }

    // center the shape
    for(i = 0; i < allPoints.length; i++) {
        allPoints[i][1] -= (maxY + minY) / 2;
    }

    var lastX = allPoints[allPoints.length - 1][0];

    // get pie r
    var r = cd0.r;

    var rY = (maxY - minY) / 2;
    var scaleX = r / lastX;
    var scaleY = r / rY * aspectratio;

    // set funnelarea r
    cd0.r = scaleY * rY;

    // scale the shape
    for(i = 0; i < allPoints.length; i++) {
        allPoints[i][0] *= scaleX;
        allPoints[i][1] *= scaleY;
    }

    // record first position
    p = allPoints[0];
    var prevLeft = [-p[0], p[1]];
    var prevRight = [p[0], p[1]];

    var n = 0; // note we skip the very first point.
    for(i = cd.length - 1; i > -1; i--) {
        cdi = cd[i];
        if(cdi.hidden) continue;

        n += 1;
        var x = allPoints[n][0];
        var y = allPoints[n][1];

        cdi.TL = [-x, y];
        cdi.TR = [x, y];

        cdi.BL = prevLeft;
        cdi.BR = prevRight;

        cdi.pxmid = getBetween(cdi.TR, cdi.BR);

        prevLeft = cdi.TL;
        prevRight = cdi.TR;
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnelarea/style.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnelarea/style.js ***!
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

var styleOne = __webpack_require__(/*! ../pie/style_one */ "./node_modules/plotly.js/src/traces/pie/style_one.js");
var resizeText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").resizeText;

module.exports = function style(gd) {
    var s = gd._fullLayout._funnelarealayer.selectAll('.trace');
    resizeText(gd, s, 'funnelarea');

    s.each(function(cd) {
        var cd0 = cd[0];
        var trace = cd0.trace;
        var traceSelection = d3.select(this);

        traceSelection.style({opacity: trace.opacity});

        traceSelection.selectAll('path.surface').each(function(pt) {
            d3.select(this).call(styleOne, pt, trace);
        });
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/defaults.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/defaults.js ***!
  \***********************************************************/
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
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/pie/attributes.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;
var handleText = __webpack_require__(/*! ../bar/defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").handleText;

function handleLabelsAndValues(labels, values) {
    var hasLabels = Array.isArray(labels);
    var hasValues = Lib.isArrayOrTypedArray(values);
    var len = Math.min(
        hasLabels ? labels.length : Infinity,
        hasValues ? values.length : Infinity
    );

    if(!isFinite(len)) len = 0;

    if(len && hasValues) {
        var hasPositive;
        for(var i = 0; i < len; i++) {
            var v = values[i];
            if(isNumeric(v) && v > 0) {
                hasPositive = true;
                break;
            }
        }
        if(!hasPositive) len = 0;
    }

    return {
        hasLabels: hasLabels,
        hasValues: hasValues,
        len: len
    };
}

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var labels = coerce('labels');
    var values = coerce('values');

    var res = handleLabelsAndValues(labels, values);
    var len = res.len;
    traceOut._hasLabels = res.hasLabels;
    traceOut._hasValues = res.hasValues;

    if(!traceOut._hasLabels &&
        traceOut._hasValues
    ) {
        coerce('label0');
        coerce('dlabel');
    }

    if(!len) {
        traceOut.visible = false;
        return;
    }
    traceOut._length = len;

    var lineWidth = coerce('marker.line.width');
    if(lineWidth) coerce('marker.line.color');

    coerce('marker.colors');

    coerce('scalegroup');
    // TODO: hole needs to be coerced to the same value within a scaleegroup

    var textData = coerce('text');
    var textTemplate = coerce('texttemplate');
    var textInfo;
    if(!textTemplate) textInfo = coerce('textinfo', Array.isArray(textData) ? 'text+percent' : 'percent');

    coerce('hovertext');
    coerce('hovertemplate');

    if(textTemplate || (textInfo && textInfo !== 'none')) {
        var textposition = coerce('textposition');
        handleText(traceIn, traceOut, layout, coerce, textposition, {
            moduleHasSelected: false,
            moduleHasUnselected: false,
            moduleHasConstrain: false,
            moduleHasCliponaxis: false,
            moduleHasTextangle: false,
            moduleHasInsideanchor: false
        });

        var hasBoth = Array.isArray(textposition) || textposition === 'auto';
        var hasOutside = hasBoth || textposition === 'outside';
        if(hasOutside) {
            coerce('automargin');
        }

        if(textposition === 'inside' || textposition === 'auto' || Array.isArray(textposition)) {
            coerce('insidetextorientation');
        }
    }

    handleDomainDefaults(traceOut, layout, coerce);

    var hole = coerce('hole');
    var title = coerce('title.text');
    if(title) {
        var titlePosition = coerce('title.position', hole ? 'middle center' : 'top center');
        if(!hole && titlePosition === 'middle center') traceOut.title.position = 'top center';
        Lib.coerceFont(coerce, 'title.font', layout.font);
    }

    coerce('sort');
    coerce('direction');
    coerce('rotation');
    coerce('pull');
}

module.exports = {
    handleLabelsAndValues: handleLabelsAndValues,
    supplyDefaults: supplyDefaults
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/layout_attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/layout_attributes.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = {
    hiddenlabels: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc',
        description: [
            'hiddenlabels is the funnelarea & pie chart analog of',
            'visible:\'legendonly\'',
            'but it can contain many labels, and can simultaneously',
            'hide slices from several pies/funnelarea charts'
        ].join(' ')
    },
    piecolorway: {
        valType: 'colorlist',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the default pie slice colors. Defaults to the main',
            '`colorway` used for trace colors. If you specify a new',
            'list here it can still be extended with lighter and darker',
            'colors, see `extendpiecolors`.'
        ].join(' ')
    },
    extendpiecolors: {
        valType: 'boolean',
        dflt: true,
        role: 'style',
        editType: 'calc',
        description: [
            'If `true`, the pie slice colors (whether given by `piecolorway` or',
            'inherited from `colorway`) will be extended to three times its',
            'original length by first repeating every color 20% lighter then',
            'each color 20% darker. This is intended to reduce the likelihood',
            'of reusing the same color when you have many slices, but you can',
            'set `false` to disable.',
            'Colors provided in the trace, using `marker.colors`, are never',
            'extended.'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvZnVubmVsYXJlYS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Z1bm5lbGFyZWEvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Z1bm5lbGFyZWEvYmFzZV9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvZnVubmVsYXJlYS9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvZnVubmVsYXJlYS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Z1bm5lbGFyZWEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9mdW5uZWxhcmVhL2xheW91dF9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvZnVubmVsYXJlYS9sYXlvdXRfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9mdW5uZWxhcmVhL3Bsb3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9mdW5uZWxhcmVhL3N0eWxlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGllL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGllL2xheW91dF9hdHRyaWJ1dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLCtIQUFvRDs7Ozs7Ozs7Ozs7O0FDVnBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGVBQWUsbUJBQU8sQ0FBQyxnRkFBbUI7QUFDMUMsZ0JBQWdCLG1CQUFPLENBQUMsZ0ZBQXdCO0FBQ2hELGtCQUFrQix3R0FBd0M7QUFDMUQseUJBQXlCLDBJQUE2RDtBQUN0Rix3QkFBd0IseUlBQTREOztBQUVwRixpQkFBaUIsb0dBQXNDOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsZ0NBQWdDLCtCQUErQixRQUFRO0FBQ3ZFO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCwyQkFBMkI7QUFDM0I7QUFDQSxLQUFLOztBQUVMLHFDQUFxQyxpQkFBaUI7QUFDdEQ7QUFDQSxLQUFLOztBQUVMLDRCQUE0QjtBQUM1QjtBQUNBLEtBQUs7O0FBRUwsd0NBQXdDO0FBQ3hDO0FBQ0EsS0FBSzs7QUFFTCwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUwseUJBQXlCLGtEQUFrRDs7QUFFM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtB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QTtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ4Mzc0NTk2MGI2Y2E2Y2UwOGQ2NS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL2Z1bm5lbGFyZWEnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHBpZUF0dHJzID0gcmVxdWlyZSgnLi4vcGllL2F0dHJpYnV0ZXMnKTtcbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG52YXIgZG9tYWluQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9kb21haW4nKS5hdHRyaWJ1dGVzO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgdGV4dHRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykudGV4dHRlbXBsYXRlQXR0cnM7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxhYmVsczogcGllQXR0cnMubGFiZWxzLFxuICAgIC8vIGVxdWl2YWxlbnQgb2YgeDAgYW5kIGR4LCBpZiBsYWJlbCBpcyBtaXNzaW5nXG4gICAgbGFiZWwwOiBwaWVBdHRycy5sYWJlbDAsXG4gICAgZGxhYmVsOiBwaWVBdHRycy5kbGFiZWwsXG4gICAgdmFsdWVzOiBwaWVBdHRycy52YWx1ZXMsXG5cbiAgICBtYXJrZXI6IHtcbiAgICAgICAgY29sb3JzOiBwaWVBdHRycy5tYXJrZXIuY29sb3JzLFxuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgICBjb2xvcjogZXh0ZW5kRmxhdCh7fSwgcGllQXR0cnMubWFya2VyLmxpbmUuY29sb3IsIHtcbiAgICAgICAgICAgICAgICBkZmx0OiBudWxsLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgbGluZSBlbmNsb3NpbmcgZWFjaCBzZWN0b3IuJyxcbiAgICAgICAgICAgICAgICAgICAgJ0RlZmF1bHRzIHRvIHRoZSBgcGFwZXJfYmdjb2xvcmAgdmFsdWUuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHdpZHRoOiBleHRlbmRGbGF0KHt9LCBwaWVBdHRycy5tYXJrZXIubGluZS53aWR0aCwge2RmbHQ6IDF9KSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sXG5cbiAgICB0ZXh0OiBwaWVBdHRycy50ZXh0LFxuICAgIGhvdmVydGV4dDogcGllQXR0cnMuaG92ZXJ0ZXh0LFxuXG4gICAgc2NhbGVncm91cDogZXh0ZW5kRmxhdCh7fSwgcGllQXR0cnMuc2NhbGVncm91cCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0lmIHRoZXJlIGFyZSBtdWx0aXBsZSBmdW5uZWxhcmVhcyB0aGF0IHNob3VsZCBiZSBzaXplZCBhY2NvcmRpbmcgdG8nLFxuICAgICAgICAgICAgJ3RoZWlyIHRvdGFscywgbGluayB0aGVtIGJ5IHByb3ZpZGluZyBhIG5vbi1lbXB0eSBncm91cCBpZCBoZXJlJyxcbiAgICAgICAgICAgICdzaGFyZWQgYnkgZXZlcnkgdHJhY2UgaW4gdGhlIHNhbWUgZ3JvdXAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuXG4gICAgdGV4dGluZm86IGV4dGVuZEZsYXQoe30sIHBpZUF0dHJzLnRleHRpbmZvLCB7XG4gICAgICAgIGZsYWdzOiBbJ2xhYmVsJywgJ3RleHQnLCAndmFsdWUnLCAncGVyY2VudCddXG4gICAgfSksXG5cbiAgICB0ZXh0dGVtcGxhdGU6IHRleHR0ZW1wbGF0ZUF0dHJzKHtlZGl0VHlwZTogJ3Bsb3QnfSwge1xuICAgICAgICBrZXlzOiBbJ2xhYmVsJywgJ2NvbG9yJywgJ3ZhbHVlJywgJ3RleHQnLCAncGVyY2VudCddXG4gICAgfSksXG5cbiAgICBob3ZlcmluZm86IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5ob3ZlcmluZm8sIHtcbiAgICAgICAgZmxhZ3M6IFsnbGFiZWwnLCAndGV4dCcsICd2YWx1ZScsICdwZXJjZW50JywgJ25hbWUnXVxuICAgIH0pLFxuXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHt9LCB7XG4gICAgICAgIGtleXM6IFsnbGFiZWwnLCAnY29sb3InLCAndmFsdWUnLCAndGV4dCcsICdwZXJjZW50J11cbiAgICB9KSxcblxuICAgIHRleHRwb3NpdGlvbjogZXh0ZW5kRmxhdCh7fSwgcGllQXR0cnMudGV4dHBvc2l0aW9uLCB7XG4gICAgICAgIHZhbHVlczogWydpbnNpZGUnLCAnbm9uZSddLFxuICAgICAgICBkZmx0OiAnaW5zaWRlJ1xuICAgIH0pLFxuXG4gICAgdGV4dGZvbnQ6IHBpZUF0dHJzLnRleHRmb250LFxuICAgIGluc2lkZXRleHRmb250OiBwaWVBdHRycy5pbnNpZGV0ZXh0Zm9udCxcblxuICAgIHRpdGxlOiB7XG4gICAgICAgIHRleHQ6IHBpZUF0dHJzLnRpdGxlLnRleHQsXG4gICAgICAgIGZvbnQ6IHBpZUF0dHJzLnRpdGxlLmZvbnQsXG4gICAgICAgIHBvc2l0aW9uOiBleHRlbmRGbGF0KHt9LCBwaWVBdHRycy50aXRsZS5wb3NpdGlvbiwge1xuICAgICAgICAgICAgdmFsdWVzOiBbJ3RvcCBsZWZ0JywgJ3RvcCBjZW50ZXInLCAndG9wIHJpZ2h0J10sXG4gICAgICAgICAgICBkZmx0OiAndG9wIGNlbnRlcidcbiAgICAgICAgfSksXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICB9LFxuXG4gICAgZG9tYWluOiBkb21haW5BdHRycyh7bmFtZTogJ2Z1bm5lbGFyZWEnLCB0cmFjZTogdHJ1ZSwgZWRpdFR5cGU6ICdjYWxjJ30pLFxuXG4gICAgYXNwZWN0cmF0aW86IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBkZmx0OiAxLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHJhdGlvIGJldHdlZW4gaGVpZ2h0IGFuZCB3aWR0aCdcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgYmFzZXJhdGlvOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBkZmx0OiAwLjMzMyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSByYXRpbyBiZXR3ZWVuIGJvdHRvbSBsZW5ndGggYW5kIG1heGltdW0gdG9wIGxlbmd0aC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHBsb3RzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvcGxvdHMnKTtcblxuZXhwb3J0cy5uYW1lID0gJ2Z1bm5lbGFyZWEnO1xuXG5leHBvcnRzLnBsb3QgPSBmdW5jdGlvbihnZCwgdHJhY2VzLCB0cmFuc2l0aW9uT3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgIHBsb3RzLnBsb3RCYXNlUGxvdChleHBvcnRzLm5hbWUsIGdkLCB0cmFjZXMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydHMuY2xlYW4gPSBmdW5jdGlvbihuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpIHtcbiAgICBwbG90cy5jbGVhbkJhc2VQbG90KGV4cG9ydHMubmFtZSwgbmV3RnVsbERhdGEsIG5ld0Z1bGxMYXlvdXQsIG9sZEZ1bGxEYXRhLCBvbGRGdWxsTGF5b3V0KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwaWVDYWxjID0gcmVxdWlyZSgnLi4vcGllL2NhbGMnKTtcblxuZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICByZXR1cm4gcGllQ2FsYy5jYWxjKGdkLCB0cmFjZSk7XG59XG5cbmZ1bmN0aW9uIGNyb3NzVHJhY2VDYWxjKGdkKSB7XG4gICAgcGllQ2FsYy5jcm9zc1RyYWNlQ2FsYyhnZCwgeyB0eXBlOiAnZnVubmVsYXJlYScgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNhbGM6IGNhbGMsXG4gICAgY3Jvc3NUcmFjZUNhbGM6IGNyb3NzVHJhY2VDYWxjXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xudmFyIGhhbmRsZURvbWFpbkRlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZG9tYWluJykuZGVmYXVsdHM7XG52YXIgaGFuZGxlVGV4dCA9IHJlcXVpcmUoJy4uL2Jhci9kZWZhdWx0cycpLmhhbmRsZVRleHQ7XG52YXIgaGFuZGxlTGFiZWxzQW5kVmFsdWVzID0gcmVxdWlyZSgnLi4vcGllL2RlZmF1bHRzJykuaGFuZGxlTGFiZWxzQW5kVmFsdWVzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGFiZWxzID0gY29lcmNlKCdsYWJlbHMnKTtcbiAgICB2YXIgdmFsdWVzID0gY29lcmNlKCd2YWx1ZXMnKTtcblxuICAgIHZhciByZXMgPSBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZXMpO1xuICAgIHZhciBsZW4gPSByZXMubGVuO1xuICAgIHRyYWNlT3V0Ll9oYXNMYWJlbHMgPSByZXMuaGFzTGFiZWxzO1xuICAgIHRyYWNlT3V0Ll9oYXNWYWx1ZXMgPSByZXMuaGFzVmFsdWVzO1xuXG4gICAgaWYoIXRyYWNlT3V0Ll9oYXNMYWJlbHMgJiZcbiAgICAgICAgdHJhY2VPdXQuX2hhc1ZhbHVlc1xuICAgICkge1xuICAgICAgICBjb2VyY2UoJ2xhYmVsMCcpO1xuICAgICAgICBjb2VyY2UoJ2RsYWJlbCcpO1xuICAgIH1cblxuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICB2YXIgbGluZVdpZHRoID0gY29lcmNlKCdtYXJrZXIubGluZS53aWR0aCcpO1xuICAgIGlmKGxpbmVXaWR0aCkgY29lcmNlKCdtYXJrZXIubGluZS5jb2xvcicsIGxheW91dC5wYXBlcl9iZ2NvbG9yKTtcblxuICAgIGNvZXJjZSgnbWFya2VyLmNvbG9ycycpO1xuXG4gICAgY29lcmNlKCdzY2FsZWdyb3VwJyk7XG5cbiAgICB2YXIgdGV4dERhdGEgPSBjb2VyY2UoJ3RleHQnKTtcbiAgICB2YXIgdGV4dFRlbXBsYXRlID0gY29lcmNlKCd0ZXh0dGVtcGxhdGUnKTtcbiAgICB2YXIgdGV4dEluZm87XG4gICAgaWYoIXRleHRUZW1wbGF0ZSkgdGV4dEluZm8gPSBjb2VyY2UoJ3RleHRpbmZvJywgQXJyYXkuaXNBcnJheSh0ZXh0RGF0YSkgPyAndGV4dCtwZXJjZW50JyA6ICdwZXJjZW50Jyk7XG5cbiAgICBjb2VyY2UoJ2hvdmVydGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuXG4gICAgaWYodGV4dFRlbXBsYXRlIHx8ICh0ZXh0SW5mbyAmJiB0ZXh0SW5mbyAhPT0gJ25vbmUnKSkge1xuICAgICAgICB2YXIgdGV4dHBvc2l0aW9uID0gY29lcmNlKCd0ZXh0cG9zaXRpb24nKTtcbiAgICAgICAgaGFuZGxlVGV4dCh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHRleHRwb3NpdGlvbiwge1xuICAgICAgICAgICAgbW9kdWxlSGFzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbW9kdWxlSGFzVW5zZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNDb25zdHJhaW46IGZhbHNlLFxuICAgICAgICAgICAgbW9kdWxlSGFzQ2xpcG9uYXhpczogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNUZXh0YW5nbGU6IGZhbHNlLFxuICAgICAgICAgICAgbW9kdWxlSGFzSW5zaWRlYW5jaG9yOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVEb21haW5EZWZhdWx0cyh0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuXG4gICAgdmFyIHRpdGxlID0gY29lcmNlKCd0aXRsZS50ZXh0Jyk7XG4gICAgaWYodGl0bGUpIHtcbiAgICAgICAgY29lcmNlKCd0aXRsZS5wb3NpdGlvbicpO1xuICAgICAgICBMaWIuY29lcmNlRm9udChjb2VyY2UsICd0aXRsZS5mb250JywgbGF5b3V0LmZvbnQpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnYXNwZWN0cmF0aW8nKTtcbiAgICBjb2VyY2UoJ2Jhc2VyYXRpbycpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnZnVubmVsYXJlYScsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4vYmFzZV9wbG90JyksXG4gICAgY2F0ZWdvcmllczogWydwaWUtbGlrZScsICdmdW5uZWxhcmVhJywgJ3Nob3dMZWdlbmQnXSxcblxuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY2FsYyxcbiAgICBjcm9zc1RyYWNlQ2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY3Jvc3NUcmFjZUNhbGMsXG5cbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuICAgIHN0eWxlT25lOiByZXF1aXJlKCcuLi9waWUvc3R5bGVfb25lJyksXG5cbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVmlzdWFsaXplIHN0YWdlcyBpbiBhIHByb2Nlc3MgdXNpbmcgYXJlYS1lbmNvZGVkIHRyYXBlem9pZHMuIFRoaXMgdHJhY2UgY2FuIGJlIHVzZWQnLFxuICAgICAgICAgICAgJ3RvIHNob3cgZGF0YSBpbiBhIHBhcnQtdG8td2hvbGUgcmVwcmVzZW50YXRpb24gc2ltaWxhciB0byBhIFwicGllXCIgdHJhY2UsIHdoZXJlaW4nLFxuICAgICAgICAgICAgJ2VhY2ggaXRlbSBhcHBlYXJzIGluIGEgc2luZ2xlIHN0YWdlLiBTZWUgYWxzbyB0aGUgXCJmdW5uZWxcIiB0cmFjZSB0eXBlIGZvciBhIGRpZmZlcmVudCcsXG4gICAgICAgICAgICAnYXBwcm9hY2ggdG8gdmlzdWFsaXppbmcgZnVubmVsIGRhdGEuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoaWRkZW5sYWJlbHMgPSByZXF1aXJlKCcuLi9waWUvbGF5b3V0X2F0dHJpYnV0ZXMnKS5oaWRkZW5sYWJlbHM7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGhpZGRlbmxhYmVsczogaGlkZGVubGFiZWxzLFxuXG4gICAgZnVubmVsYXJlYWNvbG9yd2F5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcmxpc3QnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGRlZmF1bHQgZnVubmVsYXJlYSBzbGljZSBjb2xvcnMuIERlZmF1bHRzIHRvIHRoZSBtYWluJyxcbiAgICAgICAgICAgICdgY29sb3J3YXlgIHVzZWQgZm9yIHRyYWNlIGNvbG9ycy4gSWYgeW91IHNwZWNpZnkgYSBuZXcnLFxuICAgICAgICAgICAgJ2xpc3QgaGVyZSBpdCBjYW4gc3RpbGwgYmUgZXh0ZW5kZWQgd2l0aCBsaWdodGVyIGFuZCBkYXJrZXInLFxuICAgICAgICAgICAgJ2NvbG9ycywgc2VlIGBleHRlbmRmdW5uZWxhcmVhY29sb3JzYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBleHRlbmRmdW5uZWxhcmVhY29sb3JzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdJZiBgdHJ1ZWAsIHRoZSBmdW5uZWxhcmVhIHNsaWNlIGNvbG9ycyAod2hldGhlciBnaXZlbiBieSBgZnVubmVsYXJlYWNvbG9yd2F5YCBvcicsXG4gICAgICAgICAgICAnaW5oZXJpdGVkIGZyb20gYGNvbG9yd2F5YCkgd2lsbCBiZSBleHRlbmRlZCB0byB0aHJlZSB0aW1lcyBpdHMnLFxuICAgICAgICAgICAgJ29yaWdpbmFsIGxlbmd0aCBieSBmaXJzdCByZXBlYXRpbmcgZXZlcnkgY29sb3IgMjAlIGxpZ2h0ZXIgdGhlbicsXG4gICAgICAgICAgICAnZWFjaCBjb2xvciAyMCUgZGFya2VyLiBUaGlzIGlzIGludGVuZGVkIHRvIHJlZHVjZSB0aGUgbGlrZWxpaG9vZCcsXG4gICAgICAgICAgICAnb2YgcmV1c2luZyB0aGUgc2FtZSBjb2xvciB3aGVuIHlvdSBoYXZlIG1hbnkgc2xpY2VzLCBidXQgeW91IGNhbicsXG4gICAgICAgICAgICAnc2V0IGBmYWxzZWAgdG8gZGlzYWJsZS4nLFxuICAgICAgICAgICAgJ0NvbG9ycyBwcm92aWRlZCBpbiB0aGUgdHJhY2UsIHVzaW5nIGBtYXJrZXIuY29sb3JzYCwgYXJlIG5ldmVyJyxcbiAgICAgICAgICAgICdleHRlbmRlZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgbGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlMYXlvdXREZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UobGF5b3V0SW4sIGxheW91dE91dCwgbGF5b3V0QXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdoaWRkZW5sYWJlbHMnKTtcbiAgICBjb2VyY2UoJ2Z1bm5lbGFyZWFjb2xvcndheScsIGxheW91dE91dC5jb2xvcndheSk7XG4gICAgY29lcmNlKCdleHRlbmRmdW5uZWxhcmVhY29sb3JzJyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHN2Z1RleHRVdGlscyA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zdmdfdGV4dF91dGlscycpO1xuXG52YXIgYmFyUGxvdCA9IHJlcXVpcmUoJy4uL2Jhci9wbG90Jyk7XG52YXIgdG9Nb3ZlSW5zaWRlQmFyID0gYmFyUGxvdC50b01vdmVJbnNpZGVCYXI7XG52YXIgdW5pZm9ybVRleHQgPSByZXF1aXJlKCcuLi9iYXIvdW5pZm9ybV90ZXh0Jyk7XG52YXIgcmVjb3JkTWluVGV4dFNpemUgPSB1bmlmb3JtVGV4dC5yZWNvcmRNaW5UZXh0U2l6ZTtcbnZhciBjbGVhck1pblRleHRTaXplID0gdW5pZm9ybVRleHQuY2xlYXJNaW5UZXh0U2l6ZTtcbnZhciBwaWVIZWxwZXJzID0gcmVxdWlyZSgnLi4vcGllL2hlbHBlcnMnKTtcbnZhciBwaWVQbG90ID0gcmVxdWlyZSgnLi4vcGllL3Bsb3QnKTtcblxudmFyIGF0dGFjaEZ4SGFuZGxlcnMgPSBwaWVQbG90LmF0dGFjaEZ4SGFuZGxlcnM7XG52YXIgZGV0ZXJtaW5lSW5zaWRlVGV4dEZvbnQgPSBwaWVQbG90LmRldGVybWluZUluc2lkZVRleHRGb250O1xuXG52YXIgbGF5b3V0QXJlYXMgPSBwaWVQbG90LmxheW91dEFyZWFzO1xudmFyIHByZXJlbmRlclRpdGxlcyA9IHBpZVBsb3QucHJlcmVuZGVyVGl0bGVzO1xudmFyIHBvc2l0aW9uVGl0bGVPdXRzaWRlID0gcGllUGxvdC5wb3NpdGlvblRpdGxlT3V0c2lkZTtcbnZhciBmb3JtYXRTbGljZUxhYmVsID0gcGllUGxvdC5mb3JtYXRTbGljZUxhYmVsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ2QsIGNkTW9kdWxlKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIGNsZWFyTWluVGV4dFNpemUoJ2Z1bm5lbGFyZWEnLCBmdWxsTGF5b3V0KTtcblxuICAgIHByZXJlbmRlclRpdGxlcyhjZE1vZHVsZSwgZ2QpO1xuICAgIGxheW91dEFyZWFzKGNkTW9kdWxlLCBmdWxsTGF5b3V0Ll9zaXplKTtcblxuICAgIExpYi5tYWtlVHJhY2VHcm91cHMoZnVsbExheW91dC5fZnVubmVsYXJlYWxheWVyLCBjZE1vZHVsZSwgJ3RyYWNlJykuZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICB2YXIgcGxvdEdyb3VwID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgY2QwID0gY2RbMF07XG4gICAgICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcblxuICAgICAgICBzZXRDb29yZHMoY2QpO1xuXG4gICAgICAgIHBsb3RHcm91cC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNsaWNlcyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ2cuc2xpY2UnKS5kYXRhKGNkKTtcblxuICAgICAgICAgICAgc2xpY2VzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnc2xpY2UnLCB0cnVlKTtcbiAgICAgICAgICAgIHNsaWNlcy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIHNsaWNlcy5lYWNoKGZ1bmN0aW9uKHB0LCBpKSB7XG4gICAgICAgICAgICAgICAgaWYocHQuaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3BhdGgsZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdG8gaGF2ZSBjb25zaXN0ZW50IGV2ZW50IGRhdGEgY29tcGFyZWQgdG8gb3RoZXIgdHJhY2VzXG4gICAgICAgICAgICAgICAgcHQucG9pbnROdW1iZXIgPSBwdC5pO1xuICAgICAgICAgICAgICAgIHB0LmN1cnZlTnVtYmVyID0gdHJhY2UuaW5kZXg7XG5cbiAgICAgICAgICAgICAgICB2YXIgY3ggPSBjZDAuY3g7XG4gICAgICAgICAgICAgICAgdmFyIGN5ID0gY2QwLmN5O1xuICAgICAgICAgICAgICAgIHZhciBzbGljZVRvcCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgc2xpY2VQYXRoID0gc2xpY2VUb3Auc2VsZWN0QWxsKCdwYXRoLnN1cmZhY2UnKS5kYXRhKFtwdF0pO1xuXG4gICAgICAgICAgICAgICAgc2xpY2VQYXRoLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3N1cmZhY2UnLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoeydwb2ludGVyLWV2ZW50cyc6ICdhbGwnfSk7XG5cbiAgICAgICAgICAgICAgICBzbGljZVRvcC5jYWxsKGF0dGFjaEZ4SGFuZGxlcnMsIGdkLCBjZCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2hhcGUgPVxuICAgICAgICAgICAgICAgICAgICAnTScgKyAoY3ggKyBwdC5UUlswXSkgKyAnLCcgKyAoY3kgKyBwdC5UUlsxXSkgK1xuICAgICAgICAgICAgICAgICAgICBsaW5lKHB0LlRSLCBwdC5CUikgK1xuICAgICAgICAgICAgICAgICAgICBsaW5lKHB0LkJSLCBwdC5CTCkgK1xuICAgICAgICAgICAgICAgICAgICBsaW5lKHB0LkJMLCBwdC5UTCkgK1xuICAgICAgICAgICAgICAgICAgICAnWic7XG5cbiAgICAgICAgICAgICAgICBzbGljZVBhdGguYXR0cignZCcsIHNoYXBlKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0ZXh0XG4gICAgICAgICAgICAgICAgZm9ybWF0U2xpY2VMYWJlbChnZCwgcHQsIGNkMCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHRQb3NpdGlvbiA9IHBpZUhlbHBlcnMuY2FzdE9wdGlvbih0cmFjZS50ZXh0cG9zaXRpb24sIHB0LnB0cyk7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWNlVGV4dEdyb3VwID0gc2xpY2VUb3Auc2VsZWN0QWxsKCdnLnNsaWNldGV4dCcpXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKHB0LnRleHQgJiYgKHRleHRQb3NpdGlvbiAhPT0gJ25vbmUnKSA/IFswXSA6IFtdKTtcblxuICAgICAgICAgICAgICAgIHNsaWNlVGV4dEdyb3VwLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3NsaWNldGV4dCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNsaWNlVGV4dEdyb3VwLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIHNsaWNlVGV4dEdyb3VwLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGljZVRleHQgPSBMaWIuZW5zdXJlU2luZ2xlKGQzLnNlbGVjdCh0aGlzKSwgJ3RleHQnLCAnJywgZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvaGliaXQgdGV4IGludGVycHJldGF0aW9uIHVudGlsIHdlIGNhbiBoYW5kbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRleCBhbmQgcmVndWxhciB0ZXh0IHRvZ2V0aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBzLmF0dHIoJ2RhdGEtbm90ZXgnLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvbnQgPSBMaWIuZW5zdXJlVW5pZm9ybUZvbnRTaXplKGdkLCBkZXRlcm1pbmVJbnNpZGVUZXh0Rm9udCh0cmFjZSwgcHQsIGZ1bGxMYXlvdXQuZm9udCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNsaWNlVGV4dC50ZXh0KHB0LnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ3NsaWNldGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbWlkZGxlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgZm9udClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBwb3NpdGlvbiB0aGUgdGV4dCByZWxhdGl2ZSB0byB0aGUgc2xpY2VcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRCQiA9IERyYXdpbmcuYkJveChzbGljZVRleHQubm9kZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgeDAsIHgxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeTAgPSBNYXRoLm1pbihwdC5CTFsxXSwgcHQuQlJbMV0pICsgY3k7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5MSA9IE1hdGgubWF4KHB0LlRMWzFdLCBwdC5UUlsxXSkgKyBjeTtcblxuICAgICAgICAgICAgICAgICAgICB4MCA9IE1hdGgubWF4KHB0LlRMWzBdLCBwdC5CTFswXSkgKyBjeDtcbiAgICAgICAgICAgICAgICAgICAgeDEgPSBNYXRoLm1pbihwdC5UUlswXSwgcHQuQlJbMF0pICsgY3g7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gdG9Nb3ZlSW5zaWRlQmFyKHgwLCB4MSwgeTAsIHkxLCB0ZXh0QkIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGU6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3I6ICdtaWRkbGUnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5mb250U2l6ZSA9IGZvbnQuc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkTWluVGV4dFNpemUodHJhY2UudHlwZSwgdHJhbnNmb3JtLCBmdWxsTGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgY2RbaV0udHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXG4gICAgICAgICAgICAgICAgICAgIHNsaWNlVGV4dC5hdHRyKCd0cmFuc2Zvcm0nLCBMaWIuZ2V0VGV4dFRyYW5zZm9ybSh0cmFuc2Zvcm0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHRpdGxlXG4gICAgICAgICAgICB2YXIgdGl0bGVUZXh0R3JvdXAgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCdnLnRpdGxldGV4dCcpXG4gICAgICAgICAgICAgICAgLmRhdGEodHJhY2UudGl0bGUudGV4dCA/IFswXSA6IFtdKTtcblxuICAgICAgICAgICAgdGl0bGVUZXh0R3JvdXAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCd0aXRsZXRleHQnLCB0cnVlKTtcbiAgICAgICAgICAgIHRpdGxlVGV4dEdyb3VwLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgdGl0bGVUZXh0R3JvdXAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGl0bGVUZXh0ID0gTGliLmVuc3VyZVNpbmdsZShkMy5zZWxlY3QodGhpcyksICd0ZXh0JywgJycsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvaGliaXQgdGV4IGludGVycHJldGF0aW9uIGFzIGFib3ZlXG4gICAgICAgICAgICAgICAgICAgIHMuYXR0cignZGF0YS1ub3RleCcsIDEpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHR4dCA9IHRyYWNlLnRpdGxlLnRleHQ7XG4gICAgICAgICAgICAgICAgaWYodHJhY2UuX21ldGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdHh0ID0gTGliLnRlbXBsYXRlU3RyaW5nKHR4dCwgdHJhY2UuX21ldGEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRpdGxlVGV4dC50ZXh0KHR4dClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ3RpdGxldGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQtYW5jaG9yJzogJ21pZGRsZScsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5mb250LCB0cmFjZS50aXRsZS5mb250KVxuICAgICAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcblxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSBwb3NpdGlvblRpdGxlT3V0c2lkZShjZDAsIGZ1bGxMYXlvdXQuX3NpemUpO1xuXG4gICAgICAgICAgICAgICAgdGl0bGVUZXh0LmF0dHIoJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoJyArIHRyYW5zZm9ybS54ICsgJywnICsgdHJhbnNmb3JtLnkgKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAodHJhbnNmb3JtLnNjYWxlIDwgMSA/ICgnc2NhbGUoJyArIHRyYW5zZm9ybS5zY2FsZSArICcpJykgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyB0cmFuc2Zvcm0udHggKyAnLCcgKyB0cmFuc2Zvcm0udHkgKyAnKScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gbGluZShhLCBiKSB7XG4gICAgdmFyIGR4ID0gYlswXSAtIGFbMF07XG4gICAgdmFyIGR5ID0gYlsxXSAtIGFbMV07XG5cbiAgICByZXR1cm4gJ2wnICsgZHggKyAnLCcgKyBkeTtcbn1cblxuZnVuY3Rpb24gZ2V0QmV0d2VlbihhLCBiKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMC41ICogKGFbMF0gKyBiWzBdKSxcbiAgICAgICAgMC41ICogKGFbMV0gKyBiWzFdKVxuICAgIF07XG59XG5cbmZ1bmN0aW9uIHNldENvb3JkcyhjZCkge1xuICAgIGlmKCFjZC5sZW5ndGgpIHJldHVybjtcblxuICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG5cbiAgICB2YXIgYXNwZWN0cmF0aW8gPSB0cmFjZS5hc3BlY3RyYXRpbztcblxuICAgIHZhciBoID0gdHJhY2UuYmFzZXJhdGlvO1xuICAgIGlmKGggPiAwLjk5OSkgaCA9IDAuOTk5OyAvLyBUT0RPOiBtYXkgaGFuZGxlIHRoaXMgY2FzZSBzZXBhcmF0ZWx5XG4gICAgdmFyIGgyID0gTWF0aC5wb3coaCwgMik7XG5cbiAgICB2YXIgdjEgPSBjZDAudlRvdGFsO1xuICAgIHZhciB2MCA9IHYxICogaDIgLyAoMSAtIGgyKTtcblxuICAgIHZhciB0b3RhbFZhbHVlcyA9IHYxO1xuICAgIHZhciBzdW1TdGVwcyA9IHYwIC8gdjE7XG5cbiAgICBmdW5jdGlvbiBjYWxjUG9zKCkge1xuICAgICAgICB2YXIgcSA9IE1hdGguc3FydChzdW1TdGVwcyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBxLFxuICAgICAgICAgICAgeTogLXFcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQb2ludCgpIHtcbiAgICAgICAgdmFyIHBvcyA9IGNhbGNQb3MoKTtcbiAgICAgICAgcmV0dXJuIFtwb3MueCwgcG9zLnldO1xuICAgIH1cblxuICAgIHZhciBwO1xuICAgIHZhciBhbGxQb2ludHMgPSBbXTtcbiAgICBhbGxQb2ludHMucHVzaChnZXRQb2ludCgpKTtcblxuICAgIHZhciBpLCBjZGk7XG4gICAgZm9yKGkgPSBjZC5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuICAgICAgICBjZGkgPSBjZFtpXTtcbiAgICAgICAgaWYoY2RpLmhpZGRlbikgY29udGludWU7XG5cbiAgICAgICAgdmFyIHN0ZXAgPSBjZGkudiAvIHRvdGFsVmFsdWVzO1xuICAgICAgICBzdW1TdGVwcyArPSBzdGVwO1xuXG4gICAgICAgIGFsbFBvaW50cy5wdXNoKGdldFBvaW50KCkpO1xuICAgIH1cblxuICAgIHZhciBtaW5ZID0gSW5maW5pdHk7XG4gICAgdmFyIG1heFkgPSAtSW5maW5pdHk7XG4gICAgZm9yKGkgPSAwOyBpIDwgYWxsUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHAgPSBhbGxQb2ludHNbaV07XG4gICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCBwWzFdKTtcbiAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIHBbMV0pO1xuICAgIH1cblxuICAgIC8vIGNlbnRlciB0aGUgc2hhcGVcbiAgICBmb3IoaSA9IDA7IGkgPCBhbGxQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYWxsUG9pbnRzW2ldWzFdIC09IChtYXhZICsgbWluWSkgLyAyO1xuICAgIH1cblxuICAgIHZhciBsYXN0WCA9IGFsbFBvaW50c1thbGxQb2ludHMubGVuZ3RoIC0gMV1bMF07XG5cbiAgICAvLyBnZXQgcGllIHJcbiAgICB2YXIgciA9IGNkMC5yO1xuXG4gICAgdmFyIHJZID0gKG1heFkgLSBtaW5ZKSAvIDI7XG4gICAgdmFyIHNjYWxlWCA9IHIgLyBsYXN0WDtcbiAgICB2YXIgc2NhbGVZID0gciAvIHJZICogYXNwZWN0cmF0aW87XG5cbiAgICAvLyBzZXQgZnVubmVsYXJlYSByXG4gICAgY2QwLnIgPSBzY2FsZVkgKiByWTtcblxuICAgIC8vIHNjYWxlIHRoZSBzaGFwZVxuICAgIGZvcihpID0gMDsgaSA8IGFsbFBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBhbGxQb2ludHNbaV1bMF0gKj0gc2NhbGVYO1xuICAgICAgICBhbGxQb2ludHNbaV1bMV0gKj0gc2NhbGVZO1xuICAgIH1cblxuICAgIC8vIHJlY29yZCBmaXJzdCBwb3NpdGlvblxuICAgIHAgPSBhbGxQb2ludHNbMF07XG4gICAgdmFyIHByZXZMZWZ0ID0gWy1wWzBdLCBwWzFdXTtcbiAgICB2YXIgcHJldlJpZ2h0ID0gW3BbMF0sIHBbMV1dO1xuXG4gICAgdmFyIG4gPSAwOyAvLyBub3RlIHdlIHNraXAgdGhlIHZlcnkgZmlyc3QgcG9pbnQuXG4gICAgZm9yKGkgPSBjZC5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuICAgICAgICBjZGkgPSBjZFtpXTtcbiAgICAgICAgaWYoY2RpLmhpZGRlbikgY29udGludWU7XG5cbiAgICAgICAgbiArPSAxO1xuICAgICAgICB2YXIgeCA9IGFsbFBvaW50c1tuXVswXTtcbiAgICAgICAgdmFyIHkgPSBhbGxQb2ludHNbbl1bMV07XG5cbiAgICAgICAgY2RpLlRMID0gWy14LCB5XTtcbiAgICAgICAgY2RpLlRSID0gW3gsIHldO1xuXG4gICAgICAgIGNkaS5CTCA9IHByZXZMZWZ0O1xuICAgICAgICBjZGkuQlIgPSBwcmV2UmlnaHQ7XG5cbiAgICAgICAgY2RpLnB4bWlkID0gZ2V0QmV0d2VlbihjZGkuVFIsIGNkaS5CUik7XG5cbiAgICAgICAgcHJldkxlZnQgPSBjZGkuVEw7XG4gICAgICAgIHByZXZSaWdodCA9IGNkaS5UUjtcbiAgICB9XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbnZhciBzdHlsZU9uZSA9IHJlcXVpcmUoJy4uL3BpZS9zdHlsZV9vbmUnKTtcbnZhciByZXNpemVUZXh0ID0gcmVxdWlyZSgnLi4vYmFyL3VuaWZvcm1fdGV4dCcpLnJlc2l6ZVRleHQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3R5bGUoZ2QpIHtcbiAgICB2YXIgcyA9IGdkLl9mdWxsTGF5b3V0Ll9mdW5uZWxhcmVhbGF5ZXIuc2VsZWN0QWxsKCcudHJhY2UnKTtcbiAgICByZXNpemVUZXh0KGdkLCBzLCAnZnVubmVsYXJlYScpO1xuXG4gICAgcy5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuICAgICAgICB2YXIgdHJhY2VTZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgdHJhY2VTZWxlY3Rpb24uc3R5bGUoe29wYWNpdHk6IHRyYWNlLm9wYWNpdHl9KTtcblxuICAgICAgICB0cmFjZVNlbGVjdGlvbi5zZWxlY3RBbGwoJ3BhdGguc3VyZmFjZScpLmVhY2goZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKHN0eWxlT25lLCBwdCwgdHJhY2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2RvbWFpbicpLmRlZmF1bHRzO1xudmFyIGhhbmRsZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvZGVmYXVsdHMnKS5oYW5kbGVUZXh0O1xuXG5mdW5jdGlvbiBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZXMpIHtcbiAgICB2YXIgaGFzTGFiZWxzID0gQXJyYXkuaXNBcnJheShsYWJlbHMpO1xuICAgIHZhciBoYXNWYWx1ZXMgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh2YWx1ZXMpO1xuICAgIHZhciBsZW4gPSBNYXRoLm1pbihcbiAgICAgICAgaGFzTGFiZWxzID8gbGFiZWxzLmxlbmd0aCA6IEluZmluaXR5LFxuICAgICAgICBoYXNWYWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogSW5maW5pdHlcbiAgICApO1xuXG4gICAgaWYoIWlzRmluaXRlKGxlbikpIGxlbiA9IDA7XG5cbiAgICBpZihsZW4gJiYgaGFzVmFsdWVzKSB7XG4gICAgICAgIHZhciBoYXNQb3NpdGl2ZTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHZhbHVlc1tpXTtcbiAgICAgICAgICAgIGlmKGlzTnVtZXJpYyh2KSAmJiB2ID4gMCkge1xuICAgICAgICAgICAgICAgIGhhc1Bvc2l0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighaGFzUG9zaXRpdmUpIGxlbiA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGFzTGFiZWxzOiBoYXNMYWJlbHMsXG4gICAgICAgIGhhc1ZhbHVlczogaGFzVmFsdWVzLFxuICAgICAgICBsZW46IGxlblxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGFiZWxzID0gY29lcmNlKCdsYWJlbHMnKTtcbiAgICB2YXIgdmFsdWVzID0gY29lcmNlKCd2YWx1ZXMnKTtcblxuICAgIHZhciByZXMgPSBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZXMpO1xuICAgIHZhciBsZW4gPSByZXMubGVuO1xuICAgIHRyYWNlT3V0Ll9oYXNMYWJlbHMgPSByZXMuaGFzTGFiZWxzO1xuICAgIHRyYWNlT3V0Ll9oYXNWYWx1ZXMgPSByZXMuaGFzVmFsdWVzO1xuXG4gICAgaWYoIXRyYWNlT3V0Ll9oYXNMYWJlbHMgJiZcbiAgICAgICAgdHJhY2VPdXQuX2hhc1ZhbHVlc1xuICAgICkge1xuICAgICAgICBjb2VyY2UoJ2xhYmVsMCcpO1xuICAgICAgICBjb2VyY2UoJ2RsYWJlbCcpO1xuICAgIH1cblxuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICB2YXIgbGluZVdpZHRoID0gY29lcmNlKCdtYXJrZXIubGluZS53aWR0aCcpO1xuICAgIGlmKGxpbmVXaWR0aCkgY29lcmNlKCdtYXJrZXIubGluZS5jb2xvcicpO1xuXG4gICAgY29lcmNlKCdtYXJrZXIuY29sb3JzJyk7XG5cbiAgICBjb2VyY2UoJ3NjYWxlZ3JvdXAnKTtcbiAgICAvLyBUT0RPOiBob2xlIG5lZWRzIHRvIGJlIGNvZXJjZWQgdG8gdGhlIHNhbWUgdmFsdWUgd2l0aGluIGEgc2NhbGVlZ3JvdXBcblxuICAgIHZhciB0ZXh0RGF0YSA9IGNvZXJjZSgndGV4dCcpO1xuICAgIHZhciB0ZXh0VGVtcGxhdGUgPSBjb2VyY2UoJ3RleHR0ZW1wbGF0ZScpO1xuICAgIHZhciB0ZXh0SW5mbztcbiAgICBpZighdGV4dFRlbXBsYXRlKSB0ZXh0SW5mbyA9IGNvZXJjZSgndGV4dGluZm8nLCBBcnJheS5pc0FycmF5KHRleHREYXRhKSA/ICd0ZXh0K3BlcmNlbnQnIDogJ3BlcmNlbnQnKTtcblxuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICBpZih0ZXh0VGVtcGxhdGUgfHwgKHRleHRJbmZvICYmIHRleHRJbmZvICE9PSAnbm9uZScpKSB7XG4gICAgICAgIHZhciB0ZXh0cG9zaXRpb24gPSBjb2VyY2UoJ3RleHRwb3NpdGlvbicpO1xuICAgICAgICBoYW5kbGVUZXh0KHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgdGV4dHBvc2l0aW9uLCB7XG4gICAgICAgICAgICBtb2R1bGVIYXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNVbnNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZHVsZUhhc0NvbnN0cmFpbjogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNDbGlwb25heGlzOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZHVsZUhhc1RleHRhbmdsZTogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNJbnNpZGVhbmNob3I6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBoYXNCb3RoID0gQXJyYXkuaXNBcnJheSh0ZXh0cG9zaXRpb24pIHx8IHRleHRwb3NpdGlvbiA9PT0gJ2F1dG8nO1xuICAgICAgICB2YXIgaGFzT3V0c2lkZSA9IGhhc0JvdGggfHwgdGV4dHBvc2l0aW9uID09PSAnb3V0c2lkZSc7XG4gICAgICAgIGlmKGhhc091dHNpZGUpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnYXV0b21hcmdpbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGV4dHBvc2l0aW9uID09PSAnaW5zaWRlJyB8fCB0ZXh0cG9zaXRpb24gPT09ICdhdXRvJyB8fCBBcnJheS5pc0FycmF5KHRleHRwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnaW5zaWRldGV4dG9yaWVudGF0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEb21haW5EZWZhdWx0cyh0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuXG4gICAgdmFyIGhvbGUgPSBjb2VyY2UoJ2hvbGUnKTtcbiAgICB2YXIgdGl0bGUgPSBjb2VyY2UoJ3RpdGxlLnRleHQnKTtcbiAgICBpZih0aXRsZSkge1xuICAgICAgICB2YXIgdGl0bGVQb3NpdGlvbiA9IGNvZXJjZSgndGl0bGUucG9zaXRpb24nLCBob2xlID8gJ21pZGRsZSBjZW50ZXInIDogJ3RvcCBjZW50ZXInKTtcbiAgICAgICAgaWYoIWhvbGUgJiYgdGl0bGVQb3NpdGlvbiA9PT0gJ21pZGRsZSBjZW50ZXInKSB0cmFjZU91dC50aXRsZS5wb3NpdGlvbiA9ICd0b3AgY2VudGVyJztcbiAgICAgICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAndGl0bGUuZm9udCcsIGxheW91dC5mb250KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3NvcnQnKTtcbiAgICBjb2VyY2UoJ2RpcmVjdGlvbicpO1xuICAgIGNvZXJjZSgncm90YXRpb24nKTtcbiAgICBjb2VyY2UoJ3B1bGwnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaGFuZGxlTGFiZWxzQW5kVmFsdWVzOiBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMsXG4gICAgc3VwcGx5RGVmYXVsdHM6IHN1cHBseURlZmF1bHRzXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBoaWRkZW5sYWJlbHM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnaGlkZGVubGFiZWxzIGlzIHRoZSBmdW5uZWxhcmVhICYgcGllIGNoYXJ0IGFuYWxvZyBvZicsXG4gICAgICAgICAgICAndmlzaWJsZTpcXCdsZWdlbmRvbmx5XFwnJyxcbiAgICAgICAgICAgICdidXQgaXQgY2FuIGNvbnRhaW4gbWFueSBsYWJlbHMsIGFuZCBjYW4gc2ltdWx0YW5lb3VzbHknLFxuICAgICAgICAgICAgJ2hpZGUgc2xpY2VzIGZyb20gc2V2ZXJhbCBwaWVzL2Z1bm5lbGFyZWEgY2hhcnRzJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgcGllY29sb3J3YXk6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9ybGlzdCcsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgZGVmYXVsdCBwaWUgc2xpY2UgY29sb3JzLiBEZWZhdWx0cyB0byB0aGUgbWFpbicsXG4gICAgICAgICAgICAnYGNvbG9yd2F5YCB1c2VkIGZvciB0cmFjZSBjb2xvcnMuIElmIHlvdSBzcGVjaWZ5IGEgbmV3JyxcbiAgICAgICAgICAgICdsaXN0IGhlcmUgaXQgY2FuIHN0aWxsIGJlIGV4dGVuZGVkIHdpdGggbGlnaHRlciBhbmQgZGFya2VyJyxcbiAgICAgICAgICAgICdjb2xvcnMsIHNlZSBgZXh0ZW5kcGllY29sb3JzYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBleHRlbmRwaWVjb2xvcnM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZmx0OiB0cnVlLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0lmIGB0cnVlYCwgdGhlIHBpZSBzbGljZSBjb2xvcnMgKHdoZXRoZXIgZ2l2ZW4gYnkgYHBpZWNvbG9yd2F5YCBvcicsXG4gICAgICAgICAgICAnaW5oZXJpdGVkIGZyb20gYGNvbG9yd2F5YCkgd2lsbCBiZSBleHRlbmRlZCB0byB0aHJlZSB0aW1lcyBpdHMnLFxuICAgICAgICAgICAgJ29yaWdpbmFsIGxlbmd0aCBieSBmaXJzdCByZXBlYXRpbmcgZXZlcnkgY29sb3IgMjAlIGxpZ2h0ZXIgdGhlbicsXG4gICAgICAgICAgICAnZWFjaCBjb2xvciAyMCUgZGFya2VyLiBUaGlzIGlzIGludGVuZGVkIHRvIHJlZHVjZSB0aGUgbGlrZWxpaG9vZCcsXG4gICAgICAgICAgICAnb2YgcmV1c2luZyB0aGUgc2FtZSBjb2xvciB3aGVuIHlvdSBoYXZlIG1hbnkgc2xpY2VzLCBidXQgeW91IGNhbicsXG4gICAgICAgICAgICAnc2V0IGBmYWxzZWAgdG8gZGlzYWJsZS4nLFxuICAgICAgICAgICAgJ0NvbG9ycyBwcm92aWRlZCBpbiB0aGUgdHJhY2UsIHVzaW5nIGBtYXJrZXIuY29sb3JzYCwgYXJlIG5ldmVyJyxcbiAgICAgICAgICAgICdleHRlbmRlZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=