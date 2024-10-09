(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_ohlc_attributes_js-node_modules_plotly_js_src_trace-1e25bd"],{

/***/ "./node_modules/plotly.js/src/constants/delta.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/constants/delta.js ***!
  \*******************************************************/
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
    INCREASING: {
        COLOR: '#3D9970',
        SYMBOL: '▲'
    },
    DECREASING: {
        COLOR: '#FF4136',
        SYMBOL: '▼'
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/attributes.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/attributes.js ***!
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




var extendFlat = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").extendFlat;
var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var dash = __webpack_require__(/*! ../../components/drawing/attributes */ "./node_modules/plotly.js/src/components/drawing/attributes.js").dash;
var fxAttrs = __webpack_require__(/*! ../../components/fx/attributes */ "./node_modules/plotly.js/src/components/fx/attributes.js");
var delta = __webpack_require__(/*! ../../constants/delta.js */ "./node_modules/plotly.js/src/constants/delta.js");

var INCREASING_COLOR = delta.INCREASING.COLOR;
var DECREASING_COLOR = delta.DECREASING.COLOR;

var lineAttrs = scatterAttrs.line;

function directionAttrs(lineColorDefault) {
    return {
        line: {
            color: extendFlat({}, lineAttrs.color, {dflt: lineColorDefault}),
            width: lineAttrs.width,
            dash: dash,
            editType: 'style'
        },
        editType: 'style'
    };
}

module.exports = {

    x: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the x coordinates.',
            'If absent, linear coordinate will be generated.'
        ].join(' ')
    },

    open: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the open values.'
    },

    high: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the high values.'
    },

    low: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the low values.'
    },

    close: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the close values.'
    },

    line: {
        width: extendFlat({}, lineAttrs.width, {
            description: [
                lineAttrs.width,
                'Note that this style setting can also be set per',
                'direction via `increasing.line.width` and',
                '`decreasing.line.width`.'
            ].join(' ')
        }),
        dash: extendFlat({}, dash, {
            description: [
                dash.description,
                'Note that this style setting can also be set per',
                'direction via `increasing.line.dash` and',
                '`decreasing.line.dash`.'
            ].join(' ')
        }),
        editType: 'style'
    },

    increasing: directionAttrs(INCREASING_COLOR),

    decreasing: directionAttrs(DECREASING_COLOR),

    text: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        editType: 'calc',
        description: [
            'Sets hover text elements associated with each sample point.',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to',
            'this trace\'s sample points.'
        ].join(' ')
    },
    hovertext: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        editType: 'calc',
        description: 'Same as `text`.'
    },

    tickwidth: {
        valType: 'number',
        min: 0,
        max: 0.5,
        dflt: 0.3,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the width of the open/close tick marks',
            'relative to the *x* minimal interval.'
        ].join(' ')
    },

    hoverlabel: extendFlat({}, fxAttrs.hoverlabel, {
        split: {
            valType: 'boolean',
            role: 'info',
            dflt: false,
            editType: 'style',
            description: [
                'Show hover information (open, close, high, low) in',
                'separate labels.'
            ].join(' ')
        }
    }),
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/calc.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/calc.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var _ = Lib._;
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

function calc(gd, trace) {
    var xa = Axes.getFromId(gd, trace.xaxis);
    var ya = Axes.getFromId(gd, trace.yaxis);

    var tickLen = convertTickWidth(gd, xa, trace);
    var minDiff = trace._minDiff;
    trace._minDiff = null;
    var x = trace._xcalc;
    trace._xcalc = null;

    var cd = calcCommon(gd, trace, x, ya, ptFunc);

    trace._extremes[xa._id] = Axes.findExtremes(xa, x, {vpad: minDiff / 2});
    if(cd.length) {
        Lib.extendFlat(cd[0].t, {
            wHover: minDiff / 2,
            tickLen: tickLen
        });
        return cd;
    } else {
        return [{t: {empty: true}}];
    }
}

function ptFunc(o, h, l, c) {
    return {
        o: o,
        h: h,
        l: l,
        c: c
    };
}


// shared between OHLC and candlestick
// ptFunc makes a calcdata point specific to each trace type, from oi, hi, li, ci
function calcCommon(gd, trace, x, ya, ptFunc) {
    var o = ya.makeCalcdata(trace, 'open');
    var h = ya.makeCalcdata(trace, 'high');
    var l = ya.makeCalcdata(trace, 'low');
    var c = ya.makeCalcdata(trace, 'close');

    var hasTextArray = Array.isArray(trace.text);
    var hasHovertextArray = Array.isArray(trace.hovertext);

    // we're optimists - before we have any changing data, assume increasing
    var increasing = true;
    var cPrev = null;

    var cd = [];
    for(var i = 0; i < x.length; i++) {
        var xi = x[i];
        var oi = o[i];
        var hi = h[i];
        var li = l[i];
        var ci = c[i];

        if(xi !== BADNUM && oi !== BADNUM && hi !== BADNUM && li !== BADNUM && ci !== BADNUM) {
            if(ci === oi) {
                // if open == close, look for a change from the previous close
                if(cPrev !== null && ci !== cPrev) increasing = ci > cPrev;
                // else (c === cPrev or cPrev is null) no change
            } else increasing = ci > oi;

            cPrev = ci;

            var pt = ptFunc(oi, hi, li, ci);

            pt.pos = xi;
            pt.yc = (oi + ci) / 2;
            pt.i = i;
            pt.dir = increasing ? 'increasing' : 'decreasing';

            // For categoryorder, store low and high
            pt.x = pt.pos;
            pt.y = [li, hi];

            if(hasTextArray) pt.tx = trace.text[i];
            if(hasHovertextArray) pt.htx = trace.hovertext[i];

            cd.push(pt);
        } else {
            cd.push({pos: xi, empty: true});
        }
    }

    trace._extremes[ya._id] = Axes.findExtremes(ya, Lib.concat(l, h), {padded: true});

    if(cd.length) {
        cd[0].t = {
            labels: {
                open: _(gd, 'open:') + ' ',
                high: _(gd, 'high:') + ' ',
                low: _(gd, 'low:') + ' ',
                close: _(gd, 'close:') + ' '
            }
        };
    }

    return cd;
}

/*
 * find min x-coordinates difference of all traces
 * attached to this x-axis and stash the result in _minDiff
 * in all traces; when a trace uses this in its
 * calc step it deletes _minDiff, so that next calc this is
 * done again in case the data changed.
 * also since we need it here, stash _xcalc on the trace
 */
