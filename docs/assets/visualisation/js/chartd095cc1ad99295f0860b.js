(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_bar_js"],{

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

/***/ "./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js ***!
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

// arrayOk attributes, merge them into calcdata array
module.exports = function arraysToCalcdata(cd, trace) {
    for(var i = 0; i < cd.length; i++) cd[i].i = i;

    Lib.mergeArray(trace.text, cd, 'tx');
    Lib.mergeArray(trace.hovertext, cd, 'htx');

    var marker = trace.marker;
    if(marker) {
        Lib.mergeArray(marker.opacity, cd, 'mo', true);
        Lib.mergeArray(marker.color, cd, 'mc');

        var markerLine = marker.line;
        if(markerLine) {
            Lib.mergeArray(markerLine.color, cd, 'mlc');
            Lib.mergeArrayCastPositive(markerLine.width, cd, 'mlw');
        }
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvYmFyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2FycmF5c190b19jYWxjZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2V2ZW50X2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvbGF5b3V0X2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvbGF5b3V0X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9jYWxjX3NlbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbWFya2VyX2NvbG9yYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGlIQUE2Qzs7Ozs7Ozs7Ozs7O0FDVjdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVzs7QUFFN0I7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cUI7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLHVCQUF1QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydGQwOTVjYzFhZDk5Mjk1ZjA4NjBiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvYmFyJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuLy8gYXJyYXlPayBhdHRyaWJ1dGVzLCBtZXJnZSB0aGVtIGludG8gY2FsY2RhdGEgYXJyYXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIGNkW2ldLmkgPSBpO1xuXG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dCwgY2QsICd0eCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLmhvdmVydGV4dCwgY2QsICdodHgnKTtcblxuICAgIHZhciBtYXJrZXIgPSB0cmFjZS5tYXJrZXI7XG4gICAgaWYobWFya2VyKSB7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5vcGFjaXR5LCBjZCwgJ21vJywgdHJ1ZSk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5jb2xvciwgY2QsICdtYycpO1xuXG4gICAgICAgIHZhciBtYXJrZXJMaW5lID0gbWFya2VyLmxpbmU7XG4gICAgICAgIGlmKG1hcmtlckxpbmUpIHtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckxpbmUuY29sb3IsIGNkLCAnbWxjJyk7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXJMaW5lLndpZHRoLCBjZCwgJ21sdycpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIGhhc0NvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvaGVscGVycycpLmhhc0NvbG9yc2NhbGU7XG52YXIgY29sb3JzY2FsZUNhbGMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvY2FsYycpO1xudmFyIGFycmF5c1RvQ2FsY2RhdGEgPSByZXF1aXJlKCcuL2FycmF5c190b19jYWxjZGF0YScpO1xudmFyIGNhbGNTZWxlY3Rpb24gPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NhbGNfc2VsZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgeGEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueGF4aXMgfHwgJ3gnKTtcbiAgICB2YXIgeWEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueWF4aXMgfHwgJ3knKTtcbiAgICB2YXIgc2l6ZSwgcG9zO1xuXG4gICAgdmFyIHNpemVPcHRzID0ge1xuICAgICAgICBtc1VUQzogISEodHJhY2UuYmFzZSB8fCB0cmFjZS5iYXNlID09PSAwKVxuICAgIH07XG5cbiAgICBpZih0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICAgIHNpemUgPSB4YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd4Jywgc2l6ZU9wdHMpO1xuICAgICAgICBwb3MgPSB5YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2l6ZSA9IHlhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3knLCBzaXplT3B0cyk7XG4gICAgICAgIHBvcyA9IHhhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3gnKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGhlIFwiY2FsY3VsYXRlZCBkYXRhXCIgdG8gcGxvdFxuICAgIHZhciBzZXJpZXNsZW4gPSBNYXRoLm1pbihwb3MubGVuZ3RoLCBzaXplLmxlbmd0aCk7XG4gICAgdmFyIGNkID0gbmV3IEFycmF5KHNlcmllc2xlbik7XG5cbiAgICAvLyBzZXQgcG9zaXRpb24gYW5kIHNpemVcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VyaWVzbGVuOyBpKyspIHtcbiAgICAgICAgY2RbaV0gPSB7IHA6IHBvc1tpXSwgczogc2l6ZVtpXSB9O1xuXG4gICAgICAgIGlmKHRyYWNlLmlkcykge1xuICAgICAgICAgICAgY2RbaV0uaWQgPSBTdHJpbmcodHJhY2UuaWRzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGF1dG8teiBhbmQgYXV0b2NvbG9yc2NhbGUgaWYgYXBwbGljYWJsZVxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXInKSkge1xuICAgICAgICBjb2xvcnNjYWxlQ2FsYyhnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgIHZhbHM6IHRyYWNlLm1hcmtlci5jb2xvcixcbiAgICAgICAgICAgIGNvbnRhaW5lclN0cjogJ21hcmtlcicsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXIubGluZScpKSB7XG4gICAgICAgIGNvbG9yc2NhbGVDYWxjKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgdmFsczogdHJhY2UubWFya2VyLmxpbmUuY29sb3IsXG4gICAgICAgICAgICBjb250YWluZXJTdHI6ICdtYXJrZXIubGluZScsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpO1xuICAgIGNhbGNTZWxlY3Rpb24oY2QsIHRyYWNlKTtcblxuICAgIHJldHVybiBjZDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlbnREYXRhKG91dCwgcHQsIHRyYWNlKSB7XG4gICAgLy8gc3RhbmRhcmQgY2FydGVzaWFuIGV2ZW50IGRhdGFcbiAgICBvdXQueCA9ICd4VmFsJyBpbiBwdCA/IHB0LnhWYWwgOiBwdC54O1xuICAgIG91dC55ID0gJ3lWYWwnIGluIHB0ID8gcHQueVZhbCA6IHB0Lnk7XG4gICAgaWYocHQueGEpIG91dC54YXhpcyA9IHB0LnhhO1xuICAgIGlmKHB0LnlhKSBvdXQueWF4aXMgPSBwdC55YTtcblxuICAgIGlmKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgb3V0LmxhYmVsID0gb3V0Lnk7XG4gICAgICAgIG91dC52YWx1ZSA9IG91dC54O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dC5sYWJlbCA9IG91dC54O1xuICAgICAgICBvdXQudmFsdWUgPSBvdXQueTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgbGF5b3V0QXR0cmlidXRlczogcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJykuc3VwcGx5RGVmYXVsdHMsXG4gICAgY3Jvc3NUcmFjZURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJykuY3Jvc3NUcmFjZURlZmF1bHRzLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIGNyb3NzVHJhY2VDYWxjOiByZXF1aXJlKCcuL2Nyb3NzX3RyYWNlX2NhbGMnKS5jcm9zc1RyYWNlQ2FsYyxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi4vc2NhdHRlci9tYXJrZXJfY29sb3JiYXInKSxcbiAgICBhcnJheXNUb0NhbGNkYXRhOiByZXF1aXJlKCcuL2FycmF5c190b19jYWxjZGF0YScpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLnBsb3QsXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKS5zdHlsZSxcbiAgICBzdHlsZU9uU2VsZWN0OiByZXF1aXJlKCcuL3N0eWxlJykuc3R5bGVPblNlbGVjdCxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLmhvdmVyUG9pbnRzLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi9ldmVudF9kYXRhJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuL3NlbGVjdCcpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnYmFyJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydiYXItbGlrZScsICdjYXJ0ZXNpYW4nLCAnc3ZnJywgJ2JhcicsICdvcmllbnRlZCcsICdlcnJvckJhcnNPSycsICdzaG93TGVnZW5kJywgJ3pvb21TY2FsZSddLFxuICAgIGFuaW1hdGFibGU6IHRydWUsXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBkYXRhIHZpc3VhbGl6ZWQgYnkgdGhlIHNwYW4gb2YgdGhlIGJhcnMgaXMgc2V0IGluIGB5YCcsXG4gICAgICAgICAgICAnaWYgYG9yaWVudGF0aW9uYCBpcyBzZXQgdGggKnYqICh0aGUgZGVmYXVsdCknLFxuICAgICAgICAgICAgJ2FuZCB0aGUgbGFiZWxzIGFyZSBzZXQgaW4gYHhgLicsXG4gICAgICAgICAgICAnQnkgc2V0dGluZyBgb3JpZW50YXRpb25gIHRvICpoKiwgdGhlIHJvbGVzIGFyZSBpbnRlcmNoYW5nZWQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYmFybW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydzdGFjaycsICdncm91cCcsICdvdmVybGF5JywgJ3JlbGF0aXZlJ10sXG4gICAgICAgIGRmbHQ6ICdncm91cCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIGhvdyBiYXJzIGF0IHRoZSBzYW1lIGxvY2F0aW9uIGNvb3JkaW5hdGUnLFxuICAgICAgICAgICAgJ2FyZSBkaXNwbGF5ZWQgb24gdGhlIGdyYXBoLicsXG4gICAgICAgICAgICAnV2l0aCAqc3RhY2sqLCB0aGUgYmFycyBhcmUgc3RhY2tlZCBvbiB0b3Agb2Ygb25lIGFub3RoZXInLFxuICAgICAgICAgICAgJ1dpdGggKnJlbGF0aXZlKiwgdGhlIGJhcnMgYXJlIHN0YWNrZWQgb24gdG9wIG9mIG9uZSBhbm90aGVyLCcsXG4gICAgICAgICAgICAnd2l0aCBuZWdhdGl2ZSB2YWx1ZXMgYmVsb3cgdGhlIGF4aXMsIHBvc2l0aXZlIHZhbHVlcyBhYm92ZScsXG4gICAgICAgICAgICAnV2l0aCAqZ3JvdXAqLCB0aGUgYmFycyBhcmUgcGxvdHRlZCBuZXh0IHRvIG9uZSBhbm90aGVyJyxcbiAgICAgICAgICAgICdjZW50ZXJlZCBhcm91bmQgdGhlIHNoYXJlZCBsb2NhdGlvbi4nLFxuICAgICAgICAgICAgJ1dpdGggKm92ZXJsYXkqLCB0aGUgYmFycyBhcmUgcGxvdHRlZCBvdmVyIG9uZSBhbm90aGVyLCcsXG4gICAgICAgICAgICAneW91IG1pZ2h0IG5lZWQgdG8gYW4gKm9wYWNpdHkqIHRvIHNlZSBtdWx0aXBsZSBiYXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJhcm5vcm06IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnJywgJ2ZyYWN0aW9uJywgJ3BlcmNlbnQnXSxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBub3JtYWxpemF0aW9uIGZvciBiYXIgdHJhY2VzIG9uIHRoZSBncmFwaC4nLFxuICAgICAgICAgICAgJ1dpdGggKmZyYWN0aW9uKiwgdGhlIHZhbHVlIG9mIGVhY2ggYmFyIGlzIGRpdmlkZWQgYnkgdGhlIHN1bSBvZiBhbGwnLFxuICAgICAgICAgICAgJ3ZhbHVlcyBhdCB0aGF0IGxvY2F0aW9uIGNvb3JkaW5hdGUuJyxcbiAgICAgICAgICAgICcqcGVyY2VudCogaXMgdGhlIHNhbWUgYnV0IG11bHRpcGxpZWQgYnkgMTAwIHRvIHNob3cgcGVyY2VudGFnZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYmFyZ2FwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBnYXAgKGluIHBsb3QgZnJhY3Rpb24pIGJldHdlZW4gYmFycyBvZicsXG4gICAgICAgICAgICAnYWRqYWNlbnQgbG9jYXRpb24gY29vcmRpbmF0ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYmFyZ3JvdXBnYXA6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGdhcCAoaW4gcGxvdCBmcmFjdGlvbikgYmV0d2VlbiBiYXJzIG9mJyxcbiAgICAgICAgICAgICd0aGUgc2FtZSBsb2NhdGlvbiBjb29yZGluYXRlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgbGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGxheW91dEluLCBsYXlvdXRPdXQsIGxheW91dEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBoYXNCYXJzID0gZmFsc2U7XG4gICAgdmFyIHNob3VsZEJlR2FwbGVzcyA9IGZhbHNlO1xuICAgIHZhciBnYXBwZWRBbnl3YXkgPSBmYWxzZTtcbiAgICB2YXIgdXNlZFN1YnBsb3RzID0ge307XG5cbiAgICB2YXIgbW9kZSA9IGNvZXJjZSgnYmFybW9kZScpO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IGZ1bGxEYXRhW2ldO1xuICAgICAgICBpZihSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAnYmFyJykgJiYgdHJhY2UudmlzaWJsZSkgaGFzQmFycyA9IHRydWU7XG4gICAgICAgIGVsc2UgY29udGludWU7XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhdCBsZWFzdCAyIGdyb3VwZWQgYmFyIHRyYWNlcyBvbiB0aGUgc2FtZSBzdWJwbG90LFxuICAgICAgICAvLyB3ZSBzaG91bGQgZGVmYXVsdCB0byBhIGdhcCBhbnl3YXksIGV2ZW4gaWYgdGhlIGRhdGEgaXMgaGlzdG9ncmFtc1xuICAgICAgICBpZihtb2RlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICB2YXIgc3VicGxvdGkgPSB0cmFjZS54YXhpcyArIHRyYWNlLnlheGlzO1xuICAgICAgICAgICAgaWYodXNlZFN1YnBsb3RzW3N1YnBsb3RpXSkgZ2FwcGVkQW55d2F5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHVzZWRTdWJwbG90c1tzdWJwbG90aV0gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJhY2UudmlzaWJsZSAmJiB0cmFjZS50eXBlID09PSAnaGlzdG9ncmFtJykge1xuICAgICAgICAgICAgdmFyIHBhID0gQXhlcy5nZXRGcm9tSWQoe19mdWxsTGF5b3V0OiBsYXlvdXRPdXR9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VbdHJhY2Uub3JpZW50YXRpb24gPT09ICd2JyA/ICd4YXhpcycgOiAneWF4aXMnXSk7XG4gICAgICAgICAgICBpZihwYS50eXBlICE9PSAnY2F0ZWdvcnknKSBzaG91bGRCZUdhcGxlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIWhhc0JhcnMpIHtcbiAgICAgICAgZGVsZXRlIGxheW91dE91dC5iYXJtb2RlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYobW9kZSAhPT0gJ292ZXJsYXknKSBjb2VyY2UoJ2Jhcm5vcm0nKTtcblxuICAgIGNvZXJjZSgnYmFyZ2FwJywgKHNob3VsZEJlR2FwbGVzcyAmJiAhZ2FwcGVkQW55d2F5KSA/IDAgOiAwLjIpO1xuICAgIGNvZXJjZSgnYmFyZ3JvdXBnYXAnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjU2VsZWN0aW9uKGNkLCB0cmFjZSkge1xuICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlLnNlbGVjdGVkcG9pbnRzKSkge1xuICAgICAgICBMaWIudGFnU2VsZWN0ZWQoY2QsIHRyYWNlKTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjogJ21hcmtlcicsXG4gICAgbWluOiAnY21pbicsXG4gICAgbWF4OiAnY21heCdcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9