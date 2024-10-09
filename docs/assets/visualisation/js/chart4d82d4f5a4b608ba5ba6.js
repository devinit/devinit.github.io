(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_histogram_js"],{

/***/ "./node_modules/plotly.js/lib/histogram.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/histogram.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/histogram */ "./node_modules/plotly.js/src/traces/histogram/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/layout_attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/layout_attributes.js ***!
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
    barmode: {
        valType: 'enumerated',
        values: ['stack', 'group', 'overlay', 'relative'],
        dflt: 'group',
        role: 'info',
        editType: 'calc',
        description: [
            'Determines how bars at the same location coordinate',
            'are displayed on the graph.',
            'With *stack*, the bars are stacked on top of one another',
            'With *relative*, the bars are stacked on top of one another,',
            'with negative values below the axis, positive values above',
            'With *group*, the bars are plotted next to one another',
            'centered around the shared location.',
            'With *overlay*, the bars are plotted over one another,',
            'you might need to an *opacity* to see multiple bars.'
        ].join(' ')
    },
    barnorm: {
        valType: 'enumerated',
        values: ['', 'fraction', 'percent'],
        dflt: '',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the normalization for bar traces on the graph.',
            'With *fraction*, the value of each bar is divided by the sum of all',
            'values at that location coordinate.',
            '*percent* is the same but multiplied by 100 to show percentages.'
        ].join(' ')
    },
    bargap: {
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
    bargroupgap: {
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

/***/ "./node_modules/plotly.js/src/traces/bar/layout_defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/layout_defaults.js ***!
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



var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/bar/layout_attributes.js");

module.exports = function(layoutIn, layoutOut, fullData) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    var hasBars = false;
    var shouldBeGapless = false;
    var gappedAnyway = false;
    var usedSubplots = {};

    var mode = coerce('barmode');

    for(var i = 0; i < fullData.length; i++) {
        var trace = fullData[i];
        if(Registry.traceIs(trace, 'bar') && trace.visible) hasBars = true;
        else continue;

        // if we have at least 2 grouped bar traces on the same subplot,
        // we should default to a gap anyway, even if the data is histograms
        if(mode === 'group') {
            var subploti = trace.xaxis + trace.yaxis;
            if(usedSubplots[subploti]) gappedAnyway = true;
            usedSubplots[subploti] = true;
        }

        if(trace.visible && trace.type === 'histogram') {
            var pa = Axes.getFromId({_fullLayout: layoutOut},
                        trace[trace.orientation === 'v' ? 'xaxis' : 'yaxis']);
            if(pa.type !== 'category') shouldBeGapless = true;
        }
    }

    if(!hasBars) {
        delete layoutOut.barmode;
        return;
    }

    if(mode !== 'overlay') coerce('barnorm');

    coerce('bargap', (shouldBeGapless && !gappedAnyway) ? 0 : 0.2);
    coerce('bargroupgap');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/defaults.js ***!
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var handleStyleDefaults = __webpack_require__(/*! ../bar/style_defaults */ "./node_modules/plotly.js/src/traces/bar/style_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/histogram/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var x = coerce('x');
    var y = coerce('y');

    var cumulative = coerce('cumulative.enabled');
    if(cumulative) {
        coerce('cumulative.direction');
        coerce('cumulative.currentbin');
    }

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    var orientation = coerce('orientation', (y && !x) ? 'h' : 'v');
    var sampleLetter = orientation === 'v' ? 'x' : 'y';
    var aggLetter = orientation === 'v' ? 'y' : 'x';

    var len = (x && y) ?
        Math.min(Lib.minRowLength(x) && Lib.minRowLength(y)) :
        Lib.minRowLength(traceOut[sampleLetter] || []);

    if(!len) {
        traceOut.visible = false;
        return;
    }

    traceOut._length = len;

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y'], layout);

    var hasAggregationData = traceOut[aggLetter];
    if(hasAggregationData) coerce('histfunc');
    coerce('histnorm');

    // Note: bin defaults are now handled in Histogram.crossTraceDefaults
    // autobin(x|y) are only included here to appease Plotly.validate
    coerce('autobin' + sampleLetter);

    handleStyleDefaults(traceIn, traceOut, coerce, defaultColor, layout);

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);

    var lineColor = (traceOut.marker.line || {}).color;

    // override defaultColor for error bars with defaultLine
    var errorBarsSupplyDefaults = Registry.getComponentMethod('errorbars', 'supplyDefaults');
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || Color.defaultLine, {axis: 'y'});
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || Color.defaultLine, {axis: 'x', inherit: 'y'});
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/event_data.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/event_data.js ***!
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



