(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_plots_gl3d_zip3_js-node_modules_plotly_js_src_traces_mesh3-5c91ea"],{

/***/ "./node_modules/plotly.js/src/plots/gl3d/zip3.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/zip3.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function zip3(x, y, z, len) {
    len = len || x.length;

    var result = new Array(len);
    for(var i = 0; i < len; i++) {
        result[i] = [x[i], y[i], z[i]];
    }
    return result;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/mesh3d/attributes.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/mesh3d/attributes.js ***!
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



var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var surfaceAttrs = __webpack_require__(/*! ../surface/attributes */ "./node_modules/plotly.js/src/traces/surface/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = extendFlat({
    x: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the X coordinates of the vertices. The nth element of vectors `x`, `y` and `z`',
            'jointly represent the X, Y and Z coordinates of the nth vertex.'
        ].join(' ')
    },
    y: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the Y coordinates of the vertices. The nth element of vectors `x`, `y` and `z`',
            'jointly represent the X, Y and Z coordinates of the nth vertex.'
        ].join(' ')
    },
    z: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the Z coordinates of the vertices. The nth element of vectors `x`, `y` and `z`',
            'jointly represent the X, Y and Z coordinates of the nth vertex.'
        ].join(' ')
    },

    i: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'A vector of vertex indices, i.e. integer values between 0 and the length of the vertex',
            'vectors, representing the *first* vertex of a triangle. For example, `{i[m], j[m], k[m]}`',
            'together represent face m (triangle m) in the mesh, where `i[m] = n` points to the triplet',
            '`{x[n], y[n], z[n]}` in the vertex arrays. Therefore, each element in `i` represents a',
            'point in space, which is the first vertex of a triangle.'
        ].join(' ')
    },
    j: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'A vector of vertex indices, i.e. integer values between 0 and the length of the vertex',
            'vectors, representing the *second* vertex of a triangle. For example, `{i[m], j[m], k[m]}` ',
            'together represent face m (triangle m) in the mesh, where `j[m] = n` points to the triplet',
            '`{x[n], y[n], z[n]}` in the vertex arrays. Therefore, each element in `j` represents a',
            'point in space, which is the second vertex of a triangle.'
        ].join(' ')

    },
    k: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'A vector of vertex indices, i.e. integer values between 0 and the length of the vertex',
            'vectors, representing the *third* vertex of a triangle. For example, `{i[m], j[m], k[m]}`',
            'together represent face m (triangle m) in the mesh, where `k[m] = n` points to the triplet ',
            '`{x[n], y[n], z[n]}` in the vertex arrays. Therefore, each element in `k` represents a',
            'point in space, which is the third vertex of a triangle.'
        ].join(' ')

    },

    text: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        editType: 'calc',
        description: [
            'Sets the text elements associated with the vertices.',
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
    hovertemplate: hovertemplateAttrs({editType: 'calc'}),

    delaunayaxis: {
        valType: 'enumerated',
        role: 'info',
        values: [ 'x', 'y', 'z' ],
        dflt: 'z',
        editType: 'calc',
        description: [
            'Sets the Delaunay axis, which is the axis that is perpendicular to the surface of the',
            'Delaunay triangulation.',
            'It has an effect if `i`, `j`, `k` are not provided and `alphahull` is set to indicate',
            'Delaunay triangulation.'
        ].join(' ')
    },

    alphahull: {
        valType: 'number',
        role: 'style',
        dflt: -1,
        editType: 'calc',
        description: [
            'Determines how the mesh surface triangles are derived from the set of',
            'vertices (points) represented by the `x`, `y` and `z` arrays, if',
            'the `i`, `j`, `k` arrays are not supplied.',
            'For general use of `mesh3d` it is preferred that `i`, `j`, `k` are',
            'supplied.',

            'If *-1*, Delaunay triangulation is used, which is mainly suitable if the',
            'mesh is a single, more or less layer surface that is perpendicular to `delaunayaxis`.',
            'In case the `delaunayaxis` intersects the mesh surface at more than one point',
            'it will result triangles that are very long in the dimension of `delaunayaxis`.',

            'If *>0*, the alpha-shape algorithm is used. In this case, the positive `alphahull` value',
            'signals the use of the alpha-shape algorithm, _and_ its value',
            'acts as the parameter for the mesh fitting.',

            'If *0*,  the convex-hull algorithm is used. It is suitable for convex bodies',
            'or if the intention is to enclose the `x`, `y` and `z` point set into a convex',
            'hull.'
        ].join(' ')
    },

    intensity: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the intensity values for vertices or cells',
            'as defined by `intensitymode`.',
            'It can be used for plotting fields on meshes.'
        ].join(' ')
    },
    intensitymode: {
        valType: 'enumerated',
        values: ['vertex', 'cell'],
        dflt: 'vertex',
        editType: 'calc',
        role: 'info',
        description: [
            'Determines the source of `intensity` values.'
        ].join(' ')
    },

    // Color field
    color: {
        valType: 'color',
        role: 'style',
        editType: 'calc',
        description: 'Sets the color of the whole mesh'
    },
    vertexcolor: {
        valType: 'data_array',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the color of each vertex',
            'Overrides *color*. While Red, green and blue colors',
            'are in the range of 0 and 255; in the case of having',
            'vertex color data in RGBA format, the alpha color',
            'should be normalized to be between 0 and 1.'
        ].join(' ')
    },
    facecolor: {
        valType: 'data_array',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the color of each face',
            'Overrides *color* and *vertexcolor*.'
        ].join(' ')
    },
    transforms: undefined
},

colorScaleAttrs('', {
    colorAttr: '`intensity`',
    showScaleDflt: true,
    editTypeOverride: 'calc'
}), {
    opacity: surfaceAttrs.opacity,

    // Flat shaded mode
    flatshading: {
        valType: 'boolean',
        role: 'style',
        dflt: false,
        editType: 'calc',
        description: [
            'Determines whether or not normal smoothing is applied to the meshes,',
            'creating meshes with an angular, low-poly look via flat reflections.'
        ].join(' ')
    },

    contour: {
        show: extendFlat({}, surfaceAttrs.contours.x.show, {
            description: [
                'Sets whether or not dynamic contours are shown on hover'
            ].join(' ')
        }),
        color: surfaceAttrs.contours.x.color,
        width: surfaceAttrs.contours.x.width,
        editType: 'calc'
    },

    lightposition: {
        x: extendFlat({}, surfaceAttrs.lightposition.x, {dflt: 1e5}),
        y: extendFlat({}, surfaceAttrs.lightposition.y, {dflt: 1e5}),
        z: extendFlat({}, surfaceAttrs.lightposition.z, {dflt: 0}),
        editType: 'calc'
    },
    lighting: extendFlat({
        vertexnormalsepsilon: {
            valType: 'number',
            role: 'style',
            min: 0.00,
            max: 1,
            dflt: 1e-12, // otherwise finely tessellated things eg. the brain will have no specular light reflection
            editType: 'calc',
            description: 'Epsilon for vertex normals calculation avoids math issues arising from degenerate geometry.'
        },
        facenormalsepsilon: {
            valType: 'number',
            role: 'style',
            min: 0.00,
            max: 1,
            dflt: 1e-6, // even the brain model doesn't appear to need finer than this
            editType: 'calc',
            description: 'Epsilon for face normals calculation avoids math issues arising from degenerate geometry.'
        },
        editType: 'calc'
    }, surfaceAttrs.lighting),

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {editType: 'calc'}),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
});


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/streamtube/calc.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/streamtube/calc.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");

