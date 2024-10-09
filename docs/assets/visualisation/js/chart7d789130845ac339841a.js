(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_mesh3d_js"],{

/***/ "./node_modules/alpha-complex/alpha.js":
/*!*********************************************!*\
  !*** ./node_modules/alpha-complex/alpha.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = alphaComplex

var delaunay = __webpack_require__(/*! delaunay-triangulate */ "./node_modules/delaunay-triangulate/triangulate.js")
var circumradius = __webpack_require__(/*! circumradius */ "./node_modules/circumradius/crad.js")

function alphaComplex(alpha, points) {
  return delaunay(points).filter(function(cell) {
    var simplex = new Array(cell.length)
    for(var i=0; i<cell.length; ++i) {
      simplex[i] = points[cell[i]]
    }
    return circumradius(simplex) * alpha < 1
  })
}

/***/ }),

/***/ "./node_modules/alpha-shape/alpha.js":
/*!*******************************************!*\
  !*** ./node_modules/alpha-shape/alpha.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = alphaShape

var ac = __webpack_require__(/*! alpha-complex */ "./node_modules/alpha-complex/alpha.js")
var bnd = __webpack_require__(/*! simplicial-complex-boundary */ "./node_modules/simplicial-complex-boundary/boundary.js")

function alphaShape(alpha, points) {
  return bnd(ac(alpha, points))
}

/***/ }),

/***/ "./node_modules/boundary-cells/boundary.js":
/*!*************************************************!*\
  !*** ./node_modules/boundary-cells/boundary.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


module.exports = boundary

function boundary (cells) {
  var i, j, k
  var n = cells.length
  var sz = 0
  for (i = 0; i < n; ++i) {
    sz += cells[i].length
  }
  var result = new Array(sz)
  var ptr = 0
  for (i = 0; i < n; ++i) {
    var c = cells[i]
    var d = c.length
    for (j = 0; j < d; ++j) {
      var b = result[ptr++] = new Array(d - 1)
      var p = 0
      for (k = 0; k < d; ++k) {
        if (k === j) {
          continue
        }
        b[p++] = c[k]
      }
      if (j & 1) {
        var tmp = b[1]
        b[1] = b[0]
        b[0] = tmp
      }
    }
  }
  return result
}


/***/ }),

/***/ "./node_modules/cell-orientation/orientation.js":
/*!******************************************************!*\
  !*** ./node_modules/cell-orientation/orientation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


module.exports = orientation

function orientation(s) {
  var p = 1
  for(var i=1; i<s.length; ++i) {
    for(var j=0; j<i; ++j) {
      if(s[i] < s[j]) {
        p = -p
      } else if(s[j] === s[i]) {
        return 0
      }
    }
  }
  return p
}


/***/ }),

/***/ "./node_modules/circumcenter/circumcenter.js":
/*!***************************************************!*\
  !*** ./node_modules/circumcenter/circumcenter.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var dup = __webpack_require__(/*! dup */ "./node_modules/dup/dup.js")
var solve = __webpack_require__(/*! robust-linear-solve */ "./node_modules/robust-linear-solve/linsolve.js")

function dot(a, b) {
  var s = 0.0
  var d = a.length
  for(var i=0; i<d; ++i) {
    s += a[i] * b[i]
  }
  return s
}

function barycentricCircumcenter(points) {
  var N = points.length
  if(N === 0) {
    return []
  }
  
  var D = points[0].length
  var A = dup([points.length+1, points.length+1], 1.0)
  var b = dup([points.length+1], 1.0)
  A[N][N] = 0.0
  for(var i=0; i<N; ++i) {
    for(var j=0; j<=i; ++j) {
      A[j][i] = A[i][j] = 2.0 * dot(points[i], points[j])
    }
    b[i] = dot(points[i], points[i])
  }
  var x = solve(A, b)

  var denom = 0.0
  var h = x[N+1]
  for(var i=0; i<h.length; ++i) {
    denom += h[i]
  }

  var y = new Array(N)
  for(var i=0; i<N; ++i) {
    var h = x[i]
    var numer = 0.0
    for(var j=0; j<h.length; ++j) {
      numer += h[j]
    }
    y[i] =  numer / denom
  }

  return y
}

function circumcenter(points) {
  if(points.length === 0) {
    return []
  }
  var D = points[0].length
  var result = dup([D])
  var weights = barycentricCircumcenter(points)
  for(var i=0; i<points.length; ++i) {
    for(var j=0; j<D; ++j) {
      result[j] += points[i][j] * weights[i]
    }
  }
  return result
}

circumcenter.barycenetric = barycentricCircumcenter
module.exports = circumcenter

/***/ }),

/***/ "./node_modules/circumradius/crad.js":
/*!*******************************************!*\
  !*** ./node_modules/circumradius/crad.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = circumradius

var circumcenter = __webpack_require__(/*! circumcenter */ "./node_modules/circumcenter/circumcenter.js")

function circumradius(points) {
  var center = circumcenter(points)
  var avgDist = 0.0
  for(var i=0; i<points.length; ++i) {
    var p = points[i]
    for(var j=0; j<center.length; ++j) {
      avgDist += Math.pow(p[j] - center[j], 2)
    }
  }
  return Math.sqrt(avgDist / points.length)
}

/***/ }),

/***/ "./node_modules/compare-cell/compare.js":
/*!**********************************************!*\
  !*** ./node_modules/compare-cell/compare.js ***!
  \**********************************************/
/***/ ((module) => {

module.exports = compareCells

var min = Math.min

function compareInt(a, b) {
  return a - b
}

function compareCells(a, b) {
  var n = a.length
    , t = a.length - b.length
  if(t) {
    return t
  }
  switch(n) {
    case 0:
      return 0
    case 1:
      return a[0] - b[0]
    case 2:
      return (a[0]+a[1]-b[0]-b[1]) ||
             min(a[0],a[1]) - min(b[0],b[1])
    case 3:
      var l1 = a[0]+a[1]
        , m1 = b[0]+b[1]
      t = l1+a[2] - (m1+b[2])
      if(t) {
        return t
      }
      var l0 = min(a[0], a[1])
        , m0 = min(b[0], b[1])
      return min(l0, a[2]) - min(m0, b[2]) ||
             min(l0+a[2], l1) - min(m0+b[2], m1)
    case 4:
      var aw=a[0], ax=a[1], ay=a[2], az=a[3]
        , bw=b[0], bx=b[1], by=b[2], bz=b[3]
      return (aw+ax+ay+az)-(bw+bx+by+bz) ||
             min(aw,ax,ay,az)-min(bw,bx,by,bz,bw) ||
             min(aw+ax,aw+ay,aw+az,ax+ay,ax+az,ay+az) -
               min(bw+bx,bw+by,bw+bz,bx+by,bx+bz,by+bz) ||
             min(aw+ax+ay,aw+ax+az,aw+ay+az,ax+ay+az) -
               min(bw+bx+by,bw+bx+bz,bw+by+bz,bx+by+bz)
    default:
      var as = a.slice().sort(compareInt)
      var bs = b.slice().sort(compareInt)
      for(var i=0; i<n; ++i) {
        t = as[i] - bs[i]
        if(t) {
          return t
        }
      }
      return 0
  }
}


/***/ }),

