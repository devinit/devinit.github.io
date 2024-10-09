(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_gl-heatmap2d_heatmap_js-node_modules_plotly_js_src_traces_heatmap_xyz_de-5697b0"],{

/***/ "./node_modules/gl-heatmap2d/heatmap.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-heatmap2d/heatmap.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createHeatmap2D

var bsearch = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")
var iota = __webpack_require__(/*! iota-array */ "./node_modules/iota-array/iota.js")
var pool = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")

var shaders = __webpack_require__(/*! ./lib/shaders */ "./node_modules/gl-heatmap2d/lib/shaders.js")

function GLHeatmap2D (
  plot,
  shader,
  pickShader,
  positionBuffer,
  weightBuffer,
  colorBuffer,
  idBuffer) {
  this.plot = plot
  this.shader = shader
  this.pickShader = pickShader
  this.positionBuffer = positionBuffer
  this.weightBuffer = weightBuffer
  this.colorBuffer = colorBuffer
  this.idBuffer = idBuffer
  this.xData = []
  this.yData = []
  this.shape = [0, 0]
  this.bounds = [Infinity, Infinity, -Infinity, -Infinity]
  this.pickOffset = 0
}

var proto = GLHeatmap2D.prototype

var WEIGHTS = [
  0, 0,
  1, 0,
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

  return function () {
    var plot = this.plot
    var shader = this.shader
    var bounds = this.bounds
    var numVertices = this.numVertices

    if (numVertices <= 0) {
      return
    }

    var gl = plot.gl
    var dataBox = plot.dataBox

    var boundX = bounds[2] - bounds[0]
    var boundY = bounds[3] - bounds[1]
    var dataX = dataBox[2] - dataBox[0]
    var dataY = dataBox[3] - dataBox[1]

    MATRIX[0] = 2.0 * boundX / dataX
    MATRIX[4] = 2.0 * boundY / dataY
    MATRIX[6] = 2.0 * (bounds[0] - dataBox[0]) / dataX - 1.0
    MATRIX[7] = 2.0 * (bounds[1] - dataBox[1]) / dataY - 1.0

    shader.bind()

    var uniforms = shader.uniforms
    uniforms.viewTransform = MATRIX

    uniforms.shape = this.shape

    var attributes = shader.attributes
    this.positionBuffer.bind()
    attributes.position.pointer()

    this.weightBuffer.bind()
    attributes.weight.pointer(gl.UNSIGNED_BYTE, false)

    this.colorBuffer.bind()
    attributes.color.pointer(gl.UNSIGNED_BYTE, true)

    gl.drawArrays(gl.TRIANGLES, 0, numVertices)
  }
})()

proto.drawPick = (function () {
  var MATRIX = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ]

  var PICK_VECTOR = [0, 0, 0, 0]

  return function (pickOffset) {
    var plot = this.plot
    var shader = this.pickShader
    var bounds = this.bounds
    var numVertices = this.numVertices

    if (numVertices <= 0) {
      return
    }

    var gl = plot.gl
    var dataBox = plot.dataBox

    var boundX = bounds[2] - bounds[0]
    var boundY = bounds[3] - bounds[1]
    var dataX = dataBox[2] - dataBox[0]
    var dataY = dataBox[3] - dataBox[1]

    MATRIX[0] = 2.0 * boundX / dataX
    MATRIX[4] = 2.0 * boundY / dataY
    MATRIX[6] = 2.0 * (bounds[0] - dataBox[0]) / dataX - 1.0
    MATRIX[7] = 2.0 * (bounds[1] - dataBox[1]) / dataY - 1.0

    for (var i = 0; i < 4; ++i) {
      PICK_VECTOR[i] = (pickOffset >> (i * 8)) & 0xff
    }

    this.pickOffset = pickOffset

    shader.bind()

    var uniforms = shader.uniforms
    uniforms.viewTransform = MATRIX
    uniforms.pickOffset = PICK_VECTOR
    uniforms.shape = this.shape

    var attributes = shader.attributes
    this.positionBuffer.bind()
    attributes.position.pointer()

    this.weightBuffer.bind()
    attributes.weight.pointer(gl.UNSIGNED_BYTE, false)

    this.idBuffer.bind()
    attributes.pickId.pointer(gl.UNSIGNED_BYTE, false)

    gl.drawArrays(gl.TRIANGLES, 0, numVertices)

    return pickOffset + this.shape[0] * this.shape[1]
  }
})()

proto.pick = function (x, y, value) {
  var pickOffset = this.pickOffset
  var pointCount = this.shape[0] * this.shape[1]
  if (value < pickOffset || value >= pickOffset + pointCount) {
    return null
  }
  var pointId = value - pickOffset
  var xData = this.xData
  var yData = this.yData
  return {
    object: this,
    pointId: pointId,
    dataCoord: [
      xData[pointId % this.shape[0]],
      yData[(pointId / this.shape[0]) | 0]]
  }
}

