(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_scatter_fillcolor_defaults_js-node_modules_plotly_j-fb8588"],{

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

/***/ "./node_modules/plotly.js/src/traces/scatter/hover.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/hover.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var getTraceColor = __webpack_require__(/*! ./get_trace_color */ "./node_modules/plotly.js/src/traces/scatter/get_trace_color.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var fillText = Lib.fillText;

module.exports = function hoverPoints(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var trace = cd[0].trace;
    var xa = pointData.xa;
    var ya = pointData.ya;
    var xpx = xa.c2p(xval);
    var ypx = ya.c2p(yval);
    var pt = [xpx, ypx];
    var hoveron = trace.hoveron || '';
    var minRad = (trace.mode.indexOf('markers') !== -1) ? 3 : 0.5;

    // look for points to hover on first, then take fills only if we
    // didn't find a point
    if(hoveron.indexOf('points') !== -1) {
        var dx = function(di) {
            // dx and dy are used in compare modes - here we want to always
            // prioritize the closest data point, at least as long as markers are
            // the same size or nonexistent, but still try to prioritize small markers too.
            var rad = Math.max(3, di.mrc || 0);
            var kink = 1 - 1 / rad;
            var dxRaw = Math.abs(xa.c2p(di.x) - xpx);
            var d = (dxRaw < rad) ? (kink * dxRaw / rad) : (dxRaw - rad + kink);
            return d;
        };
        var dy = function(di) {
            var rad = Math.max(3, di.mrc || 0);
            var kink = 1 - 1 / rad;
            var dyRaw = Math.abs(ya.c2p(di.y) - ypx);
            return (dyRaw < rad) ? (kink * dyRaw / rad) : (dyRaw - rad + kink);
        };
        var dxy = function(di) {
            // scatter points: d.mrc is the calculated marker radius
            // adjust the distance so if you're inside the marker it
            // always will show up regardless of point size, but
            // prioritize smaller points
            var rad = Math.max(minRad, di.mrc || 0);
            var dx = xa.c2p(di.x) - xpx;
            var dy = ya.c2p(di.y) - ypx;
            return Math.max(Math.sqrt(dx * dx + dy * dy) - rad, 1 - minRad / rad);
        };
        var distfn = Fx.getDistanceFunction(hovermode, dx, dy, dxy);

        Fx.getClosest(cd, distfn, pointData);

        // skip the rest (for this trace) if we didn't find a close point
        if(pointData.index !== false) {
            // the closest data point
            var di = cd[pointData.index];
            var xc = xa.c2p(di.x, true);
            var yc = ya.c2p(di.y, true);
            var rad = di.mrc || 1;

            // now we're done using the whole `calcdata` array, replace the
            // index with the original index (in case of inserted point from
            // stacked area)
            pointData.index = di.i;

            var orientation = cd[0].t.orientation;
            // TODO: for scatter and bar, option to show (sub)totals and
            // raw data? Currently stacked and/or normalized bars just show
            // the normalized individual sizes, so that's what I'm doing here
            // for now.
            var sizeVal = orientation && (di.sNorm || di.s);
            var xLabelVal = (orientation === 'h') ? sizeVal : di.x;
            var yLabelVal = (orientation === 'v') ? sizeVal : di.y;

            Lib.extendFlat(pointData, {
                color: getTraceColor(trace, di),

                x0: xc - rad,
                x1: xc + rad,
                xLabelVal: xLabelVal,

                y0: yc - rad,
                y1: yc + rad,
                yLabelVal: yLabelVal,

                spikeDistance: dxy(di),
                hovertemplate: trace.hovertemplate
            });

            fillText(di, trace, pointData);
            Registry.getComponentMethod('errorbars', 'hoverInfo')(di, trace, pointData);

            return [pointData];
        }
    }

    // even if hoveron is 'fills', only use it if we have polygons too
    if(hoveron.indexOf('fills') !== -1 && trace._polygons) {
        var polygons = trace._polygons;
        var polygonsIn = [];
        var inside = false;
        var xmin = Infinity;
        var xmax = -Infinity;
        var ymin = Infinity;
        var ymax = -Infinity;

        var i, j, polygon, pts, xCross, x0, x1, y0, y1;

        for(i = 0; i < polygons.length; i++) {
            polygon = polygons[i];
            // TODO: this is not going to work right for curved edges, it will
            // act as though they're straight. That's probably going to need
            // the elements themselves to capture the events. Worth it?
            if(polygon.contains(pt)) {
                inside = !inside;
                // TODO: need better than just the overall bounding box
                polygonsIn.push(polygon);
                ymin = Math.min(ymin, polygon.ymin);
                ymax = Math.max(ymax, polygon.ymax);
            }
        }

        if(inside) {
            // constrain ymin/max to the visible plot, so the label goes
            // at the middle of the piece you can see
            ymin = Math.max(ymin, 0);
            ymax = Math.min(ymax, ya._length);

            // find the overall left-most and right-most points of the
            // polygon(s) we're inside at their combined vertical midpoint.
            // This is where we will draw the hover label.
            // Note that this might not be the vertical midpoint of the
            // whole trace, if it's disjoint.
            var yAvg = (ymin + ymax) / 2;
            for(i = 0; i < polygonsIn.length; i++) {
                pts = polygonsIn[i].pts;
                for(j = 1; j < pts.length; j++) {
                    y0 = pts[j - 1][1];
                    y1 = pts[j][1];
                    if((y0 > yAvg) !== (y1 >= yAvg)) {
                        x0 = pts[j - 1][0];
                        x1 = pts[j][0];
                        if(y1 - y0) {
                            xCross = x0 + (x1 - x0) * (yAvg - y0) / (y1 - y0);
                            xmin = Math.min(xmin, xCross);
                            xmax = Math.max(xmax, xCross);
                        }
                    }
                }
            }

            // constrain xmin/max to the visible plot now too
            xmin = Math.max(xmin, 0);
            xmax = Math.min(xmax, xa._length);

            // get only fill or line color for the hover color
            var color = Color.defaultLine;
            if(Color.opacity(trace.fillcolor)) color = trace.fillcolor;
            else if(Color.opacity((trace.line || {}).color)) {
                color = trace.line.color;
            }

            Lib.extendFlat(pointData, {
                // never let a 2D override 1D type as closest point
                // also: no spikeDistance, it's not allowed for fills
                distance: pointData.maxHoverDistance,
                x0: xmin,
                x1: xmax,
                y0: yAvg,
                y1: yAvg,
                color: color,
                hovertemplate: false
            });

            delete pointData.index;

            if(trace.text && !Array.isArray(trace.text)) {
                pointData.text = String(trace.text);
            } else pointData.text = trace.name;

            return [pointData];
        }
    }
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

/***/ "./node_modules/plotly.js/src/traces/scatter/line_shape_defaults.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/line_shape_defaults.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/





// common to 'scatter' and 'scatterternary'
module.exports = function handleLineShapeDefaults(traceIn, traceOut, coerce) {
    var shape = coerce('line.shape');
    if(shape === 'spline') coerce('line.smoothing');
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvZmlsbGNvbG9yX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9ob3Zlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbGluZV9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbGluZV9zaGFwZV9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvdGV4dF9kZWZhdWx0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QywwQkFBMEIscUdBQXdDOztBQUVsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDs7QUFFekQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7QUFDN0IsU0FBUyxtQkFBTyxDQUFDLGdGQUFxQjtBQUN0QyxlQUFlLG1CQUFPLENBQUMsZ0VBQWdCO0FBQ3ZDLG9CQUFvQixtQkFBTyxDQUFDLHlGQUFtQjtBQUMvQyxZQUFZLG1CQUFPLENBQUMsc0ZBQXdCO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0EsMEJBQTBCLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsMEJBQTBCLHFHQUF3QztBQUNsRSxvQkFBb0IsNklBQTREO0FBQ2hGLHlCQUF5QixtQkFBTyxDQUFDLDRHQUFzQzs7QUFFdkU7QUFDQSwyQ0FBMkM7O0FBRTNDOztBQUVBO0FBQ0EsK0RBQStELDhCQUE4QjtBQUM3RixLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25COzs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOzs7QUFHYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydGZlYTIwOTg0ZTY5ZjMzMDE4YmQyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBpc0FycmF5T3JUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuaXNBcnJheU9yVHlwZWRBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaWxsQ29sb3JEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBjb2VyY2UpIHtcbiAgICB2YXIgaW5oZXJpdENvbG9yRnJvbU1hcmtlciA9IGZhbHNlO1xuXG4gICAgaWYodHJhY2VPdXQubWFya2VyKSB7XG4gICAgICAgIC8vIGRvbid0IHRyeSB0byBpbmhlcml0IGEgY29sb3IgYXJyYXlcbiAgICAgICAgdmFyIG1hcmtlckNvbG9yID0gdHJhY2VPdXQubWFya2VyLmNvbG9yO1xuICAgICAgICB2YXIgbWFya2VyTGluZUNvbG9yID0gKHRyYWNlT3V0Lm1hcmtlci5saW5lIHx8IHt9KS5jb2xvcjtcblxuICAgICAgICBpZihtYXJrZXJDb2xvciAmJiAhaXNBcnJheU9yVHlwZWRBcnJheShtYXJrZXJDb2xvcikpIHtcbiAgICAgICAgICAgIGluaGVyaXRDb2xvckZyb21NYXJrZXIgPSBtYXJrZXJDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmKG1hcmtlckxpbmVDb2xvciAmJiAhaXNBcnJheU9yVHlwZWRBcnJheShtYXJrZXJMaW5lQ29sb3IpKSB7XG4gICAgICAgICAgICBpbmhlcml0Q29sb3JGcm9tTWFya2VyID0gbWFya2VyTGluZUNvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29lcmNlKCdmaWxsY29sb3InLCBDb2xvci5hZGRPcGFjaXR5KFxuICAgICAgICAodHJhY2VPdXQubGluZSB8fCB7fSkuY29sb3IgfHxcbiAgICAgICAgaW5oZXJpdENvbG9yRnJvbU1hcmtlciB8fFxuICAgICAgICBkZWZhdWx0Q29sb3IsIDAuNVxuICAgICkpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEZ4ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meCcpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBnZXRUcmFjZUNvbG9yID0gcmVxdWlyZSgnLi9nZXRfdHJhY2VfY29sb3InKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBmaWxsVGV4dCA9IExpYi5maWxsVGV4dDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSkge1xuICAgIHZhciBjZCA9IHBvaW50RGF0YS5jZDtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgeGEgPSBwb2ludERhdGEueGE7XG4gICAgdmFyIHlhID0gcG9pbnREYXRhLnlhO1xuICAgIHZhciB4cHggPSB4YS5jMnAoeHZhbCk7XG4gICAgdmFyIHlweCA9IHlhLmMycCh5dmFsKTtcbiAgICB2YXIgcHQgPSBbeHB4LCB5cHhdO1xuICAgIHZhciBob3Zlcm9uID0gdHJhY2UuaG92ZXJvbiB8fCAnJztcbiAgICB2YXIgbWluUmFkID0gKHRyYWNlLm1vZGUuaW5kZXhPZignbWFya2VycycpICE9PSAtMSkgPyAzIDogMC41O1xuXG4gICAgLy8gbG9vayBmb3IgcG9pbnRzIHRvIGhvdmVyIG9uIGZpcnN0LCB0aGVuIHRha2UgZmlsbHMgb25seSBpZiB3ZVxuICAgIC8vIGRpZG4ndCBmaW5kIGEgcG9pbnRcbiAgICBpZihob3Zlcm9uLmluZGV4T2YoJ3BvaW50cycpICE9PSAtMSkge1xuICAgICAgICB2YXIgZHggPSBmdW5jdGlvbihkaSkge1xuICAgICAgICAgICAgLy8gZHggYW5kIGR5IGFyZSB1c2VkIGluIGNvbXBhcmUgbW9kZXMgLSBoZXJlIHdlIHdhbnQgdG8gYWx3YXlzXG4gICAgICAgICAgICAvLyBwcmlvcml0aXplIHRoZSBjbG9zZXN0IGRhdGEgcG9pbnQsIGF0IGxlYXN0IGFzIGxvbmcgYXMgbWFya2VycyBhcmVcbiAgICAgICAgICAgIC8vIHRoZSBzYW1lIHNpemUgb3Igbm9uZXhpc3RlbnQsIGJ1dCBzdGlsbCB0cnkgdG8gcHJpb3JpdGl6ZSBzbWFsbCBtYXJrZXJzIHRvby5cbiAgICAgICAgICAgIHZhciByYWQgPSBNYXRoLm1heCgzLCBkaS5tcmMgfHwgMCk7XG4gICAgICAgICAgICB2YXIga2luayA9IDEgLSAxIC8gcmFkO1xuICAgICAgICAgICAgdmFyIGR4UmF3ID0gTWF0aC5hYnMoeGEuYzJwKGRpLngpIC0geHB4KTtcbiAgICAgICAgICAgIHZhciBkID0gKGR4UmF3IDwgcmFkKSA/IChraW5rICogZHhSYXcgLyByYWQpIDogKGR4UmF3IC0gcmFkICsga2luayk7XG4gICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGR5ID0gZnVuY3Rpb24oZGkpIHtcbiAgICAgICAgICAgIHZhciByYWQgPSBNYXRoLm1heCgzLCBkaS5tcmMgfHwgMCk7XG4gICAgICAgICAgICB2YXIga2luayA9IDEgLSAxIC8gcmFkO1xuICAgICAgICAgICAgdmFyIGR5UmF3ID0gTWF0aC5hYnMoeWEuYzJwKGRpLnkpIC0geXB4KTtcbiAgICAgICAgICAgIHJldHVybiAoZHlSYXcgPCByYWQpID8gKGtpbmsgKiBkeVJhdyAvIHJhZCkgOiAoZHlSYXcgLSByYWQgKyBraW5rKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGR4eSA9IGZ1bmN0aW9uKGRpKSB7XG4gICAgICAgICAgICAvLyBzY2F0dGVyIHBvaW50czogZC5tcmMgaXMgdGhlIGNhbGN1bGF0ZWQgbWFya2VyIHJhZGl1c1xuICAgICAgICAgICAgLy8gYWRqdXN0IHRoZSBkaXN0YW5jZSBzbyBpZiB5b3UncmUgaW5zaWRlIHRoZSBtYXJrZXIgaXRcbiAgICAgICAgICAgIC8vIGFsd2F5cyB3aWxsIHNob3cgdXAgcmVnYXJkbGVzcyBvZiBwb2ludCBzaXplLCBidXRcbiAgICAgICAgICAgIC8vIHByaW9yaXRpemUgc21hbGxlciBwb2ludHNcbiAgICAgICAgICAgIHZhciByYWQgPSBNYXRoLm1heChtaW5SYWQsIGRpLm1yYyB8fCAwKTtcbiAgICAgICAgICAgIHZhciBkeCA9IHhhLmMycChkaS54KSAtIHhweDtcbiAgICAgICAgICAgIHZhciBkeSA9IHlhLmMycChkaS55KSAtIHlweDtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpIC0gcmFkLCAxIC0gbWluUmFkIC8gcmFkKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGRpc3RmbiA9IEZ4LmdldERpc3RhbmNlRnVuY3Rpb24oaG92ZXJtb2RlLCBkeCwgZHksIGR4eSk7XG5cbiAgICAgICAgRnguZ2V0Q2xvc2VzdChjZCwgZGlzdGZuLCBwb2ludERhdGEpO1xuXG4gICAgICAgIC8vIHNraXAgdGhlIHJlc3QgKGZvciB0aGlzIHRyYWNlKSBpZiB3ZSBkaWRuJ3QgZmluZCBhIGNsb3NlIHBvaW50XG4gICAgICAgIGlmKHBvaW50RGF0YS5pbmRleCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIHRoZSBjbG9zZXN0IGRhdGEgcG9pbnRcbiAgICAgICAgICAgIHZhciBkaSA9IGNkW3BvaW50RGF0YS5pbmRleF07XG4gICAgICAgICAgICB2YXIgeGMgPSB4YS5jMnAoZGkueCwgdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgeWMgPSB5YS5jMnAoZGkueSwgdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgcmFkID0gZGkubXJjIHx8IDE7XG5cbiAgICAgICAgICAgIC8vIG5vdyB3ZSdyZSBkb25lIHVzaW5nIHRoZSB3aG9sZSBgY2FsY2RhdGFgIGFycmF5LCByZXBsYWNlIHRoZVxuICAgICAgICAgICAgLy8gaW5kZXggd2l0aCB0aGUgb3JpZ2luYWwgaW5kZXggKGluIGNhc2Ugb2YgaW5zZXJ0ZWQgcG9pbnQgZnJvbVxuICAgICAgICAgICAgLy8gc3RhY2tlZCBhcmVhKVxuICAgICAgICAgICAgcG9pbnREYXRhLmluZGV4ID0gZGkuaTtcblxuICAgICAgICAgICAgdmFyIG9yaWVudGF0aW9uID0gY2RbMF0udC5vcmllbnRhdGlvbjtcbiAgICAgICAgICAgIC8vIFRPRE86IGZvciBzY2F0dGVyIGFuZCBiYXIsIG9wdGlvbiB0byBzaG93IChzdWIpdG90YWxzIGFuZFxuICAgICAgICAgICAgLy8gcmF3IGRhdGE/IEN1cnJlbnRseSBzdGFja2VkIGFuZC9vciBub3JtYWxpemVkIGJhcnMganVzdCBzaG93XG4gICAgICAgICAgICAvLyB0aGUgbm9ybWFsaXplZCBpbmRpdmlkdWFsIHNpemVzLCBzbyB0aGF0J3Mgd2hhdCBJJ20gZG9pbmcgaGVyZVxuICAgICAgICAgICAgLy8gZm9yIG5vdy5cbiAgICAgICAgICAgIHZhciBzaXplVmFsID0gb3JpZW50YXRpb24gJiYgKGRpLnNOb3JtIHx8IGRpLnMpO1xuICAgICAgICAgICAgdmFyIHhMYWJlbFZhbCA9IChvcmllbnRhdGlvbiA9PT0gJ2gnKSA/IHNpemVWYWwgOiBkaS54O1xuICAgICAgICAgICAgdmFyIHlMYWJlbFZhbCA9IChvcmllbnRhdGlvbiA9PT0gJ3YnKSA/IHNpemVWYWwgOiBkaS55O1xuXG4gICAgICAgICAgICBMaWIuZXh0ZW5kRmxhdChwb2ludERhdGEsIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogZ2V0VHJhY2VDb2xvcih0cmFjZSwgZGkpLFxuXG4gICAgICAgICAgICAgICAgeDA6IHhjIC0gcmFkLFxuICAgICAgICAgICAgICAgIHgxOiB4YyArIHJhZCxcbiAgICAgICAgICAgICAgICB4TGFiZWxWYWw6IHhMYWJlbFZhbCxcblxuICAgICAgICAgICAgICAgIHkwOiB5YyAtIHJhZCxcbiAgICAgICAgICAgICAgICB5MTogeWMgKyByYWQsXG4gICAgICAgICAgICAgICAgeUxhYmVsVmFsOiB5TGFiZWxWYWwsXG5cbiAgICAgICAgICAgICAgICBzcGlrZURpc3RhbmNlOiBkeHkoZGkpLFxuICAgICAgICAgICAgICAgIGhvdmVydGVtcGxhdGU6IHRyYWNlLmhvdmVydGVtcGxhdGVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmaWxsVGV4dChkaSwgdHJhY2UsIHBvaW50RGF0YSk7XG4gICAgICAgICAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdob3ZlckluZm8nKShkaSwgdHJhY2UsIHBvaW50RGF0YSk7XG5cbiAgICAgICAgICAgIHJldHVybiBbcG9pbnREYXRhXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV2ZW4gaWYgaG92ZXJvbiBpcyAnZmlsbHMnLCBvbmx5IHVzZSBpdCBpZiB3ZSBoYXZlIHBvbHlnb25zIHRvb1xuICAgIGlmKGhvdmVyb24uaW5kZXhPZignZmlsbHMnKSAhPT0gLTEgJiYgdHJhY2UuX3BvbHlnb25zKSB7XG4gICAgICAgIHZhciBwb2x5Z29ucyA9IHRyYWNlLl9wb2x5Z29ucztcbiAgICAgICAgdmFyIHBvbHlnb25zSW4gPSBbXTtcbiAgICAgICAgdmFyIGluc2lkZSA9IGZhbHNlO1xuICAgICAgICB2YXIgeG1pbiA9IEluZmluaXR5O1xuICAgICAgICB2YXIgeG1heCA9IC1JbmZpbml0eTtcbiAgICAgICAgdmFyIHltaW4gPSBJbmZpbml0eTtcbiAgICAgICAgdmFyIHltYXggPSAtSW5maW5pdHk7XG5cbiAgICAgICAgdmFyIGksIGosIHBvbHlnb24sIHB0cywgeENyb3NzLCB4MCwgeDEsIHkwLCB5MTtcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBwb2x5Z29ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcG9seWdvbiA9IHBvbHlnb25zW2ldO1xuICAgICAgICAgICAgLy8gVE9ETzogdGhpcyBpcyBub3QgZ29pbmcgdG8gd29yayByaWdodCBmb3IgY3VydmVkIGVkZ2VzLCBpdCB3aWxsXG4gICAgICAgICAgICAvLyBhY3QgYXMgdGhvdWdoIHRoZXkncmUgc3RyYWlnaHQuIFRoYXQncyBwcm9iYWJseSBnb2luZyB0byBuZWVkXG4gICAgICAgICAgICAvLyB0aGUgZWxlbWVudHMgdGhlbXNlbHZlcyB0byBjYXB0dXJlIHRoZSBldmVudHMuIFdvcnRoIGl0P1xuICAgICAgICAgICAgaWYocG9seWdvbi5jb250YWlucyhwdCkpIHtcbiAgICAgICAgICAgICAgICBpbnNpZGUgPSAhaW5zaWRlO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lZWQgYmV0dGVyIHRoYW4ganVzdCB0aGUgb3ZlcmFsbCBib3VuZGluZyBib3hcbiAgICAgICAgICAgICAgICBwb2x5Z29uc0luLnB1c2gocG9seWdvbik7XG4gICAgICAgICAgICAgICAgeW1pbiA9IE1hdGgubWluKHltaW4sIHBvbHlnb24ueW1pbik7XG4gICAgICAgICAgICAgICAgeW1heCA9IE1hdGgubWF4KHltYXgsIHBvbHlnb24ueW1heCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihpbnNpZGUpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0cmFpbiB5bWluL21heCB0byB0aGUgdmlzaWJsZSBwbG90LCBzbyB0aGUgbGFiZWwgZ29lc1xuICAgICAgICAgICAgLy8gYXQgdGhlIG1pZGRsZSBvZiB0aGUgcGllY2UgeW91IGNhbiBzZWVcbiAgICAgICAgICAgIHltaW4gPSBNYXRoLm1heCh5bWluLCAwKTtcbiAgICAgICAgICAgIHltYXggPSBNYXRoLm1pbih5bWF4LCB5YS5fbGVuZ3RoKTtcblxuICAgICAgICAgICAgLy8gZmluZCB0aGUgb3ZlcmFsbCBsZWZ0LW1vc3QgYW5kIHJpZ2h0LW1vc3QgcG9pbnRzIG9mIHRoZVxuICAgICAgICAgICAgLy8gcG9seWdvbihzKSB3ZSdyZSBpbnNpZGUgYXQgdGhlaXIgY29tYmluZWQgdmVydGljYWwgbWlkcG9pbnQuXG4gICAgICAgICAgICAvLyBUaGlzIGlzIHdoZXJlIHdlIHdpbGwgZHJhdyB0aGUgaG92ZXIgbGFiZWwuXG4gICAgICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyBtaWdodCBub3QgYmUgdGhlIHZlcnRpY2FsIG1pZHBvaW50IG9mIHRoZVxuICAgICAgICAgICAgLy8gd2hvbGUgdHJhY2UsIGlmIGl0J3MgZGlzam9pbnQuXG4gICAgICAgICAgICB2YXIgeUF2ZyA9ICh5bWluICsgeW1heCkgLyAyO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgcG9seWdvbnNJbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHB0cyA9IHBvbHlnb25zSW5baV0ucHRzO1xuICAgICAgICAgICAgICAgIGZvcihqID0gMTsgaiA8IHB0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB5MCA9IHB0c1tqIC0gMV1bMV07XG4gICAgICAgICAgICAgICAgICAgIHkxID0gcHRzW2pdWzFdO1xuICAgICAgICAgICAgICAgICAgICBpZigoeTAgPiB5QXZnKSAhPT0gKHkxID49IHlBdmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4MCA9IHB0c1tqIC0gMV1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB4MSA9IHB0c1tqXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHkxIC0geTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Q3Jvc3MgPSB4MCArICh4MSAtIHgwKSAqICh5QXZnIC0geTApIC8gKHkxIC0geTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtaW4gPSBNYXRoLm1pbih4bWluLCB4Q3Jvc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtYXggPSBNYXRoLm1heCh4bWF4LCB4Q3Jvc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb25zdHJhaW4geG1pbi9tYXggdG8gdGhlIHZpc2libGUgcGxvdCBub3cgdG9vXG4gICAgICAgICAgICB4bWluID0gTWF0aC5tYXgoeG1pbiwgMCk7XG4gICAgICAgICAgICB4bWF4ID0gTWF0aC5taW4oeG1heCwgeGEuX2xlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIGdldCBvbmx5IGZpbGwgb3IgbGluZSBjb2xvciBmb3IgdGhlIGhvdmVyIGNvbG9yXG4gICAgICAgICAgICB2YXIgY29sb3IgPSBDb2xvci5kZWZhdWx0TGluZTtcbiAgICAgICAgICAgIGlmKENvbG9yLm9wYWNpdHkodHJhY2UuZmlsbGNvbG9yKSkgY29sb3IgPSB0cmFjZS5maWxsY29sb3I7XG4gICAgICAgICAgICBlbHNlIGlmKENvbG9yLm9wYWNpdHkoKHRyYWNlLmxpbmUgfHwge30pLmNvbG9yKSkge1xuICAgICAgICAgICAgICAgIGNvbG9yID0gdHJhY2UubGluZS5jb2xvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTGliLmV4dGVuZEZsYXQocG9pbnREYXRhLCB7XG4gICAgICAgICAgICAgICAgLy8gbmV2ZXIgbGV0IGEgMkQgb3ZlcnJpZGUgMUQgdHlwZSBhcyBjbG9zZXN0IHBvaW50XG4gICAgICAgICAgICAgICAgLy8gYWxzbzogbm8gc3Bpa2VEaXN0YW5jZSwgaXQncyBub3QgYWxsb3dlZCBmb3IgZmlsbHNcbiAgICAgICAgICAgICAgICBkaXN0YW5jZTogcG9pbnREYXRhLm1heEhvdmVyRGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgeDA6IHhtaW4sXG4gICAgICAgICAgICAgICAgeDE6IHhtYXgsXG4gICAgICAgICAgICAgICAgeTA6IHlBdmcsXG4gICAgICAgICAgICAgICAgeTE6IHlBdmcsXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICAgIGhvdmVydGVtcGxhdGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVsZXRlIHBvaW50RGF0YS5pbmRleDtcblxuICAgICAgICAgICAgaWYodHJhY2UudGV4dCAmJiAhQXJyYXkuaXNBcnJheSh0cmFjZS50ZXh0KSkge1xuICAgICAgICAgICAgICAgIHBvaW50RGF0YS50ZXh0ID0gU3RyaW5nKHRyYWNlLnRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHBvaW50RGF0YS50ZXh0ID0gdHJhY2UubmFtZTtcblxuICAgICAgICAgICAgcmV0dXJuIFtwb2ludERhdGFdO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xudmFyIGhhc0NvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvaGVscGVycycpLmhhc0NvbG9yc2NhbGU7XG52YXIgY29sb3JzY2FsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2RlZmF1bHRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGluZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlLCBvcHRzKSB7XG4gICAgdmFyIG1hcmtlckNvbG9yID0gKHRyYWNlSW4ubWFya2VyIHx8IHt9KS5jb2xvcjtcblxuICAgIGNvZXJjZSgnbGluZS5jb2xvcicsIGRlZmF1bHRDb2xvcik7XG5cbiAgICBpZihoYXNDb2xvcnNjYWxlKHRyYWNlSW4sICdsaW5lJykpIHtcbiAgICAgICAgY29sb3JzY2FsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge3ByZWZpeDogJ2xpbmUuJywgY0xldHRlcjogJ2MnfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGxpbmVDb2xvckRmbHQgPSAoaXNBcnJheU9yVHlwZWRBcnJheShtYXJrZXJDb2xvcikgPyBmYWxzZSA6IG1hcmtlckNvbG9yKSB8fCBkZWZhdWx0Q29sb3I7XG4gICAgICAgIGNvZXJjZSgnbGluZS5jb2xvcicsIGxpbmVDb2xvckRmbHQpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnbGluZS53aWR0aCcpO1xuICAgIGlmKCEob3B0cyB8fCB7fSkubm9EYXNoKSBjb2VyY2UoJ2xpbmUuZGFzaCcpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbi8vIGNvbW1vbiB0byAnc2NhdHRlcicgYW5kICdzY2F0dGVydGVybmFyeSdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlTGluZVNoYXBlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSkge1xuICAgIHZhciBzaGFwZSA9IGNvZXJjZSgnbGluZS5zaGFwZScpO1xuICAgIGlmKHNoYXBlID09PSAnc3BsaW5lJykgY29lcmNlKCdsaW5lLnNtb290aGluZycpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbi8qXG4gKiBvcHRzOiBvYmplY3Qgb2YgZmxhZ3MgdG8gY29udHJvbCBmZWF0dXJlcyBub3QgYWxsIHRleHQgdXNlcnMgc3VwcG9ydFxuICogICBub1NlbGVjdDogY2FsbGVyIGRvZXMgbm90IHN1cHBvcnQgc2VsZWN0ZWQvdW5zZWxlY3RlZCBhdHRyaWJ1dGUgY29udGFpbmVyc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgb3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgY29lcmNlKCd0ZXh0cG9zaXRpb24nKTtcbiAgICBMaWIuY29lcmNlRm9udChjb2VyY2UsICd0ZXh0Zm9udCcsIGxheW91dC5mb250KTtcblxuICAgIGlmKCFvcHRzLm5vU2VsZWN0KSB7XG4gICAgICAgIGNvZXJjZSgnc2VsZWN0ZWQudGV4dGZvbnQuY29sb3InKTtcbiAgICAgICAgY29lcmNlKCd1bnNlbGVjdGVkLnRleHRmb250LmNvbG9yJyk7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=