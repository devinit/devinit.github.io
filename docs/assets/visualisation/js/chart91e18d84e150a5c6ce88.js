(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_scatter_index_js"],{

/***/ "./node_modules/plotly.js/src/traces/scatter/cross_trace_calc.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/cross_trace_calc.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var calc = __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/scatter/calc.js");

/*
 * Scatter stacking & normalization calculations
 * runs per subplot, and can handle multiple stacking groups
 */

module.exports = function crossTraceCalc(gd, plotinfo) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;
    var subplot = xa._id + ya._id;

    var subplotStackOpts = gd._fullLayout._scatterStackOpts[subplot];
    if(!subplotStackOpts) return;

    var calcTraces = gd.calcdata;

    var i, j, k, i2, cd, cd0, posj, sumj, norm;
    var groupOpts, interpolate, groupnorm, posAttr, valAttr;
    var hasAnyBlanks;

    for(var stackGroup in subplotStackOpts) {
        groupOpts = subplotStackOpts[stackGroup];
        var indices = groupOpts.traceIndices;

        // can get here with no indices if the stack axis is non-numeric
        if(!indices.length) continue;

        interpolate = groupOpts.stackgaps === 'interpolate';
        groupnorm = groupOpts.groupnorm;
        if(groupOpts.orientation === 'v') {
            posAttr = 'x';
            valAttr = 'y';
        } else {
            posAttr = 'y';
            valAttr = 'x';
        }
        hasAnyBlanks = new Array(indices.length);
        for(i = 0; i < hasAnyBlanks.length; i++) {
            hasAnyBlanks[i] = false;
        }

        // Collect the complete set of all positions across ALL traces.
        // Start with the first trace, then interleave items from later traces
        // as needed.
        // Fill in mising items as we go.
        cd0 = calcTraces[indices[0]];
        var allPositions = new Array(cd0.length);
        for(i = 0; i < cd0.length; i++) {
            allPositions[i] = cd0[i][posAttr];
        }

        for(i = 1; i < indices.length; i++) {
            cd = calcTraces[indices[i]];

            for(j = k = 0; j < cd.length; j++) {
                posj = cd[j][posAttr];
                for(; posj > allPositions[k] && k < allPositions.length; k++) {
                    // the current trace is missing a position from some previous trace(s)
                    insertBlank(cd, j, allPositions[k], i, hasAnyBlanks, interpolate, posAttr);
                    j++;
                }
                if(posj !== allPositions[k]) {
                    // previous trace(s) are missing a position from the current trace
                    for(i2 = 0; i2 < i; i2++) {
                        insertBlank(calcTraces[indices[i2]], k, posj, i2, hasAnyBlanks, interpolate, posAttr);
                    }
                    allPositions.splice(k, 0, posj);
                }
                k++;
            }
            for(; k < allPositions.length; k++) {
                insertBlank(cd, j, allPositions[k], i, hasAnyBlanks, interpolate, posAttr);
                j++;
            }
        }

        var serieslen = allPositions.length;

        // stack (and normalize)!
        for(j = 0; j < cd0.length; j++) {
            sumj = cd0[j][valAttr] = cd0[j].s;
            for(i = 1; i < indices.length; i++) {
                cd = calcTraces[indices[i]];
                cd[0].trace._rawLength = cd[0].trace._length;
                cd[0].trace._length = serieslen;
                sumj += cd[j].s;
                cd[j][valAttr] = sumj;
            }

            if(groupnorm) {
                norm = ((groupnorm === 'fraction') ? sumj : (sumj / 100)) || 1;
                for(i = 0; i < indices.length; i++) {
                    var cdj = calcTraces[indices[i]][j];
                    cdj[valAttr] /= norm;
                    cdj.sNorm = cdj.s / norm;
                }
            }
        }

        // autorange
        for(i = 0; i < indices.length; i++) {
            cd = calcTraces[indices[i]];
            var trace = cd[0].trace;
            var ppad = calc.calcMarkerSize(trace, trace._rawLength);
            var arrayPad = Array.isArray(ppad);
            if((ppad && hasAnyBlanks[i]) || arrayPad) {
                var ppadRaw = ppad;
                ppad = new Array(serieslen);
                for(j = 0; j < serieslen; j++) {
                    ppad[j] = cd[j].gap ? 0 : (arrayPad ? ppadRaw[cd[j].i] : ppadRaw);
                }
            }
            var x = new Array(serieslen);
            var y = new Array(serieslen);
            for(j = 0; j < serieslen; j++) {
                x[j] = cd[j].x;
                y[j] = cd[j].y;
            }
            calc.calcAxisExpansion(gd, trace, xa, ya, x, y, ppad);

            // while we're here (in a loop over all traces in the stack)
            // record the orientation, so hover can find it easily
            cd[0].t.orientation = groupOpts.orientation;
        }
    }
};

function insertBlank(calcTrace, index, position, traceIndex, hasAnyBlanks, interpolate, posAttr) {
    hasAnyBlanks[traceIndex] = true;
    var newEntry = {
        i: null,
        gap: true,
        s: 0
    };
    newEntry[posAttr] = position;
    calcTrace.splice(index, 0, newEntry);
    // Even if we're not interpolating, if one trace has multiple
    // values at the same position and this trace only has one value there,
    // we just duplicate that one value rather than insert a zero.
    // We also make it look like a real point - because it's ambiguous which
    // one really is the real one!
    if(index && position === calcTrace[index - 1][posAttr]) {
        var prevEntry = calcTrace[index - 1];
        newEntry.s = prevEntry.s;
        // TODO is it going to cause any problems to have multiple
        // calcdata points with the same index?
        newEntry.i = prevEntry.i;
        newEntry.gap = prevEntry.gap;
    } else if(interpolate) {
        newEntry.s = getInterp(calcTrace, index, position, posAttr);
    }
    if(!index) {
        // t and trace need to stay on the first cd entry
        calcTrace[0].t = calcTrace[1].t;
        calcTrace[0].trace = calcTrace[1].trace;
        delete calcTrace[1].t;
        delete calcTrace[1].trace;
    }
}

