(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_index-gl2d_js-node_modules_plotly_js_src_lib_gl_format_col-927ed6"],{

/***/ "./node_modules/plotly.js/lib/heatmapgl.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/heatmapgl.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/heatmapgl */ "./node_modules/plotly.js/src/traces/heatmapgl/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/index-gl2d.js":
/*!**************************************************!*\
  !*** ./node_modules/plotly.js/lib/index-gl2d.js ***!
  \**************************************************/
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
    __webpack_require__(/*! ./scattergl */ "./node_modules/plotly.js/lib/scattergl.js"),
    __webpack_require__(/*! ./splom */ "./node_modules/plotly.js/lib/splom.js"),
    __webpack_require__(/*! ./pointcloud */ "./node_modules/plotly.js/lib/pointcloud.js"),
    __webpack_require__(/*! ./heatmapgl */ "./node_modules/plotly.js/lib/heatmapgl.js"),
    __webpack_require__(/*! ./contourgl */ "./node_modules/plotly.js/lib/contourgl.js"),
    __webpack_require__(/*! ./parcoords */ "./node_modules/plotly.js/lib/parcoords.js")
]);

module.exports = Plotly;


/***/ }),

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

/***/ "./node_modules/plotly.js/src/traces/heatmap/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/defaults.js ***!
  \***************************************************************/
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

var handleXYZDefaults = __webpack_require__(/*! ./xyz_defaults */ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ./style_defaults */ "./node_modules/plotly.js/src/traces/heatmap/style_defaults.js");
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/heatmap/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var validData = handleXYZDefaults(traceIn, traceOut, coerce, layout);
    if(!validData) {
        traceOut.visible = false;
        return;
    }

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    handleStyleDefaults(traceIn, traceOut, coerce, layout);

    coerce('hoverongaps');
    coerce('connectgaps', Lib.isArray1D(traceOut.z) && (traceOut.zsmooth !== false));

    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'z'});
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

/***/ "./node_modules/plotly.js/src/traces/heatmapgl/attributes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmapgl/attributes.js ***!
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



var heatmapAttrs = __webpack_require__(/*! ../heatmap/attributes */ "./node_modules/plotly.js/src/traces/heatmap/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var commonList = [
    'z',
    'x', 'x0', 'dx',
    'y', 'y0', 'dy',
    'text', 'transpose',
    'xtype', 'ytype'
];

var attrs = {};

for(var i = 0; i < commonList.length; i++) {
    var k = commonList[i];
    attrs[k] = heatmapAttrs[k];
}

extendFlat(
    attrs,
    colorScaleAttrs('', {cLetter: 'z', autoColorDflt: false})
);

module.exports = overrideAll(attrs, 'calc', 'nested');


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmapgl/convert.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmapgl/convert.js ***!
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




var createHeatmap2D = __webpack_require__(/*! gl-heatmap2d */ "./node_modules/gl-heatmap2d/heatmap.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var str2RGBArray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");


function Heatmap(scene, uid) {
    this.scene = scene;
    this.uid = uid;
    this.type = 'heatmapgl';

    this.name = '';
    this.hoverinfo = 'all';

    this.xData = [];
    this.yData = [];
    this.zData = [];
    this.textLabels = [];

    this.idToIndex = [];
    this.bounds = [0, 0, 0, 0];

    this.options = {
        z: [],
        x: [],
        y: [],
        shape: [0, 0],
        colorLevels: [0],
        colorValues: [0, 0, 0, 1]
    };

    this.heatmap = createHeatmap2D(scene.glplot, this.options);
    this.heatmap._trace = this;
}

var proto = Heatmap.prototype;

proto.handlePick = function(pickResult) {
    var options = this.options;
    var shape = options.shape;
    var index = pickResult.pointId;
    var xIndex = index % shape[0];
    var yIndex = Math.floor(index / shape[0]);
    var zIndex = index;

    return {
        trace: this,
        dataCoord: pickResult.dataCoord,
        traceCoord: [
            options.x[xIndex],
            options.y[yIndex],
            options.z[zIndex]
        ],
        textLabel: this.textLabels[index],
        name: this.name,
        pointIndex: [yIndex, xIndex],
        hoverinfo: this.hoverinfo
    };
};

