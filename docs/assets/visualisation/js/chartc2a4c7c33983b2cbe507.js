(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_histogram2d_js"],{

/***/ "./node_modules/plotly.js/lib/histogram2d.js":
/*!***************************************************!*\
  !*** ./node_modules/plotly.js/lib/histogram2d.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/histogram2d */ "./node_modules/plotly.js/src/traces/histogram2d/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/colorbar.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = {
    min: 'zmin',
    max: 'zmax'
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

/***/ "./node_modules/plotly.js/src/traces/heatmap/style_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/style_defaults.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




module.exports = function handleStyleDefaults(traceIn, traceOut, coerce) {
    var zsmooth = coerce('zsmooth');
    if(zsmooth === false) {
        // ensure that xgap and ygap are coerced only when zsmooth allows them to have an effect.
        coerce('xgap');
        coerce('ygap');
    }

    coerce('zhoverformat');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/event_data.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/event_data.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function eventData(out, pt, trace, cd, pointNumber) {
    // standard cartesian event data
    out.x = 'xVal' in pt ? pt.xVal : pt.x;
    out.y = 'yVal' in pt ? pt.yVal : pt.y;

    // for 2d histograms
    if('zLabelVal' in pt) out.z = pt.zLabelVal;

    if(pt.xa) out.xaxis = pt.xa;
    if(pt.ya) out.yaxis = pt.ya;

    // specific to histogram - CDFs do not have pts (yet?)
    if(!(trace.cumulative || {}).enabled) {
        var pts = Array.isArray(pointNumber) ?
            cd[0].pts[pointNumber[0]][pointNumber[1]] :
            cd[pointNumber].pts;

        out.pointNumbers = pts;
        out.binNumber = out.pointNumber;
        delete out.pointNumber;
        delete out.pointIndex;

        var pointIndices;
        if(trace._indexToPoints) {
            pointIndices = [];
            for(var i = 0; i < pts.length; i++) {
                pointIndices = pointIndices.concat(trace._indexToPoints[pts[i]]);
            }
        } else {
            pointIndices = pts;
        }

        out.pointIndices = pointIndices;
    }

    return out;
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

/***/ "./node_modules/plotly.js/src/traces/histogram2d/defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2d/defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var handleSampleDefaults = __webpack_require__(/*! ./sample_defaults */ "./node_modules/plotly.js/src/traces/histogram2d/sample_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ../heatmap/style_defaults */ "./node_modules/plotly.js/src/traces/heatmap/style_defaults.js");
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/histogram2d/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    handleSampleDefaults(traceIn, traceOut, coerce, layout);
    if(traceOut.visible === false) return;

    handleStyleDefaults(traceIn, traceOut, coerce, layout);
    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'z'});
    coerce('hovertemplate');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2d/hover.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2d/hover.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var heatmapHover = __webpack_require__(/*! ../heatmap/hover */ "./node_modules/plotly.js/src/traces/heatmap/hover.js");
var hoverLabelText = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js").hoverLabelText;

