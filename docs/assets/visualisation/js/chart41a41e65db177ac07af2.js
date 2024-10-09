(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_gl-cone3d_cone_js"],{

/***/ "./node_modules/gl-cone3d/cone.js":
/*!****************************************!*\
  !*** ./node_modules/gl-cone3d/cone.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var vec3 = __webpack_require__(/*! gl-vec3 */ "./node_modules/gl-vec3/index.js");

module.exports = function(vectorfield, bounds) {
	var positions = vectorfield.positions;
	var vectors = vectorfield.vectors;
	var geo = {
		positions: [],
		vertexIntensity: [],
		vertexIntensityBounds: vectorfield.vertexIntensityBounds,
		vectors: [],
		cells: [],
		coneOffset: vectorfield.coneOffset,
		colormap: vectorfield.colormap
	};

	if (vectorfield.positions.length === 0) {
		if (bounds) {
			bounds[0] = [0,0,0];
			bounds[1] = [0,0,0];
		}
		return geo;
	}

	// Compute bounding box for the dataset.
	// Compute maximum velocity for the dataset to use for scaling the cones.
	var maxNorm = 0;
	var minX = Infinity, maxX = -Infinity;
	var minY = Infinity, maxY = -Infinity;
	var minZ = Infinity, maxZ = -Infinity;
	var p2 = null;
	var u2 = null;
	var positionVectors = [];
	var vectorScale = Infinity;
	var skipIt = false;
	for (var i = 0; i < positions.length; i++) {
		var p = positions[i];
		minX = Math.min(p[0], minX);
		maxX = Math.max(p[0], maxX);
		minY = Math.min(p[1], minY);
		maxY = Math.max(p[1], maxY);
		minZ = Math.min(p[2], minZ);
		maxZ = Math.max(p[2], maxZ);
		var u = vectors[i];

		if (vec3.length(u) > maxNorm) {
			maxNorm = vec3.length(u);
		}
		if (i) {
			// Find vector scale [w/ units of time] using "successive" positions
			// (not "adjacent" with would be O(n^2)),
			//
			// The vector scale corresponds to the minimum "time" to travel across two
			// two adjacent positions at the average velocity of those two adjacent positions

			var q = (2 * vec3.distance(p2, p) / (vec3.length(u2) + vec3.length(u)));
			if(q) {
				vectorScale = Math.min(vectorScale, q);
				skipIt = false;
			} else {
				skipIt = true;
			}
		}
		if(!skipIt) {
			p2 = p;
			u2 = u;
		}
		positionVectors.push(u);
	}
	var minV = [minX, minY, minZ];
	var maxV = [maxX, maxY, maxZ];
	if (bounds) {
		bounds[0] = minV;
		bounds[1] = maxV;
	}
	if (maxNorm === 0) {
		maxNorm = 1;
	}

	// Inverted max norm would map vector with norm maxNorm to 1 coord space units in length
	var invertedMaxNorm = 1 / maxNorm;

	if (!isFinite(vectorScale)) {
		vectorScale = 1.0;
	}
	geo.vectorScale = vectorScale;

	var coneScale = vectorfield.coneSize || 0.5;

	if (vectorfield.absoluteConeSize) {
		coneScale = vectorfield.absoluteConeSize * invertedMaxNorm;
	}

	geo.coneScale = coneScale;

	// Build the cone model.
	for (var i = 0, j = 0; i < positions.length; i++) {
		var p = positions[i];
		var x = p[0], y = p[1], z = p[2];
		var d = positionVectors[i];
		var intensity = vec3.length(d) * invertedMaxNorm;
		for (var k = 0, l = 8; k < l; k++) {
			geo.positions.push([x, y, z, j++]);
			geo.positions.push([x, y, z, j++]);
			geo.positions.push([x, y, z, j++]);
			geo.positions.push([x, y, z, j++]);
			geo.positions.push([x, y, z, j++]);
			geo.positions.push([x, y, z, j++]);

			geo.vectors.push(d);
			geo.vectors.push(d);
			geo.vectors.push(d);
			geo.vectors.push(d);
			geo.vectors.push(d);
			geo.vectors.push(d);

			geo.vertexIntensity.push(intensity, intensity, intensity);
			geo.vertexIntensity.push(intensity, intensity, intensity);

			var m = geo.positions.length;
			geo.cells.push([m-6, m-5, m-4], [m-3, m-2, m-1]);
		}
	}

	return geo;
};

var shaders = __webpack_require__(/*! ./lib/shaders */ "./node_modules/gl-cone3d/lib/shaders.js");
module.exports.createMesh = __webpack_require__(/*! ./create_mesh */ "./node_modules/gl-cone3d/create_mesh.js");
module.exports.createConeMesh = function(gl, params) {
	return module.exports.createMesh(gl, params, {
		shaders: shaders,
		traceType: 'cone'
	});
}


/***/ }),

/***/ "./node_modules/gl-cone3d/create_mesh.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-cone3d/create_mesh.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createShader  = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var createBuffer  = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO     = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var createTexture = __webpack_require__(/*! gl-texture2d */ "./node_modules/gl-texture2d/texture.js")
var multiply      = __webpack_require__(/*! gl-mat4/multiply */ "./node_modules/gl-mat4/multiply.js")
var invert        = __webpack_require__(/*! gl-mat4/invert */ "./node_modules/gl-mat4/invert.js")
var ndarray       = __webpack_require__(/*! ndarray */ "./node_modules/ndarray/ndarray.js")
var colormap      = __webpack_require__(/*! colormap */ "./node_modules/colormap/index.js")

var IDENTITY = [
  1,0,0,0,
  0,1,0,0,
  0,0,1,0,
  0,0,0,1]

function VectorMesh(gl
  , texture
  , triShader
  , pickShader
  , trianglePositions
  , triangleVectors
  , triangleIds
  , triangleColors
  , triangleUVs
  , triangleVAO
  , traceType) {

  this.gl                = gl
  this.pixelRatio         = 1
  this.cells             = []
  this.positions         = []
  this.intensity         = []
  this.texture           = texture
  this.dirty             = true

  this.triShader         = triShader
  this.pickShader        = pickShader

  this.trianglePositions = trianglePositions
  this.triangleVectors   = triangleVectors
  this.triangleColors    = triangleColors
  this.triangleUVs       = triangleUVs
  this.triangleIds       = triangleIds
  this.triangleVAO       = triangleVAO
  this.triangleCount     = 0

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

  this.opacity       = 1

  this.traceType     = traceType
  this.tubeScale     = 1 // used in streamtube
  this.coneScale     = 2 // used in cone
  this.vectorScale   = 1 // used in cone
  this.coneOffset    = 0.25 // used in cone

  this._model       = IDENTITY
  this._view        = IDENTITY
  this._projection  = IDENTITY
  this._resolution  = [1,1]
}

var proto = VectorMesh.prototype

proto.isOpaque = function() {
  return this.opacity >= 1
}

proto.isTransparent = function() {
  return this.opacity < 1
}

proto.pickSlots = 1

proto.setPickBase = function(id) {
  this.pickId = id
}

function genColormap(param) {
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
    result[4*i+3] = c[3]*255
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

proto.update = function(params) {
  params = params || {}
  var gl = this.gl

  this.dirty = true

  if('lightPosition' in params) {
    this.lightPosition = params.lightPosition
  }
  if('opacity' in params) {
    this.opacity = params.opacity
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

  // use in streamtube
  if (params.tubeScale !== undefined) {
    this.tubeScale = params.tubeScale
  }

  // used in cone
  if (params.vectorScale !== undefined) {
    this.vectorScale = params.vectorScale
  }
  if (params.coneScale !== undefined) {
    this.coneScale = params.coneScale
  }
  if (params.coneOffset !== undefined) {
    this.coneOffset = params.coneOffset
  }

  if (params.colormap) {
    this.texture.shape = [256,256]
    this.texture.minFilter = gl.LINEAR_MIPMAP_LINEAR
    this.texture.magFilter = gl.LINEAR
    this.texture.setPixels(genColormap(params.colormap))
    this.texture.generateMipmap()
  }

  var cells = params.cells
  var positions = params.positions
  var vectors = params.vectors

  if(!positions || !cells || !vectors) {
    return
  }

  var tPos = []
  var tVec = []
  var tCol = []
  var tUVs = []
  var tIds = []

  //Save geometry data for picking calculations
  this.cells     = cells
  this.positions = positions
  this.vectors   = vectors

  //Compute colors
  var meshColor       = params.meshColor || [1,1,1,1]

  //UVs
  var vertexIntensity = params.vertexIntensity

  var intensityLo     = Infinity
  var intensityHi     = -Infinity

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
  } else {
    for(var i=0; i<positions.length; ++i) {
      var f = positions[i][2]
      intensityLo = Math.min(intensityLo, f)
      intensityHi = Math.max(intensityHi, f)
    }
  }

  if(vertexIntensity) {
    this.intensity = vertexIntensity
  } else {
    this.intensity = takeZComponent(positions)
  }

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

fill_loop:
  for(var i=0; i<cells.length; ++i) {
    var cell = cells[i]
    switch(cell.length) {
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
          tPos.push(p[0], p[1], p[2], p[3])

          var w = vectors[v]
          tVec.push(w[0], w[1], w[2], w[3] || 0)

          var c = meshColor
          if(c.length === 3) {
            tCol.push(c[0], c[1], c[2], 1)
          } else {
            tCol.push(c[0], c[1], c[2], c[3])
          }

          var uv
          if(vertexIntensity) {
            uv = [
              (vertexIntensity[v] - intensityLo) /
              (intensityHi - intensityLo), 0]
          } else {
            uv = [
              (p[2] - intensityLo) /
              (intensityHi - intensityLo), 0]
          }
          tUVs.push(uv[0], uv[1])

          tIds.push(i)
        }
        triangleCount += 1
      break

      default:
      break
    }
  }

  this.triangleCount  = triangleCount

  this.trianglePositions.update(tPos)
  this.triangleVectors.update(tVec)
  this.triangleColors.update(tCol)
  this.triangleUVs.update(tUVs)
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

    opacity:  this.opacity,

    tubeScale: this.tubeScale,

    vectorScale: this.vectorScale,
    coneScale: this.coneScale,
    coneOffset: this.coneOffset,

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

    tubeScale: this.tubeScale,
    vectorScale: this.vectorScale,
    coneScale: this.coneScale,
    coneOffset: this.coneOffset,

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
  var pos =     this.positions[cell[1]].slice(0, 3)

  var result = {
    position: pos,
    dataCoordinate: pos,
    index: Math.floor(cell[1] / 48)
  }


  if(this.traceType === 'cone') {
    result.index = Math.floor(cell[1] / 48)
  } else if(this.traceType === 'streamtube') {
    result.intensity = this.intensity[cell[1]]
    result.velocity = this.vectors[cell[1]].slice(0, 3)
    result.divergence = this.vectors[cell[1]][3]
    result.index = cellId
  }

  return result
}


proto.dispose = function() {
  this.texture.dispose()

  this.triShader.dispose()
  this.pickShader.dispose()

  this.triangleVAO.dispose()
  this.trianglePositions.dispose()
  this.triangleVectors.dispose()
  this.triangleColors.dispose()
  this.triangleUVs.dispose()
  this.triangleIds.dispose()
}

function createMeshShader(gl, shaders) {
  var shader = createShader(gl,
    shaders.meshShader.vertex,
    shaders.meshShader.fragment,
    null,
    shaders.meshShader.attributes
  )

  shader.attributes.position.location = 0
  shader.attributes.color.location    = 2
  shader.attributes.uv.location       = 3
  shader.attributes.vector.location   = 4
  return shader
}


function createPickShader(gl, shaders) {
  var shader = createShader(gl,
    shaders.pickShader.vertex,
    shaders.pickShader.fragment,
    null,
    shaders.pickShader.attributes
  )

  shader.attributes.position.location = 0
  shader.attributes.id.location       = 1
  shader.attributes.vector.location   = 4
  return shader
}


