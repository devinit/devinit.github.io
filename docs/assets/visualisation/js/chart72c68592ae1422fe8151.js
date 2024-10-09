(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_index-finance_js"],{

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

/***/ "./node_modules/plotly.js/lib/candlestick.js":
/*!***************************************************!*\
  !*** ./node_modules/plotly.js/lib/candlestick.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/candlestick */ "./node_modules/plotly.js/src/traces/candlestick/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/index-finance.js":
/*!*****************************************************!*\
  !*** ./node_modules/plotly.js/lib/index-finance.js ***!
  \*****************************************************/
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
    __webpack_require__(/*! ./histogram */ "./node_modules/plotly.js/lib/histogram.js"),
    __webpack_require__(/*! ./pie */ "./node_modules/plotly.js/lib/pie.js"),
    __webpack_require__(/*! ./funnelarea */ "./node_modules/plotly.js/lib/funnelarea.js"),
    __webpack_require__(/*! ./ohlc */ "./node_modules/plotly.js/lib/ohlc.js"),
    __webpack_require__(/*! ./candlestick */ "./node_modules/plotly.js/lib/candlestick.js"),
    __webpack_require__(/*! ./funnel */ "./node_modules/plotly.js/lib/funnel.js"),
    __webpack_require__(/*! ./waterfall */ "./node_modules/plotly.js/lib/waterfall.js"),
    __webpack_require__(/*! ./indicator */ "./node_modules/plotly.js/lib/indicator.js")
]);

module.exports = Plotly;


/***/ }),

/***/ "./node_modules/plotly.js/lib/ohlc.js":
/*!********************************************!*\
  !*** ./node_modules/plotly.js/lib/ohlc.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/ohlc */ "./node_modules/plotly.js/src/traces/ohlc/index.js");


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

/***/ "./node_modules/plotly.js/src/traces/candlestick/attributes.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/candlestick/attributes.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var extendFlat = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").extendFlat;
var OHLCattrs = __webpack_require__(/*! ../ohlc/attributes */ "./node_modules/plotly.js/src/traces/ohlc/attributes.js");
var boxAttrs = __webpack_require__(/*! ../box/attributes */ "./node_modules/plotly.js/src/traces/box/attributes.js");

function directionAttrs(lineColorDefault) {
    return {
        line: {
            color: extendFlat({}, boxAttrs.line.color, {dflt: lineColorDefault}),
            width: boxAttrs.line.width,
            editType: 'style'
        },

        fillcolor: boxAttrs.fillcolor,
        editType: 'style'
    };
}

