(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_scatter3d_js"],{

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

/***/ "./node_modules/gl-error3d/errorbars.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-error3d/errorbars.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createErrorBars

var createBuffer  = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO     = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var createShader  = __webpack_require__(/*! ./shaders/index */ "./node_modules/gl-error3d/shaders/index.js")

var IDENTITY = [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]

function ErrorBars(gl, buffer, vao, shader) {
  this.gl           = gl
  this.shader       = shader
  this.buffer       = buffer
  this.vao          = vao
  this.pixelRatio   = 1
  this.bounds       = [[ Infinity, Infinity, Infinity], [-Infinity,-Infinity,-Infinity]]
  this.clipBounds   = [[-Infinity,-Infinity,-Infinity], [ Infinity, Infinity, Infinity]]
  this.lineWidth    = [1,1,1]
  this.capSize      = [10,10,10]
  this.lineCount    = [0,0,0]
  this.lineOffset   = [0,0,0]
  this.opacity      = 1
  this.hasAlpha     = false
}

var proto = ErrorBars.prototype

proto.isOpaque = function() {
  return !this.hasAlpha
}

proto.isTransparent = function() {
  return this.hasAlpha
}

proto.drawTransparent = proto.draw = function(cameraParams) {
  var gl = this.gl
  var uniforms        = this.shader.uniforms

  this.shader.bind()
  var view       = uniforms.view       = cameraParams.view       || IDENTITY
  var projection = uniforms.projection = cameraParams.projection || IDENTITY
  uniforms.model      = cameraParams.model      || IDENTITY
  uniforms.clipBounds = this.clipBounds
  uniforms.opacity    = this.opacity


  var cx = view[12]
  var cy = view[13]
  var cz = view[14]
  var cw = view[15]

  var isOrtho = cameraParams._ortho || false
  var orthoFix = (isOrtho) ? 2 : 1 // double up padding for orthographic ticks & labels
  var pixelScaleF = orthoFix * this.pixelRatio * (projection[3]*cx + projection[7]*cy + projection[11]*cz + projection[15]*cw) / gl.drawingBufferHeight

  this.vao.bind()
  for(var i=0; i<3; ++i) {
    gl.lineWidth(this.lineWidth[i] * this.pixelRatio)
    uniforms.capSize = this.capSize[i] * pixelScaleF
    if (this.lineCount[i]) {
      gl.drawArrays(gl.LINES, this.lineOffset[i], this.lineCount[i])
    }
  }
  this.vao.unbind()
}

function updateBounds(bounds, point) {
  for(var i=0; i<3; ++i) {
    bounds[0][i] = Math.min(bounds[0][i], point[i])
    bounds[1][i] = Math.max(bounds[1][i], point[i])
  }
}

var FACE_TABLE = (function(){
  var table = new Array(3)
  for(var d=0; d<3; ++d) {
    var row = []
    for(var j=1; j<=2; ++j) {
      for(var s=-1; s<=1; s+=2) {
        var u = (j+d) % 3
        var y = [0,0,0]
        y[u] = s
        row.push(y)
      }
    }
    table[d] = row
  }
  return table
})()


function emitFace(verts, x, c, d) {
  var offsets = FACE_TABLE[d]
  for(var i=0; i<offsets.length; ++i) {
    var o = offsets[i]
    verts.push(x[0], x[1], x[2],
               c[0], c[1], c[2], c[3],
               o[0], o[1], o[2])
  }
  return offsets.length
}

proto.update = function(options) {
  options = options || {}

  if('lineWidth' in options) {
    this.lineWidth = options.lineWidth
    if(!Array.isArray(this.lineWidth)) {
      this.lineWidth = [this.lineWidth, this.lineWidth, this.lineWidth]
    }
  }
  if('capSize' in options) {
    this.capSize = options.capSize
    if(!Array.isArray(this.capSize)) {
      this.capSize = [this.capSize, this.capSize, this.capSize]
    }
  }

  this.hasAlpha = false // default to no transparent draw
  if('opacity' in options) {
    this.opacity = +options.opacity
    if(this.opacity < 1) {
      this.hasAlpha = true;
    }
  }

  var color    = options.color || [[0,0,0],[0,0,0],[0,0,0]]
  var position = options.position
  var error    = options.error
  if(!Array.isArray(color[0])) {
    color = [color,color,color]
  }

  if(position && error) {

    var verts       = []
    var n           = position.length
    var vertexCount = 0
    this.bounds     = [[ Infinity, Infinity, Infinity],
                       [-Infinity,-Infinity,-Infinity]]
    this.lineCount  = [0,0,0]

    //Build geometry for lines
    for(var j=0; j<3; ++j) {
      this.lineOffset[j] = vertexCount

i_loop:
      for(var i=0; i<n; ++i) {
        var p = position[i]

        for(var k=0; k<3; ++k) {
          if(isNaN(p[k]) || !isFinite(p[k])) {
            continue i_loop
          }
        }

        var e = error[i]
        var c = color[j]
        if(Array.isArray(c[0])) {
          c = color[i]
        }
        if(c.length === 3) {
          c = [c[0], c[1], c[2], 1]
        } else if(c.length === 4) {
          c = [c[0], c[1], c[2], c[3]]
          if(!this.hasAlpha && c[3] < 1) this.hasAlpha = true
        }

        if(isNaN(e[0][j]) || isNaN(e[1][j])) {
          continue
        }
        if(e[0][j] < 0) {
          var x = p.slice()
          x[j] += e[0][j]
          verts.push(p[0], p[1], p[2],
                     c[0], c[1], c[2], c[3],
                        0,    0,    0,
                     x[0], x[1], x[2],
                     c[0], c[1], c[2], c[3],
                        0,    0,    0)
          updateBounds(this.bounds, x)
          vertexCount += 2 + emitFace(verts, x, c, j)
        }
        if(e[1][j] > 0) {
          var x = p.slice()
          x[j] += e[1][j]
          verts.push(p[0], p[1], p[2],
                     c[0], c[1], c[2], c[3],
                        0,    0,    0,
                     x[0], x[1], x[2],
                     c[0], c[1], c[2], c[3],
                        0,    0,    0)
          updateBounds(this.bounds, x)
          vertexCount += 2 + emitFace(verts, x, c, j)
        }
      }
      this.lineCount[j] = vertexCount - this.lineOffset[j]
    }
    this.buffer.update(verts)
  }
}

proto.dispose = function() {
  this.shader.dispose()
  this.buffer.dispose()
  this.vao.dispose()
}

function createErrorBars(options) {
  var gl = options.gl
  var buffer = createBuffer(gl)
  var vao = createVAO(gl, [
      {
        buffer: buffer,
        type:   gl.FLOAT,
        size:   3,
        offset: 0,
        stride: 40
      },
      {
        buffer: buffer,
        type:   gl.FLOAT,
        size:   4,
        offset: 12,
        stride: 40
      },
      {
        buffer: buffer,
        type:   gl.FLOAT,
        size:   3,
        offset: 28,
        stride: 40
      }
    ])

  var shader = createShader(gl)
  shader.attributes.position.location = 0
  shader.attributes.color.location    = 1
  shader.attributes.offset.location   = 2

  var result = new ErrorBars(gl, buffer, vao, shader)
  result.update(options)
  return result
}


/***/ }),

/***/ "./node_modules/gl-error3d/shaders/index.js":
/*!**************************************************!*\
  !*** ./node_modules/gl-error3d/shaders/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")
var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")

var vertSrc = glslify('./vertex.glsl')
var fragSrc = glslify('./fragment.glsl')

module.exports = function(gl) {
  return createShader(gl, vertSrc, fragSrc, null, [
    {name: 'position', type: 'vec3'},
    {name: 'color', type: 'vec4'},
    {name: 'offset', type: 'vec3'}
  ])
}


/***/ }),

/***/ "./node_modules/gl-line3d/lib/shaders.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-line3d/lib/shaders.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var glslify       = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")
var createShader  = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")

var vertSrc = glslify('../shaders/vertex.glsl')
var forwardFrag = glslify('../shaders/fragment.glsl')
var pickFrag = glslify('../shaders/pick.glsl')

var ATTRIBUTES = [
  {name: 'position', type: 'vec3'},
  {name: 'nextPosition', type: 'vec3'},
  {name: 'arcLength', type: 'float'},
  {name: 'lineWidth', type: 'float'},
  {name: 'color', type: 'vec4'}
]

exports.createShader = function(gl) {
  return createShader(gl, vertSrc, forwardFrag, null, ATTRIBUTES)
}

exports.createPickShader = function(gl) {
  return createShader(gl, vertSrc, pickFrag, null, ATTRIBUTES)
}


/***/ }),

/***/ "./node_modules/gl-line3d/lines.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-line3d/lines.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createLinePlot

var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var createTexture = __webpack_require__(/*! gl-texture2d */ "./node_modules/gl-texture2d/texture.js")

var UINT8_VIEW = new Uint8Array(4)
var FLOAT_VIEW = new Float32Array(UINT8_VIEW.buffer)
// https://github.com/mikolalysenko/glsl-read-float/blob/master/index.js
function unpackFloat(x, y, z, w) {
  UINT8_VIEW[0] = w
  UINT8_VIEW[1] = z
  UINT8_VIEW[2] = y
  UINT8_VIEW[3] = x
  return FLOAT_VIEW[0]
}

var bsearch = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")
var ndarray = __webpack_require__(/*! ndarray */ "./node_modules/ndarray/ndarray.js")
var shaders = __webpack_require__(/*! ./lib/shaders */ "./node_modules/gl-line3d/lib/shaders.js")

var createShader = shaders.createShader
var createPickShader = shaders.createPickShader

var identity = [1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1]

function distance (a, b) {
  var s = 0.0
  for (var i = 0; i < 3; ++i) {
    var d = a[i] - b[i]
    s += d * d
  }
  return Math.sqrt(s)
}

function filterClipBounds (bounds) {
  var result = [[-1e6, -1e6, -1e6], [1e6, 1e6, 1e6]]
  for (var i = 0; i < 3; ++i) {
    result[0][i] = Math.max(bounds[0][i], result[0][i])
    result[1][i] = Math.min(bounds[1][i], result[1][i])
  }
  return result
}

function PickResult (tau, position, index, dataCoordinate) {
  this.arcLength = tau
  this.position = position
  this.index = index
  this.dataCoordinate = dataCoordinate
}

function LinePlot (gl, shader, pickShader, buffer, vao, texture) {
  this.gl = gl
  this.shader = shader
  this.pickShader = pickShader
  this.buffer = buffer
  this.vao = vao
  this.clipBounds = [
    [ -Infinity, -Infinity, -Infinity ],
    [ Infinity, Infinity, Infinity ]]
  this.points = []
  this.arcLength = []
  this.vertexCount = 0
  this.bounds = [[0, 0, 0], [0, 0, 0]]
  this.pickId = 0
  this.lineWidth = 1
  this.texture = texture
  this.dashScale = 1
  this.opacity = 1
  this.hasAlpha = false
  this.dirty = true
  this.pixelRatio = 1
}

var proto = LinePlot.prototype

proto.isTransparent = function () {
  return this.hasAlpha
}

proto.isOpaque = function () {
  return !this.hasAlpha
}

proto.pickSlots = 1

proto.setPickBase = function (id) {
  this.pickId = id
}

proto.drawTransparent = proto.draw = function (camera) {
  if (!this.vertexCount) return
  var gl = this.gl
  var shader = this.shader
  var vao = this.vao
  shader.bind()
  shader.uniforms = {
    model: camera.model || identity,
    view: camera.view || identity,
    projection: camera.projection || identity,
    clipBounds: filterClipBounds(this.clipBounds),
    dashTexture: this.texture.bind(),
    dashScale: this.dashScale / this.arcLength[this.arcLength.length - 1],
    opacity: this.opacity,
    screenShape: [gl.drawingBufferWidth, gl.drawingBufferHeight],
    pixelRatio: this.pixelRatio
  }
  vao.bind()
  vao.draw(gl.TRIANGLE_STRIP, this.vertexCount)
  vao.unbind()
}

proto.drawPick = function (camera) {
  if (!this.vertexCount) return
  var gl = this.gl
  var shader = this.pickShader
  var vao = this.vao
  shader.bind()
  shader.uniforms = {
    model: camera.model || identity,
    view: camera.view || identity,
    projection: camera.projection || identity,
    pickId: this.pickId,
    clipBounds: filterClipBounds(this.clipBounds),
    screenShape: [gl.drawingBufferWidth, gl.drawingBufferHeight],
    pixelRatio: this.pixelRatio
  }
  vao.bind()
  vao.draw(gl.TRIANGLE_STRIP, this.vertexCount)
  vao.unbind()
}

proto.update = function (options) {
  var i, j

  this.dirty = true

  var connectGaps = !!options.connectGaps

  if ('dashScale' in options) {
    this.dashScale = options.dashScale
  }

  this.hasAlpha = false // default to no transparent draw
  if ('opacity' in options) {
    this.opacity = +options.opacity
    if(this.opacity < 1) {
      this.hasAlpha = true;
    }
  }

  // Recalculate buffer data
  var buffer = []
  var arcLengthArray = []
  var pointArray = []
  var arcLength = 0.0
  var vertexCount = 0
  var bounds = [
    [ Infinity, Infinity, Infinity ],
    [ -Infinity, -Infinity, -Infinity ]]

  var positions = options.position || options.positions
  if (positions) {

    // Default color
    var colors = options.color || options.colors || [0, 0, 0, 1]

    var lineWidth = options.lineWidth || 1

    var hadGap = false

    fill_loop:
    for (i = 1; i < positions.length; ++i) {
      var a = positions[i - 1]
      var b = positions[i]

      arcLengthArray.push(arcLength)
      pointArray.push(a.slice())

      for (j = 0; j < 3; ++j) {
        if (isNaN(a[j]) || isNaN(b[j]) ||
          !isFinite(a[j]) || !isFinite(b[j])) {

          if (!connectGaps && buffer.length > 0) {
            for (var k = 0; k < 24; ++k) {
              buffer.push(buffer[buffer.length - 12])
            }
            vertexCount += 2
            hadGap = true
          }

          continue fill_loop
        }
        bounds[0][j] = Math.min(bounds[0][j], a[j], b[j])
        bounds[1][j] = Math.max(bounds[1][j], a[j], b[j])
      }

      var acolor, bcolor
      if (Array.isArray(colors[0])) {
        acolor = (colors.length > i - 1) ? colors[i - 1] :             // using index value
                 (colors.length > 0)     ? colors[colors.length - 1] : // using last item
                                           [0, 0, 0, 1];               // using black

        bcolor = (colors.length > i) ? colors[i] :                 // using index value
                 (colors.length > 0) ? colors[colors.length - 1] : // using last item
                                       [0, 0, 0, 1];               // using black
      } else {
        acolor = bcolor = colors
      }

      if (acolor.length === 3) {
        acolor = [acolor[0], acolor[1], acolor[2], 1]
      }
      if (bcolor.length === 3) {
        bcolor = [bcolor[0], bcolor[1], bcolor[2], 1]
      }

      if(!this.hasAlpha && acolor[3] < 1) this.hasAlpha = true

      var w0
      if (Array.isArray(lineWidth)) {
        w0 = (lineWidth.length > i - 1) ? lineWidth[i - 1] :                // using index value
             (lineWidth.length > 0)     ? lineWidth[lineWidth.length - 1] : // using last item
                                          [0, 0, 0, 1];                     // using black
      } else {
        w0 = lineWidth
      }

      var t0 = arcLength
      arcLength += distance(a, b)

      if (hadGap) {
        for (j = 0; j < 2; ++j) {
          buffer.push(
            a[0], a[1], a[2], b[0], b[1], b[2], t0, w0, acolor[0], acolor[1], acolor[2], acolor[3])
        }
        vertexCount += 2
        hadGap = false
      }

      buffer.push(
        a[0], a[1], a[2], b[0], b[1], b[2], t0, w0, acolor[0], acolor[1], acolor[2], acolor[3],
        a[0], a[1], a[2], b[0], b[1], b[2], t0, -w0, acolor[0], acolor[1], acolor[2], acolor[3],
        b[0], b[1], b[2], a[0], a[1], a[2], arcLength, -w0, bcolor[0], bcolor[1], bcolor[2], bcolor[3],
        b[0], b[1], b[2], a[0], a[1], a[2], arcLength, w0, bcolor[0], bcolor[1], bcolor[2], bcolor[3])

      vertexCount += 4
    }
  }
  this.buffer.update(buffer)

  arcLengthArray.push(arcLength)
  pointArray.push(positions[positions.length - 1].slice())

  this.bounds = bounds

  this.vertexCount = vertexCount

  this.points = pointArray
  this.arcLength = arcLengthArray

  if ('dashes' in options) {
    var dashArray = options.dashes

    // Calculate prefix sum
    var prefixSum = dashArray.slice()
    prefixSum.unshift(0)
    for (i = 1; i < prefixSum.length; ++i) {
      prefixSum[i] = prefixSum[i - 1] + prefixSum[i]
    }

    var dashTexture = ndarray(new Array(256 * 4), [256, 1, 4])
    for (i = 0; i < 256; ++i) {
      for (j = 0; j < 4; ++j) {
        dashTexture.set(i, 0, j, 0)
      }
      if (bsearch.le(prefixSum, prefixSum[prefixSum.length - 1] * i / 255.0) & 1) {
        dashTexture.set(i, 0, 0, 0)
      } else {
        dashTexture.set(i, 0, 0, 255)
      }
    }

    this.texture.setPixels(dashTexture)
  }
}

proto.dispose = function () {
  this.shader.dispose()
  this.vao.dispose()
  this.buffer.dispose()
}

proto.pick = function (selection) {
  if (!selection) {
    return null
  }
  if (selection.id !== this.pickId) {
    return null
  }
  var tau = unpackFloat(
    selection.value[0],
    selection.value[1],
    selection.value[2],
    0)
  var index = bsearch.le(this.arcLength, tau)
  if (index < 0) {
    return null
  }
  if (index === this.arcLength.length - 1) {
    return new PickResult(
      this.arcLength[this.arcLength.length - 1],
      this.points[this.points.length - 1].slice(),
      index)
  }
  var a = this.points[index]
  var b = this.points[Math.min(index + 1, this.points.length - 1)]
  var t = (tau - this.arcLength[index]) / (this.arcLength[index + 1] - this.arcLength[index])
  var ti = 1.0 - t
  var x = [0, 0, 0]
  for (var i = 0; i < 3; ++i) {
    x[i] = ti * a[i] + t * b[i]
  }
  var dataIndex = Math.min((t < 0.5) ? index : (index + 1), this.points.length - 1)
  return new PickResult(
    tau,
    x,
    dataIndex,
    this.points[dataIndex])
}

function createLinePlot (options) {
  var gl = options.gl || (options.scene && options.scene.gl)

  var shader = createShader(gl)
  shader.attributes.position.location = 0
  shader.attributes.nextPosition.location = 1
  shader.attributes.arcLength.location = 2
  shader.attributes.lineWidth.location = 3
  shader.attributes.color.location = 4

  var pickShader = createPickShader(gl)
  pickShader.attributes.position.location = 0
  pickShader.attributes.nextPosition.location = 1
  pickShader.attributes.arcLength.location = 2
  pickShader.attributes.lineWidth.location = 3
  pickShader.attributes.color.location = 4

  var buffer = createBuffer(gl)
  var vao = createVAO(gl, [
    {
      'buffer': buffer,
      'size': 3,
      'offset': 0,
      'stride': 48
    },
    {
      'buffer': buffer,
      'size': 3,
      'offset': 12,
      'stride': 48
    },
    {
      'buffer': buffer,
      'size': 1,
      'offset': 24,
      'stride': 48
    },
    {
      'buffer': buffer,
      'size': 1,
      'offset': 28,
      'stride': 48
    },
    {
      'buffer': buffer,
      'size': 4,
      'offset': 32,
      'stride': 48
    }
  ])

  // Create texture for dash pattern
  var defaultTexture = ndarray(new Array(256 * 4), [256, 1, 4])
  for (var i = 0; i < 256 * 4; ++i) {
    defaultTexture.data[i] = 255
  }
  var texture = createTexture(gl, defaultTexture)
  texture.wrap = gl.REPEAT

  var linePlot = new LinePlot(gl, shader, pickShader, buffer, vao, texture)
  linePlot.update(options)
  return linePlot
}


/***/ }),

/***/ "./node_modules/gl-scatter3d/lib/get-simple-string.js":
/*!************************************************************!*\
  !*** ./node_modules/gl-scatter3d/lib/get-simple-string.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function(a){
  return (!a && a !== 0) ? '' : a.toString();
}


/***/ }),

/***/ "./node_modules/gl-scatter3d/lib/glyphs.js":
/*!*************************************************!*\
  !*** ./node_modules/gl-scatter3d/lib/glyphs.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var vectorizeText = __webpack_require__(/*! vectorize-text */ "./node_modules/vectorize-text/index.js")

module.exports = getGlyph

var GLYPH_CACHE = {}

function getGlyph(symbol, font, pixelRatio) {
  var fontCache = GLYPH_CACHE[font]
  if(!fontCache) {
    fontCache = GLYPH_CACHE[font] = {}
  }
  if(symbol in fontCache) {
    return fontCache[symbol]
  }

  var config = {
    textAlign: "center",
    textBaseline: "middle",
    lineHeight: 1.0,
    font: font,
    lineSpacing: 1.25,
    styletags: {
      breaklines:true,
      bolds: true,
      italics: true,
      subscripts:true,
      superscripts:true
    }
  }

  //Get line and triangle meshes for glyph
  config.triangles = true
  var triSymbol = vectorizeText(symbol, config)
  config.triangles = false
  var lineSymbol = vectorizeText(symbol, config)

  var i, j

  if(pixelRatio && pixelRatio !== 1) {
    for(i = 0; i < triSymbol.positions.length; ++i){
      for(j = 0; j < triSymbol.positions[i].length; ++j){
        triSymbol.positions[i][j] /= pixelRatio;
      }
    }

    for(i = 0; i < lineSymbol.positions.length; ++i){
      for(j = 0; j < lineSymbol.positions[i].length; ++j){
        lineSymbol.positions[i][j] /= pixelRatio;
      }
    }
  }

  //Calculate bounding box
  var bounds = [[Infinity,Infinity], [-Infinity,-Infinity]]
  var n = lineSymbol.positions.length
  for(i = 0; i < n; ++i) {
    var p = lineSymbol.positions[i]
    for(j=0; j<2; ++j) {
      bounds[0][j] = Math.min(bounds[0][j], p[j])
      bounds[1][j] = Math.max(bounds[1][j], p[j])
    }
  }

  //Save cached symbol
  return fontCache[symbol] = [triSymbol, lineSymbol, bounds]
}

/***/ }),

/***/ "./node_modules/gl-scatter3d/lib/shaders.js":
/*!**************************************************!*\
  !*** ./node_modules/gl-scatter3d/lib/shaders.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var createShaderWrapper = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")

var perspectiveVertSrc = glslify('./perspective.glsl')
var orthographicVertSrc = glslify('./orthographic.glsl')
var projectionVertSrc = glslify('./projection.glsl')
var drawFragSrc = glslify('./draw-fragment.glsl')
var pickFragSrc = glslify('./pick-fragment.glsl')

var ATTRIBUTES = [
  {name: 'position', type: 'vec3'},
  {name: 'color', type: 'vec4'},
  {name: 'glyph', type: 'vec2'},
  {name: 'id', type: 'vec4'}
]

var perspective = {
    vertex: perspectiveVertSrc,
    fragment: drawFragSrc,
    attributes: ATTRIBUTES
  },
  ortho = {
    vertex: orthographicVertSrc,
    fragment: drawFragSrc,
    attributes: ATTRIBUTES
  },
  project = {
    vertex: projectionVertSrc,
    fragment: drawFragSrc,
    attributes: ATTRIBUTES
  },
  pickPerspective = {
    vertex: perspectiveVertSrc,
    fragment: pickFragSrc,
    attributes: ATTRIBUTES
  },
  pickOrtho = {
    vertex: orthographicVertSrc,
    fragment: pickFragSrc,
    attributes: ATTRIBUTES
  },
  pickProject = {
    vertex: projectionVertSrc,
    fragment: pickFragSrc,
    attributes: ATTRIBUTES
  }

function createShader(gl, src) {
  var shader = createShaderWrapper(gl, src)
  var attr = shader.attributes
  attr.position.location = 0
  attr.color.location = 1
  attr.glyph.location = 2
  attr.id.location = 3
  return shader
}

exports.createPerspective = function(gl) {
  return createShader(gl, perspective)
}
exports.createOrtho = function(gl) {
  return createShader(gl, ortho)
}
exports.createProject = function(gl) {
  return createShader(gl, project)
}
exports.createPickPerspective = function(gl) {
  return createShader(gl, pickPerspective)
}
exports.createPickOrtho = function(gl) {
  return createShader(gl, pickOrtho)
}
exports.createPickProject = function(gl) {
  return createShader(gl, pickProject)
}


/***/ }),

/***/ "./node_modules/gl-scatter3d/pointcloud.js":
/*!*************************************************!*\
  !*** ./node_modules/gl-scatter3d/pointcloud.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAllBlank      = __webpack_require__(/*! is-string-blank */ "./node_modules/is-string-blank/index.js")
var createBuffer    = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO       = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var pool            = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var mat4mult        = __webpack_require__(/*! gl-mat4/multiply */ "./node_modules/gl-mat4/multiply.js")
var shaders         = __webpack_require__(/*! ./lib/shaders */ "./node_modules/gl-scatter3d/lib/shaders.js")
var getGlyph        = __webpack_require__(/*! ./lib/glyphs */ "./node_modules/gl-scatter3d/lib/glyphs.js")
var getSimpleString = __webpack_require__(/*! ./lib/get-simple-string */ "./node_modules/gl-scatter3d/lib/get-simple-string.js")

var IDENTITY = [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]

module.exports = createPointCloud

function transformMat4(x, m) {
  var x0 = x[0]
  var x1 = x[1]
  var x2 = x[2]
  var x3 = x[3]
  x[0] = m[0] * x0 + m[4] * x1 + m[8]  * x2 + m[12] * x3
  x[1] = m[1] * x0 + m[5] * x1 + m[9]  * x2 + m[13] * x3
  x[2] = m[2] * x0 + m[6] * x1 + m[10] * x2 + m[14] * x3
  x[3] = m[3] * x0 + m[7] * x1 + m[11] * x2 + m[15] * x3
  return x
}

function project(p, v, m, x) {
  transformMat4(x, x, m)
  transformMat4(x, x, v)
  return transformMat4(x, x, p)
}

function ScatterPlotPickResult(index, position) {
  this.index = index
  this.dataCoordinate = this.position = position
}

function fixOpacity(a) {
  if(a === true) return 1
  if(a > 1) return 1
  return a
}

function PointCloud(
  gl,
  shader,
  orthoShader,
  projectShader,
  pointBuffer,
  colorBuffer,
  glyphBuffer,
  idBuffer,
  vao,
  pickPerspectiveShader,
  pickOrthoShader,
  pickProjectShader) {

  this.gl              = gl

  this.pixelRatio      = 1

  this.shader          = shader
  this.orthoShader     = orthoShader
  this.projectShader   = projectShader

  this.pointBuffer     = pointBuffer
  this.colorBuffer     = colorBuffer
  this.glyphBuffer     = glyphBuffer
  this.idBuffer        = idBuffer
  this.vao             = vao
  this.vertexCount     = 0
  this.lineVertexCount = 0

  this.opacity         = 1
  this.hasAlpha        = false

  this.lineWidth       = 0
  this.projectScale    = [2.0/3.0, 2.0/3.0, 2.0/3.0]
  this.projectOpacity  = [1, 1, 1]
  this.projectHasAlpha  = false

  this.pickId                = 0
  this.pickPerspectiveShader = pickPerspectiveShader
  this.pickOrthoShader       = pickOrthoShader
  this.pickProjectShader     = pickProjectShader
  this.points                = []

  this._selectResult = new ScatterPlotPickResult(0, [0,0,0])

  this.useOrtho = true
  this.bounds   = [[ Infinity,Infinity,Infinity],
                   [-Infinity,-Infinity,-Infinity]]

  //Axes projections
  this.axesProject = [ true, true, true ]
  this.axesBounds = [[-Infinity,-Infinity,-Infinity],
                     [ Infinity, Infinity, Infinity]]

  this.highlightId    = [1,1,1,1]
  this.highlightScale = 2

  this.clipBounds = [[-Infinity,-Infinity,-Infinity],
                     [ Infinity, Infinity, Infinity]]

  this.dirty = true
}

var proto = PointCloud.prototype

proto.pickSlots = 1

proto.setPickBase = function(pickBase) {
  this.pickId = pickBase
}

proto.isTransparent = function() {
  if(this.hasAlpha)  {
    return true
  }
  for(var i=0; i<3; ++i) {
    if(this.axesProject[i] && this.projectHasAlpha) {
      return true
    }
  }
  return false
}

proto.isOpaque = function() {
  if(!this.hasAlpha)  {
    return true
  }
  for(var i=0; i<3; ++i) {
    if(this.axesProject[i] && !this.projectHasAlpha) {
      return true
    }
  }
  return false
}

var VIEW_SHAPE = [0,0]
var U_VEC = [0,0,0]
var V_VEC = [0,0,0]
var MU_VEC = [0,0,0,1]
var MV_VEC = [0,0,0,1]
var SCRATCH_MATRIX = IDENTITY.slice()
var SCRATCH_VEC = [0,0,0]
var CLIP_BOUNDS = [[0,0,0], [0,0,0]]

function zeroVec(a) {
  a[0] = a[1] = a[2] = 0
  return a
}

function augment(hg, af) {
  hg[0] = af[0]
  hg[1] = af[1]
  hg[2] = af[2]
  hg[3] = 1
  return hg
}

function setComponent(out, v, i, x) {
  out[0] = v[0]
  out[1] = v[1]
  out[2] = v[2]
  out[i] = x
  return out
}

function getClipBounds(bounds) {
  var result = CLIP_BOUNDS
  for(var i=0; i<2; ++i) {
    for(var j=0; j<3; ++j) {
      result[i][j] = Math.max(Math.min(bounds[i][j], 1e8), -1e8)
    }
  }
  return result
}

function drawProject(shader, points, camera, pixelRatio) {
  var axesProject = points.axesProject

  var gl         = points.gl
  var uniforms   = shader.uniforms
  var model      = camera.model      || IDENTITY
  var view       = camera.view       || IDENTITY
  var projection = camera.projection || IDENTITY
  var bounds     = points.axesBounds
  var clipBounds = getClipBounds(points.clipBounds)

  var cubeAxis
  if(points.axes && points.axes.lastCubeProps) {
    cubeAxis = points.axes.lastCubeProps.axis
  } else {
    cubeAxis = [1,1,1]
  }

  VIEW_SHAPE[0] = 2.0/gl.drawingBufferWidth
  VIEW_SHAPE[1] = 2.0/gl.drawingBufferHeight

  shader.bind()
  uniforms.view           = view
  uniforms.projection     = projection
  uniforms.screenSize     = VIEW_SHAPE
  uniforms.highlightId    = points.highlightId
  uniforms.highlightScale = points.highlightScale
  uniforms.clipBounds     = clipBounds
  uniforms.pickGroup      = points.pickId / 255.0
  uniforms.pixelRatio     = pixelRatio

  for(var i=0; i<3; ++i) {
    if(!axesProject[i]) {
      continue
    }

    uniforms.scale          = points.projectScale[i]
    uniforms.opacity        = points.projectOpacity[i]

    //Project model matrix
    var pmodel = SCRATCH_MATRIX
    for(var j=0; j<16; ++j) {
      pmodel[j] = 0
    }
    for(var j=0; j<4; ++j) {
      pmodel[5*j] = 1
    }
    pmodel[5*i] = 0
    if(cubeAxis[i] < 0) {
      pmodel[12+i] = bounds[0][i]
    } else {
      pmodel[12+i] = bounds[1][i]
    }
    mat4mult(pmodel, model, pmodel)
    uniforms.model = pmodel

    //Compute initial axes
    var u = (i+1)%3
    var v = (i+2)%3
    var du = zeroVec(U_VEC)
    var dv = zeroVec(V_VEC)
    du[u] = 1
    dv[v] = 1

    //Align orientation relative to viewer
    var mdu = project(projection, view, model, augment(MU_VEC, du))
    var mdv = project(projection, view, model, augment(MV_VEC, dv))
    if(Math.abs(mdu[1]) > Math.abs(mdv[1])) {
      var tmp = mdu
      mdu = mdv
      mdv = tmp
      tmp = du
      du = dv
      dv = tmp
      var t = u
      u = v
      v = t
    }
    if(mdu[0] < 0) {
      du[u] = -1
    }
    if(mdv[1] > 0) {
      dv[v] = -1
    }
    var su = 0.0
    var sv = 0.0
    for(var j=0; j<4; ++j) {
      su += Math.pow(model[4*u+j], 2)
      sv += Math.pow(model[4*v+j], 2)
    }
    du[u] /= Math.sqrt(su)
    dv[v] /= Math.sqrt(sv)
    uniforms.axes[0] = du
    uniforms.axes[1] = dv

    //Update fragment clip bounds
    uniforms.fragClipBounds[0] = setComponent(SCRATCH_VEC, clipBounds[0], i, -1e8)
    uniforms.fragClipBounds[1] = setComponent(SCRATCH_VEC, clipBounds[1], i, 1e8)

    points.vao.bind()

    //Draw interior
    points.vao.draw(gl.TRIANGLES, points.vertexCount)

    //Draw edges
    if(points.lineWidth > 0) {
      gl.lineWidth(points.lineWidth * pixelRatio)
      points.vao.draw(gl.LINES, points.lineVertexCount, points.vertexCount)
    }

    points.vao.unbind()
  }
}


