(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_streamtube_js"],{

/***/ "./node_modules/gl-streamtube3d/lib/shaders.js":
/*!*****************************************************!*\
  !*** ./node_modules/gl-streamtube3d/lib/shaders.js ***!
  \*****************************************************/
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
    {name: 'vector', type: 'vec4'}
  ]
}
exports.pickShader = {
  vertex:   pickVertSrc,
  fragment: pickFragSrc,
  attributes: [
    {name: 'position', type: 'vec4'},
    {name: 'id', type: 'vec4'},
    {name: 'vector', type: 'vec4'}
  ]
}


/***/ }),

/***/ "./node_modules/gl-streamtube3d/streamtube.js":
/*!****************************************************!*\
  !*** ./node_modules/gl-streamtube3d/streamtube.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var vec3 = __webpack_require__(/*! gl-vec3 */ "./node_modules/gl-vec3/index.js");
var vec4 = __webpack_require__(/*! gl-vec4 */ "./node_modules/gl-vec4/index.js");
var GRID_TYPES = ['xyz', 'xzy', 'yxz', 'yzx', 'zxy', 'zyx'];

var streamToTube = function(stream, maxDivergence, minDistance, maxNorm) {
	var points = stream.points;
	var velocities = stream.velocities;
	var divergences = stream.divergences;

	var verts = [];
	var faces = [];
	var vectors = [];
	var previousVerts = [];
	var currentVerts = [];
	var intensities = [];
	var previousIntensity = 0;
	var currentIntensity = 0;
	var currentVector = vec4.create();
	var previousVector = vec4.create();

	var facets = 8;

	for (var i = 0; i < points.length; i++) {
		var p = points[i];
		var fwd = velocities[i];
		var r = divergences[i];
		if (maxDivergence === 0) {
			r = minDistance * 0.05;
		}
		currentIntensity = vec3.length(fwd) / maxNorm;

		currentVector = vec4.create();
		vec3.copy(currentVector, fwd);
		currentVector[3] = r;

		for (var a = 0; a < facets; a++) {
			currentVerts[a] = [p[0], p[1], p[2], a];
		}
		if (previousVerts.length > 0) {
			for (var a = 0; a < facets; a++) {
				var a1 = (a+1) % facets;
				verts.push(
					previousVerts[a],
					currentVerts[a],
					currentVerts[a1],

					currentVerts[a1],
					previousVerts[a1],
					previousVerts[a]
				);
				vectors.push(
					previousVector,
					currentVector,
					currentVector,

					currentVector,
					previousVector,
					previousVector
				);
				intensities.push(
					previousIntensity,
					currentIntensity,
					currentIntensity,

					currentIntensity,
					previousIntensity,
					previousIntensity
				);

				var len = verts.length;
				faces.push(
					[len-6, len-5, len-4],
					[len-3, len-2, len-1]
				);
			}
		}
		var tmp1 = previousVerts;
		previousVerts = currentVerts;
		currentVerts = tmp1;

		var tmp2 = previousVector;
		previousVector = currentVector;
		currentVector = tmp2;

		var tmp3 = previousIntensity;
		previousIntensity = currentIntensity;
		currentIntensity = tmp3;
	}
	return {
		positions: verts,
		cells: faces,
		vectors: vectors,
		vertexIntensity: intensities
	};
};

var createTubes = function(streams, colormap, maxDivergence, minDistance) {

	var maxNorm = 0;
	for (var i=0; i<streams.length; i++) {
		var velocities = streams[i].velocities;
		for (var j=0; j<velocities.length; j++) {
			maxNorm = Math.max(maxNorm,
				vec3.length(velocities[j])
			);
		}
	}

	var tubes = streams.map(function(s) {
		return streamToTube(s, maxDivergence, minDistance, maxNorm);
	});

	var positions = [];
	var cells = [];
	var vectors = [];
	var vertexIntensity = [];
	for (var i=0; i < tubes.length; i++) {
		var tube = tubes[i];
		var offset = positions.length;
		positions = positions.concat(tube.positions);
		vectors = vectors.concat(tube.vectors);
		vertexIntensity = vertexIntensity.concat(tube.vertexIntensity);
		for (var j=0; j<tube.cells.length; j++) {
			var cell = tube.cells[j];
			var newCell = [];
			cells.push(newCell);
			for (var k=0; k<cell.length; k++) {
				newCell.push(cell[k] + offset);
			}
		}
	}
	return {
		positions: positions,
		cells: cells,
		vectors: vectors,
		vertexIntensity: vertexIntensity,
		colormap: colormap
	};
};

var findLastSmallerIndex = function(points, v) {
  var len = points.length;
  var i;
  for (i=0; i<len; i++) {
  	var p = points[i];
  	if (p === v) return i;
    else if (p > v) return i-1;
  }
  return i;
};

var clamp = function(v, min, max) {
	return v < min ? min : (v > max ? max : v);
};

var sampleMeshgrid = function(point, vectorField, gridInfo) {
	var vectors = vectorField.vectors;
	var meshgrid = vectorField.meshgrid;

	var x = point[0];
	var y = point[1];
	var z = point[2];

	var w = meshgrid[0].length;
	var h = meshgrid[1].length;
	var d = meshgrid[2].length;

	// Find the index of the nearest smaller value in the meshgrid for each coordinate of (x,y,z).
	// The nearest smaller value index for x is the index x0 such that
	// meshgrid[0][x0] < x and for all x1 > x0, meshgrid[0][x1] >= x.
	var x0 = findLastSmallerIndex(meshgrid[0], x);
	var y0 = findLastSmallerIndex(meshgrid[1], y);
	var z0 = findLastSmallerIndex(meshgrid[2], z);

	// Get the nearest larger meshgrid value indices.
	// From the above "nearest smaller value", we know that
	//   meshgrid[0][x0] < x
	//   meshgrid[0][x0+1] >= x
	var x1 = x0 + 1;
	var y1 = y0 + 1;
	var z1 = z0 + 1;

	x0 = clamp(x0, 0, w-1);
	x1 = clamp(x1, 0, w-1);
	y0 = clamp(y0, 0, h-1);
	y1 = clamp(y1, 0, h-1);
	z0 = clamp(z0, 0, d-1);
	z1 = clamp(z1, 0, d-1);

	// Reject points outside the meshgrid, return a zero vector.
	if (x0 < 0 || y0 < 0 || z0 < 0 || x1 > w-1 || y1 > h-1 || z1 > d-1) {
		return vec3.create();
	}

	// Normalize point coordinates to 0..1 scaling factor between x0 and x1.
	var mX0 = meshgrid[0][x0];
	var mX1 = meshgrid[0][x1];
	var mY0 = meshgrid[1][y0];
	var mY1 = meshgrid[1][y1];
	var mZ0 = meshgrid[2][z0];
	var mZ1 = meshgrid[2][z1];
	var xf = (x - mX0) / (mX1 - mX0);
	var yf = (y - mY0) / (mY1 - mY0);
	var zf = (z - mZ0) / (mZ1 - mZ0);

	if (!isFinite(xf)) xf = 0.5;
	if (!isFinite(yf)) yf = 0.5;
	if (!isFinite(zf)) zf = 0.5;

	var x0off;
	var x1off;
	var y0off;
	var y1off;
	var z0off;
	var z1off;

	if(gridInfo.reversedX) {
		x0 = w - 1 - x0;
		x1 = w - 1 - x1;
	}

	if(gridInfo.reversedY) {
		y0 = h - 1 - y0;
		y1 = h - 1 - y1;
	}

	if(gridInfo.reversedZ) {
		z0 = d - 1 - z0;
		z1 = d - 1 - z1;
	}

	switch(gridInfo.filled) {
		case 5: // 'zyx'
			z0off = z0;
			z1off = z1;
			y0off = y0*d;
			y1off = y1*d;
			x0off = x0*d*h;
			x1off = x1*d*h;
			break;

		case 4: // 'zxy'
			z0off = z0;
			z1off = z1;
			x0off = x0*d;
			x1off = x1*d;
			y0off = y0*d*w;
			y1off = y1*d*w;
			break;

		case 3: // 'yzx'
			y0off = y0;
			y1off = y1;
			z0off = z0*h;
			z1off = z1*h;
			x0off = x0*h*d;
			x1off = x1*h*d;
			break;

		case 2: // 'yxz'
			y0off = y0;
			y1off = y1;
			x0off = x0*h;
			x1off = x1*h;
			z0off = z0*h*w;
			z1off = z1*h*w;
			break;

		case 1: // 'xzy'
			x0off = x0;
			x1off = x1;
			z0off = z0*w;
			z1off = z1*w;
			y0off = y0*w*d;
			y1off = y1*w*d;
			break;

		default: // case 0: // 'xyz'
			x0off = x0;
			x1off = x1;
			y0off = y0*w;
			y1off = y1*w;
			z0off = z0*w*h;
			z1off = z1*w*h;
			break;
	}

	// Sample data vectors around the (x,y,z) point.
	var v000 = vectors[x0off + y0off + z0off];
	var v001 = vectors[x0off + y0off + z1off];
	var v010 = vectors[x0off + y1off + z0off];
	var v011 = vectors[x0off + y1off + z1off];
	var v100 = vectors[x1off + y0off + z0off];
	var v101 = vectors[x1off + y0off + z1off];
	var v110 = vectors[x1off + y1off + z0off];
	var v111 = vectors[x1off + y1off + z1off];

	var c00 = vec3.create();
	var c01 = vec3.create();
	var c10 = vec3.create();
	var c11 = vec3.create();

	vec3.lerp(c00, v000, v100, xf);
	vec3.lerp(c01, v001, v101, xf);
	vec3.lerp(c10, v010, v110, xf);
	vec3.lerp(c11, v011, v111, xf);

	var c0 = vec3.create();
	var c1 = vec3.create();

	vec3.lerp(c0, c00, c10, yf);
	vec3.lerp(c1, c01, c11, yf);

	var c = vec3.create();

	vec3.lerp(c, c0, c1, zf);

	return c;
};


var vabs = function(dst, v) {
	var x = v[0];
	var y = v[1];
	var z = v[2];
	dst[0] = x < 0 ? -x : x;
	dst[1] = y < 0 ? -y : y;
	dst[2] = z < 0 ? -z : z;
	return dst;
};

var findMinSeparation = function(xs) {
	var minSeparation = Infinity;
	xs.sort(function(a, b) { return a - b; });
	var len = xs.length;
	for (var i=1; i<len; i++) {
		var d = Math.abs(xs[i] - xs[i-1]);
		if (d < minSeparation) {
			minSeparation = d;
		}
	}
	return minSeparation;
};

// Finds the minimum per-component distance in positions.
//
var calculateMinPositionDistance = function(positions) {
	var xs = [], ys = [], zs = [];
	var xi = {}, yi = {}, zi = {};
	var len = positions.length;
	for (var i=0; i<len; i++) {
		var p = positions[i];
		var x = p[0], y = p[1], z = p[2];

		// Split the positions array into arrays of unique component values.
		//
		// Why go through the trouble of using a uniqueness hash table vs
		// sort and uniq:
		//
		// Suppose you've got a million positions in a 100x100x100 grid.
		//
		// Using a uniqueness hash table, you're doing 1M array reads,
		// 3M hash table lookups from 100-element hashes, 300 hash table inserts, then
		// sorting three 100-element arrays and iterating over them.
		// Roughly, 1M + 3M * ln(100) + 300 * ln(100/2) + 3 * 100 * ln(100) + 3 * 100 =
		//          1M + 13.8M + 0.0012M +  0.0014M + 0.0003M
		//          =~ 15M
		//
		// Sort and uniq solution would do 1M array reads, 3M array inserts,
		// sort three 1M-element arrays and iterate over them.
		// Roughly, 1M + 3M + 3 * 1M * ln(1M) + 3 * 1M =
		//          1M + 3M + 41.4M + 3M
		//          =~ 48.4M
		//
		// Guessing that a hard-coded sort & uniq would be faster due to not having
		// to run a hashing function on everything. More memory usage though
		// (bunch of small hash tables vs. duplicating the input array.)
		//
		// In JS-land, who knows. Maybe xi[x] casts x to string and destroys perf,
		// maybe numeric keys get special-cased, maybe the object lookups run at near O(1)-speeds.
		// Maybe the sorting comparison function is expensive to call, maybe it gets inlined or special-cased.
		//
		// ... You're probably not going to call this with more than 10k positions anyhow, so this is very academic.
		//
		if (!xi[x]) {
			xs.push(x);
			xi[x] = true;
		}
		if (!yi[y]) {
			ys.push(y);
			yi[y] = true;
		}
		if (!zi[z]) {
			zs.push(z);
			zi[z] = true;
		}
	}
	var xSep = findMinSeparation(xs);
	var ySep = findMinSeparation(ys);
	var zSep = findMinSeparation(zs);
	var minSeparation = Math.min(xSep, ySep, zSep);

	return isFinite(minSeparation) ? minSeparation : 1;
};

module.exports = function(vectorField, bounds) {
	var positions = vectorField.startingPositions;
	var maxLength = vectorField.maxLength || 1000;
	var tubeSize = vectorField.tubeSize || 1;
	var absoluteTubeSize = vectorField.absoluteTubeSize;
	var gridFill = vectorField.gridFill || '+x+y+z';

	var gridInfo = {};
	if(gridFill.indexOf('-x') !== -1) { gridInfo.reversedX = true; }
	if(gridFill.indexOf('-y') !== -1) { gridInfo.reversedY = true; }
	if(gridFill.indexOf('-z') !== -1) { gridInfo.reversedZ = true; }
	gridInfo.filled = GRID_TYPES.indexOf(gridFill.replace(/-/g, '').replace(/\+/g, ''));

	var getVelocity = vectorField.getVelocity || function(p) {
		return sampleMeshgrid(p, vectorField, gridInfo);
	};

	var getDivergence = vectorField.getDivergence || function(p, v0) {
		var dp = vec3.create();
		var e = 0.0001;

		vec3.add(dp, p, [e, 0, 0]);
		var vx = getVelocity(dp);
		vec3.subtract(vx, vx, v0);
		vec3.scale(vx, vx, 1/e);

		vec3.add(dp, p, [0, e, 0]);
		var vy = getVelocity(dp);
		vec3.subtract(vy, vy, v0);
		vec3.scale(vy, vy, 1/e);

		vec3.add(dp, p, [0, 0, e]);
		var vz = getVelocity(dp);
		vec3.subtract(vz, vz, v0);
		vec3.scale(vz, vz, 1/e);

		vec3.add(dp, vx, vy);
		vec3.add(dp, dp, vz);
		return dp;
	};

	var streams = [];

	var minX = bounds[0][0], minY = bounds[0][1], minZ = bounds[0][2];
	var maxX = bounds[1][0], maxY = bounds[1][1], maxZ = bounds[1][2];

	var inBounds = function(p) {
		var x = p[0];
		var y = p[1];
		var z = p[2];
		return !(
			x < minX || x > maxX ||
			y < minY || y > maxY ||
			z < minZ || z > maxZ
		);
	};

	var boundsSize = vec3.distance(bounds[0], bounds[1]);
	var maxStepSize = 10 * boundsSize / maxLength;
	var maxStepSizeSq = maxStepSize * maxStepSize;

	var minDistance = 1;
	var maxDivergence = 0; // For component-wise divergence vec3.create();

	// In case we need to do component-wise divergence visualization
	// var tmp = vec3.create();

	var len = positions.length;
	if (len > 1) {
		minDistance = calculateMinPositionDistance(positions);
	}

	for (var i = 0; i < len; i++) {
		var p = vec3.create();
		vec3.copy(p, positions[i]);

		var stream = [p];
		var velocities = [];
		var v = getVelocity(p);
		var op = p;
		velocities.push(v);

		var divergences = [];

		var dv = getDivergence(p, v);
		var dvLength = vec3.length(dv);
		if (isFinite(dvLength) && dvLength > maxDivergence) {
			maxDivergence = dvLength;
		}
		// In case we need to do component-wise divergence visualization
		// vec3.max(maxDivergence, maxDivergence, vabs(tmp, dv));
		divergences.push(dvLength);

		streams.push({points: stream, velocities: velocities, divergences: divergences});

		var j = 0;

		while (j < maxLength * 100 && stream.length < maxLength && inBounds(p)) {
			j++;
			var np = vec3.clone(v);
			var sqLen = vec3.squaredLength(np);
			if (sqLen === 0) {
				break;
			} else if (sqLen > maxStepSizeSq) {
				vec3.scale(np, np, maxStepSize / Math.sqrt(sqLen));
			}
			vec3.add(np, np, p);

			v = getVelocity(np);

			if (vec3.squaredDistance(op, np) - maxStepSizeSq > -0.0001 * maxStepSizeSq) {
				stream.push(np);
				op = np;
				velocities.push(v);
				var dv = getDivergence(np, v);
				var dvLength = vec3.length(dv);
				if (isFinite(dvLength) && dvLength > maxDivergence) {
					maxDivergence = dvLength;
				}
				// In case we need to do component-wise divergence visualization
				//vec3.max(maxDivergence, maxDivergence, vabs(tmp, dv));
				divergences.push(dvLength);
			}

			p = np;
		}
	}

	var tubes = createTubes(streams, vectorField.colormap, maxDivergence, minDistance);

	if (absoluteTubeSize) {
		tubes.tubeScale = absoluteTubeSize;
	} else {
		// Avoid division by zero.
		if (maxDivergence === 0) {
			maxDivergence = 1;
		}
		tubes.tubeScale = tubeSize * 0.5 * minDistance / maxDivergence;
	}

	return tubes;
};

