(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_scatterpolargl_js"],{

/***/ "./node_modules/plotly.js/lib/scatterpolargl.js":
/*!******************************************************!*\
  !*** ./node_modules/plotly.js/lib/scatterpolargl.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/scatterpolargl */ "./node_modules/plotly.js/src/traces/scatterpolargl/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolargl/attributes.js":
/*!************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolargl/attributes.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var scatterPolarAttrs = __webpack_require__(/*! ../scatterpolar/attributes */ "./node_modules/plotly.js/src/traces/scatterpolar/attributes.js");
var scatterGlAttrs = __webpack_require__(/*! ../scattergl/attributes */ "./node_modules/plotly.js/src/traces/scattergl/attributes.js");
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;

module.exports = {
    mode: scatterPolarAttrs.mode,
    r: scatterPolarAttrs.r,
    theta: scatterPolarAttrs.theta,
    r0: scatterPolarAttrs.r0,
    dr: scatterPolarAttrs.dr,
    theta0: scatterPolarAttrs.theta0,
    dtheta: scatterPolarAttrs.dtheta,
    thetaunit: scatterPolarAttrs.thetaunit,

    text: scatterPolarAttrs.text,
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: ['r', 'theta', 'text']
    }),
    hovertext: scatterPolarAttrs.hovertext,
    hovertemplate: scatterPolarAttrs.hovertemplate,

    line: scatterGlAttrs.line,
    connectgaps: scatterGlAttrs.connectgaps,

    marker: scatterGlAttrs.marker,
    // no cliponaxis

    fill: scatterGlAttrs.fill,
    fillcolor: scatterGlAttrs.fillcolor,

    textposition: scatterGlAttrs.textposition,
    textfont: scatterGlAttrs.textfont,

    hoverinfo: scatterPolarAttrs.hoverinfo,
    // no hoveron

    selected: scatterPolarAttrs.selected,
    unselected: scatterPolarAttrs.unselected
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolargl/calc.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolargl/calc.js ***!
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



