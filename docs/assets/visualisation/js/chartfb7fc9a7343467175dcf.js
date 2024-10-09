(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_box_js"],{

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvYm94LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYm94L2V2ZW50X2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9ib3gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9ib3gvc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUhBQTZDOzs7Ozs7Ozs7Ozs7QUNWN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQywyRUFBYztBQUN0QyxzQkFBc0IsbUJBQU8sQ0FBQyx5RkFBcUI7QUFDbkQsb0JBQW9CLDJHQUFvQztBQUN4RCx3QkFBd0IsK0dBQXdDO0FBQ2hFLDBCQUEwQiwrSEFBaUQ7QUFDM0UsVUFBVSxtQkFBTyxDQUFDLCtEQUFRO0FBQzFCLG9CQUFvQiwySEFBNEM7QUFDaEUsVUFBVSx5RkFBc0I7QUFDaEMsV0FBVyw0RkFBd0I7QUFDbkMsbUJBQW1CLG9HQUFnQztBQUNuRCxpQkFBaUIsa0dBQThCO0FBQy9DLGVBQWUsbUJBQU8sQ0FBQywyRUFBYztBQUNyQyxrQkFBa0IsbUJBQU8sQ0FBQyxtRUFBVTs7QUFFcEM7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLG9GQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixNQUFNO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxjQUFjLG1CQUFPLENBQUMsMEZBQTBCOztBQUVoRDtBQUNBOztBQUVBLG9DQUFvQywyQkFBMkIsRUFBRTs7QUFFakU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnRmYjdmYzlhNzM0MzQ2NzE3NWRjZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL2JveCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV2ZW50RGF0YShvdXQsIHB0KSB7XG4gICAgLy8gTm90ZTogaG92ZXJPbkJveCBwcm9wZXJ0eSBpcyBuZWVkZWQgZm9yIGNsaWNrLXRvLXNlbGVjdFxuICAgIC8vIHRvIGlnbm9yZSB3aGVuIGEgYm94IHdhcyBjbGlja2VkLiBUaGlzIGlzIHRoZSByZWFzb24gYm94XG4gICAgLy8gaW1wbGVtZW50cyB0aGlzIGN1c3RvbSBldmVudERhdGEgZnVuY3Rpb24uXG4gICAgaWYocHQuaG92ZXJPbkJveCkgb3V0LmhvdmVyT25Cb3ggPSBwdC5ob3Zlck9uQm94O1xuXG4gICAgaWYoJ3hWYWwnIGluIHB0KSBvdXQueCA9IHB0LnhWYWw7XG4gICAgaWYoJ3lWYWwnIGluIHB0KSBvdXQueSA9IHB0LnlWYWw7XG4gICAgaWYocHQueGEpIG91dC54YXhpcyA9IHB0LnhhO1xuICAgIGlmKHB0LnlhKSBvdXQueWF4aXMgPSBwdC55YTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBsYXlvdXRBdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKS5zdXBwbHlEZWZhdWx0cyxcbiAgICBjcm9zc1RyYWNlRGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKS5jcm9zc1RyYWNlRGVmYXVsdHMsXG4gICAgc3VwcGx5TGF5b3V0RGVmYXVsdHM6IHJlcXVpcmUoJy4vbGF5b3V0X2RlZmF1bHRzJykuc3VwcGx5TGF5b3V0RGVmYXVsdHMsXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJyksXG4gICAgY3Jvc3NUcmFjZUNhbGM6IHJlcXVpcmUoJy4vY3Jvc3NfdHJhY2VfY2FsYycpLmNyb3NzVHJhY2VDYWxjLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLnBsb3QsXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKS5zdHlsZSxcbiAgICBzdHlsZU9uU2VsZWN0OiByZXF1aXJlKCcuL3N0eWxlJykuc3R5bGVPblNlbGVjdCxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLmhvdmVyUG9pbnRzLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi9ldmVudF9kYXRhJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuL3NlbGVjdCcpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnYm94JyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydjYXJ0ZXNpYW4nLCAnc3ZnJywgJ3N5bWJvbHMnLCAnb3JpZW50ZWQnLCAnYm94LXZpb2xpbicsICdzaG93TGVnZW5kJywgJ2JveExheW91dCcsICd6b29tU2NhbGUnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRWFjaCBib3ggc3BhbnMgZnJvbSBxdWFydGlsZSAxIChRMSkgdG8gcXVhcnRpbGUgMyAoUTMpLicsXG4gICAgICAgICAgICAnVGhlIHNlY29uZCBxdWFydGlsZSAoUTIsIGkuZS4gdGhlIG1lZGlhbikgaXMgbWFya2VkIGJ5IGEgbGluZSBpbnNpZGUgdGhlIGJveC4nLFxuICAgICAgICAgICAgJ1RoZSBmZW5jZXMgZ3JvdyBvdXR3YXJkIGZyb20gdGhlIGJveGVzXFwnIGVkZ2VzLCcsXG4gICAgICAgICAgICAnYnkgZGVmYXVsdCB0aGV5IHNwYW4gKy8tIDEuNSB0aW1lcyB0aGUgaW50ZXJxdWFydGlsZSByYW5nZSAoSVFSOiBRMy1RMSksJyxcbiAgICAgICAgICAgICdUaGUgc2FtcGxlIG1lYW4gYW5kIHN0YW5kYXJkIGRldmlhdGlvbiBhcyB3ZWxsIGFzIG5vdGNoZXMgYW5kJyxcbiAgICAgICAgICAgICd0aGUgc2FtcGxlLCBvdXRsaWVyIGFuZCBzdXNwZWN0ZWQgb3V0bGllcnMgcG9pbnRzIGNhbiBiZSBvcHRpb25hbGx5JyxcbiAgICAgICAgICAgICdhZGRlZCB0byB0aGUgYm94IHBsb3QuJyxcblxuICAgICAgICAgICAgJ1RoZSB2YWx1ZXMgYW5kIHBvc2l0aW9ucyBjb3JyZXNwb25kaW5nIHRvIGVhY2ggYm94ZXMgY2FuIGJlIGlucHV0JyxcbiAgICAgICAgICAgICd1c2luZyB0d28gc2lnbmF0dXJlcy4nLFxuXG4gICAgICAgICAgICAnVGhlIGZpcnN0IHNpZ25hdHVyZSBleHBlY3RzIHVzZXJzIHRvIHN1cHBseSB0aGUgc2FtcGxlIHZhbHVlcyBpbiB0aGUgYHlgJyxcbiAgICAgICAgICAgICdkYXRhIGFycmF5IGZvciB2ZXJ0aWNhbCBib3hlcyAoYHhgIGZvciBob3Jpem9udGFsIGJveGVzKS4nLFxuICAgICAgICAgICAgJ0J5IHN1cHBseWluZyBhbiBgeGAgKGB5YCkgYXJyYXksIG9uZSBib3ggcGVyIGRpc3RpbmN0IGB4YCAoYHlgKSB2YWx1ZSBpcyBkcmF3bicsXG4gICAgICAgICAgICAnSWYgbm8gYHhgIChgeWApIHthcnJheX0gaXMgcHJvdmlkZWQsIGEgc2luZ2xlIGJveCBpcyBkcmF3bi4nLFxuICAgICAgICAgICAgJ0luIHRoaXMgY2FzZSwgdGhlIGJveCBpcyBwb3NpdGlvbmVkIHdpdGggdGhlIHRyYWNlIGBuYW1lYCBvciB3aXRoIGB4MGAgKGB5MGApIGlmIHByb3ZpZGVkLicsXG5cbiAgICAgICAgICAgICdUaGUgc2Vjb25kIHNpZ25hdHVyZSBleHBlY3RzIHVzZXJzIHRvIHN1cHBseSB0aGUgYm94ZXMgY29ycmVzcG9uZGluZyBRMSwgbWVkaWFuIGFuZCBRMycsXG4gICAgICAgICAgICAnc3RhdGlzdGljcyBpbiB0aGUgYHExYCwgYG1lZGlhbmAgYW5kIGBxM2AgZGF0YSBhcnJheXMgcmVzcGVjdGl2ZWx5LicsXG4gICAgICAgICAgICAnT3RoZXIgYm94IGZlYXR1cmVzIHJlbHlpbmcgb24gc3RhdGlzdGljcyBuYW1lbHkgYGxvd2VyZmVuY2VgLCBgdXBwZXJmZW5jZWAsIGBub3RjaHNwYW5gJyxcbiAgICAgICAgICAgICdjYW4gYmUgc2V0IGRpcmVjdGx5IGJ5IHRoZSB1c2Vycy4nLFxuICAgICAgICAgICAgJ1RvIGhhdmUgcGxvdGx5IGNvbXB1dGUgdGhlbSBvciB0byBzaG93IHNhbXBsZSBwb2ludHMgYmVzaWRlcyB0aGUgYm94ZXMsJyxcbiAgICAgICAgICAgICd1c2VycyBjYW4gc2V0IHRoZSBgeWAgZGF0YSBhcnJheSBmb3IgdmVydGljYWwgYm94ZXMgKGB4YCBmb3IgaG9yaXpvbnRhbCBib3hlcyknLFxuICAgICAgICAgICAgJ3RvIGEgMkQgYXJyYXkgd2l0aCB0aGUgb3V0ZXIgbGVuZ3RoIGNvcnJlc3BvbmRpbmcnLFxuICAgICAgICAgICAgJ3RvIHRoZSBudW1iZXIgb2YgYm94ZXMgaW4gdGhlIHRyYWNlcyBhbmQgdGhlIGlubmVyIGxlbmd0aCBjb3JyZXNwb25kaW5nIHRoZSBzYW1wbGUgc2l6ZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG5cbmZ1bmN0aW9uIHN0eWxlKGdkLCBjZCwgc2VsKSB7XG4gICAgdmFyIHMgPSBzZWwgPyBzZWwgOiBkMy5zZWxlY3QoZ2QpLnNlbGVjdEFsbCgnZy50cmFjZS5ib3hlcycpO1xuXG4gICAgcy5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRbMF0udHJhY2Uub3BhY2l0eTsgfSk7XG5cbiAgICBzLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciB0cmFjZSA9IGRbMF0udHJhY2U7XG4gICAgICAgIHZhciBsaW5lV2lkdGggPSB0cmFjZS5saW5lLndpZHRoO1xuXG4gICAgICAgIGZ1bmN0aW9uIHN0eWxlQm94KGJveFNlbCwgbGluZVdpZHRoLCBsaW5lQ29sb3IsIGZpbGxDb2xvcikge1xuICAgICAgICAgICAgYm94U2VsLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBsaW5lV2lkdGggKyAncHgnKVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgbGluZUNvbG9yKVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLmZpbGwsIGZpbGxDb2xvcik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWxsQm94ZXMgPSBlbC5zZWxlY3RBbGwoJ3BhdGguYm94Jyk7XG5cbiAgICAgICAgaWYodHJhY2UudHlwZSA9PT0gJ2NhbmRsZXN0aWNrJykge1xuICAgICAgICAgICAgYWxsQm94ZXMuZWFjaChmdW5jdGlvbihib3hEYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYoYm94RGF0YS5lbXB0eSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRoaXNCb3ggPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRyYWNlW2JveERhdGEuZGlyXTsgLy8gZGlyID0gJ2luY3JlYXNpbmcnIG9yICdkZWNyZWFzaW5nJ1xuICAgICAgICAgICAgICAgIHN0eWxlQm94KHRoaXNCb3gsIGNvbnRhaW5lci5saW5lLndpZHRoLCBjb250YWluZXIubGluZS5jb2xvciwgY29udGFpbmVyLmZpbGxjb2xvcik7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogY3VzdG9tIHNlbGVjdGlvbiBzdHlsZSBmb3IgY2FuZGxlc3RpY2tzXG4gICAgICAgICAgICAgICAgdGhpc0JveC5zdHlsZSgnb3BhY2l0eScsIHRyYWNlLnNlbGVjdGVkcG9pbnRzICYmICFib3hEYXRhLnNlbGVjdGVkID8gMC4zIDogMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlQm94KGFsbEJveGVzLCBsaW5lV2lkdGgsIHRyYWNlLmxpbmUuY29sb3IsIHRyYWNlLmZpbGxjb2xvcik7XG4gICAgICAgICAgICBlbC5zZWxlY3RBbGwoJ3BhdGgubWVhbicpXG4gICAgICAgICAgICAgICAgLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiAoMiAqIGxpbmVXaWR0aCkgKyAncHgsJyArIGxpbmVXaWR0aCArICdweCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgdHJhY2UubGluZS5jb2xvcik7XG5cbiAgICAgICAgICAgIHZhciBwdHMgPSBlbC5zZWxlY3RBbGwoJ3BhdGgucG9pbnQnKTtcbiAgICAgICAgICAgIERyYXdpbmcucG9pbnRTdHlsZShwdHMsIHRyYWNlLCBnZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3R5bGVPblNlbGVjdChnZCwgY2QsIHNlbCkge1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciBwdHMgPSBzZWwuc2VsZWN0QWxsKCdwYXRoLnBvaW50Jyk7XG5cbiAgICBpZih0cmFjZS5zZWxlY3RlZHBvaW50cykge1xuICAgICAgICBEcmF3aW5nLnNlbGVjdGVkUG9pbnRTdHlsZShwdHMsIHRyYWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBEcmF3aW5nLnBvaW50U3R5bGUocHRzLCB0cmFjZSwgZ2QpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIHN0eWxlT25TZWxlY3Q6IHN0eWxlT25TZWxlY3Rcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9