proto.update = function (options) {
  options = options || {}

  var shape = options.shape || [0, 0]

  var x = options.x || iota(shape[0])
  var y = options.y || iota(shape[1])
  var z = options.z || new Float32Array(shape[0] * shape[1])

  this.xData = x
  this.yData = y

  var colorLevels = options.colorLevels || [0]
  var colorValues = options.colorValues || [0, 0, 0, 1]
  var colorCount = colorLevels.length

  var bounds = this.bounds
  var lox = bounds[0] = x[0]
  var loy = bounds[1] = y[0]
  var hix = bounds[2] = x[x.length - 1]
  var hiy = bounds[3] = y[y.length - 1]

  var xs = 1.0 / (hix - lox)
  var ys = 1.0 / (hiy - loy)

  var numX = shape[0]
  var numY = shape[1]

  this.shape = [numX, numY]

  var numVerts = (numX - 1) * (numY - 1) * (WEIGHTS.length >>> 1)

  this.numVertices = numVerts

  var colors = pool.mallocUint8(numVerts * 4)
  var positions = pool.mallocFloat32(numVerts * 2)
  var weights   = pool.mallocUint8 (numVerts * 2)
  var ids = pool.mallocUint32(numVerts)

  var ptr = 0

  for (var j = 0; j < numY - 1; ++j) {
    var yc0 = ys * (y[j] - loy)
    var yc1 = ys * (y[j + 1] - loy)
    for (var i = 0; i < numX - 1; ++i) {
      var xc0 = xs * (x[i] - lox)
      var xc1 = xs * (x[i + 1] - lox)

      for (var dd = 0; dd < WEIGHTS.length; dd += 2) {
        var dx = WEIGHTS[dd]
        var dy = WEIGHTS[dd + 1]
        var offset = (j + dy) * numX + (i + dx)
        var zc = z[offset]
        var colorIdx = bsearch.le(colorLevels, zc)
        var r, g, b, a
        if (colorIdx < 0) {
          r = colorValues[0]
          g = colorValues[1]
          b = colorValues[2]
          a = colorValues[3]
        } else if (colorIdx === colorCount - 1) {
          r = colorValues[4 * colorCount - 4]
          g = colorValues[4 * colorCount - 3]
          b = colorValues[4 * colorCount - 2]
          a = colorValues[4 * colorCount - 1]
        } else {
          var t = (zc - colorLevels[colorIdx]) /
            (colorLevels[colorIdx + 1] - colorLevels[colorIdx])
          var ti = 1.0 - t
          var i0 = 4 * colorIdx
          var i1 = 4 * (colorIdx + 1)
          r = ti * colorValues[i0] + t * colorValues[i1]
          g = ti * colorValues[i0 + 1] + t * colorValues[i1 + 1]
          b = ti * colorValues[i0 + 2] + t * colorValues[i1 + 2]
          a = ti * colorValues[i0 + 3] + t * colorValues[i1 + 3]
        }

        colors[4 * ptr] = 255 * r
        colors[4 * ptr + 1] = 255 * g
        colors[4 * ptr + 2] = 255 * b
        colors[4 * ptr + 3] = 255 * a

        positions[2*ptr] = xc0*.5 + xc1*.5;
        positions[2*ptr+1] = yc0*.5 + yc1*.5;

        weights[2*ptr] = dx;
        weights[2*ptr+1] = dy;

        ids[ptr] = j * numX + i

        ptr += 1
      }
    }
  }

  this.positionBuffer.update(positions)
  this.weightBuffer.update(weights)
  this.colorBuffer.update(colors)
  this.idBuffer.update(ids)

  pool.free(positions)
  pool.free(colors)
  pool.free(weights)
  pool.free(ids)
}

proto.dispose = function () {
  this.shader.dispose()
  this.pickShader.dispose()
  this.positionBuffer.dispose()
  this.weightBuffer.dispose()
  this.colorBuffer.dispose()
  this.idBuffer.dispose()
  this.plot.removeObject(this)
}

function createHeatmap2D (plot, options) {
  var gl = plot.gl

  var shader = createShader(gl, shaders.vertex, shaders.fragment)
  var pickShader = createShader(gl, shaders.pickVertex, shaders.pickFragment)

  var positionBuffer = createBuffer(gl)
  var weightBuffer   = createBuffer(gl)
  var colorBuffer = createBuffer(gl)
  var idBuffer = createBuffer(gl)

  var heatmap = new GLHeatmap2D(
    plot,
    shader,
    pickShader,
    positionBuffer,
    weightBuffer,
    colorBuffer,
    idBuffer)

  heatmap.update(options)
  plot.addObject(heatmap)

  return heatmap
}


/***/ }),