function getInterp(calcTrace, index, position, posAttr) {
    var pt0 = calcTrace[index - 1];
    var pt1 = calcTrace[index + 1];
    if(!pt1) return pt0.s;
    if(!pt0) return pt1.s;
    return pt0.s + (pt1.s - pt0.s) * (position - pt0[posAttr]) / (pt1[posAttr] - pt0[posAttr]);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/cross_trace_defaults.js":
/*!***************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/cross_trace_defaults.js ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/





// remove opacity for any trace that has a fill or is filled to
module.exports = function crossTraceDefaults(fullData) {
    for(var i = 0; i < fullData.length; i++) {
        var tracei = fullData[i];
        if(tracei.type !== 'scatter') continue;

        var filli = tracei.fill;
        if(filli === 'none' || filli === 'toself') continue;

        tracei.opacity = undefined;

        if(filli === 'tonexty' || filli === 'tonextx') {
            for(var j = i - 1; j >= 0; j--) {
                var tracej = fullData[j];

                if((tracej.type === 'scatter') &&
                        (tracej.xaxis === tracei.xaxis) &&
                        (tracej.yaxis === tracei.yaxis)) {
                    tracej.opacity = undefined;
                    break;
                }
            }
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/defaults.js ***!
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
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/scatter/constants.js");
var subTypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var handleXYDefaults = __webpack_require__(/*! ./xy_defaults */ "./node_modules/plotly.js/src/traces/scatter/xy_defaults.js");
var handleStackDefaults = __webpack_require__(/*! ./stack_defaults */ "./node_modules/plotly.js/src/traces/scatter/stack_defaults.js");
var handleMarkerDefaults = __webpack_require__(/*! ./marker_defaults */ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js");
var handleLineDefaults = __webpack_require__(/*! ./line_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js");
var handleLineShapeDefaults = __webpack_require__(/*! ./line_shape_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_shape_defaults.js");
var handleTextDefaults = __webpack_require__(/*! ./text_defaults */ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js");
var handleFillColorDefaults = __webpack_require__(/*! ./fillcolor_defaults */ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleXYDefaults(traceIn, traceOut, layout, coerce);
    if(!len) traceOut.visible = false;

    if(!traceOut.visible) return;

    var stackGroupOpts = handleStackDefaults(traceIn, traceOut, layout, coerce);

    var defaultMode = !stackGroupOpts && (len < constants.PTS_LINESONLY) ?
        'lines+markers' : 'lines';
    coerce('text');
    coerce('hovertext');
    coerce('mode', defaultMode);

    if(subTypes.hasLines(traceOut)) {
        handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);
        handleLineShapeDefaults(traceIn, traceOut, coerce);
        coerce('connectgaps');
        coerce('line.simplify');
    }

    if(subTypes.hasMarkers(traceOut)) {
        handleMarkerDefaults(traceIn, traceOut, defaultColor, layout, coerce, {gradient: true});
    }

    if(subTypes.hasText(traceOut)) {
        coerce('texttemplate');
        handleTextDefaults(traceIn, traceOut, layout, coerce);
    }

    var dfltHoverOn = [];

    if(subTypes.hasMarkers(traceOut) || subTypes.hasText(traceOut)) {
        coerce('cliponaxis');
        coerce('marker.maxdisplayed');
        dfltHoverOn.push('points');
    }

    // It's possible for this default to be changed by a later trace.
    // We handle that case in some hacky code inside handleStackDefaults.
    coerce('fill', stackGroupOpts ? stackGroupOpts.fillDflt : 'none');
    if(traceOut.fill !== 'none') {
        handleFillColorDefaults(traceIn, traceOut, defaultColor, coerce);
        if(!subTypes.hasLines(traceOut)) handleLineShapeDefaults(traceIn, traceOut, coerce);
    }

    var lineColor = (traceOut.line || {}).color;
    var markerColor = (traceOut.marker || {}).color;

    if(traceOut.fill === 'tonext' || traceOut.fill === 'toself') {
        dfltHoverOn.push('fills');
    }
    coerce('hoveron', dfltHoverOn.join('+') || 'points');
    if(traceOut.hoveron !== 'fills') coerce('hovertemplate');
    var errorBarsSupplyDefaults = Registry.getComponentMethod('errorbars', 'supplyDefaults');
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || markerColor || defaultColor, {axis: 'y'});
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || markerColor || defaultColor, {axis: 'x', inherit: 'y'});

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/format_labels.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/format_labels.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

