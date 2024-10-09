(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_gl-mat4_fromQuat_js-node_modules_plotly_js_src_plots_cartesian_type_defaults_js--a8a16d"],{

/***/ "./node_modules/gl-mat4/fromQuat.js":
/*!******************************************!*\
  !*** ./node_modules/gl-mat4/fromQuat.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/type_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/type_defaults.js ***!
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



var traceIs = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js").traceIs;
var autoType = __webpack_require__(/*! ./axis_autotype */ "./node_modules/plotly.js/src/plots/cartesian/axis_autotype.js");

/*
 *  data: the plot data to use in choosing auto type
 *  name: axis object name (ie 'xaxis') if one should be stored
 */
module.exports = function handleTypeDefaults(containerIn, containerOut, coerce, options) {
    var axType = coerce('type', (options.splomStash || {}).type);

    if(axType === '-') {
        setAutoType(containerOut, options.data);

        if(containerOut.type === '-') {
            containerOut.type = 'linear';
        } else {
            // copy autoType back to input axis
            // note that if this object didn't exist
            // in the input layout, we have to put it in
            // this happens in the main supplyDefaults function
            containerIn.type = containerOut.type;
        }
    }
};

function setAutoType(ax, data) {
    // new logic: let people specify any type they want,
    // only autotype if type is '-'
    if(ax.type !== '-') return;

    var id = ax._id;
    var axLetter = id.charAt(0);
    var i;

    // support 3d
    if(id.indexOf('scene') !== -1) id = axLetter;

    var d0 = getFirstNonEmptyTrace(data, id, axLetter);
    if(!d0) return;

    // first check for histograms, as the count direction
    // should always default to a linear axis
    if(d0.type === 'histogram' &&
        axLetter === {v: 'y', h: 'x'}[d0.orientation || 'v']
    ) {
        ax.type = 'linear';
        return;
    }

    var calAttr = axLetter + 'calendar';
    var calendar = d0[calAttr];
    var opts = {noMultiCategory: !traceIs(d0, 'cartesian') || traceIs(d0, 'noMultiCategory')};

    // To not confuse 2D x/y used for per-box sample points for multicategory coordinates
    if(d0.type === 'box' && d0._hasPreCompStats &&
        axLetter === {h: 'x', v: 'y'}[d0.orientation || 'v']
    ) {
        opts.noMultiCategory = true;
    }

    // check all boxes on this x axis to see
    // if they're dates, numbers, or categories
    if(isBoxWithoutPositionCoords(d0, axLetter)) {
        var posLetter = getBoxPosLetter(d0);
        var boxPositions = [];

        for(i = 0; i < data.length; i++) {
            var trace = data[i];
            if(!traceIs(trace, 'box-violin') || (trace[axLetter + 'axis'] || axLetter) !== id) continue;

            if(trace[posLetter] !== undefined) boxPositions.push(trace[posLetter][0]);
            else if(trace.name !== undefined) boxPositions.push(trace.name);
            else boxPositions.push('text');

            if(trace[calAttr] !== calendar) calendar = undefined;
        }

        ax.type = autoType(boxPositions, calendar, opts);
    } else if(d0.type === 'splom') {
        var dimensions = d0.dimensions;
        var dim = dimensions[d0._axesDim[id]];
        if(dim.visible) ax.type = autoType(dim.values, calendar, opts);
    } else {
        ax.type = autoType(d0[axLetter] || [d0[axLetter + '0']], calendar, opts);
    }
}

function getFirstNonEmptyTrace(data, id, axLetter) {
    for(var i = 0; i < data.length; i++) {
        var trace = data[i];

        if(trace.type === 'splom' &&
                trace._length > 0 &&
                (trace['_' + axLetter + 'axes'] || {})[id]
        ) {
            return trace;
        }

        if((trace[axLetter + 'axis'] || axLetter) === id) {
            if(isBoxWithoutPositionCoords(trace, axLetter)) {
                return trace;
            } else if((trace[axLetter] || []).length || trace[axLetter + '0']) {
                return trace;
            }
        }
    }
}

function getBoxPosLetter(trace) {
    return {v: 'x', h: 'y'}[trace.orientation || 'v'];
}