/***/ "./node_modules/compare-oriented-cell/compare.js":
/*!*******************************************************!*\
  !*** ./node_modules/compare-oriented-cell/compare.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var compareCells = __webpack_require__(/*! compare-cell */ "./node_modules/compare-cell/compare.js")
var parity = __webpack_require__(/*! cell-orientation */ "./node_modules/cell-orientation/orientation.js")

module.exports = compareOrientedCells

function compareOrientedCells(a, b) {
  return compareCells(a, b) || parity(a) - parity(b)
}


/***/ }),

/***/ "./node_modules/plotly.js/lib/mesh3d.js":
/*!**********************************************!*\
  !*** ./node_modules/plotly.js/lib/mesh3d.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/mesh3d */ "./node_modules/plotly.js/src/traces/mesh3d/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/mesh3d/calc.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/mesh3d/calc.js ***!
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



var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");

module.exports = function calc(gd, trace) {
    if(trace.intensity) {
        colorscaleCalc(gd, trace, {
            vals: trace.intensity,
            containerStr: '',
            cLetter: 'c'
        });
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/mesh3d/convert.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/mesh3d/convert.js ***!
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



var createMesh = __webpack_require__(/*! gl-mesh3d */ "./node_modules/gl-mesh3d/mesh.js");
var triangulate = __webpack_require__(/*! delaunay-triangulate */ "./node_modules/delaunay-triangulate/triangulate.js");
var alphaShape = __webpack_require__(/*! alpha-shape */ "./node_modules/alpha-shape/alpha.js");
var convexHull = __webpack_require__(/*! convex-hull */ "./node_modules/convex-hull/ch.js");

var parseColorScale = __webpack_require__(/*! ../../lib/gl_format_color */ "./node_modules/plotly.js/src/lib/gl_format_color.js").parseColorScale;
var str2RgbaArray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");
var extractOpts = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").extractOpts;
var zip3 = __webpack_require__(/*! ../../plots/gl3d/zip3 */ "./node_modules/plotly.js/src/plots/gl3d/zip3.js");

function Mesh3DTrace(scene, mesh, uid) {
    this.scene = scene;
    this.uid = uid;
    this.mesh = mesh;
    this.name = '';
    this.color = '#fff';
    this.data = null;
    this.showContour = false;
}

var proto = Mesh3DTrace.prototype;

proto.handlePick = function(selection) {
    if(selection.object === this.mesh) {
        var selectIndex = selection.index = selection.data.index;

        if(selection.data._cellCenter) {
            selection.traceCoordinate = selection.data.dataCoordinate;
        } else {
            selection.traceCoordinate = [
                this.data.x[selectIndex],
                this.data.y[selectIndex],
                this.data.z[selectIndex]
            ];
        }

        var text = this.data.hovertext || this.data.text;
        if(Array.isArray(text) && text[selectIndex] !== undefined) {
            selection.textLabel = text[selectIndex];
        } else if(text) {
            selection.textLabel = text;
        }

        return true;
    }
};

function parseColorArray(colors) {
    var b = [];
    var len = colors.length;
    for(var i = 0; i < len; i++) {
        b[i] = str2RgbaArray(colors[i]);
    }
    return b;
}

// Unpack position data
function toDataCoords(axis, coord, scale, calendar) {
    var b = [];
    var len = coord.length;
    for(var i = 0; i < len; i++) {
        b[i] = axis.d2l(coord[i], 0, calendar) * scale;
    }
    return b;
}

// Round indices if passed as floats
function toRoundIndex(a) {
    var b = [];
    var len = a.length;
    for(var i = 0; i < len; i++) {
        b[i] = Math.round(a[i]);
    }
    return b;
}

function delaunayCells(delaunayaxis, positions) {
    var d = ['x', 'y', 'z'].indexOf(delaunayaxis);
    var b = [];
    var len = positions.length;
    for(var i = 0; i < len; i++) {
        b[i] = [positions[i][(d + 1) % 3], positions[i][(d + 2) % 3]];
    }
    return triangulate(b);
}

// Validate indices
function hasValidIndices(list, numVertices) {
    var len = list.length;
    for(var i = 0; i < len; i++) {
        if(list[i] <= -0.5 || list[i] >= numVertices - 0.5) { // Note: the indices would be rounded -0.49 is valid.
            return false;
        }
    }
    return true;
}

proto.update = function(data) {
    var scene = this.scene;
    var layout = scene.fullSceneLayout;

    this.data = data;

    var numVertices = data.x.length;

    var positions = zip3(
        toDataCoords(layout.xaxis, data.x, scene.dataScale[0], data.xcalendar),
        toDataCoords(layout.yaxis, data.y, scene.dataScale[1], data.ycalendar),
        toDataCoords(layout.zaxis, data.z, scene.dataScale[2], data.zcalendar)
    );

    var cells;
    if(data.i && data.j && data.k) {
        if(
            data.i.length !== data.j.length ||
            data.j.length !== data.k.length ||
            !hasValidIndices(data.i, numVertices) ||
            !hasValidIndices(data.j, numVertices) ||
            !hasValidIndices(data.k, numVertices)
        ) {
            return;
        }
        cells = zip3(
            toRoundIndex(data.i),
            toRoundIndex(data.j),
            toRoundIndex(data.k)
        );
    } else if(data.alphahull === 0) {
        cells = convexHull(positions);
    } else if(data.alphahull > 0) {
        cells = alphaShape(data.alphahull, positions);
    } else {
        cells = delaunayCells(data.delaunayaxis, positions);
    }

    var config = {
        positions: positions,
        cells: cells,
        lightPosition: [data.lightposition.x, data.lightposition.y, data.lightposition.z],
        ambient: data.lighting.ambient,
        diffuse: data.lighting.diffuse,
        specular: data.lighting.specular,
        roughness: data.lighting.roughness,
        fresnel: data.lighting.fresnel,
        vertexNormalsEpsilon: data.lighting.vertexnormalsepsilon,
        faceNormalsEpsilon: data.lighting.facenormalsepsilon,
        opacity: data.opacity,
        contourEnable: data.contour.show,
        contourColor: str2RgbaArray(data.contour.color).slice(0, 3),
        contourWidth: data.contour.width,
        useFacetNormals: data.flatshading
    };

    if(data.intensity) {
        var cOpts = extractOpts(data);
        this.color = '#fff';
        var mode = data.intensitymode;
        config[mode + 'Intensity'] = data.intensity;
        config[mode + 'IntensityBounds'] = [cOpts.min, cOpts.max];
        config.colormap = parseColorScale(data);
    } else if(data.vertexcolor) {
        this.color = data.vertexcolor[0];
        config.vertexColors = parseColorArray(data.vertexcolor);
    } else if(data.facecolor) {
        this.color = data.facecolor[0];
        config.cellColors = parseColorArray(data.facecolor);
    } else {
        this.color = data.color;
        config.meshColor = str2RgbaArray(data.color);
    }

    // Update mesh
    this.mesh.update(config);
};

proto.dispose = function() {
    this.scene.glplot.remove(this.mesh);
    this.mesh.dispose();
};

function createMesh3DTrace(scene, data) {
    var gl = scene.glplot.gl;
    var mesh = createMesh({gl: gl});
    var result = new Mesh3DTrace(scene, mesh, data.uid);
    mesh._trace = result;
    result.update(data);
    scene.glplot.add(mesh);
    return result;
}

module.exports = createMesh3DTrace;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/mesh3d/defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/mesh3d/defaults.js ***!
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




var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/mesh3d/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    // read in face/vertex properties
    function readComponents(array) {
        var ret = array.map(function(attr) {
            var result = coerce(attr);

            if(result && Lib.isArrayOrTypedArray(result)) return result;
            return null;
        });

        return ret.every(function(x) {
            return x && x.length === ret[0].length;
        }) && ret;
    }

    var coords = readComponents(['x', 'y', 'z']);
    if(!coords) {
        traceOut.visible = false;
        return;
    }

    readComponents(['i', 'j', 'k']);
    // three indices should be all provided or not
    if(
        (traceOut.i && (!traceOut.j || !traceOut.k)) ||
        (traceOut.j && (!traceOut.k || !traceOut.i)) ||
        (traceOut.k && (!traceOut.i || !traceOut.j))
    ) {
        traceOut.visible = false;
        return;
    }

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y', 'z'], layout);

    // Coerce remaining properties
    [
        'lighting.ambient',
        'lighting.diffuse',
        'lighting.specular',
        'lighting.roughness',
        'lighting.fresnel',
        'lighting.vertexnormalsepsilon',
        'lighting.facenormalsepsilon',
        'lightposition.x',
        'lightposition.y',
        'lightposition.z',
        'flatshading',
        'alphahull',
        'delaunayaxis',
        'opacity'
    ].forEach(function(x) { coerce(x); });

    var showContour = coerce('contour.show');
    if(showContour) {
        coerce('contour.color');
        coerce('contour.width');
    }

    if('intensity' in traceIn) {
        coerce('intensity');
        coerce('intensitymode');
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'c'});
    } else {
        traceOut.showscale = false;

        if('facecolor' in traceIn) coerce('facecolor');
        else if('vertexcolor' in traceIn) coerce('vertexcolor');
        else coerce('color', defaultColor);
    }

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    // disable 1D transforms
    // x/y/z should match lengths, and i/j/k should match as well, but
    // the two sets have different lengths so transforms wouldn't work.
    traceOut._length = null;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/mesh3d/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/mesh3d/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/mesh3d/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/mesh3d/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/mesh3d/calc.js"),
    colorbar: {
        min: 'cmin',
        max: 'cmax'
    },
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/mesh3d/convert.js"),

    moduleType: 'trace',
    name: 'mesh3d',
    basePlotModule: __webpack_require__(/*! ../../plots/gl3d */ "./node_modules/plotly.js/src/plots/gl3d/index.js"),
    categories: ['gl3d', 'showLegend'],
    meta: {
        description: [
            'Draws sets of triangles with coordinates given by',
            'three 1-dimensional arrays in `x`, `y`, `z` and',
            '(1) a sets of `i`, `j`, `k` indices',
            '(2) Delaunay triangulation or',
            '(3) the Alpha-shape algorithm or',
            '(4) the Convex-hull algorithm'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/reduce-simplicial-complex/reduce.js":
/*!**********************************************************!*\
  !*** ./node_modules/reduce-simplicial-complex/reduce.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var compareCell = __webpack_require__(/*! compare-cell */ "./node_modules/compare-cell/compare.js")
var compareOrientedCell = __webpack_require__(/*! compare-oriented-cell */ "./node_modules/compare-oriented-cell/compare.js")
var orientation = __webpack_require__(/*! cell-orientation */ "./node_modules/cell-orientation/orientation.js")

module.exports = reduceCellComplex

function reduceCellComplex(cells) {
  cells.sort(compareOrientedCell)
  var n = cells.length
  var ptr = 0
  for(var i=0; i<n; ++i) {
    var c = cells[i]
    var o = orientation(c)
    if(o === 0) {
      continue
    }
    if(ptr > 0) {
      var f = cells[ptr-1]
      if(compareCell(c, f) === 0 &&
         orientation(f)    !== o) {
        ptr -= 1
        continue
      }
    }
    cells[ptr++] = c
  }
  cells.length = ptr
  return cells
}


/***/ }),