proto.update = function(fullTrace, calcTrace) {
    var calcPt = calcTrace[0];

    this.index = fullTrace.index;
    this.name = fullTrace.name;
    this.hoverinfo = fullTrace.hoverinfo;

    // convert z from 2D -> 1D
    var z = calcPt.z;
    this.options.z = [].concat.apply([], z);

    var rowLen = z[0].length;
    var colLen = z.length;
    this.options.shape = [rowLen, colLen];

    this.options.x = calcPt.x;
    this.options.y = calcPt.y;

    var colorOptions = convertColorscale(fullTrace);
    this.options.colorLevels = colorOptions.colorLevels;
    this.options.colorValues = colorOptions.colorValues;

    // convert text from 2D -> 1D
    this.textLabels = [].concat.apply([], fullTrace.text);

    this.heatmap.update(this.options);

    var xa = this.scene.xaxis;
    var ya = this.scene.yaxis;
    fullTrace._extremes[xa._id] = Axes.findExtremes(xa, calcPt.x);
    fullTrace._extremes[ya._id] = Axes.findExtremes(ya, calcPt.y);
};

proto.dispose = function() {
    this.heatmap.dispose();
};

function convertColorscale(fullTrace) {
    var scl = fullTrace.colorscale;
    var zmin = fullTrace.zmin;
    var zmax = fullTrace.zmax;

    var N = scl.length;
    var domain = new Array(N);
    var range = new Array(4 * N);

    for(var i = 0; i < N; i++) {
        var si = scl[i];
        var color = str2RGBArray(si[1]);

        domain[i] = zmin + si[0] * (zmax - zmin);

        for(var j = 0; j < 4; j++) {
            range[(4 * i) + j] = color[j];
        }
    }

    return {
        colorLevels: domain,
        colorValues: range
    };
}

function createHeatmap(scene, fullTrace, calcTrace) {
    var plot = new Heatmap(scene, fullTrace.uid);
    plot.update(fullTrace, calcTrace);
    return plot;
}

