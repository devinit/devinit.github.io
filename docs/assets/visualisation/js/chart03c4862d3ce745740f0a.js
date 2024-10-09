(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["src_visualisation_plotly_custom_ts-node_modules_plotly_js_src_traces_scatter_xy_defaults_js"],{

/***/ "./src/visualisation/plotly.custom.ts":
/*!********************************************!*\
  !*** ./src/visualisation/plotly.custom.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newPlot": () => (/* reexport safe */ plotly_js_lib_core__WEBPACK_IMPORTED_MODULE_0__.newPlot),
/* harmony export */   "Plots": () => (/* reexport safe */ plotly_js_lib_core__WEBPACK_IMPORTED_MODULE_0__.Plots),
/* harmony export */   "purge": () => (/* reexport safe */ plotly_js_lib_core__WEBPACK_IMPORTED_MODULE_0__.purge),
/* harmony export */   "react": () => (/* reexport safe */ plotly_js_lib_core__WEBPACK_IMPORTED_MODULE_0__.react),
/* harmony export */   "register": () => (/* reexport safe */ plotly_js_lib_core__WEBPACK_IMPORTED_MODULE_0__.register),
/* harmony export */   "relayout": () => (/* reexport safe */ plotly_js_lib_core__WEBPACK_IMPORTED_MODULE_0__.relayout)
/* harmony export */ });
/* harmony import */ var plotly_js_lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! plotly.js/lib/core */ "./node_modules/plotly.js/lib/core.js");
/* harmony import */ var plotly_js_lib_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plotly_js_lib_core__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/xy_defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/xy_defaults.js ***!
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
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

module.exports = function handleXYDefaults(traceIn, traceOut, layout, coerce) {
    var x = coerce('x');
    var y = coerce('y');
    var len;

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y'], layout);

    if(x) {
        var xlen = Lib.minRowLength(x);
        if(y) {
            len = Math.min(xlen, Lib.minRowLength(y));
        } else {
            len = xlen;
            coerce('y0');
            coerce('dy');
        }
    } else {
        if(!y) return 0;

        len = Lib.minRowLength(y);
        coerce('x0');
        coerce('dx');
    }

    traceOut._length = len;

    return len;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIveHlfZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixlQUFlLG1CQUFPLENBQUMsZ0VBQWdCOztBQUV2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EiLCJmaWxlIjoiY2hhcnQwM2M0ODYyZDNjZTc0NTc0MGYwYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVYWURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSkge1xuICAgIHZhciB4ID0gY29lcmNlKCd4Jyk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ3knKTtcbiAgICB2YXIgbGVuO1xuXG4gICAgdmFyIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2NhbGVuZGFycycsICdoYW5kbGVUcmFjZURlZmF1bHRzJyk7XG4gICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgWyd4JywgJ3knXSwgbGF5b3V0KTtcblxuICAgIGlmKHgpIHtcbiAgICAgICAgdmFyIHhsZW4gPSBMaWIubWluUm93TGVuZ3RoKHgpO1xuICAgICAgICBpZih5KSB7XG4gICAgICAgICAgICBsZW4gPSBNYXRoLm1pbih4bGVuLCBMaWIubWluUm93TGVuZ3RoKHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlbiA9IHhsZW47XG4gICAgICAgICAgICBjb2VyY2UoJ3kwJyk7XG4gICAgICAgICAgICBjb2VyY2UoJ2R5Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZigheSkgcmV0dXJuIDA7XG5cbiAgICAgICAgbGVuID0gTGliLm1pblJvd0xlbmd0aCh5KTtcbiAgICAgICAgY29lcmNlKCd4MCcpO1xuICAgICAgICBjb2VyY2UoJ2R4Jyk7XG4gICAgfVxuXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IGxlbjtcblxuICAgIHJldHVybiBsZW47XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==