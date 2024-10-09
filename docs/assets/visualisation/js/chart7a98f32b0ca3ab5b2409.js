(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_contourgl_js"],{

/***/ "./node_modules/gl-contour2d/contour.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-contour2d/contour.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createContour2D

var iota = __webpack_require__(/*! iota-array */ "./node_modules/iota-array/iota.js")
var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var ndarray = __webpack_require__(/*! ndarray */ "./node_modules/ndarray/ndarray.js")
var surfaceNets = __webpack_require__(/*! surface-nets */ "./node_modules/surface-nets/surfacenets.js")
var cdt2d = __webpack_require__(/*! cdt2d */ "./node_modules/cdt2d/cdt2d.js")
var cleanPSLG = __webpack_require__(/*! clean-pslg */ "./node_modules/clean-pslg/clean-pslg.js")
var bsearch = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")

var shaders = __webpack_require__(/*! ./lib/shaders */ "./node_modules/gl-contour2d/lib/shaders.js")

function GLContour2D (
  plot,
  shader,
  fillShader,
  positionBuffer,
  colorBuffer,
  idBuffer,
  fillPositionBuffer,
  fillColorBuffer) {
  this.plot = plot
  this.shader = shader
  this.fillShader = fillShader
  this.positionBuffer = positionBuffer
  this.colorBuffer = colorBuffer
  this.idBuffer = idBuffer
  this.fillPositionBuffer = fillPositionBuffer
  this.fillColorBuffer = fillColorBuffer
  this.fillVerts = 0
  this.shape = [0, 0]
  this.bounds = [Infinity, Infinity, -Infinity, -Infinity]
  this.numVertices = 0
  this.lineWidth = 1
}

var proto = GLContour2D.prototype

var WEIGHTS = [
  1, 0,
  0, 0,
  0, 1,
  1, 0,
  1, 1,
  0, 1
]

proto.draw = (function () {
  var MATRIX = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ]

  var SCREEN_SHAPE = [0, 0]

  return function () {
    var plot = this.plot
    var shader = this.shader
    var fillShader = this.fillShader
    var bounds = this.bounds
    var numVertices = this.numVertices
    var fillVerts = this.fillVerts

    var uniforms, attributes

    var gl = plot.gl
    var viewBox = plot.viewBox
    var dataBox = plot.dataBox

    var boundX = bounds[2] - bounds[0]
    var boundY = bounds[3] - bounds[1]
    var dataX = dataBox[2] - dataBox[0]
    var dataY = dataBox[3] - dataBox[1]

    MATRIX[0] = 2.0 * boundX / dataX
    MATRIX[4] = 2.0 * boundY / dataY
    MATRIX[6] = 2.0 * (bounds[0] - dataBox[0]) / dataX - 1.0
    MATRIX[7] = 2.0 * (bounds[1] - dataBox[1]) / dataY - 1.0

    SCREEN_SHAPE[0] = viewBox[2] - viewBox[0]
    SCREEN_SHAPE[1] = viewBox[3] - viewBox[1]

    if (fillVerts > 0) {
      fillShader.bind()

      uniforms = fillShader.uniforms
      uniforms.viewTransform = MATRIX
      uniforms.screenShape = SCREEN_SHAPE

      attributes = shader.attributes
      this.fillPositionBuffer.bind()
      attributes.position.pointer()

      this.fillColorBuffer.bind()
      attributes.color.pointer(gl.UNSIGNED_BYTE, true)

      gl.drawArrays(gl.TRIANGLES, 0, fillVerts)
    }

    if (numVertices > 0) {
      shader.bind()

      var lineWidth = this.lineWidth * plot.pixelRatio

      uniforms = shader.uniforms
      uniforms.viewTransform = MATRIX
      uniforms.screenShape = SCREEN_SHAPE
      uniforms.lineWidth = lineWidth
      uniforms.pointSize = 1000

      attributes = shader.attributes

      // Draw lines
      this.positionBuffer.bind()
      attributes.position.pointer(gl.FLOAT, false, 16, 0)
      attributes.tangent.pointer(gl.FLOAT, false, 16, 8)

      this.colorBuffer.bind()
      attributes.color.pointer(gl.UNSIGNED_BYTE, true)

      gl.drawArrays(gl.TRIANGLES, 0, numVertices)

      // Draw end caps
      uniforms.lineWidth = 0
      uniforms.pointSize = lineWidth

      this.positionBuffer.bind()
      attributes.position.pointer(gl.FLOAT, false, 16 * 3, 0)
      attributes.tangent.pointer(gl.FLOAT, false, 16 * 3, 8)

      this.colorBuffer.bind()
      attributes.color.pointer(gl.UNSIGNED_BYTE, true, 4 * 3, 0)

      gl.drawArrays(gl.POINTS, 0, numVertices / 3)
    }
  }
})()

proto.drawPick = (function () {
  return function (pickOffset) {
    return pickOffset
  }
})()

proto.pick = function (x, y, value) {
  return null
}

function interpolate (array, point) {
  var idx = Math.floor(point)
  if (idx < 0) {
    return array[0]
  } else if (idx >= array.length - 1) {
    return array[array.length - 1]
  }
  var t = point - idx
  return (1.0 - t) * array[idx] + t * array[idx + 1]
}

proto.update = function (options) {
  options = options || {}

  var shape = options.shape || [0, 0]

  var x = options.x || iota(shape[0])
  var y = options.y || iota(shape[1])
  var z = options.z || new Float32Array(shape[0] * shape[1])

  var levels = options.levels || []
  var levelColors = options.levelColors || []

  var bounds = this.bounds
  var lox = bounds[0] = x[0]
  var loy = bounds[1] = y[0]
  var hix = bounds[2] = x[x.length - 1]
  var hiy = bounds[3] = y[y.length - 1]

  if (lox === hix) {
    bounds[2] += 1
    hix += 1
  }
  if (loy === hiy) {
    bounds[3] += 1
    hiy += 1
  }

  var xs = 1.0 / (hix - lox)
  var ys = 1.0 / (hiy - loy)

  this.lineWidth = options.lineWidth || 1

  var zarray = ndarray(z, shape)

  var positions = []
  var colors = []
  var ids = []

  var fillCells = []
  var fillPositions = [
    [0, 0],
    [shape[0] - 1, 0],
    [0, shape[1] - 1],
    [shape[0] - 1, shape[1] - 1]
  ]

  function intersect (level, x, a, b) {
    var d = (b - a)
    if (Math.abs(d) < 1e-6) {
      return x
    }
    return Math.floor(x) + Math.max(0.001, Math.min(0.999, (level - a) / d))
  }

  for (var i = 0; i < levels.length; ++i) {
    var level = levels[i]
    if (i > 0 && level === levels[i - 1]) {
      continue
    }
    var contour = surfaceNets(zarray, level)

    var c_r = (255 * levelColors[4 * i]) | 0
    var c_g = (255 * levelColors[4 * i + 1]) | 0
    var c_b = (255 * levelColors[4 * i + 2]) | 0
    var c_a = (255 * levelColors[4 * i + 3]) | 0

    var c_cells = contour.cells
    var c_positions = contour.positions

    // Fix boundaries
    var in_degree = Array(c_positions.length)
    for (var j = 0; j < in_degree.length; ++j) {
      in_degree[j] = 0
    }
    for (j = 0; j < c_cells.length; ++j) {
      var edge = c_cells[j]
      in_degree[edge[0]] += 1
      in_degree[edge[1]] += 1
    }

    for (j = 0; j < in_degree.length; ++j) {
      var deg = in_degree[j]
      if (deg === 0) {
        continue
      }
      var pp = c_positions[j]
      in_degree[j] = fillPositions.length
      fillPositions.push(pp)
      if (deg > 1) {
        continue
      }
      var ppx = pp[0]
      var ppy = pp[1]
      var z00 = zarray.get(Math.floor(ppx), Math.floor(ppy))
      var z01 = zarray.get(Math.floor(ppx), Math.ceil(ppy))
      var z10 = zarray.get(Math.ceil(ppx), Math.floor(ppy))
      var z11 = zarray.get(Math.ceil(ppx), Math.ceil(ppy))
      var intercept
      if (Math.floor(pp[0]) === 0 &&
          ((z00 <= level) !== (z01 < level))) {
        intercept = [0, intersect(level, pp[1], z00, z01)]
      } else if (Math.ceil(pp[0]) === shape[0] - 1 &&
          ((z10 <= level) !== (z11 < level))) {
        intercept = [shape[0] - 1, intersect(level, pp[1], z10, z11)]
      } else if (Math.floor(pp[1]) === 0 &&
          ((z00 <= level) !== (z10 < level))) {
        intercept = [intersect(level, pp[0], z00, z10), 0]
      } else if (Math.ceil(pp[1]) === shape[1] - 1 &&
          ((z01 <= level) !== (z11 < level))) {
        intercept = [intersect(level, pp[0], z01, z11), shape[1] - 1]
      }
      if (intercept) {
        c_cells.push([j, c_positions.length])
        in_degree.push(fillPositions.length)
        c_positions.push(intercept)
      }
    }

    for (j = 0; j < c_cells.length; ++j) {
      var e = c_cells[j]
      var a = c_positions[e[0]]
      var b = c_positions[e[1]]

      fillCells.push([in_degree[e[0]], in_degree[e[1]]])

      var pointId = Math.round(a[0]) + shape[0] * Math.round(a[1])

      var ax = interpolate(x, a[0])
      var ay = interpolate(y, a[1])
      var bx = interpolate(x, b[0])
      var by = interpolate(y, b[1])

      ax = xs * (ax - lox)
      ay = ys * (ay - loy)
      bx = xs * (bx - lox)
      by = ys * (by - loy)

      var dx = ax - bx
      var dy = ay - by

      for (var k = 0; k < WEIGHTS.length; k += 2) {
        var wx = WEIGHTS[k]
        var wix = 1.0 - wx
        var wy = 2.0 * WEIGHTS[k + 1] - 1.0

        positions.push(
          wix * ax + wx * bx, wix * ay + wx * by,
          wy * dx, wy * dy)
        colors.push(c_r, c_g, c_b, c_a)
        ids.push(pointId)
      }
    }
  }

  this.positionBuffer.update(new Float32Array(positions))
  this.colorBuffer.update(new Uint8Array(colors))
  this.idBuffer.update(new Uint32Array(ids))
  this.numVertices = ids.length

  var fillColors = options.fillColors
  var fillCellColors = []
  var fillCellPositions = []
  var fillVerts = 0

  if (fillColors) {
    cleanPSLG(fillPositions, fillCells)
    var fillMesh = cdt2d(fillPositions, fillCells, {
      delaunay: false
    })
    for (i = 0; i < fillMesh.length; ++i) {
      var cell = fillMesh[i]
      var cx = 0
      var cy = 0

      for (j = 0; j < 3; ++j) {
        var p = fillPositions[cell[j]]
        var px = interpolate(x, p[0])
        var py = interpolate(y, p[1])
        cx += p[0]
        cy += p[1]
        fillCellPositions.push(
          xs * (px - lox),
          ys * (py - loy))
      }

      // Compute centroid of triangle
      cx /= 3
      cy /= 3

      // Sample height field at triangle centroid
      var cxi = Math.floor(cx)
      var cyi = Math.floor(cy)
      var cxf = cx - cxi
      var cyf = cy - cyi

      var c00 = zarray.get(cxi, cyi)
      var c01 = zarray.get(cxi, cyi + 1)
      var c10 = zarray.get(cxi + 1, cyi)
      var c11 = zarray.get(cxi + 1, cyi + 1)

      var zlevel =
        (1 - cyf) * ((1 - cxf) * c00 + cxf * c10) +
        cyf * ((1 - cxf) * c01 + cxf * c11)

      // Color triangle using centroid data
      var l = bsearch.le(levels, zlevel) + 1
      var cr = (255 * fillColors[4 * l + 0]) | 0
      var cg = (255 * fillColors[4 * l + 1]) | 0
      var cb = (255 * fillColors[4 * l + 2]) | 0
      var ca = (255 * fillColors[4 * l + 3]) | 0

      fillCellColors.push(
        cr, cg, cb, ca,
        cr, cg, cb, ca,
        cr, cg, cb, ca)

      fillVerts += 3
    }

    this.fillPositionBuffer.update(new Float32Array(fillCellPositions))
    this.fillColorBuffer.update(new Uint8Array(fillCellColors))

    this.fillVerts = fillVerts
  }
}

