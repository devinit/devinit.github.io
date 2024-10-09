(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_funnel_js"],{

/***/ "./node_modules/plotly.js/lib/funnel.js":
/*!**********************************************!*\
  !*** ./node_modules/plotly.js/lib/funnel.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/funnel */ "./node_modules/plotly.js/src/traces/funnel/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/arrays_to_calcdata.js":
/*!************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/arrays_to_calcdata.js ***!
  \************************************************************************/
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

// arrayOk attributes, merge them into calcdata array
module.exports = function arraysToCalcdata(cd, trace) {
    for(var i = 0; i < cd.length; i++) cd[i].i = i;

    Lib.mergeArray(trace.text, cd, 'tx');
    Lib.mergeArray(trace.hovertext, cd, 'htx');

    var marker = trace.marker;
    if(marker) {
        Lib.mergeArray(marker.opacity, cd, 'mo');
        Lib.mergeArray(marker.color, cd, 'mc');

        var markerLine = marker.line;
        if(markerLine) {
            Lib.mergeArray(markerLine.color, cd, 'mlc');
            Lib.mergeArrayCastPositive(markerLine.width, cd, 'mlw');
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/attributes.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/attributes.js ***!
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



var barAttrs = __webpack_require__(/*! ../bar/attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js");
var lineAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js").line;
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/funnel/constants.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

module.exports = {
    x: barAttrs.x,
    x0: barAttrs.x0,
    dx: barAttrs.dx,
    y: barAttrs.y,
    y0: barAttrs.y0,
    dy: barAttrs.dy,

    hovertext: barAttrs.hovertext,
    hovertemplate: hovertemplateAttrs({}, {
        keys: constants.eventDataKeys
    }),

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['name', 'x', 'y', 'text', 'percent initial', 'percent previous', 'percent total']
    }),

    textinfo: {
        valType: 'flaglist',
        flags: ['label', 'text', 'percent initial', 'percent previous', 'percent total', 'value'],
        extras: ['none'],
        role: 'info',
        editType: 'plot',
        arrayOk: false,
        description: [
            'Determines which trace information appear on the graph.',
            'In the case of having multiple funnels, percentages & totals',
            'are computed separately (per trace).'
        ].join(' ')
    },
    // TODO: incorporate `label` and `value` in the eventData
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: constants.eventDataKeys.concat(['label', 'value'])
    }),

    text: barAttrs.text,
    textposition: extendFlat({}, barAttrs.textposition, {dflt: 'auto'}),
    insidetextanchor: extendFlat({}, barAttrs.insidetextanchor, {dflt: 'middle'}),
    textangle: extendFlat({}, barAttrs.textangle, {dflt: 0}),
    textfont: barAttrs.textfont,
    insidetextfont: barAttrs.insidetextfont,
    outsidetextfont: barAttrs.outsidetextfont,
    constraintext: barAttrs.constraintext,
    cliponaxis: barAttrs.cliponaxis,

    orientation: extendFlat({}, barAttrs.orientation, {
        description: [
            'Sets the orientation of the funnels.',
            'With *v* (*h*), the value of the each bar spans',
            'along the vertical (horizontal).',
            'By default funnels are tend to be oriented horizontally;',
            'unless only *y* array is presented or orientation is set to *v*.',
            'Also regarding graphs including only \'horizontal\' funnels,',
            '*autorange* on the *y-axis* are set to *reversed*.'
        ].join(' ')
    }),

    offset: extendFlat({}, barAttrs.offset, {arrayOk: false}),
    width: extendFlat({}, barAttrs.width, {arrayOk: false}),

    marker: barAttrs.marker,

    connector: {
        fillcolor: {
            valType: 'color',
            role: 'style',
            editType: 'style',
            description: [
                'Sets the fill color.'
            ].join(' ')
        },
        line: {
            color: extendFlat({}, lineAttrs.color, {dflt: Color.defaultLine}),
            width: extendFlat({}, lineAttrs.width, {
                dflt: 0,
                editType: 'plot',
            }),
            dash: lineAttrs.dash,
            editType: 'style'
        },
        visible: {
            valType: 'boolean',
            dflt: true,
            role: 'info',
            editType: 'plot',
            description: [
                'Determines if connector regions and lines are drawn.'
            ].join(' ')
        },
        editType: 'plot'
    },

    offsetgroup: barAttrs.offsetgroup,
    alignmentgroup: barAttrs.alignmentgroup
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/calc.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/calc.js ***!
  \**********************************************************/
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
var arraysToCalcdata = __webpack_require__(/*! ./arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/funnel/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function calc(gd, trace) {
    var xa = Axes.getFromId(gd, trace.xaxis || 'x');
    var ya = Axes.getFromId(gd, trace.yaxis || 'y');
    var size, pos, i, cdi;

    if(trace.orientation === 'h') {
        size = xa.makeCalcdata(trace, 'x');
        pos = ya.makeCalcdata(trace, 'y');
    } else {
        size = ya.makeCalcdata(trace, 'y');
        pos = xa.makeCalcdata(trace, 'x');
    }

    // create the "calculated data" to plot
    var serieslen = Math.min(pos.length, size.length);
    var cd = new Array(serieslen);

    // Unlike other bar-like traces funnels do not support base attribute.
    // bases for funnels are computed internally in a way that
    // the mid-point of each bar are located on the axis line.
    trace._base = [];

    // set position and size
    for(i = 0; i < serieslen; i++) {
        // treat negative values as bad numbers
        if(size[i] < 0) size[i] = BADNUM;

        var connectToNext = false;
        if(size[i] !== BADNUM) {
            if(i + 1 < serieslen && size[i + 1] !== BADNUM) {
                connectToNext = true;
            }
        }

        cdi = cd[i] = {
            p: pos[i],
            s: size[i],
            cNext: connectToNext
        };

        trace._base[i] = -0.5 * cdi.s;

        if(trace.ids) {
            cdi.id = String(trace.ids[i]);
        }

        // calculate total values
        if(i === 0) cd[0].vTotal = 0;
        cd[0].vTotal += fixNum(cdi.s);

        // ratio from initial value
        cdi.begR = fixNum(cdi.s) / fixNum(cd[0].s);
    }

    var prevGoodNum;
    for(i = 0; i < serieslen; i++) {
        cdi = cd[i];
        if(cdi.s === BADNUM) continue;

        // ratio of total value
        cdi.sumR = cdi.s / cd[0].vTotal;

        // ratio of previous (good) value
        cdi.difR = (prevGoodNum !== undefined) ? cdi.s / prevGoodNum : 1;

        prevGoodNum = cdi.s;
    }

    arraysToCalcdata(cd, trace);
    calcSelection(cd, trace);

    return cd;
};

function fixNum(a) {
    return (a === BADNUM) ? 0 : a;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/constants.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/constants.js ***!
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
    eventDataKeys: [
        'percentInitial',
        'percentPrevious',
        'percentTotal'
    ]
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/cross_trace_calc.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/cross_trace_calc.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var setGroupPositions = __webpack_require__(/*! ../bar/cross_trace_calc */ "./node_modules/plotly.js/src/traces/bar/cross_trace_calc.js").setGroupPositions;

module.exports = function crossTraceCalc(gd, plotinfo) {
    var fullLayout = gd._fullLayout;
    var fullData = gd._fullData;
    var calcdata = gd.calcdata;
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;
    var funnels = [];
    var funnelsVert = [];
    var funnelsHorz = [];
    var cd, i;

    for(i = 0; i < fullData.length; i++) {
        var fullTrace = fullData[i];
        var isHorizontal = (fullTrace.orientation === 'h');

        if(
            fullTrace.visible === true &&
            fullTrace.xaxis === xa._id &&
            fullTrace.yaxis === ya._id &&
            fullTrace.type === 'funnel'
        ) {
            cd = calcdata[i];

            if(isHorizontal) {
                funnelsHorz.push(cd);
            } else {
                funnelsVert.push(cd);
            }

            funnels.push(cd);
        }
    }

    var opts = {
        mode: fullLayout.funnelmode,
        norm: fullLayout.funnelnorm,
        gap: fullLayout.funnelgap,
        groupgap: fullLayout.funnelgroupgap
    };

    setGroupPositions(gd, xa, ya, funnelsVert, opts);
    setGroupPositions(gd, ya, xa, funnelsHorz, opts);

    for(i = 0; i < funnels.length; i++) {
        cd = funnels[i];

        for(var j = 0; j < cd.length; j++) {
            if(j + 1 < cd.length) {
                cd[j].nextP0 = cd[j + 1].p0;
                cd[j].nextS0 = cd[j + 1].s0;

                cd[j].nextP1 = cd[j + 1].p1;
                cd[j].nextS1 = cd[j + 1].s1;
            }
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var handleGroupingDefaults = __webpack_require__(/*! ../bar/defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").handleGroupingDefaults;
var handleText = __webpack_require__(/*! ../bar/defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").handleText;
var handleXYDefaults = __webpack_require__(/*! ../scatter/xy_defaults */ "./node_modules/plotly.js/src/traces/scatter/xy_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/funnel/attributes.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleXYDefaults(traceIn, traceOut, layout, coerce);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('orientation', (traceOut.y && !traceOut.x) ? 'v' : 'h');
    coerce('offset');
    coerce('width');

    var text = coerce('text');

    coerce('hovertext');
    coerce('hovertemplate');

    var textposition = coerce('textposition');
    handleText(traceIn, traceOut, layout, coerce, textposition, {
        moduleHasSelected: false,
        moduleHasUnselected: false,
        moduleHasConstrain: true,
        moduleHasCliponaxis: true,
        moduleHasTextangle: true,
        moduleHasInsideanchor: true
    });

    if(traceOut.textposition !== 'none' && !traceOut.texttemplate) {
        coerce('textinfo', Array.isArray(text) ? 'text+value' : 'value');
    }

    var markerColor = coerce('marker.color', defaultColor);
    coerce('marker.line.color', Color.defaultLine);
    coerce('marker.line.width');

    var connectorVisible = coerce('connector.visible');
    if(connectorVisible) {
        coerce('connector.fillcolor', defaultFillColor(markerColor));

        var connectorLineWidth = coerce('connector.line.width');
        if(connectorLineWidth) {
            coerce('connector.line.color');
            coerce('connector.line.dash');
        }
    }
}

function defaultFillColor(markerColor) {
    var cBase = Lib.isArrayOrTypedArray(markerColor) ? '#000' : markerColor;

    return Color.addOpacity(cBase, 0.5 * Color.opacity(cBase));
}

function crossTraceDefaults(fullData, fullLayout) {
    var traceIn, traceOut;

    function coerce(attr) {
        return Lib.coerce(traceOut._input, traceOut, attributes, attr);
    }

    if(fullLayout.funnelmode === 'group') {
        for(var i = 0; i < fullData.length; i++) {
            traceOut = fullData[i];
            traceIn = traceOut._input;

            handleGroupingDefaults(traceIn, traceOut, fullLayout, coerce);
        }
    }
}

module.exports = {
    supplyDefaults: supplyDefaults,
    crossTraceDefaults: crossTraceDefaults
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/event_data.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/event_data.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function eventData(out, pt /* , trace, cd, pointNumber */) {
    // standard cartesian event data
    out.x = 'xVal' in pt ? pt.xVal : pt.x;
    out.y = 'yVal' in pt ? pt.yVal : pt.y;

    // for funnel
    if('percentInitial' in pt) out.percentInitial = pt.percentInitial;
    if('percentPrevious' in pt) out.percentPrevious = pt.percentPrevious;
    if('percentTotal' in pt) out.percentTotal = pt.percentTotal;

    if(pt.xa) out.xaxis = pt.xa;
    if(pt.ya) out.yaxis = pt.ya;

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/hover.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/hover.js ***!
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



var opacity = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js").opacity;
var hoverOnBars = __webpack_require__(/*! ../bar/hover */ "./node_modules/plotly.js/src/traces/bar/hover.js").hoverOnBars;
var formatPercent = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").formatPercent;

module.exports = function hoverPoints(pointData, xval, yval, hovermode) {
    var point = hoverOnBars(pointData, xval, yval, hovermode);
    if(!point) return;

    var cd = point.cd;
    var trace = cd[0].trace;
    var isHorizontal = (trace.orientation === 'h');

    // the closest data point
    var index = point.index;
    var di = cd[index];

    var sizeLetter = isHorizontal ? 'x' : 'y';
    point[sizeLetter + 'LabelVal'] = di.s;

    point.percentInitial = di.begR;
    point.percentInitialLabel = formatPercent(di.begR, 1);

    point.percentPrevious = di.difR;
    point.percentPreviousLabel = formatPercent(di.difR, 1);

    point.percentTotal = di.sumR;
    point.percentTotalLabel = formatPercent(di.sumR, 1);

    var hoverinfo = di.hi || trace.hoverinfo;
    var text = [];
    if(hoverinfo && hoverinfo !== 'none' && hoverinfo !== 'skip') {
        var isAll = (hoverinfo === 'all');
        var parts = hoverinfo.split('+');

        var hasFlag = function(flag) { return isAll || parts.indexOf(flag) !== -1; };

        if(hasFlag('percent initial')) {
            text.push(point.percentInitialLabel + ' of initial');
        }
        if(hasFlag('percent previous')) {
            text.push(point.percentPreviousLabel + ' of previous');
        }
        if(hasFlag('percent total')) {
            text.push(point.percentTotalLabel + ' of total');
        }
    }
    point.extraText = text.join('<br>');

    point.color = getTraceColor(trace, di);

    return [point];
};

function getTraceColor(trace, di) {
    var cont = trace.marker;
    var mc = di.mc || cont.color;
    var mlc = di.mlc || cont.line.color;
    var mlw = di.mlw || cont.line.width;
    if(opacity(mc)) return mc;
    else if(opacity(mlc) && mlw) return mlc;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/funnel/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/funnel/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/funnel/defaults.js").supplyDefaults,
    crossTraceDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/funnel/defaults.js").crossTraceDefaults,
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/funnel/layout_defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/funnel/calc.js"),
    crossTraceCalc: __webpack_require__(/*! ./cross_trace_calc */ "./node_modules/plotly.js/src/traces/funnel/cross_trace_calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/funnel/plot.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/funnel/style.js").style,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/funnel/hover.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/funnel/event_data.js"),

    selectPoints: __webpack_require__(/*! ../bar/select */ "./node_modules/plotly.js/src/traces/bar/select.js"),

    moduleType: 'trace',
    name: 'funnel',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['bar-like', 'cartesian', 'svg', 'oriented', 'showLegend', 'zoomScale'],
    meta: {
        description: [
            'Visualize stages in a process using length-encoded bars. This trace can be used',
            'to show data in either a part-to-whole representation wherein each item appears',
            'in a single stage, or in a "drop-off" representation wherein each item appears in',
            'each stage it traversed. See also the "funnelarea" trace type for a different',
            'approach to visualizing funnel data.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/layout_attributes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/layout_attributes.js ***!
  \***********************************************************************/
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
    funnelmode: {
        valType: 'enumerated',
        values: ['stack', 'group', 'overlay'],
        dflt: 'stack',
        role: 'info',
        editType: 'calc',
        description: [
            'Determines how bars at the same location coordinate',
            'are displayed on the graph.',
            'With *stack*, the bars are stacked on top of one another',
            'With *group*, the bars are plotted next to one another',
            'centered around the shared location.',
            'With *overlay*, the bars are plotted over one another,',
            'you might need to an *opacity* to see multiple bars.'
        ].join(' ')
    },
    funnelgap: {
        valType: 'number',
        min: 0,
        max: 1,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the gap (in plot fraction) between bars of',
            'adjacent location coordinates.'
        ].join(' ')
    },
    funnelgroupgap: {
        valType: 'number',
        min: 0,
        max: 1,
        dflt: 0,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the gap (in plot fraction) between bars of',
            'the same location coordinate.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/layout_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/layout_defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/funnel/layout_attributes.js");

module.exports = function(layoutIn, layoutOut, fullData) {
    var hasTraceType = false;

    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    for(var i = 0; i < fullData.length; i++) {
        var trace = fullData[i];

        if(trace.visible && trace.type === 'funnel') {
            hasTraceType = true;
            break;
        }
    }

    if(hasTraceType) {
        coerce('funnelmode');
        coerce('funnelgap', 0.2);
        coerce('funnelgroupgap');
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/plot.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/plot.js ***!
  \**********************************************************/
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
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;
var barPlot = __webpack_require__(/*! ../bar/plot */ "./node_modules/plotly.js/src/traces/bar/plot.js");
var clearMinTextSize = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").clearMinTextSize;

module.exports = function plot(gd, plotinfo, cdModule, traceLayer) {
    var fullLayout = gd._fullLayout;

    clearMinTextSize('funnel', fullLayout);

    plotConnectorRegions(gd, plotinfo, cdModule, traceLayer);
    plotConnectorLines(gd, plotinfo, cdModule, traceLayer);

    barPlot.plot(gd, plotinfo, cdModule, traceLayer, {
        mode: fullLayout.funnelmode,
        norm: fullLayout.funnelmode,
        gap: fullLayout.funnelgap,
        groupgap: fullLayout.funnelgroupgap
    });
};

function plotConnectorRegions(gd, plotinfo, cdModule, traceLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    Lib.makeTraceGroups(traceLayer, cdModule, 'trace bars').each(function(cd) {
        var plotGroup = d3.select(this);
        var trace = cd[0].trace;

        var group = Lib.ensureSingle(plotGroup, 'g', 'regions');

        if(!trace.connector || !trace.connector.visible) {
            group.remove();
            return;
        }

        var isHorizontal = (trace.orientation === 'h');

        var connectors = group.selectAll('g.region').data(Lib.identity);

        connectors.enter().append('g')
            .classed('region', true);

        connectors.exit().remove();

        var len = connectors.size();

        connectors.each(function(di, i) {
            // don't draw lines between nulls
            if(i !== len - 1 && !di.cNext) return;

            var xy = getXY(di, xa, ya, isHorizontal);
            var x = xy[0];
            var y = xy[1];

            var shape = '';

            if(
                x[0] !== BADNUM && y[0] !== BADNUM &&
                x[1] !== BADNUM && y[1] !== BADNUM &&
                x[2] !== BADNUM && y[2] !== BADNUM &&
                x[3] !== BADNUM && y[3] !== BADNUM
            ) {
                if(isHorizontal) {
                    shape += 'M' + x[0] + ',' + y[1] + 'L' + x[2] + ',' + y[2] + 'H' + x[3] + 'L' + x[1] + ',' + y[1] + 'Z';
                } else {
                    shape += 'M' + x[1] + ',' + y[1] + 'L' + x[2] + ',' + y[3] + 'V' + y[2] + 'L' + x[1] + ',' + y[0] + 'Z';
                }
            }

            if(shape === '') shape = 'M0,0Z';

            Lib.ensureSingle(d3.select(this), 'path')
                .attr('d', shape)
                .call(Drawing.setClipUrl, plotinfo.layerClipId, gd);
        });
    });
}

function plotConnectorLines(gd, plotinfo, cdModule, traceLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    Lib.makeTraceGroups(traceLayer, cdModule, 'trace bars').each(function(cd) {
        var plotGroup = d3.select(this);
        var trace = cd[0].trace;

        var group = Lib.ensureSingle(plotGroup, 'g', 'lines');

        if(!trace.connector || !trace.connector.visible || !trace.connector.line.width) {
            group.remove();
            return;
        }

        var isHorizontal = (trace.orientation === 'h');

        var connectors = group.selectAll('g.line').data(Lib.identity);

        connectors.enter().append('g')
            .classed('line', true);

        connectors.exit().remove();

        var len = connectors.size();

        connectors.each(function(di, i) {
            // don't draw lines between nulls
            if(i !== len - 1 && !di.cNext) return;

            var xy = getXY(di, xa, ya, isHorizontal);
            var x = xy[0];
            var y = xy[1];

            var shape = '';

            if(x[3] !== undefined && y[3] !== undefined) {
                if(isHorizontal) {
                    shape += 'M' + x[0] + ',' + y[1] + 'L' + x[2] + ',' + y[2];
                    shape += 'M' + x[1] + ',' + y[1] + 'L' + x[3] + ',' + y[2];
                } else {
                    shape += 'M' + x[1] + ',' + y[1] + 'L' + x[2] + ',' + y[3];
                    shape += 'M' + x[1] + ',' + y[0] + 'L' + x[2] + ',' + y[2];
                }
            }

            if(shape === '') shape = 'M0,0Z';

            Lib.ensureSingle(d3.select(this), 'path')
                .attr('d', shape)
                .call(Drawing.setClipUrl, plotinfo.layerClipId, gd);
        });
    });
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

    s[2] = sAxis.c2p(di.nextS0, true);
    p[2] = pAxis.c2p(di.nextP0, true);

    s[3] = sAxis.c2p(di.nextS1, true);
    p[3] = pAxis.c2p(di.nextP1, true);

    return isHorizontal ? [s, p] : [p, s];
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/funnel/style.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/funnel/style.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var DESELECTDIM = __webpack_require__(/*! ../../constants/interactions */ "./node_modules/plotly.js/src/constants/interactions.js").DESELECTDIM;
var barStyle = __webpack_require__(/*! ../bar/style */ "./node_modules/plotly.js/src/traces/bar/style.js");
var resizeText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").resizeText;
var styleTextPoints = barStyle.styleTextPoints;

function style(gd, cd, sel) {
    var s = sel ? sel : d3.select(gd).selectAll('g.funnellayer').selectAll('g.trace');
    resizeText(gd, s, 'funnel');

    s.style('opacity', function(d) { return d[0].trace.opacity; });

    s.each(function(d) {
        var gTrace = d3.select(this);
        var trace = d[0].trace;

        gTrace.selectAll('.point > path').each(function(di) {
            if(!di.isBlank) {
                var cont = trace.marker;

                d3.select(this)
                    .call(Color.fill, di.mc || cont.color)
                    .call(Color.stroke, di.mlc || cont.line.color)
                    .call(Drawing.dashLine, cont.line.dash, di.mlw || cont.line.width)
                    .style('opacity', trace.selectedpoints && !di.selected ? DESELECTDIM : 1);
            }
        });

        styleTextPoints(gTrace, trace, gd);

        gTrace.selectAll('.regions').each(function() {
            d3.select(this).selectAll('path').style('stroke-width', 0).call(Color.fill, trace.connector.fillcolor);
        });

        gTrace.selectAll('.lines').each(function() {
            var cont = trace.connector.line;

            Drawing.lineGroupStyle(
                d3.select(this).selectAll('path'),
                cont.width,
                cont.color,
                cont.dash
            );
        });
    });
}

module.exports = {
    style: style
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvZnVubmVsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvZnVubmVsL2FycmF5c190b19jYWxjZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Z1bm5lbC9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvZnVubmVsL2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9mdW5uZWwvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvZnVubmVsL2Nyb3NzX3RyYWNlX2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9mdW5uZWwvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9mdW5uZWwvZXZlbnRfZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Z1bm5lbC9ob3Zlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Z1bm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Z1bm5lbC9sYXlvdXRfYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Z1bm5lbC9sYXlvdXRfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9mdW5uZWwvcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Z1bm5lbC9zdHlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYix1SEFBZ0Q7Ozs7Ozs7Ozs7OztBQ1ZoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCO0FBQ0E7QUFDQSxrQkFBa0IsZUFBZTs7QUFFakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGVBQWUsbUJBQU8sQ0FBQyxnRkFBbUI7QUFDMUMsZ0JBQWdCLGtIQUFxQztBQUNyRCxnQkFBZ0IsbUJBQU8sQ0FBQyxnRkFBd0I7QUFDaEQseUJBQXlCLDBJQUE2RDtBQUN0Rix3QkFBd0IseUlBQTREO0FBQ3BGLGdCQUFnQixtQkFBTyxDQUFDLDRFQUFhO0FBQ3JDLGlCQUFpQixvR0FBc0M7QUFDdkQsWUFBWSxtQkFBTyxDQUFDLHNGQUF3Qjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQSxLQUFLOztBQUVMLDRCQUE0QjtBQUM1QjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUMsc0VBQWM7QUFDckMsaUJBQWlCLG9IQUF5QztBQUMxRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLDJCQUEyQixFQUFFOztBQUVqRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDVmYmIzYWE0MGQ3NTM2ZjUzNTBhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvZnVubmVsJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuLy8gYXJyYXlPayBhdHRyaWJ1dGVzLCBtZXJnZSB0aGVtIGludG8gY2FsY2RhdGEgYXJyYXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIGNkW2ldLmkgPSBpO1xuXG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dCwgY2QsICd0eCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLmhvdmVydGV4dCwgY2QsICdodHgnKTtcblxuICAgIHZhciBtYXJrZXIgPSB0cmFjZS5tYXJrZXI7XG4gICAgaWYobWFya2VyKSB7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5vcGFjaXR5LCBjZCwgJ21vJyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5jb2xvciwgY2QsICdtYycpO1xuXG4gICAgICAgIHZhciBtYXJrZXJMaW5lID0gbWFya2VyLmxpbmU7XG4gICAgICAgIGlmKG1hcmtlckxpbmUpIHtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckxpbmUuY29sb3IsIGNkLCAnbWxjJyk7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXJMaW5lLndpZHRoLCBjZCwgJ21sdycpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGJhckF0dHJzID0gcmVxdWlyZSgnLi4vYmFyL2F0dHJpYnV0ZXMnKTtcbnZhciBsaW5lQXR0cnMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2F0dHJpYnV0ZXMnKS5saW5lO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIHRleHR0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLnRleHR0ZW1wbGF0ZUF0dHJzO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB4OiBiYXJBdHRycy54LFxuICAgIHgwOiBiYXJBdHRycy54MCxcbiAgICBkeDogYmFyQXR0cnMuZHgsXG4gICAgeTogYmFyQXR0cnMueSxcbiAgICB5MDogYmFyQXR0cnMueTAsXG4gICAgZHk6IGJhckF0dHJzLmR5LFxuXG4gICAgaG92ZXJ0ZXh0OiBiYXJBdHRycy5ob3ZlcnRleHQsXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHt9LCB7XG4gICAgICAgIGtleXM6IGNvbnN0YW50cy5ldmVudERhdGFLZXlzXG4gICAgfSksXG5cbiAgICBob3ZlcmluZm86IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5ob3ZlcmluZm8sIHtcbiAgICAgICAgZmxhZ3M6IFsnbmFtZScsICd4JywgJ3knLCAndGV4dCcsICdwZXJjZW50IGluaXRpYWwnLCAncGVyY2VudCBwcmV2aW91cycsICdwZXJjZW50IHRvdGFsJ11cbiAgICB9KSxcblxuICAgIHRleHRpbmZvOiB7XG4gICAgICAgIHZhbFR5cGU6ICdmbGFnbGlzdCcsXG4gICAgICAgIGZsYWdzOiBbJ2xhYmVsJywgJ3RleHQnLCAncGVyY2VudCBpbml0aWFsJywgJ3BlcmNlbnQgcHJldmlvdXMnLCAncGVyY2VudCB0b3RhbCcsICd2YWx1ZSddLFxuICAgICAgICBleHRyYXM6IFsnbm9uZSddLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGFycmF5T2s6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hpY2ggdHJhY2UgaW5mb3JtYXRpb24gYXBwZWFyIG9uIHRoZSBncmFwaC4nLFxuICAgICAgICAgICAgJ0luIHRoZSBjYXNlIG9mIGhhdmluZyBtdWx0aXBsZSBmdW5uZWxzLCBwZXJjZW50YWdlcyAmIHRvdGFscycsXG4gICAgICAgICAgICAnYXJlIGNvbXB1dGVkIHNlcGFyYXRlbHkgKHBlciB0cmFjZSkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgLy8gVE9ETzogaW5jb3Jwb3JhdGUgYGxhYmVsYCBhbmQgYHZhbHVlYCBpbiB0aGUgZXZlbnREYXRhXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdwbG90J30sIHtcbiAgICAgICAga2V5czogY29uc3RhbnRzLmV2ZW50RGF0YUtleXMuY29uY2F0KFsnbGFiZWwnLCAndmFsdWUnXSlcbiAgICB9KSxcblxuICAgIHRleHQ6IGJhckF0dHJzLnRleHQsXG4gICAgdGV4dHBvc2l0aW9uOiBleHRlbmRGbGF0KHt9LCBiYXJBdHRycy50ZXh0cG9zaXRpb24sIHtkZmx0OiAnYXV0byd9KSxcbiAgICBpbnNpZGV0ZXh0YW5jaG9yOiBleHRlbmRGbGF0KHt9LCBiYXJBdHRycy5pbnNpZGV0ZXh0YW5jaG9yLCB7ZGZsdDogJ21pZGRsZSd9KSxcbiAgICB0ZXh0YW5nbGU6IGV4dGVuZEZsYXQoe30sIGJhckF0dHJzLnRleHRhbmdsZSwge2RmbHQ6IDB9KSxcbiAgICB0ZXh0Zm9udDogYmFyQXR0cnMudGV4dGZvbnQsXG4gICAgaW5zaWRldGV4dGZvbnQ6IGJhckF0dHJzLmluc2lkZXRleHRmb250LFxuICAgIG91dHNpZGV0ZXh0Zm9udDogYmFyQXR0cnMub3V0c2lkZXRleHRmb250LFxuICAgIGNvbnN0cmFpbnRleHQ6IGJhckF0dHJzLmNvbnN0cmFpbnRleHQsXG4gICAgY2xpcG9uYXhpczogYmFyQXR0cnMuY2xpcG9uYXhpcyxcblxuICAgIG9yaWVudGF0aW9uOiBleHRlbmRGbGF0KHt9LCBiYXJBdHRycy5vcmllbnRhdGlvbiwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBmdW5uZWxzLicsXG4gICAgICAgICAgICAnV2l0aCAqdiogKCpoKiksIHRoZSB2YWx1ZSBvZiB0aGUgZWFjaCBiYXIgc3BhbnMnLFxuICAgICAgICAgICAgJ2Fsb25nIHRoZSB2ZXJ0aWNhbCAoaG9yaXpvbnRhbCkuJyxcbiAgICAgICAgICAgICdCeSBkZWZhdWx0IGZ1bm5lbHMgYXJlIHRlbmQgdG8gYmUgb3JpZW50ZWQgaG9yaXpvbnRhbGx5OycsXG4gICAgICAgICAgICAndW5sZXNzIG9ubHkgKnkqIGFycmF5IGlzIHByZXNlbnRlZCBvciBvcmllbnRhdGlvbiBpcyBzZXQgdG8gKnYqLicsXG4gICAgICAgICAgICAnQWxzbyByZWdhcmRpbmcgZ3JhcGhzIGluY2x1ZGluZyBvbmx5IFxcJ2hvcml6b250YWxcXCcgZnVubmVscywnLFxuICAgICAgICAgICAgJyphdXRvcmFuZ2UqIG9uIHRoZSAqeS1heGlzKiBhcmUgc2V0IHRvICpyZXZlcnNlZCouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuXG4gICAgb2Zmc2V0OiBleHRlbmRGbGF0KHt9LCBiYXJBdHRycy5vZmZzZXQsIHthcnJheU9rOiBmYWxzZX0pLFxuICAgIHdpZHRoOiBleHRlbmRGbGF0KHt9LCBiYXJBdHRycy53aWR0aCwge2FycmF5T2s6IGZhbHNlfSksXG5cbiAgICBtYXJrZXI6IGJhckF0dHJzLm1hcmtlcixcblxuICAgIGNvbm5lY3Rvcjoge1xuICAgICAgICBmaWxsY29sb3I6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBmaWxsIGNvbG9yLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICAgIGNvbG9yOiBleHRlbmRGbGF0KHt9LCBsaW5lQXR0cnMuY29sb3IsIHtkZmx0OiBDb2xvci5kZWZhdWx0TGluZX0pLFxuICAgICAgICAgICAgd2lkdGg6IGV4dGVuZEZsYXQoe30sIGxpbmVBdHRycy53aWR0aCwge1xuICAgICAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZGFzaDogbGluZUF0dHJzLmRhc2gsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgICAgICB9LFxuICAgICAgICB2aXNpYmxlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZmx0OiB0cnVlLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0RldGVybWluZXMgaWYgY29ubmVjdG9yIHJlZ2lvbnMgYW5kIGxpbmVzIGFyZSBkcmF3bi4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgfSxcblxuICAgIG9mZnNldGdyb3VwOiBiYXJBdHRycy5vZmZzZXRncm91cCxcbiAgICBhbGlnbm1lbnRncm91cDogYmFyQXR0cnMuYWxpZ25tZW50Z3JvdXBcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBhcnJheXNUb0NhbGNkYXRhID0gcmVxdWlyZSgnLi9hcnJheXNfdG9fY2FsY2RhdGEnKTtcbnZhciBjYWxjU2VsZWN0aW9uID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jYWxjX3NlbGVjdGlvbicpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgeGEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueGF4aXMgfHwgJ3gnKTtcbiAgICB2YXIgeWEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueWF4aXMgfHwgJ3knKTtcbiAgICB2YXIgc2l6ZSwgcG9zLCBpLCBjZGk7XG5cbiAgICBpZih0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICAgIHNpemUgPSB4YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd4Jyk7XG4gICAgICAgIHBvcyA9IHlhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3knKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaXplID0geWEubWFrZUNhbGNkYXRhKHRyYWNlLCAneScpO1xuICAgICAgICBwb3MgPSB4YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd4Jyk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRoZSBcImNhbGN1bGF0ZWQgZGF0YVwiIHRvIHBsb3RcbiAgICB2YXIgc2VyaWVzbGVuID0gTWF0aC5taW4ocG9zLmxlbmd0aCwgc2l6ZS5sZW5ndGgpO1xuICAgIHZhciBjZCA9IG5ldyBBcnJheShzZXJpZXNsZW4pO1xuXG4gICAgLy8gVW5saWtlIG90aGVyIGJhci1saWtlIHRyYWNlcyBmdW5uZWxzIGRvIG5vdCBzdXBwb3J0IGJhc2UgYXR0cmlidXRlLlxuICAgIC8vIGJhc2VzIGZvciBmdW5uZWxzIGFyZSBjb21wdXRlZCBpbnRlcm5hbGx5IGluIGEgd2F5IHRoYXRcbiAgICAvLyB0aGUgbWlkLXBvaW50IG9mIGVhY2ggYmFyIGFyZSBsb2NhdGVkIG9uIHRoZSBheGlzIGxpbmUuXG4gICAgdHJhY2UuX2Jhc2UgPSBbXTtcblxuICAgIC8vIHNldCBwb3NpdGlvbiBhbmQgc2l6ZVxuICAgIGZvcihpID0gMDsgaSA8IHNlcmllc2xlbjsgaSsrKSB7XG4gICAgICAgIC8vIHRyZWF0IG5lZ2F0aXZlIHZhbHVlcyBhcyBiYWQgbnVtYmVyc1xuICAgICAgICBpZihzaXplW2ldIDwgMCkgc2l6ZVtpXSA9IEJBRE5VTTtcblxuICAgICAgICB2YXIgY29ubmVjdFRvTmV4dCA9IGZhbHNlO1xuICAgICAgICBpZihzaXplW2ldICE9PSBCQUROVU0pIHtcbiAgICAgICAgICAgIGlmKGkgKyAxIDwgc2VyaWVzbGVuICYmIHNpemVbaSArIDFdICE9PSBCQUROVU0pIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0VG9OZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNkaSA9IGNkW2ldID0ge1xuICAgICAgICAgICAgcDogcG9zW2ldLFxuICAgICAgICAgICAgczogc2l6ZVtpXSxcbiAgICAgICAgICAgIGNOZXh0OiBjb25uZWN0VG9OZXh0XG4gICAgICAgIH07XG5cbiAgICAgICAgdHJhY2UuX2Jhc2VbaV0gPSAtMC41ICogY2RpLnM7XG5cbiAgICAgICAgaWYodHJhY2UuaWRzKSB7XG4gICAgICAgICAgICBjZGkuaWQgPSBTdHJpbmcodHJhY2UuaWRzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0b3RhbCB2YWx1ZXNcbiAgICAgICAgaWYoaSA9PT0gMCkgY2RbMF0udlRvdGFsID0gMDtcbiAgICAgICAgY2RbMF0udlRvdGFsICs9IGZpeE51bShjZGkucyk7XG5cbiAgICAgICAgLy8gcmF0aW8gZnJvbSBpbml0aWFsIHZhbHVlXG4gICAgICAgIGNkaS5iZWdSID0gZml4TnVtKGNkaS5zKSAvIGZpeE51bShjZFswXS5zKTtcbiAgICB9XG5cbiAgICB2YXIgcHJldkdvb2ROdW07XG4gICAgZm9yKGkgPSAwOyBpIDwgc2VyaWVzbGVuOyBpKyspIHtcbiAgICAgICAgY2RpID0gY2RbaV07XG4gICAgICAgIGlmKGNkaS5zID09PSBCQUROVU0pIGNvbnRpbnVlO1xuXG4gICAgICAgIC8vIHJhdGlvIG9mIHRvdGFsIHZhbHVlXG4gICAgICAgIGNkaS5zdW1SID0gY2RpLnMgLyBjZFswXS52VG90YWw7XG5cbiAgICAgICAgLy8gcmF0aW8gb2YgcHJldmlvdXMgKGdvb2QpIHZhbHVlXG4gICAgICAgIGNkaS5kaWZSID0gKHByZXZHb29kTnVtICE9PSB1bmRlZmluZWQpID8gY2RpLnMgLyBwcmV2R29vZE51bSA6IDE7XG5cbiAgICAgICAgcHJldkdvb2ROdW0gPSBjZGkucztcbiAgICB9XG5cbiAgICBhcnJheXNUb0NhbGNkYXRhKGNkLCB0cmFjZSk7XG4gICAgY2FsY1NlbGVjdGlvbihjZCwgdHJhY2UpO1xuXG4gICAgcmV0dXJuIGNkO1xufTtcblxuZnVuY3Rpb24gZml4TnVtKGEpIHtcbiAgICByZXR1cm4gKGEgPT09IEJBRE5VTSkgPyAwIDogYTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZXZlbnREYXRhS2V5czogW1xuICAgICAgICAncGVyY2VudEluaXRpYWwnLFxuICAgICAgICAncGVyY2VudFByZXZpb3VzJyxcbiAgICAgICAgJ3BlcmNlbnRUb3RhbCdcbiAgICBdXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2V0R3JvdXBQb3NpdGlvbnMgPSByZXF1aXJlKCcuLi9iYXIvY3Jvc3NfdHJhY2VfY2FsYycpLnNldEdyb3VwUG9zaXRpb25zO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyb3NzVHJhY2VDYWxjKGdkLCBwbG90aW5mbykge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGZ1bGxEYXRhID0gZ2QuX2Z1bGxEYXRhO1xuICAgIHZhciBjYWxjZGF0YSA9IGdkLmNhbGNkYXRhO1xuICAgIHZhciB4YSA9IHBsb3RpbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHBsb3RpbmZvLnlheGlzO1xuICAgIHZhciBmdW5uZWxzID0gW107XG4gICAgdmFyIGZ1bm5lbHNWZXJ0ID0gW107XG4gICAgdmFyIGZ1bm5lbHNIb3J6ID0gW107XG4gICAgdmFyIGNkLCBpO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZ1bGxUcmFjZSA9IGZ1bGxEYXRhW2ldO1xuICAgICAgICB2YXIgaXNIb3Jpem9udGFsID0gKGZ1bGxUcmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKTtcblxuICAgICAgICBpZihcbiAgICAgICAgICAgIGZ1bGxUcmFjZS52aXNpYmxlID09PSB0cnVlICYmXG4gICAgICAgICAgICBmdWxsVHJhY2UueGF4aXMgPT09IHhhLl9pZCAmJlxuICAgICAgICAgICAgZnVsbFRyYWNlLnlheGlzID09PSB5YS5faWQgJiZcbiAgICAgICAgICAgIGZ1bGxUcmFjZS50eXBlID09PSAnZnVubmVsJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGNkID0gY2FsY2RhdGFbaV07XG5cbiAgICAgICAgICAgIGlmKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIGZ1bm5lbHNIb3J6LnB1c2goY2QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmdW5uZWxzVmVydC5wdXNoKGNkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVubmVscy5wdXNoKGNkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBvcHRzID0ge1xuICAgICAgICBtb2RlOiBmdWxsTGF5b3V0LmZ1bm5lbG1vZGUsXG4gICAgICAgIG5vcm06IGZ1bGxMYXlvdXQuZnVubmVsbm9ybSxcbiAgICAgICAgZ2FwOiBmdWxsTGF5b3V0LmZ1bm5lbGdhcCxcbiAgICAgICAgZ3JvdXBnYXA6IGZ1bGxMYXlvdXQuZnVubmVsZ3JvdXBnYXBcbiAgICB9O1xuXG4gICAgc2V0R3JvdXBQb3NpdGlvbnMoZ2QsIHhhLCB5YSwgZnVubmVsc1ZlcnQsIG9wdHMpO1xuICAgIHNldEdyb3VwUG9zaXRpb25zKGdkLCB5YSwgeGEsIGZ1bm5lbHNIb3J6LCBvcHRzKTtcblxuICAgIGZvcihpID0gMDsgaSA8IGZ1bm5lbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2QgPSBmdW5uZWxzW2ldO1xuXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYoaiArIDEgPCBjZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjZFtqXS5uZXh0UDAgPSBjZFtqICsgMV0ucDA7XG4gICAgICAgICAgICAgICAgY2Rbal0ubmV4dFMwID0gY2RbaiArIDFdLnMwO1xuXG4gICAgICAgICAgICAgICAgY2Rbal0ubmV4dFAxID0gY2RbaiArIDFdLnAxO1xuICAgICAgICAgICAgICAgIGNkW2pdLm5leHRTMSA9IGNkW2ogKyAxXS5zMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxudmFyIGhhbmRsZUdyb3VwaW5nRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9iYXIvZGVmYXVsdHMnKS5oYW5kbGVHcm91cGluZ0RlZmF1bHRzO1xudmFyIGhhbmRsZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvZGVmYXVsdHMnKS5oYW5kbGVUZXh0O1xudmFyIGhhbmRsZVhZRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3h5X2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xuXG5mdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIGxlbiA9IGhhbmRsZVhZRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcbiAgICBpZighbGVuKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgnb3JpZW50YXRpb24nLCAodHJhY2VPdXQueSAmJiAhdHJhY2VPdXQueCkgPyAndicgOiAnaCcpO1xuICAgIGNvZXJjZSgnb2Zmc2V0Jyk7XG4gICAgY29lcmNlKCd3aWR0aCcpO1xuXG4gICAgdmFyIHRleHQgPSBjb2VyY2UoJ3RleHQnKTtcblxuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICB2YXIgdGV4dHBvc2l0aW9uID0gY29lcmNlKCd0ZXh0cG9zaXRpb24nKTtcbiAgICBoYW5kbGVUZXh0KHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgdGV4dHBvc2l0aW9uLCB7XG4gICAgICAgIG1vZHVsZUhhc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgbW9kdWxlSGFzVW5zZWxlY3RlZDogZmFsc2UsXG4gICAgICAgIG1vZHVsZUhhc0NvbnN0cmFpbjogdHJ1ZSxcbiAgICAgICAgbW9kdWxlSGFzQ2xpcG9uYXhpczogdHJ1ZSxcbiAgICAgICAgbW9kdWxlSGFzVGV4dGFuZ2xlOiB0cnVlLFxuICAgICAgICBtb2R1bGVIYXNJbnNpZGVhbmNob3I6IHRydWVcbiAgICB9KTtcblxuICAgIGlmKHRyYWNlT3V0LnRleHRwb3NpdGlvbiAhPT0gJ25vbmUnICYmICF0cmFjZU91dC50ZXh0dGVtcGxhdGUpIHtcbiAgICAgICAgY29lcmNlKCd0ZXh0aW5mbycsIEFycmF5LmlzQXJyYXkodGV4dCkgPyAndGV4dCt2YWx1ZScgOiAndmFsdWUnKTtcbiAgICB9XG5cbiAgICB2YXIgbWFya2VyQ29sb3IgPSBjb2VyY2UoJ21hcmtlci5jb2xvcicsIGRlZmF1bHRDb2xvcik7XG4gICAgY29lcmNlKCdtYXJrZXIubGluZS5jb2xvcicsIENvbG9yLmRlZmF1bHRMaW5lKTtcbiAgICBjb2VyY2UoJ21hcmtlci5saW5lLndpZHRoJyk7XG5cbiAgICB2YXIgY29ubmVjdG9yVmlzaWJsZSA9IGNvZXJjZSgnY29ubmVjdG9yLnZpc2libGUnKTtcbiAgICBpZihjb25uZWN0b3JWaXNpYmxlKSB7XG4gICAgICAgIGNvZXJjZSgnY29ubmVjdG9yLmZpbGxjb2xvcicsIGRlZmF1bHRGaWxsQ29sb3IobWFya2VyQ29sb3IpKTtcblxuICAgICAgICB2YXIgY29ubmVjdG9yTGluZVdpZHRoID0gY29lcmNlKCdjb25uZWN0b3IubGluZS53aWR0aCcpO1xuICAgICAgICBpZihjb25uZWN0b3JMaW5lV2lkdGgpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnY29ubmVjdG9yLmxpbmUuY29sb3InKTtcbiAgICAgICAgICAgIGNvZXJjZSgnY29ubmVjdG9yLmxpbmUuZGFzaCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0RmlsbENvbG9yKG1hcmtlckNvbG9yKSB7XG4gICAgdmFyIGNCYXNlID0gTGliLmlzQXJyYXlPclR5cGVkQXJyYXkobWFya2VyQ29sb3IpID8gJyMwMDAnIDogbWFya2VyQ29sb3I7XG5cbiAgICByZXR1cm4gQ29sb3IuYWRkT3BhY2l0eShjQmFzZSwgMC41ICogQ29sb3Iub3BhY2l0eShjQmFzZSkpO1xufVxuXG5mdW5jdGlvbiBjcm9zc1RyYWNlRGVmYXVsdHMoZnVsbERhdGEsIGZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgdHJhY2VJbiwgdHJhY2VPdXQ7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0cikge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZU91dC5faW5wdXQsIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyKTtcbiAgICB9XG5cbiAgICBpZihmdWxsTGF5b3V0LmZ1bm5lbG1vZGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cmFjZU91dCA9IGZ1bGxEYXRhW2ldO1xuICAgICAgICAgICAgdHJhY2VJbiA9IHRyYWNlT3V0Ll9pbnB1dDtcblxuICAgICAgICAgICAgaGFuZGxlR3JvdXBpbmdEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZnVsbExheW91dCwgY29lcmNlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3VwcGx5RGVmYXVsdHM6IHN1cHBseURlZmF1bHRzLFxuICAgIGNyb3NzVHJhY2VEZWZhdWx0czogY3Jvc3NUcmFjZURlZmF1bHRzXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV2ZW50RGF0YShvdXQsIHB0IC8qICwgdHJhY2UsIGNkLCBwb2ludE51bWJlciAqLykge1xuICAgIC8vIHN0YW5kYXJkIGNhcnRlc2lhbiBldmVudCBkYXRhXG4gICAgb3V0LnggPSAneFZhbCcgaW4gcHQgPyBwdC54VmFsIDogcHQueDtcbiAgICBvdXQueSA9ICd5VmFsJyBpbiBwdCA/IHB0LnlWYWwgOiBwdC55O1xuXG4gICAgLy8gZm9yIGZ1bm5lbFxuICAgIGlmKCdwZXJjZW50SW5pdGlhbCcgaW4gcHQpIG91dC5wZXJjZW50SW5pdGlhbCA9IHB0LnBlcmNlbnRJbml0aWFsO1xuICAgIGlmKCdwZXJjZW50UHJldmlvdXMnIGluIHB0KSBvdXQucGVyY2VudFByZXZpb3VzID0gcHQucGVyY2VudFByZXZpb3VzO1xuICAgIGlmKCdwZXJjZW50VG90YWwnIGluIHB0KSBvdXQucGVyY2VudFRvdGFsID0gcHQucGVyY2VudFRvdGFsO1xuXG4gICAgaWYocHQueGEpIG91dC54YXhpcyA9IHB0LnhhO1xuICAgIGlmKHB0LnlhKSBvdXQueWF4aXMgPSBwdC55YTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgb3BhY2l0eSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKS5vcGFjaXR5O1xudmFyIGhvdmVyT25CYXJzID0gcmVxdWlyZSgnLi4vYmFyL2hvdmVyJykuaG92ZXJPbkJhcnM7XG52YXIgZm9ybWF0UGVyY2VudCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmZvcm1hdFBlcmNlbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpIHtcbiAgICB2YXIgcG9pbnQgPSBob3Zlck9uQmFycyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSk7XG4gICAgaWYoIXBvaW50KSByZXR1cm47XG5cbiAgICB2YXIgY2QgPSBwb2ludC5jZDtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgaXNIb3Jpem9udGFsID0gKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpO1xuXG4gICAgLy8gdGhlIGNsb3Nlc3QgZGF0YSBwb2ludFxuICAgIHZhciBpbmRleCA9IHBvaW50LmluZGV4O1xuICAgIHZhciBkaSA9IGNkW2luZGV4XTtcblxuICAgIHZhciBzaXplTGV0dGVyID0gaXNIb3Jpem9udGFsID8gJ3gnIDogJ3knO1xuICAgIHBvaW50W3NpemVMZXR0ZXIgKyAnTGFiZWxWYWwnXSA9IGRpLnM7XG5cbiAgICBwb2ludC5wZXJjZW50SW5pdGlhbCA9IGRpLmJlZ1I7XG4gICAgcG9pbnQucGVyY2VudEluaXRpYWxMYWJlbCA9IGZvcm1hdFBlcmNlbnQoZGkuYmVnUiwgMSk7XG5cbiAgICBwb2ludC5wZXJjZW50UHJldmlvdXMgPSBkaS5kaWZSO1xuICAgIHBvaW50LnBlcmNlbnRQcmV2aW91c0xhYmVsID0gZm9ybWF0UGVyY2VudChkaS5kaWZSLCAxKTtcblxuICAgIHBvaW50LnBlcmNlbnRUb3RhbCA9IGRpLnN1bVI7XG4gICAgcG9pbnQucGVyY2VudFRvdGFsTGFiZWwgPSBmb3JtYXRQZXJjZW50KGRpLnN1bVIsIDEpO1xuXG4gICAgdmFyIGhvdmVyaW5mbyA9IGRpLmhpIHx8IHRyYWNlLmhvdmVyaW5mbztcbiAgICB2YXIgdGV4dCA9IFtdO1xuICAgIGlmKGhvdmVyaW5mbyAmJiBob3ZlcmluZm8gIT09ICdub25lJyAmJiBob3ZlcmluZm8gIT09ICdza2lwJykge1xuICAgICAgICB2YXIgaXNBbGwgPSAoaG92ZXJpbmZvID09PSAnYWxsJyk7XG4gICAgICAgIHZhciBwYXJ0cyA9IGhvdmVyaW5mby5zcGxpdCgnKycpO1xuXG4gICAgICAgIHZhciBoYXNGbGFnID0gZnVuY3Rpb24oZmxhZykgeyByZXR1cm4gaXNBbGwgfHwgcGFydHMuaW5kZXhPZihmbGFnKSAhPT0gLTE7IH07XG5cbiAgICAgICAgaWYoaGFzRmxhZygncGVyY2VudCBpbml0aWFsJykpIHtcbiAgICAgICAgICAgIHRleHQucHVzaChwb2ludC5wZXJjZW50SW5pdGlhbExhYmVsICsgJyBvZiBpbml0aWFsJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaGFzRmxhZygncGVyY2VudCBwcmV2aW91cycpKSB7XG4gICAgICAgICAgICB0ZXh0LnB1c2gocG9pbnQucGVyY2VudFByZXZpb3VzTGFiZWwgKyAnIG9mIHByZXZpb3VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaGFzRmxhZygncGVyY2VudCB0b3RhbCcpKSB7XG4gICAgICAgICAgICB0ZXh0LnB1c2gocG9pbnQucGVyY2VudFRvdGFsTGFiZWwgKyAnIG9mIHRvdGFsJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcG9pbnQuZXh0cmFUZXh0ID0gdGV4dC5qb2luKCc8YnI+Jyk7XG5cbiAgICBwb2ludC5jb2xvciA9IGdldFRyYWNlQ29sb3IodHJhY2UsIGRpKTtcblxuICAgIHJldHVybiBbcG9pbnRdO1xufTtcblxuZnVuY3Rpb24gZ2V0VHJhY2VDb2xvcih0cmFjZSwgZGkpIHtcbiAgICB2YXIgY29udCA9IHRyYWNlLm1hcmtlcjtcbiAgICB2YXIgbWMgPSBkaS5tYyB8fCBjb250LmNvbG9yO1xuICAgIHZhciBtbGMgPSBkaS5tbGMgfHwgY29udC5saW5lLmNvbG9yO1xuICAgIHZhciBtbHcgPSBkaS5tbHcgfHwgY29udC5saW5lLndpZHRoO1xuICAgIGlmKG9wYWNpdHkobWMpKSByZXR1cm4gbWM7XG4gICAgZWxzZSBpZihvcGFjaXR5KG1sYykgJiYgbWx3KSByZXR1cm4gbWxjO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBsYXlvdXRBdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKS5zdXBwbHlEZWZhdWx0cyxcbiAgICBjcm9zc1RyYWNlRGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKS5jcm9zc1RyYWNlRGVmYXVsdHMsXG4gICAgc3VwcGx5TGF5b3V0RGVmYXVsdHM6IHJlcXVpcmUoJy4vbGF5b3V0X2RlZmF1bHRzJyksXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJyksXG4gICAgY3Jvc3NUcmFjZUNhbGM6IHJlcXVpcmUoJy4vY3Jvc3NfdHJhY2VfY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLFxuICAgIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJykuc3R5bGUsXG4gICAgaG92ZXJQb2ludHM6IHJlcXVpcmUoJy4vaG92ZXInKSxcbiAgICBldmVudERhdGE6IHJlcXVpcmUoJy4vZXZlbnRfZGF0YScpLFxuXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuLi9iYXIvc2VsZWN0JyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdmdW5uZWwnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4nKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2Jhci1saWtlJywgJ2NhcnRlc2lhbicsICdzdmcnLCAnb3JpZW50ZWQnLCAnc2hvd0xlZ2VuZCcsICd6b29tU2NhbGUnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVmlzdWFsaXplIHN0YWdlcyBpbiBhIHByb2Nlc3MgdXNpbmcgbGVuZ3RoLWVuY29kZWQgYmFycy4gVGhpcyB0cmFjZSBjYW4gYmUgdXNlZCcsXG4gICAgICAgICAgICAndG8gc2hvdyBkYXRhIGluIGVpdGhlciBhIHBhcnQtdG8td2hvbGUgcmVwcmVzZW50YXRpb24gd2hlcmVpbiBlYWNoIGl0ZW0gYXBwZWFycycsXG4gICAgICAgICAgICAnaW4gYSBzaW5nbGUgc3RhZ2UsIG9yIGluIGEgXCJkcm9wLW9mZlwiIHJlcHJlc2VudGF0aW9uIHdoZXJlaW4gZWFjaCBpdGVtIGFwcGVhcnMgaW4nLFxuICAgICAgICAgICAgJ2VhY2ggc3RhZ2UgaXQgdHJhdmVyc2VkLiBTZWUgYWxzbyB0aGUgXCJmdW5uZWxhcmVhXCIgdHJhY2UgdHlwZSBmb3IgYSBkaWZmZXJlbnQnLFxuICAgICAgICAgICAgJ2FwcHJvYWNoIHRvIHZpc3VhbGl6aW5nIGZ1bm5lbCBkYXRhLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmdW5uZWxtb2RlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ3N0YWNrJywgJ2dyb3VwJywgJ292ZXJsYXknXSxcbiAgICAgICAgZGZsdDogJ3N0YWNrJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaG93IGJhcnMgYXQgdGhlIHNhbWUgbG9jYXRpb24gY29vcmRpbmF0ZScsXG4gICAgICAgICAgICAnYXJlIGRpc3BsYXllZCBvbiB0aGUgZ3JhcGguJyxcbiAgICAgICAgICAgICdXaXRoICpzdGFjayosIHRoZSBiYXJzIGFyZSBzdGFja2VkIG9uIHRvcCBvZiBvbmUgYW5vdGhlcicsXG4gICAgICAgICAgICAnV2l0aCAqZ3JvdXAqLCB0aGUgYmFycyBhcmUgcGxvdHRlZCBuZXh0IHRvIG9uZSBhbm90aGVyJyxcbiAgICAgICAgICAgICdjZW50ZXJlZCBhcm91bmQgdGhlIHNoYXJlZCBsb2NhdGlvbi4nLFxuICAgICAgICAgICAgJ1dpdGggKm92ZXJsYXkqLCB0aGUgYmFycyBhcmUgcGxvdHRlZCBvdmVyIG9uZSBhbm90aGVyLCcsXG4gICAgICAgICAgICAneW91IG1pZ2h0IG5lZWQgdG8gYW4gKm9wYWNpdHkqIHRvIHNlZSBtdWx0aXBsZSBiYXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGZ1bm5lbGdhcDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgZ2FwIChpbiBwbG90IGZyYWN0aW9uKSBiZXR3ZWVuIGJhcnMgb2YnLFxuICAgICAgICAgICAgJ2FkamFjZW50IGxvY2F0aW9uIGNvb3JkaW5hdGVzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGZ1bm5lbGdyb3VwZ2FwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBnYXAgKGluIHBsb3QgZnJhY3Rpb24pIGJldHdlZW4gYmFycyBvZicsXG4gICAgICAgICAgICAndGhlIHNhbWUgbG9jYXRpb24gY29vcmRpbmF0ZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGxheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEpIHtcbiAgICB2YXIgaGFzVHJhY2VUeXBlID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShsYXlvdXRJbiwgbGF5b3V0T3V0LCBsYXlvdXRBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZnVsbERhdGFbaV07XG5cbiAgICAgICAgaWYodHJhY2UudmlzaWJsZSAmJiB0cmFjZS50eXBlID09PSAnZnVubmVsJykge1xuICAgICAgICAgICAgaGFzVHJhY2VUeXBlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoaGFzVHJhY2VUeXBlKSB7XG4gICAgICAgIGNvZXJjZSgnZnVubmVsbW9kZScpO1xuICAgICAgICBjb2VyY2UoJ2Z1bm5lbGdhcCcsIDAuMik7XG4gICAgICAgIGNvZXJjZSgnZnVubmVsZ3JvdXBnYXAnKTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciBCQUROVU0gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvbnVtZXJpY2FsJykuQkFETlVNO1xudmFyIGJhclBsb3QgPSByZXF1aXJlKCcuLi9iYXIvcGxvdCcpO1xudmFyIGNsZWFyTWluVGV4dFNpemUgPSByZXF1aXJlKCcuLi9iYXIvdW5pZm9ybV90ZXh0JykuY2xlYXJNaW5UZXh0U2l6ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwbG90KGdkLCBwbG90aW5mbywgY2RNb2R1bGUsIHRyYWNlTGF5ZXIpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuXG4gICAgY2xlYXJNaW5UZXh0U2l6ZSgnZnVubmVsJywgZnVsbExheW91dCk7XG5cbiAgICBwbG90Q29ubmVjdG9yUmVnaW9ucyhnZCwgcGxvdGluZm8sIGNkTW9kdWxlLCB0cmFjZUxheWVyKTtcbiAgICBwbG90Q29ubmVjdG9yTGluZXMoZ2QsIHBsb3RpbmZvLCBjZE1vZHVsZSwgdHJhY2VMYXllcik7XG5cbiAgICBiYXJQbG90LnBsb3QoZ2QsIHBsb3RpbmZvLCBjZE1vZHVsZSwgdHJhY2VMYXllciwge1xuICAgICAgICBtb2RlOiBmdWxsTGF5b3V0LmZ1bm5lbG1vZGUsXG4gICAgICAgIG5vcm06IGZ1bGxMYXlvdXQuZnVubmVsbW9kZSxcbiAgICAgICAgZ2FwOiBmdWxsTGF5b3V0LmZ1bm5lbGdhcCxcbiAgICAgICAgZ3JvdXBnYXA6IGZ1bGxMYXlvdXQuZnVubmVsZ3JvdXBnYXBcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHBsb3RDb25uZWN0b3JSZWdpb25zKGdkLCBwbG90aW5mbywgY2RNb2R1bGUsIHRyYWNlTGF5ZXIpIHtcbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcblxuICAgIExpYi5tYWtlVHJhY2VHcm91cHModHJhY2VMYXllciwgY2RNb2R1bGUsICd0cmFjZSBiYXJzJykuZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICB2YXIgcGxvdEdyb3VwID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcblxuICAgICAgICB2YXIgZ3JvdXAgPSBMaWIuZW5zdXJlU2luZ2xlKHBsb3RHcm91cCwgJ2cnLCAncmVnaW9ucycpO1xuXG4gICAgICAgIGlmKCF0cmFjZS5jb25uZWN0b3IgfHwgIXRyYWNlLmNvbm5lY3Rvci52aXNpYmxlKSB7XG4gICAgICAgICAgICBncm91cC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpc0hvcml6b250YWwgPSAodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJyk7XG5cbiAgICAgICAgdmFyIGNvbm5lY3RvcnMgPSBncm91cC5zZWxlY3RBbGwoJ2cucmVnaW9uJykuZGF0YShMaWIuaWRlbnRpdHkpO1xuXG4gICAgICAgIGNvbm5lY3RvcnMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3JlZ2lvbicsIHRydWUpO1xuXG4gICAgICAgIGNvbm5lY3RvcnMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBsZW4gPSBjb25uZWN0b3JzLnNpemUoKTtcblxuICAgICAgICBjb25uZWN0b3JzLmVhY2goZnVuY3Rpb24oZGksIGkpIHtcbiAgICAgICAgICAgIC8vIGRvbid0IGRyYXcgbGluZXMgYmV0d2VlbiBudWxsc1xuICAgICAgICAgICAgaWYoaSAhPT0gbGVuIC0gMSAmJiAhZGkuY05leHQpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIHh5ID0gZ2V0WFkoZGksIHhhLCB5YSwgaXNIb3Jpem9udGFsKTtcbiAgICAgICAgICAgIHZhciB4ID0geHlbMF07XG4gICAgICAgICAgICB2YXIgeSA9IHh5WzFdO1xuXG4gICAgICAgICAgICB2YXIgc2hhcGUgPSAnJztcblxuICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgeFswXSAhPT0gQkFETlVNICYmIHlbMF0gIT09IEJBRE5VTSAmJlxuICAgICAgICAgICAgICAgIHhbMV0gIT09IEJBRE5VTSAmJiB5WzFdICE9PSBCQUROVU0gJiZcbiAgICAgICAgICAgICAgICB4WzJdICE9PSBCQUROVU0gJiYgeVsyXSAhPT0gQkFETlVNICYmXG4gICAgICAgICAgICAgICAgeFszXSAhPT0gQkFETlVNICYmIHlbM10gIT09IEJBRE5VTVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlICs9ICdNJyArIHhbMF0gKyAnLCcgKyB5WzFdICsgJ0wnICsgeFsyXSArICcsJyArIHlbMl0gKyAnSCcgKyB4WzNdICsgJ0wnICsgeFsxXSArICcsJyArIHlbMV0gKyAnWic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgKz0gJ00nICsgeFsxXSArICcsJyArIHlbMV0gKyAnTCcgKyB4WzJdICsgJywnICsgeVszXSArICdWJyArIHlbMl0gKyAnTCcgKyB4WzFdICsgJywnICsgeVswXSArICdaJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNoYXBlID09PSAnJykgc2hhcGUgPSAnTTAsMFonO1xuXG4gICAgICAgICAgICBMaWIuZW5zdXJlU2luZ2xlKGQzLnNlbGVjdCh0aGlzKSwgJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgc2hhcGUpXG4gICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5zZXRDbGlwVXJsLCBwbG90aW5mby5sYXllckNsaXBJZCwgZ2QpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcGxvdENvbm5lY3RvckxpbmVzKGdkLCBwbG90aW5mbywgY2RNb2R1bGUsIHRyYWNlTGF5ZXIpIHtcbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcblxuICAgIExpYi5tYWtlVHJhY2VHcm91cHModHJhY2VMYXllciwgY2RNb2R1bGUsICd0cmFjZSBiYXJzJykuZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICB2YXIgcGxvdEdyb3VwID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcblxuICAgICAgICB2YXIgZ3JvdXAgPSBMaWIuZW5zdXJlU2luZ2xlKHBsb3RHcm91cCwgJ2cnLCAnbGluZXMnKTtcblxuICAgICAgICBpZighdHJhY2UuY29ubmVjdG9yIHx8ICF0cmFjZS5jb25uZWN0b3IudmlzaWJsZSB8fCAhdHJhY2UuY29ubmVjdG9yLmxpbmUud2lkdGgpIHtcbiAgICAgICAgICAgIGdyb3VwLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlzSG9yaXpvbnRhbCA9ICh0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKTtcblxuICAgICAgICB2YXIgY29ubmVjdG9ycyA9IGdyb3VwLnNlbGVjdEFsbCgnZy5saW5lJykuZGF0YShMaWIuaWRlbnRpdHkpO1xuXG4gICAgICAgIGNvbm5lY3RvcnMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2xpbmUnLCB0cnVlKTtcblxuICAgICAgICBjb25uZWN0b3JzLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgbGVuID0gY29ubmVjdG9ycy5zaXplKCk7XG5cbiAgICAgICAgY29ubmVjdG9ycy5lYWNoKGZ1bmN0aW9uKGRpLCBpKSB7XG4gICAgICAgICAgICAvLyBkb24ndCBkcmF3IGxpbmVzIGJldHdlZW4gbnVsbHNcbiAgICAgICAgICAgIGlmKGkgIT09IGxlbiAtIDEgJiYgIWRpLmNOZXh0KSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciB4eSA9IGdldFhZKGRpLCB4YSwgeWEsIGlzSG9yaXpvbnRhbCk7XG4gICAgICAgICAgICB2YXIgeCA9IHh5WzBdO1xuICAgICAgICAgICAgdmFyIHkgPSB4eVsxXTtcblxuICAgICAgICAgICAgdmFyIHNoYXBlID0gJyc7XG5cbiAgICAgICAgICAgIGlmKHhbM10gIT09IHVuZGVmaW5lZCAmJiB5WzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZihpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgKz0gJ00nICsgeFswXSArICcsJyArIHlbMV0gKyAnTCcgKyB4WzJdICsgJywnICsgeVsyXTtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgKz0gJ00nICsgeFsxXSArICcsJyArIHlbMV0gKyAnTCcgKyB4WzNdICsgJywnICsgeVsyXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaGFwZSArPSAnTScgKyB4WzFdICsgJywnICsgeVsxXSArICdMJyArIHhbMl0gKyAnLCcgKyB5WzNdO1xuICAgICAgICAgICAgICAgICAgICBzaGFwZSArPSAnTScgKyB4WzFdICsgJywnICsgeVswXSArICdMJyArIHhbMl0gKyAnLCcgKyB5WzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2hhcGUgPT09ICcnKSBzaGFwZSA9ICdNMCwwWic7XG5cbiAgICAgICAgICAgIExpYi5lbnN1cmVTaW5nbGUoZDMuc2VsZWN0KHRoaXMpLCAncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBzaGFwZSlcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldENsaXBVcmwsIHBsb3RpbmZvLmxheWVyQ2xpcElkLCBnZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRYWShkaSwgeGEsIHlhLCBpc0hvcml6b250YWwpIHtcbiAgICB2YXIgcyA9IFtdO1xuICAgIHZhciBwID0gW107XG5cbiAgICB2YXIgc0F4aXMgPSBpc0hvcml6b250YWwgPyB4YSA6IHlhO1xuICAgIHZhciBwQXhpcyA9IGlzSG9yaXpvbnRhbCA/IHlhIDogeGE7XG5cbiAgICBzWzBdID0gc0F4aXMuYzJwKGRpLnMwLCB0cnVlKTtcbiAgICBwWzBdID0gcEF4aXMuYzJwKGRpLnAwLCB0cnVlKTtcblxuICAgIHNbMV0gPSBzQXhpcy5jMnAoZGkuczEsIHRydWUpO1xuICAgIHBbMV0gPSBwQXhpcy5jMnAoZGkucDEsIHRydWUpO1xuXG4gICAgc1syXSA9IHNBeGlzLmMycChkaS5uZXh0UzAsIHRydWUpO1xuICAgIHBbMl0gPSBwQXhpcy5jMnAoZGkubmV4dFAwLCB0cnVlKTtcblxuICAgIHNbM10gPSBzQXhpcy5jMnAoZGkubmV4dFMxLCB0cnVlKTtcbiAgICBwWzNdID0gcEF4aXMuYzJwKGRpLm5leHRQMSwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gaXNIb3Jpem9udGFsID8gW3MsIHBdIDogW3AsIHNdO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIERFU0VMRUNURElNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL2ludGVyYWN0aW9ucycpLkRFU0VMRUNURElNO1xudmFyIGJhclN0eWxlID0gcmVxdWlyZSgnLi4vYmFyL3N0eWxlJyk7XG52YXIgcmVzaXplVGV4dCA9IHJlcXVpcmUoJy4uL2Jhci91bmlmb3JtX3RleHQnKS5yZXNpemVUZXh0O1xudmFyIHN0eWxlVGV4dFBvaW50cyA9IGJhclN0eWxlLnN0eWxlVGV4dFBvaW50cztcblxuZnVuY3Rpb24gc3R5bGUoZ2QsIGNkLCBzZWwpIHtcbiAgICB2YXIgcyA9IHNlbCA/IHNlbCA6IGQzLnNlbGVjdChnZCkuc2VsZWN0QWxsKCdnLmZ1bm5lbGxheWVyJykuc2VsZWN0QWxsKCdnLnRyYWNlJyk7XG4gICAgcmVzaXplVGV4dChnZCwgcywgJ2Z1bm5lbCcpO1xuXG4gICAgcy5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRbMF0udHJhY2Uub3BhY2l0eTsgfSk7XG5cbiAgICBzLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgZ1RyYWNlID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgdHJhY2UgPSBkWzBdLnRyYWNlO1xuXG4gICAgICAgIGdUcmFjZS5zZWxlY3RBbGwoJy5wb2ludCA+IHBhdGgnKS5lYWNoKGZ1bmN0aW9uKGRpKSB7XG4gICAgICAgICAgICBpZighZGkuaXNCbGFuaykge1xuICAgICAgICAgICAgICAgIHZhciBjb250ID0gdHJhY2UubWFya2VyO1xuXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLmZpbGwsIGRpLm1jIHx8IGNvbnQuY29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgZGkubWxjIHx8IGNvbnQubGluZS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5kYXNoTGluZSwgY29udC5saW5lLmRhc2gsIGRpLm1sdyB8fCBjb250LmxpbmUud2lkdGgpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIHRyYWNlLnNlbGVjdGVkcG9pbnRzICYmICFkaS5zZWxlY3RlZCA/IERFU0VMRUNURElNIDogMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0eWxlVGV4dFBvaW50cyhnVHJhY2UsIHRyYWNlLCBnZCk7XG5cbiAgICAgICAgZ1RyYWNlLnNlbGVjdEFsbCgnLnJlZ2lvbnMnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdEFsbCgncGF0aCcpLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAwKS5jYWxsKENvbG9yLmZpbGwsIHRyYWNlLmNvbm5lY3Rvci5maWxsY29sb3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICBnVHJhY2Uuc2VsZWN0QWxsKCcubGluZXMnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbnQgPSB0cmFjZS5jb25uZWN0b3IubGluZTtcblxuICAgICAgICAgICAgRHJhd2luZy5saW5lR3JvdXBTdHlsZShcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCdwYXRoJyksXG4gICAgICAgICAgICAgICAgY29udC53aWR0aCxcbiAgICAgICAgICAgICAgICBjb250LmNvbG9yLFxuICAgICAgICAgICAgICAgIGNvbnQuZGFzaFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0eWxlOiBzdHlsZVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=