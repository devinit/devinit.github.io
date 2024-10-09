(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_index-mapbox_js-node_modules_plotly_js_src_plots_subplot_defaults_-378886"],{

/***/ "./node_modules/plotly.js/lib/index-mapbox.js":
/*!****************************************************!*\
  !*** ./node_modules/plotly.js/lib/index-mapbox.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Plotly = __webpack_require__(/*! ./core */ "./node_modules/plotly.js/lib/core.js");

Plotly.register([
    __webpack_require__(/*! ./scattermapbox */ "./node_modules/plotly.js/lib/scattermapbox.js"),
    __webpack_require__(/*! ./choroplethmapbox */ "./node_modules/plotly.js/lib/choroplethmapbox.js"),
    __webpack_require__(/*! ./densitymapbox */ "./node_modules/plotly.js/lib/densitymapbox.js")
]);

module.exports = Plotly;


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/subplot_defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/subplot_defaults.js ***!
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




var Lib = __webpack_require__(/*! ../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Template = __webpack_require__(/*! ../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");
var handleDomainDefaults = __webpack_require__(/*! ./domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;


/**
 * Find and supply defaults to all subplots of a given type
 * This handles subplots that are contained within one container - so
 * gl3d, geo, ternary... but not 2d axes which have separate x and y axes
 * finds subplots, coerces their `domain` attributes, then calls the
 * given handleDefaults function to fill in everything else.
 *
 * layoutIn: the complete user-supplied input layout
 * layoutOut: the complete finished layout
 * fullData: the finished data array, used only to find subplots
 * opts: {
 *  type: subplot type string
 *  attributes: subplot attributes object
 *  partition: 'x' or 'y', which direction to divide domain space by default
 *      (default 'x', ie side-by-side subplots)
 *      TODO: this option is only here because 3D and geo made opposite
 *      choices in this regard previously and I didn't want to change it.
 *      Instead we should do:
 *      - something consistent
 *      - something more square (4 cuts 2x2, 5/6 cuts 2x3, etc.)
 *      - something that includes all subplot types in one arrangement,
 *        now that we can have them together!
 *  handleDefaults: function of (subplotLayoutIn, subplotLayoutOut, coerce, opts)
 *      this opts object is passed through to handleDefaults, so attach any
 *      additional items needed by this function here as well
 * }
 */
module.exports = function handleSubplotDefaults(layoutIn, layoutOut, fullData, opts) {
    var subplotType = opts.type;
    var subplotAttributes = opts.attributes;
    var handleDefaults = opts.handleDefaults;
    var partition = opts.partition || 'x';

    var ids = layoutOut._subplots[subplotType];
    var idsLength = ids.length;

    var baseId = idsLength && ids[0].replace(/\d+$/, '');

    var subplotLayoutIn, subplotLayoutOut;

    function coerce(attr, dflt) {
        return Lib.coerce(subplotLayoutIn, subplotLayoutOut, subplotAttributes, attr, dflt);
    }

    for(var i = 0; i < idsLength; i++) {
        var id = ids[i];

        // ternary traces get a layout ternary for free!
        if(layoutIn[id]) subplotLayoutIn = layoutIn[id];
        else subplotLayoutIn = layoutIn[id] = {};

        subplotLayoutOut = Template.newContainer(layoutOut, id, baseId);

        // All subplot containers get a `uirevision` inheriting from the base.
        // Currently all subplots containers have some user interaction
        // attributes, but if we ever add one that doesn't, we would need an
        // option to skip this step.
        coerce('uirevision', layoutOut.uirevision);

        var dfltDomains = {};
        dfltDomains[partition] = [i / idsLength, (i + 1) / idsLength];
        handleDomainDefaults(subplotLayoutOut, layoutOut, coerce, dfltDomains);

        opts.id = id;
        handleDefaults(subplotLayoutIn, subplotLayoutOut, coerce, opts);
    }
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaW5kZXgtbWFwYm94LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9zdWJwbG90X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci94eV9kZWZhdWx0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsb0RBQVE7O0FBRTdCO0FBQ0EsSUFBSSxtQkFBTyxDQUFDLHNFQUFpQjtBQUM3QixJQUFJLG1CQUFPLENBQUMsNEVBQW9CO0FBQ2hDLElBQUksbUJBQU8sQ0FBQyxzRUFBaUI7QUFDN0I7O0FBRUE7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLHlEQUFRO0FBQzFCLGVBQWUsbUJBQU8sQ0FBQyx5RkFBMkI7QUFDbEQsMkJBQTJCLDRGQUE0Qjs7O0FBR3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGVBQWU7QUFDakM7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydDNmZmYzMGQyMjAyMTExZWQ1MjkyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUGxvdGx5ID0gcmVxdWlyZSgnLi9jb3JlJyk7XG5cblBsb3RseS5yZWdpc3RlcihbXG4gICAgcmVxdWlyZSgnLi9zY2F0dGVybWFwYm94JyksXG4gICAgcmVxdWlyZSgnLi9jaG9yb3BsZXRobWFwYm94JyksXG4gICAgcmVxdWlyZSgnLi9kZW5zaXR5bWFwYm94Jylcbl0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsb3RseTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vbGliJyk7XG52YXIgVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9wbG90X2FwaS9wbG90X3RlbXBsYXRlJyk7XG52YXIgaGFuZGxlRG9tYWluRGVmYXVsdHMgPSByZXF1aXJlKCcuL2RvbWFpbicpLmRlZmF1bHRzO1xuXG5cbi8qKlxuICogRmluZCBhbmQgc3VwcGx5IGRlZmF1bHRzIHRvIGFsbCBzdWJwbG90cyBvZiBhIGdpdmVuIHR5cGVcbiAqIFRoaXMgaGFuZGxlcyBzdWJwbG90cyB0aGF0IGFyZSBjb250YWluZWQgd2l0aGluIG9uZSBjb250YWluZXIgLSBzb1xuICogZ2wzZCwgZ2VvLCB0ZXJuYXJ5Li4uIGJ1dCBub3QgMmQgYXhlcyB3aGljaCBoYXZlIHNlcGFyYXRlIHggYW5kIHkgYXhlc1xuICogZmluZHMgc3VicGxvdHMsIGNvZXJjZXMgdGhlaXIgYGRvbWFpbmAgYXR0cmlidXRlcywgdGhlbiBjYWxscyB0aGVcbiAqIGdpdmVuIGhhbmRsZURlZmF1bHRzIGZ1bmN0aW9uIHRvIGZpbGwgaW4gZXZlcnl0aGluZyBlbHNlLlxuICpcbiAqIGxheW91dEluOiB0aGUgY29tcGxldGUgdXNlci1zdXBwbGllZCBpbnB1dCBsYXlvdXRcbiAqIGxheW91dE91dDogdGhlIGNvbXBsZXRlIGZpbmlzaGVkIGxheW91dFxuICogZnVsbERhdGE6IHRoZSBmaW5pc2hlZCBkYXRhIGFycmF5LCB1c2VkIG9ubHkgdG8gZmluZCBzdWJwbG90c1xuICogb3B0czoge1xuICogIHR5cGU6IHN1YnBsb3QgdHlwZSBzdHJpbmdcbiAqICBhdHRyaWJ1dGVzOiBzdWJwbG90IGF0dHJpYnV0ZXMgb2JqZWN0XG4gKiAgcGFydGl0aW9uOiAneCcgb3IgJ3knLCB3aGljaCBkaXJlY3Rpb24gdG8gZGl2aWRlIGRvbWFpbiBzcGFjZSBieSBkZWZhdWx0XG4gKiAgICAgIChkZWZhdWx0ICd4JywgaWUgc2lkZS1ieS1zaWRlIHN1YnBsb3RzKVxuICogICAgICBUT0RPOiB0aGlzIG9wdGlvbiBpcyBvbmx5IGhlcmUgYmVjYXVzZSAzRCBhbmQgZ2VvIG1hZGUgb3Bwb3NpdGVcbiAqICAgICAgY2hvaWNlcyBpbiB0aGlzIHJlZ2FyZCBwcmV2aW91c2x5IGFuZCBJIGRpZG4ndCB3YW50IHRvIGNoYW5nZSBpdC5cbiAqICAgICAgSW5zdGVhZCB3ZSBzaG91bGQgZG86XG4gKiAgICAgIC0gc29tZXRoaW5nIGNvbnNpc3RlbnRcbiAqICAgICAgLSBzb21ldGhpbmcgbW9yZSBzcXVhcmUgKDQgY3V0cyAyeDIsIDUvNiBjdXRzIDJ4MywgZXRjLilcbiAqICAgICAgLSBzb21ldGhpbmcgdGhhdCBpbmNsdWRlcyBhbGwgc3VicGxvdCB0eXBlcyBpbiBvbmUgYXJyYW5nZW1lbnQsXG4gKiAgICAgICAgbm93IHRoYXQgd2UgY2FuIGhhdmUgdGhlbSB0b2dldGhlciFcbiAqICBoYW5kbGVEZWZhdWx0czogZnVuY3Rpb24gb2YgKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgY29lcmNlLCBvcHRzKVxuICogICAgICB0aGlzIG9wdHMgb2JqZWN0IGlzIHBhc3NlZCB0aHJvdWdoIHRvIGhhbmRsZURlZmF1bHRzLCBzbyBhdHRhY2ggYW55XG4gKiAgICAgIGFkZGl0aW9uYWwgaXRlbXMgbmVlZGVkIGJ5IHRoaXMgZnVuY3Rpb24gaGVyZSBhcyB3ZWxsXG4gKiB9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlU3VicGxvdERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhLCBvcHRzKSB7XG4gICAgdmFyIHN1YnBsb3RUeXBlID0gb3B0cy50eXBlO1xuICAgIHZhciBzdWJwbG90QXR0cmlidXRlcyA9IG9wdHMuYXR0cmlidXRlcztcbiAgICB2YXIgaGFuZGxlRGVmYXVsdHMgPSBvcHRzLmhhbmRsZURlZmF1bHRzO1xuICAgIHZhciBwYXJ0aXRpb24gPSBvcHRzLnBhcnRpdGlvbiB8fCAneCc7XG5cbiAgICB2YXIgaWRzID0gbGF5b3V0T3V0Ll9zdWJwbG90c1tzdWJwbG90VHlwZV07XG4gICAgdmFyIGlkc0xlbmd0aCA9IGlkcy5sZW5ndGg7XG5cbiAgICB2YXIgYmFzZUlkID0gaWRzTGVuZ3RoICYmIGlkc1swXS5yZXBsYWNlKC9cXGQrJC8sICcnKTtcblxuICAgIHZhciBzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQ7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIHN1YnBsb3RBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaWRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0gaWRzW2ldO1xuXG4gICAgICAgIC8vIHRlcm5hcnkgdHJhY2VzIGdldCBhIGxheW91dCB0ZXJuYXJ5IGZvciBmcmVlIVxuICAgICAgICBpZihsYXlvdXRJbltpZF0pIHN1YnBsb3RMYXlvdXRJbiA9IGxheW91dEluW2lkXTtcbiAgICAgICAgZWxzZSBzdWJwbG90TGF5b3V0SW4gPSBsYXlvdXRJbltpZF0gPSB7fTtcblxuICAgICAgICBzdWJwbG90TGF5b3V0T3V0ID0gVGVtcGxhdGUubmV3Q29udGFpbmVyKGxheW91dE91dCwgaWQsIGJhc2VJZCk7XG5cbiAgICAgICAgLy8gQWxsIHN1YnBsb3QgY29udGFpbmVycyBnZXQgYSBgdWlyZXZpc2lvbmAgaW5oZXJpdGluZyBmcm9tIHRoZSBiYXNlLlxuICAgICAgICAvLyBDdXJyZW50bHkgYWxsIHN1YnBsb3RzIGNvbnRhaW5lcnMgaGF2ZSBzb21lIHVzZXIgaW50ZXJhY3Rpb25cbiAgICAgICAgLy8gYXR0cmlidXRlcywgYnV0IGlmIHdlIGV2ZXIgYWRkIG9uZSB0aGF0IGRvZXNuJ3QsIHdlIHdvdWxkIG5lZWQgYW5cbiAgICAgICAgLy8gb3B0aW9uIHRvIHNraXAgdGhpcyBzdGVwLlxuICAgICAgICBjb2VyY2UoJ3VpcmV2aXNpb24nLCBsYXlvdXRPdXQudWlyZXZpc2lvbik7XG5cbiAgICAgICAgdmFyIGRmbHREb21haW5zID0ge307XG4gICAgICAgIGRmbHREb21haW5zW3BhcnRpdGlvbl0gPSBbaSAvIGlkc0xlbmd0aCwgKGkgKyAxKSAvIGlkc0xlbmd0aF07XG4gICAgICAgIGhhbmRsZURvbWFpbkRlZmF1bHRzKHN1YnBsb3RMYXlvdXRPdXQsIGxheW91dE91dCwgY29lcmNlLCBkZmx0RG9tYWlucyk7XG5cbiAgICAgICAgb3B0cy5pZCA9IGlkO1xuICAgICAgICBoYW5kbGVEZWZhdWx0cyhzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIGNvZXJjZSwgb3B0cyk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVYWURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSkge1xuICAgIHZhciB4ID0gY29lcmNlKCd4Jyk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ3knKTtcbiAgICB2YXIgbGVuO1xuXG4gICAgdmFyIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2NhbGVuZGFycycsICdoYW5kbGVUcmFjZURlZmF1bHRzJyk7XG4gICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgWyd4JywgJ3knXSwgbGF5b3V0KTtcblxuICAgIGlmKHgpIHtcbiAgICAgICAgdmFyIHhsZW4gPSBMaWIubWluUm93TGVuZ3RoKHgpO1xuICAgICAgICBpZih5KSB7XG4gICAgICAgICAgICBsZW4gPSBNYXRoLm1pbih4bGVuLCBMaWIubWluUm93TGVuZ3RoKHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlbiA9IHhsZW47XG4gICAgICAgICAgICBjb2VyY2UoJ3kwJyk7XG4gICAgICAgICAgICBjb2VyY2UoJ2R5Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZigheSkgcmV0dXJuIDA7XG5cbiAgICAgICAgbGVuID0gTGliLm1pblJvd0xlbmd0aCh5KTtcbiAgICAgICAgY29lcmNlKCd4MCcpO1xuICAgICAgICBjb2VyY2UoJ2R4Jyk7XG4gICAgfVxuXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IGxlbjtcblxuICAgIHJldHVybiBsZW47XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==