var shaders = __webpack_require__(/*! ./lib/shaders */ "./node_modules/gl-streamtube3d/lib/shaders.js");
var createMesh = __webpack_require__(/*! gl-cone3d */ "./node_modules/gl-cone3d/cone.js").createMesh;
module.exports.createTubeMesh = function(gl, params) {
	return createMesh(gl, params, {
		shaders: shaders,
		traceType: 'streamtube'
	});
}


/***/ }),

/***/ "./node_modules/gl-vec4/add.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec4/add.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = add

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function add (out, a, b) {
  out[0] = a[0] + b[0]
  out[1] = a[1] + b[1]
  out[2] = a[2] + b[2]
  out[3] = a[3] + b[3]
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/clone.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec4/clone.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = clone

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
function clone (a) {
  var out = new Float32Array(4)
  out[0] = a[0]
  out[1] = a[1]
  out[2] = a[2]
  out[3] = a[3]
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/copy.js":
/*!**************************************!*\
  !*** ./node_modules/gl-vec4/copy.js ***!
  \**************************************/
/***/ ((module) => {

module.exports = copy

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
function copy (out, a) {
  out[0] = a[0]
  out[1] = a[1]
  out[2] = a[2]
  out[3] = a[3]
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/create.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec4/create.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = create

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create () {
  var out = new Float32Array(4)
  out[0] = 0
  out[1] = 0
  out[2] = 0
  out[3] = 0
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/distance.js":
/*!******************************************!*\
  !*** ./node_modules/gl-vec4/distance.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = distance

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
function distance (a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1],
    z = b[2] - a[2],
    w = b[3] - a[3]
  return Math.sqrt(x * x + y * y + z * z + w * w)
}


/***/ }),

/***/ "./node_modules/gl-vec4/divide.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec4/divide.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = divide

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function divide (out, a, b) {
  out[0] = a[0] / b[0]
  out[1] = a[1] / b[1]
  out[2] = a[2] / b[2]
  out[3] = a[3] / b[3]
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/dot.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec4/dot.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = dot

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot (a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
}


/***/ }),

/***/ "./node_modules/gl-vec4/fromValues.js":
/*!********************************************!*\
  !*** ./node_modules/gl-vec4/fromValues.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = fromValues

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
function fromValues (x, y, z, w) {
  var out = new Float32Array(4)
  out[0] = x
  out[1] = y
  out[2] = z
  out[3] = w
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/index.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec4/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  create: __webpack_require__(/*! ./create */ "./node_modules/gl-vec4/create.js"),
  clone: __webpack_require__(/*! ./clone */ "./node_modules/gl-vec4/clone.js"),
  fromValues: __webpack_require__(/*! ./fromValues */ "./node_modules/gl-vec4/fromValues.js"),
  copy: __webpack_require__(/*! ./copy */ "./node_modules/gl-vec4/copy.js"),
  set: __webpack_require__(/*! ./set */ "./node_modules/gl-vec4/set.js"),
  add: __webpack_require__(/*! ./add */ "./node_modules/gl-vec4/add.js"),
  subtract: __webpack_require__(/*! ./subtract */ "./node_modules/gl-vec4/subtract.js"),
  multiply: __webpack_require__(/*! ./multiply */ "./node_modules/gl-vec4/multiply.js"),
  divide: __webpack_require__(/*! ./divide */ "./node_modules/gl-vec4/divide.js"),
  min: __webpack_require__(/*! ./min */ "./node_modules/gl-vec4/min.js"),
  max: __webpack_require__(/*! ./max */ "./node_modules/gl-vec4/max.js"),
  scale: __webpack_require__(/*! ./scale */ "./node_modules/gl-vec4/scale.js"),
  scaleAndAdd: __webpack_require__(/*! ./scaleAndAdd */ "./node_modules/gl-vec4/scaleAndAdd.js"),
  distance: __webpack_require__(/*! ./distance */ "./node_modules/gl-vec4/distance.js"),
  squaredDistance: __webpack_require__(/*! ./squaredDistance */ "./node_modules/gl-vec4/squaredDistance.js"),
  length: __webpack_require__(/*! ./length */ "./node_modules/gl-vec4/length.js"),
  squaredLength: __webpack_require__(/*! ./squaredLength */ "./node_modules/gl-vec4/squaredLength.js"),
  negate: __webpack_require__(/*! ./negate */ "./node_modules/gl-vec4/negate.js"),
  inverse: __webpack_require__(/*! ./inverse */ "./node_modules/gl-vec4/inverse.js"),
  normalize: __webpack_require__(/*! ./normalize */ "./node_modules/gl-vec4/normalize.js"),
  dot: __webpack_require__(/*! ./dot */ "./node_modules/gl-vec4/dot.js"),
  lerp: __webpack_require__(/*! ./lerp */ "./node_modules/gl-vec4/lerp.js"),
  random: __webpack_require__(/*! ./random */ "./node_modules/gl-vec4/random.js"),
  transformMat4: __webpack_require__(/*! ./transformMat4 */ "./node_modules/gl-vec4/transformMat4.js"),
  transformQuat: __webpack_require__(/*! ./transformQuat */ "./node_modules/gl-vec4/transformQuat.js")
}


/***/ }),

/***/ "./node_modules/gl-vec4/inverse.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-vec4/inverse.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = inverse

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
function inverse (out, a) {
  out[0] = 1.0 / a[0]
  out[1] = 1.0 / a[1]
  out[2] = 1.0 / a[2]
  out[3] = 1.0 / a[3]
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/length.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec4/length.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = length

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function length (a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3]
  return Math.sqrt(x * x + y * y + z * z + w * w)
}


/***/ }),

/***/ "./node_modules/gl-vec4/lerp.js":
/*!**************************************!*\
  !*** ./node_modules/gl-vec4/lerp.js ***!
  \**************************************/
/***/ ((module) => {

module.exports = lerp

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
function lerp (out, a, b, t) {
  var ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3]
  out[0] = ax + t * (b[0] - ax)
  out[1] = ay + t * (b[1] - ay)
  out[2] = az + t * (b[2] - az)
  out[3] = aw + t * (b[3] - aw)
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/max.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec4/max.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = max

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function max (out, a, b) {
  out[0] = Math.max(a[0], b[0])
  out[1] = Math.max(a[1], b[1])
  out[2] = Math.max(a[2], b[2])
  out[3] = Math.max(a[3], b[3])
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/min.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec4/min.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = min

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function min (out, a, b) {
  out[0] = Math.min(a[0], b[0])
  out[1] = Math.min(a[1], b[1])
  out[2] = Math.min(a[2], b[2])
  out[3] = Math.min(a[3], b[3])
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/multiply.js":
/*!******************************************!*\
  !*** ./node_modules/gl-vec4/multiply.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = multiply

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function multiply (out, a, b) {
  out[0] = a[0] * b[0]
  out[1] = a[1] * b[1]
  out[2] = a[2] * b[2]
  out[3] = a[3] * b[3]
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/negate.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec4/negate.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = negate

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
function negate (out, a) {
  out[0] = -a[0]
  out[1] = -a[1]
  out[2] = -a[2]
  out[3] = -a[3]
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/normalize.js":
/*!*******************************************!*\
  !*** ./node_modules/gl-vec4/normalize.js ***!
  \*******************************************/
/***/ ((module) => {

module.exports = normalize

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize (out, a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3]
  var len = x * x + y * y + z * z + w * w
  if (len > 0) {
    len = 1 / Math.sqrt(len)
    out[0] = x * len
    out[1] = y * len
    out[2] = z * len
    out[3] = w * len
  }
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/random.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec4/random.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var vecNormalize = __webpack_require__(/*! ./normalize */ "./node_modules/gl-vec4/normalize.js")
var vecScale = __webpack_require__(/*! ./scale */ "./node_modules/gl-vec4/scale.js")

module.exports = random

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
function random (out, scale) {
  scale = scale || 1.0

  // TODO: This is a pretty awful way of doing this. Find something better.
  out[0] = Math.random()
  out[1] = Math.random()
  out[2] = Math.random()
  out[3] = Math.random()
  vecNormalize(out, out)
  vecScale(out, out, scale)
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/scale.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec4/scale.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = scale

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function scale (out, a, b) {
  out[0] = a[0] * b
  out[1] = a[1] * b
  out[2] = a[2] * b
  out[3] = a[3] * b
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/scaleAndAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-vec4/scaleAndAdd.js ***!
  \*********************************************/
/***/ ((module) => {

module.exports = scaleAndAdd

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
function scaleAndAdd (out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale)
  out[1] = a[1] + (b[1] * scale)
  out[2] = a[2] + (b[2] * scale)
  out[3] = a[3] + (b[3] * scale)
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/set.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec4/set.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = set

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function set (out, x, y, z, w) {
  out[0] = x
  out[1] = y
  out[2] = z
  out[3] = w
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/squaredDistance.js":
/*!*************************************************!*\
  !*** ./node_modules/gl-vec4/squaredDistance.js ***!
  \*************************************************/
/***/ ((module) => {

module.exports = squaredDistance

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance (a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1],
    z = b[2] - a[2],
    w = b[3] - a[3]
  return x * x + y * y + z * z + w * w
}


/***/ }),

/***/ "./node_modules/gl-vec4/squaredLength.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-vec4/squaredLength.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = squaredLength

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength (a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3]
  return x * x + y * y + z * z + w * w
}


/***/ }),

/***/ "./node_modules/gl-vec4/subtract.js":
/*!******************************************!*\
  !*** ./node_modules/gl-vec4/subtract.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = subtract

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function subtract (out, a, b) {
  out[0] = a[0] - b[0]
  out[1] = a[1] - b[1]
  out[2] = a[2] - b[2]
  out[3] = a[3] - b[3]
  return out
}


/***/ }),

/***/ "./node_modules/gl-vec4/transformQuat.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-vec4/transformQuat.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = transformQuat

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
function transformQuat (out, a, q) {
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
  out[3] = a[3]
  return out
}


/***/ }),

/***/ "./node_modules/plotly.js/lib/streamtube.js":
/*!**************************************************!*\
  !*** ./node_modules/plotly.js/lib/streamtube.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/streamtube */ "./node_modules/plotly.js/src/traces/streamtube/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/streamtube/attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/streamtube/attributes.js ***!
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



var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var mesh3dAttrs = __webpack_require__(/*! ../mesh3d/attributes */ "./node_modules/plotly.js/src/traces/mesh3d/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var attrs = {
    x: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: 'Sets the x coordinates of the vector field.'
    },
    y: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: 'Sets the y coordinates of the vector field.'
    },
    z: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: 'Sets the z coordinates of the vector field.'
    },

    u: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the x components of the vector field.'
    },
    v: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the y components of the vector field.'
    },
    w: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the z components of the vector field.'
    },

    starts: {
        x: {
            valType: 'data_array',
            editType: 'calc',
            description: [
                'Sets the x components of the starting position of the streamtubes',
            ].join(' ')
        },
        y: {
            valType: 'data_array',
            editType: 'calc',
            description: [
                'Sets the y components of the starting position of the streamtubes',
            ].join(' ')
        },
        z: {
            valType: 'data_array',
            editType: 'calc',
            description: [
                'Sets the z components of the starting position of the streamtubes',
            ].join(' ')
        },
        editType: 'calc'
    },

    maxdisplayed: {
        valType: 'integer',
        min: 0,
        dflt: 1000,
        role: 'info',
        editType: 'calc',
        description: [
            'The maximum number of displayed segments in a streamtube.'
        ].join(' ')
    },

    // TODO
    //
    // Should add 'absolute' (like cone traces have), but currently gl-streamtube3d's
    // `absoluteTubeSize` doesn't behave well enough for our needs.
    //
    // 'fixed' would be a nice addition to plot stream 'lines', see
    // https://github.com/plotly/plotly.js/commit/812be20750e21e0a1831975001c248d365850f73#r29129877
    //
    // sizemode: {
    //     valType: 'enumerated',
    //     values: ['scaled', 'absolute', 'fixed'],
    //     dflt: 'scaled',
    //     role: 'info',
    //     editType: 'calc',
    //     description: [
    //         'Sets the mode by which the streamtubes are sized.'
    //     ].join(' ')
    // },

    sizeref: {
        valType: 'number',
        role: 'info',
        editType: 'calc',
        min: 0,
        dflt: 1,
        description: [
            'The scaling factor for the streamtubes.',
            'The default is 1, which avoids two max divergence tubes from touching',
            'at adjacent starting positions.'
        ].join(' ')
    },

    text: {
        valType: 'string',
        role: 'info',
        dflt: '',
        editType: 'calc',
        description: [
            'Sets a text element associated with this trace.',
            'If trace `hoverinfo` contains a *text* flag,',
            'this text element will be seen in all hover labels.',
            'Note that streamtube traces do not support array `text` values.'
        ].join(' ')
    },
    hovertext: {
        valType: 'string',
        role: 'info',
        dflt: '',
        editType: 'calc',
        description: 'Same as `text`.'
    },
    hovertemplate: hovertemplateAttrs({editType: 'calc'}, {
        keys: [
            'tubex', 'tubey', 'tubez',
            'tubeu', 'tubev', 'tubew',
            'norm', 'divergence'
        ]
    }),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
};

extendFlat(attrs, colorScaleAttrs('', {
    colorAttr: 'u/v/w norm',
    showScaleDflt: true,
    editTypeOverride: 'calc'
}));

var fromMesh3d = ['opacity', 'lightposition', 'lighting'];
fromMesh3d.forEach(function(k) {
    attrs[k] = mesh3dAttrs[k];
});

attrs.hoverinfo = extendFlat({}, baseAttrs.hoverinfo, {
    editType: 'calc',
    flags: ['x', 'y', 'z', 'u', 'v', 'w', 'norm', 'divergence', 'text', 'name'],
    dflt: 'x+y+z+norm+text+name'
});

attrs.transforms = undefined;

module.exports = attrs;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/streamtube/convert.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/streamtube/convert.js ***!
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



var tube2mesh = __webpack_require__(/*! gl-streamtube3d */ "./node_modules/gl-streamtube3d/streamtube.js");
var createTubeMesh = tube2mesh.createTubeMesh;

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var parseColorScale = __webpack_require__(/*! ../../lib/gl_format_color */ "./node_modules/plotly.js/src/lib/gl_format_color.js").parseColorScale;
var extractOpts = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").extractOpts;
var zip3 = __webpack_require__(/*! ../../plots/gl3d/zip3 */ "./node_modules/plotly.js/src/plots/gl3d/zip3.js");

var axisName2scaleIndex = {xaxis: 0, yaxis: 1, zaxis: 2};

function Streamtube(scene, uid) {
    this.scene = scene;
    this.uid = uid;
    this.mesh = null;
    this.data = null;
}

var proto = Streamtube.prototype;

proto.handlePick = function(selection) {
    var sceneLayout = this.scene.fullSceneLayout;
    var dataScale = this.scene.dataScale;

    function fromDataScale(v, axisName) {
        var ax = sceneLayout[axisName];
        var scale = dataScale[axisName2scaleIndex[axisName]];
        return ax.l2c(v) / scale;
    }

    if(selection.object === this.mesh) {
        var pos = selection.data.position;
        var uvx = selection.data.velocity;

        selection.traceCoordinate = [
            fromDataScale(pos[0], 'xaxis'),
            fromDataScale(pos[1], 'yaxis'),
            fromDataScale(pos[2], 'zaxis'),

            fromDataScale(uvx[0], 'xaxis'),
            fromDataScale(uvx[1], 'yaxis'),
            fromDataScale(uvx[2], 'zaxis'),

            // u/v/w norm
            selection.data.intensity * this.data._normMax,
            // divergence
            selection.data.divergence
        ];

        selection.textLabel = this.data.hovertext || this.data.text;

        return true;
    }
};

