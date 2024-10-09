(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_waterfall_js"],{

/***/ "./node_modules/plotly.js/lib/waterfall.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/waterfall.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/waterfall */ "./node_modules/plotly.js/src/traces/waterfall/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/attributes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/attributes.js ***!
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



var barAttrs = __webpack_require__(/*! ../bar/attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js");
var lineAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js").line;
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/waterfall/constants.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

function directionAttrs(dirTxt) {
    return {
        marker: {
            color: extendFlat({}, barAttrs.marker.color, {
                arrayOk: false,
                editType: 'style',
                description: 'Sets the marker color of all ' + dirTxt + ' values.'
            }),
            line: {
                color: extendFlat({}, barAttrs.marker.line.color, {
                    arrayOk: false,
                    editType: 'style',
                    description: 'Sets the line color of all ' + dirTxt + ' values.'
                }),
                width: extendFlat({}, barAttrs.marker.line.width, {
                    arrayOk: false,
                    editType: 'style',
                    description: 'Sets the line width of all ' + dirTxt + ' values.'
                }),
                editType: 'style',
            },
            editType: 'style'
        },
        editType: 'style'
    };
}

module.exports = {
    measure: {
        valType: 'data_array',
        dflt: [],
        role: 'info',
        editType: 'calc',
        description: [
            'An array containing types of values.',
            'By default the values are considered as \'relative\'.',
            'However; it is possible to use \'total\' to compute the sums.',
            'Also \'absolute\' could be applied to reset the computed total',
            'or to declare an initial value where needed.'
        ].join(' ')
    },

    base: {
        valType: 'number',
        dflt: null,
        arrayOk: false,
        role: 'info',
        editType: 'calc',
        description: [
            'Sets where the bar base is drawn (in position axis units).'
        ].join(' ')
    },

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
        flags: ['name', 'x', 'y', 'text', 'initial', 'delta', 'final']
    }),

    textinfo: {
        valType: 'flaglist',
        flags: ['label', 'text', 'initial', 'delta', 'final'],
        extras: ['none'],
        role: 'info',
        editType: 'plot',
        arrayOk: false,
        description: [
            'Determines which trace information appear on the graph.',
            'In the case of having multiple waterfalls, totals',
            'are computed separately (per trace).'
        ].join(' ')
    },
    // TODO: incorporate `label` and `value` in the eventData
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: constants.eventDataKeys.concat(['label'])
    }),
    text: barAttrs.text,
    textposition: barAttrs.textposition,
    insidetextanchor: barAttrs.insidetextanchor,
    textangle: barAttrs.textangle,
    textfont: barAttrs.textfont,
    insidetextfont: barAttrs.insidetextfont,
    outsidetextfont: barAttrs.outsidetextfont,
    constraintext: barAttrs.constraintext,

    cliponaxis: barAttrs.cliponaxis,
    orientation: barAttrs.orientation,

    offset: barAttrs.offset,
    width: barAttrs.width,

    increasing: directionAttrs('increasing'),
    decreasing: directionAttrs('decreasing'),
    totals: directionAttrs('intermediate sums and total'),

    connector: {
        line: {
            color: extendFlat({}, lineAttrs.color, {dflt: Color.defaultLine}),
            width: extendFlat({}, lineAttrs.width, {
                editType: 'plot', // i.e. to adjust bars is mode: 'between'. See https://github.com/plotly/plotly.js/issues/3787
            }),
            dash: lineAttrs.dash,
            editType: 'plot'
        },
        mode: {
            valType: 'enumerated',
            values: ['spanning', 'between'],
            dflt: 'between',
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the shape of connector lines.'
            ].join(' ')
        },
        visible: {
            valType: 'boolean',
            dflt: true,
            role: 'info',
            editType: 'plot',
            description: [
                'Determines if connector lines are drawn. '
            ].join(' ')
        },
        editType: 'plot'
    },

    offsetgroup: barAttrs.offsetgroup,
    alignmentgroup: barAttrs.alignmentgroup
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/calc.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/calc.js ***!
  \*************************************************************/
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
var mergeArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").mergeArray;
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

function isAbsolute(a) {
    return (a === 'a' || a === 'absolute');
}

function isTotal(a) {
    return (a === 't' || a === 'total');
}

module.exports = function calc(gd, trace) {
    var xa = Axes.getFromId(gd, trace.xaxis || 'x');
    var ya = Axes.getFromId(gd, trace.yaxis || 'y');
    var size, pos;

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

    // set position and size (as well as for waterfall total size)
    var previousSum = 0;
    var newSize;
    // trace-wide flags
    var hasTotals = false;

    for(var i = 0; i < serieslen; i++) {
        var amount = size[i] || 0;

        var connectToNext = false;
        if(size[i] !== BADNUM || isTotal(trace.measure[i]) || isAbsolute(trace.measure[i])) {
            if(i + 1 < serieslen && (size[i + 1] !== BADNUM || isTotal(trace.measure[i + 1]) || isAbsolute(trace.measure[i + 1]))) {
                connectToNext = true;
            }
        }

        var cdi = cd[i] = {
            i: i,
            p: pos[i],
            s: amount,
            rawS: amount,
            cNext: connectToNext
        };

        if(isAbsolute(trace.measure[i])) {
            previousSum = cdi.s;

            cdi.isSum = true;
            cdi.dir = 'totals';
            cdi.s = previousSum;
        } else if(isTotal(trace.measure[i])) {
            cdi.isSum = true;
            cdi.dir = 'totals';
            cdi.s = previousSum;
        } else {
            // default: relative
            cdi.isSum = false;
            cdi.dir = cdi.rawS < 0 ? 'decreasing' : 'increasing';
            newSize = cdi.s;
            cdi.s = previousSum + newSize;
            previousSum += newSize;
        }

        if(cdi.dir === 'totals') {
            hasTotals = true;
        }

        if(trace.ids) {
            cdi.id = String(trace.ids[i]);
        }

        cdi.v = (trace.base || 0) + previousSum;
    }

    if(cd.length) cd[0].hasTotals = hasTotals;

    mergeArray(trace.text, cd, 'tx');
    mergeArray(trace.hovertext, cd, 'htx');
    calcSelection(cd, trace);

    return cd;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/constants.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/constants.js ***!
  \******************************************************************/
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
        'initial',
        'delta',
        'final'
    ]
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/cross_trace_calc.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/cross_trace_calc.js ***!
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



var setGroupPositions = __webpack_require__(/*! ../bar/cross_trace_calc */ "./node_modules/plotly.js/src/traces/bar/cross_trace_calc.js").setGroupPositions;

module.exports = function crossTraceCalc(gd, plotinfo) {
    var fullLayout = gd._fullLayout;
    var fullData = gd._fullData;
    var calcdata = gd.calcdata;
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;
    var waterfalls = [];
    var waterfallsVert = [];
    var waterfallsHorz = [];
    var cd, i;

    for(i = 0; i < fullData.length; i++) {
        var fullTrace = fullData[i];

        if(
            fullTrace.visible === true &&
            fullTrace.xaxis === xa._id &&
            fullTrace.yaxis === ya._id &&
            fullTrace.type === 'waterfall'
        ) {
            cd = calcdata[i];

            if(fullTrace.orientation === 'h') {
                waterfallsHorz.push(cd);
            } else {
                waterfallsVert.push(cd);
            }

            waterfalls.push(cd);
        }
    }

    var opts = {
        mode: fullLayout.waterfallmode,
        norm: fullLayout.waterfallnorm,
        gap: fullLayout.waterfallgap,
        groupgap: fullLayout.waterfallgroupgap
    };

    setGroupPositions(gd, xa, ya, waterfallsVert, opts);
    setGroupPositions(gd, ya, xa, waterfallsHorz, opts);

    for(i = 0; i < waterfalls.length; i++) {
        cd = waterfalls[i];

        for(var j = 0; j < cd.length; j++) {
            var di = cd[j];

            if(di.isSum === false) {
                di.s0 += (j === 0) ? 0 : cd[j - 1].s;
            }

            if(j + 1 < cd.length) {
                cd[j].nextP0 = cd[j + 1].p0;
                cd[j].nextS0 = cd[j + 1].s0;
            }
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/defaults.js ***!
  \*****************************************************************/
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
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/waterfall/attributes.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var delta = __webpack_require__(/*! ../../constants/delta.js */ "./node_modules/plotly.js/src/constants/delta.js");

var INCREASING_COLOR = delta.INCREASING.COLOR;
var DECREASING_COLOR = delta.DECREASING.COLOR;
var TOTALS_COLOR = '#4499FF';

function handleDirection(coerce, direction, defaultColor) {
    coerce(direction + '.marker.color', defaultColor);
    coerce(direction + '.marker.line.color', Color.defaultLine);
    coerce(direction + '.marker.line.width');
}

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleXYDefaults(traceIn, traceOut, layout, coerce);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('measure');

    coerce('orientation', (traceOut.x && !traceOut.y) ? 'h' : 'v');
    coerce('base');
    coerce('offset');
    coerce('width');

    coerce('text');

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


    if(traceOut.textposition !== 'none') {
        coerce('texttemplate');
        if(!traceOut.texttemplate) coerce('textinfo');
    }

    handleDirection(coerce, 'increasing', INCREASING_COLOR);
    handleDirection(coerce, 'decreasing', DECREASING_COLOR);
    handleDirection(coerce, 'totals', TOTALS_COLOR);

    var connectorVisible = coerce('connector.visible');
    if(connectorVisible) {
        coerce('connector.mode');
        var connectorLineWidth = coerce('connector.line.width');
        if(connectorLineWidth) {
            coerce('connector.line.color');
            coerce('connector.line.dash');
        }
    }
}

function crossTraceDefaults(fullData, fullLayout) {
    var traceIn, traceOut;

    function coerce(attr) {
        return Lib.coerce(traceOut._input, traceOut, attributes, attr);
    }

    if(fullLayout.waterfallmode === 'group') {
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

/***/ "./node_modules/plotly.js/src/traces/waterfall/event_data.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/event_data.js ***!
  \*******************************************************************/
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
    if('initial' in pt) out.initial = pt.initial;
    if('delta' in pt) out.delta = pt.delta;
    if('final' in pt) out.final = pt.final;

    if(pt.xa) out.xaxis = pt.xa;
    if(pt.ya) out.yaxis = pt.ya;

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/hover.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/hover.js ***!
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



var hoverLabelText = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js").hoverLabelText;
var opacity = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js").opacity;
var hoverOnBars = __webpack_require__(/*! ../bar/hover */ "./node_modules/plotly.js/src/traces/bar/hover.js").hoverOnBars;
var delta = __webpack_require__(/*! ../../constants/delta.js */ "./node_modules/plotly.js/src/constants/delta.js");

var DIRSYMBOL = {
    increasing: delta.INCREASING.SYMBOL,
    decreasing: delta.DECREASING.SYMBOL
};

module.exports = function hoverPoints(pointData, xval, yval, hovermode) {
    var point = hoverOnBars(pointData, xval, yval, hovermode);
    if(!point) return;

    var cd = point.cd;
    var trace = cd[0].trace;
    var isHorizontal = (trace.orientation === 'h');

    var vAxis = isHorizontal ? pointData.xa : pointData.ya;

    function formatNumber(a) {
        return hoverLabelText(vAxis, a);
    }

    // the closest data point
    var index = point.index;
    var di = cd[index];

    var size = (di.isSum) ? di.b + di.s : di.rawS;

    if(!di.isSum) {
        point.initial = di.b + di.s - size;
        point.delta = size;
        point.final = point.initial + point.delta;

        var v = formatNumber(Math.abs(point.delta));
        point.deltaLabel = size < 0 ? '(' + v + ')' : v;
        point.finalLabel = formatNumber(point.final);
        point.initialLabel = formatNumber(point.initial);
    }

    var hoverinfo = di.hi || trace.hoverinfo;
    var text = [];
    if(hoverinfo && hoverinfo !== 'none' && hoverinfo !== 'skip') {
        var isAll = (hoverinfo === 'all');
        var parts = hoverinfo.split('+');

        var hasFlag = function(flag) { return isAll || parts.indexOf(flag) !== -1; };

        if(!di.isSum) {
            if(hasFlag('final') &&
                (isHorizontal ? !hasFlag('x') : !hasFlag('y')) // don't display redundant info.
            ) {
                text.push(point.finalLabel);
            }
            if(hasFlag('delta')) {
                if(size < 0) {
                    text.push(point.deltaLabel + ' ' + DIRSYMBOL.decreasing);
                } else {
                    text.push(point.deltaLabel + ' ' + DIRSYMBOL.increasing);
                }
            }
            if(hasFlag('initial')) {
                text.push('Initial: ' + point.initialLabel);
            }
        }
    }

    if(text.length) point.extraText = text.join('<br>');

    point.color = getTraceColor(trace, di);

    return [point];
};

function getTraceColor(trace, di) {
    var cont = trace[di.dir].marker;
    var mc = cont.color;
    var mlc = cont.line.color;
    var mlw = cont.line.width;
    if(opacity(mc)) return mc;
    else if(opacity(mlc) && mlw) return mlc;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/waterfall/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/waterfall/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/waterfall/defaults.js").supplyDefaults,
    crossTraceDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/waterfall/defaults.js").crossTraceDefaults,
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/waterfall/layout_defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/waterfall/calc.js"),
    crossTraceCalc: __webpack_require__(/*! ./cross_trace_calc */ "./node_modules/plotly.js/src/traces/waterfall/cross_trace_calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/waterfall/plot.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/waterfall/style.js").style,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/waterfall/hover.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/waterfall/event_data.js"),

    selectPoints: __webpack_require__(/*! ../bar/select */ "./node_modules/plotly.js/src/traces/bar/select.js"),

    moduleType: 'trace',
    name: 'waterfall',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['bar-like', 'cartesian', 'svg', 'oriented', 'showLegend', 'zoomScale'],
    meta: {
        description: [
            'Draws waterfall trace which is useful graph to displays the',
            'contribution of various elements (either positive or negative)',
            'in a bar chart. The data visualized by the span of the bars is',
            'set in `y` if `orientation` is set th *v* (the default) and the',
            'labels are set in `x`.',
            'By setting `orientation` to *h*, the roles are interchanged.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/layout_attributes.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/layout_attributes.js ***!
  \**************************************************************************/
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
    waterfallmode: {
        valType: 'enumerated',
        values: ['group', 'overlay'],
        dflt: 'group',
        role: 'info',
        editType: 'calc',
        description: [
            'Determines how bars at the same location coordinate',
            'are displayed on the graph.',
            'With *group*, the bars are plotted next to one another',
            'centered around the shared location.',
            'With *overlay*, the bars are plotted over one another,',
            'you might need to an *opacity* to see multiple bars.'
        ].join(' ')
    },
    waterfallgap: {
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
    waterfallgroupgap: {
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

/***/ "./node_modules/plotly.js/src/traces/waterfall/layout_defaults.js":
/*!************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/layout_defaults.js ***!
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
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/waterfall/layout_attributes.js");

module.exports = function(layoutIn, layoutOut, fullData) {
    var hasTraceType = false;

    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    for(var i = 0; i < fullData.length; i++) {
        var trace = fullData[i];

        if(trace.visible && trace.type === 'waterfall') {
            hasTraceType = true;
            break;
        }
    }

    if(hasTraceType) {
        coerce('waterfallmode');
        coerce('waterfallgap', 0.2);
        coerce('waterfallgroupgap');
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/plot.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/plot.js ***!
  \*************************************************************/
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

    clearMinTextSize('waterfall', fullLayout);

    barPlot.plot(gd, plotinfo, cdModule, traceLayer, {
        mode: fullLayout.waterfallmode,
        norm: fullLayout.waterfallmode,
        gap: fullLayout.waterfallgap,
        groupgap: fullLayout.waterfallgroupgap
    });

    plotConnectors(gd, plotinfo, cdModule, traceLayer);
};

function plotConnectors(gd, plotinfo, cdModule, traceLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    Lib.makeTraceGroups(traceLayer, cdModule, 'trace bars').each(function(cd) {
        var plotGroup = d3.select(this);
        var trace = cd[0].trace;

        var group = Lib.ensureSingle(plotGroup, 'g', 'lines');

        if(!trace.connector || !trace.connector.visible) {
            group.remove();
            return;
        }

        var isHorizontal = (trace.orientation === 'h');
        var mode = trace.connector.mode;

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

            if(
                x[0] !== BADNUM && y[0] !== BADNUM &&
                x[1] !== BADNUM && y[1] !== BADNUM
            ) {
                if(mode === 'spanning') {
                    if(!di.isSum && i > 0) {
                        if(isHorizontal) {
                            shape += 'M' + x[0] + ',' + y[1] + 'V' + y[0];
                        } else {
                            shape += 'M' + x[1] + ',' + y[0] + 'H' + x[0];
                        }
                    }
                }

                if(mode !== 'between') {
                    if(di.isSum || i < len - 1) {
                        if(isHorizontal) {
                            shape += 'M' + x[1] + ',' + y[0] + 'V' + y[1];
                        } else {
                            shape += 'M' + x[0] + ',' + y[1] + 'H' + x[1];
                        }
                    }
                }

                if(x[2] !== BADNUM && y[2] !== BADNUM) {
                    if(isHorizontal) {
                        shape += 'M' + x[1] + ',' + y[1] + 'V' + y[2];
                    } else {
                        shape += 'M' + x[1] + ',' + y[1] + 'H' + x[2];
                    }
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

    return isHorizontal ? [s, p] : [p, s];
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/waterfall/style.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/waterfall/style.js ***!
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var DESELECTDIM = __webpack_require__(/*! ../../constants/interactions */ "./node_modules/plotly.js/src/constants/interactions.js").DESELECTDIM;
var barStyle = __webpack_require__(/*! ../bar/style */ "./node_modules/plotly.js/src/traces/bar/style.js");
var resizeText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").resizeText;
var styleTextPoints = barStyle.styleTextPoints;

function style(gd, cd, sel) {
    var s = sel ? sel : d3.select(gd).selectAll('g.waterfalllayer').selectAll('g.trace');
    resizeText(gd, s, 'waterfall');

    s.style('opacity', function(d) { return d[0].trace.opacity; });

    s.each(function(d) {
        var gTrace = d3.select(this);
        var trace = d[0].trace;

        gTrace.selectAll('.point > path').each(function(di) {
            if(!di.isBlank) {
                var cont = trace[di.dir].marker;

                d3.select(this)
                    .call(Color.fill, cont.color)
                    .call(Color.stroke, cont.line.color)
                    .call(Drawing.dashLine, cont.line.dash, cont.line.width)
                    .style('opacity', trace.selectedpoints && !di.selected ? DESELECTDIM : 1);
            }
        });

        styleTextPoints(gTrace, trace, gd);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvd2F0ZXJmYWxsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvd2F0ZXJmYWxsL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy93YXRlcmZhbGwvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3dhdGVyZmFsbC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy93YXRlcmZhbGwvY3Jvc3NfdHJhY2VfY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3dhdGVyZmFsbC9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3dhdGVyZmFsbC9ldmVudF9kYXRhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvd2F0ZXJmYWxsL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvd2F0ZXJmYWxsL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvd2F0ZXJmYWxsL2xheW91dF9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvd2F0ZXJmYWxsL2xheW91dF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3dhdGVyZmFsbC9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvd2F0ZXJmYWxsL3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLDZIQUFtRDs7Ozs7Ozs7Ozs7O0FDVm5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGVBQWUsbUJBQU8sQ0FBQyxnRkFBbUI7QUFDMUMsZ0JBQWdCLGtIQUFxQztBQUNyRCxnQkFBZ0IsbUJBQU8sQ0FBQyxnRkFBd0I7QUFDaEQseUJBQXlCLDBJQUE2RDtBQUN0Rix3QkFBd0IseUlBQTREO0FBQ3BGLGdCQUFnQixtQkFBTyxDQUFDLCtFQUFhO0FBQ3JDLGlCQUFpQixvR0FBc0M7QUFDdkQsWUFBWSxtQkFBTyxDQUFDLHNGQUF3Qjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQSxL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RkFBd0I7QUFDNUMsa0JBQWtCLDZIQUFtRDtBQUNyRSxlQUFlLG1CQUFPLENBQUMsc0VBQWM7QUFDckMsaUJBQWlCLG9IQUF5QztBQUMxRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLDJCQUEyQixFQUFFOztBQUVqRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDU3YWJhN2Y0NWJiNzk2YmI4MzQ2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvd2F0ZXJmYWxsJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBiYXJBdHRycyA9IHJlcXVpcmUoJy4uL2Jhci9hdHRyaWJ1dGVzJyk7XG52YXIgbGluZUF0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hdHRyaWJ1dGVzJykubGluZTtcbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG52YXIgaG92ZXJ0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLmhvdmVydGVtcGxhdGVBdHRycztcbnZhciB0ZXh0dGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS50ZXh0dGVtcGxhdGVBdHRycztcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcblxuZnVuY3Rpb24gZGlyZWN0aW9uQXR0cnMoZGlyVHh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWFya2VyOiB7XG4gICAgICAgICAgICBjb2xvcjogZXh0ZW5kRmxhdCh7fSwgYmFyQXR0cnMubWFya2VyLmNvbG9yLCB7XG4gICAgICAgICAgICAgICAgYXJyYXlPazogZmFsc2UsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBtYXJrZXIgY29sb3Igb2YgYWxsICcgKyBkaXJUeHQgKyAnIHZhbHVlcy4nXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGxpbmU6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogZXh0ZW5kRmxhdCh7fSwgYmFyQXR0cnMubWFya2VyLmxpbmUuY29sb3IsIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlPazogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGxpbmUgY29sb3Igb2YgYWxsICcgKyBkaXJUeHQgKyAnIHZhbHVlcy4nXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgd2lkdGg6IGV4dGVuZEZsYXQoe30sIGJhckF0dHJzLm1hcmtlci5saW5lLndpZHRoLCB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5T2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBsaW5lIHdpZHRoIG9mIGFsbCAnICsgZGlyVHh0ICsgJyB2YWx1ZXMuJ1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWVhc3VyZToge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGRmbHQ6IFtdLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQW4gYXJyYXkgY29udGFpbmluZyB0eXBlcyBvZiB2YWx1ZXMuJyxcbiAgICAgICAgICAgICdCeSBkZWZhdWx0IHRoZSB2YWx1ZXMgYXJlIGNvbnNpZGVyZWQgYXMgXFwncmVsYXRpdmVcXCcuJyxcbiAgICAgICAgICAgICdIb3dldmVyOyBpdCBpcyBwb3NzaWJsZSB0byB1c2UgXFwndG90YWxcXCcgdG8gY29tcHV0ZSB0aGUgc3Vtcy4nLFxuICAgICAgICAgICAgJ0Fsc28gXFwnYWJzb2x1dGVcXCcgY291bGQgYmUgYXBwbGllZCB0byByZXNldCB0aGUgY29tcHV0ZWQgdG90YWwnLFxuICAgICAgICAgICAgJ29yIHRvIGRlY2xhcmUgYW4gaW5pdGlhbCB2YWx1ZSB3aGVyZSBuZWVkZWQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBiYXNlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBkZmx0OiBudWxsLFxuICAgICAgICBhcnJheU9rOiBmYWxzZSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgd2hlcmUgdGhlIGJhciBiYXNlIGlzIGRyYXduIChpbiBwb3NpdGlvbiBheGlzIHVuaXRzKS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHg6IGJhckF0dHJzLngsXG4gICAgeDA6IGJhckF0dHJzLngwLFxuICAgIGR4OiBiYXJBdHRycy5keCxcbiAgICB5OiBiYXJBdHRycy55LFxuICAgIHkwOiBiYXJBdHRycy55MCxcbiAgICBkeTogYmFyQXR0cnMuZHksXG5cbiAgICBob3ZlcnRleHQ6IGJhckF0dHJzLmhvdmVydGV4dCxcbiAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlQXR0cnMoe30sIHtcbiAgICAgICAga2V5czogY29uc3RhbnRzLmV2ZW50RGF0YUtleXNcbiAgICB9KSxcblxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbywge1xuICAgICAgICBmbGFnczogWyduYW1lJywgJ3gnLCAneScsICd0ZXh0JywgJ2luaXRpYWwnLCAnZGVsdGEnLCAnZmluYWwnXVxuICAgIH0pLFxuXG4gICAgdGV4dGluZm86IHtcbiAgICAgICAgdmFsVHlwZTogJ2ZsYWdsaXN0JyxcbiAgICAgICAgZmxhZ3M6IFsnbGFiZWwnLCAndGV4dCcsICdpbml0aWFsJywgJ2RlbHRhJywgJ2ZpbmFsJ10sXG4gICAgICAgIGV4dHJhczogWydub25lJ10sXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgYXJyYXlPazogZmFsc2UsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGljaCB0cmFjZSBpbmZvcm1hdGlvbiBhcHBlYXIgb24gdGhlIGdyYXBoLicsXG4gICAgICAgICAgICAnSW4gdGhlIGNhc2Ugb2YgaGF2aW5nIG11bHRpcGxlIHdhdGVyZmFsbHMsIHRvdGFscycsXG4gICAgICAgICAgICAnYXJlIGNvbXB1dGVkIHNlcGFyYXRlbHkgKHBlciB0cmFjZSkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgLy8gVE9ETzogaW5jb3Jwb3JhdGUgYGxhYmVsYCBhbmQgYHZhbHVlYCBpbiB0aGUgZXZlbnREYXRhXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdwbG90J30sIHtcbiAgICAgICAga2V5czogY29uc3RhbnRzLmV2ZW50RGF0YUtleXMuY29uY2F0KFsnbGFiZWwnXSlcbiAgICB9KSxcbiAgICB0ZXh0OiBiYXJBdHRycy50ZXh0LFxuICAgIHRleHRwb3NpdGlvbjogYmFyQXR0cnMudGV4dHBvc2l0aW9uLFxuICAgIGluc2lkZXRleHRhbmNob3I6IGJhckF0dHJzLmluc2lkZXRleHRhbmNob3IsXG4gICAgdGV4dGFuZ2xlOiBiYXJBdHRycy50ZXh0YW5nbGUsXG4gICAgdGV4dGZvbnQ6IGJhckF0dHJzLnRleHRmb250LFxuICAgIGluc2lkZXRleHRmb250OiBiYXJBdHRycy5pbnNpZGV0ZXh0Zm9udCxcbiAgICBvdXRzaWRldGV4dGZvbnQ6IGJhckF0dHJzLm91dHNpZGV0ZXh0Zm9udCxcbiAgICBjb25zdHJhaW50ZXh0OiBiYXJBdHRycy5jb25zdHJhaW50ZXh0LFxuXG4gICAgY2xpcG9uYXhpczogYmFyQXR0cnMuY2xpcG9uYXhpcyxcbiAgICBvcmllbnRhdGlvbjogYmFyQXR0cnMub3JpZW50YXRpb24sXG5cbiAgICBvZmZzZXQ6IGJhckF0dHJzLm9mZnNldCxcbiAgICB3aWR0aDogYmFyQXR0cnMud2lkdGgsXG5cbiAgICBpbmNyZWFzaW5nOiBkaXJlY3Rpb25BdHRycygnaW5jcmVhc2luZycpLFxuICAgIGRlY3JlYXNpbmc6IGRpcmVjdGlvbkF0dHJzKCdkZWNyZWFzaW5nJyksXG4gICAgdG90YWxzOiBkaXJlY3Rpb25BdHRycygnaW50ZXJtZWRpYXRlIHN1bXMgYW5kIHRvdGFsJyksXG5cbiAgICBjb25uZWN0b3I6IHtcbiAgICAgICAgbGluZToge1xuICAgICAgICAgICAgY29sb3I6IGV4dGVuZEZsYXQoe30sIGxpbmVBdHRycy5jb2xvciwge2RmbHQ6IENvbG9yLmRlZmF1bHRMaW5lfSksXG4gICAgICAgICAgICB3aWR0aDogZXh0ZW5kRmxhdCh7fSwgbGluZUF0dHJzLndpZHRoLCB7XG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JywgLy8gaS5lLiB0byBhZGp1c3QgYmFycyBpcyBtb2RlOiAnYmV0d2VlbicuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcGxvdGx5L3Bsb3RseS5qcy9pc3N1ZXMvMzc4N1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBkYXNoOiBsaW5lQXR0cnMuZGFzaCxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICAgICAgfSxcbiAgICAgICAgbW9kZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ3NwYW5uaW5nJywgJ2JldHdlZW4nXSxcbiAgICAgICAgICAgIGRmbHQ6ICdiZXR3ZWVuJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBzaGFwZSBvZiBjb25uZWN0b3IgbGluZXMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgdmlzaWJsZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIGlmIGNvbm5lY3RvciBsaW5lcyBhcmUgZHJhd24uICdcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICB9LFxuXG4gICAgb2Zmc2V0Z3JvdXA6IGJhckF0dHJzLm9mZnNldGdyb3VwLFxuICAgIGFsaWdubWVudGdyb3VwOiBiYXJBdHRycy5hbGlnbm1lbnRncm91cFxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIG1lcmdlQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5tZXJnZUFycmF5O1xudmFyIGNhbGNTZWxlY3Rpb24gPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NhbGNfc2VsZWN0aW9uJyk7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxuZnVuY3Rpb24gaXNBYnNvbHV0ZShhKSB7XG4gICAgcmV0dXJuIChhID09PSAnYScgfHwgYSA9PT0gJ2Fic29sdXRlJyk7XG59XG5cbmZ1bmN0aW9uIGlzVG90YWwoYSkge1xuICAgIHJldHVybiAoYSA9PT0gJ3QnIHx8IGEgPT09ICd0b3RhbCcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIHhhID0gQXhlcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLnhheGlzIHx8ICd4Jyk7XG4gICAgdmFyIHlhID0gQXhlcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLnlheGlzIHx8ICd5Jyk7XG4gICAgdmFyIHNpemUsIHBvcztcblxuICAgIGlmKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgc2l6ZSA9IHhhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3gnKTtcbiAgICAgICAgcG9zID0geWEubWFrZUNhbGNkYXRhKHRyYWNlLCAneScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNpemUgPSB5YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd5Jyk7XG4gICAgICAgIHBvcyA9IHhhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3gnKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGhlIFwiY2FsY3VsYXRlZCBkYXRhXCIgdG8gcGxvdFxuICAgIHZhciBzZXJpZXNsZW4gPSBNYXRoLm1pbihwb3MubGVuZ3RoLCBzaXplLmxlbmd0aCk7XG4gICAgdmFyIGNkID0gbmV3IEFycmF5KHNlcmllc2xlbik7XG5cbiAgICAvLyBzZXQgcG9zaXRpb24gYW5kIHNpemUgKGFzIHdlbGwgYXMgZm9yIHdhdGVyZmFsbCB0b3RhbCBzaXplKVxuICAgIHZhciBwcmV2aW91c1N1bSA9IDA7XG4gICAgdmFyIG5ld1NpemU7XG4gICAgLy8gdHJhY2Utd2lkZSBmbGFnc1xuICAgIHZhciBoYXNUb3RhbHMgPSBmYWxzZTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZXJpZXNsZW47IGkrKykge1xuICAgICAgICB2YXIgYW1vdW50ID0gc2l6ZVtpXSB8fCAwO1xuXG4gICAgICAgIHZhciBjb25uZWN0VG9OZXh0ID0gZmFsc2U7XG4gICAgICAgIGlmKHNpemVbaV0gIT09IEJBRE5VTSB8fCBpc1RvdGFsKHRyYWNlLm1lYXN1cmVbaV0pIHx8IGlzQWJzb2x1dGUodHJhY2UubWVhc3VyZVtpXSkpIHtcbiAgICAgICAgICAgIGlmKGkgKyAxIDwgc2VyaWVzbGVuICYmIChzaXplW2kgKyAxXSAhPT0gQkFETlVNIHx8IGlzVG90YWwodHJhY2UubWVhc3VyZVtpICsgMV0pIHx8IGlzQWJzb2x1dGUodHJhY2UubWVhc3VyZVtpICsgMV0pKSkge1xuICAgICAgICAgICAgICAgIGNvbm5lY3RUb05leHQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNkaSA9IGNkW2ldID0ge1xuICAgICAgICAgICAgaTogaSxcbiAgICAgICAgICAgIHA6IHBvc1tpXSxcbiAgICAgICAgICAgIHM6IGFtb3VudCxcbiAgICAgICAgICAgIHJhd1M6IGFtb3VudCxcbiAgICAgICAgICAgIGNOZXh0OiBjb25uZWN0VG9OZXh0XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoaXNBYnNvbHV0ZSh0cmFjZS5tZWFzdXJlW2ldKSkge1xuICAgICAgICAgICAgcHJldmlvdXNTdW0gPSBjZGkucztcblxuICAgICAgICAgICAgY2RpLmlzU3VtID0gdHJ1ZTtcbiAgICAgICAgICAgIGNkaS5kaXIgPSAndG90YWxzJztcbiAgICAgICAgICAgIGNkaS5zID0gcHJldmlvdXNTdW07XG4gICAgICAgIH0gZWxzZSBpZihpc1RvdGFsKHRyYWNlLm1lYXN1cmVbaV0pKSB7XG4gICAgICAgICAgICBjZGkuaXNTdW0gPSB0cnVlO1xuICAgICAgICAgICAgY2RpLmRpciA9ICd0b3RhbHMnO1xuICAgICAgICAgICAgY2RpLnMgPSBwcmV2aW91c1N1bTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlZmF1bHQ6IHJlbGF0aXZlXG4gICAgICAgICAgICBjZGkuaXNTdW0gPSBmYWxzZTtcbiAgICAgICAgICAgIGNkaS5kaXIgPSBjZGkucmF3UyA8IDAgPyAnZGVjcmVhc2luZycgOiAnaW5jcmVhc2luZyc7XG4gICAgICAgICAgICBuZXdTaXplID0gY2RpLnM7XG4gICAgICAgICAgICBjZGkucyA9IHByZXZpb3VzU3VtICsgbmV3U2l6ZTtcbiAgICAgICAgICAgIHByZXZpb3VzU3VtICs9IG5ld1NpemU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjZGkuZGlyID09PSAndG90YWxzJykge1xuICAgICAgICAgICAgaGFzVG90YWxzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRyYWNlLmlkcykge1xuICAgICAgICAgICAgY2RpLmlkID0gU3RyaW5nKHRyYWNlLmlkc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjZGkudiA9ICh0cmFjZS5iYXNlIHx8IDApICsgcHJldmlvdXNTdW07XG4gICAgfVxuXG4gICAgaWYoY2QubGVuZ3RoKSBjZFswXS5oYXNUb3RhbHMgPSBoYXNUb3RhbHM7XG5cbiAgICBtZXJnZUFycmF5KHRyYWNlLnRleHQsIGNkLCAndHgnKTtcbiAgICBtZXJnZUFycmF5KHRyYWNlLmhvdmVydGV4dCwgY2QsICdodHgnKTtcbiAgICBjYWxjU2VsZWN0aW9uKGNkLCB0cmFjZSk7XG5cbiAgICByZXR1cm4gY2Q7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBldmVudERhdGFLZXlzOiBbXG4gICAgICAgICdpbml0aWFsJyxcbiAgICAgICAgJ2RlbHRhJyxcbiAgICAgICAgJ2ZpbmFsJ1xuICAgIF1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzZXRHcm91cFBvc2l0aW9ucyA9IHJlcXVpcmUoJy4uL2Jhci9jcm9zc190cmFjZV9jYWxjJykuc2V0R3JvdXBQb3NpdGlvbnM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3Jvc3NUcmFjZUNhbGMoZ2QsIHBsb3RpbmZvKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgZnVsbERhdGEgPSBnZC5fZnVsbERhdGE7XG4gICAgdmFyIGNhbGNkYXRhID0gZ2QuY2FsY2RhdGE7XG4gICAgdmFyIHhhID0gcGxvdGluZm8ueGF4aXM7XG4gICAgdmFyIHlhID0gcGxvdGluZm8ueWF4aXM7XG4gICAgdmFyIHdhdGVyZmFsbHMgPSBbXTtcbiAgICB2YXIgd2F0ZXJmYWxsc1ZlcnQgPSBbXTtcbiAgICB2YXIgd2F0ZXJmYWxsc0hvcnogPSBbXTtcbiAgICB2YXIgY2QsIGk7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBmdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZnVsbFRyYWNlID0gZnVsbERhdGFbaV07XG5cbiAgICAgICAgaWYoXG4gICAgICAgICAgICBmdWxsVHJhY2UudmlzaWJsZSA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgZnVsbFRyYWNlLnhheGlzID09PSB4YS5faWQgJiZcbiAgICAgICAgICAgIGZ1bGxUcmFjZS55YXhpcyA9PT0geWEuX2lkICYmXG4gICAgICAgICAgICBmdWxsVHJhY2UudHlwZSA9PT0gJ3dhdGVyZmFsbCdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjZCA9IGNhbGNkYXRhW2ldO1xuXG4gICAgICAgICAgICBpZihmdWxsVHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICAgICAgICAgIHdhdGVyZmFsbHNIb3J6LnB1c2goY2QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3YXRlcmZhbGxzVmVydC5wdXNoKGNkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2F0ZXJmYWxscy5wdXNoKGNkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBvcHRzID0ge1xuICAgICAgICBtb2RlOiBmdWxsTGF5b3V0LndhdGVyZmFsbG1vZGUsXG4gICAgICAgIG5vcm06IGZ1bGxMYXlvdXQud2F0ZXJmYWxsbm9ybSxcbiAgICAgICAgZ2FwOiBmdWxsTGF5b3V0LndhdGVyZmFsbGdhcCxcbiAgICAgICAgZ3JvdXBnYXA6IGZ1bGxMYXlvdXQud2F0ZXJmYWxsZ3JvdXBnYXBcbiAgICB9O1xuXG4gICAgc2V0R3JvdXBQb3NpdGlvbnMoZ2QsIHhhLCB5YSwgd2F0ZXJmYWxsc1ZlcnQsIG9wdHMpO1xuICAgIHNldEdyb3VwUG9zaXRpb25zKGdkLCB5YSwgeGEsIHdhdGVyZmFsbHNIb3J6LCBvcHRzKTtcblxuICAgIGZvcihpID0gMDsgaSA8IHdhdGVyZmFsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2QgPSB3YXRlcmZhbGxzW2ldO1xuXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGRpID0gY2Rbal07XG5cbiAgICAgICAgICAgIGlmKGRpLmlzU3VtID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGRpLnMwICs9IChqID09PSAwKSA/IDAgOiBjZFtqIC0gMV0ucztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaiArIDEgPCBjZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjZFtqXS5uZXh0UDAgPSBjZFtqICsgMV0ucDA7XG4gICAgICAgICAgICAgICAgY2Rbal0ubmV4dFMwID0gY2RbaiArIDFdLnMwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgaGFuZGxlR3JvdXBpbmdEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2Jhci9kZWZhdWx0cycpLmhhbmRsZUdyb3VwaW5nRGVmYXVsdHM7XG52YXIgaGFuZGxlVGV4dCA9IHJlcXVpcmUoJy4uL2Jhci9kZWZhdWx0cycpLmhhbmRsZVRleHQ7XG52YXIgaGFuZGxlWFlEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIveHlfZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgZGVsdGEgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZGVsdGEuanMnKTtcblxudmFyIElOQ1JFQVNJTkdfQ09MT1IgPSBkZWx0YS5JTkNSRUFTSU5HLkNPTE9SO1xudmFyIERFQ1JFQVNJTkdfQ09MT1IgPSBkZWx0YS5ERUNSRUFTSU5HLkNPTE9SO1xudmFyIFRPVEFMU19DT0xPUiA9ICcjNDQ5OUZGJztcblxuZnVuY3Rpb24gaGFuZGxlRGlyZWN0aW9uKGNvZXJjZSwgZGlyZWN0aW9uLCBkZWZhdWx0Q29sb3IpIHtcbiAgICBjb2VyY2UoZGlyZWN0aW9uICsgJy5tYXJrZXIuY29sb3InLCBkZWZhdWx0Q29sb3IpO1xuICAgIGNvZXJjZShkaXJlY3Rpb24gKyAnLm1hcmtlci5saW5lLmNvbG9yJywgQ29sb3IuZGVmYXVsdExpbmUpO1xuICAgIGNvZXJjZShkaXJlY3Rpb24gKyAnLm1hcmtlci5saW5lLndpZHRoJyk7XG59XG5cbmZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gaGFuZGxlWFlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29lcmNlKCdtZWFzdXJlJyk7XG5cbiAgICBjb2VyY2UoJ29yaWVudGF0aW9uJywgKHRyYWNlT3V0LnggJiYgIXRyYWNlT3V0LnkpID8gJ2gnIDogJ3YnKTtcbiAgICBjb2VyY2UoJ2Jhc2UnKTtcbiAgICBjb2VyY2UoJ29mZnNldCcpO1xuICAgIGNvZXJjZSgnd2lkdGgnKTtcblxuICAgIGNvZXJjZSgndGV4dCcpO1xuXG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIHZhciB0ZXh0cG9zaXRpb24gPSBjb2VyY2UoJ3RleHRwb3NpdGlvbicpO1xuICAgIGhhbmRsZVRleHQodHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB0ZXh0cG9zaXRpb24sIHtcbiAgICAgICAgbW9kdWxlSGFzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBtb2R1bGVIYXNVbnNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgbW9kdWxlSGFzQ29uc3RyYWluOiB0cnVlLFxuICAgICAgICBtb2R1bGVIYXNDbGlwb25heGlzOiB0cnVlLFxuICAgICAgICBtb2R1bGVIYXNUZXh0YW5nbGU6IHRydWUsXG4gICAgICAgIG1vZHVsZUhhc0luc2lkZWFuY2hvcjogdHJ1ZVxuICAgIH0pO1xuXG5cbiAgICBpZih0cmFjZU91dC50ZXh0cG9zaXRpb24gIT09ICdub25lJykge1xuICAgICAgICBjb2VyY2UoJ3RleHR0ZW1wbGF0ZScpO1xuICAgICAgICBpZighdHJhY2VPdXQudGV4dHRlbXBsYXRlKSBjb2VyY2UoJ3RleHRpbmZvJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlRGlyZWN0aW9uKGNvZXJjZSwgJ2luY3JlYXNpbmcnLCBJTkNSRUFTSU5HX0NPTE9SKTtcbiAgICBoYW5kbGVEaXJlY3Rpb24oY29lcmNlLCAnZGVjcmVhc2luZycsIERFQ1JFQVNJTkdfQ09MT1IpO1xuICAgIGhhbmRsZURpcmVjdGlvbihjb2VyY2UsICd0b3RhbHMnLCBUT1RBTFNfQ09MT1IpO1xuXG4gICAgdmFyIGNvbm5lY3RvclZpc2libGUgPSBjb2VyY2UoJ2Nvbm5lY3Rvci52aXNpYmxlJyk7XG4gICAgaWYoY29ubmVjdG9yVmlzaWJsZSkge1xuICAgICAgICBjb2VyY2UoJ2Nvbm5lY3Rvci5tb2RlJyk7XG4gICAgICAgIHZhciBjb25uZWN0b3JMaW5lV2lkdGggPSBjb2VyY2UoJ2Nvbm5lY3Rvci5saW5lLndpZHRoJyk7XG4gICAgICAgIGlmKGNvbm5lY3RvckxpbmVXaWR0aCkge1xuICAgICAgICAgICAgY29lcmNlKCdjb25uZWN0b3IubGluZS5jb2xvcicpO1xuICAgICAgICAgICAgY29lcmNlKCdjb25uZWN0b3IubGluZS5kYXNoJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyb3NzVHJhY2VEZWZhdWx0cyhmdWxsRGF0YSwgZnVsbExheW91dCkge1xuICAgIHZhciB0cmFjZUluLCB0cmFjZU91dDtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyKSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlT3V0Ll9pbnB1dCwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIpO1xuICAgIH1cblxuICAgIGlmKGZ1bGxMYXlvdXQud2F0ZXJmYWxsbW9kZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYWNlT3V0ID0gZnVsbERhdGFbaV07XG4gICAgICAgICAgICB0cmFjZUluID0gdHJhY2VPdXQuX2lucHV0O1xuXG4gICAgICAgICAgICBoYW5kbGVHcm91cGluZ0RlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBmdWxsTGF5b3V0LCBjb2VyY2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdXBwbHlEZWZhdWx0czogc3VwcGx5RGVmYXVsdHMsXG4gICAgY3Jvc3NUcmFjZURlZmF1bHRzOiBjcm9zc1RyYWNlRGVmYXVsdHNcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlbnREYXRhKG91dCwgcHQgLyogLCB0cmFjZSwgY2QsIHBvaW50TnVtYmVyICovKSB7XG4gICAgLy8gc3RhbmRhcmQgY2FydGVzaWFuIGV2ZW50IGRhdGFcbiAgICBvdXQueCA9ICd4VmFsJyBpbiBwdCA/IHB0LnhWYWwgOiBwdC54O1xuICAgIG91dC55ID0gJ3lWYWwnIGluIHB0ID8gcHQueVZhbCA6IHB0Lnk7XG5cbiAgICAvLyBmb3IgZnVubmVsXG4gICAgaWYoJ2luaXRpYWwnIGluIHB0KSBvdXQuaW5pdGlhbCA9IHB0LmluaXRpYWw7XG4gICAgaWYoJ2RlbHRhJyBpbiBwdCkgb3V0LmRlbHRhID0gcHQuZGVsdGE7XG4gICAgaWYoJ2ZpbmFsJyBpbiBwdCkgb3V0LmZpbmFsID0gcHQuZmluYWw7XG5cbiAgICBpZihwdC54YSkgb3V0LnhheGlzID0gcHQueGE7XG4gICAgaWYocHQueWEpIG91dC55YXhpcyA9IHB0LnlhO1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBob3ZlckxhYmVsVGV4dCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJykuaG92ZXJMYWJlbFRleHQ7XG52YXIgb3BhY2l0eSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKS5vcGFjaXR5O1xudmFyIGhvdmVyT25CYXJzID0gcmVxdWlyZSgnLi4vYmFyL2hvdmVyJykuaG92ZXJPbkJhcnM7XG52YXIgZGVsdGEgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZGVsdGEuanMnKTtcblxudmFyIERJUlNZTUJPTCA9IHtcbiAgICBpbmNyZWFzaW5nOiBkZWx0YS5JTkNSRUFTSU5HLlNZTUJPTCxcbiAgICBkZWNyZWFzaW5nOiBkZWx0YS5ERUNSRUFTSU5HLlNZTUJPTFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSkge1xuICAgIHZhciBwb2ludCA9IGhvdmVyT25CYXJzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlKTtcbiAgICBpZighcG9pbnQpIHJldHVybjtcblxuICAgIHZhciBjZCA9IHBvaW50LmNkO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciBpc0hvcml6b250YWwgPSAodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJyk7XG5cbiAgICB2YXIgdkF4aXMgPSBpc0hvcml6b250YWwgPyBwb2ludERhdGEueGEgOiBwb2ludERhdGEueWE7XG5cbiAgICBmdW5jdGlvbiBmb3JtYXROdW1iZXIoYSkge1xuICAgICAgICByZXR1cm4gaG92ZXJMYWJlbFRleHQodkF4aXMsIGEpO1xuICAgIH1cblxuICAgIC8vIHRoZSBjbG9zZXN0IGRhdGEgcG9pbnRcbiAgICB2YXIgaW5kZXggPSBwb2ludC5pbmRleDtcbiAgICB2YXIgZGkgPSBjZFtpbmRleF07XG5cbiAgICB2YXIgc2l6ZSA9IChkaS5pc1N1bSkgPyBkaS5iICsgZGkucyA6IGRpLnJhd1M7XG5cbiAgICBpZighZGkuaXNTdW0pIHtcbiAgICAgICAgcG9pbnQuaW5pdGlhbCA9IGRpLmIgKyBkaS5zIC0gc2l6ZTtcbiAgICAgICAgcG9pbnQuZGVsdGEgPSBzaXplO1xuICAgICAgICBwb2ludC5maW5hbCA9IHBvaW50LmluaXRpYWwgKyBwb2ludC5kZWx0YTtcblxuICAgICAgICB2YXIgdiA9IGZvcm1hdE51bWJlcihNYXRoLmFicyhwb2ludC5kZWx0YSkpO1xuICAgICAgICBwb2ludC5kZWx0YUxhYmVsID0gc2l6ZSA8IDAgPyAnKCcgKyB2ICsgJyknIDogdjtcbiAgICAgICAgcG9pbnQuZmluYWxMYWJlbCA9IGZvcm1hdE51bWJlcihwb2ludC5maW5hbCk7XG4gICAgICAgIHBvaW50LmluaXRpYWxMYWJlbCA9IGZvcm1hdE51bWJlcihwb2ludC5pbml0aWFsKTtcbiAgICB9XG5cbiAgICB2YXIgaG92ZXJpbmZvID0gZGkuaGkgfHwgdHJhY2UuaG92ZXJpbmZvO1xuICAgIHZhciB0ZXh0ID0gW107XG4gICAgaWYoaG92ZXJpbmZvICYmIGhvdmVyaW5mbyAhPT0gJ25vbmUnICYmIGhvdmVyaW5mbyAhPT0gJ3NraXAnKSB7XG4gICAgICAgIHZhciBpc0FsbCA9IChob3ZlcmluZm8gPT09ICdhbGwnKTtcbiAgICAgICAgdmFyIHBhcnRzID0gaG92ZXJpbmZvLnNwbGl0KCcrJyk7XG5cbiAgICAgICAgdmFyIGhhc0ZsYWcgPSBmdW5jdGlvbihmbGFnKSB7IHJldHVybiBpc0FsbCB8fCBwYXJ0cy5pbmRleE9mKGZsYWcpICE9PSAtMTsgfTtcblxuICAgICAgICBpZighZGkuaXNTdW0pIHtcbiAgICAgICAgICAgIGlmKGhhc0ZsYWcoJ2ZpbmFsJykgJiZcbiAgICAgICAgICAgICAgICAoaXNIb3Jpem9udGFsID8gIWhhc0ZsYWcoJ3gnKSA6ICFoYXNGbGFnKCd5JykpIC8vIGRvbid0IGRpc3BsYXkgcmVkdW5kYW50IGluZm8uXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0ZXh0LnB1c2gocG9pbnQuZmluYWxMYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihoYXNGbGFnKCdkZWx0YScpKSB7XG4gICAgICAgICAgICAgICAgaWYoc2l6ZSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dC5wdXNoKHBvaW50LmRlbHRhTGFiZWwgKyAnICcgKyBESVJTWU1CT0wuZGVjcmVhc2luZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dC5wdXNoKHBvaW50LmRlbHRhTGFiZWwgKyAnICcgKyBESVJTWU1CT0wuaW5jcmVhc2luZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaGFzRmxhZygnaW5pdGlhbCcpKSB7XG4gICAgICAgICAgICAgICAgdGV4dC5wdXNoKCdJbml0aWFsOiAnICsgcG9pbnQuaW5pdGlhbExhYmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKHRleHQubGVuZ3RoKSBwb2ludC5leHRyYVRleHQgPSB0ZXh0LmpvaW4oJzxicj4nKTtcblxuICAgIHBvaW50LmNvbG9yID0gZ2V0VHJhY2VDb2xvcih0cmFjZSwgZGkpO1xuXG4gICAgcmV0dXJuIFtwb2ludF07XG59O1xuXG5mdW5jdGlvbiBnZXRUcmFjZUNvbG9yKHRyYWNlLCBkaSkge1xuICAgIHZhciBjb250ID0gdHJhY2VbZGkuZGlyXS5tYXJrZXI7XG4gICAgdmFyIG1jID0gY29udC5jb2xvcjtcbiAgICB2YXIgbWxjID0gY29udC5saW5lLmNvbG9yO1xuICAgIHZhciBtbHcgPSBjb250LmxpbmUud2lkdGg7XG4gICAgaWYob3BhY2l0eShtYykpIHJldHVybiBtYztcbiAgICBlbHNlIGlmKG9wYWNpdHkobWxjKSAmJiBtbHcpIHJldHVybiBtbGM7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLnN1cHBseURlZmF1bHRzLFxuICAgIGNyb3NzVHJhY2VEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLmNyb3NzVHJhY2VEZWZhdWx0cyxcbiAgICBzdXBwbHlMYXlvdXREZWZhdWx0czogcmVxdWlyZSgnLi9sYXlvdXRfZGVmYXVsdHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBjcm9zc1RyYWNlQ2FsYzogcmVxdWlyZSgnLi9jcm9zc190cmFjZV9jYWxjJyksXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JyksXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKS5zdHlsZSxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi9ldmVudF9kYXRhJyksXG5cbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4uL2Jhci9zZWxlY3QnKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3dhdGVyZmFsbCcsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbicpLFxuICAgIGNhdGVnb3JpZXM6IFsnYmFyLWxpa2UnLCAnY2FydGVzaWFuJywgJ3N2ZycsICdvcmllbnRlZCcsICdzaG93TGVnZW5kJywgJ3pvb21TY2FsZSddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEcmF3cyB3YXRlcmZhbGwgdHJhY2Ugd2hpY2ggaXMgdXNlZnVsIGdyYXBoIHRvIGRpc3BsYXlzIHRoZScsXG4gICAgICAgICAgICAnY29udHJpYnV0aW9uIG9mIHZhcmlvdXMgZWxlbWVudHMgKGVpdGhlciBwb3NpdGl2ZSBvciBuZWdhdGl2ZSknLFxuICAgICAgICAgICAgJ2luIGEgYmFyIGNoYXJ0LiBUaGUgZGF0YSB2aXN1YWxpemVkIGJ5IHRoZSBzcGFuIG9mIHRoZSBiYXJzIGlzJyxcbiAgICAgICAgICAgICdzZXQgaW4gYHlgIGlmIGBvcmllbnRhdGlvbmAgaXMgc2V0IHRoICp2KiAodGhlIGRlZmF1bHQpIGFuZCB0aGUnLFxuICAgICAgICAgICAgJ2xhYmVscyBhcmUgc2V0IGluIGB4YC4nLFxuICAgICAgICAgICAgJ0J5IHNldHRpbmcgYG9yaWVudGF0aW9uYCB0byAqaCosIHRoZSByb2xlcyBhcmUgaW50ZXJjaGFuZ2VkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB3YXRlcmZhbGxtb2RlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ2dyb3VwJywgJ292ZXJsYXknXSxcbiAgICAgICAgZGZsdDogJ2dyb3VwJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaG93IGJhcnMgYXQgdGhlIHNhbWUgbG9jYXRpb24gY29vcmRpbmF0ZScsXG4gICAgICAgICAgICAnYXJlIGRpc3BsYXllZCBvbiB0aGUgZ3JhcGguJyxcbiAgICAgICAgICAgICdXaXRoICpncm91cCosIHRoZSBiYXJzIGFyZSBwbG90dGVkIG5leHQgdG8gb25lIGFub3RoZXInLFxuICAgICAgICAgICAgJ2NlbnRlcmVkIGFyb3VuZCB0aGUgc2hhcmVkIGxvY2F0aW9uLicsXG4gICAgICAgICAgICAnV2l0aCAqb3ZlcmxheSosIHRoZSBiYXJzIGFyZSBwbG90dGVkIG92ZXIgb25lIGFub3RoZXIsJyxcbiAgICAgICAgICAgICd5b3UgbWlnaHQgbmVlZCB0byBhbiAqb3BhY2l0eSogdG8gc2VlIG11bHRpcGxlIGJhcnMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgd2F0ZXJmYWxsZ2FwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBnYXAgKGluIHBsb3QgZnJhY3Rpb24pIGJldHdlZW4gYmFycyBvZicsXG4gICAgICAgICAgICAnYWRqYWNlbnQgbG9jYXRpb24gY29vcmRpbmF0ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgd2F0ZXJmYWxsZ3JvdXBnYXA6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGdhcCAoaW4gcGxvdCBmcmFjdGlvbikgYmV0d2VlbiBiYXJzIG9mJyxcbiAgICAgICAgICAgICd0aGUgc2FtZSBsb2NhdGlvbiBjb29yZGluYXRlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgbGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSkge1xuICAgIHZhciBoYXNUcmFjZVR5cGUgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGxheW91dEluLCBsYXlvdXRPdXQsIGxheW91dEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBmdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhY2UgPSBmdWxsRGF0YVtpXTtcblxuICAgICAgICBpZih0cmFjZS52aXNpYmxlICYmIHRyYWNlLnR5cGUgPT09ICd3YXRlcmZhbGwnKSB7XG4gICAgICAgICAgICBoYXNUcmFjZVR5cGUgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihoYXNUcmFjZVR5cGUpIHtcbiAgICAgICAgY29lcmNlKCd3YXRlcmZhbGxtb2RlJyk7XG4gICAgICAgIGNvZXJjZSgnd2F0ZXJmYWxsZ2FwJywgMC4yKTtcbiAgICAgICAgY29lcmNlKCd3YXRlcmZhbGxncm91cGdhcCcpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG52YXIgYmFyUGxvdCA9IHJlcXVpcmUoJy4uL2Jhci9wbG90Jyk7XG52YXIgY2xlYXJNaW5UZXh0U2l6ZSA9IHJlcXVpcmUoJy4uL2Jhci91bmlmb3JtX3RleHQnKS5jbGVhck1pblRleHRTaXplO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ2QsIHBsb3RpbmZvLCBjZE1vZHVsZSwgdHJhY2VMYXllcikge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG5cbiAgICBjbGVhck1pblRleHRTaXplKCd3YXRlcmZhbGwnLCBmdWxsTGF5b3V0KTtcblxuICAgIGJhclBsb3QucGxvdChnZCwgcGxvdGluZm8sIGNkTW9kdWxlLCB0cmFjZUxheWVyLCB7XG4gICAgICAgIG1vZGU6IGZ1bGxMYXlvdXQud2F0ZXJmYWxsbW9kZSxcbiAgICAgICAgbm9ybTogZnVsbExheW91dC53YXRlcmZhbGxtb2RlLFxuICAgICAgICBnYXA6IGZ1bGxMYXlvdXQud2F0ZXJmYWxsZ2FwLFxuICAgICAgICBncm91cGdhcDogZnVsbExheW91dC53YXRlcmZhbGxncm91cGdhcFxuICAgIH0pO1xuXG4gICAgcGxvdENvbm5lY3RvcnMoZ2QsIHBsb3RpbmZvLCBjZE1vZHVsZSwgdHJhY2VMYXllcik7XG59O1xuXG5mdW5jdGlvbiBwbG90Q29ubmVjdG9ycyhnZCwgcGxvdGluZm8sIGNkTW9kdWxlLCB0cmFjZUxheWVyKSB7XG4gICAgdmFyIHhhID0gcGxvdGluZm8ueGF4aXM7XG4gICAgdmFyIHlhID0gcGxvdGluZm8ueWF4aXM7XG5cbiAgICBMaWIubWFrZVRyYWNlR3JvdXBzKHRyYWNlTGF5ZXIsIGNkTW9kdWxlLCAndHJhY2UgYmFycycpLmVhY2goZnVuY3Rpb24oY2QpIHtcbiAgICAgICAgdmFyIHBsb3RHcm91cCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG5cbiAgICAgICAgdmFyIGdyb3VwID0gTGliLmVuc3VyZVNpbmdsZShwbG90R3JvdXAsICdnJywgJ2xpbmVzJyk7XG5cbiAgICAgICAgaWYoIXRyYWNlLmNvbm5lY3RvciB8fCAhdHJhY2UuY29ubmVjdG9yLnZpc2libGUpIHtcbiAgICAgICAgICAgIGdyb3VwLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlzSG9yaXpvbnRhbCA9ICh0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKTtcbiAgICAgICAgdmFyIG1vZGUgPSB0cmFjZS5jb25uZWN0b3IubW9kZTtcblxuICAgICAgICB2YXIgY29ubmVjdG9ycyA9IGdyb3VwLnNlbGVjdEFsbCgnZy5saW5lJykuZGF0YShMaWIuaWRlbnRpdHkpO1xuXG4gICAgICAgIGNvbm5lY3RvcnMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2xpbmUnLCB0cnVlKTtcblxuICAgICAgICBjb25uZWN0b3JzLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgbGVuID0gY29ubmVjdG9ycy5zaXplKCk7XG5cbiAgICAgICAgY29ubmVjdG9ycy5lYWNoKGZ1bmN0aW9uKGRpLCBpKSB7XG4gICAgICAgICAgICAvLyBkb24ndCBkcmF3IGxpbmVzIGJldHdlZW4gbnVsbHNcbiAgICAgICAgICAgIGlmKGkgIT09IGxlbiAtIDEgJiYgIWRpLmNOZXh0KSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciB4eSA9IGdldFhZKGRpLCB4YSwgeWEsIGlzSG9yaXpvbnRhbCk7XG4gICAgICAgICAgICB2YXIgeCA9IHh5WzBdO1xuICAgICAgICAgICAgdmFyIHkgPSB4eVsxXTtcblxuICAgICAgICAgICAgdmFyIHNoYXBlID0gJyc7XG5cbiAgICAgICAgICAgIGlmKFxuICAgICAgICAgICAgICAgIHhbMF0gIT09IEJBRE5VTSAmJiB5WzBdICE9PSBCQUROVU0gJiZcbiAgICAgICAgICAgICAgICB4WzFdICE9PSBCQUROVU0gJiYgeVsxXSAhPT0gQkFETlVNXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZihtb2RlID09PSAnc3Bhbm5pbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkaS5pc1N1bSAmJiBpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGUgKz0gJ00nICsgeFswXSArICcsJyArIHlbMV0gKyAnVicgKyB5WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFwZSArPSAnTScgKyB4WzFdICsgJywnICsgeVswXSArICdIJyArIHhbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihtb2RlICE9PSAnYmV0d2VlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZGkuaXNTdW0gfHwgaSA8IGxlbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlICs9ICdNJyArIHhbMV0gKyAnLCcgKyB5WzBdICsgJ1YnICsgeVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGUgKz0gJ00nICsgeFswXSArICcsJyArIHlbMV0gKyAnSCcgKyB4WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoeFsyXSAhPT0gQkFETlVNICYmIHlbMl0gIT09IEJBRE5VTSkge1xuICAgICAgICAgICAgICAgICAgICBpZihpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlICs9ICdNJyArIHhbMV0gKyAnLCcgKyB5WzFdICsgJ1YnICsgeVsyXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlICs9ICdNJyArIHhbMV0gKyAnLCcgKyB5WzFdICsgJ0gnICsgeFsyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2hhcGUgPT09ICcnKSBzaGFwZSA9ICdNMCwwWic7XG5cbiAgICAgICAgICAgIExpYi5lbnN1cmVTaW5nbGUoZDMuc2VsZWN0KHRoaXMpLCAncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBzaGFwZSlcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldENsaXBVcmwsIHBsb3RpbmZvLmxheWVyQ2xpcElkLCBnZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRYWShkaSwgeGEsIHlhLCBpc0hvcml6b250YWwpIHtcbiAgICB2YXIgcyA9IFtdO1xuICAgIHZhciBwID0gW107XG5cbiAgICB2YXIgc0F4aXMgPSBpc0hvcml6b250YWwgPyB4YSA6IHlhO1xuICAgIHZhciBwQXhpcyA9IGlzSG9yaXpvbnRhbCA/IHlhIDogeGE7XG5cbiAgICBzWzBdID0gc0F4aXMuYzJwKGRpLnMwLCB0cnVlKTtcbiAgICBwWzBdID0gcEF4aXMuYzJwKGRpLnAwLCB0cnVlKTtcblxuICAgIHNbMV0gPSBzQXhpcy5jMnAoZGkuczEsIHRydWUpO1xuICAgIHBbMV0gPSBwQXhpcy5jMnAoZGkucDEsIHRydWUpO1xuXG4gICAgc1syXSA9IHNBeGlzLmMycChkaS5uZXh0UzAsIHRydWUpO1xuICAgIHBbMl0gPSBwQXhpcy5jMnAoZGkubmV4dFAwLCB0cnVlKTtcblxuICAgIHJldHVybiBpc0hvcml6b250YWwgPyBbcywgcF0gOiBbcCwgc107XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgREVTRUxFQ1RESU0gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvaW50ZXJhY3Rpb25zJykuREVTRUxFQ1RESU07XG52YXIgYmFyU3R5bGUgPSByZXF1aXJlKCcuLi9iYXIvc3R5bGUnKTtcbnZhciByZXNpemVUZXh0ID0gcmVxdWlyZSgnLi4vYmFyL3VuaWZvcm1fdGV4dCcpLnJlc2l6ZVRleHQ7XG52YXIgc3R5bGVUZXh0UG9pbnRzID0gYmFyU3R5bGUuc3R5bGVUZXh0UG9pbnRzO1xuXG5mdW5jdGlvbiBzdHlsZShnZCwgY2QsIHNlbCkge1xuICAgIHZhciBzID0gc2VsID8gc2VsIDogZDMuc2VsZWN0KGdkKS5zZWxlY3RBbGwoJ2cud2F0ZXJmYWxsbGF5ZXInKS5zZWxlY3RBbGwoJ2cudHJhY2UnKTtcbiAgICByZXNpemVUZXh0KGdkLCBzLCAnd2F0ZXJmYWxsJyk7XG5cbiAgICBzLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZFswXS50cmFjZS5vcGFjaXR5OyB9KTtcblxuICAgIHMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBnVHJhY2UgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciB0cmFjZSA9IGRbMF0udHJhY2U7XG5cbiAgICAgICAgZ1RyYWNlLnNlbGVjdEFsbCgnLnBvaW50ID4gcGF0aCcpLmVhY2goZnVuY3Rpb24oZGkpIHtcbiAgICAgICAgICAgIGlmKCFkaS5pc0JsYW5rKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnQgPSB0cmFjZVtkaS5kaXJdLm1hcmtlcjtcblxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuY2FsbChDb2xvci5maWxsLCBjb250LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAuY2FsbChDb2xvci5zdHJva2UsIGNvbnQubGluZS5jb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5kYXNoTGluZSwgY29udC5saW5lLmRhc2gsIGNvbnQubGluZS53aWR0aClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgdHJhY2Uuc2VsZWN0ZWRwb2ludHMgJiYgIWRpLnNlbGVjdGVkID8gREVTRUxFQ1RESU0gOiAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3R5bGVUZXh0UG9pbnRzKGdUcmFjZSwgdHJhY2UsIGdkKTtcblxuICAgICAgICBnVHJhY2Uuc2VsZWN0QWxsKCcubGluZXMnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbnQgPSB0cmFjZS5jb25uZWN0b3IubGluZTtcblxuICAgICAgICAgICAgRHJhd2luZy5saW5lR3JvdXBTdHlsZShcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCdwYXRoJyksXG4gICAgICAgICAgICAgICAgY29udC53aWR0aCxcbiAgICAgICAgICAgICAgICBjb250LmNvbG9yLFxuICAgICAgICAgICAgICAgIGNvbnQuZGFzaFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0eWxlOiBzdHlsZVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=