module.exports = function hoverPoints(pointData, xval, yval, hovermode, hoverLayer, contour) {
    var pts = heatmapHover(pointData, xval, yval, hovermode, hoverLayer, contour);

    if(!pts) return;

    pointData = pts[0];
    var indices = pointData.index;
    var ny = indices[0];
    var nx = indices[1];
    var cd0 = pointData.cd[0];
    var xRange = cd0.xRanges[nx];
    var yRange = cd0.yRanges[ny];

    pointData.xLabel = hoverLabelText(pointData.xa, xRange[0], xRange[1]);
    pointData.yLabel = hoverLabelText(pointData.ya, yRange[0], yRange[1]);

    return pts;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2d/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2d/index.js ***!
  \****************************************************************/
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/histogram2d/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/histogram2d/defaults.js"),
    crossTraceDefaults: __webpack_require__(/*! ../histogram/cross_trace_defaults */ "./node_modules/plotly.js/src/traces/histogram/cross_trace_defaults.js"),
    calc: __webpack_require__(/*! ../heatmap/calc */ "./node_modules/plotly.js/src/traces/heatmap/calc.js"),
    plot: __webpack_require__(/*! ../heatmap/plot */ "./node_modules/plotly.js/src/traces/heatmap/plot.js"),
    layerName: 'heatmaplayer',
    colorbar: __webpack_require__(/*! ../heatmap/colorbar */ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js"),
    style: __webpack_require__(/*! ../heatmap/style */ "./node_modules/plotly.js/src/traces/heatmap/style.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/histogram2d/hover.js"),
    eventData: __webpack_require__(/*! ../histogram/event_data */ "./node_modules/plotly.js/src/traces/histogram/event_data.js"),

    moduleType: 'trace',
    name: 'histogram2d',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', '2dMap', 'histogram', 'showLegend'],
    meta: {
        hrName: 'histogram_2d',
        description: [
            'The sample data from which statistics are computed is set in `x`',
            'and `y` (where `x` and `y` represent marginal distributions,',
            'binning is set in `xbins` and `ybins` in this case)',
            'or `z` (where `z` represent the 2D distribution and binning set,',
            'binning is set by `x` and `y` in this case).',
            'The resulting distribution is visualized as a heatmap.'
        ].join(' ')
    }
};


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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaGlzdG9ncmFtMmQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL2NvbG9yYmFyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9ob3Zlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvc3R5bGVfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oaXN0b2dyYW0vZXZlbnRfZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hpc3RvZ3JhbTJkL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oaXN0b2dyYW0yZC9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hpc3RvZ3JhbTJkL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtMmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oaXN0b2dyYW0yZC9zYW1wbGVfZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLGdFQUFnQjtBQUN2QyxVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydGMyYTRjN2MzMzk4M2IyY2JlNTA3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvaGlzdG9ncmFtMmQnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWluOiAnem1pbicsXG4gICAgbWF4OiAnem1heCdcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBGeCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBleHRyYWN0T3B0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpLmV4dHJhY3RPcHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlLCBob3ZlckxheWVyLCBjb250b3VyKSB7XG4gICAgdmFyIGNkMCA9IHBvaW50RGF0YS5jZFswXTtcbiAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgdmFyIHhhID0gcG9pbnREYXRhLnhhO1xuICAgIHZhciB5YSA9IHBvaW50RGF0YS55YTtcbiAgICB2YXIgeCA9IGNkMC54O1xuICAgIHZhciB5ID0gY2QwLnk7XG4gICAgdmFyIHogPSBjZDAuejtcbiAgICB2YXIgeGMgPSBjZDAueENlbnRlcjtcbiAgICB2YXIgeWMgPSBjZDAueUNlbnRlcjtcbiAgICB2YXIgem1hc2sgPSBjZDAuem1hc2s7XG4gICAgdmFyIHpob3ZlcmZvcm1hdCA9IHRyYWNlLnpob3ZlcmZvcm1hdDtcbiAgICB2YXIgeDIgPSB4O1xuICAgIHZhciB5MiA9IHk7XG5cbiAgICB2YXIgeGwsIHlsLCBueCwgbnk7XG5cbiAgICBpZihwb2ludERhdGEuaW5kZXggIT09IGZhbHNlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBueCA9IE1hdGgucm91bmQocG9pbnREYXRhLmluZGV4WzFdKTtcbiAgICAgICAgICAgIG55ID0gTWF0aC5yb3VuZChwb2ludERhdGEuaW5kZXhbMF0pO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIExpYi5lcnJvcignRXJyb3IgaG92ZXJpbmcgb24gaGVhdG1hcCwgJyArXG4gICAgICAgICAgICAgICAgJ3BvaW50TnVtYmVyIG11c3QgYmUgW3Jvdyxjb2xdLCBmb3VuZDonLCBwb2ludERhdGEuaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKG54IDwgMCB8fCBueCA+PSB6WzBdLmxlbmd0aCB8fCBueSA8IDAgfHwgbnkgPiB6Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKEZ4LmluYm94KHh2YWwgLSB4WzBdLCB4dmFsIC0geFt4Lmxlbmd0aCAtIDFdLCAwKSA+IDAgfHxcbiAgICAgICAgICAgIEZ4LmluYm94KHl2YWwgLSB5WzBdLCB5dmFsIC0geVt5Lmxlbmd0aCAtIDFdLCAwKSA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGNvbnRvdXIpIHtcbiAgICAgICAgICAgIHZhciBpMjtcbiAgICAgICAgICAgIHgyID0gWzIgKiB4WzBdIC0geFsxXV07XG5cbiAgICAgICAgICAgIGZvcihpMiA9IDE7IGkyIDwgeC5sZW5ndGg7IGkyKyspIHtcbiAgICAgICAgICAgICAgICB4Mi5wdXNoKCh4W2kyXSArIHhbaTIgLSAxXSkgLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHgyLnB1c2goWzIgKiB4W3gubGVuZ3RoIC0gMV0gLSB4W3gubGVuZ3RoIC0gMl1dKTtcblxuICAgICAgICAgICAgeTIgPSBbMiAqIHlbMF0gLSB5WzFdXTtcbiAgICAgICAgICAgIGZvcihpMiA9IDE7IGkyIDwgeS5sZW5ndGg7IGkyKyspIHtcbiAgICAgICAgICAgICAgICB5Mi5wdXNoKCh5W2kyXSArIHlbaTIgLSAxXSkgLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHkyLnB1c2goWzIgKiB5W3kubGVuZ3RoIC0gMV0gLSB5W3kubGVuZ3RoIC0gMl1dKTtcbiAgICAgICAgfVxuICAgICAgICBueCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHgyLmxlbmd0aCAtIDIsIExpYi5maW5kQmluKHh2YWwsIHgyKSkpO1xuICAgICAgICBueSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHkyLmxlbmd0aCAtIDIsIExpYi5maW5kQmluKHl2YWwsIHkyKSkpO1xuICAgIH1cblxuICAgIHZhciB4MCA9IHhhLmMycCh4W254XSk7XG4gICAgdmFyIHgxID0geGEuYzJwKHhbbnggKyAxXSk7XG4gICAgdmFyIHkwID0geWEuYzJwKHlbbnldKTtcbiAgICB2YXIgeTEgPSB5YS5jMnAoeVtueSArIDFdKTtcblxuICAgIGlmKGNvbnRvdXIpIHtcbiAgICAgICAgeDEgPSB4MDtcbiAgICAgICAgeGwgPSB4W254XTtcbiAgICAgICAgeTEgPSB5MDtcbiAgICAgICAgeWwgPSB5W255XTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB4bCA9IHhjID8geGNbbnhdIDogKCh4W254XSArIHhbbnggKyAxXSkgLyAyKTtcbiAgICAgICAgeWwgPSB5YyA/IHljW255XSA6ICgoeVtueV0gKyB5W255ICsgMV0pIC8gMik7XG5cbiAgICAgICAgaWYoeGEgJiYgeGEudHlwZSA9PT0gJ2NhdGVnb3J5JykgeGwgPSB4W254XTtcbiAgICAgICAgaWYoeWEgJiYgeWEudHlwZSA9PT0gJ2NhdGVnb3J5JykgeWwgPSB5W255XTtcblxuICAgICAgICBpZih0cmFjZS56c21vb3RoKSB7XG4gICAgICAgICAgICB4MCA9IHgxID0geGEuYzJwKHhsKTtcbiAgICAgICAgICAgIHkwID0geTEgPSB5YS5jMnAoeWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHpWYWwgPSB6W255XVtueF07XG4gICAgaWYoem1hc2sgJiYgIXptYXNrW255XVtueF0pIHpWYWwgPSB1bmRlZmluZWQ7XG5cbiAgICBpZih6VmFsID09PSB1bmRlZmluZWQgJiYgIXRyYWNlLmhvdmVyb25nYXBzKSByZXR1cm47XG5cbiAgICB2YXIgdGV4dDtcbiAgICBpZihBcnJheS5pc0FycmF5KGNkMC5ob3ZlcnRleHQpICYmIEFycmF5LmlzQXJyYXkoY2QwLmhvdmVydGV4dFtueV0pKSB7XG4gICAgICAgIHRleHQgPSBjZDAuaG92ZXJ0ZXh0W255XVtueF07XG4gICAgfSBlbHNlIGlmKEFycmF5LmlzQXJyYXkoY2QwLnRleHQpICYmIEFycmF5LmlzQXJyYXkoY2QwLnRleHRbbnldKSkge1xuICAgICAgICB0ZXh0ID0gY2QwLnRleHRbbnldW254XTtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBheGlzIGZvciBmb3JtYXR0aW5nIHRoZSB6IHZhbHVlXG4gICAgdmFyIGNPcHRzID0gZXh0cmFjdE9wdHModHJhY2UpO1xuICAgIHZhciBkdW1teUF4ID0ge1xuICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgcmFuZ2U6IFtjT3B0cy5taW4sIGNPcHRzLm1heF0sXG4gICAgICAgIGhvdmVyZm9ybWF0OiB6aG92ZXJmb3JtYXQsXG4gICAgICAgIF9zZXBhcmF0b3JzOiB4YS5fc2VwYXJhdG9ycyxcbiAgICAgICAgX251bUZvcm1hdDogeGEuX251bUZvcm1hdFxuICAgIH07XG4gICAgdmFyIHpMYWJlbCA9IEF4ZXMudGlja1RleHQoZHVtbXlBeCwgelZhbCwgJ2hvdmVyJykudGV4dDtcblxuICAgIHJldHVybiBbTGliLmV4dGVuZEZsYXQocG9pbnREYXRhLCB7XG4gICAgICAgIGluZGV4OiB0cmFjZS5fYWZ0ZXIyYmVmb3JlID8gdHJhY2UuX2FmdGVyMmJlZm9yZVtueV1bbnhdIDogW255LCBueF0sXG4gICAgICAgIC8vIG5ldmVyIGxldCBhIDJEIG92ZXJyaWRlIDFEIHR5cGUgYXMgY2xvc2VzdCBwb2ludFxuICAgICAgICBkaXN0YW5jZTogcG9pbnREYXRhLm1heEhvdmVyRGlzdGFuY2UsXG4gICAgICAgIHNwaWtlRGlzdGFuY2U6IHBvaW50RGF0YS5tYXhTcGlrZURpc3RhbmNlLFxuICAgICAgICB4MDogeDAsXG4gICAgICAgIHgxOiB4MSxcbiAgICAgICAgeTA6IHkwLFxuICAgICAgICB5MTogeTEsXG4gICAgICAgIHhMYWJlbFZhbDogeGwsXG4gICAgICAgIHlMYWJlbFZhbDogeWwsXG4gICAgICAgIHpMYWJlbFZhbDogelZhbCxcbiAgICAgICAgekxhYmVsOiB6TGFiZWwsXG4gICAgICAgIHRleHQ6IHRleHRcbiAgICB9KV07XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlU3R5bGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlKSB7XG4gICAgdmFyIHpzbW9vdGggPSBjb2VyY2UoJ3pzbW9vdGgnKTtcbiAgICBpZih6c21vb3RoID09PSBmYWxzZSkge1xuICAgICAgICAvLyBlbnN1cmUgdGhhdCB4Z2FwIGFuZCB5Z2FwIGFyZSBjb2VyY2VkIG9ubHkgd2hlbiB6c21vb3RoIGFsbG93cyB0aGVtIHRvIGhhdmUgYW4gZWZmZWN0LlxuICAgICAgICBjb2VyY2UoJ3hnYXAnKTtcbiAgICAgICAgY29lcmNlKCd5Z2FwJyk7XG4gICAgfVxuXG4gICAgY29lcmNlKCd6aG92ZXJmb3JtYXQnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlbnREYXRhKG91dCwgcHQsIHRyYWNlLCBjZCwgcG9pbnROdW1iZXIpIHtcbiAgICAvLyBzdGFuZGFyZCBjYXJ0ZXNpYW4gZXZlbnQgZGF0YVxuICAgIG91dC54ID0gJ3hWYWwnIGluIHB0ID8gcHQueFZhbCA6IHB0Lng7XG4gICAgb3V0LnkgPSAneVZhbCcgaW4gcHQgPyBwdC55VmFsIDogcHQueTtcblxuICAgIC8vIGZvciAyZCBoaXN0b2dyYW1zXG4gICAgaWYoJ3pMYWJlbFZhbCcgaW4gcHQpIG91dC56ID0gcHQuekxhYmVsVmFsO1xuXG4gICAgaWYocHQueGEpIG91dC54YXhpcyA9IHB0LnhhO1xuICAgIGlmKHB0LnlhKSBvdXQueWF4aXMgPSBwdC55YTtcblxuICAgIC8vIHNwZWNpZmljIHRvIGhpc3RvZ3JhbSAtIENERnMgZG8gbm90IGhhdmUgcHRzICh5ZXQ/KVxuICAgIGlmKCEodHJhY2UuY3VtdWxhdGl2ZSB8fCB7fSkuZW5hYmxlZCkge1xuICAgICAgICB2YXIgcHRzID0gQXJyYXkuaXNBcnJheShwb2ludE51bWJlcikgP1xuICAgICAgICAgICAgY2RbMF0ucHRzW3BvaW50TnVtYmVyWzBdXVtwb2ludE51bWJlclsxXV0gOlxuICAgICAgICAgICAgY2RbcG9pbnROdW1iZXJdLnB0cztcblxuICAgICAgICBvdXQucG9pbnROdW1iZXJzID0gcHRzO1xuICAgICAgICBvdXQuYmluTnVtYmVyID0gb3V0LnBvaW50TnVtYmVyO1xuICAgICAgICBkZWxldGUgb3V0LnBvaW50TnVtYmVyO1xuICAgICAgICBkZWxldGUgb3V0LnBvaW50SW5kZXg7XG5cbiAgICAgICAgdmFyIHBvaW50SW5kaWNlcztcbiAgICAgICAgaWYodHJhY2UuX2luZGV4VG9Qb2ludHMpIHtcbiAgICAgICAgICAgIHBvaW50SW5kaWNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBvaW50SW5kaWNlcyA9IHBvaW50SW5kaWNlcy5jb25jYXQodHJhY2UuX2luZGV4VG9Qb2ludHNbcHRzW2ldXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb2ludEluZGljZXMgPSBwdHM7XG4gICAgICAgIH1cblxuICAgICAgICBvdXQucG9pbnRJbmRpY2VzID0gcG9pbnRJbmRpY2VzO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGlzdG9ncmFtQXR0cnMgPSByZXF1aXJlKCcuLi9oaXN0b2dyYW0vYXR0cmlidXRlcycpO1xudmFyIG1ha2VCaW5BdHRycyA9IHJlcXVpcmUoJy4uL2hpc3RvZ3JhbS9iaW5fYXR0cmlidXRlcycpO1xudmFyIGhlYXRtYXBBdHRycyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvYXR0cmlidXRlcycpO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kRmxhdChcbiAgICB7XG4gICAgICAgIHg6IGhpc3RvZ3JhbUF0dHJzLngsXG4gICAgICAgIHk6IGhpc3RvZ3JhbUF0dHJzLnksXG5cbiAgICAgICAgejoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgYWdncmVnYXRpb24gZGF0YS4nXG4gICAgICAgIH0sXG4gICAgICAgIG1hcmtlcjoge1xuICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGFnZ3JlZ2F0aW9uIGRhdGEuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICAgICAgfSxcblxuICAgICAgICBoaXN0bm9ybTogaGlzdG9ncmFtQXR0cnMuaGlzdG5vcm0sXG4gICAgICAgIGhpc3RmdW5jOiBoaXN0b2dyYW1BdHRycy5oaXN0ZnVuYyxcbiAgICAgICAgbmJpbnN4OiBoaXN0b2dyYW1BdHRycy5uYmluc3gsXG4gICAgICAgIHhiaW5zOiBtYWtlQmluQXR0cnMoJ3gnKSxcbiAgICAgICAgbmJpbnN5OiBoaXN0b2dyYW1BdHRycy5uYmluc3ksXG4gICAgICAgIHliaW5zOiBtYWtlQmluQXR0cnMoJ3knKSxcbiAgICAgICAgYXV0b2Jpbng6IGhpc3RvZ3JhbUF0dHJzLmF1dG9iaW54LFxuICAgICAgICBhdXRvYmlueTogaGlzdG9ncmFtQXR0cnMuYXV0b2JpbnksXG5cbiAgICAgICAgYmluZ3JvdXA6IGV4dGVuZEZsYXQoe30sIGhpc3RvZ3JhbUF0dHJzLmJpbmdyb3VwLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXQgdGhlIGB4YmluZ3JvdXBgIGFuZCBgeWJpbmdyb3VwYCBkZWZhdWx0IHByZWZpeCcsXG4gICAgICAgICAgICAgICAgJ0ZvciBleGFtcGxlLCBzZXR0aW5nIGEgYGJpbmdyb3VwYCBvZiAqMSogb24gdHdvIGhpc3RvZ3JhbTJkIHRyYWNlcycsXG4gICAgICAgICAgICAgICAgJ3dpbGwgbWFrZSB0aGVtIHRoZWlyIHgtYmlucyBhbmQgeS1iaW5zIG1hdGNoIHNlcGFyYXRlbHkuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSksXG4gICAgICAgIHhiaW5ncm91cDogZXh0ZW5kRmxhdCh7fSwgaGlzdG9ncmFtQXR0cnMuYmluZ3JvdXAsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldCBhIGdyb3VwIG9mIGhpc3RvZ3JhbSB0cmFjZXMgd2hpY2ggd2lsbCBoYXZlIGNvbXBhdGlibGUgeC1iaW4gc2V0dGluZ3MuJyxcbiAgICAgICAgICAgICAgICAnVXNpbmcgYHhiaW5ncm91cGAsIGhpc3RvZ3JhbTJkIGFuZCBoaXN0b2dyYW0yZGNvbnRvdXIgdHJhY2VzICcsXG4gICAgICAgICAgICAgICAgJyhvbiBheGVzIG9mIHRoZSBzYW1lIGF4aXMgdHlwZSkgY2FuIGhhdmUgY29tcGF0aWJsZSB4LWJpbiBzZXR0aW5ncy4nLFxuICAgICAgICAgICAgICAgICdOb3RlIHRoYXQgdGhlIHNhbWUgYHhiaW5ncm91cGAgdmFsdWUgY2FuIGJlIHVzZWQgdG8gc2V0ICgxRCkgaGlzdG9ncmFtIGBiaW5ncm91cGAnXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9KSxcbiAgICAgICAgeWJpbmdyb3VwOiBleHRlbmRGbGF0KHt9LCBoaXN0b2dyYW1BdHRycy5iaW5ncm91cCwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0IGEgZ3JvdXAgb2YgaGlzdG9ncmFtIHRyYWNlcyB3aGljaCB3aWxsIGhhdmUgY29tcGF0aWJsZSB5LWJpbiBzZXR0aW5ncy4nLFxuICAgICAgICAgICAgICAgICdVc2luZyBgeWJpbmdyb3VwYCwgaGlzdG9ncmFtMmQgYW5kIGhpc3RvZ3JhbTJkY29udG91ciB0cmFjZXMgJyxcbiAgICAgICAgICAgICAgICAnKG9uIGF4ZXMgb2YgdGhlIHNhbWUgYXhpcyB0eXBlKSBjYW4gaGF2ZSBjb21wYXRpYmxlIHktYmluIHNldHRpbmdzLicsXG4gICAgICAgICAgICAgICAgJ05vdGUgdGhhdCB0aGUgc2FtZSBgeWJpbmdyb3VwYCB2YWx1ZSBjYW4gYmUgdXNlZCB0byBzZXQgKDFEKSBoaXN0b2dyYW0gYGJpbmdyb3VwYCdcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuXG4gICAgICAgIHhnYXA6IGhlYXRtYXBBdHRycy54Z2FwLFxuICAgICAgICB5Z2FwOiBoZWF0bWFwQXR0cnMueWdhcCxcbiAgICAgICAgenNtb290aDogaGVhdG1hcEF0dHJzLnpzbW9vdGgsXG4gICAgICAgIHpob3ZlcmZvcm1hdDogaGVhdG1hcEF0dHJzLnpob3ZlcmZvcm1hdCxcbiAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHt9LCB7a2V5czogJ3onfSksXG4gICAgICAgIHNob3dsZWdlbmQ6IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5zaG93bGVnZW5kLCB7ZGZsdDogZmFsc2V9KVxuICAgIH0sXG4gICAgY29sb3JTY2FsZUF0dHJzKCcnLCB7Y0xldHRlcjogJ3onLCBhdXRvQ29sb3JEZmx0OiBmYWxzZX0pXG4pO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxudmFyIGhhbmRsZVNhbXBsZURlZmF1bHRzID0gcmVxdWlyZSgnLi9zYW1wbGVfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVTdHlsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vaGVhdG1hcC9zdHlsZV9kZWZhdWx0cycpO1xudmFyIGNvbG9yc2NhbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9kZWZhdWx0cycpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBoYW5kbGVTYW1wbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuICAgIGlmKHRyYWNlT3V0LnZpc2libGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICBoYW5kbGVTdHlsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgY29sb3JzY2FsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge3ByZWZpeDogJycsIGNMZXR0ZXI6ICd6J30pO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGVhdG1hcEhvdmVyID0gcmVxdWlyZSgnLi4vaGVhdG1hcC9ob3ZlcicpO1xudmFyIGhvdmVyTGFiZWxUZXh0ID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKS5ob3ZlckxhYmVsVGV4dDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSwgaG92ZXJMYXllciwgY29udG91cikge1xuICAgIHZhciBwdHMgPSBoZWF0bWFwSG92ZXIocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUsIGhvdmVyTGF5ZXIsIGNvbnRvdXIpO1xuXG4gICAgaWYoIXB0cykgcmV0dXJuO1xuXG4gICAgcG9pbnREYXRhID0gcHRzWzBdO1xuICAgIHZhciBpbmRpY2VzID0gcG9pbnREYXRhLmluZGV4O1xuICAgIHZhciBueSA9IGluZGljZXNbMF07XG4gICAgdmFyIG54ID0gaW5kaWNlc1sxXTtcbiAgICB2YXIgY2QwID0gcG9pbnREYXRhLmNkWzBdO1xuICAgIHZhciB4UmFuZ2UgPSBjZDAueFJhbmdlc1tueF07XG4gICAgdmFyIHlSYW5nZSA9IGNkMC55UmFuZ2VzW255XTtcblxuICAgIHBvaW50RGF0YS54TGFiZWwgPSBob3ZlckxhYmVsVGV4dChwb2ludERhdGEueGEsIHhSYW5nZVswXSwgeFJhbmdlWzFdKTtcbiAgICBwb2ludERhdGEueUxhYmVsID0gaG92ZXJMYWJlbFRleHQocG9pbnREYXRhLnlhLCB5UmFuZ2VbMF0sIHlSYW5nZVsxXSk7XG5cbiAgICByZXR1cm4gcHRzO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjcm9zc1RyYWNlRGVmYXVsdHM6IHJlcXVpcmUoJy4uL2hpc3RvZ3JhbS9jcm9zc190cmFjZV9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4uL2hlYXRtYXAvY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4uL2hlYXRtYXAvcGxvdCcpLFxuICAgIGxheWVyTmFtZTogJ2hlYXRtYXBsYXllcicsXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL2hlYXRtYXAvY29sb3JiYXInKSxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi4vaGVhdG1hcC9zdHlsZScpLFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJyksXG4gICAgZXZlbnREYXRhOiByZXF1aXJlKCcuLi9oaXN0b2dyYW0vZXZlbnRfZGF0YScpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnaGlzdG9ncmFtMmQnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4nKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2NhcnRlc2lhbicsICdzdmcnLCAnMmRNYXAnLCAnaGlzdG9ncmFtJywgJ3Nob3dMZWdlbmQnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGhyTmFtZTogJ2hpc3RvZ3JhbV8yZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIHNhbXBsZSBkYXRhIGZyb20gd2hpY2ggc3RhdGlzdGljcyBhcmUgY29tcHV0ZWQgaXMgc2V0IGluIGB4YCcsXG4gICAgICAgICAgICAnYW5kIGB5YCAod2hlcmUgYHhgIGFuZCBgeWAgcmVwcmVzZW50IG1hcmdpbmFsIGRpc3RyaWJ1dGlvbnMsJyxcbiAgICAgICAgICAgICdiaW5uaW5nIGlzIHNldCBpbiBgeGJpbnNgIGFuZCBgeWJpbnNgIGluIHRoaXMgY2FzZSknLFxuICAgICAgICAgICAgJ29yIGB6YCAod2hlcmUgYHpgIHJlcHJlc2VudCB0aGUgMkQgZGlzdHJpYnV0aW9uIGFuZCBiaW5uaW5nIHNldCwnLFxuICAgICAgICAgICAgJ2Jpbm5pbmcgaXMgc2V0IGJ5IGB4YCBhbmQgYHlgIGluIHRoaXMgY2FzZSkuJyxcbiAgICAgICAgICAgICdUaGUgcmVzdWx0aW5nIGRpc3RyaWJ1dGlvbiBpcyB2aXN1YWxpemVkIGFzIGEgaGVhdG1hcC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVTYW1wbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpIHtcbiAgICB2YXIgeCA9IGNvZXJjZSgneCcpO1xuICAgIHZhciB5ID0gY29lcmNlKCd5Jyk7XG4gICAgdmFyIHhsZW4gPSBMaWIubWluUm93TGVuZ3RoKHgpO1xuICAgIHZhciB5bGVuID0gTGliLm1pblJvd0xlbmd0aCh5KTtcblxuICAgIC8vIHdlIGNvdWxkIHRyeSB0byBhY2NlcHQgeDAgYW5kIGR4LCBldGMuLi5cbiAgICAvLyBidXQgdGhhdCdzIGEgcHJldHR5IHdlaXJkIHVzZSBjYXNlLlxuICAgIC8vIGZvciBub3cgcmVxdWlyZSBib3RoIHggYW5kIHkgZXhwbGljaXRseSBzcGVjaWZpZWQuXG4gICAgaWYoIXhsZW4gfHwgIXlsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IE1hdGgubWluKHhsZW4sIHlsZW4pO1xuXG4gICAgdmFyIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2NhbGVuZGFycycsICdoYW5kbGVUcmFjZURlZmF1bHRzJyk7XG4gICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgWyd4JywgJ3knXSwgbGF5b3V0KTtcblxuICAgIC8vIGlmIG1hcmtlci5jb2xvciBpcyBhbiBhcnJheSwgd2UgY2FuIHVzZSBpdCBpbiBhZ2dyZWdhdGlvbiBpbnN0ZWFkIG9mIHpcbiAgICB2YXIgaGFzQWdncmVnYXRpb25EYXRhID0gY29lcmNlKCd6JykgfHwgY29lcmNlKCdtYXJrZXIuY29sb3InKTtcblxuICAgIGlmKGhhc0FnZ3JlZ2F0aW9uRGF0YSkgY29lcmNlKCdoaXN0ZnVuYycpO1xuICAgIGNvZXJjZSgnaGlzdG5vcm0nKTtcblxuICAgIC8vIE5vdGU6IGJpbiBkZWZhdWx0cyBhcmUgbm93IGhhbmRsZWQgaW4gSGlzdG9ncmFtMkQuY3Jvc3NUcmFjZURlZmF1bHRzXG4gICAgLy8gYXV0b2Jpbih4fHkpIGFyZSBvbmx5IGluY2x1ZGVkIGhlcmUgdG8gYXBwZWFzZSBQbG90bHkudmFsaWRhdGVcbiAgICBjb2VyY2UoJ2F1dG9iaW54Jyk7XG4gICAgY29lcmNlKCdhdXRvYmlueScpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=