(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_surface_js"],{

/***/ "./node_modules/gl-surface3d/lib/shaders.js":
/*!**************************************************!*\
  !*** ./node_modules/gl-surface3d/lib/shaders.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")

var vertSrc = glslify('../shaders/vertex.glsl')
var fragSrc = glslify('../shaders/fragment.glsl')
var contourVertSrc = glslify('../shaders/contour-vertex.glsl')
var pickSrc = glslify('../shaders/pick.glsl')

exports.createShader = function (gl) {
  var shader = createShader(gl, vertSrc, fragSrc, null, [
    {name: 'uv', type: 'vec4'},
    {name: 'f', type: 'vec3'},
    {name: 'normal', type: 'vec3'}
  ])
  shader.attributes.uv.location = 0
  shader.attributes.f.location = 1
  shader.attributes.normal.location = 2
  return shader
}
exports.createPickShader = function (gl) {
  var shader = createShader(gl, vertSrc, pickSrc, null, [
    {name: 'uv', type: 'vec4'},
    {name: 'f', type: 'vec3'},
    {name: 'normal', type: 'vec3'}
  ])
  shader.attributes.uv.location = 0
  shader.attributes.f.location = 1
  shader.attributes.normal.location = 2
  return shader
}
exports.createContourShader = function (gl) {
  var shader = createShader(gl, contourVertSrc, fragSrc, null, [
    {name: 'uv', type: 'vec4'},
    {name: 'f', type: 'float'}
  ])
  shader.attributes.uv.location = 0
  shader.attributes.f.location = 1
  return shader
}
exports.createPickContourShader = function (gl) {
  var shader = createShader(gl, contourVertSrc, pickSrc, null, [
    {name: 'uv', type: 'vec4'},
    {name: 'f', type: 'float'}
  ])
  shader.attributes.uv.location = 0
  shader.attributes.f.location = 1
  return shader
}


/***/ }),

/***/ "./node_modules/gl-surface3d/surface.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-surface3d/surface.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createSurfacePlot

var bits = __webpack_require__(/*! bit-twiddle */ "./node_modules/bit-twiddle/twiddle.js")
var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var createTexture = __webpack_require__(/*! gl-texture2d */ "./node_modules/gl-texture2d/texture.js")
var pool = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var colormap = __webpack_require__(/*! colormap */ "./node_modules/colormap/index.js")
var ops = __webpack_require__(/*! ndarray-ops */ "./node_modules/ndarray-ops/ndarray-ops.js")
var pack = __webpack_require__(/*! ndarray-pack */ "./node_modules/ndarray-pack/convert.js")
var ndarray = __webpack_require__(/*! ndarray */ "./node_modules/ndarray/ndarray.js")
var surfaceNets = __webpack_require__(/*! surface-nets */ "./node_modules/surface-nets/surfacenets.js")
var multiply = __webpack_require__(/*! gl-mat4/multiply */ "./node_modules/gl-mat4/multiply.js")
var invert = __webpack_require__(/*! gl-mat4/invert */ "./node_modules/gl-mat4/invert.js")
var bsearch = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")
var gradient = __webpack_require__(/*! ndarray-gradient */ "./node_modules/ndarray-gradient/fdg.js")
var shaders = __webpack_require__(/*! ./lib/shaders */ "./node_modules/gl-surface3d/lib/shaders.js")

var createShader = shaders.createShader
var createContourShader = shaders.createContourShader
var createPickShader = shaders.createPickShader
var createPickContourShader = shaders.createPickContourShader

var SURFACE_VERTEX_SIZE = 4 * (4 + 3 + 3)

var IDENTITY = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1 ]

var QUAD = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
  [1, 0],
  [0, 1]
]

var PERMUTATIONS = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

;(function () {
  for (var i = 0; i < 3; ++i) {
    var p = PERMUTATIONS[i]
    var u = (i + 1) % 3
    var v = (i + 2) % 3
    p[u + 0] = 1
    p[v + 3] = 1
    p[i + 6] = 1
  }
})()

function SurfacePickResult (position, index, uv, level, dataCoordinate) {
  this.position = position
  this.index = index
  this.uv = uv
  this.level = level
  this.dataCoordinate = dataCoordinate
}

var N_COLORS = 256

function genColormap (name, opacityscale) {
  var x = pack([colormap({
    colormap: name,
    nshades: N_COLORS,
    format: 'rgba'
  }).map(function (c, i) {
    var a = opacityscale ? getOpacityFromScale(i / 255.0, opacityscale) : 1
    return [c[0], c[1], c[2], 255 * a]
  })])
  ops.divseq(x, 255.0)
  return x
}

function SurfacePlot (
  gl,
  shape,
  bounds,
  shader,
  pickShader,
  coordinates,
  vao,
  colorMap,
  contourShader,
  contourPickShader,
  contourBuffer,
  contourVAO,
  dynamicBuffer,
  dynamicVAO,
  objectOffset) {
  this.gl = gl
  this.shape = shape
  this.bounds = bounds
  this.objectOffset = objectOffset
  this.intensityBounds = []

  this._shader = shader
  this._pickShader = pickShader
  this._coordinateBuffer = coordinates
  this._vao = vao
  this._colorMap = colorMap

  this._contourShader = contourShader
  this._contourPickShader = contourPickShader
  this._contourBuffer = contourBuffer
  this._contourVAO = contourVAO
  this._contourOffsets = [[], [], []]
  this._contourCounts = [[], [], []]
  this._vertexCount = 0

  this._pickResult = new SurfacePickResult([0, 0, 0], [0, 0], [0, 0], [0, 0, 0], [0, 0, 0])

  this._dynamicBuffer = dynamicBuffer
  this._dynamicVAO = dynamicVAO
  this._dynamicOffsets = [0, 0, 0]
  this._dynamicCounts = [0, 0, 0]

  this.contourWidth = [ 1, 1, 1 ]
  this.contourLevels = [[1], [1], [1]]
  this.contourTint = [0, 0, 0]
  this.contourColor = [[0.5, 0.5, 0.5, 1], [0.5, 0.5, 0.5, 1], [0.5, 0.5, 0.5, 1]]

  this.showContour = true
  this.showSurface = true

  this.enableHighlight = [true, true, true]
  this.highlightColor = [[0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]]
  this.highlightTint = [ 1, 1, 1 ]
  this.highlightLevel = [-1, -1, -1]

  // Dynamic contour options
  this.enableDynamic = [ true, true, true ]
  this.dynamicLevel = [ NaN, NaN, NaN ]
  this.dynamicColor = [ [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1] ]
  this.dynamicTint = [ 1, 1, 1 ]
  this.dynamicWidth = [ 1, 1, 1 ]

  this.axesBounds = [[Infinity, Infinity, Infinity], [-Infinity, -Infinity, -Infinity]]
  this.surfaceProject = [ false, false, false ]
  this.contourProject = [[ false, false, false ],
    [ false, false, false ],
    [ false, false, false ]]

  this.colorBounds = [ false, false ]

  // Store xyz fields, need this for picking
  this._field = [
    ndarray(pool.mallocFloat(1024), [0, 0]),
    ndarray(pool.mallocFloat(1024), [0, 0]),
    ndarray(pool.mallocFloat(1024), [0, 0]) ]

  this.pickId = 1
  this.clipBounds = [[-Infinity, -Infinity, -Infinity], [Infinity, Infinity, Infinity]]

  this.snapToData = false

  this.pixelRatio = 1

  this.opacity = 1.0
  this.opacityscale  = false

  this.lightPosition = [10, 10000, 0]
  this.ambientLight = 0.8
  this.diffuseLight = 0.8
  this.specularLight = 2.0
  this.roughness = 0.5
  this.fresnel = 1.5
  this.vertexColor = 0

  this.dirty = true
}

var proto = SurfacePlot.prototype

proto.isTransparent = function () {
  return this.opacity < 1 || this.opacityscale
}

proto.isOpaque = function () {
  if (this.opacityscale) {
    return false
  }
  if (this.opacity < 1) {
    return false
  }
  if (this.opacity >= 1) {
    return true
  }
  for (var i = 0; i < 3; ++i) {
    if (this._contourCounts[i].length > 0) {
      return true
    }
  }
  return false
}

proto.pickSlots = 1

proto.setPickBase = function (id) {
  this.pickId = id
}

function getOpacityFromScale(ratio, opacityscale) { // copied form gl-mesh3d
  if(!opacityscale) return 1
  if(!opacityscale.length) return 1

  for(var i = 0; i < opacityscale.length; ++i) {
    if(opacityscale.length < 2) return 1
    if(opacityscale[i][0] === ratio) return opacityscale[i][1]
    if(opacityscale[i][0] > ratio && i > 0) {
      var d = (opacityscale[i][0] - ratio) / (opacityscale[i][0] - opacityscale[i - 1][0])
      return opacityscale[i][1] * (1 - d) + d * opacityscale[i - 1][1]
    }
  }

  return 1
}

var ZERO_VEC = [0, 0, 0]

var PROJECT_DATA = {
  showSurface: false,
  showContour: false,
  projections: [IDENTITY.slice(), IDENTITY.slice(), IDENTITY.slice()],
  clipBounds: [
    [[0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0]]]
}

function computeProjectionData (camera, obj) {
  var i, j, k

  // Compute cube properties
  var cubeAxis = (obj.axes && obj.axes.lastCubeProps.axis) || ZERO_VEC

  var showSurface = obj.showSurface
  var showContour = obj.showContour

  for (i = 0; i < 3; ++i) {
    showSurface = showSurface || obj.surfaceProject[i]
    for (j = 0; j < 3; ++j) {
      showContour = showContour || obj.contourProject[i][j]
    }
  }

  for (i = 0; i < 3; ++i) {
    // Construct projection onto axis
    var axisSquish = PROJECT_DATA.projections[i]
    for (j = 0; j < 16; ++j) {
      axisSquish[j] = 0
    }
    for (j = 0; j < 4; ++j) {
      axisSquish[5 * j] = 1
    }
    axisSquish[5 * i] = 0
    axisSquish[12 + i] = obj.axesBounds[+(cubeAxis[i] > 0)][i]
    multiply(axisSquish, camera.model, axisSquish)

    var nclipBounds = PROJECT_DATA.clipBounds[i]
    for (k = 0; k < 2; ++k) {
      for (j = 0; j < 3; ++j) {
        nclipBounds[k][j] = camera.clipBounds[k][j]
      }
    }
    nclipBounds[0][i] = -1e8
    nclipBounds[1][i] = 1e8
  }

  PROJECT_DATA.showSurface = showSurface
  PROJECT_DATA.showContour = showContour

  return PROJECT_DATA
}

var UNIFORMS = {
  model: IDENTITY,
  view: IDENTITY,
  projection: IDENTITY,
  inverseModel: IDENTITY.slice(),
  lowerBound: [0, 0, 0],
  upperBound: [0, 0, 0],
  colorMap: 0,
  clipBounds: [[0, 0, 0], [0, 0, 0]],
  height: 0.0,
  contourTint: 0,
  contourColor: [0, 0, 0, 1],
  permutation: [1, 0, 0, 0, 1, 0, 0, 0, 1],
  zOffset: -1e-4,
  objectOffset: [0, 0, 0],
  kambient: 1,
  kdiffuse: 1,
  kspecular: 1,
  lightPosition: [1000, 1000, 1000],
  eyePosition: [0, 0, 0],
  roughness: 1,
  fresnel: 1,
  opacity: 1,
  vertexColor: 0
}

var MATRIX_INVERSE = IDENTITY.slice()
var DEFAULT_PERM = [1, 0, 0, 0, 1, 0, 0, 0, 1]

function drawCore (params, transparent) {
  params = params || {}
  var gl = this.gl

  gl.disable(gl.CULL_FACE)

  this._colorMap.bind(0)

  var uniforms = UNIFORMS
  uniforms.model = params.model || IDENTITY
  uniforms.view = params.view || IDENTITY
  uniforms.projection = params.projection || IDENTITY
  uniforms.lowerBound = [this.bounds[0][0], this.bounds[0][1], this.colorBounds[0] || this.bounds[0][2]]
  uniforms.upperBound = [this.bounds[1][0], this.bounds[1][1], this.colorBounds[1] || this.bounds[1][2]]
  uniforms.objectOffset = this.objectOffset
  uniforms.contourColor = this.contourColor[0]

  uniforms.inverseModel = invert(uniforms.inverseModel, uniforms.model)

  for (var i = 0; i < 2; ++i) {
    var clipClamped = uniforms.clipBounds[i]
    for (var j = 0; j < 3; ++j) {
      clipClamped[j] = Math.min(Math.max(this.clipBounds[i][j], -1e8), 1e8)
    }
  }

  uniforms.kambient = this.ambientLight
  uniforms.kdiffuse = this.diffuseLight
  uniforms.kspecular = this.specularLight

  uniforms.roughness = this.roughness
  uniforms.fresnel = this.fresnel
  uniforms.opacity = this.opacity

  uniforms.height = 0.0
  uniforms.permutation = DEFAULT_PERM

  uniforms.vertexColor = this.vertexColor

  // Compute camera matrix inverse
  var invCameraMatrix = MATRIX_INVERSE
  multiply(invCameraMatrix, uniforms.view, uniforms.model)
  multiply(invCameraMatrix, uniforms.projection, invCameraMatrix)
  invert(invCameraMatrix, invCameraMatrix)

  for (i = 0; i < 3; ++i) {
    uniforms.eyePosition[i] = invCameraMatrix[12 + i] / invCameraMatrix[15]
  }

  var w = invCameraMatrix[15]
  for (i = 0; i < 3; ++i) {
    w += this.lightPosition[i] * invCameraMatrix[4 * i + 3]
  }
  for (i = 0; i < 3; ++i) {
    var s = invCameraMatrix[12 + i]
    for (j = 0; j < 3; ++j) {
      s += invCameraMatrix[4 * j + i] * this.lightPosition[j]
    }
    uniforms.lightPosition[i] = s / w
  }

  var projectData = computeProjectionData(uniforms, this)

  if (projectData.showSurface)  {
    // Set up uniforms
    this._shader.bind()
    this._shader.uniforms = uniforms

    // Draw it
    this._vao.bind()

    if (this.showSurface && this._vertexCount) {
      this._vao.draw(gl.TRIANGLES, this._vertexCount)
    }

    // Draw projections of surface
    for (i = 0; i < 3; ++i) {
      if (!this.surfaceProject[i] || !this.vertexCount) {
        continue
      }
      this._shader.uniforms.model = projectData.projections[i]
      this._shader.uniforms.clipBounds = projectData.clipBounds[i]
      this._vao.draw(gl.TRIANGLES, this._vertexCount)
    }

    this._vao.unbind()
  }

  if (projectData.showContour) {
    var shader = this._contourShader

    // Don't apply lighting to contours
    uniforms.kambient = 1.0
    uniforms.kdiffuse = 0.0
    uniforms.kspecular = 0.0
    uniforms.opacity = 1.0

    shader.bind()
    shader.uniforms = uniforms

    // Draw contour lines
    var vao = this._contourVAO
    vao.bind()

    // Draw contour levels
    for (i = 0; i < 3; ++i) {
      shader.uniforms.permutation = PERMUTATIONS[i]
      gl.lineWidth(this.contourWidth[i] * this.pixelRatio)

      for (j = 0; j < this.contourLevels[i].length; ++j) {
        if (j === this.highlightLevel[i]) {
          shader.uniforms.contourColor = this.highlightColor[i]
          shader.uniforms.contourTint = this.highlightTint[i]
        } else if (j === 0 || (j - 1) === this.highlightLevel[i]) {
          shader.uniforms.contourColor = this.contourColor[i]
          shader.uniforms.contourTint = this.contourTint[i]
        }
        if (!this._contourCounts[i][j]) {
          continue
        }

        shader.uniforms.height = this.contourLevels[i][j]
        vao.draw(gl.LINES, this._contourCounts[i][j], this._contourOffsets[i][j])
      }
    }

    // Draw projections of surface
    for (i = 0; i < 3; ++i) {
      shader.uniforms.model = projectData.projections[i]
      shader.uniforms.clipBounds = projectData.clipBounds[i]
      for (j = 0; j < 3; ++j) {
        if (!this.contourProject[i][j]) {
          continue
        }
        shader.uniforms.permutation = PERMUTATIONS[j]
        gl.lineWidth(this.contourWidth[j] * this.pixelRatio)
        for (var k = 0; k < this.contourLevels[j].length; ++k) {
          if (k === this.highlightLevel[j]) {
            shader.uniforms.contourColor = this.highlightColor[j]
            shader.uniforms.contourTint = this.highlightTint[j]
          } else if (k === 0 || (k - 1) === this.highlightLevel[j]) {
            shader.uniforms.contourColor = this.contourColor[j]
            shader.uniforms.contourTint = this.contourTint[j]
          }
          if (!this._contourCounts[j][k]) {
            continue
          }

          shader.uniforms.height = this.contourLevels[j][k]
          vao.draw(gl.LINES, this._contourCounts[j][k], this._contourOffsets[j][k])
        }
      }
    }

    vao.unbind()

    // Draw dynamic contours
    vao = this._dynamicVAO
    vao.bind()

    // Draw contour levels
    for (i = 0; i < 3; ++i) {
      if (this._dynamicCounts[i] === 0) {
        continue
      }

      shader.uniforms.model = uniforms.model
      shader.uniforms.clipBounds = uniforms.clipBounds
      shader.uniforms.permutation = PERMUTATIONS[i]
      gl.lineWidth(this.dynamicWidth[i] * this.pixelRatio)

      shader.uniforms.contourColor = this.dynamicColor[i]
      shader.uniforms.contourTint = this.dynamicTint[i]
      shader.uniforms.height = this.dynamicLevel[i]
      vao.draw(gl.LINES, this._dynamicCounts[i], this._dynamicOffsets[i])

      for (j = 0; j < 3; ++j) {
        if (!this.contourProject[j][i]) {
          continue
        }

        shader.uniforms.model = projectData.projections[j]
        shader.uniforms.clipBounds = projectData.clipBounds[j]
        vao.draw(gl.LINES, this._dynamicCounts[i], this._dynamicOffsets[i])
      }
    }

    vao.unbind()
  }
}

proto.draw = function (params) {
  return drawCore.call(this, params, false)
}

proto.drawTransparent = function (params) {
  return drawCore.call(this, params, true)
}

var PICK_UNIFORMS = {
  model: IDENTITY,
  view: IDENTITY,
  projection: IDENTITY,
  inverseModel: IDENTITY,
  clipBounds: [[0, 0, 0], [0, 0, 0]],
  height: 0.0,
  shape: [0, 0],
  pickId: 0,
  lowerBound: [0, 0, 0],
  upperBound: [0, 0, 0],
  zOffset: 0.0,
  objectOffset: [0, 0, 0],
  permutation: [1, 0, 0, 0, 1, 0, 0, 0, 1],
  lightPosition: [0, 0, 0],
  eyePosition: [0, 0, 0]
}

proto.drawPick = function (params) {
  params = params || {}
  var gl = this.gl
  gl.disable(gl.CULL_FACE)

  var uniforms = PICK_UNIFORMS
  uniforms.model = params.model || IDENTITY
  uniforms.view = params.view || IDENTITY
  uniforms.projection = params.projection || IDENTITY
  uniforms.shape = this._field[2].shape
  uniforms.pickId = this.pickId / 255.0
  uniforms.lowerBound = this.bounds[0]
  uniforms.upperBound = this.bounds[1]
  uniforms.objectOffset = this.objectOffset
  uniforms.permutation = DEFAULT_PERM

  for (var i = 0; i < 2; ++i) {
    var clipClamped = uniforms.clipBounds[i]
    for (var j = 0; j < 3; ++j) {
      clipClamped[j] = Math.min(Math.max(this.clipBounds[i][j], -1e8), 1e8)
    }
  }

  var projectData = computeProjectionData(uniforms, this)

  if (projectData.showSurface) {
    // Set up uniforms
    this._pickShader.bind()
    this._pickShader.uniforms = uniforms

    // Draw it
    this._vao.bind()
    this._vao.draw(gl.TRIANGLES, this._vertexCount)

    // Draw projections of surface
    for (i = 0; i < 3; ++i) {
      if (!this.surfaceProject[i]) {
        continue
      }
      this._pickShader.uniforms.model = projectData.projections[i]
      this._pickShader.uniforms.clipBounds = projectData.clipBounds[i]
      this._vao.draw(gl.TRIANGLES, this._vertexCount)
    }

    this._vao.unbind()
  }

  if (projectData.showContour) {
    var shader = this._contourPickShader

    shader.bind()
    shader.uniforms = uniforms

    var vao = this._contourVAO
    vao.bind()

    for (j = 0; j < 3; ++j) {
      gl.lineWidth(this.contourWidth[j] * this.pixelRatio)
      shader.uniforms.permutation = PERMUTATIONS[j]
      for (i = 0; i < this.contourLevels[j].length; ++i) {
        if (this._contourCounts[j][i]) {
          shader.uniforms.height = this.contourLevels[j][i]
          vao.draw(gl.LINES, this._contourCounts[j][i], this._contourOffsets[j][i])
        }
      }
    }

    // Draw projections of surface
    for (i = 0; i < 3; ++i) {
      shader.uniforms.model = projectData.projections[i]
      shader.uniforms.clipBounds = projectData.clipBounds[i]

      for (j = 0; j < 3; ++j) {
        if (!this.contourProject[i][j]) {
          continue
        }

        shader.uniforms.permutation = PERMUTATIONS[j]
        gl.lineWidth(this.contourWidth[j] * this.pixelRatio)
        for (var k = 0; k < this.contourLevels[j].length; ++k) {
          if (this._contourCounts[j][k]) {
            shader.uniforms.height = this.contourLevels[j][k]
            vao.draw(gl.LINES, this._contourCounts[j][k], this._contourOffsets[j][k])
          }
        }
      }
    }

    vao.unbind()
  }
}

proto.pick = function (selection) {
  if (!selection) {
    return null
  }

  if (selection.id !== this.pickId) {
    return null
  }

  var shape = this._field[2].shape

  var result = this._pickResult

  // Compute uv coordinate
  var x = shape[0] * (selection.value[0] + (selection.value[2] >> 4) / 16.0) / 255.0
  var ix = Math.floor(x)
  var fx = x - ix

  var y = shape[1] * (selection.value[1] + (selection.value[2] & 15) / 16.0) / 255.0
  var iy = Math.floor(y)
  var fy = y - iy

  ix += 1
  iy += 1

  // Compute xyz coordinate
  var pos = result.position
  pos[0] = pos[1] = pos[2] = 0
  for (var dx = 0; dx < 2; ++dx) {
    var s = dx ? fx : 1.0 - fx
    for (var dy = 0; dy < 2; ++dy) {
      var t = dy ? fy : 1.0 - fy

      var r = ix + dx
      var c = iy + dy
      var w = s * t

      for (var i = 0; i < 3; ++i) {
        pos[i] += this._field[i].get(r, c) * w
      }
    }
  }

  // Find closest level
  var levelIndex = this._pickResult.level
  for (var j = 0; j < 3; ++j) {
    levelIndex[j] = bsearch.le(this.contourLevels[j], pos[j])
    if (levelIndex[j] < 0) {
      if (this.contourLevels[j].length > 0) {
        levelIndex[j] = 0
      }
    } else if (levelIndex[j] < this.contourLevels[j].length - 1) {
      var a = this.contourLevels[j][levelIndex[j]]
      var b = this.contourLevels[j][levelIndex[j] + 1]
      if (Math.abs(a - pos[j]) > Math.abs(b - pos[j])) {
        levelIndex[j] += 1
      }
    }
  }

  result.index[0] = fx < 0.5 ? ix : (ix + 1)
  result.index[1] = fy < 0.5 ? iy : (iy + 1)

  result.uv[0] = x / shape[0]
  result.uv[1] = y / shape[1]

  for (i = 0; i < 3; ++i) {
    result.dataCoordinate[i] = this._field[i].get(result.index[0], result.index[1])
  }

  return result
}

proto.padField = function(dstField, srcField) {
  var srcShape = srcField.shape.slice()
  var dstShape = dstField.shape.slice()

  // Center
  ops.assign(dstField.lo(1, 1).hi(srcShape[0], srcShape[1]), srcField)

  // Edges
  ops.assign(dstField.lo(1).hi(srcShape[0], 1),
    srcField.hi(srcShape[0], 1))
  ops.assign(dstField.lo(1, dstShape[1] - 1).hi(srcShape[0], 1),
    srcField.lo(0, srcShape[1] - 1).hi(srcShape[0], 1))
  ops.assign(dstField.lo(0, 1).hi(1, srcShape[1]),
    srcField.hi(1))
  ops.assign(dstField.lo(dstShape[0] - 1, 1).hi(1, srcShape[1]),
    srcField.lo(srcShape[0] - 1))
  // Corners
  dstField.set(0, 0, srcField.get(0, 0))
  dstField.set(0, dstShape[1] - 1, srcField.get(0, srcShape[1] - 1))
  dstField.set(dstShape[0] - 1, 0, srcField.get(srcShape[0] - 1, 0))
  dstField.set(dstShape[0] - 1, dstShape[1] - 1, srcField.get(srcShape[0] - 1, srcShape[1] - 1))
}

function handleArray (param, ctor) {
  if (Array.isArray(param)) {
    return [ ctor(param[0]), ctor(param[1]), ctor(param[2]) ]
  }
  return [ ctor(param), ctor(param), ctor(param) ]
}

function toColor (x) {
  if (Array.isArray(x)) {
    if (x.length === 3) {
      return [x[0], x[1], x[2], 1]
    }
    return [x[0], x[1], x[2], x[3]]
  }
  return [0, 0, 0, 1]
}

function handleColor (param) {
  if (Array.isArray(param)) {
    if (Array.isArray(param)) {
      return [
        toColor(param[0]),
        toColor(param[1]),
        toColor(param[2]) ]
    } else {
      var c = toColor(param)
      return [
        c.slice(),
        c.slice(),
        c.slice() ]
    }
  }
}

proto.update = function (params) {
  params = params || {}

  this.objectOffset = params.objectOffset || this.objectOffset

  this.dirty = true

  if ('contourWidth' in params) {
    this.contourWidth = handleArray(params.contourWidth, Number)
  }
  if ('showContour' in params) {
    this.showContour = handleArray(params.showContour, Boolean)
  }
  if ('showSurface' in params) {
    this.showSurface = !!params.showSurface
  }
  if ('contourTint' in params) {
    this.contourTint = handleArray(params.contourTint, Boolean)
  }
  if ('contourColor' in params) {
    this.contourColor = handleColor(params.contourColor)
  }
  if ('contourProject' in params) {
    this.contourProject = handleArray(params.contourProject, function (x) {
      return handleArray(x, Boolean)
    })
  }
  if ('surfaceProject' in params) {
    this.surfaceProject = params.surfaceProject
  }
  if ('dynamicColor' in params) {
    this.dynamicColor = handleColor(params.dynamicColor)
  }
  if ('dynamicTint' in params) {
    this.dynamicTint = handleArray(params.dynamicTint, Number)
  }
  if ('dynamicWidth' in params) {
    this.dynamicWidth = handleArray(params.dynamicWidth, Number)
  }
  if ('opacity' in params) {
    this.opacity = params.opacity
  }
  if('opacityscale' in params) {
    this.opacityscale = params.opacityscale
  }
  if ('colorBounds' in params) {
    this.colorBounds = params.colorBounds
  }
  if ('vertexColor' in params) {
    this.vertexColor = params.vertexColor ? 1 : 0;
  }

  var field = params.field || (params.coords && params.coords[2]) || null
  var levelsChanged = false

  if (!field) {
    if (this._field[2].shape[0] || this._field[2].shape[2]) {
      field = this._field[2].lo(1, 1).hi(this._field[2].shape[0] - 2, this._field[2].shape[1] - 2)
    } else {
      field = this._field[2].hi(0, 0)
    }
  }

  // Update field
  if ('field' in params || 'coords' in params) {
    var fsize = (field.shape[0] + 2) * (field.shape[1] + 2)

    // Resize if necessary
    if (fsize > this._field[2].data.length) {
      pool.freeFloat(this._field[2].data)
      this._field[2].data = pool.mallocFloat(bits.nextPow2(fsize))
    }

    // Pad field
    this._field[2] = ndarray(this._field[2].data, [field.shape[0] + 2, field.shape[1] + 2])
    this.padField(this._field[2], field)

    // Save shape of field
    this.shape = field.shape.slice()
    var shape = this.shape

    // Resize coordinate fields if necessary
    for (var i = 0; i < 2; ++i) {
      if (this._field[2].size > this._field[i].data.length) {
        pool.freeFloat(this._field[i].data)
        this._field[i].data = pool.mallocFloat(this._field[2].size)
      }
      this._field[i] = ndarray(this._field[i].data, [shape[0] + 2, shape[1] + 2])
    }

    // Generate x/y coordinates
    if (params.coords) {
      var coords = params.coords
      if (!Array.isArray(coords) || coords.length !== 3) {
        throw new Error('gl-surface: invalid coordinates for x/y')
      }
      for (i = 0; i < 2; ++i) {
        var coord = coords[i]
        for (j = 0; j < 2; ++j) {
          if (coord.shape[j] !== shape[j]) {
            throw new Error('gl-surface: coords have incorrect shape')
          }
        }
        this.padField(this._field[i], coord)
      }
    } else if (params.ticks) {
      var ticks = params.ticks
      if (!Array.isArray(ticks) || ticks.length !== 2) {
        throw new Error('gl-surface: invalid ticks')
      }
      for (i = 0; i < 2; ++i) {
        var tick = ticks[i]
        if (Array.isArray(tick) || tick.length) {
          tick = ndarray(tick)
        }
        if (tick.shape[0] !== shape[i]) {
          throw new Error('gl-surface: invalid tick length')
        }
        // Make a copy view of the tick array
        var tick2 = ndarray(tick.data, shape)
        tick2.stride[i] = tick.stride[0]
        tick2.stride[i ^ 1] = 0

        // Fill in field array
        this.padField(this._field[i], tick2)
      }
    } else {
      for (i = 0; i < 2; ++i) {
        var offset = [0, 0]
        offset[i] = 1
        this._field[i] = ndarray(this._field[i].data, [shape[0] + 2, shape[1] + 2], offset, 0)
      }
      this._field[0].set(0, 0, 0)
      for (var j = 0; j < shape[0]; ++j) {
        this._field[0].set(j + 1, 0, j)
      }
      this._field[0].set(shape[0] + 1, 0, shape[0] - 1)
      this._field[1].set(0, 0, 0)
      for (j = 0; j < shape[1]; ++j) {
        this._field[1].set(0, j + 1, j)
      }
      this._field[1].set(0, shape[1] + 1, shape[1] - 1)
    }

    // Save shape
    var fields = this._field

    // Compute surface normals
    var dfields = ndarray(pool.mallocFloat(fields[2].size * 3 * 2), [3, shape[0] + 2, shape[1] + 2, 2])
    for (i = 0; i < 3; ++i) {
      gradient(dfields.pick(i), fields[i], 'mirror')
    }
    var normals = ndarray(pool.mallocFloat(fields[2].size * 3), [shape[0] + 2, shape[1] + 2, 3])
    for (i = 0; i < shape[0] + 2; ++i) {
      for (j = 0; j < shape[1] + 2; ++j) {
        var dxdu = dfields.get(0, i, j, 0)
        var dxdv = dfields.get(0, i, j, 1)
        var dydu = dfields.get(1, i, j, 0)
        var dydv = dfields.get(1, i, j, 1)
        var dzdu = dfields.get(2, i, j, 0)
        var dzdv = dfields.get(2, i, j, 1)

        var nx = dydu * dzdv - dydv * dzdu
        var ny = dzdu * dxdv - dzdv * dxdu
        var nz = dxdu * dydv - dxdv * dydu

        var nl = Math.sqrt(nx * nx + ny * ny + nz * nz)
        if (nl < 1e-8) {
          nl = Math.max(Math.abs(nx), Math.abs(ny), Math.abs(nz))
          if (nl < 1e-8) {
            nz = 1.0
            ny = nx = 0.0
            nl = 1.0
          } else {
            nl = 1.0 / nl
          }
        } else {
          nl = 1.0 / Math.sqrt(nl)
        }

        normals.set(i, j, 0, nx * nl)
        normals.set(i, j, 1, ny * nl)
        normals.set(i, j, 2, nz * nl)
      }
    }
    pool.free(dfields.data)

    // Initialize surface
    var lo = [ Infinity, Infinity, Infinity ]
    var hi = [ -Infinity, -Infinity, -Infinity ]
    var lo_intensity = Infinity
    var hi_intensity = -Infinity
    var count = (shape[0] - 1) * (shape[1] - 1) * 6
    var tverts = pool.mallocFloat(bits.nextPow2(10 * count))
    var tptr = 0
    var vertexCount = 0
    for (i = 0; i < shape[0] - 1; ++i) {
      j_loop:
      for (j = 0; j < shape[1] - 1; ++j) {
        // Test for NaNs
        for (var dx = 0; dx < 2; ++dx) {
          for (var dy = 0; dy < 2; ++dy) {
            for (var k = 0; k < 3; ++k) {
              var f = this._field[k].get(1 + i + dx, 1 + j + dy)
              if (isNaN(f) || !isFinite(f)) {
                continue j_loop
              }
            }
          }
        }
        for (k = 0; k < 6; ++k) {
          var r = i + QUAD[k][0]
          var c = j + QUAD[k][1]

          var tx = this._field[0].get(r + 1, c + 1)
          var ty = this._field[1].get(r + 1, c + 1)
          f =      this._field[2].get(r + 1, c + 1)

          nx = normals.get(r + 1, c + 1, 0)
          ny = normals.get(r + 1, c + 1, 1)
          nz = normals.get(r + 1, c + 1, 2)

          if (params.intensity) {
            vf = params.intensity.get(r, c)
          }

          var vf = (params.intensity) ?
            params.intensity.get(r, c) :
            f + this.objectOffset[2];

          tverts[tptr++] = r
          tverts[tptr++] = c
          tverts[tptr++] = tx
          tverts[tptr++] = ty
          tverts[tptr++] = f
          tverts[tptr++] = 0
          tverts[tptr++] = vf
          tverts[tptr++] = nx
          tverts[tptr++] = ny
          tverts[tptr++] = nz

          lo[0] = Math.min(lo[0], tx + this.objectOffset[0])
          lo[1] = Math.min(lo[1], ty + this.objectOffset[1])
          lo[2] = Math.min(lo[2], f  + this.objectOffset[2])
          lo_intensity = Math.min(lo_intensity, vf)

          hi[0] = Math.max(hi[0], tx + this.objectOffset[0])
          hi[1] = Math.max(hi[1], ty + this.objectOffset[1])
          hi[2] = Math.max(hi[2], f  + this.objectOffset[2])
          hi_intensity = Math.max(hi_intensity, vf)

          vertexCount += 1
        }
      }
    }

    if (params.intensityBounds) {
      lo_intensity = +params.intensityBounds[0]
      hi_intensity = +params.intensityBounds[1]
    }

    // Scale all vertex intensities
    for (i = 6; i < tptr; i += 10) {
      tverts[i] = (tverts[i] - lo_intensity) / (hi_intensity - lo_intensity)
    }

    this._vertexCount = vertexCount
    this._coordinateBuffer.update(tverts.subarray(0, tptr))
    pool.freeFloat(tverts)
    pool.free(normals.data)

    // Update bounds
    this.bounds = [lo, hi]

    // Save intensity
    this.intensity = params.intensity || this._field[2]

    if(this.intensityBounds[0] !== lo_intensity || this.intensityBounds[1] !== hi_intensity) {
        levelsChanged = true
    }

    // Save intensity bound
    this.intensityBounds = [lo_intensity, hi_intensity]
  }

  // Update level crossings
  if ('levels' in params) {
    var levels = params.levels
    if (!Array.isArray(levels[0])) {
      levels = [ [], [], levels ]
    } else {
      levels = levels.slice()
    }
    for (i = 0; i < 3; ++i) {
      levels[i] = levels[i].slice()
      levels[i].sort(function (a, b) {
        return a - b
      })
    }
    for (i = 0; i < 3; ++i) {
      for (j = 0; j < levels[i].length; ++j) {
        levels[i][j] -= this.objectOffset[i]
      }
    }
    change_test:
    for (i = 0; i < 3; ++i) {
      if (levels[i].length !== this.contourLevels[i].length) {
        levelsChanged = true
        break
      }
      for (j = 0; j < levels[i].length; ++j) {
        if (levels[i][j] !== this.contourLevels[i][j]) {
          levelsChanged = true
          break change_test
        }
      }
    }
    this.contourLevels = levels
  }

  if (levelsChanged) {
    fields = this._field
    shape = this.shape

    // Update contour lines
    var contourVerts = []

    for (var dim = 0; dim < 3; ++dim) {
      var contourLevel = this.contourLevels[dim]

      var levelOffsets = []
      var levelCounts = []

      var parts = [0, 0, 0]

      for (i = 0; i < contourLevel.length; ++i) {
        var graph = surfaceNets(this._field[dim], contourLevel[i])

        levelOffsets.push((contourVerts.length / 5) | 0)
        vertexCount = 0

        edge_loop:
        for (j = 0; j < graph.cells.length; ++j) {
          var e = graph.cells[j]
          for (k = 0; k < 2; ++k) {
            var p = graph.positions[e[k]]

            var x = p[0]
            var ix = Math.floor(x) | 0
            var fx = x - ix

            var y = p[1]
            var iy = Math.floor(y) | 0
            var fy = y - iy

            var hole = false
            axis_loop:
            for (var axis = 0; axis < 3; ++axis) {
              parts[axis] = 0.0
              var iu = (dim + axis + 1) % 3
              for (dx = 0; dx < 2; ++dx) {
                var s = dx ? fx : 1.0 - fx
                r = Math.min(Math.max(ix + dx, 0), shape[0]) | 0
                for (dy = 0; dy < 2; ++dy) {
                  var t = dy ? fy : 1.0 - fy
                  c = Math.min(Math.max(iy + dy, 0), shape[1]) | 0

                  if (axis < 2) {
                    f = this._field[iu].get(r, c)
                  } else {
                    f = (this.intensity.get(r, c) - this.intensityBounds[0]) / (this.intensityBounds[1] - this.intensityBounds[0])
                  }
                  if (!isFinite(f) || isNaN(f)) {
                    hole = true
                    break axis_loop
                  }

                  var w = s * t
                  parts[axis] += w * f
                }
              }
            }

            if (!hole) {
              contourVerts.push(
                parts[0],
                parts[1],
                p[0],
                p[1],
                parts[2]
              )
              vertexCount += 1
            } else {
              if (k > 0) {
                // If we already added first edge, pop off verts
                for (var l = 0; l < 5; ++l) {
                  contourVerts.pop()
                }
                vertexCount -= 1
              }
              continue edge_loop
            }
          }
        }
        levelCounts.push(vertexCount)
      }

      // Store results
      this._contourOffsets[dim] = levelOffsets
      this._contourCounts[dim] = levelCounts

    }

    var floatBuffer = pool.mallocFloat(contourVerts.length)
    for (i = 0; i < contourVerts.length; ++i) {
      floatBuffer[i] = contourVerts[i]
    }
    this._contourBuffer.update(floatBuffer)
    pool.freeFloat(floatBuffer)
  }

  if (params.colormap) {
    this._colorMap.setPixels(genColormap(params.colormap, this.opacityscale))
  }
}