function convertTickWidth(gd, xa, trace) {
    var minDiff = trace._minDiff;

    if(!minDiff) {
        var fullData = gd._fullData;
        var ohlcTracesOnThisXaxis = [];

        minDiff = Infinity;

        var i;

        for(i = 0; i < fullData.length; i++) {
            var tracei = fullData[i];

            if(tracei.type === 'ohlc' &&
                tracei.visible === true &&
                tracei.xaxis === xa._id
            ) {
                ohlcTracesOnThisXaxis.push(tracei);

                var xcalc = xa.makeCalcdata(tracei, 'x');
                tracei._xcalc = xcalc;

                var _minDiff = Lib.distinctVals(xcalc).minDiff;
                if(_minDiff && isFinite(_minDiff)) {
                    minDiff = Math.min(minDiff, _minDiff);
                }
            }
        }

        // if minDiff is still Infinity here, set it to 1
        if(minDiff === Infinity) minDiff = 1;

        for(i = 0; i < ohlcTracesOnThisXaxis.length; i++) {
            ohlcTracesOnThisXaxis[i]._minDiff = minDiff;
        }
    }

    return minDiff * trace.tickwidth;
}

module.exports = {
    calc: calc,
    calcCommon: calcCommon
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/hover.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/hover.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var fillText = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").fillText;
var delta = __webpack_require__(/*! ../../constants/delta.js */ "./node_modules/plotly.js/src/constants/delta.js");

var DIRSYMBOL = {
    increasing: delta.INCREASING.SYMBOL,
    decreasing: delta.DECREASING.SYMBOL
};

function hoverPoints(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var trace = cd[0].trace;

    if(trace.hoverlabel.split) {
        return hoverSplit(pointData, xval, yval, hovermode);
    }

    return hoverOnPoints(pointData, xval, yval, hovermode);
}

function getClosestPoint(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var xa = pointData.xa;
    var trace = cd[0].trace;
    var t = cd[0].t;

    var type = trace.type;
    var minAttr = type === 'ohlc' ? 'l' : 'min';
    var maxAttr = type === 'ohlc' ? 'h' : 'max';

    var hoverPseudoDistance, spikePseudoDistance;

    // potentially shift xval for grouped candlesticks
    var centerShift = t.bPos || 0;
    var shiftPos = function(di) { return di.pos + centerShift - xval; };

    // ohlc and candlestick call displayHalfWidth different things...
    var displayHalfWidth = t.bdPos || t.tickLen;
    var hoverHalfWidth = t.wHover;

    // if two figures are overlaying, let the narrowest one win
    var pseudoDistance = Math.min(1, displayHalfWidth / Math.abs(xa.r2c(xa.range[1]) - xa.r2c(xa.range[0])));
    hoverPseudoDistance = pointData.maxHoverDistance - pseudoDistance;
    spikePseudoDistance = pointData.maxSpikeDistance - pseudoDistance;

    function dx(di) {
        var pos = shiftPos(di);
        return Fx.inbox(pos - hoverHalfWidth, pos + hoverHalfWidth, hoverPseudoDistance);
    }

    function dy(di) {
        var min = di[minAttr];
        var max = di[maxAttr];
        return min === max || Fx.inbox(min - yval, max - yval, hoverPseudoDistance);
    }

    function dxy(di) { return (dx(di) + dy(di)) / 2; }

    var distfn = Fx.getDistanceFunction(hovermode, dx, dy, dxy);
    Fx.getClosest(cd, distfn, pointData);

    if(pointData.index === false) return null;

    var di = cd[pointData.index];

    if(di.empty) return null;

    var dir = di.dir;
    var container = trace[dir];
    var lc = container.line.color;

    if(Color.opacity(lc) && container.line.width) pointData.color = lc;
    else pointData.color = container.fillcolor;

    pointData.x0 = xa.c2p(di.pos + centerShift - displayHalfWidth, true);
    pointData.x1 = xa.c2p(di.pos + centerShift + displayHalfWidth, true);

    pointData.xLabelVal = di.pos;

    pointData.spikeDistance = dxy(di) * spikePseudoDistance / hoverPseudoDistance;
    pointData.xSpike = xa.c2p(di.pos, true);

    return pointData;
}

function hoverSplit(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var ya = pointData.ya;
    var trace = cd[0].trace;
    var t = cd[0].t;
    var closeBoxData = [];

    var closestPoint = getClosestPoint(pointData, xval, yval, hovermode);
    // skip the rest (for this trace) if we didn't find a close point
    if(!closestPoint) return [];

    var cdIndex = closestPoint.index;
    var di = cd[cdIndex];
    var hoverinfo = di.hi || trace.hoverinfo;
    var hoverParts = hoverinfo.split('+');
    var isAll = hoverinfo === 'all';
    var hasY = isAll || hoverParts.indexOf('y') !== -1;

    // similar to hoverOnPoints, we return nothing
    // if all or y is not present.
    if(!hasY) return [];

    var attrs = ['high', 'open', 'close', 'low'];

    // several attributes can have the same y-coordinate. We will
    // bunch them together in a single text block. For this, we keep
    // a dictionary mapping y-coord -> point data.
    var usedVals = {};

    for(var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];

        var val = trace[attr][closestPoint.index];
        var valPx = ya.c2p(val, true);
        var pointData2;
        if(val in usedVals) {
            pointData2 = usedVals[val];
            pointData2.yLabel += '<br>' + t.labels[attr] + Axes.hoverLabelText(ya, val);
        } else {
            // copy out to a new object for each new y-value to label
            pointData2 = Lib.extendFlat({}, closestPoint);

            pointData2.y0 = pointData2.y1 = valPx;
            pointData2.yLabelVal = val;
            pointData2.yLabel = t.labels[attr] + Axes.hoverLabelText(ya, val);

            pointData2.name = '';

            closeBoxData.push(pointData2);
            usedVals[val] = pointData2;
        }
    }

    return closeBoxData;
}

function hoverOnPoints(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var ya = pointData.ya;
    var trace = cd[0].trace;
    var t = cd[0].t;

    var closestPoint = getClosestPoint(pointData, xval, yval, hovermode);
    // skip the rest (for this trace) if we didn't find a close point
    if(!closestPoint) return [];

    // we don't make a calcdata point if we're missing any piece (x/o/h/l/c)
    // so we need to fix the index here to point to the data arrays
    var cdIndex = closestPoint.index;
    var di = cd[cdIndex];
    var i = closestPoint.index = di.i;
    var dir = di.dir;

    function getLabelLine(attr) {
        return t.labels[attr] + Axes.hoverLabelText(ya, trace[attr][i]);
    }

    var hoverinfo = di.hi || trace.hoverinfo;
    var hoverParts = hoverinfo.split('+');
    var isAll = hoverinfo === 'all';
    var hasY = isAll || hoverParts.indexOf('y') !== -1;
    var hasText = isAll || hoverParts.indexOf('text') !== -1;

    var textParts = hasY ? [
        getLabelLine('open'),
        getLabelLine('high'),
        getLabelLine('low'),
        getLabelLine('close') + '  ' + DIRSYMBOL[dir]
    ] : [];
    if(hasText) fillText(di, trace, textParts);

    // don't make .yLabelVal or .text, since we're managing hoverinfo
    // put it all in .extraText
    closestPoint.extraText = textParts.join('<br>');

    // this puts the label *and the spike* at the midpoint of the box, ie
    // halfway between open and close, not between high and low.
    closestPoint.y0 = closestPoint.y1 = ya.c2p(di.yc, true);

    return [closestPoint];
}