module.exports = function formatLabels(cdi, trace, fullLayout) {
    var labels = {};

    var mockGd = {_fullLayout: fullLayout};
    var xa = Axes.getFromTrace(mockGd, trace, 'x');
    var ya = Axes.getFromTrace(mockGd, trace, 'y');

    labels.xLabel = Axes.tickText(xa, cdi.x, true).text;
    labels.yLabel = Axes.tickText(ya, cdi.y, true).text;

    return labels;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/index.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/index.js ***!
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



var subtypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");

module.exports = {
    hasLines: subtypes.hasLines,
    hasMarkers: subtypes.hasMarkers,
    hasText: subtypes.hasText,
    isBubble: subtypes.isBubble,

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/scatter/defaults.js"),
    crossTraceDefaults: __webpack_require__(/*! ./cross_trace_defaults */ "./node_modules/plotly.js/src/traces/scatter/cross_trace_defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/scatter/calc.js").calc,
    crossTraceCalc: __webpack_require__(/*! ./cross_trace_calc */ "./node_modules/plotly.js/src/traces/scatter/cross_trace_calc.js"),
    arraysToCalcdata: __webpack_require__(/*! ./arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/scatter/plot.js"),
    colorbar: __webpack_require__(/*! ./marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    formatLabels: __webpack_require__(/*! ./format_labels */ "./node_modules/plotly.js/src/traces/scatter/format_labels.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/scatter/style.js").style,
    styleOnSelect: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/scatter/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/scatter/hover.js"),
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/scatter/select.js"),
    animatable: true,

    moduleType: 'trace',
    name: 'scatter',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: [
        'cartesian', 'svg', 'symbols', 'errorBarsOK', 'showLegend', 'scatter-like',
        'zoomScale'
    ],
    meta: {
        description: [
            'The scatter trace type encompasses line charts, scatter charts, text charts, and bubble charts.',
            'The data visualized as scatter point or lines is set in `x` and `y`.',
            'Text (appearing either on the chart or on hover only) is via `text`.',
            'Bubble charts are achieved by setting `marker.size` and/or `marker.color`',
            'to numerical arrays.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/stack_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/stack_defaults.js ***!
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



var perStackAttrs = ['orientation', 'groupnorm', 'stackgaps'];

module.exports = function handleStackDefaults(traceIn, traceOut, layout, coerce) {
    var stackOpts = layout._scatterStackOpts;

    var stackGroup = coerce('stackgroup');
    if(stackGroup) {
        // use independent stacking options per subplot
        var subplot = traceOut.xaxis + traceOut.yaxis;
        var subplotStackOpts = stackOpts[subplot];
        if(!subplotStackOpts) subplotStackOpts = stackOpts[subplot] = {};

        var groupOpts = subplotStackOpts[stackGroup];
        var firstTrace = false;
        if(groupOpts) {
            groupOpts.traces.push(traceOut);
        } else {
            groupOpts = subplotStackOpts[stackGroup] = {
                // keep track of trace indices for use during stacking calculations
                // this will be filled in during `calc` and used during `crossTraceCalc`
                // so it's OK if we don't recreate it during a non-calc edit
                traceIndices: [],
                // Hold on to the whole set of prior traces
                // First one is most important, so we can clear defaults
                // there if we find explicit values only in later traces.
                // We're only going to *use* the values stored in groupOpts,
                // but for the editor and validate we want things self-consistent
                // The full set of traces is used only to fix `fill` default if
                // we find `orientation: 'h'` beyond the first trace
                traces: [traceOut]
            };
            firstTrace = true;
        }
        // TODO: how is this going to work with groupby transforms?
        // in principle it should be OK I guess, as long as explicit group styles
        // don't override explicit base-trace styles?

        var dflts = {
            orientation: (traceOut.x && !traceOut.y) ? 'h' : 'v'
        };

        for(var i = 0; i < perStackAttrs.length; i++) {
            var attr = perStackAttrs[i];
            var attrFound = attr + 'Found';
            if(!groupOpts[attrFound]) {
                var traceHasAttr = traceIn[attr] !== undefined;
                var isOrientation = attr === 'orientation';
                if(traceHasAttr || firstTrace) {
                    groupOpts[attr] = coerce(attr, dflts[attr]);

                    if(isOrientation) {
                        groupOpts.fillDflt = groupOpts[attr] === 'h' ?
                            'tonextx' : 'tonexty';
                    }

                    if(traceHasAttr) {
                        // Note: this will show a value here even if it's invalid
                        // in which case it will revert to default.
                        groupOpts[attrFound] = true;

                        // Note: only one trace in the stack will get a _fullData
                        // entry for a given stack-wide attribute. If no traces
                        // (or the first trace) specify that attribute, the
                        // first trace will get it. If the first trace does NOT
                        // specify it but some later trace does, then it gets
                        // removed from the first trace and only included in the
                        // one that specified it. This is mostly important for
                        // editors (that want to see the full values to know
                        // what settings are available) and Plotly.react diffing.
                        // Editors may want to use fullLayout._scatterStackOpts
                        // directly and make these settings available from all
                        // traces in the stack... then set the new value into
                        // the first trace, and clear all later traces.
                        if(!firstTrace) {
                            delete groupOpts.traces[0][attr];

                            // orientation can affect default fill of previous traces
                            if(isOrientation) {
                                for(var j = 0; j < groupOpts.traces.length - 1; j++) {
                                    var trace2 = groupOpts.traces[j];
                                    if(trace2._input.fill !== trace2.fill) {
                                        trace2.fill = groupOpts.fillDflt;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return groupOpts;
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvY3Jvc3NfdHJhY2VfY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvY3Jvc3NfdHJhY2VfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9mb3JtYXRfbGFiZWxzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvc3RhY2tfZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyxtRUFBUTs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix5QkFBeUI7QUFDM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7O0FBRUEsa0JBQWtCLG9CQUFvQjtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOENBQThDLGlDQUFpQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0OTFlMThkODRlMTUwYTVjNmNlODguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGMgPSByZXF1aXJlKCcuL2NhbGMnKTtcblxuLypcbiAqIFNjYXR0ZXIgc3RhY2tpbmcgJiBub3JtYWxpemF0aW9uIGNhbGN1bGF0aW9uc1xuICogcnVucyBwZXIgc3VicGxvdCwgYW5kIGNhbiBoYW5kbGUgbXVsdGlwbGUgc3RhY2tpbmcgZ3JvdXBzXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcm9zc1RyYWNlQ2FsYyhnZCwgcGxvdGluZm8pIHtcbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcbiAgICB2YXIgc3VicGxvdCA9IHhhLl9pZCArIHlhLl9pZDtcblxuICAgIHZhciBzdWJwbG90U3RhY2tPcHRzID0gZ2QuX2Z1bGxMYXlvdXQuX3NjYXR0ZXJTdGFja09wdHNbc3VicGxvdF07XG4gICAgaWYoIXN1YnBsb3RTdGFja09wdHMpIHJldHVybjtcblxuICAgIHZhciBjYWxjVHJhY2VzID0gZ2QuY2FsY2RhdGE7XG5cbiAgICB2YXIgaSwgaiwgaywgaTIsIGNkLCBjZDAsIHBvc2osIHN1bWosIG5vcm07XG4gICAgdmFyIGdyb3VwT3B0cywgaW50ZXJwb2xhdGUsIGdyb3Vwbm9ybSwgcG9zQXR0ciwgdmFsQXR0cjtcbiAgICB2YXIgaGFzQW55QmxhbmtzO1xuXG4gICAgZm9yKHZhciBzdGFja0dyb3VwIGluIHN1YnBsb3RTdGFja09wdHMpIHtcbiAgICAgICAgZ3JvdXBPcHRzID0gc3VicGxvdFN0YWNrT3B0c1tzdGFja0dyb3VwXTtcbiAgICAgICAgdmFyIGluZGljZXMgPSBncm91cE9wdHMudHJhY2VJbmRpY2VzO1xuXG4gICAgICAgIC8vIGNhbiBnZXQgaGVyZSB3aXRoIG5vIGluZGljZXMgaWYgdGhlIHN0YWNrIGF4aXMgaXMgbm9uLW51bWVyaWNcbiAgICAgICAgaWYoIWluZGljZXMubGVuZ3RoKSBjb250aW51ZTtcblxuICAgICAgICBpbnRlcnBvbGF0ZSA9IGdyb3VwT3B0cy5zdGFja2dhcHMgPT09ICdpbnRlcnBvbGF0ZSc7XG4gICAgICAgIGdyb3Vwbm9ybSA9IGdyb3VwT3B0cy5ncm91cG5vcm07XG4gICAgICAgIGlmKGdyb3VwT3B0cy5vcmllbnRhdGlvbiA9PT0gJ3YnKSB7XG4gICAgICAgICAgICBwb3NBdHRyID0gJ3gnO1xuICAgICAgICAgICAgdmFsQXR0ciA9ICd5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc0F0dHIgPSAneSc7XG4gICAgICAgICAgICB2YWxBdHRyID0gJ3gnO1xuICAgICAgICB9XG4gICAgICAgIGhhc0FueUJsYW5rcyA9IG5ldyBBcnJheShpbmRpY2VzLmxlbmd0aCk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGhhc0FueUJsYW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaGFzQW55QmxhbmtzW2ldID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb2xsZWN0IHRoZSBjb21wbGV0ZSBzZXQgb2YgYWxsIHBvc2l0aW9ucyBhY3Jvc3MgQUxMIHRyYWNlcy5cbiAgICAgICAgLy8gU3RhcnQgd2l0aCB0aGUgZmlyc3QgdHJhY2UsIHRoZW4gaW50ZXJsZWF2ZSBpdGVtcyBmcm9tIGxhdGVyIHRyYWNlc1xuICAgICAgICAvLyBhcyBuZWVkZWQuXG4gICAgICAgIC8vIEZpbGwgaW4gbWlzaW5nIGl0ZW1zIGFzIHdlIGdvLlxuICAgICAgICBjZDAgPSBjYWxjVHJhY2VzW2luZGljZXNbMF1dO1xuICAgICAgICB2YXIgYWxsUG9zaXRpb25zID0gbmV3IEFycmF5KGNkMC5sZW5ndGgpO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjZDAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFsbFBvc2l0aW9uc1tpXSA9IGNkMFtpXVtwb3NBdHRyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpID0gMTsgaSA8IGluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNkID0gY2FsY1RyYWNlc1tpbmRpY2VzW2ldXTtcblxuICAgICAgICAgICAgZm9yKGogPSBrID0gMDsgaiA8IGNkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcG9zaiA9IGNkW2pdW3Bvc0F0dHJdO1xuICAgICAgICAgICAgICAgIGZvcig7IHBvc2ogPiBhbGxQb3NpdGlvbnNba10gJiYgayA8IGFsbFBvc2l0aW9ucy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCB0cmFjZSBpcyBtaXNzaW5nIGEgcG9zaXRpb24gZnJvbSBzb21lIHByZXZpb3VzIHRyYWNlKHMpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydEJsYW5rKGNkLCBqLCBhbGxQb3NpdGlvbnNba10sIGksIGhhc0FueUJsYW5rcywgaW50ZXJwb2xhdGUsIHBvc0F0dHIpO1xuICAgICAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHBvc2ogIT09IGFsbFBvc2l0aW9uc1trXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcmV2aW91cyB0cmFjZShzKSBhcmUgbWlzc2luZyBhIHBvc2l0aW9uIGZyb20gdGhlIGN1cnJlbnQgdHJhY2VcbiAgICAgICAgICAgICAgICAgICAgZm9yKGkyID0gMDsgaTIgPCBpOyBpMisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRCbGFuayhjYWxjVHJhY2VzW2luZGljZXNbaTJdXSwgaywgcG9zaiwgaTIsIGhhc0FueUJsYW5rcywgaW50ZXJwb2xhdGUsIHBvc0F0dHIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFsbFBvc2l0aW9ucy5zcGxpY2UoaywgMCwgcG9zaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGsrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcig7IGsgPCBhbGxQb3NpdGlvbnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRCbGFuayhjZCwgaiwgYWxsUG9zaXRpb25zW2tdLCBpLCBoYXNBbnlCbGFua3MsIGludGVycG9sYXRlLCBwb3NBdHRyKTtcbiAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VyaWVzbGVuID0gYWxsUG9zaXRpb25zLmxlbmd0aDtcblxuICAgICAgICAvLyBzdGFjayAoYW5kIG5vcm1hbGl6ZSkhXG4gICAgICAgIGZvcihqID0gMDsgaiA8IGNkMC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgc3VtaiA9IGNkMFtqXVt2YWxBdHRyXSA9IGNkMFtqXS5zO1xuICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDwgaW5kaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNkID0gY2FsY1RyYWNlc1tpbmRpY2VzW2ldXTtcbiAgICAgICAgICAgICAgICBjZFswXS50cmFjZS5fcmF3TGVuZ3RoID0gY2RbMF0udHJhY2UuX2xlbmd0aDtcbiAgICAgICAgICAgICAgICBjZFswXS50cmFjZS5fbGVuZ3RoID0gc2VyaWVzbGVuO1xuICAgICAgICAgICAgICAgIHN1bWogKz0gY2Rbal0ucztcbiAgICAgICAgICAgICAgICBjZFtqXVt2YWxBdHRyXSA9IHN1bWo7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGdyb3Vwbm9ybSkge1xuICAgICAgICAgICAgICAgIG5vcm0gPSAoKGdyb3Vwbm9ybSA9PT0gJ2ZyYWN0aW9uJykgPyBzdW1qIDogKHN1bWogLyAxMDApKSB8fCAxO1xuICAgICAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNkaiA9IGNhbGNUcmFjZXNbaW5kaWNlc1tpXV1bal07XG4gICAgICAgICAgICAgICAgICAgIGNkalt2YWxBdHRyXSAvPSBub3JtO1xuICAgICAgICAgICAgICAgICAgICBjZGouc05vcm0gPSBjZGoucyAvIG5vcm07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXV0b3JhbmdlXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNkID0gY2FsY1RyYWNlc1tpbmRpY2VzW2ldXTtcbiAgICAgICAgICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgICAgICAgICAgdmFyIHBwYWQgPSBjYWxjLmNhbGNNYXJrZXJTaXplKHRyYWNlLCB0cmFjZS5fcmF3TGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciBhcnJheVBhZCA9IEFycmF5LmlzQXJyYXkocHBhZCk7XG4gICAgICAgICAgICBpZigocHBhZCAmJiBoYXNBbnlCbGFua3NbaV0pIHx8IGFycmF5UGFkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBwYWRSYXcgPSBwcGFkO1xuICAgICAgICAgICAgICAgIHBwYWQgPSBuZXcgQXJyYXkoc2VyaWVzbGVuKTtcbiAgICAgICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBzZXJpZXNsZW47IGorKykge1xuICAgICAgICAgICAgICAgICAgICBwcGFkW2pdID0gY2Rbal0uZ2FwID8gMCA6IChhcnJheVBhZCA/IHBwYWRSYXdbY2Rbal0uaV0gOiBwcGFkUmF3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgeCA9IG5ldyBBcnJheShzZXJpZXNsZW4pO1xuICAgICAgICAgICAgdmFyIHkgPSBuZXcgQXJyYXkoc2VyaWVzbGVuKTtcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IHNlcmllc2xlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgeFtqXSA9IGNkW2pdLng7XG4gICAgICAgICAgICAgICAgeVtqXSA9IGNkW2pdLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxjLmNhbGNBeGlzRXhwYW5zaW9uKGdkLCB0cmFjZSwgeGEsIHlhLCB4LCB5LCBwcGFkKTtcblxuICAgICAgICAgICAgLy8gd2hpbGUgd2UncmUgaGVyZSAoaW4gYSBsb29wIG92ZXIgYWxsIHRyYWNlcyBpbiB0aGUgc3RhY2spXG4gICAgICAgICAgICAvLyByZWNvcmQgdGhlIG9yaWVudGF0aW9uLCBzbyBob3ZlciBjYW4gZmluZCBpdCBlYXNpbHlcbiAgICAgICAgICAgIGNkWzBdLnQub3JpZW50YXRpb24gPSBncm91cE9wdHMub3JpZW50YXRpb247XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBpbnNlcnRCbGFuayhjYWxjVHJhY2UsIGluZGV4LCBwb3NpdGlvbiwgdHJhY2VJbmRleCwgaGFzQW55QmxhbmtzLCBpbnRlcnBvbGF0ZSwgcG9zQXR0cikge1xuICAgIGhhc0FueUJsYW5rc1t0cmFjZUluZGV4XSA9IHRydWU7XG4gICAgdmFyIG5ld0VudHJ5ID0ge1xuICAgICAgICBpOiBudWxsLFxuICAgICAgICBnYXA6IHRydWUsXG4gICAgICAgIHM6IDBcbiAgICB9O1xuICAgIG5ld0VudHJ5W3Bvc0F0dHJdID0gcG9zaXRpb247XG4gICAgY2FsY1RyYWNlLnNwbGljZShpbmRleCwgMCwgbmV3RW50cnkpO1xuICAgIC8vIEV2ZW4gaWYgd2UncmUgbm90IGludGVycG9sYXRpbmcsIGlmIG9uZSB0cmFjZSBoYXMgbXVsdGlwbGVcbiAgICAvLyB2YWx1ZXMgYXQgdGhlIHNhbWUgcG9zaXRpb24gYW5kIHRoaXMgdHJhY2Ugb25seSBoYXMgb25lIHZhbHVlIHRoZXJlLFxuICAgIC8vIHdlIGp1c3QgZHVwbGljYXRlIHRoYXQgb25lIHZhbHVlIHJhdGhlciB0aGFuIGluc2VydCBhIHplcm8uXG4gICAgLy8gV2UgYWxzbyBtYWtlIGl0IGxvb2sgbGlrZSBhIHJlYWwgcG9pbnQgLSBiZWNhdXNlIGl0J3MgYW1iaWd1b3VzIHdoaWNoXG4gICAgLy8gb25lIHJlYWxseSBpcyB0aGUgcmVhbCBvbmUhXG4gICAgaWYoaW5kZXggJiYgcG9zaXRpb24gPT09IGNhbGNUcmFjZVtpbmRleCAtIDFdW3Bvc0F0dHJdKSB7XG4gICAgICAgIHZhciBwcmV2RW50cnkgPSBjYWxjVHJhY2VbaW5kZXggLSAxXTtcbiAgICAgICAgbmV3RW50cnkucyA9IHByZXZFbnRyeS5zO1xuICAgICAgICAvLyBUT0RPIGlzIGl0IGdvaW5nIHRvIGNhdXNlIGFueSBwcm9ibGVtcyB0byBoYXZlIG11bHRpcGxlXG4gICAgICAgIC8vIGNhbGNkYXRhIHBvaW50cyB3aXRoIHRoZSBzYW1lIGluZGV4P1xuICAgICAgICBuZXdFbnRyeS5pID0gcHJldkVudHJ5Lmk7XG4gICAgICAgIG5ld0VudHJ5LmdhcCA9IHByZXZFbnRyeS5nYXA7XG4gICAgfSBlbHNlIGlmKGludGVycG9sYXRlKSB7XG4gICAgICAgIG5ld0VudHJ5LnMgPSBnZXRJbnRlcnAoY2FsY1RyYWNlLCBpbmRleCwgcG9zaXRpb24sIHBvc0F0dHIpO1xuICAgIH1cbiAgICBpZighaW5kZXgpIHtcbiAgICAgICAgLy8gdCBhbmQgdHJhY2UgbmVlZCB0byBzdGF5IG9uIHRoZSBmaXJzdCBjZCBlbnRyeVxuICAgICAgICBjYWxjVHJhY2VbMF0udCA9IGNhbGNUcmFjZVsxXS50O1xuICAgICAgICBjYWxjVHJhY2VbMF0udHJhY2UgPSBjYWxjVHJhY2VbMV0udHJhY2U7XG4gICAgICAgIGRlbGV0ZSBjYWxjVHJhY2VbMV0udDtcbiAgICAgICAgZGVsZXRlIGNhbGNUcmFjZVsxXS50cmFjZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEludGVycChjYWxjVHJhY2UsIGluZGV4LCBwb3NpdGlvbiwgcG9zQXR0cikge1xuICAgIHZhciBwdDAgPSBjYWxjVHJhY2VbaW5kZXggLSAxXTtcbiAgICB2YXIgcHQxID0gY2FsY1RyYWNlW2luZGV4ICsgMV07XG4gICAgaWYoIXB0MSkgcmV0dXJuIHB0MC5zO1xuICAgIGlmKCFwdDApIHJldHVybiBwdDEucztcbiAgICByZXR1cm4gcHQwLnMgKyAocHQxLnMgLSBwdDAucykgKiAocG9zaXRpb24gLSBwdDBbcG9zQXR0cl0pIC8gKHB0MVtwb3NBdHRyXSAtIHB0MFtwb3NBdHRyXSk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxuXG4vLyByZW1vdmUgb3BhY2l0eSBmb3IgYW55IHRyYWNlIHRoYXQgaGFzIGEgZmlsbCBvciBpcyBmaWxsZWQgdG9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3Jvc3NUcmFjZURlZmF1bHRzKGZ1bGxEYXRhKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmFjZWkgPSBmdWxsRGF0YVtpXTtcbiAgICAgICAgaWYodHJhY2VpLnR5cGUgIT09ICdzY2F0dGVyJykgY29udGludWU7XG5cbiAgICAgICAgdmFyIGZpbGxpID0gdHJhY2VpLmZpbGw7XG4gICAgICAgIGlmKGZpbGxpID09PSAnbm9uZScgfHwgZmlsbGkgPT09ICd0b3NlbGYnKSBjb250aW51ZTtcblxuICAgICAgICB0cmFjZWkub3BhY2l0eSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZihmaWxsaSA9PT0gJ3RvbmV4dHknIHx8IGZpbGxpID09PSAndG9uZXh0eCcpIHtcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IGkgLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmFjZWogPSBmdWxsRGF0YVtqXTtcblxuICAgICAgICAgICAgICAgIGlmKCh0cmFjZWoudHlwZSA9PT0gJ3NjYXR0ZXInKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHRyYWNlai54YXhpcyA9PT0gdHJhY2VpLnhheGlzKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHRyYWNlai55YXhpcyA9PT0gdHJhY2VpLnlheGlzKSkge1xuICAgICAgICAgICAgICAgICAgICB0cmFjZWoub3BhY2l0eSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xudmFyIHN1YlR5cGVzID0gcmVxdWlyZSgnLi9zdWJ0eXBlcycpO1xudmFyIGhhbmRsZVhZRGVmYXVsdHMgPSByZXF1aXJlKCcuL3h5X2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlU3RhY2tEZWZhdWx0cyA9IHJlcXVpcmUoJy4vc3RhY2tfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVNYXJrZXJEZWZhdWx0cyA9IHJlcXVpcmUoJy4vbWFya2VyX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlTGluZURlZmF1bHRzID0gcmVxdWlyZSgnLi9saW5lX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlTGluZVNoYXBlRGVmYXVsdHMgPSByZXF1aXJlKCcuL2xpbmVfc2hhcGVfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVUZXh0RGVmYXVsdHMgPSByZXF1aXJlKCcuL3RleHRfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVGaWxsQ29sb3JEZWZhdWx0cyA9IHJlcXVpcmUoJy4vZmlsbGNvbG9yX2RlZmF1bHRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBoYW5kbGVYWURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSk7XG4gICAgaWYoIWxlbikgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgaWYoIXRyYWNlT3V0LnZpc2libGUpIHJldHVybjtcblxuICAgIHZhciBzdGFja0dyb3VwT3B0cyA9IGhhbmRsZVN0YWNrRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcblxuICAgIHZhciBkZWZhdWx0TW9kZSA9ICFzdGFja0dyb3VwT3B0cyAmJiAobGVuIDwgY29uc3RhbnRzLlBUU19MSU5FU09OTFkpID9cbiAgICAgICAgJ2xpbmVzK21hcmtlcnMnIDogJ2xpbmVzJztcbiAgICBjb2VyY2UoJ3RleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGV4dCcpO1xuICAgIGNvZXJjZSgnbW9kZScsIGRlZmF1bHRNb2RlKTtcblxuICAgIGlmKHN1YlR5cGVzLmhhc0xpbmVzKHRyYWNlT3V0KSkge1xuICAgICAgICBoYW5kbGVMaW5lRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UpO1xuICAgICAgICBoYW5kbGVMaW5lU2hhcGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlKTtcbiAgICAgICAgY29lcmNlKCdjb25uZWN0Z2FwcycpO1xuICAgICAgICBjb2VyY2UoJ2xpbmUuc2ltcGxpZnknKTtcbiAgICB9XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlT3V0KSkge1xuICAgICAgICBoYW5kbGVNYXJrZXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSwge2dyYWRpZW50OiB0cnVlfSk7XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzVGV4dCh0cmFjZU91dCkpIHtcbiAgICAgICAgY29lcmNlKCd0ZXh0dGVtcGxhdGUnKTtcbiAgICAgICAgaGFuZGxlVGV4dERlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIGRmbHRIb3Zlck9uID0gW107XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlT3V0KSB8fCBzdWJUeXBlcy5oYXNUZXh0KHRyYWNlT3V0KSkge1xuICAgICAgICBjb2VyY2UoJ2NsaXBvbmF4aXMnKTtcbiAgICAgICAgY29lcmNlKCdtYXJrZXIubWF4ZGlzcGxheWVkJyk7XG4gICAgICAgIGRmbHRIb3Zlck9uLnB1c2goJ3BvaW50cycpO1xuICAgIH1cblxuICAgIC8vIEl0J3MgcG9zc2libGUgZm9yIHRoaXMgZGVmYXVsdCB0byBiZSBjaGFuZ2VkIGJ5IGEgbGF0ZXIgdHJhY2UuXG4gICAgLy8gV2UgaGFuZGxlIHRoYXQgY2FzZSBpbiBzb21lIGhhY2t5IGNvZGUgaW5zaWRlIGhhbmRsZVN0YWNrRGVmYXVsdHMuXG4gICAgY29lcmNlKCdmaWxsJywgc3RhY2tHcm91cE9wdHMgPyBzdGFja0dyb3VwT3B0cy5maWxsRGZsdCA6ICdub25lJyk7XG4gICAgaWYodHJhY2VPdXQuZmlsbCAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGhhbmRsZUZpbGxDb2xvckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGNvZXJjZSk7XG4gICAgICAgIGlmKCFzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZU91dCkpIGhhbmRsZUxpbmVTaGFwZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UpO1xuICAgIH1cblxuICAgIHZhciBsaW5lQ29sb3IgPSAodHJhY2VPdXQubGluZSB8fCB7fSkuY29sb3I7XG4gICAgdmFyIG1hcmtlckNvbG9yID0gKHRyYWNlT3V0Lm1hcmtlciB8fCB7fSkuY29sb3I7XG5cbiAgICBpZih0cmFjZU91dC5maWxsID09PSAndG9uZXh0JyB8fCB0cmFjZU91dC5maWxsID09PSAndG9zZWxmJykge1xuICAgICAgICBkZmx0SG92ZXJPbi5wdXNoKCdmaWxscycpO1xuICAgIH1cbiAgICBjb2VyY2UoJ2hvdmVyb24nLCBkZmx0SG92ZXJPbi5qb2luKCcrJykgfHwgJ3BvaW50cycpO1xuICAgIGlmKHRyYWNlT3V0LmhvdmVyb24gIT09ICdmaWxscycpIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuICAgIHZhciBlcnJvckJhcnNTdXBwbHlEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnZXJyb3JiYXJzJywgJ3N1cHBseURlZmF1bHRzJyk7XG4gICAgZXJyb3JCYXJzU3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxpbmVDb2xvciB8fCBtYXJrZXJDb2xvciB8fCBkZWZhdWx0Q29sb3IsIHtheGlzOiAneSd9KTtcbiAgICBlcnJvckJhcnNTdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGluZUNvbG9yIHx8IG1hcmtlckNvbG9yIHx8IGRlZmF1bHRDb2xvciwge2F4aXM6ICd4JywgaW5oZXJpdDogJ3knfSk7XG5cbiAgICBMaWIuY29lcmNlU2VsZWN0aW9uTWFya2VyT3BhY2l0eSh0cmFjZU91dCwgY29lcmNlKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JtYXRMYWJlbHMoY2RpLCB0cmFjZSwgZnVsbExheW91dCkge1xuICAgIHZhciBsYWJlbHMgPSB7fTtcblxuICAgIHZhciBtb2NrR2QgPSB7X2Z1bGxMYXlvdXQ6IGZ1bGxMYXlvdXR9O1xuICAgIHZhciB4YSA9IEF4ZXMuZ2V0RnJvbVRyYWNlKG1vY2tHZCwgdHJhY2UsICd4Jyk7XG4gICAgdmFyIHlhID0gQXhlcy5nZXRGcm9tVHJhY2UobW9ja0dkLCB0cmFjZSwgJ3knKTtcblxuICAgIGxhYmVscy54TGFiZWwgPSBBeGVzLnRpY2tUZXh0KHhhLCBjZGkueCwgdHJ1ZSkudGV4dDtcbiAgICBsYWJlbHMueUxhYmVsID0gQXhlcy50aWNrVGV4dCh5YSwgY2RpLnksIHRydWUpLnRleHQ7XG5cbiAgICByZXR1cm4gbGFiZWxzO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN1YnR5cGVzID0gcmVxdWlyZSgnLi9zdWJ0eXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBoYXNMaW5lczogc3VidHlwZXMuaGFzTGluZXMsXG4gICAgaGFzTWFya2Vyczogc3VidHlwZXMuaGFzTWFya2VycyxcbiAgICBoYXNUZXh0OiBzdWJ0eXBlcy5oYXNUZXh0LFxuICAgIGlzQnViYmxlOiBzdWJ0eXBlcy5pc0J1YmJsZSxcblxuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY3Jvc3NUcmFjZURlZmF1bHRzOiByZXF1aXJlKCcuL2Nyb3NzX3RyYWNlX2RlZmF1bHRzJyksXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY2FsYyxcbiAgICBjcm9zc1RyYWNlQ2FsYzogcmVxdWlyZSgnLi9jcm9zc190cmFjZV9jYWxjJyksXG4gICAgYXJyYXlzVG9DYWxjZGF0YTogcmVxdWlyZSgnLi9hcnJheXNfdG9fY2FsY2RhdGEnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi9tYXJrZXJfY29sb3JiYXInKSxcbiAgICBmb3JtYXRMYWJlbHM6IHJlcXVpcmUoJy4vZm9ybWF0X2xhYmVscycpLFxuICAgIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJykuc3R5bGUsXG4gICAgc3R5bGVPblNlbGVjdDogcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlT25TZWxlY3QsXG4gICAgaG92ZXJQb2ludHM6IHJlcXVpcmUoJy4vaG92ZXInKSxcbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4vc2VsZWN0JyksXG4gICAgYW5pbWF0YWJsZTogdHJ1ZSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3NjYXR0ZXInLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4nKSxcbiAgICBjYXRlZ29yaWVzOiBbXG4gICAgICAgICdjYXJ0ZXNpYW4nLCAnc3ZnJywgJ3N5bWJvbHMnLCAnZXJyb3JCYXJzT0snLCAnc2hvd0xlZ2VuZCcsICdzY2F0dGVyLWxpa2UnLFxuICAgICAgICAnem9vbVNjYWxlJ1xuICAgIF0sXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBzY2F0dGVyIHRyYWNlIHR5cGUgZW5jb21wYXNzZXMgbGluZSBjaGFydHMsIHNjYXR0ZXIgY2hhcnRzLCB0ZXh0IGNoYXJ0cywgYW5kIGJ1YmJsZSBjaGFydHMuJyxcbiAgICAgICAgICAgICdUaGUgZGF0YSB2aXN1YWxpemVkIGFzIHNjYXR0ZXIgcG9pbnQgb3IgbGluZXMgaXMgc2V0IGluIGB4YCBhbmQgYHlgLicsXG4gICAgICAgICAgICAnVGV4dCAoYXBwZWFyaW5nIGVpdGhlciBvbiB0aGUgY2hhcnQgb3Igb24gaG92ZXIgb25seSkgaXMgdmlhIGB0ZXh0YC4nLFxuICAgICAgICAgICAgJ0J1YmJsZSBjaGFydHMgYXJlIGFjaGlldmVkIGJ5IHNldHRpbmcgYG1hcmtlci5zaXplYCBhbmQvb3IgYG1hcmtlci5jb2xvcmAnLFxuICAgICAgICAgICAgJ3RvIG51bWVyaWNhbCBhcnJheXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwZXJTdGFja0F0dHJzID0gWydvcmllbnRhdGlvbicsICdncm91cG5vcm0nLCAnc3RhY2tnYXBzJ107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlU3RhY2tEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpIHtcbiAgICB2YXIgc3RhY2tPcHRzID0gbGF5b3V0Ll9zY2F0dGVyU3RhY2tPcHRzO1xuXG4gICAgdmFyIHN0YWNrR3JvdXAgPSBjb2VyY2UoJ3N0YWNrZ3JvdXAnKTtcbiAgICBpZihzdGFja0dyb3VwKSB7XG4gICAgICAgIC8vIHVzZSBpbmRlcGVuZGVudCBzdGFja2luZyBvcHRpb25zIHBlciBzdWJwbG90XG4gICAgICAgIHZhciBzdWJwbG90ID0gdHJhY2VPdXQueGF4aXMgKyB0cmFjZU91dC55YXhpcztcbiAgICAgICAgdmFyIHN1YnBsb3RTdGFja09wdHMgPSBzdGFja09wdHNbc3VicGxvdF07XG4gICAgICAgIGlmKCFzdWJwbG90U3RhY2tPcHRzKSBzdWJwbG90U3RhY2tPcHRzID0gc3RhY2tPcHRzW3N1YnBsb3RdID0ge307XG5cbiAgICAgICAgdmFyIGdyb3VwT3B0cyA9IHN1YnBsb3RTdGFja09wdHNbc3RhY2tHcm91cF07XG4gICAgICAgIHZhciBmaXJzdFRyYWNlID0gZmFsc2U7XG4gICAgICAgIGlmKGdyb3VwT3B0cykge1xuICAgICAgICAgICAgZ3JvdXBPcHRzLnRyYWNlcy5wdXNoKHRyYWNlT3V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwT3B0cyA9IHN1YnBsb3RTdGFja09wdHNbc3RhY2tHcm91cF0gPSB7XG4gICAgICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0cmFjZSBpbmRpY2VzIGZvciB1c2UgZHVyaW5nIHN0YWNraW5nIGNhbGN1bGF0aW9uc1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBiZSBmaWxsZWQgaW4gZHVyaW5nIGBjYWxjYCBhbmQgdXNlZCBkdXJpbmcgYGNyb3NzVHJhY2VDYWxjYFxuICAgICAgICAgICAgICAgIC8vIHNvIGl0J3MgT0sgaWYgd2UgZG9uJ3QgcmVjcmVhdGUgaXQgZHVyaW5nIGEgbm9uLWNhbGMgZWRpdFxuICAgICAgICAgICAgICAgIHRyYWNlSW5kaWNlczogW10sXG4gICAgICAgICAgICAgICAgLy8gSG9sZCBvbiB0byB0aGUgd2hvbGUgc2V0IG9mIHByaW9yIHRyYWNlc1xuICAgICAgICAgICAgICAgIC8vIEZpcnN0IG9uZSBpcyBtb3N0IGltcG9ydGFudCwgc28gd2UgY2FuIGNsZWFyIGRlZmF1bHRzXG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaWYgd2UgZmluZCBleHBsaWNpdCB2YWx1ZXMgb25seSBpbiBsYXRlciB0cmFjZXMuXG4gICAgICAgICAgICAgICAgLy8gV2UncmUgb25seSBnb2luZyB0byAqdXNlKiB0aGUgdmFsdWVzIHN0b3JlZCBpbiBncm91cE9wdHMsXG4gICAgICAgICAgICAgICAgLy8gYnV0IGZvciB0aGUgZWRpdG9yIGFuZCB2YWxpZGF0ZSB3ZSB3YW50IHRoaW5ncyBzZWxmLWNvbnNpc3RlbnRcbiAgICAgICAgICAgICAgICAvLyBUaGUgZnVsbCBzZXQgb2YgdHJhY2VzIGlzIHVzZWQgb25seSB0byBmaXggYGZpbGxgIGRlZmF1bHQgaWZcbiAgICAgICAgICAgICAgICAvLyB3ZSBmaW5kIGBvcmllbnRhdGlvbjogJ2gnYCBiZXlvbmQgdGhlIGZpcnN0IHRyYWNlXG4gICAgICAgICAgICAgICAgdHJhY2VzOiBbdHJhY2VPdXRdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyc3RUcmFjZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogaG93IGlzIHRoaXMgZ29pbmcgdG8gd29yayB3aXRoIGdyb3VwYnkgdHJhbnNmb3Jtcz9cbiAgICAgICAgLy8gaW4gcHJpbmNpcGxlIGl0IHNob3VsZCBiZSBPSyBJIGd1ZXNzLCBhcyBsb25nIGFzIGV4cGxpY2l0IGdyb3VwIHN0eWxlc1xuICAgICAgICAvLyBkb24ndCBvdmVycmlkZSBleHBsaWNpdCBiYXNlLXRyYWNlIHN0eWxlcz9cblxuICAgICAgICB2YXIgZGZsdHMgPSB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbjogKHRyYWNlT3V0LnggJiYgIXRyYWNlT3V0LnkpID8gJ2gnIDogJ3YnXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHBlclN0YWNrQXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBhdHRyID0gcGVyU3RhY2tBdHRyc1tpXTtcbiAgICAgICAgICAgIHZhciBhdHRyRm91bmQgPSBhdHRyICsgJ0ZvdW5kJztcbiAgICAgICAgICAgIGlmKCFncm91cE9wdHNbYXR0ckZvdW5kXSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmFjZUhhc0F0dHIgPSB0cmFjZUluW2F0dHJdICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdmFyIGlzT3JpZW50YXRpb24gPSBhdHRyID09PSAnb3JpZW50YXRpb24nO1xuICAgICAgICAgICAgICAgIGlmKHRyYWNlSGFzQXR0ciB8fCBmaXJzdFRyYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwT3B0c1thdHRyXSA9IGNvZXJjZShhdHRyLCBkZmx0c1thdHRyXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoaXNPcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBPcHRzLmZpbGxEZmx0ID0gZ3JvdXBPcHRzW2F0dHJdID09PSAnaCcgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0b25leHR4JyA6ICd0b25leHR5JztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYWNlSGFzQXR0cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90ZTogdGhpcyB3aWxsIHNob3cgYSB2YWx1ZSBoZXJlIGV2ZW4gaWYgaXQncyBpbnZhbGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiB3aGljaCBjYXNlIGl0IHdpbGwgcmV2ZXJ0IHRvIGRlZmF1bHQuXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE9wdHNbYXR0ckZvdW5kXSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGU6IG9ubHkgb25lIHRyYWNlIGluIHRoZSBzdGFjayB3aWxsIGdldCBhIF9mdWxsRGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW50cnkgZm9yIGEgZ2l2ZW4gc3RhY2std2lkZSBhdHRyaWJ1dGUuIElmIG5vIHRyYWNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKG9yIHRoZSBmaXJzdCB0cmFjZSkgc3BlY2lmeSB0aGF0IGF0dHJpYnV0ZSwgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmaXJzdCB0cmFjZSB3aWxsIGdldCBpdC4gSWYgdGhlIGZpcnN0IHRyYWNlIGRvZXMgTk9UXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzcGVjaWZ5IGl0IGJ1dCBzb21lIGxhdGVyIHRyYWNlIGRvZXMsIHRoZW4gaXQgZ2V0c1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlZCBmcm9tIHRoZSBmaXJzdCB0cmFjZSBhbmQgb25seSBpbmNsdWRlZCBpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uZSB0aGF0IHNwZWNpZmllZCBpdC4gVGhpcyBpcyBtb3N0bHkgaW1wb3J0YW50IGZvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWRpdG9ycyAodGhhdCB3YW50IHRvIHNlZSB0aGUgZnVsbCB2YWx1ZXMgdG8ga25vd1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hhdCBzZXR0aW5ncyBhcmUgYXZhaWxhYmxlKSBhbmQgUGxvdGx5LnJlYWN0IGRpZmZpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFZGl0b3JzIG1heSB3YW50IHRvIHVzZSBmdWxsTGF5b3V0Ll9zY2F0dGVyU3RhY2tPcHRzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkaXJlY3RseSBhbmQgbWFrZSB0aGVzZSBzZXR0aW5ncyBhdmFpbGFibGUgZnJvbSBhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRyYWNlcyBpbiB0aGUgc3RhY2suLi4gdGhlbiBzZXQgdGhlIG5ldyB2YWx1ZSBpbnRvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgdHJhY2UsIGFuZCBjbGVhciBhbGwgbGF0ZXIgdHJhY2VzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWZpcnN0VHJhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZ3JvdXBPcHRzLnRyYWNlc1swXVthdHRyXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yaWVudGF0aW9uIGNhbiBhZmZlY3QgZGVmYXVsdCBmaWxsIG9mIHByZXZpb3VzIHRyYWNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzT3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGdyb3VwT3B0cy50cmFjZXMubGVuZ3RoIC0gMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhY2UyID0gZ3JvdXBPcHRzLnRyYWNlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRyYWNlMi5faW5wdXQuZmlsbCAhPT0gdHJhY2UyLmZpbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZTIuZmlsbCA9IGdyb3VwT3B0cy5maWxsRGZsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBPcHRzO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9