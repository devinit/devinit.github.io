(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_delaunay-triangulate_triangulate_js-node_modules_gl-mat4_fromQuat_js-node_module-2ac876"],{

/***/ "./node_modules/delaunay-triangulate/triangulate.js":
/*!**********************************************************!*\
  !*** ./node_modules/delaunay-triangulate/triangulate.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ch = __webpack_require__(/*! incremental-convex-hull */ "./node_modules/incremental-convex-hull/ich.js")
var uniq = __webpack_require__(/*! uniq */ "./node_modules/uniq/uniq.js")

module.exports = triangulate

function LiftedPoint(p, i) {
  this.point = p
  this.index = i
}

function compareLifted(a, b) {
  var ap = a.point
  var bp = b.point
  var d = ap.length
  for(var i=0; i<d; ++i) {
    var s = bp[i] - ap[i]
    if(s) {
      return s
    }
  }
  return 0
}

function triangulate1D(n, points, includePointAtInfinity) {
  if(n === 1) {
    if(includePointAtInfinity) {
      return [ [-1, 0] ]
    } else {
      return []
    }
  }
  var lifted = points.map(function(p, i) {
    return [ p[0], i ]
  })
  lifted.sort(function(a,b) {
    return a[0] - b[0]
  })
  var cells = new Array(n - 1)
  for(var i=1; i<n; ++i) {
    var a = lifted[i-1]
    var b = lifted[i]
    cells[i-1] = [ a[1], b[1] ]
  }
  if(includePointAtInfinity) {
    cells.push(
      [ -1, cells[0][1], ],
      [ cells[n-1][1], -1 ])
  }
  return cells
}

function triangulate(points, includePointAtInfinity) {
  var n = points.length
  if(n === 0) {
    return []
  }
  
  var d = points[0].length
  if(d < 1) {
    return []
  }

  //Special case:  For 1D we can just sort the points
  if(d === 1) {
    return triangulate1D(n, points, includePointAtInfinity)
  }
  
  //Lift points, sort
  var lifted = new Array(n)
  var upper = 1.0
  for(var i=0; i<n; ++i) {
    var p = points[i]
    var x = new Array(d+1)
    var l = 0.0
    for(var j=0; j<d; ++j) {
      var v = p[j]
      x[j] = v
      l += v * v
    }
    x[d] = l
    lifted[i] = new LiftedPoint(x, i)
    upper = Math.max(l, upper)
  }
  uniq(lifted, compareLifted)
  
  //Double points
  n = lifted.length

  //Create new list of points
  var dpoints = new Array(n + d + 1)
  var dindex = new Array(n + d + 1)

  //Add steiner points at top
  var u = (d+1) * (d+1) * upper
  var y = new Array(d+1)
  for(var i=0; i<=d; ++i) {
    y[i] = 0.0
  }
  y[d] = u

  dpoints[0] = y.slice()
  dindex[0] = -1

  for(var i=0; i<=d; ++i) {
    var x = y.slice()
    x[i] = 1
    dpoints[i+1] = x
    dindex[i+1] = -1
  }

  //Copy rest of the points over
  for(var i=0; i<n; ++i) {
    var h = lifted[i]
    dpoints[i + d + 1] = h.point
    dindex[i + d + 1] =  h.index
  }

  //Construct convex hull
  var hull = ch(dpoints, false)
  if(includePointAtInfinity) {
    hull = hull.filter(function(cell) {
      var count = 0
      for(var j=0; j<=d; ++j) {
        var v = dindex[cell[j]]
        if(v < 0) {
          if(++count >= 2) {
            return false
          }
        }
        cell[j] = v
      }
      return true
    })
  } else {
    hull = hull.filter(function(cell) {
      for(var i=0; i<=d; ++i) {
        var v = dindex[cell[i]]
        if(v < 0) {
          return false
        }
        cell[i] = v
      }
      return true
    })
  }

  if(d & 1) {
    for(var i=0; i<hull.length; ++i) {
      var h = hull[i]
      var x = h[0]
      h[0] = h[1]
      h[1] = x
    }
  }

  return hull
}