/***/ "./node_modules/simplicial-complex-boundary/boundary.js":
/*!**************************************************************!*\
  !*** ./node_modules/simplicial-complex-boundary/boundary.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = boundary

var bnd = __webpack_require__(/*! boundary-cells */ "./node_modules/boundary-cells/boundary.js")
var reduce = __webpack_require__(/*! reduce-simplicial-complex */ "./node_modules/reduce-simplicial-complex/reduce.js")

function boundary(cells) {
  return reduce(bnd(cells))
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2FscGhhLWNvbXBsZXgvYWxwaGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9hbHBoYS1zaGFwZS9hbHBoYS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2JvdW5kYXJ5LWNlbGxzL2JvdW5kYXJ5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvY2VsbC1vcmllbnRhdGlvbi9vcmllbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2NpcmN1bWNlbnRlci9jaXJjdW1jZW50ZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9jaXJjdW1yYWRpdXMvY3JhZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2NvbXBhcmUtY2VsbC9jb21wYXJlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvY29tcGFyZS1vcmllbnRlZC1jZWxsL2NvbXBhcmUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvbGliL21lc2gzZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL21lc2gzZC9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvbWVzaDNkL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9tZXNoM2QvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9tZXNoM2QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9yZWR1Y2Utc2ltcGxpY2lhbC1jb21wbGV4L3JlZHVjZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3NpbXBsaWNpYWwtY29tcGxleC1ib3VuZGFyeS9ib3VuZGFyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBWTs7QUFFWjs7QUFFQSxlQUFlLG1CQUFPLENBQUMsZ0ZBQXNCO0FBQzdDLG1CQUFtQixtQkFBTyxDQUFDLHlEQUFjOztBQUV6QztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZUFBZTtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQzs7Ozs7Ozs7OztBQ2ZBOztBQUVBLFNBQVMsbUJBQU8sQ0FBQyw0REFBZTtBQUNoQyxVQUFVLG1CQUFPLENBQUMsMkZBQTZCOztBQUUvQztBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNQWTs7QUFFWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqQ1k7O0FBRVo7O0FBRUE7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQixnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEJZOztBQUVaLFVBQVUsbUJBQU8sQ0FBQyxzQ0FBSztBQUN2QixZQUFZLG1CQUFPLENBQUMsMkVBQXFCOztBQUV6QztBQUNBO0FBQ0E7QUFDQSxjQUFjLEtBQUs7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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QUU7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0RBQStELHlCQUF5QjtBQUN4RixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBLGdCQUFnQixtQkFBTyxDQUFDLDhFQUFjO0FBQ3RDLG9CQUFvQixtQkFBTyxDQUFDLDBFQUFZO0FBQ3hDLFVBQVUsbUJBQU8sQ0FBQyxrRUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsVUFBVSxtQkFBTyxDQUFDLHdFQUFXOztBQUU3QjtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMEVBQWtCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbENZOztBQUVaLGtCQUFrQixtQkFBTyxDQUFDLDREQUFjO0FBQ3hDLDBCQUEwQixtQkFBTyxDQUFDLDhFQUF1QjtBQUN6RCxrQkFBa0IsbUJBQU8sQ0FBQyx3RUFBa0I7O0FBRTVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUJZOztBQUVaOztBQUVBLFVBQVUsbUJBQU8sQ0FBQyxpRUFBZ0I7QUFDbEMsYUFBYSxtQkFBTyxDQUFDLHFGQUEyQjs7QUFFaEQ7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0N2Q3ODkxMzA4NDVhYzMzOTg0MWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBhbHBoYUNvbXBsZXhcblxudmFyIGRlbGF1bmF5ID0gcmVxdWlyZSgnZGVsYXVuYXktdHJpYW5ndWxhdGUnKVxudmFyIGNpcmN1bXJhZGl1cyA9IHJlcXVpcmUoJ2NpcmN1bXJhZGl1cycpXG5cbmZ1bmN0aW9uIGFscGhhQ29tcGxleChhbHBoYSwgcG9pbnRzKSB7XG4gIHJldHVybiBkZWxhdW5heShwb2ludHMpLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgdmFyIHNpbXBsZXggPSBuZXcgQXJyYXkoY2VsbC5sZW5ndGgpXG4gICAgZm9yKHZhciBpPTA7IGk8Y2VsbC5sZW5ndGg7ICsraSkge1xuICAgICAgc2ltcGxleFtpXSA9IHBvaW50c1tjZWxsW2ldXVxuICAgIH1cbiAgICByZXR1cm4gY2lyY3VtcmFkaXVzKHNpbXBsZXgpICogYWxwaGEgPCAxXG4gIH0pXG59IiwibW9kdWxlLmV4cG9ydHMgPSBhbHBoYVNoYXBlXG5cbnZhciBhYyA9IHJlcXVpcmUoJ2FscGhhLWNvbXBsZXgnKVxudmFyIGJuZCA9IHJlcXVpcmUoJ3NpbXBsaWNpYWwtY29tcGxleC1ib3VuZGFyeScpXG5cbmZ1bmN0aW9uIGFscGhhU2hhcGUoYWxwaGEsIHBvaW50cykge1xuICByZXR1cm4gYm5kKGFjKGFscGhhLCBwb2ludHMpKVxufSIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJvdW5kYXJ5XG5cbmZ1bmN0aW9uIGJvdW5kYXJ5IChjZWxscykge1xuICB2YXIgaSwgaiwga1xuICB2YXIgbiA9IGNlbGxzLmxlbmd0aFxuICB2YXIgc3ogPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICBzeiArPSBjZWxsc1tpXS5sZW5ndGhcbiAgfVxuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KHN6KVxuICB2YXIgcHRyID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgdmFyIGMgPSBjZWxsc1tpXVxuICAgIHZhciBkID0gYy5sZW5ndGhcbiAgICBmb3IgKGogPSAwOyBqIDwgZDsgKytqKSB7XG4gICAgICB2YXIgYiA9IHJlc3VsdFtwdHIrK10gPSBuZXcgQXJyYXkoZCAtIDEpXG4gICAgICB2YXIgcCA9IDBcbiAgICAgIGZvciAoayA9IDA7IGsgPCBkOyArK2spIHtcbiAgICAgICAgaWYgKGsgPT09IGopIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGJbcCsrXSA9IGNba11cbiAgICAgIH1cbiAgICAgIGlmIChqICYgMSkge1xuICAgICAgICB2YXIgdG1wID0gYlsxXVxuICAgICAgICBiWzFdID0gYlswXVxuICAgICAgICBiWzBdID0gdG1wXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9yaWVudGF0aW9uXG5cbmZ1bmN0aW9uIG9yaWVudGF0aW9uKHMpIHtcbiAgdmFyIHAgPSAxXG4gIGZvcih2YXIgaT0xOyBpPHMubGVuZ3RoOyArK2kpIHtcbiAgICBmb3IodmFyIGo9MDsgajxpOyArK2opIHtcbiAgICAgIGlmKHNbaV0gPCBzW2pdKSB7XG4gICAgICAgIHAgPSAtcFxuICAgICAgfSBlbHNlIGlmKHNbal0gPT09IHNbaV0pIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBkdXAgPSByZXF1aXJlKFwiZHVwXCIpXG52YXIgc29sdmUgPSByZXF1aXJlKFwicm9idXN0LWxpbmVhci1zb2x2ZVwiKVxuXG5mdW5jdGlvbiBkb3QoYSwgYikge1xuICB2YXIgcyA9IDAuMFxuICB2YXIgZCA9IGEubGVuZ3RoXG4gIGZvcih2YXIgaT0wOyBpPGQ7ICsraSkge1xuICAgIHMgKz0gYVtpXSAqIGJbaV1cbiAgfVxuICByZXR1cm4gc1xufVxuXG5mdW5jdGlvbiBiYXJ5Y2VudHJpY0NpcmN1bWNlbnRlcihwb2ludHMpIHtcbiAgdmFyIE4gPSBwb2ludHMubGVuZ3RoXG4gIGlmKE4gPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBcbiAgdmFyIEQgPSBwb2ludHNbMF0ubGVuZ3RoXG4gIHZhciBBID0gZHVwKFtwb2ludHMubGVuZ3RoKzEsIHBvaW50cy5sZW5ndGgrMV0sIDEuMClcbiAgdmFyIGIgPSBkdXAoW3BvaW50cy5sZW5ndGgrMV0sIDEuMClcbiAgQVtOXVtOXSA9IDAuMFxuICBmb3IodmFyIGk9MDsgaTxOOyArK2kpIHtcbiAgICBmb3IodmFyIGo9MDsgajw9aTsgKytqKSB7XG4gICAgICBBW2pdW2ldID0gQVtpXVtqXSA9IDIuMCAqIGRvdChwb2ludHNbaV0sIHBvaW50c1tqXSlcbiAgICB9XG4gICAgYltpXSA9IGRvdChwb2ludHNbaV0sIHBvaW50c1tpXSlcbiAgfVxuICB2YXIgeCA9IHNvbHZlKEEsIGIpXG5cbiAgdmFyIGRlbm9tID0gMC4wXG4gIHZhciBoID0geFtOKzFdXG4gIGZvcih2YXIgaT0wOyBpPGgubGVuZ3RoOyArK2kpIHtcbiAgICBkZW5vbSArPSBoW2ldXG4gIH1cblxuICB2YXIgeSA9IG5ldyBBcnJheShOKVxuICBmb3IodmFyIGk9MDsgaTxOOyArK2kpIHtcbiAgICB2YXIgaCA9IHhbaV1cbiAgICB2YXIgbnVtZXIgPSAwLjBcbiAgICBmb3IodmFyIGo9MDsgajxoLmxlbmd0aDsgKytqKSB7XG4gICAgICBudW1lciArPSBoW2pdXG4gICAgfVxuICAgIHlbaV0gPSAgbnVtZXIgLyBkZW5vbVxuICB9XG5cbiAgcmV0dXJuIHlcbn1cblxuZnVuY3Rpb24gY2lyY3VtY2VudGVyKHBvaW50cykge1xuICBpZihwb2ludHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgdmFyIEQgPSBwb2ludHNbMF0ubGVuZ3RoXG4gIHZhciByZXN1bHQgPSBkdXAoW0RdKVxuICB2YXIgd2VpZ2h0cyA9IGJhcnljZW50cmljQ2lyY3VtY2VudGVyKHBvaW50cylcbiAgZm9yKHZhciBpPTA7IGk8cG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgZm9yKHZhciBqPTA7IGo8RDsgKytqKSB7XG4gICAgICByZXN1bHRbal0gKz0gcG9pbnRzW2ldW2pdICogd2VpZ2h0c1tpXVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNpcmN1bWNlbnRlci5iYXJ5Y2VuZXRyaWMgPSBiYXJ5Y2VudHJpY0NpcmN1bWNlbnRlclxubW9kdWxlLmV4cG9ydHMgPSBjaXJjdW1jZW50ZXIiLCJtb2R1bGUuZXhwb3J0cyA9IGNpcmN1bXJhZGl1c1xuXG52YXIgY2lyY3VtY2VudGVyID0gcmVxdWlyZSgnY2lyY3VtY2VudGVyJylcblxuZnVuY3Rpb24gY2lyY3VtcmFkaXVzKHBvaW50cykge1xuICB2YXIgY2VudGVyID0gY2lyY3VtY2VudGVyKHBvaW50cylcbiAgdmFyIGF2Z0Rpc3QgPSAwLjBcbiAgZm9yKHZhciBpPTA7IGk8cG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHAgPSBwb2ludHNbaV1cbiAgICBmb3IodmFyIGo9MDsgajxjZW50ZXIubGVuZ3RoOyArK2opIHtcbiAgICAgIGF2Z0Rpc3QgKz0gTWF0aC5wb3cocFtqXSAtIGNlbnRlcltqXSwgMilcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE1hdGguc3FydChhdmdEaXN0IC8gcG9pbnRzLmxlbmd0aClcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVDZWxsc1xuXG52YXIgbWluID0gTWF0aC5taW5cblxuZnVuY3Rpb24gY29tcGFyZUludChhLCBiKSB7XG4gIHJldHVybiBhIC0gYlxufVxuXG5mdW5jdGlvbiBjb21wYXJlQ2VsbHMoYSwgYikge1xuICB2YXIgbiA9IGEubGVuZ3RoXG4gICAgLCB0ID0gYS5sZW5ndGggLSBiLmxlbmd0aFxuICBpZih0KSB7XG4gICAgcmV0dXJuIHRcbiAgfVxuICBzd2l0Y2gobikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiAwXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGFbMF0gLSBiWzBdXG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIChhWzBdK2FbMV0tYlswXS1iWzFdKSB8fFxuICAgICAgICAgICAgIG1pbihhWzBdLGFbMV0pIC0gbWluKGJbMF0sYlsxXSlcbiAgICBjYXNlIDM6XG4gICAgICB2YXIgbDEgPSBhWzBdK2FbMV1cbiAgICAgICAgLCBtMSA9IGJbMF0rYlsxXVxuICAgICAgdCA9IGwxK2FbMl0gLSAobTErYlsyXSlcbiAgICAgIGlmKHQpIHtcbiAgICAgICAgcmV0dXJuIHRcbiAgICAgIH1cbiAgICAgIHZhciBsMCA9IG1pbihhWzBdLCBhWzFdKVxuICAgICAgICAsIG0wID0gbWluKGJbMF0sIGJbMV0pXG4gICAgICByZXR1cm4gbWluKGwwLCBhWzJdKSAtIG1pbihtMCwgYlsyXSkgfHxcbiAgICAgICAgICAgICBtaW4obDArYVsyXSwgbDEpIC0gbWluKG0wK2JbMl0sIG0xKVxuICAgIGNhc2UgNDpcbiAgICAgIHZhciBhdz1hWzBdLCBheD1hWzFdLCBheT1hWzJdLCBhej1hWzNdXG4gICAgICAgICwgYnc9YlswXSwgYng9YlsxXSwgYnk9YlsyXSwgYno9YlszXVxuICAgICAgcmV0dXJuIChhdytheCtheStheiktKGJ3K2J4K2J5K2J6KSB8fFxuICAgICAgICAgICAgIG1pbihhdyxheCxheSxheiktbWluKGJ3LGJ4LGJ5LGJ6LGJ3KSB8fFxuICAgICAgICAgICAgIG1pbihhdytheCxhdytheSxhdytheixheCtheSxheCtheixheStheikgLVxuICAgICAgICAgICAgICAgbWluKGJ3K2J4LGJ3K2J5LGJ3K2J6LGJ4K2J5LGJ4K2J6LGJ5K2J6KSB8fFxuICAgICAgICAgICAgIG1pbihhdytheCtheSxhdytheCtheixhdytheStheixheCtheStheikgLVxuICAgICAgICAgICAgICAgbWluKGJ3K2J4K2J5LGJ3K2J4K2J6LGJ3K2J5K2J6LGJ4K2J5K2J6KVxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgYXMgPSBhLnNsaWNlKCkuc29ydChjb21wYXJlSW50KVxuICAgICAgdmFyIGJzID0gYi5zbGljZSgpLnNvcnQoY29tcGFyZUludClcbiAgICAgIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgICAgICB0ID0gYXNbaV0gLSBic1tpXVxuICAgICAgICBpZih0KSB7XG4gICAgICAgICAgcmV0dXJuIHRcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIDBcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBjb21wYXJlQ2VsbHMgPSByZXF1aXJlKCdjb21wYXJlLWNlbGwnKVxudmFyIHBhcml0eSA9IHJlcXVpcmUoJ2NlbGwtb3JpZW50YXRpb24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVPcmllbnRlZENlbGxzXG5cbmZ1bmN0aW9uIGNvbXBhcmVPcmllbnRlZENlbGxzKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVDZWxscyhhLCBiKSB8fCBwYXJpdHkoYSkgLSBwYXJpdHkoYilcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL21lc2gzZCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3JzY2FsZUNhbGMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvY2FsYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgaWYodHJhY2UuaW50ZW5zaXR5KSB7XG4gICAgICAgIGNvbG9yc2NhbGVDYWxjKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgdmFsczogdHJhY2UuaW50ZW5zaXR5LFxuICAgICAgICAgICAgY29udGFpbmVyU3RyOiAnJyxcbiAgICAgICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlTWVzaCA9IHJlcXVpcmUoJ2dsLW1lc2gzZCcpO1xudmFyIHRyaWFuZ3VsYXRlID0gcmVxdWlyZSgnZGVsYXVuYXktdHJpYW5ndWxhdGUnKTtcbnZhciBhbHBoYVNoYXBlID0gcmVxdWlyZSgnYWxwaGEtc2hhcGUnKTtcbnZhciBjb252ZXhIdWxsID0gcmVxdWlyZSgnY29udmV4LWh1bGwnKTtcblxudmFyIHBhcnNlQ29sb3JTY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9nbF9mb3JtYXRfY29sb3InKS5wYXJzZUNvbG9yU2NhbGU7XG52YXIgc3RyMlJnYmFBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zdHIycmdiYXJyYXknKTtcbnZhciBleHRyYWN0T3B0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpLmV4dHJhY3RPcHRzO1xudmFyIHppcDMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9nbDNkL3ppcDMnKTtcblxuZnVuY3Rpb24gTWVzaDNEVHJhY2Uoc2NlbmUsIG1lc2gsIHVpZCkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnVpZCA9IHVpZDtcbiAgICB0aGlzLm1lc2ggPSBtZXNoO1xuICAgIHRoaXMubmFtZSA9ICcnO1xuICAgIHRoaXMuY29sb3IgPSAnI2ZmZic7XG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICB0aGlzLnNob3dDb250b3VyID0gZmFsc2U7XG59XG5cbnZhciBwcm90byA9IE1lc2gzRFRyYWNlLnByb3RvdHlwZTtcblxucHJvdG8uaGFuZGxlUGljayA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuICAgIGlmKHNlbGVjdGlvbi5vYmplY3QgPT09IHRoaXMubWVzaCkge1xuICAgICAgICB2YXIgc2VsZWN0SW5kZXggPSBzZWxlY3Rpb24uaW5kZXggPSBzZWxlY3Rpb24uZGF0YS5pbmRleDtcblxuICAgICAgICBpZihzZWxlY3Rpb24uZGF0YS5fY2VsbENlbnRlcikge1xuICAgICAgICAgICAgc2VsZWN0aW9uLnRyYWNlQ29vcmRpbmF0ZSA9IHNlbGVjdGlvbi5kYXRhLmRhdGFDb29yZGluYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0aW9uLnRyYWNlQ29vcmRpbmF0ZSA9IFtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEueFtzZWxlY3RJbmRleF0sXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnlbc2VsZWN0SW5kZXhdLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS56W3NlbGVjdEluZGV4XVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5kYXRhLmhvdmVydGV4dCB8fCB0aGlzLmRhdGEudGV4dDtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0ZXh0KSAmJiB0ZXh0W3NlbGVjdEluZGV4XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24udGV4dExhYmVsID0gdGV4dFtzZWxlY3RJbmRleF07XG4gICAgICAgIH0gZWxzZSBpZih0ZXh0KSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24udGV4dExhYmVsID0gdGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHBhcnNlQ29sb3JBcnJheShjb2xvcnMpIHtcbiAgICB2YXIgYiA9IFtdO1xuICAgIHZhciBsZW4gPSBjb2xvcnMubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBiW2ldID0gc3RyMlJnYmFBcnJheShjb2xvcnNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYjtcbn1cblxuLy8gVW5wYWNrIHBvc2l0aW9uIGRhdGFcbmZ1bmN0aW9uIHRvRGF0YUNvb3JkcyhheGlzLCBjb29yZCwgc2NhbGUsIGNhbGVuZGFyKSB7XG4gICAgdmFyIGIgPSBbXTtcbiAgICB2YXIgbGVuID0gY29vcmQubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBiW2ldID0gYXhpcy5kMmwoY29vcmRbaV0sIDAsIGNhbGVuZGFyKSAqIHNjYWxlO1xuICAgIH1cbiAgICByZXR1cm4gYjtcbn1cblxuLy8gUm91bmQgaW5kaWNlcyBpZiBwYXNzZWQgYXMgZmxvYXRzXG5mdW5jdGlvbiB0b1JvdW5kSW5kZXgoYSkge1xuICAgIHZhciBiID0gW107XG4gICAgdmFyIGxlbiA9IGEubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBiW2ldID0gTWF0aC5yb3VuZChhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGI7XG59XG5cbmZ1bmN0aW9uIGRlbGF1bmF5Q2VsbHMoZGVsYXVuYXlheGlzLCBwb3NpdGlvbnMpIHtcbiAgICB2YXIgZCA9IFsneCcsICd5JywgJ3onXS5pbmRleE9mKGRlbGF1bmF5YXhpcyk7XG4gICAgdmFyIGIgPSBbXTtcbiAgICB2YXIgbGVuID0gcG9zaXRpb25zLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgYltpXSA9IFtwb3NpdGlvbnNbaV1bKGQgKyAxKSAlIDNdLCBwb3NpdGlvbnNbaV1bKGQgKyAyKSAlIDNdXTtcbiAgICB9XG4gICAgcmV0dXJuIHRyaWFuZ3VsYXRlKGIpO1xufVxuXG4vLyBWYWxpZGF0ZSBpbmRpY2VzXG5mdW5jdGlvbiBoYXNWYWxpZEluZGljZXMobGlzdCwgbnVtVmVydGljZXMpIHtcbiAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmKGxpc3RbaV0gPD0gLTAuNSB8fCBsaXN0W2ldID49IG51bVZlcnRpY2VzIC0gMC41KSB7IC8vIE5vdGU6IHRoZSBpbmRpY2VzIHdvdWxkIGJlIHJvdW5kZWQgLTAuNDkgaXMgdmFsaWQuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgc2NlbmUgPSB0aGlzLnNjZW5lO1xuICAgIHZhciBsYXlvdXQgPSBzY2VuZS5mdWxsU2NlbmVMYXlvdXQ7XG5cbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgdmFyIG51bVZlcnRpY2VzID0gZGF0YS54Lmxlbmd0aDtcblxuICAgIHZhciBwb3NpdGlvbnMgPSB6aXAzKFxuICAgICAgICB0b0RhdGFDb29yZHMobGF5b3V0LnhheGlzLCBkYXRhLngsIHNjZW5lLmRhdGFTY2FsZVswXSwgZGF0YS54Y2FsZW5kYXIpLFxuICAgICAgICB0b0RhdGFDb29yZHMobGF5b3V0LnlheGlzLCBkYXRhLnksIHNjZW5lLmRhdGFTY2FsZVsxXSwgZGF0YS55Y2FsZW5kYXIpLFxuICAgICAgICB0b0RhdGFDb29yZHMobGF5b3V0LnpheGlzLCBkYXRhLnosIHNjZW5lLmRhdGFTY2FsZVsyXSwgZGF0YS56Y2FsZW5kYXIpXG4gICAgKTtcblxuICAgIHZhciBjZWxscztcbiAgICBpZihkYXRhLmkgJiYgZGF0YS5qICYmIGRhdGEuaykge1xuICAgICAgICBpZihcbiAgICAgICAgICAgIGRhdGEuaS5sZW5ndGggIT09IGRhdGEuai5sZW5ndGggfHxcbiAgICAgICAgICAgIGRhdGEuai5sZW5ndGggIT09IGRhdGEuay5sZW5ndGggfHxcbiAgICAgICAgICAgICFoYXNWYWxpZEluZGljZXMoZGF0YS5pLCBudW1WZXJ0aWNlcykgfHxcbiAgICAgICAgICAgICFoYXNWYWxpZEluZGljZXMoZGF0YS5qLCBudW1WZXJ0aWNlcykgfHxcbiAgICAgICAgICAgICFoYXNWYWxpZEluZGljZXMoZGF0YS5rLCBudW1WZXJ0aWNlcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2VsbHMgPSB6aXAzKFxuICAgICAgICAgICAgdG9Sb3VuZEluZGV4KGRhdGEuaSksXG4gICAgICAgICAgICB0b1JvdW5kSW5kZXgoZGF0YS5qKSxcbiAgICAgICAgICAgIHRvUm91bmRJbmRleChkYXRhLmspXG4gICAgICAgICk7XG4gICAgfSBlbHNlIGlmKGRhdGEuYWxwaGFodWxsID09PSAwKSB7XG4gICAgICAgIGNlbGxzID0gY29udmV4SHVsbChwb3NpdGlvbnMpO1xuICAgIH0gZWxzZSBpZihkYXRhLmFscGhhaHVsbCA+IDApIHtcbiAgICAgICAgY2VsbHMgPSBhbHBoYVNoYXBlKGRhdGEuYWxwaGFodWxsLCBwb3NpdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGxzID0gZGVsYXVuYXlDZWxscyhkYXRhLmRlbGF1bmF5YXhpcywgcG9zaXRpb25zKTtcbiAgICB9XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICBwb3NpdGlvbnM6IHBvc2l0aW9ucyxcbiAgICAgICAgY2VsbHM6IGNlbGxzLFxuICAgICAgICBsaWdodFBvc2l0aW9uOiBbZGF0YS5saWdodHBvc2l0aW9uLngsIGRhdGEubGlnaHRwb3NpdGlvbi55LCBkYXRhLmxpZ2h0cG9zaXRpb24uel0sXG4gICAgICAgIGFtYmllbnQ6IGRhdGEubGlnaHRpbmcuYW1iaWVudCxcbiAgICAgICAgZGlmZnVzZTogZGF0YS5saWdodGluZy5kaWZmdXNlLFxuICAgICAgICBzcGVjdWxhcjogZGF0YS5saWdodGluZy5zcGVjdWxhcixcbiAgICAgICAgcm91Z2huZXNzOiBkYXRhLmxpZ2h0aW5nLnJvdWdobmVzcyxcbiAgICAgICAgZnJlc25lbDogZGF0YS5saWdodGluZy5mcmVzbmVsLFxuICAgICAgICB2ZXJ0ZXhOb3JtYWxzRXBzaWxvbjogZGF0YS5saWdodGluZy52ZXJ0ZXhub3JtYWxzZXBzaWxvbixcbiAgICAgICAgZmFjZU5vcm1hbHNFcHNpbG9uOiBkYXRhLmxpZ2h0aW5nLmZhY2Vub3JtYWxzZXBzaWxvbixcbiAgICAgICAgb3BhY2l0eTogZGF0YS5vcGFjaXR5LFxuICAgICAgICBjb250b3VyRW5hYmxlOiBkYXRhLmNvbnRvdXIuc2hvdyxcbiAgICAgICAgY29udG91ckNvbG9yOiBzdHIyUmdiYUFycmF5KGRhdGEuY29udG91ci5jb2xvcikuc2xpY2UoMCwgMyksXG4gICAgICAgIGNvbnRvdXJXaWR0aDogZGF0YS5jb250b3VyLndpZHRoLFxuICAgICAgICB1c2VGYWNldE5vcm1hbHM6IGRhdGEuZmxhdHNoYWRpbmdcbiAgICB9O1xuXG4gICAgaWYoZGF0YS5pbnRlbnNpdHkpIHtcbiAgICAgICAgdmFyIGNPcHRzID0gZXh0cmFjdE9wdHMoZGF0YSk7XG4gICAgICAgIHRoaXMuY29sb3IgPSAnI2ZmZic7XG4gICAgICAgIHZhciBtb2RlID0gZGF0YS5pbnRlbnNpdHltb2RlO1xuICAgICAgICBjb25maWdbbW9kZSArICdJbnRlbnNpdHknXSA9IGRhdGEuaW50ZW5zaXR5O1xuICAgICAgICBjb25maWdbbW9kZSArICdJbnRlbnNpdHlCb3VuZHMnXSA9IFtjT3B0cy5taW4sIGNPcHRzLm1heF07XG4gICAgICAgIGNvbmZpZy5jb2xvcm1hcCA9IHBhcnNlQ29sb3JTY2FsZShkYXRhKTtcbiAgICB9IGVsc2UgaWYoZGF0YS52ZXJ0ZXhjb2xvcikge1xuICAgICAgICB0aGlzLmNvbG9yID0gZGF0YS52ZXJ0ZXhjb2xvclswXTtcbiAgICAgICAgY29uZmlnLnZlcnRleENvbG9ycyA9IHBhcnNlQ29sb3JBcnJheShkYXRhLnZlcnRleGNvbG9yKTtcbiAgICB9IGVsc2UgaWYoZGF0YS5mYWNlY29sb3IpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IGRhdGEuZmFjZWNvbG9yWzBdO1xuICAgICAgICBjb25maWcuY2VsbENvbG9ycyA9IHBhcnNlQ29sb3JBcnJheShkYXRhLmZhY2Vjb2xvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3I7XG4gICAgICAgIGNvbmZpZy5tZXNoQ29sb3IgPSBzdHIyUmdiYUFycmF5KGRhdGEuY29sb3IpO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBtZXNoXG4gICAgdGhpcy5tZXNoLnVwZGF0ZShjb25maWcpO1xufTtcblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2NlbmUuZ2xwbG90LnJlbW92ZSh0aGlzLm1lc2gpO1xuICAgIHRoaXMubWVzaC5kaXNwb3NlKCk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVNZXNoM0RUcmFjZShzY2VuZSwgZGF0YSkge1xuICAgIHZhciBnbCA9IHNjZW5lLmdscGxvdC5nbDtcbiAgICB2YXIgbWVzaCA9IGNyZWF0ZU1lc2goe2dsOiBnbH0pO1xuICAgIHZhciByZXN1bHQgPSBuZXcgTWVzaDNEVHJhY2Uoc2NlbmUsIG1lc2gsIGRhdGEudWlkKTtcbiAgICBtZXNoLl90cmFjZSA9IHJlc3VsdDtcbiAgICByZXN1bHQudXBkYXRlKGRhdGEpO1xuICAgIHNjZW5lLmdscGxvdC5hZGQobWVzaCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVNZXNoM0RUcmFjZTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGNvbG9yc2NhbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9kZWZhdWx0cycpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgLy8gcmVhZCBpbiBmYWNlL3ZlcnRleCBwcm9wZXJ0aWVzXG4gICAgZnVuY3Rpb24gcmVhZENvbXBvbmVudHMoYXJyYXkpIHtcbiAgICAgICAgdmFyIHJldCA9IGFycmF5Lm1hcChmdW5jdGlvbihhdHRyKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gY29lcmNlKGF0dHIpO1xuXG4gICAgICAgICAgICBpZihyZXN1bHQgJiYgTGliLmlzQXJyYXlPclR5cGVkQXJyYXkocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0LmV2ZXJ5KGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4ICYmIHgubGVuZ3RoID09PSByZXRbMF0ubGVuZ3RoO1xuICAgICAgICB9KSAmJiByZXQ7XG4gICAgfVxuXG4gICAgdmFyIGNvb3JkcyA9IHJlYWRDb21wb25lbnRzKFsneCcsICd5JywgJ3onXSk7XG4gICAgaWYoIWNvb3Jkcykge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZWFkQ29tcG9uZW50cyhbJ2knLCAnaicsICdrJ10pO1xuICAgIC8vIHRocmVlIGluZGljZXMgc2hvdWxkIGJlIGFsbCBwcm92aWRlZCBvciBub3RcbiAgICBpZihcbiAgICAgICAgKHRyYWNlT3V0LmkgJiYgKCF0cmFjZU91dC5qIHx8ICF0cmFjZU91dC5rKSkgfHxcbiAgICAgICAgKHRyYWNlT3V0LmogJiYgKCF0cmFjZU91dC5rIHx8ICF0cmFjZU91dC5pKSkgfHxcbiAgICAgICAgKHRyYWNlT3V0LmsgJiYgKCF0cmFjZU91dC5pIHx8ICF0cmFjZU91dC5qKSlcbiAgICApIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2NhbGVuZGFycycsICdoYW5kbGVUcmFjZURlZmF1bHRzJyk7XG4gICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgWyd4JywgJ3knLCAneiddLCBsYXlvdXQpO1xuXG4gICAgLy8gQ29lcmNlIHJlbWFpbmluZyBwcm9wZXJ0aWVzXG4gICAgW1xuICAgICAgICAnbGlnaHRpbmcuYW1iaWVudCcsXG4gICAgICAgICdsaWdodGluZy5kaWZmdXNlJyxcbiAgICAgICAgJ2xpZ2h0aW5nLnNwZWN1bGFyJyxcbiAgICAgICAgJ2xpZ2h0aW5nLnJvdWdobmVzcycsXG4gICAgICAgICdsaWdodGluZy5mcmVzbmVsJyxcbiAgICAgICAgJ2xpZ2h0aW5nLnZlcnRleG5vcm1hbHNlcHNpbG9uJyxcbiAgICAgICAgJ2xpZ2h0aW5nLmZhY2Vub3JtYWxzZXBzaWxvbicsXG4gICAgICAgICdsaWdodHBvc2l0aW9uLngnLFxuICAgICAgICAnbGlnaHRwb3NpdGlvbi55JyxcbiAgICAgICAgJ2xpZ2h0cG9zaXRpb24ueicsXG4gICAgICAgICdmbGF0c2hhZGluZycsXG4gICAgICAgICdhbHBoYWh1bGwnLFxuICAgICAgICAnZGVsYXVuYXlheGlzJyxcbiAgICAgICAgJ29wYWNpdHknXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uKHgpIHsgY29lcmNlKHgpOyB9KTtcblxuICAgIHZhciBzaG93Q29udG91ciA9IGNvZXJjZSgnY29udG91ci5zaG93Jyk7XG4gICAgaWYoc2hvd0NvbnRvdXIpIHtcbiAgICAgICAgY29lcmNlKCdjb250b3VyLmNvbG9yJyk7XG4gICAgICAgIGNvZXJjZSgnY29udG91ci53aWR0aCcpO1xuICAgIH1cblxuICAgIGlmKCdpbnRlbnNpdHknIGluIHRyYWNlSW4pIHtcbiAgICAgICAgY29lcmNlKCdpbnRlbnNpdHknKTtcbiAgICAgICAgY29lcmNlKCdpbnRlbnNpdHltb2RlJyk7XG4gICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICcnLCBjTGV0dGVyOiAnYyd9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0cmFjZU91dC5zaG93c2NhbGUgPSBmYWxzZTtcblxuICAgICAgICBpZignZmFjZWNvbG9yJyBpbiB0cmFjZUluKSBjb2VyY2UoJ2ZhY2Vjb2xvcicpO1xuICAgICAgICBlbHNlIGlmKCd2ZXJ0ZXhjb2xvcicgaW4gdHJhY2VJbikgY29lcmNlKCd2ZXJ0ZXhjb2xvcicpO1xuICAgICAgICBlbHNlIGNvZXJjZSgnY29sb3InLCBkZWZhdWx0Q29sb3IpO1xuICAgIH1cblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICAvLyBkaXNhYmxlIDFEIHRyYW5zZm9ybXNcbiAgICAvLyB4L3kveiBzaG91bGQgbWF0Y2ggbGVuZ3RocywgYW5kIGkvai9rIHNob3VsZCBtYXRjaCBhcyB3ZWxsLCBidXRcbiAgICAvLyB0aGUgdHdvIHNldHMgaGF2ZSBkaWZmZXJlbnQgbGVuZ3RocyBzbyB0cmFuc2Zvcm1zIHdvdWxkbid0IHdvcmsuXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IG51bGw7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIGNvbG9yYmFyOiB7XG4gICAgICAgIG1pbjogJ2NtaW4nLFxuICAgICAgICBtYXg6ICdjbWF4J1xuICAgIH0sXG4gICAgcGxvdDogcmVxdWlyZSgnLi9jb252ZXJ0JyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdtZXNoM2QnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9nbDNkJyksXG4gICAgY2F0ZWdvcmllczogWydnbDNkJywgJ3Nob3dMZWdlbmQnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRHJhd3Mgc2V0cyBvZiB0cmlhbmdsZXMgd2l0aCBjb29yZGluYXRlcyBnaXZlbiBieScsXG4gICAgICAgICAgICAndGhyZWUgMS1kaW1lbnNpb25hbCBhcnJheXMgaW4gYHhgLCBgeWAsIGB6YCBhbmQnLFxuICAgICAgICAgICAgJygxKSBhIHNldHMgb2YgYGlgLCBgamAsIGBrYCBpbmRpY2VzJyxcbiAgICAgICAgICAgICcoMikgRGVsYXVuYXkgdHJpYW5ndWxhdGlvbiBvcicsXG4gICAgICAgICAgICAnKDMpIHRoZSBBbHBoYS1zaGFwZSBhbGdvcml0aG0gb3InLFxuICAgICAgICAgICAgJyg0KSB0aGUgQ29udmV4LWh1bGwgYWxnb3JpdGhtJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGNvbXBhcmVDZWxsID0gcmVxdWlyZSgnY29tcGFyZS1jZWxsJylcbnZhciBjb21wYXJlT3JpZW50ZWRDZWxsID0gcmVxdWlyZSgnY29tcGFyZS1vcmllbnRlZC1jZWxsJylcbnZhciBvcmllbnRhdGlvbiA9IHJlcXVpcmUoJ2NlbGwtb3JpZW50YXRpb24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZHVjZUNlbGxDb21wbGV4XG5cbmZ1bmN0aW9uIHJlZHVjZUNlbGxDb21wbGV4KGNlbGxzKSB7XG4gIGNlbGxzLnNvcnQoY29tcGFyZU9yaWVudGVkQ2VsbClcbiAgdmFyIG4gPSBjZWxscy5sZW5ndGhcbiAgdmFyIHB0ciA9IDBcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgdmFyIGMgPSBjZWxsc1tpXVxuICAgIHZhciBvID0gb3JpZW50YXRpb24oYylcbiAgICBpZihvID09PSAwKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZihwdHIgPiAwKSB7XG4gICAgICB2YXIgZiA9IGNlbGxzW3B0ci0xXVxuICAgICAgaWYoY29tcGFyZUNlbGwoYywgZikgPT09IDAgJiZcbiAgICAgICAgIG9yaWVudGF0aW9uKGYpICAgICE9PSBvKSB7XG4gICAgICAgIHB0ciAtPSAxXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuICAgIGNlbGxzW3B0cisrXSA9IGNcbiAgfVxuICBjZWxscy5sZW5ndGggPSBwdHJcbiAgcmV0dXJuIGNlbGxzXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBib3VuZGFyeVxuXG52YXIgYm5kID0gcmVxdWlyZSgnYm91bmRhcnktY2VsbHMnKVxudmFyIHJlZHVjZSA9IHJlcXVpcmUoJ3JlZHVjZS1zaW1wbGljaWFsLWNvbXBsZXgnKVxuXG5mdW5jdGlvbiBib3VuZGFyeShjZWxscykge1xuICByZXR1cm4gcmVkdWNlKGJuZChjZWxscykpXG59XG4iXSwic291cmNlUm9vdCI6IiJ9