module.exports = {
    hoverPoints: hoverPoints,
    hoverSplit: hoverSplit,
    hoverOnPoints: hoverOnPoints
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/ohlc_defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/ohlc_defaults.js ***!
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



var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

module.exports = function handleOHLC(traceIn, traceOut, coerce, layout) {
    var x = coerce('x');
    var open = coerce('open');
    var high = coerce('high');
    var low = coerce('low');
    var close = coerce('close');

    coerce('hoverlabel.split');

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x'], layout);

    if(!(open && high && low && close)) return;

    var len = Math.min(open.length, high.length, low.length, close.length);
    if(x) len = Math.min(len, Lib.minRowLength(x));
    traceOut._length = len;

    return len;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/select.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/select.js ***!
  \**********************************************************/
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
    var selection = [];
    var i;
    // for (potentially grouped) candlesticks
    var posOffset = cd[0].t.bPos || 0;

    if(selectionTester === false) {
        // clear selection
        for(i = 0; i < cd.length; i++) {
            cd[i].selected = 0;
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            var di = cd[i];

            if(selectionTester.contains([xa.c2p(di.pos + posOffset), ya.c2p(di.yc)], null, di.i, searchInfo)) {
                selection.push({
                    pointNumber: di.i,
                    x: xa.c2d(di.pos),
                    y: ya.c2d(di.yc)
                });
                di.selected = 1;
            } else {
                di.selected = 0;
            }
        }
    }

    return selection;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29uc3RhbnRzL2RlbHRhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvb2hsYy9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvb2hsYy9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvb2hsYy9ob3Zlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL29obGMvb2hsY19kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL29obGMvc2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsaUJBQWlCLDRGQUErQjtBQUNoRCxtQkFBbUIsbUJBQU8sQ0FBQyx3RkFBdUI7QUFDbEQsV0FBVyxvSUFBbUQ7QUFDOUQsY0FBYyxtQkFBTyxDQUFDLGdHQUFnQztBQUN0RCxZQUFZLG1CQUFPLENBQUMsaUZBQTBCOztBQUU5QztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxvQkFBb0IsdUJBQXVCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QjtBQUNBLFdBQVcsbUJBQU8sQ0FBQyx3RkFBNEI7QUFDL0MsYUFBYSxrSEFBMkM7O0FBRXhEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHdEQUF3RCxrQkFBa0I7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsaUJBQWlCLElBQUksYUFBYTtBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVCxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7O0FBRUEsdUVBQXVFLGFBQWE7O0FBRXBGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsa0JBQWtCLHFCQUFxQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLGtDQUFrQztBQUNwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyx3RkFBNEI7QUFDL0MsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLFNBQVMsbUJBQU8sQ0FBQyxnRkFBcUI7QUFDdEMsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxlQUFlLDBGQUE2QjtBQUM1QyxZQUFZLG1CQUFPLENBQUMsaUZBQTBCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQyxvQ0FBb0M7O0FBRXJFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQiw4QkFBOEI7O0FBRXBEO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixrQkFBa0I7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsMENBQTBDOztBQUUxQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsZ0VBQWdCO0FBQ3ZDLFVBQVUsbUJBQU8sQ0FBQyw0REFBVzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMLGtCQUFrQixlQUFlO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydGMwYjA5ZTQzMTA3NjlmYmE3OGZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBJTkNSRUFTSU5HOiB7XG4gICAgICAgIENPTE9SOiAnIzNEOTk3MCcsXG4gICAgICAgIFNZTUJPTDogJ+KWsidcbiAgICB9LFxuICAgIERFQ1JFQVNJTkc6IHtcbiAgICAgICAgQ09MT1I6ICcjRkY0MTM2JyxcbiAgICAgICAgU1lNQk9MOiAn4pa8J1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWInKS5leHRlbmRGbGF0O1xudmFyIHNjYXR0ZXJBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXR0cmlidXRlcycpO1xudmFyIGRhc2ggPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcvYXR0cmlidXRlcycpLmRhc2g7XG52YXIgZnhBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngvYXR0cmlidXRlcycpO1xudmFyIGRlbHRhID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL2RlbHRhLmpzJyk7XG5cbnZhciBJTkNSRUFTSU5HX0NPTE9SID0gZGVsdGEuSU5DUkVBU0lORy5DT0xPUjtcbnZhciBERUNSRUFTSU5HX0NPTE9SID0gZGVsdGEuREVDUkVBU0lORy5DT0xPUjtcblxudmFyIGxpbmVBdHRycyA9IHNjYXR0ZXJBdHRycy5saW5lO1xuXG5mdW5jdGlvbiBkaXJlY3Rpb25BdHRycyhsaW5lQ29sb3JEZWZhdWx0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGluZToge1xuICAgICAgICAgICAgY29sb3I6IGV4dGVuZEZsYXQoe30sIGxpbmVBdHRycy5jb2xvciwge2RmbHQ6IGxpbmVDb2xvckRlZmF1bHR9KSxcbiAgICAgICAgICAgIHdpZHRoOiBsaW5lQXR0cnMud2lkdGgsXG4gICAgICAgICAgICBkYXNoOiBkYXNoLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIHg6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHggY29vcmRpbmF0ZXMuJyxcbiAgICAgICAgICAgICdJZiBhYnNlbnQsIGxpbmVhciBjb29yZGluYXRlIHdpbGwgYmUgZ2VuZXJhdGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgb3Blbjoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgb3BlbiB2YWx1ZXMuJ1xuICAgIH0sXG5cbiAgICBoaWdoOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBoaWdoIHZhbHVlcy4nXG4gICAgfSxcblxuICAgIGxvdzoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgbG93IHZhbHVlcy4nXG4gICAgfSxcblxuICAgIGNsb3NlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBjbG9zZSB2YWx1ZXMuJ1xuICAgIH0sXG5cbiAgICBsaW5lOiB7XG4gICAgICAgIHdpZHRoOiBleHRlbmRGbGF0KHt9LCBsaW5lQXR0cnMud2lkdGgsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgbGluZUF0dHJzLndpZHRoLFxuICAgICAgICAgICAgICAgICdOb3RlIHRoYXQgdGhpcyBzdHlsZSBzZXR0aW5nIGNhbiBhbHNvIGJlIHNldCBwZXInLFxuICAgICAgICAgICAgICAgICdkaXJlY3Rpb24gdmlhIGBpbmNyZWFzaW5nLmxpbmUud2lkdGhgIGFuZCcsXG4gICAgICAgICAgICAgICAgJ2BkZWNyZWFzaW5nLmxpbmUud2lkdGhgLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuICAgICAgICBkYXNoOiBleHRlbmRGbGF0KHt9LCBkYXNoLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgIGRhc2guZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgJ05vdGUgdGhhdCB0aGlzIHN0eWxlIHNldHRpbmcgY2FuIGFsc28gYmUgc2V0IHBlcicsXG4gICAgICAgICAgICAgICAgJ2RpcmVjdGlvbiB2aWEgYGluY3JlYXNpbmcubGluZS5kYXNoYCBhbmQnLFxuICAgICAgICAgICAgICAgICdgZGVjcmVhc2luZy5saW5lLmRhc2hgLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgIH0sXG5cbiAgICBpbmNyZWFzaW5nOiBkaXJlY3Rpb25BdHRycyhJTkNSRUFTSU5HX0NPTE9SKSxcblxuICAgIGRlY3JlYXNpbmc6IGRpcmVjdGlvbkF0dHJzKERFQ1JFQVNJTkdfQ09MT1IpLFxuXG4gICAgdGV4dDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIGhvdmVyIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggc2FtcGxlIHBvaW50LicsXG4gICAgICAgICAgICAnSWYgYSBzaW5nbGUgc3RyaW5nLCB0aGUgc2FtZSBzdHJpbmcgYXBwZWFycyBvdmVyJyxcbiAgICAgICAgICAgICdhbGwgdGhlIGRhdGEgcG9pbnRzLicsXG4gICAgICAgICAgICAnSWYgYW4gYXJyYXkgb2Ygc3RyaW5nLCB0aGUgaXRlbXMgYXJlIG1hcHBlZCBpbiBvcmRlciB0bycsXG4gICAgICAgICAgICAndGhpcyB0cmFjZVxcJ3Mgc2FtcGxlIHBvaW50cy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBob3ZlcnRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2FtZSBhcyBgdGV4dGAuJ1xuICAgIH0sXG5cbiAgICB0aWNrd2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAwLjUsXG4gICAgICAgIGRmbHQ6IDAuMyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB3aWR0aCBvZiB0aGUgb3Blbi9jbG9zZSB0aWNrIG1hcmtzJyxcbiAgICAgICAgICAgICdyZWxhdGl2ZSB0byB0aGUgKngqIG1pbmltYWwgaW50ZXJ2YWwuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBob3ZlcmxhYmVsOiBleHRlbmRGbGF0KHt9LCBmeEF0dHJzLmhvdmVybGFiZWwsIHtcbiAgICAgICAgc3BsaXQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTaG93IGhvdmVyIGluZm9ybWF0aW9uIChvcGVuLCBjbG9zZSwgaGlnaCwgbG93KSBpbicsXG4gICAgICAgICAgICAgICAgJ3NlcGFyYXRlIGxhYmVscy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9XG4gICAgfSksXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgXyA9IExpYi5fO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbmZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIHhhID0gQXhlcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLnhheGlzKTtcbiAgICB2YXIgeWEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueWF4aXMpO1xuXG4gICAgdmFyIHRpY2tMZW4gPSBjb252ZXJ0VGlja1dpZHRoKGdkLCB4YSwgdHJhY2UpO1xuICAgIHZhciBtaW5EaWZmID0gdHJhY2UuX21pbkRpZmY7XG4gICAgdHJhY2UuX21pbkRpZmYgPSBudWxsO1xuICAgIHZhciB4ID0gdHJhY2UuX3hjYWxjO1xuICAgIHRyYWNlLl94Y2FsYyA9IG51bGw7XG5cbiAgICB2YXIgY2QgPSBjYWxjQ29tbW9uKGdkLCB0cmFjZSwgeCwgeWEsIHB0RnVuYyk7XG5cbiAgICB0cmFjZS5fZXh0cmVtZXNbeGEuX2lkXSA9IEF4ZXMuZmluZEV4dHJlbWVzKHhhLCB4LCB7dnBhZDogbWluRGlmZiAvIDJ9KTtcbiAgICBpZihjZC5sZW5ndGgpIHtcbiAgICAgICAgTGliLmV4dGVuZEZsYXQoY2RbMF0udCwge1xuICAgICAgICAgICAgd0hvdmVyOiBtaW5EaWZmIC8gMixcbiAgICAgICAgICAgIHRpY2tMZW46IHRpY2tMZW5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW3t0OiB7ZW1wdHk6IHRydWV9fV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwdEZ1bmMobywgaCwgbCwgYykge1xuICAgIHJldHVybiB7XG4gICAgICAgIG86IG8sXG4gICAgICAgIGg6IGgsXG4gICAgICAgIGw6IGwsXG4gICAgICAgIGM6IGNcbiAgICB9O1xufVxuXG5cbi8vIHNoYXJlZCBiZXR3ZWVuIE9ITEMgYW5kIGNhbmRsZXN0aWNrXG4vLyBwdEZ1bmMgbWFrZXMgYSBjYWxjZGF0YSBwb2ludCBzcGVjaWZpYyB0byBlYWNoIHRyYWNlIHR5cGUsIGZyb20gb2ksIGhpLCBsaSwgY2lcbmZ1bmN0aW9uIGNhbGNDb21tb24oZ2QsIHRyYWNlLCB4LCB5YSwgcHRGdW5jKSB7XG4gICAgdmFyIG8gPSB5YS5tYWtlQ2FsY2RhdGEodHJhY2UsICdvcGVuJyk7XG4gICAgdmFyIGggPSB5YS5tYWtlQ2FsY2RhdGEodHJhY2UsICdoaWdoJyk7XG4gICAgdmFyIGwgPSB5YS5tYWtlQ2FsY2RhdGEodHJhY2UsICdsb3cnKTtcbiAgICB2YXIgYyA9IHlhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ2Nsb3NlJyk7XG5cbiAgICB2YXIgaGFzVGV4dEFycmF5ID0gQXJyYXkuaXNBcnJheSh0cmFjZS50ZXh0KTtcbiAgICB2YXIgaGFzSG92ZXJ0ZXh0QXJyYXkgPSBBcnJheS5pc0FycmF5KHRyYWNlLmhvdmVydGV4dCk7XG5cbiAgICAvLyB3ZSdyZSBvcHRpbWlzdHMgLSBiZWZvcmUgd2UgaGF2ZSBhbnkgY2hhbmdpbmcgZGF0YSwgYXNzdW1lIGluY3JlYXNpbmdcbiAgICB2YXIgaW5jcmVhc2luZyA9IHRydWU7XG4gICAgdmFyIGNQcmV2ID0gbnVsbDtcblxuICAgIHZhciBjZCA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB4aSA9IHhbaV07XG4gICAgICAgIHZhciBvaSA9IG9baV07XG4gICAgICAgIHZhciBoaSA9IGhbaV07XG4gICAgICAgIHZhciBsaSA9IGxbaV07XG4gICAgICAgIHZhciBjaSA9IGNbaV07XG5cbiAgICAgICAgaWYoeGkgIT09IEJBRE5VTSAmJiBvaSAhPT0gQkFETlVNICYmIGhpICE9PSBCQUROVU0gJiYgbGkgIT09IEJBRE5VTSAmJiBjaSAhPT0gQkFETlVNKSB7XG4gICAgICAgICAgICBpZihjaSA9PT0gb2kpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBvcGVuID09IGNsb3NlLCBsb29rIGZvciBhIGNoYW5nZSBmcm9tIHRoZSBwcmV2aW91cyBjbG9zZVxuICAgICAgICAgICAgICAgIGlmKGNQcmV2ICE9PSBudWxsICYmIGNpICE9PSBjUHJldikgaW5jcmVhc2luZyA9IGNpID4gY1ByZXY7XG4gICAgICAgICAgICAgICAgLy8gZWxzZSAoYyA9PT0gY1ByZXYgb3IgY1ByZXYgaXMgbnVsbCkgbm8gY2hhbmdlXG4gICAgICAgICAgICB9IGVsc2UgaW5jcmVhc2luZyA9IGNpID4gb2k7XG5cbiAgICAgICAgICAgIGNQcmV2ID0gY2k7XG5cbiAgICAgICAgICAgIHZhciBwdCA9IHB0RnVuYyhvaSwgaGksIGxpLCBjaSk7XG5cbiAgICAgICAgICAgIHB0LnBvcyA9IHhpO1xuICAgICAgICAgICAgcHQueWMgPSAob2kgKyBjaSkgLyAyO1xuICAgICAgICAgICAgcHQuaSA9IGk7XG4gICAgICAgICAgICBwdC5kaXIgPSBpbmNyZWFzaW5nID8gJ2luY3JlYXNpbmcnIDogJ2RlY3JlYXNpbmcnO1xuXG4gICAgICAgICAgICAvLyBGb3IgY2F0ZWdvcnlvcmRlciwgc3RvcmUgbG93IGFuZCBoaWdoXG4gICAgICAgICAgICBwdC54ID0gcHQucG9zO1xuICAgICAgICAgICAgcHQueSA9IFtsaSwgaGldO1xuXG4gICAgICAgICAgICBpZihoYXNUZXh0QXJyYXkpIHB0LnR4ID0gdHJhY2UudGV4dFtpXTtcbiAgICAgICAgICAgIGlmKGhhc0hvdmVydGV4dEFycmF5KSBwdC5odHggPSB0cmFjZS5ob3ZlcnRleHRbaV07XG5cbiAgICAgICAgICAgIGNkLnB1c2gocHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2QucHVzaCh7cG9zOiB4aSwgZW1wdHk6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYWNlLl9leHRyZW1lc1t5YS5faWRdID0gQXhlcy5maW5kRXh0cmVtZXMoeWEsIExpYi5jb25jYXQobCwgaCksIHtwYWRkZWQ6IHRydWV9KTtcblxuICAgIGlmKGNkLmxlbmd0aCkge1xuICAgICAgICBjZFswXS50ID0ge1xuICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgb3BlbjogXyhnZCwgJ29wZW46JykgKyAnICcsXG4gICAgICAgICAgICAgICAgaGlnaDogXyhnZCwgJ2hpZ2g6JykgKyAnICcsXG4gICAgICAgICAgICAgICAgbG93OiBfKGdkLCAnbG93OicpICsgJyAnLFxuICAgICAgICAgICAgICAgIGNsb3NlOiBfKGdkLCAnY2xvc2U6JykgKyAnICdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2Q7XG59XG5cbi8qXG4gKiBmaW5kIG1pbiB4LWNvb3JkaW5hdGVzIGRpZmZlcmVuY2Ugb2YgYWxsIHRyYWNlc1xuICogYXR0YWNoZWQgdG8gdGhpcyB4LWF4aXMgYW5kIHN0YXNoIHRoZSByZXN1bHQgaW4gX21pbkRpZmZcbiAqIGluIGFsbCB0cmFjZXM7IHdoZW4gYSB0cmFjZSB1c2VzIHRoaXMgaW4gaXRzXG4gKiBjYWxjIHN0ZXAgaXQgZGVsZXRlcyBfbWluRGlmZiwgc28gdGhhdCBuZXh0IGNhbGMgdGhpcyBpc1xuICogZG9uZSBhZ2FpbiBpbiBjYXNlIHRoZSBkYXRhIGNoYW5nZWQuXG4gKiBhbHNvIHNpbmNlIHdlIG5lZWQgaXQgaGVyZSwgc3Rhc2ggX3hjYWxjIG9uIHRoZSB0cmFjZVxuICovXG5mdW5jdGlvbiBjb252ZXJ0VGlja1dpZHRoKGdkLCB4YSwgdHJhY2UpIHtcbiAgICB2YXIgbWluRGlmZiA9IHRyYWNlLl9taW5EaWZmO1xuXG4gICAgaWYoIW1pbkRpZmYpIHtcbiAgICAgICAgdmFyIGZ1bGxEYXRhID0gZ2QuX2Z1bGxEYXRhO1xuICAgICAgICB2YXIgb2hsY1RyYWNlc09uVGhpc1hheGlzID0gW107XG5cbiAgICAgICAgbWluRGlmZiA9IEluZmluaXR5O1xuXG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2VpID0gZnVsbERhdGFbaV07XG5cbiAgICAgICAgICAgIGlmKHRyYWNlaS50eXBlID09PSAnb2hsYycgJiZcbiAgICAgICAgICAgICAgICB0cmFjZWkudmlzaWJsZSA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgICAgIHRyYWNlaS54YXhpcyA9PT0geGEuX2lkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvaGxjVHJhY2VzT25UaGlzWGF4aXMucHVzaCh0cmFjZWkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHhjYWxjID0geGEubWFrZUNhbGNkYXRhKHRyYWNlaSwgJ3gnKTtcbiAgICAgICAgICAgICAgICB0cmFjZWkuX3hjYWxjID0geGNhbGM7XG5cbiAgICAgICAgICAgICAgICB2YXIgX21pbkRpZmYgPSBMaWIuZGlzdGluY3RWYWxzKHhjYWxjKS5taW5EaWZmO1xuICAgICAgICAgICAgICAgIGlmKF9taW5EaWZmICYmIGlzRmluaXRlKF9taW5EaWZmKSkge1xuICAgICAgICAgICAgICAgICAgICBtaW5EaWZmID0gTWF0aC5taW4obWluRGlmZiwgX21pbkRpZmYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG1pbkRpZmYgaXMgc3RpbGwgSW5maW5pdHkgaGVyZSwgc2V0IGl0IHRvIDFcbiAgICAgICAgaWYobWluRGlmZiA9PT0gSW5maW5pdHkpIG1pbkRpZmYgPSAxO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IG9obGNUcmFjZXNPblRoaXNYYXhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb2hsY1RyYWNlc09uVGhpc1hheGlzW2ldLl9taW5EaWZmID0gbWluRGlmZjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtaW5EaWZmICogdHJhY2UudGlja3dpZHRoO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjYWxjOiBjYWxjLFxuICAgIGNhbGNDb21tb246IGNhbGNDb21tb25cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBGeCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBmaWxsVGV4dCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmZpbGxUZXh0O1xudmFyIGRlbHRhID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL2RlbHRhLmpzJyk7XG5cbnZhciBESVJTWU1CT0wgPSB7XG4gICAgaW5jcmVhc2luZzogZGVsdGEuSU5DUkVBU0lORy5TWU1CT0wsXG4gICAgZGVjcmVhc2luZzogZGVsdGEuREVDUkVBU0lORy5TWU1CT0xcbn07XG5cbmZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlKSB7XG4gICAgdmFyIGNkID0gcG9pbnREYXRhLmNkO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuXG4gICAgaWYodHJhY2UuaG92ZXJsYWJlbC5zcGxpdCkge1xuICAgICAgICByZXR1cm4gaG92ZXJTcGxpdChwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhvdmVyT25Qb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpO1xufVxuXG5mdW5jdGlvbiBnZXRDbG9zZXN0UG9pbnQocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpIHtcbiAgICB2YXIgY2QgPSBwb2ludERhdGEuY2Q7XG4gICAgdmFyIHhhID0gcG9pbnREYXRhLnhhO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciB0ID0gY2RbMF0udDtcblxuICAgIHZhciB0eXBlID0gdHJhY2UudHlwZTtcbiAgICB2YXIgbWluQXR0ciA9IHR5cGUgPT09ICdvaGxjJyA/ICdsJyA6ICdtaW4nO1xuICAgIHZhciBtYXhBdHRyID0gdHlwZSA9PT0gJ29obGMnID8gJ2gnIDogJ21heCc7XG5cbiAgICB2YXIgaG92ZXJQc2V1ZG9EaXN0YW5jZSwgc3Bpa2VQc2V1ZG9EaXN0YW5jZTtcblxuICAgIC8vIHBvdGVudGlhbGx5IHNoaWZ0IHh2YWwgZm9yIGdyb3VwZWQgY2FuZGxlc3RpY2tzXG4gICAgdmFyIGNlbnRlclNoaWZ0ID0gdC5iUG9zIHx8IDA7XG4gICAgdmFyIHNoaWZ0UG9zID0gZnVuY3Rpb24oZGkpIHsgcmV0dXJuIGRpLnBvcyArIGNlbnRlclNoaWZ0IC0geHZhbDsgfTtcblxuICAgIC8vIG9obGMgYW5kIGNhbmRsZXN0aWNrIGNhbGwgZGlzcGxheUhhbGZXaWR0aCBkaWZmZXJlbnQgdGhpbmdzLi4uXG4gICAgdmFyIGRpc3BsYXlIYWxmV2lkdGggPSB0LmJkUG9zIHx8IHQudGlja0xlbjtcbiAgICB2YXIgaG92ZXJIYWxmV2lkdGggPSB0LndIb3ZlcjtcblxuICAgIC8vIGlmIHR3byBmaWd1cmVzIGFyZSBvdmVybGF5aW5nLCBsZXQgdGhlIG5hcnJvd2VzdCBvbmUgd2luXG4gICAgdmFyIHBzZXVkb0Rpc3RhbmNlID0gTWF0aC5taW4oMSwgZGlzcGxheUhhbGZXaWR0aCAvIE1hdGguYWJzKHhhLnIyYyh4YS5yYW5nZVsxXSkgLSB4YS5yMmMoeGEucmFuZ2VbMF0pKSk7XG4gICAgaG92ZXJQc2V1ZG9EaXN0YW5jZSA9IHBvaW50RGF0YS5tYXhIb3ZlckRpc3RhbmNlIC0gcHNldWRvRGlzdGFuY2U7XG4gICAgc3Bpa2VQc2V1ZG9EaXN0YW5jZSA9IHBvaW50RGF0YS5tYXhTcGlrZURpc3RhbmNlIC0gcHNldWRvRGlzdGFuY2U7XG5cbiAgICBmdW5jdGlvbiBkeChkaSkge1xuICAgICAgICB2YXIgcG9zID0gc2hpZnRQb3MoZGkpO1xuICAgICAgICByZXR1cm4gRnguaW5ib3gocG9zIC0gaG92ZXJIYWxmV2lkdGgsIHBvcyArIGhvdmVySGFsZldpZHRoLCBob3ZlclBzZXVkb0Rpc3RhbmNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkeShkaSkge1xuICAgICAgICB2YXIgbWluID0gZGlbbWluQXR0cl07XG4gICAgICAgIHZhciBtYXggPSBkaVttYXhBdHRyXTtcbiAgICAgICAgcmV0dXJuIG1pbiA9PT0gbWF4IHx8IEZ4LmluYm94KG1pbiAtIHl2YWwsIG1heCAtIHl2YWwsIGhvdmVyUHNldWRvRGlzdGFuY2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGR4eShkaSkgeyByZXR1cm4gKGR4KGRpKSArIGR5KGRpKSkgLyAyOyB9XG5cbiAgICB2YXIgZGlzdGZuID0gRnguZ2V0RGlzdGFuY2VGdW5jdGlvbihob3Zlcm1vZGUsIGR4LCBkeSwgZHh5KTtcbiAgICBGeC5nZXRDbG9zZXN0KGNkLCBkaXN0Zm4sIHBvaW50RGF0YSk7XG5cbiAgICBpZihwb2ludERhdGEuaW5kZXggPT09IGZhbHNlKSByZXR1cm4gbnVsbDtcblxuICAgIHZhciBkaSA9IGNkW3BvaW50RGF0YS5pbmRleF07XG5cbiAgICBpZihkaS5lbXB0eSkgcmV0dXJuIG51bGw7XG5cbiAgICB2YXIgZGlyID0gZGkuZGlyO1xuICAgIHZhciBjb250YWluZXIgPSB0cmFjZVtkaXJdO1xuICAgIHZhciBsYyA9IGNvbnRhaW5lci5saW5lLmNvbG9yO1xuXG4gICAgaWYoQ29sb3Iub3BhY2l0eShsYykgJiYgY29udGFpbmVyLmxpbmUud2lkdGgpIHBvaW50RGF0YS5jb2xvciA9IGxjO1xuICAgIGVsc2UgcG9pbnREYXRhLmNvbG9yID0gY29udGFpbmVyLmZpbGxjb2xvcjtcblxuICAgIHBvaW50RGF0YS54MCA9IHhhLmMycChkaS5wb3MgKyBjZW50ZXJTaGlmdCAtIGRpc3BsYXlIYWxmV2lkdGgsIHRydWUpO1xuICAgIHBvaW50RGF0YS54MSA9IHhhLmMycChkaS5wb3MgKyBjZW50ZXJTaGlmdCArIGRpc3BsYXlIYWxmV2lkdGgsIHRydWUpO1xuXG4gICAgcG9pbnREYXRhLnhMYWJlbFZhbCA9IGRpLnBvcztcblxuICAgIHBvaW50RGF0YS5zcGlrZURpc3RhbmNlID0gZHh5KGRpKSAqIHNwaWtlUHNldWRvRGlzdGFuY2UgLyBob3ZlclBzZXVkb0Rpc3RhbmNlO1xuICAgIHBvaW50RGF0YS54U3Bpa2UgPSB4YS5jMnAoZGkucG9zLCB0cnVlKTtcblxuICAgIHJldHVybiBwb2ludERhdGE7XG59XG5cbmZ1bmN0aW9uIGhvdmVyU3BsaXQocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpIHtcbiAgICB2YXIgY2QgPSBwb2ludERhdGEuY2Q7XG4gICAgdmFyIHlhID0gcG9pbnREYXRhLnlhO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciB0ID0gY2RbMF0udDtcbiAgICB2YXIgY2xvc2VCb3hEYXRhID0gW107XG5cbiAgICB2YXIgY2xvc2VzdFBvaW50ID0gZ2V0Q2xvc2VzdFBvaW50KHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlKTtcbiAgICAvLyBza2lwIHRoZSByZXN0IChmb3IgdGhpcyB0cmFjZSkgaWYgd2UgZGlkbid0IGZpbmQgYSBjbG9zZSBwb2ludFxuICAgIGlmKCFjbG9zZXN0UG9pbnQpIHJldHVybiBbXTtcblxuICAgIHZhciBjZEluZGV4ID0gY2xvc2VzdFBvaW50LmluZGV4O1xuICAgIHZhciBkaSA9IGNkW2NkSW5kZXhdO1xuICAgIHZhciBob3ZlcmluZm8gPSBkaS5oaSB8fCB0cmFjZS5ob3ZlcmluZm87XG4gICAgdmFyIGhvdmVyUGFydHMgPSBob3ZlcmluZm8uc3BsaXQoJysnKTtcbiAgICB2YXIgaXNBbGwgPSBob3ZlcmluZm8gPT09ICdhbGwnO1xuICAgIHZhciBoYXNZID0gaXNBbGwgfHwgaG92ZXJQYXJ0cy5pbmRleE9mKCd5JykgIT09IC0xO1xuXG4gICAgLy8gc2ltaWxhciB0byBob3Zlck9uUG9pbnRzLCB3ZSByZXR1cm4gbm90aGluZ1xuICAgIC8vIGlmIGFsbCBvciB5IGlzIG5vdCBwcmVzZW50LlxuICAgIGlmKCFoYXNZKSByZXR1cm4gW107XG5cbiAgICB2YXIgYXR0cnMgPSBbJ2hpZ2gnLCAnb3BlbicsICdjbG9zZScsICdsb3cnXTtcblxuICAgIC8vIHNldmVyYWwgYXR0cmlidXRlcyBjYW4gaGF2ZSB0aGUgc2FtZSB5LWNvb3JkaW5hdGUuIFdlIHdpbGxcbiAgICAvLyBidW5jaCB0aGVtIHRvZ2V0aGVyIGluIGEgc2luZ2xlIHRleHQgYmxvY2suIEZvciB0aGlzLCB3ZSBrZWVwXG4gICAgLy8gYSBkaWN0aW9uYXJ5IG1hcHBpbmcgeS1jb29yZCAtPiBwb2ludCBkYXRhLlxuICAgIHZhciB1c2VkVmFscyA9IHt9O1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdHRyID0gYXR0cnNbaV07XG5cbiAgICAgICAgdmFyIHZhbCA9IHRyYWNlW2F0dHJdW2Nsb3Nlc3RQb2ludC5pbmRleF07XG4gICAgICAgIHZhciB2YWxQeCA9IHlhLmMycCh2YWwsIHRydWUpO1xuICAgICAgICB2YXIgcG9pbnREYXRhMjtcbiAgICAgICAgaWYodmFsIGluIHVzZWRWYWxzKSB7XG4gICAgICAgICAgICBwb2ludERhdGEyID0gdXNlZFZhbHNbdmFsXTtcbiAgICAgICAgICAgIHBvaW50RGF0YTIueUxhYmVsICs9ICc8YnI+JyArIHQubGFiZWxzW2F0dHJdICsgQXhlcy5ob3ZlckxhYmVsVGV4dCh5YSwgdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvcHkgb3V0IHRvIGEgbmV3IG9iamVjdCBmb3IgZWFjaCBuZXcgeS12YWx1ZSB0byBsYWJlbFxuICAgICAgICAgICAgcG9pbnREYXRhMiA9IExpYi5leHRlbmRGbGF0KHt9LCBjbG9zZXN0UG9pbnQpO1xuXG4gICAgICAgICAgICBwb2ludERhdGEyLnkwID0gcG9pbnREYXRhMi55MSA9IHZhbFB4O1xuICAgICAgICAgICAgcG9pbnREYXRhMi55TGFiZWxWYWwgPSB2YWw7XG4gICAgICAgICAgICBwb2ludERhdGEyLnlMYWJlbCA9IHQubGFiZWxzW2F0dHJdICsgQXhlcy5ob3ZlckxhYmVsVGV4dCh5YSwgdmFsKTtcblxuICAgICAgICAgICAgcG9pbnREYXRhMi5uYW1lID0gJyc7XG5cbiAgICAgICAgICAgIGNsb3NlQm94RGF0YS5wdXNoKHBvaW50RGF0YTIpO1xuICAgICAgICAgICAgdXNlZFZhbHNbdmFsXSA9IHBvaW50RGF0YTI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xvc2VCb3hEYXRhO1xufVxuXG5mdW5jdGlvbiBob3Zlck9uUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlKSB7XG4gICAgdmFyIGNkID0gcG9pbnREYXRhLmNkO1xuICAgIHZhciB5YSA9IHBvaW50RGF0YS55YTtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgdCA9IGNkWzBdLnQ7XG5cbiAgICB2YXIgY2xvc2VzdFBvaW50ID0gZ2V0Q2xvc2VzdFBvaW50KHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlKTtcbiAgICAvLyBza2lwIHRoZSByZXN0IChmb3IgdGhpcyB0cmFjZSkgaWYgd2UgZGlkbid0IGZpbmQgYSBjbG9zZSBwb2ludFxuICAgIGlmKCFjbG9zZXN0UG9pbnQpIHJldHVybiBbXTtcblxuICAgIC8vIHdlIGRvbid0IG1ha2UgYSBjYWxjZGF0YSBwb2ludCBpZiB3ZSdyZSBtaXNzaW5nIGFueSBwaWVjZSAoeC9vL2gvbC9jKVxuICAgIC8vIHNvIHdlIG5lZWQgdG8gZml4IHRoZSBpbmRleCBoZXJlIHRvIHBvaW50IHRvIHRoZSBkYXRhIGFycmF5c1xuICAgIHZhciBjZEluZGV4ID0gY2xvc2VzdFBvaW50LmluZGV4O1xuICAgIHZhciBkaSA9IGNkW2NkSW5kZXhdO1xuICAgIHZhciBpID0gY2xvc2VzdFBvaW50LmluZGV4ID0gZGkuaTtcbiAgICB2YXIgZGlyID0gZGkuZGlyO1xuXG4gICAgZnVuY3Rpb24gZ2V0TGFiZWxMaW5lKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuIHQubGFiZWxzW2F0dHJdICsgQXhlcy5ob3ZlckxhYmVsVGV4dCh5YSwgdHJhY2VbYXR0cl1baV0pO1xuICAgIH1cblxuICAgIHZhciBob3ZlcmluZm8gPSBkaS5oaSB8fCB0cmFjZS5ob3ZlcmluZm87XG4gICAgdmFyIGhvdmVyUGFydHMgPSBob3ZlcmluZm8uc3BsaXQoJysnKTtcbiAgICB2YXIgaXNBbGwgPSBob3ZlcmluZm8gPT09ICdhbGwnO1xuICAgIHZhciBoYXNZID0gaXNBbGwgfHwgaG92ZXJQYXJ0cy5pbmRleE9mKCd5JykgIT09IC0xO1xuICAgIHZhciBoYXNUZXh0ID0gaXNBbGwgfHwgaG92ZXJQYXJ0cy5pbmRleE9mKCd0ZXh0JykgIT09IC0xO1xuXG4gICAgdmFyIHRleHRQYXJ0cyA9IGhhc1kgPyBbXG4gICAgICAgIGdldExhYmVsTGluZSgnb3BlbicpLFxuICAgICAgICBnZXRMYWJlbExpbmUoJ2hpZ2gnKSxcbiAgICAgICAgZ2V0TGFiZWxMaW5lKCdsb3cnKSxcbiAgICAgICAgZ2V0TGFiZWxMaW5lKCdjbG9zZScpICsgJyAgJyArIERJUlNZTUJPTFtkaXJdXG4gICAgXSA6IFtdO1xuICAgIGlmKGhhc1RleHQpIGZpbGxUZXh0KGRpLCB0cmFjZSwgdGV4dFBhcnRzKTtcblxuICAgIC8vIGRvbid0IG1ha2UgLnlMYWJlbFZhbCBvciAudGV4dCwgc2luY2Ugd2UncmUgbWFuYWdpbmcgaG92ZXJpbmZvXG4gICAgLy8gcHV0IGl0IGFsbCBpbiAuZXh0cmFUZXh0XG4gICAgY2xvc2VzdFBvaW50LmV4dHJhVGV4dCA9IHRleHRQYXJ0cy5qb2luKCc8YnI+Jyk7XG5cbiAgICAvLyB0aGlzIHB1dHMgdGhlIGxhYmVsICphbmQgdGhlIHNwaWtlKiBhdCB0aGUgbWlkcG9pbnQgb2YgdGhlIGJveCwgaWVcbiAgICAvLyBoYWxmd2F5IGJldHdlZW4gb3BlbiBhbmQgY2xvc2UsIG5vdCBiZXR3ZWVuIGhpZ2ggYW5kIGxvdy5cbiAgICBjbG9zZXN0UG9pbnQueTAgPSBjbG9zZXN0UG9pbnQueTEgPSB5YS5jMnAoZGkueWMsIHRydWUpO1xuXG4gICAgcmV0dXJuIFtjbG9zZXN0UG9pbnRdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBob3ZlclBvaW50czogaG92ZXJQb2ludHMsXG4gICAgaG92ZXJTcGxpdDogaG92ZXJTcGxpdCxcbiAgICBob3Zlck9uUG9pbnRzOiBob3Zlck9uUG9pbnRzXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZU9ITEModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0KSB7XG4gICAgdmFyIHggPSBjb2VyY2UoJ3gnKTtcbiAgICB2YXIgb3BlbiA9IGNvZXJjZSgnb3BlbicpO1xuICAgIHZhciBoaWdoID0gY29lcmNlKCdoaWdoJyk7XG4gICAgdmFyIGxvdyA9IGNvZXJjZSgnbG93Jyk7XG4gICAgdmFyIGNsb3NlID0gY29lcmNlKCdjbG9zZScpO1xuXG4gICAgY29lcmNlKCdob3ZlcmxhYmVsLnNwbGl0Jyk7XG5cbiAgICB2YXIgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY2FsZW5kYXJzJywgJ2hhbmRsZVRyYWNlRGVmYXVsdHMnKTtcbiAgICBoYW5kbGVDYWxlbmRhckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBbJ3gnXSwgbGF5b3V0KTtcblxuICAgIGlmKCEob3BlbiAmJiBoaWdoICYmIGxvdyAmJiBjbG9zZSkpIHJldHVybjtcblxuICAgIHZhciBsZW4gPSBNYXRoLm1pbihvcGVuLmxlbmd0aCwgaGlnaC5sZW5ndGgsIGxvdy5sZW5ndGgsIGNsb3NlLmxlbmd0aCk7XG4gICAgaWYoeCkgbGVuID0gTWF0aC5taW4obGVuLCBMaWIubWluUm93TGVuZ3RoKHgpKTtcbiAgICB0cmFjZU91dC5fbGVuZ3RoID0gbGVuO1xuXG4gICAgcmV0dXJuIGxlbjtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0UG9pbnRzKHNlYXJjaEluZm8sIHNlbGVjdGlvblRlc3Rlcikge1xuICAgIHZhciBjZCA9IHNlYXJjaEluZm8uY2Q7XG4gICAgdmFyIHhhID0gc2VhcmNoSW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBzZWFyY2hJbmZvLnlheGlzO1xuICAgIHZhciBzZWxlY3Rpb24gPSBbXTtcbiAgICB2YXIgaTtcbiAgICAvLyBmb3IgKHBvdGVudGlhbGx5IGdyb3VwZWQpIGNhbmRsZXN0aWNrc1xuICAgIHZhciBwb3NPZmZzZXQgPSBjZFswXS50LmJQb3MgfHwgMDtcblxuICAgIGlmKHNlbGVjdGlvblRlc3RlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gY2xlYXIgc2VsZWN0aW9uXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjZFtpXS5zZWxlY3RlZCA9IDA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGRpID0gY2RbaV07XG5cbiAgICAgICAgICAgIGlmKHNlbGVjdGlvblRlc3Rlci5jb250YWlucyhbeGEuYzJwKGRpLnBvcyArIHBvc09mZnNldCksIHlhLmMycChkaS55YyldLCBudWxsLCBkaS5pLCBzZWFyY2hJbmZvKSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnROdW1iZXI6IGRpLmksXG4gICAgICAgICAgICAgICAgICAgIHg6IHhhLmMyZChkaS5wb3MpLFxuICAgICAgICAgICAgICAgICAgICB5OiB5YS5jMmQoZGkueWMpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGkuc2VsZWN0ZWQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaS5zZWxlY3RlZCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=