function createVectorMesh(gl, params, opts) {
  var shaders = opts.shaders

  if (arguments.length === 1) {
    params = gl
    gl = params.gl
  }


  var triShader       = createMeshShader(gl, shaders)
  var pickShader      = createPickShader(gl, shaders)
  var meshTexture       = createTexture(gl,
    ndarray(new Uint8Array([255,255,255,255]), [1,1,4]))
  meshTexture.generateMipmap()
  meshTexture.minFilter = gl.LINEAR_MIPMAP_LINEAR
  meshTexture.magFilter = gl.LINEAR

  var trianglePositions = createBuffer(gl)
  var triangleVectors   = createBuffer(gl)
  var triangleColors    = createBuffer(gl)
  var triangleUVs       = createBuffer(gl)
  var triangleIds       = createBuffer(gl)
  var triangleVAO       = createVAO(gl, [
    { buffer: trianglePositions,
      type: gl.FLOAT,
      size: 4
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
    { buffer: triangleVectors,
      type: gl.FLOAT,
      size: 4
    }
  ])

  var mesh = new VectorMesh(gl
    , meshTexture
    , triShader
    , pickShader
    , trianglePositions
    , triangleVectors
    , triangleIds
    , triangleColors
    , triangleUVs
    , triangleVAO
    , opts.traceType || 'cone'
  )

  mesh.update(params)

  return mesh
}

module.exports = createVectorMesh


/***/ }),

/***/ "./node_modules/gl-cone3d/lib/shaders.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-cone3d/lib/shaders.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var glslify       = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")

var triVertSrc = glslify('./triangle-vertex.glsl')
var triFragSrc = glslify('./triangle-fragment.glsl')
var pickVertSrc = glslify('./pick-vertex.glsl')
var pickFragSrc = glslify('./pick-fragment.glsl')

exports.meshShader = {
  vertex:   triVertSrc,
  fragment: triFragSrc,
  attributes: [
    {name: 'position', type: 'vec4'},
    {name: 'color', type: 'vec4'},
    {name: 'uv', type: 'vec2'},
    {name: 'vector', type: 'vec3'}
  ]
}
exports.pickShader = {
  vertex:   pickVertSrc,
  fragment: pickFragSrc,
  attributes: [
    {name: 'position', type: 'vec4'},
    {name: 'id', type: 'vec4'},
    {name: 'vector', type: 'vec3'}
  ]
}


/***/ }),

/***/ "./node_modules/gl-vec3/add.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec3/add.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = add;

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0]
    out[1] = a[1] + b[1]
    out[2] = a[2] + b[2]
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/angle.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec3/angle.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = angle

var fromValues = __webpack_require__(/*! ./fromValues */ "./node_modules/gl-vec3/fromValues.js")
var normalize = __webpack_require__(/*! ./normalize */ "./node_modules/gl-vec3/normalize.js")
var dot = __webpack_require__(/*! ./dot */ "./node_modules/gl-vec3/dot.js")

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
    var tempA = fromValues(a[0], a[1], a[2])
    var tempB = fromValues(b[0], b[1], b[2])
 
    normalize(tempA, tempA)
    normalize(tempB, tempB)
 
    var cosine = dot(tempA, tempB)

    if(cosine > 1.0){
        return 0
    } else {
        return Math.acos(cosine)
    }     
}


/***/ }),

/***/ "./node_modules/gl-vec3/ceil.js":
/*!**************************************!*\
  !*** ./node_modules/gl-vec3/ceil.js ***!
  \**************************************/
/***/ ((module) => {

module.exports = ceil

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0])
  out[1] = Math.ceil(a[1])
  out[2] = Math.ceil(a[2])
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec3/clone.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec3/clone.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = clone;

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
    var out = new Float32Array(3)
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/copy.js":
/*!**************************************!*\
  !*** ./node_modules/gl-vec3/copy.js ***!
  \**************************************/
/***/ ((module) => {

module.exports = copy;

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/create.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec3/create.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = create;

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
    var out = new Float32Array(3)
    out[0] = 0
    out[1] = 0
    out[2] = 0
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/dist.js":
/*!**************************************!*\
  !*** ./node_modules/gl-vec3/dist.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./distance */ "./node_modules/gl-vec3/distance.js")


/***/ }),

/***/ "./node_modules/gl-vec3/distance.js":
/*!******************************************!*\
  !*** ./node_modules/gl-vec3/distance.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = distance;

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2]
    return Math.sqrt(x*x + y*y + z*z)
}

/***/ }),

/***/ "./node_modules/gl-vec3/div.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec3/div.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./divide */ "./node_modules/gl-vec3/divide.js")


/***/ }),

/***/ "./node_modules/gl-vec3/divide.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec3/divide.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = divide;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
    out[0] = a[0] / b[0]
    out[1] = a[1] / b[1]
    out[2] = a[2] / b[2]
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/epsilon.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-vec3/epsilon.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = 0.000001


/***/ }),

/***/ "./node_modules/gl-vec3/equals.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec3/equals.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = equals

var EPSILON = __webpack_require__(/*! ./epsilon */ "./node_modules/gl-vec3/epsilon.js")

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0]
  var a1 = a[1]
  var a2 = a[2]
  var b0 = b[0]
  var b1 = b[1]
  var b2 = b[2]
  return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)))
}


/***/ }),

/***/ "./node_modules/gl-vec3/exactEquals.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-vec3/exactEquals.js ***!
  \*********************************************/
/***/ ((module) => {

module.exports = exactEquals

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
}


/***/ }),

/***/ "./node_modules/gl-vec3/floor.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec3/floor.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = floor

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0])
  out[1] = Math.floor(a[1])
  out[2] = Math.floor(a[2])
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec3/forEach.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-vec3/forEach.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = forEach;

var vec = __webpack_require__(/*! ./create */ "./node_modules/gl-vec3/create.js")()

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
function forEach(a, stride, offset, count, fn, arg) {
        var i, l
        if(!stride) {
            stride = 3
        }

        if(!offset) {
            offset = 0
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length)
        } else {
            l = a.length
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i] 
            vec[1] = a[i+1] 
            vec[2] = a[i+2]
            fn(vec, vec, arg)
            a[i] = vec[0] 
            a[i+1] = vec[1] 
            a[i+2] = vec[2]
        }
        
        return a
}

/***/ }),

/***/ "./node_modules/gl-vec3/fromValues.js":
/*!********************************************!*\
  !*** ./node_modules/gl-vec3/fromValues.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = fromValues;

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
    var out = new Float32Array(3)
    out[0] = x
    out[1] = y
    out[2] = z
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/index.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec3/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  EPSILON: __webpack_require__(/*! ./epsilon */ "./node_modules/gl-vec3/epsilon.js")
  , create: __webpack_require__(/*! ./create */ "./node_modules/gl-vec3/create.js")
  , clone: __webpack_require__(/*! ./clone */ "./node_modules/gl-vec3/clone.js")
  , angle: __webpack_require__(/*! ./angle */ "./node_modules/gl-vec3/angle.js")
  , fromValues: __webpack_require__(/*! ./fromValues */ "./node_modules/gl-vec3/fromValues.js")
  , copy: __webpack_require__(/*! ./copy */ "./node_modules/gl-vec3/copy.js")
  , set: __webpack_require__(/*! ./set */ "./node_modules/gl-vec3/set.js")
  , equals: __webpack_require__(/*! ./equals */ "./node_modules/gl-vec3/equals.js")
  , exactEquals: __webpack_require__(/*! ./exactEquals */ "./node_modules/gl-vec3/exactEquals.js")
  , add: __webpack_require__(/*! ./add */ "./node_modules/gl-vec3/add.js")
  , subtract: __webpack_require__(/*! ./subtract */ "./node_modules/gl-vec3/subtract.js")
  , sub: __webpack_require__(/*! ./sub */ "./node_modules/gl-vec3/sub.js")
  , multiply: __webpack_require__(/*! ./multiply */ "./node_modules/gl-vec3/multiply.js")
  , mul: __webpack_require__(/*! ./mul */ "./node_modules/gl-vec3/mul.js")
  , divide: __webpack_require__(/*! ./divide */ "./node_modules/gl-vec3/divide.js")
  , div: __webpack_require__(/*! ./div */ "./node_modules/gl-vec3/div.js")
  , min: __webpack_require__(/*! ./min */ "./node_modules/gl-vec3/min.js")
  , max: __webpack_require__(/*! ./max */ "./node_modules/gl-vec3/max.js")
  , floor: __webpack_require__(/*! ./floor */ "./node_modules/gl-vec3/floor.js")
  , ceil: __webpack_require__(/*! ./ceil */ "./node_modules/gl-vec3/ceil.js")
  , round: __webpack_require__(/*! ./round */ "./node_modules/gl-vec3/round.js")
  , scale: __webpack_require__(/*! ./scale */ "./node_modules/gl-vec3/scale.js")
  , scaleAndAdd: __webpack_require__(/*! ./scaleAndAdd */ "./node_modules/gl-vec3/scaleAndAdd.js")
  , distance: __webpack_require__(/*! ./distance */ "./node_modules/gl-vec3/distance.js")
  , dist: __webpack_require__(/*! ./dist */ "./node_modules/gl-vec3/dist.js")
  , squaredDistance: __webpack_require__(/*! ./squaredDistance */ "./node_modules/gl-vec3/squaredDistance.js")
  , sqrDist: __webpack_require__(/*! ./sqrDist */ "./node_modules/gl-vec3/sqrDist.js")
  , length: __webpack_require__(/*! ./length */ "./node_modules/gl-vec3/length.js")
  , len: __webpack_require__(/*! ./len */ "./node_modules/gl-vec3/len.js")
  , squaredLength: __webpack_require__(/*! ./squaredLength */ "./node_modules/gl-vec3/squaredLength.js")
  , sqrLen: __webpack_require__(/*! ./sqrLen */ "./node_modules/gl-vec3/sqrLen.js")
  , negate: __webpack_require__(/*! ./negate */ "./node_modules/gl-vec3/negate.js")
  , inverse: __webpack_require__(/*! ./inverse */ "./node_modules/gl-vec3/inverse.js")
  , normalize: __webpack_require__(/*! ./normalize */ "./node_modules/gl-vec3/normalize.js")
  , dot: __webpack_require__(/*! ./dot */ "./node_modules/gl-vec3/dot.js")
  , cross: __webpack_require__(/*! ./cross */ "./node_modules/gl-vec3/cross.js")
  , lerp: __webpack_require__(/*! ./lerp */ "./node_modules/gl-vec3/lerp.js")
  , random: __webpack_require__(/*! ./random */ "./node_modules/gl-vec3/random.js")
  , transformMat4: __webpack_require__(/*! ./transformMat4 */ "./node_modules/gl-vec3/transformMat4.js")
  , transformMat3: __webpack_require__(/*! ./transformMat3 */ "./node_modules/gl-vec3/transformMat3.js")
  , transformQuat: __webpack_require__(/*! ./transformQuat */ "./node_modules/gl-vec3/transformQuat.js")
  , rotateX: __webpack_require__(/*! ./rotateX */ "./node_modules/gl-vec3/rotateX.js")
  , rotateY: __webpack_require__(/*! ./rotateY */ "./node_modules/gl-vec3/rotateY.js")
  , rotateZ: __webpack_require__(/*! ./rotateZ */ "./node_modules/gl-vec3/rotateZ.js")
  , forEach: __webpack_require__(/*! ./forEach */ "./node_modules/gl-vec3/forEach.js")
}


/***/ }),

/***/ "./node_modules/gl-vec3/inverse.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-vec3/inverse.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = inverse;

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0]
  out[1] = 1.0 / a[1]
  out[2] = 1.0 / a[2]
  return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/len.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec3/len.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./length */ "./node_modules/gl-vec3/length.js")


/***/ }),

/***/ "./node_modules/gl-vec3/max.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec3/max.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = max;

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
    out[0] = Math.max(a[0], b[0])
    out[1] = Math.max(a[1], b[1])
    out[2] = Math.max(a[2], b[2])
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/min.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec3/min.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = min;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
    out[0] = Math.min(a[0], b[0])
    out[1] = Math.min(a[1], b[1])
    out[2] = Math.min(a[2], b[2])
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/mul.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec3/mul.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./multiply */ "./node_modules/gl-vec3/multiply.js")


/***/ }),

/***/ "./node_modules/gl-vec3/multiply.js":
/*!******************************************!*\
  !*** ./node_modules/gl-vec3/multiply.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = multiply;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
    out[0] = a[0] * b[0]
    out[1] = a[1] * b[1]
    out[2] = a[2] * b[2]
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/negate.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec3/negate.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = negate;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
    out[0] = -a[0]
    out[1] = -a[1]
    out[2] = -a[2]
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/random.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec3/random.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = random;

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
    scale = scale || 1.0

    var r = Math.random() * 2.0 * Math.PI
    var z = (Math.random() * 2.0) - 1.0
    var zScale = Math.sqrt(1.0-z*z) * scale

    out[0] = Math.cos(r) * zScale
    out[1] = Math.sin(r) * zScale
    out[2] = z * scale
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/rotateX.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-vec3/rotateX.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = rotateX;

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c){
    var by = b[1]
    var bz = b[2]

    // Translate point to the origin
    var py = a[1] - by
    var pz = a[2] - bz

    var sc = Math.sin(c)
    var cc = Math.cos(c)

    // perform rotation and translate to correct position
    out[0] = a[0]
    out[1] = by + py * cc - pz * sc
    out[2] = bz + py * sc + pz * cc

    return out
}


/***/ }),

