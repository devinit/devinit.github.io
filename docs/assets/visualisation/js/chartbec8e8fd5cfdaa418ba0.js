(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_cone_js"],{

/***/ "./node_modules/plotly.js/lib/cone.js":
/*!********************************************!*\
  !*** ./node_modules/plotly.js/lib/cone.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/cone */ "./node_modules/plotly.js/src/traces/cone/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/cone/attributes.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/cone/attributes.js ***!
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



var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var mesh3dAttrs = __webpack_require__(/*! ../mesh3d/attributes */ "./node_modules/plotly.js/src/traces/mesh3d/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var attrs = {
    x: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the x coordinates of the vector field',
            'and of the displayed cones.'
        ].join(' ')
    },
    y: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the y coordinates of the vector field',
            'and of the displayed cones.'
        ].join(' ')
    },
    z: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the z coordinates of the vector field',
            'and of the displayed cones.'
        ].join(' ')
    },

    u: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the x components of the vector field.'
    },
    v: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the y components of the vector field.'
    },
    w: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the z components of the vector field.'
    },

    // TODO add way to specify cone positions independently of the vector field
    // provided, similar to MATLAB's coneplot Cx/Cy/Cz meshgrids,
    // see https://www.mathworks.com/help/matlab/ref/coneplot.html
    //
    // Alternatively, if our goal is only to 'fill in gaps' in the vector data,
    // we could try to extend the heatmap 'connectgaps' algorithm to 3D.
    // From AJ: this particular algorithm which amounts to a Poisson equation,
    // both for interpolation and extrapolation - is the right one to use for
    // cones too.  It makes a field with zero divergence, which is a good
    // baseline assumption for vector fields.
    //
    // cones: {
    //     // potential attributes to add:
    //     //
    //     // - meshmode: 'cartesian-product', 'pts', 'grid'
    //     //
    //     // under `meshmode: 'grid'`
    //     // - (x|y|z)grid.start
    //     // - (x|y|z)grid.end
    //     // - (x|y|z)grid.size
    //
    //     x: {
    //         valType: 'data_array',
    //         editType: 'calc',
    //         description: 'Sets the x coordinates of the cones to be displayed.'
    //     },
    //     y: {
    //         valType: 'data_array',
    //         editType: 'calc',
    //         description: 'Sets the y coordinates of the cones to be displayed.'
    //     },
    //     z: {
    //         valType: 'data_array',
    //         editType: 'calc',
    //         description: 'Sets the z coordinates of the cones to be displayed.'
    //     },
    //
    //     editType: 'calc',
    //     description: [
    //         'By setting `cones.x`, `cones.y` and `cones.z` to 1D arrays,',
    //         'plotly creates a mesh using the cartesian product of those 3 arrays.'
    //     ].join(' ')
    // },

    sizemode: {
        valType: 'enumerated',
        values: ['scaled', 'absolute'],
        role: 'info',
        editType: 'calc',
        dflt: 'scaled',
        description: [
            'Determines whether `sizeref` is set as a *scaled* (i.e unitless) scalar',
            '(normalized by the max u/v/w norm in the vector field) or as',
            '*absolute* value (in the same units as the vector field).'
        ].join(' ')
    },
    sizeref: {
        valType: 'number',
        role: 'info',
        editType: 'calc',
        min: 0,
        description: [
            'Adjusts the cone size scaling.',
            'The size of the cones is determined by their u/v/w norm multiplied a factor and `sizeref`.',
            'This factor (computed internally) corresponds to the minimum "time" to travel across',
            'two successive x/y/z positions at the average velocity of those two successive positions.',
            'All cones in a given trace use the same factor.',
            'With `sizemode` set to *scaled*, `sizeref` is unitless, its default value is *0.5*',
            'With `sizemode` set to *absolute*, `sizeref` has the same units as the u/v/w vector field,',
            'its the default value is half the sample\'s maximum vector norm.'
        ].join(' ')
    },

    anchor: {
        valType: 'enumerated',
        role: 'info',
        editType: 'calc',
        values: ['tip', 'tail', 'cm', 'center'],
        dflt: 'cm',
        description: [
            'Sets the cones\' anchor with respect to their x/y/z positions.',
            'Note that *cm* denote the cone\'s center of mass which corresponds to',
            '1/4 from the tail to tip.'
        ].join(' ')
    },

    text: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        editType: 'calc',
        description: [
            'Sets the text elements associated with the cones.',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    },
    hovertext: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        editType: 'calc',
        description: 'Same as `text`.'
    },

    hovertemplate: hovertemplateAttrs({editType: 'calc'}, {keys: ['norm']}),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
};

extendFlat(attrs, colorScaleAttrs('', {
    colorAttr: 'u/v/w norm',
    showScaleDflt: true,
    editTypeOverride: 'calc'
}));

var fromMesh3d = ['opacity', 'lightposition', 'lighting'];

fromMesh3d.forEach(function(k) {
    attrs[k] = mesh3dAttrs[k];
});

attrs.hoverinfo = extendFlat({}, baseAttrs.hoverinfo, {
    editType: 'calc',
    flags: ['x', 'y', 'z', 'u', 'v', 'w', 'norm', 'text', 'name'],
    dflt: 'x+y+z+norm+text+name'
});

attrs.transforms = undefined;

module.exports = attrs;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/cone/calc.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/cone/calc.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");

