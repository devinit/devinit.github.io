(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_scatter_calc_js-node_modules_plotly_js_src_traces_s-161960"],{

/***/ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js ***!
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


// arrayOk attributes, merge them into calcdata array
module.exports = function arraysToCalcdata(cd, trace) {
    // so each point knows which index it originally came from
    for(var i = 0; i < cd.length; i++) cd[i].i = i;

    Lib.mergeArray(trace.text, cd, 'tx');
    Lib.mergeArray(trace.texttemplate, cd, 'txt');
    Lib.mergeArray(trace.hovertext, cd, 'htx');
    Lib.mergeArray(trace.customdata, cd, 'data');
    Lib.mergeArray(trace.textposition, cd, 'tp');
    if(trace.textfont) {
        Lib.mergeArrayCastPositive(trace.textfont.size, cd, 'ts');
        Lib.mergeArray(trace.textfont.color, cd, 'tc');
        Lib.mergeArray(trace.textfont.family, cd, 'tf');
    }

    var marker = trace.marker;
    if(marker) {
        Lib.mergeArrayCastPositive(marker.size, cd, 'ms');
        Lib.mergeArrayCastPositive(marker.opacity, cd, 'mo');
        Lib.mergeArray(marker.symbol, cd, 'mx');
        Lib.mergeArray(marker.color, cd, 'mc');

        var markerLine = marker.line;
        if(marker.line) {
            Lib.mergeArray(markerLine.color, cd, 'mlc');
            Lib.mergeArrayCastPositive(markerLine.width, cd, 'mlw');
        }

        var markerGradient = marker.gradient;
        if(markerGradient && markerGradient.type !== 'none') {
            Lib.mergeArray(markerGradient.type, cd, 'mgt');
            Lib.mergeArray(markerGradient.color, cd, 'mgc');
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/calc.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/calc.js ***!
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

var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

var subTypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var calcColorscale = __webpack_require__(/*! ./colorscale_calc */ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js");
var arraysToCalcdata = __webpack_require__(/*! ./arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ./calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");

function calc(gd, trace) {
    var fullLayout = gd._fullLayout;
    var xa = Axes.getFromId(gd, trace.xaxis || 'x');
    var ya = Axes.getFromId(gd, trace.yaxis || 'y');
    var x = xa.makeCalcdata(trace, 'x');
    var y = ya.makeCalcdata(trace, 'y');
    var serieslen = trace._length;
    var cd = new Array(serieslen);
    var ids = trace.ids;
    var stackGroupOpts = getStackOpts(trace, fullLayout, xa, ya);
    var interpolateGaps = false;
    var isV, i, j, k, interpolate, vali;

    setFirstScatter(fullLayout, trace);

    var xAttr = 'x';
    var yAttr = 'y';
    var posAttr;
    if(stackGroupOpts) {
        Lib.pushUnique(stackGroupOpts.traceIndices, trace._expandedIndex);
        isV = stackGroupOpts.orientation === 'v';

        // size, like we use for bar
        if(isV) {
            yAttr = 's';
            posAttr = 'x';
        } else {
            xAttr = 's';
            posAttr = 'y';
        }
        interpolate = stackGroupOpts.stackgaps === 'interpolate';
    } else {
        var ppad = calcMarkerSize(trace, serieslen);
        calcAxisExpansion(gd, trace, xa, ya, x, y, ppad);
    }

    for(i = 0; i < serieslen; i++) {
        var cdi = cd[i] = {};
        var xValid = isNumeric(x[i]);
        var yValid = isNumeric(y[i]);
        if(xValid && yValid) {
            cdi[xAttr] = x[i];
            cdi[yAttr] = y[i];
        } else if(stackGroupOpts && (isV ? xValid : yValid)) {
            // if we're stacking we need to hold on to all valid positions
            // even with invalid sizes

            cdi[posAttr] = isV ? x[i] : y[i];
            cdi.gap = true;
            if(interpolate) {
                cdi.s = BADNUM;
                interpolateGaps = true;
            } else {
                cdi.s = 0;
            }
        } else {
            cdi[xAttr] = cdi[yAttr] = BADNUM;
        }

        if(ids) {
            cdi.id = String(ids[i]);
        }
    }

    arraysToCalcdata(cd, trace);
    calcColorscale(gd, trace);
    calcSelection(cd, trace);

    if(stackGroupOpts) {
        // remove bad positions and sort
        // note that original indices get added to cd in arraysToCalcdata
        i = 0;
        while(i < cd.length) {
            if(cd[i][posAttr] === BADNUM) {
                cd.splice(i, 1);
            } else i++;
        }

        Lib.sort(cd, function(a, b) {
            return (a[posAttr] - b[posAttr]) || (a.i - b.i);
        });

        if(interpolateGaps) {
            // first fill the beginning with constant from the first point
            i = 0;
            while(i < cd.length - 1 && cd[i].gap) {
                i++;
            }
            vali = cd[i].s;
            if(!vali) vali = cd[i].s = 0; // in case of no data AT ALL in this trace - use 0
            for(j = 0; j < i; j++) {
                cd[j].s = vali;
            }
            // then fill the end with constant from the last point
            k = cd.length - 1;
            while(k > i && cd[k].gap) {
                k--;
            }
            vali = cd[k].s;
            for(j = cd.length - 1; j > k; j--) {
                cd[j].s = vali;
            }
            // now interpolate internal gaps linearly
            while(i < k) {
                i++;
                if(cd[i].gap) {
                    j = i + 1;
                    while(cd[j].gap) {
                        j++;
                    }
                    var pos0 = cd[i - 1][posAttr];
                    var size0 = cd[i - 1].s;
                    var m = (cd[j].s - size0) / (cd[j][posAttr] - pos0);
                    while(i < j) {
                        cd[i].s = size0 + (cd[i][posAttr] - pos0) * m;
                        i++;
                    }
                }
            }
        }
    }

    return cd;
}

function calcAxisExpansion(gd, trace, xa, ya, x, y, ppad) {
    var serieslen = trace._length;
    var fullLayout = gd._fullLayout;
    var xId = xa._id;
    var yId = ya._id;
    var firstScatter = fullLayout._firstScatter[firstScatterGroup(trace)] === trace.uid;
    var stackOrientation = (getStackOpts(trace, fullLayout, xa, ya) || {}).orientation;
    var fill = trace.fill;

    // cancel minimum tick spacings (only applies to bars and boxes)
    xa._minDtick = 0;
    ya._minDtick = 0;

    // check whether bounds should be tight, padded, extended to zero...
    // most cases both should be padded on both ends, so start with that.
    var xOptions = {padded: true};
    var yOptions = {padded: true};

    if(ppad) {
        xOptions.ppad = yOptions.ppad = ppad;
    }

    // TODO: text size

    var openEnded = serieslen < 2 || (x[0] !== x[serieslen - 1]) || (y[0] !== y[serieslen - 1]);

    if(openEnded && (
        (fill === 'tozerox') ||
        ((fill === 'tonextx') && (firstScatter || stackOrientation === 'h'))
    )) {
        // include zero (tight) and extremes (padded) if fill to zero
        // (unless the shape is closed, then it's just filling the shape regardless)

        xOptions.tozero = true;
    } else if(!(trace.error_y || {}).visible && (
        // if no error bars, markers or text, or fill to y=0 remove x padding

            (fill === 'tonexty' || fill === 'tozeroy') ||
            (!subTypes.hasMarkers(trace) && !subTypes.hasText(trace))
        )) {
        xOptions.padded = false;
        xOptions.ppad = 0;
    }

    if(openEnded && (
        (fill === 'tozeroy') ||
        ((fill === 'tonexty') && (firstScatter || stackOrientation === 'v'))
    )) {
        // now check for y - rather different logic, though still mostly padded both ends
        // include zero (tight) and extremes (padded) if fill to zero
        // (unless the shape is closed, then it's just filling the shape regardless)

        yOptions.tozero = true;
    } else if(fill === 'tonextx' || fill === 'tozerox') {
        // tight y: any x fill

        yOptions.padded = false;
    }

    // N.B. asymmetric splom traces call this with blank {} xa or ya
    if(xId) trace._extremes[xId] = Axes.findExtremes(xa, x, xOptions);
    if(yId) trace._extremes[yId] = Axes.findExtremes(ya, y, yOptions);
}

function calcMarkerSize(trace, serieslen) {
    if(!subTypes.hasMarkers(trace)) return;

    // Treat size like x or y arrays --- Run d2c
    // this needs to go before ppad computation
    var marker = trace.marker;
    var sizeref = 1.6 * (trace.marker.sizeref || 1);
    var markerTrans;

    if(trace.marker.sizemode === 'area') {
        markerTrans = function(v) {
            return Math.max(Math.sqrt((v || 0) / sizeref), 3);
        };
    } else {
        markerTrans = function(v) {
            return Math.max((v || 0) / sizeref, 3);
        };
    }

    if(Lib.isArrayOrTypedArray(marker.size)) {
        // I tried auto-type but category and dates dont make much sense.
        var ax = {type: 'linear'};
        Axes.setConvert(ax);

        var s = ax.makeCalcdata(trace.marker, 'size');

        var sizeOut = new Array(serieslen);
        for(var i = 0; i < serieslen; i++) {
            sizeOut[i] = markerTrans(s[i]);
        }
        return sizeOut;
    } else {
        return markerTrans(marker.size);
    }
}

/**
 * mark the first scatter trace for each subplot
 * note that scatter and scattergl each get their own first trace
 * note also that I'm doing this during calc rather than supplyDefaults
 * so I don't need to worry about transforms, but if we ever do
 * per-trace calc this will get confused.
 */
function setFirstScatter(fullLayout, trace) {
    var group = firstScatterGroup(trace);
    var firstScatter = fullLayout._firstScatter;
    if(!firstScatter[group]) firstScatter[group] = trace.uid;
}

function firstScatterGroup(trace) {
    var stackGroup = trace.stackgroup;
    return trace.xaxis + trace.yaxis + trace.type +
        (stackGroup ? '-' + stackGroup : '');
}

function getStackOpts(trace, fullLayout, xa, ya) {
    var stackGroup = trace.stackgroup;
    if(!stackGroup) return;
    var stackOpts = fullLayout._scatterStackOpts[xa._id + ya._id][stackGroup];
    var stackAx = stackOpts.orientation === 'v' ? ya : xa;
    // Allow stacking only on numeric axes
    // calc is a little late to be figuring this out, but during supplyDefaults
    // we don't know the axis type yet
    if(stackAx.type === 'linear' || stackAx.type === 'log') return stackOpts;
}

module.exports = {
    calc: calc,
    calcMarkerSize: calcMarkerSize,
    calcAxisExpansion: calcAxisExpansion,
    setFirstScatter: setFirstScatter,
    getStackOpts: getStackOpts
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/calc_selection.js ***!
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

module.exports = function calcSelection(cd, trace) {
    if(Lib.isArrayOrTypedArray(trace.selectedpoints)) {
        Lib.tagSelected(cd, trace);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js ***!
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



var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var calcColorscale = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");

var subTypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");

module.exports = function calcMarkerColorscale(gd, trace) {
    if(subTypes.hasLines(trace) && hasColorscale(trace, 'line')) {
        calcColorscale(gd, trace, {
            vals: trace.line.color,
            containerStr: 'line',
            cLetter: 'c'
        });
    }

    if(subTypes.hasMarkers(trace)) {
        if(hasColorscale(trace, 'marker')) {
            calcColorscale(gd, trace, {
                vals: trace.marker.color,
                containerStr: 'marker',
                cLetter: 'c'
            });
        }
        if(hasColorscale(trace, 'marker.line')) {
            calcColorscale(gd, trace, {
                vals: trace.marker.line.color,
                containerStr: 'marker.line',
                cLetter: 'c'
            });
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/get_trace_color.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/get_trace_color.js ***!
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




var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var subtypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");


module.exports = function getTraceColor(trace, di) {
    var lc, tc;

    // TODO: text modes

    if(trace.mode === 'lines') {
        lc = trace.line.color;
        return (lc && Color.opacity(lc)) ?
            lc : trace.fillcolor;
    } else if(trace.mode === 'none') {
        return trace.fill ? trace.fillcolor : '';
    } else {
        var mc = di.mcc || (trace.marker || {}).color;
        var mlc = di.mlcc || ((trace.marker || {}).line || {}).color;

        tc = (mc && Color.opacity(mc)) ? mc :
            (mlc && Color.opacity(mlc) &&
                (di.mlw || ((trace.marker || {}).line || {}).width)) ? mlc : '';

        if(tc) {
            // make sure the points aren't TOO transparent
            if(Color.opacity(tc) < 0.3) {
                return Color.addOpacity(tc, 0.3);
            } else return tc;
        } else {
            lc = (trace.line || {}).color;
            return (lc && Color.opacity(lc) &&
                subtypes.hasLines(trace) && trace.line.width) ?
                    lc : trace.fillcolor;
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js ***!
  \**********************************************************************/
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
    container: 'marker',
    min: 'cmin',
    max: 'cmax'
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/marker_defaults.js ***!
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



var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");

var subTypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");

/*
 * opts: object of flags to control features not all marker users support
 *   noLine: caller does not support marker lines
 *   gradient: caller supports gradients
 *   noSelect: caller does not support selected/unselected attribute containers
 */
module.exports = function markerDefaults(traceIn, traceOut, defaultColor, layout, coerce, opts) {
    var isBubble = subTypes.isBubble(traceIn);
    var lineColor = (traceIn.line || {}).color;
    var defaultMLC;

    opts = opts || {};

    // marker.color inherit from line.color (even if line.color is an array)
    if(lineColor) defaultColor = lineColor;

    coerce('marker.symbol');
    coerce('marker.opacity', isBubble ? 0.7 : 1);
    coerce('marker.size');

    coerce('marker.color', defaultColor);
    if(hasColorscale(traceIn, 'marker')) {
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'marker.', cLetter: 'c'});
    }

    if(!opts.noSelect) {
        coerce('selected.marker.color');
        coerce('unselected.marker.color');
        coerce('selected.marker.size');
        coerce('unselected.marker.size');
    }

    if(!opts.noLine) {
        // if there's a line with a different color than the marker, use
        // that line color as the default marker line color
        // (except when it's an array)
        // mostly this is for transparent markers to behave nicely
        if(lineColor && !Array.isArray(lineColor) && (traceOut.marker.color !== lineColor)) {
            defaultMLC = lineColor;
        } else if(isBubble) defaultMLC = Color.background;
        else defaultMLC = Color.defaultLine;

        coerce('marker.line.color', defaultMLC);
        if(hasColorscale(traceIn, 'marker.line')) {
            colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'marker.line.', cLetter: 'c'});
        }

        coerce('marker.line.width', isBubble ? 1 : 0);
    }

    if(isBubble) {
        coerce('marker.sizeref');
        coerce('marker.sizemin');
        coerce('marker.sizemode');
    }

    if(opts.gradient) {
        var gradientType = coerce('marker.gradient.type');
        if(gradientType !== 'none') {
            coerce('marker.gradient.color');
        }
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvYXJyYXlzX3RvX2NhbGNkYXRhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9jYWxjX3NlbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvY29sb3JzY2FsZV9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9nZXRfdHJhY2VfY29sb3IuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL21hcmtlcl9jb2xvcmJhci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbWFya2VyX2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7OztBQUc3QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZUFBZTs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLG1FQUFtRSxxQ0FBcUM7QUFDeEc7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0NWQ2N2YxZjAyNGIwYjgxZDRlNTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG5cbi8vIGFycmF5T2sgYXR0cmlidXRlcywgbWVyZ2UgdGhlbSBpbnRvIGNhbGNkYXRhIGFycmF5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5c1RvQ2FsY2RhdGEoY2QsIHRyYWNlKSB7XG4gICAgLy8gc28gZWFjaCBwb2ludCBrbm93cyB3aGljaCBpbmRleCBpdCBvcmlnaW5hbGx5IGNhbWUgZnJvbVxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjZC5sZW5ndGg7IGkrKykgY2RbaV0uaSA9IGk7XG5cbiAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS50ZXh0LCBjZCwgJ3R4Jyk7XG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dHRlbXBsYXRlLCBjZCwgJ3R4dCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLmhvdmVydGV4dCwgY2QsICdodHgnKTtcbiAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS5jdXN0b21kYXRhLCBjZCwgJ2RhdGEnKTtcbiAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS50ZXh0cG9zaXRpb24sIGNkLCAndHAnKTtcbiAgICBpZih0cmFjZS50ZXh0Zm9udCkge1xuICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZSh0cmFjZS50ZXh0Zm9udC5zaXplLCBjZCwgJ3RzJyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLnRleHRmb250LmNvbG9yLCBjZCwgJ3RjJyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLnRleHRmb250LmZhbWlseSwgY2QsICd0ZicpO1xuICAgIH1cblxuICAgIHZhciBtYXJrZXIgPSB0cmFjZS5tYXJrZXI7XG4gICAgaWYobWFya2VyKSB7XG4gICAgICAgIExpYi5tZXJnZUFycmF5Q2FzdFBvc2l0aXZlKG1hcmtlci5zaXplLCBjZCwgJ21zJyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5Q2FzdFBvc2l0aXZlKG1hcmtlci5vcGFjaXR5LCBjZCwgJ21vJyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5zeW1ib2wsIGNkLCAnbXgnKTtcbiAgICAgICAgTGliLm1lcmdlQXJyYXkobWFya2VyLmNvbG9yLCBjZCwgJ21jJyk7XG5cbiAgICAgICAgdmFyIG1hcmtlckxpbmUgPSBtYXJrZXIubGluZTtcbiAgICAgICAgaWYobWFya2VyLmxpbmUpIHtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckxpbmUuY29sb3IsIGNkLCAnbWxjJyk7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXJMaW5lLndpZHRoLCBjZCwgJ21sdycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hcmtlckdyYWRpZW50ID0gbWFya2VyLmdyYWRpZW50O1xuICAgICAgICBpZihtYXJrZXJHcmFkaWVudCAmJiBtYXJrZXJHcmFkaWVudC50eXBlICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckdyYWRpZW50LnR5cGUsIGNkLCAnbWd0Jyk7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheShtYXJrZXJHcmFkaWVudC5jb2xvciwgY2QsICdtZ2MnKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxudmFyIHN1YlR5cGVzID0gcmVxdWlyZSgnLi9zdWJ0eXBlcycpO1xudmFyIGNhbGNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi9jb2xvcnNjYWxlX2NhbGMnKTtcbnZhciBhcnJheXNUb0NhbGNkYXRhID0gcmVxdWlyZSgnLi9hcnJheXNfdG9fY2FsY2RhdGEnKTtcbnZhciBjYWxjU2VsZWN0aW9uID0gcmVxdWlyZSgnLi9jYWxjX3NlbGVjdGlvbicpO1xuXG5mdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIHhhID0gQXhlcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLnhheGlzIHx8ICd4Jyk7XG4gICAgdmFyIHlhID0gQXhlcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLnlheGlzIHx8ICd5Jyk7XG4gICAgdmFyIHggPSB4YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd4Jyk7XG4gICAgdmFyIHkgPSB5YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd5Jyk7XG4gICAgdmFyIHNlcmllc2xlbiA9IHRyYWNlLl9sZW5ndGg7XG4gICAgdmFyIGNkID0gbmV3IEFycmF5KHNlcmllc2xlbik7XG4gICAgdmFyIGlkcyA9IHRyYWNlLmlkcztcbiAgICB2YXIgc3RhY2tHcm91cE9wdHMgPSBnZXRTdGFja09wdHModHJhY2UsIGZ1bGxMYXlvdXQsIHhhLCB5YSk7XG4gICAgdmFyIGludGVycG9sYXRlR2FwcyA9IGZhbHNlO1xuICAgIHZhciBpc1YsIGksIGosIGssIGludGVycG9sYXRlLCB2YWxpO1xuXG4gICAgc2V0Rmlyc3RTY2F0dGVyKGZ1bGxMYXlvdXQsIHRyYWNlKTtcblxuICAgIHZhciB4QXR0ciA9ICd4JztcbiAgICB2YXIgeUF0dHIgPSAneSc7XG4gICAgdmFyIHBvc0F0dHI7XG4gICAgaWYoc3RhY2tHcm91cE9wdHMpIHtcbiAgICAgICAgTGliLnB1c2hVbmlxdWUoc3RhY2tHcm91cE9wdHMudHJhY2VJbmRpY2VzLCB0cmFjZS5fZXhwYW5kZWRJbmRleCk7XG4gICAgICAgIGlzViA9IHN0YWNrR3JvdXBPcHRzLm9yaWVudGF0aW9uID09PSAndic7XG5cbiAgICAgICAgLy8gc2l6ZSwgbGlrZSB3ZSB1c2UgZm9yIGJhclxuICAgICAgICBpZihpc1YpIHtcbiAgICAgICAgICAgIHlBdHRyID0gJ3MnO1xuICAgICAgICAgICAgcG9zQXR0ciA9ICd4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHhBdHRyID0gJ3MnO1xuICAgICAgICAgICAgcG9zQXR0ciA9ICd5JztcbiAgICAgICAgfVxuICAgICAgICBpbnRlcnBvbGF0ZSA9IHN0YWNrR3JvdXBPcHRzLnN0YWNrZ2FwcyA9PT0gJ2ludGVycG9sYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcHBhZCA9IGNhbGNNYXJrZXJTaXplKHRyYWNlLCBzZXJpZXNsZW4pO1xuICAgICAgICBjYWxjQXhpc0V4cGFuc2lvbihnZCwgdHJhY2UsIHhhLCB5YSwgeCwgeSwgcHBhZCk7XG4gICAgfVxuXG4gICAgZm9yKGkgPSAwOyBpIDwgc2VyaWVzbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGNkaSA9IGNkW2ldID0ge307XG4gICAgICAgIHZhciB4VmFsaWQgPSBpc051bWVyaWMoeFtpXSk7XG4gICAgICAgIHZhciB5VmFsaWQgPSBpc051bWVyaWMoeVtpXSk7XG4gICAgICAgIGlmKHhWYWxpZCAmJiB5VmFsaWQpIHtcbiAgICAgICAgICAgIGNkaVt4QXR0cl0gPSB4W2ldO1xuICAgICAgICAgICAgY2RpW3lBdHRyXSA9IHlbaV07XG4gICAgICAgIH0gZWxzZSBpZihzdGFja0dyb3VwT3B0cyAmJiAoaXNWID8geFZhbGlkIDogeVZhbGlkKSkge1xuICAgICAgICAgICAgLy8gaWYgd2UncmUgc3RhY2tpbmcgd2UgbmVlZCB0byBob2xkIG9uIHRvIGFsbCB2YWxpZCBwb3NpdGlvbnNcbiAgICAgICAgICAgIC8vIGV2ZW4gd2l0aCBpbnZhbGlkIHNpemVzXG5cbiAgICAgICAgICAgIGNkaVtwb3NBdHRyXSA9IGlzViA/IHhbaV0gOiB5W2ldO1xuICAgICAgICAgICAgY2RpLmdhcCA9IHRydWU7XG4gICAgICAgICAgICBpZihpbnRlcnBvbGF0ZSkge1xuICAgICAgICAgICAgICAgIGNkaS5zID0gQkFETlVNO1xuICAgICAgICAgICAgICAgIGludGVycG9sYXRlR2FwcyA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNkaS5zID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNkaVt4QXR0cl0gPSBjZGlbeUF0dHJdID0gQkFETlVNO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaWRzKSB7XG4gICAgICAgICAgICBjZGkuaWQgPSBTdHJpbmcoaWRzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFycmF5c1RvQ2FsY2RhdGEoY2QsIHRyYWNlKTtcbiAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UpO1xuICAgIGNhbGNTZWxlY3Rpb24oY2QsIHRyYWNlKTtcblxuICAgIGlmKHN0YWNrR3JvdXBPcHRzKSB7XG4gICAgICAgIC8vIHJlbW92ZSBiYWQgcG9zaXRpb25zIGFuZCBzb3J0XG4gICAgICAgIC8vIG5vdGUgdGhhdCBvcmlnaW5hbCBpbmRpY2VzIGdldCBhZGRlZCB0byBjZCBpbiBhcnJheXNUb0NhbGNkYXRhXG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZShpIDwgY2QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZihjZFtpXVtwb3NBdHRyXSA9PT0gQkFETlVNKSB7XG4gICAgICAgICAgICAgICAgY2Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfSBlbHNlIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIExpYi5zb3J0KGNkLCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gKGFbcG9zQXR0cl0gLSBiW3Bvc0F0dHJdKSB8fCAoYS5pIC0gYi5pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoaW50ZXJwb2xhdGVHYXBzKSB7XG4gICAgICAgICAgICAvLyBmaXJzdCBmaWxsIHRoZSBiZWdpbm5pbmcgd2l0aCBjb25zdGFudCBmcm9tIHRoZSBmaXJzdCBwb2ludFxuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICB3aGlsZShpIDwgY2QubGVuZ3RoIC0gMSAmJiBjZFtpXS5nYXApIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWxpID0gY2RbaV0ucztcbiAgICAgICAgICAgIGlmKCF2YWxpKSB2YWxpID0gY2RbaV0ucyA9IDA7IC8vIGluIGNhc2Ugb2Ygbm8gZGF0YSBBVCBBTEwgaW4gdGhpcyB0cmFjZSAtIHVzZSAwXG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjZFtqXS5zID0gdmFsaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoZW4gZmlsbCB0aGUgZW5kIHdpdGggY29uc3RhbnQgZnJvbSB0aGUgbGFzdCBwb2ludFxuICAgICAgICAgICAgayA9IGNkLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB3aGlsZShrID4gaSAmJiBjZFtrXS5nYXApIHtcbiAgICAgICAgICAgICAgICBrLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWxpID0gY2Rba10ucztcbiAgICAgICAgICAgIGZvcihqID0gY2QubGVuZ3RoIC0gMTsgaiA+IGs7IGotLSkge1xuICAgICAgICAgICAgICAgIGNkW2pdLnMgPSB2YWxpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbm93IGludGVycG9sYXRlIGludGVybmFsIGdhcHMgbGluZWFybHlcbiAgICAgICAgICAgIHdoaWxlKGkgPCBrKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIGlmKGNkW2ldLmdhcCkge1xuICAgICAgICAgICAgICAgICAgICBqID0gaSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKGNkW2pdLmdhcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MwID0gY2RbaSAtIDFdW3Bvc0F0dHJdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2l6ZTAgPSBjZFtpIC0gMV0ucztcbiAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSAoY2Rbal0ucyAtIHNpemUwKSAvIChjZFtqXVtwb3NBdHRyXSAtIHBvczApO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZShpIDwgaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2RbaV0ucyA9IHNpemUwICsgKGNkW2ldW3Bvc0F0dHJdIC0gcG9zMCkgKiBtO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNkO1xufVxuXG5mdW5jdGlvbiBjYWxjQXhpc0V4cGFuc2lvbihnZCwgdHJhY2UsIHhhLCB5YSwgeCwgeSwgcHBhZCkge1xuICAgIHZhciBzZXJpZXNsZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIHhJZCA9IHhhLl9pZDtcbiAgICB2YXIgeUlkID0geWEuX2lkO1xuICAgIHZhciBmaXJzdFNjYXR0ZXIgPSBmdWxsTGF5b3V0Ll9maXJzdFNjYXR0ZXJbZmlyc3RTY2F0dGVyR3JvdXAodHJhY2UpXSA9PT0gdHJhY2UudWlkO1xuICAgIHZhciBzdGFja09yaWVudGF0aW9uID0gKGdldFN0YWNrT3B0cyh0cmFjZSwgZnVsbExheW91dCwgeGEsIHlhKSB8fCB7fSkub3JpZW50YXRpb247XG4gICAgdmFyIGZpbGwgPSB0cmFjZS5maWxsO1xuXG4gICAgLy8gY2FuY2VsIG1pbmltdW0gdGljayBzcGFjaW5ncyAob25seSBhcHBsaWVzIHRvIGJhcnMgYW5kIGJveGVzKVxuICAgIHhhLl9taW5EdGljayA9IDA7XG4gICAgeWEuX21pbkR0aWNrID0gMDtcblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgYm91bmRzIHNob3VsZCBiZSB0aWdodCwgcGFkZGVkLCBleHRlbmRlZCB0byB6ZXJvLi4uXG4gICAgLy8gbW9zdCBjYXNlcyBib3RoIHNob3VsZCBiZSBwYWRkZWQgb24gYm90aCBlbmRzLCBzbyBzdGFydCB3aXRoIHRoYXQuXG4gICAgdmFyIHhPcHRpb25zID0ge3BhZGRlZDogdHJ1ZX07XG4gICAgdmFyIHlPcHRpb25zID0ge3BhZGRlZDogdHJ1ZX07XG5cbiAgICBpZihwcGFkKSB7XG4gICAgICAgIHhPcHRpb25zLnBwYWQgPSB5T3B0aW9ucy5wcGFkID0gcHBhZDtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiB0ZXh0IHNpemVcblxuICAgIHZhciBvcGVuRW5kZWQgPSBzZXJpZXNsZW4gPCAyIHx8ICh4WzBdICE9PSB4W3Nlcmllc2xlbiAtIDFdKSB8fCAoeVswXSAhPT0geVtzZXJpZXNsZW4gLSAxXSk7XG5cbiAgICBpZihvcGVuRW5kZWQgJiYgKFxuICAgICAgICAoZmlsbCA9PT0gJ3RvemVyb3gnKSB8fFxuICAgICAgICAoKGZpbGwgPT09ICd0b25leHR4JykgJiYgKGZpcnN0U2NhdHRlciB8fCBzdGFja09yaWVudGF0aW9uID09PSAnaCcpKVxuICAgICkpIHtcbiAgICAgICAgLy8gaW5jbHVkZSB6ZXJvICh0aWdodCkgYW5kIGV4dHJlbWVzIChwYWRkZWQpIGlmIGZpbGwgdG8gemVyb1xuICAgICAgICAvLyAodW5sZXNzIHRoZSBzaGFwZSBpcyBjbG9zZWQsIHRoZW4gaXQncyBqdXN0IGZpbGxpbmcgdGhlIHNoYXBlIHJlZ2FyZGxlc3MpXG5cbiAgICAgICAgeE9wdGlvbnMudG96ZXJvID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYoISh0cmFjZS5lcnJvcl95IHx8IHt9KS52aXNpYmxlICYmIChcbiAgICAgICAgLy8gaWYgbm8gZXJyb3IgYmFycywgbWFya2VycyBvciB0ZXh0LCBvciBmaWxsIHRvIHk9MCByZW1vdmUgeCBwYWRkaW5nXG5cbiAgICAgICAgICAgIChmaWxsID09PSAndG9uZXh0eScgfHwgZmlsbCA9PT0gJ3RvemVyb3knKSB8fFxuICAgICAgICAgICAgKCFzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlKSAmJiAhc3ViVHlwZXMuaGFzVGV4dCh0cmFjZSkpXG4gICAgICAgICkpIHtcbiAgICAgICAgeE9wdGlvbnMucGFkZGVkID0gZmFsc2U7XG4gICAgICAgIHhPcHRpb25zLnBwYWQgPSAwO1xuICAgIH1cblxuICAgIGlmKG9wZW5FbmRlZCAmJiAoXG4gICAgICAgIChmaWxsID09PSAndG96ZXJveScpIHx8XG4gICAgICAgICgoZmlsbCA9PT0gJ3RvbmV4dHknKSAmJiAoZmlyc3RTY2F0dGVyIHx8IHN0YWNrT3JpZW50YXRpb24gPT09ICd2JykpXG4gICAgKSkge1xuICAgICAgICAvLyBub3cgY2hlY2sgZm9yIHkgLSByYXRoZXIgZGlmZmVyZW50IGxvZ2ljLCB0aG91Z2ggc3RpbGwgbW9zdGx5IHBhZGRlZCBib3RoIGVuZHNcbiAgICAgICAgLy8gaW5jbHVkZSB6ZXJvICh0aWdodCkgYW5kIGV4dHJlbWVzIChwYWRkZWQpIGlmIGZpbGwgdG8gemVyb1xuICAgICAgICAvLyAodW5sZXNzIHRoZSBzaGFwZSBpcyBjbG9zZWQsIHRoZW4gaXQncyBqdXN0IGZpbGxpbmcgdGhlIHNoYXBlIHJlZ2FyZGxlc3MpXG5cbiAgICAgICAgeU9wdGlvbnMudG96ZXJvID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYoZmlsbCA9PT0gJ3RvbmV4dHgnIHx8IGZpbGwgPT09ICd0b3plcm94Jykge1xuICAgICAgICAvLyB0aWdodCB5OiBhbnkgeCBmaWxsXG5cbiAgICAgICAgeU9wdGlvbnMucGFkZGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gTi5CLiBhc3ltbWV0cmljIHNwbG9tIHRyYWNlcyBjYWxsIHRoaXMgd2l0aCBibGFuayB7fSB4YSBvciB5YVxuICAgIGlmKHhJZCkgdHJhY2UuX2V4dHJlbWVzW3hJZF0gPSBBeGVzLmZpbmRFeHRyZW1lcyh4YSwgeCwgeE9wdGlvbnMpO1xuICAgIGlmKHlJZCkgdHJhY2UuX2V4dHJlbWVzW3lJZF0gPSBBeGVzLmZpbmRFeHRyZW1lcyh5YSwgeSwgeU9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBjYWxjTWFya2VyU2l6ZSh0cmFjZSwgc2VyaWVzbGVuKSB7XG4gICAgaWYoIXN1YlR5cGVzLmhhc01hcmtlcnModHJhY2UpKSByZXR1cm47XG5cbiAgICAvLyBUcmVhdCBzaXplIGxpa2UgeCBvciB5IGFycmF5cyAtLS0gUnVuIGQyY1xuICAgIC8vIHRoaXMgbmVlZHMgdG8gZ28gYmVmb3JlIHBwYWQgY29tcHV0YXRpb25cbiAgICB2YXIgbWFya2VyID0gdHJhY2UubWFya2VyO1xuICAgIHZhciBzaXplcmVmID0gMS42ICogKHRyYWNlLm1hcmtlci5zaXplcmVmIHx8IDEpO1xuICAgIHZhciBtYXJrZXJUcmFucztcblxuICAgIGlmKHRyYWNlLm1hcmtlci5zaXplbW9kZSA9PT0gJ2FyZWEnKSB7XG4gICAgICAgIG1hcmtlclRyYW5zID0gZnVuY3Rpb24odikge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGguc3FydCgodiB8fCAwKSAvIHNpemVyZWYpLCAzKTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtYXJrZXJUcmFucyA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgodiB8fCAwKSAvIHNpemVyZWYsIDMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KG1hcmtlci5zaXplKSkge1xuICAgICAgICAvLyBJIHRyaWVkIGF1dG8tdHlwZSBidXQgY2F0ZWdvcnkgYW5kIGRhdGVzIGRvbnQgbWFrZSBtdWNoIHNlbnNlLlxuICAgICAgICB2YXIgYXggPSB7dHlwZTogJ2xpbmVhcid9O1xuICAgICAgICBBeGVzLnNldENvbnZlcnQoYXgpO1xuXG4gICAgICAgIHZhciBzID0gYXgubWFrZUNhbGNkYXRhKHRyYWNlLm1hcmtlciwgJ3NpemUnKTtcblxuICAgICAgICB2YXIgc2l6ZU91dCA9IG5ldyBBcnJheShzZXJpZXNsZW4pO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VyaWVzbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHNpemVPdXRbaV0gPSBtYXJrZXJUcmFucyhzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2l6ZU91dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWFya2VyVHJhbnMobWFya2VyLnNpemUpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBtYXJrIHRoZSBmaXJzdCBzY2F0dGVyIHRyYWNlIGZvciBlYWNoIHN1YnBsb3RcbiAqIG5vdGUgdGhhdCBzY2F0dGVyIGFuZCBzY2F0dGVyZ2wgZWFjaCBnZXQgdGhlaXIgb3duIGZpcnN0IHRyYWNlXG4gKiBub3RlIGFsc28gdGhhdCBJJ20gZG9pbmcgdGhpcyBkdXJpbmcgY2FsYyByYXRoZXIgdGhhbiBzdXBwbHlEZWZhdWx0c1xuICogc28gSSBkb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IHRyYW5zZm9ybXMsIGJ1dCBpZiB3ZSBldmVyIGRvXG4gKiBwZXItdHJhY2UgY2FsYyB0aGlzIHdpbGwgZ2V0IGNvbmZ1c2VkLlxuICovXG5mdW5jdGlvbiBzZXRGaXJzdFNjYXR0ZXIoZnVsbExheW91dCwgdHJhY2UpIHtcbiAgICB2YXIgZ3JvdXAgPSBmaXJzdFNjYXR0ZXJHcm91cCh0cmFjZSk7XG4gICAgdmFyIGZpcnN0U2NhdHRlciA9IGZ1bGxMYXlvdXQuX2ZpcnN0U2NhdHRlcjtcbiAgICBpZighZmlyc3RTY2F0dGVyW2dyb3VwXSkgZmlyc3RTY2F0dGVyW2dyb3VwXSA9IHRyYWNlLnVpZDtcbn1cblxuZnVuY3Rpb24gZmlyc3RTY2F0dGVyR3JvdXAodHJhY2UpIHtcbiAgICB2YXIgc3RhY2tHcm91cCA9IHRyYWNlLnN0YWNrZ3JvdXA7XG4gICAgcmV0dXJuIHRyYWNlLnhheGlzICsgdHJhY2UueWF4aXMgKyB0cmFjZS50eXBlICtcbiAgICAgICAgKHN0YWNrR3JvdXAgPyAnLScgKyBzdGFja0dyb3VwIDogJycpO1xufVxuXG5mdW5jdGlvbiBnZXRTdGFja09wdHModHJhY2UsIGZ1bGxMYXlvdXQsIHhhLCB5YSkge1xuICAgIHZhciBzdGFja0dyb3VwID0gdHJhY2Uuc3RhY2tncm91cDtcbiAgICBpZighc3RhY2tHcm91cCkgcmV0dXJuO1xuICAgIHZhciBzdGFja09wdHMgPSBmdWxsTGF5b3V0Ll9zY2F0dGVyU3RhY2tPcHRzW3hhLl9pZCArIHlhLl9pZF1bc3RhY2tHcm91cF07XG4gICAgdmFyIHN0YWNrQXggPSBzdGFja09wdHMub3JpZW50YXRpb24gPT09ICd2JyA/IHlhIDogeGE7XG4gICAgLy8gQWxsb3cgc3RhY2tpbmcgb25seSBvbiBudW1lcmljIGF4ZXNcbiAgICAvLyBjYWxjIGlzIGEgbGl0dGxlIGxhdGUgdG8gYmUgZmlndXJpbmcgdGhpcyBvdXQsIGJ1dCBkdXJpbmcgc3VwcGx5RGVmYXVsdHNcbiAgICAvLyB3ZSBkb24ndCBrbm93IHRoZSBheGlzIHR5cGUgeWV0XG4gICAgaWYoc3RhY2tBeC50eXBlID09PSAnbGluZWFyJyB8fCBzdGFja0F4LnR5cGUgPT09ICdsb2cnKSByZXR1cm4gc3RhY2tPcHRzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjYWxjOiBjYWxjLFxuICAgIGNhbGNNYXJrZXJTaXplOiBjYWxjTWFya2VyU2l6ZSxcbiAgICBjYWxjQXhpc0V4cGFuc2lvbjogY2FsY0F4aXNFeHBhbnNpb24sXG4gICAgc2V0Rmlyc3RTY2F0dGVyOiBzZXRGaXJzdFNjYXR0ZXIsXG4gICAgZ2V0U3RhY2tPcHRzOiBnZXRTdGFja09wdHNcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjU2VsZWN0aW9uKGNkLCB0cmFjZSkge1xuICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlLnNlbGVjdGVkcG9pbnRzKSkge1xuICAgICAgICBMaWIudGFnU2VsZWN0ZWQoY2QsIHRyYWNlKTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjYWxjQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9jYWxjJyk7XG5cbnZhciBzdWJUeXBlcyA9IHJlcXVpcmUoJy4vc3VidHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjTWFya2VyQ29sb3JzY2FsZShnZCwgdHJhY2UpIHtcbiAgICBpZihzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZSkgJiYgaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ2xpbmUnKSkge1xuICAgICAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgIHZhbHM6IHRyYWNlLmxpbmUuY29sb3IsXG4gICAgICAgICAgICBjb250YWluZXJTdHI6ICdsaW5lJyxcbiAgICAgICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlKSkge1xuICAgICAgICBpZihoYXNDb2xvcnNjYWxlKHRyYWNlLCAnbWFya2VyJykpIHtcbiAgICAgICAgICAgIGNhbGNDb2xvcnNjYWxlKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgICAgIHZhbHM6IHRyYWNlLm1hcmtlci5jb2xvcixcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHI6ICdtYXJrZXInLFxuICAgICAgICAgICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ21hcmtlci5saW5lJykpIHtcbiAgICAgICAgICAgIGNhbGNDb2xvcnNjYWxlKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgICAgIHZhbHM6IHRyYWNlLm1hcmtlci5saW5lLmNvbG9yLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclN0cjogJ21hcmtlci5saW5lJyxcbiAgICAgICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgc3VidHlwZXMgPSByZXF1aXJlKCcuL3N1YnR5cGVzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRUcmFjZUNvbG9yKHRyYWNlLCBkaSkge1xuICAgIHZhciBsYywgdGM7XG5cbiAgICAvLyBUT0RPOiB0ZXh0IG1vZGVzXG5cbiAgICBpZih0cmFjZS5tb2RlID09PSAnbGluZXMnKSB7XG4gICAgICAgIGxjID0gdHJhY2UubGluZS5jb2xvcjtcbiAgICAgICAgcmV0dXJuIChsYyAmJiBDb2xvci5vcGFjaXR5KGxjKSkgP1xuICAgICAgICAgICAgbGMgOiB0cmFjZS5maWxsY29sb3I7XG4gICAgfSBlbHNlIGlmKHRyYWNlLm1vZGUgPT09ICdub25lJykge1xuICAgICAgICByZXR1cm4gdHJhY2UuZmlsbCA/IHRyYWNlLmZpbGxjb2xvciA6ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtYyA9IGRpLm1jYyB8fCAodHJhY2UubWFya2VyIHx8IHt9KS5jb2xvcjtcbiAgICAgICAgdmFyIG1sYyA9IGRpLm1sY2MgfHwgKCh0cmFjZS5tYXJrZXIgfHwge30pLmxpbmUgfHwge30pLmNvbG9yO1xuXG4gICAgICAgIHRjID0gKG1jICYmIENvbG9yLm9wYWNpdHkobWMpKSA/IG1jIDpcbiAgICAgICAgICAgIChtbGMgJiYgQ29sb3Iub3BhY2l0eShtbGMpICYmXG4gICAgICAgICAgICAgICAgKGRpLm1sdyB8fCAoKHRyYWNlLm1hcmtlciB8fCB7fSkubGluZSB8fCB7fSkud2lkdGgpKSA/IG1sYyA6ICcnO1xuXG4gICAgICAgIGlmKHRjKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHBvaW50cyBhcmVuJ3QgVE9PIHRyYW5zcGFyZW50XG4gICAgICAgICAgICBpZihDb2xvci5vcGFjaXR5KHRjKSA8IDAuMykge1xuICAgICAgICAgICAgICAgIHJldHVybiBDb2xvci5hZGRPcGFjaXR5KHRjLCAwLjMpO1xuICAgICAgICAgICAgfSBlbHNlIHJldHVybiB0YztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxjID0gKHRyYWNlLmxpbmUgfHwge30pLmNvbG9yO1xuICAgICAgICAgICAgcmV0dXJuIChsYyAmJiBDb2xvci5vcGFjaXR5KGxjKSAmJlxuICAgICAgICAgICAgICAgIHN1YnR5cGVzLmhhc0xpbmVzKHRyYWNlKSAmJiB0cmFjZS5saW5lLndpZHRoKSA/XG4gICAgICAgICAgICAgICAgICAgIGxjIDogdHJhY2UuZmlsbGNvbG9yO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb250YWluZXI6ICdtYXJrZXInLFxuICAgIG1pbjogJ2NtaW4nLFxuICAgIG1heDogJ2NtYXgnXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcblxudmFyIHN1YlR5cGVzID0gcmVxdWlyZSgnLi9zdWJ0eXBlcycpO1xuXG4vKlxuICogb3B0czogb2JqZWN0IG9mIGZsYWdzIHRvIGNvbnRyb2wgZmVhdHVyZXMgbm90IGFsbCBtYXJrZXIgdXNlcnMgc3VwcG9ydFxuICogICBub0xpbmU6IGNhbGxlciBkb2VzIG5vdCBzdXBwb3J0IG1hcmtlciBsaW5lc1xuICogICBncmFkaWVudDogY2FsbGVyIHN1cHBvcnRzIGdyYWRpZW50c1xuICogICBub1NlbGVjdDogY2FsbGVyIGRvZXMgbm90IHN1cHBvcnQgc2VsZWN0ZWQvdW5zZWxlY3RlZCBhdHRyaWJ1dGUgY29udGFpbmVyc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hcmtlckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlLCBvcHRzKSB7XG4gICAgdmFyIGlzQnViYmxlID0gc3ViVHlwZXMuaXNCdWJibGUodHJhY2VJbik7XG4gICAgdmFyIGxpbmVDb2xvciA9ICh0cmFjZUluLmxpbmUgfHwge30pLmNvbG9yO1xuICAgIHZhciBkZWZhdWx0TUxDO1xuXG4gICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICAvLyBtYXJrZXIuY29sb3IgaW5oZXJpdCBmcm9tIGxpbmUuY29sb3IgKGV2ZW4gaWYgbGluZS5jb2xvciBpcyBhbiBhcnJheSlcbiAgICBpZihsaW5lQ29sb3IpIGRlZmF1bHRDb2xvciA9IGxpbmVDb2xvcjtcblxuICAgIGNvZXJjZSgnbWFya2VyLnN5bWJvbCcpO1xuICAgIGNvZXJjZSgnbWFya2VyLm9wYWNpdHknLCBpc0J1YmJsZSA/IDAuNyA6IDEpO1xuICAgIGNvZXJjZSgnbWFya2VyLnNpemUnKTtcblxuICAgIGNvZXJjZSgnbWFya2VyLmNvbG9yJywgZGVmYXVsdENvbG9yKTtcbiAgICBpZihoYXNDb2xvcnNjYWxlKHRyYWNlSW4sICdtYXJrZXInKSkge1xuICAgICAgICBjb2xvcnNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnbWFya2VyLicsIGNMZXR0ZXI6ICdjJ30pO1xuICAgIH1cblxuICAgIGlmKCFvcHRzLm5vU2VsZWN0KSB7XG4gICAgICAgIGNvZXJjZSgnc2VsZWN0ZWQubWFya2VyLmNvbG9yJyk7XG4gICAgICAgIGNvZXJjZSgndW5zZWxlY3RlZC5tYXJrZXIuY29sb3InKTtcbiAgICAgICAgY29lcmNlKCdzZWxlY3RlZC5tYXJrZXIuc2l6ZScpO1xuICAgICAgICBjb2VyY2UoJ3Vuc2VsZWN0ZWQubWFya2VyLnNpemUnKTtcbiAgICB9XG5cbiAgICBpZighb3B0cy5ub0xpbmUpIHtcbiAgICAgICAgLy8gaWYgdGhlcmUncyBhIGxpbmUgd2l0aCBhIGRpZmZlcmVudCBjb2xvciB0aGFuIHRoZSBtYXJrZXIsIHVzZVxuICAgICAgICAvLyB0aGF0IGxpbmUgY29sb3IgYXMgdGhlIGRlZmF1bHQgbWFya2VyIGxpbmUgY29sb3JcbiAgICAgICAgLy8gKGV4Y2VwdCB3aGVuIGl0J3MgYW4gYXJyYXkpXG4gICAgICAgIC8vIG1vc3RseSB0aGlzIGlzIGZvciB0cmFuc3BhcmVudCBtYXJrZXJzIHRvIGJlaGF2ZSBuaWNlbHlcbiAgICAgICAgaWYobGluZUNvbG9yICYmICFBcnJheS5pc0FycmF5KGxpbmVDb2xvcikgJiYgKHRyYWNlT3V0Lm1hcmtlci5jb2xvciAhPT0gbGluZUNvbG9yKSkge1xuICAgICAgICAgICAgZGVmYXVsdE1MQyA9IGxpbmVDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmKGlzQnViYmxlKSBkZWZhdWx0TUxDID0gQ29sb3IuYmFja2dyb3VuZDtcbiAgICAgICAgZWxzZSBkZWZhdWx0TUxDID0gQ29sb3IuZGVmYXVsdExpbmU7XG5cbiAgICAgICAgY29lcmNlKCdtYXJrZXIubGluZS5jb2xvcicsIGRlZmF1bHRNTEMpO1xuICAgICAgICBpZihoYXNDb2xvcnNjYWxlKHRyYWNlSW4sICdtYXJrZXIubGluZScpKSB7XG4gICAgICAgICAgICBjb2xvcnNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnbWFya2VyLmxpbmUuJywgY0xldHRlcjogJ2MnfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb2VyY2UoJ21hcmtlci5saW5lLndpZHRoJywgaXNCdWJibGUgPyAxIDogMCk7XG4gICAgfVxuXG4gICAgaWYoaXNCdWJibGUpIHtcbiAgICAgICAgY29lcmNlKCdtYXJrZXIuc2l6ZXJlZicpO1xuICAgICAgICBjb2VyY2UoJ21hcmtlci5zaXplbWluJyk7XG4gICAgICAgIGNvZXJjZSgnbWFya2VyLnNpemVtb2RlJyk7XG4gICAgfVxuXG4gICAgaWYob3B0cy5ncmFkaWVudCkge1xuICAgICAgICB2YXIgZ3JhZGllbnRUeXBlID0gY29lcmNlKCdtYXJrZXIuZ3JhZGllbnQudHlwZScpO1xuICAgICAgICBpZihncmFkaWVudFR5cGUgIT09ICdub25lJykge1xuICAgICAgICAgICAgY29lcmNlKCdtYXJrZXIuZ3JhZGllbnQuY29sb3InKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9