function calc(gd, trace) {
    trace._len = Math.min(
        trace.u.length,
        trace.v.length,
        trace.w.length,
        trace.x.length,
        trace.y.length,
        trace.z.length
    );

    trace._u = filter(trace.u, trace._len);
    trace._v = filter(trace.v, trace._len);
    trace._w = filter(trace.w, trace._len);
    trace._x = filter(trace.x, trace._len);
    trace._y = filter(trace.y, trace._len);
    trace._z = filter(trace.z, trace._len);

    var grid = processGrid(trace);
    trace._gridFill = grid.fill;
    trace._Xs = grid.Xs;
    trace._Ys = grid.Ys;
    trace._Zs = grid.Zs;
    trace._len = grid.len;

    var slen = 0;
    var startx, starty, startz;
    if(trace.starts) {
        startx = filter(trace.starts.x || []);
        starty = filter(trace.starts.y || []);
        startz = filter(trace.starts.z || []);
        slen = Math.min(startx.length, starty.length, startz.length);
    }
    trace._startsX = startx || [];
    trace._startsY = starty || [];
    trace._startsZ = startz || [];

    var normMax = 0;
    var normMin = Infinity;
    var i;
    for(i = 0; i < trace._len; i++) {
        var u = trace._u[i];
        var v = trace._v[i];
        var w = trace._w[i];
        var norm = Math.sqrt(u * u + v * v + w * w);

        normMax = Math.max(normMax, norm);
        normMin = Math.min(normMin, norm);
    }

    colorscaleCalc(gd, trace, {
        vals: [normMin, normMax],
        containerStr: '',
        cLetter: 'c'
    });

    for(i = 0; i < slen; i++) {
        var sx = startx[i];
        grid.xMax = Math.max(grid.xMax, sx);
        grid.xMin = Math.min(grid.xMin, sx);

        var sy = starty[i];
        grid.yMax = Math.max(grid.yMax, sy);
        grid.yMin = Math.min(grid.yMin, sy);

        var sz = startz[i];
        grid.zMax = Math.max(grid.zMax, sz);
        grid.zMin = Math.min(grid.zMin, sz);
    }

    trace._slen = slen;
    trace._normMax = normMax;
    trace._xbnds = [grid.xMin, grid.xMax];
    trace._ybnds = [grid.yMin, grid.yMax];
    trace._zbnds = [grid.zMin, grid.zMax];
}

function processGrid(trace) {
    var x = trace._x;
    var y = trace._y;
    var z = trace._z;
    var len = trace._len;

    var i, j, k;

    var xMax = -Infinity;
    var xMin = Infinity;
    var yMax = -Infinity;
    var yMin = Infinity;
    var zMax = -Infinity;
    var zMin = Infinity;

    var gridFill = '';
    var filledX;
    var filledY;
    var filledZ;
    var firstX, lastX;
    var firstY, lastY;
    var firstZ, lastZ;
    if(len) {
        firstX = x[0];
        firstY = y[0];
        firstZ = z[0];
    }
    if(len > 1) {
        lastX = x[len - 1];
        lastY = y[len - 1];
        lastZ = z[len - 1];
    }

    for(i = 0; i < len; i++) {
        xMax = Math.max(xMax, x[i]);
        xMin = Math.min(xMin, x[i]);

        yMax = Math.max(yMax, y[i]);
        yMin = Math.min(yMin, y[i]);

        zMax = Math.max(zMax, z[i]);
        zMin = Math.min(zMin, z[i]);

        if(!filledX && x[i] !== firstX) {
            filledX = true;
            gridFill += 'x';
        }
        if(!filledY && y[i] !== firstY) {
            filledY = true;
            gridFill += 'y';
        }
        if(!filledZ && z[i] !== firstZ) {
            filledZ = true;
            gridFill += 'z';
        }
    }
    // fill if not filled - case of having dimension(s) with one item
    if(!filledX) gridFill += 'x';
    if(!filledY) gridFill += 'y';
    if(!filledZ) gridFill += 'z';

    var Xs = distinctVals(trace._x);
    var Ys = distinctVals(trace._y);
    var Zs = distinctVals(trace._z);

    gridFill = gridFill.replace('x', (firstX > lastX ? '-' : '+') + 'x');
    gridFill = gridFill.replace('y', (firstY > lastY ? '-' : '+') + 'y');
    gridFill = gridFill.replace('z', (firstZ > lastZ ? '-' : '+') + 'z');

    var empty = function() {
        len = 0;
        Xs = [];
        Ys = [];
        Zs = [];
    };

    // Over-specified mesh case, this would error in tube2mesh
    if(!len || len < Xs.length * Ys.length * Zs.length) empty();

    var getArray = function(c) { return c === 'x' ? x : c === 'y' ? y : z; };
    var getVals = function(c) { return c === 'x' ? Xs : c === 'y' ? Ys : Zs; };
    var getDir = function(c) { return c[len - 1] < c[0] ? -1 : 1; };

    var arrK = getArray(gridFill[1]);
    var arrJ = getArray(gridFill[3]);
    var arrI = getArray(gridFill[5]);
    var nk = getVals(gridFill[1]).length;
    var nj = getVals(gridFill[3]).length;
    var ni = getVals(gridFill[5]).length;

    var arbitrary = false;

    var getIndex = function(_i, _j, _k) {
        return nk * (nj * _i + _j) + _k;
    };

    var dirK = getDir(getArray(gridFill[1]));
    var dirJ = getDir(getArray(gridFill[3]));
    var dirI = getDir(getArray(gridFill[5]));

    for(i = 0; i < ni - 1; i++) {
        for(j = 0; j < nj - 1; j++) {
            for(k = 0; k < nk - 1; k++) {
                var q000 = getIndex(i, j, k);
                var q001 = getIndex(i, j, k + 1);
                var q010 = getIndex(i, j + 1, k);
                var q100 = getIndex(i + 1, j, k);

                if(
                    !(arrK[q000] * dirK < arrK[q001] * dirK) ||
                    !(arrJ[q000] * dirJ < arrJ[q010] * dirJ) ||
                    !(arrI[q000] * dirI < arrI[q100] * dirI)
                ) {
                    arbitrary = true;
                }

                if(arbitrary) break;
            }
            if(arbitrary) break;
        }
        if(arbitrary) break;
    }

    if(arbitrary) {
        Lib.warn('Encountered arbitrary coordinates! Unable to input data grid.');
        empty();
    }

    return {
        xMin: xMin,
        yMin: yMin,
        zMin: zMin,
        xMax: xMax,
        yMax: yMax,
        zMax: zMax,
        Xs: Xs,
        Ys: Ys,
        Zs: Zs,
        len: len,
        fill: gridFill
    };
}