function getDfltStartingPositions(vec) {
    var len = vec.length;
    var s;

    if(len > 2) {
        s = vec.slice(1, len - 1);
    } else if(len === 2) {
        s = [(vec[0] + vec[1]) / 2];
    } else {
        s = vec;
    }
    return s;
}

function getBoundPads(vec) {
    var len = vec.length;
    if(len === 1) {
        return [0.5, 0.5];
    } else {
        return [vec[1] - vec[0], vec[len - 1] - vec[len - 2]];
    }
}

function convert(scene, trace) {
    var sceneLayout = scene.fullSceneLayout;
    var dataScale = scene.dataScale;
    var len = trace._len;
    var tubeOpts = {};

    function toDataCoords(arr, axisName) {
        var ax = sceneLayout[axisName];
        var scale = dataScale[axisName2scaleIndex[axisName]];
        return Lib.simpleMap(arr, function(v) { return ax.d2l(v) * scale; });
    }

    tubeOpts.vectors = zip3(
        toDataCoords(trace._u, 'xaxis'),
        toDataCoords(trace._v, 'yaxis'),
        toDataCoords(trace._w, 'zaxis'),
        len
    );

    // Over-specified mesh case, this would error in tube2mesh
    if(!len) {
        return {
            positions: [],
            cells: []
        };
    }

    var meshx = toDataCoords(trace._Xs, 'xaxis');
    var meshy = toDataCoords(trace._Ys, 'yaxis');
    var meshz = toDataCoords(trace._Zs, 'zaxis');

    tubeOpts.meshgrid = [meshx, meshy, meshz];
    tubeOpts.gridFill = trace._gridFill;

    var slen = trace._slen;
    if(slen) {
        tubeOpts.startingPositions = zip3(
            toDataCoords(trace._startsX, 'xaxis'),
            toDataCoords(trace._startsY, 'yaxis'),
            toDataCoords(trace._startsZ, 'zaxis')
        );
    } else {
        // Default starting positions:
        //
        // if len>2, cut xz plane at min-y,
        // takes all x/y/z pts on that plane except those on the edges
        // to generate "well-defined" tubes,
        //
        // if len=2, take position halfway between two the pts,
        //
        // if len=1, take that pt
        var sy0 = meshy[0];
        var sx = getDfltStartingPositions(meshx);
        var sz = getDfltStartingPositions(meshz);
        var startingPositions = new Array(sx.length * sz.length);
        var m = 0;

        for(var i = 0; i < sx.length; i++) {
            for(var k = 0; k < sz.length; k++) {
                startingPositions[m++] = [sx[i], sy0, sz[k]];
            }
        }
        tubeOpts.startingPositions = startingPositions;
    }

    tubeOpts.colormap = parseColorScale(trace);
    tubeOpts.tubeSize = trace.sizeref;
    tubeOpts.maxLength = trace.maxdisplayed;

    // add some padding around the bounds
    // to e.g. allow tubes starting from a slice of the x/y/z mesh
    // to go beyond bounds a little bit w/o getting clipped
    var xbnds = toDataCoords(trace._xbnds, 'xaxis');
    var ybnds = toDataCoords(trace._ybnds, 'yaxis');
    var zbnds = toDataCoords(trace._zbnds, 'zaxis');
    var xpads = getBoundPads(meshx);
    var ypads = getBoundPads(meshy);
    var zpads = getBoundPads(meshz);

    var bounds = [
        [xbnds[0] - xpads[0], ybnds[0] - ypads[0], zbnds[0] - zpads[0]],
        [xbnds[1] + xpads[1], ybnds[1] + ypads[1], zbnds[1] + zpads[1]]
    ];

    var meshData = tube2mesh(tubeOpts, bounds);

    // N.B. cmin/cmax correspond to the min/max vector norm
    // in the u/v/w arrays, which in general is NOT equal to max
    // intensity that colors the tubes.
    var cOpts = extractOpts(trace);
    meshData.vertexIntensityBounds = [cOpts.min / trace._normMax, cOpts.max / trace._normMax];

    // pass gl-mesh3d lighting attributes
    var lp = trace.lightposition;
    meshData.lightPosition = [lp.x, lp.y, lp.z];
    meshData.ambient = trace.lighting.ambient;
    meshData.diffuse = trace.lighting.diffuse;
    meshData.specular = trace.lighting.specular;
    meshData.roughness = trace.lighting.roughness;
    meshData.fresnel = trace.lighting.fresnel;
    meshData.opacity = trace.opacity;

    // stash autorange pad value
    trace._pad = meshData.tubeScale * trace.sizeref * 2;

    return meshData;
}

proto.update = function(data) {
    this.data = data;

    var meshData = convert(this.scene, data);
    this.mesh.update(meshData);
};

proto.dispose = function() {
    this.scene.glplot.remove(this.mesh);
    this.mesh.dispose();
};

function createStreamtubeTrace(scene, data) {
    var gl = scene.glplot.gl;

    var meshData = convert(scene, data);
    var mesh = createTubeMesh(gl, meshData);

    var streamtube = new Streamtube(scene, data.uid);
    streamtube.mesh = mesh;
    streamtube.data = data;
    mesh._trace = streamtube;

    scene.glplot.add(mesh);

    return streamtube;
}

module.exports = createStreamtubeTrace;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/streamtube/defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/streamtube/defaults.js ***!
  \******************************************************************/
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

var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/streamtube/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var u = coerce('u');
    var v = coerce('v');
    var w = coerce('w');

    var x = coerce('x');
    var y = coerce('y');
    var z = coerce('z');

    if(
        !u || !u.length || !v || !v.length || !w || !w.length ||
        !x || !x.length || !y || !y.length || !z || !z.length
    ) {
        traceOut.visible = false;
        return;
    }

    coerce('starts.x');
    coerce('starts.y');
    coerce('starts.z');

    coerce('maxdisplayed');
    coerce('sizeref');

    coerce('lighting.ambient');
    coerce('lighting.diffuse');
    coerce('lighting.specular');
    coerce('lighting.roughness');
    coerce('lighting.fresnel');
    coerce('lightposition.x');
    coerce('lightposition.y');
    coerce('lightposition.z');

    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'c'});

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    // disable 1D transforms (for now)
    // x/y/z and u/v/w have matching lengths,
    // but they don't have to match with starts.(x|y|z)
    traceOut._length = null;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/streamtube/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/streamtube/index.js ***!
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



