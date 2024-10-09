(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_heatmapgl_js"],{

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

/***/ "?a259":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaGVhdG1hcGdsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9jb2xvcmJhci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL3N0eWxlX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcGdsL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwZ2wvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXBnbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlL2lnbm9yZWR8L2hvbWUvYWxleC9naXQvREl3ZWJzaXRlLXJlZGVzaWduL25vZGVfbW9kdWxlcy9iaWctcmF0L25vZGVfbW9kdWxlcy9ibi5qcy9saWJ8YnVmZmVyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLDZIQUFtRDs7Ozs7Ozs7Ozs7O0FDVm5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3Qix3QkFBd0IsbUJBQU8sQ0FBQyxtRkFBZ0I7QUFDaEQsMEJBQTBCLG1CQUFPLENBQUMsdUZBQWtCO0FBQ3BELHlCQUF5QixtQkFBTyxDQUFDLDRHQUFzQztBQUN2RSxpQkFBaUIsbUJBQU8sQ0FBQywrRUFBYzs7O0FBR3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsMkRBQTJELHlCQUF5QjtBQUNwRjs7Ozs7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsd0ZBQXVCO0FBQ2xELHNCQUFzQixtQkFBTyxDQUFDLGdIQUF3Qzs7QUFFdEUsaUJBQWlCLG9HQUFzQztBQUN2RCxrQkFBa0IsdUhBQWdEOztBQUVsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxjQUFjLHVCQUF1QjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixtQ0FBbUM7QUFDNUQ7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsc0JBQXNCLG1CQUFPLENBQUMsNERBQWM7QUFDNUMsV0FBVyxtQkFBTyxDQUFDLHdGQUE0QjtBQUMvQyxtQkFBbUIsbUJBQU8sQ0FBQyxnRkFBd0I7OztBQUduRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUEsc0JBQXNCLE9BQU87QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMsaUZBQWM7QUFDdEMsb0JBQW9CLG1CQUFPLENBQUMsb0ZBQXFCO0FBQ2pELGNBQWMsbUJBQU8sQ0FBQyxvRkFBcUI7O0FBRTNDLFVBQVUsbUJBQU8sQ0FBQyw0RUFBaUI7QUFDbkMsVUFBVSxtQkFBTyxDQUFDLDJFQUFXOztBQUU3QjtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMEVBQWtCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzNCQSxlIiwiZmlsZSI6ImNoYXJ0ZjM4ZjIxNmYyMGM5YjUwOTk4ZjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9oZWF0bWFwZ2wnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWluOiAnem1pbicsXG4gICAgbWF4OiAnem1heCdcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgaGFuZGxlWFlaRGVmYXVsdHMgPSByZXF1aXJlKCcuL3h5el9kZWZhdWx0cycpO1xudmFyIGhhbmRsZVN0eWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuL3N0eWxlX2RlZmF1bHRzJyk7XG52YXIgY29sb3JzY2FsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciB2YWxpZERhdGEgPSBoYW5kbGVYWVpEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuICAgIGlmKCF2YWxpZERhdGEpIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIGhhbmRsZVN0eWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0KTtcblxuICAgIGNvZXJjZSgnaG92ZXJvbmdhcHMnKTtcbiAgICBjb2VyY2UoJ2Nvbm5lY3RnYXBzJywgTGliLmlzQXJyYXkxRCh0cmFjZU91dC56KSAmJiAodHJhY2VPdXQuenNtb290aCAhPT0gZmFsc2UpKTtcblxuICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICcnLCBjTGV0dGVyOiAneid9KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVTdHlsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UpIHtcbiAgICB2YXIgenNtb290aCA9IGNvZXJjZSgnenNtb290aCcpO1xuICAgIGlmKHpzbW9vdGggPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGVuc3VyZSB0aGF0IHhnYXAgYW5kIHlnYXAgYXJlIGNvZXJjZWQgb25seSB3aGVuIHpzbW9vdGggYWxsb3dzIHRoZW0gdG8gaGF2ZSBhbiBlZmZlY3QuXG4gICAgICAgIGNvZXJjZSgneGdhcCcpO1xuICAgICAgICBjb2VyY2UoJ3lnYXAnKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3pob3ZlcmZvcm1hdCcpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhlYXRtYXBBdHRycyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvYXR0cmlidXRlcycpO1xudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG52YXIgb3ZlcnJpZGVBbGwgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9lZGl0X3R5cGVzJykub3ZlcnJpZGVBbGw7XG5cbnZhciBjb21tb25MaXN0ID0gW1xuICAgICd6JyxcbiAgICAneCcsICd4MCcsICdkeCcsXG4gICAgJ3knLCAneTAnLCAnZHknLFxuICAgICd0ZXh0JywgJ3RyYW5zcG9zZScsXG4gICAgJ3h0eXBlJywgJ3l0eXBlJ1xuXTtcblxudmFyIGF0dHJzID0ge307XG5cbmZvcih2YXIgaSA9IDA7IGkgPCBjb21tb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGsgPSBjb21tb25MaXN0W2ldO1xuICAgIGF0dHJzW2tdID0gaGVhdG1hcEF0dHJzW2tdO1xufVxuXG5leHRlbmRGbGF0KFxuICAgIGF0dHJzLFxuICAgIGNvbG9yU2NhbGVBdHRycygnJywge2NMZXR0ZXI6ICd6JywgYXV0b0NvbG9yRGZsdDogZmFsc2V9KVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBvdmVycmlkZUFsbChhdHRycywgJ2NhbGMnLCAnbmVzdGVkJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUhlYXRtYXAyRCA9IHJlcXVpcmUoJ2dsLWhlYXRtYXAyZCcpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIHN0cjJSR0JBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zdHIycmdiYXJyYXknKTtcblxuXG5mdW5jdGlvbiBIZWF0bWFwKHNjZW5lLCB1aWQpIHtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy51aWQgPSB1aWQ7XG4gICAgdGhpcy50eXBlID0gJ2hlYXRtYXBnbCc7XG5cbiAgICB0aGlzLm5hbWUgPSAnJztcbiAgICB0aGlzLmhvdmVyaW5mbyA9ICdhbGwnO1xuXG4gICAgdGhpcy54RGF0YSA9IFtdO1xuICAgIHRoaXMueURhdGEgPSBbXTtcbiAgICB0aGlzLnpEYXRhID0gW107XG4gICAgdGhpcy50ZXh0TGFiZWxzID0gW107XG5cbiAgICB0aGlzLmlkVG9JbmRleCA9IFtdO1xuICAgIHRoaXMuYm91bmRzID0gWzAsIDAsIDAsIDBdO1xuXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICB6OiBbXSxcbiAgICAgICAgeDogW10sXG4gICAgICAgIHk6IFtdLFxuICAgICAgICBzaGFwZTogWzAsIDBdLFxuICAgICAgICBjb2xvckxldmVsczogWzBdLFxuICAgICAgICBjb2xvclZhbHVlczogWzAsIDAsIDAsIDFdXG4gICAgfTtcblxuICAgIHRoaXMuaGVhdG1hcCA9IGNyZWF0ZUhlYXRtYXAyRChzY2VuZS5nbHBsb3QsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5oZWF0bWFwLl90cmFjZSA9IHRoaXM7XG59XG5cbnZhciBwcm90byA9IEhlYXRtYXAucHJvdG90eXBlO1xuXG5wcm90by5oYW5kbGVQaWNrID0gZnVuY3Rpb24ocGlja1Jlc3VsdCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBzaGFwZSA9IG9wdGlvbnMuc2hhcGU7XG4gICAgdmFyIGluZGV4ID0gcGlja1Jlc3VsdC5wb2ludElkO1xuICAgIHZhciB4SW5kZXggPSBpbmRleCAlIHNoYXBlWzBdO1xuICAgIHZhciB5SW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gc2hhcGVbMF0pO1xuICAgIHZhciB6SW5kZXggPSBpbmRleDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRyYWNlOiB0aGlzLFxuICAgICAgICBkYXRhQ29vcmQ6IHBpY2tSZXN1bHQuZGF0YUNvb3JkLFxuICAgICAgICB0cmFjZUNvb3JkOiBbXG4gICAgICAgICAgICBvcHRpb25zLnhbeEluZGV4XSxcbiAgICAgICAgICAgIG9wdGlvbnMueVt5SW5kZXhdLFxuICAgICAgICAgICAgb3B0aW9ucy56W3pJbmRleF1cbiAgICAgICAgXSxcbiAgICAgICAgdGV4dExhYmVsOiB0aGlzLnRleHRMYWJlbHNbaW5kZXhdLFxuICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgIHBvaW50SW5kZXg6IFt5SW5kZXgsIHhJbmRleF0sXG4gICAgICAgIGhvdmVyaW5mbzogdGhpcy5ob3ZlcmluZm9cbiAgICB9O1xufTtcblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oZnVsbFRyYWNlLCBjYWxjVHJhY2UpIHtcbiAgICB2YXIgY2FsY1B0ID0gY2FsY1RyYWNlWzBdO1xuXG4gICAgdGhpcy5pbmRleCA9IGZ1bGxUcmFjZS5pbmRleDtcbiAgICB0aGlzLm5hbWUgPSBmdWxsVHJhY2UubmFtZTtcbiAgICB0aGlzLmhvdmVyaW5mbyA9IGZ1bGxUcmFjZS5ob3ZlcmluZm87XG5cbiAgICAvLyBjb252ZXJ0IHogZnJvbSAyRCAtPiAxRFxuICAgIHZhciB6ID0gY2FsY1B0Lno7XG4gICAgdGhpcy5vcHRpb25zLnogPSBbXS5jb25jYXQuYXBwbHkoW10sIHopO1xuXG4gICAgdmFyIHJvd0xlbiA9IHpbMF0ubGVuZ3RoO1xuICAgIHZhciBjb2xMZW4gPSB6Lmxlbmd0aDtcbiAgICB0aGlzLm9wdGlvbnMuc2hhcGUgPSBbcm93TGVuLCBjb2xMZW5dO1xuXG4gICAgdGhpcy5vcHRpb25zLnggPSBjYWxjUHQueDtcbiAgICB0aGlzLm9wdGlvbnMueSA9IGNhbGNQdC55O1xuXG4gICAgdmFyIGNvbG9yT3B0aW9ucyA9IGNvbnZlcnRDb2xvcnNjYWxlKGZ1bGxUcmFjZSk7XG4gICAgdGhpcy5vcHRpb25zLmNvbG9yTGV2ZWxzID0gY29sb3JPcHRpb25zLmNvbG9yTGV2ZWxzO1xuICAgIHRoaXMub3B0aW9ucy5jb2xvclZhbHVlcyA9IGNvbG9yT3B0aW9ucy5jb2xvclZhbHVlcztcblxuICAgIC8vIGNvbnZlcnQgdGV4dCBmcm9tIDJEIC0+IDFEXG4gICAgdGhpcy50ZXh0TGFiZWxzID0gW10uY29uY2F0LmFwcGx5KFtdLCBmdWxsVHJhY2UudGV4dCk7XG5cbiAgICB0aGlzLmhlYXRtYXAudXBkYXRlKHRoaXMub3B0aW9ucyk7XG5cbiAgICB2YXIgeGEgPSB0aGlzLnNjZW5lLnhheGlzO1xuICAgIHZhciB5YSA9IHRoaXMuc2NlbmUueWF4aXM7XG4gICAgZnVsbFRyYWNlLl9leHRyZW1lc1t4YS5faWRdID0gQXhlcy5maW5kRXh0cmVtZXMoeGEsIGNhbGNQdC54KTtcbiAgICBmdWxsVHJhY2UuX2V4dHJlbWVzW3lhLl9pZF0gPSBBeGVzLmZpbmRFeHRyZW1lcyh5YSwgY2FsY1B0LnkpO1xufTtcblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaGVhdG1hcC5kaXNwb3NlKCk7XG59O1xuXG5mdW5jdGlvbiBjb252ZXJ0Q29sb3JzY2FsZShmdWxsVHJhY2UpIHtcbiAgICB2YXIgc2NsID0gZnVsbFRyYWNlLmNvbG9yc2NhbGU7XG4gICAgdmFyIHptaW4gPSBmdWxsVHJhY2Uuem1pbjtcbiAgICB2YXIgem1heCA9IGZ1bGxUcmFjZS56bWF4O1xuXG4gICAgdmFyIE4gPSBzY2wubGVuZ3RoO1xuICAgIHZhciBkb21haW4gPSBuZXcgQXJyYXkoTik7XG4gICAgdmFyIHJhbmdlID0gbmV3IEFycmF5KDQgKiBOKTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgICAgdmFyIHNpID0gc2NsW2ldO1xuICAgICAgICB2YXIgY29sb3IgPSBzdHIyUkdCQXJyYXkoc2lbMV0pO1xuXG4gICAgICAgIGRvbWFpbltpXSA9IHptaW4gKyBzaVswXSAqICh6bWF4IC0gem1pbik7XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICAgICAgcmFuZ2VbKDQgKiBpKSArIGpdID0gY29sb3Jbal07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2xvckxldmVsczogZG9tYWluLFxuICAgICAgICBjb2xvclZhbHVlczogcmFuZ2VcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWF0bWFwKHNjZW5lLCBmdWxsVHJhY2UsIGNhbGNUcmFjZSkge1xuICAgIHZhciBwbG90ID0gbmV3IEhlYXRtYXAoc2NlbmUsIGZ1bGxUcmFjZS51aWQpO1xuICAgIHBsb3QudXBkYXRlKGZ1bGxUcmFjZSwgY2FsY1RyYWNlKTtcbiAgICByZXR1cm4gcGxvdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVIZWF0bWFwO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi4vaGVhdG1hcC9kZWZhdWx0cycpLFxuICAgIGNvbG9yYmFyOiByZXF1aXJlKCcuLi9oZWF0bWFwL2NvbG9yYmFyJyksXG5cbiAgICBjYWxjOiByZXF1aXJlKCcuLi9oZWF0bWFwL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL2NvbnZlcnQnKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ2hlYXRtYXBnbCcsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dsMmQnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2dsJywgJ2dsMmQnLCAnMmRNYXAnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnV2ViR0wgdmVyc2lvbiBvZiB0aGUgaGVhdG1hcCB0cmFjZSB0eXBlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==