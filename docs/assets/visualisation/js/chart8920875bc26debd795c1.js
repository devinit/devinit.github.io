(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_histogram2dcontour_js"],{

/***/ "./node_modules/plotly.js/lib/histogram2dcontour.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/lib/histogram2dcontour.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/histogram2dcontour */ "./node_modules/plotly.js/src/traces/histogram2dcontour/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/calc.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/calc.js ***!
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



var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");

var heatmapCalc = __webpack_require__(/*! ../heatmap/calc */ "./node_modules/plotly.js/src/traces/heatmap/calc.js");
var setContours = __webpack_require__(/*! ./set_contours */ "./node_modules/plotly.js/src/traces/contour/set_contours.js");
var endPlus = __webpack_require__(/*! ./end_plus */ "./node_modules/plotly.js/src/traces/contour/end_plus.js");

// most is the same as heatmap calc, then adjust it
// though a few things inside heatmap calc still look for
// contour maps, because the makeBoundArray calls are too entangled
module.exports = function calc(gd, trace) {
    var cd = heatmapCalc(gd, trace);

    var zOut = cd[0].z;
    setContours(trace, zOut);

    var contours = trace.contours;
    var cOpts = Colorscale.extractOpts(trace);
    var cVals;

    if(contours.coloring === 'heatmap' && cOpts.auto && trace.autocontour === false) {
        var start = contours.start;
        var end = endPlus(contours);
        var cs = contours.size || 1;
        var nc = Math.floor((end - start) / cs) + 1;

        if(!isFinite(cs)) {
            cs = 1;
            nc = 1;
        }

        var min0 = start - cs / 2;
        var max0 = min0 + nc * cs;
        cVals = [min0, max0];
    } else {
        cVals = zOut;
    }

    Colorscale.calc(gd, trace, {vals: cVals, cLetter: 'z'});

    return cd;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/hover.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/hover.js ***!
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




var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var heatmapHoverPoints = __webpack_require__(/*! ../heatmap/hover */ "./node_modules/plotly.js/src/traces/heatmap/hover.js");

module.exports = function hoverPoints(pointData, xval, yval, hovermode, hoverLayer) {
    var hoverData = heatmapHoverPoints(pointData, xval, yval, hovermode, hoverLayer, true);

    if(hoverData) {
        hoverData.forEach(function(hoverPt) {
            var trace = hoverPt.trace;
            if(trace.contours.type === 'constraint') {
                if(trace.fillcolor && Color.opacity(trace.fillcolor)) {
                    hoverPt.color = Color.addOpacity(trace.fillcolor, 1);
                } else if(trace.contours.showlines && Color.opacity(trace.line.color)) {
                    hoverPt.color = Color.addOpacity(trace.line.color, 1);
                }
            }
        });
    }

    return hoverData;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/hover.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/hover.js ***!
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



var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var extractOpts = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").extractOpts;

module.exports = function hoverPoints(pointData, xval, yval, hovermode, hoverLayer, contour) {
    var cd0 = pointData.cd[0];
    var trace = cd0.trace;
    var xa = pointData.xa;
    var ya = pointData.ya;
    var x = cd0.x;
    var y = cd0.y;
    var z = cd0.z;
    var xc = cd0.xCenter;
    var yc = cd0.yCenter;
    var zmask = cd0.zmask;
    var zhoverformat = trace.zhoverformat;
    var x2 = x;
    var y2 = y;

    var xl, yl, nx, ny;

    if(pointData.index !== false) {
        try {
            nx = Math.round(pointData.index[1]);
            ny = Math.round(pointData.index[0]);
        } catch(e) {
            Lib.error('Error hovering on heatmap, ' +
                'pointNumber must be [row,col], found:', pointData.index);
            return;
        }
        if(nx < 0 || nx >= z[0].length || ny < 0 || ny > z.length) {
            return;
        }
    } else if(Fx.inbox(xval - x[0], xval - x[x.length - 1], 0) > 0 ||
            Fx.inbox(yval - y[0], yval - y[y.length - 1], 0) > 0) {
        return;
    } else {
        if(contour) {
            var i2;
            x2 = [2 * x[0] - x[1]];

            for(i2 = 1; i2 < x.length; i2++) {
                x2.push((x[i2] + x[i2 - 1]) / 2);
            }
            x2.push([2 * x[x.length - 1] - x[x.length - 2]]);

            y2 = [2 * y[0] - y[1]];
            for(i2 = 1; i2 < y.length; i2++) {
                y2.push((y[i2] + y[i2 - 1]) / 2);
            }
            y2.push([2 * y[y.length - 1] - y[y.length - 2]]);
        }
        nx = Math.max(0, Math.min(x2.length - 2, Lib.findBin(xval, x2)));
        ny = Math.max(0, Math.min(y2.length - 2, Lib.findBin(yval, y2)));
    }

    var x0 = xa.c2p(x[nx]);
    var x1 = xa.c2p(x[nx + 1]);
    var y0 = ya.c2p(y[ny]);
    var y1 = ya.c2p(y[ny + 1]);

    if(contour) {
        x1 = x0;
        xl = x[nx];
        y1 = y0;
        yl = y[ny];
    } else {
        xl = xc ? xc[nx] : ((x[nx] + x[nx + 1]) / 2);
        yl = yc ? yc[ny] : ((y[ny] + y[ny + 1]) / 2);

        if(xa && xa.type === 'category') xl = x[nx];
        if(ya && ya.type === 'category') yl = y[ny];

        if(trace.zsmooth) {
            x0 = x1 = xa.c2p(xl);
            y0 = y1 = ya.c2p(yl);
        }
    }

    var zVal = z[ny][nx];
    if(zmask && !zmask[ny][nx]) zVal = undefined;

    if(zVal === undefined && !trace.hoverongaps) return;

    var text;
    if(Array.isArray(cd0.hovertext) && Array.isArray(cd0.hovertext[ny])) {
        text = cd0.hovertext[ny][nx];
    } else if(Array.isArray(cd0.text) && Array.isArray(cd0.text[ny])) {
        text = cd0.text[ny][nx];
    }

    // dummy axis for formatting the z value
    var cOpts = extractOpts(trace);
    var dummyAx = {
        type: 'linear',
        range: [cOpts.min, cOpts.max],
        hoverformat: zhoverformat,
        _separators: xa._separators,
        _numFormat: xa._numFormat
    };
    var zLabel = Axes.tickText(dummyAx, zVal, 'hover').text;

    return [Lib.extendFlat(pointData, {
        index: trace._after2before ? trace._after2before[ny][nx] : [ny, nx],
        // never let a 2D override 1D type as closest point
        distance: pointData.maxHoverDistance,
        spikeDistance: pointData.maxSpikeDistance,
        x0: x0,
        x1: x1,
        y0: y0,
        y1: y1,
        xLabelVal: xl,
        yLabelVal: yl,
        zLabelVal: zVal,
        zLabel: zLabel,
        text: text
    })];
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2d/attributes.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2d/attributes.js ***!
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



var histogramAttrs = __webpack_require__(/*! ../histogram/attributes */ "./node_modules/plotly.js/src/traces/histogram/attributes.js");
var makeBinAttrs = __webpack_require__(/*! ../histogram/bin_attributes */ "./node_modules/plotly.js/src/traces/histogram/bin_attributes.js");
var heatmapAttrs = __webpack_require__(/*! ../heatmap/attributes */ "./node_modules/plotly.js/src/traces/heatmap/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = extendFlat(
    {
        x: histogramAttrs.x,
        y: histogramAttrs.y,

        z: {
            valType: 'data_array',
            editType: 'calc',
            description: 'Sets the aggregation data.'
        },
        marker: {
            color: {
                valType: 'data_array',
                editType: 'calc',
                description: 'Sets the aggregation data.'
            },
            editType: 'calc'
        },

        histnorm: histogramAttrs.histnorm,
        histfunc: histogramAttrs.histfunc,
        nbinsx: histogramAttrs.nbinsx,
        xbins: makeBinAttrs('x'),
        nbinsy: histogramAttrs.nbinsy,
        ybins: makeBinAttrs('y'),
        autobinx: histogramAttrs.autobinx,
        autobiny: histogramAttrs.autobiny,

        bingroup: extendFlat({}, histogramAttrs.bingroup, {
            description: [
                'Set the `xbingroup` and `ybingroup` default prefix',
                'For example, setting a `bingroup` of *1* on two histogram2d traces',
                'will make them their x-bins and y-bins match separately.'
            ].join(' ')
        }),
        xbingroup: extendFlat({}, histogramAttrs.bingroup, {
            description: [
                'Set a group of histogram traces which will have compatible x-bin settings.',
                'Using `xbingroup`, histogram2d and histogram2dcontour traces ',
                '(on axes of the same axis type) can have compatible x-bin settings.',
                'Note that the same `xbingroup` value can be used to set (1D) histogram `bingroup`'
            ].join(' ')
        }),
        ybingroup: extendFlat({}, histogramAttrs.bingroup, {
            description: [
                'Set a group of histogram traces which will have compatible y-bin settings.',
                'Using `ybingroup`, histogram2d and histogram2dcontour traces ',
                '(on axes of the same axis type) can have compatible y-bin settings.',
                'Note that the same `ybingroup` value can be used to set (1D) histogram `bingroup`'
            ].join(' ')
        }),

        xgap: heatmapAttrs.xgap,
        ygap: heatmapAttrs.ygap,
        zsmooth: heatmapAttrs.zsmooth,
        zhoverformat: heatmapAttrs.zhoverformat,
        hovertemplate: hovertemplateAttrs({}, {keys: 'z'}),
        showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
    },
    colorScaleAttrs('', {cLetter: 'z', autoColorDflt: false})
);


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2d/sample_defaults.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2d/sample_defaults.js ***!
  \**************************************************************************/
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
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

module.exports = function handleSampleDefaults(traceIn, traceOut, coerce, layout) {
    var x = coerce('x');
    var y = coerce('y');
    var xlen = Lib.minRowLength(x);
    var ylen = Lib.minRowLength(y);

    // we could try to accept x0 and dx, etc...
    // but that's a pretty weird use case.
    // for now require both x and y explicitly specified.
    if(!xlen || !ylen) {
        traceOut.visible = false;
        return;
    }

    traceOut._length = Math.min(xlen, ylen);

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y'], layout);

    // if marker.color is an array, we can use it in aggregation instead of z
    var hasAggregationData = coerce('z') || coerce('marker.color');

    if(hasAggregationData) coerce('histfunc');
    coerce('histnorm');

    // Note: bin defaults are now handled in Histogram2D.crossTraceDefaults
    // autobin(x|y) are only included here to appease Plotly.validate
    coerce('autobinx');
    coerce('autobiny');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2dcontour/attributes.js":
/*!****************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2dcontour/attributes.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var histogram2dAttrs = __webpack_require__(/*! ../histogram2d/attributes */ "./node_modules/plotly.js/src/traces/histogram2d/attributes.js");
var contourAttrs = __webpack_require__(/*! ../contour/attributes */ "./node_modules/plotly.js/src/traces/contour/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = extendFlat({
    x: histogram2dAttrs.x,
    y: histogram2dAttrs.y,
    z: histogram2dAttrs.z,
    marker: histogram2dAttrs.marker,

    histnorm: histogram2dAttrs.histnorm,
    histfunc: histogram2dAttrs.histfunc,
    nbinsx: histogram2dAttrs.nbinsx,
    xbins: histogram2dAttrs.xbins,
    nbinsy: histogram2dAttrs.nbinsy,
    ybins: histogram2dAttrs.ybins,
    autobinx: histogram2dAttrs.autobinx,
    autobiny: histogram2dAttrs.autobiny,

    bingroup: histogram2dAttrs.bingroup,
    xbingroup: histogram2dAttrs.xbingroup,
    ybingroup: histogram2dAttrs.ybingroup,

    autocontour: contourAttrs.autocontour,
    ncontours: contourAttrs.ncontours,
    contours: contourAttrs.contours,
    line: {
        color: contourAttrs.line.color,
        width: extendFlat({}, contourAttrs.line.width, {
            dflt: 0.5,
            description: 'Sets the contour line width in (in px)'
        }),
        dash: contourAttrs.line.dash,
        smoothing: contourAttrs.line.smoothing,
        editType: 'plot'
    },
    zhoverformat: histogram2dAttrs.zhoverformat,
    hovertemplate: histogram2dAttrs.hovertemplate
},
    colorScaleAttrs('', {
        cLetter: 'z',
        editTypeOverride: 'calc'
    })
);


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2dcontour/defaults.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2dcontour/defaults.js ***!
  \**************************************************************************/
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

var handleSampleDefaults = __webpack_require__(/*! ../histogram2d/sample_defaults */ "./node_modules/plotly.js/src/traces/histogram2d/sample_defaults.js");
var handleContoursDefaults = __webpack_require__(/*! ../contour/contours_defaults */ "./node_modules/plotly.js/src/traces/contour/contours_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ../contour/style_defaults */ "./node_modules/plotly.js/src/traces/contour/style_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/histogram2dcontour/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    function coerce2(attr) {
        return Lib.coerce2(traceIn, traceOut, attributes, attr);
    }

    handleSampleDefaults(traceIn, traceOut, coerce, layout);
    if(traceOut.visible === false) return;

    handleContoursDefaults(traceIn, traceOut, coerce, coerce2);
    handleStyleDefaults(traceIn, traceOut, coerce, layout);
    coerce('hovertemplate');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2dcontour/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2dcontour/index.js ***!
  \***********************************************************************/
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/histogram2dcontour/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/histogram2dcontour/defaults.js"),
    crossTraceDefaults: __webpack_require__(/*! ../histogram/cross_trace_defaults */ "./node_modules/plotly.js/src/traces/histogram/cross_trace_defaults.js"),
    calc: __webpack_require__(/*! ../contour/calc */ "./node_modules/plotly.js/src/traces/contour/calc.js"),
    plot: __webpack_require__(/*! ../contour/plot */ "./node_modules/plotly.js/src/traces/contour/plot.js").plot,
    layerName: 'contourlayer',
    style: __webpack_require__(/*! ../contour/style */ "./node_modules/plotly.js/src/traces/contour/style.js"),
    colorbar: __webpack_require__(/*! ../contour/colorbar */ "./node_modules/plotly.js/src/traces/contour/colorbar.js"),
    hoverPoints: __webpack_require__(/*! ../contour/hover */ "./node_modules/plotly.js/src/traces/contour/hover.js"),

    moduleType: 'trace',
    name: 'histogram2dcontour',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', '2dMap', 'contour', 'histogram', 'showLegend'],
    meta: {
        hrName: 'histogram_2d_contour',
        description: [
            'The sample data from which statistics are computed is set in `x`',
            'and `y` (where `x` and `y` represent marginal distributions,',
            'binning is set in `xbins` and `ybins` in this case)',
            'or `z` (where `z` represent the 2D distribution and binning set,',
            'binning is set by `x` and `y` in this case).',
            'The resulting distribution is visualized as a contour plot.'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaGlzdG9ncmFtMmRjb250b3VyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY29udG91ci9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY29udG91ci9ob3Zlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvaG92ZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oaXN0b2dyYW0yZC9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtMmQvc2FtcGxlX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtMmRjb250b3VyL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oaXN0b2dyYW0yZGNvbnRvdXIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oaXN0b2dyYW0yZGNvbnRvdXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsK0lBQTREOzs7Ozs7Ozs7Ozs7QUNWNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QzdELGlCQUFpQixtQkFBTyxDQUFDLDBGQUFjOzs7QUFHdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBLGdCQUFnQixtQkFBTyxDQUFDLDBGQUFjO0FBQ3RDLG9CQUFvQixtQkFBTyxDQUFDLHNGQUFZO0FBQ3hDLHdCQUF3QixtQkFBTyxDQUFDLGdIQUFtQztBQUNuRSxVQUFVLG1CQUFPLENBQUMsNEVBQWlCO0FBQ25DLFVBQVUsc0dBQStCO0FBQ3pDO0FBQ0EsV0FBVyxtQkFBTyxDQUFDLDhFQUFrQjtBQUNyQyxjQUFjLG1CQUFPLENBQUMsb0ZBQXFCO0FBQzNDLGlCQUFpQixtQkFBTyxDQUFDLDhFQUFrQjs7QUFFM0M7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLG9GQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDg5MjA4NzViYzI2ZGViZDc5NWMxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvaGlzdG9ncmFtMmRjb250b3VyJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJyk7XG5cbnZhciBoZWF0bWFwQ2FsYyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvY2FsYycpO1xudmFyIHNldENvbnRvdXJzID0gcmVxdWlyZSgnLi9zZXRfY29udG91cnMnKTtcbnZhciBlbmRQbHVzID0gcmVxdWlyZSgnLi9lbmRfcGx1cycpO1xuXG4vLyBtb3N0IGlzIHRoZSBzYW1lIGFzIGhlYXRtYXAgY2FsYywgdGhlbiBhZGp1c3QgaXRcbi8vIHRob3VnaCBhIGZldyB0aGluZ3MgaW5zaWRlIGhlYXRtYXAgY2FsYyBzdGlsbCBsb29rIGZvclxuLy8gY29udG91ciBtYXBzLCBiZWNhdXNlIHRoZSBtYWtlQm91bmRBcnJheSBjYWxscyBhcmUgdG9vIGVudGFuZ2xlZFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBjZCA9IGhlYXRtYXBDYWxjKGdkLCB0cmFjZSk7XG5cbiAgICB2YXIgek91dCA9IGNkWzBdLno7XG4gICAgc2V0Q29udG91cnModHJhY2UsIHpPdXQpO1xuXG4gICAgdmFyIGNvbnRvdXJzID0gdHJhY2UuY29udG91cnM7XG4gICAgdmFyIGNPcHRzID0gQ29sb3JzY2FsZS5leHRyYWN0T3B0cyh0cmFjZSk7XG4gICAgdmFyIGNWYWxzO1xuXG4gICAgaWYoY29udG91cnMuY29sb3JpbmcgPT09ICdoZWF0bWFwJyAmJiBjT3B0cy5hdXRvICYmIHRyYWNlLmF1dG9jb250b3VyID09PSBmYWxzZSkge1xuICAgICAgICB2YXIgc3RhcnQgPSBjb250b3Vycy5zdGFydDtcbiAgICAgICAgdmFyIGVuZCA9IGVuZFBsdXMoY29udG91cnMpO1xuICAgICAgICB2YXIgY3MgPSBjb250b3Vycy5zaXplIHx8IDE7XG4gICAgICAgIHZhciBuYyA9IE1hdGguZmxvb3IoKGVuZCAtIHN0YXJ0KSAvIGNzKSArIDE7XG5cbiAgICAgICAgaWYoIWlzRmluaXRlKGNzKSkge1xuICAgICAgICAgICAgY3MgPSAxO1xuICAgICAgICAgICAgbmMgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pbjAgPSBzdGFydCAtIGNzIC8gMjtcbiAgICAgICAgdmFyIG1heDAgPSBtaW4wICsgbmMgKiBjcztcbiAgICAgICAgY1ZhbHMgPSBbbWluMCwgbWF4MF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY1ZhbHMgPSB6T3V0O1xuICAgIH1cblxuICAgIENvbG9yc2NhbGUuY2FsYyhnZCwgdHJhY2UsIHt2YWxzOiBjVmFscywgY0xldHRlcjogJ3onfSk7XG5cbiAgICByZXR1cm4gY2Q7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcblxudmFyIGhlYXRtYXBIb3ZlclBvaW50cyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvaG92ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSwgaG92ZXJMYXllcikge1xuICAgIHZhciBob3ZlckRhdGEgPSBoZWF0bWFwSG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUsIGhvdmVyTGF5ZXIsIHRydWUpO1xuXG4gICAgaWYoaG92ZXJEYXRhKSB7XG4gICAgICAgIGhvdmVyRGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGhvdmVyUHQpIHtcbiAgICAgICAgICAgIHZhciB0cmFjZSA9IGhvdmVyUHQudHJhY2U7XG4gICAgICAgICAgICBpZih0cmFjZS5jb250b3Vycy50eXBlID09PSAnY29uc3RyYWludCcpIHtcbiAgICAgICAgICAgICAgICBpZih0cmFjZS5maWxsY29sb3IgJiYgQ29sb3Iub3BhY2l0eSh0cmFjZS5maWxsY29sb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdmVyUHQuY29sb3IgPSBDb2xvci5hZGRPcGFjaXR5KHRyYWNlLmZpbGxjb2xvciwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRyYWNlLmNvbnRvdXJzLnNob3dsaW5lcyAmJiBDb2xvci5vcGFjaXR5KHRyYWNlLmxpbmUuY29sb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdmVyUHQuY29sb3IgPSBDb2xvci5hZGRPcGFjaXR5KHRyYWNlLmxpbmUuY29sb3IsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhvdmVyRGF0YTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBGeCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBleHRyYWN0T3B0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpLmV4dHJhY3RPcHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlLCBob3ZlckxheWVyLCBjb250b3VyKSB7XG4gICAgdmFyIGNkMCA9IHBvaW50RGF0YS5jZFswXTtcbiAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgdmFyIHhhID0gcG9pbnREYXRhLnhhO1xuICAgIHZhciB5YSA9IHBvaW50RGF0YS55YTtcbiAgICB2YXIgeCA9IGNkMC54O1xuICAgIHZhciB5ID0gY2QwLnk7XG4gICAgdmFyIHogPSBjZDAuejtcbiAgICB2YXIgeGMgPSBjZDAueENlbnRlcjtcbiAgICB2YXIgeWMgPSBjZDAueUNlbnRlcjtcbiAgICB2YXIgem1hc2sgPSBjZDAuem1hc2s7XG4gICAgdmFyIHpob3ZlcmZvcm1hdCA9IHRyYWNlLnpob3ZlcmZvcm1hdDtcbiAgICB2YXIgeDIgPSB4O1xuICAgIHZhciB5MiA9IHk7XG5cbiAgICB2YXIgeGwsIHlsLCBueCwgbnk7XG5cbiAgICBpZihwb2ludERhdGEuaW5kZXggIT09IGZhbHNlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBueCA9IE1hdGgucm91bmQocG9pbnREYXRhLmluZGV4WzFdKTtcbiAgICAgICAgICAgIG55ID0gTWF0aC5yb3VuZChwb2ludERhdGEuaW5kZXhbMF0pO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIExpYi5lcnJvcignRXJyb3IgaG92ZXJpbmcgb24gaGVhdG1hcCwgJyArXG4gICAgICAgICAgICAgICAgJ3BvaW50TnVtYmVyIG11c3QgYmUgW3Jvdyxjb2xdLCBmb3VuZDonLCBwb2ludERhdGEuaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKG54IDwgMCB8fCBueCA+PSB6WzBdLmxlbmd0aCB8fCBueSA8IDAgfHwgbnkgPiB6Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKEZ4LmluYm94KHh2YWwgLSB4WzBdLCB4dmFsIC0geFt4Lmxlbmd0aCAtIDFdLCAwKSA+IDAgfHxcbiAgICAgICAgICAgIEZ4LmluYm94KHl2YWwgLSB5WzBdLCB5dmFsIC0geVt5Lmxlbmd0aCAtIDFdLCAwKSA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGNvbnRvdXIpIHtcbiAgICAgICAgICAgIHZhciBpMjtcbiAgICAgICAgICAgIHgyID0gWzIgKiB4WzBdIC0geFsxXV07XG5cbiAgICAgICAgICAgIGZvcihpMiA9IDE7IGkyIDwgeC5sZW5ndGg7IGkyKyspIHtcbiAgICAgICAgICAgICAgICB4Mi5wdXNoKCh4W2kyXSArIHhbaTIgLSAxXSkgLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHgyLnB1c2goWzIgKiB4W3gubGVuZ3RoIC0gMV0gLSB4W3gubGVuZ3RoIC0gMl1dKTtcblxuICAgICAgICAgICAgeTIgPSBbMiAqIHlbMF0gLSB5WzFdXTtcbiAgICAgICAgICAgIGZvcihpMiA9IDE7IGkyIDwgeS5sZW5ndGg7IGkyKyspIHtcbiAgICAgICAgICAgICAgICB5Mi5wdXNoKCh5W2kyXSArIHlbaTIgLSAxXSkgLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHkyLnB1c2goWzIgKiB5W3kubGVuZ3RoIC0gMV0gLSB5W3kubGVuZ3RoIC0gMl1dKTtcbiAgICAgICAgfVxuICAgICAgICBueCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHgyLmxlbmd0aCAtIDIsIExpYi5maW5kQmluKHh2YWwsIHgyKSkpO1xuICAgICAgICBueSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHkyLmxlbmd0aCAtIDIsIExpYi5maW5kQmluKHl2YWwsIHkyKSkpO1xuICAgIH1cblxuICAgIHZhciB4MCA9IHhhLmMycCh4W254XSk7XG4gICAgdmFyIHgxID0geGEuYzJwKHhbbnggKyAxXSk7XG4gICAgdmFyIHkwID0geWEuYzJwKHlbbnldKTtcbiAgICB2YXIgeTEgPSB5YS5jMnAoeVtueSArIDFdKTtcblxuICAgIGlmKGNvbnRvdXIpIHtcbiAgICAgICAgeDEgPSB4MDtcbiAgICAgICAgeGwgPSB4W254XTtcbiAgICAgICAgeTEgPSB5MDtcbiAgICAgICAgeWwgPSB5W255XTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB4bCA9IHhjID8geGNbbnhdIDogKCh4W254XSArIHhbbnggKyAxXSkgLyAyKTtcbiAgICAgICAgeWwgPSB5YyA/IHljW255XSA6ICgoeVtueV0gKyB5W255ICsgMV0pIC8gMik7XG5cbiAgICAgICAgaWYoeGEgJiYgeGEudHlwZSA9PT0gJ2NhdGVnb3J5JykgeGwgPSB4W254XTtcbiAgICAgICAgaWYoeWEgJiYgeWEudHlwZSA9PT0gJ2NhdGVnb3J5JykgeWwgPSB5W255XTtcblxuICAgICAgICBpZih0cmFjZS56c21vb3RoKSB7XG4gICAgICAgICAgICB4MCA9IHgxID0geGEuYzJwKHhsKTtcbiAgICAgICAgICAgIHkwID0geTEgPSB5YS5jMnAoeWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHpWYWwgPSB6W255XVtueF07XG4gICAgaWYoem1hc2sgJiYgIXptYXNrW255XVtueF0pIHpWYWwgPSB1bmRlZmluZWQ7XG5cbiAgICBpZih6VmFsID09PSB1bmRlZmluZWQgJiYgIXRyYWNlLmhvdmVyb25nYXBzKSByZXR1cm47XG5cbiAgICB2YXIgdGV4dDtcbiAgICBpZihBcnJheS5pc0FycmF5KGNkMC5ob3ZlcnRleHQpICYmIEFycmF5LmlzQXJyYXkoY2QwLmhvdmVydGV4dFtueV0pKSB7XG4gICAgICAgIHRleHQgPSBjZDAuaG92ZXJ0ZXh0W255XVtueF07XG4gICAgfSBlbHNlIGlmKEFycmF5LmlzQXJyYXkoY2QwLnRleHQpICYmIEFycmF5LmlzQXJyYXkoY2QwLnRleHRbbnldKSkge1xuICAgICAgICB0ZXh0ID0gY2QwLnRleHRbbnldW254XTtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBheGlzIGZvciBmb3JtYXR0aW5nIHRoZSB6IHZhbHVlXG4gICAgdmFyIGNPcHRzID0gZXh0cmFjdE9wdHModHJhY2UpO1xuICAgIHZhciBkdW1teUF4ID0ge1xuICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgcmFuZ2U6IFtjT3B0cy5taW4sIGNPcHRzLm1heF0sXG4gICAgICAgIGhvdmVyZm9ybWF0OiB6aG92ZXJmb3JtYXQsXG4gICAgICAgIF9zZXBhcmF0b3JzOiB4YS5fc2VwYXJhdG9ycyxcbiAgICAgICAgX251bUZvcm1hdDogeGEuX251bUZvcm1hdFxuICAgIH07XG4gICAgdmFyIHpMYWJlbCA9IEF4ZXMudGlja1RleHQoZHVtbXlBeCwgelZhbCwgJ2hvdmVyJykudGV4dDtcblxuICAgIHJldHVybiBbTGliLmV4dGVuZEZsYXQocG9pbnREYXRhLCB7XG4gICAgICAgIGluZGV4OiB0cmFjZS5fYWZ0ZXIyYmVmb3JlID8gdHJhY2UuX2FmdGVyMmJlZm9yZVtueV1bbnhdIDogW255LCBueF0sXG4gICAgICAgIC8vIG5ldmVyIGxldCBhIDJEIG92ZXJyaWRlIDFEIHR5cGUgYXMgY2xvc2VzdCBwb2ludFxuICAgICAgICBkaXN0YW5jZTogcG9pbnREYXRhLm1heEhvdmVyRGlzdGFuY2UsXG4gICAgICAgIHNwaWtlRGlzdGFuY2U6IHBvaW50RGF0YS5tYXhTcGlrZURpc3RhbmNlLFxuICAgICAgICB4MDogeDAsXG4gICAgICAgIHgxOiB4MSxcbiAgICAgICAgeTA6IHkwLFxuICAgICAgICB5MTogeTEsXG4gICAgICAgIHhMYWJlbFZhbDogeGwsXG4gICAgICAgIHlMYWJlbFZhbDogeWwsXG4gICAgICAgIHpMYWJlbFZhbDogelZhbCxcbiAgICAgICAgekxhYmVsOiB6TGFiZWwsXG4gICAgICAgIHRleHQ6IHRleHRcbiAgICB9KV07XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGlzdG9ncmFtQXR0cnMgPSByZXF1aXJlKCcuLi9oaXN0b2dyYW0vYXR0cmlidXRlcycpO1xudmFyIG1ha2VCaW5BdHRycyA9IHJlcXVpcmUoJy4uL2hpc3RvZ3JhbS9iaW5fYXR0cmlidXRlcycpO1xudmFyIGhlYXRtYXBBdHRycyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvYXR0cmlidXRlcycpO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kRmxhdChcbiAgICB7XG4gICAgICAgIHg6IGhpc3RvZ3JhbUF0dHJzLngsXG4gICAgICAgIHk6IGhpc3RvZ3JhbUF0dHJzLnksXG5cbiAgICAgICAgejoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgYWdncmVnYXRpb24gZGF0YS4nXG4gICAgICAgIH0sXG4gICAgICAgIG1hcmtlcjoge1xuICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGFnZ3JlZ2F0aW9uIGRhdGEuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICAgICAgfSxcblxuICAgICAgICBoaXN0bm9ybTogaGlzdG9ncmFtQXR0cnMuaGlzdG5vcm0sXG4gICAgICAgIGhpc3RmdW5jOiBoaXN0b2dyYW1BdHRycy5oaXN0ZnVuYyxcbiAgICAgICAgbmJpbnN4OiBoaXN0b2dyYW1BdHRycy5uYmluc3gsXG4gICAgICAgIHhiaW5zOiBtYWtlQmluQXR0cnMoJ3gnKSxcbiAgICAgICAgbmJpbnN5OiBoaXN0b2dyYW1BdHRycy5uYmluc3ksXG4gICAgICAgIHliaW5zOiBtYWtlQmluQXR0cnMoJ3knKSxcbiAgICAgICAgYXV0b2Jpbng6IGhpc3RvZ3JhbUF0dHJzLmF1dG9iaW54LFxuICAgICAgICBhdXRvYmlueTogaGlzdG9ncmFtQXR0cnMuYXV0b2JpbnksXG5cbiAgICAgICAgYmluZ3JvdXA6IGV4dGVuZEZsYXQoe30sIGhpc3RvZ3JhbUF0dHJzLmJpbmdyb3VwLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXQgdGhlIGB4YmluZ3JvdXBgIGFuZCBgeWJpbmdyb3VwYCBkZWZhdWx0IHByZWZpeCcsXG4gICAgICAgICAgICAgICAgJ0ZvciBleGFtcGxlLCBzZXR0aW5nIGEgYGJpbmdyb3VwYCBvZiAqMSogb24gdHdvIGhpc3RvZ3JhbTJkIHRyYWNlcycsXG4gICAgICAgICAgICAgICAgJ3dpbGwgbWFrZSB0aGVtIHRoZWlyIHgtYmlucyBhbmQgeS1iaW5zIG1hdGNoIHNlcGFyYXRlbHkuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSksXG4gICAgICAgIHhiaW5ncm91cDogZXh0ZW5kRmxhdCh7fSwgaGlzdG9ncmFtQXR0cnMuYmluZ3JvdXAsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldCBhIGdyb3VwIG9mIGhpc3RvZ3JhbSB0cmFjZXMgd2hpY2ggd2lsbCBoYXZlIGNvbXBhdGlibGUgeC1iaW4gc2V0dGluZ3MuJyxcbiAgICAgICAgICAgICAgICAnVXNpbmcgYHhiaW5ncm91cGAsIGhpc3RvZ3JhbTJkIGFuZCBoaXN0b2dyYW0yZGNvbnRvdXIgdHJhY2VzICcsXG4gICAgICAgICAgICAgICAgJyhvbiBheGVzIG9mIHRoZSBzYW1lIGF4aXMgdHlwZSkgY2FuIGhhdmUgY29tcGF0aWJsZSB4LWJpbiBzZXR0aW5ncy4nLFxuICAgICAgICAgICAgICAgICdOb3RlIHRoYXQgdGhlIHNhbWUgYHhiaW5ncm91cGAgdmFsdWUgY2FuIGJlIHVzZWQgdG8gc2V0ICgxRCkgaGlzdG9ncmFtIGBiaW5ncm91cGAnXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9KSxcbiAgICAgICAgeWJpbmdyb3VwOiBleHRlbmRGbGF0KHt9LCBoaXN0b2dyYW1BdHRycy5iaW5ncm91cCwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0IGEgZ3JvdXAgb2YgaGlzdG9ncmFtIHRyYWNlcyB3aGljaCB3aWxsIGhhdmUgY29tcGF0aWJsZSB5LWJpbiBzZXR0aW5ncy4nLFxuICAgICAgICAgICAgICAgICdVc2luZyBgeWJpbmdyb3VwYCwgaGlzdG9ncmFtMmQgYW5kIGhpc3RvZ3JhbTJkY29udG91ciB0cmFjZXMgJyxcbiAgICAgICAgICAgICAgICAnKG9uIGF4ZXMgb2YgdGhlIHNhbWUgYXhpcyB0eXBlKSBjYW4gaGF2ZSBjb21wYXRpYmxlIHktYmluIHNldHRpbmdzLicsXG4gICAgICAgICAgICAgICAgJ05vdGUgdGhhdCB0aGUgc2FtZSBgeWJpbmdyb3VwYCB2YWx1ZSBjYW4gYmUgdXNlZCB0byBzZXQgKDFEKSBoaXN0b2dyYW0gYGJpbmdyb3VwYCdcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuXG4gICAgICAgIHhnYXA6IGhlYXRtYXBBdHRycy54Z2FwLFxuICAgICAgICB5Z2FwOiBoZWF0bWFwQXR0cnMueWdhcCxcbiAgICAgICAgenNtb290aDogaGVhdG1hcEF0dHJzLnpzbW9vdGgsXG4gICAgICAgIHpob3ZlcmZvcm1hdDogaGVhdG1hcEF0dHJzLnpob3ZlcmZvcm1hdCxcbiAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHt9LCB7a2V5czogJ3onfSksXG4gICAgICAgIHNob3dsZWdlbmQ6IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5zaG93bGVnZW5kLCB7ZGZsdDogZmFsc2V9KVxuICAgIH0sXG4gICAgY29sb3JTY2FsZUF0dHJzKCcnLCB7Y0xldHRlcjogJ3onLCBhdXRvQ29sb3JEZmx0OiBmYWxzZX0pXG4pO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVNhbXBsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCkge1xuICAgIHZhciB4ID0gY29lcmNlKCd4Jyk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ3knKTtcbiAgICB2YXIgeGxlbiA9IExpYi5taW5Sb3dMZW5ndGgoeCk7XG4gICAgdmFyIHlsZW4gPSBMaWIubWluUm93TGVuZ3RoKHkpO1xuXG4gICAgLy8gd2UgY291bGQgdHJ5IHRvIGFjY2VwdCB4MCBhbmQgZHgsIGV0Yy4uLlxuICAgIC8vIGJ1dCB0aGF0J3MgYSBwcmV0dHkgd2VpcmQgdXNlIGNhc2UuXG4gICAgLy8gZm9yIG5vdyByZXF1aXJlIGJvdGggeCBhbmQgeSBleHBsaWNpdGx5IHNwZWNpZmllZC5cbiAgICBpZigheGxlbiB8fCAheWxlbikge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cmFjZU91dC5fbGVuZ3RoID0gTWF0aC5taW4oeGxlbiwgeWxlbik7XG5cbiAgICB2YXIgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY2FsZW5kYXJzJywgJ2hhbmRsZVRyYWNlRGVmYXVsdHMnKTtcbiAgICBoYW5kbGVDYWxlbmRhckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBbJ3gnLCAneSddLCBsYXlvdXQpO1xuXG4gICAgLy8gaWYgbWFya2VyLmNvbG9yIGlzIGFuIGFycmF5LCB3ZSBjYW4gdXNlIGl0IGluIGFnZ3JlZ2F0aW9uIGluc3RlYWQgb2YgelxuICAgIHZhciBoYXNBZ2dyZWdhdGlvbkRhdGEgPSBjb2VyY2UoJ3onKSB8fCBjb2VyY2UoJ21hcmtlci5jb2xvcicpO1xuXG4gICAgaWYoaGFzQWdncmVnYXRpb25EYXRhKSBjb2VyY2UoJ2hpc3RmdW5jJyk7XG4gICAgY29lcmNlKCdoaXN0bm9ybScpO1xuXG4gICAgLy8gTm90ZTogYmluIGRlZmF1bHRzIGFyZSBub3cgaGFuZGxlZCBpbiBIaXN0b2dyYW0yRC5jcm9zc1RyYWNlRGVmYXVsdHNcbiAgICAvLyBhdXRvYmluKHh8eSkgYXJlIG9ubHkgaW5jbHVkZWQgaGVyZSB0byBhcHBlYXNlIFBsb3RseS52YWxpZGF0ZVxuICAgIGNvZXJjZSgnYXV0b2JpbngnKTtcbiAgICBjb2VyY2UoJ2F1dG9iaW55Jyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGlzdG9ncmFtMmRBdHRycyA9IHJlcXVpcmUoJy4uL2hpc3RvZ3JhbTJkL2F0dHJpYnV0ZXMnKTtcbnZhciBjb250b3VyQXR0cnMgPSByZXF1aXJlKCcuLi9jb250b3VyL2F0dHJpYnV0ZXMnKTtcbnZhciBjb2xvclNjYWxlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvYXR0cmlidXRlcycpO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZEZsYXQoe1xuICAgIHg6IGhpc3RvZ3JhbTJkQXR0cnMueCxcbiAgICB5OiBoaXN0b2dyYW0yZEF0dHJzLnksXG4gICAgejogaGlzdG9ncmFtMmRBdHRycy56LFxuICAgIG1hcmtlcjogaGlzdG9ncmFtMmRBdHRycy5tYXJrZXIsXG5cbiAgICBoaXN0bm9ybTogaGlzdG9ncmFtMmRBdHRycy5oaXN0bm9ybSxcbiAgICBoaXN0ZnVuYzogaGlzdG9ncmFtMmRBdHRycy5oaXN0ZnVuYyxcbiAgICBuYmluc3g6IGhpc3RvZ3JhbTJkQXR0cnMubmJpbnN4LFxuICAgIHhiaW5zOiBoaXN0b2dyYW0yZEF0dHJzLnhiaW5zLFxuICAgIG5iaW5zeTogaGlzdG9ncmFtMmRBdHRycy5uYmluc3ksXG4gICAgeWJpbnM6IGhpc3RvZ3JhbTJkQXR0cnMueWJpbnMsXG4gICAgYXV0b2Jpbng6IGhpc3RvZ3JhbTJkQXR0cnMuYXV0b2JpbngsXG4gICAgYXV0b2Jpbnk6IGhpc3RvZ3JhbTJkQXR0cnMuYXV0b2JpbnksXG5cbiAgICBiaW5ncm91cDogaGlzdG9ncmFtMmRBdHRycy5iaW5ncm91cCxcbiAgICB4YmluZ3JvdXA6IGhpc3RvZ3JhbTJkQXR0cnMueGJpbmdyb3VwLFxuICAgIHliaW5ncm91cDogaGlzdG9ncmFtMmRBdHRycy55YmluZ3JvdXAsXG5cbiAgICBhdXRvY29udG91cjogY29udG91ckF0dHJzLmF1dG9jb250b3VyLFxuICAgIG5jb250b3VyczogY29udG91ckF0dHJzLm5jb250b3VycyxcbiAgICBjb250b3VyczogY29udG91ckF0dHJzLmNvbnRvdXJzLFxuICAgIGxpbmU6IHtcbiAgICAgICAgY29sb3I6IGNvbnRvdXJBdHRycy5saW5lLmNvbG9yLFxuICAgICAgICB3aWR0aDogZXh0ZW5kRmxhdCh7fSwgY29udG91ckF0dHJzLmxpbmUud2lkdGgsIHtcbiAgICAgICAgICAgIGRmbHQ6IDAuNSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29udG91ciBsaW5lIHdpZHRoIGluIChpbiBweCknXG4gICAgICAgIH0pLFxuICAgICAgICBkYXNoOiBjb250b3VyQXR0cnMubGluZS5kYXNoLFxuICAgICAgICBzbW9vdGhpbmc6IGNvbnRvdXJBdHRycy5saW5lLnNtb290aGluZyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgIH0sXG4gICAgemhvdmVyZm9ybWF0OiBoaXN0b2dyYW0yZEF0dHJzLnpob3ZlcmZvcm1hdCxcbiAgICBob3ZlcnRlbXBsYXRlOiBoaXN0b2dyYW0yZEF0dHJzLmhvdmVydGVtcGxhdGVcbn0sXG4gICAgY29sb3JTY2FsZUF0dHJzKCcnLCB7XG4gICAgICAgIGNMZXR0ZXI6ICd6JyxcbiAgICAgICAgZWRpdFR5cGVPdmVycmlkZTogJ2NhbGMnXG4gICAgfSlcbik7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgaGFuZGxlU2FtcGxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9oaXN0b2dyYW0yZC9zYW1wbGVfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVDb250b3Vyc0RlZmF1bHRzID0gcmVxdWlyZSgnLi4vY29udG91ci9jb250b3Vyc19kZWZhdWx0cycpO1xudmFyIGhhbmRsZVN0eWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9jb250b3VyL3N0eWxlX2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvZXJjZTIoYXR0cikge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZTIodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIpO1xuICAgIH1cblxuICAgIGhhbmRsZVNhbXBsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgaWYodHJhY2VPdXQudmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIGhhbmRsZUNvbnRvdXJzRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgY29lcmNlMik7XG4gICAgaGFuZGxlU3R5bGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjcm9zc1RyYWNlRGVmYXVsdHM6IHJlcXVpcmUoJy4uL2hpc3RvZ3JhbS9jcm9zc190cmFjZV9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4uL2NvbnRvdXIvY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4uL2NvbnRvdXIvcGxvdCcpLnBsb3QsXG4gICAgbGF5ZXJOYW1lOiAnY29udG91cmxheWVyJyxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi4vY29udG91ci9zdHlsZScpLFxuICAgIGNvbG9yYmFyOiByZXF1aXJlKCcuLi9jb250b3VyL2NvbG9yYmFyJyksXG4gICAgaG92ZXJQb2ludHM6IHJlcXVpcmUoJy4uL2NvbnRvdXIvaG92ZXInKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ2hpc3RvZ3JhbTJkY29udG91cicsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbicpLFxuICAgIGNhdGVnb3JpZXM6IFsnY2FydGVzaWFuJywgJ3N2ZycsICcyZE1hcCcsICdjb250b3VyJywgJ2hpc3RvZ3JhbScsICdzaG93TGVnZW5kJ10sXG4gICAgbWV0YToge1xuICAgICAgICBock5hbWU6ICdoaXN0b2dyYW1fMmRfY29udG91cicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIHNhbXBsZSBkYXRhIGZyb20gd2hpY2ggc3RhdGlzdGljcyBhcmUgY29tcHV0ZWQgaXMgc2V0IGluIGB4YCcsXG4gICAgICAgICAgICAnYW5kIGB5YCAod2hlcmUgYHhgIGFuZCBgeWAgcmVwcmVzZW50IG1hcmdpbmFsIGRpc3RyaWJ1dGlvbnMsJyxcbiAgICAgICAgICAgICdiaW5uaW5nIGlzIHNldCBpbiBgeGJpbnNgIGFuZCBgeWJpbnNgIGluIHRoaXMgY2FzZSknLFxuICAgICAgICAgICAgJ29yIGB6YCAod2hlcmUgYHpgIHJlcHJlc2VudCB0aGUgMkQgZGlzdHJpYnV0aW9uIGFuZCBiaW5uaW5nIHNldCwnLFxuICAgICAgICAgICAgJ2Jpbm5pbmcgaXMgc2V0IGJ5IGB4YCBhbmQgYHlgIGluIHRoaXMgY2FzZSkuJyxcbiAgICAgICAgICAgICdUaGUgcmVzdWx0aW5nIGRpc3RyaWJ1dGlvbiBpcyB2aXN1YWxpemVkIGFzIGEgY29udG91ciBwbG90LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==