function isBoxWithoutPositionCoords(trace, axLetter) {
    var posLetter = getBoxPosLetter(trace);
    var isBox = traceIs(trace, 'box-violin');
    var isCandlestick = traceIs(trace._fullInput || {}, 'candlestick');

    return (
        isBox &&
        !isCandlestick &&
        axLetter === posLetter &&
        trace[posLetter] === undefined &&
        trace[posLetter + '0'] === undefined
    );
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/domain.js":
/*!****************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/domain.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var extendFlat = __webpack_require__(/*! ../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

/**
 * Make a xy domain attribute group
 *
 * @param {object} opts
 *   @param {string}
 *     opts.name: name to be inserted in the default description
 *   @param {boolean}
 *     opts.trace: set to true for trace containers
 *   @param {string}
 *     opts.editType: editType for all pieces
 *   @param {boolean}
 *     opts.noGridCell: set to true to omit `row` and `column`
 *
 * @param {object} extra
 *   @param {string}
 *     extra.description: extra description. N.B we use
 *     a separate extra container to make it compatible with
 *     the compress_attributes transform.
 *
 * @return {object} attributes object containing {x,y} as specified
 */
exports.attributes = function(opts, extra) {
    opts = opts || {};
    extra = extra || {};

    var base = {
        valType: 'info_array',
        role: 'info',
        editType: opts.editType,
        items: [
            {valType: 'number', min: 0, max: 1, editType: opts.editType},
            {valType: 'number', min: 0, max: 1, editType: opts.editType}
        ],
        dflt: [0, 1]
    };

    var namePart = opts.name ? opts.name + ' ' : '';
    var contPart = opts.trace ? 'trace ' : 'subplot ';
    var descPart = extra.description ? ' ' + extra.description : '';

    var out = {
        x: extendFlat({}, base, {
            description: [
                'Sets the horizontal domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        y: extendFlat({}, base, {
            description: [
                'Sets the vertical domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        editType: opts.editType
    };

    if(!opts.noGridCell) {
        out.row = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this row in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
        out.column = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this column in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
    }

    return out;
};

exports.defaults = function(containerOut, layout, coerce, dfltDomains) {
    var dfltX = (dfltDomains && dfltDomains.x) || [0, 1];
    var dfltY = (dfltDomains && dfltDomains.y) || [0, 1];

    var grid = layout.grid;
    if(grid) {
        var column = coerce('domain.column');
        if(column !== undefined) {
            if(column < grid.columns) dfltX = grid._domains.x[column];
            else delete containerOut.domain.column;
        }

        var row = coerce('domain.row');
        if(row !== undefined) {
            if(row < grid.rows) dfltY = grid._domains.y[row];
            else delete containerOut.domain.row;
        }
    }

    var x = coerce('domain.x', dfltX);
    var y = coerce('domain.y', dfltY);

    // don't accept bad input data
    if(!(x[0] < x[1])) containerOut.domain.x = dfltX.slice();
    if(!(y[0] < y[1])) containerOut.domain.y = dfltY.slice();
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/project.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/project.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




function xformMatrix(m, v) {
    var out = [0, 0, 0, 0];
    var i, j;

    for(i = 0; i < 4; ++i) {
        for(j = 0; j < 4; ++j) {
            out[j] += m[4 * i + j] * v[i];
        }
    }

    return out;
}

function project(camera, v) {
    var p = xformMatrix(camera.projection,
        xformMatrix(camera.view,
        xformMatrix(camera.model, [v[0], v[1], v[2], 1])));
    return p;
}

module.exports = project;


/***/ }),

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

/***/ "?a259":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvZnJvbVF1YXQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2NhcnRlc2lhbi90eXBlX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9kb21haW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2dsM2QvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC96aXAzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvbWVzaDNkL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS9pZ25vcmVkfC9ob21lL2FsZXgvZ2l0L0RJd2Vic2l0ZS1yZWRlc2lnbi9ub2RlX21vZHVsZXMvYmlnLXJhdC9ub2RlX21vZHVsZXMvYm4uanMvbGlifGJ1ZmZlciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLE1BQU07QUFDakIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLHdCQUF3QixpQ0FBaUMsVUFBVTtBQUNuRSx3QkFBd0IsaUNBQWlDLFVBQVU7QUFDbkUsd0JBQXdCLGlDQUFpQyxRQUFRO0FBQ2pFO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTCw0QkFBNEIsd0JBQXdCLGlCQUFpQjtBQUNyRSw2QkFBNkIseUJBQXlCLFlBQVk7QUFDbEUsQ0FBQzs7Ozs7Ozs7Ozs7QUM3UEQsZSIsImZpbGUiOiJjaGFydGJkMjYxODllMjRhM2E2NWY5MDk3LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmcm9tUXVhdDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHl4ID0geSAqIHgyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgenggPSB6ICogeDIsXG4gICAgICAgIHp5ID0geiAqIHkyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuXG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG5cbiAgICBvdXRbOF0gPSB6eCArIHd5O1xuICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICAgIG91dFsxMV0gPSAwO1xuXG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTsiLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB0cmFjZUlzID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKS50cmFjZUlzO1xudmFyIGF1dG9UeXBlID0gcmVxdWlyZSgnLi9heGlzX2F1dG90eXBlJyk7XG5cbi8qXG4gKiAgZGF0YTogdGhlIHBsb3QgZGF0YSB0byB1c2UgaW4gY2hvb3NpbmcgYXV0byB0eXBlXG4gKiAgbmFtZTogYXhpcyBvYmplY3QgbmFtZSAoaWUgJ3hheGlzJykgaWYgb25lIHNob3VsZCBiZSBzdG9yZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVUeXBlRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIGF4VHlwZSA9IGNvZXJjZSgndHlwZScsIChvcHRpb25zLnNwbG9tU3Rhc2ggfHwge30pLnR5cGUpO1xuXG4gICAgaWYoYXhUeXBlID09PSAnLScpIHtcbiAgICAgICAgc2V0QXV0b1R5cGUoY29udGFpbmVyT3V0LCBvcHRpb25zLmRhdGEpO1xuXG4gICAgICAgIGlmKGNvbnRhaW5lck91dC50eXBlID09PSAnLScpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lck91dC50eXBlID0gJ2xpbmVhcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb3B5IGF1dG9UeXBlIGJhY2sgdG8gaW5wdXQgYXhpc1xuICAgICAgICAgICAgLy8gbm90ZSB0aGF0IGlmIHRoaXMgb2JqZWN0IGRpZG4ndCBleGlzdFxuICAgICAgICAgICAgLy8gaW4gdGhlIGlucHV0IGxheW91dCwgd2UgaGF2ZSB0byBwdXQgaXQgaW5cbiAgICAgICAgICAgIC8vIHRoaXMgaGFwcGVucyBpbiB0aGUgbWFpbiBzdXBwbHlEZWZhdWx0cyBmdW5jdGlvblxuICAgICAgICAgICAgY29udGFpbmVySW4udHlwZSA9IGNvbnRhaW5lck91dC50eXBlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gc2V0QXV0b1R5cGUoYXgsIGRhdGEpIHtcbiAgICAvLyBuZXcgbG9naWM6IGxldCBwZW9wbGUgc3BlY2lmeSBhbnkgdHlwZSB0aGV5IHdhbnQsXG4gICAgLy8gb25seSBhdXRvdHlwZSBpZiB0eXBlIGlzICctJ1xuICAgIGlmKGF4LnR5cGUgIT09ICctJykgcmV0dXJuO1xuXG4gICAgdmFyIGlkID0gYXguX2lkO1xuICAgIHZhciBheExldHRlciA9IGlkLmNoYXJBdCgwKTtcbiAgICB2YXIgaTtcblxuICAgIC8vIHN1cHBvcnQgM2RcbiAgICBpZihpZC5pbmRleE9mKCdzY2VuZScpICE9PSAtMSkgaWQgPSBheExldHRlcjtcblxuICAgIHZhciBkMCA9IGdldEZpcnN0Tm9uRW1wdHlUcmFjZShkYXRhLCBpZCwgYXhMZXR0ZXIpO1xuICAgIGlmKCFkMCkgcmV0dXJuO1xuXG4gICAgLy8gZmlyc3QgY2hlY2sgZm9yIGhpc3RvZ3JhbXMsIGFzIHRoZSBjb3VudCBkaXJlY3Rpb25cbiAgICAvLyBzaG91bGQgYWx3YXlzIGRlZmF1bHQgdG8gYSBsaW5lYXIgYXhpc1xuICAgIGlmKGQwLnR5cGUgPT09ICdoaXN0b2dyYW0nICYmXG4gICAgICAgIGF4TGV0dGVyID09PSB7djogJ3knLCBoOiAneCd9W2QwLm9yaWVudGF0aW9uIHx8ICd2J11cbiAgICApIHtcbiAgICAgICAgYXgudHlwZSA9ICdsaW5lYXInO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNhbEF0dHIgPSBheExldHRlciArICdjYWxlbmRhcic7XG4gICAgdmFyIGNhbGVuZGFyID0gZDBbY2FsQXR0cl07XG4gICAgdmFyIG9wdHMgPSB7bm9NdWx0aUNhdGVnb3J5OiAhdHJhY2VJcyhkMCwgJ2NhcnRlc2lhbicpIHx8IHRyYWNlSXMoZDAsICdub011bHRpQ2F0ZWdvcnknKX07XG5cbiAgICAvLyBUbyBub3QgY29uZnVzZSAyRCB4L3kgdXNlZCBmb3IgcGVyLWJveCBzYW1wbGUgcG9pbnRzIGZvciBtdWx0aWNhdGVnb3J5IGNvb3JkaW5hdGVzXG4gICAgaWYoZDAudHlwZSA9PT0gJ2JveCcgJiYgZDAuX2hhc1ByZUNvbXBTdGF0cyAmJlxuICAgICAgICBheExldHRlciA9PT0ge2g6ICd4JywgdjogJ3knfVtkMC5vcmllbnRhdGlvbiB8fCAndiddXG4gICAgKSB7XG4gICAgICAgIG9wdHMubm9NdWx0aUNhdGVnb3J5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBhbGwgYm94ZXMgb24gdGhpcyB4IGF4aXMgdG8gc2VlXG4gICAgLy8gaWYgdGhleSdyZSBkYXRlcywgbnVtYmVycywgb3IgY2F0ZWdvcmllc1xuICAgIGlmKGlzQm94V2l0aG91dFBvc2l0aW9uQ29vcmRzKGQwLCBheExldHRlcikpIHtcbiAgICAgICAgdmFyIHBvc0xldHRlciA9IGdldEJveFBvc0xldHRlcihkMCk7XG4gICAgICAgIHZhciBib3hQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2UgPSBkYXRhW2ldO1xuICAgICAgICAgICAgaWYoIXRyYWNlSXModHJhY2UsICdib3gtdmlvbGluJykgfHwgKHRyYWNlW2F4TGV0dGVyICsgJ2F4aXMnXSB8fCBheExldHRlcikgIT09IGlkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYodHJhY2VbcG9zTGV0dGVyXSAhPT0gdW5kZWZpbmVkKSBib3hQb3NpdGlvbnMucHVzaCh0cmFjZVtwb3NMZXR0ZXJdWzBdKTtcbiAgICAgICAgICAgIGVsc2UgaWYodHJhY2UubmFtZSAhPT0gdW5kZWZpbmVkKSBib3hQb3NpdGlvbnMucHVzaCh0cmFjZS5uYW1lKTtcbiAgICAgICAgICAgIGVsc2UgYm94UG9zaXRpb25zLnB1c2goJ3RleHQnKTtcblxuICAgICAgICAgICAgaWYodHJhY2VbY2FsQXR0cl0gIT09IGNhbGVuZGFyKSBjYWxlbmRhciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGF4LnR5cGUgPSBhdXRvVHlwZShib3hQb3NpdGlvbnMsIGNhbGVuZGFyLCBvcHRzKTtcbiAgICB9IGVsc2UgaWYoZDAudHlwZSA9PT0gJ3NwbG9tJykge1xuICAgICAgICB2YXIgZGltZW5zaW9ucyA9IGQwLmRpbWVuc2lvbnM7XG4gICAgICAgIHZhciBkaW0gPSBkaW1lbnNpb25zW2QwLl9heGVzRGltW2lkXV07XG4gICAgICAgIGlmKGRpbS52aXNpYmxlKSBheC50eXBlID0gYXV0b1R5cGUoZGltLnZhbHVlcywgY2FsZW5kYXIsIG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGF4LnR5cGUgPSBhdXRvVHlwZShkMFtheExldHRlcl0gfHwgW2QwW2F4TGV0dGVyICsgJzAnXV0sIGNhbGVuZGFyLCBvcHRzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpcnN0Tm9uRW1wdHlUcmFjZShkYXRhLCBpZCwgYXhMZXR0ZXIpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhY2UgPSBkYXRhW2ldO1xuXG4gICAgICAgIGlmKHRyYWNlLnR5cGUgPT09ICdzcGxvbScgJiZcbiAgICAgICAgICAgICAgICB0cmFjZS5fbGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICh0cmFjZVsnXycgKyBheExldHRlciArICdheGVzJ10gfHwge30pW2lkXVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCh0cmFjZVtheExldHRlciArICdheGlzJ10gfHwgYXhMZXR0ZXIpID09PSBpZCkge1xuICAgICAgICAgICAgaWYoaXNCb3hXaXRob3V0UG9zaXRpb25Db29yZHModHJhY2UsIGF4TGV0dGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZigodHJhY2VbYXhMZXR0ZXJdIHx8IFtdKS5sZW5ndGggfHwgdHJhY2VbYXhMZXR0ZXIgKyAnMCddKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRCb3hQb3NMZXR0ZXIodHJhY2UpIHtcbiAgICByZXR1cm4ge3Y6ICd4JywgaDogJ3knfVt0cmFjZS5vcmllbnRhdGlvbiB8fCAndiddO1xufVxuXG5mdW5jdGlvbiBpc0JveFdpdGhvdXRQb3NpdGlvbkNvb3Jkcyh0cmFjZSwgYXhMZXR0ZXIpIHtcbiAgICB2YXIgcG9zTGV0dGVyID0gZ2V0Qm94UG9zTGV0dGVyKHRyYWNlKTtcbiAgICB2YXIgaXNCb3ggPSB0cmFjZUlzKHRyYWNlLCAnYm94LXZpb2xpbicpO1xuICAgIHZhciBpc0NhbmRsZXN0aWNrID0gdHJhY2VJcyh0cmFjZS5fZnVsbElucHV0IHx8IHt9LCAnY2FuZGxlc3RpY2snKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIGlzQm94ICYmXG4gICAgICAgICFpc0NhbmRsZXN0aWNrICYmXG4gICAgICAgIGF4TGV0dGVyID09PSBwb3NMZXR0ZXIgJiZcbiAgICAgICAgdHJhY2VbcG9zTGV0dGVyXSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHRyYWNlW3Bvc0xldHRlciArICcwJ10gPT09IHVuZGVmaW5lZFxuICAgICk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbi8qKlxuICogTWFrZSBhIHh5IGRvbWFpbiBhdHRyaWJ1dGUgZ3JvdXBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLm5hbWU6IG5hbWUgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIGRlZmF1bHQgZGVzY3JpcHRpb25cbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMudHJhY2U6IHNldCB0byB0cnVlIGZvciB0cmFjZSBjb250YWluZXJzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMuZWRpdFR5cGU6IGVkaXRUeXBlIGZvciBhbGwgcGllY2VzXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLm5vR3JpZENlbGw6IHNldCB0byB0cnVlIHRvIG9taXQgYHJvd2AgYW5kIGBjb2x1bW5gXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIGV4dHJhLmRlc2NyaXB0aW9uOiBleHRyYSBkZXNjcmlwdGlvbi4gTi5CIHdlIHVzZVxuICogICAgIGEgc2VwYXJhdGUgZXh0cmEgY29udGFpbmVyIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoXG4gKiAgICAgdGhlIGNvbXByZXNzX2F0dHJpYnV0ZXMgdHJhbnNmb3JtLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYXR0cmlidXRlcyBvYmplY3QgY29udGFpbmluZyB7eCx5fSBhcyBzcGVjaWZpZWRcbiAqL1xuZXhwb3J0cy5hdHRyaWJ1dGVzID0gZnVuY3Rpb24ob3B0cywgZXh0cmEpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBleHRyYSA9IGV4dHJhIHx8IHt9O1xuXG4gICAgdmFyIGJhc2UgPSB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfVxuICAgICAgICBdLFxuICAgICAgICBkZmx0OiBbMCwgMV1cbiAgICB9O1xuXG4gICAgdmFyIG5hbWVQYXJ0ID0gb3B0cy5uYW1lID8gb3B0cy5uYW1lICsgJyAnIDogJyc7XG4gICAgdmFyIGNvbnRQYXJ0ID0gb3B0cy50cmFjZSA/ICd0cmFjZSAnIDogJ3N1YnBsb3QgJztcbiAgICB2YXIgZGVzY1BhcnQgPSBleHRyYS5kZXNjcmlwdGlvbiA/ICcgJyArIGV4dHJhLmRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICB4OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3Jpem9udGFsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICB5OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB2ZXJ0aWNhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGVcbiAgICB9O1xuXG4gICAgaWYoIW9wdHMubm9HcmlkQ2VsbCkge1xuICAgICAgICBvdXQucm93ID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgcm93IGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgICAgIG91dC5jb2x1bW4gPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyBjb2x1bW4gaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbnRhaW5lck91dCwgbGF5b3V0LCBjb2VyY2UsIGRmbHREb21haW5zKSB7XG4gICAgdmFyIGRmbHRYID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLngpIHx8IFswLCAxXTtcbiAgICB2YXIgZGZsdFkgPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueSkgfHwgWzAsIDFdO1xuXG4gICAgdmFyIGdyaWQgPSBsYXlvdXQuZ3JpZDtcbiAgICBpZihncmlkKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBjb2VyY2UoJ2RvbWFpbi5jb2x1bW4nKTtcbiAgICAgICAgaWYoY29sdW1uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGNvbHVtbiA8IGdyaWQuY29sdW1ucykgZGZsdFggPSBncmlkLl9kb21haW5zLnhbY29sdW1uXTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4uY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IGNvZXJjZSgnZG9tYWluLnJvdycpO1xuICAgICAgICBpZihyb3cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYocm93IDwgZ3JpZC5yb3dzKSBkZmx0WSA9IGdyaWQuX2RvbWFpbnMueVtyb3ddO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5yb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgnZG9tYWluLngnLCBkZmx0WCk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ2RvbWFpbi55JywgZGZsdFkpO1xuXG4gICAgLy8gZG9uJ3QgYWNjZXB0IGJhZCBpbnB1dCBkYXRhXG4gICAgaWYoISh4WzBdIDwgeFsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueCA9IGRmbHRYLnNsaWNlKCk7XG4gICAgaWYoISh5WzBdIDwgeVsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueSA9IGRmbHRZLnNsaWNlKCk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHhmb3JtTWF0cml4KG0sIHYpIHtcbiAgICB2YXIgb3V0ID0gWzAsIDAsIDAsIDBdO1xuICAgIHZhciBpLCBqO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IDQ7ICsraikge1xuICAgICAgICAgICAgb3V0W2pdICs9IG1bNCAqIGkgKyBqXSAqIHZbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBwcm9qZWN0KGNhbWVyYSwgdikge1xuICAgIHZhciBwID0geGZvcm1NYXRyaXgoY2FtZXJhLnByb2plY3Rpb24sXG4gICAgICAgIHhmb3JtTWF0cml4KGNhbWVyYS52aWV3LFxuICAgICAgICB4Zm9ybU1hdHJpeChjYW1lcmEubW9kZWwsIFt2WzBdLCB2WzFdLCB2WzJdLCAxXSkpKTtcbiAgICByZXR1cm4gcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9qZWN0O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHppcDMoeCwgeSwgeiwgbGVuKSB7XG4gICAgbGVuID0gbGVuIHx8IHgubGVuZ3RoO1xuXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShsZW4pO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSBbeFtpXSwgeVtpXSwgeltpXV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIHN1cmZhY2VBdHRycyA9IHJlcXVpcmUoJy4uL3N1cmZhY2UvYXR0cmlidXRlcycpO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmRGbGF0KHtcbiAgICB4OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBYIGNvb3JkaW5hdGVzIG9mIHRoZSB2ZXJ0aWNlcy4gVGhlIG50aCBlbGVtZW50IG9mIHZlY3RvcnMgYHhgLCBgeWAgYW5kIGB6YCcsXG4gICAgICAgICAgICAnam9pbnRseSByZXByZXNlbnQgdGhlIFgsIFkgYW5kIFogY29vcmRpbmF0ZXMgb2YgdGhlIG50aCB2ZXJ0ZXguJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeToge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgWSBjb29yZGluYXRlcyBvZiB0aGUgdmVydGljZXMuIFRoZSBudGggZWxlbWVudCBvZiB2ZWN0b3JzIGB4YCwgYHlgIGFuZCBgemAnLFxuICAgICAgICAgICAgJ2pvaW50bHkgcmVwcmVzZW50IHRoZSBYLCBZIGFuZCBaIGNvb3JkaW5hdGVzIG9mIHRoZSBudGggdmVydGV4LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHo6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIFogY29vcmRpbmF0ZXMgb2YgdGhlIHZlcnRpY2VzLiBUaGUgbnRoIGVsZW1lbnQgb2YgdmVjdG9ycyBgeGAsIGB5YCBhbmQgYHpgJyxcbiAgICAgICAgICAgICdqb2ludGx5IHJlcHJlc2VudCB0aGUgWCwgWSBhbmQgWiBjb29yZGluYXRlcyBvZiB0aGUgbnRoIHZlcnRleC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGk6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0EgdmVjdG9yIG9mIHZlcnRleCBpbmRpY2VzLCBpLmUuIGludGVnZXIgdmFsdWVzIGJldHdlZW4gMCBhbmQgdGhlIGxlbmd0aCBvZiB0aGUgdmVydGV4JyxcbiAgICAgICAgICAgICd2ZWN0b3JzLCByZXByZXNlbnRpbmcgdGhlICpmaXJzdCogdmVydGV4IG9mIGEgdHJpYW5nbGUuIEZvciBleGFtcGxlLCBge2lbbV0sIGpbbV0sIGtbbV19YCcsXG4gICAgICAgICAgICAndG9nZXRoZXIgcmVwcmVzZW50IGZhY2UgbSAodHJpYW5nbGUgbSkgaW4gdGhlIG1lc2gsIHdoZXJlIGBpW21dID0gbmAgcG9pbnRzIHRvIHRoZSB0cmlwbGV0JyxcbiAgICAgICAgICAgICdge3hbbl0sIHlbbl0sIHpbbl19YCBpbiB0aGUgdmVydGV4IGFycmF5cy4gVGhlcmVmb3JlLCBlYWNoIGVsZW1lbnQgaW4gYGlgIHJlcHJlc2VudHMgYScsXG4gICAgICAgICAgICAncG9pbnQgaW4gc3BhY2UsIHdoaWNoIGlzIHRoZSBmaXJzdCB2ZXJ0ZXggb2YgYSB0cmlhbmdsZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBqOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdBIHZlY3RvciBvZiB2ZXJ0ZXggaW5kaWNlcywgaS5lLiBpbnRlZ2VyIHZhbHVlcyBiZXR3ZWVuIDAgYW5kIHRoZSBsZW5ndGggb2YgdGhlIHZlcnRleCcsXG4gICAgICAgICAgICAndmVjdG9ycywgcmVwcmVzZW50aW5nIHRoZSAqc2Vjb25kKiB2ZXJ0ZXggb2YgYSB0cmlhbmdsZS4gRm9yIGV4YW1wbGUsIGB7aVttXSwgalttXSwga1ttXX1gICcsXG4gICAgICAgICAgICAndG9nZXRoZXIgcmVwcmVzZW50IGZhY2UgbSAodHJpYW5nbGUgbSkgaW4gdGhlIG1lc2gsIHdoZXJlIGBqW21dID0gbmAgcG9pbnRzIHRvIHRoZSB0cmlwbGV0JyxcbiAgICAgICAgICAgICdge3hbbl0sIHlbbl0sIHpbbl19YCBpbiB0aGUgdmVydGV4IGFycmF5cy4gVGhlcmVmb3JlLCBlYWNoIGVsZW1lbnQgaW4gYGpgIHJlcHJlc2VudHMgYScsXG4gICAgICAgICAgICAncG9pbnQgaW4gc3BhY2UsIHdoaWNoIGlzIHRoZSBzZWNvbmQgdmVydGV4IG9mIGEgdHJpYW5nbGUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuXG4gICAgfSxcbiAgICBrOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdBIHZlY3RvciBvZiB2ZXJ0ZXggaW5kaWNlcywgaS5lLiBpbnRlZ2VyIHZhbHVlcyBiZXR3ZWVuIDAgYW5kIHRoZSBsZW5ndGggb2YgdGhlIHZlcnRleCcsXG4gICAgICAgICAgICAndmVjdG9ycywgcmVwcmVzZW50aW5nIHRoZSAqdGhpcmQqIHZlcnRleCBvZiBhIHRyaWFuZ2xlLiBGb3IgZXhhbXBsZSwgYHtpW21dLCBqW21dLCBrW21dfWAnLFxuICAgICAgICAgICAgJ3RvZ2V0aGVyIHJlcHJlc2VudCBmYWNlIG0gKHRyaWFuZ2xlIG0pIGluIHRoZSBtZXNoLCB3aGVyZSBga1ttXSA9IG5gIHBvaW50cyB0byB0aGUgdHJpcGxldCAnLFxuICAgICAgICAgICAgJ2B7eFtuXSwgeVtuXSwgeltuXX1gIGluIHRoZSB2ZXJ0ZXggYXJyYXlzLiBUaGVyZWZvcmUsIGVhY2ggZWxlbWVudCBpbiBga2AgcmVwcmVzZW50cyBhJyxcbiAgICAgICAgICAgICdwb2ludCBpbiBzcGFjZSwgd2hpY2ggaXMgdGhlIHRoaXJkIHZlcnRleCBvZiBhIHRyaWFuZ2xlLidcbiAgICAgICAgXS5qb2luKCcgJylcblxuICAgIH0sXG5cbiAgICB0ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIHRoZSB2ZXJ0aWNlcy4nLFxuICAgICAgICAgICAgJ0lmIHRyYWNlIGBob3ZlcmluZm9gIGNvbnRhaW5zIGEgKnRleHQqIGZsYWcgYW5kICpob3ZlcnRleHQqIGlzIG5vdCBzZXQsJyxcbiAgICAgICAgICAgICd0aGVzZSBlbGVtZW50cyB3aWxsIGJlIHNlZW4gaW4gdGhlIGhvdmVyIGxhYmVscy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBob3ZlcnRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2FtZSBhcyBgdGV4dGAuJ1xuICAgIH0sXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHtlZGl0VHlwZTogJ2NhbGMnfSksXG5cbiAgICBkZWxhdW5heWF4aXM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIHZhbHVlczogWyAneCcsICd5JywgJ3onIF0sXG4gICAgICAgIGRmbHQ6ICd6JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBEZWxhdW5heSBheGlzLCB3aGljaCBpcyB0aGUgYXhpcyB0aGF0IGlzIHBlcnBlbmRpY3VsYXIgdG8gdGhlIHN1cmZhY2Ugb2YgdGhlJyxcbiAgICAgICAgICAgICdEZWxhdW5heSB0cmlhbmd1bGF0aW9uLicsXG4gICAgICAgICAgICAnSXQgaGFzIGFuIGVmZmVjdCBpZiBgaWAsIGBqYCwgYGtgIGFyZSBub3QgcHJvdmlkZWQgYW5kIGBhbHBoYWh1bGxgIGlzIHNldCB0byBpbmRpY2F0ZScsXG4gICAgICAgICAgICAnRGVsYXVuYXkgdHJpYW5ndWxhdGlvbi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGFscGhhaHVsbDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGZsdDogLTEsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyBob3cgdGhlIG1lc2ggc3VyZmFjZSB0cmlhbmdsZXMgYXJlIGRlcml2ZWQgZnJvbSB0aGUgc2V0IG9mJyxcbiAgICAgICAgICAgICd2ZXJ0aWNlcyAocG9pbnRzKSByZXByZXNlbnRlZCBieSB0aGUgYHhgLCBgeWAgYW5kIGB6YCBhcnJheXMsIGlmJyxcbiAgICAgICAgICAgICd0aGUgYGlgLCBgamAsIGBrYCBhcnJheXMgYXJlIG5vdCBzdXBwbGllZC4nLFxuICAgICAgICAgICAgJ0ZvciBnZW5lcmFsIHVzZSBvZiBgbWVzaDNkYCBpdCBpcyBwcmVmZXJyZWQgdGhhdCBgaWAsIGBqYCwgYGtgIGFyZScsXG4gICAgICAgICAgICAnc3VwcGxpZWQuJyxcblxuICAgICAgICAgICAgJ0lmICotMSosIERlbGF1bmF5IHRyaWFuZ3VsYXRpb24gaXMgdXNlZCwgd2hpY2ggaXMgbWFpbmx5IHN1aXRhYmxlIGlmIHRoZScsXG4gICAgICAgICAgICAnbWVzaCBpcyBhIHNpbmdsZSwgbW9yZSBvciBsZXNzIGxheWVyIHN1cmZhY2UgdGhhdCBpcyBwZXJwZW5kaWN1bGFyIHRvIGBkZWxhdW5heWF4aXNgLicsXG4gICAgICAgICAgICAnSW4gY2FzZSB0aGUgYGRlbGF1bmF5YXhpc2AgaW50ZXJzZWN0cyB0aGUgbWVzaCBzdXJmYWNlIGF0IG1vcmUgdGhhbiBvbmUgcG9pbnQnLFxuICAgICAgICAgICAgJ2l0IHdpbGwgcmVzdWx0IHRyaWFuZ2xlcyB0aGF0IGFyZSB2ZXJ5IGxvbmcgaW4gdGhlIGRpbWVuc2lvbiBvZiBgZGVsYXVuYXlheGlzYC4nLFxuXG4gICAgICAgICAgICAnSWYgKj4wKiwgdGhlIGFscGhhLXNoYXBlIGFsZ29yaXRobSBpcyB1c2VkLiBJbiB0aGlzIGNhc2UsIHRoZSBwb3NpdGl2ZSBgYWxwaGFodWxsYCB2YWx1ZScsXG4gICAgICAgICAgICAnc2lnbmFscyB0aGUgdXNlIG9mIHRoZSBhbHBoYS1zaGFwZSBhbGdvcml0aG0sIF9hbmRfIGl0cyB2YWx1ZScsXG4gICAgICAgICAgICAnYWN0cyBhcyB0aGUgcGFyYW1ldGVyIGZvciB0aGUgbWVzaCBmaXR0aW5nLicsXG5cbiAgICAgICAgICAgICdJZiAqMCosICB0aGUgY29udmV4LWh1bGwgYWxnb3JpdGhtIGlzIHVzZWQuIEl0IGlzIHN1aXRhYmxlIGZvciBjb252ZXggYm9kaWVzJyxcbiAgICAgICAgICAgICdvciBpZiB0aGUgaW50ZW50aW9uIGlzIHRvIGVuY2xvc2UgdGhlIGB4YCwgYHlgIGFuZCBgemAgcG9pbnQgc2V0IGludG8gYSBjb252ZXgnLFxuICAgICAgICAgICAgJ2h1bGwuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBpbnRlbnNpdHk6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGludGVuc2l0eSB2YWx1ZXMgZm9yIHZlcnRpY2VzIG9yIGNlbGxzJyxcbiAgICAgICAgICAgICdhcyBkZWZpbmVkIGJ5IGBpbnRlbnNpdHltb2RlYC4nLFxuICAgICAgICAgICAgJ0l0IGNhbiBiZSB1c2VkIGZvciBwbG90dGluZyBmaWVsZHMgb24gbWVzaGVzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGludGVuc2l0eW1vZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsndmVydGV4JywgJ2NlbGwnXSxcbiAgICAgICAgZGZsdDogJ3ZlcnRleCcsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHRoZSBzb3VyY2Ugb2YgYGludGVuc2l0eWAgdmFsdWVzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgLy8gQ29sb3IgZmllbGRcbiAgICBjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGNvbG9yIG9mIHRoZSB3aG9sZSBtZXNoJ1xuICAgIH0sXG4gICAgdmVydGV4Y29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGNvbG9yIG9mIGVhY2ggdmVydGV4JyxcbiAgICAgICAgICAgICdPdmVycmlkZXMgKmNvbG9yKi4gV2hpbGUgUmVkLCBncmVlbiBhbmQgYmx1ZSBjb2xvcnMnLFxuICAgICAgICAgICAgJ2FyZSBpbiB0aGUgcmFuZ2Ugb2YgMCBhbmQgMjU1OyBpbiB0aGUgY2FzZSBvZiBoYXZpbmcnLFxuICAgICAgICAgICAgJ3ZlcnRleCBjb2xvciBkYXRhIGluIFJHQkEgZm9ybWF0LCB0aGUgYWxwaGEgY29sb3InLFxuICAgICAgICAgICAgJ3Nob3VsZCBiZSBub3JtYWxpemVkIHRvIGJlIGJldHdlZW4gMCBhbmQgMS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBmYWNlY29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGNvbG9yIG9mIGVhY2ggZmFjZScsXG4gICAgICAgICAgICAnT3ZlcnJpZGVzICpjb2xvciogYW5kICp2ZXJ0ZXhjb2xvciouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgdHJhbnNmb3JtczogdW5kZWZpbmVkXG59LFxuXG5jb2xvclNjYWxlQXR0cnMoJycsIHtcbiAgICBjb2xvckF0dHI6ICdgaW50ZW5zaXR5YCcsXG4gICAgc2hvd1NjYWxlRGZsdDogdHJ1ZSxcbiAgICBlZGl0VHlwZU92ZXJyaWRlOiAnY2FsYydcbn0pLCB7XG4gICAgb3BhY2l0eTogc3VyZmFjZUF0dHJzLm9wYWNpdHksXG5cbiAgICAvLyBGbGF0IHNoYWRlZCBtb2RlXG4gICAgZmxhdHNoYWRpbmc6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IG5vcm1hbCBzbW9vdGhpbmcgaXMgYXBwbGllZCB0byB0aGUgbWVzaGVzLCcsXG4gICAgICAgICAgICAnY3JlYXRpbmcgbWVzaGVzIHdpdGggYW4gYW5ndWxhciwgbG93LXBvbHkgbG9vayB2aWEgZmxhdCByZWZsZWN0aW9ucy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGNvbnRvdXI6IHtcbiAgICAgICAgc2hvdzogZXh0ZW5kRmxhdCh7fSwgc3VyZmFjZUF0dHJzLmNvbnRvdXJzLnguc2hvdywge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB3aGV0aGVyIG9yIG5vdCBkeW5hbWljIGNvbnRvdXJzIGFyZSBzaG93biBvbiBob3ZlcidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuICAgICAgICBjb2xvcjogc3VyZmFjZUF0dHJzLmNvbnRvdXJzLnguY29sb3IsXG4gICAgICAgIHdpZHRoOiBzdXJmYWNlQXR0cnMuY29udG91cnMueC53aWR0aCxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sXG5cbiAgICBsaWdodHBvc2l0aW9uOiB7XG4gICAgICAgIHg6IGV4dGVuZEZsYXQoe30sIHN1cmZhY2VBdHRycy5saWdodHBvc2l0aW9uLngsIHtkZmx0OiAxZTV9KSxcbiAgICAgICAgeTogZXh0ZW5kRmxhdCh7fSwgc3VyZmFjZUF0dHJzLmxpZ2h0cG9zaXRpb24ueSwge2RmbHQ6IDFlNX0pLFxuICAgICAgICB6OiBleHRlbmRGbGF0KHt9LCBzdXJmYWNlQXR0cnMubGlnaHRwb3NpdGlvbi56LCB7ZGZsdDogMH0pLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcbiAgICBsaWdodGluZzogZXh0ZW5kRmxhdCh7XG4gICAgICAgIHZlcnRleG5vcm1hbHNlcHNpbG9uOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IDAuMDAsXG4gICAgICAgICAgICBtYXg6IDEsXG4gICAgICAgICAgICBkZmx0OiAxZS0xMiwgLy8gb3RoZXJ3aXNlIGZpbmVseSB0ZXNzZWxsYXRlZCB0aGluZ3MgZWcuIHRoZSBicmFpbiB3aWxsIGhhdmUgbm8gc3BlY3VsYXIgbGlnaHQgcmVmbGVjdGlvblxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRXBzaWxvbiBmb3IgdmVydGV4IG5vcm1hbHMgY2FsY3VsYXRpb24gYXZvaWRzIG1hdGggaXNzdWVzIGFyaXNpbmcgZnJvbSBkZWdlbmVyYXRlIGdlb21ldHJ5LidcbiAgICAgICAgfSxcbiAgICAgICAgZmFjZW5vcm1hbHNlcHNpbG9uOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IDAuMDAsXG4gICAgICAgICAgICBtYXg6IDEsXG4gICAgICAgICAgICBkZmx0OiAxZS02LCAvLyBldmVuIHRoZSBicmFpbiBtb2RlbCBkb2Vzbid0IGFwcGVhciB0byBuZWVkIGZpbmVyIHRoYW4gdGhpc1xuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRXBzaWxvbiBmb3IgZmFjZSBub3JtYWxzIGNhbGN1bGF0aW9uIGF2b2lkcyBtYXRoIGlzc3VlcyBhcmlzaW5nIGZyb20gZGVnZW5lcmF0ZSBnZW9tZXRyeS4nXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICB9LCBzdXJmYWNlQXR0cnMubGlnaHRpbmcpLFxuXG4gICAgaG92ZXJpbmZvOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuaG92ZXJpbmZvLCB7ZWRpdFR5cGU6ICdjYWxjJ30pLFxuICAgIHNob3dsZWdlbmQ6IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5zaG93bGVnZW5kLCB7ZGZsdDogZmFsc2V9KVxufSk7XG4iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9