module.exports = {
    moduleType: 'trace',
    name: 'streamtube',
    basePlotModule: __webpack_require__(/*! ../../plots/gl3d */ "./node_modules/plotly.js/src/plots/gl3d/index.js"),
    categories: ['gl3d', 'showLegend'],

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/streamtube/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/streamtube/defaults.js"),
    colorbar: {
        min: 'cmin',
        max: 'cmax'
    },
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/streamtube/calc.js").calc,
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/streamtube/convert.js"),
    eventData: function(out, pt) {
        out.tubex = out.x;
        out.tubey = out.y;
        out.tubez = out.z;

        out.tubeu = pt.traceCoordinate[3];
        out.tubev = pt.traceCoordinate[4];
        out.tubew = pt.traceCoordinate[5];

        out.norm = pt.traceCoordinate[6];
        out.divergence = pt.traceCoordinate[7];

        // Does not correspond to input x/y/z, so delete them
        delete out.x;
        delete out.y;
        delete out.z;

        return out;
    },

    meta: {
        description: [
            'Use a streamtube trace to visualize flow in a vector field.',
            '',
            'Specify a vector field using 6 1D arrays of equal length,',
            '3 position arrays `x`, `y` and `z`',
            'and 3 vector component arrays `u`, `v`, and `w`.',
            '',
            'By default, the tubes\' starting positions will be cut from the vector field\'s',
            'x-z plane at its minimum y value.',
            'To specify your own starting position, use attributes `starts.x`, `starts.y`',
            'and `starts.z`.',
            'The color is encoded by the norm of (u, v, w), and the local radius',
            'by the divergence of (u, v, w).'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXN0cmVhbXR1YmUzZC9saWIvc2hhZGVycy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXN0cmVhbXR1YmUzZC9zdHJlYW10dWJlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9hZGQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2Nsb25lLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jb3B5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2Rpc3RhbmNlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9kaXZpZGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2RvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvZnJvbVZhbHVlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2ludmVyc2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2xlbmd0aC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvbGVycC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvbWF4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9taW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWM0L211bHRpcGx5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9uZWdhdGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWM0L25vcm1hbGl6ZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvcmFuZG9tLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9zY2FsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc2NhbGVBbmRBZGQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NldC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc3F1YXJlZERpc3RhbmNlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9zcXVhcmVkTGVuZ3RoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9zdWJ0cmFjdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvdHJhbnNmb3JtUXVhdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc3RyZWFtdHViZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3N0cmVhbXR1YmUvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3N0cmVhbXR1YmUvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3N0cmVhbXR1YmUvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zdHJlYW10dWJlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsb0JBQW9CLG1CQUFPLENBQUMsa0RBQVM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxLQUFLLCtCQUErQjtBQUNwQyxLQUFLLDRCQUE0QjtBQUNqQyxLQUFLLHlCQUF5QjtBQUM5QixLQUFLO0FBQ0w7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxLQUFLLCtCQUErQjtBQUNwQyxLQUFLLHlCQUF5QjtBQUM5QixLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyxnREFBUztBQUM1QixXQUFXLG1CQUFPLENBQUMsZ0RBQVM7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxjQUFjLGtCQUFrQjtBQUNoQztBQUNBLGVBQWUscUJBQXFCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGtCQUFrQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGVBQWU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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V0FBVyxLQUFLO0FBQ2hCLFdBQVcsS0FBSztBQUNoQixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsT0FBTztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsS0FBSztBQUNoQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNmQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMEVBQWtCO0FBQzlDOztBQUVBLGdCQUFnQixtQkFBTyxDQUFDLGtGQUFjO0FBQ3RDLG9CQUFvQixtQkFBTyxDQUFDLDhFQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxVQUFVLGdHQUFzQjtBQUNoQyxVQUFVLG1CQUFPLENBQUMsNEVBQVc7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnRhMjBhMDg4ZTdiMGU2ODM3NmNkMC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBnbHNsaWZ5ICAgICAgID0gcmVxdWlyZSgnZ2xzbGlmeScpXG5cbnZhciB0cmlWZXJ0U3JjID0gZ2xzbGlmeSgnLi90cmlhbmdsZS12ZXJ0ZXguZ2xzbCcpXG52YXIgdHJpRnJhZ1NyYyA9IGdsc2xpZnkoJy4vdHJpYW5nbGUtZnJhZ21lbnQuZ2xzbCcpXG52YXIgcGlja1ZlcnRTcmMgPSBnbHNsaWZ5KCcuL3BpY2stdmVydGV4Lmdsc2wnKVxudmFyIHBpY2tGcmFnU3JjID0gZ2xzbGlmeSgnLi9waWNrLWZyYWdtZW50Lmdsc2wnKVxuXG5leHBvcnRzLm1lc2hTaGFkZXIgPSB7XG4gIHZlcnRleDogICB0cmlWZXJ0U3JjLFxuICBmcmFnbWVudDogdHJpRnJhZ1NyYyxcbiAgYXR0cmlidXRlczogW1xuICAgIHtuYW1lOiAncG9zaXRpb24nLCB0eXBlOiAndmVjNCd9LFxuICAgIHtuYW1lOiAnY29sb3InLCB0eXBlOiAndmVjNCd9LFxuICAgIHtuYW1lOiAndXYnLCB0eXBlOiAndmVjMid9LFxuICAgIHtuYW1lOiAndmVjdG9yJywgdHlwZTogJ3ZlYzQnfVxuICBdXG59XG5leHBvcnRzLnBpY2tTaGFkZXIgPSB7XG4gIHZlcnRleDogICBwaWNrVmVydFNyYyxcbiAgZnJhZ21lbnQ6IHBpY2tGcmFnU3JjLFxuICBhdHRyaWJ1dGVzOiBbXG4gICAge25hbWU6ICdwb3NpdGlvbicsIHR5cGU6ICd2ZWM0J30sXG4gICAge25hbWU6ICdpZCcsIHR5cGU6ICd2ZWM0J30sXG4gICAge25hbWU6ICd2ZWN0b3InLCB0eXBlOiAndmVjNCd9XG4gIF1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdmVjMyA9IHJlcXVpcmUoJ2dsLXZlYzMnKTtcbnZhciB2ZWM0ID0gcmVxdWlyZSgnZ2wtdmVjNCcpO1xudmFyIEdSSURfVFlQRVMgPSBbJ3h5eicsICd4enknLCAneXh6JywgJ3l6eCcsICd6eHknLCAnenl4J107XG5cbnZhciBzdHJlYW1Ub1R1YmUgPSBmdW5jdGlvbihzdHJlYW0sIG1heERpdmVyZ2VuY2UsIG1pbkRpc3RhbmNlLCBtYXhOb3JtKSB7XG5cdHZhciBwb2ludHMgPSBzdHJlYW0ucG9pbnRzO1xuXHR2YXIgdmVsb2NpdGllcyA9IHN0cmVhbS52ZWxvY2l0aWVzO1xuXHR2YXIgZGl2ZXJnZW5jZXMgPSBzdHJlYW0uZGl2ZXJnZW5jZXM7XG5cblx0dmFyIHZlcnRzID0gW107XG5cdHZhciBmYWNlcyA9IFtdO1xuXHR2YXIgdmVjdG9ycyA9IFtdO1xuXHR2YXIgcHJldmlvdXNWZXJ0cyA9IFtdO1xuXHR2YXIgY3VycmVudFZlcnRzID0gW107XG5cdHZhciBpbnRlbnNpdGllcyA9IFtdO1xuXHR2YXIgcHJldmlvdXNJbnRlbnNpdHkgPSAwO1xuXHR2YXIgY3VycmVudEludGVuc2l0eSA9IDA7XG5cdHZhciBjdXJyZW50VmVjdG9yID0gdmVjNC5jcmVhdGUoKTtcblx0dmFyIHByZXZpb3VzVmVjdG9yID0gdmVjNC5jcmVhdGUoKTtcblxuXHR2YXIgZmFjZXRzID0gODtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwID0gcG9pbnRzW2ldO1xuXHRcdHZhciBmd2QgPSB2ZWxvY2l0aWVzW2ldO1xuXHRcdHZhciByID0gZGl2ZXJnZW5jZXNbaV07XG5cdFx0aWYgKG1heERpdmVyZ2VuY2UgPT09IDApIHtcblx0XHRcdHIgPSBtaW5EaXN0YW5jZSAqIDAuMDU7XG5cdFx0fVxuXHRcdGN1cnJlbnRJbnRlbnNpdHkgPSB2ZWMzLmxlbmd0aChmd2QpIC8gbWF4Tm9ybTtcblxuXHRcdGN1cnJlbnRWZWN0b3IgPSB2ZWM0LmNyZWF0ZSgpO1xuXHRcdHZlYzMuY29weShjdXJyZW50VmVjdG9yLCBmd2QpO1xuXHRcdGN1cnJlbnRWZWN0b3JbM10gPSByO1xuXG5cdFx0Zm9yICh2YXIgYSA9IDA7IGEgPCBmYWNldHM7IGErKykge1xuXHRcdFx0Y3VycmVudFZlcnRzW2FdID0gW3BbMF0sIHBbMV0sIHBbMl0sIGFdO1xuXHRcdH1cblx0XHRpZiAocHJldmlvdXNWZXJ0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKHZhciBhID0gMDsgYSA8IGZhY2V0czsgYSsrKSB7XG5cdFx0XHRcdHZhciBhMSA9IChhKzEpICUgZmFjZXRzO1xuXHRcdFx0XHR2ZXJ0cy5wdXNoKFxuXHRcdFx0XHRcdHByZXZpb3VzVmVydHNbYV0sXG5cdFx0XHRcdFx0Y3VycmVudFZlcnRzW2FdLFxuXHRcdFx0XHRcdGN1cnJlbnRWZXJ0c1thMV0sXG5cblx0XHRcdFx0XHRjdXJyZW50VmVydHNbYTFdLFxuXHRcdFx0XHRcdHByZXZpb3VzVmVydHNbYTFdLFxuXHRcdFx0XHRcdHByZXZpb3VzVmVydHNbYV1cblx0XHRcdFx0KTtcblx0XHRcdFx0dmVjdG9ycy5wdXNoKFxuXHRcdFx0XHRcdHByZXZpb3VzVmVjdG9yLFxuXHRcdFx0XHRcdGN1cnJlbnRWZWN0b3IsXG5cdFx0XHRcdFx0Y3VycmVudFZlY3RvcixcblxuXHRcdFx0XHRcdGN1cnJlbnRWZWN0b3IsXG5cdFx0XHRcdFx0cHJldmlvdXNWZWN0b3IsXG5cdFx0XHRcdFx0cHJldmlvdXNWZWN0b3Jcblx0XHRcdFx0KTtcblx0XHRcdFx0aW50ZW5zaXRpZXMucHVzaChcblx0XHRcdFx0XHRwcmV2aW91c0ludGVuc2l0eSxcblx0XHRcdFx0XHRjdXJyZW50SW50ZW5zaXR5LFxuXHRcdFx0XHRcdGN1cnJlbnRJbnRlbnNpdHksXG5cblx0XHRcdFx0XHRjdXJyZW50SW50ZW5zaXR5LFxuXHRcdFx0XHRcdHByZXZpb3VzSW50ZW5zaXR5LFxuXHRcdFx0XHRcdHByZXZpb3VzSW50ZW5zaXR5XG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0dmFyIGxlbiA9IHZlcnRzLmxlbmd0aDtcblx0XHRcdFx0ZmFjZXMucHVzaChcblx0XHRcdFx0XHRbbGVuLTYsIGxlbi01LCBsZW4tNF0sXG5cdFx0XHRcdFx0W2xlbi0zLCBsZW4tMiwgbGVuLTFdXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciB0bXAxID0gcHJldmlvdXNWZXJ0cztcblx0XHRwcmV2aW91c1ZlcnRzID0gY3VycmVudFZlcnRzO1xuXHRcdGN1cnJlbnRWZXJ0cyA9IHRtcDE7XG5cblx0XHR2YXIgdG1wMiA9IHByZXZpb3VzVmVjdG9yO1xuXHRcdHByZXZpb3VzVmVjdG9yID0gY3VycmVudFZlY3Rvcjtcblx0XHRjdXJyZW50VmVjdG9yID0gdG1wMjtcblxuXHRcdHZhciB0bXAzID0gcHJldmlvdXNJbnRlbnNpdHk7XG5cdFx0cHJldmlvdXNJbnRlbnNpdHkgPSBjdXJyZW50SW50ZW5zaXR5O1xuXHRcdGN1cnJlbnRJbnRlbnNpdHkgPSB0bXAzO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0cG9zaXRpb25zOiB2ZXJ0cyxcblx0XHRjZWxsczogZmFjZXMsXG5cdFx0dmVjdG9yczogdmVjdG9ycyxcblx0XHR2ZXJ0ZXhJbnRlbnNpdHk6IGludGVuc2l0aWVzXG5cdH07XG59O1xuXG52YXIgY3JlYXRlVHViZXMgPSBmdW5jdGlvbihzdHJlYW1zLCBjb2xvcm1hcCwgbWF4RGl2ZXJnZW5jZSwgbWluRGlzdGFuY2UpIHtcblxuXHR2YXIgbWF4Tm9ybSA9IDA7XG5cdGZvciAodmFyIGk9MDsgaTxzdHJlYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHZlbG9jaXRpZXMgPSBzdHJlYW1zW2ldLnZlbG9jaXRpZXM7XG5cdFx0Zm9yICh2YXIgaj0wOyBqPHZlbG9jaXRpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdG1heE5vcm0gPSBNYXRoLm1heChtYXhOb3JtLFxuXHRcdFx0XHR2ZWMzLmxlbmd0aCh2ZWxvY2l0aWVzW2pdKVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHR2YXIgdHViZXMgPSBzdHJlYW1zLm1hcChmdW5jdGlvbihzKSB7XG5cdFx0cmV0dXJuIHN0cmVhbVRvVHViZShzLCBtYXhEaXZlcmdlbmNlLCBtaW5EaXN0YW5jZSwgbWF4Tm9ybSk7XG5cdH0pO1xuXG5cdHZhciBwb3NpdGlvbnMgPSBbXTtcblx0dmFyIGNlbGxzID0gW107XG5cdHZhciB2ZWN0b3JzID0gW107XG5cdHZhciB2ZXJ0ZXhJbnRlbnNpdHkgPSBbXTtcblx0Zm9yICh2YXIgaT0wOyBpIDwgdHViZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdHViZSA9IHR1YmVzW2ldO1xuXHRcdHZhciBvZmZzZXQgPSBwb3NpdGlvbnMubGVuZ3RoO1xuXHRcdHBvc2l0aW9ucyA9IHBvc2l0aW9ucy5jb25jYXQodHViZS5wb3NpdGlvbnMpO1xuXHRcdHZlY3RvcnMgPSB2ZWN0b3JzLmNvbmNhdCh0dWJlLnZlY3RvcnMpO1xuXHRcdHZlcnRleEludGVuc2l0eSA9IHZlcnRleEludGVuc2l0eS5jb25jYXQodHViZS52ZXJ0ZXhJbnRlbnNpdHkpO1xuXHRcdGZvciAodmFyIGo9MDsgajx0dWJlLmNlbGxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgY2VsbCA9IHR1YmUuY2VsbHNbal07XG5cdFx0XHR2YXIgbmV3Q2VsbCA9IFtdO1xuXHRcdFx0Y2VsbHMucHVzaChuZXdDZWxsKTtcblx0XHRcdGZvciAodmFyIGs9MDsgazxjZWxsLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdG5ld0NlbGwucHVzaChjZWxsW2tdICsgb2Zmc2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHtcblx0XHRwb3NpdGlvbnM6IHBvc2l0aW9ucyxcblx0XHRjZWxsczogY2VsbHMsXG5cdFx0dmVjdG9yczogdmVjdG9ycyxcblx0XHR2ZXJ0ZXhJbnRlbnNpdHk6IHZlcnRleEludGVuc2l0eSxcblx0XHRjb2xvcm1hcDogY29sb3JtYXBcblx0fTtcbn07XG5cbnZhciBmaW5kTGFzdFNtYWxsZXJJbmRleCA9IGZ1bmN0aW9uKHBvaW50cywgdikge1xuICB2YXIgbGVuID0gcG9pbnRzLmxlbmd0aDtcbiAgdmFyIGk7XG4gIGZvciAoaT0wOyBpPGxlbjsgaSsrKSB7XG4gIFx0dmFyIHAgPSBwb2ludHNbaV07XG4gIFx0aWYgKHAgPT09IHYpIHJldHVybiBpO1xuICAgIGVsc2UgaWYgKHAgPiB2KSByZXR1cm4gaS0xO1xuICB9XG4gIHJldHVybiBpO1xufTtcblxudmFyIGNsYW1wID0gZnVuY3Rpb24odiwgbWluLCBtYXgpIHtcblx0cmV0dXJuIHYgPCBtaW4gPyBtaW4gOiAodiA+IG1heCA/IG1heCA6IHYpO1xufTtcblxudmFyIHNhbXBsZU1lc2hncmlkID0gZnVuY3Rpb24ocG9pbnQsIHZlY3RvckZpZWxkLCBncmlkSW5mbykge1xuXHR2YXIgdmVjdG9ycyA9IHZlY3RvckZpZWxkLnZlY3RvcnM7XG5cdHZhciBtZXNoZ3JpZCA9IHZlY3RvckZpZWxkLm1lc2hncmlkO1xuXG5cdHZhciB4ID0gcG9pbnRbMF07XG5cdHZhciB5ID0gcG9pbnRbMV07XG5cdHZhciB6ID0gcG9pbnRbMl07XG5cblx0dmFyIHcgPSBtZXNoZ3JpZFswXS5sZW5ndGg7XG5cdHZhciBoID0gbWVzaGdyaWRbMV0ubGVuZ3RoO1xuXHR2YXIgZCA9IG1lc2hncmlkWzJdLmxlbmd0aDtcblxuXHQvLyBGaW5kIHRoZSBpbmRleCBvZiB0aGUgbmVhcmVzdCBzbWFsbGVyIHZhbHVlIGluIHRoZSBtZXNoZ3JpZCBmb3IgZWFjaCBjb29yZGluYXRlIG9mICh4LHkseikuXG5cdC8vIFRoZSBuZWFyZXN0IHNtYWxsZXIgdmFsdWUgaW5kZXggZm9yIHggaXMgdGhlIGluZGV4IHgwIHN1Y2ggdGhhdFxuXHQvLyBtZXNoZ3JpZFswXVt4MF0gPCB4IGFuZCBmb3IgYWxsIHgxID4geDAsIG1lc2hncmlkWzBdW3gxXSA+PSB4LlxuXHR2YXIgeDAgPSBmaW5kTGFzdFNtYWxsZXJJbmRleChtZXNoZ3JpZFswXSwgeCk7XG5cdHZhciB5MCA9IGZpbmRMYXN0U21hbGxlckluZGV4KG1lc2hncmlkWzFdLCB5KTtcblx0dmFyIHowID0gZmluZExhc3RTbWFsbGVySW5kZXgobWVzaGdyaWRbMl0sIHopO1xuXG5cdC8vIEdldCB0aGUgbmVhcmVzdCBsYXJnZXIgbWVzaGdyaWQgdmFsdWUgaW5kaWNlcy5cblx0Ly8gRnJvbSB0aGUgYWJvdmUgXCJuZWFyZXN0IHNtYWxsZXIgdmFsdWVcIiwgd2Uga25vdyB0aGF0XG5cdC8vICAgbWVzaGdyaWRbMF1beDBdIDwgeFxuXHQvLyAgIG1lc2hncmlkWzBdW3gwKzFdID49IHhcblx0dmFyIHgxID0geDAgKyAxO1xuXHR2YXIgeTEgPSB5MCArIDE7XG5cdHZhciB6MSA9IHowICsgMTtcblxuXHR4MCA9IGNsYW1wKHgwLCAwLCB3LTEpO1xuXHR4MSA9IGNsYW1wKHgxLCAwLCB3LTEpO1xuXHR5MCA9IGNsYW1wKHkwLCAwLCBoLTEpO1xuXHR5MSA9IGNsYW1wKHkxLCAwLCBoLTEpO1xuXHR6MCA9IGNsYW1wKHowLCAwLCBkLTEpO1xuXHR6MSA9IGNsYW1wKHoxLCAwLCBkLTEpO1xuXG5cdC8vIFJlamVjdCBwb2ludHMgb3V0c2lkZSB0aGUgbWVzaGdyaWQsIHJldHVybiBhIHplcm8gdmVjdG9yLlxuXHRpZiAoeDAgPCAwIHx8IHkwIDwgMCB8fCB6MCA8IDAgfHwgeDEgPiB3LTEgfHwgeTEgPiBoLTEgfHwgejEgPiBkLTEpIHtcblx0XHRyZXR1cm4gdmVjMy5jcmVhdGUoKTtcblx0fVxuXG5cdC8vIE5vcm1hbGl6ZSBwb2ludCBjb29yZGluYXRlcyB0byAwLi4xIHNjYWxpbmcgZmFjdG9yIGJldHdlZW4geDAgYW5kIHgxLlxuXHR2YXIgbVgwID0gbWVzaGdyaWRbMF1beDBdO1xuXHR2YXIgbVgxID0gbWVzaGdyaWRbMF1beDFdO1xuXHR2YXIgbVkwID0gbWVzaGdyaWRbMV1beTBdO1xuXHR2YXIgbVkxID0gbWVzaGdyaWRbMV1beTFdO1xuXHR2YXIgbVowID0gbWVzaGdyaWRbMl1bejBdO1xuXHR2YXIgbVoxID0gbWVzaGdyaWRbMl1bejFdO1xuXHR2YXIgeGYgPSAoeCAtIG1YMCkgLyAobVgxIC0gbVgwKTtcblx0dmFyIHlmID0gKHkgLSBtWTApIC8gKG1ZMSAtIG1ZMCk7XG5cdHZhciB6ZiA9ICh6IC0gbVowKSAvIChtWjEgLSBtWjApO1xuXG5cdGlmICghaXNGaW5pdGUoeGYpKSB4ZiA9IDAuNTtcblx0aWYgKCFpc0Zpbml0ZSh5ZikpIHlmID0gMC41O1xuXHRpZiAoIWlzRmluaXRlKHpmKSkgemYgPSAwLjU7XG5cblx0dmFyIHgwb2ZmO1xuXHR2YXIgeDFvZmY7XG5cdHZhciB5MG9mZjtcblx0dmFyIHkxb2ZmO1xuXHR2YXIgejBvZmY7XG5cdHZhciB6MW9mZjtcblxuXHRpZihncmlkSW5mby5yZXZlcnNlZFgpIHtcblx0XHR4MCA9IHcgLSAxIC0geDA7XG5cdFx0eDEgPSB3IC0gMSAtIHgxO1xuXHR9XG5cblx0aWYoZ3JpZEluZm8ucmV2ZXJzZWRZKSB7XG5cdFx0eTAgPSBoIC0gMSAtIHkwO1xuXHRcdHkxID0gaCAtIDEgLSB5MTtcblx0fVxuXG5cdGlmKGdyaWRJbmZvLnJldmVyc2VkWikge1xuXHRcdHowID0gZCAtIDEgLSB6MDtcblx0XHR6MSA9IGQgLSAxIC0gejE7XG5cdH1cblxuXHRzd2l0Y2goZ3JpZEluZm8uZmlsbGVkKSB7XG5cdFx0Y2FzZSA1OiAvLyAnenl4J1xuXHRcdFx0ejBvZmYgPSB6MDtcblx0XHRcdHoxb2ZmID0gejE7XG5cdFx0XHR5MG9mZiA9IHkwKmQ7XG5cdFx0XHR5MW9mZiA9IHkxKmQ7XG5cdFx0XHR4MG9mZiA9IHgwKmQqaDtcblx0XHRcdHgxb2ZmID0geDEqZCpoO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIDQ6IC8vICd6eHknXG5cdFx0XHR6MG9mZiA9IHowO1xuXHRcdFx0ejFvZmYgPSB6MTtcblx0XHRcdHgwb2ZmID0geDAqZDtcblx0XHRcdHgxb2ZmID0geDEqZDtcblx0XHRcdHkwb2ZmID0geTAqZCp3O1xuXHRcdFx0eTFvZmYgPSB5MSpkKnc7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgMzogLy8gJ3l6eCdcblx0XHRcdHkwb2ZmID0geTA7XG5cdFx0XHR5MW9mZiA9IHkxO1xuXHRcdFx0ejBvZmYgPSB6MCpoO1xuXHRcdFx0ejFvZmYgPSB6MSpoO1xuXHRcdFx0eDBvZmYgPSB4MCpoKmQ7XG5cdFx0XHR4MW9mZiA9IHgxKmgqZDtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSAyOiAvLyAneXh6J1xuXHRcdFx0eTBvZmYgPSB5MDtcblx0XHRcdHkxb2ZmID0geTE7XG5cdFx0XHR4MG9mZiA9IHgwKmg7XG5cdFx0XHR4MW9mZiA9IHgxKmg7XG5cdFx0XHR6MG9mZiA9IHowKmgqdztcblx0XHRcdHoxb2ZmID0gejEqaCp3O1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIDE6IC8vICd4enknXG5cdFx0XHR4MG9mZiA9IHgwO1xuXHRcdFx0eDFvZmYgPSB4MTtcblx0XHRcdHowb2ZmID0gejAqdztcblx0XHRcdHoxb2ZmID0gejEqdztcblx0XHRcdHkwb2ZmID0geTAqdypkO1xuXHRcdFx0eTFvZmYgPSB5MSp3KmQ7XG5cdFx0XHRicmVhaztcblxuXHRcdGRlZmF1bHQ6IC8vIGNhc2UgMDogLy8gJ3h5eidcblx0XHRcdHgwb2ZmID0geDA7XG5cdFx0XHR4MW9mZiA9IHgxO1xuXHRcdFx0eTBvZmYgPSB5MCp3O1xuXHRcdFx0eTFvZmYgPSB5MSp3O1xuXHRcdFx0ejBvZmYgPSB6MCp3Kmg7XG5cdFx0XHR6MW9mZiA9IHoxKncqaDtcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0Ly8gU2FtcGxlIGRhdGEgdmVjdG9ycyBhcm91bmQgdGhlICh4LHkseikgcG9pbnQuXG5cdHZhciB2MDAwID0gdmVjdG9yc1t4MG9mZiArIHkwb2ZmICsgejBvZmZdO1xuXHR2YXIgdjAwMSA9IHZlY3RvcnNbeDBvZmYgKyB5MG9mZiArIHoxb2ZmXTtcblx0dmFyIHYwMTAgPSB2ZWN0b3JzW3gwb2ZmICsgeTFvZmYgKyB6MG9mZl07XG5cdHZhciB2MDExID0gdmVjdG9yc1t4MG9mZiArIHkxb2ZmICsgejFvZmZdO1xuXHR2YXIgdjEwMCA9IHZlY3RvcnNbeDFvZmYgKyB5MG9mZiArIHowb2ZmXTtcblx0dmFyIHYxMDEgPSB2ZWN0b3JzW3gxb2ZmICsgeTBvZmYgKyB6MW9mZl07XG5cdHZhciB2MTEwID0gdmVjdG9yc1t4MW9mZiArIHkxb2ZmICsgejBvZmZdO1xuXHR2YXIgdjExMSA9IHZlY3RvcnNbeDFvZmYgKyB5MW9mZiArIHoxb2ZmXTtcblxuXHR2YXIgYzAwID0gdmVjMy5jcmVhdGUoKTtcblx0dmFyIGMwMSA9IHZlYzMuY3JlYXRlKCk7XG5cdHZhciBjMTAgPSB2ZWMzLmNyZWF0ZSgpO1xuXHR2YXIgYzExID0gdmVjMy5jcmVhdGUoKTtcblxuXHR2ZWMzLmxlcnAoYzAwLCB2MDAwLCB2MTAwLCB4Zik7XG5cdHZlYzMubGVycChjMDEsIHYwMDEsIHYxMDEsIHhmKTtcblx0dmVjMy5sZXJwKGMxMCwgdjAxMCwgdjExMCwgeGYpO1xuXHR2ZWMzLmxlcnAoYzExLCB2MDExLCB2MTExLCB4Zik7XG5cblx0dmFyIGMwID0gdmVjMy5jcmVhdGUoKTtcblx0dmFyIGMxID0gdmVjMy5jcmVhdGUoKTtcblxuXHR2ZWMzLmxlcnAoYzAsIGMwMCwgYzEwLCB5Zik7XG5cdHZlYzMubGVycChjMSwgYzAxLCBjMTEsIHlmKTtcblxuXHR2YXIgYyA9IHZlYzMuY3JlYXRlKCk7XG5cblx0dmVjMy5sZXJwKGMsIGMwLCBjMSwgemYpO1xuXG5cdHJldHVybiBjO1xufTtcblxuXG52YXIgdmFicyA9IGZ1bmN0aW9uKGRzdCwgdikge1xuXHR2YXIgeCA9IHZbMF07XG5cdHZhciB5ID0gdlsxXTtcblx0dmFyIHogPSB2WzJdO1xuXHRkc3RbMF0gPSB4IDwgMCA/IC14IDogeDtcblx0ZHN0WzFdID0geSA8IDAgPyAteSA6IHk7XG5cdGRzdFsyXSA9IHogPCAwID8gLXogOiB6O1xuXHRyZXR1cm4gZHN0O1xufTtcblxudmFyIGZpbmRNaW5TZXBhcmF0aW9uID0gZnVuY3Rpb24oeHMpIHtcblx0dmFyIG1pblNlcGFyYXRpb24gPSBJbmZpbml0eTtcblx0eHMuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYjsgfSk7XG5cdHZhciBsZW4gPSB4cy5sZW5ndGg7XG5cdGZvciAodmFyIGk9MTsgaTxsZW47IGkrKykge1xuXHRcdHZhciBkID0gTWF0aC5hYnMoeHNbaV0gLSB4c1tpLTFdKTtcblx0XHRpZiAoZCA8IG1pblNlcGFyYXRpb24pIHtcblx0XHRcdG1pblNlcGFyYXRpb24gPSBkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWluU2VwYXJhdGlvbjtcbn07XG5cbi8vIEZpbmRzIHRoZSBtaW5pbXVtIHBlci1jb21wb25lbnQgZGlzdGFuY2UgaW4gcG9zaXRpb25zLlxuLy9cbnZhciBjYWxjdWxhdGVNaW5Qb3NpdGlvbkRpc3RhbmNlID0gZnVuY3Rpb24ocG9zaXRpb25zKSB7XG5cdHZhciB4cyA9IFtdLCB5cyA9IFtdLCB6cyA9IFtdO1xuXHR2YXIgeGkgPSB7fSwgeWkgPSB7fSwgemkgPSB7fTtcblx0dmFyIGxlbiA9IHBvc2l0aW9ucy5sZW5ndGg7XG5cdGZvciAodmFyIGk9MDsgaTxsZW47IGkrKykge1xuXHRcdHZhciBwID0gcG9zaXRpb25zW2ldO1xuXHRcdHZhciB4ID0gcFswXSwgeSA9IHBbMV0sIHogPSBwWzJdO1xuXG5cdFx0Ly8gU3BsaXQgdGhlIHBvc2l0aW9ucyBhcnJheSBpbnRvIGFycmF5cyBvZiB1bmlxdWUgY29tcG9uZW50IHZhbHVlcy5cblx0XHQvL1xuXHRcdC8vIFdoeSBnbyB0aHJvdWdoIHRoZSB0cm91YmxlIG9mIHVzaW5nIGEgdW5pcXVlbmVzcyBoYXNoIHRhYmxlIHZzXG5cdFx0Ly8gc29ydCBhbmQgdW5pcTpcblx0XHQvL1xuXHRcdC8vIFN1cHBvc2UgeW91J3ZlIGdvdCBhIG1pbGxpb24gcG9zaXRpb25zIGluIGEgMTAweDEwMHgxMDAgZ3JpZC5cblx0XHQvL1xuXHRcdC8vIFVzaW5nIGEgdW5pcXVlbmVzcyBoYXNoIHRhYmxlLCB5b3UncmUgZG9pbmcgMU0gYXJyYXkgcmVhZHMsXG5cdFx0Ly8gM00gaGFzaCB0YWJsZSBsb29rdXBzIGZyb20gMTAwLWVsZW1lbnQgaGFzaGVzLCAzMDAgaGFzaCB0YWJsZSBpbnNlcnRzLCB0aGVuXG5cdFx0Ly8gc29ydGluZyB0aHJlZSAxMDAtZWxlbWVudCBhcnJheXMgYW5kIGl0ZXJhdGluZyBvdmVyIHRoZW0uXG5cdFx0Ly8gUm91Z2hseSwgMU0gKyAzTSAqIGxuKDEwMCkgKyAzMDAgKiBsbigxMDAvMikgKyAzICogMTAwICogbG4oMTAwKSArIDMgKiAxMDAgPVxuXHRcdC8vICAgICAgICAgIDFNICsgMTMuOE0gKyAwLjAwMTJNICsgIDAuMDAxNE0gKyAwLjAwMDNNXG5cdFx0Ly8gICAgICAgICAgPX4gMTVNXG5cdFx0Ly9cblx0XHQvLyBTb3J0IGFuZCB1bmlxIHNvbHV0aW9uIHdvdWxkIGRvIDFNIGFycmF5IHJlYWRzLCAzTSBhcnJheSBpbnNlcnRzLFxuXHRcdC8vIHNvcnQgdGhyZWUgMU0tZWxlbWVudCBhcnJheXMgYW5kIGl0ZXJhdGUgb3ZlciB0aGVtLlxuXHRcdC8vIFJvdWdobHksIDFNICsgM00gKyAzICogMU0gKiBsbigxTSkgKyAzICogMU0gPVxuXHRcdC8vICAgICAgICAgIDFNICsgM00gKyA0MS40TSArIDNNXG5cdFx0Ly8gICAgICAgICAgPX4gNDguNE1cblx0XHQvL1xuXHRcdC8vIEd1ZXNzaW5nIHRoYXQgYSBoYXJkLWNvZGVkIHNvcnQgJiB1bmlxIHdvdWxkIGJlIGZhc3RlciBkdWUgdG8gbm90IGhhdmluZ1xuXHRcdC8vIHRvIHJ1biBhIGhhc2hpbmcgZnVuY3Rpb24gb24gZXZlcnl0aGluZy4gTW9yZSBtZW1vcnkgdXNhZ2UgdGhvdWdoXG5cdFx0Ly8gKGJ1bmNoIG9mIHNtYWxsIGhhc2ggdGFibGVzIHZzLiBkdXBsaWNhdGluZyB0aGUgaW5wdXQgYXJyYXkuKVxuXHRcdC8vXG5cdFx0Ly8gSW4gSlMtbGFuZCwgd2hvIGtub3dzLiBNYXliZSB4aVt4XSBjYXN0cyB4IHRvIHN0cmluZyBhbmQgZGVzdHJveXMgcGVyZixcblx0XHQvLyBtYXliZSBudW1lcmljIGtleXMgZ2V0IHNwZWNpYWwtY2FzZWQsIG1heWJlIHRoZSBvYmplY3QgbG9va3VwcyBydW4gYXQgbmVhciBPKDEpLXNwZWVkcy5cblx0XHQvLyBNYXliZSB0aGUgc29ydGluZyBjb21wYXJpc29uIGZ1bmN0aW9uIGlzIGV4cGVuc2l2ZSB0byBjYWxsLCBtYXliZSBpdCBnZXRzIGlubGluZWQgb3Igc3BlY2lhbC1jYXNlZC5cblx0XHQvL1xuXHRcdC8vIC4uLiBZb3UncmUgcHJvYmFibHkgbm90IGdvaW5nIHRvIGNhbGwgdGhpcyB3aXRoIG1vcmUgdGhhbiAxMGsgcG9zaXRpb25zIGFueWhvdywgc28gdGhpcyBpcyB2ZXJ5IGFjYWRlbWljLlxuXHRcdC8vXG5cdFx0aWYgKCF4aVt4XSkge1xuXHRcdFx0eHMucHVzaCh4KTtcblx0XHRcdHhpW3hdID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKCF5aVt5XSkge1xuXHRcdFx0eXMucHVzaCh5KTtcblx0XHRcdHlpW3ldID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKCF6aVt6XSkge1xuXHRcdFx0enMucHVzaCh6KTtcblx0XHRcdHppW3pdID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0dmFyIHhTZXAgPSBmaW5kTWluU2VwYXJhdGlvbih4cyk7XG5cdHZhciB5U2VwID0gZmluZE1pblNlcGFyYXRpb24oeXMpO1xuXHR2YXIgelNlcCA9IGZpbmRNaW5TZXBhcmF0aW9uKHpzKTtcblx0dmFyIG1pblNlcGFyYXRpb24gPSBNYXRoLm1pbih4U2VwLCB5U2VwLCB6U2VwKTtcblxuXHRyZXR1cm4gaXNGaW5pdGUobWluU2VwYXJhdGlvbikgPyBtaW5TZXBhcmF0aW9uIDogMTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmVjdG9yRmllbGQsIGJvdW5kcykge1xuXHR2YXIgcG9zaXRpb25zID0gdmVjdG9yRmllbGQuc3RhcnRpbmdQb3NpdGlvbnM7XG5cdHZhciBtYXhMZW5ndGggPSB2ZWN0b3JGaWVsZC5tYXhMZW5ndGggfHwgMTAwMDtcblx0dmFyIHR1YmVTaXplID0gdmVjdG9yRmllbGQudHViZVNpemUgfHwgMTtcblx0dmFyIGFic29sdXRlVHViZVNpemUgPSB2ZWN0b3JGaWVsZC5hYnNvbHV0ZVR1YmVTaXplO1xuXHR2YXIgZ3JpZEZpbGwgPSB2ZWN0b3JGaWVsZC5ncmlkRmlsbCB8fCAnK3greSt6JztcblxuXHR2YXIgZ3JpZEluZm8gPSB7fTtcblx0aWYoZ3JpZEZpbGwuaW5kZXhPZignLXgnKSAhPT0gLTEpIHsgZ3JpZEluZm8ucmV2ZXJzZWRYID0gdHJ1ZTsgfVxuXHRpZihncmlkRmlsbC5pbmRleE9mKCcteScpICE9PSAtMSkgeyBncmlkSW5mby5yZXZlcnNlZFkgPSB0cnVlOyB9XG5cdGlmKGdyaWRGaWxsLmluZGV4T2YoJy16JykgIT09IC0xKSB7IGdyaWRJbmZvLnJldmVyc2VkWiA9IHRydWU7IH1cblx0Z3JpZEluZm8uZmlsbGVkID0gR1JJRF9UWVBFUy5pbmRleE9mKGdyaWRGaWxsLnJlcGxhY2UoLy0vZywgJycpLnJlcGxhY2UoL1xcKy9nLCAnJykpO1xuXG5cdHZhciBnZXRWZWxvY2l0eSA9IHZlY3RvckZpZWxkLmdldFZlbG9jaXR5IHx8IGZ1bmN0aW9uKHApIHtcblx0XHRyZXR1cm4gc2FtcGxlTWVzaGdyaWQocCwgdmVjdG9yRmllbGQsIGdyaWRJbmZvKTtcblx0fTtcblxuXHR2YXIgZ2V0RGl2ZXJnZW5jZSA9IHZlY3RvckZpZWxkLmdldERpdmVyZ2VuY2UgfHwgZnVuY3Rpb24ocCwgdjApIHtcblx0XHR2YXIgZHAgPSB2ZWMzLmNyZWF0ZSgpO1xuXHRcdHZhciBlID0gMC4wMDAxO1xuXG5cdFx0dmVjMy5hZGQoZHAsIHAsIFtlLCAwLCAwXSk7XG5cdFx0dmFyIHZ4ID0gZ2V0VmVsb2NpdHkoZHApO1xuXHRcdHZlYzMuc3VidHJhY3QodngsIHZ4LCB2MCk7XG5cdFx0dmVjMy5zY2FsZSh2eCwgdngsIDEvZSk7XG5cblx0XHR2ZWMzLmFkZChkcCwgcCwgWzAsIGUsIDBdKTtcblx0XHR2YXIgdnkgPSBnZXRWZWxvY2l0eShkcCk7XG5cdFx0dmVjMy5zdWJ0cmFjdCh2eSwgdnksIHYwKTtcblx0XHR2ZWMzLnNjYWxlKHZ5LCB2eSwgMS9lKTtcblxuXHRcdHZlYzMuYWRkKGRwLCBwLCBbMCwgMCwgZV0pO1xuXHRcdHZhciB2eiA9IGdldFZlbG9jaXR5KGRwKTtcblx0XHR2ZWMzLnN1YnRyYWN0KHZ6LCB2eiwgdjApO1xuXHRcdHZlYzMuc2NhbGUodnosIHZ6LCAxL2UpO1xuXG5cdFx0dmVjMy5hZGQoZHAsIHZ4LCB2eSk7XG5cdFx0dmVjMy5hZGQoZHAsIGRwLCB2eik7XG5cdFx0cmV0dXJuIGRwO1xuXHR9O1xuXG5cdHZhciBzdHJlYW1zID0gW107XG5cblx0dmFyIG1pblggPSBib3VuZHNbMF1bMF0sIG1pblkgPSBib3VuZHNbMF1bMV0sIG1pblogPSBib3VuZHNbMF1bMl07XG5cdHZhciBtYXhYID0gYm91bmRzWzFdWzBdLCBtYXhZID0gYm91bmRzWzFdWzFdLCBtYXhaID0gYm91bmRzWzFdWzJdO1xuXG5cdHZhciBpbkJvdW5kcyA9IGZ1bmN0aW9uKHApIHtcblx0XHR2YXIgeCA9IHBbMF07XG5cdFx0dmFyIHkgPSBwWzFdO1xuXHRcdHZhciB6ID0gcFsyXTtcblx0XHRyZXR1cm4gIShcblx0XHRcdHggPCBtaW5YIHx8IHggPiBtYXhYIHx8XG5cdFx0XHR5IDwgbWluWSB8fCB5ID4gbWF4WSB8fFxuXHRcdFx0eiA8IG1pblogfHwgeiA+IG1heFpcblx0XHQpO1xuXHR9O1xuXG5cdHZhciBib3VuZHNTaXplID0gdmVjMy5kaXN0YW5jZShib3VuZHNbMF0sIGJvdW5kc1sxXSk7XG5cdHZhciBtYXhTdGVwU2l6ZSA9IDEwICogYm91bmRzU2l6ZSAvIG1heExlbmd0aDtcblx0dmFyIG1heFN0ZXBTaXplU3EgPSBtYXhTdGVwU2l6ZSAqIG1heFN0ZXBTaXplO1xuXG5cdHZhciBtaW5EaXN0YW5jZSA9IDE7XG5cdHZhciBtYXhEaXZlcmdlbmNlID0gMDsgLy8gRm9yIGNvbXBvbmVudC13aXNlIGRpdmVyZ2VuY2UgdmVjMy5jcmVhdGUoKTtcblxuXHQvLyBJbiBjYXNlIHdlIG5lZWQgdG8gZG8gY29tcG9uZW50LXdpc2UgZGl2ZXJnZW5jZSB2aXN1YWxpemF0aW9uXG5cdC8vIHZhciB0bXAgPSB2ZWMzLmNyZWF0ZSgpO1xuXG5cdHZhciBsZW4gPSBwb3NpdGlvbnMubGVuZ3RoO1xuXHRpZiAobGVuID4gMSkge1xuXHRcdG1pbkRpc3RhbmNlID0gY2FsY3VsYXRlTWluUG9zaXRpb25EaXN0YW5jZShwb3NpdGlvbnMpO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdHZhciBwID0gdmVjMy5jcmVhdGUoKTtcblx0XHR2ZWMzLmNvcHkocCwgcG9zaXRpb25zW2ldKTtcblxuXHRcdHZhciBzdHJlYW0gPSBbcF07XG5cdFx0dmFyIHZlbG9jaXRpZXMgPSBbXTtcblx0XHR2YXIgdiA9IGdldFZlbG9jaXR5KHApO1xuXHRcdHZhciBvcCA9IHA7XG5cdFx0dmVsb2NpdGllcy5wdXNoKHYpO1xuXG5cdFx0dmFyIGRpdmVyZ2VuY2VzID0gW107XG5cblx0XHR2YXIgZHYgPSBnZXREaXZlcmdlbmNlKHAsIHYpO1xuXHRcdHZhciBkdkxlbmd0aCA9IHZlYzMubGVuZ3RoKGR2KTtcblx0XHRpZiAoaXNGaW5pdGUoZHZMZW5ndGgpICYmIGR2TGVuZ3RoID4gbWF4RGl2ZXJnZW5jZSkge1xuXHRcdFx0bWF4RGl2ZXJnZW5jZSA9IGR2TGVuZ3RoO1xuXHRcdH1cblx0XHQvLyBJbiBjYXNlIHdlIG5lZWQgdG8gZG8gY29tcG9uZW50LXdpc2UgZGl2ZXJnZW5jZSB2aXN1YWxpemF0aW9uXG5cdFx0Ly8gdmVjMy5tYXgobWF4RGl2ZXJnZW5jZSwgbWF4RGl2ZXJnZW5jZSwgdmFicyh0bXAsIGR2KSk7XG5cdFx0ZGl2ZXJnZW5jZXMucHVzaChkdkxlbmd0aCk7XG5cblx0XHRzdHJlYW1zLnB1c2goe3BvaW50czogc3RyZWFtLCB2ZWxvY2l0aWVzOiB2ZWxvY2l0aWVzLCBkaXZlcmdlbmNlczogZGl2ZXJnZW5jZXN9KTtcblxuXHRcdHZhciBqID0gMDtcblxuXHRcdHdoaWxlIChqIDwgbWF4TGVuZ3RoICogMTAwICYmIHN0cmVhbS5sZW5ndGggPCBtYXhMZW5ndGggJiYgaW5Cb3VuZHMocCkpIHtcblx0XHRcdGorKztcblx0XHRcdHZhciBucCA9IHZlYzMuY2xvbmUodik7XG5cdFx0XHR2YXIgc3FMZW4gPSB2ZWMzLnNxdWFyZWRMZW5ndGgobnApO1xuXHRcdFx0aWYgKHNxTGVuID09PSAwKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fSBlbHNlIGlmIChzcUxlbiA+IG1heFN0ZXBTaXplU3EpIHtcblx0XHRcdFx0dmVjMy5zY2FsZShucCwgbnAsIG1heFN0ZXBTaXplIC8gTWF0aC5zcXJ0KHNxTGVuKSk7XG5cdFx0XHR9XG5cdFx0XHR2ZWMzLmFkZChucCwgbnAsIHApO1xuXG5cdFx0XHR2ID0gZ2V0VmVsb2NpdHkobnApO1xuXG5cdFx0XHRpZiAodmVjMy5zcXVhcmVkRGlzdGFuY2Uob3AsIG5wKSAtIG1heFN0ZXBTaXplU3EgPiAtMC4wMDAxICogbWF4U3RlcFNpemVTcSkge1xuXHRcdFx0XHRzdHJlYW0ucHVzaChucCk7XG5cdFx0XHRcdG9wID0gbnA7XG5cdFx0XHRcdHZlbG9jaXRpZXMucHVzaCh2KTtcblx0XHRcdFx0dmFyIGR2ID0gZ2V0RGl2ZXJnZW5jZShucCwgdik7XG5cdFx0XHRcdHZhciBkdkxlbmd0aCA9IHZlYzMubGVuZ3RoKGR2KTtcblx0XHRcdFx0aWYgKGlzRmluaXRlKGR2TGVuZ3RoKSAmJiBkdkxlbmd0aCA+IG1heERpdmVyZ2VuY2UpIHtcblx0XHRcdFx0XHRtYXhEaXZlcmdlbmNlID0gZHZMZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gSW4gY2FzZSB3ZSBuZWVkIHRvIGRvIGNvbXBvbmVudC13aXNlIGRpdmVyZ2VuY2UgdmlzdWFsaXphdGlvblxuXHRcdFx0XHQvL3ZlYzMubWF4KG1heERpdmVyZ2VuY2UsIG1heERpdmVyZ2VuY2UsIHZhYnModG1wLCBkdikpO1xuXHRcdFx0XHRkaXZlcmdlbmNlcy5wdXNoKGR2TGVuZ3RoKTtcblx0XHRcdH1cblxuXHRcdFx0cCA9IG5wO1xuXHRcdH1cblx0fVxuXG5cdHZhciB0dWJlcyA9IGNyZWF0ZVR1YmVzKHN0cmVhbXMsIHZlY3RvckZpZWxkLmNvbG9ybWFwLCBtYXhEaXZlcmdlbmNlLCBtaW5EaXN0YW5jZSk7XG5cblx0aWYgKGFic29sdXRlVHViZVNpemUpIHtcblx0XHR0dWJlcy50dWJlU2NhbGUgPSBhYnNvbHV0ZVR1YmVTaXplO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEF2b2lkIGRpdmlzaW9uIGJ5IHplcm8uXG5cdFx0aWYgKG1heERpdmVyZ2VuY2UgPT09IDApIHtcblx0XHRcdG1heERpdmVyZ2VuY2UgPSAxO1xuXHRcdH1cblx0XHR0dWJlcy50dWJlU2NhbGUgPSB0dWJlU2l6ZSAqIDAuNSAqIG1pbkRpc3RhbmNlIC8gbWF4RGl2ZXJnZW5jZTtcblx0fVxuXG5cdHJldHVybiB0dWJlcztcbn07XG5cbnZhciBzaGFkZXJzID0gcmVxdWlyZSgnLi9saWIvc2hhZGVycycpO1xudmFyIGNyZWF0ZU1lc2ggPSByZXF1aXJlKCdnbC1jb25lM2QnKS5jcmVhdGVNZXNoO1xubW9kdWxlLmV4cG9ydHMuY3JlYXRlVHViZU1lc2ggPSBmdW5jdGlvbihnbCwgcGFyYW1zKSB7XG5cdHJldHVybiBjcmVhdGVNZXNoKGdsLCBwYXJhbXMsIHtcblx0XHRzaGFkZXJzOiBzaGFkZXJzLFxuXHRcdHRyYWNlVHlwZTogJ3N0cmVhbXR1YmUnXG5cdH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBhZGRcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGFkZCAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdXG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdXG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdXG4gIG91dFszXSA9IGFbM10gKyBiWzNdXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gY2xvbmVcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cbmZ1bmN0aW9uIGNsb25lIChhKSB7XG4gIHZhciBvdXQgPSBuZXcgRmxvYXQzMkFycmF5KDQpXG4gIG91dFswXSA9IGFbMF1cbiAgb3V0WzFdID0gYVsxXVxuICBvdXRbMl0gPSBhWzJdXG4gIG91dFszXSA9IGFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBjb3B5XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gY29weSAob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF1cbiAgb3V0WzFdID0gYVsxXVxuICBvdXRbMl0gPSBhWzJdXG4gIG91dFszXSA9IGFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XG4gKlxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG5mdW5jdGlvbiBjcmVhdGUgKCkge1xuICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSg0KVxuICBvdXRbMF0gPSAwXG4gIG91dFsxXSA9IDBcbiAgb3V0WzJdID0gMFxuICBvdXRbM10gPSAwXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZGlzdGFuY2VcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuZnVuY3Rpb24gZGlzdGFuY2UgKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgeiA9IGJbMl0gLSBhWzJdLFxuICAgIHcgPSBiWzNdIC0gYVszXVxuICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3KVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBkaXZpZGVcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGRpdmlkZSAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLyBiWzBdXG4gIG91dFsxXSA9IGFbMV0gLyBiWzFdXG4gIG91dFsyXSA9IGFbMl0gLyBiWzJdXG4gIG91dFszXSA9IGFbM10gLyBiWzNdXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZG90XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG5mdW5jdGlvbiBkb3QgKGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZyb21WYWx1ZXNcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xuZnVuY3Rpb24gZnJvbVZhbHVlcyAoeCwgeSwgeiwgdykge1xuICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSg0KVxuICBvdXRbMF0gPSB4XG4gIG91dFsxXSA9IHlcbiAgb3V0WzJdID0gelxuICBvdXRbM10gPSB3XG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6IHJlcXVpcmUoJy4vY3JlYXRlJyksXG4gIGNsb25lOiByZXF1aXJlKCcuL2Nsb25lJyksXG4gIGZyb21WYWx1ZXM6IHJlcXVpcmUoJy4vZnJvbVZhbHVlcycpLFxuICBjb3B5OiByZXF1aXJlKCcuL2NvcHknKSxcbiAgc2V0OiByZXF1aXJlKCcuL3NldCcpLFxuICBhZGQ6IHJlcXVpcmUoJy4vYWRkJyksXG4gIHN1YnRyYWN0OiByZXF1aXJlKCcuL3N1YnRyYWN0JyksXG4gIG11bHRpcGx5OiByZXF1aXJlKCcuL211bHRpcGx5JyksXG4gIGRpdmlkZTogcmVxdWlyZSgnLi9kaXZpZGUnKSxcbiAgbWluOiByZXF1aXJlKCcuL21pbicpLFxuICBtYXg6IHJlcXVpcmUoJy4vbWF4JyksXG4gIHNjYWxlOiByZXF1aXJlKCcuL3NjYWxlJyksXG4gIHNjYWxlQW5kQWRkOiByZXF1aXJlKCcuL3NjYWxlQW5kQWRkJyksXG4gIGRpc3RhbmNlOiByZXF1aXJlKCcuL2Rpc3RhbmNlJyksXG4gIHNxdWFyZWREaXN0YW5jZTogcmVxdWlyZSgnLi9zcXVhcmVkRGlzdGFuY2UnKSxcbiAgbGVuZ3RoOiByZXF1aXJlKCcuL2xlbmd0aCcpLFxuICBzcXVhcmVkTGVuZ3RoOiByZXF1aXJlKCcuL3NxdWFyZWRMZW5ndGgnKSxcbiAgbmVnYXRlOiByZXF1aXJlKCcuL25lZ2F0ZScpLFxuICBpbnZlcnNlOiByZXF1aXJlKCcuL2ludmVyc2UnKSxcbiAgbm9ybWFsaXplOiByZXF1aXJlKCcuL25vcm1hbGl6ZScpLFxuICBkb3Q6IHJlcXVpcmUoJy4vZG90JyksXG4gIGxlcnA6IHJlcXVpcmUoJy4vbGVycCcpLFxuICByYW5kb206IHJlcXVpcmUoJy4vcmFuZG9tJyksXG4gIHRyYW5zZm9ybU1hdDQ6IHJlcXVpcmUoJy4vdHJhbnNmb3JtTWF0NCcpLFxuICB0cmFuc2Zvcm1RdWF0OiByZXF1aXJlKCcuL3RyYW5zZm9ybVF1YXQnKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpbnZlcnNlXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBpbnZlcnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gaW52ZXJzZSAob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF1cbiAgb3V0WzFdID0gMS4wIC8gYVsxXVxuICBvdXRbMl0gPSAxLjAgLyBhWzJdXG4gIG91dFszXSA9IDEuMCAvIGFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBsZW5ndGhcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5mdW5jdGlvbiBsZW5ndGggKGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgIHkgPSBhWzFdLFxuICAgIHogPSBhWzJdLFxuICAgIHcgPSBhWzNdXG4gIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGxlcnBcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbGVycCAob3V0LCBhLCBiLCB0KSB7XG4gIHZhciBheCA9IGFbMF0sXG4gICAgYXkgPSBhWzFdLFxuICAgIGF6ID0gYVsyXSxcbiAgICBhdyA9IGFbM11cbiAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheClcbiAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSlcbiAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheilcbiAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdylcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBtYXhcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIG1heCAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pXG4gIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pXG4gIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pXG4gIG91dFszXSA9IE1hdGgubWF4KGFbM10sIGJbM10pXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbWluXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBtaW4gKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKVxuICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKVxuICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKVxuICBvdXRbM10gPSBNYXRoLm1pbihhWzNdLCBiWzNdKVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IG11bHRpcGx5XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBtdWx0aXBseSAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiWzBdXG4gIG91dFsxXSA9IGFbMV0gKiBiWzFdXG4gIG91dFsyXSA9IGFbMl0gKiBiWzJdXG4gIG91dFszXSA9IGFbM10gKiBiWzNdXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbmVnYXRlXG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbmVnYXRlIChvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF1cbiAgb3V0WzFdID0gLWFbMV1cbiAgb3V0WzJdID0gLWFbMl1cbiAgb3V0WzNdID0gLWFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVcblxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZSAob3V0LCBhKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICB5ID0gYVsxXSxcbiAgICB6ID0gYVsyXSxcbiAgICB3ID0gYVszXVxuICB2YXIgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHdcbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbilcbiAgICBvdXRbMF0gPSB4ICogbGVuXG4gICAgb3V0WzFdID0geSAqIGxlblxuICAgIG91dFsyXSA9IHogKiBsZW5cbiAgICBvdXRbM10gPSB3ICogbGVuXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuIiwidmFyIHZlY05vcm1hbGl6ZSA9IHJlcXVpcmUoJy4vbm9ybWFsaXplJylcbnZhciB2ZWNTY2FsZSA9IHJlcXVpcmUoJy4vc2NhbGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmRvbVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHJhbmRvbSAob3V0LCBzY2FsZSkge1xuICBzY2FsZSA9IHNjYWxlIHx8IDEuMFxuXG4gIC8vIFRPRE86IFRoaXMgaXMgYSBwcmV0dHkgYXdmdWwgd2F5IG9mIGRvaW5nIHRoaXMuIEZpbmQgc29tZXRoaW5nIGJldHRlci5cbiAgb3V0WzBdID0gTWF0aC5yYW5kb20oKVxuICBvdXRbMV0gPSBNYXRoLnJhbmRvbSgpXG4gIG91dFsyXSA9IE1hdGgucmFuZG9tKClcbiAgb3V0WzNdID0gTWF0aC5yYW5kb20oKVxuICB2ZWNOb3JtYWxpemUob3V0LCBvdXQpXG4gIHZlY1NjYWxlKG91dCwgb3V0LCBzY2FsZSlcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZVxuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzQgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBzY2FsZSAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiXG4gIG91dFsxXSA9IGFbMV0gKiBiXG4gIG91dFsyXSA9IGFbMl0gKiBiXG4gIG91dFszXSA9IGFbM10gKiBiXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gc2NhbGVBbmRBZGRcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gc2NhbGVBbmRBZGQgKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpXG4gIG91dFsxXSA9IGFbMV0gKyAoYlsxXSAqIHNjYWxlKVxuICBvdXRbMl0gPSBhWzJdICsgKGJbMl0gKiBzY2FsZSlcbiAgb3V0WzNdID0gYVszXSArIChiWzNdICogc2NhbGUpXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gc2V0XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHNldCAob3V0LCB4LCB5LCB6LCB3KSB7XG4gIG91dFswXSA9IHhcbiAgb3V0WzFdID0geVxuICBvdXRbMl0gPSB6XG4gIG91dFszXSA9IHdcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzcXVhcmVkRGlzdGFuY2VcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbmZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZSAoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgdyA9IGJbM10gLSBhWzNdXG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogd1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzcXVhcmVkTGVuZ3RoXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xuZnVuY3Rpb24gc3F1YXJlZExlbmd0aCAoYSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgeSA9IGFbMV0sXG4gICAgeiA9IGFbMl0sXG4gICAgdyA9IGFbM11cbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHN1YnRyYWN0XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0IChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF1cbiAgb3V0WzFdID0gYVsxXSAtIGJbMV1cbiAgb3V0WzJdID0gYVsyXSAtIGJbMl1cbiAgb3V0WzNdID0gYVszXSAtIGJbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1RdWF0XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7cXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybVF1YXQgKG91dCwgYSwgcSkge1xuICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICBxeCA9IHFbMF0sIHF5ID0gcVsxXSwgcXogPSBxWzJdLCBxdyA9IHFbM10sXG5cbiAgICAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xuICAgIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5LFxuICAgIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6LFxuICAgIGl6ID0gcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4LFxuICAgIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogelxuXG4gIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgb3V0WzBdID0gaXggKiBxdyArIGl3ICogLXF4ICsgaXkgKiAtcXogLSBpeiAqIC1xeVxuICBvdXRbMV0gPSBpeSAqIHF3ICsgaXcgKiAtcXkgKyBpeiAqIC1xeCAtIGl4ICogLXF6XG4gIG91dFsyXSA9IGl6ICogcXcgKyBpdyAqIC1xeiArIGl4ICogLXF5IC0gaXkgKiAtcXhcbiAgb3V0WzNdID0gYVszXVxuICByZXR1cm4gb3V0XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9zdHJlYW10dWJlJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvclNjYWxlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvYXR0cmlidXRlcycpO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgbWVzaDNkQXR0cnMgPSByZXF1aXJlKCcuLi9tZXNoM2QvYXR0cmlidXRlcycpO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxudmFyIGF0dHJzID0ge1xuICAgIHg6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeCBjb29yZGluYXRlcyBvZiB0aGUgdmVjdG9yIGZpZWxkLidcbiAgICB9LFxuICAgIHk6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeSBjb29yZGluYXRlcyBvZiB0aGUgdmVjdG9yIGZpZWxkLidcbiAgICB9LFxuICAgIHo6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeiBjb29yZGluYXRlcyBvZiB0aGUgdmVjdG9yIGZpZWxkLidcbiAgICB9LFxuXG4gICAgdToge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeCBjb21wb25lbnRzIG9mIHRoZSB2ZWN0b3IgZmllbGQuJ1xuICAgIH0sXG4gICAgdjoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeSBjb21wb25lbnRzIG9mIHRoZSB2ZWN0b3IgZmllbGQuJ1xuICAgIH0sXG4gICAgdzoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeiBjb21wb25lbnRzIG9mIHRoZSB2ZWN0b3IgZmllbGQuJ1xuICAgIH0sXG5cbiAgICBzdGFydHM6IHtcbiAgICAgICAgeDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHggY29tcG9uZW50cyBvZiB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHN0cmVhbXR1YmVzJyxcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB5IGNvbXBvbmVudHMgb2YgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSBzdHJlYW10dWJlcycsXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICB6OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgeiBjb21wb25lbnRzIG9mIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgc3RyZWFtdHViZXMnLFxuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sXG5cbiAgICBtYXhkaXNwbGF5ZWQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDEwMDAsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgbWF4aW11bSBudW1iZXIgb2YgZGlzcGxheWVkIHNlZ21lbnRzIGluIGEgc3RyZWFtdHViZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIC8vIFRPRE9cbiAgICAvL1xuICAgIC8vIFNob3VsZCBhZGQgJ2Fic29sdXRlJyAobGlrZSBjb25lIHRyYWNlcyBoYXZlKSwgYnV0IGN1cnJlbnRseSBnbC1zdHJlYW10dWJlM2Qnc1xuICAgIC8vIGBhYnNvbHV0ZVR1YmVTaXplYCBkb2Vzbid0IGJlaGF2ZSB3ZWxsIGVub3VnaCBmb3Igb3VyIG5lZWRzLlxuICAgIC8vXG4gICAgLy8gJ2ZpeGVkJyB3b3VsZCBiZSBhIG5pY2UgYWRkaXRpb24gdG8gcGxvdCBzdHJlYW0gJ2xpbmVzJywgc2VlXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9wbG90bHkuanMvY29tbWl0LzgxMmJlMjA3NTBlMjFlMGExODMxOTc1MDAxYzI0OGQzNjU4NTBmNzMjcjI5MTI5ODc3XG4gICAgLy9cbiAgICAvLyBzaXplbW9kZToge1xuICAgIC8vICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgLy8gICAgIHZhbHVlczogWydzY2FsZWQnLCAnYWJzb2x1dGUnLCAnZml4ZWQnXSxcbiAgICAvLyAgICAgZGZsdDogJ3NjYWxlZCcsXG4gICAgLy8gICAgIHJvbGU6ICdpbmZvJyxcbiAgICAvLyAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAvLyAgICAgZGVzY3JpcHRpb246IFtcbiAgICAvLyAgICAgICAgICdTZXRzIHRoZSBtb2RlIGJ5IHdoaWNoIHRoZSBzdHJlYW10dWJlcyBhcmUgc2l6ZWQuJ1xuICAgIC8vICAgICBdLmpvaW4oJyAnKVxuICAgIC8vIH0sXG5cbiAgICBzaXplcmVmOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgc2NhbGluZyBmYWN0b3IgZm9yIHRoZSBzdHJlYW10dWJlcy4nLFxuICAgICAgICAgICAgJ1RoZSBkZWZhdWx0IGlzIDEsIHdoaWNoIGF2b2lkcyB0d28gbWF4IGRpdmVyZ2VuY2UgdHViZXMgZnJvbSB0b3VjaGluZycsXG4gICAgICAgICAgICAnYXQgYWRqYWNlbnQgc3RhcnRpbmcgcG9zaXRpb25zLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgdGV4dDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIGEgdGV4dCBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCB0aGlzIHRyYWNlLicsXG4gICAgICAgICAgICAnSWYgdHJhY2UgYGhvdmVyaW5mb2AgY29udGFpbnMgYSAqdGV4dCogZmxhZywnLFxuICAgICAgICAgICAgJ3RoaXMgdGV4dCBlbGVtZW50IHdpbGwgYmUgc2VlbiBpbiBhbGwgaG92ZXIgbGFiZWxzLicsXG4gICAgICAgICAgICAnTm90ZSB0aGF0IHN0cmVhbXR1YmUgdHJhY2VzIGRvIG5vdCBzdXBwb3J0IGFycmF5IGB0ZXh0YCB2YWx1ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgaG92ZXJ0ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NhbWUgYXMgYHRleHRgLidcbiAgICB9LFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdjYWxjJ30sIHtcbiAgICAgICAga2V5czogW1xuICAgICAgICAgICAgJ3R1YmV4JywgJ3R1YmV5JywgJ3R1YmV6JyxcbiAgICAgICAgICAgICd0dWJldScsICd0dWJldicsICd0dWJldycsXG4gICAgICAgICAgICAnbm9ybScsICdkaXZlcmdlbmNlJ1xuICAgICAgICBdXG4gICAgfSksXG4gICAgc2hvd2xlZ2VuZDogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLnNob3dsZWdlbmQsIHtkZmx0OiBmYWxzZX0pXG59O1xuXG5leHRlbmRGbGF0KGF0dHJzLCBjb2xvclNjYWxlQXR0cnMoJycsIHtcbiAgICBjb2xvckF0dHI6ICd1L3YvdyBub3JtJyxcbiAgICBzaG93U2NhbGVEZmx0OiB0cnVlLFxuICAgIGVkaXRUeXBlT3ZlcnJpZGU6ICdjYWxjJ1xufSkpO1xuXG52YXIgZnJvbU1lc2gzZCA9IFsnb3BhY2l0eScsICdsaWdodHBvc2l0aW9uJywgJ2xpZ2h0aW5nJ107XG5mcm9tTWVzaDNkLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgIGF0dHJzW2tdID0gbWVzaDNkQXR0cnNba107XG59KTtcblxuYXR0cnMuaG92ZXJpbmZvID0gZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbywge1xuICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgZmxhZ3M6IFsneCcsICd5JywgJ3onLCAndScsICd2JywgJ3cnLCAnbm9ybScsICdkaXZlcmdlbmNlJywgJ3RleHQnLCAnbmFtZSddLFxuICAgIGRmbHQ6ICd4K3kreitub3JtK3RleHQrbmFtZSdcbn0pO1xuXG5hdHRycy50cmFuc2Zvcm1zID0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF0dHJzO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHViZTJtZXNoID0gcmVxdWlyZSgnZ2wtc3RyZWFtdHViZTNkJyk7XG52YXIgY3JlYXRlVHViZU1lc2ggPSB0dWJlMm1lc2guY3JlYXRlVHViZU1lc2g7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBwYXJzZUNvbG9yU2NhbGUgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2xfZm9ybWF0X2NvbG9yJykucGFyc2VDb2xvclNjYWxlO1xudmFyIGV4dHJhY3RPcHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJykuZXh0cmFjdE9wdHM7XG52YXIgemlwMyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dsM2QvemlwMycpO1xuXG52YXIgYXhpc05hbWUyc2NhbGVJbmRleCA9IHt4YXhpczogMCwgeWF4aXM6IDEsIHpheGlzOiAyfTtcblxuZnVuY3Rpb24gU3RyZWFtdHViZShzY2VuZSwgdWlkKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMudWlkID0gdWlkO1xuICAgIHRoaXMubWVzaCA9IG51bGw7XG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbn1cblxudmFyIHByb3RvID0gU3RyZWFtdHViZS5wcm90b3R5cGU7XG5cbnByb3RvLmhhbmRsZVBpY2sgPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcbiAgICB2YXIgc2NlbmVMYXlvdXQgPSB0aGlzLnNjZW5lLmZ1bGxTY2VuZUxheW91dDtcbiAgICB2YXIgZGF0YVNjYWxlID0gdGhpcy5zY2VuZS5kYXRhU2NhbGU7XG5cbiAgICBmdW5jdGlvbiBmcm9tRGF0YVNjYWxlKHYsIGF4aXNOYW1lKSB7XG4gICAgICAgIHZhciBheCA9IHNjZW5lTGF5b3V0W2F4aXNOYW1lXTtcbiAgICAgICAgdmFyIHNjYWxlID0gZGF0YVNjYWxlW2F4aXNOYW1lMnNjYWxlSW5kZXhbYXhpc05hbWVdXTtcbiAgICAgICAgcmV0dXJuIGF4LmwyYyh2KSAvIHNjYWxlO1xuICAgIH1cblxuICAgIGlmKHNlbGVjdGlvbi5vYmplY3QgPT09IHRoaXMubWVzaCkge1xuICAgICAgICB2YXIgcG9zID0gc2VsZWN0aW9uLmRhdGEucG9zaXRpb247XG4gICAgICAgIHZhciB1dnggPSBzZWxlY3Rpb24uZGF0YS52ZWxvY2l0eTtcblxuICAgICAgICBzZWxlY3Rpb24udHJhY2VDb29yZGluYXRlID0gW1xuICAgICAgICAgICAgZnJvbURhdGFTY2FsZShwb3NbMF0sICd4YXhpcycpLFxuICAgICAgICAgICAgZnJvbURhdGFTY2FsZShwb3NbMV0sICd5YXhpcycpLFxuICAgICAgICAgICAgZnJvbURhdGFTY2FsZShwb3NbMl0sICd6YXhpcycpLFxuXG4gICAgICAgICAgICBmcm9tRGF0YVNjYWxlKHV2eFswXSwgJ3hheGlzJyksXG4gICAgICAgICAgICBmcm9tRGF0YVNjYWxlKHV2eFsxXSwgJ3lheGlzJyksXG4gICAgICAgICAgICBmcm9tRGF0YVNjYWxlKHV2eFsyXSwgJ3pheGlzJyksXG5cbiAgICAgICAgICAgIC8vIHUvdi93IG5vcm1cbiAgICAgICAgICAgIHNlbGVjdGlvbi5kYXRhLmludGVuc2l0eSAqIHRoaXMuZGF0YS5fbm9ybU1heCxcbiAgICAgICAgICAgIC8vIGRpdmVyZ2VuY2VcbiAgICAgICAgICAgIHNlbGVjdGlvbi5kYXRhLmRpdmVyZ2VuY2VcbiAgICAgICAgXTtcblxuICAgICAgICBzZWxlY3Rpb24udGV4dExhYmVsID0gdGhpcy5kYXRhLmhvdmVydGV4dCB8fCB0aGlzLmRhdGEudGV4dDtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBnZXREZmx0U3RhcnRpbmdQb3NpdGlvbnModmVjKSB7XG4gICAgdmFyIGxlbiA9IHZlYy5sZW5ndGg7XG4gICAgdmFyIHM7XG5cbiAgICBpZihsZW4gPiAyKSB7XG4gICAgICAgIHMgPSB2ZWMuc2xpY2UoMSwgbGVuIC0gMSk7XG4gICAgfSBlbHNlIGlmKGxlbiA9PT0gMikge1xuICAgICAgICBzID0gWyh2ZWNbMF0gKyB2ZWNbMV0pIC8gMl07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcyA9IHZlYztcbiAgICB9XG4gICAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGdldEJvdW5kUGFkcyh2ZWMpIHtcbiAgICB2YXIgbGVuID0gdmVjLmxlbmd0aDtcbiAgICBpZihsZW4gPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIFswLjUsIDAuNV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFt2ZWNbMV0gLSB2ZWNbMF0sIHZlY1tsZW4gLSAxXSAtIHZlY1tsZW4gLSAyXV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0KHNjZW5lLCB0cmFjZSkge1xuICAgIHZhciBzY2VuZUxheW91dCA9IHNjZW5lLmZ1bGxTY2VuZUxheW91dDtcbiAgICB2YXIgZGF0YVNjYWxlID0gc2NlbmUuZGF0YVNjYWxlO1xuICAgIHZhciBsZW4gPSB0cmFjZS5fbGVuO1xuICAgIHZhciB0dWJlT3B0cyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gdG9EYXRhQ29vcmRzKGFyciwgYXhpc05hbWUpIHtcbiAgICAgICAgdmFyIGF4ID0gc2NlbmVMYXlvdXRbYXhpc05hbWVdO1xuICAgICAgICB2YXIgc2NhbGUgPSBkYXRhU2NhbGVbYXhpc05hbWUyc2NhbGVJbmRleFtheGlzTmFtZV1dO1xuICAgICAgICByZXR1cm4gTGliLnNpbXBsZU1hcChhcnIsIGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGF4LmQybCh2KSAqIHNjYWxlOyB9KTtcbiAgICB9XG5cbiAgICB0dWJlT3B0cy52ZWN0b3JzID0gemlwMyhcbiAgICAgICAgdG9EYXRhQ29vcmRzKHRyYWNlLl91LCAneGF4aXMnKSxcbiAgICAgICAgdG9EYXRhQ29vcmRzKHRyYWNlLl92LCAneWF4aXMnKSxcbiAgICAgICAgdG9EYXRhQ29vcmRzKHRyYWNlLl93LCAnemF4aXMnKSxcbiAgICAgICAgbGVuXG4gICAgKTtcblxuICAgIC8vIE92ZXItc3BlY2lmaWVkIG1lc2ggY2FzZSwgdGhpcyB3b3VsZCBlcnJvciBpbiB0dWJlMm1lc2hcbiAgICBpZighbGVuKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb3NpdGlvbnM6IFtdLFxuICAgICAgICAgICAgY2VsbHM6IFtdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIG1lc2h4ID0gdG9EYXRhQ29vcmRzKHRyYWNlLl9YcywgJ3hheGlzJyk7XG4gICAgdmFyIG1lc2h5ID0gdG9EYXRhQ29vcmRzKHRyYWNlLl9ZcywgJ3lheGlzJyk7XG4gICAgdmFyIG1lc2h6ID0gdG9EYXRhQ29vcmRzKHRyYWNlLl9acywgJ3pheGlzJyk7XG5cbiAgICB0dWJlT3B0cy5tZXNoZ3JpZCA9IFttZXNoeCwgbWVzaHksIG1lc2h6XTtcbiAgICB0dWJlT3B0cy5ncmlkRmlsbCA9IHRyYWNlLl9ncmlkRmlsbDtcblxuICAgIHZhciBzbGVuID0gdHJhY2UuX3NsZW47XG4gICAgaWYoc2xlbikge1xuICAgICAgICB0dWJlT3B0cy5zdGFydGluZ1Bvc2l0aW9ucyA9IHppcDMoXG4gICAgICAgICAgICB0b0RhdGFDb29yZHModHJhY2UuX3N0YXJ0c1gsICd4YXhpcycpLFxuICAgICAgICAgICAgdG9EYXRhQ29vcmRzKHRyYWNlLl9zdGFydHNZLCAneWF4aXMnKSxcbiAgICAgICAgICAgIHRvRGF0YUNvb3Jkcyh0cmFjZS5fc3RhcnRzWiwgJ3pheGlzJylcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEZWZhdWx0IHN0YXJ0aW5nIHBvc2l0aW9uczpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gaWYgbGVuPjIsIGN1dCB4eiBwbGFuZSBhdCBtaW4teSxcbiAgICAgICAgLy8gdGFrZXMgYWxsIHgveS96IHB0cyBvbiB0aGF0IHBsYW5lIGV4Y2VwdCB0aG9zZSBvbiB0aGUgZWRnZXNcbiAgICAgICAgLy8gdG8gZ2VuZXJhdGUgXCJ3ZWxsLWRlZmluZWRcIiB0dWJlcyxcbiAgICAgICAgLy9cbiAgICAgICAgLy8gaWYgbGVuPTIsIHRha2UgcG9zaXRpb24gaGFsZndheSBiZXR3ZWVuIHR3byB0aGUgcHRzLFxuICAgICAgICAvL1xuICAgICAgICAvLyBpZiBsZW49MSwgdGFrZSB0aGF0IHB0XG4gICAgICAgIHZhciBzeTAgPSBtZXNoeVswXTtcbiAgICAgICAgdmFyIHN4ID0gZ2V0RGZsdFN0YXJ0aW5nUG9zaXRpb25zKG1lc2h4KTtcbiAgICAgICAgdmFyIHN6ID0gZ2V0RGZsdFN0YXJ0aW5nUG9zaXRpb25zKG1lc2h6KTtcbiAgICAgICAgdmFyIHN0YXJ0aW5nUG9zaXRpb25zID0gbmV3IEFycmF5KHN4Lmxlbmd0aCAqIHN6Lmxlbmd0aCk7XG4gICAgICAgIHZhciBtID0gMDtcblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvcih2YXIgayA9IDA7IGsgPCBzei5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIHN0YXJ0aW5nUG9zaXRpb25zW20rK10gPSBbc3hbaV0sIHN5MCwgc3pba11dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHR1YmVPcHRzLnN0YXJ0aW5nUG9zaXRpb25zID0gc3RhcnRpbmdQb3NpdGlvbnM7XG4gICAgfVxuXG4gICAgdHViZU9wdHMuY29sb3JtYXAgPSBwYXJzZUNvbG9yU2NhbGUodHJhY2UpO1xuICAgIHR1YmVPcHRzLnR1YmVTaXplID0gdHJhY2Uuc2l6ZXJlZjtcbiAgICB0dWJlT3B0cy5tYXhMZW5ndGggPSB0cmFjZS5tYXhkaXNwbGF5ZWQ7XG5cbiAgICAvLyBhZGQgc29tZSBwYWRkaW5nIGFyb3VuZCB0aGUgYm91bmRzXG4gICAgLy8gdG8gZS5nLiBhbGxvdyB0dWJlcyBzdGFydGluZyBmcm9tIGEgc2xpY2Ugb2YgdGhlIHgveS96IG1lc2hcbiAgICAvLyB0byBnbyBiZXlvbmQgYm91bmRzIGEgbGl0dGxlIGJpdCB3L28gZ2V0dGluZyBjbGlwcGVkXG4gICAgdmFyIHhibmRzID0gdG9EYXRhQ29vcmRzKHRyYWNlLl94Ym5kcywgJ3hheGlzJyk7XG4gICAgdmFyIHlibmRzID0gdG9EYXRhQ29vcmRzKHRyYWNlLl95Ym5kcywgJ3lheGlzJyk7XG4gICAgdmFyIHpibmRzID0gdG9EYXRhQ29vcmRzKHRyYWNlLl96Ym5kcywgJ3pheGlzJyk7XG4gICAgdmFyIHhwYWRzID0gZ2V0Qm91bmRQYWRzKG1lc2h4KTtcbiAgICB2YXIgeXBhZHMgPSBnZXRCb3VuZFBhZHMobWVzaHkpO1xuICAgIHZhciB6cGFkcyA9IGdldEJvdW5kUGFkcyhtZXNoeik7XG5cbiAgICB2YXIgYm91bmRzID0gW1xuICAgICAgICBbeGJuZHNbMF0gLSB4cGFkc1swXSwgeWJuZHNbMF0gLSB5cGFkc1swXSwgemJuZHNbMF0gLSB6cGFkc1swXV0sXG4gICAgICAgIFt4Ym5kc1sxXSArIHhwYWRzWzFdLCB5Ym5kc1sxXSArIHlwYWRzWzFdLCB6Ym5kc1sxXSArIHpwYWRzWzFdXVxuICAgIF07XG5cbiAgICB2YXIgbWVzaERhdGEgPSB0dWJlMm1lc2godHViZU9wdHMsIGJvdW5kcyk7XG5cbiAgICAvLyBOLkIuIGNtaW4vY21heCBjb3JyZXNwb25kIHRvIHRoZSBtaW4vbWF4IHZlY3RvciBub3JtXG4gICAgLy8gaW4gdGhlIHUvdi93IGFycmF5cywgd2hpY2ggaW4gZ2VuZXJhbCBpcyBOT1QgZXF1YWwgdG8gbWF4XG4gICAgLy8gaW50ZW5zaXR5IHRoYXQgY29sb3JzIHRoZSB0dWJlcy5cbiAgICB2YXIgY09wdHMgPSBleHRyYWN0T3B0cyh0cmFjZSk7XG4gICAgbWVzaERhdGEudmVydGV4SW50ZW5zaXR5Qm91bmRzID0gW2NPcHRzLm1pbiAvIHRyYWNlLl9ub3JtTWF4LCBjT3B0cy5tYXggLyB0cmFjZS5fbm9ybU1heF07XG5cbiAgICAvLyBwYXNzIGdsLW1lc2gzZCBsaWdodGluZyBhdHRyaWJ1dGVzXG4gICAgdmFyIGxwID0gdHJhY2UubGlnaHRwb3NpdGlvbjtcbiAgICBtZXNoRGF0YS5saWdodFBvc2l0aW9uID0gW2xwLngsIGxwLnksIGxwLnpdO1xuICAgIG1lc2hEYXRhLmFtYmllbnQgPSB0cmFjZS5saWdodGluZy5hbWJpZW50O1xuICAgIG1lc2hEYXRhLmRpZmZ1c2UgPSB0cmFjZS5saWdodGluZy5kaWZmdXNlO1xuICAgIG1lc2hEYXRhLnNwZWN1bGFyID0gdHJhY2UubGlnaHRpbmcuc3BlY3VsYXI7XG4gICAgbWVzaERhdGEucm91Z2huZXNzID0gdHJhY2UubGlnaHRpbmcucm91Z2huZXNzO1xuICAgIG1lc2hEYXRhLmZyZXNuZWwgPSB0cmFjZS5saWdodGluZy5mcmVzbmVsO1xuICAgIG1lc2hEYXRhLm9wYWNpdHkgPSB0cmFjZS5vcGFjaXR5O1xuXG4gICAgLy8gc3Rhc2ggYXV0b3JhbmdlIHBhZCB2YWx1ZVxuICAgIHRyYWNlLl9wYWQgPSBtZXNoRGF0YS50dWJlU2NhbGUgKiB0cmFjZS5zaXplcmVmICogMjtcblxuICAgIHJldHVybiBtZXNoRGF0YTtcbn1cblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICB2YXIgbWVzaERhdGEgPSBjb252ZXJ0KHRoaXMuc2NlbmUsIGRhdGEpO1xuICAgIHRoaXMubWVzaC51cGRhdGUobWVzaERhdGEpO1xufTtcblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2NlbmUuZ2xwbG90LnJlbW92ZSh0aGlzLm1lc2gpO1xuICAgIHRoaXMubWVzaC5kaXNwb3NlKCk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTdHJlYW10dWJlVHJhY2Uoc2NlbmUsIGRhdGEpIHtcbiAgICB2YXIgZ2wgPSBzY2VuZS5nbHBsb3QuZ2w7XG5cbiAgICB2YXIgbWVzaERhdGEgPSBjb252ZXJ0KHNjZW5lLCBkYXRhKTtcbiAgICB2YXIgbWVzaCA9IGNyZWF0ZVR1YmVNZXNoKGdsLCBtZXNoRGF0YSk7XG5cbiAgICB2YXIgc3RyZWFtdHViZSA9IG5ldyBTdHJlYW10dWJlKHNjZW5lLCBkYXRhLnVpZCk7XG4gICAgc3RyZWFtdHViZS5tZXNoID0gbWVzaDtcbiAgICBzdHJlYW10dWJlLmRhdGEgPSBkYXRhO1xuICAgIG1lc2guX3RyYWNlID0gc3RyZWFtdHViZTtcblxuICAgIHNjZW5lLmdscGxvdC5hZGQobWVzaCk7XG5cbiAgICByZXR1cm4gc3RyZWFtdHViZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTdHJlYW10dWJlVHJhY2U7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxudmFyIGNvbG9yc2NhbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9kZWZhdWx0cycpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIHUgPSBjb2VyY2UoJ3UnKTtcbiAgICB2YXIgdiA9IGNvZXJjZSgndicpO1xuICAgIHZhciB3ID0gY29lcmNlKCd3Jyk7XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgneCcpO1xuICAgIHZhciB5ID0gY29lcmNlKCd5Jyk7XG4gICAgdmFyIHogPSBjb2VyY2UoJ3onKTtcblxuICAgIGlmKFxuICAgICAgICAhdSB8fCAhdS5sZW5ndGggfHwgIXYgfHwgIXYubGVuZ3RoIHx8ICF3IHx8ICF3Lmxlbmd0aCB8fFxuICAgICAgICAheCB8fCAheC5sZW5ndGggfHwgIXkgfHwgIXkubGVuZ3RoIHx8ICF6IHx8ICF6Lmxlbmd0aFxuICAgICkge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3N0YXJ0cy54Jyk7XG4gICAgY29lcmNlKCdzdGFydHMueScpO1xuICAgIGNvZXJjZSgnc3RhcnRzLnonKTtcblxuICAgIGNvZXJjZSgnbWF4ZGlzcGxheWVkJyk7XG4gICAgY29lcmNlKCdzaXplcmVmJyk7XG5cbiAgICBjb2VyY2UoJ2xpZ2h0aW5nLmFtYmllbnQnKTtcbiAgICBjb2VyY2UoJ2xpZ2h0aW5nLmRpZmZ1c2UnKTtcbiAgICBjb2VyY2UoJ2xpZ2h0aW5nLnNwZWN1bGFyJyk7XG4gICAgY29lcmNlKCdsaWdodGluZy5yb3VnaG5lc3MnKTtcbiAgICBjb2VyY2UoJ2xpZ2h0aW5nLmZyZXNuZWwnKTtcbiAgICBjb2VyY2UoJ2xpZ2h0cG9zaXRpb24ueCcpO1xuICAgIGNvZXJjZSgnbGlnaHRwb3NpdGlvbi55Jyk7XG4gICAgY29lcmNlKCdsaWdodHBvc2l0aW9uLnonKTtcblxuICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICcnLCBjTGV0dGVyOiAnYyd9KTtcblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICAvLyBkaXNhYmxlIDFEIHRyYW5zZm9ybXMgKGZvciBub3cpXG4gICAgLy8geC95L3ogYW5kIHUvdi93IGhhdmUgbWF0Y2hpbmcgbGVuZ3RocyxcbiAgICAvLyBidXQgdGhleSBkb24ndCBoYXZlIHRvIG1hdGNoIHdpdGggc3RhcnRzLih4fHl8eilcbiAgICB0cmFjZU91dC5fbGVuZ3RoID0gbnVsbDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3N0cmVhbXR1YmUnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9nbDNkJyksXG4gICAgY2F0ZWdvcmllczogWydnbDNkJywgJ3Nob3dMZWdlbmQnXSxcblxuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY29sb3JiYXI6IHtcbiAgICAgICAgbWluOiAnY21pbicsXG4gICAgICAgIG1heDogJ2NtYXgnXG4gICAgfSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKS5jYWxjLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vY29udmVydCcpLFxuICAgIGV2ZW50RGF0YTogZnVuY3Rpb24ob3V0LCBwdCkge1xuICAgICAgICBvdXQudHViZXggPSBvdXQueDtcbiAgICAgICAgb3V0LnR1YmV5ID0gb3V0Lnk7XG4gICAgICAgIG91dC50dWJleiA9IG91dC56O1xuXG4gICAgICAgIG91dC50dWJldSA9IHB0LnRyYWNlQ29vcmRpbmF0ZVszXTtcbiAgICAgICAgb3V0LnR1YmV2ID0gcHQudHJhY2VDb29yZGluYXRlWzRdO1xuICAgICAgICBvdXQudHViZXcgPSBwdC50cmFjZUNvb3JkaW5hdGVbNV07XG5cbiAgICAgICAgb3V0Lm5vcm0gPSBwdC50cmFjZUNvb3JkaW5hdGVbNl07XG4gICAgICAgIG91dC5kaXZlcmdlbmNlID0gcHQudHJhY2VDb29yZGluYXRlWzddO1xuXG4gICAgICAgIC8vIERvZXMgbm90IGNvcnJlc3BvbmQgdG8gaW5wdXQgeC95L3osIHNvIGRlbGV0ZSB0aGVtXG4gICAgICAgIGRlbGV0ZSBvdXQueDtcbiAgICAgICAgZGVsZXRlIG91dC55O1xuICAgICAgICBkZWxldGUgb3V0Lno7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1VzZSBhIHN0cmVhbXR1YmUgdHJhY2UgdG8gdmlzdWFsaXplIGZsb3cgaW4gYSB2ZWN0b3IgZmllbGQuJyxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJ1NwZWNpZnkgYSB2ZWN0b3IgZmllbGQgdXNpbmcgNiAxRCBhcnJheXMgb2YgZXF1YWwgbGVuZ3RoLCcsXG4gICAgICAgICAgICAnMyBwb3NpdGlvbiBhcnJheXMgYHhgLCBgeWAgYW5kIGB6YCcsXG4gICAgICAgICAgICAnYW5kIDMgdmVjdG9yIGNvbXBvbmVudCBhcnJheXMgYHVgLCBgdmAsIGFuZCBgd2AuJyxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgJ0J5IGRlZmF1bHQsIHRoZSB0dWJlc1xcJyBzdGFydGluZyBwb3NpdGlvbnMgd2lsbCBiZSBjdXQgZnJvbSB0aGUgdmVjdG9yIGZpZWxkXFwncycsXG4gICAgICAgICAgICAneC16IHBsYW5lIGF0IGl0cyBtaW5pbXVtIHkgdmFsdWUuJyxcbiAgICAgICAgICAgICdUbyBzcGVjaWZ5IHlvdXIgb3duIHN0YXJ0aW5nIHBvc2l0aW9uLCB1c2UgYXR0cmlidXRlcyBgc3RhcnRzLnhgLCBgc3RhcnRzLnlgJyxcbiAgICAgICAgICAgICdhbmQgYHN0YXJ0cy56YC4nLFxuICAgICAgICAgICAgJ1RoZSBjb2xvciBpcyBlbmNvZGVkIGJ5IHRoZSBub3JtIG9mICh1LCB2LCB3KSwgYW5kIHRoZSBsb2NhbCByYWRpdXMnLFxuICAgICAgICAgICAgJ2J5IHRoZSBkaXZlcmdlbmNlIG9mICh1LCB2LCB3KS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=