module.exports = function eventData(out, pt, trace, cd, pointNumber) {
    // standard cartesian event data
    out.x = 'xVal' in pt ? pt.xVal : pt.x;
    out.y = 'yVal' in pt ? pt.yVal : pt.y;

    // for 2d histograms
    if('zLabelVal' in pt) out.z = pt.zLabelVal;

    if(pt.xa) out.xaxis = pt.xa;
    if(pt.ya) out.yaxis = pt.ya;

    // specific to histogram - CDFs do not have pts (yet?)
    if(!(trace.cumulative || {}).enabled) {
        var pts = Array.isArray(pointNumber) ?
            cd[0].pts[pointNumber[0]][pointNumber[1]] :
            cd[pointNumber].pts;

        out.pointNumbers = pts;
        out.binNumber = out.pointNumber;
        delete out.pointNumber;
        delete out.pointIndex;

        var pointIndices;
        if(trace._indexToPoints) {
            pointIndices = [];
            for(var i = 0; i < pts.length; i++) {
                pointIndices = pointIndices.concat(trace._indexToPoints[pts[i]]);
            }
        } else {
            pointIndices = pts;
        }

        out.pointIndices = pointIndices;
    }

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/hover.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/hover.js ***!
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




var barHover = __webpack_require__(/*! ../bar/hover */ "./node_modules/plotly.js/src/traces/bar/hover.js").hoverPoints;
var hoverLabelText = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js").hoverLabelText;

module.exports = function hoverPoints(pointData, xval, yval, hovermode) {
    var pts = barHover(pointData, xval, yval, hovermode);

    if(!pts) return;

    pointData = pts[0];
    var di = pointData.cd[pointData.index];
    var trace = pointData.cd[0].trace;

    if(!trace.cumulative.enabled) {
        var posLetter = trace.orientation === 'h' ? 'y' : 'x';

        pointData[posLetter + 'Label'] = hoverLabelText(pointData[posLetter + 'a'], di.ph0, di.ph1);
    }

    return pts;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/index.js ***!
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



/**
 * Histogram has its own attribute, defaults and calc steps,
 * but uses bar's plot to display
 * and bar's crossTraceCalc (formerly known as setPositions) for stacking and grouping
 */

/**
 * histogram errorBarsOK is debatable, but it's put in for backward compat.
 * there are use cases for it - sqrt for a simple histogram works right now,
 * constant and % work but they're not so meaningful. I guess it could be cool
 * to allow quadrature combination of errors in summed histograms...
 */

module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/histogram/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ../bar/layout_attributes */ "./node_modules/plotly.js/src/traces/bar/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/histogram/defaults.js"),
    crossTraceDefaults: __webpack_require__(/*! ./cross_trace_defaults */ "./node_modules/plotly.js/src/traces/histogram/cross_trace_defaults.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ../bar/layout_defaults */ "./node_modules/plotly.js/src/traces/bar/layout_defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/histogram/calc.js").calc,
    crossTraceCalc: __webpack_require__(/*! ../bar/cross_trace_calc */ "./node_modules/plotly.js/src/traces/bar/cross_trace_calc.js").crossTraceCalc,
    plot: __webpack_require__(/*! ../bar/plot */ "./node_modules/plotly.js/src/traces/bar/plot.js").plot,
    layerName: 'barlayer',
    style: __webpack_require__(/*! ../bar/style */ "./node_modules/plotly.js/src/traces/bar/style.js").style,
    styleOnSelect: __webpack_require__(/*! ../bar/style */ "./node_modules/plotly.js/src/traces/bar/style.js").styleOnSelect,
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/histogram/hover.js"),
    selectPoints: __webpack_require__(/*! ../bar/select */ "./node_modules/plotly.js/src/traces/bar/select.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/histogram/event_data.js"),

    moduleType: 'trace',
    name: 'histogram',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['bar-like', 'cartesian', 'svg', 'bar', 'histogram', 'oriented', 'errorBarsOK', 'showLegend'],
    meta: {
        description: [
            'The sample data from which statistics are computed is set in `x`',
            'for vertically spanning histograms and',
            'in `y` for horizontally spanning histograms.',
            'Binning options are set `xbins` and `ybins` respectively',
            'if no aggregation data is provided.'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaGlzdG9ncmFtLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2xheW91dF9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2xheW91dF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hpc3RvZ3JhbS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hpc3RvZ3JhbS9ldmVudF9kYXRhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLDZIQUFtRDs7Ozs7Ozs7Ozs7O0FDVm5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOzs7QUFHYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFD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RUFBZTtBQUN6QyxlQUFlLG1CQUFPLENBQUMsaUZBQWM7O0FBRXJDO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyxvRkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDRkODJkNGY1YTRiNjA4YmE1YmE2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvaGlzdG9ncmFtJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYmFybW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydzdGFjaycsICdncm91cCcsICdvdmVybGF5JywgJ3JlbGF0aXZlJ10sXG4gICAgICAgIGRmbHQ6ICdncm91cCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIGhvdyBiYXJzIGF0IHRoZSBzYW1lIGxvY2F0aW9uIGNvb3JkaW5hdGUnLFxuICAgICAgICAgICAgJ2FyZSBkaXNwbGF5ZWQgb24gdGhlIGdyYXBoLicsXG4gICAgICAgICAgICAnV2l0aCAqc3RhY2sqLCB0aGUgYmFycyBhcmUgc3RhY2tlZCBvbiB0b3Agb2Ygb25lIGFub3RoZXInLFxuICAgICAgICAgICAgJ1dpdGggKnJlbGF0aXZlKiwgdGhlIGJhcnMgYXJlIHN0YWNrZWQgb24gdG9wIG9mIG9uZSBhbm90aGVyLCcsXG4gICAgICAgICAgICAnd2l0aCBuZWdhdGl2ZSB2YWx1ZXMgYmVsb3cgdGhlIGF4aXMsIHBvc2l0aXZlIHZhbHVlcyBhYm92ZScsXG4gICAgICAgICAgICAnV2l0aCAqZ3JvdXAqLCB0aGUgYmFycyBhcmUgcGxvdHRlZCBuZXh0IHRvIG9uZSBhbm90aGVyJyxcbiAgICAgICAgICAgICdjZW50ZXJlZCBhcm91bmQgdGhlIHNoYXJlZCBsb2NhdGlvbi4nLFxuICAgICAgICAgICAgJ1dpdGggKm92ZXJsYXkqLCB0aGUgYmFycyBhcmUgcGxvdHRlZCBvdmVyIG9uZSBhbm90aGVyLCcsXG4gICAgICAgICAgICAneW91IG1pZ2h0IG5lZWQgdG8gYW4gKm9wYWNpdHkqIHRvIHNlZSBtdWx0aXBsZSBiYXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJhcm5vcm06IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnJywgJ2ZyYWN0aW9uJywgJ3BlcmNlbnQnXSxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBub3JtYWxpemF0aW9uIGZvciBiYXIgdHJhY2VzIG9uIHRoZSBncmFwaC4nLFxuICAgICAgICAgICAgJ1dpdGggKmZyYWN0aW9uKiwgdGhlIHZhbHVlIG9mIGVhY2ggYmFyIGlzIGRpdmlkZWQgYnkgdGhlIHN1bSBvZiBhbGwnLFxuICAgICAgICAgICAgJ3ZhbHVlcyBhdCB0aGF0IGxvY2F0aW9uIGNvb3JkaW5hdGUuJyxcbiAgICAgICAgICAgICcqcGVyY2VudCogaXMgdGhlIHNhbWUgYnV0IG11bHRpcGxpZWQgYnkgMTAwIHRvIHNob3cgcGVyY2VudGFnZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYmFyZ2FwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBnYXAgKGluIHBsb3QgZnJhY3Rpb24pIGJldHdlZW4gYmFycyBvZicsXG4gICAgICAgICAgICAnYWRqYWNlbnQgbG9jYXRpb24gY29vcmRpbmF0ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYmFyZ3JvdXBnYXA6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGdhcCAoaW4gcGxvdCBmcmFjdGlvbikgYmV0d2VlbiBiYXJzIG9mJyxcbiAgICAgICAgICAgICd0aGUgc2FtZSBsb2NhdGlvbiBjb29yZGluYXRlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgbGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGxheW91dEluLCBsYXlvdXRPdXQsIGxheW91dEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBoYXNCYXJzID0gZmFsc2U7XG4gICAgdmFyIHNob3VsZEJlR2FwbGVzcyA9IGZhbHNlO1xuICAgIHZhciBnYXBwZWRBbnl3YXkgPSBmYWxzZTtcbiAgICB2YXIgdXNlZFN1YnBsb3RzID0ge307XG5cbiAgICB2YXIgbW9kZSA9IGNvZXJjZSgnYmFybW9kZScpO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IGZ1bGxEYXRhW2ldO1xuICAgICAgICBpZihSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAnYmFyJykgJiYgdHJhY2UudmlzaWJsZSkgaGFzQmFycyA9IHRydWU7XG4gICAgICAgIGVsc2UgY29udGludWU7XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhdCBsZWFzdCAyIGdyb3VwZWQgYmFyIHRyYWNlcyBvbiB0aGUgc2FtZSBzdWJwbG90LFxuICAgICAgICAvLyB3ZSBzaG91bGQgZGVmYXVsdCB0byBhIGdhcCBhbnl3YXksIGV2ZW4gaWYgdGhlIGRhdGEgaXMgaGlzdG9ncmFtc1xuICAgICAgICBpZihtb2RlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICB2YXIgc3VicGxvdGkgPSB0cmFjZS54YXhpcyArIHRyYWNlLnlheGlzO1xuICAgICAgICAgICAgaWYodXNlZFN1YnBsb3RzW3N1YnBsb3RpXSkgZ2FwcGVkQW55d2F5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHVzZWRTdWJwbG90c1tzdWJwbG90aV0gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJhY2UudmlzaWJsZSAmJiB0cmFjZS50eXBlID09PSAnaGlzdG9ncmFtJykge1xuICAgICAgICAgICAgdmFyIHBhID0gQXhlcy5nZXRGcm9tSWQoe19mdWxsTGF5b3V0OiBsYXlvdXRPdXR9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VbdHJhY2Uub3JpZW50YXRpb24gPT09ICd2JyA/ICd4YXhpcycgOiAneWF4aXMnXSk7XG4gICAgICAgICAgICBpZihwYS50eXBlICE9PSAnY2F0ZWdvcnknKSBzaG91bGRCZUdhcGxlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIWhhc0JhcnMpIHtcbiAgICAgICAgZGVsZXRlIGxheW91dE91dC5iYXJtb2RlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYobW9kZSAhPT0gJ292ZXJsYXknKSBjb2VyY2UoJ2Jhcm5vcm0nKTtcblxuICAgIGNvZXJjZSgnYmFyZ2FwJywgKHNob3VsZEJlR2FwbGVzcyAmJiAhZ2FwcGVkQW55d2F5KSA/IDAgOiAwLjIpO1xuICAgIGNvZXJjZSgnYmFyZ3JvdXBnYXAnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG5cbnZhciBoYW5kbGVTdHlsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vYmFyL3N0eWxlX2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgneCcpO1xuICAgIHZhciB5ID0gY29lcmNlKCd5Jyk7XG5cbiAgICB2YXIgY3VtdWxhdGl2ZSA9IGNvZXJjZSgnY3VtdWxhdGl2ZS5lbmFibGVkJyk7XG4gICAgaWYoY3VtdWxhdGl2ZSkge1xuICAgICAgICBjb2VyY2UoJ2N1bXVsYXRpdmUuZGlyZWN0aW9uJyk7XG4gICAgICAgIGNvZXJjZSgnY3VtdWxhdGl2ZS5jdXJyZW50YmluJyk7XG4gICAgfVxuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIHZhciBvcmllbnRhdGlvbiA9IGNvZXJjZSgnb3JpZW50YXRpb24nLCAoeSAmJiAheCkgPyAnaCcgOiAndicpO1xuICAgIHZhciBzYW1wbGVMZXR0ZXIgPSBvcmllbnRhdGlvbiA9PT0gJ3YnID8gJ3gnIDogJ3knO1xuICAgIHZhciBhZ2dMZXR0ZXIgPSBvcmllbnRhdGlvbiA9PT0gJ3YnID8gJ3knIDogJ3gnO1xuXG4gICAgdmFyIGxlbiA9ICh4ICYmIHkpID9cbiAgICAgICAgTWF0aC5taW4oTGliLm1pblJvd0xlbmd0aCh4KSAmJiBMaWIubWluUm93TGVuZ3RoKHkpKSA6XG4gICAgICAgIExpYi5taW5Sb3dMZW5ndGgodHJhY2VPdXRbc2FtcGxlTGV0dGVyXSB8fCBbXSk7XG5cbiAgICBpZighbGVuKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICB2YXIgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY2FsZW5kYXJzJywgJ2hhbmRsZVRyYWNlRGVmYXVsdHMnKTtcbiAgICBoYW5kbGVDYWxlbmRhckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBbJ3gnLCAneSddLCBsYXlvdXQpO1xuXG4gICAgdmFyIGhhc0FnZ3JlZ2F0aW9uRGF0YSA9IHRyYWNlT3V0W2FnZ0xldHRlcl07XG4gICAgaWYoaGFzQWdncmVnYXRpb25EYXRhKSBjb2VyY2UoJ2hpc3RmdW5jJyk7XG4gICAgY29lcmNlKCdoaXN0bm9ybScpO1xuXG4gICAgLy8gTm90ZTogYmluIGRlZmF1bHRzIGFyZSBub3cgaGFuZGxlZCBpbiBIaXN0b2dyYW0uY3Jvc3NUcmFjZURlZmF1bHRzXG4gICAgLy8gYXV0b2Jpbih4fHkpIGFyZSBvbmx5IGluY2x1ZGVkIGhlcmUgdG8gYXBwZWFzZSBQbG90bHkudmFsaWRhdGVcbiAgICBjb2VyY2UoJ2F1dG9iaW4nICsgc2FtcGxlTGV0dGVyKTtcblxuICAgIGhhbmRsZVN0eWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgZGVmYXVsdENvbG9yLCBsYXlvdXQpO1xuXG4gICAgTGliLmNvZXJjZVNlbGVjdGlvbk1hcmtlck9wYWNpdHkodHJhY2VPdXQsIGNvZXJjZSk7XG5cbiAgICB2YXIgbGluZUNvbG9yID0gKHRyYWNlT3V0Lm1hcmtlci5saW5lIHx8IHt9KS5jb2xvcjtcblxuICAgIC8vIG92ZXJyaWRlIGRlZmF1bHRDb2xvciBmb3IgZXJyb3IgYmFycyB3aXRoIGRlZmF1bHRMaW5lXG4gICAgdmFyIGVycm9yQmFyc1N1cHBseURlZmF1bHRzID0gUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdlcnJvcmJhcnMnLCAnc3VwcGx5RGVmYXVsdHMnKTtcbiAgICBlcnJvckJhcnNTdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGluZUNvbG9yIHx8IENvbG9yLmRlZmF1bHRMaW5lLCB7YXhpczogJ3knfSk7XG4gICAgZXJyb3JCYXJzU3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxpbmVDb2xvciB8fCBDb2xvci5kZWZhdWx0TGluZSwge2F4aXM6ICd4JywgaW5oZXJpdDogJ3knfSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV2ZW50RGF0YShvdXQsIHB0LCB0cmFjZSwgY2QsIHBvaW50TnVtYmVyKSB7XG4gICAgLy8gc3RhbmRhcmQgY2FydGVzaWFuIGV2ZW50IGRhdGFcbiAgICBvdXQueCA9ICd4VmFsJyBpbiBwdCA/IHB0LnhWYWwgOiBwdC54O1xuICAgIG91dC55ID0gJ3lWYWwnIGluIHB0ID8gcHQueVZhbCA6IHB0Lnk7XG5cbiAgICAvLyBmb3IgMmQgaGlzdG9ncmFtc1xuICAgIGlmKCd6TGFiZWxWYWwnIGluIHB0KSBvdXQueiA9IHB0LnpMYWJlbFZhbDtcblxuICAgIGlmKHB0LnhhKSBvdXQueGF4aXMgPSBwdC54YTtcbiAgICBpZihwdC55YSkgb3V0LnlheGlzID0gcHQueWE7XG5cbiAgICAvLyBzcGVjaWZpYyB0byBoaXN0b2dyYW0gLSBDREZzIGRvIG5vdCBoYXZlIHB0cyAoeWV0PylcbiAgICBpZighKHRyYWNlLmN1bXVsYXRpdmUgfHwge30pLmVuYWJsZWQpIHtcbiAgICAgICAgdmFyIHB0cyA9IEFycmF5LmlzQXJyYXkocG9pbnROdW1iZXIpID9cbiAgICAgICAgICAgIGNkWzBdLnB0c1twb2ludE51bWJlclswXV1bcG9pbnROdW1iZXJbMV1dIDpcbiAgICAgICAgICAgIGNkW3BvaW50TnVtYmVyXS5wdHM7XG5cbiAgICAgICAgb3V0LnBvaW50TnVtYmVycyA9IHB0cztcbiAgICAgICAgb3V0LmJpbk51bWJlciA9IG91dC5wb2ludE51bWJlcjtcbiAgICAgICAgZGVsZXRlIG91dC5wb2ludE51bWJlcjtcbiAgICAgICAgZGVsZXRlIG91dC5wb2ludEluZGV4O1xuXG4gICAgICAgIHZhciBwb2ludEluZGljZXM7XG4gICAgICAgIGlmKHRyYWNlLl9pbmRleFRvUG9pbnRzKSB7XG4gICAgICAgICAgICBwb2ludEluZGljZXMgPSBbXTtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwb2ludEluZGljZXMgPSBwb2ludEluZGljZXMuY29uY2F0KHRyYWNlLl9pbmRleFRvUG9pbnRzW3B0c1tpXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9pbnRJbmRpY2VzID0gcHRzO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0LnBvaW50SW5kaWNlcyA9IHBvaW50SW5kaWNlcztcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmFySG92ZXIgPSByZXF1aXJlKCcuLi9iYXIvaG92ZXInKS5ob3ZlclBvaW50cztcbnZhciBob3ZlckxhYmVsVGV4dCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJykuaG92ZXJMYWJlbFRleHQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpIHtcbiAgICB2YXIgcHRzID0gYmFySG92ZXIocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpO1xuXG4gICAgaWYoIXB0cykgcmV0dXJuO1xuXG4gICAgcG9pbnREYXRhID0gcHRzWzBdO1xuICAgIHZhciBkaSA9IHBvaW50RGF0YS5jZFtwb2ludERhdGEuaW5kZXhdO1xuICAgIHZhciB0cmFjZSA9IHBvaW50RGF0YS5jZFswXS50cmFjZTtcblxuICAgIGlmKCF0cmFjZS5jdW11bGF0aXZlLmVuYWJsZWQpIHtcbiAgICAgICAgdmFyIHBvc0xldHRlciA9IHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcgPyAneScgOiAneCc7XG5cbiAgICAgICAgcG9pbnREYXRhW3Bvc0xldHRlciArICdMYWJlbCddID0gaG92ZXJMYWJlbFRleHQocG9pbnREYXRhW3Bvc0xldHRlciArICdhJ10sIGRpLnBoMCwgZGkucGgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHRzO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBIaXN0b2dyYW0gaGFzIGl0cyBvd24gYXR0cmlidXRlLCBkZWZhdWx0cyBhbmQgY2FsYyBzdGVwcyxcbiAqIGJ1dCB1c2VzIGJhcidzIHBsb3QgdG8gZGlzcGxheVxuICogYW5kIGJhcidzIGNyb3NzVHJhY2VDYWxjIChmb3JtZXJseSBrbm93biBhcyBzZXRQb3NpdGlvbnMpIGZvciBzdGFja2luZyBhbmQgZ3JvdXBpbmdcbiAqL1xuXG4vKipcbiAqIGhpc3RvZ3JhbSBlcnJvckJhcnNPSyBpcyBkZWJhdGFibGUsIGJ1dCBpdCdzIHB1dCBpbiBmb3IgYmFja3dhcmQgY29tcGF0LlxuICogdGhlcmUgYXJlIHVzZSBjYXNlcyBmb3IgaXQgLSBzcXJ0IGZvciBhIHNpbXBsZSBoaXN0b2dyYW0gd29ya3MgcmlnaHQgbm93LFxuICogY29uc3RhbnQgYW5kICUgd29yayBidXQgdGhleSdyZSBub3Qgc28gbWVhbmluZ2Z1bC4gSSBndWVzcyBpdCBjb3VsZCBiZSBjb29sXG4gKiB0byBhbGxvdyBxdWFkcmF0dXJlIGNvbWJpbmF0aW9uIG9mIGVycm9ycyBpbiBzdW1tZWQgaGlzdG9ncmFtcy4uLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4uL2Jhci9sYXlvdXRfYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY3Jvc3NUcmFjZURlZmF1bHRzOiByZXF1aXJlKCcuL2Nyb3NzX3RyYWNlX2RlZmF1bHRzJyksXG4gICAgc3VwcGx5TGF5b3V0RGVmYXVsdHM6IHJlcXVpcmUoJy4uL2Jhci9sYXlvdXRfZGVmYXVsdHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKS5jYWxjLFxuICAgIGNyb3NzVHJhY2VDYWxjOiByZXF1aXJlKCcuLi9iYXIvY3Jvc3NfdHJhY2VfY2FsYycpLmNyb3NzVHJhY2VDYWxjLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4uL2Jhci9wbG90JykucGxvdCxcbiAgICBsYXllck5hbWU6ICdiYXJsYXllcicsXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4uL2Jhci9zdHlsZScpLnN0eWxlLFxuICAgIHN0eWxlT25TZWxlY3Q6IHJlcXVpcmUoJy4uL2Jhci9zdHlsZScpLnN0eWxlT25TZWxlY3QsXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFya2VyX2NvbG9yYmFyJyksXG4gICAgaG92ZXJQb2ludHM6IHJlcXVpcmUoJy4vaG92ZXInKSxcbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4uL2Jhci9zZWxlY3QnKSxcbiAgICBldmVudERhdGE6IHJlcXVpcmUoJy4vZXZlbnRfZGF0YScpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnaGlzdG9ncmFtJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydiYXItbGlrZScsICdjYXJ0ZXNpYW4nLCAnc3ZnJywgJ2JhcicsICdoaXN0b2dyYW0nLCAnb3JpZW50ZWQnLCAnZXJyb3JCYXJzT0snLCAnc2hvd0xlZ2VuZCddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgc2FtcGxlIGRhdGEgZnJvbSB3aGljaCBzdGF0aXN0aWNzIGFyZSBjb21wdXRlZCBpcyBzZXQgaW4gYHhgJyxcbiAgICAgICAgICAgICdmb3IgdmVydGljYWxseSBzcGFubmluZyBoaXN0b2dyYW1zIGFuZCcsXG4gICAgICAgICAgICAnaW4gYHlgIGZvciBob3Jpem9udGFsbHkgc3Bhbm5pbmcgaGlzdG9ncmFtcy4nLFxuICAgICAgICAgICAgJ0Jpbm5pbmcgb3B0aW9ucyBhcmUgc2V0IGB4Ymluc2AgYW5kIGB5Ymluc2AgcmVzcGVjdGl2ZWx5JyxcbiAgICAgICAgICAgICdpZiBubyBhZ2dyZWdhdGlvbiBkYXRhIGlzIHByb3ZpZGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==