var calcColorscale = __webpack_require__(/*! ../scatter/colorscale_calc */ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js");
var calcMarkerSize = __webpack_require__(/*! ../scatter/calc */ "./node_modules/plotly.js/src/traces/scatter/calc.js").calcMarkerSize;
var convert = __webpack_require__(/*! ../scattergl/convert */ "./node_modules/plotly.js/src/traces/scattergl/convert.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var TOO_MANY_POINTS = __webpack_require__(/*! ../scattergl/constants */ "./node_modules/plotly.js/src/traces/scattergl/constants.js").TOO_MANY_POINTS;

module.exports = function calc(gd, trace) {
    var fullLayout = gd._fullLayout;
    var subplotId = trace.subplot;
    var radialAxis = fullLayout[subplotId].radialaxis;
    var angularAxis = fullLayout[subplotId].angularaxis;
    var rArray = trace._r = radialAxis.makeCalcdata(trace, 'r');
    var thetaArray = trace._theta = angularAxis.makeCalcdata(trace, 'theta');
    var len = trace._length;
    var stash = {};

    if(len < rArray.length) rArray = rArray.slice(0, len);
    if(len < thetaArray.length) thetaArray = thetaArray.slice(0, len);

    stash.r = rArray;
    stash.theta = thetaArray;

    calcColorscale(gd, trace);

    // only compute 'style' options in calc, as position options
    // depend on the radial range and must be set in plot
    var opts = stash.opts = convert.style(gd, trace);

    // For graphs with very large number of points and array marker.size,
    // use average marker size instead to speed things up.
    var ppad;
    if(len < TOO_MANY_POINTS) {
        ppad = calcMarkerSize(trace, len);
    } else if(opts.marker) {
        ppad = 2 * (opts.marker.sizeAvg || Math.max(opts.marker.size, 3));
    }
    trace._extremes.x = Axes.findExtremes(radialAxis, rArray, {ppad: ppad});

    return [{x: false, y: false, t: stash, trace: trace}];
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolargl/defaults.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolargl/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var handleRThetaDefaults = __webpack_require__(/*! ../scatterpolar/defaults */ "./node_modules/plotly.js/src/traces/scatterpolar/defaults.js").handleRThetaDefaults;
var handleMarkerDefaults = __webpack_require__(/*! ../scatter/marker_defaults */ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js");
var handleLineDefaults = __webpack_require__(/*! ../scatter/line_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js");
var handleTextDefaults = __webpack_require__(/*! ../scatter/text_defaults */ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js");
var handleFillColorDefaults = __webpack_require__(/*! ../scatter/fillcolor_defaults */ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js");
var PTS_LINESONLY = __webpack_require__(/*! ../scatter/constants */ "./node_modules/plotly.js/src/traces/scatter/constants.js").PTS_LINESONLY;

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatterpolargl/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleRThetaDefaults(traceIn, traceOut, layout, coerce);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('thetaunit');
    coerce('mode', len < PTS_LINESONLY ? 'lines+markers' : 'lines');
    coerce('text');
    coerce('hovertext');
    if(traceOut.hoveron !== 'fills') coerce('hovertemplate');

    if(subTypes.hasLines(traceOut)) {
        handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);
        coerce('connectgaps');
    }

    if(subTypes.hasMarkers(traceOut)) {
        handleMarkerDefaults(traceIn, traceOut, defaultColor, layout, coerce);
    }

    if(subTypes.hasText(traceOut)) {
        coerce('texttemplate');
        handleTextDefaults(traceIn, traceOut, layout, coerce);
    }

    coerce('fill');
    if(traceOut.fill !== 'none') {
        handleFillColorDefaults(traceIn, traceOut, defaultColor, coerce);
    }

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolargl/format_labels.js":
/*!***************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolargl/format_labels.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var scatterPolarFormatLabels = __webpack_require__(/*! ../scatterpolar/format_labels */ "./node_modules/plotly.js/src/traces/scatterpolar/format_labels.js");

module.exports = function formatLabels(cdi, trace, fullLayout) {
    var i = cdi.i;
    if(!('r' in cdi)) cdi.r = trace._r[i];
    if(!('theta' in cdi)) cdi.theta = trace._theta[i];
    return scatterPolarFormatLabels(cdi, trace, fullLayout);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolargl/hover.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolargl/hover.js ***!
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



var hover = __webpack_require__(/*! ../scattergl/hover */ "./node_modules/plotly.js/src/traces/scattergl/hover.js");
var makeHoverPointText = __webpack_require__(/*! ../scatterpolar/hover */ "./node_modules/plotly.js/src/traces/scatterpolar/hover.js").makeHoverPointText;

function hoverPoints(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var stash = cd[0].t;
    var rArray = stash.r;
    var thetaArray = stash.theta;

    var scatterPointData = hover.hoverPoints(pointData, xval, yval, hovermode);
    if(!scatterPointData || scatterPointData[0].index === false) return;

    var newPointData = scatterPointData[0];

    if(newPointData.index === undefined) {
        return scatterPointData;
    }

    var subplot = pointData.subplot;
    var cdi = newPointData.cd[newPointData.index];
    var trace = newPointData.trace;

    // augment pointData with r/theta param
    cdi.r = rArray[newPointData.index];
    cdi.theta = thetaArray[newPointData.index];

    if(!subplot.isPtInside(cdi)) return;

    newPointData.xLabelVal = undefined;
    newPointData.yLabelVal = undefined;
    makeHoverPointText(cdi, trace, subplot, newPointData);

    return scatterPointData;
}

module.exports = {
    hoverPoints: hoverPoints
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolargl/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolargl/index.js ***!
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



module.exports = {
    moduleType: 'trace',
    name: 'scatterpolargl',
    basePlotModule: __webpack_require__(/*! ../../plots/polar */ "./node_modules/plotly.js/src/plots/polar/index.js"),
    categories: ['gl', 'regl', 'polar', 'symbols', 'showLegend', 'scatter-like'],

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatterpolargl/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/scatterpolargl/defaults.js"),
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    formatLabels: __webpack_require__(/*! ./format_labels */ "./node_modules/plotly.js/src/traces/scatterpolargl/format_labels.js"),

    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/scatterpolargl/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/scatterpolargl/plot.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/scatterpolargl/hover.js").hoverPoints,
    selectPoints: __webpack_require__(/*! ../scattergl/select */ "./node_modules/plotly.js/src/traces/scattergl/select.js"),

    meta: {
        hrName: 'scatter_polar_gl',
        description: [
            'The scatterpolargl trace type encompasses line charts, scatter charts, and bubble charts',
            'in polar coordinates using the WebGL plotting engine.',
            'The data visualized as scatter point or lines is set in',
            '`r` (radial) and `theta` (angular) coordinates',
            'Bubble charts are achieved by setting `marker.size` and/or `marker.color`',
            'to numerical arrays.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolargl/plot.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolargl/plot.js ***!
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



var cluster = __webpack_require__(/*! point-cluster */ "./node_modules/point-cluster/index.js");
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var scatterglPlot = __webpack_require__(/*! ../scattergl/plot */ "./node_modules/plotly.js/src/traces/scattergl/plot.js");
var sceneUpdate = __webpack_require__(/*! ../scattergl/scene_update */ "./node_modules/plotly.js/src/traces/scattergl/scene_update.js");
var convert = __webpack_require__(/*! ../scattergl/convert */ "./node_modules/plotly.js/src/traces/scattergl/convert.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var TOO_MANY_POINTS = __webpack_require__(/*! ../scattergl/constants */ "./node_modules/plotly.js/src/traces/scattergl/constants.js").TOO_MANY_POINTS;

module.exports = function plot(gd, subplot, cdata) {
    if(!cdata.length) return;

    var radialAxis = subplot.radialAxis;
    var angularAxis = subplot.angularAxis;
    var scene = sceneUpdate(gd, subplot);

    cdata.forEach(function(cdscatter) {
        if(!cdscatter || !cdscatter[0] || !cdscatter[0].trace) return;
        var cd = cdscatter[0];
        var trace = cd.trace;
        var stash = cd.t;
        var len = trace._length;
        var rArray = stash.r;
        var thetaArray = stash.theta;
        var opts = stash.opts;
        var i;

        var subRArray = rArray.slice();
        var subThetaArray = thetaArray.slice();

        // filter out by range
        for(i = 0; i < rArray.length; i++) {
            if(!subplot.isPtInside({r: rArray[i], theta: thetaArray[i]})) {
                subRArray[i] = NaN;
                subThetaArray[i] = NaN;
            }
        }

        var positions = new Array(len * 2);
        var x = Array(len);
        var y = Array(len);

        for(i = 0; i < len; i++) {
            var r = subRArray[i];
            var xx, yy;

            if(isNumeric(r)) {
                var rg = radialAxis.c2g(r);
                var thetag = angularAxis.c2g(subThetaArray[i], trace.thetaunit);
                xx = rg * Math.cos(thetag);
                yy = rg * Math.sin(thetag);
            } else {
                xx = yy = NaN;
            }
            x[i] = positions[i * 2] = xx;
            y[i] = positions[i * 2 + 1] = yy;
        }

        stash.tree = cluster(positions);

        // FIXME: see scattergl.js#109
        if(opts.marker && len >= TOO_MANY_POINTS) {
            opts.marker.cluster = stash.tree;
        }

        if(opts.marker) {
            opts.markerSel.positions = opts.markerUnsel.positions = opts.marker.positions = positions;
        }

        if(opts.line && positions.length > 1) {
            Lib.extendFlat(
                opts.line,
                convert.linePositions(gd, trace, positions)
            );
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

        if(opts.fill && !scene.fill2d) scene.fill2d = true;
        if(opts.marker && !scene.scatter2d) scene.scatter2d = true;
        if(opts.line && !scene.line2d) scene.line2d = true;
        if(opts.text && !scene.glText) scene.glText = true;

        scene.lineOptions.push(opts.line);
        scene.fillOptions.push(opts.fill);
        scene.markerOptions.push(opts.marker);
        scene.markerSelectedOptions.push(opts.markerSel);
        scene.markerUnselectedOptions.push(opts.markerUnsel);
        scene.textOptions.push(opts.text);
        scene.textSelectedOptions.push(opts.textSel);
        scene.textUnselectedOptions.push(opts.textUnsel);
        scene.selectBatch.push([]);
        scene.unselectBatch.push([]);

        stash.x = x;
        stash.y = y;
        stash.rawx = x;
        stash.rawy = y;
        stash.r = rArray;
        stash.theta = thetaArray;
        stash.positions = positions;
        stash._scene = scene;
        stash.index = scene.count;
        scene.count++;
    });

    return scatterglPlot(gd, subplot, cdata);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc2NhdHRlcnBvbGFyZ2wuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVycG9sYXJnbC9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcnBvbGFyZ2wvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJwb2xhcmdsL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcnBvbGFyZ2wvZm9ybWF0X2xhYmVscy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJwb2xhcmdsL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcnBvbGFyZ2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVycG9sYXJnbC9wbG90LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLHVJQUF3RDs7Ozs7Ozs7Ozs7O0FDVnhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLHdCQUF3QixtQkFBTyxDQUFDLGtHQUE0QjtBQUM1RCxxQkFBcUIsbUJBQU8sQ0FBQyw0RkFBeUI7QUFDdEQsd0JB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QTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLDREQUFlO0FBQ3JDLGdCQUFnQixtQkFBTyxDQUFDLDhEQUFnQjs7QUFFeEMsb0JBQW9CLG1CQUFPLENBQUMsZ0ZBQW1CO0FBQy9DLGtCQUFrQixtQkFBTyxDQUFDLGdHQUEyQjtBQUNyRCxjQUFjLG1CQUFPLENBQUMsc0ZBQXNCOztBQUU1QyxVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCLHNCQUFzQiwrSEFBaUQ7O0FBRXZFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDLG9DQUFvQyxtQ0FBbUM7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHFCQUFxQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixxQkFBcUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIscUJBQXFCO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSIsImZpbGUiOiJjaGFydGU1ODJhMTFhN2IxNDAzM2NjMTE1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvc2NhdHRlcnBvbGFyZ2wnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNjYXR0ZXJQb2xhckF0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlcnBvbGFyL2F0dHJpYnV0ZXMnKTtcbnZhciBzY2F0dGVyR2xBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXJnbC9hdHRyaWJ1dGVzJyk7XG52YXIgdGV4dHRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykudGV4dHRlbXBsYXRlQXR0cnM7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vZGU6IHNjYXR0ZXJQb2xhckF0dHJzLm1vZGUsXG4gICAgcjogc2NhdHRlclBvbGFyQXR0cnMucixcbiAgICB0aGV0YTogc2NhdHRlclBvbGFyQXR0cnMudGhldGEsXG4gICAgcjA6IHNjYXR0ZXJQb2xhckF0dHJzLnIwLFxuICAgIGRyOiBzY2F0dGVyUG9sYXJBdHRycy5kcixcbiAgICB0aGV0YTA6IHNjYXR0ZXJQb2xhckF0dHJzLnRoZXRhMCxcbiAgICBkdGhldGE6IHNjYXR0ZXJQb2xhckF0dHJzLmR0aGV0YSxcbiAgICB0aGV0YXVuaXQ6IHNjYXR0ZXJQb2xhckF0dHJzLnRoZXRhdW5pdCxcblxuICAgIHRleHQ6IHNjYXR0ZXJQb2xhckF0dHJzLnRleHQsXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdwbG90J30sIHtcbiAgICAgICAga2V5czogWydyJywgJ3RoZXRhJywgJ3RleHQnXVxuICAgIH0pLFxuICAgIGhvdmVydGV4dDogc2NhdHRlclBvbGFyQXR0cnMuaG92ZXJ0ZXh0LFxuICAgIGhvdmVydGVtcGxhdGU6IHNjYXR0ZXJQb2xhckF0dHJzLmhvdmVydGVtcGxhdGUsXG5cbiAgICBsaW5lOiBzY2F0dGVyR2xBdHRycy5saW5lLFxuICAgIGNvbm5lY3RnYXBzOiBzY2F0dGVyR2xBdHRycy5jb25uZWN0Z2FwcyxcblxuICAgIG1hcmtlcjogc2NhdHRlckdsQXR0cnMubWFya2VyLFxuICAgIC8vIG5vIGNsaXBvbmF4aXNcblxuICAgIGZpbGw6IHNjYXR0ZXJHbEF0dHJzLmZpbGwsXG4gICAgZmlsbGNvbG9yOiBzY2F0dGVyR2xBdHRycy5maWxsY29sb3IsXG5cbiAgICB0ZXh0cG9zaXRpb246IHNjYXR0ZXJHbEF0dHJzLnRleHRwb3NpdGlvbixcbiAgICB0ZXh0Zm9udDogc2NhdHRlckdsQXR0cnMudGV4dGZvbnQsXG5cbiAgICBob3ZlcmluZm86IHNjYXR0ZXJQb2xhckF0dHJzLmhvdmVyaW5mbyxcbiAgICAvLyBubyBob3Zlcm9uXG5cbiAgICBzZWxlY3RlZDogc2NhdHRlclBvbGFyQXR0cnMuc2VsZWN0ZWQsXG4gICAgdW5zZWxlY3RlZDogc2NhdHRlclBvbGFyQXR0cnMudW5zZWxlY3RlZFxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMnKTtcbnZhciBjYWxjTWFya2VyU2l6ZSA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvY2FsYycpLmNhbGNNYXJrZXJTaXplO1xudmFyIGNvbnZlcnQgPSByZXF1aXJlKCcuLi9zY2F0dGVyZ2wvY29udmVydCcpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIFRPT19NQU5ZX1BPSU5UUyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXJnbC9jb25zdGFudHMnKS5UT09fTUFOWV9QT0lOVFM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBzdWJwbG90SWQgPSB0cmFjZS5zdWJwbG90O1xuICAgIHZhciByYWRpYWxBeGlzID0gZnVsbExheW91dFtzdWJwbG90SWRdLnJhZGlhbGF4aXM7XG4gICAgdmFyIGFuZ3VsYXJBeGlzID0gZnVsbExheW91dFtzdWJwbG90SWRdLmFuZ3VsYXJheGlzO1xuICAgIHZhciByQXJyYXkgPSB0cmFjZS5fciA9IHJhZGlhbEF4aXMubWFrZUNhbGNkYXRhKHRyYWNlLCAncicpO1xuICAgIHZhciB0aGV0YUFycmF5ID0gdHJhY2UuX3RoZXRhID0gYW5ndWxhckF4aXMubWFrZUNhbGNkYXRhKHRyYWNlLCAndGhldGEnKTtcbiAgICB2YXIgbGVuID0gdHJhY2UuX2xlbmd0aDtcbiAgICB2YXIgc3Rhc2ggPSB7fTtcblxuICAgIGlmKGxlbiA8IHJBcnJheS5sZW5ndGgpIHJBcnJheSA9IHJBcnJheS5zbGljZSgwLCBsZW4pO1xuICAgIGlmKGxlbiA8IHRoZXRhQXJyYXkubGVuZ3RoKSB0aGV0YUFycmF5ID0gdGhldGFBcnJheS5zbGljZSgwLCBsZW4pO1xuXG4gICAgc3Rhc2guciA9IHJBcnJheTtcbiAgICBzdGFzaC50aGV0YSA9IHRoZXRhQXJyYXk7XG5cbiAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UpO1xuXG4gICAgLy8gb25seSBjb21wdXRlICdzdHlsZScgb3B0aW9ucyBpbiBjYWxjLCBhcyBwb3NpdGlvbiBvcHRpb25zXG4gICAgLy8gZGVwZW5kIG9uIHRoZSByYWRpYWwgcmFuZ2UgYW5kIG11c3QgYmUgc2V0IGluIHBsb3RcbiAgICB2YXIgb3B0cyA9IHN0YXNoLm9wdHMgPSBjb252ZXJ0LnN0eWxlKGdkLCB0cmFjZSk7XG5cbiAgICAvLyBGb3IgZ3JhcGhzIHdpdGggdmVyeSBsYXJnZSBudW1iZXIgb2YgcG9pbnRzIGFuZCBhcnJheSBtYXJrZXIuc2l6ZSxcbiAgICAvLyB1c2UgYXZlcmFnZSBtYXJrZXIgc2l6ZSBpbnN0ZWFkIHRvIHNwZWVkIHRoaW5ncyB1cC5cbiAgICB2YXIgcHBhZDtcbiAgICBpZihsZW4gPCBUT09fTUFOWV9QT0lOVFMpIHtcbiAgICAgICAgcHBhZCA9IGNhbGNNYXJrZXJTaXplKHRyYWNlLCBsZW4pO1xuICAgIH0gZWxzZSBpZihvcHRzLm1hcmtlcikge1xuICAgICAgICBwcGFkID0gMiAqIChvcHRzLm1hcmtlci5zaXplQXZnIHx8IE1hdGgubWF4KG9wdHMubWFya2VyLnNpemUsIDMpKTtcbiAgICB9XG4gICAgdHJhY2UuX2V4dHJlbWVzLnggPSBBeGVzLmZpbmRFeHRyZW1lcyhyYWRpYWxBeGlzLCByQXJyYXksIHtwcGFkOiBwcGFkfSk7XG5cbiAgICByZXR1cm4gW3t4OiBmYWxzZSwgeTogZmFsc2UsIHQ6IHN0YXNoLCB0cmFjZTogdHJhY2V9XTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxudmFyIHN1YlR5cGVzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9zdWJ0eXBlcycpO1xudmFyIGhhbmRsZVJUaGV0YURlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlcnBvbGFyL2RlZmF1bHRzJykuaGFuZGxlUlRoZXRhRGVmYXVsdHM7XG52YXIgaGFuZGxlTWFya2VyRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL21hcmtlcl9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUxpbmVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbGluZV9kZWZhdWx0cycpO1xudmFyIGhhbmRsZVRleHREZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvdGV4dF9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUZpbGxDb2xvckRlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9maWxsY29sb3JfZGVmYXVsdHMnKTtcbnZhciBQVFNfTElORVNPTkxZID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb25zdGFudHMnKS5QVFNfTElORVNPTkxZO1xuXG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gaGFuZGxlUlRoZXRhRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcbiAgICBpZighbGVuKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgndGhldGF1bml0Jyk7XG4gICAgY29lcmNlKCdtb2RlJywgbGVuIDwgUFRTX0xJTkVTT05MWSA/ICdsaW5lcyttYXJrZXJzJyA6ICdsaW5lcycpO1xuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgaWYodHJhY2VPdXQuaG92ZXJvbiAhPT0gJ2ZpbGxzJykgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICBpZihzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZU91dCkpIHtcbiAgICAgICAgaGFuZGxlTGluZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlKTtcbiAgICAgICAgY29lcmNlKCdjb25uZWN0Z2FwcycpO1xuICAgIH1cblxuICAgIGlmKHN1YlR5cGVzLmhhc01hcmtlcnModHJhY2VPdXQpKSB7XG4gICAgICAgIGhhbmRsZU1hcmtlckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlKTtcbiAgICB9XG5cbiAgICBpZihzdWJUeXBlcy5oYXNUZXh0KHRyYWNlT3V0KSkge1xuICAgICAgICBjb2VyY2UoJ3RleHR0ZW1wbGF0ZScpO1xuICAgICAgICBoYW5kbGVUZXh0RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2ZpbGwnKTtcbiAgICBpZih0cmFjZU91dC5maWxsICE9PSAnbm9uZScpIHtcbiAgICAgICAgaGFuZGxlRmlsbENvbG9yRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgY29lcmNlKTtcbiAgICB9XG5cbiAgICBMaWIuY29lcmNlU2VsZWN0aW9uTWFya2VyT3BhY2l0eSh0cmFjZU91dCwgY29lcmNlKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzY2F0dGVyUG9sYXJGb3JtYXRMYWJlbHMgPSByZXF1aXJlKCcuLi9zY2F0dGVycG9sYXIvZm9ybWF0X2xhYmVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvcm1hdExhYmVscyhjZGksIHRyYWNlLCBmdWxsTGF5b3V0KSB7XG4gICAgdmFyIGkgPSBjZGkuaTtcbiAgICBpZighKCdyJyBpbiBjZGkpKSBjZGkuciA9IHRyYWNlLl9yW2ldO1xuICAgIGlmKCEoJ3RoZXRhJyBpbiBjZGkpKSBjZGkudGhldGEgPSB0cmFjZS5fdGhldGFbaV07XG4gICAgcmV0dXJuIHNjYXR0ZXJQb2xhckZvcm1hdExhYmVscyhjZGksIHRyYWNlLCBmdWxsTGF5b3V0KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBob3ZlciA9IHJlcXVpcmUoJy4uL3NjYXR0ZXJnbC9ob3ZlcicpO1xudmFyIG1ha2VIb3ZlclBvaW50VGV4dCA9IHJlcXVpcmUoJy4uL3NjYXR0ZXJwb2xhci9ob3ZlcicpLm1ha2VIb3ZlclBvaW50VGV4dDtcblxuZnVuY3Rpb24gaG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpIHtcbiAgICB2YXIgY2QgPSBwb2ludERhdGEuY2Q7XG4gICAgdmFyIHN0YXNoID0gY2RbMF0udDtcbiAgICB2YXIgckFycmF5ID0gc3Rhc2gucjtcbiAgICB2YXIgdGhldGFBcnJheSA9IHN0YXNoLnRoZXRhO1xuXG4gICAgdmFyIHNjYXR0ZXJQb2ludERhdGEgPSBob3Zlci5ob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSk7XG4gICAgaWYoIXNjYXR0ZXJQb2ludERhdGEgfHwgc2NhdHRlclBvaW50RGF0YVswXS5pbmRleCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIHZhciBuZXdQb2ludERhdGEgPSBzY2F0dGVyUG9pbnREYXRhWzBdO1xuXG4gICAgaWYobmV3UG9pbnREYXRhLmluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHNjYXR0ZXJQb2ludERhdGE7XG4gICAgfVxuXG4gICAgdmFyIHN1YnBsb3QgPSBwb2ludERhdGEuc3VicGxvdDtcbiAgICB2YXIgY2RpID0gbmV3UG9pbnREYXRhLmNkW25ld1BvaW50RGF0YS5pbmRleF07XG4gICAgdmFyIHRyYWNlID0gbmV3UG9pbnREYXRhLnRyYWNlO1xuXG4gICAgLy8gYXVnbWVudCBwb2ludERhdGEgd2l0aCByL3RoZXRhIHBhcmFtXG4gICAgY2RpLnIgPSByQXJyYXlbbmV3UG9pbnREYXRhLmluZGV4XTtcbiAgICBjZGkudGhldGEgPSB0aGV0YUFycmF5W25ld1BvaW50RGF0YS5pbmRleF07XG5cbiAgICBpZighc3VicGxvdC5pc1B0SW5zaWRlKGNkaSkpIHJldHVybjtcblxuICAgIG5ld1BvaW50RGF0YS54TGFiZWxWYWwgPSB1bmRlZmluZWQ7XG4gICAgbmV3UG9pbnREYXRhLnlMYWJlbFZhbCA9IHVuZGVmaW5lZDtcbiAgICBtYWtlSG92ZXJQb2ludFRleHQoY2RpLCB0cmFjZSwgc3VicGxvdCwgbmV3UG9pbnREYXRhKTtcblxuICAgIHJldHVybiBzY2F0dGVyUG9pbnREYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBob3ZlclBvaW50czogaG92ZXJQb2ludHNcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3NjYXR0ZXJwb2xhcmdsJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvcG9sYXInKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2dsJywgJ3JlZ2wnLCAncG9sYXInLCAnc3ltYm9scycsICdzaG93TGVnZW5kJywgJ3NjYXR0ZXItbGlrZSddLFxuXG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi4vc2NhdHRlci9tYXJrZXJfY29sb3JiYXInKSxcbiAgICBmb3JtYXRMYWJlbHM6IHJlcXVpcmUoJy4vZm9ybWF0X2xhYmVscycpLFxuXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJyksXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JyksXG4gICAgaG92ZXJQb2ludHM6IHJlcXVpcmUoJy4vaG92ZXInKS5ob3ZlclBvaW50cyxcbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4uL3NjYXR0ZXJnbC9zZWxlY3QnKSxcblxuICAgIG1ldGE6IHtcbiAgICAgICAgaHJOYW1lOiAnc2NhdHRlcl9wb2xhcl9nbCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIHNjYXR0ZXJwb2xhcmdsIHRyYWNlIHR5cGUgZW5jb21wYXNzZXMgbGluZSBjaGFydHMsIHNjYXR0ZXIgY2hhcnRzLCBhbmQgYnViYmxlIGNoYXJ0cycsXG4gICAgICAgICAgICAnaW4gcG9sYXIgY29vcmRpbmF0ZXMgdXNpbmcgdGhlIFdlYkdMIHBsb3R0aW5nIGVuZ2luZS4nLFxuICAgICAgICAgICAgJ1RoZSBkYXRhIHZpc3VhbGl6ZWQgYXMgc2NhdHRlciBwb2ludCBvciBsaW5lcyBpcyBzZXQgaW4nLFxuICAgICAgICAgICAgJ2ByYCAocmFkaWFsKSBhbmQgYHRoZXRhYCAoYW5ndWxhcikgY29vcmRpbmF0ZXMnLFxuICAgICAgICAgICAgJ0J1YmJsZSBjaGFydHMgYXJlIGFjaGlldmVkIGJ5IHNldHRpbmcgYG1hcmtlci5zaXplYCBhbmQvb3IgYG1hcmtlci5jb2xvcmAnLFxuICAgICAgICAgICAgJ3RvIG51bWVyaWNhbCBhcnJheXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjbHVzdGVyID0gcmVxdWlyZSgncG9pbnQtY2x1c3RlcicpO1xudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG5cbnZhciBzY2F0dGVyZ2xQbG90ID0gcmVxdWlyZSgnLi4vc2NhdHRlcmdsL3Bsb3QnKTtcbnZhciBzY2VuZVVwZGF0ZSA9IHJlcXVpcmUoJy4uL3NjYXR0ZXJnbC9zY2VuZV91cGRhdGUnKTtcbnZhciBjb252ZXJ0ID0gcmVxdWlyZSgnLi4vc2NhdHRlcmdsL2NvbnZlcnQnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgVE9PX01BTllfUE9JTlRTID0gcmVxdWlyZSgnLi4vc2NhdHRlcmdsL2NvbnN0YW50cycpLlRPT19NQU5ZX1BPSU5UUztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwbG90KGdkLCBzdWJwbG90LCBjZGF0YSkge1xuICAgIGlmKCFjZGF0YS5sZW5ndGgpIHJldHVybjtcblxuICAgIHZhciByYWRpYWxBeGlzID0gc3VicGxvdC5yYWRpYWxBeGlzO1xuICAgIHZhciBhbmd1bGFyQXhpcyA9IHN1YnBsb3QuYW5ndWxhckF4aXM7XG4gICAgdmFyIHNjZW5lID0gc2NlbmVVcGRhdGUoZ2QsIHN1YnBsb3QpO1xuXG4gICAgY2RhdGEuZm9yRWFjaChmdW5jdGlvbihjZHNjYXR0ZXIpIHtcbiAgICAgICAgaWYoIWNkc2NhdHRlciB8fCAhY2RzY2F0dGVyWzBdIHx8ICFjZHNjYXR0ZXJbMF0udHJhY2UpIHJldHVybjtcbiAgICAgICAgdmFyIGNkID0gY2RzY2F0dGVyWzBdO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZC50cmFjZTtcbiAgICAgICAgdmFyIHN0YXNoID0gY2QudDtcbiAgICAgICAgdmFyIGxlbiA9IHRyYWNlLl9sZW5ndGg7XG4gICAgICAgIHZhciByQXJyYXkgPSBzdGFzaC5yO1xuICAgICAgICB2YXIgdGhldGFBcnJheSA9IHN0YXNoLnRoZXRhO1xuICAgICAgICB2YXIgb3B0cyA9IHN0YXNoLm9wdHM7XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIHZhciBzdWJSQXJyYXkgPSByQXJyYXkuc2xpY2UoKTtcbiAgICAgICAgdmFyIHN1YlRoZXRhQXJyYXkgPSB0aGV0YUFycmF5LnNsaWNlKCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBieSByYW5nZVxuICAgICAgICBmb3IoaSA9IDA7IGkgPCByQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKCFzdWJwbG90LmlzUHRJbnNpZGUoe3I6IHJBcnJheVtpXSwgdGhldGE6IHRoZXRhQXJyYXlbaV19KSkge1xuICAgICAgICAgICAgICAgIHN1YlJBcnJheVtpXSA9IE5hTjtcbiAgICAgICAgICAgICAgICBzdWJUaGV0YUFycmF5W2ldID0gTmFOO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvc2l0aW9ucyA9IG5ldyBBcnJheShsZW4gKiAyKTtcbiAgICAgICAgdmFyIHggPSBBcnJheShsZW4pO1xuICAgICAgICB2YXIgeSA9IEFycmF5KGxlbik7XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByID0gc3ViUkFycmF5W2ldO1xuICAgICAgICAgICAgdmFyIHh4LCB5eTtcblxuICAgICAgICAgICAgaWYoaXNOdW1lcmljKHIpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJnID0gcmFkaWFsQXhpcy5jMmcocik7XG4gICAgICAgICAgICAgICAgdmFyIHRoZXRhZyA9IGFuZ3VsYXJBeGlzLmMyZyhzdWJUaGV0YUFycmF5W2ldLCB0cmFjZS50aGV0YXVuaXQpO1xuICAgICAgICAgICAgICAgIHh4ID0gcmcgKiBNYXRoLmNvcyh0aGV0YWcpO1xuICAgICAgICAgICAgICAgIHl5ID0gcmcgKiBNYXRoLnNpbih0aGV0YWcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4eCA9IHl5ID0gTmFOO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeFtpXSA9IHBvc2l0aW9uc1tpICogMl0gPSB4eDtcbiAgICAgICAgICAgIHlbaV0gPSBwb3NpdGlvbnNbaSAqIDIgKyAxXSA9IHl5O1xuICAgICAgICB9XG5cbiAgICAgICAgc3Rhc2gudHJlZSA9IGNsdXN0ZXIocG9zaXRpb25zKTtcblxuICAgICAgICAvLyBGSVhNRTogc2VlIHNjYXR0ZXJnbC5qcyMxMDlcbiAgICAgICAgaWYob3B0cy5tYXJrZXIgJiYgbGVuID49IFRPT19NQU5ZX1BPSU5UUykge1xuICAgICAgICAgICAgb3B0cy5tYXJrZXIuY2x1c3RlciA9IHN0YXNoLnRyZWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRzLm1hcmtlcikge1xuICAgICAgICAgICAgb3B0cy5tYXJrZXJTZWwucG9zaXRpb25zID0gb3B0cy5tYXJrZXJVbnNlbC5wb3NpdGlvbnMgPSBvcHRzLm1hcmtlci5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRzLmxpbmUgJiYgcG9zaXRpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KFxuICAgICAgICAgICAgICAgIG9wdHMubGluZSxcbiAgICAgICAgICAgICAgICBjb252ZXJ0LmxpbmVQb3NpdGlvbnMoZ2QsIHRyYWNlLCBwb3NpdGlvbnMpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy50ZXh0KSB7XG4gICAgICAgICAgICBMaWIuZXh0ZW5kRmxhdChcbiAgICAgICAgICAgICAgICBvcHRzLnRleHQsXG4gICAgICAgICAgICAgICAge3Bvc2l0aW9uczogcG9zaXRpb25zfSxcbiAgICAgICAgICAgICAgICBjb252ZXJ0LnRleHRQb3NpdGlvbihnZCwgdHJhY2UsIG9wdHMudGV4dCwgb3B0cy5tYXJrZXIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgTGliLmV4dGVuZEZsYXQoXG4gICAgICAgICAgICAgICAgb3B0cy50ZXh0U2VsLFxuICAgICAgICAgICAgICAgIHtwb3NpdGlvbnM6IHBvc2l0aW9uc30sXG4gICAgICAgICAgICAgICAgY29udmVydC50ZXh0UG9zaXRpb24oZ2QsIHRyYWNlLCBvcHRzLnRleHQsIG9wdHMubWFya2VyU2VsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KFxuICAgICAgICAgICAgICAgIG9wdHMudGV4dFVuc2VsLFxuICAgICAgICAgICAgICAgIHtwb3NpdGlvbnM6IHBvc2l0aW9uc30sXG4gICAgICAgICAgICAgICAgY29udmVydC50ZXh0UG9zaXRpb24oZ2QsIHRyYWNlLCBvcHRzLnRleHQsIG9wdHMubWFya2VyVW5zZWwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy5maWxsICYmICFzY2VuZS5maWxsMmQpIHNjZW5lLmZpbGwyZCA9IHRydWU7XG4gICAgICAgIGlmKG9wdHMubWFya2VyICYmICFzY2VuZS5zY2F0dGVyMmQpIHNjZW5lLnNjYXR0ZXIyZCA9IHRydWU7XG4gICAgICAgIGlmKG9wdHMubGluZSAmJiAhc2NlbmUubGluZTJkKSBzY2VuZS5saW5lMmQgPSB0cnVlO1xuICAgICAgICBpZihvcHRzLnRleHQgJiYgIXNjZW5lLmdsVGV4dCkgc2NlbmUuZ2xUZXh0ID0gdHJ1ZTtcblxuICAgICAgICBzY2VuZS5saW5lT3B0aW9ucy5wdXNoKG9wdHMubGluZSk7XG4gICAgICAgIHNjZW5lLmZpbGxPcHRpb25zLnB1c2gob3B0cy5maWxsKTtcbiAgICAgICAgc2NlbmUubWFya2VyT3B0aW9ucy5wdXNoKG9wdHMubWFya2VyKTtcbiAgICAgICAgc2NlbmUubWFya2VyU2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0cy5tYXJrZXJTZWwpO1xuICAgICAgICBzY2VuZS5tYXJrZXJVbnNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdHMubWFya2VyVW5zZWwpO1xuICAgICAgICBzY2VuZS50ZXh0T3B0aW9ucy5wdXNoKG9wdHMudGV4dCk7XG4gICAgICAgIHNjZW5lLnRleHRTZWxlY3RlZE9wdGlvbnMucHVzaChvcHRzLnRleHRTZWwpO1xuICAgICAgICBzY2VuZS50ZXh0VW5zZWxlY3RlZE9wdGlvbnMucHVzaChvcHRzLnRleHRVbnNlbCk7XG4gICAgICAgIHNjZW5lLnNlbGVjdEJhdGNoLnB1c2goW10pO1xuICAgICAgICBzY2VuZS51bnNlbGVjdEJhdGNoLnB1c2goW10pO1xuXG4gICAgICAgIHN0YXNoLnggPSB4O1xuICAgICAgICBzdGFzaC55ID0geTtcbiAgICAgICAgc3Rhc2gucmF3eCA9IHg7XG4gICAgICAgIHN0YXNoLnJhd3kgPSB5O1xuICAgICAgICBzdGFzaC5yID0gckFycmF5O1xuICAgICAgICBzdGFzaC50aGV0YSA9IHRoZXRhQXJyYXk7XG4gICAgICAgIHN0YXNoLnBvc2l0aW9ucyA9IHBvc2l0aW9ucztcbiAgICAgICAgc3Rhc2guX3NjZW5lID0gc2NlbmU7XG4gICAgICAgIHN0YXNoLmluZGV4ID0gc2NlbmUuY291bnQ7XG4gICAgICAgIHNjZW5lLmNvdW50Kys7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2NhdHRlcmdsUGxvdChnZCwgc3VicGxvdCwgY2RhdGEpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=