(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_lib_gl_format_color_js-node_modules_plotly_js_src_traces_scatter_c-944626"],{

/***/ "./node_modules/plotly.js/src/lib/gl_format_color.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/gl_format_color.js ***!
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
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
var rgba = __webpack_require__(/*! color-normalize */ "./node_modules/color-normalize/index.js");

var Colorscale = __webpack_require__(/*! ../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var colorDflt = __webpack_require__(/*! ../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js").defaultLine;
var isArrayOrTypedArray = __webpack_require__(/*! ./array */ "./node_modules/plotly.js/src/lib/array.js").isArrayOrTypedArray;

var colorDfltRgba = rgba(colorDflt);
var opacityDflt = 1;

function calculateColor(colorIn, opacityIn) {
    var colorOut = colorIn;
    colorOut[3] *= opacityIn;
    return colorOut;
}

function validateColor(colorIn) {
    if(isNumeric(colorIn)) return colorDfltRgba;

    var colorOut = rgba(colorIn);

    return colorOut.length ? colorOut : colorDfltRgba;
}

function validateOpacity(opacityIn) {
    return isNumeric(opacityIn) ? opacityIn : opacityDflt;
}

function formatColor(containerIn, opacityIn, len) {
    var colorIn = containerIn.color;
    var isArrayColorIn = isArrayOrTypedArray(colorIn);
    var isArrayOpacityIn = isArrayOrTypedArray(opacityIn);
    var cOpts = Colorscale.extractOpts(containerIn);
    var colorOut = [];

    var sclFunc, getColor, getOpacity, colori, opacityi;

    if(cOpts.colorscale !== undefined) {
        sclFunc = Colorscale.makeColorScaleFuncFromTrace(containerIn);
    } else {
        sclFunc = validateColor;
    }

    if(isArrayColorIn) {
        getColor = function(c, i) {
            // FIXME: there is double work, considering that sclFunc does the opposite
            return c[i] === undefined ? colorDfltRgba : rgba(sclFunc(c[i]));
        };
    } else getColor = validateColor;

    if(isArrayOpacityIn) {
        getOpacity = function(o, i) {
            return o[i] === undefined ? opacityDflt : validateOpacity(o[i]);
        };
    } else getOpacity = validateOpacity;

    if(isArrayColorIn || isArrayOpacityIn) {
        for(var i = 0; i < len; i++) {
            colori = getColor(colorIn, i);
            opacityi = getOpacity(opacityIn, i);
            colorOut[i] = calculateColor(colori, opacityi);
        }
    } else colorOut = calculateColor(rgba(colorIn), opacityIn);

    return colorOut;
}

function parseColorScale(cont, alpha) {
    if(alpha === undefined) alpha = 1;

    var cOpts = Colorscale.extractOpts(cont);

    var colorscale = cOpts.reversescale ?
        Colorscale.flipScale(cOpts.colorscale) :
        cOpts.colorscale;

    return colorscale.map(function(elem) {
        var index = elem[0];
        var color = tinycolor(elem[1]);
        var rgb = color.toRgb();
        return {
            index: index,
            rgb: [rgb.r, rgb.g, rgb.b, alpha]
        };
    });
}

module.exports = {
    formatColor: formatColor,
    parseColorScale: parseColorScale
};


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

/***/ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js ***!
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




var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

module.exports = function fillColorDefaults(traceIn, traceOut, defaultColor, coerce) {
    var inheritColorFromMarker = false;

    if(traceOut.marker) {
        // don't try to inherit a color array
        var markerColor = traceOut.marker.color;
        var markerLineColor = (traceOut.marker.line || {}).color;

        if(markerColor && !isArrayOrTypedArray(markerColor)) {
            inheritColorFromMarker = markerColor;
        } else if(markerLineColor && !isArrayOrTypedArray(markerLineColor)) {
            inheritColorFromMarker = markerLineColor;
        }
    }

    coerce('fillcolor', Color.addOpacity(
        (traceOut.line || {}).color ||
        inheritColorFromMarker ||
        defaultColor, 0.5
    ));
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

/***/ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/line_defaults.js ***!
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



var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");

module.exports = function lineDefaults(traceIn, traceOut, defaultColor, layout, coerce, opts) {
    var markerColor = (traceIn.marker || {}).color;

    coerce('line.color', defaultColor);

    if(hasColorscale(traceIn, 'line')) {
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'line.', cLetter: 'c'});
    } else {
        var lineColorDflt = (isArrayOrTypedArray(markerColor) ? false : markerColor) || defaultColor;
        coerce('line.color', lineColorDflt);
    }

    coerce('line.width');
    if(!(opts || {}).noDash) coerce('line.dash');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/link_traces.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/link_traces.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var LINKEDFILLS = {tonextx: 1, tonexty: 1, tonext: 1};

module.exports = function linkTraces(gd, plotinfo, cdscatter) {
    var trace, i, group, prevtrace, groupIndex;

    // first sort traces to keep stacks & filled-together groups together
    var groupIndices = {};
    var needsSort = false;
    var prevGroupIndex = -1;
    var nextGroupIndex = 0;
    var prevUnstackedGroupIndex = -1;
    for(i = 0; i < cdscatter.length; i++) {
        trace = cdscatter[i][0].trace;
        group = trace.stackgroup || '';
        if(group) {
            if(group in groupIndices) {
                groupIndex = groupIndices[group];
            } else {
                groupIndex = groupIndices[group] = nextGroupIndex;
                nextGroupIndex++;
            }
        } else if(trace.fill in LINKEDFILLS && prevUnstackedGroupIndex >= 0) {
            groupIndex = prevUnstackedGroupIndex;
        } else {
            groupIndex = prevUnstackedGroupIndex = nextGroupIndex;
            nextGroupIndex++;
        }

        if(groupIndex < prevGroupIndex) needsSort = true;
        trace._groupIndex = prevGroupIndex = groupIndex;
    }

    var cdscatterSorted = cdscatter.slice();
    if(needsSort) {
        cdscatterSorted.sort(function(a, b) {
            var traceA = a[0].trace;
            var traceB = b[0].trace;
            return (traceA._groupIndex - traceB._groupIndex) ||
                (traceA.index - traceB.index);
        });
    }

    // now link traces to each other
    var prevtraces = {};
    for(i = 0; i < cdscatterSorted.length; i++) {
        trace = cdscatterSorted[i][0].trace;
        group = trace.stackgroup || '';

        // Note: The check which ensures all cdscatter here are for the same axis and
        // are either cartesian or scatterternary has been removed. This code assumes
        // the passed scattertraces have been filtered to the proper plot types and
        // the proper subplots.
        if(trace.visible === true) {
            trace._nexttrace = null;

            if(trace.fill in LINKEDFILLS) {
                prevtrace = prevtraces[group];
                trace._prevtrace = prevtrace || null;

                if(prevtrace) {
                    prevtrace._nexttrace = trace;
                }
            }

            trace._ownfill = (trace.fill && (
                trace.fill.substr(0, 6) === 'tozero' ||
                trace.fill === 'toself' ||
                (trace.fill.substr(0, 2) === 'to' && !trace._prevtrace)
            ));

            prevtraces[group] = trace;
        } else {
            trace._prevtrace = trace._nexttrace = trace._ownfill = null;
        }
    }

    return cdscatterSorted;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/text_defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

/*
 * opts: object of flags to control features not all text users support
 *   noSelect: caller does not support selected/unselected attribute containers
 */
module.exports = function(traceIn, traceOut, layout, coerce, opts) {
    opts = opts || {};

    coerce('textposition');
    Lib.coerceFont(coerce, 'textfont', layout.font);

    if(!opts.noSelect) {
        coerce('selected.textfont.color');
        coerce('unselected.textfont.color');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvbGliL2dsX2Zvcm1hdF9jb2xvci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvY3Jvc3NfdHJhY2VfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL2ZpbGxjb2xvcl9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvZm9ybWF0X2xhYmVscy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbGluZV9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbGlua190cmFjZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL3RleHRfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL3h5X2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDhEQUFnQjtBQUN4QyxnQkFBZ0IsbUJBQU8sQ0FBQywwREFBWTtBQUNwQyxXQUFXLG1CQUFPLENBQUMsZ0VBQWlCOztBQUVwQyxpQkFBaUIsbUJBQU8sQ0FBQyw2RkFBMEI7QUFDbkQsZ0JB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QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydDA5MGIyMDZmYjYyODAxZWIxODQzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcbnZhciB0aW55Y29sb3IgPSByZXF1aXJlKCd0aW55Y29sb3IyJyk7XG52YXIgcmdiYSA9IHJlcXVpcmUoJ2NvbG9yLW5vcm1hbGl6ZScpO1xuXG52YXIgQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpO1xudmFyIGNvbG9yRGZsdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29sb3IvYXR0cmlidXRlcycpLmRlZmF1bHRMaW5lO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2FycmF5JykuaXNBcnJheU9yVHlwZWRBcnJheTtcblxudmFyIGNvbG9yRGZsdFJnYmEgPSByZ2JhKGNvbG9yRGZsdCk7XG52YXIgb3BhY2l0eURmbHQgPSAxO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVDb2xvcihjb2xvckluLCBvcGFjaXR5SW4pIHtcbiAgICB2YXIgY29sb3JPdXQgPSBjb2xvckluO1xuICAgIGNvbG9yT3V0WzNdICo9IG9wYWNpdHlJbjtcbiAgICByZXR1cm4gY29sb3JPdXQ7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29sb3IoY29sb3JJbikge1xuICAgIGlmKGlzTnVtZXJpYyhjb2xvckluKSkgcmV0dXJuIGNvbG9yRGZsdFJnYmE7XG5cbiAgICB2YXIgY29sb3JPdXQgPSByZ2JhKGNvbG9ySW4pO1xuXG4gICAgcmV0dXJuIGNvbG9yT3V0Lmxlbmd0aCA/IGNvbG9yT3V0IDogY29sb3JEZmx0UmdiYTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVPcGFjaXR5KG9wYWNpdHlJbikge1xuICAgIHJldHVybiBpc051bWVyaWMob3BhY2l0eUluKSA/IG9wYWNpdHlJbiA6IG9wYWNpdHlEZmx0O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRDb2xvcihjb250YWluZXJJbiwgb3BhY2l0eUluLCBsZW4pIHtcbiAgICB2YXIgY29sb3JJbiA9IGNvbnRhaW5lckluLmNvbG9yO1xuICAgIHZhciBpc0FycmF5Q29sb3JJbiA9IGlzQXJyYXlPclR5cGVkQXJyYXkoY29sb3JJbik7XG4gICAgdmFyIGlzQXJyYXlPcGFjaXR5SW4gPSBpc0FycmF5T3JUeXBlZEFycmF5KG9wYWNpdHlJbik7XG4gICAgdmFyIGNPcHRzID0gQ29sb3JzY2FsZS5leHRyYWN0T3B0cyhjb250YWluZXJJbik7XG4gICAgdmFyIGNvbG9yT3V0ID0gW107XG5cbiAgICB2YXIgc2NsRnVuYywgZ2V0Q29sb3IsIGdldE9wYWNpdHksIGNvbG9yaSwgb3BhY2l0eWk7XG5cbiAgICBpZihjT3B0cy5jb2xvcnNjYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2NsRnVuYyA9IENvbG9yc2NhbGUubWFrZUNvbG9yU2NhbGVGdW5jRnJvbVRyYWNlKGNvbnRhaW5lckluKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzY2xGdW5jID0gdmFsaWRhdGVDb2xvcjtcbiAgICB9XG5cbiAgICBpZihpc0FycmF5Q29sb3JJbikge1xuICAgICAgICBnZXRDb2xvciA9IGZ1bmN0aW9uKGMsIGkpIHtcbiAgICAgICAgICAgIC8vIEZJWE1FOiB0aGVyZSBpcyBkb3VibGUgd29yaywgY29uc2lkZXJpbmcgdGhhdCBzY2xGdW5jIGRvZXMgdGhlIG9wcG9zaXRlXG4gICAgICAgICAgICByZXR1cm4gY1tpXSA9PT0gdW5kZWZpbmVkID8gY29sb3JEZmx0UmdiYSA6IHJnYmEoc2NsRnVuYyhjW2ldKSk7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGdldENvbG9yID0gdmFsaWRhdGVDb2xvcjtcblxuICAgIGlmKGlzQXJyYXlPcGFjaXR5SW4pIHtcbiAgICAgICAgZ2V0T3BhY2l0eSA9IGZ1bmN0aW9uKG8sIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBvW2ldID09PSB1bmRlZmluZWQgPyBvcGFjaXR5RGZsdCA6IHZhbGlkYXRlT3BhY2l0eShvW2ldKTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgZ2V0T3BhY2l0eSA9IHZhbGlkYXRlT3BhY2l0eTtcblxuICAgIGlmKGlzQXJyYXlDb2xvckluIHx8IGlzQXJyYXlPcGFjaXR5SW4pIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb2xvcmkgPSBnZXRDb2xvcihjb2xvckluLCBpKTtcbiAgICAgICAgICAgIG9wYWNpdHlpID0gZ2V0T3BhY2l0eShvcGFjaXR5SW4sIGkpO1xuICAgICAgICAgICAgY29sb3JPdXRbaV0gPSBjYWxjdWxhdGVDb2xvcihjb2xvcmksIG9wYWNpdHlpKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBjb2xvck91dCA9IGNhbGN1bGF0ZUNvbG9yKHJnYmEoY29sb3JJbiksIG9wYWNpdHlJbik7XG5cbiAgICByZXR1cm4gY29sb3JPdXQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29sb3JTY2FsZShjb250LCBhbHBoYSkge1xuICAgIGlmKGFscGhhID09PSB1bmRlZmluZWQpIGFscGhhID0gMTtcblxuICAgIHZhciBjT3B0cyA9IENvbG9yc2NhbGUuZXh0cmFjdE9wdHMoY29udCk7XG5cbiAgICB2YXIgY29sb3JzY2FsZSA9IGNPcHRzLnJldmVyc2VzY2FsZSA/XG4gICAgICAgIENvbG9yc2NhbGUuZmxpcFNjYWxlKGNPcHRzLmNvbG9yc2NhbGUpIDpcbiAgICAgICAgY09wdHMuY29sb3JzY2FsZTtcblxuICAgIHJldHVybiBjb2xvcnNjYWxlLm1hcChmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGVsZW1bMF07XG4gICAgICAgIHZhciBjb2xvciA9IHRpbnljb2xvcihlbGVtWzFdKTtcbiAgICAgICAgdmFyIHJnYiA9IGNvbG9yLnRvUmdiKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICByZ2I6IFtyZ2IuciwgcmdiLmcsIHJnYi5iLCBhbHBoYV1cbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0Q29sb3I6IGZvcm1hdENvbG9yLFxuICAgIHBhcnNlQ29sb3JTY2FsZTogcGFyc2VDb2xvclNjYWxlXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cblxuLy8gcmVtb3ZlIG9wYWNpdHkgZm9yIGFueSB0cmFjZSB0aGF0IGhhcyBhIGZpbGwgb3IgaXMgZmlsbGVkIHRvXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyb3NzVHJhY2VEZWZhdWx0cyhmdWxsRGF0YSkge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBmdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhY2VpID0gZnVsbERhdGFbaV07XG4gICAgICAgIGlmKHRyYWNlaS50eXBlICE9PSAnc2NhdHRlcicpIGNvbnRpbnVlO1xuXG4gICAgICAgIHZhciBmaWxsaSA9IHRyYWNlaS5maWxsO1xuICAgICAgICBpZihmaWxsaSA9PT0gJ25vbmUnIHx8IGZpbGxpID09PSAndG9zZWxmJykgY29udGludWU7XG5cbiAgICAgICAgdHJhY2VpLm9wYWNpdHkgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYoZmlsbGkgPT09ICd0b25leHR5JyB8fCBmaWxsaSA9PT0gJ3RvbmV4dHgnKSB7XG4gICAgICAgICAgICBmb3IodmFyIGogPSBpIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhY2VqID0gZnVsbERhdGFbal07XG5cbiAgICAgICAgICAgICAgICBpZigodHJhY2VqLnR5cGUgPT09ICdzY2F0dGVyJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICh0cmFjZWoueGF4aXMgPT09IHRyYWNlaS54YXhpcykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICh0cmFjZWoueWF4aXMgPT09IHRyYWNlaS55YXhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2VqLm9wYWNpdHkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbGxDb2xvckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGNvZXJjZSkge1xuICAgIHZhciBpbmhlcml0Q29sb3JGcm9tTWFya2VyID0gZmFsc2U7XG5cbiAgICBpZih0cmFjZU91dC5tYXJrZXIpIHtcbiAgICAgICAgLy8gZG9uJ3QgdHJ5IHRvIGluaGVyaXQgYSBjb2xvciBhcnJheVxuICAgICAgICB2YXIgbWFya2VyQ29sb3IgPSB0cmFjZU91dC5tYXJrZXIuY29sb3I7XG4gICAgICAgIHZhciBtYXJrZXJMaW5lQ29sb3IgPSAodHJhY2VPdXQubWFya2VyLmxpbmUgfHwge30pLmNvbG9yO1xuXG4gICAgICAgIGlmKG1hcmtlckNvbG9yICYmICFpc0FycmF5T3JUeXBlZEFycmF5KG1hcmtlckNvbG9yKSkge1xuICAgICAgICAgICAgaW5oZXJpdENvbG9yRnJvbU1hcmtlciA9IG1hcmtlckNvbG9yO1xuICAgICAgICB9IGVsc2UgaWYobWFya2VyTGluZUNvbG9yICYmICFpc0FycmF5T3JUeXBlZEFycmF5KG1hcmtlckxpbmVDb2xvcikpIHtcbiAgICAgICAgICAgIGluaGVyaXRDb2xvckZyb21NYXJrZXIgPSBtYXJrZXJMaW5lQ29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2VyY2UoJ2ZpbGxjb2xvcicsIENvbG9yLmFkZE9wYWNpdHkoXG4gICAgICAgICh0cmFjZU91dC5saW5lIHx8IHt9KS5jb2xvciB8fFxuICAgICAgICBpbmhlcml0Q29sb3JGcm9tTWFya2VyIHx8XG4gICAgICAgIGRlZmF1bHRDb2xvciwgMC41XG4gICAgKSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ybWF0TGFiZWxzKGNkaSwgdHJhY2UsIGZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgbGFiZWxzID0ge307XG5cbiAgICB2YXIgbW9ja0dkID0ge19mdWxsTGF5b3V0OiBmdWxsTGF5b3V0fTtcbiAgICB2YXIgeGEgPSBBeGVzLmdldEZyb21UcmFjZShtb2NrR2QsIHRyYWNlLCAneCcpO1xuICAgIHZhciB5YSA9IEF4ZXMuZ2V0RnJvbVRyYWNlKG1vY2tHZCwgdHJhY2UsICd5Jyk7XG5cbiAgICBsYWJlbHMueExhYmVsID0gQXhlcy50aWNrVGV4dCh4YSwgY2RpLngsIHRydWUpLnRleHQ7XG4gICAgbGFiZWxzLnlMYWJlbCA9IEF4ZXMudGlja1RleHQoeWEsIGNkaS55LCB0cnVlKS50ZXh0O1xuXG4gICAgcmV0dXJuIGxhYmVscztcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5T3JUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuaXNBcnJheU9yVHlwZWRBcnJheTtcbnZhciBoYXNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2hlbHBlcnMnKS5oYXNDb2xvcnNjYWxlO1xudmFyIGNvbG9yc2NhbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9kZWZhdWx0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpbmVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSwgb3B0cykge1xuICAgIHZhciBtYXJrZXJDb2xvciA9ICh0cmFjZUluLm1hcmtlciB8fCB7fSkuY29sb3I7XG5cbiAgICBjb2VyY2UoJ2xpbmUuY29sb3InLCBkZWZhdWx0Q29sb3IpO1xuXG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZUluLCAnbGluZScpKSB7XG4gICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdsaW5lLicsIGNMZXR0ZXI6ICdjJ30pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBsaW5lQ29sb3JEZmx0ID0gKGlzQXJyYXlPclR5cGVkQXJyYXkobWFya2VyQ29sb3IpID8gZmFsc2UgOiBtYXJrZXJDb2xvcikgfHwgZGVmYXVsdENvbG9yO1xuICAgICAgICBjb2VyY2UoJ2xpbmUuY29sb3InLCBsaW5lQ29sb3JEZmx0KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2xpbmUud2lkdGgnKTtcbiAgICBpZighKG9wdHMgfHwge30pLm5vRGFzaCkgY29lcmNlKCdsaW5lLmRhc2gnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMSU5LRURGSUxMUyA9IHt0b25leHR4OiAxLCB0b25leHR5OiAxLCB0b25leHQ6IDF9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpbmtUcmFjZXMoZ2QsIHBsb3RpbmZvLCBjZHNjYXR0ZXIpIHtcbiAgICB2YXIgdHJhY2UsIGksIGdyb3VwLCBwcmV2dHJhY2UsIGdyb3VwSW5kZXg7XG5cbiAgICAvLyBmaXJzdCBzb3J0IHRyYWNlcyB0byBrZWVwIHN0YWNrcyAmIGZpbGxlZC10b2dldGhlciBncm91cHMgdG9nZXRoZXJcbiAgICB2YXIgZ3JvdXBJbmRpY2VzID0ge307XG4gICAgdmFyIG5lZWRzU29ydCA9IGZhbHNlO1xuICAgIHZhciBwcmV2R3JvdXBJbmRleCA9IC0xO1xuICAgIHZhciBuZXh0R3JvdXBJbmRleCA9IDA7XG4gICAgdmFyIHByZXZVbnN0YWNrZWRHcm91cEluZGV4ID0gLTE7XG4gICAgZm9yKGkgPSAwOyBpIDwgY2RzY2F0dGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyYWNlID0gY2RzY2F0dGVyW2ldWzBdLnRyYWNlO1xuICAgICAgICBncm91cCA9IHRyYWNlLnN0YWNrZ3JvdXAgfHwgJyc7XG4gICAgICAgIGlmKGdyb3VwKSB7XG4gICAgICAgICAgICBpZihncm91cCBpbiBncm91cEluZGljZXMpIHtcbiAgICAgICAgICAgICAgICBncm91cEluZGV4ID0gZ3JvdXBJbmRpY2VzW2dyb3VwXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBJbmRleCA9IGdyb3VwSW5kaWNlc1tncm91cF0gPSBuZXh0R3JvdXBJbmRleDtcbiAgICAgICAgICAgICAgICBuZXh0R3JvdXBJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYodHJhY2UuZmlsbCBpbiBMSU5LRURGSUxMUyAmJiBwcmV2VW5zdGFja2VkR3JvdXBJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBncm91cEluZGV4ID0gcHJldlVuc3RhY2tlZEdyb3VwSW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cEluZGV4ID0gcHJldlVuc3RhY2tlZEdyb3VwSW5kZXggPSBuZXh0R3JvdXBJbmRleDtcbiAgICAgICAgICAgIG5leHRHcm91cEluZGV4Kys7XG4gICAgICAgIH1cblxuICAgICAgICBpZihncm91cEluZGV4IDwgcHJldkdyb3VwSW5kZXgpIG5lZWRzU29ydCA9IHRydWU7XG4gICAgICAgIHRyYWNlLl9ncm91cEluZGV4ID0gcHJldkdyb3VwSW5kZXggPSBncm91cEluZGV4O1xuICAgIH1cblxuICAgIHZhciBjZHNjYXR0ZXJTb3J0ZWQgPSBjZHNjYXR0ZXIuc2xpY2UoKTtcbiAgICBpZihuZWVkc1NvcnQpIHtcbiAgICAgICAgY2RzY2F0dGVyU29ydGVkLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgdmFyIHRyYWNlQSA9IGFbMF0udHJhY2U7XG4gICAgICAgICAgICB2YXIgdHJhY2VCID0gYlswXS50cmFjZTtcbiAgICAgICAgICAgIHJldHVybiAodHJhY2VBLl9ncm91cEluZGV4IC0gdHJhY2VCLl9ncm91cEluZGV4KSB8fFxuICAgICAgICAgICAgICAgICh0cmFjZUEuaW5kZXggLSB0cmFjZUIuaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBub3cgbGluayB0cmFjZXMgdG8gZWFjaCBvdGhlclxuICAgIHZhciBwcmV2dHJhY2VzID0ge307XG4gICAgZm9yKGkgPSAwOyBpIDwgY2RzY2F0dGVyU29ydGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyYWNlID0gY2RzY2F0dGVyU29ydGVkW2ldWzBdLnRyYWNlO1xuICAgICAgICBncm91cCA9IHRyYWNlLnN0YWNrZ3JvdXAgfHwgJyc7XG5cbiAgICAgICAgLy8gTm90ZTogVGhlIGNoZWNrIHdoaWNoIGVuc3VyZXMgYWxsIGNkc2NhdHRlciBoZXJlIGFyZSBmb3IgdGhlIHNhbWUgYXhpcyBhbmRcbiAgICAgICAgLy8gYXJlIGVpdGhlciBjYXJ0ZXNpYW4gb3Igc2NhdHRlcnRlcm5hcnkgaGFzIGJlZW4gcmVtb3ZlZC4gVGhpcyBjb2RlIGFzc3VtZXNcbiAgICAgICAgLy8gdGhlIHBhc3NlZCBzY2F0dGVydHJhY2VzIGhhdmUgYmVlbiBmaWx0ZXJlZCB0byB0aGUgcHJvcGVyIHBsb3QgdHlwZXMgYW5kXG4gICAgICAgIC8vIHRoZSBwcm9wZXIgc3VicGxvdHMuXG4gICAgICAgIGlmKHRyYWNlLnZpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRyYWNlLl9uZXh0dHJhY2UgPSBudWxsO1xuXG4gICAgICAgICAgICBpZih0cmFjZS5maWxsIGluIExJTktFREZJTExTKSB7XG4gICAgICAgICAgICAgICAgcHJldnRyYWNlID0gcHJldnRyYWNlc1tncm91cF07XG4gICAgICAgICAgICAgICAgdHJhY2UuX3ByZXZ0cmFjZSA9IHByZXZ0cmFjZSB8fCBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYocHJldnRyYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZ0cmFjZS5fbmV4dHRyYWNlID0gdHJhY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0cmFjZS5fb3duZmlsbCA9ICh0cmFjZS5maWxsICYmIChcbiAgICAgICAgICAgICAgICB0cmFjZS5maWxsLnN1YnN0cigwLCA2KSA9PT0gJ3RvemVybycgfHxcbiAgICAgICAgICAgICAgICB0cmFjZS5maWxsID09PSAndG9zZWxmJyB8fFxuICAgICAgICAgICAgICAgICh0cmFjZS5maWxsLnN1YnN0cigwLCAyKSA9PT0gJ3RvJyAmJiAhdHJhY2UuX3ByZXZ0cmFjZSlcbiAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICBwcmV2dHJhY2VzW2dyb3VwXSA9IHRyYWNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhY2UuX3ByZXZ0cmFjZSA9IHRyYWNlLl9uZXh0dHJhY2UgPSB0cmFjZS5fb3duZmlsbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2RzY2F0dGVyU29ydGVkO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbi8qXG4gKiBvcHRzOiBvYmplY3Qgb2YgZmxhZ3MgdG8gY29udHJvbCBmZWF0dXJlcyBub3QgYWxsIHRleHQgdXNlcnMgc3VwcG9ydFxuICogICBub1NlbGVjdDogY2FsbGVyIGRvZXMgbm90IHN1cHBvcnQgc2VsZWN0ZWQvdW5zZWxlY3RlZCBhdHRyaWJ1dGUgY29udGFpbmVyc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgb3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgY29lcmNlKCd0ZXh0cG9zaXRpb24nKTtcbiAgICBMaWIuY29lcmNlRm9udChjb2VyY2UsICd0ZXh0Zm9udCcsIGxheW91dC5mb250KTtcblxuICAgIGlmKCFvcHRzLm5vU2VsZWN0KSB7XG4gICAgICAgIGNvZXJjZSgnc2VsZWN0ZWQudGV4dGZvbnQuY29sb3InKTtcbiAgICAgICAgY29lcmNlKCd1bnNlbGVjdGVkLnRleHRmb250LmNvbG9yJyk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVYWURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSkge1xuICAgIHZhciB4ID0gY29lcmNlKCd4Jyk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ3knKTtcbiAgICB2YXIgbGVuO1xuXG4gICAgdmFyIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2NhbGVuZGFycycsICdoYW5kbGVUcmFjZURlZmF1bHRzJyk7XG4gICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgWyd4JywgJ3knXSwgbGF5b3V0KTtcblxuICAgIGlmKHgpIHtcbiAgICAgICAgdmFyIHhsZW4gPSBMaWIubWluUm93TGVuZ3RoKHgpO1xuICAgICAgICBpZih5KSB7XG4gICAgICAgICAgICBsZW4gPSBNYXRoLm1pbih4bGVuLCBMaWIubWluUm93TGVuZ3RoKHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlbiA9IHhsZW47XG4gICAgICAgICAgICBjb2VyY2UoJ3kwJyk7XG4gICAgICAgICAgICBjb2VyY2UoJ2R5Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZigheSkgcmV0dXJuIDA7XG5cbiAgICAgICAgbGVuID0gTGliLm1pblJvd0xlbmd0aCh5KTtcbiAgICAgICAgY29lcmNlKCd4MCcpO1xuICAgICAgICBjb2VyY2UoJ2R4Jyk7XG4gICAgfVxuXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IGxlbjtcblxuICAgIHJldHVybiBsZW47XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==