proto.dispose = function () {
  this.plot.removeObject(this)
}

function createContour2D (plot, options) {
  var gl = plot.gl

  var shader = createShader(gl, shaders.vertex, shaders.fragment)
  var fillShader = createShader(gl, shaders.fillVertex, shaders.fragment)

  var positionBuffer = createBuffer(gl)
  var colorBuffer = createBuffer(gl)
  var idBuffer = createBuffer(gl)

  var fillPositionBuffer = createBuffer(gl)
  var fillColorBuffer = createBuffer(gl)

  var contours = new GLContour2D(
    plot,
    shader,
    fillShader,
    positionBuffer,
    colorBuffer,
    idBuffer,
    fillPositionBuffer,
    fillColorBuffer)

  contours.update(options)
  plot.addObject(contours)

  return contours
}


/***/ }),

/***/ "./node_modules/gl-contour2d/lib/shaders.js":
/*!**************************************************!*\
  !*** ./node_modules/gl-contour2d/lib/shaders.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")

module.exports = {
  fragment: glslify('./shaders/fragment.glsl'),
  vertex: glslify('./shaders/vertex.glsl'),
  fillVertex: glslify('./shaders/fill-vertex.glsl')
}


/***/ }),

/***/ "./node_modules/plotly.js/lib/contourgl.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/contourgl.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/contourgl */ "./node_modules/plotly.js/src/traces/contourgl/index.js");


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

/***/ "./node_modules/plotly.js/src/traces/contour/constraint_defaults.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/constraint_defaults.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var handleLabelDefaults = __webpack_require__(/*! ./label_defaults */ "./node_modules/plotly.js/src/traces/contour/label_defaults.js");

var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var addOpacity = Color.addOpacity;
var opacity = Color.opacity;

var filterOps = __webpack_require__(/*! ../../constants/filter_ops */ "./node_modules/plotly.js/src/constants/filter_ops.js");
var CONSTRAINT_REDUCTION = filterOps.CONSTRAINT_REDUCTION;
var COMPARISON_OPS2 = filterOps.COMPARISON_OPS2;

module.exports = function handleConstraintDefaults(traceIn, traceOut, coerce, layout, defaultColor, opts) {
    var contours = traceOut.contours;
    var showLines, lineColor, fillColor;

    var operation = coerce('contours.operation');
    contours._operation = CONSTRAINT_REDUCTION[operation];

    handleConstraintValueDefaults(coerce, contours);

    if(operation === '=') {
        showLines = contours.showlines = true;
    } else {
        showLines = coerce('contours.showlines');
        fillColor = coerce('fillcolor', addOpacity(
            (traceIn.line || {}).color || defaultColor, 0.5
        ));
    }

    if(showLines) {
        var lineDfltColor = fillColor && opacity(fillColor) ?
            addOpacity(traceOut.fillcolor, 1) :
            defaultColor;
        lineColor = coerce('line.color', lineDfltColor);
        coerce('line.width', 2);
        coerce('line.dash');
    }

    coerce('line.smoothing');

    handleLabelDefaults(coerce, layout, lineColor, opts);
};

