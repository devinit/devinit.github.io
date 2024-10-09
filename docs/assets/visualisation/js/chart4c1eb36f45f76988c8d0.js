(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_traces_carpet_makepath_js-node_modules_plotly_js_src_traces_carpet-b29e67"],{

/***/ "./node_modules/plotly.js/src/traces/carpet/makepath.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/makepath.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function makePath(xp, yp, isBicubic) {
    // Prevent d3 errors that would result otherwise:
    if(xp.length === 0) return '';

    var i;
    var path = [];
    var stride = isBicubic ? 3 : 1;
    for(i = 0; i < xp.length; i += stride) {
        path.push(xp[i] + ',' + yp[i]);

        if(isBicubic && i < xp.length - stride) {
            path.push('C');
            path.push([
                xp[i + 1] + ',' + yp[i + 1],
                xp[i + 2] + ',' + yp[i + 2] + ' ',
            ].join(' '));
        }
    }
    return path.join(isBicubic ? '' : 'L');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/map_1d_array.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/map_1d_array.js ***!
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



var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

/*
 * Map an array of x or y coordinates (c) to screen-space pixel coordinates (p).
 * The output array is optional, but if provided, it will be reused without
 * reallocation to the extent possible.
 */
module.exports = function mapArray(out, data, func) {
    var i;

    if(!isArrayOrTypedArray(out)) {
        // If not an array, make it an array:
        out = [];
    } else if(out.length > data.length) {
        // If too long, truncate. (If too short, it will grow
        // automatically so we don't care about that case)
        out = out.slice(0, data.length);
    }

    for(i = 0; i < data.length; i++) {
        out[i] = func(data[i]);
    }

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

module.exports = function handleXYZDefaults(traceIn, traceOut, coerce, layout, xName, yName) {
    var z = coerce('z');
    xName = xName || 'x';
    yName = yName || 'y';
    var x, y;

    if(z === undefined || !z.length) return 0;

    if(Lib.isArray1D(traceIn.z)) {
        x = coerce(xName);
        y = coerce(yName);

        var xlen = Lib.minRowLength(x);
        var ylen = Lib.minRowLength(y);

        // column z must be accompanied by xName and yName arrays
        if(xlen === 0 || ylen === 0) return 0;

        traceOut._length = Math.min(xlen, ylen, z.length);
    } else {
        x = coordDefaults(xName, coerce);
        y = coordDefaults(yName, coerce);

        // TODO put z validation elsewhere
        if(!isValidZ(z)) return 0;

        coerce('transpose');

        traceOut._length = null;
    }

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, [xName, yName], layout);

    return true;
};

function coordDefaults(coordStr, coerce) {
    var coord = coerce(coordStr);
    var coordType = coord ? coerce(coordStr + 'type', 'array') : 'scaled';

    if(coordType === 'scaled') {
        coerce(coordStr + '0');
        coerce('d' + coordStr);
    }

    return coord;
}

function isValidZ(z) {
    var allRowsAreArrays = true;
    var oneRowIsFilled = false;
    var hasOneNumber = false;
    var zi;

    /*
     * Without this step:
     *
     * hasOneNumber = false breaks contour but not heatmap
     * allRowsAreArrays = false breaks contour but not heatmap
     * oneRowIsFilled = false breaks both
     */

    for(var i = 0; i < z.length; i++) {
        zi = z[i];
        if(!Lib.isArrayOrTypedArray(zi)) {
            allRowsAreArrays = false;
            break;
        }
        if(zi.length > 0) oneRowIsFilled = true;
        for(var j = 0; j < zi.length; j++) {
            if(isNumeric(zi[j])) {
                hasOneNumber = true;
                break;
            }
        }
    }

    return (allRowsAreArrays && oneRowIsFilled && hasOneNumber);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9tYWtlcGF0aC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9tYXBfMWRfYXJyYXkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL3h5el9kZWZhdWx0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxlQUFlO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsMEJBQTBCLHFHQUF3Qzs7QUFFbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDhEQUFnQjtBQUN4QyxVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsY0FBYztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZUFBZTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydDRjMWViMzZmNDVmNzY5ODhjOGQwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1ha2VQYXRoKHhwLCB5cCwgaXNCaWN1YmljKSB7XG4gICAgLy8gUHJldmVudCBkMyBlcnJvcnMgdGhhdCB3b3VsZCByZXN1bHQgb3RoZXJ3aXNlOlxuICAgIGlmKHhwLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnO1xuXG4gICAgdmFyIGk7XG4gICAgdmFyIHBhdGggPSBbXTtcbiAgICB2YXIgc3RyaWRlID0gaXNCaWN1YmljID8gMyA6IDE7XG4gICAgZm9yKGkgPSAwOyBpIDwgeHAubGVuZ3RoOyBpICs9IHN0cmlkZSkge1xuICAgICAgICBwYXRoLnB1c2goeHBbaV0gKyAnLCcgKyB5cFtpXSk7XG5cbiAgICAgICAgaWYoaXNCaWN1YmljICYmIGkgPCB4cC5sZW5ndGggLSBzdHJpZGUpIHtcbiAgICAgICAgICAgIHBhdGgucHVzaCgnQycpO1xuICAgICAgICAgICAgcGF0aC5wdXNoKFtcbiAgICAgICAgICAgICAgICB4cFtpICsgMV0gKyAnLCcgKyB5cFtpICsgMV0sXG4gICAgICAgICAgICAgICAgeHBbaSArIDJdICsgJywnICsgeXBbaSArIDJdICsgJyAnLFxuICAgICAgICAgICAgXS5qb2luKCcgJykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXRoLmpvaW4oaXNCaWN1YmljID8gJycgOiAnTCcpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG4vKlxuICogTWFwIGFuIGFycmF5IG9mIHggb3IgeSBjb29yZGluYXRlcyAoYykgdG8gc2NyZWVuLXNwYWNlIHBpeGVsIGNvb3JkaW5hdGVzIChwKS5cbiAqIFRoZSBvdXRwdXQgYXJyYXkgaXMgb3B0aW9uYWwsIGJ1dCBpZiBwcm92aWRlZCwgaXQgd2lsbCBiZSByZXVzZWQgd2l0aG91dFxuICogcmVhbGxvY2F0aW9uIHRvIHRoZSBleHRlbnQgcG9zc2libGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWFwQXJyYXkob3V0LCBkYXRhLCBmdW5jKSB7XG4gICAgdmFyIGk7XG5cbiAgICBpZighaXNBcnJheU9yVHlwZWRBcnJheShvdXQpKSB7XG4gICAgICAgIC8vIElmIG5vdCBhbiBhcnJheSwgbWFrZSBpdCBhbiBhcnJheTpcbiAgICAgICAgb3V0ID0gW107XG4gICAgfSBlbHNlIGlmKG91dC5sZW5ndGggPiBkYXRhLmxlbmd0aCkge1xuICAgICAgICAvLyBJZiB0b28gbG9uZywgdHJ1bmNhdGUuIChJZiB0b28gc2hvcnQsIGl0IHdpbGwgZ3Jvd1xuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IHNvIHdlIGRvbid0IGNhcmUgYWJvdXQgdGhhdCBjYXNlKVxuICAgICAgICBvdXQgPSBvdXQuc2xpY2UoMCwgZGF0YS5sZW5ndGgpO1xuICAgIH1cblxuICAgIGZvcihpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb3V0W2ldID0gZnVuYyhkYXRhW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlWFlaRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0LCB4TmFtZSwgeU5hbWUpIHtcbiAgICB2YXIgeiA9IGNvZXJjZSgneicpO1xuICAgIHhOYW1lID0geE5hbWUgfHwgJ3gnO1xuICAgIHlOYW1lID0geU5hbWUgfHwgJ3knO1xuICAgIHZhciB4LCB5O1xuXG4gICAgaWYoeiA9PT0gdW5kZWZpbmVkIHx8ICF6Lmxlbmd0aCkgcmV0dXJuIDA7XG5cbiAgICBpZihMaWIuaXNBcnJheTFEKHRyYWNlSW4ueikpIHtcbiAgICAgICAgeCA9IGNvZXJjZSh4TmFtZSk7XG4gICAgICAgIHkgPSBjb2VyY2UoeU5hbWUpO1xuXG4gICAgICAgIHZhciB4bGVuID0gTGliLm1pblJvd0xlbmd0aCh4KTtcbiAgICAgICAgdmFyIHlsZW4gPSBMaWIubWluUm93TGVuZ3RoKHkpO1xuXG4gICAgICAgIC8vIGNvbHVtbiB6IG11c3QgYmUgYWNjb21wYW5pZWQgYnkgeE5hbWUgYW5kIHlOYW1lIGFycmF5c1xuICAgICAgICBpZih4bGVuID09PSAwIHx8IHlsZW4gPT09IDApIHJldHVybiAwO1xuXG4gICAgICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBNYXRoLm1pbih4bGVuLCB5bGVuLCB6Lmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IGNvb3JkRGVmYXVsdHMoeE5hbWUsIGNvZXJjZSk7XG4gICAgICAgIHkgPSBjb29yZERlZmF1bHRzKHlOYW1lLCBjb2VyY2UpO1xuXG4gICAgICAgIC8vIFRPRE8gcHV0IHogdmFsaWRhdGlvbiBlbHNld2hlcmVcbiAgICAgICAgaWYoIWlzVmFsaWRaKHopKSByZXR1cm4gMDtcblxuICAgICAgICBjb2VyY2UoJ3RyYW5zcG9zZScpO1xuXG4gICAgICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVDYWxlbmRhckRlZmF1bHRzID0gUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdjYWxlbmRhcnMnLCAnaGFuZGxlVHJhY2VEZWZhdWx0cycpO1xuICAgIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIFt4TmFtZSwgeU5hbWVdLCBsYXlvdXQpO1xuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBjb29yZERlZmF1bHRzKGNvb3JkU3RyLCBjb2VyY2UpIHtcbiAgICB2YXIgY29vcmQgPSBjb2VyY2UoY29vcmRTdHIpO1xuICAgIHZhciBjb29yZFR5cGUgPSBjb29yZCA/IGNvZXJjZShjb29yZFN0ciArICd0eXBlJywgJ2FycmF5JykgOiAnc2NhbGVkJztcblxuICAgIGlmKGNvb3JkVHlwZSA9PT0gJ3NjYWxlZCcpIHtcbiAgICAgICAgY29lcmNlKGNvb3JkU3RyICsgJzAnKTtcbiAgICAgICAgY29lcmNlKCdkJyArIGNvb3JkU3RyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29vcmQ7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRaKHopIHtcbiAgICB2YXIgYWxsUm93c0FyZUFycmF5cyA9IHRydWU7XG4gICAgdmFyIG9uZVJvd0lzRmlsbGVkID0gZmFsc2U7XG4gICAgdmFyIGhhc09uZU51bWJlciA9IGZhbHNlO1xuICAgIHZhciB6aTtcblxuICAgIC8qXG4gICAgICogV2l0aG91dCB0aGlzIHN0ZXA6XG4gICAgICpcbiAgICAgKiBoYXNPbmVOdW1iZXIgPSBmYWxzZSBicmVha3MgY29udG91ciBidXQgbm90IGhlYXRtYXBcbiAgICAgKiBhbGxSb3dzQXJlQXJyYXlzID0gZmFsc2UgYnJlYWtzIGNvbnRvdXIgYnV0IG5vdCBoZWF0bWFwXG4gICAgICogb25lUm93SXNGaWxsZWQgPSBmYWxzZSBicmVha3MgYm90aFxuICAgICAqL1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgemkgPSB6W2ldO1xuICAgICAgICBpZighTGliLmlzQXJyYXlPclR5cGVkQXJyYXkoemkpKSB7XG4gICAgICAgICAgICBhbGxSb3dzQXJlQXJyYXlzID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZih6aS5sZW5ndGggPiAwKSBvbmVSb3dJc0ZpbGxlZCA9IHRydWU7XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB6aS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYoaXNOdW1lcmljKHppW2pdKSkge1xuICAgICAgICAgICAgICAgIGhhc09uZU51bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKGFsbFJvd3NBcmVBcnJheXMgJiYgb25lUm93SXNGaWxsZWQgJiYgaGFzT25lTnVtYmVyKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=