/***/ "./node_modules/gl-vec3/rotateY.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-vec3/rotateY.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = rotateY;

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c){
    var bx = b[0]
    var bz = b[2]

    // translate point to the origin
    var px = a[0] - bx
    var pz = a[2] - bz
    
    var sc = Math.sin(c)
    var cc = Math.cos(c)
  
    // perform rotation and translate to correct position
    out[0] = bx + pz * sc + px * cc
    out[1] = a[1]
    out[2] = bz + pz * cc - px * sc
  
    return out
}


/***/ }),

/***/ "./node_modules/gl-vec3/rotateZ.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-vec3/rotateZ.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = rotateZ;

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c){
    var bx = b[0]
    var by = b[1]

    //Translate point to the origin
    var px = a[0] - bx
    var py = a[1] - by
  
    var sc = Math.sin(c)
    var cc = Math.cos(c)

    // perform rotation and translate to correct position
    out[0] = bx + px * cc - py * sc
    out[1] = by + px * sc + py * cc
    out[2] = a[2]
  
    return out
}


/***/ }),

/***/ "./node_modules/gl-vec3/round.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec3/round.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = round

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
function round(out, a) {
  out[0] = Math.round(a[0])
  out[1] = Math.round(a[1])
  out[2] = Math.round(a[2])
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec3/scale.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec3/scale.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = scale;

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b
    out[1] = a[1] * b
    out[2] = a[2] * b
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/scaleAndAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-vec3/scaleAndAdd.js ***!
  \*********************************************/
/***/ ((module) => {

module.exports = scaleAndAdd;

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale)
    out[1] = a[1] + (b[1] * scale)
    out[2] = a[2] + (b[2] * scale)
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/set.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec3/set.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = set;

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
    out[0] = x
    out[1] = y
    out[2] = z
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/sqrDist.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-vec3/sqrDist.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./squaredDistance */ "./node_modules/gl-vec3/squaredDistance.js")


/***/ }),

/***/ "./node_modules/gl-vec3/sqrLen.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec3/sqrLen.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./squaredLength */ "./node_modules/gl-vec3/squaredLength.js")


/***/ }),

/***/ "./node_modules/gl-vec3/squaredDistance.js":
/*!*************************************************!*\
  !*** ./node_modules/gl-vec3/squaredDistance.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = squaredDistance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2]
    return x*x + y*y + z*z
}

/***/ }),

/***/ "./node_modules/gl-vec3/squaredLength.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-vec3/squaredLength.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = squaredLength;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return x*x + y*y + z*z
}

/***/ }),

/***/ "./node_modules/gl-vec3/sub.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec3/sub.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./subtract */ "./node_modules/gl-vec3/subtract.js")


/***/ }),