module.exports = createHeatmap;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmapgl/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmapgl/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/heatmapgl/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ../heatmap/defaults */ "./node_modules/plotly.js/src/traces/heatmap/defaults.js"),
    colorbar: __webpack_require__(/*! ../heatmap/colorbar */ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js"),

    calc: __webpack_require__(/*! ../heatmap/calc */ "./node_modules/plotly.js/src/traces/heatmap/calc.js"),
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/heatmapgl/convert.js"),

    moduleType: 'trace',
    name: 'heatmapgl',
    basePlotModule: __webpack_require__(/*! ../../plots/gl2d */ "./node_modules/plotly.js/src/plots/gl2d/index.js"),
    categories: ['gl', 'gl2d', '2dMap'],
    meta: {
        description: [
            'WebGL version of the heatmap trace type.'
        ].join(' ')
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaGVhdG1hcGdsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL2xpYi9pbmRleC1nbDJkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9saWIvZ2xfZm9ybWF0X2NvbG9yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9jb2xvcmJhci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL3N0eWxlX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcGdsL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwZ2wvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXBnbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIveHlfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyM2QvY2FsYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7QUFDN0IsZUFBZSxtQkFBTyxDQUFDLGdFQUFnQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsdUJBQXVCLG1CQUFPLENBQUMsd0dBQStCO0FBQzlELHFCQUFxQixtQkFBTyxDQUFDLGtHQUE0Qjs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3Q0FBd0M7O0FBRXZEO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydGQyM2Y5MDY4NWI0M2I4MTZhOTZmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvaGVhdG1hcGdsJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQbG90bHkgPSByZXF1aXJlKCcuL2NvcmUnKTtcblxuUGxvdGx5LnJlZ2lzdGVyKFtcbiAgICByZXF1aXJlKCcuL3NjYXR0ZXJnbCcpLFxuICAgIHJlcXVpcmUoJy4vc3Bsb20nKSxcbiAgICByZXF1aXJlKCcuL3BvaW50Y2xvdWQnKSxcbiAgICByZXF1aXJlKCcuL2hlYXRtYXBnbCcpLFxuICAgIHJlcXVpcmUoJy4vY29udG91cmdsJyksXG4gICAgcmVxdWlyZSgnLi9wYXJjb29yZHMnKVxuXSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxvdGx5O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcbnZhciB0aW55Y29sb3IgPSByZXF1aXJlKCd0aW55Y29sb3IyJyk7XG52YXIgcmdiYSA9IHJlcXVpcmUoJ2NvbG9yLW5vcm1hbGl6ZScpO1xuXG52YXIgQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpO1xudmFyIGNvbG9yRGZsdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29sb3IvYXR0cmlidXRlcycpLmRlZmF1bHRMaW5lO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2FycmF5JykuaXNBcnJheU9yVHlwZWRBcnJheTtcblxudmFyIGNvbG9yRGZsdFJnYmEgPSByZ2JhKGNvbG9yRGZsdCk7XG52YXIgb3BhY2l0eURmbHQgPSAxO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVDb2xvcihjb2xvckluLCBvcGFjaXR5SW4pIHtcbiAgICB2YXIgY29sb3JPdXQgPSBjb2xvckluO1xuICAgIGNvbG9yT3V0WzNdICo9IG9wYWNpdHlJbjtcbiAgICByZXR1cm4gY29sb3JPdXQ7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29sb3IoY29sb3JJbikge1xuICAgIGlmKGlzTnVtZXJpYyhjb2xvckluKSkgcmV0dXJuIGNvbG9yRGZsdFJnYmE7XG5cbiAgICB2YXIgY29sb3JPdXQgPSByZ2JhKGNvbG9ySW4pO1xuXG4gICAgcmV0dXJuIGNvbG9yT3V0Lmxlbmd0aCA/IGNvbG9yT3V0IDogY29sb3JEZmx0UmdiYTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVPcGFjaXR5KG9wYWNpdHlJbikge1xuICAgIHJldHVybiBpc051bWVyaWMob3BhY2l0eUluKSA/IG9wYWNpdHlJbiA6IG9wYWNpdHlEZmx0O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRDb2xvcihjb250YWluZXJJbiwgb3BhY2l0eUluLCBsZW4pIHtcbiAgICB2YXIgY29sb3JJbiA9IGNvbnRhaW5lckluLmNvbG9yO1xuICAgIHZhciBpc0FycmF5Q29sb3JJbiA9IGlzQXJyYXlPclR5cGVkQXJyYXkoY29sb3JJbik7XG4gICAgdmFyIGlzQXJyYXlPcGFjaXR5SW4gPSBpc0FycmF5T3JUeXBlZEFycmF5KG9wYWNpdHlJbik7XG4gICAgdmFyIGNPcHRzID0gQ29sb3JzY2FsZS5leHRyYWN0T3B0cyhjb250YWluZXJJbik7XG4gICAgdmFyIGNvbG9yT3V0ID0gW107XG5cbiAgICB2YXIgc2NsRnVuYywgZ2V0Q29sb3IsIGdldE9wYWNpdHksIGNvbG9yaSwgb3BhY2l0eWk7XG5cbiAgICBpZihjT3B0cy5jb2xvcnNjYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2NsRnVuYyA9IENvbG9yc2NhbGUubWFrZUNvbG9yU2NhbGVGdW5jRnJvbVRyYWNlKGNvbnRhaW5lckluKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzY2xGdW5jID0gdmFsaWRhdGVDb2xvcjtcbiAgICB9XG5cbiAgICBpZihpc0FycmF5Q29sb3JJbikge1xuICAgICAgICBnZXRDb2xvciA9IGZ1bmN0aW9uKGMsIGkpIHtcbiAgICAgICAgICAgIC8vIEZJWE1FOiB0aGVyZSBpcyBkb3VibGUgd29yaywgY29uc2lkZXJpbmcgdGhhdCBzY2xGdW5jIGRvZXMgdGhlIG9wcG9zaXRlXG4gICAgICAgICAgICByZXR1cm4gY1tpXSA9PT0gdW5kZWZpbmVkID8gY29sb3JEZmx0UmdiYSA6IHJnYmEoc2NsRnVuYyhjW2ldKSk7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGdldENvbG9yID0gdmFsaWRhdGVDb2xvcjtcblxuICAgIGlmKGlzQXJyYXlPcGFjaXR5SW4pIHtcbiAgICAgICAgZ2V0T3BhY2l0eSA9IGZ1bmN0aW9uKG8sIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBvW2ldID09PSB1bmRlZmluZWQgPyBvcGFjaXR5RGZsdCA6IHZhbGlkYXRlT3BhY2l0eShvW2ldKTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgZ2V0T3BhY2l0eSA9IHZhbGlkYXRlT3BhY2l0eTtcblxuICAgIGlmKGlzQXJyYXlDb2xvckluIHx8IGlzQXJyYXlPcGFjaXR5SW4pIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb2xvcmkgPSBnZXRDb2xvcihjb2xvckluLCBpKTtcbiAgICAgICAgICAgIG9wYWNpdHlpID0gZ2V0T3BhY2l0eShvcGFjaXR5SW4sIGkpO1xuICAgICAgICAgICAgY29sb3JPdXRbaV0gPSBjYWxjdWxhdGVDb2xvcihjb2xvcmksIG9wYWNpdHlpKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBjb2xvck91dCA9IGNhbGN1bGF0ZUNvbG9yKHJnYmEoY29sb3JJbiksIG9wYWNpdHlJbik7XG5cbiAgICByZXR1cm4gY29sb3JPdXQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29sb3JTY2FsZShjb250LCBhbHBoYSkge1xuICAgIGlmKGFscGhhID09PSB1bmRlZmluZWQpIGFscGhhID0gMTtcblxuICAgIHZhciBjT3B0cyA9IENvbG9yc2NhbGUuZXh0cmFjdE9wdHMoY29udCk7XG5cbiAgICB2YXIgY29sb3JzY2FsZSA9IGNPcHRzLnJldmVyc2VzY2FsZSA/XG4gICAgICAgIENvbG9yc2NhbGUuZmxpcFNjYWxlKGNPcHRzLmNvbG9yc2NhbGUpIDpcbiAgICAgICAgY09wdHMuY29sb3JzY2FsZTtcblxuICAgIHJldHVybiBjb2xvcnNjYWxlLm1hcChmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGVsZW1bMF07XG4gICAgICAgIHZhciBjb2xvciA9IHRpbnljb2xvcihlbGVtWzFdKTtcbiAgICAgICAgdmFyIHJnYiA9IGNvbG9yLnRvUmdiKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICByZ2I6IFtyZ2IuciwgcmdiLmcsIHJnYi5iLCBhbHBoYV1cbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0Q29sb3I6IGZvcm1hdENvbG9yLFxuICAgIHBhcnNlQ29sb3JTY2FsZTogcGFyc2VDb2xvclNjYWxlXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtaW46ICd6bWluJyxcbiAgICBtYXg6ICd6bWF4J1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBoYW5kbGVYWVpEZWZhdWx0cyA9IHJlcXVpcmUoJy4veHl6X2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlU3R5bGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4vc3R5bGVfZGVmYXVsdHMnKTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIHZhbGlkRGF0YSA9IGhhbmRsZVhZWkRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgaWYoIXZhbGlkRGF0YSkge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3RleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuXG4gICAgaGFuZGxlU3R5bGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuXG4gICAgY29lcmNlKCdob3Zlcm9uZ2FwcycpO1xuICAgIGNvZXJjZSgnY29ubmVjdGdhcHMnLCBMaWIuaXNBcnJheTFEKHRyYWNlT3V0LnopICYmICh0cmFjZU91dC56c21vb3RoICE9PSBmYWxzZSkpO1xuXG4gICAgY29sb3JzY2FsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge3ByZWZpeDogJycsIGNMZXR0ZXI6ICd6J30pO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVN0eWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSkge1xuICAgIHZhciB6c21vb3RoID0gY29lcmNlKCd6c21vb3RoJyk7XG4gICAgaWYoenNtb290aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gZW5zdXJlIHRoYXQgeGdhcCBhbmQgeWdhcCBhcmUgY29lcmNlZCBvbmx5IHdoZW4genNtb290aCBhbGxvd3MgdGhlbSB0byBoYXZlIGFuIGVmZmVjdC5cbiAgICAgICAgY29lcmNlKCd4Z2FwJyk7XG4gICAgICAgIGNvZXJjZSgneWdhcCcpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnemhvdmVyZm9ybWF0Jyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGVhdG1hcEF0dHJzID0gcmVxdWlyZSgnLi4vaGVhdG1hcC9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBvdmVycmlkZUFsbCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL2VkaXRfdHlwZXMnKS5vdmVycmlkZUFsbDtcblxudmFyIGNvbW1vbkxpc3QgPSBbXG4gICAgJ3onLFxuICAgICd4JywgJ3gwJywgJ2R4JyxcbiAgICAneScsICd5MCcsICdkeScsXG4gICAgJ3RleHQnLCAndHJhbnNwb3NlJyxcbiAgICAneHR5cGUnLCAneXR5cGUnXG5dO1xuXG52YXIgYXR0cnMgPSB7fTtcblxuZm9yKHZhciBpID0gMDsgaSA8IGNvbW1vbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgayA9IGNvbW1vbkxpc3RbaV07XG4gICAgYXR0cnNba10gPSBoZWF0bWFwQXR0cnNba107XG59XG5cbmV4dGVuZEZsYXQoXG4gICAgYXR0cnMsXG4gICAgY29sb3JTY2FsZUF0dHJzKCcnLCB7Y0xldHRlcjogJ3onLCBhdXRvQ29sb3JEZmx0OiBmYWxzZX0pXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJyaWRlQWxsKGF0dHJzLCAnY2FsYycsICduZXN0ZWQnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlSGVhdG1hcDJEID0gcmVxdWlyZSgnZ2wtaGVhdG1hcDJkJyk7XG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG52YXIgc3RyMlJHQkFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliL3N0cjJyZ2JhcnJheScpO1xuXG5cbmZ1bmN0aW9uIEhlYXRtYXAoc2NlbmUsIHVpZCkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnVpZCA9IHVpZDtcbiAgICB0aGlzLnR5cGUgPSAnaGVhdG1hcGdsJztcblxuICAgIHRoaXMubmFtZSA9ICcnO1xuICAgIHRoaXMuaG92ZXJpbmZvID0gJ2FsbCc7XG5cbiAgICB0aGlzLnhEYXRhID0gW107XG4gICAgdGhpcy55RGF0YSA9IFtdO1xuICAgIHRoaXMuekRhdGEgPSBbXTtcbiAgICB0aGlzLnRleHRMYWJlbHMgPSBbXTtcblxuICAgIHRoaXMuaWRUb0luZGV4ID0gW107XG4gICAgdGhpcy5ib3VuZHMgPSBbMCwgMCwgMCwgMF07XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgIHo6IFtdLFxuICAgICAgICB4OiBbXSxcbiAgICAgICAgeTogW10sXG4gICAgICAgIHNoYXBlOiBbMCwgMF0sXG4gICAgICAgIGNvbG9yTGV2ZWxzOiBbMF0sXG4gICAgICAgIGNvbG9yVmFsdWVzOiBbMCwgMCwgMCwgMV1cbiAgICB9O1xuXG4gICAgdGhpcy5oZWF0bWFwID0gY3JlYXRlSGVhdG1hcDJEKHNjZW5lLmdscGxvdCwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLmhlYXRtYXAuX3RyYWNlID0gdGhpcztcbn1cblxudmFyIHByb3RvID0gSGVhdG1hcC5wcm90b3R5cGU7XG5cbnByb3RvLmhhbmRsZVBpY2sgPSBmdW5jdGlvbihwaWNrUmVzdWx0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHNoYXBlID0gb3B0aW9ucy5zaGFwZTtcbiAgICB2YXIgaW5kZXggPSBwaWNrUmVzdWx0LnBvaW50SWQ7XG4gICAgdmFyIHhJbmRleCA9IGluZGV4ICUgc2hhcGVbMF07XG4gICAgdmFyIHlJbmRleCA9IE1hdGguZmxvb3IoaW5kZXggLyBzaGFwZVswXSk7XG4gICAgdmFyIHpJbmRleCA9IGluZGV4O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHJhY2U6IHRoaXMsXG4gICAgICAgIGRhdGFDb29yZDogcGlja1Jlc3VsdC5kYXRhQ29vcmQsXG4gICAgICAgIHRyYWNlQ29vcmQ6IFtcbiAgICAgICAgICAgIG9wdGlvbnMueFt4SW5kZXhdLFxuICAgICAgICAgICAgb3B0aW9ucy55W3lJbmRleF0sXG4gICAgICAgICAgICBvcHRpb25zLnpbekluZGV4XVxuICAgICAgICBdLFxuICAgICAgICB0ZXh0TGFiZWw6IHRoaXMudGV4dExhYmVsc1tpbmRleF0sXG4gICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgcG9pbnRJbmRleDogW3lJbmRleCwgeEluZGV4XSxcbiAgICAgICAgaG92ZXJpbmZvOiB0aGlzLmhvdmVyaW5mb1xuICAgIH07XG59O1xuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihmdWxsVHJhY2UsIGNhbGNUcmFjZSkge1xuICAgIHZhciBjYWxjUHQgPSBjYWxjVHJhY2VbMF07XG5cbiAgICB0aGlzLmluZGV4ID0gZnVsbFRyYWNlLmluZGV4O1xuICAgIHRoaXMubmFtZSA9IGZ1bGxUcmFjZS5uYW1lO1xuICAgIHRoaXMuaG92ZXJpbmZvID0gZnVsbFRyYWNlLmhvdmVyaW5mbztcblxuICAgIC8vIGNvbnZlcnQgeiBmcm9tIDJEIC0+IDFEXG4gICAgdmFyIHogPSBjYWxjUHQuejtcbiAgICB0aGlzLm9wdGlvbnMueiA9IFtdLmNvbmNhdC5hcHBseShbXSwgeik7XG5cbiAgICB2YXIgcm93TGVuID0gelswXS5sZW5ndGg7XG4gICAgdmFyIGNvbExlbiA9IHoubGVuZ3RoO1xuICAgIHRoaXMub3B0aW9ucy5zaGFwZSA9IFtyb3dMZW4sIGNvbExlbl07XG5cbiAgICB0aGlzLm9wdGlvbnMueCA9IGNhbGNQdC54O1xuICAgIHRoaXMub3B0aW9ucy55ID0gY2FsY1B0Lnk7XG5cbiAgICB2YXIgY29sb3JPcHRpb25zID0gY29udmVydENvbG9yc2NhbGUoZnVsbFRyYWNlKTtcbiAgICB0aGlzLm9wdGlvbnMuY29sb3JMZXZlbHMgPSBjb2xvck9wdGlvbnMuY29sb3JMZXZlbHM7XG4gICAgdGhpcy5vcHRpb25zLmNvbG9yVmFsdWVzID0gY29sb3JPcHRpb25zLmNvbG9yVmFsdWVzO1xuXG4gICAgLy8gY29udmVydCB0ZXh0IGZyb20gMkQgLT4gMURcbiAgICB0aGlzLnRleHRMYWJlbHMgPSBbXS5jb25jYXQuYXBwbHkoW10sIGZ1bGxUcmFjZS50ZXh0KTtcblxuICAgIHRoaXMuaGVhdG1hcC51cGRhdGUodGhpcy5vcHRpb25zKTtcblxuICAgIHZhciB4YSA9IHRoaXMuc2NlbmUueGF4aXM7XG4gICAgdmFyIHlhID0gdGhpcy5zY2VuZS55YXhpcztcbiAgICBmdWxsVHJhY2UuX2V4dHJlbWVzW3hhLl9pZF0gPSBBeGVzLmZpbmRFeHRyZW1lcyh4YSwgY2FsY1B0LngpO1xuICAgIGZ1bGxUcmFjZS5fZXh0cmVtZXNbeWEuX2lkXSA9IEF4ZXMuZmluZEV4dHJlbWVzKHlhLCBjYWxjUHQueSk7XG59O1xuXG5wcm90by5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5oZWF0bWFwLmRpc3Bvc2UoKTtcbn07XG5cbmZ1bmN0aW9uIGNvbnZlcnRDb2xvcnNjYWxlKGZ1bGxUcmFjZSkge1xuICAgIHZhciBzY2wgPSBmdWxsVHJhY2UuY29sb3JzY2FsZTtcbiAgICB2YXIgem1pbiA9IGZ1bGxUcmFjZS56bWluO1xuICAgIHZhciB6bWF4ID0gZnVsbFRyYWNlLnptYXg7XG5cbiAgICB2YXIgTiA9IHNjbC5sZW5ndGg7XG4gICAgdmFyIGRvbWFpbiA9IG5ldyBBcnJheShOKTtcbiAgICB2YXIgcmFuZ2UgPSBuZXcgQXJyYXkoNCAqIE4pO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgICB2YXIgc2kgPSBzY2xbaV07XG4gICAgICAgIHZhciBjb2xvciA9IHN0cjJSR0JBcnJheShzaVsxXSk7XG5cbiAgICAgICAgZG9tYWluW2ldID0gem1pbiArIHNpWzBdICogKHptYXggLSB6bWluKTtcblxuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICByYW5nZVsoNCAqIGkpICsgal0gPSBjb2xvcltqXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbG9yTGV2ZWxzOiBkb21haW4sXG4gICAgICAgIGNvbG9yVmFsdWVzOiByYW5nZVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYXRtYXAoc2NlbmUsIGZ1bGxUcmFjZSwgY2FsY1RyYWNlKSB7XG4gICAgdmFyIHBsb3QgPSBuZXcgSGVhdG1hcChzY2VuZSwgZnVsbFRyYWNlLnVpZCk7XG4gICAgcGxvdC51cGRhdGUoZnVsbFRyYWNlLCBjYWxjVHJhY2UpO1xuICAgIHJldHVybiBwbG90O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUhlYXRtYXA7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuLi9oZWF0bWFwL2RlZmF1bHRzJyksXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL2hlYXRtYXAvY29sb3JiYXInKSxcblxuICAgIGNhbGM6IHJlcXVpcmUoJy4uL2hlYXRtYXAvY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vY29udmVydCcpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnaGVhdG1hcGdsJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvZ2wyZCcpLFxuICAgIGNhdGVnb3JpZXM6IFsnZ2wnLCAnZ2wyZCcsICcyZE1hcCddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdXZWJHTCB2ZXJzaW9uIG9mIHRoZSBoZWF0bWFwIHRyYWNlIHR5cGUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlWFlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpIHtcbiAgICB2YXIgeCA9IGNvZXJjZSgneCcpO1xuICAgIHZhciB5ID0gY29lcmNlKCd5Jyk7XG4gICAgdmFyIGxlbjtcblxuICAgIHZhciBoYW5kbGVDYWxlbmRhckRlZmF1bHRzID0gUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdjYWxlbmRhcnMnLCAnaGFuZGxlVHJhY2VEZWZhdWx0cycpO1xuICAgIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIFsneCcsICd5J10sIGxheW91dCk7XG5cbiAgICBpZih4KSB7XG4gICAgICAgIHZhciB4bGVuID0gTGliLm1pblJvd0xlbmd0aCh4KTtcbiAgICAgICAgaWYoeSkge1xuICAgICAgICAgICAgbGVuID0gTWF0aC5taW4oeGxlbiwgTGliLm1pblJvd0xlbmd0aCh5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZW4gPSB4bGVuO1xuICAgICAgICAgICAgY29lcmNlKCd5MCcpO1xuICAgICAgICAgICAgY29lcmNlKCdkeScpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIXkpIHJldHVybiAwO1xuXG4gICAgICAgIGxlbiA9IExpYi5taW5Sb3dMZW5ndGgoeSk7XG4gICAgICAgIGNvZXJjZSgneDAnKTtcbiAgICAgICAgY29lcmNlKCdkeCcpO1xuICAgIH1cblxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICByZXR1cm4gbGVuO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFycmF5c1RvQ2FsY2RhdGEgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2FycmF5c190b19jYWxjZGF0YScpO1xudmFyIGNhbGNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMnKTtcblxuLyoqXG4gKiBUaGlzIGlzIGEga2x1ZGdlIHRvIHB1dCB0aGUgYXJyYXkgYXR0cmlidXRlcyBpbnRvXG4gKiBjYWxjZGF0YSB0aGUgd2F5IFNjYXR0ZXIucGxvdCBkb2VzLCBzbyB0aGF0IGxlZ2VuZHMgYW5kXG4gKiBwb3BvdmVycyBrbm93IHdoYXQgdG8gZG8gd2l0aCB0aGVtLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIGNkID0gW3t4OiBmYWxzZSwgeTogZmFsc2UsIHRyYWNlOiB0cmFjZSwgdDoge319XTtcblxuICAgIGFycmF5c1RvQ2FsY2RhdGEoY2QsIHRyYWNlKTtcbiAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UpO1xuXG4gICAgcmV0dXJuIGNkO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=