function handleConstraintValueDefaults(coerce, contours) {
    var zvalue;

    if(COMPARISON_OPS2.indexOf(contours.operation) === -1) {
        // Requires an array of two numbers:
        coerce('contours.value', [0, 1]);

        if(!Array.isArray(contours.value)) {
            if(isNumeric(contours.value)) {
                zvalue = parseFloat(contours.value);
                contours.value = [zvalue, zvalue + 1];
            }
        } else if(contours.value.length > 2) {
            contours.value = contours.value.slice(2);
        } else if(contours.length === 0) {
            contours.value = [0, 1];
        } else if(contours.length < 2) {
            zvalue = parseFloat(contours.value[0]);
            contours.value = [zvalue, zvalue + 1];
        } else {
            contours.value = [
                parseFloat(contours.value[0]),
                parseFloat(contours.value[1])
            ];
        }
    } else {
        // Requires a single scalar:
        coerce('contours.value', 0);

        if(!isNumeric(contours.value)) {
            if(Array.isArray(contours.value)) {
                contours.value = parseFloat(contours.value[0]);
            } else {
                contours.value = 0;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/defaults.js ***!
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

var handleXYZDefaults = __webpack_require__(/*! ../heatmap/xyz_defaults */ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js");
var handleConstraintDefaults = __webpack_require__(/*! ./constraint_defaults */ "./node_modules/plotly.js/src/traces/contour/constraint_defaults.js");
var handleContoursDefaults = __webpack_require__(/*! ./contours_defaults */ "./node_modules/plotly.js/src/traces/contour/contours_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ./style_defaults */ "./node_modules/plotly.js/src/traces/contour/style_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/contour/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    function coerce2(attr) {
        return Lib.coerce2(traceIn, traceOut, attributes, attr);
    }

    var len = handleXYZDefaults(traceIn, traceOut, coerce, layout);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');
    coerce('hoverongaps');

    var isConstraint = (coerce('contours.type') === 'constraint');
    coerce('connectgaps', Lib.isArray1D(traceOut.z));

    if(isConstraint) {
        handleConstraintDefaults(traceIn, traceOut, coerce, layout, defaultColor);
    } else {
        handleContoursDefaults(traceIn, traceOut, coerce, coerce2);
        handleStyleDefaults(traceIn, traceOut, coerce, layout);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contourgl/convert.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contourgl/convert.js ***!
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




var createContour2D = __webpack_require__(/*! gl-contour2d */ "./node_modules/gl-contour2d/contour.js");
var createHeatmap2D = __webpack_require__(/*! gl-heatmap2d */ "./node_modules/gl-heatmap2d/heatmap.js");

var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var makeColorMap = __webpack_require__(/*! ../contour/make_color_map */ "./node_modules/plotly.js/src/traces/contour/make_color_map.js");
var str2RGBArray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");


function Contour(scene, uid) {
    this.scene = scene;
    this.uid = uid;
    this.type = 'contourgl';

    this.name = '';
    this.hoverinfo = 'all';

    this.xData = [];
    this.yData = [];
    this.zData = [];
    this.textLabels = [];

    this.idToIndex = [];
    this.bounds = [0, 0, 0, 0];

    this.contourOptions = {
        z: new Float32Array(0),
        x: [],
        y: [],
        shape: [0, 0],
        levels: [0],
        levelColors: [0, 0, 0, 1],
        lineWidth: 1
    };
    this.contour = createContour2D(scene.glplot, this.contourOptions);
    this.contour._trace = this;

    this.heatmapOptions = {
        z: new Float32Array(0),
        x: [],
        y: [],
        shape: [0, 0],
        colorLevels: [0],
        colorValues: [0, 0, 0, 0]
    };
    this.heatmap = createHeatmap2D(scene.glplot, this.heatmapOptions);
    this.heatmap._trace = this;
}

var proto = Contour.prototype;

proto.handlePick = function(pickResult) {
    var options = this.heatmapOptions;
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
    var rowLen = z[0].length;
    var colLen = z.length;
    var colorOptions;

    this.contourOptions.z = flattenZ(z, rowLen, colLen);
    this.heatmapOptions.z = [].concat.apply([], z);

    this.contourOptions.shape = this.heatmapOptions.shape = [rowLen, colLen];

    this.contourOptions.x = this.heatmapOptions.x = calcPt.x;
    this.contourOptions.y = this.heatmapOptions.y = calcPt.y;

    // pass on fill information
    if(fullTrace.contours.coloring === 'fill') {
        colorOptions = convertColorScale(fullTrace, {fill: true});
        this.contourOptions.levels = colorOptions.levels.slice(1);
        // though gl-contour2d automatically defaults to a transparent layer for the last
        // band color, it's set manually here in case the gl-contour2 API changes
        this.contourOptions.fillColors = colorOptions.levelColors;
        this.contourOptions.levelColors = [].concat.apply([], this.contourOptions.levels.map(function() {
            return [0.25, 0.25, 0.25, 1.0];
        }));
    } else {
        colorOptions = convertColorScale(fullTrace, {fill: false});
        this.contourOptions.levels = colorOptions.levels;
        this.contourOptions.levelColors = colorOptions.levelColors;
    }

    // convert text from 2D -> 1D
    this.textLabels = [].concat.apply([], fullTrace.text);

    this.contour.update(this.contourOptions);
    this.heatmap.update(this.heatmapOptions);

    var xa = this.scene.xaxis;
    var ya = this.scene.yaxis;
    fullTrace._extremes[xa._id] = Axes.findExtremes(xa, calcPt.x);
    fullTrace._extremes[ya._id] = Axes.findExtremes(ya, calcPt.y);
};

proto.dispose = function() {
    this.contour.dispose();
    this.heatmap.dispose();
};

function flattenZ(zIn, rowLen, colLen) {
    var zOut = new Float32Array(rowLen * colLen);
    var pt = 0;

    for(var i = 0; i < rowLen; i++) {
        for(var j = 0; j < colLen; j++) {
            zOut[pt++] = zIn[j][i];
        }
    }

    return zOut;
}

function convertColorScale(fullTrace, options) {
    var contours = fullTrace.contours;
    var start = contours.start;
    var end = contours.end;
    var cs = contours.size || 1;
    var fill = options.fill;

    var colorMap = makeColorMap(fullTrace);

    var N = Math.floor((end - start) / cs) + (fill ? 2 : 1); // for K thresholds (contour linees) there are K+1 areas
    var levels = new Array(N);
    var levelColors = new Array(4 * N);

    for(var i = 0; i < N; i++) {
        var level = levels[i] = start + cs * (i) - (fill ? cs / 2 : 0); // in case of fill, use band midpoint
        var color = str2RGBArray(colorMap(level));

        for(var j = 0; j < 4; j++) {
            levelColors[(4 * i) + j] = color[j];
        }
    }

    return {
        levels: levels,
        levelColors: levelColors
    };
}

function createContour(scene, fullTrace, calcTrace) {
    var plot = new Contour(scene, fullTrace.uid);
    plot.update(fullTrace, calcTrace);

    return plot;
}

module.exports = createContour;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contourgl/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contourgl/index.js ***!
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



var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

module.exports = {
    attributes: overrideAll(__webpack_require__(/*! ../contour/attributes */ "./node_modules/plotly.js/src/traces/contour/attributes.js"), 'calc', 'nested'),
    supplyDefaults: __webpack_require__(/*! ../contour/defaults */ "./node_modules/plotly.js/src/traces/contour/defaults.js"),
    colorbar: __webpack_require__(/*! ../contour/colorbar */ "./node_modules/plotly.js/src/traces/contour/colorbar.js"),

    calc: __webpack_require__(/*! ../contour/calc */ "./node_modules/plotly.js/src/traces/contour/calc.js"),
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/contourgl/convert.js"),

    moduleType: 'trace',
    name: 'contourgl',
    basePlotModule: __webpack_require__(/*! ../../plots/gl2d */ "./node_modules/plotly.js/src/plots/gl2d/index.js"),
    categories: ['gl', 'gl2d', '2dMap'],
    meta: {
        description: [
            'WebGL contour (beta)'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLWNvbnRvdXIyZC9jb250b3VyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtY29udG91cjJkL2xpYi9zaGFkZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL2xpYi9jb250b3VyZ2wuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL2NvbnN0cmFpbnRfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY29udG91cmdsL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyZ2wvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQVk7O0FBRVo7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLHFEQUFZO0FBQy9CLG1CQUFtQixtQkFBTyxDQUFDLG9EQUFXO0FBQ3RDLG1CQUFtQixtQkFBTyxDQUFDLHFEQUFXO0FBQ3RDLGNBQWMsbUJBQU8sQ0FBQyxrREFBUztBQUMvQixrQkFBa0IsbUJBQU8sQ0FBQyxnRUFBYztBQUN4QyxZQUFZLG1CQUFPLENBQUMsNENBQU87QUFDM0IsZ0JBQWdCLG1CQUFPLENBQUMsMkRBQVk7QUFDcEMsY0FBYyxtQkFBTyxDQUFDLGtGQUFzQjs7QUFFNUMsY0FBYyxtQkFBTyxDQUFDLGlFQUFlOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixtQkFB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QyxvRkFBcUI7O0FBRTNDLFVBQVUsbUJBQU8sQ0FBQyw0RUFBaUI7QUFDbkMsVUFBVSxtQkFBTyxDQUFDLDJFQUFXOztBQUU3QjtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMEVBQWtCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0N2E5OGYzMmIwY2EzYWI1YjI0MDkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDb250b3VyMkRcblxudmFyIGlvdGEgPSByZXF1aXJlKCdpb3RhLWFycmF5JylcbnZhciBjcmVhdGVTaGFkZXIgPSByZXF1aXJlKCdnbC1zaGFkZXInKVxudmFyIGNyZWF0ZUJ1ZmZlciA9IHJlcXVpcmUoJ2dsLWJ1ZmZlcicpXG52YXIgbmRhcnJheSA9IHJlcXVpcmUoJ25kYXJyYXknKVxudmFyIHN1cmZhY2VOZXRzID0gcmVxdWlyZSgnc3VyZmFjZS1uZXRzJylcbnZhciBjZHQyZCA9IHJlcXVpcmUoJ2NkdDJkJylcbnZhciBjbGVhblBTTEcgPSByZXF1aXJlKCdjbGVhbi1wc2xnJylcbnZhciBic2VhcmNoID0gcmVxdWlyZSgnYmluYXJ5LXNlYXJjaC1ib3VuZHMnKVxuXG52YXIgc2hhZGVycyA9IHJlcXVpcmUoJy4vbGliL3NoYWRlcnMnKVxuXG5mdW5jdGlvbiBHTENvbnRvdXIyRCAoXG4gIHBsb3QsXG4gIHNoYWRlcixcbiAgZmlsbFNoYWRlcixcbiAgcG9zaXRpb25CdWZmZXIsXG4gIGNvbG9yQnVmZmVyLFxuICBpZEJ1ZmZlcixcbiAgZmlsbFBvc2l0aW9uQnVmZmVyLFxuICBmaWxsQ29sb3JCdWZmZXIpIHtcbiAgdGhpcy5wbG90ID0gcGxvdFxuICB0aGlzLnNoYWRlciA9IHNoYWRlclxuICB0aGlzLmZpbGxTaGFkZXIgPSBmaWxsU2hhZGVyXG4gIHRoaXMucG9zaXRpb25CdWZmZXIgPSBwb3NpdGlvbkJ1ZmZlclxuICB0aGlzLmNvbG9yQnVmZmVyID0gY29sb3JCdWZmZXJcbiAgdGhpcy5pZEJ1ZmZlciA9IGlkQnVmZmVyXG4gIHRoaXMuZmlsbFBvc2l0aW9uQnVmZmVyID0gZmlsbFBvc2l0aW9uQnVmZmVyXG4gIHRoaXMuZmlsbENvbG9yQnVmZmVyID0gZmlsbENvbG9yQnVmZmVyXG4gIHRoaXMuZmlsbFZlcnRzID0gMFxuICB0aGlzLnNoYXBlID0gWzAsIDBdXG4gIHRoaXMuYm91bmRzID0gW0luZmluaXR5LCBJbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHldXG4gIHRoaXMubnVtVmVydGljZXMgPSAwXG4gIHRoaXMubGluZVdpZHRoID0gMVxufVxuXG52YXIgcHJvdG8gPSBHTENvbnRvdXIyRC5wcm90b3R5cGVcblxudmFyIFdFSUdIVFMgPSBbXG4gIDEsIDAsXG4gIDAsIDAsXG4gIDAsIDEsXG4gIDEsIDAsXG4gIDEsIDEsXG4gIDAsIDFcbl1cblxucHJvdG8uZHJhdyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBNQVRSSVggPSBbXG4gICAgMSwgMCwgMCxcbiAgICAwLCAxLCAwLFxuICAgIDAsIDAsIDFcbiAgXVxuXG4gIHZhciBTQ1JFRU5fU0hBUEUgPSBbMCwgMF1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwbG90ID0gdGhpcy5wbG90XG4gICAgdmFyIHNoYWRlciA9IHRoaXMuc2hhZGVyXG4gICAgdmFyIGZpbGxTaGFkZXIgPSB0aGlzLmZpbGxTaGFkZXJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5ib3VuZHNcbiAgICB2YXIgbnVtVmVydGljZXMgPSB0aGlzLm51bVZlcnRpY2VzXG4gICAgdmFyIGZpbGxWZXJ0cyA9IHRoaXMuZmlsbFZlcnRzXG5cbiAgICB2YXIgdW5pZm9ybXMsIGF0dHJpYnV0ZXNcblxuICAgIHZhciBnbCA9IHBsb3QuZ2xcbiAgICB2YXIgdmlld0JveCA9IHBsb3Qudmlld0JveFxuICAgIHZhciBkYXRhQm94ID0gcGxvdC5kYXRhQm94XG5cbiAgICB2YXIgYm91bmRYID0gYm91bmRzWzJdIC0gYm91bmRzWzBdXG4gICAgdmFyIGJvdW5kWSA9IGJvdW5kc1szXSAtIGJvdW5kc1sxXVxuICAgIHZhciBkYXRhWCA9IGRhdGFCb3hbMl0gLSBkYXRhQm94WzBdXG4gICAgdmFyIGRhdGFZID0gZGF0YUJveFszXSAtIGRhdGFCb3hbMV1cblxuICAgIE1BVFJJWFswXSA9IDIuMCAqIGJvdW5kWCAvIGRhdGFYXG4gICAgTUFUUklYWzRdID0gMi4wICogYm91bmRZIC8gZGF0YVlcbiAgICBNQVRSSVhbNl0gPSAyLjAgKiAoYm91bmRzWzBdIC0gZGF0YUJveFswXSkgLyBkYXRhWCAtIDEuMFxuICAgIE1BVFJJWFs3XSA9IDIuMCAqIChib3VuZHNbMV0gLSBkYXRhQm94WzFdKSAvIGRhdGFZIC0gMS4wXG5cbiAgICBTQ1JFRU5fU0hBUEVbMF0gPSB2aWV3Qm94WzJdIC0gdmlld0JveFswXVxuICAgIFNDUkVFTl9TSEFQRVsxXSA9IHZpZXdCb3hbM10gLSB2aWV3Qm94WzFdXG5cbiAgICBpZiAoZmlsbFZlcnRzID4gMCkge1xuICAgICAgZmlsbFNoYWRlci5iaW5kKClcblxuICAgICAgdW5pZm9ybXMgPSBmaWxsU2hhZGVyLnVuaWZvcm1zXG4gICAgICB1bmlmb3Jtcy52aWV3VHJhbnNmb3JtID0gTUFUUklYXG4gICAgICB1bmlmb3Jtcy5zY3JlZW5TaGFwZSA9IFNDUkVFTl9TSEFQRVxuXG4gICAgICBhdHRyaWJ1dGVzID0gc2hhZGVyLmF0dHJpYnV0ZXNcbiAgICAgIHRoaXMuZmlsbFBvc2l0aW9uQnVmZmVyLmJpbmQoKVxuICAgICAgYXR0cmlidXRlcy5wb3NpdGlvbi5wb2ludGVyKClcblxuICAgICAgdGhpcy5maWxsQ29sb3JCdWZmZXIuYmluZCgpXG4gICAgICBhdHRyaWJ1dGVzLmNvbG9yLnBvaW50ZXIoZ2wuVU5TSUdORURfQllURSwgdHJ1ZSlcblxuICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIGZpbGxWZXJ0cylcbiAgICB9XG5cbiAgICBpZiAobnVtVmVydGljZXMgPiAwKSB7XG4gICAgICBzaGFkZXIuYmluZCgpXG5cbiAgICAgIHZhciBsaW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aCAqIHBsb3QucGl4ZWxSYXRpb1xuXG4gICAgICB1bmlmb3JtcyA9IHNoYWRlci51bmlmb3Jtc1xuICAgICAgdW5pZm9ybXMudmlld1RyYW5zZm9ybSA9IE1BVFJJWFxuICAgICAgdW5pZm9ybXMuc2NyZWVuU2hhcGUgPSBTQ1JFRU5fU0hBUEVcbiAgICAgIHVuaWZvcm1zLmxpbmVXaWR0aCA9IGxpbmVXaWR0aFxuICAgICAgdW5pZm9ybXMucG9pbnRTaXplID0gMTAwMFxuXG4gICAgICBhdHRyaWJ1dGVzID0gc2hhZGVyLmF0dHJpYnV0ZXNcblxuICAgICAgLy8gRHJhdyBsaW5lc1xuICAgICAgdGhpcy5wb3NpdGlvbkJ1ZmZlci5iaW5kKClcbiAgICAgIGF0dHJpYnV0ZXMucG9zaXRpb24ucG9pbnRlcihnbC5GTE9BVCwgZmFsc2UsIDE2LCAwKVxuICAgICAgYXR0cmlidXRlcy50YW5nZW50LnBvaW50ZXIoZ2wuRkxPQVQsIGZhbHNlLCAxNiwgOClcblxuICAgICAgdGhpcy5jb2xvckJ1ZmZlci5iaW5kKClcbiAgICAgIGF0dHJpYnV0ZXMuY29sb3IucG9pbnRlcihnbC5VTlNJR05FRF9CWVRFLCB0cnVlKVxuXG4gICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgbnVtVmVydGljZXMpXG5cbiAgICAgIC8vIERyYXcgZW5kIGNhcHNcbiAgICAgIHVuaWZvcm1zLmxpbmVXaWR0aCA9IDBcbiAgICAgIHVuaWZvcm1zLnBvaW50U2l6ZSA9IGxpbmVXaWR0aFxuXG4gICAgICB0aGlzLnBvc2l0aW9uQnVmZmVyLmJpbmQoKVxuICAgICAgYXR0cmlidXRlcy5wb3NpdGlvbi5wb2ludGVyKGdsLkZMT0FULCBmYWxzZSwgMTYgKiAzLCAwKVxuICAgICAgYXR0cmlidXRlcy50YW5nZW50LnBvaW50ZXIoZ2wuRkxPQVQsIGZhbHNlLCAxNiAqIDMsIDgpXG5cbiAgICAgIHRoaXMuY29sb3JCdWZmZXIuYmluZCgpXG4gICAgICBhdHRyaWJ1dGVzLmNvbG9yLnBvaW50ZXIoZ2wuVU5TSUdORURfQllURSwgdHJ1ZSwgNCAqIDMsIDApXG5cbiAgICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCBudW1WZXJ0aWNlcyAvIDMpXG4gICAgfVxuICB9XG59KSgpXG5cbnByb3RvLmRyYXdQaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChwaWNrT2Zmc2V0KSB7XG4gICAgcmV0dXJuIHBpY2tPZmZzZXRcbiAgfVxufSkoKVxuXG5wcm90by5waWNrID0gZnVuY3Rpb24gKHgsIHksIHZhbHVlKSB7XG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIGludGVycG9sYXRlIChhcnJheSwgcG9pbnQpIHtcbiAgdmFyIGlkeCA9IE1hdGguZmxvb3IocG9pbnQpXG4gIGlmIChpZHggPCAwKSB7XG4gICAgcmV0dXJuIGFycmF5WzBdXG4gIH0gZWxzZSBpZiAoaWR4ID49IGFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV1cbiAgfVxuICB2YXIgdCA9IHBvaW50IC0gaWR4XG4gIHJldHVybiAoMS4wIC0gdCkgKiBhcnJheVtpZHhdICsgdCAqIGFycmF5W2lkeCArIDFdXG59XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgdmFyIHNoYXBlID0gb3B0aW9ucy5zaGFwZSB8fCBbMCwgMF1cblxuICB2YXIgeCA9IG9wdGlvbnMueCB8fCBpb3RhKHNoYXBlWzBdKVxuICB2YXIgeSA9IG9wdGlvbnMueSB8fCBpb3RhKHNoYXBlWzFdKVxuICB2YXIgeiA9IG9wdGlvbnMueiB8fCBuZXcgRmxvYXQzMkFycmF5KHNoYXBlWzBdICogc2hhcGVbMV0pXG5cbiAgdmFyIGxldmVscyA9IG9wdGlvbnMubGV2ZWxzIHx8IFtdXG4gIHZhciBsZXZlbENvbG9ycyA9IG9wdGlvbnMubGV2ZWxDb2xvcnMgfHwgW11cblxuICB2YXIgYm91bmRzID0gdGhpcy5ib3VuZHNcbiAgdmFyIGxveCA9IGJvdW5kc1swXSA9IHhbMF1cbiAgdmFyIGxveSA9IGJvdW5kc1sxXSA9IHlbMF1cbiAgdmFyIGhpeCA9IGJvdW5kc1syXSA9IHhbeC5sZW5ndGggLSAxXVxuICB2YXIgaGl5ID0gYm91bmRzWzNdID0geVt5Lmxlbmd0aCAtIDFdXG5cbiAgaWYgKGxveCA9PT0gaGl4KSB7XG4gICAgYm91bmRzWzJdICs9IDFcbiAgICBoaXggKz0gMVxuICB9XG4gIGlmIChsb3kgPT09IGhpeSkge1xuICAgIGJvdW5kc1szXSArPSAxXG4gICAgaGl5ICs9IDFcbiAgfVxuXG4gIHZhciB4cyA9IDEuMCAvIChoaXggLSBsb3gpXG4gIHZhciB5cyA9IDEuMCAvIChoaXkgLSBsb3kpXG5cbiAgdGhpcy5saW5lV2lkdGggPSBvcHRpb25zLmxpbmVXaWR0aCB8fCAxXG5cbiAgdmFyIHphcnJheSA9IG5kYXJyYXkoeiwgc2hhcGUpXG5cbiAgdmFyIHBvc2l0aW9ucyA9IFtdXG4gIHZhciBjb2xvcnMgPSBbXVxuICB2YXIgaWRzID0gW11cblxuICB2YXIgZmlsbENlbGxzID0gW11cbiAgdmFyIGZpbGxQb3NpdGlvbnMgPSBbXG4gICAgWzAsIDBdLFxuICAgIFtzaGFwZVswXSAtIDEsIDBdLFxuICAgIFswLCBzaGFwZVsxXSAtIDFdLFxuICAgIFtzaGFwZVswXSAtIDEsIHNoYXBlWzFdIC0gMV1cbiAgXVxuXG4gIGZ1bmN0aW9uIGludGVyc2VjdCAobGV2ZWwsIHgsIGEsIGIpIHtcbiAgICB2YXIgZCA9IChiIC0gYSlcbiAgICBpZiAoTWF0aC5hYnMoZCkgPCAxZS02KSB7XG4gICAgICByZXR1cm4geFxuICAgIH1cbiAgICByZXR1cm4gTWF0aC5mbG9vcih4KSArIE1hdGgubWF4KDAuMDAxLCBNYXRoLm1pbigwLjk5OSwgKGxldmVsIC0gYSkgLyBkKSlcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGV2ZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGxldmVsID0gbGV2ZWxzW2ldXG4gICAgaWYgKGkgPiAwICYmIGxldmVsID09PSBsZXZlbHNbaSAtIDFdKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICB2YXIgY29udG91ciA9IHN1cmZhY2VOZXRzKHphcnJheSwgbGV2ZWwpXG5cbiAgICB2YXIgY19yID0gKDI1NSAqIGxldmVsQ29sb3JzWzQgKiBpXSkgfCAwXG4gICAgdmFyIGNfZyA9ICgyNTUgKiBsZXZlbENvbG9yc1s0ICogaSArIDFdKSB8IDBcbiAgICB2YXIgY19iID0gKDI1NSAqIGxldmVsQ29sb3JzWzQgKiBpICsgMl0pIHwgMFxuICAgIHZhciBjX2EgPSAoMjU1ICogbGV2ZWxDb2xvcnNbNCAqIGkgKyAzXSkgfCAwXG5cbiAgICB2YXIgY19jZWxscyA9IGNvbnRvdXIuY2VsbHNcbiAgICB2YXIgY19wb3NpdGlvbnMgPSBjb250b3VyLnBvc2l0aW9uc1xuXG4gICAgLy8gRml4IGJvdW5kYXJpZXNcbiAgICB2YXIgaW5fZGVncmVlID0gQXJyYXkoY19wb3NpdGlvbnMubGVuZ3RoKVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5fZGVncmVlLmxlbmd0aDsgKytqKSB7XG4gICAgICBpbl9kZWdyZWVbal0gPSAwXG4gICAgfVxuICAgIGZvciAoaiA9IDA7IGogPCBjX2NlbGxzLmxlbmd0aDsgKytqKSB7XG4gICAgICB2YXIgZWRnZSA9IGNfY2VsbHNbal1cbiAgICAgIGluX2RlZ3JlZVtlZGdlWzBdXSArPSAxXG4gICAgICBpbl9kZWdyZWVbZWRnZVsxXV0gKz0gMVxuICAgIH1cblxuICAgIGZvciAoaiA9IDA7IGogPCBpbl9kZWdyZWUubGVuZ3RoOyArK2opIHtcbiAgICAgIHZhciBkZWcgPSBpbl9kZWdyZWVbal1cbiAgICAgIGlmIChkZWcgPT09IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHZhciBwcCA9IGNfcG9zaXRpb25zW2pdXG4gICAgICBpbl9kZWdyZWVbal0gPSBmaWxsUG9zaXRpb25zLmxlbmd0aFxuICAgICAgZmlsbFBvc2l0aW9ucy5wdXNoKHBwKVxuICAgICAgaWYgKGRlZyA+IDEpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHZhciBwcHggPSBwcFswXVxuICAgICAgdmFyIHBweSA9IHBwWzFdXG4gICAgICB2YXIgejAwID0gemFycmF5LmdldChNYXRoLmZsb29yKHBweCksIE1hdGguZmxvb3IocHB5KSlcbiAgICAgIHZhciB6MDEgPSB6YXJyYXkuZ2V0KE1hdGguZmxvb3IocHB4KSwgTWF0aC5jZWlsKHBweSkpXG4gICAgICB2YXIgejEwID0gemFycmF5LmdldChNYXRoLmNlaWwocHB4KSwgTWF0aC5mbG9vcihwcHkpKVxuICAgICAgdmFyIHoxMSA9IHphcnJheS5nZXQoTWF0aC5jZWlsKHBweCksIE1hdGguY2VpbChwcHkpKVxuICAgICAgdmFyIGludGVyY2VwdFxuICAgICAgaWYgKE1hdGguZmxvb3IocHBbMF0pID09PSAwICYmXG4gICAgICAgICAgKCh6MDAgPD0gbGV2ZWwpICE9PSAoejAxIDwgbGV2ZWwpKSkge1xuICAgICAgICBpbnRlcmNlcHQgPSBbMCwgaW50ZXJzZWN0KGxldmVsLCBwcFsxXSwgejAwLCB6MDEpXVxuICAgICAgfSBlbHNlIGlmIChNYXRoLmNlaWwocHBbMF0pID09PSBzaGFwZVswXSAtIDEgJiZcbiAgICAgICAgICAoKHoxMCA8PSBsZXZlbCkgIT09ICh6MTEgPCBsZXZlbCkpKSB7XG4gICAgICAgIGludGVyY2VwdCA9IFtzaGFwZVswXSAtIDEsIGludGVyc2VjdChsZXZlbCwgcHBbMV0sIHoxMCwgejExKV1cbiAgICAgIH0gZWxzZSBpZiAoTWF0aC5mbG9vcihwcFsxXSkgPT09IDAgJiZcbiAgICAgICAgICAoKHowMCA8PSBsZXZlbCkgIT09ICh6MTAgPCBsZXZlbCkpKSB7XG4gICAgICAgIGludGVyY2VwdCA9IFtpbnRlcnNlY3QobGV2ZWwsIHBwWzBdLCB6MDAsIHoxMCksIDBdXG4gICAgICB9IGVsc2UgaWYgKE1hdGguY2VpbChwcFsxXSkgPT09IHNoYXBlWzFdIC0gMSAmJlxuICAgICAgICAgICgoejAxIDw9IGxldmVsKSAhPT0gKHoxMSA8IGxldmVsKSkpIHtcbiAgICAgICAgaW50ZXJjZXB0ID0gW2ludGVyc2VjdChsZXZlbCwgcHBbMF0sIHowMSwgejExKSwgc2hhcGVbMV0gLSAxXVxuICAgICAgfVxuICAgICAgaWYgKGludGVyY2VwdCkge1xuICAgICAgICBjX2NlbGxzLnB1c2goW2osIGNfcG9zaXRpb25zLmxlbmd0aF0pXG4gICAgICAgIGluX2RlZ3JlZS5wdXNoKGZpbGxQb3NpdGlvbnMubGVuZ3RoKVxuICAgICAgICBjX3Bvc2l0aW9ucy5wdXNoKGludGVyY2VwdClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGogPSAwOyBqIDwgY19jZWxscy5sZW5ndGg7ICsraikge1xuICAgICAgdmFyIGUgPSBjX2NlbGxzW2pdXG4gICAgICB2YXIgYSA9IGNfcG9zaXRpb25zW2VbMF1dXG4gICAgICB2YXIgYiA9IGNfcG9zaXRpb25zW2VbMV1dXG5cbiAgICAgIGZpbGxDZWxscy5wdXNoKFtpbl9kZWdyZWVbZVswXV0sIGluX2RlZ3JlZVtlWzFdXV0pXG5cbiAgICAgIHZhciBwb2ludElkID0gTWF0aC5yb3VuZChhWzBdKSArIHNoYXBlWzBdICogTWF0aC5yb3VuZChhWzFdKVxuXG4gICAgICB2YXIgYXggPSBpbnRlcnBvbGF0ZSh4LCBhWzBdKVxuICAgICAgdmFyIGF5ID0gaW50ZXJwb2xhdGUoeSwgYVsxXSlcbiAgICAgIHZhciBieCA9IGludGVycG9sYXRlKHgsIGJbMF0pXG4gICAgICB2YXIgYnkgPSBpbnRlcnBvbGF0ZSh5LCBiWzFdKVxuXG4gICAgICBheCA9IHhzICogKGF4IC0gbG94KVxuICAgICAgYXkgPSB5cyAqIChheSAtIGxveSlcbiAgICAgIGJ4ID0geHMgKiAoYnggLSBsb3gpXG4gICAgICBieSA9IHlzICogKGJ5IC0gbG95KVxuXG4gICAgICB2YXIgZHggPSBheCAtIGJ4XG4gICAgICB2YXIgZHkgPSBheSAtIGJ5XG5cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgV0VJR0hUUy5sZW5ndGg7IGsgKz0gMikge1xuICAgICAgICB2YXIgd3ggPSBXRUlHSFRTW2tdXG4gICAgICAgIHZhciB3aXggPSAxLjAgLSB3eFxuICAgICAgICB2YXIgd3kgPSAyLjAgKiBXRUlHSFRTW2sgKyAxXSAtIDEuMFxuXG4gICAgICAgIHBvc2l0aW9ucy5wdXNoKFxuICAgICAgICAgIHdpeCAqIGF4ICsgd3ggKiBieCwgd2l4ICogYXkgKyB3eCAqIGJ5LFxuICAgICAgICAgIHd5ICogZHgsIHd5ICogZHkpXG4gICAgICAgIGNvbG9ycy5wdXNoKGNfciwgY19nLCBjX2IsIGNfYSlcbiAgICAgICAgaWRzLnB1c2gocG9pbnRJZClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLnBvc2l0aW9uQnVmZmVyLnVwZGF0ZShuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucykpXG4gIHRoaXMuY29sb3JCdWZmZXIudXBkYXRlKG5ldyBVaW50OEFycmF5KGNvbG9ycykpXG4gIHRoaXMuaWRCdWZmZXIudXBkYXRlKG5ldyBVaW50MzJBcnJheShpZHMpKVxuICB0aGlzLm51bVZlcnRpY2VzID0gaWRzLmxlbmd0aFxuXG4gIHZhciBmaWxsQ29sb3JzID0gb3B0aW9ucy5maWxsQ29sb3JzXG4gIHZhciBmaWxsQ2VsbENvbG9ycyA9IFtdXG4gIHZhciBmaWxsQ2VsbFBvc2l0aW9ucyA9IFtdXG4gIHZhciBmaWxsVmVydHMgPSAwXG5cbiAgaWYgKGZpbGxDb2xvcnMpIHtcbiAgICBjbGVhblBTTEcoZmlsbFBvc2l0aW9ucywgZmlsbENlbGxzKVxuICAgIHZhciBmaWxsTWVzaCA9IGNkdDJkKGZpbGxQb3NpdGlvbnMsIGZpbGxDZWxscywge1xuICAgICAgZGVsYXVuYXk6IGZhbHNlXG4gICAgfSlcbiAgICBmb3IgKGkgPSAwOyBpIDwgZmlsbE1lc2gubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBjZWxsID0gZmlsbE1lc2hbaV1cbiAgICAgIHZhciBjeCA9IDBcbiAgICAgIHZhciBjeSA9IDBcblxuICAgICAgZm9yIChqID0gMDsgaiA8IDM7ICsraikge1xuICAgICAgICB2YXIgcCA9IGZpbGxQb3NpdGlvbnNbY2VsbFtqXV1cbiAgICAgICAgdmFyIHB4ID0gaW50ZXJwb2xhdGUoeCwgcFswXSlcbiAgICAgICAgdmFyIHB5ID0gaW50ZXJwb2xhdGUoeSwgcFsxXSlcbiAgICAgICAgY3ggKz0gcFswXVxuICAgICAgICBjeSArPSBwWzFdXG4gICAgICAgIGZpbGxDZWxsUG9zaXRpb25zLnB1c2goXG4gICAgICAgICAgeHMgKiAocHggLSBsb3gpLFxuICAgICAgICAgIHlzICogKHB5IC0gbG95KSlcbiAgICAgIH1cblxuICAgICAgLy8gQ29tcHV0ZSBjZW50cm9pZCBvZiB0cmlhbmdsZVxuICAgICAgY3ggLz0gM1xuICAgICAgY3kgLz0gM1xuXG4gICAgICAvLyBTYW1wbGUgaGVpZ2h0IGZpZWxkIGF0IHRyaWFuZ2xlIGNlbnRyb2lkXG4gICAgICB2YXIgY3hpID0gTWF0aC5mbG9vcihjeClcbiAgICAgIHZhciBjeWkgPSBNYXRoLmZsb29yKGN5KVxuICAgICAgdmFyIGN4ZiA9IGN4IC0gY3hpXG4gICAgICB2YXIgY3lmID0gY3kgLSBjeWlcblxuICAgICAgdmFyIGMwMCA9IHphcnJheS5nZXQoY3hpLCBjeWkpXG4gICAgICB2YXIgYzAxID0gemFycmF5LmdldChjeGksIGN5aSArIDEpXG4gICAgICB2YXIgYzEwID0gemFycmF5LmdldChjeGkgKyAxLCBjeWkpXG4gICAgICB2YXIgYzExID0gemFycmF5LmdldChjeGkgKyAxLCBjeWkgKyAxKVxuXG4gICAgICB2YXIgemxldmVsID1cbiAgICAgICAgKDEgLSBjeWYpICogKCgxIC0gY3hmKSAqIGMwMCArIGN4ZiAqIGMxMCkgK1xuICAgICAgICBjeWYgKiAoKDEgLSBjeGYpICogYzAxICsgY3hmICogYzExKVxuXG4gICAgICAvLyBDb2xvciB0cmlhbmdsZSB1c2luZyBjZW50cm9pZCBkYXRhXG4gICAgICB2YXIgbCA9IGJzZWFyY2gubGUobGV2ZWxzLCB6bGV2ZWwpICsgMVxuICAgICAgdmFyIGNyID0gKDI1NSAqIGZpbGxDb2xvcnNbNCAqIGwgKyAwXSkgfCAwXG4gICAgICB2YXIgY2cgPSAoMjU1ICogZmlsbENvbG9yc1s0ICogbCArIDFdKSB8IDBcbiAgICAgIHZhciBjYiA9ICgyNTUgKiBmaWxsQ29sb3JzWzQgKiBsICsgMl0pIHwgMFxuICAgICAgdmFyIGNhID0gKDI1NSAqIGZpbGxDb2xvcnNbNCAqIGwgKyAzXSkgfCAwXG5cbiAgICAgIGZpbGxDZWxsQ29sb3JzLnB1c2goXG4gICAgICAgIGNyLCBjZywgY2IsIGNhLFxuICAgICAgICBjciwgY2csIGNiLCBjYSxcbiAgICAgICAgY3IsIGNnLCBjYiwgY2EpXG5cbiAgICAgIGZpbGxWZXJ0cyArPSAzXG4gICAgfVxuXG4gICAgdGhpcy5maWxsUG9zaXRpb25CdWZmZXIudXBkYXRlKG5ldyBGbG9hdDMyQXJyYXkoZmlsbENlbGxQb3NpdGlvbnMpKVxuICAgIHRoaXMuZmlsbENvbG9yQnVmZmVyLnVwZGF0ZShuZXcgVWludDhBcnJheShmaWxsQ2VsbENvbG9ycykpXG5cbiAgICB0aGlzLmZpbGxWZXJ0cyA9IGZpbGxWZXJ0c1xuICB9XG59XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucGxvdC5yZW1vdmVPYmplY3QodGhpcylcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udG91cjJEIChwbG90LCBvcHRpb25zKSB7XG4gIHZhciBnbCA9IHBsb3QuZ2xcblxuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBzaGFkZXJzLnZlcnRleCwgc2hhZGVycy5mcmFnbWVudClcbiAgdmFyIGZpbGxTaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIHNoYWRlcnMuZmlsbFZlcnRleCwgc2hhZGVycy5mcmFnbWVudClcblxuICB2YXIgcG9zaXRpb25CdWZmZXIgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciBjb2xvckJ1ZmZlciA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIGlkQnVmZmVyID0gY3JlYXRlQnVmZmVyKGdsKVxuXG4gIHZhciBmaWxsUG9zaXRpb25CdWZmZXIgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciBmaWxsQ29sb3JCdWZmZXIgPSBjcmVhdGVCdWZmZXIoZ2wpXG5cbiAgdmFyIGNvbnRvdXJzID0gbmV3IEdMQ29udG91cjJEKFxuICAgIHBsb3QsXG4gICAgc2hhZGVyLFxuICAgIGZpbGxTaGFkZXIsXG4gICAgcG9zaXRpb25CdWZmZXIsXG4gICAgY29sb3JCdWZmZXIsXG4gICAgaWRCdWZmZXIsXG4gICAgZmlsbFBvc2l0aW9uQnVmZmVyLFxuICAgIGZpbGxDb2xvckJ1ZmZlcilcblxuICBjb250b3Vycy51cGRhdGUob3B0aW9ucylcbiAgcGxvdC5hZGRPYmplY3QoY29udG91cnMpXG5cbiAgcmV0dXJuIGNvbnRvdXJzXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGdsc2xpZnkgPSByZXF1aXJlKCdnbHNsaWZ5JylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZyYWdtZW50OiBnbHNsaWZ5KCcuL3NoYWRlcnMvZnJhZ21lbnQuZ2xzbCcpLFxuICB2ZXJ0ZXg6IGdsc2xpZnkoJy4vc2hhZGVycy92ZXJ0ZXguZ2xzbCcpLFxuICBmaWxsVmVydGV4OiBnbHNsaWZ5KCcuL3NoYWRlcnMvZmlsbC12ZXJ0ZXguZ2xzbCcpXG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9jb250b3VyZ2wnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKTtcblxudmFyIGhlYXRtYXBDYWxjID0gcmVxdWlyZSgnLi4vaGVhdG1hcC9jYWxjJyk7XG52YXIgc2V0Q29udG91cnMgPSByZXF1aXJlKCcuL3NldF9jb250b3VycycpO1xudmFyIGVuZFBsdXMgPSByZXF1aXJlKCcuL2VuZF9wbHVzJyk7XG5cbi8vIG1vc3QgaXMgdGhlIHNhbWUgYXMgaGVhdG1hcCBjYWxjLCB0aGVuIGFkanVzdCBpdFxuLy8gdGhvdWdoIGEgZmV3IHRoaW5ncyBpbnNpZGUgaGVhdG1hcCBjYWxjIHN0aWxsIGxvb2sgZm9yXG4vLyBjb250b3VyIG1hcHMsIGJlY2F1c2UgdGhlIG1ha2VCb3VuZEFycmF5IGNhbGxzIGFyZSB0b28gZW50YW5nbGVkXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIGNkID0gaGVhdG1hcENhbGMoZ2QsIHRyYWNlKTtcblxuICAgIHZhciB6T3V0ID0gY2RbMF0uejtcbiAgICBzZXRDb250b3Vycyh0cmFjZSwgek91dCk7XG5cbiAgICB2YXIgY29udG91cnMgPSB0cmFjZS5jb250b3VycztcbiAgICB2YXIgY09wdHMgPSBDb2xvcnNjYWxlLmV4dHJhY3RPcHRzKHRyYWNlKTtcbiAgICB2YXIgY1ZhbHM7XG5cbiAgICBpZihjb250b3Vycy5jb2xvcmluZyA9PT0gJ2hlYXRtYXAnICYmIGNPcHRzLmF1dG8gJiYgdHJhY2UuYXV0b2NvbnRvdXIgPT09IGZhbHNlKSB7XG4gICAgICAgIHZhciBzdGFydCA9IGNvbnRvdXJzLnN0YXJ0O1xuICAgICAgICB2YXIgZW5kID0gZW5kUGx1cyhjb250b3Vycyk7XG4gICAgICAgIHZhciBjcyA9IGNvbnRvdXJzLnNpemUgfHwgMTtcbiAgICAgICAgdmFyIG5jID0gTWF0aC5mbG9vcigoZW5kIC0gc3RhcnQpIC8gY3MpICsgMTtcblxuICAgICAgICBpZighaXNGaW5pdGUoY3MpKSB7XG4gICAgICAgICAgICBjcyA9IDE7XG4gICAgICAgICAgICBuYyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWluMCA9IHN0YXJ0IC0gY3MgLyAyO1xuICAgICAgICB2YXIgbWF4MCA9IG1pbjAgKyBuYyAqIGNzO1xuICAgICAgICBjVmFscyA9IFttaW4wLCBtYXgwXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjVmFscyA9IHpPdXQ7XG4gICAgfVxuXG4gICAgQ29sb3JzY2FsZS5jYWxjKGdkLCB0cmFjZSwge3ZhbHM6IGNWYWxzLCBjTGV0dGVyOiAneid9KTtcblxuICAgIHJldHVybiBjZDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xuXG52YXIgaGFuZGxlTGFiZWxEZWZhdWx0cyA9IHJlcXVpcmUoJy4vbGFiZWxfZGVmYXVsdHMnKTtcblxudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIGFkZE9wYWNpdHkgPSBDb2xvci5hZGRPcGFjaXR5O1xudmFyIG9wYWNpdHkgPSBDb2xvci5vcGFjaXR5O1xuXG52YXIgZmlsdGVyT3BzID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL2ZpbHRlcl9vcHMnKTtcbnZhciBDT05TVFJBSU5UX1JFRFVDVElPTiA9IGZpbHRlck9wcy5DT05TVFJBSU5UX1JFRFVDVElPTjtcbnZhciBDT01QQVJJU09OX09QUzIgPSBmaWx0ZXJPcHMuQ09NUEFSSVNPTl9PUFMyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZUNvbnN0cmFpbnREZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQsIGRlZmF1bHRDb2xvciwgb3B0cykge1xuICAgIHZhciBjb250b3VycyA9IHRyYWNlT3V0LmNvbnRvdXJzO1xuICAgIHZhciBzaG93TGluZXMsIGxpbmVDb2xvciwgZmlsbENvbG9yO1xuXG4gICAgdmFyIG9wZXJhdGlvbiA9IGNvZXJjZSgnY29udG91cnMub3BlcmF0aW9uJyk7XG4gICAgY29udG91cnMuX29wZXJhdGlvbiA9IENPTlNUUkFJTlRfUkVEVUNUSU9OW29wZXJhdGlvbl07XG5cbiAgICBoYW5kbGVDb25zdHJhaW50VmFsdWVEZWZhdWx0cyhjb2VyY2UsIGNvbnRvdXJzKTtcblxuICAgIGlmKG9wZXJhdGlvbiA9PT0gJz0nKSB7XG4gICAgICAgIHNob3dMaW5lcyA9IGNvbnRvdXJzLnNob3dsaW5lcyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2hvd0xpbmVzID0gY29lcmNlKCdjb250b3Vycy5zaG93bGluZXMnKTtcbiAgICAgICAgZmlsbENvbG9yID0gY29lcmNlKCdmaWxsY29sb3InLCBhZGRPcGFjaXR5KFxuICAgICAgICAgICAgKHRyYWNlSW4ubGluZSB8fCB7fSkuY29sb3IgfHwgZGVmYXVsdENvbG9yLCAwLjVcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgaWYoc2hvd0xpbmVzKSB7XG4gICAgICAgIHZhciBsaW5lRGZsdENvbG9yID0gZmlsbENvbG9yICYmIG9wYWNpdHkoZmlsbENvbG9yKSA/XG4gICAgICAgICAgICBhZGRPcGFjaXR5KHRyYWNlT3V0LmZpbGxjb2xvciwgMSkgOlxuICAgICAgICAgICAgZGVmYXVsdENvbG9yO1xuICAgICAgICBsaW5lQ29sb3IgPSBjb2VyY2UoJ2xpbmUuY29sb3InLCBsaW5lRGZsdENvbG9yKTtcbiAgICAgICAgY29lcmNlKCdsaW5lLndpZHRoJywgMik7XG4gICAgICAgIGNvZXJjZSgnbGluZS5kYXNoJyk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdsaW5lLnNtb290aGluZycpO1xuXG4gICAgaGFuZGxlTGFiZWxEZWZhdWx0cyhjb2VyY2UsIGxheW91dCwgbGluZUNvbG9yLCBvcHRzKTtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZUNvbnN0cmFpbnRWYWx1ZURlZmF1bHRzKGNvZXJjZSwgY29udG91cnMpIHtcbiAgICB2YXIgenZhbHVlO1xuXG4gICAgaWYoQ09NUEFSSVNPTl9PUFMyLmluZGV4T2YoY29udG91cnMub3BlcmF0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgLy8gUmVxdWlyZXMgYW4gYXJyYXkgb2YgdHdvIG51bWJlcnM6XG4gICAgICAgIGNvZXJjZSgnY29udG91cnMudmFsdWUnLCBbMCwgMV0pO1xuXG4gICAgICAgIGlmKCFBcnJheS5pc0FycmF5KGNvbnRvdXJzLnZhbHVlKSkge1xuICAgICAgICAgICAgaWYoaXNOdW1lcmljKGNvbnRvdXJzLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHp2YWx1ZSA9IHBhcnNlRmxvYXQoY29udG91cnMudmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnRvdXJzLnZhbHVlID0gW3p2YWx1ZSwgenZhbHVlICsgMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihjb250b3Vycy52YWx1ZS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IGNvbnRvdXJzLnZhbHVlLnNsaWNlKDIpO1xuICAgICAgICB9IGVsc2UgaWYoY29udG91cnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IFswLCAxXTtcbiAgICAgICAgfSBlbHNlIGlmKGNvbnRvdXJzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHp2YWx1ZSA9IHBhcnNlRmxvYXQoY29udG91cnMudmFsdWVbMF0pO1xuICAgICAgICAgICAgY29udG91cnMudmFsdWUgPSBbenZhbHVlLCB6dmFsdWUgKyAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRvdXJzLnZhbHVlID0gW1xuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoY29udG91cnMudmFsdWVbMF0pLFxuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoY29udG91cnMudmFsdWVbMV0pXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVxdWlyZXMgYSBzaW5nbGUgc2NhbGFyOlxuICAgICAgICBjb2VyY2UoJ2NvbnRvdXJzLnZhbHVlJywgMCk7XG5cbiAgICAgICAgaWYoIWlzTnVtZXJpYyhjb250b3Vycy52YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoY29udG91cnMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29udG91cnMudmFsdWUgPSBwYXJzZUZsb2F0KGNvbnRvdXJzLnZhbHVlWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udG91cnMudmFsdWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBoYW5kbGVYWVpEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAveHl6X2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlQ29uc3RyYWludERlZmF1bHRzID0gcmVxdWlyZSgnLi9jb25zdHJhaW50X2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlQ29udG91cnNEZWZhdWx0cyA9IHJlcXVpcmUoJy4vY29udG91cnNfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVTdHlsZURlZmF1bHRzID0gcmVxdWlyZSgnLi9zdHlsZV9kZWZhdWx0cycpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UyKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UyKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyKTtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gaGFuZGxlWFlaRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0KTtcbiAgICBpZighbGVuKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG4gICAgY29lcmNlKCdob3Zlcm9uZ2FwcycpO1xuXG4gICAgdmFyIGlzQ29uc3RyYWludCA9IChjb2VyY2UoJ2NvbnRvdXJzLnR5cGUnKSA9PT0gJ2NvbnN0cmFpbnQnKTtcbiAgICBjb2VyY2UoJ2Nvbm5lY3RnYXBzJywgTGliLmlzQXJyYXkxRCh0cmFjZU91dC56KSk7XG5cbiAgICBpZihpc0NvbnN0cmFpbnQpIHtcbiAgICAgICAgaGFuZGxlQ29uc3RyYWludERlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCwgZGVmYXVsdENvbG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBoYW5kbGVDb250b3Vyc0RlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGNvZXJjZTIpO1xuICAgICAgICBoYW5kbGVTdHlsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlQ29udG91cjJEID0gcmVxdWlyZSgnZ2wtY29udG91cjJkJyk7XG52YXIgY3JlYXRlSGVhdG1hcDJEID0gcmVxdWlyZSgnZ2wtaGVhdG1hcDJkJyk7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBtYWtlQ29sb3JNYXAgPSByZXF1aXJlKCcuLi9jb250b3VyL21ha2VfY29sb3JfbWFwJyk7XG52YXIgc3RyMlJHQkFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliL3N0cjJyZ2JhcnJheScpO1xuXG5cbmZ1bmN0aW9uIENvbnRvdXIoc2NlbmUsIHVpZCkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnVpZCA9IHVpZDtcbiAgICB0aGlzLnR5cGUgPSAnY29udG91cmdsJztcblxuICAgIHRoaXMubmFtZSA9ICcnO1xuICAgIHRoaXMuaG92ZXJpbmZvID0gJ2FsbCc7XG5cbiAgICB0aGlzLnhEYXRhID0gW107XG4gICAgdGhpcy55RGF0YSA9IFtdO1xuICAgIHRoaXMuekRhdGEgPSBbXTtcbiAgICB0aGlzLnRleHRMYWJlbHMgPSBbXTtcblxuICAgIHRoaXMuaWRUb0luZGV4ID0gW107XG4gICAgdGhpcy5ib3VuZHMgPSBbMCwgMCwgMCwgMF07XG5cbiAgICB0aGlzLmNvbnRvdXJPcHRpb25zID0ge1xuICAgICAgICB6OiBuZXcgRmxvYXQzMkFycmF5KDApLFxuICAgICAgICB4OiBbXSxcbiAgICAgICAgeTogW10sXG4gICAgICAgIHNoYXBlOiBbMCwgMF0sXG4gICAgICAgIGxldmVsczogWzBdLFxuICAgICAgICBsZXZlbENvbG9yczogWzAsIDAsIDAsIDFdLFxuICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICB9O1xuICAgIHRoaXMuY29udG91ciA9IGNyZWF0ZUNvbnRvdXIyRChzY2VuZS5nbHBsb3QsIHRoaXMuY29udG91ck9wdGlvbnMpO1xuICAgIHRoaXMuY29udG91ci5fdHJhY2UgPSB0aGlzO1xuXG4gICAgdGhpcy5oZWF0bWFwT3B0aW9ucyA9IHtcbiAgICAgICAgejogbmV3IEZsb2F0MzJBcnJheSgwKSxcbiAgICAgICAgeDogW10sXG4gICAgICAgIHk6IFtdLFxuICAgICAgICBzaGFwZTogWzAsIDBdLFxuICAgICAgICBjb2xvckxldmVsczogWzBdLFxuICAgICAgICBjb2xvclZhbHVlczogWzAsIDAsIDAsIDBdXG4gICAgfTtcbiAgICB0aGlzLmhlYXRtYXAgPSBjcmVhdGVIZWF0bWFwMkQoc2NlbmUuZ2xwbG90LCB0aGlzLmhlYXRtYXBPcHRpb25zKTtcbiAgICB0aGlzLmhlYXRtYXAuX3RyYWNlID0gdGhpcztcbn1cblxudmFyIHByb3RvID0gQ29udG91ci5wcm90b3R5cGU7XG5cbnByb3RvLmhhbmRsZVBpY2sgPSBmdW5jdGlvbihwaWNrUmVzdWx0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLmhlYXRtYXBPcHRpb25zO1xuICAgIHZhciBzaGFwZSA9IG9wdGlvbnMuc2hhcGU7XG4gICAgdmFyIGluZGV4ID0gcGlja1Jlc3VsdC5wb2ludElkO1xuICAgIHZhciB4SW5kZXggPSBpbmRleCAlIHNoYXBlWzBdO1xuICAgIHZhciB5SW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gc2hhcGVbMF0pO1xuICAgIHZhciB6SW5kZXggPSBpbmRleDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRyYWNlOiB0aGlzLFxuICAgICAgICBkYXRhQ29vcmQ6IHBpY2tSZXN1bHQuZGF0YUNvb3JkLFxuICAgICAgICB0cmFjZUNvb3JkOiBbXG4gICAgICAgICAgICBvcHRpb25zLnhbeEluZGV4XSxcbiAgICAgICAgICAgIG9wdGlvbnMueVt5SW5kZXhdLFxuICAgICAgICAgICAgb3B0aW9ucy56W3pJbmRleF1cbiAgICAgICAgXSxcbiAgICAgICAgdGV4dExhYmVsOiB0aGlzLnRleHRMYWJlbHNbaW5kZXhdLFxuICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgIHBvaW50SW5kZXg6IFt5SW5kZXgsIHhJbmRleF0sXG4gICAgICAgIGhvdmVyaW5mbzogdGhpcy5ob3ZlcmluZm9cbiAgICB9O1xufTtcblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oZnVsbFRyYWNlLCBjYWxjVHJhY2UpIHtcbiAgICB2YXIgY2FsY1B0ID0gY2FsY1RyYWNlWzBdO1xuXG4gICAgdGhpcy5pbmRleCA9IGZ1bGxUcmFjZS5pbmRleDtcbiAgICB0aGlzLm5hbWUgPSBmdWxsVHJhY2UubmFtZTtcbiAgICB0aGlzLmhvdmVyaW5mbyA9IGZ1bGxUcmFjZS5ob3ZlcmluZm87XG5cbiAgICAvLyBjb252ZXJ0IHogZnJvbSAyRCAtPiAxRFxuICAgIHZhciB6ID0gY2FsY1B0Lno7XG4gICAgdmFyIHJvd0xlbiA9IHpbMF0ubGVuZ3RoO1xuICAgIHZhciBjb2xMZW4gPSB6Lmxlbmd0aDtcbiAgICB2YXIgY29sb3JPcHRpb25zO1xuXG4gICAgdGhpcy5jb250b3VyT3B0aW9ucy56ID0gZmxhdHRlblooeiwgcm93TGVuLCBjb2xMZW4pO1xuICAgIHRoaXMuaGVhdG1hcE9wdGlvbnMueiA9IFtdLmNvbmNhdC5hcHBseShbXSwgeik7XG5cbiAgICB0aGlzLmNvbnRvdXJPcHRpb25zLnNoYXBlID0gdGhpcy5oZWF0bWFwT3B0aW9ucy5zaGFwZSA9IFtyb3dMZW4sIGNvbExlbl07XG5cbiAgICB0aGlzLmNvbnRvdXJPcHRpb25zLnggPSB0aGlzLmhlYXRtYXBPcHRpb25zLnggPSBjYWxjUHQueDtcbiAgICB0aGlzLmNvbnRvdXJPcHRpb25zLnkgPSB0aGlzLmhlYXRtYXBPcHRpb25zLnkgPSBjYWxjUHQueTtcblxuICAgIC8vIHBhc3Mgb24gZmlsbCBpbmZvcm1hdGlvblxuICAgIGlmKGZ1bGxUcmFjZS5jb250b3Vycy5jb2xvcmluZyA9PT0gJ2ZpbGwnKSB7XG4gICAgICAgIGNvbG9yT3B0aW9ucyA9IGNvbnZlcnRDb2xvclNjYWxlKGZ1bGxUcmFjZSwge2ZpbGw6IHRydWV9KTtcbiAgICAgICAgdGhpcy5jb250b3VyT3B0aW9ucy5sZXZlbHMgPSBjb2xvck9wdGlvbnMubGV2ZWxzLnNsaWNlKDEpO1xuICAgICAgICAvLyB0aG91Z2ggZ2wtY29udG91cjJkIGF1dG9tYXRpY2FsbHkgZGVmYXVsdHMgdG8gYSB0cmFuc3BhcmVudCBsYXllciBmb3IgdGhlIGxhc3RcbiAgICAgICAgLy8gYmFuZCBjb2xvciwgaXQncyBzZXQgbWFudWFsbHkgaGVyZSBpbiBjYXNlIHRoZSBnbC1jb250b3VyMiBBUEkgY2hhbmdlc1xuICAgICAgICB0aGlzLmNvbnRvdXJPcHRpb25zLmZpbGxDb2xvcnMgPSBjb2xvck9wdGlvbnMubGV2ZWxDb2xvcnM7XG4gICAgICAgIHRoaXMuY29udG91ck9wdGlvbnMubGV2ZWxDb2xvcnMgPSBbXS5jb25jYXQuYXBwbHkoW10sIHRoaXMuY29udG91ck9wdGlvbnMubGV2ZWxzLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBbMC4yNSwgMC4yNSwgMC4yNSwgMS4wXTtcbiAgICAgICAgfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbG9yT3B0aW9ucyA9IGNvbnZlcnRDb2xvclNjYWxlKGZ1bGxUcmFjZSwge2ZpbGw6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMuY29udG91ck9wdGlvbnMubGV2ZWxzID0gY29sb3JPcHRpb25zLmxldmVscztcbiAgICAgICAgdGhpcy5jb250b3VyT3B0aW9ucy5sZXZlbENvbG9ycyA9IGNvbG9yT3B0aW9ucy5sZXZlbENvbG9ycztcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IHRleHQgZnJvbSAyRCAtPiAxRFxuICAgIHRoaXMudGV4dExhYmVscyA9IFtdLmNvbmNhdC5hcHBseShbXSwgZnVsbFRyYWNlLnRleHQpO1xuXG4gICAgdGhpcy5jb250b3VyLnVwZGF0ZSh0aGlzLmNvbnRvdXJPcHRpb25zKTtcbiAgICB0aGlzLmhlYXRtYXAudXBkYXRlKHRoaXMuaGVhdG1hcE9wdGlvbnMpO1xuXG4gICAgdmFyIHhhID0gdGhpcy5zY2VuZS54YXhpcztcbiAgICB2YXIgeWEgPSB0aGlzLnNjZW5lLnlheGlzO1xuICAgIGZ1bGxUcmFjZS5fZXh0cmVtZXNbeGEuX2lkXSA9IEF4ZXMuZmluZEV4dHJlbWVzKHhhLCBjYWxjUHQueCk7XG4gICAgZnVsbFRyYWNlLl9leHRyZW1lc1t5YS5faWRdID0gQXhlcy5maW5kRXh0cmVtZXMoeWEsIGNhbGNQdC55KTtcbn07XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbnRvdXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuaGVhdG1hcC5kaXNwb3NlKCk7XG59O1xuXG5mdW5jdGlvbiBmbGF0dGVuWih6SW4sIHJvd0xlbiwgY29sTGVuKSB7XG4gICAgdmFyIHpPdXQgPSBuZXcgRmxvYXQzMkFycmF5KHJvd0xlbiAqIGNvbExlbik7XG4gICAgdmFyIHB0ID0gMDtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCByb3dMZW47IGkrKykge1xuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgY29sTGVuOyBqKyspIHtcbiAgICAgICAgICAgIHpPdXRbcHQrK10gPSB6SW5bal1baV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gek91dDtcbn1cblxuZnVuY3Rpb24gY29udmVydENvbG9yU2NhbGUoZnVsbFRyYWNlLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRvdXJzID0gZnVsbFRyYWNlLmNvbnRvdXJzO1xuICAgIHZhciBzdGFydCA9IGNvbnRvdXJzLnN0YXJ0O1xuICAgIHZhciBlbmQgPSBjb250b3Vycy5lbmQ7XG4gICAgdmFyIGNzID0gY29udG91cnMuc2l6ZSB8fCAxO1xuICAgIHZhciBmaWxsID0gb3B0aW9ucy5maWxsO1xuXG4gICAgdmFyIGNvbG9yTWFwID0gbWFrZUNvbG9yTWFwKGZ1bGxUcmFjZSk7XG5cbiAgICB2YXIgTiA9IE1hdGguZmxvb3IoKGVuZCAtIHN0YXJ0KSAvIGNzKSArIChmaWxsID8gMiA6IDEpOyAvLyBmb3IgSyB0aHJlc2hvbGRzIChjb250b3VyIGxpbmVlcykgdGhlcmUgYXJlIEsrMSBhcmVhc1xuICAgIHZhciBsZXZlbHMgPSBuZXcgQXJyYXkoTik7XG4gICAgdmFyIGxldmVsQ29sb3JzID0gbmV3IEFycmF5KDQgKiBOKTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgICAgdmFyIGxldmVsID0gbGV2ZWxzW2ldID0gc3RhcnQgKyBjcyAqIChpKSAtIChmaWxsID8gY3MgLyAyIDogMCk7IC8vIGluIGNhc2Ugb2YgZmlsbCwgdXNlIGJhbmQgbWlkcG9pbnRcbiAgICAgICAgdmFyIGNvbG9yID0gc3RyMlJHQkFycmF5KGNvbG9yTWFwKGxldmVsKSk7XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xuICAgICAgICAgICAgbGV2ZWxDb2xvcnNbKDQgKiBpKSArIGpdID0gY29sb3Jbal07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsZXZlbHM6IGxldmVscyxcbiAgICAgICAgbGV2ZWxDb2xvcnM6IGxldmVsQ29sb3JzXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udG91cihzY2VuZSwgZnVsbFRyYWNlLCBjYWxjVHJhY2UpIHtcbiAgICB2YXIgcGxvdCA9IG5ldyBDb250b3VyKHNjZW5lLCBmdWxsVHJhY2UudWlkKTtcbiAgICBwbG90LnVwZGF0ZShmdWxsVHJhY2UsIGNhbGNUcmFjZSk7XG5cbiAgICByZXR1cm4gcGxvdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDb250b3VyO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgb3ZlcnJpZGVBbGwgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9lZGl0X3R5cGVzJykub3ZlcnJpZGVBbGw7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IG92ZXJyaWRlQWxsKHJlcXVpcmUoJy4uL2NvbnRvdXIvYXR0cmlidXRlcycpLCAnY2FsYycsICduZXN0ZWQnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi4vY29udG91ci9kZWZhdWx0cycpLFxuICAgIGNvbG9yYmFyOiByZXF1aXJlKCcuLi9jb250b3VyL2NvbG9yYmFyJyksXG5cbiAgICBjYWxjOiByZXF1aXJlKCcuLi9jb250b3VyL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL2NvbnZlcnQnKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ2NvbnRvdXJnbCcsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dsMmQnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2dsJywgJ2dsMmQnLCAnMmRNYXAnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnV2ViR0wgY29udG91ciAoYmV0YSknXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=