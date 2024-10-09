(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_gl-mesh3d_mesh_js"],{

/***/ "./node_modules/affine-hull/aff.js":
/*!*****************************************!*\
  !*** ./node_modules/affine-hull/aff.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = affineHull

var orient = __webpack_require__(/*! robust-orientation */ "./node_modules/robust-orientation/orientation.js")

function linearlyIndependent(points, d) {
  var nhull = new Array(d+1)
  for(var i=0; i<points.length; ++i) {
    nhull[i] = points[i]
  }
  for(var i=0; i<=points.length; ++i) {
    for(var j=points.length; j<=d; ++j) {
      var x = new Array(d)
      for(var k=0; k<d; ++k) {
        x[k] = Math.pow(j+1-i, k)
      }
      nhull[j] = x
    }
    var o = orient.apply(void 0, nhull)
    if(o) {
      return true
    }
  }
  return false
}

function affineHull(points) {
  var n = points.length
  if(n === 0) {
    return []
  }
  if(n === 1) {
    return [0]
  }
  var d = points[0].length
  var frame = [ points[0] ]
  var index = [ 0 ]
  for(var i=1; i<n; ++i) {
    frame.push(points[i])
    if(!linearlyIndependent(frame, d)) {
      frame.pop()
      continue
    }
    index.push(i)
    if(index.length === d+1) {
      return index
    }
  }
  return index
}

/***/ }),

/***/ "./node_modules/barycentric/barycentric.js":
/*!*************************************************!*\
  !*** ./node_modules/barycentric/barycentric.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = barycentric

var solve = __webpack_require__(/*! robust-linear-solve */ "./node_modules/robust-linear-solve/linsolve.js")

function reduce(x) {
  var r = 0
  for(var i=0; i<x.length; ++i) {
    r += x[i]
  }
  return r
}

function barycentric(simplex, point) {
  var d = point.length
  var A = new Array(d+1)
  for(var i=0; i<d; ++i) {
    var row = new Array(d+1)
    for(var j=0; j<=d; ++j) {
      row[j] = simplex[j][i]
    }
    A[i] = row
  }
  A[d] = new Array(d+1)
  for(var i=0; i<=d; ++i) {
    A[d][i] = 1
  }

  var b = new Array(d+1)
  for(var i=0; i<d; ++i) {
    b[i] = point[i]
  }
  b[d] = 1.0

  var x = solve(A, b)
  var w = reduce(x[d+1])
  
  if(w === 0) {
    w = 1.0
  }
  var y = new Array(d+1)
  for(var i=0; i<=d; ++i) {
    y[i] = reduce(x[i]) / w
  }
  return y
}

/***/ }),

/***/ "./node_modules/convex-hull/ch.js":
/*!****************************************!*\
  !*** ./node_modules/convex-hull/ch.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var convexHull1d = __webpack_require__(/*! ./lib/ch1d */ "./node_modules/convex-hull/lib/ch1d.js")
var convexHull2d = __webpack_require__(/*! ./lib/ch2d */ "./node_modules/convex-hull/lib/ch2d.js")
var convexHullnd = __webpack_require__(/*! ./lib/chnd */ "./node_modules/convex-hull/lib/chnd.js")

module.exports = convexHull

function convexHull(points) {
  var n = points.length
  if(n === 0) {
    return []
  } else if(n === 1) {
    return [[0]]
  }
  var d = points[0].length
  if(d === 0) {
    return []
  } else if(d === 1) {
    return convexHull1d(points)
  } else if(d === 2) {
    return convexHull2d(points)
  }
  return convexHullnd(points, d)
}

/***/ }),

/***/ "./node_modules/convex-hull/lib/ch1d.js":
/*!**********************************************!*\
  !*** ./node_modules/convex-hull/lib/ch1d.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


module.exports = convexHull1d

function convexHull1d(points) {
  var lo = 0
  var hi = 0
  for(var i=1; i<points.length; ++i) {
    if(points[i][0] < points[lo][0]) {
      lo = i
    }
    if(points[i][0] > points[hi][0]) {
      hi = i
    }
  }
  if(lo < hi) {
    return [[lo], [hi]]
  } else if(lo > hi) {
    return [[hi], [lo]]
  } else {
    return [[lo]]
  }
}

/***/ }),

/***/ "./node_modules/convex-hull/lib/ch2d.js":
/*!**********************************************!*\
  !*** ./node_modules/convex-hull/lib/ch2d.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = convexHull2D

var monotoneHull = __webpack_require__(/*! monotone-convex-hull-2d */ "./node_modules/monotone-convex-hull-2d/index.js")

function convexHull2D(points) {
  var hull = monotoneHull(points)
  var h = hull.length
  if(h <= 2) {
    return []
  }
  var edges = new Array(h)
  var a = hull[h-1]
  for(var i=0; i<h; ++i) {
    var b = hull[i]
    edges[i] = [a,b]
    a = b
  }
  return edges
}


/***/ }),

/***/ "./node_modules/convex-hull/lib/chnd.js":
/*!**********************************************!*\
  !*** ./node_modules/convex-hull/lib/chnd.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = convexHullnD

var ich = __webpack_require__(/*! incremental-convex-hull */ "./node_modules/incremental-convex-hull/ich.js")
var aff = __webpack_require__(/*! affine-hull */ "./node_modules/affine-hull/aff.js")

function permute(points, front) {
  var n = points.length
  var npoints = new Array(n)
  for(var i=0; i<front.length; ++i) {
    npoints[i] = points[front[i]]
  }
  var ptr = front.length
  for(var i=0; i<n; ++i) {
    if(front.indexOf(i) < 0) {
      npoints[ptr++] = points[i]
    }
  }
  return npoints
}

function invPermute(cells, front) {
  var nc = cells.length
  var nf = front.length
  for(var i=0; i<nc; ++i) {
    var c = cells[i]
    for(var j=0; j<c.length; ++j) {
      var x = c[j]
      if(x < nf) {
        c[j] = front[x]
      } else {
        x = x - nf
        for(var k=0; k<nf; ++k) {
          if(x >= front[k]) {
            x += 1
          }
        }
        c[j] = x
      }
    }
  }
  return cells
}

function convexHullnD(points, d) {
  try {
    return ich(points, true)
  } catch(e) {
    //If point set is degenerate, try to find a basis and rerun it
    var ah = aff(points)
    if(ah.length <= d) {
      //No basis, no try
      return []
    }
    var npoints = permute(points, ah)
    var nhull   = ich(npoints, true)
    return invPermute(nhull, ah)
  }
}

/***/ }),

/***/ "./node_modules/gl-mesh3d/lib/closest-point.js":
/*!*****************************************************!*\
  !*** ./node_modules/gl-mesh3d/lib/closest-point.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var barycentric            = __webpack_require__(/*! barycentric */ "./node_modules/barycentric/barycentric.js")
var closestPointToTriangle = __webpack_require__(/*! polytope-closest-point/lib/closest_point_2d.js */ "./node_modules/polytope-closest-point/lib/closest_point_2d.js")

module.exports = closestPointToPickLocation

function xformMatrix(m, v) {
  var out = [0,0,0,0]
  for(var i=0; i<4; ++i) {
    for(var j=0; j<4; ++j) {
      out[j] += m[4*i + j] * v[i]
    }
  }
  return out
}

function projectVertex(v, model, view, projection, resolution) {
  var p = xformMatrix(projection,
            xformMatrix(view,
              xformMatrix(model, [v[0], v[1], v[2], 1])))
  for(var i=0; i<3; ++i) {
    p[i] /= p[3]
  }
  return [ 0.5 * resolution[0] * (1.0+p[0]), 0.5 * resolution[1] * (1.0-p[1]) ]
}

function barycentricCoord(simplex, point) {
  if(simplex.length === 2) {
    var d0 = 0.0
    var d1 = 0.0
    for(var i=0; i<2; ++i) {
      d0 += Math.pow(point[i] - simplex[0][i], 2)
      d1 += Math.pow(point[i] - simplex[1][i], 2)
    }
    d0 = Math.sqrt(d0)
    d1 = Math.sqrt(d1)
    if(d0+d1 < 1e-6) {
      return [1,0]
    }
    return [d1/(d0+d1),d0/(d1+d0)]
  } else if(simplex.length === 3) {
    var closestPoint = [0,0]
    closestPointToTriangle(simplex[0], simplex[1], simplex[2], point, closestPoint)
    return barycentric(simplex, closestPoint)
  }
  return []
}

function interpolate(simplex, weights) {
  var result = [0,0,0]
  for(var i=0; i<simplex.length; ++i) {
    var p = simplex[i]
    var w = weights[i]
    for(var j=0; j<3; ++j) {
      result[j] += w * p[j]
    }
  }
  return result
}

function closestPointToPickLocation(simplex, pixelCoord, model, view, projection, resolution) {
  if(simplex.length === 1) {
    return [0, simplex[0].slice()]
  }
  var simplex2D = new Array(simplex.length)
  for(var i=0; i<simplex.length; ++i) {
    simplex2D[i] = projectVertex(simplex[i], model, view, projection, resolution);
  }

  var closestIndex = 0
  var closestDist  = Infinity
  for(var i=0; i<simplex2D.length; ++i) {
    var d2 = 0.0
    for(var j=0; j<2; ++j) {
      d2 += Math.pow(simplex2D[i][j] - pixelCoord[j], 2)
    }
    if(d2 < closestDist) {
      closestDist  = d2
      closestIndex = i
    }
  }

  var weights = barycentricCoord(simplex2D, pixelCoord)
  var s = 0.0
  for(var i=0; i<3; ++i) {
    if(weights[i] < -0.001 ||
       weights[i] > 1.0001) {
      return null
    }
    s += weights[i]
  }
  if(Math.abs(s - 1.0) > 0.001) {
    return null
  }
  return [closestIndex, interpolate(simplex, weights), weights]
}

/***/ }),

/***/ "./node_modules/gl-mesh3d/lib/shaders.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-mesh3d/lib/shaders.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var glslify       = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")

var triVertSrc = glslify('./triangle-vertex.glsl')
var triFragSrc = glslify('./triangle-fragment.glsl')
var edgeVertSrc = glslify('./edge-vertex.glsl')
var edgeFragSrc = glslify('./edge-fragment.glsl')
var pointVertSrc = glslify('./point-vertex.glsl')
var pointFragSrc = glslify('./point-fragment.glsl')
var pickVertSrc = glslify('./pick-vertex.glsl')
var pickFragSrc = glslify('./pick-fragment.glsl')
var pickPointVertSrc = glslify('./pick-point-vertex.glsl')
var contourVertSrc = glslify('./contour-vertex.glsl')
var contourFragSrc = glslify('./contour-fragment.glsl')

exports.meshShader = {
  vertex:   triVertSrc,
  fragment: triFragSrc,
  attributes: [
    {name: 'position', type: 'vec3'},
    {name: 'normal', type: 'vec3'},
    {name: 'color', type: 'vec4'},
    {name: 'uv', type: 'vec2'}
  ]
}
exports.wireShader = {
  vertex:   edgeVertSrc,
  fragment: edgeFragSrc,
  attributes: [
    {name: 'position', type: 'vec3'},
    {name: 'color', type: 'vec4'},
    {name: 'uv', type: 'vec2'}
  ]
}
exports.pointShader = {
  vertex:   pointVertSrc,
  fragment: pointFragSrc,
  attributes: [
    {name: 'position', type: 'vec3'},
    {name: 'color', type: 'vec4'},
    {name: 'uv', type: 'vec2'},
    {name: 'pointSize', type: 'float'}
  ]
}
exports.pickShader = {
  vertex:   pickVertSrc,
  fragment: pickFragSrc,
  attributes: [
    {name: 'position', type: 'vec3'},
    {name: 'id', type: 'vec4'}
  ]
}
exports.pointPickShader = {
  vertex:   pickPointVertSrc,
  fragment: pickFragSrc,
  attributes: [
    {name: 'position', type: 'vec3'},
    {name: 'pointSize', type: 'float'},
    {name: 'id', type: 'vec4'}
  ]
}
exports.contourShader = {
  vertex:   contourVertSrc,
  fragment: contourFragSrc,
  attributes: [
    {name: 'position', type: 'vec3'}
  ]
}


/***/ }),

/***/ "./node_modules/gl-mesh3d/mesh.js":
/*!****************************************!*\
  !*** ./node_modules/gl-mesh3d/mesh.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var DEFAULT_VERTEX_NORMALS_EPSILON = 1e-6; // may be too large if triangles are very small
var DEFAULT_FACE_NORMALS_EPSILON = 1e-6;

var createShader  = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var createBuffer  = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO     = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var createTexture = __webpack_require__(/*! gl-texture2d */ "./node_modules/gl-texture2d/texture.js")
var normals       = __webpack_require__(/*! normals */ "./node_modules/normals/normals.js")
var multiply      = __webpack_require__(/*! gl-mat4/multiply */ "./node_modules/gl-mat4/multiply.js")
var invert        = __webpack_require__(/*! gl-mat4/invert */ "./node_modules/gl-mat4/invert.js")
var ndarray       = __webpack_require__(/*! ndarray */ "./node_modules/ndarray/ndarray.js")
var colormap      = __webpack_require__(/*! colormap */ "./node_modules/colormap/index.js")
var getContour    = __webpack_require__(/*! simplicial-complex-contour */ "./node_modules/simplicial-complex-contour/contour.js")
var pool          = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var shaders       = __webpack_require__(/*! ./lib/shaders */ "./node_modules/gl-mesh3d/lib/shaders.js")
var closestPoint  = __webpack_require__(/*! ./lib/closest-point */ "./node_modules/gl-mesh3d/lib/closest-point.js")

var meshShader    = shaders.meshShader
var wireShader    = shaders.wireShader
var pointShader   = shaders.pointShader
var pickShader    = shaders.pickShader
var pointPickShader = shaders.pointPickShader
var contourShader = shaders.contourShader

var IDENTITY = [
  1,0,0,0,
  0,1,0,0,
  0,0,1,0,
  0,0,0,1]


function SimplicialMesh(gl
  , texture
  , triShader
  , lineShader
  , pointShader
  , pickShader
  , pointPickShader
  , contourShader
  , trianglePositions
  , triangleIds
  , triangleColors
  , triangleUVs
  , triangleNormals
  , triangleVAO
  , edgePositions
  , edgeIds
  , edgeColors
  , edgeUVs
  , edgeVAO
  , pointPositions
  , pointIds
  , pointColors
  , pointUVs
  , pointSizes
  , pointVAO
  , contourPositions
  , contourVAO) {

  this.gl                = gl
  this.pixelRatio         = 1
  this.cells             = []
  this.positions         = []
  this.intensity         = []
  this.texture           = texture
  this.dirty             = true

  this.triShader         = triShader
  this.lineShader        = lineShader
  this.pointShader       = pointShader
  this.pickShader        = pickShader
  this.pointPickShader   = pointPickShader
  this.contourShader     = contourShader

  this.trianglePositions = trianglePositions
  this.triangleColors    = triangleColors
  this.triangleNormals   = triangleNormals
  this.triangleUVs       = triangleUVs
  this.triangleIds       = triangleIds
  this.triangleVAO       = triangleVAO
  this.triangleCount     = 0

  this.lineWidth         = 1
  this.edgePositions     = edgePositions
  this.edgeColors        = edgeColors
  this.edgeUVs           = edgeUVs
  this.edgeIds           = edgeIds
  this.edgeVAO           = edgeVAO
  this.edgeCount         = 0

  this.pointPositions    = pointPositions
  this.pointColors       = pointColors
  this.pointUVs          = pointUVs
  this.pointSizes        = pointSizes
  this.pointIds          = pointIds
  this.pointVAO          = pointVAO
  this.pointCount        = 0

  this.contourLineWidth  = 1
  this.contourPositions  = contourPositions
  this.contourVAO        = contourVAO
  this.contourCount      = 0
  this.contourColor      = [0,0,0]
  this.contourEnable     = true

  this.pickVertex        = true;
  this.pickId            = 1
  this.bounds            = [
    [ Infinity, Infinity, Infinity],
    [-Infinity,-Infinity,-Infinity] ]
  this.clipBounds        = [
    [-Infinity,-Infinity,-Infinity],
    [ Infinity, Infinity, Infinity] ]

  this.lightPosition = [1e5, 1e5, 0]
  this.ambientLight  = 0.8
  this.diffuseLight  = 0.8
  this.specularLight = 2.0
  this.roughness     = 0.5
  this.fresnel       = 1.5

  this.opacity       = 1.0
  this.hasAlpha      = false
  this.opacityscale  = false

  this._model       = IDENTITY
  this._view        = IDENTITY
  this._projection  = IDENTITY
  this._resolution  = [1,1]
}

var proto = SimplicialMesh.prototype

proto.isOpaque = function() {
  return !this.hasAlpha
}

proto.isTransparent = function() {
  return this.hasAlpha
}

proto.pickSlots = 1

proto.setPickBase = function(id) {
  this.pickId = id
}

function getOpacityFromScale(ratio, opacityscale) {

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

function genColormap(param, opacityscale) {
  var colors = colormap({
      colormap: param
    , nshades:  256
    , format:  'rgba'
  })

  var result = new Uint8Array(256*4)
  for(var i=0; i<256; ++i) {
    var c = colors[i]
    for(var j=0; j<3; ++j) {
      result[4*i+j] = c[j]
    }
    if(!opacityscale) {
      result[4*i+3] = 255 * c[3]
    } else {
      result[4*i+3] = 255 * getOpacityFromScale(i / 255.0, opacityscale)
    }
  }

  return ndarray(result, [256,256,4], [4,0,1])
}

function takeZComponent(array) {
  var n = array.length
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = array[i][2]
  }
  return result
}

proto.highlight = function(selection) {
  if(!selection || !this.contourEnable) {
    this.contourCount = 0
    return
  }
  var level = getContour(this.cells, this.intensity, selection.intensity)
  var cells         = level.cells
  var vertexIds     = level.vertexIds
  var vertexWeights = level.vertexWeights
  var numCells = cells.length
  var result = pool.mallocFloat32(2 * 3 * numCells)
  var ptr = 0
  for(var i=0; i<numCells; ++i) {
    var c = cells[i]
    for(var j=0; j<2; ++j) {
      var v = c[0]
      if(c.length === 2) {
        v = c[j]
      }
      var a = vertexIds[v][0]
      var b = vertexIds[v][1]
      var w = vertexWeights[v]
      var wi = 1.0 - w
      var pa = this.positions[a]
      var pb = this.positions[b]
      for(var k=0; k<3; ++k) {
        result[ptr++] = w * pa[k] + wi * pb[k]
      }
    }
  }
  this.contourCount = (ptr / 3)|0
  this.contourPositions.update(result.subarray(0, ptr))
  pool.free(result)
}

proto.update = function(params) {
  params = params || {}
  var gl = this.gl

  this.dirty = true

  if('contourEnable' in params) {
    this.contourEnable = params.contourEnable
  }
  if('contourColor' in params) {
    this.contourColor = params.contourColor
  }
  if('lineWidth' in params) {
    this.lineWidth = params.lineWidth
  }
  if('lightPosition' in params) {
    this.lightPosition = params.lightPosition
  }

  this.hasAlpha = false // default to no transparent draw
  if('opacity' in params) {
    this.opacity = params.opacity
    if(this.opacity < 1) {
      this.hasAlpha = true;
    }
  }
  if('opacityscale' in params) {
    this.opacityscale = params.opacityscale
    this.hasAlpha = true;
  }

  if('ambient' in params) {
    this.ambientLight  = params.ambient
  }
  if('diffuse' in params) {
    this.diffuseLight = params.diffuse
  }
  if('specular' in params) {
    this.specularLight = params.specular
  }
  if('roughness' in params) {
    this.roughness = params.roughness
  }
  if('fresnel' in params) {
    this.fresnel = params.fresnel
  }

  if(params.texture) {
    this.texture.dispose()
    this.texture = createTexture(gl, params.texture)
  } else if (params.colormap) {
    this.texture.shape = [256,256]
    this.texture.minFilter = gl.LINEAR_MIPMAP_LINEAR
    this.texture.magFilter = gl.LINEAR
    this.texture.setPixels(genColormap(params.colormap, this.opacityscale))
    this.texture.generateMipmap()
  }

  var cells = params.cells
  var positions = params.positions

  if(!positions || !cells) {
    return
  }

  var tPos = []
  var tCol = []
  var tNor = []
  var tUVs = []
  var tIds = []

  var ePos = []
  var eCol = []
  var eUVs = []
  var eIds = []

  var pPos = []
  var pCol = []
  var pUVs = []
  var pSiz = []
  var pIds = []

  //Save geometry data for picking calculations
  this.cells     = cells
  this.positions = positions

  //Compute normals
  var vertexNormals = params.vertexNormals
  var cellNormals   = params.cellNormals
  var vertexNormalsEpsilon = params.vertexNormalsEpsilon === void(0) ? DEFAULT_VERTEX_NORMALS_EPSILON : params.vertexNormalsEpsilon
  var faceNormalsEpsilon = params.faceNormalsEpsilon === void(0) ? DEFAULT_FACE_NORMALS_EPSILON : params.faceNormalsEpsilon
  if(params.useFacetNormals && !cellNormals) {
    cellNormals = normals.faceNormals(cells, positions, faceNormalsEpsilon)
  }
  if(!cellNormals && !vertexNormals) {
    vertexNormals = normals.vertexNormals(cells, positions, vertexNormalsEpsilon)
  }

  //Compute colors
  var vertexColors    = params.vertexColors
  var cellColors      = params.cellColors
  var meshColor       = params.meshColor || [1,1,1,1]

  //UVs
  var vertexUVs       = params.vertexUVs
  var vertexIntensity = params.vertexIntensity
  var cellUVs         = params.cellUVs
  var cellIntensity   = params.cellIntensity

  var intensityLo     = Infinity
  var intensityHi     = -Infinity
  if(!vertexUVs && !cellUVs) {
    if(vertexIntensity) {
      if(params.vertexIntensityBounds) {
        intensityLo = +params.vertexIntensityBounds[0]
        intensityHi = +params.vertexIntensityBounds[1]
      } else {
        for(var i=0; i<vertexIntensity.length; ++i) {
          var f = vertexIntensity[i]
          intensityLo = Math.min(intensityLo, f)
          intensityHi = Math.max(intensityHi, f)
        }
      }
    } else if(cellIntensity) {
      if(params.cellIntensityBounds) {
        intensityLo = +params.cellIntensityBounds[0]
        intensityHi = +params.cellIntensityBounds[1]
      } else {
        for(var i=0; i<cellIntensity.length; ++i) {
          var f = cellIntensity[i]
          intensityLo = Math.min(intensityLo, f)
          intensityHi = Math.max(intensityHi, f)
        }
      }
    } else {
      for(var i=0; i<positions.length; ++i) {
        var f = positions[i][2]
        intensityLo = Math.min(intensityLo, f)
        intensityHi = Math.max(intensityHi, f)
      }
    }
  }

  if(vertexIntensity) {
    this.intensity = vertexIntensity
  } else if(cellIntensity) {
    this.intensity = cellIntensity
  } else {
    this.intensity = takeZComponent(positions)
  }

  this.pickVertex = !(cellIntensity || cellColors)

  //Point size
  var pointSizes      = params.pointSizes
  var meshPointSize   = params.pointSize || 1.0

  //Update bounds
  this.bounds       = [[Infinity,Infinity,Infinity], [-Infinity,-Infinity,-Infinity]]
  for(var i=0; i<positions.length; ++i) {
    var p = positions[i]
    for(var j=0; j<3; ++j) {
      if(isNaN(p[j]) || !isFinite(p[j])) {
        continue
      }
      this.bounds[0][j] = Math.min(this.bounds[0][j], p[j])
      this.bounds[1][j] = Math.max(this.bounds[1][j], p[j])
    }
  }

  //Pack cells into buffers
  var triangleCount = 0
  var edgeCount = 0
  var pointCount = 0

fill_loop:
  for(var i=0; i<cells.length; ++i) {
    var cell = cells[i]
    switch(cell.length) {
      case 1:

        var v = cell[0]
        var p = positions[v]

        //Check NaNs
        for(var j=0; j<3; ++j) {
          if(isNaN(p[j]) || !isFinite(p[j])) {
            continue fill_loop
          }
        }

        pPos.push(p[0], p[1], p[2])

        var c
        if(vertexColors) {
          c = vertexColors[v]
        } else if(cellColors) {
          c = cellColors[i]
        } else {
          c = meshColor
        }
        if(this.opacityscale && vertexIntensity) {
          tCol.push(c[0], c[1], c[2],
            this.opacity * getOpacityFromScale(
              (vertexIntensity[v] - intensityLo) / (intensityHi - intensityLo),
              this.opacityscale
            )
          )
        } else if(c.length === 3) {
          pCol.push(c[0], c[1], c[2], this.opacity)
        } else {
          pCol.push(c[0], c[1], c[2], c[3] * this.opacity)
          if(c[3] < 1) this.hasAlpha = true
        }

        var uv
        if(vertexUVs) {
          uv = vertexUVs[v]
        } else if(vertexIntensity) {
          uv = [
            (vertexIntensity[v] - intensityLo) /
            (intensityHi - intensityLo), 0]
        } else if(cellUVs) {
          uv = cellUVs[i]
        } else if(cellIntensity) {
          uv = [
            (cellIntensity[i] - intensityLo) /
            (intensityHi - intensityLo), 0]
        } else {
          uv = [
            (p[2] - intensityLo) /
            (intensityHi - intensityLo), 0]
        }
        pUVs.push(uv[0], uv[1])

        if(pointSizes) {
          pSiz.push(pointSizes[v])
        } else {
          pSiz.push(meshPointSize)
        }

        pIds.push(i)

        pointCount += 1
      break

      case 2:

        //Check NaNs
        for(var j=0; j<2; ++j) {
          var v = cell[j]
          var p = positions[v]
          for(var k=0; k<3; ++k) {
            if(isNaN(p[k]) || !isFinite(p[k])) {
              continue fill_loop
            }
          }
        }

        for(var j=0; j<2; ++j) {
          var v = cell[j]
          var p = positions[v]

          ePos.push(p[0], p[1], p[2])

          var c
          if(vertexColors) {
            c = vertexColors[v]
          } else if(cellColors) {
            c = cellColors[i]
          } else {
            c = meshColor
          }
          if(this.opacityscale && vertexIntensity) {
            tCol.push(c[0], c[1], c[2],
              this.opacity * getOpacityFromScale(
                (vertexIntensity[v] - intensityLo) / (intensityHi - intensityLo),
                this.opacityscale
              )
            )
          } else if(c.length === 3) {
            eCol.push(c[0], c[1], c[2], this.opacity)
          } else {
            eCol.push(c[0], c[1], c[2], c[3] * this.opacity)
            if(c[3] < 1) this.hasAlpha = true
          }

          var uv
          if(vertexUVs) {
            uv = vertexUVs[v]
          } else if(vertexIntensity) {
            uv = [
              (vertexIntensity[v] - intensityLo) /
              (intensityHi - intensityLo), 0]
          } else if(cellUVs) {
            uv = cellUVs[i]
          } else if(cellIntensity) {
            uv = [
              (cellIntensity[i] - intensityLo) /
              (intensityHi - intensityLo), 0]
          } else {
            uv = [
              (p[2] - intensityLo) /
              (intensityHi - intensityLo), 0]
          }
          eUVs.push(uv[0], uv[1])

          eIds.push(i)
        }
        edgeCount += 1
      break

      case 3:
        //Check NaNs
        for(var j=0; j<3; ++j) {
          var v = cell[j]
          var p = positions[v]
          for(var k=0; k<3; ++k) {
            if(isNaN(p[k]) || !isFinite(p[k])) {
              continue fill_loop
            }
          }
        }

        for(var j=0; j<3; ++j) {
          var v = cell[2 - j]

          var p = positions[v]
          tPos.push(p[0], p[1], p[2])

          var c
          if(vertexColors) {
            c = vertexColors[v]
          } else if(cellColors) {
            c = cellColors[i]
          } else {
            c = meshColor
          }

          if(!c) {
            tCol.push(0.5,0.5,0.5,1)
          } else if(this.opacityscale && vertexIntensity) {
            tCol.push(c[0], c[1], c[2],
              this.opacity * getOpacityFromScale(
                (vertexIntensity[v] - intensityLo) / (intensityHi - intensityLo),
                this.opacityscale
              )
            )
          } else if(c.length === 3) {
            tCol.push(c[0], c[1], c[2], this.opacity)
          } else {
            tCol.push(c[0], c[1], c[2], c[3] * this.opacity)
            if(c[3] < 1) this.hasAlpha = true
          }

          var uv
          if(vertexUVs) {
            uv = vertexUVs[v]
          } else if(vertexIntensity) {
            uv = [
              (vertexIntensity[v] - intensityLo) /
              (intensityHi - intensityLo), 0]
          } else if(cellUVs) {
            uv = cellUVs[i]
          } else if(cellIntensity) {
            uv = [
              (cellIntensity[i] - intensityLo) /
              (intensityHi - intensityLo), 0]
          } else {
            uv = [
              (p[2] - intensityLo) /
              (intensityHi - intensityLo), 0]
          }
          tUVs.push(uv[0], uv[1])

          var q
          if(vertexNormals) {
            q = vertexNormals[v]
          } else {
            q = cellNormals[i]
          }
          tNor.push(q[0], q[1], q[2])

          tIds.push(i)
        }
        triangleCount += 1
      break

      default:
      break
    }
  }

  this.pointCount     = pointCount
  this.edgeCount      = edgeCount
  this.triangleCount  = triangleCount

  this.pointPositions.update(pPos)
  this.pointColors.update(pCol)
  this.pointUVs.update(pUVs)
  this.pointSizes.update(pSiz)
  this.pointIds.update(new Uint32Array(pIds))

  this.edgePositions.update(ePos)
  this.edgeColors.update(eCol)
  this.edgeUVs.update(eUVs)
  this.edgeIds.update(new Uint32Array(eIds))

  this.trianglePositions.update(tPos)
  this.triangleColors.update(tCol)
  this.triangleUVs.update(tUVs)
  this.triangleNormals.update(tNor)
  this.triangleIds.update(new Uint32Array(tIds))
}

proto.drawTransparent = proto.draw = function(params) {
  params = params || {}
  var gl          = this.gl
  var model       = params.model      || IDENTITY
  var view        = params.view       || IDENTITY
  var projection  = params.projection || IDENTITY

  var clipBounds = [[-1e6,-1e6,-1e6],[1e6,1e6,1e6]]
  for(var i=0; i<3; ++i) {
    clipBounds[0][i] = Math.max(clipBounds[0][i], this.clipBounds[0][i])
    clipBounds[1][i] = Math.min(clipBounds[1][i], this.clipBounds[1][i])
  }

  var uniforms = {
    model:      model,
    view:       view,
    projection: projection,
    inverseModel: IDENTITY.slice(),

    clipBounds: clipBounds,

    kambient:   this.ambientLight,
    kdiffuse:   this.diffuseLight,
    kspecular:  this.specularLight,
    roughness:  this.roughness,
    fresnel:    this.fresnel,

    eyePosition:   [0,0,0],
    lightPosition: [0,0,0],

    contourColor: this.contourColor,

    texture:    0
  }

  uniforms.inverseModel = invert(uniforms.inverseModel, uniforms.model)

  gl.disable(gl.CULL_FACE)

  this.texture.bind(0)

  var invCameraMatrix = new Array(16)
  multiply(invCameraMatrix, uniforms.view, uniforms.model)
  multiply(invCameraMatrix, uniforms.projection, invCameraMatrix)
  invert(invCameraMatrix, invCameraMatrix)

  for(var i=0; i<3; ++i) {
    uniforms.eyePosition[i] = invCameraMatrix[12+i] / invCameraMatrix[15]
  }

  var w = invCameraMatrix[15]
  for(var i=0; i<3; ++i) {
    w += this.lightPosition[i] * invCameraMatrix[4*i+3]
  }
  for(var i=0; i<3; ++i) {
    var s = invCameraMatrix[12+i]
    for(var j=0; j<3; ++j) {
      s += invCameraMatrix[4*j+i] * this.lightPosition[j]
    }
    uniforms.lightPosition[i] = s / w
  }

  if(this.triangleCount > 0) {
    var shader = this.triShader
    shader.bind()
    shader.uniforms = uniforms

    this.triangleVAO.bind()
    gl.drawArrays(gl.TRIANGLES, 0, this.triangleCount*3)
    this.triangleVAO.unbind()
  }

  if(this.edgeCount > 0 && this.lineWidth > 0) {
    var shader = this.lineShader
    shader.bind()
    shader.uniforms = uniforms

    this.edgeVAO.bind()
    gl.lineWidth(this.lineWidth * this.pixelRatio)
    gl.drawArrays(gl.LINES, 0, this.edgeCount*2)
    this.edgeVAO.unbind()
  }

  if(this.pointCount > 0) {
    var shader = this.pointShader
    shader.bind()
    shader.uniforms = uniforms

    this.pointVAO.bind()
    gl.drawArrays(gl.POINTS, 0, this.pointCount)
    this.pointVAO.unbind()
  }

  if(this.contourEnable && this.contourCount > 0 && this.contourLineWidth > 0) {
    var shader = this.contourShader
    shader.bind()
    shader.uniforms = uniforms

    this.contourVAO.bind()
    gl.drawArrays(gl.LINES, 0, this.contourCount)
    this.contourVAO.unbind()
  }
}

proto.drawPick = function(params) {
  params = params || {}

  var gl         = this.gl

  var model      = params.model      || IDENTITY
  var view       = params.view       || IDENTITY
  var projection = params.projection || IDENTITY

  var clipBounds = [[-1e6,-1e6,-1e6],[1e6,1e6,1e6]]
  for(var i=0; i<3; ++i) {
    clipBounds[0][i] = Math.max(clipBounds[0][i], this.clipBounds[0][i])
    clipBounds[1][i] = Math.min(clipBounds[1][i], this.clipBounds[1][i])
  }

  //Save camera parameters
  this._model      = [].slice.call(model)
  this._view       = [].slice.call(view)
  this._projection = [].slice.call(projection)
  this._resolution = [gl.drawingBufferWidth, gl.drawingBufferHeight]

  var uniforms = {
    model:      model,
    view:       view,
    projection: projection,
    clipBounds: clipBounds,
    pickId:     this.pickId / 255.0,
  }

  var shader = this.pickShader
  shader.bind()
  shader.uniforms = uniforms

  if(this.triangleCount > 0) {
    this.triangleVAO.bind()
    gl.drawArrays(gl.TRIANGLES, 0, this.triangleCount*3)
    this.triangleVAO.unbind()
  }

  if(this.edgeCount > 0) {
    this.edgeVAO.bind()
    gl.lineWidth(this.lineWidth * this.pixelRatio)
    gl.drawArrays(gl.LINES, 0, this.edgeCount*2)
    this.edgeVAO.unbind()
  }

  if(this.pointCount > 0) {
    var shader = this.pointPickShader
    shader.bind()
    shader.uniforms = uniforms

    this.pointVAO.bind()
    gl.drawArrays(gl.POINTS, 0, this.pointCount)
    this.pointVAO.unbind()
  }
}


proto.pick = function(pickData) {
  if(!pickData) {
    return null
  }
  if(pickData.id !== this.pickId) {
    return null
  }

  var cellId    = pickData.value[0] + 256*pickData.value[1] + 65536*pickData.value[2]
  var cell      = this.cells[cellId]
  var positions = this.positions

  var simplex   = new Array(cell.length)
  for(var i=0; i<cell.length; ++i) {
    simplex[i] = positions[cell[i]]
  }

  var x = pickData.coord[0];
  var y = pickData.coord[1];

  if(!this.pickVertex) {
    var A = this.positions[cell[0]];
    var B = this.positions[cell[1]];
    var C = this.positions[cell[2]];

    var dataCoordinate = [
      (A[0] + B[0] + C[0]) / 3,
      (A[1] + B[1] + C[1]) / 3,
      (A[2] + B[2] + C[2]) / 3
    ]

    return {
      _cellCenter : true,
      position: [x, y],
      index:    cellId,
      cell:     cell,
      cellId:   cellId,
      intensity:  this.intensity[cellId],
      dataCoordinate: dataCoordinate
    }
  }

  var data = closestPoint(
    simplex,
    [x * this.pixelRatio, this._resolution[1] - y * this.pixelRatio],
    this._model,
    this._view,
    this._projection,
    this._resolution)

  if(!data) {
    return null
  }

  var weights = data[2]
  var interpIntensity = 0.0
  for(var i=0; i<cell.length; ++i) {
    interpIntensity += weights[i] * this.intensity[cell[i]]
  }

  return {
    position: data[1],
    index:    cell[data[0]],
    cell:     cell,
    cellId:   cellId,
    intensity:  interpIntensity,
    dataCoordinate: this.positions[cell[data[0]]]
  }
}


proto.dispose = function() {
  this.texture.dispose()

  this.triShader.dispose()
  this.lineShader.dispose()
  this.pointShader.dispose()
  this.pickShader.dispose()
  this.pointPickShader.dispose()

  this.triangleVAO.dispose()
  this.trianglePositions.dispose()
  this.triangleColors.dispose()
  this.triangleUVs.dispose()
  this.triangleNormals.dispose()
  this.triangleIds.dispose()

  this.edgeVAO.dispose()
  this.edgePositions.dispose()
  this.edgeColors.dispose()
  this.edgeUVs.dispose()
  this.edgeIds.dispose()

  this.pointVAO.dispose()
  this.pointPositions.dispose()
  this.pointColors.dispose()
  this.pointUVs.dispose()
  this.pointSizes.dispose()
  this.pointIds.dispose()

  this.contourVAO.dispose()
  this.contourPositions.dispose()
  this.contourShader.dispose()
}

function createMeshShader(gl) {
  var shader = createShader(gl, meshShader.vertex, meshShader.fragment)
  shader.attributes.position.location = 0
  shader.attributes.color.location    = 2
  shader.attributes.uv.location       = 3
  shader.attributes.normal.location   = 4
  return shader
}

function createWireShader(gl) {
  var shader = createShader(gl, wireShader.vertex, wireShader.fragment)
  shader.attributes.position.location = 0
  shader.attributes.color.location    = 2
  shader.attributes.uv.location       = 3
  return shader
}

function createPointShader(gl) {
  var shader = createShader(gl, pointShader.vertex, pointShader.fragment)
  shader.attributes.position.location  = 0
  shader.attributes.color.location     = 2
  shader.attributes.uv.location        = 3
  shader.attributes.pointSize.location = 4
  return shader
}

function createPickShader(gl) {
  var shader = createShader(gl, pickShader.vertex, pickShader.fragment)
  shader.attributes.position.location = 0
  shader.attributes.id.location       = 1
  return shader
}

function createPointPickShader(gl) {
  var shader = createShader(gl, pointPickShader.vertex, pointPickShader.fragment)
  shader.attributes.position.location  = 0
  shader.attributes.id.location        = 1
  shader.attributes.pointSize.location = 4
  return shader
}

function createContourShader(gl) {
  var shader = createShader(gl, contourShader.vertex, contourShader.fragment)
  shader.attributes.position.location = 0
  return shader
}

function createSimplicialMesh(gl, params) {
  if (arguments.length === 1) {
    params = gl;
    gl = params.gl;
  }

  //enable derivatives for face normals
  var ext = gl.getExtension('OES_standard_derivatives') || gl.getExtension('MOZ_OES_standard_derivatives') || gl.getExtension('WEBKIT_OES_standard_derivatives')
  if (!ext)
    throw new Error('derivatives not supported')

  var triShader       = createMeshShader(gl)
  var lineShader      = createWireShader(gl)
  var pointShader     = createPointShader(gl)
  var pickShader      = createPickShader(gl)
  var pointPickShader = createPointPickShader(gl)
  var contourShader   = createContourShader(gl)

  var meshTexture       = createTexture(gl,
    ndarray(new Uint8Array([255,255,255,255]), [1,1,4]))
  meshTexture.generateMipmap()
  meshTexture.minFilter = gl.LINEAR_MIPMAP_LINEAR
  meshTexture.magFilter = gl.LINEAR

  var trianglePositions = createBuffer(gl)
  var triangleColors    = createBuffer(gl)
  var triangleUVs       = createBuffer(gl)
  var triangleNormals   = createBuffer(gl)
  var triangleIds       = createBuffer(gl)
  var triangleVAO       = createVAO(gl, [
    { buffer: trianglePositions,
      type: gl.FLOAT,
      size: 3
    },
    { buffer: triangleIds,
      type: gl.UNSIGNED_BYTE,
      size: 4,
      normalized: true
    },
    { buffer: triangleColors,
      type: gl.FLOAT,
      size: 4
    },
    { buffer: triangleUVs,
      type: gl.FLOAT,
      size: 2
    },
    { buffer: triangleNormals,
      type: gl.FLOAT,
      size: 3
    }
  ])

  var edgePositions = createBuffer(gl)
  var edgeColors    = createBuffer(gl)
  var edgeUVs       = createBuffer(gl)
  var edgeIds       = createBuffer(gl)
  var edgeVAO       = createVAO(gl, [
    { buffer: edgePositions,
      type: gl.FLOAT,
      size: 3
    },
    { buffer: edgeIds,
      type: gl.UNSIGNED_BYTE,
      size: 4,
      normalized: true
    },
    { buffer: edgeColors,
      type: gl.FLOAT,
      size: 4
    },
    { buffer: edgeUVs,
      type: gl.FLOAT,
      size: 2
    }
  ])

  var pointPositions  = createBuffer(gl)
  var pointColors     = createBuffer(gl)
  var pointUVs        = createBuffer(gl)
  var pointSizes      = createBuffer(gl)
  var pointIds        = createBuffer(gl)
  var pointVAO        = createVAO(gl, [
    { buffer: pointPositions,
      type: gl.FLOAT,
      size: 3
    },
    { buffer: pointIds,
      type: gl.UNSIGNED_BYTE,
      size: 4,
      normalized: true
    },
    { buffer: pointColors,
      type: gl.FLOAT,
      size: 4
    },
    { buffer: pointUVs,
      type: gl.FLOAT,
      size: 2
    },
    { buffer: pointSizes,
      type: gl.FLOAT,
      size: 1
    }
  ])

  var contourPositions = createBuffer(gl)
  var contourVAO       = createVAO(gl, [
    { buffer: contourPositions,
      type:   gl.FLOAT,
      size:   3
    }])

  var mesh = new SimplicialMesh(gl
    , meshTexture
    , triShader
    , lineShader
    , pointShader
    , pickShader
    , pointPickShader
    , contourShader
    , trianglePositions
    , triangleIds
    , triangleColors
    , triangleUVs
    , triangleNormals
    , triangleVAO
    , edgePositions
    , edgeIds
    , edgeColors
    , edgeUVs
    , edgeVAO
    , pointPositions
    , pointIds
    , pointColors
    , pointUVs
    , pointSizes
    , pointVAO
    , contourPositions
    , contourVAO)

  mesh.update(params)

  return mesh
}

module.exports = createSimplicialMesh


/***/ }),

/***/ "./node_modules/incremental-convex-hull/ich.js":
/*!*****************************************************!*\
  !*** ./node_modules/incremental-convex-hull/ich.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


//High level idea:
// 1. Use Clarkson's incremental construction to find convex hull
// 2. Point location in triangulation by jump and walk

module.exports = incrementalConvexHull

var orient = __webpack_require__(/*! robust-orientation */ "./node_modules/robust-orientation/orientation.js")
var compareCell = __webpack_require__(/*! simplicial-complex */ "./node_modules/simplicial-complex/topology.js").compareCells

function compareInt(a, b) {
  return a - b
}

function Simplex(vertices, adjacent, boundary) {
  this.vertices = vertices
  this.adjacent = adjacent
  this.boundary = boundary
  this.lastVisited = -1
}

Simplex.prototype.flip = function() {
  var t = this.vertices[0]
  this.vertices[0] = this.vertices[1]
  this.vertices[1] = t
  var u = this.adjacent[0]
  this.adjacent[0] = this.adjacent[1]
  this.adjacent[1] = u
}

function GlueFacet(vertices, cell, index) {
  this.vertices = vertices
  this.cell = cell
  this.index = index
}

function compareGlue(a, b) {
  return compareCell(a.vertices, b.vertices)
}

function bakeOrient(d) {
  var code = ["function orient(){var tuple=this.tuple;return test("]
  for(var i=0; i<=d; ++i) {
    if(i > 0) {
      code.push(",")
    }
    code.push("tuple[", i, "]")
  }
  code.push(")}return orient")
  var proc = new Function("test", code.join(""))
  var test = orient[d+1]
  if(!test) {
    test = orient
  }
  return proc(test)
}

var BAKED = []

function Triangulation(dimension, vertices, simplices) {
  this.dimension = dimension
  this.vertices = vertices
  this.simplices = simplices
  this.interior = simplices.filter(function(c) {
    return !c.boundary
  })

  this.tuple = new Array(dimension+1)
  for(var i=0; i<=dimension; ++i) {
    this.tuple[i] = this.vertices[i]
  }

  var o = BAKED[dimension]
  if(!o) {
    o = BAKED[dimension] = bakeOrient(dimension)
  }
  this.orient = o
}

var proto = Triangulation.prototype

//Degenerate situation where we are on boundary, but coplanar to face
proto.handleBoundaryDegeneracy = function(cell, point) {
  var d = this.dimension
  var n = this.vertices.length - 1
  var tuple = this.tuple
  var verts = this.vertices

  //Dumb solution: Just do dfs from boundary cell until we find any peak, or terminate
  var toVisit = [ cell ]
  cell.lastVisited = -n
  while(toVisit.length > 0) {
    cell = toVisit.pop()
    var cellVerts = cell.vertices
    var cellAdj = cell.adjacent
    for(var i=0; i<=d; ++i) {
      var neighbor = cellAdj[i]
      if(!neighbor.boundary || neighbor.lastVisited <= -n) {
        continue
      }
      var nv = neighbor.vertices
      for(var j=0; j<=d; ++j) {
        var vv = nv[j]
        if(vv < 0) {
          tuple[j] = point
        } else {
          tuple[j] = verts[vv]
        }
      }
      var o = this.orient()
      if(o > 0) {
        return neighbor
      }
      neighbor.lastVisited = -n
      if(o === 0) {
        toVisit.push(neighbor)
      }
    }
  }
  return null
}

proto.walk = function(point, random) {
  //Alias local properties
  var n = this.vertices.length - 1
  var d = this.dimension
  var verts = this.vertices
  var tuple = this.tuple

  //Compute initial jump cell
  var initIndex = random ? (this.interior.length * Math.random())|0 : (this.interior.length-1)
  var cell = this.interior[ initIndex ]

  //Start walking
outerLoop:
  while(!cell.boundary) {
    var cellVerts = cell.vertices
    var cellAdj = cell.adjacent

    for(var i=0; i<=d; ++i) {
      tuple[i] = verts[cellVerts[i]]
    }
    cell.lastVisited = n

    //Find farthest adjacent cell
    for(var i=0; i<=d; ++i) {
      var neighbor = cellAdj[i]
      if(neighbor.lastVisited >= n) {
        continue
      }
      var prev = tuple[i]
      tuple[i] = point
      var o = this.orient()
      tuple[i] = prev
      if(o < 0) {
        cell = neighbor
        continue outerLoop
      } else {
        if(!neighbor.boundary) {
          neighbor.lastVisited = n
        } else {
          neighbor.lastVisited = -n
        }
      }
    }
    return
  }

  return cell
}

proto.addPeaks = function(point, cell) {
  var n = this.vertices.length - 1
  var d = this.dimension
  var verts = this.vertices
  var tuple = this.tuple
  var interior = this.interior
  var simplices = this.simplices

  //Walking finished at boundary, time to add peaks
  var tovisit = [ cell ]

  //Stretch initial boundary cell into a peak
  cell.lastVisited = n
  cell.vertices[cell.vertices.indexOf(-1)] = n
  cell.boundary = false
  interior.push(cell)

  //Record a list of all new boundaries created by added peaks so we can glue them together when we are all done
  var glueFacets = []

  //Do a traversal of the boundary walking outward from starting peak
  while(tovisit.length > 0) {
    //Pop off peak and walk over adjacent cells
    var cell = tovisit.pop()
    var cellVerts = cell.vertices
    var cellAdj = cell.adjacent
    var indexOfN = cellVerts.indexOf(n)
    if(indexOfN < 0) {
      continue
    }

    for(var i=0; i<=d; ++i) {
      if(i === indexOfN) {
        continue
      }

      //For each boundary neighbor of the cell
      var neighbor = cellAdj[i]
      if(!neighbor.boundary || neighbor.lastVisited >= n) {
        continue
      }

      var nv = neighbor.vertices

      //Test if neighbor is a peak
      if(neighbor.lastVisited !== -n) {      
        //Compute orientation of p relative to each boundary peak
        var indexOfNeg1 = 0
        for(var j=0; j<=d; ++j) {
          if(nv[j] < 0) {
            indexOfNeg1 = j
            tuple[j] = point
          } else {
            tuple[j] = verts[nv[j]]
          }
        }
        var o = this.orient()

        //Test if neighbor cell is also a peak
        if(o > 0) {
          nv[indexOfNeg1] = n
          neighbor.boundary = false
          interior.push(neighbor)
          tovisit.push(neighbor)
          neighbor.lastVisited = n
          continue
        } else {
          neighbor.lastVisited = -n
        }
      }

      var na = neighbor.adjacent

      //Otherwise, replace neighbor with new face
      var vverts = cellVerts.slice()
      var vadj = cellAdj.slice()
      var ncell = new Simplex(vverts, vadj, true)
      simplices.push(ncell)

      //Connect to neighbor
      var opposite = na.indexOf(cell)
      if(opposite < 0) {
        continue
      }
      na[opposite] = ncell
      vadj[indexOfN] = neighbor

      //Connect to cell
      vverts[i] = -1
      vadj[i] = cell
      cellAdj[i] = ncell

      //Flip facet
      ncell.flip()

      //Add to glue list
      for(var j=0; j<=d; ++j) {
        var uu = vverts[j]
        if(uu < 0 || uu === n) {
          continue
        }
        var nface = new Array(d-1)
        var nptr = 0
        for(var k=0; k<=d; ++k) {
          var vv = vverts[k]
          if(vv < 0 || k === j) {
            continue
          }
          nface[nptr++] = vv
        }
        glueFacets.push(new GlueFacet(nface, ncell, j))
      }
    }
  }

  //Glue boundary facets together
  glueFacets.sort(compareGlue)

  for(var i=0; i+1<glueFacets.length; i+=2) {
    var a = glueFacets[i]
    var b = glueFacets[i+1]
    var ai = a.index
    var bi = b.index
    if(ai < 0 || bi < 0) {
      continue
    }
    a.cell.adjacent[a.index] = b.cell
    b.cell.adjacent[b.index] = a.cell
  }
}

proto.insert = function(point, random) {
  //Add point
  var verts = this.vertices
  verts.push(point)

  var cell = this.walk(point, random)
  if(!cell) {
    return
  }

  //Alias local properties
  var d = this.dimension
  var tuple = this.tuple

  //Degenerate case: If point is coplanar to cell, then walk until we find a non-degenerate boundary
  for(var i=0; i<=d; ++i) {
    var vv = cell.vertices[i]
    if(vv < 0) {
      tuple[i] = point
    } else {
      tuple[i] = verts[vv]
    }
  }
  var o = this.orient(tuple)
  if(o < 0) {
    return
  } else if(o === 0) {
    cell = this.handleBoundaryDegeneracy(cell, point)
    if(!cell) {
      return
    }
  }

  //Add peaks
  this.addPeaks(point, cell)
}

//Extract all boundary cells
proto.boundary = function() {
  var d = this.dimension
  var boundary = []
  var cells = this.simplices
  var nc = cells.length
  for(var i=0; i<nc; ++i) {
    var c = cells[i]
    if(c.boundary) {
      var bcell = new Array(d)
      var cv = c.vertices
      var ptr = 0
      var parity = 0
      for(var j=0; j<=d; ++j) {
        if(cv[j] >= 0) {
          bcell[ptr++] = cv[j]
        } else {
          parity = j&1
        }
      }
      if(parity === (d&1)) {
        var t = bcell[0]
        bcell[0] = bcell[1]
        bcell[1] = t
      }
      boundary.push(bcell)
    }
  }
  return boundary
}

function incrementalConvexHull(points, randomSearch) {
  var n = points.length
  if(n === 0) {
    throw new Error("Must have at least d+1 points")
  }
  var d = points[0].length
  if(n <= d) {
    throw new Error("Must input at least d+1 points")
  }

  //FIXME: This could be degenerate, but need to select d+1 non-coplanar points to bootstrap process
  var initialSimplex = points.slice(0, d+1)

  //Make sure initial simplex is positively oriented
  var o = orient.apply(void 0, initialSimplex)
  if(o === 0) {
    throw new Error("Input not in general position")
  }
  var initialCoords = new Array(d+1)
  for(var i=0; i<=d; ++i) {
    initialCoords[i] = i
  }
  if(o < 0) {
    initialCoords[0] = 1
    initialCoords[1] = 0
  }

  //Create initial topological index, glue pointers together (kind of messy)
  var initialCell = new Simplex(initialCoords, new Array(d+1), false)
  var boundary = initialCell.adjacent
  var list = new Array(d+2)
  for(var i=0; i<=d; ++i) {
    var verts = initialCoords.slice()
    for(var j=0; j<=d; ++j) {
      if(j === i) {
        verts[j] = -1
      }
    }
    var t = verts[0]
    verts[0] = verts[1]
    verts[1] = t
    var cell = new Simplex(verts, new Array(d+1), true)
    boundary[i] = cell
    list[i] = cell
  }
  list[d+1] = initialCell
  for(var i=0; i<=d; ++i) {
    var verts = boundary[i].vertices
    var adj = boundary[i].adjacent
    for(var j=0; j<=d; ++j) {
      var v = verts[j]
      if(v < 0) {
        adj[j] = initialCell
        continue
      }
      for(var k=0; k<=d; ++k) {
        if(boundary[k].vertices.indexOf(v) < 0) {
          adj[j] = boundary[k]
        }
      }
    }
  }

  //Initialize triangles
  var triangles = new Triangulation(d, initialSimplex, list)

  //Insert remaining points
  var useRandom = !!randomSearch
  for(var i=d+1; i<n; ++i) {
    triangles.insert(points[i], useRandom)
  }
  
  //Extract boundary cells
  return triangles.boundary()
}

/***/ }),

/***/ "./node_modules/marching-simplex-table/mstab.js":
/*!******************************************************!*\
  !*** ./node_modules/marching-simplex-table/mstab.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createTable

var chull = __webpack_require__(/*! convex-hull */ "./node_modules/convex-hull/ch.js")

function constructVertex(d, a, b) {
  var x = new Array(d)
  for(var i=0; i<d; ++i) {
    x[i] = 0.0
    if(i === a) {
      x[i] += 0.5
    }
    if(i === b) {
      x[i] += 0.5
    }
  }
  return x
}

function constructCell(dimension, mask) {
  if(mask === 0 || mask === (1<<(dimension+1))-1) {
    return []
  }
  var points = []
  var index  = []
  for(var i=0; i<=dimension; ++i) {
    if(mask & (1<<i)) {
      points.push(constructVertex(dimension, i-1, i-1))
      index.push(null)
      for(var j=0; j<=dimension; ++j) {
        if(~mask & (1<<j)) {
          points.push(constructVertex(dimension, i-1, j-1))
          index.push([i,j])
        }
      }
    }
  }
  
  //Preprocess points so first d+1 points are linearly independent
  var hull = chull(points)
  var faces = []
i_loop:
  for(var i=0; i<hull.length; ++i) {
    var face = hull[i]
    var nface = []
    for(var j=0; j<face.length; ++j) {
      if(!index[face[j]]) {
        continue i_loop
      }
      nface.push(index[face[j]].slice())
    }
    faces.push(nface)
  }
  return faces
}

function createTable(dimension) {
  var numCells = 1<<(dimension+1)
  var result = new Array(numCells)
  for(var i=0; i<numCells; ++i) {
    result[i] = constructCell(dimension, i)
  }
  return result
}

/***/ }),

/***/ "./node_modules/monotone-convex-hull-2d/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/monotone-convex-hull-2d/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = monotoneConvexHull2D

var orient = __webpack_require__(/*! robust-orientation */ "./node_modules/robust-orientation/orientation.js")[3]

function monotoneConvexHull2D(points) {
  var n = points.length

  if(n < 3) {
    var result = new Array(n)
    for(var i=0; i<n; ++i) {
      result[i] = i
    }

    if(n === 2 &&
       points[0][0] === points[1][0] &&
       points[0][1] === points[1][1]) {
      return [0]
    }

    return result
  }

  //Sort point indices along x-axis
  var sorted = new Array(n)
  for(var i=0; i<n; ++i) {
    sorted[i] = i
  }
  sorted.sort(function(a,b) {
    var d = points[a][0]-points[b][0]
    if(d) {
      return d
    }
    return points[a][1] - points[b][1]
  })

  //Construct upper and lower hulls
  var lower = [sorted[0], sorted[1]]
  var upper = [sorted[0], sorted[1]]

  for(var i=2; i<n; ++i) {
    var idx = sorted[i]
    var p   = points[idx]

    //Insert into lower list
    var m = lower.length
    while(m > 1 && orient(
        points[lower[m-2]], 
        points[lower[m-1]], 
        p) <= 0) {
      m -= 1
      lower.pop()
    }
    lower.push(idx)

    //Insert into upper list
    m = upper.length
    while(m > 1 && orient(
        points[upper[m-2]], 
        points[upper[m-1]], 
        p) >= 0) {
      m -= 1
      upper.pop()
    }
    upper.push(idx)
  }

  //Merge lists together
  var result = new Array(upper.length + lower.length - 2)
  var ptr    = 0
  for(var i=0, nl=lower.length; i<nl; ++i) {
    result[ptr++] = lower[i]
  }
  for(var j=upper.length-2; j>0; --j) {
    result[ptr++] = upper[j]
  }

  //Return result
  return result
}

/***/ }),

/***/ "./node_modules/ndarray-sort/lib/compile_sort.js":
/*!*******************************************************!*\
  !*** ./node_modules/ndarray-sort/lib/compile_sort.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pool = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")

var INSERTION_SORT_THRESHOLD = 32

function getMallocFree(dtype) {
  switch(dtype) {
    case "uint8":
      return [pool.mallocUint8, pool.freeUint8]
    case "uint16":
      return [pool.mallocUint16, pool.freeUint16]
    case "uint32":
      return [pool.mallocUint32, pool.freeUint32]
    case "int8":
      return [pool.mallocInt8, pool.freeInt8]
    case "int16":
      return [pool.mallocInt16, pool.freeInt16]
    case "int32":
      return [pool.mallocInt32, pool.freeInt32]
    case "float32":
      return [pool.mallocFloat, pool.freeFloat]
    case "float64":
      return [pool.mallocDouble, pool.freeDouble]
    default:
      return null
  }
}

function shapeArgs(dimension) {
  var args = []
  for(var i=0; i<dimension; ++i) {
    args.push("s"+i)
  }
  for(var i=0; i<dimension; ++i) {
    args.push("n"+i)
  }
  for(var i=1; i<dimension; ++i) {
    args.push("d"+i)
  }
  for(var i=1; i<dimension; ++i) {
    args.push("e"+i)
  }
  for(var i=1; i<dimension; ++i) {
    args.push("f"+i)
  }
  return args
}

function createInsertionSort(order, dtype) {

  var code = ["'use strict'"]
  var funcName = ["ndarrayInsertionSort", order.join("d"), dtype].join("")
  var funcArgs = ["left", "right", "data", "offset" ].concat(shapeArgs(order.length))
  var allocator = getMallocFree(dtype)
  
  var vars = [ "i,j,cptr,ptr=left*s0+offset" ]
  
  if(order.length > 1) {
    var scratch_shape = []
    for(var i=1; i<order.length; ++i) {
      vars.push("i"+i)
      scratch_shape.push("n"+i)
    }
    if(allocator) {
      vars.push("scratch=malloc(" + scratch_shape.join("*") + ")")
    } else {
      vars.push("scratch=new Array("+scratch_shape.join("*") + ")")
    }
    vars.push("dptr","sptr","a","b")
  } else {
    vars.push("scratch")
  }
  
  function dataRead(ptr) {
    if(dtype === "generic") {
      return ["data.get(", ptr, ")"].join("")
    }
    return ["data[",ptr,"]"].join("")
  }
  
  function dataWrite(ptr, v) {
    if(dtype === "generic") {
      return ["data.set(", ptr, ",", v, ")"].join("")
    }
    return ["data[",ptr,"]=",v].join("")
  }
  
  //Create function header
  code.push(
    ["function ", funcName, "(", funcArgs.join(","), "){var ", vars.join(",")].join(""),
      "for(i=left+1;i<=right;++i){",
        "j=i;ptr+=s0",
        "cptr=ptr")
  
  
  if(order.length > 1) {
  
    //Copy data into scratch
    code.push("dptr=0;sptr=ptr")
    for(var i=order.length-1; i>=0; --i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push(["for(i",j,"=0;i",j,"<n",j,";++i",j,"){"].join(""))
    }
    code.push("scratch[dptr++]=",dataRead("sptr"))
    for(var i=0; i<order.length; ++i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push("sptr+=d"+j,"}")
    }

    
    //Compare items in outer loop
    code.push("__g:while(j-->left){",
              "dptr=0",
              "sptr=cptr-s0")
    for(var i=1; i<order.length; ++i) {
      if(i === 1) {
        code.push("__l:")
      }
      code.push(["for(i",i,"=0;i",i,"<n",i,";++i",i,"){"].join(""))
    }
    code.push(["a=", dataRead("sptr"),"\nb=scratch[dptr]\nif(a<b){break __g}\nif(a>b){break __l}"].join(""))
    for(var i=order.length-1; i>=1; --i) {
      code.push(
        "sptr+=e"+i,
        "dptr+=f"+i,
        "}")
    }
    
    //Copy data back
    code.push("dptr=cptr;sptr=cptr-s0")
    for(var i=order.length-1; i>=0; --i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push(["for(i",j,"=0;i",j,"<n",j,";++i",j,"){"].join(""))
    }
    code.push(dataWrite("dptr", dataRead("sptr")))
    for(var i=0; i<order.length; ++i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push(["dptr+=d",j,";sptr+=d",j].join(""),"}")
    }
    
    //Close while loop
    code.push("cptr-=s0\n}")

    //Copy scratch into cptr
    code.push("dptr=cptr;sptr=0")
    for(var i=order.length-1; i>=0; --i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push(["for(i",j,"=0;i",j,"<n",j,";++i",j,"){"].join(""))
    }
    code.push(dataWrite("dptr", "scratch[sptr++]"))
    for(var i=0; i<order.length; ++i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push("dptr+=d"+j,"}")
    }
  } else {
    code.push("scratch=" + dataRead("ptr"),
              "while((j-->left)&&("+dataRead("cptr-s0")+">scratch)){",
                dataWrite("cptr", dataRead("cptr-s0")),
                "cptr-=s0",
              "}",
              dataWrite("cptr", "scratch"))
  }
  
  //Close outer loop body
  code.push("}")
  if(order.length > 1 && allocator) {
    code.push("free(scratch)")
  }
  code.push("} return " + funcName)
  
  //Compile and link function
  if(allocator) {
    var result = new Function("malloc", "free", code.join("\n"))
    return result(allocator[0], allocator[1])
  } else {
    var result = new Function(code.join("\n"))
    return result()
  }
}

function createQuickSort(order, dtype, insertionSort) {
  var code = [ "'use strict'" ]
  var funcName = ["ndarrayQuickSort", order.join("d"), dtype].join("")
  var funcArgs = ["left", "right", "data", "offset" ].concat(shapeArgs(order.length))
  var allocator = getMallocFree(dtype)
  var labelCounter=0
  
  code.push(["function ", funcName, "(", funcArgs.join(","), "){"].join(""))
  
  var vars = [
    "sixth=((right-left+1)/6)|0",
    "index1=left+sixth",
    "index5=right-sixth",
    "index3=(left+right)>>1",
    "index2=index3-sixth",
    "index4=index3+sixth",
    "el1=index1",
    "el2=index2",
    "el3=index3",
    "el4=index4",
    "el5=index5",
    "less=left+1",
    "great=right-1",
    "pivots_are_equal=true",
    "tmp",
    "tmp0",
    "x",
    "y",
    "z",
    "k",
    "ptr0",
    "ptr1",
    "ptr2",
    "comp_pivot1=0",
    "comp_pivot2=0",
    "comp=0"
  ]
  
  if(order.length > 1) {
    var ele_size = []
    for(var i=1; i<order.length; ++i) {
      ele_size.push("n"+i)
      vars.push("i"+i)
    }
    for(var i=0; i<8; ++i) {
      vars.push("b_ptr"+i)
    }
    vars.push(
      "ptr3",
      "ptr4",
      "ptr5",
      "ptr6",
      "ptr7",
      "pivot_ptr",
      "ptr_shift",
      "elementSize="+ele_size.join("*"))
    if(allocator) {
      vars.push("pivot1=malloc(elementSize)",
                "pivot2=malloc(elementSize)")
    } else {
      vars.push("pivot1=new Array(elementSize),pivot2=new Array(elementSize)")
    }
  } else {
    vars.push("pivot1", "pivot2")
  }
  
  //Initialize local variables
  code.push("var " + vars.join(","))
  
  function toPointer(v) {
    return ["(offset+",v,"*s0)"].join("")
  }
  
  function dataRead(ptr) {
    if(dtype === "generic") {
      return ["data.get(", ptr, ")"].join("")
    }
    return ["data[",ptr,"]"].join("")
  }
  
  function dataWrite(ptr, v) {
    if(dtype === "generic") {
      return ["data.set(", ptr, ",", v, ")"].join("")
    }
    return ["data[",ptr,"]=",v].join("")
  }
  
  function cacheLoop(ptrs, usePivot, body) {
    if(ptrs.length === 1) {
      code.push("ptr0="+toPointer(ptrs[0]))
    } else {
      for(var i=0; i<ptrs.length; ++i) {
        code.push(["b_ptr",i,"=s0*",ptrs[i]].join(""))
      }
    }
    if(usePivot) {
      code.push("pivot_ptr=0")
    }
    code.push("ptr_shift=offset")
    for(var i=order.length-1; i>=0; --i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push(["for(i",j,"=0;i",j,"<n",j,";++i",j,"){"].join(""))
    }
    if(ptrs.length > 1) {
      for(var i=0; i<ptrs.length; ++i) {
        code.push(["ptr",i,"=b_ptr",i,"+ptr_shift"].join(""))
      }
    }
    code.push(body)
    if(usePivot) {
      code.push("++pivot_ptr")
    }
    for(var i=0; i<order.length; ++i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      if(ptrs.length>1) {
        code.push("ptr_shift+=d"+j)
      } else {
        code.push("ptr0+=d"+j)
      }
      code.push("}")
    }
  }
  
  function lexicoLoop(label, ptrs, usePivot, body) {
    if(ptrs.length === 1) {
      code.push("ptr0="+toPointer(ptrs[0]))
    } else {
      for(var i=0; i<ptrs.length; ++i) {
        code.push(["b_ptr",i,"=s0*",ptrs[i]].join(""))
      }
      code.push("ptr_shift=offset")
    }
    if(usePivot) {
      code.push("pivot_ptr=0")
    }
    if(label) {
      code.push(label+":")
    }
    for(var i=1; i<order.length; ++i) {
      code.push(["for(i",i,"=0;i",i,"<n",i,";++i",i,"){"].join(""))
    }
    if(ptrs.length > 1) {
      for(var i=0; i<ptrs.length; ++i) {
        code.push(["ptr",i,"=b_ptr",i,"+ptr_shift"].join(""))
      }
    }
    code.push(body)
    for(var i=order.length-1; i>=1; --i) {
      if(usePivot) {
        code.push("pivot_ptr+=f"+i)
      }
      if(ptrs.length > 1) {
        code.push("ptr_shift+=e"+i)
      } else {
        code.push("ptr0+=e"+i)
      }
      code.push("}")
    }
  }
  
  function cleanUp() {
    if(order.length > 1 && allocator) {
      code.push("free(pivot1)", "free(pivot2)")
    }
  }
  
  function compareSwap(a_id, b_id) {
    var a = "el"+a_id
    var b = "el"+b_id
    if(order.length > 1) {
      var lbl = "__l" + (++labelCounter)
      lexicoLoop(lbl, [a, b], false, [
        "comp=",dataRead("ptr0"),"-",dataRead("ptr1"),"\n",
        "if(comp>0){tmp0=", a, ";",a,"=",b,";", b,"=tmp0;break ", lbl,"}\n",
        "if(comp<0){break ", lbl, "}"
      ].join(""))
    } else {
      code.push(["if(", dataRead(toPointer(a)), ">", dataRead(toPointer(b)), "){tmp0=", a, ";",a,"=",b,";", b,"=tmp0}"].join(""))
    }
  }
  
  compareSwap(1, 2)
  compareSwap(4, 5)
  compareSwap(1, 3)
  compareSwap(2, 3)
  compareSwap(1, 4)
  compareSwap(3, 4)
  compareSwap(2, 5)
  compareSwap(2, 3)
  compareSwap(4, 5)
  
  if(order.length > 1) {
    cacheLoop(["el1", "el2", "el3", "el4", "el5", "index1", "index3", "index5"], true, [
      "pivot1[pivot_ptr]=",dataRead("ptr1"),"\n",
      "pivot2[pivot_ptr]=",dataRead("ptr3"),"\n",
      "pivots_are_equal=pivots_are_equal&&(pivot1[pivot_ptr]===pivot2[pivot_ptr])\n",
      "x=",dataRead("ptr0"),"\n",
      "y=",dataRead("ptr2"),"\n",
      "z=",dataRead("ptr4"),"\n",
      dataWrite("ptr5", "x"),"\n",
      dataWrite("ptr6", "y"),"\n",
      dataWrite("ptr7", "z")
    ].join(""))
  } else {
    code.push([
      "pivot1=", dataRead(toPointer("el2")), "\n",
      "pivot2=", dataRead(toPointer("el4")), "\n",
      "pivots_are_equal=pivot1===pivot2\n",
      "x=", dataRead(toPointer("el1")), "\n",
      "y=", dataRead(toPointer("el3")), "\n",
      "z=", dataRead(toPointer("el5")), "\n",
      dataWrite(toPointer("index1"), "x"), "\n",
      dataWrite(toPointer("index3"), "y"), "\n",
      dataWrite(toPointer("index5"), "z")
    ].join(""))
  }
  

  function moveElement(dst, src) {
    if(order.length > 1) {
      cacheLoop([dst, src], false,
        dataWrite("ptr0", dataRead("ptr1"))
      )
    } else {
      code.push(dataWrite(toPointer(dst), dataRead(toPointer(src))))
    }
  }
  
  moveElement("index2", "left")
  moveElement("index4", "right")
  
  function comparePivot(result, ptr, n) {
    if(order.length > 1) {
      var lbl = "__l" + (++labelCounter)
      lexicoLoop(lbl, [ptr], true, [
        result,"=",dataRead("ptr0"),"-pivot",n,"[pivot_ptr]\n",
        "if(",result,"!==0){break ", lbl, "}"
      ].join(""))
    } else {
      code.push([result,"=", dataRead(toPointer(ptr)), "-pivot", n].join(""))
    }
  }
  
  function swapElements(a, b) {
    if(order.length > 1) {
      cacheLoop([a,b],false,[
        "tmp=",dataRead("ptr0"),"\n",
        dataWrite("ptr0", dataRead("ptr1")),"\n",
        dataWrite("ptr1", "tmp")
      ].join(""))
    } else {
      code.push([
        "ptr0=",toPointer(a),"\n",
        "ptr1=",toPointer(b),"\n",
        "tmp=",dataRead("ptr0"),"\n",
        dataWrite("ptr0", dataRead("ptr1")),"\n",
        dataWrite("ptr1", "tmp")
      ].join(""))
    }
  }
  
  function tripleSwap(k, less, great) {
    if(order.length > 1) {
      cacheLoop([k,less,great], false, [
        "tmp=",dataRead("ptr0"),"\n",
        dataWrite("ptr0", dataRead("ptr1")),"\n",
        dataWrite("ptr1", dataRead("ptr2")),"\n",
        dataWrite("ptr2", "tmp")
      ].join(""))
      code.push("++"+less, "--"+great)
    } else {
      code.push([
        "ptr0=",toPointer(k),"\n",
        "ptr1=",toPointer(less),"\n",
        "ptr2=",toPointer(great),"\n",
        "++",less,"\n",
        "--",great,"\n",
        "tmp=", dataRead("ptr0"), "\n",
        dataWrite("ptr0", dataRead("ptr1")), "\n",
        dataWrite("ptr1", dataRead("ptr2")), "\n",
        dataWrite("ptr2", "tmp")
      ].join(""))
    }
  }
  
  function swapAndDecrement(k, great) {
    swapElements(k, great)
    code.push("--"+great)
  }
    
  code.push("if(pivots_are_equal){")
    //Pivots are equal case
    code.push("for(k=less;k<=great;++k){")
      comparePivot("comp", "k", 1)
      code.push("if(comp===0){continue}")
      code.push("if(comp<0){")
        code.push("if(k!==less){")
          swapElements("k", "less")
        code.push("}")
        code.push("++less")
      code.push("}else{")
        code.push("while(true){")
          comparePivot("comp", "great", 1)
          code.push("if(comp>0){")
            code.push("great--")
          code.push("}else if(comp<0){")
            tripleSwap("k", "less", "great")
            code.push("break")
          code.push("}else{")
            swapAndDecrement("k", "great")
            code.push("break")
          code.push("}")
        code.push("}")
      code.push("}")
    code.push("}")
  code.push("}else{")
    //Pivots not equal case
    code.push("for(k=less;k<=great;++k){")
      comparePivot("comp_pivot1", "k", 1)
      code.push("if(comp_pivot1<0){")
        code.push("if(k!==less){")
          swapElements("k", "less")
        code.push("}")
        code.push("++less")
      code.push("}else{")
        comparePivot("comp_pivot2", "k", 2)
        code.push("if(comp_pivot2>0){")
          code.push("while(true){")
            comparePivot("comp", "great", 2)
            code.push("if(comp>0){")
              code.push("if(--great<k){break}")
              code.push("continue")
            code.push("}else{")
              comparePivot("comp", "great", 1)
              code.push("if(comp<0){")
                tripleSwap("k", "less", "great")
              code.push("}else{")
                swapAndDecrement("k", "great")
              code.push("}")
              code.push("break")
            code.push("}")
          code.push("}")
        code.push("}")
      code.push("}")
    code.push("}")
  code.push("}")
  
  //Move pivots to correct place
  function storePivot(mem_dest, pivot_dest, pivot) {
    if(order.length>1) {
      cacheLoop([mem_dest, pivot_dest], true, [
        dataWrite("ptr0", dataRead("ptr1")), "\n",
        dataWrite("ptr1", ["pivot",pivot,"[pivot_ptr]"].join(""))
      ].join(""))
    } else {
      code.push(
          dataWrite(toPointer(mem_dest), dataRead(toPointer(pivot_dest))),
          dataWrite(toPointer(pivot_dest), "pivot"+pivot))
    }
  }
  
  storePivot("left", "(less-1)", 1)
  storePivot("right", "(great+1)", 2)

  //Recursive sort call
  function doSort(left, right) {
    code.push([
      "if((",right,"-",left,")<=",INSERTION_SORT_THRESHOLD,"){\n",
        "insertionSort(", left, ",", right, ",data,offset,", shapeArgs(order.length).join(","), ")\n",
      "}else{\n",
        funcName, "(", left, ",", right, ",data,offset,", shapeArgs(order.length).join(","), ")\n",
      "}"
    ].join(""))
  }
  doSort("left", "(less-2)")
  doSort("(great+2)", "right")
  
  //If pivots are equal, then early out
  code.push("if(pivots_are_equal){")
    cleanUp()
    code.push("return")
  code.push("}")
  
  function walkPointer(ptr, pivot, body) {
    if(order.length > 1) {
      code.push(["__l",++labelCounter,":while(true){"].join(""))
      cacheLoop([ptr], true, [
        "if(", dataRead("ptr0"), "!==pivot", pivot, "[pivot_ptr]){break __l", labelCounter, "}"
      ].join(""))
      code.push(body, "}")
    } else {
      code.push(["while(", dataRead(toPointer(ptr)), "===pivot", pivot, "){", body, "}"].join(""))
    }
  }
  
  //Check bounds
  code.push("if(less<index1&&great>index5){")
  
    walkPointer("less", 1, "++less")
    walkPointer("great", 2, "--great")
  
    code.push("for(k=less;k<=great;++k){")
      comparePivot("comp_pivot1", "k", 1)
      code.push("if(comp_pivot1===0){")
        code.push("if(k!==less){")
          swapElements("k", "less")
        code.push("}")
        code.push("++less")
      code.push("}else{")
        comparePivot("comp_pivot2", "k", 2)
        code.push("if(comp_pivot2===0){")
          code.push("while(true){")
            comparePivot("comp", "great", 2)
            code.push("if(comp===0){")
              code.push("if(--great<k){break}")
              code.push("continue")
            code.push("}else{")
              comparePivot("comp", "great", 1)
              code.push("if(comp<0){")
                tripleSwap("k", "less", "great")
              code.push("}else{")
                swapAndDecrement("k", "great")
              code.push("}")
              code.push("break")
            code.push("}")
          code.push("}")
        code.push("}")
      code.push("}")
    code.push("}")
  code.push("}")
  
  //Clean up and do a final sorting pass
  cleanUp()
  doSort("less", "great")
 
  //Close off main loop
  code.push("}return " + funcName)
  
  //Compile and link
  if(order.length > 1 && allocator) {
    var compiled = new Function("insertionSort", "malloc", "free", code.join("\n"))
    return compiled(insertionSort, allocator[0], allocator[1])
  }
  var compiled = new Function("insertionSort", code.join("\n"))
  return compiled(insertionSort)
}

function compileSort(order, dtype) {
  var code = ["'use strict'"]
  var funcName = ["ndarraySortWrapper", order.join("d"), dtype].join("")
  var funcArgs = [ "array" ]
  
  code.push(["function ", funcName, "(", funcArgs.join(","), "){"].join(""))
  
  //Unpack local variables from array
  var vars = ["data=array.data,offset=array.offset|0,shape=array.shape,stride=array.stride"]
  for(var i=0; i<order.length; ++i) {
    vars.push(["s",i,"=stride[",i,"]|0,n",i,"=shape[",i,"]|0"].join(""))
  }
  
  var scratch_stride = new Array(order.length)
  var nprod = []
  for(var i=0; i<order.length; ++i) {
    var k = order[i]
    if(k === 0) {
      continue
    }
    if(nprod.length === 0) {
      scratch_stride[k] = "1"
    } else {
      scratch_stride[k] = nprod.join("*")
    }
    nprod.push("n"+k)
  }
  
  var p = -1, q = -1
  for(var i=0; i<order.length; ++i) {
    var j = order[i]
    if(j !== 0) {
      if(p > 0) {
        vars.push(["d",j,"=s",j,"-d",p,"*n",p].join(""))
      } else {
        vars.push(["d",j,"=s",j].join(""))
      }
      p = j
    }
    var k = order.length-1-i
    if(k !== 0) {
      if(q > 0) {
        vars.push(["e",k,"=s",k,"-e",q,"*n",q,
                  ",f",k,"=",scratch_stride[k],"-f",q,"*n",q].join(""))
      } else {
        vars.push(["e",k,"=s",k,",f",k,"=",scratch_stride[k]].join(""))
      }
      q = k
    }
  }
  
  //Declare local variables
  code.push("var " + vars.join(","))
  
  //Create arguments for subroutine
  var sortArgs = ["0", "n0-1", "data", "offset"].concat(shapeArgs(order.length))
  
  //Call main sorting routine
  code.push([
    "if(n0<=",INSERTION_SORT_THRESHOLD,"){",
      "insertionSort(", sortArgs.join(","), ")}else{",
      "quickSort(", sortArgs.join(","),
    ")}"
  ].join(""))
  
  //Return
  code.push("}return " + funcName)
  
  //Link everything together
  var result = new Function("insertionSort", "quickSort", code.join("\n"))
  var insertionSort = createInsertionSort(order, dtype)
  var quickSort = createQuickSort(order, dtype, insertionSort)
  return result(insertionSort, quickSort)
}

module.exports = compileSort

/***/ }),

/***/ "./node_modules/ndarray-sort/sort.js":
/*!*******************************************!*\
  !*** ./node_modules/ndarray-sort/sort.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var compile = __webpack_require__(/*! ./lib/compile_sort.js */ "./node_modules/ndarray-sort/lib/compile_sort.js")
var CACHE = {}

function sort(array) {
  var order = array.order
  var dtype = array.dtype
  var typeSig = [order, dtype ]
  var typeName = typeSig.join(":")
  var compiled = CACHE[typeName]
  if(!compiled) {
    CACHE[typeName] = compiled = compile(order, dtype)
  }
  compiled(array)
  return array
}

module.exports = sort

/***/ }),

/***/ "./node_modules/normals/normals.js":
/*!*****************************************!*\
  !*** ./node_modules/normals/normals.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

var DEFAULT_NORMALS_EPSILON = 1e-6;
var DEFAULT_FACE_EPSILON = 1e-6;

//Estimate the vertex normals of a mesh
exports.vertexNormals = function(faces, positions, specifiedEpsilon) {

  var N         = positions.length;
  var normals   = new Array(N);
  var epsilon   = specifiedEpsilon === void(0) ? DEFAULT_NORMALS_EPSILON : specifiedEpsilon;

  //Initialize normal array
  for(var i=0; i<N; ++i) {
    normals[i] = [0.0, 0.0, 0.0];
  }

  //Walk over all the faces and add per-vertex contribution to normal weights
  for(var i=0; i<faces.length; ++i) {
    var f = faces[i];
    var p = 0;
    var c = f[f.length-1];
    var n = f[0];
    for(var j=0; j<f.length; ++j) {

      //Shift indices back
      p = c;
      c = n;
      n = f[(j+1) % f.length];

      var v0 = positions[p];
      var v1 = positions[c];
      var v2 = positions[n];

      //Compute infineteismal arcs
      var d01 = new Array(3);
      var m01 = 0.0;
      var d21 = new Array(3);
      var m21 = 0.0;
      for(var k=0; k<3; ++k) {
        d01[k] = v0[k]  - v1[k];
        m01   += d01[k] * d01[k];
        d21[k] = v2[k]  - v1[k];
        m21   += d21[k] * d21[k];
      }

      //Accumulate values in normal
      if(m01 * m21 > epsilon) {
        var norm = normals[c];
        var w = 1.0 / Math.sqrt(m01 * m21);
        for(var k=0; k<3; ++k) {
          var u = (k+1)%3;
          var v = (k+2)%3;
          norm[k] += w * (d21[u] * d01[v] - d21[v] * d01[u]);
        }
      }
    }
  }

  //Scale all normals to unit length
  for(var i=0; i<N; ++i) {
    var norm = normals[i];
    var m = 0.0;
    for(var k=0; k<3; ++k) {
      m += norm[k] * norm[k];
    }
    if(m > epsilon) {
      var w = 1.0 / Math.sqrt(m);
      for(var k=0; k<3; ++k) {
        norm[k] *= w;
      }
    } else {
      for(var k=0; k<3; ++k) {
        norm[k] = 0.0;
      }
    }
  }

  //Return the resulting set of patches
  return normals;
}

//Compute face normals of a mesh
exports.faceNormals = function(faces, positions, specifiedEpsilon) {

  var N         = faces.length;
  var normals   = new Array(N);
  var epsilon   = specifiedEpsilon === void(0) ? DEFAULT_FACE_EPSILON : specifiedEpsilon;

  for(var i=0; i<N; ++i) {
    var f = faces[i];
    var pos = new Array(3);
    for(var j=0; j<3; ++j) {
      pos[j] = positions[f[j]];
    }

    var d01 = new Array(3);
    var d21 = new Array(3);
    for(var j=0; j<3; ++j) {
      d01[j] = pos[1][j] - pos[0][j];
      d21[j] = pos[2][j] - pos[0][j];
    }

    var n = new Array(3);
    var l = 0.0;
    for(var j=0; j<3; ++j) {
      var u = (j+1)%3;
      var v = (j+2)%3;
      n[j] = d01[u] * d21[v] - d01[v] * d21[u];
      l += n[j] * n[j];
    }
    if(l > epsilon) {
      l = 1.0 / Math.sqrt(l);
    } else {
      l = 0.0;
    }
    for(var j=0; j<3; ++j) {
      n[j] *= l;
    }
    normals[i] = n;
  }
  return normals;
}




/***/ }),

/***/ "./node_modules/polytope-closest-point/lib/closest_point_2d.js":
/*!*********************************************************************!*\
  !*** ./node_modules/polytope-closest-point/lib/closest_point_2d.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
//Optimized version for triangle closest point
// Based on Eberly's WildMagick codes
// http://www.geometrictools.com/LibMathematics/Distance/Distance.html


var diff = new Float64Array(4);
var edge0 = new Float64Array(4);
var edge1 = new Float64Array(4);

function closestPoint2d(V0, V1, V2, point, result) {
  //Reallocate buffers if necessary
  if(diff.length < point.length) {
    diff = new Float64Array(point.length);
    edge0 = new Float64Array(point.length);
    edge1 = new Float64Array(point.length);
  }
  //Compute edges
  for(var i=0; i<point.length; ++i) {
    diff[i]  = V0[i] - point[i];
    edge0[i] = V1[i] - V0[i];
    edge1[i] = V2[i] - V0[i];
  }
  //Compute coefficients for quadratic func
  var a00 = 0.0
    , a01 = 0.0
    , a11 = 0.0
    , b0  = 0.0
    , b1  = 0.0
    , c   = 0.0;
  for(var i=0; i<point.length; ++i) {
    var e0 = edge0[i]
      , e1 = edge1[i]
      , d  = diff[i];
    a00 += e0 * e0;
    a01 += e0 * e1;
    a11 += e1 * e1;
    b0  += d * e0;
    b1  += d * e1;
    c   += d * d;
  }
  //Compute determinant/coeffs
  var det = Math.abs(a00*a11 - a01*a01);
  var s   = a01*b1 - a11*b0;
  var t   = a01*b0 - a00*b1;
  var sqrDistance;
  //Hardcoded Voronoi diagram classification
  if (s + t <= det) {
    if (s < 0) {
      if (t < 0) { // region 4
        if (b0 < 0) {
          t = 0;
          if (-b0 >= a00) {
            s = 1.0;
            sqrDistance = a00 + 2.0*b0 + c;
          } else {
            s = -b0/a00;
            sqrDistance = b0*s + c;
          }
        } else {
          s = 0;
          if (b1 >= 0) {
            t = 0;
            sqrDistance = c;
          } else if (-b1 >= a11) {
            t = 1;
            sqrDistance = a11 + 2.0*b1 + c;
          } else {
            t = -b1/a11;
            sqrDistance = b1*t + c;
          }
        }
      } else {  // region 3
        s = 0;
        if (b1 >= 0) {
          t = 0;
          sqrDistance = c;
        } else if (-b1 >= a11) {
          t = 1;
          sqrDistance = a11 + 2.0*b1 + c;
        } else {
          t = -b1/a11;
          sqrDistance = b1*t + c;
        }
      }
    } else if (t < 0) { // region 5
      t = 0;
      if (b0 >= 0) {
        s = 0;
        sqrDistance = c;
      } else if (-b0 >= a00) {
        s = 1;
        sqrDistance = a00 + 2.0*b0 + c;
      } else {
        s = -b0/a00;
        sqrDistance = b0*s + c;
      }
    } else {  // region 0
      // minimum at interior point
      var invDet = 1.0 / det;
      s *= invDet;
      t *= invDet;
      sqrDistance = s*(a00*s + a01*t + 2.0*b0) + t*(a01*s + a11*t + 2.0*b1) + c;
    }
  } else {
    var tmp0, tmp1, numer, denom;
    
    if (s < 0) {  // region 2
      tmp0 = a01 + b0;
      tmp1 = a11 + b1;
      if (tmp1 > tmp0) {
        numer = tmp1 - tmp0;
        denom = a00 - 2.0*a01 + a11;
        if (numer >= denom) {
          s = 1;
          t = 0;
          sqrDistance = a00 + 2.0*b0 + c;
        } else {
          s = numer/denom;
          t = 1 - s;
          sqrDistance = s*(a00*s + a01*t + 2.0*b0) +
          t*(a01*s + a11*t + 2.0*b1) + c;
        }
      } else {
        s = 0;
        if (tmp1 <= 0) {
          t = 1;
          sqrDistance = a11 + 2.0*b1 + c;
        } else if (b1 >= 0) {
          t = 0;
          sqrDistance = c;
        } else {
          t = -b1/a11;
          sqrDistance = b1*t + c;
        }
      }
    } else if (t < 0) {  // region 6
      tmp0 = a01 + b1;
      tmp1 = a00 + b0;
      if (tmp1 > tmp0) {
        numer = tmp1 - tmp0;
        denom = a00 - 2.0*a01 + a11;
        if (numer >= denom) {
          t = 1;
          s = 0;
          sqrDistance = a11 + 2.0*b1 + c;
        } else {
          t = numer/denom;
          s = 1 - t;
          sqrDistance = s*(a00*s + a01*t + 2.0*b0) +
          t*(a01*s + a11*t + 2.0*b1) + c;
        }
      } else {
        t = 0;
        if (tmp1 <= 0) {
          s = 1;
          sqrDistance = a00 + 2.0*b0 + c;
        } else if (b0 >= 0) {
          s = 0;
          sqrDistance = c;
        } else {
          s = -b0/a00;
          sqrDistance = b0*s + c;
        }
      }
    } else {  // region 1
      numer = a11 + b1 - a01 - b0;
      if (numer <= 0) {
        s = 0;
        t = 1;
        sqrDistance = a11 + 2.0*b1 + c;
      } else {
        denom = a00 - 2.0*a01 + a11;
        if (numer >= denom) {
          s = 1;
          t = 0;
          sqrDistance = a00 + 2.0*b0 + c;
        } else {
          s = numer/denom;
          t = 1 - s;
          sqrDistance = s*(a00*s + a01*t + 2.0*b0) +
          t*(a01*s + a11*t + 2.0*b1) + c;
        }
      }
    }
  }
  var u = 1.0 - s - t;
  for(var i=0; i<point.length; ++i) {
    result[i] = u * V0[i] + s * V1[i] + t * V2[i];
  }
  if(sqrDistance < 0) {
    return 0;
  }
  return sqrDistance;
}

module.exports = closestPoint2d;


/***/ }),

/***/ "./node_modules/robust-compress/compress.js":
/*!**************************************************!*\
  !*** ./node_modules/robust-compress/compress.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


module.exports = compressExpansion

function compressExpansion(e) {
  var m = e.length
  var Q = e[e.length-1]
  var bottom = m
  for(var i=m-2; i>=0; --i) {
    var a = Q
    var b = e[i]
    Q = a + b
    var bv = Q - a
    var q = b - bv
    if(q) {
      e[--bottom] = Q
      Q = q
    }
  }
  var top = 0
  for(var i=bottom; i<m; ++i) {
    var a = e[i]
    var b = Q
    Q = a + b
    var bv = Q - a
    var q = b - bv
    if(q) {
      e[top++] = q
    }
  }
  e[top++] = Q
  e.length = top
  return e
}

/***/ }),

/***/ "./node_modules/robust-determinant/robust-determinant.js":
/*!***************************************************************!*\
  !*** ./node_modules/robust-determinant/robust-determinant.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var twoProduct = __webpack_require__(/*! two-product */ "./node_modules/two-product/two-product.js")
var robustSum = __webpack_require__(/*! robust-sum */ "./node_modules/robust-sum/robust-sum.js")
var robustScale = __webpack_require__(/*! robust-scale */ "./node_modules/robust-scale/robust-scale.js")
var compress = __webpack_require__(/*! robust-compress */ "./node_modules/robust-compress/compress.js")

var NUM_EXPANDED = 6

function cofactor(m, c) {
  var result = new Array(m.length-1)
  for(var i=1; i<m.length; ++i) {
    var r = result[i-1] = new Array(m.length-1)
    for(var j=0,k=0; j<m.length; ++j) {
      if(j === c) {
        continue
      }
      r[k++] = m[i][j]
    }
  }
  return result
}

function matrix(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = new Array(n)
    for(var j=0; j<n; ++j) {
      result[i][j] = ["m[", i, "][", j, "]"].join("")
    }
  }
  return result
}

function sign(n) {
  if(n & 1) {
    return "-"
  }
  return ""
}

function generateSum(expr) {
  if(expr.length === 1) {
    return expr[0]
  } else if(expr.length === 2) {
    return ["sum(", expr[0], ",", expr[1], ")"].join("")
  } else {
    var m = expr.length>>1
    return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("")
  }
}

function determinant(m) {
  if(m.length === 2) {
    return ["sum(prod(", m[0][0], ",", m[1][1], "),prod(-", m[0][1], ",", m[1][0], "))"].join("")
  } else {
    var expr = []
    for(var i=0; i<m.length; ++i) {
      expr.push(["scale(", determinant(cofactor(m, i)), ",", sign(i), m[0][i], ")"].join(""))
    }
    return generateSum(expr)
  }
}

function compileDeterminant(n) {
  var proc = new Function("sum", "scale", "prod", "compress", [
    "function robustDeterminant",n, "(m){return compress(", 
      determinant(matrix(n)),
    ")};return robustDeterminant", n].join(""))
  return proc(robustSum, robustScale, twoProduct, compress)
}

var CACHE = [
  function robustDeterminant0() { return [0] },
  function robustDeterminant1(m) { return [m[0][0]] }
]

function generateDispatch() {
  while(CACHE.length < NUM_EXPANDED) {
    CACHE.push(compileDeterminant(CACHE.length))
  }
  var procArgs = []
  var code = ["function robustDeterminant(m){switch(m.length){"]
  for(var i=0; i<NUM_EXPANDED; ++i) {
    procArgs.push("det" + i)
    code.push("case ", i, ":return det", i, "(m);")
  }
  code.push("}\
var det=CACHE[m.length];\
if(!det)\
det=CACHE[m.length]=gen(m.length);\
return det(m);\
}\
return robustDeterminant")
  procArgs.push("CACHE", "gen", code.join(""))
  var proc = Function.apply(undefined, procArgs)
  module.exports = proc.apply(undefined, CACHE.concat([CACHE, compileDeterminant]))
  for(var i=0; i<CACHE.length; ++i) {
    module.exports[i] = CACHE[i]
  }
}

generateDispatch()

/***/ }),

/***/ "./node_modules/robust-linear-solve/linsolve.js":
/*!******************************************************!*\
  !*** ./node_modules/robust-linear-solve/linsolve.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var determinant = __webpack_require__(/*! robust-determinant */ "./node_modules/robust-determinant/robust-determinant.js")

var NUM_EXPAND = 6

function generateSolver(n) {
  var funcName = "robustLinearSolve" + n + "d"
  var code = ["function ", funcName, "(A,b){return ["]
  for(var i=0; i<n; ++i) {
    code.push("det([")
    for(var j=0; j<n; ++j) {
      if(j > 0) {
        code.push(",")
      }
      code.push("[")
      for(var k=0; k<n; ++k) {
        if(k > 0) {
          code.push(",")
        }
        if(k === i) {
          code.push("+b[", j, "]")
        } else {
          code.push("+A[", j, "][", k, "]")
        }
      }
      code.push("]")
    }
    code.push("]),")
  }
  code.push("det(A)]}return ", funcName)
  var proc = new Function("det", code.join(""))
  if(n < 6) {
    return proc(determinant[n])
  }
  return proc(determinant)
}

function robustLinearSolve0d() {
  return [ 0 ]
}

function robustLinearSolve1d(A, b) {
  return [ [ b[0] ], [ A[0][0] ] ]
}

var CACHE = [
  robustLinearSolve0d,
  robustLinearSolve1d
]

function generateDispatch() {
  while(CACHE.length < NUM_EXPAND) {
    CACHE.push(generateSolver(CACHE.length))
  }
  var procArgs = []
  var code = ["function dispatchLinearSolve(A,b){switch(A.length){"]
  for(var i=0; i<NUM_EXPAND; ++i) {
    procArgs.push("s" + i)
    code.push("case ", i, ":return s", i, "(A,b);")
  }
  code.push("}var s=CACHE[A.length];if(!s)s=CACHE[A.length]=g(A.length);return s(A,b)}return dispatchLinearSolve")
  procArgs.push("CACHE", "g", code.join(""))
  var proc = Function.apply(undefined, procArgs)
  module.exports = proc.apply(undefined, CACHE.concat([CACHE, generateSolver]))
  for(var i=0; i<NUM_EXPAND; ++i) {
    module.exports[i] = CACHE[i]
  }
}

generateDispatch()

/***/ }),

/***/ "./node_modules/simplicial-complex-contour/contour.js":
/*!************************************************************!*\
  !*** ./node_modules/simplicial-complex-contour/contour.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = extractContour

var ndarray = __webpack_require__(/*! ndarray */ "./node_modules/ndarray/ndarray.js")
var pool    = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var ndsort  = __webpack_require__(/*! ndarray-sort */ "./node_modules/ndarray-sort/sort.js")

var contourAlgorithm = __webpack_require__(/*! ./lib/codegen */ "./node_modules/simplicial-complex-contour/lib/codegen.js")

function getDimension(cells) {
  var numCells = cells.length
  var d = 0
  for(var i=0; i<numCells; ++i) {
    d = Math.max(d, cells[i].length)|0
  }
  return d-1
}

function getSigns(values, level) {
  var numVerts    = values.length
  var vertexSigns = pool.mallocUint8(numVerts)
  for(var i=0; i<numVerts; ++i) {
    vertexSigns[i] = (values[i] < level)|0
  }
  return vertexSigns
}

function getEdges(cells, d) {
  var numCells = cells.length
  var maxEdges = ((d * (d+1)/2) * numCells)|0
  var edges    = pool.mallocUint32(maxEdges*2)
  var ePtr     = 0
  for(var i=0; i<numCells; ++i) {
    var c = cells[i]
    var d = c.length
    for(var j=0; j<d; ++j) {
      for(var k=0; k<j; ++k) {
        var a = c[k]
        var b = c[j]
        edges[ePtr++] = Math.min(a,b)|0
        edges[ePtr++] = Math.max(a,b)|0
      }
    }
  }
  var nedges = (ePtr/2)|0
  ndsort(ndarray(edges, [nedges,2])) 
  var ptr = 2
  for(var i=2; i<ePtr; i+=2) {
    if(edges[i-2] === edges[i] &&
       edges[i-1] === edges[i+1]) {
      continue
    }
    edges[ptr++] = edges[i]
    edges[ptr++] = edges[i+1]
  }

  return ndarray(edges, [(ptr/2)|0, 2])
}

function getCrossingWeights(edges, values, signs, level) {
  var edata     = edges.data
  var numEdges  = edges.shape[0]
  var weights   = pool.mallocDouble(numEdges)
  var ptr       = 0
  for(var i=0; i<numEdges; ++i) {
    var a  = edata[2*i]
    var b  = edata[2*i+1]
    if(signs[a] === signs[b]) {
      continue
    }
    var va = values[a]
    var vb = values[b]
    edata[2*ptr]     = a
    edata[2*ptr+1]   = b
    weights[ptr++]   = (vb - level) / (vb - va)
  }
  edges.shape[0] = ptr
  return ndarray(weights, [ptr])
}

function getCascade(edges, numVerts) {
  var result   = pool.mallocInt32(numVerts*2)
  var numEdges = edges.shape[0]
  var edata    = edges.data
  result[0]    = 0
  var lastV    = 0
  for(var i=0; i<numEdges; ++i) {
    var a = edata[2*i]
    if(a !== lastV) {
      result[2*lastV+1] = i
      while(++lastV < a) {
        result[2*lastV] = i
        result[2*lastV+1] = i
      }
      result[2*lastV] = i
    }
  }
  result[2*lastV+1] = numEdges
  while(++lastV < numVerts) {
    result[2*lastV] = result[2*lastV+1] = numEdges
  }
  return result
}

function unpackEdges(edges) {
  var ne = edges.shape[0]|0
  var edata = edges.data
  var result = new Array(ne)
  for(var i=0; i<ne; ++i) {
    result[i] = [edata[2*i], edata[2*i+1]]
  }
  return result
}

function extractContour(cells, values, level, d) {
  level = level||0.0

  //If user didn't specify `d`, use brute force scan
  if(typeof d === 'undefined') {
    d = getDimension(cells)
  }

  //Count number of cells
  var numCells = cells.length
  if(numCells === 0 || d < 1) {
    return {
      cells:         [],
      vertexIds:     [],
      vertexWeights: []
    }
  }

  //Read in vertex signs
  var vertexSigns = getSigns(values, +level)

  //First get 1-skeleton, find all crossings
  var edges   = getEdges(cells, d)
  var weights = getCrossingWeights(edges, values, vertexSigns, +level)

  //Build vertex cascade to speed up binary search
  var vcascade = getCascade(edges, values.length|0)

  //Then construct cells
  var faces = contourAlgorithm(d)(cells, edges.data, vcascade, vertexSigns)

  //Unpack data into pretty format
  var uedges   = unpackEdges(edges)
  var uweights = [].slice.call(weights.data, 0, weights.shape[0])

  //Release data
  pool.free(vertexSigns)
  pool.free(edges.data)
  pool.free(weights.data)
  pool.free(vcascade)
  
  return {
    cells:         faces,
    vertexIds:     uedges,
    vertexWeights: uweights
  }
}

/***/ }),

/***/ "./node_modules/simplicial-complex-contour/lib/codegen.js":
/*!****************************************************************!*\
  !*** ./node_modules/simplicial-complex-contour/lib/codegen.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = getPolygonizer

var pool = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var createMSTable = __webpack_require__(/*! marching-simplex-table */ "./node_modules/marching-simplex-table/mstab.js")

var CACHE = {}

function createCellPolygonizer(d) {
  var maxCellSize = 0
  var tables = new Array(d+1)
  tables[0] = [ [] ]
  for(var i=1; i<=d; ++i) {
    var tab = tables[i] = createMSTable(i)
    for(var j=0; j<tab.length; ++j) {
      maxCellSize = Math.max(maxCellSize, tab[i].length)
    }
  }

  var code  = [
  'function B(C,E,i,j){',
    'var a=Math.min(i,j)|0,b=Math.max(i,j)|0,l=C[2*a],h=C[2*a+1];',
    'while(l<h){',
      'var m=(l+h)>>1,v=E[2*m+1];',
      'if(v===b){return m}',
      'if(b<v){h=m}else{l=m+1}',
    '}',
    'return l;',
  '};',
  'function getContour', d, 'd(F,E,C,S){',
    'var n=F.length,R=[];',
    'for(var i=0;i<n;++i){var c=F[i],l=c.length;'
  ]

  function generateCase(facets) {
    if(facets.length <= 0) {
      return
    }
    code.push('R.push(')
    for(var i=0; i<facets.length; ++i) {
      var facet = facets[i]
      if(i > 0) {
        code.push(',')
      }
      code.push('[')
      for(var j=0; j<facet.length; ++j) {
        var f = facet[j]
        if(j > 0) {
          code.push(',')
        }
        code.push('B(C,E,c[', f[0], '],c[', f[1], '])')
      }
      code.push(']')
    }
    code.push(');')
  }

  for(var i=d+1; i>1; --i) {
    if(i < d+1) {
      code.push('else ')
    }
    code.push('if(l===', i, '){')

    //Generate mask
    var maskStr = []
    for(var j=0; j<i; ++j) {
      maskStr.push('(S[c['+j+']]<<'+j+')')
    }

    //Perform table look up
    code.push('var M=', maskStr.join('+'), 
      ';if(M===0||M===', (1<<i)-1, 
        '){continue}switch(M){')

    var tab = tables[i-1]
    for(var j=0; j<tab.length; ++j) {
      code.push('case ', j, ':')
      generateCase(tab[j])
      code.push('break;')
    }
    code.push('}}')
  }
  code.push('}return R;};return getContour', d, 'd')

  var proc = new Function('pool', code.join(''))
  return proc(pool)
}

function getPolygonizer(d) {
  var alg = CACHE[d]
  if(!alg) {
    alg = CACHE[d] = createCellPolygonizer(d) 
  }
  return alg
}

/***/ }),

/***/ "./node_modules/simplicial-complex/topology.js":
/*!*****************************************************!*\
  !*** ./node_modules/simplicial-complex/topology.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
 "use restrict";

var bits      = __webpack_require__(/*! bit-twiddle */ "./node_modules/bit-twiddle/twiddle.js")
  , UnionFind = __webpack_require__(/*! union-find */ "./node_modules/union-find/index.js")

//Returns the dimension of a cell complex
function dimension(cells) {
  var d = 0
    , max = Math.max
  for(var i=0, il=cells.length; i<il; ++i) {
    d = max(d, cells[i].length)
  }
  return d-1
}
exports.dimension = dimension

//Counts the number of vertices in faces
function countVertices(cells) {
  var vc = -1
    , max = Math.max
  for(var i=0, il=cells.length; i<il; ++i) {
    var c = cells[i]
    for(var j=0, jl=c.length; j<jl; ++j) {
      vc = max(vc, c[j])
    }
  }
  return vc+1
}
exports.countVertices = countVertices

//Returns a deep copy of cells
function cloneCells(cells) {
  var ncells = new Array(cells.length)
  for(var i=0, il=cells.length; i<il; ++i) {
    ncells[i] = cells[i].slice(0)
  }
  return ncells
}
exports.cloneCells = cloneCells

//Ranks a pair of cells up to permutation
function compareCells(a, b) {
  var n = a.length
    , t = a.length - b.length
    , min = Math.min
  if(t) {
    return t
  }
  switch(n) {
    case 0:
      return 0;
    case 1:
      return a[0] - b[0];
    case 2:
      var d = a[0]+a[1]-b[0]-b[1]
      if(d) {
        return d
      }
      return min(a[0],a[1]) - min(b[0],b[1])
    case 3:
      var l1 = a[0]+a[1]
        , m1 = b[0]+b[1]
      d = l1+a[2] - (m1+b[2])
      if(d) {
        return d
      }
      var l0 = min(a[0], a[1])
        , m0 = min(b[0], b[1])
        , d  = min(l0, a[2]) - min(m0, b[2])
      if(d) {
        return d
      }
      return min(l0+a[2], l1) - min(m0+b[2], m1)
    
    //TODO: Maybe optimize n=4 as well?
    
    default:
      var as = a.slice(0)
      as.sort()
      var bs = b.slice(0)
      bs.sort()
      for(var i=0; i<n; ++i) {
        t = as[i] - bs[i]
        if(t) {
          return t
        }
      }
      return 0
  }
}
exports.compareCells = compareCells

function compareZipped(a, b) {
  return compareCells(a[0], b[0])
}

//Puts a cell complex into normal order for the purposes of findCell queries
function normalize(cells, attr) {
  if(attr) {
    var len = cells.length
    var zipped = new Array(len)
    for(var i=0; i<len; ++i) {
      zipped[i] = [cells[i], attr[i]]
    }
    zipped.sort(compareZipped)
    for(var i=0; i<len; ++i) {
      cells[i] = zipped[i][0]
      attr[i] = zipped[i][1]
    }
    return cells
  } else {
    cells.sort(compareCells)
    return cells
  }
}
exports.normalize = normalize

//Removes all duplicate cells in the complex
function unique(cells) {
  if(cells.length === 0) {
    return []
  }
  var ptr = 1
    , len = cells.length
  for(var i=1; i<len; ++i) {
    var a = cells[i]
    if(compareCells(a, cells[i-1])) {
      if(i === ptr) {
        ptr++
        continue
      }
      cells[ptr++] = a
    }
  }
  cells.length = ptr
  return cells
}
exports.unique = unique;

//Finds a cell in a normalized cell complex
function findCell(cells, c) {
  var lo = 0
    , hi = cells.length-1
    , r  = -1
  while (lo <= hi) {
    var mid = (lo + hi) >> 1
      , s   = compareCells(cells[mid], c)
    if(s <= 0) {
      if(s === 0) {
        r = mid
      }
      lo = mid + 1
    } else if(s > 0) {
      hi = mid - 1
    }
  }
  return r
}
exports.findCell = findCell;

//Builds an index for an n-cell.  This is more general than dual, but less efficient
function incidence(from_cells, to_cells) {
  var index = new Array(from_cells.length)
  for(var i=0, il=index.length; i<il; ++i) {
    index[i] = []
  }
  var b = []
  for(var i=0, n=to_cells.length; i<n; ++i) {
    var c = to_cells[i]
    var cl = c.length
    for(var k=1, kn=(1<<cl); k<kn; ++k) {
      b.length = bits.popCount(k)
      var l = 0
      for(var j=0; j<cl; ++j) {
        if(k & (1<<j)) {
          b[l++] = c[j]
        }
      }
      var idx=findCell(from_cells, b)
      if(idx < 0) {
        continue
      }
      while(true) {
        index[idx++].push(i)
        if(idx >= from_cells.length || compareCells(from_cells[idx], b) !== 0) {
          break
        }
      }
    }
  }
  return index
}
exports.incidence = incidence

//Computes the dual of the mesh.  This is basically an optimized version of buildIndex for the situation where from_cells is just the list of vertices
function dual(cells, vertex_count) {
  if(!vertex_count) {
    return incidence(unique(skeleton(cells, 0)), cells, 0)
  }
  var res = new Array(vertex_count)
  for(var i=0; i<vertex_count; ++i) {
    res[i] = []
  }
  for(var i=0, len=cells.length; i<len; ++i) {
    var c = cells[i]
    for(var j=0, cl=c.length; j<cl; ++j) {
      res[c[j]].push(i)
    }
  }
  return res
}
exports.dual = dual

//Enumerates all cells in the complex
function explode(cells) {
  var result = []
  for(var i=0, il=cells.length; i<il; ++i) {
    var c = cells[i]
      , cl = c.length|0
    for(var j=1, jl=(1<<cl); j<jl; ++j) {
      var b = []
      for(var k=0; k<cl; ++k) {
        if((j >>> k) & 1) {
          b.push(c[k])
        }
      }
      result.push(b)
    }
  }
  return normalize(result)
}
exports.explode = explode

//Enumerates all of the n-cells of a cell complex
function skeleton(cells, n) {
  if(n < 0) {
    return []
  }
  var result = []
    , k0     = (1<<(n+1))-1
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i]
    for(var k=k0; k<(1<<c.length); k=bits.nextCombination(k)) {
      var b = new Array(n+1)
        , l = 0
      for(var j=0; j<c.length; ++j) {
        if(k & (1<<j)) {
          b[l++] = c[j]
        }
      }
      result.push(b)
    }
  }
  return normalize(result)
}
exports.skeleton = skeleton;

//Computes the boundary of all cells, does not remove duplicates
function boundary(cells) {
  var res = []
  for(var i=0,il=cells.length; i<il; ++i) {
    var c = cells[i]
    for(var j=0,cl=c.length; j<cl; ++j) {
      var b = new Array(c.length-1)
      for(var k=0, l=0; k<cl; ++k) {
        if(k !== j) {
          b[l++] = c[k]
        }
      }
      res.push(b)
    }
  }
  return normalize(res)
}
exports.boundary = boundary;

//Computes connected components for a dense cell complex
function connectedComponents_dense(cells, vertex_count) {
  var labels = new UnionFind(vertex_count)
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i]
    for(var j=0; j<c.length; ++j) {
      for(var k=j+1; k<c.length; ++k) {
        labels.link(c[j], c[k])
      }
    }
  }
  var components = []
    , component_labels = labels.ranks
  for(var i=0; i<component_labels.length; ++i) {
    component_labels[i] = -1
  }
  for(var i=0; i<cells.length; ++i) {
    var l = labels.find(cells[i][0])
    if(component_labels[l] < 0) {
      component_labels[l] = components.length
      components.push([cells[i].slice(0)])
    } else {
      components[component_labels[l]].push(cells[i].slice(0))
    }
  }
  return components
}

//Computes connected components for a sparse graph
function connectedComponents_sparse(cells) {
  var vertices  = unique(normalize(skeleton(cells, 0)))
    , labels    = new UnionFind(vertices.length)
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i]
    for(var j=0; j<c.length; ++j) {
      var vj = findCell(vertices, [c[j]])
      for(var k=j+1; k<c.length; ++k) {
        labels.link(vj, findCell(vertices, [c[k]]))
      }
    }
  }
  var components        = []
    , component_labels  = labels.ranks
  for(var i=0; i<component_labels.length; ++i) {
    component_labels[i] = -1
  }
  for(var i=0; i<cells.length; ++i) {
    var l = labels.find(findCell(vertices, [cells[i][0]]));
    if(component_labels[l] < 0) {
      component_labels[l] = components.length
      components.push([cells[i].slice(0)])
    } else {
      components[component_labels[l]].push(cells[i].slice(0))
    }
  }
  return components
}

//Computes connected components for a cell complex
function connectedComponents(cells, vertex_count) {
  if(vertex_count) {
    return connectedComponents_dense(cells, vertex_count)
  }
  return connectedComponents_sparse(cells)
}
exports.connectedComponents = connectedComponents


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2FmZmluZS1odWxsL2FmZi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2JhcnljZW50cmljL2JhcnljZW50cmljLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvY29udmV4LWh1bGwvY2guanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9jb252ZXgtaHVsbC9saWIvY2gxZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2NvbnZleC1odWxsL2xpYi9jaDJkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvY29udmV4LWh1bGwvbGliL2NobmQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1tZXNoM2QvbGliL2Nsb3Nlc3QtcG9pbnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1tZXNoM2QvbGliL3NoYWRlcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1tZXNoM2QvbWVzaC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2luY3JlbWVudGFsLWNvbnZleC1odWxsL2ljaC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL21hcmNoaW5nLXNpbXBsZXgtdGFibGUvbXN0YWIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9tb25vdG9uZS1jb252ZXgtaHVsbC0yZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL25kYXJyYXktc29ydC9saWIvY29tcGlsZV9zb3J0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvbmRhcnJheS1zb3J0L3NvcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9ub3JtYWxzL25vcm1hbHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wb2x5dG9wZS1jbG9zZXN0LXBvaW50L2xpYi9jbG9zZXN0X3BvaW50XzJkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcm9idXN0LWNvbXByZXNzL2NvbXByZXNzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcm9idXN0LWRldGVybWluYW50L3JvYnVzdC1kZXRlcm1pbmFudC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3JvYnVzdC1saW5lYXItc29sdmUvbGluc29sdmUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9zaW1wbGljaWFsLWNvbXBsZXgtY29udG91ci9jb250b3VyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvc2ltcGxpY2lhbC1jb21wbGV4LWNvbnRvdXIvbGliL2NvZGVnZW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9zaW1wbGljaWFsLWNvbXBsZXgvdG9wb2xvZ3kuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQVk7O0FBRVo7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLDRFQUFvQjs7QUFFekM7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQSxjQUFjLGtCQUFrQjtBQUNoQyw0QkFBNEIsTUFBTTtBQUNsQztBQUNBLGtCQUFrQixLQUFLO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNu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O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLEtBQUs7QUFDekI7QUFDQTtBQUNBLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLEtBQUs7QUFDekI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLEtBQUs7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLEtBQUs7QUFDbkI7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxlQUFlO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxlQUFlO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUM5QjtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLE1BQU07QUFDcEM7QUFDQSw0QkFBNEIsTUFBTTtBQUNsQztBQUNBLHVCQUF1QixNQUFNO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQSxnQkFBZ0IsWUFBWTtBQUM1QixvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDJCQUEyQjtBQUN6QztBQUNBO0FBQ0EsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZ0JBQWdCO0FBQzlCO0FBQ0EsZ0JBQWdCLFlBQVk7QUFDNUI7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDJCQUEyQjtBQUN6QztBQUNBO0FBQ0EsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiIsImZpbGUiOiJjaGFydDQ4ZjA3MTk0ZjdiYWJhOWYwOGExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYWZmaW5lSHVsbFxuXG52YXIgb3JpZW50ID0gcmVxdWlyZSgncm9idXN0LW9yaWVudGF0aW9uJylcblxuZnVuY3Rpb24gbGluZWFybHlJbmRlcGVuZGVudChwb2ludHMsIGQpIHtcbiAgdmFyIG5odWxsID0gbmV3IEFycmF5KGQrMSlcbiAgZm9yKHZhciBpPTA7IGk8cG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgbmh1bGxbaV0gPSBwb2ludHNbaV1cbiAgfVxuICBmb3IodmFyIGk9MDsgaTw9cG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgZm9yKHZhciBqPXBvaW50cy5sZW5ndGg7IGo8PWQ7ICsraikge1xuICAgICAgdmFyIHggPSBuZXcgQXJyYXkoZClcbiAgICAgIGZvcih2YXIgaz0wOyBrPGQ7ICsraykge1xuICAgICAgICB4W2tdID0gTWF0aC5wb3coaisxLWksIGspXG4gICAgICB9XG4gICAgICBuaHVsbFtqXSA9IHhcbiAgICB9XG4gICAgdmFyIG8gPSBvcmllbnQuYXBwbHkodm9pZCAwLCBuaHVsbClcbiAgICBpZihvKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gYWZmaW5lSHVsbChwb2ludHMpIHtcbiAgdmFyIG4gPSBwb2ludHMubGVuZ3RoXG4gIGlmKG4gPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBpZihuID09PSAxKSB7XG4gICAgcmV0dXJuIFswXVxuICB9XG4gIHZhciBkID0gcG9pbnRzWzBdLmxlbmd0aFxuICB2YXIgZnJhbWUgPSBbIHBvaW50c1swXSBdXG4gIHZhciBpbmRleCA9IFsgMCBdXG4gIGZvcih2YXIgaT0xOyBpPG47ICsraSkge1xuICAgIGZyYW1lLnB1c2gocG9pbnRzW2ldKVxuICAgIGlmKCFsaW5lYXJseUluZGVwZW5kZW50KGZyYW1lLCBkKSkge1xuICAgICAgZnJhbWUucG9wKClcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGluZGV4LnB1c2goaSlcbiAgICBpZihpbmRleC5sZW5ndGggPT09IGQrMSkge1xuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmRleFxufSIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhcnljZW50cmljXG5cbnZhciBzb2x2ZSA9IHJlcXVpcmUoJ3JvYnVzdC1saW5lYXItc29sdmUnKVxuXG5mdW5jdGlvbiByZWR1Y2UoeCkge1xuICB2YXIgciA9IDBcbiAgZm9yKHZhciBpPTA7IGk8eC5sZW5ndGg7ICsraSkge1xuICAgIHIgKz0geFtpXVxuICB9XG4gIHJldHVybiByXG59XG5cbmZ1bmN0aW9uIGJhcnljZW50cmljKHNpbXBsZXgsIHBvaW50KSB7XG4gIHZhciBkID0gcG9pbnQubGVuZ3RoXG4gIHZhciBBID0gbmV3IEFycmF5KGQrMSlcbiAgZm9yKHZhciBpPTA7IGk8ZDsgKytpKSB7XG4gICAgdmFyIHJvdyA9IG5ldyBBcnJheShkKzEpXG4gICAgZm9yKHZhciBqPTA7IGo8PWQ7ICsraikge1xuICAgICAgcm93W2pdID0gc2ltcGxleFtqXVtpXVxuICAgIH1cbiAgICBBW2ldID0gcm93XG4gIH1cbiAgQVtkXSA9IG5ldyBBcnJheShkKzEpXG4gIGZvcih2YXIgaT0wOyBpPD1kOyArK2kpIHtcbiAgICBBW2RdW2ldID0gMVxuICB9XG5cbiAgdmFyIGIgPSBuZXcgQXJyYXkoZCsxKVxuICBmb3IodmFyIGk9MDsgaTxkOyArK2kpIHtcbiAgICBiW2ldID0gcG9pbnRbaV1cbiAgfVxuICBiW2RdID0gMS4wXG5cbiAgdmFyIHggPSBzb2x2ZShBLCBiKVxuICB2YXIgdyA9IHJlZHVjZSh4W2QrMV0pXG4gIFxuICBpZih3ID09PSAwKSB7XG4gICAgdyA9IDEuMFxuICB9XG4gIHZhciB5ID0gbmV3IEFycmF5KGQrMSlcbiAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgIHlbaV0gPSByZWR1Y2UoeFtpXSkgLyB3XG4gIH1cbiAgcmV0dXJuIHlcbn0iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgY29udmV4SHVsbDFkID0gcmVxdWlyZSgnLi9saWIvY2gxZCcpXG52YXIgY29udmV4SHVsbDJkID0gcmVxdWlyZSgnLi9saWIvY2gyZCcpXG52YXIgY29udmV4SHVsbG5kID0gcmVxdWlyZSgnLi9saWIvY2huZCcpXG5cbm1vZHVsZS5leHBvcnRzID0gY29udmV4SHVsbFxuXG5mdW5jdGlvbiBjb252ZXhIdWxsKHBvaW50cykge1xuICB2YXIgbiA9IHBvaW50cy5sZW5ndGhcbiAgaWYobiA9PT0gMCkge1xuICAgIHJldHVybiBbXVxuICB9IGVsc2UgaWYobiA9PT0gMSkge1xuICAgIHJldHVybiBbWzBdXVxuICB9XG4gIHZhciBkID0gcG9pbnRzWzBdLmxlbmd0aFxuICBpZihkID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH0gZWxzZSBpZihkID09PSAxKSB7XG4gICAgcmV0dXJuIGNvbnZleEh1bGwxZChwb2ludHMpXG4gIH0gZWxzZSBpZihkID09PSAyKSB7XG4gICAgcmV0dXJuIGNvbnZleEh1bGwyZChwb2ludHMpXG4gIH1cbiAgcmV0dXJuIGNvbnZleEh1bGxuZChwb2ludHMsIGQpXG59IiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBjb252ZXhIdWxsMWRcblxuZnVuY3Rpb24gY29udmV4SHVsbDFkKHBvaW50cykge1xuICB2YXIgbG8gPSAwXG4gIHZhciBoaSA9IDBcbiAgZm9yKHZhciBpPTE7IGk8cG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYocG9pbnRzW2ldWzBdIDwgcG9pbnRzW2xvXVswXSkge1xuICAgICAgbG8gPSBpXG4gICAgfVxuICAgIGlmKHBvaW50c1tpXVswXSA+IHBvaW50c1toaV1bMF0pIHtcbiAgICAgIGhpID0gaVxuICAgIH1cbiAgfVxuICBpZihsbyA8IGhpKSB7XG4gICAgcmV0dXJuIFtbbG9dLCBbaGldXVxuICB9IGVsc2UgaWYobG8gPiBoaSkge1xuICAgIHJldHVybiBbW2hpXSwgW2xvXV1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW1tsb11dXG4gIH1cbn0iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjb252ZXhIdWxsMkRcblxudmFyIG1vbm90b25lSHVsbCA9IHJlcXVpcmUoJ21vbm90b25lLWNvbnZleC1odWxsLTJkJylcblxuZnVuY3Rpb24gY29udmV4SHVsbDJEKHBvaW50cykge1xuICB2YXIgaHVsbCA9IG1vbm90b25lSHVsbChwb2ludHMpXG4gIHZhciBoID0gaHVsbC5sZW5ndGhcbiAgaWYoaCA8PSAyKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgdmFyIGVkZ2VzID0gbmV3IEFycmF5KGgpXG4gIHZhciBhID0gaHVsbFtoLTFdXG4gIGZvcih2YXIgaT0wOyBpPGg7ICsraSkge1xuICAgIHZhciBiID0gaHVsbFtpXVxuICAgIGVkZ2VzW2ldID0gW2EsYl1cbiAgICBhID0gYlxuICB9XG4gIHJldHVybiBlZGdlc1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY29udmV4SHVsbG5EXG5cbnZhciBpY2ggPSByZXF1aXJlKCdpbmNyZW1lbnRhbC1jb252ZXgtaHVsbCcpXG52YXIgYWZmID0gcmVxdWlyZSgnYWZmaW5lLWh1bGwnKVxuXG5mdW5jdGlvbiBwZXJtdXRlKHBvaW50cywgZnJvbnQpIHtcbiAgdmFyIG4gPSBwb2ludHMubGVuZ3RoXG4gIHZhciBucG9pbnRzID0gbmV3IEFycmF5KG4pXG4gIGZvcih2YXIgaT0wOyBpPGZyb250Lmxlbmd0aDsgKytpKSB7XG4gICAgbnBvaW50c1tpXSA9IHBvaW50c1tmcm9udFtpXV1cbiAgfVxuICB2YXIgcHRyID0gZnJvbnQubGVuZ3RoXG4gIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgIGlmKGZyb250LmluZGV4T2YoaSkgPCAwKSB7XG4gICAgICBucG9pbnRzW3B0cisrXSA9IHBvaW50c1tpXVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnBvaW50c1xufVxuXG5mdW5jdGlvbiBpbnZQZXJtdXRlKGNlbGxzLCBmcm9udCkge1xuICB2YXIgbmMgPSBjZWxscy5sZW5ndGhcbiAgdmFyIG5mID0gZnJvbnQubGVuZ3RoXG4gIGZvcih2YXIgaT0wOyBpPG5jOyArK2kpIHtcbiAgICB2YXIgYyA9IGNlbGxzW2ldXG4gICAgZm9yKHZhciBqPTA7IGo8Yy5sZW5ndGg7ICsraikge1xuICAgICAgdmFyIHggPSBjW2pdXG4gICAgICBpZih4IDwgbmYpIHtcbiAgICAgICAgY1tqXSA9IGZyb250W3hdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB4ID0geCAtIG5mXG4gICAgICAgIGZvcih2YXIgaz0wOyBrPG5mOyArK2spIHtcbiAgICAgICAgICBpZih4ID49IGZyb250W2tdKSB7XG4gICAgICAgICAgICB4ICs9IDFcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY1tqXSA9IHhcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNlbGxzXG59XG5cbmZ1bmN0aW9uIGNvbnZleEh1bGxuRChwb2ludHMsIGQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaWNoKHBvaW50cywgdHJ1ZSlcbiAgfSBjYXRjaChlKSB7XG4gICAgLy9JZiBwb2ludCBzZXQgaXMgZGVnZW5lcmF0ZSwgdHJ5IHRvIGZpbmQgYSBiYXNpcyBhbmQgcmVydW4gaXRcbiAgICB2YXIgYWggPSBhZmYocG9pbnRzKVxuICAgIGlmKGFoLmxlbmd0aCA8PSBkKSB7XG4gICAgICAvL05vIGJhc2lzLCBubyB0cnlcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgICB2YXIgbnBvaW50cyA9IHBlcm11dGUocG9pbnRzLCBhaClcbiAgICB2YXIgbmh1bGwgICA9IGljaChucG9pbnRzLCB0cnVlKVxuICAgIHJldHVybiBpbnZQZXJtdXRlKG5odWxsLCBhaClcbiAgfVxufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgYmFyeWNlbnRyaWMgICAgICAgICAgICA9IHJlcXVpcmUoJ2JhcnljZW50cmljJylcbnZhciBjbG9zZXN0UG9pbnRUb1RyaWFuZ2xlID0gcmVxdWlyZSgncG9seXRvcGUtY2xvc2VzdC1wb2ludC9saWIvY2xvc2VzdF9wb2ludF8yZC5qcycpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xvc2VzdFBvaW50VG9QaWNrTG9jYXRpb25cblxuZnVuY3Rpb24geGZvcm1NYXRyaXgobSwgdikge1xuICB2YXIgb3V0ID0gWzAsMCwwLDBdXG4gIGZvcih2YXIgaT0wOyBpPDQ7ICsraSkge1xuICAgIGZvcih2YXIgaj0wOyBqPDQ7ICsraikge1xuICAgICAgb3V0W2pdICs9IG1bNCppICsgal0gKiB2W2ldXG4gICAgfVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gcHJvamVjdFZlcnRleCh2LCBtb2RlbCwgdmlldywgcHJvamVjdGlvbiwgcmVzb2x1dGlvbikge1xuICB2YXIgcCA9IHhmb3JtTWF0cml4KHByb2plY3Rpb24sXG4gICAgICAgICAgICB4Zm9ybU1hdHJpeCh2aWV3LFxuICAgICAgICAgICAgICB4Zm9ybU1hdHJpeChtb2RlbCwgW3ZbMF0sIHZbMV0sIHZbMl0sIDFdKSkpXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIHBbaV0gLz0gcFszXVxuICB9XG4gIHJldHVybiBbIDAuNSAqIHJlc29sdXRpb25bMF0gKiAoMS4wK3BbMF0pLCAwLjUgKiByZXNvbHV0aW9uWzFdICogKDEuMC1wWzFdKSBdXG59XG5cbmZ1bmN0aW9uIGJhcnljZW50cmljQ29vcmQoc2ltcGxleCwgcG9pbnQpIHtcbiAgaWYoc2ltcGxleC5sZW5ndGggPT09IDIpIHtcbiAgICB2YXIgZDAgPSAwLjBcbiAgICB2YXIgZDEgPSAwLjBcbiAgICBmb3IodmFyIGk9MDsgaTwyOyArK2kpIHtcbiAgICAgIGQwICs9IE1hdGgucG93KHBvaW50W2ldIC0gc2ltcGxleFswXVtpXSwgMilcbiAgICAgIGQxICs9IE1hdGgucG93KHBvaW50W2ldIC0gc2ltcGxleFsxXVtpXSwgMilcbiAgICB9XG4gICAgZDAgPSBNYXRoLnNxcnQoZDApXG4gICAgZDEgPSBNYXRoLnNxcnQoZDEpXG4gICAgaWYoZDArZDEgPCAxZS02KSB7XG4gICAgICByZXR1cm4gWzEsMF1cbiAgICB9XG4gICAgcmV0dXJuIFtkMS8oZDArZDEpLGQwLyhkMStkMCldXG4gIH0gZWxzZSBpZihzaW1wbGV4Lmxlbmd0aCA9PT0gMykge1xuICAgIHZhciBjbG9zZXN0UG9pbnQgPSBbMCwwXVxuICAgIGNsb3Nlc3RQb2ludFRvVHJpYW5nbGUoc2ltcGxleFswXSwgc2ltcGxleFsxXSwgc2ltcGxleFsyXSwgcG9pbnQsIGNsb3Nlc3RQb2ludClcbiAgICByZXR1cm4gYmFyeWNlbnRyaWMoc2ltcGxleCwgY2xvc2VzdFBvaW50KVxuICB9XG4gIHJldHVybiBbXVxufVxuXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZShzaW1wbGV4LCB3ZWlnaHRzKSB7XG4gIHZhciByZXN1bHQgPSBbMCwwLDBdXG4gIGZvcih2YXIgaT0wOyBpPHNpbXBsZXgubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcCA9IHNpbXBsZXhbaV1cbiAgICB2YXIgdyA9IHdlaWdodHNbaV1cbiAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgIHJlc3VsdFtqXSArPSB3ICogcFtqXVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGNsb3Nlc3RQb2ludFRvUGlja0xvY2F0aW9uKHNpbXBsZXgsIHBpeGVsQ29vcmQsIG1vZGVsLCB2aWV3LCBwcm9qZWN0aW9uLCByZXNvbHV0aW9uKSB7XG4gIGlmKHNpbXBsZXgubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIFswLCBzaW1wbGV4WzBdLnNsaWNlKCldXG4gIH1cbiAgdmFyIHNpbXBsZXgyRCA9IG5ldyBBcnJheShzaW1wbGV4Lmxlbmd0aClcbiAgZm9yKHZhciBpPTA7IGk8c2ltcGxleC5sZW5ndGg7ICsraSkge1xuICAgIHNpbXBsZXgyRFtpXSA9IHByb2plY3RWZXJ0ZXgoc2ltcGxleFtpXSwgbW9kZWwsIHZpZXcsIHByb2plY3Rpb24sIHJlc29sdXRpb24pO1xuICB9XG5cbiAgdmFyIGNsb3Nlc3RJbmRleCA9IDBcbiAgdmFyIGNsb3Nlc3REaXN0ICA9IEluZmluaXR5XG4gIGZvcih2YXIgaT0wOyBpPHNpbXBsZXgyRC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBkMiA9IDAuMFxuICAgIGZvcih2YXIgaj0wOyBqPDI7ICsraikge1xuICAgICAgZDIgKz0gTWF0aC5wb3coc2ltcGxleDJEW2ldW2pdIC0gcGl4ZWxDb29yZFtqXSwgMilcbiAgICB9XG4gICAgaWYoZDIgPCBjbG9zZXN0RGlzdCkge1xuICAgICAgY2xvc2VzdERpc3QgID0gZDJcbiAgICAgIGNsb3Nlc3RJbmRleCA9IGlcbiAgICB9XG4gIH1cblxuICB2YXIgd2VpZ2h0cyA9IGJhcnljZW50cmljQ29vcmQoc2ltcGxleDJELCBwaXhlbENvb3JkKVxuICB2YXIgcyA9IDAuMFxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICBpZih3ZWlnaHRzW2ldIDwgLTAuMDAxIHx8XG4gICAgICAgd2VpZ2h0c1tpXSA+IDEuMDAwMSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcyArPSB3ZWlnaHRzW2ldXG4gIH1cbiAgaWYoTWF0aC5hYnMocyAtIDEuMCkgPiAwLjAwMSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgcmV0dXJuIFtjbG9zZXN0SW5kZXgsIGludGVycG9sYXRlKHNpbXBsZXgsIHdlaWdodHMpLCB3ZWlnaHRzXVxufSIsInZhciBnbHNsaWZ5ICAgICAgID0gcmVxdWlyZSgnZ2xzbGlmeScpXG5cbnZhciB0cmlWZXJ0U3JjID0gZ2xzbGlmeSgnLi90cmlhbmdsZS12ZXJ0ZXguZ2xzbCcpXG52YXIgdHJpRnJhZ1NyYyA9IGdsc2xpZnkoJy4vdHJpYW5nbGUtZnJhZ21lbnQuZ2xzbCcpXG52YXIgZWRnZVZlcnRTcmMgPSBnbHNsaWZ5KCcuL2VkZ2UtdmVydGV4Lmdsc2wnKVxudmFyIGVkZ2VGcmFnU3JjID0gZ2xzbGlmeSgnLi9lZGdlLWZyYWdtZW50Lmdsc2wnKVxudmFyIHBvaW50VmVydFNyYyA9IGdsc2xpZnkoJy4vcG9pbnQtdmVydGV4Lmdsc2wnKVxudmFyIHBvaW50RnJhZ1NyYyA9IGdsc2xpZnkoJy4vcG9pbnQtZnJhZ21lbnQuZ2xzbCcpXG52YXIgcGlja1ZlcnRTcmMgPSBnbHNsaWZ5KCcuL3BpY2stdmVydGV4Lmdsc2wnKVxudmFyIHBpY2tGcmFnU3JjID0gZ2xzbGlmeSgnLi9waWNrLWZyYWdtZW50Lmdsc2wnKVxudmFyIHBpY2tQb2ludFZlcnRTcmMgPSBnbHNsaWZ5KCcuL3BpY2stcG9pbnQtdmVydGV4Lmdsc2wnKVxudmFyIGNvbnRvdXJWZXJ0U3JjID0gZ2xzbGlmeSgnLi9jb250b3VyLXZlcnRleC5nbHNsJylcbnZhciBjb250b3VyRnJhZ1NyYyA9IGdsc2xpZnkoJy4vY29udG91ci1mcmFnbWVudC5nbHNsJylcblxuZXhwb3J0cy5tZXNoU2hhZGVyID0ge1xuICB2ZXJ0ZXg6ICAgdHJpVmVydFNyYyxcbiAgZnJhZ21lbnQ6IHRyaUZyYWdTcmMsXG4gIGF0dHJpYnV0ZXM6IFtcbiAgICB7bmFtZTogJ3Bvc2l0aW9uJywgdHlwZTogJ3ZlYzMnfSxcbiAgICB7bmFtZTogJ25vcm1hbCcsIHR5cGU6ICd2ZWMzJ30sXG4gICAge25hbWU6ICdjb2xvcicsIHR5cGU6ICd2ZWM0J30sXG4gICAge25hbWU6ICd1dicsIHR5cGU6ICd2ZWMyJ31cbiAgXVxufVxuZXhwb3J0cy53aXJlU2hhZGVyID0ge1xuICB2ZXJ0ZXg6ICAgZWRnZVZlcnRTcmMsXG4gIGZyYWdtZW50OiBlZGdlRnJhZ1NyYyxcbiAgYXR0cmlidXRlczogW1xuICAgIHtuYW1lOiAncG9zaXRpb24nLCB0eXBlOiAndmVjMyd9LFxuICAgIHtuYW1lOiAnY29sb3InLCB0eXBlOiAndmVjNCd9LFxuICAgIHtuYW1lOiAndXYnLCB0eXBlOiAndmVjMid9XG4gIF1cbn1cbmV4cG9ydHMucG9pbnRTaGFkZXIgPSB7XG4gIHZlcnRleDogICBwb2ludFZlcnRTcmMsXG4gIGZyYWdtZW50OiBwb2ludEZyYWdTcmMsXG4gIGF0dHJpYnV0ZXM6IFtcbiAgICB7bmFtZTogJ3Bvc2l0aW9uJywgdHlwZTogJ3ZlYzMnfSxcbiAgICB7bmFtZTogJ2NvbG9yJywgdHlwZTogJ3ZlYzQnfSxcbiAgICB7bmFtZTogJ3V2JywgdHlwZTogJ3ZlYzInfSxcbiAgICB7bmFtZTogJ3BvaW50U2l6ZScsIHR5cGU6ICdmbG9hdCd9XG4gIF1cbn1cbmV4cG9ydHMucGlja1NoYWRlciA9IHtcbiAgdmVydGV4OiAgIHBpY2tWZXJ0U3JjLFxuICBmcmFnbWVudDogcGlja0ZyYWdTcmMsXG4gIGF0dHJpYnV0ZXM6IFtcbiAgICB7bmFtZTogJ3Bvc2l0aW9uJywgdHlwZTogJ3ZlYzMnfSxcbiAgICB7bmFtZTogJ2lkJywgdHlwZTogJ3ZlYzQnfVxuICBdXG59XG5leHBvcnRzLnBvaW50UGlja1NoYWRlciA9IHtcbiAgdmVydGV4OiAgIHBpY2tQb2ludFZlcnRTcmMsXG4gIGZyYWdtZW50OiBwaWNrRnJhZ1NyYyxcbiAgYXR0cmlidXRlczogW1xuICAgIHtuYW1lOiAncG9zaXRpb24nLCB0eXBlOiAndmVjMyd9LFxuICAgIHtuYW1lOiAncG9pbnRTaXplJywgdHlwZTogJ2Zsb2F0J30sXG4gICAge25hbWU6ICdpZCcsIHR5cGU6ICd2ZWM0J31cbiAgXVxufVxuZXhwb3J0cy5jb250b3VyU2hhZGVyID0ge1xuICB2ZXJ0ZXg6ICAgY29udG91clZlcnRTcmMsXG4gIGZyYWdtZW50OiBjb250b3VyRnJhZ1NyYyxcbiAgYXR0cmlidXRlczogW1xuICAgIHtuYW1lOiAncG9zaXRpb24nLCB0eXBlOiAndmVjMyd9XG4gIF1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgREVGQVVMVF9WRVJURVhfTk9STUFMU19FUFNJTE9OID0gMWUtNjsgLy8gbWF5IGJlIHRvbyBsYXJnZSBpZiB0cmlhbmdsZXMgYXJlIHZlcnkgc21hbGxcbnZhciBERUZBVUxUX0ZBQ0VfTk9STUFMU19FUFNJTE9OID0gMWUtNjtcblxudmFyIGNyZWF0ZVNoYWRlciAgPSByZXF1aXJlKCdnbC1zaGFkZXInKVxudmFyIGNyZWF0ZUJ1ZmZlciAgPSByZXF1aXJlKCdnbC1idWZmZXInKVxudmFyIGNyZWF0ZVZBTyAgICAgPSByZXF1aXJlKCdnbC12YW8nKVxudmFyIGNyZWF0ZVRleHR1cmUgPSByZXF1aXJlKCdnbC10ZXh0dXJlMmQnKVxudmFyIG5vcm1hbHMgICAgICAgPSByZXF1aXJlKCdub3JtYWxzJylcbnZhciBtdWx0aXBseSAgICAgID0gcmVxdWlyZSgnZ2wtbWF0NC9tdWx0aXBseScpXG52YXIgaW52ZXJ0ICAgICAgICA9IHJlcXVpcmUoJ2dsLW1hdDQvaW52ZXJ0JylcbnZhciBuZGFycmF5ICAgICAgID0gcmVxdWlyZSgnbmRhcnJheScpXG52YXIgY29sb3JtYXAgICAgICA9IHJlcXVpcmUoJ2NvbG9ybWFwJylcbnZhciBnZXRDb250b3VyICAgID0gcmVxdWlyZSgnc2ltcGxpY2lhbC1jb21wbGV4LWNvbnRvdXInKVxudmFyIHBvb2wgICAgICAgICAgPSByZXF1aXJlKCd0eXBlZGFycmF5LXBvb2wnKVxudmFyIHNoYWRlcnMgICAgICAgPSByZXF1aXJlKCcuL2xpYi9zaGFkZXJzJylcbnZhciBjbG9zZXN0UG9pbnQgID0gcmVxdWlyZSgnLi9saWIvY2xvc2VzdC1wb2ludCcpXG5cbnZhciBtZXNoU2hhZGVyICAgID0gc2hhZGVycy5tZXNoU2hhZGVyXG52YXIgd2lyZVNoYWRlciAgICA9IHNoYWRlcnMud2lyZVNoYWRlclxudmFyIHBvaW50U2hhZGVyICAgPSBzaGFkZXJzLnBvaW50U2hhZGVyXG52YXIgcGlja1NoYWRlciAgICA9IHNoYWRlcnMucGlja1NoYWRlclxudmFyIHBvaW50UGlja1NoYWRlciA9IHNoYWRlcnMucG9pbnRQaWNrU2hhZGVyXG52YXIgY29udG91clNoYWRlciA9IHNoYWRlcnMuY29udG91clNoYWRlclxuXG52YXIgSURFTlRJVFkgPSBbXG4gIDEsMCwwLDAsXG4gIDAsMSwwLDAsXG4gIDAsMCwxLDAsXG4gIDAsMCwwLDFdXG5cblxuZnVuY3Rpb24gU2ltcGxpY2lhbE1lc2goZ2xcbiAgLCB0ZXh0dXJlXG4gICwgdHJpU2hhZGVyXG4gICwgbGluZVNoYWRlclxuICAsIHBvaW50U2hhZGVyXG4gICwgcGlja1NoYWRlclxuICAsIHBvaW50UGlja1NoYWRlclxuICAsIGNvbnRvdXJTaGFkZXJcbiAgLCB0cmlhbmdsZVBvc2l0aW9uc1xuICAsIHRyaWFuZ2xlSWRzXG4gICwgdHJpYW5nbGVDb2xvcnNcbiAgLCB0cmlhbmdsZVVWc1xuICAsIHRyaWFuZ2xlTm9ybWFsc1xuICAsIHRyaWFuZ2xlVkFPXG4gICwgZWRnZVBvc2l0aW9uc1xuICAsIGVkZ2VJZHNcbiAgLCBlZGdlQ29sb3JzXG4gICwgZWRnZVVWc1xuICAsIGVkZ2VWQU9cbiAgLCBwb2ludFBvc2l0aW9uc1xuICAsIHBvaW50SWRzXG4gICwgcG9pbnRDb2xvcnNcbiAgLCBwb2ludFVWc1xuICAsIHBvaW50U2l6ZXNcbiAgLCBwb2ludFZBT1xuICAsIGNvbnRvdXJQb3NpdGlvbnNcbiAgLCBjb250b3VyVkFPKSB7XG5cbiAgdGhpcy5nbCAgICAgICAgICAgICAgICA9IGdsXG4gIHRoaXMucGl4ZWxSYXRpbyAgICAgICAgID0gMVxuICB0aGlzLmNlbGxzICAgICAgICAgICAgID0gW11cbiAgdGhpcy5wb3NpdGlvbnMgICAgICAgICA9IFtdXG4gIHRoaXMuaW50ZW5zaXR5ICAgICAgICAgPSBbXVxuICB0aGlzLnRleHR1cmUgICAgICAgICAgID0gdGV4dHVyZVxuICB0aGlzLmRpcnR5ICAgICAgICAgICAgID0gdHJ1ZVxuXG4gIHRoaXMudHJpU2hhZGVyICAgICAgICAgPSB0cmlTaGFkZXJcbiAgdGhpcy5saW5lU2hhZGVyICAgICAgICA9IGxpbmVTaGFkZXJcbiAgdGhpcy5wb2ludFNoYWRlciAgICAgICA9IHBvaW50U2hhZGVyXG4gIHRoaXMucGlja1NoYWRlciAgICAgICAgPSBwaWNrU2hhZGVyXG4gIHRoaXMucG9pbnRQaWNrU2hhZGVyICAgPSBwb2ludFBpY2tTaGFkZXJcbiAgdGhpcy5jb250b3VyU2hhZGVyICAgICA9IGNvbnRvdXJTaGFkZXJcblxuICB0aGlzLnRyaWFuZ2xlUG9zaXRpb25zID0gdHJpYW5nbGVQb3NpdGlvbnNcbiAgdGhpcy50cmlhbmdsZUNvbG9ycyAgICA9IHRyaWFuZ2xlQ29sb3JzXG4gIHRoaXMudHJpYW5nbGVOb3JtYWxzICAgPSB0cmlhbmdsZU5vcm1hbHNcbiAgdGhpcy50cmlhbmdsZVVWcyAgICAgICA9IHRyaWFuZ2xlVVZzXG4gIHRoaXMudHJpYW5nbGVJZHMgICAgICAgPSB0cmlhbmdsZUlkc1xuICB0aGlzLnRyaWFuZ2xlVkFPICAgICAgID0gdHJpYW5nbGVWQU9cbiAgdGhpcy50cmlhbmdsZUNvdW50ICAgICA9IDBcblxuICB0aGlzLmxpbmVXaWR0aCAgICAgICAgID0gMVxuICB0aGlzLmVkZ2VQb3NpdGlvbnMgICAgID0gZWRnZVBvc2l0aW9uc1xuICB0aGlzLmVkZ2VDb2xvcnMgICAgICAgID0gZWRnZUNvbG9yc1xuICB0aGlzLmVkZ2VVVnMgICAgICAgICAgID0gZWRnZVVWc1xuICB0aGlzLmVkZ2VJZHMgICAgICAgICAgID0gZWRnZUlkc1xuICB0aGlzLmVkZ2VWQU8gICAgICAgICAgID0gZWRnZVZBT1xuICB0aGlzLmVkZ2VDb3VudCAgICAgICAgID0gMFxuXG4gIHRoaXMucG9pbnRQb3NpdGlvbnMgICAgPSBwb2ludFBvc2l0aW9uc1xuICB0aGlzLnBvaW50Q29sb3JzICAgICAgID0gcG9pbnRDb2xvcnNcbiAgdGhpcy5wb2ludFVWcyAgICAgICAgICA9IHBvaW50VVZzXG4gIHRoaXMucG9pbnRTaXplcyAgICAgICAgPSBwb2ludFNpemVzXG4gIHRoaXMucG9pbnRJZHMgICAgICAgICAgPSBwb2ludElkc1xuICB0aGlzLnBvaW50VkFPICAgICAgICAgID0gcG9pbnRWQU9cbiAgdGhpcy5wb2ludENvdW50ICAgICAgICA9IDBcblxuICB0aGlzLmNvbnRvdXJMaW5lV2lkdGggID0gMVxuICB0aGlzLmNvbnRvdXJQb3NpdGlvbnMgID0gY29udG91clBvc2l0aW9uc1xuICB0aGlzLmNvbnRvdXJWQU8gICAgICAgID0gY29udG91clZBT1xuICB0aGlzLmNvbnRvdXJDb3VudCAgICAgID0gMFxuICB0aGlzLmNvbnRvdXJDb2xvciAgICAgID0gWzAsMCwwXVxuICB0aGlzLmNvbnRvdXJFbmFibGUgICAgID0gdHJ1ZVxuXG4gIHRoaXMucGlja1ZlcnRleCAgICAgICAgPSB0cnVlO1xuICB0aGlzLnBpY2tJZCAgICAgICAgICAgID0gMVxuICB0aGlzLmJvdW5kcyAgICAgICAgICAgID0gW1xuICAgIFsgSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eV0sXG4gICAgWy1JbmZpbml0eSwtSW5maW5pdHksLUluZmluaXR5XSBdXG4gIHRoaXMuY2xpcEJvdW5kcyAgICAgICAgPSBbXG4gICAgWy1JbmZpbml0eSwtSW5maW5pdHksLUluZmluaXR5XSxcbiAgICBbIEluZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHldIF1cblxuICB0aGlzLmxpZ2h0UG9zaXRpb24gPSBbMWU1LCAxZTUsIDBdXG4gIHRoaXMuYW1iaWVudExpZ2h0ICA9IDAuOFxuICB0aGlzLmRpZmZ1c2VMaWdodCAgPSAwLjhcbiAgdGhpcy5zcGVjdWxhckxpZ2h0ID0gMi4wXG4gIHRoaXMucm91Z2huZXNzICAgICA9IDAuNVxuICB0aGlzLmZyZXNuZWwgICAgICAgPSAxLjVcblxuICB0aGlzLm9wYWNpdHkgICAgICAgPSAxLjBcbiAgdGhpcy5oYXNBbHBoYSAgICAgID0gZmFsc2VcbiAgdGhpcy5vcGFjaXR5c2NhbGUgID0gZmFsc2VcblxuICB0aGlzLl9tb2RlbCAgICAgICA9IElERU5USVRZXG4gIHRoaXMuX3ZpZXcgICAgICAgID0gSURFTlRJVFlcbiAgdGhpcy5fcHJvamVjdGlvbiAgPSBJREVOVElUWVxuICB0aGlzLl9yZXNvbHV0aW9uICA9IFsxLDFdXG59XG5cbnZhciBwcm90byA9IFNpbXBsaWNpYWxNZXNoLnByb3RvdHlwZVxuXG5wcm90by5pc09wYXF1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gIXRoaXMuaGFzQWxwaGFcbn1cblxucHJvdG8uaXNUcmFuc3BhcmVudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5oYXNBbHBoYVxufVxuXG5wcm90by5waWNrU2xvdHMgPSAxXG5cbnByb3RvLnNldFBpY2tCYXNlID0gZnVuY3Rpb24oaWQpIHtcbiAgdGhpcy5waWNrSWQgPSBpZFxufVxuXG5mdW5jdGlvbiBnZXRPcGFjaXR5RnJvbVNjYWxlKHJhdGlvLCBvcGFjaXR5c2NhbGUpIHtcblxuICBpZighb3BhY2l0eXNjYWxlKSByZXR1cm4gMVxuICBpZighb3BhY2l0eXNjYWxlLmxlbmd0aCkgcmV0dXJuIDFcblxuICBmb3IodmFyIGkgPSAwOyBpIDwgb3BhY2l0eXNjYWxlLmxlbmd0aDsgKytpKSB7XG4gICAgaWYob3BhY2l0eXNjYWxlLmxlbmd0aCA8IDIpIHJldHVybiAxXG4gICAgaWYob3BhY2l0eXNjYWxlW2ldWzBdID09PSByYXRpbykgcmV0dXJuIG9wYWNpdHlzY2FsZVtpXVsxXVxuICAgIGlmKG9wYWNpdHlzY2FsZVtpXVswXSA+IHJhdGlvICYmIGkgPiAwKSB7XG4gICAgICB2YXIgZCA9IChvcGFjaXR5c2NhbGVbaV1bMF0gLSByYXRpbykgLyAob3BhY2l0eXNjYWxlW2ldWzBdIC0gb3BhY2l0eXNjYWxlW2kgLSAxXVswXSlcbiAgICAgIHJldHVybiBvcGFjaXR5c2NhbGVbaV1bMV0gKiAoMSAtIGQpICsgZCAqIG9wYWNpdHlzY2FsZVtpIC0gMV1bMV1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gMVxufVxuXG5mdW5jdGlvbiBnZW5Db2xvcm1hcChwYXJhbSwgb3BhY2l0eXNjYWxlKSB7XG4gIHZhciBjb2xvcnMgPSBjb2xvcm1hcCh7XG4gICAgICBjb2xvcm1hcDogcGFyYW1cbiAgICAsIG5zaGFkZXM6ICAyNTZcbiAgICAsIGZvcm1hdDogICdyZ2JhJ1xuICB9KVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheSgyNTYqNClcbiAgZm9yKHZhciBpPTA7IGk8MjU2OyArK2kpIHtcbiAgICB2YXIgYyA9IGNvbG9yc1tpXVxuICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgcmVzdWx0WzQqaStqXSA9IGNbal1cbiAgICB9XG4gICAgaWYoIW9wYWNpdHlzY2FsZSkge1xuICAgICAgcmVzdWx0WzQqaSszXSA9IDI1NSAqIGNbM11cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0WzQqaSszXSA9IDI1NSAqIGdldE9wYWNpdHlGcm9tU2NhbGUoaSAvIDI1NS4wLCBvcGFjaXR5c2NhbGUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5kYXJyYXkocmVzdWx0LCBbMjU2LDI1Niw0XSwgWzQsMCwxXSlcbn1cblxuZnVuY3Rpb24gdGFrZVpDb21wb25lbnQoYXJyYXkpIHtcbiAgdmFyIG4gPSBhcnJheS5sZW5ndGhcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShuKVxuICBmb3IodmFyIGk9MDsgaTxuOyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSBhcnJheVtpXVsyXVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxucHJvdG8uaGlnaGxpZ2h0ID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG4gIGlmKCFzZWxlY3Rpb24gfHwgIXRoaXMuY29udG91ckVuYWJsZSkge1xuICAgIHRoaXMuY29udG91ckNvdW50ID0gMFxuICAgIHJldHVyblxuICB9XG4gIHZhciBsZXZlbCA9IGdldENvbnRvdXIodGhpcy5jZWxscywgdGhpcy5pbnRlbnNpdHksIHNlbGVjdGlvbi5pbnRlbnNpdHkpXG4gIHZhciBjZWxscyAgICAgICAgID0gbGV2ZWwuY2VsbHNcbiAgdmFyIHZlcnRleElkcyAgICAgPSBsZXZlbC52ZXJ0ZXhJZHNcbiAgdmFyIHZlcnRleFdlaWdodHMgPSBsZXZlbC52ZXJ0ZXhXZWlnaHRzXG4gIHZhciBudW1DZWxscyA9IGNlbGxzLmxlbmd0aFxuICB2YXIgcmVzdWx0ID0gcG9vbC5tYWxsb2NGbG9hdDMyKDIgKiAzICogbnVtQ2VsbHMpXG4gIHZhciBwdHIgPSAwXG4gIGZvcih2YXIgaT0wOyBpPG51bUNlbGxzOyArK2kpIHtcbiAgICB2YXIgYyA9IGNlbGxzW2ldXG4gICAgZm9yKHZhciBqPTA7IGo8MjsgKytqKSB7XG4gICAgICB2YXIgdiA9IGNbMF1cbiAgICAgIGlmKGMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHYgPSBjW2pdXG4gICAgICB9XG4gICAgICB2YXIgYSA9IHZlcnRleElkc1t2XVswXVxuICAgICAgdmFyIGIgPSB2ZXJ0ZXhJZHNbdl1bMV1cbiAgICAgIHZhciB3ID0gdmVydGV4V2VpZ2h0c1t2XVxuICAgICAgdmFyIHdpID0gMS4wIC0gd1xuICAgICAgdmFyIHBhID0gdGhpcy5wb3NpdGlvbnNbYV1cbiAgICAgIHZhciBwYiA9IHRoaXMucG9zaXRpb25zW2JdXG4gICAgICBmb3IodmFyIGs9MDsgazwzOyArK2spIHtcbiAgICAgICAgcmVzdWx0W3B0cisrXSA9IHcgKiBwYVtrXSArIHdpICogcGJba11cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdGhpcy5jb250b3VyQ291bnQgPSAocHRyIC8gMyl8MFxuICB0aGlzLmNvbnRvdXJQb3NpdGlvbnMudXBkYXRlKHJlc3VsdC5zdWJhcnJheSgwLCBwdHIpKVxuICBwb29sLmZyZWUocmVzdWx0KVxufVxuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgcGFyYW1zID0gcGFyYW1zIHx8IHt9XG4gIHZhciBnbCA9IHRoaXMuZ2xcblxuICB0aGlzLmRpcnR5ID0gdHJ1ZVxuXG4gIGlmKCdjb250b3VyRW5hYmxlJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLmNvbnRvdXJFbmFibGUgPSBwYXJhbXMuY29udG91ckVuYWJsZVxuICB9XG4gIGlmKCdjb250b3VyQ29sb3InIGluIHBhcmFtcykge1xuICAgIHRoaXMuY29udG91ckNvbG9yID0gcGFyYW1zLmNvbnRvdXJDb2xvclxuICB9XG4gIGlmKCdsaW5lV2lkdGgnIGluIHBhcmFtcykge1xuICAgIHRoaXMubGluZVdpZHRoID0gcGFyYW1zLmxpbmVXaWR0aFxuICB9XG4gIGlmKCdsaWdodFBvc2l0aW9uJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLmxpZ2h0UG9zaXRpb24gPSBwYXJhbXMubGlnaHRQb3NpdGlvblxuICB9XG5cbiAgdGhpcy5oYXNBbHBoYSA9IGZhbHNlIC8vIGRlZmF1bHQgdG8gbm8gdHJhbnNwYXJlbnQgZHJhd1xuICBpZignb3BhY2l0eScgaW4gcGFyYW1zKSB7XG4gICAgdGhpcy5vcGFjaXR5ID0gcGFyYW1zLm9wYWNpdHlcbiAgICBpZih0aGlzLm9wYWNpdHkgPCAxKSB7XG4gICAgICB0aGlzLmhhc0FscGhhID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYoJ29wYWNpdHlzY2FsZScgaW4gcGFyYW1zKSB7XG4gICAgdGhpcy5vcGFjaXR5c2NhbGUgPSBwYXJhbXMub3BhY2l0eXNjYWxlXG4gICAgdGhpcy5oYXNBbHBoYSA9IHRydWU7XG4gIH1cblxuICBpZignYW1iaWVudCcgaW4gcGFyYW1zKSB7XG4gICAgdGhpcy5hbWJpZW50TGlnaHQgID0gcGFyYW1zLmFtYmllbnRcbiAgfVxuICBpZignZGlmZnVzZScgaW4gcGFyYW1zKSB7XG4gICAgdGhpcy5kaWZmdXNlTGlnaHQgPSBwYXJhbXMuZGlmZnVzZVxuICB9XG4gIGlmKCdzcGVjdWxhcicgaW4gcGFyYW1zKSB7XG4gICAgdGhpcy5zcGVjdWxhckxpZ2h0ID0gcGFyYW1zLnNwZWN1bGFyXG4gIH1cbiAgaWYoJ3JvdWdobmVzcycgaW4gcGFyYW1zKSB7XG4gICAgdGhpcy5yb3VnaG5lc3MgPSBwYXJhbXMucm91Z2huZXNzXG4gIH1cbiAgaWYoJ2ZyZXNuZWwnIGluIHBhcmFtcykge1xuICAgIHRoaXMuZnJlc25lbCA9IHBhcmFtcy5mcmVzbmVsXG4gIH1cblxuICBpZihwYXJhbXMudGV4dHVyZSkge1xuICAgIHRoaXMudGV4dHVyZS5kaXNwb3NlKClcbiAgICB0aGlzLnRleHR1cmUgPSBjcmVhdGVUZXh0dXJlKGdsLCBwYXJhbXMudGV4dHVyZSlcbiAgfSBlbHNlIGlmIChwYXJhbXMuY29sb3JtYXApIHtcbiAgICB0aGlzLnRleHR1cmUuc2hhcGUgPSBbMjU2LDI1Nl1cbiAgICB0aGlzLnRleHR1cmUubWluRmlsdGVyID0gZ2wuTElORUFSX01JUE1BUF9MSU5FQVJcbiAgICB0aGlzLnRleHR1cmUubWFnRmlsdGVyID0gZ2wuTElORUFSXG4gICAgdGhpcy50ZXh0dXJlLnNldFBpeGVscyhnZW5Db2xvcm1hcChwYXJhbXMuY29sb3JtYXAsIHRoaXMub3BhY2l0eXNjYWxlKSlcbiAgICB0aGlzLnRleHR1cmUuZ2VuZXJhdGVNaXBtYXAoKVxuICB9XG5cbiAgdmFyIGNlbGxzID0gcGFyYW1zLmNlbGxzXG4gIHZhciBwb3NpdGlvbnMgPSBwYXJhbXMucG9zaXRpb25zXG5cbiAgaWYoIXBvc2l0aW9ucyB8fCAhY2VsbHMpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciB0UG9zID0gW11cbiAgdmFyIHRDb2wgPSBbXVxuICB2YXIgdE5vciA9IFtdXG4gIHZhciB0VVZzID0gW11cbiAgdmFyIHRJZHMgPSBbXVxuXG4gIHZhciBlUG9zID0gW11cbiAgdmFyIGVDb2wgPSBbXVxuICB2YXIgZVVWcyA9IFtdXG4gIHZhciBlSWRzID0gW11cblxuICB2YXIgcFBvcyA9IFtdXG4gIHZhciBwQ29sID0gW11cbiAgdmFyIHBVVnMgPSBbXVxuICB2YXIgcFNpeiA9IFtdXG4gIHZhciBwSWRzID0gW11cblxuICAvL1NhdmUgZ2VvbWV0cnkgZGF0YSBmb3IgcGlja2luZyBjYWxjdWxhdGlvbnNcbiAgdGhpcy5jZWxscyAgICAgPSBjZWxsc1xuICB0aGlzLnBvc2l0aW9ucyA9IHBvc2l0aW9uc1xuXG4gIC8vQ29tcHV0ZSBub3JtYWxzXG4gIHZhciB2ZXJ0ZXhOb3JtYWxzID0gcGFyYW1zLnZlcnRleE5vcm1hbHNcbiAgdmFyIGNlbGxOb3JtYWxzICAgPSBwYXJhbXMuY2VsbE5vcm1hbHNcbiAgdmFyIHZlcnRleE5vcm1hbHNFcHNpbG9uID0gcGFyYW1zLnZlcnRleE5vcm1hbHNFcHNpbG9uID09PSB2b2lkKDApID8gREVGQVVMVF9WRVJURVhfTk9STUFMU19FUFNJTE9OIDogcGFyYW1zLnZlcnRleE5vcm1hbHNFcHNpbG9uXG4gIHZhciBmYWNlTm9ybWFsc0Vwc2lsb24gPSBwYXJhbXMuZmFjZU5vcm1hbHNFcHNpbG9uID09PSB2b2lkKDApID8gREVGQVVMVF9GQUNFX05PUk1BTFNfRVBTSUxPTiA6IHBhcmFtcy5mYWNlTm9ybWFsc0Vwc2lsb25cbiAgaWYocGFyYW1zLnVzZUZhY2V0Tm9ybWFscyAmJiAhY2VsbE5vcm1hbHMpIHtcbiAgICBjZWxsTm9ybWFscyA9IG5vcm1hbHMuZmFjZU5vcm1hbHMoY2VsbHMsIHBvc2l0aW9ucywgZmFjZU5vcm1hbHNFcHNpbG9uKVxuICB9XG4gIGlmKCFjZWxsTm9ybWFscyAmJiAhdmVydGV4Tm9ybWFscykge1xuICAgIHZlcnRleE5vcm1hbHMgPSBub3JtYWxzLnZlcnRleE5vcm1hbHMoY2VsbHMsIHBvc2l0aW9ucywgdmVydGV4Tm9ybWFsc0Vwc2lsb24pXG4gIH1cblxuICAvL0NvbXB1dGUgY29sb3JzXG4gIHZhciB2ZXJ0ZXhDb2xvcnMgICAgPSBwYXJhbXMudmVydGV4Q29sb3JzXG4gIHZhciBjZWxsQ29sb3JzICAgICAgPSBwYXJhbXMuY2VsbENvbG9yc1xuICB2YXIgbWVzaENvbG9yICAgICAgID0gcGFyYW1zLm1lc2hDb2xvciB8fCBbMSwxLDEsMV1cblxuICAvL1VWc1xuICB2YXIgdmVydGV4VVZzICAgICAgID0gcGFyYW1zLnZlcnRleFVWc1xuICB2YXIgdmVydGV4SW50ZW5zaXR5ID0gcGFyYW1zLnZlcnRleEludGVuc2l0eVxuICB2YXIgY2VsbFVWcyAgICAgICAgID0gcGFyYW1zLmNlbGxVVnNcbiAgdmFyIGNlbGxJbnRlbnNpdHkgICA9IHBhcmFtcy5jZWxsSW50ZW5zaXR5XG5cbiAgdmFyIGludGVuc2l0eUxvICAgICA9IEluZmluaXR5XG4gIHZhciBpbnRlbnNpdHlIaSAgICAgPSAtSW5maW5pdHlcbiAgaWYoIXZlcnRleFVWcyAmJiAhY2VsbFVWcykge1xuICAgIGlmKHZlcnRleEludGVuc2l0eSkge1xuICAgICAgaWYocGFyYW1zLnZlcnRleEludGVuc2l0eUJvdW5kcykge1xuICAgICAgICBpbnRlbnNpdHlMbyA9ICtwYXJhbXMudmVydGV4SW50ZW5zaXR5Qm91bmRzWzBdXG4gICAgICAgIGludGVuc2l0eUhpID0gK3BhcmFtcy52ZXJ0ZXhJbnRlbnNpdHlCb3VuZHNbMV1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPHZlcnRleEludGVuc2l0eS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIHZhciBmID0gdmVydGV4SW50ZW5zaXR5W2ldXG4gICAgICAgICAgaW50ZW5zaXR5TG8gPSBNYXRoLm1pbihpbnRlbnNpdHlMbywgZilcbiAgICAgICAgICBpbnRlbnNpdHlIaSA9IE1hdGgubWF4KGludGVuc2l0eUhpLCBmKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGNlbGxJbnRlbnNpdHkpIHtcbiAgICAgIGlmKHBhcmFtcy5jZWxsSW50ZW5zaXR5Qm91bmRzKSB7XG4gICAgICAgIGludGVuc2l0eUxvID0gK3BhcmFtcy5jZWxsSW50ZW5zaXR5Qm91bmRzWzBdXG4gICAgICAgIGludGVuc2l0eUhpID0gK3BhcmFtcy5jZWxsSW50ZW5zaXR5Qm91bmRzWzFdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IodmFyIGk9MDsgaTxjZWxsSW50ZW5zaXR5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgdmFyIGYgPSBjZWxsSW50ZW5zaXR5W2ldXG4gICAgICAgICAgaW50ZW5zaXR5TG8gPSBNYXRoLm1pbihpbnRlbnNpdHlMbywgZilcbiAgICAgICAgICBpbnRlbnNpdHlIaSA9IE1hdGgubWF4KGludGVuc2l0eUhpLCBmKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcih2YXIgaT0wOyBpPHBvc2l0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgZiA9IHBvc2l0aW9uc1tpXVsyXVxuICAgICAgICBpbnRlbnNpdHlMbyA9IE1hdGgubWluKGludGVuc2l0eUxvLCBmKVxuICAgICAgICBpbnRlbnNpdHlIaSA9IE1hdGgubWF4KGludGVuc2l0eUhpLCBmKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmKHZlcnRleEludGVuc2l0eSkge1xuICAgIHRoaXMuaW50ZW5zaXR5ID0gdmVydGV4SW50ZW5zaXR5XG4gIH0gZWxzZSBpZihjZWxsSW50ZW5zaXR5KSB7XG4gICAgdGhpcy5pbnRlbnNpdHkgPSBjZWxsSW50ZW5zaXR5XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pbnRlbnNpdHkgPSB0YWtlWkNvbXBvbmVudChwb3NpdGlvbnMpXG4gIH1cblxuICB0aGlzLnBpY2tWZXJ0ZXggPSAhKGNlbGxJbnRlbnNpdHkgfHwgY2VsbENvbG9ycylcblxuICAvL1BvaW50IHNpemVcbiAgdmFyIHBvaW50U2l6ZXMgICAgICA9IHBhcmFtcy5wb2ludFNpemVzXG4gIHZhciBtZXNoUG9pbnRTaXplICAgPSBwYXJhbXMucG9pbnRTaXplIHx8IDEuMFxuXG4gIC8vVXBkYXRlIGJvdW5kc1xuICB0aGlzLmJvdW5kcyAgICAgICA9IFtbSW5maW5pdHksSW5maW5pdHksSW5maW5pdHldLCBbLUluZmluaXR5LC1JbmZpbml0eSwtSW5maW5pdHldXVxuICBmb3IodmFyIGk9MDsgaTxwb3NpdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcCA9IHBvc2l0aW9uc1tpXVxuICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgaWYoaXNOYU4ocFtqXSkgfHwgIWlzRmluaXRlKHBbal0pKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICB0aGlzLmJvdW5kc1swXVtqXSA9IE1hdGgubWluKHRoaXMuYm91bmRzWzBdW2pdLCBwW2pdKVxuICAgICAgdGhpcy5ib3VuZHNbMV1bal0gPSBNYXRoLm1heCh0aGlzLmJvdW5kc1sxXVtqXSwgcFtqXSlcbiAgICB9XG4gIH1cblxuICAvL1BhY2sgY2VsbHMgaW50byBidWZmZXJzXG4gIHZhciB0cmlhbmdsZUNvdW50ID0gMFxuICB2YXIgZWRnZUNvdW50ID0gMFxuICB2YXIgcG9pbnRDb3VudCA9IDBcblxuZmlsbF9sb29wOlxuICBmb3IodmFyIGk9MDsgaTxjZWxscy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjZWxsID0gY2VsbHNbaV1cbiAgICBzd2l0Y2goY2VsbC5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcblxuICAgICAgICB2YXIgdiA9IGNlbGxbMF1cbiAgICAgICAgdmFyIHAgPSBwb3NpdGlvbnNbdl1cblxuICAgICAgICAvL0NoZWNrIE5hTnNcbiAgICAgICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICAgICAgaWYoaXNOYU4ocFtqXSkgfHwgIWlzRmluaXRlKHBbal0pKSB7XG4gICAgICAgICAgICBjb250aW51ZSBmaWxsX2xvb3BcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwUG9zLnB1c2gocFswXSwgcFsxXSwgcFsyXSlcblxuICAgICAgICB2YXIgY1xuICAgICAgICBpZih2ZXJ0ZXhDb2xvcnMpIHtcbiAgICAgICAgICBjID0gdmVydGV4Q29sb3JzW3ZdXG4gICAgICAgIH0gZWxzZSBpZihjZWxsQ29sb3JzKSB7XG4gICAgICAgICAgYyA9IGNlbGxDb2xvcnNbaV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjID0gbWVzaENvbG9yXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5vcGFjaXR5c2NhbGUgJiYgdmVydGV4SW50ZW5zaXR5KSB7XG4gICAgICAgICAgdENvbC5wdXNoKGNbMF0sIGNbMV0sIGNbMl0sXG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkgKiBnZXRPcGFjaXR5RnJvbVNjYWxlKFxuICAgICAgICAgICAgICAodmVydGV4SW50ZW5zaXR5W3ZdIC0gaW50ZW5zaXR5TG8pIC8gKGludGVuc2l0eUhpIC0gaW50ZW5zaXR5TG8pLFxuICAgICAgICAgICAgICB0aGlzLm9wYWNpdHlzY2FsZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIGlmKGMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgcENvbC5wdXNoKGNbMF0sIGNbMV0sIGNbMl0sIHRoaXMub3BhY2l0eSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwQ29sLnB1c2goY1swXSwgY1sxXSwgY1syXSwgY1szXSAqIHRoaXMub3BhY2l0eSlcbiAgICAgICAgICBpZihjWzNdIDwgMSkgdGhpcy5oYXNBbHBoYSA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1dlxuICAgICAgICBpZih2ZXJ0ZXhVVnMpIHtcbiAgICAgICAgICB1diA9IHZlcnRleFVWc1t2XVxuICAgICAgICB9IGVsc2UgaWYodmVydGV4SW50ZW5zaXR5KSB7XG4gICAgICAgICAgdXYgPSBbXG4gICAgICAgICAgICAodmVydGV4SW50ZW5zaXR5W3ZdIC0gaW50ZW5zaXR5TG8pIC9cbiAgICAgICAgICAgIChpbnRlbnNpdHlIaSAtIGludGVuc2l0eUxvKSwgMF1cbiAgICAgICAgfSBlbHNlIGlmKGNlbGxVVnMpIHtcbiAgICAgICAgICB1diA9IGNlbGxVVnNbaV1cbiAgICAgICAgfSBlbHNlIGlmKGNlbGxJbnRlbnNpdHkpIHtcbiAgICAgICAgICB1diA9IFtcbiAgICAgICAgICAgIChjZWxsSW50ZW5zaXR5W2ldIC0gaW50ZW5zaXR5TG8pIC9cbiAgICAgICAgICAgIChpbnRlbnNpdHlIaSAtIGludGVuc2l0eUxvKSwgMF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1diA9IFtcbiAgICAgICAgICAgIChwWzJdIC0gaW50ZW5zaXR5TG8pIC9cbiAgICAgICAgICAgIChpbnRlbnNpdHlIaSAtIGludGVuc2l0eUxvKSwgMF1cbiAgICAgICAgfVxuICAgICAgICBwVVZzLnB1c2godXZbMF0sIHV2WzFdKVxuXG4gICAgICAgIGlmKHBvaW50U2l6ZXMpIHtcbiAgICAgICAgICBwU2l6LnB1c2gocG9pbnRTaXplc1t2XSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwU2l6LnB1c2gobWVzaFBvaW50U2l6ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHBJZHMucHVzaChpKVxuXG4gICAgICAgIHBvaW50Q291bnQgKz0gMVxuICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAyOlxuXG4gICAgICAgIC8vQ2hlY2sgTmFOc1xuICAgICAgICBmb3IodmFyIGo9MDsgajwyOyArK2opIHtcbiAgICAgICAgICB2YXIgdiA9IGNlbGxbal1cbiAgICAgICAgICB2YXIgcCA9IHBvc2l0aW9uc1t2XVxuICAgICAgICAgIGZvcih2YXIgaz0wOyBrPDM7ICsraykge1xuICAgICAgICAgICAgaWYoaXNOYU4ocFtrXSkgfHwgIWlzRmluaXRlKHBba10pKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlIGZpbGxfbG9vcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcih2YXIgaj0wOyBqPDI7ICsraikge1xuICAgICAgICAgIHZhciB2ID0gY2VsbFtqXVxuICAgICAgICAgIHZhciBwID0gcG9zaXRpb25zW3ZdXG5cbiAgICAgICAgICBlUG9zLnB1c2gocFswXSwgcFsxXSwgcFsyXSlcblxuICAgICAgICAgIHZhciBjXG4gICAgICAgICAgaWYodmVydGV4Q29sb3JzKSB7XG4gICAgICAgICAgICBjID0gdmVydGV4Q29sb3JzW3ZdXG4gICAgICAgICAgfSBlbHNlIGlmKGNlbGxDb2xvcnMpIHtcbiAgICAgICAgICAgIGMgPSBjZWxsQ29sb3JzW2ldXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGMgPSBtZXNoQ29sb3JcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYodGhpcy5vcGFjaXR5c2NhbGUgJiYgdmVydGV4SW50ZW5zaXR5KSB7XG4gICAgICAgICAgICB0Q29sLnB1c2goY1swXSwgY1sxXSwgY1syXSxcbiAgICAgICAgICAgICAgdGhpcy5vcGFjaXR5ICogZ2V0T3BhY2l0eUZyb21TY2FsZShcbiAgICAgICAgICAgICAgICAodmVydGV4SW50ZW5zaXR5W3ZdIC0gaW50ZW5zaXR5TG8pIC8gKGludGVuc2l0eUhpIC0gaW50ZW5zaXR5TG8pLFxuICAgICAgICAgICAgICAgIHRoaXMub3BhY2l0eXNjYWxlXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9IGVsc2UgaWYoYy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIGVDb2wucHVzaChjWzBdLCBjWzFdLCBjWzJdLCB0aGlzLm9wYWNpdHkpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVDb2wucHVzaChjWzBdLCBjWzFdLCBjWzJdLCBjWzNdICogdGhpcy5vcGFjaXR5KVxuICAgICAgICAgICAgaWYoY1szXSA8IDEpIHRoaXMuaGFzQWxwaGEgPSB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHV2XG4gICAgICAgICAgaWYodmVydGV4VVZzKSB7XG4gICAgICAgICAgICB1diA9IHZlcnRleFVWc1t2XVxuICAgICAgICAgIH0gZWxzZSBpZih2ZXJ0ZXhJbnRlbnNpdHkpIHtcbiAgICAgICAgICAgIHV2ID0gW1xuICAgICAgICAgICAgICAodmVydGV4SW50ZW5zaXR5W3ZdIC0gaW50ZW5zaXR5TG8pIC9cbiAgICAgICAgICAgICAgKGludGVuc2l0eUhpIC0gaW50ZW5zaXR5TG8pLCAwXVxuICAgICAgICAgIH0gZWxzZSBpZihjZWxsVVZzKSB7XG4gICAgICAgICAgICB1diA9IGNlbGxVVnNbaV1cbiAgICAgICAgICB9IGVsc2UgaWYoY2VsbEludGVuc2l0eSkge1xuICAgICAgICAgICAgdXYgPSBbXG4gICAgICAgICAgICAgIChjZWxsSW50ZW5zaXR5W2ldIC0gaW50ZW5zaXR5TG8pIC9cbiAgICAgICAgICAgICAgKGludGVuc2l0eUhpIC0gaW50ZW5zaXR5TG8pLCAwXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1diA9IFtcbiAgICAgICAgICAgICAgKHBbMl0gLSBpbnRlbnNpdHlMbykgL1xuICAgICAgICAgICAgICAoaW50ZW5zaXR5SGkgLSBpbnRlbnNpdHlMbyksIDBdXG4gICAgICAgICAgfVxuICAgICAgICAgIGVVVnMucHVzaCh1dlswXSwgdXZbMV0pXG5cbiAgICAgICAgICBlSWRzLnB1c2goaSlcbiAgICAgICAgfVxuICAgICAgICBlZGdlQ291bnQgKz0gMVxuICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAzOlxuICAgICAgICAvL0NoZWNrIE5hTnNcbiAgICAgICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICAgICAgdmFyIHYgPSBjZWxsW2pdXG4gICAgICAgICAgdmFyIHAgPSBwb3NpdGlvbnNbdl1cbiAgICAgICAgICBmb3IodmFyIGs9MDsgazwzOyArK2spIHtcbiAgICAgICAgICAgIGlmKGlzTmFOKHBba10pIHx8ICFpc0Zpbml0ZShwW2tdKSkge1xuICAgICAgICAgICAgICBjb250aW51ZSBmaWxsX2xvb3BcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgICAgICB2YXIgdiA9IGNlbGxbMiAtIGpdXG5cbiAgICAgICAgICB2YXIgcCA9IHBvc2l0aW9uc1t2XVxuICAgICAgICAgIHRQb3MucHVzaChwWzBdLCBwWzFdLCBwWzJdKVxuXG4gICAgICAgICAgdmFyIGNcbiAgICAgICAgICBpZih2ZXJ0ZXhDb2xvcnMpIHtcbiAgICAgICAgICAgIGMgPSB2ZXJ0ZXhDb2xvcnNbdl1cbiAgICAgICAgICB9IGVsc2UgaWYoY2VsbENvbG9ycykge1xuICAgICAgICAgICAgYyA9IGNlbGxDb2xvcnNbaV1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYyA9IG1lc2hDb2xvclxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCFjKSB7XG4gICAgICAgICAgICB0Q29sLnB1c2goMC41LDAuNSwwLjUsMSlcbiAgICAgICAgICB9IGVsc2UgaWYodGhpcy5vcGFjaXR5c2NhbGUgJiYgdmVydGV4SW50ZW5zaXR5KSB7XG4gICAgICAgICAgICB0Q29sLnB1c2goY1swXSwgY1sxXSwgY1syXSxcbiAgICAgICAgICAgICAgdGhpcy5vcGFjaXR5ICogZ2V0T3BhY2l0eUZyb21TY2FsZShcbiAgICAgICAgICAgICAgICAodmVydGV4SW50ZW5zaXR5W3ZdIC0gaW50ZW5zaXR5TG8pIC8gKGludGVuc2l0eUhpIC0gaW50ZW5zaXR5TG8pLFxuICAgICAgICAgICAgICAgIHRoaXMub3BhY2l0eXNjYWxlXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9IGVsc2UgaWYoYy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHRDb2wucHVzaChjWzBdLCBjWzFdLCBjWzJdLCB0aGlzLm9wYWNpdHkpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRDb2wucHVzaChjWzBdLCBjWzFdLCBjWzJdLCBjWzNdICogdGhpcy5vcGFjaXR5KVxuICAgICAgICAgICAgaWYoY1szXSA8IDEpIHRoaXMuaGFzQWxwaGEgPSB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHV2XG4gICAgICAgICAgaWYodmVydGV4VVZzKSB7XG4gICAgICAgICAgICB1diA9IHZlcnRleFVWc1t2XVxuICAgICAgICAgIH0gZWxzZSBpZih2ZXJ0ZXhJbnRlbnNpdHkpIHtcbiAgICAgICAgICAgIHV2ID0gW1xuICAgICAgICAgICAgICAodmVydGV4SW50ZW5zaXR5W3ZdIC0gaW50ZW5zaXR5TG8pIC9cbiAgICAgICAgICAgICAgKGludGVuc2l0eUhpIC0gaW50ZW5zaXR5TG8pLCAwXVxuICAgICAgICAgIH0gZWxzZSBpZihjZWxsVVZzKSB7XG4gICAgICAgICAgICB1diA9IGNlbGxVVnNbaV1cbiAgICAgICAgICB9IGVsc2UgaWYoY2VsbEludGVuc2l0eSkge1xuICAgICAgICAgICAgdXYgPSBbXG4gICAgICAgICAgICAgIChjZWxsSW50ZW5zaXR5W2ldIC0gaW50ZW5zaXR5TG8pIC9cbiAgICAgICAgICAgICAgKGludGVuc2l0eUhpIC0gaW50ZW5zaXR5TG8pLCAwXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1diA9IFtcbiAgICAgICAgICAgICAgKHBbMl0gLSBpbnRlbnNpdHlMbykgL1xuICAgICAgICAgICAgICAoaW50ZW5zaXR5SGkgLSBpbnRlbnNpdHlMbyksIDBdXG4gICAgICAgICAgfVxuICAgICAgICAgIHRVVnMucHVzaCh1dlswXSwgdXZbMV0pXG5cbiAgICAgICAgICB2YXIgcVxuICAgICAgICAgIGlmKHZlcnRleE5vcm1hbHMpIHtcbiAgICAgICAgICAgIHEgPSB2ZXJ0ZXhOb3JtYWxzW3ZdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHEgPSBjZWxsTm9ybWFsc1tpXVxuICAgICAgICAgIH1cbiAgICAgICAgICB0Tm9yLnB1c2gocVswXSwgcVsxXSwgcVsyXSlcblxuICAgICAgICAgIHRJZHMucHVzaChpKVxuICAgICAgICB9XG4gICAgICAgIHRyaWFuZ2xlQ291bnQgKz0gMVxuICAgICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgdGhpcy5wb2ludENvdW50ICAgICA9IHBvaW50Q291bnRcbiAgdGhpcy5lZGdlQ291bnQgICAgICA9IGVkZ2VDb3VudFxuICB0aGlzLnRyaWFuZ2xlQ291bnQgID0gdHJpYW5nbGVDb3VudFxuXG4gIHRoaXMucG9pbnRQb3NpdGlvbnMudXBkYXRlKHBQb3MpXG4gIHRoaXMucG9pbnRDb2xvcnMudXBkYXRlKHBDb2wpXG4gIHRoaXMucG9pbnRVVnMudXBkYXRlKHBVVnMpXG4gIHRoaXMucG9pbnRTaXplcy51cGRhdGUocFNpeilcbiAgdGhpcy5wb2ludElkcy51cGRhdGUobmV3IFVpbnQzMkFycmF5KHBJZHMpKVxuXG4gIHRoaXMuZWRnZVBvc2l0aW9ucy51cGRhdGUoZVBvcylcbiAgdGhpcy5lZGdlQ29sb3JzLnVwZGF0ZShlQ29sKVxuICB0aGlzLmVkZ2VVVnMudXBkYXRlKGVVVnMpXG4gIHRoaXMuZWRnZUlkcy51cGRhdGUobmV3IFVpbnQzMkFycmF5KGVJZHMpKVxuXG4gIHRoaXMudHJpYW5nbGVQb3NpdGlvbnMudXBkYXRlKHRQb3MpXG4gIHRoaXMudHJpYW5nbGVDb2xvcnMudXBkYXRlKHRDb2wpXG4gIHRoaXMudHJpYW5nbGVVVnMudXBkYXRlKHRVVnMpXG4gIHRoaXMudHJpYW5nbGVOb3JtYWxzLnVwZGF0ZSh0Tm9yKVxuICB0aGlzLnRyaWFuZ2xlSWRzLnVwZGF0ZShuZXcgVWludDMyQXJyYXkodElkcykpXG59XG5cbnByb3RvLmRyYXdUcmFuc3BhcmVudCA9IHByb3RvLmRyYXcgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgcGFyYW1zID0gcGFyYW1zIHx8IHt9XG4gIHZhciBnbCAgICAgICAgICA9IHRoaXMuZ2xcbiAgdmFyIG1vZGVsICAgICAgID0gcGFyYW1zLm1vZGVsICAgICAgfHwgSURFTlRJVFlcbiAgdmFyIHZpZXcgICAgICAgID0gcGFyYW1zLnZpZXcgICAgICAgfHwgSURFTlRJVFlcbiAgdmFyIHByb2plY3Rpb24gID0gcGFyYW1zLnByb2plY3Rpb24gfHwgSURFTlRJVFlcblxuICB2YXIgY2xpcEJvdW5kcyA9IFtbLTFlNiwtMWU2LC0xZTZdLFsxZTYsMWU2LDFlNl1dXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIGNsaXBCb3VuZHNbMF1baV0gPSBNYXRoLm1heChjbGlwQm91bmRzWzBdW2ldLCB0aGlzLmNsaXBCb3VuZHNbMF1baV0pXG4gICAgY2xpcEJvdW5kc1sxXVtpXSA9IE1hdGgubWluKGNsaXBCb3VuZHNbMV1baV0sIHRoaXMuY2xpcEJvdW5kc1sxXVtpXSlcbiAgfVxuXG4gIHZhciB1bmlmb3JtcyA9IHtcbiAgICBtb2RlbDogICAgICBtb2RlbCxcbiAgICB2aWV3OiAgICAgICB2aWV3LFxuICAgIHByb2plY3Rpb246IHByb2plY3Rpb24sXG4gICAgaW52ZXJzZU1vZGVsOiBJREVOVElUWS5zbGljZSgpLFxuXG4gICAgY2xpcEJvdW5kczogY2xpcEJvdW5kcyxcblxuICAgIGthbWJpZW50OiAgIHRoaXMuYW1iaWVudExpZ2h0LFxuICAgIGtkaWZmdXNlOiAgIHRoaXMuZGlmZnVzZUxpZ2h0LFxuICAgIGtzcGVjdWxhcjogIHRoaXMuc3BlY3VsYXJMaWdodCxcbiAgICByb3VnaG5lc3M6ICB0aGlzLnJvdWdobmVzcyxcbiAgICBmcmVzbmVsOiAgICB0aGlzLmZyZXNuZWwsXG5cbiAgICBleWVQb3NpdGlvbjogICBbMCwwLDBdLFxuICAgIGxpZ2h0UG9zaXRpb246IFswLDAsMF0sXG5cbiAgICBjb250b3VyQ29sb3I6IHRoaXMuY29udG91ckNvbG9yLFxuXG4gICAgdGV4dHVyZTogICAgMFxuICB9XG5cbiAgdW5pZm9ybXMuaW52ZXJzZU1vZGVsID0gaW52ZXJ0KHVuaWZvcm1zLmludmVyc2VNb2RlbCwgdW5pZm9ybXMubW9kZWwpXG5cbiAgZ2wuZGlzYWJsZShnbC5DVUxMX0ZBQ0UpXG5cbiAgdGhpcy50ZXh0dXJlLmJpbmQoMClcblxuICB2YXIgaW52Q2FtZXJhTWF0cml4ID0gbmV3IEFycmF5KDE2KVxuICBtdWx0aXBseShpbnZDYW1lcmFNYXRyaXgsIHVuaWZvcm1zLnZpZXcsIHVuaWZvcm1zLm1vZGVsKVxuICBtdWx0aXBseShpbnZDYW1lcmFNYXRyaXgsIHVuaWZvcm1zLnByb2plY3Rpb24sIGludkNhbWVyYU1hdHJpeClcbiAgaW52ZXJ0KGludkNhbWVyYU1hdHJpeCwgaW52Q2FtZXJhTWF0cml4KVxuXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIHVuaWZvcm1zLmV5ZVBvc2l0aW9uW2ldID0gaW52Q2FtZXJhTWF0cml4WzEyK2ldIC8gaW52Q2FtZXJhTWF0cml4WzE1XVxuICB9XG5cbiAgdmFyIHcgPSBpbnZDYW1lcmFNYXRyaXhbMTVdXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIHcgKz0gdGhpcy5saWdodFBvc2l0aW9uW2ldICogaW52Q2FtZXJhTWF0cml4WzQqaSszXVxuICB9XG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIHZhciBzID0gaW52Q2FtZXJhTWF0cml4WzEyK2ldXG4gICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICBzICs9IGludkNhbWVyYU1hdHJpeFs0KmoraV0gKiB0aGlzLmxpZ2h0UG9zaXRpb25bal1cbiAgICB9XG4gICAgdW5pZm9ybXMubGlnaHRQb3NpdGlvbltpXSA9IHMgLyB3XG4gIH1cblxuICBpZih0aGlzLnRyaWFuZ2xlQ291bnQgPiAwKSB7XG4gICAgdmFyIHNoYWRlciA9IHRoaXMudHJpU2hhZGVyXG4gICAgc2hhZGVyLmJpbmQoKVxuICAgIHNoYWRlci51bmlmb3JtcyA9IHVuaWZvcm1zXG5cbiAgICB0aGlzLnRyaWFuZ2xlVkFPLmJpbmQoKVxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCB0aGlzLnRyaWFuZ2xlQ291bnQqMylcbiAgICB0aGlzLnRyaWFuZ2xlVkFPLnVuYmluZCgpXG4gIH1cblxuICBpZih0aGlzLmVkZ2VDb3VudCA+IDAgJiYgdGhpcy5saW5lV2lkdGggPiAwKSB7XG4gICAgdmFyIHNoYWRlciA9IHRoaXMubGluZVNoYWRlclxuICAgIHNoYWRlci5iaW5kKClcbiAgICBzaGFkZXIudW5pZm9ybXMgPSB1bmlmb3Jtc1xuXG4gICAgdGhpcy5lZGdlVkFPLmJpbmQoKVxuICAgIGdsLmxpbmVXaWR0aCh0aGlzLmxpbmVXaWR0aCAqIHRoaXMucGl4ZWxSYXRpbylcbiAgICBnbC5kcmF3QXJyYXlzKGdsLkxJTkVTLCAwLCB0aGlzLmVkZ2VDb3VudCoyKVxuICAgIHRoaXMuZWRnZVZBTy51bmJpbmQoKVxuICB9XG5cbiAgaWYodGhpcy5wb2ludENvdW50ID4gMCkge1xuICAgIHZhciBzaGFkZXIgPSB0aGlzLnBvaW50U2hhZGVyXG4gICAgc2hhZGVyLmJpbmQoKVxuICAgIHNoYWRlci51bmlmb3JtcyA9IHVuaWZvcm1zXG5cbiAgICB0aGlzLnBvaW50VkFPLmJpbmQoKVxuICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCB0aGlzLnBvaW50Q291bnQpXG4gICAgdGhpcy5wb2ludFZBTy51bmJpbmQoKVxuICB9XG5cbiAgaWYodGhpcy5jb250b3VyRW5hYmxlICYmIHRoaXMuY29udG91ckNvdW50ID4gMCAmJiB0aGlzLmNvbnRvdXJMaW5lV2lkdGggPiAwKSB7XG4gICAgdmFyIHNoYWRlciA9IHRoaXMuY29udG91clNoYWRlclxuICAgIHNoYWRlci5iaW5kKClcbiAgICBzaGFkZXIudW5pZm9ybXMgPSB1bmlmb3Jtc1xuXG4gICAgdGhpcy5jb250b3VyVkFPLmJpbmQoKVxuICAgIGdsLmRyYXdBcnJheXMoZ2wuTElORVMsIDAsIHRoaXMuY29udG91ckNvdW50KVxuICAgIHRoaXMuY29udG91clZBTy51bmJpbmQoKVxuICB9XG59XG5cbnByb3RvLmRyYXdQaWNrID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fVxuXG4gIHZhciBnbCAgICAgICAgID0gdGhpcy5nbFxuXG4gIHZhciBtb2RlbCAgICAgID0gcGFyYW1zLm1vZGVsICAgICAgfHwgSURFTlRJVFlcbiAgdmFyIHZpZXcgICAgICAgPSBwYXJhbXMudmlldyAgICAgICB8fCBJREVOVElUWVxuICB2YXIgcHJvamVjdGlvbiA9IHBhcmFtcy5wcm9qZWN0aW9uIHx8IElERU5USVRZXG5cbiAgdmFyIGNsaXBCb3VuZHMgPSBbWy0xZTYsLTFlNiwtMWU2XSxbMWU2LDFlNiwxZTZdXVxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICBjbGlwQm91bmRzWzBdW2ldID0gTWF0aC5tYXgoY2xpcEJvdW5kc1swXVtpXSwgdGhpcy5jbGlwQm91bmRzWzBdW2ldKVxuICAgIGNsaXBCb3VuZHNbMV1baV0gPSBNYXRoLm1pbihjbGlwQm91bmRzWzFdW2ldLCB0aGlzLmNsaXBCb3VuZHNbMV1baV0pXG4gIH1cblxuICAvL1NhdmUgY2FtZXJhIHBhcmFtZXRlcnNcbiAgdGhpcy5fbW9kZWwgICAgICA9IFtdLnNsaWNlLmNhbGwobW9kZWwpXG4gIHRoaXMuX3ZpZXcgICAgICAgPSBbXS5zbGljZS5jYWxsKHZpZXcpXG4gIHRoaXMuX3Byb2plY3Rpb24gPSBbXS5zbGljZS5jYWxsKHByb2plY3Rpb24pXG4gIHRoaXMuX3Jlc29sdXRpb24gPSBbZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0XVxuXG4gIHZhciB1bmlmb3JtcyA9IHtcbiAgICBtb2RlbDogICAgICBtb2RlbCxcbiAgICB2aWV3OiAgICAgICB2aWV3LFxuICAgIHByb2plY3Rpb246IHByb2plY3Rpb24sXG4gICAgY2xpcEJvdW5kczogY2xpcEJvdW5kcyxcbiAgICBwaWNrSWQ6ICAgICB0aGlzLnBpY2tJZCAvIDI1NS4wLFxuICB9XG5cbiAgdmFyIHNoYWRlciA9IHRoaXMucGlja1NoYWRlclxuICBzaGFkZXIuYmluZCgpXG4gIHNoYWRlci51bmlmb3JtcyA9IHVuaWZvcm1zXG5cbiAgaWYodGhpcy50cmlhbmdsZUNvdW50ID4gMCkge1xuICAgIHRoaXMudHJpYW5nbGVWQU8uYmluZCgpXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIHRoaXMudHJpYW5nbGVDb3VudCozKVxuICAgIHRoaXMudHJpYW5nbGVWQU8udW5iaW5kKClcbiAgfVxuXG4gIGlmKHRoaXMuZWRnZUNvdW50ID4gMCkge1xuICAgIHRoaXMuZWRnZVZBTy5iaW5kKClcbiAgICBnbC5saW5lV2lkdGgodGhpcy5saW5lV2lkdGggKiB0aGlzLnBpeGVsUmF0aW8pXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5MSU5FUywgMCwgdGhpcy5lZGdlQ291bnQqMilcbiAgICB0aGlzLmVkZ2VWQU8udW5iaW5kKClcbiAgfVxuXG4gIGlmKHRoaXMucG9pbnRDb3VudCA+IDApIHtcbiAgICB2YXIgc2hhZGVyID0gdGhpcy5wb2ludFBpY2tTaGFkZXJcbiAgICBzaGFkZXIuYmluZCgpXG4gICAgc2hhZGVyLnVuaWZvcm1zID0gdW5pZm9ybXNcblxuICAgIHRoaXMucG9pbnRWQU8uYmluZCgpXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5QT0lOVFMsIDAsIHRoaXMucG9pbnRDb3VudClcbiAgICB0aGlzLnBvaW50VkFPLnVuYmluZCgpXG4gIH1cbn1cblxuXG5wcm90by5waWNrID0gZnVuY3Rpb24ocGlja0RhdGEpIHtcbiAgaWYoIXBpY2tEYXRhKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBpZihwaWNrRGF0YS5pZCAhPT0gdGhpcy5waWNrSWQpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgdmFyIGNlbGxJZCAgICA9IHBpY2tEYXRhLnZhbHVlWzBdICsgMjU2KnBpY2tEYXRhLnZhbHVlWzFdICsgNjU1MzYqcGlja0RhdGEudmFsdWVbMl1cbiAgdmFyIGNlbGwgICAgICA9IHRoaXMuY2VsbHNbY2VsbElkXVxuICB2YXIgcG9zaXRpb25zID0gdGhpcy5wb3NpdGlvbnNcblxuICB2YXIgc2ltcGxleCAgID0gbmV3IEFycmF5KGNlbGwubGVuZ3RoKVxuICBmb3IodmFyIGk9MDsgaTxjZWxsLmxlbmd0aDsgKytpKSB7XG4gICAgc2ltcGxleFtpXSA9IHBvc2l0aW9uc1tjZWxsW2ldXVxuICB9XG5cbiAgdmFyIHggPSBwaWNrRGF0YS5jb29yZFswXTtcbiAgdmFyIHkgPSBwaWNrRGF0YS5jb29yZFsxXTtcblxuICBpZighdGhpcy5waWNrVmVydGV4KSB7XG4gICAgdmFyIEEgPSB0aGlzLnBvc2l0aW9uc1tjZWxsWzBdXTtcbiAgICB2YXIgQiA9IHRoaXMucG9zaXRpb25zW2NlbGxbMV1dO1xuICAgIHZhciBDID0gdGhpcy5wb3NpdGlvbnNbY2VsbFsyXV07XG5cbiAgICB2YXIgZGF0YUNvb3JkaW5hdGUgPSBbXG4gICAgICAoQVswXSArIEJbMF0gKyBDWzBdKSAvIDMsXG4gICAgICAoQVsxXSArIEJbMV0gKyBDWzFdKSAvIDMsXG4gICAgICAoQVsyXSArIEJbMl0gKyBDWzJdKSAvIDNcbiAgICBdXG5cbiAgICByZXR1cm4ge1xuICAgICAgX2NlbGxDZW50ZXIgOiB0cnVlLFxuICAgICAgcG9zaXRpb246IFt4LCB5XSxcbiAgICAgIGluZGV4OiAgICBjZWxsSWQsXG4gICAgICBjZWxsOiAgICAgY2VsbCxcbiAgICAgIGNlbGxJZDogICBjZWxsSWQsXG4gICAgICBpbnRlbnNpdHk6ICB0aGlzLmludGVuc2l0eVtjZWxsSWRdLFxuICAgICAgZGF0YUNvb3JkaW5hdGU6IGRhdGFDb29yZGluYXRlXG4gICAgfVxuICB9XG5cbiAgdmFyIGRhdGEgPSBjbG9zZXN0UG9pbnQoXG4gICAgc2ltcGxleCxcbiAgICBbeCAqIHRoaXMucGl4ZWxSYXRpbywgdGhpcy5fcmVzb2x1dGlvblsxXSAtIHkgKiB0aGlzLnBpeGVsUmF0aW9dLFxuICAgIHRoaXMuX21vZGVsLFxuICAgIHRoaXMuX3ZpZXcsXG4gICAgdGhpcy5fcHJvamVjdGlvbixcbiAgICB0aGlzLl9yZXNvbHV0aW9uKVxuXG4gIGlmKCFkYXRhKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZhciB3ZWlnaHRzID0gZGF0YVsyXVxuICB2YXIgaW50ZXJwSW50ZW5zaXR5ID0gMC4wXG4gIGZvcih2YXIgaT0wOyBpPGNlbGwubGVuZ3RoOyArK2kpIHtcbiAgICBpbnRlcnBJbnRlbnNpdHkgKz0gd2VpZ2h0c1tpXSAqIHRoaXMuaW50ZW5zaXR5W2NlbGxbaV1dXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBvc2l0aW9uOiBkYXRhWzFdLFxuICAgIGluZGV4OiAgICBjZWxsW2RhdGFbMF1dLFxuICAgIGNlbGw6ICAgICBjZWxsLFxuICAgIGNlbGxJZDogICBjZWxsSWQsXG4gICAgaW50ZW5zaXR5OiAgaW50ZXJwSW50ZW5zaXR5LFxuICAgIGRhdGFDb29yZGluYXRlOiB0aGlzLnBvc2l0aW9uc1tjZWxsW2RhdGFbMF1dXVxuICB9XG59XG5cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnRleHR1cmUuZGlzcG9zZSgpXG5cbiAgdGhpcy50cmlTaGFkZXIuZGlzcG9zZSgpXG4gIHRoaXMubGluZVNoYWRlci5kaXNwb3NlKClcbiAgdGhpcy5wb2ludFNoYWRlci5kaXNwb3NlKClcbiAgdGhpcy5waWNrU2hhZGVyLmRpc3Bvc2UoKVxuICB0aGlzLnBvaW50UGlja1NoYWRlci5kaXNwb3NlKClcblxuICB0aGlzLnRyaWFuZ2xlVkFPLmRpc3Bvc2UoKVxuICB0aGlzLnRyaWFuZ2xlUG9zaXRpb25zLmRpc3Bvc2UoKVxuICB0aGlzLnRyaWFuZ2xlQ29sb3JzLmRpc3Bvc2UoKVxuICB0aGlzLnRyaWFuZ2xlVVZzLmRpc3Bvc2UoKVxuICB0aGlzLnRyaWFuZ2xlTm9ybWFscy5kaXNwb3NlKClcbiAgdGhpcy50cmlhbmdsZUlkcy5kaXNwb3NlKClcblxuICB0aGlzLmVkZ2VWQU8uZGlzcG9zZSgpXG4gIHRoaXMuZWRnZVBvc2l0aW9ucy5kaXNwb3NlKClcbiAgdGhpcy5lZGdlQ29sb3JzLmRpc3Bvc2UoKVxuICB0aGlzLmVkZ2VVVnMuZGlzcG9zZSgpXG4gIHRoaXMuZWRnZUlkcy5kaXNwb3NlKClcblxuICB0aGlzLnBvaW50VkFPLmRpc3Bvc2UoKVxuICB0aGlzLnBvaW50UG9zaXRpb25zLmRpc3Bvc2UoKVxuICB0aGlzLnBvaW50Q29sb3JzLmRpc3Bvc2UoKVxuICB0aGlzLnBvaW50VVZzLmRpc3Bvc2UoKVxuICB0aGlzLnBvaW50U2l6ZXMuZGlzcG9zZSgpXG4gIHRoaXMucG9pbnRJZHMuZGlzcG9zZSgpXG5cbiAgdGhpcy5jb250b3VyVkFPLmRpc3Bvc2UoKVxuICB0aGlzLmNvbnRvdXJQb3NpdGlvbnMuZGlzcG9zZSgpXG4gIHRoaXMuY29udG91clNoYWRlci5kaXNwb3NlKClcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWVzaFNoYWRlcihnbCkge1xuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBtZXNoU2hhZGVyLnZlcnRleCwgbWVzaFNoYWRlci5mcmFnbWVudClcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ubG9jYXRpb24gPSAwXG4gIHNoYWRlci5hdHRyaWJ1dGVzLmNvbG9yLmxvY2F0aW9uICAgID0gMlxuICBzaGFkZXIuYXR0cmlidXRlcy51di5sb2NhdGlvbiAgICAgICA9IDNcbiAgc2hhZGVyLmF0dHJpYnV0ZXMubm9ybWFsLmxvY2F0aW9uICAgPSA0XG4gIHJldHVybiBzaGFkZXJcbn1cblxuZnVuY3Rpb24gY3JlYXRlV2lyZVNoYWRlcihnbCkge1xuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCB3aXJlU2hhZGVyLnZlcnRleCwgd2lyZVNoYWRlci5mcmFnbWVudClcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ubG9jYXRpb24gPSAwXG4gIHNoYWRlci5hdHRyaWJ1dGVzLmNvbG9yLmxvY2F0aW9uICAgID0gMlxuICBzaGFkZXIuYXR0cmlidXRlcy51di5sb2NhdGlvbiAgICAgICA9IDNcbiAgcmV0dXJuIHNoYWRlclxufVxuXG5mdW5jdGlvbiBjcmVhdGVQb2ludFNoYWRlcihnbCkge1xuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBwb2ludFNoYWRlci52ZXJ0ZXgsIHBvaW50U2hhZGVyLmZyYWdtZW50KVxuICBzaGFkZXIuYXR0cmlidXRlcy5wb3NpdGlvbi5sb2NhdGlvbiAgPSAwXG4gIHNoYWRlci5hdHRyaWJ1dGVzLmNvbG9yLmxvY2F0aW9uICAgICA9IDJcbiAgc2hhZGVyLmF0dHJpYnV0ZXMudXYubG9jYXRpb24gICAgICAgID0gM1xuICBzaGFkZXIuYXR0cmlidXRlcy5wb2ludFNpemUubG9jYXRpb24gPSA0XG4gIHJldHVybiBzaGFkZXJcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGlja1NoYWRlcihnbCkge1xuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBwaWNrU2hhZGVyLnZlcnRleCwgcGlja1NoYWRlci5mcmFnbWVudClcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ubG9jYXRpb24gPSAwXG4gIHNoYWRlci5hdHRyaWJ1dGVzLmlkLmxvY2F0aW9uICAgICAgID0gMVxuICByZXR1cm4gc2hhZGVyXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBvaW50UGlja1NoYWRlcihnbCkge1xuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBwb2ludFBpY2tTaGFkZXIudmVydGV4LCBwb2ludFBpY2tTaGFkZXIuZnJhZ21lbnQpXG4gIHNoYWRlci5hdHRyaWJ1dGVzLnBvc2l0aW9uLmxvY2F0aW9uICA9IDBcbiAgc2hhZGVyLmF0dHJpYnV0ZXMuaWQubG9jYXRpb24gICAgICAgID0gMVxuICBzaGFkZXIuYXR0cmlidXRlcy5wb2ludFNpemUubG9jYXRpb24gPSA0XG4gIHJldHVybiBzaGFkZXJcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udG91clNoYWRlcihnbCkge1xuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBjb250b3VyU2hhZGVyLnZlcnRleCwgY29udG91clNoYWRlci5mcmFnbWVudClcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ubG9jYXRpb24gPSAwXG4gIHJldHVybiBzaGFkZXJcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2ltcGxpY2lhbE1lc2goZ2wsIHBhcmFtcykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHBhcmFtcyA9IGdsO1xuICAgIGdsID0gcGFyYW1zLmdsO1xuICB9XG5cbiAgLy9lbmFibGUgZGVyaXZhdGl2ZXMgZm9yIGZhY2Ugbm9ybWFsc1xuICB2YXIgZXh0ID0gZ2wuZ2V0RXh0ZW5zaW9uKCdPRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnKSB8fCBnbC5nZXRFeHRlbnNpb24oJ01PWl9PRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnKSB8fCBnbC5nZXRFeHRlbnNpb24oJ1dFQktJVF9PRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnKVxuICBpZiAoIWV4dClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Rlcml2YXRpdmVzIG5vdCBzdXBwb3J0ZWQnKVxuXG4gIHZhciB0cmlTaGFkZXIgICAgICAgPSBjcmVhdGVNZXNoU2hhZGVyKGdsKVxuICB2YXIgbGluZVNoYWRlciAgICAgID0gY3JlYXRlV2lyZVNoYWRlcihnbClcbiAgdmFyIHBvaW50U2hhZGVyICAgICA9IGNyZWF0ZVBvaW50U2hhZGVyKGdsKVxuICB2YXIgcGlja1NoYWRlciAgICAgID0gY3JlYXRlUGlja1NoYWRlcihnbClcbiAgdmFyIHBvaW50UGlja1NoYWRlciA9IGNyZWF0ZVBvaW50UGlja1NoYWRlcihnbClcbiAgdmFyIGNvbnRvdXJTaGFkZXIgICA9IGNyZWF0ZUNvbnRvdXJTaGFkZXIoZ2wpXG5cbiAgdmFyIG1lc2hUZXh0dXJlICAgICAgID0gY3JlYXRlVGV4dHVyZShnbCxcbiAgICBuZGFycmF5KG5ldyBVaW50OEFycmF5KFsyNTUsMjU1LDI1NSwyNTVdKSwgWzEsMSw0XSkpXG4gIG1lc2hUZXh0dXJlLmdlbmVyYXRlTWlwbWFwKClcbiAgbWVzaFRleHR1cmUubWluRmlsdGVyID0gZ2wuTElORUFSX01JUE1BUF9MSU5FQVJcbiAgbWVzaFRleHR1cmUubWFnRmlsdGVyID0gZ2wuTElORUFSXG5cbiAgdmFyIHRyaWFuZ2xlUG9zaXRpb25zID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgdHJpYW5nbGVDb2xvcnMgICAgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciB0cmlhbmdsZVVWcyAgICAgICA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIHRyaWFuZ2xlTm9ybWFscyAgID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgdHJpYW5nbGVJZHMgICAgICAgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciB0cmlhbmdsZVZBTyAgICAgICA9IGNyZWF0ZVZBTyhnbCwgW1xuICAgIHsgYnVmZmVyOiB0cmlhbmdsZVBvc2l0aW9ucyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogM1xuICAgIH0sXG4gICAgeyBidWZmZXI6IHRyaWFuZ2xlSWRzLFxuICAgICAgdHlwZTogZ2wuVU5TSUdORURfQllURSxcbiAgICAgIHNpemU6IDQsXG4gICAgICBub3JtYWxpemVkOiB0cnVlXG4gICAgfSxcbiAgICB7IGJ1ZmZlcjogdHJpYW5nbGVDb2xvcnMsXG4gICAgICB0eXBlOiBnbC5GTE9BVCxcbiAgICAgIHNpemU6IDRcbiAgICB9LFxuICAgIHsgYnVmZmVyOiB0cmlhbmdsZVVWcyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogMlxuICAgIH0sXG4gICAgeyBidWZmZXI6IHRyaWFuZ2xlTm9ybWFscyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogM1xuICAgIH1cbiAgXSlcblxuICB2YXIgZWRnZVBvc2l0aW9ucyA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIGVkZ2VDb2xvcnMgICAgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciBlZGdlVVZzICAgICAgID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgZWRnZUlkcyAgICAgICA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIGVkZ2VWQU8gICAgICAgPSBjcmVhdGVWQU8oZ2wsIFtcbiAgICB7IGJ1ZmZlcjogZWRnZVBvc2l0aW9ucyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogM1xuICAgIH0sXG4gICAgeyBidWZmZXI6IGVkZ2VJZHMsXG4gICAgICB0eXBlOiBnbC5VTlNJR05FRF9CWVRFLFxuICAgICAgc2l6ZTogNCxcbiAgICAgIG5vcm1hbGl6ZWQ6IHRydWVcbiAgICB9LFxuICAgIHsgYnVmZmVyOiBlZGdlQ29sb3JzLFxuICAgICAgdHlwZTogZ2wuRkxPQVQsXG4gICAgICBzaXplOiA0XG4gICAgfSxcbiAgICB7IGJ1ZmZlcjogZWRnZVVWcyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogMlxuICAgIH1cbiAgXSlcblxuICB2YXIgcG9pbnRQb3NpdGlvbnMgID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgcG9pbnRDb2xvcnMgICAgID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgcG9pbnRVVnMgICAgICAgID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgcG9pbnRTaXplcyAgICAgID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgcG9pbnRJZHMgICAgICAgID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgcG9pbnRWQU8gICAgICAgID0gY3JlYXRlVkFPKGdsLCBbXG4gICAgeyBidWZmZXI6IHBvaW50UG9zaXRpb25zLFxuICAgICAgdHlwZTogZ2wuRkxPQVQsXG4gICAgICBzaXplOiAzXG4gICAgfSxcbiAgICB7IGJ1ZmZlcjogcG9pbnRJZHMsXG4gICAgICB0eXBlOiBnbC5VTlNJR05FRF9CWVRFLFxuICAgICAgc2l6ZTogNCxcbiAgICAgIG5vcm1hbGl6ZWQ6IHRydWVcbiAgICB9LFxuICAgIHsgYnVmZmVyOiBwb2ludENvbG9ycyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogNFxuICAgIH0sXG4gICAgeyBidWZmZXI6IHBvaW50VVZzLFxuICAgICAgdHlwZTogZ2wuRkxPQVQsXG4gICAgICBzaXplOiAyXG4gICAgfSxcbiAgICB7IGJ1ZmZlcjogcG9pbnRTaXplcyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogMVxuICAgIH1cbiAgXSlcblxuICB2YXIgY29udG91clBvc2l0aW9ucyA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIGNvbnRvdXJWQU8gICAgICAgPSBjcmVhdGVWQU8oZ2wsIFtcbiAgICB7IGJ1ZmZlcjogY29udG91clBvc2l0aW9ucyxcbiAgICAgIHR5cGU6ICAgZ2wuRkxPQVQsXG4gICAgICBzaXplOiAgIDNcbiAgICB9XSlcblxuICB2YXIgbWVzaCA9IG5ldyBTaW1wbGljaWFsTWVzaChnbFxuICAgICwgbWVzaFRleHR1cmVcbiAgICAsIHRyaVNoYWRlclxuICAgICwgbGluZVNoYWRlclxuICAgICwgcG9pbnRTaGFkZXJcbiAgICAsIHBpY2tTaGFkZXJcbiAgICAsIHBvaW50UGlja1NoYWRlclxuICAgICwgY29udG91clNoYWRlclxuICAgICwgdHJpYW5nbGVQb3NpdGlvbnNcbiAgICAsIHRyaWFuZ2xlSWRzXG4gICAgLCB0cmlhbmdsZUNvbG9yc1xuICAgICwgdHJpYW5nbGVVVnNcbiAgICAsIHRyaWFuZ2xlTm9ybWFsc1xuICAgICwgdHJpYW5nbGVWQU9cbiAgICAsIGVkZ2VQb3NpdGlvbnNcbiAgICAsIGVkZ2VJZHNcbiAgICAsIGVkZ2VDb2xvcnNcbiAgICAsIGVkZ2VVVnNcbiAgICAsIGVkZ2VWQU9cbiAgICAsIHBvaW50UG9zaXRpb25zXG4gICAgLCBwb2ludElkc1xuICAgICwgcG9pbnRDb2xvcnNcbiAgICAsIHBvaW50VVZzXG4gICAgLCBwb2ludFNpemVzXG4gICAgLCBwb2ludFZBT1xuICAgICwgY29udG91clBvc2l0aW9uc1xuICAgICwgY29udG91clZBTylcblxuICBtZXNoLnVwZGF0ZShwYXJhbXMpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTaW1wbGljaWFsTWVzaFxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuLy9IaWdoIGxldmVsIGlkZWE6XG4vLyAxLiBVc2UgQ2xhcmtzb24ncyBpbmNyZW1lbnRhbCBjb25zdHJ1Y3Rpb24gdG8gZmluZCBjb252ZXggaHVsbFxuLy8gMi4gUG9pbnQgbG9jYXRpb24gaW4gdHJpYW5ndWxhdGlvbiBieSBqdW1wIGFuZCB3YWxrXG5cbm1vZHVsZS5leHBvcnRzID0gaW5jcmVtZW50YWxDb252ZXhIdWxsXG5cbnZhciBvcmllbnQgPSByZXF1aXJlKFwicm9idXN0LW9yaWVudGF0aW9uXCIpXG52YXIgY29tcGFyZUNlbGwgPSByZXF1aXJlKFwic2ltcGxpY2lhbC1jb21wbGV4XCIpLmNvbXBhcmVDZWxsc1xuXG5mdW5jdGlvbiBjb21wYXJlSW50KGEsIGIpIHtcbiAgcmV0dXJuIGEgLSBiXG59XG5cbmZ1bmN0aW9uIFNpbXBsZXgodmVydGljZXMsIGFkamFjZW50LCBib3VuZGFyeSkge1xuICB0aGlzLnZlcnRpY2VzID0gdmVydGljZXNcbiAgdGhpcy5hZGphY2VudCA9IGFkamFjZW50XG4gIHRoaXMuYm91bmRhcnkgPSBib3VuZGFyeVxuICB0aGlzLmxhc3RWaXNpdGVkID0gLTFcbn1cblxuU2ltcGxleC5wcm90b3R5cGUuZmxpcCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdCA9IHRoaXMudmVydGljZXNbMF1cbiAgdGhpcy52ZXJ0aWNlc1swXSA9IHRoaXMudmVydGljZXNbMV1cbiAgdGhpcy52ZXJ0aWNlc1sxXSA9IHRcbiAgdmFyIHUgPSB0aGlzLmFkamFjZW50WzBdXG4gIHRoaXMuYWRqYWNlbnRbMF0gPSB0aGlzLmFkamFjZW50WzFdXG4gIHRoaXMuYWRqYWNlbnRbMV0gPSB1XG59XG5cbmZ1bmN0aW9uIEdsdWVGYWNldCh2ZXJ0aWNlcywgY2VsbCwgaW5kZXgpIHtcbiAgdGhpcy52ZXJ0aWNlcyA9IHZlcnRpY2VzXG4gIHRoaXMuY2VsbCA9IGNlbGxcbiAgdGhpcy5pbmRleCA9IGluZGV4XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVHbHVlKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVDZWxsKGEudmVydGljZXMsIGIudmVydGljZXMpXG59XG5cbmZ1bmN0aW9uIGJha2VPcmllbnQoZCkge1xuICB2YXIgY29kZSA9IFtcImZ1bmN0aW9uIG9yaWVudCgpe3ZhciB0dXBsZT10aGlzLnR1cGxlO3JldHVybiB0ZXN0KFwiXVxuICBmb3IodmFyIGk9MDsgaTw9ZDsgKytpKSB7XG4gICAgaWYoaSA+IDApIHtcbiAgICAgIGNvZGUucHVzaChcIixcIilcbiAgICB9XG4gICAgY29kZS5wdXNoKFwidHVwbGVbXCIsIGksIFwiXVwiKVxuICB9XG4gIGNvZGUucHVzaChcIil9cmV0dXJuIG9yaWVudFwiKVxuICB2YXIgcHJvYyA9IG5ldyBGdW5jdGlvbihcInRlc3RcIiwgY29kZS5qb2luKFwiXCIpKVxuICB2YXIgdGVzdCA9IG9yaWVudFtkKzFdXG4gIGlmKCF0ZXN0KSB7XG4gICAgdGVzdCA9IG9yaWVudFxuICB9XG4gIHJldHVybiBwcm9jKHRlc3QpXG59XG5cbnZhciBCQUtFRCA9IFtdXG5cbmZ1bmN0aW9uIFRyaWFuZ3VsYXRpb24oZGltZW5zaW9uLCB2ZXJ0aWNlcywgc2ltcGxpY2VzKSB7XG4gIHRoaXMuZGltZW5zaW9uID0gZGltZW5zaW9uXG4gIHRoaXMudmVydGljZXMgPSB2ZXJ0aWNlc1xuICB0aGlzLnNpbXBsaWNlcyA9IHNpbXBsaWNlc1xuICB0aGlzLmludGVyaW9yID0gc2ltcGxpY2VzLmZpbHRlcihmdW5jdGlvbihjKSB7XG4gICAgcmV0dXJuICFjLmJvdW5kYXJ5XG4gIH0pXG5cbiAgdGhpcy50dXBsZSA9IG5ldyBBcnJheShkaW1lbnNpb24rMSlcbiAgZm9yKHZhciBpPTA7IGk8PWRpbWVuc2lvbjsgKytpKSB7XG4gICAgdGhpcy50dXBsZVtpXSA9IHRoaXMudmVydGljZXNbaV1cbiAgfVxuXG4gIHZhciBvID0gQkFLRURbZGltZW5zaW9uXVxuICBpZighbykge1xuICAgIG8gPSBCQUtFRFtkaW1lbnNpb25dID0gYmFrZU9yaWVudChkaW1lbnNpb24pXG4gIH1cbiAgdGhpcy5vcmllbnQgPSBvXG59XG5cbnZhciBwcm90byA9IFRyaWFuZ3VsYXRpb24ucHJvdG90eXBlXG5cbi8vRGVnZW5lcmF0ZSBzaXR1YXRpb24gd2hlcmUgd2UgYXJlIG9uIGJvdW5kYXJ5LCBidXQgY29wbGFuYXIgdG8gZmFjZVxucHJvdG8uaGFuZGxlQm91bmRhcnlEZWdlbmVyYWN5ID0gZnVuY3Rpb24oY2VsbCwgcG9pbnQpIHtcbiAgdmFyIGQgPSB0aGlzLmRpbWVuc2lvblxuICB2YXIgbiA9IHRoaXMudmVydGljZXMubGVuZ3RoIC0gMVxuICB2YXIgdHVwbGUgPSB0aGlzLnR1cGxlXG4gIHZhciB2ZXJ0cyA9IHRoaXMudmVydGljZXNcblxuICAvL0R1bWIgc29sdXRpb246IEp1c3QgZG8gZGZzIGZyb20gYm91bmRhcnkgY2VsbCB1bnRpbCB3ZSBmaW5kIGFueSBwZWFrLCBvciB0ZXJtaW5hdGVcbiAgdmFyIHRvVmlzaXQgPSBbIGNlbGwgXVxuICBjZWxsLmxhc3RWaXNpdGVkID0gLW5cbiAgd2hpbGUodG9WaXNpdC5sZW5ndGggPiAwKSB7XG4gICAgY2VsbCA9IHRvVmlzaXQucG9wKClcbiAgICB2YXIgY2VsbFZlcnRzID0gY2VsbC52ZXJ0aWNlc1xuICAgIHZhciBjZWxsQWRqID0gY2VsbC5hZGphY2VudFxuICAgIGZvcih2YXIgaT0wOyBpPD1kOyArK2kpIHtcbiAgICAgIHZhciBuZWlnaGJvciA9IGNlbGxBZGpbaV1cbiAgICAgIGlmKCFuZWlnaGJvci5ib3VuZGFyeSB8fCBuZWlnaGJvci5sYXN0VmlzaXRlZCA8PSAtbikge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgdmFyIG52ID0gbmVpZ2hib3IudmVydGljZXNcbiAgICAgIGZvcih2YXIgaj0wOyBqPD1kOyArK2opIHtcbiAgICAgICAgdmFyIHZ2ID0gbnZbal1cbiAgICAgICAgaWYodnYgPCAwKSB7XG4gICAgICAgICAgdHVwbGVbal0gPSBwb2ludFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHR1cGxlW2pdID0gdmVydHNbdnZdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBvID0gdGhpcy5vcmllbnQoKVxuICAgICAgaWYobyA+IDApIHtcbiAgICAgICAgcmV0dXJuIG5laWdoYm9yXG4gICAgICB9XG4gICAgICBuZWlnaGJvci5sYXN0VmlzaXRlZCA9IC1uXG4gICAgICBpZihvID09PSAwKSB7XG4gICAgICAgIHRvVmlzaXQucHVzaChuZWlnaGJvcilcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxucHJvdG8ud2FsayA9IGZ1bmN0aW9uKHBvaW50LCByYW5kb20pIHtcbiAgLy9BbGlhcyBsb2NhbCBwcm9wZXJ0aWVzXG4gIHZhciBuID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGggLSAxXG4gIHZhciBkID0gdGhpcy5kaW1lbnNpb25cbiAgdmFyIHZlcnRzID0gdGhpcy52ZXJ0aWNlc1xuICB2YXIgdHVwbGUgPSB0aGlzLnR1cGxlXG5cbiAgLy9Db21wdXRlIGluaXRpYWwganVtcCBjZWxsXG4gIHZhciBpbml0SW5kZXggPSByYW5kb20gPyAodGhpcy5pbnRlcmlvci5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKXwwIDogKHRoaXMuaW50ZXJpb3IubGVuZ3RoLTEpXG4gIHZhciBjZWxsID0gdGhpcy5pbnRlcmlvclsgaW5pdEluZGV4IF1cblxuICAvL1N0YXJ0IHdhbGtpbmdcbm91dGVyTG9vcDpcbiAgd2hpbGUoIWNlbGwuYm91bmRhcnkpIHtcbiAgICB2YXIgY2VsbFZlcnRzID0gY2VsbC52ZXJ0aWNlc1xuICAgIHZhciBjZWxsQWRqID0gY2VsbC5hZGphY2VudFxuXG4gICAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgICAgdHVwbGVbaV0gPSB2ZXJ0c1tjZWxsVmVydHNbaV1dXG4gICAgfVxuICAgIGNlbGwubGFzdFZpc2l0ZWQgPSBuXG5cbiAgICAvL0ZpbmQgZmFydGhlc3QgYWRqYWNlbnQgY2VsbFxuICAgIGZvcih2YXIgaT0wOyBpPD1kOyArK2kpIHtcbiAgICAgIHZhciBuZWlnaGJvciA9IGNlbGxBZGpbaV1cbiAgICAgIGlmKG5laWdoYm9yLmxhc3RWaXNpdGVkID49IG4pIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHZhciBwcmV2ID0gdHVwbGVbaV1cbiAgICAgIHR1cGxlW2ldID0gcG9pbnRcbiAgICAgIHZhciBvID0gdGhpcy5vcmllbnQoKVxuICAgICAgdHVwbGVbaV0gPSBwcmV2XG4gICAgICBpZihvIDwgMCkge1xuICAgICAgICBjZWxsID0gbmVpZ2hib3JcbiAgICAgICAgY29udGludWUgb3V0ZXJMb29wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighbmVpZ2hib3IuYm91bmRhcnkpIHtcbiAgICAgICAgICBuZWlnaGJvci5sYXN0VmlzaXRlZCA9IG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZWlnaGJvci5sYXN0VmlzaXRlZCA9IC1uXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXR1cm4gY2VsbFxufVxuXG5wcm90by5hZGRQZWFrcyA9IGZ1bmN0aW9uKHBvaW50LCBjZWxsKSB7XG4gIHZhciBuID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGggLSAxXG4gIHZhciBkID0gdGhpcy5kaW1lbnNpb25cbiAgdmFyIHZlcnRzID0gdGhpcy52ZXJ0aWNlc1xuICB2YXIgdHVwbGUgPSB0aGlzLnR1cGxlXG4gIHZhciBpbnRlcmlvciA9IHRoaXMuaW50ZXJpb3JcbiAgdmFyIHNpbXBsaWNlcyA9IHRoaXMuc2ltcGxpY2VzXG5cbiAgLy9XYWxraW5nIGZpbmlzaGVkIGF0IGJvdW5kYXJ5LCB0aW1lIHRvIGFkZCBwZWFrc1xuICB2YXIgdG92aXNpdCA9IFsgY2VsbCBdXG5cbiAgLy9TdHJldGNoIGluaXRpYWwgYm91bmRhcnkgY2VsbCBpbnRvIGEgcGVha1xuICBjZWxsLmxhc3RWaXNpdGVkID0gblxuICBjZWxsLnZlcnRpY2VzW2NlbGwudmVydGljZXMuaW5kZXhPZigtMSldID0gblxuICBjZWxsLmJvdW5kYXJ5ID0gZmFsc2VcbiAgaW50ZXJpb3IucHVzaChjZWxsKVxuXG4gIC8vUmVjb3JkIGEgbGlzdCBvZiBhbGwgbmV3IGJvdW5kYXJpZXMgY3JlYXRlZCBieSBhZGRlZCBwZWFrcyBzbyB3ZSBjYW4gZ2x1ZSB0aGVtIHRvZ2V0aGVyIHdoZW4gd2UgYXJlIGFsbCBkb25lXG4gIHZhciBnbHVlRmFjZXRzID0gW11cblxuICAvL0RvIGEgdHJhdmVyc2FsIG9mIHRoZSBib3VuZGFyeSB3YWxraW5nIG91dHdhcmQgZnJvbSBzdGFydGluZyBwZWFrXG4gIHdoaWxlKHRvdmlzaXQubGVuZ3RoID4gMCkge1xuICAgIC8vUG9wIG9mZiBwZWFrIGFuZCB3YWxrIG92ZXIgYWRqYWNlbnQgY2VsbHNcbiAgICB2YXIgY2VsbCA9IHRvdmlzaXQucG9wKClcbiAgICB2YXIgY2VsbFZlcnRzID0gY2VsbC52ZXJ0aWNlc1xuICAgIHZhciBjZWxsQWRqID0gY2VsbC5hZGphY2VudFxuICAgIHZhciBpbmRleE9mTiA9IGNlbGxWZXJ0cy5pbmRleE9mKG4pXG4gICAgaWYoaW5kZXhPZk4gPCAwKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGZvcih2YXIgaT0wOyBpPD1kOyArK2kpIHtcbiAgICAgIGlmKGkgPT09IGluZGV4T2ZOKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vRm9yIGVhY2ggYm91bmRhcnkgbmVpZ2hib3Igb2YgdGhlIGNlbGxcbiAgICAgIHZhciBuZWlnaGJvciA9IGNlbGxBZGpbaV1cbiAgICAgIGlmKCFuZWlnaGJvci5ib3VuZGFyeSB8fCBuZWlnaGJvci5sYXN0VmlzaXRlZCA+PSBuKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHZhciBudiA9IG5laWdoYm9yLnZlcnRpY2VzXG5cbiAgICAgIC8vVGVzdCBpZiBuZWlnaGJvciBpcyBhIHBlYWtcbiAgICAgIGlmKG5laWdoYm9yLmxhc3RWaXNpdGVkICE9PSAtbikgeyAgICAgIFxuICAgICAgICAvL0NvbXB1dGUgb3JpZW50YXRpb24gb2YgcCByZWxhdGl2ZSB0byBlYWNoIGJvdW5kYXJ5IHBlYWtcbiAgICAgICAgdmFyIGluZGV4T2ZOZWcxID0gMFxuICAgICAgICBmb3IodmFyIGo9MDsgajw9ZDsgKytqKSB7XG4gICAgICAgICAgaWYobnZbal0gPCAwKSB7XG4gICAgICAgICAgICBpbmRleE9mTmVnMSA9IGpcbiAgICAgICAgICAgIHR1cGxlW2pdID0gcG9pbnRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHVwbGVbal0gPSB2ZXJ0c1tudltqXV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG8gPSB0aGlzLm9yaWVudCgpXG5cbiAgICAgICAgLy9UZXN0IGlmIG5laWdoYm9yIGNlbGwgaXMgYWxzbyBhIHBlYWtcbiAgICAgICAgaWYobyA+IDApIHtcbiAgICAgICAgICBudltpbmRleE9mTmVnMV0gPSBuXG4gICAgICAgICAgbmVpZ2hib3IuYm91bmRhcnkgPSBmYWxzZVxuICAgICAgICAgIGludGVyaW9yLnB1c2gobmVpZ2hib3IpXG4gICAgICAgICAgdG92aXNpdC5wdXNoKG5laWdoYm9yKVxuICAgICAgICAgIG5laWdoYm9yLmxhc3RWaXNpdGVkID0gblxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmVpZ2hib3IubGFzdFZpc2l0ZWQgPSAtblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBuYSA9IG5laWdoYm9yLmFkamFjZW50XG5cbiAgICAgIC8vT3RoZXJ3aXNlLCByZXBsYWNlIG5laWdoYm9yIHdpdGggbmV3IGZhY2VcbiAgICAgIHZhciB2dmVydHMgPSBjZWxsVmVydHMuc2xpY2UoKVxuICAgICAgdmFyIHZhZGogPSBjZWxsQWRqLnNsaWNlKClcbiAgICAgIHZhciBuY2VsbCA9IG5ldyBTaW1wbGV4KHZ2ZXJ0cywgdmFkaiwgdHJ1ZSlcbiAgICAgIHNpbXBsaWNlcy5wdXNoKG5jZWxsKVxuXG4gICAgICAvL0Nvbm5lY3QgdG8gbmVpZ2hib3JcbiAgICAgIHZhciBvcHBvc2l0ZSA9IG5hLmluZGV4T2YoY2VsbClcbiAgICAgIGlmKG9wcG9zaXRlIDwgMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgbmFbb3Bwb3NpdGVdID0gbmNlbGxcbiAgICAgIHZhZGpbaW5kZXhPZk5dID0gbmVpZ2hib3JcblxuICAgICAgLy9Db25uZWN0IHRvIGNlbGxcbiAgICAgIHZ2ZXJ0c1tpXSA9IC0xXG4gICAgICB2YWRqW2ldID0gY2VsbFxuICAgICAgY2VsbEFkaltpXSA9IG5jZWxsXG5cbiAgICAgIC8vRmxpcCBmYWNldFxuICAgICAgbmNlbGwuZmxpcCgpXG5cbiAgICAgIC8vQWRkIHRvIGdsdWUgbGlzdFxuICAgICAgZm9yKHZhciBqPTA7IGo8PWQ7ICsraikge1xuICAgICAgICB2YXIgdXUgPSB2dmVydHNbal1cbiAgICAgICAgaWYodXUgPCAwIHx8IHV1ID09PSBuKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmZhY2UgPSBuZXcgQXJyYXkoZC0xKVxuICAgICAgICB2YXIgbnB0ciA9IDBcbiAgICAgICAgZm9yKHZhciBrPTA7IGs8PWQ7ICsraykge1xuICAgICAgICAgIHZhciB2diA9IHZ2ZXJ0c1trXVxuICAgICAgICAgIGlmKHZ2IDwgMCB8fCBrID09PSBqKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBuZmFjZVtucHRyKytdID0gdnZcbiAgICAgICAgfVxuICAgICAgICBnbHVlRmFjZXRzLnB1c2gobmV3IEdsdWVGYWNldChuZmFjZSwgbmNlbGwsIGopKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vR2x1ZSBib3VuZGFyeSBmYWNldHMgdG9nZXRoZXJcbiAgZ2x1ZUZhY2V0cy5zb3J0KGNvbXBhcmVHbHVlKVxuXG4gIGZvcih2YXIgaT0wOyBpKzE8Z2x1ZUZhY2V0cy5sZW5ndGg7IGkrPTIpIHtcbiAgICB2YXIgYSA9IGdsdWVGYWNldHNbaV1cbiAgICB2YXIgYiA9IGdsdWVGYWNldHNbaSsxXVxuICAgIHZhciBhaSA9IGEuaW5kZXhcbiAgICB2YXIgYmkgPSBiLmluZGV4XG4gICAgaWYoYWkgPCAwIHx8IGJpIDwgMCkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgYS5jZWxsLmFkamFjZW50W2EuaW5kZXhdID0gYi5jZWxsXG4gICAgYi5jZWxsLmFkamFjZW50W2IuaW5kZXhdID0gYS5jZWxsXG4gIH1cbn1cblxucHJvdG8uaW5zZXJ0ID0gZnVuY3Rpb24ocG9pbnQsIHJhbmRvbSkge1xuICAvL0FkZCBwb2ludFxuICB2YXIgdmVydHMgPSB0aGlzLnZlcnRpY2VzXG4gIHZlcnRzLnB1c2gocG9pbnQpXG5cbiAgdmFyIGNlbGwgPSB0aGlzLndhbGsocG9pbnQsIHJhbmRvbSlcbiAgaWYoIWNlbGwpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vQWxpYXMgbG9jYWwgcHJvcGVydGllc1xuICB2YXIgZCA9IHRoaXMuZGltZW5zaW9uXG4gIHZhciB0dXBsZSA9IHRoaXMudHVwbGVcblxuICAvL0RlZ2VuZXJhdGUgY2FzZTogSWYgcG9pbnQgaXMgY29wbGFuYXIgdG8gY2VsbCwgdGhlbiB3YWxrIHVudGlsIHdlIGZpbmQgYSBub24tZGVnZW5lcmF0ZSBib3VuZGFyeVxuICBmb3IodmFyIGk9MDsgaTw9ZDsgKytpKSB7XG4gICAgdmFyIHZ2ID0gY2VsbC52ZXJ0aWNlc1tpXVxuICAgIGlmKHZ2IDwgMCkge1xuICAgICAgdHVwbGVbaV0gPSBwb2ludFxuICAgIH0gZWxzZSB7XG4gICAgICB0dXBsZVtpXSA9IHZlcnRzW3Z2XVxuICAgIH1cbiAgfVxuICB2YXIgbyA9IHRoaXMub3JpZW50KHR1cGxlKVxuICBpZihvIDwgMCkge1xuICAgIHJldHVyblxuICB9IGVsc2UgaWYobyA9PT0gMCkge1xuICAgIGNlbGwgPSB0aGlzLmhhbmRsZUJvdW5kYXJ5RGVnZW5lcmFjeShjZWxsLCBwb2ludClcbiAgICBpZighY2VsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgLy9BZGQgcGVha3NcbiAgdGhpcy5hZGRQZWFrcyhwb2ludCwgY2VsbClcbn1cblxuLy9FeHRyYWN0IGFsbCBib3VuZGFyeSBjZWxsc1xucHJvdG8uYm91bmRhcnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGQgPSB0aGlzLmRpbWVuc2lvblxuICB2YXIgYm91bmRhcnkgPSBbXVxuICB2YXIgY2VsbHMgPSB0aGlzLnNpbXBsaWNlc1xuICB2YXIgbmMgPSBjZWxscy5sZW5ndGhcbiAgZm9yKHZhciBpPTA7IGk8bmM7ICsraSkge1xuICAgIHZhciBjID0gY2VsbHNbaV1cbiAgICBpZihjLmJvdW5kYXJ5KSB7XG4gICAgICB2YXIgYmNlbGwgPSBuZXcgQXJyYXkoZClcbiAgICAgIHZhciBjdiA9IGMudmVydGljZXNcbiAgICAgIHZhciBwdHIgPSAwXG4gICAgICB2YXIgcGFyaXR5ID0gMFxuICAgICAgZm9yKHZhciBqPTA7IGo8PWQ7ICsraikge1xuICAgICAgICBpZihjdltqXSA+PSAwKSB7XG4gICAgICAgICAgYmNlbGxbcHRyKytdID0gY3Zbal1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJpdHkgPSBqJjFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYocGFyaXR5ID09PSAoZCYxKSkge1xuICAgICAgICB2YXIgdCA9IGJjZWxsWzBdXG4gICAgICAgIGJjZWxsWzBdID0gYmNlbGxbMV1cbiAgICAgICAgYmNlbGxbMV0gPSB0XG4gICAgICB9XG4gICAgICBib3VuZGFyeS5wdXNoKGJjZWxsKVxuICAgIH1cbiAgfVxuICByZXR1cm4gYm91bmRhcnlcbn1cblxuZnVuY3Rpb24gaW5jcmVtZW50YWxDb252ZXhIdWxsKHBvaW50cywgcmFuZG9tU2VhcmNoKSB7XG4gIHZhciBuID0gcG9pbnRzLmxlbmd0aFxuICBpZihuID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBoYXZlIGF0IGxlYXN0IGQrMSBwb2ludHNcIilcbiAgfVxuICB2YXIgZCA9IHBvaW50c1swXS5sZW5ndGhcbiAgaWYobiA8PSBkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBpbnB1dCBhdCBsZWFzdCBkKzEgcG9pbnRzXCIpXG4gIH1cblxuICAvL0ZJWE1FOiBUaGlzIGNvdWxkIGJlIGRlZ2VuZXJhdGUsIGJ1dCBuZWVkIHRvIHNlbGVjdCBkKzEgbm9uLWNvcGxhbmFyIHBvaW50cyB0byBib290c3RyYXAgcHJvY2Vzc1xuICB2YXIgaW5pdGlhbFNpbXBsZXggPSBwb2ludHMuc2xpY2UoMCwgZCsxKVxuXG4gIC8vTWFrZSBzdXJlIGluaXRpYWwgc2ltcGxleCBpcyBwb3NpdGl2ZWx5IG9yaWVudGVkXG4gIHZhciBvID0gb3JpZW50LmFwcGx5KHZvaWQgMCwgaW5pdGlhbFNpbXBsZXgpXG4gIGlmKG8gPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnB1dCBub3QgaW4gZ2VuZXJhbCBwb3NpdGlvblwiKVxuICB9XG4gIHZhciBpbml0aWFsQ29vcmRzID0gbmV3IEFycmF5KGQrMSlcbiAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgIGluaXRpYWxDb29yZHNbaV0gPSBpXG4gIH1cbiAgaWYobyA8IDApIHtcbiAgICBpbml0aWFsQ29vcmRzWzBdID0gMVxuICAgIGluaXRpYWxDb29yZHNbMV0gPSAwXG4gIH1cblxuICAvL0NyZWF0ZSBpbml0aWFsIHRvcG9sb2dpY2FsIGluZGV4LCBnbHVlIHBvaW50ZXJzIHRvZ2V0aGVyIChraW5kIG9mIG1lc3N5KVxuICB2YXIgaW5pdGlhbENlbGwgPSBuZXcgU2ltcGxleChpbml0aWFsQ29vcmRzLCBuZXcgQXJyYXkoZCsxKSwgZmFsc2UpXG4gIHZhciBib3VuZGFyeSA9IGluaXRpYWxDZWxsLmFkamFjZW50XG4gIHZhciBsaXN0ID0gbmV3IEFycmF5KGQrMilcbiAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgIHZhciB2ZXJ0cyA9IGluaXRpYWxDb29yZHMuc2xpY2UoKVxuICAgIGZvcih2YXIgaj0wOyBqPD1kOyArK2opIHtcbiAgICAgIGlmKGogPT09IGkpIHtcbiAgICAgICAgdmVydHNbal0gPSAtMVxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdCA9IHZlcnRzWzBdXG4gICAgdmVydHNbMF0gPSB2ZXJ0c1sxXVxuICAgIHZlcnRzWzFdID0gdFxuICAgIHZhciBjZWxsID0gbmV3IFNpbXBsZXgodmVydHMsIG5ldyBBcnJheShkKzEpLCB0cnVlKVxuICAgIGJvdW5kYXJ5W2ldID0gY2VsbFxuICAgIGxpc3RbaV0gPSBjZWxsXG4gIH1cbiAgbGlzdFtkKzFdID0gaW5pdGlhbENlbGxcbiAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgIHZhciB2ZXJ0cyA9IGJvdW5kYXJ5W2ldLnZlcnRpY2VzXG4gICAgdmFyIGFkaiA9IGJvdW5kYXJ5W2ldLmFkamFjZW50XG4gICAgZm9yKHZhciBqPTA7IGo8PWQ7ICsraikge1xuICAgICAgdmFyIHYgPSB2ZXJ0c1tqXVxuICAgICAgaWYodiA8IDApIHtcbiAgICAgICAgYWRqW2pdID0gaW5pdGlhbENlbGxcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGZvcih2YXIgaz0wOyBrPD1kOyArK2spIHtcbiAgICAgICAgaWYoYm91bmRhcnlba10udmVydGljZXMuaW5kZXhPZih2KSA8IDApIHtcbiAgICAgICAgICBhZGpbal0gPSBib3VuZGFyeVtrXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9Jbml0aWFsaXplIHRyaWFuZ2xlc1xuICB2YXIgdHJpYW5nbGVzID0gbmV3IFRyaWFuZ3VsYXRpb24oZCwgaW5pdGlhbFNpbXBsZXgsIGxpc3QpXG5cbiAgLy9JbnNlcnQgcmVtYWluaW5nIHBvaW50c1xuICB2YXIgdXNlUmFuZG9tID0gISFyYW5kb21TZWFyY2hcbiAgZm9yKHZhciBpPWQrMTsgaTxuOyArK2kpIHtcbiAgICB0cmlhbmdsZXMuaW5zZXJ0KHBvaW50c1tpXSwgdXNlUmFuZG9tKVxuICB9XG4gIFxuICAvL0V4dHJhY3QgYm91bmRhcnkgY2VsbHNcbiAgcmV0dXJuIHRyaWFuZ2xlcy5ib3VuZGFyeSgpXG59IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVGFibGVcblxudmFyIGNodWxsID0gcmVxdWlyZSgnY29udmV4LWh1bGwnKVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RWZXJ0ZXgoZCwgYSwgYikge1xuICB2YXIgeCA9IG5ldyBBcnJheShkKVxuICBmb3IodmFyIGk9MDsgaTxkOyArK2kpIHtcbiAgICB4W2ldID0gMC4wXG4gICAgaWYoaSA9PT0gYSkge1xuICAgICAgeFtpXSArPSAwLjVcbiAgICB9XG4gICAgaWYoaSA9PT0gYikge1xuICAgICAgeFtpXSArPSAwLjVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHhcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0Q2VsbChkaW1lbnNpb24sIG1hc2spIHtcbiAgaWYobWFzayA9PT0gMCB8fCBtYXNrID09PSAoMTw8KGRpbWVuc2lvbisxKSktMSkge1xuICAgIHJldHVybiBbXVxuICB9XG4gIHZhciBwb2ludHMgPSBbXVxuICB2YXIgaW5kZXggID0gW11cbiAgZm9yKHZhciBpPTA7IGk8PWRpbWVuc2lvbjsgKytpKSB7XG4gICAgaWYobWFzayAmICgxPDxpKSkge1xuICAgICAgcG9pbnRzLnB1c2goY29uc3RydWN0VmVydGV4KGRpbWVuc2lvbiwgaS0xLCBpLTEpKVxuICAgICAgaW5kZXgucHVzaChudWxsKVxuICAgICAgZm9yKHZhciBqPTA7IGo8PWRpbWVuc2lvbjsgKytqKSB7XG4gICAgICAgIGlmKH5tYXNrICYgKDE8PGopKSB7XG4gICAgICAgICAgcG9pbnRzLnB1c2goY29uc3RydWN0VmVydGV4KGRpbWVuc2lvbiwgaS0xLCBqLTEpKVxuICAgICAgICAgIGluZGV4LnB1c2goW2ksal0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8vUHJlcHJvY2VzcyBwb2ludHMgc28gZmlyc3QgZCsxIHBvaW50cyBhcmUgbGluZWFybHkgaW5kZXBlbmRlbnRcbiAgdmFyIGh1bGwgPSBjaHVsbChwb2ludHMpXG4gIHZhciBmYWNlcyA9IFtdXG5pX2xvb3A6XG4gIGZvcih2YXIgaT0wOyBpPGh1bGwubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgZmFjZSA9IGh1bGxbaV1cbiAgICB2YXIgbmZhY2UgPSBbXVxuICAgIGZvcih2YXIgaj0wOyBqPGZhY2UubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmKCFpbmRleFtmYWNlW2pdXSkge1xuICAgICAgICBjb250aW51ZSBpX2xvb3BcbiAgICAgIH1cbiAgICAgIG5mYWNlLnB1c2goaW5kZXhbZmFjZVtqXV0uc2xpY2UoKSlcbiAgICB9XG4gICAgZmFjZXMucHVzaChuZmFjZSlcbiAgfVxuICByZXR1cm4gZmFjZXNcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFibGUoZGltZW5zaW9uKSB7XG4gIHZhciBudW1DZWxscyA9IDE8PChkaW1lbnNpb24rMSlcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShudW1DZWxscylcbiAgZm9yKHZhciBpPTA7IGk8bnVtQ2VsbHM7ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IGNvbnN0cnVjdENlbGwoZGltZW5zaW9uLCBpKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn0iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBtb25vdG9uZUNvbnZleEh1bGwyRFxuXG52YXIgb3JpZW50ID0gcmVxdWlyZSgncm9idXN0LW9yaWVudGF0aW9uJylbM11cblxuZnVuY3Rpb24gbW9ub3RvbmVDb252ZXhIdWxsMkQocG9pbnRzKSB7XG4gIHZhciBuID0gcG9pbnRzLmxlbmd0aFxuXG4gIGlmKG4gPCAzKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShuKVxuICAgIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgICAgcmVzdWx0W2ldID0gaVxuICAgIH1cblxuICAgIGlmKG4gPT09IDIgJiZcbiAgICAgICBwb2ludHNbMF1bMF0gPT09IHBvaW50c1sxXVswXSAmJlxuICAgICAgIHBvaW50c1swXVsxXSA9PT0gcG9pbnRzWzFdWzFdKSB7XG4gICAgICByZXR1cm4gWzBdXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLy9Tb3J0IHBvaW50IGluZGljZXMgYWxvbmcgeC1heGlzXG4gIHZhciBzb3J0ZWQgPSBuZXcgQXJyYXkobilcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgc29ydGVkW2ldID0gaVxuICB9XG4gIHNvcnRlZC5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgIHZhciBkID0gcG9pbnRzW2FdWzBdLXBvaW50c1tiXVswXVxuICAgIGlmKGQpIHtcbiAgICAgIHJldHVybiBkXG4gICAgfVxuICAgIHJldHVybiBwb2ludHNbYV1bMV0gLSBwb2ludHNbYl1bMV1cbiAgfSlcblxuICAvL0NvbnN0cnVjdCB1cHBlciBhbmQgbG93ZXIgaHVsbHNcbiAgdmFyIGxvd2VyID0gW3NvcnRlZFswXSwgc29ydGVkWzFdXVxuICB2YXIgdXBwZXIgPSBbc29ydGVkWzBdLCBzb3J0ZWRbMV1dXG5cbiAgZm9yKHZhciBpPTI7IGk8bjsgKytpKSB7XG4gICAgdmFyIGlkeCA9IHNvcnRlZFtpXVxuICAgIHZhciBwICAgPSBwb2ludHNbaWR4XVxuXG4gICAgLy9JbnNlcnQgaW50byBsb3dlciBsaXN0XG4gICAgdmFyIG0gPSBsb3dlci5sZW5ndGhcbiAgICB3aGlsZShtID4gMSAmJiBvcmllbnQoXG4gICAgICAgIHBvaW50c1tsb3dlclttLTJdXSwgXG4gICAgICAgIHBvaW50c1tsb3dlclttLTFdXSwgXG4gICAgICAgIHApIDw9IDApIHtcbiAgICAgIG0gLT0gMVxuICAgICAgbG93ZXIucG9wKClcbiAgICB9XG4gICAgbG93ZXIucHVzaChpZHgpXG5cbiAgICAvL0luc2VydCBpbnRvIHVwcGVyIGxpc3RcbiAgICBtID0gdXBwZXIubGVuZ3RoXG4gICAgd2hpbGUobSA+IDEgJiYgb3JpZW50KFxuICAgICAgICBwb2ludHNbdXBwZXJbbS0yXV0sIFxuICAgICAgICBwb2ludHNbdXBwZXJbbS0xXV0sIFxuICAgICAgICBwKSA+PSAwKSB7XG4gICAgICBtIC09IDFcbiAgICAgIHVwcGVyLnBvcCgpXG4gICAgfVxuICAgIHVwcGVyLnB1c2goaWR4KVxuICB9XG5cbiAgLy9NZXJnZSBsaXN0cyB0b2dldGhlclxuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KHVwcGVyLmxlbmd0aCArIGxvd2VyLmxlbmd0aCAtIDIpXG4gIHZhciBwdHIgICAgPSAwXG4gIGZvcih2YXIgaT0wLCBubD1sb3dlci5sZW5ndGg7IGk8bmw7ICsraSkge1xuICAgIHJlc3VsdFtwdHIrK10gPSBsb3dlcltpXVxuICB9XG4gIGZvcih2YXIgaj11cHBlci5sZW5ndGgtMjsgaj4wOyAtLWopIHtcbiAgICByZXN1bHRbcHRyKytdID0gdXBwZXJbal1cbiAgfVxuXG4gIC8vUmV0dXJuIHJlc3VsdFxuICByZXR1cm4gcmVzdWx0XG59IiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHBvb2wgPSByZXF1aXJlKFwidHlwZWRhcnJheS1wb29sXCIpXG5cbnZhciBJTlNFUlRJT05fU09SVF9USFJFU0hPTEQgPSAzMlxuXG5mdW5jdGlvbiBnZXRNYWxsb2NGcmVlKGR0eXBlKSB7XG4gIHN3aXRjaChkdHlwZSkge1xuICAgIGNhc2UgXCJ1aW50OFwiOlxuICAgICAgcmV0dXJuIFtwb29sLm1hbGxvY1VpbnQ4LCBwb29sLmZyZWVVaW50OF1cbiAgICBjYXNlIFwidWludDE2XCI6XG4gICAgICByZXR1cm4gW3Bvb2wubWFsbG9jVWludDE2LCBwb29sLmZyZWVVaW50MTZdXG4gICAgY2FzZSBcInVpbnQzMlwiOlxuICAgICAgcmV0dXJuIFtwb29sLm1hbGxvY1VpbnQzMiwgcG9vbC5mcmVlVWludDMyXVxuICAgIGNhc2UgXCJpbnQ4XCI6XG4gICAgICByZXR1cm4gW3Bvb2wubWFsbG9jSW50OCwgcG9vbC5mcmVlSW50OF1cbiAgICBjYXNlIFwiaW50MTZcIjpcbiAgICAgIHJldHVybiBbcG9vbC5tYWxsb2NJbnQxNiwgcG9vbC5mcmVlSW50MTZdXG4gICAgY2FzZSBcImludDMyXCI6XG4gICAgICByZXR1cm4gW3Bvb2wubWFsbG9jSW50MzIsIHBvb2wuZnJlZUludDMyXVxuICAgIGNhc2UgXCJmbG9hdDMyXCI6XG4gICAgICByZXR1cm4gW3Bvb2wubWFsbG9jRmxvYXQsIHBvb2wuZnJlZUZsb2F0XVxuICAgIGNhc2UgXCJmbG9hdDY0XCI6XG4gICAgICByZXR1cm4gW3Bvb2wubWFsbG9jRG91YmxlLCBwb29sLmZyZWVEb3VibGVdXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZnVuY3Rpb24gc2hhcGVBcmdzKGRpbWVuc2lvbikge1xuICB2YXIgYXJncyA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgYXJncy5wdXNoKFwic1wiK2kpXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBhcmdzLnB1c2goXCJuXCIraSlcbiAgfVxuICBmb3IodmFyIGk9MTsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIGFyZ3MucHVzaChcImRcIitpKVxuICB9XG4gIGZvcih2YXIgaT0xOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgYXJncy5wdXNoKFwiZVwiK2kpXG4gIH1cbiAgZm9yKHZhciBpPTE7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBhcmdzLnB1c2goXCJmXCIraSlcbiAgfVxuICByZXR1cm4gYXJnc1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnNlcnRpb25Tb3J0KG9yZGVyLCBkdHlwZSkge1xuXG4gIHZhciBjb2RlID0gW1wiJ3VzZSBzdHJpY3QnXCJdXG4gIHZhciBmdW5jTmFtZSA9IFtcIm5kYXJyYXlJbnNlcnRpb25Tb3J0XCIsIG9yZGVyLmpvaW4oXCJkXCIpLCBkdHlwZV0uam9pbihcIlwiKVxuICB2YXIgZnVuY0FyZ3MgPSBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJkYXRhXCIsIFwib2Zmc2V0XCIgXS5jb25jYXQoc2hhcGVBcmdzKG9yZGVyLmxlbmd0aCkpXG4gIHZhciBhbGxvY2F0b3IgPSBnZXRNYWxsb2NGcmVlKGR0eXBlKVxuICBcbiAgdmFyIHZhcnMgPSBbIFwiaSxqLGNwdHIscHRyPWxlZnQqczArb2Zmc2V0XCIgXVxuICBcbiAgaWYob3JkZXIubGVuZ3RoID4gMSkge1xuICAgIHZhciBzY3JhdGNoX3NoYXBlID0gW11cbiAgICBmb3IodmFyIGk9MTsgaTxvcmRlci5sZW5ndGg7ICsraSkge1xuICAgICAgdmFycy5wdXNoKFwiaVwiK2kpXG4gICAgICBzY3JhdGNoX3NoYXBlLnB1c2goXCJuXCIraSlcbiAgICB9XG4gICAgaWYoYWxsb2NhdG9yKSB7XG4gICAgICB2YXJzLnB1c2goXCJzY3JhdGNoPW1hbGxvYyhcIiArIHNjcmF0Y2hfc2hhcGUuam9pbihcIipcIikgKyBcIilcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdmFycy5wdXNoKFwic2NyYXRjaD1uZXcgQXJyYXkoXCIrc2NyYXRjaF9zaGFwZS5qb2luKFwiKlwiKSArIFwiKVwiKVxuICAgIH1cbiAgICB2YXJzLnB1c2goXCJkcHRyXCIsXCJzcHRyXCIsXCJhXCIsXCJiXCIpXG4gIH0gZWxzZSB7XG4gICAgdmFycy5wdXNoKFwic2NyYXRjaFwiKVxuICB9XG4gIFxuICBmdW5jdGlvbiBkYXRhUmVhZChwdHIpIHtcbiAgICBpZihkdHlwZSA9PT0gXCJnZW5lcmljXCIpIHtcbiAgICAgIHJldHVybiBbXCJkYXRhLmdldChcIiwgcHRyLCBcIilcIl0uam9pbihcIlwiKVxuICAgIH1cbiAgICByZXR1cm4gW1wiZGF0YVtcIixwdHIsXCJdXCJdLmpvaW4oXCJcIilcbiAgfVxuICBcbiAgZnVuY3Rpb24gZGF0YVdyaXRlKHB0ciwgdikge1xuICAgIGlmKGR0eXBlID09PSBcImdlbmVyaWNcIikge1xuICAgICAgcmV0dXJuIFtcImRhdGEuc2V0KFwiLCBwdHIsIFwiLFwiLCB2LCBcIilcIl0uam9pbihcIlwiKVxuICAgIH1cbiAgICByZXR1cm4gW1wiZGF0YVtcIixwdHIsXCJdPVwiLHZdLmpvaW4oXCJcIilcbiAgfVxuICBcbiAgLy9DcmVhdGUgZnVuY3Rpb24gaGVhZGVyXG4gIGNvZGUucHVzaChcbiAgICBbXCJmdW5jdGlvbiBcIiwgZnVuY05hbWUsIFwiKFwiLCBmdW5jQXJncy5qb2luKFwiLFwiKSwgXCIpe3ZhciBcIiwgdmFycy5qb2luKFwiLFwiKV0uam9pbihcIlwiKSxcbiAgICAgIFwiZm9yKGk9bGVmdCsxO2k8PXJpZ2h0OysraSl7XCIsXG4gICAgICAgIFwiaj1pO3B0cis9czBcIixcbiAgICAgICAgXCJjcHRyPXB0clwiKVxuICBcbiAgXG4gIGlmKG9yZGVyLmxlbmd0aCA+IDEpIHtcbiAgXG4gICAgLy9Db3B5IGRhdGEgaW50byBzY3JhdGNoXG4gICAgY29kZS5wdXNoKFwiZHB0cj0wO3NwdHI9cHRyXCIpXG4gICAgZm9yKHZhciBpPW9yZGVyLmxlbmd0aC0xOyBpPj0wOyAtLWkpIHtcbiAgICAgIHZhciBqID0gb3JkZXJbaV1cbiAgICAgIGlmKGogPT09IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNvZGUucHVzaChbXCJmb3IoaVwiLGosXCI9MDtpXCIsaixcIjxuXCIsaixcIjsrK2lcIixqLFwiKXtcIl0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgY29kZS5wdXNoKFwic2NyYXRjaFtkcHRyKytdPVwiLGRhdGFSZWFkKFwic3B0clwiKSlcbiAgICBmb3IodmFyIGk9MDsgaTxvcmRlci5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGogPSBvcmRlcltpXVxuICAgICAgaWYoaiA9PT0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgY29kZS5wdXNoKFwic3B0cis9ZFwiK2osXCJ9XCIpXG4gICAgfVxuXG4gICAgXG4gICAgLy9Db21wYXJlIGl0ZW1zIGluIG91dGVyIGxvb3BcbiAgICBjb2RlLnB1c2goXCJfX2c6d2hpbGUoai0tPmxlZnQpe1wiLFxuICAgICAgICAgICAgICBcImRwdHI9MFwiLFxuICAgICAgICAgICAgICBcInNwdHI9Y3B0ci1zMFwiKVxuICAgIGZvcih2YXIgaT0xOyBpPG9yZGVyLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZihpID09PSAxKSB7XG4gICAgICAgIGNvZGUucHVzaChcIl9fbDpcIilcbiAgICAgIH1cbiAgICAgIGNvZGUucHVzaChbXCJmb3IoaVwiLGksXCI9MDtpXCIsaSxcIjxuXCIsaSxcIjsrK2lcIixpLFwiKXtcIl0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgY29kZS5wdXNoKFtcImE9XCIsIGRhdGFSZWFkKFwic3B0clwiKSxcIlxcbmI9c2NyYXRjaFtkcHRyXVxcbmlmKGE8Yil7YnJlYWsgX19nfVxcbmlmKGE+Yil7YnJlYWsgX19sfVwiXS5qb2luKFwiXCIpKVxuICAgIGZvcih2YXIgaT1vcmRlci5sZW5ndGgtMTsgaT49MTsgLS1pKSB7XG4gICAgICBjb2RlLnB1c2goXG4gICAgICAgIFwic3B0cis9ZVwiK2ksXG4gICAgICAgIFwiZHB0cis9ZlwiK2ksXG4gICAgICAgIFwifVwiKVxuICAgIH1cbiAgICBcbiAgICAvL0NvcHkgZGF0YSBiYWNrXG4gICAgY29kZS5wdXNoKFwiZHB0cj1jcHRyO3NwdHI9Y3B0ci1zMFwiKVxuICAgIGZvcih2YXIgaT1vcmRlci5sZW5ndGgtMTsgaT49MDsgLS1pKSB7XG4gICAgICB2YXIgaiA9IG9yZGVyW2ldXG4gICAgICBpZihqID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBjb2RlLnB1c2goW1wiZm9yKGlcIixqLFwiPTA7aVwiLGosXCI8blwiLGosXCI7KytpXCIsaixcIil7XCJdLmpvaW4oXCJcIikpXG4gICAgfVxuICAgIGNvZGUucHVzaChkYXRhV3JpdGUoXCJkcHRyXCIsIGRhdGFSZWFkKFwic3B0clwiKSkpXG4gICAgZm9yKHZhciBpPTA7IGk8b3JkZXIubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBqID0gb3JkZXJbaV1cbiAgICAgIGlmKGogPT09IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNvZGUucHVzaChbXCJkcHRyKz1kXCIsaixcIjtzcHRyKz1kXCIsal0uam9pbihcIlwiKSxcIn1cIilcbiAgICB9XG4gICAgXG4gICAgLy9DbG9zZSB3aGlsZSBsb29wXG4gICAgY29kZS5wdXNoKFwiY3B0ci09czBcXG59XCIpXG5cbiAgICAvL0NvcHkgc2NyYXRjaCBpbnRvIGNwdHJcbiAgICBjb2RlLnB1c2goXCJkcHRyPWNwdHI7c3B0cj0wXCIpXG4gICAgZm9yKHZhciBpPW9yZGVyLmxlbmd0aC0xOyBpPj0wOyAtLWkpIHtcbiAgICAgIHZhciBqID0gb3JkZXJbaV1cbiAgICAgIGlmKGogPT09IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNvZGUucHVzaChbXCJmb3IoaVwiLGosXCI9MDtpXCIsaixcIjxuXCIsaixcIjsrK2lcIixqLFwiKXtcIl0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgY29kZS5wdXNoKGRhdGFXcml0ZShcImRwdHJcIiwgXCJzY3JhdGNoW3NwdHIrK11cIikpXG4gICAgZm9yKHZhciBpPTA7IGk8b3JkZXIubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBqID0gb3JkZXJbaV1cbiAgICAgIGlmKGogPT09IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNvZGUucHVzaChcImRwdHIrPWRcIitqLFwifVwiKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb2RlLnB1c2goXCJzY3JhdGNoPVwiICsgZGF0YVJlYWQoXCJwdHJcIiksXG4gICAgICAgICAgICAgIFwid2hpbGUoKGotLT5sZWZ0KSYmKFwiK2RhdGFSZWFkKFwiY3B0ci1zMFwiKStcIj5zY3JhdGNoKSl7XCIsXG4gICAgICAgICAgICAgICAgZGF0YVdyaXRlKFwiY3B0clwiLCBkYXRhUmVhZChcImNwdHItczBcIikpLFxuICAgICAgICAgICAgICAgIFwiY3B0ci09czBcIixcbiAgICAgICAgICAgICAgXCJ9XCIsXG4gICAgICAgICAgICAgIGRhdGFXcml0ZShcImNwdHJcIiwgXCJzY3JhdGNoXCIpKVxuICB9XG4gIFxuICAvL0Nsb3NlIG91dGVyIGxvb3AgYm9keVxuICBjb2RlLnB1c2goXCJ9XCIpXG4gIGlmKG9yZGVyLmxlbmd0aCA+IDEgJiYgYWxsb2NhdG9yKSB7XG4gICAgY29kZS5wdXNoKFwiZnJlZShzY3JhdGNoKVwiKVxuICB9XG4gIGNvZGUucHVzaChcIn0gcmV0dXJuIFwiICsgZnVuY05hbWUpXG4gIFxuICAvL0NvbXBpbGUgYW5kIGxpbmsgZnVuY3Rpb25cbiAgaWYoYWxsb2NhdG9yKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBGdW5jdGlvbihcIm1hbGxvY1wiLCBcImZyZWVcIiwgY29kZS5qb2luKFwiXFxuXCIpKVxuICAgIHJldHVybiByZXN1bHQoYWxsb2NhdG9yWzBdLCBhbGxvY2F0b3JbMV0pXG4gIH0gZWxzZSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBGdW5jdGlvbihjb2RlLmpvaW4oXCJcXG5cIikpXG4gICAgcmV0dXJuIHJlc3VsdCgpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUXVpY2tTb3J0KG9yZGVyLCBkdHlwZSwgaW5zZXJ0aW9uU29ydCkge1xuICB2YXIgY29kZSA9IFsgXCIndXNlIHN0cmljdCdcIiBdXG4gIHZhciBmdW5jTmFtZSA9IFtcIm5kYXJyYXlRdWlja1NvcnRcIiwgb3JkZXIuam9pbihcImRcIiksIGR0eXBlXS5qb2luKFwiXCIpXG4gIHZhciBmdW5jQXJncyA9IFtcImxlZnRcIiwgXCJyaWdodFwiLCBcImRhdGFcIiwgXCJvZmZzZXRcIiBdLmNvbmNhdChzaGFwZUFyZ3Mob3JkZXIubGVuZ3RoKSlcbiAgdmFyIGFsbG9jYXRvciA9IGdldE1hbGxvY0ZyZWUoZHR5cGUpXG4gIHZhciBsYWJlbENvdW50ZXI9MFxuICBcbiAgY29kZS5wdXNoKFtcImZ1bmN0aW9uIFwiLCBmdW5jTmFtZSwgXCIoXCIsIGZ1bmNBcmdzLmpvaW4oXCIsXCIpLCBcIil7XCJdLmpvaW4oXCJcIikpXG4gIFxuICB2YXIgdmFycyA9IFtcbiAgICBcInNpeHRoPSgocmlnaHQtbGVmdCsxKS82KXwwXCIsXG4gICAgXCJpbmRleDE9bGVmdCtzaXh0aFwiLFxuICAgIFwiaW5kZXg1PXJpZ2h0LXNpeHRoXCIsXG4gICAgXCJpbmRleDM9KGxlZnQrcmlnaHQpPj4xXCIsXG4gICAgXCJpbmRleDI9aW5kZXgzLXNpeHRoXCIsXG4gICAgXCJpbmRleDQ9aW5kZXgzK3NpeHRoXCIsXG4gICAgXCJlbDE9aW5kZXgxXCIsXG4gICAgXCJlbDI9aW5kZXgyXCIsXG4gICAgXCJlbDM9aW5kZXgzXCIsXG4gICAgXCJlbDQ9aW5kZXg0XCIsXG4gICAgXCJlbDU9aW5kZXg1XCIsXG4gICAgXCJsZXNzPWxlZnQrMVwiLFxuICAgIFwiZ3JlYXQ9cmlnaHQtMVwiLFxuICAgIFwicGl2b3RzX2FyZV9lcXVhbD10cnVlXCIsXG4gICAgXCJ0bXBcIixcbiAgICBcInRtcDBcIixcbiAgICBcInhcIixcbiAgICBcInlcIixcbiAgICBcInpcIixcbiAgICBcImtcIixcbiAgICBcInB0cjBcIixcbiAgICBcInB0cjFcIixcbiAgICBcInB0cjJcIixcbiAgICBcImNvbXBfcGl2b3QxPTBcIixcbiAgICBcImNvbXBfcGl2b3QyPTBcIixcbiAgICBcImNvbXA9MFwiXG4gIF1cbiAgXG4gIGlmKG9yZGVyLmxlbmd0aCA+IDEpIHtcbiAgICB2YXIgZWxlX3NpemUgPSBbXVxuICAgIGZvcih2YXIgaT0xOyBpPG9yZGVyLmxlbmd0aDsgKytpKSB7XG4gICAgICBlbGVfc2l6ZS5wdXNoKFwiblwiK2kpXG4gICAgICB2YXJzLnB1c2goXCJpXCIraSlcbiAgICB9XG4gICAgZm9yKHZhciBpPTA7IGk8ODsgKytpKSB7XG4gICAgICB2YXJzLnB1c2goXCJiX3B0clwiK2kpXG4gICAgfVxuICAgIHZhcnMucHVzaChcbiAgICAgIFwicHRyM1wiLFxuICAgICAgXCJwdHI0XCIsXG4gICAgICBcInB0cjVcIixcbiAgICAgIFwicHRyNlwiLFxuICAgICAgXCJwdHI3XCIsXG4gICAgICBcInBpdm90X3B0clwiLFxuICAgICAgXCJwdHJfc2hpZnRcIixcbiAgICAgIFwiZWxlbWVudFNpemU9XCIrZWxlX3NpemUuam9pbihcIipcIikpXG4gICAgaWYoYWxsb2NhdG9yKSB7XG4gICAgICB2YXJzLnB1c2goXCJwaXZvdDE9bWFsbG9jKGVsZW1lbnRTaXplKVwiLFxuICAgICAgICAgICAgICAgIFwicGl2b3QyPW1hbGxvYyhlbGVtZW50U2l6ZSlcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdmFycy5wdXNoKFwicGl2b3QxPW5ldyBBcnJheShlbGVtZW50U2l6ZSkscGl2b3QyPW5ldyBBcnJheShlbGVtZW50U2l6ZSlcIilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFycy5wdXNoKFwicGl2b3QxXCIsIFwicGl2b3QyXCIpXG4gIH1cbiAgXG4gIC8vSW5pdGlhbGl6ZSBsb2NhbCB2YXJpYWJsZXNcbiAgY29kZS5wdXNoKFwidmFyIFwiICsgdmFycy5qb2luKFwiLFwiKSlcbiAgXG4gIGZ1bmN0aW9uIHRvUG9pbnRlcih2KSB7XG4gICAgcmV0dXJuIFtcIihvZmZzZXQrXCIsdixcIipzMClcIl0uam9pbihcIlwiKVxuICB9XG4gIFxuICBmdW5jdGlvbiBkYXRhUmVhZChwdHIpIHtcbiAgICBpZihkdHlwZSA9PT0gXCJnZW5lcmljXCIpIHtcbiAgICAgIHJldHVybiBbXCJkYXRhLmdldChcIiwgcHRyLCBcIilcIl0uam9pbihcIlwiKVxuICAgIH1cbiAgICByZXR1cm4gW1wiZGF0YVtcIixwdHIsXCJdXCJdLmpvaW4oXCJcIilcbiAgfVxuICBcbiAgZnVuY3Rpb24gZGF0YVdyaXRlKHB0ciwgdikge1xuICAgIGlmKGR0eXBlID09PSBcImdlbmVyaWNcIikge1xuICAgICAgcmV0dXJuIFtcImRhdGEuc2V0KFwiLCBwdHIsIFwiLFwiLCB2LCBcIilcIl0uam9pbihcIlwiKVxuICAgIH1cbiAgICByZXR1cm4gW1wiZGF0YVtcIixwdHIsXCJdPVwiLHZdLmpvaW4oXCJcIilcbiAgfVxuICBcbiAgZnVuY3Rpb24gY2FjaGVMb29wKHB0cnMsIHVzZVBpdm90LCBib2R5KSB7XG4gICAgaWYocHRycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvZGUucHVzaChcInB0cjA9XCIrdG9Qb2ludGVyKHB0cnNbMF0pKVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IodmFyIGk9MDsgaTxwdHJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvZGUucHVzaChbXCJiX3B0clwiLGksXCI9czAqXCIscHRyc1tpXV0uam9pbihcIlwiKSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodXNlUGl2b3QpIHtcbiAgICAgIGNvZGUucHVzaChcInBpdm90X3B0cj0wXCIpXG4gICAgfVxuICAgIGNvZGUucHVzaChcInB0cl9zaGlmdD1vZmZzZXRcIilcbiAgICBmb3IodmFyIGk9b3JkZXIubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgICAgdmFyIGogPSBvcmRlcltpXVxuICAgICAgaWYoaiA9PT0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgY29kZS5wdXNoKFtcImZvcihpXCIsaixcIj0wO2lcIixqLFwiPG5cIixqLFwiOysraVwiLGosXCIpe1wiXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgICBpZihwdHJzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGZvcih2YXIgaT0wOyBpPHB0cnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29kZS5wdXNoKFtcInB0clwiLGksXCI9Yl9wdHJcIixpLFwiK3B0cl9zaGlmdFwiXS5qb2luKFwiXCIpKVxuICAgICAgfVxuICAgIH1cbiAgICBjb2RlLnB1c2goYm9keSlcbiAgICBpZih1c2VQaXZvdCkge1xuICAgICAgY29kZS5wdXNoKFwiKytwaXZvdF9wdHJcIilcbiAgICB9XG4gICAgZm9yKHZhciBpPTA7IGk8b3JkZXIubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBqID0gb3JkZXJbaV1cbiAgICAgIGlmKGogPT09IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGlmKHB0cnMubGVuZ3RoPjEpIHtcbiAgICAgICAgY29kZS5wdXNoKFwicHRyX3NoaWZ0Kz1kXCIrailcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGUucHVzaChcInB0cjArPWRcIitqKVxuICAgICAgfVxuICAgICAgY29kZS5wdXNoKFwifVwiKVxuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gbGV4aWNvTG9vcChsYWJlbCwgcHRycywgdXNlUGl2b3QsIGJvZHkpIHtcbiAgICBpZihwdHJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29kZS5wdXNoKFwicHRyMD1cIit0b1BvaW50ZXIocHRyc1swXSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcih2YXIgaT0wOyBpPHB0cnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29kZS5wdXNoKFtcImJfcHRyXCIsaSxcIj1zMCpcIixwdHJzW2ldXS5qb2luKFwiXCIpKVxuICAgICAgfVxuICAgICAgY29kZS5wdXNoKFwicHRyX3NoaWZ0PW9mZnNldFwiKVxuICAgIH1cbiAgICBpZih1c2VQaXZvdCkge1xuICAgICAgY29kZS5wdXNoKFwicGl2b3RfcHRyPTBcIilcbiAgICB9XG4gICAgaWYobGFiZWwpIHtcbiAgICAgIGNvZGUucHVzaChsYWJlbCtcIjpcIilcbiAgICB9XG4gICAgZm9yKHZhciBpPTE7IGk8b3JkZXIubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvZGUucHVzaChbXCJmb3IoaVwiLGksXCI9MDtpXCIsaSxcIjxuXCIsaSxcIjsrK2lcIixpLFwiKXtcIl0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgaWYocHRycy5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IodmFyIGk9MDsgaTxwdHJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvZGUucHVzaChbXCJwdHJcIixpLFwiPWJfcHRyXCIsaSxcIitwdHJfc2hpZnRcIl0uam9pbihcIlwiKSlcbiAgICAgIH1cbiAgICB9XG4gICAgY29kZS5wdXNoKGJvZHkpXG4gICAgZm9yKHZhciBpPW9yZGVyLmxlbmd0aC0xOyBpPj0xOyAtLWkpIHtcbiAgICAgIGlmKHVzZVBpdm90KSB7XG4gICAgICAgIGNvZGUucHVzaChcInBpdm90X3B0cis9ZlwiK2kpXG4gICAgICB9XG4gICAgICBpZihwdHJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29kZS5wdXNoKFwicHRyX3NoaWZ0Kz1lXCIraSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGUucHVzaChcInB0cjArPWVcIitpKVxuICAgICAgfVxuICAgICAgY29kZS5wdXNoKFwifVwiKVxuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gY2xlYW5VcCgpIHtcbiAgICBpZihvcmRlci5sZW5ndGggPiAxICYmIGFsbG9jYXRvcikge1xuICAgICAgY29kZS5wdXNoKFwiZnJlZShwaXZvdDEpXCIsIFwiZnJlZShwaXZvdDIpXCIpXG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBjb21wYXJlU3dhcChhX2lkLCBiX2lkKSB7XG4gICAgdmFyIGEgPSBcImVsXCIrYV9pZFxuICAgIHZhciBiID0gXCJlbFwiK2JfaWRcbiAgICBpZihvcmRlci5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgbGJsID0gXCJfX2xcIiArICgrK2xhYmVsQ291bnRlcilcbiAgICAgIGxleGljb0xvb3AobGJsLCBbYSwgYl0sIGZhbHNlLCBbXG4gICAgICAgIFwiY29tcD1cIixkYXRhUmVhZChcInB0cjBcIiksXCItXCIsZGF0YVJlYWQoXCJwdHIxXCIpLFwiXFxuXCIsXG4gICAgICAgIFwiaWYoY29tcD4wKXt0bXAwPVwiLCBhLCBcIjtcIixhLFwiPVwiLGIsXCI7XCIsIGIsXCI9dG1wMDticmVhayBcIiwgbGJsLFwifVxcblwiLFxuICAgICAgICBcImlmKGNvbXA8MCl7YnJlYWsgXCIsIGxibCwgXCJ9XCJcbiAgICAgIF0uam9pbihcIlwiKSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29kZS5wdXNoKFtcImlmKFwiLCBkYXRhUmVhZCh0b1BvaW50ZXIoYSkpLCBcIj5cIiwgZGF0YVJlYWQodG9Qb2ludGVyKGIpKSwgXCIpe3RtcDA9XCIsIGEsIFwiO1wiLGEsXCI9XCIsYixcIjtcIiwgYixcIj10bXAwfVwiXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgfVxuICBcbiAgY29tcGFyZVN3YXAoMSwgMilcbiAgY29tcGFyZVN3YXAoNCwgNSlcbiAgY29tcGFyZVN3YXAoMSwgMylcbiAgY29tcGFyZVN3YXAoMiwgMylcbiAgY29tcGFyZVN3YXAoMSwgNClcbiAgY29tcGFyZVN3YXAoMywgNClcbiAgY29tcGFyZVN3YXAoMiwgNSlcbiAgY29tcGFyZVN3YXAoMiwgMylcbiAgY29tcGFyZVN3YXAoNCwgNSlcbiAgXG4gIGlmKG9yZGVyLmxlbmd0aCA+IDEpIHtcbiAgICBjYWNoZUxvb3AoW1wiZWwxXCIsIFwiZWwyXCIsIFwiZWwzXCIsIFwiZWw0XCIsIFwiZWw1XCIsIFwiaW5kZXgxXCIsIFwiaW5kZXgzXCIsIFwiaW5kZXg1XCJdLCB0cnVlLCBbXG4gICAgICBcInBpdm90MVtwaXZvdF9wdHJdPVwiLGRhdGFSZWFkKFwicHRyMVwiKSxcIlxcblwiLFxuICAgICAgXCJwaXZvdDJbcGl2b3RfcHRyXT1cIixkYXRhUmVhZChcInB0cjNcIiksXCJcXG5cIixcbiAgICAgIFwicGl2b3RzX2FyZV9lcXVhbD1waXZvdHNfYXJlX2VxdWFsJiYocGl2b3QxW3Bpdm90X3B0cl09PT1waXZvdDJbcGl2b3RfcHRyXSlcXG5cIixcbiAgICAgIFwieD1cIixkYXRhUmVhZChcInB0cjBcIiksXCJcXG5cIixcbiAgICAgIFwieT1cIixkYXRhUmVhZChcInB0cjJcIiksXCJcXG5cIixcbiAgICAgIFwiej1cIixkYXRhUmVhZChcInB0cjRcIiksXCJcXG5cIixcbiAgICAgIGRhdGFXcml0ZShcInB0cjVcIiwgXCJ4XCIpLFwiXFxuXCIsXG4gICAgICBkYXRhV3JpdGUoXCJwdHI2XCIsIFwieVwiKSxcIlxcblwiLFxuICAgICAgZGF0YVdyaXRlKFwicHRyN1wiLCBcInpcIilcbiAgICBdLmpvaW4oXCJcIikpXG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKFtcbiAgICAgIFwicGl2b3QxPVwiLCBkYXRhUmVhZCh0b1BvaW50ZXIoXCJlbDJcIikpLCBcIlxcblwiLFxuICAgICAgXCJwaXZvdDI9XCIsIGRhdGFSZWFkKHRvUG9pbnRlcihcImVsNFwiKSksIFwiXFxuXCIsXG4gICAgICBcInBpdm90c19hcmVfZXF1YWw9cGl2b3QxPT09cGl2b3QyXFxuXCIsXG4gICAgICBcIng9XCIsIGRhdGFSZWFkKHRvUG9pbnRlcihcImVsMVwiKSksIFwiXFxuXCIsXG4gICAgICBcInk9XCIsIGRhdGFSZWFkKHRvUG9pbnRlcihcImVsM1wiKSksIFwiXFxuXCIsXG4gICAgICBcIno9XCIsIGRhdGFSZWFkKHRvUG9pbnRlcihcImVsNVwiKSksIFwiXFxuXCIsXG4gICAgICBkYXRhV3JpdGUodG9Qb2ludGVyKFwiaW5kZXgxXCIpLCBcInhcIiksIFwiXFxuXCIsXG4gICAgICBkYXRhV3JpdGUodG9Qb2ludGVyKFwiaW5kZXgzXCIpLCBcInlcIiksIFwiXFxuXCIsXG4gICAgICBkYXRhV3JpdGUodG9Qb2ludGVyKFwiaW5kZXg1XCIpLCBcInpcIilcbiAgICBdLmpvaW4oXCJcIikpXG4gIH1cbiAgXG5cbiAgZnVuY3Rpb24gbW92ZUVsZW1lbnQoZHN0LCBzcmMpIHtcbiAgICBpZihvcmRlci5sZW5ndGggPiAxKSB7XG4gICAgICBjYWNoZUxvb3AoW2RzdCwgc3JjXSwgZmFsc2UsXG4gICAgICAgIGRhdGFXcml0ZShcInB0cjBcIiwgZGF0YVJlYWQoXCJwdHIxXCIpKVxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2RlLnB1c2goZGF0YVdyaXRlKHRvUG9pbnRlcihkc3QpLCBkYXRhUmVhZCh0b1BvaW50ZXIoc3JjKSkpKVxuICAgIH1cbiAgfVxuICBcbiAgbW92ZUVsZW1lbnQoXCJpbmRleDJcIiwgXCJsZWZ0XCIpXG4gIG1vdmVFbGVtZW50KFwiaW5kZXg0XCIsIFwicmlnaHRcIilcbiAgXG4gIGZ1bmN0aW9uIGNvbXBhcmVQaXZvdChyZXN1bHQsIHB0ciwgbikge1xuICAgIGlmKG9yZGVyLmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBsYmwgPSBcIl9fbFwiICsgKCsrbGFiZWxDb3VudGVyKVxuICAgICAgbGV4aWNvTG9vcChsYmwsIFtwdHJdLCB0cnVlLCBbXG4gICAgICAgIHJlc3VsdCxcIj1cIixkYXRhUmVhZChcInB0cjBcIiksXCItcGl2b3RcIixuLFwiW3Bpdm90X3B0cl1cXG5cIixcbiAgICAgICAgXCJpZihcIixyZXN1bHQsXCIhPT0wKXticmVhayBcIiwgbGJsLCBcIn1cIlxuICAgICAgXS5qb2luKFwiXCIpKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2RlLnB1c2goW3Jlc3VsdCxcIj1cIiwgZGF0YVJlYWQodG9Qb2ludGVyKHB0cikpLCBcIi1waXZvdFwiLCBuXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gc3dhcEVsZW1lbnRzKGEsIGIpIHtcbiAgICBpZihvcmRlci5sZW5ndGggPiAxKSB7XG4gICAgICBjYWNoZUxvb3AoW2EsYl0sZmFsc2UsW1xuICAgICAgICBcInRtcD1cIixkYXRhUmVhZChcInB0cjBcIiksXCJcXG5cIixcbiAgICAgICAgZGF0YVdyaXRlKFwicHRyMFwiLCBkYXRhUmVhZChcInB0cjFcIikpLFwiXFxuXCIsXG4gICAgICAgIGRhdGFXcml0ZShcInB0cjFcIiwgXCJ0bXBcIilcbiAgICAgIF0uam9pbihcIlwiKSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29kZS5wdXNoKFtcbiAgICAgICAgXCJwdHIwPVwiLHRvUG9pbnRlcihhKSxcIlxcblwiLFxuICAgICAgICBcInB0cjE9XCIsdG9Qb2ludGVyKGIpLFwiXFxuXCIsXG4gICAgICAgIFwidG1wPVwiLGRhdGFSZWFkKFwicHRyMFwiKSxcIlxcblwiLFxuICAgICAgICBkYXRhV3JpdGUoXCJwdHIwXCIsIGRhdGFSZWFkKFwicHRyMVwiKSksXCJcXG5cIixcbiAgICAgICAgZGF0YVdyaXRlKFwicHRyMVwiLCBcInRtcFwiKVxuICAgICAgXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gdHJpcGxlU3dhcChrLCBsZXNzLCBncmVhdCkge1xuICAgIGlmKG9yZGVyLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNhY2hlTG9vcChbayxsZXNzLGdyZWF0XSwgZmFsc2UsIFtcbiAgICAgICAgXCJ0bXA9XCIsZGF0YVJlYWQoXCJwdHIwXCIpLFwiXFxuXCIsXG4gICAgICAgIGRhdGFXcml0ZShcInB0cjBcIiwgZGF0YVJlYWQoXCJwdHIxXCIpKSxcIlxcblwiLFxuICAgICAgICBkYXRhV3JpdGUoXCJwdHIxXCIsIGRhdGFSZWFkKFwicHRyMlwiKSksXCJcXG5cIixcbiAgICAgICAgZGF0YVdyaXRlKFwicHRyMlwiLCBcInRtcFwiKVxuICAgICAgXS5qb2luKFwiXCIpKVxuICAgICAgY29kZS5wdXNoKFwiKytcIitsZXNzLCBcIi0tXCIrZ3JlYXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvZGUucHVzaChbXG4gICAgICAgIFwicHRyMD1cIix0b1BvaW50ZXIoayksXCJcXG5cIixcbiAgICAgICAgXCJwdHIxPVwiLHRvUG9pbnRlcihsZXNzKSxcIlxcblwiLFxuICAgICAgICBcInB0cjI9XCIsdG9Qb2ludGVyKGdyZWF0KSxcIlxcblwiLFxuICAgICAgICBcIisrXCIsbGVzcyxcIlxcblwiLFxuICAgICAgICBcIi0tXCIsZ3JlYXQsXCJcXG5cIixcbiAgICAgICAgXCJ0bXA9XCIsIGRhdGFSZWFkKFwicHRyMFwiKSwgXCJcXG5cIixcbiAgICAgICAgZGF0YVdyaXRlKFwicHRyMFwiLCBkYXRhUmVhZChcInB0cjFcIikpLCBcIlxcblwiLFxuICAgICAgICBkYXRhV3JpdGUoXCJwdHIxXCIsIGRhdGFSZWFkKFwicHRyMlwiKSksIFwiXFxuXCIsXG4gICAgICAgIGRhdGFXcml0ZShcInB0cjJcIiwgXCJ0bXBcIilcbiAgICAgIF0uam9pbihcIlwiKSlcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHN3YXBBbmREZWNyZW1lbnQoaywgZ3JlYXQpIHtcbiAgICBzd2FwRWxlbWVudHMoaywgZ3JlYXQpXG4gICAgY29kZS5wdXNoKFwiLS1cIitncmVhdClcbiAgfVxuICAgIFxuICBjb2RlLnB1c2goXCJpZihwaXZvdHNfYXJlX2VxdWFsKXtcIilcbiAgICAvL1Bpdm90cyBhcmUgZXF1YWwgY2FzZVxuICAgIGNvZGUucHVzaChcImZvcihrPWxlc3M7azw9Z3JlYXQ7KytrKXtcIilcbiAgICAgIGNvbXBhcmVQaXZvdChcImNvbXBcIiwgXCJrXCIsIDEpXG4gICAgICBjb2RlLnB1c2goXCJpZihjb21wPT09MCl7Y29udGludWV9XCIpXG4gICAgICBjb2RlLnB1c2goXCJpZihjb21wPDApe1wiKVxuICAgICAgICBjb2RlLnB1c2goXCJpZihrIT09bGVzcyl7XCIpXG4gICAgICAgICAgc3dhcEVsZW1lbnRzKFwia1wiLCBcImxlc3NcIilcbiAgICAgICAgY29kZS5wdXNoKFwifVwiKVxuICAgICAgICBjb2RlLnB1c2goXCIrK2xlc3NcIilcbiAgICAgIGNvZGUucHVzaChcIn1lbHNle1wiKVxuICAgICAgICBjb2RlLnB1c2goXCJ3aGlsZSh0cnVlKXtcIilcbiAgICAgICAgICBjb21wYXJlUGl2b3QoXCJjb21wXCIsIFwiZ3JlYXRcIiwgMSlcbiAgICAgICAgICBjb2RlLnB1c2goXCJpZihjb21wPjApe1wiKVxuICAgICAgICAgICAgY29kZS5wdXNoKFwiZ3JlYXQtLVwiKVxuICAgICAgICAgIGNvZGUucHVzaChcIn1lbHNlIGlmKGNvbXA8MCl7XCIpXG4gICAgICAgICAgICB0cmlwbGVTd2FwKFwia1wiLCBcImxlc3NcIiwgXCJncmVhdFwiKVxuICAgICAgICAgICAgY29kZS5wdXNoKFwiYnJlYWtcIilcbiAgICAgICAgICBjb2RlLnB1c2goXCJ9ZWxzZXtcIilcbiAgICAgICAgICAgIHN3YXBBbmREZWNyZW1lbnQoXCJrXCIsIFwiZ3JlYXRcIilcbiAgICAgICAgICAgIGNvZGUucHVzaChcImJyZWFrXCIpXG4gICAgICAgICAgY29kZS5wdXNoKFwifVwiKVxuICAgICAgICBjb2RlLnB1c2goXCJ9XCIpXG4gICAgICBjb2RlLnB1c2goXCJ9XCIpXG4gICAgY29kZS5wdXNoKFwifVwiKVxuICBjb2RlLnB1c2goXCJ9ZWxzZXtcIilcbiAgICAvL1Bpdm90cyBub3QgZXF1YWwgY2FzZVxuICAgIGNvZGUucHVzaChcImZvcihrPWxlc3M7azw9Z3JlYXQ7KytrKXtcIilcbiAgICAgIGNvbXBhcmVQaXZvdChcImNvbXBfcGl2b3QxXCIsIFwia1wiLCAxKVxuICAgICAgY29kZS5wdXNoKFwiaWYoY29tcF9waXZvdDE8MCl7XCIpXG4gICAgICAgIGNvZGUucHVzaChcImlmKGshPT1sZXNzKXtcIilcbiAgICAgICAgICBzd2FwRWxlbWVudHMoXCJrXCIsIFwibGVzc1wiKVxuICAgICAgICBjb2RlLnB1c2goXCJ9XCIpXG4gICAgICAgIGNvZGUucHVzaChcIisrbGVzc1wiKVxuICAgICAgY29kZS5wdXNoKFwifWVsc2V7XCIpXG4gICAgICAgIGNvbXBhcmVQaXZvdChcImNvbXBfcGl2b3QyXCIsIFwia1wiLCAyKVxuICAgICAgICBjb2RlLnB1c2goXCJpZihjb21wX3Bpdm90Mj4wKXtcIilcbiAgICAgICAgICBjb2RlLnB1c2goXCJ3aGlsZSh0cnVlKXtcIilcbiAgICAgICAgICAgIGNvbXBhcmVQaXZvdChcImNvbXBcIiwgXCJncmVhdFwiLCAyKVxuICAgICAgICAgICAgY29kZS5wdXNoKFwiaWYoY29tcD4wKXtcIilcbiAgICAgICAgICAgICAgY29kZS5wdXNoKFwiaWYoLS1ncmVhdDxrKXticmVha31cIilcbiAgICAgICAgICAgICAgY29kZS5wdXNoKFwiY29udGludWVcIilcbiAgICAgICAgICAgIGNvZGUucHVzaChcIn1lbHNle1wiKVxuICAgICAgICAgICAgICBjb21wYXJlUGl2b3QoXCJjb21wXCIsIFwiZ3JlYXRcIiwgMSlcbiAgICAgICAgICAgICAgY29kZS5wdXNoKFwiaWYoY29tcDwwKXtcIilcbiAgICAgICAgICAgICAgICB0cmlwbGVTd2FwKFwia1wiLCBcImxlc3NcIiwgXCJncmVhdFwiKVxuICAgICAgICAgICAgICBjb2RlLnB1c2goXCJ9ZWxzZXtcIilcbiAgICAgICAgICAgICAgICBzd2FwQW5kRGVjcmVtZW50KFwia1wiLCBcImdyZWF0XCIpXG4gICAgICAgICAgICAgIGNvZGUucHVzaChcIn1cIilcbiAgICAgICAgICAgICAgY29kZS5wdXNoKFwiYnJlYWtcIilcbiAgICAgICAgICAgIGNvZGUucHVzaChcIn1cIilcbiAgICAgICAgICBjb2RlLnB1c2goXCJ9XCIpXG4gICAgICAgIGNvZGUucHVzaChcIn1cIilcbiAgICAgIGNvZGUucHVzaChcIn1cIilcbiAgICBjb2RlLnB1c2goXCJ9XCIpXG4gIGNvZGUucHVzaChcIn1cIilcbiAgXG4gIC8vTW92ZSBwaXZvdHMgdG8gY29ycmVjdCBwbGFjZVxuICBmdW5jdGlvbiBzdG9yZVBpdm90KG1lbV9kZXN0LCBwaXZvdF9kZXN0LCBwaXZvdCkge1xuICAgIGlmKG9yZGVyLmxlbmd0aD4xKSB7XG4gICAgICBjYWNoZUxvb3AoW21lbV9kZXN0LCBwaXZvdF9kZXN0XSwgdHJ1ZSwgW1xuICAgICAgICBkYXRhV3JpdGUoXCJwdHIwXCIsIGRhdGFSZWFkKFwicHRyMVwiKSksIFwiXFxuXCIsXG4gICAgICAgIGRhdGFXcml0ZShcInB0cjFcIiwgW1wicGl2b3RcIixwaXZvdCxcIltwaXZvdF9wdHJdXCJdLmpvaW4oXCJcIikpXG4gICAgICBdLmpvaW4oXCJcIikpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvZGUucHVzaChcbiAgICAgICAgICBkYXRhV3JpdGUodG9Qb2ludGVyKG1lbV9kZXN0KSwgZGF0YVJlYWQodG9Qb2ludGVyKHBpdm90X2Rlc3QpKSksXG4gICAgICAgICAgZGF0YVdyaXRlKHRvUG9pbnRlcihwaXZvdF9kZXN0KSwgXCJwaXZvdFwiK3Bpdm90KSlcbiAgICB9XG4gIH1cbiAgXG4gIHN0b3JlUGl2b3QoXCJsZWZ0XCIsIFwiKGxlc3MtMSlcIiwgMSlcbiAgc3RvcmVQaXZvdChcInJpZ2h0XCIsIFwiKGdyZWF0KzEpXCIsIDIpXG5cbiAgLy9SZWN1cnNpdmUgc29ydCBjYWxsXG4gIGZ1bmN0aW9uIGRvU29ydChsZWZ0LCByaWdodCkge1xuICAgIGNvZGUucHVzaChbXG4gICAgICBcImlmKChcIixyaWdodCxcIi1cIixsZWZ0LFwiKTw9XCIsSU5TRVJUSU9OX1NPUlRfVEhSRVNIT0xELFwiKXtcXG5cIixcbiAgICAgICAgXCJpbnNlcnRpb25Tb3J0KFwiLCBsZWZ0LCBcIixcIiwgcmlnaHQsIFwiLGRhdGEsb2Zmc2V0LFwiLCBzaGFwZUFyZ3Mob3JkZXIubGVuZ3RoKS5qb2luKFwiLFwiKSwgXCIpXFxuXCIsXG4gICAgICBcIn1lbHNle1xcblwiLFxuICAgICAgICBmdW5jTmFtZSwgXCIoXCIsIGxlZnQsIFwiLFwiLCByaWdodCwgXCIsZGF0YSxvZmZzZXQsXCIsIHNoYXBlQXJncyhvcmRlci5sZW5ndGgpLmpvaW4oXCIsXCIpLCBcIilcXG5cIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXCIpKVxuICB9XG4gIGRvU29ydChcImxlZnRcIiwgXCIobGVzcy0yKVwiKVxuICBkb1NvcnQoXCIoZ3JlYXQrMilcIiwgXCJyaWdodFwiKVxuICBcbiAgLy9JZiBwaXZvdHMgYXJlIGVxdWFsLCB0aGVuIGVhcmx5IG91dFxuICBjb2RlLnB1c2goXCJpZihwaXZvdHNfYXJlX2VxdWFsKXtcIilcbiAgICBjbGVhblVwKClcbiAgICBjb2RlLnB1c2goXCJyZXR1cm5cIilcbiAgY29kZS5wdXNoKFwifVwiKVxuICBcbiAgZnVuY3Rpb24gd2Fsa1BvaW50ZXIocHRyLCBwaXZvdCwgYm9keSkge1xuICAgIGlmKG9yZGVyLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvZGUucHVzaChbXCJfX2xcIiwrK2xhYmVsQ291bnRlcixcIjp3aGlsZSh0cnVlKXtcIl0uam9pbihcIlwiKSlcbiAgICAgIGNhY2hlTG9vcChbcHRyXSwgdHJ1ZSwgW1xuICAgICAgICBcImlmKFwiLCBkYXRhUmVhZChcInB0cjBcIiksIFwiIT09cGl2b3RcIiwgcGl2b3QsIFwiW3Bpdm90X3B0cl0pe2JyZWFrIF9fbFwiLCBsYWJlbENvdW50ZXIsIFwifVwiXG4gICAgICBdLmpvaW4oXCJcIikpXG4gICAgICBjb2RlLnB1c2goYm9keSwgXCJ9XCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvZGUucHVzaChbXCJ3aGlsZShcIiwgZGF0YVJlYWQodG9Qb2ludGVyKHB0cikpLCBcIj09PXBpdm90XCIsIHBpdm90LCBcIil7XCIsIGJvZHksIFwifVwiXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgfVxuICBcbiAgLy9DaGVjayBib3VuZHNcbiAgY29kZS5wdXNoKFwiaWYobGVzczxpbmRleDEmJmdyZWF0PmluZGV4NSl7XCIpXG4gIFxuICAgIHdhbGtQb2ludGVyKFwibGVzc1wiLCAxLCBcIisrbGVzc1wiKVxuICAgIHdhbGtQb2ludGVyKFwiZ3JlYXRcIiwgMiwgXCItLWdyZWF0XCIpXG4gIFxuICAgIGNvZGUucHVzaChcImZvcihrPWxlc3M7azw9Z3JlYXQ7KytrKXtcIilcbiAgICAgIGNvbXBhcmVQaXZvdChcImNvbXBfcGl2b3QxXCIsIFwia1wiLCAxKVxuICAgICAgY29kZS5wdXNoKFwiaWYoY29tcF9waXZvdDE9PT0wKXtcIilcbiAgICAgICAgY29kZS5wdXNoKFwiaWYoayE9PWxlc3Mpe1wiKVxuICAgICAgICAgIHN3YXBFbGVtZW50cyhcImtcIiwgXCJsZXNzXCIpXG4gICAgICAgIGNvZGUucHVzaChcIn1cIilcbiAgICAgICAgY29kZS5wdXNoKFwiKytsZXNzXCIpXG4gICAgICBjb2RlLnB1c2goXCJ9ZWxzZXtcIilcbiAgICAgICAgY29tcGFyZVBpdm90KFwiY29tcF9waXZvdDJcIiwgXCJrXCIsIDIpXG4gICAgICAgIGNvZGUucHVzaChcImlmKGNvbXBfcGl2b3QyPT09MCl7XCIpXG4gICAgICAgICAgY29kZS5wdXNoKFwid2hpbGUodHJ1ZSl7XCIpXG4gICAgICAgICAgICBjb21wYXJlUGl2b3QoXCJjb21wXCIsIFwiZ3JlYXRcIiwgMilcbiAgICAgICAgICAgIGNvZGUucHVzaChcImlmKGNvbXA9PT0wKXtcIilcbiAgICAgICAgICAgICAgY29kZS5wdXNoKFwiaWYoLS1ncmVhdDxrKXticmVha31cIilcbiAgICAgICAgICAgICAgY29kZS5wdXNoKFwiY29udGludWVcIilcbiAgICAgICAgICAgIGNvZGUucHVzaChcIn1lbHNle1wiKVxuICAgICAgICAgICAgICBjb21wYXJlUGl2b3QoXCJjb21wXCIsIFwiZ3JlYXRcIiwgMSlcbiAgICAgICAgICAgICAgY29kZS5wdXNoKFwiaWYoY29tcDwwKXtcIilcbiAgICAgICAgICAgICAgICB0cmlwbGVTd2FwKFwia1wiLCBcImxlc3NcIiwgXCJncmVhdFwiKVxuICAgICAgICAgICAgICBjb2RlLnB1c2goXCJ9ZWxzZXtcIilcbiAgICAgICAgICAgICAgICBzd2FwQW5kRGVjcmVtZW50KFwia1wiLCBcImdyZWF0XCIpXG4gICAgICAgICAgICAgIGNvZGUucHVzaChcIn1cIilcbiAgICAgICAgICAgICAgY29kZS5wdXNoKFwiYnJlYWtcIilcbiAgICAgICAgICAgIGNvZGUucHVzaChcIn1cIilcbiAgICAgICAgICBjb2RlLnB1c2goXCJ9XCIpXG4gICAgICAgIGNvZGUucHVzaChcIn1cIilcbiAgICAgIGNvZGUucHVzaChcIn1cIilcbiAgICBjb2RlLnB1c2goXCJ9XCIpXG4gIGNvZGUucHVzaChcIn1cIilcbiAgXG4gIC8vQ2xlYW4gdXAgYW5kIGRvIGEgZmluYWwgc29ydGluZyBwYXNzXG4gIGNsZWFuVXAoKVxuICBkb1NvcnQoXCJsZXNzXCIsIFwiZ3JlYXRcIilcbiBcbiAgLy9DbG9zZSBvZmYgbWFpbiBsb29wXG4gIGNvZGUucHVzaChcIn1yZXR1cm4gXCIgKyBmdW5jTmFtZSlcbiAgXG4gIC8vQ29tcGlsZSBhbmQgbGlua1xuICBpZihvcmRlci5sZW5ndGggPiAxICYmIGFsbG9jYXRvcikge1xuICAgIHZhciBjb21waWxlZCA9IG5ldyBGdW5jdGlvbihcImluc2VydGlvblNvcnRcIiwgXCJtYWxsb2NcIiwgXCJmcmVlXCIsIGNvZGUuam9pbihcIlxcblwiKSlcbiAgICByZXR1cm4gY29tcGlsZWQoaW5zZXJ0aW9uU29ydCwgYWxsb2NhdG9yWzBdLCBhbGxvY2F0b3JbMV0pXG4gIH1cbiAgdmFyIGNvbXBpbGVkID0gbmV3IEZ1bmN0aW9uKFwiaW5zZXJ0aW9uU29ydFwiLCBjb2RlLmpvaW4oXCJcXG5cIikpXG4gIHJldHVybiBjb21waWxlZChpbnNlcnRpb25Tb3J0KVxufVxuXG5mdW5jdGlvbiBjb21waWxlU29ydChvcmRlciwgZHR5cGUpIHtcbiAgdmFyIGNvZGUgPSBbXCIndXNlIHN0cmljdCdcIl1cbiAgdmFyIGZ1bmNOYW1lID0gW1wibmRhcnJheVNvcnRXcmFwcGVyXCIsIG9yZGVyLmpvaW4oXCJkXCIpLCBkdHlwZV0uam9pbihcIlwiKVxuICB2YXIgZnVuY0FyZ3MgPSBbIFwiYXJyYXlcIiBdXG4gIFxuICBjb2RlLnB1c2goW1wiZnVuY3Rpb24gXCIsIGZ1bmNOYW1lLCBcIihcIiwgZnVuY0FyZ3Muam9pbihcIixcIiksIFwiKXtcIl0uam9pbihcIlwiKSlcbiAgXG4gIC8vVW5wYWNrIGxvY2FsIHZhcmlhYmxlcyBmcm9tIGFycmF5XG4gIHZhciB2YXJzID0gW1wiZGF0YT1hcnJheS5kYXRhLG9mZnNldD1hcnJheS5vZmZzZXR8MCxzaGFwZT1hcnJheS5zaGFwZSxzdHJpZGU9YXJyYXkuc3RyaWRlXCJdXG4gIGZvcih2YXIgaT0wOyBpPG9yZGVyLmxlbmd0aDsgKytpKSB7XG4gICAgdmFycy5wdXNoKFtcInNcIixpLFwiPXN0cmlkZVtcIixpLFwiXXwwLG5cIixpLFwiPXNoYXBlW1wiLGksXCJdfDBcIl0uam9pbihcIlwiKSlcbiAgfVxuICBcbiAgdmFyIHNjcmF0Y2hfc3RyaWRlID0gbmV3IEFycmF5KG9yZGVyLmxlbmd0aClcbiAgdmFyIG5wcm9kID0gW11cbiAgZm9yKHZhciBpPTA7IGk8b3JkZXIubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgayA9IG9yZGVyW2ldXG4gICAgaWYoayA9PT0gMCkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgaWYobnByb2QubGVuZ3RoID09PSAwKSB7XG4gICAgICBzY3JhdGNoX3N0cmlkZVtrXSA9IFwiMVwiXG4gICAgfSBlbHNlIHtcbiAgICAgIHNjcmF0Y2hfc3RyaWRlW2tdID0gbnByb2Quam9pbihcIipcIilcbiAgICB9XG4gICAgbnByb2QucHVzaChcIm5cIitrKVxuICB9XG4gIFxuICB2YXIgcCA9IC0xLCBxID0gLTFcbiAgZm9yKHZhciBpPTA7IGk8b3JkZXIubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgaiA9IG9yZGVyW2ldXG4gICAgaWYoaiAhPT0gMCkge1xuICAgICAgaWYocCA+IDApIHtcbiAgICAgICAgdmFycy5wdXNoKFtcImRcIixqLFwiPXNcIixqLFwiLWRcIixwLFwiKm5cIixwXS5qb2luKFwiXCIpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFycy5wdXNoKFtcImRcIixqLFwiPXNcIixqXS5qb2luKFwiXCIpKVxuICAgICAgfVxuICAgICAgcCA9IGpcbiAgICB9XG4gICAgdmFyIGsgPSBvcmRlci5sZW5ndGgtMS1pXG4gICAgaWYoayAhPT0gMCkge1xuICAgICAgaWYocSA+IDApIHtcbiAgICAgICAgdmFycy5wdXNoKFtcImVcIixrLFwiPXNcIixrLFwiLWVcIixxLFwiKm5cIixxLFxuICAgICAgICAgICAgICAgICAgXCIsZlwiLGssXCI9XCIsc2NyYXRjaF9zdHJpZGVba10sXCItZlwiLHEsXCIqblwiLHFdLmpvaW4oXCJcIikpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXJzLnB1c2goW1wiZVwiLGssXCI9c1wiLGssXCIsZlwiLGssXCI9XCIsc2NyYXRjaF9zdHJpZGVba11dLmpvaW4oXCJcIikpXG4gICAgICB9XG4gICAgICBxID0ga1xuICAgIH1cbiAgfVxuICBcbiAgLy9EZWNsYXJlIGxvY2FsIHZhcmlhYmxlc1xuICBjb2RlLnB1c2goXCJ2YXIgXCIgKyB2YXJzLmpvaW4oXCIsXCIpKVxuICBcbiAgLy9DcmVhdGUgYXJndW1lbnRzIGZvciBzdWJyb3V0aW5lXG4gIHZhciBzb3J0QXJncyA9IFtcIjBcIiwgXCJuMC0xXCIsIFwiZGF0YVwiLCBcIm9mZnNldFwiXS5jb25jYXQoc2hhcGVBcmdzKG9yZGVyLmxlbmd0aCkpXG4gIFxuICAvL0NhbGwgbWFpbiBzb3J0aW5nIHJvdXRpbmVcbiAgY29kZS5wdXNoKFtcbiAgICBcImlmKG4wPD1cIixJTlNFUlRJT05fU09SVF9USFJFU0hPTEQsXCIpe1wiLFxuICAgICAgXCJpbnNlcnRpb25Tb3J0KFwiLCBzb3J0QXJncy5qb2luKFwiLFwiKSwgXCIpfWVsc2V7XCIsXG4gICAgICBcInF1aWNrU29ydChcIiwgc29ydEFyZ3Muam9pbihcIixcIiksXG4gICAgXCIpfVwiXG4gIF0uam9pbihcIlwiKSlcbiAgXG4gIC8vUmV0dXJuXG4gIGNvZGUucHVzaChcIn1yZXR1cm4gXCIgKyBmdW5jTmFtZSlcbiAgXG4gIC8vTGluayBldmVyeXRoaW5nIHRvZ2V0aGVyXG4gIHZhciByZXN1bHQgPSBuZXcgRnVuY3Rpb24oXCJpbnNlcnRpb25Tb3J0XCIsIFwicXVpY2tTb3J0XCIsIGNvZGUuam9pbihcIlxcblwiKSlcbiAgdmFyIGluc2VydGlvblNvcnQgPSBjcmVhdGVJbnNlcnRpb25Tb3J0KG9yZGVyLCBkdHlwZSlcbiAgdmFyIHF1aWNrU29ydCA9IGNyZWF0ZVF1aWNrU29ydChvcmRlciwgZHR5cGUsIGluc2VydGlvblNvcnQpXG4gIHJldHVybiByZXN1bHQoaW5zZXJ0aW9uU29ydCwgcXVpY2tTb3J0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVTb3J0IiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGNvbXBpbGUgPSByZXF1aXJlKFwiLi9saWIvY29tcGlsZV9zb3J0LmpzXCIpXG52YXIgQ0FDSEUgPSB7fVxuXG5mdW5jdGlvbiBzb3J0KGFycmF5KSB7XG4gIHZhciBvcmRlciA9IGFycmF5Lm9yZGVyXG4gIHZhciBkdHlwZSA9IGFycmF5LmR0eXBlXG4gIHZhciB0eXBlU2lnID0gW29yZGVyLCBkdHlwZSBdXG4gIHZhciB0eXBlTmFtZSA9IHR5cGVTaWcuam9pbihcIjpcIilcbiAgdmFyIGNvbXBpbGVkID0gQ0FDSEVbdHlwZU5hbWVdXG4gIGlmKCFjb21waWxlZCkge1xuICAgIENBQ0hFW3R5cGVOYW1lXSA9IGNvbXBpbGVkID0gY29tcGlsZShvcmRlciwgZHR5cGUpXG4gIH1cbiAgY29tcGlsZWQoYXJyYXkpXG4gIHJldHVybiBhcnJheVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnQiLCJ2YXIgREVGQVVMVF9OT1JNQUxTX0VQU0lMT04gPSAxZS02O1xudmFyIERFRkFVTFRfRkFDRV9FUFNJTE9OID0gMWUtNjtcblxuLy9Fc3RpbWF0ZSB0aGUgdmVydGV4IG5vcm1hbHMgb2YgYSBtZXNoXG5leHBvcnRzLnZlcnRleE5vcm1hbHMgPSBmdW5jdGlvbihmYWNlcywgcG9zaXRpb25zLCBzcGVjaWZpZWRFcHNpbG9uKSB7XG5cbiAgdmFyIE4gICAgICAgICA9IHBvc2l0aW9ucy5sZW5ndGg7XG4gIHZhciBub3JtYWxzICAgPSBuZXcgQXJyYXkoTik7XG4gIHZhciBlcHNpbG9uICAgPSBzcGVjaWZpZWRFcHNpbG9uID09PSB2b2lkKDApID8gREVGQVVMVF9OT1JNQUxTX0VQU0lMT04gOiBzcGVjaWZpZWRFcHNpbG9uO1xuXG4gIC8vSW5pdGlhbGl6ZSBub3JtYWwgYXJyYXlcbiAgZm9yKHZhciBpPTA7IGk8TjsgKytpKSB7XG4gICAgbm9ybWFsc1tpXSA9IFswLjAsIDAuMCwgMC4wXTtcbiAgfVxuXG4gIC8vV2FsayBvdmVyIGFsbCB0aGUgZmFjZXMgYW5kIGFkZCBwZXItdmVydGV4IGNvbnRyaWJ1dGlvbiB0byBub3JtYWwgd2VpZ2h0c1xuICBmb3IodmFyIGk9MDsgaTxmYWNlcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBmID0gZmFjZXNbaV07XG4gICAgdmFyIHAgPSAwO1xuICAgIHZhciBjID0gZltmLmxlbmd0aC0xXTtcbiAgICB2YXIgbiA9IGZbMF07XG4gICAgZm9yKHZhciBqPTA7IGo8Zi5sZW5ndGg7ICsraikge1xuXG4gICAgICAvL1NoaWZ0IGluZGljZXMgYmFja1xuICAgICAgcCA9IGM7XG4gICAgICBjID0gbjtcbiAgICAgIG4gPSBmWyhqKzEpICUgZi5sZW5ndGhdO1xuXG4gICAgICB2YXIgdjAgPSBwb3NpdGlvbnNbcF07XG4gICAgICB2YXIgdjEgPSBwb3NpdGlvbnNbY107XG4gICAgICB2YXIgdjIgPSBwb3NpdGlvbnNbbl07XG5cbiAgICAgIC8vQ29tcHV0ZSBpbmZpbmV0ZWlzbWFsIGFyY3NcbiAgICAgIHZhciBkMDEgPSBuZXcgQXJyYXkoMyk7XG4gICAgICB2YXIgbTAxID0gMC4wO1xuICAgICAgdmFyIGQyMSA9IG5ldyBBcnJheSgzKTtcbiAgICAgIHZhciBtMjEgPSAwLjA7XG4gICAgICBmb3IodmFyIGs9MDsgazwzOyArK2spIHtcbiAgICAgICAgZDAxW2tdID0gdjBba10gIC0gdjFba107XG4gICAgICAgIG0wMSAgICs9IGQwMVtrXSAqIGQwMVtrXTtcbiAgICAgICAgZDIxW2tdID0gdjJba10gIC0gdjFba107XG4gICAgICAgIG0yMSAgICs9IGQyMVtrXSAqIGQyMVtrXTtcbiAgICAgIH1cblxuICAgICAgLy9BY2N1bXVsYXRlIHZhbHVlcyBpbiBub3JtYWxcbiAgICAgIGlmKG0wMSAqIG0yMSA+IGVwc2lsb24pIHtcbiAgICAgICAgdmFyIG5vcm0gPSBub3JtYWxzW2NdO1xuICAgICAgICB2YXIgdyA9IDEuMCAvIE1hdGguc3FydChtMDEgKiBtMjEpO1xuICAgICAgICBmb3IodmFyIGs9MDsgazwzOyArK2spIHtcbiAgICAgICAgICB2YXIgdSA9IChrKzEpJTM7XG4gICAgICAgICAgdmFyIHYgPSAoaysyKSUzO1xuICAgICAgICAgIG5vcm1ba10gKz0gdyAqIChkMjFbdV0gKiBkMDFbdl0gLSBkMjFbdl0gKiBkMDFbdV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9TY2FsZSBhbGwgbm9ybWFscyB0byB1bml0IGxlbmd0aFxuICBmb3IodmFyIGk9MDsgaTxOOyArK2kpIHtcbiAgICB2YXIgbm9ybSA9IG5vcm1hbHNbaV07XG4gICAgdmFyIG0gPSAwLjA7XG4gICAgZm9yKHZhciBrPTA7IGs8MzsgKytrKSB7XG4gICAgICBtICs9IG5vcm1ba10gKiBub3JtW2tdO1xuICAgIH1cbiAgICBpZihtID4gZXBzaWxvbikge1xuICAgICAgdmFyIHcgPSAxLjAgLyBNYXRoLnNxcnQobSk7XG4gICAgICBmb3IodmFyIGs9MDsgazwzOyArK2spIHtcbiAgICAgICAgbm9ybVtrXSAqPSB3O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IodmFyIGs9MDsgazwzOyArK2spIHtcbiAgICAgICAgbm9ybVtrXSA9IDAuMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL1JldHVybiB0aGUgcmVzdWx0aW5nIHNldCBvZiBwYXRjaGVzXG4gIHJldHVybiBub3JtYWxzO1xufVxuXG4vL0NvbXB1dGUgZmFjZSBub3JtYWxzIG9mIGEgbWVzaFxuZXhwb3J0cy5mYWNlTm9ybWFscyA9IGZ1bmN0aW9uKGZhY2VzLCBwb3NpdGlvbnMsIHNwZWNpZmllZEVwc2lsb24pIHtcblxuICB2YXIgTiAgICAgICAgID0gZmFjZXMubGVuZ3RoO1xuICB2YXIgbm9ybWFscyAgID0gbmV3IEFycmF5KE4pO1xuICB2YXIgZXBzaWxvbiAgID0gc3BlY2lmaWVkRXBzaWxvbiA9PT0gdm9pZCgwKSA/IERFRkFVTFRfRkFDRV9FUFNJTE9OIDogc3BlY2lmaWVkRXBzaWxvbjtcblxuICBmb3IodmFyIGk9MDsgaTxOOyArK2kpIHtcbiAgICB2YXIgZiA9IGZhY2VzW2ldO1xuICAgIHZhciBwb3MgPSBuZXcgQXJyYXkoMyk7XG4gICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICBwb3Nbal0gPSBwb3NpdGlvbnNbZltqXV07XG4gICAgfVxuXG4gICAgdmFyIGQwMSA9IG5ldyBBcnJheSgzKTtcbiAgICB2YXIgZDIxID0gbmV3IEFycmF5KDMpO1xuICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgZDAxW2pdID0gcG9zWzFdW2pdIC0gcG9zWzBdW2pdO1xuICAgICAgZDIxW2pdID0gcG9zWzJdW2pdIC0gcG9zWzBdW2pdO1xuICAgIH1cblxuICAgIHZhciBuID0gbmV3IEFycmF5KDMpO1xuICAgIHZhciBsID0gMC4wO1xuICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgdmFyIHUgPSAoaisxKSUzO1xuICAgICAgdmFyIHYgPSAoaisyKSUzO1xuICAgICAgbltqXSA9IGQwMVt1XSAqIGQyMVt2XSAtIGQwMVt2XSAqIGQyMVt1XTtcbiAgICAgIGwgKz0gbltqXSAqIG5bal07XG4gICAgfVxuICAgIGlmKGwgPiBlcHNpbG9uKSB7XG4gICAgICBsID0gMS4wIC8gTWF0aC5zcXJ0KGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsID0gMC4wO1xuICAgIH1cbiAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgIG5bal0gKj0gbDtcbiAgICB9XG4gICAgbm9ybWFsc1tpXSA9IG47XG4gIH1cbiAgcmV0dXJuIG5vcm1hbHM7XG59XG5cblxuIiwiLy9PcHRpbWl6ZWQgdmVyc2lvbiBmb3IgdHJpYW5nbGUgY2xvc2VzdCBwb2ludFxuLy8gQmFzZWQgb24gRWJlcmx5J3MgV2lsZE1hZ2ljayBjb2Rlc1xuLy8gaHR0cDovL3d3dy5nZW9tZXRyaWN0b29scy5jb20vTGliTWF0aGVtYXRpY3MvRGlzdGFuY2UvRGlzdGFuY2UuaHRtbFxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBkaWZmID0gbmV3IEZsb2F0NjRBcnJheSg0KTtcbnZhciBlZGdlMCA9IG5ldyBGbG9hdDY0QXJyYXkoNCk7XG52YXIgZWRnZTEgPSBuZXcgRmxvYXQ2NEFycmF5KDQpO1xuXG5mdW5jdGlvbiBjbG9zZXN0UG9pbnQyZChWMCwgVjEsIFYyLCBwb2ludCwgcmVzdWx0KSB7XG4gIC8vUmVhbGxvY2F0ZSBidWZmZXJzIGlmIG5lY2Vzc2FyeVxuICBpZihkaWZmLmxlbmd0aCA8IHBvaW50Lmxlbmd0aCkge1xuICAgIGRpZmYgPSBuZXcgRmxvYXQ2NEFycmF5KHBvaW50Lmxlbmd0aCk7XG4gICAgZWRnZTAgPSBuZXcgRmxvYXQ2NEFycmF5KHBvaW50Lmxlbmd0aCk7XG4gICAgZWRnZTEgPSBuZXcgRmxvYXQ2NEFycmF5KHBvaW50Lmxlbmd0aCk7XG4gIH1cbiAgLy9Db21wdXRlIGVkZ2VzXG4gIGZvcih2YXIgaT0wOyBpPHBvaW50Lmxlbmd0aDsgKytpKSB7XG4gICAgZGlmZltpXSAgPSBWMFtpXSAtIHBvaW50W2ldO1xuICAgIGVkZ2UwW2ldID0gVjFbaV0gLSBWMFtpXTtcbiAgICBlZGdlMVtpXSA9IFYyW2ldIC0gVjBbaV07XG4gIH1cbiAgLy9Db21wdXRlIGNvZWZmaWNpZW50cyBmb3IgcXVhZHJhdGljIGZ1bmNcbiAgdmFyIGEwMCA9IDAuMFxuICAgICwgYTAxID0gMC4wXG4gICAgLCBhMTEgPSAwLjBcbiAgICAsIGIwICA9IDAuMFxuICAgICwgYjEgID0gMC4wXG4gICAgLCBjICAgPSAwLjA7XG4gIGZvcih2YXIgaT0wOyBpPHBvaW50Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGUwID0gZWRnZTBbaV1cbiAgICAgICwgZTEgPSBlZGdlMVtpXVxuICAgICAgLCBkICA9IGRpZmZbaV07XG4gICAgYTAwICs9IGUwICogZTA7XG4gICAgYTAxICs9IGUwICogZTE7XG4gICAgYTExICs9IGUxICogZTE7XG4gICAgYjAgICs9IGQgKiBlMDtcbiAgICBiMSAgKz0gZCAqIGUxO1xuICAgIGMgICArPSBkICogZDtcbiAgfVxuICAvL0NvbXB1dGUgZGV0ZXJtaW5hbnQvY29lZmZzXG4gIHZhciBkZXQgPSBNYXRoLmFicyhhMDAqYTExIC0gYTAxKmEwMSk7XG4gIHZhciBzICAgPSBhMDEqYjEgLSBhMTEqYjA7XG4gIHZhciB0ICAgPSBhMDEqYjAgLSBhMDAqYjE7XG4gIHZhciBzcXJEaXN0YW5jZTtcbiAgLy9IYXJkY29kZWQgVm9yb25vaSBkaWFncmFtIGNsYXNzaWZpY2F0aW9uXG4gIGlmIChzICsgdCA8PSBkZXQpIHtcbiAgICBpZiAocyA8IDApIHtcbiAgICAgIGlmICh0IDwgMCkgeyAvLyByZWdpb24gNFxuICAgICAgICBpZiAoYjAgPCAwKSB7XG4gICAgICAgICAgdCA9IDA7XG4gICAgICAgICAgaWYgKC1iMCA+PSBhMDApIHtcbiAgICAgICAgICAgIHMgPSAxLjA7XG4gICAgICAgICAgICBzcXJEaXN0YW5jZSA9IGEwMCArIDIuMCpiMCArIGM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMgPSAtYjAvYTAwO1xuICAgICAgICAgICAgc3FyRGlzdGFuY2UgPSBiMCpzICsgYztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcyA9IDA7XG4gICAgICAgICAgaWYgKGIxID49IDApIHtcbiAgICAgICAgICAgIHQgPSAwO1xuICAgICAgICAgICAgc3FyRGlzdGFuY2UgPSBjO1xuICAgICAgICAgIH0gZWxzZSBpZiAoLWIxID49IGExMSkge1xuICAgICAgICAgICAgdCA9IDE7XG4gICAgICAgICAgICBzcXJEaXN0YW5jZSA9IGExMSArIDIuMCpiMSArIGM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHQgPSAtYjEvYTExO1xuICAgICAgICAgICAgc3FyRGlzdGFuY2UgPSBiMSp0ICsgYztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7ICAvLyByZWdpb24gM1xuICAgICAgICBzID0gMDtcbiAgICAgICAgaWYgKGIxID49IDApIHtcbiAgICAgICAgICB0ID0gMDtcbiAgICAgICAgICBzcXJEaXN0YW5jZSA9IGM7XG4gICAgICAgIH0gZWxzZSBpZiAoLWIxID49IGExMSkge1xuICAgICAgICAgIHQgPSAxO1xuICAgICAgICAgIHNxckRpc3RhbmNlID0gYTExICsgMi4wKmIxICsgYztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ID0gLWIxL2ExMTtcbiAgICAgICAgICBzcXJEaXN0YW5jZSA9IGIxKnQgKyBjO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0IDwgMCkgeyAvLyByZWdpb24gNVxuICAgICAgdCA9IDA7XG4gICAgICBpZiAoYjAgPj0gMCkge1xuICAgICAgICBzID0gMDtcbiAgICAgICAgc3FyRGlzdGFuY2UgPSBjO1xuICAgICAgfSBlbHNlIGlmICgtYjAgPj0gYTAwKSB7XG4gICAgICAgIHMgPSAxO1xuICAgICAgICBzcXJEaXN0YW5jZSA9IGEwMCArIDIuMCpiMCArIGM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzID0gLWIwL2EwMDtcbiAgICAgICAgc3FyRGlzdGFuY2UgPSBiMCpzICsgYztcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAgLy8gcmVnaW9uIDBcbiAgICAgIC8vIG1pbmltdW0gYXQgaW50ZXJpb3IgcG9pbnRcbiAgICAgIHZhciBpbnZEZXQgPSAxLjAgLyBkZXQ7XG4gICAgICBzICo9IGludkRldDtcbiAgICAgIHQgKj0gaW52RGV0O1xuICAgICAgc3FyRGlzdGFuY2UgPSBzKihhMDAqcyArIGEwMSp0ICsgMi4wKmIwKSArIHQqKGEwMSpzICsgYTExKnQgKyAyLjAqYjEpICsgYztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRtcDAsIHRtcDEsIG51bWVyLCBkZW5vbTtcbiAgICBcbiAgICBpZiAocyA8IDApIHsgIC8vIHJlZ2lvbiAyXG4gICAgICB0bXAwID0gYTAxICsgYjA7XG4gICAgICB0bXAxID0gYTExICsgYjE7XG4gICAgICBpZiAodG1wMSA+IHRtcDApIHtcbiAgICAgICAgbnVtZXIgPSB0bXAxIC0gdG1wMDtcbiAgICAgICAgZGVub20gPSBhMDAgLSAyLjAqYTAxICsgYTExO1xuICAgICAgICBpZiAobnVtZXIgPj0gZGVub20pIHtcbiAgICAgICAgICBzID0gMTtcbiAgICAgICAgICB0ID0gMDtcbiAgICAgICAgICBzcXJEaXN0YW5jZSA9IGEwMCArIDIuMCpiMCArIGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcyA9IG51bWVyL2Rlbm9tO1xuICAgICAgICAgIHQgPSAxIC0gcztcbiAgICAgICAgICBzcXJEaXN0YW5jZSA9IHMqKGEwMCpzICsgYTAxKnQgKyAyLjAqYjApICtcbiAgICAgICAgICB0KihhMDEqcyArIGExMSp0ICsgMi4wKmIxKSArIGM7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHMgPSAwO1xuICAgICAgICBpZiAodG1wMSA8PSAwKSB7XG4gICAgICAgICAgdCA9IDE7XG4gICAgICAgICAgc3FyRGlzdGFuY2UgPSBhMTEgKyAyLjAqYjEgKyBjO1xuICAgICAgICB9IGVsc2UgaWYgKGIxID49IDApIHtcbiAgICAgICAgICB0ID0gMDtcbiAgICAgICAgICBzcXJEaXN0YW5jZSA9IGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdCA9IC1iMS9hMTE7XG4gICAgICAgICAgc3FyRGlzdGFuY2UgPSBiMSp0ICsgYztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodCA8IDApIHsgIC8vIHJlZ2lvbiA2XG4gICAgICB0bXAwID0gYTAxICsgYjE7XG4gICAgICB0bXAxID0gYTAwICsgYjA7XG4gICAgICBpZiAodG1wMSA+IHRtcDApIHtcbiAgICAgICAgbnVtZXIgPSB0bXAxIC0gdG1wMDtcbiAgICAgICAgZGVub20gPSBhMDAgLSAyLjAqYTAxICsgYTExO1xuICAgICAgICBpZiAobnVtZXIgPj0gZGVub20pIHtcbiAgICAgICAgICB0ID0gMTtcbiAgICAgICAgICBzID0gMDtcbiAgICAgICAgICBzcXJEaXN0YW5jZSA9IGExMSArIDIuMCpiMSArIGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdCA9IG51bWVyL2Rlbm9tO1xuICAgICAgICAgIHMgPSAxIC0gdDtcbiAgICAgICAgICBzcXJEaXN0YW5jZSA9IHMqKGEwMCpzICsgYTAxKnQgKyAyLjAqYjApICtcbiAgICAgICAgICB0KihhMDEqcyArIGExMSp0ICsgMi4wKmIxKSArIGM7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHQgPSAwO1xuICAgICAgICBpZiAodG1wMSA8PSAwKSB7XG4gICAgICAgICAgcyA9IDE7XG4gICAgICAgICAgc3FyRGlzdGFuY2UgPSBhMDAgKyAyLjAqYjAgKyBjO1xuICAgICAgICB9IGVsc2UgaWYgKGIwID49IDApIHtcbiAgICAgICAgICBzID0gMDtcbiAgICAgICAgICBzcXJEaXN0YW5jZSA9IGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcyA9IC1iMC9hMDA7XG4gICAgICAgICAgc3FyRGlzdGFuY2UgPSBiMCpzICsgYztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7ICAvLyByZWdpb24gMVxuICAgICAgbnVtZXIgPSBhMTEgKyBiMSAtIGEwMSAtIGIwO1xuICAgICAgaWYgKG51bWVyIDw9IDApIHtcbiAgICAgICAgcyA9IDA7XG4gICAgICAgIHQgPSAxO1xuICAgICAgICBzcXJEaXN0YW5jZSA9IGExMSArIDIuMCpiMSArIGM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZW5vbSA9IGEwMCAtIDIuMCphMDEgKyBhMTE7XG4gICAgICAgIGlmIChudW1lciA+PSBkZW5vbSkge1xuICAgICAgICAgIHMgPSAxO1xuICAgICAgICAgIHQgPSAwO1xuICAgICAgICAgIHNxckRpc3RhbmNlID0gYTAwICsgMi4wKmIwICsgYztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzID0gbnVtZXIvZGVub207XG4gICAgICAgICAgdCA9IDEgLSBzO1xuICAgICAgICAgIHNxckRpc3RhbmNlID0gcyooYTAwKnMgKyBhMDEqdCArIDIuMCpiMCkgK1xuICAgICAgICAgIHQqKGEwMSpzICsgYTExKnQgKyAyLjAqYjEpICsgYztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YXIgdSA9IDEuMCAtIHMgLSB0O1xuICBmb3IodmFyIGk9MDsgaTxwb2ludC5sZW5ndGg7ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IHUgKiBWMFtpXSArIHMgKiBWMVtpXSArIHQgKiBWMltpXTtcbiAgfVxuICBpZihzcXJEaXN0YW5jZSA8IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICByZXR1cm4gc3FyRGlzdGFuY2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvc2VzdFBvaW50MmQ7XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXByZXNzRXhwYW5zaW9uXG5cbmZ1bmN0aW9uIGNvbXByZXNzRXhwYW5zaW9uKGUpIHtcbiAgdmFyIG0gPSBlLmxlbmd0aFxuICB2YXIgUSA9IGVbZS5sZW5ndGgtMV1cbiAgdmFyIGJvdHRvbSA9IG1cbiAgZm9yKHZhciBpPW0tMjsgaT49MDsgLS1pKSB7XG4gICAgdmFyIGEgPSBRXG4gICAgdmFyIGIgPSBlW2ldXG4gICAgUSA9IGEgKyBiXG4gICAgdmFyIGJ2ID0gUSAtIGFcbiAgICB2YXIgcSA9IGIgLSBidlxuICAgIGlmKHEpIHtcbiAgICAgIGVbLS1ib3R0b21dID0gUVxuICAgICAgUSA9IHFcbiAgICB9XG4gIH1cbiAgdmFyIHRvcCA9IDBcbiAgZm9yKHZhciBpPWJvdHRvbTsgaTxtOyArK2kpIHtcbiAgICB2YXIgYSA9IGVbaV1cbiAgICB2YXIgYiA9IFFcbiAgICBRID0gYSArIGJcbiAgICB2YXIgYnYgPSBRIC0gYVxuICAgIHZhciBxID0gYiAtIGJ2XG4gICAgaWYocSkge1xuICAgICAgZVt0b3ArK10gPSBxXG4gICAgfVxuICB9XG4gIGVbdG9wKytdID0gUVxuICBlLmxlbmd0aCA9IHRvcFxuICByZXR1cm4gZVxufSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciB0d29Qcm9kdWN0ID0gcmVxdWlyZShcInR3by1wcm9kdWN0XCIpXG52YXIgcm9idXN0U3VtID0gcmVxdWlyZShcInJvYnVzdC1zdW1cIilcbnZhciByb2J1c3RTY2FsZSA9IHJlcXVpcmUoXCJyb2J1c3Qtc2NhbGVcIilcbnZhciBjb21wcmVzcyA9IHJlcXVpcmUoXCJyb2J1c3QtY29tcHJlc3NcIilcblxudmFyIE5VTV9FWFBBTkRFRCA9IDZcblxuZnVuY3Rpb24gY29mYWN0b3IobSwgYykge1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KG0ubGVuZ3RoLTEpXG4gIGZvcih2YXIgaT0xOyBpPG0ubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgciA9IHJlc3VsdFtpLTFdID0gbmV3IEFycmF5KG0ubGVuZ3RoLTEpXG4gICAgZm9yKHZhciBqPTAsaz0wOyBqPG0ubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmKGogPT09IGMpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHJbaysrXSA9IG1baV1bal1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBtYXRyaXgobikge1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KG4pXG4gIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IG5ldyBBcnJheShuKVxuICAgIGZvcih2YXIgaj0wOyBqPG47ICsraikge1xuICAgICAgcmVzdWx0W2ldW2pdID0gW1wibVtcIiwgaSwgXCJdW1wiLCBqLCBcIl1cIl0uam9pbihcIlwiKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIHNpZ24obikge1xuICBpZihuICYgMSkge1xuICAgIHJldHVybiBcIi1cIlxuICB9XG4gIHJldHVybiBcIlwiXG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU3VtKGV4cHIpIHtcbiAgaWYoZXhwci5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZXhwclswXVxuICB9IGVsc2UgaWYoZXhwci5sZW5ndGggPT09IDIpIHtcbiAgICByZXR1cm4gW1wic3VtKFwiLCBleHByWzBdLCBcIixcIiwgZXhwclsxXSwgXCIpXCJdLmpvaW4oXCJcIilcbiAgfSBlbHNlIHtcbiAgICB2YXIgbSA9IGV4cHIubGVuZ3RoPj4xXG4gICAgcmV0dXJuIFtcInN1bShcIiwgZ2VuZXJhdGVTdW0oZXhwci5zbGljZSgwLCBtKSksIFwiLFwiLCBnZW5lcmF0ZVN1bShleHByLnNsaWNlKG0pKSwgXCIpXCJdLmpvaW4oXCJcIilcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmFudChtKSB7XG4gIGlmKG0ubGVuZ3RoID09PSAyKSB7XG4gICAgcmV0dXJuIFtcInN1bShwcm9kKFwiLCBtWzBdWzBdLCBcIixcIiwgbVsxXVsxXSwgXCIpLHByb2QoLVwiLCBtWzBdWzFdLCBcIixcIiwgbVsxXVswXSwgXCIpKVwiXS5qb2luKFwiXCIpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGV4cHIgPSBbXVxuICAgIGZvcih2YXIgaT0wOyBpPG0ubGVuZ3RoOyArK2kpIHtcbiAgICAgIGV4cHIucHVzaChbXCJzY2FsZShcIiwgZGV0ZXJtaW5hbnQoY29mYWN0b3IobSwgaSkpLCBcIixcIiwgc2lnbihpKSwgbVswXVtpXSwgXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgfVxuICAgIHJldHVybiBnZW5lcmF0ZVN1bShleHByKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVEZXRlcm1pbmFudChuKSB7XG4gIHZhciBwcm9jID0gbmV3IEZ1bmN0aW9uKFwic3VtXCIsIFwic2NhbGVcIiwgXCJwcm9kXCIsIFwiY29tcHJlc3NcIiwgW1xuICAgIFwiZnVuY3Rpb24gcm9idXN0RGV0ZXJtaW5hbnRcIixuLCBcIihtKXtyZXR1cm4gY29tcHJlc3MoXCIsIFxuICAgICAgZGV0ZXJtaW5hbnQobWF0cml4KG4pKSxcbiAgICBcIil9O3JldHVybiByb2J1c3REZXRlcm1pbmFudFwiLCBuXS5qb2luKFwiXCIpKVxuICByZXR1cm4gcHJvYyhyb2J1c3RTdW0sIHJvYnVzdFNjYWxlLCB0d29Qcm9kdWN0LCBjb21wcmVzcylcbn1cblxudmFyIENBQ0hFID0gW1xuICBmdW5jdGlvbiByb2J1c3REZXRlcm1pbmFudDAoKSB7IHJldHVybiBbMF0gfSxcbiAgZnVuY3Rpb24gcm9idXN0RGV0ZXJtaW5hbnQxKG0pIHsgcmV0dXJuIFttWzBdWzBdXSB9XG5dXG5cbmZ1bmN0aW9uIGdlbmVyYXRlRGlzcGF0Y2goKSB7XG4gIHdoaWxlKENBQ0hFLmxlbmd0aCA8IE5VTV9FWFBBTkRFRCkge1xuICAgIENBQ0hFLnB1c2goY29tcGlsZURldGVybWluYW50KENBQ0hFLmxlbmd0aCkpXG4gIH1cbiAgdmFyIHByb2NBcmdzID0gW11cbiAgdmFyIGNvZGUgPSBbXCJmdW5jdGlvbiByb2J1c3REZXRlcm1pbmFudChtKXtzd2l0Y2gobS5sZW5ndGgpe1wiXVxuICBmb3IodmFyIGk9MDsgaTxOVU1fRVhQQU5ERUQ7ICsraSkge1xuICAgIHByb2NBcmdzLnB1c2goXCJkZXRcIiArIGkpXG4gICAgY29kZS5wdXNoKFwiY2FzZSBcIiwgaSwgXCI6cmV0dXJuIGRldFwiLCBpLCBcIihtKTtcIilcbiAgfVxuICBjb2RlLnB1c2goXCJ9XFxcbnZhciBkZXQ9Q0FDSEVbbS5sZW5ndGhdO1xcXG5pZighZGV0KVxcXG5kZXQ9Q0FDSEVbbS5sZW5ndGhdPWdlbihtLmxlbmd0aCk7XFxcbnJldHVybiBkZXQobSk7XFxcbn1cXFxucmV0dXJuIHJvYnVzdERldGVybWluYW50XCIpXG4gIHByb2NBcmdzLnB1c2goXCJDQUNIRVwiLCBcImdlblwiLCBjb2RlLmpvaW4oXCJcIikpXG4gIHZhciBwcm9jID0gRnVuY3Rpb24uYXBwbHkodW5kZWZpbmVkLCBwcm9jQXJncylcbiAgbW9kdWxlLmV4cG9ydHMgPSBwcm9jLmFwcGx5KHVuZGVmaW5lZCwgQ0FDSEUuY29uY2F0KFtDQUNIRSwgY29tcGlsZURldGVybWluYW50XSkpXG4gIGZvcih2YXIgaT0wOyBpPENBQ0hFLmxlbmd0aDsgKytpKSB7XG4gICAgbW9kdWxlLmV4cG9ydHNbaV0gPSBDQUNIRVtpXVxuICB9XG59XG5cbmdlbmVyYXRlRGlzcGF0Y2goKSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBkZXRlcm1pbmFudCA9IHJlcXVpcmUoXCJyb2J1c3QtZGV0ZXJtaW5hbnRcIilcblxudmFyIE5VTV9FWFBBTkQgPSA2XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU29sdmVyKG4pIHtcbiAgdmFyIGZ1bmNOYW1lID0gXCJyb2J1c3RMaW5lYXJTb2x2ZVwiICsgbiArIFwiZFwiXG4gIHZhciBjb2RlID0gW1wiZnVuY3Rpb24gXCIsIGZ1bmNOYW1lLCBcIihBLGIpe3JldHVybiBbXCJdXG4gIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgIGNvZGUucHVzaChcImRldChbXCIpXG4gICAgZm9yKHZhciBqPTA7IGo8bjsgKytqKSB7XG4gICAgICBpZihqID4gMCkge1xuICAgICAgICBjb2RlLnB1c2goXCIsXCIpXG4gICAgICB9XG4gICAgICBjb2RlLnB1c2goXCJbXCIpXG4gICAgICBmb3IodmFyIGs9MDsgazxuOyArK2spIHtcbiAgICAgICAgaWYoayA+IDApIHtcbiAgICAgICAgICBjb2RlLnB1c2goXCIsXCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYoayA9PT0gaSkge1xuICAgICAgICAgIGNvZGUucHVzaChcIitiW1wiLCBqLCBcIl1cIilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2RlLnB1c2goXCIrQVtcIiwgaiwgXCJdW1wiLCBrLCBcIl1cIilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29kZS5wdXNoKFwiXVwiKVxuICAgIH1cbiAgICBjb2RlLnB1c2goXCJdKSxcIilcbiAgfVxuICBjb2RlLnB1c2goXCJkZXQoQSldfXJldHVybiBcIiwgZnVuY05hbWUpXG4gIHZhciBwcm9jID0gbmV3IEZ1bmN0aW9uKFwiZGV0XCIsIGNvZGUuam9pbihcIlwiKSlcbiAgaWYobiA8IDYpIHtcbiAgICByZXR1cm4gcHJvYyhkZXRlcm1pbmFudFtuXSlcbiAgfVxuICByZXR1cm4gcHJvYyhkZXRlcm1pbmFudClcbn1cblxuZnVuY3Rpb24gcm9idXN0TGluZWFyU29sdmUwZCgpIHtcbiAgcmV0dXJuIFsgMCBdXG59XG5cbmZ1bmN0aW9uIHJvYnVzdExpbmVhclNvbHZlMWQoQSwgYikge1xuICByZXR1cm4gWyBbIGJbMF0gXSwgWyBBWzBdWzBdIF0gXVxufVxuXG52YXIgQ0FDSEUgPSBbXG4gIHJvYnVzdExpbmVhclNvbHZlMGQsXG4gIHJvYnVzdExpbmVhclNvbHZlMWRcbl1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEaXNwYXRjaCgpIHtcbiAgd2hpbGUoQ0FDSEUubGVuZ3RoIDwgTlVNX0VYUEFORCkge1xuICAgIENBQ0hFLnB1c2goZ2VuZXJhdGVTb2x2ZXIoQ0FDSEUubGVuZ3RoKSlcbiAgfVxuICB2YXIgcHJvY0FyZ3MgPSBbXVxuICB2YXIgY29kZSA9IFtcImZ1bmN0aW9uIGRpc3BhdGNoTGluZWFyU29sdmUoQSxiKXtzd2l0Y2goQS5sZW5ndGgpe1wiXVxuICBmb3IodmFyIGk9MDsgaTxOVU1fRVhQQU5EOyArK2kpIHtcbiAgICBwcm9jQXJncy5wdXNoKFwic1wiICsgaSlcbiAgICBjb2RlLnB1c2goXCJjYXNlIFwiLCBpLCBcIjpyZXR1cm4gc1wiLCBpLCBcIihBLGIpO1wiKVxuICB9XG4gIGNvZGUucHVzaChcIn12YXIgcz1DQUNIRVtBLmxlbmd0aF07aWYoIXMpcz1DQUNIRVtBLmxlbmd0aF09ZyhBLmxlbmd0aCk7cmV0dXJuIHMoQSxiKX1yZXR1cm4gZGlzcGF0Y2hMaW5lYXJTb2x2ZVwiKVxuICBwcm9jQXJncy5wdXNoKFwiQ0FDSEVcIiwgXCJnXCIsIGNvZGUuam9pbihcIlwiKSlcbiAgdmFyIHByb2MgPSBGdW5jdGlvbi5hcHBseSh1bmRlZmluZWQsIHByb2NBcmdzKVxuICBtb2R1bGUuZXhwb3J0cyA9IHByb2MuYXBwbHkodW5kZWZpbmVkLCBDQUNIRS5jb25jYXQoW0NBQ0hFLCBnZW5lcmF0ZVNvbHZlcl0pKVxuICBmb3IodmFyIGk9MDsgaTxOVU1fRVhQQU5EOyArK2kpIHtcbiAgICBtb2R1bGUuZXhwb3J0c1tpXSA9IENBQ0hFW2ldXG4gIH1cbn1cblxuZ2VuZXJhdGVEaXNwYXRjaCgpIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZXh0cmFjdENvbnRvdXJcblxudmFyIG5kYXJyYXkgPSByZXF1aXJlKCduZGFycmF5JylcbnZhciBwb29sICAgID0gcmVxdWlyZSgndHlwZWRhcnJheS1wb29sJylcbnZhciBuZHNvcnQgID0gcmVxdWlyZSgnbmRhcnJheS1zb3J0JylcblxudmFyIGNvbnRvdXJBbGdvcml0aG0gPSByZXF1aXJlKCcuL2xpYi9jb2RlZ2VuJylcblxuZnVuY3Rpb24gZ2V0RGltZW5zaW9uKGNlbGxzKSB7XG4gIHZhciBudW1DZWxscyA9IGNlbGxzLmxlbmd0aFxuICB2YXIgZCA9IDBcbiAgZm9yKHZhciBpPTA7IGk8bnVtQ2VsbHM7ICsraSkge1xuICAgIGQgPSBNYXRoLm1heChkLCBjZWxsc1tpXS5sZW5ndGgpfDBcbiAgfVxuICByZXR1cm4gZC0xXG59XG5cbmZ1bmN0aW9uIGdldFNpZ25zKHZhbHVlcywgbGV2ZWwpIHtcbiAgdmFyIG51bVZlcnRzICAgID0gdmFsdWVzLmxlbmd0aFxuICB2YXIgdmVydGV4U2lnbnMgPSBwb29sLm1hbGxvY1VpbnQ4KG51bVZlcnRzKVxuICBmb3IodmFyIGk9MDsgaTxudW1WZXJ0czsgKytpKSB7XG4gICAgdmVydGV4U2lnbnNbaV0gPSAodmFsdWVzW2ldIDwgbGV2ZWwpfDBcbiAgfVxuICByZXR1cm4gdmVydGV4U2lnbnNcbn1cblxuZnVuY3Rpb24gZ2V0RWRnZXMoY2VsbHMsIGQpIHtcbiAgdmFyIG51bUNlbGxzID0gY2VsbHMubGVuZ3RoXG4gIHZhciBtYXhFZGdlcyA9ICgoZCAqIChkKzEpLzIpICogbnVtQ2VsbHMpfDBcbiAgdmFyIGVkZ2VzICAgID0gcG9vbC5tYWxsb2NVaW50MzIobWF4RWRnZXMqMilcbiAgdmFyIGVQdHIgICAgID0gMFxuICBmb3IodmFyIGk9MDsgaTxudW1DZWxsczsgKytpKSB7XG4gICAgdmFyIGMgPSBjZWxsc1tpXVxuICAgIHZhciBkID0gYy5sZW5ndGhcbiAgICBmb3IodmFyIGo9MDsgajxkOyArK2opIHtcbiAgICAgIGZvcih2YXIgaz0wOyBrPGo7ICsraykge1xuICAgICAgICB2YXIgYSA9IGNba11cbiAgICAgICAgdmFyIGIgPSBjW2pdXG4gICAgICAgIGVkZ2VzW2VQdHIrK10gPSBNYXRoLm1pbihhLGIpfDBcbiAgICAgICAgZWRnZXNbZVB0cisrXSA9IE1hdGgubWF4KGEsYil8MFxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YXIgbmVkZ2VzID0gKGVQdHIvMil8MFxuICBuZHNvcnQobmRhcnJheShlZGdlcywgW25lZGdlcywyXSkpIFxuICB2YXIgcHRyID0gMlxuICBmb3IodmFyIGk9MjsgaTxlUHRyOyBpKz0yKSB7XG4gICAgaWYoZWRnZXNbaS0yXSA9PT0gZWRnZXNbaV0gJiZcbiAgICAgICBlZGdlc1tpLTFdID09PSBlZGdlc1tpKzFdKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBlZGdlc1twdHIrK10gPSBlZGdlc1tpXVxuICAgIGVkZ2VzW3B0cisrXSA9IGVkZ2VzW2krMV1cbiAgfVxuXG4gIHJldHVybiBuZGFycmF5KGVkZ2VzLCBbKHB0ci8yKXwwLCAyXSlcbn1cblxuZnVuY3Rpb24gZ2V0Q3Jvc3NpbmdXZWlnaHRzKGVkZ2VzLCB2YWx1ZXMsIHNpZ25zLCBsZXZlbCkge1xuICB2YXIgZWRhdGEgICAgID0gZWRnZXMuZGF0YVxuICB2YXIgbnVtRWRnZXMgID0gZWRnZXMuc2hhcGVbMF1cbiAgdmFyIHdlaWdodHMgICA9IHBvb2wubWFsbG9jRG91YmxlKG51bUVkZ2VzKVxuICB2YXIgcHRyICAgICAgID0gMFxuICBmb3IodmFyIGk9MDsgaTxudW1FZGdlczsgKytpKSB7XG4gICAgdmFyIGEgID0gZWRhdGFbMippXVxuICAgIHZhciBiICA9IGVkYXRhWzIqaSsxXVxuICAgIGlmKHNpZ25zW2FdID09PSBzaWduc1tiXSkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgdmFyIHZhID0gdmFsdWVzW2FdXG4gICAgdmFyIHZiID0gdmFsdWVzW2JdXG4gICAgZWRhdGFbMipwdHJdICAgICA9IGFcbiAgICBlZGF0YVsyKnB0cisxXSAgID0gYlxuICAgIHdlaWdodHNbcHRyKytdICAgPSAodmIgLSBsZXZlbCkgLyAodmIgLSB2YSlcbiAgfVxuICBlZGdlcy5zaGFwZVswXSA9IHB0clxuICByZXR1cm4gbmRhcnJheSh3ZWlnaHRzLCBbcHRyXSlcbn1cblxuZnVuY3Rpb24gZ2V0Q2FzY2FkZShlZGdlcywgbnVtVmVydHMpIHtcbiAgdmFyIHJlc3VsdCAgID0gcG9vbC5tYWxsb2NJbnQzMihudW1WZXJ0cyoyKVxuICB2YXIgbnVtRWRnZXMgPSBlZGdlcy5zaGFwZVswXVxuICB2YXIgZWRhdGEgICAgPSBlZGdlcy5kYXRhXG4gIHJlc3VsdFswXSAgICA9IDBcbiAgdmFyIGxhc3RWICAgID0gMFxuICBmb3IodmFyIGk9MDsgaTxudW1FZGdlczsgKytpKSB7XG4gICAgdmFyIGEgPSBlZGF0YVsyKmldXG4gICAgaWYoYSAhPT0gbGFzdFYpIHtcbiAgICAgIHJlc3VsdFsyKmxhc3RWKzFdID0gaVxuICAgICAgd2hpbGUoKytsYXN0ViA8IGEpIHtcbiAgICAgICAgcmVzdWx0WzIqbGFzdFZdID0gaVxuICAgICAgICByZXN1bHRbMipsYXN0VisxXSA9IGlcbiAgICAgIH1cbiAgICAgIHJlc3VsdFsyKmxhc3RWXSA9IGlcbiAgICB9XG4gIH1cbiAgcmVzdWx0WzIqbGFzdFYrMV0gPSBudW1FZGdlc1xuICB3aGlsZSgrK2xhc3RWIDwgbnVtVmVydHMpIHtcbiAgICByZXN1bHRbMipsYXN0Vl0gPSByZXN1bHRbMipsYXN0VisxXSA9IG51bUVkZ2VzXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiB1bnBhY2tFZGdlcyhlZGdlcykge1xuICB2YXIgbmUgPSBlZGdlcy5zaGFwZVswXXwwXG4gIHZhciBlZGF0YSA9IGVkZ2VzLmRhdGFcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShuZSlcbiAgZm9yKHZhciBpPTA7IGk8bmU7ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IFtlZGF0YVsyKmldLCBlZGF0YVsyKmkrMV1dXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBleHRyYWN0Q29udG91cihjZWxscywgdmFsdWVzLCBsZXZlbCwgZCkge1xuICBsZXZlbCA9IGxldmVsfHwwLjBcblxuICAvL0lmIHVzZXIgZGlkbid0IHNwZWNpZnkgYGRgLCB1c2UgYnJ1dGUgZm9yY2Ugc2NhblxuICBpZih0eXBlb2YgZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkID0gZ2V0RGltZW5zaW9uKGNlbGxzKVxuICB9XG5cbiAgLy9Db3VudCBudW1iZXIgb2YgY2VsbHNcbiAgdmFyIG51bUNlbGxzID0gY2VsbHMubGVuZ3RoXG4gIGlmKG51bUNlbGxzID09PSAwIHx8IGQgPCAxKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNlbGxzOiAgICAgICAgIFtdLFxuICAgICAgdmVydGV4SWRzOiAgICAgW10sXG4gICAgICB2ZXJ0ZXhXZWlnaHRzOiBbXVxuICAgIH1cbiAgfVxuXG4gIC8vUmVhZCBpbiB2ZXJ0ZXggc2lnbnNcbiAgdmFyIHZlcnRleFNpZ25zID0gZ2V0U2lnbnModmFsdWVzLCArbGV2ZWwpXG5cbiAgLy9GaXJzdCBnZXQgMS1za2VsZXRvbiwgZmluZCBhbGwgY3Jvc3NpbmdzXG4gIHZhciBlZGdlcyAgID0gZ2V0RWRnZXMoY2VsbHMsIGQpXG4gIHZhciB3ZWlnaHRzID0gZ2V0Q3Jvc3NpbmdXZWlnaHRzKGVkZ2VzLCB2YWx1ZXMsIHZlcnRleFNpZ25zLCArbGV2ZWwpXG5cbiAgLy9CdWlsZCB2ZXJ0ZXggY2FzY2FkZSB0byBzcGVlZCB1cCBiaW5hcnkgc2VhcmNoXG4gIHZhciB2Y2FzY2FkZSA9IGdldENhc2NhZGUoZWRnZXMsIHZhbHVlcy5sZW5ndGh8MClcblxuICAvL1RoZW4gY29uc3RydWN0IGNlbGxzXG4gIHZhciBmYWNlcyA9IGNvbnRvdXJBbGdvcml0aG0oZCkoY2VsbHMsIGVkZ2VzLmRhdGEsIHZjYXNjYWRlLCB2ZXJ0ZXhTaWducylcblxuICAvL1VucGFjayBkYXRhIGludG8gcHJldHR5IGZvcm1hdFxuICB2YXIgdWVkZ2VzICAgPSB1bnBhY2tFZGdlcyhlZGdlcylcbiAgdmFyIHV3ZWlnaHRzID0gW10uc2xpY2UuY2FsbCh3ZWlnaHRzLmRhdGEsIDAsIHdlaWdodHMuc2hhcGVbMF0pXG5cbiAgLy9SZWxlYXNlIGRhdGFcbiAgcG9vbC5mcmVlKHZlcnRleFNpZ25zKVxuICBwb29sLmZyZWUoZWRnZXMuZGF0YSlcbiAgcG9vbC5mcmVlKHdlaWdodHMuZGF0YSlcbiAgcG9vbC5mcmVlKHZjYXNjYWRlKVxuICBcbiAgcmV0dXJuIHtcbiAgICBjZWxsczogICAgICAgICBmYWNlcyxcbiAgICB2ZXJ0ZXhJZHM6ICAgICB1ZWRnZXMsXG4gICAgdmVydGV4V2VpZ2h0czogdXdlaWdodHNcbiAgfVxufSIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFBvbHlnb25pemVyXG5cbnZhciBwb29sID0gcmVxdWlyZSgndHlwZWRhcnJheS1wb29sJylcbnZhciBjcmVhdGVNU1RhYmxlID0gcmVxdWlyZSgnbWFyY2hpbmctc2ltcGxleC10YWJsZScpXG5cbnZhciBDQUNIRSA9IHt9XG5cbmZ1bmN0aW9uIGNyZWF0ZUNlbGxQb2x5Z29uaXplcihkKSB7XG4gIHZhciBtYXhDZWxsU2l6ZSA9IDBcbiAgdmFyIHRhYmxlcyA9IG5ldyBBcnJheShkKzEpXG4gIHRhYmxlc1swXSA9IFsgW10gXVxuICBmb3IodmFyIGk9MTsgaTw9ZDsgKytpKSB7XG4gICAgdmFyIHRhYiA9IHRhYmxlc1tpXSA9IGNyZWF0ZU1TVGFibGUoaSlcbiAgICBmb3IodmFyIGo9MDsgajx0YWIubGVuZ3RoOyArK2opIHtcbiAgICAgIG1heENlbGxTaXplID0gTWF0aC5tYXgobWF4Q2VsbFNpemUsIHRhYltpXS5sZW5ndGgpXG4gICAgfVxuICB9XG5cbiAgdmFyIGNvZGUgID0gW1xuICAnZnVuY3Rpb24gQihDLEUsaSxqKXsnLFxuICAgICd2YXIgYT1NYXRoLm1pbihpLGopfDAsYj1NYXRoLm1heChpLGopfDAsbD1DWzIqYV0saD1DWzIqYSsxXTsnLFxuICAgICd3aGlsZShsPGgpeycsXG4gICAgICAndmFyIG09KGwraCk+PjEsdj1FWzIqbSsxXTsnLFxuICAgICAgJ2lmKHY9PT1iKXtyZXR1cm4gbX0nLFxuICAgICAgJ2lmKGI8dil7aD1tfWVsc2V7bD1tKzF9JyxcbiAgICAnfScsXG4gICAgJ3JldHVybiBsOycsXG4gICd9OycsXG4gICdmdW5jdGlvbiBnZXRDb250b3VyJywgZCwgJ2QoRixFLEMsUyl7JyxcbiAgICAndmFyIG49Ri5sZW5ndGgsUj1bXTsnLFxuICAgICdmb3IodmFyIGk9MDtpPG47KytpKXt2YXIgYz1GW2ldLGw9Yy5sZW5ndGg7J1xuICBdXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVDYXNlKGZhY2V0cykge1xuICAgIGlmKGZhY2V0cy5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvZGUucHVzaCgnUi5wdXNoKCcpXG4gICAgZm9yKHZhciBpPTA7IGk8ZmFjZXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgZmFjZXQgPSBmYWNldHNbaV1cbiAgICAgIGlmKGkgPiAwKSB7XG4gICAgICAgIGNvZGUucHVzaCgnLCcpXG4gICAgICB9XG4gICAgICBjb2RlLnB1c2goJ1snKVxuICAgICAgZm9yKHZhciBqPTA7IGo8ZmFjZXQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgdmFyIGYgPSBmYWNldFtqXVxuICAgICAgICBpZihqID4gMCkge1xuICAgICAgICAgIGNvZGUucHVzaCgnLCcpXG4gICAgICAgIH1cbiAgICAgICAgY29kZS5wdXNoKCdCKEMsRSxjWycsIGZbMF0sICddLGNbJywgZlsxXSwgJ10pJylcbiAgICAgIH1cbiAgICAgIGNvZGUucHVzaCgnXScpXG4gICAgfVxuICAgIGNvZGUucHVzaCgnKTsnKVxuICB9XG5cbiAgZm9yKHZhciBpPWQrMTsgaT4xOyAtLWkpIHtcbiAgICBpZihpIDwgZCsxKSB7XG4gICAgICBjb2RlLnB1c2goJ2Vsc2UgJylcbiAgICB9XG4gICAgY29kZS5wdXNoKCdpZihsPT09JywgaSwgJyl7JylcblxuICAgIC8vR2VuZXJhdGUgbWFza1xuICAgIHZhciBtYXNrU3RyID0gW11cbiAgICBmb3IodmFyIGo9MDsgajxpOyArK2opIHtcbiAgICAgIG1hc2tTdHIucHVzaCgnKFNbY1snK2orJ11dPDwnK2orJyknKVxuICAgIH1cblxuICAgIC8vUGVyZm9ybSB0YWJsZSBsb29rIHVwXG4gICAgY29kZS5wdXNoKCd2YXIgTT0nLCBtYXNrU3RyLmpvaW4oJysnKSwgXG4gICAgICAnO2lmKE09PT0wfHxNPT09JywgKDE8PGkpLTEsIFxuICAgICAgICAnKXtjb250aW51ZX1zd2l0Y2goTSl7JylcblxuICAgIHZhciB0YWIgPSB0YWJsZXNbaS0xXVxuICAgIGZvcih2YXIgaj0wOyBqPHRhYi5sZW5ndGg7ICsraikge1xuICAgICAgY29kZS5wdXNoKCdjYXNlICcsIGosICc6JylcbiAgICAgIGdlbmVyYXRlQ2FzZSh0YWJbal0pXG4gICAgICBjb2RlLnB1c2goJ2JyZWFrOycpXG4gICAgfVxuICAgIGNvZGUucHVzaCgnfX0nKVxuICB9XG4gIGNvZGUucHVzaCgnfXJldHVybiBSO307cmV0dXJuIGdldENvbnRvdXInLCBkLCAnZCcpXG5cbiAgdmFyIHByb2MgPSBuZXcgRnVuY3Rpb24oJ3Bvb2wnLCBjb2RlLmpvaW4oJycpKVxuICByZXR1cm4gcHJvYyhwb29sKVxufVxuXG5mdW5jdGlvbiBnZXRQb2x5Z29uaXplcihkKSB7XG4gIHZhciBhbGcgPSBDQUNIRVtkXVxuICBpZighYWxnKSB7XG4gICAgYWxnID0gQ0FDSEVbZF0gPSBjcmVhdGVDZWxsUG9seWdvbml6ZXIoZCkgXG4gIH1cbiAgcmV0dXJuIGFsZ1xufSIsIlwidXNlIHN0cmljdFwiOyBcInVzZSByZXN0cmljdFwiO1xuXG52YXIgYml0cyAgICAgID0gcmVxdWlyZShcImJpdC10d2lkZGxlXCIpXG4gICwgVW5pb25GaW5kID0gcmVxdWlyZShcInVuaW9uLWZpbmRcIilcblxuLy9SZXR1cm5zIHRoZSBkaW1lbnNpb24gb2YgYSBjZWxsIGNvbXBsZXhcbmZ1bmN0aW9uIGRpbWVuc2lvbihjZWxscykge1xuICB2YXIgZCA9IDBcbiAgICAsIG1heCA9IE1hdGgubWF4XG4gIGZvcih2YXIgaT0wLCBpbD1jZWxscy5sZW5ndGg7IGk8aWw7ICsraSkge1xuICAgIGQgPSBtYXgoZCwgY2VsbHNbaV0ubGVuZ3RoKVxuICB9XG4gIHJldHVybiBkLTFcbn1cbmV4cG9ydHMuZGltZW5zaW9uID0gZGltZW5zaW9uXG5cbi8vQ291bnRzIHRoZSBudW1iZXIgb2YgdmVydGljZXMgaW4gZmFjZXNcbmZ1bmN0aW9uIGNvdW50VmVydGljZXMoY2VsbHMpIHtcbiAgdmFyIHZjID0gLTFcbiAgICAsIG1heCA9IE1hdGgubWF4XG4gIGZvcih2YXIgaT0wLCBpbD1jZWxscy5sZW5ndGg7IGk8aWw7ICsraSkge1xuICAgIHZhciBjID0gY2VsbHNbaV1cbiAgICBmb3IodmFyIGo9MCwgamw9Yy5sZW5ndGg7IGo8amw7ICsraikge1xuICAgICAgdmMgPSBtYXgodmMsIGNbal0pXG4gICAgfVxuICB9XG4gIHJldHVybiB2YysxXG59XG5leHBvcnRzLmNvdW50VmVydGljZXMgPSBjb3VudFZlcnRpY2VzXG5cbi8vUmV0dXJucyBhIGRlZXAgY29weSBvZiBjZWxsc1xuZnVuY3Rpb24gY2xvbmVDZWxscyhjZWxscykge1xuICB2YXIgbmNlbGxzID0gbmV3IEFycmF5KGNlbGxzLmxlbmd0aClcbiAgZm9yKHZhciBpPTAsIGlsPWNlbGxzLmxlbmd0aDsgaTxpbDsgKytpKSB7XG4gICAgbmNlbGxzW2ldID0gY2VsbHNbaV0uc2xpY2UoMClcbiAgfVxuICByZXR1cm4gbmNlbGxzXG59XG5leHBvcnRzLmNsb25lQ2VsbHMgPSBjbG9uZUNlbGxzXG5cbi8vUmFua3MgYSBwYWlyIG9mIGNlbGxzIHVwIHRvIHBlcm11dGF0aW9uXG5mdW5jdGlvbiBjb21wYXJlQ2VsbHMoYSwgYikge1xuICB2YXIgbiA9IGEubGVuZ3RoXG4gICAgLCB0ID0gYS5sZW5ndGggLSBiLmxlbmd0aFxuICAgICwgbWluID0gTWF0aC5taW5cbiAgaWYodCkge1xuICAgIHJldHVybiB0XG4gIH1cbiAgc3dpdGNoKG4pIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gYVswXSAtIGJbMF07XG4gICAgY2FzZSAyOlxuICAgICAgdmFyIGQgPSBhWzBdK2FbMV0tYlswXS1iWzFdXG4gICAgICBpZihkKSB7XG4gICAgICAgIHJldHVybiBkXG4gICAgICB9XG4gICAgICByZXR1cm4gbWluKGFbMF0sYVsxXSkgLSBtaW4oYlswXSxiWzFdKVxuICAgIGNhc2UgMzpcbiAgICAgIHZhciBsMSA9IGFbMF0rYVsxXVxuICAgICAgICAsIG0xID0gYlswXStiWzFdXG4gICAgICBkID0gbDErYVsyXSAtIChtMStiWzJdKVxuICAgICAgaWYoZCkge1xuICAgICAgICByZXR1cm4gZFxuICAgICAgfVxuICAgICAgdmFyIGwwID0gbWluKGFbMF0sIGFbMV0pXG4gICAgICAgICwgbTAgPSBtaW4oYlswXSwgYlsxXSlcbiAgICAgICAgLCBkICA9IG1pbihsMCwgYVsyXSkgLSBtaW4obTAsIGJbMl0pXG4gICAgICBpZihkKSB7XG4gICAgICAgIHJldHVybiBkXG4gICAgICB9XG4gICAgICByZXR1cm4gbWluKGwwK2FbMl0sIGwxKSAtIG1pbihtMCtiWzJdLCBtMSlcbiAgICBcbiAgICAvL1RPRE86IE1heWJlIG9wdGltaXplIG49NCBhcyB3ZWxsP1xuICAgIFxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgYXMgPSBhLnNsaWNlKDApXG4gICAgICBhcy5zb3J0KClcbiAgICAgIHZhciBicyA9IGIuc2xpY2UoMClcbiAgICAgIGJzLnNvcnQoKVxuICAgICAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgICAgIHQgPSBhc1tpXSAtIGJzW2ldXG4gICAgICAgIGlmKHQpIHtcbiAgICAgICAgICByZXR1cm4gdFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gMFxuICB9XG59XG5leHBvcnRzLmNvbXBhcmVDZWxscyA9IGNvbXBhcmVDZWxsc1xuXG5mdW5jdGlvbiBjb21wYXJlWmlwcGVkKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVDZWxscyhhWzBdLCBiWzBdKVxufVxuXG4vL1B1dHMgYSBjZWxsIGNvbXBsZXggaW50byBub3JtYWwgb3JkZXIgZm9yIHRoZSBwdXJwb3NlcyBvZiBmaW5kQ2VsbCBxdWVyaWVzXG5mdW5jdGlvbiBub3JtYWxpemUoY2VsbHMsIGF0dHIpIHtcbiAgaWYoYXR0cikge1xuICAgIHZhciBsZW4gPSBjZWxscy5sZW5ndGhcbiAgICB2YXIgemlwcGVkID0gbmV3IEFycmF5KGxlbilcbiAgICBmb3IodmFyIGk9MDsgaTxsZW47ICsraSkge1xuICAgICAgemlwcGVkW2ldID0gW2NlbGxzW2ldLCBhdHRyW2ldXVxuICAgIH1cbiAgICB6aXBwZWQuc29ydChjb21wYXJlWmlwcGVkKVxuICAgIGZvcih2YXIgaT0wOyBpPGxlbjsgKytpKSB7XG4gICAgICBjZWxsc1tpXSA9IHppcHBlZFtpXVswXVxuICAgICAgYXR0cltpXSA9IHppcHBlZFtpXVsxXVxuICAgIH1cbiAgICByZXR1cm4gY2VsbHNcbiAgfSBlbHNlIHtcbiAgICBjZWxscy5zb3J0KGNvbXBhcmVDZWxscylcbiAgICByZXR1cm4gY2VsbHNcbiAgfVxufVxuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemVcblxuLy9SZW1vdmVzIGFsbCBkdXBsaWNhdGUgY2VsbHMgaW4gdGhlIGNvbXBsZXhcbmZ1bmN0aW9uIHVuaXF1ZShjZWxscykge1xuICBpZihjZWxscy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICB2YXIgcHRyID0gMVxuICAgICwgbGVuID0gY2VsbHMubGVuZ3RoXG4gIGZvcih2YXIgaT0xOyBpPGxlbjsgKytpKSB7XG4gICAgdmFyIGEgPSBjZWxsc1tpXVxuICAgIGlmKGNvbXBhcmVDZWxscyhhLCBjZWxsc1tpLTFdKSkge1xuICAgICAgaWYoaSA9PT0gcHRyKSB7XG4gICAgICAgIHB0cisrXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBjZWxsc1twdHIrK10gPSBhXG4gICAgfVxuICB9XG4gIGNlbGxzLmxlbmd0aCA9IHB0clxuICByZXR1cm4gY2VsbHNcbn1cbmV4cG9ydHMudW5pcXVlID0gdW5pcXVlO1xuXG4vL0ZpbmRzIGEgY2VsbCBpbiBhIG5vcm1hbGl6ZWQgY2VsbCBjb21wbGV4XG5mdW5jdGlvbiBmaW5kQ2VsbChjZWxscywgYykge1xuICB2YXIgbG8gPSAwXG4gICAgLCBoaSA9IGNlbGxzLmxlbmd0aC0xXG4gICAgLCByICA9IC0xXG4gIHdoaWxlIChsbyA8PSBoaSkge1xuICAgIHZhciBtaWQgPSAobG8gKyBoaSkgPj4gMVxuICAgICAgLCBzICAgPSBjb21wYXJlQ2VsbHMoY2VsbHNbbWlkXSwgYylcbiAgICBpZihzIDw9IDApIHtcbiAgICAgIGlmKHMgPT09IDApIHtcbiAgICAgICAgciA9IG1pZFxuICAgICAgfVxuICAgICAgbG8gPSBtaWQgKyAxXG4gICAgfSBlbHNlIGlmKHMgPiAwKSB7XG4gICAgICBoaSA9IG1pZCAtIDFcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJcbn1cbmV4cG9ydHMuZmluZENlbGwgPSBmaW5kQ2VsbDtcblxuLy9CdWlsZHMgYW4gaW5kZXggZm9yIGFuIG4tY2VsbC4gIFRoaXMgaXMgbW9yZSBnZW5lcmFsIHRoYW4gZHVhbCwgYnV0IGxlc3MgZWZmaWNpZW50XG5mdW5jdGlvbiBpbmNpZGVuY2UoZnJvbV9jZWxscywgdG9fY2VsbHMpIHtcbiAgdmFyIGluZGV4ID0gbmV3IEFycmF5KGZyb21fY2VsbHMubGVuZ3RoKVxuICBmb3IodmFyIGk9MCwgaWw9aW5kZXgubGVuZ3RoOyBpPGlsOyArK2kpIHtcbiAgICBpbmRleFtpXSA9IFtdXG4gIH1cbiAgdmFyIGIgPSBbXVxuICBmb3IodmFyIGk9MCwgbj10b19jZWxscy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgdmFyIGMgPSB0b19jZWxsc1tpXVxuICAgIHZhciBjbCA9IGMubGVuZ3RoXG4gICAgZm9yKHZhciBrPTEsIGtuPSgxPDxjbCk7IGs8a247ICsraykge1xuICAgICAgYi5sZW5ndGggPSBiaXRzLnBvcENvdW50KGspXG4gICAgICB2YXIgbCA9IDBcbiAgICAgIGZvcih2YXIgaj0wOyBqPGNsOyArK2opIHtcbiAgICAgICAgaWYoayAmICgxPDxqKSkge1xuICAgICAgICAgIGJbbCsrXSA9IGNbal1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGlkeD1maW5kQ2VsbChmcm9tX2NlbGxzLCBiKVxuICAgICAgaWYoaWR4IDwgMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgd2hpbGUodHJ1ZSkge1xuICAgICAgICBpbmRleFtpZHgrK10ucHVzaChpKVxuICAgICAgICBpZihpZHggPj0gZnJvbV9jZWxscy5sZW5ndGggfHwgY29tcGFyZUNlbGxzKGZyb21fY2VsbHNbaWR4XSwgYikgIT09IDApIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmRleFxufVxuZXhwb3J0cy5pbmNpZGVuY2UgPSBpbmNpZGVuY2VcblxuLy9Db21wdXRlcyB0aGUgZHVhbCBvZiB0aGUgbWVzaC4gIFRoaXMgaXMgYmFzaWNhbGx5IGFuIG9wdGltaXplZCB2ZXJzaW9uIG9mIGJ1aWxkSW5kZXggZm9yIHRoZSBzaXR1YXRpb24gd2hlcmUgZnJvbV9jZWxscyBpcyBqdXN0IHRoZSBsaXN0IG9mIHZlcnRpY2VzXG5mdW5jdGlvbiBkdWFsKGNlbGxzLCB2ZXJ0ZXhfY291bnQpIHtcbiAgaWYoIXZlcnRleF9jb3VudCkge1xuICAgIHJldHVybiBpbmNpZGVuY2UodW5pcXVlKHNrZWxldG9uKGNlbGxzLCAwKSksIGNlbGxzLCAwKVxuICB9XG4gIHZhciByZXMgPSBuZXcgQXJyYXkodmVydGV4X2NvdW50KVxuICBmb3IodmFyIGk9MDsgaTx2ZXJ0ZXhfY291bnQ7ICsraSkge1xuICAgIHJlc1tpXSA9IFtdXG4gIH1cbiAgZm9yKHZhciBpPTAsIGxlbj1jZWxscy5sZW5ndGg7IGk8bGVuOyArK2kpIHtcbiAgICB2YXIgYyA9IGNlbGxzW2ldXG4gICAgZm9yKHZhciBqPTAsIGNsPWMubGVuZ3RoOyBqPGNsOyArK2opIHtcbiAgICAgIHJlc1tjW2pdXS5wdXNoKGkpXG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cbmV4cG9ydHMuZHVhbCA9IGR1YWxcblxuLy9FbnVtZXJhdGVzIGFsbCBjZWxscyBpbiB0aGUgY29tcGxleFxuZnVuY3Rpb24gZXhwbG9kZShjZWxscykge1xuICB2YXIgcmVzdWx0ID0gW11cbiAgZm9yKHZhciBpPTAsIGlsPWNlbGxzLmxlbmd0aDsgaTxpbDsgKytpKSB7XG4gICAgdmFyIGMgPSBjZWxsc1tpXVxuICAgICAgLCBjbCA9IGMubGVuZ3RofDBcbiAgICBmb3IodmFyIGo9MSwgamw9KDE8PGNsKTsgajxqbDsgKytqKSB7XG4gICAgICB2YXIgYiA9IFtdXG4gICAgICBmb3IodmFyIGs9MDsgazxjbDsgKytrKSB7XG4gICAgICAgIGlmKChqID4+PiBrKSAmIDEpIHtcbiAgICAgICAgICBiLnB1c2goY1trXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2goYilcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZShyZXN1bHQpXG59XG5leHBvcnRzLmV4cGxvZGUgPSBleHBsb2RlXG5cbi8vRW51bWVyYXRlcyBhbGwgb2YgdGhlIG4tY2VsbHMgb2YgYSBjZWxsIGNvbXBsZXhcbmZ1bmN0aW9uIHNrZWxldG9uKGNlbGxzLCBuKSB7XG4gIGlmKG4gPCAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdXG4gICAgLCBrMCAgICAgPSAoMTw8KG4rMSkpLTFcbiAgZm9yKHZhciBpPTA7IGk8Y2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYyA9IGNlbGxzW2ldXG4gICAgZm9yKHZhciBrPWswOyBrPCgxPDxjLmxlbmd0aCk7IGs9Yml0cy5uZXh0Q29tYmluYXRpb24oaykpIHtcbiAgICAgIHZhciBiID0gbmV3IEFycmF5KG4rMSlcbiAgICAgICAgLCBsID0gMFxuICAgICAgZm9yKHZhciBqPTA7IGo8Yy5sZW5ndGg7ICsraikge1xuICAgICAgICBpZihrICYgKDE8PGopKSB7XG4gICAgICAgICAgYltsKytdID0gY1tqXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaChiKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbm9ybWFsaXplKHJlc3VsdClcbn1cbmV4cG9ydHMuc2tlbGV0b24gPSBza2VsZXRvbjtcblxuLy9Db21wdXRlcyB0aGUgYm91bmRhcnkgb2YgYWxsIGNlbGxzLCBkb2VzIG5vdCByZW1vdmUgZHVwbGljYXRlc1xuZnVuY3Rpb24gYm91bmRhcnkoY2VsbHMpIHtcbiAgdmFyIHJlcyA9IFtdXG4gIGZvcih2YXIgaT0wLGlsPWNlbGxzLmxlbmd0aDsgaTxpbDsgKytpKSB7XG4gICAgdmFyIGMgPSBjZWxsc1tpXVxuICAgIGZvcih2YXIgaj0wLGNsPWMubGVuZ3RoOyBqPGNsOyArK2opIHtcbiAgICAgIHZhciBiID0gbmV3IEFycmF5KGMubGVuZ3RoLTEpXG4gICAgICBmb3IodmFyIGs9MCwgbD0wOyBrPGNsOyArK2spIHtcbiAgICAgICAgaWYoayAhPT0gaikge1xuICAgICAgICAgIGJbbCsrXSA9IGNba11cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzLnB1c2goYilcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZShyZXMpXG59XG5leHBvcnRzLmJvdW5kYXJ5ID0gYm91bmRhcnk7XG5cbi8vQ29tcHV0ZXMgY29ubmVjdGVkIGNvbXBvbmVudHMgZm9yIGEgZGVuc2UgY2VsbCBjb21wbGV4XG5mdW5jdGlvbiBjb25uZWN0ZWRDb21wb25lbnRzX2RlbnNlKGNlbGxzLCB2ZXJ0ZXhfY291bnQpIHtcbiAgdmFyIGxhYmVscyA9IG5ldyBVbmlvbkZpbmQodmVydGV4X2NvdW50KVxuICBmb3IodmFyIGk9MDsgaTxjZWxscy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjID0gY2VsbHNbaV1cbiAgICBmb3IodmFyIGo9MDsgajxjLmxlbmd0aDsgKytqKSB7XG4gICAgICBmb3IodmFyIGs9aisxOyBrPGMubGVuZ3RoOyArK2spIHtcbiAgICAgICAgbGFiZWxzLmxpbmsoY1tqXSwgY1trXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFyIGNvbXBvbmVudHMgPSBbXVxuICAgICwgY29tcG9uZW50X2xhYmVscyA9IGxhYmVscy5yYW5rc1xuICBmb3IodmFyIGk9MDsgaTxjb21wb25lbnRfbGFiZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgY29tcG9uZW50X2xhYmVsc1tpXSA9IC0xXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8Y2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgbCA9IGxhYmVscy5maW5kKGNlbGxzW2ldWzBdKVxuICAgIGlmKGNvbXBvbmVudF9sYWJlbHNbbF0gPCAwKSB7XG4gICAgICBjb21wb25lbnRfbGFiZWxzW2xdID0gY29tcG9uZW50cy5sZW5ndGhcbiAgICAgIGNvbXBvbmVudHMucHVzaChbY2VsbHNbaV0uc2xpY2UoMCldKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wb25lbnRzW2NvbXBvbmVudF9sYWJlbHNbbF1dLnB1c2goY2VsbHNbaV0uc2xpY2UoMCkpXG4gICAgfVxuICB9XG4gIHJldHVybiBjb21wb25lbnRzXG59XG5cbi8vQ29tcHV0ZXMgY29ubmVjdGVkIGNvbXBvbmVudHMgZm9yIGEgc3BhcnNlIGdyYXBoXG5mdW5jdGlvbiBjb25uZWN0ZWRDb21wb25lbnRzX3NwYXJzZShjZWxscykge1xuICB2YXIgdmVydGljZXMgID0gdW5pcXVlKG5vcm1hbGl6ZShza2VsZXRvbihjZWxscywgMCkpKVxuICAgICwgbGFiZWxzICAgID0gbmV3IFVuaW9uRmluZCh2ZXJ0aWNlcy5sZW5ndGgpXG4gIGZvcih2YXIgaT0wOyBpPGNlbGxzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGMgPSBjZWxsc1tpXVxuICAgIGZvcih2YXIgaj0wOyBqPGMubGVuZ3RoOyArK2opIHtcbiAgICAgIHZhciB2aiA9IGZpbmRDZWxsKHZlcnRpY2VzLCBbY1tqXV0pXG4gICAgICBmb3IodmFyIGs9aisxOyBrPGMubGVuZ3RoOyArK2spIHtcbiAgICAgICAgbGFiZWxzLmxpbmsodmosIGZpbmRDZWxsKHZlcnRpY2VzLCBbY1trXV0pKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YXIgY29tcG9uZW50cyAgICAgICAgPSBbXVxuICAgICwgY29tcG9uZW50X2xhYmVscyAgPSBsYWJlbHMucmFua3NcbiAgZm9yKHZhciBpPTA7IGk8Y29tcG9uZW50X2xhYmVscy5sZW5ndGg7ICsraSkge1xuICAgIGNvbXBvbmVudF9sYWJlbHNbaV0gPSAtMVxuICB9XG4gIGZvcih2YXIgaT0wOyBpPGNlbGxzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGwgPSBsYWJlbHMuZmluZChmaW5kQ2VsbCh2ZXJ0aWNlcywgW2NlbGxzW2ldWzBdXSkpO1xuICAgIGlmKGNvbXBvbmVudF9sYWJlbHNbbF0gPCAwKSB7XG4gICAgICBjb21wb25lbnRfbGFiZWxzW2xdID0gY29tcG9uZW50cy5sZW5ndGhcbiAgICAgIGNvbXBvbmVudHMucHVzaChbY2VsbHNbaV0uc2xpY2UoMCldKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wb25lbnRzW2NvbXBvbmVudF9sYWJlbHNbbF1dLnB1c2goY2VsbHNbaV0uc2xpY2UoMCkpXG4gICAgfVxuICB9XG4gIHJldHVybiBjb21wb25lbnRzXG59XG5cbi8vQ29tcHV0ZXMgY29ubmVjdGVkIGNvbXBvbmVudHMgZm9yIGEgY2VsbCBjb21wbGV4XG5mdW5jdGlvbiBjb25uZWN0ZWRDb21wb25lbnRzKGNlbGxzLCB2ZXJ0ZXhfY291bnQpIHtcbiAgaWYodmVydGV4X2NvdW50KSB7XG4gICAgcmV0dXJuIGNvbm5lY3RlZENvbXBvbmVudHNfZGVuc2UoY2VsbHMsIHZlcnRleF9jb3VudClcbiAgfVxuICByZXR1cm4gY29ubmVjdGVkQ29tcG9uZW50c19zcGFyc2UoY2VsbHMpXG59XG5leHBvcnRzLmNvbm5lY3RlZENvbXBvbmVudHMgPSBjb25uZWN0ZWRDb21wb25lbnRzXG4iXSwic291cmNlUm9vdCI6IiJ9