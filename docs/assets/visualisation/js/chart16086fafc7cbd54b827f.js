(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_index-cartesian_js-node_modules_plotly_js_src_plots_subplo-c00539"],{

/***/ "./node_modules/plotly.js/lib/bar.js":
/*!*******************************************!*\
  !*** ./node_modules/plotly.js/lib/bar.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/bar */ "./node_modules/plotly.js/src/traces/bar/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/box.js":
/*!*******************************************!*\
  !*** ./node_modules/plotly.js/lib/box.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/box */ "./node_modules/plotly.js/src/traces/box/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/contour.js":
/*!***********************************************!*\
  !*** ./node_modules/plotly.js/lib/contour.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/contour */ "./node_modules/plotly.js/src/traces/contour/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/heatmap.js":
/*!***********************************************!*\
  !*** ./node_modules/plotly.js/lib/heatmap.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/heatmap */ "./node_modules/plotly.js/src/traces/heatmap/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/histogram2d.js":
/*!***************************************************!*\
  !*** ./node_modules/plotly.js/lib/histogram2d.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/histogram2d */ "./node_modules/plotly.js/src/traces/histogram2d/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/index-cartesian.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/lib/index-cartesian.js ***!
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



var Plotly = __webpack_require__(/*! ./core */ "./node_modules/plotly.js/lib/core.js");

Plotly.register([
    __webpack_require__(/*! ./bar */ "./node_modules/plotly.js/lib/bar.js"),
    __webpack_require__(/*! ./box */ "./node_modules/plotly.js/lib/box.js"),
    __webpack_require__(/*! ./heatmap */ "./node_modules/plotly.js/lib/heatmap.js"),
    __webpack_require__(/*! ./histogram */ "./node_modules/plotly.js/lib/histogram.js"),
    __webpack_require__(/*! ./histogram2d */ "./node_modules/plotly.js/lib/histogram2d.js"),
    __webpack_require__(/*! ./histogram2dcontour */ "./node_modules/plotly.js/lib/histogram2dcontour.js"),
    __webpack_require__(/*! ./image */ "./node_modules/plotly.js/lib/image.js"),
    __webpack_require__(/*! ./pie */ "./node_modules/plotly.js/lib/pie.js"),
    __webpack_require__(/*! ./contour */ "./node_modules/plotly.js/lib/contour.js"),
    __webpack_require__(/*! ./scatterternary */ "./node_modules/plotly.js/lib/scatterternary.js"),
    __webpack_require__(/*! ./violin */ "./node_modules/plotly.js/lib/violin.js")
]);

module.exports = Plotly;


/***/ }),

/***/ "./node_modules/plotly.js/lib/pie.js":
/*!*******************************************!*\
  !*** ./node_modules/plotly.js/lib/pie.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/pie */ "./node_modules/plotly.js/src/traces/pie/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/subplot_defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/subplot_defaults.js ***!
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