var NEG_INFINITY3 = [-1e8, -1e8, -1e8]
var POS_INFINITY3 = [1e8, 1e8, 1e8]
var CLIP_GROUP    = [NEG_INFINITY3, POS_INFINITY3]

function drawFull(shader, pshader, points, camera, pixelRatio, transparent, forceDraw) {
  var gl = points.gl

  if(transparent === points.projectHasAlpha || forceDraw) {
    drawProject(pshader, points, camera, pixelRatio)
  }

  if(transparent === points.hasAlpha || forceDraw) {

    shader.bind()
    var uniforms = shader.uniforms

    uniforms.model      = camera.model      || IDENTITY
    uniforms.view       = camera.view       || IDENTITY
    uniforms.projection = camera.projection || IDENTITY

    VIEW_SHAPE[0]       = 2.0/gl.drawingBufferWidth
    VIEW_SHAPE[1]       = 2.0/gl.drawingBufferHeight
    uniforms.screenSize = VIEW_SHAPE

    uniforms.highlightId    = points.highlightId
    uniforms.highlightScale = points.highlightScale

    uniforms.fragClipBounds = CLIP_GROUP
    uniforms.clipBounds     = points.axes.bounds

    uniforms.opacity    = points.opacity
    uniforms.pickGroup  = points.pickId / 255.0

    uniforms.pixelRatio = pixelRatio

    points.vao.bind()

    //Draw interior
    points.vao.draw(gl.TRIANGLES, points.vertexCount)

    //Draw edges
    if(points.lineWidth > 0) {
      gl.lineWidth(points.lineWidth * pixelRatio)
      points.vao.draw(gl.LINES, points.lineVertexCount, points.vertexCount)
    }

    points.vao.unbind()
  }


}

proto.draw = function(camera) {
  var shader = this.useOrtho ? this.orthoShader : this.shader
  drawFull(shader, this.projectShader, this, camera, this.pixelRatio, false, false)
}

proto.drawTransparent = function(camera) {
  var shader = this.useOrtho ? this.orthoShader : this.shader
  drawFull(shader, this.projectShader, this, camera, this.pixelRatio, true, false)
}

proto.drawPick = function(camera) {
  var shader = this.useOrtho ? this.pickOrthoShader : this.pickPerspectiveShader
  drawFull(shader, this.pickProjectShader, this, camera, 1, true, true)
}

proto.pick = function(selected) {
  if(!selected) {
    return null
  }
  if(selected.id !== this.pickId) {
    return null
  }
  var x = selected.value[2] + (selected.value[1]<<8) + (selected.value[0]<<16)
  if(x >= this.pointCount || x < 0) {
    return null
  }

  //Unpack result
  var coord = this.points[x]
  var result = this._selectResult
  result.index = x
  for(var i=0; i<3; ++i) {
    result.position[i] = result.dataCoordinate[i] = coord[i]
  }
  return result
}

proto.highlight = function(selection) {
  if(!selection) {
    this.highlightId = [1,1,1,1]
  } else {
    var pointId = selection.index
    var a0 =  pointId     &0xff
    var a1 = (pointId>>8) &0xff
    var a2 = (pointId>>16)&0xff
    this.highlightId = [a0/255.0, a1/255.0, a2/255.0, 0]
  }
}

function get_glyphData(glyphs, index, font, pixelRatio) {
  var str

  // use the data if presented in an array
  if(Array.isArray(glyphs)) {
    if(index < glyphs.length) {
      str = glyphs[index]
    } else {
      str = undefined
    }
  } else {
    str = glyphs
  }

  str = getSimpleString(str) // this would handle undefined cases

  var visible = true
  if(isAllBlank(str)) {
    str = '▼' // Note: this special character may have minimum number of surfaces
    visible = false
  }

  var glyph = getGlyph(str, font, pixelRatio)

  return { mesh:glyph[0],
          lines:glyph[1],
         bounds:glyph[2],
        visible:visible };
}



proto.update = function(options) {

  options = options || {}

  if('perspective' in options) {
    this.useOrtho = !options.perspective
  }
  if('orthographic' in options) {
    this.useOrtho = !!options.orthographic
  }
  if('lineWidth' in options) {
    this.lineWidth = options.lineWidth
  }
  if('project' in options) {
    if(Array.isArray(options.project)) {
      this.axesProject = options.project
    } else {
      var v = !!options.project
      this.axesProject = [v,v,v]
    }
  }
  if('projectScale' in options) {
    if(Array.isArray(options.projectScale)) {
      this.projectScale = options.projectScale.slice()
    } else {
      var s = +options.projectScale
      this.projectScale = [s,s,s]
    }
  }

  this.projectHasAlpha = false // default to no transparent draw
  if('projectOpacity' in options) {
    if(Array.isArray(options.projectOpacity)) {
      this.projectOpacity = options.projectOpacity.slice()
    } else {
      var s = +options.projectOpacity
      this.projectOpacity = [s,s,s]
    }
    for(var i=0; i<3; ++i) {
      this.projectOpacity[i] = fixOpacity(this.projectOpacity[i]);
      if(this.projectOpacity[i] < 1) {
        this.projectHasAlpha = true;
      }
    }
  }

  this.hasAlpha = false // default to no transparent draw
  if('opacity' in options) {
    this.opacity = fixOpacity(options.opacity)
    if(this.opacity < 1) {
      this.hasAlpha = true;
    }
  }

  //Set dirty flag
  this.dirty = true

  //Create new buffers
  var points = options.position

  //Text font
  var font      = options.font      || 'normal'
  var alignment = options.alignment || [0,0]

  var alignmentX;
  var alignmentY;
  if (alignment.length === 2) {
    alignmentX = alignment[0]
    alignmentY = alignment[1]
  } else {
    alignmentX = []
    alignmentY = []
    for (var i = 0; i < alignment.length; ++i) {
      alignmentX[i] = alignment[i][0]
      alignmentY[i] = alignment[i][1]
    }
  }

  //Bounds
  var lowerBound = [ Infinity, Infinity, Infinity]
  var upperBound = [-Infinity,-Infinity,-Infinity]

  //Unpack options
  var glyphs     = options.glyph
  var colors     = options.color
  var sizes      = options.size
  var angles     = options.angle
  var lineColors = options.lineColor

  //Picking geometry
  var pickCounter = -1

  //First do pass to compute buffer sizes
  var triVertexCount  = 0
  var lineVertexCount = 0

  var numPoints = 0;

  if(points.length) {

    //Count number of points and buffer size
    numPoints = points.length

  count_loop:
    for(var i=0; i<numPoints; ++i) {
      var x = points[i]
      for(var j=0; j<3; ++j) {
        if(isNaN(x[j]) || !isFinite(x[j])) {
          continue count_loop
        }
      }

      var glyphData = get_glyphData(glyphs, i, font, this.pixelRatio)

      var glyphMesh   = glyphData.mesh
      var glyphLines  = glyphData.lines
      var glyphBounds = glyphData.bounds

      triVertexCount  += glyphMesh.cells.length * 3
      lineVertexCount += glyphLines.edges.length * 2
    }
  }

  var vertexCount   = triVertexCount + lineVertexCount

  //Preallocate data
  var positionArray = pool.mallocFloat(3*vertexCount)
  var colorArray    = pool.mallocFloat(4*vertexCount)
  var glyphArray    = pool.mallocFloat(2*vertexCount)
  var idArray       = pool.mallocUint32(vertexCount)

  if(vertexCount > 0) {
    var triOffset  = 0
    var lineOffset = triVertexCount
    var color      = [0,0,0,1]
    var lineColor  = [0,0,0,1]

    var isColorArray      = Array.isArray(colors)     && Array.isArray(colors[0])
    var isLineColorArray  = Array.isArray(lineColors) && Array.isArray(lineColors[0])

  fill_loop:
    for(var i=0; i<numPoints; ++i) {
      //Increment pickCounter
      pickCounter += 1

      var x = points[i]
      for(var j=0; j<3; ++j) {
        if(isNaN(x[j]) || !isFinite(x[j])) {
          continue fill_loop
        }

        upperBound[j] = Math.max(upperBound[j], x[j])
        lowerBound[j] = Math.min(lowerBound[j], x[j])
      }

      var glyphData = get_glyphData(glyphs, i, font, this.pixelRatio)

      var glyphMesh   = glyphData.mesh
      var glyphLines  = glyphData.lines
      var glyphBounds = glyphData.bounds
      var glyphVisible = glyphData.visible

      //Get color
      if(!glyphVisible) color = [1,1,1,0]
      else if(Array.isArray(colors)) {
        var c
        if(isColorArray) {
          if(i < colors.length) {
            c = colors[i]
          } else {
            c = [0,0,0,0]
          }
        } else {
          c = colors
        }

        if(c.length === 3) {
          for(var j=0; j<3; ++j) {
            color[j] = c[j]
          }
          color[3] = 1
        } else if(c.length === 4) {
          for(var j=0; j<4; ++j) {
            color[j] = c[j]
          }
          if(!this.hasAlpha && c[3] < 1) this.hasAlpha = true
        }
      } else {
        color[0] = color[1] = color[2] = 0
        color[3] = 1
      }


      //Get lineColor
      if(!glyphVisible) lineColor = [1,1,1,0]
      else if(Array.isArray(lineColors)) {
        var c
        if(isLineColorArray) {
          if(i < lineColors.length) {
            c = lineColors[i]
          } else {
            c = [0,0,0,0]
          }
        } else {
          c = lineColors
        }

        if(c.length === 3) {
          for(var j=0; j<3; ++j) {
            lineColor[j] = c[j]
          }
          lineColor[j] = 1
        } else if(c.length === 4) {
          for(var j=0; j<4; ++j) {
            lineColor[j] = c[j]
          }
          if(!this.hasAlpha && c[3] < 1) this.hasAlpha = true
        }
      } else {
        lineColor[0] = lineColor[1] = lineColor[2] = 0
        lineColor[3] = 1
      }


      var size = 0.5
      if(!glyphVisible) size = 0.0
      else if(Array.isArray(sizes)) {
        if(i < sizes.length) {
          size = +sizes[i]
        } else {
          size = 12
        }
      } else if(sizes) {
        size = +sizes
      } else if(this.useOrtho) {
        size = 12
      }


      var angle = 0
      if(Array.isArray(angles)) {
        if(i < angles.length) {
          angle = +angles[i]
        } else {
          angle = 0
        }
      } else if(angles) {
        angle = +angles
      }

      //Loop through markers and append to buffers
      var cos = Math.cos(angle)
      var sin = Math.sin(angle)

      var x = points[i]
      for(var j=0; j<3; ++j) {
        upperBound[j] = Math.max(upperBound[j], x[j])
        lowerBound[j] = Math.min(lowerBound[j], x[j])
      }

      //Calculate text offset
      var textOffsetX = alignmentX
      var textOffsetY = alignmentY

      var textOffsetX = 0
      if(Array.isArray(alignmentX)) {
        if(i < alignmentX.length) {
          textOffsetX = alignmentX[i]
        } else {
          textOffsetX = 0
        }
      } else if(alignmentX) {
        textOffsetX = alignmentX
      }

      var textOffsetY = 0
      if(Array.isArray(alignmentY)) {
        if(i < alignmentY.length) {
          textOffsetY = alignmentY[i]
        } else {
          textOffsetY = 0
        }
      } else if(alignmentY) {
        textOffsetY = alignmentY
      }

      textOffsetX *= (textOffsetX > 0) ? (1 - glyphBounds[0][0]) :
                     (textOffsetX < 0) ? (1 + glyphBounds[1][0]) : 1;

      textOffsetY *= (textOffsetY > 0) ? (1 - glyphBounds[0][1]) :
                     (textOffsetY < 0) ? (1 + glyphBounds[1][1]) : 1;

      var textOffset = [textOffsetX, textOffsetY]

      //Write out inner marker
      var cells = glyphMesh.cells || []
      var verts = glyphMesh.positions || []

      for(var j=0; j<cells.length; ++j) {
        var cell = cells[j]
        for(var k=0; k<3; ++k) {
          for(var l=0; l<3; ++l) {
            positionArray[3*triOffset+l] = x[l]
          }
          for(var l=0; l<4; ++l) {
            colorArray[4*triOffset+l] = color[l]
          }
          idArray[triOffset] = pickCounter
          var p = verts[cell[k]]
          glyphArray[2*triOffset]   = size * (cos*p[0] - sin*p[1] + textOffset[0])
          glyphArray[2*triOffset+1] = size * (sin*p[0] + cos*p[1] + textOffset[1])
          triOffset += 1
        }
      }

      var cells = glyphLines.edges
      var verts = glyphLines.positions

      for(var j=0; j<cells.length; ++j) {
        var cell = cells[j]
        for(var k=0; k<2; ++k) {
          for(var l=0; l<3; ++l) {
            positionArray[3*lineOffset+l] = x[l]
          }
          for(var l=0; l<4; ++l) {
            colorArray[4*lineOffset+l] = lineColor[l]
          }
          idArray[lineOffset] = pickCounter
          var p = verts[cell[k]]
          glyphArray[2*lineOffset]   = size * (cos*p[0] - sin*p[1] + textOffset[0])
          glyphArray[2*lineOffset+1] = size * (sin*p[0] + cos*p[1] + textOffset[1])
          lineOffset += 1
        }
      }

    }



  }

  //Update bounds
  this.bounds = [lowerBound, upperBound]

  //Save points
  this.points = points

  //Save number of points
  this.pointCount = points.length

  //Update vertex counts
  this.vertexCount      = triVertexCount
  this.lineVertexCount  = lineVertexCount

  this.pointBuffer.update(positionArray)
  this.colorBuffer.update(colorArray)
  this.glyphBuffer.update(glyphArray)
  //this.idBuffer.update(new Uint32Array(idArray))
  this.idBuffer.update(idArray)

  pool.free(positionArray)
  pool.free(colorArray)
  pool.free(glyphArray)
  pool.free(idArray)
}

proto.dispose = function() {
  //Shaders
  this.shader.dispose()
  this.orthoShader.dispose()
  this.pickPerspectiveShader.dispose()
  this.pickOrthoShader.dispose()

  //Vertex array
  this.vao.dispose()

  //Buffers
  this.pointBuffer.dispose()
  this.colorBuffer.dispose()
  this.glyphBuffer.dispose()
  this.idBuffer.dispose()
}

function createPointCloud(options) {
  var gl = options.gl

  var shader                = shaders.createPerspective(gl)
  var orthoShader           = shaders.createOrtho(gl)
  var projectShader         = shaders.createProject(gl)
  var pickPerspectiveShader = shaders.createPickPerspective(gl)
  var pickOrthoShader       = shaders.createPickOrtho(gl)
  var pickProjectShader     = shaders.createPickProject(gl)

  var pointBuffer = createBuffer(gl)
  var colorBuffer = createBuffer(gl)
  var glyphBuffer = createBuffer(gl)
  var idBuffer    = createBuffer(gl)
  var vao = createVAO(gl, [
    {
      buffer: pointBuffer,
      size: 3,
      type: gl.FLOAT
    },
    {
      buffer: colorBuffer,
      size: 4,
      type: gl.FLOAT
    },
    {
      buffer: glyphBuffer,
      size: 2,
      type: gl.FLOAT
    },
    {
      buffer: idBuffer,
      size: 4,
      type: gl.UNSIGNED_BYTE,
      normalized: true
    }
  ])

  var pointCloud = new PointCloud(
    gl,
    shader,
    orthoShader,
    projectShader,
    pointBuffer,
    colorBuffer,
    glyphBuffer,
    idBuffer,
    vao,
    pickPerspectiveShader,
    pickOrthoShader,
    pickProjectShader)

  pointCloud.update(options)

  return pointCloud
}


/***/ }),

/***/ "./node_modules/plotly.js/lib/scatter3d.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/scatter3d.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/scatter3d */ "./node_modules/plotly.js/src/traces/scatter3d/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/constants/gl3d_dashes.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/constants/gl3d_dashes.js ***!
  \*************************************************************/
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
    solid: [[], 0],
    dot: [[0.5, 1], 200],
    dash: [[0.5, 1], 50],
    longdash: [[0.5, 1], 10],
    dashdot: [[0.5, 0.625, 0.875, 1], 50],
    longdashdot: [[0.5, 0.7, 0.8, 1], 10]
};


/***/ }),

/***/ "./node_modules/plotly.js/src/constants/gl3d_markers.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/constants/gl3d_markers.js ***!
  \**************************************************************/
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
    circle: '●',
    'circle-open': '○',
    square: '■',
    'square-open': '□',
    diamond: '◆',
    'diamond-open': '◇',
    cross: '+',
    x: '❌'
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter3d/attributes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter3d/attributes.js ***!
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



var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var colorAttributes = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var DASHES = __webpack_require__(/*! ../../constants/gl3d_dashes */ "./node_modules/plotly.js/src/constants/gl3d_dashes.js");

var MARKER_SYMBOLS = __webpack_require__(/*! ../../constants/gl3d_markers */ "./node_modules/plotly.js/src/constants/gl3d_markers.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var scatterLineAttrs = scatterAttrs.line;
var scatterMarkerAttrs = scatterAttrs.marker;
var scatterMarkerLineAttrs = scatterMarkerAttrs.line;

var lineAttrs = extendFlat({
    width: scatterLineAttrs.width,
    dash: {
        valType: 'enumerated',
        values: Object.keys(DASHES),
        dflt: 'solid',
        role: 'style',
        description: 'Sets the dash style of the lines.'
    }
}, colorAttributes('line'));

function makeProjectionAttr(axLetter) {
    return {
        show: {
            valType: 'boolean',
            role: 'info',
            dflt: false,
            description: [
                'Sets whether or not projections are shown along the',
                axLetter, 'axis.'
            ].join(' ')
        },
        opacity: {
            valType: 'number',
            role: 'style',
            min: 0,
            max: 1,
            dflt: 1,
            description: 'Sets the projection color.'
        },
        scale: {
            valType: 'number',
            role: 'style',
            min: 0,
            max: 10,
            dflt: 2 / 3,
            description: [
                'Sets the scale factor determining the size of the',
                'projection marker points.'
            ].join(' ')
        }
    };
}

var attrs = module.exports = overrideAll({
    x: scatterAttrs.x,
    y: scatterAttrs.y,
    z: {
        valType: 'data_array',
        description: 'Sets the z coordinates.'
    },

    text: extendFlat({}, scatterAttrs.text, {
        description: [
            'Sets text elements associated with each (x,y,z) triplet.',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (x,y,z) coordinates.',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    }),
    texttemplate: texttemplateAttrs({}, {

    }),
    hovertext: extendFlat({}, scatterAttrs.hovertext, {
        description: [
            'Sets text elements associated with each (x,y,z) triplet.',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (x,y,z) coordinates.',
            'To be seen, trace `hoverinfo` must contain a *text* flag.'
        ].join(' ')
    }),
    hovertemplate: hovertemplateAttrs(),

    mode: extendFlat({}, scatterAttrs.mode,  // shouldn't this be on-par with 2D?
        {dflt: 'lines+markers'}),
    surfaceaxis: {
        valType: 'enumerated',
        role: 'info',
        values: [-1, 0, 1, 2],
        dflt: -1,
        description: [
            'If *-1*, the scatter points are not fill with a surface',
            'If *0*, *1*, *2*, the scatter points are filled with',
            'a Delaunay surface about the x, y, z respectively.'
        ].join(' ')
    },
    surfacecolor: {
        valType: 'color',
        role: 'style',
        description: 'Sets the surface fill color.'
    },
    projection: {
        x: makeProjectionAttr('x'),
        y: makeProjectionAttr('y'),
        z: makeProjectionAttr('z')
    },

    connectgaps: scatterAttrs.connectgaps,
    line: lineAttrs,

    marker: extendFlat({  // Parity with scatter.js?
        symbol: {
            valType: 'enumerated',
            values: Object.keys(MARKER_SYMBOLS),
            role: 'style',
            dflt: 'circle',
            arrayOk: true,
            description: 'Sets the marker symbol type.'
        },
        size: extendFlat({}, scatterMarkerAttrs.size, {dflt: 8}),
        sizeref: scatterMarkerAttrs.sizeref,
        sizemin: scatterMarkerAttrs.sizemin,
        sizemode: scatterMarkerAttrs.sizemode,
        opacity: extendFlat({}, scatterMarkerAttrs.opacity, {
            arrayOk: false,
            description: [
                'Sets the marker opacity.',
                'Note that the marker opacity for scatter3d traces',
                'must be a scalar value for performance reasons.',
                'To set a blending opacity value',
                '(i.e. which is not transparent), set *marker.color*',
                'to an rgba color and use its alpha channel.'
            ].join(' ')
        }),
        colorbar: scatterMarkerAttrs.colorbar,

        line: extendFlat({
            width: extendFlat({}, scatterMarkerLineAttrs.width, {arrayOk: false})
        },
            colorAttributes('marker.line')
        )
    },
        colorAttributes('marker')
    ),

    textposition: extendFlat({}, scatterAttrs.textposition, {dflt: 'top center'}),
    textfont: {
        color: scatterAttrs.textfont.color,
        size: scatterAttrs.textfont.size,
        family: extendFlat({}, scatterAttrs.textfont.family, {arrayOk: false})
    },

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo)
}, 'calc', 'nested');

attrs.x.editType = attrs.y.editType = attrs.z.editType = 'calc+clearAxisTypes';


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


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter3d/calc_errors.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter3d/calc_errors.js ***!
  \********************************************************************/
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

function calculateAxisErrors(data, params, scaleFactor, axis) {
    if(!params || !params.visible) return null;

    var computeError = Registry.getComponentMethod('errorbars', 'makeComputeError')(params);
    var result = new Array(data.length);

    for(var i = 0; i < data.length; i++) {
        var errors = computeError(+data[i], i);

        if(axis.type === 'log') {
            var point = axis.c2l(data[i]);
            var min = data[i] - errors[0];
            var max = data[i] + errors[1];

            result[i] = [
                (axis.c2l(min, true) - point) * scaleFactor,
                (axis.c2l(max, true) - point) * scaleFactor
            ];

            // Keep track of the lower error bound which isn't negative!
            if(min > 0) {
                var lower = axis.c2l(min);
                if(!axis._lowerLogErrorBound) axis._lowerLogErrorBound = lower;
                axis._lowerErrorBound = Math.min(axis._lowerLogErrorBound, lower);
            }
        } else {
            result[i] = [
                -errors[0] * scaleFactor,
                errors[1] * scaleFactor
            ];
        }
    }

    return result;
}

function dataLength(array) {
    for(var i = 0; i < array.length; i++) {
        if(array[i]) return array[i].length;
    }
    return 0;
}

function calculateErrors(data, scaleFactor, sceneLayout) {
    var errors = [
        calculateAxisErrors(data.x, data.error_x, scaleFactor[0], sceneLayout.xaxis),
        calculateAxisErrors(data.y, data.error_y, scaleFactor[1], sceneLayout.yaxis),
        calculateAxisErrors(data.z, data.error_z, scaleFactor[2], sceneLayout.zaxis)
    ];

    var n = dataLength(errors);
    if(n === 0) return null;

    var errorBounds = new Array(n);

    for(var i = 0; i < n; i++) {
        var bound = [[0, 0, 0], [0, 0, 0]];

        for(var j = 0; j < 3; j++) {
            if(errors[j]) {
                for(var k = 0; k < 2; k++) {
                    bound[k][j] = errors[j][i][k];
                }
            }
        }

        errorBounds[i] = bound;
    }

    return errorBounds;
}

module.exports = calculateErrors;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter3d/convert.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter3d/convert.js ***!
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




var createLinePlot = __webpack_require__(/*! gl-line3d */ "./node_modules/gl-line3d/lines.js");
var createScatterPlot = __webpack_require__(/*! gl-scatter3d */ "./node_modules/gl-scatter3d/pointcloud.js");
var createErrorBars = __webpack_require__(/*! gl-error3d */ "./node_modules/gl-error3d/errorbars.js");
var createMesh = __webpack_require__(/*! gl-mesh3d */ "./node_modules/gl-mesh3d/mesh.js");
var triangulate = __webpack_require__(/*! delaunay-triangulate */ "./node_modules/delaunay-triangulate/triangulate.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var str2RgbaArray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");
var formatColor = __webpack_require__(/*! ../../lib/gl_format_color */ "./node_modules/plotly.js/src/lib/gl_format_color.js").formatColor;
var makeBubbleSizeFn = __webpack_require__(/*! ../scatter/make_bubble_size_func */ "./node_modules/plotly.js/src/traces/scatter/make_bubble_size_func.js");
var DASH_PATTERNS = __webpack_require__(/*! ../../constants/gl3d_dashes */ "./node_modules/plotly.js/src/constants/gl3d_dashes.js");
var MARKER_SYMBOLS = __webpack_require__(/*! ../../constants/gl3d_markers */ "./node_modules/plotly.js/src/constants/gl3d_markers.js");

var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var appendArrayPointValue = __webpack_require__(/*! ../../components/fx/helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").appendArrayPointValue;

var calculateError = __webpack_require__(/*! ./calc_errors */ "./node_modules/plotly.js/src/traces/scatter3d/calc_errors.js");

function LineWithMarkers(scene, uid) {
    this.scene = scene;
    this.uid = uid;
    this.linePlot = null;
    this.scatterPlot = null;
    this.errorBars = null;
    this.textMarkers = null;
    this.delaunayMesh = null;
    this.color = null;
    this.mode = '';
    this.dataPoints = [];
    this.axesBounds = [
        [-Infinity, -Infinity, -Infinity],
        [Infinity, Infinity, Infinity]
    ];
    this.textLabels = null;
    this.data = null;
}

var proto = LineWithMarkers.prototype;

proto.handlePick = function(selection) {
    if(selection.object &&
        (selection.object === this.linePlot ||
         selection.object === this.delaunayMesh ||
         selection.object === this.textMarkers ||
         selection.object === this.scatterPlot)
    ) {
        var ind = selection.index = selection.data.index;

        if(selection.object.highlight) {
            selection.object.highlight(null);
        }
        if(this.scatterPlot) {
            selection.object = this.scatterPlot;
            this.scatterPlot.highlight(selection.data);
        }

        selection.textLabel = '';
        if(this.textLabels) {
            if(Array.isArray(this.textLabels)) {
                if(this.textLabels[ind] || this.textLabels[ind] === 0) {
                    selection.textLabel = this.textLabels[ind];
                }
            } else {
                selection.textLabel = this.textLabels;
            }
        }

        selection.traceCoordinate = [
            this.data.x[ind],
            this.data.y[ind],
            this.data.z[ind]
        ];

        return true;
    }
};

function constructDelaunay(points, color, axis) {
    var u = (axis + 1) % 3;
    var v = (axis + 2) % 3;
    var filteredPoints = [];
    var filteredIds = [];
    var i;

    for(i = 0; i < points.length; ++i) {
        var p = points[i];
        if(isNaN(p[u]) || !isFinite(p[u]) ||
           isNaN(p[v]) || !isFinite(p[v])) {
            continue;
        }
        filteredPoints.push([p[u], p[v]]);
        filteredIds.push(i);
    }
    var cells = triangulate(filteredPoints);
    for(i = 0; i < cells.length; ++i) {
        var c = cells[i];
        for(var j = 0; j < c.length; ++j) {
            c[j] = filteredIds[c[j]];
        }
    }
    return {
        positions: points,
        cells: cells,
        meshColor: color
    };
}

function calculateErrorParams(errors) {
    var capSize = [0.0, 0.0, 0.0];
    var color = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    var lineWidth = [1.0, 1.0, 1.0];

    for(var i = 0; i < 3; i++) {
        var e = errors[i];

        if(e && e.copy_zstyle !== false && errors[2].visible !== false) e = errors[2];
        if(!e || !e.visible) continue;

        capSize[i] = e.width / 2;  // ballpark rescaling
        color[i] = str2RgbaArray(e.color);
        lineWidth[i] = e.thickness;
    }

    return {capSize: capSize, color: color, lineWidth: lineWidth};
}

function parseAlignmentX(a) {
    if(a === null || a === undefined) return 0;

    return (a.indexOf('left') > -1) ? -1 :
           (a.indexOf('right') > -1) ? 1 : 0;
}

function parseAlignmentY(a) {
    if(a === null || a === undefined) return 0;

    return (a.indexOf('top') > -1) ? -1 :
           (a.indexOf('bottom') > -1) ? 1 : 0;
}

function calculateTextOffset(tp) {
    // Read out text properties

    var defaultAlignmentX = 0;
    var defaultAlignmentY = 0;

    var textOffset = [
        defaultAlignmentX,
        defaultAlignmentY
    ];

    if(Array.isArray(tp)) {
        for(var i = 0; i < tp.length; i++) {
            textOffset[i] = [
                defaultAlignmentX,
                defaultAlignmentY
            ];
            if(tp[i]) {
                textOffset[i][0] = parseAlignmentX(tp[i]);
                textOffset[i][1] = parseAlignmentY(tp[i]);
            }
        }
    } else {
        textOffset[0] = parseAlignmentX(tp);
        textOffset[1] = parseAlignmentY(tp);
    }

    return textOffset;
}


function calculateSize(sizeIn, sizeFn) {
    // rough parity with Plotly 2D markers
    return sizeFn(sizeIn * 4);
}

function calculateSymbol(symbolIn) {
    return MARKER_SYMBOLS[symbolIn];
}

function formatParam(paramIn, len, calculate, dflt, extraFn) {
    var paramOut = null;

    if(Lib.isArrayOrTypedArray(paramIn)) {
        paramOut = [];

        for(var i = 0; i < len; i++) {
            if(paramIn[i] === undefined) paramOut[i] = dflt;
            else paramOut[i] = calculate(paramIn[i], extraFn);
        }
    } else paramOut = calculate(paramIn, Lib.identity);

    return paramOut;
}


function convertPlotlyOptions(scene, data) {
    var points = [];
    var sceneLayout = scene.fullSceneLayout;
    var scaleFactor = scene.dataScale;
    var xaxis = sceneLayout.xaxis;
    var yaxis = sceneLayout.yaxis;
    var zaxis = sceneLayout.zaxis;
    var marker = data.marker;
    var line = data.line;
    var x = data.x || [];
    var y = data.y || [];
    var z = data.z || [];
    var len = x.length;
    var xcalendar = data.xcalendar;
    var ycalendar = data.ycalendar;
    var zcalendar = data.zcalendar;
    var xc, yc, zc;
    var params, i;
    var text;

    // Convert points
    for(i = 0; i < len; i++) {
        // sanitize numbers and apply transforms based on axes.type
        xc = xaxis.d2l(x[i], 0, xcalendar) * scaleFactor[0];
        yc = yaxis.d2l(y[i], 0, ycalendar) * scaleFactor[1];
        zc = zaxis.d2l(z[i], 0, zcalendar) * scaleFactor[2];

        points[i] = [xc, yc, zc];
    }

    // convert text
    if(Array.isArray(data.text)) text = data.text;
    else if(data.text !== undefined) {
        text = new Array(len);
        for(i = 0; i < len; i++) text[i] = data.text;
    }

    function formatter(axName, val) {
        var ax = sceneLayout[axName];
        return Axes.tickText(ax, ax.d2l(val), true).text;
    }

    // check texttemplate
    var texttemplate = data.texttemplate;
    if(texttemplate) {
        var fullLayout = scene.fullLayout;
        var d3locale = fullLayout._d3locale;
        var isArray = Array.isArray(texttemplate);
        var N = isArray ? Math.min(texttemplate.length, len) : len;
        var txt = isArray ?
            function(i) { return texttemplate[i]; } :
            function() { return texttemplate; };

        text = new Array(N);

        for(i = 0; i < N; i++) {
            var d = {x: x[i], y: y[i], z: z[i]};
            var labels = {
                xLabel: formatter('xaxis', x[i]),
                yLabel: formatter('yaxis', y[i]),
                zLabel: formatter('zaxis', z[i])
            };
            var pointValues = {};
            appendArrayPointValue(pointValues, data, i);
            var meta = data._meta || {};
            text[i] = Lib.texttemplateString(txt(i), labels, d3locale, pointValues, d, meta);
        }
    }

    // Build object parameters
    params = {
        position: points,
        mode: data.mode,
        text: text
    };

    if('line' in data) {
        params.lineColor = formatColor(line, 1, len);
        params.lineWidth = line.width;
        params.lineDashes = line.dash;
    }

    if('marker' in data) {
        var sizeFn = makeBubbleSizeFn(data);

        params.scatterColor = formatColor(marker, 1, len);
        params.scatterSize = formatParam(marker.size, len, calculateSize, 20, sizeFn);
        params.scatterMarker = formatParam(marker.symbol, len, calculateSymbol, '●');
        params.scatterLineWidth = marker.line.width;  // arrayOk === false
        params.scatterLineColor = formatColor(marker.line, 1, len);
        params.scatterAngle = 0;
    }

    if('textposition' in data) {
        params.textOffset = calculateTextOffset(data.textposition);
        params.textColor = formatColor(data.textfont, 1, len);
        params.textSize = formatParam(data.textfont.size, len, Lib.identity, 12);
        params.textFont = data.textfont.family;  // arrayOk === false
        params.textAngle = 0;
    }

    var dims = ['x', 'y', 'z'];
    params.project = [false, false, false];
    params.projectScale = [1, 1, 1];
    params.projectOpacity = [1, 1, 1];
    for(i = 0; i < 3; ++i) {
        var projection = data.projection[dims[i]];
        if((params.project[i] = projection.show)) {
            params.projectOpacity[i] = projection.opacity;
            params.projectScale[i] = projection.scale;
        }
    }

    params.errorBounds = calculateError(data, scaleFactor, sceneLayout);

    var errorParams = calculateErrorParams([data.error_x, data.error_y, data.error_z]);
    params.errorColor = errorParams.color;
    params.errorLineWidth = errorParams.lineWidth;
    params.errorCapSize = errorParams.capSize;

    params.delaunayAxis = data.surfaceaxis;
    params.delaunayColor = str2RgbaArray(data.surfacecolor);

    return params;
}

function arrayToColor(color) {
    if(Array.isArray(color)) {
        var c = color[0];

        if(Array.isArray(c)) color = c;

        return 'rgb(' + color.slice(0, 3).map(function(x) {
            return Math.round(x * 255);
        }) + ')';
    }

    return null;
}

proto.update = function(data) {
    var gl = this.scene.glplot.gl;
    var lineOptions;
    var scatterOptions;
    var errorOptions;
    var textOptions;
    var dashPattern = DASH_PATTERNS.solid;

    // Save data
    this.data = data;

    // Run data conversion
    var options = convertPlotlyOptions(this.scene, data);

    if('mode' in options) {
        this.mode = options.mode;
    }
    if('lineDashes' in options) {
        if(options.lineDashes in DASH_PATTERNS) {
            dashPattern = DASH_PATTERNS[options.lineDashes];
        }
    }

    this.color = arrayToColor(options.scatterColor) ||
                 arrayToColor(options.lineColor);

    // Save data points
    this.dataPoints = options.position;

    lineOptions = {
        gl: this.scene.glplot.gl,
        position: options.position,
        color: options.lineColor,
        lineWidth: options.lineWidth || 1,
        dashes: dashPattern[0],
        dashScale: dashPattern[1],
        opacity: data.opacity,
        connectGaps: data.connectgaps
    };

    if(this.mode.indexOf('lines') !== -1) {
        if(this.linePlot) this.linePlot.update(lineOptions);
        else {
            this.linePlot = createLinePlot(lineOptions);
            this.linePlot._trace = this;
            this.scene.glplot.add(this.linePlot);
        }
    } else if(this.linePlot) {
        this.scene.glplot.remove(this.linePlot);
        this.linePlot.dispose();
        this.linePlot = null;
    }

    // N.B. marker.opacity must be a scalar for performance
    var scatterOpacity = data.opacity;
    if(data.marker && data.marker.opacity) scatterOpacity *= data.marker.opacity;

    scatterOptions = {
        gl: this.scene.glplot.gl,
        position: options.position,
        color: options.scatterColor,
        size: options.scatterSize,
        glyph: options.scatterMarker,
        opacity: scatterOpacity,
        orthographic: true,
        lineWidth: options.scatterLineWidth,
        lineColor: options.scatterLineColor,
        project: options.project,
        projectScale: options.projectScale,
        projectOpacity: options.projectOpacity
    };

    if(this.mode.indexOf('markers') !== -1) {
        if(this.scatterPlot) this.scatterPlot.update(scatterOptions);
        else {
            this.scatterPlot = createScatterPlot(scatterOptions);
            this.scatterPlot._trace = this;
            this.scatterPlot.highlightScale = 1;
            this.scene.glplot.add(this.scatterPlot);
        }
    } else if(this.scatterPlot) {
        this.scene.glplot.remove(this.scatterPlot);
        this.scatterPlot.dispose();
        this.scatterPlot = null;
    }

    textOptions = {
        gl: this.scene.glplot.gl,
        position: options.position,
        glyph: options.text,
        color: options.textColor,
        size: options.textSize,
        angle: options.textAngle,
        alignment: options.textOffset,
        font: options.textFont,
        orthographic: true,
        lineWidth: 0,
        project: false,
        opacity: data.opacity
    };

    this.textLabels = data.hovertext || data.text;

    if(this.mode.indexOf('text') !== -1) {
        if(this.textMarkers) this.textMarkers.update(textOptions);
        else {
            this.textMarkers = createScatterPlot(textOptions);
            this.textMarkers._trace = this;
            this.textMarkers.highlightScale = 1;
            this.scene.glplot.add(this.textMarkers);
        }
    } else if(this.textMarkers) {
        this.scene.glplot.remove(this.textMarkers);
        this.textMarkers.dispose();
        this.textMarkers = null;
    }

    errorOptions = {
        gl: this.scene.glplot.gl,
        position: options.position,
        color: options.errorColor,
        error: options.errorBounds,
        lineWidth: options.errorLineWidth,
        capSize: options.errorCapSize,
        opacity: data.opacity
    };
    if(this.errorBars) {
        if(options.errorBounds) {
            this.errorBars.update(errorOptions);
        } else {
            this.scene.glplot.remove(this.errorBars);
            this.errorBars.dispose();
            this.errorBars = null;
        }
    } else if(options.errorBounds) {
        this.errorBars = createErrorBars(errorOptions);
        this.errorBars._trace = this;
        this.scene.glplot.add(this.errorBars);
    }

    if(options.delaunayAxis >= 0) {
        var delaunayOptions = constructDelaunay(
            options.position,
            options.delaunayColor,
            options.delaunayAxis
        );
        delaunayOptions.opacity = data.opacity;

        if(this.delaunayMesh) {
            this.delaunayMesh.update(delaunayOptions);
        } else {
            delaunayOptions.gl = gl;
            this.delaunayMesh = createMesh(delaunayOptions);
            this.delaunayMesh._trace = this;
            this.scene.glplot.add(this.delaunayMesh);
        }
    } else if(this.delaunayMesh) {
        this.scene.glplot.remove(this.delaunayMesh);
        this.delaunayMesh.dispose();
        this.delaunayMesh = null;
    }
};

proto.dispose = function() {
    if(this.linePlot) {
        this.scene.glplot.remove(this.linePlot);
        this.linePlot.dispose();
    }
    if(this.scatterPlot) {
        this.scene.glplot.remove(this.scatterPlot);
        this.scatterPlot.dispose();
    }
    if(this.errorBars) {
        this.scene.glplot.remove(this.errorBars);
        this.errorBars.dispose();
    }
    if(this.textMarkers) {
        this.scene.glplot.remove(this.textMarkers);
        this.textMarkers.dispose();
    }
    if(this.delaunayMesh) {
        this.scene.glplot.remove(this.delaunayMesh);
        this.delaunayMesh.dispose();
    }
};

function createLineWithMarkers(scene, data) {
    var plot = new LineWithMarkers(scene, data.uid);
    plot.update(data);
    return plot;
}

module.exports = createLineWithMarkers;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter3d/defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter3d/defaults.js ***!
  \*****************************************************************/
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

var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var handleMarkerDefaults = __webpack_require__(/*! ../scatter/marker_defaults */ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js");
var handleLineDefaults = __webpack_require__(/*! ../scatter/line_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js");
var handleTextDefaults = __webpack_require__(/*! ../scatter/text_defaults */ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js");

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatter3d/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleXYZDefaults(traceIn, traceOut, coerce, layout);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');
    coerce('mode');

    if(subTypes.hasLines(traceOut)) {
        coerce('connectgaps');
        handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);
    }

    if(subTypes.hasMarkers(traceOut)) {
        handleMarkerDefaults(traceIn, traceOut, defaultColor, layout, coerce, {noSelect: true});
    }

    if(subTypes.hasText(traceOut)) {
        coerce('texttemplate');
        handleTextDefaults(traceIn, traceOut, layout, coerce, {noSelect: true});
    }

    var lineColor = (traceOut.line || {}).color;
    var markerColor = (traceOut.marker || {}).color;
    if(coerce('surfaceaxis') >= 0) coerce('surfacecolor', lineColor || markerColor);

    var dims = ['x', 'y', 'z'];
    for(var i = 0; i < 3; ++i) {
        var projection = 'projection.' + dims[i];
        if(coerce(projection + '.show')) {
            coerce(projection + '.opacity');
            coerce(projection + '.scale');
        }
    }

    var errorBarsSupplyDefaults = Registry.getComponentMethod('errorbars', 'supplyDefaults');
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || markerColor || defaultColor, {axis: 'z'});
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || markerColor || defaultColor, {axis: 'y', inherit: 'z'});
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || markerColor || defaultColor, {axis: 'x', inherit: 'z'});
};