function distinctVals(col) {
    return Lib.distinctVals(col).vals;
}

function filter(arr, len) {
    if(len === undefined) len = arr.length;

    // no need for casting typed arrays to numbers
    if(Lib.isTypedArray(arr)) return arr.subarray(0, len);

    var values = [];
    for(var i = 0; i < len; i++) {
        values[i] = +arr[i];
    }
    return values;
}

module.exports = {
    calc: calc,
    filter: filter,
    processGrid: processGrid
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC96aXAzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvbWVzaDNkL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zdHJlYW10dWJlL2NhbGMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsc0JBQXNCLG1CQUFPLENBQUMsZ0hBQXdDO0FBQ3RFLHlCQUF5QiwwSUFBNkQ7QUFDdEYsbUJBQW1CLG1CQUFPLENBQUMsd0ZBQXVCO0FBQ2xELGdCQUFnQixtQkFBTyxDQUFDLGdGQUF3Qjs7QUFFaEQsaUJBQWlCLG9HQUFzQzs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixpQkFBaUI7QUFDckc7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRkFBcUYsaUJBQWlCO0FBQ3RHO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtB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QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQ0FBZ0MsMENBQTBDO0FBQzFFLCtCQUErQiw2Q0FBNkM7QUFDNUUsOEJBQThCLG1DQUFtQzs7QUFFakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxZQUFZO0FBQzFCLGtCQUFrQixZQUFZO0FBQzlCLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0ZGE1OWUzMDNlMmEzZTkyMTgzMjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gemlwMyh4LCB5LCB6LCBsZW4pIHtcbiAgICBsZW4gPSBsZW4gfHwgeC5sZW5ndGg7XG5cbiAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGxlbik7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFt4W2ldLCB5W2ldLCB6W2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvclNjYWxlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvYXR0cmlidXRlcycpO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgc3VyZmFjZUF0dHJzID0gcmVxdWlyZSgnLi4vc3VyZmFjZS9hdHRyaWJ1dGVzJyk7XG52YXIgYmFzZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvYXR0cmlidXRlcycpO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZEZsYXQoe1xuICAgIHg6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIFggY29vcmRpbmF0ZXMgb2YgdGhlIHZlcnRpY2VzLiBUaGUgbnRoIGVsZW1lbnQgb2YgdmVjdG9ycyBgeGAsIGB5YCBhbmQgYHpgJyxcbiAgICAgICAgICAgICdqb2ludGx5IHJlcHJlc2VudCB0aGUgWCwgWSBhbmQgWiBjb29yZGluYXRlcyBvZiB0aGUgbnRoIHZlcnRleC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBZIGNvb3JkaW5hdGVzIG9mIHRoZSB2ZXJ0aWNlcy4gVGhlIG50aCBlbGVtZW50IG9mIHZlY3RvcnMgYHhgLCBgeWAgYW5kIGB6YCcsXG4gICAgICAgICAgICAnam9pbnRseSByZXByZXNlbnQgdGhlIFgsIFkgYW5kIFogY29vcmRpbmF0ZXMgb2YgdGhlIG50aCB2ZXJ0ZXguJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgejoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgWiBjb29yZGluYXRlcyBvZiB0aGUgdmVydGljZXMuIFRoZSBudGggZWxlbWVudCBvZiB2ZWN0b3JzIGB4YCwgYHlgIGFuZCBgemAnLFxuICAgICAgICAgICAgJ2pvaW50bHkgcmVwcmVzZW50IHRoZSBYLCBZIGFuZCBaIGNvb3JkaW5hdGVzIG9mIHRoZSBudGggdmVydGV4LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgaToge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQSB2ZWN0b3Igb2YgdmVydGV4IGluZGljZXMsIGkuZS4gaW50ZWdlciB2YWx1ZXMgYmV0d2VlbiAwIGFuZCB0aGUgbGVuZ3RoIG9mIHRoZSB2ZXJ0ZXgnLFxuICAgICAgICAgICAgJ3ZlY3RvcnMsIHJlcHJlc2VudGluZyB0aGUgKmZpcnN0KiB2ZXJ0ZXggb2YgYSB0cmlhbmdsZS4gRm9yIGV4YW1wbGUsIGB7aVttXSwgalttXSwga1ttXX1gJyxcbiAgICAgICAgICAgICd0b2dldGhlciByZXByZXNlbnQgZmFjZSBtICh0cmlhbmdsZSBtKSBpbiB0aGUgbWVzaCwgd2hlcmUgYGlbbV0gPSBuYCBwb2ludHMgdG8gdGhlIHRyaXBsZXQnLFxuICAgICAgICAgICAgJ2B7eFtuXSwgeVtuXSwgeltuXX1gIGluIHRoZSB2ZXJ0ZXggYXJyYXlzLiBUaGVyZWZvcmUsIGVhY2ggZWxlbWVudCBpbiBgaWAgcmVwcmVzZW50cyBhJyxcbiAgICAgICAgICAgICdwb2ludCBpbiBzcGFjZSwgd2hpY2ggaXMgdGhlIGZpcnN0IHZlcnRleCBvZiBhIHRyaWFuZ2xlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGo6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0EgdmVjdG9yIG9mIHZlcnRleCBpbmRpY2VzLCBpLmUuIGludGVnZXIgdmFsdWVzIGJldHdlZW4gMCBhbmQgdGhlIGxlbmd0aCBvZiB0aGUgdmVydGV4JyxcbiAgICAgICAgICAgICd2ZWN0b3JzLCByZXByZXNlbnRpbmcgdGhlICpzZWNvbmQqIHZlcnRleCBvZiBhIHRyaWFuZ2xlLiBGb3IgZXhhbXBsZSwgYHtpW21dLCBqW21dLCBrW21dfWAgJyxcbiAgICAgICAgICAgICd0b2dldGhlciByZXByZXNlbnQgZmFjZSBtICh0cmlhbmdsZSBtKSBpbiB0aGUgbWVzaCwgd2hlcmUgYGpbbV0gPSBuYCBwb2ludHMgdG8gdGhlIHRyaXBsZXQnLFxuICAgICAgICAgICAgJ2B7eFtuXSwgeVtuXSwgeltuXX1gIGluIHRoZSB2ZXJ0ZXggYXJyYXlzLiBUaGVyZWZvcmUsIGVhY2ggZWxlbWVudCBpbiBgamAgcmVwcmVzZW50cyBhJyxcbiAgICAgICAgICAgICdwb2ludCBpbiBzcGFjZSwgd2hpY2ggaXMgdGhlIHNlY29uZCB2ZXJ0ZXggb2YgYSB0cmlhbmdsZS4nXG4gICAgICAgIF0uam9pbignICcpXG5cbiAgICB9LFxuICAgIGs6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0EgdmVjdG9yIG9mIHZlcnRleCBpbmRpY2VzLCBpLmUuIGludGVnZXIgdmFsdWVzIGJldHdlZW4gMCBhbmQgdGhlIGxlbmd0aCBvZiB0aGUgdmVydGV4JyxcbiAgICAgICAgICAgICd2ZWN0b3JzLCByZXByZXNlbnRpbmcgdGhlICp0aGlyZCogdmVydGV4IG9mIGEgdHJpYW5nbGUuIEZvciBleGFtcGxlLCBge2lbbV0sIGpbbV0sIGtbbV19YCcsXG4gICAgICAgICAgICAndG9nZXRoZXIgcmVwcmVzZW50IGZhY2UgbSAodHJpYW5nbGUgbSkgaW4gdGhlIG1lc2gsIHdoZXJlIGBrW21dID0gbmAgcG9pbnRzIHRvIHRoZSB0cmlwbGV0ICcsXG4gICAgICAgICAgICAnYHt4W25dLCB5W25dLCB6W25dfWAgaW4gdGhlIHZlcnRleCBhcnJheXMuIFRoZXJlZm9yZSwgZWFjaCBlbGVtZW50IGluIGBrYCByZXByZXNlbnRzIGEnLFxuICAgICAgICAgICAgJ3BvaW50IGluIHNwYWNlLCB3aGljaCBpcyB0aGUgdGhpcmQgdmVydGV4IG9mIGEgdHJpYW5nbGUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuXG4gICAgfSxcblxuICAgIHRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgdGV4dCBlbGVtZW50cyBhc3NvY2lhdGVkIHdpdGggdGhlIHZlcnRpY2VzLicsXG4gICAgICAgICAgICAnSWYgdHJhY2UgYGhvdmVyaW5mb2AgY29udGFpbnMgYSAqdGV4dCogZmxhZyBhbmQgKmhvdmVydGV4dCogaXMgbm90IHNldCwnLFxuICAgICAgICAgICAgJ3RoZXNlIGVsZW1lbnRzIHdpbGwgYmUgc2VlbiBpbiB0aGUgaG92ZXIgbGFiZWxzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGhvdmVydGV4dDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTYW1lIGFzIGB0ZXh0YC4nXG4gICAgfSxcbiAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlQXR0cnMoe2VkaXRUeXBlOiAnY2FsYyd9KSxcblxuICAgIGRlbGF1bmF5YXhpczoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgdmFsdWVzOiBbICd4JywgJ3knLCAneicgXSxcbiAgICAgICAgZGZsdDogJ3onLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIERlbGF1bmF5IGF4aXMsIHdoaWNoIGlzIHRoZSBheGlzIHRoYXQgaXMgcGVycGVuZGljdWxhciB0byB0aGUgc3VyZmFjZSBvZiB0aGUnLFxuICAgICAgICAgICAgJ0RlbGF1bmF5IHRyaWFuZ3VsYXRpb24uJyxcbiAgICAgICAgICAgICdJdCBoYXMgYW4gZWZmZWN0IGlmIGBpYCwgYGpgLCBga2AgYXJlIG5vdCBwcm92aWRlZCBhbmQgYGFscGhhaHVsbGAgaXMgc2V0IHRvIGluZGljYXRlJyxcbiAgICAgICAgICAgICdEZWxhdW5heSB0cmlhbmd1bGF0aW9uLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgYWxwaGFodWxsOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBkZmx0OiAtMSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIGhvdyB0aGUgbWVzaCBzdXJmYWNlIHRyaWFuZ2xlcyBhcmUgZGVyaXZlZCBmcm9tIHRoZSBzZXQgb2YnLFxuICAgICAgICAgICAgJ3ZlcnRpY2VzIChwb2ludHMpIHJlcHJlc2VudGVkIGJ5IHRoZSBgeGAsIGB5YCBhbmQgYHpgIGFycmF5cywgaWYnLFxuICAgICAgICAgICAgJ3RoZSBgaWAsIGBqYCwgYGtgIGFycmF5cyBhcmUgbm90IHN1cHBsaWVkLicsXG4gICAgICAgICAgICAnRm9yIGdlbmVyYWwgdXNlIG9mIGBtZXNoM2RgIGl0IGlzIHByZWZlcnJlZCB0aGF0IGBpYCwgYGpgLCBga2AgYXJlJyxcbiAgICAgICAgICAgICdzdXBwbGllZC4nLFxuXG4gICAgICAgICAgICAnSWYgKi0xKiwgRGVsYXVuYXkgdHJpYW5ndWxhdGlvbiBpcyB1c2VkLCB3aGljaCBpcyBtYWlubHkgc3VpdGFibGUgaWYgdGhlJyxcbiAgICAgICAgICAgICdtZXNoIGlzIGEgc2luZ2xlLCBtb3JlIG9yIGxlc3MgbGF5ZXIgc3VyZmFjZSB0aGF0IGlzIHBlcnBlbmRpY3VsYXIgdG8gYGRlbGF1bmF5YXhpc2AuJyxcbiAgICAgICAgICAgICdJbiBjYXNlIHRoZSBgZGVsYXVuYXlheGlzYCBpbnRlcnNlY3RzIHRoZSBtZXNoIHN1cmZhY2UgYXQgbW9yZSB0aGFuIG9uZSBwb2ludCcsXG4gICAgICAgICAgICAnaXQgd2lsbCByZXN1bHQgdHJpYW5nbGVzIHRoYXQgYXJlIHZlcnkgbG9uZyBpbiB0aGUgZGltZW5zaW9uIG9mIGBkZWxhdW5heWF4aXNgLicsXG5cbiAgICAgICAgICAgICdJZiAqPjAqLCB0aGUgYWxwaGEtc2hhcGUgYWxnb3JpdGhtIGlzIHVzZWQuIEluIHRoaXMgY2FzZSwgdGhlIHBvc2l0aXZlIGBhbHBoYWh1bGxgIHZhbHVlJyxcbiAgICAgICAgICAgICdzaWduYWxzIHRoZSB1c2Ugb2YgdGhlIGFscGhhLXNoYXBlIGFsZ29yaXRobSwgX2FuZF8gaXRzIHZhbHVlJyxcbiAgICAgICAgICAgICdhY3RzIGFzIHRoZSBwYXJhbWV0ZXIgZm9yIHRoZSBtZXNoIGZpdHRpbmcuJyxcblxuICAgICAgICAgICAgJ0lmICowKiwgIHRoZSBjb252ZXgtaHVsbCBhbGdvcml0aG0gaXMgdXNlZC4gSXQgaXMgc3VpdGFibGUgZm9yIGNvbnZleCBib2RpZXMnLFxuICAgICAgICAgICAgJ29yIGlmIHRoZSBpbnRlbnRpb24gaXMgdG8gZW5jbG9zZSB0aGUgYHhgLCBgeWAgYW5kIGB6YCBwb2ludCBzZXQgaW50byBhIGNvbnZleCcsXG4gICAgICAgICAgICAnaHVsbC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGludGVuc2l0eToge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgaW50ZW5zaXR5IHZhbHVlcyBmb3IgdmVydGljZXMgb3IgY2VsbHMnLFxuICAgICAgICAgICAgJ2FzIGRlZmluZWQgYnkgYGludGVuc2l0eW1vZGVgLicsXG4gICAgICAgICAgICAnSXQgY2FuIGJlIHVzZWQgZm9yIHBsb3R0aW5nIGZpZWxkcyBvbiBtZXNoZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgaW50ZW5zaXR5bW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWyd2ZXJ0ZXgnLCAnY2VsbCddLFxuICAgICAgICBkZmx0OiAndmVydGV4JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgdGhlIHNvdXJjZSBvZiBgaW50ZW5zaXR5YCB2YWx1ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICAvLyBDb2xvciBmaWVsZFxuICAgIGNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29sb3Igb2YgdGhlIHdob2xlIG1lc2gnXG4gICAgfSxcbiAgICB2ZXJ0ZXhjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgY29sb3Igb2YgZWFjaCB2ZXJ0ZXgnLFxuICAgICAgICAgICAgJ092ZXJyaWRlcyAqY29sb3IqLiBXaGlsZSBSZWQsIGdyZWVuIGFuZCBibHVlIGNvbG9ycycsXG4gICAgICAgICAgICAnYXJlIGluIHRoZSByYW5nZSBvZiAwIGFuZCAyNTU7IGluIHRoZSBjYXNlIG9mIGhhdmluZycsXG4gICAgICAgICAgICAndmVydGV4IGNvbG9yIGRhdGEgaW4gUkdCQSBmb3JtYXQsIHRoZSBhbHBoYSBjb2xvcicsXG4gICAgICAgICAgICAnc2hvdWxkIGJlIG5vcm1hbGl6ZWQgdG8gYmUgYmV0d2VlbiAwIGFuZCAxLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGZhY2Vjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgY29sb3Igb2YgZWFjaCBmYWNlJyxcbiAgICAgICAgICAgICdPdmVycmlkZXMgKmNvbG9yKiBhbmQgKnZlcnRleGNvbG9yKi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB0cmFuc2Zvcm1zOiB1bmRlZmluZWRcbn0sXG5cbmNvbG9yU2NhbGVBdHRycygnJywge1xuICAgIGNvbG9yQXR0cjogJ2BpbnRlbnNpdHlgJyxcbiAgICBzaG93U2NhbGVEZmx0OiB0cnVlLFxuICAgIGVkaXRUeXBlT3ZlcnJpZGU6ICdjYWxjJ1xufSksIHtcbiAgICBvcGFjaXR5OiBzdXJmYWNlQXR0cnMub3BhY2l0eSxcblxuICAgIC8vIEZsYXQgc2hhZGVkIG1vZGVcbiAgICBmbGF0c2hhZGluZzoge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3Qgbm9ybWFsIHNtb290aGluZyBpcyBhcHBsaWVkIHRvIHRoZSBtZXNoZXMsJyxcbiAgICAgICAgICAgICdjcmVhdGluZyBtZXNoZXMgd2l0aCBhbiBhbmd1bGFyLCBsb3ctcG9seSBsb29rIHZpYSBmbGF0IHJlZmxlY3Rpb25zLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgY29udG91cjoge1xuICAgICAgICBzaG93OiBleHRlbmRGbGF0KHt9LCBzdXJmYWNlQXR0cnMuY29udG91cnMueC5zaG93LCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHdoZXRoZXIgb3Igbm90IGR5bmFtaWMgY29udG91cnMgYXJlIHNob3duIG9uIGhvdmVyJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSksXG4gICAgICAgIGNvbG9yOiBzdXJmYWNlQXR0cnMuY29udG91cnMueC5jb2xvcixcbiAgICAgICAgd2lkdGg6IHN1cmZhY2VBdHRycy5jb250b3Vycy54LndpZHRoLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcblxuICAgIGxpZ2h0cG9zaXRpb246IHtcbiAgICAgICAgeDogZXh0ZW5kRmxhdCh7fSwgc3VyZmFjZUF0dHJzLmxpZ2h0cG9zaXRpb24ueCwge2RmbHQ6IDFlNX0pLFxuICAgICAgICB5OiBleHRlbmRGbGF0KHt9LCBzdXJmYWNlQXR0cnMubGlnaHRwb3NpdGlvbi55LCB7ZGZsdDogMWU1fSksXG4gICAgICAgIHo6IGV4dGVuZEZsYXQoe30sIHN1cmZhY2VBdHRycy5saWdodHBvc2l0aW9uLnosIHtkZmx0OiAwfSksXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICB9LFxuICAgIGxpZ2h0aW5nOiBleHRlbmRGbGF0KHtcbiAgICAgICAgdmVydGV4bm9ybWFsc2Vwc2lsb246IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMC4wMCxcbiAgICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICAgIGRmbHQ6IDFlLTEyLCAvLyBvdGhlcndpc2UgZmluZWx5IHRlc3NlbGxhdGVkIHRoaW5ncyBlZy4gdGhlIGJyYWluIHdpbGwgaGF2ZSBubyBzcGVjdWxhciBsaWdodCByZWZsZWN0aW9uXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdFcHNpbG9uIGZvciB2ZXJ0ZXggbm9ybWFscyBjYWxjdWxhdGlvbiBhdm9pZHMgbWF0aCBpc3N1ZXMgYXJpc2luZyBmcm9tIGRlZ2VuZXJhdGUgZ2VvbWV0cnkuJ1xuICAgICAgICB9LFxuICAgICAgICBmYWNlbm9ybWFsc2Vwc2lsb246IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMC4wMCxcbiAgICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICAgIGRmbHQ6IDFlLTYsIC8vIGV2ZW4gdGhlIGJyYWluIG1vZGVsIGRvZXNuJ3QgYXBwZWFyIHRvIG5lZWQgZmluZXIgdGhhbiB0aGlzXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdFcHNpbG9uIGZvciBmYWNlIG5vcm1hbHMgY2FsY3VsYXRpb24gYXZvaWRzIG1hdGggaXNzdWVzIGFyaXNpbmcgZnJvbSBkZWdlbmVyYXRlIGdlb21ldHJ5LidcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sIHN1cmZhY2VBdHRycy5saWdodGluZyksXG5cbiAgICBob3ZlcmluZm86IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5ob3ZlcmluZm8sIHtlZGl0VHlwZTogJ2NhbGMnfSksXG4gICAgc2hvd2xlZ2VuZDogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLnNob3dsZWdlbmQsIHtkZmx0OiBmYWxzZX0pXG59KTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGNvbG9yc2NhbGVDYWxjID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2NhbGMnKTtcblxuZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB0cmFjZS5fbGVuID0gTWF0aC5taW4oXG4gICAgICAgIHRyYWNlLnUubGVuZ3RoLFxuICAgICAgICB0cmFjZS52Lmxlbmd0aCxcbiAgICAgICAgdHJhY2Uudy5sZW5ndGgsXG4gICAgICAgIHRyYWNlLngubGVuZ3RoLFxuICAgICAgICB0cmFjZS55Lmxlbmd0aCxcbiAgICAgICAgdHJhY2Uuei5sZW5ndGhcbiAgICApO1xuXG4gICAgdHJhY2UuX3UgPSBmaWx0ZXIodHJhY2UudSwgdHJhY2UuX2xlbik7XG4gICAgdHJhY2UuX3YgPSBmaWx0ZXIodHJhY2UudiwgdHJhY2UuX2xlbik7XG4gICAgdHJhY2UuX3cgPSBmaWx0ZXIodHJhY2UudywgdHJhY2UuX2xlbik7XG4gICAgdHJhY2UuX3ggPSBmaWx0ZXIodHJhY2UueCwgdHJhY2UuX2xlbik7XG4gICAgdHJhY2UuX3kgPSBmaWx0ZXIodHJhY2UueSwgdHJhY2UuX2xlbik7XG4gICAgdHJhY2UuX3ogPSBmaWx0ZXIodHJhY2UueiwgdHJhY2UuX2xlbik7XG5cbiAgICB2YXIgZ3JpZCA9IHByb2Nlc3NHcmlkKHRyYWNlKTtcbiAgICB0cmFjZS5fZ3JpZEZpbGwgPSBncmlkLmZpbGw7XG4gICAgdHJhY2UuX1hzID0gZ3JpZC5YcztcbiAgICB0cmFjZS5fWXMgPSBncmlkLllzO1xuICAgIHRyYWNlLl9acyA9IGdyaWQuWnM7XG4gICAgdHJhY2UuX2xlbiA9IGdyaWQubGVuO1xuXG4gICAgdmFyIHNsZW4gPSAwO1xuICAgIHZhciBzdGFydHgsIHN0YXJ0eSwgc3RhcnR6O1xuICAgIGlmKHRyYWNlLnN0YXJ0cykge1xuICAgICAgICBzdGFydHggPSBmaWx0ZXIodHJhY2Uuc3RhcnRzLnggfHwgW10pO1xuICAgICAgICBzdGFydHkgPSBmaWx0ZXIodHJhY2Uuc3RhcnRzLnkgfHwgW10pO1xuICAgICAgICBzdGFydHogPSBmaWx0ZXIodHJhY2Uuc3RhcnRzLnogfHwgW10pO1xuICAgICAgICBzbGVuID0gTWF0aC5taW4oc3RhcnR4Lmxlbmd0aCwgc3RhcnR5Lmxlbmd0aCwgc3RhcnR6Lmxlbmd0aCk7XG4gICAgfVxuICAgIHRyYWNlLl9zdGFydHNYID0gc3RhcnR4IHx8IFtdO1xuICAgIHRyYWNlLl9zdGFydHNZID0gc3RhcnR5IHx8IFtdO1xuICAgIHRyYWNlLl9zdGFydHNaID0gc3RhcnR6IHx8IFtdO1xuXG4gICAgdmFyIG5vcm1NYXggPSAwO1xuICAgIHZhciBub3JtTWluID0gSW5maW5pdHk7XG4gICAgdmFyIGk7XG4gICAgZm9yKGkgPSAwOyBpIDwgdHJhY2UuX2xlbjsgaSsrKSB7XG4gICAgICAgIHZhciB1ID0gdHJhY2UuX3VbaV07XG4gICAgICAgIHZhciB2ID0gdHJhY2UuX3ZbaV07XG4gICAgICAgIHZhciB3ID0gdHJhY2UuX3dbaV07XG4gICAgICAgIHZhciBub3JtID0gTWF0aC5zcXJ0KHUgKiB1ICsgdiAqIHYgKyB3ICogdyk7XG5cbiAgICAgICAgbm9ybU1heCA9IE1hdGgubWF4KG5vcm1NYXgsIG5vcm0pO1xuICAgICAgICBub3JtTWluID0gTWF0aC5taW4obm9ybU1pbiwgbm9ybSk7XG4gICAgfVxuXG4gICAgY29sb3JzY2FsZUNhbGMoZ2QsIHRyYWNlLCB7XG4gICAgICAgIHZhbHM6IFtub3JtTWluLCBub3JtTWF4XSxcbiAgICAgICAgY29udGFpbmVyU3RyOiAnJyxcbiAgICAgICAgY0xldHRlcjogJ2MnXG4gICAgfSk7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBzbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHN4ID0gc3RhcnR4W2ldO1xuICAgICAgICBncmlkLnhNYXggPSBNYXRoLm1heChncmlkLnhNYXgsIHN4KTtcbiAgICAgICAgZ3JpZC54TWluID0gTWF0aC5taW4oZ3JpZC54TWluLCBzeCk7XG5cbiAgICAgICAgdmFyIHN5ID0gc3RhcnR5W2ldO1xuICAgICAgICBncmlkLnlNYXggPSBNYXRoLm1heChncmlkLnlNYXgsIHN5KTtcbiAgICAgICAgZ3JpZC55TWluID0gTWF0aC5taW4oZ3JpZC55TWluLCBzeSk7XG5cbiAgICAgICAgdmFyIHN6ID0gc3RhcnR6W2ldO1xuICAgICAgICBncmlkLnpNYXggPSBNYXRoLm1heChncmlkLnpNYXgsIHN6KTtcbiAgICAgICAgZ3JpZC56TWluID0gTWF0aC5taW4oZ3JpZC56TWluLCBzeik7XG4gICAgfVxuXG4gICAgdHJhY2UuX3NsZW4gPSBzbGVuO1xuICAgIHRyYWNlLl9ub3JtTWF4ID0gbm9ybU1heDtcbiAgICB0cmFjZS5feGJuZHMgPSBbZ3JpZC54TWluLCBncmlkLnhNYXhdO1xuICAgIHRyYWNlLl95Ym5kcyA9IFtncmlkLnlNaW4sIGdyaWQueU1heF07XG4gICAgdHJhY2UuX3pibmRzID0gW2dyaWQuek1pbiwgZ3JpZC56TWF4XTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0dyaWQodHJhY2UpIHtcbiAgICB2YXIgeCA9IHRyYWNlLl94O1xuICAgIHZhciB5ID0gdHJhY2UuX3k7XG4gICAgdmFyIHogPSB0cmFjZS5fejtcbiAgICB2YXIgbGVuID0gdHJhY2UuX2xlbjtcblxuICAgIHZhciBpLCBqLCBrO1xuXG4gICAgdmFyIHhNYXggPSAtSW5maW5pdHk7XG4gICAgdmFyIHhNaW4gPSBJbmZpbml0eTtcbiAgICB2YXIgeU1heCA9IC1JbmZpbml0eTtcbiAgICB2YXIgeU1pbiA9IEluZmluaXR5O1xuICAgIHZhciB6TWF4ID0gLUluZmluaXR5O1xuICAgIHZhciB6TWluID0gSW5maW5pdHk7XG5cbiAgICB2YXIgZ3JpZEZpbGwgPSAnJztcbiAgICB2YXIgZmlsbGVkWDtcbiAgICB2YXIgZmlsbGVkWTtcbiAgICB2YXIgZmlsbGVkWjtcbiAgICB2YXIgZmlyc3RYLCBsYXN0WDtcbiAgICB2YXIgZmlyc3RZLCBsYXN0WTtcbiAgICB2YXIgZmlyc3RaLCBsYXN0WjtcbiAgICBpZihsZW4pIHtcbiAgICAgICAgZmlyc3RYID0geFswXTtcbiAgICAgICAgZmlyc3RZID0geVswXTtcbiAgICAgICAgZmlyc3RaID0gelswXTtcbiAgICB9XG4gICAgaWYobGVuID4gMSkge1xuICAgICAgICBsYXN0WCA9IHhbbGVuIC0gMV07XG4gICAgICAgIGxhc3RZID0geVtsZW4gLSAxXTtcbiAgICAgICAgbGFzdFogPSB6W2xlbiAtIDFdO1xuICAgIH1cblxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHhNYXggPSBNYXRoLm1heCh4TWF4LCB4W2ldKTtcbiAgICAgICAgeE1pbiA9IE1hdGgubWluKHhNaW4sIHhbaV0pO1xuXG4gICAgICAgIHlNYXggPSBNYXRoLm1heCh5TWF4LCB5W2ldKTtcbiAgICAgICAgeU1pbiA9IE1hdGgubWluKHlNaW4sIHlbaV0pO1xuXG4gICAgICAgIHpNYXggPSBNYXRoLm1heCh6TWF4LCB6W2ldKTtcbiAgICAgICAgek1pbiA9IE1hdGgubWluKHpNaW4sIHpbaV0pO1xuXG4gICAgICAgIGlmKCFmaWxsZWRYICYmIHhbaV0gIT09IGZpcnN0WCkge1xuICAgICAgICAgICAgZmlsbGVkWCA9IHRydWU7XG4gICAgICAgICAgICBncmlkRmlsbCArPSAneCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWZpbGxlZFkgJiYgeVtpXSAhPT0gZmlyc3RZKSB7XG4gICAgICAgICAgICBmaWxsZWRZID0gdHJ1ZTtcbiAgICAgICAgICAgIGdyaWRGaWxsICs9ICd5JztcbiAgICAgICAgfVxuICAgICAgICBpZighZmlsbGVkWiAmJiB6W2ldICE9PSBmaXJzdFopIHtcbiAgICAgICAgICAgIGZpbGxlZFogPSB0cnVlO1xuICAgICAgICAgICAgZ3JpZEZpbGwgKz0gJ3onO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGZpbGwgaWYgbm90IGZpbGxlZCAtIGNhc2Ugb2YgaGF2aW5nIGRpbWVuc2lvbihzKSB3aXRoIG9uZSBpdGVtXG4gICAgaWYoIWZpbGxlZFgpIGdyaWRGaWxsICs9ICd4JztcbiAgICBpZighZmlsbGVkWSkgZ3JpZEZpbGwgKz0gJ3knO1xuICAgIGlmKCFmaWxsZWRaKSBncmlkRmlsbCArPSAneic7XG5cbiAgICB2YXIgWHMgPSBkaXN0aW5jdFZhbHModHJhY2UuX3gpO1xuICAgIHZhciBZcyA9IGRpc3RpbmN0VmFscyh0cmFjZS5feSk7XG4gICAgdmFyIFpzID0gZGlzdGluY3RWYWxzKHRyYWNlLl96KTtcblxuICAgIGdyaWRGaWxsID0gZ3JpZEZpbGwucmVwbGFjZSgneCcsIChmaXJzdFggPiBsYXN0WCA/ICctJyA6ICcrJykgKyAneCcpO1xuICAgIGdyaWRGaWxsID0gZ3JpZEZpbGwucmVwbGFjZSgneScsIChmaXJzdFkgPiBsYXN0WSA/ICctJyA6ICcrJykgKyAneScpO1xuICAgIGdyaWRGaWxsID0gZ3JpZEZpbGwucmVwbGFjZSgneicsIChmaXJzdFogPiBsYXN0WiA/ICctJyA6ICcrJykgKyAneicpO1xuXG4gICAgdmFyIGVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxlbiA9IDA7XG4gICAgICAgIFhzID0gW107XG4gICAgICAgIFlzID0gW107XG4gICAgICAgIFpzID0gW107XG4gICAgfTtcblxuICAgIC8vIE92ZXItc3BlY2lmaWVkIG1lc2ggY2FzZSwgdGhpcyB3b3VsZCBlcnJvciBpbiB0dWJlMm1lc2hcbiAgICBpZighbGVuIHx8IGxlbiA8IFhzLmxlbmd0aCAqIFlzLmxlbmd0aCAqIFpzLmxlbmd0aCkgZW1wdHkoKTtcblxuICAgIHZhciBnZXRBcnJheSA9IGZ1bmN0aW9uKGMpIHsgcmV0dXJuIGMgPT09ICd4JyA/IHggOiBjID09PSAneScgPyB5IDogejsgfTtcbiAgICB2YXIgZ2V0VmFscyA9IGZ1bmN0aW9uKGMpIHsgcmV0dXJuIGMgPT09ICd4JyA/IFhzIDogYyA9PT0gJ3knID8gWXMgOiBaczsgfTtcbiAgICB2YXIgZ2V0RGlyID0gZnVuY3Rpb24oYykgeyByZXR1cm4gY1tsZW4gLSAxXSA8IGNbMF0gPyAtMSA6IDE7IH07XG5cbiAgICB2YXIgYXJySyA9IGdldEFycmF5KGdyaWRGaWxsWzFdKTtcbiAgICB2YXIgYXJySiA9IGdldEFycmF5KGdyaWRGaWxsWzNdKTtcbiAgICB2YXIgYXJySSA9IGdldEFycmF5KGdyaWRGaWxsWzVdKTtcbiAgICB2YXIgbmsgPSBnZXRWYWxzKGdyaWRGaWxsWzFdKS5sZW5ndGg7XG4gICAgdmFyIG5qID0gZ2V0VmFscyhncmlkRmlsbFszXSkubGVuZ3RoO1xuICAgIHZhciBuaSA9IGdldFZhbHMoZ3JpZEZpbGxbNV0pLmxlbmd0aDtcblxuICAgIHZhciBhcmJpdHJhcnkgPSBmYWxzZTtcblxuICAgIHZhciBnZXRJbmRleCA9IGZ1bmN0aW9uKF9pLCBfaiwgX2spIHtcbiAgICAgICAgcmV0dXJuIG5rICogKG5qICogX2kgKyBfaikgKyBfaztcbiAgICB9O1xuXG4gICAgdmFyIGRpcksgPSBnZXREaXIoZ2V0QXJyYXkoZ3JpZEZpbGxbMV0pKTtcbiAgICB2YXIgZGlySiA9IGdldERpcihnZXRBcnJheShncmlkRmlsbFszXSkpO1xuICAgIHZhciBkaXJJID0gZ2V0RGlyKGdldEFycmF5KGdyaWRGaWxsWzVdKSk7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBuaSAtIDE7IGkrKykge1xuICAgICAgICBmb3IoaiA9IDA7IGogPCBuaiAtIDE7IGorKykge1xuICAgICAgICAgICAgZm9yKGsgPSAwOyBrIDwgbmsgLSAxOyBrKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcTAwMCA9IGdldEluZGV4KGksIGosIGspO1xuICAgICAgICAgICAgICAgIHZhciBxMDAxID0gZ2V0SW5kZXgoaSwgaiwgayArIDEpO1xuICAgICAgICAgICAgICAgIHZhciBxMDEwID0gZ2V0SW5kZXgoaSwgaiArIDEsIGspO1xuICAgICAgICAgICAgICAgIHZhciBxMTAwID0gZ2V0SW5kZXgoaSArIDEsIGosIGspO1xuXG4gICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgICEoYXJyS1txMDAwXSAqIGRpcksgPCBhcnJLW3EwMDFdICogZGlySykgfHxcbiAgICAgICAgICAgICAgICAgICAgIShhcnJKW3EwMDBdICogZGlySiA8IGFyckpbcTAxMF0gKiBkaXJKKSB8fFxuICAgICAgICAgICAgICAgICAgICAhKGFycklbcTAwMF0gKiBkaXJJIDwgYXJySVtxMTAwXSAqIGRpckkpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyYml0cmFyeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoYXJiaXRyYXJ5KSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGFyYml0cmFyeSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYXJiaXRyYXJ5KSBicmVhaztcbiAgICB9XG5cbiAgICBpZihhcmJpdHJhcnkpIHtcbiAgICAgICAgTGliLndhcm4oJ0VuY291bnRlcmVkIGFyYml0cmFyeSBjb29yZGluYXRlcyEgVW5hYmxlIHRvIGlucHV0IGRhdGEgZ3JpZC4nKTtcbiAgICAgICAgZW1wdHkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4TWluOiB4TWluLFxuICAgICAgICB5TWluOiB5TWluLFxuICAgICAgICB6TWluOiB6TWluLFxuICAgICAgICB4TWF4OiB4TWF4LFxuICAgICAgICB5TWF4OiB5TWF4LFxuICAgICAgICB6TWF4OiB6TWF4LFxuICAgICAgICBYczogWHMsXG4gICAgICAgIFlzOiBZcyxcbiAgICAgICAgWnM6IFpzLFxuICAgICAgICBsZW46IGxlbixcbiAgICAgICAgZmlsbDogZ3JpZEZpbGxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkaXN0aW5jdFZhbHMoY29sKSB7XG4gICAgcmV0dXJuIExpYi5kaXN0aW5jdFZhbHMoY29sKS52YWxzO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXIoYXJyLCBsZW4pIHtcbiAgICBpZihsZW4gPT09IHVuZGVmaW5lZCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICAgIC8vIG5vIG5lZWQgZm9yIGNhc3RpbmcgdHlwZWQgYXJyYXlzIHRvIG51bWJlcnNcbiAgICBpZihMaWIuaXNUeXBlZEFycmF5KGFycikpIHJldHVybiBhcnIuc3ViYXJyYXkoMCwgbGVuKTtcblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFsdWVzW2ldID0gK2FycltpXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2FsYzogY2FsYyxcbiAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICBwcm9jZXNzR3JpZDogcHJvY2Vzc0dyaWRcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9