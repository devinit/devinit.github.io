(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_scattergl_js"],{

/***/ "./node_modules/plotly.js/lib/scattergl.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/scattergl.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/scattergl */ "./node_modules/plotly.js/src/traces/scattergl/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/calc.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/calc.js ***!
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



var cluster = __webpack_require__(/*! point-cluster */ "./node_modules/point-cluster/index.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var AxisIDs = __webpack_require__(/*! ../../plots/cartesian/axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js");
var findExtremes = __webpack_require__(/*! ../../plots/cartesian/autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").findExtremes;

var scatterCalc = __webpack_require__(/*! ../scatter/calc */ "./node_modules/plotly.js/src/traces/scatter/calc.js");
var calcMarkerSize = scatterCalc.calcMarkerSize;
var calcAxisExpansion = scatterCalc.calcAxisExpansion;
var setFirstScatter = scatterCalc.setFirstScatter;
var calcColorscale = __webpack_require__(/*! ../scatter/colorscale_calc */ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js");
var convert = __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/scattergl/convert.js");
var sceneUpdate = __webpack_require__(/*! ./scene_update */ "./node_modules/plotly.js/src/traces/scattergl/scene_update.js");

var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;
var TOO_MANY_POINTS = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/scattergl/constants.js").TOO_MANY_POINTS;

module.exports = function calc(gd, trace) {
    var fullLayout = gd._fullLayout;
    var xa = AxisIDs.getFromId(gd, trace.xaxis);
    var ya = AxisIDs.getFromId(gd, trace.yaxis);
    var subplot = fullLayout._plots[trace.xaxis + trace.yaxis];
    var len = trace._length;
    var hasTooManyPoints = len >= TOO_MANY_POINTS;
    var len2 = len * 2;
    var stash = {};
    var i, xx, yy;

    var x = trace._x = xa.makeCalcdata(trace, 'x');
    var y = trace._y = ya.makeCalcdata(trace, 'y');

    // we need hi-precision for scatter2d,
    // regl-scatter2d uses NaNs for bad/missing values
    var positions = new Array(len2);
    for(i = 0; i < len; i++) {
        xx = x[i];
        yy = y[i];
        positions[i * 2] = xx === BADNUM ? NaN : xx;
        positions[i * 2 + 1] = yy === BADNUM ? NaN : yy;
    }

    if(xa.type === 'log') {
        for(i = 0; i < len2; i += 2) {
            positions[i] = xa.c2l(positions[i]);
        }
    }
    if(ya.type === 'log') {
        for(i = 1; i < len2; i += 2) {
            positions[i] = ya.c2l(positions[i]);
        }
    }

    // we don't build a tree for log axes since it takes long to convert log2px
    // and it is also
    if(hasTooManyPoints && (xa.type !== 'log' && ya.type !== 'log')) {
        // FIXME: delegate this to webworker
        stash.tree = cluster(positions);
    } else {
        var ids = stash.ids = new Array(len);
        for(i = 0; i < len; i++) {
            ids[i] = i;
        }
    }

    // create scene options and scene
    calcColorscale(gd, trace);
    var opts = sceneOptions(gd, subplot, trace, positions, x, y);
    var scene = sceneUpdate(gd, subplot);

    // Reuse SVG scatter axis expansion routine.
    // For graphs with very large number of points and array marker.size,
    // use average marker size instead to speed things up.
    setFirstScatter(fullLayout, trace);
    var ppad;
    if(!hasTooManyPoints) {
        ppad = calcMarkerSize(trace, len);
    } else if(opts.marker) {
        ppad = 2 * (opts.marker.sizeAvg || Math.max(opts.marker.size, 3));
    }
    calcAxisExpansion(gd, trace, xa, ya, x, y, ppad);
    if(opts.errorX) expandForErrorBars(trace, xa, opts.errorX);
    if(opts.errorY) expandForErrorBars(trace, ya, opts.errorY);

    // set flags to create scene renderers
    if(opts.fill && !scene.fill2d) scene.fill2d = true;
    if(opts.marker && !scene.scatter2d) scene.scatter2d = true;
    if(opts.line && !scene.line2d) scene.line2d = true;
    if((opts.errorX || opts.errorY) && !scene.error2d) scene.error2d = true;
    if(opts.text && !scene.glText) scene.glText = true;
    if(opts.marker) opts.marker.snap = len;

    scene.lineOptions.push(opts.line);
    scene.errorXOptions.push(opts.errorX);
    scene.errorYOptions.push(opts.errorY);
    scene.fillOptions.push(opts.fill);
    scene.markerOptions.push(opts.marker);
    scene.markerSelectedOptions.push(opts.markerSel);
    scene.markerUnselectedOptions.push(opts.markerUnsel);
    scene.textOptions.push(opts.text);
    scene.textSelectedOptions.push(opts.textSel);
    scene.textUnselectedOptions.push(opts.textUnsel);
    scene.selectBatch.push([]);
    scene.unselectBatch.push([]);

    stash._scene = scene;
    stash.index = scene.count;
    stash.x = x;
    stash.y = y;
    stash.positions = positions;
    scene.count++;

    return [{x: false, y: false, t: stash, trace: trace}];
};

function expandForErrorBars(trace, ax, opts) {
    var extremes = trace._extremes[ax._id];
    var errExt = findExtremes(ax, opts._bnds, {padded: true});
    extremes.min = extremes.min.concat(errExt.min);
    extremes.max = extremes.max.concat(errExt.max);
}

function sceneOptions(gd, subplot, trace, positions, x, y) {
    var opts = convert.style(gd, trace);

    if(opts.marker) {
        opts.marker.positions = positions;
    }

    if(opts.line && positions.length > 1) {
        Lib.extendFlat(
            opts.line,
            convert.linePositions(gd, trace, positions)
        );
    }

    if(opts.errorX || opts.errorY) {
        var errors = convert.errorBarPositions(gd, trace, positions, x, y);

        if(opts.errorX) {
            Lib.extendFlat(opts.errorX, errors.x);
        }
        if(opts.errorY) {
            Lib.extendFlat(opts.errorY, errors.y);
        }
    }

    if(opts.text) {
        Lib.extendFlat(
            opts.text,
            {positions: positions},
            convert.textPosition(gd, trace, opts.text, opts.marker)
        );
        Lib.extendFlat(
            opts.textSel,
            {positions: positions},
            convert.textPosition(gd, trace, opts.text, opts.markerSel)
        );
        Lib.extendFlat(
            opts.textUnsel,
            {positions: positions},
            convert.textPosition(gd, trace, opts.text, opts.markerUnsel)
        );
    }

    return opts;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/scattergl/helpers.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scattergl/attributes.js");
var constants = __webpack_require__(/*! ../scatter/constants */ "./node_modules/plotly.js/src/traces/scatter/constants.js");
var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var handleXYDefaults = __webpack_require__(/*! ../scatter/xy_defaults */ "./node_modules/plotly.js/src/traces/scatter/xy_defaults.js");
var handleMarkerDefaults = __webpack_require__(/*! ../scatter/marker_defaults */ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js");
var handleLineDefaults = __webpack_require__(/*! ../scatter/line_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js");
var handleFillColorDefaults = __webpack_require__(/*! ../scatter/fillcolor_defaults */ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js");
var handleTextDefaults = __webpack_require__(/*! ../scatter/text_defaults */ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var isOpen = traceIn.marker ? helpers.isOpenSymbol(traceIn.marker.symbol) : false;
    var isBubble = subTypes.isBubble(traceIn);

    var len = handleXYDefaults(traceIn, traceOut, layout, coerce);
    if(!len) {
        traceOut.visible = false;
        return;
    }
    var defaultMode = len < constants.PTS_LINESONLY ? 'lines+markers' : 'lines';

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');
    coerce('mode', defaultMode);

    if(subTypes.hasLines(traceOut)) {
        coerce('connectgaps');
        handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);
        coerce('line.shape');
    }

    if(subTypes.hasMarkers(traceOut)) {
        handleMarkerDefaults(traceIn, traceOut, defaultColor, layout, coerce);
        coerce('marker.line.width', isOpen || isBubble ? 1 : 0);
    }

    if(subTypes.hasText(traceOut)) {
        coerce('texttemplate');
        handleTextDefaults(traceIn, traceOut, layout, coerce);
    }

    var lineColor = (traceOut.line || {}).color;
    var markerColor = (traceOut.marker || {}).color;

    coerce('fill');
    if(traceOut.fill !== 'none') {
        handleFillColorDefaults(traceIn, traceOut, defaultColor, coerce);
    }

    var errorBarsSupplyDefaults = Registry.getComponentMethod('errorbars', 'supplyDefaults');
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || markerColor || defaultColor, {axis: 'y'});
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || markerColor || defaultColor, {axis: 'x', inherit: 'y'});

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/format_labels.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/format_labels.js ***!
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



var scatterFormatLabels = __webpack_require__(/*! ../scatter/format_labels */ "./node_modules/plotly.js/src/traces/scatter/format_labels.js");

module.exports = function formatLabels(cdi, trace, fullLayout) {
    var i = cdi.i;
    if(!('x' in cdi)) cdi.x = trace._x[i];
    if(!('y' in cdi)) cdi.y = trace._y[i];
    return scatterFormatLabels(cdi, trace, fullLayout);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/index.js ***!
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



var hover = __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/scattergl/hover.js");

module.exports = {
    moduleType: 'trace',
    name: 'scattergl',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['gl', 'regl', 'cartesian', 'symbols', 'errorBarsOK', 'showLegend', 'scatter-like'],

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scattergl/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/scattergl/defaults.js"),
    crossTraceDefaults: __webpack_require__(/*! ../scatter/cross_trace_defaults */ "./node_modules/plotly.js/src/traces/scatter/cross_trace_defaults.js"),
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    formatLabels: __webpack_require__(/*! ./format_labels */ "./node_modules/plotly.js/src/traces/scattergl/format_labels.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/scattergl/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/scattergl/plot.js"),
    hoverPoints: hover.hoverPoints,
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/scattergl/select.js"),

    meta: {
        hrName: 'scatter_gl',
        description: [
            'The data visualized as scatter point or lines is set in `x` and `y`',
            'using the WebGL plotting engine.',
            'Bubble charts are achieved by setting `marker.size` and/or `marker.color`',
            'to a numerical arrays.'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc2NhdHRlcmdsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcmdsL2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyZ2wvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyZ2wvZm9ybWF0X2xhYmVscy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJnbC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYiw2SEFBbUQ7Ozs7Ozs7Ozs7OztBQ1ZuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixjQUFjLG1CQUFPLENBQUMsNERBQWU7O0FBRXJDLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixjQUFjLG1CQUFPLENBQUMsZ0dBQWdDO0FBQ3RELG1CQUFtQixvSUFBdUQ7O0FBRTFFLGtCQUFrQixtQkFBTyxDQUFDLDRFQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyxrR0FBNEI7QUFDekQsY0FBYyxtQkFBTyxDQUFDLDJFQUFXO0FBQ2pDLGtCQUFrQixtQkFBTyxDQUFDLHFGQUFnQjs7QUFFMUMsYUFBYSxrSEFBMkM7QUFDeEQsc0JBQXNCLG9IQUFzQzs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixVQUFVO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFVBQVU7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsMkNBQTJDO0FBQ3hEOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0MsYUFBYTtBQUM1RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxxQkFBcUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEscUJBQXFCO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRXZDLGNBQWMsbUJBQU8sQ0FBQywyRUFBVztBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyxpRkFBYztBQUN2QyxnQkFBZ0IsbUJBQU8sQ0FBQyxzRkFBc0I7QUFDOUMsZUFBZSxtQkFBTyxDQUFDLG9GQUFxQjtBQUM1Qyx1QkFBdUIsbUJBQU8sQ0FBQywwRkFBd0I7QUFDdkQsMkJBQTJCLG1CQUFPLENBQUMsa0dBQTRCO0FBQy9ELHlCQUF5QixtQkFBTyxDQUFDLDhGQUEwQjtBQUMzRCw4QkFBOEIsbUJBQU8sQ0FBQyx3R0FBK0I7QUFDckUseUJBQXlCLG1CQUFPLENBQUMsOEZBQTBCOztBQUUzRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4Qyw0Q0FBNEM7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEZBQTBGLFVBQVU7QUFDcEcsMEZBQTBGLHdCQUF3Qjs7QUFFbEg7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLDBCQUEwQixtQkFBTyxDQUFDLDhGQUEwQjs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHVFQUFTOztBQUU3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyxvRkFBdUI7QUFDbkQ7O0FBRUEsZ0JBQWdCLG1CQUFPLENBQUMsaUZBQWM7QUFDdEMsb0JBQW9CLG1CQUFPLENBQUMsNkVBQVk7QUFDeEMsd0JBQXdCLG1CQUFPLENBQUMsNEdBQWlDO0FBQ2pFLGNBQWMsbUJBQU8sQ0FBQyxrR0FBNEI7QUFDbEQsa0JBQWtCLG1CQUFPLENBQUMsdUZBQWlCO0FBQzNDLFVBQVUsbUJBQU8sQ0FBQyxxRUFBUTtBQUMxQixVQUFVLG1CQUFPLENBQUMscUVBQVE7QUFDMUI7QUFDQSxrQkFBa0IsbUJBQU8sQ0FBQyx5RUFBVTs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ5OWJlNmM1OWU5OTljYTUwZjg3Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL3NjYXR0ZXJnbCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2x1c3RlciA9IHJlcXVpcmUoJ3BvaW50LWNsdXN0ZXInKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEF4aXNJRHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhpc19pZHMnKTtcbnZhciBmaW5kRXh0cmVtZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXV0b3JhbmdlJykuZmluZEV4dHJlbWVzO1xuXG52YXIgc2NhdHRlckNhbGMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NhbGMnKTtcbnZhciBjYWxjTWFya2VyU2l6ZSA9IHNjYXR0ZXJDYWxjLmNhbGNNYXJrZXJTaXplO1xudmFyIGNhbGNBeGlzRXhwYW5zaW9uID0gc2NhdHRlckNhbGMuY2FsY0F4aXNFeHBhbnNpb247XG52YXIgc2V0Rmlyc3RTY2F0dGVyID0gc2NhdHRlckNhbGMuc2V0Rmlyc3RTY2F0dGVyO1xudmFyIGNhbGNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMnKTtcbnZhciBjb252ZXJ0ID0gcmVxdWlyZSgnLi9jb252ZXJ0Jyk7XG52YXIgc2NlbmVVcGRhdGUgPSByZXF1aXJlKCcuL3NjZW5lX3VwZGF0ZScpO1xuXG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcbnZhciBUT09fTUFOWV9QT0lOVFMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpLlRPT19NQU5ZX1BPSU5UUztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIHhhID0gQXhpc0lEcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLnhheGlzKTtcbiAgICB2YXIgeWEgPSBBeGlzSURzLmdldEZyb21JZChnZCwgdHJhY2UueWF4aXMpO1xuICAgIHZhciBzdWJwbG90ID0gZnVsbExheW91dC5fcGxvdHNbdHJhY2UueGF4aXMgKyB0cmFjZS55YXhpc107XG4gICAgdmFyIGxlbiA9IHRyYWNlLl9sZW5ndGg7XG4gICAgdmFyIGhhc1Rvb01hbnlQb2ludHMgPSBsZW4gPj0gVE9PX01BTllfUE9JTlRTO1xuICAgIHZhciBsZW4yID0gbGVuICogMjtcbiAgICB2YXIgc3Rhc2ggPSB7fTtcbiAgICB2YXIgaSwgeHgsIHl5O1xuXG4gICAgdmFyIHggPSB0cmFjZS5feCA9IHhhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3gnKTtcbiAgICB2YXIgeSA9IHRyYWNlLl95ID0geWEubWFrZUNhbGNkYXRhKHRyYWNlLCAneScpO1xuXG4gICAgLy8gd2UgbmVlZCBoaS1wcmVjaXNpb24gZm9yIHNjYXR0ZXIyZCxcbiAgICAvLyByZWdsLXNjYXR0ZXIyZCB1c2VzIE5hTnMgZm9yIGJhZC9taXNzaW5nIHZhbHVlc1xuICAgIHZhciBwb3NpdGlvbnMgPSBuZXcgQXJyYXkobGVuMik7XG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgeHggPSB4W2ldO1xuICAgICAgICB5eSA9IHlbaV07XG4gICAgICAgIHBvc2l0aW9uc1tpICogMl0gPSB4eCA9PT0gQkFETlVNID8gTmFOIDogeHg7XG4gICAgICAgIHBvc2l0aW9uc1tpICogMiArIDFdID0geXkgPT09IEJBRE5VTSA/IE5hTiA6IHl5O1xuICAgIH1cblxuICAgIGlmKHhhLnR5cGUgPT09ICdsb2cnKSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjI7IGkgKz0gMikge1xuICAgICAgICAgICAgcG9zaXRpb25zW2ldID0geGEuYzJsKHBvc2l0aW9uc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoeWEudHlwZSA9PT0gJ2xvZycpIHtcbiAgICAgICAgZm9yKGkgPSAxOyBpIDwgbGVuMjsgaSArPSAyKSB7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaV0gPSB5YS5jMmwocG9zaXRpb25zW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHdlIGRvbid0IGJ1aWxkIGEgdHJlZSBmb3IgbG9nIGF4ZXMgc2luY2UgaXQgdGFrZXMgbG9uZyB0byBjb252ZXJ0IGxvZzJweFxuICAgIC8vIGFuZCBpdCBpcyBhbHNvXG4gICAgaWYoaGFzVG9vTWFueVBvaW50cyAmJiAoeGEudHlwZSAhPT0gJ2xvZycgJiYgeWEudHlwZSAhPT0gJ2xvZycpKSB7XG4gICAgICAgIC8vIEZJWE1FOiBkZWxlZ2F0ZSB0aGlzIHRvIHdlYndvcmtlclxuICAgICAgICBzdGFzaC50cmVlID0gY2x1c3Rlcihwb3NpdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpZHMgPSBzdGFzaC5pZHMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlkc1tpXSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgc2NlbmUgb3B0aW9ucyBhbmQgc2NlbmVcbiAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UpO1xuICAgIHZhciBvcHRzID0gc2NlbmVPcHRpb25zKGdkLCBzdWJwbG90LCB0cmFjZSwgcG9zaXRpb25zLCB4LCB5KTtcbiAgICB2YXIgc2NlbmUgPSBzY2VuZVVwZGF0ZShnZCwgc3VicGxvdCk7XG5cbiAgICAvLyBSZXVzZSBTVkcgc2NhdHRlciBheGlzIGV4cGFuc2lvbiByb3V0aW5lLlxuICAgIC8vIEZvciBncmFwaHMgd2l0aCB2ZXJ5IGxhcmdlIG51bWJlciBvZiBwb2ludHMgYW5kIGFycmF5IG1hcmtlci5zaXplLFxuICAgIC8vIHVzZSBhdmVyYWdlIG1hcmtlciBzaXplIGluc3RlYWQgdG8gc3BlZWQgdGhpbmdzIHVwLlxuICAgIHNldEZpcnN0U2NhdHRlcihmdWxsTGF5b3V0LCB0cmFjZSk7XG4gICAgdmFyIHBwYWQ7XG4gICAgaWYoIWhhc1Rvb01hbnlQb2ludHMpIHtcbiAgICAgICAgcHBhZCA9IGNhbGNNYXJrZXJTaXplKHRyYWNlLCBsZW4pO1xuICAgIH0gZWxzZSBpZihvcHRzLm1hcmtlcikge1xuICAgICAgICBwcGFkID0gMiAqIChvcHRzLm1hcmtlci5zaXplQXZnIHx8IE1hdGgubWF4KG9wdHMubWFya2VyLnNpemUsIDMpKTtcbiAgICB9XG4gICAgY2FsY0F4aXNFeHBhbnNpb24oZ2QsIHRyYWNlLCB4YSwgeWEsIHgsIHksIHBwYWQpO1xuICAgIGlmKG9wdHMuZXJyb3JYKSBleHBhbmRGb3JFcnJvckJhcnModHJhY2UsIHhhLCBvcHRzLmVycm9yWCk7XG4gICAgaWYob3B0cy5lcnJvclkpIGV4cGFuZEZvckVycm9yQmFycyh0cmFjZSwgeWEsIG9wdHMuZXJyb3JZKTtcblxuICAgIC8vIHNldCBmbGFncyB0byBjcmVhdGUgc2NlbmUgcmVuZGVyZXJzXG4gICAgaWYob3B0cy5maWxsICYmICFzY2VuZS5maWxsMmQpIHNjZW5lLmZpbGwyZCA9IHRydWU7XG4gICAgaWYob3B0cy5tYXJrZXIgJiYgIXNjZW5lLnNjYXR0ZXIyZCkgc2NlbmUuc2NhdHRlcjJkID0gdHJ1ZTtcbiAgICBpZihvcHRzLmxpbmUgJiYgIXNjZW5lLmxpbmUyZCkgc2NlbmUubGluZTJkID0gdHJ1ZTtcbiAgICBpZigob3B0cy5lcnJvclggfHwgb3B0cy5lcnJvclkpICYmICFzY2VuZS5lcnJvcjJkKSBzY2VuZS5lcnJvcjJkID0gdHJ1ZTtcbiAgICBpZihvcHRzLnRleHQgJiYgIXNjZW5lLmdsVGV4dCkgc2NlbmUuZ2xUZXh0ID0gdHJ1ZTtcbiAgICBpZihvcHRzLm1hcmtlcikgb3B0cy5tYXJrZXIuc25hcCA9IGxlbjtcblxuICAgIHNjZW5lLmxpbmVPcHRpb25zLnB1c2gob3B0cy5saW5lKTtcbiAgICBzY2VuZS5lcnJvclhPcHRpb25zLnB1c2gob3B0cy5lcnJvclgpO1xuICAgIHNjZW5lLmVycm9yWU9wdGlvbnMucHVzaChvcHRzLmVycm9yWSk7XG4gICAgc2NlbmUuZmlsbE9wdGlvbnMucHVzaChvcHRzLmZpbGwpO1xuICAgIHNjZW5lLm1hcmtlck9wdGlvbnMucHVzaChvcHRzLm1hcmtlcik7XG4gICAgc2NlbmUubWFya2VyU2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0cy5tYXJrZXJTZWwpO1xuICAgIHNjZW5lLm1hcmtlclVuc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0cy5tYXJrZXJVbnNlbCk7XG4gICAgc2NlbmUudGV4dE9wdGlvbnMucHVzaChvcHRzLnRleHQpO1xuICAgIHNjZW5lLnRleHRTZWxlY3RlZE9wdGlvbnMucHVzaChvcHRzLnRleHRTZWwpO1xuICAgIHNjZW5lLnRleHRVbnNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdHMudGV4dFVuc2VsKTtcbiAgICBzY2VuZS5zZWxlY3RCYXRjaC5wdXNoKFtdKTtcbiAgICBzY2VuZS51bnNlbGVjdEJhdGNoLnB1c2goW10pO1xuXG4gICAgc3Rhc2guX3NjZW5lID0gc2NlbmU7XG4gICAgc3Rhc2guaW5kZXggPSBzY2VuZS5jb3VudDtcbiAgICBzdGFzaC54ID0geDtcbiAgICBzdGFzaC55ID0geTtcbiAgICBzdGFzaC5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gICAgc2NlbmUuY291bnQrKztcblxuICAgIHJldHVybiBbe3g6IGZhbHNlLCB5OiBmYWxzZSwgdDogc3Rhc2gsIHRyYWNlOiB0cmFjZX1dO1xufTtcblxuZnVuY3Rpb24gZXhwYW5kRm9yRXJyb3JCYXJzKHRyYWNlLCBheCwgb3B0cykge1xuICAgIHZhciBleHRyZW1lcyA9IHRyYWNlLl9leHRyZW1lc1theC5faWRdO1xuICAgIHZhciBlcnJFeHQgPSBmaW5kRXh0cmVtZXMoYXgsIG9wdHMuX2JuZHMsIHtwYWRkZWQ6IHRydWV9KTtcbiAgICBleHRyZW1lcy5taW4gPSBleHRyZW1lcy5taW4uY29uY2F0KGVyckV4dC5taW4pO1xuICAgIGV4dHJlbWVzLm1heCA9IGV4dHJlbWVzLm1heC5jb25jYXQoZXJyRXh0Lm1heCk7XG59XG5cbmZ1bmN0aW9uIHNjZW5lT3B0aW9ucyhnZCwgc3VicGxvdCwgdHJhY2UsIHBvc2l0aW9ucywgeCwgeSkge1xuICAgIHZhciBvcHRzID0gY29udmVydC5zdHlsZShnZCwgdHJhY2UpO1xuXG4gICAgaWYob3B0cy5tYXJrZXIpIHtcbiAgICAgICAgb3B0cy5tYXJrZXIucG9zaXRpb25zID0gcG9zaXRpb25zO1xuICAgIH1cblxuICAgIGlmKG9wdHMubGluZSAmJiBwb3NpdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICBMaWIuZXh0ZW5kRmxhdChcbiAgICAgICAgICAgIG9wdHMubGluZSxcbiAgICAgICAgICAgIGNvbnZlcnQubGluZVBvc2l0aW9ucyhnZCwgdHJhY2UsIHBvc2l0aW9ucylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBpZihvcHRzLmVycm9yWCB8fCBvcHRzLmVycm9yWSkge1xuICAgICAgICB2YXIgZXJyb3JzID0gY29udmVydC5lcnJvckJhclBvc2l0aW9ucyhnZCwgdHJhY2UsIHBvc2l0aW9ucywgeCwgeSk7XG5cbiAgICAgICAgaWYob3B0cy5lcnJvclgpIHtcbiAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KG9wdHMuZXJyb3JYLCBlcnJvcnMueCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5lcnJvclkpIHtcbiAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KG9wdHMuZXJyb3JZLCBlcnJvcnMueSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihvcHRzLnRleHQpIHtcbiAgICAgICAgTGliLmV4dGVuZEZsYXQoXG4gICAgICAgICAgICBvcHRzLnRleHQsXG4gICAgICAgICAgICB7cG9zaXRpb25zOiBwb3NpdGlvbnN9LFxuICAgICAgICAgICAgY29udmVydC50ZXh0UG9zaXRpb24oZ2QsIHRyYWNlLCBvcHRzLnRleHQsIG9wdHMubWFya2VyKVxuICAgICAgICApO1xuICAgICAgICBMaWIuZXh0ZW5kRmxhdChcbiAgICAgICAgICAgIG9wdHMudGV4dFNlbCxcbiAgICAgICAgICAgIHtwb3NpdGlvbnM6IHBvc2l0aW9uc30sXG4gICAgICAgICAgICBjb252ZXJ0LnRleHRQb3NpdGlvbihnZCwgdHJhY2UsIG9wdHMudGV4dCwgb3B0cy5tYXJrZXJTZWwpXG4gICAgICAgICk7XG4gICAgICAgIExpYi5leHRlbmRGbGF0KFxuICAgICAgICAgICAgb3B0cy50ZXh0VW5zZWwsXG4gICAgICAgICAgICB7cG9zaXRpb25zOiBwb3NpdGlvbnN9LFxuICAgICAgICAgICAgY29udmVydC50ZXh0UG9zaXRpb24oZ2QsIHRyYWNlLCBvcHRzLnRleHQsIG9wdHMubWFya2VyVW5zZWwpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdHM7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvY29uc3RhbnRzJyk7XG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgaGFuZGxlWFlEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIveHlfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVNYXJrZXJEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFya2VyX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlTGluZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9saW5lX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlRmlsbENvbG9yRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2ZpbGxjb2xvcl9kZWZhdWx0cycpO1xudmFyIGhhbmRsZVRleHREZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvdGV4dF9kZWZhdWx0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgaXNPcGVuID0gdHJhY2VJbi5tYXJrZXIgPyBoZWxwZXJzLmlzT3BlblN5bWJvbCh0cmFjZUluLm1hcmtlci5zeW1ib2wpIDogZmFsc2U7XG4gICAgdmFyIGlzQnViYmxlID0gc3ViVHlwZXMuaXNCdWJibGUodHJhY2VJbik7XG5cbiAgICB2YXIgbGVuID0gaGFuZGxlWFlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBkZWZhdWx0TW9kZSA9IGxlbiA8IGNvbnN0YW50cy5QVFNfTElORVNPTkxZID8gJ2xpbmVzK21hcmtlcnMnIDogJ2xpbmVzJztcblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG4gICAgY29lcmNlKCdtb2RlJywgZGVmYXVsdE1vZGUpO1xuXG4gICAgaWYoc3ViVHlwZXMuaGFzTGluZXModHJhY2VPdXQpKSB7XG4gICAgICAgIGNvZXJjZSgnY29ubmVjdGdhcHMnKTtcbiAgICAgICAgaGFuZGxlTGluZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlKTtcbiAgICAgICAgY29lcmNlKCdsaW5lLnNoYXBlJyk7XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzTWFya2Vycyh0cmFjZU91dCkpIHtcbiAgICAgICAgaGFuZGxlTWFya2VyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UpO1xuICAgICAgICBjb2VyY2UoJ21hcmtlci5saW5lLndpZHRoJywgaXNPcGVuIHx8IGlzQnViYmxlID8gMSA6IDApO1xuICAgIH1cblxuICAgIGlmKHN1YlR5cGVzLmhhc1RleHQodHJhY2VPdXQpKSB7XG4gICAgICAgIGNvZXJjZSgndGV4dHRlbXBsYXRlJyk7XG4gICAgICAgIGhhbmRsZVRleHREZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuICAgIH1cblxuICAgIHZhciBsaW5lQ29sb3IgPSAodHJhY2VPdXQubGluZSB8fCB7fSkuY29sb3I7XG4gICAgdmFyIG1hcmtlckNvbG9yID0gKHRyYWNlT3V0Lm1hcmtlciB8fCB7fSkuY29sb3I7XG5cbiAgICBjb2VyY2UoJ2ZpbGwnKTtcbiAgICBpZih0cmFjZU91dC5maWxsICE9PSAnbm9uZScpIHtcbiAgICAgICAgaGFuZGxlRmlsbENvbG9yRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgY29lcmNlKTtcbiAgICB9XG5cbiAgICB2YXIgZXJyb3JCYXJzU3VwcGx5RGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdzdXBwbHlEZWZhdWx0cycpO1xuICAgIGVycm9yQmFyc1N1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsaW5lQ29sb3IgfHwgbWFya2VyQ29sb3IgfHwgZGVmYXVsdENvbG9yLCB7YXhpczogJ3knfSk7XG4gICAgZXJyb3JCYXJzU3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxpbmVDb2xvciB8fCBtYXJrZXJDb2xvciB8fCBkZWZhdWx0Q29sb3IsIHtheGlzOiAneCcsIGluaGVyaXQ6ICd5J30pO1xuXG4gICAgTGliLmNvZXJjZVNlbGVjdGlvbk1hcmtlck9wYWNpdHkodHJhY2VPdXQsIGNvZXJjZSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NhdHRlckZvcm1hdExhYmVscyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvZm9ybWF0X2xhYmVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvcm1hdExhYmVscyhjZGksIHRyYWNlLCBmdWxsTGF5b3V0KSB7XG4gICAgdmFyIGkgPSBjZGkuaTtcbiAgICBpZighKCd4JyBpbiBjZGkpKSBjZGkueCA9IHRyYWNlLl94W2ldO1xuICAgIGlmKCEoJ3knIGluIGNkaSkpIGNkaS55ID0gdHJhY2UuX3lbaV07XG4gICAgcmV0dXJuIHNjYXR0ZXJGb3JtYXRMYWJlbHMoY2RpLCB0cmFjZSwgZnVsbExheW91dCk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaG92ZXIgPSByZXF1aXJlKCcuL2hvdmVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3NjYXR0ZXJnbCcsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbicpLFxuICAgIGNhdGVnb3JpZXM6IFsnZ2wnLCAncmVnbCcsICdjYXJ0ZXNpYW4nLCAnc3ltYm9scycsICdlcnJvckJhcnNPSycsICdzaG93TGVnZW5kJywgJ3NjYXR0ZXItbGlrZSddLFxuXG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjcm9zc1RyYWNlRGVmYXVsdHM6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvY3Jvc3NfdHJhY2VfZGVmYXVsdHMnKSxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi4vc2NhdHRlci9tYXJrZXJfY29sb3JiYXInKSxcbiAgICBmb3JtYXRMYWJlbHM6IHJlcXVpcmUoJy4vZm9ybWF0X2xhYmVscycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLFxuICAgIGhvdmVyUG9pbnRzOiBob3Zlci5ob3ZlclBvaW50cyxcbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4vc2VsZWN0JyksXG5cbiAgICBtZXRhOiB7XG4gICAgICAgIGhyTmFtZTogJ3NjYXR0ZXJfZ2wnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBkYXRhIHZpc3VhbGl6ZWQgYXMgc2NhdHRlciBwb2ludCBvciBsaW5lcyBpcyBzZXQgaW4gYHhgIGFuZCBgeWAnLFxuICAgICAgICAgICAgJ3VzaW5nIHRoZSBXZWJHTCBwbG90dGluZyBlbmdpbmUuJyxcbiAgICAgICAgICAgICdCdWJibGUgY2hhcnRzIGFyZSBhY2hpZXZlZCBieSBzZXR0aW5nIGBtYXJrZXIuc2l6ZWAgYW5kL29yIGBtYXJrZXIuY29sb3JgJyxcbiAgICAgICAgICAgICd0byBhIG51bWVyaWNhbCBhcnJheXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9