module.exports = {
    x: OHLCattrs.x,
    open: OHLCattrs.open,
    high: OHLCattrs.high,
    low: OHLCattrs.low,
    close: OHLCattrs.close,

    line: {
        width: extendFlat({}, boxAttrs.line.width, {
            description: [
                boxAttrs.line.width.description,
                'Note that this style setting can also be set per',
                'direction via `increasing.line.width` and',
                '`decreasing.line.width`.'
            ].join(' ')
        }),
        editType: 'style'
    },

    increasing: directionAttrs(OHLCattrs.increasing.line.color.dflt),

    decreasing: directionAttrs(OHLCattrs.decreasing.line.color.dflt),

    text: OHLCattrs.text,
    hovertext: OHLCattrs.hovertext,
    whiskerwidth: extendFlat({}, boxAttrs.whiskerwidth, { dflt: 0 }),

    hoverlabel: OHLCattrs.hoverlabel,
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/candlestick/calc.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/candlestick/calc.js ***!
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
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

var calcCommon = __webpack_require__(/*! ../ohlc/calc */ "./node_modules/plotly.js/src/traces/ohlc/calc.js").calcCommon;

module.exports = function(gd, trace) {
    var fullLayout = gd._fullLayout;
    var xa = Axes.getFromId(gd, trace.xaxis);
    var ya = Axes.getFromId(gd, trace.yaxis);

    var x = xa.makeCalcdata(trace, 'x');

    var cd = calcCommon(gd, trace, x, ya, ptFunc);

    if(cd.length) {
        Lib.extendFlat(cd[0].t, {
            num: fullLayout._numBoxes,
            dPos: Lib.distinctVals(x).minDiff / 2,
            posLetter: 'x',
            valLetter: 'y',
        });

        fullLayout._numBoxes++;
        return cd;
    } else {
        return [{t: {empty: true}}];
    }
};

function ptFunc(o, h, l, c) {
    return {
        min: l,
        q1: Math.min(o, c),
        med: c,
        q3: Math.max(o, c),
        max: h,
    };
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/candlestick/defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/candlestick/defaults.js ***!
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var handleOHLC = __webpack_require__(/*! ../ohlc/ohlc_defaults */ "./node_modules/plotly.js/src/traces/ohlc/ohlc_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/candlestick/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleOHLC(traceIn, traceOut, coerce, layout);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('line.width');

    handleDirection(traceIn, traceOut, coerce, 'increasing');
    handleDirection(traceIn, traceOut, coerce, 'decreasing');

    coerce('text');
    coerce('hovertext');
    coerce('whiskerwidth');

    layout._requestRangeslider[traceOut.xaxis] = true;
};

function handleDirection(traceIn, traceOut, coerce, direction) {
    var lineColor = coerce(direction + '.line.color');
    coerce(direction + '.line.width', traceOut.line.width);
    coerce(direction + '.fillcolor', Color.addOpacity(lineColor, 0.5));
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/candlestick/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/candlestick/index.js ***!
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
    moduleType: 'trace',
    name: 'candlestick',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', 'showLegend', 'candlestick', 'boxLayout'],
    meta: {
        description: [
            'The candlestick is a style of financial chart describing',
            'open, high, low and close for a given `x` coordinate (most likely time).',

            'The boxes represent the spread between the `open` and `close` values and',
            'the lines represent the spread between the `low` and `high` values',

            'Sample points where the close value is higher (lower) then the open',
            'value are called increasing (decreasing).',

            'By default, increasing candles are drawn in green whereas',
            'decreasing are drawn in red.'
        ].join(' ')
    },

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/candlestick/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ../box/layout_attributes */ "./node_modules/plotly.js/src/traces/box/layout_attributes.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ../box/layout_defaults */ "./node_modules/plotly.js/src/traces/box/layout_defaults.js").supplyLayoutDefaults,
    crossTraceCalc: __webpack_require__(/*! ../box/cross_trace_calc */ "./node_modules/plotly.js/src/traces/box/cross_trace_calc.js").crossTraceCalc,
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/candlestick/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/candlestick/calc.js"),
    plot: __webpack_require__(/*! ../box/plot */ "./node_modules/plotly.js/src/traces/box/plot.js").plot,
    layerName: 'boxlayer',
    style: __webpack_require__(/*! ../box/style */ "./node_modules/plotly.js/src/traces/box/style.js").style,
    hoverPoints: __webpack_require__(/*! ../ohlc/hover */ "./node_modules/plotly.js/src/traces/ohlc/hover.js").hoverPoints,
    selectPoints: __webpack_require__(/*! ../ohlc/select */ "./node_modules/plotly.js/src/traces/ohlc/select.js")
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/defaults.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var handleOHLC = __webpack_require__(/*! ./ohlc_defaults */ "./node_modules/plotly.js/src/traces/ohlc/ohlc_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/ohlc/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleOHLC(traceIn, traceOut, coerce, layout);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('line.width');
    coerce('line.dash');

    handleDirection(traceIn, traceOut, coerce, 'increasing');
    handleDirection(traceIn, traceOut, coerce, 'decreasing');

    coerce('text');
    coerce('hovertext');
    coerce('tickwidth');

    layout._requestRangeslider[traceOut.xaxis] = true;
};

function handleDirection(traceIn, traceOut, coerce, direction) {
    coerce(direction + '.line.color');
    coerce(direction + '.line.width', traceOut.line.width);
    coerce(direction + '.line.dash', traceOut.line.dash);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/index.js ***!
  \*********************************************************/
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
    name: 'ohlc',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', 'showLegend'],
    meta: {
        description: [
            'The ohlc (short for Open-High-Low-Close) is a style of financial chart describing',
            'open, high, low and close for a given `x` coordinate (most likely time).',

            'The tip of the lines represent the `low` and `high` values and',
            'the horizontal segments represent the `open` and `close` values.',

            'Sample points where the close value is higher (lower) then the open',
            'value are called increasing (decreasing).',

            'By default, increasing items are drawn in green whereas',
            'decreasing are drawn in red.'
        ].join(' ')
    },

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/ohlc/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/ohlc/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/ohlc/calc.js").calc,
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/ohlc/plot.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/ohlc/style.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/ohlc/hover.js").hoverPoints,
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/ohlc/select.js")
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/plot.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/plot.js ***!
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

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

module.exports = function plot(gd, plotinfo, cdOHLC, ohlcLayer) {
    var ya = plotinfo.yaxis;
    var xa = plotinfo.xaxis;
    var posHasRangeBreaks = !!xa.rangebreaks;

    Lib.makeTraceGroups(ohlcLayer, cdOHLC, 'trace ohlc').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var t = cd0.t;
        var trace = cd0.trace;

        if(trace.visible !== true || t.empty) {
            plotGroup.remove();
            return;
        }

        var tickLen = t.tickLen;

        var paths = plotGroup.selectAll('path').data(Lib.identity);

        paths.enter().append('path');

        paths.exit().remove();

        paths.attr('d', function(d) {
            if(d.empty) return 'M0,0Z';

            var xo = xa.c2p(d.pos - tickLen, true);
            var xc = xa.c2p(d.pos + tickLen, true);
            var x = posHasRangeBreaks ? (xo + xc) / 2 : xa.c2p(d.pos, true);

            var yo = ya.c2p(d.o, true);
            var yh = ya.c2p(d.h, true);
            var yl = ya.c2p(d.l, true);
            var yc = ya.c2p(d.c, true);

            return 'M' + xo + ',' + yo + 'H' + x +
                'M' + x + ',' + yh + 'V' + yl +
                'M' + xc + ',' + yc + 'H' + x;
        });
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/style.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/style.js ***!
  \*********************************************************/
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

module.exports = function style(gd, cd, sel) {
    var s = sel ? sel : d3.select(gd).selectAll('g.ohlclayer').selectAll('g.trace');

    s.style('opacity', function(d) {
        return d[0].trace.opacity;
    });

    s.each(function(d) {
        var trace = d[0].trace;

        d3.select(this).selectAll('path').each(function(di) {
            if(di.empty) return;

            var dirLine = trace[di.dir].line;
            d3.select(this)
                .style('fill', 'none')
                .call(Color.stroke, dirLine.color)
                .call(Drawing.dashLine, dirLine.dash, dirLine.width)
                // TODO: custom selection style for OHLC
                .style('opacity', trace.selectedpoints && !di.selected ? 0.3 : 1);
        });
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvYmFyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL2xpYi9jYW5kbGVzdGljay5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaW5kZXgtZmluYW5jZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvb2hsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvcGllLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvZXZlbnRfZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2JveC9zdHlsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhbmRsZXN0aWNrL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jYW5kbGVzdGljay9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FuZGxlc3RpY2svZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jYW5kbGVzdGljay9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL29obGMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9vaGxjL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvb2hsYy9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvb2hsYy9zdHlsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9iYXNlX3Bsb3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9waWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9waWUvbGF5b3V0X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGllL3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGlIQUE2Qzs7Ozs7Ozs7Ozs7O0FDVjdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGlJQUFxRDs7Ozs7Ozs7Ozs7O0FDVnJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGFBQWEsbUJBQU8sQ0FBQyxvREFBUTs7QUFFN0I7QUFDQSxJ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O0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMIiwiZmlsZSI6ImNoYXJ0NzJjNjg1OTJhZTE0MjJmZTgxNTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9iYXInKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL2NhbmRsZXN0aWNrJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQbG90bHkgPSByZXF1aXJlKCcuL2NvcmUnKTtcblxuUGxvdGx5LnJlZ2lzdGVyKFtcbiAgICByZXF1aXJlKCcuL2JhcicpLFxuICAgIHJlcXVpcmUoJy4vaGlzdG9ncmFtJyksXG4gICAgcmVxdWlyZSgnLi9waWUnKSxcbiAgICByZXF1aXJlKCcuL2Z1bm5lbGFyZWEnKSxcbiAgICByZXF1aXJlKCcuL29obGMnKSxcbiAgICByZXF1aXJlKCcuL2NhbmRsZXN0aWNrJyksXG4gICAgcmVxdWlyZSgnLi9mdW5uZWwnKSxcbiAgICByZXF1aXJlKCcuL3dhdGVyZmFsbCcpLFxuICAgIHJlcXVpcmUoJy4vaW5kaWNhdG9yJylcbl0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsb3RseTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL29obGMnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL3BpZScpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlQ2FsYyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9jYWxjJyk7XG52YXIgYXJyYXlzVG9DYWxjZGF0YSA9IHJlcXVpcmUoJy4vYXJyYXlzX3RvX2NhbGNkYXRhJyk7XG52YXIgY2FsY1NlbGVjdGlvbiA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvY2FsY19zZWxlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciB4YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS54YXhpcyB8fCAneCcpO1xuICAgIHZhciB5YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS55YXhpcyB8fCAneScpO1xuICAgIHZhciBzaXplLCBwb3M7XG5cbiAgICB2YXIgc2l6ZU9wdHMgPSB7XG4gICAgICAgIG1zVVRDOiAhISh0cmFjZS5iYXNlIHx8IHRyYWNlLmJhc2UgPT09IDApXG4gICAgfTtcblxuICAgIGlmKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgc2l6ZSA9IHhhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3gnLCBzaXplT3B0cyk7XG4gICAgICAgIHBvcyA9IHlhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3knKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaXplID0geWEubWFrZUNhbGNkYXRhKHRyYWNlLCAneScsIHNpemVPcHRzKTtcbiAgICAgICAgcG9zID0geGEubWFrZUNhbGNkYXRhKHRyYWNlLCAneCcpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0aGUgXCJjYWxjdWxhdGVkIGRhdGFcIiB0byBwbG90XG4gICAgdmFyIHNlcmllc2xlbiA9IE1hdGgubWluKHBvcy5sZW5ndGgsIHNpemUubGVuZ3RoKTtcbiAgICB2YXIgY2QgPSBuZXcgQXJyYXkoc2VyaWVzbGVuKTtcblxuICAgIC8vIHNldCBwb3NpdGlvbiBhbmQgc2l6ZVxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZXJpZXNsZW47IGkrKykge1xuICAgICAgICBjZFtpXSA9IHsgcDogcG9zW2ldLCBzOiBzaXplW2ldIH07XG5cbiAgICAgICAgaWYodHJhY2UuaWRzKSB7XG4gICAgICAgICAgICBjZFtpXS5pZCA9IFN0cmluZyh0cmFjZS5pZHNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYXV0by16IGFuZCBhdXRvY29sb3JzY2FsZSBpZiBhcHBsaWNhYmxlXG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ21hcmtlcicpKSB7XG4gICAgICAgIGNvbG9yc2NhbGVDYWxjKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgdmFsczogdHJhY2UubWFya2VyLmNvbG9yLFxuICAgICAgICAgICAgY29udGFpbmVyU3RyOiAnbWFya2VyJyxcbiAgICAgICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ21hcmtlci5saW5lJykpIHtcbiAgICAgICAgY29sb3JzY2FsZUNhbGMoZ2QsIHRyYWNlLCB7XG4gICAgICAgICAgICB2YWxzOiB0cmFjZS5tYXJrZXIubGluZS5jb2xvcixcbiAgICAgICAgICAgIGNvbnRhaW5lclN0cjogJ21hcmtlci5saW5lJyxcbiAgICAgICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhcnJheXNUb0NhbGNkYXRhKGNkLCB0cmFjZSk7XG4gICAgY2FsY1NlbGVjdGlvbihjZCwgdHJhY2UpO1xuXG4gICAgcmV0dXJuIGNkO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBldmVudERhdGEob3V0LCBwdCwgdHJhY2UpIHtcbiAgICAvLyBzdGFuZGFyZCBjYXJ0ZXNpYW4gZXZlbnQgZGF0YVxuICAgIG91dC54ID0gJ3hWYWwnIGluIHB0ID8gcHQueFZhbCA6IHB0Lng7XG4gICAgb3V0LnkgPSAneVZhbCcgaW4gcHQgPyBwdC55VmFsIDogcHQueTtcbiAgICBpZihwdC54YSkgb3V0LnhheGlzID0gcHQueGE7XG4gICAgaWYocHQueWEpIG91dC55YXhpcyA9IHB0LnlhO1xuXG4gICAgaWYodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICBvdXQubGFiZWwgPSBvdXQueTtcbiAgICAgICAgb3V0LnZhbHVlID0gb3V0Lng7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0LmxhYmVsID0gb3V0Lng7XG4gICAgICAgIG91dC52YWx1ZSA9IG91dC55O1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBsYXlvdXRBdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKS5zdXBwbHlEZWZhdWx0cyxcbiAgICBjcm9zc1RyYWNlRGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKS5jcm9zc1RyYWNlRGVmYXVsdHMsXG4gICAgc3VwcGx5TGF5b3V0RGVmYXVsdHM6IHJlcXVpcmUoJy4vbGF5b3V0X2RlZmF1bHRzJyksXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJyksXG4gICAgY3Jvc3NUcmFjZUNhbGM6IHJlcXVpcmUoJy4vY3Jvc3NfdHJhY2VfY2FsYycpLmNyb3NzVHJhY2VDYWxjLFxuICAgIGNvbG9yYmFyOiByZXF1aXJlKCcuLi9zY2F0dGVyL21hcmtlcl9jb2xvcmJhcicpLFxuICAgIGFycmF5c1RvQ2FsY2RhdGE6IHJlcXVpcmUoJy4vYXJyYXlzX3RvX2NhbGNkYXRhJyksXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JykucGxvdCxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlLFxuICAgIHN0eWxlT25TZWxlY3Q6IHJlcXVpcmUoJy4vc3R5bGUnKS5zdHlsZU9uU2VsZWN0LFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJykuaG92ZXJQb2ludHMsXG4gICAgZXZlbnREYXRhOiByZXF1aXJlKCcuL2V2ZW50X2RhdGEnKSxcbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4vc2VsZWN0JyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdiYXInLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4nKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2Jhci1saWtlJywgJ2NhcnRlc2lhbicsICdzdmcnLCAnYmFyJywgJ29yaWVudGVkJywgJ2Vycm9yQmFyc09LJywgJ3Nob3dMZWdlbmQnLCAnem9vbVNjYWxlJ10sXG4gICAgYW5pbWF0YWJsZTogdHJ1ZSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIGRhdGEgdmlzdWFsaXplZCBieSB0aGUgc3BhbiBvZiB0aGUgYmFycyBpcyBzZXQgaW4gYHlgJyxcbiAgICAgICAgICAgICdpZiBgb3JpZW50YXRpb25gIGlzIHNldCB0aCAqdiogKHRoZSBkZWZhdWx0KScsXG4gICAgICAgICAgICAnYW5kIHRoZSBsYWJlbHMgYXJlIHNldCBpbiBgeGAuJyxcbiAgICAgICAgICAgICdCeSBzZXR0aW5nIGBvcmllbnRhdGlvbmAgdG8gKmgqLCB0aGUgcm9sZXMgYXJlIGludGVyY2hhbmdlZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG5cbmZ1bmN0aW9uIHN0eWxlKGdkLCBjZCwgc2VsKSB7XG4gICAgdmFyIHMgPSBzZWwgPyBzZWwgOiBkMy5zZWxlY3QoZ2QpLnNlbGVjdEFsbCgnZy50cmFjZS5ib3hlcycpO1xuXG4gICAgcy5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRbMF0udHJhY2Uub3BhY2l0eTsgfSk7XG5cbiAgICBzLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciB0cmFjZSA9IGRbMF0udHJhY2U7XG4gICAgICAgIHZhciBsaW5lV2lkdGggPSB0cmFjZS5saW5lLndpZHRoO1xuXG4gICAgICAgIGZ1bmN0aW9uIHN0eWxlQm94KGJveFNlbCwgbGluZVdpZHRoLCBsaW5lQ29sb3IsIGZpbGxDb2xvcikge1xuICAgICAgICAgICAgYm94U2VsLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBsaW5lV2lkdGggKyAncHgnKVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgbGluZUNvbG9yKVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLmZpbGwsIGZpbGxDb2xvcik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWxsQm94ZXMgPSBlbC5zZWxlY3RBbGwoJ3BhdGguYm94Jyk7XG5cbiAgICAgICAgaWYodHJhY2UudHlwZSA9PT0gJ2NhbmRsZXN0aWNrJykge1xuICAgICAgICAgICAgYWxsQm94ZXMuZWFjaChmdW5jdGlvbihib3hEYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYoYm94RGF0YS5lbXB0eSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRoaXNCb3ggPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRyYWNlW2JveERhdGEuZGlyXTsgLy8gZGlyID0gJ2luY3JlYXNpbmcnIG9yICdkZWNyZWFzaW5nJ1xuICAgICAgICAgICAgICAgIHN0eWxlQm94KHRoaXNCb3gsIGNvbnRhaW5lci5saW5lLndpZHRoLCBjb250YWluZXIubGluZS5jb2xvciwgY29udGFpbmVyLmZpbGxjb2xvcik7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogY3VzdG9tIHNlbGVjdGlvbiBzdHlsZSBmb3IgY2FuZGxlc3RpY2tzXG4gICAgICAgICAgICAgICAgdGhpc0JveC5zdHlsZSgnb3BhY2l0eScsIHRyYWNlLnNlbGVjdGVkcG9pbnRzICYmICFib3hEYXRhLnNlbGVjdGVkID8gMC4zIDogMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlQm94KGFsbEJveGVzLCBsaW5lV2lkdGgsIHRyYWNlLmxpbmUuY29sb3IsIHRyYWNlLmZpbGxjb2xvcik7XG4gICAgICAgICAgICBlbC5zZWxlY3RBbGwoJ3BhdGgubWVhbicpXG4gICAgICAgICAgICAgICAgLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiAoMiAqIGxpbmVXaWR0aCkgKyAncHgsJyArIGxpbmVXaWR0aCArICdweCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgdHJhY2UubGluZS5jb2xvcik7XG5cbiAgICAgICAgICAgIHZhciBwdHMgPSBlbC5zZWxlY3RBbGwoJ3BhdGgucG9pbnQnKTtcbiAgICAgICAgICAgIERyYXdpbmcucG9pbnRTdHlsZShwdHMsIHRyYWNlLCBnZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3R5bGVPblNlbGVjdChnZCwgY2QsIHNlbCkge1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciBwdHMgPSBzZWwuc2VsZWN0QWxsKCdwYXRoLnBvaW50Jyk7XG5cbiAgICBpZih0cmFjZS5zZWxlY3RlZHBvaW50cykge1xuICAgICAgICBEcmF3aW5nLnNlbGVjdGVkUG9pbnRTdHlsZShwdHMsIHRyYWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBEcmF3aW5nLnBvaW50U3R5bGUocHRzLCB0cmFjZSwgZ2QpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIHN0eWxlT25TZWxlY3Q6IHN0eWxlT25TZWxlY3Rcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWInKS5leHRlbmRGbGF0O1xudmFyIE9ITENhdHRycyA9IHJlcXVpcmUoJy4uL29obGMvYXR0cmlidXRlcycpO1xudmFyIGJveEF0dHJzID0gcmVxdWlyZSgnLi4vYm94L2F0dHJpYnV0ZXMnKTtcblxuZnVuY3Rpb24gZGlyZWN0aW9uQXR0cnMobGluZUNvbG9yRGVmYXVsdCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICAgIGNvbG9yOiBleHRlbmRGbGF0KHt9LCBib3hBdHRycy5saW5lLmNvbG9yLCB7ZGZsdDogbGluZUNvbG9yRGVmYXVsdH0pLFxuICAgICAgICAgICAgd2lkdGg6IGJveEF0dHJzLmxpbmUud2lkdGgsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGZpbGxjb2xvcjogYm94QXR0cnMuZmlsbGNvbG9yLFxuICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHg6IE9ITENhdHRycy54LFxuICAgIG9wZW46IE9ITENhdHRycy5vcGVuLFxuICAgIGhpZ2g6IE9ITENhdHRycy5oaWdoLFxuICAgIGxvdzogT0hMQ2F0dHJzLmxvdyxcbiAgICBjbG9zZTogT0hMQ2F0dHJzLmNsb3NlLFxuXG4gICAgbGluZToge1xuICAgICAgICB3aWR0aDogZXh0ZW5kRmxhdCh7fSwgYm94QXR0cnMubGluZS53aWR0aCwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICBib3hBdHRycy5saW5lLndpZHRoLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICdOb3RlIHRoYXQgdGhpcyBzdHlsZSBzZXR0aW5nIGNhbiBhbHNvIGJlIHNldCBwZXInLFxuICAgICAgICAgICAgICAgICdkaXJlY3Rpb24gdmlhIGBpbmNyZWFzaW5nLmxpbmUud2lkdGhgIGFuZCcsXG4gICAgICAgICAgICAgICAgJ2BkZWNyZWFzaW5nLmxpbmUud2lkdGhgLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgIH0sXG5cbiAgICBpbmNyZWFzaW5nOiBkaXJlY3Rpb25BdHRycyhPSExDYXR0cnMuaW5jcmVhc2luZy5saW5lLmNvbG9yLmRmbHQpLFxuXG4gICAgZGVjcmVhc2luZzogZGlyZWN0aW9uQXR0cnMoT0hMQ2F0dHJzLmRlY3JlYXNpbmcubGluZS5jb2xvci5kZmx0KSxcblxuICAgIHRleHQ6IE9ITENhdHRycy50ZXh0LFxuICAgIGhvdmVydGV4dDogT0hMQ2F0dHJzLmhvdmVydGV4dCxcbiAgICB3aGlza2Vyd2lkdGg6IGV4dGVuZEZsYXQoe30sIGJveEF0dHJzLndoaXNrZXJ3aWR0aCwgeyBkZmx0OiAwIH0pLFxuXG4gICAgaG92ZXJsYWJlbDogT0hMQ2F0dHJzLmhvdmVybGFiZWwsXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG5cbnZhciBjYWxjQ29tbW9uID0gcmVxdWlyZSgnLi4vb2hsYy9jYWxjJykuY2FsY0NvbW1vbjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihnZCwgdHJhY2UpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciB4YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS54YXhpcyk7XG4gICAgdmFyIHlhID0gQXhlcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLnlheGlzKTtcblxuICAgIHZhciB4ID0geGEubWFrZUNhbGNkYXRhKHRyYWNlLCAneCcpO1xuXG4gICAgdmFyIGNkID0gY2FsY0NvbW1vbihnZCwgdHJhY2UsIHgsIHlhLCBwdEZ1bmMpO1xuXG4gICAgaWYoY2QubGVuZ3RoKSB7XG4gICAgICAgIExpYi5leHRlbmRGbGF0KGNkWzBdLnQsIHtcbiAgICAgICAgICAgIG51bTogZnVsbExheW91dC5fbnVtQm94ZXMsXG4gICAgICAgICAgICBkUG9zOiBMaWIuZGlzdGluY3RWYWxzKHgpLm1pbkRpZmYgLyAyLFxuICAgICAgICAgICAgcG9zTGV0dGVyOiAneCcsXG4gICAgICAgICAgICB2YWxMZXR0ZXI6ICd5JyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVsbExheW91dC5fbnVtQm94ZXMrKztcbiAgICAgICAgcmV0dXJuIGNkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbe3Q6IHtlbXB0eTogdHJ1ZX19XTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBwdEZ1bmMobywgaCwgbCwgYykge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1pbjogbCxcbiAgICAgICAgcTE6IE1hdGgubWluKG8sIGMpLFxuICAgICAgICBtZWQ6IGMsXG4gICAgICAgIHEzOiBNYXRoLm1heChvLCBjKSxcbiAgICAgICAgbWF4OiBoLFxuICAgIH07XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIGhhbmRsZU9ITEMgPSByZXF1aXJlKCcuLi9vaGxjL29obGNfZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBoYW5kbGVPSExDKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgaWYoIWxlbikge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2xpbmUud2lkdGgnKTtcblxuICAgIGhhbmRsZURpcmVjdGlvbih0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCAnaW5jcmVhc2luZycpO1xuICAgIGhhbmRsZURpcmVjdGlvbih0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCAnZGVjcmVhc2luZycpO1xuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ3doaXNrZXJ3aWR0aCcpO1xuXG4gICAgbGF5b3V0Ll9yZXF1ZXN0UmFuZ2VzbGlkZXJbdHJhY2VPdXQueGF4aXNdID0gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZURpcmVjdGlvbih0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBkaXJlY3Rpb24pIHtcbiAgICB2YXIgbGluZUNvbG9yID0gY29lcmNlKGRpcmVjdGlvbiArICcubGluZS5jb2xvcicpO1xuICAgIGNvZXJjZShkaXJlY3Rpb24gKyAnLmxpbmUud2lkdGgnLCB0cmFjZU91dC5saW5lLndpZHRoKTtcbiAgICBjb2VyY2UoZGlyZWN0aW9uICsgJy5maWxsY29sb3InLCBDb2xvci5hZGRPcGFjaXR5KGxpbmVDb2xvciwgMC41KSk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ2NhbmRsZXN0aWNrJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydjYXJ0ZXNpYW4nLCAnc3ZnJywgJ3Nob3dMZWdlbmQnLCAnY2FuZGxlc3RpY2snLCAnYm94TGF5b3V0J10sXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBjYW5kbGVzdGljayBpcyBhIHN0eWxlIG9mIGZpbmFuY2lhbCBjaGFydCBkZXNjcmliaW5nJyxcbiAgICAgICAgICAgICdvcGVuLCBoaWdoLCBsb3cgYW5kIGNsb3NlIGZvciBhIGdpdmVuIGB4YCBjb29yZGluYXRlIChtb3N0IGxpa2VseSB0aW1lKS4nLFxuXG4gICAgICAgICAgICAnVGhlIGJveGVzIHJlcHJlc2VudCB0aGUgc3ByZWFkIGJldHdlZW4gdGhlIGBvcGVuYCBhbmQgYGNsb3NlYCB2YWx1ZXMgYW5kJyxcbiAgICAgICAgICAgICd0aGUgbGluZXMgcmVwcmVzZW50IHRoZSBzcHJlYWQgYmV0d2VlbiB0aGUgYGxvd2AgYW5kIGBoaWdoYCB2YWx1ZXMnLFxuXG4gICAgICAgICAgICAnU2FtcGxlIHBvaW50cyB3aGVyZSB0aGUgY2xvc2UgdmFsdWUgaXMgaGlnaGVyIChsb3dlcikgdGhlbiB0aGUgb3BlbicsXG4gICAgICAgICAgICAndmFsdWUgYXJlIGNhbGxlZCBpbmNyZWFzaW5nIChkZWNyZWFzaW5nKS4nLFxuXG4gICAgICAgICAgICAnQnkgZGVmYXVsdCwgaW5jcmVhc2luZyBjYW5kbGVzIGFyZSBkcmF3biBpbiBncmVlbiB3aGVyZWFzJyxcbiAgICAgICAgICAgICdkZWNyZWFzaW5nIGFyZSBkcmF3biBpbiByZWQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBsYXlvdXRBdHRyaWJ1dGVzOiByZXF1aXJlKCcuLi9ib3gvbGF5b3V0X2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlMYXlvdXREZWZhdWx0czogcmVxdWlyZSgnLi4vYm94L2xheW91dF9kZWZhdWx0cycpLnN1cHBseUxheW91dERlZmF1bHRzLFxuICAgIGNyb3NzVHJhY2VDYWxjOiByZXF1aXJlKCcuLi9ib3gvY3Jvc3NfdHJhY2VfY2FsYycpLmNyb3NzVHJhY2VDYWxjLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJyksXG4gICAgcGxvdDogcmVxdWlyZSgnLi4vYm94L3Bsb3QnKS5wbG90LFxuICAgIGxheWVyTmFtZTogJ2JveGxheWVyJyxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi4vYm94L3N0eWxlJykuc3R5bGUsXG4gICAgaG92ZXJQb2ludHM6IHJlcXVpcmUoJy4uL29obGMvaG92ZXInKS5ob3ZlclBvaW50cyxcbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4uL29obGMvc2VsZWN0Jylcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGhhbmRsZU9ITEMgPSByZXF1aXJlKCcuL29obGNfZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBoYW5kbGVPSExDKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgaWYoIWxlbikge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2xpbmUud2lkdGgnKTtcbiAgICBjb2VyY2UoJ2xpbmUuZGFzaCcpO1xuXG4gICAgaGFuZGxlRGlyZWN0aW9uKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsICdpbmNyZWFzaW5nJyk7XG4gICAgaGFuZGxlRGlyZWN0aW9uKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsICdkZWNyZWFzaW5nJyk7XG5cbiAgICBjb2VyY2UoJ3RleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGV4dCcpO1xuICAgIGNvZXJjZSgndGlja3dpZHRoJyk7XG5cbiAgICBsYXlvdXQuX3JlcXVlc3RSYW5nZXNsaWRlclt0cmFjZU91dC54YXhpc10gPSB0cnVlO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlRGlyZWN0aW9uKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGRpcmVjdGlvbikge1xuICAgIGNvZXJjZShkaXJlY3Rpb24gKyAnLmxpbmUuY29sb3InKTtcbiAgICBjb2VyY2UoZGlyZWN0aW9uICsgJy5saW5lLndpZHRoJywgdHJhY2VPdXQubGluZS53aWR0aCk7XG4gICAgY29lcmNlKGRpcmVjdGlvbiArICcubGluZS5kYXNoJywgdHJhY2VPdXQubGluZS5kYXNoKTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnb2hsYycsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbicpLFxuICAgIGNhdGVnb3JpZXM6IFsnY2FydGVzaWFuJywgJ3N2ZycsICdzaG93TGVnZW5kJ10sXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBvaGxjIChzaG9ydCBmb3IgT3Blbi1IaWdoLUxvdy1DbG9zZSkgaXMgYSBzdHlsZSBvZiBmaW5hbmNpYWwgY2hhcnQgZGVzY3JpYmluZycsXG4gICAgICAgICAgICAnb3BlbiwgaGlnaCwgbG93IGFuZCBjbG9zZSBmb3IgYSBnaXZlbiBgeGAgY29vcmRpbmF0ZSAobW9zdCBsaWtlbHkgdGltZSkuJyxcblxuICAgICAgICAgICAgJ1RoZSB0aXAgb2YgdGhlIGxpbmVzIHJlcHJlc2VudCB0aGUgYGxvd2AgYW5kIGBoaWdoYCB2YWx1ZXMgYW5kJyxcbiAgICAgICAgICAgICd0aGUgaG9yaXpvbnRhbCBzZWdtZW50cyByZXByZXNlbnQgdGhlIGBvcGVuYCBhbmQgYGNsb3NlYCB2YWx1ZXMuJyxcblxuICAgICAgICAgICAgJ1NhbXBsZSBwb2ludHMgd2hlcmUgdGhlIGNsb3NlIHZhbHVlIGlzIGhpZ2hlciAobG93ZXIpIHRoZW4gdGhlIG9wZW4nLFxuICAgICAgICAgICAgJ3ZhbHVlIGFyZSBjYWxsZWQgaW5jcmVhc2luZyAoZGVjcmVhc2luZykuJyxcblxuICAgICAgICAgICAgJ0J5IGRlZmF1bHQsIGluY3JlYXNpbmcgaXRlbXMgYXJlIGRyYXduIGluIGdyZWVuIHdoZXJlYXMnLFxuICAgICAgICAgICAgJ2RlY3JlYXNpbmcgYXJlIGRyYXduIGluIHJlZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY2FsYyxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJykuaG92ZXJQb2ludHMsXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuL3NlbGVjdCcpXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGxvdChnZCwgcGxvdGluZm8sIGNkT0hMQywgb2hsY0xheWVyKSB7XG4gICAgdmFyIHlhID0gcGxvdGluZm8ueWF4aXM7XG4gICAgdmFyIHhhID0gcGxvdGluZm8ueGF4aXM7XG4gICAgdmFyIHBvc0hhc1JhbmdlQnJlYWtzID0gISF4YS5yYW5nZWJyZWFrcztcblxuICAgIExpYi5tYWtlVHJhY2VHcm91cHMob2hsY0xheWVyLCBjZE9ITEMsICd0cmFjZSBvaGxjJykuZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICB2YXIgcGxvdEdyb3VwID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgY2QwID0gY2RbMF07XG4gICAgICAgIHZhciB0ID0gY2QwLnQ7XG4gICAgICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcblxuICAgICAgICBpZih0cmFjZS52aXNpYmxlICE9PSB0cnVlIHx8IHQuZW1wdHkpIHtcbiAgICAgICAgICAgIHBsb3RHcm91cC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0aWNrTGVuID0gdC50aWNrTGVuO1xuXG4gICAgICAgIHZhciBwYXRocyA9IHBsb3RHcm91cC5zZWxlY3RBbGwoJ3BhdGgnKS5kYXRhKExpYi5pZGVudGl0eSk7XG5cbiAgICAgICAgcGF0aHMuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKTtcblxuICAgICAgICBwYXRocy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgcGF0aHMuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGlmKGQuZW1wdHkpIHJldHVybiAnTTAsMFonO1xuXG4gICAgICAgICAgICB2YXIgeG8gPSB4YS5jMnAoZC5wb3MgLSB0aWNrTGVuLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciB4YyA9IHhhLmMycChkLnBvcyArIHRpY2tMZW4sIHRydWUpO1xuICAgICAgICAgICAgdmFyIHggPSBwb3NIYXNSYW5nZUJyZWFrcyA/ICh4byArIHhjKSAvIDIgOiB4YS5jMnAoZC5wb3MsIHRydWUpO1xuXG4gICAgICAgICAgICB2YXIgeW8gPSB5YS5jMnAoZC5vLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciB5aCA9IHlhLmMycChkLmgsIHRydWUpO1xuICAgICAgICAgICAgdmFyIHlsID0geWEuYzJwKGQubCwgdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgeWMgPSB5YS5jMnAoZC5jLCB0cnVlKTtcblxuICAgICAgICAgICAgcmV0dXJuICdNJyArIHhvICsgJywnICsgeW8gKyAnSCcgKyB4ICtcbiAgICAgICAgICAgICAgICAnTScgKyB4ICsgJywnICsgeWggKyAnVicgKyB5bCArXG4gICAgICAgICAgICAgICAgJ00nICsgeGMgKyAnLCcgKyB5YyArICdIJyArIHg7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3R5bGUoZ2QsIGNkLCBzZWwpIHtcbiAgICB2YXIgcyA9IHNlbCA/IHNlbCA6IGQzLnNlbGVjdChnZCkuc2VsZWN0QWxsKCdnLm9obGNsYXllcicpLnNlbGVjdEFsbCgnZy50cmFjZScpO1xuXG4gICAgcy5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGRbMF0udHJhY2Uub3BhY2l0eTtcbiAgICB9KTtcblxuICAgIHMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IGRbMF0udHJhY2U7XG5cbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdEFsbCgncGF0aCcpLmVhY2goZnVuY3Rpb24oZGkpIHtcbiAgICAgICAgICAgIGlmKGRpLmVtcHR5KSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBkaXJMaW5lID0gdHJhY2VbZGkuZGlyXS5saW5lO1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgZGlyTGluZS5jb2xvcilcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLmRhc2hMaW5lLCBkaXJMaW5lLmRhc2gsIGRpckxpbmUud2lkdGgpXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogY3VzdG9tIHNlbGVjdGlvbiBzdHlsZSBmb3IgT0hMQ1xuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIHRyYWNlLnNlbGVjdGVkcG9pbnRzICYmICFkaS5zZWxlY3RlZCA/IDAuMyA6IDEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwbG90cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3Bsb3RzJyk7XG5cbmV4cG9ydHMubmFtZSA9ICdwaWUnO1xuXG5leHBvcnRzLnBsb3QgPSBmdW5jdGlvbihnZCwgdHJhY2VzLCB0cmFuc2l0aW9uT3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgIHBsb3RzLnBsb3RCYXNlUGxvdChleHBvcnRzLm5hbWUsIGdkLCB0cmFjZXMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydHMuY2xlYW4gPSBmdW5jdGlvbihuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpIHtcbiAgICBwbG90cy5jbGVhbkJhc2VQbG90KGV4cG9ydHMubmFtZSwgbmV3RnVsbERhdGEsIG5ld0Z1bGxMYXlvdXQsIG9sZEZ1bGxEYXRhLCBvbGRGdWxsTGF5b3V0KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJykuc3VwcGx5RGVmYXVsdHMsXG4gICAgc3VwcGx5TGF5b3V0RGVmYXVsdHM6IHJlcXVpcmUoJy4vbGF5b3V0X2RlZmF1bHRzJyksXG4gICAgbGF5b3V0QXR0cmlidXRlczogcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpLFxuXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY2FsYyxcbiAgICBjcm9zc1RyYWNlQ2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY3Jvc3NUcmFjZUNhbGMsXG5cbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKS5wbG90LFxuICAgIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gICAgc3R5bGVPbmU6IHJlcXVpcmUoJy4vc3R5bGVfb25lJyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdwaWUnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuL2Jhc2VfcGxvdCcpLFxuICAgIGNhdGVnb3JpZXM6IFsncGllLWxpa2UnLCAncGllJywgJ3Nob3dMZWdlbmQnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQSBkYXRhIHZpc3VhbGl6ZWQgYnkgdGhlIHNlY3RvcnMgb2YgdGhlIHBpZSBpcyBzZXQgaW4gYHZhbHVlc2AuJyxcbiAgICAgICAgICAgICdUaGUgc2VjdG9yIGxhYmVscyBhcmUgc2V0IGluIGBsYWJlbHNgLicsXG4gICAgICAgICAgICAnVGhlIHNlY3RvciBjb2xvcnMgYXJlIHNldCBpbiBgbWFya2VyLmNvbG9yc2AnXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgbGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlMYXlvdXREZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UobGF5b3V0SW4sIGxheW91dE91dCwgbGF5b3V0QXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdoaWRkZW5sYWJlbHMnKTtcbiAgICBjb2VyY2UoJ3BpZWNvbG9yd2F5JywgbGF5b3V0T3V0LmNvbG9yd2F5KTtcbiAgICBjb2VyY2UoJ2V4dGVuZHBpZWNvbG9ycycpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcblxudmFyIHN0eWxlT25lID0gcmVxdWlyZSgnLi9zdHlsZV9vbmUnKTtcbnZhciByZXNpemVUZXh0ID0gcmVxdWlyZSgnLi4vYmFyL3VuaWZvcm1fdGV4dCcpLnJlc2l6ZVRleHQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3R5bGUoZ2QpIHtcbiAgICB2YXIgcyA9IGdkLl9mdWxsTGF5b3V0Ll9waWVsYXllci5zZWxlY3RBbGwoJy50cmFjZScpO1xuICAgIHJlc2l6ZVRleHQoZ2QsIHMsICdwaWUnKTtcblxuICAgIHMuZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICB2YXIgY2QwID0gY2RbMF07XG4gICAgICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcbiAgICAgICAgdmFyIHRyYWNlU2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuXG4gICAgICAgIHRyYWNlU2VsZWN0aW9uLnN0eWxlKHtvcGFjaXR5OiB0cmFjZS5vcGFjaXR5fSk7XG5cbiAgICAgICAgdHJhY2VTZWxlY3Rpb24uc2VsZWN0QWxsKCdwYXRoLnN1cmZhY2UnKS5lYWNoKGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChzdHlsZU9uZSwgcHQsIHRyYWNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==