/***/ "./node_modules/gl-vec3/subtract.js":
/*!******************************************!*\
  !*** ./node_modules/gl-vec3/subtract.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0]
    out[1] = a[1] - b[1]
    out[2] = a[2] - b[2]
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/transformMat3.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-vec3/transformMat3.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = transformMat3;

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
    var x = a[0], y = a[1], z = a[2]
    out[0] = x * m[0] + y * m[3] + z * m[6]
    out[1] = x * m[1] + y * m[4] + z * m[7]
    out[2] = x * m[2] + y * m[5] + z * m[8]
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/transformMat4.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-vec3/transformMat4.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = transformMat4;

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15]
    w = w || 1.0
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/transformQuat.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-vec3/transformQuat.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = transformQuat;

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx
    return out
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLWNvbmUzZC9jb25lLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtY29uZTNkL2NyZWF0ZV9tZXNoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtY29uZTNkL2xpYi9zaGFkZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9hZGQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL2FuZ2xlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9jZWlsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9jbG9uZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvY29weS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvY3JlYXRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9kaXN0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9kaXN0YW5jZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvZGl2LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9kaXZpZGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL2Vwc2lsb24uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL2VxdWFscy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvZXhhY3RFcXVhbHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL2Zsb29yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9mb3JFYWNoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9mcm9tVmFsdWVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvaW52ZXJzZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvbGVuLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9tYXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL21pbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvbXVsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9tdWx0aXBseS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvbmVnYXRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9yYW5kb20uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3JvdGF0ZVguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3JvdGF0ZVkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3JvdGF0ZVouanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3JvdW5kLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9zY2FsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvc2NhbGVBbmRBZGQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3NldC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvc3FyRGlzdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvc3FyTGVuLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9zcXVhcmVkRGlzdGFuY2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3NxdWFyZWRMZW5ndGguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3N1Yi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvc3VidHJhY3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3RyYW5zZm9ybU1hdDMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3RyYW5zZm9ybU1hdDQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL3RyYW5zZm9ybVF1YXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLGdEQUFTOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzQkFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyw4REFBZTtBQUNyQywrR0FBb0Q7QUFDcEQsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDdklZOztBQUVaLG9CQUFvQixtQkFBTyxDQUFDLG9EQUFXO0FBQ3ZDLG9CQUFvQixtQkFBTyxDQUFDLHFEQUFXO0FBQ3ZDLG9CQUFvQixtQkFBTyxDQUFDLDRDQUFRO0FBQ3BDLG9CQUFvQixtQkFBTyxDQUFDLDREQUFjO0FBQzFDLG9CQUFvQixtQkFBTyxDQUFDLDREQUFrQjtBQUM5QyxvQkFBb0IsbUJBQU8sQ0FBQyx3REFBZ0I7QUFDNUMsb0JBQW9CLG1CQUFPLENBQUMsa0RBQVM7QUFDckMsb0JBQW9CLG1CQUFPLENBQUMsa0RBQVU7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxrQkFBa0IsMEJBQTBCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxvQkFBb0I7QUFDbEM7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsS0FBSztBQUN6QjtBQUNBO0FBQ0Esc0JBQXNCLEtBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsS0FBSztBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLEtBQUs7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsS0FBSztBQUNuQjtBQUNBOztBQUVBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQSxjQUFjLEtBQUs7QUFDbkI7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQzVqQkEsb0JBQW9CLG1CQUFPLENBQUMsa0RBQVM7O0FB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Q0FwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsS0FBSztBQUNoQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7OztBQ2ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7O0FDZkEsNEZBQXNDOzs7Ozs7Ozs7OztBQ0F0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsS0FBSztBQUNoQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7OztBQ2ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7QUNkQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7OztBQ3BCQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzNCQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzNCQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzNCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNkQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsT0FBTztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7OztBQ2ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsT0FBTztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7OztBQ2hCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7QUNoQkEsMEdBQTZDOzs7Ozs7Ozs7OztBQ0E3QyxzR0FBMkM7Ozs7Ozs7Ozs7O0FDQTNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7QUNkQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7QUNiQSw0RkFBc0M7Ozs7Ozs7Ozs7O0FDQXRDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7O0FDZkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7OztBQ2hCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImNoYXJ0NDFhNDFlNjVkYjE3N2FjMDdhZjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIHZlYzMgPSByZXF1aXJlKCdnbC12ZWMzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmVjdG9yZmllbGQsIGJvdW5kcykge1xuXHR2YXIgcG9zaXRpb25zID0gdmVjdG9yZmllbGQucG9zaXRpb25zO1xuXHR2YXIgdmVjdG9ycyA9IHZlY3RvcmZpZWxkLnZlY3RvcnM7XG5cdHZhciBnZW8gPSB7XG5cdFx0cG9zaXRpb25zOiBbXSxcblx0XHR2ZXJ0ZXhJbnRlbnNpdHk6IFtdLFxuXHRcdHZlcnRleEludGVuc2l0eUJvdW5kczogdmVjdG9yZmllbGQudmVydGV4SW50ZW5zaXR5Qm91bmRzLFxuXHRcdHZlY3RvcnM6IFtdLFxuXHRcdGNlbGxzOiBbXSxcblx0XHRjb25lT2Zmc2V0OiB2ZWN0b3JmaWVsZC5jb25lT2Zmc2V0LFxuXHRcdGNvbG9ybWFwOiB2ZWN0b3JmaWVsZC5jb2xvcm1hcFxuXHR9O1xuXG5cdGlmICh2ZWN0b3JmaWVsZC5wb3NpdGlvbnMubGVuZ3RoID09PSAwKSB7XG5cdFx0aWYgKGJvdW5kcykge1xuXHRcdFx0Ym91bmRzWzBdID0gWzAsMCwwXTtcblx0XHRcdGJvdW5kc1sxXSA9IFswLDAsMF07XG5cdFx0fVxuXHRcdHJldHVybiBnZW87XG5cdH1cblxuXHQvLyBDb21wdXRlIGJvdW5kaW5nIGJveCBmb3IgdGhlIGRhdGFzZXQuXG5cdC8vIENvbXB1dGUgbWF4aW11bSB2ZWxvY2l0eSBmb3IgdGhlIGRhdGFzZXQgdG8gdXNlIGZvciBzY2FsaW5nIHRoZSBjb25lcy5cblx0dmFyIG1heE5vcm0gPSAwO1xuXHR2YXIgbWluWCA9IEluZmluaXR5LCBtYXhYID0gLUluZmluaXR5O1xuXHR2YXIgbWluWSA9IEluZmluaXR5LCBtYXhZID0gLUluZmluaXR5O1xuXHR2YXIgbWluWiA9IEluZmluaXR5LCBtYXhaID0gLUluZmluaXR5O1xuXHR2YXIgcDIgPSBudWxsO1xuXHR2YXIgdTIgPSBudWxsO1xuXHR2YXIgcG9zaXRpb25WZWN0b3JzID0gW107XG5cdHZhciB2ZWN0b3JTY2FsZSA9IEluZmluaXR5O1xuXHR2YXIgc2tpcEl0ID0gZmFsc2U7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHAgPSBwb3NpdGlvbnNbaV07XG5cdFx0bWluWCA9IE1hdGgubWluKHBbMF0sIG1pblgpO1xuXHRcdG1heFggPSBNYXRoLm1heChwWzBdLCBtYXhYKTtcblx0XHRtaW5ZID0gTWF0aC5taW4ocFsxXSwgbWluWSk7XG5cdFx0bWF4WSA9IE1hdGgubWF4KHBbMV0sIG1heFkpO1xuXHRcdG1pblogPSBNYXRoLm1pbihwWzJdLCBtaW5aKTtcblx0XHRtYXhaID0gTWF0aC5tYXgocFsyXSwgbWF4Wik7XG5cdFx0dmFyIHUgPSB2ZWN0b3JzW2ldO1xuXG5cdFx0aWYgKHZlYzMubGVuZ3RoKHUpID4gbWF4Tm9ybSkge1xuXHRcdFx0bWF4Tm9ybSA9IHZlYzMubGVuZ3RoKHUpO1xuXHRcdH1cblx0XHRpZiAoaSkge1xuXHRcdFx0Ly8gRmluZCB2ZWN0b3Igc2NhbGUgW3cvIHVuaXRzIG9mIHRpbWVdIHVzaW5nIFwic3VjY2Vzc2l2ZVwiIHBvc2l0aW9uc1xuXHRcdFx0Ly8gKG5vdCBcImFkamFjZW50XCIgd2l0aCB3b3VsZCBiZSBPKG5eMikpLFxuXHRcdFx0Ly9cblx0XHRcdC8vIFRoZSB2ZWN0b3Igc2NhbGUgY29ycmVzcG9uZHMgdG8gdGhlIG1pbmltdW0gXCJ0aW1lXCIgdG8gdHJhdmVsIGFjcm9zcyB0d29cblx0XHRcdC8vIHR3byBhZGphY2VudCBwb3NpdGlvbnMgYXQgdGhlIGF2ZXJhZ2UgdmVsb2NpdHkgb2YgdGhvc2UgdHdvIGFkamFjZW50IHBvc2l0aW9uc1xuXG5cdFx0XHR2YXIgcSA9ICgyICogdmVjMy5kaXN0YW5jZShwMiwgcCkgLyAodmVjMy5sZW5ndGgodTIpICsgdmVjMy5sZW5ndGgodSkpKTtcblx0XHRcdGlmKHEpIHtcblx0XHRcdFx0dmVjdG9yU2NhbGUgPSBNYXRoLm1pbih2ZWN0b3JTY2FsZSwgcSk7XG5cdFx0XHRcdHNraXBJdCA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2tpcEl0ID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoIXNraXBJdCkge1xuXHRcdFx0cDIgPSBwO1xuXHRcdFx0dTIgPSB1O1xuXHRcdH1cblx0XHRwb3NpdGlvblZlY3RvcnMucHVzaCh1KTtcblx0fVxuXHR2YXIgbWluViA9IFttaW5YLCBtaW5ZLCBtaW5aXTtcblx0dmFyIG1heFYgPSBbbWF4WCwgbWF4WSwgbWF4Wl07XG5cdGlmIChib3VuZHMpIHtcblx0XHRib3VuZHNbMF0gPSBtaW5WO1xuXHRcdGJvdW5kc1sxXSA9IG1heFY7XG5cdH1cblx0aWYgKG1heE5vcm0gPT09IDApIHtcblx0XHRtYXhOb3JtID0gMTtcblx0fVxuXG5cdC8vIEludmVydGVkIG1heCBub3JtIHdvdWxkIG1hcCB2ZWN0b3Igd2l0aCBub3JtIG1heE5vcm0gdG8gMSBjb29yZCBzcGFjZSB1bml0cyBpbiBsZW5ndGhcblx0dmFyIGludmVydGVkTWF4Tm9ybSA9IDEgLyBtYXhOb3JtO1xuXG5cdGlmICghaXNGaW5pdGUodmVjdG9yU2NhbGUpKSB7XG5cdFx0dmVjdG9yU2NhbGUgPSAxLjA7XG5cdH1cblx0Z2VvLnZlY3RvclNjYWxlID0gdmVjdG9yU2NhbGU7XG5cblx0dmFyIGNvbmVTY2FsZSA9IHZlY3RvcmZpZWxkLmNvbmVTaXplIHx8IDAuNTtcblxuXHRpZiAodmVjdG9yZmllbGQuYWJzb2x1dGVDb25lU2l6ZSkge1xuXHRcdGNvbmVTY2FsZSA9IHZlY3RvcmZpZWxkLmFic29sdXRlQ29uZVNpemUgKiBpbnZlcnRlZE1heE5vcm07XG5cdH1cblxuXHRnZW8uY29uZVNjYWxlID0gY29uZVNjYWxlO1xuXG5cdC8vIEJ1aWxkIHRoZSBjb25lIG1vZGVsLlxuXHRmb3IgKHZhciBpID0gMCwgaiA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcCA9IHBvc2l0aW9uc1tpXTtcblx0XHR2YXIgeCA9IHBbMF0sIHkgPSBwWzFdLCB6ID0gcFsyXTtcblx0XHR2YXIgZCA9IHBvc2l0aW9uVmVjdG9yc1tpXTtcblx0XHR2YXIgaW50ZW5zaXR5ID0gdmVjMy5sZW5ndGgoZCkgKiBpbnZlcnRlZE1heE5vcm07XG5cdFx0Zm9yICh2YXIgayA9IDAsIGwgPSA4OyBrIDwgbDsgaysrKSB7XG5cdFx0XHRnZW8ucG9zaXRpb25zLnB1c2goW3gsIHksIHosIGorK10pO1xuXHRcdFx0Z2VvLnBvc2l0aW9ucy5wdXNoKFt4LCB5LCB6LCBqKytdKTtcblx0XHRcdGdlby5wb3NpdGlvbnMucHVzaChbeCwgeSwgeiwgaisrXSk7XG5cdFx0XHRnZW8ucG9zaXRpb25zLnB1c2goW3gsIHksIHosIGorK10pO1xuXHRcdFx0Z2VvLnBvc2l0aW9ucy5wdXNoKFt4LCB5LCB6LCBqKytdKTtcblx0XHRcdGdlby5wb3NpdGlvbnMucHVzaChbeCwgeSwgeiwgaisrXSk7XG5cblx0XHRcdGdlby52ZWN0b3JzLnB1c2goZCk7XG5cdFx0XHRnZW8udmVjdG9ycy5wdXNoKGQpO1xuXHRcdFx0Z2VvLnZlY3RvcnMucHVzaChkKTtcblx0XHRcdGdlby52ZWN0b3JzLnB1c2goZCk7XG5cdFx0XHRnZW8udmVjdG9ycy5wdXNoKGQpO1xuXHRcdFx0Z2VvLnZlY3RvcnMucHVzaChkKTtcblxuXHRcdFx0Z2VvLnZlcnRleEludGVuc2l0eS5wdXNoKGludGVuc2l0eSwgaW50ZW5zaXR5LCBpbnRlbnNpdHkpO1xuXHRcdFx0Z2VvLnZlcnRleEludGVuc2l0eS5wdXNoKGludGVuc2l0eSwgaW50ZW5zaXR5LCBpbnRlbnNpdHkpO1xuXG5cdFx0XHR2YXIgbSA9IGdlby5wb3NpdGlvbnMubGVuZ3RoO1xuXHRcdFx0Z2VvLmNlbGxzLnB1c2goW20tNiwgbS01LCBtLTRdLCBbbS0zLCBtLTIsIG0tMV0pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBnZW87XG59O1xuXG52YXIgc2hhZGVycyA9IHJlcXVpcmUoJy4vbGliL3NoYWRlcnMnKTtcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZU1lc2ggPSByZXF1aXJlKCcuL2NyZWF0ZV9tZXNoJyk7XG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVDb25lTWVzaCA9IGZ1bmN0aW9uKGdsLCBwYXJhbXMpIHtcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzLmNyZWF0ZU1lc2goZ2wsIHBhcmFtcywge1xuXHRcdHNoYWRlcnM6IHNoYWRlcnMsXG5cdFx0dHJhY2VUeXBlOiAnY29uZSdcblx0fSk7XG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGNyZWF0ZVNoYWRlciAgPSByZXF1aXJlKCdnbC1zaGFkZXInKVxudmFyIGNyZWF0ZUJ1ZmZlciAgPSByZXF1aXJlKCdnbC1idWZmZXInKVxudmFyIGNyZWF0ZVZBTyAgICAgPSByZXF1aXJlKCdnbC12YW8nKVxudmFyIGNyZWF0ZVRleHR1cmUgPSByZXF1aXJlKCdnbC10ZXh0dXJlMmQnKVxudmFyIG11bHRpcGx5ICAgICAgPSByZXF1aXJlKCdnbC1tYXQ0L211bHRpcGx5JylcbnZhciBpbnZlcnQgICAgICAgID0gcmVxdWlyZSgnZ2wtbWF0NC9pbnZlcnQnKVxudmFyIG5kYXJyYXkgICAgICAgPSByZXF1aXJlKCduZGFycmF5JylcbnZhciBjb2xvcm1hcCAgICAgID0gcmVxdWlyZSgnY29sb3JtYXAnKVxuXG52YXIgSURFTlRJVFkgPSBbXG4gIDEsMCwwLDAsXG4gIDAsMSwwLDAsXG4gIDAsMCwxLDAsXG4gIDAsMCwwLDFdXG5cbmZ1bmN0aW9uIFZlY3Rvck1lc2goZ2xcbiAgLCB0ZXh0dXJlXG4gICwgdHJpU2hhZGVyXG4gICwgcGlja1NoYWRlclxuICAsIHRyaWFuZ2xlUG9zaXRpb25zXG4gICwgdHJpYW5nbGVWZWN0b3JzXG4gICwgdHJpYW5nbGVJZHNcbiAgLCB0cmlhbmdsZUNvbG9yc1xuICAsIHRyaWFuZ2xlVVZzXG4gICwgdHJpYW5nbGVWQU9cbiAgLCB0cmFjZVR5cGUpIHtcblxuICB0aGlzLmdsICAgICAgICAgICAgICAgID0gZ2xcbiAgdGhpcy5waXhlbFJhdGlvICAgICAgICAgPSAxXG4gIHRoaXMuY2VsbHMgICAgICAgICAgICAgPSBbXVxuICB0aGlzLnBvc2l0aW9ucyAgICAgICAgID0gW11cbiAgdGhpcy5pbnRlbnNpdHkgICAgICAgICA9IFtdXG4gIHRoaXMudGV4dHVyZSAgICAgICAgICAgPSB0ZXh0dXJlXG4gIHRoaXMuZGlydHkgICAgICAgICAgICAgPSB0cnVlXG5cbiAgdGhpcy50cmlTaGFkZXIgICAgICAgICA9IHRyaVNoYWRlclxuICB0aGlzLnBpY2tTaGFkZXIgICAgICAgID0gcGlja1NoYWRlclxuXG4gIHRoaXMudHJpYW5nbGVQb3NpdGlvbnMgPSB0cmlhbmdsZVBvc2l0aW9uc1xuICB0aGlzLnRyaWFuZ2xlVmVjdG9ycyAgID0gdHJpYW5nbGVWZWN0b3JzXG4gIHRoaXMudHJpYW5nbGVDb2xvcnMgICAgPSB0cmlhbmdsZUNvbG9yc1xuICB0aGlzLnRyaWFuZ2xlVVZzICAgICAgID0gdHJpYW5nbGVVVnNcbiAgdGhpcy50cmlhbmdsZUlkcyAgICAgICA9IHRyaWFuZ2xlSWRzXG4gIHRoaXMudHJpYW5nbGVWQU8gICAgICAgPSB0cmlhbmdsZVZBT1xuICB0aGlzLnRyaWFuZ2xlQ291bnQgICAgID0gMFxuXG4gIHRoaXMucGlja0lkICAgICAgICAgICAgPSAxXG4gIHRoaXMuYm91bmRzICAgICAgICAgICAgPSBbXG4gICAgWyBJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5XSxcbiAgICBbLUluZmluaXR5LC1JbmZpbml0eSwtSW5maW5pdHldIF1cbiAgdGhpcy5jbGlwQm91bmRzICAgICAgICA9IFtcbiAgICBbLUluZmluaXR5LC1JbmZpbml0eSwtSW5maW5pdHldLFxuICAgIFsgSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eV0gXVxuXG4gIHRoaXMubGlnaHRQb3NpdGlvbiA9IFsxZTUsIDFlNSwgMF1cbiAgdGhpcy5hbWJpZW50TGlnaHQgID0gMC44XG4gIHRoaXMuZGlmZnVzZUxpZ2h0ICA9IDAuOFxuICB0aGlzLnNwZWN1bGFyTGlnaHQgPSAyLjBcbiAgdGhpcy5yb3VnaG5lc3MgICAgID0gMC41XG4gIHRoaXMuZnJlc25lbCAgICAgICA9IDEuNVxuXG4gIHRoaXMub3BhY2l0eSAgICAgICA9IDFcblxuICB0aGlzLnRyYWNlVHlwZSAgICAgPSB0cmFjZVR5cGVcbiAgdGhpcy50dWJlU2NhbGUgICAgID0gMSAvLyB1c2VkIGluIHN0cmVhbXR1YmVcbiAgdGhpcy5jb25lU2NhbGUgICAgID0gMiAvLyB1c2VkIGluIGNvbmVcbiAgdGhpcy52ZWN0b3JTY2FsZSAgID0gMSAvLyB1c2VkIGluIGNvbmVcbiAgdGhpcy5jb25lT2Zmc2V0ICAgID0gMC4yNSAvLyB1c2VkIGluIGNvbmVcblxuICB0aGlzLl9tb2RlbCAgICAgICA9IElERU5USVRZXG4gIHRoaXMuX3ZpZXcgICAgICAgID0gSURFTlRJVFlcbiAgdGhpcy5fcHJvamVjdGlvbiAgPSBJREVOVElUWVxuICB0aGlzLl9yZXNvbHV0aW9uICA9IFsxLDFdXG59XG5cbnZhciBwcm90byA9IFZlY3Rvck1lc2gucHJvdG90eXBlXG5cbnByb3RvLmlzT3BhcXVlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wYWNpdHkgPj0gMVxufVxuXG5wcm90by5pc1RyYW5zcGFyZW50ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wYWNpdHkgPCAxXG59XG5cbnByb3RvLnBpY2tTbG90cyA9IDFcblxucHJvdG8uc2V0UGlja0Jhc2UgPSBmdW5jdGlvbihpZCkge1xuICB0aGlzLnBpY2tJZCA9IGlkXG59XG5cbmZ1bmN0aW9uIGdlbkNvbG9ybWFwKHBhcmFtKSB7XG4gIHZhciBjb2xvcnMgPSBjb2xvcm1hcCh7XG4gICAgICBjb2xvcm1hcDogcGFyYW1cbiAgICAsIG5zaGFkZXM6ICAyNTZcbiAgICAsIGZvcm1hdDogICdyZ2JhJ1xuICB9KVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheSgyNTYqNClcbiAgZm9yKHZhciBpPTA7IGk8MjU2OyArK2kpIHtcbiAgICB2YXIgYyA9IGNvbG9yc1tpXVxuICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgcmVzdWx0WzQqaStqXSA9IGNbal1cbiAgICB9XG4gICAgcmVzdWx0WzQqaSszXSA9IGNbM10qMjU1XG4gIH1cblxuICByZXR1cm4gbmRhcnJheShyZXN1bHQsIFsyNTYsMjU2LDRdLCBbNCwwLDFdKVxufVxuXG5mdW5jdGlvbiB0YWtlWkNvbXBvbmVudChhcnJheSkge1xuICB2YXIgbiA9IGFycmF5Lmxlbmd0aFxuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KG4pXG4gIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IGFycmF5W2ldWzJdXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgcGFyYW1zID0gcGFyYW1zIHx8IHt9XG4gIHZhciBnbCA9IHRoaXMuZ2xcblxuICB0aGlzLmRpcnR5ID0gdHJ1ZVxuXG4gIGlmKCdsaWdodFBvc2l0aW9uJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLmxpZ2h0UG9zaXRpb24gPSBwYXJhbXMubGlnaHRQb3NpdGlvblxuICB9XG4gIGlmKCdvcGFjaXR5JyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLm9wYWNpdHkgPSBwYXJhbXMub3BhY2l0eVxuICB9XG4gIGlmKCdhbWJpZW50JyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLmFtYmllbnRMaWdodCAgPSBwYXJhbXMuYW1iaWVudFxuICB9XG4gIGlmKCdkaWZmdXNlJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLmRpZmZ1c2VMaWdodCA9IHBhcmFtcy5kaWZmdXNlXG4gIH1cbiAgaWYoJ3NwZWN1bGFyJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLnNwZWN1bGFyTGlnaHQgPSBwYXJhbXMuc3BlY3VsYXJcbiAgfVxuICBpZigncm91Z2huZXNzJyBpbiBwYXJhbXMpIHtcbiAgICB0aGlzLnJvdWdobmVzcyA9IHBhcmFtcy5yb3VnaG5lc3NcbiAgfVxuICBpZignZnJlc25lbCcgaW4gcGFyYW1zKSB7XG4gICAgdGhpcy5mcmVzbmVsID0gcGFyYW1zLmZyZXNuZWxcbiAgfVxuXG4gIC8vIHVzZSBpbiBzdHJlYW10dWJlXG4gIGlmIChwYXJhbXMudHViZVNjYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnR1YmVTY2FsZSA9IHBhcmFtcy50dWJlU2NhbGVcbiAgfVxuXG4gIC8vIHVzZWQgaW4gY29uZVxuICBpZiAocGFyYW1zLnZlY3RvclNjYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnZlY3RvclNjYWxlID0gcGFyYW1zLnZlY3RvclNjYWxlXG4gIH1cbiAgaWYgKHBhcmFtcy5jb25lU2NhbGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuY29uZVNjYWxlID0gcGFyYW1zLmNvbmVTY2FsZVxuICB9XG4gIGlmIChwYXJhbXMuY29uZU9mZnNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5jb25lT2Zmc2V0ID0gcGFyYW1zLmNvbmVPZmZzZXRcbiAgfVxuXG4gIGlmIChwYXJhbXMuY29sb3JtYXApIHtcbiAgICB0aGlzLnRleHR1cmUuc2hhcGUgPSBbMjU2LDI1Nl1cbiAgICB0aGlzLnRleHR1cmUubWluRmlsdGVyID0gZ2wuTElORUFSX01JUE1BUF9MSU5FQVJcbiAgICB0aGlzLnRleHR1cmUubWFnRmlsdGVyID0gZ2wuTElORUFSXG4gICAgdGhpcy50ZXh0dXJlLnNldFBpeGVscyhnZW5Db2xvcm1hcChwYXJhbXMuY29sb3JtYXApKVxuICAgIHRoaXMudGV4dHVyZS5nZW5lcmF0ZU1pcG1hcCgpXG4gIH1cblxuICB2YXIgY2VsbHMgPSBwYXJhbXMuY2VsbHNcbiAgdmFyIHBvc2l0aW9ucyA9IHBhcmFtcy5wb3NpdGlvbnNcbiAgdmFyIHZlY3RvcnMgPSBwYXJhbXMudmVjdG9yc1xuXG4gIGlmKCFwb3NpdGlvbnMgfHwgIWNlbGxzIHx8ICF2ZWN0b3JzKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgdFBvcyA9IFtdXG4gIHZhciB0VmVjID0gW11cbiAgdmFyIHRDb2wgPSBbXVxuICB2YXIgdFVWcyA9IFtdXG4gIHZhciB0SWRzID0gW11cblxuICAvL1NhdmUgZ2VvbWV0cnkgZGF0YSBmb3IgcGlja2luZyBjYWxjdWxhdGlvbnNcbiAgdGhpcy5jZWxscyAgICAgPSBjZWxsc1xuICB0aGlzLnBvc2l0aW9ucyA9IHBvc2l0aW9uc1xuICB0aGlzLnZlY3RvcnMgICA9IHZlY3RvcnNcblxuICAvL0NvbXB1dGUgY29sb3JzXG4gIHZhciBtZXNoQ29sb3IgICAgICAgPSBwYXJhbXMubWVzaENvbG9yIHx8IFsxLDEsMSwxXVxuXG4gIC8vVVZzXG4gIHZhciB2ZXJ0ZXhJbnRlbnNpdHkgPSBwYXJhbXMudmVydGV4SW50ZW5zaXR5XG5cbiAgdmFyIGludGVuc2l0eUxvICAgICA9IEluZmluaXR5XG4gIHZhciBpbnRlbnNpdHlIaSAgICAgPSAtSW5maW5pdHlcblxuICBpZih2ZXJ0ZXhJbnRlbnNpdHkpIHtcbiAgICBpZihwYXJhbXMudmVydGV4SW50ZW5zaXR5Qm91bmRzKSB7XG4gICAgICBpbnRlbnNpdHlMbyA9ICtwYXJhbXMudmVydGV4SW50ZW5zaXR5Qm91bmRzWzBdXG4gICAgICBpbnRlbnNpdHlIaSA9ICtwYXJhbXMudmVydGV4SW50ZW5zaXR5Qm91bmRzWzFdXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcih2YXIgaT0wOyBpPHZlcnRleEludGVuc2l0eS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgZiA9IHZlcnRleEludGVuc2l0eVtpXVxuICAgICAgICBpbnRlbnNpdHlMbyA9IE1hdGgubWluKGludGVuc2l0eUxvLCBmKVxuICAgICAgICBpbnRlbnNpdHlIaSA9IE1hdGgubWF4KGludGVuc2l0eUhpLCBmKVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IodmFyIGk9MDsgaTxwb3NpdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBmID0gcG9zaXRpb25zW2ldWzJdXG4gICAgICBpbnRlbnNpdHlMbyA9IE1hdGgubWluKGludGVuc2l0eUxvLCBmKVxuICAgICAgaW50ZW5zaXR5SGkgPSBNYXRoLm1heChpbnRlbnNpdHlIaSwgZilcbiAgICB9XG4gIH1cblxuICBpZih2ZXJ0ZXhJbnRlbnNpdHkpIHtcbiAgICB0aGlzLmludGVuc2l0eSA9IHZlcnRleEludGVuc2l0eVxuICB9IGVsc2Uge1xuICAgIHRoaXMuaW50ZW5zaXR5ID0gdGFrZVpDb21wb25lbnQocG9zaXRpb25zKVxuICB9XG5cbiAgLy9VcGRhdGUgYm91bmRzXG4gIHRoaXMuYm91bmRzICAgICAgID0gW1tJbmZpbml0eSxJbmZpbml0eSxJbmZpbml0eV0sIFstSW5maW5pdHksLUluZmluaXR5LC1JbmZpbml0eV1dXG4gIGZvcih2YXIgaT0wOyBpPHBvc2l0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBwID0gcG9zaXRpb25zW2ldXG4gICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICBpZihpc05hTihwW2pdKSB8fCAhaXNGaW5pdGUocFtqXSkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHRoaXMuYm91bmRzWzBdW2pdID0gTWF0aC5taW4odGhpcy5ib3VuZHNbMF1bal0sIHBbal0pXG4gICAgICB0aGlzLmJvdW5kc1sxXVtqXSA9IE1hdGgubWF4KHRoaXMuYm91bmRzWzFdW2pdLCBwW2pdKVxuICAgIH1cbiAgfVxuXG4gIC8vUGFjayBjZWxscyBpbnRvIGJ1ZmZlcnNcbiAgdmFyIHRyaWFuZ2xlQ291bnQgPSAwXG5cbmZpbGxfbG9vcDpcbiAgZm9yKHZhciBpPTA7IGk8Y2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY2VsbCA9IGNlbGxzW2ldXG4gICAgc3dpdGNoKGNlbGwubGVuZ3RoKSB7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIC8vQ2hlY2sgTmFOc1xuICAgICAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgICAgICB2YXIgdiA9IGNlbGxbal1cbiAgICAgICAgICB2YXIgcCA9IHBvc2l0aW9uc1t2XVxuICAgICAgICAgIGZvcih2YXIgaz0wOyBrPDM7ICsraykge1xuICAgICAgICAgICAgaWYoaXNOYU4ocFtrXSkgfHwgIWlzRmluaXRlKHBba10pKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlIGZpbGxfbG9vcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgICAgIHZhciB2ID0gY2VsbFsyIC0gal1cblxuICAgICAgICAgIHZhciBwID0gcG9zaXRpb25zW3ZdXG4gICAgICAgICAgdFBvcy5wdXNoKHBbMF0sIHBbMV0sIHBbMl0sIHBbM10pXG5cbiAgICAgICAgICB2YXIgdyA9IHZlY3RvcnNbdl1cbiAgICAgICAgICB0VmVjLnB1c2god1swXSwgd1sxXSwgd1syXSwgd1szXSB8fCAwKVxuXG4gICAgICAgICAgdmFyIGMgPSBtZXNoQ29sb3JcbiAgICAgICAgICBpZihjLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgdENvbC5wdXNoKGNbMF0sIGNbMV0sIGNbMl0sIDEpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRDb2wucHVzaChjWzBdLCBjWzFdLCBjWzJdLCBjWzNdKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciB1dlxuICAgICAgICAgIGlmKHZlcnRleEludGVuc2l0eSkge1xuICAgICAgICAgICAgdXYgPSBbXG4gICAgICAgICAgICAgICh2ZXJ0ZXhJbnRlbnNpdHlbdl0gLSBpbnRlbnNpdHlMbykgL1xuICAgICAgICAgICAgICAoaW50ZW5zaXR5SGkgLSBpbnRlbnNpdHlMbyksIDBdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV2ID0gW1xuICAgICAgICAgICAgICAocFsyXSAtIGludGVuc2l0eUxvKSAvXG4gICAgICAgICAgICAgIChpbnRlbnNpdHlIaSAtIGludGVuc2l0eUxvKSwgMF1cbiAgICAgICAgICB9XG4gICAgICAgICAgdFVWcy5wdXNoKHV2WzBdLCB1dlsxXSlcblxuICAgICAgICAgIHRJZHMucHVzaChpKVxuICAgICAgICB9XG4gICAgICAgIHRyaWFuZ2xlQ291bnQgKz0gMVxuICAgICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgdGhpcy50cmlhbmdsZUNvdW50ICA9IHRyaWFuZ2xlQ291bnRcblxuICB0aGlzLnRyaWFuZ2xlUG9zaXRpb25zLnVwZGF0ZSh0UG9zKVxuICB0aGlzLnRyaWFuZ2xlVmVjdG9ycy51cGRhdGUodFZlYylcbiAgdGhpcy50cmlhbmdsZUNvbG9ycy51cGRhdGUodENvbClcbiAgdGhpcy50cmlhbmdsZVVWcy51cGRhdGUodFVWcylcbiAgdGhpcy50cmlhbmdsZUlkcy51cGRhdGUobmV3IFVpbnQzMkFycmF5KHRJZHMpKVxufVxuXG5wcm90by5kcmF3VHJhbnNwYXJlbnQgPSBwcm90by5kcmF3ID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fVxuICB2YXIgZ2wgICAgICAgICAgPSB0aGlzLmdsXG4gIHZhciBtb2RlbCAgICAgICA9IHBhcmFtcy5tb2RlbCAgICAgIHx8IElERU5USVRZXG4gIHZhciB2aWV3ICAgICAgICA9IHBhcmFtcy52aWV3ICAgICAgIHx8IElERU5USVRZXG4gIHZhciBwcm9qZWN0aW9uICA9IHBhcmFtcy5wcm9qZWN0aW9uIHx8IElERU5USVRZXG5cbiAgdmFyIGNsaXBCb3VuZHMgPSBbWy0xZTYsLTFlNiwtMWU2XSxbMWU2LDFlNiwxZTZdXVxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICBjbGlwQm91bmRzWzBdW2ldID0gTWF0aC5tYXgoY2xpcEJvdW5kc1swXVtpXSwgdGhpcy5jbGlwQm91bmRzWzBdW2ldKVxuICAgIGNsaXBCb3VuZHNbMV1baV0gPSBNYXRoLm1pbihjbGlwQm91bmRzWzFdW2ldLCB0aGlzLmNsaXBCb3VuZHNbMV1baV0pXG4gIH1cblxuICB2YXIgdW5pZm9ybXMgPSB7XG4gICAgbW9kZWw6ICAgICAgbW9kZWwsXG4gICAgdmlldzogICAgICAgdmlldyxcbiAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uLFxuICAgIGludmVyc2VNb2RlbDogSURFTlRJVFkuc2xpY2UoKSxcblxuICAgIGNsaXBCb3VuZHM6IGNsaXBCb3VuZHMsXG5cbiAgICBrYW1iaWVudDogICB0aGlzLmFtYmllbnRMaWdodCxcbiAgICBrZGlmZnVzZTogICB0aGlzLmRpZmZ1c2VMaWdodCxcbiAgICBrc3BlY3VsYXI6ICB0aGlzLnNwZWN1bGFyTGlnaHQsXG4gICAgcm91Z2huZXNzOiAgdGhpcy5yb3VnaG5lc3MsXG4gICAgZnJlc25lbDogICAgdGhpcy5mcmVzbmVsLFxuXG4gICAgZXllUG9zaXRpb246ICAgWzAsMCwwXSxcbiAgICBsaWdodFBvc2l0aW9uOiBbMCwwLDBdLFxuXG4gICAgb3BhY2l0eTogIHRoaXMub3BhY2l0eSxcblxuICAgIHR1YmVTY2FsZTogdGhpcy50dWJlU2NhbGUsXG5cbiAgICB2ZWN0b3JTY2FsZTogdGhpcy52ZWN0b3JTY2FsZSxcbiAgICBjb25lU2NhbGU6IHRoaXMuY29uZVNjYWxlLFxuICAgIGNvbmVPZmZzZXQ6IHRoaXMuY29uZU9mZnNldCxcblxuICAgIHRleHR1cmU6ICAgIDBcbiAgfVxuXG4gIHVuaWZvcm1zLmludmVyc2VNb2RlbCA9IGludmVydCh1bmlmb3Jtcy5pbnZlcnNlTW9kZWwsIHVuaWZvcm1zLm1vZGVsKVxuXG4gIGdsLmRpc2FibGUoZ2wuQ1VMTF9GQUNFKVxuXG4gIHRoaXMudGV4dHVyZS5iaW5kKDApXG5cbiAgdmFyIGludkNhbWVyYU1hdHJpeCA9IG5ldyBBcnJheSgxNilcbiAgbXVsdGlwbHkoaW52Q2FtZXJhTWF0cml4LCB1bmlmb3Jtcy52aWV3LCB1bmlmb3Jtcy5tb2RlbClcbiAgbXVsdGlwbHkoaW52Q2FtZXJhTWF0cml4LCB1bmlmb3Jtcy5wcm9qZWN0aW9uLCBpbnZDYW1lcmFNYXRyaXgpXG4gIGludmVydChpbnZDYW1lcmFNYXRyaXgsIGludkNhbWVyYU1hdHJpeClcblxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICB1bmlmb3Jtcy5leWVQb3NpdGlvbltpXSA9IGludkNhbWVyYU1hdHJpeFsxMitpXSAvIGludkNhbWVyYU1hdHJpeFsxNV1cbiAgfVxuXG4gIHZhciB3ID0gaW52Q2FtZXJhTWF0cml4WzE1XVxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICB3ICs9IHRoaXMubGlnaHRQb3NpdGlvbltpXSAqIGludkNhbWVyYU1hdHJpeFs0KmkrM11cbiAgfVxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICB2YXIgcyA9IGludkNhbWVyYU1hdHJpeFsxMitpXVxuICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgcyArPSBpbnZDYW1lcmFNYXRyaXhbNCpqK2ldICogdGhpcy5saWdodFBvc2l0aW9uW2pdXG4gICAgfVxuICAgIHVuaWZvcm1zLmxpZ2h0UG9zaXRpb25baV0gPSBzIC8gd1xuICB9XG5cbiAgaWYodGhpcy50cmlhbmdsZUNvdW50ID4gMCkge1xuICAgIHZhciBzaGFkZXIgPSB0aGlzLnRyaVNoYWRlclxuICAgIHNoYWRlci5iaW5kKClcbiAgICBzaGFkZXIudW5pZm9ybXMgPSB1bmlmb3Jtc1xuXG4gICAgdGhpcy50cmlhbmdsZVZBTy5iaW5kKClcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgdGhpcy50cmlhbmdsZUNvdW50KjMpXG4gICAgdGhpcy50cmlhbmdsZVZBTy51bmJpbmQoKVxuICB9XG59XG5cbnByb3RvLmRyYXdQaWNrID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fVxuXG4gIHZhciBnbCAgICAgICAgID0gdGhpcy5nbFxuXG4gIHZhciBtb2RlbCAgICAgID0gcGFyYW1zLm1vZGVsICAgICAgfHwgSURFTlRJVFlcbiAgdmFyIHZpZXcgICAgICAgPSBwYXJhbXMudmlldyAgICAgICB8fCBJREVOVElUWVxuICB2YXIgcHJvamVjdGlvbiA9IHBhcmFtcy5wcm9qZWN0aW9uIHx8IElERU5USVRZXG5cbiAgdmFyIGNsaXBCb3VuZHMgPSBbWy0xZTYsLTFlNiwtMWU2XSxbMWU2LDFlNiwxZTZdXVxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICBjbGlwQm91bmRzWzBdW2ldID0gTWF0aC5tYXgoY2xpcEJvdW5kc1swXVtpXSwgdGhpcy5jbGlwQm91bmRzWzBdW2ldKVxuICAgIGNsaXBCb3VuZHNbMV1baV0gPSBNYXRoLm1pbihjbGlwQm91bmRzWzFdW2ldLCB0aGlzLmNsaXBCb3VuZHNbMV1baV0pXG4gIH1cblxuICAvL1NhdmUgY2FtZXJhIHBhcmFtZXRlcnNcbiAgdGhpcy5fbW9kZWwgICAgICA9IFtdLnNsaWNlLmNhbGwobW9kZWwpXG4gIHRoaXMuX3ZpZXcgICAgICAgPSBbXS5zbGljZS5jYWxsKHZpZXcpXG4gIHRoaXMuX3Byb2plY3Rpb24gPSBbXS5zbGljZS5jYWxsKHByb2plY3Rpb24pXG4gIHRoaXMuX3Jlc29sdXRpb24gPSBbZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0XVxuXG4gIHZhciB1bmlmb3JtcyA9IHtcbiAgICBtb2RlbDogICAgICBtb2RlbCxcbiAgICB2aWV3OiAgICAgICB2aWV3LFxuICAgIHByb2plY3Rpb246IHByb2plY3Rpb24sXG4gICAgY2xpcEJvdW5kczogY2xpcEJvdW5kcyxcblxuICAgIHR1YmVTY2FsZTogdGhpcy50dWJlU2NhbGUsXG4gICAgdmVjdG9yU2NhbGU6IHRoaXMudmVjdG9yU2NhbGUsXG4gICAgY29uZVNjYWxlOiB0aGlzLmNvbmVTY2FsZSxcbiAgICBjb25lT2Zmc2V0OiB0aGlzLmNvbmVPZmZzZXQsXG5cbiAgICBwaWNrSWQ6ICAgICB0aGlzLnBpY2tJZCAvIDI1NS4wLFxuICB9XG5cbiAgdmFyIHNoYWRlciA9IHRoaXMucGlja1NoYWRlclxuICBzaGFkZXIuYmluZCgpXG4gIHNoYWRlci51bmlmb3JtcyA9IHVuaWZvcm1zXG5cbiAgaWYodGhpcy50cmlhbmdsZUNvdW50ID4gMCkge1xuICAgIHRoaXMudHJpYW5nbGVWQU8uYmluZCgpXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIHRoaXMudHJpYW5nbGVDb3VudCozKVxuICAgIHRoaXMudHJpYW5nbGVWQU8udW5iaW5kKClcbiAgfVxufVxuXG5cbnByb3RvLnBpY2sgPSBmdW5jdGlvbihwaWNrRGF0YSkge1xuICBpZighcGlja0RhdGEpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGlmKHBpY2tEYXRhLmlkICE9PSB0aGlzLnBpY2tJZCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2YXIgY2VsbElkICAgID0gcGlja0RhdGEudmFsdWVbMF0gKyAyNTYqcGlja0RhdGEudmFsdWVbMV0gKyA2NTUzNipwaWNrRGF0YS52YWx1ZVsyXVxuICB2YXIgY2VsbCAgICAgID0gdGhpcy5jZWxsc1tjZWxsSWRdXG4gIHZhciBwb3MgPSAgICAgdGhpcy5wb3NpdGlvbnNbY2VsbFsxXV0uc2xpY2UoMCwgMylcblxuICB2YXIgcmVzdWx0ID0ge1xuICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgZGF0YUNvb3JkaW5hdGU6IHBvcyxcbiAgICBpbmRleDogTWF0aC5mbG9vcihjZWxsWzFdIC8gNDgpXG4gIH1cblxuXG4gIGlmKHRoaXMudHJhY2VUeXBlID09PSAnY29uZScpIHtcbiAgICByZXN1bHQuaW5kZXggPSBNYXRoLmZsb29yKGNlbGxbMV0gLyA0OClcbiAgfSBlbHNlIGlmKHRoaXMudHJhY2VUeXBlID09PSAnc3RyZWFtdHViZScpIHtcbiAgICByZXN1bHQuaW50ZW5zaXR5ID0gdGhpcy5pbnRlbnNpdHlbY2VsbFsxXV1cbiAgICByZXN1bHQudmVsb2NpdHkgPSB0aGlzLnZlY3RvcnNbY2VsbFsxXV0uc2xpY2UoMCwgMylcbiAgICByZXN1bHQuZGl2ZXJnZW5jZSA9IHRoaXMudmVjdG9yc1tjZWxsWzFdXVszXVxuICAgIHJlc3VsdC5pbmRleCA9IGNlbGxJZFxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy50ZXh0dXJlLmRpc3Bvc2UoKVxuXG4gIHRoaXMudHJpU2hhZGVyLmRpc3Bvc2UoKVxuICB0aGlzLnBpY2tTaGFkZXIuZGlzcG9zZSgpXG5cbiAgdGhpcy50cmlhbmdsZVZBTy5kaXNwb3NlKClcbiAgdGhpcy50cmlhbmdsZVBvc2l0aW9ucy5kaXNwb3NlKClcbiAgdGhpcy50cmlhbmdsZVZlY3RvcnMuZGlzcG9zZSgpXG4gIHRoaXMudHJpYW5nbGVDb2xvcnMuZGlzcG9zZSgpXG4gIHRoaXMudHJpYW5nbGVVVnMuZGlzcG9zZSgpXG4gIHRoaXMudHJpYW5nbGVJZHMuZGlzcG9zZSgpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1lc2hTaGFkZXIoZ2wsIHNoYWRlcnMpIHtcbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCxcbiAgICBzaGFkZXJzLm1lc2hTaGFkZXIudmVydGV4LFxuICAgIHNoYWRlcnMubWVzaFNoYWRlci5mcmFnbWVudCxcbiAgICBudWxsLFxuICAgIHNoYWRlcnMubWVzaFNoYWRlci5hdHRyaWJ1dGVzXG4gIClcblxuICBzaGFkZXIuYXR0cmlidXRlcy5wb3NpdGlvbi5sb2NhdGlvbiA9IDBcbiAgc2hhZGVyLmF0dHJpYnV0ZXMuY29sb3IubG9jYXRpb24gICAgPSAyXG4gIHNoYWRlci5hdHRyaWJ1dGVzLnV2LmxvY2F0aW9uICAgICAgID0gM1xuICBzaGFkZXIuYXR0cmlidXRlcy52ZWN0b3IubG9jYXRpb24gICA9IDRcbiAgcmV0dXJuIHNoYWRlclxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZVBpY2tTaGFkZXIoZ2wsIHNoYWRlcnMpIHtcbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCxcbiAgICBzaGFkZXJzLnBpY2tTaGFkZXIudmVydGV4LFxuICAgIHNoYWRlcnMucGlja1NoYWRlci5mcmFnbWVudCxcbiAgICBudWxsLFxuICAgIHNoYWRlcnMucGlja1NoYWRlci5hdHRyaWJ1dGVzXG4gIClcblxuICBzaGFkZXIuYXR0cmlidXRlcy5wb3NpdGlvbi5sb2NhdGlvbiA9IDBcbiAgc2hhZGVyLmF0dHJpYnV0ZXMuaWQubG9jYXRpb24gICAgICAgPSAxXG4gIHNoYWRlci5hdHRyaWJ1dGVzLnZlY3Rvci5sb2NhdGlvbiAgID0gNFxuICByZXR1cm4gc2hhZGVyXG59XG5cblxuZnVuY3Rpb24gY3JlYXRlVmVjdG9yTWVzaChnbCwgcGFyYW1zLCBvcHRzKSB7XG4gIHZhciBzaGFkZXJzID0gb3B0cy5zaGFkZXJzXG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICBwYXJhbXMgPSBnbFxuICAgIGdsID0gcGFyYW1zLmdsXG4gIH1cblxuXG4gIHZhciB0cmlTaGFkZXIgICAgICAgPSBjcmVhdGVNZXNoU2hhZGVyKGdsLCBzaGFkZXJzKVxuICB2YXIgcGlja1NoYWRlciAgICAgID0gY3JlYXRlUGlja1NoYWRlcihnbCwgc2hhZGVycylcbiAgdmFyIG1lc2hUZXh0dXJlICAgICAgID0gY3JlYXRlVGV4dHVyZShnbCxcbiAgICBuZGFycmF5KG5ldyBVaW50OEFycmF5KFsyNTUsMjU1LDI1NSwyNTVdKSwgWzEsMSw0XSkpXG4gIG1lc2hUZXh0dXJlLmdlbmVyYXRlTWlwbWFwKClcbiAgbWVzaFRleHR1cmUubWluRmlsdGVyID0gZ2wuTElORUFSX01JUE1BUF9MSU5FQVJcbiAgbWVzaFRleHR1cmUubWFnRmlsdGVyID0gZ2wuTElORUFSXG5cbiAgdmFyIHRyaWFuZ2xlUG9zaXRpb25zID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgdHJpYW5nbGVWZWN0b3JzICAgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciB0cmlhbmdsZUNvbG9ycyAgICA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIHRyaWFuZ2xlVVZzICAgICAgID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgdHJpYW5nbGVJZHMgICAgICAgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciB0cmlhbmdsZVZBTyAgICAgICA9IGNyZWF0ZVZBTyhnbCwgW1xuICAgIHsgYnVmZmVyOiB0cmlhbmdsZVBvc2l0aW9ucyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogNFxuICAgIH0sXG4gICAgeyBidWZmZXI6IHRyaWFuZ2xlSWRzLFxuICAgICAgdHlwZTogZ2wuVU5TSUdORURfQllURSxcbiAgICAgIHNpemU6IDQsXG4gICAgICBub3JtYWxpemVkOiB0cnVlXG4gICAgfSxcbiAgICB7IGJ1ZmZlcjogdHJpYW5nbGVDb2xvcnMsXG4gICAgICB0eXBlOiBnbC5GTE9BVCxcbiAgICAgIHNpemU6IDRcbiAgICB9LFxuICAgIHsgYnVmZmVyOiB0cmlhbmdsZVVWcyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogMlxuICAgIH0sXG4gICAgeyBidWZmZXI6IHRyaWFuZ2xlVmVjdG9ycyxcbiAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgc2l6ZTogNFxuICAgIH1cbiAgXSlcblxuICB2YXIgbWVzaCA9IG5ldyBWZWN0b3JNZXNoKGdsXG4gICAgLCBtZXNoVGV4dHVyZVxuICAgICwgdHJpU2hhZGVyXG4gICAgLCBwaWNrU2hhZGVyXG4gICAgLCB0cmlhbmdsZVBvc2l0aW9uc1xuICAgICwgdHJpYW5nbGVWZWN0b3JzXG4gICAgLCB0cmlhbmdsZUlkc1xuICAgICwgdHJpYW5nbGVDb2xvcnNcbiAgICAsIHRyaWFuZ2xlVVZzXG4gICAgLCB0cmlhbmdsZVZBT1xuICAgICwgb3B0cy50cmFjZVR5cGUgfHwgJ2NvbmUnXG4gIClcblxuICBtZXNoLnVwZGF0ZShwYXJhbXMpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVWZWN0b3JNZXNoXG4iLCJ2YXIgZ2xzbGlmeSAgICAgICA9IHJlcXVpcmUoJ2dsc2xpZnknKVxuXG52YXIgdHJpVmVydFNyYyA9IGdsc2xpZnkoJy4vdHJpYW5nbGUtdmVydGV4Lmdsc2wnKVxudmFyIHRyaUZyYWdTcmMgPSBnbHNsaWZ5KCcuL3RyaWFuZ2xlLWZyYWdtZW50Lmdsc2wnKVxudmFyIHBpY2tWZXJ0U3JjID0gZ2xzbGlmeSgnLi9waWNrLXZlcnRleC5nbHNsJylcbnZhciBwaWNrRnJhZ1NyYyA9IGdsc2xpZnkoJy4vcGljay1mcmFnbWVudC5nbHNsJylcblxuZXhwb3J0cy5tZXNoU2hhZGVyID0ge1xuICB2ZXJ0ZXg6ICAgdHJpVmVydFNyYyxcbiAgZnJhZ21lbnQ6IHRyaUZyYWdTcmMsXG4gIGF0dHJpYnV0ZXM6IFtcbiAgICB7bmFtZTogJ3Bvc2l0aW9uJywgdHlwZTogJ3ZlYzQnfSxcbiAgICB7bmFtZTogJ2NvbG9yJywgdHlwZTogJ3ZlYzQnfSxcbiAgICB7bmFtZTogJ3V2JywgdHlwZTogJ3ZlYzInfSxcbiAgICB7bmFtZTogJ3ZlY3RvcicsIHR5cGU6ICd2ZWMzJ31cbiAgXVxufVxuZXhwb3J0cy5waWNrU2hhZGVyID0ge1xuICB2ZXJ0ZXg6ICAgcGlja1ZlcnRTcmMsXG4gIGZyYWdtZW50OiBwaWNrRnJhZ1NyYyxcbiAgYXR0cmlidXRlczogW1xuICAgIHtuYW1lOiAncG9zaXRpb24nLCB0eXBlOiAndmVjNCd9LFxuICAgIHtuYW1lOiAnaWQnLCB0eXBlOiAndmVjNCd9LFxuICAgIHtuYW1lOiAndmVjdG9yJywgdHlwZTogJ3ZlYzMnfVxuICBdXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFkZDtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXVxuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdXG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBhbmdsZVxuXG52YXIgZnJvbVZhbHVlcyA9IHJlcXVpcmUoJy4vZnJvbVZhbHVlcycpXG52YXIgbm9ybWFsaXplID0gcmVxdWlyZSgnLi9ub3JtYWxpemUnKVxudmFyIGRvdCA9IHJlcXVpcmUoJy4vZG90JylcblxuLyoqXG4gKiBHZXQgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIDNEIHZlY3RvcnNcbiAqIEBwYXJhbSB7dmVjM30gYSBUaGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuZnVuY3Rpb24gYW5nbGUoYSwgYikge1xuICAgIHZhciB0ZW1wQSA9IGZyb21WYWx1ZXMoYVswXSwgYVsxXSwgYVsyXSlcbiAgICB2YXIgdGVtcEIgPSBmcm9tVmFsdWVzKGJbMF0sIGJbMV0sIGJbMl0pXG4gXG4gICAgbm9ybWFsaXplKHRlbXBBLCB0ZW1wQSlcbiAgICBub3JtYWxpemUodGVtcEIsIHRlbXBCKVxuIFxuICAgIHZhciBjb3NpbmUgPSBkb3QodGVtcEEsIHRlbXBCKVxuXG4gICAgaWYoY29zaW5lID4gMS4wKXtcbiAgICAgICAgcmV0dXJuIDBcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5hY29zKGNvc2luZSlcbiAgICB9ICAgICBcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gY2VpbFxuXG4vKipcbiAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjZWlsXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIGNlaWwob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguY2VpbChhWzBdKVxuICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSlcbiAgb3V0WzJdID0gTWF0aC5jZWlsKGFbMl0pXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gY2xvbmU7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG5mdW5jdGlvbiBjbG9uZShhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMylcbiAgICBvdXRbMF0gPSBhWzBdXG4gICAgb3V0WzFdID0gYVsxXVxuICAgIG91dFsyXSA9IGFbMl1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBjb3B5O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMzIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXVxuICAgIG91dFsxXSA9IGFbMV1cbiAgICBvdXRbMl0gPSBhWzJdXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzNcbiAqXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSgzKVxuICAgIG91dFswXSA9IDBcbiAgICBvdXRbMV0gPSAwXG4gICAgb3V0WzJdID0gMFxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdGFuY2UnKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBkaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuZnVuY3Rpb24gZGlzdGFuY2UoYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdXG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopXG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RpdmlkZScpXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGRpdmlkZTtcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIGRpdmlkZShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC8gYlswXVxuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdXG4gICAgb3V0WzJdID0gYVsyXSAvIGJbMl1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSAwLjAwMDAwMVxuIiwibW9kdWxlLmV4cG9ydHMgPSBlcXVhbHNcblxudmFyIEVQU0lMT04gPSByZXF1aXJlKCcuL2Vwc2lsb24nKVxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICpcbiAqIEBwYXJhbSB7dmVjM30gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHZhciBhMCA9IGFbMF1cbiAgdmFyIGExID0gYVsxXVxuICB2YXIgYTIgPSBhWzJdXG4gIHZhciBiMCA9IGJbMF1cbiAgdmFyIGIxID0gYlsxXVxuICB2YXIgYjIgPSBiWzJdXG4gIHJldHVybiAoTWF0aC5hYnMoYTAgLSBiMCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmXG4gICAgICAgICAgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmXG4gICAgICAgICAgTWF0aC5hYnMoYTIgLSBiMikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleGFjdEVxdWFsc1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgZXhhY3RseSBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICpcbiAqIEBwYXJhbSB7dmVjM30gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZsb29yXG5cbi8qKlxuICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBmbG9vclxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBmbG9vcihvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKVxuICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pXG4gIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSlcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoO1xuXG52YXIgdmVjID0gcmVxdWlyZSgnLi9jcmVhdGUnKSgpXG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzNzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzMuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMzcyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICAgICAgdmFyIGksIGxcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gM1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gMFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihjb3VudCkge1xuICAgICAgICAgICAgbCA9IE1hdGgubWluKChjb3VudCAqIHN0cmlkZSkgKyBvZmZzZXQsIGEubGVuZ3RoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoXG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgICAgICB2ZWNbMF0gPSBhW2ldIFxuICAgICAgICAgICAgdmVjWzFdID0gYVtpKzFdIFxuICAgICAgICAgICAgdmVjWzJdID0gYVtpKzJdXG4gICAgICAgICAgICBmbih2ZWMsIHZlYywgYXJnKVxuICAgICAgICAgICAgYVtpXSA9IHZlY1swXSBcbiAgICAgICAgICAgIGFbaSsxXSA9IHZlY1sxXSBcbiAgICAgICAgICAgIGFbaSsyXSA9IHZlY1syXVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYVxufSIsIm1vZHVsZS5leHBvcnRzID0gZnJvbVZhbHVlcztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG5mdW5jdGlvbiBmcm9tVmFsdWVzKHgsIHksIHopIHtcbiAgICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSgzKVxuICAgIG91dFswXSA9IHhcbiAgICBvdXRbMV0gPSB5XG4gICAgb3V0WzJdID0gelxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgRVBTSUxPTjogcmVxdWlyZSgnLi9lcHNpbG9uJylcbiAgLCBjcmVhdGU6IHJlcXVpcmUoJy4vY3JlYXRlJylcbiAgLCBjbG9uZTogcmVxdWlyZSgnLi9jbG9uZScpXG4gICwgYW5nbGU6IHJlcXVpcmUoJy4vYW5nbGUnKVxuICAsIGZyb21WYWx1ZXM6IHJlcXVpcmUoJy4vZnJvbVZhbHVlcycpXG4gICwgY29weTogcmVxdWlyZSgnLi9jb3B5JylcbiAgLCBzZXQ6IHJlcXVpcmUoJy4vc2V0JylcbiAgLCBlcXVhbHM6IHJlcXVpcmUoJy4vZXF1YWxzJylcbiAgLCBleGFjdEVxdWFsczogcmVxdWlyZSgnLi9leGFjdEVxdWFscycpXG4gICwgYWRkOiByZXF1aXJlKCcuL2FkZCcpXG4gICwgc3VidHJhY3Q6IHJlcXVpcmUoJy4vc3VidHJhY3QnKVxuICAsIHN1YjogcmVxdWlyZSgnLi9zdWInKVxuICAsIG11bHRpcGx5OiByZXF1aXJlKCcuL211bHRpcGx5JylcbiAgLCBtdWw6IHJlcXVpcmUoJy4vbXVsJylcbiAgLCBkaXZpZGU6IHJlcXVpcmUoJy4vZGl2aWRlJylcbiAgLCBkaXY6IHJlcXVpcmUoJy4vZGl2JylcbiAgLCBtaW46IHJlcXVpcmUoJy4vbWluJylcbiAgLCBtYXg6IHJlcXVpcmUoJy4vbWF4JylcbiAgLCBmbG9vcjogcmVxdWlyZSgnLi9mbG9vcicpXG4gICwgY2VpbDogcmVxdWlyZSgnLi9jZWlsJylcbiAgLCByb3VuZDogcmVxdWlyZSgnLi9yb3VuZCcpXG4gICwgc2NhbGU6IHJlcXVpcmUoJy4vc2NhbGUnKVxuICAsIHNjYWxlQW5kQWRkOiByZXF1aXJlKCcuL3NjYWxlQW5kQWRkJylcbiAgLCBkaXN0YW5jZTogcmVxdWlyZSgnLi9kaXN0YW5jZScpXG4gICwgZGlzdDogcmVxdWlyZSgnLi9kaXN0JylcbiAgLCBzcXVhcmVkRGlzdGFuY2U6IHJlcXVpcmUoJy4vc3F1YXJlZERpc3RhbmNlJylcbiAgLCBzcXJEaXN0OiByZXF1aXJlKCcuL3NxckRpc3QnKVxuICAsIGxlbmd0aDogcmVxdWlyZSgnLi9sZW5ndGgnKVxuICAsIGxlbjogcmVxdWlyZSgnLi9sZW4nKVxuICAsIHNxdWFyZWRMZW5ndGg6IHJlcXVpcmUoJy4vc3F1YXJlZExlbmd0aCcpXG4gICwgc3FyTGVuOiByZXF1aXJlKCcuL3NxckxlbicpXG4gICwgbmVnYXRlOiByZXF1aXJlKCcuL25lZ2F0ZScpXG4gICwgaW52ZXJzZTogcmVxdWlyZSgnLi9pbnZlcnNlJylcbiAgLCBub3JtYWxpemU6IHJlcXVpcmUoJy4vbm9ybWFsaXplJylcbiAgLCBkb3Q6IHJlcXVpcmUoJy4vZG90JylcbiAgLCBjcm9zczogcmVxdWlyZSgnLi9jcm9zcycpXG4gICwgbGVycDogcmVxdWlyZSgnLi9sZXJwJylcbiAgLCByYW5kb206IHJlcXVpcmUoJy4vcmFuZG9tJylcbiAgLCB0cmFuc2Zvcm1NYXQ0OiByZXF1aXJlKCcuL3RyYW5zZm9ybU1hdDQnKVxuICAsIHRyYW5zZm9ybU1hdDM6IHJlcXVpcmUoJy4vdHJhbnNmb3JtTWF0MycpXG4gICwgdHJhbnNmb3JtUXVhdDogcmVxdWlyZSgnLi90cmFuc2Zvcm1RdWF0JylcbiAgLCByb3RhdGVYOiByZXF1aXJlKCcuL3JvdGF0ZVgnKVxuICAsIHJvdGF0ZVk6IHJlcXVpcmUoJy4vcm90YXRlWScpXG4gICwgcm90YXRlWjogcmVxdWlyZSgnLi9yb3RhdGVaJylcbiAgLCBmb3JFYWNoOiByZXF1aXJlKCcuL2ZvckVhY2gnKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpbnZlcnNlO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIGludmVyc2Uob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF1cbiAgb3V0WzFdID0gMS4wIC8gYVsxXVxuICBvdXRbMl0gPSAxLjAgLyBhWzJdXG4gIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGVuZ3RoJylcbiIsIm1vZHVsZS5leHBvcnRzID0gbWF4O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pXG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSlcbiAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IG1pbjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKVxuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pXG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSlcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL211bHRpcGx5JylcbiIsIm1vZHVsZS5leHBvcnRzID0gbXVsdGlwbHk7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYlswXVxuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdXG4gICAgb3V0WzJdID0gYVsyXSAqIGJbMl1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBuZWdhdGU7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gbmVnYXRlKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdXG4gICAgb3V0WzFdID0gLWFbMV1cbiAgICBvdXRbMl0gPSAtYVsyXVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJhbmRvbTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiByYW5kb20ob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wXG5cbiAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkgKiAyLjAgKiBNYXRoLlBJXG4gICAgdmFyIHogPSAoTWF0aC5yYW5kb20oKSAqIDIuMCkgLSAxLjBcbiAgICB2YXIgelNjYWxlID0gTWF0aC5zcXJ0KDEuMC16KnopICogc2NhbGVcblxuICAgIG91dFswXSA9IE1hdGguY29zKHIpICogelNjYWxlXG4gICAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiB6U2NhbGVcbiAgICBvdXRbMl0gPSB6ICogc2NhbGVcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGVYO1xuXG4vKipcbiAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHgtYXhpc1xuICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4gKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBhbmdsZSBvZiByb3RhdGlvblxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiByb3RhdGVYKG91dCwgYSwgYiwgYyl7XG4gICAgdmFyIGJ5ID0gYlsxXVxuICAgIHZhciBieiA9IGJbMl1cblxuICAgIC8vIFRyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgdmFyIHB5ID0gYVsxXSAtIGJ5XG4gICAgdmFyIHB6ID0gYVsyXSAtIGJ6XG5cbiAgICB2YXIgc2MgPSBNYXRoLnNpbihjKVxuICAgIHZhciBjYyA9IE1hdGguY29zKGMpXG5cbiAgICAvLyBwZXJmb3JtIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICAgIG91dFswXSA9IGFbMF1cbiAgICBvdXRbMV0gPSBieSArIHB5ICogY2MgLSBweiAqIHNjXG4gICAgb3V0WzJdID0gYnogKyBweSAqIHNjICsgcHogKiBjY1xuXG4gICAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGVZO1xuXG4vKipcbiAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHktYXhpc1xuICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4gKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge3ZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBhbmdsZSBvZiByb3RhdGlvblxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgYiwgYyl7XG4gICAgdmFyIGJ4ID0gYlswXVxuICAgIHZhciBieiA9IGJbMl1cblxuICAgIC8vIHRyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgdmFyIHB4ID0gYVswXSAtIGJ4XG4gICAgdmFyIHB6ID0gYVsyXSAtIGJ6XG4gICAgXG4gICAgdmFyIHNjID0gTWF0aC5zaW4oYylcbiAgICB2YXIgY2MgPSBNYXRoLmNvcyhjKVxuICBcbiAgICAvLyBwZXJmb3JtIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICAgIG91dFswXSA9IGJ4ICsgcHogKiBzYyArIHB4ICogY2NcbiAgICBvdXRbMV0gPSBhWzFdXG4gICAgb3V0WzJdID0gYnogKyBweiAqIGNjIC0gcHggKiBzY1xuICBcbiAgICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJvdGF0ZVo7XG5cbi8qKlxuICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgei1heGlzXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiAqIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiAqIEBwYXJhbSB7dmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZVoob3V0LCBhLCBiLCBjKXtcbiAgICB2YXIgYnggPSBiWzBdXG4gICAgdmFyIGJ5ID0gYlsxXVxuXG4gICAgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuICAgIHZhciBweCA9IGFbMF0gLSBieFxuICAgIHZhciBweSA9IGFbMV0gLSBieVxuICBcbiAgICB2YXIgc2MgPSBNYXRoLnNpbihjKVxuICAgIHZhciBjYyA9IE1hdGguY29zKGMpXG5cbiAgICAvLyBwZXJmb3JtIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICAgIG91dFswXSA9IGJ4ICsgcHggKiBjYyAtIHB5ICogc2NcbiAgICBvdXRbMV0gPSBieSArIHB4ICogc2MgKyBweSAqIGNjXG4gICAgb3V0WzJdID0gYVsyXVxuICBcbiAgICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJvdW5kXG5cbi8qKlxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byByb3VuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiByb3VuZChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5yb3VuZChhWzBdKVxuICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pXG4gIG91dFsyXSA9IE1hdGgucm91bmQoYVsyXSlcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZTtcblxuLyoqXG4gKiBTY2FsZXMgYSB2ZWMzIGJ5IGEgc2NhbGFyIG51bWJlclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gc2NhbGUob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJcbiAgICBvdXRbMV0gPSBhWzFdICogYlxuICAgIG91dFsyXSA9IGFbMl0gKiBiXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gc2NhbGVBbmRBZGQ7XG5cbi8qKlxuICogQWRkcyB0d28gdmVjMydzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHNjYWxlQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSlcbiAgICBvdXRbMV0gPSBhWzFdICsgKGJbMV0gKiBzY2FsZSlcbiAgICBvdXRbMl0gPSBhWzJdICsgKGJbMl0gKiBzY2FsZSlcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBzZXQ7XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMyB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gc2V0KG91dCwgeCwgeSwgeikge1xuICAgIG91dFswXSA9IHhcbiAgICBvdXRbMV0gPSB5XG4gICAgb3V0WzJdID0gelxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3F1YXJlZERpc3RhbmNlJylcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcXVhcmVkTGVuZ3RoJylcbiIsIm1vZHVsZS5leHBvcnRzID0gc3F1YXJlZERpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuZnVuY3Rpb24gc3F1YXJlZERpc3RhbmNlKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgICAgIHogPSBiWzJdIC0gYVsyXVxuICAgIHJldHVybiB4KnggKyB5KnkgKyB6Knpcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xuZnVuY3Rpb24gc3F1YXJlZExlbmd0aChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl1cbiAgICByZXR1cm4geCp4ICsgeSp5ICsgeip6XG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3N1YnRyYWN0JylcbiIsIm1vZHVsZS5leHBvcnRzID0gc3VidHJhY3Q7XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdXG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV1cbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHRyYW5zZm9ybU1hdDM7XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0My5cbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gdGhlIDN4MyBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtTWF0MyhvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXVxuICAgIG91dFswXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyB6ICogbVs2XVxuICAgIG91dFsxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyB6ICogbVs3XVxuICAgIG91dFsyXSA9IHggKiBtWzJdICsgeSAqIG1bNV0gKyB6ICogbVs4XVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHRyYW5zZm9ybU1hdDQ7XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0NC5cbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1NYXQ0KG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLFxuICAgICAgICB3ID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdXG4gICAgdyA9IHcgfHwgMS4wXG4gICAgb3V0WzBdID0gKG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdKSAvIHdcbiAgICBvdXRbMV0gPSAobVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10pIC8gd1xuICAgIG91dFsyXSA9IChtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6ICsgbVsxNF0pIC8gd1xuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHRyYW5zZm9ybVF1YXQ7XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7cXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybVF1YXQob3V0LCBhLCBxKSB7XG4gICAgLy8gYmVuY2htYXJrczogaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tdmVjMy1pbXBsZW1lbnRhdGlvbnNcblxuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLFxuICAgICAgICBxeCA9IHFbMF0sIHF5ID0gcVsxXSwgcXogPSBxWzJdLCBxdyA9IHFbM10sXG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcbiAgICAgICAgaXggPSBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHksXG4gICAgICAgIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6LFxuICAgICAgICBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeCxcbiAgICAgICAgaXcgPSAtcXggKiB4IC0gcXkgKiB5IC0gcXogKiB6XG5cbiAgICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG4gICAgb3V0WzBdID0gaXggKiBxdyArIGl3ICogLXF4ICsgaXkgKiAtcXogLSBpeiAqIC1xeVxuICAgIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXpcbiAgICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4XG4gICAgcmV0dXJuIG91dFxufSJdLCJzb3VyY2VSb290IjoiIn0=