function handleXYZDefaults(traceIn, traceOut, coerce, layout) {
    var len = 0;
    var x = coerce('x');
    var y = coerce('y');
    var z = coerce('z');

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y', 'z'], layout);

    if(x && y && z) {
        // TODO: what happens if one is missing?
        len = Math.min(x.length, y.length, z.length);
        traceOut._length = traceOut._xlength = traceOut._ylength = traceOut._zlength = len;
    }

    return len;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter3d/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter3d/index.js ***!
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
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/scatter3d/convert.js"),
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatter3d/attributes.js"),
    markerSymbols: __webpack_require__(/*! ../../constants/gl3d_markers */ "./node_modules/plotly.js/src/constants/gl3d_markers.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/scatter3d/defaults.js"),
    colorbar: [
        {
            container: 'marker',
            min: 'cmin',
            max: 'cmax'
        }, {
            container: 'line',
            min: 'cmin',
            max: 'cmax'
        }
    ],
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/scatter3d/calc.js"),

    moduleType: 'trace',
    name: 'scatter3d',
    basePlotModule: __webpack_require__(/*! ../../plots/gl3d */ "./node_modules/plotly.js/src/plots/gl3d/index.js"),
    categories: ['gl3d', 'symbols', 'showLegend', 'scatter-like'],
    meta: {
        hrName: 'scatter_3d',
        description: [
            'The data visualized as scatter point or lines in 3D dimension',
            'is set in `x`, `y`, `z`.',
            'Text (appearing either on the chart or on hover only) is via `text`.',
            'Bubble charts are achieved by setting `marker.size` and/or `marker.color`',
            'Projections are achieved via `projection`.',
            'Surface fills are achieved via `surfaceaxis`.'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RlbGF1bmF5LXRyaWFuZ3VsYXRlL3RyaWFuZ3VsYXRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtZXJyb3IzZC9lcnJvcmJhcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1lcnJvcjNkL3NoYWRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1saW5lM2QvbGliL3NoYWRlcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1saW5lM2QvbGluZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1zY2F0dGVyM2QvbGliL2dldC1zaW1wbGUtc3RyaW5nLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtc2NhdHRlcjNkL2xpYi9nbHlwaHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1zY2F0dGVyM2QvbGliL3NoYWRlcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1zY2F0dGVyM2QvcG9pbnRjbG91ZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc2NhdHRlcjNkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb25zdGFudHMvZ2wzZF9kYXNoZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL2NvbnN0YW50cy9nbDNkX21hcmtlcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyM2QvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIzZC9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcjNkL2NhbGNfZXJyb3JzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcjNkL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyM2QvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyM2QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQVk7O0FBRVosU0FBUyxtQkFBTyxDQUFDLDhFQUF5QjtBQUMxQyxXQUFXLG1CQUFPLENBQUMseUNBQU07O0FBRXpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLGdC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Z0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsS0FBSztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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ZTtBQUM5Rjs7QUFFQTtBQUNBO0FBQ0EsK0RBQStELGVBQWU7QUFDOUU7O0FBRUEsd0NBQXdDO0FBQ3hDLDRDQUE0QztBQUM1Qzs7QUFFQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBGQUEwRixVQUFVO0FBQ3BHLDBGQUEwRix3QkFBd0I7QUFDbEgsMEZBQTBGLHdCQUF3QjtBQUNsSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQSxVQUFVLG1CQUFPLENBQUMsMkVBQVc7QUFDN0IsZ0JBQWdCLG1CQUFPLENBQUMsaUZBQWM7QUFDdEMsbUJBQW1CLG1CQUFPLENBQUMsNEZBQThCO0FBQ3pELG9CQUFvQixtQkFBTyxDQUFDLDZFQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxxRUFBUTs7QUFFMUI7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDBFQUFrQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDQ3MTc3OTRjNDJkY2YwNDU0MjcyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGNoID0gcmVxdWlyZShcImluY3JlbWVudGFsLWNvbnZleC1odWxsXCIpXG52YXIgdW5pcSA9IHJlcXVpcmUoXCJ1bmlxXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gdHJpYW5ndWxhdGVcblxuZnVuY3Rpb24gTGlmdGVkUG9pbnQocCwgaSkge1xuICB0aGlzLnBvaW50ID0gcFxuICB0aGlzLmluZGV4ID0gaVxufVxuXG5mdW5jdGlvbiBjb21wYXJlTGlmdGVkKGEsIGIpIHtcbiAgdmFyIGFwID0gYS5wb2ludFxuICB2YXIgYnAgPSBiLnBvaW50XG4gIHZhciBkID0gYXAubGVuZ3RoXG4gIGZvcih2YXIgaT0wOyBpPGQ7ICsraSkge1xuICAgIHZhciBzID0gYnBbaV0gLSBhcFtpXVxuICAgIGlmKHMpIHtcbiAgICAgIHJldHVybiBzXG4gICAgfVxuICB9XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIHRyaWFuZ3VsYXRlMUQobiwgcG9pbnRzLCBpbmNsdWRlUG9pbnRBdEluZmluaXR5KSB7XG4gIGlmKG4gPT09IDEpIHtcbiAgICBpZihpbmNsdWRlUG9pbnRBdEluZmluaXR5KSB7XG4gICAgICByZXR1cm4gWyBbLTEsIDBdIF1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuICB9XG4gIHZhciBsaWZ0ZWQgPSBwb2ludHMubWFwKGZ1bmN0aW9uKHAsIGkpIHtcbiAgICByZXR1cm4gWyBwWzBdLCBpIF1cbiAgfSlcbiAgbGlmdGVkLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG4gICAgcmV0dXJuIGFbMF0gLSBiWzBdXG4gIH0pXG4gIHZhciBjZWxscyA9IG5ldyBBcnJheShuIC0gMSlcbiAgZm9yKHZhciBpPTE7IGk8bjsgKytpKSB7XG4gICAgdmFyIGEgPSBsaWZ0ZWRbaS0xXVxuICAgIHZhciBiID0gbGlmdGVkW2ldXG4gICAgY2VsbHNbaS0xXSA9IFsgYVsxXSwgYlsxXSBdXG4gIH1cbiAgaWYoaW5jbHVkZVBvaW50QXRJbmZpbml0eSkge1xuICAgIGNlbGxzLnB1c2goXG4gICAgICBbIC0xLCBjZWxsc1swXVsxXSwgXSxcbiAgICAgIFsgY2VsbHNbbi0xXVsxXSwgLTEgXSlcbiAgfVxuICByZXR1cm4gY2VsbHNcbn1cblxuZnVuY3Rpb24gdHJpYW5ndWxhdGUocG9pbnRzLCBpbmNsdWRlUG9pbnRBdEluZmluaXR5KSB7XG4gIHZhciBuID0gcG9pbnRzLmxlbmd0aFxuICBpZihuID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgXG4gIHZhciBkID0gcG9pbnRzWzBdLmxlbmd0aFxuICBpZihkIDwgMSkge1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgLy9TcGVjaWFsIGNhc2U6ICBGb3IgMUQgd2UgY2FuIGp1c3Qgc29ydCB0aGUgcG9pbnRzXG4gIGlmKGQgPT09IDEpIHtcbiAgICByZXR1cm4gdHJpYW5ndWxhdGUxRChuLCBwb2ludHMsIGluY2x1ZGVQb2ludEF0SW5maW5pdHkpXG4gIH1cbiAgXG4gIC8vTGlmdCBwb2ludHMsIHNvcnRcbiAgdmFyIGxpZnRlZCA9IG5ldyBBcnJheShuKVxuICB2YXIgdXBwZXIgPSAxLjBcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgdmFyIHAgPSBwb2ludHNbaV1cbiAgICB2YXIgeCA9IG5ldyBBcnJheShkKzEpXG4gICAgdmFyIGwgPSAwLjBcbiAgICBmb3IodmFyIGo9MDsgajxkOyArK2opIHtcbiAgICAgIHZhciB2ID0gcFtqXVxuICAgICAgeFtqXSA9IHZcbiAgICAgIGwgKz0gdiAqIHZcbiAgICB9XG4gICAgeFtkXSA9IGxcbiAgICBsaWZ0ZWRbaV0gPSBuZXcgTGlmdGVkUG9pbnQoeCwgaSlcbiAgICB1cHBlciA9IE1hdGgubWF4KGwsIHVwcGVyKVxuICB9XG4gIHVuaXEobGlmdGVkLCBjb21wYXJlTGlmdGVkKVxuICBcbiAgLy9Eb3VibGUgcG9pbnRzXG4gIG4gPSBsaWZ0ZWQubGVuZ3RoXG5cbiAgLy9DcmVhdGUgbmV3IGxpc3Qgb2YgcG9pbnRzXG4gIHZhciBkcG9pbnRzID0gbmV3IEFycmF5KG4gKyBkICsgMSlcbiAgdmFyIGRpbmRleCA9IG5ldyBBcnJheShuICsgZCArIDEpXG5cbiAgLy9BZGQgc3RlaW5lciBwb2ludHMgYXQgdG9wXG4gIHZhciB1ID0gKGQrMSkgKiAoZCsxKSAqIHVwcGVyXG4gIHZhciB5ID0gbmV3IEFycmF5KGQrMSlcbiAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgIHlbaV0gPSAwLjBcbiAgfVxuICB5W2RdID0gdVxuXG4gIGRwb2ludHNbMF0gPSB5LnNsaWNlKClcbiAgZGluZGV4WzBdID0gLTFcblxuICBmb3IodmFyIGk9MDsgaTw9ZDsgKytpKSB7XG4gICAgdmFyIHggPSB5LnNsaWNlKClcbiAgICB4W2ldID0gMVxuICAgIGRwb2ludHNbaSsxXSA9IHhcbiAgICBkaW5kZXhbaSsxXSA9IC0xXG4gIH1cblxuICAvL0NvcHkgcmVzdCBvZiB0aGUgcG9pbnRzIG92ZXJcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgdmFyIGggPSBsaWZ0ZWRbaV1cbiAgICBkcG9pbnRzW2kgKyBkICsgMV0gPSBoLnBvaW50XG4gICAgZGluZGV4W2kgKyBkICsgMV0gPSAgaC5pbmRleFxuICB9XG5cbiAgLy9Db25zdHJ1Y3QgY29udmV4IGh1bGxcbiAgdmFyIGh1bGwgPSBjaChkcG9pbnRzLCBmYWxzZSlcbiAgaWYoaW5jbHVkZVBvaW50QXRJbmZpbml0eSkge1xuICAgIGh1bGwgPSBodWxsLmZpbHRlcihmdW5jdGlvbihjZWxsKSB7XG4gICAgICB2YXIgY291bnQgPSAwXG4gICAgICBmb3IodmFyIGo9MDsgajw9ZDsgKytqKSB7XG4gICAgICAgIHZhciB2ID0gZGluZGV4W2NlbGxbal1dXG4gICAgICAgIGlmKHYgPCAwKSB7XG4gICAgICAgICAgaWYoKytjb3VudCA+PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2VsbFtqXSA9IHZcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBodWxsID0gaHVsbC5maWx0ZXIoZnVuY3Rpb24oY2VsbCkge1xuICAgICAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgICAgICB2YXIgdiA9IGRpbmRleFtjZWxsW2ldXVxuICAgICAgICBpZih2IDwgMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGNlbGxbaV0gPSB2XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBpZihkICYgMSkge1xuICAgIGZvcih2YXIgaT0wOyBpPGh1bGwubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBoID0gaHVsbFtpXVxuICAgICAgdmFyIHggPSBoWzBdXG4gICAgICBoWzBdID0gaFsxXVxuICAgICAgaFsxXSA9IHhcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaHVsbFxufSIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUVycm9yQmFyc1xuXG52YXIgY3JlYXRlQnVmZmVyICA9IHJlcXVpcmUoJ2dsLWJ1ZmZlcicpXG52YXIgY3JlYXRlVkFPICAgICA9IHJlcXVpcmUoJ2dsLXZhbycpXG52YXIgY3JlYXRlU2hhZGVyICA9IHJlcXVpcmUoJy4vc2hhZGVycy9pbmRleCcpXG5cbnZhciBJREVOVElUWSA9IFsxLDAsMCwwLFxuICAgICAgICAgICAgICAgIDAsMSwwLDAsXG4gICAgICAgICAgICAgICAgMCwwLDEsMCxcbiAgICAgICAgICAgICAgICAwLDAsMCwxXVxuXG5mdW5jdGlvbiBFcnJvckJhcnMoZ2wsIGJ1ZmZlciwgdmFvLCBzaGFkZXIpIHtcbiAgdGhpcy5nbCAgICAgICAgICAgPSBnbFxuICB0aGlzLnNoYWRlciAgICAgICA9IHNoYWRlclxuICB0aGlzLmJ1ZmZlciAgICAgICA9IGJ1ZmZlclxuICB0aGlzLnZhbyAgICAgICAgICA9IHZhb1xuICB0aGlzLnBpeGVsUmF0aW8gICA9IDFcbiAgdGhpcy5ib3VuZHMgICAgICAgPSBbWyBJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5XSwgWy1JbmZpbml0eSwtSW5maW5pdHksLUluZmluaXR5XV1cbiAgdGhpcy5jbGlwQm91bmRzICAgPSBbWy1JbmZpbml0eSwtSW5maW5pdHksLUluZmluaXR5XSwgWyBJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5XV1cbiAgdGhpcy5saW5lV2lkdGggICAgPSBbMSwxLDFdXG4gIHRoaXMuY2FwU2l6ZSAgICAgID0gWzEwLDEwLDEwXVxuICB0aGlzLmxpbmVDb3VudCAgICA9IFswLDAsMF1cbiAgdGhpcy5saW5lT2Zmc2V0ICAgPSBbMCwwLDBdXG4gIHRoaXMub3BhY2l0eSAgICAgID0gMVxuICB0aGlzLmhhc0FscGhhICAgICA9IGZhbHNlXG59XG5cbnZhciBwcm90byA9IEVycm9yQmFycy5wcm90b3R5cGVcblxucHJvdG8uaXNPcGFxdWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICF0aGlzLmhhc0FscGhhXG59XG5cbnByb3RvLmlzVHJhbnNwYXJlbnQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuaGFzQWxwaGFcbn1cblxucHJvdG8uZHJhd1RyYW5zcGFyZW50ID0gcHJvdG8uZHJhdyA9IGZ1bmN0aW9uKGNhbWVyYVBhcmFtcykge1xuICB2YXIgZ2wgPSB0aGlzLmdsXG4gIHZhciB1bmlmb3JtcyAgICAgICAgPSB0aGlzLnNoYWRlci51bmlmb3Jtc1xuXG4gIHRoaXMuc2hhZGVyLmJpbmQoKVxuICB2YXIgdmlldyAgICAgICA9IHVuaWZvcm1zLnZpZXcgICAgICAgPSBjYW1lcmFQYXJhbXMudmlldyAgICAgICB8fCBJREVOVElUWVxuICB2YXIgcHJvamVjdGlvbiA9IHVuaWZvcm1zLnByb2plY3Rpb24gPSBjYW1lcmFQYXJhbXMucHJvamVjdGlvbiB8fCBJREVOVElUWVxuICB1bmlmb3Jtcy5tb2RlbCAgICAgID0gY2FtZXJhUGFyYW1zLm1vZGVsICAgICAgfHwgSURFTlRJVFlcbiAgdW5pZm9ybXMuY2xpcEJvdW5kcyA9IHRoaXMuY2xpcEJvdW5kc1xuICB1bmlmb3Jtcy5vcGFjaXR5ICAgID0gdGhpcy5vcGFjaXR5XG5cblxuICB2YXIgY3ggPSB2aWV3WzEyXVxuICB2YXIgY3kgPSB2aWV3WzEzXVxuICB2YXIgY3ogPSB2aWV3WzE0XVxuICB2YXIgY3cgPSB2aWV3WzE1XVxuXG4gIHZhciBpc09ydGhvID0gY2FtZXJhUGFyYW1zLl9vcnRobyB8fCBmYWxzZVxuICB2YXIgb3J0aG9GaXggPSAoaXNPcnRobykgPyAyIDogMSAvLyBkb3VibGUgdXAgcGFkZGluZyBmb3Igb3J0aG9ncmFwaGljIHRpY2tzICYgbGFiZWxzXG4gIHZhciBwaXhlbFNjYWxlRiA9IG9ydGhvRml4ICogdGhpcy5waXhlbFJhdGlvICogKHByb2plY3Rpb25bM10qY3ggKyBwcm9qZWN0aW9uWzddKmN5ICsgcHJvamVjdGlvblsxMV0qY3ogKyBwcm9qZWN0aW9uWzE1XSpjdykgLyBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0XG5cbiAgdGhpcy52YW8uYmluZCgpXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIGdsLmxpbmVXaWR0aCh0aGlzLmxpbmVXaWR0aFtpXSAqIHRoaXMucGl4ZWxSYXRpbylcbiAgICB1bmlmb3Jtcy5jYXBTaXplID0gdGhpcy5jYXBTaXplW2ldICogcGl4ZWxTY2FsZUZcbiAgICBpZiAodGhpcy5saW5lQ291bnRbaV0pIHtcbiAgICAgIGdsLmRyYXdBcnJheXMoZ2wuTElORVMsIHRoaXMubGluZU9mZnNldFtpXSwgdGhpcy5saW5lQ291bnRbaV0pXG4gICAgfVxuICB9XG4gIHRoaXMudmFvLnVuYmluZCgpXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUJvdW5kcyhib3VuZHMsIHBvaW50KSB7XG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIGJvdW5kc1swXVtpXSA9IE1hdGgubWluKGJvdW5kc1swXVtpXSwgcG9pbnRbaV0pXG4gICAgYm91bmRzWzFdW2ldID0gTWF0aC5tYXgoYm91bmRzWzFdW2ldLCBwb2ludFtpXSlcbiAgfVxufVxuXG52YXIgRkFDRV9UQUJMRSA9IChmdW5jdGlvbigpe1xuICB2YXIgdGFibGUgPSBuZXcgQXJyYXkoMylcbiAgZm9yKHZhciBkPTA7IGQ8MzsgKytkKSB7XG4gICAgdmFyIHJvdyA9IFtdXG4gICAgZm9yKHZhciBqPTE7IGo8PTI7ICsraikge1xuICAgICAgZm9yKHZhciBzPS0xOyBzPD0xOyBzKz0yKSB7XG4gICAgICAgIHZhciB1ID0gKGorZCkgJSAzXG4gICAgICAgIHZhciB5ID0gWzAsMCwwXVxuICAgICAgICB5W3VdID0gc1xuICAgICAgICByb3cucHVzaCh5KVxuICAgICAgfVxuICAgIH1cbiAgICB0YWJsZVtkXSA9IHJvd1xuICB9XG4gIHJldHVybiB0YWJsZVxufSkoKVxuXG5cbmZ1bmN0aW9uIGVtaXRGYWNlKHZlcnRzLCB4LCBjLCBkKSB7XG4gIHZhciBvZmZzZXRzID0gRkFDRV9UQUJMRVtkXVxuICBmb3IodmFyIGk9MDsgaTxvZmZzZXRzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIG8gPSBvZmZzZXRzW2ldXG4gICAgdmVydHMucHVzaCh4WzBdLCB4WzFdLCB4WzJdLFxuICAgICAgICAgICAgICAgY1swXSwgY1sxXSwgY1syXSwgY1szXSxcbiAgICAgICAgICAgICAgIG9bMF0sIG9bMV0sIG9bMl0pXG4gIH1cbiAgcmV0dXJuIG9mZnNldHMubGVuZ3RoXG59XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICBpZignbGluZVdpZHRoJyBpbiBvcHRpb25zKSB7XG4gICAgdGhpcy5saW5lV2lkdGggPSBvcHRpb25zLmxpbmVXaWR0aFxuICAgIGlmKCFBcnJheS5pc0FycmF5KHRoaXMubGluZVdpZHRoKSkge1xuICAgICAgdGhpcy5saW5lV2lkdGggPSBbdGhpcy5saW5lV2lkdGgsIHRoaXMubGluZVdpZHRoLCB0aGlzLmxpbmVXaWR0aF1cbiAgICB9XG4gIH1cbiAgaWYoJ2NhcFNpemUnIGluIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNhcFNpemUgPSBvcHRpb25zLmNhcFNpemVcbiAgICBpZighQXJyYXkuaXNBcnJheSh0aGlzLmNhcFNpemUpKSB7XG4gICAgICB0aGlzLmNhcFNpemUgPSBbdGhpcy5jYXBTaXplLCB0aGlzLmNhcFNpemUsIHRoaXMuY2FwU2l6ZV1cbiAgICB9XG4gIH1cblxuICB0aGlzLmhhc0FscGhhID0gZmFsc2UgLy8gZGVmYXVsdCB0byBubyB0cmFuc3BhcmVudCBkcmF3XG4gIGlmKCdvcGFjaXR5JyBpbiBvcHRpb25zKSB7XG4gICAgdGhpcy5vcGFjaXR5ID0gK29wdGlvbnMub3BhY2l0eVxuICAgIGlmKHRoaXMub3BhY2l0eSA8IDEpIHtcbiAgICAgIHRoaXMuaGFzQWxwaGEgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb2xvciAgICA9IG9wdGlvbnMuY29sb3IgfHwgW1swLDAsMF0sWzAsMCwwXSxbMCwwLDBdXVxuICB2YXIgcG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uXG4gIHZhciBlcnJvciAgICA9IG9wdGlvbnMuZXJyb3JcbiAgaWYoIUFycmF5LmlzQXJyYXkoY29sb3JbMF0pKSB7XG4gICAgY29sb3IgPSBbY29sb3IsY29sb3IsY29sb3JdXG4gIH1cblxuICBpZihwb3NpdGlvbiAmJiBlcnJvcikge1xuXG4gICAgdmFyIHZlcnRzICAgICAgID0gW11cbiAgICB2YXIgbiAgICAgICAgICAgPSBwb3NpdGlvbi5sZW5ndGhcbiAgICB2YXIgdmVydGV4Q291bnQgPSAwXG4gICAgdGhpcy5ib3VuZHMgICAgID0gW1sgSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eV0sXG4gICAgICAgICAgICAgICAgICAgICAgIFstSW5maW5pdHksLUluZmluaXR5LC1JbmZpbml0eV1dXG4gICAgdGhpcy5saW5lQ291bnQgID0gWzAsMCwwXVxuXG4gICAgLy9CdWlsZCBnZW9tZXRyeSBmb3IgbGluZXNcbiAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgIHRoaXMubGluZU9mZnNldFtqXSA9IHZlcnRleENvdW50XG5cbmlfbG9vcDpcbiAgICAgIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgICAgICB2YXIgcCA9IHBvc2l0aW9uW2ldXG5cbiAgICAgICAgZm9yKHZhciBrPTA7IGs8MzsgKytrKSB7XG4gICAgICAgICAgaWYoaXNOYU4ocFtrXSkgfHwgIWlzRmluaXRlKHBba10pKSB7XG4gICAgICAgICAgICBjb250aW51ZSBpX2xvb3BcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZSA9IGVycm9yW2ldXG4gICAgICAgIHZhciBjID0gY29sb3Jbal1cbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShjWzBdKSkge1xuICAgICAgICAgIGMgPSBjb2xvcltpXVxuICAgICAgICB9XG4gICAgICAgIGlmKGMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgYyA9IFtjWzBdLCBjWzFdLCBjWzJdLCAxXVxuICAgICAgICB9IGVsc2UgaWYoYy5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICBjID0gW2NbMF0sIGNbMV0sIGNbMl0sIGNbM11dXG4gICAgICAgICAgaWYoIXRoaXMuaGFzQWxwaGEgJiYgY1szXSA8IDEpIHRoaXMuaGFzQWxwaGEgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZihpc05hTihlWzBdW2pdKSB8fCBpc05hTihlWzFdW2pdKSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYoZVswXVtqXSA8IDApIHtcbiAgICAgICAgICB2YXIgeCA9IHAuc2xpY2UoKVxuICAgICAgICAgIHhbal0gKz0gZVswXVtqXVxuICAgICAgICAgIHZlcnRzLnB1c2gocFswXSwgcFsxXSwgcFsyXSxcbiAgICAgICAgICAgICAgICAgICAgIGNbMF0sIGNbMV0sIGNbMl0sIGNbM10sXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCAgICAwLCAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgeFswXSwgeFsxXSwgeFsyXSxcbiAgICAgICAgICAgICAgICAgICAgIGNbMF0sIGNbMV0sIGNbMl0sIGNbM10sXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCAgICAwLCAgICAwKVxuICAgICAgICAgIHVwZGF0ZUJvdW5kcyh0aGlzLmJvdW5kcywgeClcbiAgICAgICAgICB2ZXJ0ZXhDb3VudCArPSAyICsgZW1pdEZhY2UodmVydHMsIHgsIGMsIGopXG4gICAgICAgIH1cbiAgICAgICAgaWYoZVsxXVtqXSA+IDApIHtcbiAgICAgICAgICB2YXIgeCA9IHAuc2xpY2UoKVxuICAgICAgICAgIHhbal0gKz0gZVsxXVtqXVxuICAgICAgICAgIHZlcnRzLnB1c2gocFswXSwgcFsxXSwgcFsyXSxcbiAgICAgICAgICAgICAgICAgICAgIGNbMF0sIGNbMV0sIGNbMl0sIGNbM10sXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCAgICAwLCAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgeFswXSwgeFsxXSwgeFsyXSxcbiAgICAgICAgICAgICAgICAgICAgIGNbMF0sIGNbMV0sIGNbMl0sIGNbM10sXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCAgICAwLCAgICAwKVxuICAgICAgICAgIHVwZGF0ZUJvdW5kcyh0aGlzLmJvdW5kcywgeClcbiAgICAgICAgICB2ZXJ0ZXhDb3VudCArPSAyICsgZW1pdEZhY2UodmVydHMsIHgsIGMsIGopXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMubGluZUNvdW50W2pdID0gdmVydGV4Q291bnQgLSB0aGlzLmxpbmVPZmZzZXRbal1cbiAgICB9XG4gICAgdGhpcy5idWZmZXIudXBkYXRlKHZlcnRzKVxuICB9XG59XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaGFkZXIuZGlzcG9zZSgpXG4gIHRoaXMuYnVmZmVyLmRpc3Bvc2UoKVxuICB0aGlzLnZhby5kaXNwb3NlKClcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXJyb3JCYXJzKG9wdGlvbnMpIHtcbiAgdmFyIGdsID0gb3B0aW9ucy5nbFxuICB2YXIgYnVmZmVyID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgdmFvID0gY3JlYXRlVkFPKGdsLCBbXG4gICAgICB7XG4gICAgICAgIGJ1ZmZlcjogYnVmZmVyLFxuICAgICAgICB0eXBlOiAgIGdsLkZMT0FULFxuICAgICAgICBzaXplOiAgIDMsXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgc3RyaWRlOiA0MFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYnVmZmVyOiBidWZmZXIsXG4gICAgICAgIHR5cGU6ICAgZ2wuRkxPQVQsXG4gICAgICAgIHNpemU6ICAgNCxcbiAgICAgICAgb2Zmc2V0OiAxMixcbiAgICAgICAgc3RyaWRlOiA0MFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYnVmZmVyOiBidWZmZXIsXG4gICAgICAgIHR5cGU6ICAgZ2wuRkxPQVQsXG4gICAgICAgIHNpemU6ICAgMyxcbiAgICAgICAgb2Zmc2V0OiAyOCxcbiAgICAgICAgc3RyaWRlOiA0MFxuICAgICAgfVxuICAgIF0pXG5cbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbClcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ubG9jYXRpb24gPSAwXG4gIHNoYWRlci5hdHRyaWJ1dGVzLmNvbG9yLmxvY2F0aW9uICAgID0gMVxuICBzaGFkZXIuYXR0cmlidXRlcy5vZmZzZXQubG9jYXRpb24gICA9IDJcblxuICB2YXIgcmVzdWx0ID0gbmV3IEVycm9yQmFycyhnbCwgYnVmZmVyLCB2YW8sIHNoYWRlcilcbiAgcmVzdWx0LnVwZGF0ZShvcHRpb25zKVxuICByZXR1cm4gcmVzdWx0XG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGdsc2xpZnkgPSByZXF1aXJlKCdnbHNsaWZ5JylcbnZhciBjcmVhdGVTaGFkZXIgPSByZXF1aXJlKCdnbC1zaGFkZXInKVxuXG52YXIgdmVydFNyYyA9IGdsc2xpZnkoJy4vdmVydGV4Lmdsc2wnKVxudmFyIGZyYWdTcmMgPSBnbHNsaWZ5KCcuL2ZyYWdtZW50Lmdsc2wnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGdsKSB7XG4gIHJldHVybiBjcmVhdGVTaGFkZXIoZ2wsIHZlcnRTcmMsIGZyYWdTcmMsIG51bGwsIFtcbiAgICB7bmFtZTogJ3Bvc2l0aW9uJywgdHlwZTogJ3ZlYzMnfSxcbiAgICB7bmFtZTogJ2NvbG9yJywgdHlwZTogJ3ZlYzQnfSxcbiAgICB7bmFtZTogJ29mZnNldCcsIHR5cGU6ICd2ZWMzJ31cbiAgXSlcbn1cbiIsInZhciBnbHNsaWZ5ICAgICAgID0gcmVxdWlyZSgnZ2xzbGlmeScpXG52YXIgY3JlYXRlU2hhZGVyICA9IHJlcXVpcmUoJ2dsLXNoYWRlcicpXG5cbnZhciB2ZXJ0U3JjID0gZ2xzbGlmeSgnLi4vc2hhZGVycy92ZXJ0ZXguZ2xzbCcpXG52YXIgZm9yd2FyZEZyYWcgPSBnbHNsaWZ5KCcuLi9zaGFkZXJzL2ZyYWdtZW50Lmdsc2wnKVxudmFyIHBpY2tGcmFnID0gZ2xzbGlmeSgnLi4vc2hhZGVycy9waWNrLmdsc2wnKVxuXG52YXIgQVRUUklCVVRFUyA9IFtcbiAge25hbWU6ICdwb3NpdGlvbicsIHR5cGU6ICd2ZWMzJ30sXG4gIHtuYW1lOiAnbmV4dFBvc2l0aW9uJywgdHlwZTogJ3ZlYzMnfSxcbiAge25hbWU6ICdhcmNMZW5ndGgnLCB0eXBlOiAnZmxvYXQnfSxcbiAge25hbWU6ICdsaW5lV2lkdGgnLCB0eXBlOiAnZmxvYXQnfSxcbiAge25hbWU6ICdjb2xvcicsIHR5cGU6ICd2ZWM0J31cbl1cblxuZXhwb3J0cy5jcmVhdGVTaGFkZXIgPSBmdW5jdGlvbihnbCkge1xuICByZXR1cm4gY3JlYXRlU2hhZGVyKGdsLCB2ZXJ0U3JjLCBmb3J3YXJkRnJhZywgbnVsbCwgQVRUUklCVVRFUylcbn1cblxuZXhwb3J0cy5jcmVhdGVQaWNrU2hhZGVyID0gZnVuY3Rpb24oZ2wpIHtcbiAgcmV0dXJuIGNyZWF0ZVNoYWRlcihnbCwgdmVydFNyYywgcGlja0ZyYWcsIG51bGwsIEFUVFJJQlVURVMpXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVMaW5lUGxvdFxuXG52YXIgY3JlYXRlQnVmZmVyID0gcmVxdWlyZSgnZ2wtYnVmZmVyJylcbnZhciBjcmVhdGVWQU8gPSByZXF1aXJlKCdnbC12YW8nKVxudmFyIGNyZWF0ZVRleHR1cmUgPSByZXF1aXJlKCdnbC10ZXh0dXJlMmQnKVxuXG52YXIgVUlOVDhfVklFVyA9IG5ldyBVaW50OEFycmF5KDQpXG52YXIgRkxPQVRfVklFVyA9IG5ldyBGbG9hdDMyQXJyYXkoVUlOVDhfVklFVy5idWZmZXIpXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbWlrb2xhbHlzZW5rby9nbHNsLXJlYWQtZmxvYXQvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmZ1bmN0aW9uIHVucGFja0Zsb2F0KHgsIHksIHosIHcpIHtcbiAgVUlOVDhfVklFV1swXSA9IHdcbiAgVUlOVDhfVklFV1sxXSA9IHpcbiAgVUlOVDhfVklFV1syXSA9IHlcbiAgVUlOVDhfVklFV1szXSA9IHhcbiAgcmV0dXJuIEZMT0FUX1ZJRVdbMF1cbn1cblxudmFyIGJzZWFyY2ggPSByZXF1aXJlKCdiaW5hcnktc2VhcmNoLWJvdW5kcycpXG52YXIgbmRhcnJheSA9IHJlcXVpcmUoJ25kYXJyYXknKVxudmFyIHNoYWRlcnMgPSByZXF1aXJlKCcuL2xpYi9zaGFkZXJzJylcblxudmFyIGNyZWF0ZVNoYWRlciA9IHNoYWRlcnMuY3JlYXRlU2hhZGVyXG52YXIgY3JlYXRlUGlja1NoYWRlciA9IHNoYWRlcnMuY3JlYXRlUGlja1NoYWRlclxuXG52YXIgaWRlbnRpdHkgPSBbMSwgMCwgMCwgMCxcbiAgMCwgMSwgMCwgMCxcbiAgMCwgMCwgMSwgMCxcbiAgMCwgMCwgMCwgMV1cblxuZnVuY3Rpb24gZGlzdGFuY2UgKGEsIGIpIHtcbiAgdmFyIHMgPSAwLjBcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICB2YXIgZCA9IGFbaV0gLSBiW2ldXG4gICAgcyArPSBkICogZFxuICB9XG4gIHJldHVybiBNYXRoLnNxcnQocylcbn1cblxuZnVuY3Rpb24gZmlsdGVyQ2xpcEJvdW5kcyAoYm91bmRzKSB7XG4gIHZhciByZXN1bHQgPSBbWy0xZTYsIC0xZTYsIC0xZTZdLCBbMWU2LCAxZTYsIDFlNl1dXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgcmVzdWx0WzBdW2ldID0gTWF0aC5tYXgoYm91bmRzWzBdW2ldLCByZXN1bHRbMF1baV0pXG4gICAgcmVzdWx0WzFdW2ldID0gTWF0aC5taW4oYm91bmRzWzFdW2ldLCByZXN1bHRbMV1baV0pXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBQaWNrUmVzdWx0ICh0YXUsIHBvc2l0aW9uLCBpbmRleCwgZGF0YUNvb3JkaW5hdGUpIHtcbiAgdGhpcy5hcmNMZW5ndGggPSB0YXVcbiAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uXG4gIHRoaXMuaW5kZXggPSBpbmRleFxuICB0aGlzLmRhdGFDb29yZGluYXRlID0gZGF0YUNvb3JkaW5hdGVcbn1cblxuZnVuY3Rpb24gTGluZVBsb3QgKGdsLCBzaGFkZXIsIHBpY2tTaGFkZXIsIGJ1ZmZlciwgdmFvLCB0ZXh0dXJlKSB7XG4gIHRoaXMuZ2wgPSBnbFxuICB0aGlzLnNoYWRlciA9IHNoYWRlclxuICB0aGlzLnBpY2tTaGFkZXIgPSBwaWNrU2hhZGVyXG4gIHRoaXMuYnVmZmVyID0gYnVmZmVyXG4gIHRoaXMudmFvID0gdmFvXG4gIHRoaXMuY2xpcEJvdW5kcyA9IFtcbiAgICBbIC1JbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHkgXSxcbiAgICBbIEluZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHkgXV1cbiAgdGhpcy5wb2ludHMgPSBbXVxuICB0aGlzLmFyY0xlbmd0aCA9IFtdXG4gIHRoaXMudmVydGV4Q291bnQgPSAwXG4gIHRoaXMuYm91bmRzID0gW1swLCAwLCAwXSwgWzAsIDAsIDBdXVxuICB0aGlzLnBpY2tJZCA9IDBcbiAgdGhpcy5saW5lV2lkdGggPSAxXG4gIHRoaXMudGV4dHVyZSA9IHRleHR1cmVcbiAgdGhpcy5kYXNoU2NhbGUgPSAxXG4gIHRoaXMub3BhY2l0eSA9IDFcbiAgdGhpcy5oYXNBbHBoYSA9IGZhbHNlXG4gIHRoaXMuZGlydHkgPSB0cnVlXG4gIHRoaXMucGl4ZWxSYXRpbyA9IDFcbn1cblxudmFyIHByb3RvID0gTGluZVBsb3QucHJvdG90eXBlXG5cbnByb3RvLmlzVHJhbnNwYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmhhc0FscGhhXG59XG5cbnByb3RvLmlzT3BhcXVlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gIXRoaXMuaGFzQWxwaGFcbn1cblxucHJvdG8ucGlja1Nsb3RzID0gMVxuXG5wcm90by5zZXRQaWNrQmFzZSA9IGZ1bmN0aW9uIChpZCkge1xuICB0aGlzLnBpY2tJZCA9IGlkXG59XG5cbnByb3RvLmRyYXdUcmFuc3BhcmVudCA9IHByb3RvLmRyYXcgPSBmdW5jdGlvbiAoY2FtZXJhKSB7XG4gIGlmICghdGhpcy52ZXJ0ZXhDb3VudCkgcmV0dXJuXG4gIHZhciBnbCA9IHRoaXMuZ2xcbiAgdmFyIHNoYWRlciA9IHRoaXMuc2hhZGVyXG4gIHZhciB2YW8gPSB0aGlzLnZhb1xuICBzaGFkZXIuYmluZCgpXG4gIHNoYWRlci51bmlmb3JtcyA9IHtcbiAgICBtb2RlbDogY2FtZXJhLm1vZGVsIHx8IGlkZW50aXR5LFxuICAgIHZpZXc6IGNhbWVyYS52aWV3IHx8IGlkZW50aXR5LFxuICAgIHByb2plY3Rpb246IGNhbWVyYS5wcm9qZWN0aW9uIHx8IGlkZW50aXR5LFxuICAgIGNsaXBCb3VuZHM6IGZpbHRlckNsaXBCb3VuZHModGhpcy5jbGlwQm91bmRzKSxcbiAgICBkYXNoVGV4dHVyZTogdGhpcy50ZXh0dXJlLmJpbmQoKSxcbiAgICBkYXNoU2NhbGU6IHRoaXMuZGFzaFNjYWxlIC8gdGhpcy5hcmNMZW5ndGhbdGhpcy5hcmNMZW5ndGgubGVuZ3RoIC0gMV0sXG4gICAgb3BhY2l0eTogdGhpcy5vcGFjaXR5LFxuICAgIHNjcmVlblNoYXBlOiBbZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0XSxcbiAgICBwaXhlbFJhdGlvOiB0aGlzLnBpeGVsUmF0aW9cbiAgfVxuICB2YW8uYmluZCgpXG4gIHZhby5kcmF3KGdsLlRSSUFOR0xFX1NUUklQLCB0aGlzLnZlcnRleENvdW50KVxuICB2YW8udW5iaW5kKClcbn1cblxucHJvdG8uZHJhd1BpY2sgPSBmdW5jdGlvbiAoY2FtZXJhKSB7XG4gIGlmICghdGhpcy52ZXJ0ZXhDb3VudCkgcmV0dXJuXG4gIHZhciBnbCA9IHRoaXMuZ2xcbiAgdmFyIHNoYWRlciA9IHRoaXMucGlja1NoYWRlclxuICB2YXIgdmFvID0gdGhpcy52YW9cbiAgc2hhZGVyLmJpbmQoKVxuICBzaGFkZXIudW5pZm9ybXMgPSB7XG4gICAgbW9kZWw6IGNhbWVyYS5tb2RlbCB8fCBpZGVudGl0eSxcbiAgICB2aWV3OiBjYW1lcmEudmlldyB8fCBpZGVudGl0eSxcbiAgICBwcm9qZWN0aW9uOiBjYW1lcmEucHJvamVjdGlvbiB8fCBpZGVudGl0eSxcbiAgICBwaWNrSWQ6IHRoaXMucGlja0lkLFxuICAgIGNsaXBCb3VuZHM6IGZpbHRlckNsaXBCb3VuZHModGhpcy5jbGlwQm91bmRzKSxcbiAgICBzY3JlZW5TaGFwZTogW2dsLmRyYXdpbmdCdWZmZXJXaWR0aCwgZ2wuZHJhd2luZ0J1ZmZlckhlaWdodF0sXG4gICAgcGl4ZWxSYXRpbzogdGhpcy5waXhlbFJhdGlvXG4gIH1cbiAgdmFvLmJpbmQoKVxuICB2YW8uZHJhdyhnbC5UUklBTkdMRV9TVFJJUCwgdGhpcy52ZXJ0ZXhDb3VudClcbiAgdmFvLnVuYmluZCgpXG59XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBpLCBqXG5cbiAgdGhpcy5kaXJ0eSA9IHRydWVcblxuICB2YXIgY29ubmVjdEdhcHMgPSAhIW9wdGlvbnMuY29ubmVjdEdhcHNcblxuICBpZiAoJ2Rhc2hTY2FsZScgaW4gb3B0aW9ucykge1xuICAgIHRoaXMuZGFzaFNjYWxlID0gb3B0aW9ucy5kYXNoU2NhbGVcbiAgfVxuXG4gIHRoaXMuaGFzQWxwaGEgPSBmYWxzZSAvLyBkZWZhdWx0IHRvIG5vIHRyYW5zcGFyZW50IGRyYXdcbiAgaWYgKCdvcGFjaXR5JyBpbiBvcHRpb25zKSB7XG4gICAgdGhpcy5vcGFjaXR5ID0gK29wdGlvbnMub3BhY2l0eVxuICAgIGlmKHRoaXMub3BhY2l0eSA8IDEpIHtcbiAgICAgIHRoaXMuaGFzQWxwaGEgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlY2FsY3VsYXRlIGJ1ZmZlciBkYXRhXG4gIHZhciBidWZmZXIgPSBbXVxuICB2YXIgYXJjTGVuZ3RoQXJyYXkgPSBbXVxuICB2YXIgcG9pbnRBcnJheSA9IFtdXG4gIHZhciBhcmNMZW5ndGggPSAwLjBcbiAgdmFyIHZlcnRleENvdW50ID0gMFxuICB2YXIgYm91bmRzID0gW1xuICAgIFsgSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eSBdLFxuICAgIFsgLUluZmluaXR5LCAtSW5maW5pdHksIC1JbmZpbml0eSBdXVxuXG4gIHZhciBwb3NpdGlvbnMgPSBvcHRpb25zLnBvc2l0aW9uIHx8IG9wdGlvbnMucG9zaXRpb25zXG4gIGlmIChwb3NpdGlvbnMpIHtcblxuICAgIC8vIERlZmF1bHQgY29sb3JcbiAgICB2YXIgY29sb3JzID0gb3B0aW9ucy5jb2xvciB8fCBvcHRpb25zLmNvbG9ycyB8fCBbMCwgMCwgMCwgMV1cblxuICAgIHZhciBsaW5lV2lkdGggPSBvcHRpb25zLmxpbmVXaWR0aCB8fCAxXG5cbiAgICB2YXIgaGFkR2FwID0gZmFsc2VcblxuICAgIGZpbGxfbG9vcDpcbiAgICBmb3IgKGkgPSAxOyBpIDwgcG9zaXRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgYSA9IHBvc2l0aW9uc1tpIC0gMV1cbiAgICAgIHZhciBiID0gcG9zaXRpb25zW2ldXG5cbiAgICAgIGFyY0xlbmd0aEFycmF5LnB1c2goYXJjTGVuZ3RoKVxuICAgICAgcG9pbnRBcnJheS5wdXNoKGEuc2xpY2UoKSlcblxuICAgICAgZm9yIChqID0gMDsgaiA8IDM7ICsraikge1xuICAgICAgICBpZiAoaXNOYU4oYVtqXSkgfHwgaXNOYU4oYltqXSkgfHxcbiAgICAgICAgICAhaXNGaW5pdGUoYVtqXSkgfHwgIWlzRmluaXRlKGJbal0pKSB7XG5cbiAgICAgICAgICBpZiAoIWNvbm5lY3RHYXBzICYmIGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IDI0OyArK2spIHtcbiAgICAgICAgICAgICAgYnVmZmVyLnB1c2goYnVmZmVyW2J1ZmZlci5sZW5ndGggLSAxMl0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2ZXJ0ZXhDb3VudCArPSAyXG4gICAgICAgICAgICBoYWRHYXAgPSB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGludWUgZmlsbF9sb29wXG4gICAgICAgIH1cbiAgICAgICAgYm91bmRzWzBdW2pdID0gTWF0aC5taW4oYm91bmRzWzBdW2pdLCBhW2pdLCBiW2pdKVxuICAgICAgICBib3VuZHNbMV1bal0gPSBNYXRoLm1heChib3VuZHNbMV1bal0sIGFbal0sIGJbal0pXG4gICAgICB9XG5cbiAgICAgIHZhciBhY29sb3IsIGJjb2xvclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sb3JzWzBdKSkge1xuICAgICAgICBhY29sb3IgPSAoY29sb3JzLmxlbmd0aCA+IGkgLSAxKSA/IGNvbG9yc1tpIC0gMV0gOiAgICAgICAgICAgICAvLyB1c2luZyBpbmRleCB2YWx1ZVxuICAgICAgICAgICAgICAgICAoY29sb3JzLmxlbmd0aCA+IDApICAgICA/IGNvbG9yc1tjb2xvcnMubGVuZ3RoIC0gMV0gOiAvLyB1c2luZyBsYXN0IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMV07ICAgICAgICAgICAgICAgLy8gdXNpbmcgYmxhY2tcblxuICAgICAgICBiY29sb3IgPSAoY29sb3JzLmxlbmd0aCA+IGkpID8gY29sb3JzW2ldIDogICAgICAgICAgICAgICAgIC8vIHVzaW5nIGluZGV4IHZhbHVlXG4gICAgICAgICAgICAgICAgIChjb2xvcnMubGVuZ3RoID4gMCkgPyBjb2xvcnNbY29sb3JzLmxlbmd0aCAtIDFdIDogLy8gdXNpbmcgbGFzdCBpdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMV07ICAgICAgICAgICAgICAgLy8gdXNpbmcgYmxhY2tcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjb2xvciA9IGJjb2xvciA9IGNvbG9yc1xuICAgICAgfVxuXG4gICAgICBpZiAoYWNvbG9yLmxlbmd0aCA9PT0gMykge1xuICAgICAgICBhY29sb3IgPSBbYWNvbG9yWzBdLCBhY29sb3JbMV0sIGFjb2xvclsyXSwgMV1cbiAgICAgIH1cbiAgICAgIGlmIChiY29sb3IubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGJjb2xvciA9IFtiY29sb3JbMF0sIGJjb2xvclsxXSwgYmNvbG9yWzJdLCAxXVxuICAgICAgfVxuXG4gICAgICBpZighdGhpcy5oYXNBbHBoYSAmJiBhY29sb3JbM10gPCAxKSB0aGlzLmhhc0FscGhhID0gdHJ1ZVxuXG4gICAgICB2YXIgdzBcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGxpbmVXaWR0aCkpIHtcbiAgICAgICAgdzAgPSAobGluZVdpZHRoLmxlbmd0aCA+IGkgLSAxKSA/IGxpbmVXaWR0aFtpIC0gMV0gOiAgICAgICAgICAgICAgICAvLyB1c2luZyBpbmRleCB2YWx1ZVxuICAgICAgICAgICAgIChsaW5lV2lkdGgubGVuZ3RoID4gMCkgICAgID8gbGluZVdpZHRoW2xpbmVXaWR0aC5sZW5ndGggLSAxXSA6IC8vIHVzaW5nIGxhc3QgaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDFdOyAgICAgICAgICAgICAgICAgICAgIC8vIHVzaW5nIGJsYWNrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3MCA9IGxpbmVXaWR0aFxuICAgICAgfVxuXG4gICAgICB2YXIgdDAgPSBhcmNMZW5ndGhcbiAgICAgIGFyY0xlbmd0aCArPSBkaXN0YW5jZShhLCBiKVxuXG4gICAgICBpZiAoaGFkR2FwKSB7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCAyOyArK2opIHtcbiAgICAgICAgICBidWZmZXIucHVzaChcbiAgICAgICAgICAgIGFbMF0sIGFbMV0sIGFbMl0sIGJbMF0sIGJbMV0sIGJbMl0sIHQwLCB3MCwgYWNvbG9yWzBdLCBhY29sb3JbMV0sIGFjb2xvclsyXSwgYWNvbG9yWzNdKVxuICAgICAgICB9XG4gICAgICAgIHZlcnRleENvdW50ICs9IDJcbiAgICAgICAgaGFkR2FwID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgYnVmZmVyLnB1c2goXG4gICAgICAgIGFbMF0sIGFbMV0sIGFbMl0sIGJbMF0sIGJbMV0sIGJbMl0sIHQwLCB3MCwgYWNvbG9yWzBdLCBhY29sb3JbMV0sIGFjb2xvclsyXSwgYWNvbG9yWzNdLFxuICAgICAgICBhWzBdLCBhWzFdLCBhWzJdLCBiWzBdLCBiWzFdLCBiWzJdLCB0MCwgLXcwLCBhY29sb3JbMF0sIGFjb2xvclsxXSwgYWNvbG9yWzJdLCBhY29sb3JbM10sXG4gICAgICAgIGJbMF0sIGJbMV0sIGJbMl0sIGFbMF0sIGFbMV0sIGFbMl0sIGFyY0xlbmd0aCwgLXcwLCBiY29sb3JbMF0sIGJjb2xvclsxXSwgYmNvbG9yWzJdLCBiY29sb3JbM10sXG4gICAgICAgIGJbMF0sIGJbMV0sIGJbMl0sIGFbMF0sIGFbMV0sIGFbMl0sIGFyY0xlbmd0aCwgdzAsIGJjb2xvclswXSwgYmNvbG9yWzFdLCBiY29sb3JbMl0sIGJjb2xvclszXSlcblxuICAgICAgdmVydGV4Q291bnQgKz0gNFxuICAgIH1cbiAgfVxuICB0aGlzLmJ1ZmZlci51cGRhdGUoYnVmZmVyKVxuXG4gIGFyY0xlbmd0aEFycmF5LnB1c2goYXJjTGVuZ3RoKVxuICBwb2ludEFycmF5LnB1c2gocG9zaXRpb25zW3Bvc2l0aW9ucy5sZW5ndGggLSAxXS5zbGljZSgpKVxuXG4gIHRoaXMuYm91bmRzID0gYm91bmRzXG5cbiAgdGhpcy52ZXJ0ZXhDb3VudCA9IHZlcnRleENvdW50XG5cbiAgdGhpcy5wb2ludHMgPSBwb2ludEFycmF5XG4gIHRoaXMuYXJjTGVuZ3RoID0gYXJjTGVuZ3RoQXJyYXlcblxuICBpZiAoJ2Rhc2hlcycgaW4gb3B0aW9ucykge1xuICAgIHZhciBkYXNoQXJyYXkgPSBvcHRpb25zLmRhc2hlc1xuXG4gICAgLy8gQ2FsY3VsYXRlIHByZWZpeCBzdW1cbiAgICB2YXIgcHJlZml4U3VtID0gZGFzaEFycmF5LnNsaWNlKClcbiAgICBwcmVmaXhTdW0udW5zaGlmdCgwKVxuICAgIGZvciAoaSA9IDE7IGkgPCBwcmVmaXhTdW0ubGVuZ3RoOyArK2kpIHtcbiAgICAgIHByZWZpeFN1bVtpXSA9IHByZWZpeFN1bVtpIC0gMV0gKyBwcmVmaXhTdW1baV1cbiAgICB9XG5cbiAgICB2YXIgZGFzaFRleHR1cmUgPSBuZGFycmF5KG5ldyBBcnJheSgyNTYgKiA0KSwgWzI1NiwgMSwgNF0pXG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgNDsgKytqKSB7XG4gICAgICAgIGRhc2hUZXh0dXJlLnNldChpLCAwLCBqLCAwKVxuICAgICAgfVxuICAgICAgaWYgKGJzZWFyY2gubGUocHJlZml4U3VtLCBwcmVmaXhTdW1bcHJlZml4U3VtLmxlbmd0aCAtIDFdICogaSAvIDI1NS4wKSAmIDEpIHtcbiAgICAgICAgZGFzaFRleHR1cmUuc2V0KGksIDAsIDAsIDApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXNoVGV4dHVyZS5zZXQoaSwgMCwgMCwgMjU1KVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudGV4dHVyZS5zZXRQaXhlbHMoZGFzaFRleHR1cmUpXG4gIH1cbn1cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zaGFkZXIuZGlzcG9zZSgpXG4gIHRoaXMudmFvLmRpc3Bvc2UoKVxuICB0aGlzLmJ1ZmZlci5kaXNwb3NlKClcbn1cblxucHJvdG8ucGljayA9IGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgaWYgKCFzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGlmIChzZWxlY3Rpb24uaWQgIT09IHRoaXMucGlja0lkKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2YXIgdGF1ID0gdW5wYWNrRmxvYXQoXG4gICAgc2VsZWN0aW9uLnZhbHVlWzBdLFxuICAgIHNlbGVjdGlvbi52YWx1ZVsxXSxcbiAgICBzZWxlY3Rpb24udmFsdWVbMl0sXG4gICAgMClcbiAgdmFyIGluZGV4ID0gYnNlYXJjaC5sZSh0aGlzLmFyY0xlbmd0aCwgdGF1KVxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBpZiAoaW5kZXggPT09IHRoaXMuYXJjTGVuZ3RoLmxlbmd0aCAtIDEpIHtcbiAgICByZXR1cm4gbmV3IFBpY2tSZXN1bHQoXG4gICAgICB0aGlzLmFyY0xlbmd0aFt0aGlzLmFyY0xlbmd0aC5sZW5ndGggLSAxXSxcbiAgICAgIHRoaXMucG9pbnRzW3RoaXMucG9pbnRzLmxlbmd0aCAtIDFdLnNsaWNlKCksXG4gICAgICBpbmRleClcbiAgfVxuICB2YXIgYSA9IHRoaXMucG9pbnRzW2luZGV4XVxuICB2YXIgYiA9IHRoaXMucG9pbnRzW01hdGgubWluKGluZGV4ICsgMSwgdGhpcy5wb2ludHMubGVuZ3RoIC0gMSldXG4gIHZhciB0ID0gKHRhdSAtIHRoaXMuYXJjTGVuZ3RoW2luZGV4XSkgLyAodGhpcy5hcmNMZW5ndGhbaW5kZXggKyAxXSAtIHRoaXMuYXJjTGVuZ3RoW2luZGV4XSlcbiAgdmFyIHRpID0gMS4wIC0gdFxuICB2YXIgeCA9IFswLCAwLCAwXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IDM7ICsraSkge1xuICAgIHhbaV0gPSB0aSAqIGFbaV0gKyB0ICogYltpXVxuICB9XG4gIHZhciBkYXRhSW5kZXggPSBNYXRoLm1pbigodCA8IDAuNSkgPyBpbmRleCA6IChpbmRleCArIDEpLCB0aGlzLnBvaW50cy5sZW5ndGggLSAxKVxuICByZXR1cm4gbmV3IFBpY2tSZXN1bHQoXG4gICAgdGF1LFxuICAgIHgsXG4gICAgZGF0YUluZGV4LFxuICAgIHRoaXMucG9pbnRzW2RhdGFJbmRleF0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmVQbG90IChvcHRpb25zKSB7XG4gIHZhciBnbCA9IG9wdGlvbnMuZ2wgfHwgKG9wdGlvbnMuc2NlbmUgJiYgb3B0aW9ucy5zY2VuZS5nbClcblxuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsKVxuICBzaGFkZXIuYXR0cmlidXRlcy5wb3NpdGlvbi5sb2NhdGlvbiA9IDBcbiAgc2hhZGVyLmF0dHJpYnV0ZXMubmV4dFBvc2l0aW9uLmxvY2F0aW9uID0gMVxuICBzaGFkZXIuYXR0cmlidXRlcy5hcmNMZW5ndGgubG9jYXRpb24gPSAyXG4gIHNoYWRlci5hdHRyaWJ1dGVzLmxpbmVXaWR0aC5sb2NhdGlvbiA9IDNcbiAgc2hhZGVyLmF0dHJpYnV0ZXMuY29sb3IubG9jYXRpb24gPSA0XG5cbiAgdmFyIHBpY2tTaGFkZXIgPSBjcmVhdGVQaWNrU2hhZGVyKGdsKVxuICBwaWNrU2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ubG9jYXRpb24gPSAwXG4gIHBpY2tTaGFkZXIuYXR0cmlidXRlcy5uZXh0UG9zaXRpb24ubG9jYXRpb24gPSAxXG4gIHBpY2tTaGFkZXIuYXR0cmlidXRlcy5hcmNMZW5ndGgubG9jYXRpb24gPSAyXG4gIHBpY2tTaGFkZXIuYXR0cmlidXRlcy5saW5lV2lkdGgubG9jYXRpb24gPSAzXG4gIHBpY2tTaGFkZXIuYXR0cmlidXRlcy5jb2xvci5sb2NhdGlvbiA9IDRcblxuICB2YXIgYnVmZmVyID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgdmFvID0gY3JlYXRlVkFPKGdsLCBbXG4gICAge1xuICAgICAgJ2J1ZmZlcic6IGJ1ZmZlcixcbiAgICAgICdzaXplJzogMyxcbiAgICAgICdvZmZzZXQnOiAwLFxuICAgICAgJ3N0cmlkZSc6IDQ4XG4gICAgfSxcbiAgICB7XG4gICAgICAnYnVmZmVyJzogYnVmZmVyLFxuICAgICAgJ3NpemUnOiAzLFxuICAgICAgJ29mZnNldCc6IDEyLFxuICAgICAgJ3N0cmlkZSc6IDQ4XG4gICAgfSxcbiAgICB7XG4gICAgICAnYnVmZmVyJzogYnVmZmVyLFxuICAgICAgJ3NpemUnOiAxLFxuICAgICAgJ29mZnNldCc6IDI0LFxuICAgICAgJ3N0cmlkZSc6IDQ4XG4gICAgfSxcbiAgICB7XG4gICAgICAnYnVmZmVyJzogYnVmZmVyLFxuICAgICAgJ3NpemUnOiAxLFxuICAgICAgJ29mZnNldCc6IDI4LFxuICAgICAgJ3N0cmlkZSc6IDQ4XG4gICAgfSxcbiAgICB7XG4gICAgICAnYnVmZmVyJzogYnVmZmVyLFxuICAgICAgJ3NpemUnOiA0LFxuICAgICAgJ29mZnNldCc6IDMyLFxuICAgICAgJ3N0cmlkZSc6IDQ4XG4gICAgfVxuICBdKVxuXG4gIC8vIENyZWF0ZSB0ZXh0dXJlIGZvciBkYXNoIHBhdHRlcm5cbiAgdmFyIGRlZmF1bHRUZXh0dXJlID0gbmRhcnJheShuZXcgQXJyYXkoMjU2ICogNCksIFsyNTYsIDEsIDRdKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NiAqIDQ7ICsraSkge1xuICAgIGRlZmF1bHRUZXh0dXJlLmRhdGFbaV0gPSAyNTVcbiAgfVxuICB2YXIgdGV4dHVyZSA9IGNyZWF0ZVRleHR1cmUoZ2wsIGRlZmF1bHRUZXh0dXJlKVxuICB0ZXh0dXJlLndyYXAgPSBnbC5SRVBFQVRcblxuICB2YXIgbGluZVBsb3QgPSBuZXcgTGluZVBsb3QoZ2wsIHNoYWRlciwgcGlja1NoYWRlciwgYnVmZmVyLCB2YW8sIHRleHR1cmUpXG4gIGxpbmVQbG90LnVwZGF0ZShvcHRpb25zKVxuICByZXR1cm4gbGluZVBsb3Rcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhKXtcbiAgcmV0dXJuICghYSAmJiBhICE9PSAwKSA/ICcnIDogYS50b1N0cmluZygpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHZlY3Rvcml6ZVRleHQgPSByZXF1aXJlKFwidmVjdG9yaXplLXRleHRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRHbHlwaFxuXG52YXIgR0xZUEhfQ0FDSEUgPSB7fVxuXG5mdW5jdGlvbiBnZXRHbHlwaChzeW1ib2wsIGZvbnQsIHBpeGVsUmF0aW8pIHtcbiAgdmFyIGZvbnRDYWNoZSA9IEdMWVBIX0NBQ0hFW2ZvbnRdXG4gIGlmKCFmb250Q2FjaGUpIHtcbiAgICBmb250Q2FjaGUgPSBHTFlQSF9DQUNIRVtmb250XSA9IHt9XG4gIH1cbiAgaWYoc3ltYm9sIGluIGZvbnRDYWNoZSkge1xuICAgIHJldHVybiBmb250Q2FjaGVbc3ltYm9sXVxuICB9XG5cbiAgdmFyIGNvbmZpZyA9IHtcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXG4gICAgdGV4dEJhc2VsaW5lOiBcIm1pZGRsZVwiLFxuICAgIGxpbmVIZWlnaHQ6IDEuMCxcbiAgICBmb250OiBmb250LFxuICAgIGxpbmVTcGFjaW5nOiAxLjI1LFxuICAgIHN0eWxldGFnczoge1xuICAgICAgYnJlYWtsaW5lczp0cnVlLFxuICAgICAgYm9sZHM6IHRydWUsXG4gICAgICBpdGFsaWNzOiB0cnVlLFxuICAgICAgc3Vic2NyaXB0czp0cnVlLFxuICAgICAgc3VwZXJzY3JpcHRzOnRydWVcbiAgICB9XG4gIH1cblxuICAvL0dldCBsaW5lIGFuZCB0cmlhbmdsZSBtZXNoZXMgZm9yIGdseXBoXG4gIGNvbmZpZy50cmlhbmdsZXMgPSB0cnVlXG4gIHZhciB0cmlTeW1ib2wgPSB2ZWN0b3JpemVUZXh0KHN5bWJvbCwgY29uZmlnKVxuICBjb25maWcudHJpYW5nbGVzID0gZmFsc2VcbiAgdmFyIGxpbmVTeW1ib2wgPSB2ZWN0b3JpemVUZXh0KHN5bWJvbCwgY29uZmlnKVxuXG4gIHZhciBpLCBqXG5cbiAgaWYocGl4ZWxSYXRpbyAmJiBwaXhlbFJhdGlvICE9PSAxKSB7XG4gICAgZm9yKGkgPSAwOyBpIDwgdHJpU3ltYm9sLnBvc2l0aW9ucy5sZW5ndGg7ICsraSl7XG4gICAgICBmb3IoaiA9IDA7IGogPCB0cmlTeW1ib2wucG9zaXRpb25zW2ldLmxlbmd0aDsgKytqKXtcbiAgICAgICAgdHJpU3ltYm9sLnBvc2l0aW9uc1tpXVtqXSAvPSBwaXhlbFJhdGlvO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvcihpID0gMDsgaSA8IGxpbmVTeW1ib2wucG9zaXRpb25zLmxlbmd0aDsgKytpKXtcbiAgICAgIGZvcihqID0gMDsgaiA8IGxpbmVTeW1ib2wucG9zaXRpb25zW2ldLmxlbmd0aDsgKytqKXtcbiAgICAgICAgbGluZVN5bWJvbC5wb3NpdGlvbnNbaV1bal0gLz0gcGl4ZWxSYXRpbztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL0NhbGN1bGF0ZSBib3VuZGluZyBib3hcbiAgdmFyIGJvdW5kcyA9IFtbSW5maW5pdHksSW5maW5pdHldLCBbLUluZmluaXR5LC1JbmZpbml0eV1dXG4gIHZhciBuID0gbGluZVN5bWJvbC5wb3NpdGlvbnMubGVuZ3RoXG4gIGZvcihpID0gMDsgaSA8IG47ICsraSkge1xuICAgIHZhciBwID0gbGluZVN5bWJvbC5wb3NpdGlvbnNbaV1cbiAgICBmb3Ioaj0wOyBqPDI7ICsraikge1xuICAgICAgYm91bmRzWzBdW2pdID0gTWF0aC5taW4oYm91bmRzWzBdW2pdLCBwW2pdKVxuICAgICAgYm91bmRzWzFdW2pdID0gTWF0aC5tYXgoYm91bmRzWzFdW2pdLCBwW2pdKVxuICAgIH1cbiAgfVxuXG4gIC8vU2F2ZSBjYWNoZWQgc3ltYm9sXG4gIHJldHVybiBmb250Q2FjaGVbc3ltYm9sXSA9IFt0cmlTeW1ib2wsIGxpbmVTeW1ib2wsIGJvdW5kc11cbn0iLCJ2YXIgY3JlYXRlU2hhZGVyV3JhcHBlciA9IHJlcXVpcmUoJ2dsLXNoYWRlcicpXG52YXIgZ2xzbGlmeSA9IHJlcXVpcmUoJ2dsc2xpZnknKVxuXG52YXIgcGVyc3BlY3RpdmVWZXJ0U3JjID0gZ2xzbGlmeSgnLi9wZXJzcGVjdGl2ZS5nbHNsJylcbnZhciBvcnRob2dyYXBoaWNWZXJ0U3JjID0gZ2xzbGlmeSgnLi9vcnRob2dyYXBoaWMuZ2xzbCcpXG52YXIgcHJvamVjdGlvblZlcnRTcmMgPSBnbHNsaWZ5KCcuL3Byb2plY3Rpb24uZ2xzbCcpXG52YXIgZHJhd0ZyYWdTcmMgPSBnbHNsaWZ5KCcuL2RyYXctZnJhZ21lbnQuZ2xzbCcpXG52YXIgcGlja0ZyYWdTcmMgPSBnbHNsaWZ5KCcuL3BpY2stZnJhZ21lbnQuZ2xzbCcpXG5cbnZhciBBVFRSSUJVVEVTID0gW1xuICB7bmFtZTogJ3Bvc2l0aW9uJywgdHlwZTogJ3ZlYzMnfSxcbiAge25hbWU6ICdjb2xvcicsIHR5cGU6ICd2ZWM0J30sXG4gIHtuYW1lOiAnZ2x5cGgnLCB0eXBlOiAndmVjMid9LFxuICB7bmFtZTogJ2lkJywgdHlwZTogJ3ZlYzQnfVxuXVxuXG52YXIgcGVyc3BlY3RpdmUgPSB7XG4gICAgdmVydGV4OiBwZXJzcGVjdGl2ZVZlcnRTcmMsXG4gICAgZnJhZ21lbnQ6IGRyYXdGcmFnU3JjLFxuICAgIGF0dHJpYnV0ZXM6IEFUVFJJQlVURVNcbiAgfSxcbiAgb3J0aG8gPSB7XG4gICAgdmVydGV4OiBvcnRob2dyYXBoaWNWZXJ0U3JjLFxuICAgIGZyYWdtZW50OiBkcmF3RnJhZ1NyYyxcbiAgICBhdHRyaWJ1dGVzOiBBVFRSSUJVVEVTXG4gIH0sXG4gIHByb2plY3QgPSB7XG4gICAgdmVydGV4OiBwcm9qZWN0aW9uVmVydFNyYyxcbiAgICBmcmFnbWVudDogZHJhd0ZyYWdTcmMsXG4gICAgYXR0cmlidXRlczogQVRUUklCVVRFU1xuICB9LFxuICBwaWNrUGVyc3BlY3RpdmUgPSB7XG4gICAgdmVydGV4OiBwZXJzcGVjdGl2ZVZlcnRTcmMsXG4gICAgZnJhZ21lbnQ6IHBpY2tGcmFnU3JjLFxuICAgIGF0dHJpYnV0ZXM6IEFUVFJJQlVURVNcbiAgfSxcbiAgcGlja09ydGhvID0ge1xuICAgIHZlcnRleDogb3J0aG9ncmFwaGljVmVydFNyYyxcbiAgICBmcmFnbWVudDogcGlja0ZyYWdTcmMsXG4gICAgYXR0cmlidXRlczogQVRUUklCVVRFU1xuICB9LFxuICBwaWNrUHJvamVjdCA9IHtcbiAgICB2ZXJ0ZXg6IHByb2plY3Rpb25WZXJ0U3JjLFxuICAgIGZyYWdtZW50OiBwaWNrRnJhZ1NyYyxcbiAgICBhdHRyaWJ1dGVzOiBBVFRSSUJVVEVTXG4gIH1cblxuZnVuY3Rpb24gY3JlYXRlU2hhZGVyKGdsLCBzcmMpIHtcbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcldyYXBwZXIoZ2wsIHNyYylcbiAgdmFyIGF0dHIgPSBzaGFkZXIuYXR0cmlidXRlc1xuICBhdHRyLnBvc2l0aW9uLmxvY2F0aW9uID0gMFxuICBhdHRyLmNvbG9yLmxvY2F0aW9uID0gMVxuICBhdHRyLmdseXBoLmxvY2F0aW9uID0gMlxuICBhdHRyLmlkLmxvY2F0aW9uID0gM1xuICByZXR1cm4gc2hhZGVyXG59XG5cbmV4cG9ydHMuY3JlYXRlUGVyc3BlY3RpdmUgPSBmdW5jdGlvbihnbCkge1xuICByZXR1cm4gY3JlYXRlU2hhZGVyKGdsLCBwZXJzcGVjdGl2ZSlcbn1cbmV4cG9ydHMuY3JlYXRlT3J0aG8gPSBmdW5jdGlvbihnbCkge1xuICByZXR1cm4gY3JlYXRlU2hhZGVyKGdsLCBvcnRobylcbn1cbmV4cG9ydHMuY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uKGdsKSB7XG4gIHJldHVybiBjcmVhdGVTaGFkZXIoZ2wsIHByb2plY3QpXG59XG5leHBvcnRzLmNyZWF0ZVBpY2tQZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uKGdsKSB7XG4gIHJldHVybiBjcmVhdGVTaGFkZXIoZ2wsIHBpY2tQZXJzcGVjdGl2ZSlcbn1cbmV4cG9ydHMuY3JlYXRlUGlja09ydGhvID0gZnVuY3Rpb24oZ2wpIHtcbiAgcmV0dXJuIGNyZWF0ZVNoYWRlcihnbCwgcGlja09ydGhvKVxufVxuZXhwb3J0cy5jcmVhdGVQaWNrUHJvamVjdCA9IGZ1bmN0aW9uKGdsKSB7XG4gIHJldHVybiBjcmVhdGVTaGFkZXIoZ2wsIHBpY2tQcm9qZWN0KVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBpc0FsbEJsYW5rICAgICAgPSByZXF1aXJlKCdpcy1zdHJpbmctYmxhbmsnKVxudmFyIGNyZWF0ZUJ1ZmZlciAgICA9IHJlcXVpcmUoJ2dsLWJ1ZmZlcicpXG52YXIgY3JlYXRlVkFPICAgICAgID0gcmVxdWlyZSgnZ2wtdmFvJylcbnZhciBwb29sICAgICAgICAgICAgPSByZXF1aXJlKCd0eXBlZGFycmF5LXBvb2wnKVxudmFyIG1hdDRtdWx0ICAgICAgICA9IHJlcXVpcmUoJ2dsLW1hdDQvbXVsdGlwbHknKVxudmFyIHNoYWRlcnMgICAgICAgICA9IHJlcXVpcmUoJy4vbGliL3NoYWRlcnMnKVxudmFyIGdldEdseXBoICAgICAgICA9IHJlcXVpcmUoJy4vbGliL2dseXBocycpXG52YXIgZ2V0U2ltcGxlU3RyaW5nID0gcmVxdWlyZSgnLi9saWIvZ2V0LXNpbXBsZS1zdHJpbmcnKVxuXG52YXIgSURFTlRJVFkgPSBbMSwwLDAsMCxcbiAgICAgICAgICAgICAgICAwLDEsMCwwLFxuICAgICAgICAgICAgICAgIDAsMCwxLDAsXG4gICAgICAgICAgICAgICAgMCwwLDAsMV1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVQb2ludENsb3VkXG5cbmZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQoeCwgbSkge1xuICB2YXIgeDAgPSB4WzBdXG4gIHZhciB4MSA9IHhbMV1cbiAgdmFyIHgyID0geFsyXVxuICB2YXIgeDMgPSB4WzNdXG4gIHhbMF0gPSBtWzBdICogeDAgKyBtWzRdICogeDEgKyBtWzhdICAqIHgyICsgbVsxMl0gKiB4M1xuICB4WzFdID0gbVsxXSAqIHgwICsgbVs1XSAqIHgxICsgbVs5XSAgKiB4MiArIG1bMTNdICogeDNcbiAgeFsyXSA9IG1bMl0gKiB4MCArIG1bNl0gKiB4MSArIG1bMTBdICogeDIgKyBtWzE0XSAqIHgzXG4gIHhbM10gPSBtWzNdICogeDAgKyBtWzddICogeDEgKyBtWzExXSAqIHgyICsgbVsxNV0gKiB4M1xuICByZXR1cm4geFxufVxuXG5mdW5jdGlvbiBwcm9qZWN0KHAsIHYsIG0sIHgpIHtcbiAgdHJhbnNmb3JtTWF0NCh4LCB4LCBtKVxuICB0cmFuc2Zvcm1NYXQ0KHgsIHgsIHYpXG4gIHJldHVybiB0cmFuc2Zvcm1NYXQ0KHgsIHgsIHApXG59XG5cbmZ1bmN0aW9uIFNjYXR0ZXJQbG90UGlja1Jlc3VsdChpbmRleCwgcG9zaXRpb24pIHtcbiAgdGhpcy5pbmRleCA9IGluZGV4XG4gIHRoaXMuZGF0YUNvb3JkaW5hdGUgPSB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb25cbn1cblxuZnVuY3Rpb24gZml4T3BhY2l0eShhKSB7XG4gIGlmKGEgPT09IHRydWUpIHJldHVybiAxXG4gIGlmKGEgPiAxKSByZXR1cm4gMVxuICByZXR1cm4gYVxufVxuXG5mdW5jdGlvbiBQb2ludENsb3VkKFxuICBnbCxcbiAgc2hhZGVyLFxuICBvcnRob1NoYWRlcixcbiAgcHJvamVjdFNoYWRlcixcbiAgcG9pbnRCdWZmZXIsXG4gIGNvbG9yQnVmZmVyLFxuICBnbHlwaEJ1ZmZlcixcbiAgaWRCdWZmZXIsXG4gIHZhbyxcbiAgcGlja1BlcnNwZWN0aXZlU2hhZGVyLFxuICBwaWNrT3J0aG9TaGFkZXIsXG4gIHBpY2tQcm9qZWN0U2hhZGVyKSB7XG5cbiAgdGhpcy5nbCAgICAgICAgICAgICAgPSBnbFxuXG4gIHRoaXMucGl4ZWxSYXRpbyAgICAgID0gMVxuXG4gIHRoaXMuc2hhZGVyICAgICAgICAgID0gc2hhZGVyXG4gIHRoaXMub3J0aG9TaGFkZXIgICAgID0gb3J0aG9TaGFkZXJcbiAgdGhpcy5wcm9qZWN0U2hhZGVyICAgPSBwcm9qZWN0U2hhZGVyXG5cbiAgdGhpcy5wb2ludEJ1ZmZlciAgICAgPSBwb2ludEJ1ZmZlclxuICB0aGlzLmNvbG9yQnVmZmVyICAgICA9IGNvbG9yQnVmZmVyXG4gIHRoaXMuZ2x5cGhCdWZmZXIgICAgID0gZ2x5cGhCdWZmZXJcbiAgdGhpcy5pZEJ1ZmZlciAgICAgICAgPSBpZEJ1ZmZlclxuICB0aGlzLnZhbyAgICAgICAgICAgICA9IHZhb1xuICB0aGlzLnZlcnRleENvdW50ICAgICA9IDBcbiAgdGhpcy5saW5lVmVydGV4Q291bnQgPSAwXG5cbiAgdGhpcy5vcGFjaXR5ICAgICAgICAgPSAxXG4gIHRoaXMuaGFzQWxwaGEgICAgICAgID0gZmFsc2VcblxuICB0aGlzLmxpbmVXaWR0aCAgICAgICA9IDBcbiAgdGhpcy5wcm9qZWN0U2NhbGUgICAgPSBbMi4wLzMuMCwgMi4wLzMuMCwgMi4wLzMuMF1cbiAgdGhpcy5wcm9qZWN0T3BhY2l0eSAgPSBbMSwgMSwgMV1cbiAgdGhpcy5wcm9qZWN0SGFzQWxwaGEgID0gZmFsc2VcblxuICB0aGlzLnBpY2tJZCAgICAgICAgICAgICAgICA9IDBcbiAgdGhpcy5waWNrUGVyc3BlY3RpdmVTaGFkZXIgPSBwaWNrUGVyc3BlY3RpdmVTaGFkZXJcbiAgdGhpcy5waWNrT3J0aG9TaGFkZXIgICAgICAgPSBwaWNrT3J0aG9TaGFkZXJcbiAgdGhpcy5waWNrUHJvamVjdFNoYWRlciAgICAgPSBwaWNrUHJvamVjdFNoYWRlclxuICB0aGlzLnBvaW50cyAgICAgICAgICAgICAgICA9IFtdXG5cbiAgdGhpcy5fc2VsZWN0UmVzdWx0ID0gbmV3IFNjYXR0ZXJQbG90UGlja1Jlc3VsdCgwLCBbMCwwLDBdKVxuXG4gIHRoaXMudXNlT3J0aG8gPSB0cnVlXG4gIHRoaXMuYm91bmRzICAgPSBbWyBJbmZpbml0eSxJbmZpbml0eSxJbmZpbml0eV0sXG4gICAgICAgICAgICAgICAgICAgWy1JbmZpbml0eSwtSW5maW5pdHksLUluZmluaXR5XV1cblxuICAvL0F4ZXMgcHJvamVjdGlvbnNcbiAgdGhpcy5heGVzUHJvamVjdCA9IFsgdHJ1ZSwgdHJ1ZSwgdHJ1ZSBdXG4gIHRoaXMuYXhlc0JvdW5kcyA9IFtbLUluZmluaXR5LC1JbmZpbml0eSwtSW5maW5pdHldLFxuICAgICAgICAgICAgICAgICAgICAgWyBJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5XV1cblxuICB0aGlzLmhpZ2hsaWdodElkICAgID0gWzEsMSwxLDFdXG4gIHRoaXMuaGlnaGxpZ2h0U2NhbGUgPSAyXG5cbiAgdGhpcy5jbGlwQm91bmRzID0gW1stSW5maW5pdHksLUluZmluaXR5LC1JbmZpbml0eV0sXG4gICAgICAgICAgICAgICAgICAgICBbIEluZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHldXVxuXG4gIHRoaXMuZGlydHkgPSB0cnVlXG59XG5cbnZhciBwcm90byA9IFBvaW50Q2xvdWQucHJvdG90eXBlXG5cbnByb3RvLnBpY2tTbG90cyA9IDFcblxucHJvdG8uc2V0UGlja0Jhc2UgPSBmdW5jdGlvbihwaWNrQmFzZSkge1xuICB0aGlzLnBpY2tJZCA9IHBpY2tCYXNlXG59XG5cbnByb3RvLmlzVHJhbnNwYXJlbnQgPSBmdW5jdGlvbigpIHtcbiAgaWYodGhpcy5oYXNBbHBoYSkgIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIGlmKHRoaXMuYXhlc1Byb2plY3RbaV0gJiYgdGhpcy5wcm9qZWN0SGFzQWxwaGEpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5wcm90by5pc09wYXF1ZSA9IGZ1bmN0aW9uKCkge1xuICBpZighdGhpcy5oYXNBbHBoYSkgIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIGlmKHRoaXMuYXhlc1Byb2plY3RbaV0gJiYgIXRoaXMucHJvamVjdEhhc0FscGhhKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxudmFyIFZJRVdfU0hBUEUgPSBbMCwwXVxudmFyIFVfVkVDID0gWzAsMCwwXVxudmFyIFZfVkVDID0gWzAsMCwwXVxudmFyIE1VX1ZFQyA9IFswLDAsMCwxXVxudmFyIE1WX1ZFQyA9IFswLDAsMCwxXVxudmFyIFNDUkFUQ0hfTUFUUklYID0gSURFTlRJVFkuc2xpY2UoKVxudmFyIFNDUkFUQ0hfVkVDID0gWzAsMCwwXVxudmFyIENMSVBfQk9VTkRTID0gW1swLDAsMF0sIFswLDAsMF1dXG5cbmZ1bmN0aW9uIHplcm9WZWMoYSkge1xuICBhWzBdID0gYVsxXSA9IGFbMl0gPSAwXG4gIHJldHVybiBhXG59XG5cbmZ1bmN0aW9uIGF1Z21lbnQoaGcsIGFmKSB7XG4gIGhnWzBdID0gYWZbMF1cbiAgaGdbMV0gPSBhZlsxXVxuICBoZ1syXSA9IGFmWzJdXG4gIGhnWzNdID0gMVxuICByZXR1cm4gaGdcbn1cblxuZnVuY3Rpb24gc2V0Q29tcG9uZW50KG91dCwgdiwgaSwgeCkge1xuICBvdXRbMF0gPSB2WzBdXG4gIG91dFsxXSA9IHZbMV1cbiAgb3V0WzJdID0gdlsyXVxuICBvdXRbaV0gPSB4XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpcEJvdW5kcyhib3VuZHMpIHtcbiAgdmFyIHJlc3VsdCA9IENMSVBfQk9VTkRTXG4gIGZvcih2YXIgaT0wOyBpPDI7ICsraSkge1xuICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgcmVzdWx0W2ldW2pdID0gTWF0aC5tYXgoTWF0aC5taW4oYm91bmRzW2ldW2pdLCAxZTgpLCAtMWU4KVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGRyYXdQcm9qZWN0KHNoYWRlciwgcG9pbnRzLCBjYW1lcmEsIHBpeGVsUmF0aW8pIHtcbiAgdmFyIGF4ZXNQcm9qZWN0ID0gcG9pbnRzLmF4ZXNQcm9qZWN0XG5cbiAgdmFyIGdsICAgICAgICAgPSBwb2ludHMuZ2xcbiAgdmFyIHVuaWZvcm1zICAgPSBzaGFkZXIudW5pZm9ybXNcbiAgdmFyIG1vZGVsICAgICAgPSBjYW1lcmEubW9kZWwgICAgICB8fCBJREVOVElUWVxuICB2YXIgdmlldyAgICAgICA9IGNhbWVyYS52aWV3ICAgICAgIHx8IElERU5USVRZXG4gIHZhciBwcm9qZWN0aW9uID0gY2FtZXJhLnByb2plY3Rpb24gfHwgSURFTlRJVFlcbiAgdmFyIGJvdW5kcyAgICAgPSBwb2ludHMuYXhlc0JvdW5kc1xuICB2YXIgY2xpcEJvdW5kcyA9IGdldENsaXBCb3VuZHMocG9pbnRzLmNsaXBCb3VuZHMpXG5cbiAgdmFyIGN1YmVBeGlzXG4gIGlmKHBvaW50cy5heGVzICYmIHBvaW50cy5heGVzLmxhc3RDdWJlUHJvcHMpIHtcbiAgICBjdWJlQXhpcyA9IHBvaW50cy5heGVzLmxhc3RDdWJlUHJvcHMuYXhpc1xuICB9IGVsc2Uge1xuICAgIGN1YmVBeGlzID0gWzEsMSwxXVxuICB9XG5cbiAgVklFV19TSEFQRVswXSA9IDIuMC9nbC5kcmF3aW5nQnVmZmVyV2lkdGhcbiAgVklFV19TSEFQRVsxXSA9IDIuMC9nbC5kcmF3aW5nQnVmZmVySGVpZ2h0XG5cbiAgc2hhZGVyLmJpbmQoKVxuICB1bmlmb3Jtcy52aWV3ICAgICAgICAgICA9IHZpZXdcbiAgdW5pZm9ybXMucHJvamVjdGlvbiAgICAgPSBwcm9qZWN0aW9uXG4gIHVuaWZvcm1zLnNjcmVlblNpemUgICAgID0gVklFV19TSEFQRVxuICB1bmlmb3Jtcy5oaWdobGlnaHRJZCAgICA9IHBvaW50cy5oaWdobGlnaHRJZFxuICB1bmlmb3Jtcy5oaWdobGlnaHRTY2FsZSA9IHBvaW50cy5oaWdobGlnaHRTY2FsZVxuICB1bmlmb3Jtcy5jbGlwQm91bmRzICAgICA9IGNsaXBCb3VuZHNcbiAgdW5pZm9ybXMucGlja0dyb3VwICAgICAgPSBwb2ludHMucGlja0lkIC8gMjU1LjBcbiAgdW5pZm9ybXMucGl4ZWxSYXRpbyAgICAgPSBwaXhlbFJhdGlvXG5cbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgaWYoIWF4ZXNQcm9qZWN0W2ldKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHVuaWZvcm1zLnNjYWxlICAgICAgICAgID0gcG9pbnRzLnByb2plY3RTY2FsZVtpXVxuICAgIHVuaWZvcm1zLm9wYWNpdHkgICAgICAgID0gcG9pbnRzLnByb2plY3RPcGFjaXR5W2ldXG5cbiAgICAvL1Byb2plY3QgbW9kZWwgbWF0cml4XG4gICAgdmFyIHBtb2RlbCA9IFNDUkFUQ0hfTUFUUklYXG4gICAgZm9yKHZhciBqPTA7IGo8MTY7ICsraikge1xuICAgICAgcG1vZGVsW2pdID0gMFxuICAgIH1cbiAgICBmb3IodmFyIGo9MDsgajw0OyArK2opIHtcbiAgICAgIHBtb2RlbFs1KmpdID0gMVxuICAgIH1cbiAgICBwbW9kZWxbNSppXSA9IDBcbiAgICBpZihjdWJlQXhpc1tpXSA8IDApIHtcbiAgICAgIHBtb2RlbFsxMitpXSA9IGJvdW5kc1swXVtpXVxuICAgIH0gZWxzZSB7XG4gICAgICBwbW9kZWxbMTIraV0gPSBib3VuZHNbMV1baV1cbiAgICB9XG4gICAgbWF0NG11bHQocG1vZGVsLCBtb2RlbCwgcG1vZGVsKVxuICAgIHVuaWZvcm1zLm1vZGVsID0gcG1vZGVsXG5cbiAgICAvL0NvbXB1dGUgaW5pdGlhbCBheGVzXG4gICAgdmFyIHUgPSAoaSsxKSUzXG4gICAgdmFyIHYgPSAoaSsyKSUzXG4gICAgdmFyIGR1ID0gemVyb1ZlYyhVX1ZFQylcbiAgICB2YXIgZHYgPSB6ZXJvVmVjKFZfVkVDKVxuICAgIGR1W3VdID0gMVxuICAgIGR2W3ZdID0gMVxuXG4gICAgLy9BbGlnbiBvcmllbnRhdGlvbiByZWxhdGl2ZSB0byB2aWV3ZXJcbiAgICB2YXIgbWR1ID0gcHJvamVjdChwcm9qZWN0aW9uLCB2aWV3LCBtb2RlbCwgYXVnbWVudChNVV9WRUMsIGR1KSlcbiAgICB2YXIgbWR2ID0gcHJvamVjdChwcm9qZWN0aW9uLCB2aWV3LCBtb2RlbCwgYXVnbWVudChNVl9WRUMsIGR2KSlcbiAgICBpZihNYXRoLmFicyhtZHVbMV0pID4gTWF0aC5hYnMobWR2WzFdKSkge1xuICAgICAgdmFyIHRtcCA9IG1kdVxuICAgICAgbWR1ID0gbWR2XG4gICAgICBtZHYgPSB0bXBcbiAgICAgIHRtcCA9IGR1XG4gICAgICBkdSA9IGR2XG4gICAgICBkdiA9IHRtcFxuICAgICAgdmFyIHQgPSB1XG4gICAgICB1ID0gdlxuICAgICAgdiA9IHRcbiAgICB9XG4gICAgaWYobWR1WzBdIDwgMCkge1xuICAgICAgZHVbdV0gPSAtMVxuICAgIH1cbiAgICBpZihtZHZbMV0gPiAwKSB7XG4gICAgICBkdlt2XSA9IC0xXG4gICAgfVxuICAgIHZhciBzdSA9IDAuMFxuICAgIHZhciBzdiA9IDAuMFxuICAgIGZvcih2YXIgaj0wOyBqPDQ7ICsraikge1xuICAgICAgc3UgKz0gTWF0aC5wb3cobW9kZWxbNCp1K2pdLCAyKVxuICAgICAgc3YgKz0gTWF0aC5wb3cobW9kZWxbNCp2K2pdLCAyKVxuICAgIH1cbiAgICBkdVt1XSAvPSBNYXRoLnNxcnQoc3UpXG4gICAgZHZbdl0gLz0gTWF0aC5zcXJ0KHN2KVxuICAgIHVuaWZvcm1zLmF4ZXNbMF0gPSBkdVxuICAgIHVuaWZvcm1zLmF4ZXNbMV0gPSBkdlxuXG4gICAgLy9VcGRhdGUgZnJhZ21lbnQgY2xpcCBib3VuZHNcbiAgICB1bmlmb3Jtcy5mcmFnQ2xpcEJvdW5kc1swXSA9IHNldENvbXBvbmVudChTQ1JBVENIX1ZFQywgY2xpcEJvdW5kc1swXSwgaSwgLTFlOClcbiAgICB1bmlmb3Jtcy5mcmFnQ2xpcEJvdW5kc1sxXSA9IHNldENvbXBvbmVudChTQ1JBVENIX1ZFQywgY2xpcEJvdW5kc1sxXSwgaSwgMWU4KVxuXG4gICAgcG9pbnRzLnZhby5iaW5kKClcblxuICAgIC8vRHJhdyBpbnRlcmlvclxuICAgIHBvaW50cy52YW8uZHJhdyhnbC5UUklBTkdMRVMsIHBvaW50cy52ZXJ0ZXhDb3VudClcblxuICAgIC8vRHJhdyBlZGdlc1xuICAgIGlmKHBvaW50cy5saW5lV2lkdGggPiAwKSB7XG4gICAgICBnbC5saW5lV2lkdGgocG9pbnRzLmxpbmVXaWR0aCAqIHBpeGVsUmF0aW8pXG4gICAgICBwb2ludHMudmFvLmRyYXcoZ2wuTElORVMsIHBvaW50cy5saW5lVmVydGV4Q291bnQsIHBvaW50cy52ZXJ0ZXhDb3VudClcbiAgICB9XG5cbiAgICBwb2ludHMudmFvLnVuYmluZCgpXG4gIH1cbn1cblxuXG52YXIgTkVHX0lORklOSVRZMyA9IFstMWU4LCAtMWU4LCAtMWU4XVxudmFyIFBPU19JTkZJTklUWTMgPSBbMWU4LCAxZTgsIDFlOF1cbnZhciBDTElQX0dST1VQICAgID0gW05FR19JTkZJTklUWTMsIFBPU19JTkZJTklUWTNdXG5cbmZ1bmN0aW9uIGRyYXdGdWxsKHNoYWRlciwgcHNoYWRlciwgcG9pbnRzLCBjYW1lcmEsIHBpeGVsUmF0aW8sIHRyYW5zcGFyZW50LCBmb3JjZURyYXcpIHtcbiAgdmFyIGdsID0gcG9pbnRzLmdsXG5cbiAgaWYodHJhbnNwYXJlbnQgPT09IHBvaW50cy5wcm9qZWN0SGFzQWxwaGEgfHwgZm9yY2VEcmF3KSB7XG4gICAgZHJhd1Byb2plY3QocHNoYWRlciwgcG9pbnRzLCBjYW1lcmEsIHBpeGVsUmF0aW8pXG4gIH1cblxuICBpZih0cmFuc3BhcmVudCA9PT0gcG9pbnRzLmhhc0FscGhhIHx8IGZvcmNlRHJhdykge1xuXG4gICAgc2hhZGVyLmJpbmQoKVxuICAgIHZhciB1bmlmb3JtcyA9IHNoYWRlci51bmlmb3Jtc1xuXG4gICAgdW5pZm9ybXMubW9kZWwgICAgICA9IGNhbWVyYS5tb2RlbCAgICAgIHx8IElERU5USVRZXG4gICAgdW5pZm9ybXMudmlldyAgICAgICA9IGNhbWVyYS52aWV3ICAgICAgIHx8IElERU5USVRZXG4gICAgdW5pZm9ybXMucHJvamVjdGlvbiA9IGNhbWVyYS5wcm9qZWN0aW9uIHx8IElERU5USVRZXG5cbiAgICBWSUVXX1NIQVBFWzBdICAgICAgID0gMi4wL2dsLmRyYXdpbmdCdWZmZXJXaWR0aFxuICAgIFZJRVdfU0hBUEVbMV0gICAgICAgPSAyLjAvZ2wuZHJhd2luZ0J1ZmZlckhlaWdodFxuICAgIHVuaWZvcm1zLnNjcmVlblNpemUgPSBWSUVXX1NIQVBFXG5cbiAgICB1bmlmb3Jtcy5oaWdobGlnaHRJZCAgICA9IHBvaW50cy5oaWdobGlnaHRJZFxuICAgIHVuaWZvcm1zLmhpZ2hsaWdodFNjYWxlID0gcG9pbnRzLmhpZ2hsaWdodFNjYWxlXG5cbiAgICB1bmlmb3Jtcy5mcmFnQ2xpcEJvdW5kcyA9IENMSVBfR1JPVVBcbiAgICB1bmlmb3Jtcy5jbGlwQm91bmRzICAgICA9IHBvaW50cy5heGVzLmJvdW5kc1xuXG4gICAgdW5pZm9ybXMub3BhY2l0eSAgICA9IHBvaW50cy5vcGFjaXR5XG4gICAgdW5pZm9ybXMucGlja0dyb3VwICA9IHBvaW50cy5waWNrSWQgLyAyNTUuMFxuXG4gICAgdW5pZm9ybXMucGl4ZWxSYXRpbyA9IHBpeGVsUmF0aW9cblxuICAgIHBvaW50cy52YW8uYmluZCgpXG5cbiAgICAvL0RyYXcgaW50ZXJpb3JcbiAgICBwb2ludHMudmFvLmRyYXcoZ2wuVFJJQU5HTEVTLCBwb2ludHMudmVydGV4Q291bnQpXG5cbiAgICAvL0RyYXcgZWRnZXNcbiAgICBpZihwb2ludHMubGluZVdpZHRoID4gMCkge1xuICAgICAgZ2wubGluZVdpZHRoKHBvaW50cy5saW5lV2lkdGggKiBwaXhlbFJhdGlvKVxuICAgICAgcG9pbnRzLnZhby5kcmF3KGdsLkxJTkVTLCBwb2ludHMubGluZVZlcnRleENvdW50LCBwb2ludHMudmVydGV4Q291bnQpXG4gICAgfVxuXG4gICAgcG9pbnRzLnZhby51bmJpbmQoKVxuICB9XG5cblxufVxuXG5wcm90by5kcmF3ID0gZnVuY3Rpb24oY2FtZXJhKSB7XG4gIHZhciBzaGFkZXIgPSB0aGlzLnVzZU9ydGhvID8gdGhpcy5vcnRob1NoYWRlciA6IHRoaXMuc2hhZGVyXG4gIGRyYXdGdWxsKHNoYWRlciwgdGhpcy5wcm9qZWN0U2hhZGVyLCB0aGlzLCBjYW1lcmEsIHRoaXMucGl4ZWxSYXRpbywgZmFsc2UsIGZhbHNlKVxufVxuXG5wcm90by5kcmF3VHJhbnNwYXJlbnQgPSBmdW5jdGlvbihjYW1lcmEpIHtcbiAgdmFyIHNoYWRlciA9IHRoaXMudXNlT3J0aG8gPyB0aGlzLm9ydGhvU2hhZGVyIDogdGhpcy5zaGFkZXJcbiAgZHJhd0Z1bGwoc2hhZGVyLCB0aGlzLnByb2plY3RTaGFkZXIsIHRoaXMsIGNhbWVyYSwgdGhpcy5waXhlbFJhdGlvLCB0cnVlLCBmYWxzZSlcbn1cblxucHJvdG8uZHJhd1BpY2sgPSBmdW5jdGlvbihjYW1lcmEpIHtcbiAgdmFyIHNoYWRlciA9IHRoaXMudXNlT3J0aG8gPyB0aGlzLnBpY2tPcnRob1NoYWRlciA6IHRoaXMucGlja1BlcnNwZWN0aXZlU2hhZGVyXG4gIGRyYXdGdWxsKHNoYWRlciwgdGhpcy5waWNrUHJvamVjdFNoYWRlciwgdGhpcywgY2FtZXJhLCAxLCB0cnVlLCB0cnVlKVxufVxuXG5wcm90by5waWNrID0gZnVuY3Rpb24oc2VsZWN0ZWQpIHtcbiAgaWYoIXNlbGVjdGVkKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBpZihzZWxlY3RlZC5pZCAhPT0gdGhpcy5waWNrSWQpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHZhciB4ID0gc2VsZWN0ZWQudmFsdWVbMl0gKyAoc2VsZWN0ZWQudmFsdWVbMV08PDgpICsgKHNlbGVjdGVkLnZhbHVlWzBdPDwxNilcbiAgaWYoeCA+PSB0aGlzLnBvaW50Q291bnQgfHwgeCA8IDApIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLy9VbnBhY2sgcmVzdWx0XG4gIHZhciBjb29yZCA9IHRoaXMucG9pbnRzW3hdXG4gIHZhciByZXN1bHQgPSB0aGlzLl9zZWxlY3RSZXN1bHRcbiAgcmVzdWx0LmluZGV4ID0geFxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICByZXN1bHQucG9zaXRpb25baV0gPSByZXN1bHQuZGF0YUNvb3JkaW5hdGVbaV0gPSBjb29yZFtpXVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxucHJvdG8uaGlnaGxpZ2h0ID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG4gIGlmKCFzZWxlY3Rpb24pIHtcbiAgICB0aGlzLmhpZ2hsaWdodElkID0gWzEsMSwxLDFdXG4gIH0gZWxzZSB7XG4gICAgdmFyIHBvaW50SWQgPSBzZWxlY3Rpb24uaW5kZXhcbiAgICB2YXIgYTAgPSAgcG9pbnRJZCAgICAgJjB4ZmZcbiAgICB2YXIgYTEgPSAocG9pbnRJZD4+OCkgJjB4ZmZcbiAgICB2YXIgYTIgPSAocG9pbnRJZD4+MTYpJjB4ZmZcbiAgICB0aGlzLmhpZ2hsaWdodElkID0gW2EwLzI1NS4wLCBhMS8yNTUuMCwgYTIvMjU1LjAsIDBdXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0X2dseXBoRGF0YShnbHlwaHMsIGluZGV4LCBmb250LCBwaXhlbFJhdGlvKSB7XG4gIHZhciBzdHJcblxuICAvLyB1c2UgdGhlIGRhdGEgaWYgcHJlc2VudGVkIGluIGFuIGFycmF5XG4gIGlmKEFycmF5LmlzQXJyYXkoZ2x5cGhzKSkge1xuICAgIGlmKGluZGV4IDwgZ2x5cGhzLmxlbmd0aCkge1xuICAgICAgc3RyID0gZ2x5cGhzW2luZGV4XVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3RyID0gZ2x5cGhzXG4gIH1cblxuICBzdHIgPSBnZXRTaW1wbGVTdHJpbmcoc3RyKSAvLyB0aGlzIHdvdWxkIGhhbmRsZSB1bmRlZmluZWQgY2FzZXNcblxuICB2YXIgdmlzaWJsZSA9IHRydWVcbiAgaWYoaXNBbGxCbGFuayhzdHIpKSB7XG4gICAgc3RyID0gJ+KWvCcgLy8gTm90ZTogdGhpcyBzcGVjaWFsIGNoYXJhY3RlciBtYXkgaGF2ZSBtaW5pbXVtIG51bWJlciBvZiBzdXJmYWNlc1xuICAgIHZpc2libGUgPSBmYWxzZVxuICB9XG5cbiAgdmFyIGdseXBoID0gZ2V0R2x5cGgoc3RyLCBmb250LCBwaXhlbFJhdGlvKVxuXG4gIHJldHVybiB7IG1lc2g6Z2x5cGhbMF0sXG4gICAgICAgICAgbGluZXM6Z2x5cGhbMV0sXG4gICAgICAgICBib3VuZHM6Z2x5cGhbMl0sXG4gICAgICAgIHZpc2libGU6dmlzaWJsZSB9O1xufVxuXG5cblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgaWYoJ3BlcnNwZWN0aXZlJyBpbiBvcHRpb25zKSB7XG4gICAgdGhpcy51c2VPcnRobyA9ICFvcHRpb25zLnBlcnNwZWN0aXZlXG4gIH1cbiAgaWYoJ29ydGhvZ3JhcGhpYycgaW4gb3B0aW9ucykge1xuICAgIHRoaXMudXNlT3J0aG8gPSAhIW9wdGlvbnMub3J0aG9ncmFwaGljXG4gIH1cbiAgaWYoJ2xpbmVXaWR0aCcgaW4gb3B0aW9ucykge1xuICAgIHRoaXMubGluZVdpZHRoID0gb3B0aW9ucy5saW5lV2lkdGhcbiAgfVxuICBpZigncHJvamVjdCcgaW4gb3B0aW9ucykge1xuICAgIGlmKEFycmF5LmlzQXJyYXkob3B0aW9ucy5wcm9qZWN0KSkge1xuICAgICAgdGhpcy5heGVzUHJvamVjdCA9IG9wdGlvbnMucHJvamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdiA9ICEhb3B0aW9ucy5wcm9qZWN0XG4gICAgICB0aGlzLmF4ZXNQcm9qZWN0ID0gW3Ysdix2XVxuICAgIH1cbiAgfVxuICBpZigncHJvamVjdFNjYWxlJyBpbiBvcHRpb25zKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheShvcHRpb25zLnByb2plY3RTY2FsZSkpIHtcbiAgICAgIHRoaXMucHJvamVjdFNjYWxlID0gb3B0aW9ucy5wcm9qZWN0U2NhbGUuc2xpY2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcyA9ICtvcHRpb25zLnByb2plY3RTY2FsZVxuICAgICAgdGhpcy5wcm9qZWN0U2NhbGUgPSBbcyxzLHNdXG4gICAgfVxuICB9XG5cbiAgdGhpcy5wcm9qZWN0SGFzQWxwaGEgPSBmYWxzZSAvLyBkZWZhdWx0IHRvIG5vIHRyYW5zcGFyZW50IGRyYXdcbiAgaWYoJ3Byb2plY3RPcGFjaXR5JyBpbiBvcHRpb25zKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheShvcHRpb25zLnByb2plY3RPcGFjaXR5KSkge1xuICAgICAgdGhpcy5wcm9qZWN0T3BhY2l0eSA9IG9wdGlvbnMucHJvamVjdE9wYWNpdHkuc2xpY2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcyA9ICtvcHRpb25zLnByb2plY3RPcGFjaXR5XG4gICAgICB0aGlzLnByb2plY3RPcGFjaXR5ID0gW3MscyxzXVxuICAgIH1cbiAgICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICAgIHRoaXMucHJvamVjdE9wYWNpdHlbaV0gPSBmaXhPcGFjaXR5KHRoaXMucHJvamVjdE9wYWNpdHlbaV0pO1xuICAgICAgaWYodGhpcy5wcm9qZWN0T3BhY2l0eVtpXSA8IDEpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0SGFzQWxwaGEgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuaGFzQWxwaGEgPSBmYWxzZSAvLyBkZWZhdWx0IHRvIG5vIHRyYW5zcGFyZW50IGRyYXdcbiAgaWYoJ29wYWNpdHknIGluIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wYWNpdHkgPSBmaXhPcGFjaXR5KG9wdGlvbnMub3BhY2l0eSlcbiAgICBpZih0aGlzLm9wYWNpdHkgPCAxKSB7XG4gICAgICB0aGlzLmhhc0FscGhhID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvL1NldCBkaXJ0eSBmbGFnXG4gIHRoaXMuZGlydHkgPSB0cnVlXG5cbiAgLy9DcmVhdGUgbmV3IGJ1ZmZlcnNcbiAgdmFyIHBvaW50cyA9IG9wdGlvbnMucG9zaXRpb25cblxuICAvL1RleHQgZm9udFxuICB2YXIgZm9udCAgICAgID0gb3B0aW9ucy5mb250ICAgICAgfHwgJ25vcm1hbCdcbiAgdmFyIGFsaWdubWVudCA9IG9wdGlvbnMuYWxpZ25tZW50IHx8IFswLDBdXG5cbiAgdmFyIGFsaWdubWVudFg7XG4gIHZhciBhbGlnbm1lbnRZO1xuICBpZiAoYWxpZ25tZW50Lmxlbmd0aCA9PT0gMikge1xuICAgIGFsaWdubWVudFggPSBhbGlnbm1lbnRbMF1cbiAgICBhbGlnbm1lbnRZID0gYWxpZ25tZW50WzFdXG4gIH0gZWxzZSB7XG4gICAgYWxpZ25tZW50WCA9IFtdXG4gICAgYWxpZ25tZW50WSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGlnbm1lbnQubGVuZ3RoOyArK2kpIHtcbiAgICAgIGFsaWdubWVudFhbaV0gPSBhbGlnbm1lbnRbaV1bMF1cbiAgICAgIGFsaWdubWVudFlbaV0gPSBhbGlnbm1lbnRbaV1bMV1cbiAgICB9XG4gIH1cblxuICAvL0JvdW5kc1xuICB2YXIgbG93ZXJCb3VuZCA9IFsgSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eV1cbiAgdmFyIHVwcGVyQm91bmQgPSBbLUluZmluaXR5LC1JbmZpbml0eSwtSW5maW5pdHldXG5cbiAgLy9VbnBhY2sgb3B0aW9uc1xuICB2YXIgZ2x5cGhzICAgICA9IG9wdGlvbnMuZ2x5cGhcbiAgdmFyIGNvbG9ycyAgICAgPSBvcHRpb25zLmNvbG9yXG4gIHZhciBzaXplcyAgICAgID0gb3B0aW9ucy5zaXplXG4gIHZhciBhbmdsZXMgICAgID0gb3B0aW9ucy5hbmdsZVxuICB2YXIgbGluZUNvbG9ycyA9IG9wdGlvbnMubGluZUNvbG9yXG5cbiAgLy9QaWNraW5nIGdlb21ldHJ5XG4gIHZhciBwaWNrQ291bnRlciA9IC0xXG5cbiAgLy9GaXJzdCBkbyBwYXNzIHRvIGNvbXB1dGUgYnVmZmVyIHNpemVzXG4gIHZhciB0cmlWZXJ0ZXhDb3VudCAgPSAwXG4gIHZhciBsaW5lVmVydGV4Q291bnQgPSAwXG5cbiAgdmFyIG51bVBvaW50cyA9IDA7XG5cbiAgaWYocG9pbnRzLmxlbmd0aCkge1xuXG4gICAgLy9Db3VudCBudW1iZXIgb2YgcG9pbnRzIGFuZCBidWZmZXIgc2l6ZVxuICAgIG51bVBvaW50cyA9IHBvaW50cy5sZW5ndGhcblxuICBjb3VudF9sb29wOlxuICAgIGZvcih2YXIgaT0wOyBpPG51bVBvaW50czsgKytpKSB7XG4gICAgICB2YXIgeCA9IHBvaW50c1tpXVxuICAgICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICAgIGlmKGlzTmFOKHhbal0pIHx8ICFpc0Zpbml0ZSh4W2pdKSkge1xuICAgICAgICAgIGNvbnRpbnVlIGNvdW50X2xvb3BcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZ2x5cGhEYXRhID0gZ2V0X2dseXBoRGF0YShnbHlwaHMsIGksIGZvbnQsIHRoaXMucGl4ZWxSYXRpbylcblxuICAgICAgdmFyIGdseXBoTWVzaCAgID0gZ2x5cGhEYXRhLm1lc2hcbiAgICAgIHZhciBnbHlwaExpbmVzICA9IGdseXBoRGF0YS5saW5lc1xuICAgICAgdmFyIGdseXBoQm91bmRzID0gZ2x5cGhEYXRhLmJvdW5kc1xuXG4gICAgICB0cmlWZXJ0ZXhDb3VudCAgKz0gZ2x5cGhNZXNoLmNlbGxzLmxlbmd0aCAqIDNcbiAgICAgIGxpbmVWZXJ0ZXhDb3VudCArPSBnbHlwaExpbmVzLmVkZ2VzLmxlbmd0aCAqIDJcbiAgICB9XG4gIH1cblxuICB2YXIgdmVydGV4Q291bnQgICA9IHRyaVZlcnRleENvdW50ICsgbGluZVZlcnRleENvdW50XG5cbiAgLy9QcmVhbGxvY2F0ZSBkYXRhXG4gIHZhciBwb3NpdGlvbkFycmF5ID0gcG9vbC5tYWxsb2NGbG9hdCgzKnZlcnRleENvdW50KVxuICB2YXIgY29sb3JBcnJheSAgICA9IHBvb2wubWFsbG9jRmxvYXQoNCp2ZXJ0ZXhDb3VudClcbiAgdmFyIGdseXBoQXJyYXkgICAgPSBwb29sLm1hbGxvY0Zsb2F0KDIqdmVydGV4Q291bnQpXG4gIHZhciBpZEFycmF5ICAgICAgID0gcG9vbC5tYWxsb2NVaW50MzIodmVydGV4Q291bnQpXG5cbiAgaWYodmVydGV4Q291bnQgPiAwKSB7XG4gICAgdmFyIHRyaU9mZnNldCAgPSAwXG4gICAgdmFyIGxpbmVPZmZzZXQgPSB0cmlWZXJ0ZXhDb3VudFxuICAgIHZhciBjb2xvciAgICAgID0gWzAsMCwwLDFdXG4gICAgdmFyIGxpbmVDb2xvciAgPSBbMCwwLDAsMV1cblxuICAgIHZhciBpc0NvbG9yQXJyYXkgICAgICA9IEFycmF5LmlzQXJyYXkoY29sb3JzKSAgICAgJiYgQXJyYXkuaXNBcnJheShjb2xvcnNbMF0pXG4gICAgdmFyIGlzTGluZUNvbG9yQXJyYXkgID0gQXJyYXkuaXNBcnJheShsaW5lQ29sb3JzKSAmJiBBcnJheS5pc0FycmF5KGxpbmVDb2xvcnNbMF0pXG5cbiAgZmlsbF9sb29wOlxuICAgIGZvcih2YXIgaT0wOyBpPG51bVBvaW50czsgKytpKSB7XG4gICAgICAvL0luY3JlbWVudCBwaWNrQ291bnRlclxuICAgICAgcGlja0NvdW50ZXIgKz0gMVxuXG4gICAgICB2YXIgeCA9IHBvaW50c1tpXVxuICAgICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICAgIGlmKGlzTmFOKHhbal0pIHx8ICFpc0Zpbml0ZSh4W2pdKSkge1xuICAgICAgICAgIGNvbnRpbnVlIGZpbGxfbG9vcFxuICAgICAgICB9XG5cbiAgICAgICAgdXBwZXJCb3VuZFtqXSA9IE1hdGgubWF4KHVwcGVyQm91bmRbal0sIHhbal0pXG4gICAgICAgIGxvd2VyQm91bmRbal0gPSBNYXRoLm1pbihsb3dlckJvdW5kW2pdLCB4W2pdKVxuICAgICAgfVxuXG4gICAgICB2YXIgZ2x5cGhEYXRhID0gZ2V0X2dseXBoRGF0YShnbHlwaHMsIGksIGZvbnQsIHRoaXMucGl4ZWxSYXRpbylcblxuICAgICAgdmFyIGdseXBoTWVzaCAgID0gZ2x5cGhEYXRhLm1lc2hcbiAgICAgIHZhciBnbHlwaExpbmVzICA9IGdseXBoRGF0YS5saW5lc1xuICAgICAgdmFyIGdseXBoQm91bmRzID0gZ2x5cGhEYXRhLmJvdW5kc1xuICAgICAgdmFyIGdseXBoVmlzaWJsZSA9IGdseXBoRGF0YS52aXNpYmxlXG5cbiAgICAgIC8vR2V0IGNvbG9yXG4gICAgICBpZighZ2x5cGhWaXNpYmxlKSBjb2xvciA9IFsxLDEsMSwwXVxuICAgICAgZWxzZSBpZihBcnJheS5pc0FycmF5KGNvbG9ycykpIHtcbiAgICAgICAgdmFyIGNcbiAgICAgICAgaWYoaXNDb2xvckFycmF5KSB7XG4gICAgICAgICAgaWYoaSA8IGNvbG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGMgPSBjb2xvcnNbaV1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYyA9IFswLDAsMCwwXVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjID0gY29sb3JzXG4gICAgICAgIH1cblxuICAgICAgICBpZihjLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgICAgICAgY29sb3Jbal0gPSBjW2pdXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbG9yWzNdID0gMVxuICAgICAgICB9IGVsc2UgaWYoYy5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICBmb3IodmFyIGo9MDsgajw0OyArK2opIHtcbiAgICAgICAgICAgIGNvbG9yW2pdID0gY1tqXVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZighdGhpcy5oYXNBbHBoYSAmJiBjWzNdIDwgMSkgdGhpcy5oYXNBbHBoYSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sb3JbMF0gPSBjb2xvclsxXSA9IGNvbG9yWzJdID0gMFxuICAgICAgICBjb2xvclszXSA9IDFcbiAgICAgIH1cblxuXG4gICAgICAvL0dldCBsaW5lQ29sb3JcbiAgICAgIGlmKCFnbHlwaFZpc2libGUpIGxpbmVDb2xvciA9IFsxLDEsMSwwXVxuICAgICAgZWxzZSBpZihBcnJheS5pc0FycmF5KGxpbmVDb2xvcnMpKSB7XG4gICAgICAgIHZhciBjXG4gICAgICAgIGlmKGlzTGluZUNvbG9yQXJyYXkpIHtcbiAgICAgICAgICBpZihpIDwgbGluZUNvbG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGMgPSBsaW5lQ29sb3JzW2ldXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGMgPSBbMCwwLDAsMF1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYyA9IGxpbmVDb2xvcnNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICAgICAgICBsaW5lQ29sb3Jbal0gPSBjW2pdXG4gICAgICAgICAgfVxuICAgICAgICAgIGxpbmVDb2xvcltqXSA9IDFcbiAgICAgICAgfSBlbHNlIGlmKGMubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8NDsgKytqKSB7XG4gICAgICAgICAgICBsaW5lQ29sb3Jbal0gPSBjW2pdXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKCF0aGlzLmhhc0FscGhhICYmIGNbM10gPCAxKSB0aGlzLmhhc0FscGhhID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5lQ29sb3JbMF0gPSBsaW5lQ29sb3JbMV0gPSBsaW5lQ29sb3JbMl0gPSAwXG4gICAgICAgIGxpbmVDb2xvclszXSA9IDFcbiAgICAgIH1cblxuXG4gICAgICB2YXIgc2l6ZSA9IDAuNVxuICAgICAgaWYoIWdseXBoVmlzaWJsZSkgc2l6ZSA9IDAuMFxuICAgICAgZWxzZSBpZihBcnJheS5pc0FycmF5KHNpemVzKSkge1xuICAgICAgICBpZihpIDwgc2l6ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgc2l6ZSA9ICtzaXplc1tpXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNpemUgPSAxMlxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoc2l6ZXMpIHtcbiAgICAgICAgc2l6ZSA9ICtzaXplc1xuICAgICAgfSBlbHNlIGlmKHRoaXMudXNlT3J0aG8pIHtcbiAgICAgICAgc2l6ZSA9IDEyXG4gICAgICB9XG5cblxuICAgICAgdmFyIGFuZ2xlID0gMFxuICAgICAgaWYoQXJyYXkuaXNBcnJheShhbmdsZXMpKSB7XG4gICAgICAgIGlmKGkgPCBhbmdsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgYW5nbGUgPSArYW5nbGVzW2ldXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYW5nbGUgPSAwXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZihhbmdsZXMpIHtcbiAgICAgICAgYW5nbGUgPSArYW5nbGVzXG4gICAgICB9XG5cbiAgICAgIC8vTG9vcCB0aHJvdWdoIG1hcmtlcnMgYW5kIGFwcGVuZCB0byBidWZmZXJzXG4gICAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpXG4gICAgICB2YXIgc2luID0gTWF0aC5zaW4oYW5nbGUpXG5cbiAgICAgIHZhciB4ID0gcG9pbnRzW2ldXG4gICAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgICAgdXBwZXJCb3VuZFtqXSA9IE1hdGgubWF4KHVwcGVyQm91bmRbal0sIHhbal0pXG4gICAgICAgIGxvd2VyQm91bmRbal0gPSBNYXRoLm1pbihsb3dlckJvdW5kW2pdLCB4W2pdKVxuICAgICAgfVxuXG4gICAgICAvL0NhbGN1bGF0ZSB0ZXh0IG9mZnNldFxuICAgICAgdmFyIHRleHRPZmZzZXRYID0gYWxpZ25tZW50WFxuICAgICAgdmFyIHRleHRPZmZzZXRZID0gYWxpZ25tZW50WVxuXG4gICAgICB2YXIgdGV4dE9mZnNldFggPSAwXG4gICAgICBpZihBcnJheS5pc0FycmF5KGFsaWdubWVudFgpKSB7XG4gICAgICAgIGlmKGkgPCBhbGlnbm1lbnRYLmxlbmd0aCkge1xuICAgICAgICAgIHRleHRPZmZzZXRYID0gYWxpZ25tZW50WFtpXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHRPZmZzZXRYID0gMFxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoYWxpZ25tZW50WCkge1xuICAgICAgICB0ZXh0T2Zmc2V0WCA9IGFsaWdubWVudFhcbiAgICAgIH1cblxuICAgICAgdmFyIHRleHRPZmZzZXRZID0gMFxuICAgICAgaWYoQXJyYXkuaXNBcnJheShhbGlnbm1lbnRZKSkge1xuICAgICAgICBpZihpIDwgYWxpZ25tZW50WS5sZW5ndGgpIHtcbiAgICAgICAgICB0ZXh0T2Zmc2V0WSA9IGFsaWdubWVudFlbaV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0T2Zmc2V0WSA9IDBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKGFsaWdubWVudFkpIHtcbiAgICAgICAgdGV4dE9mZnNldFkgPSBhbGlnbm1lbnRZXG4gICAgICB9XG5cbiAgICAgIHRleHRPZmZzZXRYICo9ICh0ZXh0T2Zmc2V0WCA+IDApID8gKDEgLSBnbHlwaEJvdW5kc1swXVswXSkgOlxuICAgICAgICAgICAgICAgICAgICAgKHRleHRPZmZzZXRYIDwgMCkgPyAoMSArIGdseXBoQm91bmRzWzFdWzBdKSA6IDE7XG5cbiAgICAgIHRleHRPZmZzZXRZICo9ICh0ZXh0T2Zmc2V0WSA+IDApID8gKDEgLSBnbHlwaEJvdW5kc1swXVsxXSkgOlxuICAgICAgICAgICAgICAgICAgICAgKHRleHRPZmZzZXRZIDwgMCkgPyAoMSArIGdseXBoQm91bmRzWzFdWzFdKSA6IDE7XG5cbiAgICAgIHZhciB0ZXh0T2Zmc2V0ID0gW3RleHRPZmZzZXRYLCB0ZXh0T2Zmc2V0WV1cblxuICAgICAgLy9Xcml0ZSBvdXQgaW5uZXIgbWFya2VyXG4gICAgICB2YXIgY2VsbHMgPSBnbHlwaE1lc2guY2VsbHMgfHwgW11cbiAgICAgIHZhciB2ZXJ0cyA9IGdseXBoTWVzaC5wb3NpdGlvbnMgfHwgW11cblxuICAgICAgZm9yKHZhciBqPTA7IGo8Y2VsbHMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgdmFyIGNlbGwgPSBjZWxsc1tqXVxuICAgICAgICBmb3IodmFyIGs9MDsgazwzOyArK2spIHtcbiAgICAgICAgICBmb3IodmFyIGw9MDsgbDwzOyArK2wpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uQXJyYXlbMyp0cmlPZmZzZXQrbF0gPSB4W2xdXG4gICAgICAgICAgfVxuICAgICAgICAgIGZvcih2YXIgbD0wOyBsPDQ7ICsrbCkge1xuICAgICAgICAgICAgY29sb3JBcnJheVs0KnRyaU9mZnNldCtsXSA9IGNvbG9yW2xdXG4gICAgICAgICAgfVxuICAgICAgICAgIGlkQXJyYXlbdHJpT2Zmc2V0XSA9IHBpY2tDb3VudGVyXG4gICAgICAgICAgdmFyIHAgPSB2ZXJ0c1tjZWxsW2tdXVxuICAgICAgICAgIGdseXBoQXJyYXlbMip0cmlPZmZzZXRdICAgPSBzaXplICogKGNvcypwWzBdIC0gc2luKnBbMV0gKyB0ZXh0T2Zmc2V0WzBdKVxuICAgICAgICAgIGdseXBoQXJyYXlbMip0cmlPZmZzZXQrMV0gPSBzaXplICogKHNpbipwWzBdICsgY29zKnBbMV0gKyB0ZXh0T2Zmc2V0WzFdKVxuICAgICAgICAgIHRyaU9mZnNldCArPSAxXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGNlbGxzID0gZ2x5cGhMaW5lcy5lZGdlc1xuICAgICAgdmFyIHZlcnRzID0gZ2x5cGhMaW5lcy5wb3NpdGlvbnNcblxuICAgICAgZm9yKHZhciBqPTA7IGo8Y2VsbHMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgdmFyIGNlbGwgPSBjZWxsc1tqXVxuICAgICAgICBmb3IodmFyIGs9MDsgazwyOyArK2spIHtcbiAgICAgICAgICBmb3IodmFyIGw9MDsgbDwzOyArK2wpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uQXJyYXlbMypsaW5lT2Zmc2V0K2xdID0geFtsXVxuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IodmFyIGw9MDsgbDw0OyArK2wpIHtcbiAgICAgICAgICAgIGNvbG9yQXJyYXlbNCpsaW5lT2Zmc2V0K2xdID0gbGluZUNvbG9yW2xdXG4gICAgICAgICAgfVxuICAgICAgICAgIGlkQXJyYXlbbGluZU9mZnNldF0gPSBwaWNrQ291bnRlclxuICAgICAgICAgIHZhciBwID0gdmVydHNbY2VsbFtrXV1cbiAgICAgICAgICBnbHlwaEFycmF5WzIqbGluZU9mZnNldF0gICA9IHNpemUgKiAoY29zKnBbMF0gLSBzaW4qcFsxXSArIHRleHRPZmZzZXRbMF0pXG4gICAgICAgICAgZ2x5cGhBcnJheVsyKmxpbmVPZmZzZXQrMV0gPSBzaXplICogKHNpbipwWzBdICsgY29zKnBbMV0gKyB0ZXh0T2Zmc2V0WzFdKVxuICAgICAgICAgIGxpbmVPZmZzZXQgKz0gMVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cblxuXG4gIH1cblxuICAvL1VwZGF0ZSBib3VuZHNcbiAgdGhpcy5ib3VuZHMgPSBbbG93ZXJCb3VuZCwgdXBwZXJCb3VuZF1cblxuICAvL1NhdmUgcG9pbnRzXG4gIHRoaXMucG9pbnRzID0gcG9pbnRzXG5cbiAgLy9TYXZlIG51bWJlciBvZiBwb2ludHNcbiAgdGhpcy5wb2ludENvdW50ID0gcG9pbnRzLmxlbmd0aFxuXG4gIC8vVXBkYXRlIHZlcnRleCBjb3VudHNcbiAgdGhpcy52ZXJ0ZXhDb3VudCAgICAgID0gdHJpVmVydGV4Q291bnRcbiAgdGhpcy5saW5lVmVydGV4Q291bnQgID0gbGluZVZlcnRleENvdW50XG5cbiAgdGhpcy5wb2ludEJ1ZmZlci51cGRhdGUocG9zaXRpb25BcnJheSlcbiAgdGhpcy5jb2xvckJ1ZmZlci51cGRhdGUoY29sb3JBcnJheSlcbiAgdGhpcy5nbHlwaEJ1ZmZlci51cGRhdGUoZ2x5cGhBcnJheSlcbiAgLy90aGlzLmlkQnVmZmVyLnVwZGF0ZShuZXcgVWludDMyQXJyYXkoaWRBcnJheSkpXG4gIHRoaXMuaWRCdWZmZXIudXBkYXRlKGlkQXJyYXkpXG5cbiAgcG9vbC5mcmVlKHBvc2l0aW9uQXJyYXkpXG4gIHBvb2wuZnJlZShjb2xvckFycmF5KVxuICBwb29sLmZyZWUoZ2x5cGhBcnJheSlcbiAgcG9vbC5mcmVlKGlkQXJyYXkpXG59XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgLy9TaGFkZXJzXG4gIHRoaXMuc2hhZGVyLmRpc3Bvc2UoKVxuICB0aGlzLm9ydGhvU2hhZGVyLmRpc3Bvc2UoKVxuICB0aGlzLnBpY2tQZXJzcGVjdGl2ZVNoYWRlci5kaXNwb3NlKClcbiAgdGhpcy5waWNrT3J0aG9TaGFkZXIuZGlzcG9zZSgpXG5cbiAgLy9WZXJ0ZXggYXJyYXlcbiAgdGhpcy52YW8uZGlzcG9zZSgpXG5cbiAgLy9CdWZmZXJzXG4gIHRoaXMucG9pbnRCdWZmZXIuZGlzcG9zZSgpXG4gIHRoaXMuY29sb3JCdWZmZXIuZGlzcG9zZSgpXG4gIHRoaXMuZ2x5cGhCdWZmZXIuZGlzcG9zZSgpXG4gIHRoaXMuaWRCdWZmZXIuZGlzcG9zZSgpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBvaW50Q2xvdWQob3B0aW9ucykge1xuICB2YXIgZ2wgPSBvcHRpb25zLmdsXG5cbiAgdmFyIHNoYWRlciAgICAgICAgICAgICAgICA9IHNoYWRlcnMuY3JlYXRlUGVyc3BlY3RpdmUoZ2wpXG4gIHZhciBvcnRob1NoYWRlciAgICAgICAgICAgPSBzaGFkZXJzLmNyZWF0ZU9ydGhvKGdsKVxuICB2YXIgcHJvamVjdFNoYWRlciAgICAgICAgID0gc2hhZGVycy5jcmVhdGVQcm9qZWN0KGdsKVxuICB2YXIgcGlja1BlcnNwZWN0aXZlU2hhZGVyID0gc2hhZGVycy5jcmVhdGVQaWNrUGVyc3BlY3RpdmUoZ2wpXG4gIHZhciBwaWNrT3J0aG9TaGFkZXIgICAgICAgPSBzaGFkZXJzLmNyZWF0ZVBpY2tPcnRobyhnbClcbiAgdmFyIHBpY2tQcm9qZWN0U2hhZGVyICAgICA9IHNoYWRlcnMuY3JlYXRlUGlja1Byb2plY3QoZ2wpXG5cbiAgdmFyIHBvaW50QnVmZmVyID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgY29sb3JCdWZmZXIgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciBnbHlwaEJ1ZmZlciA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIGlkQnVmZmVyICAgID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgdmFvID0gY3JlYXRlVkFPKGdsLCBbXG4gICAge1xuICAgICAgYnVmZmVyOiBwb2ludEJ1ZmZlcixcbiAgICAgIHNpemU6IDMsXG4gICAgICB0eXBlOiBnbC5GTE9BVFxuICAgIH0sXG4gICAge1xuICAgICAgYnVmZmVyOiBjb2xvckJ1ZmZlcixcbiAgICAgIHNpemU6IDQsXG4gICAgICB0eXBlOiBnbC5GTE9BVFxuICAgIH0sXG4gICAge1xuICAgICAgYnVmZmVyOiBnbHlwaEJ1ZmZlcixcbiAgICAgIHNpemU6IDIsXG4gICAgICB0eXBlOiBnbC5GTE9BVFxuICAgIH0sXG4gICAge1xuICAgICAgYnVmZmVyOiBpZEJ1ZmZlcixcbiAgICAgIHNpemU6IDQsXG4gICAgICB0eXBlOiBnbC5VTlNJR05FRF9CWVRFLFxuICAgICAgbm9ybWFsaXplZDogdHJ1ZVxuICAgIH1cbiAgXSlcblxuICB2YXIgcG9pbnRDbG91ZCA9IG5ldyBQb2ludENsb3VkKFxuICAgIGdsLFxuICAgIHNoYWRlcixcbiAgICBvcnRob1NoYWRlcixcbiAgICBwcm9qZWN0U2hhZGVyLFxuICAgIHBvaW50QnVmZmVyLFxuICAgIGNvbG9yQnVmZmVyLFxuICAgIGdseXBoQnVmZmVyLFxuICAgIGlkQnVmZmVyLFxuICAgIHZhbyxcbiAgICBwaWNrUGVyc3BlY3RpdmVTaGFkZXIsXG4gICAgcGlja09ydGhvU2hhZGVyLFxuICAgIHBpY2tQcm9qZWN0U2hhZGVyKVxuXG4gIHBvaW50Q2xvdWQudXBkYXRlKG9wdGlvbnMpXG5cbiAgcmV0dXJuIHBvaW50Q2xvdWRcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL3NjYXR0ZXIzZCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHNvbGlkOiBbW10sIDBdLFxuICAgIGRvdDogW1swLjUsIDFdLCAyMDBdLFxuICAgIGRhc2g6IFtbMC41LCAxXSwgNTBdLFxuICAgIGxvbmdkYXNoOiBbWzAuNSwgMV0sIDEwXSxcbiAgICBkYXNoZG90OiBbWzAuNSwgMC42MjUsIDAuODc1LCAxXSwgNTBdLFxuICAgIGxvbmdkYXNoZG90OiBbWzAuNSwgMC43LCAwLjgsIDFdLCAxMF1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2lyY2xlOiAn4pePJyxcbiAgICAnY2lyY2xlLW9wZW4nOiAn4peLJyxcbiAgICBzcXVhcmU6ICfilqAnLFxuICAgICdzcXVhcmUtb3Blbic6ICfilqEnLFxuICAgIGRpYW1vbmQ6ICfil4YnLFxuICAgICdkaWFtb25kLW9wZW4nOiAn4peHJyxcbiAgICBjcm9zczogJysnLFxuICAgIHg6ICfinYwnXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NhdHRlckF0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIHRleHR0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLnRleHR0ZW1wbGF0ZUF0dHJzO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcbnZhciBEQVNIRVMgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZ2wzZF9kYXNoZXMnKTtcblxudmFyIE1BUktFUl9TWU1CT0xTID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL2dsM2RfbWFya2VycycpO1xudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBvdmVycmlkZUFsbCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL2VkaXRfdHlwZXMnKS5vdmVycmlkZUFsbDtcblxudmFyIHNjYXR0ZXJMaW5lQXR0cnMgPSBzY2F0dGVyQXR0cnMubGluZTtcbnZhciBzY2F0dGVyTWFya2VyQXR0cnMgPSBzY2F0dGVyQXR0cnMubWFya2VyO1xudmFyIHNjYXR0ZXJNYXJrZXJMaW5lQXR0cnMgPSBzY2F0dGVyTWFya2VyQXR0cnMubGluZTtcblxudmFyIGxpbmVBdHRycyA9IGV4dGVuZEZsYXQoe1xuICAgIHdpZHRoOiBzY2F0dGVyTGluZUF0dHJzLndpZHRoLFxuICAgIGRhc2g6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IE9iamVjdC5rZXlzKERBU0hFUyksXG4gICAgICAgIGRmbHQ6ICdzb2xpZCcsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZGFzaCBzdHlsZSBvZiB0aGUgbGluZXMuJ1xuICAgIH1cbn0sIGNvbG9yQXR0cmlidXRlcygnbGluZScpKTtcblxuZnVuY3Rpb24gbWFrZVByb2plY3Rpb25BdHRyKGF4TGV0dGVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvdzoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogZmFsc2UsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHdoZXRoZXIgb3Igbm90IHByb2plY3Rpb25zIGFyZSBzaG93biBhbG9uZyB0aGUnLFxuICAgICAgICAgICAgICAgIGF4TGV0dGVyLCAnYXhpcy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBvcGFjaXR5OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEsXG4gICAgICAgICAgICBkZmx0OiAxLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBwcm9qZWN0aW9uIGNvbG9yLidcbiAgICAgICAgfSxcbiAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgICBkZmx0OiAyIC8gMyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHNjYWxlIGZhY3RvciBkZXRlcm1pbmluZyB0aGUgc2l6ZSBvZiB0aGUnLFxuICAgICAgICAgICAgICAgICdwcm9qZWN0aW9uIG1hcmtlciBwb2ludHMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfVxuICAgIH07XG59XG5cbnZhciBhdHRycyA9IG1vZHVsZS5leHBvcnRzID0gb3ZlcnJpZGVBbGwoe1xuICAgIHg6IHNjYXR0ZXJBdHRycy54LFxuICAgIHk6IHNjYXR0ZXJBdHRycy55LFxuICAgIHo6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHogY29vcmRpbmF0ZXMuJ1xuICAgIH0sXG5cbiAgICB0ZXh0OiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMudGV4dCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGV4dCBlbGVtZW50cyBhc3NvY2lhdGVkIHdpdGggZWFjaCAoeCx5LHopIHRyaXBsZXQuJyxcbiAgICAgICAgICAgICdJZiBhIHNpbmdsZSBzdHJpbmcsIHRoZSBzYW1lIHN0cmluZyBhcHBlYXJzIG92ZXInLFxuICAgICAgICAgICAgJ2FsbCB0aGUgZGF0YSBwb2ludHMuJyxcbiAgICAgICAgICAgICdJZiBhbiBhcnJheSBvZiBzdHJpbmcsIHRoZSBpdGVtcyBhcmUgbWFwcGVkIGluIG9yZGVyIHRvIHRoZScsXG4gICAgICAgICAgICAndGhpcyB0cmFjZVxcJ3MgKHgseSx6KSBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ0lmIHRyYWNlIGBob3ZlcmluZm9gIGNvbnRhaW5zIGEgKnRleHQqIGZsYWcgYW5kICpob3ZlcnRleHQqIGlzIG5vdCBzZXQsJyxcbiAgICAgICAgICAgICd0aGVzZSBlbGVtZW50cyB3aWxsIGJlIHNlZW4gaW4gdGhlIGhvdmVyIGxhYmVscy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7fSwge1xuXG4gICAgfSksXG4gICAgaG92ZXJ0ZXh0OiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMuaG92ZXJ0ZXh0LCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0ZXh0IGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCBlYWNoICh4LHkseikgdHJpcGxldC4nLFxuICAgICAgICAgICAgJ0lmIGEgc2luZ2xlIHN0cmluZywgdGhlIHNhbWUgc3RyaW5nIGFwcGVhcnMgb3ZlcicsXG4gICAgICAgICAgICAnYWxsIHRoZSBkYXRhIHBvaW50cy4nLFxuICAgICAgICAgICAgJ0lmIGFuIGFycmF5IG9mIHN0cmluZywgdGhlIGl0ZW1zIGFyZSBtYXBwZWQgaW4gb3JkZXIgdG8gdGhlJyxcbiAgICAgICAgICAgICd0aGlzIHRyYWNlXFwncyAoeCx5LHopIGNvb3JkaW5hdGVzLicsXG4gICAgICAgICAgICAnVG8gYmUgc2VlbiwgdHJhY2UgYGhvdmVyaW5mb2AgbXVzdCBjb250YWluIGEgKnRleHQqIGZsYWcuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycygpLFxuXG4gICAgbW9kZTogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLm1vZGUsICAvLyBzaG91bGRuJ3QgdGhpcyBiZSBvbi1wYXIgd2l0aCAyRD9cbiAgICAgICAge2RmbHQ6ICdsaW5lcyttYXJrZXJzJ30pLFxuICAgIHN1cmZhY2VheGlzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICB2YWx1ZXM6IFstMSwgMCwgMSwgMl0sXG4gICAgICAgIGRmbHQ6IC0xLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0lmICotMSosIHRoZSBzY2F0dGVyIHBvaW50cyBhcmUgbm90IGZpbGwgd2l0aCBhIHN1cmZhY2UnLFxuICAgICAgICAgICAgJ0lmICowKiwgKjEqLCAqMiosIHRoZSBzY2F0dGVyIHBvaW50cyBhcmUgZmlsbGVkIHdpdGgnLFxuICAgICAgICAgICAgJ2EgRGVsYXVuYXkgc3VyZmFjZSBhYm91dCB0aGUgeCwgeSwgeiByZXNwZWN0aXZlbHkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgc3VyZmFjZWNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgc3VyZmFjZSBmaWxsIGNvbG9yLidcbiAgICB9LFxuICAgIHByb2plY3Rpb246IHtcbiAgICAgICAgeDogbWFrZVByb2plY3Rpb25BdHRyKCd4JyksXG4gICAgICAgIHk6IG1ha2VQcm9qZWN0aW9uQXR0cigneScpLFxuICAgICAgICB6OiBtYWtlUHJvamVjdGlvbkF0dHIoJ3onKVxuICAgIH0sXG5cbiAgICBjb25uZWN0Z2Fwczogc2NhdHRlckF0dHJzLmNvbm5lY3RnYXBzLFxuICAgIGxpbmU6IGxpbmVBdHRycyxcblxuICAgIG1hcmtlcjogZXh0ZW5kRmxhdCh7ICAvLyBQYXJpdHkgd2l0aCBzY2F0dGVyLmpzP1xuICAgICAgICBzeW1ib2w6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogT2JqZWN0LmtleXMoTUFSS0VSX1NZTUJPTFMpLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGRmbHQ6ICdjaXJjbGUnLFxuICAgICAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgbWFya2VyIHN5bWJvbCB0eXBlLidcbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZTogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlck1hcmtlckF0dHJzLnNpemUsIHtkZmx0OiA4fSksXG4gICAgICAgIHNpemVyZWY6IHNjYXR0ZXJNYXJrZXJBdHRycy5zaXplcmVmLFxuICAgICAgICBzaXplbWluOiBzY2F0dGVyTWFya2VyQXR0cnMuc2l6ZW1pbixcbiAgICAgICAgc2l6ZW1vZGU6IHNjYXR0ZXJNYXJrZXJBdHRycy5zaXplbW9kZSxcbiAgICAgICAgb3BhY2l0eTogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlck1hcmtlckF0dHJzLm9wYWNpdHksIHtcbiAgICAgICAgICAgIGFycmF5T2s6IGZhbHNlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgbWFya2VyIG9wYWNpdHkuJyxcbiAgICAgICAgICAgICAgICAnTm90ZSB0aGF0IHRoZSBtYXJrZXIgb3BhY2l0eSBmb3Igc2NhdHRlcjNkIHRyYWNlcycsXG4gICAgICAgICAgICAgICAgJ211c3QgYmUgYSBzY2FsYXIgdmFsdWUgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuJyxcbiAgICAgICAgICAgICAgICAnVG8gc2V0IGEgYmxlbmRpbmcgb3BhY2l0eSB2YWx1ZScsXG4gICAgICAgICAgICAgICAgJyhpLmUuIHdoaWNoIGlzIG5vdCB0cmFuc3BhcmVudCksIHNldCAqbWFya2VyLmNvbG9yKicsXG4gICAgICAgICAgICAgICAgJ3RvIGFuIHJnYmEgY29sb3IgYW5kIHVzZSBpdHMgYWxwaGEgY2hhbm5lbC4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9KSxcbiAgICAgICAgY29sb3JiYXI6IHNjYXR0ZXJNYXJrZXJBdHRycy5jb2xvcmJhcixcblxuICAgICAgICBsaW5lOiBleHRlbmRGbGF0KHtcbiAgICAgICAgICAgIHdpZHRoOiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyTWFya2VyTGluZUF0dHJzLndpZHRoLCB7YXJyYXlPazogZmFsc2V9KVxuICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3JBdHRyaWJ1dGVzKCdtYXJrZXIubGluZScpXG4gICAgICAgIClcbiAgICB9LFxuICAgICAgICBjb2xvckF0dHJpYnV0ZXMoJ21hcmtlcicpXG4gICAgKSxcblxuICAgIHRleHRwb3NpdGlvbjogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLnRleHRwb3NpdGlvbiwge2RmbHQ6ICd0b3AgY2VudGVyJ30pLFxuICAgIHRleHRmb250OiB7XG4gICAgICAgIGNvbG9yOiBzY2F0dGVyQXR0cnMudGV4dGZvbnQuY29sb3IsXG4gICAgICAgIHNpemU6IHNjYXR0ZXJBdHRycy50ZXh0Zm9udC5zaXplLFxuICAgICAgICBmYW1pbHk6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy50ZXh0Zm9udC5mYW1pbHksIHthcnJheU9rOiBmYWxzZX0pXG4gICAgfSxcblxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbylcbn0sICdjYWxjJywgJ25lc3RlZCcpO1xuXG5hdHRycy54LmVkaXRUeXBlID0gYXR0cnMueS5lZGl0VHlwZSA9IGF0dHJzLnouZWRpdFR5cGUgPSAnY2FsYytjbGVhckF4aXNUeXBlcyc7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhcnJheXNUb0NhbGNkYXRhID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hcnJheXNfdG9fY2FsY2RhdGEnKTtcbnZhciBjYWxjQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvY29sb3JzY2FsZV9jYWxjJyk7XG5cbi8qKlxuICogVGhpcyBpcyBhIGtsdWRnZSB0byBwdXQgdGhlIGFycmF5IGF0dHJpYnV0ZXMgaW50b1xuICogY2FsY2RhdGEgdGhlIHdheSBTY2F0dGVyLnBsb3QgZG9lcywgc28gdGhhdCBsZWdlbmRzIGFuZFxuICogcG9wb3ZlcnMga25vdyB3aGF0IHRvIGRvIHdpdGggdGhlbS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBjZCA9IFt7eDogZmFsc2UsIHk6IGZhbHNlLCB0cmFjZTogdHJhY2UsIHQ6IHt9fV07XG5cbiAgICBhcnJheXNUb0NhbGNkYXRhKGNkLCB0cmFjZSk7XG4gICAgY2FsY0NvbG9yc2NhbGUoZ2QsIHRyYWNlKTtcblxuICAgIHJldHVybiBjZDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUF4aXNFcnJvcnMoZGF0YSwgcGFyYW1zLCBzY2FsZUZhY3RvciwgYXhpcykge1xuICAgIGlmKCFwYXJhbXMgfHwgIXBhcmFtcy52aXNpYmxlKSByZXR1cm4gbnVsbDtcblxuICAgIHZhciBjb21wdXRlRXJyb3IgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdtYWtlQ29tcHV0ZUVycm9yJykocGFyYW1zKTtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvcnMgPSBjb21wdXRlRXJyb3IoK2RhdGFbaV0sIGkpO1xuXG4gICAgICAgIGlmKGF4aXMudHlwZSA9PT0gJ2xvZycpIHtcbiAgICAgICAgICAgIHZhciBwb2ludCA9IGF4aXMuYzJsKGRhdGFbaV0pO1xuICAgICAgICAgICAgdmFyIG1pbiA9IGRhdGFbaV0gLSBlcnJvcnNbMF07XG4gICAgICAgICAgICB2YXIgbWF4ID0gZGF0YVtpXSArIGVycm9yc1sxXTtcblxuICAgICAgICAgICAgcmVzdWx0W2ldID0gW1xuICAgICAgICAgICAgICAgIChheGlzLmMybChtaW4sIHRydWUpIC0gcG9pbnQpICogc2NhbGVGYWN0b3IsXG4gICAgICAgICAgICAgICAgKGF4aXMuYzJsKG1heCwgdHJ1ZSkgLSBwb2ludCkgKiBzY2FsZUZhY3RvclxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgbG93ZXIgZXJyb3IgYm91bmQgd2hpY2ggaXNuJ3QgbmVnYXRpdmUhXG4gICAgICAgICAgICBpZihtaW4gPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvd2VyID0gYXhpcy5jMmwobWluKTtcbiAgICAgICAgICAgICAgICBpZighYXhpcy5fbG93ZXJMb2dFcnJvckJvdW5kKSBheGlzLl9sb3dlckxvZ0Vycm9yQm91bmQgPSBsb3dlcjtcbiAgICAgICAgICAgICAgICBheGlzLl9sb3dlckVycm9yQm91bmQgPSBNYXRoLm1pbihheGlzLl9sb3dlckxvZ0Vycm9yQm91bmQsIGxvd2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IFtcbiAgICAgICAgICAgICAgICAtZXJyb3JzWzBdICogc2NhbGVGYWN0b3IsXG4gICAgICAgICAgICAgICAgZXJyb3JzWzFdICogc2NhbGVGYWN0b3JcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBkYXRhTGVuZ3RoKGFycmF5KSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKGFycmF5W2ldKSByZXR1cm4gYXJyYXlbaV0ubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlRXJyb3JzKGRhdGEsIHNjYWxlRmFjdG9yLCBzY2VuZUxheW91dCkge1xuICAgIHZhciBlcnJvcnMgPSBbXG4gICAgICAgIGNhbGN1bGF0ZUF4aXNFcnJvcnMoZGF0YS54LCBkYXRhLmVycm9yX3gsIHNjYWxlRmFjdG9yWzBdLCBzY2VuZUxheW91dC54YXhpcyksXG4gICAgICAgIGNhbGN1bGF0ZUF4aXNFcnJvcnMoZGF0YS55LCBkYXRhLmVycm9yX3ksIHNjYWxlRmFjdG9yWzFdLCBzY2VuZUxheW91dC55YXhpcyksXG4gICAgICAgIGNhbGN1bGF0ZUF4aXNFcnJvcnMoZGF0YS56LCBkYXRhLmVycm9yX3osIHNjYWxlRmFjdG9yWzJdLCBzY2VuZUxheW91dC56YXhpcylcbiAgICBdO1xuXG4gICAgdmFyIG4gPSBkYXRhTGVuZ3RoKGVycm9ycyk7XG4gICAgaWYobiA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICB2YXIgZXJyb3JCb3VuZHMgPSBuZXcgQXJyYXkobik7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHZhciBib3VuZCA9IFtbMCwgMCwgMF0sIFswLCAwLCAwXV07XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgaWYoZXJyb3JzW2pdKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrID0gMDsgayA8IDI7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBib3VuZFtrXVtqXSA9IGVycm9yc1tqXVtpXVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlcnJvckJvdW5kc1tpXSA9IGJvdW5kO1xuICAgIH1cblxuICAgIHJldHVybiBlcnJvckJvdW5kcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWxjdWxhdGVFcnJvcnM7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUxpbmVQbG90ID0gcmVxdWlyZSgnZ2wtbGluZTNkJyk7XG52YXIgY3JlYXRlU2NhdHRlclBsb3QgPSByZXF1aXJlKCdnbC1zY2F0dGVyM2QnKTtcbnZhciBjcmVhdGVFcnJvckJhcnMgPSByZXF1aXJlKCdnbC1lcnJvcjNkJyk7XG52YXIgY3JlYXRlTWVzaCA9IHJlcXVpcmUoJ2dsLW1lc2gzZCcpO1xudmFyIHRyaWFuZ3VsYXRlID0gcmVxdWlyZSgnZGVsYXVuYXktdHJpYW5ndWxhdGUnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHN0cjJSZ2JhQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWIvc3RyMnJnYmFycmF5Jyk7XG52YXIgZm9ybWF0Q29sb3IgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2xfZm9ybWF0X2NvbG9yJykuZm9ybWF0Q29sb3I7XG52YXIgbWFrZUJ1YmJsZVNpemVGbiA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFrZV9idWJibGVfc2l6ZV9mdW5jJyk7XG52YXIgREFTSF9QQVRURVJOUyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9nbDNkX2Rhc2hlcycpO1xudmFyIE1BUktFUl9TWU1CT0xTID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL2dsM2RfbWFya2VycycpO1xuXG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG52YXIgYXBwZW5kQXJyYXlQb2ludFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meC9oZWxwZXJzJykuYXBwZW5kQXJyYXlQb2ludFZhbHVlO1xuXG52YXIgY2FsY3VsYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NhbGNfZXJyb3JzJyk7XG5cbmZ1bmN0aW9uIExpbmVXaXRoTWFya2VycyhzY2VuZSwgdWlkKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMudWlkID0gdWlkO1xuICAgIHRoaXMubGluZVBsb3QgPSBudWxsO1xuICAgIHRoaXMuc2NhdHRlclBsb3QgPSBudWxsO1xuICAgIHRoaXMuZXJyb3JCYXJzID0gbnVsbDtcbiAgICB0aGlzLnRleHRNYXJrZXJzID0gbnVsbDtcbiAgICB0aGlzLmRlbGF1bmF5TWVzaCA9IG51bGw7XG4gICAgdGhpcy5jb2xvciA9IG51bGw7XG4gICAgdGhpcy5tb2RlID0gJyc7XG4gICAgdGhpcy5kYXRhUG9pbnRzID0gW107XG4gICAgdGhpcy5heGVzQm91bmRzID0gW1xuICAgICAgICBbLUluZmluaXR5LCAtSW5maW5pdHksIC1JbmZpbml0eV0sXG4gICAgICAgIFtJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5XVxuICAgIF07XG4gICAgdGhpcy50ZXh0TGFiZWxzID0gbnVsbDtcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xufVxuXG52YXIgcHJvdG8gPSBMaW5lV2l0aE1hcmtlcnMucHJvdG90eXBlO1xuXG5wcm90by5oYW5kbGVQaWNrID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgaWYoc2VsZWN0aW9uLm9iamVjdCAmJlxuICAgICAgICAoc2VsZWN0aW9uLm9iamVjdCA9PT0gdGhpcy5saW5lUGxvdCB8fFxuICAgICAgICAgc2VsZWN0aW9uLm9iamVjdCA9PT0gdGhpcy5kZWxhdW5heU1lc2ggfHxcbiAgICAgICAgIHNlbGVjdGlvbi5vYmplY3QgPT09IHRoaXMudGV4dE1hcmtlcnMgfHxcbiAgICAgICAgIHNlbGVjdGlvbi5vYmplY3QgPT09IHRoaXMuc2NhdHRlclBsb3QpXG4gICAgKSB7XG4gICAgICAgIHZhciBpbmQgPSBzZWxlY3Rpb24uaW5kZXggPSBzZWxlY3Rpb24uZGF0YS5pbmRleDtcblxuICAgICAgICBpZihzZWxlY3Rpb24ub2JqZWN0LmhpZ2hsaWdodCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uLm9iamVjdC5oaWdobGlnaHQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5zY2F0dGVyUGxvdCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uLm9iamVjdCA9IHRoaXMuc2NhdHRlclBsb3Q7XG4gICAgICAgICAgICB0aGlzLnNjYXR0ZXJQbG90LmhpZ2hsaWdodChzZWxlY3Rpb24uZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3Rpb24udGV4dExhYmVsID0gJyc7XG4gICAgICAgIGlmKHRoaXMudGV4dExhYmVscykge1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLnRleHRMYWJlbHMpKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy50ZXh0TGFiZWxzW2luZF0gfHwgdGhpcy50ZXh0TGFiZWxzW2luZF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLnRleHRMYWJlbCA9IHRoaXMudGV4dExhYmVsc1tpbmRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLnRleHRMYWJlbCA9IHRoaXMudGV4dExhYmVscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGVjdGlvbi50cmFjZUNvb3JkaW5hdGUgPSBbXG4gICAgICAgICAgICB0aGlzLmRhdGEueFtpbmRdLFxuICAgICAgICAgICAgdGhpcy5kYXRhLnlbaW5kXSxcbiAgICAgICAgICAgIHRoaXMuZGF0YS56W2luZF1cbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjb25zdHJ1Y3REZWxhdW5heShwb2ludHMsIGNvbG9yLCBheGlzKSB7XG4gICAgdmFyIHUgPSAoYXhpcyArIDEpICUgMztcbiAgICB2YXIgdiA9IChheGlzICsgMikgJSAzO1xuICAgIHZhciBmaWx0ZXJlZFBvaW50cyA9IFtdO1xuICAgIHZhciBmaWx0ZXJlZElkcyA9IFtdO1xuICAgIHZhciBpO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwID0gcG9pbnRzW2ldO1xuICAgICAgICBpZihpc05hTihwW3VdKSB8fCAhaXNGaW5pdGUocFt1XSkgfHxcbiAgICAgICAgICAgaXNOYU4ocFt2XSkgfHwgIWlzRmluaXRlKHBbdl0pKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBmaWx0ZXJlZFBvaW50cy5wdXNoKFtwW3VdLCBwW3ZdXSk7XG4gICAgICAgIGZpbHRlcmVkSWRzLnB1c2goaSk7XG4gICAgfVxuICAgIHZhciBjZWxscyA9IHRyaWFuZ3VsYXRlKGZpbHRlcmVkUG9pbnRzKTtcbiAgICBmb3IoaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYyA9IGNlbGxzW2ldO1xuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgYy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgY1tqXSA9IGZpbHRlcmVkSWRzW2Nbal1dO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHBvc2l0aW9uczogcG9pbnRzLFxuICAgICAgICBjZWxsczogY2VsbHMsXG4gICAgICAgIG1lc2hDb2xvcjogY29sb3JcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVFcnJvclBhcmFtcyhlcnJvcnMpIHtcbiAgICB2YXIgY2FwU2l6ZSA9IFswLjAsIDAuMCwgMC4wXTtcbiAgICB2YXIgY29sb3IgPSBbWzAsIDAsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAwXV07XG4gICAgdmFyIGxpbmVXaWR0aCA9IFsxLjAsIDEuMCwgMS4wXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgdmFyIGUgPSBlcnJvcnNbaV07XG5cbiAgICAgICAgaWYoZSAmJiBlLmNvcHlfenN0eWxlICE9PSBmYWxzZSAmJiBlcnJvcnNbMl0udmlzaWJsZSAhPT0gZmFsc2UpIGUgPSBlcnJvcnNbMl07XG4gICAgICAgIGlmKCFlIHx8ICFlLnZpc2libGUpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhcFNpemVbaV0gPSBlLndpZHRoIC8gMjsgIC8vIGJhbGxwYXJrIHJlc2NhbGluZ1xuICAgICAgICBjb2xvcltpXSA9IHN0cjJSZ2JhQXJyYXkoZS5jb2xvcik7XG4gICAgICAgIGxpbmVXaWR0aFtpXSA9IGUudGhpY2tuZXNzO1xuICAgIH1cblxuICAgIHJldHVybiB7Y2FwU2l6ZTogY2FwU2l6ZSwgY29sb3I6IGNvbG9yLCBsaW5lV2lkdGg6IGxpbmVXaWR0aH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlQWxpZ25tZW50WChhKSB7XG4gICAgaWYoYSA9PT0gbnVsbCB8fCBhID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xuXG4gICAgcmV0dXJuIChhLmluZGV4T2YoJ2xlZnQnKSA+IC0xKSA/IC0xIDpcbiAgICAgICAgICAgKGEuaW5kZXhPZigncmlnaHQnKSA+IC0xKSA/IDEgOiAwO1xufVxuXG5mdW5jdGlvbiBwYXJzZUFsaWdubWVudFkoYSkge1xuICAgIGlmKGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gMDtcblxuICAgIHJldHVybiAoYS5pbmRleE9mKCd0b3AnKSA+IC0xKSA/IC0xIDpcbiAgICAgICAgICAgKGEuaW5kZXhPZignYm90dG9tJykgPiAtMSkgPyAxIDogMDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlVGV4dE9mZnNldCh0cCkge1xuICAgIC8vIFJlYWQgb3V0IHRleHQgcHJvcGVydGllc1xuXG4gICAgdmFyIGRlZmF1bHRBbGlnbm1lbnRYID0gMDtcbiAgICB2YXIgZGVmYXVsdEFsaWdubWVudFkgPSAwO1xuXG4gICAgdmFyIHRleHRPZmZzZXQgPSBbXG4gICAgICAgIGRlZmF1bHRBbGlnbm1lbnRYLFxuICAgICAgICBkZWZhdWx0QWxpZ25tZW50WVxuICAgIF07XG5cbiAgICBpZihBcnJheS5pc0FycmF5KHRwKSkge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRleHRPZmZzZXRbaV0gPSBbXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFsaWdubWVudFgsXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFsaWdubWVudFlcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZih0cFtpXSkge1xuICAgICAgICAgICAgICAgIHRleHRPZmZzZXRbaV1bMF0gPSBwYXJzZUFsaWdubWVudFgodHBbaV0pO1xuICAgICAgICAgICAgICAgIHRleHRPZmZzZXRbaV1bMV0gPSBwYXJzZUFsaWdubWVudFkodHBbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dE9mZnNldFswXSA9IHBhcnNlQWxpZ25tZW50WCh0cCk7XG4gICAgICAgIHRleHRPZmZzZXRbMV0gPSBwYXJzZUFsaWdubWVudFkodHApO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0T2Zmc2V0O1xufVxuXG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNpemUoc2l6ZUluLCBzaXplRm4pIHtcbiAgICAvLyByb3VnaCBwYXJpdHkgd2l0aCBQbG90bHkgMkQgbWFya2Vyc1xuICAgIHJldHVybiBzaXplRm4oc2l6ZUluICogNCk7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVN5bWJvbChzeW1ib2xJbikge1xuICAgIHJldHVybiBNQVJLRVJfU1lNQk9MU1tzeW1ib2xJbl07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFBhcmFtKHBhcmFtSW4sIGxlbiwgY2FsY3VsYXRlLCBkZmx0LCBleHRyYUZuKSB7XG4gICAgdmFyIHBhcmFtT3V0ID0gbnVsbDtcblxuICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHBhcmFtSW4pKSB7XG4gICAgICAgIHBhcmFtT3V0ID0gW107XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZihwYXJhbUluW2ldID09PSB1bmRlZmluZWQpIHBhcmFtT3V0W2ldID0gZGZsdDtcbiAgICAgICAgICAgIGVsc2UgcGFyYW1PdXRbaV0gPSBjYWxjdWxhdGUocGFyYW1JbltpXSwgZXh0cmFGbik7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgcGFyYW1PdXQgPSBjYWxjdWxhdGUocGFyYW1JbiwgTGliLmlkZW50aXR5KTtcblxuICAgIHJldHVybiBwYXJhbU91dDtcbn1cblxuXG5mdW5jdGlvbiBjb252ZXJ0UGxvdGx5T3B0aW9ucyhzY2VuZSwgZGF0YSkge1xuICAgIHZhciBwb2ludHMgPSBbXTtcbiAgICB2YXIgc2NlbmVMYXlvdXQgPSBzY2VuZS5mdWxsU2NlbmVMYXlvdXQ7XG4gICAgdmFyIHNjYWxlRmFjdG9yID0gc2NlbmUuZGF0YVNjYWxlO1xuICAgIHZhciB4YXhpcyA9IHNjZW5lTGF5b3V0LnhheGlzO1xuICAgIHZhciB5YXhpcyA9IHNjZW5lTGF5b3V0LnlheGlzO1xuICAgIHZhciB6YXhpcyA9IHNjZW5lTGF5b3V0LnpheGlzO1xuICAgIHZhciBtYXJrZXIgPSBkYXRhLm1hcmtlcjtcbiAgICB2YXIgbGluZSA9IGRhdGEubGluZTtcbiAgICB2YXIgeCA9IGRhdGEueCB8fCBbXTtcbiAgICB2YXIgeSA9IGRhdGEueSB8fCBbXTtcbiAgICB2YXIgeiA9IGRhdGEueiB8fCBbXTtcbiAgICB2YXIgbGVuID0geC5sZW5ndGg7XG4gICAgdmFyIHhjYWxlbmRhciA9IGRhdGEueGNhbGVuZGFyO1xuICAgIHZhciB5Y2FsZW5kYXIgPSBkYXRhLnljYWxlbmRhcjtcbiAgICB2YXIgemNhbGVuZGFyID0gZGF0YS56Y2FsZW5kYXI7XG4gICAgdmFyIHhjLCB5YywgemM7XG4gICAgdmFyIHBhcmFtcywgaTtcbiAgICB2YXIgdGV4dDtcblxuICAgIC8vIENvbnZlcnQgcG9pbnRzXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gc2FuaXRpemUgbnVtYmVycyBhbmQgYXBwbHkgdHJhbnNmb3JtcyBiYXNlZCBvbiBheGVzLnR5cGVcbiAgICAgICAgeGMgPSB4YXhpcy5kMmwoeFtpXSwgMCwgeGNhbGVuZGFyKSAqIHNjYWxlRmFjdG9yWzBdO1xuICAgICAgICB5YyA9IHlheGlzLmQybCh5W2ldLCAwLCB5Y2FsZW5kYXIpICogc2NhbGVGYWN0b3JbMV07XG4gICAgICAgIHpjID0gemF4aXMuZDJsKHpbaV0sIDAsIHpjYWxlbmRhcikgKiBzY2FsZUZhY3RvclsyXTtcblxuICAgICAgICBwb2ludHNbaV0gPSBbeGMsIHljLCB6Y107XG4gICAgfVxuXG4gICAgLy8gY29udmVydCB0ZXh0XG4gICAgaWYoQXJyYXkuaXNBcnJheShkYXRhLnRleHQpKSB0ZXh0ID0gZGF0YS50ZXh0O1xuICAgIGVsc2UgaWYoZGF0YS50ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGV4dCA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykgdGV4dFtpXSA9IGRhdGEudGV4dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXR0ZXIoYXhOYW1lLCB2YWwpIHtcbiAgICAgICAgdmFyIGF4ID0gc2NlbmVMYXlvdXRbYXhOYW1lXTtcbiAgICAgICAgcmV0dXJuIEF4ZXMudGlja1RleHQoYXgsIGF4LmQybCh2YWwpLCB0cnVlKS50ZXh0O1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHRleHR0ZW1wbGF0ZVxuICAgIHZhciB0ZXh0dGVtcGxhdGUgPSBkYXRhLnRleHR0ZW1wbGF0ZTtcbiAgICBpZih0ZXh0dGVtcGxhdGUpIHtcbiAgICAgICAgdmFyIGZ1bGxMYXlvdXQgPSBzY2VuZS5mdWxsTGF5b3V0O1xuICAgICAgICB2YXIgZDNsb2NhbGUgPSBmdWxsTGF5b3V0Ll9kM2xvY2FsZTtcbiAgICAgICAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHRleHR0ZW1wbGF0ZSk7XG4gICAgICAgIHZhciBOID0gaXNBcnJheSA/IE1hdGgubWluKHRleHR0ZW1wbGF0ZS5sZW5ndGgsIGxlbikgOiBsZW47XG4gICAgICAgIHZhciB0eHQgPSBpc0FycmF5ID9cbiAgICAgICAgICAgIGZ1bmN0aW9uKGkpIHsgcmV0dXJuIHRleHR0ZW1wbGF0ZVtpXTsgfSA6XG4gICAgICAgICAgICBmdW5jdGlvbigpIHsgcmV0dXJuIHRleHR0ZW1wbGF0ZTsgfTtcblxuICAgICAgICB0ZXh0ID0gbmV3IEFycmF5KE4pO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgICAgICAgdmFyIGQgPSB7eDogeFtpXSwgeTogeVtpXSwgejogeltpXX07XG4gICAgICAgICAgICB2YXIgbGFiZWxzID0ge1xuICAgICAgICAgICAgICAgIHhMYWJlbDogZm9ybWF0dGVyKCd4YXhpcycsIHhbaV0pLFxuICAgICAgICAgICAgICAgIHlMYWJlbDogZm9ybWF0dGVyKCd5YXhpcycsIHlbaV0pLFxuICAgICAgICAgICAgICAgIHpMYWJlbDogZm9ybWF0dGVyKCd6YXhpcycsIHpbaV0pXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHBvaW50VmFsdWVzID0ge307XG4gICAgICAgICAgICBhcHBlbmRBcnJheVBvaW50VmFsdWUocG9pbnRWYWx1ZXMsIGRhdGEsIGkpO1xuICAgICAgICAgICAgdmFyIG1ldGEgPSBkYXRhLl9tZXRhIHx8IHt9O1xuICAgICAgICAgICAgdGV4dFtpXSA9IExpYi50ZXh0dGVtcGxhdGVTdHJpbmcodHh0KGkpLCBsYWJlbHMsIGQzbG9jYWxlLCBwb2ludFZhbHVlcywgZCwgbWV0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCdWlsZCBvYmplY3QgcGFyYW1ldGVyc1xuICAgIHBhcmFtcyA9IHtcbiAgICAgICAgcG9zaXRpb246IHBvaW50cyxcbiAgICAgICAgbW9kZTogZGF0YS5tb2RlLFxuICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgfTtcblxuICAgIGlmKCdsaW5lJyBpbiBkYXRhKSB7XG4gICAgICAgIHBhcmFtcy5saW5lQ29sb3IgPSBmb3JtYXRDb2xvcihsaW5lLCAxLCBsZW4pO1xuICAgICAgICBwYXJhbXMubGluZVdpZHRoID0gbGluZS53aWR0aDtcbiAgICAgICAgcGFyYW1zLmxpbmVEYXNoZXMgPSBsaW5lLmRhc2g7XG4gICAgfVxuXG4gICAgaWYoJ21hcmtlcicgaW4gZGF0YSkge1xuICAgICAgICB2YXIgc2l6ZUZuID0gbWFrZUJ1YmJsZVNpemVGbihkYXRhKTtcblxuICAgICAgICBwYXJhbXMuc2NhdHRlckNvbG9yID0gZm9ybWF0Q29sb3IobWFya2VyLCAxLCBsZW4pO1xuICAgICAgICBwYXJhbXMuc2NhdHRlclNpemUgPSBmb3JtYXRQYXJhbShtYXJrZXIuc2l6ZSwgbGVuLCBjYWxjdWxhdGVTaXplLCAyMCwgc2l6ZUZuKTtcbiAgICAgICAgcGFyYW1zLnNjYXR0ZXJNYXJrZXIgPSBmb3JtYXRQYXJhbShtYXJrZXIuc3ltYm9sLCBsZW4sIGNhbGN1bGF0ZVN5bWJvbCwgJ+KXjycpO1xuICAgICAgICBwYXJhbXMuc2NhdHRlckxpbmVXaWR0aCA9IG1hcmtlci5saW5lLndpZHRoOyAgLy8gYXJyYXlPayA9PT0gZmFsc2VcbiAgICAgICAgcGFyYW1zLnNjYXR0ZXJMaW5lQ29sb3IgPSBmb3JtYXRDb2xvcihtYXJrZXIubGluZSwgMSwgbGVuKTtcbiAgICAgICAgcGFyYW1zLnNjYXR0ZXJBbmdsZSA9IDA7XG4gICAgfVxuXG4gICAgaWYoJ3RleHRwb3NpdGlvbicgaW4gZGF0YSkge1xuICAgICAgICBwYXJhbXMudGV4dE9mZnNldCA9IGNhbGN1bGF0ZVRleHRPZmZzZXQoZGF0YS50ZXh0cG9zaXRpb24pO1xuICAgICAgICBwYXJhbXMudGV4dENvbG9yID0gZm9ybWF0Q29sb3IoZGF0YS50ZXh0Zm9udCwgMSwgbGVuKTtcbiAgICAgICAgcGFyYW1zLnRleHRTaXplID0gZm9ybWF0UGFyYW0oZGF0YS50ZXh0Zm9udC5zaXplLCBsZW4sIExpYi5pZGVudGl0eSwgMTIpO1xuICAgICAgICBwYXJhbXMudGV4dEZvbnQgPSBkYXRhLnRleHRmb250LmZhbWlseTsgIC8vIGFycmF5T2sgPT09IGZhbHNlXG4gICAgICAgIHBhcmFtcy50ZXh0QW5nbGUgPSAwO1xuICAgIH1cblxuICAgIHZhciBkaW1zID0gWyd4JywgJ3knLCAneiddO1xuICAgIHBhcmFtcy5wcm9qZWN0ID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2VdO1xuICAgIHBhcmFtcy5wcm9qZWN0U2NhbGUgPSBbMSwgMSwgMV07XG4gICAgcGFyYW1zLnByb2plY3RPcGFjaXR5ID0gWzEsIDEsIDFdO1xuICAgIGZvcihpID0gMDsgaSA8IDM7ICsraSkge1xuICAgICAgICB2YXIgcHJvamVjdGlvbiA9IGRhdGEucHJvamVjdGlvbltkaW1zW2ldXTtcbiAgICAgICAgaWYoKHBhcmFtcy5wcm9qZWN0W2ldID0gcHJvamVjdGlvbi5zaG93KSkge1xuICAgICAgICAgICAgcGFyYW1zLnByb2plY3RPcGFjaXR5W2ldID0gcHJvamVjdGlvbi5vcGFjaXR5O1xuICAgICAgICAgICAgcGFyYW1zLnByb2plY3RTY2FsZVtpXSA9IHByb2plY3Rpb24uc2NhbGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJhbXMuZXJyb3JCb3VuZHMgPSBjYWxjdWxhdGVFcnJvcihkYXRhLCBzY2FsZUZhY3Rvciwgc2NlbmVMYXlvdXQpO1xuXG4gICAgdmFyIGVycm9yUGFyYW1zID0gY2FsY3VsYXRlRXJyb3JQYXJhbXMoW2RhdGEuZXJyb3JfeCwgZGF0YS5lcnJvcl95LCBkYXRhLmVycm9yX3pdKTtcbiAgICBwYXJhbXMuZXJyb3JDb2xvciA9IGVycm9yUGFyYW1zLmNvbG9yO1xuICAgIHBhcmFtcy5lcnJvckxpbmVXaWR0aCA9IGVycm9yUGFyYW1zLmxpbmVXaWR0aDtcbiAgICBwYXJhbXMuZXJyb3JDYXBTaXplID0gZXJyb3JQYXJhbXMuY2FwU2l6ZTtcblxuICAgIHBhcmFtcy5kZWxhdW5heUF4aXMgPSBkYXRhLnN1cmZhY2VheGlzO1xuICAgIHBhcmFtcy5kZWxhdW5heUNvbG9yID0gc3RyMlJnYmFBcnJheShkYXRhLnN1cmZhY2Vjb2xvcik7XG5cbiAgICByZXR1cm4gcGFyYW1zO1xufVxuXG5mdW5jdGlvbiBhcnJheVRvQ29sb3IoY29sb3IpIHtcbiAgICBpZihBcnJheS5pc0FycmF5KGNvbG9yKSkge1xuICAgICAgICB2YXIgYyA9IGNvbG9yWzBdO1xuXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoYykpIGNvbG9yID0gYztcblxuICAgICAgICByZXR1cm4gJ3JnYignICsgY29sb3Iuc2xpY2UoMCwgMykubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHggKiAyNTUpO1xuICAgICAgICB9KSArICcpJztcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBnbCA9IHRoaXMuc2NlbmUuZ2xwbG90LmdsO1xuICAgIHZhciBsaW5lT3B0aW9ucztcbiAgICB2YXIgc2NhdHRlck9wdGlvbnM7XG4gICAgdmFyIGVycm9yT3B0aW9ucztcbiAgICB2YXIgdGV4dE9wdGlvbnM7XG4gICAgdmFyIGRhc2hQYXR0ZXJuID0gREFTSF9QQVRURVJOUy5zb2xpZDtcblxuICAgIC8vIFNhdmUgZGF0YVxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAvLyBSdW4gZGF0YSBjb252ZXJzaW9uXG4gICAgdmFyIG9wdGlvbnMgPSBjb252ZXJ0UGxvdGx5T3B0aW9ucyh0aGlzLnNjZW5lLCBkYXRhKTtcblxuICAgIGlmKCdtb2RlJyBpbiBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZTtcbiAgICB9XG4gICAgaWYoJ2xpbmVEYXNoZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgaWYob3B0aW9ucy5saW5lRGFzaGVzIGluIERBU0hfUEFUVEVSTlMpIHtcbiAgICAgICAgICAgIGRhc2hQYXR0ZXJuID0gREFTSF9QQVRURVJOU1tvcHRpb25zLmxpbmVEYXNoZXNdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jb2xvciA9IGFycmF5VG9Db2xvcihvcHRpb25zLnNjYXR0ZXJDb2xvcikgfHxcbiAgICAgICAgICAgICAgICAgYXJyYXlUb0NvbG9yKG9wdGlvbnMubGluZUNvbG9yKTtcblxuICAgIC8vIFNhdmUgZGF0YSBwb2ludHNcbiAgICB0aGlzLmRhdGFQb2ludHMgPSBvcHRpb25zLnBvc2l0aW9uO1xuXG4gICAgbGluZU9wdGlvbnMgPSB7XG4gICAgICAgIGdsOiB0aGlzLnNjZW5lLmdscGxvdC5nbCxcbiAgICAgICAgcG9zaXRpb246IG9wdGlvbnMucG9zaXRpb24sXG4gICAgICAgIGNvbG9yOiBvcHRpb25zLmxpbmVDb2xvcixcbiAgICAgICAgbGluZVdpZHRoOiBvcHRpb25zLmxpbmVXaWR0aCB8fCAxLFxuICAgICAgICBkYXNoZXM6IGRhc2hQYXR0ZXJuWzBdLFxuICAgICAgICBkYXNoU2NhbGU6IGRhc2hQYXR0ZXJuWzFdLFxuICAgICAgICBvcGFjaXR5OiBkYXRhLm9wYWNpdHksXG4gICAgICAgIGNvbm5lY3RHYXBzOiBkYXRhLmNvbm5lY3RnYXBzXG4gICAgfTtcblxuICAgIGlmKHRoaXMubW9kZS5pbmRleE9mKCdsaW5lcycpICE9PSAtMSkge1xuICAgICAgICBpZih0aGlzLmxpbmVQbG90KSB0aGlzLmxpbmVQbG90LnVwZGF0ZShsaW5lT3B0aW9ucyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5saW5lUGxvdCA9IGNyZWF0ZUxpbmVQbG90KGxpbmVPcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMubGluZVBsb3QuX3RyYWNlID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuZ2xwbG90LmFkZCh0aGlzLmxpbmVQbG90KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZih0aGlzLmxpbmVQbG90KSB7XG4gICAgICAgIHRoaXMuc2NlbmUuZ2xwbG90LnJlbW92ZSh0aGlzLmxpbmVQbG90KTtcbiAgICAgICAgdGhpcy5saW5lUGxvdC5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMubGluZVBsb3QgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIE4uQi4gbWFya2VyLm9wYWNpdHkgbXVzdCBiZSBhIHNjYWxhciBmb3IgcGVyZm9ybWFuY2VcbiAgICB2YXIgc2NhdHRlck9wYWNpdHkgPSBkYXRhLm9wYWNpdHk7XG4gICAgaWYoZGF0YS5tYXJrZXIgJiYgZGF0YS5tYXJrZXIub3BhY2l0eSkgc2NhdHRlck9wYWNpdHkgKj0gZGF0YS5tYXJrZXIub3BhY2l0eTtcblxuICAgIHNjYXR0ZXJPcHRpb25zID0ge1xuICAgICAgICBnbDogdGhpcy5zY2VuZS5nbHBsb3QuZ2wsXG4gICAgICAgIHBvc2l0aW9uOiBvcHRpb25zLnBvc2l0aW9uLFxuICAgICAgICBjb2xvcjogb3B0aW9ucy5zY2F0dGVyQ29sb3IsXG4gICAgICAgIHNpemU6IG9wdGlvbnMuc2NhdHRlclNpemUsXG4gICAgICAgIGdseXBoOiBvcHRpb25zLnNjYXR0ZXJNYXJrZXIsXG4gICAgICAgIG9wYWNpdHk6IHNjYXR0ZXJPcGFjaXR5LFxuICAgICAgICBvcnRob2dyYXBoaWM6IHRydWUsXG4gICAgICAgIGxpbmVXaWR0aDogb3B0aW9ucy5zY2F0dGVyTGluZVdpZHRoLFxuICAgICAgICBsaW5lQ29sb3I6IG9wdGlvbnMuc2NhdHRlckxpbmVDb2xvcixcbiAgICAgICAgcHJvamVjdDogb3B0aW9ucy5wcm9qZWN0LFxuICAgICAgICBwcm9qZWN0U2NhbGU6IG9wdGlvbnMucHJvamVjdFNjYWxlLFxuICAgICAgICBwcm9qZWN0T3BhY2l0eTogb3B0aW9ucy5wcm9qZWN0T3BhY2l0eVxuICAgIH07XG5cbiAgICBpZih0aGlzLm1vZGUuaW5kZXhPZignbWFya2VycycpICE9PSAtMSkge1xuICAgICAgICBpZih0aGlzLnNjYXR0ZXJQbG90KSB0aGlzLnNjYXR0ZXJQbG90LnVwZGF0ZShzY2F0dGVyT3B0aW9ucyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zY2F0dGVyUGxvdCA9IGNyZWF0ZVNjYXR0ZXJQbG90KHNjYXR0ZXJPcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuc2NhdHRlclBsb3QuX3RyYWNlID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2NhdHRlclBsb3QuaGlnaGxpZ2h0U2NhbGUgPSAxO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5nbHBsb3QuYWRkKHRoaXMuc2NhdHRlclBsb3QpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKHRoaXMuc2NhdHRlclBsb3QpIHtcbiAgICAgICAgdGhpcy5zY2VuZS5nbHBsb3QucmVtb3ZlKHRoaXMuc2NhdHRlclBsb3QpO1xuICAgICAgICB0aGlzLnNjYXR0ZXJQbG90LmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5zY2F0dGVyUGxvdCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGV4dE9wdGlvbnMgPSB7XG4gICAgICAgIGdsOiB0aGlzLnNjZW5lLmdscGxvdC5nbCxcbiAgICAgICAgcG9zaXRpb246IG9wdGlvbnMucG9zaXRpb24sXG4gICAgICAgIGdseXBoOiBvcHRpb25zLnRleHQsXG4gICAgICAgIGNvbG9yOiBvcHRpb25zLnRleHRDb2xvcixcbiAgICAgICAgc2l6ZTogb3B0aW9ucy50ZXh0U2l6ZSxcbiAgICAgICAgYW5nbGU6IG9wdGlvbnMudGV4dEFuZ2xlLFxuICAgICAgICBhbGlnbm1lbnQ6IG9wdGlvbnMudGV4dE9mZnNldCxcbiAgICAgICAgZm9udDogb3B0aW9ucy50ZXh0Rm9udCxcbiAgICAgICAgb3J0aG9ncmFwaGljOiB0cnVlLFxuICAgICAgICBsaW5lV2lkdGg6IDAsXG4gICAgICAgIHByb2plY3Q6IGZhbHNlLFxuICAgICAgICBvcGFjaXR5OiBkYXRhLm9wYWNpdHlcbiAgICB9O1xuXG4gICAgdGhpcy50ZXh0TGFiZWxzID0gZGF0YS5ob3ZlcnRleHQgfHwgZGF0YS50ZXh0O1xuXG4gICAgaWYodGhpcy5tb2RlLmluZGV4T2YoJ3RleHQnKSAhPT0gLTEpIHtcbiAgICAgICAgaWYodGhpcy50ZXh0TWFya2VycykgdGhpcy50ZXh0TWFya2Vycy51cGRhdGUodGV4dE9wdGlvbnMpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGV4dE1hcmtlcnMgPSBjcmVhdGVTY2F0dGVyUGxvdCh0ZXh0T3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnRleHRNYXJrZXJzLl90cmFjZSA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnRleHRNYXJrZXJzLmhpZ2hsaWdodFNjYWxlID0gMTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuZ2xwbG90LmFkZCh0aGlzLnRleHRNYXJrZXJzKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZih0aGlzLnRleHRNYXJrZXJzKSB7XG4gICAgICAgIHRoaXMuc2NlbmUuZ2xwbG90LnJlbW92ZSh0aGlzLnRleHRNYXJrZXJzKTtcbiAgICAgICAgdGhpcy50ZXh0TWFya2Vycy5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMudGV4dE1hcmtlcnMgPSBudWxsO1xuICAgIH1cblxuICAgIGVycm9yT3B0aW9ucyA9IHtcbiAgICAgICAgZ2w6IHRoaXMuc2NlbmUuZ2xwbG90LmdsLFxuICAgICAgICBwb3NpdGlvbjogb3B0aW9ucy5wb3NpdGlvbixcbiAgICAgICAgY29sb3I6IG9wdGlvbnMuZXJyb3JDb2xvcixcbiAgICAgICAgZXJyb3I6IG9wdGlvbnMuZXJyb3JCb3VuZHMsXG4gICAgICAgIGxpbmVXaWR0aDogb3B0aW9ucy5lcnJvckxpbmVXaWR0aCxcbiAgICAgICAgY2FwU2l6ZTogb3B0aW9ucy5lcnJvckNhcFNpemUsXG4gICAgICAgIG9wYWNpdHk6IGRhdGEub3BhY2l0eVxuICAgIH07XG4gICAgaWYodGhpcy5lcnJvckJhcnMpIHtcbiAgICAgICAgaWYob3B0aW9ucy5lcnJvckJvdW5kcykge1xuICAgICAgICAgICAgdGhpcy5lcnJvckJhcnMudXBkYXRlKGVycm9yT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmdscGxvdC5yZW1vdmUodGhpcy5lcnJvckJhcnMpO1xuICAgICAgICAgICAgdGhpcy5lcnJvckJhcnMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5lcnJvckJhcnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKG9wdGlvbnMuZXJyb3JCb3VuZHMpIHtcbiAgICAgICAgdGhpcy5lcnJvckJhcnMgPSBjcmVhdGVFcnJvckJhcnMoZXJyb3JPcHRpb25zKTtcbiAgICAgICAgdGhpcy5lcnJvckJhcnMuX3RyYWNlID0gdGhpcztcbiAgICAgICAgdGhpcy5zY2VuZS5nbHBsb3QuYWRkKHRoaXMuZXJyb3JCYXJzKTtcbiAgICB9XG5cbiAgICBpZihvcHRpb25zLmRlbGF1bmF5QXhpcyA+PSAwKSB7XG4gICAgICAgIHZhciBkZWxhdW5heU9wdGlvbnMgPSBjb25zdHJ1Y3REZWxhdW5heShcbiAgICAgICAgICAgIG9wdGlvbnMucG9zaXRpb24sXG4gICAgICAgICAgICBvcHRpb25zLmRlbGF1bmF5Q29sb3IsXG4gICAgICAgICAgICBvcHRpb25zLmRlbGF1bmF5QXhpc1xuICAgICAgICApO1xuICAgICAgICBkZWxhdW5heU9wdGlvbnMub3BhY2l0eSA9IGRhdGEub3BhY2l0eTtcblxuICAgICAgICBpZih0aGlzLmRlbGF1bmF5TWVzaCkge1xuICAgICAgICAgICAgdGhpcy5kZWxhdW5heU1lc2gudXBkYXRlKGRlbGF1bmF5T3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxhdW5heU9wdGlvbnMuZ2wgPSBnbDtcbiAgICAgICAgICAgIHRoaXMuZGVsYXVuYXlNZXNoID0gY3JlYXRlTWVzaChkZWxhdW5heU9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5kZWxhdW5heU1lc2guX3RyYWNlID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuZ2xwbG90LmFkZCh0aGlzLmRlbGF1bmF5TWVzaCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYodGhpcy5kZWxhdW5heU1lc2gpIHtcbiAgICAgICAgdGhpcy5zY2VuZS5nbHBsb3QucmVtb3ZlKHRoaXMuZGVsYXVuYXlNZXNoKTtcbiAgICAgICAgdGhpcy5kZWxhdW5heU1lc2guZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLmRlbGF1bmF5TWVzaCA9IG51bGw7XG4gICAgfVxufTtcblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMubGluZVBsb3QpIHtcbiAgICAgICAgdGhpcy5zY2VuZS5nbHBsb3QucmVtb3ZlKHRoaXMubGluZVBsb3QpO1xuICAgICAgICB0aGlzLmxpbmVQbG90LmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgaWYodGhpcy5zY2F0dGVyUGxvdCkge1xuICAgICAgICB0aGlzLnNjZW5lLmdscGxvdC5yZW1vdmUodGhpcy5zY2F0dGVyUGxvdCk7XG4gICAgICAgIHRoaXMuc2NhdHRlclBsb3QuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBpZih0aGlzLmVycm9yQmFycykge1xuICAgICAgICB0aGlzLnNjZW5lLmdscGxvdC5yZW1vdmUodGhpcy5lcnJvckJhcnMpO1xuICAgICAgICB0aGlzLmVycm9yQmFycy5kaXNwb3NlKCk7XG4gICAgfVxuICAgIGlmKHRoaXMudGV4dE1hcmtlcnMpIHtcbiAgICAgICAgdGhpcy5zY2VuZS5nbHBsb3QucmVtb3ZlKHRoaXMudGV4dE1hcmtlcnMpO1xuICAgICAgICB0aGlzLnRleHRNYXJrZXJzLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgaWYodGhpcy5kZWxhdW5heU1lc2gpIHtcbiAgICAgICAgdGhpcy5zY2VuZS5nbHBsb3QucmVtb3ZlKHRoaXMuZGVsYXVuYXlNZXNoKTtcbiAgICAgICAgdGhpcy5kZWxhdW5heU1lc2guZGlzcG9zZSgpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmVXaXRoTWFya2VycyhzY2VuZSwgZGF0YSkge1xuICAgIHZhciBwbG90ID0gbmV3IExpbmVXaXRoTWFya2VycyhzY2VuZSwgZGF0YS51aWQpO1xuICAgIHBsb3QudXBkYXRlKGRhdGEpO1xuICAgIHJldHVybiBwbG90O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUxpbmVXaXRoTWFya2VycztcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgaGFuZGxlTWFya2VyRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL21hcmtlcl9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUxpbmVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbGluZV9kZWZhdWx0cycpO1xudmFyIGhhbmRsZVRleHREZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvdGV4dF9kZWZhdWx0cycpO1xuXG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gaGFuZGxlWFlaRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0KTtcbiAgICBpZighbGVuKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG4gICAgY29lcmNlKCdtb2RlJyk7XG5cbiAgICBpZihzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZU91dCkpIHtcbiAgICAgICAgY29lcmNlKCdjb25uZWN0Z2FwcycpO1xuICAgICAgICBoYW5kbGVMaW5lRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UpO1xuICAgIH1cblxuICAgIGlmKHN1YlR5cGVzLmhhc01hcmtlcnModHJhY2VPdXQpKSB7XG4gICAgICAgIGhhbmRsZU1hcmtlckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlLCB7bm9TZWxlY3Q6IHRydWV9KTtcbiAgICB9XG5cbiAgICBpZihzdWJUeXBlcy5oYXNUZXh0KHRyYWNlT3V0KSkge1xuICAgICAgICBjb2VyY2UoJ3RleHR0ZW1wbGF0ZScpO1xuICAgICAgICBoYW5kbGVUZXh0RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7bm9TZWxlY3Q6IHRydWV9KTtcbiAgICB9XG5cbiAgICB2YXIgbGluZUNvbG9yID0gKHRyYWNlT3V0LmxpbmUgfHwge30pLmNvbG9yO1xuICAgIHZhciBtYXJrZXJDb2xvciA9ICh0cmFjZU91dC5tYXJrZXIgfHwge30pLmNvbG9yO1xuICAgIGlmKGNvZXJjZSgnc3VyZmFjZWF4aXMnKSA+PSAwKSBjb2VyY2UoJ3N1cmZhY2Vjb2xvcicsIGxpbmVDb2xvciB8fCBtYXJrZXJDb2xvcik7XG5cbiAgICB2YXIgZGltcyA9IFsneCcsICd5JywgJ3onXTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgIHZhciBwcm9qZWN0aW9uID0gJ3Byb2plY3Rpb24uJyArIGRpbXNbaV07XG4gICAgICAgIGlmKGNvZXJjZShwcm9qZWN0aW9uICsgJy5zaG93JykpIHtcbiAgICAgICAgICAgIGNvZXJjZShwcm9qZWN0aW9uICsgJy5vcGFjaXR5Jyk7XG4gICAgICAgICAgICBjb2VyY2UocHJvamVjdGlvbiArICcuc2NhbGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlcnJvckJhcnNTdXBwbHlEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnZXJyb3JiYXJzJywgJ3N1cHBseURlZmF1bHRzJyk7XG4gICAgZXJyb3JCYXJzU3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxpbmVDb2xvciB8fCBtYXJrZXJDb2xvciB8fCBkZWZhdWx0Q29sb3IsIHtheGlzOiAneid9KTtcbiAgICBlcnJvckJhcnNTdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGluZUNvbG9yIHx8IG1hcmtlckNvbG9yIHx8IGRlZmF1bHRDb2xvciwge2F4aXM6ICd5JywgaW5oZXJpdDogJ3onfSk7XG4gICAgZXJyb3JCYXJzU3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxpbmVDb2xvciB8fCBtYXJrZXJDb2xvciB8fCBkZWZhdWx0Q29sb3IsIHtheGlzOiAneCcsIGluaGVyaXQ6ICd6J30pO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlWFlaRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0KSB7XG4gICAgdmFyIGxlbiA9IDA7XG4gICAgdmFyIHggPSBjb2VyY2UoJ3gnKTtcbiAgICB2YXIgeSA9IGNvZXJjZSgneScpO1xuICAgIHZhciB6ID0gY29lcmNlKCd6Jyk7XG5cbiAgICB2YXIgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY2FsZW5kYXJzJywgJ2hhbmRsZVRyYWNlRGVmYXVsdHMnKTtcbiAgICBoYW5kbGVDYWxlbmRhckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBbJ3gnLCAneScsICd6J10sIGxheW91dCk7XG5cbiAgICBpZih4ICYmIHkgJiYgeikge1xuICAgICAgICAvLyBUT0RPOiB3aGF0IGhhcHBlbnMgaWYgb25lIGlzIG1pc3Npbmc/XG4gICAgICAgIGxlbiA9IE1hdGgubWluKHgubGVuZ3RoLCB5Lmxlbmd0aCwgei5sZW5ndGgpO1xuICAgICAgICB0cmFjZU91dC5fbGVuZ3RoID0gdHJhY2VPdXQuX3hsZW5ndGggPSB0cmFjZU91dC5feWxlbmd0aCA9IHRyYWNlT3V0Ll96bGVuZ3RoID0gbGVuO1xuICAgIH1cblxuICAgIHJldHVybiBsZW47XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBsb3Q6IHJlcXVpcmUoJy4vY29udmVydCcpLFxuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIG1hcmtlclN5bWJvbHM6IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9nbDNkX21hcmtlcnMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNvbG9yYmFyOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJ21hcmtlcicsXG4gICAgICAgICAgICBtaW46ICdjbWluJyxcbiAgICAgICAgICAgIG1heDogJ2NtYXgnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJ2xpbmUnLFxuICAgICAgICAgICAgbWluOiAnY21pbicsXG4gICAgICAgICAgICBtYXg6ICdjbWF4J1xuICAgICAgICB9XG4gICAgXSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3NjYXR0ZXIzZCcsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dsM2QnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2dsM2QnLCAnc3ltYm9scycsICdzaG93TGVnZW5kJywgJ3NjYXR0ZXItbGlrZSddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgaHJOYW1lOiAnc2NhdHRlcl8zZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIGRhdGEgdmlzdWFsaXplZCBhcyBzY2F0dGVyIHBvaW50IG9yIGxpbmVzIGluIDNEIGRpbWVuc2lvbicsXG4gICAgICAgICAgICAnaXMgc2V0IGluIGB4YCwgYHlgLCBgemAuJyxcbiAgICAgICAgICAgICdUZXh0IChhcHBlYXJpbmcgZWl0aGVyIG9uIHRoZSBjaGFydCBvciBvbiBob3ZlciBvbmx5KSBpcyB2aWEgYHRleHRgLicsXG4gICAgICAgICAgICAnQnViYmxlIGNoYXJ0cyBhcmUgYWNoaWV2ZWQgYnkgc2V0dGluZyBgbWFya2VyLnNpemVgIGFuZC9vciBgbWFya2VyLmNvbG9yYCcsXG4gICAgICAgICAgICAnUHJvamVjdGlvbnMgYXJlIGFjaGlldmVkIHZpYSBgcHJvamVjdGlvbmAuJyxcbiAgICAgICAgICAgICdTdXJmYWNlIGZpbGxzIGFyZSBhY2hpZXZlZCB2aWEgYHN1cmZhY2VheGlzYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=