/***/ }),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RlbGF1bmF5LXRyaWFuZ3VsYXRlL3RyaWFuZ3VsYXRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC9mcm9tUXVhdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL3R5cGVfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2RvbWFpbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC9wcm9qZWN0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9nbDNkL3ppcDMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9tZXNoM2QvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlL2lnbm9yZWR8L2hvbWUvYWxleC9naXQvREl3ZWJzaXRlLXJlZGVzaWduL25vZGVfbW9kdWxlcy9iaWctcmF0L25vZGVfbW9kdWxlcy9ibi5qcy9saWJ8YnVmZmVyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFZOztBQUVaLFNBQVMsbUJBQU8sQ0FBQyw4RUFBeUI7QUFDMUMsV0FBVyxtQkFBTyxDQUFDLHlDQUFNOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNB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c3RyaWN0XCJcblxudmFyIGNoID0gcmVxdWlyZShcImluY3JlbWVudGFsLWNvbnZleC1odWxsXCIpXG52YXIgdW5pcSA9IHJlcXVpcmUoXCJ1bmlxXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gdHJpYW5ndWxhdGVcblxuZnVuY3Rpb24gTGlmdGVkUG9pbnQocCwgaSkge1xuICB0aGlzLnBvaW50ID0gcFxuICB0aGlzLmluZGV4ID0gaVxufVxuXG5mdW5jdGlvbiBjb21wYXJlTGlmdGVkKGEsIGIpIHtcbiAgdmFyIGFwID0gYS5wb2ludFxuICB2YXIgYnAgPSBiLnBvaW50XG4gIHZhciBkID0gYXAubGVuZ3RoXG4gIGZvcih2YXIgaT0wOyBpPGQ7ICsraSkge1xuICAgIHZhciBzID0gYnBbaV0gLSBhcFtpXVxuICAgIGlmKHMpIHtcbiAgICAgIHJldHVybiBzXG4gICAgfVxuICB9XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIHRyaWFuZ3VsYXRlMUQobiwgcG9pbnRzLCBpbmNsdWRlUG9pbnRBdEluZmluaXR5KSB7XG4gIGlmKG4gPT09IDEpIHtcbiAgICBpZihpbmNsdWRlUG9pbnRBdEluZmluaXR5KSB7XG4gICAgICByZXR1cm4gWyBbLTEsIDBdIF1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuICB9XG4gIHZhciBsaWZ0ZWQgPSBwb2ludHMubWFwKGZ1bmN0aW9uKHAsIGkpIHtcbiAgICByZXR1cm4gWyBwWzBdLCBpIF1cbiAgfSlcbiAgbGlmdGVkLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgcmV0dXJuIGFbMF0gLSBiWzBdXG4gIH0pXG4gIHZhciBjZWxscyA9IG5ldyBBcnJheShuIC0gMSlcbiAgZm9yKHZhciBpPTE7IGk8bjsgKytpKSB7XG4gICAgdmFyIGEgPSBsaWZ0ZWRbaS0xXVxuICAgIHZhciBiID0gbGlmdGVkW2ldXG4gICAgY2VsbHNbaS0xXSA9IFsgYVsxXSwgYlsxXSBdXG4gIH1cbiAgaWYoaW5jbHVkZVBvaW50QXRJbmZpbml0eSkge1xuICAgIGNlbGxzLnB1c2goXG4gICAgICBbIC0xLCBjZWxsc1swXVsxXSwgXSxcbiAgICAgIFsgY2VsbHNbbi0xXVsxXSwgLTEgXSlcbiAgfVxuICByZXR1cm4gY2VsbHNcbn1cblxuZnVuY3Rpb24gdHJpYW5ndWxhdGUocG9pbnRzLCBpbmNsdWRlUG9pbnRBdEluZmluaXR5KSB7XG4gIHZhciBuID0gcG9pbnRzLmxlbmd0aFxuICBpZihuID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgXG4gIHZhciBkID0gcG9pbnRzWzBdLmxlbmd0aFxuICBpZihkIDwgMSkge1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgLy9TcGVjaWFsIGNhc2U6ICBGb3IgMUQgd2UgY2FuIGp1c3Qgc29ydCB0aGUgcG9pbnRzXG4gIGlmKGQgPT09IDEpIHtcbiAgICByZXR1cm4gdHJpYW5ndWxhdGUxRChuLCBwb2ludHMsIGluY2x1ZGVQb2ludEF0SW5maW5pdHkpXG4gIH1cbiAgXG4gIC8vTGlmdCBwb2ludHMsIHNvcnRcbiAgdmFyIGxpZnRlZCA9IG5ldyBBcnJheShuKVxuICB2YXIgdXBwZXIgPSAxLjBcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgdmFyIHAgPSBwb2ludHNbaV1cbiAgICB2YXIgeCA9IG5ldyBBcnJheShkKzEpXG4gICAgdmFyIGwgPSAwLjBcbiAgICBmb3IodmFyIGo9MDsgajxkOyArK2opIHtcbiAgICAgIHZhciB2ID0gcFtqXVxuICAgICAgeFtqXSA9IHZcbiAgICAgIGwgKz0gdiAqIHZcbiAgICB9XG4gICAgeFtkXSA9IGxcbiAgICBsaWZ0ZWRbaV0gPSBuZXcgTGlmdGVkUG9pbnQoeCwgaSlcbiAgICB1cHBlciA9IE1hdGgubWF4KGwsIHVwcGVyKVxuICB9XG4gIHVuaXEobGlmdGVkLCBjb21wYXJlTGlmdGVkKVxuICBcbiAgLy9Eb3VibGUgcG9pbnRzXG4gIG4gPSBsaWZ0ZWQubGVuZ3RoXG5cbiAgLy9DcmVhdGUgbmV3IGxpc3Qgb2YgcG9pbnRzXG4gIHZhciBkcG9pbnRzID0gbmV3IEFycmF5KG4gKyBkICsgMSlcbiAgdmFyIGRpbmRleCA9IG5ldyBBcnJheShuICsgZCArIDEpXG5cbiAgLy9BZGQgc3RlaW5lciBwb2ludHMgYXQgdG9wXG4gIHZhciB1ID0gKGQrMSkgKiAoZCsxKSAqIHVwcGVyXG4gIHZhciB5ID0gbmV3IEFycmF5KGQrMSlcbiAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgIHlbaV0gPSAwLjBcbiAgfVxuICB5W2RdID0gdVxuXG4gIGRwb2ludHNbMF0gPSB5LnNsaWNlKClcbiAgZGluZGV4WzBdID0gLTFcblxuICBmb3IodmFyIGk9MDsgaTw9ZDsgKytpKSB7XG4gICAgdmFyIHggPSB5LnNsaWNlKClcbiAgICB4W2ldID0gMVxuICAgIGRwb2ludHNbaSsxXSA9IHhcbiAgICBkaW5kZXhbaSsxXSA9IC0xXG4gIH1cblxuICAvL0NvcHkgcmVzdCBvZiB0aGUgcG9pbnRzIG92ZXJcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgdmFyIGggPSBsaWZ0ZWRbaV1cbiAgICBkcG9pbnRzW2kgKyBkICsgMV0gPSBoLnBvaW50XG4gICAgZGluZGV4W2kgKyBkICsgMV0gPSAgaC5pbmRleFxuICB9XG5cbiAgLy9Db25zdHJ1Y3QgY29udmV4IGh1bGxcbiAgdmFyIGh1bGwgPSBjaChkcG9pbnRzLCBmYWxzZSlcbiAgaWYoaW5jbHVkZVBvaW50QXRJbmZpbml0eSkge1xuICAgIGh1bGwgPSBodWxsLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICB2YXIgY291bnQgPSAwXG4gICAgICBmb3IodmFyIGo9MDsgajw9ZDsgKytqKSB7XG4gICAgICAgIHZhciB2ID0gZGluZGV4W2NlbGxbal1dXG4gICAgICAgIGlmKHYgPCAwKSB7XG4gICAgICAgICAgaWYoKytjb3VudCA+PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2VsbFtqXSA9IHZcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBodWxsID0gaHVsbC5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgICAgICB2YXIgdiA9IGRpbmRleFtjZWxsW2ldXVxuICAgICAgICBpZih2IDwgMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGNlbGxbaV0gPSB2XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBpZihkICYgMSkge1xuICAgIGZvcih2YXIgaT0wOyBpPGh1bGwubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBoID0gaHVsbFtpXVxuICAgICAgdmFyIHggPSBoWzBdXG4gICAgICBoWzBdID0gaFsxXVxuICAgICAgaFsxXSA9IHhcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaHVsbFxufSIsIm1vZHVsZS5leHBvcnRzID0gZnJvbVF1YXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB5eCA9IHkgKiB4MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHp4ID0geiAqIHgyLFxuICAgICAgICB6eSA9IHogKiB5MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgIG91dFsyXSA9IHp4IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcblxuICAgIG91dFs0XSA9IHl4IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtIHh4IC0geno7XG4gICAgb3V0WzZdID0genkgKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuXG4gICAgb3V0WzhdID0genggKyB3eTtcbiAgICBvdXRbOV0gPSB6eSAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0geHggLSB5eTtcbiAgICBvdXRbMTFdID0gMDtcblxuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07IiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJhY2VJcyA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5JykudHJhY2VJcztcbnZhciBhdXRvVHlwZSA9IHJlcXVpcmUoJy4vYXhpc19hdXRvdHlwZScpO1xuXG4vKlxuICogIGRhdGE6IHRoZSBwbG90IGRhdGEgdG8gdXNlIGluIGNob29zaW5nIGF1dG8gdHlwZVxuICogIG5hbWU6IGF4aXMgb2JqZWN0IG5hbWUgKGllICd4YXhpcycpIGlmIG9uZSBzaG91bGQgYmUgc3RvcmVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlVHlwZURlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGNvZXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBheFR5cGUgPSBjb2VyY2UoJ3R5cGUnLCAob3B0aW9ucy5zcGxvbVN0YXNoIHx8IHt9KS50eXBlKTtcblxuICAgIGlmKGF4VHlwZSA9PT0gJy0nKSB7XG4gICAgICAgIHNldEF1dG9UeXBlKGNvbnRhaW5lck91dCwgb3B0aW9ucy5kYXRhKTtcblxuICAgICAgICBpZihjb250YWluZXJPdXQudHlwZSA9PT0gJy0nKSB7XG4gICAgICAgICAgICBjb250YWluZXJPdXQudHlwZSA9ICdsaW5lYXInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29weSBhdXRvVHlwZSBiYWNrIHRvIGlucHV0IGF4aXNcbiAgICAgICAgICAgIC8vIG5vdGUgdGhhdCBpZiB0aGlzIG9iamVjdCBkaWRuJ3QgZXhpc3RcbiAgICAgICAgICAgIC8vIGluIHRoZSBpbnB1dCBsYXlvdXQsIHdlIGhhdmUgdG8gcHV0IGl0IGluXG4gICAgICAgICAgICAvLyB0aGlzIGhhcHBlbnMgaW4gdGhlIG1haW4gc3VwcGx5RGVmYXVsdHMgZnVuY3Rpb25cbiAgICAgICAgICAgIGNvbnRhaW5lckluLnR5cGUgPSBjb250YWluZXJPdXQudHlwZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHNldEF1dG9UeXBlKGF4LCBkYXRhKSB7XG4gICAgLy8gbmV3IGxvZ2ljOiBsZXQgcGVvcGxlIHNwZWNpZnkgYW55IHR5cGUgdGhleSB3YW50LFxuICAgIC8vIG9ubHkgYXV0b3R5cGUgaWYgdHlwZSBpcyAnLSdcbiAgICBpZihheC50eXBlICE9PSAnLScpIHJldHVybjtcblxuICAgIHZhciBpZCA9IGF4Ll9pZDtcbiAgICB2YXIgYXhMZXR0ZXIgPSBpZC5jaGFyQXQoMCk7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBzdXBwb3J0IDNkXG4gICAgaWYoaWQuaW5kZXhPZignc2NlbmUnKSAhPT0gLTEpIGlkID0gYXhMZXR0ZXI7XG5cbiAgICB2YXIgZDAgPSBnZXRGaXJzdE5vbkVtcHR5VHJhY2UoZGF0YSwgaWQsIGF4TGV0dGVyKTtcbiAgICBpZighZDApIHJldHVybjtcblxuICAgIC8vIGZpcnN0IGNoZWNrIGZvciBoaXN0b2dyYW1zLCBhcyB0aGUgY291bnQgZGlyZWN0aW9uXG4gICAgLy8gc2hvdWxkIGFsd2F5cyBkZWZhdWx0IHRvIGEgbGluZWFyIGF4aXNcbiAgICBpZihkMC50eXBlID09PSAnaGlzdG9ncmFtJyAmJlxuICAgICAgICBheExldHRlciA9PT0ge3Y6ICd5JywgaDogJ3gnfVtkMC5vcmllbnRhdGlvbiB8fCAndiddXG4gICAgKSB7XG4gICAgICAgIGF4LnR5cGUgPSAnbGluZWFyJztcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjYWxBdHRyID0gYXhMZXR0ZXIgKyAnY2FsZW5kYXInO1xuICAgIHZhciBjYWxlbmRhciA9IGQwW2NhbEF0dHJdO1xuICAgIHZhciBvcHRzID0ge25vTXVsdGlDYXRlZ29yeTogIXRyYWNlSXMoZDAsICdjYXJ0ZXNpYW4nKSB8fCB0cmFjZUlzKGQwLCAnbm9NdWx0aUNhdGVnb3J5Jyl9O1xuXG4gICAgLy8gVG8gbm90IGNvbmZ1c2UgMkQgeC95IHVzZWQgZm9yIHBlci1ib3ggc2FtcGxlIHBvaW50cyBmb3IgbXVsdGljYXRlZ29yeSBjb29yZGluYXRlc1xuICAgIGlmKGQwLnR5cGUgPT09ICdib3gnICYmIGQwLl9oYXNQcmVDb21wU3RhdHMgJiZcbiAgICAgICAgYXhMZXR0ZXIgPT09IHtoOiAneCcsIHY6ICd5J31bZDAub3JpZW50YXRpb24gfHwgJ3YnXVxuICAgICkge1xuICAgICAgICBvcHRzLm5vTXVsdGlDYXRlZ29yeSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgYWxsIGJveGVzIG9uIHRoaXMgeCBheGlzIHRvIHNlZVxuICAgIC8vIGlmIHRoZXkncmUgZGF0ZXMsIG51bWJlcnMsIG9yIGNhdGVnb3JpZXNcbiAgICBpZihpc0JveFdpdGhvdXRQb3NpdGlvbkNvb3JkcyhkMCwgYXhMZXR0ZXIpKSB7XG4gICAgICAgIHZhciBwb3NMZXR0ZXIgPSBnZXRCb3hQb3NMZXR0ZXIoZDApO1xuICAgICAgICB2YXIgYm94UG9zaXRpb25zID0gW107XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRyYWNlID0gZGF0YVtpXTtcbiAgICAgICAgICAgIGlmKCF0cmFjZUlzKHRyYWNlLCAnYm94LXZpb2xpbicpIHx8ICh0cmFjZVtheExldHRlciArICdheGlzJ10gfHwgYXhMZXR0ZXIpICE9PSBpZCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlW3Bvc0xldHRlcl0gIT09IHVuZGVmaW5lZCkgYm94UG9zaXRpb25zLnB1c2godHJhY2VbcG9zTGV0dGVyXVswXSk7XG4gICAgICAgICAgICBlbHNlIGlmKHRyYWNlLm5hbWUgIT09IHVuZGVmaW5lZCkgYm94UG9zaXRpb25zLnB1c2godHJhY2UubmFtZSk7XG4gICAgICAgICAgICBlbHNlIGJveFBvc2l0aW9ucy5wdXNoKCd0ZXh0Jyk7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlW2NhbEF0dHJdICE9PSBjYWxlbmRhcikgY2FsZW5kYXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBheC50eXBlID0gYXV0b1R5cGUoYm94UG9zaXRpb25zLCBjYWxlbmRhciwgb3B0cyk7XG4gICAgfSBlbHNlIGlmKGQwLnR5cGUgPT09ICdzcGxvbScpIHtcbiAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBkMC5kaW1lbnNpb25zO1xuICAgICAgICB2YXIgZGltID0gZGltZW5zaW9uc1tkMC5fYXhlc0RpbVtpZF1dO1xuICAgICAgICBpZihkaW0udmlzaWJsZSkgYXgudHlwZSA9IGF1dG9UeXBlKGRpbS52YWx1ZXMsIGNhbGVuZGFyLCBvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBheC50eXBlID0gYXV0b1R5cGUoZDBbYXhMZXR0ZXJdIHx8IFtkMFtheExldHRlciArICcwJ11dLCBjYWxlbmRhciwgb3B0cyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRGaXJzdE5vbkVtcHR5VHJhY2UoZGF0YSwgaWQsIGF4TGV0dGVyKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZGF0YVtpXTtcblxuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnc3Bsb20nICYmXG4gICAgICAgICAgICAgICAgdHJhY2UuX2xlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAodHJhY2VbJ18nICsgYXhMZXR0ZXIgKyAnYXhlcyddIHx8IHt9KVtpZF1cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZigodHJhY2VbYXhMZXR0ZXIgKyAnYXhpcyddIHx8IGF4TGV0dGVyKSA9PT0gaWQpIHtcbiAgICAgICAgICAgIGlmKGlzQm94V2l0aG91dFBvc2l0aW9uQ29vcmRzKHRyYWNlLCBheExldHRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYoKHRyYWNlW2F4TGV0dGVyXSB8fCBbXSkubGVuZ3RoIHx8IHRyYWNlW2F4TGV0dGVyICsgJzAnXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0Qm94UG9zTGV0dGVyKHRyYWNlKSB7XG4gICAgcmV0dXJuIHt2OiAneCcsIGg6ICd5J31bdHJhY2Uub3JpZW50YXRpb24gfHwgJ3YnXTtcbn1cblxuZnVuY3Rpb24gaXNCb3hXaXRob3V0UG9zaXRpb25Db29yZHModHJhY2UsIGF4TGV0dGVyKSB7XG4gICAgdmFyIHBvc0xldHRlciA9IGdldEJveFBvc0xldHRlcih0cmFjZSk7XG4gICAgdmFyIGlzQm94ID0gdHJhY2VJcyh0cmFjZSwgJ2JveC12aW9saW4nKTtcbiAgICB2YXIgaXNDYW5kbGVzdGljayA9IHRyYWNlSXModHJhY2UuX2Z1bGxJbnB1dCB8fCB7fSwgJ2NhbmRsZXN0aWNrJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBpc0JveCAmJlxuICAgICAgICAhaXNDYW5kbGVzdGljayAmJlxuICAgICAgICBheExldHRlciA9PT0gcG9zTGV0dGVyICYmXG4gICAgICAgIHRyYWNlW3Bvc0xldHRlcl0gPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0cmFjZVtwb3NMZXR0ZXIgKyAnMCddID09PSB1bmRlZmluZWRcbiAgICApO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG4vKipcbiAqIE1ha2UgYSB4eSBkb21haW4gYXR0cmlidXRlIGdyb3VwXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5uYW1lOiBuYW1lIHRvIGJlIGluc2VydGVkIGluIHRoZSBkZWZhdWx0IGRlc2NyaXB0aW9uXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLnRyYWNlOiBzZXQgdG8gdHJ1ZSBmb3IgdHJhY2UgY29udGFpbmVyc1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLmVkaXRUeXBlOiBlZGl0VHlwZSBmb3IgYWxsIHBpZWNlc1xuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy5ub0dyaWRDZWxsOiBzZXQgdG8gdHJ1ZSB0byBvbWl0IGByb3dgIGFuZCBgY29sdW1uYFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRyYVxuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBleHRyYS5kZXNjcmlwdGlvbjogZXh0cmEgZGVzY3JpcHRpb24uIE4uQiB3ZSB1c2VcbiAqICAgICBhIHNlcGFyYXRlIGV4dHJhIGNvbnRhaW5lciB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aFxuICogICAgIHRoZSBjb21wcmVzc19hdHRyaWJ1dGVzIHRyYW5zZm9ybS5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IGF0dHJpYnV0ZXMgb2JqZWN0IGNvbnRhaW5pbmcge3gseX0gYXMgc3BlY2lmaWVkXG4gKi9cbmV4cG9ydHMuYXR0cmlidXRlcyA9IGZ1bmN0aW9uKG9wdHMsIGV4dHJhKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgZXh0cmEgPSBleHRyYSB8fCB7fTtcblxuICAgIHZhciBiYXNlID0ge1xuICAgICAgICB2YWxUeXBlOiAnaW5mb19hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX0sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX1cbiAgICAgICAgXSxcbiAgICAgICAgZGZsdDogWzAsIDFdXG4gICAgfTtcblxuICAgIHZhciBuYW1lUGFydCA9IG9wdHMubmFtZSA/IG9wdHMubmFtZSArICcgJyA6ICcnO1xuICAgIHZhciBjb250UGFydCA9IG9wdHMudHJhY2UgPyAndHJhY2UgJyA6ICdzdWJwbG90ICc7XG4gICAgdmFyIGRlc2NQYXJ0ID0gZXh0cmEuZGVzY3JpcHRpb24gPyAnICcgKyBleHRyYS5kZXNjcmlwdGlvbiA6ICcnO1xuXG4gICAgdmFyIG91dCA9IHtcbiAgICAgICAgeDogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgaG9yaXpvbnRhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgeTogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdmVydGljYWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlXG4gICAgfTtcblxuICAgIGlmKCFvcHRzLm5vR3JpZENlbGwpIHtcbiAgICAgICAgb3V0LnJvdyA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIHJvdyBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgICAgICBvdXQuY29sdW1uID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgY29sdW1uIGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBmdW5jdGlvbihjb250YWluZXJPdXQsIGxheW91dCwgY29lcmNlLCBkZmx0RG9tYWlucykge1xuICAgIHZhciBkZmx0WCA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy54KSB8fCBbMCwgMV07XG4gICAgdmFyIGRmbHRZID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLnkpIHx8IFswLCAxXTtcblxuICAgIHZhciBncmlkID0gbGF5b3V0LmdyaWQ7XG4gICAgaWYoZ3JpZCkge1xuICAgICAgICB2YXIgY29sdW1uID0gY29lcmNlKCdkb21haW4uY29sdW1uJyk7XG4gICAgICAgIGlmKGNvbHVtbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihjb2x1bW4gPCBncmlkLmNvbHVtbnMpIGRmbHRYID0gZ3JpZC5fZG9tYWlucy54W2NvbHVtbl07XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLmNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3cgPSBjb2VyY2UoJ2RvbWFpbi5yb3cnKTtcbiAgICAgICAgaWYocm93ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKHJvdyA8IGdyaWQucm93cykgZGZsdFkgPSBncmlkLl9kb21haW5zLnlbcm93XTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4ucm93O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHggPSBjb2VyY2UoJ2RvbWFpbi54JywgZGZsdFgpO1xuICAgIHZhciB5ID0gY29lcmNlKCdkb21haW4ueScsIGRmbHRZKTtcblxuICAgIC8vIGRvbid0IGFjY2VwdCBiYWQgaW5wdXQgZGF0YVxuICAgIGlmKCEoeFswXSA8IHhbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnggPSBkZmx0WC5zbGljZSgpO1xuICAgIGlmKCEoeVswXSA8IHlbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnkgPSBkZmx0WS5zbGljZSgpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB4Zm9ybU1hdHJpeChtLCB2KSB7XG4gICAgdmFyIG91dCA9IFswLCAwLCAwLCAwXTtcbiAgICB2YXIgaSwgajtcblxuICAgIGZvcihpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICBmb3IoaiA9IDA7IGogPCA0OyArK2opIHtcbiAgICAgICAgICAgIG91dFtqXSArPSBtWzQgKiBpICsgal0gKiB2W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gcHJvamVjdChjYW1lcmEsIHYpIHtcbiAgICB2YXIgcCA9IHhmb3JtTWF0cml4KGNhbWVyYS5wcm9qZWN0aW9uLFxuICAgICAgICB4Zm9ybU1hdHJpeChjYW1lcmEudmlldyxcbiAgICAgICAgeGZvcm1NYXRyaXgoY2FtZXJhLm1vZGVsLCBbdlswXSwgdlsxXSwgdlsyXSwgMV0pKSk7XG4gICAgcmV0dXJuIHA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdDtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB6aXAzKHgsIHksIHosIGxlbikge1xuICAgIGxlbiA9IGxlbiB8fCB4Lmxlbmd0aDtcblxuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gW3hbaV0sIHlbaV0sIHpbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG52YXIgaG92ZXJ0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLmhvdmVydGVtcGxhdGVBdHRycztcbnZhciBzdXJmYWNlQXR0cnMgPSByZXF1aXJlKCcuLi9zdXJmYWNlL2F0dHJpYnV0ZXMnKTtcbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kRmxhdCh7XG4gICAgeDoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgWCBjb29yZGluYXRlcyBvZiB0aGUgdmVydGljZXMuIFRoZSBudGggZWxlbWVudCBvZiB2ZWN0b3JzIGB4YCwgYHlgIGFuZCBgemAnLFxuICAgICAgICAgICAgJ2pvaW50bHkgcmVwcmVzZW50IHRoZSBYLCBZIGFuZCBaIGNvb3JkaW5hdGVzIG9mIHRoZSBudGggdmVydGV4LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHk6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIFkgY29vcmRpbmF0ZXMgb2YgdGhlIHZlcnRpY2VzLiBUaGUgbnRoIGVsZW1lbnQgb2YgdmVjdG9ycyBgeGAsIGB5YCBhbmQgYHpgJyxcbiAgICAgICAgICAgICdqb2ludGx5IHJlcHJlc2VudCB0aGUgWCwgWSBhbmQgWiBjb29yZGluYXRlcyBvZiB0aGUgbnRoIHZlcnRleC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB6OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBaIGNvb3JkaW5hdGVzIG9mIHRoZSB2ZXJ0aWNlcy4gVGhlIG50aCBlbGVtZW50IG9mIHZlY3RvcnMgYHhgLCBgeWAgYW5kIGB6YCcsXG4gICAgICAgICAgICAnam9pbnRseSByZXByZXNlbnQgdGhlIFgsIFkgYW5kIFogY29vcmRpbmF0ZXMgb2YgdGhlIG50aCB2ZXJ0ZXguJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBpOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdBIHZlY3RvciBvZiB2ZXJ0ZXggaW5kaWNlcywgaS5lLiBpbnRlZ2VyIHZhbHVlcyBiZXR3ZWVuIDAgYW5kIHRoZSBsZW5ndGggb2YgdGhlIHZlcnRleCcsXG4gICAgICAgICAgICAndmVjdG9ycywgcmVwcmVzZW50aW5nIHRoZSAqZmlyc3QqIHZlcnRleCBvZiBhIHRyaWFuZ2xlLiBGb3IgZXhhbXBsZSwgYHtpW21dLCBqW21dLCBrW21dfWAnLFxuICAgICAgICAgICAgJ3RvZ2V0aGVyIHJlcHJlc2VudCBmYWNlIG0gKHRyaWFuZ2xlIG0pIGluIHRoZSBtZXNoLCB3aGVyZSBgaVttXSA9IG5gIHBvaW50cyB0byB0aGUgdHJpcGxldCcsXG4gICAgICAgICAgICAnYHt4W25dLCB5W25dLCB6W25dfWAgaW4gdGhlIHZlcnRleCBhcnJheXMuIFRoZXJlZm9yZSwgZWFjaCBlbGVtZW50IGluIGBpYCByZXByZXNlbnRzIGEnLFxuICAgICAgICAgICAgJ3BvaW50IGluIHNwYWNlLCB3aGljaCBpcyB0aGUgZmlyc3QgdmVydGV4IG9mIGEgdHJpYW5nbGUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgajoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQSB2ZWN0b3Igb2YgdmVydGV4IGluZGljZXMsIGkuZS4gaW50ZWdlciB2YWx1ZXMgYmV0d2VlbiAwIGFuZCB0aGUgbGVuZ3RoIG9mIHRoZSB2ZXJ0ZXgnLFxuICAgICAgICAgICAgJ3ZlY3RvcnMsIHJlcHJlc2VudGluZyB0aGUgKnNlY29uZCogdmVydGV4IG9mIGEgdHJpYW5nbGUuIEZvciBleGFtcGxlLCBge2lbbV0sIGpbbV0sIGtbbV19YCAnLFxuICAgICAgICAgICAgJ3RvZ2V0aGVyIHJlcHJlc2VudCBmYWNlIG0gKHRyaWFuZ2xlIG0pIGluIHRoZSBtZXNoLCB3aGVyZSBgalttXSA9IG5gIHBvaW50cyB0byB0aGUgdHJpcGxldCcsXG4gICAgICAgICAgICAnYHt4W25dLCB5W25dLCB6W25dfWAgaW4gdGhlIHZlcnRleCBhcnJheXMuIFRoZXJlZm9yZSwgZWFjaCBlbGVtZW50IGluIGBqYCByZXByZXNlbnRzIGEnLFxuICAgICAgICAgICAgJ3BvaW50IGluIHNwYWNlLCB3aGljaCBpcyB0aGUgc2Vjb25kIHZlcnRleCBvZiBhIHRyaWFuZ2xlLidcbiAgICAgICAgXS5qb2luKCcgJylcblxuICAgIH0sXG4gICAgazoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQSB2ZWN0b3Igb2YgdmVydGV4IGluZGljZXMsIGkuZS4gaW50ZWdlciB2YWx1ZXMgYmV0d2VlbiAwIGFuZCB0aGUgbGVuZ3RoIG9mIHRoZSB2ZXJ0ZXgnLFxuICAgICAgICAgICAgJ3ZlY3RvcnMsIHJlcHJlc2VudGluZyB0aGUgKnRoaXJkKiB2ZXJ0ZXggb2YgYSB0cmlhbmdsZS4gRm9yIGV4YW1wbGUsIGB7aVttXSwgalttXSwga1ttXX1gJyxcbiAgICAgICAgICAgICd0b2dldGhlciByZXByZXNlbnQgZmFjZSBtICh0cmlhbmdsZSBtKSBpbiB0aGUgbWVzaCwgd2hlcmUgYGtbbV0gPSBuYCBwb2ludHMgdG8gdGhlIHRyaXBsZXQgJyxcbiAgICAgICAgICAgICdge3hbbl0sIHlbbl0sIHpbbl19YCBpbiB0aGUgdmVydGV4IGFycmF5cy4gVGhlcmVmb3JlLCBlYWNoIGVsZW1lbnQgaW4gYGtgIHJlcHJlc2VudHMgYScsXG4gICAgICAgICAgICAncG9pbnQgaW4gc3BhY2UsIHdoaWNoIGlzIHRoZSB0aGlyZCB2ZXJ0ZXggb2YgYSB0cmlhbmdsZS4nXG4gICAgICAgIF0uam9pbignICcpXG5cbiAgICB9LFxuXG4gICAgdGV4dDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB0ZXh0IGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCB0aGUgdmVydGljZXMuJyxcbiAgICAgICAgICAgICdJZiB0cmFjZSBgaG92ZXJpbmZvYCBjb250YWlucyBhICp0ZXh0KiBmbGFnIGFuZCAqaG92ZXJ0ZXh0KiBpcyBub3Qgc2V0LCcsXG4gICAgICAgICAgICAndGhlc2UgZWxlbWVudHMgd2lsbCBiZSBzZWVuIGluIHRoZSBob3ZlciBsYWJlbHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgaG92ZXJ0ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NhbWUgYXMgYHRleHRgLidcbiAgICB9LFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdjYWxjJ30pLFxuXG4gICAgZGVsYXVuYXlheGlzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICB2YWx1ZXM6IFsgJ3gnLCAneScsICd6JyBdLFxuICAgICAgICBkZmx0OiAneicsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgRGVsYXVuYXkgYXhpcywgd2hpY2ggaXMgdGhlIGF4aXMgdGhhdCBpcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBzdXJmYWNlIG9mIHRoZScsXG4gICAgICAgICAgICAnRGVsYXVuYXkgdHJpYW5ndWxhdGlvbi4nLFxuICAgICAgICAgICAgJ0l0IGhhcyBhbiBlZmZlY3QgaWYgYGlgLCBgamAsIGBrYCBhcmUgbm90IHByb3ZpZGVkIGFuZCBgYWxwaGFodWxsYCBpcyBzZXQgdG8gaW5kaWNhdGUnLFxuICAgICAgICAgICAgJ0RlbGF1bmF5IHRyaWFuZ3VsYXRpb24uJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBhbHBoYWh1bGw6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRmbHQ6IC0xLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaG93IHRoZSBtZXNoIHN1cmZhY2UgdHJpYW5nbGVzIGFyZSBkZXJpdmVkIGZyb20gdGhlIHNldCBvZicsXG4gICAgICAgICAgICAndmVydGljZXMgKHBvaW50cykgcmVwcmVzZW50ZWQgYnkgdGhlIGB4YCwgYHlgIGFuZCBgemAgYXJyYXlzLCBpZicsXG4gICAgICAgICAgICAndGhlIGBpYCwgYGpgLCBga2AgYXJyYXlzIGFyZSBub3Qgc3VwcGxpZWQuJyxcbiAgICAgICAgICAgICdGb3IgZ2VuZXJhbCB1c2Ugb2YgYG1lc2gzZGAgaXQgaXMgcHJlZmVycmVkIHRoYXQgYGlgLCBgamAsIGBrYCBhcmUnLFxuICAgICAgICAgICAgJ3N1cHBsaWVkLicsXG5cbiAgICAgICAgICAgICdJZiAqLTEqLCBEZWxhdW5heSB0cmlhbmd1bGF0aW9uIGlzIHVzZWQsIHdoaWNoIGlzIG1haW5seSBzdWl0YWJsZSBpZiB0aGUnLFxuICAgICAgICAgICAgJ21lc2ggaXMgYSBzaW5nbGUsIG1vcmUgb3IgbGVzcyBsYXllciBzdXJmYWNlIHRoYXQgaXMgcGVycGVuZGljdWxhciB0byBgZGVsYXVuYXlheGlzYC4nLFxuICAgICAgICAgICAgJ0luIGNhc2UgdGhlIGBkZWxhdW5heWF4aXNgIGludGVyc2VjdHMgdGhlIG1lc2ggc3VyZmFjZSBhdCBtb3JlIHRoYW4gb25lIHBvaW50JyxcbiAgICAgICAgICAgICdpdCB3aWxsIHJlc3VsdCB0cmlhbmdsZXMgdGhhdCBhcmUgdmVyeSBsb25nIGluIHRoZSBkaW1lbnNpb24gb2YgYGRlbGF1bmF5YXhpc2AuJyxcblxuICAgICAgICAgICAgJ0lmICo+MCosIHRoZSBhbHBoYS1zaGFwZSBhbGdvcml0aG0gaXMgdXNlZC4gSW4gdGhpcyBjYXNlLCB0aGUgcG9zaXRpdmUgYGFscGhhaHVsbGAgdmFsdWUnLFxuICAgICAgICAgICAgJ3NpZ25hbHMgdGhlIHVzZSBvZiB0aGUgYWxwaGEtc2hhcGUgYWxnb3JpdGhtLCBfYW5kXyBpdHMgdmFsdWUnLFxuICAgICAgICAgICAgJ2FjdHMgYXMgdGhlIHBhcmFtZXRlciBmb3IgdGhlIG1lc2ggZml0dGluZy4nLFxuXG4gICAgICAgICAgICAnSWYgKjAqLCAgdGhlIGNvbnZleC1odWxsIGFsZ29yaXRobSBpcyB1c2VkLiBJdCBpcyBzdWl0YWJsZSBmb3IgY29udmV4IGJvZGllcycsXG4gICAgICAgICAgICAnb3IgaWYgdGhlIGludGVudGlvbiBpcyB0byBlbmNsb3NlIHRoZSBgeGAsIGB5YCBhbmQgYHpgIHBvaW50IHNldCBpbnRvIGEgY29udmV4JyxcbiAgICAgICAgICAgICdodWxsLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgaW50ZW5zaXR5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBpbnRlbnNpdHkgdmFsdWVzIGZvciB2ZXJ0aWNlcyBvciBjZWxscycsXG4gICAgICAgICAgICAnYXMgZGVmaW5lZCBieSBgaW50ZW5zaXR5bW9kZWAuJyxcbiAgICAgICAgICAgICdJdCBjYW4gYmUgdXNlZCBmb3IgcGxvdHRpbmcgZmllbGRzIG9uIG1lc2hlcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBpbnRlbnNpdHltb2RlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ3ZlcnRleCcsICdjZWxsJ10sXG4gICAgICAgIGRmbHQ6ICd2ZXJ0ZXgnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB0aGUgc291cmNlIG9mIGBpbnRlbnNpdHlgIHZhbHVlcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIC8vIENvbG9yIGZpZWxkXG4gICAgY29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgd2hvbGUgbWVzaCdcbiAgICB9LFxuICAgIHZlcnRleGNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBjb2xvciBvZiBlYWNoIHZlcnRleCcsXG4gICAgICAgICAgICAnT3ZlcnJpZGVzICpjb2xvciouIFdoaWxlIFJlZCwgZ3JlZW4gYW5kIGJsdWUgY29sb3JzJyxcbiAgICAgICAgICAgICdhcmUgaW4gdGhlIHJhbmdlIG9mIDAgYW5kIDI1NTsgaW4gdGhlIGNhc2Ugb2YgaGF2aW5nJyxcbiAgICAgICAgICAgICd2ZXJ0ZXggY29sb3IgZGF0YSBpbiBSR0JBIGZvcm1hdCwgdGhlIGFscGhhIGNvbG9yJyxcbiAgICAgICAgICAgICdzaG91bGQgYmUgbm9ybWFsaXplZCB0byBiZSBiZXR3ZWVuIDAgYW5kIDEuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgZmFjZWNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBjb2xvciBvZiBlYWNoIGZhY2UnLFxuICAgICAgICAgICAgJ092ZXJyaWRlcyAqY29sb3IqIGFuZCAqdmVydGV4Y29sb3IqLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHRyYW5zZm9ybXM6IHVuZGVmaW5lZFxufSxcblxuY29sb3JTY2FsZUF0dHJzKCcnLCB7XG4gICAgY29sb3JBdHRyOiAnYGludGVuc2l0eWAnLFxuICAgIHNob3dTY2FsZURmbHQ6IHRydWUsXG4gICAgZWRpdFR5cGVPdmVycmlkZTogJ2NhbGMnXG59KSwge1xuICAgIG9wYWNpdHk6IHN1cmZhY2VBdHRycy5vcGFjaXR5LFxuXG4gICAgLy8gRmxhdCBzaGFkZWQgbW9kZVxuICAgIGZsYXRzaGFkaW5nOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGZsdDogZmFsc2UsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBub3JtYWwgc21vb3RoaW5nIGlzIGFwcGxpZWQgdG8gdGhlIG1lc2hlcywnLFxuICAgICAgICAgICAgJ2NyZWF0aW5nIG1lc2hlcyB3aXRoIGFuIGFuZ3VsYXIsIGxvdy1wb2x5IGxvb2sgdmlhIGZsYXQgcmVmbGVjdGlvbnMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBjb250b3VyOiB7XG4gICAgICAgIHNob3c6IGV4dGVuZEZsYXQoe30sIHN1cmZhY2VBdHRycy5jb250b3Vycy54LnNob3csIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgd2hldGhlciBvciBub3QgZHluYW1pYyBjb250b3VycyBhcmUgc2hvd24gb24gaG92ZXInXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9KSxcbiAgICAgICAgY29sb3I6IHN1cmZhY2VBdHRycy5jb250b3Vycy54LmNvbG9yLFxuICAgICAgICB3aWR0aDogc3VyZmFjZUF0dHJzLmNvbnRvdXJzLngud2lkdGgsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICB9LFxuXG4gICAgbGlnaHRwb3NpdGlvbjoge1xuICAgICAgICB4OiBleHRlbmRGbGF0KHt9LCBzdXJmYWNlQXR0cnMubGlnaHRwb3NpdGlvbi54LCB7ZGZsdDogMWU1fSksXG4gICAgICAgIHk6IGV4dGVuZEZsYXQoe30sIHN1cmZhY2VBdHRycy5saWdodHBvc2l0aW9uLnksIHtkZmx0OiAxZTV9KSxcbiAgICAgICAgejogZXh0ZW5kRmxhdCh7fSwgc3VyZmFjZUF0dHJzLmxpZ2h0cG9zaXRpb24ueiwge2RmbHQ6IDB9KSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sXG4gICAgbGlnaHRpbmc6IGV4dGVuZEZsYXQoe1xuICAgICAgICB2ZXJ0ZXhub3JtYWxzZXBzaWxvbjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgbWluOiAwLjAwLFxuICAgICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgICAgZGZsdDogMWUtMTIsIC8vIG90aGVyd2lzZSBmaW5lbHkgdGVzc2VsbGF0ZWQgdGhpbmdzIGVnLiB0aGUgYnJhaW4gd2lsbCBoYXZlIG5vIHNwZWN1bGFyIGxpZ2h0IHJlZmxlY3Rpb25cbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Vwc2lsb24gZm9yIHZlcnRleCBub3JtYWxzIGNhbGN1bGF0aW9uIGF2b2lkcyBtYXRoIGlzc3VlcyBhcmlzaW5nIGZyb20gZGVnZW5lcmF0ZSBnZW9tZXRyeS4nXG4gICAgICAgIH0sXG4gICAgICAgIGZhY2Vub3JtYWxzZXBzaWxvbjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgbWluOiAwLjAwLFxuICAgICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgICAgZGZsdDogMWUtNiwgLy8gZXZlbiB0aGUgYnJhaW4gbW9kZWwgZG9lc24ndCBhcHBlYXIgdG8gbmVlZCBmaW5lciB0aGFuIHRoaXNcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Vwc2lsb24gZm9yIGZhY2Ugbm9ybWFscyBjYWxjdWxhdGlvbiBhdm9pZHMgbWF0aCBpc3N1ZXMgYXJpc2luZyBmcm9tIGRlZ2VuZXJhdGUgZ2VvbWV0cnkuJ1xuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSwgc3VyZmFjZUF0dHJzLmxpZ2h0aW5nKSxcblxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbywge2VkaXRUeXBlOiAnY2FsYyd9KSxcbiAgICBzaG93bGVnZW5kOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuc2hvd2xlZ2VuZCwge2RmbHQ6IGZhbHNlfSlcbn0pO1xuIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==