/***/ "./node_modules/gl-heatmap2d/lib/shaders.js":
/*!**************************************************!*\
  !*** ./node_modules/gl-heatmap2d/lib/shaders.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")

module.exports = {
  fragment:     glslify('./shaders/fragment.glsl'),
  vertex:       glslify('./shaders/vertex.glsl'),
  pickFragment: glslify('./shaders/pick-fragment.glsl'),
  pickVertex:   glslify('./shaders/pick-vertex.glsl')
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

module.exports = function handleXYZDefaults(traceIn, traceOut, coerce, layout, xName, yName) {
    var z = coerce('z');
    xName = xName || 'x';
    yName = yName || 'y';
    var x, y;

    if(z === undefined || !z.length) return 0;

    if(Lib.isArray1D(traceIn.z)) {
        x = coerce(xName);
        y = coerce(yName);

        var xlen = Lib.minRowLength(x);
        var ylen = Lib.minRowLength(y);

        // column z must be accompanied by xName and yName arrays
        if(xlen === 0 || ylen === 0) return 0;

        traceOut._length = Math.min(xlen, ylen, z.length);
    } else {
        x = coordDefaults(xName, coerce);
        y = coordDefaults(yName, coerce);

        // TODO put z validation elsewhere
        if(!isValidZ(z)) return 0;

        coerce('transpose');

        traceOut._length = null;
    }

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, [xName, yName], layout);

    return true;
};

function coordDefaults(coordStr, coerce) {
    var coord = coerce(coordStr);
    var coordType = coord ? coerce(coordStr + 'type', 'array') : 'scaled';

    if(coordType === 'scaled') {
        coerce(coordStr + '0');
        coerce('d' + coordStr);
    }

    return coord;
}

function isValidZ(z) {
    var allRowsAreArrays = true;
    var oneRowIsFilled = false;
    var hasOneNumber = false;
    var zi;

    /*
     * Without this step:
     *
     * hasOneNumber = false breaks contour but not heatmap
     * allRowsAreArrays = false breaks contour but not heatmap
     * oneRowIsFilled = false breaks both
     */

    for(var i = 0; i < z.length; i++) {
        zi = z[i];
        if(!Lib.isArrayOrTypedArray(zi)) {
            allRowsAreArrays = false;
            break;
        }
        if(zi.length > 0) oneRowIsFilled = true;
        for(var j = 0; j < zi.length; j++) {
            if(isNumeric(zi[j])) {
                hasOneNumber = true;
                break;
            }
        }
    }

    return (allRowsAreArrays && oneRowIsFilled && hasOneNumber);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLWhlYXRtYXAyZC9oZWF0bWFwLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtaGVhdG1hcDJkL2xpYi9zaGFkZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC94eXpfZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQVk7O0FBRVo7O0FBRUEsY0FBYyxtQkFBTyxDQUFDLGtGQUFzQjtBQUM1QyxXQUFXLG1CQUFPLENBQUMscURBQVk7QUFDL0IsV0FBVyxtQkFBTyxDQUFDLCtEQUFpQjtBQUNwQyxtQkFBbUIsbUJBQU8sQ0FBQyxvREFBVztBQUN0QyxtQkFBbUIsbUJBQU8sQ0FBQyxxREFBVzs7QUFFdEMsY0FBYyxtQkFBTyxDQUFDLGlFQUFlOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCLGNBQWM7QUFDL0I7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7O0FBRUEsc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNUWTs7QUFFWixjQUFjLG1CQUFPLENBQUMsa0RBQVM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsZ0JBQWdCLG1CQUFPLENBQUMsOERBQWdCO0FBQ3hDLFVBQVUsbUJBQU8sQ0FBQyw0REFBVzs7QUFFN0IsZUFBZSxtQkFBTyxDQUFDLGdFQUFnQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImNoYXJ0YTUxYWUxNzFiYTQ0OGNlODUwMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVIZWF0bWFwMkRcblxudmFyIGJzZWFyY2ggPSByZXF1aXJlKCdiaW5hcnktc2VhcmNoLWJvdW5kcycpXG52YXIgaW90YSA9IHJlcXVpcmUoJ2lvdGEtYXJyYXknKVxudmFyIHBvb2wgPSByZXF1aXJlKCd0eXBlZGFycmF5LXBvb2wnKVxudmFyIGNyZWF0ZVNoYWRlciA9IHJlcXVpcmUoJ2dsLXNoYWRlcicpXG52YXIgY3JlYXRlQnVmZmVyID0gcmVxdWlyZSgnZ2wtYnVmZmVyJylcblxudmFyIHNoYWRlcnMgPSByZXF1aXJlKCcuL2xpYi9zaGFkZXJzJylcblxuZnVuY3Rpb24gR0xIZWF0bWFwMkQgKFxuICBwbG90LFxuICBzaGFkZXIsXG4gIHBpY2tTaGFkZXIsXG4gIHBvc2l0aW9uQnVmZmVyLFxuICB3ZWlnaHRCdWZmZXIsXG4gIGNvbG9yQnVmZmVyLFxuICBpZEJ1ZmZlcikge1xuICB0aGlzLnBsb3QgPSBwbG90XG4gIHRoaXMuc2hhZGVyID0gc2hhZGVyXG4gIHRoaXMucGlja1NoYWRlciA9IHBpY2tTaGFkZXJcbiAgdGhpcy5wb3NpdGlvbkJ1ZmZlciA9IHBvc2l0aW9uQnVmZmVyXG4gIHRoaXMud2VpZ2h0QnVmZmVyID0gd2VpZ2h0QnVmZmVyXG4gIHRoaXMuY29sb3JCdWZmZXIgPSBjb2xvckJ1ZmZlclxuICB0aGlzLmlkQnVmZmVyID0gaWRCdWZmZXJcbiAgdGhpcy54RGF0YSA9IFtdXG4gIHRoaXMueURhdGEgPSBbXVxuICB0aGlzLnNoYXBlID0gWzAsIDBdXG4gIHRoaXMuYm91bmRzID0gW0luZmluaXR5LCBJbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHldXG4gIHRoaXMucGlja09mZnNldCA9IDBcbn1cblxudmFyIHByb3RvID0gR0xIZWF0bWFwMkQucHJvdG90eXBlXG5cbnZhciBXRUlHSFRTID0gW1xuICAwLCAwLFxuICAxLCAwLFxuICAwLCAxLFxuICAxLCAwLFxuICAxLCAxLFxuICAwLCAxXG5dXG5cbnByb3RvLmRyYXcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgTUFUUklYID0gW1xuICAgIDEsIDAsIDAsXG4gICAgMCwgMSwgMCxcbiAgICAwLCAwLCAxXG4gIF1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwbG90ID0gdGhpcy5wbG90XG4gICAgdmFyIHNoYWRlciA9IHRoaXMuc2hhZGVyXG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuYm91bmRzXG4gICAgdmFyIG51bVZlcnRpY2VzID0gdGhpcy5udW1WZXJ0aWNlc1xuXG4gICAgaWYgKG51bVZlcnRpY2VzIDw9IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBnbCA9IHBsb3QuZ2xcbiAgICB2YXIgZGF0YUJveCA9IHBsb3QuZGF0YUJveFxuXG4gICAgdmFyIGJvdW5kWCA9IGJvdW5kc1syXSAtIGJvdW5kc1swXVxuICAgIHZhciBib3VuZFkgPSBib3VuZHNbM10gLSBib3VuZHNbMV1cbiAgICB2YXIgZGF0YVggPSBkYXRhQm94WzJdIC0gZGF0YUJveFswXVxuICAgIHZhciBkYXRhWSA9IGRhdGFCb3hbM10gLSBkYXRhQm94WzFdXG5cbiAgICBNQVRSSVhbMF0gPSAyLjAgKiBib3VuZFggLyBkYXRhWFxuICAgIE1BVFJJWFs0XSA9IDIuMCAqIGJvdW5kWSAvIGRhdGFZXG4gICAgTUFUUklYWzZdID0gMi4wICogKGJvdW5kc1swXSAtIGRhdGFCb3hbMF0pIC8gZGF0YVggLSAxLjBcbiAgICBNQVRSSVhbN10gPSAyLjAgKiAoYm91bmRzWzFdIC0gZGF0YUJveFsxXSkgLyBkYXRhWSAtIDEuMFxuXG4gICAgc2hhZGVyLmJpbmQoKVxuXG4gICAgdmFyIHVuaWZvcm1zID0gc2hhZGVyLnVuaWZvcm1zXG4gICAgdW5pZm9ybXMudmlld1RyYW5zZm9ybSA9IE1BVFJJWFxuXG4gICAgdW5pZm9ybXMuc2hhcGUgPSB0aGlzLnNoYXBlXG5cbiAgICB2YXIgYXR0cmlidXRlcyA9IHNoYWRlci5hdHRyaWJ1dGVzXG4gICAgdGhpcy5wb3NpdGlvbkJ1ZmZlci5iaW5kKClcbiAgICBhdHRyaWJ1dGVzLnBvc2l0aW9uLnBvaW50ZXIoKVxuXG4gICAgdGhpcy53ZWlnaHRCdWZmZXIuYmluZCgpXG4gICAgYXR0cmlidXRlcy53ZWlnaHQucG9pbnRlcihnbC5VTlNJR05FRF9CWVRFLCBmYWxzZSlcblxuICAgIHRoaXMuY29sb3JCdWZmZXIuYmluZCgpXG4gICAgYXR0cmlidXRlcy5jb2xvci5wb2ludGVyKGdsLlVOU0lHTkVEX0JZVEUsIHRydWUpXG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgbnVtVmVydGljZXMpXG4gIH1cbn0pKClcblxucHJvdG8uZHJhd1BpY2sgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgTUFUUklYID0gW1xuICAgIDEsIDAsIDAsXG4gICAgMCwgMSwgMCxcbiAgICAwLCAwLCAxXG4gIF1cblxuICB2YXIgUElDS19WRUNUT1IgPSBbMCwgMCwgMCwgMF1cblxuICByZXR1cm4gZnVuY3Rpb24gKHBpY2tPZmZzZXQpIHtcbiAgICB2YXIgcGxvdCA9IHRoaXMucGxvdFxuICAgIHZhciBzaGFkZXIgPSB0aGlzLnBpY2tTaGFkZXJcbiAgICB2YXIgYm91bmRzID0gdGhpcy5ib3VuZHNcbiAgICB2YXIgbnVtVmVydGljZXMgPSB0aGlzLm51bVZlcnRpY2VzXG5cbiAgICBpZiAobnVtVmVydGljZXMgPD0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdmFyIGdsID0gcGxvdC5nbFxuICAgIHZhciBkYXRhQm94ID0gcGxvdC5kYXRhQm94XG5cbiAgICB2YXIgYm91bmRYID0gYm91bmRzWzJdIC0gYm91bmRzWzBdXG4gICAgdmFyIGJvdW5kWSA9IGJvdW5kc1szXSAtIGJvdW5kc1sxXVxuICAgIHZhciBkYXRhWCA9IGRhdGFCb3hbMl0gLSBkYXRhQm94WzBdXG4gICAgdmFyIGRhdGFZID0gZGF0YUJveFszXSAtIGRhdGFCb3hbMV1cblxuICAgIE1BVFJJWFswXSA9IDIuMCAqIGJvdW5kWCAvIGRhdGFYXG4gICAgTUFUUklYWzRdID0gMi4wICogYm91bmRZIC8gZGF0YVlcbiAgICBNQVRSSVhbNl0gPSAyLjAgKiAoYm91bmRzWzBdIC0gZGF0YUJveFswXSkgLyBkYXRhWCAtIDEuMFxuICAgIE1BVFJJWFs3XSA9IDIuMCAqIChib3VuZHNbMV0gLSBkYXRhQm94WzFdKSAvIGRhdGFZIC0gMS4wXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgUElDS19WRUNUT1JbaV0gPSAocGlja09mZnNldCA+PiAoaSAqIDgpKSAmIDB4ZmZcbiAgICB9XG5cbiAgICB0aGlzLnBpY2tPZmZzZXQgPSBwaWNrT2Zmc2V0XG5cbiAgICBzaGFkZXIuYmluZCgpXG5cbiAgICB2YXIgdW5pZm9ybXMgPSBzaGFkZXIudW5pZm9ybXNcbiAgICB1bmlmb3Jtcy52aWV3VHJhbnNmb3JtID0gTUFUUklYXG4gICAgdW5pZm9ybXMucGlja09mZnNldCA9IFBJQ0tfVkVDVE9SXG4gICAgdW5pZm9ybXMuc2hhcGUgPSB0aGlzLnNoYXBlXG5cbiAgICB2YXIgYXR0cmlidXRlcyA9IHNoYWRlci5hdHRyaWJ1dGVzXG4gICAgdGhpcy5wb3NpdGlvbkJ1ZmZlci5iaW5kKClcbiAgICBhdHRyaWJ1dGVzLnBvc2l0aW9uLnBvaW50ZXIoKVxuXG4gICAgdGhpcy53ZWlnaHRCdWZmZXIuYmluZCgpXG4gICAgYXR0cmlidXRlcy53ZWlnaHQucG9pbnRlcihnbC5VTlNJR05FRF9CWVRFLCBmYWxzZSlcblxuICAgIHRoaXMuaWRCdWZmZXIuYmluZCgpXG4gICAgYXR0cmlidXRlcy5waWNrSWQucG9pbnRlcihnbC5VTlNJR05FRF9CWVRFLCBmYWxzZSlcblxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCBudW1WZXJ0aWNlcylcblxuICAgIHJldHVybiBwaWNrT2Zmc2V0ICsgdGhpcy5zaGFwZVswXSAqIHRoaXMuc2hhcGVbMV1cbiAgfVxufSkoKVxuXG5wcm90by5waWNrID0gZnVuY3Rpb24gKHgsIHksIHZhbHVlKSB7XG4gIHZhciBwaWNrT2Zmc2V0ID0gdGhpcy5waWNrT2Zmc2V0XG4gIHZhciBwb2ludENvdW50ID0gdGhpcy5zaGFwZVswXSAqIHRoaXMuc2hhcGVbMV1cbiAgaWYgKHZhbHVlIDwgcGlja09mZnNldCB8fCB2YWx1ZSA+PSBwaWNrT2Zmc2V0ICsgcG9pbnRDb3VudCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdmFyIHBvaW50SWQgPSB2YWx1ZSAtIHBpY2tPZmZzZXRcbiAgdmFyIHhEYXRhID0gdGhpcy54RGF0YVxuICB2YXIgeURhdGEgPSB0aGlzLnlEYXRhXG4gIHJldHVybiB7XG4gICAgb2JqZWN0OiB0aGlzLFxuICAgIHBvaW50SWQ6IHBvaW50SWQsXG4gICAgZGF0YUNvb3JkOiBbXG4gICAgICB4RGF0YVtwb2ludElkICUgdGhpcy5zaGFwZVswXV0sXG4gICAgICB5RGF0YVsocG9pbnRJZCAvIHRoaXMuc2hhcGVbMF0pIHwgMF1dXG4gIH1cbn1cblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICB2YXIgc2hhcGUgPSBvcHRpb25zLnNoYXBlIHx8IFswLCAwXVxuXG4gIHZhciB4ID0gb3B0aW9ucy54IHx8IGlvdGEoc2hhcGVbMF0pXG4gIHZhciB5ID0gb3B0aW9ucy55IHx8IGlvdGEoc2hhcGVbMV0pXG4gIHZhciB6ID0gb3B0aW9ucy56IHx8IG5ldyBGbG9hdDMyQXJyYXkoc2hhcGVbMF0gKiBzaGFwZVsxXSlcblxuICB0aGlzLnhEYXRhID0geFxuICB0aGlzLnlEYXRhID0geVxuXG4gIHZhciBjb2xvckxldmVscyA9IG9wdGlvbnMuY29sb3JMZXZlbHMgfHwgWzBdXG4gIHZhciBjb2xvclZhbHVlcyA9IG9wdGlvbnMuY29sb3JWYWx1ZXMgfHwgWzAsIDAsIDAsIDFdXG4gIHZhciBjb2xvckNvdW50ID0gY29sb3JMZXZlbHMubGVuZ3RoXG5cbiAgdmFyIGJvdW5kcyA9IHRoaXMuYm91bmRzXG4gIHZhciBsb3ggPSBib3VuZHNbMF0gPSB4WzBdXG4gIHZhciBsb3kgPSBib3VuZHNbMV0gPSB5WzBdXG4gIHZhciBoaXggPSBib3VuZHNbMl0gPSB4W3gubGVuZ3RoIC0gMV1cbiAgdmFyIGhpeSA9IGJvdW5kc1szXSA9IHlbeS5sZW5ndGggLSAxXVxuXG4gIHZhciB4cyA9IDEuMCAvIChoaXggLSBsb3gpXG4gIHZhciB5cyA9IDEuMCAvIChoaXkgLSBsb3kpXG5cbiAgdmFyIG51bVggPSBzaGFwZVswXVxuICB2YXIgbnVtWSA9IHNoYXBlWzFdXG5cbiAgdGhpcy5zaGFwZSA9IFtudW1YLCBudW1ZXVxuXG4gIHZhciBudW1WZXJ0cyA9IChudW1YIC0gMSkgKiAobnVtWSAtIDEpICogKFdFSUdIVFMubGVuZ3RoID4+PiAxKVxuXG4gIHRoaXMubnVtVmVydGljZXMgPSBudW1WZXJ0c1xuXG4gIHZhciBjb2xvcnMgPSBwb29sLm1hbGxvY1VpbnQ4KG51bVZlcnRzICogNClcbiAgdmFyIHBvc2l0aW9ucyA9IHBvb2wubWFsbG9jRmxvYXQzMihudW1WZXJ0cyAqIDIpXG4gIHZhciB3ZWlnaHRzICAgPSBwb29sLm1hbGxvY1VpbnQ4IChudW1WZXJ0cyAqIDIpXG4gIHZhciBpZHMgPSBwb29sLm1hbGxvY1VpbnQzMihudW1WZXJ0cylcblxuICB2YXIgcHRyID0gMFxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgbnVtWSAtIDE7ICsraikge1xuICAgIHZhciB5YzAgPSB5cyAqICh5W2pdIC0gbG95KVxuICAgIHZhciB5YzEgPSB5cyAqICh5W2ogKyAxXSAtIGxveSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVggLSAxOyArK2kpIHtcbiAgICAgIHZhciB4YzAgPSB4cyAqICh4W2ldIC0gbG94KVxuICAgICAgdmFyIHhjMSA9IHhzICogKHhbaSArIDFdIC0gbG94KVxuXG4gICAgICBmb3IgKHZhciBkZCA9IDA7IGRkIDwgV0VJR0hUUy5sZW5ndGg7IGRkICs9IDIpIHtcbiAgICAgICAgdmFyIGR4ID0gV0VJR0hUU1tkZF1cbiAgICAgICAgdmFyIGR5ID0gV0VJR0hUU1tkZCArIDFdXG4gICAgICAgIHZhciBvZmZzZXQgPSAoaiArIGR5KSAqIG51bVggKyAoaSArIGR4KVxuICAgICAgICB2YXIgemMgPSB6W29mZnNldF1cbiAgICAgICAgdmFyIGNvbG9ySWR4ID0gYnNlYXJjaC5sZShjb2xvckxldmVscywgemMpXG4gICAgICAgIHZhciByLCBnLCBiLCBhXG4gICAgICAgIGlmIChjb2xvcklkeCA8IDApIHtcbiAgICAgICAgICByID0gY29sb3JWYWx1ZXNbMF1cbiAgICAgICAgICBnID0gY29sb3JWYWx1ZXNbMV1cbiAgICAgICAgICBiID0gY29sb3JWYWx1ZXNbMl1cbiAgICAgICAgICBhID0gY29sb3JWYWx1ZXNbM11cbiAgICAgICAgfSBlbHNlIGlmIChjb2xvcklkeCA9PT0gY29sb3JDb3VudCAtIDEpIHtcbiAgICAgICAgICByID0gY29sb3JWYWx1ZXNbNCAqIGNvbG9yQ291bnQgLSA0XVxuICAgICAgICAgIGcgPSBjb2xvclZhbHVlc1s0ICogY29sb3JDb3VudCAtIDNdXG4gICAgICAgICAgYiA9IGNvbG9yVmFsdWVzWzQgKiBjb2xvckNvdW50IC0gMl1cbiAgICAgICAgICBhID0gY29sb3JWYWx1ZXNbNCAqIGNvbG9yQ291bnQgLSAxXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0ID0gKHpjIC0gY29sb3JMZXZlbHNbY29sb3JJZHhdKSAvXG4gICAgICAgICAgICAoY29sb3JMZXZlbHNbY29sb3JJZHggKyAxXSAtIGNvbG9yTGV2ZWxzW2NvbG9ySWR4XSlcbiAgICAgICAgICB2YXIgdGkgPSAxLjAgLSB0XG4gICAgICAgICAgdmFyIGkwID0gNCAqIGNvbG9ySWR4XG4gICAgICAgICAgdmFyIGkxID0gNCAqIChjb2xvcklkeCArIDEpXG4gICAgICAgICAgciA9IHRpICogY29sb3JWYWx1ZXNbaTBdICsgdCAqIGNvbG9yVmFsdWVzW2kxXVxuICAgICAgICAgIGcgPSB0aSAqIGNvbG9yVmFsdWVzW2kwICsgMV0gKyB0ICogY29sb3JWYWx1ZXNbaTEgKyAxXVxuICAgICAgICAgIGIgPSB0aSAqIGNvbG9yVmFsdWVzW2kwICsgMl0gKyB0ICogY29sb3JWYWx1ZXNbaTEgKyAyXVxuICAgICAgICAgIGEgPSB0aSAqIGNvbG9yVmFsdWVzW2kwICsgM10gKyB0ICogY29sb3JWYWx1ZXNbaTEgKyAzXVxuICAgICAgICB9XG5cbiAgICAgICAgY29sb3JzWzQgKiBwdHJdID0gMjU1ICogclxuICAgICAgICBjb2xvcnNbNCAqIHB0ciArIDFdID0gMjU1ICogZ1xuICAgICAgICBjb2xvcnNbNCAqIHB0ciArIDJdID0gMjU1ICogYlxuICAgICAgICBjb2xvcnNbNCAqIHB0ciArIDNdID0gMjU1ICogYVxuXG4gICAgICAgIHBvc2l0aW9uc1syKnB0cl0gPSB4YzAqLjUgKyB4YzEqLjU7XG4gICAgICAgIHBvc2l0aW9uc1syKnB0cisxXSA9IHljMCouNSArIHljMSouNTtcblxuICAgICAgICB3ZWlnaHRzWzIqcHRyXSA9IGR4O1xuICAgICAgICB3ZWlnaHRzWzIqcHRyKzFdID0gZHk7XG5cbiAgICAgICAgaWRzW3B0cl0gPSBqICogbnVtWCArIGlcblxuICAgICAgICBwdHIgKz0gMVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMucG9zaXRpb25CdWZmZXIudXBkYXRlKHBvc2l0aW9ucylcbiAgdGhpcy53ZWlnaHRCdWZmZXIudXBkYXRlKHdlaWdodHMpXG4gIHRoaXMuY29sb3JCdWZmZXIudXBkYXRlKGNvbG9ycylcbiAgdGhpcy5pZEJ1ZmZlci51cGRhdGUoaWRzKVxuXG4gIHBvb2wuZnJlZShwb3NpdGlvbnMpXG4gIHBvb2wuZnJlZShjb2xvcnMpXG4gIHBvb2wuZnJlZSh3ZWlnaHRzKVxuICBwb29sLmZyZWUoaWRzKVxufVxuXG5wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnNoYWRlci5kaXNwb3NlKClcbiAgdGhpcy5waWNrU2hhZGVyLmRpc3Bvc2UoKVxuICB0aGlzLnBvc2l0aW9uQnVmZmVyLmRpc3Bvc2UoKVxuICB0aGlzLndlaWdodEJ1ZmZlci5kaXNwb3NlKClcbiAgdGhpcy5jb2xvckJ1ZmZlci5kaXNwb3NlKClcbiAgdGhpcy5pZEJ1ZmZlci5kaXNwb3NlKClcbiAgdGhpcy5wbG90LnJlbW92ZU9iamVjdCh0aGlzKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWF0bWFwMkQgKHBsb3QsIG9wdGlvbnMpIHtcbiAgdmFyIGdsID0gcGxvdC5nbFxuXG4gIHZhciBzaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIHNoYWRlcnMudmVydGV4LCBzaGFkZXJzLmZyYWdtZW50KVxuICB2YXIgcGlja1NoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgc2hhZGVycy5waWNrVmVydGV4LCBzaGFkZXJzLnBpY2tGcmFnbWVudClcblxuICB2YXIgcG9zaXRpb25CdWZmZXIgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciB3ZWlnaHRCdWZmZXIgICA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIGNvbG9yQnVmZmVyID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgaWRCdWZmZXIgPSBjcmVhdGVCdWZmZXIoZ2wpXG5cbiAgdmFyIGhlYXRtYXAgPSBuZXcgR0xIZWF0bWFwMkQoXG4gICAgcGxvdCxcbiAgICBzaGFkZXIsXG4gICAgcGlja1NoYWRlcixcbiAgICBwb3NpdGlvbkJ1ZmZlcixcbiAgICB3ZWlnaHRCdWZmZXIsXG4gICAgY29sb3JCdWZmZXIsXG4gICAgaWRCdWZmZXIpXG5cbiAgaGVhdG1hcC51cGRhdGUob3B0aW9ucylcbiAgcGxvdC5hZGRPYmplY3QoaGVhdG1hcClcblxuICByZXR1cm4gaGVhdG1hcFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBnbHNsaWZ5ID0gcmVxdWlyZSgnZ2xzbGlmeScpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBmcmFnbWVudDogICAgIGdsc2xpZnkoJy4vc2hhZGVycy9mcmFnbWVudC5nbHNsJyksXG4gIHZlcnRleDogICAgICAgZ2xzbGlmeSgnLi9zaGFkZXJzL3ZlcnRleC5nbHNsJyksXG4gIHBpY2tGcmFnbWVudDogZ2xzbGlmeSgnLi9zaGFkZXJzL3BpY2stZnJhZ21lbnQuZ2xzbCcpLFxuICBwaWNrVmVydGV4OiAgIGdsc2xpZnkoJy4vc2hhZGVycy9waWNrLXZlcnRleC5nbHNsJylcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlWFlaRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0LCB4TmFtZSwgeU5hbWUpIHtcbiAgICB2YXIgeiA9IGNvZXJjZSgneicpO1xuICAgIHhOYW1lID0geE5hbWUgfHwgJ3gnO1xuICAgIHlOYW1lID0geU5hbWUgfHwgJ3knO1xuICAgIHZhciB4LCB5O1xuXG4gICAgaWYoeiA9PT0gdW5kZWZpbmVkIHx8ICF6Lmxlbmd0aCkgcmV0dXJuIDA7XG5cbiAgICBpZihMaWIuaXNBcnJheTFEKHRyYWNlSW4ueikpIHtcbiAgICAgICAgeCA9IGNvZXJjZSh4TmFtZSk7XG4gICAgICAgIHkgPSBjb2VyY2UoeU5hbWUpO1xuXG4gICAgICAgIHZhciB4bGVuID0gTGliLm1pblJvd0xlbmd0aCh4KTtcbiAgICAgICAgdmFyIHlsZW4gPSBMaWIubWluUm93TGVuZ3RoKHkpO1xuXG4gICAgICAgIC8vIGNvbHVtbiB6IG11c3QgYmUgYWNjb21wYW5pZWQgYnkgeE5hbWUgYW5kIHlOYW1lIGFycmF5c1xuICAgICAgICBpZih4bGVuID09PSAwIHx8IHlsZW4gPT09IDApIHJldHVybiAwO1xuXG4gICAgICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBNYXRoLm1pbih4bGVuLCB5bGVuLCB6Lmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IGNvb3JkRGVmYXVsdHMoeE5hbWUsIGNvZXJjZSk7XG4gICAgICAgIHkgPSBjb29yZERlZmF1bHRzKHlOYW1lLCBjb2VyY2UpO1xuXG4gICAgICAgIC8vIFRPRE8gcHV0IHogdmFsaWRhdGlvbiBlbHNld2hlcmVcbiAgICAgICAgaWYoIWlzVmFsaWRaKHopKSByZXR1cm4gMDtcblxuICAgICAgICBjb2VyY2UoJ3RyYW5zcG9zZScpO1xuXG4gICAgICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVDYWxlbmRhckRlZmF1bHRzID0gUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdjYWxlbmRhcnMnLCAnaGFuZGxlVHJhY2VEZWZhdWx0cycpO1xuICAgIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIFt4TmFtZSwgeU5hbWVdLCBsYXlvdXQpO1xuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBjb29yZERlZmF1bHRzKGNvb3JkU3RyLCBjb2VyY2UpIHtcbiAgICB2YXIgY29vcmQgPSBjb2VyY2UoY29vcmRTdHIpO1xuICAgIHZhciBjb29yZFR5cGUgPSBjb29yZCA/IGNvZXJjZShjb29yZFN0ciArICd0eXBlJywgJ2FycmF5JykgOiAnc2NhbGVkJztcblxuICAgIGlmKGNvb3JkVHlwZSA9PT0gJ3NjYWxlZCcpIHtcbiAgICAgICAgY29lcmNlKGNvb3JkU3RyICsgJzAnKTtcbiAgICAgICAgY29lcmNlKCdkJyArIGNvb3JkU3RyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29vcmQ7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRaKHopIHtcbiAgICB2YXIgYWxsUm93c0FyZUFycmF5cyA9IHRydWU7XG4gICAgdmFyIG9uZVJvd0lzRmlsbGVkID0gZmFsc2U7XG4gICAgdmFyIGhhc09uZU51bWJlciA9IGZhbHNlO1xuICAgIHZhciB6aTtcblxuICAgIC8qXG4gICAgICogV2l0aG91dCB0aGlzIHN0ZXA6XG4gICAgICpcbiAgICAgKiBoYXNPbmVOdW1iZXIgPSBmYWxzZSBicmVha3MgY29udG91ciBidXQgbm90IGhlYXRtYXBcbiAgICAgKiBhbGxSb3dzQXJlQXJyYXlzID0gZmFsc2UgYnJlYWtzIGNvbnRvdXIgYnV0IG5vdCBoZWF0bWFwXG4gICAgICogb25lUm93SXNGaWxsZWQgPSBmYWxzZSBicmVha3MgYm90aFxuICAgICAqL1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgemkgPSB6W2ldO1xuICAgICAgICBpZighTGliLmlzQXJyYXlPclR5cGVkQXJyYXkoemkpKSB7XG4gICAgICAgICAgICBhbGxSb3dzQXJlQXJyYXlzID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZih6aS5sZW5ndGggPiAwKSBvbmVSb3dJc0ZpbGxlZCA9IHRydWU7XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB6aS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYoaXNOdW1lcmljKHppW2pdKSkge1xuICAgICAgICAgICAgICAgIGhhc09uZU51bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKGFsbFJvd3NBcmVBcnJheXMgJiYgb25lUm93SXNGaWxsZWQgJiYgaGFzT25lTnVtYmVyKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=