module.exports = function calc(gd, trace) {
    var u = trace.u;
    var v = trace.v;
    var w = trace.w;
    var len = Math.min(
        trace.x.length, trace.y.length, trace.z.length,
        u.length, v.length, w.length
    );
    var normMax = -Infinity;
    var normMin = Infinity;

    for(var i = 0; i < len; i++) {
        var uu = u[i];
        var vv = v[i];
        var ww = w[i];
        var norm = Math.sqrt(uu * uu + vv * vv + ww * ww);

        normMax = Math.max(normMax, norm);
        normMin = Math.min(normMin, norm);
    }

    trace._len = len;
    trace._normMax = normMax;

    colorscaleCalc(gd, trace, {
        vals: [normMin, normMax],
        containerStr: '',
        cLetter: 'c'
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/cone/convert.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/cone/convert.js ***!
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



var conePlot = __webpack_require__(/*! gl-cone3d */ "./node_modules/gl-cone3d/cone.js");
var createConeMesh = __webpack_require__(/*! gl-cone3d */ "./node_modules/gl-cone3d/cone.js").createConeMesh;

var simpleMap = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").simpleMap;
var parseColorScale = __webpack_require__(/*! ../../lib/gl_format_color */ "./node_modules/plotly.js/src/lib/gl_format_color.js").parseColorScale;
var extractOpts = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").extractOpts;
var zip3 = __webpack_require__(/*! ../../plots/gl3d/zip3 */ "./node_modules/plotly.js/src/plots/gl3d/zip3.js");

function Cone(scene, uid) {
    this.scene = scene;
    this.uid = uid;
    this.mesh = null;
    this.data = null;
}

var proto = Cone.prototype;

proto.handlePick = function(selection) {
    if(selection.object === this.mesh) {
        var selectIndex = selection.index = selection.data.index;
        var xx = this.data.x[selectIndex];
        var yy = this.data.y[selectIndex];
        var zz = this.data.z[selectIndex];
        var uu = this.data.u[selectIndex];
        var vv = this.data.v[selectIndex];
        var ww = this.data.w[selectIndex];

        selection.traceCoordinate = [
            xx, yy, zz,
            uu, vv, ww,
            Math.sqrt(uu * uu + vv * vv + ww * ww)
        ];

        var text = this.data.hovertext || this.data.text;
        if(Array.isArray(text) && text[selectIndex] !== undefined) {
            selection.textLabel = text[selectIndex];
        } else if(text) {
            selection.textLabel = text;
        }

        return true;
    }
};

var axisName2scaleIndex = {xaxis: 0, yaxis: 1, zaxis: 2};
var anchor2coneOffset = {tip: 1, tail: 0, cm: 0.25, center: 0.5};
var anchor2coneSpan = {tip: 1, tail: 1, cm: 0.75, center: 0.5};

function convert(scene, trace) {
    var sceneLayout = scene.fullSceneLayout;
    var dataScale = scene.dataScale;
    var coneOpts = {};

    function toDataCoords(arr, axisName) {
        var ax = sceneLayout[axisName];
        var scale = dataScale[axisName2scaleIndex[axisName]];
        return simpleMap(arr, function(v) { return ax.d2l(v) * scale; });
    }

    coneOpts.vectors = zip3(
        toDataCoords(trace.u, 'xaxis'),
        toDataCoords(trace.v, 'yaxis'),
        toDataCoords(trace.w, 'zaxis'),
        trace._len
    );

    coneOpts.positions = zip3(
        toDataCoords(trace.x, 'xaxis'),
        toDataCoords(trace.y, 'yaxis'),
        toDataCoords(trace.z, 'zaxis'),
        trace._len
    );

    var cOpts = extractOpts(trace);
    coneOpts.colormap = parseColorScale(trace);
    coneOpts.vertexIntensityBounds = [cOpts.min / trace._normMax, cOpts.max / trace._normMax];
    coneOpts.coneOffset = anchor2coneOffset[trace.anchor];

    if(trace.sizemode === 'scaled') {
        // unitless sizeref
        coneOpts.coneSize = trace.sizeref || 0.5;
    } else {
        // sizeref here has unit of velocity
        coneOpts.coneSize = trace.sizeref && trace._normMax ?
            trace.sizeref / trace._normMax :
            0.5;
    }

    var meshData = conePlot(coneOpts);

    // pass gl-mesh3d lighting attributes
    var lp = trace.lightposition;
    meshData.lightPosition = [lp.x, lp.y, lp.z];
    meshData.ambient = trace.lighting.ambient;
    meshData.diffuse = trace.lighting.diffuse;
    meshData.specular = trace.lighting.specular;
    meshData.roughness = trace.lighting.roughness;
    meshData.fresnel = trace.lighting.fresnel;
    meshData.opacity = trace.opacity;

    // stash autorange pad value
    trace._pad = anchor2coneSpan[trace.anchor] * meshData.vectorScale * meshData.coneScale * trace._normMax;

    return meshData;
}

proto.update = function(data) {
    this.data = data;

    var meshData = convert(this.scene, data);
    this.mesh.update(meshData);
};

proto.dispose = function() {
    this.scene.glplot.remove(this.mesh);
    this.mesh.dispose();
};

function createConeTrace(scene, data) {
    var gl = scene.glplot.gl;

    var meshData = convert(scene, data);
    var mesh = createConeMesh(gl, meshData);

    var cone = new Cone(scene, data.uid);
    cone.mesh = mesh;
    cone.data = data;
    mesh._trace = cone;

    scene.glplot.add(mesh);

    return cone;
}

module.exports = createConeTrace;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/cone/defaults.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/cone/defaults.js ***!
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

var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/cone/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var u = coerce('u');
    var v = coerce('v');
    var w = coerce('w');

    var x = coerce('x');
    var y = coerce('y');
    var z = coerce('z');

    if(
        !u || !u.length || !v || !v.length || !w || !w.length ||
        !x || !x.length || !y || !y.length || !z || !z.length
    ) {
        traceOut.visible = false;
        return;
    }

    coerce('sizeref');
    coerce('sizemode');

    coerce('anchor');

    coerce('lighting.ambient');
    coerce('lighting.diffuse');
    coerce('lighting.specular');
    coerce('lighting.roughness');
    coerce('lighting.fresnel');
    coerce('lightposition.x');
    coerce('lightposition.y');
    coerce('lightposition.z');

    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'c'});

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    // disable 1D transforms (for now)
    traceOut._length = null;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/cone/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/cone/index.js ***!
  \*********************************************************/
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
    name: 'cone',
    basePlotModule: __webpack_require__(/*! ../../plots/gl3d */ "./node_modules/plotly.js/src/plots/gl3d/index.js"),
    categories: ['gl3d', 'showLegend'],

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/cone/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/cone/defaults.js"),
    colorbar: {
        min: 'cmin',
        max: 'cmax'
    },
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/cone/calc.js"),
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/cone/convert.js"),
    eventData: function(out, pt) {
        out.norm = pt.traceCoordinate[6];
        return out;
    },

    meta: {
        description: [
            'Use cone traces to visualize vector fields.',
            '',
            'Specify a vector field using 6 1D arrays,',
            '3 position arrays `x`, `y` and `z`',
            'and 3 vector component arrays `u`, `v`, `w`.',
            'The cones are drawn exactly at the positions given',
            'by `x`, `y` and `z`.'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvY29uZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbmUvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbmUvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbmUvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbmUvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb25lL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLG1IQUE4Qzs7Ozs7Ozs7Ozs7O0FDVjlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLHNCQUFzQixtQkFBTyxDQUFDLGdIQUF3QztBQUN0RSx5QkFBeUIsMElBQTZEO0FBQ3RGLGtCQUFrQixtQkFBTyxDQUFDLHNGQUFzQjtBQUNoRCxnQkFBZ0IsbUJBQU8sQ0FBQyxnRkFBd0I7O0FBRWhELGlCQUFpQixvR0FBc0M7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7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O0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVzs7QUFFN0IseUJBQXlCLG1CQUFPLENBQUMsNEdBQXNDO0FBQ3ZFLGlCQUFpQixtQkFBTyxDQUFDLDRFQUFjOztBQUV2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyREFBMkQseUJBQXlCOztBQUVwRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMEVBQWtCO0FBQzlDOztBQUVBLGdCQUFnQixtQkFBTyxDQUFDLDRFQUFjO0FBQ3RDLG9CQUFvQixtQkFBTyxDQUFDLHdFQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxVQUFVLG1CQUFPLENBQUMsZ0VBQVE7QUFDMUIsVUFBVSxtQkFBTyxDQUFDLHNFQUFXO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0YmVjOGU4ZmQ1Y2ZkYWE0MThiYTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9jb25lJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvclNjYWxlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvYXR0cmlidXRlcycpO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgbWVzaDNkQXR0cnMgPSByZXF1aXJlKCcuLi9tZXNoM2QvYXR0cmlidXRlcycpO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxudmFyIGF0dHJzID0ge1xuICAgIHg6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgeCBjb29yZGluYXRlcyBvZiB0aGUgdmVjdG9yIGZpZWxkJyxcbiAgICAgICAgICAgICdhbmQgb2YgdGhlIGRpc3BsYXllZCBjb25lcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHkgY29vcmRpbmF0ZXMgb2YgdGhlIHZlY3RvciBmaWVsZCcsXG4gICAgICAgICAgICAnYW5kIG9mIHRoZSBkaXNwbGF5ZWQgY29uZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgejoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB6IGNvb3JkaW5hdGVzIG9mIHRoZSB2ZWN0b3IgZmllbGQnLFxuICAgICAgICAgICAgJ2FuZCBvZiB0aGUgZGlzcGxheWVkIGNvbmVzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgdToge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeCBjb21wb25lbnRzIG9mIHRoZSB2ZWN0b3IgZmllbGQuJ1xuICAgIH0sXG4gICAgdjoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeSBjb21wb25lbnRzIG9mIHRoZSB2ZWN0b3IgZmllbGQuJ1xuICAgIH0sXG4gICAgdzoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeiBjb21wb25lbnRzIG9mIHRoZSB2ZWN0b3IgZmllbGQuJ1xuICAgIH0sXG5cbiAgICAvLyBUT0RPIGFkZCB3YXkgdG8gc3BlY2lmeSBjb25lIHBvc2l0aW9ucyBpbmRlcGVuZGVudGx5IG9mIHRoZSB2ZWN0b3IgZmllbGRcbiAgICAvLyBwcm92aWRlZCwgc2ltaWxhciB0byBNQVRMQUIncyBjb25lcGxvdCBDeC9DeS9DeiBtZXNoZ3JpZHMsXG4gICAgLy8gc2VlIGh0dHBzOi8vd3d3Lm1hdGh3b3Jrcy5jb20vaGVscC9tYXRsYWIvcmVmL2NvbmVwbG90Lmh0bWxcbiAgICAvL1xuICAgIC8vIEFsdGVybmF0aXZlbHksIGlmIG91ciBnb2FsIGlzIG9ubHkgdG8gJ2ZpbGwgaW4gZ2FwcycgaW4gdGhlIHZlY3RvciBkYXRhLFxuICAgIC8vIHdlIGNvdWxkIHRyeSB0byBleHRlbmQgdGhlIGhlYXRtYXAgJ2Nvbm5lY3RnYXBzJyBhbGdvcml0aG0gdG8gM0QuXG4gICAgLy8gRnJvbSBBSjogdGhpcyBwYXJ0aWN1bGFyIGFsZ29yaXRobSB3aGljaCBhbW91bnRzIHRvIGEgUG9pc3NvbiBlcXVhdGlvbixcbiAgICAvLyBib3RoIGZvciBpbnRlcnBvbGF0aW9uIGFuZCBleHRyYXBvbGF0aW9uIC0gaXMgdGhlIHJpZ2h0IG9uZSB0byB1c2UgZm9yXG4gICAgLy8gY29uZXMgdG9vLiAgSXQgbWFrZXMgYSBmaWVsZCB3aXRoIHplcm8gZGl2ZXJnZW5jZSwgd2hpY2ggaXMgYSBnb29kXG4gICAgLy8gYmFzZWxpbmUgYXNzdW1wdGlvbiBmb3IgdmVjdG9yIGZpZWxkcy5cbiAgICAvL1xuICAgIC8vIGNvbmVzOiB7XG4gICAgLy8gICAgIC8vIHBvdGVudGlhbCBhdHRyaWJ1dGVzIHRvIGFkZDpcbiAgICAvLyAgICAgLy9cbiAgICAvLyAgICAgLy8gLSBtZXNobW9kZTogJ2NhcnRlc2lhbi1wcm9kdWN0JywgJ3B0cycsICdncmlkJ1xuICAgIC8vICAgICAvL1xuICAgIC8vICAgICAvLyB1bmRlciBgbWVzaG1vZGU6ICdncmlkJ2BcbiAgICAvLyAgICAgLy8gLSAoeHx5fHopZ3JpZC5zdGFydFxuICAgIC8vICAgICAvLyAtICh4fHl8eilncmlkLmVuZFxuICAgIC8vICAgICAvLyAtICh4fHl8eilncmlkLnNpemVcbiAgICAvL1xuICAgIC8vICAgICB4OiB7XG4gICAgLy8gICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgLy8gICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgIC8vICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB4IGNvb3JkaW5hdGVzIG9mIHRoZSBjb25lcyB0byBiZSBkaXNwbGF5ZWQuJ1xuICAgIC8vICAgICB9LFxuICAgIC8vICAgICB5OiB7XG4gICAgLy8gICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgLy8gICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgIC8vICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB5IGNvb3JkaW5hdGVzIG9mIHRoZSBjb25lcyB0byBiZSBkaXNwbGF5ZWQuJ1xuICAgIC8vICAgICB9LFxuICAgIC8vICAgICB6OiB7XG4gICAgLy8gICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgLy8gICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgIC8vICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB6IGNvb3JkaW5hdGVzIG9mIHRoZSBjb25lcyB0byBiZSBkaXNwbGF5ZWQuJ1xuICAgIC8vICAgICB9LFxuICAgIC8vXG4gICAgLy8gICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgLy8gICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgLy8gICAgICAgICAnQnkgc2V0dGluZyBgY29uZXMueGAsIGBjb25lcy55YCBhbmQgYGNvbmVzLnpgIHRvIDFEIGFycmF5cywnLFxuICAgIC8vICAgICAgICAgJ3Bsb3RseSBjcmVhdGVzIGEgbWVzaCB1c2luZyB0aGUgY2FydGVzaWFuIHByb2R1Y3Qgb2YgdGhvc2UgMyBhcnJheXMuJ1xuICAgIC8vICAgICBdLmpvaW4oJyAnKVxuICAgIC8vIH0sXG5cbiAgICBzaXplbW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydzY2FsZWQnLCAnYWJzb2x1dGUnXSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZmx0OiAnc2NhbGVkJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHdoZXRoZXIgYHNpemVyZWZgIGlzIHNldCBhcyBhICpzY2FsZWQqIChpLmUgdW5pdGxlc3MpIHNjYWxhcicsXG4gICAgICAgICAgICAnKG5vcm1hbGl6ZWQgYnkgdGhlIG1heCB1L3YvdyBub3JtIGluIHRoZSB2ZWN0b3IgZmllbGQpIG9yIGFzJyxcbiAgICAgICAgICAgICcqYWJzb2x1dGUqIHZhbHVlIChpbiB0aGUgc2FtZSB1bml0cyBhcyB0aGUgdmVjdG9yIGZpZWxkKS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBzaXplcmVmOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdBZGp1c3RzIHRoZSBjb25lIHNpemUgc2NhbGluZy4nLFxuICAgICAgICAgICAgJ1RoZSBzaXplIG9mIHRoZSBjb25lcyBpcyBkZXRlcm1pbmVkIGJ5IHRoZWlyIHUvdi93IG5vcm0gbXVsdGlwbGllZCBhIGZhY3RvciBhbmQgYHNpemVyZWZgLicsXG4gICAgICAgICAgICAnVGhpcyBmYWN0b3IgKGNvbXB1dGVkIGludGVybmFsbHkpIGNvcnJlc3BvbmRzIHRvIHRoZSBtaW5pbXVtIFwidGltZVwiIHRvIHRyYXZlbCBhY3Jvc3MnLFxuICAgICAgICAgICAgJ3R3byBzdWNjZXNzaXZlIHgveS96IHBvc2l0aW9ucyBhdCB0aGUgYXZlcmFnZSB2ZWxvY2l0eSBvZiB0aG9zZSB0d28gc3VjY2Vzc2l2ZSBwb3NpdGlvbnMuJyxcbiAgICAgICAgICAgICdBbGwgY29uZXMgaW4gYSBnaXZlbiB0cmFjZSB1c2UgdGhlIHNhbWUgZmFjdG9yLicsXG4gICAgICAgICAgICAnV2l0aCBgc2l6ZW1vZGVgIHNldCB0byAqc2NhbGVkKiwgYHNpemVyZWZgIGlzIHVuaXRsZXNzLCBpdHMgZGVmYXVsdCB2YWx1ZSBpcyAqMC41KicsXG4gICAgICAgICAgICAnV2l0aCBgc2l6ZW1vZGVgIHNldCB0byAqYWJzb2x1dGUqLCBgc2l6ZXJlZmAgaGFzIHRoZSBzYW1lIHVuaXRzIGFzIHRoZSB1L3YvdyB2ZWN0b3IgZmllbGQsJyxcbiAgICAgICAgICAgICdpdHMgdGhlIGRlZmF1bHQgdmFsdWUgaXMgaGFsZiB0aGUgc2FtcGxlXFwncyBtYXhpbXVtIHZlY3RvciBub3JtLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgYW5jaG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICB2YWx1ZXM6IFsndGlwJywgJ3RhaWwnLCAnY20nLCAnY2VudGVyJ10sXG4gICAgICAgIGRmbHQ6ICdjbScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgY29uZXNcXCcgYW5jaG9yIHdpdGggcmVzcGVjdCB0byB0aGVpciB4L3kveiBwb3NpdGlvbnMuJyxcbiAgICAgICAgICAgICdOb3RlIHRoYXQgKmNtKiBkZW5vdGUgdGhlIGNvbmVcXCdzIGNlbnRlciBvZiBtYXNzIHdoaWNoIGNvcnJlc3BvbmRzIHRvJyxcbiAgICAgICAgICAgICcxLzQgZnJvbSB0aGUgdGFpbCB0byB0aXAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICB0ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb25lcy4nLFxuICAgICAgICAgICAgJ0lmIHRyYWNlIGBob3ZlcmluZm9gIGNvbnRhaW5zIGEgKnRleHQqIGZsYWcgYW5kICpob3ZlcnRleHQqIGlzIG5vdCBzZXQsJyxcbiAgICAgICAgICAgICd0aGVzZSBlbGVtZW50cyB3aWxsIGJlIHNlZW4gaW4gdGhlIGhvdmVyIGxhYmVscy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBob3ZlcnRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2FtZSBhcyBgdGV4dGAuJ1xuICAgIH0sXG5cbiAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlQXR0cnMoe2VkaXRUeXBlOiAnY2FsYyd9LCB7a2V5czogWydub3JtJ119KSxcbiAgICBzaG93bGVnZW5kOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuc2hvd2xlZ2VuZCwge2RmbHQ6IGZhbHNlfSlcbn07XG5cbmV4dGVuZEZsYXQoYXR0cnMsIGNvbG9yU2NhbGVBdHRycygnJywge1xuICAgIGNvbG9yQXR0cjogJ3Uvdi93IG5vcm0nLFxuICAgIHNob3dTY2FsZURmbHQ6IHRydWUsXG4gICAgZWRpdFR5cGVPdmVycmlkZTogJ2NhbGMnXG59KSk7XG5cbnZhciBmcm9tTWVzaDNkID0gWydvcGFjaXR5JywgJ2xpZ2h0cG9zaXRpb24nLCAnbGlnaHRpbmcnXTtcblxuZnJvbU1lc2gzZC5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICBhdHRyc1trXSA9IG1lc2gzZEF0dHJzW2tdO1xufSk7XG5cbmF0dHJzLmhvdmVyaW5mbyA9IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5ob3ZlcmluZm8sIHtcbiAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgIGZsYWdzOiBbJ3gnLCAneScsICd6JywgJ3UnLCAndicsICd3JywgJ25vcm0nLCAndGV4dCcsICduYW1lJ10sXG4gICAgZGZsdDogJ3greSt6K25vcm0rdGV4dCtuYW1lJ1xufSk7XG5cbmF0dHJzLnRyYW5zZm9ybXMgPSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gYXR0cnM7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvcnNjYWxlQ2FsYyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9jYWxjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgdSA9IHRyYWNlLnU7XG4gICAgdmFyIHYgPSB0cmFjZS52O1xuICAgIHZhciB3ID0gdHJhY2UudztcbiAgICB2YXIgbGVuID0gTWF0aC5taW4oXG4gICAgICAgIHRyYWNlLngubGVuZ3RoLCB0cmFjZS55Lmxlbmd0aCwgdHJhY2Uuei5sZW5ndGgsXG4gICAgICAgIHUubGVuZ3RoLCB2Lmxlbmd0aCwgdy5sZW5ndGhcbiAgICApO1xuICAgIHZhciBub3JtTWF4ID0gLUluZmluaXR5O1xuICAgIHZhciBub3JtTWluID0gSW5maW5pdHk7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHV1ID0gdVtpXTtcbiAgICAgICAgdmFyIHZ2ID0gdltpXTtcbiAgICAgICAgdmFyIHd3ID0gd1tpXTtcbiAgICAgICAgdmFyIG5vcm0gPSBNYXRoLnNxcnQodXUgKiB1dSArIHZ2ICogdnYgKyB3dyAqIHd3KTtcblxuICAgICAgICBub3JtTWF4ID0gTWF0aC5tYXgobm9ybU1heCwgbm9ybSk7XG4gICAgICAgIG5vcm1NaW4gPSBNYXRoLm1pbihub3JtTWluLCBub3JtKTtcbiAgICB9XG5cbiAgICB0cmFjZS5fbGVuID0gbGVuO1xuICAgIHRyYWNlLl9ub3JtTWF4ID0gbm9ybU1heDtcblxuICAgIGNvbG9yc2NhbGVDYWxjKGdkLCB0cmFjZSwge1xuICAgICAgICB2YWxzOiBbbm9ybU1pbiwgbm9ybU1heF0sXG4gICAgICAgIGNvbnRhaW5lclN0cjogJycsXG4gICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgIH0pO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNvbmVQbG90ID0gcmVxdWlyZSgnZ2wtY29uZTNkJyk7XG52YXIgY3JlYXRlQ29uZU1lc2ggPSByZXF1aXJlKCdnbC1jb25lM2QnKS5jcmVhdGVDb25lTWVzaDtcblxudmFyIHNpbXBsZU1hcCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLnNpbXBsZU1hcDtcbnZhciBwYXJzZUNvbG9yU2NhbGUgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2xfZm9ybWF0X2NvbG9yJykucGFyc2VDb2xvclNjYWxlO1xudmFyIGV4dHJhY3RPcHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJykuZXh0cmFjdE9wdHM7XG52YXIgemlwMyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dsM2QvemlwMycpO1xuXG5mdW5jdGlvbiBDb25lKHNjZW5lLCB1aWQpIHtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy51aWQgPSB1aWQ7XG4gICAgdGhpcy5tZXNoID0gbnVsbDtcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xufVxuXG52YXIgcHJvdG8gPSBDb25lLnByb3RvdHlwZTtcblxucHJvdG8uaGFuZGxlUGljayA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuICAgIGlmKHNlbGVjdGlvbi5vYmplY3QgPT09IHRoaXMubWVzaCkge1xuICAgICAgICB2YXIgc2VsZWN0SW5kZXggPSBzZWxlY3Rpb24uaW5kZXggPSBzZWxlY3Rpb24uZGF0YS5pbmRleDtcbiAgICAgICAgdmFyIHh4ID0gdGhpcy5kYXRhLnhbc2VsZWN0SW5kZXhdO1xuICAgICAgICB2YXIgeXkgPSB0aGlzLmRhdGEueVtzZWxlY3RJbmRleF07XG4gICAgICAgIHZhciB6eiA9IHRoaXMuZGF0YS56W3NlbGVjdEluZGV4XTtcbiAgICAgICAgdmFyIHV1ID0gdGhpcy5kYXRhLnVbc2VsZWN0SW5kZXhdO1xuICAgICAgICB2YXIgdnYgPSB0aGlzLmRhdGEudltzZWxlY3RJbmRleF07XG4gICAgICAgIHZhciB3dyA9IHRoaXMuZGF0YS53W3NlbGVjdEluZGV4XTtcblxuICAgICAgICBzZWxlY3Rpb24udHJhY2VDb29yZGluYXRlID0gW1xuICAgICAgICAgICAgeHgsIHl5LCB6eixcbiAgICAgICAgICAgIHV1LCB2diwgd3csXG4gICAgICAgICAgICBNYXRoLnNxcnQodXUgKiB1dSArIHZ2ICogdnYgKyB3dyAqIHd3KVxuICAgICAgICBdO1xuXG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5kYXRhLmhvdmVydGV4dCB8fCB0aGlzLmRhdGEudGV4dDtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0ZXh0KSAmJiB0ZXh0W3NlbGVjdEluZGV4XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24udGV4dExhYmVsID0gdGV4dFtzZWxlY3RJbmRleF07XG4gICAgICAgIH0gZWxzZSBpZih0ZXh0KSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24udGV4dExhYmVsID0gdGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn07XG5cbnZhciBheGlzTmFtZTJzY2FsZUluZGV4ID0ge3hheGlzOiAwLCB5YXhpczogMSwgemF4aXM6IDJ9O1xudmFyIGFuY2hvcjJjb25lT2Zmc2V0ID0ge3RpcDogMSwgdGFpbDogMCwgY206IDAuMjUsIGNlbnRlcjogMC41fTtcbnZhciBhbmNob3IyY29uZVNwYW4gPSB7dGlwOiAxLCB0YWlsOiAxLCBjbTogMC43NSwgY2VudGVyOiAwLjV9O1xuXG5mdW5jdGlvbiBjb252ZXJ0KHNjZW5lLCB0cmFjZSkge1xuICAgIHZhciBzY2VuZUxheW91dCA9IHNjZW5lLmZ1bGxTY2VuZUxheW91dDtcbiAgICB2YXIgZGF0YVNjYWxlID0gc2NlbmUuZGF0YVNjYWxlO1xuICAgIHZhciBjb25lT3B0cyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gdG9EYXRhQ29vcmRzKGFyciwgYXhpc05hbWUpIHtcbiAgICAgICAgdmFyIGF4ID0gc2NlbmVMYXlvdXRbYXhpc05hbWVdO1xuICAgICAgICB2YXIgc2NhbGUgPSBkYXRhU2NhbGVbYXhpc05hbWUyc2NhbGVJbmRleFtheGlzTmFtZV1dO1xuICAgICAgICByZXR1cm4gc2ltcGxlTWFwKGFyciwgZnVuY3Rpb24odikgeyByZXR1cm4gYXguZDJsKHYpICogc2NhbGU7IH0pO1xuICAgIH1cblxuICAgIGNvbmVPcHRzLnZlY3RvcnMgPSB6aXAzKFxuICAgICAgICB0b0RhdGFDb29yZHModHJhY2UudSwgJ3hheGlzJyksXG4gICAgICAgIHRvRGF0YUNvb3Jkcyh0cmFjZS52LCAneWF4aXMnKSxcbiAgICAgICAgdG9EYXRhQ29vcmRzKHRyYWNlLncsICd6YXhpcycpLFxuICAgICAgICB0cmFjZS5fbGVuXG4gICAgKTtcblxuICAgIGNvbmVPcHRzLnBvc2l0aW9ucyA9IHppcDMoXG4gICAgICAgIHRvRGF0YUNvb3Jkcyh0cmFjZS54LCAneGF4aXMnKSxcbiAgICAgICAgdG9EYXRhQ29vcmRzKHRyYWNlLnksICd5YXhpcycpLFxuICAgICAgICB0b0RhdGFDb29yZHModHJhY2UueiwgJ3pheGlzJyksXG4gICAgICAgIHRyYWNlLl9sZW5cbiAgICApO1xuXG4gICAgdmFyIGNPcHRzID0gZXh0cmFjdE9wdHModHJhY2UpO1xuICAgIGNvbmVPcHRzLmNvbG9ybWFwID0gcGFyc2VDb2xvclNjYWxlKHRyYWNlKTtcbiAgICBjb25lT3B0cy52ZXJ0ZXhJbnRlbnNpdHlCb3VuZHMgPSBbY09wdHMubWluIC8gdHJhY2UuX25vcm1NYXgsIGNPcHRzLm1heCAvIHRyYWNlLl9ub3JtTWF4XTtcbiAgICBjb25lT3B0cy5jb25lT2Zmc2V0ID0gYW5jaG9yMmNvbmVPZmZzZXRbdHJhY2UuYW5jaG9yXTtcblxuICAgIGlmKHRyYWNlLnNpemVtb2RlID09PSAnc2NhbGVkJykge1xuICAgICAgICAvLyB1bml0bGVzcyBzaXplcmVmXG4gICAgICAgIGNvbmVPcHRzLmNvbmVTaXplID0gdHJhY2Uuc2l6ZXJlZiB8fCAwLjU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc2l6ZXJlZiBoZXJlIGhhcyB1bml0IG9mIHZlbG9jaXR5XG4gICAgICAgIGNvbmVPcHRzLmNvbmVTaXplID0gdHJhY2Uuc2l6ZXJlZiAmJiB0cmFjZS5fbm9ybU1heCA/XG4gICAgICAgICAgICB0cmFjZS5zaXplcmVmIC8gdHJhY2UuX25vcm1NYXggOlxuICAgICAgICAgICAgMC41O1xuICAgIH1cblxuICAgIHZhciBtZXNoRGF0YSA9IGNvbmVQbG90KGNvbmVPcHRzKTtcblxuICAgIC8vIHBhc3MgZ2wtbWVzaDNkIGxpZ2h0aW5nIGF0dHJpYnV0ZXNcbiAgICB2YXIgbHAgPSB0cmFjZS5saWdodHBvc2l0aW9uO1xuICAgIG1lc2hEYXRhLmxpZ2h0UG9zaXRpb24gPSBbbHAueCwgbHAueSwgbHAuel07XG4gICAgbWVzaERhdGEuYW1iaWVudCA9IHRyYWNlLmxpZ2h0aW5nLmFtYmllbnQ7XG4gICAgbWVzaERhdGEuZGlmZnVzZSA9IHRyYWNlLmxpZ2h0aW5nLmRpZmZ1c2U7XG4gICAgbWVzaERhdGEuc3BlY3VsYXIgPSB0cmFjZS5saWdodGluZy5zcGVjdWxhcjtcbiAgICBtZXNoRGF0YS5yb3VnaG5lc3MgPSB0cmFjZS5saWdodGluZy5yb3VnaG5lc3M7XG4gICAgbWVzaERhdGEuZnJlc25lbCA9IHRyYWNlLmxpZ2h0aW5nLmZyZXNuZWw7XG4gICAgbWVzaERhdGEub3BhY2l0eSA9IHRyYWNlLm9wYWNpdHk7XG5cbiAgICAvLyBzdGFzaCBhdXRvcmFuZ2UgcGFkIHZhbHVlXG4gICAgdHJhY2UuX3BhZCA9IGFuY2hvcjJjb25lU3Bhblt0cmFjZS5hbmNob3JdICogbWVzaERhdGEudmVjdG9yU2NhbGUgKiBtZXNoRGF0YS5jb25lU2NhbGUgKiB0cmFjZS5fbm9ybU1heDtcblxuICAgIHJldHVybiBtZXNoRGF0YTtcbn1cblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICB2YXIgbWVzaERhdGEgPSBjb252ZXJ0KHRoaXMuc2NlbmUsIGRhdGEpO1xuICAgIHRoaXMubWVzaC51cGRhdGUobWVzaERhdGEpO1xufTtcblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2NlbmUuZ2xwbG90LnJlbW92ZSh0aGlzLm1lc2gpO1xuICAgIHRoaXMubWVzaC5kaXNwb3NlKCk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDb25lVHJhY2Uoc2NlbmUsIGRhdGEpIHtcbiAgICB2YXIgZ2wgPSBzY2VuZS5nbHBsb3QuZ2w7XG5cbiAgICB2YXIgbWVzaERhdGEgPSBjb252ZXJ0KHNjZW5lLCBkYXRhKTtcbiAgICB2YXIgbWVzaCA9IGNyZWF0ZUNvbmVNZXNoKGdsLCBtZXNoRGF0YSk7XG5cbiAgICB2YXIgY29uZSA9IG5ldyBDb25lKHNjZW5lLCBkYXRhLnVpZCk7XG4gICAgY29uZS5tZXNoID0gbWVzaDtcbiAgICBjb25lLmRhdGEgPSBkYXRhO1xuICAgIG1lc2guX3RyYWNlID0gY29uZTtcblxuICAgIHNjZW5lLmdscGxvdC5hZGQobWVzaCk7XG5cbiAgICByZXR1cm4gY29uZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDb25lVHJhY2U7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgY29sb3JzY2FsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgdSA9IGNvZXJjZSgndScpO1xuICAgIHZhciB2ID0gY29lcmNlKCd2Jyk7XG4gICAgdmFyIHcgPSBjb2VyY2UoJ3cnKTtcblxuICAgIHZhciB4ID0gY29lcmNlKCd4Jyk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ3knKTtcbiAgICB2YXIgeiA9IGNvZXJjZSgneicpO1xuXG4gICAgaWYoXG4gICAgICAgICF1IHx8ICF1Lmxlbmd0aCB8fCAhdiB8fCAhdi5sZW5ndGggfHwgIXcgfHwgIXcubGVuZ3RoIHx8XG4gICAgICAgICF4IHx8ICF4Lmxlbmd0aCB8fCAheSB8fCAheS5sZW5ndGggfHwgIXogfHwgIXoubGVuZ3RoXG4gICAgKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgnc2l6ZXJlZicpO1xuICAgIGNvZXJjZSgnc2l6ZW1vZGUnKTtcblxuICAgIGNvZXJjZSgnYW5jaG9yJyk7XG5cbiAgICBjb2VyY2UoJ2xpZ2h0aW5nLmFtYmllbnQnKTtcbiAgICBjb2VyY2UoJ2xpZ2h0aW5nLmRpZmZ1c2UnKTtcbiAgICBjb2VyY2UoJ2xpZ2h0aW5nLnNwZWN1bGFyJyk7XG4gICAgY29lcmNlKCdsaWdodGluZy5yb3VnaG5lc3MnKTtcbiAgICBjb2VyY2UoJ2xpZ2h0aW5nLmZyZXNuZWwnKTtcbiAgICBjb2VyY2UoJ2xpZ2h0cG9zaXRpb24ueCcpO1xuICAgIGNvZXJjZSgnbGlnaHRwb3NpdGlvbi55Jyk7XG4gICAgY29lcmNlKCdsaWdodHBvc2l0aW9uLnonKTtcblxuICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICcnLCBjTGV0dGVyOiAnYyd9KTtcblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICAvLyBkaXNhYmxlIDFEIHRyYW5zZm9ybXMgKGZvciBub3cpXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IG51bGw7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdjb25lJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvZ2wzZCcpLFxuICAgIGNhdGVnb3JpZXM6IFsnZ2wzZCcsICdzaG93TGVnZW5kJ10sXG5cbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNvbG9yYmFyOiB7XG4gICAgICAgIG1pbjogJ2NtaW4nLFxuICAgICAgICBtYXg6ICdjbWF4J1xuICAgIH0sXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJyksXG4gICAgcGxvdDogcmVxdWlyZSgnLi9jb252ZXJ0JyksXG4gICAgZXZlbnREYXRhOiBmdW5jdGlvbihvdXQsIHB0KSB7XG4gICAgICAgIG91dC5ub3JtID0gcHQudHJhY2VDb29yZGluYXRlWzZdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVXNlIGNvbmUgdHJhY2VzIHRvIHZpc3VhbGl6ZSB2ZWN0b3IgZmllbGRzLicsXG4gICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICdTcGVjaWZ5IGEgdmVjdG9yIGZpZWxkIHVzaW5nIDYgMUQgYXJyYXlzLCcsXG4gICAgICAgICAgICAnMyBwb3NpdGlvbiBhcnJheXMgYHhgLCBgeWAgYW5kIGB6YCcsXG4gICAgICAgICAgICAnYW5kIDMgdmVjdG9yIGNvbXBvbmVudCBhcnJheXMgYHVgLCBgdmAsIGB3YC4nLFxuICAgICAgICAgICAgJ1RoZSBjb25lcyBhcmUgZHJhd24gZXhhY3RseSBhdCB0aGUgcG9zaXRpb25zIGdpdmVuJyxcbiAgICAgICAgICAgICdieSBgeGAsIGB5YCBhbmQgYHpgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==