var Lib = __webpack_require__(/*! ../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Template = __webpack_require__(/*! ../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");
var handleDomainDefaults = __webpack_require__(/*! ./domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;


/**
 * Find and supply defaults to all subplots of a given type
 * This handles subplots that are contained within one container - so
 * gl3d, geo, ternary... but not 2d axes which have separate x and y axes
 * finds subplots, coerces their `domain` attributes, then calls the
 * given handleDefaults function to fill in everything else.
 *
 * layoutIn: the complete user-supplied input layout
 * layoutOut: the complete finished layout
 * fullData: the finished data array, used only to find subplots
 * opts: {
 *  type: subplot type string
 *  attributes: subplot attributes object
 *  partition: 'x' or 'y', which direction to divide domain space by default
 *      (default 'x', ie side-by-side subplots)
 *      TODO: this option is only here because 3D and geo made opposite
 *      choices in this regard previously and I didn't want to change it.
 *      Instead we should do:
 *      - something consistent
 *      - something more square (4 cuts 2x2, 5/6 cuts 2x3, etc.)
 *      - something that includes all subplot types in one arrangement,
 *        now that we can have them together!
 *  handleDefaults: function of (subplotLayoutIn, subplotLayoutOut, coerce, opts)
 *      this opts object is passed through to handleDefaults, so attach any
 *      additional items needed by this function here as well
 * }
 */
module.exports = function handleSubplotDefaults(layoutIn, layoutOut, fullData, opts) {
    var subplotType = opts.type;
    var subplotAttributes = opts.attributes;
    var handleDefaults = opts.handleDefaults;
    var partition = opts.partition || 'x';

    var ids = layoutOut._subplots[subplotType];
    var idsLength = ids.length;

    var baseId = idsLength && ids[0].replace(/\d+$/, '');

    var subplotLayoutIn, subplotLayoutOut;

    function coerce(attr, dflt) {
        return Lib.coerce(subplotLayoutIn, subplotLayoutOut, subplotAttributes, attr, dflt);
    }

    for(var i = 0; i < idsLength; i++) {
        var id = ids[i];

        // ternary traces get a layout ternary for free!
        if(layoutIn[id]) subplotLayoutIn = layoutIn[id];
        else subplotLayoutIn = layoutIn[id] = {};

        subplotLayoutOut = Template.newContainer(layoutOut, id, baseId);

        // All subplot containers get a `uirevision` inheriting from the base.
        // Currently all subplots containers have some user interaction
        // attributes, but if we ever add one that doesn't, we would need an
        // option to skip this step.
        coerce('uirevision', layoutOut.uirevision);

        var dfltDomains = {};
        dfltDomains[partition] = [i / idsLength, (i + 1) / idsLength];
        handleDomainDefaults(subplotLayoutOut, layoutOut, coerce, dfltDomains);

        opts.id = id;
        handleDefaults(subplotLayoutIn, subplotLayoutOut, coerce, opts);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/calc.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/calc.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");
var arraysToCalcdata = __webpack_require__(/*! ./arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");

module.exports = function calc(gd, trace) {
    var xa = Axes.getFromId(gd, trace.xaxis || 'x');
    var ya = Axes.getFromId(gd, trace.yaxis || 'y');
    var size, pos;

    var sizeOpts = {
        msUTC: !!(trace.base || trace.base === 0)
    };

    if(trace.orientation === 'h') {
        size = xa.makeCalcdata(trace, 'x', sizeOpts);
        pos = ya.makeCalcdata(trace, 'y');
    } else {
        size = ya.makeCalcdata(trace, 'y', sizeOpts);
        pos = xa.makeCalcdata(trace, 'x');
    }

    // create the "calculated data" to plot
    var serieslen = Math.min(pos.length, size.length);
    var cd = new Array(serieslen);

    // set position and size
    for(var i = 0; i < serieslen; i++) {
        cd[i] = { p: pos[i], s: size[i] };

        if(trace.ids) {
            cd[i].id = String(trace.ids[i]);
        }
    }

    // auto-z and autocolorscale if applicable
    if(hasColorscale(trace, 'marker')) {
        colorscaleCalc(gd, trace, {
            vals: trace.marker.color,
            containerStr: 'marker',
            cLetter: 'c'
        });
    }
    if(hasColorscale(trace, 'marker.line')) {
        colorscaleCalc(gd, trace, {
            vals: trace.marker.line.color,
            containerStr: 'marker.line',
            cLetter: 'c'
        });
    }

    arraysToCalcdata(cd, trace);
    calcSelection(cd, trace);

    return cd;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/event_data.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/event_data.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function eventData(out, pt, trace) {
    // standard cartesian event data
    out.x = 'xVal' in pt ? pt.xVal : pt.x;
    out.y = 'yVal' in pt ? pt.yVal : pt.y;
    if(pt.xa) out.xaxis = pt.xa;
    if(pt.ya) out.yaxis = pt.ya;

    if(trace.orientation === 'h') {
        out.label = out.y;
        out.value = out.x;
    } else {
        out.label = out.x;
        out.value = out.y;
    }

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/index.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/bar/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").supplyDefaults,
    crossTraceDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").crossTraceDefaults,
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/bar/layout_defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/bar/calc.js"),
    crossTraceCalc: __webpack_require__(/*! ./cross_trace_calc */ "./node_modules/plotly.js/src/traces/bar/cross_trace_calc.js").crossTraceCalc,
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    arraysToCalcdata: __webpack_require__(/*! ./arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/bar/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/bar/style.js").style,
    styleOnSelect: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/bar/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/bar/hover.js").hoverPoints,
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/bar/event_data.js"),
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/bar/select.js"),

    moduleType: 'trace',
    name: 'bar',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['bar-like', 'cartesian', 'svg', 'bar', 'oriented', 'errorBarsOK', 'showLegend', 'zoomScale'],
    animatable: true,
    meta: {
        description: [
            'The data visualized by the span of the bars is set in `y`',
            'if `orientation` is set th *v* (the default)',
            'and the labels are set in `x`.',
            'By setting `orientation` to *h*, the roles are interchanged.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/event_data.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/event_data.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function eventData(out, pt) {
    // Note: hoverOnBox property is needed for click-to-select
    // to ignore when a box was clicked. This is the reason box
    // implements this custom eventData function.
    if(pt.hoverOnBox) out.hoverOnBox = pt.hoverOnBox;

    if('xVal' in pt) out.x = pt.xVal;
    if('yVal' in pt) out.y = pt.yVal;
    if(pt.xa) out.xaxis = pt.xa;
    if(pt.ya) out.yaxis = pt.ya;

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/index.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/box/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/box/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/box/defaults.js").supplyDefaults,
    crossTraceDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/box/defaults.js").crossTraceDefaults,
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/box/layout_defaults.js").supplyLayoutDefaults,
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/box/calc.js"),
    crossTraceCalc: __webpack_require__(/*! ./cross_trace_calc */ "./node_modules/plotly.js/src/traces/box/cross_trace_calc.js").crossTraceCalc,
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/box/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/box/style.js").style,
    styleOnSelect: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/box/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/box/hover.js").hoverPoints,
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/box/event_data.js"),
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/box/select.js"),

    moduleType: 'trace',
    name: 'box',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', 'symbols', 'oriented', 'box-violin', 'showLegend', 'boxLayout', 'zoomScale'],
    meta: {
        description: [
            'Each box spans from quartile 1 (Q1) to quartile 3 (Q3).',
            'The second quartile (Q2, i.e. the median) is marked by a line inside the box.',
            'The fences grow outward from the boxes\' edges,',
            'by default they span +/- 1.5 times the interquartile range (IQR: Q3-Q1),',
            'The sample mean and standard deviation as well as notches and',
            'the sample, outlier and suspected outliers points can be optionally',
            'added to the box plot.',

            'The values and positions corresponding to each boxes can be input',
            'using two signatures.',

            'The first signature expects users to supply the sample values in the `y`',
            'data array for vertical boxes (`x` for horizontal boxes).',
            'By supplying an `x` (`y`) array, one box per distinct `x` (`y`) value is drawn',
            'If no `x` (`y`) {array} is provided, a single box is drawn.',
            'In this case, the box is positioned with the trace `name` or with `x0` (`y0`) if provided.',

            'The second signature expects users to supply the boxes corresponding Q1, median and Q3',
            'statistics in the `q1`, `median` and `q3` data arrays respectively.',
            'Other box features relying on statistics namely `lowerfence`, `upperfence`, `notchspan`',
            'can be set directly by the users.',
            'To have plotly compute them or to show sample points besides the boxes,',
            'users can set the `y` data array for vertical boxes (`x` for horizontal boxes)',
            'to a 2D array with the outer length corresponding',
            'to the number of boxes in the traces and the inner length corresponding the sample size.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/style.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/style.js ***!
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

function style(gd, cd, sel) {
    var s = sel ? sel : d3.select(gd).selectAll('g.trace.boxes');

    s.style('opacity', function(d) { return d[0].trace.opacity; });

    s.each(function(d) {
        var el = d3.select(this);
        var trace = d[0].trace;
        var lineWidth = trace.line.width;

        function styleBox(boxSel, lineWidth, lineColor, fillColor) {
            boxSel.style('stroke-width', lineWidth + 'px')
                .call(Color.stroke, lineColor)
                .call(Color.fill, fillColor);
        }

        var allBoxes = el.selectAll('path.box');

        if(trace.type === 'candlestick') {
            allBoxes.each(function(boxData) {
                if(boxData.empty) return;

                var thisBox = d3.select(this);
                var container = trace[boxData.dir]; // dir = 'increasing' or 'decreasing'
                styleBox(thisBox, container.line.width, container.line.color, container.fillcolor);
                // TODO: custom selection style for candlesticks
                thisBox.style('opacity', trace.selectedpoints && !boxData.selected ? 0.3 : 1);
            });
        } else {
            styleBox(allBoxes, lineWidth, trace.line.color, trace.fillcolor);
            el.selectAll('path.mean')
                .style({
                    'stroke-width': lineWidth,
                    'stroke-dasharray': (2 * lineWidth) + 'px,' + lineWidth + 'px'
                })
                .call(Color.stroke, trace.line.color);

            var pts = el.selectAll('path.point');
            Drawing.pointStyle(pts, trace, gd);
        }
    });
}

function styleOnSelect(gd, cd, sel) {
    var trace = cd[0].trace;
    var pts = sel.selectAll('path.point');

    if(trace.selectedpoints) {
        Drawing.selectedPointStyle(pts, trace);
    } else {
        Drawing.pointStyle(pts, trace, gd);
    }
}

module.exports = {
    style: style,
    styleOnSelect: styleOnSelect
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/constraint_defaults.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/constraint_defaults.js ***!
  \**************************************************************************/
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

var handleLabelDefaults = __webpack_require__(/*! ./label_defaults */ "./node_modules/plotly.js/src/traces/contour/label_defaults.js");

var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var addOpacity = Color.addOpacity;
var opacity = Color.opacity;

var filterOps = __webpack_require__(/*! ../../constants/filter_ops */ "./node_modules/plotly.js/src/constants/filter_ops.js");
var CONSTRAINT_REDUCTION = filterOps.CONSTRAINT_REDUCTION;
var COMPARISON_OPS2 = filterOps.COMPARISON_OPS2;

module.exports = function handleConstraintDefaults(traceIn, traceOut, coerce, layout, defaultColor, opts) {
    var contours = traceOut.contours;
    var showLines, lineColor, fillColor;

    var operation = coerce('contours.operation');
    contours._operation = CONSTRAINT_REDUCTION[operation];

    handleConstraintValueDefaults(coerce, contours);

    if(operation === '=') {
        showLines = contours.showlines = true;
    } else {
        showLines = coerce('contours.showlines');
        fillColor = coerce('fillcolor', addOpacity(
            (traceIn.line || {}).color || defaultColor, 0.5
        ));
    }

    if(showLines) {
        var lineDfltColor = fillColor && opacity(fillColor) ?
            addOpacity(traceOut.fillcolor, 1) :
            defaultColor;
        lineColor = coerce('line.color', lineDfltColor);
        coerce('line.width', 2);
        coerce('line.dash');
    }

    coerce('line.smoothing');

    handleLabelDefaults(coerce, layout, lineColor, opts);
};

function handleConstraintValueDefaults(coerce, contours) {
    var zvalue;

    if(COMPARISON_OPS2.indexOf(contours.operation) === -1) {
        // Requires an array of two numbers:
        coerce('contours.value', [0, 1]);

        if(!Array.isArray(contours.value)) {
            if(isNumeric(contours.value)) {
                zvalue = parseFloat(contours.value);
                contours.value = [zvalue, zvalue + 1];
            }
        } else if(contours.value.length > 2) {
            contours.value = contours.value.slice(2);
        } else if(contours.length === 0) {
            contours.value = [0, 1];
        } else if(contours.length < 2) {
            zvalue = parseFloat(contours.value[0]);
            contours.value = [zvalue, zvalue + 1];
        } else {
            contours.value = [
                parseFloat(contours.value[0]),
                parseFloat(contours.value[1])
            ];
        }
    } else {
        // Requires a single scalar:
        coerce('contours.value', 0);

        if(!isNumeric(contours.value)) {
            if(Array.isArray(contours.value)) {
                contours.value = parseFloat(contours.value[0]);
            } else {
                contours.value = 0;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var handleXYZDefaults = __webpack_require__(/*! ../heatmap/xyz_defaults */ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js");
var handleConstraintDefaults = __webpack_require__(/*! ./constraint_defaults */ "./node_modules/plotly.js/src/traces/contour/constraint_defaults.js");
var handleContoursDefaults = __webpack_require__(/*! ./contours_defaults */ "./node_modules/plotly.js/src/traces/contour/contours_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ./style_defaults */ "./node_modules/plotly.js/src/traces/contour/style_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/contour/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    function coerce2(attr) {
        return Lib.coerce2(traceIn, traceOut, attributes, attr);
    }

    var len = handleXYZDefaults(traceIn, traceOut, coerce, layout);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');
    coerce('hoverongaps');

    var isConstraint = (coerce('contours.type') === 'constraint');
    coerce('connectgaps', Lib.isArray1D(traceOut.z));

    if(isConstraint) {
        handleConstraintDefaults(traceIn, traceOut, coerce, layout, defaultColor);
    } else {
        handleContoursDefaults(traceIn, traceOut, coerce, coerce2);
        handleStyleDefaults(traceIn, traceOut, coerce, layout);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/index.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/index.js ***!
  \************************************************************/
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/contour/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/contour/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/contour/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/contour/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/contour/style.js"),
    colorbar: __webpack_require__(/*! ./colorbar */ "./node_modules/plotly.js/src/traces/contour/colorbar.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/contour/hover.js"),

    moduleType: 'trace',
    name: 'contour',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', '2dMap', 'contour', 'showLegend'],
    meta: {
        description: [
            'The data from which contour lines are computed is set in `z`.',
            'Data in `z` must be a {2D array} of numbers.',

            'Say that `z` has N rows and M columns, then by default,',
            'these N rows correspond to N y coordinates',
            '(set in `y` or auto-generated) and the M columns',
            'correspond to M x coordinates (set in `x` or auto-generated).',
            'By setting `transpose` to *true*, the above behavior is flipped.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/colorbar.js ***!
  \***************************************************************/
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
    min: 'zmin',
    max: 'zmax'
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var handleXYZDefaults = __webpack_require__(/*! ./xyz_defaults */ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ./style_defaults */ "./node_modules/plotly.js/src/traces/heatmap/style_defaults.js");
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/heatmap/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var validData = handleXYZDefaults(traceIn, traceOut, coerce, layout);
    if(!validData) {
        traceOut.visible = false;
        return;
    }

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    handleStyleDefaults(traceIn, traceOut, coerce, layout);

    coerce('hoverongaps');
    coerce('connectgaps', Lib.isArray1D(traceOut.z) && (traceOut.zsmooth !== false));

    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'z'});
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/index.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/index.js ***!
  \************************************************************/
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/heatmap/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/heatmap/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/heatmap/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/heatmap/plot.js"),
    colorbar: __webpack_require__(/*! ./colorbar */ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/heatmap/style.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/heatmap/hover.js"),

    moduleType: 'trace',
    name: 'heatmap',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', '2dMap', 'showLegend'],
    meta: {
        description: [
            'The data that describes the heatmap value-to-color mapping',
            'is set in `z`.',
            'Data in `z` can either be a {2D array} of values (ragged or not)',
            'or a 1D array of values.',

            'In the case where `z` is a {2D array},',
            'say that `z` has N rows and M columns.',
            'Then, by default, the resulting heatmap will have N partitions along',
            'the y axis and M partitions along the x axis.',
            'In other words, the i-th row/ j-th column cell in `z`',
            'is mapped to the i-th partition of the y axis',
            '(starting from the bottom of the plot) and the j-th partition',
            'of the x-axis (starting from the left of the plot).',
            'This behavior can be flipped by using `transpose`.',
            'Moreover, `x` (`y`) can be provided with M or M+1 (N or N+1) elements.',
            'If M (N), then the coordinates correspond to the center of the',
            'heatmap cells and the cells have equal width.',
            'If M+1 (N+1), then the coordinates correspond to the edges of the',
            'heatmap cells.',

            'In the case where `z` is a 1D {array}, the x and y coordinates must be',
            'provided in `x` and `y` respectively to form data triplets.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/style_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/style_defaults.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




module.exports = function handleStyleDefaults(traceIn, traceOut, coerce) {
    var zsmooth = coerce('zsmooth');
    if(zsmooth === false) {
        // ensure that xgap and ygap are coerced only when zsmooth allows them to have an effect.
        coerce('xgap');
        coerce('ygap');
    }

    coerce('zhoverformat');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js ***!
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
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

module.exports = function handleXYZDefaults(traceIn, traceOut, coerce, layout, xName, yName) {
    var z = coerce('z');
    xName = xName || 'x';
    yName = yName || 'y';
    var x, y;

    if(z === undefined || !z.length) return 0;

    if(Lib.isArray1D(traceIn.z)) {
        x = coerce(xName);
        y = coerce(yName);

        var xlen = Lib.minRowLength(x);
        var ylen = Lib.minRowLength(y);

        // column z must be accompanied by xName and yName arrays
        if(xlen === 0 || ylen === 0) return 0;

        traceOut._length = Math.min(xlen, ylen, z.length);
    } else {
        x = coordDefaults(xName, coerce);
        y = coordDefaults(yName, coerce);

        // TODO put z validation elsewhere
        if(!isValidZ(z)) return 0;

        coerce('transpose');

        traceOut._length = null;
    }

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, [xName, yName], layout);

    return true;
};

function coordDefaults(coordStr, coerce) {
    var coord = coerce(coordStr);
    var coordType = coord ? coerce(coordStr + 'type', 'array') : 'scaled';

    if(coordType === 'scaled') {
        coerce(coordStr + '0');
        coerce('d' + coordStr);
    }

    return coord;
}

function isValidZ(z) {
    var allRowsAreArrays = true;
    var oneRowIsFilled = false;
    var hasOneNumber = false;
    var zi;

    /*
     * Without this step:
     *
     * hasOneNumber = false breaks contour but not heatmap
     * allRowsAreArrays = false breaks contour but not heatmap
     * oneRowIsFilled = false breaks both
     */

    for(var i = 0; i < z.length; i++) {
        zi = z[i];
        if(!Lib.isArrayOrTypedArray(zi)) {
            allRowsAreArrays = false;
            break;
        }
        if(zi.length > 0) oneRowIsFilled = true;
        for(var j = 0; j < zi.length; j++) {
            if(isNumeric(zi[j])) {
                hasOneNumber = true;
                break;
            }
        }
    }

    return (allRowsAreArrays && oneRowIsFilled && hasOneNumber);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2d/defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2d/defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var handleSampleDefaults = __webpack_require__(/*! ./sample_defaults */ "./node_modules/plotly.js/src/traces/histogram2d/sample_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ../heatmap/style_defaults */ "./node_modules/plotly.js/src/traces/heatmap/style_defaults.js");
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/histogram2d/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    handleSampleDefaults(traceIn, traceOut, coerce, layout);
    if(traceOut.visible === false) return;

    handleStyleDefaults(traceIn, traceOut, coerce, layout);
    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'z'});
    coerce('hovertemplate');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2d/hover.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2d/hover.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var heatmapHover = __webpack_require__(/*! ../heatmap/hover */ "./node_modules/plotly.js/src/traces/heatmap/hover.js");
var hoverLabelText = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js").hoverLabelText;

module.exports = function hoverPoints(pointData, xval, yval, hovermode, hoverLayer, contour) {
    var pts = heatmapHover(pointData, xval, yval, hovermode, hoverLayer, contour);

    if(!pts) return;

    pointData = pts[0];
    var indices = pointData.index;
    var ny = indices[0];
    var nx = indices[1];
    var cd0 = pointData.cd[0];
    var xRange = cd0.xRanges[nx];
    var yRange = cd0.yRanges[ny];

    pointData.xLabel = hoverLabelText(pointData.xa, xRange[0], xRange[1]);
    pointData.yLabel = hoverLabelText(pointData.ya, yRange[0], yRange[1]);

    return pts;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2d/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2d/index.js ***!
  \****************************************************************/
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/histogram2d/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/histogram2d/defaults.js"),
    crossTraceDefaults: __webpack_require__(/*! ../histogram/cross_trace_defaults */ "./node_modules/plotly.js/src/traces/histogram/cross_trace_defaults.js"),
    calc: __webpack_require__(/*! ../heatmap/calc */ "./node_modules/plotly.js/src/traces/heatmap/calc.js"),
    plot: __webpack_require__(/*! ../heatmap/plot */ "./node_modules/plotly.js/src/traces/heatmap/plot.js"),
    layerName: 'heatmaplayer',
    colorbar: __webpack_require__(/*! ../heatmap/colorbar */ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js"),
    style: __webpack_require__(/*! ../heatmap/style */ "./node_modules/plotly.js/src/traces/heatmap/style.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/histogram2d/hover.js"),
    eventData: __webpack_require__(/*! ../histogram/event_data */ "./node_modules/plotly.js/src/traces/histogram/event_data.js"),

    moduleType: 'trace',
    name: 'histogram2d',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', '2dMap', 'histogram', 'showLegend'],
    meta: {
        hrName: 'histogram_2d',
        description: [
            'The sample data from which statistics are computed is set in `x`',
            'and `y` (where `x` and `y` represent marginal distributions,',
            'binning is set in `xbins` and `ybins` in this case)',
            'or `z` (where `z` represent the 2D distribution and binning set,',
            'binning is set by `x` and `y` in this case).',
            'The resulting distribution is visualized as a heatmap.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/base_plot.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/base_plot.js ***!
  \************************************************************/
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

exports.name = 'pie';

exports.plot = function(gd, traces, transitionOpts, makeOnCompleteCallback) {
    plots.plotBasePlot(exports.name, gd, traces, transitionOpts, makeOnCompleteCallback);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    plots.cleanBasePlot(exports.name, newFullData, newFullLayout, oldFullData, oldFullLayout);
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

/***/ "./node_modules/plotly.js/src/traces/pie/index.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/pie/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/pie/defaults.js").supplyDefaults,
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/pie/layout_defaults.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/pie/layout_attributes.js"),

    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/pie/calc.js").calc,
    crossTraceCalc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/pie/calc.js").crossTraceCalc,

    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/pie/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/pie/style.js"),
    styleOne: __webpack_require__(/*! ./style_one */ "./node_modules/plotly.js/src/traces/pie/style_one.js"),

    moduleType: 'trace',
    name: 'pie',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/pie/base_plot.js"),
    categories: ['pie-like', 'pie', 'showLegend'],
    meta: {
        description: [
            'A data visualized by the sectors of the pie is set in `values`.',
            'The sector labels are set in `labels`.',
            'The sector colors are set in `marker.colors`'
        ].join(' ')
    }
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


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/layout_defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/layout_defaults.js ***!
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

var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/pie/layout_attributes.js");

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    coerce('hiddenlabels');
    coerce('piecolorway', layoutOut.colorway);
    coerce('extendpiecolors');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/style.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/style.js ***!
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

var styleOne = __webpack_require__(/*! ./style_one */ "./node_modules/plotly.js/src/traces/pie/style_one.js");
var resizeText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").resizeText;

module.exports = function style(gd) {
    var s = gd._fullLayout._pielayer.selectAll('.trace');
    resizeText(gd, s, 'pie');

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvYmFyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL2xpYi9ib3guanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvbGliL2NvbnRvdXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvbGliL2hlYXRtYXAuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvbGliL2hpc3RvZ3JhbTJkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL2xpYi9pbmRleC1jYXJ0ZXNpYW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvbGliL3BpZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvc3VicGxvdF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2V2ZW50X2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9ib3gvZXZlbnRfZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2JveC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2JveC9zdHlsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvY29uc3RyYWludF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9jb2xvcmJhci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9zdHlsZV9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAveHl6X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtMmQvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oaXN0b2dyYW0yZC9ob3Zlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hpc3RvZ3JhbTJkL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGllL2Jhc2VfcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9sYXlvdXRfYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9sYXlvdXRfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9waWUvc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUhBQTZDOzs7Ozs7Ozs7Ozs7QUNWN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUhBQTZDOzs7Ozs7Ozs7Ozs7QUNWN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIseUhBQWlEOzs7Ozs7Ozs7Ozs7QUNWakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIseUhBQWlEOzs7Ozs7Ozs7Ozs7QUNWakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUlBQXFEOzs7Ozs7Ozs7Ozs7QUNW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Q0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3Qix1QkFBdUIsbUJBQU8sQ0FBQyx5RkFBcUI7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLG1DQUFJOztBQUVyQixlQUFlLG1CQUFPLENBQUMseUVBQWE7QUFDcEMsaUJBQWlCLG9IQUF5Qzs7QUFFMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qix1QkFBdUI7O0FBRXJEO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMIiwiZmlsZSI6ImNoYXJ0MTYwODZmYWZjN2NiZDU0YjgyN2YuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9iYXInKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL2JveCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvY29udG91cicpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvaGVhdG1hcCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvaGlzdG9ncmFtMmQnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFBsb3RseSA9IHJlcXVpcmUoJy4vY29yZScpO1xuXG5QbG90bHkucmVnaXN0ZXIoW1xuICAgIHJlcXVpcmUoJy4vYmFyJyksXG4gICAgcmVxdWlyZSgnLi9ib3gnKSxcbiAgICByZXF1aXJlKCcuL2hlYXRtYXAnKSxcbiAgICByZXF1aXJlKCcuL2hpc3RvZ3JhbScpLFxuICAgIHJlcXVpcmUoJy4vaGlzdG9ncmFtMmQnKSxcbiAgICByZXF1aXJlKCcuL2hpc3RvZ3JhbTJkY29udG91cicpLFxuICAgIHJlcXVpcmUoJy4vaW1hZ2UnKSxcbiAgICByZXF1aXJlKCcuL3BpZScpLFxuICAgIHJlcXVpcmUoJy4vY29udG91cicpLFxuICAgIHJlcXVpcmUoJy4vc2NhdHRlcnRlcm5hcnknKSxcbiAgICByZXF1aXJlKCcuL3Zpb2xpbicpXG5dKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbG90bHk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9waWUnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vbGliJyk7XG52YXIgVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9wbG90X2FwaS9wbG90X3RlbXBsYXRlJyk7XG52YXIgaGFuZGxlRG9tYWluRGVmYXVsdHMgPSByZXF1aXJlKCcuL2RvbWFpbicpLmRlZmF1bHRzO1xuXG5cbi8qKlxuICogRmluZCBhbmQgc3VwcGx5IGRlZmF1bHRzIHRvIGFsbCBzdWJwbG90cyBvZiBhIGdpdmVuIHR5cGVcbiAqIFRoaXMgaGFuZGxlcyBzdWJwbG90cyB0aGF0IGFyZSBjb250YWluZWQgd2l0aGluIG9uZSBjb250YWluZXIgLSBzb1xuICogZ2wzZCwgZ2VvLCB0ZXJuYXJ5Li4uIGJ1dCBub3QgMmQgYXhlcyB3aGljaCBoYXZlIHNlcGFyYXRlIHggYW5kIHkgYXhlc1xuICogZmluZHMgc3VicGxvdHMsIGNvZXJjZXMgdGhlaXIgYGRvbWFpbmAgYXR0cmlidXRlcywgdGhlbiBjYWxscyB0aGVcbiAqIGdpdmVuIGhhbmRsZURlZmF1bHRzIGZ1bmN0aW9uIHRvIGZpbGwgaW4gZXZlcnl0aGluZyBlbHNlLlxuICpcbiAqIGxheW91dEluOiB0aGUgY29tcGxldGUgdXNlci1zdXBwbGllZCBpbnB1dCBsYXlvdXRcbiAqIGxheW91dE91dDogdGhlIGNvbXBsZXRlIGZpbmlzaGVkIGxheW91dFxuICogZnVsbERhdGE6IHRoZSBmaW5pc2hlZCBkYXRhIGFycmF5LCB1c2VkIG9ubHkgdG8gZmluZCBzdWJwbG90c1xuICogb3B0czoge1xuICogIHR5cGU6IHN1YnBsb3QgdHlwZSBzdHJpbmdcbiAqICBhdHRyaWJ1dGVzOiBzdWJwbG90IGF0dHJpYnV0ZXMgb2JqZWN0XG4gKiAgcGFydGl0aW9uOiAneCcgb3IgJ3knLCB3aGljaCBkaXJlY3Rpb24gdG8gZGl2aWRlIGRvbWFpbiBzcGFjZSBieSBkZWZhdWx0XG4gKiAgICAgIChkZWZhdWx0ICd4JywgaWUgc2lkZS1ieS1zaWRlIHN1YnBsb3RzKVxuICogICAgICBUT0RPOiB0aGlzIG9wdGlvbiBpcyBvbmx5IGhlcmUgYmVjYXVzZSAzRCBhbmQgZ2VvIG1hZGUgb3Bwb3NpdGVcbiAqICAgICAgY2hvaWNlcyBpbiB0aGlzIHJlZ2FyZCBwcmV2aW91c2x5IGFuZCBJIGRpZG4ndCB3YW50IHRvIGNoYW5nZSBpdC5cbiAqICAgICAgSW5zdGVhZCB3ZSBzaG91bGQgZG86XG4gKiAgICAgIC0gc29tZXRoaW5nIGNvbnNpc3RlbnRcbiAqICAgICAgLSBzb21ldGhpbmcgbW9yZSBzcXVhcmUgKDQgY3V0cyAyeDIsIDUvNiBjdXRzIDJ4MywgZXRjLilcbiAqICAgICAgLSBzb21ldGhpbmcgdGhhdCBpbmNsdWRlcyBhbGwgc3VicGxvdCB0eXBlcyBpbiBvbmUgYXJyYW5nZW1lbnQsXG4gKiAgICAgICAgbm93IHRoYXQgd2UgY2FuIGhhdmUgdGhlbSB0b2dldGhlciFcbiAqICBoYW5kbGVEZWZhdWx0czogZnVuY3Rpb24gb2YgKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgY29lcmNlLCBvcHRzKVxuICogICAgICB0aGlzIG9wdHMgb2JqZWN0IGlzIHBhc3NlZCB0aHJvdWdoIHRvIGhhbmRsZURlZmF1bHRzLCBzbyBhdHRhY2ggYW55XG4gKiAgICAgIGFkZGl0aW9uYWwgaXRlbXMgbmVlZGVkIGJ5IHRoaXMgZnVuY3Rpb24gaGVyZSBhcyB3ZWxsXG4gKiB9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlU3VicGxvdERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhLCBvcHRzKSB7XG4gICAgdmFyIHN1YnBsb3RUeXBlID0gb3B0cy50eXBlO1xuICAgIHZhciBzdWJwbG90QXR0cmlidXRlcyA9IG9wdHMuYXR0cmlidXRlcztcbiAgICB2YXIgaGFuZGxlRGVmYXVsdHMgPSBvcHRzLmhhbmRsZURlZmF1bHRzO1xuICAgIHZhciBwYXJ0aXRpb24gPSBvcHRzLnBhcnRpdGlvbiB8fCAneCc7XG5cbiAgICB2YXIgaWRzID0gbGF5b3V0T3V0Ll9zdWJwbG90c1tzdWJwbG90VHlwZV07XG4gICAgdmFyIGlkc0xlbmd0aCA9IGlkcy5sZW5ndGg7XG5cbiAgICB2YXIgYmFzZUlkID0gaWRzTGVuZ3RoICYmIGlkc1swXS5yZXBsYWNlKC9cXGQrJC8sICcnKTtcblxuICAgIHZhciBzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQ7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIHN1YnBsb3RBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaWRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0gaWRzW2ldO1xuXG4gICAgICAgIC8vIHRlcm5hcnkgdHJhY2VzIGdldCBhIGxheW91dCB0ZXJuYXJ5IGZvciBmcmVlIVxuICAgICAgICBpZihsYXlvdXRJbltpZF0pIHN1YnBsb3RMYXlvdXRJbiA9IGxheW91dEluW2lkXTtcbiAgICAgICAgZWxzZSBzdWJwbG90TGF5b3V0SW4gPSBsYXlvdXRJbltpZF0gPSB7fTtcblxuICAgICAgICBzdWJwbG90TGF5b3V0T3V0ID0gVGVtcGxhdGUubmV3Q29udGFpbmVyKGxheW91dE91dCwgaWQsIGJhc2VJZCk7XG5cbiAgICAgICAgLy8gQWxsIHN1YnBsb3QgY29udGFpbmVycyBnZXQgYSBgdWlyZXZpc2lvbmAgaW5oZXJpdGluZyBmcm9tIHRoZSBiYXNlLlxuICAgICAgICAvLyBDdXJyZW50bHkgYWxsIHN1YnBsb3RzIGNvbnRhaW5lcnMgaGF2ZSBzb21lIHVzZXIgaW50ZXJhY3Rpb25cbiAgICAgICAgLy8gYXR0cmlidXRlcywgYnV0IGlmIHdlIGV2ZXIgYWRkIG9uZSB0aGF0IGRvZXNuJ3QsIHdlIHdvdWxkIG5lZWQgYW5cbiAgICAgICAgLy8gb3B0aW9uIHRvIHNraXAgdGhpcyBzdGVwLlxuICAgICAgICBjb2VyY2UoJ3VpcmV2aXNpb24nLCBsYXlvdXRPdXQudWlyZXZpc2lvbik7XG5cbiAgICAgICAgdmFyIGRmbHREb21haW5zID0ge307XG4gICAgICAgIGRmbHREb21haW5zW3BhcnRpdGlvbl0gPSBbaSAvIGlkc0xlbmd0aCwgKGkgKyAxKSAvIGlkc0xlbmd0aF07XG4gICAgICAgIGhhbmRsZURvbWFpbkRlZmF1bHRzKHN1YnBsb3RMYXlvdXRPdXQsIGxheW91dE91dCwgY29lcmNlLCBkZmx0RG9tYWlucyk7XG5cbiAgICAgICAgb3B0cy5pZCA9IGlkO1xuICAgICAgICBoYW5kbGVEZWZhdWx0cyhzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIGNvZXJjZSwgb3B0cyk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIGhhc0NvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvaGVscGVycycpLmhhc0NvbG9yc2NhbGU7XG52YXIgY29sb3JzY2FsZUNhbGMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvY2FsYycpO1xudmFyIGFycmF5c1RvQ2FsY2RhdGEgPSByZXF1aXJlKCcuL2FycmF5c190b19jYWxjZGF0YScpO1xudmFyIGNhbGNTZWxlY3Rpb24gPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NhbGNfc2VsZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgeGEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueGF4aXMgfHwgJ3gnKTtcbiAgICB2YXIgeWEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueWF4aXMgfHwgJ3knKTtcbiAgICB2YXIgc2l6ZSwgcG9zO1xuXG4gICAgdmFyIHNpemVPcHRzID0ge1xuICAgICAgICBtc1VUQzogISEodHJhY2UuYmFzZSB8fCB0cmFjZS5iYXNlID09PSAwKVxuICAgIH07XG5cbiAgICBpZih0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICAgIHNpemUgPSB4YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd4Jywgc2l6ZU9wdHMpO1xuICAgICAgICBwb3MgPSB5YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2l6ZSA9IHlhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3knLCBzaXplT3B0cyk7XG4gICAgICAgIHBvcyA9IHhhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3gnKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGhlIFwiY2FsY3VsYXRlZCBkYXRhXCIgdG8gcGxvdFxuICAgIHZhciBzZXJpZXNsZW4gPSBNYXRoLm1pbihwb3MubGVuZ3RoLCBzaXplLmxlbmd0aCk7XG4gICAgdmFyIGNkID0gbmV3IEFycmF5KHNlcmllc2xlbik7XG5cbiAgICAvLyBzZXQgcG9zaXRpb24gYW5kIHNpemVcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VyaWVzbGVuOyBpKyspIHtcbiAgICAgICAgY2RbaV0gPSB7IHA6IHBvc1tpXSwgczogc2l6ZVtpXSB9O1xuXG4gICAgICAgIGlmKHRyYWNlLmlkcykge1xuICAgICAgICAgICAgY2RbaV0uaWQgPSBTdHJpbmcodHJhY2UuaWRzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGF1dG8teiBhbmQgYXV0b2NvbG9yc2NhbGUgaWYgYXBwbGljYWJsZVxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXInKSkge1xuICAgICAgICBjb2xvcnNjYWxlQ2FsYyhnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgIHZhbHM6IHRyYWNlLm1hcmtlci5jb2xvcixcbiAgICAgICAgICAgIGNvbnRhaW5lclN0cjogJ21hcmtlcicsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXIubGluZScpKSB7XG4gICAgICAgIGNvbG9yc2NhbGVDYWxjKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgdmFsczogdHJhY2UubWFya2VyLmxpbmUuY29sb3IsXG4gICAgICAgICAgICBjb250YWluZXJTdHI6ICdtYXJrZXIubGluZScsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpO1xuICAgIGNhbGNTZWxlY3Rpb24oY2QsIHRyYWNlKTtcblxuICAgIHJldHVybiBjZDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlbnREYXRhKG91dCwgcHQsIHRyYWNlKSB7XG4gICAgLy8gc3RhbmRhcmQgY2FydGVzaWFuIGV2ZW50IGRhdGFcbiAgICBvdXQueCA9ICd4VmFsJyBpbiBwdCA/IHB0LnhWYWwgOiBwdC54O1xuICAgIG91dC55ID0gJ3lWYWwnIGluIHB0ID8gcHQueVZhbCA6IHB0Lnk7XG4gICAgaWYocHQueGEpIG91dC54YXhpcyA9IHB0LnhhO1xuICAgIGlmKHB0LnlhKSBvdXQueWF4aXMgPSBwdC55YTtcblxuICAgIGlmKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgb3V0LmxhYmVsID0gb3V0Lnk7XG4gICAgICAgIG91dC52YWx1ZSA9IG91dC54O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dC5sYWJlbCA9IG91dC54O1xuICAgICAgICBvdXQudmFsdWUgPSBvdXQueTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgbGF5b3V0QXR0cmlidXRlczogcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJykuc3VwcGx5RGVmYXVsdHMsXG4gICAgY3Jvc3NUcmFjZURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJykuY3Jvc3NUcmFjZURlZmF1bHRzLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIGNyb3NzVHJhY2VDYWxjOiByZXF1aXJlKCcuL2Nyb3NzX3RyYWNlX2NhbGMnKS5jcm9zc1RyYWNlQ2FsYyxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi4vc2NhdHRlci9tYXJrZXJfY29sb3JiYXInKSxcbiAgICBhcnJheXNUb0NhbGNkYXRhOiByZXF1aXJlKCcuL2FycmF5c190b19jYWxjZGF0YScpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLnBsb3QsXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKS5zdHlsZSxcbiAgICBzdHlsZU9uU2VsZWN0OiByZXF1aXJlKCcuL3N0eWxlJykuc3R5bGVPblNlbGVjdCxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLmhvdmVyUG9pbnRzLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi9ldmVudF9kYXRhJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuL3NlbGVjdCcpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnYmFyJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydiYXItbGlrZScsICdjYXJ0ZXNpYW4nLCAnc3ZnJywgJ2JhcicsICdvcmllbnRlZCcsICdlcnJvckJhcnNPSycsICdzaG93TGVnZW5kJywgJ3pvb21TY2FsZSddLFxuICAgIGFuaW1hdGFibGU6IHRydWUsXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBkYXRhIHZpc3VhbGl6ZWQgYnkgdGhlIHNwYW4gb2YgdGhlIGJhcnMgaXMgc2V0IGluIGB5YCcsXG4gICAgICAgICAgICAnaWYgYG9yaWVudGF0aW9uYCBpcyBzZXQgdGggKnYqICh0aGUgZGVmYXVsdCknLFxuICAgICAgICAgICAgJ2FuZCB0aGUgbGFiZWxzIGFyZSBzZXQgaW4gYHhgLicsXG4gICAgICAgICAgICAnQnkgc2V0dGluZyBgb3JpZW50YXRpb25gIHRvICpoKiwgdGhlIHJvbGVzIGFyZSBpbnRlcmNoYW5nZWQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlbnREYXRhKG91dCwgcHQpIHtcbiAgICAvLyBOb3RlOiBob3Zlck9uQm94IHByb3BlcnR5IGlzIG5lZWRlZCBmb3IgY2xpY2stdG8tc2VsZWN0XG4gICAgLy8gdG8gaWdub3JlIHdoZW4gYSBib3ggd2FzIGNsaWNrZWQuIFRoaXMgaXMgdGhlIHJlYXNvbiBib3hcbiAgICAvLyBpbXBsZW1lbnRzIHRoaXMgY3VzdG9tIGV2ZW50RGF0YSBmdW5jdGlvbi5cbiAgICBpZihwdC5ob3Zlck9uQm94KSBvdXQuaG92ZXJPbkJveCA9IHB0LmhvdmVyT25Cb3g7XG5cbiAgICBpZigneFZhbCcgaW4gcHQpIG91dC54ID0gcHQueFZhbDtcbiAgICBpZigneVZhbCcgaW4gcHQpIG91dC55ID0gcHQueVZhbDtcbiAgICBpZihwdC54YSkgb3V0LnhheGlzID0gcHQueGE7XG4gICAgaWYocHQueWEpIG91dC55YXhpcyA9IHB0LnlhO1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLnN1cHBseURlZmF1bHRzLFxuICAgIGNyb3NzVHJhY2VEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLmNyb3NzVHJhY2VEZWZhdWx0cyxcbiAgICBzdXBwbHlMYXlvdXREZWZhdWx0czogcmVxdWlyZSgnLi9sYXlvdXRfZGVmYXVsdHMnKS5zdXBwbHlMYXlvdXREZWZhdWx0cyxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBjcm9zc1RyYWNlQ2FsYzogcmVxdWlyZSgnLi9jcm9zc190cmFjZV9jYWxjJykuY3Jvc3NUcmFjZUNhbGMsXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JykucGxvdCxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlLFxuICAgIHN0eWxlT25TZWxlY3Q6IHJlcXVpcmUoJy4vc3R5bGUnKS5zdHlsZU9uU2VsZWN0LFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJykuaG92ZXJQb2ludHMsXG4gICAgZXZlbnREYXRhOiByZXF1aXJlKCcuL2V2ZW50X2RhdGEnKSxcbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4vc2VsZWN0JyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdib3gnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4nKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2NhcnRlc2lhbicsICdzdmcnLCAnc3ltYm9scycsICdvcmllbnRlZCcsICdib3gtdmlvbGluJywgJ3Nob3dMZWdlbmQnLCAnYm94TGF5b3V0JywgJ3pvb21TY2FsZSddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdFYWNoIGJveCBzcGFucyBmcm9tIHF1YXJ0aWxlIDEgKFExKSB0byBxdWFydGlsZSAzIChRMykuJyxcbiAgICAgICAgICAgICdUaGUgc2Vjb25kIHF1YXJ0aWxlIChRMiwgaS5lLiB0aGUgbWVkaWFuKSBpcyBtYXJrZWQgYnkgYSBsaW5lIGluc2lkZSB0aGUgYm94LicsXG4gICAgICAgICAgICAnVGhlIGZlbmNlcyBncm93IG91dHdhcmQgZnJvbSB0aGUgYm94ZXNcXCcgZWRnZXMsJyxcbiAgICAgICAgICAgICdieSBkZWZhdWx0IHRoZXkgc3BhbiArLy0gMS41IHRpbWVzIHRoZSBpbnRlcnF1YXJ0aWxlIHJhbmdlIChJUVI6IFEzLVExKSwnLFxuICAgICAgICAgICAgJ1RoZSBzYW1wbGUgbWVhbiBhbmQgc3RhbmRhcmQgZGV2aWF0aW9uIGFzIHdlbGwgYXMgbm90Y2hlcyBhbmQnLFxuICAgICAgICAgICAgJ3RoZSBzYW1wbGUsIG91dGxpZXIgYW5kIHN1c3BlY3RlZCBvdXRsaWVycyBwb2ludHMgY2FuIGJlIG9wdGlvbmFsbHknLFxuICAgICAgICAgICAgJ2FkZGVkIHRvIHRoZSBib3ggcGxvdC4nLFxuXG4gICAgICAgICAgICAnVGhlIHZhbHVlcyBhbmQgcG9zaXRpb25zIGNvcnJlc3BvbmRpbmcgdG8gZWFjaCBib3hlcyBjYW4gYmUgaW5wdXQnLFxuICAgICAgICAgICAgJ3VzaW5nIHR3byBzaWduYXR1cmVzLicsXG5cbiAgICAgICAgICAgICdUaGUgZmlyc3Qgc2lnbmF0dXJlIGV4cGVjdHMgdXNlcnMgdG8gc3VwcGx5IHRoZSBzYW1wbGUgdmFsdWVzIGluIHRoZSBgeWAnLFxuICAgICAgICAgICAgJ2RhdGEgYXJyYXkgZm9yIHZlcnRpY2FsIGJveGVzIChgeGAgZm9yIGhvcml6b250YWwgYm94ZXMpLicsXG4gICAgICAgICAgICAnQnkgc3VwcGx5aW5nIGFuIGB4YCAoYHlgKSBhcnJheSwgb25lIGJveCBwZXIgZGlzdGluY3QgYHhgIChgeWApIHZhbHVlIGlzIGRyYXduJyxcbiAgICAgICAgICAgICdJZiBubyBgeGAgKGB5YCkge2FycmF5fSBpcyBwcm92aWRlZCwgYSBzaW5nbGUgYm94IGlzIGRyYXduLicsXG4gICAgICAgICAgICAnSW4gdGhpcyBjYXNlLCB0aGUgYm94IGlzIHBvc2l0aW9uZWQgd2l0aCB0aGUgdHJhY2UgYG5hbWVgIG9yIHdpdGggYHgwYCAoYHkwYCkgaWYgcHJvdmlkZWQuJyxcblxuICAgICAgICAgICAgJ1RoZSBzZWNvbmQgc2lnbmF0dXJlIGV4cGVjdHMgdXNlcnMgdG8gc3VwcGx5IHRoZSBib3hlcyBjb3JyZXNwb25kaW5nIFExLCBtZWRpYW4gYW5kIFEzJyxcbiAgICAgICAgICAgICdzdGF0aXN0aWNzIGluIHRoZSBgcTFgLCBgbWVkaWFuYCBhbmQgYHEzYCBkYXRhIGFycmF5cyByZXNwZWN0aXZlbHkuJyxcbiAgICAgICAgICAgICdPdGhlciBib3ggZmVhdHVyZXMgcmVseWluZyBvbiBzdGF0aXN0aWNzIG5hbWVseSBgbG93ZXJmZW5jZWAsIGB1cHBlcmZlbmNlYCwgYG5vdGNoc3BhbmAnLFxuICAgICAgICAgICAgJ2NhbiBiZSBzZXQgZGlyZWN0bHkgYnkgdGhlIHVzZXJzLicsXG4gICAgICAgICAgICAnVG8gaGF2ZSBwbG90bHkgY29tcHV0ZSB0aGVtIG9yIHRvIHNob3cgc2FtcGxlIHBvaW50cyBiZXNpZGVzIHRoZSBib3hlcywnLFxuICAgICAgICAgICAgJ3VzZXJzIGNhbiBzZXQgdGhlIGB5YCBkYXRhIGFycmF5IGZvciB2ZXJ0aWNhbCBib3hlcyAoYHhgIGZvciBob3Jpem9udGFsIGJveGVzKScsXG4gICAgICAgICAgICAndG8gYSAyRCBhcnJheSB3aXRoIHRoZSBvdXRlciBsZW5ndGggY29ycmVzcG9uZGluZycsXG4gICAgICAgICAgICAndG8gdGhlIG51bWJlciBvZiBib3hlcyBpbiB0aGUgdHJhY2VzIGFuZCB0aGUgaW5uZXIgbGVuZ3RoIGNvcnJlc3BvbmRpbmcgdGhlIHNhbXBsZSBzaXplLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcblxuZnVuY3Rpb24gc3R5bGUoZ2QsIGNkLCBzZWwpIHtcbiAgICB2YXIgcyA9IHNlbCA/IHNlbCA6IGQzLnNlbGVjdChnZCkuc2VsZWN0QWxsKCdnLnRyYWNlLmJveGVzJyk7XG5cbiAgICBzLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZFswXS50cmFjZS5vcGFjaXR5OyB9KTtcblxuICAgIHMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIHRyYWNlID0gZFswXS50cmFjZTtcbiAgICAgICAgdmFyIGxpbmVXaWR0aCA9IHRyYWNlLmxpbmUud2lkdGg7XG5cbiAgICAgICAgZnVuY3Rpb24gc3R5bGVCb3goYm94U2VsLCBsaW5lV2lkdGgsIGxpbmVDb2xvciwgZmlsbENvbG9yKSB7XG4gICAgICAgICAgICBib3hTZWwuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGxpbmVXaWR0aCArICdweCcpXG4gICAgICAgICAgICAgICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCBsaW5lQ29sb3IpXG4gICAgICAgICAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgZmlsbENvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhbGxCb3hlcyA9IGVsLnNlbGVjdEFsbCgncGF0aC5ib3gnKTtcblxuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnY2FuZGxlc3RpY2snKSB7XG4gICAgICAgICAgICBhbGxCb3hlcy5lYWNoKGZ1bmN0aW9uKGJveERhdGEpIHtcbiAgICAgICAgICAgICAgICBpZihib3hEYXRhLmVtcHR5KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB2YXIgdGhpc0JveCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gdHJhY2VbYm94RGF0YS5kaXJdOyAvLyBkaXIgPSAnaW5jcmVhc2luZycgb3IgJ2RlY3JlYXNpbmcnXG4gICAgICAgICAgICAgICAgc3R5bGVCb3godGhpc0JveCwgY29udGFpbmVyLmxpbmUud2lkdGgsIGNvbnRhaW5lci5saW5lLmNvbG9yLCBjb250YWluZXIuZmlsbGNvbG9yKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjdXN0b20gc2VsZWN0aW9uIHN0eWxlIGZvciBjYW5kbGVzdGlja3NcbiAgICAgICAgICAgICAgICB0aGlzQm94LnN0eWxlKCdvcGFjaXR5JywgdHJhY2Uuc2VsZWN0ZWRwb2ludHMgJiYgIWJveERhdGEuc2VsZWN0ZWQgPyAwLjMgOiAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGVCb3goYWxsQm94ZXMsIGxpbmVXaWR0aCwgdHJhY2UubGluZS5jb2xvciwgdHJhY2UuZmlsbGNvbG9yKTtcbiAgICAgICAgICAgIGVsLnNlbGVjdEFsbCgncGF0aC5tZWFuJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogbGluZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6ICgyICogbGluZVdpZHRoKSArICdweCwnICsgbGluZVdpZHRoICsgJ3B4J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCB0cmFjZS5saW5lLmNvbG9yKTtcblxuICAgICAgICAgICAgdmFyIHB0cyA9IGVsLnNlbGVjdEFsbCgncGF0aC5wb2ludCcpO1xuICAgICAgICAgICAgRHJhd2luZy5wb2ludFN0eWxlKHB0cywgdHJhY2UsIGdkKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzdHlsZU9uU2VsZWN0KGdkLCBjZCwgc2VsKSB7XG4gICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG4gICAgdmFyIHB0cyA9IHNlbC5zZWxlY3RBbGwoJ3BhdGgucG9pbnQnKTtcblxuICAgIGlmKHRyYWNlLnNlbGVjdGVkcG9pbnRzKSB7XG4gICAgICAgIERyYXdpbmcuc2VsZWN0ZWRQb2ludFN0eWxlKHB0cywgdHJhY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIERyYXdpbmcucG9pbnRTdHlsZShwdHMsIHRyYWNlLCBnZCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHlsZTogc3R5bGUsXG4gICAgc3R5bGVPblNlbGVjdDogc3R5bGVPblNlbGVjdFxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG5cbnZhciBoYW5kbGVMYWJlbERlZmF1bHRzID0gcmVxdWlyZSgnLi9sYWJlbF9kZWZhdWx0cycpO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgYWRkT3BhY2l0eSA9IENvbG9yLmFkZE9wYWNpdHk7XG52YXIgb3BhY2l0eSA9IENvbG9yLm9wYWNpdHk7XG5cbnZhciBmaWx0ZXJPcHMgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZmlsdGVyX29wcycpO1xudmFyIENPTlNUUkFJTlRfUkVEVUNUSU9OID0gZmlsdGVyT3BzLkNPTlNUUkFJTlRfUkVEVUNUSU9OO1xudmFyIENPTVBBUklTT05fT1BTMiA9IGZpbHRlck9wcy5DT01QQVJJU09OX09QUzI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlQ29uc3RyYWludERlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCwgZGVmYXVsdENvbG9yLCBvcHRzKSB7XG4gICAgdmFyIGNvbnRvdXJzID0gdHJhY2VPdXQuY29udG91cnM7XG4gICAgdmFyIHNob3dMaW5lcywgbGluZUNvbG9yLCBmaWxsQ29sb3I7XG5cbiAgICB2YXIgb3BlcmF0aW9uID0gY29lcmNlKCdjb250b3Vycy5vcGVyYXRpb24nKTtcbiAgICBjb250b3Vycy5fb3BlcmF0aW9uID0gQ09OU1RSQUlOVF9SRURVQ1RJT05bb3BlcmF0aW9uXTtcblxuICAgIGhhbmRsZUNvbnN0cmFpbnRWYWx1ZURlZmF1bHRzKGNvZXJjZSwgY29udG91cnMpO1xuXG4gICAgaWYob3BlcmF0aW9uID09PSAnPScpIHtcbiAgICAgICAgc2hvd0xpbmVzID0gY29udG91cnMuc2hvd2xpbmVzID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaG93TGluZXMgPSBjb2VyY2UoJ2NvbnRvdXJzLnNob3dsaW5lcycpO1xuICAgICAgICBmaWxsQ29sb3IgPSBjb2VyY2UoJ2ZpbGxjb2xvcicsIGFkZE9wYWNpdHkoXG4gICAgICAgICAgICAodHJhY2VJbi5saW5lIHx8IHt9KS5jb2xvciB8fCBkZWZhdWx0Q29sb3IsIDAuNVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBpZihzaG93TGluZXMpIHtcbiAgICAgICAgdmFyIGxpbmVEZmx0Q29sb3IgPSBmaWxsQ29sb3IgJiYgb3BhY2l0eShmaWxsQ29sb3IpID9cbiAgICAgICAgICAgIGFkZE9wYWNpdHkodHJhY2VPdXQuZmlsbGNvbG9yLCAxKSA6XG4gICAgICAgICAgICBkZWZhdWx0Q29sb3I7XG4gICAgICAgIGxpbmVDb2xvciA9IGNvZXJjZSgnbGluZS5jb2xvcicsIGxpbmVEZmx0Q29sb3IpO1xuICAgICAgICBjb2VyY2UoJ2xpbmUud2lkdGgnLCAyKTtcbiAgICAgICAgY29lcmNlKCdsaW5lLmRhc2gnKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2xpbmUuc21vb3RoaW5nJyk7XG5cbiAgICBoYW5kbGVMYWJlbERlZmF1bHRzKGNvZXJjZSwgbGF5b3V0LCBsaW5lQ29sb3IsIG9wdHMpO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlQ29uc3RyYWludFZhbHVlRGVmYXVsdHMoY29lcmNlLCBjb250b3Vycykge1xuICAgIHZhciB6dmFsdWU7XG5cbiAgICBpZihDT01QQVJJU09OX09QUzIuaW5kZXhPZihjb250b3Vycy5vcGVyYXRpb24pID09PSAtMSkge1xuICAgICAgICAvLyBSZXF1aXJlcyBhbiBhcnJheSBvZiB0d28gbnVtYmVyczpcbiAgICAgICAgY29lcmNlKCdjb250b3Vycy52YWx1ZScsIFswLCAxXSk7XG5cbiAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkoY29udG91cnMudmFsdWUpKSB7XG4gICAgICAgICAgICBpZihpc051bWVyaWMoY29udG91cnMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgenZhbHVlID0gcGFyc2VGbG9hdChjb250b3Vycy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29udG91cnMudmFsdWUgPSBbenZhbHVlLCB6dmFsdWUgKyAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKGNvbnRvdXJzLnZhbHVlLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGNvbnRvdXJzLnZhbHVlID0gY29udG91cnMudmFsdWUuc2xpY2UoMik7XG4gICAgICAgIH0gZWxzZSBpZihjb250b3Vycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnRvdXJzLnZhbHVlID0gWzAsIDFdO1xuICAgICAgICB9IGVsc2UgaWYoY29udG91cnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgenZhbHVlID0gcGFyc2VGbG9hdChjb250b3Vycy52YWx1ZVswXSk7XG4gICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IFt6dmFsdWUsIHp2YWx1ZSArIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udG91cnMudmFsdWUgPSBbXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChjb250b3Vycy52YWx1ZVswXSksXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChjb250b3Vycy52YWx1ZVsxXSlcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXF1aXJlcyBhIHNpbmdsZSBzY2FsYXI6XG4gICAgICAgIGNvZXJjZSgnY29udG91cnMudmFsdWUnLCAwKTtcblxuICAgICAgICBpZighaXNOdW1lcmljKGNvbnRvdXJzLnZhbHVlKSkge1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShjb250b3Vycy52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IHBhcnNlRmxvYXQoY29udG91cnMudmFsdWVbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxudmFyIGhhbmRsZVhZWkRlZmF1bHRzID0gcmVxdWlyZSgnLi4vaGVhdG1hcC94eXpfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVDb25zdHJhaW50RGVmYXVsdHMgPSByZXF1aXJlKCcuL2NvbnN0cmFpbnRfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVDb250b3Vyc0RlZmF1bHRzID0gcmVxdWlyZSgnLi9jb250b3Vyc19kZWZhdWx0cycpO1xudmFyIGhhbmRsZVN0eWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuL3N0eWxlX2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvZXJjZTIoYXR0cikge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZTIodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIpO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBoYW5kbGVYWVpEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcbiAgICBjb2VyY2UoJ2hvdmVyb25nYXBzJyk7XG5cbiAgICB2YXIgaXNDb25zdHJhaW50ID0gKGNvZXJjZSgnY29udG91cnMudHlwZScpID09PSAnY29uc3RyYWludCcpO1xuICAgIGNvZXJjZSgnY29ubmVjdGdhcHMnLCBMaWIuaXNBcnJheTFEKHRyYWNlT3V0LnopKTtcblxuICAgIGlmKGlzQ29uc3RyYWludCkge1xuICAgICAgICBoYW5kbGVDb25zdHJhaW50RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0LCBkZWZhdWx0Q29sb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZUNvbnRvdXJzRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgY29lcmNlMik7XG4gICAgICAgIGhhbmRsZVN0eWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0KTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLnBsb3QsXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKSxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi9jb2xvcmJhcicpLFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdjb250b3VyJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydjYXJ0ZXNpYW4nLCAnc3ZnJywgJzJkTWFwJywgJ2NvbnRvdXInLCAnc2hvd0xlZ2VuZCddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgZGF0YSBmcm9tIHdoaWNoIGNvbnRvdXIgbGluZXMgYXJlIGNvbXB1dGVkIGlzIHNldCBpbiBgemAuJyxcbiAgICAgICAgICAgICdEYXRhIGluIGB6YCBtdXN0IGJlIGEgezJEIGFycmF5fSBvZiBudW1iZXJzLicsXG5cbiAgICAgICAgICAgICdTYXkgdGhhdCBgemAgaGFzIE4gcm93cyBhbmQgTSBjb2x1bW5zLCB0aGVuIGJ5IGRlZmF1bHQsJyxcbiAgICAgICAgICAgICd0aGVzZSBOIHJvd3MgY29ycmVzcG9uZCB0byBOIHkgY29vcmRpbmF0ZXMnLFxuICAgICAgICAgICAgJyhzZXQgaW4gYHlgIG9yIGF1dG8tZ2VuZXJhdGVkKSBhbmQgdGhlIE0gY29sdW1ucycsXG4gICAgICAgICAgICAnY29ycmVzcG9uZCB0byBNIHggY29vcmRpbmF0ZXMgKHNldCBpbiBgeGAgb3IgYXV0by1nZW5lcmF0ZWQpLicsXG4gICAgICAgICAgICAnQnkgc2V0dGluZyBgdHJhbnNwb3NlYCB0byAqdHJ1ZSosIHRoZSBhYm92ZSBiZWhhdmlvciBpcyBmbGlwcGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaW46ICd6bWluJyxcbiAgICBtYXg6ICd6bWF4J1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBoYW5kbGVYWVpEZWZhdWx0cyA9IHJlcXVpcmUoJy4veHl6X2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlU3R5bGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4vc3R5bGVfZGVmYXVsdHMnKTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIHZhbGlkRGF0YSA9IGhhbmRsZVhZWkRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgaWYoIXZhbGlkRGF0YSkge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3RleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuXG4gICAgaGFuZGxlU3R5bGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuXG4gICAgY29lcmNlKCdob3Zlcm9uZ2FwcycpO1xuICAgIGNvZXJjZSgnY29ubmVjdGdhcHMnLCBMaWIuaXNBcnJheTFEKHRyYWNlT3V0LnopICYmICh0cmFjZU91dC56c21vb3RoICE9PSBmYWxzZSkpO1xuXG4gICAgY29sb3JzY2FsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge3ByZWZpeDogJycsIGNMZXR0ZXI6ICd6J30pO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi9jb2xvcmJhcicpLFxuICAgIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gICAgaG92ZXJQb2ludHM6IHJlcXVpcmUoJy4vaG92ZXInKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ2hlYXRtYXAnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4nKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2NhcnRlc2lhbicsICdzdmcnLCAnMmRNYXAnLCAnc2hvd0xlZ2VuZCddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgZGF0YSB0aGF0IGRlc2NyaWJlcyB0aGUgaGVhdG1hcCB2YWx1ZS10by1jb2xvciBtYXBwaW5nJyxcbiAgICAgICAgICAgICdpcyBzZXQgaW4gYHpgLicsXG4gICAgICAgICAgICAnRGF0YSBpbiBgemAgY2FuIGVpdGhlciBiZSBhIHsyRCBhcnJheX0gb2YgdmFsdWVzIChyYWdnZWQgb3Igbm90KScsXG4gICAgICAgICAgICAnb3IgYSAxRCBhcnJheSBvZiB2YWx1ZXMuJyxcblxuICAgICAgICAgICAgJ0luIHRoZSBjYXNlIHdoZXJlIGB6YCBpcyBhIHsyRCBhcnJheX0sJyxcbiAgICAgICAgICAgICdzYXkgdGhhdCBgemAgaGFzIE4gcm93cyBhbmQgTSBjb2x1bW5zLicsXG4gICAgICAgICAgICAnVGhlbiwgYnkgZGVmYXVsdCwgdGhlIHJlc3VsdGluZyBoZWF0bWFwIHdpbGwgaGF2ZSBOIHBhcnRpdGlvbnMgYWxvbmcnLFxuICAgICAgICAgICAgJ3RoZSB5IGF4aXMgYW5kIE0gcGFydGl0aW9ucyBhbG9uZyB0aGUgeCBheGlzLicsXG4gICAgICAgICAgICAnSW4gb3RoZXIgd29yZHMsIHRoZSBpLXRoIHJvdy8gai10aCBjb2x1bW4gY2VsbCBpbiBgemAnLFxuICAgICAgICAgICAgJ2lzIG1hcHBlZCB0byB0aGUgaS10aCBwYXJ0aXRpb24gb2YgdGhlIHkgYXhpcycsXG4gICAgICAgICAgICAnKHN0YXJ0aW5nIGZyb20gdGhlIGJvdHRvbSBvZiB0aGUgcGxvdCkgYW5kIHRoZSBqLXRoIHBhcnRpdGlvbicsXG4gICAgICAgICAgICAnb2YgdGhlIHgtYXhpcyAoc3RhcnRpbmcgZnJvbSB0aGUgbGVmdCBvZiB0aGUgcGxvdCkuJyxcbiAgICAgICAgICAgICdUaGlzIGJlaGF2aW9yIGNhbiBiZSBmbGlwcGVkIGJ5IHVzaW5nIGB0cmFuc3Bvc2VgLicsXG4gICAgICAgICAgICAnTW9yZW92ZXIsIGB4YCAoYHlgKSBjYW4gYmUgcHJvdmlkZWQgd2l0aCBNIG9yIE0rMSAoTiBvciBOKzEpIGVsZW1lbnRzLicsXG4gICAgICAgICAgICAnSWYgTSAoTiksIHRoZW4gdGhlIGNvb3JkaW5hdGVzIGNvcnJlc3BvbmQgdG8gdGhlIGNlbnRlciBvZiB0aGUnLFxuICAgICAgICAgICAgJ2hlYXRtYXAgY2VsbHMgYW5kIHRoZSBjZWxscyBoYXZlIGVxdWFsIHdpZHRoLicsXG4gICAgICAgICAgICAnSWYgTSsxIChOKzEpLCB0aGVuIHRoZSBjb29yZGluYXRlcyBjb3JyZXNwb25kIHRvIHRoZSBlZGdlcyBvZiB0aGUnLFxuICAgICAgICAgICAgJ2hlYXRtYXAgY2VsbHMuJyxcblxuICAgICAgICAgICAgJ0luIHRoZSBjYXNlIHdoZXJlIGB6YCBpcyBhIDFEIHthcnJheX0sIHRoZSB4IGFuZCB5IGNvb3JkaW5hdGVzIG11c3QgYmUnLFxuICAgICAgICAgICAgJ3Byb3ZpZGVkIGluIGB4YCBhbmQgYHlgIHJlc3BlY3RpdmVseSB0byBmb3JtIGRhdGEgdHJpcGxldHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVTdHlsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UpIHtcbiAgICB2YXIgenNtb290aCA9IGNvZXJjZSgnenNtb290aCcpO1xuICAgIGlmKHpzbW9vdGggPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGVuc3VyZSB0aGF0IHhnYXAgYW5kIHlnYXAgYXJlIGNvZXJjZWQgb25seSB3aGVuIHpzbW9vdGggYWxsb3dzIHRoZW0gdG8gaGF2ZSBhbiBlZmZlY3QuXG4gICAgICAgIGNvZXJjZSgneGdhcCcpO1xuICAgICAgICBjb2VyY2UoJ3lnYXAnKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3pob3ZlcmZvcm1hdCcpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlWFlaRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0LCB4TmFtZSwgeU5hbWUpIHtcbiAgICB2YXIgeiA9IGNvZXJjZSgneicpO1xuICAgIHhOYW1lID0geE5hbWUgfHwgJ3gnO1xuICAgIHlOYW1lID0geU5hbWUgfHwgJ3knO1xuICAgIHZhciB4LCB5O1xuXG4gICAgaWYoeiA9PT0gdW5kZWZpbmVkIHx8ICF6Lmxlbmd0aCkgcmV0dXJuIDA7XG5cbiAgICBpZihMaWIuaXNBcnJheTFEKHRyYWNlSW4ueikpIHtcbiAgICAgICAgeCA9IGNvZXJjZSh4TmFtZSk7XG4gICAgICAgIHkgPSBjb2VyY2UoeU5hbWUpO1xuXG4gICAgICAgIHZhciB4bGVuID0gTGliLm1pblJvd0xlbmd0aCh4KTtcbiAgICAgICAgdmFyIHlsZW4gPSBMaWIubWluUm93TGVuZ3RoKHkpO1xuXG4gICAgICAgIC8vIGNvbHVtbiB6IG11c3QgYmUgYWNjb21wYW5pZWQgYnkgeE5hbWUgYW5kIHlOYW1lIGFycmF5c1xuICAgICAgICBpZih4bGVuID09PSAwIHx8IHlsZW4gPT09IDApIHJldHVybiAwO1xuXG4gICAgICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBNYXRoLm1pbih4bGVuLCB5bGVuLCB6Lmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IGNvb3JkRGVmYXVsdHMoeE5hbWUsIGNvZXJjZSk7XG4gICAgICAgIHkgPSBjb29yZERlZmF1bHRzKHlOYW1lLCBjb2VyY2UpO1xuXG4gICAgICAgIC8vIFRPRE8gcHV0IHogdmFsaWRhdGlvbiBlbHNld2hlcmVcbiAgICAgICAgaWYoIWlzVmFsaWRaKHopKSByZXR1cm4gMDtcblxuICAgICAgICBjb2VyY2UoJ3RyYW5zcG9zZScpO1xuXG4gICAgICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVDYWxlbmRhckRlZmF1bHRzID0gUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdjYWxlbmRhcnMnLCAnaGFuZGxlVHJhY2VEZWZhdWx0cycpO1xuICAgIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIFt4TmFtZSwgeU5hbWVdLCBsYXlvdXQpO1xuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBjb29yZERlZmF1bHRzKGNvb3JkU3RyLCBjb2VyY2UpIHtcbiAgICB2YXIgY29vcmQgPSBjb2VyY2UoY29vcmRTdHIpO1xuICAgIHZhciBjb29yZFR5cGUgPSBjb29yZCA/IGNvZXJjZShjb29yZFN0ciArICd0eXBlJywgJ2FycmF5JykgOiAnc2NhbGVkJztcblxuICAgIGlmKGNvb3JkVHlwZSA9PT0gJ3NjYWxlZCcpIHtcbiAgICAgICAgY29lcmNlKGNvb3JkU3RyICsgJzAnKTtcbiAgICAgICAgY29lcmNlKCdkJyArIGNvb3JkU3RyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29vcmQ7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRaKHopIHtcbiAgICB2YXIgYWxsUm93c0FyZUFycmF5cyA9IHRydWU7XG4gICAgdmFyIG9uZVJvd0lzRmlsbGVkID0gZmFsc2U7XG4gICAgdmFyIGhhc09uZU51bWJlciA9IGZhbHNlO1xuICAgIHZhciB6aTtcblxuICAgIC8qXG4gICAgICogV2l0aG91dCB0aGlzIHN0ZXA6XG4gICAgICpcbiAgICAgKiBoYXNPbmVOdW1iZXIgPSBmYWxzZSBicmVha3MgY29udG91ciBidXQgbm90IGhlYXRtYXBcbiAgICAgKiBhbGxSb3dzQXJlQXJyYXlzID0gZmFsc2UgYnJlYWtzIGNvbnRvdXIgYnV0IG5vdCBoZWF0bWFwXG4gICAgICogb25lUm93SXNGaWxsZWQgPSBmYWxzZSBicmVha3MgYm90aFxuICAgICAqL1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgemkgPSB6W2ldO1xuICAgICAgICBpZighTGliLmlzQXJyYXlPclR5cGVkQXJyYXkoemkpKSB7XG4gICAgICAgICAgICBhbGxSb3dzQXJlQXJyYXlzID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZih6aS5sZW5ndGggPiAwKSBvbmVSb3dJc0ZpbGxlZCA9IHRydWU7XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB6aS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYoaXNOdW1lcmljKHppW2pdKSkge1xuICAgICAgICAgICAgICAgIGhhc09uZU51bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKGFsbFJvd3NBcmVBcnJheXMgJiYgb25lUm93SXNGaWxsZWQgJiYgaGFzT25lTnVtYmVyKTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBoYW5kbGVTYW1wbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4vc2FtcGxlX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlU3R5bGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvc3R5bGVfZGVmYXVsdHMnKTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgaGFuZGxlU2FtcGxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0KTtcbiAgICBpZih0cmFjZU91dC52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgaGFuZGxlU3R5bGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICcnLCBjTGV0dGVyOiAneid9KTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhlYXRtYXBIb3ZlciA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvaG92ZXInKTtcbnZhciBob3ZlckxhYmVsVGV4dCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJykuaG92ZXJMYWJlbFRleHQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUsIGhvdmVyTGF5ZXIsIGNvbnRvdXIpIHtcbiAgICB2YXIgcHRzID0gaGVhdG1hcEhvdmVyKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlLCBob3ZlckxheWVyLCBjb250b3VyKTtcblxuICAgIGlmKCFwdHMpIHJldHVybjtcblxuICAgIHBvaW50RGF0YSA9IHB0c1swXTtcbiAgICB2YXIgaW5kaWNlcyA9IHBvaW50RGF0YS5pbmRleDtcbiAgICB2YXIgbnkgPSBpbmRpY2VzWzBdO1xuICAgIHZhciBueCA9IGluZGljZXNbMV07XG4gICAgdmFyIGNkMCA9IHBvaW50RGF0YS5jZFswXTtcbiAgICB2YXIgeFJhbmdlID0gY2QwLnhSYW5nZXNbbnhdO1xuICAgIHZhciB5UmFuZ2UgPSBjZDAueVJhbmdlc1tueV07XG5cbiAgICBwb2ludERhdGEueExhYmVsID0gaG92ZXJMYWJlbFRleHQocG9pbnREYXRhLnhhLCB4UmFuZ2VbMF0sIHhSYW5nZVsxXSk7XG4gICAgcG9pbnREYXRhLnlMYWJlbCA9IGhvdmVyTGFiZWxUZXh0KHBvaW50RGF0YS55YSwgeVJhbmdlWzBdLCB5UmFuZ2VbMV0pO1xuXG4gICAgcmV0dXJuIHB0cztcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY3Jvc3NUcmFjZURlZmF1bHRzOiByZXF1aXJlKCcuLi9oaXN0b2dyYW0vY3Jvc3NfdHJhY2VfZGVmYXVsdHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuLi9oZWF0bWFwL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuLi9oZWF0bWFwL3Bsb3QnKSxcbiAgICBsYXllck5hbWU6ICdoZWF0bWFwbGF5ZXInLFxuICAgIGNvbG9yYmFyOiByZXF1aXJlKCcuLi9oZWF0bWFwL2NvbG9yYmFyJyksXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4uL2hlYXRtYXAvc3R5bGUnKSxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi4vaGlzdG9ncmFtL2V2ZW50X2RhdGEnKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ2hpc3RvZ3JhbTJkJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydjYXJ0ZXNpYW4nLCAnc3ZnJywgJzJkTWFwJywgJ2hpc3RvZ3JhbScsICdzaG93TGVnZW5kJ10sXG4gICAgbWV0YToge1xuICAgICAgICBock5hbWU6ICdoaXN0b2dyYW1fMmQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBzYW1wbGUgZGF0YSBmcm9tIHdoaWNoIHN0YXRpc3RpY3MgYXJlIGNvbXB1dGVkIGlzIHNldCBpbiBgeGAnLFxuICAgICAgICAgICAgJ2FuZCBgeWAgKHdoZXJlIGB4YCBhbmQgYHlgIHJlcHJlc2VudCBtYXJnaW5hbCBkaXN0cmlidXRpb25zLCcsXG4gICAgICAgICAgICAnYmlubmluZyBpcyBzZXQgaW4gYHhiaW5zYCBhbmQgYHliaW5zYCBpbiB0aGlzIGNhc2UpJyxcbiAgICAgICAgICAgICdvciBgemAgKHdoZXJlIGB6YCByZXByZXNlbnQgdGhlIDJEIGRpc3RyaWJ1dGlvbiBhbmQgYmlubmluZyBzZXQsJyxcbiAgICAgICAgICAgICdiaW5uaW5nIGlzIHNldCBieSBgeGAgYW5kIGB5YCBpbiB0aGlzIGNhc2UpLicsXG4gICAgICAgICAgICAnVGhlIHJlc3VsdGluZyBkaXN0cmlidXRpb24gaXMgdmlzdWFsaXplZCBhcyBhIGhlYXRtYXAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwbG90cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3Bsb3RzJyk7XG5cbmV4cG9ydHMubmFtZSA9ICdwaWUnO1xuXG5leHBvcnRzLnBsb3QgPSBmdW5jdGlvbihnZCwgdHJhY2VzLCB0cmFuc2l0aW9uT3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgIHBsb3RzLnBsb3RCYXNlUGxvdChleHBvcnRzLm5hbWUsIGdkLCB0cmFjZXMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydHMuY2xlYW4gPSBmdW5jdGlvbihuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpIHtcbiAgICBwbG90cy5jbGVhbkJhc2VQbG90KGV4cG9ydHMubmFtZSwgbmV3RnVsbERhdGEsIG5ld0Z1bGxMYXlvdXQsIG9sZEZ1bGxEYXRhLCBvbGRGdWxsTGF5b3V0KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2RvbWFpbicpLmRlZmF1bHRzO1xudmFyIGhhbmRsZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvZGVmYXVsdHMnKS5oYW5kbGVUZXh0O1xuXG5mdW5jdGlvbiBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZXMpIHtcbiAgICB2YXIgaGFzTGFiZWxzID0gQXJyYXkuaXNBcnJheShsYWJlbHMpO1xuICAgIHZhciBoYXNWYWx1ZXMgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh2YWx1ZXMpO1xuICAgIHZhciBsZW4gPSBNYXRoLm1pbihcbiAgICAgICAgaGFzTGFiZWxzID8gbGFiZWxzLmxlbmd0aCA6IEluZmluaXR5LFxuICAgICAgICBoYXNWYWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogSW5maW5pdHlcbiAgICApO1xuXG4gICAgaWYoIWlzRmluaXRlKGxlbikpIGxlbiA9IDA7XG5cbiAgICBpZihsZW4gJiYgaGFzVmFsdWVzKSB7XG4gICAgICAgIHZhciBoYXNQb3NpdGl2ZTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHZhbHVlc1tpXTtcbiAgICAgICAgICAgIGlmKGlzTnVtZXJpYyh2KSAmJiB2ID4gMCkge1xuICAgICAgICAgICAgICAgIGhhc1Bvc2l0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighaGFzUG9zaXRpdmUpIGxlbiA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGFzTGFiZWxzOiBoYXNMYWJlbHMsXG4gICAgICAgIGhhc1ZhbHVlczogaGFzVmFsdWVzLFxuICAgICAgICBsZW46IGxlblxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGFiZWxzID0gY29lcmNlKCdsYWJlbHMnKTtcbiAgICB2YXIgdmFsdWVzID0gY29lcmNlKCd2YWx1ZXMnKTtcblxuICAgIHZhciByZXMgPSBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZXMpO1xuICAgIHZhciBsZW4gPSByZXMubGVuO1xuICAgIHRyYWNlT3V0Ll9oYXNMYWJlbHMgPSByZXMuaGFzTGFiZWxzO1xuICAgIHRyYWNlT3V0Ll9oYXNWYWx1ZXMgPSByZXMuaGFzVmFsdWVzO1xuXG4gICAgaWYoIXRyYWNlT3V0Ll9oYXNMYWJlbHMgJiZcbiAgICAgICAgdHJhY2VPdXQuX2hhc1ZhbHVlc1xuICAgICkge1xuICAgICAgICBjb2VyY2UoJ2xhYmVsMCcpO1xuICAgICAgICBjb2VyY2UoJ2RsYWJlbCcpO1xuICAgIH1cblxuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICB2YXIgbGluZVdpZHRoID0gY29lcmNlKCdtYXJrZXIubGluZS53aWR0aCcpO1xuICAgIGlmKGxpbmVXaWR0aCkgY29lcmNlKCdtYXJrZXIubGluZS5jb2xvcicpO1xuXG4gICAgY29lcmNlKCdtYXJrZXIuY29sb3JzJyk7XG5cbiAgICBjb2VyY2UoJ3NjYWxlZ3JvdXAnKTtcbiAgICAvLyBUT0RPOiBob2xlIG5lZWRzIHRvIGJlIGNvZXJjZWQgdG8gdGhlIHNhbWUgdmFsdWUgd2l0aGluIGEgc2NhbGVlZ3JvdXBcblxuICAgIHZhciB0ZXh0RGF0YSA9IGNvZXJjZSgndGV4dCcpO1xuICAgIHZhciB0ZXh0VGVtcGxhdGUgPSBjb2VyY2UoJ3RleHR0ZW1wbGF0ZScpO1xuICAgIHZhciB0ZXh0SW5mbztcbiAgICBpZighdGV4dFRlbXBsYXRlKSB0ZXh0SW5mbyA9IGNvZXJjZSgndGV4dGluZm8nLCBBcnJheS5pc0FycmF5KHRleHREYXRhKSA/ICd0ZXh0K3BlcmNlbnQnIDogJ3BlcmNlbnQnKTtcblxuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICBpZih0ZXh0VGVtcGxhdGUgfHwgKHRleHRJbmZvICYmIHRleHRJbmZvICE9PSAnbm9uZScpKSB7XG4gICAgICAgIHZhciB0ZXh0cG9zaXRpb24gPSBjb2VyY2UoJ3RleHRwb3NpdGlvbicpO1xuICAgICAgICBoYW5kbGVUZXh0KHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgdGV4dHBvc2l0aW9uLCB7XG4gICAgICAgICAgICBtb2R1bGVIYXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNVbnNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZHVsZUhhc0NvbnN0cmFpbjogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNDbGlwb25heGlzOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZHVsZUhhc1RleHRhbmdsZTogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNJbnNpZGVhbmNob3I6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBoYXNCb3RoID0gQXJyYXkuaXNBcnJheSh0ZXh0cG9zaXRpb24pIHx8IHRleHRwb3NpdGlvbiA9PT0gJ2F1dG8nO1xuICAgICAgICB2YXIgaGFzT3V0c2lkZSA9IGhhc0JvdGggfHwgdGV4dHBvc2l0aW9uID09PSAnb3V0c2lkZSc7XG4gICAgICAgIGlmKGhhc091dHNpZGUpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnYXV0b21hcmdpbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGV4dHBvc2l0aW9uID09PSAnaW5zaWRlJyB8fCB0ZXh0cG9zaXRpb24gPT09ICdhdXRvJyB8fCBBcnJheS5pc0FycmF5KHRleHRwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnaW5zaWRldGV4dG9yaWVudGF0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEb21haW5EZWZhdWx0cyh0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuXG4gICAgdmFyIGhvbGUgPSBjb2VyY2UoJ2hvbGUnKTtcbiAgICB2YXIgdGl0bGUgPSBjb2VyY2UoJ3RpdGxlLnRleHQnKTtcbiAgICBpZih0aXRsZSkge1xuICAgICAgICB2YXIgdGl0bGVQb3NpdGlvbiA9IGNvZXJjZSgndGl0bGUucG9zaXRpb24nLCBob2xlID8gJ21pZGRsZSBjZW50ZXInIDogJ3RvcCBjZW50ZXInKTtcbiAgICAgICAgaWYoIWhvbGUgJiYgdGl0bGVQb3NpdGlvbiA9PT0gJ21pZGRsZSBjZW50ZXInKSB0cmFjZU91dC50aXRsZS5wb3NpdGlvbiA9ICd0b3AgY2VudGVyJztcbiAgICAgICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAndGl0bGUuZm9udCcsIGxheW91dC5mb250KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3NvcnQnKTtcbiAgICBjb2VyY2UoJ2RpcmVjdGlvbicpO1xuICAgIGNvZXJjZSgncm90YXRpb24nKTtcbiAgICBjb2VyY2UoJ3B1bGwnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaGFuZGxlTGFiZWxzQW5kVmFsdWVzOiBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMsXG4gICAgc3VwcGx5RGVmYXVsdHM6IHN1cHBseURlZmF1bHRzXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLnN1cHBseURlZmF1bHRzLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcblxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLmNhbGMsXG4gICAgY3Jvc3NUcmFjZUNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLmNyb3NzVHJhY2VDYWxjLFxuXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JykucGxvdCxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuICAgIHN0eWxlT25lOiByZXF1aXJlKCcuL3N0eWxlX29uZScpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAncGllJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi9iYXNlX3Bsb3QnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ3BpZS1saWtlJywgJ3BpZScsICdzaG93TGVnZW5kJ10sXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0EgZGF0YSB2aXN1YWxpemVkIGJ5IHRoZSBzZWN0b3JzIG9mIHRoZSBwaWUgaXMgc2V0IGluIGB2YWx1ZXNgLicsXG4gICAgICAgICAgICAnVGhlIHNlY3RvciBsYWJlbHMgYXJlIHNldCBpbiBgbGFiZWxzYC4nLFxuICAgICAgICAgICAgJ1RoZSBzZWN0b3IgY29sb3JzIGFyZSBzZXQgaW4gYG1hcmtlci5jb2xvcnNgJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGhpZGRlbmxhYmVsczoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdoaWRkZW5sYWJlbHMgaXMgdGhlIGZ1bm5lbGFyZWEgJiBwaWUgY2hhcnQgYW5hbG9nIG9mJyxcbiAgICAgICAgICAgICd2aXNpYmxlOlxcJ2xlZ2VuZG9ubHlcXCcnLFxuICAgICAgICAgICAgJ2J1dCBpdCBjYW4gY29udGFpbiBtYW55IGxhYmVscywgYW5kIGNhbiBzaW11bHRhbmVvdXNseScsXG4gICAgICAgICAgICAnaGlkZSBzbGljZXMgZnJvbSBzZXZlcmFsIHBpZXMvZnVubmVsYXJlYSBjaGFydHMnXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBwaWVjb2xvcndheToge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3JsaXN0JyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBkZWZhdWx0IHBpZSBzbGljZSBjb2xvcnMuIERlZmF1bHRzIHRvIHRoZSBtYWluJyxcbiAgICAgICAgICAgICdgY29sb3J3YXlgIHVzZWQgZm9yIHRyYWNlIGNvbG9ycy4gSWYgeW91IHNwZWNpZnkgYSBuZXcnLFxuICAgICAgICAgICAgJ2xpc3QgaGVyZSBpdCBjYW4gc3RpbGwgYmUgZXh0ZW5kZWQgd2l0aCBsaWdodGVyIGFuZCBkYXJrZXInLFxuICAgICAgICAgICAgJ2NvbG9ycywgc2VlIGBleHRlbmRwaWVjb2xvcnNgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGV4dGVuZHBpZWNvbG9yczoge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgYHRydWVgLCB0aGUgcGllIHNsaWNlIGNvbG9ycyAod2hldGhlciBnaXZlbiBieSBgcGllY29sb3J3YXlgIG9yJyxcbiAgICAgICAgICAgICdpbmhlcml0ZWQgZnJvbSBgY29sb3J3YXlgKSB3aWxsIGJlIGV4dGVuZGVkIHRvIHRocmVlIHRpbWVzIGl0cycsXG4gICAgICAgICAgICAnb3JpZ2luYWwgbGVuZ3RoIGJ5IGZpcnN0IHJlcGVhdGluZyBldmVyeSBjb2xvciAyMCUgbGlnaHRlciB0aGVuJyxcbiAgICAgICAgICAgICdlYWNoIGNvbG9yIDIwJSBkYXJrZXIuIFRoaXMgaXMgaW50ZW5kZWQgdG8gcmVkdWNlIHRoZSBsaWtlbGlob29kJyxcbiAgICAgICAgICAgICdvZiByZXVzaW5nIHRoZSBzYW1lIGNvbG9yIHdoZW4geW91IGhhdmUgbWFueSBzbGljZXMsIGJ1dCB5b3UgY2FuJyxcbiAgICAgICAgICAgICdzZXQgYGZhbHNlYCB0byBkaXNhYmxlLicsXG4gICAgICAgICAgICAnQ29sb3JzIHByb3ZpZGVkIGluIHRoZSB0cmFjZSwgdXNpbmcgYG1hcmtlci5jb2xvcnNgLCBhcmUgbmV2ZXInLFxuICAgICAgICAgICAgJ2V4dGVuZGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBsYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseUxheW91dERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShsYXlvdXRJbiwgbGF5b3V0T3V0LCBsYXlvdXRBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2hpZGRlbmxhYmVscycpO1xuICAgIGNvZXJjZSgncGllY29sb3J3YXknLCBsYXlvdXRPdXQuY29sb3J3YXkpO1xuICAgIGNvZXJjZSgnZXh0ZW5kcGllY29sb3JzJyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgc3R5bGVPbmUgPSByZXF1aXJlKCcuL3N0eWxlX29uZScpO1xudmFyIHJlc2l6ZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvdW5pZm9ybV90ZXh0JykucmVzaXplVGV4dDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHlsZShnZCkge1xuICAgIHZhciBzID0gZ2QuX2Z1bGxMYXlvdXQuX3BpZWxheWVyLnNlbGVjdEFsbCgnLnRyYWNlJyk7XG4gICAgcmVzaXplVGV4dChnZCwgcywgJ3BpZScpO1xuXG4gICAgcy5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuICAgICAgICB2YXIgdHJhY2VTZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgdHJhY2VTZWxlY3Rpb24uc3R5bGUoe29wYWNpdHk6IHRyYWNlLm9wYWNpdHl9KTtcblxuICAgICAgICB0cmFjZVNlbGVjdGlvbi5zZWxlY3RBbGwoJ3BhdGguc3VyZmFjZScpLmVhY2goZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKHN0eWxlT25lLCBwdCwgdHJhY2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9