proto.dispose = function () {
  this._shader.dispose()
  this._vao.dispose()
  this._coordinateBuffer.dispose()
  this._colorMap.dispose()
  this._contourBuffer.dispose()
  this._contourVAO.dispose()
  this._contourShader.dispose()
  this._contourPickShader.dispose()
  this._dynamicBuffer.dispose()
  this._dynamicVAO.dispose()
  for (var i = 0; i < 3; ++i) {
    pool.freeFloat(this._field[i].data)
  }
}

proto.highlight = function (selection) {
  var i

  if (!selection) {
    this._dynamicCounts = [0, 0, 0]
    this.dyanamicLevel = [NaN, NaN, NaN]
    this.highlightLevel = [-1, -1, -1]
    return
  }

  for (i = 0; i < 3; ++i) {
    if (this.enableHighlight[i]) {
      this.highlightLevel[i] = selection.level[i]
    } else {
      this.highlightLevel[i] = -1
    }
  }

  var levels
  if (this.snapToData) {
    levels = selection.dataCoordinate
  } else {
    levels = selection.position
  }
  for (i = 0; i < 3; ++i) {
    levels[i] -= this.objectOffset[i]
  }
  if ((!this.enableDynamic[0] || levels[0] === this.dynamicLevel[0]) &&
    (!this.enableDynamic[1] || levels[1] === this.dynamicLevel[1]) &&
    (!this.enableDynamic[2] || levels[2] === this.dynamicLevel[2])) {
    return
  }

  var vertexCount = 0
  var shape = this.shape
  var scratchBuffer = pool.mallocFloat(12 * shape[0] * shape[1])

  for (var d = 0; d < 3; ++d) {
    if (!this.enableDynamic[d]) {
      this.dynamicLevel[d] = NaN
      this._dynamicCounts[d] = 0
      continue
    }

    this.dynamicLevel[d] = levels[d]

    var u = (d + 1) % 3
    var v = (d + 2) % 3

    var f = this._field[d]
    var g = this._field[u]
    var h = this._field[v]

    var graph = surfaceNets(f, levels[d])
    var edges = graph.cells
    var positions = graph.positions

    this._dynamicOffsets[d] = vertexCount

    for (i = 0; i < edges.length; ++i) {
      var e = edges[i]
      for (var j = 0; j < 2; ++j) {
        var p = positions[e[j]]

        var x = +p[0]
        var ix = x | 0
        var jx = Math.min(ix + 1, shape[0]) | 0
        var fx = x - ix
        var hx = 1.0 - fx

        var y = +p[1]
        var iy = y | 0
        var jy = Math.min(iy + 1, shape[1]) | 0
        var fy = y - iy
        var hy = 1.0 - fy

        var w00 = hx * hy
        var w01 = hx * fy
        var w10 = fx * hy
        var w11 = fx * fy

        var cu = w00 * g.get(ix, iy) +
          w01 * g.get(ix, jy) +
          w10 * g.get(jx, iy) +
          w11 * g.get(jx, jy)

        var cv = w00 * h.get(ix, iy) +
          w01 * h.get(ix, jy) +
          w10 * h.get(jx, iy) +
          w11 * h.get(jx, jy)

        if (isNaN(cu) || isNaN(cv)) {
          if (j) {
            vertexCount -= 1
          }
          break
        }

        scratchBuffer[2 * vertexCount + 0] = cu
        scratchBuffer[2 * vertexCount + 1] = cv

        vertexCount += 1
      }
    }

    this._dynamicCounts[d] = vertexCount - this._dynamicOffsets[d]
  }

  this._dynamicBuffer.update(scratchBuffer.subarray(0, 2 * vertexCount))
  pool.freeFloat(scratchBuffer)
}

function createSurfacePlot (params) {
  var gl = params.gl

  var shader = createShader(gl)
  var pickShader = createPickShader(gl)
  var contourShader = createContourShader(gl)
  var contourPickShader = createPickContourShader(gl)

  var coordinateBuffer = createBuffer(gl)
  var vao = createVAO(gl, [
    { buffer: coordinateBuffer,
      size: 4,
      stride: SURFACE_VERTEX_SIZE,
      offset: 0
    },
    { buffer: coordinateBuffer,
      size: 3,
      stride: SURFACE_VERTEX_SIZE,
      offset: 16
    },
    {
      buffer: coordinateBuffer,
      size: 3,
      stride: SURFACE_VERTEX_SIZE,
      offset: 28
    }
  ])

  var contourBuffer = createBuffer(gl)
  var contourVAO = createVAO(gl, [
    {
      buffer: contourBuffer,
      size: 4,
      stride: 20,
      offset: 0
    },
    {
      buffer: contourBuffer,
      size: 1,
      stride: 20,
      offset: 16
    }
  ])

  var dynamicBuffer = createBuffer(gl)
  var dynamicVAO = createVAO(gl, [
    {
      buffer: dynamicBuffer,
      size: 2,
      type: gl.FLOAT
    }])

  var cmap = createTexture(gl, 1, N_COLORS, gl.RGBA, gl.UNSIGNED_BYTE)
  cmap.minFilter = gl.LINEAR
  cmap.magFilter = gl.LINEAR

  var surface = new SurfacePlot(
    gl,
    [0, 0], // shape
    [[0, 0, 0], [0, 0, 0]], // bounds
    shader,
    pickShader,
    coordinateBuffer,
    vao,
    cmap,
    contourShader,
    contourPickShader,
    contourBuffer,
    contourVAO,
    dynamicBuffer,
    dynamicVAO,
    [0, 0, 0] // objectOffset
  )

  var nparams = {
    levels: [[], [], []]
  }
  for (var id in params) {
    nparams[id] = params[id]
  }
  nparams.colormap = nparams.colormap || 'jet'

  surface.update(nparams)

  return surface
}


/***/ }),

/***/ "./node_modules/ndarray-gradient/fdg.js":
/*!**********************************************!*\
  !*** ./node_modules/ndarray-gradient/fdg.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports      = gradient

var dup             = __webpack_require__(/*! dup */ "./node_modules/dup/dup.js")
var cwiseCompiler   = __webpack_require__(/*! cwise-compiler */ "./node_modules/cwise-compiler/compiler.js")

var TEMPLATE_CACHE  = {}
var GRADIENT_CACHE  = {}

var EmptyProc = {
  body: "",
  args: [],
  thisVars: [],
  localVars: []
}

var centralDiff = cwiseCompiler({
  args: [ 'array', 'array', 'array' ],
  pre: EmptyProc,
  post: EmptyProc,
  body: {
    args: [ {
      name: 'out', 
      lvalue: true,
      rvalue: false,
      count: 1
    }, {
      name: 'left', 
      lvalue: false,
      rvalue: true,
      count: 1
    }, {
      name: 'right', 
      lvalue: false,
      rvalue: true,
      count: 1
    }],
    body: "out=0.5*(left-right)",
    thisVars: [],
    localVars: []
  },
  funcName: 'cdiff'
})

var zeroOut = cwiseCompiler({
  args: [ 'array' ],
  pre: EmptyProc,
  post: EmptyProc,
  body: {
    args: [ {
      name: 'out', 
      lvalue: true,
      rvalue: false,
      count: 1
    }],
    body: "out=0",
    thisVars: [],
    localVars: []
  },
  funcName: 'zero'
})

function generateTemplate(d) {
  if(d in TEMPLATE_CACHE) {
    return TEMPLATE_CACHE[d]
  }
  var code = []
  for(var i=0; i<d; ++i) {
    code.push('out', i, 's=0.5*(inp', i, 'l-inp', i, 'r);')
  }
  var args = [ 'array' ]
  var names = ['junk']
  for(var i=0; i<d; ++i) {
    args.push('array')
    names.push('out' + i + 's')
    var o = dup(d)
    o[i] = -1
    args.push({
      array: 0,
      offset: o.slice()
    })
    o[i] = 1
    args.push({
      array: 0,
      offset: o.slice()
    })
    names.push('inp' + i + 'l', 'inp' + i + 'r')
  }
  return TEMPLATE_CACHE[d] = cwiseCompiler({
    args: args,
    pre:  EmptyProc,
    post: EmptyProc,
    body: {
      body: code.join(''),
      args: names.map(function(n) {
        return {
          name: n,
          lvalue: n.indexOf('out') === 0,
          rvalue: n.indexOf('inp') === 0,
          count: (n!=='junk')|0
        }
      }),
      thisVars: [],
      localVars: []
    },
    funcName: 'fdTemplate' + d
  })
}

function generateGradient(boundaryConditions) {
  var token = boundaryConditions.join()
  var proc = GRADIENT_CACHE[token]
  if(proc) {
    return proc
  }

  var d = boundaryConditions.length
  var code = ['function gradient(dst,src){var s=src.shape.slice();' ]
  
  function handleBoundary(facet) {
    var cod = d - facet.length

    var loStr = []
    var hiStr = []
    var pickStr = []
    for(var i=0; i<d; ++i) {
      if(facet.indexOf(i+1) >= 0) {
        pickStr.push('0')
      } else if(facet.indexOf(-(i+1)) >= 0) {
        pickStr.push('s['+i+']-1')
      } else {
        pickStr.push('-1')
        loStr.push('1')
        hiStr.push('s['+i+']-2')
      }
    }
    var boundStr = '.lo(' + loStr.join() + ').hi(' + hiStr.join() + ')'
    if(loStr.length === 0) {
      boundStr = ''
    }
        
    if(cod > 0) {
      code.push('if(1') 
      for(var i=0; i<d; ++i) {
        if(facet.indexOf(i+1) >= 0 || facet.indexOf(-(i+1)) >= 0) {
          continue
        }
        code.push('&&s[', i, ']>2')
      }
      code.push('){grad', cod, '(src.pick(', pickStr.join(), ')', boundStr)
      for(var i=0; i<d; ++i) {
        if(facet.indexOf(i+1) >= 0 || facet.indexOf(-(i+1)) >= 0) {
          continue
        }
        code.push(',dst.pick(', pickStr.join(), ',', i, ')', boundStr)
      }
      code.push(');')
    }

    for(var i=0; i<facet.length; ++i) {
      var bnd = Math.abs(facet[i])-1
      var outStr = 'dst.pick(' + pickStr.join() + ',' + bnd + ')' + boundStr
      switch(boundaryConditions[bnd]) {

        case 'clamp':
          var cPickStr = pickStr.slice()
          var dPickStr = pickStr.slice()
          if(facet[i] < 0) {
            cPickStr[bnd] = 's[' + bnd + ']-2'
          } else {
            dPickStr[bnd] = '1'
          }
          if(cod === 0) {
            code.push('if(s[', bnd, ']>1){dst.set(',
              pickStr.join(), ',', bnd, ',0.5*(src.get(',
                cPickStr.join(), ')-src.get(',
                dPickStr.join(), ')))}else{dst.set(',
              pickStr.join(), ',', bnd, ',0)};')
          } else {
            code.push('if(s[', bnd, ']>1){diff(', outStr, 
                ',src.pick(', cPickStr.join(), ')', boundStr, 
                ',src.pick(', dPickStr.join(), ')', boundStr, 
                ');}else{zero(', outStr, ');};')
          }
        break

        case 'mirror':
          if(cod === 0) {
            code.push('dst.set(', pickStr.join(), ',', bnd, ',0);')
          } else {
            code.push('zero(', outStr, ');')
          }
        break

        case 'wrap':
          var aPickStr = pickStr.slice()
          var bPickStr = pickStr.slice()
          if(facet[i] < 0) {
            aPickStr[bnd] = 's[' + bnd + ']-2'
            bPickStr[bnd] = '0'
            
          } else {
            aPickStr[bnd] = 's[' + bnd + ']-1'
            bPickStr[bnd] = '1'
          }
          if(cod === 0) {
            code.push('if(s[', bnd, ']>2){dst.set(',
              pickStr.join(), ',', bnd, ',0.5*(src.get(',
                aPickStr.join(), ')-src.get(',
                bPickStr.join(), ')))}else{dst.set(',
              pickStr.join(), ',', bnd, ',0)};')
          } else {
            code.push('if(s[', bnd, ']>2){diff(', outStr, 
                ',src.pick(', aPickStr.join(), ')', boundStr, 
                ',src.pick(', bPickStr.join(), ')', boundStr, 
                ');}else{zero(', outStr, ');};')
          }
        break

        default:
          throw new Error('ndarray-gradient: Invalid boundary condition')
      }
    }

    if(cod > 0) {
      code.push('};')
    }
  }

  //Enumerate ridges, facets, etc. of hypercube
  for(var i=0; i<(1<<d); ++i) {
    var faces = []
    for(var j=0; j<d; ++j) {
      if(i & (1<<j)) {
        faces.push(j+1)
      }
    }
    for(var k=0; k<(1<<faces.length); ++k) {
      var sfaces = faces.slice()
      for(var j=0; j<faces.length; ++j) {
        if(k & (1<<j)) {
          sfaces[j] = -sfaces[j]
        }
      }
      handleBoundary(sfaces)
    }
  }

  code.push('return dst;};return gradient')

  //Compile and link routine, save cached procedure
  var linkNames = [ 'diff', 'zero' ]
  var linkArgs  = [ centralDiff, zeroOut ]
  for(var i=1; i<=d; ++i) {
    linkNames.push('grad' + i)
    linkArgs.push(generateTemplate(i))
  }
  linkNames.push(code.join(''))

  var link = Function.apply(void 0, linkNames)
  var proc = link.apply(void 0, linkArgs)
  TEMPLATE_CACHE[token] = proc
  return proc
}

function gradient(out, inp, bc) {
  if(Array.isArray(bc)) {
    if(bc.length !== inp.dimension) {
      throw new Error('ndarray-gradient: invalid boundary conditions')
    }
  } else if(typeof bc === 'string') {
    bc = dup(inp.dimension, bc)
  } else {
    bc = dup(inp.dimension, 'clamp')
  }
  if(out.dimension !== inp.dimension + 1) {
    throw new Error('ndarray-gradient: output dimension must be +1 input dimension')
  }
  if(out.shape[inp.dimension] !== inp.dimension) {
    throw new Error('ndarray-gradient: output shape must match input shape')
  }
  for(var i=0; i<inp.dimension; ++i) {
    if(out.shape[i] !== inp.shape[i]) {
      throw new Error('ndarray-gradient: shape mismatch')
    }
  }
  if(inp.size === 0) {
    return out
  }
  if(inp.dimension <= 0) {
    out.set(0)
    return out
  }
  var cached = generateGradient(bc)
  return cached(out, inp)
}

/***/ }),

/***/ "./node_modules/ndarray-linear-interpolate/interp.js":
/*!***********************************************************!*\
  !*** ./node_modules/ndarray-linear-interpolate/interp.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";


function interp1d(arr, x) {
  var ix = Math.floor(x)
    , fx = x - ix
    , s0 = 0 <= ix   && ix   < arr.shape[0]
    , s1 = 0 <= ix+1 && ix+1 < arr.shape[0]
    , w0 = s0 ? +arr.get(ix)   : 0.0
    , w1 = s1 ? +arr.get(ix+1) : 0.0
  return (1.0-fx)*w0 + fx*w1
}

function interp2d(arr, x, y) {
  var ix = Math.floor(x)
    , fx = x - ix
    , s0 = 0 <= ix   && ix   < arr.shape[0]
    , s1 = 0 <= ix+1 && ix+1 < arr.shape[0]
    , iy = Math.floor(y)
    , fy = y - iy
    , t0 = 0 <= iy   && iy   < arr.shape[1]
    , t1 = 0 <= iy+1 && iy+1 < arr.shape[1]
    , w00 = s0&&t0 ? arr.get(ix  ,iy  ) : 0.0
    , w01 = s0&&t1 ? arr.get(ix  ,iy+1) : 0.0
    , w10 = s1&&t0 ? arr.get(ix+1,iy  ) : 0.0
    , w11 = s1&&t1 ? arr.get(ix+1,iy+1) : 0.0
  return (1.0-fy) * ((1.0-fx)*w00 + fx*w10) + fy * ((1.0-fx)*w01 + fx*w11)
}

function interp3d(arr, x, y, z) {
  var ix = Math.floor(x)
    , fx = x - ix
    , s0 = 0 <= ix   && ix   < arr.shape[0]
    , s1 = 0 <= ix+1 && ix+1 < arr.shape[0]
    , iy = Math.floor(y)
    , fy = y - iy
    , t0 = 0 <= iy   && iy   < arr.shape[1]
    , t1 = 0 <= iy+1 && iy+1 < arr.shape[1]
    , iz = Math.floor(z)
    , fz = z - iz
    , u0 = 0 <= iz   && iz   < arr.shape[2]
    , u1 = 0 <= iz+1 && iz+1 < arr.shape[2]
    , w000 = s0&&t0&&u0 ? arr.get(ix,iy,iz)       : 0.0
    , w010 = s0&&t1&&u0 ? arr.get(ix,iy+1,iz)     : 0.0
    , w100 = s1&&t0&&u0 ? arr.get(ix+1,iy,iz)     : 0.0
    , w110 = s1&&t1&&u0 ? arr.get(ix+1,iy+1,iz)   : 0.0
    , w001 = s0&&t0&&u1 ? arr.get(ix,iy,iz+1)     : 0.0
    , w011 = s0&&t1&&u1 ? arr.get(ix,iy+1,iz+1)   : 0.0
    , w101 = s1&&t0&&u1 ? arr.get(ix+1,iy,iz+1)   : 0.0
    , w111 = s1&&t1&&u1 ? arr.get(ix+1,iy+1,iz+1) : 0.0
  return (1.0-fz) * ((1.0-fy) * ((1.0-fx)*w000 + fx*w100) + fy * ((1.0-fx)*w010 + fx*w110)) + fz * ((1.0-fy) * ((1.0-fx)*w001 + fx*w101) + fy * ((1.0-fx)*w011 + fx*w111))
}

function interpNd(arr) {
  var d = arr.shape.length|0
    , ix = new Array(d)
    , fx = new Array(d)
    , s0 = new Array(d)
    , s1 = new Array(d)
    , i, t
  for(i=0; i<d; ++i) {
    t = +arguments[i+1]
    ix[i] = Math.floor(t)
    fx[i] = t - ix[i]
    s0[i] = (0 <= ix[i]   && ix[i]   < arr.shape[i])
    s1[i] = (0 <= ix[i]+1 && ix[i]+1 < arr.shape[i])
  }
  var r = 0.0, j, w, idx
i_loop:
  for(i=0; i<(1<<d); ++i) {
    w = 1.0
    idx = arr.offset
    for(j=0; j<d; ++j) {
      if(i & (1<<j)) {
        if(!s1[j]) {
          continue i_loop
        }
        w *= fx[j]
        idx += arr.stride[j] * (ix[j] + 1)
      } else {
        if(!s0[j]) {
          continue i_loop
        }
        w *= 1.0 - fx[j]
        idx += arr.stride[j] * ix[j]
      }
    }
    r += w * arr.data[idx]
  }
  return r
}

function interpolate(arr, x, y, z) {
  switch(arr.shape.length) {
    case 0:
      return 0.0
    case 1:
      return interp1d(arr, x)
    case 2:
      return interp2d(arr, x, y)
    case 3:
      return interp3d(arr, x, y, z)
    default:
      return interpNd.apply(undefined, arguments)
  }
}
module.exports = interpolate
module.exports.d1 = interp1d
module.exports.d2 = interp2d
module.exports.d3 = interp3d


/***/ }),

/***/ "./node_modules/ndarray-pack/convert.js":
/*!**********************************************!*\
  !*** ./node_modules/ndarray-pack/convert.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ndarray = __webpack_require__(/*! ndarray */ "./node_modules/ndarray/ndarray.js")
var do_convert = __webpack_require__(/*! ./doConvert.js */ "./node_modules/ndarray-pack/doConvert.js")

module.exports = function convert(arr, result) {
  var shape = [], c = arr, sz = 1
  while(Array.isArray(c)) {
    shape.push(c.length)
    sz *= c.length
    c = c[0]
  }
  if(shape.length === 0) {
    return ndarray()
  }
  if(!result) {
    result = ndarray(new Float64Array(sz), shape)
  }
  do_convert(result, arr)
  return result
}


/***/ }),

/***/ "./node_modules/ndarray-pack/doConvert.js":
/*!************************************************!*\
  !*** ./node_modules/ndarray-pack/doConvert.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=__webpack_require__(/*! cwise-compiler */ "./node_modules/cwise-compiler/compiler.js")({"args":["array","scalar","index"],"pre":{"body":"{}","args":[],"thisVars":[],"localVars":[]},"body":{"body":"{\nvar _inline_1_v=_inline_1_arg1_,_inline_1_i\nfor(_inline_1_i=0;_inline_1_i<_inline_1_arg2_.length-1;++_inline_1_i) {\n_inline_1_v=_inline_1_v[_inline_1_arg2_[_inline_1_i]]\n}\n_inline_1_arg0_=_inline_1_v[_inline_1_arg2_[_inline_1_arg2_.length-1]]\n}","args":[{"name":"_inline_1_arg0_","lvalue":true,"rvalue":false,"count":1},{"name":"_inline_1_arg1_","lvalue":false,"rvalue":true,"count":1},{"name":"_inline_1_arg2_","lvalue":false,"rvalue":true,"count":4}],"thisVars":[],"localVars":["_inline_1_i","_inline_1_v"]},"post":{"body":"{}","args":[],"thisVars":[],"localVars":[]},"funcName":"convert","blockSize":64})


/***/ }),

/***/ "./node_modules/plotly.js/lib/surface.js":
/*!***********************************************!*\
  !*** ./node_modules/plotly.js/lib/surface.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/surface */ "./node_modules/plotly.js/src/traces/surface/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/surface/calc.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/surface/calc.js ***!
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




var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");


// Compute auto-z and autocolorscale if applicable
module.exports = function calc(gd, trace) {
    if(trace.surfacecolor) {
        colorscaleCalc(gd, trace, {
            vals: trace.surfacecolor,
            containerStr: '',
            cLetter: 'c'
        });
    } else {
        colorscaleCalc(gd, trace, {
            vals: trace.z,
            containerStr: '',
            cLetter: 'c'
        });
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/surface/convert.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/surface/convert.js ***!
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




var createSurface = __webpack_require__(/*! gl-surface3d */ "./node_modules/gl-surface3d/surface.js");

var ndarray = __webpack_require__(/*! ndarray */ "./node_modules/ndarray/ndarray.js");
var ndarrayInterp2d = __webpack_require__(/*! ndarray-linear-interpolate */ "./node_modules/ndarray-linear-interpolate/interp.js").d2;

var interp2d = __webpack_require__(/*! ../heatmap/interp2d */ "./node_modules/plotly.js/src/traces/heatmap/interp2d.js");
var findEmpties = __webpack_require__(/*! ../heatmap/find_empties */ "./node_modules/plotly.js/src/traces/heatmap/find_empties.js");

var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;
var parseColorScale = __webpack_require__(/*! ../../lib/gl_format_color */ "./node_modules/plotly.js/src/lib/gl_format_color.js").parseColorScale;
var str2RgbaArray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");
var extractOpts = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").extractOpts;

function SurfaceTrace(scene, surface, uid) {
    this.scene = scene;
    this.uid = uid;
    this.surface = surface;
    this.data = null;
    this.showContour = [false, false, false];
    this.contourStart = [null, null, null];
    this.contourEnd = [null, null, null];
    this.contourSize = [0, 0, 0];
    this.minValues = [Infinity, Infinity, Infinity];
    this.maxValues = [-Infinity, -Infinity, -Infinity];
    this.dataScaleX = 1.0;
    this.dataScaleY = 1.0;
    this.refineData = true;
    this.objectOffset = [0, 0, 0];
}

var proto = SurfaceTrace.prototype;

proto.getXat = function(a, b, calendar, axis) {
    var v = (
       (!isArrayOrTypedArray(this.data.x)) ?
            a :
       (isArrayOrTypedArray(this.data.x[0])) ?
            this.data.x[b][a] :
            this.data.x[a]
    );

    return (calendar === undefined) ? v : axis.d2l(v, 0, calendar);
};

proto.getYat = function(a, b, calendar, axis) {
    var v = (
       (!isArrayOrTypedArray(this.data.y)) ?
            b :
       (isArrayOrTypedArray(this.data.y[0])) ?
            this.data.y[b][a] :
            this.data.y[b]
    );

    return (calendar === undefined) ? v : axis.d2l(v, 0, calendar);
};

proto.getZat = function(a, b, calendar, axis) {
    var v = this.data.z[b][a];

    if(v === null && this.data.connectgaps && this.data._interpolatedZ) {
        v = this.data._interpolatedZ[b][a];
    }

    return (calendar === undefined) ? v : axis.d2l(v, 0, calendar);
};

proto.handlePick = function(selection) {
    if(selection.object === this.surface) {
        var xRatio = (selection.data.index[0] - 1) / this.dataScaleX - 1;
        var yRatio = (selection.data.index[1] - 1) / this.dataScaleY - 1;

        var j = Math.max(Math.min(Math.round(xRatio), this.data.z[0].length - 1), 0);
        var k = Math.max(Math.min(Math.round(yRatio), this.data._ylength - 1), 0);

        selection.index = [j, k];

        selection.traceCoordinate = [
            this.getXat(j, k),
            this.getYat(j, k),
            this.getZat(j, k)
        ];

        selection.dataCoordinate = [
            this.getXat(j, k, this.data.xcalendar, this.scene.fullSceneLayout.xaxis),
            this.getYat(j, k, this.data.ycalendar, this.scene.fullSceneLayout.yaxis),
            this.getZat(j, k, this.data.zcalendar, this.scene.fullSceneLayout.zaxis)
        ];

        for(var i = 0; i < 3; i++) {
            var v = selection.dataCoordinate[i];
            if(v !== null && v !== undefined) {
                selection.dataCoordinate[i] *= this.scene.dataScale[i];
            }
        }

        var text = this.data.hovertext || this.data.text;
        if(Array.isArray(text) && text[k] && text[k][j] !== undefined) {
            selection.textLabel = text[k][j];
        } else if(text) {
            selection.textLabel = text;
        } else {
            selection.textLabel = '';
        }

        selection.data.dataCoordinate = selection.dataCoordinate.slice();

        this.surface.highlight(selection.data);

        // Snap spikes to data coordinate
        this.scene.glplot.spikes.position = selection.dataCoordinate;

        return true;
    }
};

function isColormapCircular(colormap) {
    var first = colormap[0].rgb;
    var last = colormap[colormap.length - 1].rgb;

    return (
        first[0] === last[0] &&
        first[1] === last[1] &&
        first[2] === last[2] &&
        first[3] === last[3]
    );
}

var shortPrimes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
    211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293,
    307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397,
    401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
    503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599,
    601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691,
    701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797,
    809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887,
    907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997,
    1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097,
    1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193,
    1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297,
    1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399,
    1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499,
    1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597,
    1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699,
    1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789,
    1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889,
    1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999,
    2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099,
    2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179,
    2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297,
    2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399,
    2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477,
    2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593,
    2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699,
    2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797,
    2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897,
    2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999
];

function getPow(a, b) {
    if(a < b) return 0;
    var n = 0;
    while(Math.floor(a % b) === 0) {
        a /= b;
        n++;
    }
    return n;
}

function getFactors(a) {
    var powers = [];
    for(var i = 0; i < shortPrimes.length; i++) {
        var b = shortPrimes[i];
        powers.push(
            getPow(a, b)
        );
    }
    return powers;
}

function smallestDivisor(a) {
    var A = getFactors(a);
    var result = a;
    for(var i = 0; i < shortPrimes.length; i++) {
        if(A[i] > 0) {
            result = shortPrimes[i];
            break;
        }
    }
    return result;
}

function leastCommonMultiple(a, b) {
    if(a < 1 || b < 1) return undefined;
    var A = getFactors(a);
    var B = getFactors(b);
    var n = 1;
    for(var i = 0; i < shortPrimes.length; i++) {
        n *= Math.pow(
            shortPrimes[i], Math.max(A[i], B[i])
        );
    }
    return n;
}

function arrayLCM(A) {
    if(A.length === 0) return undefined;
    var n = 1;
    for(var i = 0; i < A.length; i++) {
        n = leastCommonMultiple(n, A[i]);
    }
    return n;
}

proto.calcXnums = function(xlen) {
    var i;
    var nums = [];
    for(i = 1; i < xlen; i++) {
        var a = this.getXat(i - 1, 0);
        var b = this.getXat(i, 0);

        if(b !== a &&
            a !== undefined && a !== null &&
            b !== undefined && b !== null) {
            nums[i - 1] = Math.abs(b - a);
        } else {
            nums[i - 1] = 0;
        }
    }

    var totalDist = 0;
    for(i = 1; i < xlen; i++) {
        totalDist += nums[i - 1];
    }

    for(i = 1; i < xlen; i++) {
        if(nums[i - 1] === 0) {
            nums[i - 1] = 1;
        } else {
            nums[i - 1] = Math.round(totalDist / nums[i - 1]);
        }
    }

    return nums;
};

proto.calcYnums = function(ylen) {
    var i;
    var nums = [];
    for(i = 1; i < ylen; i++) {
        var a = this.getYat(0, i - 1);
        var b = this.getYat(0, i);

        if(b !== a &&
            a !== undefined && a !== null &&
            b !== undefined && b !== null) {
            nums[i - 1] = Math.abs(b - a);
        } else {
            nums[i - 1] = 0;
        }
    }

    var totalDist = 0;
    for(i = 1; i < ylen; i++) {
        totalDist += nums[i - 1];
    }

    for(i = 1; i < ylen; i++) {
        if(nums[i - 1] === 0) {
            nums[i - 1] = 1;
        } else {
            nums[i - 1] = Math.round(totalDist / nums[i - 1]);
        }
    }

    return nums;
};

var highlyComposites = [1, 2, 4, 6, 12, 24, 36, 48, 60, 120, 180, 240, 360, 720, 840, 1260];

var MIN_RESOLUTION = highlyComposites[9];
var MAX_RESOLUTION = highlyComposites[13];

proto.estimateScale = function(resSrc, axis) {
    var nums = (axis === 0) ?
        this.calcXnums(resSrc) :
        this.calcYnums(resSrc);

    var resDst = 1 + arrayLCM(nums);

    while(resDst < MIN_RESOLUTION) {
        resDst *= 2;
    }

    while(resDst > MAX_RESOLUTION) {
        resDst--;
        resDst /= smallestDivisor(resDst);
        resDst++;

        if(resDst < MIN_RESOLUTION) {
         // resDst = MIN_RESOLUTION; // option 1: use min resolution
            resDst = MAX_RESOLUTION; // option 2: use max resolution
        }
    }

    var scale = Math.round(resDst / resSrc);
    return (scale > 1) ? scale : 1;
};

// based on Mikola Lysenko's ndarray-homography
// see https://github.com/scijs/ndarray-homography

function fnHomography(out, inp, X) {
    var w = X[8] + X[2] * inp[0] + X[5] * inp[1];
    out[0] = (X[6] + X[0] * inp[0] + X[3] * inp[1]) / w;
    out[1] = (X[7] + X[1] * inp[0] + X[4] * inp[1]) / w;
    return out;
}

function homography(dest, src, X) {
    warp(dest, src, fnHomography, X);
    return dest;
}

// based on Mikola Lysenko's ndarray-warp
// see https://github.com/scijs/ndarray-warp

function warp(dest, src, func, X) {
    var warped = [0, 0];
    var ni = dest.shape[0];
    var nj = dest.shape[1];
    for(var i = 0; i < ni; i++) {
        for(var j = 0; j < nj; j++) {
            func(warped, [i, j], X);
            dest.set(i, j, ndarrayInterp2d(src, warped[0], warped[1]));
        }
    }
    return dest;
}

proto.refineCoords = function(coords) {
    var scaleW = this.dataScaleX;
    var scaleH = this.dataScaleY;

    var width = coords[0].shape[0];
    var height = coords[0].shape[1];

    var newWidth = Math.floor(coords[0].shape[0] * scaleW + 1) | 0;
    var newHeight = Math.floor(coords[0].shape[1] * scaleH + 1) | 0;

    // Pad coords by +1
    var padWidth = 1 + width + 1;
    var padHeight = 1 + height + 1;
    var padImg = ndarray(new Float32Array(padWidth * padHeight), [padWidth, padHeight]);
    var X = [
        1 / scaleW, 0, 0,
        0, 1 / scaleH, 0,
        0, 0, 1
    ];

    for(var i = 0; i < coords.length; ++i) {
        this.surface.padField(padImg, coords[i]);

        var scaledImg = ndarray(new Float32Array(newWidth * newHeight), [newWidth, newHeight]);
        homography(scaledImg, padImg, X);
        coords[i] = scaledImg;
    }
};

function insertIfNewLevel(arr, newValue) {
    var found = false;
    for(var k = 0; k < arr.length; k++) {
        if(newValue === arr[k]) {
            found = true;
            break;
        }
    }
    if(found === false) arr.push(newValue);
}

proto.setContourLevels = function() {
    var newLevels = [[], [], []];
    var useNewLevels = [false, false, false];
    var needsUpdate = false;

    var i, j, value;

    for(i = 0; i < 3; ++i) {
        if(this.showContour[i]) {
            needsUpdate = true;

            if(
                this.contourSize[i] > 0 &&
                this.contourStart[i] !== null &&
                this.contourEnd[i] !== null &&
                this.contourEnd[i] > this.contourStart[i]
            ) {
                useNewLevels[i] = true;

                for(j = this.contourStart[i]; j < this.contourEnd[i]; j += this.contourSize[i]) {
                    value = j * this.scene.dataScale[i];

                    insertIfNewLevel(newLevels[i], value);
                }
            }
        }
    }

    if(needsUpdate) {
        var allLevels = [[], [], []];
        for(i = 0; i < 3; ++i) {
            if(this.showContour[i]) {
                allLevels[i] = useNewLevels[i] ? newLevels[i] : this.scene.contourLevels[i];
            }
        }
        this.surface.update({ levels: allLevels });
    }
};

proto.update = function(data) {
    var scene = this.scene;
    var sceneLayout = scene.fullSceneLayout;
    var surface = this.surface;
    var alpha = data.opacity;
    var colormap = parseColorScale(data, alpha);
    var scaleFactor = scene.dataScale;
    var xlen = data.z[0].length;
    var ylen = data._ylength;
    var contourLevels = scene.contourLevels;

    // Save data
    this.data = data;

    /*
     * Fill and transpose zdata.
     * Consistent with 'heatmap' and 'contour', plotly 'surface'
     * 'z' are such that sub-arrays correspond to y-coords
     * and that the sub-array entries correspond to a x-coords,
     * which is the transpose of 'gl-surface-plot'.
     */

    var i, j, k, v;
    var rawCoords = [];
    for(i = 0; i < 3; i++) {
        rawCoords[i] = [];
        for(j = 0; j < xlen; j++) {
            rawCoords[i][j] = [];
            /*
            for(k = 0; k < ylen; k++) {
                rawCoords[i][j][k] = undefined;
            }
            */
        }
    }

    // coords x, y & z
    for(j = 0; j < xlen; j++) {
        for(k = 0; k < ylen; k++) {
            rawCoords[0][j][k] = this.getXat(j, k, data.xcalendar, sceneLayout.xaxis);
            rawCoords[1][j][k] = this.getYat(j, k, data.ycalendar, sceneLayout.yaxis);
            rawCoords[2][j][k] = this.getZat(j, k, data.zcalendar, sceneLayout.zaxis);
        }
    }

    if(data.connectgaps) {
        data._emptypoints = findEmpties(rawCoords[2]);
        interp2d(rawCoords[2], data._emptypoints);

        data._interpolatedZ = [];
        for(j = 0; j < xlen; j++) {
            data._interpolatedZ[j] = [];
            for(k = 0; k < ylen; k++) {
                data._interpolatedZ[j][k] = rawCoords[2][j][k];
            }
        }
    }

    // Note: log axes are not defined in surfaces yet.
    // but they could be defined here...

    for(i = 0; i < 3; i++) {
        for(j = 0; j < xlen; j++) {
            for(k = 0; k < ylen; k++) {
                v = rawCoords[i][j][k];
                if(v === null || v === undefined) {
                    rawCoords[i][j][k] = NaN;
                } else {
                    v = rawCoords[i][j][k] *= scaleFactor[i];
                }
            }
        }
    }

    for(i = 0; i < 3; i++) {
        for(j = 0; j < xlen; j++) {
            for(k = 0; k < ylen; k++) {
                v = rawCoords[i][j][k];
                if(v !== null && v !== undefined) {
                    if(this.minValues[i] > v) {
                        this.minValues[i] = v;
                    }
                    if(this.maxValues[i] < v) {
                        this.maxValues[i] = v;
                    }
                }
            }
        }
    }

    for(i = 0; i < 3; i++) {
        this.objectOffset[i] = 0.5 * (this.minValues[i] + this.maxValues[i]);
    }

    for(i = 0; i < 3; i++) {
        for(j = 0; j < xlen; j++) {
            for(k = 0; k < ylen; k++) {
                v = rawCoords[i][j][k];
                if(v !== null && v !== undefined) {
                    rawCoords[i][j][k] -= this.objectOffset[i];
                }
            }
        }
    }

    // convert processed raw data to Float32 matrices
    var coords = [
        ndarray(new Float32Array(xlen * ylen), [xlen, ylen]),
        ndarray(new Float32Array(xlen * ylen), [xlen, ylen]),
        ndarray(new Float32Array(xlen * ylen), [xlen, ylen])
    ];
    for(i = 0; i < 3; i++) {
        for(j = 0; j < xlen; j++) {
            for(k = 0; k < ylen; k++) {
                coords[i].set(j, k, rawCoords[i][j][k]);
            }
        }
    }
    rawCoords = []; // free memory

    var params = {
        colormap: colormap,
        levels: [[], [], []],
        showContour: [true, true, true],
        showSurface: !data.hidesurface,
        contourProject: [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ],
        contourWidth: [1, 1, 1],
        contourColor: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
        contourTint: [1, 1, 1],
        dynamicColor: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
        dynamicWidth: [1, 1, 1],
        dynamicTint: [1, 1, 1],
        opacityscale: data.opacityscale,
        opacity: data.opacity
    };

    var cOpts = extractOpts(data);
    params.intensityBounds = [cOpts.min, cOpts.max];

    // Refine surface color if necessary
    if(data.surfacecolor) {
        var intensity = ndarray(new Float32Array(xlen * ylen), [xlen, ylen]);

        for(j = 0; j < xlen; j++) {
            for(k = 0; k < ylen; k++) {
                intensity.set(j, k, data.surfacecolor[k][j]);
            }
        }

        coords.push(intensity);
    } else {
        // when 'z' is used as 'intensity',
        // we must scale its value
        params.intensityBounds[0] *= scaleFactor[2];
        params.intensityBounds[1] *= scaleFactor[2];
    }

    if(MAX_RESOLUTION < coords[0].shape[0] ||
        MAX_RESOLUTION < coords[0].shape[1]) {
        this.refineData = false;
    }

    if(this.refineData === true) {
        this.dataScaleX = this.estimateScale(coords[0].shape[0], 0);
        this.dataScaleY = this.estimateScale(coords[0].shape[1], 1);
        if(this.dataScaleX !== 1 || this.dataScaleY !== 1) {
            this.refineCoords(coords);
        }
    }

    if(data.surfacecolor) {
        params.intensity = coords.pop();
    }

    var highlightEnable = [true, true, true];
    var axis = ['x', 'y', 'z'];

    for(i = 0; i < 3; ++i) {
        var contourParams = data.contours[axis[i]];
        highlightEnable[i] = contourParams.highlight;

        params.showContour[i] = contourParams.show || contourParams.highlight;
        if(!params.showContour[i]) continue;

        params.contourProject[i] = [
            contourParams.project.x,
            contourParams.project.y,
            contourParams.project.z
        ];

        if(contourParams.show) {
            this.showContour[i] = true;
            params.levels[i] = contourLevels[i];
            surface.highlightColor[i] = params.contourColor[i] = str2RgbaArray(contourParams.color);

            if(contourParams.usecolormap) {
                surface.highlightTint[i] = params.contourTint[i] = 0;
            } else {
                surface.highlightTint[i] = params.contourTint[i] = 1;
            }
            params.contourWidth[i] = contourParams.width;

            this.contourStart[i] = contourParams.start;
            this.contourEnd[i] = contourParams.end;
            this.contourSize[i] = contourParams.size;
        } else {
            this.showContour[i] = false;

            this.contourStart[i] = null;
            this.contourEnd[i] = null;
            this.contourSize[i] = 0;
        }

        if(contourParams.highlight) {
            params.dynamicColor[i] = str2RgbaArray(contourParams.highlightcolor);
            params.dynamicWidth[i] = contourParams.highlightwidth;
        }
    }

    // see https://github.com/plotly/plotly.js/issues/940
    if(isColormapCircular(colormap)) {
        params.vertexColor = true;
    }

    params.objectOffset = this.objectOffset;

    params.coords = coords;
    surface.update(params);

    surface.visible = data.visible;
    surface.enableDynamic = highlightEnable;
    surface.enableHighlight = highlightEnable;

    surface.snapToData = true;

    if('lighting' in data) {
        surface.ambientLight = data.lighting.ambient;
        surface.diffuseLight = data.lighting.diffuse;
        surface.specularLight = data.lighting.specular;
        surface.roughness = data.lighting.roughness;
        surface.fresnel = data.lighting.fresnel;
    }

    if('lightposition' in data) {
        surface.lightPosition = [data.lightposition.x, data.lightposition.y, data.lightposition.z];
    }

    if(alpha && alpha < 1) {
        surface.supportsTransparency = true;
    }
};

proto.dispose = function() {
    this.scene.glplot.remove(this.surface);
    this.surface.dispose();
};

function createSurfaceTrace(scene, data) {
    var gl = scene.glplot.gl;
    var surface = createSurface({ gl: gl });
    var result = new SurfaceTrace(scene, surface, data.uid);
    surface._trace = result;
    result.update(data);
    scene.glplot.add(surface);
    return result;
}

module.exports = createSurfaceTrace;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/surface/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/surface/defaults.js ***!
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



var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/surface/attributes.js");

var MIN = 0.1; // Note: often we don't want the data cube to be disappeared

function createWave(n, minOpacity) {
    var arr = [];
    var steps = 32; // Max: 256
    for(var i = 0; i < steps; i++) {
        var u = i / (steps - 1);
        var v = minOpacity + (1 - minOpacity) * (1 - Math.pow(Math.sin(n * u * Math.PI), 2));
        arr.push([
            u,
            Math.max(0, Math.min(1, v))
        ]);
    }
    return arr;
}

function isValidScaleArray(scl) {
    var highestVal = 0;

    if(!Array.isArray(scl) || scl.length < 2) return false;

    if(!scl[0] || !scl[scl.length - 1]) return false;

    if(+scl[0][0] !== 0 || +scl[scl.length - 1][0] !== 1) return false;

    for(var i = 0; i < scl.length; i++) {
        var si = scl[i];

        if(si.length !== 2 || +si[0] < highestVal) {
            return false;
        }

        highestVal = +si[0];
    }

    return true;
}

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    var i, j;

    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var x = coerce('x');
    var y = coerce('y');

    var z = coerce('z');
    if(!z || !z.length ||
       (x ? (x.length < 1) : false) ||
       (y ? (y.length < 1) : false)
    ) {
        traceOut.visible = false;
        return;
    }

    traceOut._xlength = (Array.isArray(x) && Lib.isArrayOrTypedArray(x[0])) ? z.length : z[0].length;
    traceOut._ylength = z.length;

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y', 'z'], layout);

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    // Coerce remaining properties
    [
        'lighting.ambient',
        'lighting.diffuse',
        'lighting.specular',
        'lighting.roughness',
        'lighting.fresnel',
        'lightposition.x',
        'lightposition.y',
        'lightposition.z',
        'hidesurface',
        'connectgaps',
        'opacity'
    ].forEach(function(x) { coerce(x); });

    var surfaceColor = coerce('surfacecolor');

    var dims = ['x', 'y', 'z'];
    for(i = 0; i < 3; ++i) {
        var contourDim = 'contours.' + dims[i];
        var show = coerce(contourDim + '.show');
        var highlight = coerce(contourDim + '.highlight');

        if(show || highlight) {
            for(j = 0; j < 3; ++j) {
                coerce(contourDim + '.project.' + dims[j]);
            }
        }

        if(show) {
            coerce(contourDim + '.color');
            coerce(contourDim + '.width');
            coerce(contourDim + '.usecolormap');
        }

        if(highlight) {
            coerce(contourDim + '.highlightcolor');
            coerce(contourDim + '.highlightwidth');
        }

        coerce(contourDim + '.start');
        coerce(contourDim + '.end');
        coerce(contourDim + '.size');
    }

    // backward compatibility block
    if(!surfaceColor) {
        mapLegacy(traceIn, 'zmin', 'cmin');
        mapLegacy(traceIn, 'zmax', 'cmax');
        mapLegacy(traceIn, 'zauto', 'cauto');
    }

    // TODO if contours.?.usecolormap are false and hidesurface is true
    // the colorbar shouldn't be shown by default

    colorscaleDefaults(
        traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'c'}
    );

    opacityscaleDefaults(traceIn, traceOut, layout, coerce);

    // disable 1D transforms - currently surface does NOT support column data like heatmap does
    // you can use mesh3d for this use case, but not surface
    traceOut._length = null;
}

