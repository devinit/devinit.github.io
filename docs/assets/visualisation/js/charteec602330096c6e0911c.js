(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_traces_scatter_get_trace_color_js-node_modules_plotly_js_src_trace-6f247f"],{

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

/***/ "./node_modules/plotly.js/src/traces/scatter3d/calc.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter3d/calc.js ***!
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



var arraysToCalcdata = __webpack_require__(/*! ../scatter/arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js");
var calcColorscale = __webpack_require__(/*! ../scatter/colorscale_calc */ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js");

/**
 * This is a kludge to put the array attributes into
 * calcdata the way Scatter.plot does, so that legends and
 * popovers know what to do with them.
 */
module.exports = function calc(gd, trace) {
    var cd = [{x: false, y: false, trace: trace, t: {}}];

    arraysToCalcdata(cd, trace);
    calcColorscale(gd, trace);

    return cd;
};


/***/ }),

/***/ "?a259":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvYXJyYXlzX3RvX2NhbGNkYXRhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL2dldF90cmFjZV9jb2xvci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIzZC9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvaWdub3JlZHwvaG9tZS9hbGV4L2dpdC9ESXdlYnNpdGUtcmVkZXNpZ24vbm9kZV9tb2R1bGVzL2JpZy1yYXQvbm9kZV9tb2R1bGVzL2JuLmpzL2xpYnxidWZmZXIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVzs7O0FBRzdCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixlQUFlOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLG9CQUFvQiw2SUFBNEQ7QUFDaEYscUJBQXFCLG1CQUFPLENBQUMsb0dBQWtDOztBQUUvRCxlQUFlLG1CQUFPLENBQUMsMkVBQVk7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsc0ZBQXdCO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQywyRUFBWTs7O0FBR25DO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsOENBQThDO0FBQzlDLGlEQUFpRCxZQUFZOztBQUU3RDtBQUNBO0FBQ0EsK0NBQStDLFlBQVk7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsdUJBQXVCLG1CQUFPLENBQUMsd0dBQStCO0FBQzlELHFCQUFxQixtQkFBTyxDQUFDLGtHQUE0Qjs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3Q0FBd0M7O0FBRXZEO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN6QkEsZSIsImZpbGUiOiJjaGFydGVlYzYwMjMzMDA5NmM2ZTA5MTFjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuXG4vLyBhcnJheU9rIGF0dHJpYnV0ZXMsIG1lcmdlIHRoZW0gaW50byBjYWxjZGF0YSBhcnJheVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheXNUb0NhbGNkYXRhKGNkLCB0cmFjZSkge1xuICAgIC8vIHNvIGVhY2ggcG9pbnQga25vd3Mgd2hpY2ggaW5kZXggaXQgb3JpZ2luYWxseSBjYW1lIGZyb21cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIGNkW2ldLmkgPSBpO1xuXG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dCwgY2QsICd0eCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLnRleHR0ZW1wbGF0ZSwgY2QsICd0eHQnKTtcbiAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS5ob3ZlcnRleHQsIGNkLCAnaHR4Jyk7XG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UuY3VzdG9tZGF0YSwgY2QsICdkYXRhJyk7XG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dHBvc2l0aW9uLCBjZCwgJ3RwJyk7XG4gICAgaWYodHJhY2UudGV4dGZvbnQpIHtcbiAgICAgICAgTGliLm1lcmdlQXJyYXlDYXN0UG9zaXRpdmUodHJhY2UudGV4dGZvbnQuc2l6ZSwgY2QsICd0cycpO1xuICAgICAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS50ZXh0Zm9udC5jb2xvciwgY2QsICd0YycpO1xuICAgICAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS50ZXh0Zm9udC5mYW1pbHksIGNkLCAndGYnKTtcbiAgICB9XG5cbiAgICB2YXIgbWFya2VyID0gdHJhY2UubWFya2VyO1xuICAgIGlmKG1hcmtlcikge1xuICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXIuc2l6ZSwgY2QsICdtcycpO1xuICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXIub3BhY2l0eSwgY2QsICdtbycpO1xuICAgICAgICBMaWIubWVyZ2VBcnJheShtYXJrZXIuc3ltYm9sLCBjZCwgJ214Jyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5jb2xvciwgY2QsICdtYycpO1xuXG4gICAgICAgIHZhciBtYXJrZXJMaW5lID0gbWFya2VyLmxpbmU7XG4gICAgICAgIGlmKG1hcmtlci5saW5lKSB7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheShtYXJrZXJMaW5lLmNvbG9yLCBjZCwgJ21sYycpO1xuICAgICAgICAgICAgTGliLm1lcmdlQXJyYXlDYXN0UG9zaXRpdmUobWFya2VyTGluZS53aWR0aCwgY2QsICdtbHcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXJrZXJHcmFkaWVudCA9IG1hcmtlci5ncmFkaWVudDtcbiAgICAgICAgaWYobWFya2VyR3JhZGllbnQgJiYgbWFya2VyR3JhZGllbnQudHlwZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheShtYXJrZXJHcmFkaWVudC50eXBlLCBjZCwgJ21ndCcpO1xuICAgICAgICAgICAgTGliLm1lcmdlQXJyYXkobWFya2VyR3JhZGllbnQuY29sb3IsIGNkLCAnbWdjJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjYWxjQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9jYWxjJyk7XG5cbnZhciBzdWJUeXBlcyA9IHJlcXVpcmUoJy4vc3VidHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjTWFya2VyQ29sb3JzY2FsZShnZCwgdHJhY2UpIHtcbiAgICBpZihzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZSkgJiYgaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ2xpbmUnKSkge1xuICAgICAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgIHZhbHM6IHRyYWNlLmxpbmUuY29sb3IsXG4gICAgICAgICAgICBjb250YWluZXJTdHI6ICdsaW5lJyxcbiAgICAgICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlKSkge1xuICAgICAgICBpZihoYXNDb2xvcnNjYWxlKHRyYWNlLCAnbWFya2VyJykpIHtcbiAgICAgICAgICAgIGNhbGNDb2xvcnNjYWxlKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgICAgIHZhbHM6IHRyYWNlLm1hcmtlci5jb2xvcixcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHI6ICdtYXJrZXInLFxuICAgICAgICAgICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ21hcmtlci5saW5lJykpIHtcbiAgICAgICAgICAgIGNhbGNDb2xvcnNjYWxlKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgICAgIHZhbHM6IHRyYWNlLm1hcmtlci5saW5lLmNvbG9yLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclN0cjogJ21hcmtlci5saW5lJyxcbiAgICAgICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgc3VidHlwZXMgPSByZXF1aXJlKCcuL3N1YnR5cGVzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRUcmFjZUNvbG9yKHRyYWNlLCBkaSkge1xuICAgIHZhciBsYywgdGM7XG5cbiAgICAvLyBUT0RPOiB0ZXh0IG1vZGVzXG5cbiAgICBpZih0cmFjZS5tb2RlID09PSAnbGluZXMnKSB7XG4gICAgICAgIGxjID0gdHJhY2UubGluZS5jb2xvcjtcbiAgICAgICAgcmV0dXJuIChsYyAmJiBDb2xvci5vcGFjaXR5KGxjKSkgP1xuICAgICAgICAgICAgbGMgOiB0cmFjZS5maWxsY29sb3I7XG4gICAgfSBlbHNlIGlmKHRyYWNlLm1vZGUgPT09ICdub25lJykge1xuICAgICAgICByZXR1cm4gdHJhY2UuZmlsbCA/IHRyYWNlLmZpbGxjb2xvciA6ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtYyA9IGRpLm1jYyB8fCAodHJhY2UubWFya2VyIHx8IHt9KS5jb2xvcjtcbiAgICAgICAgdmFyIG1sYyA9IGRpLm1sY2MgfHwgKCh0cmFjZS5tYXJrZXIgfHwge30pLmxpbmUgfHwge30pLmNvbG9yO1xuXG4gICAgICAgIHRjID0gKG1jICYmIENvbG9yLm9wYWNpdHkobWMpKSA/IG1jIDpcbiAgICAgICAgICAgIChtbGMgJiYgQ29sb3Iub3BhY2l0eShtbGMpICYmXG4gICAgICAgICAgICAgICAgKGRpLm1sdyB8fCAoKHRyYWNlLm1hcmtlciB8fCB7fSkubGluZSB8fCB7fSkud2lkdGgpKSA/IG1sYyA6ICcnO1xuXG4gICAgICAgIGlmKHRjKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHBvaW50cyBhcmVuJ3QgVE9PIHRyYW5zcGFyZW50XG4gICAgICAgICAgICBpZihDb2xvci5vcGFjaXR5KHRjKSA8IDAuMykge1xuICAgICAgICAgICAgICAgIHJldHVybiBDb2xvci5hZGRPcGFjaXR5KHRjLCAwLjMpO1xuICAgICAgICAgICAgfSBlbHNlIHJldHVybiB0YztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxjID0gKHRyYWNlLmxpbmUgfHwge30pLmNvbG9yO1xuICAgICAgICAgICAgcmV0dXJuIChsYyAmJiBDb2xvci5vcGFjaXR5KGxjKSAmJlxuICAgICAgICAgICAgICAgIHN1YnR5cGVzLmhhc0xpbmVzKHRyYWNlKSAmJiB0cmFjZS5saW5lLndpZHRoKSA/XG4gICAgICAgICAgICAgICAgICAgIGxjIDogdHJhY2UuZmlsbGNvbG9yO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFycmF5c1RvQ2FsY2RhdGEgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2FycmF5c190b19jYWxjZGF0YScpO1xudmFyIGNhbGNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMnKTtcblxuLyoqXG4gKiBUaGlzIGlzIGEga2x1ZGdlIHRvIHB1dCB0aGUgYXJyYXkgYXR0cmlidXRlcyBpbnRvXG4gKiBjYWxjZGF0YSB0aGUgd2F5IFNjYXR0ZXIucGxvdCBkb2VzLCBzbyB0aGF0IGxlZ2VuZHMgYW5kXG4gKiBwb3BvdmVycyBrbm93IHdoYXQgdG8gZG8gd2l0aCB0aGVtLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIGNkID0gW3t4OiBmYWxzZSwgeTogZmFsc2UsIHRyYWNlOiB0cmFjZSwgdDoge319XTtcblxuICAgIGFycmF5c1RvQ2FsY2RhdGEoY2QsIHRyYWNlKTtcbiAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UpO1xuXG4gICAgcmV0dXJuIGNkO1xufTtcbiIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=