function opacityscaleDefaults(traceIn, traceOut, layout, coerce) {
    var opacityscale = coerce('opacityscale');
    if(opacityscale === 'max') {
        traceOut.opacityscale = [[0, MIN], [1, 1]];
    } else if(opacityscale === 'min') {
        traceOut.opacityscale = [[0, 1], [1, MIN]];
    } else if(opacityscale === 'extremes') {
        traceOut.opacityscale = createWave(1, MIN);
    } else if(!isValidScaleArray(opacityscale)) {
        traceOut.opacityscale = undefined;
    }
}

function mapLegacy(traceIn, oldAttr, newAttr) {
    if(oldAttr in traceIn && !(newAttr in traceIn)) {
        traceIn[newAttr] = traceIn[oldAttr];
    }
}

module.exports = {
    supplyDefaults: supplyDefaults,
    opacityscaleDefaults: opacityscaleDefaults
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/surface/index.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/surface/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/surface/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/surface/defaults.js").supplyDefaults,
    colorbar: {
        min: 'cmin',
        max: 'cmax'
    },
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/surface/calc.js"),
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/surface/convert.js"),

    moduleType: 'trace',
    name: 'surface',
    basePlotModule: __webpack_require__(/*! ../../plots/gl3d */ "./node_modules/plotly.js/src/plots/gl3d/index.js"),
    categories: ['gl3d', '2dMap', 'showLegend'],
    meta: {
        description: [
            'The data the describes the coordinates of the surface is set in `z`.',
            'Data in `z` should be a {2D array}.',

            'Coordinates in `x` and `y` can either be 1D {arrays}',
            'or {2D arrays} (e.g. to graph parametric surfaces).',

            'If not provided in `x` and `y`, the x and y coordinates are assumed',
            'to be linear starting at 0 with a unit step.',

            'The color scale corresponds to the `z` values by default.',
            'For custom color scales, use `surfacecolor` which should be a {2D array},',
            'where its bounds can be controlled using `cmin` and `cmax`.'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXN1cmZhY2UzZC9saWIvc2hhZGVycy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXN1cmZhY2UzZC9zdXJmYWNlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvbmRhcnJheS1ncmFkaWVudC9mZGcuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9uZGFycmF5LWxpbmVhci1pbnRlcnBvbGF0ZS9pbnRlcnAuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9uZGFycmF5LXBhY2svY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL25kYXJyYXktcGFjay9kb0NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvbGliL3N1cmZhY2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zdXJmYWNlL2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zdXJmYWNlL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zdXJmYWNlL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc3VyZmFjZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLG1CQUFtQixtQkFBTyxDQUFDLG9EQUFXO0FBQ3RDLGNBQWMsbUJBQU8sQ0FBQyxrREFBUzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7O0FB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFVBQVU7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFVBQVU7QUFDeEI7QUFDQTs7QUFFQSxjQUFjLFVBQVU7QUFDeEI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFVBQVU7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFVBQVU7QUFDeEI7QUFDQTs7QUFFQSxjQUFjLFVBQVU7QUFDeEI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7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ZW50IjpbInZhciBjcmVhdGVTaGFkZXIgPSByZXF1aXJlKCdnbC1zaGFkZXInKVxudmFyIGdsc2xpZnkgPSByZXF1aXJlKCdnbHNsaWZ5JylcblxudmFyIHZlcnRTcmMgPSBnbHNsaWZ5KCcuLi9zaGFkZXJzL3ZlcnRleC5nbHNsJylcbnZhciBmcmFnU3JjID0gZ2xzbGlmeSgnLi4vc2hhZGVycy9mcmFnbWVudC5nbHNsJylcbnZhciBjb250b3VyVmVydFNyYyA9IGdsc2xpZnkoJy4uL3NoYWRlcnMvY29udG91ci12ZXJ0ZXguZ2xzbCcpXG52YXIgcGlja1NyYyA9IGdsc2xpZnkoJy4uL3NoYWRlcnMvcGljay5nbHNsJylcblxuZXhwb3J0cy5jcmVhdGVTaGFkZXIgPSBmdW5jdGlvbiAoZ2wpIHtcbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgdmVydFNyYywgZnJhZ1NyYywgbnVsbCwgW1xuICAgIHtuYW1lOiAndXYnLCB0eXBlOiAndmVjNCd9LFxuICAgIHtuYW1lOiAnZicsIHR5cGU6ICd2ZWMzJ30sXG4gICAge25hbWU6ICdub3JtYWwnLCB0eXBlOiAndmVjMyd9XG4gIF0pXG4gIHNoYWRlci5hdHRyaWJ1dGVzLnV2LmxvY2F0aW9uID0gMFxuICBzaGFkZXIuYXR0cmlidXRlcy5mLmxvY2F0aW9uID0gMVxuICBzaGFkZXIuYXR0cmlidXRlcy5ub3JtYWwubG9jYXRpb24gPSAyXG4gIHJldHVybiBzaGFkZXJcbn1cbmV4cG9ydHMuY3JlYXRlUGlja1NoYWRlciA9IGZ1bmN0aW9uIChnbCkge1xuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCB2ZXJ0U3JjLCBwaWNrU3JjLCBudWxsLCBbXG4gICAge25hbWU6ICd1dicsIHR5cGU6ICd2ZWM0J30sXG4gICAge25hbWU6ICdmJywgdHlwZTogJ3ZlYzMnfSxcbiAgICB7bmFtZTogJ25vcm1hbCcsIHR5cGU6ICd2ZWMzJ31cbiAgXSlcbiAgc2hhZGVyLmF0dHJpYnV0ZXMudXYubG9jYXRpb24gPSAwXG4gIHNoYWRlci5hdHRyaWJ1dGVzLmYubG9jYXRpb24gPSAxXG4gIHNoYWRlci5hdHRyaWJ1dGVzLm5vcm1hbC5sb2NhdGlvbiA9IDJcbiAgcmV0dXJuIHNoYWRlclxufVxuZXhwb3J0cy5jcmVhdGVDb250b3VyU2hhZGVyID0gZnVuY3Rpb24gKGdsKSB7XG4gIHZhciBzaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIGNvbnRvdXJWZXJ0U3JjLCBmcmFnU3JjLCBudWxsLCBbXG4gICAge25hbWU6ICd1dicsIHR5cGU6ICd2ZWM0J30sXG4gICAge25hbWU6ICdmJywgdHlwZTogJ2Zsb2F0J31cbiAgXSlcbiAgc2hhZGVyLmF0dHJpYnV0ZXMudXYubG9jYXRpb24gPSAwXG4gIHNoYWRlci5hdHRyaWJ1dGVzLmYubG9jYXRpb24gPSAxXG4gIHJldHVybiBzaGFkZXJcbn1cbmV4cG9ydHMuY3JlYXRlUGlja0NvbnRvdXJTaGFkZXIgPSBmdW5jdGlvbiAoZ2wpIHtcbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgY29udG91clZlcnRTcmMsIHBpY2tTcmMsIG51bGwsIFtcbiAgICB7bmFtZTogJ3V2JywgdHlwZTogJ3ZlYzQnfSxcbiAgICB7bmFtZTogJ2YnLCB0eXBlOiAnZmxvYXQnfVxuICBdKVxuICBzaGFkZXIuYXR0cmlidXRlcy51di5sb2NhdGlvbiA9IDBcbiAgc2hhZGVyLmF0dHJpYnV0ZXMuZi5sb2NhdGlvbiA9IDFcbiAgcmV0dXJuIHNoYWRlclxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU3VyZmFjZVBsb3RcblxudmFyIGJpdHMgPSByZXF1aXJlKCdiaXQtdHdpZGRsZScpXG52YXIgY3JlYXRlQnVmZmVyID0gcmVxdWlyZSgnZ2wtYnVmZmVyJylcbnZhciBjcmVhdGVWQU8gPSByZXF1aXJlKCdnbC12YW8nKVxudmFyIGNyZWF0ZVRleHR1cmUgPSByZXF1aXJlKCdnbC10ZXh0dXJlMmQnKVxudmFyIHBvb2wgPSByZXF1aXJlKCd0eXBlZGFycmF5LXBvb2wnKVxudmFyIGNvbG9ybWFwID0gcmVxdWlyZSgnY29sb3JtYXAnKVxudmFyIG9wcyA9IHJlcXVpcmUoJ25kYXJyYXktb3BzJylcbnZhciBwYWNrID0gcmVxdWlyZSgnbmRhcnJheS1wYWNrJylcbnZhciBuZGFycmF5ID0gcmVxdWlyZSgnbmRhcnJheScpXG52YXIgc3VyZmFjZU5ldHMgPSByZXF1aXJlKCdzdXJmYWNlLW5ldHMnKVxudmFyIG11bHRpcGx5ID0gcmVxdWlyZSgnZ2wtbWF0NC9tdWx0aXBseScpXG52YXIgaW52ZXJ0ID0gcmVxdWlyZSgnZ2wtbWF0NC9pbnZlcnQnKVxudmFyIGJzZWFyY2ggPSByZXF1aXJlKCdiaW5hcnktc2VhcmNoLWJvdW5kcycpXG52YXIgZ3JhZGllbnQgPSByZXF1aXJlKCduZGFycmF5LWdyYWRpZW50JylcbnZhciBzaGFkZXJzID0gcmVxdWlyZSgnLi9saWIvc2hhZGVycycpXG5cbnZhciBjcmVhdGVTaGFkZXIgPSBzaGFkZXJzLmNyZWF0ZVNoYWRlclxudmFyIGNyZWF0ZUNvbnRvdXJTaGFkZXIgPSBzaGFkZXJzLmNyZWF0ZUNvbnRvdXJTaGFkZXJcbnZhciBjcmVhdGVQaWNrU2hhZGVyID0gc2hhZGVycy5jcmVhdGVQaWNrU2hhZGVyXG52YXIgY3JlYXRlUGlja0NvbnRvdXJTaGFkZXIgPSBzaGFkZXJzLmNyZWF0ZVBpY2tDb250b3VyU2hhZGVyXG5cbnZhciBTVVJGQUNFX1ZFUlRFWF9TSVpFID0gNCAqICg0ICsgMyArIDMpXG5cbnZhciBJREVOVElUWSA9IFtcbiAgMSwgMCwgMCwgMCxcbiAgMCwgMSwgMCwgMCxcbiAgMCwgMCwgMSwgMCxcbiAgMCwgMCwgMCwgMSBdXG5cbnZhciBRVUFEID0gW1xuICBbMCwgMF0sXG4gIFswLCAxXSxcbiAgWzEsIDBdLFxuICBbMSwgMV0sXG4gIFsxLCAwXSxcbiAgWzAsIDFdXG5dXG5cbnZhciBQRVJNVVRBVElPTlMgPSBbXG4gIFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcbiAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF1cbl1cblxuOyhmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgdmFyIHAgPSBQRVJNVVRBVElPTlNbaV1cbiAgICB2YXIgdSA9IChpICsgMSkgJSAzXG4gICAgdmFyIHYgPSAoaSArIDIpICUgM1xuICAgIHBbdSArIDBdID0gMVxuICAgIHBbdiArIDNdID0gMVxuICAgIHBbaSArIDZdID0gMVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIFN1cmZhY2VQaWNrUmVzdWx0IChwb3NpdGlvbiwgaW5kZXgsIHV2LCBsZXZlbCwgZGF0YUNvb3JkaW5hdGUpIHtcbiAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uXG4gIHRoaXMuaW5kZXggPSBpbmRleFxuICB0aGlzLnV2ID0gdXZcbiAgdGhpcy5sZXZlbCA9IGxldmVsXG4gIHRoaXMuZGF0YUNvb3JkaW5hdGUgPSBkYXRhQ29vcmRpbmF0ZVxufVxuXG52YXIgTl9DT0xPUlMgPSAyNTZcblxuZnVuY3Rpb24gZ2VuQ29sb3JtYXAgKG5hbWUsIG9wYWNpdHlzY2FsZSkge1xuICB2YXIgeCA9IHBhY2soW2NvbG9ybWFwKHtcbiAgICBjb2xvcm1hcDogbmFtZSxcbiAgICBuc2hhZGVzOiBOX0NPTE9SUyxcbiAgICBmb3JtYXQ6ICdyZ2JhJ1xuICB9KS5tYXAoZnVuY3Rpb24gKGMsIGkpIHtcbiAgICB2YXIgYSA9IG9wYWNpdHlzY2FsZSA/IGdldE9wYWNpdHlGcm9tU2NhbGUoaSAvIDI1NS4wLCBvcGFjaXR5c2NhbGUpIDogMVxuICAgIHJldHVybiBbY1swXSwgY1sxXSwgY1syXSwgMjU1ICogYV1cbiAgfSldKVxuICBvcHMuZGl2c2VxKHgsIDI1NS4wKVxuICByZXR1cm4geFxufVxuXG5mdW5jdGlvbiBTdXJmYWNlUGxvdCAoXG4gIGdsLFxuICBzaGFwZSxcbiAgYm91bmRzLFxuICBzaGFkZXIsXG4gIHBpY2tTaGFkZXIsXG4gIGNvb3JkaW5hdGVzLFxuICB2YW8sXG4gIGNvbG9yTWFwLFxuICBjb250b3VyU2hhZGVyLFxuICBjb250b3VyUGlja1NoYWRlcixcbiAgY29udG91ckJ1ZmZlcixcbiAgY29udG91clZBTyxcbiAgZHluYW1pY0J1ZmZlcixcbiAgZHluYW1pY1ZBTyxcbiAgb2JqZWN0T2Zmc2V0KSB7XG4gIHRoaXMuZ2wgPSBnbFxuICB0aGlzLnNoYXBlID0gc2hhcGVcbiAgdGhpcy5ib3VuZHMgPSBib3VuZHNcbiAgdGhpcy5vYmplY3RPZmZzZXQgPSBvYmplY3RPZmZzZXRcbiAgdGhpcy5pbnRlbnNpdHlCb3VuZHMgPSBbXVxuXG4gIHRoaXMuX3NoYWRlciA9IHNoYWRlclxuICB0aGlzLl9waWNrU2hhZGVyID0gcGlja1NoYWRlclxuICB0aGlzLl9jb29yZGluYXRlQnVmZmVyID0gY29vcmRpbmF0ZXNcbiAgdGhpcy5fdmFvID0gdmFvXG4gIHRoaXMuX2NvbG9yTWFwID0gY29sb3JNYXBcblxuICB0aGlzLl9jb250b3VyU2hhZGVyID0gY29udG91clNoYWRlclxuICB0aGlzLl9jb250b3VyUGlja1NoYWRlciA9IGNvbnRvdXJQaWNrU2hhZGVyXG4gIHRoaXMuX2NvbnRvdXJCdWZmZXIgPSBjb250b3VyQnVmZmVyXG4gIHRoaXMuX2NvbnRvdXJWQU8gPSBjb250b3VyVkFPXG4gIHRoaXMuX2NvbnRvdXJPZmZzZXRzID0gW1tdLCBbXSwgW11dXG4gIHRoaXMuX2NvbnRvdXJDb3VudHMgPSBbW10sIFtdLCBbXV1cbiAgdGhpcy5fdmVydGV4Q291bnQgPSAwXG5cbiAgdGhpcy5fcGlja1Jlc3VsdCA9IG5ldyBTdXJmYWNlUGlja1Jlc3VsdChbMCwgMCwgMF0sIFswLCAwXSwgWzAsIDBdLCBbMCwgMCwgMF0sIFswLCAwLCAwXSlcblxuICB0aGlzLl9keW5hbWljQnVmZmVyID0gZHluYW1pY0J1ZmZlclxuICB0aGlzLl9keW5hbWljVkFPID0gZHluYW1pY1ZBT1xuICB0aGlzLl9keW5hbWljT2Zmc2V0cyA9IFswLCAwLCAwXVxuICB0aGlzLl9keW5hbWljQ291bnRzID0gWzAsIDAsIDBdXG5cbiAgdGhpcy5jb250b3VyV2lkdGggPSBbIDEsIDEsIDEgXVxuICB0aGlzLmNvbnRvdXJMZXZlbHMgPSBbWzFdLCBbMV0sIFsxXV1cbiAgdGhpcy5jb250b3VyVGludCA9IFswLCAwLCAwXVxuICB0aGlzLmNvbnRvdXJDb2xvciA9IFtbMC41LCAwLjUsIDAuNSwgMV0sIFswLjUsIDAuNSwgMC41LCAxXSwgWzAuNSwgMC41LCAwLjUsIDFdXVxuXG4gIHRoaXMuc2hvd0NvbnRvdXIgPSB0cnVlXG4gIHRoaXMuc2hvd1N1cmZhY2UgPSB0cnVlXG5cbiAgdGhpcy5lbmFibGVIaWdobGlnaHQgPSBbdHJ1ZSwgdHJ1ZSwgdHJ1ZV1cbiAgdGhpcy5oaWdobGlnaHRDb2xvciA9IFtbMCwgMCwgMCwgMV0sIFswLCAwLCAwLCAxXSwgWzAsIDAsIDAsIDFdXVxuICB0aGlzLmhpZ2hsaWdodFRpbnQgPSBbIDEsIDEsIDEgXVxuICB0aGlzLmhpZ2hsaWdodExldmVsID0gWy0xLCAtMSwgLTFdXG5cbiAgLy8gRHluYW1pYyBjb250b3VyIG9wdGlvbnNcbiAgdGhpcy5lbmFibGVEeW5hbWljID0gWyB0cnVlLCB0cnVlLCB0cnVlIF1cbiAgdGhpcy5keW5hbWljTGV2ZWwgPSBbIE5hTiwgTmFOLCBOYU4gXVxuICB0aGlzLmR5bmFtaWNDb2xvciA9IFsgWzAsIDAsIDAsIDFdLCBbMCwgMCwgMCwgMV0sIFswLCAwLCAwLCAxXSBdXG4gIHRoaXMuZHluYW1pY1RpbnQgPSBbIDEsIDEsIDEgXVxuICB0aGlzLmR5bmFtaWNXaWR0aCA9IFsgMSwgMSwgMSBdXG5cbiAgdGhpcy5heGVzQm91bmRzID0gW1tJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5XSwgWy1JbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHldXVxuICB0aGlzLnN1cmZhY2VQcm9qZWN0ID0gWyBmYWxzZSwgZmFsc2UsIGZhbHNlIF1cbiAgdGhpcy5jb250b3VyUHJvamVjdCA9IFtbIGZhbHNlLCBmYWxzZSwgZmFsc2UgXSxcbiAgICBbIGZhbHNlLCBmYWxzZSwgZmFsc2UgXSxcbiAgICBbIGZhbHNlLCBmYWxzZSwgZmFsc2UgXV1cblxuICB0aGlzLmNvbG9yQm91bmRzID0gWyBmYWxzZSwgZmFsc2UgXVxuXG4gIC8vIFN0b3JlIHh5eiBmaWVsZHMsIG5lZWQgdGhpcyBmb3IgcGlja2luZ1xuICB0aGlzLl9maWVsZCA9IFtcbiAgICBuZGFycmF5KHBvb2wubWFsbG9jRmxvYXQoMTAyNCksIFswLCAwXSksXG4gICAgbmRhcnJheShwb29sLm1hbGxvY0Zsb2F0KDEwMjQpLCBbMCwgMF0pLFxuICAgIG5kYXJyYXkocG9vbC5tYWxsb2NGbG9hdCgxMDI0KSwgWzAsIDBdKSBdXG5cbiAgdGhpcy5waWNrSWQgPSAxXG4gIHRoaXMuY2xpcEJvdW5kcyA9IFtbLUluZmluaXR5LCAtSW5maW5pdHksIC1JbmZpbml0eV0sIFtJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5XV1cblxuICB0aGlzLnNuYXBUb0RhdGEgPSBmYWxzZVxuXG4gIHRoaXMucGl4ZWxSYXRpbyA9IDFcblxuICB0aGlzLm9wYWNpdHkgPSAxLjBcbiAgdGhpcy5vcGFjaXR5c2NhbGUgID0gZmFsc2VcblxuICB0aGlzLmxpZ2h0UG9zaXRpb24gPSBbMTAsIDEwMDAwLCAwXVxuICB0aGlzLmFtYmllbnRMaWdodCA9IDAuOFxuICB0aGlzLmRpZmZ1c2VMaWdodCA9IDAuOFxuICB0aGlzLnNwZWN1bGFyTGlnaHQgPSAyLjBcbiAgdGhpcy5yb3VnaG5lc3MgPSAwLjVcbiAgdGhpcy5mcmVzbmVsID0gMS41XG4gIHRoaXMudmVydGV4Q29sb3IgPSAwXG5cbiAgdGhpcy5kaXJ0eSA9IHRydWVcbn1cblxudmFyIHByb3RvID0gU3VyZmFjZVBsb3QucHJvdG90eXBlXG5cbnByb3RvLmlzVHJhbnNwYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm9wYWNpdHkgPCAxIHx8IHRoaXMub3BhY2l0eXNjYWxlXG59XG5cbnByb3RvLmlzT3BhcXVlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5vcGFjaXR5c2NhbGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAodGhpcy5vcGFjaXR5IDwgMSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmICh0aGlzLm9wYWNpdHkgPj0gMSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICBpZiAodGhpcy5fY29udG91ckNvdW50c1tpXS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxucHJvdG8ucGlja1Nsb3RzID0gMVxuXG5wcm90by5zZXRQaWNrQmFzZSA9IGZ1bmN0aW9uIChpZCkge1xuICB0aGlzLnBpY2tJZCA9IGlkXG59XG5cbmZ1bmN0aW9uIGdldE9wYWNpdHlGcm9tU2NhbGUocmF0aW8sIG9wYWNpdHlzY2FsZSkgeyAvLyBjb3BpZWQgZm9ybSBnbC1tZXNoM2RcbiAgaWYoIW9wYWNpdHlzY2FsZSkgcmV0dXJuIDFcbiAgaWYoIW9wYWNpdHlzY2FsZS5sZW5ndGgpIHJldHVybiAxXG5cbiAgZm9yKHZhciBpID0gMDsgaSA8IG9wYWNpdHlzY2FsZS5sZW5ndGg7ICsraSkge1xuICAgIGlmKG9wYWNpdHlzY2FsZS5sZW5ndGggPCAyKSByZXR1cm4gMVxuICAgIGlmKG9wYWNpdHlzY2FsZVtpXVswXSA9PT0gcmF0aW8pIHJldHVybiBvcGFjaXR5c2NhbGVbaV1bMV1cbiAgICBpZihvcGFjaXR5c2NhbGVbaV1bMF0gPiByYXRpbyAmJiBpID4gMCkge1xuICAgICAgdmFyIGQgPSAob3BhY2l0eXNjYWxlW2ldWzBdIC0gcmF0aW8pIC8gKG9wYWNpdHlzY2FsZVtpXVswXSAtIG9wYWNpdHlzY2FsZVtpIC0gMV1bMF0pXG4gICAgICByZXR1cm4gb3BhY2l0eXNjYWxlW2ldWzFdICogKDEgLSBkKSArIGQgKiBvcGFjaXR5c2NhbGVbaSAtIDFdWzFdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDFcbn1cblxudmFyIFpFUk9fVkVDID0gWzAsIDAsIDBdXG5cbnZhciBQUk9KRUNUX0RBVEEgPSB7XG4gIHNob3dTdXJmYWNlOiBmYWxzZSxcbiAgc2hvd0NvbnRvdXI6IGZhbHNlLFxuICBwcm9qZWN0aW9uczogW0lERU5USVRZLnNsaWNlKCksIElERU5USVRZLnNsaWNlKCksIElERU5USVRZLnNsaWNlKCldLFxuICBjbGlwQm91bmRzOiBbXG4gICAgW1swLCAwLCAwXSwgWzAsIDAsIDBdXSxcbiAgICBbWzAsIDAsIDBdLCBbMCwgMCwgMF1dLFxuICAgIFtbMCwgMCwgMF0sIFswLCAwLCAwXV1dXG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVQcm9qZWN0aW9uRGF0YSAoY2FtZXJhLCBvYmopIHtcbiAgdmFyIGksIGosIGtcblxuICAvLyBDb21wdXRlIGN1YmUgcHJvcGVydGllc1xuICB2YXIgY3ViZUF4aXMgPSAob2JqLmF4ZXMgJiYgb2JqLmF4ZXMubGFzdEN1YmVQcm9wcy5heGlzKSB8fCBaRVJPX1ZFQ1xuXG4gIHZhciBzaG93U3VyZmFjZSA9IG9iai5zaG93U3VyZmFjZVxuICB2YXIgc2hvd0NvbnRvdXIgPSBvYmouc2hvd0NvbnRvdXJcblxuICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgc2hvd1N1cmZhY2UgPSBzaG93U3VyZmFjZSB8fCBvYmouc3VyZmFjZVByb2plY3RbaV1cbiAgICBmb3IgKGogPSAwOyBqIDwgMzsgKytqKSB7XG4gICAgICBzaG93Q29udG91ciA9IHNob3dDb250b3VyIHx8IG9iai5jb250b3VyUHJvamVjdFtpXVtqXVxuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAvLyBDb25zdHJ1Y3QgcHJvamVjdGlvbiBvbnRvIGF4aXNcbiAgICB2YXIgYXhpc1NxdWlzaCA9IFBST0pFQ1RfREFUQS5wcm9qZWN0aW9uc1tpXVxuICAgIGZvciAoaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBheGlzU3F1aXNoW2pdID0gMFxuICAgIH1cbiAgICBmb3IgKGogPSAwOyBqIDwgNDsgKytqKSB7XG4gICAgICBheGlzU3F1aXNoWzUgKiBqXSA9IDFcbiAgICB9XG4gICAgYXhpc1NxdWlzaFs1ICogaV0gPSAwXG4gICAgYXhpc1NxdWlzaFsxMiArIGldID0gb2JqLmF4ZXNCb3VuZHNbKyhjdWJlQXhpc1tpXSA+IDApXVtpXVxuICAgIG11bHRpcGx5KGF4aXNTcXVpc2gsIGNhbWVyYS5tb2RlbCwgYXhpc1NxdWlzaClcblxuICAgIHZhciBuY2xpcEJvdW5kcyA9IFBST0pFQ1RfREFUQS5jbGlwQm91bmRzW2ldXG4gICAgZm9yIChrID0gMDsgayA8IDI7ICsraykge1xuICAgICAgZm9yIChqID0gMDsgaiA8IDM7ICsraikge1xuICAgICAgICBuY2xpcEJvdW5kc1trXVtqXSA9IGNhbWVyYS5jbGlwQm91bmRzW2tdW2pdXG4gICAgICB9XG4gICAgfVxuICAgIG5jbGlwQm91bmRzWzBdW2ldID0gLTFlOFxuICAgIG5jbGlwQm91bmRzWzFdW2ldID0gMWU4XG4gIH1cblxuICBQUk9KRUNUX0RBVEEuc2hvd1N1cmZhY2UgPSBzaG93U3VyZmFjZVxuICBQUk9KRUNUX0RBVEEuc2hvd0NvbnRvdXIgPSBzaG93Q29udG91clxuXG4gIHJldHVybiBQUk9KRUNUX0RBVEFcbn1cblxudmFyIFVOSUZPUk1TID0ge1xuICBtb2RlbDogSURFTlRJVFksXG4gIHZpZXc6IElERU5USVRZLFxuICBwcm9qZWN0aW9uOiBJREVOVElUWSxcbiAgaW52ZXJzZU1vZGVsOiBJREVOVElUWS5zbGljZSgpLFxuICBsb3dlckJvdW5kOiBbMCwgMCwgMF0sXG4gIHVwcGVyQm91bmQ6IFswLCAwLCAwXSxcbiAgY29sb3JNYXA6IDAsXG4gIGNsaXBCb3VuZHM6IFtbMCwgMCwgMF0sIFswLCAwLCAwXV0sXG4gIGhlaWdodDogMC4wLFxuICBjb250b3VyVGludDogMCxcbiAgY29udG91ckNvbG9yOiBbMCwgMCwgMCwgMV0sXG4gIHBlcm11dGF0aW9uOiBbMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMV0sXG4gIHpPZmZzZXQ6IC0xZS00LFxuICBvYmplY3RPZmZzZXQ6IFswLCAwLCAwXSxcbiAga2FtYmllbnQ6IDEsXG4gIGtkaWZmdXNlOiAxLFxuICBrc3BlY3VsYXI6IDEsXG4gIGxpZ2h0UG9zaXRpb246IFsxMDAwLCAxMDAwLCAxMDAwXSxcbiAgZXllUG9zaXRpb246IFswLCAwLCAwXSxcbiAgcm91Z2huZXNzOiAxLFxuICBmcmVzbmVsOiAxLFxuICBvcGFjaXR5OiAxLFxuICB2ZXJ0ZXhDb2xvcjogMFxufVxuXG52YXIgTUFUUklYX0lOVkVSU0UgPSBJREVOVElUWS5zbGljZSgpXG52YXIgREVGQVVMVF9QRVJNID0gWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDFdXG5cbmZ1bmN0aW9uIGRyYXdDb3JlIChwYXJhbXMsIHRyYW5zcGFyZW50KSB7XG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fVxuICB2YXIgZ2wgPSB0aGlzLmdsXG5cbiAgZ2wuZGlzYWJsZShnbC5DVUxMX0ZBQ0UpXG5cbiAgdGhpcy5fY29sb3JNYXAuYmluZCgwKVxuXG4gIHZhciB1bmlmb3JtcyA9IFVOSUZPUk1TXG4gIHVuaWZvcm1zLm1vZGVsID0gcGFyYW1zLm1vZGVsIHx8IElERU5USVRZXG4gIHVuaWZvcm1zLnZpZXcgPSBwYXJhbXMudmlldyB8fCBJREVOVElUWVxuICB1bmlmb3Jtcy5wcm9qZWN0aW9uID0gcGFyYW1zLnByb2plY3Rpb24gfHwgSURFTlRJVFlcbiAgdW5pZm9ybXMubG93ZXJCb3VuZCA9IFt0aGlzLmJvdW5kc1swXVswXSwgdGhpcy5ib3VuZHNbMF1bMV0sIHRoaXMuY29sb3JCb3VuZHNbMF0gfHwgdGhpcy5ib3VuZHNbMF1bMl1dXG4gIHVuaWZvcm1zLnVwcGVyQm91bmQgPSBbdGhpcy5ib3VuZHNbMV1bMF0sIHRoaXMuYm91bmRzWzFdWzFdLCB0aGlzLmNvbG9yQm91bmRzWzFdIHx8IHRoaXMuYm91bmRzWzFdWzJdXVxuICB1bmlmb3Jtcy5vYmplY3RPZmZzZXQgPSB0aGlzLm9iamVjdE9mZnNldFxuICB1bmlmb3Jtcy5jb250b3VyQ29sb3IgPSB0aGlzLmNvbnRvdXJDb2xvclswXVxuXG4gIHVuaWZvcm1zLmludmVyc2VNb2RlbCA9IGludmVydCh1bmlmb3Jtcy5pbnZlcnNlTW9kZWwsIHVuaWZvcm1zLm1vZGVsKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgKytpKSB7XG4gICAgdmFyIGNsaXBDbGFtcGVkID0gdW5pZm9ybXMuY2xpcEJvdW5kc1tpXVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgMzsgKytqKSB7XG4gICAgICBjbGlwQ2xhbXBlZFtqXSA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMuY2xpcEJvdW5kc1tpXVtqXSwgLTFlOCksIDFlOClcbiAgICB9XG4gIH1cblxuICB1bmlmb3Jtcy5rYW1iaWVudCA9IHRoaXMuYW1iaWVudExpZ2h0XG4gIHVuaWZvcm1zLmtkaWZmdXNlID0gdGhpcy5kaWZmdXNlTGlnaHRcbiAgdW5pZm9ybXMua3NwZWN1bGFyID0gdGhpcy5zcGVjdWxhckxpZ2h0XG5cbiAgdW5pZm9ybXMucm91Z2huZXNzID0gdGhpcy5yb3VnaG5lc3NcbiAgdW5pZm9ybXMuZnJlc25lbCA9IHRoaXMuZnJlc25lbFxuICB1bmlmb3Jtcy5vcGFjaXR5ID0gdGhpcy5vcGFjaXR5XG5cbiAgdW5pZm9ybXMuaGVpZ2h0ID0gMC4wXG4gIHVuaWZvcm1zLnBlcm11dGF0aW9uID0gREVGQVVMVF9QRVJNXG5cbiAgdW5pZm9ybXMudmVydGV4Q29sb3IgPSB0aGlzLnZlcnRleENvbG9yXG5cbiAgLy8gQ29tcHV0ZSBjYW1lcmEgbWF0cml4IGludmVyc2VcbiAgdmFyIGludkNhbWVyYU1hdHJpeCA9IE1BVFJJWF9JTlZFUlNFXG4gIG11bHRpcGx5KGludkNhbWVyYU1hdHJpeCwgdW5pZm9ybXMudmlldywgdW5pZm9ybXMubW9kZWwpXG4gIG11bHRpcGx5KGludkNhbWVyYU1hdHJpeCwgdW5pZm9ybXMucHJvamVjdGlvbiwgaW52Q2FtZXJhTWF0cml4KVxuICBpbnZlcnQoaW52Q2FtZXJhTWF0cml4LCBpbnZDYW1lcmFNYXRyaXgpXG5cbiAgZm9yIChpID0gMDsgaSA8IDM7ICsraSkge1xuICAgIHVuaWZvcm1zLmV5ZVBvc2l0aW9uW2ldID0gaW52Q2FtZXJhTWF0cml4WzEyICsgaV0gLyBpbnZDYW1lcmFNYXRyaXhbMTVdXG4gIH1cblxuICB2YXIgdyA9IGludkNhbWVyYU1hdHJpeFsxNV1cbiAgZm9yIChpID0gMDsgaSA8IDM7ICsraSkge1xuICAgIHcgKz0gdGhpcy5saWdodFBvc2l0aW9uW2ldICogaW52Q2FtZXJhTWF0cml4WzQgKiBpICsgM11cbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgdmFyIHMgPSBpbnZDYW1lcmFNYXRyaXhbMTIgKyBpXVxuICAgIGZvciAoaiA9IDA7IGogPCAzOyArK2opIHtcbiAgICAgIHMgKz0gaW52Q2FtZXJhTWF0cml4WzQgKiBqICsgaV0gKiB0aGlzLmxpZ2h0UG9zaXRpb25bal1cbiAgICB9XG4gICAgdW5pZm9ybXMubGlnaHRQb3NpdGlvbltpXSA9IHMgLyB3XG4gIH1cblxuICB2YXIgcHJvamVjdERhdGEgPSBjb21wdXRlUHJvamVjdGlvbkRhdGEodW5pZm9ybXMsIHRoaXMpXG5cbiAgaWYgKHByb2plY3REYXRhLnNob3dTdXJmYWNlKSAge1xuICAgIC8vIFNldCB1cCB1bmlmb3Jtc1xuICAgIHRoaXMuX3NoYWRlci5iaW5kKClcbiAgICB0aGlzLl9zaGFkZXIudW5pZm9ybXMgPSB1bmlmb3Jtc1xuXG4gICAgLy8gRHJhdyBpdFxuICAgIHRoaXMuX3Zhby5iaW5kKClcblxuICAgIGlmICh0aGlzLnNob3dTdXJmYWNlICYmIHRoaXMuX3ZlcnRleENvdW50KSB7XG4gICAgICB0aGlzLl92YW8uZHJhdyhnbC5UUklBTkdMRVMsIHRoaXMuX3ZlcnRleENvdW50KVxuICAgIH1cblxuICAgIC8vIERyYXcgcHJvamVjdGlvbnMgb2Ygc3VyZmFjZVxuICAgIGZvciAoaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgIGlmICghdGhpcy5zdXJmYWNlUHJvamVjdFtpXSB8fCAhdGhpcy52ZXJ0ZXhDb3VudCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgdGhpcy5fc2hhZGVyLnVuaWZvcm1zLm1vZGVsID0gcHJvamVjdERhdGEucHJvamVjdGlvbnNbaV1cbiAgICAgIHRoaXMuX3NoYWRlci51bmlmb3Jtcy5jbGlwQm91bmRzID0gcHJvamVjdERhdGEuY2xpcEJvdW5kc1tpXVxuICAgICAgdGhpcy5fdmFvLmRyYXcoZ2wuVFJJQU5HTEVTLCB0aGlzLl92ZXJ0ZXhDb3VudClcbiAgICB9XG5cbiAgICB0aGlzLl92YW8udW5iaW5kKClcbiAgfVxuXG4gIGlmIChwcm9qZWN0RGF0YS5zaG93Q29udG91cikge1xuICAgIHZhciBzaGFkZXIgPSB0aGlzLl9jb250b3VyU2hhZGVyXG5cbiAgICAvLyBEb24ndCBhcHBseSBsaWdodGluZyB0byBjb250b3Vyc1xuICAgIHVuaWZvcm1zLmthbWJpZW50ID0gMS4wXG4gICAgdW5pZm9ybXMua2RpZmZ1c2UgPSAwLjBcbiAgICB1bmlmb3Jtcy5rc3BlY3VsYXIgPSAwLjBcbiAgICB1bmlmb3Jtcy5vcGFjaXR5ID0gMS4wXG5cbiAgICBzaGFkZXIuYmluZCgpXG4gICAgc2hhZGVyLnVuaWZvcm1zID0gdW5pZm9ybXNcblxuICAgIC8vIERyYXcgY29udG91ciBsaW5lc1xuICAgIHZhciB2YW8gPSB0aGlzLl9jb250b3VyVkFPXG4gICAgdmFvLmJpbmQoKVxuXG4gICAgLy8gRHJhdyBjb250b3VyIGxldmVsc1xuICAgIGZvciAoaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgIHNoYWRlci51bmlmb3Jtcy5wZXJtdXRhdGlvbiA9IFBFUk1VVEFUSU9OU1tpXVxuICAgICAgZ2wubGluZVdpZHRoKHRoaXMuY29udG91cldpZHRoW2ldICogdGhpcy5waXhlbFJhdGlvKVxuXG4gICAgICBmb3IgKGogPSAwOyBqIDwgdGhpcy5jb250b3VyTGV2ZWxzW2ldLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGlmIChqID09PSB0aGlzLmhpZ2hsaWdodExldmVsW2ldKSB7XG4gICAgICAgICAgc2hhZGVyLnVuaWZvcm1zLmNvbnRvdXJDb2xvciA9IHRoaXMuaGlnaGxpZ2h0Q29sb3JbaV1cbiAgICAgICAgICBzaGFkZXIudW5pZm9ybXMuY29udG91clRpbnQgPSB0aGlzLmhpZ2hsaWdodFRpbnRbaV1cbiAgICAgICAgfSBlbHNlIGlmIChqID09PSAwIHx8IChqIC0gMSkgPT09IHRoaXMuaGlnaGxpZ2h0TGV2ZWxbaV0pIHtcbiAgICAgICAgICBzaGFkZXIudW5pZm9ybXMuY29udG91ckNvbG9yID0gdGhpcy5jb250b3VyQ29sb3JbaV1cbiAgICAgICAgICBzaGFkZXIudW5pZm9ybXMuY29udG91clRpbnQgPSB0aGlzLmNvbnRvdXJUaW50W2ldXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9jb250b3VyQ291bnRzW2ldW2pdKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIHNoYWRlci51bmlmb3Jtcy5oZWlnaHQgPSB0aGlzLmNvbnRvdXJMZXZlbHNbaV1bal1cbiAgICAgICAgdmFvLmRyYXcoZ2wuTElORVMsIHRoaXMuX2NvbnRvdXJDb3VudHNbaV1bal0sIHRoaXMuX2NvbnRvdXJPZmZzZXRzW2ldW2pdKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERyYXcgcHJvamVjdGlvbnMgb2Ygc3VyZmFjZVxuICAgIGZvciAoaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgIHNoYWRlci51bmlmb3Jtcy5tb2RlbCA9IHByb2plY3REYXRhLnByb2plY3Rpb25zW2ldXG4gICAgICBzaGFkZXIudW5pZm9ybXMuY2xpcEJvdW5kcyA9IHByb2plY3REYXRhLmNsaXBCb3VuZHNbaV1cbiAgICAgIGZvciAoaiA9IDA7IGogPCAzOyArK2opIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRvdXJQcm9qZWN0W2ldW2pdKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBzaGFkZXIudW5pZm9ybXMucGVybXV0YXRpb24gPSBQRVJNVVRBVElPTlNbal1cbiAgICAgICAgZ2wubGluZVdpZHRoKHRoaXMuY29udG91cldpZHRoW2pdICogdGhpcy5waXhlbFJhdGlvKVxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuY29udG91ckxldmVsc1tqXS5sZW5ndGg7ICsraykge1xuICAgICAgICAgIGlmIChrID09PSB0aGlzLmhpZ2hsaWdodExldmVsW2pdKSB7XG4gICAgICAgICAgICBzaGFkZXIudW5pZm9ybXMuY29udG91ckNvbG9yID0gdGhpcy5oaWdobGlnaHRDb2xvcltqXVxuICAgICAgICAgICAgc2hhZGVyLnVuaWZvcm1zLmNvbnRvdXJUaW50ID0gdGhpcy5oaWdobGlnaHRUaW50W2pdXG4gICAgICAgICAgfSBlbHNlIGlmIChrID09PSAwIHx8IChrIC0gMSkgPT09IHRoaXMuaGlnaGxpZ2h0TGV2ZWxbal0pIHtcbiAgICAgICAgICAgIHNoYWRlci51bmlmb3Jtcy5jb250b3VyQ29sb3IgPSB0aGlzLmNvbnRvdXJDb2xvcltqXVxuICAgICAgICAgICAgc2hhZGVyLnVuaWZvcm1zLmNvbnRvdXJUaW50ID0gdGhpcy5jb250b3VyVGludFtqXVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRoaXMuX2NvbnRvdXJDb3VudHNbal1ba10pIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2hhZGVyLnVuaWZvcm1zLmhlaWdodCA9IHRoaXMuY29udG91ckxldmVsc1tqXVtrXVxuICAgICAgICAgIHZhby5kcmF3KGdsLkxJTkVTLCB0aGlzLl9jb250b3VyQ291bnRzW2pdW2tdLCB0aGlzLl9jb250b3VyT2Zmc2V0c1tqXVtrXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhby51bmJpbmQoKVxuXG4gICAgLy8gRHJhdyBkeW5hbWljIGNvbnRvdXJzXG4gICAgdmFvID0gdGhpcy5fZHluYW1pY1ZBT1xuICAgIHZhby5iaW5kKClcblxuICAgIC8vIERyYXcgY29udG91ciBsZXZlbHNcbiAgICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICBpZiAodGhpcy5fZHluYW1pY0NvdW50c1tpXSA9PT0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBzaGFkZXIudW5pZm9ybXMubW9kZWwgPSB1bmlmb3Jtcy5tb2RlbFxuICAgICAgc2hhZGVyLnVuaWZvcm1zLmNsaXBCb3VuZHMgPSB1bmlmb3Jtcy5jbGlwQm91bmRzXG4gICAgICBzaGFkZXIudW5pZm9ybXMucGVybXV0YXRpb24gPSBQRVJNVVRBVElPTlNbaV1cbiAgICAgIGdsLmxpbmVXaWR0aCh0aGlzLmR5bmFtaWNXaWR0aFtpXSAqIHRoaXMucGl4ZWxSYXRpbylcblxuICAgICAgc2hhZGVyLnVuaWZvcm1zLmNvbnRvdXJDb2xvciA9IHRoaXMuZHluYW1pY0NvbG9yW2ldXG4gICAgICBzaGFkZXIudW5pZm9ybXMuY29udG91clRpbnQgPSB0aGlzLmR5bmFtaWNUaW50W2ldXG4gICAgICBzaGFkZXIudW5pZm9ybXMuaGVpZ2h0ID0gdGhpcy5keW5hbWljTGV2ZWxbaV1cbiAgICAgIHZhby5kcmF3KGdsLkxJTkVTLCB0aGlzLl9keW5hbWljQ291bnRzW2ldLCB0aGlzLl9keW5hbWljT2Zmc2V0c1tpXSlcblxuICAgICAgZm9yIChqID0gMDsgaiA8IDM7ICsraikge1xuICAgICAgICBpZiAoIXRoaXMuY29udG91clByb2plY3Rbal1baV0pIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgc2hhZGVyLnVuaWZvcm1zLm1vZGVsID0gcHJvamVjdERhdGEucHJvamVjdGlvbnNbal1cbiAgICAgICAgc2hhZGVyLnVuaWZvcm1zLmNsaXBCb3VuZHMgPSBwcm9qZWN0RGF0YS5jbGlwQm91bmRzW2pdXG4gICAgICAgIHZhby5kcmF3KGdsLkxJTkVTLCB0aGlzLl9keW5hbWljQ291bnRzW2ldLCB0aGlzLl9keW5hbWljT2Zmc2V0c1tpXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YW8udW5iaW5kKClcbiAgfVxufVxuXG5wcm90by5kcmF3ID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICByZXR1cm4gZHJhd0NvcmUuY2FsbCh0aGlzLCBwYXJhbXMsIGZhbHNlKVxufVxuXG5wcm90by5kcmF3VHJhbnNwYXJlbnQgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIHJldHVybiBkcmF3Q29yZS5jYWxsKHRoaXMsIHBhcmFtcywgdHJ1ZSlcbn1cblxudmFyIFBJQ0tfVU5JRk9STVMgPSB7XG4gIG1vZGVsOiBJREVOVElUWSxcbiAgdmlldzogSURFTlRJVFksXG4gIHByb2plY3Rpb246IElERU5USVRZLFxuICBpbnZlcnNlTW9kZWw6IElERU5USVRZLFxuICBjbGlwQm91bmRzOiBbWzAsIDAsIDBdLCBbMCwgMCwgMF1dLFxuICBoZWlnaHQ6IDAuMCxcbiAgc2hhcGU6IFswLCAwXSxcbiAgcGlja0lkOiAwLFxuICBsb3dlckJvdW5kOiBbMCwgMCwgMF0sXG4gIHVwcGVyQm91bmQ6IFswLCAwLCAwXSxcbiAgek9mZnNldDogMC4wLFxuICBvYmplY3RPZmZzZXQ6IFswLCAwLCAwXSxcbiAgcGVybXV0YXRpb246IFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxXSxcbiAgbGlnaHRQb3NpdGlvbjogWzAsIDAsIDBdLFxuICBleWVQb3NpdGlvbjogWzAsIDAsIDBdXG59XG5cbnByb3RvLmRyYXdQaWNrID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBwYXJhbXMgPSBwYXJhbXMgfHwge31cbiAgdmFyIGdsID0gdGhpcy5nbFxuICBnbC5kaXNhYmxlKGdsLkNVTExfRkFDRSlcblxuICB2YXIgdW5pZm9ybXMgPSBQSUNLX1VOSUZPUk1TXG4gIHVuaWZvcm1zLm1vZGVsID0gcGFyYW1zLm1vZGVsIHx8IElERU5USVRZXG4gIHVuaWZvcm1zLnZpZXcgPSBwYXJhbXMudmlldyB8fCBJREVOVElUWVxuICB1bmlmb3Jtcy5wcm9qZWN0aW9uID0gcGFyYW1zLnByb2plY3Rpb24gfHwgSURFTlRJVFlcbiAgdW5pZm9ybXMuc2hhcGUgPSB0aGlzLl9maWVsZFsyXS5zaGFwZVxuICB1bmlmb3Jtcy5waWNrSWQgPSB0aGlzLnBpY2tJZCAvIDI1NS4wXG4gIHVuaWZvcm1zLmxvd2VyQm91bmQgPSB0aGlzLmJvdW5kc1swXVxuICB1bmlmb3Jtcy51cHBlckJvdW5kID0gdGhpcy5ib3VuZHNbMV1cbiAgdW5pZm9ybXMub2JqZWN0T2Zmc2V0ID0gdGhpcy5vYmplY3RPZmZzZXRcbiAgdW5pZm9ybXMucGVybXV0YXRpb24gPSBERUZBVUxUX1BFUk1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDI7ICsraSkge1xuICAgIHZhciBjbGlwQ2xhbXBlZCA9IHVuaWZvcm1zLmNsaXBCb3VuZHNbaV1cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IDM7ICsraikge1xuICAgICAgY2xpcENsYW1wZWRbal0gPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLmNsaXBCb3VuZHNbaV1bal0sIC0xZTgpLCAxZTgpXG4gICAgfVxuICB9XG5cbiAgdmFyIHByb2plY3REYXRhID0gY29tcHV0ZVByb2plY3Rpb25EYXRhKHVuaWZvcm1zLCB0aGlzKVxuXG4gIGlmIChwcm9qZWN0RGF0YS5zaG93U3VyZmFjZSkge1xuICAgIC8vIFNldCB1cCB1bmlmb3Jtc1xuICAgIHRoaXMuX3BpY2tTaGFkZXIuYmluZCgpXG4gICAgdGhpcy5fcGlja1NoYWRlci51bmlmb3JtcyA9IHVuaWZvcm1zXG5cbiAgICAvLyBEcmF3IGl0XG4gICAgdGhpcy5fdmFvLmJpbmQoKVxuICAgIHRoaXMuX3Zhby5kcmF3KGdsLlRSSUFOR0xFUywgdGhpcy5fdmVydGV4Q291bnQpXG5cbiAgICAvLyBEcmF3IHByb2plY3Rpb25zIG9mIHN1cmZhY2VcbiAgICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICBpZiAoIXRoaXMuc3VyZmFjZVByb2plY3RbaV0pIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHRoaXMuX3BpY2tTaGFkZXIudW5pZm9ybXMubW9kZWwgPSBwcm9qZWN0RGF0YS5wcm9qZWN0aW9uc1tpXVxuICAgICAgdGhpcy5fcGlja1NoYWRlci51bmlmb3Jtcy5jbGlwQm91bmRzID0gcHJvamVjdERhdGEuY2xpcEJvdW5kc1tpXVxuICAgICAgdGhpcy5fdmFvLmRyYXcoZ2wuVFJJQU5HTEVTLCB0aGlzLl92ZXJ0ZXhDb3VudClcbiAgICB9XG5cbiAgICB0aGlzLl92YW8udW5iaW5kKClcbiAgfVxuXG4gIGlmIChwcm9qZWN0RGF0YS5zaG93Q29udG91cikge1xuICAgIHZhciBzaGFkZXIgPSB0aGlzLl9jb250b3VyUGlja1NoYWRlclxuXG4gICAgc2hhZGVyLmJpbmQoKVxuICAgIHNoYWRlci51bmlmb3JtcyA9IHVuaWZvcm1zXG5cbiAgICB2YXIgdmFvID0gdGhpcy5fY29udG91clZBT1xuICAgIHZhby5iaW5kKClcblxuICAgIGZvciAoaiA9IDA7IGogPCAzOyArK2opIHtcbiAgICAgIGdsLmxpbmVXaWR0aCh0aGlzLmNvbnRvdXJXaWR0aFtqXSAqIHRoaXMucGl4ZWxSYXRpbylcbiAgICAgIHNoYWRlci51bmlmb3Jtcy5wZXJtdXRhdGlvbiA9IFBFUk1VVEFUSU9OU1tqXVxuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuY29udG91ckxldmVsc1tqXS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodGhpcy5fY29udG91ckNvdW50c1tqXVtpXSkge1xuICAgICAgICAgIHNoYWRlci51bmlmb3Jtcy5oZWlnaHQgPSB0aGlzLmNvbnRvdXJMZXZlbHNbal1baV1cbiAgICAgICAgICB2YW8uZHJhdyhnbC5MSU5FUywgdGhpcy5fY29udG91ckNvdW50c1tqXVtpXSwgdGhpcy5fY29udG91ck9mZnNldHNbal1baV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEcmF3IHByb2plY3Rpb25zIG9mIHN1cmZhY2VcbiAgICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICBzaGFkZXIudW5pZm9ybXMubW9kZWwgPSBwcm9qZWN0RGF0YS5wcm9qZWN0aW9uc1tpXVxuICAgICAgc2hhZGVyLnVuaWZvcm1zLmNsaXBCb3VuZHMgPSBwcm9qZWN0RGF0YS5jbGlwQm91bmRzW2ldXG5cbiAgICAgIGZvciAoaiA9IDA7IGogPCAzOyArK2opIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRvdXJQcm9qZWN0W2ldW2pdKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIHNoYWRlci51bmlmb3Jtcy5wZXJtdXRhdGlvbiA9IFBFUk1VVEFUSU9OU1tqXVxuICAgICAgICBnbC5saW5lV2lkdGgodGhpcy5jb250b3VyV2lkdGhbal0gKiB0aGlzLnBpeGVsUmF0aW8pXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5jb250b3VyTGV2ZWxzW2pdLmxlbmd0aDsgKytrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2NvbnRvdXJDb3VudHNbal1ba10pIHtcbiAgICAgICAgICAgIHNoYWRlci51bmlmb3Jtcy5oZWlnaHQgPSB0aGlzLmNvbnRvdXJMZXZlbHNbal1ba11cbiAgICAgICAgICAgIHZhby5kcmF3KGdsLkxJTkVTLCB0aGlzLl9jb250b3VyQ291bnRzW2pdW2tdLCB0aGlzLl9jb250b3VyT2Zmc2V0c1tqXVtrXSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YW8udW5iaW5kKClcbiAgfVxufVxuXG5wcm90by5waWNrID0gZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICBpZiAoIXNlbGVjdGlvbikge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBpZiAoc2VsZWN0aW9uLmlkICE9PSB0aGlzLnBpY2tJZCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2YXIgc2hhcGUgPSB0aGlzLl9maWVsZFsyXS5zaGFwZVxuXG4gIHZhciByZXN1bHQgPSB0aGlzLl9waWNrUmVzdWx0XG5cbiAgLy8gQ29tcHV0ZSB1diBjb29yZGluYXRlXG4gIHZhciB4ID0gc2hhcGVbMF0gKiAoc2VsZWN0aW9uLnZhbHVlWzBdICsgKHNlbGVjdGlvbi52YWx1ZVsyXSA+PiA0KSAvIDE2LjApIC8gMjU1LjBcbiAgdmFyIGl4ID0gTWF0aC5mbG9vcih4KVxuICB2YXIgZnggPSB4IC0gaXhcblxuICB2YXIgeSA9IHNoYXBlWzFdICogKHNlbGVjdGlvbi52YWx1ZVsxXSArIChzZWxlY3Rpb24udmFsdWVbMl0gJiAxNSkgLyAxNi4wKSAvIDI1NS4wXG4gIHZhciBpeSA9IE1hdGguZmxvb3IoeSlcbiAgdmFyIGZ5ID0geSAtIGl5XG5cbiAgaXggKz0gMVxuICBpeSArPSAxXG5cbiAgLy8gQ29tcHV0ZSB4eXogY29vcmRpbmF0ZVxuICB2YXIgcG9zID0gcmVzdWx0LnBvc2l0aW9uXG4gIHBvc1swXSA9IHBvc1sxXSA9IHBvc1syXSA9IDBcbiAgZm9yICh2YXIgZHggPSAwOyBkeCA8IDI7ICsrZHgpIHtcbiAgICB2YXIgcyA9IGR4ID8gZnggOiAxLjAgLSBmeFxuICAgIGZvciAodmFyIGR5ID0gMDsgZHkgPCAyOyArK2R5KSB7XG4gICAgICB2YXIgdCA9IGR5ID8gZnkgOiAxLjAgLSBmeVxuXG4gICAgICB2YXIgciA9IGl4ICsgZHhcbiAgICAgIHZhciBjID0gaXkgKyBkeVxuICAgICAgdmFyIHcgPSBzICogdFxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7ICsraSkge1xuICAgICAgICBwb3NbaV0gKz0gdGhpcy5fZmllbGRbaV0uZ2V0KHIsIGMpICogd1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgY2xvc2VzdCBsZXZlbFxuICB2YXIgbGV2ZWxJbmRleCA9IHRoaXMuX3BpY2tSZXN1bHQubGV2ZWxcbiAgZm9yICh2YXIgaiA9IDA7IGogPCAzOyArK2opIHtcbiAgICBsZXZlbEluZGV4W2pdID0gYnNlYXJjaC5sZSh0aGlzLmNvbnRvdXJMZXZlbHNbal0sIHBvc1tqXSlcbiAgICBpZiAobGV2ZWxJbmRleFtqXSA8IDApIHtcbiAgICAgIGlmICh0aGlzLmNvbnRvdXJMZXZlbHNbal0ubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXZlbEluZGV4W2pdID0gMFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobGV2ZWxJbmRleFtqXSA8IHRoaXMuY29udG91ckxldmVsc1tqXS5sZW5ndGggLSAxKSB7XG4gICAgICB2YXIgYSA9IHRoaXMuY29udG91ckxldmVsc1tqXVtsZXZlbEluZGV4W2pdXVxuICAgICAgdmFyIGIgPSB0aGlzLmNvbnRvdXJMZXZlbHNbal1bbGV2ZWxJbmRleFtqXSArIDFdXG4gICAgICBpZiAoTWF0aC5hYnMoYSAtIHBvc1tqXSkgPiBNYXRoLmFicyhiIC0gcG9zW2pdKSkge1xuICAgICAgICBsZXZlbEluZGV4W2pdICs9IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXN1bHQuaW5kZXhbMF0gPSBmeCA8IDAuNSA/IGl4IDogKGl4ICsgMSlcbiAgcmVzdWx0LmluZGV4WzFdID0gZnkgPCAwLjUgPyBpeSA6IChpeSArIDEpXG5cbiAgcmVzdWx0LnV2WzBdID0geCAvIHNoYXBlWzBdXG4gIHJlc3VsdC51dlsxXSA9IHkgLyBzaGFwZVsxXVxuXG4gIGZvciAoaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICByZXN1bHQuZGF0YUNvb3JkaW5hdGVbaV0gPSB0aGlzLl9maWVsZFtpXS5nZXQocmVzdWx0LmluZGV4WzBdLCByZXN1bHQuaW5kZXhbMV0pXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbnByb3RvLnBhZEZpZWxkID0gZnVuY3Rpb24oZHN0RmllbGQsIHNyY0ZpZWxkKSB7XG4gIHZhciBzcmNTaGFwZSA9IHNyY0ZpZWxkLnNoYXBlLnNsaWNlKClcbiAgdmFyIGRzdFNoYXBlID0gZHN0RmllbGQuc2hhcGUuc2xpY2UoKVxuXG4gIC8vIENlbnRlclxuICBvcHMuYXNzaWduKGRzdEZpZWxkLmxvKDEsIDEpLmhpKHNyY1NoYXBlWzBdLCBzcmNTaGFwZVsxXSksIHNyY0ZpZWxkKVxuXG4gIC8vIEVkZ2VzXG4gIG9wcy5hc3NpZ24oZHN0RmllbGQubG8oMSkuaGkoc3JjU2hhcGVbMF0sIDEpLFxuICAgIHNyY0ZpZWxkLmhpKHNyY1NoYXBlWzBdLCAxKSlcbiAgb3BzLmFzc2lnbihkc3RGaWVsZC5sbygxLCBkc3RTaGFwZVsxXSAtIDEpLmhpKHNyY1NoYXBlWzBdLCAxKSxcbiAgICBzcmNGaWVsZC5sbygwLCBzcmNTaGFwZVsxXSAtIDEpLmhpKHNyY1NoYXBlWzBdLCAxKSlcbiAgb3BzLmFzc2lnbihkc3RGaWVsZC5sbygwLCAxKS5oaSgxLCBzcmNTaGFwZVsxXSksXG4gICAgc3JjRmllbGQuaGkoMSkpXG4gIG9wcy5hc3NpZ24oZHN0RmllbGQubG8oZHN0U2hhcGVbMF0gLSAxLCAxKS5oaSgxLCBzcmNTaGFwZVsxXSksXG4gICAgc3JjRmllbGQubG8oc3JjU2hhcGVbMF0gLSAxKSlcbiAgLy8gQ29ybmVyc1xuICBkc3RGaWVsZC5zZXQoMCwgMCwgc3JjRmllbGQuZ2V0KDAsIDApKVxuICBkc3RGaWVsZC5zZXQoMCwgZHN0U2hhcGVbMV0gLSAxLCBzcmNGaWVsZC5nZXQoMCwgc3JjU2hhcGVbMV0gLSAxKSlcbiAgZHN0RmllbGQuc2V0KGRzdFNoYXBlWzBdIC0gMSwgMCwgc3JjRmllbGQuZ2V0KHNyY1NoYXBlWzBdIC0gMSwgMCkpXG4gIGRzdEZpZWxkLnNldChkc3RTaGFwZVswXSAtIDEsIGRzdFNoYXBlWzFdIC0gMSwgc3JjRmllbGQuZ2V0KHNyY1NoYXBlWzBdIC0gMSwgc3JjU2hhcGVbMV0gLSAxKSlcbn1cblxuZnVuY3Rpb24gaGFuZGxlQXJyYXkgKHBhcmFtLCBjdG9yKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBhcmFtKSkge1xuICAgIHJldHVybiBbIGN0b3IocGFyYW1bMF0pLCBjdG9yKHBhcmFtWzFdKSwgY3RvcihwYXJhbVsyXSkgXVxuICB9XG4gIHJldHVybiBbIGN0b3IocGFyYW0pLCBjdG9yKHBhcmFtKSwgY3RvcihwYXJhbSkgXVxufVxuXG5mdW5jdGlvbiB0b0NvbG9yICh4KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHgpKSB7XG4gICAgaWYgKHgubGVuZ3RoID09PSAzKSB7XG4gICAgICByZXR1cm4gW3hbMF0sIHhbMV0sIHhbMl0sIDFdXG4gICAgfVxuICAgIHJldHVybiBbeFswXSwgeFsxXSwgeFsyXSwgeFszXV1cbiAgfVxuICByZXR1cm4gWzAsIDAsIDAsIDFdXG59XG5cbmZ1bmN0aW9uIGhhbmRsZUNvbG9yIChwYXJhbSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbSkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbSkpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRvQ29sb3IocGFyYW1bMF0pLFxuICAgICAgICB0b0NvbG9yKHBhcmFtWzFdKSxcbiAgICAgICAgdG9Db2xvcihwYXJhbVsyXSkgXVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYyA9IHRvQ29sb3IocGFyYW0pXG4gICAgICByZXR1cm4gW1xuICAgICAgICBjLnNsaWNlKCksXG4gICAgICAgIGMuc2xpY2UoKSxcbiAgICAgICAgYy5zbGljZSgpIF1cbiAgICB9XG4gIH1cbn1cblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBwYXJhbXMgPSBwYXJhbXMgfHwge31cblxuICB0aGlzLm9iamVjdE9mZnNldCA9IHBhcmFtcy5vYmplY3RPZmZzZXQgfHwgdGhpcy5vYmplY3RPZmZzZXRcblxuICB0aGlzLmRpcnR5ID0gdHJ1ZVxuXG4gIGlmICgnY29udG91cldpZHRoJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLmNvbnRvdXJXaWR0aCA9IGhhbmRsZUFycmF5KHBhcmFtcy5jb250b3VyV2lkdGgsIE51bWJlcilcbiAgfVxuICBpZiAoJ3Nob3dDb250b3VyJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLnNob3dDb250b3VyID0gaGFuZGxlQXJyYXkocGFyYW1zLnNob3dDb250b3VyLCBCb29sZWFuKVxuICB9XG4gIGlmICgnc2hvd1N1cmZhY2UnIGluIHBhcmFtcykge1xuICAgIHRoaXMuc2hvd1N1cmZhY2UgPSAhIXBhcmFtcy5zaG93U3VyZmFjZVxuICB9XG4gIGlmICgnY29udG91clRpbnQnIGluIHBhcmFtcykge1xuICAgIHRoaXMuY29udG91clRpbnQgPSBoYW5kbGVBcnJheShwYXJhbXMuY29udG91clRpbnQsIEJvb2xlYW4pXG4gIH1cbiAgaWYgKCdjb250b3VyQ29sb3InIGluIHBhcmFtcykge1xuICAgIHRoaXMuY29udG91ckNvbG9yID0gaGFuZGxlQ29sb3IocGFyYW1zLmNvbnRvdXJDb2xvcilcbiAgfVxuICBpZiAoJ2NvbnRvdXJQcm9qZWN0JyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLmNvbnRvdXJQcm9qZWN0ID0gaGFuZGxlQXJyYXkocGFyYW1zLmNvbnRvdXJQcm9qZWN0LCBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUFycmF5KHgsIEJvb2xlYW4pXG4gICAgfSlcbiAgfVxuICBpZiAoJ3N1cmZhY2VQcm9qZWN0JyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLnN1cmZhY2VQcm9qZWN0ID0gcGFyYW1zLnN1cmZhY2VQcm9qZWN0XG4gIH1cbiAgaWYgKCdkeW5hbWljQ29sb3InIGluIHBhcmFtcykge1xuICAgIHRoaXMuZHluYW1pY0NvbG9yID0gaGFuZGxlQ29sb3IocGFyYW1zLmR5bmFtaWNDb2xvcilcbiAgfVxuICBpZiAoJ2R5bmFtaWNUaW50JyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLmR5bmFtaWNUaW50ID0gaGFuZGxlQXJyYXkocGFyYW1zLmR5bmFtaWNUaW50LCBOdW1iZXIpXG4gIH1cbiAgaWYgKCdkeW5hbWljV2lkdGgnIGluIHBhcmFtcykge1xuICAgIHRoaXMuZHluYW1pY1dpZHRoID0gaGFuZGxlQXJyYXkocGFyYW1zLmR5bmFtaWNXaWR0aCwgTnVtYmVyKVxuICB9XG4gIGlmICgnb3BhY2l0eScgaW4gcGFyYW1zKSB7XG4gICAgdGhpcy5vcGFjaXR5ID0gcGFyYW1zLm9wYWNpdHlcbiAgfVxuICBpZignb3BhY2l0eXNjYWxlJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLm9wYWNpdHlzY2FsZSA9IHBhcmFtcy5vcGFjaXR5c2NhbGVcbiAgfVxuICBpZiAoJ2NvbG9yQm91bmRzJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLmNvbG9yQm91bmRzID0gcGFyYW1zLmNvbG9yQm91bmRzXG4gIH1cbiAgaWYgKCd2ZXJ0ZXhDb2xvcicgaW4gcGFyYW1zKSB7XG4gICAgdGhpcy52ZXJ0ZXhDb2xvciA9IHBhcmFtcy52ZXJ0ZXhDb2xvciA/IDEgOiAwO1xuICB9XG5cbiAgdmFyIGZpZWxkID0gcGFyYW1zLmZpZWxkIHx8IChwYXJhbXMuY29vcmRzICYmIHBhcmFtcy5jb29yZHNbMl0pIHx8IG51bGxcbiAgdmFyIGxldmVsc0NoYW5nZWQgPSBmYWxzZVxuXG4gIGlmICghZmllbGQpIHtcbiAgICBpZiAodGhpcy5fZmllbGRbMl0uc2hhcGVbMF0gfHwgdGhpcy5fZmllbGRbMl0uc2hhcGVbMl0pIHtcbiAgICAgIGZpZWxkID0gdGhpcy5fZmllbGRbMl0ubG8oMSwgMSkuaGkodGhpcy5fZmllbGRbMl0uc2hhcGVbMF0gLSAyLCB0aGlzLl9maWVsZFsyXS5zaGFwZVsxXSAtIDIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkID0gdGhpcy5fZmllbGRbMl0uaGkoMCwgMClcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgZmllbGRcbiAgaWYgKCdmaWVsZCcgaW4gcGFyYW1zIHx8ICdjb29yZHMnIGluIHBhcmFtcykge1xuICAgIHZhciBmc2l6ZSA9IChmaWVsZC5zaGFwZVswXSArIDIpICogKGZpZWxkLnNoYXBlWzFdICsgMilcblxuICAgIC8vIFJlc2l6ZSBpZiBuZWNlc3NhcnlcbiAgICBpZiAoZnNpemUgPiB0aGlzLl9maWVsZFsyXS5kYXRhLmxlbmd0aCkge1xuICAgICAgcG9vbC5mcmVlRmxvYXQodGhpcy5fZmllbGRbMl0uZGF0YSlcbiAgICAgIHRoaXMuX2ZpZWxkWzJdLmRhdGEgPSBwb29sLm1hbGxvY0Zsb2F0KGJpdHMubmV4dFBvdzIoZnNpemUpKVxuICAgIH1cblxuICAgIC8vIFBhZCBmaWVsZFxuICAgIHRoaXMuX2ZpZWxkWzJdID0gbmRhcnJheSh0aGlzLl9maWVsZFsyXS5kYXRhLCBbZmllbGQuc2hhcGVbMF0gKyAyLCBmaWVsZC5zaGFwZVsxXSArIDJdKVxuICAgIHRoaXMucGFkRmllbGQodGhpcy5fZmllbGRbMl0sIGZpZWxkKVxuXG4gICAgLy8gU2F2ZSBzaGFwZSBvZiBmaWVsZFxuICAgIHRoaXMuc2hhcGUgPSBmaWVsZC5zaGFwZS5zbGljZSgpXG4gICAgdmFyIHNoYXBlID0gdGhpcy5zaGFwZVxuXG4gICAgLy8gUmVzaXplIGNvb3JkaW5hdGUgZmllbGRzIGlmIG5lY2Vzc2FyeVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgKytpKSB7XG4gICAgICBpZiAodGhpcy5fZmllbGRbMl0uc2l6ZSA+IHRoaXMuX2ZpZWxkW2ldLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIHBvb2wuZnJlZUZsb2F0KHRoaXMuX2ZpZWxkW2ldLmRhdGEpXG4gICAgICAgIHRoaXMuX2ZpZWxkW2ldLmRhdGEgPSBwb29sLm1hbGxvY0Zsb2F0KHRoaXMuX2ZpZWxkWzJdLnNpemUpXG4gICAgICB9XG4gICAgICB0aGlzLl9maWVsZFtpXSA9IG5kYXJyYXkodGhpcy5fZmllbGRbaV0uZGF0YSwgW3NoYXBlWzBdICsgMiwgc2hhcGVbMV0gKyAyXSlcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSB4L3kgY29vcmRpbmF0ZXNcbiAgICBpZiAocGFyYW1zLmNvb3Jkcykge1xuICAgICAgdmFyIGNvb3JkcyA9IHBhcmFtcy5jb29yZHNcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb29yZHMpIHx8IGNvb3Jkcy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnbC1zdXJmYWNlOiBpbnZhbGlkIGNvb3JkaW5hdGVzIGZvciB4L3knKVxuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IDI7ICsraSkge1xuICAgICAgICB2YXIgY29vcmQgPSBjb29yZHNbaV1cbiAgICAgICAgZm9yIChqID0gMDsgaiA8IDI7ICsraikge1xuICAgICAgICAgIGlmIChjb29yZC5zaGFwZVtqXSAhPT0gc2hhcGVbal0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZ2wtc3VyZmFjZTogY29vcmRzIGhhdmUgaW5jb3JyZWN0IHNoYXBlJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWRGaWVsZCh0aGlzLl9maWVsZFtpXSwgY29vcmQpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXJhbXMudGlja3MpIHtcbiAgICAgIHZhciB0aWNrcyA9IHBhcmFtcy50aWNrc1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRpY2tzKSB8fCB0aWNrcy5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnbC1zdXJmYWNlOiBpbnZhbGlkIHRpY2tzJylcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCAyOyArK2kpIHtcbiAgICAgICAgdmFyIHRpY2sgPSB0aWNrc1tpXVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aWNrKSB8fCB0aWNrLmxlbmd0aCkge1xuICAgICAgICAgIHRpY2sgPSBuZGFycmF5KHRpY2spXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpY2suc2hhcGVbMF0gIT09IHNoYXBlW2ldKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnbC1zdXJmYWNlOiBpbnZhbGlkIHRpY2sgbGVuZ3RoJylcbiAgICAgICAgfVxuICAgICAgICAvLyBNYWtlIGEgY29weSB2aWV3IG9mIHRoZSB0aWNrIGFycmF5XG4gICAgICAgIHZhciB0aWNrMiA9IG5kYXJyYXkodGljay5kYXRhLCBzaGFwZSlcbiAgICAgICAgdGljazIuc3RyaWRlW2ldID0gdGljay5zdHJpZGVbMF1cbiAgICAgICAgdGljazIuc3RyaWRlW2kgXiAxXSA9IDBcblxuICAgICAgICAvLyBGaWxsIGluIGZpZWxkIGFycmF5XG4gICAgICAgIHRoaXMucGFkRmllbGQodGhpcy5fZmllbGRbaV0sIHRpY2syKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgMjsgKytpKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSBbMCwgMF1cbiAgICAgICAgb2Zmc2V0W2ldID0gMVxuICAgICAgICB0aGlzLl9maWVsZFtpXSA9IG5kYXJyYXkodGhpcy5fZmllbGRbaV0uZGF0YSwgW3NoYXBlWzBdICsgMiwgc2hhcGVbMV0gKyAyXSwgb2Zmc2V0LCAwKVxuICAgICAgfVxuICAgICAgdGhpcy5fZmllbGRbMF0uc2V0KDAsIDAsIDApXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNoYXBlWzBdOyArK2opIHtcbiAgICAgICAgdGhpcy5fZmllbGRbMF0uc2V0KGogKyAxLCAwLCBqKVxuICAgICAgfVxuICAgICAgdGhpcy5fZmllbGRbMF0uc2V0KHNoYXBlWzBdICsgMSwgMCwgc2hhcGVbMF0gLSAxKVxuICAgICAgdGhpcy5fZmllbGRbMV0uc2V0KDAsIDAsIDApXG4gICAgICBmb3IgKGogPSAwOyBqIDwgc2hhcGVbMV07ICsraikge1xuICAgICAgICB0aGlzLl9maWVsZFsxXS5zZXQoMCwgaiArIDEsIGopXG4gICAgICB9XG4gICAgICB0aGlzLl9maWVsZFsxXS5zZXQoMCwgc2hhcGVbMV0gKyAxLCBzaGFwZVsxXSAtIDEpXG4gICAgfVxuXG4gICAgLy8gU2F2ZSBzaGFwZVxuICAgIHZhciBmaWVsZHMgPSB0aGlzLl9maWVsZFxuXG4gICAgLy8gQ29tcHV0ZSBzdXJmYWNlIG5vcm1hbHNcbiAgICB2YXIgZGZpZWxkcyA9IG5kYXJyYXkocG9vbC5tYWxsb2NGbG9hdChmaWVsZHNbMl0uc2l6ZSAqIDMgKiAyKSwgWzMsIHNoYXBlWzBdICsgMiwgc2hhcGVbMV0gKyAyLCAyXSlcbiAgICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICBncmFkaWVudChkZmllbGRzLnBpY2soaSksIGZpZWxkc1tpXSwgJ21pcnJvcicpXG4gICAgfVxuICAgIHZhciBub3JtYWxzID0gbmRhcnJheShwb29sLm1hbGxvY0Zsb2F0KGZpZWxkc1syXS5zaXplICogMyksIFtzaGFwZVswXSArIDIsIHNoYXBlWzFdICsgMiwgM10pXG4gICAgZm9yIChpID0gMDsgaSA8IHNoYXBlWzBdICsgMjsgKytpKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgc2hhcGVbMV0gKyAyOyArK2opIHtcbiAgICAgICAgdmFyIGR4ZHUgPSBkZmllbGRzLmdldCgwLCBpLCBqLCAwKVxuICAgICAgICB2YXIgZHhkdiA9IGRmaWVsZHMuZ2V0KDAsIGksIGosIDEpXG4gICAgICAgIHZhciBkeWR1ID0gZGZpZWxkcy5nZXQoMSwgaSwgaiwgMClcbiAgICAgICAgdmFyIGR5ZHYgPSBkZmllbGRzLmdldCgxLCBpLCBqLCAxKVxuICAgICAgICB2YXIgZHpkdSA9IGRmaWVsZHMuZ2V0KDIsIGksIGosIDApXG4gICAgICAgIHZhciBkemR2ID0gZGZpZWxkcy5nZXQoMiwgaSwgaiwgMSlcblxuICAgICAgICB2YXIgbnggPSBkeWR1ICogZHpkdiAtIGR5ZHYgKiBkemR1XG4gICAgICAgIHZhciBueSA9IGR6ZHUgKiBkeGR2IC0gZHpkdiAqIGR4ZHVcbiAgICAgICAgdmFyIG56ID0gZHhkdSAqIGR5ZHYgLSBkeGR2ICogZHlkdVxuXG4gICAgICAgIHZhciBubCA9IE1hdGguc3FydChueCAqIG54ICsgbnkgKiBueSArIG56ICogbnopXG4gICAgICAgIGlmIChubCA8IDFlLTgpIHtcbiAgICAgICAgICBubCA9IE1hdGgubWF4KE1hdGguYWJzKG54KSwgTWF0aC5hYnMobnkpLCBNYXRoLmFicyhueikpXG4gICAgICAgICAgaWYgKG5sIDwgMWUtOCkge1xuICAgICAgICAgICAgbnogPSAxLjBcbiAgICAgICAgICAgIG55ID0gbnggPSAwLjBcbiAgICAgICAgICAgIG5sID0gMS4wXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5sID0gMS4wIC8gbmxcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmwgPSAxLjAgLyBNYXRoLnNxcnQobmwpXG4gICAgICAgIH1cblxuICAgICAgICBub3JtYWxzLnNldChpLCBqLCAwLCBueCAqIG5sKVxuICAgICAgICBub3JtYWxzLnNldChpLCBqLCAxLCBueSAqIG5sKVxuICAgICAgICBub3JtYWxzLnNldChpLCBqLCAyLCBueiAqIG5sKVxuICAgICAgfVxuICAgIH1cbiAgICBwb29sLmZyZWUoZGZpZWxkcy5kYXRhKVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBzdXJmYWNlXG4gICAgdmFyIGxvID0gWyBJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5IF1cbiAgICB2YXIgaGkgPSBbIC1JbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHkgXVxuICAgIHZhciBsb19pbnRlbnNpdHkgPSBJbmZpbml0eVxuICAgIHZhciBoaV9pbnRlbnNpdHkgPSAtSW5maW5pdHlcbiAgICB2YXIgY291bnQgPSAoc2hhcGVbMF0gLSAxKSAqIChzaGFwZVsxXSAtIDEpICogNlxuICAgIHZhciB0dmVydHMgPSBwb29sLm1hbGxvY0Zsb2F0KGJpdHMubmV4dFBvdzIoMTAgKiBjb3VudCkpXG4gICAgdmFyIHRwdHIgPSAwXG4gICAgdmFyIHZlcnRleENvdW50ID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBzaGFwZVswXSAtIDE7ICsraSkge1xuICAgICAgal9sb29wOlxuICAgICAgZm9yIChqID0gMDsgaiA8IHNoYXBlWzFdIC0gMTsgKytqKSB7XG4gICAgICAgIC8vIFRlc3QgZm9yIE5hTnNcbiAgICAgICAgZm9yICh2YXIgZHggPSAwOyBkeCA8IDI7ICsrZHgpIHtcbiAgICAgICAgICBmb3IgKHZhciBkeSA9IDA7IGR5IDwgMjsgKytkeSkge1xuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCAzOyArK2spIHtcbiAgICAgICAgICAgICAgdmFyIGYgPSB0aGlzLl9maWVsZFtrXS5nZXQoMSArIGkgKyBkeCwgMSArIGogKyBkeSlcbiAgICAgICAgICAgICAgaWYgKGlzTmFOKGYpIHx8ICFpc0Zpbml0ZShmKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlIGpfbG9vcFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCA2OyArK2spIHtcbiAgICAgICAgICB2YXIgciA9IGkgKyBRVUFEW2tdWzBdXG4gICAgICAgICAgdmFyIGMgPSBqICsgUVVBRFtrXVsxXVxuXG4gICAgICAgICAgdmFyIHR4ID0gdGhpcy5fZmllbGRbMF0uZ2V0KHIgKyAxLCBjICsgMSlcbiAgICAgICAgICB2YXIgdHkgPSB0aGlzLl9maWVsZFsxXS5nZXQociArIDEsIGMgKyAxKVxuICAgICAgICAgIGYgPSAgICAgIHRoaXMuX2ZpZWxkWzJdLmdldChyICsgMSwgYyArIDEpXG5cbiAgICAgICAgICBueCA9IG5vcm1hbHMuZ2V0KHIgKyAxLCBjICsgMSwgMClcbiAgICAgICAgICBueSA9IG5vcm1hbHMuZ2V0KHIgKyAxLCBjICsgMSwgMSlcbiAgICAgICAgICBueiA9IG5vcm1hbHMuZ2V0KHIgKyAxLCBjICsgMSwgMilcblxuICAgICAgICAgIGlmIChwYXJhbXMuaW50ZW5zaXR5KSB7XG4gICAgICAgICAgICB2ZiA9IHBhcmFtcy5pbnRlbnNpdHkuZ2V0KHIsIGMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHZmID0gKHBhcmFtcy5pbnRlbnNpdHkpID9cbiAgICAgICAgICAgIHBhcmFtcy5pbnRlbnNpdHkuZ2V0KHIsIGMpIDpcbiAgICAgICAgICAgIGYgKyB0aGlzLm9iamVjdE9mZnNldFsyXTtcblxuICAgICAgICAgIHR2ZXJ0c1t0cHRyKytdID0gclxuICAgICAgICAgIHR2ZXJ0c1t0cHRyKytdID0gY1xuICAgICAgICAgIHR2ZXJ0c1t0cHRyKytdID0gdHhcbiAgICAgICAgICB0dmVydHNbdHB0cisrXSA9IHR5XG4gICAgICAgICAgdHZlcnRzW3RwdHIrK10gPSBmXG4gICAgICAgICAgdHZlcnRzW3RwdHIrK10gPSAwXG4gICAgICAgICAgdHZlcnRzW3RwdHIrK10gPSB2ZlxuICAgICAgICAgIHR2ZXJ0c1t0cHRyKytdID0gbnhcbiAgICAgICAgICB0dmVydHNbdHB0cisrXSA9IG55XG4gICAgICAgICAgdHZlcnRzW3RwdHIrK10gPSBuelxuXG4gICAgICAgICAgbG9bMF0gPSBNYXRoLm1pbihsb1swXSwgdHggKyB0aGlzLm9iamVjdE9mZnNldFswXSlcbiAgICAgICAgICBsb1sxXSA9IE1hdGgubWluKGxvWzFdLCB0eSArIHRoaXMub2JqZWN0T2Zmc2V0WzFdKVxuICAgICAgICAgIGxvWzJdID0gTWF0aC5taW4obG9bMl0sIGYgICsgdGhpcy5vYmplY3RPZmZzZXRbMl0pXG4gICAgICAgICAgbG9faW50ZW5zaXR5ID0gTWF0aC5taW4obG9faW50ZW5zaXR5LCB2ZilcblxuICAgICAgICAgIGhpWzBdID0gTWF0aC5tYXgoaGlbMF0sIHR4ICsgdGhpcy5vYmplY3RPZmZzZXRbMF0pXG4gICAgICAgICAgaGlbMV0gPSBNYXRoLm1heChoaVsxXSwgdHkgKyB0aGlzLm9iamVjdE9mZnNldFsxXSlcbiAgICAgICAgICBoaVsyXSA9IE1hdGgubWF4KGhpWzJdLCBmICArIHRoaXMub2JqZWN0T2Zmc2V0WzJdKVxuICAgICAgICAgIGhpX2ludGVuc2l0eSA9IE1hdGgubWF4KGhpX2ludGVuc2l0eSwgdmYpXG5cbiAgICAgICAgICB2ZXJ0ZXhDb3VudCArPSAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmludGVuc2l0eUJvdW5kcykge1xuICAgICAgbG9faW50ZW5zaXR5ID0gK3BhcmFtcy5pbnRlbnNpdHlCb3VuZHNbMF1cbiAgICAgIGhpX2ludGVuc2l0eSA9ICtwYXJhbXMuaW50ZW5zaXR5Qm91bmRzWzFdXG4gICAgfVxuXG4gICAgLy8gU2NhbGUgYWxsIHZlcnRleCBpbnRlbnNpdGllc1xuICAgIGZvciAoaSA9IDY7IGkgPCB0cHRyOyBpICs9IDEwKSB7XG4gICAgICB0dmVydHNbaV0gPSAodHZlcnRzW2ldIC0gbG9faW50ZW5zaXR5KSAvIChoaV9pbnRlbnNpdHkgLSBsb19pbnRlbnNpdHkpXG4gICAgfVxuXG4gICAgdGhpcy5fdmVydGV4Q291bnQgPSB2ZXJ0ZXhDb3VudFxuICAgIHRoaXMuX2Nvb3JkaW5hdGVCdWZmZXIudXBkYXRlKHR2ZXJ0cy5zdWJhcnJheSgwLCB0cHRyKSlcbiAgICBwb29sLmZyZWVGbG9hdCh0dmVydHMpXG4gICAgcG9vbC5mcmVlKG5vcm1hbHMuZGF0YSlcblxuICAgIC8vIFVwZGF0ZSBib3VuZHNcbiAgICB0aGlzLmJvdW5kcyA9IFtsbywgaGldXG5cbiAgICAvLyBTYXZlIGludGVuc2l0eVxuICAgIHRoaXMuaW50ZW5zaXR5ID0gcGFyYW1zLmludGVuc2l0eSB8fCB0aGlzLl9maWVsZFsyXVxuXG4gICAgaWYodGhpcy5pbnRlbnNpdHlCb3VuZHNbMF0gIT09IGxvX2ludGVuc2l0eSB8fCB0aGlzLmludGVuc2l0eUJvdW5kc1sxXSAhPT0gaGlfaW50ZW5zaXR5KSB7XG4gICAgICAgIGxldmVsc0NoYW5nZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gU2F2ZSBpbnRlbnNpdHkgYm91bmRcbiAgICB0aGlzLmludGVuc2l0eUJvdW5kcyA9IFtsb19pbnRlbnNpdHksIGhpX2ludGVuc2l0eV1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBsZXZlbCBjcm9zc2luZ3NcbiAgaWYgKCdsZXZlbHMnIGluIHBhcmFtcykge1xuICAgIHZhciBsZXZlbHMgPSBwYXJhbXMubGV2ZWxzXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGxldmVsc1swXSkpIHtcbiAgICAgIGxldmVscyA9IFsgW10sIFtdLCBsZXZlbHMgXVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXZlbHMgPSBsZXZlbHMuc2xpY2UoKVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICBsZXZlbHNbaV0gPSBsZXZlbHNbaV0uc2xpY2UoKVxuICAgICAgbGV2ZWxzW2ldLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiXG4gICAgICB9KVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbGV2ZWxzW2ldLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGxldmVsc1tpXVtqXSAtPSB0aGlzLm9iamVjdE9mZnNldFtpXVxuICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VfdGVzdDpcbiAgICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICBpZiAobGV2ZWxzW2ldLmxlbmd0aCAhPT0gdGhpcy5jb250b3VyTGV2ZWxzW2ldLmxlbmd0aCkge1xuICAgICAgICBsZXZlbHNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgZm9yIChqID0gMDsgaiA8IGxldmVsc1tpXS5sZW5ndGg7ICsraikge1xuICAgICAgICBpZiAobGV2ZWxzW2ldW2pdICE9PSB0aGlzLmNvbnRvdXJMZXZlbHNbaV1bal0pIHtcbiAgICAgICAgICBsZXZlbHNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrIGNoYW5nZV90ZXN0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb250b3VyTGV2ZWxzID0gbGV2ZWxzXG4gIH1cblxuICBpZiAobGV2ZWxzQ2hhbmdlZCkge1xuICAgIGZpZWxkcyA9IHRoaXMuX2ZpZWxkXG4gICAgc2hhcGUgPSB0aGlzLnNoYXBlXG5cbiAgICAvLyBVcGRhdGUgY29udG91ciBsaW5lc1xuICAgIHZhciBjb250b3VyVmVydHMgPSBbXVxuXG4gICAgZm9yICh2YXIgZGltID0gMDsgZGltIDwgMzsgKytkaW0pIHtcbiAgICAgIHZhciBjb250b3VyTGV2ZWwgPSB0aGlzLmNvbnRvdXJMZXZlbHNbZGltXVxuXG4gICAgICB2YXIgbGV2ZWxPZmZzZXRzID0gW11cbiAgICAgIHZhciBsZXZlbENvdW50cyA9IFtdXG5cbiAgICAgIHZhciBwYXJ0cyA9IFswLCAwLCAwXVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY29udG91ckxldmVsLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBncmFwaCA9IHN1cmZhY2VOZXRzKHRoaXMuX2ZpZWxkW2RpbV0sIGNvbnRvdXJMZXZlbFtpXSlcblxuICAgICAgICBsZXZlbE9mZnNldHMucHVzaCgoY29udG91clZlcnRzLmxlbmd0aCAvIDUpIHwgMClcbiAgICAgICAgdmVydGV4Q291bnQgPSAwXG5cbiAgICAgICAgZWRnZV9sb29wOlxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgZ3JhcGguY2VsbHMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICB2YXIgZSA9IGdyYXBoLmNlbGxzW2pdXG4gICAgICAgICAgZm9yIChrID0gMDsgayA8IDI7ICsraykge1xuICAgICAgICAgICAgdmFyIHAgPSBncmFwaC5wb3NpdGlvbnNbZVtrXV1cblxuICAgICAgICAgICAgdmFyIHggPSBwWzBdXG4gICAgICAgICAgICB2YXIgaXggPSBNYXRoLmZsb29yKHgpIHwgMFxuICAgICAgICAgICAgdmFyIGZ4ID0geCAtIGl4XG5cbiAgICAgICAgICAgIHZhciB5ID0gcFsxXVxuICAgICAgICAgICAgdmFyIGl5ID0gTWF0aC5mbG9vcih5KSB8IDBcbiAgICAgICAgICAgIHZhciBmeSA9IHkgLSBpeVxuXG4gICAgICAgICAgICB2YXIgaG9sZSA9IGZhbHNlXG4gICAgICAgICAgICBheGlzX2xvb3A6XG4gICAgICAgICAgICBmb3IgKHZhciBheGlzID0gMDsgYXhpcyA8IDM7ICsrYXhpcykge1xuICAgICAgICAgICAgICBwYXJ0c1theGlzXSA9IDAuMFxuICAgICAgICAgICAgICB2YXIgaXUgPSAoZGltICsgYXhpcyArIDEpICUgM1xuICAgICAgICAgICAgICBmb3IgKGR4ID0gMDsgZHggPCAyOyArK2R4KSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBkeCA/IGZ4IDogMS4wIC0gZnhcbiAgICAgICAgICAgICAgICByID0gTWF0aC5taW4oTWF0aC5tYXgoaXggKyBkeCwgMCksIHNoYXBlWzBdKSB8IDBcbiAgICAgICAgICAgICAgICBmb3IgKGR5ID0gMDsgZHkgPCAyOyArK2R5KSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdCA9IGR5ID8gZnkgOiAxLjAgLSBmeVxuICAgICAgICAgICAgICAgICAgYyA9IE1hdGgubWluKE1hdGgubWF4KGl5ICsgZHksIDApLCBzaGFwZVsxXSkgfCAwXG5cbiAgICAgICAgICAgICAgICAgIGlmIChheGlzIDwgMikge1xuICAgICAgICAgICAgICAgICAgICBmID0gdGhpcy5fZmllbGRbaXVdLmdldChyLCBjKVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZiA9ICh0aGlzLmludGVuc2l0eS5nZXQociwgYykgLSB0aGlzLmludGVuc2l0eUJvdW5kc1swXSkgLyAodGhpcy5pbnRlbnNpdHlCb3VuZHNbMV0gLSB0aGlzLmludGVuc2l0eUJvdW5kc1swXSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUoZikgfHwgaXNOYU4oZikpIHtcbiAgICAgICAgICAgICAgICAgICAgaG9sZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWsgYXhpc19sb29wXG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHZhciB3ID0gcyAqIHRcbiAgICAgICAgICAgICAgICAgIHBhcnRzW2F4aXNdICs9IHcgKiBmXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaG9sZSkge1xuICAgICAgICAgICAgICBjb250b3VyVmVydHMucHVzaChcbiAgICAgICAgICAgICAgICBwYXJ0c1swXSxcbiAgICAgICAgICAgICAgICBwYXJ0c1sxXSxcbiAgICAgICAgICAgICAgICBwWzBdLFxuICAgICAgICAgICAgICAgIHBbMV0sXG4gICAgICAgICAgICAgICAgcGFydHNbMl1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB2ZXJ0ZXhDb3VudCArPSAxXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoayA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhbHJlYWR5IGFkZGVkIGZpcnN0IGVkZ2UsIHBvcCBvZmYgdmVydHNcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IDU7ICsrbCkge1xuICAgICAgICAgICAgICAgICAgY29udG91clZlcnRzLnBvcCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZlcnRleENvdW50IC09IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250aW51ZSBlZGdlX2xvb3BcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV2ZWxDb3VudHMucHVzaCh2ZXJ0ZXhDb3VudClcbiAgICAgIH1cblxuICAgICAgLy8gU3RvcmUgcmVzdWx0c1xuICAgICAgdGhpcy5fY29udG91ck9mZnNldHNbZGltXSA9IGxldmVsT2Zmc2V0c1xuICAgICAgdGhpcy5fY29udG91ckNvdW50c1tkaW1dID0gbGV2ZWxDb3VudHNcblxuICAgIH1cblxuICAgIHZhciBmbG9hdEJ1ZmZlciA9IHBvb2wubWFsbG9jRmxvYXQoY29udG91clZlcnRzLmxlbmd0aClcbiAgICBmb3IgKGkgPSAwOyBpIDwgY29udG91clZlcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBmbG9hdEJ1ZmZlcltpXSA9IGNvbnRvdXJWZXJ0c1tpXVxuICAgIH1cbiAgICB0aGlzLl9jb250b3VyQnVmZmVyLnVwZGF0ZShmbG9hdEJ1ZmZlcilcbiAgICBwb29sLmZyZWVGbG9hdChmbG9hdEJ1ZmZlcilcbiAgfVxuXG4gIGlmIChwYXJhbXMuY29sb3JtYXApIHtcbiAgICB0aGlzLl9jb2xvck1hcC5zZXRQaXhlbHMoZ2VuQ29sb3JtYXAocGFyYW1zLmNvbG9ybWFwLCB0aGlzLm9wYWNpdHlzY2FsZSkpXG4gIH1cbn1cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fc2hhZGVyLmRpc3Bvc2UoKVxuICB0aGlzLl92YW8uZGlzcG9zZSgpXG4gIHRoaXMuX2Nvb3JkaW5hdGVCdWZmZXIuZGlzcG9zZSgpXG4gIHRoaXMuX2NvbG9yTWFwLmRpc3Bvc2UoKVxuICB0aGlzLl9jb250b3VyQnVmZmVyLmRpc3Bvc2UoKVxuICB0aGlzLl9jb250b3VyVkFPLmRpc3Bvc2UoKVxuICB0aGlzLl9jb250b3VyU2hhZGVyLmRpc3Bvc2UoKVxuICB0aGlzLl9jb250b3VyUGlja1NoYWRlci5kaXNwb3NlKClcbiAgdGhpcy5fZHluYW1pY0J1ZmZlci5kaXNwb3NlKClcbiAgdGhpcy5fZHluYW1pY1ZBTy5kaXNwb3NlKClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICBwb29sLmZyZWVGbG9hdCh0aGlzLl9maWVsZFtpXS5kYXRhKVxuICB9XG59XG5cbnByb3RvLmhpZ2hsaWdodCA9IGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgdmFyIGlcblxuICBpZiAoIXNlbGVjdGlvbikge1xuICAgIHRoaXMuX2R5bmFtaWNDb3VudHMgPSBbMCwgMCwgMF1cbiAgICB0aGlzLmR5YW5hbWljTGV2ZWwgPSBbTmFOLCBOYU4sIE5hTl1cbiAgICB0aGlzLmhpZ2hsaWdodExldmVsID0gWy0xLCAtMSwgLTFdXG4gICAgcmV0dXJuXG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlSGlnaGxpZ2h0W2ldKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodExldmVsW2ldID0gc2VsZWN0aW9uLmxldmVsW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0TGV2ZWxbaV0gPSAtMVxuICAgIH1cbiAgfVxuXG4gIHZhciBsZXZlbHNcbiAgaWYgKHRoaXMuc25hcFRvRGF0YSkge1xuICAgIGxldmVscyA9IHNlbGVjdGlvbi5kYXRhQ29vcmRpbmF0ZVxuICB9IGVsc2Uge1xuICAgIGxldmVscyA9IHNlbGVjdGlvbi5wb3NpdGlvblxuICB9XG4gIGZvciAoaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICBsZXZlbHNbaV0gLT0gdGhpcy5vYmplY3RPZmZzZXRbaV1cbiAgfVxuICBpZiAoKCF0aGlzLmVuYWJsZUR5bmFtaWNbMF0gfHwgbGV2ZWxzWzBdID09PSB0aGlzLmR5bmFtaWNMZXZlbFswXSkgJiZcbiAgICAoIXRoaXMuZW5hYmxlRHluYW1pY1sxXSB8fCBsZXZlbHNbMV0gPT09IHRoaXMuZHluYW1pY0xldmVsWzFdKSAmJlxuICAgICghdGhpcy5lbmFibGVEeW5hbWljWzJdIHx8IGxldmVsc1syXSA9PT0gdGhpcy5keW5hbWljTGV2ZWxbMl0pKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgdmVydGV4Q291bnQgPSAwXG4gIHZhciBzaGFwZSA9IHRoaXMuc2hhcGVcbiAgdmFyIHNjcmF0Y2hCdWZmZXIgPSBwb29sLm1hbGxvY0Zsb2F0KDEyICogc2hhcGVbMF0gKiBzaGFwZVsxXSlcblxuICBmb3IgKHZhciBkID0gMDsgZCA8IDM7ICsrZCkge1xuICAgIGlmICghdGhpcy5lbmFibGVEeW5hbWljW2RdKSB7XG4gICAgICB0aGlzLmR5bmFtaWNMZXZlbFtkXSA9IE5hTlxuICAgICAgdGhpcy5fZHluYW1pY0NvdW50c1tkXSA9IDBcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdGhpcy5keW5hbWljTGV2ZWxbZF0gPSBsZXZlbHNbZF1cblxuICAgIHZhciB1ID0gKGQgKyAxKSAlIDNcbiAgICB2YXIgdiA9IChkICsgMikgJSAzXG5cbiAgICB2YXIgZiA9IHRoaXMuX2ZpZWxkW2RdXG4gICAgdmFyIGcgPSB0aGlzLl9maWVsZFt1XVxuICAgIHZhciBoID0gdGhpcy5fZmllbGRbdl1cblxuICAgIHZhciBncmFwaCA9IHN1cmZhY2VOZXRzKGYsIGxldmVsc1tkXSlcbiAgICB2YXIgZWRnZXMgPSBncmFwaC5jZWxsc1xuICAgIHZhciBwb3NpdGlvbnMgPSBncmFwaC5wb3NpdGlvbnNcblxuICAgIHRoaXMuX2R5bmFtaWNPZmZzZXRzW2RdID0gdmVydGV4Q291bnRcblxuICAgIGZvciAoaSA9IDA7IGkgPCBlZGdlcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGUgPSBlZGdlc1tpXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyOyArK2opIHtcbiAgICAgICAgdmFyIHAgPSBwb3NpdGlvbnNbZVtqXV1cblxuICAgICAgICB2YXIgeCA9ICtwWzBdXG4gICAgICAgIHZhciBpeCA9IHggfCAwXG4gICAgICAgIHZhciBqeCA9IE1hdGgubWluKGl4ICsgMSwgc2hhcGVbMF0pIHwgMFxuICAgICAgICB2YXIgZnggPSB4IC0gaXhcbiAgICAgICAgdmFyIGh4ID0gMS4wIC0gZnhcblxuICAgICAgICB2YXIgeSA9ICtwWzFdXG4gICAgICAgIHZhciBpeSA9IHkgfCAwXG4gICAgICAgIHZhciBqeSA9IE1hdGgubWluKGl5ICsgMSwgc2hhcGVbMV0pIHwgMFxuICAgICAgICB2YXIgZnkgPSB5IC0gaXlcbiAgICAgICAgdmFyIGh5ID0gMS4wIC0gZnlcblxuICAgICAgICB2YXIgdzAwID0gaHggKiBoeVxuICAgICAgICB2YXIgdzAxID0gaHggKiBmeVxuICAgICAgICB2YXIgdzEwID0gZnggKiBoeVxuICAgICAgICB2YXIgdzExID0gZnggKiBmeVxuXG4gICAgICAgIHZhciBjdSA9IHcwMCAqIGcuZ2V0KGl4LCBpeSkgK1xuICAgICAgICAgIHcwMSAqIGcuZ2V0KGl4LCBqeSkgK1xuICAgICAgICAgIHcxMCAqIGcuZ2V0KGp4LCBpeSkgK1xuICAgICAgICAgIHcxMSAqIGcuZ2V0KGp4LCBqeSlcblxuICAgICAgICB2YXIgY3YgPSB3MDAgKiBoLmdldChpeCwgaXkpICtcbiAgICAgICAgICB3MDEgKiBoLmdldChpeCwgankpICtcbiAgICAgICAgICB3MTAgKiBoLmdldChqeCwgaXkpICtcbiAgICAgICAgICB3MTEgKiBoLmdldChqeCwgankpXG5cbiAgICAgICAgaWYgKGlzTmFOKGN1KSB8fCBpc05hTihjdikpIHtcbiAgICAgICAgICBpZiAoaikge1xuICAgICAgICAgICAgdmVydGV4Q291bnQgLT0gMVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgc2NyYXRjaEJ1ZmZlclsyICogdmVydGV4Q291bnQgKyAwXSA9IGN1XG4gICAgICAgIHNjcmF0Y2hCdWZmZXJbMiAqIHZlcnRleENvdW50ICsgMV0gPSBjdlxuXG4gICAgICAgIHZlcnRleENvdW50ICs9IDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9keW5hbWljQ291bnRzW2RdID0gdmVydGV4Q291bnQgLSB0aGlzLl9keW5hbWljT2Zmc2V0c1tkXVxuICB9XG5cbiAgdGhpcy5fZHluYW1pY0J1ZmZlci51cGRhdGUoc2NyYXRjaEJ1ZmZlci5zdWJhcnJheSgwLCAyICogdmVydGV4Q291bnQpKVxuICBwb29sLmZyZWVGbG9hdChzY3JhdGNoQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdXJmYWNlUGxvdCAocGFyYW1zKSB7XG4gIHZhciBnbCA9IHBhcmFtcy5nbFxuXG4gIHZhciBzaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wpXG4gIHZhciBwaWNrU2hhZGVyID0gY3JlYXRlUGlja1NoYWRlcihnbClcbiAgdmFyIGNvbnRvdXJTaGFkZXIgPSBjcmVhdGVDb250b3VyU2hhZGVyKGdsKVxuICB2YXIgY29udG91clBpY2tTaGFkZXIgPSBjcmVhdGVQaWNrQ29udG91clNoYWRlcihnbClcblxuICB2YXIgY29vcmRpbmF0ZUJ1ZmZlciA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIHZhbyA9IGNyZWF0ZVZBTyhnbCwgW1xuICAgIHsgYnVmZmVyOiBjb29yZGluYXRlQnVmZmVyLFxuICAgICAgc2l6ZTogNCxcbiAgICAgIHN0cmlkZTogU1VSRkFDRV9WRVJURVhfU0laRSxcbiAgICAgIG9mZnNldDogMFxuICAgIH0sXG4gICAgeyBidWZmZXI6IGNvb3JkaW5hdGVCdWZmZXIsXG4gICAgICBzaXplOiAzLFxuICAgICAgc3RyaWRlOiBTVVJGQUNFX1ZFUlRFWF9TSVpFLFxuICAgICAgb2Zmc2V0OiAxNlxuICAgIH0sXG4gICAge1xuICAgICAgYnVmZmVyOiBjb29yZGluYXRlQnVmZmVyLFxuICAgICAgc2l6ZTogMyxcbiAgICAgIHN0cmlkZTogU1VSRkFDRV9WRVJURVhfU0laRSxcbiAgICAgIG9mZnNldDogMjhcbiAgICB9XG4gIF0pXG5cbiAgdmFyIGNvbnRvdXJCdWZmZXIgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciBjb250b3VyVkFPID0gY3JlYXRlVkFPKGdsLCBbXG4gICAge1xuICAgICAgYnVmZmVyOiBjb250b3VyQnVmZmVyLFxuICAgICAgc2l6ZTogNCxcbiAgICAgIHN0cmlkZTogMjAsXG4gICAgICBvZmZzZXQ6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgIGJ1ZmZlcjogY29udG91ckJ1ZmZlcixcbiAgICAgIHNpemU6IDEsXG4gICAgICBzdHJpZGU6IDIwLFxuICAgICAgb2Zmc2V0OiAxNlxuICAgIH1cbiAgXSlcblxuICB2YXIgZHluYW1pY0J1ZmZlciA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIGR5bmFtaWNWQU8gPSBjcmVhdGVWQU8oZ2wsIFtcbiAgICB7XG4gICAgICBidWZmZXI6IGR5bmFtaWNCdWZmZXIsXG4gICAgICBzaXplOiAyLFxuICAgICAgdHlwZTogZ2wuRkxPQVRcbiAgICB9XSlcblxuICB2YXIgY21hcCA9IGNyZWF0ZVRleHR1cmUoZ2wsIDEsIE5fQ09MT1JTLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFKVxuICBjbWFwLm1pbkZpbHRlciA9IGdsLkxJTkVBUlxuICBjbWFwLm1hZ0ZpbHRlciA9IGdsLkxJTkVBUlxuXG4gIHZhciBzdXJmYWNlID0gbmV3IFN1cmZhY2VQbG90KFxuICAgIGdsLFxuICAgIFswLCAwXSwgLy8gc2hhcGVcbiAgICBbWzAsIDAsIDBdLCBbMCwgMCwgMF1dLCAvLyBib3VuZHNcbiAgICBzaGFkZXIsXG4gICAgcGlja1NoYWRlcixcbiAgICBjb29yZGluYXRlQnVmZmVyLFxuICAgIHZhbyxcbiAgICBjbWFwLFxuICAgIGNvbnRvdXJTaGFkZXIsXG4gICAgY29udG91clBpY2tTaGFkZXIsXG4gICAgY29udG91ckJ1ZmZlcixcbiAgICBjb250b3VyVkFPLFxuICAgIGR5bmFtaWNCdWZmZXIsXG4gICAgZHluYW1pY1ZBTyxcbiAgICBbMCwgMCwgMF0gLy8gb2JqZWN0T2Zmc2V0XG4gIClcblxuICB2YXIgbnBhcmFtcyA9IHtcbiAgICBsZXZlbHM6IFtbXSwgW10sIFtdXVxuICB9XG4gIGZvciAodmFyIGlkIGluIHBhcmFtcykge1xuICAgIG5wYXJhbXNbaWRdID0gcGFyYW1zW2lkXVxuICB9XG4gIG5wYXJhbXMuY29sb3JtYXAgPSBucGFyYW1zLmNvbG9ybWFwIHx8ICdqZXQnXG5cbiAgc3VyZmFjZS51cGRhdGUobnBhcmFtcylcblxuICByZXR1cm4gc3VyZmFjZVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzICAgICAgPSBncmFkaWVudFxuXG52YXIgZHVwICAgICAgICAgICAgID0gcmVxdWlyZSgnZHVwJylcbnZhciBjd2lzZUNvbXBpbGVyICAgPSByZXF1aXJlKCdjd2lzZS1jb21waWxlcicpXG5cbnZhciBURU1QTEFURV9DQUNIRSAgPSB7fVxudmFyIEdSQURJRU5UX0NBQ0hFICA9IHt9XG5cbnZhciBFbXB0eVByb2MgPSB7XG4gIGJvZHk6IFwiXCIsXG4gIGFyZ3M6IFtdLFxuICB0aGlzVmFyczogW10sXG4gIGxvY2FsVmFyczogW11cbn1cblxudmFyIGNlbnRyYWxEaWZmID0gY3dpc2VDb21waWxlcih7XG4gIGFyZ3M6IFsgJ2FycmF5JywgJ2FycmF5JywgJ2FycmF5JyBdLFxuICBwcmU6IEVtcHR5UHJvYyxcbiAgcG9zdDogRW1wdHlQcm9jLFxuICBib2R5OiB7XG4gICAgYXJnczogWyB7XG4gICAgICBuYW1lOiAnb3V0JywgXG4gICAgICBsdmFsdWU6IHRydWUsXG4gICAgICBydmFsdWU6IGZhbHNlLFxuICAgICAgY291bnQ6IDFcbiAgICB9LCB7XG4gICAgICBuYW1lOiAnbGVmdCcsIFxuICAgICAgbHZhbHVlOiBmYWxzZSxcbiAgICAgIHJ2YWx1ZTogdHJ1ZSxcbiAgICAgIGNvdW50OiAxXG4gICAgfSwge1xuICAgICAgbmFtZTogJ3JpZ2h0JywgXG4gICAgICBsdmFsdWU6IGZhbHNlLFxuICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgY291bnQ6IDFcbiAgICB9XSxcbiAgICBib2R5OiBcIm91dD0wLjUqKGxlZnQtcmlnaHQpXCIsXG4gICAgdGhpc1ZhcnM6IFtdLFxuICAgIGxvY2FsVmFyczogW11cbiAgfSxcbiAgZnVuY05hbWU6ICdjZGlmZidcbn0pXG5cbnZhciB6ZXJvT3V0ID0gY3dpc2VDb21waWxlcih7XG4gIGFyZ3M6IFsgJ2FycmF5JyBdLFxuICBwcmU6IEVtcHR5UHJvYyxcbiAgcG9zdDogRW1wdHlQcm9jLFxuICBib2R5OiB7XG4gICAgYXJnczogWyB7XG4gICAgICBuYW1lOiAnb3V0JywgXG4gICAgICBsdmFsdWU6IHRydWUsXG4gICAgICBydmFsdWU6IGZhbHNlLFxuICAgICAgY291bnQ6IDFcbiAgICB9XSxcbiAgICBib2R5OiBcIm91dD0wXCIsXG4gICAgdGhpc1ZhcnM6IFtdLFxuICAgIGxvY2FsVmFyczogW11cbiAgfSxcbiAgZnVuY05hbWU6ICd6ZXJvJ1xufSlcblxuZnVuY3Rpb24gZ2VuZXJhdGVUZW1wbGF0ZShkKSB7XG4gIGlmKGQgaW4gVEVNUExBVEVfQ0FDSEUpIHtcbiAgICByZXR1cm4gVEVNUExBVEVfQ0FDSEVbZF1cbiAgfVxuICB2YXIgY29kZSA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPGQ7ICsraSkge1xuICAgIGNvZGUucHVzaCgnb3V0JywgaSwgJ3M9MC41KihpbnAnLCBpLCAnbC1pbnAnLCBpLCAncik7JylcbiAgfVxuICB2YXIgYXJncyA9IFsgJ2FycmF5JyBdXG4gIHZhciBuYW1lcyA9IFsnanVuayddXG4gIGZvcih2YXIgaT0wOyBpPGQ7ICsraSkge1xuICAgIGFyZ3MucHVzaCgnYXJyYXknKVxuICAgIG5hbWVzLnB1c2goJ291dCcgKyBpICsgJ3MnKVxuICAgIHZhciBvID0gZHVwKGQpXG4gICAgb1tpXSA9IC0xXG4gICAgYXJncy5wdXNoKHtcbiAgICAgIGFycmF5OiAwLFxuICAgICAgb2Zmc2V0OiBvLnNsaWNlKClcbiAgICB9KVxuICAgIG9baV0gPSAxXG4gICAgYXJncy5wdXNoKHtcbiAgICAgIGFycmF5OiAwLFxuICAgICAgb2Zmc2V0OiBvLnNsaWNlKClcbiAgICB9KVxuICAgIG5hbWVzLnB1c2goJ2lucCcgKyBpICsgJ2wnLCAnaW5wJyArIGkgKyAncicpXG4gIH1cbiAgcmV0dXJuIFRFTVBMQVRFX0NBQ0hFW2RdID0gY3dpc2VDb21waWxlcih7XG4gICAgYXJnczogYXJncyxcbiAgICBwcmU6ICBFbXB0eVByb2MsXG4gICAgcG9zdDogRW1wdHlQcm9jLFxuICAgIGJvZHk6IHtcbiAgICAgIGJvZHk6IGNvZGUuam9pbignJyksXG4gICAgICBhcmdzOiBuYW1lcy5tYXAoZnVuY3Rpb24obikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IG4sXG4gICAgICAgICAgbHZhbHVlOiBuLmluZGV4T2YoJ291dCcpID09PSAwLFxuICAgICAgICAgIHJ2YWx1ZTogbi5pbmRleE9mKCdpbnAnKSA9PT0gMCxcbiAgICAgICAgICBjb3VudDogKG4hPT0nanVuaycpfDBcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICB0aGlzVmFyczogW10sXG4gICAgICBsb2NhbFZhcnM6IFtdXG4gICAgfSxcbiAgICBmdW5jTmFtZTogJ2ZkVGVtcGxhdGUnICsgZFxuICB9KVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUdyYWRpZW50KGJvdW5kYXJ5Q29uZGl0aW9ucykge1xuICB2YXIgdG9rZW4gPSBib3VuZGFyeUNvbmRpdGlvbnMuam9pbigpXG4gIHZhciBwcm9jID0gR1JBRElFTlRfQ0FDSEVbdG9rZW5dXG4gIGlmKHByb2MpIHtcbiAgICByZXR1cm4gcHJvY1xuICB9XG5cbiAgdmFyIGQgPSBib3VuZGFyeUNvbmRpdGlvbnMubGVuZ3RoXG4gIHZhciBjb2RlID0gWydmdW5jdGlvbiBncmFkaWVudChkc3Qsc3JjKXt2YXIgcz1zcmMuc2hhcGUuc2xpY2UoKTsnIF1cbiAgXG4gIGZ1bmN0aW9uIGhhbmRsZUJvdW5kYXJ5KGZhY2V0KSB7XG4gICAgdmFyIGNvZCA9IGQgLSBmYWNldC5sZW5ndGhcblxuICAgIHZhciBsb1N0ciA9IFtdXG4gICAgdmFyIGhpU3RyID0gW11cbiAgICB2YXIgcGlja1N0ciA9IFtdXG4gICAgZm9yKHZhciBpPTA7IGk8ZDsgKytpKSB7XG4gICAgICBpZihmYWNldC5pbmRleE9mKGkrMSkgPj0gMCkge1xuICAgICAgICBwaWNrU3RyLnB1c2goJzAnKVxuICAgICAgfSBlbHNlIGlmKGZhY2V0LmluZGV4T2YoLShpKzEpKSA+PSAwKSB7XG4gICAgICAgIHBpY2tTdHIucHVzaCgnc1snK2krJ10tMScpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwaWNrU3RyLnB1c2goJy0xJylcbiAgICAgICAgbG9TdHIucHVzaCgnMScpXG4gICAgICAgIGhpU3RyLnB1c2goJ3NbJytpKyddLTInKVxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgYm91bmRTdHIgPSAnLmxvKCcgKyBsb1N0ci5qb2luKCkgKyAnKS5oaSgnICsgaGlTdHIuam9pbigpICsgJyknXG4gICAgaWYobG9TdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICBib3VuZFN0ciA9ICcnXG4gICAgfVxuICAgICAgICBcbiAgICBpZihjb2QgPiAwKSB7XG4gICAgICBjb2RlLnB1c2goJ2lmKDEnKSBcbiAgICAgIGZvcih2YXIgaT0wOyBpPGQ7ICsraSkge1xuICAgICAgICBpZihmYWNldC5pbmRleE9mKGkrMSkgPj0gMCB8fCBmYWNldC5pbmRleE9mKC0oaSsxKSkgPj0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgY29kZS5wdXNoKCcmJnNbJywgaSwgJ10+MicpXG4gICAgICB9XG4gICAgICBjb2RlLnB1c2goJyl7Z3JhZCcsIGNvZCwgJyhzcmMucGljaygnLCBwaWNrU3RyLmpvaW4oKSwgJyknLCBib3VuZFN0cilcbiAgICAgIGZvcih2YXIgaT0wOyBpPGQ7ICsraSkge1xuICAgICAgICBpZihmYWNldC5pbmRleE9mKGkrMSkgPj0gMCB8fCBmYWNldC5pbmRleE9mKC0oaSsxKSkgPj0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgY29kZS5wdXNoKCcsZHN0LnBpY2soJywgcGlja1N0ci5qb2luKCksICcsJywgaSwgJyknLCBib3VuZFN0cilcbiAgICAgIH1cbiAgICAgIGNvZGUucHVzaCgnKTsnKVxuICAgIH1cblxuICAgIGZvcih2YXIgaT0wOyBpPGZhY2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgYm5kID0gTWF0aC5hYnMoZmFjZXRbaV0pLTFcbiAgICAgIHZhciBvdXRTdHIgPSAnZHN0LnBpY2soJyArIHBpY2tTdHIuam9pbigpICsgJywnICsgYm5kICsgJyknICsgYm91bmRTdHJcbiAgICAgIHN3aXRjaChib3VuZGFyeUNvbmRpdGlvbnNbYm5kXSkge1xuXG4gICAgICAgIGNhc2UgJ2NsYW1wJzpcbiAgICAgICAgICB2YXIgY1BpY2tTdHIgPSBwaWNrU3RyLnNsaWNlKClcbiAgICAgICAgICB2YXIgZFBpY2tTdHIgPSBwaWNrU3RyLnNsaWNlKClcbiAgICAgICAgICBpZihmYWNldFtpXSA8IDApIHtcbiAgICAgICAgICAgIGNQaWNrU3RyW2JuZF0gPSAnc1snICsgYm5kICsgJ10tMidcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZFBpY2tTdHJbYm5kXSA9ICcxJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihjb2QgPT09IDApIHtcbiAgICAgICAgICAgIGNvZGUucHVzaCgnaWYoc1snLCBibmQsICddPjEpe2RzdC5zZXQoJyxcbiAgICAgICAgICAgICAgcGlja1N0ci5qb2luKCksICcsJywgYm5kLCAnLDAuNSooc3JjLmdldCgnLFxuICAgICAgICAgICAgICAgIGNQaWNrU3RyLmpvaW4oKSwgJyktc3JjLmdldCgnLFxuICAgICAgICAgICAgICAgIGRQaWNrU3RyLmpvaW4oKSwgJykpKX1lbHNle2RzdC5zZXQoJyxcbiAgICAgICAgICAgICAgcGlja1N0ci5qb2luKCksICcsJywgYm5kLCAnLDApfTsnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlLnB1c2goJ2lmKHNbJywgYm5kLCAnXT4xKXtkaWZmKCcsIG91dFN0ciwgXG4gICAgICAgICAgICAgICAgJyxzcmMucGljaygnLCBjUGlja1N0ci5qb2luKCksICcpJywgYm91bmRTdHIsIFxuICAgICAgICAgICAgICAgICcsc3JjLnBpY2soJywgZFBpY2tTdHIuam9pbigpLCAnKScsIGJvdW5kU3RyLCBcbiAgICAgICAgICAgICAgICAnKTt9ZWxzZXt6ZXJvKCcsIG91dFN0ciwgJyk7fTsnKVxuICAgICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICdtaXJyb3InOlxuICAgICAgICAgIGlmKGNvZCA9PT0gMCkge1xuICAgICAgICAgICAgY29kZS5wdXNoKCdkc3Quc2V0KCcsIHBpY2tTdHIuam9pbigpLCAnLCcsIGJuZCwgJywwKTsnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlLnB1c2goJ3plcm8oJywgb3V0U3RyLCAnKTsnKVxuICAgICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICd3cmFwJzpcbiAgICAgICAgICB2YXIgYVBpY2tTdHIgPSBwaWNrU3RyLnNsaWNlKClcbiAgICAgICAgICB2YXIgYlBpY2tTdHIgPSBwaWNrU3RyLnNsaWNlKClcbiAgICAgICAgICBpZihmYWNldFtpXSA8IDApIHtcbiAgICAgICAgICAgIGFQaWNrU3RyW2JuZF0gPSAnc1snICsgYm5kICsgJ10tMidcbiAgICAgICAgICAgIGJQaWNrU3RyW2JuZF0gPSAnMCdcbiAgICAgICAgICAgIFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhUGlja1N0cltibmRdID0gJ3NbJyArIGJuZCArICddLTEnXG4gICAgICAgICAgICBiUGlja1N0cltibmRdID0gJzEnXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGNvZCA9PT0gMCkge1xuICAgICAgICAgICAgY29kZS5wdXNoKCdpZihzWycsIGJuZCwgJ10+Mil7ZHN0LnNldCgnLFxuICAgICAgICAgICAgICBwaWNrU3RyLmpvaW4oKSwgJywnLCBibmQsICcsMC41KihzcmMuZ2V0KCcsXG4gICAgICAgICAgICAgICAgYVBpY2tTdHIuam9pbigpLCAnKS1zcmMuZ2V0KCcsXG4gICAgICAgICAgICAgICAgYlBpY2tTdHIuam9pbigpLCAnKSkpfWVsc2V7ZHN0LnNldCgnLFxuICAgICAgICAgICAgICBwaWNrU3RyLmpvaW4oKSwgJywnLCBibmQsICcsMCl9OycpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvZGUucHVzaCgnaWYoc1snLCBibmQsICddPjIpe2RpZmYoJywgb3V0U3RyLCBcbiAgICAgICAgICAgICAgICAnLHNyYy5waWNrKCcsIGFQaWNrU3RyLmpvaW4oKSwgJyknLCBib3VuZFN0ciwgXG4gICAgICAgICAgICAgICAgJyxzcmMucGljaygnLCBiUGlja1N0ci5qb2luKCksICcpJywgYm91bmRTdHIsIFxuICAgICAgICAgICAgICAgICcpO31lbHNle3plcm8oJywgb3V0U3RyLCAnKTt9OycpXG4gICAgICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCduZGFycmF5LWdyYWRpZW50OiBJbnZhbGlkIGJvdW5kYXJ5IGNvbmRpdGlvbicpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoY29kID4gMCkge1xuICAgICAgY29kZS5wdXNoKCd9OycpXG4gICAgfVxuICB9XG5cbiAgLy9FbnVtZXJhdGUgcmlkZ2VzLCBmYWNldHMsIGV0Yy4gb2YgaHlwZXJjdWJlXG4gIGZvcih2YXIgaT0wOyBpPCgxPDxkKTsgKytpKSB7XG4gICAgdmFyIGZhY2VzID0gW11cbiAgICBmb3IodmFyIGo9MDsgajxkOyArK2opIHtcbiAgICAgIGlmKGkgJiAoMTw8aikpIHtcbiAgICAgICAgZmFjZXMucHVzaChqKzEpXG4gICAgICB9XG4gICAgfVxuICAgIGZvcih2YXIgaz0wOyBrPCgxPDxmYWNlcy5sZW5ndGgpOyArK2spIHtcbiAgICAgIHZhciBzZmFjZXMgPSBmYWNlcy5zbGljZSgpXG4gICAgICBmb3IodmFyIGo9MDsgajxmYWNlcy5sZW5ndGg7ICsraikge1xuICAgICAgICBpZihrICYgKDE8PGopKSB7XG4gICAgICAgICAgc2ZhY2VzW2pdID0gLXNmYWNlc1tqXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBoYW5kbGVCb3VuZGFyeShzZmFjZXMpXG4gICAgfVxuICB9XG5cbiAgY29kZS5wdXNoKCdyZXR1cm4gZHN0O307cmV0dXJuIGdyYWRpZW50JylcblxuICAvL0NvbXBpbGUgYW5kIGxpbmsgcm91dGluZSwgc2F2ZSBjYWNoZWQgcHJvY2VkdXJlXG4gIHZhciBsaW5rTmFtZXMgPSBbICdkaWZmJywgJ3plcm8nIF1cbiAgdmFyIGxpbmtBcmdzICA9IFsgY2VudHJhbERpZmYsIHplcm9PdXQgXVxuICBmb3IodmFyIGk9MTsgaTw9ZDsgKytpKSB7XG4gICAgbGlua05hbWVzLnB1c2goJ2dyYWQnICsgaSlcbiAgICBsaW5rQXJncy5wdXNoKGdlbmVyYXRlVGVtcGxhdGUoaSkpXG4gIH1cbiAgbGlua05hbWVzLnB1c2goY29kZS5qb2luKCcnKSlcblxuICB2YXIgbGluayA9IEZ1bmN0aW9uLmFwcGx5KHZvaWQgMCwgbGlua05hbWVzKVxuICB2YXIgcHJvYyA9IGxpbmsuYXBwbHkodm9pZCAwLCBsaW5rQXJncylcbiAgVEVNUExBVEVfQ0FDSEVbdG9rZW5dID0gcHJvY1xuICByZXR1cm4gcHJvY1xufVxuXG5mdW5jdGlvbiBncmFkaWVudChvdXQsIGlucCwgYmMpIHtcbiAgaWYoQXJyYXkuaXNBcnJheShiYykpIHtcbiAgICBpZihiYy5sZW5ndGggIT09IGlucC5kaW1lbnNpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmRhcnJheS1ncmFkaWVudDogaW52YWxpZCBib3VuZGFyeSBjb25kaXRpb25zJylcbiAgICB9XG4gIH0gZWxzZSBpZih0eXBlb2YgYmMgPT09ICdzdHJpbmcnKSB7XG4gICAgYmMgPSBkdXAoaW5wLmRpbWVuc2lvbiwgYmMpXG4gIH0gZWxzZSB7XG4gICAgYmMgPSBkdXAoaW5wLmRpbWVuc2lvbiwgJ2NsYW1wJylcbiAgfVxuICBpZihvdXQuZGltZW5zaW9uICE9PSBpbnAuZGltZW5zaW9uICsgMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignbmRhcnJheS1ncmFkaWVudDogb3V0cHV0IGRpbWVuc2lvbiBtdXN0IGJlICsxIGlucHV0IGRpbWVuc2lvbicpXG4gIH1cbiAgaWYob3V0LnNoYXBlW2lucC5kaW1lbnNpb25dICE9PSBpbnAuZGltZW5zaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCduZGFycmF5LWdyYWRpZW50OiBvdXRwdXQgc2hhcGUgbXVzdCBtYXRjaCBpbnB1dCBzaGFwZScpXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8aW5wLmRpbWVuc2lvbjsgKytpKSB7XG4gICAgaWYob3V0LnNoYXBlW2ldICE9PSBpbnAuc2hhcGVbaV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmRhcnJheS1ncmFkaWVudDogc2hhcGUgbWlzbWF0Y2gnKVxuICAgIH1cbiAgfVxuICBpZihpbnAuc2l6ZSA9PT0gMCkge1xuICAgIHJldHVybiBvdXRcbiAgfVxuICBpZihpbnAuZGltZW5zaW9uIDw9IDApIHtcbiAgICBvdXQuc2V0KDApXG4gICAgcmV0dXJuIG91dFxuICB9XG4gIHZhciBjYWNoZWQgPSBnZW5lcmF0ZUdyYWRpZW50KGJjKVxuICByZXR1cm4gY2FjaGVkKG91dCwgaW5wKVxufSIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIGludGVycDFkKGFyciwgeCkge1xuICB2YXIgaXggPSBNYXRoLmZsb29yKHgpXG4gICAgLCBmeCA9IHggLSBpeFxuICAgICwgczAgPSAwIDw9IGl4ICAgJiYgaXggICA8IGFyci5zaGFwZVswXVxuICAgICwgczEgPSAwIDw9IGl4KzEgJiYgaXgrMSA8IGFyci5zaGFwZVswXVxuICAgICwgdzAgPSBzMCA/ICthcnIuZ2V0KGl4KSAgIDogMC4wXG4gICAgLCB3MSA9IHMxID8gK2Fyci5nZXQoaXgrMSkgOiAwLjBcbiAgcmV0dXJuICgxLjAtZngpKncwICsgZngqdzFcbn1cblxuZnVuY3Rpb24gaW50ZXJwMmQoYXJyLCB4LCB5KSB7XG4gIHZhciBpeCA9IE1hdGguZmxvb3IoeClcbiAgICAsIGZ4ID0geCAtIGl4XG4gICAgLCBzMCA9IDAgPD0gaXggICAmJiBpeCAgIDwgYXJyLnNoYXBlWzBdXG4gICAgLCBzMSA9IDAgPD0gaXgrMSAmJiBpeCsxIDwgYXJyLnNoYXBlWzBdXG4gICAgLCBpeSA9IE1hdGguZmxvb3IoeSlcbiAgICAsIGZ5ID0geSAtIGl5XG4gICAgLCB0MCA9IDAgPD0gaXkgICAmJiBpeSAgIDwgYXJyLnNoYXBlWzFdXG4gICAgLCB0MSA9IDAgPD0gaXkrMSAmJiBpeSsxIDwgYXJyLnNoYXBlWzFdXG4gICAgLCB3MDAgPSBzMCYmdDAgPyBhcnIuZ2V0KGl4ICAsaXkgICkgOiAwLjBcbiAgICAsIHcwMSA9IHMwJiZ0MSA/IGFyci5nZXQoaXggICxpeSsxKSA6IDAuMFxuICAgICwgdzEwID0gczEmJnQwID8gYXJyLmdldChpeCsxLGl5ICApIDogMC4wXG4gICAgLCB3MTEgPSBzMSYmdDEgPyBhcnIuZ2V0KGl4KzEsaXkrMSkgOiAwLjBcbiAgcmV0dXJuICgxLjAtZnkpICogKCgxLjAtZngpKncwMCArIGZ4KncxMCkgKyBmeSAqICgoMS4wLWZ4KSp3MDEgKyBmeCp3MTEpXG59XG5cbmZ1bmN0aW9uIGludGVycDNkKGFyciwgeCwgeSwgeikge1xuICB2YXIgaXggPSBNYXRoLmZsb29yKHgpXG4gICAgLCBmeCA9IHggLSBpeFxuICAgICwgczAgPSAwIDw9IGl4ICAgJiYgaXggICA8IGFyci5zaGFwZVswXVxuICAgICwgczEgPSAwIDw9IGl4KzEgJiYgaXgrMSA8IGFyci5zaGFwZVswXVxuICAgICwgaXkgPSBNYXRoLmZsb29yKHkpXG4gICAgLCBmeSA9IHkgLSBpeVxuICAgICwgdDAgPSAwIDw9IGl5ICAgJiYgaXkgICA8IGFyci5zaGFwZVsxXVxuICAgICwgdDEgPSAwIDw9IGl5KzEgJiYgaXkrMSA8IGFyci5zaGFwZVsxXVxuICAgICwgaXogPSBNYXRoLmZsb29yKHopXG4gICAgLCBmeiA9IHogLSBpelxuICAgICwgdTAgPSAwIDw9IGl6ICAgJiYgaXogICA8IGFyci5zaGFwZVsyXVxuICAgICwgdTEgPSAwIDw9IGl6KzEgJiYgaXorMSA8IGFyci5zaGFwZVsyXVxuICAgICwgdzAwMCA9IHMwJiZ0MCYmdTAgPyBhcnIuZ2V0KGl4LGl5LGl6KSAgICAgICA6IDAuMFxuICAgICwgdzAxMCA9IHMwJiZ0MSYmdTAgPyBhcnIuZ2V0KGl4LGl5KzEsaXopICAgICA6IDAuMFxuICAgICwgdzEwMCA9IHMxJiZ0MCYmdTAgPyBhcnIuZ2V0KGl4KzEsaXksaXopICAgICA6IDAuMFxuICAgICwgdzExMCA9IHMxJiZ0MSYmdTAgPyBhcnIuZ2V0KGl4KzEsaXkrMSxpeikgICA6IDAuMFxuICAgICwgdzAwMSA9IHMwJiZ0MCYmdTEgPyBhcnIuZ2V0KGl4LGl5LGl6KzEpICAgICA6IDAuMFxuICAgICwgdzAxMSA9IHMwJiZ0MSYmdTEgPyBhcnIuZ2V0KGl4LGl5KzEsaXorMSkgICA6IDAuMFxuICAgICwgdzEwMSA9IHMxJiZ0MCYmdTEgPyBhcnIuZ2V0KGl4KzEsaXksaXorMSkgICA6IDAuMFxuICAgICwgdzExMSA9IHMxJiZ0MSYmdTEgPyBhcnIuZ2V0KGl4KzEsaXkrMSxpeisxKSA6IDAuMFxuICByZXR1cm4gKDEuMC1meikgKiAoKDEuMC1meSkgKiAoKDEuMC1meCkqdzAwMCArIGZ4KncxMDApICsgZnkgKiAoKDEuMC1meCkqdzAxMCArIGZ4KncxMTApKSArIGZ6ICogKCgxLjAtZnkpICogKCgxLjAtZngpKncwMDEgKyBmeCp3MTAxKSArIGZ5ICogKCgxLjAtZngpKncwMTEgKyBmeCp3MTExKSlcbn1cblxuZnVuY3Rpb24gaW50ZXJwTmQoYXJyKSB7XG4gIHZhciBkID0gYXJyLnNoYXBlLmxlbmd0aHwwXG4gICAgLCBpeCA9IG5ldyBBcnJheShkKVxuICAgICwgZnggPSBuZXcgQXJyYXkoZClcbiAgICAsIHMwID0gbmV3IEFycmF5KGQpXG4gICAgLCBzMSA9IG5ldyBBcnJheShkKVxuICAgICwgaSwgdFxuICBmb3IoaT0wOyBpPGQ7ICsraSkge1xuICAgIHQgPSArYXJndW1lbnRzW2krMV1cbiAgICBpeFtpXSA9IE1hdGguZmxvb3IodClcbiAgICBmeFtpXSA9IHQgLSBpeFtpXVxuICAgIHMwW2ldID0gKDAgPD0gaXhbaV0gICAmJiBpeFtpXSAgIDwgYXJyLnNoYXBlW2ldKVxuICAgIHMxW2ldID0gKDAgPD0gaXhbaV0rMSAmJiBpeFtpXSsxIDwgYXJyLnNoYXBlW2ldKVxuICB9XG4gIHZhciByID0gMC4wLCBqLCB3LCBpZHhcbmlfbG9vcDpcbiAgZm9yKGk9MDsgaTwoMTw8ZCk7ICsraSkge1xuICAgIHcgPSAxLjBcbiAgICBpZHggPSBhcnIub2Zmc2V0XG4gICAgZm9yKGo9MDsgajxkOyArK2opIHtcbiAgICAgIGlmKGkgJiAoMTw8aikpIHtcbiAgICAgICAgaWYoIXMxW2pdKSB7XG4gICAgICAgICAgY29udGludWUgaV9sb29wXG4gICAgICAgIH1cbiAgICAgICAgdyAqPSBmeFtqXVxuICAgICAgICBpZHggKz0gYXJyLnN0cmlkZVtqXSAqIChpeFtqXSArIDEpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighczBbal0pIHtcbiAgICAgICAgICBjb250aW51ZSBpX2xvb3BcbiAgICAgICAgfVxuICAgICAgICB3ICo9IDEuMCAtIGZ4W2pdXG4gICAgICAgIGlkeCArPSBhcnIuc3RyaWRlW2pdICogaXhbal1cbiAgICAgIH1cbiAgICB9XG4gICAgciArPSB3ICogYXJyLmRhdGFbaWR4XVxuICB9XG4gIHJldHVybiByXG59XG5cbmZ1bmN0aW9uIGludGVycG9sYXRlKGFyciwgeCwgeSwgeikge1xuICBzd2l0Y2goYXJyLnNoYXBlLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiAwLjBcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gaW50ZXJwMWQoYXJyLCB4KVxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBpbnRlcnAyZChhcnIsIHgsIHkpXG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGludGVycDNkKGFyciwgeCwgeSwgeilcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGludGVycE5kLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKVxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGludGVycG9sYXRlXG5tb2R1bGUuZXhwb3J0cy5kMSA9IGludGVycDFkXG5tb2R1bGUuZXhwb3J0cy5kMiA9IGludGVycDJkXG5tb2R1bGUuZXhwb3J0cy5kMyA9IGludGVycDNkXG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgbmRhcnJheSA9IHJlcXVpcmUoXCJuZGFycmF5XCIpXG52YXIgZG9fY29udmVydCA9IHJlcXVpcmUoXCIuL2RvQ29udmVydC5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbnZlcnQoYXJyLCByZXN1bHQpIHtcbiAgdmFyIHNoYXBlID0gW10sIGMgPSBhcnIsIHN6ID0gMVxuICB3aGlsZShBcnJheS5pc0FycmF5KGMpKSB7XG4gICAgc2hhcGUucHVzaChjLmxlbmd0aClcbiAgICBzeiAqPSBjLmxlbmd0aFxuICAgIGMgPSBjWzBdXG4gIH1cbiAgaWYoc2hhcGUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5kYXJyYXkoKVxuICB9XG4gIGlmKCFyZXN1bHQpIHtcbiAgICByZXN1bHQgPSBuZGFycmF5KG5ldyBGbG9hdDY0QXJyYXkoc3opLCBzaGFwZSlcbiAgfVxuICBkb19jb252ZXJ0KHJlc3VsdCwgYXJyKVxuICByZXR1cm4gcmVzdWx0XG59XG4iLCJtb2R1bGUuZXhwb3J0cz1yZXF1aXJlKCdjd2lzZS1jb21waWxlcicpKHtcImFyZ3NcIjpbXCJhcnJheVwiLFwic2NhbGFyXCIsXCJpbmRleFwiXSxcInByZVwiOntcImJvZHlcIjpcInt9XCIsXCJhcmdzXCI6W10sXCJ0aGlzVmFyc1wiOltdLFwibG9jYWxWYXJzXCI6W119LFwiYm9keVwiOntcImJvZHlcIjpcIntcXG52YXIgX2lubGluZV8xX3Y9X2lubGluZV8xX2FyZzFfLF9pbmxpbmVfMV9pXFxuZm9yKF9pbmxpbmVfMV9pPTA7X2lubGluZV8xX2k8X2lubGluZV8xX2FyZzJfLmxlbmd0aC0xOysrX2lubGluZV8xX2kpIHtcXG5faW5saW5lXzFfdj1faW5saW5lXzFfdltfaW5saW5lXzFfYXJnMl9bX2lubGluZV8xX2ldXVxcbn1cXG5faW5saW5lXzFfYXJnMF89X2lubGluZV8xX3ZbX2lubGluZV8xX2FyZzJfW19pbmxpbmVfMV9hcmcyXy5sZW5ndGgtMV1dXFxufVwiLFwiYXJnc1wiOlt7XCJuYW1lXCI6XCJfaW5saW5lXzFfYXJnMF9cIixcImx2YWx1ZVwiOnRydWUsXCJydmFsdWVcIjpmYWxzZSxcImNvdW50XCI6MX0se1wibmFtZVwiOlwiX2lubGluZV8xX2FyZzFfXCIsXCJsdmFsdWVcIjpmYWxzZSxcInJ2YWx1ZVwiOnRydWUsXCJjb3VudFwiOjF9LHtcIm5hbWVcIjpcIl9pbmxpbmVfMV9hcmcyX1wiLFwibHZhbHVlXCI6ZmFsc2UsXCJydmFsdWVcIjp0cnVlLFwiY291bnRcIjo0fV0sXCJ0aGlzVmFyc1wiOltdLFwibG9jYWxWYXJzXCI6W1wiX2lubGluZV8xX2lcIixcIl9pbmxpbmVfMV92XCJdfSxcInBvc3RcIjp7XCJib2R5XCI6XCJ7fVwiLFwiYXJnc1wiOltdLFwidGhpc1ZhcnNcIjpbXSxcImxvY2FsVmFyc1wiOltdfSxcImZ1bmNOYW1lXCI6XCJjb252ZXJ0XCIsXCJibG9ja1NpemVcIjo2NH0pXG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9zdXJmYWNlJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNvbG9yc2NhbGVDYWxjID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2NhbGMnKTtcblxuXG4vLyBDb21wdXRlIGF1dG8teiBhbmQgYXV0b2NvbG9yc2NhbGUgaWYgYXBwbGljYWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIGlmKHRyYWNlLnN1cmZhY2Vjb2xvcikge1xuICAgICAgICBjb2xvcnNjYWxlQ2FsYyhnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgIHZhbHM6IHRyYWNlLnN1cmZhY2Vjb2xvcixcbiAgICAgICAgICAgIGNvbnRhaW5lclN0cjogJycsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29sb3JzY2FsZUNhbGMoZ2QsIHRyYWNlLCB7XG4gICAgICAgICAgICB2YWxzOiB0cmFjZS56LFxuICAgICAgICAgICAgY29udGFpbmVyU3RyOiAnJyxcbiAgICAgICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVTdXJmYWNlID0gcmVxdWlyZSgnZ2wtc3VyZmFjZTNkJyk7XG5cbnZhciBuZGFycmF5ID0gcmVxdWlyZSgnbmRhcnJheScpO1xudmFyIG5kYXJyYXlJbnRlcnAyZCA9IHJlcXVpcmUoJ25kYXJyYXktbGluZWFyLWludGVycG9sYXRlJykuZDI7XG5cbnZhciBpbnRlcnAyZCA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvaW50ZXJwMmQnKTtcbnZhciBmaW5kRW1wdGllcyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvZmluZF9lbXB0aWVzJyk7XG5cbnZhciBpc0FycmF5T3JUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuaXNBcnJheU9yVHlwZWRBcnJheTtcbnZhciBwYXJzZUNvbG9yU2NhbGUgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2xfZm9ybWF0X2NvbG9yJykucGFyc2VDb2xvclNjYWxlO1xudmFyIHN0cjJSZ2JhQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWIvc3RyMnJnYmFycmF5Jyk7XG52YXIgZXh0cmFjdE9wdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKS5leHRyYWN0T3B0cztcblxuZnVuY3Rpb24gU3VyZmFjZVRyYWNlKHNjZW5lLCBzdXJmYWNlLCB1aWQpIHtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy51aWQgPSB1aWQ7XG4gICAgdGhpcy5zdXJmYWNlID0gc3VyZmFjZTtcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xuICAgIHRoaXMuc2hvd0NvbnRvdXIgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZV07XG4gICAgdGhpcy5jb250b3VyU3RhcnQgPSBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgdGhpcy5jb250b3VyRW5kID0gW251bGwsIG51bGwsIG51bGxdO1xuICAgIHRoaXMuY29udG91clNpemUgPSBbMCwgMCwgMF07XG4gICAgdGhpcy5taW5WYWx1ZXMgPSBbSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eV07XG4gICAgdGhpcy5tYXhWYWx1ZXMgPSBbLUluZmluaXR5LCAtSW5maW5pdHksIC1JbmZpbml0eV07XG4gICAgdGhpcy5kYXRhU2NhbGVYID0gMS4wO1xuICAgIHRoaXMuZGF0YVNjYWxlWSA9IDEuMDtcbiAgICB0aGlzLnJlZmluZURhdGEgPSB0cnVlO1xuICAgIHRoaXMub2JqZWN0T2Zmc2V0ID0gWzAsIDAsIDBdO1xufVxuXG52YXIgcHJvdG8gPSBTdXJmYWNlVHJhY2UucHJvdG90eXBlO1xuXG5wcm90by5nZXRYYXQgPSBmdW5jdGlvbihhLCBiLCBjYWxlbmRhciwgYXhpcykge1xuICAgIHZhciB2ID0gKFxuICAgICAgICghaXNBcnJheU9yVHlwZWRBcnJheSh0aGlzLmRhdGEueCkpID9cbiAgICAgICAgICAgIGEgOlxuICAgICAgIChpc0FycmF5T3JUeXBlZEFycmF5KHRoaXMuZGF0YS54WzBdKSkgP1xuICAgICAgICAgICAgdGhpcy5kYXRhLnhbYl1bYV0gOlxuICAgICAgICAgICAgdGhpcy5kYXRhLnhbYV1cbiAgICApO1xuXG4gICAgcmV0dXJuIChjYWxlbmRhciA9PT0gdW5kZWZpbmVkKSA/IHYgOiBheGlzLmQybCh2LCAwLCBjYWxlbmRhcik7XG59O1xuXG5wcm90by5nZXRZYXQgPSBmdW5jdGlvbihhLCBiLCBjYWxlbmRhciwgYXhpcykge1xuICAgIHZhciB2ID0gKFxuICAgICAgICghaXNBcnJheU9yVHlwZWRBcnJheSh0aGlzLmRhdGEueSkpID9cbiAgICAgICAgICAgIGIgOlxuICAgICAgIChpc0FycmF5T3JUeXBlZEFycmF5KHRoaXMuZGF0YS55WzBdKSkgP1xuICAgICAgICAgICAgdGhpcy5kYXRhLnlbYl1bYV0gOlxuICAgICAgICAgICAgdGhpcy5kYXRhLnlbYl1cbiAgICApO1xuXG4gICAgcmV0dXJuIChjYWxlbmRhciA9PT0gdW5kZWZpbmVkKSA/IHYgOiBheGlzLmQybCh2LCAwLCBjYWxlbmRhcik7XG59O1xuXG5wcm90by5nZXRaYXQgPSBmdW5jdGlvbihhLCBiLCBjYWxlbmRhciwgYXhpcykge1xuICAgIHZhciB2ID0gdGhpcy5kYXRhLnpbYl1bYV07XG5cbiAgICBpZih2ID09PSBudWxsICYmIHRoaXMuZGF0YS5jb25uZWN0Z2FwcyAmJiB0aGlzLmRhdGEuX2ludGVycG9sYXRlZFopIHtcbiAgICAgICAgdiA9IHRoaXMuZGF0YS5faW50ZXJwb2xhdGVkWltiXVthXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGNhbGVuZGFyID09PSB1bmRlZmluZWQpID8gdiA6IGF4aXMuZDJsKHYsIDAsIGNhbGVuZGFyKTtcbn07XG5cbnByb3RvLmhhbmRsZVBpY2sgPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcbiAgICBpZihzZWxlY3Rpb24ub2JqZWN0ID09PSB0aGlzLnN1cmZhY2UpIHtcbiAgICAgICAgdmFyIHhSYXRpbyA9IChzZWxlY3Rpb24uZGF0YS5pbmRleFswXSAtIDEpIC8gdGhpcy5kYXRhU2NhbGVYIC0gMTtcbiAgICAgICAgdmFyIHlSYXRpbyA9IChzZWxlY3Rpb24uZGF0YS5pbmRleFsxXSAtIDEpIC8gdGhpcy5kYXRhU2NhbGVZIC0gMTtcblxuICAgICAgICB2YXIgaiA9IE1hdGgubWF4KE1hdGgubWluKE1hdGgucm91bmQoeFJhdGlvKSwgdGhpcy5kYXRhLnpbMF0ubGVuZ3RoIC0gMSksIDApO1xuICAgICAgICB2YXIgayA9IE1hdGgubWF4KE1hdGgubWluKE1hdGgucm91bmQoeVJhdGlvKSwgdGhpcy5kYXRhLl95bGVuZ3RoIC0gMSksIDApO1xuXG4gICAgICAgIHNlbGVjdGlvbi5pbmRleCA9IFtqLCBrXTtcblxuICAgICAgICBzZWxlY3Rpb24udHJhY2VDb29yZGluYXRlID0gW1xuICAgICAgICAgICAgdGhpcy5nZXRYYXQoaiwgayksXG4gICAgICAgICAgICB0aGlzLmdldFlhdChqLCBrKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0WmF0KGosIGspXG4gICAgICAgIF07XG5cbiAgICAgICAgc2VsZWN0aW9uLmRhdGFDb29yZGluYXRlID0gW1xuICAgICAgICAgICAgdGhpcy5nZXRYYXQoaiwgaywgdGhpcy5kYXRhLnhjYWxlbmRhciwgdGhpcy5zY2VuZS5mdWxsU2NlbmVMYXlvdXQueGF4aXMpLFxuICAgICAgICAgICAgdGhpcy5nZXRZYXQoaiwgaywgdGhpcy5kYXRhLnljYWxlbmRhciwgdGhpcy5zY2VuZS5mdWxsU2NlbmVMYXlvdXQueWF4aXMpLFxuICAgICAgICAgICAgdGhpcy5nZXRaYXQoaiwgaywgdGhpcy5kYXRhLnpjYWxlbmRhciwgdGhpcy5zY2VuZS5mdWxsU2NlbmVMYXlvdXQuemF4aXMpXG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgdmFyIHYgPSBzZWxlY3Rpb24uZGF0YUNvb3JkaW5hdGVbaV07XG4gICAgICAgICAgICBpZih2ICE9PSBudWxsICYmIHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5kYXRhQ29vcmRpbmF0ZVtpXSAqPSB0aGlzLnNjZW5lLmRhdGFTY2FsZVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5kYXRhLmhvdmVydGV4dCB8fCB0aGlzLmRhdGEudGV4dDtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0ZXh0KSAmJiB0ZXh0W2tdICYmIHRleHRba11bal0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uLnRleHRMYWJlbCA9IHRleHRba11bal07XG4gICAgICAgIH0gZWxzZSBpZih0ZXh0KSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24udGV4dExhYmVsID0gdGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi50ZXh0TGFiZWwgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGVjdGlvbi5kYXRhLmRhdGFDb29yZGluYXRlID0gc2VsZWN0aW9uLmRhdGFDb29yZGluYXRlLnNsaWNlKCk7XG5cbiAgICAgICAgdGhpcy5zdXJmYWNlLmhpZ2hsaWdodChzZWxlY3Rpb24uZGF0YSk7XG5cbiAgICAgICAgLy8gU25hcCBzcGlrZXMgdG8gZGF0YSBjb29yZGluYXRlXG4gICAgICAgIHRoaXMuc2NlbmUuZ2xwbG90LnNwaWtlcy5wb3NpdGlvbiA9IHNlbGVjdGlvbi5kYXRhQ29vcmRpbmF0ZTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBpc0NvbG9ybWFwQ2lyY3VsYXIoY29sb3JtYXApIHtcbiAgICB2YXIgZmlyc3QgPSBjb2xvcm1hcFswXS5yZ2I7XG4gICAgdmFyIGxhc3QgPSBjb2xvcm1hcFtjb2xvcm1hcC5sZW5ndGggLSAxXS5yZ2I7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBmaXJzdFswXSA9PT0gbGFzdFswXSAmJlxuICAgICAgICBmaXJzdFsxXSA9PT0gbGFzdFsxXSAmJlxuICAgICAgICBmaXJzdFsyXSA9PT0gbGFzdFsyXSAmJlxuICAgICAgICBmaXJzdFszXSA9PT0gbGFzdFszXVxuICAgICk7XG59XG5cbnZhciBzaG9ydFByaW1lcyA9IFtcbiAgICAyLCAzLCA1LCA3LCAxMSwgMTMsIDE3LCAxOSwgMjMsIDI5LCAzMSwgMzcsIDQxLCA0MywgNDcsIDUzLCA1OSwgNjEsIDY3LCA3MSwgNzMsIDc5LCA4MywgODksIDk3LFxuICAgIDEwMSwgMTAzLCAxMDcsIDEwOSwgMTEzLCAxMjcsIDEzMSwgMTM3LCAxMzksIDE0OSwgMTUxLCAxNTcsIDE2MywgMTY3LCAxNzMsIDE3OSwgMTgxLCAxOTEsIDE5MywgMTk3LCAxOTksXG4gICAgMjExLCAyMjMsIDIyNywgMjI5LCAyMzMsIDIzOSwgMjQxLCAyNTEsIDI1NywgMjYzLCAyNjksIDI3MSwgMjc3LCAyODEsIDI4MywgMjkzLFxuICAgIDMwNywgMzExLCAzMTMsIDMxNywgMzMxLCAzMzcsIDM0NywgMzQ5LCAzNTMsIDM1OSwgMzY3LCAzNzMsIDM3OSwgMzgzLCAzODksIDM5NyxcbiAgICA0MDEsIDQwOSwgNDE5LCA0MjEsIDQzMSwgNDMzLCA0MzksIDQ0MywgNDQ5LCA0NTcsIDQ2MSwgNDYzLCA0NjcsIDQ3OSwgNDg3LCA0OTEsIDQ5OSxcbiAgICA1MDMsIDUwOSwgNTIxLCA1MjMsIDU0MSwgNTQ3LCA1NTcsIDU2MywgNTY5LCA1NzEsIDU3NywgNTg3LCA1OTMsIDU5OSxcbiAgICA2MDEsIDYwNywgNjEzLCA2MTcsIDYxOSwgNjMxLCA2NDEsIDY0MywgNjQ3LCA2NTMsIDY1OSwgNjYxLCA2NzMsIDY3NywgNjgzLCA2OTEsXG4gICAgNzAxLCA3MDksIDcxOSwgNzI3LCA3MzMsIDczOSwgNzQzLCA3NTEsIDc1NywgNzYxLCA3NjksIDc3MywgNzg3LCA3OTcsXG4gICAgODA5LCA4MTEsIDgyMSwgODIzLCA4MjcsIDgyOSwgODM5LCA4NTMsIDg1NywgODU5LCA4NjMsIDg3NywgODgxLCA4ODMsIDg4NyxcbiAgICA5MDcsIDkxMSwgOTE5LCA5MjksIDkzNywgOTQxLCA5NDcsIDk1MywgOTY3LCA5NzEsIDk3NywgOTgzLCA5OTEsIDk5NyxcbiAgICAxMDA5LCAxMDEzLCAxMDE5LCAxMDIxLCAxMDMxLCAxMDMzLCAxMDM5LCAxMDQ5LCAxMDUxLCAxMDYxLCAxMDYzLCAxMDY5LCAxMDg3LCAxMDkxLCAxMDkzLCAxMDk3LFxuICAgIDExMDMsIDExMDksIDExMTcsIDExMjMsIDExMjksIDExNTEsIDExNTMsIDExNjMsIDExNzEsIDExODEsIDExODcsIDExOTMsXG4gICAgMTIwMSwgMTIxMywgMTIxNywgMTIyMywgMTIyOSwgMTIzMSwgMTIzNywgMTI0OSwgMTI1OSwgMTI3NywgMTI3OSwgMTI4MywgMTI4OSwgMTI5MSwgMTI5NyxcbiAgICAxMzAxLCAxMzAzLCAxMzA3LCAxMzE5LCAxMzIxLCAxMzI3LCAxMzYxLCAxMzY3LCAxMzczLCAxMzgxLCAxMzk5LFxuICAgIDE0MDksIDE0MjMsIDE0MjcsIDE0MjksIDE0MzMsIDE0MzksIDE0NDcsIDE0NTEsIDE0NTMsIDE0NTksIDE0NzEsIDE0ODEsIDE0ODMsIDE0ODcsIDE0ODksIDE0OTMsIDE0OTksXG4gICAgMTUxMSwgMTUyMywgMTUzMSwgMTU0MywgMTU0OSwgMTU1MywgMTU1OSwgMTU2NywgMTU3MSwgMTU3OSwgMTU4MywgMTU5NyxcbiAgICAxNjAxLCAxNjA3LCAxNjA5LCAxNjEzLCAxNjE5LCAxNjIxLCAxNjI3LCAxNjM3LCAxNjU3LCAxNjYzLCAxNjY3LCAxNjY5LCAxNjkzLCAxNjk3LCAxNjk5LFxuICAgIDE3MDksIDE3MjEsIDE3MjMsIDE3MzMsIDE3NDEsIDE3NDcsIDE3NTMsIDE3NTksIDE3NzcsIDE3ODMsIDE3ODcsIDE3ODksXG4gICAgMTgwMSwgMTgxMSwgMTgyMywgMTgzMSwgMTg0NywgMTg2MSwgMTg2NywgMTg3MSwgMTg3MywgMTg3NywgMTg3OSwgMTg4OSxcbiAgICAxOTAxLCAxOTA3LCAxOTEzLCAxOTMxLCAxOTMzLCAxOTQ5LCAxOTUxLCAxOTczLCAxOTc5LCAxOTg3LCAxOTkzLCAxOTk3LCAxOTk5LFxuICAgIDIwMDMsIDIwMTEsIDIwMTcsIDIwMjcsIDIwMjksIDIwMzksIDIwNTMsIDIwNjMsIDIwNjksIDIwODEsIDIwODMsIDIwODcsIDIwODksIDIwOTksXG4gICAgMjExMSwgMjExMywgMjEyOSwgMjEzMSwgMjEzNywgMjE0MSwgMjE0MywgMjE1MywgMjE2MSwgMjE3OSxcbiAgICAyMjAzLCAyMjA3LCAyMjEzLCAyMjIxLCAyMjM3LCAyMjM5LCAyMjQzLCAyMjUxLCAyMjY3LCAyMjY5LCAyMjczLCAyMjgxLCAyMjg3LCAyMjkzLCAyMjk3LFxuICAgIDIzMDksIDIzMTEsIDIzMzMsIDIzMzksIDIzNDEsIDIzNDcsIDIzNTEsIDIzNTcsIDIzNzEsIDIzNzcsIDIzODEsIDIzODMsIDIzODksIDIzOTMsIDIzOTksXG4gICAgMjQxMSwgMjQxNywgMjQyMywgMjQzNywgMjQ0MSwgMjQ0NywgMjQ1OSwgMjQ2NywgMjQ3MywgMjQ3NyxcbiAgICAyNTAzLCAyNTIxLCAyNTMxLCAyNTM5LCAyNTQzLCAyNTQ5LCAyNTUxLCAyNTU3LCAyNTc5LCAyNTkxLCAyNTkzLFxuICAgIDI2MDksIDI2MTcsIDI2MjEsIDI2MzMsIDI2NDcsIDI2NTcsIDI2NTksIDI2NjMsIDI2NzEsIDI2NzcsIDI2ODMsIDI2ODcsIDI2ODksIDI2OTMsIDI2OTksXG4gICAgMjcwNywgMjcxMSwgMjcxMywgMjcxOSwgMjcyOSwgMjczMSwgMjc0MSwgMjc0OSwgMjc1MywgMjc2NywgMjc3NywgMjc4OSwgMjc5MSwgMjc5NyxcbiAgICAyODAxLCAyODAzLCAyODE5LCAyODMzLCAyODM3LCAyODQzLCAyODUxLCAyODU3LCAyODYxLCAyODc5LCAyODg3LCAyODk3LFxuICAgIDI5MDMsIDI5MDksIDI5MTcsIDI5MjcsIDI5MzksIDI5NTMsIDI5NTcsIDI5NjMsIDI5NjksIDI5NzEsIDI5OTlcbl07XG5cbmZ1bmN0aW9uIGdldFBvdyhhLCBiKSB7XG4gICAgaWYoYSA8IGIpIHJldHVybiAwO1xuICAgIHZhciBuID0gMDtcbiAgICB3aGlsZShNYXRoLmZsb29yKGEgJSBiKSA9PT0gMCkge1xuICAgICAgICBhIC89IGI7XG4gICAgICAgIG4rKztcbiAgICB9XG4gICAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGdldEZhY3RvcnMoYSkge1xuICAgIHZhciBwb3dlcnMgPSBbXTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2hvcnRQcmltZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGIgPSBzaG9ydFByaW1lc1tpXTtcbiAgICAgICAgcG93ZXJzLnB1c2goXG4gICAgICAgICAgICBnZXRQb3coYSwgYilcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHBvd2Vycztcbn1cblxuZnVuY3Rpb24gc21hbGxlc3REaXZpc29yKGEpIHtcbiAgICB2YXIgQSA9IGdldEZhY3RvcnMoYSk7XG4gICAgdmFyIHJlc3VsdCA9IGE7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHNob3J0UHJpbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKEFbaV0gPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBzaG9ydFByaW1lc1tpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGxlYXN0Q29tbW9uTXVsdGlwbGUoYSwgYikge1xuICAgIGlmKGEgPCAxIHx8IGIgPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHZhciBBID0gZ2V0RmFjdG9ycyhhKTtcbiAgICB2YXIgQiA9IGdldEZhY3RvcnMoYik7XG4gICAgdmFyIG4gPSAxO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzaG9ydFByaW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBuICo9IE1hdGgucG93KFxuICAgICAgICAgICAgc2hvcnRQcmltZXNbaV0sIE1hdGgubWF4KEFbaV0sIEJbaV0pXG4gICAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBuO1xufVxuXG5mdW5jdGlvbiBhcnJheUxDTShBKSB7XG4gICAgaWYoQS5sZW5ndGggPT09IDApIHJldHVybiB1bmRlZmluZWQ7XG4gICAgdmFyIG4gPSAxO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBBLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG4gPSBsZWFzdENvbW1vbk11bHRpcGxlKG4sIEFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gbjtcbn1cblxucHJvdG8uY2FsY1hudW1zID0gZnVuY3Rpb24oeGxlbikge1xuICAgIHZhciBpO1xuICAgIHZhciBudW1zID0gW107XG4gICAgZm9yKGkgPSAxOyBpIDwgeGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBhID0gdGhpcy5nZXRYYXQoaSAtIDEsIDApO1xuICAgICAgICB2YXIgYiA9IHRoaXMuZ2V0WGF0KGksIDApO1xuXG4gICAgICAgIGlmKGIgIT09IGEgJiZcbiAgICAgICAgICAgIGEgIT09IHVuZGVmaW5lZCAmJiBhICE9PSBudWxsICYmXG4gICAgICAgICAgICBiICE9PSB1bmRlZmluZWQgJiYgYiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbnVtc1tpIC0gMV0gPSBNYXRoLmFicyhiIC0gYSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW1zW2kgLSAxXSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdG90YWxEaXN0ID0gMDtcbiAgICBmb3IoaSA9IDE7IGkgPCB4bGVuOyBpKyspIHtcbiAgICAgICAgdG90YWxEaXN0ICs9IG51bXNbaSAtIDFdO1xuICAgIH1cblxuICAgIGZvcihpID0gMTsgaSA8IHhsZW47IGkrKykge1xuICAgICAgICBpZihudW1zW2kgLSAxXSA9PT0gMCkge1xuICAgICAgICAgICAgbnVtc1tpIC0gMV0gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtc1tpIC0gMV0gPSBNYXRoLnJvdW5kKHRvdGFsRGlzdCAvIG51bXNbaSAtIDFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudW1zO1xufTtcblxucHJvdG8uY2FsY1ludW1zID0gZnVuY3Rpb24oeWxlbikge1xuICAgIHZhciBpO1xuICAgIHZhciBudW1zID0gW107XG4gICAgZm9yKGkgPSAxOyBpIDwgeWxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBhID0gdGhpcy5nZXRZYXQoMCwgaSAtIDEpO1xuICAgICAgICB2YXIgYiA9IHRoaXMuZ2V0WWF0KDAsIGkpO1xuXG4gICAgICAgIGlmKGIgIT09IGEgJiZcbiAgICAgICAgICAgIGEgIT09IHVuZGVmaW5lZCAmJiBhICE9PSBudWxsICYmXG4gICAgICAgICAgICBiICE9PSB1bmRlZmluZWQgJiYgYiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbnVtc1tpIC0gMV0gPSBNYXRoLmFicyhiIC0gYSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW1zW2kgLSAxXSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdG90YWxEaXN0ID0gMDtcbiAgICBmb3IoaSA9IDE7IGkgPCB5bGVuOyBpKyspIHtcbiAgICAgICAgdG90YWxEaXN0ICs9IG51bXNbaSAtIDFdO1xuICAgIH1cblxuICAgIGZvcihpID0gMTsgaSA8IHlsZW47IGkrKykge1xuICAgICAgICBpZihudW1zW2kgLSAxXSA9PT0gMCkge1xuICAgICAgICAgICAgbnVtc1tpIC0gMV0gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtc1tpIC0gMV0gPSBNYXRoLnJvdW5kKHRvdGFsRGlzdCAvIG51bXNbaSAtIDFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudW1zO1xufTtcblxudmFyIGhpZ2hseUNvbXBvc2l0ZXMgPSBbMSwgMiwgNCwgNiwgMTIsIDI0LCAzNiwgNDgsIDYwLCAxMjAsIDE4MCwgMjQwLCAzNjAsIDcyMCwgODQwLCAxMjYwXTtcblxudmFyIE1JTl9SRVNPTFVUSU9OID0gaGlnaGx5Q29tcG9zaXRlc1s5XTtcbnZhciBNQVhfUkVTT0xVVElPTiA9IGhpZ2hseUNvbXBvc2l0ZXNbMTNdO1xuXG5wcm90by5lc3RpbWF0ZVNjYWxlID0gZnVuY3Rpb24ocmVzU3JjLCBheGlzKSB7XG4gICAgdmFyIG51bXMgPSAoYXhpcyA9PT0gMCkgP1xuICAgICAgICB0aGlzLmNhbGNYbnVtcyhyZXNTcmMpIDpcbiAgICAgICAgdGhpcy5jYWxjWW51bXMocmVzU3JjKTtcblxuICAgIHZhciByZXNEc3QgPSAxICsgYXJyYXlMQ00obnVtcyk7XG5cbiAgICB3aGlsZShyZXNEc3QgPCBNSU5fUkVTT0xVVElPTikge1xuICAgICAgICByZXNEc3QgKj0gMjtcbiAgICB9XG5cbiAgICB3aGlsZShyZXNEc3QgPiBNQVhfUkVTT0xVVElPTikge1xuICAgICAgICByZXNEc3QtLTtcbiAgICAgICAgcmVzRHN0IC89IHNtYWxsZXN0RGl2aXNvcihyZXNEc3QpO1xuICAgICAgICByZXNEc3QrKztcblxuICAgICAgICBpZihyZXNEc3QgPCBNSU5fUkVTT0xVVElPTikge1xuICAgICAgICAgLy8gcmVzRHN0ID0gTUlOX1JFU09MVVRJT047IC8vIG9wdGlvbiAxOiB1c2UgbWluIHJlc29sdXRpb25cbiAgICAgICAgICAgIHJlc0RzdCA9IE1BWF9SRVNPTFVUSU9OOyAvLyBvcHRpb24gMjogdXNlIG1heCByZXNvbHV0aW9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2NhbGUgPSBNYXRoLnJvdW5kKHJlc0RzdCAvIHJlc1NyYyk7XG4gICAgcmV0dXJuIChzY2FsZSA+IDEpID8gc2NhbGUgOiAxO1xufTtcblxuLy8gYmFzZWQgb24gTWlrb2xhIEx5c2Vua28ncyBuZGFycmF5LWhvbW9ncmFwaHlcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2NpanMvbmRhcnJheS1ob21vZ3JhcGh5XG5cbmZ1bmN0aW9uIGZuSG9tb2dyYXBoeShvdXQsIGlucCwgWCkge1xuICAgIHZhciB3ID0gWFs4XSArIFhbMl0gKiBpbnBbMF0gKyBYWzVdICogaW5wWzFdO1xuICAgIG91dFswXSA9IChYWzZdICsgWFswXSAqIGlucFswXSArIFhbM10gKiBpbnBbMV0pIC8gdztcbiAgICBvdXRbMV0gPSAoWFs3XSArIFhbMV0gKiBpbnBbMF0gKyBYWzRdICogaW5wWzFdKSAvIHc7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gaG9tb2dyYXBoeShkZXN0LCBzcmMsIFgpIHtcbiAgICB3YXJwKGRlc3QsIHNyYywgZm5Ib21vZ3JhcGh5LCBYKTtcbiAgICByZXR1cm4gZGVzdDtcbn1cblxuLy8gYmFzZWQgb24gTWlrb2xhIEx5c2Vua28ncyBuZGFycmF5LXdhcnBcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2NpanMvbmRhcnJheS13YXJwXG5cbmZ1bmN0aW9uIHdhcnAoZGVzdCwgc3JjLCBmdW5jLCBYKSB7XG4gICAgdmFyIHdhcnBlZCA9IFswLCAwXTtcbiAgICB2YXIgbmkgPSBkZXN0LnNoYXBlWzBdO1xuICAgIHZhciBuaiA9IGRlc3Quc2hhcGVbMV07XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG5pOyBpKyspIHtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IG5qOyBqKyspIHtcbiAgICAgICAgICAgIGZ1bmMod2FycGVkLCBbaSwgal0sIFgpO1xuICAgICAgICAgICAgZGVzdC5zZXQoaSwgaiwgbmRhcnJheUludGVycDJkKHNyYywgd2FycGVkWzBdLCB3YXJwZWRbMV0pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVzdDtcbn1cblxucHJvdG8ucmVmaW5lQ29vcmRzID0gZnVuY3Rpb24oY29vcmRzKSB7XG4gICAgdmFyIHNjYWxlVyA9IHRoaXMuZGF0YVNjYWxlWDtcbiAgICB2YXIgc2NhbGVIID0gdGhpcy5kYXRhU2NhbGVZO1xuXG4gICAgdmFyIHdpZHRoID0gY29vcmRzWzBdLnNoYXBlWzBdO1xuICAgIHZhciBoZWlnaHQgPSBjb29yZHNbMF0uc2hhcGVbMV07XG5cbiAgICB2YXIgbmV3V2lkdGggPSBNYXRoLmZsb29yKGNvb3Jkc1swXS5zaGFwZVswXSAqIHNjYWxlVyArIDEpIHwgMDtcbiAgICB2YXIgbmV3SGVpZ2h0ID0gTWF0aC5mbG9vcihjb29yZHNbMF0uc2hhcGVbMV0gKiBzY2FsZUggKyAxKSB8IDA7XG5cbiAgICAvLyBQYWQgY29vcmRzIGJ5ICsxXG4gICAgdmFyIHBhZFdpZHRoID0gMSArIHdpZHRoICsgMTtcbiAgICB2YXIgcGFkSGVpZ2h0ID0gMSArIGhlaWdodCArIDE7XG4gICAgdmFyIHBhZEltZyA9IG5kYXJyYXkobmV3IEZsb2F0MzJBcnJheShwYWRXaWR0aCAqIHBhZEhlaWdodCksIFtwYWRXaWR0aCwgcGFkSGVpZ2h0XSk7XG4gICAgdmFyIFggPSBbXG4gICAgICAgIDEgLyBzY2FsZVcsIDAsIDAsXG4gICAgICAgIDAsIDEgLyBzY2FsZUgsIDAsXG4gICAgICAgIDAsIDAsIDFcbiAgICBdO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB0aGlzLnN1cmZhY2UucGFkRmllbGQocGFkSW1nLCBjb29yZHNbaV0pO1xuXG4gICAgICAgIHZhciBzY2FsZWRJbWcgPSBuZGFycmF5KG5ldyBGbG9hdDMyQXJyYXkobmV3V2lkdGggKiBuZXdIZWlnaHQpLCBbbmV3V2lkdGgsIG5ld0hlaWdodF0pO1xuICAgICAgICBob21vZ3JhcGh5KHNjYWxlZEltZywgcGFkSW1nLCBYKTtcbiAgICAgICAgY29vcmRzW2ldID0gc2NhbGVkSW1nO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGluc2VydElmTmV3TGV2ZWwoYXJyLCBuZXdWYWx1ZSkge1xuICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgIGZvcih2YXIgayA9IDA7IGsgPCBhcnIubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgaWYobmV3VmFsdWUgPT09IGFycltrXSkge1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoZm91bmQgPT09IGZhbHNlKSBhcnIucHVzaChuZXdWYWx1ZSk7XG59XG5cbnByb3RvLnNldENvbnRvdXJMZXZlbHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3TGV2ZWxzID0gW1tdLCBbXSwgW11dO1xuICAgIHZhciB1c2VOZXdMZXZlbHMgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZV07XG4gICAgdmFyIG5lZWRzVXBkYXRlID0gZmFsc2U7XG5cbiAgICB2YXIgaSwgaiwgdmFsdWU7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgaWYodGhpcy5zaG93Q29udG91cltpXSkge1xuICAgICAgICAgICAgbmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRvdXJTaXplW2ldID4gMCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuY29udG91clN0YXJ0W2ldICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgdGhpcy5jb250b3VyRW5kW2ldICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgdGhpcy5jb250b3VyRW5kW2ldID4gdGhpcy5jb250b3VyU3RhcnRbaV1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHVzZU5ld0xldmVsc1tpXSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBmb3IoaiA9IHRoaXMuY29udG91clN0YXJ0W2ldOyBqIDwgdGhpcy5jb250b3VyRW5kW2ldOyBqICs9IHRoaXMuY29udG91clNpemVbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBqICogdGhpcy5zY2VuZS5kYXRhU2NhbGVbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0SWZOZXdMZXZlbChuZXdMZXZlbHNbaV0sIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihuZWVkc1VwZGF0ZSkge1xuICAgICAgICB2YXIgYWxsTGV2ZWxzID0gW1tdLCBbXSwgW11dO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvd0NvbnRvdXJbaV0pIHtcbiAgICAgICAgICAgICAgICBhbGxMZXZlbHNbaV0gPSB1c2VOZXdMZXZlbHNbaV0gPyBuZXdMZXZlbHNbaV0gOiB0aGlzLnNjZW5lLmNvbnRvdXJMZXZlbHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdXJmYWNlLnVwZGF0ZSh7IGxldmVsczogYWxsTGV2ZWxzIH0pO1xuICAgIH1cbn07XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgc2NlbmUgPSB0aGlzLnNjZW5lO1xuICAgIHZhciBzY2VuZUxheW91dCA9IHNjZW5lLmZ1bGxTY2VuZUxheW91dDtcbiAgICB2YXIgc3VyZmFjZSA9IHRoaXMuc3VyZmFjZTtcbiAgICB2YXIgYWxwaGEgPSBkYXRhLm9wYWNpdHk7XG4gICAgdmFyIGNvbG9ybWFwID0gcGFyc2VDb2xvclNjYWxlKGRhdGEsIGFscGhhKTtcbiAgICB2YXIgc2NhbGVGYWN0b3IgPSBzY2VuZS5kYXRhU2NhbGU7XG4gICAgdmFyIHhsZW4gPSBkYXRhLnpbMF0ubGVuZ3RoO1xuICAgIHZhciB5bGVuID0gZGF0YS5feWxlbmd0aDtcbiAgICB2YXIgY29udG91ckxldmVscyA9IHNjZW5lLmNvbnRvdXJMZXZlbHM7XG5cbiAgICAvLyBTYXZlIGRhdGFcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgLypcbiAgICAgKiBGaWxsIGFuZCB0cmFuc3Bvc2UgemRhdGEuXG4gICAgICogQ29uc2lzdGVudCB3aXRoICdoZWF0bWFwJyBhbmQgJ2NvbnRvdXInLCBwbG90bHkgJ3N1cmZhY2UnXG4gICAgICogJ3onIGFyZSBzdWNoIHRoYXQgc3ViLWFycmF5cyBjb3JyZXNwb25kIHRvIHktY29vcmRzXG4gICAgICogYW5kIHRoYXQgdGhlIHN1Yi1hcnJheSBlbnRyaWVzIGNvcnJlc3BvbmQgdG8gYSB4LWNvb3JkcyxcbiAgICAgKiB3aGljaCBpcyB0aGUgdHJhbnNwb3NlIG9mICdnbC1zdXJmYWNlLXBsb3QnLlxuICAgICAqL1xuXG4gICAgdmFyIGksIGosIGssIHY7XG4gICAgdmFyIHJhd0Nvb3JkcyA9IFtdO1xuICAgIGZvcihpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICByYXdDb29yZHNbaV0gPSBbXTtcbiAgICAgICAgZm9yKGogPSAwOyBqIDwgeGxlbjsgaisrKSB7XG4gICAgICAgICAgICByYXdDb29yZHNbaV1bal0gPSBbXTtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBmb3IoayA9IDA7IGsgPCB5bGVuOyBrKyspIHtcbiAgICAgICAgICAgICAgICByYXdDb29yZHNbaV1bal1ba10gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAqL1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29vcmRzIHgsIHkgJiB6XG4gICAgZm9yKGogPSAwOyBqIDwgeGxlbjsgaisrKSB7XG4gICAgICAgIGZvcihrID0gMDsgayA8IHlsZW47IGsrKykge1xuICAgICAgICAgICAgcmF3Q29vcmRzWzBdW2pdW2tdID0gdGhpcy5nZXRYYXQoaiwgaywgZGF0YS54Y2FsZW5kYXIsIHNjZW5lTGF5b3V0LnhheGlzKTtcbiAgICAgICAgICAgIHJhd0Nvb3Jkc1sxXVtqXVtrXSA9IHRoaXMuZ2V0WWF0KGosIGssIGRhdGEueWNhbGVuZGFyLCBzY2VuZUxheW91dC55YXhpcyk7XG4gICAgICAgICAgICByYXdDb29yZHNbMl1bal1ba10gPSB0aGlzLmdldFphdChqLCBrLCBkYXRhLnpjYWxlbmRhciwgc2NlbmVMYXlvdXQuemF4aXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoZGF0YS5jb25uZWN0Z2Fwcykge1xuICAgICAgICBkYXRhLl9lbXB0eXBvaW50cyA9IGZpbmRFbXB0aWVzKHJhd0Nvb3Jkc1syXSk7XG4gICAgICAgIGludGVycDJkKHJhd0Nvb3Jkc1syXSwgZGF0YS5fZW1wdHlwb2ludHMpO1xuXG4gICAgICAgIGRhdGEuX2ludGVycG9sYXRlZFogPSBbXTtcbiAgICAgICAgZm9yKGogPSAwOyBqIDwgeGxlbjsgaisrKSB7XG4gICAgICAgICAgICBkYXRhLl9pbnRlcnBvbGF0ZWRaW2pdID0gW107XG4gICAgICAgICAgICBmb3IoayA9IDA7IGsgPCB5bGVuOyBrKyspIHtcbiAgICAgICAgICAgICAgICBkYXRhLl9pbnRlcnBvbGF0ZWRaW2pdW2tdID0gcmF3Q29vcmRzWzJdW2pdW2tdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTm90ZTogbG9nIGF4ZXMgYXJlIG5vdCBkZWZpbmVkIGluIHN1cmZhY2VzIHlldC5cbiAgICAvLyBidXQgdGhleSBjb3VsZCBiZSBkZWZpbmVkIGhlcmUuLi5cblxuICAgIGZvcihpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBmb3IoaiA9IDA7IGogPCB4bGVuOyBqKyspIHtcbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IHlsZW47IGsrKykge1xuICAgICAgICAgICAgICAgIHYgPSByYXdDb29yZHNbaV1bal1ba107XG4gICAgICAgICAgICAgICAgaWYodiA9PT0gbnVsbCB8fCB2ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmF3Q29vcmRzW2ldW2pdW2tdID0gTmFOO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHYgPSByYXdDb29yZHNbaV1bal1ba10gKj0gc2NhbGVGYWN0b3JbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IHhsZW47IGorKykge1xuICAgICAgICAgICAgZm9yKGsgPSAwOyBrIDwgeWxlbjsgaysrKSB7XG4gICAgICAgICAgICAgICAgdiA9IHJhd0Nvb3Jkc1tpXVtqXVtrXTtcbiAgICAgICAgICAgICAgICBpZih2ICE9PSBudWxsICYmIHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm1pblZhbHVlc1tpXSA+IHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWluVmFsdWVzW2ldID0gdjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm1heFZhbHVlc1tpXSA8IHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF4VmFsdWVzW2ldID0gdjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcihpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICB0aGlzLm9iamVjdE9mZnNldFtpXSA9IDAuNSAqICh0aGlzLm1pblZhbHVlc1tpXSArIHRoaXMubWF4VmFsdWVzW2ldKTtcbiAgICB9XG5cbiAgICBmb3IoaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yKGogPSAwOyBqIDwgeGxlbjsgaisrKSB7XG4gICAgICAgICAgICBmb3IoayA9IDA7IGsgPCB5bGVuOyBrKyspIHtcbiAgICAgICAgICAgICAgICB2ID0gcmF3Q29vcmRzW2ldW2pdW2tdO1xuICAgICAgICAgICAgICAgIGlmKHYgIT09IG51bGwgJiYgdiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhd0Nvb3Jkc1tpXVtqXVtrXSAtPSB0aGlzLm9iamVjdE9mZnNldFtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IHByb2Nlc3NlZCByYXcgZGF0YSB0byBGbG9hdDMyIG1hdHJpY2VzXG4gICAgdmFyIGNvb3JkcyA9IFtcbiAgICAgICAgbmRhcnJheShuZXcgRmxvYXQzMkFycmF5KHhsZW4gKiB5bGVuKSwgW3hsZW4sIHlsZW5dKSxcbiAgICAgICAgbmRhcnJheShuZXcgRmxvYXQzMkFycmF5KHhsZW4gKiB5bGVuKSwgW3hsZW4sIHlsZW5dKSxcbiAgICAgICAgbmRhcnJheShuZXcgRmxvYXQzMkFycmF5KHhsZW4gKiB5bGVuKSwgW3hsZW4sIHlsZW5dKVxuICAgIF07XG4gICAgZm9yKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IHhsZW47IGorKykge1xuICAgICAgICAgICAgZm9yKGsgPSAwOyBrIDwgeWxlbjsgaysrKSB7XG4gICAgICAgICAgICAgICAgY29vcmRzW2ldLnNldChqLCBrLCByYXdDb29yZHNbaV1bal1ba10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJhd0Nvb3JkcyA9IFtdOyAvLyBmcmVlIG1lbW9yeVxuXG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgY29sb3JtYXA6IGNvbG9ybWFwLFxuICAgICAgICBsZXZlbHM6IFtbXSwgW10sIFtdXSxcbiAgICAgICAgc2hvd0NvbnRvdXI6IFt0cnVlLCB0cnVlLCB0cnVlXSxcbiAgICAgICAgc2hvd1N1cmZhY2U6ICFkYXRhLmhpZGVzdXJmYWNlLFxuICAgICAgICBjb250b3VyUHJvamVjdDogW1xuICAgICAgICAgICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgICAgICAgICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2VdLFxuICAgICAgICAgICAgW2ZhbHNlLCBmYWxzZSwgZmFsc2VdXG4gICAgICAgIF0sXG4gICAgICAgIGNvbnRvdXJXaWR0aDogWzEsIDEsIDFdLFxuICAgICAgICBjb250b3VyQ29sb3I6IFtbMSwgMSwgMSwgMV0sIFsxLCAxLCAxLCAxXSwgWzEsIDEsIDEsIDFdXSxcbiAgICAgICAgY29udG91clRpbnQ6IFsxLCAxLCAxXSxcbiAgICAgICAgZHluYW1pY0NvbG9yOiBbWzEsIDEsIDEsIDFdLCBbMSwgMSwgMSwgMV0sIFsxLCAxLCAxLCAxXV0sXG4gICAgICAgIGR5bmFtaWNXaWR0aDogWzEsIDEsIDFdLFxuICAgICAgICBkeW5hbWljVGludDogWzEsIDEsIDFdLFxuICAgICAgICBvcGFjaXR5c2NhbGU6IGRhdGEub3BhY2l0eXNjYWxlLFxuICAgICAgICBvcGFjaXR5OiBkYXRhLm9wYWNpdHlcbiAgICB9O1xuXG4gICAgdmFyIGNPcHRzID0gZXh0cmFjdE9wdHMoZGF0YSk7XG4gICAgcGFyYW1zLmludGVuc2l0eUJvdW5kcyA9IFtjT3B0cy5taW4sIGNPcHRzLm1heF07XG5cbiAgICAvLyBSZWZpbmUgc3VyZmFjZSBjb2xvciBpZiBuZWNlc3NhcnlcbiAgICBpZihkYXRhLnN1cmZhY2Vjb2xvcikge1xuICAgICAgICB2YXIgaW50ZW5zaXR5ID0gbmRhcnJheShuZXcgRmxvYXQzMkFycmF5KHhsZW4gKiB5bGVuKSwgW3hsZW4sIHlsZW5dKTtcblxuICAgICAgICBmb3IoaiA9IDA7IGogPCB4bGVuOyBqKyspIHtcbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IHlsZW47IGsrKykge1xuICAgICAgICAgICAgICAgIGludGVuc2l0eS5zZXQoaiwgaywgZGF0YS5zdXJmYWNlY29sb3Jba11bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29vcmRzLnB1c2goaW50ZW5zaXR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB3aGVuICd6JyBpcyB1c2VkIGFzICdpbnRlbnNpdHknLFxuICAgICAgICAvLyB3ZSBtdXN0IHNjYWxlIGl0cyB2YWx1ZVxuICAgICAgICBwYXJhbXMuaW50ZW5zaXR5Qm91bmRzWzBdICo9IHNjYWxlRmFjdG9yWzJdO1xuICAgICAgICBwYXJhbXMuaW50ZW5zaXR5Qm91bmRzWzFdICo9IHNjYWxlRmFjdG9yWzJdO1xuICAgIH1cblxuICAgIGlmKE1BWF9SRVNPTFVUSU9OIDwgY29vcmRzWzBdLnNoYXBlWzBdIHx8XG4gICAgICAgIE1BWF9SRVNPTFVUSU9OIDwgY29vcmRzWzBdLnNoYXBlWzFdKSB7XG4gICAgICAgIHRoaXMucmVmaW5lRGF0YSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmKHRoaXMucmVmaW5lRGF0YSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRhdGFTY2FsZVggPSB0aGlzLmVzdGltYXRlU2NhbGUoY29vcmRzWzBdLnNoYXBlWzBdLCAwKTtcbiAgICAgICAgdGhpcy5kYXRhU2NhbGVZID0gdGhpcy5lc3RpbWF0ZVNjYWxlKGNvb3Jkc1swXS5zaGFwZVsxXSwgMSk7XG4gICAgICAgIGlmKHRoaXMuZGF0YVNjYWxlWCAhPT0gMSB8fCB0aGlzLmRhdGFTY2FsZVkgIT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVmaW5lQ29vcmRzKGNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihkYXRhLnN1cmZhY2Vjb2xvcikge1xuICAgICAgICBwYXJhbXMuaW50ZW5zaXR5ID0gY29vcmRzLnBvcCgpO1xuICAgIH1cblxuICAgIHZhciBoaWdobGlnaHRFbmFibGUgPSBbdHJ1ZSwgdHJ1ZSwgdHJ1ZV07XG4gICAgdmFyIGF4aXMgPSBbJ3gnLCAneScsICd6J107XG5cbiAgICBmb3IoaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgdmFyIGNvbnRvdXJQYXJhbXMgPSBkYXRhLmNvbnRvdXJzW2F4aXNbaV1dO1xuICAgICAgICBoaWdobGlnaHRFbmFibGVbaV0gPSBjb250b3VyUGFyYW1zLmhpZ2hsaWdodDtcblxuICAgICAgICBwYXJhbXMuc2hvd0NvbnRvdXJbaV0gPSBjb250b3VyUGFyYW1zLnNob3cgfHwgY29udG91clBhcmFtcy5oaWdobGlnaHQ7XG4gICAgICAgIGlmKCFwYXJhbXMuc2hvd0NvbnRvdXJbaV0pIGNvbnRpbnVlO1xuXG4gICAgICAgIHBhcmFtcy5jb250b3VyUHJvamVjdFtpXSA9IFtcbiAgICAgICAgICAgIGNvbnRvdXJQYXJhbXMucHJvamVjdC54LFxuICAgICAgICAgICAgY29udG91clBhcmFtcy5wcm9qZWN0LnksXG4gICAgICAgICAgICBjb250b3VyUGFyYW1zLnByb2plY3QuelxuICAgICAgICBdO1xuXG4gICAgICAgIGlmKGNvbnRvdXJQYXJhbXMuc2hvdykge1xuICAgICAgICAgICAgdGhpcy5zaG93Q29udG91cltpXSA9IHRydWU7XG4gICAgICAgICAgICBwYXJhbXMubGV2ZWxzW2ldID0gY29udG91ckxldmVsc1tpXTtcbiAgICAgICAgICAgIHN1cmZhY2UuaGlnaGxpZ2h0Q29sb3JbaV0gPSBwYXJhbXMuY29udG91ckNvbG9yW2ldID0gc3RyMlJnYmFBcnJheShjb250b3VyUGFyYW1zLmNvbG9yKTtcblxuICAgICAgICAgICAgaWYoY29udG91clBhcmFtcy51c2Vjb2xvcm1hcCkge1xuICAgICAgICAgICAgICAgIHN1cmZhY2UuaGlnaGxpZ2h0VGludFtpXSA9IHBhcmFtcy5jb250b3VyVGludFtpXSA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1cmZhY2UuaGlnaGxpZ2h0VGludFtpXSA9IHBhcmFtcy5jb250b3VyVGludFtpXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJhbXMuY29udG91cldpZHRoW2ldID0gY29udG91clBhcmFtcy53aWR0aDtcblxuICAgICAgICAgICAgdGhpcy5jb250b3VyU3RhcnRbaV0gPSBjb250b3VyUGFyYW1zLnN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5jb250b3VyRW5kW2ldID0gY29udG91clBhcmFtcy5lbmQ7XG4gICAgICAgICAgICB0aGlzLmNvbnRvdXJTaXplW2ldID0gY29udG91clBhcmFtcy5zaXplO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93Q29udG91cltpXSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRvdXJTdGFydFtpXSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmNvbnRvdXJFbmRbaV0gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jb250b3VyU2l6ZVtpXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjb250b3VyUGFyYW1zLmhpZ2hsaWdodCkge1xuICAgICAgICAgICAgcGFyYW1zLmR5bmFtaWNDb2xvcltpXSA9IHN0cjJSZ2JhQXJyYXkoY29udG91clBhcmFtcy5oaWdobGlnaHRjb2xvcik7XG4gICAgICAgICAgICBwYXJhbXMuZHluYW1pY1dpZHRoW2ldID0gY29udG91clBhcmFtcy5oaWdobGlnaHR3aWR0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGxvdGx5L3Bsb3RseS5qcy9pc3N1ZXMvOTQwXG4gICAgaWYoaXNDb2xvcm1hcENpcmN1bGFyKGNvbG9ybWFwKSkge1xuICAgICAgICBwYXJhbXMudmVydGV4Q29sb3IgPSB0cnVlO1xuICAgIH1cblxuICAgIHBhcmFtcy5vYmplY3RPZmZzZXQgPSB0aGlzLm9iamVjdE9mZnNldDtcblxuICAgIHBhcmFtcy5jb29yZHMgPSBjb29yZHM7XG4gICAgc3VyZmFjZS51cGRhdGUocGFyYW1zKTtcblxuICAgIHN1cmZhY2UudmlzaWJsZSA9IGRhdGEudmlzaWJsZTtcbiAgICBzdXJmYWNlLmVuYWJsZUR5bmFtaWMgPSBoaWdobGlnaHRFbmFibGU7XG4gICAgc3VyZmFjZS5lbmFibGVIaWdobGlnaHQgPSBoaWdobGlnaHRFbmFibGU7XG5cbiAgICBzdXJmYWNlLnNuYXBUb0RhdGEgPSB0cnVlO1xuXG4gICAgaWYoJ2xpZ2h0aW5nJyBpbiBkYXRhKSB7XG4gICAgICAgIHN1cmZhY2UuYW1iaWVudExpZ2h0ID0gZGF0YS5saWdodGluZy5hbWJpZW50O1xuICAgICAgICBzdXJmYWNlLmRpZmZ1c2VMaWdodCA9IGRhdGEubGlnaHRpbmcuZGlmZnVzZTtcbiAgICAgICAgc3VyZmFjZS5zcGVjdWxhckxpZ2h0ID0gZGF0YS5saWdodGluZy5zcGVjdWxhcjtcbiAgICAgICAgc3VyZmFjZS5yb3VnaG5lc3MgPSBkYXRhLmxpZ2h0aW5nLnJvdWdobmVzcztcbiAgICAgICAgc3VyZmFjZS5mcmVzbmVsID0gZGF0YS5saWdodGluZy5mcmVzbmVsO1xuICAgIH1cblxuICAgIGlmKCdsaWdodHBvc2l0aW9uJyBpbiBkYXRhKSB7XG4gICAgICAgIHN1cmZhY2UubGlnaHRQb3NpdGlvbiA9IFtkYXRhLmxpZ2h0cG9zaXRpb24ueCwgZGF0YS5saWdodHBvc2l0aW9uLnksIGRhdGEubGlnaHRwb3NpdGlvbi56XTtcbiAgICB9XG5cbiAgICBpZihhbHBoYSAmJiBhbHBoYSA8IDEpIHtcbiAgICAgICAgc3VyZmFjZS5zdXBwb3J0c1RyYW5zcGFyZW5jeSA9IHRydWU7XG4gICAgfVxufTtcblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2NlbmUuZ2xwbG90LnJlbW92ZSh0aGlzLnN1cmZhY2UpO1xuICAgIHRoaXMuc3VyZmFjZS5kaXNwb3NlKCk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTdXJmYWNlVHJhY2Uoc2NlbmUsIGRhdGEpIHtcbiAgICB2YXIgZ2wgPSBzY2VuZS5nbHBsb3QuZ2w7XG4gICAgdmFyIHN1cmZhY2UgPSBjcmVhdGVTdXJmYWNlKHsgZ2w6IGdsIH0pO1xuICAgIHZhciByZXN1bHQgPSBuZXcgU3VyZmFjZVRyYWNlKHNjZW5lLCBzdXJmYWNlLCBkYXRhLnVpZCk7XG4gICAgc3VyZmFjZS5fdHJhY2UgPSByZXN1bHQ7XG4gICAgcmVzdWx0LnVwZGF0ZShkYXRhKTtcbiAgICBzY2VuZS5nbHBsb3QuYWRkKHN1cmZhY2UpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU3VyZmFjZVRyYWNlO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgY29sb3JzY2FsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG52YXIgTUlOID0gMC4xOyAvLyBOb3RlOiBvZnRlbiB3ZSBkb24ndCB3YW50IHRoZSBkYXRhIGN1YmUgdG8gYmUgZGlzYXBwZWFyZWRcblxuZnVuY3Rpb24gY3JlYXRlV2F2ZShuLCBtaW5PcGFjaXR5KSB7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIHZhciBzdGVwcyA9IDMyOyAvLyBNYXg6IDI1NlxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdGVwczsgaSsrKSB7XG4gICAgICAgIHZhciB1ID0gaSAvIChzdGVwcyAtIDEpO1xuICAgICAgICB2YXIgdiA9IG1pbk9wYWNpdHkgKyAoMSAtIG1pbk9wYWNpdHkpICogKDEgLSBNYXRoLnBvdyhNYXRoLnNpbihuICogdSAqIE1hdGguUEkpLCAyKSk7XG4gICAgICAgIGFyci5wdXNoKFtcbiAgICAgICAgICAgIHUsXG4gICAgICAgICAgICBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2KSlcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRTY2FsZUFycmF5KHNjbCkge1xuICAgIHZhciBoaWdoZXN0VmFsID0gMDtcblxuICAgIGlmKCFBcnJheS5pc0FycmF5KHNjbCkgfHwgc2NsLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcblxuICAgIGlmKCFzY2xbMF0gfHwgIXNjbFtzY2wubGVuZ3RoIC0gMV0pIHJldHVybiBmYWxzZTtcblxuICAgIGlmKCtzY2xbMF1bMF0gIT09IDAgfHwgK3NjbFtzY2wubGVuZ3RoIC0gMV1bMF0gIT09IDEpIHJldHVybiBmYWxzZTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzY2wubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNpID0gc2NsW2ldO1xuXG4gICAgICAgIGlmKHNpLmxlbmd0aCAhPT0gMiB8fCArc2lbMF0gPCBoaWdoZXN0VmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBoaWdoZXN0VmFsID0gK3NpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICB2YXIgaSwgajtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgneCcpO1xuICAgIHZhciB5ID0gY29lcmNlKCd5Jyk7XG5cbiAgICB2YXIgeiA9IGNvZXJjZSgneicpO1xuICAgIGlmKCF6IHx8ICF6Lmxlbmd0aCB8fFxuICAgICAgICh4ID8gKHgubGVuZ3RoIDwgMSkgOiBmYWxzZSkgfHxcbiAgICAgICAoeSA/ICh5Lmxlbmd0aCA8IDEpIDogZmFsc2UpXG4gICAgKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyYWNlT3V0Ll94bGVuZ3RoID0gKEFycmF5LmlzQXJyYXkoeCkgJiYgTGliLmlzQXJyYXlPclR5cGVkQXJyYXkoeFswXSkpID8gei5sZW5ndGggOiB6WzBdLmxlbmd0aDtcbiAgICB0cmFjZU91dC5feWxlbmd0aCA9IHoubGVuZ3RoO1xuXG4gICAgdmFyIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2NhbGVuZGFycycsICdoYW5kbGVUcmFjZURlZmF1bHRzJyk7XG4gICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgWyd4JywgJ3knLCAneiddLCBsYXlvdXQpO1xuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIC8vIENvZXJjZSByZW1haW5pbmcgcHJvcGVydGllc1xuICAgIFtcbiAgICAgICAgJ2xpZ2h0aW5nLmFtYmllbnQnLFxuICAgICAgICAnbGlnaHRpbmcuZGlmZnVzZScsXG4gICAgICAgICdsaWdodGluZy5zcGVjdWxhcicsXG4gICAgICAgICdsaWdodGluZy5yb3VnaG5lc3MnLFxuICAgICAgICAnbGlnaHRpbmcuZnJlc25lbCcsXG4gICAgICAgICdsaWdodHBvc2l0aW9uLngnLFxuICAgICAgICAnbGlnaHRwb3NpdGlvbi55JyxcbiAgICAgICAgJ2xpZ2h0cG9zaXRpb24ueicsXG4gICAgICAgICdoaWRlc3VyZmFjZScsXG4gICAgICAgICdjb25uZWN0Z2FwcycsXG4gICAgICAgICdvcGFjaXR5J1xuICAgIF0uZm9yRWFjaChmdW5jdGlvbih4KSB7IGNvZXJjZSh4KTsgfSk7XG5cbiAgICB2YXIgc3VyZmFjZUNvbG9yID0gY29lcmNlKCdzdXJmYWNlY29sb3InKTtcblxuICAgIHZhciBkaW1zID0gWyd4JywgJ3knLCAneiddO1xuICAgIGZvcihpID0gMDsgaSA8IDM7ICsraSkge1xuICAgICAgICB2YXIgY29udG91ckRpbSA9ICdjb250b3Vycy4nICsgZGltc1tpXTtcbiAgICAgICAgdmFyIHNob3cgPSBjb2VyY2UoY29udG91ckRpbSArICcuc2hvdycpO1xuICAgICAgICB2YXIgaGlnaGxpZ2h0ID0gY29lcmNlKGNvbnRvdXJEaW0gKyAnLmhpZ2hsaWdodCcpO1xuXG4gICAgICAgIGlmKHNob3cgfHwgaGlnaGxpZ2h0KSB7XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCAzOyArK2opIHtcbiAgICAgICAgICAgICAgICBjb2VyY2UoY29udG91ckRpbSArICcucHJvamVjdC4nICsgZGltc1tqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihzaG93KSB7XG4gICAgICAgICAgICBjb2VyY2UoY29udG91ckRpbSArICcuY29sb3InKTtcbiAgICAgICAgICAgIGNvZXJjZShjb250b3VyRGltICsgJy53aWR0aCcpO1xuICAgICAgICAgICAgY29lcmNlKGNvbnRvdXJEaW0gKyAnLnVzZWNvbG9ybWFwJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihoaWdobGlnaHQpIHtcbiAgICAgICAgICAgIGNvZXJjZShjb250b3VyRGltICsgJy5oaWdobGlnaHRjb2xvcicpO1xuICAgICAgICAgICAgY29lcmNlKGNvbnRvdXJEaW0gKyAnLmhpZ2hsaWdodHdpZHRoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb2VyY2UoY29udG91ckRpbSArICcuc3RhcnQnKTtcbiAgICAgICAgY29lcmNlKGNvbnRvdXJEaW0gKyAnLmVuZCcpO1xuICAgICAgICBjb2VyY2UoY29udG91ckRpbSArICcuc2l6ZScpO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYmxvY2tcbiAgICBpZighc3VyZmFjZUNvbG9yKSB7XG4gICAgICAgIG1hcExlZ2FjeSh0cmFjZUluLCAnem1pbicsICdjbWluJyk7XG4gICAgICAgIG1hcExlZ2FjeSh0cmFjZUluLCAnem1heCcsICdjbWF4Jyk7XG4gICAgICAgIG1hcExlZ2FjeSh0cmFjZUluLCAnemF1dG8nLCAnY2F1dG8nKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIGlmIGNvbnRvdXJzLj8udXNlY29sb3JtYXAgYXJlIGZhbHNlIGFuZCBoaWRlc3VyZmFjZSBpcyB0cnVlXG4gICAgLy8gdGhlIGNvbG9yYmFyIHNob3VsZG4ndCBiZSBzaG93biBieSBkZWZhdWx0XG5cbiAgICBjb2xvcnNjYWxlRGVmYXVsdHMoXG4gICAgICAgIHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge3ByZWZpeDogJycsIGNMZXR0ZXI6ICdjJ31cbiAgICApO1xuXG4gICAgb3BhY2l0eXNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcblxuICAgIC8vIGRpc2FibGUgMUQgdHJhbnNmb3JtcyAtIGN1cnJlbnRseSBzdXJmYWNlIGRvZXMgTk9UIHN1cHBvcnQgY29sdW1uIGRhdGEgbGlrZSBoZWF0bWFwIGRvZXNcbiAgICAvLyB5b3UgY2FuIHVzZSBtZXNoM2QgZm9yIHRoaXMgdXNlIGNhc2UsIGJ1dCBub3Qgc3VyZmFjZVxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xufVxuXG5mdW5jdGlvbiBvcGFjaXR5c2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpIHtcbiAgICB2YXIgb3BhY2l0eXNjYWxlID0gY29lcmNlKCdvcGFjaXR5c2NhbGUnKTtcbiAgICBpZihvcGFjaXR5c2NhbGUgPT09ICdtYXgnKSB7XG4gICAgICAgIHRyYWNlT3V0Lm9wYWNpdHlzY2FsZSA9IFtbMCwgTUlOXSwgWzEsIDFdXTtcbiAgICB9IGVsc2UgaWYob3BhY2l0eXNjYWxlID09PSAnbWluJykge1xuICAgICAgICB0cmFjZU91dC5vcGFjaXR5c2NhbGUgPSBbWzAsIDFdLCBbMSwgTUlOXV07XG4gICAgfSBlbHNlIGlmKG9wYWNpdHlzY2FsZSA9PT0gJ2V4dHJlbWVzJykge1xuICAgICAgICB0cmFjZU91dC5vcGFjaXR5c2NhbGUgPSBjcmVhdGVXYXZlKDEsIE1JTik7XG4gICAgfSBlbHNlIGlmKCFpc1ZhbGlkU2NhbGVBcnJheShvcGFjaXR5c2NhbGUpKSB7XG4gICAgICAgIHRyYWNlT3V0Lm9wYWNpdHlzY2FsZSA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1hcExlZ2FjeSh0cmFjZUluLCBvbGRBdHRyLCBuZXdBdHRyKSB7XG4gICAgaWYob2xkQXR0ciBpbiB0cmFjZUluICYmICEobmV3QXR0ciBpbiB0cmFjZUluKSkge1xuICAgICAgICB0cmFjZUluW25ld0F0dHJdID0gdHJhY2VJbltvbGRBdHRyXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN1cHBseURlZmF1bHRzOiBzdXBwbHlEZWZhdWx0cyxcbiAgICBvcGFjaXR5c2NhbGVEZWZhdWx0czogb3BhY2l0eXNjYWxlRGVmYXVsdHNcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJykuc3VwcGx5RGVmYXVsdHMsXG4gICAgY29sb3JiYXI6IHtcbiAgICAgICAgbWluOiAnY21pbicsXG4gICAgICAgIG1heDogJ2NtYXgnXG4gICAgfSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL2NvbnZlcnQnKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3N1cmZhY2UnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9nbDNkJyksXG4gICAgY2F0ZWdvcmllczogWydnbDNkJywgJzJkTWFwJywgJ3Nob3dMZWdlbmQnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIGRhdGEgdGhlIGRlc2NyaWJlcyB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHN1cmZhY2UgaXMgc2V0IGluIGB6YC4nLFxuICAgICAgICAgICAgJ0RhdGEgaW4gYHpgIHNob3VsZCBiZSBhIHsyRCBhcnJheX0uJyxcblxuICAgICAgICAgICAgJ0Nvb3JkaW5hdGVzIGluIGB4YCBhbmQgYHlgIGNhbiBlaXRoZXIgYmUgMUQge2FycmF5c30nLFxuICAgICAgICAgICAgJ29yIHsyRCBhcnJheXN9IChlLmcuIHRvIGdyYXBoIHBhcmFtZXRyaWMgc3VyZmFjZXMpLicsXG5cbiAgICAgICAgICAgICdJZiBub3QgcHJvdmlkZWQgaW4gYHhgIGFuZCBgeWAsIHRoZSB4IGFuZCB5IGNvb3JkaW5hdGVzIGFyZSBhc3N1bWVkJyxcbiAgICAgICAgICAgICd0byBiZSBsaW5lYXIgc3RhcnRpbmcgYXQgMCB3aXRoIGEgdW5pdCBzdGVwLicsXG5cbiAgICAgICAgICAgICdUaGUgY29sb3Igc2NhbGUgY29ycmVzcG9uZHMgdG8gdGhlIGB6YCB2YWx1ZXMgYnkgZGVmYXVsdC4nLFxuICAgICAgICAgICAgJ0ZvciBjdXN0b20gY29sb3Igc2NhbGVzLCB1c2UgYHN1cmZhY2Vjb2xvcmAgd2hpY2ggc2hvdWxkIGJlIGEgezJEIGFycmF5fSwnLFxuICAgICAgICAgICAgJ3doZXJlIGl0cyBib3VuZHMgY2FuIGJlIGNvbnRyb2xsZWQgdXNpbmcgYGNtaW5gIGFuZCBgY21heGAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9