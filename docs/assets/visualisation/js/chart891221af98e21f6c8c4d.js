(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_colormap_index_js-node_modules_plotly_js_src_lib_gl_format_color_js-node-fb3d88"],{

/***/ "./node_modules/3d-view/view.js":
/*!**************************************!*\
  !*** ./node_modules/3d-view/view.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createViewController

var createTurntable = __webpack_require__(/*! turntable-camera-controller */ "./node_modules/turntable-camera-controller/turntable.js")
var createOrbit     = __webpack_require__(/*! orbit-camera-controller */ "./node_modules/orbit-camera-controller/orbit.js")
var createMatrix    = __webpack_require__(/*! matrix-camera-controller */ "./node_modules/matrix-camera-controller/matrix.js")

function ViewController(controllers, mode) {
  this._controllerNames = Object.keys(controllers)
  this._controllerList = this._controllerNames.map(function(n) {
    return controllers[n]
  })
  this._mode   = mode
  this._active = controllers[mode]
  if(!this._active) {
    this._mode   = 'turntable'
    this._active = controllers.turntable
  }
  this.modes = this._controllerNames
  this.computedMatrix = this._active.computedMatrix
  this.computedEye    = this._active.computedEye
  this.computedUp     = this._active.computedUp
  this.computedCenter = this._active.computedCenter
  this.computedRadius = this._active.computedRadius
}

var proto = ViewController.prototype

var COMMON_METHODS = [
  ['flush', 1],
  ['idle', 1],
  ['lookAt', 4],
  ['rotate', 4],
  ['pan', 4],
  ['translate', 4],
  ['setMatrix', 2],
  ['setDistanceLimits', 2],
  ['setDistance', 2]
]

COMMON_METHODS.forEach(function(method) {
  var name = method[0]
  var argNames = []
  for(var i=0; i<method[1]; ++i) {
    argNames.push('a'+i)
  }
  var code = 'var cc=this._controllerList;for(var i=0;i<cc.length;++i){cc[i].'+method[0]+'('+argNames.join()+')}'
  proto[name] = Function.apply(null, argNames.concat(code))
})

proto.recalcMatrix = function(t) {
  this._active.recalcMatrix(t)
}

proto.getDistance = function(t) {
  return this._active.getDistance(t)
}
proto.getDistanceLimits = function(out) {
  return this._active.getDistanceLimits(out)
}

proto.lastT = function() {
  return this._active.lastT()
}

proto.setMode = function(mode) {
  if(mode === this._mode) {
    return
  }
  var idx = this._controllerNames.indexOf(mode)
  if(idx < 0) {
    return
  }
  var prev  = this._active
  var next  = this._controllerList[idx]
  var lastT = Math.max(prev.lastT(), next.lastT())

  prev.recalcMatrix(lastT)
  next.setMatrix(lastT, prev.computedMatrix)
  
  this._active = next
  this._mode   = mode

  //Update matrix properties
  this.computedMatrix = this._active.computedMatrix
  this.computedEye    = this._active.computedEye
  this.computedUp     = this._active.computedUp
  this.computedCenter = this._active.computedCenter
  this.computedRadius = this._active.computedRadius
}

proto.getMode = function() {
  return this._mode
}

function createViewController(options) {
  options = options || {}

  var eye       = options.eye    || [0,0,1]
  var center    = options.center || [0,0,0]
  var up        = options.up     || [0,1,0]
  var limits    = options.distanceLimits || [0, Infinity]
  var mode      = options.mode   || 'turntable'

  var turntable = createTurntable()
  var orbit     = createOrbit()
  var matrix    = createMatrix()

  turntable.setDistanceLimits(limits[0], limits[1])
  turntable.lookAt(0, eye, center, up)
  orbit.setDistanceLimits(limits[0], limits[1])
  orbit.lookAt(0, eye, center, up)
  matrix.setDistanceLimits(limits[0], limits[1])
  matrix.lookAt(0, eye, center, up)

  return new ViewController({
    turntable: turntable,
    orbit: orbit,
    matrix: matrix
  }, mode)
}

/***/ }),

/***/ "./node_modules/a-big-triangle/triangle.js":
/*!*************************************************!*\
  !*** ./node_modules/a-big-triangle/triangle.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var weakMap      = typeof WeakMap === 'undefined' ? __webpack_require__(/*! weak-map */ "./node_modules/weak-map/weak-map.js") : WeakMap
var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO    = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")

var TriangleCache = new weakMap()

function createABigTriangle(gl) {

  var triangleVAO = TriangleCache.get(gl)
  var handle = triangleVAO && (triangleVAO._triangleBuffer.handle || triangleVAO._triangleBuffer.buffer)
  if(!handle || !gl.isBuffer(handle)) {
    var buf = createBuffer(gl, new Float32Array([-1, -1, -1, 4, 4, -1]))
    triangleVAO = createVAO(gl, [
      { buffer: buf,
        type: gl.FLOAT,
        size: 2
      }
    ])
    triangleVAO._triangleBuffer = buf
    TriangleCache.set(gl, triangleVAO)
  }
  triangleVAO.bind()
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  triangleVAO.unbind()
}

module.exports = createABigTriangle


/***/ }),

/***/ "./node_modules/colormap/colorScale.js":
/*!*********************************************!*\
  !*** ./node_modules/colormap/colorScale.js ***!
  \*********************************************/
/***/ ((module) => {

module.exports={
	"jet":[{"index":0,"rgb":[0,0,131]},{"index":0.125,"rgb":[0,60,170]},{"index":0.375,"rgb":[5,255,255]},{"index":0.625,"rgb":[255,255,0]},{"index":0.875,"rgb":[250,0,0]},{"index":1,"rgb":[128,0,0]}],

	"hsv":[{"index":0,"rgb":[255,0,0]},{"index":0.169,"rgb":[253,255,2]},{"index":0.173,"rgb":[247,255,2]},{"index":0.337,"rgb":[0,252,4]},{"index":0.341,"rgb":[0,252,10]},{"index":0.506,"rgb":[1,249,255]},{"index":0.671,"rgb":[2,0,253]},{"index":0.675,"rgb":[8,0,253]},{"index":0.839,"rgb":[255,0,251]},{"index":0.843,"rgb":[255,0,245]},{"index":1,"rgb":[255,0,6]}],

	"hot":[{"index":0,"rgb":[0,0,0]},{"index":0.3,"rgb":[230,0,0]},{"index":0.6,"rgb":[255,210,0]},{"index":1,"rgb":[255,255,255]}],

	"cool":[{"index":0,"rgb":[0,255,255]},{"index":1,"rgb":[255,0,255]}],

	"spring":[{"index":0,"rgb":[255,0,255]},{"index":1,"rgb":[255,255,0]}],

	"summer":[{"index":0,"rgb":[0,128,102]},{"index":1,"rgb":[255,255,102]}],

	"autumn":[{"index":0,"rgb":[255,0,0]},{"index":1,"rgb":[255,255,0]}],

	"winter":[{"index":0,"rgb":[0,0,255]},{"index":1,"rgb":[0,255,128]}],

	"bone":[{"index":0,"rgb":[0,0,0]},{"index":0.376,"rgb":[84,84,116]},{"index":0.753,"rgb":[169,200,200]},{"index":1,"rgb":[255,255,255]}],

	"copper":[{"index":0,"rgb":[0,0,0]},{"index":0.804,"rgb":[255,160,102]},{"index":1,"rgb":[255,199,127]}],

	"greys":[{"index":0,"rgb":[0,0,0]},{"index":1,"rgb":[255,255,255]}],

	"yignbu":[{"index":0,"rgb":[8,29,88]},{"index":0.125,"rgb":[37,52,148]},{"index":0.25,"rgb":[34,94,168]},{"index":0.375,"rgb":[29,145,192]},{"index":0.5,"rgb":[65,182,196]},{"index":0.625,"rgb":[127,205,187]},{"index":0.75,"rgb":[199,233,180]},{"index":0.875,"rgb":[237,248,217]},{"index":1,"rgb":[255,255,217]}],

	"greens":[{"index":0,"rgb":[0,68,27]},{"index":0.125,"rgb":[0,109,44]},{"index":0.25,"rgb":[35,139,69]},{"index":0.375,"rgb":[65,171,93]},{"index":0.5,"rgb":[116,196,118]},{"index":0.625,"rgb":[161,217,155]},{"index":0.75,"rgb":[199,233,192]},{"index":0.875,"rgb":[229,245,224]},{"index":1,"rgb":[247,252,245]}],

	"yiorrd":[{"index":0,"rgb":[128,0,38]},{"index":0.125,"rgb":[189,0,38]},{"index":0.25,"rgb":[227,26,28]},{"index":0.375,"rgb":[252,78,42]},{"index":0.5,"rgb":[253,141,60]},{"index":0.625,"rgb":[254,178,76]},{"index":0.75,"rgb":[254,217,118]},{"index":0.875,"rgb":[255,237,160]},{"index":1,"rgb":[255,255,204]}],

	"bluered":[{"index":0,"rgb":[0,0,255]},{"index":1,"rgb":[255,0,0]}],

	"rdbu":[{"index":0,"rgb":[5,10,172]},{"index":0.35,"rgb":[106,137,247]},{"index":0.5,"rgb":[190,190,190]},{"index":0.6,"rgb":[220,170,132]},{"index":0.7,"rgb":[230,145,90]},{"index":1,"rgb":[178,10,28]}],

	"picnic":[{"index":0,"rgb":[0,0,255]},{"index":0.1,"rgb":[51,153,255]},{"index":0.2,"rgb":[102,204,255]},{"index":0.3,"rgb":[153,204,255]},{"index":0.4,"rgb":[204,204,255]},{"index":0.5,"rgb":[255,255,255]},{"index":0.6,"rgb":[255,204,255]},{"index":0.7,"rgb":[255,153,255]},{"index":0.8,"rgb":[255,102,204]},{"index":0.9,"rgb":[255,102,102]},{"index":1,"rgb":[255,0,0]}],

	"rainbow":[{"index":0,"rgb":[150,0,90]},{"index":0.125,"rgb":[0,0,200]},{"index":0.25,"rgb":[0,25,255]},{"index":0.375,"rgb":[0,152,255]},{"index":0.5,"rgb":[44,255,150]},{"index":0.625,"rgb":[151,255,0]},{"index":0.75,"rgb":[255,234,0]},{"index":0.875,"rgb":[255,111,0]},{"index":1,"rgb":[255,0,0]}],

	"portland":[{"index":0,"rgb":[12,51,131]},{"index":0.25,"rgb":[10,136,186]},{"index":0.5,"rgb":[242,211,56]},{"index":0.75,"rgb":[242,143,56]},{"index":1,"rgb":[217,30,30]}],

	"blackbody":[{"index":0,"rgb":[0,0,0]},{"index":0.2,"rgb":[230,0,0]},{"index":0.4,"rgb":[230,210,0]},{"index":0.7,"rgb":[255,255,255]},{"index":1,"rgb":[160,200,255]}],

	"earth":[{"index":0,"rgb":[0,0,130]},{"index":0.1,"rgb":[0,180,180]},{"index":0.2,"rgb":[40,210,40]},{"index":0.4,"rgb":[230,230,50]},{"index":0.6,"rgb":[120,70,20]},{"index":1,"rgb":[255,255,255]}],

	"electric":[{"index":0,"rgb":[0,0,0]},{"index":0.15,"rgb":[30,0,100]},{"index":0.4,"rgb":[120,0,100]},{"index":0.6,"rgb":[160,90,0]},{"index":0.8,"rgb":[230,200,0]},{"index":1,"rgb":[255,250,220]}],

	"alpha": [{"index":0, "rgb": [255,255,255,0]},{"index":1, "rgb": [255,255,255,1]}],

	"viridis": [{"index":0,"rgb":[68,1,84]},{"index":0.13,"rgb":[71,44,122]},{"index":0.25,"rgb":[59,81,139]},{"index":0.38,"rgb":[44,113,142]},{"index":0.5,"rgb":[33,144,141]},{"index":0.63,"rgb":[39,173,129]},{"index":0.75,"rgb":[92,200,99]},{"index":0.88,"rgb":[170,220,50]},{"index":1,"rgb":[253,231,37]}],

	"inferno": [{"index":0,"rgb":[0,0,4]},{"index":0.13,"rgb":[31,12,72]},{"index":0.25,"rgb":[85,15,109]},{"index":0.38,"rgb":[136,34,106]},{"index":0.5,"rgb":[186,54,85]},{"index":0.63,"rgb":[227,89,51]},{"index":0.75,"rgb":[249,140,10]},{"index":0.88,"rgb":[249,201,50]},{"index":1,"rgb":[252,255,164]}],

	"magma": [{"index":0,"rgb":[0,0,4]},{"index":0.13,"rgb":[28,16,68]},{"index":0.25,"rgb":[79,18,123]},{"index":0.38,"rgb":[129,37,129]},{"index":0.5,"rgb":[181,54,122]},{"index":0.63,"rgb":[229,80,100]},{"index":0.75,"rgb":[251,135,97]},{"index":0.88,"rgb":[254,194,135]},{"index":1,"rgb":[252,253,191]}],

	"plasma": [{"index":0,"rgb":[13,8,135]},{"index":0.13,"rgb":[75,3,161]},{"index":0.25,"rgb":[125,3,168]},{"index":0.38,"rgb":[168,34,150]},{"index":0.5,"rgb":[203,70,121]},{"index":0.63,"rgb":[229,107,93]},{"index":0.75,"rgb":[248,148,65]},{"index":0.88,"rgb":[253,195,40]},{"index":1,"rgb":[240,249,33]}],

	"warm": [{"index":0,"rgb":[125,0,179]},{"index":0.13,"rgb":[172,0,187]},{"index":0.25,"rgb":[219,0,170]},{"index":0.38,"rgb":[255,0,130]},{"index":0.5,"rgb":[255,63,74]},{"index":0.63,"rgb":[255,123,0]},{"index":0.75,"rgb":[234,176,0]},{"index":0.88,"rgb":[190,228,0]},{"index":1,"rgb":[147,255,0]}],

	"cool": [{"index":0,"rgb":[125,0,179]},{"index":0.13,"rgb":[116,0,218]},{"index":0.25,"rgb":[98,74,237]},{"index":0.38,"rgb":[68,146,231]},{"index":0.5,"rgb":[0,204,197]},{"index":0.63,"rgb":[0,247,146]},{"index":0.75,"rgb":[0,255,88]},{"index":0.88,"rgb":[40,255,8]},{"index":1,"rgb":[147,255,0]}],

	"rainbow-soft": [{"index":0,"rgb":[125,0,179]},{"index":0.1,"rgb":[199,0,180]},{"index":0.2,"rgb":[255,0,121]},{"index":0.3,"rgb":[255,108,0]},{"index":0.4,"rgb":[222,194,0]},{"index":0.5,"rgb":[150,255,0]},{"index":0.6,"rgb":[0,255,55]},{"index":0.7,"rgb":[0,246,150]},{"index":0.8,"rgb":[50,167,222]},{"index":0.9,"rgb":[103,51,235]},{"index":1,"rgb":[124,0,186]}],

	"bathymetry": [{"index":0,"rgb":[40,26,44]},{"index":0.13,"rgb":[59,49,90]},{"index":0.25,"rgb":[64,76,139]},{"index":0.38,"rgb":[63,110,151]},{"index":0.5,"rgb":[72,142,158]},{"index":0.63,"rgb":[85,174,163]},{"index":0.75,"rgb":[120,206,163]},{"index":0.88,"rgb":[187,230,172]},{"index":1,"rgb":[253,254,204]}],

	"cdom": [{"index":0,"rgb":[47,15,62]},{"index":0.13,"rgb":[87,23,86]},{"index":0.25,"rgb":[130,28,99]},{"index":0.38,"rgb":[171,41,96]},{"index":0.5,"rgb":[206,67,86]},{"index":0.63,"rgb":[230,106,84]},{"index":0.75,"rgb":[242,149,103]},{"index":0.88,"rgb":[249,193,135]},{"index":1,"rgb":[254,237,176]}],

	"chlorophyll": [{"index":0,"rgb":[18,36,20]},{"index":0.13,"rgb":[25,63,41]},{"index":0.25,"rgb":[24,91,59]},{"index":0.38,"rgb":[13,119,72]},{"index":0.5,"rgb":[18,148,80]},{"index":0.63,"rgb":[80,173,89]},{"index":0.75,"rgb":[132,196,122]},{"index":0.88,"rgb":[175,221,162]},{"index":1,"rgb":[215,249,208]}],

	"density": [{"index":0,"rgb":[54,14,36]},{"index":0.13,"rgb":[89,23,80]},{"index":0.25,"rgb":[110,45,132]},{"index":0.38,"rgb":[120,77,178]},{"index":0.5,"rgb":[120,113,213]},{"index":0.63,"rgb":[115,151,228]},{"index":0.75,"rgb":[134,185,227]},{"index":0.88,"rgb":[177,214,227]},{"index":1,"rgb":[230,241,241]}],

	"freesurface-blue": [{"index":0,"rgb":[30,4,110]},{"index":0.13,"rgb":[47,14,176]},{"index":0.25,"rgb":[41,45,236]},{"index":0.38,"rgb":[25,99,212]},{"index":0.5,"rgb":[68,131,200]},{"index":0.63,"rgb":[114,156,197]},{"index":0.75,"rgb":[157,181,203]},{"index":0.88,"rgb":[200,208,216]},{"index":1,"rgb":[241,237,236]}],

	"freesurface-red": [{"index":0,"rgb":[60,9,18]},{"index":0.13,"rgb":[100,17,27]},{"index":0.25,"rgb":[142,20,29]},{"index":0.38,"rgb":[177,43,27]},{"index":0.5,"rgb":[192,87,63]},{"index":0.63,"rgb":[205,125,105]},{"index":0.75,"rgb":[216,162,148]},{"index":0.88,"rgb":[227,199,193]},{"index":1,"rgb":[241,237,236]}],

	"oxygen": [{"index":0,"rgb":[64,5,5]},{"index":0.13,"rgb":[106,6,15]},{"index":0.25,"rgb":[144,26,7]},{"index":0.38,"rgb":[168,64,3]},{"index":0.5,"rgb":[188,100,4]},{"index":0.63,"rgb":[206,136,11]},{"index":0.75,"rgb":[220,174,25]},{"index":0.88,"rgb":[231,215,44]},{"index":1,"rgb":[248,254,105]}],

	"par": [{"index":0,"rgb":[51,20,24]},{"index":0.13,"rgb":[90,32,35]},{"index":0.25,"rgb":[129,44,34]},{"index":0.38,"rgb":[159,68,25]},{"index":0.5,"rgb":[182,99,19]},{"index":0.63,"rgb":[199,134,22]},{"index":0.75,"rgb":[212,171,35]},{"index":0.88,"rgb":[221,210,54]},{"index":1,"rgb":[225,253,75]}],

	"phase": [{"index":0,"rgb":[145,105,18]},{"index":0.13,"rgb":[184,71,38]},{"index":0.25,"rgb":[186,58,115]},{"index":0.38,"rgb":[160,71,185]},{"index":0.5,"rgb":[110,97,218]},{"index":0.63,"rgb":[50,123,164]},{"index":0.75,"rgb":[31,131,110]},{"index":0.88,"rgb":[77,129,34]},{"index":1,"rgb":[145,105,18]}],

	"salinity": [{"index":0,"rgb":[42,24,108]},{"index":0.13,"rgb":[33,50,162]},{"index":0.25,"rgb":[15,90,145]},{"index":0.38,"rgb":[40,118,137]},{"index":0.5,"rgb":[59,146,135]},{"index":0.63,"rgb":[79,175,126]},{"index":0.75,"rgb":[120,203,104]},{"index":0.88,"rgb":[193,221,100]},{"index":1,"rgb":[253,239,154]}],

	"temperature": [{"index":0,"rgb":[4,35,51]},{"index":0.13,"rgb":[23,51,122]},{"index":0.25,"rgb":[85,59,157]},{"index":0.38,"rgb":[129,79,143]},{"index":0.5,"rgb":[175,95,130]},{"index":0.63,"rgb":[222,112,101]},{"index":0.75,"rgb":[249,146,66]},{"index":0.88,"rgb":[249,196,65]},{"index":1,"rgb":[232,250,91]}],

	"turbidity": [{"index":0,"rgb":[34,31,27]},{"index":0.13,"rgb":[65,50,41]},{"index":0.25,"rgb":[98,69,52]},{"index":0.38,"rgb":[131,89,57]},{"index":0.5,"rgb":[161,112,59]},{"index":0.63,"rgb":[185,140,66]},{"index":0.75,"rgb":[202,174,88]},{"index":0.88,"rgb":[216,209,126]},{"index":1,"rgb":[233,246,171]}],

	"velocity-blue": [{"index":0,"rgb":[17,32,64]},{"index":0.13,"rgb":[35,52,116]},{"index":0.25,"rgb":[29,81,156]},{"index":0.38,"rgb":[31,113,162]},{"index":0.5,"rgb":[50,144,169]},{"index":0.63,"rgb":[87,173,176]},{"index":0.75,"rgb":[149,196,189]},{"index":0.88,"rgb":[203,221,211]},{"index":1,"rgb":[254,251,230]}],

	"velocity-green": [{"index":0,"rgb":[23,35,19]},{"index":0.13,"rgb":[24,64,38]},{"index":0.25,"rgb":[11,95,45]},{"index":0.38,"rgb":[39,123,35]},{"index":0.5,"rgb":[95,146,12]},{"index":0.63,"rgb":[152,165,18]},{"index":0.75,"rgb":[201,186,69]},{"index":0.88,"rgb":[233,216,137]},{"index":1,"rgb":[255,253,205]}],

	"cubehelix": [{"index":0,"rgb":[0,0,0]},{"index":0.07,"rgb":[22,5,59]},{"index":0.13,"rgb":[60,4,105]},{"index":0.2,"rgb":[109,1,135]},{"index":0.27,"rgb":[161,0,147]},{"index":0.33,"rgb":[210,2,142]},{"index":0.4,"rgb":[251,11,123]},{"index":0.47,"rgb":[255,29,97]},{"index":0.53,"rgb":[255,54,69]},{"index":0.6,"rgb":[255,85,46]},{"index":0.67,"rgb":[255,120,34]},{"index":0.73,"rgb":[255,157,37]},{"index":0.8,"rgb":[241,191,57]},{"index":0.87,"rgb":[224,220,93]},{"index":0.93,"rgb":[218,241,142]},{"index":1,"rgb":[227,253,198]}]
};


/***/ }),

/***/ "./node_modules/colormap/index.js":
/*!****************************************!*\
  !*** ./node_modules/colormap/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*
 * Ben Postlethwaite
 * January 2013
 * License MIT
 */


var colorScale = __webpack_require__(/*! ./colorScale */ "./node_modules/colormap/colorScale.js");
var lerp = __webpack_require__(/*! lerp */ "./node_modules/lerp/index.js")

module.exports = createColormap;

function createColormap (spec) {
    /*
     * Default Options
     */
    var indicies, fromrgba, torgba,
        nsteps, cmap, colormap, format,
        nshades, colors, alpha, i;

    if ( !spec ) spec = {};

    nshades = (spec.nshades || 72) - 1;
    format = spec.format || 'hex';

    colormap = spec.colormap;
    if (!colormap) colormap = 'jet';

    if (typeof colormap === 'string') {
        colormap = colormap.toLowerCase();

        if (!colorScale[colormap]) {
            throw Error(colormap + ' not a supported colorscale');
        }

        cmap = colorScale[colormap];

    } else if (Array.isArray(colormap)) {
        cmap = colormap.slice();

    } else {
        throw Error('unsupported colormap option', colormap);
    }

    if (cmap.length > nshades + 1) {
        throw new Error(
            colormap+' map requires nshades to be at least size '+cmap.length
        );
    }

    if (!Array.isArray(spec.alpha)) {

        if (typeof spec.alpha === 'number') {
            alpha = [spec.alpha, spec.alpha];

        } else {
            alpha = [1, 1];
        }

    } else if (spec.alpha.length !== 2) {
        alpha = [1, 1];

    } else {
        alpha = spec.alpha.slice();
    }

    // map index points from 0..1 to 0..n-1
    indicies = cmap.map(function(c) {
        return Math.round(c.index * nshades);
    });

    // Add alpha channel to the map
    alpha[0] = Math.min(Math.max(alpha[0], 0), 1);
    alpha[1] = Math.min(Math.max(alpha[1], 0), 1);

    var steps = cmap.map(function(c, i) {
        var index = cmap[i].index

        var rgba = cmap[i].rgb.slice();

        // if user supplies their own map use it
        if (rgba.length === 4 && rgba[3] >= 0 && rgba[3] <= 1) {
            return rgba
        }
        rgba[3] = alpha[0] + (alpha[1] - alpha[0])*index;

        return rgba
    })


    /*
     * map increasing linear values between indicies to
     * linear steps in colorvalues
     */
    var colors = []
    for (i = 0; i < indicies.length-1; ++i) {
        nsteps = indicies[i+1] - indicies[i];
        fromrgba = steps[i];
        torgba = steps[i+1];

        for (var j = 0; j < nsteps; j++) {
            var amt = j / nsteps
            colors.push([
                Math.round(lerp(fromrgba[0], torgba[0], amt)),
                Math.round(lerp(fromrgba[1], torgba[1], amt)),
                Math.round(lerp(fromrgba[2], torgba[2], amt)),
                lerp(fromrgba[3], torgba[3], amt)
            ])
        }
    }

    //add 1 step as last value
    colors.push(cmap[cmap.length - 1].rgb.concat(alpha[1]))

    if (format === 'hex') colors = colors.map( rgb2hex );
    else if (format === 'rgbaString') colors = colors.map( rgbaStr );
    else if (format === 'float') colors = colors.map( rgb2float );

    return colors;
};

function rgb2float (rgba) {
    return [
        rgba[0] / 255,
        rgba[1] / 255,
        rgba[2] / 255,
        rgba[3]
    ]
}

function rgb2hex (rgba) {
    var dig, hex = '#';
    for (var i = 0; i < 3; ++i) {
        dig = rgba[i];
        dig = dig.toString(16);
        hex += ('00' + dig).substr( dig.length );
    }
    return hex;
}

function rgbaStr (rgba) {
    return 'rgba(' + rgba.join(',') + ')';
}


/***/ }),

/***/ "./node_modules/cubic-hermite/hermite.js":
/*!***********************************************!*\
  !*** ./node_modules/cubic-hermite/hermite.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


function dcubicHermite(p0, v0, p1, v1, t, f) {
  var dh00 = 6*t*t-6*t,
      dh10 = 3*t*t-4*t + 1,
      dh01 = -6*t*t+6*t,
      dh11 = 3*t*t-2*t
  if(p0.length) {
    if(!f) {
      f = new Array(p0.length)
    }
    for(var i=p0.length-1; i>=0; --i) {
      f[i] = dh00*p0[i] + dh10*v0[i] + dh01*p1[i] + dh11*v1[i]
    }
    return f
  }
  return dh00*p0 + dh10*v0 + dh01*p1[i] + dh11*v1
}

function cubicHermite(p0, v0, p1, v1, t, f) {
  var ti  = (t-1), t2 = t*t, ti2 = ti*ti,
      h00 = (1+2*t)*ti2,
      h10 = t*ti2,
      h01 = t2*(3-2*t),
      h11 = t2*ti
  if(p0.length) {
    if(!f) {
      f = new Array(p0.length)
    }
    for(var i=p0.length-1; i>=0; --i) {
      f[i] = h00*p0[i] + h10*v0[i] + h01*p1[i] + h11*v1[i]
    }
    return f
  }
  return h00*p0 + h10*v0 + h01*p1 + h11*v1
}

module.exports = cubicHermite
module.exports.derivative = dcubicHermite

/***/ }),

/***/ "./node_modules/extract-frustum-planes/extract-planes.js":
/*!***************************************************************!*\
  !*** ./node_modules/extract-frustum-planes/extract-planes.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


module.exports = extractPlanes

function extractPlanes(M, zNear, zFar) {
  var z  = zNear || 0.0
  var zf = zFar || 1.0
  return [
    [ M[12] + M[0], M[13] + M[1], M[14] + M[2], M[15] + M[3] ],
    [ M[12] - M[0], M[13] - M[1], M[14] - M[2], M[15] - M[3] ],
    [ M[12] + M[4], M[13] + M[5], M[14] + M[6], M[15] + M[7] ],
    [ M[12] - M[4], M[13] - M[5], M[14] - M[6], M[15] - M[7] ],
    [ z*M[12] + M[8], z*M[13] + M[9], z*M[14] + M[10], z*M[15] + M[11] ],
    [ zf*M[12] - M[8], zf*M[13] - M[9], zf*M[14] - M[10], zf*M[15] - M[11] ]
  ]
}

/***/ }),

/***/ "./node_modules/filtered-vector/fvec.js":
/*!**********************************************!*\
  !*** ./node_modules/filtered-vector/fvec.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createFilteredVector

var cubicHermite = __webpack_require__(/*! cubic-hermite */ "./node_modules/cubic-hermite/hermite.js")
var bsearch = __webpack_require__(/*! binary-search-bounds */ "./node_modules/filtered-vector/node_modules/binary-search-bounds/search-bounds.js")

function clamp(lo, hi, x) {
  return Math.min(hi, Math.max(lo, x))
}

function FilteredVector(state0, velocity0, t0) {
  this.dimension  = state0.length
  this.bounds     = [ new Array(this.dimension), new Array(this.dimension) ]
  for(var i=0; i<this.dimension; ++i) {
    this.bounds[0][i] = -Infinity
    this.bounds[1][i] = Infinity
  }
  this._state     = state0.slice().reverse()
  this._velocity  = velocity0.slice().reverse()
  this._time      = [ t0 ]
  this._scratch   = [ state0.slice(), state0.slice(), state0.slice(), state0.slice(), state0.slice() ]
}

var proto = FilteredVector.prototype

proto.flush = function(t) {
  var idx = bsearch.gt(this._time, t) - 1
  if(idx <= 0) {
    return
  }
  this._time.splice(0, idx)
  this._state.splice(0, idx * this.dimension)
  this._velocity.splice(0, idx * this.dimension)
}

proto.curve = function(t) {
  var time      = this._time
  var n         = time.length
  var idx       = bsearch.le(time, t)
  var result    = this._scratch[0]
  var state     = this._state
  var velocity  = this._velocity
  var d         = this.dimension
  var bounds    = this.bounds
  if(idx < 0) {
    var ptr = d-1
    for(var i=0; i<d; ++i, --ptr) {
      result[i] = state[ptr]
    }
  } else if(idx >= n-1) {
    var ptr = state.length-1
    var tf = t - time[n-1]
    for(var i=0; i<d; ++i, --ptr) {
      result[i] = state[ptr] + tf * velocity[ptr]
    }
  } else {
    var ptr = d * (idx+1) - 1
    var t0  = time[idx]
    var t1  = time[idx+1]
    var dt  = (t1 - t0) || 1.0
    var x0  = this._scratch[1]
    var x1  = this._scratch[2]
    var v0  = this._scratch[3]
    var v1  = this._scratch[4]
    var steady = true
    for(var i=0; i<d; ++i, --ptr) {
      x0[i] = state[ptr]
      v0[i] = velocity[ptr] * dt
      x1[i] = state[ptr+d]
      v1[i] = velocity[ptr+d] * dt
      steady = steady && (x0[i] === x1[i] && v0[i] === v1[i] && v0[i] === 0.0)
    }
    if(steady) {
      for(var i=0; i<d; ++i) {
        result[i] = x0[i]
      }
    } else {
      cubicHermite(x0, v0, x1, v1, (t-t0)/dt, result)
    }
  }
  var lo = bounds[0]
  var hi = bounds[1]
  for(var i=0; i<d; ++i) {
    result[i] = clamp(lo[i], hi[i], result[i])
  }
  return result
}

proto.dcurve = function(t) {
  var time     = this._time
  var n        = time.length
  var idx      = bsearch.le(time, t)
  var result   = this._scratch[0]
  var state    = this._state
  var velocity = this._velocity
  var d        = this.dimension
  if(idx >= n-1) {
    var ptr = state.length-1
    var tf = t - time[n-1]
    for(var i=0; i<d; ++i, --ptr) {
      result[i] = velocity[ptr]
    }
  } else {
    var ptr = d * (idx+1) - 1
    var t0 = time[idx]
    var t1 = time[idx+1]
    var dt = (t1 - t0) || 1.0
    var x0 = this._scratch[1]
    var x1 = this._scratch[2]
    var v0 = this._scratch[3]
    var v1 = this._scratch[4]
    var steady = true
    for(var i=0; i<d; ++i, --ptr) {
      x0[i] = state[ptr]
      v0[i] = velocity[ptr] * dt
      x1[i] = state[ptr+d]
      v1[i] = velocity[ptr+d] * dt
      steady = steady && (x0[i] === x1[i] && v0[i] === v1[i] && v0[i] === 0.0)
    }
    if(steady) {
      for(var i=0; i<d; ++i) {
        result[i] = 0.0
      }
    } else {
      cubicHermite.derivative(x0, v0, x1, v1, (t-t0)/dt, result)
      for(var i=0; i<d; ++i) {
        result[i] /= dt
      }
    }
  }
  return result
}

proto.lastT = function() {
  var time = this._time
  return time[time.length-1]
}

proto.stable = function() {
  var velocity = this._velocity
  var ptr = velocity.length
  for(var i=this.dimension-1; i>=0; --i) {
    if(velocity[--ptr]) {
      return false
    }
  }
  return true
}

proto.jump = function(t) {
  var t0 = this.lastT()
  var d  = this.dimension
  if(t < t0 || arguments.length !== d+1) {
    return
  }
  var state     = this._state
  var velocity  = this._velocity
  var ptr       = state.length-this.dimension
  var bounds    = this.bounds
  var lo        = bounds[0]
  var hi        = bounds[1]
  this._time.push(t0, t)
  for(var j=0; j<2; ++j) {
    for(var i=0; i<d; ++i) {
      state.push(state[ptr++])
      velocity.push(0)
    }
  }
  this._time.push(t)
  for(var i=d; i>0; --i) {
    state.push(clamp(lo[i-1], hi[i-1], arguments[i]))
    velocity.push(0)
  }
}

proto.push = function(t) {
  var t0 = this.lastT()
  var d  = this.dimension
  if(t < t0 || arguments.length !== d+1) {
    return
  }
  var state     = this._state
  var velocity  = this._velocity
  var ptr       = state.length-this.dimension
  var dt        = t - t0
  var bounds    = this.bounds
  var lo        = bounds[0]
  var hi        = bounds[1]
  var sf        = (dt > 1e-6) ? 1/dt : 0
  this._time.push(t)
  for(var i=d; i>0; --i) {
    var xc = clamp(lo[i-1], hi[i-1], arguments[i])
    state.push(xc)
    velocity.push((xc - state[ptr++]) * sf)
  }
}

proto.set = function(t) {
  var d = this.dimension
  if(t < this.lastT() || arguments.length !== d+1) {
    return
  }
  var state     = this._state
  var velocity  = this._velocity
  var bounds    = this.bounds
  var lo        = bounds[0]
  var hi        = bounds[1]
  this._time.push(t)
  for(var i=d; i>0; --i) {
    state.push(clamp(lo[i-1], hi[i-1], arguments[i]))
    velocity.push(0)
  }
}

proto.move = function(t) {
  var t0 = this.lastT()
  var d  = this.dimension
  if(t <= t0 || arguments.length !== d+1) {
    return
  }
  var state    = this._state
  var velocity = this._velocity
  var statePtr = state.length - this.dimension
  var bounds   = this.bounds
  var lo       = bounds[0]
  var hi       = bounds[1]
  var dt       = t - t0
  var sf       = (dt > 1e-6) ? 1/dt : 0.0
  this._time.push(t)
  for(var i=d; i>0; --i) {
    var dx = arguments[i]
    state.push(clamp(lo[i-1], hi[i-1], state[statePtr++] + dx))
    velocity.push(dx * sf)
  }
}

proto.idle = function(t) {
  var t0 = this.lastT()
  if(t < t0) {
    return
  }
  var d        = this.dimension
  var state    = this._state
  var velocity = this._velocity
  var statePtr = state.length-d
  var bounds   = this.bounds
  var lo       = bounds[0]
  var hi       = bounds[1]
  var dt       = t - t0
  this._time.push(t)
  for(var i=d-1; i>=0; --i) {
    state.push(clamp(lo[i], hi[i], state[statePtr] + dt * velocity[statePtr]))
    velocity.push(0)
    statePtr += 1
  }
}

function getZero(d) {
  var result = new Array(d)
  for(var i=0; i<d; ++i) {
    result[i] = 0.0
  }
  return result
}

function createFilteredVector(initState, initVelocity, initTime) {
  switch(arguments.length) {
    case 0:
      return new FilteredVector([0], [0], 0)
    case 1:
      if(typeof initState === 'number') {
        var zero = getZero(initState)
        return new FilteredVector(zero, zero, 0)
      } else {
        return new FilteredVector(initState, getZero(initState.length), 0)
      }
    case 2:
      if(typeof initVelocity === 'number') {
        var zero = getZero(initState.length)
        return new FilteredVector(initState, zero, +initVelocity)
      } else {
        initTime = 0
      }
    case 3:
      if(initState.length !== initVelocity.length) {
        throw new Error('state and velocity lengths must match')
      }
      return new FilteredVector(initState, initVelocity, initTime)
  }
}


/***/ }),

/***/ "./node_modules/filtered-vector/node_modules/binary-search-bounds/search-bounds.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/filtered-vector/node_modules/binary-search-bounds/search-bounds.js ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";


function compileSearch(funcName, predicate, reversed, extraArgs, useNdarray, earlyOut) {
  var code = [
    "function ", funcName, "(a,l,h,", extraArgs.join(","),  "){",
earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"),
";while(l<=h){\
var m=(l+h)>>>1,x=a", useNdarray ? ".get(m)" : "[m]"]
  if(earlyOut) {
    if(predicate.indexOf("c") < 0) {
      code.push(";if(x===y){return m}else if(x<=y){")
    } else {
      code.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){")
    }
  } else {
    code.push(";if(", predicate, "){i=m;")
  }
  if(reversed) {
    code.push("l=m+1}else{h=m-1}")
  } else {
    code.push("h=m-1}else{l=m+1}")
  }
  code.push("}")
  if(earlyOut) {
    code.push("return -1};")
  } else {
    code.push("return i};")
  }
  return code.join("")
}

function compileBoundsSearch(predicate, reversed, suffix, earlyOut) {
  var result = new Function([
  compileSearch("A", "x" + predicate + "y", reversed, ["y"], false, earlyOut),
  compileSearch("B", "x" + predicate + "y", reversed, ["y"], true, earlyOut),
  compileSearch("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], false, earlyOut),
  compileSearch("Q", "c(x,y)" + predicate + "0", reversed, ["y", "c"], true, earlyOut),
"function dispatchBsearch", suffix, "(a,y,c,l,h){\
if(a.shape){\
if(typeof(c)==='function'){\
return Q(a,(l===undefined)?0:l|0,(h===undefined)?a.shape[0]-1:h|0,y,c)\
}else{\
return B(a,(c===undefined)?0:c|0,(l===undefined)?a.shape[0]-1:l|0,y)\
}}else{\
if(typeof(c)==='function'){\
return P(a,(l===undefined)?0:l|0,(h===undefined)?a.length-1:h|0,y,c)\
}else{\
return A(a,(c===undefined)?0:c|0,(l===undefined)?a.length-1:l|0,y)\
}}}\
return dispatchBsearch", suffix].join(""))
  return result()
}

module.exports = {
  ge: compileBoundsSearch(">=", false, "GE"),
  gt: compileBoundsSearch(">", false, "GT"),
  lt: compileBoundsSearch("<", true, "LT"),
  le: compileBoundsSearch("<=", true, "LE"),
  eq: compileBoundsSearch("-", true, "EQ", true)
}


/***/ }),

/***/ "./node_modules/gl-axes3d/axes.js":
/*!****************************************!*\
  !*** ./node_modules/gl-axes3d/axes.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createAxes

var createText        = __webpack_require__(/*! ./lib/text.js */ "./node_modules/gl-axes3d/lib/text.js")
var createLines       = __webpack_require__(/*! ./lib/lines.js */ "./node_modules/gl-axes3d/lib/lines.js")
var createBackground  = __webpack_require__(/*! ./lib/background.js */ "./node_modules/gl-axes3d/lib/background.js")
var getCubeProperties = __webpack_require__(/*! ./lib/cube.js */ "./node_modules/gl-axes3d/lib/cube.js")
var Ticks             = __webpack_require__(/*! ./lib/ticks.js */ "./node_modules/gl-axes3d/lib/ticks.js")

var identity = new Float32Array([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1])

function copyVec3(a, b) {
  a[0] = b[0]
  a[1] = b[1]
  a[2] = b[2]
  return a
}

function Axes(gl) {
  this.gl             = gl

  this.pixelRatio     = 1

  this.bounds         = [ [-10, -10, -10],
                          [ 10,  10,  10] ]
  this.ticks          = [ [], [], [] ]
  this.autoTicks      = true
  this.tickSpacing    = [ 1, 1, 1 ]

  this.tickEnable     = [ true, true, true ]
  this.tickFont       = [ 'sans-serif', 'sans-serif', 'sans-serif' ]
  this.tickSize       = [ 12, 12, 12 ]
  this.tickAngle      = [ 0, 0, 0 ]
  this.tickAlign      = [ 'auto', 'auto', 'auto' ]
  this.tickColor      = [ [0,0,0,1], [0,0,0,1], [0,0,0,1] ]
  this.tickPad        = [ 10, 10, 10 ]

  this.lastCubeProps  = {
    cubeEdges: [0,0,0],
    axis:      [0,0,0]
  }

  this.labels         = [ 'x', 'y', 'z' ]
  this.labelEnable    = [ true, true, true ]
  this.labelFont      = 'sans-serif'
  this.labelSize      = [ 20, 20, 20 ]
  this.labelAngle     = [ 0, 0, 0 ]
  this.labelAlign     = [ 'auto', 'auto', 'auto' ]
  this.labelColor     = [ [0,0,0,1], [0,0,0,1], [0,0,0,1] ]
  this.labelPad       = [ 10, 10, 10 ]

  this.lineEnable     = [ true, true, true ]
  this.lineMirror     = [ false, false, false ]
  this.lineWidth      = [ 1, 1, 1 ]
  this.lineColor      = [ [0,0,0,1], [0,0,0,1], [0,0,0,1] ]

  this.lineTickEnable = [ true, true, true ]
  this.lineTickMirror = [ false, false, false ]
  this.lineTickLength = [ 0, 0, 0 ]
  this.lineTickWidth  = [ 1, 1, 1 ]
  this.lineTickColor  = [ [0,0,0,1], [0,0,0,1], [0,0,0,1] ]

  this.gridEnable     = [ true, true, true ]
  this.gridWidth      = [ 1, 1, 1 ]
  this.gridColor      = [ [0,0,0,1], [0,0,0,1], [0,0,0,1] ]

  this.zeroEnable     = [ true, true, true ]
  this.zeroLineColor  = [ [0,0,0,1], [0,0,0,1], [0,0,0,1] ]
  this.zeroLineWidth  = [ 2, 2, 2 ]

  this.backgroundEnable = [ false, false, false ]
  this.backgroundColor  = [ [0.8, 0.8, 0.8, 0.5],
                            [0.8, 0.8, 0.8, 0.5],
                            [0.8, 0.8, 0.8, 0.5] ]

  this._firstInit = true
  this._text  = null
  this._lines = null
  this._background = createBackground(gl)
}

var proto = Axes.prototype

proto.update = function(options) {
  options = options || {}

  //Option parsing helper functions
  function parseOption(nest, cons, name) {
    if(name in options) {
      var opt = options[name]
      var prev = this[name]
      var next
      if(nest ? (Array.isArray(opt) && Array.isArray(opt[0])) :
                 Array.isArray(opt) ) {
        this[name] = next = [ cons(opt[0]), cons(opt[1]), cons(opt[2]) ]
      } else {
        this[name] = next = [ cons(opt), cons(opt), cons(opt) ]
      }
      for(var i=0; i<3; ++i) {
        if(next[i] !== prev[i]) {
          return true
        }
      }
    }
    return false
  }

  var NUMBER  = parseOption.bind(this, false, Number)
  var BOOLEAN = parseOption.bind(this, false, Boolean)
  var STRING  = parseOption.bind(this, false, String)
  var COLOR   = parseOption.bind(this, true, function(v) {
    if(Array.isArray(v)) {
      if(v.length === 3) {
        return [ +v[0], +v[1], +v[2], 1.0 ]
      } else if(v.length === 4) {
        return [ +v[0], +v[1], +v[2], +v[3] ]
      }
    }
    return [ 0, 0, 0, 1 ]
  })

  //Tick marks and bounds
  var nextTicks
  var ticksUpdate   = false
  var boundsChanged = false
  if('bounds' in options) {
    var bounds = options.bounds
i_loop:
    for(var i=0; i<2; ++i) {
      for(var j=0; j<3; ++j) {
        if(bounds[i][j] !== this.bounds[i][j]) {
          boundsChanged = true
        }
        this.bounds[i][j] = bounds[i][j]
      }
    }
  }
  if('ticks' in options) {
    nextTicks      = options.ticks
    ticksUpdate    = true
    this.autoTicks = false
    for(var i=0; i<3; ++i) {
      this.tickSpacing[i] = 0.0
    }
  } else if(NUMBER('tickSpacing')) {
    this.autoTicks  = true
    boundsChanged   = true
  }

  if(this._firstInit) {
    if(!('ticks' in options || 'tickSpacing' in options)) {
      this.autoTicks = true
    }

    //Force tick recomputation on first update
    boundsChanged   = true
    ticksUpdate     = true
    this._firstInit = false
  }

  if(boundsChanged && this.autoTicks) {
    nextTicks = Ticks.create(this.bounds, this.tickSpacing)
    ticksUpdate = true
  }

  //Compare next ticks to previous ticks, only update if needed
  if(ticksUpdate) {
    for(var i=0; i<3; ++i) {
      nextTicks[i].sort(function(a,b) {
        return a.x-b.x
      })
    }
    if(Ticks.equal(nextTicks, this.ticks)) {
      ticksUpdate = false
    } else {
      this.ticks = nextTicks
    }
  }

  //Parse tick properties
  BOOLEAN('tickEnable')
  if(STRING('tickFont')) {
    ticksUpdate = true  //If font changes, must rebuild vbo
  }
  NUMBER('tickSize')
  NUMBER('tickAngle')
  NUMBER('tickPad')
  COLOR('tickColor')

  //Axis labels
  var labelUpdate = STRING('labels')
  if(STRING('labelFont')) {
    labelUpdate = true
  }
  BOOLEAN('labelEnable')
  NUMBER('labelSize')
  NUMBER('labelPad')
  COLOR('labelColor')

  //Axis lines
  BOOLEAN('lineEnable')
  BOOLEAN('lineMirror')
  NUMBER('lineWidth')
  COLOR('lineColor')

  //Axis line ticks
  BOOLEAN('lineTickEnable')
  BOOLEAN('lineTickMirror')
  NUMBER('lineTickLength')
  NUMBER('lineTickWidth')
  COLOR('lineTickColor')

  //Grid lines
  BOOLEAN('gridEnable')
  NUMBER('gridWidth')
  COLOR('gridColor')

  //Zero line
  BOOLEAN('zeroEnable')
  COLOR('zeroLineColor')
  NUMBER('zeroLineWidth')

  //Background
  BOOLEAN('backgroundEnable')
  COLOR('backgroundColor')

  //Update text if necessary
  if(!this._text) {
    this._text = createText(
      this.gl,
      this.bounds,
      this.labels,
      this.labelFont,
      this.ticks,
      this.tickFont)
  } else if(this._text && (labelUpdate || ticksUpdate)) {
    this._text.update(
      this.bounds,
      this.labels,
      this.labelFont,
      this.ticks,
      this.tickFont)
  }

  //Update lines if necessary
  if(this._lines && ticksUpdate) {
    this._lines.dispose()
    this._lines = null
  }
  if(!this._lines) {
    this._lines = createLines(this.gl, this.bounds, this.ticks)
  }
}

function OffsetInfo() {
  this.primalOffset = [0,0,0]
  this.primalMinor  = [0,0,0]
  this.mirrorOffset = [0,0,0]
  this.mirrorMinor  = [0,0,0]
}

var LINE_OFFSET = [ new OffsetInfo(), new OffsetInfo(), new OffsetInfo() ]

function computeLineOffset(result, i, bounds, cubeEdges, cubeAxis) {
  var primalOffset = result.primalOffset
  var primalMinor  = result.primalMinor
  var dualOffset   = result.mirrorOffset
  var dualMinor    = result.mirrorMinor
  var e = cubeEdges[i]

  //Calculate offsets
  for(var j=0; j<3; ++j) {
    if(i === j) {
      continue
    }
    var a = primalOffset,
        b = dualOffset,
        c = primalMinor,
        d = dualMinor
    if(e & (1<<j)) {
      a = dualOffset
      b = primalOffset
      c = dualMinor
      d = primalMinor
    }
    a[j] = bounds[0][j]
    b[j] = bounds[1][j]
    if(cubeAxis[j] > 0) {
      c[j] = -1
      d[j] = 0
    } else {
      c[j] = 0
      d[j] = +1
    }
  }
}

var CUBE_ENABLE = [0,0,0]
var DEFAULT_PARAMS = {
  model:      identity,
  view:       identity,
  projection: identity,
  _ortho:      false
}

proto.isOpaque = function() {
  return true
}

proto.isTransparent = function() {
  return false
}

proto.drawTransparent = function(params) {}

var ALIGN_OPTION_AUTO = 0 // i.e. as defined in the shader the text would rotate to stay upwards range: [-90,90]

var PRIMAL_MINOR  = [0,0,0]
var MIRROR_MINOR  = [0,0,0]
var PRIMAL_OFFSET = [0,0,0]

proto.draw = function(params) {
  params = params || DEFAULT_PARAMS

  var gl = this.gl

  //Geometry for camera and axes
  var model       = params.model || identity
  var view        = params.view || identity
  var projection  = params.projection || identity
  var bounds      = this.bounds
  var isOrtho     = params._ortho || false

  //Unpack axis info
  var cubeParams  = getCubeProperties(model, view, projection, bounds, isOrtho)
  var cubeEdges   = cubeParams.cubeEdges
  var cubeAxis    = cubeParams.axis

  var cx = view[12]
  var cy = view[13]
  var cz = view[14]
  var cw = view[15]

  var orthoFix = (isOrtho) ? 2 : 1 // double up padding for orthographic ticks & labels
  var pixelScaleF = orthoFix * this.pixelRatio * (projection[3]*cx + projection[7]*cy + projection[11]*cz + projection[15]*cw) / gl.drawingBufferHeight

  for(var i=0; i<3; ++i) {
    this.lastCubeProps.cubeEdges[i] = cubeEdges[i]
    this.lastCubeProps.axis[i] = cubeAxis[i]
  }

  //Compute axis info
  var lineOffset  = LINE_OFFSET
  for(var i=0; i<3; ++i) {
    computeLineOffset(
      LINE_OFFSET[i],
      i,
      this.bounds,
      cubeEdges,
      cubeAxis)
  }

  //Set up state parameters
  var gl = this.gl

  //Draw background first
  var cubeEnable = CUBE_ENABLE
  for(var i=0; i<3; ++i) {
    if(this.backgroundEnable[i]) {
      cubeEnable[i] = cubeAxis[i]
    } else {
      cubeEnable[i] = 0
    }
  }

  this._background.draw(
    model,
    view,
    projection,
    bounds,
    cubeEnable,
    this.backgroundColor)

  //Draw lines
  this._lines.bind(
    model,
    view,
    projection,
    this)

  //First draw grid lines and zero lines
  for(var i=0; i<3; ++i) {
    var x = [0,0,0]
    if(cubeAxis[i] > 0) {
      x[i] = bounds[1][i]
    } else {
      x[i] = bounds[0][i]
    }

    //Draw grid lines
    for(var j=0; j<2; ++j) {
      var u = (i + 1 + j) % 3
      var v = (i + 1 + (j^1)) % 3
      if(this.gridEnable[u]) {
        this._lines.drawGrid(u, v, this.bounds, x, this.gridColor[u], this.gridWidth[u]*this.pixelRatio)
      }
    }

    //Draw zero lines (need to do this AFTER all grid lines are drawn)
    for(var j=0; j<2; ++j) {
      var u = (i + 1 + j) % 3
      var v = (i + 1 + (j^1)) % 3
      if(this.zeroEnable[v]) {
        //Check if zero line in bounds
        if(Math.min(bounds[0][v], bounds[1][v]) <= 0 && Math.max(bounds[0][v], bounds[1][v]) >= 0) {
          this._lines.drawZero(u, v, this.bounds, x, this.zeroLineColor[v], this.zeroLineWidth[v]*this.pixelRatio)
        }
      }
    }
  }

  //Then draw axis lines and tick marks
  for(var i=0; i<3; ++i) {

    //Draw axis lines
    if(this.lineEnable[i]) {
      this._lines.drawAxisLine(i, this.bounds, lineOffset[i].primalOffset, this.lineColor[i], this.lineWidth[i]*this.pixelRatio)
    }
    if(this.lineMirror[i]) {
      this._lines.drawAxisLine(i, this.bounds, lineOffset[i].mirrorOffset, this.lineColor[i], this.lineWidth[i]*this.pixelRatio)
    }

    //Compute minor axes
    var primalMinor = copyVec3(PRIMAL_MINOR, lineOffset[i].primalMinor)
    var mirrorMinor = copyVec3(MIRROR_MINOR, lineOffset[i].mirrorMinor)
    var tickLength  = this.lineTickLength
    for(var j=0; j<3; ++j) {
      var scaleFactor = pixelScaleF / model[5*j]
      primalMinor[j] *= tickLength[j] * scaleFactor
      mirrorMinor[j] *= tickLength[j] * scaleFactor
    }



    //Draw axis line ticks
    if(this.lineTickEnable[i]) {
      this._lines.drawAxisTicks(i, lineOffset[i].primalOffset, primalMinor, this.lineTickColor[i], this.lineTickWidth[i]*this.pixelRatio)
    }
    if(this.lineTickMirror[i]) {
      this._lines.drawAxisTicks(i, lineOffset[i].mirrorOffset, mirrorMinor, this.lineTickColor[i], this.lineTickWidth[i]*this.pixelRatio)
    }
  }
  this._lines.unbind()

  //Draw text sprites
  this._text.bind(
    model,
    view,
    projection,
    this.pixelRatio)

  var alignOpt // options in shader are from this list {-1, 0, 1, 2, 3, ..., n}
  // -1: backward compatible
  //  0: raw data
  //  1: auto align, free angles
  //  2: auto align, horizontal or vertical
  //3-n: auto align, round to n directions e.g. 12 -> round to angles with 30-degree steps

  var hv_ratio = 0.5 // can have an effect on the ratio between horizontals and verticals when using option 2

  var enableAlign
  var alignDir

  function alignTo(i) {
    alignDir = [0,0,0]
    alignDir[i] = 1
  }

  function solveTickAlignments(i, minor, major) {

    var i1 = (i + 1) % 3
    var i2 = (i + 2) % 3

    var A = minor[i1]
    var B = minor[i2]
    var C = major[i1]
    var D = major[i2]

         if ((A > 0) && (D > 0)) { alignTo(i1); return; }
    else if ((A > 0) && (D < 0)) { alignTo(i1); return; }
    else if ((A < 0) && (D > 0)) { alignTo(i1); return; }
    else if ((A < 0) && (D < 0)) { alignTo(i1); return; }
    else if ((B > 0) && (C > 0)) { alignTo(i2); return; }
    else if ((B > 0) && (C < 0)) { alignTo(i2); return; }
    else if ((B < 0) && (C > 0)) { alignTo(i2); return; }
    else if ((B < 0) && (C < 0)) { alignTo(i2); return; }
  }

  for(var i=0; i<3; ++i) {

    var minor      = lineOffset[i].primalMinor
    var major      = lineOffset[i].mirrorMinor

    var offset     = copyVec3(PRIMAL_OFFSET, lineOffset[i].primalOffset)

    for(var j=0; j<3; ++j) {
      if(this.lineTickEnable[i]) {
        offset[j] += pixelScaleF * minor[j] * Math.max(this.lineTickLength[j], 0)  / model[5*j]
      }
    }

    var axis = [0,0,0]
    axis[i] = 1

    //Draw tick text
    if(this.tickEnable[i]) {

      if(this.tickAngle[i] === -3600) {
        this.tickAngle[i] = 0
        this.tickAlign[i] = 'auto'
      } else {
        this.tickAlign[i] = -1
      }

      enableAlign = 1;

      alignOpt = [this.tickAlign[i], hv_ratio, enableAlign]
      if(alignOpt[0] === 'auto') alignOpt[0] = ALIGN_OPTION_AUTO
      else alignOpt[0] = parseInt('' + alignOpt[0])

      alignDir = [0,0,0]
      solveTickAlignments(i, minor, major)

      //Add tick padding
      for(var j=0; j<3; ++j) {
        offset[j] += pixelScaleF * minor[j] * this.tickPad[j] / model[5*j]
      }

      //Draw axis
      this._text.drawTicks(
        i,
        this.tickSize[i],
        this.tickAngle[i],
        offset,
        this.tickColor[i],
        axis,
        alignDir,
        alignOpt)
    }

    //Draw labels
    if(this.labelEnable[i]) {

      enableAlign = 0
      alignDir = [0,0,0]
      if(this.labels[i].length > 4) { // for large label axis enable alignDir to axis
        alignTo(i)
        enableAlign = 1
      }

      alignOpt = [this.labelAlign[i], hv_ratio, enableAlign]
      if(alignOpt[0] === 'auto') alignOpt[0] = ALIGN_OPTION_AUTO
      else alignOpt[0] = parseInt('' + alignOpt[0])

      //Add label padding
      for(var j=0; j<3; ++j) {
        offset[j] += pixelScaleF * minor[j] * this.labelPad[j] / model[5*j]
      }
      offset[i] += 0.5 * (bounds[0][i] + bounds[1][i])

      //Draw axis
      this._text.drawLabel(
        i,
        this.labelSize[i],
        this.labelAngle[i],
        offset,
        this.labelColor[i],
        [0,0,0],
        alignDir,
        alignOpt)
    }
  }

  this._text.unbind()
}

proto.dispose = function() {
  this._text.dispose()
  this._lines.dispose()
  this._background.dispose()
  this._lines = null
  this._text = null
  this._background = null
  this.gl = null
}

function createAxes(gl, options) {
  var axes = new Axes(gl)
  axes.update(options)
  return axes
}


/***/ }),

/***/ "./node_modules/gl-axes3d/lib/background.js":
/*!**************************************************!*\
  !*** ./node_modules/gl-axes3d/lib/background.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createBackgroundCube

var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO    = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var createShader = __webpack_require__(/*! ./shaders */ "./node_modules/gl-axes3d/lib/shaders/index.js").bg

function BackgroundCube(gl, buffer, vao, shader) {
  this.gl = gl
  this.buffer = buffer
  this.vao = vao
  this.shader = shader
}

var proto = BackgroundCube.prototype

proto.draw = function(model, view, projection, bounds, enable, colors) {
  var needsBG = false
  for(var i=0; i<3; ++i) {
    needsBG = needsBG || enable[i]
  }
  if(!needsBG) {
    return
  }

  var gl = this.gl

  gl.enable(gl.POLYGON_OFFSET_FILL)
  gl.polygonOffset(1, 2)

  this.shader.bind()
  this.shader.uniforms = {
    model: model,
    view: view,
    projection: projection,
    bounds: bounds,
    enable: enable,
    colors: colors
  }
  this.vao.bind()
  this.vao.draw(this.gl.TRIANGLES, 36)
  this.vao.unbind()

  gl.disable(gl.POLYGON_OFFSET_FILL)
}

proto.dispose = function() {
  this.vao.dispose()
  this.buffer.dispose()
  this.shader.dispose()
}

function createBackgroundCube(gl) {
  //Create cube vertices
  var vertices = []
  var indices  = []
  var ptr = 0
  for(var d=0; d<3; ++d) {
    var u = (d+1) % 3
    var v = (d+2) % 3
    var x = [0,0,0]
    var c = [0,0,0]
    for(var s=-1; s<=1; s+=2) {
      indices.push(ptr,   ptr+2, ptr+1,
                   ptr+1, ptr+2, ptr+3)
      x[d] = s
      c[d] = s
      for(var i=-1; i<=1; i+=2) {
        x[u] = i
        for(var j=-1; j<=1; j+=2) {
          x[v] = j
          vertices.push(x[0], x[1], x[2],
                        c[0], c[1], c[2])
          ptr += 1
        }
      }
      //Swap u and v
      var tt = u
      u = v
      v = tt
    }
  }

  //Allocate buffer and vertex array
  var buffer = createBuffer(gl, new Float32Array(vertices))
  var elements = createBuffer(gl, new Uint16Array(indices), gl.ELEMENT_ARRAY_BUFFER)
  var vao = createVAO(gl, [
      {
        buffer: buffer,
        type: gl.FLOAT,
        size: 3,
        offset: 0,
        stride: 24
      },
      {
        buffer: buffer,
        type: gl.FLOAT,
        size: 3,
        offset: 12,
        stride: 24
      }
    ], elements)

  //Create shader object
  var shader = createShader(gl)
  shader.attributes.position.location = 0
  shader.attributes.normal.location = 1

  return new BackgroundCube(gl, buffer, vao, shader)
}


/***/ }),

/***/ "./node_modules/gl-axes3d/lib/cube.js":
/*!********************************************!*\
  !*** ./node_modules/gl-axes3d/lib/cube.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = getCubeEdges

var bits      = __webpack_require__(/*! bit-twiddle */ "./node_modules/bit-twiddle/twiddle.js")
var multiply  = __webpack_require__(/*! gl-mat4/multiply */ "./node_modules/gl-mat4/multiply.js")
var splitPoly = __webpack_require__(/*! split-polygon */ "./node_modules/split-polygon/clip-poly.js")
var orient    = __webpack_require__(/*! robust-orientation */ "./node_modules/robust-orientation/orientation.js")

var mvp        = new Array(16)
var pCubeVerts = new Array(8)
var cubeVerts  = new Array(8)
var x          = new Array(3)
var zero3      = [0,0,0]

;(function() {
  for(var i=0; i<8; ++i) {
    pCubeVerts[i] =[1,1,1,1]
    cubeVerts[i] = [1,1,1]
  }
})()


function transformHg(result, x, mat) {
  for(var i=0; i<4; ++i) {
    result[i] = mat[12+i]
    for(var j=0; j<3; ++j) {
      result[i] += x[j]*mat[4*j+i]
    }
  }
}

var FRUSTUM_PLANES = [
  [ 0, 0, 1, 0, 0],
  [ 0, 0,-1, 1, 0],
  [ 0,-1, 0, 1, 0],
  [ 0, 1, 0, 1, 0],
  [-1, 0, 0, 1, 0],
  [ 1, 0, 0, 1, 0]
]

function polygonArea(p) {
  for(var i=0; i<FRUSTUM_PLANES.length; ++i) {
    p = splitPoly.positive(p, FRUSTUM_PLANES[i])
    if(p.length < 3) {
      return 0
    }
  }

  var base = p[0]
  var ax = base[0] / base[3]
  var ay = base[1] / base[3]
  var area = 0.0
  for(var i=1; i+1<p.length; ++i) {
    var b = p[i]
    var c = p[i+1]

    var bx = b[0]/b[3]
    var by = b[1]/b[3]
    var cx = c[0]/c[3]
    var cy = c[1]/c[3]

    var ux = bx - ax
    var uy = by - ay

    var vx = cx - ax
    var vy = cy - ay

    area += Math.abs(ux * vy - uy * vx)
  }

  return area
}

var CUBE_EDGES = [1,1,1]
var CUBE_AXIS  = [0,0,0]
var CUBE_RESULT = {
  cubeEdges: CUBE_EDGES,
  axis: CUBE_AXIS
}

function getCubeEdges(model, view, projection, bounds, ortho) {

  //Concatenate matrices
  multiply(mvp, view, model)
  multiply(mvp, projection, mvp)

  //First project cube vertices
  var ptr = 0
  for(var i=0; i<2; ++i) {
    x[2] = bounds[i][2]
    for(var j=0; j<2; ++j) {
      x[1] = bounds[j][1]
      for(var k=0; k<2; ++k) {
        x[0] = bounds[k][0]
        transformHg(pCubeVerts[ptr], x, mvp)
        ptr += 1
      }
    }
  }

  //Classify camera against cube faces
  var closest = -1

  for(var i=0; i<8; ++i) {
    var w = pCubeVerts[i][3]
    for(var l=0; l<3; ++l) {
      cubeVerts[i][l] = pCubeVerts[i][l] / w
    }

    if(ortho) cubeVerts[i][2] *= -1;

    if(w < 0) {
      if(closest < 0) {
        closest = i
      } else if(cubeVerts[i][2] < cubeVerts[closest][2]) {
        closest = i
      }
    }
  }

  if(closest < 0) {
    closest = 0
    for(var d=0; d<3; ++d) {
      var u = (d+2) % 3
      var v = (d+1) % 3
      var o0 = -1
      var o1 = -1
      for(var s=0; s<2; ++s) {
        var f0 = (s<<d)
        var f1 = f0 + (s << u) + ((1-s) << v)
        var f2 = f0 + ((1-s) << u) + (s << v)
        if(orient(cubeVerts[f0], cubeVerts[f1], cubeVerts[f2], zero3) < 0) {
          continue
        }
        if(s) {
          o0 = 1
        } else {
          o1 = 1
        }
      }
      if(o0 < 0 || o1 < 0) {
        if(o1 > o0) {
          closest |= 1<<d
        }
        continue
      }
      for(var s=0; s<2; ++s) {
        var f0 = (s<<d)
        var f1 = f0 + (s << u) + ((1-s) << v)
        var f2 = f0 + ((1-s) << u) + (s << v)
        var o = polygonArea([
            pCubeVerts[f0],
            pCubeVerts[f1],
            pCubeVerts[f2],
            pCubeVerts[f0+(1<<u)+(1<<v)]])
        if(s) {
          o0 = o
        } else {
          o1 = o
        }
      }
      if(o1 > o0) {
        closest |= 1<<d
        continue
      }
    }
  }

  var farthest = 7^closest

  //Find lowest vertex which is not closest closest
  var bottom = -1
  for(var i=0; i<8; ++i) {
    if(i === closest || i === farthest) {
      continue
    }
    if(bottom < 0) {
      bottom = i
    } else if(cubeVerts[bottom][1] > cubeVerts[i][1]) {
      bottom = i
    }
  }

  //Find left/right neighbors of bottom vertex
  var left = -1
  for(var i=0; i<3; ++i) {
    var idx = bottom ^ (1<<i)
    if(idx === closest || idx === farthest) {
      continue
    }
    if(left < 0) {
      left = idx
    }
    var v = cubeVerts[idx]
    if(v[0] < cubeVerts[left][0]) {
      left = idx
    }
  }
  var right = -1
  for(var i=0; i<3; ++i) {
    var idx = bottom ^ (1<<i)
    if(idx === closest || idx === farthest || idx === left) {
      continue
    }
    if(right < 0) {
      right = idx
    }
    var v = cubeVerts[idx]
    if(v[0] > cubeVerts[right][0]) {
      right = idx
    }
  }

  //Determine edge axis coordinates
  var cubeEdges = CUBE_EDGES
  cubeEdges[0] = cubeEdges[1] = cubeEdges[2] = 0
  cubeEdges[bits.log2(left^bottom)] = bottom&left
  cubeEdges[bits.log2(bottom^right)] = bottom&right
  var top = right ^ 7
  if(top === closest || top === farthest) {
    top = left ^ 7
    cubeEdges[bits.log2(right^top)] = top&right
  } else {
    cubeEdges[bits.log2(left^top)] = top&left
  }

  //Determine visible faces
  var axis = CUBE_AXIS
  var cutCorner = closest
  for(var d=0; d<3; ++d) {
    if(cutCorner & (1<<d)) {
      axis[d] = -1
    } else {
      axis[d] = 1
    }
  }

  //Return result
  return CUBE_RESULT
}

/***/ }),

/***/ "./node_modules/gl-axes3d/lib/lines.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-axes3d/lib/lines.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports    = createLines

var createBuffer  = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO     = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var createShader  = __webpack_require__(/*! ./shaders */ "./node_modules/gl-axes3d/lib/shaders/index.js").line

var MAJOR_AXIS = [0,0,0]
var MINOR_AXIS = [0,0,0]
var SCREEN_AXIS = [0,0,0]
var OFFSET_VEC = [0,0,0]
var SHAPE = [1,1]

function zeroVec(a) {
  a[0] = a[1] = a[2] = 0
  return a
}

function copyVec(a,b) {
  a[0] = b[0]
  a[1] = b[1]
  a[2] = b[2]
  return a
}

function Lines(gl, vertBuffer, vao, shader, tickCount, tickOffset, gridCount, gridOffset) {
  this.gl         = gl
  this.vertBuffer = vertBuffer
  this.vao        = vao
  this.shader     = shader
  this.tickCount  = tickCount
  this.tickOffset = tickOffset
  this.gridCount  = gridCount
  this.gridOffset = gridOffset
}

var proto = Lines.prototype

proto.bind = function(model, view, projection) {
  this.shader.bind()
  this.shader.uniforms.model = model
  this.shader.uniforms.view = view
  this.shader.uniforms.projection = projection

  SHAPE[0] = this.gl.drawingBufferWidth
  SHAPE[1] = this.gl.drawingBufferHeight

  this.shader.uniforms.screenShape = SHAPE
  this.vao.bind()
}

proto.unbind = function() {
  this.vao.unbind()
}

proto.drawAxisLine = function(j, bounds, offset, color, lineWidth) {
  var minorAxis = zeroVec(MINOR_AXIS)
  this.shader.uniforms.majorAxis = MINOR_AXIS

  minorAxis[j] = bounds[1][j] - bounds[0][j]
  this.shader.uniforms.minorAxis = minorAxis

  var noffset = copyVec(OFFSET_VEC, offset)
  noffset[j] += bounds[0][j]
  this.shader.uniforms.offset = noffset

  this.shader.uniforms.lineWidth = lineWidth

  this.shader.uniforms.color = color

  var screenAxis = zeroVec(SCREEN_AXIS)
  screenAxis[(j+2)%3] = 1
  this.shader.uniforms.screenAxis = screenAxis
  this.vao.draw(this.gl.TRIANGLES, 6)

  var screenAxis = zeroVec(SCREEN_AXIS)
  screenAxis[(j+1)%3] = 1
  this.shader.uniforms.screenAxis = screenAxis
  this.vao.draw(this.gl.TRIANGLES, 6)
}

proto.drawAxisTicks = function(j, offset, minorAxis, color, lineWidth) {
  if(!this.tickCount[j]) {
    return
  }

  var majorAxis = zeroVec(MAJOR_AXIS)
  majorAxis[j]  = 1
  this.shader.uniforms.majorAxis = majorAxis
  this.shader.uniforms.offset    = offset
  this.shader.uniforms.minorAxis = minorAxis
  this.shader.uniforms.color     = color
  this.shader.uniforms.lineWidth = lineWidth

  var screenAxis = zeroVec(SCREEN_AXIS)
  screenAxis[j] = 1
  this.shader.uniforms.screenAxis = screenAxis
  this.vao.draw(this.gl.TRIANGLES, this.tickCount[j], this.tickOffset[j])
}


proto.drawGrid = function(i, j, bounds, offset, color, lineWidth) {
  if(!this.gridCount[i]) {
    return
  }

  var minorAxis = zeroVec(MINOR_AXIS)
  minorAxis[j]  = bounds[1][j] - bounds[0][j]
  this.shader.uniforms.minorAxis = minorAxis

  var noffset = copyVec(OFFSET_VEC, offset)
  noffset[j] += bounds[0][j]
  this.shader.uniforms.offset = noffset

  var majorAxis = zeroVec(MAJOR_AXIS)
  majorAxis[i]  = 1
  this.shader.uniforms.majorAxis = majorAxis

  var screenAxis = zeroVec(SCREEN_AXIS)
  screenAxis[i] = 1
  this.shader.uniforms.screenAxis = screenAxis
  this.shader.uniforms.lineWidth = lineWidth

  this.shader.uniforms.color = color
  this.vao.draw(this.gl.TRIANGLES, this.gridCount[i], this.gridOffset[i])
}

proto.drawZero = function(j, i, bounds, offset, color, lineWidth) {
  var minorAxis = zeroVec(MINOR_AXIS)
  this.shader.uniforms.majorAxis = minorAxis

  minorAxis[j] = bounds[1][j] - bounds[0][j]
  this.shader.uniforms.minorAxis = minorAxis

  var noffset = copyVec(OFFSET_VEC, offset)
  noffset[j] += bounds[0][j]
  this.shader.uniforms.offset = noffset

  var screenAxis = zeroVec(SCREEN_AXIS)
  screenAxis[i] = 1
  this.shader.uniforms.screenAxis = screenAxis
  this.shader.uniforms.lineWidth = lineWidth

  this.shader.uniforms.color = color
  this.vao.draw(this.gl.TRIANGLES, 6)
}

proto.dispose = function() {
  this.vao.dispose()
  this.vertBuffer.dispose()
  this.shader.dispose()
}

function createLines(gl, bounds, ticks) {
  var vertices    = []
  var tickOffset  = [0,0,0]
  var tickCount   = [0,0,0]

  //Create grid lines for each axis/direction
  var gridOffset = [0,0,0]
  var gridCount  = [0,0,0]

  //Add zero line
  vertices.push(
    0,0,1,   0,1,1,   0,0,-1,
    0,0,-1,  0,1,1,   0,1,-1)

  for(var i=0; i<3; ++i) {
    //Axis tick marks
    var start = ((vertices.length / 3)|0)
    for(var j=0; j<ticks[i].length; ++j) {
      var x = +ticks[i][j].x
      vertices.push(
        x,0,1,   x,1,1,   x,0,-1,
        x,0,-1,  x,1,1,   x,1,-1)
    }
    var end = ((vertices.length / 3)|0)
    tickOffset[i] = start
    tickCount[i]  = end - start

    //Grid lines
    var start = ((vertices.length / 3)|0)
    for(var k=0; k<ticks[i].length; ++k) {
      var x = +ticks[i][k].x
      vertices.push(
        x,0,1,   x,1,1,   x,0,-1,
        x,0,-1,  x,1,1,   x,1,-1)
    }
    var end = ((vertices.length / 3)|0)
    gridOffset[i] = start
    gridCount[i]  = end - start
  }

  //Create cube VAO
  var vertBuf = createBuffer(gl, new Float32Array(vertices))
  var vao = createVAO(gl, [
    { "buffer": vertBuf,
      "type": gl.FLOAT,
      "size": 3,
      "stride": 0,
      "offset": 0
    }
  ])
  var shader = createShader(gl)
  shader.attributes.position.location = 0
  return new Lines(gl, vertBuf, vao, shader, tickCount, tickOffset, gridCount, gridOffset)
}


/***/ }),

/***/ "./node_modules/gl-axes3d/lib/shaders/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/gl-axes3d/lib/shaders/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")
var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")

var lineVert = glslify('./lineVert.glsl')
var lineFrag = glslify('./lineFrag.glsl')
exports.line = function(gl) {
  return createShader(gl, lineVert, lineFrag, null, [
    {name: 'position', type: 'vec3'}
  ])
}

var textVert = glslify('./textVert.glsl')
var textFrag = glslify('./textFrag.glsl')
exports.text = function(gl) {
  return createShader(gl, textVert, textFrag, null, [
    {name: 'position', type: 'vec3'}
  ])
}

var bgVert = glslify('./backgroundVert.glsl')
var bgFrag = glslify('./backgroundFrag.glsl')
exports.bg = function(gl) {
  return createShader(gl, bgVert, bgFrag, null, [
    {name: 'position', type: 'vec3'},
    {name: 'normal', type: 'vec3'}
  ])
}


/***/ }),

/***/ "./node_modules/gl-axes3d/lib/text.js":
/*!********************************************!*\
  !*** ./node_modules/gl-axes3d/lib/text.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createTextSprites

var createBuffer  = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO     = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var vectorizeText = __webpack_require__(/*! vectorize-text */ "./node_modules/vectorize-text/index.js")
var createShader  = __webpack_require__(/*! ./shaders */ "./node_modules/gl-axes3d/lib/shaders/index.js").text

var globals = window || process.global || {}
var __TEXT_CACHE  = globals.__TEXT_CACHE || {}
globals.__TEXT_CACHE = {}

//Vertex buffer format for text is:
//
/// [x,y,z] = Spatial coordinate
//

var VERTEX_SIZE = 3

function TextSprites(
  gl,
  shader,
  buffer,
  vao) {
  this.gl           = gl
  this.shader       = shader
  this.buffer       = buffer
  this.vao          = vao
  this.tickOffset   =
  this.tickCount    =
  this.labelOffset  =
  this.labelCount   = null
}

var proto = TextSprites.prototype

//Bind textures for rendering
var SHAPE = [0,0]
proto.bind = function(model, view, projection, pixelScale) {
  this.vao.bind()
  this.shader.bind()
  var uniforms = this.shader.uniforms
  uniforms.model = model
  uniforms.view = view
  uniforms.projection = projection
  uniforms.pixelScale = pixelScale
  SHAPE[0] = this.gl.drawingBufferWidth
  SHAPE[1] = this.gl.drawingBufferHeight
  this.shader.uniforms.resolution = SHAPE
}

proto.unbind = function() {
  this.vao.unbind()
}

proto.update = function(bounds, labels, labelFont, ticks, tickFont) {
  var data = []

  function addItem(t, text, font, size, lineSpacing, styletags) {
    var fontcache = __TEXT_CACHE[font]
    if(!fontcache) {
      fontcache = __TEXT_CACHE[font] = {}
    }
    var mesh = fontcache[text]
    if(!mesh) {
      mesh = fontcache[text] = tryVectorizeText(text, {
        triangles: true,
        font: font,
        textAlign: 'center',
        textBaseline: 'middle',
        lineSpacing: lineSpacing,
        styletags: styletags
      })
    }
    var scale = (size || 12) / 12
    var positions = mesh.positions
    var cells = mesh.cells
    for(var i=0, nc=cells.length; i<nc; ++i) {
      var c = cells[i]
      for(var j=2; j>=0; --j) {
        var p = positions[c[j]]
        data.push(scale*p[0], -scale*p[1], t)
      }
    }
  }

  //Generate sprites for all 3 axes, store data in texture atlases
  var tickOffset  = [0,0,0]
  var tickCount   = [0,0,0]
  var labelOffset = [0,0,0]
  var labelCount  = [0,0,0]
  var lineSpacing = 1.25
  var styletags = {
    breaklines:true,
    bolds: true,
    italics: true,
    subscripts:true,
    superscripts:true
  }
  for(var d=0; d<3; ++d) {

    //Generate label
    labelOffset[d] = (data.length/VERTEX_SIZE)|0
    addItem(
      0.5*(bounds[0][d]+bounds[1][d]),
      labels[d],
      labelFont[d],
      12, // labelFontSize
      lineSpacing,
      styletags
    )
    labelCount[d] = ((data.length/VERTEX_SIZE)|0) - labelOffset[d]

    //Generate sprites for tick marks
    tickOffset[d] = (data.length/VERTEX_SIZE)|0
    for(var i=0; i<ticks[d].length; ++i) {
      if(!ticks[d][i].text) {
        continue
      }
      addItem(
        ticks[d][i].x,
        ticks[d][i].text,
        ticks[d][i].font || tickFont,
        ticks[d][i].fontSize || 12,
        lineSpacing,
        styletags
      )
    }
    tickCount[d] = ((data.length/VERTEX_SIZE)|0) - tickOffset[d]
  }

  this.buffer.update(data)
  this.tickOffset = tickOffset
  this.tickCount = tickCount
  this.labelOffset = labelOffset
  this.labelCount = labelCount
}

//Draws the tick marks for an axis
proto.drawTicks = function(d, scale, angle, offset, color, axis, alignDir, alignOpt) {
  if(!this.tickCount[d]) {
    return
  }

  this.shader.uniforms.axis = axis
  this.shader.uniforms.color = color
  this.shader.uniforms.angle = angle
  this.shader.uniforms.scale = scale
  this.shader.uniforms.offset = offset
  this.shader.uniforms.alignDir = alignDir
  this.shader.uniforms.alignOpt = alignOpt
  this.vao.draw(this.gl.TRIANGLES, this.tickCount[d], this.tickOffset[d])
}

//Draws the text label for an axis
proto.drawLabel = function(d, scale, angle, offset, color, axis, alignDir, alignOpt) {
  if(!this.labelCount[d]) {
    return
  }

  this.shader.uniforms.axis = axis
  this.shader.uniforms.color = color
  this.shader.uniforms.angle = angle
  this.shader.uniforms.scale = scale
  this.shader.uniforms.offset = offset
  this.shader.uniforms.alignDir = alignDir
  this.shader.uniforms.alignOpt = alignOpt
  this.vao.draw(this.gl.TRIANGLES, this.labelCount[d], this.labelOffset[d])
}

//Releases all resources attached to this object
proto.dispose = function() {
  this.shader.dispose()
  this.vao.dispose()
  this.buffer.dispose()
}

function tryVectorizeText(text, options) {
  try {
    return vectorizeText(text, options)
  } catch(e) {
    console.warn('error vectorizing text:"' + text + '" error:', e)
    return {
      cells: [],
      positions: []
    }
  }
}

function createTextSprites(
    gl,
    bounds,
    labels,
    labelFont,
    ticks,
    tickFont) {

  var buffer = createBuffer(gl)
  var vao = createVAO(gl, [
    { "buffer": buffer,
      "size": 3
    }
  ])

  var shader = createShader(gl)
  shader.attributes.position.location = 0

  var result = new TextSprites(
    gl,
    shader,
    buffer,
    vao)

  result.update(bounds, labels, labelFont, ticks, tickFont)

  return result
}


/***/ }),

/***/ "./node_modules/gl-axes3d/lib/ticks.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-axes3d/lib/ticks.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.create   = defaultTicks
exports.equal    = ticksEqual

function prettyPrint(spacing, i) {
  var stepStr = spacing + ""
  var u = stepStr.indexOf(".")
  var sigFigs = 0
  if(u >= 0) {
    sigFigs = stepStr.length - u - 1
  }
  var shift = Math.pow(10, sigFigs)
  var x = Math.round(spacing * i * shift)
  var xstr = x + ""
  if(xstr.indexOf("e") >= 0) {
    return xstr
  }
  var xi = x / shift, xf = x % shift
  if(x < 0) {
    xi = -Math.ceil(xi)|0
    xf = (-xf)|0
  } else {
    xi = Math.floor(xi)|0
    xf = xf|0
  }
  var xis = "" + xi 
  if(x < 0) {
    xis = "-" + xis
  }
  if(sigFigs) {
    var xs = "" + xf
    while(xs.length < sigFigs) {
      xs = "0" + xs
    }
    return xis + "." + xs
  } else {
    return xis
  }
}

function defaultTicks(bounds, tickSpacing) {
  var array = []
  for(var d=0; d<3; ++d) {
    var ticks = []
    var m = 0.5*(bounds[0][d]+bounds[1][d])
    for(var t=0; t*tickSpacing[d]<=bounds[1][d]; ++t) {
      ticks.push({x: t*tickSpacing[d], text: prettyPrint(tickSpacing[d], t)})
    }
    for(var t=-1; t*tickSpacing[d]>=bounds[0][d]; --t) {
      ticks.push({x: t*tickSpacing[d], text: prettyPrint(tickSpacing[d], t)})
    }
    array.push(ticks)
  }
  return array
}

function ticksEqual(ticksA, ticksB) {
  for(var i=0; i<3; ++i) {
    if(ticksA[i].length !== ticksB[i].length) {
      return false
    }
    for(var j=0; j<ticksA[i].length; ++j) {
      var a = ticksA[i][j]
      var b = ticksB[i][j]
      if(
        a.x !== b.x ||
        a.text !== b.text ||
        a.font !== b.font ||
        a.fontColor !== b.fontColor ||
        a.fontSize !== b.fontSize ||
        a.dx !== b.dx ||
        a.dy !== b.dy
      ) {
        return false
      }
    }
  }
  return true
}

/***/ }),

/***/ "./node_modules/gl-axes3d/properties.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-axes3d/properties.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = axesProperties

var getPlanes   = __webpack_require__(/*! extract-frustum-planes */ "./node_modules/extract-frustum-planes/extract-planes.js")
var splitPoly   = __webpack_require__(/*! split-polygon */ "./node_modules/split-polygon/clip-poly.js")
var cubeParams  = __webpack_require__(/*! ./lib/cube.js */ "./node_modules/gl-axes3d/lib/cube.js")
var m4mul       = __webpack_require__(/*! gl-mat4/multiply */ "./node_modules/gl-mat4/multiply.js")
var m4transpose = __webpack_require__(/*! gl-mat4/transpose */ "./node_modules/gl-mat4/transpose.js")
var v4transformMat4 = __webpack_require__(/*! gl-vec4/transformMat4 */ "./node_modules/gl-vec4/transformMat4.js")

var identity    = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ])

var mvp         = new Float32Array(16)

function AxesRange3D(lo, hi, pixelsPerDataUnit) {
  this.lo = lo
  this.hi = hi
  this.pixelsPerDataUnit = pixelsPerDataUnit
}

var SCRATCH_P = [0,0,0,1]
var SCRATCH_Q = [0,0,0,1]

function gradient(result, M, v, width, height) {
  for(var i=0; i<3; ++i) {
    var p = SCRATCH_P
    var q = SCRATCH_Q
    for(var j=0; j<3; ++j) {
      q[j] = p[j] = v[j]
    }
    q[3] = p[3] = 1

    q[i] += 1
    v4transformMat4(q, q, M)
    if(q[3] < 0) {
      result[i] = Infinity
    }

    p[i] -= 1
    v4transformMat4(p, p, M)
    if(p[3] < 0) {
      result[i] = Infinity
    }

    var dx = (p[0]/p[3] - q[0]/q[3]) * width
    var dy = (p[1]/p[3] - q[1]/q[3]) * height

    result[i] = 0.25 * Math.sqrt(dx*dx + dy*dy)
  }
  return result
}

var RANGES = [
  new AxesRange3D(Infinity, -Infinity, Infinity),
  new AxesRange3D(Infinity, -Infinity, Infinity),
  new AxesRange3D(Infinity, -Infinity, Infinity)
]

var SCRATCH_X = [0,0,0]

function axesProperties(axes, camera, width, height, params) {
  var model       = camera.model || identity
  var view        = camera.view || identity
  var projection  = camera.projection || identity
  var isOrtho     = camera._ortho || false
  var bounds      = axes.bounds
  var params      = params || cubeParams(model, view, projection, bounds, isOrtho)
  var axis        = params.axis

  m4mul(mvp, view, model)
  m4mul(mvp, projection, mvp)

  //Calculate the following properties for each axis:
  //
  // * lo - start of visible range for each axis in tick coordinates
  // * hi - end of visible range for each axis in tick coordinates
  // * ticksPerPixel - pixel density of tick marks for the axis
  //
  var ranges = RANGES
  for(var i=0; i<3; ++i) {
    ranges[i].lo = Infinity
    ranges[i].hi = -Infinity
    ranges[i].pixelsPerDataUnit = Infinity
  }

  //Compute frustum planes, intersect with box
  var frustum = getPlanes(m4transpose(mvp, mvp))
  m4transpose(mvp, mvp)

  //Loop over vertices of viewable box
  for(var d=0; d<3; ++d) {
    var u = (d+1)%3
    var v = (d+2)%3
    var x = SCRATCH_X
i_loop:
    for(var i=0; i<2; ++i) {
      var poly = []

      if((axis[d] < 0) === !!i) {
        continue
      }

      x[d] = bounds[i][d]
      for(var j=0; j<2; ++j) {
        x[u] = bounds[j^i][u]
        for(var k=0; k<2; ++k) {
          x[v] = bounds[k^j^i][v]
          poly.push(x.slice())
        }
      }

      var Q = (isOrtho) ? 5 : 4
      for(var j=Q; j===Q; ++j) { // Note: using only near plane here (& for orthographic projection we use the far).
        if(poly.length === 0) {
          continue i_loop
        }
        poly = splitPoly.positive(poly, frustum[j])
      }

      //Loop over vertices of polygon to find extremal points
      for(var j=0; j<poly.length; ++j) {
        var v = poly[j]
        var grad = gradient(SCRATCH_X, mvp, v, width, height)
        for(var k=0; k<3; ++k) {
          ranges[k].lo = Math.min(ranges[k].lo, v[k])
          ranges[k].hi = Math.max(ranges[k].hi, v[k])
          if(k !== d) {
            ranges[k].pixelsPerDataUnit = Math.min(ranges[k].pixelsPerDataUnit, Math.abs(grad[k]))
          }
        }
      }
    }
  }

  return ranges
}


/***/ }),

/***/ "./node_modules/gl-mat4/clone.js":
/*!***************************************!*\
  !*** ./node_modules/gl-mat4/clone.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = clone;

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/create.js":
/*!****************************************!*\
  !*** ./node_modules/gl-mat4/create.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = create;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/determinant.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-mat4/determinant.js ***!
  \*********************************************/
/***/ ((module) => {

module.exports = determinant;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/***/ }),

/***/ "./node_modules/gl-mat4/fromRotationTranslation.js":
/*!*********************************************************!*\
  !*** ./node_modules/gl-mat4/fromRotationTranslation.js ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = fromRotationTranslation;

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/identity.js":
/*!******************************************!*\
  !*** ./node_modules/gl-mat4/identity.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/invert.js":
/*!****************************************!*\
  !*** ./node_modules/gl-mat4/invert.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = invert;

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/lookAt.js":
/*!****************************************!*\
  !*** ./node_modules/gl-mat4/lookAt.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/gl-mat4/identity.js");

module.exports = lookAt;

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < 0.000001 &&
        Math.abs(eyey - centery) < 0.000001 &&
        Math.abs(eyez - centerz) < 0.000001) {
        return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/multiply.js":
/*!******************************************!*\
  !*** ./node_modules/gl-mat4/multiply.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = multiply;

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/ortho.js":
/*!***************************************!*\
  !*** ./node_modules/gl-mat4/ortho.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = ortho;

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/perspective.js":
/*!*********************************************!*\
  !*** ./node_modules/gl-mat4/perspective.js ***!
  \*********************************************/
/***/ ((module) => {

module.exports = perspective;

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/rotate.js":
/*!****************************************!*\
  !*** ./node_modules/gl-mat4/rotate.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = rotate;

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < 0.000001) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/rotateX.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-mat4/rotateX.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = rotateX;

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/rotateY.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-mat4/rotateY.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = rotateY;

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/rotateZ.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-mat4/rotateZ.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = rotateZ;

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/scale.js":
/*!***************************************!*\
  !*** ./node_modules/gl-mat4/scale.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = scale;

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/translate.js":
/*!*******************************************!*\
  !*** ./node_modules/gl-mat4/translate.js ***!
  \*******************************************/
/***/ ((module) => {

module.exports = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/***/ }),

/***/ "./node_modules/gl-mat4/transpose.js":
/*!*******************************************!*\
  !*** ./node_modules/gl-mat4/transpose.js ***!
  \*******************************************/
/***/ ((module) => {

module.exports = transpose;

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/***/ }),

/***/ "./node_modules/gl-plot3d/camera.js":
/*!******************************************!*\
  !*** ./node_modules/gl-plot3d/camera.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createCamera

var now         = __webpack_require__(/*! right-now */ "./node_modules/right-now/browser.js")
var createView  = __webpack_require__(/*! 3d-view */ "./node_modules/3d-view/view.js")
var mouseChange = __webpack_require__(/*! mouse-change */ "./node_modules/mouse-change/mouse-listen.js")
var mouseWheel  = __webpack_require__(/*! mouse-wheel */ "./node_modules/mouse-wheel/wheel.js")
var mouseOffset = __webpack_require__(/*! mouse-event-offset */ "./node_modules/mouse-event-offset/index.js")
var hasPassive  = __webpack_require__(/*! has-passive-events */ "./node_modules/has-passive-events/index.js")

function createCamera(element, options) {
  element = element || document.body
  options = options || {}

  var limits  = [ 0.01, Infinity ]
  if('distanceLimits' in options) {
    limits[0] = options.distanceLimits[0]
    limits[1] = options.distanceLimits[1]
  }
  if('zoomMin' in options) {
    limits[0] = options.zoomMin
  }
  if('zoomMax' in options) {
    limits[1] = options.zoomMax
  }

  var view = createView({
    center: options.center || [0,0,0],
    up:     options.up     || [0,1,0],
    eye:    options.eye    || [0,0,10],
    mode:   options.mode   || 'orbit',
    distanceLimits: limits
  })

  var pmatrix = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  var distance = 0.0
  var width   = element.clientWidth
  var height  = element.clientHeight

  var camera = {
    keyBindingMode: 'rotate',
    enableWheel: true,
    view:               view,
    element:            element,
    delay:              options.delay          || 16,
    rotateSpeed:        options.rotateSpeed    || 1,
    zoomSpeed:          options.zoomSpeed      || 1,
    translateSpeed:     options.translateSpeed || 1,
    flipX:              !!options.flipX,
    flipY:              !!options.flipY,
    modes:              view.modes,
    _ortho: options._ortho || (options.projection && options.projection.type === 'orthographic') || false,
    tick: function() {
      var t = now()
      var delay = this.delay
      var ctime = t - 2 * delay
      view.idle(t-delay)
      view.recalcMatrix(ctime)
      view.flush(t-(100+delay*2))
      var allEqual = true
      var matrix = view.computedMatrix
      for(var i=0; i<16; ++i) {
        allEqual = allEqual && (pmatrix[i] === matrix[i])
        pmatrix[i] = matrix[i]
      }
      var sizeChanged =
          element.clientWidth === width &&
          element.clientHeight === height
      width  = element.clientWidth
      height = element.clientHeight
      if(allEqual) {
        return !sizeChanged
      }
      distance = Math.exp(view.computedRadius[0])
      return true
    },
    lookAt: function(eye, center, up) {
      view.lookAt(view.lastT(), eye, center, up)
    },
    rotate: function(pitch, yaw, roll) {
      view.rotate(view.lastT(), pitch, yaw, roll)
    },
    pan: function(dx, dy, dz) {
      view.pan(view.lastT(), dx, dy, dz)
    },
    translate: function(dx, dy, dz) {
      view.translate(view.lastT(), dx, dy, dz)
    }
  }

  Object.defineProperties(camera, {
    matrix: {
      get: function() {
        return view.computedMatrix
      },
      set: function(mat) {
        view.setMatrix(view.lastT(), mat)
        return view.computedMatrix
      },
      enumerable: true
    },
    mode: {
      get: function() {
        return view.getMode()
      },
      set: function(mode) {
        var curUp = view.computedUp.slice()
        var curEye = view.computedEye.slice()
        var curCenter = view.computedCenter.slice()
        view.setMode(mode)
        if(mode === 'turntable') {
          // Hacky time warping stuff to generate smooth animation
          var t0 = now()
          view._active.lookAt(t0, curEye, curCenter, curUp)
          view._active.lookAt(t0 + 500, curEye, curCenter, [0, 0, 1])
          view._active.flush(t0)
        }
        return view.getMode()
      },
      enumerable: true
    },
    center: {
      get: function() {
        return view.computedCenter
      },
      set: function(ncenter) {
        view.lookAt(view.lastT(), null, ncenter)
        return view.computedCenter
      },
      enumerable: true
    },
    eye: {
      get: function() {
        return view.computedEye
      },
      set: function(neye) {
        view.lookAt(view.lastT(), neye)
        return view.computedEye
      },
      enumerable: true
    },
    up: {
      get: function() {
        return view.computedUp
      },
      set: function(nup) {
        view.lookAt(view.lastT(), null, null, nup)
        return view.computedUp
      },
      enumerable: true
    },
    distance: {
      get: function() {
        return distance
      },
      set: function(d) {
        view.setDistance(view.lastT(), d)
        return d
      },
      enumerable: true
    },
    distanceLimits: {
      get: function() {
        return view.getDistanceLimits(limits)
      },
      set: function(v) {
        view.setDistanceLimits(v)
        return v
      },
      enumerable: true
    }
  })

  element.addEventListener('contextmenu', function(ev) {
    ev.preventDefault()
    return false
  })

  camera._lastX = -1
  camera._lastY = -1
  camera._lastMods = {shift: false, control: false, alt: false, meta: false}

  camera.enableMouseListeners = function() {

    camera.mouseListener = mouseChange(element, handleInteraction)

    //enable simple touch interactions
    element.addEventListener('touchstart', function (ev) {
      var xy = mouseOffset(ev.changedTouches[0], element)
      handleInteraction(0, xy[0], xy[1], camera._lastMods)
      handleInteraction(1, xy[0], xy[1], camera._lastMods)

      ev.preventDefault()
    }, hasPassive ? {passive: false} : false)

    element.addEventListener('touchmove', function (ev) {
      var xy = mouseOffset(ev.changedTouches[0], element)
      handleInteraction(1, xy[0], xy[1], camera._lastMods)

      ev.preventDefault()
    }, hasPassive ? {passive: false} : false)

    element.addEventListener('touchend', function (ev) {

      handleInteraction(0, camera._lastX, camera._lastY, camera._lastMods)

      ev.preventDefault()
    }, hasPassive ? {passive: false} : false)

    function handleInteraction (buttons, x, y, mods) {
      var keyBindingMode = camera.keyBindingMode

      if(keyBindingMode === false) return

      var rotate = keyBindingMode === 'rotate'
      var pan = keyBindingMode === 'pan'
      var zoom = keyBindingMode === 'zoom'

      var ctrl = !!mods.control
      var alt = !!mods.alt
      var shift = !!mods.shift
      var left = !!(buttons & 1)
      var right = !!(buttons & 2)
      var middle = !!(buttons & 4)

      var scale = 1.0 / element.clientHeight
      var dx    = scale * (x - camera._lastX)
      var dy    = scale * (y - camera._lastY)

      var flipX = camera.flipX ? 1 : -1
      var flipY = camera.flipY ? 1 : -1

      var drot  = Math.PI * camera.rotateSpeed

      var t = now()

      if(camera._lastX !== -1 && camera._lastY !== -1) {
        if((rotate && left && !ctrl && !alt && !shift) || (left && !ctrl && !alt && shift)) {
          // Rotate
          view.rotate(t, flipX * drot * dx, -flipY * drot * dy, 0)
        }

        if((pan && left && !ctrl && !alt && !shift) || right || (left && ctrl && !alt && !shift)) {
          // Pan
          view.pan(t, -camera.translateSpeed * dx * distance, camera.translateSpeed * dy * distance, 0)
        }

        if((zoom && left && !ctrl && !alt && !shift) || middle || (left && !ctrl && alt && !shift)) {
          // Zoom
          var kzoom = -camera.zoomSpeed * dy / window.innerHeight * (t - view.lastT()) * 100
          view.pan(t, 0, 0, distance * (Math.exp(kzoom) - 1))
        }
      }

      camera._lastX = x
      camera._lastY = y
      camera._lastMods = mods

      return true
    }

    camera.wheelListener = mouseWheel(element, function(dx, dy) {
      // TODO remove now that we can disable scroll via scrollZoom?
      if(camera.keyBindingMode === false) return
      if(!camera.enableWheel) return

      var flipX = camera.flipX ? 1 : -1
      var flipY = camera.flipY ? 1 : -1
      var t = now()
      if(Math.abs(dx) > Math.abs(dy)) {
        view.rotate(t, 0, 0, -dx * flipX * Math.PI * camera.rotateSpeed / window.innerWidth)
      } else {
        if(!camera._ortho) {
          var kzoom = -camera.zoomSpeed * flipY * dy / window.innerHeight * (t - view.lastT()) / 20.0
          view.pan(t, 0, 0, distance * (Math.exp(kzoom) - 1))
        }
      }
    }, true)
  }

  camera.enableMouseListeners()

  return camera
}


/***/ }),

/***/ "./node_modules/gl-plot3d/lib/shader.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-plot3d/lib/shader.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var glslify      = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")
var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")

var vertSrc = glslify('./vertex.glsl')
var fragSrc = glslify('./composite.glsl')

module.exports = function(gl) {
  return createShader(gl, vertSrc, fragSrc, null, [ { name: 'position', type: 'vec2'}])
}


/***/ }),

/***/ "./node_modules/gl-plot3d/scene.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-plot3d/scene.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createCamera = __webpack_require__(/*! ./camera.js */ "./node_modules/gl-plot3d/camera.js")
var createAxes   = __webpack_require__(/*! gl-axes3d */ "./node_modules/gl-axes3d/axes.js")
var axesRanges   = __webpack_require__(/*! gl-axes3d/properties */ "./node_modules/gl-axes3d/properties.js")
var createSpikes = __webpack_require__(/*! gl-spikes3d */ "./node_modules/gl-spikes3d/spikes.js")
var createSelect = __webpack_require__(/*! gl-select-static */ "./node_modules/gl-select-static/select.js")
var createFBO    = __webpack_require__(/*! gl-fbo */ "./node_modules/gl-fbo/fbo.js")
var drawTriangle = __webpack_require__(/*! a-big-triangle */ "./node_modules/a-big-triangle/triangle.js")
var mouseChange  = __webpack_require__(/*! mouse-change */ "./node_modules/mouse-change/mouse-listen.js")
var perspective  = __webpack_require__(/*! gl-mat4/perspective */ "./node_modules/gl-mat4/perspective.js")
var ortho        = __webpack_require__(/*! gl-mat4/ortho */ "./node_modules/gl-mat4/ortho.js")
var createShader = __webpack_require__(/*! ./lib/shader */ "./node_modules/gl-plot3d/lib/shader.js")
var isMobile = __webpack_require__(/*! is-mobile */ "./node_modules/is-mobile/index.js")({ tablet: true, featureDetect: true })

module.exports = {
  createScene: createScene,
  createCamera: createCamera
}

function MouseSelect() {
  this.mouse          = [-1,-1]
  this.screen         = null
  this.distance       = Infinity
  this.index          = null
  this.dataCoordinate = null
  this.dataPosition   = null
  this.object         = null
  this.data           = null
}

function getContext(canvas, options) {
  var gl = null
  try {
    gl = canvas.getContext('webgl', options)
    if(!gl) {
      gl = canvas.getContext('experimental-webgl', options)
    }
  } catch(e) {
    return null
  }
  return gl
}

function roundUpPow10(x) {
  var y = Math.round(Math.log(Math.abs(x)) / Math.log(10))
  if(y < 0) {
    var base = Math.round(Math.pow(10, -y))
    return Math.ceil(x*base) / base
  } else if(y > 0) {
    var base = Math.round(Math.pow(10, y))
    return Math.ceil(x/base) * base
  }
  return Math.ceil(x)
}

function defaultBool(x) {
  if(typeof x === 'boolean') {
    return x
  }
  return true
}

function createScene(options) {
  options = options || {}
  options.camera = options.camera || {}

  var canvas = options.canvas
  if(!canvas) {
    canvas = document.createElement('canvas')
    if(options.container) {
      var container = options.container
      container.appendChild(canvas)
    } else {
      document.body.appendChild(canvas)
    }
  }

  var gl = options.gl
  if(!gl) {
    if(options.glOptions) {
      isMobile = !!options.glOptions.preserveDrawingBuffer
    }

    gl = getContext(canvas,
      options.glOptions || {
        premultipliedAlpha: true,
        antialias: true,
        preserveDrawingBuffer: isMobile
      })
  }
  if(!gl) {
    throw new Error('webgl not supported')
  }

  //Initial bounds
  var bounds = options.bounds || [[-10,-10,-10], [10,10,10]]

  //Create selection
  var selection = new MouseSelect()

  //Accumulation buffer
  var accumBuffer = createFBO(gl,
    gl.drawingBufferWidth, gl.drawingBufferHeight, {
      preferFloat: !isMobile
    })

  var accumShader = createShader(gl)

  var isOrtho =
    (options.cameraObject && options.cameraObject._ortho === true) ||
    (options.camera.projection && options.camera.projection.type === 'orthographic') ||
    false

  //Create a camera
  var cameraOptions = {
    eye:     options.camera.eye     || [2,0,0],
    center:  options.camera.center  || [0,0,0],
    up:      options.camera.up      || [0,1,0],
    zoomMin: options.camera.zoomMax || 0.1,
    zoomMax: options.camera.zoomMin || 100,
    mode:    options.camera.mode    || 'turntable',
    _ortho:  isOrtho
  }

  //Create axes
  var axesOptions = options.axes || {}
  var axes = createAxes(gl, axesOptions)
  axes.enable = !axesOptions.disable

  //Create spikes
  var spikeOptions = options.spikes || {}
  var spikes = createSpikes(gl, spikeOptions)

  //Object list is empty initially
  var objects         = []
  var pickBufferIds   = []
  var pickBufferCount = []
  var pickBuffers     = []

  //Dirty flag, skip redraw if scene static
  var dirty       = true
  var pickDirty   = true

  var projection     = new Array(16)
  var model          = new Array(16)

  var cameraParams = {
    view:         null,
    projection:   projection,
    model:        model,
    _ortho:       false
  }

  var pickDirty = true

  var viewShape = [ gl.drawingBufferWidth, gl.drawingBufferHeight ]

  var camera = options.cameraObject || createCamera(canvas, cameraOptions)

  //Create scene object
  var scene = {
    gl:           gl,
    contextLost:  false,
    pixelRatio:   options.pixelRatio || 1,
    canvas:       canvas,
    selection:    selection,
    camera:       camera,
    axes:         axes,
    axesPixels:   null,
    spikes:       spikes,
    bounds:       bounds,
    objects:      objects,
    shape:        viewShape,
    aspect:       options.aspectRatio || [1,1,1],
    pickRadius:   options.pickRadius || 10,
    zNear:        options.zNear || 0.01,
    zFar:         options.zFar  || 1000,
    fovy:         options.fovy  || Math.PI/4,
    clearColor:   options.clearColor || [0,0,0,0],
    autoResize:   defaultBool(options.autoResize),
    autoBounds:   defaultBool(options.autoBounds),
    autoScale:    !!options.autoScale,
    autoCenter:   defaultBool(options.autoCenter),
    clipToBounds: defaultBool(options.clipToBounds),
    snapToData:   !!options.snapToData,
    onselect:     options.onselect || null,
    onrender:     options.onrender || null,
    onclick:      options.onclick  || null,
    cameraParams: cameraParams,
    oncontextloss: null,
    mouseListener: null,
    _stopped: false,

    getAspectratio: function() {
      return {
        x: this.aspect[0],
        y: this.aspect[1],
        z: this.aspect[2]
      }
    },

    setAspectratio: function(aspectratio) {
      this.aspect[0] = aspectratio.x
      this.aspect[1] = aspectratio.y
      this.aspect[2] = aspectratio.z
      pickDirty = true
    },

    setBounds: function(axisIndex, range) {
      this.bounds[0][axisIndex] = range.min
      this.bounds[1][axisIndex] = range.max
    },

    setClearColor: function(clearColor) {
      this.clearColor = clearColor
    },

    clearRGBA: function() {
      this.gl.clearColor(
        this.clearColor[0],
        this.clearColor[1],
        this.clearColor[2],
        this.clearColor[3]
      )

      this.gl.clear(
        this.gl.COLOR_BUFFER_BIT |
        this.gl.DEPTH_BUFFER_BIT
      )
    }
  }

  var pickShape = [ (gl.drawingBufferWidth/scene.pixelRatio)|0, (gl.drawingBufferHeight/scene.pixelRatio)|0 ]

  function resizeListener() {
    if(scene._stopped) {
      return
    }
    if(!scene.autoResize) {
      return
    }
    var parent = canvas.parentNode
    var width  = 1
    var height = 1
    if(parent && parent !== document.body) {
      width  = parent.clientWidth
      height = parent.clientHeight
    } else {
      width  = window.innerWidth
      height = window.innerHeight
    }
    var nextWidth  = Math.ceil(width  * scene.pixelRatio)|0
    var nextHeight = Math.ceil(height * scene.pixelRatio)|0
    if(nextWidth !== canvas.width || nextHeight !== canvas.height) {
      canvas.width   = nextWidth
      canvas.height  = nextHeight
      var style = canvas.style
      style.position = style.position || 'absolute'
      style.left     = '0px'
      style.top      = '0px'
      style.width    = width  + 'px'
      style.height   = height + 'px'
      dirty = true
    }
  }
  if(scene.autoResize) {
    resizeListener()
  }
  window.addEventListener('resize', resizeListener)

  function reallocPickIds() {
    var numObjs = objects.length
    var numPick = pickBuffers.length
    for(var i=0; i<numPick; ++i) {
      pickBufferCount[i] = 0
    }
    obj_loop:
    for(var i=0; i<numObjs; ++i) {
      var obj = objects[i]
      var pickCount = obj.pickSlots
      if(!pickCount) {
        pickBufferIds[i] = -1
        continue
      }
      for(var j=0; j<numPick; ++j) {
        if(pickBufferCount[j] + pickCount < 255) {
          pickBufferIds[i] = j
          obj.setPickBase(pickBufferCount[j]+1)
          pickBufferCount[j] += pickCount
          continue obj_loop
        }
      }
      //Create new pick buffer
      var nbuffer = createSelect(gl, viewShape)
      pickBufferIds[i] = numPick
      pickBuffers.push(nbuffer)
      pickBufferCount.push(pickCount)
      obj.setPickBase(1)
      numPick += 1
    }
    while(numPick > 0 && pickBufferCount[numPick-1] === 0) {
      pickBufferCount.pop()
      pickBuffers.pop().dispose()
    }
  }

  scene.update = function(options) {

    if(scene._stopped) {
      return
    }
    options = options || {}
    dirty = true
    pickDirty = true
  }

  scene.add = function(obj) {
    if(scene._stopped) {
      return
    }
    obj.axes = axes
    objects.push(obj)
    pickBufferIds.push(-1)
    dirty = true
    pickDirty = true
    reallocPickIds()
  }

  scene.remove = function(obj) {
    if(scene._stopped) {
      return
    }
    var idx = objects.indexOf(obj)
    if(idx < 0) {
      return
    }
    objects.splice(idx, 1)
    pickBufferIds.pop()
    dirty = true
    pickDirty = true
    reallocPickIds()
  }

  scene.dispose = function() {
    if(scene._stopped) {
      return
    }

    scene._stopped = true

    window.removeEventListener('resize', resizeListener)
    canvas.removeEventListener('webglcontextlost', checkContextLoss)
    scene.mouseListener.enabled = false

    if(scene.contextLost) {
      return
    }

    //Destroy objects
    axes.dispose()
    spikes.dispose()
    for(var i=0; i<objects.length; ++i) {
      objects[i].dispose()
    }

    //Clean up buffers
    accumBuffer.dispose()
    for(var i=0; i<pickBuffers.length; ++i) {
      pickBuffers[i].dispose()
    }

    //Clean up shaders
    accumShader.dispose()

    //Release all references
    gl = null
    axes = null
    spikes = null
    objects = []
  }

  //Update mouse position
  scene._mouseRotating = false
  scene._prevButtons = 0

  scene.enableMouseListeners = function() {

    scene.mouseListener = mouseChange(canvas, function(buttons, x, y) {
      if(scene._stopped) {
        return
      }

      var numPick = pickBuffers.length
      var numObjs = objects.length
      var prevObj = selection.object

      selection.distance = Infinity
      selection.mouse[0] = x
      selection.mouse[1] = y
      selection.object = null
      selection.screen = null
      selection.dataCoordinate = selection.dataPosition = null

      var change = false

      if(buttons && scene._prevButtons) {
        scene._mouseRotating = true
      } else {
        if(scene._mouseRotating) {
          pickDirty = true
        }
        scene._mouseRotating = false

        for(var i=0; i<numPick; ++i) {
          var result = pickBuffers[i].query(x, pickShape[1] - y - 1, scene.pickRadius)
          if(result) {
            if(result.distance > selection.distance) {
              continue
            }
            for(var j=0; j<numObjs; ++j) {
              var obj = objects[j]
              if(pickBufferIds[j] !== i) {
                continue
              }
              var objPick = obj.pick(result)
              if(objPick) {
                selection.buttons        = buttons
                selection.screen         = result.coord
                selection.distance       = result.distance
                selection.object         = obj
                selection.index          = objPick.distance
                selection.dataPosition   = objPick.position
                selection.dataCoordinate = objPick.dataCoordinate
                selection.data           = objPick
                change = true
              }
            }
          }
        }
      }

      if(prevObj && prevObj !== selection.object) {
        if(prevObj.highlight) {
          prevObj.highlight(null)
        }
        dirty = true
      }
      if(selection.object) {
        if(selection.object.highlight) {
          selection.object.highlight(selection.data)
        }
        dirty = true
      }

      change = change || (selection.object !== prevObj)
      if(change && scene.onselect) {
        scene.onselect(selection)
      }

      if((buttons & 1) && !(scene._prevButtons & 1) && scene.onclick) {
        scene.onclick(selection)
      }
      scene._prevButtons = buttons
    })
  }

  function checkContextLoss() {
    if(scene.contextLost) {
      return true
    }
    if(gl.isContextLost()) {
      scene.contextLost = true
      scene.mouseListener.enabled = false
      scene.selection.object = null
      if(scene.oncontextloss) {
        scene.oncontextloss()
      }
    }
  }

  canvas.addEventListener('webglcontextlost', checkContextLoss)

  //Render the scene for mouse picking
  function renderPick() {
    if(checkContextLoss()) {
      return
    }

    gl.colorMask(true, true, true, true)
    gl.depthMask(true)
    gl.disable(gl.BLEND)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)

    var numObjs = objects.length
    var numPick = pickBuffers.length
    for(var j=0; j<numPick; ++j) {
      var buf = pickBuffers[j]
      buf.shape = pickShape
      buf.begin()
      for(var i=0; i<numObjs; ++i) {
        if(pickBufferIds[i] !== j) {
          continue
        }
        var obj = objects[i]
        if(obj.drawPick) {
          obj.pixelRatio = 1
          obj.drawPick(cameraParams)
        }
      }
      buf.end()
    }
  }

  var nBounds = [
    [ Infinity, Infinity, Infinity],
    [-Infinity,-Infinity,-Infinity]]

  var prevBounds = [nBounds[0].slice(), nBounds[1].slice()]

  function redraw() {
    if(checkContextLoss()) {
      return
    }

    resizeListener()

    //Tick camera
    var cameraMoved = scene.camera.tick()
    cameraParams.view = scene.camera.matrix
    dirty     = dirty || cameraMoved
    pickDirty = pickDirty || cameraMoved

      //Set pixel ratio
    axes.pixelRatio   = scene.pixelRatio
    spikes.pixelRatio = scene.pixelRatio

    //Check if any objects changed, recalculate bounds
    var numObjs = objects.length
    var lo = nBounds[0]
    var hi = nBounds[1]
    lo[0] = lo[1] = lo[2] =  Infinity
    hi[0] = hi[1] = hi[2] = -Infinity
    for(var i=0; i<numObjs; ++i) {
      var obj = objects[i]

      //Set the axes properties for each object
      obj.pixelRatio = scene.pixelRatio
      obj.axes = scene.axes

      dirty = dirty || !!obj.dirty
      pickDirty = pickDirty || !!obj.dirty
      var obb = obj.bounds
      if(obb) {
        var olo = obb[0]
        var ohi = obb[1]
        for(var j=0; j<3; ++j) {
          lo[j] = Math.min(lo[j], olo[j])
          hi[j] = Math.max(hi[j], ohi[j])
        }
      }
    }

    //Recalculate bounds
    var bounds = scene.bounds
    if(scene.autoBounds) {
      for(var j=0; j<3; ++j) {
        if(hi[j] < lo[j]) {
          lo[j] = -1
          hi[j] = 1
        } else {
          if(lo[j] === hi[j]) {
            lo[j] -= 1
            hi[j] += 1
          }
          var padding = 0.05 * (hi[j] - lo[j])
          lo[j] = lo[j] - padding
          hi[j] = hi[j] + padding
        }
        bounds[0][j] = lo[j]
        bounds[1][j] = hi[j]
      }
    }

    var boundsChanged = false
    for(var j=0; j<3; ++j) {
        boundsChanged = boundsChanged ||
            (prevBounds[0][j] !== bounds[0][j])  ||
            (prevBounds[1][j] !== bounds[1][j])
        prevBounds[0][j] = bounds[0][j]
        prevBounds[1][j] = bounds[1][j]
    }

    //Recalculate bounds
    pickDirty = pickDirty || boundsChanged
    dirty = dirty || boundsChanged

    if(!dirty) {
      return
    }

    if(boundsChanged) {
      var tickSpacing = [0,0,0]
      for(var i=0; i<3; ++i) {
        tickSpacing[i] = roundUpPow10((bounds[1][i]-bounds[0][i]) / 10.0)
      }
      if(axes.autoTicks) {
        axes.update({
          bounds: bounds,
          tickSpacing: tickSpacing
        })
      } else {
        axes.update({
          bounds: bounds
        })
      }
    }

    //Get scene
    var width  = gl.drawingBufferWidth
    var height = gl.drawingBufferHeight
    viewShape[0] = width
    viewShape[1] = height
    pickShape[0] = Math.max(width/scene.pixelRatio, 1)|0
    pickShape[1] = Math.max(height/scene.pixelRatio, 1)|0

    //Compute camera parameters
    calcCameraParams(scene, isOrtho)

    //Apply axes/clip bounds
    for(var i=0; i<numObjs; ++i) {
      var obj = objects[i]

      //Set axes bounds
      obj.axesBounds = bounds

      //Set clip bounds
      if(scene.clipToBounds) {
        obj.clipBounds = bounds
      }
    }
    //Set spike parameters
    if(selection.object) {
      if(scene.snapToData) {
        spikes.position = selection.dataCoordinate
      } else {
        spikes.position = selection.dataPosition
      }
      spikes.bounds = bounds
    }

    //If state changed, then redraw pick buffers
    if(pickDirty) {
      pickDirty = false
      renderPick()
    }

    //Recalculate pixel data
    scene.axesPixels = axesRanges(scene.axes, cameraParams, width, height)

    //Call render callback
    if(scene.onrender) {
      scene.onrender()
    }

    //Read value
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, width, height)

    //General strategy: 3 steps
    //  1. render non-transparent objects
    //  2. accumulate transparent objects into separate fbo
    //  3. composite final scene

    //Clear FBO
    scene.clearRGBA()

    gl.depthMask(true)
    gl.colorMask(true, true, true, true)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.disable(gl.BLEND)
    gl.disable(gl.CULL_FACE)  //most visualization surfaces are 2 sided

    //Render opaque pass
    var hasTransparent = false
    if(axes.enable) {
      hasTransparent = hasTransparent || axes.isTransparent()
      axes.draw(cameraParams)
    }
    spikes.axes = axes
    if(selection.object) {
      spikes.draw(cameraParams)
    }

    gl.disable(gl.CULL_FACE)  //most visualization surfaces are 2 sided

    for(var i=0; i<numObjs; ++i) {
      var obj = objects[i]
      obj.axes = axes
      obj.pixelRatio = scene.pixelRatio
      if(obj.isOpaque && obj.isOpaque()) {
        obj.draw(cameraParams)
      }
      if(obj.isTransparent && obj.isTransparent()) {
        hasTransparent = true
      }
    }

    if(hasTransparent) {
      //Render transparent pass
      accumBuffer.shape = viewShape
      accumBuffer.bind()
      gl.clear(gl.DEPTH_BUFFER_BIT)
      gl.colorMask(false, false, false, false)
      gl.depthMask(true)
      gl.depthFunc(gl.LESS)

      //Render forward facing objects
      if(axes.enable && axes.isTransparent()) {
        axes.drawTransparent(cameraParams)
      }
      for(var i=0; i<numObjs; ++i) {
        var obj = objects[i]
        if(obj.isOpaque && obj.isOpaque()) {
          obj.draw(cameraParams)
        }
      }

      //Render transparent pass
      gl.enable(gl.BLEND)
      gl.blendEquation(gl.FUNC_ADD)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      gl.colorMask(true, true, true, true)
      gl.depthMask(false)
      gl.clearColor(0,0,0,0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      if(axes.isTransparent()) {
        axes.drawTransparent(cameraParams)
      }

      for(var i=0; i<numObjs; ++i) {
        var obj = objects[i]
        if(obj.isTransparent && obj.isTransparent()) {
          obj.drawTransparent(cameraParams)
        }
      }

      //Unbind framebuffer
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)

      //Draw composite pass
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      gl.disable(gl.DEPTH_TEST)
      accumShader.bind()
      accumBuffer.color[0].bind(0)
      accumShader.uniforms.accumBuffer = 0
      drawTriangle(gl)

      //Turn off blending
      gl.disable(gl.BLEND)
    }

    //Clear dirty flags
    dirty = false
    for(var i=0; i<numObjs; ++i) {
      objects[i].dirty = false
    }
  }

  //Draw the whole scene
  function render() {
    if(scene._stopped || scene.contextLost) {
      return
    }
    // this order is important: ios safari sometimes has sync raf
    redraw()
    requestAnimationFrame(render)
  }

  scene.enableMouseListeners()
  render()

  //Force redraw of whole scene
  scene.redraw = function() {
    if(scene._stopped) {
      return
    }
    dirty = true
    redraw()
  }

  return scene
}

function calcCameraParams(scene, isOrtho) {
  var bounds = scene.bounds
  var cameraParams = scene.cameraParams
  var projection = cameraParams.projection
  var model = cameraParams.model

  var width = scene.gl.drawingBufferWidth
  var height = scene.gl.drawingBufferHeight
  var zNear = scene.zNear
  var zFar = scene.zFar
  var fovy = scene.fovy

  var r = width / height

  if(isOrtho) {
    ortho(projection,
      -r,
      r,
      -1,
      1,
      zNear,
      zFar
    )
    cameraParams._ortho = true
  } else {
    perspective(projection,
      fovy,
      r,
      zNear,
      zFar
    )
    cameraParams._ortho = false
  }

  //Compute model matrix
  for(var i=0; i<16; ++i) {
    model[i] = 0
  }
  model[15] = 1

  var maxS = 0
  for(var i=0; i<3; ++i) {
    maxS = Math.max(maxS, bounds[1][i] - bounds[0][i])
  }

  for(var i=0; i<3; ++i) {
    if(scene.autoScale) {
      model[5*i] = scene.aspect[i] / (bounds[1][i] - bounds[0][i])
    } else {
      model[5*i] = 1 / maxS
    }
    if(scene.autoCenter) {
      model[12+i] = -model[5*i] * 0.5 * (bounds[0][i] + bounds[1][i])
    }
  }
}


/***/ }),

/***/ "./node_modules/gl-quat/slerp.js":
/*!***************************************!*\
  !*** ./node_modules/gl-quat/slerp.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = slerp

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
function slerp (out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations

  var ax = a[0], ay = a[1], az = a[2], aw = a[3],
    bx = b[0], by = b[1], bz = b[2], bw = b[3]

  var omega, cosom, sinom, scale0, scale1

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw
  // adjust signs (if necessary)
  if (cosom < 0.0) {
    cosom = -cosom
    bx = -bx
    by = -by
    bz = -bz
    bw = -bw
  }
  // calculate coefficients
  if ((1.0 - cosom) > 0.000001) {
    // standard case (slerp)
    omega = Math.acos(cosom)
    sinom = Math.sin(omega)
    scale0 = Math.sin((1.0 - t) * omega) / sinom
    scale1 = Math.sin(t * omega) / sinom
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t
    scale1 = t
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx
  out[1] = scale0 * ay + scale1 * by
  out[2] = scale0 * az + scale1 * bz
  out[3] = scale0 * aw + scale1 * bw

  return out
}


/***/ }),

/***/ "./node_modules/gl-spikes3d/shaders/index.js":
/*!***************************************************!*\
  !*** ./node_modules/gl-spikes3d/shaders/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var glslify      = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")
var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")

var vertSrc = glslify('./vertex.glsl')
var fragSrc = glslify('./fragment.glsl')

module.exports = function(gl) {
  return createShader(gl, vertSrc, fragSrc, null, [
    {name: 'position', type: 'vec3'},
    {name: 'color', type: 'vec3'},
    {name: 'weight', type: 'float'}
  ])
}


/***/ }),

/***/ "./node_modules/gl-spikes3d/spikes.js":
/*!********************************************!*\
  !*** ./node_modules/gl-spikes3d/spikes.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createVAO = __webpack_require__(/*! gl-vao */ "./node_modules/gl-vao/vao.js")
var createShader = __webpack_require__(/*! ./shaders/index */ "./node_modules/gl-spikes3d/shaders/index.js")

module.exports = createSpikes

var identity = [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]

function AxisSpikes(gl, buffer, vao, shader) {
  this.gl         = gl
  this.buffer     = buffer
  this.vao        = vao
  this.shader     = shader
  this.pixelRatio = 1
  this.bounds     = [[-1000,-1000,-1000], [1000,1000,1000]]
  this.position   = [0,0,0]
  this.lineWidth  = [2,2,2]
  this.colors     = [[0,0,0,1], [0,0,0,1], [0,0,0,1]]
  this.enabled    = [true,true,true]
  this.drawSides  = [true,true,true]
  this.axes       = null
}

var proto = AxisSpikes.prototype

var OUTER_FACE = [0,0,0]
var INNER_FACE = [0,0,0]

var SHAPE = [0,0]

proto.isTransparent = function() {
  return false
}

proto.drawTransparent = function(camera) {}

proto.draw = function(camera) {
  var gl = this.gl
  var vao = this.vao
  var shader = this.shader

  vao.bind()
  shader.bind()

  var model      = camera.model || identity
  var view       = camera.view || identity
  var projection = camera.projection || identity

  var axis
  if(this.axes) {
    axis = this.axes.lastCubeProps.axis
  }

  var outerFace = OUTER_FACE
  var innerFace = INNER_FACE
  for(var i=0; i<3; ++i) {
    if(axis && axis[i] < 0) {
      outerFace[i] = this.bounds[0][i]
      innerFace[i] = this.bounds[1][i]
    } else {
      outerFace[i] = this.bounds[1][i]
      innerFace[i] = this.bounds[0][i]
    }
  }

  SHAPE[0] = gl.drawingBufferWidth
  SHAPE[1] = gl.drawingBufferHeight

  shader.uniforms.model       = model
  shader.uniforms.view        = view
  shader.uniforms.projection  = projection
  shader.uniforms.coordinates = [this.position, outerFace, innerFace]
  shader.uniforms.colors      = this.colors
  shader.uniforms.screenShape = SHAPE

  for(var i=0; i<3; ++i) {
    shader.uniforms.lineWidth = this.lineWidth[i] * this.pixelRatio
    if(this.enabled[i]) {
      vao.draw(gl.TRIANGLES, 6, 6*i)
      if(this.drawSides[i]) {
        vao.draw(gl.TRIANGLES, 12, 18+12*i)
      }
    }
  }

  vao.unbind()
}

proto.update = function(options) {
  if(!options) {
    return
  }
  if("bounds" in options) {
    this.bounds = options.bounds
  }
  if("position" in options) {
    this.position = options.position
  }
  if("lineWidth" in options) {
    this.lineWidth = options.lineWidth
  }
  if("colors" in options) {
    this.colors = options.colors
  }
  if("enabled" in options) {
    this.enabled = options.enabled
  }
  if("drawSides" in options) {
    this.drawSides = options.drawSides
  }
}

proto.dispose = function() {
  this.vao.dispose()
  this.buffer.dispose()
  this.shader.dispose()
}



function createSpikes(gl, options) {
  //Create buffers
  var data = [ ]

  function line(x,y,z,i,l,h) {
    var row = [x,y,z,  0,0,0,  1]
    row[i+3] = 1
    row[i] = l
    data.push.apply(data, row)
    row[6] = -1
    data.push.apply(data, row)
    row[i] = h
    data.push.apply(data, row)
    data.push.apply(data, row)
    row[6] = 1
    data.push.apply(data, row)
    row[i] = l
    data.push.apply(data, row)
  }

  line(0,0,0, 0, 0, 1)
  line(0,0,0, 1, 0, 1)
  line(0,0,0, 2, 0, 1)

  line(1,0,0,  1,  -1,1)
  line(1,0,0,  2,  -1,1)

  line(0,1,0,  0,  -1,1)
  line(0,1,0,  2,  -1,1)

  line(0,0,1,  0,  -1,1)
  line(0,0,1,  1,  -1,1)

  var buffer = createBuffer(gl, data)
  var vao = createVAO(gl, [{
    type: gl.FLOAT,
    buffer: buffer,
    size: 3,
    offset: 0,
    stride: 28
  }, {
    type: gl.FLOAT,
    buffer: buffer,
    size: 3,
    offset: 12,
    stride: 28
  }, {
    type: gl.FLOAT,
    buffer: buffer,
    size: 1,
    offset: 24,
    stride: 28
  }])

  //Create shader
  var shader = createShader(gl)
  shader.attributes.position.location = 0
  shader.attributes.color.location = 1
  shader.attributes.weight.location = 2

  //Create spike object
  var spikes = new AxisSpikes(gl, buffer, vao, shader)

  //Set parameters
  spikes.update(options)

  //Return resulting object
  return spikes
}


/***/ }),

/***/ "./node_modules/gl-vao/lib/do-bind.js":
/*!********************************************!*\
  !*** ./node_modules/gl-vao/lib/do-bind.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";


function doBind(gl, elements, attributes) {
  if(elements) {
    elements.bind()
  } else {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }
  var nattribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)|0
  if(attributes) {
    if(attributes.length > nattribs) {
      throw new Error("gl-vao: Too many vertex attributes")
    }
    for(var i=0; i<attributes.length; ++i) {
      var attrib = attributes[i]
      if(attrib.buffer) {
        var buffer = attrib.buffer
        var size = attrib.size || 4
        var type = attrib.type || gl.FLOAT
        var normalized = !!attrib.normalized
        var stride = attrib.stride || 0
        var offset = attrib.offset || 0
        buffer.bind()
        gl.enableVertexAttribArray(i)
        gl.vertexAttribPointer(i, size, type, normalized, stride, offset)
      } else {
        if(typeof attrib === "number") {
          gl.vertexAttrib1f(i, attrib)
        } else if(attrib.length === 1) {
          gl.vertexAttrib1f(i, attrib[0])
        } else if(attrib.length === 2) {
          gl.vertexAttrib2f(i, attrib[0], attrib[1])
        } else if(attrib.length === 3) {
          gl.vertexAttrib3f(i, attrib[0], attrib[1], attrib[2])
        } else if(attrib.length === 4) {
          gl.vertexAttrib4f(i, attrib[0], attrib[1], attrib[2], attrib[3])
        } else {
          throw new Error("gl-vao: Invalid vertex attribute")
        }
        gl.disableVertexAttribArray(i)
      }
    }
    for(; i<nattribs; ++i) {
      gl.disableVertexAttribArray(i)
    }
  } else {
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    for(var i=0; i<nattribs; ++i) {
      gl.disableVertexAttribArray(i)
    }
  }
}

module.exports = doBind

/***/ }),

/***/ "./node_modules/gl-vao/lib/vao-emulated.js":
/*!*************************************************!*\
  !*** ./node_modules/gl-vao/lib/vao-emulated.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bindAttribs = __webpack_require__(/*! ./do-bind.js */ "./node_modules/gl-vao/lib/do-bind.js")

function VAOEmulated(gl) {
  this.gl = gl
  this._elements = null
  this._attributes = null
  this._elementsType = gl.UNSIGNED_SHORT
}

VAOEmulated.prototype.bind = function() {
  bindAttribs(this.gl, this._elements, this._attributes)
}

VAOEmulated.prototype.update = function(attributes, elements, elementsType) {
  this._elements = elements
  this._attributes = attributes
  this._elementsType = elementsType || this.gl.UNSIGNED_SHORT
}

VAOEmulated.prototype.dispose = function() { }
VAOEmulated.prototype.unbind = function() { }

VAOEmulated.prototype.draw = function(mode, count, offset) {
  offset = offset || 0
  var gl = this.gl
  if(this._elements) {
    gl.drawElements(mode, count, this._elementsType, offset)
  } else {
    gl.drawArrays(mode, offset, count)
  }
}

function createVAOEmulated(gl) {
  return new VAOEmulated(gl)
}

module.exports = createVAOEmulated

/***/ }),

/***/ "./node_modules/gl-vao/lib/vao-native.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-vao/lib/vao-native.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bindAttribs = __webpack_require__(/*! ./do-bind.js */ "./node_modules/gl-vao/lib/do-bind.js")

function VertexAttribute(location, dimension, a, b, c, d) {
  this.location = location
  this.dimension = dimension
  this.a = a
  this.b = b
  this.c = c
  this.d = d
}

VertexAttribute.prototype.bind = function(gl) {
  switch(this.dimension) {
    case 1:
      gl.vertexAttrib1f(this.location, this.a)
    break
    case 2:
      gl.vertexAttrib2f(this.location, this.a, this.b)
    break
    case 3:
      gl.vertexAttrib3f(this.location, this.a, this.b, this.c)
    break
    case 4:
      gl.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d)
    break
  }
}

function VAONative(gl, ext, handle) {
  this.gl = gl
  this._ext = ext
  this.handle = handle
  this._attribs = []
  this._useElements = false
  this._elementsType = gl.UNSIGNED_SHORT
}

VAONative.prototype.bind = function() {
  this._ext.bindVertexArrayOES(this.handle)
  for(var i=0; i<this._attribs.length; ++i) {
    this._attribs[i].bind(this.gl)
  }
}

VAONative.prototype.unbind = function() {
  this._ext.bindVertexArrayOES(null)
}

VAONative.prototype.dispose = function() {
  this._ext.deleteVertexArrayOES(this.handle)
}

VAONative.prototype.update = function(attributes, elements, elementsType) {
  this.bind()
  bindAttribs(this.gl, elements, attributes)
  this.unbind()
  this._attribs.length = 0
  if(attributes)
  for(var i=0; i<attributes.length; ++i) {
    var a = attributes[i]
    if(typeof a === "number") {
      this._attribs.push(new VertexAttribute(i, 1, a))
    } else if(Array.isArray(a)) {
      this._attribs.push(new VertexAttribute(i, a.length, a[0], a[1], a[2], a[3]))
    }
  }
  this._useElements = !!elements
  this._elementsType = elementsType || this.gl.UNSIGNED_SHORT
}

VAONative.prototype.draw = function(mode, count, offset) {
  offset = offset || 0
  var gl = this.gl
  if(this._useElements) {
    gl.drawElements(mode, count, this._elementsType, offset)
  } else {
    gl.drawArrays(mode, offset, count)
  }
}

function createVAONative(gl, ext) {
  return new VAONative(gl, ext, ext.createVertexArrayOES())
}

module.exports = createVAONative

/***/ }),

/***/ "./node_modules/gl-vao/vao.js":
/*!************************************!*\
  !*** ./node_modules/gl-vao/vao.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createVAONative = __webpack_require__(/*! ./lib/vao-native.js */ "./node_modules/gl-vao/lib/vao-native.js")
var createVAOEmulated = __webpack_require__(/*! ./lib/vao-emulated.js */ "./node_modules/gl-vao/lib/vao-emulated.js")

function ExtensionShim (gl) {
  this.bindVertexArrayOES = gl.bindVertexArray.bind(gl)
  this.createVertexArrayOES = gl.createVertexArray.bind(gl)
  this.deleteVertexArrayOES = gl.deleteVertexArray.bind(gl)
}

function createVAO(gl, attributes, elements, elementsType) {
  var ext = gl.createVertexArray
    ? new ExtensionShim(gl)
    : gl.getExtension('OES_vertex_array_object')
  var vao

  if(ext) {
    vao = createVAONative(gl, ext)
  } else {
    vao = createVAOEmulated(gl)
  }
  vao.update(attributes, elements, elementsType)
  return vao
}

module.exports = createVAO


/***/ }),

/***/ "./node_modules/gl-vec3/cross.js":
/*!***************************************!*\
  !*** ./node_modules/gl-vec3/cross.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    out[0] = ay * bz - az * by
    out[1] = az * bx - ax * bz
    out[2] = ax * by - ay * bx
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/dot.js":
/*!*************************************!*\
  !*** ./node_modules/gl-vec3/dot.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = dot;

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

/***/ }),

/***/ "./node_modules/gl-vec3/length.js":
/*!****************************************!*\
  !*** ./node_modules/gl-vec3/length.js ***!
  \****************************************/
/***/ ((module) => {

module.exports = length;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return Math.sqrt(x*x + y*y + z*z)
}

/***/ }),

/***/ "./node_modules/gl-vec3/lerp.js":
/*!**************************************!*\
  !*** ./node_modules/gl-vec3/lerp.js ***!
  \**************************************/
/***/ ((module) => {

module.exports = lerp;

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2]
    out[0] = ax + t * (b[0] - ax)
    out[1] = ay + t * (b[1] - ay)
    out[2] = az + t * (b[2] - az)
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec3/normalize.js":
/*!*******************************************!*\
  !*** ./node_modules/gl-vec3/normalize.js ***!
  \*******************************************/
/***/ ((module) => {

module.exports = normalize;

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    var len = x*x + y*y + z*z
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len)
        out[0] = a[0] * len
        out[1] = a[1] * len
        out[2] = a[2] * len
    }
    return out
}

/***/ }),

/***/ "./node_modules/gl-vec4/transformMat4.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-vec4/transformMat4.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = transformMat4

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
function transformMat4 (out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3]
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w
  return out
}


/***/ }),

/***/ "./node_modules/is-mobile/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-mobile/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


module.exports = isMobile
module.exports.isMobile = isMobile
module.exports.default = isMobile

var mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i

var tabletRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i

function isMobile (opts) {
  if (!opts) opts = {}
  var ua = opts.ua
  if (!ua && typeof navigator !== 'undefined') ua = navigator.userAgent
  if (ua && ua.headers && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent']
  }
  if (typeof ua !== 'string') return false

  var result = opts.tablet ? tabletRE.test(ua) : mobileRE.test(ua)

  if (
    !result &&
    opts.tablet &&
    opts.featureDetect &&
    navigator &&
    navigator.maxTouchPoints > 1 &&
    ua.indexOf('Macintosh') !== -1 &&
    ua.indexOf('Safari') !== -1
  ) {
    result = true
  }

  return result
}


/***/ }),

/***/ "./node_modules/lerp/index.js":
/*!************************************!*\
  !*** ./node_modules/lerp/index.js ***!
  \************************************/
/***/ ((module) => {

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}
module.exports = lerp

/***/ }),

/***/ "./node_modules/mat4-decompose/index.js":
/*!**********************************************!*\
  !*** ./node_modules/mat4-decompose/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*jshint unused:true*/
/*
Input:  matrix      ; a 4x4 matrix
Output: translation ; a 3 component vector
        scale       ; a 3 component vector
        skew        ; skew factors XY,XZ,YZ represented as a 3 component vector
        perspective ; a 4 component vector
        quaternion  ; a 4 component vector
Returns false if the matrix cannot be decomposed, true if it can


References:
https://github.com/kamicane/matrix3d/blob/master/lib/Matrix3d.js
https://github.com/ChromiumWebApps/chromium/blob/master/ui/gfx/transform_util.cc
http://www.w3.org/TR/css3-transforms/#decomposing-a-3d-matrix
*/

var normalize = __webpack_require__(/*! ./normalize */ "./node_modules/mat4-decompose/normalize.js")

var create = __webpack_require__(/*! gl-mat4/create */ "./node_modules/gl-mat4/create.js")
var clone = __webpack_require__(/*! gl-mat4/clone */ "./node_modules/gl-mat4/clone.js")
var determinant = __webpack_require__(/*! gl-mat4/determinant */ "./node_modules/gl-mat4/determinant.js")
var invert = __webpack_require__(/*! gl-mat4/invert */ "./node_modules/gl-mat4/invert.js")
var transpose = __webpack_require__(/*! gl-mat4/transpose */ "./node_modules/gl-mat4/transpose.js")
var vec3 = {
    length: __webpack_require__(/*! gl-vec3/length */ "./node_modules/gl-vec3/length.js"),
    normalize: __webpack_require__(/*! gl-vec3/normalize */ "./node_modules/gl-vec3/normalize.js"),
    dot: __webpack_require__(/*! gl-vec3/dot */ "./node_modules/gl-vec3/dot.js"),
    cross: __webpack_require__(/*! gl-vec3/cross */ "./node_modules/gl-vec3/cross.js")
}

var tmp = create()
var perspectiveMatrix = create()
var tmpVec4 = [0, 0, 0, 0]
var row = [ [0,0,0], [0,0,0], [0,0,0] ]
var pdum3 = [0,0,0]

module.exports = function decomposeMat4(matrix, translation, scale, skew, perspective, quaternion) {
    if (!translation) translation = [0,0,0]
    if (!scale) scale = [0,0,0]
    if (!skew) skew = [0,0,0]
    if (!perspective) perspective = [0,0,0,1]
    if (!quaternion) quaternion = [0,0,0,1]

    //normalize, if not possible then bail out early
    if (!normalize(tmp, matrix))
        return false

    // perspectiveMatrix is used to solve for perspective, but it also provides
    // an easy way to test for singularity of the upper 3x3 component.
    clone(perspectiveMatrix, tmp)

    perspectiveMatrix[3] = 0
    perspectiveMatrix[7] = 0
    perspectiveMatrix[11] = 0
    perspectiveMatrix[15] = 1

    // If the perspectiveMatrix is not invertible, we are also unable to
    // decompose, so we'll bail early. Constant taken from SkMatrix44::invert.
    if (Math.abs(determinant(perspectiveMatrix) < 1e-8))
        return false

    var a03 = tmp[3], a13 = tmp[7], a23 = tmp[11],
            a30 = tmp[12], a31 = tmp[13], a32 = tmp[14], a33 = tmp[15]

    // First, isolate perspective.
    if (a03 !== 0 || a13 !== 0 || a23 !== 0) {
        tmpVec4[0] = a03
        tmpVec4[1] = a13
        tmpVec4[2] = a23
        tmpVec4[3] = a33

        // Solve the equation by inverting perspectiveMatrix and multiplying
        // rightHandSide by the inverse.
        // resuing the perspectiveMatrix here since it's no longer needed
        var ret = invert(perspectiveMatrix, perspectiveMatrix)
        if (!ret) return false
        transpose(perspectiveMatrix, perspectiveMatrix)

        //multiply by transposed inverse perspective matrix, into perspective vec4
        vec4multMat4(perspective, tmpVec4, perspectiveMatrix)
    } else { 
        //no perspective
        perspective[0] = perspective[1] = perspective[2] = 0
        perspective[3] = 1
    }

    // Next take care of translation
    translation[0] = a30
    translation[1] = a31
    translation[2] = a32

    // Now get scale and shear. 'row' is a 3 element array of 3 component vectors
    mat3from4(row, tmp)

    // Compute X scale factor and normalize first row.
    scale[0] = vec3.length(row[0])
    vec3.normalize(row[0], row[0])

    // Compute XY shear factor and make 2nd row orthogonal to 1st.
    skew[0] = vec3.dot(row[0], row[1])
    combine(row[1], row[1], row[0], 1.0, -skew[0])

    // Now, compute Y scale and normalize 2nd row.
    scale[1] = vec3.length(row[1])
    vec3.normalize(row[1], row[1])
    skew[0] /= scale[1]

    // Compute XZ and YZ shears, orthogonalize 3rd row
    skew[1] = vec3.dot(row[0], row[2])
    combine(row[2], row[2], row[0], 1.0, -skew[1])
    skew[2] = vec3.dot(row[1], row[2])
    combine(row[2], row[2], row[1], 1.0, -skew[2])

    // Next, get Z scale and normalize 3rd row.
    scale[2] = vec3.length(row[2])
    vec3.normalize(row[2], row[2])
    skew[1] /= scale[2]
    skew[2] /= scale[2]


    // At this point, the matrix (in rows) is orthonormal.
    // Check for a coordinate system flip.  If the determinant
    // is -1, then negate the matrix and the scaling factors.
    vec3.cross(pdum3, row[1], row[2])
    if (vec3.dot(row[0], pdum3) < 0) {
        for (var i = 0; i < 3; i++) {
            scale[i] *= -1;
            row[i][0] *= -1
            row[i][1] *= -1
            row[i][2] *= -1
        }
    }

    // Now, get the rotations out
    quaternion[0] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] - row[1][1] - row[2][2], 0))
    quaternion[1] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] + row[1][1] - row[2][2], 0))
    quaternion[2] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] - row[1][1] + row[2][2], 0))
    quaternion[3] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] + row[1][1] + row[2][2], 0))

    if (row[2][1] > row[1][2])
        quaternion[0] = -quaternion[0]
    if (row[0][2] > row[2][0])
        quaternion[1] = -quaternion[1]
    if (row[1][0] > row[0][1])
        quaternion[2] = -quaternion[2]
    return true
}

//will be replaced by gl-vec4 eventually
function vec4multMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
}

//gets upper-left of a 4x4 matrix into a 3x3 of vectors
function mat3from4(out, mat4x4) {
    out[0][0] = mat4x4[0]
    out[0][1] = mat4x4[1]
    out[0][2] = mat4x4[2]
    
    out[1][0] = mat4x4[4]
    out[1][1] = mat4x4[5]
    out[1][2] = mat4x4[6]

    out[2][0] = mat4x4[8]
    out[2][1] = mat4x4[9]
    out[2][2] = mat4x4[10]
}

function combine(out, a, b, scale1, scale2) {
    out[0] = a[0] * scale1 + b[0] * scale2
    out[1] = a[1] * scale1 + b[1] * scale2
    out[2] = a[2] * scale1 + b[2] * scale2
}

/***/ }),

/***/ "./node_modules/mat4-decompose/normalize.js":
/*!**************************************************!*\
  !*** ./node_modules/mat4-decompose/normalize.js ***!
  \**************************************************/
/***/ ((module) => {

module.exports = function normalize(out, mat) {
    var m44 = mat[15]
    // Cannot normalize.
    if (m44 === 0) 
        return false
    var scale = 1 / m44
    for (var i=0; i<16; i++)
        out[i] = mat[i] * scale
    return true
}

/***/ }),

/***/ "./node_modules/mat4-interpolate/index.js":
/*!************************************************!*\
  !*** ./node_modules/mat4-interpolate/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var lerp = __webpack_require__(/*! gl-vec3/lerp */ "./node_modules/gl-vec3/lerp.js")

var recompose = __webpack_require__(/*! mat4-recompose */ "./node_modules/mat4-recompose/index.js")
var decompose = __webpack_require__(/*! mat4-decompose */ "./node_modules/mat4-decompose/index.js")
var determinant = __webpack_require__(/*! gl-mat4/determinant */ "./node_modules/gl-mat4/determinant.js")
var slerp = __webpack_require__(/*! quat-slerp */ "./node_modules/quat-slerp/index.js")

var state0 = state()
var state1 = state()
var tmp = state()

module.exports = interpolate
function interpolate(out, start, end, alpha) {
    if (determinant(start) === 0 || determinant(end) === 0)
        return false

    //decompose the start and end matrices into individual components
    var r0 = decompose(start, state0.translate, state0.scale, state0.skew, state0.perspective, state0.quaternion)
    var r1 = decompose(end, state1.translate, state1.scale, state1.skew, state1.perspective, state1.quaternion)
    if (!r0 || !r1)
        return false    


    //now lerp/slerp the start and end components into a temporary     lerp(tmptranslate, state0.translate, state1.translate, alpha)
    lerp(tmp.translate, state0.translate, state1.translate, alpha)
    lerp(tmp.skew, state0.skew, state1.skew, alpha)
    lerp(tmp.scale, state0.scale, state1.scale, alpha)
    lerp(tmp.perspective, state0.perspective, state1.perspective, alpha)
    slerp(tmp.quaternion, state0.quaternion, state1.quaternion, alpha)

    //and recompose into our 'out' matrix
    recompose(out, tmp.translate, tmp.scale, tmp.skew, tmp.perspective, tmp.quaternion)
    return true
}

function state() {
    return {
        translate: vec3(),
        scale: vec3(1),
        skew: vec3(),
        perspective: vec4(),
        quaternion: vec4()
    }
}

function vec3(n) {
    return [n||0,n||0,n||0]
}

function vec4() {
    return [0,0,0,1]
}

/***/ }),

/***/ "./node_modules/mat4-recompose/index.js":
/*!**********************************************!*\
  !*** ./node_modules/mat4-recompose/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
Input:  translation ; a 3 component vector
        scale       ; a 3 component vector
        skew        ; skew factors XY,XZ,YZ represented as a 3 component vector
        perspective ; a 4 component vector
        quaternion  ; a 4 component vector
Output: matrix      ; a 4x4 matrix

From: http://www.w3.org/TR/css3-transforms/#recomposing-to-a-3d-matrix
*/

var mat4 = {
    identity: __webpack_require__(/*! gl-mat4/identity */ "./node_modules/gl-mat4/identity.js"),
    translate: __webpack_require__(/*! gl-mat4/translate */ "./node_modules/gl-mat4/translate.js"),
    multiply: __webpack_require__(/*! gl-mat4/multiply */ "./node_modules/gl-mat4/multiply.js"),
    create: __webpack_require__(/*! gl-mat4/create */ "./node_modules/gl-mat4/create.js"),
    scale: __webpack_require__(/*! gl-mat4/scale */ "./node_modules/gl-mat4/scale.js"),
    fromRotationTranslation: __webpack_require__(/*! gl-mat4/fromRotationTranslation */ "./node_modules/gl-mat4/fromRotationTranslation.js")
}

var rotationMatrix = mat4.create()
var temp = mat4.create()

module.exports = function recomposeMat4(matrix, translation, scale, skew, perspective, quaternion) {
    mat4.identity(matrix)

    //apply translation & rotation
    mat4.fromRotationTranslation(matrix, quaternion, translation)

    //apply perspective
    matrix[3] = perspective[0]
    matrix[7] = perspective[1]
    matrix[11] = perspective[2]
    matrix[15] = perspective[3]
        
    // apply skew
    // temp is a identity 4x4 matrix initially
    mat4.identity(temp)

    if (skew[2] !== 0) {
        temp[9] = skew[2]
        mat4.multiply(matrix, matrix, temp)
    }

    if (skew[1] !== 0) {
        temp[9] = 0
        temp[8] = skew[1]
        mat4.multiply(matrix, matrix, temp)
    }

    if (skew[0] !== 0) {
        temp[8] = 0
        temp[4] = skew[0]
        mat4.multiply(matrix, matrix, temp)
    }

    //apply scale
    mat4.scale(matrix, matrix, scale)
    return matrix
}

/***/ }),

/***/ "./node_modules/matrix-camera-controller/matrix.js":
/*!*********************************************************!*\
  !*** ./node_modules/matrix-camera-controller/matrix.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bsearch   = __webpack_require__(/*! binary-search-bounds */ "./node_modules/matrix-camera-controller/node_modules/binary-search-bounds/search-bounds.js")
var m4interp  = __webpack_require__(/*! mat4-interpolate */ "./node_modules/mat4-interpolate/index.js")
var invert44  = __webpack_require__(/*! gl-mat4/invert */ "./node_modules/gl-mat4/invert.js")
var rotateX   = __webpack_require__(/*! gl-mat4/rotateX */ "./node_modules/gl-mat4/rotateX.js")
var rotateY   = __webpack_require__(/*! gl-mat4/rotateY */ "./node_modules/gl-mat4/rotateY.js")
var rotateZ   = __webpack_require__(/*! gl-mat4/rotateZ */ "./node_modules/gl-mat4/rotateZ.js")
var lookAt    = __webpack_require__(/*! gl-mat4/lookAt */ "./node_modules/gl-mat4/lookAt.js")
var translate = __webpack_require__(/*! gl-mat4/translate */ "./node_modules/gl-mat4/translate.js")
var scale     = __webpack_require__(/*! gl-mat4/scale */ "./node_modules/gl-mat4/scale.js")
var normalize = __webpack_require__(/*! gl-vec3/normalize */ "./node_modules/gl-vec3/normalize.js")

var DEFAULT_CENTER = [0,0,0]

module.exports = createMatrixCameraController

function MatrixCameraController(initialMatrix) {
  this._components    = initialMatrix.slice()
  this._time          = [0]
  this.prevMatrix     = initialMatrix.slice()
  this.nextMatrix     = initialMatrix.slice()
  this.computedMatrix = initialMatrix.slice()
  this.computedInverse = initialMatrix.slice()
  this.computedEye    = [0,0,0]
  this.computedUp     = [0,0,0]
  this.computedCenter = [0,0,0]
  this.computedRadius = [0]
  this._limits        = [-Infinity, Infinity]
}

var proto = MatrixCameraController.prototype

proto.recalcMatrix = function(t) {
  var time = this._time
  var tidx = bsearch.le(time, t)
  var mat = this.computedMatrix
  if(tidx < 0) {
    return
  }
  var comps = this._components
  if(tidx === time.length-1) {
    var ptr = 16*tidx
    for(var i=0; i<16; ++i) {
      mat[i] = comps[ptr++]
    }
  } else {
    var dt = (time[tidx+1] - time[tidx])
    var ptr = 16*tidx
    var prev = this.prevMatrix
    var allEqual = true
    for(var i=0; i<16; ++i) {
      prev[i] = comps[ptr++]
    }
    var next = this.nextMatrix
    for(var i=0; i<16; ++i) {
      next[i] = comps[ptr++]
      allEqual = allEqual && (prev[i] === next[i])
    }
    if(dt < 1e-6 || allEqual) {
      for(var i=0; i<16; ++i) {
        mat[i] = prev[i]
      }
    } else {
      m4interp(mat, prev, next, (t - time[tidx])/dt)
    }
  }

  var up = this.computedUp
  up[0] = mat[1]
  up[1] = mat[5]
  up[2] = mat[9]
  normalize(up, up)

  var imat = this.computedInverse
  invert44(imat, mat)
  var eye = this.computedEye
  var w = imat[15]
  eye[0] = imat[12]/w
  eye[1] = imat[13]/w
  eye[2] = imat[14]/w

  var center = this.computedCenter
  var radius = Math.exp(this.computedRadius[0])
  for(var i=0; i<3; ++i) {
    center[i] = eye[i] - mat[2+4*i] * radius
  }
}

proto.idle = function(t) {
  if(t < this.lastT()) {
    return
  }
  var mc = this._components
  var ptr = mc.length-16
  for(var i=0; i<16; ++i) {
    mc.push(mc[ptr++])
  }
  this._time.push(t)
}

proto.flush = function(t) {
  var idx = bsearch.gt(this._time, t) - 2
  if(idx < 0) {
    return
  }
  this._time.splice(0, idx)
  this._components.splice(0, 16*idx)
}

proto.lastT = function() {
  return this._time[this._time.length-1]
}

proto.lookAt = function(t, eye, center, up) {
  this.recalcMatrix(t)
  eye    = eye || this.computedEye
  center = center || DEFAULT_CENTER
  up     = up || this.computedUp
  this.setMatrix(t, lookAt(this.computedMatrix, eye, center, up))
  var d2 = 0.0
  for(var i=0; i<3; ++i) {
    d2 += Math.pow(center[i] - eye[i], 2)
  }
  d2 = Math.log(Math.sqrt(d2))
  this.computedRadius[0] = d2
}

proto.rotate = function(t, yaw, pitch, roll) {
  this.recalcMatrix(t)
  var mat = this.computedInverse
  if(yaw)   rotateY(mat, mat, yaw)
  if(pitch) rotateX(mat, mat, pitch)
  if(roll)  rotateZ(mat, mat, roll)
  this.setMatrix(t, invert44(this.computedMatrix, mat))
}

var tvec = [0,0,0]

proto.pan = function(t, dx, dy, dz) {
  tvec[0] = -(dx || 0.0)
  tvec[1] = -(dy || 0.0)
  tvec[2] = -(dz || 0.0)
  this.recalcMatrix(t)
  var mat = this.computedInverse
  translate(mat, mat, tvec)
  this.setMatrix(t, invert44(mat, mat))
}

proto.translate = function(t, dx, dy, dz) {
  tvec[0] = dx || 0.0
  tvec[1] = dy || 0.0
  tvec[2] = dz || 0.0
  this.recalcMatrix(t)
  var mat = this.computedMatrix
  translate(mat, mat, tvec)
  this.setMatrix(t, mat)
}

proto.setMatrix = function(t, mat) {
  if(t < this.lastT()) {
    return
  }
  this._time.push(t)
  for(var i=0; i<16; ++i) {
    this._components.push(mat[i])
  }
}

proto.setDistance = function(t, d) {
  this.computedRadius[0] = d
}

proto.setDistanceLimits = function(a,b) {
  var lim = this._limits
  lim[0] = a
  lim[1] = b
}

proto.getDistanceLimits = function(out) {
  var lim = this._limits
  if(out) {
    out[0] = lim[0]
    out[1] = lim[1]
    return out
  }
  return lim
}

function createMatrixCameraController(options) {
  options = options || {}
  var matrix = options.matrix || 
              [1,0,0,0,
               0,1,0,0,
               0,0,1,0,
               0,0,0,1]
  return new MatrixCameraController(matrix)
}


/***/ }),

/***/ "./node_modules/matrix-camera-controller/node_modules/binary-search-bounds/search-bounds.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/matrix-camera-controller/node_modules/binary-search-bounds/search-bounds.js ***!
  \**************************************************************************************************/
/***/ ((module) => {

"use strict";


function compileSearch(funcName, predicate, reversed, extraArgs, useNdarray, earlyOut) {
  var code = [
    "function ", funcName, "(a,l,h,", extraArgs.join(","),  "){",
earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"),
";while(l<=h){\
var m=(l+h)>>>1,x=a", useNdarray ? ".get(m)" : "[m]"]
  if(earlyOut) {
    if(predicate.indexOf("c") < 0) {
      code.push(";if(x===y){return m}else if(x<=y){")
    } else {
      code.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){")
    }
  } else {
    code.push(";if(", predicate, "){i=m;")
  }
  if(reversed) {
    code.push("l=m+1}else{h=m-1}")
  } else {
    code.push("h=m-1}else{l=m+1}")
  }
  code.push("}")
  if(earlyOut) {
    code.push("return -1};")
  } else {
    code.push("return i};")
  }
  return code.join("")
}

function compileBoundsSearch(predicate, reversed, suffix, earlyOut) {
  var result = new Function([
  compileSearch("A", "x" + predicate + "y", reversed, ["y"], false, earlyOut),
  compileSearch("B", "x" + predicate + "y", reversed, ["y"], true, earlyOut),
  compileSearch("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], false, earlyOut),
  compileSearch("Q", "c(x,y)" + predicate + "0", reversed, ["y", "c"], true, earlyOut),
"function dispatchBsearch", suffix, "(a,y,c,l,h){\
if(a.shape){\
if(typeof(c)==='function'){\
return Q(a,(l===undefined)?0:l|0,(h===undefined)?a.shape[0]-1:h|0,y,c)\
}else{\
return B(a,(c===undefined)?0:c|0,(l===undefined)?a.shape[0]-1:l|0,y)\
}}else{\
if(typeof(c)==='function'){\
return P(a,(l===undefined)?0:l|0,(h===undefined)?a.length-1:h|0,y,c)\
}else{\
return A(a,(c===undefined)?0:c|0,(l===undefined)?a.length-1:l|0,y)\
}}}\
return dispatchBsearch", suffix].join(""))
  return result()
}

module.exports = {
  ge: compileBoundsSearch(">=", false, "GE"),
  gt: compileBoundsSearch(">", false, "GT"),
  lt: compileBoundsSearch("<", true, "LT"),
  le: compileBoundsSearch("<=", true, "LE"),
  eq: compileBoundsSearch("-", true, "EQ", true)
}


/***/ }),

/***/ "./node_modules/orbit-camera-controller/lib/quatFromFrame.js":
/*!*******************************************************************!*\
  !*** ./node_modules/orbit-camera-controller/lib/quatFromFrame.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";


module.exports = quatFromFrame

function quatFromFrame(
  out,
  rx, ry, rz,
  ux, uy, uz,
  fx, fy, fz) {
  var tr = rx + uy + fz
  if(l > 0) {
    var l = Math.sqrt(tr + 1.0)
    out[0] = 0.5 * (uz - fy) / l
    out[1] = 0.5 * (fx - rz) / l
    out[2] = 0.5 * (ry - uy) / l
    out[3] = 0.5 * l
  } else {
    var tf = Math.max(rx, uy, fz)
    var l = Math.sqrt(2 * tf - tr + 1.0)
    if(rx >= tf) {
      //x y z  order
      out[0] = 0.5 * l
      out[1] = 0.5 * (ux + ry) / l
      out[2] = 0.5 * (fx + rz) / l
      out[3] = 0.5 * (uz - fy) / l
    } else if(uy >= tf) {
      //y z x  order
      out[0] = 0.5 * (ry + ux) / l
      out[1] = 0.5 * l
      out[2] = 0.5 * (fy + uz) / l
      out[3] = 0.5 * (fx - rz) / l
    } else {
      //z x y  order
      out[0] = 0.5 * (rz + fx) / l
      out[1] = 0.5 * (uz + fy) / l
      out[2] = 0.5 * l
      out[3] = 0.5 * (ry - ux) / l
    }
  }
  return out
}

/***/ }),

/***/ "./node_modules/orbit-camera-controller/orbit.js":
/*!*******************************************************!*\
  !*** ./node_modules/orbit-camera-controller/orbit.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createOrbitController

var filterVector  = __webpack_require__(/*! filtered-vector */ "./node_modules/filtered-vector/fvec.js")
var lookAt        = __webpack_require__(/*! gl-mat4/lookAt */ "./node_modules/gl-mat4/lookAt.js")
var mat4FromQuat  = __webpack_require__(/*! gl-mat4/fromQuat */ "./node_modules/gl-mat4/fromQuat.js")
var invert44      = __webpack_require__(/*! gl-mat4/invert */ "./node_modules/gl-mat4/invert.js")
var quatFromFrame = __webpack_require__(/*! ./lib/quatFromFrame */ "./node_modules/orbit-camera-controller/lib/quatFromFrame.js")

function len3(x,y,z) {
  return Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))
}

function len4(w,x,y,z) {
  return Math.sqrt(Math.pow(w,2) + Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))
}

function normalize4(out, a) {
  var ax = a[0]
  var ay = a[1]
  var az = a[2]
  var aw = a[3]
  var al = len4(ax, ay, az, aw)
  if(al > 1e-6) {
    out[0] = ax/al
    out[1] = ay/al
    out[2] = az/al
    out[3] = aw/al
  } else {
    out[0] = out[1] = out[2] = 0.0
    out[3] = 1.0
  }
}

function OrbitCameraController(initQuat, initCenter, initRadius) {
  this.radius    = filterVector([initRadius])
  this.center    = filterVector(initCenter)
  this.rotation  = filterVector(initQuat)

  this.computedRadius   = this.radius.curve(0)
  this.computedCenter   = this.center.curve(0)
  this.computedRotation = this.rotation.curve(0)
  this.computedUp       = [0.1,0,0]
  this.computedEye      = [0.1,0,0]
  this.computedMatrix   = [0.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  this.recalcMatrix(0)
}

var proto = OrbitCameraController.prototype

proto.lastT = function() {
  return Math.max(
    this.radius.lastT(),
    this.center.lastT(),
    this.rotation.lastT())
}

proto.recalcMatrix = function(t) {
  this.radius.curve(t)
  this.center.curve(t)
  this.rotation.curve(t)

  var quat = this.computedRotation
  normalize4(quat, quat)

  var mat = this.computedMatrix
  mat4FromQuat(mat, quat)

  var center = this.computedCenter
  var eye    = this.computedEye
  var up     = this.computedUp
  var radius = Math.exp(this.computedRadius[0])

  eye[0] = center[0] + radius * mat[2]
  eye[1] = center[1] + radius * mat[6]
  eye[2] = center[2] + radius * mat[10]
  up[0] = mat[1]
  up[1] = mat[5]
  up[2] = mat[9]

  for(var i=0; i<3; ++i) {
    var rr = 0.0
    for(var j=0; j<3; ++j) {
      rr += mat[i+4*j] * eye[j]
    }
    mat[12+i] = -rr
  }
}

proto.getMatrix = function(t, result) {
  this.recalcMatrix(t)
  var m = this.computedMatrix
  if(result) {
    for(var i=0; i<16; ++i) {
      result[i] = m[i]
    }
    return result
  }
  return m
}

proto.idle = function(t) {
  this.center.idle(t)
  this.radius.idle(t)
  this.rotation.idle(t)
}

proto.flush = function(t) {
  this.center.flush(t)
  this.radius.flush(t)
  this.rotation.flush(t)
}

proto.pan = function(t, dx, dy, dz) {
  dx = dx || 0.0
  dy = dy || 0.0
  dz = dz || 0.0

  this.recalcMatrix(t)
  var mat = this.computedMatrix

  var ux = mat[1]
  var uy = mat[5]
  var uz = mat[9]
  var ul = len3(ux, uy, uz)
  ux /= ul
  uy /= ul
  uz /= ul

  var rx = mat[0]
  var ry = mat[4]
  var rz = mat[8]
  var ru = rx * ux + ry * uy + rz * uz
  rx -= ux * ru
  ry -= uy * ru
  rz -= uz * ru
  var rl = len3(rx, ry, rz)
  rx /= rl
  ry /= rl
  rz /= rl

  var fx = mat[2]
  var fy = mat[6]
  var fz = mat[10]
  var fu = fx * ux + fy * uy + fz * uz
  var fr = fx * rx + fy * ry + fz * rz
  fx -= fu * ux + fr * rx
  fy -= fu * uy + fr * ry
  fz -= fu * uz + fr * rz
  var fl = len3(fx, fy, fz)
  fx /= fl
  fy /= fl
  fz /= fl

  var vx = rx * dx + ux * dy
  var vy = ry * dx + uy * dy
  var vz = rz * dx + uz * dy

  this.center.move(t, vx, vy, vz)

  //Update z-component of radius
  var radius = Math.exp(this.computedRadius[0])
  radius = Math.max(1e-4, radius + dz)
  this.radius.set(t, Math.log(radius))
}

proto.rotate = function(t, dx, dy, dz) {
  this.recalcMatrix(t)

  dx = dx||0.0
  dy = dy||0.0

  var mat = this.computedMatrix

  var rx = mat[0]
  var ry = mat[4]
  var rz = mat[8]

  var ux = mat[1]
  var uy = mat[5]
  var uz = mat[9]

  var fx = mat[2]
  var fy = mat[6]
  var fz = mat[10]

  var qx = dx * rx + dy * ux
  var qy = dx * ry + dy * uy
  var qz = dx * rz + dy * uz

  var bx = -(fy * qz - fz * qy)
  var by = -(fz * qx - fx * qz)
  var bz = -(fx * qy - fy * qx)  
  var bw = Math.sqrt(Math.max(0.0, 1.0 - Math.pow(bx,2) - Math.pow(by,2) - Math.pow(bz,2)))
  var bl = len4(bx, by, bz, bw)
  if(bl > 1e-6) {
    bx /= bl
    by /= bl
    bz /= bl
    bw /= bl
  } else {
    bx = by = bz = 0.0
    bw = 1.0
  }

  var rotation = this.computedRotation
  var ax = rotation[0]
  var ay = rotation[1]
  var az = rotation[2]
  var aw = rotation[3]

  var cx = ax*bw + aw*bx + ay*bz - az*by
  var cy = ay*bw + aw*by + az*bx - ax*bz
  var cz = az*bw + aw*bz + ax*by - ay*bx
  var cw = aw*bw - ax*bx - ay*by - az*bz
  
  //Apply roll
  if(dz) {
    bx = fx
    by = fy
    bz = fz
    var s = Math.sin(dz) / len3(bx, by, bz)
    bx *= s
    by *= s
    bz *= s
    bw = Math.cos(dx)
    cx = cx*bw + cw*bx + cy*bz - cz*by
    cy = cy*bw + cw*by + cz*bx - cx*bz
    cz = cz*bw + cw*bz + cx*by - cy*bx
    cw = cw*bw - cx*bx - cy*by - cz*bz
  }

  var cl = len4(cx, cy, cz, cw)
  if(cl > 1e-6) {
    cx /= cl
    cy /= cl
    cz /= cl
    cw /= cl
  } else {
    cx = cy = cz = 0.0
    cw = 1.0
  }

  this.rotation.set(t, cx, cy, cz, cw)
}

proto.lookAt = function(t, eye, center, up) {
  this.recalcMatrix(t)

  center = center || this.computedCenter
  eye    = eye    || this.computedEye
  up     = up     || this.computedUp

  var mat = this.computedMatrix
  lookAt(mat, eye, center, up)

  var rotation = this.computedRotation
  quatFromFrame(rotation,
    mat[0], mat[1], mat[2],
    mat[4], mat[5], mat[6],
    mat[8], mat[9], mat[10])
  normalize4(rotation, rotation)
  this.rotation.set(t, rotation[0], rotation[1], rotation[2], rotation[3])

  var fl = 0.0
  for(var i=0; i<3; ++i) {
    fl += Math.pow(center[i] - eye[i], 2)
  }
  this.radius.set(t, 0.5 * Math.log(Math.max(fl, 1e-6)))

  this.center.set(t, center[0], center[1], center[2])
}

proto.translate = function(t, dx, dy, dz) {
  this.center.move(t,
    dx||0.0,
    dy||0.0,
    dz||0.0)
}

proto.setMatrix = function(t, matrix) {

  var rotation = this.computedRotation
  quatFromFrame(rotation,
    matrix[0], matrix[1], matrix[2],
    matrix[4], matrix[5], matrix[6],
    matrix[8], matrix[9], matrix[10])
  normalize4(rotation, rotation)
  this.rotation.set(t, rotation[0], rotation[1], rotation[2], rotation[3])

  var mat = this.computedMatrix
  invert44(mat, matrix)
  var w = mat[15]
  if(Math.abs(w) > 1e-6) {
    var cx = mat[12]/w
    var cy = mat[13]/w
    var cz = mat[14]/w

    this.recalcMatrix(t)  
    var r = Math.exp(this.computedRadius[0])
    this.center.set(t, cx-mat[2]*r, cy-mat[6]*r, cz-mat[10]*r)
    this.radius.idle(t)
  } else {
    this.center.idle(t)
    this.radius.idle(t)
  }
}

proto.setDistance = function(t, d) {
  if(d > 0) {
    this.radius.set(t, Math.log(d))
  }
}

proto.setDistanceLimits = function(lo, hi) {
  if(lo > 0) {
    lo = Math.log(lo)
  } else {
    lo = -Infinity    
  }
  if(hi > 0) {
    hi = Math.log(hi)
  } else {
    hi = Infinity
  }
  hi = Math.max(hi, lo)
  this.radius.bounds[0][0] = lo
  this.radius.bounds[1][0] = hi
}

proto.getDistanceLimits = function(out) {
  var bounds = this.radius.bounds
  if(out) {
    out[0] = Math.exp(bounds[0][0])
    out[1] = Math.exp(bounds[1][0])
    return out
  }
  return [ Math.exp(bounds[0][0]), Math.exp(bounds[1][0]) ]
}

proto.toJSON = function() {
  this.recalcMatrix(this.lastT())
  return {
    center:   this.computedCenter.slice(),
    rotation: this.computedRotation.slice(),
    distance: Math.log(this.computedRadius[0]),
    zoomMin:  this.radius.bounds[0][0],
    zoomMax:  this.radius.bounds[1][0]
  }
}

proto.fromJSON = function(options) {
  var t = this.lastT()
  var c = options.center
  if(c) {
    this.center.set(t, c[0], c[1], c[2])
  }
  var r = options.rotation
  if(r) {
    this.rotation.set(t, r[0], r[1], r[2], r[3])
  }
  var d = options.distance
  if(d && d > 0) {
    this.radius.set(t, Math.log(d))
  }
  this.setDistanceLimits(options.zoomMin, options.zoomMax)
}

function createOrbitController(options) {
  options = options || {}
  var center   = options.center   || [0,0,0]
  var rotation = options.rotation || [0,0,0,1]
  var radius   = options.radius   || 1.0

  center = [].slice.call(center, 0, 3)
  rotation = [].slice.call(rotation, 0, 4)
  normalize4(rotation, rotation)

  var result = new OrbitCameraController(
    rotation,
    center,
    Math.log(radius))

  result.setDistanceLimits(options.zoomMin, options.zoomMax)

  if('eye' in options || 'up' in options) {
    result.lookAt(0, options.eye, options.center, options.up)
  }

  return result
}

/***/ }),

/***/ "./node_modules/plotly.js/src/lib/gl_format_color.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/gl_format_color.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
var rgba = __webpack_require__(/*! color-normalize */ "./node_modules/color-normalize/index.js");

var Colorscale = __webpack_require__(/*! ../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var colorDflt = __webpack_require__(/*! ../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js").defaultLine;
var isArrayOrTypedArray = __webpack_require__(/*! ./array */ "./node_modules/plotly.js/src/lib/array.js").isArrayOrTypedArray;

var colorDfltRgba = rgba(colorDflt);
var opacityDflt = 1;

function calculateColor(colorIn, opacityIn) {
    var colorOut = colorIn;
    colorOut[3] *= opacityIn;
    return colorOut;
}

function validateColor(colorIn) {
    if(isNumeric(colorIn)) return colorDfltRgba;

    var colorOut = rgba(colorIn);

    return colorOut.length ? colorOut : colorDfltRgba;
}

function validateOpacity(opacityIn) {
    return isNumeric(opacityIn) ? opacityIn : opacityDflt;
}

function formatColor(containerIn, opacityIn, len) {
    var colorIn = containerIn.color;
    var isArrayColorIn = isArrayOrTypedArray(colorIn);
    var isArrayOpacityIn = isArrayOrTypedArray(opacityIn);
    var cOpts = Colorscale.extractOpts(containerIn);
    var colorOut = [];

    var sclFunc, getColor, getOpacity, colori, opacityi;

    if(cOpts.colorscale !== undefined) {
        sclFunc = Colorscale.makeColorScaleFuncFromTrace(containerIn);
    } else {
        sclFunc = validateColor;
    }

    if(isArrayColorIn) {
        getColor = function(c, i) {
            // FIXME: there is double work, considering that sclFunc does the opposite
            return c[i] === undefined ? colorDfltRgba : rgba(sclFunc(c[i]));
        };
    } else getColor = validateColor;

    if(isArrayOpacityIn) {
        getOpacity = function(o, i) {
            return o[i] === undefined ? opacityDflt : validateOpacity(o[i]);
        };
    } else getOpacity = validateOpacity;

    if(isArrayColorIn || isArrayOpacityIn) {
        for(var i = 0; i < len; i++) {
            colori = getColor(colorIn, i);
            opacityi = getOpacity(opacityIn, i);
            colorOut[i] = calculateColor(colori, opacityi);
        }
    } else colorOut = calculateColor(rgba(colorIn), opacityIn);

    return colorOut;
}

function parseColorScale(cont, alpha) {
    if(alpha === undefined) alpha = 1;

    var cOpts = Colorscale.extractOpts(cont);

    var colorscale = cOpts.reversescale ?
        Colorscale.flipScale(cOpts.colorscale) :
        cOpts.colorscale;

    return colorscale.map(function(elem) {
        var index = elem[0];
        var color = tinycolor(elem[1]);
        var rgb = color.toRgb();
        return {
            index: index,
            rgb: [rgb.r, rgb.g, rgb.b, alpha]
        };
    });
}

module.exports = {
    formatColor: formatColor,
    parseColorScale: parseColorScale
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/index.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;
var fxAttrs = __webpack_require__(/*! ../../components/fx/layout_attributes */ "./node_modules/plotly.js/src/components/fx/layout_attributes.js");

var Scene = __webpack_require__(/*! ./scene */ "./node_modules/plotly.js/src/plots/gl3d/scene.js");
var getSubplotData = __webpack_require__(/*! ../get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getSubplotData;
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var xmlnsNamespaces = __webpack_require__(/*! ../../constants/xmlns_namespaces */ "./node_modules/plotly.js/src/constants/xmlns_namespaces.js");

var GL3D = 'gl3d';
var SCENE = 'scene';


exports.name = GL3D;

exports.attr = SCENE;

exports.idRoot = SCENE;

exports.idRegex = exports.attrRegex = Lib.counterRegex('scene');

exports.attributes = __webpack_require__(/*! ./layout/attributes */ "./node_modules/plotly.js/src/plots/gl3d/layout/attributes.js");

exports.layoutAttributes = __webpack_require__(/*! ./layout/layout_attributes */ "./node_modules/plotly.js/src/plots/gl3d/layout/layout_attributes.js");

exports.baseLayoutAttrOverrides = overrideAll({
    hoverlabel: fxAttrs.hoverlabel
}, 'plot', 'nested');

exports.supplyLayoutDefaults = __webpack_require__(/*! ./layout/defaults */ "./node_modules/plotly.js/src/plots/gl3d/layout/defaults.js");

exports.plot = function plot(gd) {
    var fullLayout = gd._fullLayout;
    var fullData = gd._fullData;
    var sceneIds = fullLayout._subplots[GL3D];

    for(var i = 0; i < sceneIds.length; i++) {
        var sceneId = sceneIds[i];
        var fullSceneData = getSubplotData(fullData, GL3D, sceneId);
        var sceneLayout = fullLayout[sceneId];
        var camera = sceneLayout.camera;
        var scene = sceneLayout._scene;

        if(!scene) {
            scene = new Scene({
                id: sceneId,
                graphDiv: gd,
                container: gd.querySelector('.gl-container'),
                staticPlot: gd._context.staticPlot,
                plotGlPixelRatio: gd._context.plotGlPixelRatio,
                camera: camera
            },
                fullLayout
            );

            // set ref to Scene instance
            sceneLayout._scene = scene;
        }

        // save 'initial' camera view settings for modebar button
        if(!scene.viewInitial) {
            scene.viewInitial = {
                up: {
                    x: camera.up.x,
                    y: camera.up.y,
                    z: camera.up.z
                },
                eye: {
                    x: camera.eye.x,
                    y: camera.eye.y,
                    z: camera.eye.z
                },
                center: {
                    x: camera.center.x,
                    y: camera.center.y,
                    z: camera.center.z
                }
            };
        }

        scene.plot(fullSceneData, fullLayout, gd.layout);
    }
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var oldSceneKeys = oldFullLayout._subplots[GL3D] || [];

    for(var i = 0; i < oldSceneKeys.length; i++) {
        var oldSceneKey = oldSceneKeys[i];

        if(!newFullLayout[oldSceneKey] && !!oldFullLayout[oldSceneKey]._scene) {
            oldFullLayout[oldSceneKey]._scene.destroy();

            if(oldFullLayout._infolayer) {
                oldFullLayout._infolayer
                    .selectAll('.annotation-' + oldSceneKey)
                    .remove();
            }
        }
    }
};

exports.toSVG = function(gd) {
    var fullLayout = gd._fullLayout;
    var sceneIds = fullLayout._subplots[GL3D];
    var size = fullLayout._size;

    for(var i = 0; i < sceneIds.length; i++) {
        var sceneLayout = fullLayout[sceneIds[i]];
        var domain = sceneLayout.domain;
        var scene = sceneLayout._scene;

        var imageData = scene.toImage('png');
        var image = fullLayout._glimages.append('svg:image');

        image.attr({
            xmlns: xmlnsNamespaces.svg,
            'xlink:href': imageData,
            x: size.l + size.w * domain.x[0],
            y: size.t + size.h * (1 - domain.y[1]),
            width: size.w * (domain.x[1] - domain.x[0]),
            height: size.h * (domain.y[1] - domain.y[0]),
            preserveAspectRatio: 'none'
        });

        scene.destroy();
    }
};

// clean scene ids, 'scene1' -> 'scene'
exports.cleanId = function cleanId(id) {
    if(!id.match(/^scene[0-9]*$/)) return;

    var sceneNum = id.substr(5);
    if(sceneNum === '1') sceneNum = '';

    return SCENE + sceneNum;
};

exports.updateFx = function(gd) {
    var fullLayout = gd._fullLayout;
    var subplotIds = fullLayout._subplots[GL3D];

    for(var i = 0; i < subplotIds.length; i++) {
        var subplotObj = fullLayout[subplotIds[i]]._scene;
        subplotObj.updateFx(fullLayout.dragmode, fullLayout.hovermode);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/layout/attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/layout/attributes.js ***!
  \********************************************************************/
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
    scene: {
        valType: 'subplotid',
        role: 'info',
        dflt: 'scene',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets a reference between this trace\'s 3D coordinate system and',
            'a 3D scene.',
            'If *scene* (the default value), the (x,y,z) coordinates refer to',
            '`layout.scene`.',
            'If *scene2*, the (x,y,z) coordinates refer to `layout.scene2`,',
            'and so on.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/layout/axis_attributes.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/layout/axis_attributes.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Color = __webpack_require__(/*! ../../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var axesAttrs = __webpack_require__(/*! ../../cartesian/layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");
var extendFlat = __webpack_require__(/*! ../../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

module.exports = overrideAll({
    visible: axesAttrs.visible,
    showspikes: {
        valType: 'boolean',
        role: 'info',
        dflt: true,
        description: [
            'Sets whether or not spikes starting from',
            'data points to this axis\' wall are shown on hover.'
        ].join(' ')
    },
    spikesides: {
        valType: 'boolean',
        role: 'info',
        dflt: true,
        description: [
            'Sets whether or not spikes extending from the',
            'projection data points to this axis\' wall boundaries',
            'are shown on hover.'
        ].join(' ')
    },
    spikethickness: {
        valType: 'number',
        role: 'style',
        min: 0,
        dflt: 2,
        description: 'Sets the thickness (in px) of the spikes.'
    },
    spikecolor: {
        valType: 'color',
        role: 'style',
        dflt: Color.defaultLine,
        description: 'Sets the color of the spikes.'
    },
    showbackground: {
        valType: 'boolean',
        role: 'info',
        dflt: false,
        description: [
            'Sets whether or not this axis\' wall',
            'has a background color.'
        ].join(' ')
    },
    backgroundcolor: {
        valType: 'color',
        role: 'style',
        dflt: 'rgba(204, 204, 204, 0.5)',
        description: 'Sets the background color of this axis\' wall.'
    },
    showaxeslabels: {
        valType: 'boolean',
        role: 'info',
        dflt: true,
        description: 'Sets whether or not this axis is labeled'
    },
    color: axesAttrs.color,
    categoryorder: axesAttrs.categoryorder,
    categoryarray: axesAttrs.categoryarray,
    title: {
        text: axesAttrs.title.text,
        font: axesAttrs.title.font
    },
    type: extendFlat({}, axesAttrs.type, {
        values: ['-', 'linear', 'log', 'date', 'category']
    }),
    autorange: axesAttrs.autorange,
    rangemode: axesAttrs.rangemode,
    range: extendFlat({}, axesAttrs.range, {
        items: [
            {valType: 'any', editType: 'plot', impliedEdits: {'^autorange': false}},
            {valType: 'any', editType: 'plot', impliedEdits: {'^autorange': false}}
        ],
        anim: false
    }),
    // ticks
    tickmode: axesAttrs.tickmode,
    nticks: axesAttrs.nticks,
    tick0: axesAttrs.tick0,
    dtick: axesAttrs.dtick,
    tickvals: axesAttrs.tickvals,
    ticktext: axesAttrs.ticktext,
    ticks: axesAttrs.ticks,
    mirror: axesAttrs.mirror,
    ticklen: axesAttrs.ticklen,
    tickwidth: axesAttrs.tickwidth,
    tickcolor: axesAttrs.tickcolor,
    showticklabels: axesAttrs.showticklabels,
    tickfont: axesAttrs.tickfont,
    tickangle: axesAttrs.tickangle,
    tickprefix: axesAttrs.tickprefix,
    showtickprefix: axesAttrs.showtickprefix,
    ticksuffix: axesAttrs.ticksuffix,
    showticksuffix: axesAttrs.showticksuffix,
    showexponent: axesAttrs.showexponent,
    exponentformat: axesAttrs.exponentformat,
    separatethousands: axesAttrs.separatethousands,
    tickformat: axesAttrs.tickformat,
    tickformatstops: axesAttrs.tickformatstops,
    hoverformat: axesAttrs.hoverformat,
    // lines and grids
    showline: axesAttrs.showline,
    linecolor: axesAttrs.linecolor,
    linewidth: axesAttrs.linewidth,
    showgrid: axesAttrs.showgrid,
    gridcolor: extendFlat({}, axesAttrs.gridcolor,  // shouldn't this be on-par with 2D?
        {dflt: 'rgb(204, 204, 204)'}),
    gridwidth: axesAttrs.gridwidth,
    zeroline: axesAttrs.zeroline,
    zerolinecolor: axesAttrs.zerolinecolor,
    zerolinewidth: axesAttrs.zerolinewidth,
    _deprecated: {
        title: axesAttrs._deprecated.title,
        titlefont: axesAttrs._deprecated.titlefont
    }
}, 'plot', 'from-root');


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/layout/axis_defaults.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/layout/axis_defaults.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var colorMix = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js").mix;

var Lib = __webpack_require__(/*! ../../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Template = __webpack_require__(/*! ../../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");

var layoutAttributes = __webpack_require__(/*! ./axis_attributes */ "./node_modules/plotly.js/src/plots/gl3d/layout/axis_attributes.js");
var handleTypeDefaults = __webpack_require__(/*! ../../cartesian/type_defaults */ "./node_modules/plotly.js/src/plots/cartesian/type_defaults.js");
var handleAxisDefaults = __webpack_require__(/*! ../../cartesian/axis_defaults */ "./node_modules/plotly.js/src/plots/cartesian/axis_defaults.js");

var axesNames = ['xaxis', 'yaxis', 'zaxis'];

// TODO: hard-coded lightness fraction based on gridline default colors
// that differ from other subplot types.
var gridLightness = 100 * (204 - 0x44) / (255 - 0x44);

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut, options) {
    var containerIn, containerOut;

    function coerce(attr, dflt) {
        return Lib.coerce(containerIn, containerOut, layoutAttributes, attr, dflt);
    }

    for(var j = 0; j < axesNames.length; j++) {
        var axName = axesNames[j];
        containerIn = layoutIn[axName] || {};

        containerOut = Template.newContainer(layoutOut, axName);
        containerOut._id = axName[0] + options.scene;
        containerOut._name = axName;

        handleTypeDefaults(containerIn, containerOut, coerce, options);

        handleAxisDefaults(
            containerIn,
            containerOut,
            coerce,
            {
                font: options.font,
                letter: axName[0],
                data: options.data,
                showGrid: true,
                noTickson: true,
                bgColor: options.bgColor,
                calendar: options.calendar
            },
            options.fullLayout);

        coerce('gridcolor', colorMix(containerOut.color, options.bgColor, gridLightness).toRgbString());
        coerce('title.text', axName[0]);  // shouldn't this be on-par with 2D?

        containerOut.setScale = Lib.noop;

        if(coerce('showspikes')) {
            coerce('spikesides');
            coerce('spikethickness');
            coerce('spikecolor', containerOut.color);
        }

        coerce('showaxeslabels');
        if(coerce('showbackground')) coerce('backgroundcolor');
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/layout/convert.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/layout/convert.js ***!
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



var str2RgbaArray = __webpack_require__(/*! ../../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");
var Lib = __webpack_require__(/*! ../../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var AXES_NAMES = ['xaxis', 'yaxis', 'zaxis'];

function AxesOptions() {
    this.bounds = [
        [-10, -10, -10],
        [10, 10, 10]
    ];

    this.ticks = [ [], [], [] ];
    this.tickEnable = [ true, true, true ];
    this.tickFont = [ 'sans-serif', 'sans-serif', 'sans-serif' ];
    this.tickSize = [ 12, 12, 12 ];
    this.tickAngle = [ 0, 0, 0 ];
    this.tickColor = [ [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1] ];
    this.tickPad = [ 18, 18, 18 ];

    this.labels = [ 'x', 'y', 'z' ];
    this.labelEnable = [ true, true, true ];
    this.labelFont = ['Open Sans', 'Open Sans', 'Open Sans'];
    this.labelSize = [ 20, 20, 20 ];
    this.labelColor = [ [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1] ];
    this.labelPad = [ 30, 30, 30 ];

    this.lineEnable = [ true, true, true ];
    this.lineMirror = [ false, false, false ];
    this.lineWidth = [ 1, 1, 1 ];
    this.lineColor = [ [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1] ];

    this.lineTickEnable = [ true, true, true ];
    this.lineTickMirror = [ false, false, false ];
    this.lineTickLength = [ 10, 10, 10 ];
    this.lineTickWidth = [ 1, 1, 1 ];
    this.lineTickColor = [ [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1] ];

    this.gridEnable = [ true, true, true ];
    this.gridWidth = [ 1, 1, 1 ];
    this.gridColor = [ [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1] ];

    this.zeroEnable = [ true, true, true ];
    this.zeroLineColor = [ [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1] ];
    this.zeroLineWidth = [ 2, 2, 2 ];

    this.backgroundEnable = [ true, true, true ];
    this.backgroundColor = [ [0.8, 0.8, 0.8, 0.5],
                              [0.8, 0.8, 0.8, 0.5],
                              [0.8, 0.8, 0.8, 0.5] ];

    // some default values are stored for applying model transforms
    this._defaultTickPad = this.tickPad.slice();
    this._defaultLabelPad = this.labelPad.slice();
    this._defaultLineTickLength = this.lineTickLength.slice();
}

var proto = AxesOptions.prototype;

proto.merge = function(fullLayout, sceneLayout) {
    var opts = this;
    for(var i = 0; i < 3; ++i) {
        var axes = sceneLayout[AXES_NAMES[i]];

        if(!axes.visible) {
            opts.tickEnable[i] = false;
            opts.labelEnable[i] = false;
            opts.lineEnable[i] = false;
            opts.lineTickEnable[i] = false;
            opts.gridEnable[i] = false;
            opts.zeroEnable[i] = false;
            opts.backgroundEnable[i] = false;
            continue;
        }

        // Axes labels
        opts.labels[i] = fullLayout._meta ?
            Lib.templateString(axes.title.text, fullLayout._meta) :
            axes.title.text;

        if('font' in axes.title) {
            if(axes.title.font.color) opts.labelColor[i] = str2RgbaArray(axes.title.font.color);
            if(axes.title.font.family) opts.labelFont[i] = axes.title.font.family;
            if(axes.title.font.size) opts.labelSize[i] = axes.title.font.size;
        }

        // Lines
        if('showline' in axes) opts.lineEnable[i] = axes.showline;
        if('linecolor' in axes) opts.lineColor[i] = str2RgbaArray(axes.linecolor);
        if('linewidth' in axes) opts.lineWidth[i] = axes.linewidth;

        if('showgrid' in axes) opts.gridEnable[i] = axes.showgrid;
        if('gridcolor' in axes) opts.gridColor[i] = str2RgbaArray(axes.gridcolor);
        if('gridwidth' in axes) opts.gridWidth[i] = axes.gridwidth;

        // Remove zeroline if axis type is log
        // otherwise the zeroline is incorrectly drawn at 1 on log axes
        if(axes.type === 'log') opts.zeroEnable[i] = false;
        else if('zeroline' in axes) opts.zeroEnable[i] = axes.zeroline;
        if('zerolinecolor' in axes) opts.zeroLineColor[i] = str2RgbaArray(axes.zerolinecolor);
        if('zerolinewidth' in axes) opts.zeroLineWidth[i] = axes.zerolinewidth;

        // tick lines
        if('ticks' in axes && !!axes.ticks) opts.lineTickEnable[i] = true;
        else opts.lineTickEnable[i] = false;

        if('ticklen' in axes) {
            opts.lineTickLength[i] = opts._defaultLineTickLength[i] = axes.ticklen;
        }
        if('tickcolor' in axes) opts.lineTickColor[i] = str2RgbaArray(axes.tickcolor);
        if('tickwidth' in axes) opts.lineTickWidth[i] = axes.tickwidth;
        if('tickangle' in axes) {
            opts.tickAngle[i] = (axes.tickangle === 'auto') ?
                -3600 : // i.e. special number to set auto option
                Math.PI * -axes.tickangle / 180;
        }

        // tick labels
        if('showticklabels' in axes) opts.tickEnable[i] = axes.showticklabels;
        if('tickfont' in axes) {
            if(axes.tickfont.color) opts.tickColor[i] = str2RgbaArray(axes.tickfont.color);
            if(axes.tickfont.family) opts.tickFont[i] = axes.tickfont.family;
            if(axes.tickfont.size) opts.tickSize[i] = axes.tickfont.size;
        }

        if('mirror' in axes) {
            if(['ticks', 'all', 'allticks'].indexOf(axes.mirror) !== -1) {
                opts.lineTickMirror[i] = true;
                opts.lineMirror[i] = true;
            } else if(axes.mirror === true) {
                opts.lineTickMirror[i] = false;
                opts.lineMirror[i] = true;
            } else {
                opts.lineTickMirror[i] = false;
                opts.lineMirror[i] = false;
            }
        } else opts.lineMirror[i] = false;

        // grid background
        if('showbackground' in axes && axes.showbackground !== false) {
            opts.backgroundEnable[i] = true;
            opts.backgroundColor[i] = str2RgbaArray(axes.backgroundcolor);
        } else opts.backgroundEnable[i] = false;
    }
};


function createAxesOptions(fullLayout, sceneLayout) {
    var result = new AxesOptions();
    result.merge(fullLayout, sceneLayout);
    return result;
}

module.exports = createAxesOptions;


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/layout/defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/layout/defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Color = __webpack_require__(/*! ../../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Registry = __webpack_require__(/*! ../../../registry */ "./node_modules/plotly.js/src/registry.js");

var handleSubplotDefaults = __webpack_require__(/*! ../../subplot_defaults */ "./node_modules/plotly.js/src/plots/subplot_defaults.js");
var supplyGl3dAxisLayoutDefaults = __webpack_require__(/*! ./axis_defaults */ "./node_modules/plotly.js/src/plots/gl3d/layout/axis_defaults.js");
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/gl3d/layout/layout_attributes.js");
var getSubplotData = __webpack_require__(/*! ../../get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getSubplotData;

var GL3D = 'gl3d';

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut, fullData) {
    var hasNon3D = layoutOut._basePlotModules.length > 1;

    // some layout-wide attribute are used in all scenes
    // if 3D is the only visible plot type
    function getDfltFromLayout(attr) {
        if(hasNon3D) return;

        var isValid = Lib.validate(layoutIn[attr], layoutAttributes[attr]);
        if(isValid) return layoutIn[attr];
    }

    handleSubplotDefaults(layoutIn, layoutOut, fullData, {
        type: GL3D,
        attributes: layoutAttributes,
        handleDefaults: handleGl3dDefaults,
        fullLayout: layoutOut,
        font: layoutOut.font,
        fullData: fullData,
        getDfltFromLayout: getDfltFromLayout,
        paper_bgcolor: layoutOut.paper_bgcolor,
        calendar: layoutOut.calendar
    });
};

function handleGl3dDefaults(sceneLayoutIn, sceneLayoutOut, coerce, opts) {
    /*
     * Scene numbering proceeds as follows
     * scene
     * scene2
     * scene3
     *
     * and d.scene will be undefined or some number or number string
     *
     * Also write back a blank scene object to user layout so that some
     * attributes like aspectratio can be written back dynamically.
     */

    var bgcolor = coerce('bgcolor');
    var bgColorCombined = Color.combine(bgcolor, opts.paper_bgcolor);

    var cameraKeys = ['up', 'center', 'eye'];

    for(var j = 0; j < cameraKeys.length; j++) {
        coerce('camera.' + cameraKeys[j] + '.x');
        coerce('camera.' + cameraKeys[j] + '.y');
        coerce('camera.' + cameraKeys[j] + '.z');
    }

    coerce('camera.projection.type');

    /*
     * coerce to positive number (min 0) but also do not accept 0 (>0 not >=0)
     * note that 0's go false with the !! call
     */
    var hasAspect = !!coerce('aspectratio.x') &&
                    !!coerce('aspectratio.y') &&
                    !!coerce('aspectratio.z');

    var defaultAspectMode = hasAspect ? 'manual' : 'auto';
    var aspectMode = coerce('aspectmode', defaultAspectMode);

    /*
     * We need aspectratio object in all the Layouts as it is dynamically set
     * in the calculation steps, ie, we cant set the correct data now, it happens later.
     * We must also account for the case the user sends bad ratio data with 'manual' set
     * for the mode. In this case we must force change it here as the default coerce
     * misses it above.
     */
    if(!hasAspect) {
        sceneLayoutIn.aspectratio = sceneLayoutOut.aspectratio = {x: 1, y: 1, z: 1};

        if(aspectMode === 'manual') sceneLayoutOut.aspectmode = 'auto';

        /*
         * kind of like autorange - we need the calculated aspectmode back in
         * the input layout or relayout can cause problems later
         */
        sceneLayoutIn.aspectmode = sceneLayoutOut.aspectmode;
    }

    var fullGl3dData = getSubplotData(opts.fullData, GL3D, opts.id);

    supplyGl3dAxisLayoutDefaults(sceneLayoutIn, sceneLayoutOut, {
        font: opts.font,
        scene: opts.id,
        data: fullGl3dData,
        bgColor: bgColorCombined,
        calendar: opts.calendar,
        fullLayout: opts.fullLayout
    });

    Registry.getComponentMethod('annotations3d', 'handleDefaults')(
        sceneLayoutIn, sceneLayoutOut, opts
    );

    var dragmode = opts.getDfltFromLayout('dragmode');

    if(dragmode !== false) {
        if(!dragmode) {
            dragmode = 'orbit';

            if(sceneLayoutIn.camera &&
                sceneLayoutIn.camera.up) {
                var x = sceneLayoutIn.camera.up.x;
                var y = sceneLayoutIn.camera.up.y;
                var z = sceneLayoutIn.camera.up.z;

                if(z !== 0) {
                    if(!x || !y || !z) {
                        dragmode = 'turntable';
                    } else if(z / Math.sqrt(x * x + y * y + z * z) > 0.999) {
                        dragmode = 'turntable';
                    }
                }
            } else {
                dragmode = 'turntable';
            }
        }
    }

    coerce('dragmode', dragmode);
    coerce('hovermode', opts.getDfltFromLayout('hovermode'));
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/layout/layout_attributes.js":
/*!***************************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/layout/layout_attributes.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var gl3dAxisAttrs = __webpack_require__(/*! ./axis_attributes */ "./node_modules/plotly.js/src/plots/gl3d/layout/axis_attributes.js");
var domainAttrs = __webpack_require__(/*! ../../domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var extendFlat = __webpack_require__(/*! ../../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var counterRegex = __webpack_require__(/*! ../../../lib */ "./node_modules/plotly.js/src/lib/index.js").counterRegex;

function makeCameraVector(x, y, z) {
    return {
        x: {
            valType: 'number',
            role: 'info',
            dflt: x,
            editType: 'camera'
        },
        y: {
            valType: 'number',
            role: 'info',
            dflt: y,
            editType: 'camera'
        },
        z: {
            valType: 'number',
            role: 'info',
            dflt: z,
            editType: 'camera'
        },
        editType: 'camera'
    };
}

module.exports = {
    _arrayAttrRegexps: [counterRegex('scene', '.annotations', true)],

    bgcolor: {
        valType: 'color',
        role: 'style',
        dflt: 'rgba(0,0,0,0)',
        editType: 'plot'
    },
    camera: {
        up: extendFlat(makeCameraVector(0, 0, 1), {
            description: [
                'Sets the (x,y,z) components of the \'up\' camera vector.',
                'This vector determines the up direction of this scene',
                'with respect to the page.',
                'The default is *{x: 0, y: 0, z: 1}* which means that',
                'the z axis points up.'
            ].join(' ')
        }),
        center: extendFlat(makeCameraVector(0, 0, 0), {
            description: [
                'Sets the (x,y,z) components of the \'center\' camera vector',
                'This vector determines the translation (x,y,z) space',
                'about the center of this scene.',
                'By default, there is no such translation.'
            ].join(' ')
        }),
        eye: extendFlat(makeCameraVector(1.25, 1.25, 1.25), {
            description: [
                'Sets the (x,y,z) components of the \'eye\' camera vector.',
                'This vector determines the view point about the origin',
                'of this scene.'
            ].join(' ')
        }),
        projection: {
            type: {
                valType: 'enumerated',
                role: 'info',
                values: ['perspective', 'orthographic'],
                dflt: 'perspective',
                editType: 'calc',
                description: [
                    'Sets the projection type. The projection type could be',
                    'either *perspective* or *orthographic*. The default is',
                    '*perspective*.'
                ].join(' ')
            },
            editType: 'calc'
        },
        editType: 'camera'
    },
    domain: domainAttrs({name: 'scene', editType: 'plot'}),
    aspectmode: {
        valType: 'enumerated',
        role: 'info',
        values: ['auto', 'cube', 'data', 'manual'],
        dflt: 'auto',
        editType: 'plot',
        impliedEdits: {
            'aspectratio.x': undefined,
            'aspectratio.y': undefined,
            'aspectratio.z': undefined
        },
        description: [
            'If *cube*, this scene\'s axes are drawn as a cube,',
            'regardless of the axes\' ranges.',

            'If *data*, this scene\'s axes are drawn',
            'in proportion with the axes\' ranges.',

            'If *manual*, this scene\'s axes are drawn',
            'in proportion with the input of *aspectratio*',
            '(the default behavior if *aspectratio* is provided).',

            'If *auto*, this scene\'s axes are drawn',
            'using the results of *data* except when one axis',
            'is more than four times the size of the two others,',
            'where in that case the results of *cube* are used.'
        ].join(' ')
    },
    aspectratio: { // must be positive (0's are coerced to 1)
        x: {
            valType: 'number',
            role: 'info',
            min: 0,
            editType: 'plot',
            impliedEdits: {'^aspectmode': 'manual'}
        },
        y: {
            valType: 'number',
            role: 'info',
            min: 0,
            editType: 'plot',
            impliedEdits: {'^aspectmode': 'manual'}
        },
        z: {
            valType: 'number',
            role: 'info',
            min: 0,
            editType: 'plot',
            impliedEdits: {'^aspectmode': 'manual'}
        },
        editType: 'plot',
        impliedEdits: {aspectmode: 'manual'},
        description: [
            'Sets this scene\'s axis aspectratio.'
        ].join(' ')
    },

    xaxis: gl3dAxisAttrs,
    yaxis: gl3dAxisAttrs,
    zaxis: gl3dAxisAttrs,

    dragmode: {
        valType: 'enumerated',
        role: 'info',
        values: ['orbit', 'turntable', 'zoom', 'pan', false],
        editType: 'plot',
        description: [
            'Determines the mode of drag interactions for this scene.'
        ].join(' ')
    },
    hovermode: {
        valType: 'enumerated',
        role: 'info',
        values: ['closest', false],
        dflt: 'closest',
        editType: 'modebar',
        description: [
            'Determines the mode of hover interactions for this scene.'
        ].join(' ')
    },
    uirevision: {
        valType: 'any',
        role: 'info',
        editType: 'none',
        description: [
            'Controls persistence of user-driven changes in camera attributes.',
            'Defaults to `layout.uirevision`.'
        ].join(' ')
    },
    editType: 'plot',

    _deprecated: {
        cameraposition: {
            valType: 'info_array',
            role: 'info',
            editType: 'camera',
            description: 'Obsolete. Use `camera` instead.'
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/layout/spikes.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/layout/spikes.js ***!
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




var str2RGBArray = __webpack_require__(/*! ../../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");

var AXES_NAMES = ['xaxis', 'yaxis', 'zaxis'];

function SpikeOptions() {
    this.enabled = [true, true, true];
    this.colors = [[0, 0, 0, 1],
                   [0, 0, 0, 1],
                   [0, 0, 0, 1]];
    this.drawSides = [true, true, true];
    this.lineWidth = [1, 1, 1];
}

var proto = SpikeOptions.prototype;

proto.merge = function(sceneLayout) {
    for(var i = 0; i < 3; ++i) {
        var axes = sceneLayout[AXES_NAMES[i]];

        if(!axes.visible) {
            this.enabled[i] = false;
            this.drawSides[i] = false;
            continue;
        }

        this.enabled[i] = axes.showspikes;
        this.colors[i] = str2RGBArray(axes.spikecolor);
        this.drawSides[i] = axes.spikesides;
        this.lineWidth[i] = axes.spikethickness;
    }
};

function createSpikeOptions(layout) {
    var result = new SpikeOptions();
    result.merge(layout);
    return result;
}

module.exports = createSpikeOptions;


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/layout/tick_marks.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/layout/tick_marks.js ***!
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

/* eslint block-scoped-var: 0*/
/* eslint no-redeclare: 0*/



module.exports = computeTickMarks;

var Axes = __webpack_require__(/*! ../../cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Lib = __webpack_require__(/*! ../../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var AXES_NAMES = ['xaxis', 'yaxis', 'zaxis'];

var centerPoint = [0, 0, 0];

function contourLevelsFromTicks(ticks) {
    var result = new Array(3);
    for(var i = 0; i < 3; ++i) {
        var tlevel = ticks[i];
        var clevel = new Array(tlevel.length);
        for(var j = 0; j < tlevel.length; ++j) {
            clevel[j] = tlevel[j].x;
        }
        result[i] = clevel;
    }
    return result;
}

function computeTickMarks(scene) {
    var axesOptions = scene.axesOptions;
    var glRange = scene.glplot.axesPixels;
    var sceneLayout = scene.fullSceneLayout;

    var ticks = [[], [], []];

    for(var i = 0; i < 3; ++i) {
        var axes = sceneLayout[AXES_NAMES[i]];

        axes._length = (glRange[i].hi - glRange[i].lo) *
            glRange[i].pixelsPerDataUnit / scene.dataScale[i];

        if(Math.abs(axes._length) === Infinity ||
           isNaN(axes._length)) {
            ticks[i] = [];
        } else {
            axes._input_range = axes.range.slice();
            axes.range[0] = (glRange[i].lo) / scene.dataScale[i];
            axes.range[1] = (glRange[i].hi) / scene.dataScale[i];
            axes._m = 1.0 / (scene.dataScale[i] * glRange[i].pixelsPerDataUnit);

            if(axes.range[0] === axes.range[1]) {
                axes.range[0] -= 1;
                axes.range[1] += 1;
            }
            // this is necessary to short-circuit the 'y' handling
            // in autotick part of calcTicks... Treating all axes as 'y' in this case
            // running the autoticks here, then setting
            // autoticks to false to get around the 2D handling in calcTicks.
            var tickModeCached = axes.tickmode;
            if(axes.tickmode === 'auto') {
                axes.tickmode = 'linear';
                var nticks = axes.nticks || Lib.constrain((axes._length / 40), 4, 9);
                Axes.autoTicks(axes, Math.abs(axes.range[1] - axes.range[0]) / nticks);
            }
            var dataTicks = Axes.calcTicks(axes, { msUTC: true });
            for(var j = 0; j < dataTicks.length; ++j) {
                dataTicks[j].x = dataTicks[j].x * scene.dataScale[i];

                if(axes.type === 'date') {
                    dataTicks[j].text =
                    dataTicks[j].text.replace(/\<br\>/g, ' ');
                }
            }
            ticks[i] = dataTicks;


            axes.tickmode = tickModeCached;
        }
    }

    axesOptions.ticks = ticks;

    // Calculate tick lengths dynamically
    for(var i = 0; i < 3; ++i) {
        centerPoint[i] = 0.5 * (scene.glplot.bounds[0][i] + scene.glplot.bounds[1][i]);
        for(var j = 0; j < 2; ++j) {
            axesOptions.bounds[j][i] = scene.glplot.bounds[j][i];
        }
    }

    scene.contourLevels = contourLevelsFromTicks(ticks);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/scene.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/scene.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var glPlot3d = __webpack_require__(/*! gl-plot3d */ "./node_modules/gl-plot3d/scene.js");
var createCamera = glPlot3d.createCamera;
var createPlot = glPlot3d.createScene;

var getContext = __webpack_require__(/*! webgl-context */ "./node_modules/webgl-context/index.js");
var passiveSupported = __webpack_require__(/*! has-passive-events */ "./node_modules/has-passive-events/index.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");

var str2RGBAarray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");
var showNoWebGlMsg = __webpack_require__(/*! ../../lib/show_no_webgl_msg */ "./node_modules/plotly.js/src/lib/show_no_webgl_msg.js");

var project = __webpack_require__(/*! ./project */ "./node_modules/plotly.js/src/plots/gl3d/project.js");
var createAxesOptions = __webpack_require__(/*! ./layout/convert */ "./node_modules/plotly.js/src/plots/gl3d/layout/convert.js");
var createSpikeOptions = __webpack_require__(/*! ./layout/spikes */ "./node_modules/plotly.js/src/plots/gl3d/layout/spikes.js");
var computeTickMarks = __webpack_require__(/*! ./layout/tick_marks */ "./node_modules/plotly.js/src/plots/gl3d/layout/tick_marks.js");

var isMobile = __webpack_require__(/*! is-mobile */ "./node_modules/is-mobile/index.js")({ tablet: true, featureDetect: true });


var STATIC_CANVAS, STATIC_CONTEXT;

function Scene(options, fullLayout) {
    // create sub container for plot
    var sceneContainer = document.createElement('div');
    var plotContainer = options.container;

    // keep a ref to the graph div to fire hover+click events
    this.graphDiv = options.graphDiv;

    // create SVG container for hover text
    var svgContainer = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg');
    svgContainer.style.position = 'absolute';
    svgContainer.style.top = svgContainer.style.left = '0px';
    svgContainer.style.width = svgContainer.style.height = '100%';
    svgContainer.style['z-index'] = 20;
    svgContainer.style['pointer-events'] = 'none';
    sceneContainer.appendChild(svgContainer);
    this.svgContainer = svgContainer;

    // Tag the container with the sceneID
    sceneContainer.id = options.id;
    sceneContainer.style.position = 'absolute';
    sceneContainer.style.top = sceneContainer.style.left = '0px';
    sceneContainer.style.width = sceneContainer.style.height = '100%';
    plotContainer.appendChild(sceneContainer);

    this.fullLayout = fullLayout;
    this.id = options.id || 'scene';
    this.fullSceneLayout = fullLayout[this.id];

    // Saved from last call to plot()
    this.plotArgs = [ [], {}, {} ];

    /*
     * Move this to calc step? Why does it work here?
     */
    this.axesOptions = createAxesOptions(fullLayout, fullLayout[this.id]);
    this.spikeOptions = createSpikeOptions(fullLayout[this.id]);
    this.container = sceneContainer;
    this.staticMode = !!options.staticPlot;
    this.pixelRatio = this.pixelRatio || options.plotGlPixelRatio || 2;

    // Coordinate rescaling
    this.dataScale = [1, 1, 1];

    this.contourLevels = [ [], [], [] ];

    this.convertAnnotations = Registry.getComponentMethod('annotations3d', 'convert');
    this.drawAnnotations = Registry.getComponentMethod('annotations3d', 'draw');

    this.initializeGLPlot();
}

var proto = Scene.prototype;

proto.prepareOptions = function() {
    var scene = this;

    var opts = {
        canvas: scene.canvas,
        gl: scene.gl,
        glOptions: {
            preserveDrawingBuffer: isMobile,
            premultipliedAlpha: true,
            antialias: true
        },
        container: scene.container,
        axes: scene.axesOptions,
        spikes: scene.spikeOptions,
        pickRadius: 10,
        snapToData: true,
        autoScale: true,
        autoBounds: false,
        cameraObject: scene.camera,
        pixelRatio: scene.pixelRatio
    };

    // for static plots, we reuse the WebGL context
    //  as WebKit doesn't collect them reliably
    if(scene.staticMode) {
        if(!STATIC_CONTEXT) {
            STATIC_CANVAS = document.createElement('canvas');
            STATIC_CONTEXT = getContext({
                canvas: STATIC_CANVAS,
                preserveDrawingBuffer: true,
                premultipliedAlpha: true,
                antialias: true
            });
            if(!STATIC_CONTEXT) {
                throw new Error('error creating static canvas/context for image server');
            }
        }

        opts.gl = STATIC_CONTEXT;
        opts.canvas = STATIC_CANVAS;
    }

    return opts;
};

proto.tryCreatePlot = function() {
    var scene = this;

    var opts = scene.prepareOptions();

    var success = true;

    try {
        scene.glplot = createPlot(opts);
    } catch(e) {
        if(scene.staticMode) {
            success = false;
        } else { // try second time
            try {
                // invert preserveDrawingBuffer setup which could be resulted from is-mobile not detecting the right device
                Lib.warn([
                    'webgl setup failed possibly due to',
                    isMobile ? 'disabling' : 'enabling',
                    'preserveDrawingBuffer config.',
                    'The device may not be supported by is-mobile module!',
                    'Inverting preserveDrawingBuffer option in second attempt to create webgl scene.'
                ].join(' '));
                isMobile = opts.glOptions.preserveDrawingBuffer = !opts.glOptions.preserveDrawingBuffer;

                scene.glplot = createPlot(opts);
            } catch(e) {
                success = false;
            }
        }
    }

    return success;
};

proto.initializeGLCamera = function() {
    var scene = this;
    var cameraData = scene.fullSceneLayout.camera;
    var isOrtho = (cameraData.projection.type === 'orthographic');

    scene.camera = createCamera(scene.container, {
        center: [cameraData.center.x, cameraData.center.y, cameraData.center.z],
        eye: [cameraData.eye.x, cameraData.eye.y, cameraData.eye.z],
        up: [cameraData.up.x, cameraData.up.y, cameraData.up.z],
        _ortho: isOrtho,
        zoomMin: 0.01,
        zoomMax: 100,
        mode: 'orbit'
    });
};

proto.initializeGLPlot = function() {
    var scene = this;

    scene.initializeGLCamera();

    var success = scene.tryCreatePlot();
    /*
    * createPlot will throw when webgl is not enabled in the client.
    * Lets return an instance of the module with all functions noop'd.
    * The destroy method - which will remove the container from the DOM
    * is overridden with a function that removes the container only.
    */
    if(!success) return showNoWebGlMsg(scene);

    // List of scene objects
    scene.traces = {};

    scene.make4thDimension();

    var gd = scene.graphDiv;
    var layout = gd.layout;

    var makeUpdate = function() {
        var update = {};

        if(scene.isCameraChanged(layout)) {
            // camera updates
            update[scene.id + '.camera'] = scene.getCamera();
        }

        if(scene.isAspectChanged(layout)) {
            // scene updates
            update[scene.id + '.aspectratio'] = scene.glplot.getAspectratio();

            if(layout[scene.id].aspectmode !== 'manual') {
                scene.fullSceneLayout.aspectmode =
                layout[scene.id].aspectmode =
                update[scene.id + '.aspectmode'] = 'manual';
            }
        }

        return update;
    };

    var relayoutCallback = function(scene) {
        if(scene.fullSceneLayout.dragmode === false) return;

        var update = makeUpdate();
        scene.saveLayout(layout);
        scene.graphDiv.emit('plotly_relayout', update);
    };

    scene.glplot.canvas.addEventListener('mouseup', function() {
        relayoutCallback(scene);
    });

    scene.glplot.canvas.addEventListener('wheel', function(e) {
        if(gd._context._scrollZoom.gl3d) {
            if(scene.camera._ortho) {
                var s = (e.deltaX > e.deltaY) ? 1.1 : 1.0 / 1.1;
                var o = scene.glplot.getAspectratio();
                scene.glplot.setAspectratio({
                    x: s * o.x,
                    y: s * o.y,
                    z: s * o.z
                });
            }

            relayoutCallback(scene);
        }
    }, passiveSupported ? {passive: false} : false);

    scene.glplot.canvas.addEventListener('mousemove', function() {
        if(scene.fullSceneLayout.dragmode === false) return;
        if(scene.camera.mouseListener.buttons === 0) return;

        var update = makeUpdate();
        scene.graphDiv.emit('plotly_relayouting', update);
    });

    if(!scene.staticMode) {
        scene.glplot.canvas.addEventListener('webglcontextlost', function(event) {
            if(gd && gd.emit) {
                gd.emit('plotly_webglcontextlost', {
                    event: event,
                    layer: scene.id
                });
            }
        }, false);
    }

    scene.glplot.oncontextloss = function() {
        scene.recoverContext();
    };

    scene.glplot.onrender = function() {
        scene.render();
    };

    return true;
};

proto.render = function() {
    var scene = this;
    var gd = scene.graphDiv;
    var trace;

    // update size of svg container
    var svgContainer = scene.svgContainer;
    var clientRect = scene.container.getBoundingClientRect();
    var width = clientRect.width;
    var height = clientRect.height;
    svgContainer.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
    svgContainer.setAttributeNS(null, 'width', width);
    svgContainer.setAttributeNS(null, 'height', height);

    computeTickMarks(scene);
    scene.glplot.axes.update(scene.axesOptions);

    // check if pick has changed
    var keys = Object.keys(scene.traces);
    var lastPicked = null;
    var selection = scene.glplot.selection;
    for(var i = 0; i < keys.length; ++i) {
        trace = scene.traces[keys[i]];
        if(trace.data.hoverinfo !== 'skip' && trace.handlePick(selection)) {
            lastPicked = trace;
        }

        if(trace.setContourLevels) trace.setContourLevels();
    }

    function formatter(axisName, val) {
        var axis = scene.fullSceneLayout[axisName];

        return Axes.tickText(axis, axis.d2l(val), 'hover').text;
    }

    var oldEventData;

    if(lastPicked !== null) {
        var pdata = project(scene.glplot.cameraParams, selection.dataCoordinate);
        trace = lastPicked.data;
        var traceNow = gd._fullData[trace.index];
        var ptNumber = selection.index;

        var labels = {
            xLabel: formatter('xaxis', selection.traceCoordinate[0]),
            yLabel: formatter('yaxis', selection.traceCoordinate[1]),
            zLabel: formatter('zaxis', selection.traceCoordinate[2])
        };

        var hoverinfo = Fx.castHoverinfo(traceNow, scene.fullLayout, ptNumber);
        var hoverinfoParts = (hoverinfo || '').split('+');
        var isHoverinfoAll = hoverinfo && hoverinfo === 'all';

        if(!traceNow.hovertemplate && !isHoverinfoAll) {
            if(hoverinfoParts.indexOf('x') === -1) labels.xLabel = undefined;
            if(hoverinfoParts.indexOf('y') === -1) labels.yLabel = undefined;
            if(hoverinfoParts.indexOf('z') === -1) labels.zLabel = undefined;
            if(hoverinfoParts.indexOf('text') === -1) selection.textLabel = undefined;
            if(hoverinfoParts.indexOf('name') === -1) lastPicked.name = undefined;
        }

        var tx;
        var vectorTx = [];

        if(trace.type === 'cone' || trace.type === 'streamtube') {
            labels.uLabel = formatter('xaxis', selection.traceCoordinate[3]);
            if(isHoverinfoAll || hoverinfoParts.indexOf('u') !== -1) {
                vectorTx.push('u: ' + labels.uLabel);
            }

            labels.vLabel = formatter('yaxis', selection.traceCoordinate[4]);
            if(isHoverinfoAll || hoverinfoParts.indexOf('v') !== -1) {
                vectorTx.push('v: ' + labels.vLabel);
            }

            labels.wLabel = formatter('zaxis', selection.traceCoordinate[5]);
            if(isHoverinfoAll || hoverinfoParts.indexOf('w') !== -1) {
                vectorTx.push('w: ' + labels.wLabel);
            }

            labels.normLabel = selection.traceCoordinate[6].toPrecision(3);
            if(isHoverinfoAll || hoverinfoParts.indexOf('norm') !== -1) {
                vectorTx.push('norm: ' + labels.normLabel);
            }
            if(trace.type === 'streamtube') {
                labels.divergenceLabel = selection.traceCoordinate[7].toPrecision(3);
                if(isHoverinfoAll || hoverinfoParts.indexOf('divergence') !== -1) {
                    vectorTx.push('divergence: ' + labels.divergenceLabel);
                }
            }
            if(selection.textLabel) {
                vectorTx.push(selection.textLabel);
            }
            tx = vectorTx.join('<br>');
        } else if(trace.type === 'isosurface' || trace.type === 'volume') {
            labels.valueLabel = Axes.tickText(scene._mockAxis, scene._mockAxis.d2l(selection.traceCoordinate[3]), 'hover').text;
            vectorTx.push('value: ' + labels.valueLabel);
            if(selection.textLabel) {
                vectorTx.push(selection.textLabel);
            }
            tx = vectorTx.join('<br>');
        } else {
            tx = selection.textLabel;
        }

        var pointData = {
            x: selection.traceCoordinate[0],
            y: selection.traceCoordinate[1],
            z: selection.traceCoordinate[2],
            data: traceNow._input,
            fullData: traceNow,
            curveNumber: traceNow.index,
            pointNumber: ptNumber
        };

        Fx.appendArrayPointValue(pointData, traceNow, ptNumber);

        if(trace._module.eventData) {
            pointData = traceNow._module.eventData(pointData, selection, traceNow, {}, ptNumber);
        }

        var eventData = {points: [pointData]};

        if(scene.fullSceneLayout.hovermode) {
            Fx.loneHover({
                trace: traceNow,
                x: (0.5 + 0.5 * pdata[0] / pdata[3]) * width,
                y: (0.5 - 0.5 * pdata[1] / pdata[3]) * height,
                xLabel: labels.xLabel,
                yLabel: labels.yLabel,
                zLabel: labels.zLabel,
                text: tx,
                name: lastPicked.name,
                color: Fx.castHoverOption(traceNow, ptNumber, 'bgcolor') || lastPicked.color,
                borderColor: Fx.castHoverOption(traceNow, ptNumber, 'bordercolor'),
                fontFamily: Fx.castHoverOption(traceNow, ptNumber, 'font.family'),
                fontSize: Fx.castHoverOption(traceNow, ptNumber, 'font.size'),
                fontColor: Fx.castHoverOption(traceNow, ptNumber, 'font.color'),
                nameLength: Fx.castHoverOption(traceNow, ptNumber, 'namelength'),
                textAlign: Fx.castHoverOption(traceNow, ptNumber, 'align'),
                hovertemplate: Lib.castOption(traceNow, ptNumber, 'hovertemplate'),
                hovertemplateLabels: Lib.extendFlat({}, pointData, labels),
                eventData: [pointData]
            }, {
                container: svgContainer,
                gd: gd
            });
        }

        if(selection.buttons && selection.distance < 5) {
            gd.emit('plotly_click', eventData);
        } else {
            gd.emit('plotly_hover', eventData);
        }

        oldEventData = eventData;
    } else {
        Fx.loneUnhover(svgContainer);
        gd.emit('plotly_unhover', oldEventData);
    }

    scene.drawAnnotations(scene);
};

proto.recoverContext = function() {
    var scene = this;

    scene.glplot.dispose();

    var tryRecover = function() {
        if(scene.glplot.gl.isContextLost()) {
            requestAnimationFrame(tryRecover);
            return;
        }
        if(!scene.initializeGLPlot()) {
            Lib.error('Catastrophic and unrecoverable WebGL error. Context lost.');
            return;
        }
        scene.plot.apply(scene, scene.plotArgs);
    };

    requestAnimationFrame(tryRecover);
};

var axisProperties = [ 'xaxis', 'yaxis', 'zaxis' ];

function computeTraceBounds(scene, trace, bounds) {
    var fullSceneLayout = scene.fullSceneLayout;

    for(var d = 0; d < 3; d++) {
        var axisName = axisProperties[d];
        var axLetter = axisName.charAt(0);
        var ax = fullSceneLayout[axisName];
        var coords = trace[axLetter];
        var calendar = trace[axLetter + 'calendar'];
        var len = trace['_' + axLetter + 'length'];

        if(!Lib.isArrayOrTypedArray(coords)) {
            bounds[0][d] = Math.min(bounds[0][d], 0);
            bounds[1][d] = Math.max(bounds[1][d], len - 1);
        } else {
            var v;

            for(var i = 0; i < (len || coords.length); i++) {
                if(Lib.isArrayOrTypedArray(coords[i])) {
                    for(var j = 0; j < coords[i].length; ++j) {
                        v = ax.d2l(coords[i][j], 0, calendar);
                        if(!isNaN(v) && isFinite(v)) {
                            bounds[0][d] = Math.min(bounds[0][d], v);
                            bounds[1][d] = Math.max(bounds[1][d], v);
                        }
                    }
                } else {
                    v = ax.d2l(coords[i], 0, calendar);
                    if(!isNaN(v) && isFinite(v)) {
                        bounds[0][d] = Math.min(bounds[0][d], v);
                        bounds[1][d] = Math.max(bounds[1][d], v);
                    }
                }
            }
        }
    }
}

function computeAnnotationBounds(scene, bounds) {
    var fullSceneLayout = scene.fullSceneLayout;
    var annotations = fullSceneLayout.annotations || [];

    for(var d = 0; d < 3; d++) {
        var axisName = axisProperties[d];
        var axLetter = axisName.charAt(0);
        var ax = fullSceneLayout[axisName];

        for(var j = 0; j < annotations.length; j++) {
            var ann = annotations[j];

            if(ann.visible) {
                var pos = ax.r2l(ann[axLetter]);
                if(!isNaN(pos) && isFinite(pos)) {
                    bounds[0][d] = Math.min(bounds[0][d], pos);
                    bounds[1][d] = Math.max(bounds[1][d], pos);
                }
            }
        }
    }
}

proto.plot = function(sceneData, fullLayout, layout) {
    var scene = this;

    // Save parameters
    scene.plotArgs = [sceneData, fullLayout, layout];

    if(scene.glplot.contextLost) return;

    var data, trace;
    var i, j, axis, axisType;
    var fullSceneLayout = fullLayout[scene.id];
    var sceneLayout = layout[scene.id];

    // Update layout
    scene.fullLayout = fullLayout;
    scene.fullSceneLayout = fullSceneLayout;

    scene.axesOptions.merge(fullLayout, fullSceneLayout);
    scene.spikeOptions.merge(fullSceneLayout);

    // Update camera and camera mode
    scene.setViewport(fullSceneLayout);
    scene.updateFx(fullSceneLayout.dragmode, fullSceneLayout.hovermode);
    scene.camera.enableWheel = scene.graphDiv._context._scrollZoom.gl3d;

    // Update scene background
    scene.glplot.setClearColor(str2RGBAarray(fullSceneLayout.bgcolor));

    // Update axes functions BEFORE updating traces
    scene.setConvert(axis);

    // Convert scene data
    if(!sceneData) sceneData = [];
    else if(!Array.isArray(sceneData)) sceneData = [sceneData];

    // Compute trace bounding box
    var dataBounds = [
        [Infinity, Infinity, Infinity],
        [-Infinity, -Infinity, -Infinity]
    ];

    for(i = 0; i < sceneData.length; ++i) {
        data = sceneData[i];
        if(data.visible !== true || data._length === 0) continue;

        computeTraceBounds(this, data, dataBounds);
    }
    computeAnnotationBounds(this, dataBounds);

    var dataScale = [1, 1, 1];
    for(j = 0; j < 3; ++j) {
        if(dataBounds[1][j] === dataBounds[0][j]) {
            dataScale[j] = 1.0;
        } else {
            dataScale[j] = 1.0 / (dataBounds[1][j] - dataBounds[0][j]);
        }
    }

    // Save scale
    scene.dataScale = dataScale;

    // after computeTraceBounds where ax._categories are filled in
    scene.convertAnnotations(this);

    // Update traces
    for(i = 0; i < sceneData.length; ++i) {
        data = sceneData[i];
        if(data.visible !== true || data._length === 0) {
            continue;
        }
        trace = scene.traces[data.uid];
        if(trace) {
            if(trace.data.type === data.type) {
                trace.update(data);
            } else {
                trace.dispose();
                trace = data._module.plot(this, data);
                scene.traces[data.uid] = trace;
            }
        } else {
            trace = data._module.plot(this, data);
            scene.traces[data.uid] = trace;
        }
        trace.name = data.name;
    }

    // Remove empty traces
    var traceIds = Object.keys(scene.traces);

    traceIdLoop:
    for(i = 0; i < traceIds.length; ++i) {
        for(j = 0; j < sceneData.length; ++j) {
            if(sceneData[j].uid === traceIds[i] &&
                (sceneData[j].visible === true && sceneData[j]._length !== 0)) {
                continue traceIdLoop;
            }
        }
        trace = scene.traces[traceIds[i]];
        trace.dispose();
        delete scene.traces[traceIds[i]];
    }

    // order object per trace index
    scene.glplot.objects.sort(function(a, b) {
        return a._trace.data.index - b._trace.data.index;
    });

    // Update ranges (needs to be called *after* objects are added due to updates)
    var sceneBounds = [[0, 0, 0], [0, 0, 0]];
    var axisDataRange = [];
    var axisTypeRatios = {};

    for(i = 0; i < 3; ++i) {
        axis = fullSceneLayout[axisProperties[i]];
        axisType = axis.type;

        if(axisType in axisTypeRatios) {
            axisTypeRatios[axisType].acc *= dataScale[i];
            axisTypeRatios[axisType].count += 1;
        } else {
            axisTypeRatios[axisType] = {
                acc: dataScale[i],
                count: 1
            };
        }

        if(axis.autorange) {
            sceneBounds[0][i] = Infinity;
            sceneBounds[1][i] = -Infinity;

            var objects = scene.glplot.objects;
            var annotations = scene.fullSceneLayout.annotations || [];
            var axLetter = axis._name.charAt(0);

            for(j = 0; j < objects.length; j++) {
                var obj = objects[j];
                var objBounds = obj.bounds;
                var pad = obj._trace.data._pad || 0;

                if(obj.constructor.name === 'ErrorBars' && axis._lowerLogErrorBound) {
                    sceneBounds[0][i] = Math.min(sceneBounds[0][i], axis._lowerLogErrorBound);
                } else {
                    sceneBounds[0][i] = Math.min(sceneBounds[0][i], objBounds[0][i] / dataScale[i] - pad);
                }
                sceneBounds[1][i] = Math.max(sceneBounds[1][i], objBounds[1][i] / dataScale[i] + pad);
            }

            for(j = 0; j < annotations.length; j++) {
                var ann = annotations[j];

                // N.B. not taking into consideration the arrowhead
                if(ann.visible) {
                    var pos = axis.r2l(ann[axLetter]);
                    sceneBounds[0][i] = Math.min(sceneBounds[0][i], pos);
                    sceneBounds[1][i] = Math.max(sceneBounds[1][i], pos);
                }
            }

            if('rangemode' in axis && axis.rangemode === 'tozero') {
                sceneBounds[0][i] = Math.min(sceneBounds[0][i], 0);
                sceneBounds[1][i] = Math.max(sceneBounds[1][i], 0);
            }
            if(sceneBounds[0][i] > sceneBounds[1][i]) {
                sceneBounds[0][i] = -1;
                sceneBounds[1][i] = 1;
            } else {
                var d = sceneBounds[1][i] - sceneBounds[0][i];
                sceneBounds[0][i] -= d / 32.0;
                sceneBounds[1][i] += d / 32.0;
            }

            if(axis.autorange === 'reversed') {
                // swap bounds:
                var tmp = sceneBounds[0][i];
                sceneBounds[0][i] = sceneBounds[1][i];
                sceneBounds[1][i] = tmp;
            }
        } else {
            var range = axis.range;
            sceneBounds[0][i] = axis.r2l(range[0]);
            sceneBounds[1][i] = axis.r2l(range[1]);
        }
        if(sceneBounds[0][i] === sceneBounds[1][i]) {
            sceneBounds[0][i] -= 1;
            sceneBounds[1][i] += 1;
        }
        axisDataRange[i] = sceneBounds[1][i] - sceneBounds[0][i];

        // Update plot bounds
        scene.glplot.setBounds(i, {
            min: sceneBounds[0][i] * dataScale[i],
            max: sceneBounds[1][i] * dataScale[i]
        });
    }

    /*
     * Dynamically set the aspect ratio depending on the users aspect settings
     */
    var aspectRatio;
    var aspectmode = fullSceneLayout.aspectmode;
    if(aspectmode === 'cube') {
        aspectRatio = [1, 1, 1];
    } else if(aspectmode === 'manual') {
        var userRatio = fullSceneLayout.aspectratio;
        aspectRatio = [userRatio.x, userRatio.y, userRatio.z];
    } else if(aspectmode === 'auto' || aspectmode === 'data') {
        var axesScaleRatio = [1, 1, 1];
        // Compute axis scale per category
        for(i = 0; i < 3; ++i) {
            axis = fullSceneLayout[axisProperties[i]];
            axisType = axis.type;
            var axisRatio = axisTypeRatios[axisType];
            axesScaleRatio[i] = Math.pow(axisRatio.acc, 1.0 / axisRatio.count) / dataScale[i];
        }

        if(aspectmode === 'data') {
            aspectRatio = axesScaleRatio;
        } else { // i.e. 'auto' option
            if(
                Math.max.apply(null, axesScaleRatio) /
                Math.min.apply(null, axesScaleRatio) <= 4
            ) {
                // USE DATA MODE WHEN AXIS RANGE DIMENSIONS ARE RELATIVELY EQUAL
                aspectRatio = axesScaleRatio;
            } else {
                // USE EQUAL MODE WHEN AXIS RANGE DIMENSIONS ARE HIGHLY UNEQUAL
                aspectRatio = [1, 1, 1];
            }
        }
    } else {
        throw new Error('scene.js aspectRatio was not one of the enumerated types');
    }

    /*
     * Write aspect Ratio back to user data and fullLayout so that it is modifies as user
     * manipulates the aspectmode settings and the fullLayout is up-to-date.
     */
    fullSceneLayout.aspectratio.x = sceneLayout.aspectratio.x = aspectRatio[0];
    fullSceneLayout.aspectratio.y = sceneLayout.aspectratio.y = aspectRatio[1];
    fullSceneLayout.aspectratio.z = sceneLayout.aspectratio.z = aspectRatio[2];

    /*
     * Finally assign the computed aspecratio to the glplot module. This will have an effect
     * on the next render cycle.
     */
    scene.glplot.setAspectratio(fullSceneLayout.aspectratio);

    // save 'initial' aspectratio & aspectmode view settings for modebar buttons
    if(!scene.viewInitial.aspectratio) {
        scene.viewInitial.aspectratio = {
            x: fullSceneLayout.aspectratio.x,
            y: fullSceneLayout.aspectratio.y,
            z: fullSceneLayout.aspectratio.z
        };
    }
    if(!scene.viewInitial.aspectmode) {
        scene.viewInitial.aspectmode = fullSceneLayout.aspectmode;
    }

    // Update frame position for multi plots
    var domain = fullSceneLayout.domain || null;
    var size = fullLayout._size || null;

    if(domain && size) {
        var containerStyle = scene.container.style;
        containerStyle.position = 'absolute';
        containerStyle.left = (size.l + domain.x[0] * size.w) + 'px';
        containerStyle.top = (size.t + (1 - domain.y[1]) * size.h) + 'px';
        containerStyle.width = (size.w * (domain.x[1] - domain.x[0])) + 'px';
        containerStyle.height = (size.h * (domain.y[1] - domain.y[0])) + 'px';
    }

    // force redraw so that promise is returned when rendering is completed
    scene.glplot.redraw();
};

proto.destroy = function() {
    var scene = this;

    if(!scene.glplot) return;
    scene.camera.mouseListener.enabled = false;
    scene.container.removeEventListener('wheel', scene.camera.wheelListener);
    scene.camera = null;
    scene.glplot.dispose();
    scene.container.parentNode.removeChild(scene.container);
    scene.glplot = null;
};

// getCameraArrays :: plotly_coords -> gl-plot3d_coords
// inverse of getLayoutCamera
function getCameraArrays(camera) {
    return [
        [camera.eye.x, camera.eye.y, camera.eye.z],
        [camera.center.x, camera.center.y, camera.center.z],
        [camera.up.x, camera.up.y, camera.up.z]
    ];
}

// getLayoutCamera :: gl-plot3d_coords -> plotly_coords
// inverse of getCameraArrays
function getLayoutCamera(camera) {
    return {
        up: {x: camera.up[0], y: camera.up[1], z: camera.up[2]},
        center: {x: camera.center[0], y: camera.center[1], z: camera.center[2]},
        eye: {x: camera.eye[0], y: camera.eye[1], z: camera.eye[2]},
        projection: {type: (camera._ortho === true) ? 'orthographic' : 'perspective'}
    };
}

// get camera position in plotly coords from 'gl-plot3d' coords
proto.getCamera = function() {
    var scene = this;
    scene.camera.view.recalcMatrix(scene.camera.view.lastT());
    return getLayoutCamera(scene.camera);
};

// set gl-plot3d camera position and scene aspects with a set of plotly coords
proto.setViewport = function(sceneLayout) {
    var scene = this;
    var cameraData = sceneLayout.camera;

    scene.camera.lookAt.apply(this, getCameraArrays(cameraData));
    scene.glplot.setAspectratio(sceneLayout.aspectratio);

    var newOrtho = (cameraData.projection.type === 'orthographic');
    var oldOrtho = scene.camera._ortho;

    if(newOrtho !== oldOrtho) {
        scene.glplot.redraw(); // TODO: figure out why we need to redraw here?
        scene.glplot.clearRGBA();
        scene.glplot.dispose();
        scene.initializeGLPlot();
    }
};

proto.isCameraChanged = function(layout) {
    var scene = this;
    var cameraData = scene.getCamera();
    var cameraNestedProp = Lib.nestedProperty(layout, scene.id + '.camera');
    var cameraDataLastSave = cameraNestedProp.get();

    function same(x, y, i, j) {
        var vectors = ['up', 'center', 'eye'];
        var components = ['x', 'y', 'z'];
        return y[vectors[i]] && (x[vectors[i]][components[j]] === y[vectors[i]][components[j]]);
    }

    var changed = false;
    if(cameraDataLastSave === undefined) {
        changed = true;
    } else {
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                if(!same(cameraData, cameraDataLastSave, i, j)) {
                    changed = true;
                    break;
                }
            }
        }

        if(!cameraDataLastSave.projection || (
            cameraData.projection &&
            cameraData.projection.type !== cameraDataLastSave.projection.type)) {
            changed = true;
        }
    }

    return changed;
};

proto.isAspectChanged = function(layout) {
    var scene = this;
    var aspectData = scene.glplot.getAspectratio();
    var aspectNestedProp = Lib.nestedProperty(layout, scene.id + '.aspectratio');
    var aspectDataLastSave = aspectNestedProp.get();

    return (
        aspectDataLastSave === undefined || (
        aspectDataLastSave.x !== aspectData.x ||
        aspectDataLastSave.y !== aspectData.y ||
        aspectDataLastSave.z !== aspectData.z
    ));
};

// save camera to user layout (i.e. gd.layout)
proto.saveLayout = function(layout) {
    var scene = this;
    var fullLayout = scene.fullLayout;

    var cameraData;
    var cameraNestedProp;
    var cameraDataLastSave;

    var aspectData;
    var aspectNestedProp;
    var aspectDataLastSave;

    var cameraChanged = scene.isCameraChanged(layout);
    var aspectChanged = scene.isAspectChanged(layout);

    var hasChanged = cameraChanged || aspectChanged;
    if(hasChanged) {
        var preGUI = {};
        if(cameraChanged) {
            cameraData = scene.getCamera();
            cameraNestedProp = Lib.nestedProperty(layout, scene.id + '.camera');
            cameraDataLastSave = cameraNestedProp.get();

            preGUI[scene.id + '.camera'] = cameraDataLastSave;
        }
        if(aspectChanged) {
            aspectData = scene.glplot.getAspectratio();
            aspectNestedProp = Lib.nestedProperty(layout, scene.id + '.aspectratio');
            aspectDataLastSave = aspectNestedProp.get();

            preGUI[scene.id + '.aspectratio'] = aspectDataLastSave;
        }
        Registry.call('_storeDirectGUIEdit', layout, fullLayout._preGUI, preGUI);

        if(cameraChanged) {
            cameraNestedProp.set(cameraData);

            var cameraFullNP = Lib.nestedProperty(fullLayout, scene.id + '.camera');
            cameraFullNP.set(cameraData);
        }

        if(aspectChanged) {
            aspectNestedProp.set(aspectData);

            var aspectFullNP = Lib.nestedProperty(fullLayout, scene.id + '.aspectratio');
            aspectFullNP.set(aspectData);

            scene.glplot.redraw();
        }
    }

    return hasChanged;
};

proto.updateFx = function(dragmode, hovermode) {
    var scene = this;
    var camera = scene.camera;
    if(camera) {
        // rotate and orbital are synonymous
        if(dragmode === 'orbit') {
            camera.mode = 'orbit';
            camera.keyBindingMode = 'rotate';
        } else if(dragmode === 'turntable') {
            camera.up = [0, 0, 1];
            camera.mode = 'turntable';
            camera.keyBindingMode = 'rotate';

            // The setter for camera.mode animates the transition to z-up,
            // but only if we *don't* explicitly set z-up earlier via the
            // relayout. So push `up` back to layout & fullLayout manually now.
            var gd = scene.graphDiv;
            var fullLayout = gd._fullLayout;
            var fullCamera = scene.fullSceneLayout.camera;
            var x = fullCamera.up.x;
            var y = fullCamera.up.y;
            var z = fullCamera.up.z;
            // only push `up` back to (full)layout if it's going to change
            if(z / Math.sqrt(x * x + y * y + z * z) < 0.999) {
                var attr = scene.id + '.camera.up';
                var zUp = {x: 0, y: 0, z: 1};
                var edits = {};
                edits[attr] = zUp;
                var layout = gd.layout;
                Registry.call('_storeDirectGUIEdit', layout, fullLayout._preGUI, edits);
                fullCamera.up = zUp;
                Lib.nestedProperty(layout, attr).set(zUp);
            }
        } else {
            // none rotation modes [pan or zoom]
            camera.keyBindingMode = dragmode;
        }
    }

    // to put dragmode and hovermode on the same grounds from relayout
    scene.fullSceneLayout.hovermode = hovermode;
};

function flipPixels(pixels, w, h) {
    for(var i = 0, q = h - 1; i < q; ++i, --q) {
        for(var j = 0; j < w; ++j) {
            for(var k = 0; k < 4; ++k) {
                var a = 4 * (w * i + j) + k;
                var b = 4 * (w * q + j) + k;
                var tmp = pixels[a];
                pixels[a] = pixels[b];
                pixels[b] = tmp;
            }
        }
    }
}

function correctRGB(pixels, w, h) {
    for(var i = 0; i < h; ++i) {
        for(var j = 0; j < w; ++j) {
            var k = 4 * (w * i + j);

            var a = pixels[k + 3]; // alpha
            if(a > 0) {
                var q = 255 / a;

                for(var l = 0; l < 3; ++l) { // RGB
                    pixels[k + l] = Math.min(q * pixels[k + l], 255);
                }
            }
        }
    }
}

proto.toImage = function(format) {
    var scene = this;

    if(!format) format = 'png';
    if(scene.staticMode) scene.container.appendChild(STATIC_CANVAS);

    // Force redraw
    scene.glplot.redraw();

    // Grab context and yank out pixels
    var gl = scene.glplot.gl;
    var w = gl.drawingBufferWidth;
    var h = gl.drawingBufferHeight;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    var pixels = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    flipPixels(pixels, w, h);
    correctRGB(pixels, w, h);

    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var context = canvas.getContext('2d');
    var imageData = context.createImageData(w, h);
    imageData.data.set(pixels);
    context.putImageData(imageData, 0, 0);

    var dataURL;

    switch(format) {
        case 'jpeg':
            dataURL = canvas.toDataURL('image/jpeg');
            break;
        case 'webp':
            dataURL = canvas.toDataURL('image/webp');
            break;
        default:
            dataURL = canvas.toDataURL('image/png');
    }

    if(scene.staticMode) scene.container.removeChild(STATIC_CANVAS);

    return dataURL;
};

proto.setConvert = function() {
    var scene = this;
    for(var i = 0; i < 3; i++) {
        var ax = scene.fullSceneLayout[axisProperties[i]];
        Axes.setConvert(ax, scene.fullLayout);
        ax.setScale = Lib.noop;
    }
};

proto.make4thDimension = function() {
    var scene = this;
    var gd = scene.graphDiv;
    var fullLayout = gd._fullLayout;

    // mock axis for hover formatting
    scene._mockAxis = {
        type: 'linear',
        showexponent: 'all',
        exponentformat: 'B'
    };
    Axes.setConvert(scene._mockAxis, fullLayout);
};

module.exports = Scene;


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/subplot_defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/subplot_defaults.js ***!
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




var Lib = __webpack_require__(/*! ../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Template = __webpack_require__(/*! ../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");
var handleDomainDefaults = __webpack_require__(/*! ./domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;


/**
 * Find and supply defaults to all subplots of a given type
 * This handles subplots that are contained within one container - so
 * gl3d, geo, ternary... but not 2d axes which have separate x and y axes
 * finds subplots, coerces their `domain` attributes, then calls the
 * given handleDefaults function to fill in everything else.
 *
 * layoutIn: the complete user-supplied input layout
 * layoutOut: the complete finished layout
 * fullData: the finished data array, used only to find subplots
 * opts: {
 *  type: subplot type string
 *  attributes: subplot attributes object
 *  partition: 'x' or 'y', which direction to divide domain space by default
 *      (default 'x', ie side-by-side subplots)
 *      TODO: this option is only here because 3D and geo made opposite
 *      choices in this regard previously and I didn't want to change it.
 *      Instead we should do:
 *      - something consistent
 *      - something more square (4 cuts 2x2, 5/6 cuts 2x3, etc.)
 *      - something that includes all subplot types in one arrangement,
 *        now that we can have them together!
 *  handleDefaults: function of (subplotLayoutIn, subplotLayoutOut, coerce, opts)
 *      this opts object is passed through to handleDefaults, so attach any
 *      additional items needed by this function here as well
 * }
 */
module.exports = function handleSubplotDefaults(layoutIn, layoutOut, fullData, opts) {
    var subplotType = opts.type;
    var subplotAttributes = opts.attributes;
    var handleDefaults = opts.handleDefaults;
    var partition = opts.partition || 'x';

    var ids = layoutOut._subplots[subplotType];
    var idsLength = ids.length;

    var baseId = idsLength && ids[0].replace(/\d+$/, '');

    var subplotLayoutIn, subplotLayoutOut;

    function coerce(attr, dflt) {
        return Lib.coerce(subplotLayoutIn, subplotLayoutOut, subplotAttributes, attr, dflt);
    }

    for(var i = 0; i < idsLength; i++) {
        var id = ids[i];

        // ternary traces get a layout ternary for free!
        if(layoutIn[id]) subplotLayoutIn = layoutIn[id];
        else subplotLayoutIn = layoutIn[id] = {};

        subplotLayoutOut = Template.newContainer(layoutOut, id, baseId);

        // All subplot containers get a `uirevision` inheriting from the base.
        // Currently all subplots containers have some user interaction
        // attributes, but if we ever add one that doesn't, we would need an
        // option to skip this step.
        coerce('uirevision', layoutOut.uirevision);

        var dfltDomains = {};
        dfltDomains[partition] = [i / idsLength, (i + 1) / idsLength];
        handleDomainDefaults(subplotLayoutOut, layoutOut, coerce, dfltDomains);

        opts.id = id;
        handleDefaults(subplotLayoutIn, subplotLayoutOut, coerce, opts);
    }
};


/***/ }),

/***/ "./node_modules/quat-slerp/index.js":
/*!******************************************!*\
  !*** ./node_modules/quat-slerp/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! gl-quat/slerp */ "./node_modules/gl-quat/slerp.js")

/***/ }),

/***/ "./node_modules/right-now/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/right-now/browser.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports =
  __webpack_require__.g.performance &&
  __webpack_require__.g.performance.now ? function now() {
    return performance.now()
  } : Date.now || function now() {
    return +new Date
  }


/***/ }),

/***/ "./node_modules/robust-dot-product/dot-prod.js":
/*!*****************************************************!*\
  !*** ./node_modules/robust-dot-product/dot-prod.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var twoProduct = __webpack_require__(/*! two-product */ "./node_modules/two-product/two-product.js")
var robustSum = __webpack_require__(/*! robust-sum */ "./node_modules/robust-sum/robust-sum.js")

module.exports = robustDotProduct

function robustDotProduct(a, b) {
  var r = twoProduct(a[0], b[0])
  for(var i=1; i<a.length; ++i) {
    r = robustSum(r, twoProduct(a[i], b[i]))
  }
  return r
}

/***/ }),

/***/ "./node_modules/split-polygon/clip-poly.js":
/*!*************************************************!*\
  !*** ./node_modules/split-polygon/clip-poly.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var robustDot = __webpack_require__(/*! robust-dot-product */ "./node_modules/robust-dot-product/dot-prod.js")
var robustSum = __webpack_require__(/*! robust-sum */ "./node_modules/robust-sum/robust-sum.js")

module.exports = splitPolygon
module.exports.positive = positive
module.exports.negative = negative

function planeT(p, plane) {
  var r = robustSum(robustDot(p, plane), [plane[plane.length-1]])
  return r[r.length-1]
}


//Can't do this exactly and emit a floating point result
function lerpW(a, wa, b, wb) {
  var d = wb - wa
  var t = -wa / d
  if(t < 0.0) {
    t = 0.0
  } else if(t > 1.0) {
    t = 1.0
  }
  var ti = 1.0 - t
  var n = a.length
  var r = new Array(n)
  for(var i=0; i<n; ++i) {
    r[i] = t * a[i] + ti * b[i]
  }
  return r
}

function splitPolygon(points, plane) {
  var pos = []
  var neg = []
  var a = planeT(points[points.length-1], plane)
  for(var s=points[points.length-1], t=points[0], i=0; i<points.length; ++i, s=t) {
    t = points[i]
    var b = planeT(t, plane)
    if((a < 0 && b > 0) || (a > 0 && b < 0)) {
      var p = lerpW(s, b, t, a)
      pos.push(p)
      neg.push(p.slice())
    }
    if(b < 0) {
      neg.push(t.slice())
    } else if(b > 0) {
      pos.push(t.slice())
    } else {
      pos.push(t.slice())
      neg.push(t.slice())
    }
    a = b
  }
  return { positive: pos, negative: neg }
}

function positive(points, plane) {
  var pos = []
  var a = planeT(points[points.length-1], plane)
  for(var s=points[points.length-1], t=points[0], i=0; i<points.length; ++i, s=t) {
    t = points[i]
    var b = planeT(t, plane)
    if((a < 0 && b > 0) || (a > 0 && b < 0)) {
      pos.push(lerpW(s, b, t, a))
    }
    if(b >= 0) {
      pos.push(t.slice())
    }
    a = b
  }
  return pos
}

function negative(points, plane) {
  var neg = []
  var a = planeT(points[points.length-1], plane)
  for(var s=points[points.length-1], t=points[0], i=0; i<points.length; ++i, s=t) {
    t = points[i]
    var b = planeT(t, plane)
    if((a < 0 && b > 0) || (a > 0 && b < 0)) {
      neg.push(lerpW(s, b, t, a))
    }
    if(b <= 0) {
      neg.push(t.slice())
    }
    a = b
  }
  return neg
}

/***/ }),

/***/ "./node_modules/turntable-camera-controller/turntable.js":
/*!***************************************************************!*\
  !*** ./node_modules/turntable-camera-controller/turntable.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createTurntableController

var filterVector = __webpack_require__(/*! filtered-vector */ "./node_modules/filtered-vector/fvec.js")
var invert44     = __webpack_require__(/*! gl-mat4/invert */ "./node_modules/gl-mat4/invert.js")
var rotateM      = __webpack_require__(/*! gl-mat4/rotate */ "./node_modules/gl-mat4/rotate.js")
var cross        = __webpack_require__(/*! gl-vec3/cross */ "./node_modules/gl-vec3/cross.js")
var normalize3   = __webpack_require__(/*! gl-vec3/normalize */ "./node_modules/gl-vec3/normalize.js")
var dot3         = __webpack_require__(/*! gl-vec3/dot */ "./node_modules/gl-vec3/dot.js")

function len3(x, y, z) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
}

function clamp1(x) {
  return Math.min(1.0, Math.max(-1.0, x))
}

function findOrthoPair(v) {
  var vx = Math.abs(v[0])
  var vy = Math.abs(v[1])
  var vz = Math.abs(v[2])

  var u = [0,0,0]
  if(vx > Math.max(vy, vz)) {
    u[2] = 1
  } else if(vy > Math.max(vx, vz)) {
    u[0] = 1
  } else {
    u[1] = 1
  }

  var vv = 0
  var uv = 0
  for(var i=0; i<3; ++i ) {
    vv += v[i] * v[i]
    uv += u[i] * v[i]
  }
  for(var i=0; i<3; ++i) {
    u[i] -= (uv / vv) *  v[i]
  }
  normalize3(u, u)
  return u
}

function TurntableController(zoomMin, zoomMax, center, up, right, radius, theta, phi) {
  this.center = filterVector(center)
  this.up     = filterVector(up)
  this.right  = filterVector(right)
  this.radius = filterVector([radius])
  this.angle  = filterVector([theta, phi])
  this.angle.bounds = [[-Infinity,-Math.PI/2], [Infinity,Math.PI/2]]
  this.setDistanceLimits(zoomMin, zoomMax)

  this.computedCenter = this.center.curve(0)
  this.computedUp     = this.up.curve(0)
  this.computedRight  = this.right.curve(0)
  this.computedRadius = this.radius.curve(0)
  this.computedAngle  = this.angle.curve(0)
  this.computedToward = [0,0,0]
  this.computedEye    = [0,0,0]
  this.computedMatrix = new Array(16)
  for(var i=0; i<16; ++i) {
    this.computedMatrix[i] = 0.5
  }

  this.recalcMatrix(0)
}

var proto = TurntableController.prototype

proto.setDistanceLimits = function(minDist, maxDist) {
  if(minDist > 0) {
    minDist = Math.log(minDist)
  } else {
    minDist = -Infinity
  }
  if(maxDist > 0) {
    maxDist = Math.log(maxDist)
  } else {
    maxDist = Infinity
  }
  maxDist = Math.max(maxDist, minDist)
  this.radius.bounds[0][0] = minDist
  this.radius.bounds[1][0] = maxDist
}

proto.getDistanceLimits = function(out) {
  var bounds = this.radius.bounds[0]
  if(out) {
    out[0] = Math.exp(bounds[0][0])
    out[1] = Math.exp(bounds[1][0])
    return out
  }
  return [ Math.exp(bounds[0][0]), Math.exp(bounds[1][0]) ]
}

proto.recalcMatrix = function(t) {
  //Recompute curves
  this.center.curve(t)
  this.up.curve(t)
  this.right.curve(t)
  this.radius.curve(t)
  this.angle.curve(t)

  //Compute frame for camera matrix
  var up     = this.computedUp
  var right  = this.computedRight
  var uu = 0.0
  var ur = 0.0
  for(var i=0; i<3; ++i) {
    ur += up[i] * right[i]
    uu += up[i] * up[i]
  }
  var ul = Math.sqrt(uu)
  var rr = 0.0
  for(var i=0; i<3; ++i) {
    right[i] -= up[i] * ur / uu
    rr       += right[i] * right[i]
    up[i]    /= ul
  }
  var rl = Math.sqrt(rr)
  for(var i=0; i<3; ++i) {
    right[i] /= rl
  }

  //Compute toward vector
  var toward = this.computedToward
  cross(toward, up, right)
  normalize3(toward, toward)

  //Compute angular parameters
  var radius = Math.exp(this.computedRadius[0])
  var theta  = this.computedAngle[0]
  var phi    = this.computedAngle[1]

  var ctheta = Math.cos(theta)
  var stheta = Math.sin(theta)
  var cphi   = Math.cos(phi)
  var sphi   = Math.sin(phi)

  var center = this.computedCenter

  var wx = ctheta * cphi 
  var wy = stheta * cphi
  var wz = sphi

  var sx = -ctheta * sphi
  var sy = -stheta * sphi
  var sz = cphi

  var eye = this.computedEye
  var mat = this.computedMatrix
  for(var i=0; i<3; ++i) {
    var x      = wx * right[i] + wy * toward[i] + wz * up[i]
    mat[4*i+1] = sx * right[i] + sy * toward[i] + sz * up[i]
    mat[4*i+2] = x
    mat[4*i+3] = 0.0
  }

  var ax = mat[1]
  var ay = mat[5]
  var az = mat[9]
  var bx = mat[2]
  var by = mat[6]
  var bz = mat[10]
  var cx = ay * bz - az * by
  var cy = az * bx - ax * bz
  var cz = ax * by - ay * bx
  var cl = len3(cx, cy, cz)
  cx /= cl
  cy /= cl
  cz /= cl
  mat[0] = cx
  mat[4] = cy
  mat[8] = cz

  for(var i=0; i<3; ++i) {
    eye[i] = center[i] + mat[2+4*i]*radius
  }

  for(var i=0; i<3; ++i) {
    var rr = 0.0
    for(var j=0; j<3; ++j) {
      rr += mat[i+4*j] * eye[j]
    }
    mat[12+i] = -rr
  }
  mat[15] = 1.0
}

proto.getMatrix = function(t, result) {
  this.recalcMatrix(t)
  var mat = this.computedMatrix
  if(result) {
    for(var i=0; i<16; ++i) {
      result[i] = mat[i]
    }
    return result
  }
  return mat
}

var zAxis = [0,0,0]
proto.rotate = function(t, dtheta, dphi, droll) {
  this.angle.move(t, dtheta, dphi)
  if(droll) {
    this.recalcMatrix(t)

    var mat = this.computedMatrix
    zAxis[0] = mat[2]
    zAxis[1] = mat[6]
    zAxis[2] = mat[10]

    var up     = this.computedUp
    var right  = this.computedRight
    var toward = this.computedToward

    for(var i=0; i<3; ++i) {
      mat[4*i]   = up[i]
      mat[4*i+1] = right[i]
      mat[4*i+2] = toward[i]
    }
    rotateM(mat, mat, droll, zAxis)
    for(var i=0; i<3; ++i) {
      up[i] =    mat[4*i]
      right[i] = mat[4*i+1]
    }

    this.up.set(t, up[0], up[1], up[2])
    this.right.set(t, right[0], right[1], right[2])
  }
}

proto.pan = function(t, dx, dy, dz) {
  dx = dx || 0.0
  dy = dy || 0.0
  dz = dz || 0.0

  this.recalcMatrix(t)
  var mat = this.computedMatrix

  var dist = Math.exp(this.computedRadius[0])

  var ux = mat[1]
  var uy = mat[5]
  var uz = mat[9]
  var ul = len3(ux, uy, uz)
  ux /= ul
  uy /= ul
  uz /= ul

  var rx = mat[0]
  var ry = mat[4]
  var rz = mat[8]
  var ru = rx * ux + ry * uy + rz * uz
  rx -= ux * ru
  ry -= uy * ru
  rz -= uz * ru
  var rl = len3(rx, ry, rz)
  rx /= rl
  ry /= rl
  rz /= rl

  var vx = rx * dx + ux * dy
  var vy = ry * dx + uy * dy
  var vz = rz * dx + uz * dy
  this.center.move(t, vx, vy, vz)

  //Update z-component of radius
  var radius = Math.exp(this.computedRadius[0])
  radius = Math.max(1e-4, radius + dz)
  this.radius.set(t, Math.log(radius))
}

proto.translate = function(t, dx, dy, dz) {
  this.center.move(t,
    dx||0.0,
    dy||0.0,
    dz||0.0)
}

//Recenters the coordinate axes
proto.setMatrix = function(t, mat, axes, noSnap) {
  
  //Get the axes for tare
  var ushift = 1
  if(typeof axes === 'number') {
    ushift = (axes)|0
  } 
  if(ushift < 0 || ushift > 3) {
    ushift = 1
  }
  var vshift = (ushift + 2) % 3
  var fshift = (ushift + 1) % 3

  //Recompute state for new t value
  if(!mat) { 
    this.recalcMatrix(t)
    mat = this.computedMatrix
  }

  //Get right and up vectors
  var ux = mat[ushift]
  var uy = mat[ushift+4]
  var uz = mat[ushift+8]
  if(!noSnap) {
    var ul = len3(ux, uy, uz)
    ux /= ul
    uy /= ul
    uz /= ul
  } else {
    var ax = Math.abs(ux)
    var ay = Math.abs(uy)
    var az = Math.abs(uz)
    var am = Math.max(ax,ay,az)
    if(ax === am) {
      ux = (ux < 0) ? -1 : 1
      uy = uz = 0
    } else if(az === am) {
      uz = (uz < 0) ? -1 : 1
      ux = uy = 0
    } else {
      uy = (uy < 0) ? -1 : 1
      ux = uz = 0
    }
  }

  var rx = mat[vshift]
  var ry = mat[vshift+4]
  var rz = mat[vshift+8]
  var ru = rx * ux + ry * uy + rz * uz
  rx -= ux * ru
  ry -= uy * ru
  rz -= uz * ru
  var rl = len3(rx, ry, rz)
  rx /= rl
  ry /= rl
  rz /= rl
  
  var fx = uy * rz - uz * ry
  var fy = uz * rx - ux * rz
  var fz = ux * ry - uy * rx
  var fl = len3(fx, fy, fz)
  fx /= fl
  fy /= fl
  fz /= fl

  this.center.jump(t, ex, ey, ez)
  this.radius.idle(t)
  this.up.jump(t, ux, uy, uz)
  this.right.jump(t, rx, ry, rz)

  var phi, theta
  if(ushift === 2) {
    var cx = mat[1]
    var cy = mat[5]
    var cz = mat[9]
    var cr = cx * rx + cy * ry + cz * rz
    var cf = cx * fx + cy * fy + cz * fz
    if(tu < 0) {
      phi = -Math.PI/2
    } else {
      phi = Math.PI/2
    }
    theta = Math.atan2(cf, cr)
  } else {
    var tx = mat[2]
    var ty = mat[6]
    var tz = mat[10]
    var tu = tx * ux + ty * uy + tz * uz
    var tr = tx * rx + ty * ry + tz * rz
    var tf = tx * fx + ty * fy + tz * fz

    phi = Math.asin(clamp1(tu))
    theta = Math.atan2(tf, tr)
  }

  this.angle.jump(t, theta, phi)

  this.recalcMatrix(t)
  var dx = mat[2]
  var dy = mat[6]
  var dz = mat[10]

  var imat = this.computedMatrix
  invert44(imat, mat)
  var w  = imat[15]
  var ex = imat[12] / w
  var ey = imat[13] / w
  var ez = imat[14] / w

  var gs = Math.exp(this.computedRadius[0])
  this.center.jump(t, ex-dx*gs, ey-dy*gs, ez-dz*gs)
}

proto.lastT = function() {
  return Math.max(
    this.center.lastT(),
    this.up.lastT(),
    this.right.lastT(),
    this.radius.lastT(),
    this.angle.lastT())
}

proto.idle = function(t) {
  this.center.idle(t)
  this.up.idle(t)
  this.right.idle(t)
  this.radius.idle(t)
  this.angle.idle(t)
}

proto.flush = function(t) {
  this.center.flush(t)
  this.up.flush(t)
  this.right.flush(t)
  this.radius.flush(t)
  this.angle.flush(t)
}

proto.setDistance = function(t, d) {
  if(d > 0) {
    this.radius.set(t, Math.log(d))
  }
}

proto.lookAt = function(t, eye, center, up) {
  this.recalcMatrix(t)

  eye    = eye    || this.computedEye
  center = center || this.computedCenter
  up     = up     || this.computedUp

  var ux = up[0]
  var uy = up[1]
  var uz = up[2]
  var ul = len3(ux, uy, uz)
  if(ul < 1e-6) {
    return
  }
  ux /= ul
  uy /= ul
  uz /= ul

  var tx = eye[0] - center[0]
  var ty = eye[1] - center[1]
  var tz = eye[2] - center[2]
  var tl = len3(tx, ty, tz)
  if(tl < 1e-6) {
    return
  }
  tx /= tl
  ty /= tl
  tz /= tl

  var right = this.computedRight
  var rx = right[0]
  var ry = right[1]
  var rz = right[2]
  var ru = ux*rx + uy*ry + uz*rz
  rx -= ru * ux
  ry -= ru * uy
  rz -= ru * uz
  var rl = len3(rx, ry, rz)

  if(rl < 0.01) {
    rx = uy * tz - uz * ty
    ry = uz * tx - ux * tz
    rz = ux * ty - uy * tx
    rl = len3(rx, ry, rz)
    if(rl < 1e-6) {
      return
    }
  }
  rx /= rl
  ry /= rl
  rz /= rl

  this.up.set(t, ux, uy, uz)
  this.right.set(t, rx, ry, rz)
  this.center.set(t, center[0], center[1], center[2])
  this.radius.set(t, Math.log(tl))

  var fx = uy * rz - uz * ry
  var fy = uz * rx - ux * rz
  var fz = ux * ry - uy * rx
  var fl = len3(fx, fy, fz)
  fx /= fl
  fy /= fl
  fz /= fl

  var tu = ux*tx + uy*ty + uz*tz
  var tr = rx*tx + ry*ty + rz*tz
  var tf = fx*tx + fy*ty + fz*tz

  var phi   = Math.asin(clamp1(tu))
  var theta = Math.atan2(tf, tr)

  var angleState = this.angle._state
  var lastTheta  = angleState[angleState.length-1]
  var lastPhi    = angleState[angleState.length-2]
  lastTheta      = lastTheta % (2.0 * Math.PI)
  var dp = Math.abs(lastTheta + 2.0 * Math.PI - theta)
  var d0 = Math.abs(lastTheta - theta)
  var dn = Math.abs(lastTheta - 2.0 * Math.PI - theta)
  if(dp < d0) {
    lastTheta += 2.0 * Math.PI
  }
  if(dn < d0) {
    lastTheta -= 2.0 * Math.PI
  }

  this.angle.jump(this.angle.lastT(), lastTheta, lastPhi)
  this.angle.set(t, theta, phi)
}

function createTurntableController(options) {
  options = options || {}

  var center = options.center || [0,0,0]
  var up     = options.up     || [0,1,0]
  var right  = options.right  || findOrthoPair(up)
  var radius = options.radius || 1.0
  var theta  = options.theta  || 0.0
  var phi    = options.phi    || 0.0

  center = [].slice.call(center, 0, 3)

  up = [].slice.call(up, 0, 3)
  normalize3(up, up)

  right = [].slice.call(right, 0, 3)
  normalize3(right, right)

  if('eye' in options) {
    var eye = options.eye
    var toward = [
      eye[0]-center[0],
      eye[1]-center[1],
      eye[2]-center[2]
    ]
    cross(right, toward, up)
    if(len3(right[0], right[1], right[2]) < 1e-6) {
      right = findOrthoPair(up)
    } else {
      normalize3(right, right)
    }

    radius = len3(toward[0], toward[1], toward[2])

    var ut = dot3(up, toward) / radius
    var rt = dot3(right, toward) / radius
    phi    = Math.acos(ut)
    theta  = Math.acos(rt)
  }

  //Use logarithmic coordinates for radius
  radius = Math.log(radius)

  //Return the controller
  return new TurntableController(
    options.zoomMin,
    options.zoomMax,
    center,
    up,
    right,
    radius,
    theta,
    phi)
}

/***/ }),

/***/ "./node_modules/weak-map/weak-map.js":
/*!*******************************************!*\
  !*** ./node_modules/weak-map/weak-map.js ***!
  \*******************************************/
/***/ ((module) => {

// Copyright (C) 2011 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Install a leaky WeakMap emulation on platforms that
 * don't provide a built-in one.
 *
 * <p>Assumes that an ES5 platform where, if {@code WeakMap} is
 * already present, then it conforms to the anticipated ES6
 * specification. To run this file on an ES5 or almost ES5
 * implementation where the {@code WeakMap} specification does not
 * quite conform, run <code>repairES5.js</code> first.
 *
 * <p>Even though WeakMapModule is not global, the linter thinks it
 * is, which is why it is in the overrides list below.
 *
 * <p>NOTE: Before using this WeakMap emulation in a non-SES
 * environment, see the note below about hiddenRecord.
 *
 * @author Mark S. Miller
 * @requires crypto, ArrayBuffer, Uint8Array, navigator, console
 * @overrides WeakMap, ses, Proxy
 * @overrides WeakMapModule
 */

/**
 * This {@code WeakMap} emulation is observably equivalent to the
 * ES-Harmony WeakMap, but with leakier garbage collection properties.
 *
 * <p>As with true WeakMaps, in this emulation, a key does not
 * retain maps indexed by that key and (crucially) a map does not
 * retain the keys it indexes. A map by itself also does not retain
 * the values associated with that map.
 *
 * <p>However, the values associated with a key in some map are
 * retained so long as that key is retained and those associations are
 * not overridden. For example, when used to support membranes, all
 * values exported from a given membrane will live for the lifetime
 * they would have had in the absence of an interposed membrane. Even
 * when the membrane is revoked, all objects that would have been
 * reachable in the absence of revocation will still be reachable, as
 * far as the GC can tell, even though they will no longer be relevant
 * to ongoing computation.
 *
 * <p>The API implemented here is approximately the API as implemented
 * in FF6.0a1 and agreed to by MarkM, Andreas Gal, and Dave Herman,
 * rather than the offially approved proposal page. TODO(erights):
 * upgrade the ecmascript WeakMap proposal page to explain this API
 * change and present to EcmaScript committee for their approval.
 *
 * <p>The first difference between the emulation here and that in
 * FF6.0a1 is the presence of non enumerable {@code get___, has___,
 * set___, and delete___} methods on WeakMap instances to represent
 * what would be the hidden internal properties of a primitive
 * implementation. Whereas the FF6.0a1 WeakMap.prototype methods
 * require their {@code this} to be a genuine WeakMap instance (i.e.,
 * an object of {@code [[Class]]} "WeakMap}), since there is nothing
 * unforgeable about the pseudo-internal method names used here,
 * nothing prevents these emulated prototype methods from being
 * applied to non-WeakMaps with pseudo-internal methods of the same
 * names.
 *
 * <p>Another difference is that our emulated {@code
 * WeakMap.prototype} is not itself a WeakMap. A problem with the
 * current FF6.0a1 API is that WeakMap.prototype is itself a WeakMap
 * providing ambient mutability and an ambient communications
 * channel. Thus, if a WeakMap is already present and has this
 * problem, repairES5.js wraps it in a safe wrappper in order to
 * prevent access to this channel. (See
 * PATCH_MUTABLE_FROZEN_WEAKMAP_PROTO in repairES5.js).
 */

/**
 * If this is a full <a href=
 * "http://code.google.com/p/es-lab/wiki/SecureableES5"
 * >secureable ES5</a> platform and the ES-Harmony {@code WeakMap} is
 * absent, install an approximate emulation.
 *
 * <p>If WeakMap is present but cannot store some objects, use our approximate
 * emulation as a wrapper.
 *
 * <p>If this is almost a secureable ES5 platform, then WeakMap.js
 * should be run after repairES5.js.
 *
 * <p>See {@code WeakMap} for documentation of the garbage collection
 * properties of this WeakMap emulation.
 */
(function WeakMapModule() {
  "use strict";

  if (typeof ses !== 'undefined' && ses.ok && !ses.ok()) {
    // already too broken, so give up
    return;
  }

  /**
   * In some cases (current Firefox), we must make a choice betweeen a
   * WeakMap which is capable of using all varieties of host objects as
   * keys and one which is capable of safely using proxies as keys. See
   * comments below about HostWeakMap and DoubleWeakMap for details.
   *
   * This function (which is a global, not exposed to guests) marks a
   * WeakMap as permitted to do what is necessary to index all host
   * objects, at the cost of making it unsafe for proxies.
   *
   * Do not apply this function to anything which is not a genuine
   * fresh WeakMap.
   */
  function weakMapPermitHostObjects(map) {
    // identity of function used as a secret -- good enough and cheap
    if (map.permitHostObjects___) {
      map.permitHostObjects___(weakMapPermitHostObjects);
    }
  }
  if (typeof ses !== 'undefined') {
    ses.weakMapPermitHostObjects = weakMapPermitHostObjects;
  }

  // IE 11 has no Proxy but has a broken WeakMap such that we need to patch
  // it using DoubleWeakMap; this flag tells DoubleWeakMap so.
  var doubleWeakMapCheckSilentFailure = false;

  // Check if there is already a good-enough WeakMap implementation, and if so
  // exit without replacing it.
  if (typeof WeakMap === 'function') {
    var HostWeakMap = WeakMap;
    // There is a WeakMap -- is it good enough?
    if (typeof navigator !== 'undefined' &&
        /Firefox/.test(navigator.userAgent)) {
      // We're now *assuming not*, because as of this writing (2013-05-06)
      // Firefox's WeakMaps have a miscellany of objects they won't accept, and
      // we don't want to make an exhaustive list, and testing for just one
      // will be a problem if that one is fixed alone (as they did for Event).

      // If there is a platform that we *can* reliably test on, here's how to
      // do it:
      //  var problematic = ... ;
      //  var testHostMap = new HostWeakMap();
      //  try {
      //    testHostMap.set(problematic, 1);  // Firefox 20 will throw here
      //    if (testHostMap.get(problematic) === 1) {
      //      return;
      //    }
      //  } catch (e) {}

    } else {
      // IE 11 bug: WeakMaps silently fail to store frozen objects.
      var testMap = new HostWeakMap();
      var testObject = Object.freeze({});
      testMap.set(testObject, 1);
      if (testMap.get(testObject) !== 1) {
        doubleWeakMapCheckSilentFailure = true;
        // Fall through to installing our WeakMap.
      } else {
        module.exports = WeakMap;
        return;
      }
    }
  }

  var hop = Object.prototype.hasOwnProperty;
  var gopn = Object.getOwnPropertyNames;
  var defProp = Object.defineProperty;
  var isExtensible = Object.isExtensible;

  /**
   * Security depends on HIDDEN_NAME being both <i>unguessable</i> and
   * <i>undiscoverable</i> by untrusted code.
   *
   * <p>Given the known weaknesses of Math.random() on existing
   * browsers, it does not generate unguessability we can be confident
   * of.
   *
   * <p>It is the monkey patching logic in this file that is intended
   * to ensure undiscoverability. The basic idea is that there are
   * three fundamental means of discovering properties of an object:
   * The for/in loop, Object.keys(), and Object.getOwnPropertyNames(),
   * as well as some proposed ES6 extensions that appear on our
   * whitelist. The first two only discover enumerable properties, and
   * we only use HIDDEN_NAME to name a non-enumerable property, so the
   * only remaining threat should be getOwnPropertyNames and some
   * proposed ES6 extensions that appear on our whitelist. We monkey
   * patch them to remove HIDDEN_NAME from the list of properties they
   * returns.
   *
   * <p>TODO(erights): On a platform with built-in Proxies, proxies
   * could be used to trap and thereby discover the HIDDEN_NAME, so we
   * need to monkey patch Proxy.create, Proxy.createFunction, etc, in
   * order to wrap the provided handler with the real handler which
   * filters out all traps using HIDDEN_NAME.
   *
   * <p>TODO(erights): Revisit Mike Stay's suggestion that we use an
   * encapsulated function at a not-necessarily-secret name, which
   * uses the Stiegler shared-state rights amplification pattern to
   * reveal the associated value only to the WeakMap in which this key
   * is associated with that value. Since only the key retains the
   * function, the function can also remember the key without causing
   * leakage of the key, so this doesn't violate our general gc
   * goals. In addition, because the name need not be a guarded
   * secret, we could efficiently handle cross-frame frozen keys.
   */
  var HIDDEN_NAME_PREFIX = 'weakmap:';
  var HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'ident:' + Math.random() + '___';

  if (typeof crypto !== 'undefined' &&
      typeof crypto.getRandomValues === 'function' &&
      typeof ArrayBuffer === 'function' &&
      typeof Uint8Array === 'function') {
    var ab = new ArrayBuffer(25);
    var u8s = new Uint8Array(ab);
    crypto.getRandomValues(u8s);
    HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'rand:' +
      Array.prototype.map.call(u8s, function(u8) {
        return (u8 % 36).toString(36);
      }).join('') + '___';
  }

  function isNotHiddenName(name) {
    return !(
        name.substr(0, HIDDEN_NAME_PREFIX.length) == HIDDEN_NAME_PREFIX &&
        name.substr(name.length - 3) === '___');
  }

  /**
   * Monkey patch getOwnPropertyNames to avoid revealing the
   * HIDDEN_NAME.
   *
   * <p>The ES5.1 spec requires each name to appear only once, but as
   * of this writing, this requirement is controversial for ES6, so we
   * made this code robust against this case. If the resulting extra
   * search turns out to be expensive, we can probably relax this once
   * ES6 is adequately supported on all major browsers, iff no browser
   * versions we support at that time have relaxed this constraint
   * without providing built-in ES6 WeakMaps.
   */
  defProp(Object, 'getOwnPropertyNames', {
    value: function fakeGetOwnPropertyNames(obj) {
      return gopn(obj).filter(isNotHiddenName);
    }
  });

  /**
   * getPropertyNames is not in ES5 but it is proposed for ES6 and
   * does appear in our whitelist, so we need to clean it too.
   */
  if ('getPropertyNames' in Object) {
    var originalGetPropertyNames = Object.getPropertyNames;
    defProp(Object, 'getPropertyNames', {
      value: function fakeGetPropertyNames(obj) {
        return originalGetPropertyNames(obj).filter(isNotHiddenName);
      }
    });
  }

  /**
   * <p>To treat objects as identity-keys with reasonable efficiency
   * on ES5 by itself (i.e., without any object-keyed collections), we
   * need to add a hidden property to such key objects when we
   * can. This raises several issues:
   * <ul>
   * <li>Arranging to add this property to objects before we lose the
   *     chance, and
   * <li>Hiding the existence of this new property from most
   *     JavaScript code.
   * <li>Preventing <i>certification theft</i>, where one object is
   *     created falsely claiming to be the key of an association
   *     actually keyed by another object.
   * <li>Preventing <i>value theft</i>, where untrusted code with
   *     access to a key object but not a weak map nevertheless
   *     obtains access to the value associated with that key in that
   *     weak map.
   * </ul>
   * We do so by
   * <ul>
   * <li>Making the name of the hidden property unguessable, so "[]"
   *     indexing, which we cannot intercept, cannot be used to access
   *     a property without knowing the name.
   * <li>Making the hidden property non-enumerable, so we need not
   *     worry about for-in loops or {@code Object.keys},
   * <li>monkey patching those reflective methods that would
   *     prevent extensions, to add this hidden property first,
   * <li>monkey patching those methods that would reveal this
   *     hidden property.
   * </ul>
   * Unfortunately, because of same-origin iframes, we cannot reliably
   * add this hidden property before an object becomes
   * non-extensible. Instead, if we encounter a non-extensible object
   * without a hidden record that we can detect (whether or not it has
   * a hidden record stored under a name secret to us), then we just
   * use the key object itself to represent its identity in a brute
   * force leaky map stored in the weak map, losing all the advantages
   * of weakness for these.
   */
  function getHiddenRecord(key) {
    if (key !== Object(key)) {
      throw new TypeError('Not an object: ' + key);
    }
    var hiddenRecord = key[HIDDEN_NAME];
    if (hiddenRecord && hiddenRecord.key === key) { return hiddenRecord; }
    if (!isExtensible(key)) {
      // Weak map must brute force, as explained in doc-comment above.
      return void 0;
    }

    // The hiddenRecord and the key point directly at each other, via
    // the "key" and HIDDEN_NAME properties respectively. The key
    // field is for quickly verifying that this hidden record is an
    // own property, not a hidden record from up the prototype chain.
    //
    // NOTE: Because this WeakMap emulation is meant only for systems like
    // SES where Object.prototype is frozen without any numeric
    // properties, it is ok to use an object literal for the hiddenRecord.
    // This has two advantages:
    // * It is much faster in a performance critical place
    // * It avoids relying on Object.create(null), which had been
    //   problematic on Chrome 28.0.1480.0. See
    //   https://code.google.com/p/google-caja/issues/detail?id=1687
    hiddenRecord = { key: key };

    // When using this WeakMap emulation on platforms where
    // Object.prototype might not be frozen and Object.create(null) is
    // reliable, use the following two commented out lines instead.
    // hiddenRecord = Object.create(null);
    // hiddenRecord.key = key;

    // Please contact us if you need this to work on platforms where
    // Object.prototype might not be frozen and
    // Object.create(null) might not be reliable.

    try {
      defProp(key, HIDDEN_NAME, {
        value: hiddenRecord,
        writable: false,
        enumerable: false,
        configurable: false
      });
      return hiddenRecord;
    } catch (error) {
      // Under some circumstances, isExtensible seems to misreport whether
      // the HIDDEN_NAME can be defined.
      // The circumstances have not been isolated, but at least affect
      // Node.js v0.10.26 on TravisCI / Linux, but not the same version of
      // Node.js on OS X.
      return void 0;
    }
  }

  /**
   * Monkey patch operations that would make their argument
   * non-extensible.
   *
   * <p>The monkey patched versions throw a TypeError if their
   * argument is not an object, so it should only be done to functions
   * that should throw a TypeError anyway if their argument is not an
   * object.
   */
  (function(){
    var oldFreeze = Object.freeze;
    defProp(Object, 'freeze', {
      value: function identifyingFreeze(obj) {
        getHiddenRecord(obj);
        return oldFreeze(obj);
      }
    });
    var oldSeal = Object.seal;
    defProp(Object, 'seal', {
      value: function identifyingSeal(obj) {
        getHiddenRecord(obj);
        return oldSeal(obj);
      }
    });
    var oldPreventExtensions = Object.preventExtensions;
    defProp(Object, 'preventExtensions', {
      value: function identifyingPreventExtensions(obj) {
        getHiddenRecord(obj);
        return oldPreventExtensions(obj);
      }
    });
  })();

  function constFunc(func) {
    func.prototype = null;
    return Object.freeze(func);
  }

  var calledAsFunctionWarningDone = false;
  function calledAsFunctionWarning() {
    // Future ES6 WeakMap is currently (2013-09-10) expected to reject WeakMap()
    // but we used to permit it and do it ourselves, so warn only.
    if (!calledAsFunctionWarningDone && typeof console !== 'undefined') {
      calledAsFunctionWarningDone = true;
      console.warn('WeakMap should be invoked as new WeakMap(), not ' +
          'WeakMap(). This will be an error in the future.');
    }
  }

  var nextId = 0;

  var OurWeakMap = function() {
    if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
      calledAsFunctionWarning();
    }

    // We are currently (12/25/2012) never encountering any prematurely
    // non-extensible keys.
    var keys = []; // brute force for prematurely non-extensible keys.
    var values = []; // brute force for corresponding values.
    var id = nextId++;

    function get___(key, opt_default) {
      var index;
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        return id in hiddenRecord ? hiddenRecord[id] : opt_default;
      } else {
        index = keys.indexOf(key);
        return index >= 0 ? values[index] : opt_default;
      }
    }

    function has___(key) {
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        return id in hiddenRecord;
      } else {
        return keys.indexOf(key) >= 0;
      }
    }

    function set___(key, value) {
      var index;
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        hiddenRecord[id] = value;
      } else {
        index = keys.indexOf(key);
        if (index >= 0) {
          values[index] = value;
        } else {
          // Since some browsers preemptively terminate slow turns but
          // then continue computing with presumably corrupted heap
          // state, we here defensively get keys.length first and then
          // use it to update both the values and keys arrays, keeping
          // them in sync.
          index = keys.length;
          values[index] = value;
          // If we crash here, values will be one longer than keys.
          keys[index] = key;
        }
      }
      return this;
    }

    function delete___(key) {
      var hiddenRecord = getHiddenRecord(key);
      var index, lastIndex;
      if (hiddenRecord) {
        return id in hiddenRecord && delete hiddenRecord[id];
      } else {
        index = keys.indexOf(key);
        if (index < 0) {
          return false;
        }
        // Since some browsers preemptively terminate slow turns but
        // then continue computing with potentially corrupted heap
        // state, we here defensively get keys.length first and then use
        // it to update both the keys and the values array, keeping
        // them in sync. We update the two with an order of assignments,
        // such that any prefix of these assignments will preserve the
        // key/value correspondence, either before or after the delete.
        // Note that this needs to work correctly when index === lastIndex.
        lastIndex = keys.length - 1;
        keys[index] = void 0;
        // If we crash here, there's a void 0 in the keys array, but
        // no operation will cause a "keys.indexOf(void 0)", since
        // getHiddenRecord(void 0) will always throw an error first.
        values[index] = values[lastIndex];
        // If we crash here, values[index] cannot be found here,
        // because keys[index] is void 0.
        keys[index] = keys[lastIndex];
        // If index === lastIndex and we crash here, then keys[index]
        // is still void 0, since the aliasing killed the previous key.
        keys.length = lastIndex;
        // If we crash here, keys will be one shorter than values.
        values.length = lastIndex;
        return true;
      }
    }

    return Object.create(OurWeakMap.prototype, {
      get___:    { value: constFunc(get___) },
      has___:    { value: constFunc(has___) },
      set___:    { value: constFunc(set___) },
      delete___: { value: constFunc(delete___) }
    });
  };

  OurWeakMap.prototype = Object.create(Object.prototype, {
    get: {
      /**
       * Return the value most recently associated with key, or
       * opt_default if none.
       */
      value: function get(key, opt_default) {
        return this.get___(key, opt_default);
      },
      writable: true,
      configurable: true
    },

    has: {
      /**
       * Is there a value associated with key in this WeakMap?
       */
      value: function has(key) {
        return this.has___(key);
      },
      writable: true,
      configurable: true
    },

    set: {
      /**
       * Associate value with key in this WeakMap, overwriting any
       * previous association if present.
       */
      value: function set(key, value) {
        return this.set___(key, value);
      },
      writable: true,
      configurable: true
    },

    'delete': {
      /**
       * Remove any association for key in this WeakMap, returning
       * whether there was one.
       *
       * <p>Note that the boolean return here does not work like the
       * {@code delete} operator. The {@code delete} operator returns
       * whether the deletion succeeds at bringing about a state in
       * which the deleted property is absent. The {@code delete}
       * operator therefore returns true if the property was already
       * absent, whereas this {@code delete} method returns false if
       * the association was already absent.
       */
      value: function remove(key) {
        return this.delete___(key);
      },
      writable: true,
      configurable: true
    }
  });

  if (typeof HostWeakMap === 'function') {
    (function() {
      // If we got here, then the platform has a WeakMap but we are concerned
      // that it may refuse to store some key types. Therefore, make a map
      // implementation which makes use of both as possible.

      // In this mode we are always using double maps, so we are not proxy-safe.
      // This combination does not occur in any known browser, but we had best
      // be safe.
      if (doubleWeakMapCheckSilentFailure && typeof Proxy !== 'undefined') {
        Proxy = undefined;
      }

      function DoubleWeakMap() {
        if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
          calledAsFunctionWarning();
        }

        // Preferable, truly weak map.
        var hmap = new HostWeakMap();

        // Our hidden-property-based pseudo-weak-map. Lazily initialized in the
        // 'set' implementation; thus we can avoid performing extra lookups if
        // we know all entries actually stored are entered in 'hmap'.
        var omap = undefined;

        // Hidden-property maps are not compatible with proxies because proxies
        // can observe the hidden name and either accidentally expose it or fail
        // to allow the hidden property to be set. Therefore, we do not allow
        // arbitrary WeakMaps to switch to using hidden properties, but only
        // those which need the ability, and unprivileged code is not allowed
        // to set the flag.
        //
        // (Except in doubleWeakMapCheckSilentFailure mode in which case we
        // disable proxies.)
        var enableSwitching = false;

        function dget(key, opt_default) {
          if (omap) {
            return hmap.has(key) ? hmap.get(key)
                : omap.get___(key, opt_default);
          } else {
            return hmap.get(key, opt_default);
          }
        }

        function dhas(key) {
          return hmap.has(key) || (omap ? omap.has___(key) : false);
        }

        var dset;
        if (doubleWeakMapCheckSilentFailure) {
          dset = function(key, value) {
            hmap.set(key, value);
            if (!hmap.has(key)) {
              if (!omap) { omap = new OurWeakMap(); }
              omap.set(key, value);
            }
            return this;
          };
        } else {
          dset = function(key, value) {
            if (enableSwitching) {
              try {
                hmap.set(key, value);
              } catch (e) {
                if (!omap) { omap = new OurWeakMap(); }
                omap.set___(key, value);
              }
            } else {
              hmap.set(key, value);
            }
            return this;
          };
        }

        function ddelete(key) {
          var result = !!hmap['delete'](key);
          if (omap) { return omap.delete___(key) || result; }
          return result;
        }

        return Object.create(OurWeakMap.prototype, {
          get___:    { value: constFunc(dget) },
          has___:    { value: constFunc(dhas) },
          set___:    { value: constFunc(dset) },
          delete___: { value: constFunc(ddelete) },
          permitHostObjects___: { value: constFunc(function(token) {
            if (token === weakMapPermitHostObjects) {
              enableSwitching = true;
            } else {
              throw new Error('bogus call to permitHostObjects___');
            }
          })}
        });
      }
      DoubleWeakMap.prototype = OurWeakMap.prototype;
      module.exports = DoubleWeakMap;

      // define .constructor to hide OurWeakMap ctor
      Object.defineProperty(WeakMap.prototype, 'constructor', {
        value: WeakMap,
        enumerable: false,  // as default .constructor is
        configurable: true,
        writable: true
      });
    })();
  } else {
    // There is no host WeakMap, so we must use the emulation.

    // Emulated WeakMaps are incompatible with native proxies (because proxies
    // can observe the hidden name), so we must disable Proxy usage (in
    // ArrayLike and Domado, currently).
    if (typeof Proxy !== 'undefined') {
      Proxy = undefined;
    }

    module.exports = OurWeakMap;
  }
})();


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzLzNkLXZpZXcvdmlldy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2EtYmlnLXRyaWFuZ2xlL3RyaWFuZ2xlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvY29sb3JtYXAvY29sb3JTY2FsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2NvbG9ybWFwL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvY3ViaWMtaGVybWl0ZS9oZXJtaXRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZXh0cmFjdC1mcnVzdHVtLXBsYW5lcy9leHRyYWN0LXBsYW5lcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2ZpbHRlcmVkLXZlY3Rvci9mdmVjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZmlsdGVyZWQtdmVjdG9yL25vZGVfbW9kdWxlcy9iaW5hcnktc2VhcmNoLWJvdW5kcy9zZWFyY2gtYm91bmRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtYXhlczNkL2F4ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1heGVzM2QvbGliL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1heGVzM2QvbGliL2N1YmUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1heGVzM2QvbGliL2xpbmVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtYXhlczNkL2xpYi9zaGFkZXJzL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtYXhlczNkL2xpYi90ZXh0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtYXhlczNkL2xpYi90aWNrcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLWF4ZXMzZC9wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC9jbG9uZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvY3JlYXRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC9kZXRlcm1pbmFudC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1tYXQ0L2lkZW50aXR5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC9pbnZlcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1tYXQ0L2xvb2tBdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvbXVsdGlwbHkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1tYXQ0L29ydGhvLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC9wZXJzcGVjdGl2ZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvcm90YXRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC9yb3RhdGVYLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC9yb3RhdGVZLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC9yb3RhdGVaLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC9zY2FsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvdHJhbnNsYXRlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtbWF0NC90cmFuc3Bvc2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1wbG90M2QvY2FtZXJhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtcGxvdDNkL2xpYi9zaGFkZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1wbG90M2Qvc2NlbmUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1xdWF0L3NsZXJwLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtc3Bpa2VzM2Qvc2hhZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXNwaWtlczNkL3NwaWtlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvZG8tYmluZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvdmFvLWVtdWxhdGVkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmFvL2xpYi92YW8tbmF0aXZlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmFvL3Zhby5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvY3Jvc3MuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWMzL2RvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXZlYzMvbGVuZ3RoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9sZXJwLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtdmVjMy9ub3JtYWxpemUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3RyYW5zZm9ybU1hdDQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9pcy1tb2JpbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9sZXJwL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvbWF0NC1kZWNvbXBvc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9tYXQ0LWRlY29tcG9zZS9ub3JtYWxpemUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9tYXQ0LWludGVycG9sYXRlL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvbWF0NC1yZWNvbXBvc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9tYXRyaXgtY2FtZXJhLWNvbnRyb2xsZXIvbWF0cml4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvbWF0cml4LWNhbWVyYS1jb250cm9sbGVyL25vZGVfbW9kdWxlcy9iaW5hcnktc2VhcmNoLWJvdW5kcy9zZWFyY2gtYm91bmRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvb3JiaXQtY2FtZXJhLWNvbnRyb2xsZXIvbGliL3F1YXRGcm9tRnJhbWUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9vcmJpdC1jYW1lcmEtY29udHJvbGxlci9vcmJpdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvbGliL2dsX2Zvcm1hdF9jb2xvci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC9sYXlvdXQvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC9sYXlvdXQvYXhpc19hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9nbDNkL2xheW91dC9heGlzX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9nbDNkL2xheW91dC9jb252ZXJ0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9nbDNkL2xheW91dC9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC9sYXlvdXQvbGF5b3V0X2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2dsM2QvbGF5b3V0L3NwaWtlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC9sYXlvdXQvdGlja19tYXJrcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC9zY2VuZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvc3VicGxvdF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3F1YXQtc2xlcnAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9yaWdodC1ub3cvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3JvYnVzdC1kb3QtcHJvZHVjdC9kb3QtcHJvZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3NwbGl0LXBvbHlnb24vY2xpcC1wb2x5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdHVybnRhYmxlLWNhbWVyYS1jb250cm9sbGVyL3R1cm50YWJsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3dlYWstbWFwL3dlYWstbWFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFZOztBQUVaOztBQUVBLHNCQUFzQixtQkFBTyxDQUFDLDRGQUE2QjtBQUMzRCxzQkFBc0IsbUJBQU8sQ0FBQyxnRkFBeUI7QUFDdkQsc0JBQXNCLG1CQUFPLENBQUMsbUZBQTBCOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsYUFBYTtBQUMzQjtBQUNBO0FB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LEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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QUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixXQUFXO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFdBQVc7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsV0FBVztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsS0FBSztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixLQUFLO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLEtBQUs7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixXQUFXO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFdBQVc7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0EsS0FBSyxzQkFBc0IsZUFBZTs7QUFFMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFF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OztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLE9BQU87QUFDcEMsc0JBQXNCLE9BQU87QUFDN0IsMEJBQTBCLE9BQU87QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekIsc0JBQXNCLE9BQU87QUFDN0I7O0FBRUEsa0NBQWtDO0FBQ2xDO0FBQ0E7O0FBRUEsOEJBQThCLE9BQU8sT0FBTztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7QUMzakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBLDZCQUE2QixjQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxjQUFjO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5Qyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLGtCQUFrQixXQUFXO0FBQzdCLGlCQUFpQixnQkFBZ0IsVUFBVTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsY0FBYztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYLEtBQUs7QUFDTDtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msa0JBQWtCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHFCQUFxQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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OiJjaGFydDg5MTIyMWFmOThlMjFmNmM4YzRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVmlld0NvbnRyb2xsZXJcblxudmFyIGNyZWF0ZVR1cm50YWJsZSA9IHJlcXVpcmUoJ3R1cm50YWJsZS1jYW1lcmEtY29udHJvbGxlcicpXG52YXIgY3JlYXRlT3JiaXQgICAgID0gcmVxdWlyZSgnb3JiaXQtY2FtZXJhLWNvbnRyb2xsZXInKVxudmFyIGNyZWF0ZU1hdHJpeCAgICA9IHJlcXVpcmUoJ21hdHJpeC1jYW1lcmEtY29udHJvbGxlcicpXG5cbmZ1bmN0aW9uIFZpZXdDb250cm9sbGVyKGNvbnRyb2xsZXJzLCBtb2RlKSB7XG4gIHRoaXMuX2NvbnRyb2xsZXJOYW1lcyA9IE9iamVjdC5rZXlzKGNvbnRyb2xsZXJzKVxuICB0aGlzLl9jb250cm9sbGVyTGlzdCA9IHRoaXMuX2NvbnRyb2xsZXJOYW1lcy5tYXAoZnVuY3Rpb24obikge1xuICAgIHJldHVybiBjb250cm9sbGVyc1tuXVxuICB9KVxuICB0aGlzLl9tb2RlICAgPSBtb2RlXG4gIHRoaXMuX2FjdGl2ZSA9IGNvbnRyb2xsZXJzW21vZGVdXG4gIGlmKCF0aGlzLl9hY3RpdmUpIHtcbiAgICB0aGlzLl9tb2RlICAgPSAndHVybnRhYmxlJ1xuICAgIHRoaXMuX2FjdGl2ZSA9IGNvbnRyb2xsZXJzLnR1cm50YWJsZVxuICB9XG4gIHRoaXMubW9kZXMgPSB0aGlzLl9jb250cm9sbGVyTmFtZXNcbiAgdGhpcy5jb21wdXRlZE1hdHJpeCA9IHRoaXMuX2FjdGl2ZS5jb21wdXRlZE1hdHJpeFxuICB0aGlzLmNvbXB1dGVkRXllICAgID0gdGhpcy5fYWN0aXZlLmNvbXB1dGVkRXllXG4gIHRoaXMuY29tcHV0ZWRVcCAgICAgPSB0aGlzLl9hY3RpdmUuY29tcHV0ZWRVcFxuICB0aGlzLmNvbXB1dGVkQ2VudGVyID0gdGhpcy5fYWN0aXZlLmNvbXB1dGVkQ2VudGVyXG4gIHRoaXMuY29tcHV0ZWRSYWRpdXMgPSB0aGlzLl9hY3RpdmUuY29tcHV0ZWRSYWRpdXNcbn1cblxudmFyIHByb3RvID0gVmlld0NvbnRyb2xsZXIucHJvdG90eXBlXG5cbnZhciBDT01NT05fTUVUSE9EUyA9IFtcbiAgWydmbHVzaCcsIDFdLFxuICBbJ2lkbGUnLCAxXSxcbiAgWydsb29rQXQnLCA0XSxcbiAgWydyb3RhdGUnLCA0XSxcbiAgWydwYW4nLCA0XSxcbiAgWyd0cmFuc2xhdGUnLCA0XSxcbiAgWydzZXRNYXRyaXgnLCAyXSxcbiAgWydzZXREaXN0YW5jZUxpbWl0cycsIDJdLFxuICBbJ3NldERpc3RhbmNlJywgMl1cbl1cblxuQ09NTU9OX01FVEhPRFMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgdmFyIG5hbWUgPSBtZXRob2RbMF1cbiAgdmFyIGFyZ05hbWVzID0gW11cbiAgZm9yKHZhciBpPTA7IGk8bWV0aG9kWzFdOyArK2kpIHtcbiAgICBhcmdOYW1lcy5wdXNoKCdhJytpKVxuICB9XG4gIHZhciBjb2RlID0gJ3ZhciBjYz10aGlzLl9jb250cm9sbGVyTGlzdDtmb3IodmFyIGk9MDtpPGNjLmxlbmd0aDsrK2kpe2NjW2ldLicrbWV0aG9kWzBdKycoJythcmdOYW1lcy5qb2luKCkrJyl9J1xuICBwcm90b1tuYW1lXSA9IEZ1bmN0aW9uLmFwcGx5KG51bGwsIGFyZ05hbWVzLmNvbmNhdChjb2RlKSlcbn0pXG5cbnByb3RvLnJlY2FsY01hdHJpeCA9IGZ1bmN0aW9uKHQpIHtcbiAgdGhpcy5fYWN0aXZlLnJlY2FsY01hdHJpeCh0KVxufVxuXG5wcm90by5nZXREaXN0YW5jZSA9IGZ1bmN0aW9uKHQpIHtcbiAgcmV0dXJuIHRoaXMuX2FjdGl2ZS5nZXREaXN0YW5jZSh0KVxufVxucHJvdG8uZ2V0RGlzdGFuY2VMaW1pdHMgPSBmdW5jdGlvbihvdXQpIHtcbiAgcmV0dXJuIHRoaXMuX2FjdGl2ZS5nZXREaXN0YW5jZUxpbWl0cyhvdXQpXG59XG5cbnByb3RvLmxhc3RUID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9hY3RpdmUubGFzdFQoKVxufVxuXG5wcm90by5zZXRNb2RlID0gZnVuY3Rpb24obW9kZSkge1xuICBpZihtb2RlID09PSB0aGlzLl9tb2RlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIGlkeCA9IHRoaXMuX2NvbnRyb2xsZXJOYW1lcy5pbmRleE9mKG1vZGUpXG4gIGlmKGlkeCA8IDApIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgcHJldiAgPSB0aGlzLl9hY3RpdmVcbiAgdmFyIG5leHQgID0gdGhpcy5fY29udHJvbGxlckxpc3RbaWR4XVxuICB2YXIgbGFzdFQgPSBNYXRoLm1heChwcmV2Lmxhc3RUKCksIG5leHQubGFzdFQoKSlcblxuICBwcmV2LnJlY2FsY01hdHJpeChsYXN0VClcbiAgbmV4dC5zZXRNYXRyaXgobGFzdFQsIHByZXYuY29tcHV0ZWRNYXRyaXgpXG4gIFxuICB0aGlzLl9hY3RpdmUgPSBuZXh0XG4gIHRoaXMuX21vZGUgICA9IG1vZGVcblxuICAvL1VwZGF0ZSBtYXRyaXggcHJvcGVydGllc1xuICB0aGlzLmNvbXB1dGVkTWF0cml4ID0gdGhpcy5fYWN0aXZlLmNvbXB1dGVkTWF0cml4XG4gIHRoaXMuY29tcHV0ZWRFeWUgICAgPSB0aGlzLl9hY3RpdmUuY29tcHV0ZWRFeWVcbiAgdGhpcy5jb21wdXRlZFVwICAgICA9IHRoaXMuX2FjdGl2ZS5jb21wdXRlZFVwXG4gIHRoaXMuY29tcHV0ZWRDZW50ZXIgPSB0aGlzLl9hY3RpdmUuY29tcHV0ZWRDZW50ZXJcbiAgdGhpcy5jb21wdXRlZFJhZGl1cyA9IHRoaXMuX2FjdGl2ZS5jb21wdXRlZFJhZGl1c1xufVxuXG5wcm90by5nZXRNb2RlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9tb2RlXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVZpZXdDb250cm9sbGVyKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICB2YXIgZXllICAgICAgID0gb3B0aW9ucy5leWUgICAgfHwgWzAsMCwxXVxuICB2YXIgY2VudGVyICAgID0gb3B0aW9ucy5jZW50ZXIgfHwgWzAsMCwwXVxuICB2YXIgdXAgICAgICAgID0gb3B0aW9ucy51cCAgICAgfHwgWzAsMSwwXVxuICB2YXIgbGltaXRzICAgID0gb3B0aW9ucy5kaXN0YW5jZUxpbWl0cyB8fCBbMCwgSW5maW5pdHldXG4gIHZhciBtb2RlICAgICAgPSBvcHRpb25zLm1vZGUgICB8fCAndHVybnRhYmxlJ1xuXG4gIHZhciB0dXJudGFibGUgPSBjcmVhdGVUdXJudGFibGUoKVxuICB2YXIgb3JiaXQgICAgID0gY3JlYXRlT3JiaXQoKVxuICB2YXIgbWF0cml4ICAgID0gY3JlYXRlTWF0cml4KClcblxuICB0dXJudGFibGUuc2V0RGlzdGFuY2VMaW1pdHMobGltaXRzWzBdLCBsaW1pdHNbMV0pXG4gIHR1cm50YWJsZS5sb29rQXQoMCwgZXllLCBjZW50ZXIsIHVwKVxuICBvcmJpdC5zZXREaXN0YW5jZUxpbWl0cyhsaW1pdHNbMF0sIGxpbWl0c1sxXSlcbiAgb3JiaXQubG9va0F0KDAsIGV5ZSwgY2VudGVyLCB1cClcbiAgbWF0cml4LnNldERpc3RhbmNlTGltaXRzKGxpbWl0c1swXSwgbGltaXRzWzFdKVxuICBtYXRyaXgubG9va0F0KDAsIGV5ZSwgY2VudGVyLCB1cClcblxuICByZXR1cm4gbmV3IFZpZXdDb250cm9sbGVyKHtcbiAgICB0dXJudGFibGU6IHR1cm50YWJsZSxcbiAgICBvcmJpdDogb3JiaXQsXG4gICAgbWF0cml4OiBtYXRyaXhcbiAgfSwgbW9kZSlcbn0iLCIndXNlIHN0cmljdCdcblxudmFyIHdlYWtNYXAgICAgICA9IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJ3dlYWstbWFwJykgOiBXZWFrTWFwXG52YXIgY3JlYXRlQnVmZmVyID0gcmVxdWlyZSgnZ2wtYnVmZmVyJylcbnZhciBjcmVhdGVWQU8gICAgPSByZXF1aXJlKCdnbC12YW8nKVxuXG52YXIgVHJpYW5nbGVDYWNoZSA9IG5ldyB3ZWFrTWFwKClcblxuZnVuY3Rpb24gY3JlYXRlQUJpZ1RyaWFuZ2xlKGdsKSB7XG5cbiAgdmFyIHRyaWFuZ2xlVkFPID0gVHJpYW5nbGVDYWNoZS5nZXQoZ2wpXG4gIHZhciBoYW5kbGUgPSB0cmlhbmdsZVZBTyAmJiAodHJpYW5nbGVWQU8uX3RyaWFuZ2xlQnVmZmVyLmhhbmRsZSB8fCB0cmlhbmdsZVZBTy5fdHJpYW5nbGVCdWZmZXIuYnVmZmVyKVxuICBpZighaGFuZGxlIHx8ICFnbC5pc0J1ZmZlcihoYW5kbGUpKSB7XG4gICAgdmFyIGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihnbCwgbmV3IEZsb2F0MzJBcnJheShbLTEsIC0xLCAtMSwgNCwgNCwgLTFdKSlcbiAgICB0cmlhbmdsZVZBTyA9IGNyZWF0ZVZBTyhnbCwgW1xuICAgICAgeyBidWZmZXI6IGJ1ZixcbiAgICAgICAgdHlwZTogZ2wuRkxPQVQsXG4gICAgICAgIHNpemU6IDJcbiAgICAgIH1cbiAgICBdKVxuICAgIHRyaWFuZ2xlVkFPLl90cmlhbmdsZUJ1ZmZlciA9IGJ1ZlxuICAgIFRyaWFuZ2xlQ2FjaGUuc2V0KGdsLCB0cmlhbmdsZVZBTylcbiAgfVxuICB0cmlhbmdsZVZBTy5iaW5kKClcbiAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDMpXG4gIHRyaWFuZ2xlVkFPLnVuYmluZCgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQUJpZ1RyaWFuZ2xlXG4iLCJtb2R1bGUuZXhwb3J0cz17XG5cdFwiamV0XCI6W3tcImluZGV4XCI6MCxcInJnYlwiOlswLDAsMTMxXX0se1wiaW5kZXhcIjowLjEyNSxcInJnYlwiOlswLDYwLDE3MF19LHtcImluZGV4XCI6MC4zNzUsXCJyZ2JcIjpbNSwyNTUsMjU1XX0se1wiaW5kZXhcIjowLjYyNSxcInJnYlwiOlsyNTUsMjU1LDBdfSx7XCJpbmRleFwiOjAuODc1LFwicmdiXCI6WzI1MCwwLDBdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMTI4LDAsMF19XSxcblxuXHRcImhzdlwiOlt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbMjU1LDAsMF19LHtcImluZGV4XCI6MC4xNjksXCJyZ2JcIjpbMjUzLDI1NSwyXX0se1wiaW5kZXhcIjowLjE3MyxcInJnYlwiOlsyNDcsMjU1LDJdfSx7XCJpbmRleFwiOjAuMzM3LFwicmdiXCI6WzAsMjUyLDRdfSx7XCJpbmRleFwiOjAuMzQxLFwicmdiXCI6WzAsMjUyLDEwXX0se1wiaW5kZXhcIjowLjUwNixcInJnYlwiOlsxLDI0OSwyNTVdfSx7XCJpbmRleFwiOjAuNjcxLFwicmdiXCI6WzIsMCwyNTNdfSx7XCJpbmRleFwiOjAuNjc1LFwicmdiXCI6WzgsMCwyNTNdfSx7XCJpbmRleFwiOjAuODM5LFwicmdiXCI6WzI1NSwwLDI1MV19LHtcImluZGV4XCI6MC44NDMsXCJyZ2JcIjpbMjU1LDAsMjQ1XX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzI1NSwwLDZdfV0sXG5cblx0XCJob3RcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMCwwXX0se1wiaW5kZXhcIjowLjMsXCJyZ2JcIjpbMjMwLDAsMF19LHtcImluZGV4XCI6MC42LFwicmdiXCI6WzI1NSwyMTAsMF19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMjU1LDI1NV19XSxcblxuXHRcImNvb2xcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMjU1LDI1NV19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMCwyNTVdfV0sXG5cblx0XCJzcHJpbmdcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzI1NSwwLDI1NV19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMjU1LDBdfV0sXG5cblx0XCJzdW1tZXJcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMTI4LDEwMl19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMjU1LDEwMl19XSxcblxuXHRcImF1dHVtblwiOlt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbMjU1LDAsMF19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMjU1LDBdfV0sXG5cblx0XCJ3aW50ZXJcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMCwyNTVdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMCwyNTUsMTI4XX1dLFxuXG5cdFwiYm9uZVwiOlt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbMCwwLDBdfSx7XCJpbmRleFwiOjAuMzc2LFwicmdiXCI6Wzg0LDg0LDExNl19LHtcImluZGV4XCI6MC43NTMsXCJyZ2JcIjpbMTY5LDIwMCwyMDBdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjU1LDI1NSwyNTVdfV0sXG5cblx0XCJjb3BwZXJcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMCwwXX0se1wiaW5kZXhcIjowLjgwNCxcInJnYlwiOlsyNTUsMTYwLDEwMl19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMTk5LDEyN119XSxcblxuXHRcImdyZXlzXCI6W3tcImluZGV4XCI6MCxcInJnYlwiOlswLDAsMF19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMjU1LDI1NV19XSxcblxuXHRcInlpZ25idVwiOlt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbOCwyOSw4OF19LHtcImluZGV4XCI6MC4xMjUsXCJyZ2JcIjpbMzcsNTIsMTQ4XX0se1wiaW5kZXhcIjowLjI1LFwicmdiXCI6WzM0LDk0LDE2OF19LHtcImluZGV4XCI6MC4zNzUsXCJyZ2JcIjpbMjksMTQ1LDE5Ml19LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzY1LDE4MiwxOTZdfSx7XCJpbmRleFwiOjAuNjI1LFwicmdiXCI6WzEyNywyMDUsMTg3XX0se1wiaW5kZXhcIjowLjc1LFwicmdiXCI6WzE5OSwyMzMsMTgwXX0se1wiaW5kZXhcIjowLjg3NSxcInJnYlwiOlsyMzcsMjQ4LDIxN119LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMjU1LDIxN119XSxcblxuXHRcImdyZWVuc1wiOlt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbMCw2OCwyN119LHtcImluZGV4XCI6MC4xMjUsXCJyZ2JcIjpbMCwxMDksNDRdfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbMzUsMTM5LDY5XX0se1wiaW5kZXhcIjowLjM3NSxcInJnYlwiOls2NSwxNzEsOTNdfSx7XCJpbmRleFwiOjAuNSxcInJnYlwiOlsxMTYsMTk2LDExOF19LHtcImluZGV4XCI6MC42MjUsXCJyZ2JcIjpbMTYxLDIxNywxNTVdfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMTk5LDIzMywxOTJdfSx7XCJpbmRleFwiOjAuODc1LFwicmdiXCI6WzIyOSwyNDUsMjI0XX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzI0NywyNTIsMjQ1XX1dLFxuXG5cdFwieWlvcnJkXCI6W3tcImluZGV4XCI6MCxcInJnYlwiOlsxMjgsMCwzOF19LHtcImluZGV4XCI6MC4xMjUsXCJyZ2JcIjpbMTg5LDAsMzhdfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbMjI3LDI2LDI4XX0se1wiaW5kZXhcIjowLjM3NSxcInJnYlwiOlsyNTIsNzgsNDJdfSx7XCJpbmRleFwiOjAuNSxcInJnYlwiOlsyNTMsMTQxLDYwXX0se1wiaW5kZXhcIjowLjYyNSxcInJnYlwiOlsyNTQsMTc4LDc2XX0se1wiaW5kZXhcIjowLjc1LFwicmdiXCI6WzI1NCwyMTcsMTE4XX0se1wiaW5kZXhcIjowLjg3NSxcInJnYlwiOlsyNTUsMjM3LDE2MF19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMjU1LDIwNF19XSxcblxuXHRcImJsdWVyZWRcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMCwyNTVdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjU1LDAsMF19XSxcblxuXHRcInJkYnVcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzUsMTAsMTcyXX0se1wiaW5kZXhcIjowLjM1LFwicmdiXCI6WzEwNiwxMzcsMjQ3XX0se1wiaW5kZXhcIjowLjUsXCJyZ2JcIjpbMTkwLDE5MCwxOTBdfSx7XCJpbmRleFwiOjAuNixcInJnYlwiOlsyMjAsMTcwLDEzMl19LHtcImluZGV4XCI6MC43LFwicmdiXCI6WzIzMCwxNDUsOTBdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMTc4LDEwLDI4XX1dLFxuXG5cdFwicGljbmljXCI6W3tcImluZGV4XCI6MCxcInJnYlwiOlswLDAsMjU1XX0se1wiaW5kZXhcIjowLjEsXCJyZ2JcIjpbNTEsMTUzLDI1NV19LHtcImluZGV4XCI6MC4yLFwicmdiXCI6WzEwMiwyMDQsMjU1XX0se1wiaW5kZXhcIjowLjMsXCJyZ2JcIjpbMTUzLDIwNCwyNTVdfSx7XCJpbmRleFwiOjAuNCxcInJnYlwiOlsyMDQsMjA0LDI1NV19LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzI1NSwyNTUsMjU1XX0se1wiaW5kZXhcIjowLjYsXCJyZ2JcIjpbMjU1LDIwNCwyNTVdfSx7XCJpbmRleFwiOjAuNyxcInJnYlwiOlsyNTUsMTUzLDI1NV19LHtcImluZGV4XCI6MC44LFwicmdiXCI6WzI1NSwxMDIsMjA0XX0se1wiaW5kZXhcIjowLjksXCJyZ2JcIjpbMjU1LDEwMiwxMDJdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjU1LDAsMF19XSxcblxuXHRcInJhaW5ib3dcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzE1MCwwLDkwXX0se1wiaW5kZXhcIjowLjEyNSxcInJnYlwiOlswLDAsMjAwXX0se1wiaW5kZXhcIjowLjI1LFwicmdiXCI6WzAsMjUsMjU1XX0se1wiaW5kZXhcIjowLjM3NSxcInJnYlwiOlswLDE1MiwyNTVdfSx7XCJpbmRleFwiOjAuNSxcInJnYlwiOls0NCwyNTUsMTUwXX0se1wiaW5kZXhcIjowLjYyNSxcInJnYlwiOlsxNTEsMjU1LDBdfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMjU1LDIzNCwwXX0se1wiaW5kZXhcIjowLjg3NSxcInJnYlwiOlsyNTUsMTExLDBdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjU1LDAsMF19XSxcblxuXHRcInBvcnRsYW5kXCI6W3tcImluZGV4XCI6MCxcInJnYlwiOlsxMiw1MSwxMzFdfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbMTAsMTM2LDE4Nl19LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzI0MiwyMTEsNTZdfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMjQyLDE0Myw1Nl19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyMTcsMzAsMzBdfV0sXG5cblx0XCJibGFja2JvZHlcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMCwwXX0se1wiaW5kZXhcIjowLjIsXCJyZ2JcIjpbMjMwLDAsMF19LHtcImluZGV4XCI6MC40LFwicmdiXCI6WzIzMCwyMTAsMF19LHtcImluZGV4XCI6MC43LFwicmdiXCI6WzI1NSwyNTUsMjU1XX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzE2MCwyMDAsMjU1XX1dLFxuXG5cdFwiZWFydGhcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMCwxMzBdfSx7XCJpbmRleFwiOjAuMSxcInJnYlwiOlswLDE4MCwxODBdfSx7XCJpbmRleFwiOjAuMixcInJnYlwiOls0MCwyMTAsNDBdfSx7XCJpbmRleFwiOjAuNCxcInJnYlwiOlsyMzAsMjMwLDUwXX0se1wiaW5kZXhcIjowLjYsXCJyZ2JcIjpbMTIwLDcwLDIwXX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzI1NSwyNTUsMjU1XX1dLFxuXG5cdFwiZWxlY3RyaWNcIjpbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMCwwXX0se1wiaW5kZXhcIjowLjE1LFwicmdiXCI6WzMwLDAsMTAwXX0se1wiaW5kZXhcIjowLjQsXCJyZ2JcIjpbMTIwLDAsMTAwXX0se1wiaW5kZXhcIjowLjYsXCJyZ2JcIjpbMTYwLDkwLDBdfSx7XCJpbmRleFwiOjAuOCxcInJnYlwiOlsyMzAsMjAwLDBdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjU1LDI1MCwyMjBdfV0sXG5cblx0XCJhbHBoYVwiOiBbe1wiaW5kZXhcIjowLCBcInJnYlwiOiBbMjU1LDI1NSwyNTUsMF19LHtcImluZGV4XCI6MSwgXCJyZ2JcIjogWzI1NSwyNTUsMjU1LDFdfV0sXG5cblx0XCJ2aXJpZGlzXCI6IFt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbNjgsMSw4NF19LHtcImluZGV4XCI6MC4xMyxcInJnYlwiOls3MSw0NCwxMjJdfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbNTksODEsMTM5XX0se1wiaW5kZXhcIjowLjM4LFwicmdiXCI6WzQ0LDExMywxNDJdfSx7XCJpbmRleFwiOjAuNSxcInJnYlwiOlszMywxNDQsMTQxXX0se1wiaW5kZXhcIjowLjYzLFwicmdiXCI6WzM5LDE3MywxMjldfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbOTIsMjAwLDk5XX0se1wiaW5kZXhcIjowLjg4LFwicmdiXCI6WzE3MCwyMjAsNTBdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjUzLDIzMSwzN119XSxcblxuXHRcImluZmVybm9cIjogW3tcImluZGV4XCI6MCxcInJnYlwiOlswLDAsNF19LHtcImluZGV4XCI6MC4xMyxcInJnYlwiOlszMSwxMiw3Ml19LHtcImluZGV4XCI6MC4yNSxcInJnYlwiOls4NSwxNSwxMDldfSx7XCJpbmRleFwiOjAuMzgsXCJyZ2JcIjpbMTM2LDM0LDEwNl19LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzE4Niw1NCw4NV19LHtcImluZGV4XCI6MC42MyxcInJnYlwiOlsyMjcsODksNTFdfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMjQ5LDE0MCwxMF19LHtcImluZGV4XCI6MC44OCxcInJnYlwiOlsyNDksMjAxLDUwXX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzI1MiwyNTUsMTY0XX1dLFxuXG5cdFwibWFnbWFcIjogW3tcImluZGV4XCI6MCxcInJnYlwiOlswLDAsNF19LHtcImluZGV4XCI6MC4xMyxcInJnYlwiOlsyOCwxNiw2OF19LHtcImluZGV4XCI6MC4yNSxcInJnYlwiOls3OSwxOCwxMjNdfSx7XCJpbmRleFwiOjAuMzgsXCJyZ2JcIjpbMTI5LDM3LDEyOV19LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzE4MSw1NCwxMjJdfSx7XCJpbmRleFwiOjAuNjMsXCJyZ2JcIjpbMjI5LDgwLDEwMF19LHtcImluZGV4XCI6MC43NSxcInJnYlwiOlsyNTEsMTM1LDk3XX0se1wiaW5kZXhcIjowLjg4LFwicmdiXCI6WzI1NCwxOTQsMTM1XX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzI1MiwyNTMsMTkxXX1dLFxuXG5cdFwicGxhc21hXCI6IFt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbMTMsOCwxMzVdfSx7XCJpbmRleFwiOjAuMTMsXCJyZ2JcIjpbNzUsMywxNjFdfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbMTI1LDMsMTY4XX0se1wiaW5kZXhcIjowLjM4LFwicmdiXCI6WzE2OCwzNCwxNTBdfSx7XCJpbmRleFwiOjAuNSxcInJnYlwiOlsyMDMsNzAsMTIxXX0se1wiaW5kZXhcIjowLjYzLFwicmdiXCI6WzIyOSwxMDcsOTNdfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMjQ4LDE0OCw2NV19LHtcImluZGV4XCI6MC44OCxcInJnYlwiOlsyNTMsMTk1LDQwXX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzI0MCwyNDksMzNdfV0sXG5cblx0XCJ3YXJtXCI6IFt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbMTI1LDAsMTc5XX0se1wiaW5kZXhcIjowLjEzLFwicmdiXCI6WzE3MiwwLDE4N119LHtcImluZGV4XCI6MC4yNSxcInJnYlwiOlsyMTksMCwxNzBdfSx7XCJpbmRleFwiOjAuMzgsXCJyZ2JcIjpbMjU1LDAsMTMwXX0se1wiaW5kZXhcIjowLjUsXCJyZ2JcIjpbMjU1LDYzLDc0XX0se1wiaW5kZXhcIjowLjYzLFwicmdiXCI6WzI1NSwxMjMsMF19LHtcImluZGV4XCI6MC43NSxcInJnYlwiOlsyMzQsMTc2LDBdfSx7XCJpbmRleFwiOjAuODgsXCJyZ2JcIjpbMTkwLDIyOCwwXX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzE0NywyNTUsMF19XSxcblxuXHRcImNvb2xcIjogW3tcImluZGV4XCI6MCxcInJnYlwiOlsxMjUsMCwxNzldfSx7XCJpbmRleFwiOjAuMTMsXCJyZ2JcIjpbMTE2LDAsMjE4XX0se1wiaW5kZXhcIjowLjI1LFwicmdiXCI6Wzk4LDc0LDIzN119LHtcImluZGV4XCI6MC4zOCxcInJnYlwiOls2OCwxNDYsMjMxXX0se1wiaW5kZXhcIjowLjUsXCJyZ2JcIjpbMCwyMDQsMTk3XX0se1wiaW5kZXhcIjowLjYzLFwicmdiXCI6WzAsMjQ3LDE0Nl19LHtcImluZGV4XCI6MC43NSxcInJnYlwiOlswLDI1NSw4OF19LHtcImluZGV4XCI6MC44OCxcInJnYlwiOls0MCwyNTUsOF19LHtcImluZGV4XCI6MSxcInJnYlwiOlsxNDcsMjU1LDBdfV0sXG5cblx0XCJyYWluYm93LXNvZnRcIjogW3tcImluZGV4XCI6MCxcInJnYlwiOlsxMjUsMCwxNzldfSx7XCJpbmRleFwiOjAuMSxcInJnYlwiOlsxOTksMCwxODBdfSx7XCJpbmRleFwiOjAuMixcInJnYlwiOlsyNTUsMCwxMjFdfSx7XCJpbmRleFwiOjAuMyxcInJnYlwiOlsyNTUsMTA4LDBdfSx7XCJpbmRleFwiOjAuNCxcInJnYlwiOlsyMjIsMTk0LDBdfSx7XCJpbmRleFwiOjAuNSxcInJnYlwiOlsxNTAsMjU1LDBdfSx7XCJpbmRleFwiOjAuNixcInJnYlwiOlswLDI1NSw1NV19LHtcImluZGV4XCI6MC43LFwicmdiXCI6WzAsMjQ2LDE1MF19LHtcImluZGV4XCI6MC44LFwicmdiXCI6WzUwLDE2NywyMjJdfSx7XCJpbmRleFwiOjAuOSxcInJnYlwiOlsxMDMsNTEsMjM1XX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzEyNCwwLDE4Nl19XSxcblxuXHRcImJhdGh5bWV0cnlcIjogW3tcImluZGV4XCI6MCxcInJnYlwiOls0MCwyNiw0NF19LHtcImluZGV4XCI6MC4xMyxcInJnYlwiOls1OSw0OSw5MF19LHtcImluZGV4XCI6MC4yNSxcInJnYlwiOls2NCw3NiwxMzldfSx7XCJpbmRleFwiOjAuMzgsXCJyZ2JcIjpbNjMsMTEwLDE1MV19LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzcyLDE0MiwxNThdfSx7XCJpbmRleFwiOjAuNjMsXCJyZ2JcIjpbODUsMTc0LDE2M119LHtcImluZGV4XCI6MC43NSxcInJnYlwiOlsxMjAsMjA2LDE2M119LHtcImluZGV4XCI6MC44OCxcInJnYlwiOlsxODcsMjMwLDE3Ml19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTMsMjU0LDIwNF19XSxcblxuXHRcImNkb21cIjogW3tcImluZGV4XCI6MCxcInJnYlwiOls0NywxNSw2Ml19LHtcImluZGV4XCI6MC4xMyxcInJnYlwiOls4NywyMyw4Nl19LHtcImluZGV4XCI6MC4yNSxcInJnYlwiOlsxMzAsMjgsOTldfSx7XCJpbmRleFwiOjAuMzgsXCJyZ2JcIjpbMTcxLDQxLDk2XX0se1wiaW5kZXhcIjowLjUsXCJyZ2JcIjpbMjA2LDY3LDg2XX0se1wiaW5kZXhcIjowLjYzLFwicmdiXCI6WzIzMCwxMDYsODRdfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMjQyLDE0OSwxMDNdfSx7XCJpbmRleFwiOjAuODgsXCJyZ2JcIjpbMjQ5LDE5MywxMzVdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjU0LDIzNywxNzZdfV0sXG5cblx0XCJjaGxvcm9waHlsbFwiOiBbe1wiaW5kZXhcIjowLFwicmdiXCI6WzE4LDM2LDIwXX0se1wiaW5kZXhcIjowLjEzLFwicmdiXCI6WzI1LDYzLDQxXX0se1wiaW5kZXhcIjowLjI1LFwicmdiXCI6WzI0LDkxLDU5XX0se1wiaW5kZXhcIjowLjM4LFwicmdiXCI6WzEzLDExOSw3Ml19LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzE4LDE0OCw4MF19LHtcImluZGV4XCI6MC42MyxcInJnYlwiOls4MCwxNzMsODldfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMTMyLDE5NiwxMjJdfSx7XCJpbmRleFwiOjAuODgsXCJyZ2JcIjpbMTc1LDIyMSwxNjJdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjE1LDI0OSwyMDhdfV0sXG5cblx0XCJkZW5zaXR5XCI6IFt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbNTQsMTQsMzZdfSx7XCJpbmRleFwiOjAuMTMsXCJyZ2JcIjpbODksMjMsODBdfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbMTEwLDQ1LDEzMl19LHtcImluZGV4XCI6MC4zOCxcInJnYlwiOlsxMjAsNzcsMTc4XX0se1wiaW5kZXhcIjowLjUsXCJyZ2JcIjpbMTIwLDExMywyMTNdfSx7XCJpbmRleFwiOjAuNjMsXCJyZ2JcIjpbMTE1LDE1MSwyMjhdfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMTM0LDE4NSwyMjddfSx7XCJpbmRleFwiOjAuODgsXCJyZ2JcIjpbMTc3LDIxNCwyMjddfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjMwLDI0MSwyNDFdfV0sXG5cblx0XCJmcmVlc3VyZmFjZS1ibHVlXCI6IFt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbMzAsNCwxMTBdfSx7XCJpbmRleFwiOjAuMTMsXCJyZ2JcIjpbNDcsMTQsMTc2XX0se1wiaW5kZXhcIjowLjI1LFwicmdiXCI6WzQxLDQ1LDIzNl19LHtcImluZGV4XCI6MC4zOCxcInJnYlwiOlsyNSw5OSwyMTJdfSx7XCJpbmRleFwiOjAuNSxcInJnYlwiOls2OCwxMzEsMjAwXX0se1wiaW5kZXhcIjowLjYzLFwicmdiXCI6WzExNCwxNTYsMTk3XX0se1wiaW5kZXhcIjowLjc1LFwicmdiXCI6WzE1NywxODEsMjAzXX0se1wiaW5kZXhcIjowLjg4LFwicmdiXCI6WzIwMCwyMDgsMjE2XX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzI0MSwyMzcsMjM2XX1dLFxuXG5cdFwiZnJlZXN1cmZhY2UtcmVkXCI6IFt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbNjAsOSwxOF19LHtcImluZGV4XCI6MC4xMyxcInJnYlwiOlsxMDAsMTcsMjddfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbMTQyLDIwLDI5XX0se1wiaW5kZXhcIjowLjM4LFwicmdiXCI6WzE3Nyw0MywyN119LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzE5Miw4Nyw2M119LHtcImluZGV4XCI6MC42MyxcInJnYlwiOlsyMDUsMTI1LDEwNV19LHtcImluZGV4XCI6MC43NSxcInJnYlwiOlsyMTYsMTYyLDE0OF19LHtcImluZGV4XCI6MC44OCxcInJnYlwiOlsyMjcsMTk5LDE5M119LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNDEsMjM3LDIzNl19XSxcblxuXHRcIm94eWdlblwiOiBbe1wiaW5kZXhcIjowLFwicmdiXCI6WzY0LDUsNV19LHtcImluZGV4XCI6MC4xMyxcInJnYlwiOlsxMDYsNiwxNV19LHtcImluZGV4XCI6MC4yNSxcInJnYlwiOlsxNDQsMjYsN119LHtcImluZGV4XCI6MC4zOCxcInJnYlwiOlsxNjgsNjQsM119LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzE4OCwxMDAsNF19LHtcImluZGV4XCI6MC42MyxcInJnYlwiOlsyMDYsMTM2LDExXX0se1wiaW5kZXhcIjowLjc1LFwicmdiXCI6WzIyMCwxNzQsMjVdfSx7XCJpbmRleFwiOjAuODgsXCJyZ2JcIjpbMjMxLDIxNSw0NF19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNDgsMjU0LDEwNV19XSxcblxuXHRcInBhclwiOiBbe1wiaW5kZXhcIjowLFwicmdiXCI6WzUxLDIwLDI0XX0se1wiaW5kZXhcIjowLjEzLFwicmdiXCI6WzkwLDMyLDM1XX0se1wiaW5kZXhcIjowLjI1LFwicmdiXCI6WzEyOSw0NCwzNF19LHtcImluZGV4XCI6MC4zOCxcInJnYlwiOlsxNTksNjgsMjVdfSx7XCJpbmRleFwiOjAuNSxcInJnYlwiOlsxODIsOTksMTldfSx7XCJpbmRleFwiOjAuNjMsXCJyZ2JcIjpbMTk5LDEzNCwyMl19LHtcImluZGV4XCI6MC43NSxcInJnYlwiOlsyMTIsMTcxLDM1XX0se1wiaW5kZXhcIjowLjg4LFwicmdiXCI6WzIyMSwyMTAsNTRdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjI1LDI1Myw3NV19XSxcblxuXHRcInBoYXNlXCI6IFt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbMTQ1LDEwNSwxOF19LHtcImluZGV4XCI6MC4xMyxcInJnYlwiOlsxODQsNzEsMzhdfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbMTg2LDU4LDExNV19LHtcImluZGV4XCI6MC4zOCxcInJnYlwiOlsxNjAsNzEsMTg1XX0se1wiaW5kZXhcIjowLjUsXCJyZ2JcIjpbMTEwLDk3LDIxOF19LHtcImluZGV4XCI6MC42MyxcInJnYlwiOls1MCwxMjMsMTY0XX0se1wiaW5kZXhcIjowLjc1LFwicmdiXCI6WzMxLDEzMSwxMTBdfSx7XCJpbmRleFwiOjAuODgsXCJyZ2JcIjpbNzcsMTI5LDM0XX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzE0NSwxMDUsMThdfV0sXG5cblx0XCJzYWxpbml0eVwiOiBbe1wiaW5kZXhcIjowLFwicmdiXCI6WzQyLDI0LDEwOF19LHtcImluZGV4XCI6MC4xMyxcInJnYlwiOlszMyw1MCwxNjJdfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbMTUsOTAsMTQ1XX0se1wiaW5kZXhcIjowLjM4LFwicmdiXCI6WzQwLDExOCwxMzddfSx7XCJpbmRleFwiOjAuNSxcInJnYlwiOls1OSwxNDYsMTM1XX0se1wiaW5kZXhcIjowLjYzLFwicmdiXCI6Wzc5LDE3NSwxMjZdfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMTIwLDIwMywxMDRdfSx7XCJpbmRleFwiOjAuODgsXCJyZ2JcIjpbMTkzLDIyMSwxMDBdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjUzLDIzOSwxNTRdfV0sXG5cblx0XCJ0ZW1wZXJhdHVyZVwiOiBbe1wiaW5kZXhcIjowLFwicmdiXCI6WzQsMzUsNTFdfSx7XCJpbmRleFwiOjAuMTMsXCJyZ2JcIjpbMjMsNTEsMTIyXX0se1wiaW5kZXhcIjowLjI1LFwicmdiXCI6Wzg1LDU5LDE1N119LHtcImluZGV4XCI6MC4zOCxcInJnYlwiOlsxMjksNzksMTQzXX0se1wiaW5kZXhcIjowLjUsXCJyZ2JcIjpbMTc1LDk1LDEzMF19LHtcImluZGV4XCI6MC42MyxcInJnYlwiOlsyMjIsMTEyLDEwMV19LHtcImluZGV4XCI6MC43NSxcInJnYlwiOlsyNDksMTQ2LDY2XX0se1wiaW5kZXhcIjowLjg4LFwicmdiXCI6WzI0OSwxOTYsNjVdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjMyLDI1MCw5MV19XSxcblxuXHRcInR1cmJpZGl0eVwiOiBbe1wiaW5kZXhcIjowLFwicmdiXCI6WzM0LDMxLDI3XX0se1wiaW5kZXhcIjowLjEzLFwicmdiXCI6WzY1LDUwLDQxXX0se1wiaW5kZXhcIjowLjI1LFwicmdiXCI6Wzk4LDY5LDUyXX0se1wiaW5kZXhcIjowLjM4LFwicmdiXCI6WzEzMSw4OSw1N119LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzE2MSwxMTIsNTldfSx7XCJpbmRleFwiOjAuNjMsXCJyZ2JcIjpbMTg1LDE0MCw2Nl19LHtcImluZGV4XCI6MC43NSxcInJnYlwiOlsyMDIsMTc0LDg4XX0se1wiaW5kZXhcIjowLjg4LFwicmdiXCI6WzIxNiwyMDksMTI2XX0se1wiaW5kZXhcIjoxLFwicmdiXCI6WzIzMywyNDYsMTcxXX1dLFxuXG5cdFwidmVsb2NpdHktYmx1ZVwiOiBbe1wiaW5kZXhcIjowLFwicmdiXCI6WzE3LDMyLDY0XX0se1wiaW5kZXhcIjowLjEzLFwicmdiXCI6WzM1LDUyLDExNl19LHtcImluZGV4XCI6MC4yNSxcInJnYlwiOlsyOSw4MSwxNTZdfSx7XCJpbmRleFwiOjAuMzgsXCJyZ2JcIjpbMzEsMTEzLDE2Ml19LHtcImluZGV4XCI6MC41LFwicmdiXCI6WzUwLDE0NCwxNjldfSx7XCJpbmRleFwiOjAuNjMsXCJyZ2JcIjpbODcsMTczLDE3Nl19LHtcImluZGV4XCI6MC43NSxcInJnYlwiOlsxNDksMTk2LDE4OV19LHtcImluZGV4XCI6MC44OCxcInJnYlwiOlsyMDMsMjIxLDIxMV19LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTQsMjUxLDIzMF19XSxcblxuXHRcInZlbG9jaXR5LWdyZWVuXCI6IFt7XCJpbmRleFwiOjAsXCJyZ2JcIjpbMjMsMzUsMTldfSx7XCJpbmRleFwiOjAuMTMsXCJyZ2JcIjpbMjQsNjQsMzhdfSx7XCJpbmRleFwiOjAuMjUsXCJyZ2JcIjpbMTEsOTUsNDVdfSx7XCJpbmRleFwiOjAuMzgsXCJyZ2JcIjpbMzksMTIzLDM1XX0se1wiaW5kZXhcIjowLjUsXCJyZ2JcIjpbOTUsMTQ2LDEyXX0se1wiaW5kZXhcIjowLjYzLFwicmdiXCI6WzE1MiwxNjUsMThdfSx7XCJpbmRleFwiOjAuNzUsXCJyZ2JcIjpbMjAxLDE4Niw2OV19LHtcImluZGV4XCI6MC44OCxcInJnYlwiOlsyMzMsMjE2LDEzN119LHtcImluZGV4XCI6MSxcInJnYlwiOlsyNTUsMjUzLDIwNV19XSxcblxuXHRcImN1YmVoZWxpeFwiOiBbe1wiaW5kZXhcIjowLFwicmdiXCI6WzAsMCwwXX0se1wiaW5kZXhcIjowLjA3LFwicmdiXCI6WzIyLDUsNTldfSx7XCJpbmRleFwiOjAuMTMsXCJyZ2JcIjpbNjAsNCwxMDVdfSx7XCJpbmRleFwiOjAuMixcInJnYlwiOlsxMDksMSwxMzVdfSx7XCJpbmRleFwiOjAuMjcsXCJyZ2JcIjpbMTYxLDAsMTQ3XX0se1wiaW5kZXhcIjowLjMzLFwicmdiXCI6WzIxMCwyLDE0Ml19LHtcImluZGV4XCI6MC40LFwicmdiXCI6WzI1MSwxMSwxMjNdfSx7XCJpbmRleFwiOjAuNDcsXCJyZ2JcIjpbMjU1LDI5LDk3XX0se1wiaW5kZXhcIjowLjUzLFwicmdiXCI6WzI1NSw1NCw2OV19LHtcImluZGV4XCI6MC42LFwicmdiXCI6WzI1NSw4NSw0Nl19LHtcImluZGV4XCI6MC42NyxcInJnYlwiOlsyNTUsMTIwLDM0XX0se1wiaW5kZXhcIjowLjczLFwicmdiXCI6WzI1NSwxNTcsMzddfSx7XCJpbmRleFwiOjAuOCxcInJnYlwiOlsyNDEsMTkxLDU3XX0se1wiaW5kZXhcIjowLjg3LFwicmdiXCI6WzIyNCwyMjAsOTNdfSx7XCJpbmRleFwiOjAuOTMsXCJyZ2JcIjpbMjE4LDI0MSwxNDJdfSx7XCJpbmRleFwiOjEsXCJyZ2JcIjpbMjI3LDI1MywxOThdfV1cbn07XG4iLCIvKlxuICogQmVuIFBvc3RsZXRod2FpdGVcbiAqIEphbnVhcnkgMjAxM1xuICogTGljZW5zZSBNSVRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3JTY2FsZSA9IHJlcXVpcmUoJy4vY29sb3JTY2FsZScpO1xudmFyIGxlcnAgPSByZXF1aXJlKCdsZXJwJylcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDb2xvcm1hcDtcblxuZnVuY3Rpb24gY3JlYXRlQ29sb3JtYXAgKHNwZWMpIHtcbiAgICAvKlxuICAgICAqIERlZmF1bHQgT3B0aW9uc1xuICAgICAqL1xuICAgIHZhciBpbmRpY2llcywgZnJvbXJnYmEsIHRvcmdiYSxcbiAgICAgICAgbnN0ZXBzLCBjbWFwLCBjb2xvcm1hcCwgZm9ybWF0LFxuICAgICAgICBuc2hhZGVzLCBjb2xvcnMsIGFscGhhLCBpO1xuXG4gICAgaWYgKCAhc3BlYyApIHNwZWMgPSB7fTtcblxuICAgIG5zaGFkZXMgPSAoc3BlYy5uc2hhZGVzIHx8IDcyKSAtIDE7XG4gICAgZm9ybWF0ID0gc3BlYy5mb3JtYXQgfHwgJ2hleCc7XG5cbiAgICBjb2xvcm1hcCA9IHNwZWMuY29sb3JtYXA7XG4gICAgaWYgKCFjb2xvcm1hcCkgY29sb3JtYXAgPSAnamV0JztcblxuICAgIGlmICh0eXBlb2YgY29sb3JtYXAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbG9ybWFwID0gY29sb3JtYXAudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoIWNvbG9yU2NhbGVbY29sb3JtYXBdKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihjb2xvcm1hcCArICcgbm90IGEgc3VwcG9ydGVkIGNvbG9yc2NhbGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNtYXAgPSBjb2xvclNjYWxlW2NvbG9ybWFwXTtcblxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb2xvcm1hcCkpIHtcbiAgICAgICAgY21hcCA9IGNvbG9ybWFwLnNsaWNlKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcigndW5zdXBwb3J0ZWQgY29sb3JtYXAgb3B0aW9uJywgY29sb3JtYXApO1xuICAgIH1cblxuICAgIGlmIChjbWFwLmxlbmd0aCA+IG5zaGFkZXMgKyAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGNvbG9ybWFwKycgbWFwIHJlcXVpcmVzIG5zaGFkZXMgdG8gYmUgYXQgbGVhc3Qgc2l6ZSAnK2NtYXAubGVuZ3RoXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNwZWMuYWxwaGEpKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzcGVjLmFscGhhID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgYWxwaGEgPSBbc3BlYy5hbHBoYSwgc3BlYy5hbHBoYV07XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFscGhhID0gWzEsIDFdO1xuICAgICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKHNwZWMuYWxwaGEubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgIGFscGhhID0gWzEsIDFdO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWxwaGEgPSBzcGVjLmFscGhhLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgLy8gbWFwIGluZGV4IHBvaW50cyBmcm9tIDAuLjEgdG8gMC4ubi0xXG4gICAgaW5kaWNpZXMgPSBjbWFwLm1hcChmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGMuaW5kZXggKiBuc2hhZGVzKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBhbHBoYSBjaGFubmVsIHRvIHRoZSBtYXBcbiAgICBhbHBoYVswXSA9IE1hdGgubWluKE1hdGgubWF4KGFscGhhWzBdLCAwKSwgMSk7XG4gICAgYWxwaGFbMV0gPSBNYXRoLm1pbihNYXRoLm1heChhbHBoYVsxXSwgMCksIDEpO1xuXG4gICAgdmFyIHN0ZXBzID0gY21hcC5tYXAoZnVuY3Rpb24oYywgaSkge1xuICAgICAgICB2YXIgaW5kZXggPSBjbWFwW2ldLmluZGV4XG5cbiAgICAgICAgdmFyIHJnYmEgPSBjbWFwW2ldLnJnYi5zbGljZSgpO1xuXG4gICAgICAgIC8vIGlmIHVzZXIgc3VwcGxpZXMgdGhlaXIgb3duIG1hcCB1c2UgaXRcbiAgICAgICAgaWYgKHJnYmEubGVuZ3RoID09PSA0ICYmIHJnYmFbM10gPj0gMCAmJiByZ2JhWzNdIDw9IDEpIHtcbiAgICAgICAgICAgIHJldHVybiByZ2JhXG4gICAgICAgIH1cbiAgICAgICAgcmdiYVszXSA9IGFscGhhWzBdICsgKGFscGhhWzFdIC0gYWxwaGFbMF0pKmluZGV4O1xuXG4gICAgICAgIHJldHVybiByZ2JhXG4gICAgfSlcblxuXG4gICAgLypcbiAgICAgKiBtYXAgaW5jcmVhc2luZyBsaW5lYXIgdmFsdWVzIGJldHdlZW4gaW5kaWNpZXMgdG9cbiAgICAgKiBsaW5lYXIgc3RlcHMgaW4gY29sb3J2YWx1ZXNcbiAgICAgKi9cbiAgICB2YXIgY29sb3JzID0gW11cbiAgICBmb3IgKGkgPSAwOyBpIDwgaW5kaWNpZXMubGVuZ3RoLTE7ICsraSkge1xuICAgICAgICBuc3RlcHMgPSBpbmRpY2llc1tpKzFdIC0gaW5kaWNpZXNbaV07XG4gICAgICAgIGZyb21yZ2JhID0gc3RlcHNbaV07XG4gICAgICAgIHRvcmdiYSA9IHN0ZXBzW2krMV07XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuc3RlcHM7IGorKykge1xuICAgICAgICAgICAgdmFyIGFtdCA9IGogLyBuc3RlcHNcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKFtcbiAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKGxlcnAoZnJvbXJnYmFbMF0sIHRvcmdiYVswXSwgYW10KSksXG4gICAgICAgICAgICAgICAgTWF0aC5yb3VuZChsZXJwKGZyb21yZ2JhWzFdLCB0b3JnYmFbMV0sIGFtdCkpLFxuICAgICAgICAgICAgICAgIE1hdGgucm91bmQobGVycChmcm9tcmdiYVsyXSwgdG9yZ2JhWzJdLCBhbXQpKSxcbiAgICAgICAgICAgICAgICBsZXJwKGZyb21yZ2JhWzNdLCB0b3JnYmFbM10sIGFtdClcbiAgICAgICAgICAgIF0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2FkZCAxIHN0ZXAgYXMgbGFzdCB2YWx1ZVxuICAgIGNvbG9ycy5wdXNoKGNtYXBbY21hcC5sZW5ndGggLSAxXS5yZ2IuY29uY2F0KGFscGhhWzFdKSlcblxuICAgIGlmIChmb3JtYXQgPT09ICdoZXgnKSBjb2xvcnMgPSBjb2xvcnMubWFwKCByZ2IyaGV4ICk7XG4gICAgZWxzZSBpZiAoZm9ybWF0ID09PSAncmdiYVN0cmluZycpIGNvbG9ycyA9IGNvbG9ycy5tYXAoIHJnYmFTdHIgKTtcbiAgICBlbHNlIGlmIChmb3JtYXQgPT09ICdmbG9hdCcpIGNvbG9ycyA9IGNvbG9ycy5tYXAoIHJnYjJmbG9hdCApO1xuXG4gICAgcmV0dXJuIGNvbG9ycztcbn07XG5cbmZ1bmN0aW9uIHJnYjJmbG9hdCAocmdiYSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIHJnYmFbMF0gLyAyNTUsXG4gICAgICAgIHJnYmFbMV0gLyAyNTUsXG4gICAgICAgIHJnYmFbMl0gLyAyNTUsXG4gICAgICAgIHJnYmFbM11cbiAgICBdXG59XG5cbmZ1bmN0aW9uIHJnYjJoZXggKHJnYmEpIHtcbiAgICB2YXIgZGlnLCBoZXggPSAnIyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgZGlnID0gcmdiYVtpXTtcbiAgICAgICAgZGlnID0gZGlnLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgaGV4ICs9ICgnMDAnICsgZGlnKS5zdWJzdHIoIGRpZy5sZW5ndGggKTtcbiAgICB9XG4gICAgcmV0dXJuIGhleDtcbn1cblxuZnVuY3Rpb24gcmdiYVN0ciAocmdiYSkge1xuICAgIHJldHVybiAncmdiYSgnICsgcmdiYS5qb2luKCcsJykgKyAnKSc7XG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBkY3ViaWNIZXJtaXRlKHAwLCB2MCwgcDEsIHYxLCB0LCBmKSB7XG4gIHZhciBkaDAwID0gNip0KnQtNip0LFxuICAgICAgZGgxMCA9IDMqdCp0LTQqdCArIDEsXG4gICAgICBkaDAxID0gLTYqdCp0KzYqdCxcbiAgICAgIGRoMTEgPSAzKnQqdC0yKnRcbiAgaWYocDAubGVuZ3RoKSB7XG4gICAgaWYoIWYpIHtcbiAgICAgIGYgPSBuZXcgQXJyYXkocDAubGVuZ3RoKVxuICAgIH1cbiAgICBmb3IodmFyIGk9cDAubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgICAgZltpXSA9IGRoMDAqcDBbaV0gKyBkaDEwKnYwW2ldICsgZGgwMSpwMVtpXSArIGRoMTEqdjFbaV1cbiAgICB9XG4gICAgcmV0dXJuIGZcbiAgfVxuICByZXR1cm4gZGgwMCpwMCArIGRoMTAqdjAgKyBkaDAxKnAxW2ldICsgZGgxMSp2MVxufVxuXG5mdW5jdGlvbiBjdWJpY0hlcm1pdGUocDAsIHYwLCBwMSwgdjEsIHQsIGYpIHtcbiAgdmFyIHRpICA9ICh0LTEpLCB0MiA9IHQqdCwgdGkyID0gdGkqdGksXG4gICAgICBoMDAgPSAoMSsyKnQpKnRpMixcbiAgICAgIGgxMCA9IHQqdGkyLFxuICAgICAgaDAxID0gdDIqKDMtMip0KSxcbiAgICAgIGgxMSA9IHQyKnRpXG4gIGlmKHAwLmxlbmd0aCkge1xuICAgIGlmKCFmKSB7XG4gICAgICBmID0gbmV3IEFycmF5KHAwLmxlbmd0aClcbiAgICB9XG4gICAgZm9yKHZhciBpPXAwLmxlbmd0aC0xOyBpPj0wOyAtLWkpIHtcbiAgICAgIGZbaV0gPSBoMDAqcDBbaV0gKyBoMTAqdjBbaV0gKyBoMDEqcDFbaV0gKyBoMTEqdjFbaV1cbiAgICB9XG4gICAgcmV0dXJuIGZcbiAgfVxuICByZXR1cm4gaDAwKnAwICsgaDEwKnYwICsgaDAxKnAxICsgaDExKnYxXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3ViaWNIZXJtaXRlXG5tb2R1bGUuZXhwb3J0cy5kZXJpdmF0aXZlID0gZGN1YmljSGVybWl0ZSIsIlwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0gZXh0cmFjdFBsYW5lc1xuXG5mdW5jdGlvbiBleHRyYWN0UGxhbmVzKE0sIHpOZWFyLCB6RmFyKSB7XG4gIHZhciB6ICA9IHpOZWFyIHx8IDAuMFxuICB2YXIgemYgPSB6RmFyIHx8IDEuMFxuICByZXR1cm4gW1xuICAgIFsgTVsxMl0gKyBNWzBdLCBNWzEzXSArIE1bMV0sIE1bMTRdICsgTVsyXSwgTVsxNV0gKyBNWzNdIF0sXG4gICAgWyBNWzEyXSAtIE1bMF0sIE1bMTNdIC0gTVsxXSwgTVsxNF0gLSBNWzJdLCBNWzE1XSAtIE1bM10gXSxcbiAgICBbIE1bMTJdICsgTVs0XSwgTVsxM10gKyBNWzVdLCBNWzE0XSArIE1bNl0sIE1bMTVdICsgTVs3XSBdLFxuICAgIFsgTVsxMl0gLSBNWzRdLCBNWzEzXSAtIE1bNV0sIE1bMTRdIC0gTVs2XSwgTVsxNV0gLSBNWzddIF0sXG4gICAgWyB6Kk1bMTJdICsgTVs4XSwgeipNWzEzXSArIE1bOV0sIHoqTVsxNF0gKyBNWzEwXSwgeipNWzE1XSArIE1bMTFdIF0sXG4gICAgWyB6ZipNWzEyXSAtIE1bOF0sIHpmKk1bMTNdIC0gTVs5XSwgemYqTVsxNF0gLSBNWzEwXSwgemYqTVsxNV0gLSBNWzExXSBdXG4gIF1cbn0iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVGaWx0ZXJlZFZlY3RvclxuXG52YXIgY3ViaWNIZXJtaXRlID0gcmVxdWlyZSgnY3ViaWMtaGVybWl0ZScpXG52YXIgYnNlYXJjaCA9IHJlcXVpcmUoJ2JpbmFyeS1zZWFyY2gtYm91bmRzJylcblxuZnVuY3Rpb24gY2xhbXAobG8sIGhpLCB4KSB7XG4gIHJldHVybiBNYXRoLm1pbihoaSwgTWF0aC5tYXgobG8sIHgpKVxufVxuXG5mdW5jdGlvbiBGaWx0ZXJlZFZlY3RvcihzdGF0ZTAsIHZlbG9jaXR5MCwgdDApIHtcbiAgdGhpcy5kaW1lbnNpb24gID0gc3RhdGUwLmxlbmd0aFxuICB0aGlzLmJvdW5kcyAgICAgPSBbIG5ldyBBcnJheSh0aGlzLmRpbWVuc2lvbiksIG5ldyBBcnJheSh0aGlzLmRpbWVuc2lvbikgXVxuICBmb3IodmFyIGk9MDsgaTx0aGlzLmRpbWVuc2lvbjsgKytpKSB7XG4gICAgdGhpcy5ib3VuZHNbMF1baV0gPSAtSW5maW5pdHlcbiAgICB0aGlzLmJvdW5kc1sxXVtpXSA9IEluZmluaXR5XG4gIH1cbiAgdGhpcy5fc3RhdGUgICAgID0gc3RhdGUwLnNsaWNlKCkucmV2ZXJzZSgpXG4gIHRoaXMuX3ZlbG9jaXR5ICA9IHZlbG9jaXR5MC5zbGljZSgpLnJldmVyc2UoKVxuICB0aGlzLl90aW1lICAgICAgPSBbIHQwIF1cbiAgdGhpcy5fc2NyYXRjaCAgID0gWyBzdGF0ZTAuc2xpY2UoKSwgc3RhdGUwLnNsaWNlKCksIHN0YXRlMC5zbGljZSgpLCBzdGF0ZTAuc2xpY2UoKSwgc3RhdGUwLnNsaWNlKCkgXVxufVxuXG52YXIgcHJvdG8gPSBGaWx0ZXJlZFZlY3Rvci5wcm90b3R5cGVcblxucHJvdG8uZmx1c2ggPSBmdW5jdGlvbih0KSB7XG4gIHZhciBpZHggPSBic2VhcmNoLmd0KHRoaXMuX3RpbWUsIHQpIC0gMVxuICBpZihpZHggPD0gMCkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuX3RpbWUuc3BsaWNlKDAsIGlkeClcbiAgdGhpcy5fc3RhdGUuc3BsaWNlKDAsIGlkeCAqIHRoaXMuZGltZW5zaW9uKVxuICB0aGlzLl92ZWxvY2l0eS5zcGxpY2UoMCwgaWR4ICogdGhpcy5kaW1lbnNpb24pXG59XG5cbnByb3RvLmN1cnZlID0gZnVuY3Rpb24odCkge1xuICB2YXIgdGltZSAgICAgID0gdGhpcy5fdGltZVxuICB2YXIgbiAgICAgICAgID0gdGltZS5sZW5ndGhcbiAgdmFyIGlkeCAgICAgICA9IGJzZWFyY2gubGUodGltZSwgdClcbiAgdmFyIHJlc3VsdCAgICA9IHRoaXMuX3NjcmF0Y2hbMF1cbiAgdmFyIHN0YXRlICAgICA9IHRoaXMuX3N0YXRlXG4gIHZhciB2ZWxvY2l0eSAgPSB0aGlzLl92ZWxvY2l0eVxuICB2YXIgZCAgICAgICAgID0gdGhpcy5kaW1lbnNpb25cbiAgdmFyIGJvdW5kcyAgICA9IHRoaXMuYm91bmRzXG4gIGlmKGlkeCA8IDApIHtcbiAgICB2YXIgcHRyID0gZC0xXG4gICAgZm9yKHZhciBpPTA7IGk8ZDsgKytpLCAtLXB0cikge1xuICAgICAgcmVzdWx0W2ldID0gc3RhdGVbcHRyXVxuICAgIH1cbiAgfSBlbHNlIGlmKGlkeCA+PSBuLTEpIHtcbiAgICB2YXIgcHRyID0gc3RhdGUubGVuZ3RoLTFcbiAgICB2YXIgdGYgPSB0IC0gdGltZVtuLTFdXG4gICAgZm9yKHZhciBpPTA7IGk8ZDsgKytpLCAtLXB0cikge1xuICAgICAgcmVzdWx0W2ldID0gc3RhdGVbcHRyXSArIHRmICogdmVsb2NpdHlbcHRyXVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgcHRyID0gZCAqIChpZHgrMSkgLSAxXG4gICAgdmFyIHQwICA9IHRpbWVbaWR4XVxuICAgIHZhciB0MSAgPSB0aW1lW2lkeCsxXVxuICAgIHZhciBkdCAgPSAodDEgLSB0MCkgfHwgMS4wXG4gICAgdmFyIHgwICA9IHRoaXMuX3NjcmF0Y2hbMV1cbiAgICB2YXIgeDEgID0gdGhpcy5fc2NyYXRjaFsyXVxuICAgIHZhciB2MCAgPSB0aGlzLl9zY3JhdGNoWzNdXG4gICAgdmFyIHYxICA9IHRoaXMuX3NjcmF0Y2hbNF1cbiAgICB2YXIgc3RlYWR5ID0gdHJ1ZVxuICAgIGZvcih2YXIgaT0wOyBpPGQ7ICsraSwgLS1wdHIpIHtcbiAgICAgIHgwW2ldID0gc3RhdGVbcHRyXVxuICAgICAgdjBbaV0gPSB2ZWxvY2l0eVtwdHJdICogZHRcbiAgICAgIHgxW2ldID0gc3RhdGVbcHRyK2RdXG4gICAgICB2MVtpXSA9IHZlbG9jaXR5W3B0citkXSAqIGR0XG4gICAgICBzdGVhZHkgPSBzdGVhZHkgJiYgKHgwW2ldID09PSB4MVtpXSAmJiB2MFtpXSA9PT0gdjFbaV0gJiYgdjBbaV0gPT09IDAuMClcbiAgICB9XG4gICAgaWYoc3RlYWR5KSB7XG4gICAgICBmb3IodmFyIGk9MDsgaTxkOyArK2kpIHtcbiAgICAgICAgcmVzdWx0W2ldID0geDBbaV1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY3ViaWNIZXJtaXRlKHgwLCB2MCwgeDEsIHYxLCAodC10MCkvZHQsIHJlc3VsdClcbiAgICB9XG4gIH1cbiAgdmFyIGxvID0gYm91bmRzWzBdXG4gIHZhciBoaSA9IGJvdW5kc1sxXVxuICBmb3IodmFyIGk9MDsgaTxkOyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSBjbGFtcChsb1tpXSwgaGlbaV0sIHJlc3VsdFtpXSlcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbnByb3RvLmRjdXJ2ZSA9IGZ1bmN0aW9uKHQpIHtcbiAgdmFyIHRpbWUgICAgID0gdGhpcy5fdGltZVxuICB2YXIgbiAgICAgICAgPSB0aW1lLmxlbmd0aFxuICB2YXIgaWR4ICAgICAgPSBic2VhcmNoLmxlKHRpbWUsIHQpXG4gIHZhciByZXN1bHQgICA9IHRoaXMuX3NjcmF0Y2hbMF1cbiAgdmFyIHN0YXRlICAgID0gdGhpcy5fc3RhdGVcbiAgdmFyIHZlbG9jaXR5ID0gdGhpcy5fdmVsb2NpdHlcbiAgdmFyIGQgICAgICAgID0gdGhpcy5kaW1lbnNpb25cbiAgaWYoaWR4ID49IG4tMSkge1xuICAgIHZhciBwdHIgPSBzdGF0ZS5sZW5ndGgtMVxuICAgIHZhciB0ZiA9IHQgLSB0aW1lW24tMV1cbiAgICBmb3IodmFyIGk9MDsgaTxkOyArK2ksIC0tcHRyKSB7XG4gICAgICByZXN1bHRbaV0gPSB2ZWxvY2l0eVtwdHJdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBwdHIgPSBkICogKGlkeCsxKSAtIDFcbiAgICB2YXIgdDAgPSB0aW1lW2lkeF1cbiAgICB2YXIgdDEgPSB0aW1lW2lkeCsxXVxuICAgIHZhciBkdCA9ICh0MSAtIHQwKSB8fCAxLjBcbiAgICB2YXIgeDAgPSB0aGlzLl9zY3JhdGNoWzFdXG4gICAgdmFyIHgxID0gdGhpcy5fc2NyYXRjaFsyXVxuICAgIHZhciB2MCA9IHRoaXMuX3NjcmF0Y2hbM11cbiAgICB2YXIgdjEgPSB0aGlzLl9zY3JhdGNoWzRdXG4gICAgdmFyIHN0ZWFkeSA9IHRydWVcbiAgICBmb3IodmFyIGk9MDsgaTxkOyArK2ksIC0tcHRyKSB7XG4gICAgICB4MFtpXSA9IHN0YXRlW3B0cl1cbiAgICAgIHYwW2ldID0gdmVsb2NpdHlbcHRyXSAqIGR0XG4gICAgICB4MVtpXSA9IHN0YXRlW3B0citkXVxuICAgICAgdjFbaV0gPSB2ZWxvY2l0eVtwdHIrZF0gKiBkdFxuICAgICAgc3RlYWR5ID0gc3RlYWR5ICYmICh4MFtpXSA9PT0geDFbaV0gJiYgdjBbaV0gPT09IHYxW2ldICYmIHYwW2ldID09PSAwLjApXG4gICAgfVxuICAgIGlmKHN0ZWFkeSkge1xuICAgICAgZm9yKHZhciBpPTA7IGk8ZDsgKytpKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IDAuMFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjdWJpY0hlcm1pdGUuZGVyaXZhdGl2ZSh4MCwgdjAsIHgxLCB2MSwgKHQtdDApL2R0LCByZXN1bHQpXG4gICAgICBmb3IodmFyIGk9MDsgaTxkOyArK2kpIHtcbiAgICAgICAgcmVzdWx0W2ldIC89IGR0XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxucHJvdG8ubGFzdFQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRpbWUgPSB0aGlzLl90aW1lXG4gIHJldHVybiB0aW1lW3RpbWUubGVuZ3RoLTFdXG59XG5cbnByb3RvLnN0YWJsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdmVsb2NpdHkgPSB0aGlzLl92ZWxvY2l0eVxuICB2YXIgcHRyID0gdmVsb2NpdHkubGVuZ3RoXG4gIGZvcih2YXIgaT10aGlzLmRpbWVuc2lvbi0xOyBpPj0wOyAtLWkpIHtcbiAgICBpZih2ZWxvY2l0eVstLXB0cl0pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5wcm90by5qdW1wID0gZnVuY3Rpb24odCkge1xuICB2YXIgdDAgPSB0aGlzLmxhc3RUKClcbiAgdmFyIGQgID0gdGhpcy5kaW1lbnNpb25cbiAgaWYodCA8IHQwIHx8IGFyZ3VtZW50cy5sZW5ndGggIT09IGQrMSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBzdGF0ZSAgICAgPSB0aGlzLl9zdGF0ZVxuICB2YXIgdmVsb2NpdHkgID0gdGhpcy5fdmVsb2NpdHlcbiAgdmFyIHB0ciAgICAgICA9IHN0YXRlLmxlbmd0aC10aGlzLmRpbWVuc2lvblxuICB2YXIgYm91bmRzICAgID0gdGhpcy5ib3VuZHNcbiAgdmFyIGxvICAgICAgICA9IGJvdW5kc1swXVxuICB2YXIgaGkgICAgICAgID0gYm91bmRzWzFdXG4gIHRoaXMuX3RpbWUucHVzaCh0MCwgdClcbiAgZm9yKHZhciBqPTA7IGo8MjsgKytqKSB7XG4gICAgZm9yKHZhciBpPTA7IGk8ZDsgKytpKSB7XG4gICAgICBzdGF0ZS5wdXNoKHN0YXRlW3B0cisrXSlcbiAgICAgIHZlbG9jaXR5LnB1c2goMClcbiAgICB9XG4gIH1cbiAgdGhpcy5fdGltZS5wdXNoKHQpXG4gIGZvcih2YXIgaT1kOyBpPjA7IC0taSkge1xuICAgIHN0YXRlLnB1c2goY2xhbXAobG9baS0xXSwgaGlbaS0xXSwgYXJndW1lbnRzW2ldKSlcbiAgICB2ZWxvY2l0eS5wdXNoKDApXG4gIH1cbn1cblxucHJvdG8ucHVzaCA9IGZ1bmN0aW9uKHQpIHtcbiAgdmFyIHQwID0gdGhpcy5sYXN0VCgpXG4gIHZhciBkICA9IHRoaXMuZGltZW5zaW9uXG4gIGlmKHQgPCB0MCB8fCBhcmd1bWVudHMubGVuZ3RoICE9PSBkKzEpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgc3RhdGUgICAgID0gdGhpcy5fc3RhdGVcbiAgdmFyIHZlbG9jaXR5ICA9IHRoaXMuX3ZlbG9jaXR5XG4gIHZhciBwdHIgICAgICAgPSBzdGF0ZS5sZW5ndGgtdGhpcy5kaW1lbnNpb25cbiAgdmFyIGR0ICAgICAgICA9IHQgLSB0MFxuICB2YXIgYm91bmRzICAgID0gdGhpcy5ib3VuZHNcbiAgdmFyIGxvICAgICAgICA9IGJvdW5kc1swXVxuICB2YXIgaGkgICAgICAgID0gYm91bmRzWzFdXG4gIHZhciBzZiAgICAgICAgPSAoZHQgPiAxZS02KSA/IDEvZHQgOiAwXG4gIHRoaXMuX3RpbWUucHVzaCh0KVxuICBmb3IodmFyIGk9ZDsgaT4wOyAtLWkpIHtcbiAgICB2YXIgeGMgPSBjbGFtcChsb1tpLTFdLCBoaVtpLTFdLCBhcmd1bWVudHNbaV0pXG4gICAgc3RhdGUucHVzaCh4YylcbiAgICB2ZWxvY2l0eS5wdXNoKCh4YyAtIHN0YXRlW3B0cisrXSkgKiBzZilcbiAgfVxufVxuXG5wcm90by5zZXQgPSBmdW5jdGlvbih0KSB7XG4gIHZhciBkID0gdGhpcy5kaW1lbnNpb25cbiAgaWYodCA8IHRoaXMubGFzdFQoKSB8fCBhcmd1bWVudHMubGVuZ3RoICE9PSBkKzEpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgc3RhdGUgICAgID0gdGhpcy5fc3RhdGVcbiAgdmFyIHZlbG9jaXR5ICA9IHRoaXMuX3ZlbG9jaXR5XG4gIHZhciBib3VuZHMgICAgPSB0aGlzLmJvdW5kc1xuICB2YXIgbG8gICAgICAgID0gYm91bmRzWzBdXG4gIHZhciBoaSAgICAgICAgPSBib3VuZHNbMV1cbiAgdGhpcy5fdGltZS5wdXNoKHQpXG4gIGZvcih2YXIgaT1kOyBpPjA7IC0taSkge1xuICAgIHN0YXRlLnB1c2goY2xhbXAobG9baS0xXSwgaGlbaS0xXSwgYXJndW1lbnRzW2ldKSlcbiAgICB2ZWxvY2l0eS5wdXNoKDApXG4gIH1cbn1cblxucHJvdG8ubW92ZSA9IGZ1bmN0aW9uKHQpIHtcbiAgdmFyIHQwID0gdGhpcy5sYXN0VCgpXG4gIHZhciBkICA9IHRoaXMuZGltZW5zaW9uXG4gIGlmKHQgPD0gdDAgfHwgYXJndW1lbnRzLmxlbmd0aCAhPT0gZCsxKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIHN0YXRlICAgID0gdGhpcy5fc3RhdGVcbiAgdmFyIHZlbG9jaXR5ID0gdGhpcy5fdmVsb2NpdHlcbiAgdmFyIHN0YXRlUHRyID0gc3RhdGUubGVuZ3RoIC0gdGhpcy5kaW1lbnNpb25cbiAgdmFyIGJvdW5kcyAgID0gdGhpcy5ib3VuZHNcbiAgdmFyIGxvICAgICAgID0gYm91bmRzWzBdXG4gIHZhciBoaSAgICAgICA9IGJvdW5kc1sxXVxuICB2YXIgZHQgICAgICAgPSB0IC0gdDBcbiAgdmFyIHNmICAgICAgID0gKGR0ID4gMWUtNikgPyAxL2R0IDogMC4wXG4gIHRoaXMuX3RpbWUucHVzaCh0KVxuICBmb3IodmFyIGk9ZDsgaT4wOyAtLWkpIHtcbiAgICB2YXIgZHggPSBhcmd1bWVudHNbaV1cbiAgICBzdGF0ZS5wdXNoKGNsYW1wKGxvW2ktMV0sIGhpW2ktMV0sIHN0YXRlW3N0YXRlUHRyKytdICsgZHgpKVxuICAgIHZlbG9jaXR5LnB1c2goZHggKiBzZilcbiAgfVxufVxuXG5wcm90by5pZGxlID0gZnVuY3Rpb24odCkge1xuICB2YXIgdDAgPSB0aGlzLmxhc3RUKClcbiAgaWYodCA8IHQwKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIGQgICAgICAgID0gdGhpcy5kaW1lbnNpb25cbiAgdmFyIHN0YXRlICAgID0gdGhpcy5fc3RhdGVcbiAgdmFyIHZlbG9jaXR5ID0gdGhpcy5fdmVsb2NpdHlcbiAgdmFyIHN0YXRlUHRyID0gc3RhdGUubGVuZ3RoLWRcbiAgdmFyIGJvdW5kcyAgID0gdGhpcy5ib3VuZHNcbiAgdmFyIGxvICAgICAgID0gYm91bmRzWzBdXG4gIHZhciBoaSAgICAgICA9IGJvdW5kc1sxXVxuICB2YXIgZHQgICAgICAgPSB0IC0gdDBcbiAgdGhpcy5fdGltZS5wdXNoKHQpXG4gIGZvcih2YXIgaT1kLTE7IGk+PTA7IC0taSkge1xuICAgIHN0YXRlLnB1c2goY2xhbXAobG9baV0sIGhpW2ldLCBzdGF0ZVtzdGF0ZVB0cl0gKyBkdCAqIHZlbG9jaXR5W3N0YXRlUHRyXSkpXG4gICAgdmVsb2NpdHkucHVzaCgwKVxuICAgIHN0YXRlUHRyICs9IDFcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRaZXJvKGQpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShkKVxuICBmb3IodmFyIGk9MDsgaTxkOyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSAwLjBcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZpbHRlcmVkVmVjdG9yKGluaXRTdGF0ZSwgaW5pdFZlbG9jaXR5LCBpbml0VGltZSkge1xuICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBuZXcgRmlsdGVyZWRWZWN0b3IoWzBdLCBbMF0sIDApXG4gICAgY2FzZSAxOlxuICAgICAgaWYodHlwZW9mIGluaXRTdGF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdmFyIHplcm8gPSBnZXRaZXJvKGluaXRTdGF0ZSlcbiAgICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJlZFZlY3Rvcih6ZXJvLCB6ZXJvLCAwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJlZFZlY3Rvcihpbml0U3RhdGUsIGdldFplcm8oaW5pdFN0YXRlLmxlbmd0aCksIDApXG4gICAgICB9XG4gICAgY2FzZSAyOlxuICAgICAgaWYodHlwZW9mIGluaXRWZWxvY2l0eSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdmFyIHplcm8gPSBnZXRaZXJvKGluaXRTdGF0ZS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBuZXcgRmlsdGVyZWRWZWN0b3IoaW5pdFN0YXRlLCB6ZXJvLCAraW5pdFZlbG9jaXR5KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdFRpbWUgPSAwXG4gICAgICB9XG4gICAgY2FzZSAzOlxuICAgICAgaWYoaW5pdFN0YXRlLmxlbmd0aCAhPT0gaW5pdFZlbG9jaXR5Lmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0YXRlIGFuZCB2ZWxvY2l0eSBsZW5ndGhzIG11c3QgbWF0Y2gnKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJlZFZlY3Rvcihpbml0U3RhdGUsIGluaXRWZWxvY2l0eSwgaW5pdFRpbWUpXG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIGNvbXBpbGVTZWFyY2goZnVuY05hbWUsIHByZWRpY2F0ZSwgcmV2ZXJzZWQsIGV4dHJhQXJncywgdXNlTmRhcnJheSwgZWFybHlPdXQpIHtcbiAgdmFyIGNvZGUgPSBbXG4gICAgXCJmdW5jdGlvbiBcIiwgZnVuY05hbWUsIFwiKGEsbCxoLFwiLCBleHRyYUFyZ3Muam9pbihcIixcIiksICBcIil7XCIsXG5lYXJseU91dCA/IFwiXCIgOiBcInZhciBpPVwiLCAocmV2ZXJzZWQgPyBcImwtMVwiIDogXCJoKzFcIiksXG5cIjt3aGlsZShsPD1oKXtcXFxudmFyIG09KGwraCk+Pj4xLHg9YVwiLCB1c2VOZGFycmF5ID8gXCIuZ2V0KG0pXCIgOiBcIlttXVwiXVxuICBpZihlYXJseU91dCkge1xuICAgIGlmKHByZWRpY2F0ZS5pbmRleE9mKFwiY1wiKSA8IDApIHtcbiAgICAgIGNvZGUucHVzaChcIjtpZih4PT09eSl7cmV0dXJuIG19ZWxzZSBpZih4PD15KXtcIilcbiAgICB9IGVsc2Uge1xuICAgICAgY29kZS5wdXNoKFwiO3ZhciBwPWMoeCx5KTtpZihwPT09MCl7cmV0dXJuIG19ZWxzZSBpZihwPD0wKXtcIilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKFwiO2lmKFwiLCBwcmVkaWNhdGUsIFwiKXtpPW07XCIpXG4gIH1cbiAgaWYocmV2ZXJzZWQpIHtcbiAgICBjb2RlLnB1c2goXCJsPW0rMX1lbHNle2g9bS0xfVwiKVxuICB9IGVsc2Uge1xuICAgIGNvZGUucHVzaChcImg9bS0xfWVsc2V7bD1tKzF9XCIpXG4gIH1cbiAgY29kZS5wdXNoKFwifVwiKVxuICBpZihlYXJseU91dCkge1xuICAgIGNvZGUucHVzaChcInJldHVybiAtMX07XCIpXG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKFwicmV0dXJuIGl9O1wiKVxuICB9XG4gIHJldHVybiBjb2RlLmpvaW4oXCJcIilcbn1cblxuZnVuY3Rpb24gY29tcGlsZUJvdW5kc1NlYXJjaChwcmVkaWNhdGUsIHJldmVyc2VkLCBzdWZmaXgsIGVhcmx5T3V0KSB7XG4gIHZhciByZXN1bHQgPSBuZXcgRnVuY3Rpb24oW1xuICBjb21waWxlU2VhcmNoKFwiQVwiLCBcInhcIiArIHByZWRpY2F0ZSArIFwieVwiLCByZXZlcnNlZCwgW1wieVwiXSwgZmFsc2UsIGVhcmx5T3V0KSxcbiAgY29tcGlsZVNlYXJjaChcIkJcIiwgXCJ4XCIgKyBwcmVkaWNhdGUgKyBcInlcIiwgcmV2ZXJzZWQsIFtcInlcIl0sIHRydWUsIGVhcmx5T3V0KSxcbiAgY29tcGlsZVNlYXJjaChcIlBcIiwgXCJjKHgseSlcIiArIHByZWRpY2F0ZSArIFwiMFwiLCByZXZlcnNlZCwgW1wieVwiLCBcImNcIl0sIGZhbHNlLCBlYXJseU91dCksXG4gIGNvbXBpbGVTZWFyY2goXCJRXCIsIFwiYyh4LHkpXCIgKyBwcmVkaWNhdGUgKyBcIjBcIiwgcmV2ZXJzZWQsIFtcInlcIiwgXCJjXCJdLCB0cnVlLCBlYXJseU91dCksXG5cImZ1bmN0aW9uIGRpc3BhdGNoQnNlYXJjaFwiLCBzdWZmaXgsIFwiKGEseSxjLGwsaCl7XFxcbmlmKGEuc2hhcGUpe1xcXG5pZih0eXBlb2YoYyk9PT0nZnVuY3Rpb24nKXtcXFxucmV0dXJuIFEoYSwobD09PXVuZGVmaW5lZCk/MDpsfDAsKGg9PT11bmRlZmluZWQpP2Euc2hhcGVbMF0tMTpofDAseSxjKVxcXG59ZWxzZXtcXFxucmV0dXJuIEIoYSwoYz09PXVuZGVmaW5lZCk/MDpjfDAsKGw9PT11bmRlZmluZWQpP2Euc2hhcGVbMF0tMTpsfDAseSlcXFxufX1lbHNle1xcXG5pZih0eXBlb2YoYyk9PT0nZnVuY3Rpb24nKXtcXFxucmV0dXJuIFAoYSwobD09PXVuZGVmaW5lZCk/MDpsfDAsKGg9PT11bmRlZmluZWQpP2EubGVuZ3RoLTE6aHwwLHksYylcXFxufWVsc2V7XFxcbnJldHVybiBBKGEsKGM9PT11bmRlZmluZWQpPzA6Y3wwLChsPT09dW5kZWZpbmVkKT9hLmxlbmd0aC0xOmx8MCx5KVxcXG59fX1cXFxucmV0dXJuIGRpc3BhdGNoQnNlYXJjaFwiLCBzdWZmaXhdLmpvaW4oXCJcIikpXG4gIHJldHVybiByZXN1bHQoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2U6IGNvbXBpbGVCb3VuZHNTZWFyY2goXCI+PVwiLCBmYWxzZSwgXCJHRVwiKSxcbiAgZ3Q6IGNvbXBpbGVCb3VuZHNTZWFyY2goXCI+XCIsIGZhbHNlLCBcIkdUXCIpLFxuICBsdDogY29tcGlsZUJvdW5kc1NlYXJjaChcIjxcIiwgdHJ1ZSwgXCJMVFwiKSxcbiAgbGU6IGNvbXBpbGVCb3VuZHNTZWFyY2goXCI8PVwiLCB0cnVlLCBcIkxFXCIpLFxuICBlcTogY29tcGlsZUJvdW5kc1NlYXJjaChcIi1cIiwgdHJ1ZSwgXCJFUVwiLCB0cnVlKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXhlc1xuXG52YXIgY3JlYXRlVGV4dCAgICAgICAgPSByZXF1aXJlKCcuL2xpYi90ZXh0LmpzJylcbnZhciBjcmVhdGVMaW5lcyAgICAgICA9IHJlcXVpcmUoJy4vbGliL2xpbmVzLmpzJylcbnZhciBjcmVhdGVCYWNrZ3JvdW5kICA9IHJlcXVpcmUoJy4vbGliL2JhY2tncm91bmQuanMnKVxudmFyIGdldEN1YmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9saWIvY3ViZS5qcycpXG52YXIgVGlja3MgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2xpYi90aWNrcy5qcycpXG5cbnZhciBpZGVudGl0eSA9IG5ldyBGbG9hdDMyQXJyYXkoW1xuICAxLCAwLCAwLCAwLFxuICAwLCAxLCAwLCAwLFxuICAwLCAwLCAxLCAwLFxuICAwLCAwLCAwLCAxXSlcblxuZnVuY3Rpb24gY29weVZlYzMoYSwgYikge1xuICBhWzBdID0gYlswXVxuICBhWzFdID0gYlsxXVxuICBhWzJdID0gYlsyXVxuICByZXR1cm4gYVxufVxuXG5mdW5jdGlvbiBBeGVzKGdsKSB7XG4gIHRoaXMuZ2wgICAgICAgICAgICAgPSBnbFxuXG4gIHRoaXMucGl4ZWxSYXRpbyAgICAgPSAxXG5cbiAgdGhpcy5ib3VuZHMgICAgICAgICA9IFsgWy0xMCwgLTEwLCAtMTBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbIDEwLCAgMTAsICAxMF0gXVxuICB0aGlzLnRpY2tzICAgICAgICAgID0gWyBbXSwgW10sIFtdIF1cbiAgdGhpcy5hdXRvVGlja3MgICAgICA9IHRydWVcbiAgdGhpcy50aWNrU3BhY2luZyAgICA9IFsgMSwgMSwgMSBdXG5cbiAgdGhpcy50aWNrRW5hYmxlICAgICA9IFsgdHJ1ZSwgdHJ1ZSwgdHJ1ZSBdXG4gIHRoaXMudGlja0ZvbnQgICAgICAgPSBbICdzYW5zLXNlcmlmJywgJ3NhbnMtc2VyaWYnLCAnc2Fucy1zZXJpZicgXVxuICB0aGlzLnRpY2tTaXplICAgICAgID0gWyAxMiwgMTIsIDEyIF1cbiAgdGhpcy50aWNrQW5nbGUgICAgICA9IFsgMCwgMCwgMCBdXG4gIHRoaXMudGlja0FsaWduICAgICAgPSBbICdhdXRvJywgJ2F1dG8nLCAnYXV0bycgXVxuICB0aGlzLnRpY2tDb2xvciAgICAgID0gWyBbMCwwLDAsMV0sIFswLDAsMCwxXSwgWzAsMCwwLDFdIF1cbiAgdGhpcy50aWNrUGFkICAgICAgICA9IFsgMTAsIDEwLCAxMCBdXG5cbiAgdGhpcy5sYXN0Q3ViZVByb3BzICA9IHtcbiAgICBjdWJlRWRnZXM6IFswLDAsMF0sXG4gICAgYXhpczogICAgICBbMCwwLDBdXG4gIH1cblxuICB0aGlzLmxhYmVscyAgICAgICAgID0gWyAneCcsICd5JywgJ3onIF1cbiAgdGhpcy5sYWJlbEVuYWJsZSAgICA9IFsgdHJ1ZSwgdHJ1ZSwgdHJ1ZSBdXG4gIHRoaXMubGFiZWxGb250ICAgICAgPSAnc2Fucy1zZXJpZidcbiAgdGhpcy5sYWJlbFNpemUgICAgICA9IFsgMjAsIDIwLCAyMCBdXG4gIHRoaXMubGFiZWxBbmdsZSAgICAgPSBbIDAsIDAsIDAgXVxuICB0aGlzLmxhYmVsQWxpZ24gICAgID0gWyAnYXV0bycsICdhdXRvJywgJ2F1dG8nIF1cbiAgdGhpcy5sYWJlbENvbG9yICAgICA9IFsgWzAsMCwwLDFdLCBbMCwwLDAsMV0sIFswLDAsMCwxXSBdXG4gIHRoaXMubGFiZWxQYWQgICAgICAgPSBbIDEwLCAxMCwgMTAgXVxuXG4gIHRoaXMubGluZUVuYWJsZSAgICAgPSBbIHRydWUsIHRydWUsIHRydWUgXVxuICB0aGlzLmxpbmVNaXJyb3IgICAgID0gWyBmYWxzZSwgZmFsc2UsIGZhbHNlIF1cbiAgdGhpcy5saW5lV2lkdGggICAgICA9IFsgMSwgMSwgMSBdXG4gIHRoaXMubGluZUNvbG9yICAgICAgPSBbIFswLDAsMCwxXSwgWzAsMCwwLDFdLCBbMCwwLDAsMV0gXVxuXG4gIHRoaXMubGluZVRpY2tFbmFibGUgPSBbIHRydWUsIHRydWUsIHRydWUgXVxuICB0aGlzLmxpbmVUaWNrTWlycm9yID0gWyBmYWxzZSwgZmFsc2UsIGZhbHNlIF1cbiAgdGhpcy5saW5lVGlja0xlbmd0aCA9IFsgMCwgMCwgMCBdXG4gIHRoaXMubGluZVRpY2tXaWR0aCAgPSBbIDEsIDEsIDEgXVxuICB0aGlzLmxpbmVUaWNrQ29sb3IgID0gWyBbMCwwLDAsMV0sIFswLDAsMCwxXSwgWzAsMCwwLDFdIF1cblxuICB0aGlzLmdyaWRFbmFibGUgICAgID0gWyB0cnVlLCB0cnVlLCB0cnVlIF1cbiAgdGhpcy5ncmlkV2lkdGggICAgICA9IFsgMSwgMSwgMSBdXG4gIHRoaXMuZ3JpZENvbG9yICAgICAgPSBbIFswLDAsMCwxXSwgWzAsMCwwLDFdLCBbMCwwLDAsMV0gXVxuXG4gIHRoaXMuemVyb0VuYWJsZSAgICAgPSBbIHRydWUsIHRydWUsIHRydWUgXVxuICB0aGlzLnplcm9MaW5lQ29sb3IgID0gWyBbMCwwLDAsMV0sIFswLDAsMCwxXSwgWzAsMCwwLDFdIF1cbiAgdGhpcy56ZXJvTGluZVdpZHRoICA9IFsgMiwgMiwgMiBdXG5cbiAgdGhpcy5iYWNrZ3JvdW5kRW5hYmxlID0gWyBmYWxzZSwgZmFsc2UsIGZhbHNlIF1cbiAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgID0gWyBbMC44LCAwLjgsIDAuOCwgMC41XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbMC44LCAwLjgsIDAuOCwgMC41XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbMC44LCAwLjgsIDAuOCwgMC41XSBdXG5cbiAgdGhpcy5fZmlyc3RJbml0ID0gdHJ1ZVxuICB0aGlzLl90ZXh0ICA9IG51bGxcbiAgdGhpcy5fbGluZXMgPSBudWxsXG4gIHRoaXMuX2JhY2tncm91bmQgPSBjcmVhdGVCYWNrZ3JvdW5kKGdsKVxufVxuXG52YXIgcHJvdG8gPSBBeGVzLnByb3RvdHlwZVxuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgLy9PcHRpb24gcGFyc2luZyBoZWxwZXIgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIHBhcnNlT3B0aW9uKG5lc3QsIGNvbnMsIG5hbWUpIHtcbiAgICBpZihuYW1lIGluIG9wdGlvbnMpIHtcbiAgICAgIHZhciBvcHQgPSBvcHRpb25zW25hbWVdXG4gICAgICB2YXIgcHJldiA9IHRoaXNbbmFtZV1cbiAgICAgIHZhciBuZXh0XG4gICAgICBpZihuZXN0ID8gKEFycmF5LmlzQXJyYXkob3B0KSAmJiBBcnJheS5pc0FycmF5KG9wdFswXSkpIDpcbiAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvcHQpICkge1xuICAgICAgICB0aGlzW25hbWVdID0gbmV4dCA9IFsgY29ucyhvcHRbMF0pLCBjb25zKG9wdFsxXSksIGNvbnMob3B0WzJdKSBdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzW25hbWVdID0gbmV4dCA9IFsgY29ucyhvcHQpLCBjb25zKG9wdCksIGNvbnMob3B0KSBdXG4gICAgICB9XG4gICAgICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICAgICAgaWYobmV4dFtpXSAhPT0gcHJldltpXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB2YXIgTlVNQkVSICA9IHBhcnNlT3B0aW9uLmJpbmQodGhpcywgZmFsc2UsIE51bWJlcilcbiAgdmFyIEJPT0xFQU4gPSBwYXJzZU9wdGlvbi5iaW5kKHRoaXMsIGZhbHNlLCBCb29sZWFuKVxuICB2YXIgU1RSSU5HICA9IHBhcnNlT3B0aW9uLmJpbmQodGhpcywgZmFsc2UsIFN0cmluZylcbiAgdmFyIENPTE9SICAgPSBwYXJzZU9wdGlvbi5iaW5kKHRoaXMsIHRydWUsIGZ1bmN0aW9uKHYpIHtcbiAgICBpZihBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICBpZih2Lmxlbmd0aCA9PT0gMykge1xuICAgICAgICByZXR1cm4gWyArdlswXSwgK3ZbMV0sICt2WzJdLCAxLjAgXVxuICAgICAgfSBlbHNlIGlmKHYubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHJldHVybiBbICt2WzBdLCArdlsxXSwgK3ZbMl0sICt2WzNdIF1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFsgMCwgMCwgMCwgMSBdXG4gIH0pXG5cbiAgLy9UaWNrIG1hcmtzIGFuZCBib3VuZHNcbiAgdmFyIG5leHRUaWNrc1xuICB2YXIgdGlja3NVcGRhdGUgICA9IGZhbHNlXG4gIHZhciBib3VuZHNDaGFuZ2VkID0gZmFsc2VcbiAgaWYoJ2JvdW5kcycgaW4gb3B0aW9ucykge1xuICAgIHZhciBib3VuZHMgPSBvcHRpb25zLmJvdW5kc1xuaV9sb29wOlxuICAgIGZvcih2YXIgaT0wOyBpPDI7ICsraSkge1xuICAgICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICAgIGlmKGJvdW5kc1tpXVtqXSAhPT0gdGhpcy5ib3VuZHNbaV1bal0pIHtcbiAgICAgICAgICBib3VuZHNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYm91bmRzW2ldW2pdID0gYm91bmRzW2ldW2pdXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmKCd0aWNrcycgaW4gb3B0aW9ucykge1xuICAgIG5leHRUaWNrcyAgICAgID0gb3B0aW9ucy50aWNrc1xuICAgIHRpY2tzVXBkYXRlICAgID0gdHJ1ZVxuICAgIHRoaXMuYXV0b1RpY2tzID0gZmFsc2VcbiAgICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICAgIHRoaXMudGlja1NwYWNpbmdbaV0gPSAwLjBcbiAgICB9XG4gIH0gZWxzZSBpZihOVU1CRVIoJ3RpY2tTcGFjaW5nJykpIHtcbiAgICB0aGlzLmF1dG9UaWNrcyAgPSB0cnVlXG4gICAgYm91bmRzQ2hhbmdlZCAgID0gdHJ1ZVxuICB9XG5cbiAgaWYodGhpcy5fZmlyc3RJbml0KSB7XG4gICAgaWYoISgndGlja3MnIGluIG9wdGlvbnMgfHwgJ3RpY2tTcGFjaW5nJyBpbiBvcHRpb25zKSkge1xuICAgICAgdGhpcy5hdXRvVGlja3MgPSB0cnVlXG4gICAgfVxuXG4gICAgLy9Gb3JjZSB0aWNrIHJlY29tcHV0YXRpb24gb24gZmlyc3QgdXBkYXRlXG4gICAgYm91bmRzQ2hhbmdlZCAgID0gdHJ1ZVxuICAgIHRpY2tzVXBkYXRlICAgICA9IHRydWVcbiAgICB0aGlzLl9maXJzdEluaXQgPSBmYWxzZVxuICB9XG5cbiAgaWYoYm91bmRzQ2hhbmdlZCAmJiB0aGlzLmF1dG9UaWNrcykge1xuICAgIG5leHRUaWNrcyA9IFRpY2tzLmNyZWF0ZSh0aGlzLmJvdW5kcywgdGhpcy50aWNrU3BhY2luZylcbiAgICB0aWNrc1VwZGF0ZSA9IHRydWVcbiAgfVxuXG4gIC8vQ29tcGFyZSBuZXh0IHRpY2tzIHRvIHByZXZpb3VzIHRpY2tzLCBvbmx5IHVwZGF0ZSBpZiBuZWVkZWRcbiAgaWYodGlja3NVcGRhdGUpIHtcbiAgICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICAgIG5leHRUaWNrc1tpXS5zb3J0KGZ1bmN0aW9uKGEsYikge1xuICAgICAgICByZXR1cm4gYS54LWIueFxuICAgICAgfSlcbiAgICB9XG4gICAgaWYoVGlja3MuZXF1YWwobmV4dFRpY2tzLCB0aGlzLnRpY2tzKSkge1xuICAgICAgdGlja3NVcGRhdGUgPSBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpY2tzID0gbmV4dFRpY2tzXG4gICAgfVxuICB9XG5cbiAgLy9QYXJzZSB0aWNrIHByb3BlcnRpZXNcbiAgQk9PTEVBTigndGlja0VuYWJsZScpXG4gIGlmKFNUUklORygndGlja0ZvbnQnKSkge1xuICAgIHRpY2tzVXBkYXRlID0gdHJ1ZSAgLy9JZiBmb250IGNoYW5nZXMsIG11c3QgcmVidWlsZCB2Ym9cbiAgfVxuICBOVU1CRVIoJ3RpY2tTaXplJylcbiAgTlVNQkVSKCd0aWNrQW5nbGUnKVxuICBOVU1CRVIoJ3RpY2tQYWQnKVxuICBDT0xPUigndGlja0NvbG9yJylcblxuICAvL0F4aXMgbGFiZWxzXG4gIHZhciBsYWJlbFVwZGF0ZSA9IFNUUklORygnbGFiZWxzJylcbiAgaWYoU1RSSU5HKCdsYWJlbEZvbnQnKSkge1xuICAgIGxhYmVsVXBkYXRlID0gdHJ1ZVxuICB9XG4gIEJPT0xFQU4oJ2xhYmVsRW5hYmxlJylcbiAgTlVNQkVSKCdsYWJlbFNpemUnKVxuICBOVU1CRVIoJ2xhYmVsUGFkJylcbiAgQ09MT1IoJ2xhYmVsQ29sb3InKVxuXG4gIC8vQXhpcyBsaW5lc1xuICBCT09MRUFOKCdsaW5lRW5hYmxlJylcbiAgQk9PTEVBTignbGluZU1pcnJvcicpXG4gIE5VTUJFUignbGluZVdpZHRoJylcbiAgQ09MT1IoJ2xpbmVDb2xvcicpXG5cbiAgLy9BeGlzIGxpbmUgdGlja3NcbiAgQk9PTEVBTignbGluZVRpY2tFbmFibGUnKVxuICBCT09MRUFOKCdsaW5lVGlja01pcnJvcicpXG4gIE5VTUJFUignbGluZVRpY2tMZW5ndGgnKVxuICBOVU1CRVIoJ2xpbmVUaWNrV2lkdGgnKVxuICBDT0xPUignbGluZVRpY2tDb2xvcicpXG5cbiAgLy9HcmlkIGxpbmVzXG4gIEJPT0xFQU4oJ2dyaWRFbmFibGUnKVxuICBOVU1CRVIoJ2dyaWRXaWR0aCcpXG4gIENPTE9SKCdncmlkQ29sb3InKVxuXG4gIC8vWmVybyBsaW5lXG4gIEJPT0xFQU4oJ3plcm9FbmFibGUnKVxuICBDT0xPUignemVyb0xpbmVDb2xvcicpXG4gIE5VTUJFUignemVyb0xpbmVXaWR0aCcpXG5cbiAgLy9CYWNrZ3JvdW5kXG4gIEJPT0xFQU4oJ2JhY2tncm91bmRFbmFibGUnKVxuICBDT0xPUignYmFja2dyb3VuZENvbG9yJylcblxuICAvL1VwZGF0ZSB0ZXh0IGlmIG5lY2Vzc2FyeVxuICBpZighdGhpcy5fdGV4dCkge1xuICAgIHRoaXMuX3RleHQgPSBjcmVhdGVUZXh0KFxuICAgICAgdGhpcy5nbCxcbiAgICAgIHRoaXMuYm91bmRzLFxuICAgICAgdGhpcy5sYWJlbHMsXG4gICAgICB0aGlzLmxhYmVsRm9udCxcbiAgICAgIHRoaXMudGlja3MsXG4gICAgICB0aGlzLnRpY2tGb250KVxuICB9IGVsc2UgaWYodGhpcy5fdGV4dCAmJiAobGFiZWxVcGRhdGUgfHwgdGlja3NVcGRhdGUpKSB7XG4gICAgdGhpcy5fdGV4dC51cGRhdGUoXG4gICAgICB0aGlzLmJvdW5kcyxcbiAgICAgIHRoaXMubGFiZWxzLFxuICAgICAgdGhpcy5sYWJlbEZvbnQsXG4gICAgICB0aGlzLnRpY2tzLFxuICAgICAgdGhpcy50aWNrRm9udClcbiAgfVxuXG4gIC8vVXBkYXRlIGxpbmVzIGlmIG5lY2Vzc2FyeVxuICBpZih0aGlzLl9saW5lcyAmJiB0aWNrc1VwZGF0ZSkge1xuICAgIHRoaXMuX2xpbmVzLmRpc3Bvc2UoKVxuICAgIHRoaXMuX2xpbmVzID0gbnVsbFxuICB9XG4gIGlmKCF0aGlzLl9saW5lcykge1xuICAgIHRoaXMuX2xpbmVzID0gY3JlYXRlTGluZXModGhpcy5nbCwgdGhpcy5ib3VuZHMsIHRoaXMudGlja3MpXG4gIH1cbn1cblxuZnVuY3Rpb24gT2Zmc2V0SW5mbygpIHtcbiAgdGhpcy5wcmltYWxPZmZzZXQgPSBbMCwwLDBdXG4gIHRoaXMucHJpbWFsTWlub3IgID0gWzAsMCwwXVxuICB0aGlzLm1pcnJvck9mZnNldCA9IFswLDAsMF1cbiAgdGhpcy5taXJyb3JNaW5vciAgPSBbMCwwLDBdXG59XG5cbnZhciBMSU5FX09GRlNFVCA9IFsgbmV3IE9mZnNldEluZm8oKSwgbmV3IE9mZnNldEluZm8oKSwgbmV3IE9mZnNldEluZm8oKSBdXG5cbmZ1bmN0aW9uIGNvbXB1dGVMaW5lT2Zmc2V0KHJlc3VsdCwgaSwgYm91bmRzLCBjdWJlRWRnZXMsIGN1YmVBeGlzKSB7XG4gIHZhciBwcmltYWxPZmZzZXQgPSByZXN1bHQucHJpbWFsT2Zmc2V0XG4gIHZhciBwcmltYWxNaW5vciAgPSByZXN1bHQucHJpbWFsTWlub3JcbiAgdmFyIGR1YWxPZmZzZXQgICA9IHJlc3VsdC5taXJyb3JPZmZzZXRcbiAgdmFyIGR1YWxNaW5vciAgICA9IHJlc3VsdC5taXJyb3JNaW5vclxuICB2YXIgZSA9IGN1YmVFZGdlc1tpXVxuXG4gIC8vQ2FsY3VsYXRlIG9mZnNldHNcbiAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgaWYoaSA9PT0gaikge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgdmFyIGEgPSBwcmltYWxPZmZzZXQsXG4gICAgICAgIGIgPSBkdWFsT2Zmc2V0LFxuICAgICAgICBjID0gcHJpbWFsTWlub3IsXG4gICAgICAgIGQgPSBkdWFsTWlub3JcbiAgICBpZihlICYgKDE8PGopKSB7XG4gICAgICBhID0gZHVhbE9mZnNldFxuICAgICAgYiA9IHByaW1hbE9mZnNldFxuICAgICAgYyA9IGR1YWxNaW5vclxuICAgICAgZCA9IHByaW1hbE1pbm9yXG4gICAgfVxuICAgIGFbal0gPSBib3VuZHNbMF1bal1cbiAgICBiW2pdID0gYm91bmRzWzFdW2pdXG4gICAgaWYoY3ViZUF4aXNbal0gPiAwKSB7XG4gICAgICBjW2pdID0gLTFcbiAgICAgIGRbal0gPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIGNbal0gPSAwXG4gICAgICBkW2pdID0gKzFcbiAgICB9XG4gIH1cbn1cblxudmFyIENVQkVfRU5BQkxFID0gWzAsMCwwXVxudmFyIERFRkFVTFRfUEFSQU1TID0ge1xuICBtb2RlbDogICAgICBpZGVudGl0eSxcbiAgdmlldzogICAgICAgaWRlbnRpdHksXG4gIHByb2plY3Rpb246IGlkZW50aXR5LFxuICBfb3J0aG86ICAgICAgZmFsc2Vcbn1cblxucHJvdG8uaXNPcGFxdWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRydWVcbn1cblxucHJvdG8uaXNUcmFuc3BhcmVudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2Vcbn1cblxucHJvdG8uZHJhd1RyYW5zcGFyZW50ID0gZnVuY3Rpb24ocGFyYW1zKSB7fVxuXG52YXIgQUxJR05fT1BUSU9OX0FVVE8gPSAwIC8vIGkuZS4gYXMgZGVmaW5lZCBpbiB0aGUgc2hhZGVyIHRoZSB0ZXh0IHdvdWxkIHJvdGF0ZSB0byBzdGF5IHVwd2FyZHMgcmFuZ2U6IFstOTAsOTBdXG5cbnZhciBQUklNQUxfTUlOT1IgID0gWzAsMCwwXVxudmFyIE1JUlJPUl9NSU5PUiAgPSBbMCwwLDBdXG52YXIgUFJJTUFMX09GRlNFVCA9IFswLDAsMF1cblxucHJvdG8uZHJhdyA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICBwYXJhbXMgPSBwYXJhbXMgfHwgREVGQVVMVF9QQVJBTVNcblxuICB2YXIgZ2wgPSB0aGlzLmdsXG5cbiAgLy9HZW9tZXRyeSBmb3IgY2FtZXJhIGFuZCBheGVzXG4gIHZhciBtb2RlbCAgICAgICA9IHBhcmFtcy5tb2RlbCB8fCBpZGVudGl0eVxuICB2YXIgdmlldyAgICAgICAgPSBwYXJhbXMudmlldyB8fCBpZGVudGl0eVxuICB2YXIgcHJvamVjdGlvbiAgPSBwYXJhbXMucHJvamVjdGlvbiB8fCBpZGVudGl0eVxuICB2YXIgYm91bmRzICAgICAgPSB0aGlzLmJvdW5kc1xuICB2YXIgaXNPcnRobyAgICAgPSBwYXJhbXMuX29ydGhvIHx8IGZhbHNlXG5cbiAgLy9VbnBhY2sgYXhpcyBpbmZvXG4gIHZhciBjdWJlUGFyYW1zICA9IGdldEN1YmVQcm9wZXJ0aWVzKG1vZGVsLCB2aWV3LCBwcm9qZWN0aW9uLCBib3VuZHMsIGlzT3J0aG8pXG4gIHZhciBjdWJlRWRnZXMgICA9IGN1YmVQYXJhbXMuY3ViZUVkZ2VzXG4gIHZhciBjdWJlQXhpcyAgICA9IGN1YmVQYXJhbXMuYXhpc1xuXG4gIHZhciBjeCA9IHZpZXdbMTJdXG4gIHZhciBjeSA9IHZpZXdbMTNdXG4gIHZhciBjeiA9IHZpZXdbMTRdXG4gIHZhciBjdyA9IHZpZXdbMTVdXG5cbiAgdmFyIG9ydGhvRml4ID0gKGlzT3J0aG8pID8gMiA6IDEgLy8gZG91YmxlIHVwIHBhZGRpbmcgZm9yIG9ydGhvZ3JhcGhpYyB0aWNrcyAmIGxhYmVsc1xuICB2YXIgcGl4ZWxTY2FsZUYgPSBvcnRob0ZpeCAqIHRoaXMucGl4ZWxSYXRpbyAqIChwcm9qZWN0aW9uWzNdKmN4ICsgcHJvamVjdGlvbls3XSpjeSArIHByb2plY3Rpb25bMTFdKmN6ICsgcHJvamVjdGlvblsxNV0qY3cpIC8gZ2wuZHJhd2luZ0J1ZmZlckhlaWdodFxuXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIHRoaXMubGFzdEN1YmVQcm9wcy5jdWJlRWRnZXNbaV0gPSBjdWJlRWRnZXNbaV1cbiAgICB0aGlzLmxhc3RDdWJlUHJvcHMuYXhpc1tpXSA9IGN1YmVBeGlzW2ldXG4gIH1cblxuICAvL0NvbXB1dGUgYXhpcyBpbmZvXG4gIHZhciBsaW5lT2Zmc2V0ICA9IExJTkVfT0ZGU0VUXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIGNvbXB1dGVMaW5lT2Zmc2V0KFxuICAgICAgTElORV9PRkZTRVRbaV0sXG4gICAgICBpLFxuICAgICAgdGhpcy5ib3VuZHMsXG4gICAgICBjdWJlRWRnZXMsXG4gICAgICBjdWJlQXhpcylcbiAgfVxuXG4gIC8vU2V0IHVwIHN0YXRlIHBhcmFtZXRlcnNcbiAgdmFyIGdsID0gdGhpcy5nbFxuXG4gIC8vRHJhdyBiYWNrZ3JvdW5kIGZpcnN0XG4gIHZhciBjdWJlRW5hYmxlID0gQ1VCRV9FTkFCTEVcbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgaWYodGhpcy5iYWNrZ3JvdW5kRW5hYmxlW2ldKSB7XG4gICAgICBjdWJlRW5hYmxlW2ldID0gY3ViZUF4aXNbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgY3ViZUVuYWJsZVtpXSA9IDBcbiAgICB9XG4gIH1cblxuICB0aGlzLl9iYWNrZ3JvdW5kLmRyYXcoXG4gICAgbW9kZWwsXG4gICAgdmlldyxcbiAgICBwcm9qZWN0aW9uLFxuICAgIGJvdW5kcyxcbiAgICBjdWJlRW5hYmxlLFxuICAgIHRoaXMuYmFja2dyb3VuZENvbG9yKVxuXG4gIC8vRHJhdyBsaW5lc1xuICB0aGlzLl9saW5lcy5iaW5kKFxuICAgIG1vZGVsLFxuICAgIHZpZXcsXG4gICAgcHJvamVjdGlvbixcbiAgICB0aGlzKVxuXG4gIC8vRmlyc3QgZHJhdyBncmlkIGxpbmVzIGFuZCB6ZXJvIGxpbmVzXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIHZhciB4ID0gWzAsMCwwXVxuICAgIGlmKGN1YmVBeGlzW2ldID4gMCkge1xuICAgICAgeFtpXSA9IGJvdW5kc1sxXVtpXVxuICAgIH0gZWxzZSB7XG4gICAgICB4W2ldID0gYm91bmRzWzBdW2ldXG4gICAgfVxuXG4gICAgLy9EcmF3IGdyaWQgbGluZXNcbiAgICBmb3IodmFyIGo9MDsgajwyOyArK2opIHtcbiAgICAgIHZhciB1ID0gKGkgKyAxICsgaikgJSAzXG4gICAgICB2YXIgdiA9IChpICsgMSArIChqXjEpKSAlIDNcbiAgICAgIGlmKHRoaXMuZ3JpZEVuYWJsZVt1XSkge1xuICAgICAgICB0aGlzLl9saW5lcy5kcmF3R3JpZCh1LCB2LCB0aGlzLmJvdW5kcywgeCwgdGhpcy5ncmlkQ29sb3JbdV0sIHRoaXMuZ3JpZFdpZHRoW3VdKnRoaXMucGl4ZWxSYXRpbylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL0RyYXcgemVybyBsaW5lcyAobmVlZCB0byBkbyB0aGlzIEFGVEVSIGFsbCBncmlkIGxpbmVzIGFyZSBkcmF3bilcbiAgICBmb3IodmFyIGo9MDsgajwyOyArK2opIHtcbiAgICAgIHZhciB1ID0gKGkgKyAxICsgaikgJSAzXG4gICAgICB2YXIgdiA9IChpICsgMSArIChqXjEpKSAlIDNcbiAgICAgIGlmKHRoaXMuemVyb0VuYWJsZVt2XSkge1xuICAgICAgICAvL0NoZWNrIGlmIHplcm8gbGluZSBpbiBib3VuZHNcbiAgICAgICAgaWYoTWF0aC5taW4oYm91bmRzWzBdW3ZdLCBib3VuZHNbMV1bdl0pIDw9IDAgJiYgTWF0aC5tYXgoYm91bmRzWzBdW3ZdLCBib3VuZHNbMV1bdl0pID49IDApIHtcbiAgICAgICAgICB0aGlzLl9saW5lcy5kcmF3WmVybyh1LCB2LCB0aGlzLmJvdW5kcywgeCwgdGhpcy56ZXJvTGluZUNvbG9yW3ZdLCB0aGlzLnplcm9MaW5lV2lkdGhbdl0qdGhpcy5waXhlbFJhdGlvKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9UaGVuIGRyYXcgYXhpcyBsaW5lcyBhbmQgdGljayBtYXJrc1xuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcblxuICAgIC8vRHJhdyBheGlzIGxpbmVzXG4gICAgaWYodGhpcy5saW5lRW5hYmxlW2ldKSB7XG4gICAgICB0aGlzLl9saW5lcy5kcmF3QXhpc0xpbmUoaSwgdGhpcy5ib3VuZHMsIGxpbmVPZmZzZXRbaV0ucHJpbWFsT2Zmc2V0LCB0aGlzLmxpbmVDb2xvcltpXSwgdGhpcy5saW5lV2lkdGhbaV0qdGhpcy5waXhlbFJhdGlvKVxuICAgIH1cbiAgICBpZih0aGlzLmxpbmVNaXJyb3JbaV0pIHtcbiAgICAgIHRoaXMuX2xpbmVzLmRyYXdBeGlzTGluZShpLCB0aGlzLmJvdW5kcywgbGluZU9mZnNldFtpXS5taXJyb3JPZmZzZXQsIHRoaXMubGluZUNvbG9yW2ldLCB0aGlzLmxpbmVXaWR0aFtpXSp0aGlzLnBpeGVsUmF0aW8pXG4gICAgfVxuXG4gICAgLy9Db21wdXRlIG1pbm9yIGF4ZXNcbiAgICB2YXIgcHJpbWFsTWlub3IgPSBjb3B5VmVjMyhQUklNQUxfTUlOT1IsIGxpbmVPZmZzZXRbaV0ucHJpbWFsTWlub3IpXG4gICAgdmFyIG1pcnJvck1pbm9yID0gY29weVZlYzMoTUlSUk9SX01JTk9SLCBsaW5lT2Zmc2V0W2ldLm1pcnJvck1pbm9yKVxuICAgIHZhciB0aWNrTGVuZ3RoICA9IHRoaXMubGluZVRpY2tMZW5ndGhcbiAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgIHZhciBzY2FsZUZhY3RvciA9IHBpeGVsU2NhbGVGIC8gbW9kZWxbNSpqXVxuICAgICAgcHJpbWFsTWlub3Jbal0gKj0gdGlja0xlbmd0aFtqXSAqIHNjYWxlRmFjdG9yXG4gICAgICBtaXJyb3JNaW5vcltqXSAqPSB0aWNrTGVuZ3RoW2pdICogc2NhbGVGYWN0b3JcbiAgICB9XG5cblxuXG4gICAgLy9EcmF3IGF4aXMgbGluZSB0aWNrc1xuICAgIGlmKHRoaXMubGluZVRpY2tFbmFibGVbaV0pIHtcbiAgICAgIHRoaXMuX2xpbmVzLmRyYXdBeGlzVGlja3MoaSwgbGluZU9mZnNldFtpXS5wcmltYWxPZmZzZXQsIHByaW1hbE1pbm9yLCB0aGlzLmxpbmVUaWNrQ29sb3JbaV0sIHRoaXMubGluZVRpY2tXaWR0aFtpXSp0aGlzLnBpeGVsUmF0aW8pXG4gICAgfVxuICAgIGlmKHRoaXMubGluZVRpY2tNaXJyb3JbaV0pIHtcbiAgICAgIHRoaXMuX2xpbmVzLmRyYXdBeGlzVGlja3MoaSwgbGluZU9mZnNldFtpXS5taXJyb3JPZmZzZXQsIG1pcnJvck1pbm9yLCB0aGlzLmxpbmVUaWNrQ29sb3JbaV0sIHRoaXMubGluZVRpY2tXaWR0aFtpXSp0aGlzLnBpeGVsUmF0aW8pXG4gICAgfVxuICB9XG4gIHRoaXMuX2xpbmVzLnVuYmluZCgpXG5cbiAgLy9EcmF3IHRleHQgc3ByaXRlc1xuICB0aGlzLl90ZXh0LmJpbmQoXG4gICAgbW9kZWwsXG4gICAgdmlldyxcbiAgICBwcm9qZWN0aW9uLFxuICAgIHRoaXMucGl4ZWxSYXRpbylcblxuICB2YXIgYWxpZ25PcHQgLy8gb3B0aW9ucyBpbiBzaGFkZXIgYXJlIGZyb20gdGhpcyBsaXN0IHstMSwgMCwgMSwgMiwgMywgLi4uLCBufVxuICAvLyAtMTogYmFja3dhcmQgY29tcGF0aWJsZVxuICAvLyAgMDogcmF3IGRhdGFcbiAgLy8gIDE6IGF1dG8gYWxpZ24sIGZyZWUgYW5nbGVzXG4gIC8vICAyOiBhdXRvIGFsaWduLCBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gIC8vMy1uOiBhdXRvIGFsaWduLCByb3VuZCB0byBuIGRpcmVjdGlvbnMgZS5nLiAxMiAtPiByb3VuZCB0byBhbmdsZXMgd2l0aCAzMC1kZWdyZWUgc3RlcHNcblxuICB2YXIgaHZfcmF0aW8gPSAwLjUgLy8gY2FuIGhhdmUgYW4gZWZmZWN0IG9uIHRoZSByYXRpbyBiZXR3ZWVuIGhvcml6b250YWxzIGFuZCB2ZXJ0aWNhbHMgd2hlbiB1c2luZyBvcHRpb24gMlxuXG4gIHZhciBlbmFibGVBbGlnblxuICB2YXIgYWxpZ25EaXJcblxuICBmdW5jdGlvbiBhbGlnblRvKGkpIHtcbiAgICBhbGlnbkRpciA9IFswLDAsMF1cbiAgICBhbGlnbkRpcltpXSA9IDFcbiAgfVxuXG4gIGZ1bmN0aW9uIHNvbHZlVGlja0FsaWdubWVudHMoaSwgbWlub3IsIG1ham9yKSB7XG5cbiAgICB2YXIgaTEgPSAoaSArIDEpICUgM1xuICAgIHZhciBpMiA9IChpICsgMikgJSAzXG5cbiAgICB2YXIgQSA9IG1pbm9yW2kxXVxuICAgIHZhciBCID0gbWlub3JbaTJdXG4gICAgdmFyIEMgPSBtYWpvcltpMV1cbiAgICB2YXIgRCA9IG1ham9yW2kyXVxuXG4gICAgICAgICBpZiAoKEEgPiAwKSAmJiAoRCA+IDApKSB7IGFsaWduVG8oaTEpOyByZXR1cm47IH1cbiAgICBlbHNlIGlmICgoQSA+IDApICYmIChEIDwgMCkpIHsgYWxpZ25UbyhpMSk7IHJldHVybjsgfVxuICAgIGVsc2UgaWYgKChBIDwgMCkgJiYgKEQgPiAwKSkgeyBhbGlnblRvKGkxKTsgcmV0dXJuOyB9XG4gICAgZWxzZSBpZiAoKEEgPCAwKSAmJiAoRCA8IDApKSB7IGFsaWduVG8oaTEpOyByZXR1cm47IH1cbiAgICBlbHNlIGlmICgoQiA+IDApICYmIChDID4gMCkpIHsgYWxpZ25UbyhpMik7IHJldHVybjsgfVxuICAgIGVsc2UgaWYgKChCID4gMCkgJiYgKEMgPCAwKSkgeyBhbGlnblRvKGkyKTsgcmV0dXJuOyB9XG4gICAgZWxzZSBpZiAoKEIgPCAwKSAmJiAoQyA+IDApKSB7IGFsaWduVG8oaTIpOyByZXR1cm47IH1cbiAgICBlbHNlIGlmICgoQiA8IDApICYmIChDIDwgMCkpIHsgYWxpZ25UbyhpMik7IHJldHVybjsgfVxuICB9XG5cbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG5cbiAgICB2YXIgbWlub3IgICAgICA9IGxpbmVPZmZzZXRbaV0ucHJpbWFsTWlub3JcbiAgICB2YXIgbWFqb3IgICAgICA9IGxpbmVPZmZzZXRbaV0ubWlycm9yTWlub3JcblxuICAgIHZhciBvZmZzZXQgICAgID0gY29weVZlYzMoUFJJTUFMX09GRlNFVCwgbGluZU9mZnNldFtpXS5wcmltYWxPZmZzZXQpXG5cbiAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgIGlmKHRoaXMubGluZVRpY2tFbmFibGVbaV0pIHtcbiAgICAgICAgb2Zmc2V0W2pdICs9IHBpeGVsU2NhbGVGICogbWlub3Jbal0gKiBNYXRoLm1heCh0aGlzLmxpbmVUaWNrTGVuZ3RoW2pdLCAwKSAgLyBtb2RlbFs1KmpdXG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGF4aXMgPSBbMCwwLDBdXG4gICAgYXhpc1tpXSA9IDFcblxuICAgIC8vRHJhdyB0aWNrIHRleHRcbiAgICBpZih0aGlzLnRpY2tFbmFibGVbaV0pIHtcblxuICAgICAgaWYodGhpcy50aWNrQW5nbGVbaV0gPT09IC0zNjAwKSB7XG4gICAgICAgIHRoaXMudGlja0FuZ2xlW2ldID0gMFxuICAgICAgICB0aGlzLnRpY2tBbGlnbltpXSA9ICdhdXRvJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50aWNrQWxpZ25baV0gPSAtMVxuICAgICAgfVxuXG4gICAgICBlbmFibGVBbGlnbiA9IDE7XG5cbiAgICAgIGFsaWduT3B0ID0gW3RoaXMudGlja0FsaWduW2ldLCBodl9yYXRpbywgZW5hYmxlQWxpZ25dXG4gICAgICBpZihhbGlnbk9wdFswXSA9PT0gJ2F1dG8nKSBhbGlnbk9wdFswXSA9IEFMSUdOX09QVElPTl9BVVRPXG4gICAgICBlbHNlIGFsaWduT3B0WzBdID0gcGFyc2VJbnQoJycgKyBhbGlnbk9wdFswXSlcblxuICAgICAgYWxpZ25EaXIgPSBbMCwwLDBdXG4gICAgICBzb2x2ZVRpY2tBbGlnbm1lbnRzKGksIG1pbm9yLCBtYWpvcilcblxuICAgICAgLy9BZGQgdGljayBwYWRkaW5nXG4gICAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgICAgb2Zmc2V0W2pdICs9IHBpeGVsU2NhbGVGICogbWlub3Jbal0gKiB0aGlzLnRpY2tQYWRbal0gLyBtb2RlbFs1KmpdXG4gICAgICB9XG5cbiAgICAgIC8vRHJhdyBheGlzXG4gICAgICB0aGlzLl90ZXh0LmRyYXdUaWNrcyhcbiAgICAgICAgaSxcbiAgICAgICAgdGhpcy50aWNrU2l6ZVtpXSxcbiAgICAgICAgdGhpcy50aWNrQW5nbGVbaV0sXG4gICAgICAgIG9mZnNldCxcbiAgICAgICAgdGhpcy50aWNrQ29sb3JbaV0sXG4gICAgICAgIGF4aXMsXG4gICAgICAgIGFsaWduRGlyLFxuICAgICAgICBhbGlnbk9wdClcbiAgICB9XG5cbiAgICAvL0RyYXcgbGFiZWxzXG4gICAgaWYodGhpcy5sYWJlbEVuYWJsZVtpXSkge1xuXG4gICAgICBlbmFibGVBbGlnbiA9IDBcbiAgICAgIGFsaWduRGlyID0gWzAsMCwwXVxuICAgICAgaWYodGhpcy5sYWJlbHNbaV0ubGVuZ3RoID4gNCkgeyAvLyBmb3IgbGFyZ2UgbGFiZWwgYXhpcyBlbmFibGUgYWxpZ25EaXIgdG8gYXhpc1xuICAgICAgICBhbGlnblRvKGkpXG4gICAgICAgIGVuYWJsZUFsaWduID0gMVxuICAgICAgfVxuXG4gICAgICBhbGlnbk9wdCA9IFt0aGlzLmxhYmVsQWxpZ25baV0sIGh2X3JhdGlvLCBlbmFibGVBbGlnbl1cbiAgICAgIGlmKGFsaWduT3B0WzBdID09PSAnYXV0bycpIGFsaWduT3B0WzBdID0gQUxJR05fT1BUSU9OX0FVVE9cbiAgICAgIGVsc2UgYWxpZ25PcHRbMF0gPSBwYXJzZUludCgnJyArIGFsaWduT3B0WzBdKVxuXG4gICAgICAvL0FkZCBsYWJlbCBwYWRkaW5nXG4gICAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgICAgb2Zmc2V0W2pdICs9IHBpeGVsU2NhbGVGICogbWlub3Jbal0gKiB0aGlzLmxhYmVsUGFkW2pdIC8gbW9kZWxbNSpqXVxuICAgICAgfVxuICAgICAgb2Zmc2V0W2ldICs9IDAuNSAqIChib3VuZHNbMF1baV0gKyBib3VuZHNbMV1baV0pXG5cbiAgICAgIC8vRHJhdyBheGlzXG4gICAgICB0aGlzLl90ZXh0LmRyYXdMYWJlbChcbiAgICAgICAgaSxcbiAgICAgICAgdGhpcy5sYWJlbFNpemVbaV0sXG4gICAgICAgIHRoaXMubGFiZWxBbmdsZVtpXSxcbiAgICAgICAgb2Zmc2V0LFxuICAgICAgICB0aGlzLmxhYmVsQ29sb3JbaV0sXG4gICAgICAgIFswLDAsMF0sXG4gICAgICAgIGFsaWduRGlyLFxuICAgICAgICBhbGlnbk9wdClcbiAgICB9XG4gIH1cblxuICB0aGlzLl90ZXh0LnVuYmluZCgpXG59XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fdGV4dC5kaXNwb3NlKClcbiAgdGhpcy5fbGluZXMuZGlzcG9zZSgpXG4gIHRoaXMuX2JhY2tncm91bmQuZGlzcG9zZSgpXG4gIHRoaXMuX2xpbmVzID0gbnVsbFxuICB0aGlzLl90ZXh0ID0gbnVsbFxuICB0aGlzLl9iYWNrZ3JvdW5kID0gbnVsbFxuICB0aGlzLmdsID0gbnVsbFxufVxuXG5mdW5jdGlvbiBjcmVhdGVBeGVzKGdsLCBvcHRpb25zKSB7XG4gIHZhciBheGVzID0gbmV3IEF4ZXMoZ2wpXG4gIGF4ZXMudXBkYXRlKG9wdGlvbnMpXG4gIHJldHVybiBheGVzXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCYWNrZ3JvdW5kQ3ViZVxuXG52YXIgY3JlYXRlQnVmZmVyID0gcmVxdWlyZSgnZ2wtYnVmZmVyJylcbnZhciBjcmVhdGVWQU8gICAgPSByZXF1aXJlKCdnbC12YW8nKVxudmFyIGNyZWF0ZVNoYWRlciA9IHJlcXVpcmUoJy4vc2hhZGVycycpLmJnXG5cbmZ1bmN0aW9uIEJhY2tncm91bmRDdWJlKGdsLCBidWZmZXIsIHZhbywgc2hhZGVyKSB7XG4gIHRoaXMuZ2wgPSBnbFxuICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlclxuICB0aGlzLnZhbyA9IHZhb1xuICB0aGlzLnNoYWRlciA9IHNoYWRlclxufVxuXG52YXIgcHJvdG8gPSBCYWNrZ3JvdW5kQ3ViZS5wcm90b3R5cGVcblxucHJvdG8uZHJhdyA9IGZ1bmN0aW9uKG1vZGVsLCB2aWV3LCBwcm9qZWN0aW9uLCBib3VuZHMsIGVuYWJsZSwgY29sb3JzKSB7XG4gIHZhciBuZWVkc0JHID0gZmFsc2VcbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgbmVlZHNCRyA9IG5lZWRzQkcgfHwgZW5hYmxlW2ldXG4gIH1cbiAgaWYoIW5lZWRzQkcpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBnbCA9IHRoaXMuZ2xcblxuICBnbC5lbmFibGUoZ2wuUE9MWUdPTl9PRkZTRVRfRklMTClcbiAgZ2wucG9seWdvbk9mZnNldCgxLCAyKVxuXG4gIHRoaXMuc2hhZGVyLmJpbmQoKVxuICB0aGlzLnNoYWRlci51bmlmb3JtcyA9IHtcbiAgICBtb2RlbDogbW9kZWwsXG4gICAgdmlldzogdmlldyxcbiAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uLFxuICAgIGJvdW5kczogYm91bmRzLFxuICAgIGVuYWJsZTogZW5hYmxlLFxuICAgIGNvbG9yczogY29sb3JzXG4gIH1cbiAgdGhpcy52YW8uYmluZCgpXG4gIHRoaXMudmFvLmRyYXcodGhpcy5nbC5UUklBTkdMRVMsIDM2KVxuICB0aGlzLnZhby51bmJpbmQoKVxuXG4gIGdsLmRpc2FibGUoZ2wuUE9MWUdPTl9PRkZTRVRfRklMTClcbn1cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZhby5kaXNwb3NlKClcbiAgdGhpcy5idWZmZXIuZGlzcG9zZSgpXG4gIHRoaXMuc2hhZGVyLmRpc3Bvc2UoKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVCYWNrZ3JvdW5kQ3ViZShnbCkge1xuICAvL0NyZWF0ZSBjdWJlIHZlcnRpY2VzXG4gIHZhciB2ZXJ0aWNlcyA9IFtdXG4gIHZhciBpbmRpY2VzICA9IFtdXG4gIHZhciBwdHIgPSAwXG4gIGZvcih2YXIgZD0wOyBkPDM7ICsrZCkge1xuICAgIHZhciB1ID0gKGQrMSkgJSAzXG4gICAgdmFyIHYgPSAoZCsyKSAlIDNcbiAgICB2YXIgeCA9IFswLDAsMF1cbiAgICB2YXIgYyA9IFswLDAsMF1cbiAgICBmb3IodmFyIHM9LTE7IHM8PTE7IHMrPTIpIHtcbiAgICAgIGluZGljZXMucHVzaChwdHIsICAgcHRyKzIsIHB0cisxLFxuICAgICAgICAgICAgICAgICAgIHB0cisxLCBwdHIrMiwgcHRyKzMpXG4gICAgICB4W2RdID0gc1xuICAgICAgY1tkXSA9IHNcbiAgICAgIGZvcih2YXIgaT0tMTsgaTw9MTsgaSs9Mikge1xuICAgICAgICB4W3VdID0gaVxuICAgICAgICBmb3IodmFyIGo9LTE7IGo8PTE7IGorPTIpIHtcbiAgICAgICAgICB4W3ZdID0galxuICAgICAgICAgIHZlcnRpY2VzLnB1c2goeFswXSwgeFsxXSwgeFsyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNbMF0sIGNbMV0sIGNbMl0pXG4gICAgICAgICAgcHRyICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy9Td2FwIHUgYW5kIHZcbiAgICAgIHZhciB0dCA9IHVcbiAgICAgIHUgPSB2XG4gICAgICB2ID0gdHRcbiAgICB9XG4gIH1cblxuICAvL0FsbG9jYXRlIGJ1ZmZlciBhbmQgdmVydGV4IGFycmF5XG4gIHZhciBidWZmZXIgPSBjcmVhdGVCdWZmZXIoZ2wsIG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMpKVxuICB2YXIgZWxlbWVudHMgPSBjcmVhdGVCdWZmZXIoZ2wsIG5ldyBVaW50MTZBcnJheShpbmRpY2VzKSwgZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIpXG4gIHZhciB2YW8gPSBjcmVhdGVWQU8oZ2wsIFtcbiAgICAgIHtcbiAgICAgICAgYnVmZmVyOiBidWZmZXIsXG4gICAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgICBzaXplOiAzLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIHN0cmlkZTogMjRcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJ1ZmZlcjogYnVmZmVyLFxuICAgICAgICB0eXBlOiBnbC5GTE9BVCxcbiAgICAgICAgc2l6ZTogMyxcbiAgICAgICAgb2Zmc2V0OiAxMixcbiAgICAgICAgc3RyaWRlOiAyNFxuICAgICAgfVxuICAgIF0sIGVsZW1lbnRzKVxuXG4gIC8vQ3JlYXRlIHNoYWRlciBvYmplY3RcbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbClcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ubG9jYXRpb24gPSAwXG4gIHNoYWRlci5hdHRyaWJ1dGVzLm5vcm1hbC5sb2NhdGlvbiA9IDFcblxuICByZXR1cm4gbmV3IEJhY2tncm91bmRDdWJlKGdsLCBidWZmZXIsIHZhbywgc2hhZGVyKVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRDdWJlRWRnZXNcblxudmFyIGJpdHMgICAgICA9IHJlcXVpcmUoJ2JpdC10d2lkZGxlJylcbnZhciBtdWx0aXBseSAgPSByZXF1aXJlKCdnbC1tYXQ0L211bHRpcGx5JylcbnZhciBzcGxpdFBvbHkgPSByZXF1aXJlKCdzcGxpdC1wb2x5Z29uJylcbnZhciBvcmllbnQgICAgPSByZXF1aXJlKCdyb2J1c3Qtb3JpZW50YXRpb24nKVxuXG52YXIgbXZwICAgICAgICA9IG5ldyBBcnJheSgxNilcbnZhciBwQ3ViZVZlcnRzID0gbmV3IEFycmF5KDgpXG52YXIgY3ViZVZlcnRzICA9IG5ldyBBcnJheSg4KVxudmFyIHggICAgICAgICAgPSBuZXcgQXJyYXkoMylcbnZhciB6ZXJvMyAgICAgID0gWzAsMCwwXVxuXG47KGZ1bmN0aW9uKCkge1xuICBmb3IodmFyIGk9MDsgaTw4OyArK2kpIHtcbiAgICBwQ3ViZVZlcnRzW2ldID1bMSwxLDEsMV1cbiAgICBjdWJlVmVydHNbaV0gPSBbMSwxLDFdXG4gIH1cbn0pKClcblxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1IZyhyZXN1bHQsIHgsIG1hdCkge1xuICBmb3IodmFyIGk9MDsgaTw0OyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSBtYXRbMTIraV1cbiAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgIHJlc3VsdFtpXSArPSB4W2pdKm1hdFs0KmoraV1cbiAgICB9XG4gIH1cbn1cblxudmFyIEZSVVNUVU1fUExBTkVTID0gW1xuICBbIDAsIDAsIDEsIDAsIDBdLFxuICBbIDAsIDAsLTEsIDEsIDBdLFxuICBbIDAsLTEsIDAsIDEsIDBdLFxuICBbIDAsIDEsIDAsIDEsIDBdLFxuICBbLTEsIDAsIDAsIDEsIDBdLFxuICBbIDEsIDAsIDAsIDEsIDBdXG5dXG5cbmZ1bmN0aW9uIHBvbHlnb25BcmVhKHApIHtcbiAgZm9yKHZhciBpPTA7IGk8RlJVU1RVTV9QTEFORVMubGVuZ3RoOyArK2kpIHtcbiAgICBwID0gc3BsaXRQb2x5LnBvc2l0aXZlKHAsIEZSVVNUVU1fUExBTkVTW2ldKVxuICAgIGlmKHAubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9IHBbMF1cbiAgdmFyIGF4ID0gYmFzZVswXSAvIGJhc2VbM11cbiAgdmFyIGF5ID0gYmFzZVsxXSAvIGJhc2VbM11cbiAgdmFyIGFyZWEgPSAwLjBcbiAgZm9yKHZhciBpPTE7IGkrMTxwLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGIgPSBwW2ldXG4gICAgdmFyIGMgPSBwW2krMV1cblxuICAgIHZhciBieCA9IGJbMF0vYlszXVxuICAgIHZhciBieSA9IGJbMV0vYlszXVxuICAgIHZhciBjeCA9IGNbMF0vY1szXVxuICAgIHZhciBjeSA9IGNbMV0vY1szXVxuXG4gICAgdmFyIHV4ID0gYnggLSBheFxuICAgIHZhciB1eSA9IGJ5IC0gYXlcblxuICAgIHZhciB2eCA9IGN4IC0gYXhcbiAgICB2YXIgdnkgPSBjeSAtIGF5XG5cbiAgICBhcmVhICs9IE1hdGguYWJzKHV4ICogdnkgLSB1eSAqIHZ4KVxuICB9XG5cbiAgcmV0dXJuIGFyZWFcbn1cblxudmFyIENVQkVfRURHRVMgPSBbMSwxLDFdXG52YXIgQ1VCRV9BWElTICA9IFswLDAsMF1cbnZhciBDVUJFX1JFU1VMVCA9IHtcbiAgY3ViZUVkZ2VzOiBDVUJFX0VER0VTLFxuICBheGlzOiBDVUJFX0FYSVNcbn1cblxuZnVuY3Rpb24gZ2V0Q3ViZUVkZ2VzKG1vZGVsLCB2aWV3LCBwcm9qZWN0aW9uLCBib3VuZHMsIG9ydGhvKSB7XG5cbiAgLy9Db25jYXRlbmF0ZSBtYXRyaWNlc1xuICBtdWx0aXBseShtdnAsIHZpZXcsIG1vZGVsKVxuICBtdWx0aXBseShtdnAsIHByb2plY3Rpb24sIG12cClcblxuICAvL0ZpcnN0IHByb2plY3QgY3ViZSB2ZXJ0aWNlc1xuICB2YXIgcHRyID0gMFxuICBmb3IodmFyIGk9MDsgaTwyOyArK2kpIHtcbiAgICB4WzJdID0gYm91bmRzW2ldWzJdXG4gICAgZm9yKHZhciBqPTA7IGo8MjsgKytqKSB7XG4gICAgICB4WzFdID0gYm91bmRzW2pdWzFdXG4gICAgICBmb3IodmFyIGs9MDsgazwyOyArK2spIHtcbiAgICAgICAgeFswXSA9IGJvdW5kc1trXVswXVxuICAgICAgICB0cmFuc2Zvcm1IZyhwQ3ViZVZlcnRzW3B0cl0sIHgsIG12cClcbiAgICAgICAgcHRyICs9IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL0NsYXNzaWZ5IGNhbWVyYSBhZ2FpbnN0IGN1YmUgZmFjZXNcbiAgdmFyIGNsb3Nlc3QgPSAtMVxuXG4gIGZvcih2YXIgaT0wOyBpPDg7ICsraSkge1xuICAgIHZhciB3ID0gcEN1YmVWZXJ0c1tpXVszXVxuICAgIGZvcih2YXIgbD0wOyBsPDM7ICsrbCkge1xuICAgICAgY3ViZVZlcnRzW2ldW2xdID0gcEN1YmVWZXJ0c1tpXVtsXSAvIHdcbiAgICB9XG5cbiAgICBpZihvcnRobykgY3ViZVZlcnRzW2ldWzJdICo9IC0xO1xuXG4gICAgaWYodyA8IDApIHtcbiAgICAgIGlmKGNsb3Nlc3QgPCAwKSB7XG4gICAgICAgIGNsb3Nlc3QgPSBpXG4gICAgICB9IGVsc2UgaWYoY3ViZVZlcnRzW2ldWzJdIDwgY3ViZVZlcnRzW2Nsb3Nlc3RdWzJdKSB7XG4gICAgICAgIGNsb3Nlc3QgPSBpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYoY2xvc2VzdCA8IDApIHtcbiAgICBjbG9zZXN0ID0gMFxuICAgIGZvcih2YXIgZD0wOyBkPDM7ICsrZCkge1xuICAgICAgdmFyIHUgPSAoZCsyKSAlIDNcbiAgICAgIHZhciB2ID0gKGQrMSkgJSAzXG4gICAgICB2YXIgbzAgPSAtMVxuICAgICAgdmFyIG8xID0gLTFcbiAgICAgIGZvcih2YXIgcz0wOyBzPDI7ICsrcykge1xuICAgICAgICB2YXIgZjAgPSAoczw8ZClcbiAgICAgICAgdmFyIGYxID0gZjAgKyAocyA8PCB1KSArICgoMS1zKSA8PCB2KVxuICAgICAgICB2YXIgZjIgPSBmMCArICgoMS1zKSA8PCB1KSArIChzIDw8IHYpXG4gICAgICAgIGlmKG9yaWVudChjdWJlVmVydHNbZjBdLCBjdWJlVmVydHNbZjFdLCBjdWJlVmVydHNbZjJdLCB6ZXJvMykgPCAwKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBpZihzKSB7XG4gICAgICAgICAgbzAgPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbzEgPSAxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKG8wIDwgMCB8fCBvMSA8IDApIHtcbiAgICAgICAgaWYobzEgPiBvMCkge1xuICAgICAgICAgIGNsb3Nlc3QgfD0gMTw8ZFxuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBmb3IodmFyIHM9MDsgczwyOyArK3MpIHtcbiAgICAgICAgdmFyIGYwID0gKHM8PGQpXG4gICAgICAgIHZhciBmMSA9IGYwICsgKHMgPDwgdSkgKyAoKDEtcykgPDwgdilcbiAgICAgICAgdmFyIGYyID0gZjAgKyAoKDEtcykgPDwgdSkgKyAocyA8PCB2KVxuICAgICAgICB2YXIgbyA9IHBvbHlnb25BcmVhKFtcbiAgICAgICAgICAgIHBDdWJlVmVydHNbZjBdLFxuICAgICAgICAgICAgcEN1YmVWZXJ0c1tmMV0sXG4gICAgICAgICAgICBwQ3ViZVZlcnRzW2YyXSxcbiAgICAgICAgICAgIHBDdWJlVmVydHNbZjArKDE8PHUpKygxPDx2KV1dKVxuICAgICAgICBpZihzKSB7XG4gICAgICAgICAgbzAgPSBvXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbzEgPSBvXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKG8xID4gbzApIHtcbiAgICAgICAgY2xvc2VzdCB8PSAxPDxkXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGZhcnRoZXN0ID0gN15jbG9zZXN0XG5cbiAgLy9GaW5kIGxvd2VzdCB2ZXJ0ZXggd2hpY2ggaXMgbm90IGNsb3Nlc3QgY2xvc2VzdFxuICB2YXIgYm90dG9tID0gLTFcbiAgZm9yKHZhciBpPTA7IGk8ODsgKytpKSB7XG4gICAgaWYoaSA9PT0gY2xvc2VzdCB8fCBpID09PSBmYXJ0aGVzdCkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgaWYoYm90dG9tIDwgMCkge1xuICAgICAgYm90dG9tID0gaVxuICAgIH0gZWxzZSBpZihjdWJlVmVydHNbYm90dG9tXVsxXSA+IGN1YmVWZXJ0c1tpXVsxXSkge1xuICAgICAgYm90dG9tID0gaVxuICAgIH1cbiAgfVxuXG4gIC8vRmluZCBsZWZ0L3JpZ2h0IG5laWdoYm9ycyBvZiBib3R0b20gdmVydGV4XG4gIHZhciBsZWZ0ID0gLTFcbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgdmFyIGlkeCA9IGJvdHRvbSBeICgxPDxpKVxuICAgIGlmKGlkeCA9PT0gY2xvc2VzdCB8fCBpZHggPT09IGZhcnRoZXN0KSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZihsZWZ0IDwgMCkge1xuICAgICAgbGVmdCA9IGlkeFxuICAgIH1cbiAgICB2YXIgdiA9IGN1YmVWZXJ0c1tpZHhdXG4gICAgaWYodlswXSA8IGN1YmVWZXJ0c1tsZWZ0XVswXSkge1xuICAgICAgbGVmdCA9IGlkeFxuICAgIH1cbiAgfVxuICB2YXIgcmlnaHQgPSAtMVxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICB2YXIgaWR4ID0gYm90dG9tIF4gKDE8PGkpXG4gICAgaWYoaWR4ID09PSBjbG9zZXN0IHx8IGlkeCA9PT0gZmFydGhlc3QgfHwgaWR4ID09PSBsZWZ0KSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZihyaWdodCA8IDApIHtcbiAgICAgIHJpZ2h0ID0gaWR4XG4gICAgfVxuICAgIHZhciB2ID0gY3ViZVZlcnRzW2lkeF1cbiAgICBpZih2WzBdID4gY3ViZVZlcnRzW3JpZ2h0XVswXSkge1xuICAgICAgcmlnaHQgPSBpZHhcbiAgICB9XG4gIH1cblxuICAvL0RldGVybWluZSBlZGdlIGF4aXMgY29vcmRpbmF0ZXNcbiAgdmFyIGN1YmVFZGdlcyA9IENVQkVfRURHRVNcbiAgY3ViZUVkZ2VzWzBdID0gY3ViZUVkZ2VzWzFdID0gY3ViZUVkZ2VzWzJdID0gMFxuICBjdWJlRWRnZXNbYml0cy5sb2cyKGxlZnReYm90dG9tKV0gPSBib3R0b20mbGVmdFxuICBjdWJlRWRnZXNbYml0cy5sb2cyKGJvdHRvbV5yaWdodCldID0gYm90dG9tJnJpZ2h0XG4gIHZhciB0b3AgPSByaWdodCBeIDdcbiAgaWYodG9wID09PSBjbG9zZXN0IHx8IHRvcCA9PT0gZmFydGhlc3QpIHtcbiAgICB0b3AgPSBsZWZ0IF4gN1xuICAgIGN1YmVFZGdlc1tiaXRzLmxvZzIocmlnaHRedG9wKV0gPSB0b3AmcmlnaHRcbiAgfSBlbHNlIHtcbiAgICBjdWJlRWRnZXNbYml0cy5sb2cyKGxlZnRedG9wKV0gPSB0b3AmbGVmdFxuICB9XG5cbiAgLy9EZXRlcm1pbmUgdmlzaWJsZSBmYWNlc1xuICB2YXIgYXhpcyA9IENVQkVfQVhJU1xuICB2YXIgY3V0Q29ybmVyID0gY2xvc2VzdFxuICBmb3IodmFyIGQ9MDsgZDwzOyArK2QpIHtcbiAgICBpZihjdXRDb3JuZXIgJiAoMTw8ZCkpIHtcbiAgICAgIGF4aXNbZF0gPSAtMVxuICAgIH0gZWxzZSB7XG4gICAgICBheGlzW2RdID0gMVxuICAgIH1cbiAgfVxuXG4gIC8vUmV0dXJuIHJlc3VsdFxuICByZXR1cm4gQ1VCRV9SRVNVTFRcbn0iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgICAgPSBjcmVhdGVMaW5lc1xuXG52YXIgY3JlYXRlQnVmZmVyICA9IHJlcXVpcmUoJ2dsLWJ1ZmZlcicpXG52YXIgY3JlYXRlVkFPICAgICA9IHJlcXVpcmUoJ2dsLXZhbycpXG52YXIgY3JlYXRlU2hhZGVyICA9IHJlcXVpcmUoJy4vc2hhZGVycycpLmxpbmVcblxudmFyIE1BSk9SX0FYSVMgPSBbMCwwLDBdXG52YXIgTUlOT1JfQVhJUyA9IFswLDAsMF1cbnZhciBTQ1JFRU5fQVhJUyA9IFswLDAsMF1cbnZhciBPRkZTRVRfVkVDID0gWzAsMCwwXVxudmFyIFNIQVBFID0gWzEsMV1cblxuZnVuY3Rpb24gemVyb1ZlYyhhKSB7XG4gIGFbMF0gPSBhWzFdID0gYVsyXSA9IDBcbiAgcmV0dXJuIGFcbn1cblxuZnVuY3Rpb24gY29weVZlYyhhLGIpIHtcbiAgYVswXSA9IGJbMF1cbiAgYVsxXSA9IGJbMV1cbiAgYVsyXSA9IGJbMl1cbiAgcmV0dXJuIGFcbn1cblxuZnVuY3Rpb24gTGluZXMoZ2wsIHZlcnRCdWZmZXIsIHZhbywgc2hhZGVyLCB0aWNrQ291bnQsIHRpY2tPZmZzZXQsIGdyaWRDb3VudCwgZ3JpZE9mZnNldCkge1xuICB0aGlzLmdsICAgICAgICAgPSBnbFxuICB0aGlzLnZlcnRCdWZmZXIgPSB2ZXJ0QnVmZmVyXG4gIHRoaXMudmFvICAgICAgICA9IHZhb1xuICB0aGlzLnNoYWRlciAgICAgPSBzaGFkZXJcbiAgdGhpcy50aWNrQ291bnQgID0gdGlja0NvdW50XG4gIHRoaXMudGlja09mZnNldCA9IHRpY2tPZmZzZXRcbiAgdGhpcy5ncmlkQ291bnQgID0gZ3JpZENvdW50XG4gIHRoaXMuZ3JpZE9mZnNldCA9IGdyaWRPZmZzZXRcbn1cblxudmFyIHByb3RvID0gTGluZXMucHJvdG90eXBlXG5cbnByb3RvLmJpbmQgPSBmdW5jdGlvbihtb2RlbCwgdmlldywgcHJvamVjdGlvbikge1xuICB0aGlzLnNoYWRlci5iaW5kKClcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMubW9kZWwgPSBtb2RlbFxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy52aWV3ID0gdmlld1xuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5wcm9qZWN0aW9uID0gcHJvamVjdGlvblxuXG4gIFNIQVBFWzBdID0gdGhpcy5nbC5kcmF3aW5nQnVmZmVyV2lkdGhcbiAgU0hBUEVbMV0gPSB0aGlzLmdsLmRyYXdpbmdCdWZmZXJIZWlnaHRcblxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5zY3JlZW5TaGFwZSA9IFNIQVBFXG4gIHRoaXMudmFvLmJpbmQoKVxufVxuXG5wcm90by51bmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy52YW8udW5iaW5kKClcbn1cblxucHJvdG8uZHJhd0F4aXNMaW5lID0gZnVuY3Rpb24oaiwgYm91bmRzLCBvZmZzZXQsIGNvbG9yLCBsaW5lV2lkdGgpIHtcbiAgdmFyIG1pbm9yQXhpcyA9IHplcm9WZWMoTUlOT1JfQVhJUylcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMubWFqb3JBeGlzID0gTUlOT1JfQVhJU1xuXG4gIG1pbm9yQXhpc1tqXSA9IGJvdW5kc1sxXVtqXSAtIGJvdW5kc1swXVtqXVxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5taW5vckF4aXMgPSBtaW5vckF4aXNcblxuICB2YXIgbm9mZnNldCA9IGNvcHlWZWMoT0ZGU0VUX1ZFQywgb2Zmc2V0KVxuICBub2Zmc2V0W2pdICs9IGJvdW5kc1swXVtqXVxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5vZmZzZXQgPSBub2Zmc2V0XG5cbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMubGluZVdpZHRoID0gbGluZVdpZHRoXG5cbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMuY29sb3IgPSBjb2xvclxuXG4gIHZhciBzY3JlZW5BeGlzID0gemVyb1ZlYyhTQ1JFRU5fQVhJUylcbiAgc2NyZWVuQXhpc1soaisyKSUzXSA9IDFcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMuc2NyZWVuQXhpcyA9IHNjcmVlbkF4aXNcbiAgdGhpcy52YW8uZHJhdyh0aGlzLmdsLlRSSUFOR0xFUywgNilcblxuICB2YXIgc2NyZWVuQXhpcyA9IHplcm9WZWMoU0NSRUVOX0FYSVMpXG4gIHNjcmVlbkF4aXNbKGorMSklM10gPSAxXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLnNjcmVlbkF4aXMgPSBzY3JlZW5BeGlzXG4gIHRoaXMudmFvLmRyYXcodGhpcy5nbC5UUklBTkdMRVMsIDYpXG59XG5cbnByb3RvLmRyYXdBeGlzVGlja3MgPSBmdW5jdGlvbihqLCBvZmZzZXQsIG1pbm9yQXhpcywgY29sb3IsIGxpbmVXaWR0aCkge1xuICBpZighdGhpcy50aWNrQ291bnRbal0pIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBtYWpvckF4aXMgPSB6ZXJvVmVjKE1BSk9SX0FYSVMpXG4gIG1ham9yQXhpc1tqXSAgPSAxXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLm1ham9yQXhpcyA9IG1ham9yQXhpc1xuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5vZmZzZXQgICAgPSBvZmZzZXRcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMubWlub3JBeGlzID0gbWlub3JBeGlzXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLmNvbG9yICAgICA9IGNvbG9yXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLmxpbmVXaWR0aCA9IGxpbmVXaWR0aFxuXG4gIHZhciBzY3JlZW5BeGlzID0gemVyb1ZlYyhTQ1JFRU5fQVhJUylcbiAgc2NyZWVuQXhpc1tqXSA9IDFcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMuc2NyZWVuQXhpcyA9IHNjcmVlbkF4aXNcbiAgdGhpcy52YW8uZHJhdyh0aGlzLmdsLlRSSUFOR0xFUywgdGhpcy50aWNrQ291bnRbal0sIHRoaXMudGlja09mZnNldFtqXSlcbn1cblxuXG5wcm90by5kcmF3R3JpZCA9IGZ1bmN0aW9uKGksIGosIGJvdW5kcywgb2Zmc2V0LCBjb2xvciwgbGluZVdpZHRoKSB7XG4gIGlmKCF0aGlzLmdyaWRDb3VudFtpXSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIG1pbm9yQXhpcyA9IHplcm9WZWMoTUlOT1JfQVhJUylcbiAgbWlub3JBeGlzW2pdICA9IGJvdW5kc1sxXVtqXSAtIGJvdW5kc1swXVtqXVxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5taW5vckF4aXMgPSBtaW5vckF4aXNcblxuICB2YXIgbm9mZnNldCA9IGNvcHlWZWMoT0ZGU0VUX1ZFQywgb2Zmc2V0KVxuICBub2Zmc2V0W2pdICs9IGJvdW5kc1swXVtqXVxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5vZmZzZXQgPSBub2Zmc2V0XG5cbiAgdmFyIG1ham9yQXhpcyA9IHplcm9WZWMoTUFKT1JfQVhJUylcbiAgbWFqb3JBeGlzW2ldICA9IDFcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMubWFqb3JBeGlzID0gbWFqb3JBeGlzXG5cbiAgdmFyIHNjcmVlbkF4aXMgPSB6ZXJvVmVjKFNDUkVFTl9BWElTKVxuICBzY3JlZW5BeGlzW2ldID0gMVxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5zY3JlZW5BeGlzID0gc2NyZWVuQXhpc1xuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5saW5lV2lkdGggPSBsaW5lV2lkdGhcblxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5jb2xvciA9IGNvbG9yXG4gIHRoaXMudmFvLmRyYXcodGhpcy5nbC5UUklBTkdMRVMsIHRoaXMuZ3JpZENvdW50W2ldLCB0aGlzLmdyaWRPZmZzZXRbaV0pXG59XG5cbnByb3RvLmRyYXdaZXJvID0gZnVuY3Rpb24oaiwgaSwgYm91bmRzLCBvZmZzZXQsIGNvbG9yLCBsaW5lV2lkdGgpIHtcbiAgdmFyIG1pbm9yQXhpcyA9IHplcm9WZWMoTUlOT1JfQVhJUylcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMubWFqb3JBeGlzID0gbWlub3JBeGlzXG5cbiAgbWlub3JBeGlzW2pdID0gYm91bmRzWzFdW2pdIC0gYm91bmRzWzBdW2pdXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLm1pbm9yQXhpcyA9IG1pbm9yQXhpc1xuXG4gIHZhciBub2Zmc2V0ID0gY29weVZlYyhPRkZTRVRfVkVDLCBvZmZzZXQpXG4gIG5vZmZzZXRbal0gKz0gYm91bmRzWzBdW2pdXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLm9mZnNldCA9IG5vZmZzZXRcblxuICB2YXIgc2NyZWVuQXhpcyA9IHplcm9WZWMoU0NSRUVOX0FYSVMpXG4gIHNjcmVlbkF4aXNbaV0gPSAxXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLnNjcmVlbkF4aXMgPSBzY3JlZW5BeGlzXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLmxpbmVXaWR0aCA9IGxpbmVXaWR0aFxuXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLmNvbG9yID0gY29sb3JcbiAgdGhpcy52YW8uZHJhdyh0aGlzLmdsLlRSSUFOR0xFUywgNilcbn1cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZhby5kaXNwb3NlKClcbiAgdGhpcy52ZXJ0QnVmZmVyLmRpc3Bvc2UoKVxuICB0aGlzLnNoYWRlci5kaXNwb3NlKClcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGluZXMoZ2wsIGJvdW5kcywgdGlja3MpIHtcbiAgdmFyIHZlcnRpY2VzICAgID0gW11cbiAgdmFyIHRpY2tPZmZzZXQgID0gWzAsMCwwXVxuICB2YXIgdGlja0NvdW50ICAgPSBbMCwwLDBdXG5cbiAgLy9DcmVhdGUgZ3JpZCBsaW5lcyBmb3IgZWFjaCBheGlzL2RpcmVjdGlvblxuICB2YXIgZ3JpZE9mZnNldCA9IFswLDAsMF1cbiAgdmFyIGdyaWRDb3VudCAgPSBbMCwwLDBdXG5cbiAgLy9BZGQgemVybyBsaW5lXG4gIHZlcnRpY2VzLnB1c2goXG4gICAgMCwwLDEsICAgMCwxLDEsICAgMCwwLC0xLFxuICAgIDAsMCwtMSwgIDAsMSwxLCAgIDAsMSwtMSlcblxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICAvL0F4aXMgdGljayBtYXJrc1xuICAgIHZhciBzdGFydCA9ICgodmVydGljZXMubGVuZ3RoIC8gMyl8MClcbiAgICBmb3IodmFyIGo9MDsgajx0aWNrc1tpXS5sZW5ndGg7ICsraikge1xuICAgICAgdmFyIHggPSArdGlja3NbaV1bal0ueFxuICAgICAgdmVydGljZXMucHVzaChcbiAgICAgICAgeCwwLDEsICAgeCwxLDEsICAgeCwwLC0xLFxuICAgICAgICB4LDAsLTEsICB4LDEsMSwgICB4LDEsLTEpXG4gICAgfVxuICAgIHZhciBlbmQgPSAoKHZlcnRpY2VzLmxlbmd0aCAvIDMpfDApXG4gICAgdGlja09mZnNldFtpXSA9IHN0YXJ0XG4gICAgdGlja0NvdW50W2ldICA9IGVuZCAtIHN0YXJ0XG5cbiAgICAvL0dyaWQgbGluZXNcbiAgICB2YXIgc3RhcnQgPSAoKHZlcnRpY2VzLmxlbmd0aCAvIDMpfDApXG4gICAgZm9yKHZhciBrPTA7IGs8dGlja3NbaV0ubGVuZ3RoOyArK2spIHtcbiAgICAgIHZhciB4ID0gK3RpY2tzW2ldW2tdLnhcbiAgICAgIHZlcnRpY2VzLnB1c2goXG4gICAgICAgIHgsMCwxLCAgIHgsMSwxLCAgIHgsMCwtMSxcbiAgICAgICAgeCwwLC0xLCAgeCwxLDEsICAgeCwxLC0xKVxuICAgIH1cbiAgICB2YXIgZW5kID0gKCh2ZXJ0aWNlcy5sZW5ndGggLyAzKXwwKVxuICAgIGdyaWRPZmZzZXRbaV0gPSBzdGFydFxuICAgIGdyaWRDb3VudFtpXSAgPSBlbmQgLSBzdGFydFxuICB9XG5cbiAgLy9DcmVhdGUgY3ViZSBWQU9cbiAgdmFyIHZlcnRCdWYgPSBjcmVhdGVCdWZmZXIoZ2wsIG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMpKVxuICB2YXIgdmFvID0gY3JlYXRlVkFPKGdsLCBbXG4gICAgeyBcImJ1ZmZlclwiOiB2ZXJ0QnVmLFxuICAgICAgXCJ0eXBlXCI6IGdsLkZMT0FULFxuICAgICAgXCJzaXplXCI6IDMsXG4gICAgICBcInN0cmlkZVwiOiAwLFxuICAgICAgXCJvZmZzZXRcIjogMFxuICAgIH1cbiAgXSlcbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbClcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ubG9jYXRpb24gPSAwXG4gIHJldHVybiBuZXcgTGluZXMoZ2wsIHZlcnRCdWYsIHZhbywgc2hhZGVyLCB0aWNrQ291bnQsIHRpY2tPZmZzZXQsIGdyaWRDb3VudCwgZ3JpZE9mZnNldClcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZ2xzbGlmeSA9IHJlcXVpcmUoJ2dsc2xpZnknKVxudmFyIGNyZWF0ZVNoYWRlciA9IHJlcXVpcmUoJ2dsLXNoYWRlcicpXG5cbnZhciBsaW5lVmVydCA9IGdsc2xpZnkoJy4vbGluZVZlcnQuZ2xzbCcpXG52YXIgbGluZUZyYWcgPSBnbHNsaWZ5KCcuL2xpbmVGcmFnLmdsc2wnKVxuZXhwb3J0cy5saW5lID0gZnVuY3Rpb24oZ2wpIHtcbiAgcmV0dXJuIGNyZWF0ZVNoYWRlcihnbCwgbGluZVZlcnQsIGxpbmVGcmFnLCBudWxsLCBbXG4gICAge25hbWU6ICdwb3NpdGlvbicsIHR5cGU6ICd2ZWMzJ31cbiAgXSlcbn1cblxudmFyIHRleHRWZXJ0ID0gZ2xzbGlmeSgnLi90ZXh0VmVydC5nbHNsJylcbnZhciB0ZXh0RnJhZyA9IGdsc2xpZnkoJy4vdGV4dEZyYWcuZ2xzbCcpXG5leHBvcnRzLnRleHQgPSBmdW5jdGlvbihnbCkge1xuICByZXR1cm4gY3JlYXRlU2hhZGVyKGdsLCB0ZXh0VmVydCwgdGV4dEZyYWcsIG51bGwsIFtcbiAgICB7bmFtZTogJ3Bvc2l0aW9uJywgdHlwZTogJ3ZlYzMnfVxuICBdKVxufVxuXG52YXIgYmdWZXJ0ID0gZ2xzbGlmeSgnLi9iYWNrZ3JvdW5kVmVydC5nbHNsJylcbnZhciBiZ0ZyYWcgPSBnbHNsaWZ5KCcuL2JhY2tncm91bmRGcmFnLmdsc2wnKVxuZXhwb3J0cy5iZyA9IGZ1bmN0aW9uKGdsKSB7XG4gIHJldHVybiBjcmVhdGVTaGFkZXIoZ2wsIGJnVmVydCwgYmdGcmFnLCBudWxsLCBbXG4gICAge25hbWU6ICdwb3NpdGlvbicsIHR5cGU6ICd2ZWMzJ30sXG4gICAge25hbWU6ICdub3JtYWwnLCB0eXBlOiAndmVjMyd9XG4gIF0pXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVRleHRTcHJpdGVzXG5cbnZhciBjcmVhdGVCdWZmZXIgID0gcmVxdWlyZSgnZ2wtYnVmZmVyJylcbnZhciBjcmVhdGVWQU8gICAgID0gcmVxdWlyZSgnZ2wtdmFvJylcbnZhciB2ZWN0b3JpemVUZXh0ID0gcmVxdWlyZSgndmVjdG9yaXplLXRleHQnKVxudmFyIGNyZWF0ZVNoYWRlciAgPSByZXF1aXJlKCcuL3NoYWRlcnMnKS50ZXh0XG5cbnZhciBnbG9iYWxzID0gd2luZG93IHx8IHByb2Nlc3MuZ2xvYmFsIHx8IHt9XG52YXIgX19URVhUX0NBQ0hFICA9IGdsb2JhbHMuX19URVhUX0NBQ0hFIHx8IHt9XG5nbG9iYWxzLl9fVEVYVF9DQUNIRSA9IHt9XG5cbi8vVmVydGV4IGJ1ZmZlciBmb3JtYXQgZm9yIHRleHQgaXM6XG4vL1xuLy8vIFt4LHksel0gPSBTcGF0aWFsIGNvb3JkaW5hdGVcbi8vXG5cbnZhciBWRVJURVhfU0laRSA9IDNcblxuZnVuY3Rpb24gVGV4dFNwcml0ZXMoXG4gIGdsLFxuICBzaGFkZXIsXG4gIGJ1ZmZlcixcbiAgdmFvKSB7XG4gIHRoaXMuZ2wgICAgICAgICAgID0gZ2xcbiAgdGhpcy5zaGFkZXIgICAgICAgPSBzaGFkZXJcbiAgdGhpcy5idWZmZXIgICAgICAgPSBidWZmZXJcbiAgdGhpcy52YW8gICAgICAgICAgPSB2YW9cbiAgdGhpcy50aWNrT2Zmc2V0ICAgPVxuICB0aGlzLnRpY2tDb3VudCAgICA9XG4gIHRoaXMubGFiZWxPZmZzZXQgID1cbiAgdGhpcy5sYWJlbENvdW50ICAgPSBudWxsXG59XG5cbnZhciBwcm90byA9IFRleHRTcHJpdGVzLnByb3RvdHlwZVxuXG4vL0JpbmQgdGV4dHVyZXMgZm9yIHJlbmRlcmluZ1xudmFyIFNIQVBFID0gWzAsMF1cbnByb3RvLmJpbmQgPSBmdW5jdGlvbihtb2RlbCwgdmlldywgcHJvamVjdGlvbiwgcGl4ZWxTY2FsZSkge1xuICB0aGlzLnZhby5iaW5kKClcbiAgdGhpcy5zaGFkZXIuYmluZCgpXG4gIHZhciB1bmlmb3JtcyA9IHRoaXMuc2hhZGVyLnVuaWZvcm1zXG4gIHVuaWZvcm1zLm1vZGVsID0gbW9kZWxcbiAgdW5pZm9ybXMudmlldyA9IHZpZXdcbiAgdW5pZm9ybXMucHJvamVjdGlvbiA9IHByb2plY3Rpb25cbiAgdW5pZm9ybXMucGl4ZWxTY2FsZSA9IHBpeGVsU2NhbGVcbiAgU0hBUEVbMF0gPSB0aGlzLmdsLmRyYXdpbmdCdWZmZXJXaWR0aFxuICBTSEFQRVsxXSA9IHRoaXMuZ2wuZHJhd2luZ0J1ZmZlckhlaWdodFxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5yZXNvbHV0aW9uID0gU0hBUEVcbn1cblxucHJvdG8udW5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudmFvLnVuYmluZCgpXG59XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKGJvdW5kcywgbGFiZWxzLCBsYWJlbEZvbnQsIHRpY2tzLCB0aWNrRm9udCkge1xuICB2YXIgZGF0YSA9IFtdXG5cbiAgZnVuY3Rpb24gYWRkSXRlbSh0LCB0ZXh0LCBmb250LCBzaXplLCBsaW5lU3BhY2luZywgc3R5bGV0YWdzKSB7XG4gICAgdmFyIGZvbnRjYWNoZSA9IF9fVEVYVF9DQUNIRVtmb250XVxuICAgIGlmKCFmb250Y2FjaGUpIHtcbiAgICAgIGZvbnRjYWNoZSA9IF9fVEVYVF9DQUNIRVtmb250XSA9IHt9XG4gICAgfVxuICAgIHZhciBtZXNoID0gZm9udGNhY2hlW3RleHRdXG4gICAgaWYoIW1lc2gpIHtcbiAgICAgIG1lc2ggPSBmb250Y2FjaGVbdGV4dF0gPSB0cnlWZWN0b3JpemVUZXh0KHRleHQsIHtcbiAgICAgICAgdHJpYW5nbGVzOiB0cnVlLFxuICAgICAgICBmb250OiBmb250LFxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICB0ZXh0QmFzZWxpbmU6ICdtaWRkbGUnLFxuICAgICAgICBsaW5lU3BhY2luZzogbGluZVNwYWNpbmcsXG4gICAgICAgIHN0eWxldGFnczogc3R5bGV0YWdzXG4gICAgICB9KVxuICAgIH1cbiAgICB2YXIgc2NhbGUgPSAoc2l6ZSB8fCAxMikgLyAxMlxuICAgIHZhciBwb3NpdGlvbnMgPSBtZXNoLnBvc2l0aW9uc1xuICAgIHZhciBjZWxscyA9IG1lc2guY2VsbHNcbiAgICBmb3IodmFyIGk9MCwgbmM9Y2VsbHMubGVuZ3RoOyBpPG5jOyArK2kpIHtcbiAgICAgIHZhciBjID0gY2VsbHNbaV1cbiAgICAgIGZvcih2YXIgaj0yOyBqPj0wOyAtLWopIHtcbiAgICAgICAgdmFyIHAgPSBwb3NpdGlvbnNbY1tqXV1cbiAgICAgICAgZGF0YS5wdXNoKHNjYWxlKnBbMF0sIC1zY2FsZSpwWzFdLCB0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vR2VuZXJhdGUgc3ByaXRlcyBmb3IgYWxsIDMgYXhlcywgc3RvcmUgZGF0YSBpbiB0ZXh0dXJlIGF0bGFzZXNcbiAgdmFyIHRpY2tPZmZzZXQgID0gWzAsMCwwXVxuICB2YXIgdGlja0NvdW50ICAgPSBbMCwwLDBdXG4gIHZhciBsYWJlbE9mZnNldCA9IFswLDAsMF1cbiAgdmFyIGxhYmVsQ291bnQgID0gWzAsMCwwXVxuICB2YXIgbGluZVNwYWNpbmcgPSAxLjI1XG4gIHZhciBzdHlsZXRhZ3MgPSB7XG4gICAgYnJlYWtsaW5lczp0cnVlLFxuICAgIGJvbGRzOiB0cnVlLFxuICAgIGl0YWxpY3M6IHRydWUsXG4gICAgc3Vic2NyaXB0czp0cnVlLFxuICAgIHN1cGVyc2NyaXB0czp0cnVlXG4gIH1cbiAgZm9yKHZhciBkPTA7IGQ8MzsgKytkKSB7XG5cbiAgICAvL0dlbmVyYXRlIGxhYmVsXG4gICAgbGFiZWxPZmZzZXRbZF0gPSAoZGF0YS5sZW5ndGgvVkVSVEVYX1NJWkUpfDBcbiAgICBhZGRJdGVtKFxuICAgICAgMC41Kihib3VuZHNbMF1bZF0rYm91bmRzWzFdW2RdKSxcbiAgICAgIGxhYmVsc1tkXSxcbiAgICAgIGxhYmVsRm9udFtkXSxcbiAgICAgIDEyLCAvLyBsYWJlbEZvbnRTaXplXG4gICAgICBsaW5lU3BhY2luZyxcbiAgICAgIHN0eWxldGFnc1xuICAgIClcbiAgICBsYWJlbENvdW50W2RdID0gKChkYXRhLmxlbmd0aC9WRVJURVhfU0laRSl8MCkgLSBsYWJlbE9mZnNldFtkXVxuXG4gICAgLy9HZW5lcmF0ZSBzcHJpdGVzIGZvciB0aWNrIG1hcmtzXG4gICAgdGlja09mZnNldFtkXSA9IChkYXRhLmxlbmd0aC9WRVJURVhfU0laRSl8MFxuICAgIGZvcih2YXIgaT0wOyBpPHRpY2tzW2RdLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZighdGlja3NbZF1baV0udGV4dCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgYWRkSXRlbShcbiAgICAgICAgdGlja3NbZF1baV0ueCxcbiAgICAgICAgdGlja3NbZF1baV0udGV4dCxcbiAgICAgICAgdGlja3NbZF1baV0uZm9udCB8fCB0aWNrRm9udCxcbiAgICAgICAgdGlja3NbZF1baV0uZm9udFNpemUgfHwgMTIsXG4gICAgICAgIGxpbmVTcGFjaW5nLFxuICAgICAgICBzdHlsZXRhZ3NcbiAgICAgIClcbiAgICB9XG4gICAgdGlja0NvdW50W2RdID0gKChkYXRhLmxlbmd0aC9WRVJURVhfU0laRSl8MCkgLSB0aWNrT2Zmc2V0W2RdXG4gIH1cblxuICB0aGlzLmJ1ZmZlci51cGRhdGUoZGF0YSlcbiAgdGhpcy50aWNrT2Zmc2V0ID0gdGlja09mZnNldFxuICB0aGlzLnRpY2tDb3VudCA9IHRpY2tDb3VudFxuICB0aGlzLmxhYmVsT2Zmc2V0ID0gbGFiZWxPZmZzZXRcbiAgdGhpcy5sYWJlbENvdW50ID0gbGFiZWxDb3VudFxufVxuXG4vL0RyYXdzIHRoZSB0aWNrIG1hcmtzIGZvciBhbiBheGlzXG5wcm90by5kcmF3VGlja3MgPSBmdW5jdGlvbihkLCBzY2FsZSwgYW5nbGUsIG9mZnNldCwgY29sb3IsIGF4aXMsIGFsaWduRGlyLCBhbGlnbk9wdCkge1xuICBpZighdGhpcy50aWNrQ291bnRbZF0pIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLmF4aXMgPSBheGlzXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLmNvbG9yID0gY29sb3JcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMuYW5nbGUgPSBhbmdsZVxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5zY2FsZSA9IHNjYWxlXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLm9mZnNldCA9IG9mZnNldFxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5hbGlnbkRpciA9IGFsaWduRGlyXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLmFsaWduT3B0ID0gYWxpZ25PcHRcbiAgdGhpcy52YW8uZHJhdyh0aGlzLmdsLlRSSUFOR0xFUywgdGhpcy50aWNrQ291bnRbZF0sIHRoaXMudGlja09mZnNldFtkXSlcbn1cblxuLy9EcmF3cyB0aGUgdGV4dCBsYWJlbCBmb3IgYW4gYXhpc1xucHJvdG8uZHJhd0xhYmVsID0gZnVuY3Rpb24oZCwgc2NhbGUsIGFuZ2xlLCBvZmZzZXQsIGNvbG9yLCBheGlzLCBhbGlnbkRpciwgYWxpZ25PcHQpIHtcbiAgaWYoIXRoaXMubGFiZWxDb3VudFtkXSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMuYXhpcyA9IGF4aXNcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMuY29sb3IgPSBjb2xvclxuICB0aGlzLnNoYWRlci51bmlmb3Jtcy5hbmdsZSA9IGFuZ2xlXG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLnNjYWxlID0gc2NhbGVcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMub2Zmc2V0ID0gb2Zmc2V0XG4gIHRoaXMuc2hhZGVyLnVuaWZvcm1zLmFsaWduRGlyID0gYWxpZ25EaXJcbiAgdGhpcy5zaGFkZXIudW5pZm9ybXMuYWxpZ25PcHQgPSBhbGlnbk9wdFxuICB0aGlzLnZhby5kcmF3KHRoaXMuZ2wuVFJJQU5HTEVTLCB0aGlzLmxhYmVsQ291bnRbZF0sIHRoaXMubGFiZWxPZmZzZXRbZF0pXG59XG5cbi8vUmVsZWFzZXMgYWxsIHJlc291cmNlcyBhdHRhY2hlZCB0byB0aGlzIG9iamVjdFxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNoYWRlci5kaXNwb3NlKClcbiAgdGhpcy52YW8uZGlzcG9zZSgpXG4gIHRoaXMuYnVmZmVyLmRpc3Bvc2UoKVxufVxuXG5mdW5jdGlvbiB0cnlWZWN0b3JpemVUZXh0KHRleHQsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdmVjdG9yaXplVGV4dCh0ZXh0LCBvcHRpb25zKVxuICB9IGNhdGNoKGUpIHtcbiAgICBjb25zb2xlLndhcm4oJ2Vycm9yIHZlY3Rvcml6aW5nIHRleHQ6XCInICsgdGV4dCArICdcIiBlcnJvcjonLCBlKVxuICAgIHJldHVybiB7XG4gICAgICBjZWxsczogW10sXG4gICAgICBwb3NpdGlvbnM6IFtdXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRleHRTcHJpdGVzKFxuICAgIGdsLFxuICAgIGJvdW5kcyxcbiAgICBsYWJlbHMsXG4gICAgbGFiZWxGb250LFxuICAgIHRpY2tzLFxuICAgIHRpY2tGb250KSB7XG5cbiAgdmFyIGJ1ZmZlciA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIHZhbyA9IGNyZWF0ZVZBTyhnbCwgW1xuICAgIHsgXCJidWZmZXJcIjogYnVmZmVyLFxuICAgICAgXCJzaXplXCI6IDNcbiAgICB9XG4gIF0pXG5cbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbClcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ubG9jYXRpb24gPSAwXG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBUZXh0U3ByaXRlcyhcbiAgICBnbCxcbiAgICBzaGFkZXIsXG4gICAgYnVmZmVyLFxuICAgIHZhbylcblxuICByZXN1bHQudXBkYXRlKGJvdW5kcywgbGFiZWxzLCBsYWJlbEZvbnQsIHRpY2tzLCB0aWNrRm9udClcblxuICByZXR1cm4gcmVzdWx0XG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5jcmVhdGUgICA9IGRlZmF1bHRUaWNrc1xuZXhwb3J0cy5lcXVhbCAgICA9IHRpY2tzRXF1YWxcblxuZnVuY3Rpb24gcHJldHR5UHJpbnQoc3BhY2luZywgaSkge1xuICB2YXIgc3RlcFN0ciA9IHNwYWNpbmcgKyBcIlwiXG4gIHZhciB1ID0gc3RlcFN0ci5pbmRleE9mKFwiLlwiKVxuICB2YXIgc2lnRmlncyA9IDBcbiAgaWYodSA+PSAwKSB7XG4gICAgc2lnRmlncyA9IHN0ZXBTdHIubGVuZ3RoIC0gdSAtIDFcbiAgfVxuICB2YXIgc2hpZnQgPSBNYXRoLnBvdygxMCwgc2lnRmlncylcbiAgdmFyIHggPSBNYXRoLnJvdW5kKHNwYWNpbmcgKiBpICogc2hpZnQpXG4gIHZhciB4c3RyID0geCArIFwiXCJcbiAgaWYoeHN0ci5pbmRleE9mKFwiZVwiKSA+PSAwKSB7XG4gICAgcmV0dXJuIHhzdHJcbiAgfVxuICB2YXIgeGkgPSB4IC8gc2hpZnQsIHhmID0geCAlIHNoaWZ0XG4gIGlmKHggPCAwKSB7XG4gICAgeGkgPSAtTWF0aC5jZWlsKHhpKXwwXG4gICAgeGYgPSAoLXhmKXwwXG4gIH0gZWxzZSB7XG4gICAgeGkgPSBNYXRoLmZsb29yKHhpKXwwXG4gICAgeGYgPSB4ZnwwXG4gIH1cbiAgdmFyIHhpcyA9IFwiXCIgKyB4aSBcbiAgaWYoeCA8IDApIHtcbiAgICB4aXMgPSBcIi1cIiArIHhpc1xuICB9XG4gIGlmKHNpZ0ZpZ3MpIHtcbiAgICB2YXIgeHMgPSBcIlwiICsgeGZcbiAgICB3aGlsZSh4cy5sZW5ndGggPCBzaWdGaWdzKSB7XG4gICAgICB4cyA9IFwiMFwiICsgeHNcbiAgICB9XG4gICAgcmV0dXJuIHhpcyArIFwiLlwiICsgeHNcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geGlzXG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdFRpY2tzKGJvdW5kcywgdGlja1NwYWNpbmcpIHtcbiAgdmFyIGFycmF5ID0gW11cbiAgZm9yKHZhciBkPTA7IGQ8MzsgKytkKSB7XG4gICAgdmFyIHRpY2tzID0gW11cbiAgICB2YXIgbSA9IDAuNSooYm91bmRzWzBdW2RdK2JvdW5kc1sxXVtkXSlcbiAgICBmb3IodmFyIHQ9MDsgdCp0aWNrU3BhY2luZ1tkXTw9Ym91bmRzWzFdW2RdOyArK3QpIHtcbiAgICAgIHRpY2tzLnB1c2goe3g6IHQqdGlja1NwYWNpbmdbZF0sIHRleHQ6IHByZXR0eVByaW50KHRpY2tTcGFjaW5nW2RdLCB0KX0pXG4gICAgfVxuICAgIGZvcih2YXIgdD0tMTsgdCp0aWNrU3BhY2luZ1tkXT49Ym91bmRzWzBdW2RdOyAtLXQpIHtcbiAgICAgIHRpY2tzLnB1c2goe3g6IHQqdGlja1NwYWNpbmdbZF0sIHRleHQ6IHByZXR0eVByaW50KHRpY2tTcGFjaW5nW2RdLCB0KX0pXG4gICAgfVxuICAgIGFycmF5LnB1c2godGlja3MpXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG5cbmZ1bmN0aW9uIHRpY2tzRXF1YWwodGlja3NBLCB0aWNrc0IpIHtcbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgaWYodGlja3NBW2ldLmxlbmd0aCAhPT0gdGlja3NCW2ldLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGZvcih2YXIgaj0wOyBqPHRpY2tzQVtpXS5sZW5ndGg7ICsraikge1xuICAgICAgdmFyIGEgPSB0aWNrc0FbaV1bal1cbiAgICAgIHZhciBiID0gdGlja3NCW2ldW2pdXG4gICAgICBpZihcbiAgICAgICAgYS54ICE9PSBiLnggfHxcbiAgICAgICAgYS50ZXh0ICE9PSBiLnRleHQgfHxcbiAgICAgICAgYS5mb250ICE9PSBiLmZvbnQgfHxcbiAgICAgICAgYS5mb250Q29sb3IgIT09IGIuZm9udENvbG9yIHx8XG4gICAgICAgIGEuZm9udFNpemUgIT09IGIuZm9udFNpemUgfHxcbiAgICAgICAgYS5keCAhPT0gYi5keCB8fFxuICAgICAgICBhLmR5ICE9PSBiLmR5XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59IiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBheGVzUHJvcGVydGllc1xuXG52YXIgZ2V0UGxhbmVzICAgPSByZXF1aXJlKFwiZXh0cmFjdC1mcnVzdHVtLXBsYW5lc1wiKVxudmFyIHNwbGl0UG9seSAgID0gcmVxdWlyZShcInNwbGl0LXBvbHlnb25cIilcbnZhciBjdWJlUGFyYW1zICA9IHJlcXVpcmUoXCIuL2xpYi9jdWJlLmpzXCIpXG52YXIgbTRtdWwgICAgICAgPSByZXF1aXJlKFwiZ2wtbWF0NC9tdWx0aXBseVwiKVxudmFyIG00dHJhbnNwb3NlID0gcmVxdWlyZShcImdsLW1hdDQvdHJhbnNwb3NlXCIpXG52YXIgdjR0cmFuc2Zvcm1NYXQ0ID0gcmVxdWlyZShcImdsLXZlYzQvdHJhbnNmb3JtTWF0NFwiKVxuXG52YXIgaWRlbnRpdHkgICAgPSBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAxLCAwLCAwLCAwLFxuICAgIDAsIDEsIDAsIDAsXG4gICAgMCwgMCwgMSwgMCxcbiAgICAwLCAwLCAwLCAxXG4gIF0pXG5cbnZhciBtdnAgICAgICAgICA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpXG5cbmZ1bmN0aW9uIEF4ZXNSYW5nZTNEKGxvLCBoaSwgcGl4ZWxzUGVyRGF0YVVuaXQpIHtcbiAgdGhpcy5sbyA9IGxvXG4gIHRoaXMuaGkgPSBoaVxuICB0aGlzLnBpeGVsc1BlckRhdGFVbml0ID0gcGl4ZWxzUGVyRGF0YVVuaXRcbn1cblxudmFyIFNDUkFUQ0hfUCA9IFswLDAsMCwxXVxudmFyIFNDUkFUQ0hfUSA9IFswLDAsMCwxXVxuXG5mdW5jdGlvbiBncmFkaWVudChyZXN1bHQsIE0sIHYsIHdpZHRoLCBoZWlnaHQpIHtcbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgdmFyIHAgPSBTQ1JBVENIX1BcbiAgICB2YXIgcSA9IFNDUkFUQ0hfUVxuICAgIGZvcih2YXIgaj0wOyBqPDM7ICsraikge1xuICAgICAgcVtqXSA9IHBbal0gPSB2W2pdXG4gICAgfVxuICAgIHFbM10gPSBwWzNdID0gMVxuXG4gICAgcVtpXSArPSAxXG4gICAgdjR0cmFuc2Zvcm1NYXQ0KHEsIHEsIE0pXG4gICAgaWYocVszXSA8IDApIHtcbiAgICAgIHJlc3VsdFtpXSA9IEluZmluaXR5XG4gICAgfVxuXG4gICAgcFtpXSAtPSAxXG4gICAgdjR0cmFuc2Zvcm1NYXQ0KHAsIHAsIE0pXG4gICAgaWYocFszXSA8IDApIHtcbiAgICAgIHJlc3VsdFtpXSA9IEluZmluaXR5XG4gICAgfVxuXG4gICAgdmFyIGR4ID0gKHBbMF0vcFszXSAtIHFbMF0vcVszXSkgKiB3aWR0aFxuICAgIHZhciBkeSA9IChwWzFdL3BbM10gLSBxWzFdL3FbM10pICogaGVpZ2h0XG5cbiAgICByZXN1bHRbaV0gPSAwLjI1ICogTWF0aC5zcXJ0KGR4KmR4ICsgZHkqZHkpXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG52YXIgUkFOR0VTID0gW1xuICBuZXcgQXhlc1JhbmdlM0QoSW5maW5pdHksIC1JbmZpbml0eSwgSW5maW5pdHkpLFxuICBuZXcgQXhlc1JhbmdlM0QoSW5maW5pdHksIC1JbmZpbml0eSwgSW5maW5pdHkpLFxuICBuZXcgQXhlc1JhbmdlM0QoSW5maW5pdHksIC1JbmZpbml0eSwgSW5maW5pdHkpXG5dXG5cbnZhciBTQ1JBVENIX1ggPSBbMCwwLDBdXG5cbmZ1bmN0aW9uIGF4ZXNQcm9wZXJ0aWVzKGF4ZXMsIGNhbWVyYSwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKSB7XG4gIHZhciBtb2RlbCAgICAgICA9IGNhbWVyYS5tb2RlbCB8fCBpZGVudGl0eVxuICB2YXIgdmlldyAgICAgICAgPSBjYW1lcmEudmlldyB8fCBpZGVudGl0eVxuICB2YXIgcHJvamVjdGlvbiAgPSBjYW1lcmEucHJvamVjdGlvbiB8fCBpZGVudGl0eVxuICB2YXIgaXNPcnRobyAgICAgPSBjYW1lcmEuX29ydGhvIHx8IGZhbHNlXG4gIHZhciBib3VuZHMgICAgICA9IGF4ZXMuYm91bmRzXG4gIHZhciBwYXJhbXMgICAgICA9IHBhcmFtcyB8fCBjdWJlUGFyYW1zKG1vZGVsLCB2aWV3LCBwcm9qZWN0aW9uLCBib3VuZHMsIGlzT3J0aG8pXG4gIHZhciBheGlzICAgICAgICA9IHBhcmFtcy5heGlzXG5cbiAgbTRtdWwobXZwLCB2aWV3LCBtb2RlbClcbiAgbTRtdWwobXZwLCBwcm9qZWN0aW9uLCBtdnApXG5cbiAgLy9DYWxjdWxhdGUgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGZvciBlYWNoIGF4aXM6XG4gIC8vXG4gIC8vICogbG8gLSBzdGFydCBvZiB2aXNpYmxlIHJhbmdlIGZvciBlYWNoIGF4aXMgaW4gdGljayBjb29yZGluYXRlc1xuICAvLyAqIGhpIC0gZW5kIG9mIHZpc2libGUgcmFuZ2UgZm9yIGVhY2ggYXhpcyBpbiB0aWNrIGNvb3JkaW5hdGVzXG4gIC8vICogdGlja3NQZXJQaXhlbCAtIHBpeGVsIGRlbnNpdHkgb2YgdGljayBtYXJrcyBmb3IgdGhlIGF4aXNcbiAgLy9cbiAgdmFyIHJhbmdlcyA9IFJBTkdFU1xuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICByYW5nZXNbaV0ubG8gPSBJbmZpbml0eVxuICAgIHJhbmdlc1tpXS5oaSA9IC1JbmZpbml0eVxuICAgIHJhbmdlc1tpXS5waXhlbHNQZXJEYXRhVW5pdCA9IEluZmluaXR5XG4gIH1cblxuICAvL0NvbXB1dGUgZnJ1c3R1bSBwbGFuZXMsIGludGVyc2VjdCB3aXRoIGJveFxuICB2YXIgZnJ1c3R1bSA9IGdldFBsYW5lcyhtNHRyYW5zcG9zZShtdnAsIG12cCkpXG4gIG00dHJhbnNwb3NlKG12cCwgbXZwKVxuXG4gIC8vTG9vcCBvdmVyIHZlcnRpY2VzIG9mIHZpZXdhYmxlIGJveFxuICBmb3IodmFyIGQ9MDsgZDwzOyArK2QpIHtcbiAgICB2YXIgdSA9IChkKzEpJTNcbiAgICB2YXIgdiA9IChkKzIpJTNcbiAgICB2YXIgeCA9IFNDUkFUQ0hfWFxuaV9sb29wOlxuICAgIGZvcih2YXIgaT0wOyBpPDI7ICsraSkge1xuICAgICAgdmFyIHBvbHkgPSBbXVxuXG4gICAgICBpZigoYXhpc1tkXSA8IDApID09PSAhIWkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgeFtkXSA9IGJvdW5kc1tpXVtkXVxuICAgICAgZm9yKHZhciBqPTA7IGo8MjsgKytqKSB7XG4gICAgICAgIHhbdV0gPSBib3VuZHNbal5pXVt1XVxuICAgICAgICBmb3IodmFyIGs9MDsgazwyOyArK2spIHtcbiAgICAgICAgICB4W3ZdID0gYm91bmRzW2teal5pXVt2XVxuICAgICAgICAgIHBvbHkucHVzaCh4LnNsaWNlKCkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIFEgPSAoaXNPcnRobykgPyA1IDogNFxuICAgICAgZm9yKHZhciBqPVE7IGo9PT1ROyArK2opIHsgLy8gTm90ZTogdXNpbmcgb25seSBuZWFyIHBsYW5lIGhlcmUgKCYgZm9yIG9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uIHdlIHVzZSB0aGUgZmFyKS5cbiAgICAgICAgaWYocG9seS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBjb250aW51ZSBpX2xvb3BcbiAgICAgICAgfVxuICAgICAgICBwb2x5ID0gc3BsaXRQb2x5LnBvc2l0aXZlKHBvbHksIGZydXN0dW1bal0pXG4gICAgICB9XG5cbiAgICAgIC8vTG9vcCBvdmVyIHZlcnRpY2VzIG9mIHBvbHlnb24gdG8gZmluZCBleHRyZW1hbCBwb2ludHNcbiAgICAgIGZvcih2YXIgaj0wOyBqPHBvbHkubGVuZ3RoOyArK2opIHtcbiAgICAgICAgdmFyIHYgPSBwb2x5W2pdXG4gICAgICAgIHZhciBncmFkID0gZ3JhZGllbnQoU0NSQVRDSF9YLCBtdnAsIHYsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIGZvcih2YXIgaz0wOyBrPDM7ICsraykge1xuICAgICAgICAgIHJhbmdlc1trXS5sbyA9IE1hdGgubWluKHJhbmdlc1trXS5sbywgdltrXSlcbiAgICAgICAgICByYW5nZXNba10uaGkgPSBNYXRoLm1heChyYW5nZXNba10uaGksIHZba10pXG4gICAgICAgICAgaWYoayAhPT0gZCkge1xuICAgICAgICAgICAgcmFuZ2VzW2tdLnBpeGVsc1BlckRhdGFVbml0ID0gTWF0aC5taW4ocmFuZ2VzW2tdLnBpeGVsc1BlckRhdGFVbml0LCBNYXRoLmFicyhncmFkW2tdKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmFuZ2VzXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNsb25lO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbWF0NCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cbmZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBkZXRlcm1pbmFudDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xuZnVuY3Rpb24gZGV0ZXJtaW5hbnQoYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgcmV0dXJuIGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmcm9tUm90YXRpb25UcmFuc2xhdGlvbjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uIGFuZCB2ZWN0b3IgdHJhbnNsYXRpb25cbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICpcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gKiAgICAgdmFyIHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHBhcmFtIHt2ZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBmcm9tUm90YXRpb25UcmFuc2xhdGlvbihvdXQsIHEsIHYpIHtcbiAgICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHh5ID0geCAqIHkyLFxuICAgICAgICB4eiA9IHggKiB6MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHl6ID0geSAqIHoyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSAoeXkgKyB6eik7XG4gICAgb3V0WzFdID0geHkgKyB3ejtcbiAgICBvdXRbMl0gPSB4eiAtIHd5O1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0geHkgLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0gKHh4ICsgenopO1xuICAgIG91dFs2XSA9IHl6ICsgd3g7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSB4eiArIHd5O1xuICAgIG91dFs5XSA9IHl6IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSAoeHggKyB5eSk7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IHZbMF07XG4gICAgb3V0WzEzXSA9IHZbMV07XG4gICAgb3V0WzE0XSA9IHZbMl07XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuLyoqXG4gKiBTZXQgYSBtYXQ0IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBpZGVudGl0eShvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gaW52ZXJ0O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBpbnZlcnQob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgICAgICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCxcbiAgICAgICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsXG4gICAgICAgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgICAgICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCxcbiAgICAgICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsXG4gICAgICAgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMixcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgIG91dFsxXSA9IChhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDkpICogZGV0O1xuICAgIG91dFsyXSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgIG91dFszXSA9IChhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDMpICogZGV0O1xuICAgIG91dFs0XSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgIG91dFs1XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICAgIG91dFs2XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgIG91dFs3XSA9IChhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEpICogZGV0O1xuICAgIG91dFs4XSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICAgIG91dFs5XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuICAgIG91dFsxMF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTFdID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzEyXSA9IChhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDYpICogZGV0O1xuICAgIG91dFsxM10gPSAoYTAwICogYjA5IC0gYTAxICogYjA3ICsgYTAyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTRdID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzE1XSA9IChhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDApICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn07IiwidmFyIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvb2tBdDtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBsb29rLWF0IG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBleWUgcG9zaXRpb24sIGZvY2FsIHBvaW50LCBhbmQgdXAgYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7dmVjM30gZXllIFBvc2l0aW9uIG9mIHRoZSB2aWV3ZXJcbiAqIEBwYXJhbSB7dmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICogQHBhcmFtIHt2ZWMzfSB1cCB2ZWMzIHBvaW50aW5nIHVwXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGxvb2tBdChvdXQsIGV5ZSwgY2VudGVyLCB1cCkge1xuICAgIHZhciB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsZW4sXG4gICAgICAgIGV5ZXggPSBleWVbMF0sXG4gICAgICAgIGV5ZXkgPSBleWVbMV0sXG4gICAgICAgIGV5ZXogPSBleWVbMl0sXG4gICAgICAgIHVweCA9IHVwWzBdLFxuICAgICAgICB1cHkgPSB1cFsxXSxcbiAgICAgICAgdXB6ID0gdXBbMl0sXG4gICAgICAgIGNlbnRlcnggPSBjZW50ZXJbMF0sXG4gICAgICAgIGNlbnRlcnkgPSBjZW50ZXJbMV0sXG4gICAgICAgIGNlbnRlcnogPSBjZW50ZXJbMl07XG5cbiAgICBpZiAoTWF0aC5hYnMoZXlleCAtIGNlbnRlcngpIDwgMC4wMDAwMDEgJiZcbiAgICAgICAgTWF0aC5hYnMoZXlleSAtIGNlbnRlcnkpIDwgMC4wMDAwMDEgJiZcbiAgICAgICAgTWF0aC5hYnMoZXlleiAtIGNlbnRlcnopIDwgMC4wMDAwMDEpIHtcbiAgICAgICAgcmV0dXJuIGlkZW50aXR5KG91dCk7XG4gICAgfVxuXG4gICAgejAgPSBleWV4IC0gY2VudGVyeDtcbiAgICB6MSA9IGV5ZXkgLSBjZW50ZXJ5O1xuICAgIHoyID0gZXlleiAtIGNlbnRlcno7XG5cbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KHowICogejAgKyB6MSAqIHoxICsgejIgKiB6Mik7XG4gICAgejAgKj0gbGVuO1xuICAgIHoxICo9IGxlbjtcbiAgICB6MiAqPSBsZW47XG5cbiAgICB4MCA9IHVweSAqIHoyIC0gdXB6ICogejE7XG4gICAgeDEgPSB1cHogKiB6MCAtIHVweCAqIHoyO1xuICAgIHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcbiAgICBsZW4gPSBNYXRoLnNxcnQoeDAgKiB4MCArIHgxICogeDEgKyB4MiAqIHgyKTtcbiAgICBpZiAoIWxlbikge1xuICAgICAgICB4MCA9IDA7XG4gICAgICAgIHgxID0gMDtcbiAgICAgICAgeDIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbiA9IDEgLyBsZW47XG4gICAgICAgIHgwICo9IGxlbjtcbiAgICAgICAgeDEgKj0gbGVuO1xuICAgICAgICB4MiAqPSBsZW47XG4gICAgfVxuXG4gICAgeTAgPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgICB5MSA9IHoyICogeDAgLSB6MCAqIHgyO1xuICAgIHkyID0gejAgKiB4MSAtIHoxICogeDA7XG5cbiAgICBsZW4gPSBNYXRoLnNxcnQoeTAgKiB5MCArIHkxICogeTEgKyB5MiAqIHkyKTtcbiAgICBpZiAoIWxlbikge1xuICAgICAgICB5MCA9IDA7XG4gICAgICAgIHkxID0gMDtcbiAgICAgICAgeTIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbiA9IDEgLyBsZW47XG4gICAgICAgIHkwICo9IGxlbjtcbiAgICAgICAgeTEgKj0gbGVuO1xuICAgICAgICB5MiAqPSBsZW47XG4gICAgfVxuXG4gICAgb3V0WzBdID0geDA7XG4gICAgb3V0WzFdID0geTA7XG4gICAgb3V0WzJdID0gejA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4MTtcbiAgICBvdXRbNV0gPSB5MTtcbiAgICBvdXRbNl0gPSB6MTtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHgyO1xuICAgIG91dFs5XSA9IHkyO1xuICAgIG91dFsxMF0gPSB6MjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gLSh4MCAqIGV5ZXggKyB4MSAqIGV5ZXkgKyB4MiAqIGV5ZXopO1xuICAgIG91dFsxM10gPSAtKHkwICogZXlleCArIHkxICogZXlleSArIHkyICogZXlleik7XG4gICAgb3V0WzE0XSA9IC0oejAgKiBleWV4ICsgejEgKiBleWV5ICsgejIgKiBleWV6KTtcbiAgICBvdXRbMTVdID0gMTtcblxuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gbXVsdGlwbHk7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0NCdzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxuICAgIHZhciBiMCAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdOyAgXG4gICAgb3V0WzBdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFsxXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzNdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzRdOyBiMSA9IGJbNV07IGIyID0gYls2XTsgYjMgPSBiWzddO1xuICAgIG91dFs0XSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbNV0gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzZdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFs3XSA9IGIwKmEwMyArIGIxKmExMyArIGIyKmEyMyArIGIzKmEzMztcblxuICAgIGIwID0gYls4XTsgYjEgPSBiWzldOyBiMiA9IGJbMTBdOyBiMyA9IGJbMTFdO1xuICAgIG91dFs4XSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbOV0gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzEwXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbMTFdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzEyXTsgYjEgPSBiWzEzXTsgYjIgPSBiWzE0XTsgYjMgPSBiWzE1XTtcbiAgICBvdXRbMTJdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFsxM10gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzE0XSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbMTVdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gb3J0aG87XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gb3J0aG8ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KSxcbiAgICAgICAgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAtMiAqIGxyO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gLTIgKiBidDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAyICogbmY7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XG4gICAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gICAgb3V0WzE0XSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcGVyc3BlY3RpdmU7XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IGZvdnkgVmVydGljYWwgZmllbGQgb2YgdmlldyBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0IEFzcGVjdCByYXRpby4gdHlwaWNhbGx5IHZpZXdwb3J0IHdpZHRoL2hlaWdodFxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gcGVyc3BlY3RpdmUob3V0LCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICAgIHZhciBmID0gMS4wIC8gTWF0aC50YW4oZm92eSAvIDIpLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IGY7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoMiAqIGZhciAqIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGU7XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIHJhZCwgYXhpcykge1xuICAgIHZhciB4ID0gYXhpc1swXSwgeSA9IGF4aXNbMV0sIHogPSBheGlzWzJdLFxuICAgICAgICBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KSxcbiAgICAgICAgcywgYywgdCxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMyxcbiAgICAgICAgYjAwLCBiMDEsIGIwMixcbiAgICAgICAgYjEwLCBiMTEsIGIxMixcbiAgICAgICAgYjIwLCBiMjEsIGIyMjtcblxuICAgIGlmIChNYXRoLmFicyhsZW4pIDwgMC4wMDAwMDEpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBcbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHggKj0gbGVuO1xuICAgIHkgKj0gbGVuO1xuICAgIHogKj0gbGVuO1xuXG4gICAgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdCA9IDEgLSBjO1xuXG4gICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICBhMTAgPSBhWzRdOyBhMTEgPSBhWzVdOyBhMTIgPSBhWzZdOyBhMTMgPSBhWzddO1xuICAgIGEyMCA9IGFbOF07IGEyMSA9IGFbOV07IGEyMiA9IGFbMTBdOyBhMjMgPSBhWzExXTtcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuICAgIGIwMCA9IHggKiB4ICogdCArIGM7IGIwMSA9IHkgKiB4ICogdCArIHogKiBzOyBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICBiMTAgPSB4ICogeSAqIHQgLSB6ICogczsgYjExID0geSAqIHkgKiB0ICsgYzsgYjEyID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gICAgYjIwID0geCAqIHogKiB0ICsgeSAqIHM7IGIyMSA9IHkgKiB6ICogdCAtIHggKiBzOyBiMjIgPSB6ICogeiAqIHQgKyBjO1xuXG4gICAgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gICAgb3V0WzFdID0gYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyO1xuICAgIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgICBvdXRbM10gPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gICAgb3V0WzRdID0gYTAwICogYjEwICsgYTEwICogYjExICsgYTIwICogYjEyO1xuICAgIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgICBvdXRbNl0gPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gICAgb3V0WzddID0gYTAzICogYjEwICsgYTEzICogYjExICsgYTIzICogYjEyO1xuICAgIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgICBvdXRbOV0gPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gICAgb3V0WzEwXSA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcbiAgICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWDtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzBdICA9IGFbMF07XG4gICAgICAgIG91dFsxXSAgPSBhWzFdO1xuICAgICAgICBvdXRbMl0gID0gYVsyXTtcbiAgICAgICAgb3V0WzNdICA9IGFbM107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzRdID0gYTEwICogYyArIGEyMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyArIGEyMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyArIGEyMyAqIHM7XG4gICAgb3V0WzhdID0gYTIwICogYyAtIGExMCAqIHM7XG4gICAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gICAgb3V0WzEwXSA9IGEyMiAqIGMgLSBhMTIgKiBzO1xuICAgIG91dFsxMV0gPSBhMjMgKiBjIC0gYTEzICogcztcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJvdGF0ZVk7XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFs0XSAgPSBhWzRdO1xuICAgICAgICBvdXRbNV0gID0gYVs1XTtcbiAgICAgICAgb3V0WzZdICA9IGFbNl07XG4gICAgICAgIG91dFs3XSAgPSBhWzddO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgLSBhMjEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEwMCAqIHMgKyBhMjAgKiBjO1xuICAgIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgICBvdXRbMTFdID0gYTAzICogcyArIGEyMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGVaO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFs4XSAgPSBhWzhdO1xuICAgICAgICBvdXRbOV0gID0gYVs5XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gICAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7dmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKiovXG5mdW5jdGlvbiBzY2FsZShvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXTtcblxuICAgIG91dFswXSA9IGFbMF0gKiB4O1xuICAgIG91dFsxXSA9IGFbMV0gKiB4O1xuICAgIG91dFsyXSA9IGFbMl0gKiB4O1xuICAgIG91dFszXSA9IGFbM10gKiB4O1xuICAgIG91dFs0XSA9IGFbNF0gKiB5O1xuICAgIG91dFs1XSA9IGFbNV0gKiB5O1xuICAgIG91dFs2XSA9IGFbNl0gKiB5O1xuICAgIG91dFs3XSA9IGFbN10gKiB5O1xuICAgIG91dFs4XSA9IGFbOF0gKiB6O1xuICAgIG91dFs5XSA9IGFbOV0gKiB6O1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gICAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2xhdGU7XG5cbi8qKlxuICogVHJhbnNsYXRlIGEgbWF0NCBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gdHJhbnNsYXRlKG91dCwgYSwgdikge1xuICAgIHZhciB4ID0gdlswXSwgeSA9IHZbMV0sIHogPSB2WzJdLFxuICAgICAgICBhMDAsIGEwMSwgYTAyLCBhMDMsXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzO1xuXG4gICAgaWYgKGEgPT09IG91dCkge1xuICAgICAgICBvdXRbMTJdID0gYVswXSAqIHggKyBhWzRdICogeSArIGFbOF0gKiB6ICsgYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzFdICogeCArIGFbNV0gKiB5ICsgYVs5XSAqIHogKyBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMl0gKiB4ICsgYVs2XSAqIHkgKyBhWzEwXSAqIHogKyBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbM10gKiB4ICsgYVs3XSAqIHkgKyBhWzExXSAqIHogKyBhWzE1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhMDAgPSBhWzBdOyBhMDEgPSBhWzFdOyBhMDIgPSBhWzJdOyBhMDMgPSBhWzNdO1xuICAgICAgICBhMTAgPSBhWzRdOyBhMTEgPSBhWzVdOyBhMTIgPSBhWzZdOyBhMTMgPSBhWzddO1xuICAgICAgICBhMjAgPSBhWzhdOyBhMjEgPSBhWzldOyBhMjIgPSBhWzEwXTsgYTIzID0gYVsxMV07XG5cbiAgICAgICAgb3V0WzBdID0gYTAwOyBvdXRbMV0gPSBhMDE7IG91dFsyXSA9IGEwMjsgb3V0WzNdID0gYTAzO1xuICAgICAgICBvdXRbNF0gPSBhMTA7IG91dFs1XSA9IGExMTsgb3V0WzZdID0gYTEyOyBvdXRbN10gPSBhMTM7XG4gICAgICAgIG91dFs4XSA9IGEyMDsgb3V0WzldID0gYTIxOyBvdXRbMTBdID0gYTIyOyBvdXRbMTFdID0gYTIzO1xuXG4gICAgICAgIG91dFsxMl0gPSBhMDAgKiB4ICsgYTEwICogeSArIGEyMCAqIHogKyBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGEwMSAqIHggKyBhMTEgKiB5ICsgYTIxICogeiArIGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYTAyICogeCArIGExMiAqIHkgKyBhMjIgKiB6ICsgYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhMDMgKiB4ICsgYTEzICogeSArIGEyMyAqIHogKyBhWzE1XTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHRyYW5zcG9zZTtcblxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHRyYW5zcG9zZShvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICB2YXIgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgICAgIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgICAgICBhMjMgPSBhWzExXTtcblxuICAgICAgICBvdXRbMV0gPSBhWzRdO1xuICAgICAgICBvdXRbMl0gPSBhWzhdO1xuICAgICAgICBvdXRbM10gPSBhWzEyXTtcbiAgICAgICAgb3V0WzRdID0gYTAxO1xuICAgICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgICBvdXRbN10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzhdID0gYTAyO1xuICAgICAgICBvdXRbOV0gPSBhMTI7XG4gICAgICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzEyXSA9IGEwMztcbiAgICAgICAgb3V0WzEzXSA9IGExMztcbiAgICAgICAgb3V0WzE0XSA9IGEyMztcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzRdO1xuICAgICAgICBvdXRbMl0gPSBhWzhdO1xuICAgICAgICBvdXRbM10gPSBhWzEyXTtcbiAgICAgICAgb3V0WzRdID0gYVsxXTtcbiAgICAgICAgb3V0WzVdID0gYVs1XTtcbiAgICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgICAgb3V0WzddID0gYVsxM107XG4gICAgICAgIG91dFs4XSA9IGFbMl07XG4gICAgICAgIG91dFs5XSA9IGFbNl07XG4gICAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTJdID0gYVszXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbN107XG4gICAgICAgIG91dFsxNF0gPSBhWzExXTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTsiLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDYW1lcmFcblxudmFyIG5vdyAgICAgICAgID0gcmVxdWlyZSgncmlnaHQtbm93JylcbnZhciBjcmVhdGVWaWV3ICA9IHJlcXVpcmUoJzNkLXZpZXcnKVxudmFyIG1vdXNlQ2hhbmdlID0gcmVxdWlyZSgnbW91c2UtY2hhbmdlJylcbnZhciBtb3VzZVdoZWVsICA9IHJlcXVpcmUoJ21vdXNlLXdoZWVsJylcbnZhciBtb3VzZU9mZnNldCA9IHJlcXVpcmUoJ21vdXNlLWV2ZW50LW9mZnNldCcpXG52YXIgaGFzUGFzc2l2ZSAgPSByZXF1aXJlKCdoYXMtcGFzc2l2ZS1ldmVudHMnKVxuXG5mdW5jdGlvbiBjcmVhdGVDYW1lcmEoZWxlbWVudCwgb3B0aW9ucykge1xuICBlbGVtZW50ID0gZWxlbWVudCB8fCBkb2N1bWVudC5ib2R5XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgdmFyIGxpbWl0cyAgPSBbIDAuMDEsIEluZmluaXR5IF1cbiAgaWYoJ2Rpc3RhbmNlTGltaXRzJyBpbiBvcHRpb25zKSB7XG4gICAgbGltaXRzWzBdID0gb3B0aW9ucy5kaXN0YW5jZUxpbWl0c1swXVxuICAgIGxpbWl0c1sxXSA9IG9wdGlvbnMuZGlzdGFuY2VMaW1pdHNbMV1cbiAgfVxuICBpZignem9vbU1pbicgaW4gb3B0aW9ucykge1xuICAgIGxpbWl0c1swXSA9IG9wdGlvbnMuem9vbU1pblxuICB9XG4gIGlmKCd6b29tTWF4JyBpbiBvcHRpb25zKSB7XG4gICAgbGltaXRzWzFdID0gb3B0aW9ucy56b29tTWF4XG4gIH1cblxuICB2YXIgdmlldyA9IGNyZWF0ZVZpZXcoe1xuICAgIGNlbnRlcjogb3B0aW9ucy5jZW50ZXIgfHwgWzAsMCwwXSxcbiAgICB1cDogICAgIG9wdGlvbnMudXAgICAgIHx8IFswLDEsMF0sXG4gICAgZXllOiAgICBvcHRpb25zLmV5ZSAgICB8fCBbMCwwLDEwXSxcbiAgICBtb2RlOiAgIG9wdGlvbnMubW9kZSAgIHx8ICdvcmJpdCcsXG4gICAgZGlzdGFuY2VMaW1pdHM6IGxpbWl0c1xuICB9KVxuXG4gIHZhciBwbWF0cml4ID0gWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdXG4gIHZhciBkaXN0YW5jZSA9IDAuMFxuICB2YXIgd2lkdGggICA9IGVsZW1lbnQuY2xpZW50V2lkdGhcbiAgdmFyIGhlaWdodCAgPSBlbGVtZW50LmNsaWVudEhlaWdodFxuXG4gIHZhciBjYW1lcmEgPSB7XG4gICAga2V5QmluZGluZ01vZGU6ICdyb3RhdGUnLFxuICAgIGVuYWJsZVdoZWVsOiB0cnVlLFxuICAgIHZpZXc6ICAgICAgICAgICAgICAgdmlldyxcbiAgICBlbGVtZW50OiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgZGVsYXk6ICAgICAgICAgICAgICBvcHRpb25zLmRlbGF5ICAgICAgICAgIHx8IDE2LFxuICAgIHJvdGF0ZVNwZWVkOiAgICAgICAgb3B0aW9ucy5yb3RhdGVTcGVlZCAgICB8fCAxLFxuICAgIHpvb21TcGVlZDogICAgICAgICAgb3B0aW9ucy56b29tU3BlZWQgICAgICB8fCAxLFxuICAgIHRyYW5zbGF0ZVNwZWVkOiAgICAgb3B0aW9ucy50cmFuc2xhdGVTcGVlZCB8fCAxLFxuICAgIGZsaXBYOiAgICAgICAgICAgICAgISFvcHRpb25zLmZsaXBYLFxuICAgIGZsaXBZOiAgICAgICAgICAgICAgISFvcHRpb25zLmZsaXBZLFxuICAgIG1vZGVzOiAgICAgICAgICAgICAgdmlldy5tb2RlcyxcbiAgICBfb3J0aG86IG9wdGlvbnMuX29ydGhvIHx8IChvcHRpb25zLnByb2plY3Rpb24gJiYgb3B0aW9ucy5wcm9qZWN0aW9uLnR5cGUgPT09ICdvcnRob2dyYXBoaWMnKSB8fCBmYWxzZSxcbiAgICB0aWNrOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0ID0gbm93KClcbiAgICAgIHZhciBkZWxheSA9IHRoaXMuZGVsYXlcbiAgICAgIHZhciBjdGltZSA9IHQgLSAyICogZGVsYXlcbiAgICAgIHZpZXcuaWRsZSh0LWRlbGF5KVxuICAgICAgdmlldy5yZWNhbGNNYXRyaXgoY3RpbWUpXG4gICAgICB2aWV3LmZsdXNoKHQtKDEwMCtkZWxheSoyKSlcbiAgICAgIHZhciBhbGxFcXVhbCA9IHRydWVcbiAgICAgIHZhciBtYXRyaXggPSB2aWV3LmNvbXB1dGVkTWF0cml4XG4gICAgICBmb3IodmFyIGk9MDsgaTwxNjsgKytpKSB7XG4gICAgICAgIGFsbEVxdWFsID0gYWxsRXF1YWwgJiYgKHBtYXRyaXhbaV0gPT09IG1hdHJpeFtpXSlcbiAgICAgICAgcG1hdHJpeFtpXSA9IG1hdHJpeFtpXVxuICAgICAgfVxuICAgICAgdmFyIHNpemVDaGFuZ2VkID1cbiAgICAgICAgICBlbGVtZW50LmNsaWVudFdpZHRoID09PSB3aWR0aCAmJlxuICAgICAgICAgIGVsZW1lbnQuY2xpZW50SGVpZ2h0ID09PSBoZWlnaHRcbiAgICAgIHdpZHRoICA9IGVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICAgIGhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICBpZihhbGxFcXVhbCkge1xuICAgICAgICByZXR1cm4gIXNpemVDaGFuZ2VkXG4gICAgICB9XG4gICAgICBkaXN0YW5jZSA9IE1hdGguZXhwKHZpZXcuY29tcHV0ZWRSYWRpdXNbMF0pXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG4gICAgbG9va0F0OiBmdW5jdGlvbihleWUsIGNlbnRlciwgdXApIHtcbiAgICAgIHZpZXcubG9va0F0KHZpZXcubGFzdFQoKSwgZXllLCBjZW50ZXIsIHVwKVxuICAgIH0sXG4gICAgcm90YXRlOiBmdW5jdGlvbihwaXRjaCwgeWF3LCByb2xsKSB7XG4gICAgICB2aWV3LnJvdGF0ZSh2aWV3Lmxhc3RUKCksIHBpdGNoLCB5YXcsIHJvbGwpXG4gICAgfSxcbiAgICBwYW46IGZ1bmN0aW9uKGR4LCBkeSwgZHopIHtcbiAgICAgIHZpZXcucGFuKHZpZXcubGFzdFQoKSwgZHgsIGR5LCBkeilcbiAgICB9LFxuICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24oZHgsIGR5LCBkeikge1xuICAgICAgdmlldy50cmFuc2xhdGUodmlldy5sYXN0VCgpLCBkeCwgZHksIGR6KVxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNhbWVyYSwge1xuICAgIG1hdHJpeDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZpZXcuY29tcHV0ZWRNYXRyaXhcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKG1hdCkge1xuICAgICAgICB2aWV3LnNldE1hdHJpeCh2aWV3Lmxhc3RUKCksIG1hdClcbiAgICAgICAgcmV0dXJuIHZpZXcuY29tcHV0ZWRNYXRyaXhcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBtb2RlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmlldy5nZXRNb2RlKClcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKG1vZGUpIHtcbiAgICAgICAgdmFyIGN1clVwID0gdmlldy5jb21wdXRlZFVwLnNsaWNlKClcbiAgICAgICAgdmFyIGN1ckV5ZSA9IHZpZXcuY29tcHV0ZWRFeWUuc2xpY2UoKVxuICAgICAgICB2YXIgY3VyQ2VudGVyID0gdmlldy5jb21wdXRlZENlbnRlci5zbGljZSgpXG4gICAgICAgIHZpZXcuc2V0TW9kZShtb2RlKVxuICAgICAgICBpZihtb2RlID09PSAndHVybnRhYmxlJykge1xuICAgICAgICAgIC8vIEhhY2t5IHRpbWUgd2FycGluZyBzdHVmZiB0byBnZW5lcmF0ZSBzbW9vdGggYW5pbWF0aW9uXG4gICAgICAgICAgdmFyIHQwID0gbm93KClcbiAgICAgICAgICB2aWV3Ll9hY3RpdmUubG9va0F0KHQwLCBjdXJFeWUsIGN1ckNlbnRlciwgY3VyVXApXG4gICAgICAgICAgdmlldy5fYWN0aXZlLmxvb2tBdCh0MCArIDUwMCwgY3VyRXllLCBjdXJDZW50ZXIsIFswLCAwLCAxXSlcbiAgICAgICAgICB2aWV3Ll9hY3RpdmUuZmx1c2godDApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZpZXcuZ2V0TW9kZSgpXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgY2VudGVyOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmlldy5jb21wdXRlZENlbnRlclxuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24obmNlbnRlcikge1xuICAgICAgICB2aWV3Lmxvb2tBdCh2aWV3Lmxhc3RUKCksIG51bGwsIG5jZW50ZXIpXG4gICAgICAgIHJldHVybiB2aWV3LmNvbXB1dGVkQ2VudGVyXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgZXllOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmlldy5jb21wdXRlZEV5ZVxuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24obmV5ZSkge1xuICAgICAgICB2aWV3Lmxvb2tBdCh2aWV3Lmxhc3RUKCksIG5leWUpXG4gICAgICAgIHJldHVybiB2aWV3LmNvbXB1dGVkRXllXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgdXA6IHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2aWV3LmNvbXB1dGVkVXBcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKG51cCkge1xuICAgICAgICB2aWV3Lmxvb2tBdCh2aWV3Lmxhc3RUKCksIG51bGwsIG51bGwsIG51cClcbiAgICAgICAgcmV0dXJuIHZpZXcuY29tcHV0ZWRVcFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGRpc3RhbmNlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZGlzdGFuY2VcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmlldy5zZXREaXN0YW5jZSh2aWV3Lmxhc3RUKCksIGQpXG4gICAgICAgIHJldHVybiBkXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgZGlzdGFuY2VMaW1pdHM6IHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2aWV3LmdldERpc3RhbmNlTGltaXRzKGxpbWl0cylcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgdmlldy5zZXREaXN0YW5jZUxpbWl0cyh2KVxuICAgICAgICByZXR1cm4gdlxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9XG4gIH0pXG5cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uKGV2KSB7XG4gICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIGNhbWVyYS5fbGFzdFggPSAtMVxuICBjYW1lcmEuX2xhc3RZID0gLTFcbiAgY2FtZXJhLl9sYXN0TW9kcyA9IHtzaGlmdDogZmFsc2UsIGNvbnRyb2w6IGZhbHNlLCBhbHQ6IGZhbHNlLCBtZXRhOiBmYWxzZX1cblxuICBjYW1lcmEuZW5hYmxlTW91c2VMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuICAgIGNhbWVyYS5tb3VzZUxpc3RlbmVyID0gbW91c2VDaGFuZ2UoZWxlbWVudCwgaGFuZGxlSW50ZXJhY3Rpb24pXG5cbiAgICAvL2VuYWJsZSBzaW1wbGUgdG91Y2ggaW50ZXJhY3Rpb25zXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICB2YXIgeHkgPSBtb3VzZU9mZnNldChldi5jaGFuZ2VkVG91Y2hlc1swXSwgZWxlbWVudClcbiAgICAgIGhhbmRsZUludGVyYWN0aW9uKDAsIHh5WzBdLCB4eVsxXSwgY2FtZXJhLl9sYXN0TW9kcylcbiAgICAgIGhhbmRsZUludGVyYWN0aW9uKDEsIHh5WzBdLCB4eVsxXSwgY2FtZXJhLl9sYXN0TW9kcylcblxuICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgIH0sIGhhc1Bhc3NpdmUgPyB7cGFzc2l2ZTogZmFsc2V9IDogZmFsc2UpXG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgdmFyIHh5ID0gbW91c2VPZmZzZXQoZXYuY2hhbmdlZFRvdWNoZXNbMF0sIGVsZW1lbnQpXG4gICAgICBoYW5kbGVJbnRlcmFjdGlvbigxLCB4eVswXSwgeHlbMV0sIGNhbWVyYS5fbGFzdE1vZHMpXG5cbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICB9LCBoYXNQYXNzaXZlID8ge3Bhc3NpdmU6IGZhbHNlfSA6IGZhbHNlKVxuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uIChldikge1xuXG4gICAgICBoYW5kbGVJbnRlcmFjdGlvbigwLCBjYW1lcmEuX2xhc3RYLCBjYW1lcmEuX2xhc3RZLCBjYW1lcmEuX2xhc3RNb2RzKVxuXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSwgaGFzUGFzc2l2ZSA/IHtwYXNzaXZlOiBmYWxzZX0gOiBmYWxzZSlcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUludGVyYWN0aW9uIChidXR0b25zLCB4LCB5LCBtb2RzKSB7XG4gICAgICB2YXIga2V5QmluZGluZ01vZGUgPSBjYW1lcmEua2V5QmluZGluZ01vZGVcblxuICAgICAgaWYoa2V5QmluZGluZ01vZGUgPT09IGZhbHNlKSByZXR1cm5cblxuICAgICAgdmFyIHJvdGF0ZSA9IGtleUJpbmRpbmdNb2RlID09PSAncm90YXRlJ1xuICAgICAgdmFyIHBhbiA9IGtleUJpbmRpbmdNb2RlID09PSAncGFuJ1xuICAgICAgdmFyIHpvb20gPSBrZXlCaW5kaW5nTW9kZSA9PT0gJ3pvb20nXG5cbiAgICAgIHZhciBjdHJsID0gISFtb2RzLmNvbnRyb2xcbiAgICAgIHZhciBhbHQgPSAhIW1vZHMuYWx0XG4gICAgICB2YXIgc2hpZnQgPSAhIW1vZHMuc2hpZnRcbiAgICAgIHZhciBsZWZ0ID0gISEoYnV0dG9ucyAmIDEpXG4gICAgICB2YXIgcmlnaHQgPSAhIShidXR0b25zICYgMilcbiAgICAgIHZhciBtaWRkbGUgPSAhIShidXR0b25zICYgNClcblxuICAgICAgdmFyIHNjYWxlID0gMS4wIC8gZWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgIHZhciBkeCAgICA9IHNjYWxlICogKHggLSBjYW1lcmEuX2xhc3RYKVxuICAgICAgdmFyIGR5ICAgID0gc2NhbGUgKiAoeSAtIGNhbWVyYS5fbGFzdFkpXG5cbiAgICAgIHZhciBmbGlwWCA9IGNhbWVyYS5mbGlwWCA/IDEgOiAtMVxuICAgICAgdmFyIGZsaXBZID0gY2FtZXJhLmZsaXBZID8gMSA6IC0xXG5cbiAgICAgIHZhciBkcm90ICA9IE1hdGguUEkgKiBjYW1lcmEucm90YXRlU3BlZWRcblxuICAgICAgdmFyIHQgPSBub3coKVxuXG4gICAgICBpZihjYW1lcmEuX2xhc3RYICE9PSAtMSAmJiBjYW1lcmEuX2xhc3RZICE9PSAtMSkge1xuICAgICAgICBpZigocm90YXRlICYmIGxlZnQgJiYgIWN0cmwgJiYgIWFsdCAmJiAhc2hpZnQpIHx8IChsZWZ0ICYmICFjdHJsICYmICFhbHQgJiYgc2hpZnQpKSB7XG4gICAgICAgICAgLy8gUm90YXRlXG4gICAgICAgICAgdmlldy5yb3RhdGUodCwgZmxpcFggKiBkcm90ICogZHgsIC1mbGlwWSAqIGRyb3QgKiBkeSwgMClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKChwYW4gJiYgbGVmdCAmJiAhY3RybCAmJiAhYWx0ICYmICFzaGlmdCkgfHwgcmlnaHQgfHwgKGxlZnQgJiYgY3RybCAmJiAhYWx0ICYmICFzaGlmdCkpIHtcbiAgICAgICAgICAvLyBQYW5cbiAgICAgICAgICB2aWV3LnBhbih0LCAtY2FtZXJhLnRyYW5zbGF0ZVNwZWVkICogZHggKiBkaXN0YW5jZSwgY2FtZXJhLnRyYW5zbGF0ZVNwZWVkICogZHkgKiBkaXN0YW5jZSwgMClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCh6b29tICYmIGxlZnQgJiYgIWN0cmwgJiYgIWFsdCAmJiAhc2hpZnQpIHx8IG1pZGRsZSB8fCAobGVmdCAmJiAhY3RybCAmJiBhbHQgJiYgIXNoaWZ0KSkge1xuICAgICAgICAgIC8vIFpvb21cbiAgICAgICAgICB2YXIga3pvb20gPSAtY2FtZXJhLnpvb21TcGVlZCAqIGR5IC8gd2luZG93LmlubmVySGVpZ2h0ICogKHQgLSB2aWV3Lmxhc3RUKCkpICogMTAwXG4gICAgICAgICAgdmlldy5wYW4odCwgMCwgMCwgZGlzdGFuY2UgKiAoTWF0aC5leHAoa3pvb20pIC0gMSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2FtZXJhLl9sYXN0WCA9IHhcbiAgICAgIGNhbWVyYS5fbGFzdFkgPSB5XG4gICAgICBjYW1lcmEuX2xhc3RNb2RzID0gbW9kc1xuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNhbWVyYS53aGVlbExpc3RlbmVyID0gbW91c2VXaGVlbChlbGVtZW50LCBmdW5jdGlvbihkeCwgZHkpIHtcbiAgICAgIC8vIFRPRE8gcmVtb3ZlIG5vdyB0aGF0IHdlIGNhbiBkaXNhYmxlIHNjcm9sbCB2aWEgc2Nyb2xsWm9vbT9cbiAgICAgIGlmKGNhbWVyYS5rZXlCaW5kaW5nTW9kZSA9PT0gZmFsc2UpIHJldHVyblxuICAgICAgaWYoIWNhbWVyYS5lbmFibGVXaGVlbCkgcmV0dXJuXG5cbiAgICAgIHZhciBmbGlwWCA9IGNhbWVyYS5mbGlwWCA/IDEgOiAtMVxuICAgICAgdmFyIGZsaXBZID0gY2FtZXJhLmZsaXBZID8gMSA6IC0xXG4gICAgICB2YXIgdCA9IG5vdygpXG4gICAgICBpZihNYXRoLmFicyhkeCkgPiBNYXRoLmFicyhkeSkpIHtcbiAgICAgICAgdmlldy5yb3RhdGUodCwgMCwgMCwgLWR4ICogZmxpcFggKiBNYXRoLlBJICogY2FtZXJhLnJvdGF0ZVNwZWVkIC8gd2luZG93LmlubmVyV2lkdGgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighY2FtZXJhLl9vcnRobykge1xuICAgICAgICAgIHZhciBrem9vbSA9IC1jYW1lcmEuem9vbVNwZWVkICogZmxpcFkgKiBkeSAvIHdpbmRvdy5pbm5lckhlaWdodCAqICh0IC0gdmlldy5sYXN0VCgpKSAvIDIwLjBcbiAgICAgICAgICB2aWV3LnBhbih0LCAwLCAwLCBkaXN0YW5jZSAqIChNYXRoLmV4cChrem9vbSkgLSAxKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHRydWUpXG4gIH1cblxuICBjYW1lcmEuZW5hYmxlTW91c2VMaXN0ZW5lcnMoKVxuXG4gIHJldHVybiBjYW1lcmFcbn1cbiIsInZhciBnbHNsaWZ5ICAgICAgPSByZXF1aXJlKCdnbHNsaWZ5JylcbnZhciBjcmVhdGVTaGFkZXIgPSByZXF1aXJlKCdnbC1zaGFkZXInKVxuXG52YXIgdmVydFNyYyA9IGdsc2xpZnkoJy4vdmVydGV4Lmdsc2wnKVxudmFyIGZyYWdTcmMgPSBnbHNsaWZ5KCcuL2NvbXBvc2l0ZS5nbHNsJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihnbCkge1xuICByZXR1cm4gY3JlYXRlU2hhZGVyKGdsLCB2ZXJ0U3JjLCBmcmFnU3JjLCBudWxsLCBbIHsgbmFtZTogJ3Bvc2l0aW9uJywgdHlwZTogJ3ZlYzInfV0pXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGNyZWF0ZUNhbWVyYSA9IHJlcXVpcmUoJy4vY2FtZXJhLmpzJylcbnZhciBjcmVhdGVBeGVzICAgPSByZXF1aXJlKCdnbC1heGVzM2QnKVxudmFyIGF4ZXNSYW5nZXMgICA9IHJlcXVpcmUoJ2dsLWF4ZXMzZC9wcm9wZXJ0aWVzJylcbnZhciBjcmVhdGVTcGlrZXMgPSByZXF1aXJlKCdnbC1zcGlrZXMzZCcpXG52YXIgY3JlYXRlU2VsZWN0ID0gcmVxdWlyZSgnZ2wtc2VsZWN0LXN0YXRpYycpXG52YXIgY3JlYXRlRkJPICAgID0gcmVxdWlyZSgnZ2wtZmJvJylcbnZhciBkcmF3VHJpYW5nbGUgPSByZXF1aXJlKCdhLWJpZy10cmlhbmdsZScpXG52YXIgbW91c2VDaGFuZ2UgID0gcmVxdWlyZSgnbW91c2UtY2hhbmdlJylcbnZhciBwZXJzcGVjdGl2ZSAgPSByZXF1aXJlKCdnbC1tYXQ0L3BlcnNwZWN0aXZlJylcbnZhciBvcnRobyAgICAgICAgPSByZXF1aXJlKCdnbC1tYXQ0L29ydGhvJylcbnZhciBjcmVhdGVTaGFkZXIgPSByZXF1aXJlKCcuL2xpYi9zaGFkZXInKVxudmFyIGlzTW9iaWxlID0gcmVxdWlyZSgnaXMtbW9iaWxlJykoeyB0YWJsZXQ6IHRydWUsIGZlYXR1cmVEZXRlY3Q6IHRydWUgfSlcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZVNjZW5lOiBjcmVhdGVTY2VuZSxcbiAgY3JlYXRlQ2FtZXJhOiBjcmVhdGVDYW1lcmFcbn1cblxuZnVuY3Rpb24gTW91c2VTZWxlY3QoKSB7XG4gIHRoaXMubW91c2UgICAgICAgICAgPSBbLTEsLTFdXG4gIHRoaXMuc2NyZWVuICAgICAgICAgPSBudWxsXG4gIHRoaXMuZGlzdGFuY2UgICAgICAgPSBJbmZpbml0eVxuICB0aGlzLmluZGV4ICAgICAgICAgID0gbnVsbFxuICB0aGlzLmRhdGFDb29yZGluYXRlID0gbnVsbFxuICB0aGlzLmRhdGFQb3NpdGlvbiAgID0gbnVsbFxuICB0aGlzLm9iamVjdCAgICAgICAgID0gbnVsbFxuICB0aGlzLmRhdGEgICAgICAgICAgID0gbnVsbFxufVxuXG5mdW5jdGlvbiBnZXRDb250ZXh0KGNhbnZhcywgb3B0aW9ucykge1xuICB2YXIgZ2wgPSBudWxsXG4gIHRyeSB7XG4gICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnLCBvcHRpb25zKVxuICAgIGlmKCFnbCkge1xuICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJywgb3B0aW9ucylcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgcmV0dXJuIGdsXG59XG5cbmZ1bmN0aW9uIHJvdW5kVXBQb3cxMCh4KSB7XG4gIHZhciB5ID0gTWF0aC5yb3VuZChNYXRoLmxvZyhNYXRoLmFicyh4KSkgLyBNYXRoLmxvZygxMCkpXG4gIGlmKHkgPCAwKSB7XG4gICAgdmFyIGJhc2UgPSBNYXRoLnJvdW5kKE1hdGgucG93KDEwLCAteSkpXG4gICAgcmV0dXJuIE1hdGguY2VpbCh4KmJhc2UpIC8gYmFzZVxuICB9IGVsc2UgaWYoeSA+IDApIHtcbiAgICB2YXIgYmFzZSA9IE1hdGgucm91bmQoTWF0aC5wb3coMTAsIHkpKVxuICAgIHJldHVybiBNYXRoLmNlaWwoeC9iYXNlKSAqIGJhc2VcbiAgfVxuICByZXR1cm4gTWF0aC5jZWlsKHgpXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRCb29sKHgpIHtcbiAgaWYodHlwZW9mIHggPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB4XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2NlbmUob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICBvcHRpb25zLmNhbWVyYSA9IG9wdGlvbnMuY2FtZXJhIHx8IHt9XG5cbiAgdmFyIGNhbnZhcyA9IG9wdGlvbnMuY2FudmFzXG4gIGlmKCFjYW52YXMpIHtcbiAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGlmKG9wdGlvbnMuY29udGFpbmVyKSB7XG4gICAgICB2YXIgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXJcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKVxuICAgIH1cbiAgfVxuXG4gIHZhciBnbCA9IG9wdGlvbnMuZ2xcbiAgaWYoIWdsKSB7XG4gICAgaWYob3B0aW9ucy5nbE9wdGlvbnMpIHtcbiAgICAgIGlzTW9iaWxlID0gISFvcHRpb25zLmdsT3B0aW9ucy5wcmVzZXJ2ZURyYXdpbmdCdWZmZXJcbiAgICB9XG5cbiAgICBnbCA9IGdldENvbnRleHQoY2FudmFzLFxuICAgICAgb3B0aW9ucy5nbE9wdGlvbnMgfHwge1xuICAgICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IHRydWUsXG4gICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiBpc01vYmlsZVxuICAgICAgfSlcbiAgfVxuICBpZighZ2wpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dlYmdsIG5vdCBzdXBwb3J0ZWQnKVxuICB9XG5cbiAgLy9Jbml0aWFsIGJvdW5kc1xuICB2YXIgYm91bmRzID0gb3B0aW9ucy5ib3VuZHMgfHwgW1stMTAsLTEwLC0xMF0sIFsxMCwxMCwxMF1dXG5cbiAgLy9DcmVhdGUgc2VsZWN0aW9uXG4gIHZhciBzZWxlY3Rpb24gPSBuZXcgTW91c2VTZWxlY3QoKVxuXG4gIC8vQWNjdW11bGF0aW9uIGJ1ZmZlclxuICB2YXIgYWNjdW1CdWZmZXIgPSBjcmVhdGVGQk8oZ2wsXG4gICAgZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0LCB7XG4gICAgICBwcmVmZXJGbG9hdDogIWlzTW9iaWxlXG4gICAgfSlcblxuICB2YXIgYWNjdW1TaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wpXG5cbiAgdmFyIGlzT3J0aG8gPVxuICAgIChvcHRpb25zLmNhbWVyYU9iamVjdCAmJiBvcHRpb25zLmNhbWVyYU9iamVjdC5fb3J0aG8gPT09IHRydWUpIHx8XG4gICAgKG9wdGlvbnMuY2FtZXJhLnByb2plY3Rpb24gJiYgb3B0aW9ucy5jYW1lcmEucHJvamVjdGlvbi50eXBlID09PSAnb3J0aG9ncmFwaGljJykgfHxcbiAgICBmYWxzZVxuXG4gIC8vQ3JlYXRlIGEgY2FtZXJhXG4gIHZhciBjYW1lcmFPcHRpb25zID0ge1xuICAgIGV5ZTogICAgIG9wdGlvbnMuY2FtZXJhLmV5ZSAgICAgfHwgWzIsMCwwXSxcbiAgICBjZW50ZXI6ICBvcHRpb25zLmNhbWVyYS5jZW50ZXIgIHx8IFswLDAsMF0sXG4gICAgdXA6ICAgICAgb3B0aW9ucy5jYW1lcmEudXAgICAgICB8fCBbMCwxLDBdLFxuICAgIHpvb21NaW46IG9wdGlvbnMuY2FtZXJhLnpvb21NYXggfHwgMC4xLFxuICAgIHpvb21NYXg6IG9wdGlvbnMuY2FtZXJhLnpvb21NaW4gfHwgMTAwLFxuICAgIG1vZGU6ICAgIG9wdGlvbnMuY2FtZXJhLm1vZGUgICAgfHwgJ3R1cm50YWJsZScsXG4gICAgX29ydGhvOiAgaXNPcnRob1xuICB9XG5cbiAgLy9DcmVhdGUgYXhlc1xuICB2YXIgYXhlc09wdGlvbnMgPSBvcHRpb25zLmF4ZXMgfHwge31cbiAgdmFyIGF4ZXMgPSBjcmVhdGVBeGVzKGdsLCBheGVzT3B0aW9ucylcbiAgYXhlcy5lbmFibGUgPSAhYXhlc09wdGlvbnMuZGlzYWJsZVxuXG4gIC8vQ3JlYXRlIHNwaWtlc1xuICB2YXIgc3Bpa2VPcHRpb25zID0gb3B0aW9ucy5zcGlrZXMgfHwge31cbiAgdmFyIHNwaWtlcyA9IGNyZWF0ZVNwaWtlcyhnbCwgc3Bpa2VPcHRpb25zKVxuXG4gIC8vT2JqZWN0IGxpc3QgaXMgZW1wdHkgaW5pdGlhbGx5XG4gIHZhciBvYmplY3RzICAgICAgICAgPSBbXVxuICB2YXIgcGlja0J1ZmZlcklkcyAgID0gW11cbiAgdmFyIHBpY2tCdWZmZXJDb3VudCA9IFtdXG4gIHZhciBwaWNrQnVmZmVycyAgICAgPSBbXVxuXG4gIC8vRGlydHkgZmxhZywgc2tpcCByZWRyYXcgaWYgc2NlbmUgc3RhdGljXG4gIHZhciBkaXJ0eSAgICAgICA9IHRydWVcbiAgdmFyIHBpY2tEaXJ0eSAgID0gdHJ1ZVxuXG4gIHZhciBwcm9qZWN0aW9uICAgICA9IG5ldyBBcnJheSgxNilcbiAgdmFyIG1vZGVsICAgICAgICAgID0gbmV3IEFycmF5KDE2KVxuXG4gIHZhciBjYW1lcmFQYXJhbXMgPSB7XG4gICAgdmlldzogICAgICAgICBudWxsLFxuICAgIHByb2plY3Rpb246ICAgcHJvamVjdGlvbixcbiAgICBtb2RlbDogICAgICAgIG1vZGVsLFxuICAgIF9vcnRobzogICAgICAgZmFsc2VcbiAgfVxuXG4gIHZhciBwaWNrRGlydHkgPSB0cnVlXG5cbiAgdmFyIHZpZXdTaGFwZSA9IFsgZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0IF1cblxuICB2YXIgY2FtZXJhID0gb3B0aW9ucy5jYW1lcmFPYmplY3QgfHwgY3JlYXRlQ2FtZXJhKGNhbnZhcywgY2FtZXJhT3B0aW9ucylcblxuICAvL0NyZWF0ZSBzY2VuZSBvYmplY3RcbiAgdmFyIHNjZW5lID0ge1xuICAgIGdsOiAgICAgICAgICAgZ2wsXG4gICAgY29udGV4dExvc3Q6ICBmYWxzZSxcbiAgICBwaXhlbFJhdGlvOiAgIG9wdGlvbnMucGl4ZWxSYXRpbyB8fCAxLFxuICAgIGNhbnZhczogICAgICAgY2FudmFzLFxuICAgIHNlbGVjdGlvbjogICAgc2VsZWN0aW9uLFxuICAgIGNhbWVyYTogICAgICAgY2FtZXJhLFxuICAgIGF4ZXM6ICAgICAgICAgYXhlcyxcbiAgICBheGVzUGl4ZWxzOiAgIG51bGwsXG4gICAgc3Bpa2VzOiAgICAgICBzcGlrZXMsXG4gICAgYm91bmRzOiAgICAgICBib3VuZHMsXG4gICAgb2JqZWN0czogICAgICBvYmplY3RzLFxuICAgIHNoYXBlOiAgICAgICAgdmlld1NoYXBlLFxuICAgIGFzcGVjdDogICAgICAgb3B0aW9ucy5hc3BlY3RSYXRpbyB8fCBbMSwxLDFdLFxuICAgIHBpY2tSYWRpdXM6ICAgb3B0aW9ucy5waWNrUmFkaXVzIHx8IDEwLFxuICAgIHpOZWFyOiAgICAgICAgb3B0aW9ucy56TmVhciB8fCAwLjAxLFxuICAgIHpGYXI6ICAgICAgICAgb3B0aW9ucy56RmFyICB8fCAxMDAwLFxuICAgIGZvdnk6ICAgICAgICAgb3B0aW9ucy5mb3Z5ICB8fCBNYXRoLlBJLzQsXG4gICAgY2xlYXJDb2xvcjogICBvcHRpb25zLmNsZWFyQ29sb3IgfHwgWzAsMCwwLDBdLFxuICAgIGF1dG9SZXNpemU6ICAgZGVmYXVsdEJvb2wob3B0aW9ucy5hdXRvUmVzaXplKSxcbiAgICBhdXRvQm91bmRzOiAgIGRlZmF1bHRCb29sKG9wdGlvbnMuYXV0b0JvdW5kcyksXG4gICAgYXV0b1NjYWxlOiAgICAhIW9wdGlvbnMuYXV0b1NjYWxlLFxuICAgIGF1dG9DZW50ZXI6ICAgZGVmYXVsdEJvb2wob3B0aW9ucy5hdXRvQ2VudGVyKSxcbiAgICBjbGlwVG9Cb3VuZHM6IGRlZmF1bHRCb29sKG9wdGlvbnMuY2xpcFRvQm91bmRzKSxcbiAgICBzbmFwVG9EYXRhOiAgICEhb3B0aW9ucy5zbmFwVG9EYXRhLFxuICAgIG9uc2VsZWN0OiAgICAgb3B0aW9ucy5vbnNlbGVjdCB8fCBudWxsLFxuICAgIG9ucmVuZGVyOiAgICAgb3B0aW9ucy5vbnJlbmRlciB8fCBudWxsLFxuICAgIG9uY2xpY2s6ICAgICAgb3B0aW9ucy5vbmNsaWNrICB8fCBudWxsLFxuICAgIGNhbWVyYVBhcmFtczogY2FtZXJhUGFyYW1zLFxuICAgIG9uY29udGV4dGxvc3M6IG51bGwsXG4gICAgbW91c2VMaXN0ZW5lcjogbnVsbCxcbiAgICBfc3RvcHBlZDogZmFsc2UsXG5cbiAgICBnZXRBc3BlY3RyYXRpbzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiB0aGlzLmFzcGVjdFswXSxcbiAgICAgICAgeTogdGhpcy5hc3BlY3RbMV0sXG4gICAgICAgIHo6IHRoaXMuYXNwZWN0WzJdXG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldEFzcGVjdHJhdGlvOiBmdW5jdGlvbihhc3BlY3RyYXRpbykge1xuICAgICAgdGhpcy5hc3BlY3RbMF0gPSBhc3BlY3RyYXRpby54XG4gICAgICB0aGlzLmFzcGVjdFsxXSA9IGFzcGVjdHJhdGlvLnlcbiAgICAgIHRoaXMuYXNwZWN0WzJdID0gYXNwZWN0cmF0aW8uelxuICAgICAgcGlja0RpcnR5ID0gdHJ1ZVxuICAgIH0sXG5cbiAgICBzZXRCb3VuZHM6IGZ1bmN0aW9uKGF4aXNJbmRleCwgcmFuZ2UpIHtcbiAgICAgIHRoaXMuYm91bmRzWzBdW2F4aXNJbmRleF0gPSByYW5nZS5taW5cbiAgICAgIHRoaXMuYm91bmRzWzFdW2F4aXNJbmRleF0gPSByYW5nZS5tYXhcbiAgICB9LFxuXG4gICAgc2V0Q2xlYXJDb2xvcjogZnVuY3Rpb24oY2xlYXJDb2xvcikge1xuICAgICAgdGhpcy5jbGVhckNvbG9yID0gY2xlYXJDb2xvclxuICAgIH0sXG5cbiAgICBjbGVhclJHQkE6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5nbC5jbGVhckNvbG9yKFxuICAgICAgICB0aGlzLmNsZWFyQ29sb3JbMF0sXG4gICAgICAgIHRoaXMuY2xlYXJDb2xvclsxXSxcbiAgICAgICAgdGhpcy5jbGVhckNvbG9yWzJdLFxuICAgICAgICB0aGlzLmNsZWFyQ29sb3JbM11cbiAgICAgIClcblxuICAgICAgdGhpcy5nbC5jbGVhcihcbiAgICAgICAgdGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUIHxcbiAgICAgICAgdGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgdmFyIHBpY2tTaGFwZSA9IFsgKGdsLmRyYXdpbmdCdWZmZXJXaWR0aC9zY2VuZS5waXhlbFJhdGlvKXwwLCAoZ2wuZHJhd2luZ0J1ZmZlckhlaWdodC9zY2VuZS5waXhlbFJhdGlvKXwwIF1cblxuICBmdW5jdGlvbiByZXNpemVMaXN0ZW5lcigpIHtcbiAgICBpZihzY2VuZS5fc3RvcHBlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmKCFzY2VuZS5hdXRvUmVzaXplKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIHBhcmVudCA9IGNhbnZhcy5wYXJlbnROb2RlXG4gICAgdmFyIHdpZHRoICA9IDFcbiAgICB2YXIgaGVpZ2h0ID0gMVxuICAgIGlmKHBhcmVudCAmJiBwYXJlbnQgIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgIHdpZHRoICA9IHBhcmVudC5jbGllbnRXaWR0aFxuICAgICAgaGVpZ2h0ID0gcGFyZW50LmNsaWVudEhlaWdodFxuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgfVxuICAgIHZhciBuZXh0V2lkdGggID0gTWF0aC5jZWlsKHdpZHRoICAqIHNjZW5lLnBpeGVsUmF0aW8pfDBcbiAgICB2YXIgbmV4dEhlaWdodCA9IE1hdGguY2VpbChoZWlnaHQgKiBzY2VuZS5waXhlbFJhdGlvKXwwXG4gICAgaWYobmV4dFdpZHRoICE9PSBjYW52YXMud2lkdGggfHwgbmV4dEhlaWdodCAhPT0gY2FudmFzLmhlaWdodCkge1xuICAgICAgY2FudmFzLndpZHRoICAgPSBuZXh0V2lkdGhcbiAgICAgIGNhbnZhcy5oZWlnaHQgID0gbmV4dEhlaWdodFxuICAgICAgdmFyIHN0eWxlID0gY2FudmFzLnN0eWxlXG4gICAgICBzdHlsZS5wb3NpdGlvbiA9IHN0eWxlLnBvc2l0aW9uIHx8ICdhYnNvbHV0ZSdcbiAgICAgIHN0eWxlLmxlZnQgICAgID0gJzBweCdcbiAgICAgIHN0eWxlLnRvcCAgICAgID0gJzBweCdcbiAgICAgIHN0eWxlLndpZHRoICAgID0gd2lkdGggICsgJ3B4J1xuICAgICAgc3R5bGUuaGVpZ2h0ICAgPSBoZWlnaHQgKyAncHgnXG4gICAgICBkaXJ0eSA9IHRydWVcbiAgICB9XG4gIH1cbiAgaWYoc2NlbmUuYXV0b1Jlc2l6ZSkge1xuICAgIHJlc2l6ZUxpc3RlbmVyKClcbiAgfVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplTGlzdGVuZXIpXG5cbiAgZnVuY3Rpb24gcmVhbGxvY1BpY2tJZHMoKSB7XG4gICAgdmFyIG51bU9ianMgPSBvYmplY3RzLmxlbmd0aFxuICAgIHZhciBudW1QaWNrID0gcGlja0J1ZmZlcnMubGVuZ3RoXG4gICAgZm9yKHZhciBpPTA7IGk8bnVtUGljazsgKytpKSB7XG4gICAgICBwaWNrQnVmZmVyQ291bnRbaV0gPSAwXG4gICAgfVxuICAgIG9ial9sb29wOlxuICAgIGZvcih2YXIgaT0wOyBpPG51bU9ianM7ICsraSkge1xuICAgICAgdmFyIG9iaiA9IG9iamVjdHNbaV1cbiAgICAgIHZhciBwaWNrQ291bnQgPSBvYmoucGlja1Nsb3RzXG4gICAgICBpZighcGlja0NvdW50KSB7XG4gICAgICAgIHBpY2tCdWZmZXJJZHNbaV0gPSAtMVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZm9yKHZhciBqPTA7IGo8bnVtUGljazsgKytqKSB7XG4gICAgICAgIGlmKHBpY2tCdWZmZXJDb3VudFtqXSArIHBpY2tDb3VudCA8IDI1NSkge1xuICAgICAgICAgIHBpY2tCdWZmZXJJZHNbaV0gPSBqXG4gICAgICAgICAgb2JqLnNldFBpY2tCYXNlKHBpY2tCdWZmZXJDb3VudFtqXSsxKVxuICAgICAgICAgIHBpY2tCdWZmZXJDb3VudFtqXSArPSBwaWNrQ291bnRcbiAgICAgICAgICBjb250aW51ZSBvYmpfbG9vcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL0NyZWF0ZSBuZXcgcGljayBidWZmZXJcbiAgICAgIHZhciBuYnVmZmVyID0gY3JlYXRlU2VsZWN0KGdsLCB2aWV3U2hhcGUpXG4gICAgICBwaWNrQnVmZmVySWRzW2ldID0gbnVtUGlja1xuICAgICAgcGlja0J1ZmZlcnMucHVzaChuYnVmZmVyKVxuICAgICAgcGlja0J1ZmZlckNvdW50LnB1c2gocGlja0NvdW50KVxuICAgICAgb2JqLnNldFBpY2tCYXNlKDEpXG4gICAgICBudW1QaWNrICs9IDFcbiAgICB9XG4gICAgd2hpbGUobnVtUGljayA+IDAgJiYgcGlja0J1ZmZlckNvdW50W251bVBpY2stMV0gPT09IDApIHtcbiAgICAgIHBpY2tCdWZmZXJDb3VudC5wb3AoKVxuICAgICAgcGlja0J1ZmZlcnMucG9wKCkuZGlzcG9zZSgpXG4gICAgfVxuICB9XG5cbiAgc2NlbmUudXBkYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgaWYoc2NlbmUuX3N0b3BwZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIGRpcnR5ID0gdHJ1ZVxuICAgIHBpY2tEaXJ0eSA9IHRydWVcbiAgfVxuXG4gIHNjZW5lLmFkZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmKHNjZW5lLl9zdG9wcGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgb2JqLmF4ZXMgPSBheGVzXG4gICAgb2JqZWN0cy5wdXNoKG9iailcbiAgICBwaWNrQnVmZmVySWRzLnB1c2goLTEpXG4gICAgZGlydHkgPSB0cnVlXG4gICAgcGlja0RpcnR5ID0gdHJ1ZVxuICAgIHJlYWxsb2NQaWNrSWRzKClcbiAgfVxuXG4gIHNjZW5lLnJlbW92ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmKHNjZW5lLl9zdG9wcGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIGlkeCA9IG9iamVjdHMuaW5kZXhPZihvYmopXG4gICAgaWYoaWR4IDwgMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIG9iamVjdHMuc3BsaWNlKGlkeCwgMSlcbiAgICBwaWNrQnVmZmVySWRzLnBvcCgpXG4gICAgZGlydHkgPSB0cnVlXG4gICAgcGlja0RpcnR5ID0gdHJ1ZVxuICAgIHJlYWxsb2NQaWNrSWRzKClcbiAgfVxuXG4gIHNjZW5lLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZihzY2VuZS5fc3RvcHBlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2NlbmUuX3N0b3BwZWQgPSB0cnVlXG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplTGlzdGVuZXIpXG4gICAgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmdsY29udGV4dGxvc3QnLCBjaGVja0NvbnRleHRMb3NzKVxuICAgIHNjZW5lLm1vdXNlTGlzdGVuZXIuZW5hYmxlZCA9IGZhbHNlXG5cbiAgICBpZihzY2VuZS5jb250ZXh0TG9zdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy9EZXN0cm95IG9iamVjdHNcbiAgICBheGVzLmRpc3Bvc2UoKVxuICAgIHNwaWtlcy5kaXNwb3NlKClcbiAgICBmb3IodmFyIGk9MDsgaTxvYmplY3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICBvYmplY3RzW2ldLmRpc3Bvc2UoKVxuICAgIH1cblxuICAgIC8vQ2xlYW4gdXAgYnVmZmVyc1xuICAgIGFjY3VtQnVmZmVyLmRpc3Bvc2UoKVxuICAgIGZvcih2YXIgaT0wOyBpPHBpY2tCdWZmZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICBwaWNrQnVmZmVyc1tpXS5kaXNwb3NlKClcbiAgICB9XG5cbiAgICAvL0NsZWFuIHVwIHNoYWRlcnNcbiAgICBhY2N1bVNoYWRlci5kaXNwb3NlKClcblxuICAgIC8vUmVsZWFzZSBhbGwgcmVmZXJlbmNlc1xuICAgIGdsID0gbnVsbFxuICAgIGF4ZXMgPSBudWxsXG4gICAgc3Bpa2VzID0gbnVsbFxuICAgIG9iamVjdHMgPSBbXVxuICB9XG5cbiAgLy9VcGRhdGUgbW91c2UgcG9zaXRpb25cbiAgc2NlbmUuX21vdXNlUm90YXRpbmcgPSBmYWxzZVxuICBzY2VuZS5fcHJldkJ1dHRvbnMgPSAwXG5cbiAgc2NlbmUuZW5hYmxlTW91c2VMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuICAgIHNjZW5lLm1vdXNlTGlzdGVuZXIgPSBtb3VzZUNoYW5nZShjYW52YXMsIGZ1bmN0aW9uKGJ1dHRvbnMsIHgsIHkpIHtcbiAgICAgIGlmKHNjZW5lLl9zdG9wcGVkKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB2YXIgbnVtUGljayA9IHBpY2tCdWZmZXJzLmxlbmd0aFxuICAgICAgdmFyIG51bU9ianMgPSBvYmplY3RzLmxlbmd0aFxuICAgICAgdmFyIHByZXZPYmogPSBzZWxlY3Rpb24ub2JqZWN0XG5cbiAgICAgIHNlbGVjdGlvbi5kaXN0YW5jZSA9IEluZmluaXR5XG4gICAgICBzZWxlY3Rpb24ubW91c2VbMF0gPSB4XG4gICAgICBzZWxlY3Rpb24ubW91c2VbMV0gPSB5XG4gICAgICBzZWxlY3Rpb24ub2JqZWN0ID0gbnVsbFxuICAgICAgc2VsZWN0aW9uLnNjcmVlbiA9IG51bGxcbiAgICAgIHNlbGVjdGlvbi5kYXRhQ29vcmRpbmF0ZSA9IHNlbGVjdGlvbi5kYXRhUG9zaXRpb24gPSBudWxsXG5cbiAgICAgIHZhciBjaGFuZ2UgPSBmYWxzZVxuXG4gICAgICBpZihidXR0b25zICYmIHNjZW5lLl9wcmV2QnV0dG9ucykge1xuICAgICAgICBzY2VuZS5fbW91c2VSb3RhdGluZyA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKHNjZW5lLl9tb3VzZVJvdGF0aW5nKSB7XG4gICAgICAgICAgcGlja0RpcnR5ID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHNjZW5lLl9tb3VzZVJvdGF0aW5nID0gZmFsc2VcblxuICAgICAgICBmb3IodmFyIGk9MDsgaTxudW1QaWNrOyArK2kpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gcGlja0J1ZmZlcnNbaV0ucXVlcnkoeCwgcGlja1NoYXBlWzFdIC0geSAtIDEsIHNjZW5lLnBpY2tSYWRpdXMpXG4gICAgICAgICAgaWYocmVzdWx0KSB7XG4gICAgICAgICAgICBpZihyZXN1bHQuZGlzdGFuY2UgPiBzZWxlY3Rpb24uZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcih2YXIgaj0wOyBqPG51bU9ianM7ICsraikge1xuICAgICAgICAgICAgICB2YXIgb2JqID0gb2JqZWN0c1tqXVxuICAgICAgICAgICAgICBpZihwaWNrQnVmZmVySWRzW2pdICE9PSBpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgb2JqUGljayA9IG9iai5waWNrKHJlc3VsdClcbiAgICAgICAgICAgICAgaWYob2JqUGljaykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5idXR0b25zICAgICAgICA9IGJ1dHRvbnNcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uc2NyZWVuICAgICAgICAgPSByZXN1bHQuY29vcmRcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uZGlzdGFuY2UgICAgICAgPSByZXN1bHQuZGlzdGFuY2VcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24ub2JqZWN0ICAgICAgICAgPSBvYmpcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uaW5kZXggICAgICAgICAgPSBvYmpQaWNrLmRpc3RhbmNlXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmRhdGFQb3NpdGlvbiAgID0gb2JqUGljay5wb3NpdGlvblxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5kYXRhQ29vcmRpbmF0ZSA9IG9ialBpY2suZGF0YUNvb3JkaW5hdGVcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24uZGF0YSAgICAgICAgICAgPSBvYmpQaWNrXG4gICAgICAgICAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKHByZXZPYmogJiYgcHJldk9iaiAhPT0gc2VsZWN0aW9uLm9iamVjdCkge1xuICAgICAgICBpZihwcmV2T2JqLmhpZ2hsaWdodCkge1xuICAgICAgICAgIHByZXZPYmouaGlnaGxpZ2h0KG51bGwpXG4gICAgICAgIH1cbiAgICAgICAgZGlydHkgPSB0cnVlXG4gICAgICB9XG4gICAgICBpZihzZWxlY3Rpb24ub2JqZWN0KSB7XG4gICAgICAgIGlmKHNlbGVjdGlvbi5vYmplY3QuaGlnaGxpZ2h0KSB7XG4gICAgICAgICAgc2VsZWN0aW9uLm9iamVjdC5oaWdobGlnaHQoc2VsZWN0aW9uLmRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgZGlydHkgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNoYW5nZSA9IGNoYW5nZSB8fCAoc2VsZWN0aW9uLm9iamVjdCAhPT0gcHJldk9iailcbiAgICAgIGlmKGNoYW5nZSAmJiBzY2VuZS5vbnNlbGVjdCkge1xuICAgICAgICBzY2VuZS5vbnNlbGVjdChzZWxlY3Rpb24pXG4gICAgICB9XG5cbiAgICAgIGlmKChidXR0b25zICYgMSkgJiYgIShzY2VuZS5fcHJldkJ1dHRvbnMgJiAxKSAmJiBzY2VuZS5vbmNsaWNrKSB7XG4gICAgICAgIHNjZW5lLm9uY2xpY2soc2VsZWN0aW9uKVxuICAgICAgfVxuICAgICAgc2NlbmUuX3ByZXZCdXR0b25zID0gYnV0dG9uc1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0NvbnRleHRMb3NzKCkge1xuICAgIGlmKHNjZW5lLmNvbnRleHRMb3N0KSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZihnbC5pc0NvbnRleHRMb3N0KCkpIHtcbiAgICAgIHNjZW5lLmNvbnRleHRMb3N0ID0gdHJ1ZVxuICAgICAgc2NlbmUubW91c2VMaXN0ZW5lci5lbmFibGVkID0gZmFsc2VcbiAgICAgIHNjZW5lLnNlbGVjdGlvbi5vYmplY3QgPSBudWxsXG4gICAgICBpZihzY2VuZS5vbmNvbnRleHRsb3NzKSB7XG4gICAgICAgIHNjZW5lLm9uY29udGV4dGxvc3MoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd3ZWJnbGNvbnRleHRsb3N0JywgY2hlY2tDb250ZXh0TG9zcylcblxuICAvL1JlbmRlciB0aGUgc2NlbmUgZm9yIG1vdXNlIHBpY2tpbmdcbiAgZnVuY3Rpb24gcmVuZGVyUGljaygpIHtcbiAgICBpZihjaGVja0NvbnRleHRMb3NzKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGdsLmNvbG9yTWFzayh0cnVlLCB0cnVlLCB0cnVlLCB0cnVlKVxuICAgIGdsLmRlcHRoTWFzayh0cnVlKVxuICAgIGdsLmRpc2FibGUoZ2wuQkxFTkQpXG4gICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpXG4gICAgZ2wuZGVwdGhGdW5jKGdsLkxFUVVBTClcblxuICAgIHZhciBudW1PYmpzID0gb2JqZWN0cy5sZW5ndGhcbiAgICB2YXIgbnVtUGljayA9IHBpY2tCdWZmZXJzLmxlbmd0aFxuICAgIGZvcih2YXIgaj0wOyBqPG51bVBpY2s7ICsraikge1xuICAgICAgdmFyIGJ1ZiA9IHBpY2tCdWZmZXJzW2pdXG4gICAgICBidWYuc2hhcGUgPSBwaWNrU2hhcGVcbiAgICAgIGJ1Zi5iZWdpbigpXG4gICAgICBmb3IodmFyIGk9MDsgaTxudW1PYmpzOyArK2kpIHtcbiAgICAgICAgaWYocGlja0J1ZmZlcklkc1tpXSAhPT0gaikge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9iaiA9IG9iamVjdHNbaV1cbiAgICAgICAgaWYob2JqLmRyYXdQaWNrKSB7XG4gICAgICAgICAgb2JqLnBpeGVsUmF0aW8gPSAxXG4gICAgICAgICAgb2JqLmRyYXdQaWNrKGNhbWVyYVBhcmFtcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnVmLmVuZCgpXG4gICAgfVxuICB9XG5cbiAgdmFyIG5Cb3VuZHMgPSBbXG4gICAgWyBJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5XSxcbiAgICBbLUluZmluaXR5LC1JbmZpbml0eSwtSW5maW5pdHldXVxuXG4gIHZhciBwcmV2Qm91bmRzID0gW25Cb3VuZHNbMF0uc2xpY2UoKSwgbkJvdW5kc1sxXS5zbGljZSgpXVxuXG4gIGZ1bmN0aW9uIHJlZHJhdygpIHtcbiAgICBpZihjaGVja0NvbnRleHRMb3NzKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJlc2l6ZUxpc3RlbmVyKClcblxuICAgIC8vVGljayBjYW1lcmFcbiAgICB2YXIgY2FtZXJhTW92ZWQgPSBzY2VuZS5jYW1lcmEudGljaygpXG4gICAgY2FtZXJhUGFyYW1zLnZpZXcgPSBzY2VuZS5jYW1lcmEubWF0cml4XG4gICAgZGlydHkgICAgID0gZGlydHkgfHwgY2FtZXJhTW92ZWRcbiAgICBwaWNrRGlydHkgPSBwaWNrRGlydHkgfHwgY2FtZXJhTW92ZWRcblxuICAgICAgLy9TZXQgcGl4ZWwgcmF0aW9cbiAgICBheGVzLnBpeGVsUmF0aW8gICA9IHNjZW5lLnBpeGVsUmF0aW9cbiAgICBzcGlrZXMucGl4ZWxSYXRpbyA9IHNjZW5lLnBpeGVsUmF0aW9cblxuICAgIC8vQ2hlY2sgaWYgYW55IG9iamVjdHMgY2hhbmdlZCwgcmVjYWxjdWxhdGUgYm91bmRzXG4gICAgdmFyIG51bU9ianMgPSBvYmplY3RzLmxlbmd0aFxuICAgIHZhciBsbyA9IG5Cb3VuZHNbMF1cbiAgICB2YXIgaGkgPSBuQm91bmRzWzFdXG4gICAgbG9bMF0gPSBsb1sxXSA9IGxvWzJdID0gIEluZmluaXR5XG4gICAgaGlbMF0gPSBoaVsxXSA9IGhpWzJdID0gLUluZmluaXR5XG4gICAgZm9yKHZhciBpPTA7IGk8bnVtT2JqczsgKytpKSB7XG4gICAgICB2YXIgb2JqID0gb2JqZWN0c1tpXVxuXG4gICAgICAvL1NldCB0aGUgYXhlcyBwcm9wZXJ0aWVzIGZvciBlYWNoIG9iamVjdFxuICAgICAgb2JqLnBpeGVsUmF0aW8gPSBzY2VuZS5waXhlbFJhdGlvXG4gICAgICBvYmouYXhlcyA9IHNjZW5lLmF4ZXNcblxuICAgICAgZGlydHkgPSBkaXJ0eSB8fCAhIW9iai5kaXJ0eVxuICAgICAgcGlja0RpcnR5ID0gcGlja0RpcnR5IHx8ICEhb2JqLmRpcnR5XG4gICAgICB2YXIgb2JiID0gb2JqLmJvdW5kc1xuICAgICAgaWYob2JiKSB7XG4gICAgICAgIHZhciBvbG8gPSBvYmJbMF1cbiAgICAgICAgdmFyIG9oaSA9IG9iYlsxXVxuICAgICAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgICAgICBsb1tqXSA9IE1hdGgubWluKGxvW2pdLCBvbG9bal0pXG4gICAgICAgICAgaGlbal0gPSBNYXRoLm1heChoaVtqXSwgb2hpW2pdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9SZWNhbGN1bGF0ZSBib3VuZHNcbiAgICB2YXIgYm91bmRzID0gc2NlbmUuYm91bmRzXG4gICAgaWYoc2NlbmUuYXV0b0JvdW5kcykge1xuICAgICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICAgIGlmKGhpW2pdIDwgbG9bal0pIHtcbiAgICAgICAgICBsb1tqXSA9IC0xXG4gICAgICAgICAgaGlbal0gPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYobG9bal0gPT09IGhpW2pdKSB7XG4gICAgICAgICAgICBsb1tqXSAtPSAxXG4gICAgICAgICAgICBoaVtqXSArPSAxXG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwYWRkaW5nID0gMC4wNSAqIChoaVtqXSAtIGxvW2pdKVxuICAgICAgICAgIGxvW2pdID0gbG9bal0gLSBwYWRkaW5nXG4gICAgICAgICAgaGlbal0gPSBoaVtqXSArIHBhZGRpbmdcbiAgICAgICAgfVxuICAgICAgICBib3VuZHNbMF1bal0gPSBsb1tqXVxuICAgICAgICBib3VuZHNbMV1bal0gPSBoaVtqXVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBib3VuZHNDaGFuZ2VkID0gZmFsc2VcbiAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgICAgYm91bmRzQ2hhbmdlZCA9IGJvdW5kc0NoYW5nZWQgfHxcbiAgICAgICAgICAgIChwcmV2Qm91bmRzWzBdW2pdICE9PSBib3VuZHNbMF1bal0pICB8fFxuICAgICAgICAgICAgKHByZXZCb3VuZHNbMV1bal0gIT09IGJvdW5kc1sxXVtqXSlcbiAgICAgICAgcHJldkJvdW5kc1swXVtqXSA9IGJvdW5kc1swXVtqXVxuICAgICAgICBwcmV2Qm91bmRzWzFdW2pdID0gYm91bmRzWzFdW2pdXG4gICAgfVxuXG4gICAgLy9SZWNhbGN1bGF0ZSBib3VuZHNcbiAgICBwaWNrRGlydHkgPSBwaWNrRGlydHkgfHwgYm91bmRzQ2hhbmdlZFxuICAgIGRpcnR5ID0gZGlydHkgfHwgYm91bmRzQ2hhbmdlZFxuXG4gICAgaWYoIWRpcnR5KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZihib3VuZHNDaGFuZ2VkKSB7XG4gICAgICB2YXIgdGlja1NwYWNpbmcgPSBbMCwwLDBdXG4gICAgICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICAgICAgdGlja1NwYWNpbmdbaV0gPSByb3VuZFVwUG93MTAoKGJvdW5kc1sxXVtpXS1ib3VuZHNbMF1baV0pIC8gMTAuMClcbiAgICAgIH1cbiAgICAgIGlmKGF4ZXMuYXV0b1RpY2tzKSB7XG4gICAgICAgIGF4ZXMudXBkYXRlKHtcbiAgICAgICAgICBib3VuZHM6IGJvdW5kcyxcbiAgICAgICAgICB0aWNrU3BhY2luZzogdGlja1NwYWNpbmdcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF4ZXMudXBkYXRlKHtcbiAgICAgICAgICBib3VuZHM6IGJvdW5kc1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vR2V0IHNjZW5lXG4gICAgdmFyIHdpZHRoICA9IGdsLmRyYXdpbmdCdWZmZXJXaWR0aFxuICAgIHZhciBoZWlnaHQgPSBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0XG4gICAgdmlld1NoYXBlWzBdID0gd2lkdGhcbiAgICB2aWV3U2hhcGVbMV0gPSBoZWlnaHRcbiAgICBwaWNrU2hhcGVbMF0gPSBNYXRoLm1heCh3aWR0aC9zY2VuZS5waXhlbFJhdGlvLCAxKXwwXG4gICAgcGlja1NoYXBlWzFdID0gTWF0aC5tYXgoaGVpZ2h0L3NjZW5lLnBpeGVsUmF0aW8sIDEpfDBcblxuICAgIC8vQ29tcHV0ZSBjYW1lcmEgcGFyYW1ldGVyc1xuICAgIGNhbGNDYW1lcmFQYXJhbXMoc2NlbmUsIGlzT3J0aG8pXG5cbiAgICAvL0FwcGx5IGF4ZXMvY2xpcCBib3VuZHNcbiAgICBmb3IodmFyIGk9MDsgaTxudW1PYmpzOyArK2kpIHtcbiAgICAgIHZhciBvYmogPSBvYmplY3RzW2ldXG5cbiAgICAgIC8vU2V0IGF4ZXMgYm91bmRzXG4gICAgICBvYmouYXhlc0JvdW5kcyA9IGJvdW5kc1xuXG4gICAgICAvL1NldCBjbGlwIGJvdW5kc1xuICAgICAgaWYoc2NlbmUuY2xpcFRvQm91bmRzKSB7XG4gICAgICAgIG9iai5jbGlwQm91bmRzID0gYm91bmRzXG4gICAgICB9XG4gICAgfVxuICAgIC8vU2V0IHNwaWtlIHBhcmFtZXRlcnNcbiAgICBpZihzZWxlY3Rpb24ub2JqZWN0KSB7XG4gICAgICBpZihzY2VuZS5zbmFwVG9EYXRhKSB7XG4gICAgICAgIHNwaWtlcy5wb3NpdGlvbiA9IHNlbGVjdGlvbi5kYXRhQ29vcmRpbmF0ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3Bpa2VzLnBvc2l0aW9uID0gc2VsZWN0aW9uLmRhdGFQb3NpdGlvblxuICAgICAgfVxuICAgICAgc3Bpa2VzLmJvdW5kcyA9IGJvdW5kc1xuICAgIH1cblxuICAgIC8vSWYgc3RhdGUgY2hhbmdlZCwgdGhlbiByZWRyYXcgcGljayBidWZmZXJzXG4gICAgaWYocGlja0RpcnR5KSB7XG4gICAgICBwaWNrRGlydHkgPSBmYWxzZVxuICAgICAgcmVuZGVyUGljaygpXG4gICAgfVxuXG4gICAgLy9SZWNhbGN1bGF0ZSBwaXhlbCBkYXRhXG4gICAgc2NlbmUuYXhlc1BpeGVscyA9IGF4ZXNSYW5nZXMoc2NlbmUuYXhlcywgY2FtZXJhUGFyYW1zLCB3aWR0aCwgaGVpZ2h0KVxuXG4gICAgLy9DYWxsIHJlbmRlciBjYWxsYmFja1xuICAgIGlmKHNjZW5lLm9ucmVuZGVyKSB7XG4gICAgICBzY2VuZS5vbnJlbmRlcigpXG4gICAgfVxuXG4gICAgLy9SZWFkIHZhbHVlXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICAgIGdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpXG5cbiAgICAvL0dlbmVyYWwgc3RyYXRlZ3k6IDMgc3RlcHNcbiAgICAvLyAgMS4gcmVuZGVyIG5vbi10cmFuc3BhcmVudCBvYmplY3RzXG4gICAgLy8gIDIuIGFjY3VtdWxhdGUgdHJhbnNwYXJlbnQgb2JqZWN0cyBpbnRvIHNlcGFyYXRlIGZib1xuICAgIC8vICAzLiBjb21wb3NpdGUgZmluYWwgc2NlbmVcblxuICAgIC8vQ2xlYXIgRkJPXG4gICAgc2NlbmUuY2xlYXJSR0JBKClcblxuICAgIGdsLmRlcHRoTWFzayh0cnVlKVxuICAgIGdsLmNvbG9yTWFzayh0cnVlLCB0cnVlLCB0cnVlLCB0cnVlKVxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKVxuICAgIGdsLmRlcHRoRnVuYyhnbC5MRVFVQUwpXG4gICAgZ2wuZGlzYWJsZShnbC5CTEVORClcbiAgICBnbC5kaXNhYmxlKGdsLkNVTExfRkFDRSkgIC8vbW9zdCB2aXN1YWxpemF0aW9uIHN1cmZhY2VzIGFyZSAyIHNpZGVkXG5cbiAgICAvL1JlbmRlciBvcGFxdWUgcGFzc1xuICAgIHZhciBoYXNUcmFuc3BhcmVudCA9IGZhbHNlXG4gICAgaWYoYXhlcy5lbmFibGUpIHtcbiAgICAgIGhhc1RyYW5zcGFyZW50ID0gaGFzVHJhbnNwYXJlbnQgfHwgYXhlcy5pc1RyYW5zcGFyZW50KClcbiAgICAgIGF4ZXMuZHJhdyhjYW1lcmFQYXJhbXMpXG4gICAgfVxuICAgIHNwaWtlcy5heGVzID0gYXhlc1xuICAgIGlmKHNlbGVjdGlvbi5vYmplY3QpIHtcbiAgICAgIHNwaWtlcy5kcmF3KGNhbWVyYVBhcmFtcylcbiAgICB9XG5cbiAgICBnbC5kaXNhYmxlKGdsLkNVTExfRkFDRSkgIC8vbW9zdCB2aXN1YWxpemF0aW9uIHN1cmZhY2VzIGFyZSAyIHNpZGVkXG5cbiAgICBmb3IodmFyIGk9MDsgaTxudW1PYmpzOyArK2kpIHtcbiAgICAgIHZhciBvYmogPSBvYmplY3RzW2ldXG4gICAgICBvYmouYXhlcyA9IGF4ZXNcbiAgICAgIG9iai5waXhlbFJhdGlvID0gc2NlbmUucGl4ZWxSYXRpb1xuICAgICAgaWYob2JqLmlzT3BhcXVlICYmIG9iai5pc09wYXF1ZSgpKSB7XG4gICAgICAgIG9iai5kcmF3KGNhbWVyYVBhcmFtcylcbiAgICAgIH1cbiAgICAgIGlmKG9iai5pc1RyYW5zcGFyZW50ICYmIG9iai5pc1RyYW5zcGFyZW50KCkpIHtcbiAgICAgICAgaGFzVHJhbnNwYXJlbnQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoaGFzVHJhbnNwYXJlbnQpIHtcbiAgICAgIC8vUmVuZGVyIHRyYW5zcGFyZW50IHBhc3NcbiAgICAgIGFjY3VtQnVmZmVyLnNoYXBlID0gdmlld1NoYXBlXG4gICAgICBhY2N1bUJ1ZmZlci5iaW5kKClcbiAgICAgIGdsLmNsZWFyKGdsLkRFUFRIX0JVRkZFUl9CSVQpXG4gICAgICBnbC5jb2xvck1hc2soZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UpXG4gICAgICBnbC5kZXB0aE1hc2sodHJ1ZSlcbiAgICAgIGdsLmRlcHRoRnVuYyhnbC5MRVNTKVxuXG4gICAgICAvL1JlbmRlciBmb3J3YXJkIGZhY2luZyBvYmplY3RzXG4gICAgICBpZihheGVzLmVuYWJsZSAmJiBheGVzLmlzVHJhbnNwYXJlbnQoKSkge1xuICAgICAgICBheGVzLmRyYXdUcmFuc3BhcmVudChjYW1lcmFQYXJhbXMpXG4gICAgICB9XG4gICAgICBmb3IodmFyIGk9MDsgaTxudW1PYmpzOyArK2kpIHtcbiAgICAgICAgdmFyIG9iaiA9IG9iamVjdHNbaV1cbiAgICAgICAgaWYob2JqLmlzT3BhcXVlICYmIG9iai5pc09wYXF1ZSgpKSB7XG4gICAgICAgICAgb2JqLmRyYXcoY2FtZXJhUGFyYW1zKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vUmVuZGVyIHRyYW5zcGFyZW50IHBhc3NcbiAgICAgIGdsLmVuYWJsZShnbC5CTEVORClcbiAgICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpXG4gICAgICBnbC5ibGVuZEZ1bmMoZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKVxuICAgICAgZ2wuY29sb3JNYXNrKHRydWUsIHRydWUsIHRydWUsIHRydWUpXG4gICAgICBnbC5kZXB0aE1hc2soZmFsc2UpXG4gICAgICBnbC5jbGVhckNvbG9yKDAsMCwwLDApXG4gICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKVxuXG4gICAgICBpZihheGVzLmlzVHJhbnNwYXJlbnQoKSkge1xuICAgICAgICBheGVzLmRyYXdUcmFuc3BhcmVudChjYW1lcmFQYXJhbXMpXG4gICAgICB9XG5cbiAgICAgIGZvcih2YXIgaT0wOyBpPG51bU9ianM7ICsraSkge1xuICAgICAgICB2YXIgb2JqID0gb2JqZWN0c1tpXVxuICAgICAgICBpZihvYmouaXNUcmFuc3BhcmVudCAmJiBvYmouaXNUcmFuc3BhcmVudCgpKSB7XG4gICAgICAgICAgb2JqLmRyYXdUcmFuc3BhcmVudChjYW1lcmFQYXJhbXMpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy9VbmJpbmQgZnJhbWVidWZmZXJcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbClcblxuICAgICAgLy9EcmF3IGNvbXBvc2l0ZSBwYXNzXG4gICAgICBnbC5ibGVuZEZ1bmMoZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKVxuICAgICAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKVxuICAgICAgYWNjdW1TaGFkZXIuYmluZCgpXG4gICAgICBhY2N1bUJ1ZmZlci5jb2xvclswXS5iaW5kKDApXG4gICAgICBhY2N1bVNoYWRlci51bmlmb3Jtcy5hY2N1bUJ1ZmZlciA9IDBcbiAgICAgIGRyYXdUcmlhbmdsZShnbClcblxuICAgICAgLy9UdXJuIG9mZiBibGVuZGluZ1xuICAgICAgZ2wuZGlzYWJsZShnbC5CTEVORClcbiAgICB9XG5cbiAgICAvL0NsZWFyIGRpcnR5IGZsYWdzXG4gICAgZGlydHkgPSBmYWxzZVxuICAgIGZvcih2YXIgaT0wOyBpPG51bU9ianM7ICsraSkge1xuICAgICAgb2JqZWN0c1tpXS5kaXJ0eSA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgLy9EcmF3IHRoZSB3aG9sZSBzY2VuZVxuICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgaWYoc2NlbmUuX3N0b3BwZWQgfHwgc2NlbmUuY29udGV4dExvc3QpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyB0aGlzIG9yZGVyIGlzIGltcG9ydGFudDogaW9zIHNhZmFyaSBzb21ldGltZXMgaGFzIHN5bmMgcmFmXG4gICAgcmVkcmF3KClcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxuICB9XG5cbiAgc2NlbmUuZW5hYmxlTW91c2VMaXN0ZW5lcnMoKVxuICByZW5kZXIoKVxuXG4gIC8vRm9yY2UgcmVkcmF3IG9mIHdob2xlIHNjZW5lXG4gIHNjZW5lLnJlZHJhdyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmKHNjZW5lLl9zdG9wcGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZGlydHkgPSB0cnVlXG4gICAgcmVkcmF3KClcbiAgfVxuXG4gIHJldHVybiBzY2VuZVxufVxuXG5mdW5jdGlvbiBjYWxjQ2FtZXJhUGFyYW1zKHNjZW5lLCBpc09ydGhvKSB7XG4gIHZhciBib3VuZHMgPSBzY2VuZS5ib3VuZHNcbiAgdmFyIGNhbWVyYVBhcmFtcyA9IHNjZW5lLmNhbWVyYVBhcmFtc1xuICB2YXIgcHJvamVjdGlvbiA9IGNhbWVyYVBhcmFtcy5wcm9qZWN0aW9uXG4gIHZhciBtb2RlbCA9IGNhbWVyYVBhcmFtcy5tb2RlbFxuXG4gIHZhciB3aWR0aCA9IHNjZW5lLmdsLmRyYXdpbmdCdWZmZXJXaWR0aFxuICB2YXIgaGVpZ2h0ID0gc2NlbmUuZ2wuZHJhd2luZ0J1ZmZlckhlaWdodFxuICB2YXIgek5lYXIgPSBzY2VuZS56TmVhclxuICB2YXIgekZhciA9IHNjZW5lLnpGYXJcbiAgdmFyIGZvdnkgPSBzY2VuZS5mb3Z5XG5cbiAgdmFyIHIgPSB3aWR0aCAvIGhlaWdodFxuXG4gIGlmKGlzT3J0aG8pIHtcbiAgICBvcnRobyhwcm9qZWN0aW9uLFxuICAgICAgLXIsXG4gICAgICByLFxuICAgICAgLTEsXG4gICAgICAxLFxuICAgICAgek5lYXIsXG4gICAgICB6RmFyXG4gICAgKVxuICAgIGNhbWVyYVBhcmFtcy5fb3J0aG8gPSB0cnVlXG4gIH0gZWxzZSB7XG4gICAgcGVyc3BlY3RpdmUocHJvamVjdGlvbixcbiAgICAgIGZvdnksXG4gICAgICByLFxuICAgICAgek5lYXIsXG4gICAgICB6RmFyXG4gICAgKVxuICAgIGNhbWVyYVBhcmFtcy5fb3J0aG8gPSBmYWxzZVxuICB9XG5cbiAgLy9Db21wdXRlIG1vZGVsIG1hdHJpeFxuICBmb3IodmFyIGk9MDsgaTwxNjsgKytpKSB7XG4gICAgbW9kZWxbaV0gPSAwXG4gIH1cbiAgbW9kZWxbMTVdID0gMVxuXG4gIHZhciBtYXhTID0gMFxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICBtYXhTID0gTWF0aC5tYXgobWF4UywgYm91bmRzWzFdW2ldIC0gYm91bmRzWzBdW2ldKVxuICB9XG5cbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgaWYoc2NlbmUuYXV0b1NjYWxlKSB7XG4gICAgICBtb2RlbFs1KmldID0gc2NlbmUuYXNwZWN0W2ldIC8gKGJvdW5kc1sxXVtpXSAtIGJvdW5kc1swXVtpXSlcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kZWxbNSppXSA9IDEgLyBtYXhTXG4gICAgfVxuICAgIGlmKHNjZW5lLmF1dG9DZW50ZXIpIHtcbiAgICAgIG1vZGVsWzEyK2ldID0gLW1vZGVsWzUqaV0gKiAwLjUgKiAoYm91bmRzWzBdW2ldICsgYm91bmRzWzFdW2ldKVxuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzbGVycFxuXG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5mdW5jdGlvbiBzbGVycCAob3V0LCBhLCBiLCB0KSB7XG4gIC8vIGJlbmNobWFya3M6XG4gIC8vICAgIGh0dHA6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tc2xlcnAtaW1wbGVtZW50YXRpb25zXG5cbiAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICBieCA9IGJbMF0sIGJ5ID0gYlsxXSwgYnogPSBiWzJdLCBidyA9IGJbM11cblxuICB2YXIgb21lZ2EsIGNvc29tLCBzaW5vbSwgc2NhbGUwLCBzY2FsZTFcblxuICAvLyBjYWxjIGNvc2luZVxuICBjb3NvbSA9IGF4ICogYnggKyBheSAqIGJ5ICsgYXogKiBieiArIGF3ICogYndcbiAgLy8gYWRqdXN0IHNpZ25zIChpZiBuZWNlc3NhcnkpXG4gIGlmIChjb3NvbSA8IDAuMCkge1xuICAgIGNvc29tID0gLWNvc29tXG4gICAgYnggPSAtYnhcbiAgICBieSA9IC1ieVxuICAgIGJ6ID0gLWJ6XG4gICAgYncgPSAtYndcbiAgfVxuICAvLyBjYWxjdWxhdGUgY29lZmZpY2llbnRzXG4gIGlmICgoMS4wIC0gY29zb20pID4gMC4wMDAwMDEpIHtcbiAgICAvLyBzdGFuZGFyZCBjYXNlIChzbGVycClcbiAgICBvbWVnYSA9IE1hdGguYWNvcyhjb3NvbSlcbiAgICBzaW5vbSA9IE1hdGguc2luKG9tZWdhKVxuICAgIHNjYWxlMCA9IE1hdGguc2luKCgxLjAgLSB0KSAqIG9tZWdhKSAvIHNpbm9tXG4gICAgc2NhbGUxID0gTWF0aC5zaW4odCAqIG9tZWdhKSAvIHNpbm9tXG4gIH0gZWxzZSB7XG4gICAgLy8gXCJmcm9tXCIgYW5kIFwidG9cIiBxdWF0ZXJuaW9ucyBhcmUgdmVyeSBjbG9zZVxuICAgIC8vICAuLi4gc28gd2UgY2FuIGRvIGEgbGluZWFyIGludGVycG9sYXRpb25cbiAgICBzY2FsZTAgPSAxLjAgLSB0XG4gICAgc2NhbGUxID0gdFxuICB9XG4gIC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcbiAgb3V0WzBdID0gc2NhbGUwICogYXggKyBzY2FsZTEgKiBieFxuICBvdXRbMV0gPSBzY2FsZTAgKiBheSArIHNjYWxlMSAqIGJ5XG4gIG91dFsyXSA9IHNjYWxlMCAqIGF6ICsgc2NhbGUxICogYnpcbiAgb3V0WzNdID0gc2NhbGUwICogYXcgKyBzY2FsZTEgKiBid1xuXG4gIHJldHVybiBvdXRcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZ2xzbGlmeSAgICAgID0gcmVxdWlyZSgnZ2xzbGlmeScpXG52YXIgY3JlYXRlU2hhZGVyID0gcmVxdWlyZSgnZ2wtc2hhZGVyJylcblxudmFyIHZlcnRTcmMgPSBnbHNsaWZ5KCcuL3ZlcnRleC5nbHNsJylcbnZhciBmcmFnU3JjID0gZ2xzbGlmeSgnLi9mcmFnbWVudC5nbHNsJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihnbCkge1xuICByZXR1cm4gY3JlYXRlU2hhZGVyKGdsLCB2ZXJ0U3JjLCBmcmFnU3JjLCBudWxsLCBbXG4gICAge25hbWU6ICdwb3NpdGlvbicsIHR5cGU6ICd2ZWMzJ30sXG4gICAge25hbWU6ICdjb2xvcicsIHR5cGU6ICd2ZWMzJ30sXG4gICAge25hbWU6ICd3ZWlnaHQnLCB0eXBlOiAnZmxvYXQnfVxuICBdKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBjcmVhdGVCdWZmZXIgPSByZXF1aXJlKCdnbC1idWZmZXInKVxudmFyIGNyZWF0ZVZBTyA9IHJlcXVpcmUoJ2dsLXZhbycpXG52YXIgY3JlYXRlU2hhZGVyID0gcmVxdWlyZSgnLi9zaGFkZXJzL2luZGV4JylcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTcGlrZXNcblxudmFyIGlkZW50aXR5ID0gWzEsMCwwLDAsXG4gICAgICAgICAgICAgICAgMCwxLDAsMCxcbiAgICAgICAgICAgICAgICAwLDAsMSwwLFxuICAgICAgICAgICAgICAgIDAsMCwwLDFdXG5cbmZ1bmN0aW9uIEF4aXNTcGlrZXMoZ2wsIGJ1ZmZlciwgdmFvLCBzaGFkZXIpIHtcbiAgdGhpcy5nbCAgICAgICAgID0gZ2xcbiAgdGhpcy5idWZmZXIgICAgID0gYnVmZmVyXG4gIHRoaXMudmFvICAgICAgICA9IHZhb1xuICB0aGlzLnNoYWRlciAgICAgPSBzaGFkZXJcbiAgdGhpcy5waXhlbFJhdGlvID0gMVxuICB0aGlzLmJvdW5kcyAgICAgPSBbWy0xMDAwLC0xMDAwLC0xMDAwXSwgWzEwMDAsMTAwMCwxMDAwXV1cbiAgdGhpcy5wb3NpdGlvbiAgID0gWzAsMCwwXVxuICB0aGlzLmxpbmVXaWR0aCAgPSBbMiwyLDJdXG4gIHRoaXMuY29sb3JzICAgICA9IFtbMCwwLDAsMV0sIFswLDAsMCwxXSwgWzAsMCwwLDFdXVxuICB0aGlzLmVuYWJsZWQgICAgPSBbdHJ1ZSx0cnVlLHRydWVdXG4gIHRoaXMuZHJhd1NpZGVzICA9IFt0cnVlLHRydWUsdHJ1ZV1cbiAgdGhpcy5heGVzICAgICAgID0gbnVsbFxufVxuXG52YXIgcHJvdG8gPSBBeGlzU3Bpa2VzLnByb3RvdHlwZVxuXG52YXIgT1VURVJfRkFDRSA9IFswLDAsMF1cbnZhciBJTk5FUl9GQUNFID0gWzAsMCwwXVxuXG52YXIgU0hBUEUgPSBbMCwwXVxuXG5wcm90by5pc1RyYW5zcGFyZW50ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZVxufVxuXG5wcm90by5kcmF3VHJhbnNwYXJlbnQgPSBmdW5jdGlvbihjYW1lcmEpIHt9XG5cbnByb3RvLmRyYXcgPSBmdW5jdGlvbihjYW1lcmEpIHtcbiAgdmFyIGdsID0gdGhpcy5nbFxuICB2YXIgdmFvID0gdGhpcy52YW9cbiAgdmFyIHNoYWRlciA9IHRoaXMuc2hhZGVyXG5cbiAgdmFvLmJpbmQoKVxuICBzaGFkZXIuYmluZCgpXG5cbiAgdmFyIG1vZGVsICAgICAgPSBjYW1lcmEubW9kZWwgfHwgaWRlbnRpdHlcbiAgdmFyIHZpZXcgICAgICAgPSBjYW1lcmEudmlldyB8fCBpZGVudGl0eVxuICB2YXIgcHJvamVjdGlvbiA9IGNhbWVyYS5wcm9qZWN0aW9uIHx8IGlkZW50aXR5XG5cbiAgdmFyIGF4aXNcbiAgaWYodGhpcy5heGVzKSB7XG4gICAgYXhpcyA9IHRoaXMuYXhlcy5sYXN0Q3ViZVByb3BzLmF4aXNcbiAgfVxuXG4gIHZhciBvdXRlckZhY2UgPSBPVVRFUl9GQUNFXG4gIHZhciBpbm5lckZhY2UgPSBJTk5FUl9GQUNFXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIGlmKGF4aXMgJiYgYXhpc1tpXSA8IDApIHtcbiAgICAgIG91dGVyRmFjZVtpXSA9IHRoaXMuYm91bmRzWzBdW2ldXG4gICAgICBpbm5lckZhY2VbaV0gPSB0aGlzLmJvdW5kc1sxXVtpXVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRlckZhY2VbaV0gPSB0aGlzLmJvdW5kc1sxXVtpXVxuICAgICAgaW5uZXJGYWNlW2ldID0gdGhpcy5ib3VuZHNbMF1baV1cbiAgICB9XG4gIH1cblxuICBTSEFQRVswXSA9IGdsLmRyYXdpbmdCdWZmZXJXaWR0aFxuICBTSEFQRVsxXSA9IGdsLmRyYXdpbmdCdWZmZXJIZWlnaHRcblxuICBzaGFkZXIudW5pZm9ybXMubW9kZWwgICAgICAgPSBtb2RlbFxuICBzaGFkZXIudW5pZm9ybXMudmlldyAgICAgICAgPSB2aWV3XG4gIHNoYWRlci51bmlmb3Jtcy5wcm9qZWN0aW9uICA9IHByb2plY3Rpb25cbiAgc2hhZGVyLnVuaWZvcm1zLmNvb3JkaW5hdGVzID0gW3RoaXMucG9zaXRpb24sIG91dGVyRmFjZSwgaW5uZXJGYWNlXVxuICBzaGFkZXIudW5pZm9ybXMuY29sb3JzICAgICAgPSB0aGlzLmNvbG9yc1xuICBzaGFkZXIudW5pZm9ybXMuc2NyZWVuU2hhcGUgPSBTSEFQRVxuXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIHNoYWRlci51bmlmb3Jtcy5saW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aFtpXSAqIHRoaXMucGl4ZWxSYXRpb1xuICAgIGlmKHRoaXMuZW5hYmxlZFtpXSkge1xuICAgICAgdmFvLmRyYXcoZ2wuVFJJQU5HTEVTLCA2LCA2KmkpXG4gICAgICBpZih0aGlzLmRyYXdTaWRlc1tpXSkge1xuICAgICAgICB2YW8uZHJhdyhnbC5UUklBTkdMRVMsIDEyLCAxOCsxMippKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhby51bmJpbmQoKVxufVxuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGlmKCFvcHRpb25zKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYoXCJib3VuZHNcIiBpbiBvcHRpb25zKSB7XG4gICAgdGhpcy5ib3VuZHMgPSBvcHRpb25zLmJvdW5kc1xuICB9XG4gIGlmKFwicG9zaXRpb25cIiBpbiBvcHRpb25zKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG9wdGlvbnMucG9zaXRpb25cbiAgfVxuICBpZihcImxpbmVXaWR0aFwiIGluIG9wdGlvbnMpIHtcbiAgICB0aGlzLmxpbmVXaWR0aCA9IG9wdGlvbnMubGluZVdpZHRoXG4gIH1cbiAgaWYoXCJjb2xvcnNcIiBpbiBvcHRpb25zKSB7XG4gICAgdGhpcy5jb2xvcnMgPSBvcHRpb25zLmNvbG9yc1xuICB9XG4gIGlmKFwiZW5hYmxlZFwiIGluIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBvcHRpb25zLmVuYWJsZWRcbiAgfVxuICBpZihcImRyYXdTaWRlc1wiIGluIG9wdGlvbnMpIHtcbiAgICB0aGlzLmRyYXdTaWRlcyA9IG9wdGlvbnMuZHJhd1NpZGVzXG4gIH1cbn1cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZhby5kaXNwb3NlKClcbiAgdGhpcy5idWZmZXIuZGlzcG9zZSgpXG4gIHRoaXMuc2hhZGVyLmRpc3Bvc2UoKVxufVxuXG5cblxuZnVuY3Rpb24gY3JlYXRlU3Bpa2VzKGdsLCBvcHRpb25zKSB7XG4gIC8vQ3JlYXRlIGJ1ZmZlcnNcbiAgdmFyIGRhdGEgPSBbIF1cblxuICBmdW5jdGlvbiBsaW5lKHgseSx6LGksbCxoKSB7XG4gICAgdmFyIHJvdyA9IFt4LHkseiwgIDAsMCwwLCAgMV1cbiAgICByb3dbaSszXSA9IDFcbiAgICByb3dbaV0gPSBsXG4gICAgZGF0YS5wdXNoLmFwcGx5KGRhdGEsIHJvdylcbiAgICByb3dbNl0gPSAtMVxuICAgIGRhdGEucHVzaC5hcHBseShkYXRhLCByb3cpXG4gICAgcm93W2ldID0gaFxuICAgIGRhdGEucHVzaC5hcHBseShkYXRhLCByb3cpXG4gICAgZGF0YS5wdXNoLmFwcGx5KGRhdGEsIHJvdylcbiAgICByb3dbNl0gPSAxXG4gICAgZGF0YS5wdXNoLmFwcGx5KGRhdGEsIHJvdylcbiAgICByb3dbaV0gPSBsXG4gICAgZGF0YS5wdXNoLmFwcGx5KGRhdGEsIHJvdylcbiAgfVxuXG4gIGxpbmUoMCwwLDAsIDAsIDAsIDEpXG4gIGxpbmUoMCwwLDAsIDEsIDAsIDEpXG4gIGxpbmUoMCwwLDAsIDIsIDAsIDEpXG5cbiAgbGluZSgxLDAsMCwgIDEsICAtMSwxKVxuICBsaW5lKDEsMCwwLCAgMiwgIC0xLDEpXG5cbiAgbGluZSgwLDEsMCwgIDAsICAtMSwxKVxuICBsaW5lKDAsMSwwLCAgMiwgIC0xLDEpXG5cbiAgbGluZSgwLDAsMSwgIDAsICAtMSwxKVxuICBsaW5lKDAsMCwxLCAgMSwgIC0xLDEpXG5cbiAgdmFyIGJ1ZmZlciA9IGNyZWF0ZUJ1ZmZlcihnbCwgZGF0YSlcbiAgdmFyIHZhbyA9IGNyZWF0ZVZBTyhnbCwgW3tcbiAgICB0eXBlOiBnbC5GTE9BVCxcbiAgICBidWZmZXI6IGJ1ZmZlcixcbiAgICBzaXplOiAzLFxuICAgIG9mZnNldDogMCxcbiAgICBzdHJpZGU6IDI4XG4gIH0sIHtcbiAgICB0eXBlOiBnbC5GTE9BVCxcbiAgICBidWZmZXI6IGJ1ZmZlcixcbiAgICBzaXplOiAzLFxuICAgIG9mZnNldDogMTIsXG4gICAgc3RyaWRlOiAyOFxuICB9LCB7XG4gICAgdHlwZTogZ2wuRkxPQVQsXG4gICAgYnVmZmVyOiBidWZmZXIsXG4gICAgc2l6ZTogMSxcbiAgICBvZmZzZXQ6IDI0LFxuICAgIHN0cmlkZTogMjhcbiAgfV0pXG5cbiAgLy9DcmVhdGUgc2hhZGVyXG4gIHZhciBzaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wpXG4gIHNoYWRlci5hdHRyaWJ1dGVzLnBvc2l0aW9uLmxvY2F0aW9uID0gMFxuICBzaGFkZXIuYXR0cmlidXRlcy5jb2xvci5sb2NhdGlvbiA9IDFcbiAgc2hhZGVyLmF0dHJpYnV0ZXMud2VpZ2h0LmxvY2F0aW9uID0gMlxuXG4gIC8vQ3JlYXRlIHNwaWtlIG9iamVjdFxuICB2YXIgc3Bpa2VzID0gbmV3IEF4aXNTcGlrZXMoZ2wsIGJ1ZmZlciwgdmFvLCBzaGFkZXIpXG5cbiAgLy9TZXQgcGFyYW1ldGVyc1xuICBzcGlrZXMudXBkYXRlKG9wdGlvbnMpXG5cbiAgLy9SZXR1cm4gcmVzdWx0aW5nIG9iamVjdFxuICByZXR1cm4gc3Bpa2VzXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBkb0JpbmQoZ2wsIGVsZW1lbnRzLCBhdHRyaWJ1dGVzKSB7XG4gIGlmKGVsZW1lbnRzKSB7XG4gICAgZWxlbWVudHMuYmluZCgpXG4gIH0gZWxzZSB7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbnVsbClcbiAgfVxuICB2YXIgbmF0dHJpYnMgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1ZFUlRFWF9BVFRSSUJTKXwwXG4gIGlmKGF0dHJpYnV0ZXMpIHtcbiAgICBpZihhdHRyaWJ1dGVzLmxlbmd0aCA+IG5hdHRyaWJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbC12YW86IFRvbyBtYW55IHZlcnRleCBhdHRyaWJ1dGVzXCIpXG4gICAgfVxuICAgIGZvcih2YXIgaT0wOyBpPGF0dHJpYnV0ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBhdHRyaWIgPSBhdHRyaWJ1dGVzW2ldXG4gICAgICBpZihhdHRyaWIuYnVmZmVyKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBhdHRyaWIuYnVmZmVyXG4gICAgICAgIHZhciBzaXplID0gYXR0cmliLnNpemUgfHwgNFxuICAgICAgICB2YXIgdHlwZSA9IGF0dHJpYi50eXBlIHx8IGdsLkZMT0FUXG4gICAgICAgIHZhciBub3JtYWxpemVkID0gISFhdHRyaWIubm9ybWFsaXplZFxuICAgICAgICB2YXIgc3RyaWRlID0gYXR0cmliLnN0cmlkZSB8fCAwXG4gICAgICAgIHZhciBvZmZzZXQgPSBhdHRyaWIub2Zmc2V0IHx8IDBcbiAgICAgICAgYnVmZmVyLmJpbmQoKVxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGksIHNpemUsIHR5cGUsIG5vcm1hbGl6ZWQsIHN0cmlkZSwgb2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYodHlwZW9mIGF0dHJpYiA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIGdsLnZlcnRleEF0dHJpYjFmKGksIGF0dHJpYilcbiAgICAgICAgfSBlbHNlIGlmKGF0dHJpYi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWIxZihpLCBhdHRyaWJbMF0pXG4gICAgICAgIH0gZWxzZSBpZihhdHRyaWIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliMmYoaSwgYXR0cmliWzBdLCBhdHRyaWJbMV0pXG4gICAgICAgIH0gZWxzZSBpZihhdHRyaWIubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliM2YoaSwgYXR0cmliWzBdLCBhdHRyaWJbMV0sIGF0dHJpYlsyXSlcbiAgICAgICAgfSBlbHNlIGlmKGF0dHJpYi5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWI0ZihpLCBhdHRyaWJbMF0sIGF0dHJpYlsxXSwgYXR0cmliWzJdLCBhdHRyaWJbM10pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtdmFvOiBJbnZhbGlkIHZlcnRleCBhdHRyaWJ1dGVcIilcbiAgICAgICAgfVxuICAgICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yKDsgaTxuYXR0cmliczsgKytpKSB7XG4gICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpXG4gICAgZm9yKHZhciBpPTA7IGk8bmF0dHJpYnM7ICsraSkge1xuICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9CaW5kIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGJpbmRBdHRyaWJzID0gcmVxdWlyZShcIi4vZG8tYmluZC5qc1wiKVxuXG5mdW5jdGlvbiBWQU9FbXVsYXRlZChnbCkge1xuICB0aGlzLmdsID0gZ2xcbiAgdGhpcy5fZWxlbWVudHMgPSBudWxsXG4gIHRoaXMuX2F0dHJpYnV0ZXMgPSBudWxsXG4gIHRoaXMuX2VsZW1lbnRzVHlwZSA9IGdsLlVOU0lHTkVEX1NIT1JUXG59XG5cblZBT0VtdWxhdGVkLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIGJpbmRBdHRyaWJzKHRoaXMuZ2wsIHRoaXMuX2VsZW1lbnRzLCB0aGlzLl9hdHRyaWJ1dGVzKVxufVxuXG5WQU9FbXVsYXRlZC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oYXR0cmlidXRlcywgZWxlbWVudHMsIGVsZW1lbnRzVHlwZSkge1xuICB0aGlzLl9lbGVtZW50cyA9IGVsZW1lbnRzXG4gIHRoaXMuX2F0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzXG4gIHRoaXMuX2VsZW1lbnRzVHlwZSA9IGVsZW1lbnRzVHlwZSB8fCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JUXG59XG5cblZBT0VtdWxhdGVkLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKSB7IH1cblZBT0VtdWxhdGVkLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbigpIHsgfVxuXG5WQU9FbXVsYXRlZC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKG1vZGUsIGNvdW50LCBvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDBcbiAgdmFyIGdsID0gdGhpcy5nbFxuICBpZih0aGlzLl9lbGVtZW50cykge1xuICAgIGdsLmRyYXdFbGVtZW50cyhtb2RlLCBjb3VudCwgdGhpcy5fZWxlbWVudHNUeXBlLCBvZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgZ2wuZHJhd0FycmF5cyhtb2RlLCBvZmZzZXQsIGNvdW50KVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVZBT0VtdWxhdGVkKGdsKSB7XG4gIHJldHVybiBuZXcgVkFPRW11bGF0ZWQoZ2wpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVkFPRW11bGF0ZWQiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgYmluZEF0dHJpYnMgPSByZXF1aXJlKFwiLi9kby1iaW5kLmpzXCIpXG5cbmZ1bmN0aW9uIFZlcnRleEF0dHJpYnV0ZShsb2NhdGlvbiwgZGltZW5zaW9uLCBhLCBiLCBjLCBkKSB7XG4gIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvblxuICB0aGlzLmRpbWVuc2lvbiA9IGRpbWVuc2lvblxuICB0aGlzLmEgPSBhXG4gIHRoaXMuYiA9IGJcbiAgdGhpcy5jID0gY1xuICB0aGlzLmQgPSBkXG59XG5cblZlcnRleEF0dHJpYnV0ZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKGdsKSB7XG4gIHN3aXRjaCh0aGlzLmRpbWVuc2lvbikge1xuICAgIGNhc2UgMTpcbiAgICAgIGdsLnZlcnRleEF0dHJpYjFmKHRoaXMubG9jYXRpb24sIHRoaXMuYSlcbiAgICBicmVha1xuICAgIGNhc2UgMjpcbiAgICAgIGdsLnZlcnRleEF0dHJpYjJmKHRoaXMubG9jYXRpb24sIHRoaXMuYSwgdGhpcy5iKVxuICAgIGJyZWFrXG4gICAgY2FzZSAzOlxuICAgICAgZ2wudmVydGV4QXR0cmliM2YodGhpcy5sb2NhdGlvbiwgdGhpcy5hLCB0aGlzLmIsIHRoaXMuYylcbiAgICBicmVha1xuICAgIGNhc2UgNDpcbiAgICAgIGdsLnZlcnRleEF0dHJpYjRmKHRoaXMubG9jYXRpb24sIHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMsIHRoaXMuZClcbiAgICBicmVha1xuICB9XG59XG5cbmZ1bmN0aW9uIFZBT05hdGl2ZShnbCwgZXh0LCBoYW5kbGUpIHtcbiAgdGhpcy5nbCA9IGdsXG4gIHRoaXMuX2V4dCA9IGV4dFxuICB0aGlzLmhhbmRsZSA9IGhhbmRsZVxuICB0aGlzLl9hdHRyaWJzID0gW11cbiAgdGhpcy5fdXNlRWxlbWVudHMgPSBmYWxzZVxuICB0aGlzLl9lbGVtZW50c1R5cGUgPSBnbC5VTlNJR05FRF9TSE9SVFxufVxuXG5WQU9OYXRpdmUucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fZXh0LmJpbmRWZXJ0ZXhBcnJheU9FUyh0aGlzLmhhbmRsZSlcbiAgZm9yKHZhciBpPTA7IGk8dGhpcy5fYXR0cmlicy5sZW5ndGg7ICsraSkge1xuICAgIHRoaXMuX2F0dHJpYnNbaV0uYmluZCh0aGlzLmdsKVxuICB9XG59XG5cblZBT05hdGl2ZS5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2V4dC5iaW5kVmVydGV4QXJyYXlPRVMobnVsbClcbn1cblxuVkFPTmF0aXZlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2V4dC5kZWxldGVWZXJ0ZXhBcnJheU9FUyh0aGlzLmhhbmRsZSlcbn1cblxuVkFPTmF0aXZlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihhdHRyaWJ1dGVzLCBlbGVtZW50cywgZWxlbWVudHNUeXBlKSB7XG4gIHRoaXMuYmluZCgpXG4gIGJpbmRBdHRyaWJzKHRoaXMuZ2wsIGVsZW1lbnRzLCBhdHRyaWJ1dGVzKVxuICB0aGlzLnVuYmluZCgpXG4gIHRoaXMuX2F0dHJpYnMubGVuZ3RoID0gMFxuICBpZihhdHRyaWJ1dGVzKVxuICBmb3IodmFyIGk9MDsgaTxhdHRyaWJ1dGVzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGEgPSBhdHRyaWJ1dGVzW2ldXG4gICAgaWYodHlwZW9mIGEgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMuX2F0dHJpYnMucHVzaChuZXcgVmVydGV4QXR0cmlidXRlKGksIDEsIGEpKVxuICAgIH0gZWxzZSBpZihBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICB0aGlzLl9hdHRyaWJzLnB1c2gobmV3IFZlcnRleEF0dHJpYnV0ZShpLCBhLmxlbmd0aCwgYVswXSwgYVsxXSwgYVsyXSwgYVszXSkpXG4gICAgfVxuICB9XG4gIHRoaXMuX3VzZUVsZW1lbnRzID0gISFlbGVtZW50c1xuICB0aGlzLl9lbGVtZW50c1R5cGUgPSBlbGVtZW50c1R5cGUgfHwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVFxufVxuXG5WQU9OYXRpdmUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihtb2RlLCBjb3VudCwgb2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8fCAwXG4gIHZhciBnbCA9IHRoaXMuZ2xcbiAgaWYodGhpcy5fdXNlRWxlbWVudHMpIHtcbiAgICBnbC5kcmF3RWxlbWVudHMobW9kZSwgY291bnQsIHRoaXMuX2VsZW1lbnRzVHlwZSwgb2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGdsLmRyYXdBcnJheXMobW9kZSwgb2Zmc2V0LCBjb3VudClcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVWQU9OYXRpdmUoZ2wsIGV4dCkge1xuICByZXR1cm4gbmV3IFZBT05hdGl2ZShnbCwgZXh0LCBleHQuY3JlYXRlVmVydGV4QXJyYXlPRVMoKSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVWQU9OYXRpdmUiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgY3JlYXRlVkFPTmF0aXZlID0gcmVxdWlyZShcIi4vbGliL3Zhby1uYXRpdmUuanNcIilcbnZhciBjcmVhdGVWQU9FbXVsYXRlZCA9IHJlcXVpcmUoXCIuL2xpYi92YW8tZW11bGF0ZWQuanNcIilcblxuZnVuY3Rpb24gRXh0ZW5zaW9uU2hpbSAoZ2wpIHtcbiAgdGhpcy5iaW5kVmVydGV4QXJyYXlPRVMgPSBnbC5iaW5kVmVydGV4QXJyYXkuYmluZChnbClcbiAgdGhpcy5jcmVhdGVWZXJ0ZXhBcnJheU9FUyA9IGdsLmNyZWF0ZVZlcnRleEFycmF5LmJpbmQoZ2wpXG4gIHRoaXMuZGVsZXRlVmVydGV4QXJyYXlPRVMgPSBnbC5kZWxldGVWZXJ0ZXhBcnJheS5iaW5kKGdsKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVWQU8oZ2wsIGF0dHJpYnV0ZXMsIGVsZW1lbnRzLCBlbGVtZW50c1R5cGUpIHtcbiAgdmFyIGV4dCA9IGdsLmNyZWF0ZVZlcnRleEFycmF5XG4gICAgPyBuZXcgRXh0ZW5zaW9uU2hpbShnbClcbiAgICA6IGdsLmdldEV4dGVuc2lvbignT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnKVxuICB2YXIgdmFvXG5cbiAgaWYoZXh0KSB7XG4gICAgdmFvID0gY3JlYXRlVkFPTmF0aXZlKGdsLCBleHQpXG4gIH0gZWxzZSB7XG4gICAgdmFvID0gY3JlYXRlVkFPRW11bGF0ZWQoZ2wpXG4gIH1cbiAgdmFvLnVwZGF0ZShhdHRyaWJ1dGVzLCBlbGVtZW50cywgZWxlbWVudHNUeXBlKVxuICByZXR1cm4gdmFvXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVkFPXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNyb3NzO1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIGNyb3NzKG91dCwgYSwgYikge1xuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLFxuICAgICAgICBieCA9IGJbMF0sIGJ5ID0gYlsxXSwgYnogPSBiWzJdXG5cbiAgICBvdXRbMF0gPSBheSAqIGJ6IC0gYXogKiBieVxuICAgIG91dFsxXSA9IGF6ICogYnggLSBheCAqIGJ6XG4gICAgb3V0WzJdID0gYXggKiBieSAtIGF5ICogYnhcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBkb3Q7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG5mdW5jdGlvbiBkb3QoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl1cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5mdW5jdGlvbiBsZW5ndGgoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdXG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopXG59IiwibW9kdWxlLmV4cG9ydHMgPSBsZXJwO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdXG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheClcbiAgICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KVxuICAgIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplO1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdXG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeSArIHoqelxuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKVxuICAgICAgICBvdXRbMF0gPSBhWzBdICogbGVuXG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW5cbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIGxlblxuICAgIH1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1NYXQ0XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgbWF0NC5cbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQgKG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSwgdyA9IGFbM11cbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6ICsgbVsxMl0gKiB3XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdICogd1xuICBvdXRbMl0gPSBtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6ICsgbVsxNF0gKiB3XG4gIG91dFszXSA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XSAqIHdcbiAgcmV0dXJuIG91dFxufVxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGlzTW9iaWxlXHJcbm1vZHVsZS5leHBvcnRzLmlzTW9iaWxlID0gaXNNb2JpbGVcclxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGlzTW9iaWxlXHJcblxyXG52YXIgbW9iaWxlUkUgPSAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXNbNDZdMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyAoY2V8cGhvbmUpfHhkYXx4aWluby9pXHJcblxyXG52YXIgdGFibGV0UkUgPSAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXNbNDZdMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyAoY2V8cGhvbmUpfHhkYXx4aWlub3xhbmRyb2lkfGlwYWR8cGxheWJvb2t8c2lsay9pXHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZSAob3B0cykge1xyXG4gIGlmICghb3B0cykgb3B0cyA9IHt9XHJcbiAgdmFyIHVhID0gb3B0cy51YVxyXG4gIGlmICghdWEgJiYgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcpIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxyXG4gIGlmICh1YSAmJiB1YS5oZWFkZXJzICYmIHR5cGVvZiB1YS5oZWFkZXJzWyd1c2VyLWFnZW50J10gPT09ICdzdHJpbmcnKSB7XHJcbiAgICB1YSA9IHVhLmhlYWRlcnNbJ3VzZXItYWdlbnQnXVxyXG4gIH1cclxuICBpZiAodHlwZW9mIHVhICE9PSAnc3RyaW5nJykgcmV0dXJuIGZhbHNlXHJcblxyXG4gIHZhciByZXN1bHQgPSBvcHRzLnRhYmxldCA/IHRhYmxldFJFLnRlc3QodWEpIDogbW9iaWxlUkUudGVzdCh1YSlcclxuXHJcbiAgaWYgKFxyXG4gICAgIXJlc3VsdCAmJlxyXG4gICAgb3B0cy50YWJsZXQgJiZcclxuICAgIG9wdHMuZmVhdHVyZURldGVjdCAmJlxyXG4gICAgbmF2aWdhdG9yICYmXHJcbiAgICBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxICYmXHJcbiAgICB1YS5pbmRleE9mKCdNYWNpbnRvc2gnKSAhPT0gLTEgJiZcclxuICAgIHVhLmluZGV4T2YoJ1NhZmFyaScpICE9PSAtMVxyXG4gICkge1xyXG4gICAgcmVzdWx0ID0gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdFxyXG59XHJcbiIsImZ1bmN0aW9uIGxlcnAodjAsIHYxLCB0KSB7XG4gICAgcmV0dXJuIHYwKigxLXQpK3YxKnRcbn1cbm1vZHVsZS5leHBvcnRzID0gbGVycCIsIi8qanNoaW50IHVudXNlZDp0cnVlKi9cbi8qXG5JbnB1dDogIG1hdHJpeCAgICAgIDsgYSA0eDQgbWF0cml4XG5PdXRwdXQ6IHRyYW5zbGF0aW9uIDsgYSAzIGNvbXBvbmVudCB2ZWN0b3JcbiAgICAgICAgc2NhbGUgICAgICAgOyBhIDMgY29tcG9uZW50IHZlY3RvclxuICAgICAgICBza2V3ICAgICAgICA7IHNrZXcgZmFjdG9ycyBYWSxYWixZWiByZXByZXNlbnRlZCBhcyBhIDMgY29tcG9uZW50IHZlY3RvclxuICAgICAgICBwZXJzcGVjdGl2ZSA7IGEgNCBjb21wb25lbnQgdmVjdG9yXG4gICAgICAgIHF1YXRlcm5pb24gIDsgYSA0IGNvbXBvbmVudCB2ZWN0b3JcblJldHVybnMgZmFsc2UgaWYgdGhlIG1hdHJpeCBjYW5ub3QgYmUgZGVjb21wb3NlZCwgdHJ1ZSBpZiBpdCBjYW5cblxuXG5SZWZlcmVuY2VzOlxuaHR0cHM6Ly9naXRodWIuY29tL2thbWljYW5lL21hdHJpeDNkL2Jsb2IvbWFzdGVyL2xpYi9NYXRyaXgzZC5qc1xuaHR0cHM6Ly9naXRodWIuY29tL0Nocm9taXVtV2ViQXBwcy9jaHJvbWl1bS9ibG9iL21hc3Rlci91aS9nZngvdHJhbnNmb3JtX3V0aWwuY2Ncbmh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdHJhbnNmb3Jtcy8jZGVjb21wb3NpbmctYS0zZC1tYXRyaXhcbiovXG5cbnZhciBub3JtYWxpemUgPSByZXF1aXJlKCcuL25vcm1hbGl6ZScpXG5cbnZhciBjcmVhdGUgPSByZXF1aXJlKCdnbC1tYXQ0L2NyZWF0ZScpXG52YXIgY2xvbmUgPSByZXF1aXJlKCdnbC1tYXQ0L2Nsb25lJylcbnZhciBkZXRlcm1pbmFudCA9IHJlcXVpcmUoJ2dsLW1hdDQvZGV0ZXJtaW5hbnQnKVxudmFyIGludmVydCA9IHJlcXVpcmUoJ2dsLW1hdDQvaW52ZXJ0JylcbnZhciB0cmFuc3Bvc2UgPSByZXF1aXJlKCdnbC1tYXQ0L3RyYW5zcG9zZScpXG52YXIgdmVjMyA9IHtcbiAgICBsZW5ndGg6IHJlcXVpcmUoJ2dsLXZlYzMvbGVuZ3RoJyksXG4gICAgbm9ybWFsaXplOiByZXF1aXJlKCdnbC12ZWMzL25vcm1hbGl6ZScpLFxuICAgIGRvdDogcmVxdWlyZSgnZ2wtdmVjMy9kb3QnKSxcbiAgICBjcm9zczogcmVxdWlyZSgnZ2wtdmVjMy9jcm9zcycpXG59XG5cbnZhciB0bXAgPSBjcmVhdGUoKVxudmFyIHBlcnNwZWN0aXZlTWF0cml4ID0gY3JlYXRlKClcbnZhciB0bXBWZWM0ID0gWzAsIDAsIDAsIDBdXG52YXIgcm93ID0gWyBbMCwwLDBdLCBbMCwwLDBdLCBbMCwwLDBdIF1cbnZhciBwZHVtMyA9IFswLDAsMF1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWNvbXBvc2VNYXQ0KG1hdHJpeCwgdHJhbnNsYXRpb24sIHNjYWxlLCBza2V3LCBwZXJzcGVjdGl2ZSwgcXVhdGVybmlvbikge1xuICAgIGlmICghdHJhbnNsYXRpb24pIHRyYW5zbGF0aW9uID0gWzAsMCwwXVxuICAgIGlmICghc2NhbGUpIHNjYWxlID0gWzAsMCwwXVxuICAgIGlmICghc2tldykgc2tldyA9IFswLDAsMF1cbiAgICBpZiAoIXBlcnNwZWN0aXZlKSBwZXJzcGVjdGl2ZSA9IFswLDAsMCwxXVxuICAgIGlmICghcXVhdGVybmlvbikgcXVhdGVybmlvbiA9IFswLDAsMCwxXVxuXG4gICAgLy9ub3JtYWxpemUsIGlmIG5vdCBwb3NzaWJsZSB0aGVuIGJhaWwgb3V0IGVhcmx5XG4gICAgaWYgKCFub3JtYWxpemUodG1wLCBtYXRyaXgpKVxuICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgIC8vIHBlcnNwZWN0aXZlTWF0cml4IGlzIHVzZWQgdG8gc29sdmUgZm9yIHBlcnNwZWN0aXZlLCBidXQgaXQgYWxzbyBwcm92aWRlc1xuICAgIC8vIGFuIGVhc3kgd2F5IHRvIHRlc3QgZm9yIHNpbmd1bGFyaXR5IG9mIHRoZSB1cHBlciAzeDMgY29tcG9uZW50LlxuICAgIGNsb25lKHBlcnNwZWN0aXZlTWF0cml4LCB0bXApXG5cbiAgICBwZXJzcGVjdGl2ZU1hdHJpeFszXSA9IDBcbiAgICBwZXJzcGVjdGl2ZU1hdHJpeFs3XSA9IDBcbiAgICBwZXJzcGVjdGl2ZU1hdHJpeFsxMV0gPSAwXG4gICAgcGVyc3BlY3RpdmVNYXRyaXhbMTVdID0gMVxuXG4gICAgLy8gSWYgdGhlIHBlcnNwZWN0aXZlTWF0cml4IGlzIG5vdCBpbnZlcnRpYmxlLCB3ZSBhcmUgYWxzbyB1bmFibGUgdG9cbiAgICAvLyBkZWNvbXBvc2UsIHNvIHdlJ2xsIGJhaWwgZWFybHkuIENvbnN0YW50IHRha2VuIGZyb20gU2tNYXRyaXg0NDo6aW52ZXJ0LlxuICAgIGlmIChNYXRoLmFicyhkZXRlcm1pbmFudChwZXJzcGVjdGl2ZU1hdHJpeCkgPCAxZS04KSlcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICB2YXIgYTAzID0gdG1wWzNdLCBhMTMgPSB0bXBbN10sIGEyMyA9IHRtcFsxMV0sXG4gICAgICAgICAgICBhMzAgPSB0bXBbMTJdLCBhMzEgPSB0bXBbMTNdLCBhMzIgPSB0bXBbMTRdLCBhMzMgPSB0bXBbMTVdXG5cbiAgICAvLyBGaXJzdCwgaXNvbGF0ZSBwZXJzcGVjdGl2ZS5cbiAgICBpZiAoYTAzICE9PSAwIHx8IGExMyAhPT0gMCB8fCBhMjMgIT09IDApIHtcbiAgICAgICAgdG1wVmVjNFswXSA9IGEwM1xuICAgICAgICB0bXBWZWM0WzFdID0gYTEzXG4gICAgICAgIHRtcFZlYzRbMl0gPSBhMjNcbiAgICAgICAgdG1wVmVjNFszXSA9IGEzM1xuXG4gICAgICAgIC8vIFNvbHZlIHRoZSBlcXVhdGlvbiBieSBpbnZlcnRpbmcgcGVyc3BlY3RpdmVNYXRyaXggYW5kIG11bHRpcGx5aW5nXG4gICAgICAgIC8vIHJpZ2h0SGFuZFNpZGUgYnkgdGhlIGludmVyc2UuXG4gICAgICAgIC8vIHJlc3VpbmcgdGhlIHBlcnNwZWN0aXZlTWF0cml4IGhlcmUgc2luY2UgaXQncyBubyBsb25nZXIgbmVlZGVkXG4gICAgICAgIHZhciByZXQgPSBpbnZlcnQocGVyc3BlY3RpdmVNYXRyaXgsIHBlcnNwZWN0aXZlTWF0cml4KVxuICAgICAgICBpZiAoIXJldCkgcmV0dXJuIGZhbHNlXG4gICAgICAgIHRyYW5zcG9zZShwZXJzcGVjdGl2ZU1hdHJpeCwgcGVyc3BlY3RpdmVNYXRyaXgpXG5cbiAgICAgICAgLy9tdWx0aXBseSBieSB0cmFuc3Bvc2VkIGludmVyc2UgcGVyc3BlY3RpdmUgbWF0cml4LCBpbnRvIHBlcnNwZWN0aXZlIHZlYzRcbiAgICAgICAgdmVjNG11bHRNYXQ0KHBlcnNwZWN0aXZlLCB0bXBWZWM0LCBwZXJzcGVjdGl2ZU1hdHJpeClcbiAgICB9IGVsc2UgeyBcbiAgICAgICAgLy9ubyBwZXJzcGVjdGl2ZVxuICAgICAgICBwZXJzcGVjdGl2ZVswXSA9IHBlcnNwZWN0aXZlWzFdID0gcGVyc3BlY3RpdmVbMl0gPSAwXG4gICAgICAgIHBlcnNwZWN0aXZlWzNdID0gMVxuICAgIH1cblxuICAgIC8vIE5leHQgdGFrZSBjYXJlIG9mIHRyYW5zbGF0aW9uXG4gICAgdHJhbnNsYXRpb25bMF0gPSBhMzBcbiAgICB0cmFuc2xhdGlvblsxXSA9IGEzMVxuICAgIHRyYW5zbGF0aW9uWzJdID0gYTMyXG5cbiAgICAvLyBOb3cgZ2V0IHNjYWxlIGFuZCBzaGVhci4gJ3JvdycgaXMgYSAzIGVsZW1lbnQgYXJyYXkgb2YgMyBjb21wb25lbnQgdmVjdG9yc1xuICAgIG1hdDNmcm9tNChyb3csIHRtcClcblxuICAgIC8vIENvbXB1dGUgWCBzY2FsZSBmYWN0b3IgYW5kIG5vcm1hbGl6ZSBmaXJzdCByb3cuXG4gICAgc2NhbGVbMF0gPSB2ZWMzLmxlbmd0aChyb3dbMF0pXG4gICAgdmVjMy5ub3JtYWxpemUocm93WzBdLCByb3dbMF0pXG5cbiAgICAvLyBDb21wdXRlIFhZIHNoZWFyIGZhY3RvciBhbmQgbWFrZSAybmQgcm93IG9ydGhvZ29uYWwgdG8gMXN0LlxuICAgIHNrZXdbMF0gPSB2ZWMzLmRvdChyb3dbMF0sIHJvd1sxXSlcbiAgICBjb21iaW5lKHJvd1sxXSwgcm93WzFdLCByb3dbMF0sIDEuMCwgLXNrZXdbMF0pXG5cbiAgICAvLyBOb3csIGNvbXB1dGUgWSBzY2FsZSBhbmQgbm9ybWFsaXplIDJuZCByb3cuXG4gICAgc2NhbGVbMV0gPSB2ZWMzLmxlbmd0aChyb3dbMV0pXG4gICAgdmVjMy5ub3JtYWxpemUocm93WzFdLCByb3dbMV0pXG4gICAgc2tld1swXSAvPSBzY2FsZVsxXVxuXG4gICAgLy8gQ29tcHV0ZSBYWiBhbmQgWVogc2hlYXJzLCBvcnRob2dvbmFsaXplIDNyZCByb3dcbiAgICBza2V3WzFdID0gdmVjMy5kb3Qocm93WzBdLCByb3dbMl0pXG4gICAgY29tYmluZShyb3dbMl0sIHJvd1syXSwgcm93WzBdLCAxLjAsIC1za2V3WzFdKVxuICAgIHNrZXdbMl0gPSB2ZWMzLmRvdChyb3dbMV0sIHJvd1syXSlcbiAgICBjb21iaW5lKHJvd1syXSwgcm93WzJdLCByb3dbMV0sIDEuMCwgLXNrZXdbMl0pXG5cbiAgICAvLyBOZXh0LCBnZXQgWiBzY2FsZSBhbmQgbm9ybWFsaXplIDNyZCByb3cuXG4gICAgc2NhbGVbMl0gPSB2ZWMzLmxlbmd0aChyb3dbMl0pXG4gICAgdmVjMy5ub3JtYWxpemUocm93WzJdLCByb3dbMl0pXG4gICAgc2tld1sxXSAvPSBzY2FsZVsyXVxuICAgIHNrZXdbMl0gLz0gc2NhbGVbMl1cblxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIG1hdHJpeCAoaW4gcm93cykgaXMgb3J0aG9ub3JtYWwuXG4gICAgLy8gQ2hlY2sgZm9yIGEgY29vcmRpbmF0ZSBzeXN0ZW0gZmxpcC4gIElmIHRoZSBkZXRlcm1pbmFudFxuICAgIC8vIGlzIC0xLCB0aGVuIG5lZ2F0ZSB0aGUgbWF0cml4IGFuZCB0aGUgc2NhbGluZyBmYWN0b3JzLlxuICAgIHZlYzMuY3Jvc3MocGR1bTMsIHJvd1sxXSwgcm93WzJdKVxuICAgIGlmICh2ZWMzLmRvdChyb3dbMF0sIHBkdW0zKSA8IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIHNjYWxlW2ldICo9IC0xO1xuICAgICAgICAgICAgcm93W2ldWzBdICo9IC0xXG4gICAgICAgICAgICByb3dbaV1bMV0gKj0gLTFcbiAgICAgICAgICAgIHJvd1tpXVsyXSAqPSAtMVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTm93LCBnZXQgdGhlIHJvdGF0aW9ucyBvdXRcbiAgICBxdWF0ZXJuaW9uWzBdID0gMC41ICogTWF0aC5zcXJ0KE1hdGgubWF4KDEgKyByb3dbMF1bMF0gLSByb3dbMV1bMV0gLSByb3dbMl1bMl0sIDApKVxuICAgIHF1YXRlcm5pb25bMV0gPSAwLjUgKiBNYXRoLnNxcnQoTWF0aC5tYXgoMSAtIHJvd1swXVswXSArIHJvd1sxXVsxXSAtIHJvd1syXVsyXSwgMCkpXG4gICAgcXVhdGVybmlvblsyXSA9IDAuNSAqIE1hdGguc3FydChNYXRoLm1heCgxIC0gcm93WzBdWzBdIC0gcm93WzFdWzFdICsgcm93WzJdWzJdLCAwKSlcbiAgICBxdWF0ZXJuaW9uWzNdID0gMC41ICogTWF0aC5zcXJ0KE1hdGgubWF4KDEgKyByb3dbMF1bMF0gKyByb3dbMV1bMV0gKyByb3dbMl1bMl0sIDApKVxuXG4gICAgaWYgKHJvd1syXVsxXSA+IHJvd1sxXVsyXSlcbiAgICAgICAgcXVhdGVybmlvblswXSA9IC1xdWF0ZXJuaW9uWzBdXG4gICAgaWYgKHJvd1swXVsyXSA+IHJvd1syXVswXSlcbiAgICAgICAgcXVhdGVybmlvblsxXSA9IC1xdWF0ZXJuaW9uWzFdXG4gICAgaWYgKHJvd1sxXVswXSA+IHJvd1swXVsxXSlcbiAgICAgICAgcXVhdGVybmlvblsyXSA9IC1xdWF0ZXJuaW9uWzJdXG4gICAgcmV0dXJuIHRydWVcbn1cblxuLy93aWxsIGJlIHJlcGxhY2VkIGJ5IGdsLXZlYzQgZXZlbnR1YWxseVxuZnVuY3Rpb24gdmVjNG11bHRNYXQ0KG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLCB3ID0gYVszXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSAqIHc7XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10gKiB3O1xuICAgIG91dFsyXSA9IG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSAqIHc7XG4gICAgb3V0WzNdID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdICogdztcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vL2dldHMgdXBwZXItbGVmdCBvZiBhIDR4NCBtYXRyaXggaW50byBhIDN4MyBvZiB2ZWN0b3JzXG5mdW5jdGlvbiBtYXQzZnJvbTQob3V0LCBtYXQ0eDQpIHtcbiAgICBvdXRbMF1bMF0gPSBtYXQ0eDRbMF1cbiAgICBvdXRbMF1bMV0gPSBtYXQ0eDRbMV1cbiAgICBvdXRbMF1bMl0gPSBtYXQ0eDRbMl1cbiAgICBcbiAgICBvdXRbMV1bMF0gPSBtYXQ0eDRbNF1cbiAgICBvdXRbMV1bMV0gPSBtYXQ0eDRbNV1cbiAgICBvdXRbMV1bMl0gPSBtYXQ0eDRbNl1cblxuICAgIG91dFsyXVswXSA9IG1hdDR4NFs4XVxuICAgIG91dFsyXVsxXSA9IG1hdDR4NFs5XVxuICAgIG91dFsyXVsyXSA9IG1hdDR4NFsxMF1cbn1cblxuZnVuY3Rpb24gY29tYmluZShvdXQsIGEsIGIsIHNjYWxlMSwgc2NhbGUyKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIHNjYWxlMSArIGJbMF0gKiBzY2FsZTJcbiAgICBvdXRbMV0gPSBhWzFdICogc2NhbGUxICsgYlsxXSAqIHNjYWxlMlxuICAgIG91dFsyXSA9IGFbMl0gKiBzY2FsZTEgKyBiWzJdICogc2NhbGUyXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemUob3V0LCBtYXQpIHtcbiAgICB2YXIgbTQ0ID0gbWF0WzE1XVxuICAgIC8vIENhbm5vdCBub3JtYWxpemUuXG4gICAgaWYgKG00NCA9PT0gMCkgXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIHZhciBzY2FsZSA9IDEgLyBtNDRcbiAgICBmb3IgKHZhciBpPTA7IGk8MTY7IGkrKylcbiAgICAgICAgb3V0W2ldID0gbWF0W2ldICogc2NhbGVcbiAgICByZXR1cm4gdHJ1ZVxufSIsInZhciBsZXJwID0gcmVxdWlyZSgnZ2wtdmVjMy9sZXJwJylcblxudmFyIHJlY29tcG9zZSA9IHJlcXVpcmUoJ21hdDQtcmVjb21wb3NlJylcbnZhciBkZWNvbXBvc2UgPSByZXF1aXJlKCdtYXQ0LWRlY29tcG9zZScpXG52YXIgZGV0ZXJtaW5hbnQgPSByZXF1aXJlKCdnbC1tYXQ0L2RldGVybWluYW50JylcbnZhciBzbGVycCA9IHJlcXVpcmUoJ3F1YXQtc2xlcnAnKVxuXG52YXIgc3RhdGUwID0gc3RhdGUoKVxudmFyIHN0YXRlMSA9IHN0YXRlKClcbnZhciB0bXAgPSBzdGF0ZSgpXG5cbm1vZHVsZS5leHBvcnRzID0gaW50ZXJwb2xhdGVcbmZ1bmN0aW9uIGludGVycG9sYXRlKG91dCwgc3RhcnQsIGVuZCwgYWxwaGEpIHtcbiAgICBpZiAoZGV0ZXJtaW5hbnQoc3RhcnQpID09PSAwIHx8IGRldGVybWluYW50KGVuZCkgPT09IDApXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgLy9kZWNvbXBvc2UgdGhlIHN0YXJ0IGFuZCBlbmQgbWF0cmljZXMgaW50byBpbmRpdmlkdWFsIGNvbXBvbmVudHNcbiAgICB2YXIgcjAgPSBkZWNvbXBvc2Uoc3RhcnQsIHN0YXRlMC50cmFuc2xhdGUsIHN0YXRlMC5zY2FsZSwgc3RhdGUwLnNrZXcsIHN0YXRlMC5wZXJzcGVjdGl2ZSwgc3RhdGUwLnF1YXRlcm5pb24pXG4gICAgdmFyIHIxID0gZGVjb21wb3NlKGVuZCwgc3RhdGUxLnRyYW5zbGF0ZSwgc3RhdGUxLnNjYWxlLCBzdGF0ZTEuc2tldywgc3RhdGUxLnBlcnNwZWN0aXZlLCBzdGF0ZTEucXVhdGVybmlvbilcbiAgICBpZiAoIXIwIHx8ICFyMSlcbiAgICAgICAgcmV0dXJuIGZhbHNlICAgIFxuXG5cbiAgICAvL25vdyBsZXJwL3NsZXJwIHRoZSBzdGFydCBhbmQgZW5kIGNvbXBvbmVudHMgaW50byBhIHRlbXBvcmFyeSAgICAgbGVycCh0bXB0cmFuc2xhdGUsIHN0YXRlMC50cmFuc2xhdGUsIHN0YXRlMS50cmFuc2xhdGUsIGFscGhhKVxuICAgIGxlcnAodG1wLnRyYW5zbGF0ZSwgc3RhdGUwLnRyYW5zbGF0ZSwgc3RhdGUxLnRyYW5zbGF0ZSwgYWxwaGEpXG4gICAgbGVycCh0bXAuc2tldywgc3RhdGUwLnNrZXcsIHN0YXRlMS5za2V3LCBhbHBoYSlcbiAgICBsZXJwKHRtcC5zY2FsZSwgc3RhdGUwLnNjYWxlLCBzdGF0ZTEuc2NhbGUsIGFscGhhKVxuICAgIGxlcnAodG1wLnBlcnNwZWN0aXZlLCBzdGF0ZTAucGVyc3BlY3RpdmUsIHN0YXRlMS5wZXJzcGVjdGl2ZSwgYWxwaGEpXG4gICAgc2xlcnAodG1wLnF1YXRlcm5pb24sIHN0YXRlMC5xdWF0ZXJuaW9uLCBzdGF0ZTEucXVhdGVybmlvbiwgYWxwaGEpXG5cbiAgICAvL2FuZCByZWNvbXBvc2UgaW50byBvdXIgJ291dCcgbWF0cml4XG4gICAgcmVjb21wb3NlKG91dCwgdG1wLnRyYW5zbGF0ZSwgdG1wLnNjYWxlLCB0bXAuc2tldywgdG1wLnBlcnNwZWN0aXZlLCB0bXAucXVhdGVybmlvbilcbiAgICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBzdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2xhdGU6IHZlYzMoKSxcbiAgICAgICAgc2NhbGU6IHZlYzMoMSksXG4gICAgICAgIHNrZXc6IHZlYzMoKSxcbiAgICAgICAgcGVyc3BlY3RpdmU6IHZlYzQoKSxcbiAgICAgICAgcXVhdGVybmlvbjogdmVjNCgpXG4gICAgfVxufVxuXG5mdW5jdGlvbiB2ZWMzKG4pIHtcbiAgICByZXR1cm4gW258fDAsbnx8MCxufHwwXVxufVxuXG5mdW5jdGlvbiB2ZWM0KCkge1xuICAgIHJldHVybiBbMCwwLDAsMV1cbn0iLCIvKlxuSW5wdXQ6ICB0cmFuc2xhdGlvbiA7IGEgMyBjb21wb25lbnQgdmVjdG9yXG4gICAgICAgIHNjYWxlICAgICAgIDsgYSAzIGNvbXBvbmVudCB2ZWN0b3JcbiAgICAgICAgc2tldyAgICAgICAgOyBza2V3IGZhY3RvcnMgWFksWFosWVogcmVwcmVzZW50ZWQgYXMgYSAzIGNvbXBvbmVudCB2ZWN0b3JcbiAgICAgICAgcGVyc3BlY3RpdmUgOyBhIDQgY29tcG9uZW50IHZlY3RvclxuICAgICAgICBxdWF0ZXJuaW9uICA7IGEgNCBjb21wb25lbnQgdmVjdG9yXG5PdXRwdXQ6IG1hdHJpeCAgICAgIDsgYSA0eDQgbWF0cml4XG5cbkZyb206IGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdHJhbnNmb3Jtcy8jcmVjb21wb3NpbmctdG8tYS0zZC1tYXRyaXhcbiovXG5cbnZhciBtYXQ0ID0ge1xuICAgIGlkZW50aXR5OiByZXF1aXJlKCdnbC1tYXQ0L2lkZW50aXR5JyksXG4gICAgdHJhbnNsYXRlOiByZXF1aXJlKCdnbC1tYXQ0L3RyYW5zbGF0ZScpLFxuICAgIG11bHRpcGx5OiByZXF1aXJlKCdnbC1tYXQ0L211bHRpcGx5JyksXG4gICAgY3JlYXRlOiByZXF1aXJlKCdnbC1tYXQ0L2NyZWF0ZScpLFxuICAgIHNjYWxlOiByZXF1aXJlKCdnbC1tYXQ0L3NjYWxlJyksXG4gICAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb246IHJlcXVpcmUoJ2dsLW1hdDQvZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24nKVxufVxuXG52YXIgcm90YXRpb25NYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXG52YXIgdGVtcCA9IG1hdDQuY3JlYXRlKClcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZWNvbXBvc2VNYXQ0KG1hdHJpeCwgdHJhbnNsYXRpb24sIHNjYWxlLCBza2V3LCBwZXJzcGVjdGl2ZSwgcXVhdGVybmlvbikge1xuICAgIG1hdDQuaWRlbnRpdHkobWF0cml4KVxuXG4gICAgLy9hcHBseSB0cmFuc2xhdGlvbiAmIHJvdGF0aW9uXG4gICAgbWF0NC5mcm9tUm90YXRpb25UcmFuc2xhdGlvbihtYXRyaXgsIHF1YXRlcm5pb24sIHRyYW5zbGF0aW9uKVxuXG4gICAgLy9hcHBseSBwZXJzcGVjdGl2ZVxuICAgIG1hdHJpeFszXSA9IHBlcnNwZWN0aXZlWzBdXG4gICAgbWF0cml4WzddID0gcGVyc3BlY3RpdmVbMV1cbiAgICBtYXRyaXhbMTFdID0gcGVyc3BlY3RpdmVbMl1cbiAgICBtYXRyaXhbMTVdID0gcGVyc3BlY3RpdmVbM11cbiAgICAgICAgXG4gICAgLy8gYXBwbHkgc2tld1xuICAgIC8vIHRlbXAgaXMgYSBpZGVudGl0eSA0eDQgbWF0cml4IGluaXRpYWxseVxuICAgIG1hdDQuaWRlbnRpdHkodGVtcClcblxuICAgIGlmIChza2V3WzJdICE9PSAwKSB7XG4gICAgICAgIHRlbXBbOV0gPSBza2V3WzJdXG4gICAgICAgIG1hdDQubXVsdGlwbHkobWF0cml4LCBtYXRyaXgsIHRlbXApXG4gICAgfVxuXG4gICAgaWYgKHNrZXdbMV0gIT09IDApIHtcbiAgICAgICAgdGVtcFs5XSA9IDBcbiAgICAgICAgdGVtcFs4XSA9IHNrZXdbMV1cbiAgICAgICAgbWF0NC5tdWx0aXBseShtYXRyaXgsIG1hdHJpeCwgdGVtcClcbiAgICB9XG5cbiAgICBpZiAoc2tld1swXSAhPT0gMCkge1xuICAgICAgICB0ZW1wWzhdID0gMFxuICAgICAgICB0ZW1wWzRdID0gc2tld1swXVxuICAgICAgICBtYXQ0Lm11bHRpcGx5KG1hdHJpeCwgbWF0cml4LCB0ZW1wKVxuICAgIH1cblxuICAgIC8vYXBwbHkgc2NhbGVcbiAgICBtYXQ0LnNjYWxlKG1hdHJpeCwgbWF0cml4LCBzY2FsZSlcbiAgICByZXR1cm4gbWF0cml4XG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgYnNlYXJjaCAgID0gcmVxdWlyZSgnYmluYXJ5LXNlYXJjaC1ib3VuZHMnKVxyXG52YXIgbTRpbnRlcnAgID0gcmVxdWlyZSgnbWF0NC1pbnRlcnBvbGF0ZScpXHJcbnZhciBpbnZlcnQ0NCAgPSByZXF1aXJlKCdnbC1tYXQ0L2ludmVydCcpXHJcbnZhciByb3RhdGVYICAgPSByZXF1aXJlKCdnbC1tYXQ0L3JvdGF0ZVgnKVxyXG52YXIgcm90YXRlWSAgID0gcmVxdWlyZSgnZ2wtbWF0NC9yb3RhdGVZJylcclxudmFyIHJvdGF0ZVogICA9IHJlcXVpcmUoJ2dsLW1hdDQvcm90YXRlWicpXHJcbnZhciBsb29rQXQgICAgPSByZXF1aXJlKCdnbC1tYXQ0L2xvb2tBdCcpXHJcbnZhciB0cmFuc2xhdGUgPSByZXF1aXJlKCdnbC1tYXQ0L3RyYW5zbGF0ZScpXHJcbnZhciBzY2FsZSAgICAgPSByZXF1aXJlKCdnbC1tYXQ0L3NjYWxlJylcclxudmFyIG5vcm1hbGl6ZSA9IHJlcXVpcmUoJ2dsLXZlYzMvbm9ybWFsaXplJylcclxuXHJcbnZhciBERUZBVUxUX0NFTlRFUiA9IFswLDAsMF1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTWF0cml4Q2FtZXJhQ29udHJvbGxlclxyXG5cclxuZnVuY3Rpb24gTWF0cml4Q2FtZXJhQ29udHJvbGxlcihpbml0aWFsTWF0cml4KSB7XHJcbiAgdGhpcy5fY29tcG9uZW50cyAgICA9IGluaXRpYWxNYXRyaXguc2xpY2UoKVxyXG4gIHRoaXMuX3RpbWUgICAgICAgICAgPSBbMF1cclxuICB0aGlzLnByZXZNYXRyaXggICAgID0gaW5pdGlhbE1hdHJpeC5zbGljZSgpXHJcbiAgdGhpcy5uZXh0TWF0cml4ICAgICA9IGluaXRpYWxNYXRyaXguc2xpY2UoKVxyXG4gIHRoaXMuY29tcHV0ZWRNYXRyaXggPSBpbml0aWFsTWF0cml4LnNsaWNlKClcclxuICB0aGlzLmNvbXB1dGVkSW52ZXJzZSA9IGluaXRpYWxNYXRyaXguc2xpY2UoKVxyXG4gIHRoaXMuY29tcHV0ZWRFeWUgICAgPSBbMCwwLDBdXHJcbiAgdGhpcy5jb21wdXRlZFVwICAgICA9IFswLDAsMF1cclxuICB0aGlzLmNvbXB1dGVkQ2VudGVyID0gWzAsMCwwXVxyXG4gIHRoaXMuY29tcHV0ZWRSYWRpdXMgPSBbMF1cclxuICB0aGlzLl9saW1pdHMgICAgICAgID0gWy1JbmZpbml0eSwgSW5maW5pdHldXHJcbn1cclxuXHJcbnZhciBwcm90byA9IE1hdHJpeENhbWVyYUNvbnRyb2xsZXIucHJvdG90eXBlXHJcblxyXG5wcm90by5yZWNhbGNNYXRyaXggPSBmdW5jdGlvbih0KSB7XHJcbiAgdmFyIHRpbWUgPSB0aGlzLl90aW1lXHJcbiAgdmFyIHRpZHggPSBic2VhcmNoLmxlKHRpbWUsIHQpXHJcbiAgdmFyIG1hdCA9IHRoaXMuY29tcHV0ZWRNYXRyaXhcclxuICBpZih0aWR4IDwgMCkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIHZhciBjb21wcyA9IHRoaXMuX2NvbXBvbmVudHNcclxuICBpZih0aWR4ID09PSB0aW1lLmxlbmd0aC0xKSB7XHJcbiAgICB2YXIgcHRyID0gMTYqdGlkeFxyXG4gICAgZm9yKHZhciBpPTA7IGk8MTY7ICsraSkge1xyXG4gICAgICBtYXRbaV0gPSBjb21wc1twdHIrK11cclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIGR0ID0gKHRpbWVbdGlkeCsxXSAtIHRpbWVbdGlkeF0pXHJcbiAgICB2YXIgcHRyID0gMTYqdGlkeFxyXG4gICAgdmFyIHByZXYgPSB0aGlzLnByZXZNYXRyaXhcclxuICAgIHZhciBhbGxFcXVhbCA9IHRydWVcclxuICAgIGZvcih2YXIgaT0wOyBpPDE2OyArK2kpIHtcclxuICAgICAgcHJldltpXSA9IGNvbXBzW3B0cisrXVxyXG4gICAgfVxyXG4gICAgdmFyIG5leHQgPSB0aGlzLm5leHRNYXRyaXhcclxuICAgIGZvcih2YXIgaT0wOyBpPDE2OyArK2kpIHtcclxuICAgICAgbmV4dFtpXSA9IGNvbXBzW3B0cisrXVxyXG4gICAgICBhbGxFcXVhbCA9IGFsbEVxdWFsICYmIChwcmV2W2ldID09PSBuZXh0W2ldKVxyXG4gICAgfVxyXG4gICAgaWYoZHQgPCAxZS02IHx8IGFsbEVxdWFsKSB7XHJcbiAgICAgIGZvcih2YXIgaT0wOyBpPDE2OyArK2kpIHtcclxuICAgICAgICBtYXRbaV0gPSBwcmV2W2ldXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG00aW50ZXJwKG1hdCwgcHJldiwgbmV4dCwgKHQgLSB0aW1lW3RpZHhdKS9kdClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciB1cCA9IHRoaXMuY29tcHV0ZWRVcFxyXG4gIHVwWzBdID0gbWF0WzFdXHJcbiAgdXBbMV0gPSBtYXRbNV1cclxuICB1cFsyXSA9IG1hdFs5XVxyXG4gIG5vcm1hbGl6ZSh1cCwgdXApXHJcblxyXG4gIHZhciBpbWF0ID0gdGhpcy5jb21wdXRlZEludmVyc2VcclxuICBpbnZlcnQ0NChpbWF0LCBtYXQpXHJcbiAgdmFyIGV5ZSA9IHRoaXMuY29tcHV0ZWRFeWVcclxuICB2YXIgdyA9IGltYXRbMTVdXHJcbiAgZXllWzBdID0gaW1hdFsxMl0vd1xyXG4gIGV5ZVsxXSA9IGltYXRbMTNdL3dcclxuICBleWVbMl0gPSBpbWF0WzE0XS93XHJcblxyXG4gIHZhciBjZW50ZXIgPSB0aGlzLmNvbXB1dGVkQ2VudGVyXHJcbiAgdmFyIHJhZGl1cyA9IE1hdGguZXhwKHRoaXMuY29tcHV0ZWRSYWRpdXNbMF0pXHJcbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XHJcbiAgICBjZW50ZXJbaV0gPSBleWVbaV0gLSBtYXRbMis0KmldICogcmFkaXVzXHJcbiAgfVxyXG59XHJcblxyXG5wcm90by5pZGxlID0gZnVuY3Rpb24odCkge1xyXG4gIGlmKHQgPCB0aGlzLmxhc3RUKCkpIHtcclxuICAgIHJldHVyblxyXG4gIH1cclxuICB2YXIgbWMgPSB0aGlzLl9jb21wb25lbnRzXHJcbiAgdmFyIHB0ciA9IG1jLmxlbmd0aC0xNlxyXG4gIGZvcih2YXIgaT0wOyBpPDE2OyArK2kpIHtcclxuICAgIG1jLnB1c2gobWNbcHRyKytdKVxyXG4gIH1cclxuICB0aGlzLl90aW1lLnB1c2godClcclxufVxyXG5cclxucHJvdG8uZmx1c2ggPSBmdW5jdGlvbih0KSB7XHJcbiAgdmFyIGlkeCA9IGJzZWFyY2guZ3QodGhpcy5fdGltZSwgdCkgLSAyXHJcbiAgaWYoaWR4IDwgMCkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIHRoaXMuX3RpbWUuc3BsaWNlKDAsIGlkeClcclxuICB0aGlzLl9jb21wb25lbnRzLnNwbGljZSgwLCAxNippZHgpXHJcbn1cclxuXHJcbnByb3RvLmxhc3RUID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHRoaXMuX3RpbWVbdGhpcy5fdGltZS5sZW5ndGgtMV1cclxufVxyXG5cclxucHJvdG8ubG9va0F0ID0gZnVuY3Rpb24odCwgZXllLCBjZW50ZXIsIHVwKSB7XHJcbiAgdGhpcy5yZWNhbGNNYXRyaXgodClcclxuICBleWUgICAgPSBleWUgfHwgdGhpcy5jb21wdXRlZEV5ZVxyXG4gIGNlbnRlciA9IGNlbnRlciB8fCBERUZBVUxUX0NFTlRFUlxyXG4gIHVwICAgICA9IHVwIHx8IHRoaXMuY29tcHV0ZWRVcFxyXG4gIHRoaXMuc2V0TWF0cml4KHQsIGxvb2tBdCh0aGlzLmNvbXB1dGVkTWF0cml4LCBleWUsIGNlbnRlciwgdXApKVxyXG4gIHZhciBkMiA9IDAuMFxyXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xyXG4gICAgZDIgKz0gTWF0aC5wb3coY2VudGVyW2ldIC0gZXllW2ldLCAyKVxyXG4gIH1cclxuICBkMiA9IE1hdGgubG9nKE1hdGguc3FydChkMikpXHJcbiAgdGhpcy5jb21wdXRlZFJhZGl1c1swXSA9IGQyXHJcbn1cclxuXHJcbnByb3RvLnJvdGF0ZSA9IGZ1bmN0aW9uKHQsIHlhdywgcGl0Y2gsIHJvbGwpIHtcclxuICB0aGlzLnJlY2FsY01hdHJpeCh0KVxyXG4gIHZhciBtYXQgPSB0aGlzLmNvbXB1dGVkSW52ZXJzZVxyXG4gIGlmKHlhdykgICByb3RhdGVZKG1hdCwgbWF0LCB5YXcpXHJcbiAgaWYocGl0Y2gpIHJvdGF0ZVgobWF0LCBtYXQsIHBpdGNoKVxyXG4gIGlmKHJvbGwpICByb3RhdGVaKG1hdCwgbWF0LCByb2xsKVxyXG4gIHRoaXMuc2V0TWF0cml4KHQsIGludmVydDQ0KHRoaXMuY29tcHV0ZWRNYXRyaXgsIG1hdCkpXHJcbn1cclxuXHJcbnZhciB0dmVjID0gWzAsMCwwXVxyXG5cclxucHJvdG8ucGFuID0gZnVuY3Rpb24odCwgZHgsIGR5LCBkeikge1xyXG4gIHR2ZWNbMF0gPSAtKGR4IHx8IDAuMClcclxuICB0dmVjWzFdID0gLShkeSB8fCAwLjApXHJcbiAgdHZlY1syXSA9IC0oZHogfHwgMC4wKVxyXG4gIHRoaXMucmVjYWxjTWF0cml4KHQpXHJcbiAgdmFyIG1hdCA9IHRoaXMuY29tcHV0ZWRJbnZlcnNlXHJcbiAgdHJhbnNsYXRlKG1hdCwgbWF0LCB0dmVjKVxyXG4gIHRoaXMuc2V0TWF0cml4KHQsIGludmVydDQ0KG1hdCwgbWF0KSlcclxufVxyXG5cclxucHJvdG8udHJhbnNsYXRlID0gZnVuY3Rpb24odCwgZHgsIGR5LCBkeikge1xyXG4gIHR2ZWNbMF0gPSBkeCB8fCAwLjBcclxuICB0dmVjWzFdID0gZHkgfHwgMC4wXHJcbiAgdHZlY1syXSA9IGR6IHx8IDAuMFxyXG4gIHRoaXMucmVjYWxjTWF0cml4KHQpXHJcbiAgdmFyIG1hdCA9IHRoaXMuY29tcHV0ZWRNYXRyaXhcclxuICB0cmFuc2xhdGUobWF0LCBtYXQsIHR2ZWMpXHJcbiAgdGhpcy5zZXRNYXRyaXgodCwgbWF0KVxyXG59XHJcblxyXG5wcm90by5zZXRNYXRyaXggPSBmdW5jdGlvbih0LCBtYXQpIHtcclxuICBpZih0IDwgdGhpcy5sYXN0VCgpKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgdGhpcy5fdGltZS5wdXNoKHQpXHJcbiAgZm9yKHZhciBpPTA7IGk8MTY7ICsraSkge1xyXG4gICAgdGhpcy5fY29tcG9uZW50cy5wdXNoKG1hdFtpXSlcclxuICB9XHJcbn1cclxuXHJcbnByb3RvLnNldERpc3RhbmNlID0gZnVuY3Rpb24odCwgZCkge1xyXG4gIHRoaXMuY29tcHV0ZWRSYWRpdXNbMF0gPSBkXHJcbn1cclxuXHJcbnByb3RvLnNldERpc3RhbmNlTGltaXRzID0gZnVuY3Rpb24oYSxiKSB7XHJcbiAgdmFyIGxpbSA9IHRoaXMuX2xpbWl0c1xyXG4gIGxpbVswXSA9IGFcclxuICBsaW1bMV0gPSBiXHJcbn1cclxuXHJcbnByb3RvLmdldERpc3RhbmNlTGltaXRzID0gZnVuY3Rpb24ob3V0KSB7XHJcbiAgdmFyIGxpbSA9IHRoaXMuX2xpbWl0c1xyXG4gIGlmKG91dCkge1xyXG4gICAgb3V0WzBdID0gbGltWzBdXHJcbiAgICBvdXRbMV0gPSBsaW1bMV1cclxuICAgIHJldHVybiBvdXRcclxuICB9XHJcbiAgcmV0dXJuIGxpbVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNYXRyaXhDYW1lcmFDb250cm9sbGVyKG9wdGlvbnMpIHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gIHZhciBtYXRyaXggPSBvcHRpb25zLm1hdHJpeCB8fCBcclxuICAgICAgICAgICAgICBbMSwwLDAsMCxcclxuICAgICAgICAgICAgICAgMCwxLDAsMCxcclxuICAgICAgICAgICAgICAgMCwwLDEsMCxcclxuICAgICAgICAgICAgICAgMCwwLDAsMV1cclxuICByZXR1cm4gbmV3IE1hdHJpeENhbWVyYUNvbnRyb2xsZXIobWF0cml4KVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIGNvbXBpbGVTZWFyY2goZnVuY05hbWUsIHByZWRpY2F0ZSwgcmV2ZXJzZWQsIGV4dHJhQXJncywgdXNlTmRhcnJheSwgZWFybHlPdXQpIHtcbiAgdmFyIGNvZGUgPSBbXG4gICAgXCJmdW5jdGlvbiBcIiwgZnVuY05hbWUsIFwiKGEsbCxoLFwiLCBleHRyYUFyZ3Muam9pbihcIixcIiksICBcIil7XCIsXG5lYXJseU91dCA/IFwiXCIgOiBcInZhciBpPVwiLCAocmV2ZXJzZWQgPyBcImwtMVwiIDogXCJoKzFcIiksXG5cIjt3aGlsZShsPD1oKXtcXFxudmFyIG09KGwraCk+Pj4xLHg9YVwiLCB1c2VOZGFycmF5ID8gXCIuZ2V0KG0pXCIgOiBcIlttXVwiXVxuICBpZihlYXJseU91dCkge1xuICAgIGlmKHByZWRpY2F0ZS5pbmRleE9mKFwiY1wiKSA8IDApIHtcbiAgICAgIGNvZGUucHVzaChcIjtpZih4PT09eSl7cmV0dXJuIG19ZWxzZSBpZih4PD15KXtcIilcbiAgICB9IGVsc2Uge1xuICAgICAgY29kZS5wdXNoKFwiO3ZhciBwPWMoeCx5KTtpZihwPT09MCl7cmV0dXJuIG19ZWxzZSBpZihwPD0wKXtcIilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKFwiO2lmKFwiLCBwcmVkaWNhdGUsIFwiKXtpPW07XCIpXG4gIH1cbiAgaWYocmV2ZXJzZWQpIHtcbiAgICBjb2RlLnB1c2goXCJsPW0rMX1lbHNle2g9bS0xfVwiKVxuICB9IGVsc2Uge1xuICAgIGNvZGUucHVzaChcImg9bS0xfWVsc2V7bD1tKzF9XCIpXG4gIH1cbiAgY29kZS5wdXNoKFwifVwiKVxuICBpZihlYXJseU91dCkge1xuICAgIGNvZGUucHVzaChcInJldHVybiAtMX07XCIpXG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKFwicmV0dXJuIGl9O1wiKVxuICB9XG4gIHJldHVybiBjb2RlLmpvaW4oXCJcIilcbn1cblxuZnVuY3Rpb24gY29tcGlsZUJvdW5kc1NlYXJjaChwcmVkaWNhdGUsIHJldmVyc2VkLCBzdWZmaXgsIGVhcmx5T3V0KSB7XG4gIHZhciByZXN1bHQgPSBuZXcgRnVuY3Rpb24oW1xuICBjb21waWxlU2VhcmNoKFwiQVwiLCBcInhcIiArIHByZWRpY2F0ZSArIFwieVwiLCByZXZlcnNlZCwgW1wieVwiXSwgZmFsc2UsIGVhcmx5T3V0KSxcbiAgY29tcGlsZVNlYXJjaChcIkJcIiwgXCJ4XCIgKyBwcmVkaWNhdGUgKyBcInlcIiwgcmV2ZXJzZWQsIFtcInlcIl0sIHRydWUsIGVhcmx5T3V0KSxcbiAgY29tcGlsZVNlYXJjaChcIlBcIiwgXCJjKHgseSlcIiArIHByZWRpY2F0ZSArIFwiMFwiLCByZXZlcnNlZCwgW1wieVwiLCBcImNcIl0sIGZhbHNlLCBlYXJseU91dCksXG4gIGNvbXBpbGVTZWFyY2goXCJRXCIsIFwiYyh4LHkpXCIgKyBwcmVkaWNhdGUgKyBcIjBcIiwgcmV2ZXJzZWQsIFtcInlcIiwgXCJjXCJdLCB0cnVlLCBlYXJseU91dCksXG5cImZ1bmN0aW9uIGRpc3BhdGNoQnNlYXJjaFwiLCBzdWZmaXgsIFwiKGEseSxjLGwsaCl7XFxcbmlmKGEuc2hhcGUpe1xcXG5pZih0eXBlb2YoYyk9PT0nZnVuY3Rpb24nKXtcXFxucmV0dXJuIFEoYSwobD09PXVuZGVmaW5lZCk/MDpsfDAsKGg9PT11bmRlZmluZWQpP2Euc2hhcGVbMF0tMTpofDAseSxjKVxcXG59ZWxzZXtcXFxucmV0dXJuIEIoYSwoYz09PXVuZGVmaW5lZCk/MDpjfDAsKGw9PT11bmRlZmluZWQpP2Euc2hhcGVbMF0tMTpsfDAseSlcXFxufX1lbHNle1xcXG5pZih0eXBlb2YoYyk9PT0nZnVuY3Rpb24nKXtcXFxucmV0dXJuIFAoYSwobD09PXVuZGVmaW5lZCk/MDpsfDAsKGg9PT11bmRlZmluZWQpP2EubGVuZ3RoLTE6aHwwLHksYylcXFxufWVsc2V7XFxcbnJldHVybiBBKGEsKGM9PT11bmRlZmluZWQpPzA6Y3wwLChsPT09dW5kZWZpbmVkKT9hLmxlbmd0aC0xOmx8MCx5KVxcXG59fX1cXFxucmV0dXJuIGRpc3BhdGNoQnNlYXJjaFwiLCBzdWZmaXhdLmpvaW4oXCJcIikpXG4gIHJldHVybiByZXN1bHQoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2U6IGNvbXBpbGVCb3VuZHNTZWFyY2goXCI+PVwiLCBmYWxzZSwgXCJHRVwiKSxcbiAgZ3Q6IGNvbXBpbGVCb3VuZHNTZWFyY2goXCI+XCIsIGZhbHNlLCBcIkdUXCIpLFxuICBsdDogY29tcGlsZUJvdW5kc1NlYXJjaChcIjxcIiwgdHJ1ZSwgXCJMVFwiKSxcbiAgbGU6IGNvbXBpbGVCb3VuZHNTZWFyY2goXCI8PVwiLCB0cnVlLCBcIkxFXCIpLFxuICBlcTogY29tcGlsZUJvdW5kc1NlYXJjaChcIi1cIiwgdHJ1ZSwgXCJFUVwiLCB0cnVlKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gcXVhdEZyb21GcmFtZVxuXG5mdW5jdGlvbiBxdWF0RnJvbUZyYW1lKFxuICBvdXQsXG4gIHJ4LCByeSwgcnosXG4gIHV4LCB1eSwgdXosXG4gIGZ4LCBmeSwgZnopIHtcbiAgdmFyIHRyID0gcnggKyB1eSArIGZ6XG4gIGlmKGwgPiAwKSB7XG4gICAgdmFyIGwgPSBNYXRoLnNxcnQodHIgKyAxLjApXG4gICAgb3V0WzBdID0gMC41ICogKHV6IC0gZnkpIC8gbFxuICAgIG91dFsxXSA9IDAuNSAqIChmeCAtIHJ6KSAvIGxcbiAgICBvdXRbMl0gPSAwLjUgKiAocnkgLSB1eSkgLyBsXG4gICAgb3V0WzNdID0gMC41ICogbFxuICB9IGVsc2Uge1xuICAgIHZhciB0ZiA9IE1hdGgubWF4KHJ4LCB1eSwgZnopXG4gICAgdmFyIGwgPSBNYXRoLnNxcnQoMiAqIHRmIC0gdHIgKyAxLjApXG4gICAgaWYocnggPj0gdGYpIHtcbiAgICAgIC8veCB5IHogIG9yZGVyXG4gICAgICBvdXRbMF0gPSAwLjUgKiBsXG4gICAgICBvdXRbMV0gPSAwLjUgKiAodXggKyByeSkgLyBsXG4gICAgICBvdXRbMl0gPSAwLjUgKiAoZnggKyByeikgLyBsXG4gICAgICBvdXRbM10gPSAwLjUgKiAodXogLSBmeSkgLyBsXG4gICAgfSBlbHNlIGlmKHV5ID49IHRmKSB7XG4gICAgICAvL3kgeiB4ICBvcmRlclxuICAgICAgb3V0WzBdID0gMC41ICogKHJ5ICsgdXgpIC8gbFxuICAgICAgb3V0WzFdID0gMC41ICogbFxuICAgICAgb3V0WzJdID0gMC41ICogKGZ5ICsgdXopIC8gbFxuICAgICAgb3V0WzNdID0gMC41ICogKGZ4IC0gcnopIC8gbFxuICAgIH0gZWxzZSB7XG4gICAgICAvL3ogeCB5ICBvcmRlclxuICAgICAgb3V0WzBdID0gMC41ICogKHJ6ICsgZngpIC8gbFxuICAgICAgb3V0WzFdID0gMC41ICogKHV6ICsgZnkpIC8gbFxuICAgICAgb3V0WzJdID0gMC41ICogbFxuICAgICAgb3V0WzNdID0gMC41ICogKHJ5IC0gdXgpIC8gbFxuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0XG59IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlT3JiaXRDb250cm9sbGVyXG5cbnZhciBmaWx0ZXJWZWN0b3IgID0gcmVxdWlyZSgnZmlsdGVyZWQtdmVjdG9yJylcbnZhciBsb29rQXQgICAgICAgID0gcmVxdWlyZSgnZ2wtbWF0NC9sb29rQXQnKVxudmFyIG1hdDRGcm9tUXVhdCAgPSByZXF1aXJlKCdnbC1tYXQ0L2Zyb21RdWF0JylcbnZhciBpbnZlcnQ0NCAgICAgID0gcmVxdWlyZSgnZ2wtbWF0NC9pbnZlcnQnKVxudmFyIHF1YXRGcm9tRnJhbWUgPSByZXF1aXJlKCcuL2xpYi9xdWF0RnJvbUZyYW1lJylcblxuZnVuY3Rpb24gbGVuMyh4LHkseikge1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHgsMikgKyBNYXRoLnBvdyh5LDIpICsgTWF0aC5wb3coeiwyKSlcbn1cblxuZnVuY3Rpb24gbGVuNCh3LHgseSx6KSB7XG4gIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codywyKSArIE1hdGgucG93KHgsMikgKyBNYXRoLnBvdyh5LDIpICsgTWF0aC5wb3coeiwyKSlcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplNChvdXQsIGEpIHtcbiAgdmFyIGF4ID0gYVswXVxuICB2YXIgYXkgPSBhWzFdXG4gIHZhciBheiA9IGFbMl1cbiAgdmFyIGF3ID0gYVszXVxuICB2YXIgYWwgPSBsZW40KGF4LCBheSwgYXosIGF3KVxuICBpZihhbCA+IDFlLTYpIHtcbiAgICBvdXRbMF0gPSBheC9hbFxuICAgIG91dFsxXSA9IGF5L2FsXG4gICAgb3V0WzJdID0gYXovYWxcbiAgICBvdXRbM10gPSBhdy9hbFxuICB9IGVsc2Uge1xuICAgIG91dFswXSA9IG91dFsxXSA9IG91dFsyXSA9IDAuMFxuICAgIG91dFszXSA9IDEuMFxuICB9XG59XG5cbmZ1bmN0aW9uIE9yYml0Q2FtZXJhQ29udHJvbGxlcihpbml0UXVhdCwgaW5pdENlbnRlciwgaW5pdFJhZGl1cykge1xuICB0aGlzLnJhZGl1cyAgICA9IGZpbHRlclZlY3RvcihbaW5pdFJhZGl1c10pXG4gIHRoaXMuY2VudGVyICAgID0gZmlsdGVyVmVjdG9yKGluaXRDZW50ZXIpXG4gIHRoaXMucm90YXRpb24gID0gZmlsdGVyVmVjdG9yKGluaXRRdWF0KVxuXG4gIHRoaXMuY29tcHV0ZWRSYWRpdXMgICA9IHRoaXMucmFkaXVzLmN1cnZlKDApXG4gIHRoaXMuY29tcHV0ZWRDZW50ZXIgICA9IHRoaXMuY2VudGVyLmN1cnZlKDApXG4gIHRoaXMuY29tcHV0ZWRSb3RhdGlvbiA9IHRoaXMucm90YXRpb24uY3VydmUoMClcbiAgdGhpcy5jb21wdXRlZFVwICAgICAgID0gWzAuMSwwLDBdXG4gIHRoaXMuY29tcHV0ZWRFeWUgICAgICA9IFswLjEsMCwwXVxuICB0aGlzLmNvbXB1dGVkTWF0cml4ICAgPSBbMC4xLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXVxuXG4gIHRoaXMucmVjYWxjTWF0cml4KDApXG59XG5cbnZhciBwcm90byA9IE9yYml0Q2FtZXJhQ29udHJvbGxlci5wcm90b3R5cGVcblxucHJvdG8ubGFzdFQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgubWF4KFxuICAgIHRoaXMucmFkaXVzLmxhc3RUKCksXG4gICAgdGhpcy5jZW50ZXIubGFzdFQoKSxcbiAgICB0aGlzLnJvdGF0aW9uLmxhc3RUKCkpXG59XG5cbnByb3RvLnJlY2FsY01hdHJpeCA9IGZ1bmN0aW9uKHQpIHtcbiAgdGhpcy5yYWRpdXMuY3VydmUodClcbiAgdGhpcy5jZW50ZXIuY3VydmUodClcbiAgdGhpcy5yb3RhdGlvbi5jdXJ2ZSh0KVxuXG4gIHZhciBxdWF0ID0gdGhpcy5jb21wdXRlZFJvdGF0aW9uXG4gIG5vcm1hbGl6ZTQocXVhdCwgcXVhdClcblxuICB2YXIgbWF0ID0gdGhpcy5jb21wdXRlZE1hdHJpeFxuICBtYXQ0RnJvbVF1YXQobWF0LCBxdWF0KVxuXG4gIHZhciBjZW50ZXIgPSB0aGlzLmNvbXB1dGVkQ2VudGVyXG4gIHZhciBleWUgICAgPSB0aGlzLmNvbXB1dGVkRXllXG4gIHZhciB1cCAgICAgPSB0aGlzLmNvbXB1dGVkVXBcbiAgdmFyIHJhZGl1cyA9IE1hdGguZXhwKHRoaXMuY29tcHV0ZWRSYWRpdXNbMF0pXG5cbiAgZXllWzBdID0gY2VudGVyWzBdICsgcmFkaXVzICogbWF0WzJdXG4gIGV5ZVsxXSA9IGNlbnRlclsxXSArIHJhZGl1cyAqIG1hdFs2XVxuICBleWVbMl0gPSBjZW50ZXJbMl0gKyByYWRpdXMgKiBtYXRbMTBdXG4gIHVwWzBdID0gbWF0WzFdXG4gIHVwWzFdID0gbWF0WzVdXG4gIHVwWzJdID0gbWF0WzldXG5cbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgdmFyIHJyID0gMC4wXG4gICAgZm9yKHZhciBqPTA7IGo8MzsgKytqKSB7XG4gICAgICByciArPSBtYXRbaSs0KmpdICogZXllW2pdXG4gICAgfVxuICAgIG1hdFsxMitpXSA9IC1yclxuICB9XG59XG5cbnByb3RvLmdldE1hdHJpeCA9IGZ1bmN0aW9uKHQsIHJlc3VsdCkge1xuICB0aGlzLnJlY2FsY01hdHJpeCh0KVxuICB2YXIgbSA9IHRoaXMuY29tcHV0ZWRNYXRyaXhcbiAgaWYocmVzdWx0KSB7XG4gICAgZm9yKHZhciBpPTA7IGk8MTY7ICsraSkge1xuICAgICAgcmVzdWx0W2ldID0gbVtpXVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbiAgcmV0dXJuIG1cbn1cblxucHJvdG8uaWRsZSA9IGZ1bmN0aW9uKHQpIHtcbiAgdGhpcy5jZW50ZXIuaWRsZSh0KVxuICB0aGlzLnJhZGl1cy5pZGxlKHQpXG4gIHRoaXMucm90YXRpb24uaWRsZSh0KVxufVxuXG5wcm90by5mbHVzaCA9IGZ1bmN0aW9uKHQpIHtcbiAgdGhpcy5jZW50ZXIuZmx1c2godClcbiAgdGhpcy5yYWRpdXMuZmx1c2godClcbiAgdGhpcy5yb3RhdGlvbi5mbHVzaCh0KVxufVxuXG5wcm90by5wYW4gPSBmdW5jdGlvbih0LCBkeCwgZHksIGR6KSB7XG4gIGR4ID0gZHggfHwgMC4wXG4gIGR5ID0gZHkgfHwgMC4wXG4gIGR6ID0gZHogfHwgMC4wXG5cbiAgdGhpcy5yZWNhbGNNYXRyaXgodClcbiAgdmFyIG1hdCA9IHRoaXMuY29tcHV0ZWRNYXRyaXhcblxuICB2YXIgdXggPSBtYXRbMV1cbiAgdmFyIHV5ID0gbWF0WzVdXG4gIHZhciB1eiA9IG1hdFs5XVxuICB2YXIgdWwgPSBsZW4zKHV4LCB1eSwgdXopXG4gIHV4IC89IHVsXG4gIHV5IC89IHVsXG4gIHV6IC89IHVsXG5cbiAgdmFyIHJ4ID0gbWF0WzBdXG4gIHZhciByeSA9IG1hdFs0XVxuICB2YXIgcnogPSBtYXRbOF1cbiAgdmFyIHJ1ID0gcnggKiB1eCArIHJ5ICogdXkgKyByeiAqIHV6XG4gIHJ4IC09IHV4ICogcnVcbiAgcnkgLT0gdXkgKiBydVxuICByeiAtPSB1eiAqIHJ1XG4gIHZhciBybCA9IGxlbjMocngsIHJ5LCByeilcbiAgcnggLz0gcmxcbiAgcnkgLz0gcmxcbiAgcnogLz0gcmxcblxuICB2YXIgZnggPSBtYXRbMl1cbiAgdmFyIGZ5ID0gbWF0WzZdXG4gIHZhciBmeiA9IG1hdFsxMF1cbiAgdmFyIGZ1ID0gZnggKiB1eCArIGZ5ICogdXkgKyBmeiAqIHV6XG4gIHZhciBmciA9IGZ4ICogcnggKyBmeSAqIHJ5ICsgZnogKiByelxuICBmeCAtPSBmdSAqIHV4ICsgZnIgKiByeFxuICBmeSAtPSBmdSAqIHV5ICsgZnIgKiByeVxuICBmeiAtPSBmdSAqIHV6ICsgZnIgKiByelxuICB2YXIgZmwgPSBsZW4zKGZ4LCBmeSwgZnopXG4gIGZ4IC89IGZsXG4gIGZ5IC89IGZsXG4gIGZ6IC89IGZsXG5cbiAgdmFyIHZ4ID0gcnggKiBkeCArIHV4ICogZHlcbiAgdmFyIHZ5ID0gcnkgKiBkeCArIHV5ICogZHlcbiAgdmFyIHZ6ID0gcnogKiBkeCArIHV6ICogZHlcblxuICB0aGlzLmNlbnRlci5tb3ZlKHQsIHZ4LCB2eSwgdnopXG5cbiAgLy9VcGRhdGUgei1jb21wb25lbnQgb2YgcmFkaXVzXG4gIHZhciByYWRpdXMgPSBNYXRoLmV4cCh0aGlzLmNvbXB1dGVkUmFkaXVzWzBdKVxuICByYWRpdXMgPSBNYXRoLm1heCgxZS00LCByYWRpdXMgKyBkeilcbiAgdGhpcy5yYWRpdXMuc2V0KHQsIE1hdGgubG9nKHJhZGl1cykpXG59XG5cbnByb3RvLnJvdGF0ZSA9IGZ1bmN0aW9uKHQsIGR4LCBkeSwgZHopIHtcbiAgdGhpcy5yZWNhbGNNYXRyaXgodClcblxuICBkeCA9IGR4fHwwLjBcbiAgZHkgPSBkeXx8MC4wXG5cbiAgdmFyIG1hdCA9IHRoaXMuY29tcHV0ZWRNYXRyaXhcblxuICB2YXIgcnggPSBtYXRbMF1cbiAgdmFyIHJ5ID0gbWF0WzRdXG4gIHZhciByeiA9IG1hdFs4XVxuXG4gIHZhciB1eCA9IG1hdFsxXVxuICB2YXIgdXkgPSBtYXRbNV1cbiAgdmFyIHV6ID0gbWF0WzldXG5cbiAgdmFyIGZ4ID0gbWF0WzJdXG4gIHZhciBmeSA9IG1hdFs2XVxuICB2YXIgZnogPSBtYXRbMTBdXG5cbiAgdmFyIHF4ID0gZHggKiByeCArIGR5ICogdXhcbiAgdmFyIHF5ID0gZHggKiByeSArIGR5ICogdXlcbiAgdmFyIHF6ID0gZHggKiByeiArIGR5ICogdXpcblxuICB2YXIgYnggPSAtKGZ5ICogcXogLSBmeiAqIHF5KVxuICB2YXIgYnkgPSAtKGZ6ICogcXggLSBmeCAqIHF6KVxuICB2YXIgYnogPSAtKGZ4ICogcXkgLSBmeSAqIHF4KSAgXG4gIHZhciBidyA9IE1hdGguc3FydChNYXRoLm1heCgwLjAsIDEuMCAtIE1hdGgucG93KGJ4LDIpIC0gTWF0aC5wb3coYnksMikgLSBNYXRoLnBvdyhieiwyKSkpXG4gIHZhciBibCA9IGxlbjQoYngsIGJ5LCBieiwgYncpXG4gIGlmKGJsID4gMWUtNikge1xuICAgIGJ4IC89IGJsXG4gICAgYnkgLz0gYmxcbiAgICBieiAvPSBibFxuICAgIGJ3IC89IGJsXG4gIH0gZWxzZSB7XG4gICAgYnggPSBieSA9IGJ6ID0gMC4wXG4gICAgYncgPSAxLjBcbiAgfVxuXG4gIHZhciByb3RhdGlvbiA9IHRoaXMuY29tcHV0ZWRSb3RhdGlvblxuICB2YXIgYXggPSByb3RhdGlvblswXVxuICB2YXIgYXkgPSByb3RhdGlvblsxXVxuICB2YXIgYXogPSByb3RhdGlvblsyXVxuICB2YXIgYXcgPSByb3RhdGlvblszXVxuXG4gIHZhciBjeCA9IGF4KmJ3ICsgYXcqYnggKyBheSpieiAtIGF6KmJ5XG4gIHZhciBjeSA9IGF5KmJ3ICsgYXcqYnkgKyBheipieCAtIGF4KmJ6XG4gIHZhciBjeiA9IGF6KmJ3ICsgYXcqYnogKyBheCpieSAtIGF5KmJ4XG4gIHZhciBjdyA9IGF3KmJ3IC0gYXgqYnggLSBheSpieSAtIGF6KmJ6XG4gIFxuICAvL0FwcGx5IHJvbGxcbiAgaWYoZHopIHtcbiAgICBieCA9IGZ4XG4gICAgYnkgPSBmeVxuICAgIGJ6ID0gZnpcbiAgICB2YXIgcyA9IE1hdGguc2luKGR6KSAvIGxlbjMoYngsIGJ5LCBieilcbiAgICBieCAqPSBzXG4gICAgYnkgKj0gc1xuICAgIGJ6ICo9IHNcbiAgICBidyA9IE1hdGguY29zKGR4KVxuICAgIGN4ID0gY3gqYncgKyBjdypieCArIGN5KmJ6IC0gY3oqYnlcbiAgICBjeSA9IGN5KmJ3ICsgY3cqYnkgKyBjeipieCAtIGN4KmJ6XG4gICAgY3ogPSBjeipidyArIGN3KmJ6ICsgY3gqYnkgLSBjeSpieFxuICAgIGN3ID0gY3cqYncgLSBjeCpieCAtIGN5KmJ5IC0gY3oqYnpcbiAgfVxuXG4gIHZhciBjbCA9IGxlbjQoY3gsIGN5LCBjeiwgY3cpXG4gIGlmKGNsID4gMWUtNikge1xuICAgIGN4IC89IGNsXG4gICAgY3kgLz0gY2xcbiAgICBjeiAvPSBjbFxuICAgIGN3IC89IGNsXG4gIH0gZWxzZSB7XG4gICAgY3ggPSBjeSA9IGN6ID0gMC4wXG4gICAgY3cgPSAxLjBcbiAgfVxuXG4gIHRoaXMucm90YXRpb24uc2V0KHQsIGN4LCBjeSwgY3osIGN3KVxufVxuXG5wcm90by5sb29rQXQgPSBmdW5jdGlvbih0LCBleWUsIGNlbnRlciwgdXApIHtcbiAgdGhpcy5yZWNhbGNNYXRyaXgodClcblxuICBjZW50ZXIgPSBjZW50ZXIgfHwgdGhpcy5jb21wdXRlZENlbnRlclxuICBleWUgICAgPSBleWUgICAgfHwgdGhpcy5jb21wdXRlZEV5ZVxuICB1cCAgICAgPSB1cCAgICAgfHwgdGhpcy5jb21wdXRlZFVwXG5cbiAgdmFyIG1hdCA9IHRoaXMuY29tcHV0ZWRNYXRyaXhcbiAgbG9va0F0KG1hdCwgZXllLCBjZW50ZXIsIHVwKVxuXG4gIHZhciByb3RhdGlvbiA9IHRoaXMuY29tcHV0ZWRSb3RhdGlvblxuICBxdWF0RnJvbUZyYW1lKHJvdGF0aW9uLFxuICAgIG1hdFswXSwgbWF0WzFdLCBtYXRbMl0sXG4gICAgbWF0WzRdLCBtYXRbNV0sIG1hdFs2XSxcbiAgICBtYXRbOF0sIG1hdFs5XSwgbWF0WzEwXSlcbiAgbm9ybWFsaXplNChyb3RhdGlvbiwgcm90YXRpb24pXG4gIHRoaXMucm90YXRpb24uc2V0KHQsIHJvdGF0aW9uWzBdLCByb3RhdGlvblsxXSwgcm90YXRpb25bMl0sIHJvdGF0aW9uWzNdKVxuXG4gIHZhciBmbCA9IDAuMFxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICBmbCArPSBNYXRoLnBvdyhjZW50ZXJbaV0gLSBleWVbaV0sIDIpXG4gIH1cbiAgdGhpcy5yYWRpdXMuc2V0KHQsIDAuNSAqIE1hdGgubG9nKE1hdGgubWF4KGZsLCAxZS02KSkpXG5cbiAgdGhpcy5jZW50ZXIuc2V0KHQsIGNlbnRlclswXSwgY2VudGVyWzFdLCBjZW50ZXJbMl0pXG59XG5cbnByb3RvLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKHQsIGR4LCBkeSwgZHopIHtcbiAgdGhpcy5jZW50ZXIubW92ZSh0LFxuICAgIGR4fHwwLjAsXG4gICAgZHl8fDAuMCxcbiAgICBkenx8MC4wKVxufVxuXG5wcm90by5zZXRNYXRyaXggPSBmdW5jdGlvbih0LCBtYXRyaXgpIHtcblxuICB2YXIgcm90YXRpb24gPSB0aGlzLmNvbXB1dGVkUm90YXRpb25cbiAgcXVhdEZyb21GcmFtZShyb3RhdGlvbixcbiAgICBtYXRyaXhbMF0sIG1hdHJpeFsxXSwgbWF0cml4WzJdLFxuICAgIG1hdHJpeFs0XSwgbWF0cml4WzVdLCBtYXRyaXhbNl0sXG4gICAgbWF0cml4WzhdLCBtYXRyaXhbOV0sIG1hdHJpeFsxMF0pXG4gIG5vcm1hbGl6ZTQocm90YXRpb24sIHJvdGF0aW9uKVxuICB0aGlzLnJvdGF0aW9uLnNldCh0LCByb3RhdGlvblswXSwgcm90YXRpb25bMV0sIHJvdGF0aW9uWzJdLCByb3RhdGlvblszXSlcblxuICB2YXIgbWF0ID0gdGhpcy5jb21wdXRlZE1hdHJpeFxuICBpbnZlcnQ0NChtYXQsIG1hdHJpeClcbiAgdmFyIHcgPSBtYXRbMTVdXG4gIGlmKE1hdGguYWJzKHcpID4gMWUtNikge1xuICAgIHZhciBjeCA9IG1hdFsxMl0vd1xuICAgIHZhciBjeSA9IG1hdFsxM10vd1xuICAgIHZhciBjeiA9IG1hdFsxNF0vd1xuXG4gICAgdGhpcy5yZWNhbGNNYXRyaXgodCkgIFxuICAgIHZhciByID0gTWF0aC5leHAodGhpcy5jb21wdXRlZFJhZGl1c1swXSlcbiAgICB0aGlzLmNlbnRlci5zZXQodCwgY3gtbWF0WzJdKnIsIGN5LW1hdFs2XSpyLCBjei1tYXRbMTBdKnIpXG4gICAgdGhpcy5yYWRpdXMuaWRsZSh0KVxuICB9IGVsc2Uge1xuICAgIHRoaXMuY2VudGVyLmlkbGUodClcbiAgICB0aGlzLnJhZGl1cy5pZGxlKHQpXG4gIH1cbn1cblxucHJvdG8uc2V0RGlzdGFuY2UgPSBmdW5jdGlvbih0LCBkKSB7XG4gIGlmKGQgPiAwKSB7XG4gICAgdGhpcy5yYWRpdXMuc2V0KHQsIE1hdGgubG9nKGQpKVxuICB9XG59XG5cbnByb3RvLnNldERpc3RhbmNlTGltaXRzID0gZnVuY3Rpb24obG8sIGhpKSB7XG4gIGlmKGxvID4gMCkge1xuICAgIGxvID0gTWF0aC5sb2cobG8pXG4gIH0gZWxzZSB7XG4gICAgbG8gPSAtSW5maW5pdHkgICAgXG4gIH1cbiAgaWYoaGkgPiAwKSB7XG4gICAgaGkgPSBNYXRoLmxvZyhoaSlcbiAgfSBlbHNlIHtcbiAgICBoaSA9IEluZmluaXR5XG4gIH1cbiAgaGkgPSBNYXRoLm1heChoaSwgbG8pXG4gIHRoaXMucmFkaXVzLmJvdW5kc1swXVswXSA9IGxvXG4gIHRoaXMucmFkaXVzLmJvdW5kc1sxXVswXSA9IGhpXG59XG5cbnByb3RvLmdldERpc3RhbmNlTGltaXRzID0gZnVuY3Rpb24ob3V0KSB7XG4gIHZhciBib3VuZHMgPSB0aGlzLnJhZGl1cy5ib3VuZHNcbiAgaWYob3V0KSB7XG4gICAgb3V0WzBdID0gTWF0aC5leHAoYm91bmRzWzBdWzBdKVxuICAgIG91dFsxXSA9IE1hdGguZXhwKGJvdW5kc1sxXVswXSlcbiAgICByZXR1cm4gb3V0XG4gIH1cbiAgcmV0dXJuIFsgTWF0aC5leHAoYm91bmRzWzBdWzBdKSwgTWF0aC5leHAoYm91bmRzWzFdWzBdKSBdXG59XG5cbnByb3RvLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlY2FsY01hdHJpeCh0aGlzLmxhc3RUKCkpXG4gIHJldHVybiB7XG4gICAgY2VudGVyOiAgIHRoaXMuY29tcHV0ZWRDZW50ZXIuc2xpY2UoKSxcbiAgICByb3RhdGlvbjogdGhpcy5jb21wdXRlZFJvdGF0aW9uLnNsaWNlKCksXG4gICAgZGlzdGFuY2U6IE1hdGgubG9nKHRoaXMuY29tcHV0ZWRSYWRpdXNbMF0pLFxuICAgIHpvb21NaW46ICB0aGlzLnJhZGl1cy5ib3VuZHNbMF1bMF0sXG4gICAgem9vbU1heDogIHRoaXMucmFkaXVzLmJvdW5kc1sxXVswXVxuICB9XG59XG5cbnByb3RvLmZyb21KU09OID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgdCA9IHRoaXMubGFzdFQoKVxuICB2YXIgYyA9IG9wdGlvbnMuY2VudGVyXG4gIGlmKGMpIHtcbiAgICB0aGlzLmNlbnRlci5zZXQodCwgY1swXSwgY1sxXSwgY1syXSlcbiAgfVxuICB2YXIgciA9IG9wdGlvbnMucm90YXRpb25cbiAgaWYocikge1xuICAgIHRoaXMucm90YXRpb24uc2V0KHQsIHJbMF0sIHJbMV0sIHJbMl0sIHJbM10pXG4gIH1cbiAgdmFyIGQgPSBvcHRpb25zLmRpc3RhbmNlXG4gIGlmKGQgJiYgZCA+IDApIHtcbiAgICB0aGlzLnJhZGl1cy5zZXQodCwgTWF0aC5sb2coZCkpXG4gIH1cbiAgdGhpcy5zZXREaXN0YW5jZUxpbWl0cyhvcHRpb25zLnpvb21NaW4sIG9wdGlvbnMuem9vbU1heClcbn1cblxuZnVuY3Rpb24gY3JlYXRlT3JiaXRDb250cm9sbGVyKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIGNlbnRlciAgID0gb3B0aW9ucy5jZW50ZXIgICB8fCBbMCwwLDBdXG4gIHZhciByb3RhdGlvbiA9IG9wdGlvbnMucm90YXRpb24gfHwgWzAsMCwwLDFdXG4gIHZhciByYWRpdXMgICA9IG9wdGlvbnMucmFkaXVzICAgfHwgMS4wXG5cbiAgY2VudGVyID0gW10uc2xpY2UuY2FsbChjZW50ZXIsIDAsIDMpXG4gIHJvdGF0aW9uID0gW10uc2xpY2UuY2FsbChyb3RhdGlvbiwgMCwgNClcbiAgbm9ybWFsaXplNChyb3RhdGlvbiwgcm90YXRpb24pXG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBPcmJpdENhbWVyYUNvbnRyb2xsZXIoXG4gICAgcm90YXRpb24sXG4gICAgY2VudGVyLFxuICAgIE1hdGgubG9nKHJhZGl1cykpXG5cbiAgcmVzdWx0LnNldERpc3RhbmNlTGltaXRzKG9wdGlvbnMuem9vbU1pbiwgb3B0aW9ucy56b29tTWF4KVxuXG4gIGlmKCdleWUnIGluIG9wdGlvbnMgfHwgJ3VwJyBpbiBvcHRpb25zKSB7XG4gICAgcmVzdWx0Lmxvb2tBdCgwLCBvcHRpb25zLmV5ZSwgb3B0aW9ucy5jZW50ZXIsIG9wdGlvbnMudXApXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59IiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcbnZhciB0aW55Y29sb3IgPSByZXF1aXJlKCd0aW55Y29sb3IyJyk7XG52YXIgcmdiYSA9IHJlcXVpcmUoJ2NvbG9yLW5vcm1hbGl6ZScpO1xuXG52YXIgQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpO1xudmFyIGNvbG9yRGZsdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29sb3IvYXR0cmlidXRlcycpLmRlZmF1bHRMaW5lO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2FycmF5JykuaXNBcnJheU9yVHlwZWRBcnJheTtcblxudmFyIGNvbG9yRGZsdFJnYmEgPSByZ2JhKGNvbG9yRGZsdCk7XG52YXIgb3BhY2l0eURmbHQgPSAxO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVDb2xvcihjb2xvckluLCBvcGFjaXR5SW4pIHtcbiAgICB2YXIgY29sb3JPdXQgPSBjb2xvckluO1xuICAgIGNvbG9yT3V0WzNdICo9IG9wYWNpdHlJbjtcbiAgICByZXR1cm4gY29sb3JPdXQ7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29sb3IoY29sb3JJbikge1xuICAgIGlmKGlzTnVtZXJpYyhjb2xvckluKSkgcmV0dXJuIGNvbG9yRGZsdFJnYmE7XG5cbiAgICB2YXIgY29sb3JPdXQgPSByZ2JhKGNvbG9ySW4pO1xuXG4gICAgcmV0dXJuIGNvbG9yT3V0Lmxlbmd0aCA/IGNvbG9yT3V0IDogY29sb3JEZmx0UmdiYTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVPcGFjaXR5KG9wYWNpdHlJbikge1xuICAgIHJldHVybiBpc051bWVyaWMob3BhY2l0eUluKSA/IG9wYWNpdHlJbiA6IG9wYWNpdHlEZmx0O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRDb2xvcihjb250YWluZXJJbiwgb3BhY2l0eUluLCBsZW4pIHtcbiAgICB2YXIgY29sb3JJbiA9IGNvbnRhaW5lckluLmNvbG9yO1xuICAgIHZhciBpc0FycmF5Q29sb3JJbiA9IGlzQXJyYXlPclR5cGVkQXJyYXkoY29sb3JJbik7XG4gICAgdmFyIGlzQXJyYXlPcGFjaXR5SW4gPSBpc0FycmF5T3JUeXBlZEFycmF5KG9wYWNpdHlJbik7XG4gICAgdmFyIGNPcHRzID0gQ29sb3JzY2FsZS5leHRyYWN0T3B0cyhjb250YWluZXJJbik7XG4gICAgdmFyIGNvbG9yT3V0ID0gW107XG5cbiAgICB2YXIgc2NsRnVuYywgZ2V0Q29sb3IsIGdldE9wYWNpdHksIGNvbG9yaSwgb3BhY2l0eWk7XG5cbiAgICBpZihjT3B0cy5jb2xvcnNjYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2NsRnVuYyA9IENvbG9yc2NhbGUubWFrZUNvbG9yU2NhbGVGdW5jRnJvbVRyYWNlKGNvbnRhaW5lckluKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzY2xGdW5jID0gdmFsaWRhdGVDb2xvcjtcbiAgICB9XG5cbiAgICBpZihpc0FycmF5Q29sb3JJbikge1xuICAgICAgICBnZXRDb2xvciA9IGZ1bmN0aW9uKGMsIGkpIHtcbiAgICAgICAgICAgIC8vIEZJWE1FOiB0aGVyZSBpcyBkb3VibGUgd29yaywgY29uc2lkZXJpbmcgdGhhdCBzY2xGdW5jIGRvZXMgdGhlIG9wcG9zaXRlXG4gICAgICAgICAgICByZXR1cm4gY1tpXSA9PT0gdW5kZWZpbmVkID8gY29sb3JEZmx0UmdiYSA6IHJnYmEoc2NsRnVuYyhjW2ldKSk7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGdldENvbG9yID0gdmFsaWRhdGVDb2xvcjtcblxuICAgIGlmKGlzQXJyYXlPcGFjaXR5SW4pIHtcbiAgICAgICAgZ2V0T3BhY2l0eSA9IGZ1bmN0aW9uKG8sIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBvW2ldID09PSB1bmRlZmluZWQgPyBvcGFjaXR5RGZsdCA6IHZhbGlkYXRlT3BhY2l0eShvW2ldKTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgZ2V0T3BhY2l0eSA9IHZhbGlkYXRlT3BhY2l0eTtcblxuICAgIGlmKGlzQXJyYXlDb2xvckluIHx8IGlzQXJyYXlPcGFjaXR5SW4pIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb2xvcmkgPSBnZXRDb2xvcihjb2xvckluLCBpKTtcbiAgICAgICAgICAgIG9wYWNpdHlpID0gZ2V0T3BhY2l0eShvcGFjaXR5SW4sIGkpO1xuICAgICAgICAgICAgY29sb3JPdXRbaV0gPSBjYWxjdWxhdGVDb2xvcihjb2xvcmksIG9wYWNpdHlpKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBjb2xvck91dCA9IGNhbGN1bGF0ZUNvbG9yKHJnYmEoY29sb3JJbiksIG9wYWNpdHlJbik7XG5cbiAgICByZXR1cm4gY29sb3JPdXQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29sb3JTY2FsZShjb250LCBhbHBoYSkge1xuICAgIGlmKGFscGhhID09PSB1bmRlZmluZWQpIGFscGhhID0gMTtcblxuICAgIHZhciBjT3B0cyA9IENvbG9yc2NhbGUuZXh0cmFjdE9wdHMoY29udCk7XG5cbiAgICB2YXIgY29sb3JzY2FsZSA9IGNPcHRzLnJldmVyc2VzY2FsZSA/XG4gICAgICAgIENvbG9yc2NhbGUuZmxpcFNjYWxlKGNPcHRzLmNvbG9yc2NhbGUpIDpcbiAgICAgICAgY09wdHMuY29sb3JzY2FsZTtcblxuICAgIHJldHVybiBjb2xvcnNjYWxlLm1hcChmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGVsZW1bMF07XG4gICAgICAgIHZhciBjb2xvciA9IHRpbnljb2xvcihlbGVtWzFdKTtcbiAgICAgICAgdmFyIHJnYiA9IGNvbG9yLnRvUmdiKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICByZ2I6IFtyZ2IuciwgcmdiLmcsIHJnYi5iLCBhbHBoYV1cbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0Q29sb3I6IGZvcm1hdENvbG9yLFxuICAgIHBhcnNlQ29sb3JTY2FsZTogcGFyc2VDb2xvclNjYWxlXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBvdmVycmlkZUFsbCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL2VkaXRfdHlwZXMnKS5vdmVycmlkZUFsbDtcbnZhciBmeEF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meC9sYXlvdXRfYXR0cmlidXRlcycpO1xuXG52YXIgU2NlbmUgPSByZXF1aXJlKCcuL3NjZW5lJyk7XG52YXIgZ2V0U3VicGxvdERhdGEgPSByZXF1aXJlKCcuLi9nZXRfZGF0YScpLmdldFN1YnBsb3REYXRhO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHhtbG5zTmFtZXNwYWNlcyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy94bWxuc19uYW1lc3BhY2VzJyk7XG5cbnZhciBHTDNEID0gJ2dsM2QnO1xudmFyIFNDRU5FID0gJ3NjZW5lJztcblxuXG5leHBvcnRzLm5hbWUgPSBHTDNEO1xuXG5leHBvcnRzLmF0dHIgPSBTQ0VORTtcblxuZXhwb3J0cy5pZFJvb3QgPSBTQ0VORTtcblxuZXhwb3J0cy5pZFJlZ2V4ID0gZXhwb3J0cy5hdHRyUmVnZXggPSBMaWIuY291bnRlclJlZ2V4KCdzY2VuZScpO1xuXG5leHBvcnRzLmF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dC9hdHRyaWJ1dGVzJyk7XG5cbmV4cG9ydHMubGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vbGF5b3V0L2xheW91dF9hdHRyaWJ1dGVzJyk7XG5cbmV4cG9ydHMuYmFzZUxheW91dEF0dHJPdmVycmlkZXMgPSBvdmVycmlkZUFsbCh7XG4gICAgaG92ZXJsYWJlbDogZnhBdHRycy5ob3ZlcmxhYmVsXG59LCAncGxvdCcsICduZXN0ZWQnKTtcblxuZXhwb3J0cy5zdXBwbHlMYXlvdXREZWZhdWx0cyA9IHJlcXVpcmUoJy4vbGF5b3V0L2RlZmF1bHRzJyk7XG5cbmV4cG9ydHMucGxvdCA9IGZ1bmN0aW9uIHBsb3QoZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBmdWxsRGF0YSA9IGdkLl9mdWxsRGF0YTtcbiAgICB2YXIgc2NlbmVJZHMgPSBmdWxsTGF5b3V0Ll9zdWJwbG90c1tHTDNEXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzY2VuZUlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc2NlbmVJZCA9IHNjZW5lSWRzW2ldO1xuICAgICAgICB2YXIgZnVsbFNjZW5lRGF0YSA9IGdldFN1YnBsb3REYXRhKGZ1bGxEYXRhLCBHTDNELCBzY2VuZUlkKTtcbiAgICAgICAgdmFyIHNjZW5lTGF5b3V0ID0gZnVsbExheW91dFtzY2VuZUlkXTtcbiAgICAgICAgdmFyIGNhbWVyYSA9IHNjZW5lTGF5b3V0LmNhbWVyYTtcbiAgICAgICAgdmFyIHNjZW5lID0gc2NlbmVMYXlvdXQuX3NjZW5lO1xuXG4gICAgICAgIGlmKCFzY2VuZSkge1xuICAgICAgICAgICAgc2NlbmUgPSBuZXcgU2NlbmUoe1xuICAgICAgICAgICAgICAgIGlkOiBzY2VuZUlkLFxuICAgICAgICAgICAgICAgIGdyYXBoRGl2OiBnZCxcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IGdkLnF1ZXJ5U2VsZWN0b3IoJy5nbC1jb250YWluZXInKSxcbiAgICAgICAgICAgICAgICBzdGF0aWNQbG90OiBnZC5fY29udGV4dC5zdGF0aWNQbG90LFxuICAgICAgICAgICAgICAgIHBsb3RHbFBpeGVsUmF0aW86IGdkLl9jb250ZXh0LnBsb3RHbFBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgY2FtZXJhOiBjYW1lcmFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVsbExheW91dFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gc2V0IHJlZiB0byBTY2VuZSBpbnN0YW5jZVxuICAgICAgICAgICAgc2NlbmVMYXlvdXQuX3NjZW5lID0gc2NlbmU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzYXZlICdpbml0aWFsJyBjYW1lcmEgdmlldyBzZXR0aW5ncyBmb3IgbW9kZWJhciBidXR0b25cbiAgICAgICAgaWYoIXNjZW5lLnZpZXdJbml0aWFsKSB7XG4gICAgICAgICAgICBzY2VuZS52aWV3SW5pdGlhbCA9IHtcbiAgICAgICAgICAgICAgICB1cDoge1xuICAgICAgICAgICAgICAgICAgICB4OiBjYW1lcmEudXAueCxcbiAgICAgICAgICAgICAgICAgICAgeTogY2FtZXJhLnVwLnksXG4gICAgICAgICAgICAgICAgICAgIHo6IGNhbWVyYS51cC56XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleWU6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogY2FtZXJhLmV5ZS54LFxuICAgICAgICAgICAgICAgICAgICB5OiBjYW1lcmEuZXllLnksXG4gICAgICAgICAgICAgICAgICAgIHo6IGNhbWVyYS5leWUuelxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2VudGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGNhbWVyYS5jZW50ZXIueCxcbiAgICAgICAgICAgICAgICAgICAgeTogY2FtZXJhLmNlbnRlci55LFxuICAgICAgICAgICAgICAgICAgICB6OiBjYW1lcmEuY2VudGVyLnpcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc2NlbmUucGxvdChmdWxsU2NlbmVEYXRhLCBmdWxsTGF5b3V0LCBnZC5sYXlvdXQpO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuY2xlYW4gPSBmdW5jdGlvbihuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgb2xkU2NlbmVLZXlzID0gb2xkRnVsbExheW91dC5fc3VicGxvdHNbR0wzRF0gfHwgW107XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2xkU2NlbmVLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvbGRTY2VuZUtleSA9IG9sZFNjZW5lS2V5c1tpXTtcblxuICAgICAgICBpZighbmV3RnVsbExheW91dFtvbGRTY2VuZUtleV0gJiYgISFvbGRGdWxsTGF5b3V0W29sZFNjZW5lS2V5XS5fc2NlbmUpIHtcbiAgICAgICAgICAgIG9sZEZ1bGxMYXlvdXRbb2xkU2NlbmVLZXldLl9zY2VuZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgIGlmKG9sZEZ1bGxMYXlvdXQuX2luZm9sYXllcikge1xuICAgICAgICAgICAgICAgIG9sZEZ1bGxMYXlvdXQuX2luZm9sYXllclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcuYW5ub3RhdGlvbi0nICsgb2xkU2NlbmVLZXkpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydHMudG9TVkcgPSBmdW5jdGlvbihnZCkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIHNjZW5lSWRzID0gZnVsbExheW91dC5fc3VicGxvdHNbR0wzRF07XG4gICAgdmFyIHNpemUgPSBmdWxsTGF5b3V0Ll9zaXplO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHNjZW5lSWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzY2VuZUxheW91dCA9IGZ1bGxMYXlvdXRbc2NlbmVJZHNbaV1dO1xuICAgICAgICB2YXIgZG9tYWluID0gc2NlbmVMYXlvdXQuZG9tYWluO1xuICAgICAgICB2YXIgc2NlbmUgPSBzY2VuZUxheW91dC5fc2NlbmU7XG5cbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IHNjZW5lLnRvSW1hZ2UoJ3BuZycpO1xuICAgICAgICB2YXIgaW1hZ2UgPSBmdWxsTGF5b3V0Ll9nbGltYWdlcy5hcHBlbmQoJ3N2ZzppbWFnZScpO1xuXG4gICAgICAgIGltYWdlLmF0dHIoe1xuICAgICAgICAgICAgeG1sbnM6IHhtbG5zTmFtZXNwYWNlcy5zdmcsXG4gICAgICAgICAgICAneGxpbms6aHJlZic6IGltYWdlRGF0YSxcbiAgICAgICAgICAgIHg6IHNpemUubCArIHNpemUudyAqIGRvbWFpbi54WzBdLFxuICAgICAgICAgICAgeTogc2l6ZS50ICsgc2l6ZS5oICogKDEgLSBkb21haW4ueVsxXSksXG4gICAgICAgICAgICB3aWR0aDogc2l6ZS53ICogKGRvbWFpbi54WzFdIC0gZG9tYWluLnhbMF0pLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmggKiAoZG9tYWluLnlbMV0gLSBkb21haW4ueVswXSksXG4gICAgICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiAnbm9uZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NlbmUuZGVzdHJveSgpO1xuICAgIH1cbn07XG5cbi8vIGNsZWFuIHNjZW5lIGlkcywgJ3NjZW5lMScgLT4gJ3NjZW5lJ1xuZXhwb3J0cy5jbGVhbklkID0gZnVuY3Rpb24gY2xlYW5JZChpZCkge1xuICAgIGlmKCFpZC5tYXRjaCgvXnNjZW5lWzAtOV0qJC8pKSByZXR1cm47XG5cbiAgICB2YXIgc2NlbmVOdW0gPSBpZC5zdWJzdHIoNSk7XG4gICAgaWYoc2NlbmVOdW0gPT09ICcxJykgc2NlbmVOdW0gPSAnJztcblxuICAgIHJldHVybiBTQ0VORSArIHNjZW5lTnVtO1xufTtcblxuZXhwb3J0cy51cGRhdGVGeCA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgc3VicGxvdElkcyA9IGZ1bGxMYXlvdXQuX3N1YnBsb3RzW0dMM0RdO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHN1YnBsb3RJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHN1YnBsb3RPYmogPSBmdWxsTGF5b3V0W3N1YnBsb3RJZHNbaV1dLl9zY2VuZTtcbiAgICAgICAgc3VicGxvdE9iai51cGRhdGVGeChmdWxsTGF5b3V0LmRyYWdtb2RlLCBmdWxsTGF5b3V0LmhvdmVybW9kZSk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzY2VuZToge1xuICAgICAgICB2YWxUeXBlOiAnc3VicGxvdGlkJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnc2NlbmUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgYSByZWZlcmVuY2UgYmV0d2VlbiB0aGlzIHRyYWNlXFwncyAzRCBjb29yZGluYXRlIHN5c3RlbSBhbmQnLFxuICAgICAgICAgICAgJ2EgM0Qgc2NlbmUuJyxcbiAgICAgICAgICAgICdJZiAqc2NlbmUqICh0aGUgZGVmYXVsdCB2YWx1ZSksIHRoZSAoeCx5LHopIGNvb3JkaW5hdGVzIHJlZmVyIHRvJyxcbiAgICAgICAgICAgICdgbGF5b3V0LnNjZW5lYC4nLFxuICAgICAgICAgICAgJ0lmICpzY2VuZTIqLCB0aGUgKHgseSx6KSBjb29yZGluYXRlcyByZWZlciB0byBgbGF5b3V0LnNjZW5lMmAsJyxcbiAgICAgICAgICAgICdhbmQgc28gb24uJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBheGVzQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jYXJ0ZXNpYW4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG52YXIgb3ZlcnJpZGVBbGwgPSByZXF1aXJlKCcuLi8uLi8uLi9wbG90X2FwaS9lZGl0X3R5cGVzJykub3ZlcnJpZGVBbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlcnJpZGVBbGwoe1xuICAgIHZpc2libGU6IGF4ZXNBdHRycy52aXNpYmxlLFxuICAgIHNob3dzcGlrZXM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB3aGV0aGVyIG9yIG5vdCBzcGlrZXMgc3RhcnRpbmcgZnJvbScsXG4gICAgICAgICAgICAnZGF0YSBwb2ludHMgdG8gdGhpcyBheGlzXFwnIHdhbGwgYXJlIHNob3duIG9uIGhvdmVyLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHNwaWtlc2lkZXM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB3aGV0aGVyIG9yIG5vdCBzcGlrZXMgZXh0ZW5kaW5nIGZyb20gdGhlJyxcbiAgICAgICAgICAgICdwcm9qZWN0aW9uIGRhdGEgcG9pbnRzIHRvIHRoaXMgYXhpc1xcJyB3YWxsIGJvdW5kYXJpZXMnLFxuICAgICAgICAgICAgJ2FyZSBzaG93biBvbiBob3Zlci4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBzcGlrZXRoaWNrbmVzczoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBkZmx0OiAyLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHRoaWNrbmVzcyAoaW4gcHgpIG9mIHRoZSBzcGlrZXMuJ1xuICAgIH0sXG4gICAgc3Bpa2Vjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBkZmx0OiBDb2xvci5kZWZhdWx0TGluZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgc3Bpa2VzLidcbiAgICB9LFxuICAgIHNob3diYWNrZ3JvdW5kOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHdoZXRoZXIgb3Igbm90IHRoaXMgYXhpc1xcJyB3YWxsJyxcbiAgICAgICAgICAgICdoYXMgYSBiYWNrZ3JvdW5kIGNvbG9yLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJhY2tncm91bmRjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBkZmx0OiAncmdiYSgyMDQsIDIwNCwgMjA0LCAwLjUpJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoaXMgYXhpc1xcJyB3YWxsLidcbiAgICB9LFxuICAgIHNob3dheGVzbGFiZWxzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgd2hldGhlciBvciBub3QgdGhpcyBheGlzIGlzIGxhYmVsZWQnXG4gICAgfSxcbiAgICBjb2xvcjogYXhlc0F0dHJzLmNvbG9yLFxuICAgIGNhdGVnb3J5b3JkZXI6IGF4ZXNBdHRycy5jYXRlZ29yeW9yZGVyLFxuICAgIGNhdGVnb3J5YXJyYXk6IGF4ZXNBdHRycy5jYXRlZ29yeWFycmF5LFxuICAgIHRpdGxlOiB7XG4gICAgICAgIHRleHQ6IGF4ZXNBdHRycy50aXRsZS50ZXh0LFxuICAgICAgICBmb250OiBheGVzQXR0cnMudGl0bGUuZm9udFxuICAgIH0sXG4gICAgdHlwZTogZXh0ZW5kRmxhdCh7fSwgYXhlc0F0dHJzLnR5cGUsIHtcbiAgICAgICAgdmFsdWVzOiBbJy0nLCAnbGluZWFyJywgJ2xvZycsICdkYXRlJywgJ2NhdGVnb3J5J11cbiAgICB9KSxcbiAgICBhdXRvcmFuZ2U6IGF4ZXNBdHRycy5hdXRvcmFuZ2UsXG4gICAgcmFuZ2Vtb2RlOiBheGVzQXR0cnMucmFuZ2Vtb2RlLFxuICAgIHJhbmdlOiBleHRlbmRGbGF0KHt9LCBheGVzQXR0cnMucmFuZ2UsIHtcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnYW55JywgZWRpdFR5cGU6ICdwbG90JywgaW1wbGllZEVkaXRzOiB7J15hdXRvcmFuZ2UnOiBmYWxzZX19LFxuICAgICAgICAgICAge3ZhbFR5cGU6ICdhbnknLCBlZGl0VHlwZTogJ3Bsb3QnLCBpbXBsaWVkRWRpdHM6IHsnXmF1dG9yYW5nZSc6IGZhbHNlfX1cbiAgICAgICAgXSxcbiAgICAgICAgYW5pbTogZmFsc2VcbiAgICB9KSxcbiAgICAvLyB0aWNrc1xuICAgIHRpY2ttb2RlOiBheGVzQXR0cnMudGlja21vZGUsXG4gICAgbnRpY2tzOiBheGVzQXR0cnMubnRpY2tzLFxuICAgIHRpY2swOiBheGVzQXR0cnMudGljazAsXG4gICAgZHRpY2s6IGF4ZXNBdHRycy5kdGljayxcbiAgICB0aWNrdmFsczogYXhlc0F0dHJzLnRpY2t2YWxzLFxuICAgIHRpY2t0ZXh0OiBheGVzQXR0cnMudGlja3RleHQsXG4gICAgdGlja3M6IGF4ZXNBdHRycy50aWNrcyxcbiAgICBtaXJyb3I6IGF4ZXNBdHRycy5taXJyb3IsXG4gICAgdGlja2xlbjogYXhlc0F0dHJzLnRpY2tsZW4sXG4gICAgdGlja3dpZHRoOiBheGVzQXR0cnMudGlja3dpZHRoLFxuICAgIHRpY2tjb2xvcjogYXhlc0F0dHJzLnRpY2tjb2xvcixcbiAgICBzaG93dGlja2xhYmVsczogYXhlc0F0dHJzLnNob3d0aWNrbGFiZWxzLFxuICAgIHRpY2tmb250OiBheGVzQXR0cnMudGlja2ZvbnQsXG4gICAgdGlja2FuZ2xlOiBheGVzQXR0cnMudGlja2FuZ2xlLFxuICAgIHRpY2twcmVmaXg6IGF4ZXNBdHRycy50aWNrcHJlZml4LFxuICAgIHNob3d0aWNrcHJlZml4OiBheGVzQXR0cnMuc2hvd3RpY2twcmVmaXgsXG4gICAgdGlja3N1ZmZpeDogYXhlc0F0dHJzLnRpY2tzdWZmaXgsXG4gICAgc2hvd3RpY2tzdWZmaXg6IGF4ZXNBdHRycy5zaG93dGlja3N1ZmZpeCxcbiAgICBzaG93ZXhwb25lbnQ6IGF4ZXNBdHRycy5zaG93ZXhwb25lbnQsXG4gICAgZXhwb25lbnRmb3JtYXQ6IGF4ZXNBdHRycy5leHBvbmVudGZvcm1hdCxcbiAgICBzZXBhcmF0ZXRob3VzYW5kczogYXhlc0F0dHJzLnNlcGFyYXRldGhvdXNhbmRzLFxuICAgIHRpY2tmb3JtYXQ6IGF4ZXNBdHRycy50aWNrZm9ybWF0LFxuICAgIHRpY2tmb3JtYXRzdG9wczogYXhlc0F0dHJzLnRpY2tmb3JtYXRzdG9wcyxcbiAgICBob3ZlcmZvcm1hdDogYXhlc0F0dHJzLmhvdmVyZm9ybWF0LFxuICAgIC8vIGxpbmVzIGFuZCBncmlkc1xuICAgIHNob3dsaW5lOiBheGVzQXR0cnMuc2hvd2xpbmUsXG4gICAgbGluZWNvbG9yOiBheGVzQXR0cnMubGluZWNvbG9yLFxuICAgIGxpbmV3aWR0aDogYXhlc0F0dHJzLmxpbmV3aWR0aCxcbiAgICBzaG93Z3JpZDogYXhlc0F0dHJzLnNob3dncmlkLFxuICAgIGdyaWRjb2xvcjogZXh0ZW5kRmxhdCh7fSwgYXhlc0F0dHJzLmdyaWRjb2xvciwgIC8vIHNob3VsZG4ndCB0aGlzIGJlIG9uLXBhciB3aXRoIDJEP1xuICAgICAgICB7ZGZsdDogJ3JnYigyMDQsIDIwNCwgMjA0KSd9KSxcbiAgICBncmlkd2lkdGg6IGF4ZXNBdHRycy5ncmlkd2lkdGgsXG4gICAgemVyb2xpbmU6IGF4ZXNBdHRycy56ZXJvbGluZSxcbiAgICB6ZXJvbGluZWNvbG9yOiBheGVzQXR0cnMuemVyb2xpbmVjb2xvcixcbiAgICB6ZXJvbGluZXdpZHRoOiBheGVzQXR0cnMuemVyb2xpbmV3aWR0aCxcbiAgICBfZGVwcmVjYXRlZDoge1xuICAgICAgICB0aXRsZTogYXhlc0F0dHJzLl9kZXByZWNhdGVkLnRpdGxlLFxuICAgICAgICB0aXRsZWZvbnQ6IGF4ZXNBdHRycy5fZGVwcmVjYXRlZC50aXRsZWZvbnRcbiAgICB9XG59LCAncGxvdCcsICdmcm9tLXJvb3QnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3JNaXggPSByZXF1aXJlKCd0aW55Y29sb3IyJykubWl4O1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vLi4vbGliJyk7XG52YXIgVGVtcGxhdGUgPSByZXF1aXJlKCcuLi8uLi8uLi9wbG90X2FwaS9wbG90X3RlbXBsYXRlJyk7XG5cbnZhciBsYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9heGlzX2F0dHJpYnV0ZXMnKTtcbnZhciBoYW5kbGVUeXBlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jYXJ0ZXNpYW4vdHlwZV9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUF4aXNEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NhcnRlc2lhbi9heGlzX2RlZmF1bHRzJyk7XG5cbnZhciBheGVzTmFtZXMgPSBbJ3hheGlzJywgJ3lheGlzJywgJ3pheGlzJ107XG5cbi8vIFRPRE86IGhhcmQtY29kZWQgbGlnaHRuZXNzIGZyYWN0aW9uIGJhc2VkIG9uIGdyaWRsaW5lIGRlZmF1bHQgY29sb3JzXG4vLyB0aGF0IGRpZmZlciBmcm9tIG90aGVyIHN1YnBsb3QgdHlwZXMuXG52YXIgZ3JpZExpZ2h0bmVzcyA9IDEwMCAqICgyMDQgLSAweDQ0KSAvICgyNTUgLSAweDQ0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlMYXlvdXREZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0LCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRhaW5lckluLCBjb250YWluZXJPdXQ7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBsYXlvdXRBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGogPSAwOyBqIDwgYXhlc05hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBheE5hbWUgPSBheGVzTmFtZXNbal07XG4gICAgICAgIGNvbnRhaW5lckluID0gbGF5b3V0SW5bYXhOYW1lXSB8fCB7fTtcblxuICAgICAgICBjb250YWluZXJPdXQgPSBUZW1wbGF0ZS5uZXdDb250YWluZXIobGF5b3V0T3V0LCBheE5hbWUpO1xuICAgICAgICBjb250YWluZXJPdXQuX2lkID0gYXhOYW1lWzBdICsgb3B0aW9ucy5zY2VuZTtcbiAgICAgICAgY29udGFpbmVyT3V0Ll9uYW1lID0gYXhOYW1lO1xuXG4gICAgICAgIGhhbmRsZVR5cGVEZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBjb2VyY2UsIG9wdGlvbnMpO1xuXG4gICAgICAgIGhhbmRsZUF4aXNEZWZhdWx0cyhcbiAgICAgICAgICAgIGNvbnRhaW5lckluLFxuICAgICAgICAgICAgY29udGFpbmVyT3V0LFxuICAgICAgICAgICAgY29lcmNlLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvbnQ6IG9wdGlvbnMuZm9udCxcbiAgICAgICAgICAgICAgICBsZXR0ZXI6IGF4TmFtZVswXSxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0dyaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbm9UaWNrc29uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJnQ29sb3I6IG9wdGlvbnMuYmdDb2xvcixcbiAgICAgICAgICAgICAgICBjYWxlbmRhcjogb3B0aW9ucy5jYWxlbmRhclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbnMuZnVsbExheW91dCk7XG5cbiAgICAgICAgY29lcmNlKCdncmlkY29sb3InLCBjb2xvck1peChjb250YWluZXJPdXQuY29sb3IsIG9wdGlvbnMuYmdDb2xvciwgZ3JpZExpZ2h0bmVzcykudG9SZ2JTdHJpbmcoKSk7XG4gICAgICAgIGNvZXJjZSgndGl0bGUudGV4dCcsIGF4TmFtZVswXSk7ICAvLyBzaG91bGRuJ3QgdGhpcyBiZSBvbi1wYXIgd2l0aCAyRD9cblxuICAgICAgICBjb250YWluZXJPdXQuc2V0U2NhbGUgPSBMaWIubm9vcDtcblxuICAgICAgICBpZihjb2VyY2UoJ3Nob3dzcGlrZXMnKSkge1xuICAgICAgICAgICAgY29lcmNlKCdzcGlrZXNpZGVzJyk7XG4gICAgICAgICAgICBjb2VyY2UoJ3NwaWtldGhpY2tuZXNzJyk7XG4gICAgICAgICAgICBjb2VyY2UoJ3NwaWtlY29sb3InLCBjb250YWluZXJPdXQuY29sb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29lcmNlKCdzaG93YXhlc2xhYmVscycpO1xuICAgICAgICBpZihjb2VyY2UoJ3Nob3diYWNrZ3JvdW5kJykpIGNvZXJjZSgnYmFja2dyb3VuZGNvbG9yJyk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cjJSZ2JhQXJyYXkgPSByZXF1aXJlKCcuLi8uLi8uLi9saWIvc3RyMnJnYmFycmF5Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vLi4vbGliJyk7XG5cbnZhciBBWEVTX05BTUVTID0gWyd4YXhpcycsICd5YXhpcycsICd6YXhpcyddO1xuXG5mdW5jdGlvbiBBeGVzT3B0aW9ucygpIHtcbiAgICB0aGlzLmJvdW5kcyA9IFtcbiAgICAgICAgWy0xMCwgLTEwLCAtMTBdLFxuICAgICAgICBbMTAsIDEwLCAxMF1cbiAgICBdO1xuXG4gICAgdGhpcy50aWNrcyA9IFsgW10sIFtdLCBbXSBdO1xuICAgIHRoaXMudGlja0VuYWJsZSA9IFsgdHJ1ZSwgdHJ1ZSwgdHJ1ZSBdO1xuICAgIHRoaXMudGlja0ZvbnQgPSBbICdzYW5zLXNlcmlmJywgJ3NhbnMtc2VyaWYnLCAnc2Fucy1zZXJpZicgXTtcbiAgICB0aGlzLnRpY2tTaXplID0gWyAxMiwgMTIsIDEyIF07XG4gICAgdGhpcy50aWNrQW5nbGUgPSBbIDAsIDAsIDAgXTtcbiAgICB0aGlzLnRpY2tDb2xvciA9IFsgWzAsIDAsIDAsIDFdLCBbMCwgMCwgMCwgMV0sIFswLCAwLCAwLCAxXSBdO1xuICAgIHRoaXMudGlja1BhZCA9IFsgMTgsIDE4LCAxOCBdO1xuXG4gICAgdGhpcy5sYWJlbHMgPSBbICd4JywgJ3knLCAneicgXTtcbiAgICB0aGlzLmxhYmVsRW5hYmxlID0gWyB0cnVlLCB0cnVlLCB0cnVlIF07XG4gICAgdGhpcy5sYWJlbEZvbnQgPSBbJ09wZW4gU2FucycsICdPcGVuIFNhbnMnLCAnT3BlbiBTYW5zJ107XG4gICAgdGhpcy5sYWJlbFNpemUgPSBbIDIwLCAyMCwgMjAgXTtcbiAgICB0aGlzLmxhYmVsQ29sb3IgPSBbIFswLCAwLCAwLCAxXSwgWzAsIDAsIDAsIDFdLCBbMCwgMCwgMCwgMV0gXTtcbiAgICB0aGlzLmxhYmVsUGFkID0gWyAzMCwgMzAsIDMwIF07XG5cbiAgICB0aGlzLmxpbmVFbmFibGUgPSBbIHRydWUsIHRydWUsIHRydWUgXTtcbiAgICB0aGlzLmxpbmVNaXJyb3IgPSBbIGZhbHNlLCBmYWxzZSwgZmFsc2UgXTtcbiAgICB0aGlzLmxpbmVXaWR0aCA9IFsgMSwgMSwgMSBdO1xuICAgIHRoaXMubGluZUNvbG9yID0gWyBbMCwgMCwgMCwgMV0sIFswLCAwLCAwLCAxXSwgWzAsIDAsIDAsIDFdIF07XG5cbiAgICB0aGlzLmxpbmVUaWNrRW5hYmxlID0gWyB0cnVlLCB0cnVlLCB0cnVlIF07XG4gICAgdGhpcy5saW5lVGlja01pcnJvciA9IFsgZmFsc2UsIGZhbHNlLCBmYWxzZSBdO1xuICAgIHRoaXMubGluZVRpY2tMZW5ndGggPSBbIDEwLCAxMCwgMTAgXTtcbiAgICB0aGlzLmxpbmVUaWNrV2lkdGggPSBbIDEsIDEsIDEgXTtcbiAgICB0aGlzLmxpbmVUaWNrQ29sb3IgPSBbIFswLCAwLCAwLCAxXSwgWzAsIDAsIDAsIDFdLCBbMCwgMCwgMCwgMV0gXTtcblxuICAgIHRoaXMuZ3JpZEVuYWJsZSA9IFsgdHJ1ZSwgdHJ1ZSwgdHJ1ZSBdO1xuICAgIHRoaXMuZ3JpZFdpZHRoID0gWyAxLCAxLCAxIF07XG4gICAgdGhpcy5ncmlkQ29sb3IgPSBbIFswLCAwLCAwLCAxXSwgWzAsIDAsIDAsIDFdLCBbMCwgMCwgMCwgMV0gXTtcblxuICAgIHRoaXMuemVyb0VuYWJsZSA9IFsgdHJ1ZSwgdHJ1ZSwgdHJ1ZSBdO1xuICAgIHRoaXMuemVyb0xpbmVDb2xvciA9IFsgWzAsIDAsIDAsIDFdLCBbMCwgMCwgMCwgMV0sIFswLCAwLCAwLCAxXSBdO1xuICAgIHRoaXMuemVyb0xpbmVXaWR0aCA9IFsgMiwgMiwgMiBdO1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRW5hYmxlID0gWyB0cnVlLCB0cnVlLCB0cnVlIF07XG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBbIFswLjgsIDAuOCwgMC44LCAwLjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWzAuOCwgMC44LCAwLjgsIDAuNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbMC44LCAwLjgsIDAuOCwgMC41XSBdO1xuXG4gICAgLy8gc29tZSBkZWZhdWx0IHZhbHVlcyBhcmUgc3RvcmVkIGZvciBhcHBseWluZyBtb2RlbCB0cmFuc2Zvcm1zXG4gICAgdGhpcy5fZGVmYXVsdFRpY2tQYWQgPSB0aGlzLnRpY2tQYWQuc2xpY2UoKTtcbiAgICB0aGlzLl9kZWZhdWx0TGFiZWxQYWQgPSB0aGlzLmxhYmVsUGFkLnNsaWNlKCk7XG4gICAgdGhpcy5fZGVmYXVsdExpbmVUaWNrTGVuZ3RoID0gdGhpcy5saW5lVGlja0xlbmd0aC5zbGljZSgpO1xufVxuXG52YXIgcHJvdG8gPSBBeGVzT3B0aW9ucy5wcm90b3R5cGU7XG5cbnByb3RvLm1lcmdlID0gZnVuY3Rpb24oZnVsbExheW91dCwgc2NlbmVMYXlvdXQpIHtcbiAgICB2YXIgb3B0cyA9IHRoaXM7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IDM7ICsraSkge1xuICAgICAgICB2YXIgYXhlcyA9IHNjZW5lTGF5b3V0W0FYRVNfTkFNRVNbaV1dO1xuXG4gICAgICAgIGlmKCFheGVzLnZpc2libGUpIHtcbiAgICAgICAgICAgIG9wdHMudGlja0VuYWJsZVtpXSA9IGZhbHNlO1xuICAgICAgICAgICAgb3B0cy5sYWJlbEVuYWJsZVtpXSA9IGZhbHNlO1xuICAgICAgICAgICAgb3B0cy5saW5lRW5hYmxlW2ldID0gZmFsc2U7XG4gICAgICAgICAgICBvcHRzLmxpbmVUaWNrRW5hYmxlW2ldID0gZmFsc2U7XG4gICAgICAgICAgICBvcHRzLmdyaWRFbmFibGVbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgIG9wdHMuemVyb0VuYWJsZVtpXSA9IGZhbHNlO1xuICAgICAgICAgICAgb3B0cy5iYWNrZ3JvdW5kRW5hYmxlW2ldID0gZmFsc2U7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF4ZXMgbGFiZWxzXG4gICAgICAgIG9wdHMubGFiZWxzW2ldID0gZnVsbExheW91dC5fbWV0YSA/XG4gICAgICAgICAgICBMaWIudGVtcGxhdGVTdHJpbmcoYXhlcy50aXRsZS50ZXh0LCBmdWxsTGF5b3V0Ll9tZXRhKSA6XG4gICAgICAgICAgICBheGVzLnRpdGxlLnRleHQ7XG5cbiAgICAgICAgaWYoJ2ZvbnQnIGluIGF4ZXMudGl0bGUpIHtcbiAgICAgICAgICAgIGlmKGF4ZXMudGl0bGUuZm9udC5jb2xvcikgb3B0cy5sYWJlbENvbG9yW2ldID0gc3RyMlJnYmFBcnJheShheGVzLnRpdGxlLmZvbnQuY29sb3IpO1xuICAgICAgICAgICAgaWYoYXhlcy50aXRsZS5mb250LmZhbWlseSkgb3B0cy5sYWJlbEZvbnRbaV0gPSBheGVzLnRpdGxlLmZvbnQuZmFtaWx5O1xuICAgICAgICAgICAgaWYoYXhlcy50aXRsZS5mb250LnNpemUpIG9wdHMubGFiZWxTaXplW2ldID0gYXhlcy50aXRsZS5mb250LnNpemU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMaW5lc1xuICAgICAgICBpZignc2hvd2xpbmUnIGluIGF4ZXMpIG9wdHMubGluZUVuYWJsZVtpXSA9IGF4ZXMuc2hvd2xpbmU7XG4gICAgICAgIGlmKCdsaW5lY29sb3InIGluIGF4ZXMpIG9wdHMubGluZUNvbG9yW2ldID0gc3RyMlJnYmFBcnJheShheGVzLmxpbmVjb2xvcik7XG4gICAgICAgIGlmKCdsaW5ld2lkdGgnIGluIGF4ZXMpIG9wdHMubGluZVdpZHRoW2ldID0gYXhlcy5saW5ld2lkdGg7XG5cbiAgICAgICAgaWYoJ3Nob3dncmlkJyBpbiBheGVzKSBvcHRzLmdyaWRFbmFibGVbaV0gPSBheGVzLnNob3dncmlkO1xuICAgICAgICBpZignZ3JpZGNvbG9yJyBpbiBheGVzKSBvcHRzLmdyaWRDb2xvcltpXSA9IHN0cjJSZ2JhQXJyYXkoYXhlcy5ncmlkY29sb3IpO1xuICAgICAgICBpZignZ3JpZHdpZHRoJyBpbiBheGVzKSBvcHRzLmdyaWRXaWR0aFtpXSA9IGF4ZXMuZ3JpZHdpZHRoO1xuXG4gICAgICAgIC8vIFJlbW92ZSB6ZXJvbGluZSBpZiBheGlzIHR5cGUgaXMgbG9nXG4gICAgICAgIC8vIG90aGVyd2lzZSB0aGUgemVyb2xpbmUgaXMgaW5jb3JyZWN0bHkgZHJhd24gYXQgMSBvbiBsb2cgYXhlc1xuICAgICAgICBpZihheGVzLnR5cGUgPT09ICdsb2cnKSBvcHRzLnplcm9FbmFibGVbaV0gPSBmYWxzZTtcbiAgICAgICAgZWxzZSBpZignemVyb2xpbmUnIGluIGF4ZXMpIG9wdHMuemVyb0VuYWJsZVtpXSA9IGF4ZXMuemVyb2xpbmU7XG4gICAgICAgIGlmKCd6ZXJvbGluZWNvbG9yJyBpbiBheGVzKSBvcHRzLnplcm9MaW5lQ29sb3JbaV0gPSBzdHIyUmdiYUFycmF5KGF4ZXMuemVyb2xpbmVjb2xvcik7XG4gICAgICAgIGlmKCd6ZXJvbGluZXdpZHRoJyBpbiBheGVzKSBvcHRzLnplcm9MaW5lV2lkdGhbaV0gPSBheGVzLnplcm9saW5ld2lkdGg7XG5cbiAgICAgICAgLy8gdGljayBsaW5lc1xuICAgICAgICBpZigndGlja3MnIGluIGF4ZXMgJiYgISFheGVzLnRpY2tzKSBvcHRzLmxpbmVUaWNrRW5hYmxlW2ldID0gdHJ1ZTtcbiAgICAgICAgZWxzZSBvcHRzLmxpbmVUaWNrRW5hYmxlW2ldID0gZmFsc2U7XG5cbiAgICAgICAgaWYoJ3RpY2tsZW4nIGluIGF4ZXMpIHtcbiAgICAgICAgICAgIG9wdHMubGluZVRpY2tMZW5ndGhbaV0gPSBvcHRzLl9kZWZhdWx0TGluZVRpY2tMZW5ndGhbaV0gPSBheGVzLnRpY2tsZW47XG4gICAgICAgIH1cbiAgICAgICAgaWYoJ3RpY2tjb2xvcicgaW4gYXhlcykgb3B0cy5saW5lVGlja0NvbG9yW2ldID0gc3RyMlJnYmFBcnJheShheGVzLnRpY2tjb2xvcik7XG4gICAgICAgIGlmKCd0aWNrd2lkdGgnIGluIGF4ZXMpIG9wdHMubGluZVRpY2tXaWR0aFtpXSA9IGF4ZXMudGlja3dpZHRoO1xuICAgICAgICBpZigndGlja2FuZ2xlJyBpbiBheGVzKSB7XG4gICAgICAgICAgICBvcHRzLnRpY2tBbmdsZVtpXSA9IChheGVzLnRpY2thbmdsZSA9PT0gJ2F1dG8nKSA/XG4gICAgICAgICAgICAgICAgLTM2MDAgOiAvLyBpLmUuIHNwZWNpYWwgbnVtYmVyIHRvIHNldCBhdXRvIG9wdGlvblxuICAgICAgICAgICAgICAgIE1hdGguUEkgKiAtYXhlcy50aWNrYW5nbGUgLyAxODA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aWNrIGxhYmVsc1xuICAgICAgICBpZignc2hvd3RpY2tsYWJlbHMnIGluIGF4ZXMpIG9wdHMudGlja0VuYWJsZVtpXSA9IGF4ZXMuc2hvd3RpY2tsYWJlbHM7XG4gICAgICAgIGlmKCd0aWNrZm9udCcgaW4gYXhlcykge1xuICAgICAgICAgICAgaWYoYXhlcy50aWNrZm9udC5jb2xvcikgb3B0cy50aWNrQ29sb3JbaV0gPSBzdHIyUmdiYUFycmF5KGF4ZXMudGlja2ZvbnQuY29sb3IpO1xuICAgICAgICAgICAgaWYoYXhlcy50aWNrZm9udC5mYW1pbHkpIG9wdHMudGlja0ZvbnRbaV0gPSBheGVzLnRpY2tmb250LmZhbWlseTtcbiAgICAgICAgICAgIGlmKGF4ZXMudGlja2ZvbnQuc2l6ZSkgb3B0cy50aWNrU2l6ZVtpXSA9IGF4ZXMudGlja2ZvbnQuc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCdtaXJyb3InIGluIGF4ZXMpIHtcbiAgICAgICAgICAgIGlmKFsndGlja3MnLCAnYWxsJywgJ2FsbHRpY2tzJ10uaW5kZXhPZihheGVzLm1pcnJvcikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5saW5lVGlja01pcnJvcltpXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgb3B0cy5saW5lTWlycm9yW2ldID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihheGVzLm1pcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIG9wdHMubGluZVRpY2tNaXJyb3JbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBvcHRzLmxpbmVNaXJyb3JbaV0gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRzLmxpbmVUaWNrTWlycm9yW2ldID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgb3B0cy5saW5lTWlycm9yW2ldID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBvcHRzLmxpbmVNaXJyb3JbaV0gPSBmYWxzZTtcblxuICAgICAgICAvLyBncmlkIGJhY2tncm91bmRcbiAgICAgICAgaWYoJ3Nob3diYWNrZ3JvdW5kJyBpbiBheGVzICYmIGF4ZXMuc2hvd2JhY2tncm91bmQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBvcHRzLmJhY2tncm91bmRFbmFibGVbaV0gPSB0cnVlO1xuICAgICAgICAgICAgb3B0cy5iYWNrZ3JvdW5kQ29sb3JbaV0gPSBzdHIyUmdiYUFycmF5KGF4ZXMuYmFja2dyb3VuZGNvbG9yKTtcbiAgICAgICAgfSBlbHNlIG9wdHMuYmFja2dyb3VuZEVuYWJsZVtpXSA9IGZhbHNlO1xuICAgIH1cbn07XG5cblxuZnVuY3Rpb24gY3JlYXRlQXhlc09wdGlvbnMoZnVsbExheW91dCwgc2NlbmVMYXlvdXQpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IEF4ZXNPcHRpb25zKCk7XG4gICAgcmVzdWx0Lm1lcmdlKGZ1bGxMYXlvdXQsIHNjZW5lTGF5b3V0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUF4ZXNPcHRpb25zO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi8uLi9saWInKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbnZhciBoYW5kbGVTdWJwbG90RGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9zdWJwbG90X2RlZmF1bHRzJyk7XG52YXIgc3VwcGx5R2wzZEF4aXNMYXlvdXREZWZhdWx0cyA9IHJlcXVpcmUoJy4vYXhpc19kZWZhdWx0cycpO1xudmFyIGxheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG52YXIgZ2V0U3VicGxvdERhdGEgPSByZXF1aXJlKCcuLi8uLi9nZXRfZGF0YScpLmdldFN1YnBsb3REYXRhO1xuXG52YXIgR0wzRCA9ICdnbDNkJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlMYXlvdXREZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSkge1xuICAgIHZhciBoYXNOb24zRCA9IGxheW91dE91dC5fYmFzZVBsb3RNb2R1bGVzLmxlbmd0aCA+IDE7XG5cbiAgICAvLyBzb21lIGxheW91dC13aWRlIGF0dHJpYnV0ZSBhcmUgdXNlZCBpbiBhbGwgc2NlbmVzXG4gICAgLy8gaWYgM0QgaXMgdGhlIG9ubHkgdmlzaWJsZSBwbG90IHR5cGVcbiAgICBmdW5jdGlvbiBnZXREZmx0RnJvbUxheW91dChhdHRyKSB7XG4gICAgICAgIGlmKGhhc05vbjNEKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGlzVmFsaWQgPSBMaWIudmFsaWRhdGUobGF5b3V0SW5bYXR0cl0sIGxheW91dEF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICBpZihpc1ZhbGlkKSByZXR1cm4gbGF5b3V0SW5bYXR0cl07XG4gICAgfVxuXG4gICAgaGFuZGxlU3VicGxvdERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhLCB7XG4gICAgICAgIHR5cGU6IEdMM0QsXG4gICAgICAgIGF0dHJpYnV0ZXM6IGxheW91dEF0dHJpYnV0ZXMsXG4gICAgICAgIGhhbmRsZURlZmF1bHRzOiBoYW5kbGVHbDNkRGVmYXVsdHMsXG4gICAgICAgIGZ1bGxMYXlvdXQ6IGxheW91dE91dCxcbiAgICAgICAgZm9udDogbGF5b3V0T3V0LmZvbnQsXG4gICAgICAgIGZ1bGxEYXRhOiBmdWxsRGF0YSxcbiAgICAgICAgZ2V0RGZsdEZyb21MYXlvdXQ6IGdldERmbHRGcm9tTGF5b3V0LFxuICAgICAgICBwYXBlcl9iZ2NvbG9yOiBsYXlvdXRPdXQucGFwZXJfYmdjb2xvcixcbiAgICAgICAgY2FsZW5kYXI6IGxheW91dE91dC5jYWxlbmRhclxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlR2wzZERlZmF1bHRzKHNjZW5lTGF5b3V0SW4sIHNjZW5lTGF5b3V0T3V0LCBjb2VyY2UsIG9wdHMpIHtcbiAgICAvKlxuICAgICAqIFNjZW5lIG51bWJlcmluZyBwcm9jZWVkcyBhcyBmb2xsb3dzXG4gICAgICogc2NlbmVcbiAgICAgKiBzY2VuZTJcbiAgICAgKiBzY2VuZTNcbiAgICAgKlxuICAgICAqIGFuZCBkLnNjZW5lIHdpbGwgYmUgdW5kZWZpbmVkIG9yIHNvbWUgbnVtYmVyIG9yIG51bWJlciBzdHJpbmdcbiAgICAgKlxuICAgICAqIEFsc28gd3JpdGUgYmFjayBhIGJsYW5rIHNjZW5lIG9iamVjdCB0byB1c2VyIGxheW91dCBzbyB0aGF0IHNvbWVcbiAgICAgKiBhdHRyaWJ1dGVzIGxpa2UgYXNwZWN0cmF0aW8gY2FuIGJlIHdyaXR0ZW4gYmFjayBkeW5hbWljYWxseS5cbiAgICAgKi9cblxuICAgIHZhciBiZ2NvbG9yID0gY29lcmNlKCdiZ2NvbG9yJyk7XG4gICAgdmFyIGJnQ29sb3JDb21iaW5lZCA9IENvbG9yLmNvbWJpbmUoYmdjb2xvciwgb3B0cy5wYXBlcl9iZ2NvbG9yKTtcblxuICAgIHZhciBjYW1lcmFLZXlzID0gWyd1cCcsICdjZW50ZXInLCAnZXllJ107XG5cbiAgICBmb3IodmFyIGogPSAwOyBqIDwgY2FtZXJhS2V5cy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb2VyY2UoJ2NhbWVyYS4nICsgY2FtZXJhS2V5c1tqXSArICcueCcpO1xuICAgICAgICBjb2VyY2UoJ2NhbWVyYS4nICsgY2FtZXJhS2V5c1tqXSArICcueScpO1xuICAgICAgICBjb2VyY2UoJ2NhbWVyYS4nICsgY2FtZXJhS2V5c1tqXSArICcueicpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnY2FtZXJhLnByb2plY3Rpb24udHlwZScpO1xuXG4gICAgLypcbiAgICAgKiBjb2VyY2UgdG8gcG9zaXRpdmUgbnVtYmVyIChtaW4gMCkgYnV0IGFsc28gZG8gbm90IGFjY2VwdCAwICg+MCBub3QgPj0wKVxuICAgICAqIG5vdGUgdGhhdCAwJ3MgZ28gZmFsc2Ugd2l0aCB0aGUgISEgY2FsbFxuICAgICAqL1xuICAgIHZhciBoYXNBc3BlY3QgPSAhIWNvZXJjZSgnYXNwZWN0cmF0aW8ueCcpICYmXG4gICAgICAgICAgICAgICAgICAgICEhY29lcmNlKCdhc3BlY3RyYXRpby55JykgJiZcbiAgICAgICAgICAgICAgICAgICAgISFjb2VyY2UoJ2FzcGVjdHJhdGlvLnonKTtcblxuICAgIHZhciBkZWZhdWx0QXNwZWN0TW9kZSA9IGhhc0FzcGVjdCA/ICdtYW51YWwnIDogJ2F1dG8nO1xuICAgIHZhciBhc3BlY3RNb2RlID0gY29lcmNlKCdhc3BlY3Rtb2RlJywgZGVmYXVsdEFzcGVjdE1vZGUpO1xuXG4gICAgLypcbiAgICAgKiBXZSBuZWVkIGFzcGVjdHJhdGlvIG9iamVjdCBpbiBhbGwgdGhlIExheW91dHMgYXMgaXQgaXMgZHluYW1pY2FsbHkgc2V0XG4gICAgICogaW4gdGhlIGNhbGN1bGF0aW9uIHN0ZXBzLCBpZSwgd2UgY2FudCBzZXQgdGhlIGNvcnJlY3QgZGF0YSBub3csIGl0IGhhcHBlbnMgbGF0ZXIuXG4gICAgICogV2UgbXVzdCBhbHNvIGFjY291bnQgZm9yIHRoZSBjYXNlIHRoZSB1c2VyIHNlbmRzIGJhZCByYXRpbyBkYXRhIHdpdGggJ21hbnVhbCcgc2V0XG4gICAgICogZm9yIHRoZSBtb2RlLiBJbiB0aGlzIGNhc2Ugd2UgbXVzdCBmb3JjZSBjaGFuZ2UgaXQgaGVyZSBhcyB0aGUgZGVmYXVsdCBjb2VyY2VcbiAgICAgKiBtaXNzZXMgaXQgYWJvdmUuXG4gICAgICovXG4gICAgaWYoIWhhc0FzcGVjdCkge1xuICAgICAgICBzY2VuZUxheW91dEluLmFzcGVjdHJhdGlvID0gc2NlbmVMYXlvdXRPdXQuYXNwZWN0cmF0aW8gPSB7eDogMSwgeTogMSwgejogMX07XG5cbiAgICAgICAgaWYoYXNwZWN0TW9kZSA9PT0gJ21hbnVhbCcpIHNjZW5lTGF5b3V0T3V0LmFzcGVjdG1vZGUgPSAnYXV0byc7XG5cbiAgICAgICAgLypcbiAgICAgICAgICoga2luZCBvZiBsaWtlIGF1dG9yYW5nZSAtIHdlIG5lZWQgdGhlIGNhbGN1bGF0ZWQgYXNwZWN0bW9kZSBiYWNrIGluXG4gICAgICAgICAqIHRoZSBpbnB1dCBsYXlvdXQgb3IgcmVsYXlvdXQgY2FuIGNhdXNlIHByb2JsZW1zIGxhdGVyXG4gICAgICAgICAqL1xuICAgICAgICBzY2VuZUxheW91dEluLmFzcGVjdG1vZGUgPSBzY2VuZUxheW91dE91dC5hc3BlY3Rtb2RlO1xuICAgIH1cblxuICAgIHZhciBmdWxsR2wzZERhdGEgPSBnZXRTdWJwbG90RGF0YShvcHRzLmZ1bGxEYXRhLCBHTDNELCBvcHRzLmlkKTtcblxuICAgIHN1cHBseUdsM2RBeGlzTGF5b3V0RGVmYXVsdHMoc2NlbmVMYXlvdXRJbiwgc2NlbmVMYXlvdXRPdXQsIHtcbiAgICAgICAgZm9udDogb3B0cy5mb250LFxuICAgICAgICBzY2VuZTogb3B0cy5pZCxcbiAgICAgICAgZGF0YTogZnVsbEdsM2REYXRhLFxuICAgICAgICBiZ0NvbG9yOiBiZ0NvbG9yQ29tYmluZWQsXG4gICAgICAgIGNhbGVuZGFyOiBvcHRzLmNhbGVuZGFyLFxuICAgICAgICBmdWxsTGF5b3V0OiBvcHRzLmZ1bGxMYXlvdXRcbiAgICB9KTtcblxuICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnYW5ub3RhdGlvbnMzZCcsICdoYW5kbGVEZWZhdWx0cycpKFxuICAgICAgICBzY2VuZUxheW91dEluLCBzY2VuZUxheW91dE91dCwgb3B0c1xuICAgICk7XG5cbiAgICB2YXIgZHJhZ21vZGUgPSBvcHRzLmdldERmbHRGcm9tTGF5b3V0KCdkcmFnbW9kZScpO1xuXG4gICAgaWYoZHJhZ21vZGUgIT09IGZhbHNlKSB7XG4gICAgICAgIGlmKCFkcmFnbW9kZSkge1xuICAgICAgICAgICAgZHJhZ21vZGUgPSAnb3JiaXQnO1xuXG4gICAgICAgICAgICBpZihzY2VuZUxheW91dEluLmNhbWVyYSAmJlxuICAgICAgICAgICAgICAgIHNjZW5lTGF5b3V0SW4uY2FtZXJhLnVwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBzY2VuZUxheW91dEluLmNhbWVyYS51cC54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gc2NlbmVMYXlvdXRJbi5jYW1lcmEudXAueTtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHNjZW5lTGF5b3V0SW4uY2FtZXJhLnVwLno7XG5cbiAgICAgICAgICAgICAgICBpZih6ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCF4IHx8ICF5IHx8ICF6KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnbW9kZSA9ICd0dXJudGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoeiAvIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopID4gMC45OTkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdtb2RlID0gJ3R1cm50YWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRyYWdtb2RlID0gJ3R1cm50YWJsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2VyY2UoJ2RyYWdtb2RlJywgZHJhZ21vZGUpO1xuICAgIGNvZXJjZSgnaG92ZXJtb2RlJywgb3B0cy5nZXREZmx0RnJvbUxheW91dCgnaG92ZXJtb2RlJykpO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBnbDNkQXhpc0F0dHJzID0gcmVxdWlyZSgnLi9heGlzX2F0dHJpYnV0ZXMnKTtcbnZhciBkb21haW5BdHRycyA9IHJlcXVpcmUoJy4uLy4uL2RvbWFpbicpLmF0dHJpYnV0ZXM7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xudmFyIGNvdW50ZXJSZWdleCA9IHJlcXVpcmUoJy4uLy4uLy4uL2xpYicpLmNvdW50ZXJSZWdleDtcblxuZnVuY3Rpb24gbWFrZUNhbWVyYVZlY3Rvcih4LCB5LCB6KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZmx0OiB4LFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYW1lcmEnXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogeSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FtZXJhJ1xuICAgICAgICB9LFxuICAgICAgICB6OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IHosXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbWVyYSdcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYW1lcmEnXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgX2FycmF5QXR0clJlZ2V4cHM6IFtjb3VudGVyUmVnZXgoJ3NjZW5lJywgJy5hbm5vdGF0aW9ucycsIHRydWUpXSxcblxuICAgIGJnY29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGZsdDogJ3JnYmEoMCwwLDAsMCknLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgfSxcbiAgICBjYW1lcmE6IHtcbiAgICAgICAgdXA6IGV4dGVuZEZsYXQobWFrZUNhbWVyYVZlY3RvcigwLCAwLCAxKSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgKHgseSx6KSBjb21wb25lbnRzIG9mIHRoZSBcXCd1cFxcJyBjYW1lcmEgdmVjdG9yLicsXG4gICAgICAgICAgICAgICAgJ1RoaXMgdmVjdG9yIGRldGVybWluZXMgdGhlIHVwIGRpcmVjdGlvbiBvZiB0aGlzIHNjZW5lJyxcbiAgICAgICAgICAgICAgICAnd2l0aCByZXNwZWN0IHRvIHRoZSBwYWdlLicsXG4gICAgICAgICAgICAgICAgJ1RoZSBkZWZhdWx0IGlzICp7eDogMCwgeTogMCwgejogMX0qIHdoaWNoIG1lYW5zIHRoYXQnLFxuICAgICAgICAgICAgICAgICd0aGUgeiBheGlzIHBvaW50cyB1cC4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9KSxcbiAgICAgICAgY2VudGVyOiBleHRlbmRGbGF0KG1ha2VDYW1lcmFWZWN0b3IoMCwgMCwgMCksIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlICh4LHkseikgY29tcG9uZW50cyBvZiB0aGUgXFwnY2VudGVyXFwnIGNhbWVyYSB2ZWN0b3InLFxuICAgICAgICAgICAgICAgICdUaGlzIHZlY3RvciBkZXRlcm1pbmVzIHRoZSB0cmFuc2xhdGlvbiAoeCx5LHopIHNwYWNlJyxcbiAgICAgICAgICAgICAgICAnYWJvdXQgdGhlIGNlbnRlciBvZiB0aGlzIHNjZW5lLicsXG4gICAgICAgICAgICAgICAgJ0J5IGRlZmF1bHQsIHRoZXJlIGlzIG5vIHN1Y2ggdHJhbnNsYXRpb24uJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSksXG4gICAgICAgIGV5ZTogZXh0ZW5kRmxhdChtYWtlQ2FtZXJhVmVjdG9yKDEuMjUsIDEuMjUsIDEuMjUpLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSAoeCx5LHopIGNvbXBvbmVudHMgb2YgdGhlIFxcJ2V5ZVxcJyBjYW1lcmEgdmVjdG9yLicsXG4gICAgICAgICAgICAgICAgJ1RoaXMgdmVjdG9yIGRldGVybWluZXMgdGhlIHZpZXcgcG9pbnQgYWJvdXQgdGhlIG9yaWdpbicsXG4gICAgICAgICAgICAgICAgJ29mIHRoaXMgc2NlbmUuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSksXG4gICAgICAgIHByb2plY3Rpb246IHtcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgIHZhbHVlczogWydwZXJzcGVjdGl2ZScsICdvcnRob2dyYXBoaWMnXSxcbiAgICAgICAgICAgICAgICBkZmx0OiAncGVyc3BlY3RpdmUnLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIHByb2plY3Rpb24gdHlwZS4gVGhlIHByb2plY3Rpb24gdHlwZSBjb3VsZCBiZScsXG4gICAgICAgICAgICAgICAgICAgICdlaXRoZXIgKnBlcnNwZWN0aXZlKiBvciAqb3J0aG9ncmFwaGljKi4gVGhlIGRlZmF1bHQgaXMnLFxuICAgICAgICAgICAgICAgICAgICAnKnBlcnNwZWN0aXZlKi4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRUeXBlOiAnY2FtZXJhJ1xuICAgIH0sXG4gICAgZG9tYWluOiBkb21haW5BdHRycyh7bmFtZTogJ3NjZW5lJywgZWRpdFR5cGU6ICdwbG90J30pLFxuICAgIGFzcGVjdG1vZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIHZhbHVlczogWydhdXRvJywgJ2N1YmUnLCAnZGF0YScsICdtYW51YWwnXSxcbiAgICAgICAgZGZsdDogJ2F1dG8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBpbXBsaWVkRWRpdHM6IHtcbiAgICAgICAgICAgICdhc3BlY3RyYXRpby54JzogdW5kZWZpbmVkLFxuICAgICAgICAgICAgJ2FzcGVjdHJhdGlvLnknOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAnYXNwZWN0cmF0aW8ueic6IHVuZGVmaW5lZFxuICAgICAgICB9LFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0lmICpjdWJlKiwgdGhpcyBzY2VuZVxcJ3MgYXhlcyBhcmUgZHJhd24gYXMgYSBjdWJlLCcsXG4gICAgICAgICAgICAncmVnYXJkbGVzcyBvZiB0aGUgYXhlc1xcJyByYW5nZXMuJyxcblxuICAgICAgICAgICAgJ0lmICpkYXRhKiwgdGhpcyBzY2VuZVxcJ3MgYXhlcyBhcmUgZHJhd24nLFxuICAgICAgICAgICAgJ2luIHByb3BvcnRpb24gd2l0aCB0aGUgYXhlc1xcJyByYW5nZXMuJyxcblxuICAgICAgICAgICAgJ0lmICptYW51YWwqLCB0aGlzIHNjZW5lXFwncyBheGVzIGFyZSBkcmF3bicsXG4gICAgICAgICAgICAnaW4gcHJvcG9ydGlvbiB3aXRoIHRoZSBpbnB1dCBvZiAqYXNwZWN0cmF0aW8qJyxcbiAgICAgICAgICAgICcodGhlIGRlZmF1bHQgYmVoYXZpb3IgaWYgKmFzcGVjdHJhdGlvKiBpcyBwcm92aWRlZCkuJyxcblxuICAgICAgICAgICAgJ0lmICphdXRvKiwgdGhpcyBzY2VuZVxcJ3MgYXhlcyBhcmUgZHJhd24nLFxuICAgICAgICAgICAgJ3VzaW5nIHRoZSByZXN1bHRzIG9mICpkYXRhKiBleGNlcHQgd2hlbiBvbmUgYXhpcycsXG4gICAgICAgICAgICAnaXMgbW9yZSB0aGFuIGZvdXIgdGltZXMgdGhlIHNpemUgb2YgdGhlIHR3byBvdGhlcnMsJyxcbiAgICAgICAgICAgICd3aGVyZSBpbiB0aGF0IGNhc2UgdGhlIHJlc3VsdHMgb2YgKmN1YmUqIGFyZSB1c2VkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGFzcGVjdHJhdGlvOiB7IC8vIG11c3QgYmUgcG9zaXRpdmUgKDAncyBhcmUgY29lcmNlZCB0byAxKVxuICAgICAgICB4OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBpbXBsaWVkRWRpdHM6IHsnXmFzcGVjdG1vZGUnOiAnbWFudWFsJ31cbiAgICAgICAgfSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgaW1wbGllZEVkaXRzOiB7J15hc3BlY3Rtb2RlJzogJ21hbnVhbCd9XG4gICAgICAgIH0sXG4gICAgICAgIHo6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGltcGxpZWRFZGl0czogeydeYXNwZWN0bW9kZSc6ICdtYW51YWwnfVxuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBpbXBsaWVkRWRpdHM6IHthc3BlY3Rtb2RlOiAnbWFudWFsJ30sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGlzIHNjZW5lXFwncyBheGlzIGFzcGVjdHJhdGlvLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgeGF4aXM6IGdsM2RBeGlzQXR0cnMsXG4gICAgeWF4aXM6IGdsM2RBeGlzQXR0cnMsXG4gICAgemF4aXM6IGdsM2RBeGlzQXR0cnMsXG5cbiAgICBkcmFnbW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgdmFsdWVzOiBbJ29yYml0JywgJ3R1cm50YWJsZScsICd6b29tJywgJ3BhbicsIGZhbHNlXSxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHRoZSBtb2RlIG9mIGRyYWcgaW50ZXJhY3Rpb25zIGZvciB0aGlzIHNjZW5lLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGhvdmVybW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgdmFsdWVzOiBbJ2Nsb3Nlc3QnLCBmYWxzZV0sXG4gICAgICAgIGRmbHQ6ICdjbG9zZXN0JyxcbiAgICAgICAgZWRpdFR5cGU6ICdtb2RlYmFyJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHRoZSBtb2RlIG9mIGhvdmVyIGludGVyYWN0aW9ucyBmb3IgdGhpcyBzY2VuZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB1aXJldmlzaW9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnbm9uZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQ29udHJvbHMgcGVyc2lzdGVuY2Ugb2YgdXNlci1kcml2ZW4gY2hhbmdlcyBpbiBjYW1lcmEgYXR0cmlidXRlcy4nLFxuICAgICAgICAgICAgJ0RlZmF1bHRzIHRvIGBsYXlvdXQudWlyZXZpc2lvbmAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgZWRpdFR5cGU6ICdwbG90JyxcblxuICAgIF9kZXByZWNhdGVkOiB7XG4gICAgICAgIGNhbWVyYXBvc2l0aW9uOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW5mb19hcnJheScsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbWVyYScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ09ic29sZXRlLiBVc2UgYGNhbWVyYWAgaW5zdGVhZC4nXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHIyUkdCQXJyYXkgPSByZXF1aXJlKCcuLi8uLi8uLi9saWIvc3RyMnJnYmFycmF5Jyk7XG5cbnZhciBBWEVTX05BTUVTID0gWyd4YXhpcycsICd5YXhpcycsICd6YXhpcyddO1xuXG5mdW5jdGlvbiBTcGlrZU9wdGlvbnMoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gW3RydWUsIHRydWUsIHRydWVdO1xuICAgIHRoaXMuY29sb3JzID0gW1swLCAwLCAwLCAxXSxcbiAgICAgICAgICAgICAgICAgICBbMCwgMCwgMCwgMV0sXG4gICAgICAgICAgICAgICAgICAgWzAsIDAsIDAsIDFdXTtcbiAgICB0aGlzLmRyYXdTaWRlcyA9IFt0cnVlLCB0cnVlLCB0cnVlXTtcbiAgICB0aGlzLmxpbmVXaWR0aCA9IFsxLCAxLCAxXTtcbn1cblxudmFyIHByb3RvID0gU3Bpa2VPcHRpb25zLnByb3RvdHlwZTtcblxucHJvdG8ubWVyZ2UgPSBmdW5jdGlvbihzY2VuZUxheW91dCkge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgdmFyIGF4ZXMgPSBzY2VuZUxheW91dFtBWEVTX05BTUVTW2ldXTtcblxuICAgICAgICBpZighYXhlcy52aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZWRbaV0gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1NpZGVzW2ldID0gZmFsc2U7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5hYmxlZFtpXSA9IGF4ZXMuc2hvd3NwaWtlcztcbiAgICAgICAgdGhpcy5jb2xvcnNbaV0gPSBzdHIyUkdCQXJyYXkoYXhlcy5zcGlrZWNvbG9yKTtcbiAgICAgICAgdGhpcy5kcmF3U2lkZXNbaV0gPSBheGVzLnNwaWtlc2lkZXM7XG4gICAgICAgIHRoaXMubGluZVdpZHRoW2ldID0gYXhlcy5zcGlrZXRoaWNrbmVzcztcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTcGlrZU9wdGlvbnMobGF5b3V0KSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBTcGlrZU9wdGlvbnMoKTtcbiAgICByZXN1bHQubWVyZ2UobGF5b3V0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVNwaWtlT3B0aW9ucztcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbi8qIGVzbGludCBibG9jay1zY29wZWQtdmFyOiAwKi9cbi8qIGVzbGludCBuby1yZWRlY2xhcmU6IDAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcHV0ZVRpY2tNYXJrcztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uLy4uL2xpYicpO1xuXG52YXIgQVhFU19OQU1FUyA9IFsneGF4aXMnLCAneWF4aXMnLCAnemF4aXMnXTtcblxudmFyIGNlbnRlclBvaW50ID0gWzAsIDAsIDBdO1xuXG5mdW5jdGlvbiBjb250b3VyTGV2ZWxzRnJvbVRpY2tzKHRpY2tzKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheSgzKTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgIHZhciB0bGV2ZWwgPSB0aWNrc1tpXTtcbiAgICAgICAgdmFyIGNsZXZlbCA9IG5ldyBBcnJheSh0bGV2ZWwubGVuZ3RoKTtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHRsZXZlbC5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgY2xldmVsW2pdID0gdGxldmVsW2pdLng7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W2ldID0gY2xldmVsO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBjb21wdXRlVGlja01hcmtzKHNjZW5lKSB7XG4gICAgdmFyIGF4ZXNPcHRpb25zID0gc2NlbmUuYXhlc09wdGlvbnM7XG4gICAgdmFyIGdsUmFuZ2UgPSBzY2VuZS5nbHBsb3QuYXhlc1BpeGVscztcbiAgICB2YXIgc2NlbmVMYXlvdXQgPSBzY2VuZS5mdWxsU2NlbmVMYXlvdXQ7XG5cbiAgICB2YXIgdGlja3MgPSBbW10sIFtdLCBbXV07XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgIHZhciBheGVzID0gc2NlbmVMYXlvdXRbQVhFU19OQU1FU1tpXV07XG5cbiAgICAgICAgYXhlcy5fbGVuZ3RoID0gKGdsUmFuZ2VbaV0uaGkgLSBnbFJhbmdlW2ldLmxvKSAqXG4gICAgICAgICAgICBnbFJhbmdlW2ldLnBpeGVsc1BlckRhdGFVbml0IC8gc2NlbmUuZGF0YVNjYWxlW2ldO1xuXG4gICAgICAgIGlmKE1hdGguYWJzKGF4ZXMuX2xlbmd0aCkgPT09IEluZmluaXR5IHx8XG4gICAgICAgICAgIGlzTmFOKGF4ZXMuX2xlbmd0aCkpIHtcbiAgICAgICAgICAgIHRpY2tzW2ldID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBheGVzLl9pbnB1dF9yYW5nZSA9IGF4ZXMucmFuZ2Uuc2xpY2UoKTtcbiAgICAgICAgICAgIGF4ZXMucmFuZ2VbMF0gPSAoZ2xSYW5nZVtpXS5sbykgLyBzY2VuZS5kYXRhU2NhbGVbaV07XG4gICAgICAgICAgICBheGVzLnJhbmdlWzFdID0gKGdsUmFuZ2VbaV0uaGkpIC8gc2NlbmUuZGF0YVNjYWxlW2ldO1xuICAgICAgICAgICAgYXhlcy5fbSA9IDEuMCAvIChzY2VuZS5kYXRhU2NhbGVbaV0gKiBnbFJhbmdlW2ldLnBpeGVsc1BlckRhdGFVbml0KTtcblxuICAgICAgICAgICAgaWYoYXhlcy5yYW5nZVswXSA9PT0gYXhlcy5yYW5nZVsxXSkge1xuICAgICAgICAgICAgICAgIGF4ZXMucmFuZ2VbMF0gLT0gMTtcbiAgICAgICAgICAgICAgICBheGVzLnJhbmdlWzFdICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5lY2Vzc2FyeSB0byBzaG9ydC1jaXJjdWl0IHRoZSAneScgaGFuZGxpbmdcbiAgICAgICAgICAgIC8vIGluIGF1dG90aWNrIHBhcnQgb2YgY2FsY1RpY2tzLi4uIFRyZWF0aW5nIGFsbCBheGVzIGFzICd5JyBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgIC8vIHJ1bm5pbmcgdGhlIGF1dG90aWNrcyBoZXJlLCB0aGVuIHNldHRpbmdcbiAgICAgICAgICAgIC8vIGF1dG90aWNrcyB0byBmYWxzZSB0byBnZXQgYXJvdW5kIHRoZSAyRCBoYW5kbGluZyBpbiBjYWxjVGlja3MuXG4gICAgICAgICAgICB2YXIgdGlja01vZGVDYWNoZWQgPSBheGVzLnRpY2ttb2RlO1xuICAgICAgICAgICAgaWYoYXhlcy50aWNrbW9kZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgYXhlcy50aWNrbW9kZSA9ICdsaW5lYXInO1xuICAgICAgICAgICAgICAgIHZhciBudGlja3MgPSBheGVzLm50aWNrcyB8fCBMaWIuY29uc3RyYWluKChheGVzLl9sZW5ndGggLyA0MCksIDQsIDkpO1xuICAgICAgICAgICAgICAgIEF4ZXMuYXV0b1RpY2tzKGF4ZXMsIE1hdGguYWJzKGF4ZXMucmFuZ2VbMV0gLSBheGVzLnJhbmdlWzBdKSAvIG50aWNrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGF0YVRpY2tzID0gQXhlcy5jYWxjVGlja3MoYXhlcywgeyBtc1VUQzogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBkYXRhVGlja3MubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBkYXRhVGlja3Nbal0ueCA9IGRhdGFUaWNrc1tqXS54ICogc2NlbmUuZGF0YVNjYWxlW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYoYXhlcy50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVRpY2tzW2pdLnRleHQgPVxuICAgICAgICAgICAgICAgICAgICBkYXRhVGlja3Nbal0udGV4dC5yZXBsYWNlKC9cXDxiclxcPi9nLCAnICcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpY2tzW2ldID0gZGF0YVRpY2tzO1xuXG5cbiAgICAgICAgICAgIGF4ZXMudGlja21vZGUgPSB0aWNrTW9kZUNhY2hlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF4ZXNPcHRpb25zLnRpY2tzID0gdGlja3M7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGljayBsZW5ndGhzIGR5bmFtaWNhbGx5XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IDM7ICsraSkge1xuICAgICAgICBjZW50ZXJQb2ludFtpXSA9IDAuNSAqIChzY2VuZS5nbHBsb3QuYm91bmRzWzBdW2ldICsgc2NlbmUuZ2xwbG90LmJvdW5kc1sxXVtpXSk7XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCAyOyArK2opIHtcbiAgICAgICAgICAgIGF4ZXNPcHRpb25zLmJvdW5kc1tqXVtpXSA9IHNjZW5lLmdscGxvdC5ib3VuZHNbal1baV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY2VuZS5jb250b3VyTGV2ZWxzID0gY29udG91ckxldmVsc0Zyb21UaWNrcyh0aWNrcyk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGdsUGxvdDNkID0gcmVxdWlyZSgnZ2wtcGxvdDNkJyk7XG52YXIgY3JlYXRlQ2FtZXJhID0gZ2xQbG90M2QuY3JlYXRlQ2FtZXJhO1xudmFyIGNyZWF0ZVBsb3QgPSBnbFBsb3QzZC5jcmVhdGVTY2VuZTtcblxudmFyIGdldENvbnRleHQgPSByZXF1aXJlKCd3ZWJnbC1jb250ZXh0Jyk7XG52YXIgcGFzc2l2ZVN1cHBvcnRlZCA9IHJlcXVpcmUoJ2hhcy1wYXNzaXZlLWV2ZW50cycpO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG52YXIgRnggPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Z4Jyk7XG5cbnZhciBzdHIyUkdCQWFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliL3N0cjJyZ2JhcnJheScpO1xudmFyIHNob3dOb1dlYkdsTXNnID0gcmVxdWlyZSgnLi4vLi4vbGliL3Nob3dfbm9fd2ViZ2xfbXNnJyk7XG5cbnZhciBwcm9qZWN0ID0gcmVxdWlyZSgnLi9wcm9qZWN0Jyk7XG52YXIgY3JlYXRlQXhlc09wdGlvbnMgPSByZXF1aXJlKCcuL2xheW91dC9jb252ZXJ0Jyk7XG52YXIgY3JlYXRlU3Bpa2VPcHRpb25zID0gcmVxdWlyZSgnLi9sYXlvdXQvc3Bpa2VzJyk7XG52YXIgY29tcHV0ZVRpY2tNYXJrcyA9IHJlcXVpcmUoJy4vbGF5b3V0L3RpY2tfbWFya3MnKTtcblxudmFyIGlzTW9iaWxlID0gcmVxdWlyZSgnaXMtbW9iaWxlJykoeyB0YWJsZXQ6IHRydWUsIGZlYXR1cmVEZXRlY3Q6IHRydWUgfSk7XG5cblxudmFyIFNUQVRJQ19DQU5WQVMsIFNUQVRJQ19DT05URVhUO1xuXG5mdW5jdGlvbiBTY2VuZShvcHRpb25zLCBmdWxsTGF5b3V0KSB7XG4gICAgLy8gY3JlYXRlIHN1YiBjb250YWluZXIgZm9yIHBsb3RcbiAgICB2YXIgc2NlbmVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgcGxvdENvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xuXG4gICAgLy8ga2VlcCBhIHJlZiB0byB0aGUgZ3JhcGggZGl2IHRvIGZpcmUgaG92ZXIrY2xpY2sgZXZlbnRzXG4gICAgdGhpcy5ncmFwaERpdiA9IG9wdGlvbnMuZ3JhcGhEaXY7XG5cbiAgICAvLyBjcmVhdGUgU1ZHIGNvbnRhaW5lciBmb3IgaG92ZXIgdGV4dFxuICAgIHZhciBzdmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICdzdmcnKTtcbiAgICBzdmdDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS50b3AgPSBzdmdDb250YWluZXIuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS53aWR0aCA9IHN2Z0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlWyd6LWluZGV4J10gPSAyMDtcbiAgICBzdmdDb250YWluZXIuc3R5bGVbJ3BvaW50ZXItZXZlbnRzJ10gPSAnbm9uZSc7XG4gICAgc2NlbmVDb250YWluZXIuYXBwZW5kQ2hpbGQoc3ZnQ29udGFpbmVyKTtcbiAgICB0aGlzLnN2Z0NvbnRhaW5lciA9IHN2Z0NvbnRhaW5lcjtcblxuICAgIC8vIFRhZyB0aGUgY29udGFpbmVyIHdpdGggdGhlIHNjZW5lSURcbiAgICBzY2VuZUNvbnRhaW5lci5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgc2NlbmVDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHNjZW5lQ29udGFpbmVyLnN0eWxlLnRvcCA9IHNjZW5lQ29udGFpbmVyLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICBzY2VuZUNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHNjZW5lQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBwbG90Q29udGFpbmVyLmFwcGVuZENoaWxkKHNjZW5lQ29udGFpbmVyKTtcblxuICAgIHRoaXMuZnVsbExheW91dCA9IGZ1bGxMYXlvdXQ7XG4gICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQgfHwgJ3NjZW5lJztcbiAgICB0aGlzLmZ1bGxTY2VuZUxheW91dCA9IGZ1bGxMYXlvdXRbdGhpcy5pZF07XG5cbiAgICAvLyBTYXZlZCBmcm9tIGxhc3QgY2FsbCB0byBwbG90KClcbiAgICB0aGlzLnBsb3RBcmdzID0gWyBbXSwge30sIHt9IF07XG5cbiAgICAvKlxuICAgICAqIE1vdmUgdGhpcyB0byBjYWxjIHN0ZXA/IFdoeSBkb2VzIGl0IHdvcmsgaGVyZT9cbiAgICAgKi9cbiAgICB0aGlzLmF4ZXNPcHRpb25zID0gY3JlYXRlQXhlc09wdGlvbnMoZnVsbExheW91dCwgZnVsbExheW91dFt0aGlzLmlkXSk7XG4gICAgdGhpcy5zcGlrZU9wdGlvbnMgPSBjcmVhdGVTcGlrZU9wdGlvbnMoZnVsbExheW91dFt0aGlzLmlkXSk7XG4gICAgdGhpcy5jb250YWluZXIgPSBzY2VuZUNvbnRhaW5lcjtcbiAgICB0aGlzLnN0YXRpY01vZGUgPSAhIW9wdGlvbnMuc3RhdGljUGxvdDtcbiAgICB0aGlzLnBpeGVsUmF0aW8gPSB0aGlzLnBpeGVsUmF0aW8gfHwgb3B0aW9ucy5wbG90R2xQaXhlbFJhdGlvIHx8IDI7XG5cbiAgICAvLyBDb29yZGluYXRlIHJlc2NhbGluZ1xuICAgIHRoaXMuZGF0YVNjYWxlID0gWzEsIDEsIDFdO1xuXG4gICAgdGhpcy5jb250b3VyTGV2ZWxzID0gWyBbXSwgW10sIFtdIF07XG5cbiAgICB0aGlzLmNvbnZlcnRBbm5vdGF0aW9ucyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnYW5ub3RhdGlvbnMzZCcsICdjb252ZXJ0Jyk7XG4gICAgdGhpcy5kcmF3QW5ub3RhdGlvbnMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Fubm90YXRpb25zM2QnLCAnZHJhdycpO1xuXG4gICAgdGhpcy5pbml0aWFsaXplR0xQbG90KCk7XG59XG5cbnZhciBwcm90byA9IFNjZW5lLnByb3RvdHlwZTtcblxucHJvdG8ucHJlcGFyZU9wdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NlbmUgPSB0aGlzO1xuXG4gICAgdmFyIG9wdHMgPSB7XG4gICAgICAgIGNhbnZhczogc2NlbmUuY2FudmFzLFxuICAgICAgICBnbDogc2NlbmUuZ2wsXG4gICAgICAgIGdsT3B0aW9uczoge1xuICAgICAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiBpc01vYmlsZSxcbiAgICAgICAgICAgIHByZW11bHRpcGxpZWRBbHBoYTogdHJ1ZSxcbiAgICAgICAgICAgIGFudGlhbGlhczogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjb250YWluZXI6IHNjZW5lLmNvbnRhaW5lcixcbiAgICAgICAgYXhlczogc2NlbmUuYXhlc09wdGlvbnMsXG4gICAgICAgIHNwaWtlczogc2NlbmUuc3Bpa2VPcHRpb25zLFxuICAgICAgICBwaWNrUmFkaXVzOiAxMCxcbiAgICAgICAgc25hcFRvRGF0YTogdHJ1ZSxcbiAgICAgICAgYXV0b1NjYWxlOiB0cnVlLFxuICAgICAgICBhdXRvQm91bmRzOiBmYWxzZSxcbiAgICAgICAgY2FtZXJhT2JqZWN0OiBzY2VuZS5jYW1lcmEsXG4gICAgICAgIHBpeGVsUmF0aW86IHNjZW5lLnBpeGVsUmF0aW9cbiAgICB9O1xuXG4gICAgLy8gZm9yIHN0YXRpYyBwbG90cywgd2UgcmV1c2UgdGhlIFdlYkdMIGNvbnRleHRcbiAgICAvLyAgYXMgV2ViS2l0IGRvZXNuJ3QgY29sbGVjdCB0aGVtIHJlbGlhYmx5XG4gICAgaWYoc2NlbmUuc3RhdGljTW9kZSkge1xuICAgICAgICBpZighU1RBVElDX0NPTlRFWFQpIHtcbiAgICAgICAgICAgIFNUQVRJQ19DQU5WQVMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIFNUQVRJQ19DT05URVhUID0gZ2V0Q29udGV4dCh7XG4gICAgICAgICAgICAgICAgY2FudmFzOiBTVEFUSUNfQ0FOVkFTLFxuICAgICAgICAgICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IHRydWUsXG4gICAgICAgICAgICAgICAgYW50aWFsaWFzOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmKCFTVEFUSUNfQ09OVEVYVCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZXJyb3IgY3JlYXRpbmcgc3RhdGljIGNhbnZhcy9jb250ZXh0IGZvciBpbWFnZSBzZXJ2ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHMuZ2wgPSBTVEFUSUNfQ09OVEVYVDtcbiAgICAgICAgb3B0cy5jYW52YXMgPSBTVEFUSUNfQ0FOVkFTO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRzO1xufTtcblxucHJvdG8udHJ5Q3JlYXRlUGxvdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2VuZSA9IHRoaXM7XG5cbiAgICB2YXIgb3B0cyA9IHNjZW5lLnByZXBhcmVPcHRpb25zKCk7XG5cbiAgICB2YXIgc3VjY2VzcyA9IHRydWU7XG5cbiAgICB0cnkge1xuICAgICAgICBzY2VuZS5nbHBsb3QgPSBjcmVhdGVQbG90KG9wdHMpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBpZihzY2VuZS5zdGF0aWNNb2RlKSB7XG4gICAgICAgICAgICBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7IC8vIHRyeSBzZWNvbmQgdGltZVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBpbnZlcnQgcHJlc2VydmVEcmF3aW5nQnVmZmVyIHNldHVwIHdoaWNoIGNvdWxkIGJlIHJlc3VsdGVkIGZyb20gaXMtbW9iaWxlIG5vdCBkZXRlY3RpbmcgdGhlIHJpZ2h0IGRldmljZVxuICAgICAgICAgICAgICAgIExpYi53YXJuKFtcbiAgICAgICAgICAgICAgICAgICAgJ3dlYmdsIHNldHVwIGZhaWxlZCBwb3NzaWJseSBkdWUgdG8nLFxuICAgICAgICAgICAgICAgICAgICBpc01vYmlsZSA/ICdkaXNhYmxpbmcnIDogJ2VuYWJsaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgJ3ByZXNlcnZlRHJhd2luZ0J1ZmZlciBjb25maWcuJyxcbiAgICAgICAgICAgICAgICAgICAgJ1RoZSBkZXZpY2UgbWF5IG5vdCBiZSBzdXBwb3J0ZWQgYnkgaXMtbW9iaWxlIG1vZHVsZSEnLFxuICAgICAgICAgICAgICAgICAgICAnSW52ZXJ0aW5nIHByZXNlcnZlRHJhd2luZ0J1ZmZlciBvcHRpb24gaW4gc2Vjb25kIGF0dGVtcHQgdG8gY3JlYXRlIHdlYmdsIHNjZW5lLidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICAgICAgaXNNb2JpbGUgPSBvcHRzLmdsT3B0aW9ucy5wcmVzZXJ2ZURyYXdpbmdCdWZmZXIgPSAhb3B0cy5nbE9wdGlvbnMucHJlc2VydmVEcmF3aW5nQnVmZmVyO1xuXG4gICAgICAgICAgICAgICAgc2NlbmUuZ2xwbG90ID0gY3JlYXRlUGxvdChvcHRzKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xufTtcblxucHJvdG8uaW5pdGlhbGl6ZUdMQ2FtZXJhID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjZW5lID0gdGhpcztcbiAgICB2YXIgY2FtZXJhRGF0YSA9IHNjZW5lLmZ1bGxTY2VuZUxheW91dC5jYW1lcmE7XG4gICAgdmFyIGlzT3J0aG8gPSAoY2FtZXJhRGF0YS5wcm9qZWN0aW9uLnR5cGUgPT09ICdvcnRob2dyYXBoaWMnKTtcblxuICAgIHNjZW5lLmNhbWVyYSA9IGNyZWF0ZUNhbWVyYShzY2VuZS5jb250YWluZXIsIHtcbiAgICAgICAgY2VudGVyOiBbY2FtZXJhRGF0YS5jZW50ZXIueCwgY2FtZXJhRGF0YS5jZW50ZXIueSwgY2FtZXJhRGF0YS5jZW50ZXIuel0sXG4gICAgICAgIGV5ZTogW2NhbWVyYURhdGEuZXllLngsIGNhbWVyYURhdGEuZXllLnksIGNhbWVyYURhdGEuZXllLnpdLFxuICAgICAgICB1cDogW2NhbWVyYURhdGEudXAueCwgY2FtZXJhRGF0YS51cC55LCBjYW1lcmFEYXRhLnVwLnpdLFxuICAgICAgICBfb3J0aG86IGlzT3J0aG8sXG4gICAgICAgIHpvb21NaW46IDAuMDEsXG4gICAgICAgIHpvb21NYXg6IDEwMCxcbiAgICAgICAgbW9kZTogJ29yYml0J1xuICAgIH0pO1xufTtcblxucHJvdG8uaW5pdGlhbGl6ZUdMUGxvdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2VuZSA9IHRoaXM7XG5cbiAgICBzY2VuZS5pbml0aWFsaXplR0xDYW1lcmEoKTtcblxuICAgIHZhciBzdWNjZXNzID0gc2NlbmUudHJ5Q3JlYXRlUGxvdCgpO1xuICAgIC8qXG4gICAgKiBjcmVhdGVQbG90IHdpbGwgdGhyb3cgd2hlbiB3ZWJnbCBpcyBub3QgZW5hYmxlZCBpbiB0aGUgY2xpZW50LlxuICAgICogTGV0cyByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgdGhlIG1vZHVsZSB3aXRoIGFsbCBmdW5jdGlvbnMgbm9vcCdkLlxuICAgICogVGhlIGRlc3Ryb3kgbWV0aG9kIC0gd2hpY2ggd2lsbCByZW1vdmUgdGhlIGNvbnRhaW5lciBmcm9tIHRoZSBET01cbiAgICAqIGlzIG92ZXJyaWRkZW4gd2l0aCBhIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGUgY29udGFpbmVyIG9ubHkuXG4gICAgKi9cbiAgICBpZighc3VjY2VzcykgcmV0dXJuIHNob3dOb1dlYkdsTXNnKHNjZW5lKTtcblxuICAgIC8vIExpc3Qgb2Ygc2NlbmUgb2JqZWN0c1xuICAgIHNjZW5lLnRyYWNlcyA9IHt9O1xuXG4gICAgc2NlbmUubWFrZTR0aERpbWVuc2lvbigpO1xuXG4gICAgdmFyIGdkID0gc2NlbmUuZ3JhcGhEaXY7XG4gICAgdmFyIGxheW91dCA9IGdkLmxheW91dDtcblxuICAgIHZhciBtYWtlVXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB1cGRhdGUgPSB7fTtcblxuICAgICAgICBpZihzY2VuZS5pc0NhbWVyYUNoYW5nZWQobGF5b3V0KSkge1xuICAgICAgICAgICAgLy8gY2FtZXJhIHVwZGF0ZXNcbiAgICAgICAgICAgIHVwZGF0ZVtzY2VuZS5pZCArICcuY2FtZXJhJ10gPSBzY2VuZS5nZXRDYW1lcmEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNjZW5lLmlzQXNwZWN0Q2hhbmdlZChsYXlvdXQpKSB7XG4gICAgICAgICAgICAvLyBzY2VuZSB1cGRhdGVzXG4gICAgICAgICAgICB1cGRhdGVbc2NlbmUuaWQgKyAnLmFzcGVjdHJhdGlvJ10gPSBzY2VuZS5nbHBsb3QuZ2V0QXNwZWN0cmF0aW8oKTtcblxuICAgICAgICAgICAgaWYobGF5b3V0W3NjZW5lLmlkXS5hc3BlY3Rtb2RlICE9PSAnbWFudWFsJykge1xuICAgICAgICAgICAgICAgIHNjZW5lLmZ1bGxTY2VuZUxheW91dC5hc3BlY3Rtb2RlID1cbiAgICAgICAgICAgICAgICBsYXlvdXRbc2NlbmUuaWRdLmFzcGVjdG1vZGUgPVxuICAgICAgICAgICAgICAgIHVwZGF0ZVtzY2VuZS5pZCArICcuYXNwZWN0bW9kZSddID0gJ21hbnVhbCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXBkYXRlO1xuICAgIH07XG5cbiAgICB2YXIgcmVsYXlvdXRDYWxsYmFjayA9IGZ1bmN0aW9uKHNjZW5lKSB7XG4gICAgICAgIGlmKHNjZW5lLmZ1bGxTY2VuZUxheW91dC5kcmFnbW9kZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICB2YXIgdXBkYXRlID0gbWFrZVVwZGF0ZSgpO1xuICAgICAgICBzY2VuZS5zYXZlTGF5b3V0KGxheW91dCk7XG4gICAgICAgIHNjZW5lLmdyYXBoRGl2LmVtaXQoJ3Bsb3RseV9yZWxheW91dCcsIHVwZGF0ZSk7XG4gICAgfTtcblxuICAgIHNjZW5lLmdscGxvdC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZWxheW91dENhbGxiYWNrKHNjZW5lKTtcbiAgICB9KTtcblxuICAgIHNjZW5lLmdscGxvdC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGdkLl9jb250ZXh0Ll9zY3JvbGxab29tLmdsM2QpIHtcbiAgICAgICAgICAgIGlmKHNjZW5lLmNhbWVyYS5fb3J0aG8pIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IChlLmRlbHRhWCA+IGUuZGVsdGFZKSA/IDEuMSA6IDEuMCAvIDEuMTtcbiAgICAgICAgICAgICAgICB2YXIgbyA9IHNjZW5lLmdscGxvdC5nZXRBc3BlY3RyYXRpbygpO1xuICAgICAgICAgICAgICAgIHNjZW5lLmdscGxvdC5zZXRBc3BlY3RyYXRpbyh7XG4gICAgICAgICAgICAgICAgICAgIHg6IHMgKiBvLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHMgKiBvLnksXG4gICAgICAgICAgICAgICAgICAgIHo6IHMgKiBvLnpcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVsYXlvdXRDYWxsYmFjayhzY2VuZSk7XG4gICAgICAgIH1cbiAgICB9LCBwYXNzaXZlU3VwcG9ydGVkID8ge3Bhc3NpdmU6IGZhbHNlfSA6IGZhbHNlKTtcblxuICAgIHNjZW5lLmdscGxvdC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHNjZW5lLmZ1bGxTY2VuZUxheW91dC5kcmFnbW9kZSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgaWYoc2NlbmUuY2FtZXJhLm1vdXNlTGlzdGVuZXIuYnV0dG9ucyA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB1cGRhdGUgPSBtYWtlVXBkYXRlKCk7XG4gICAgICAgIHNjZW5lLmdyYXBoRGl2LmVtaXQoJ3Bsb3RseV9yZWxheW91dGluZycsIHVwZGF0ZSk7XG4gICAgfSk7XG5cbiAgICBpZighc2NlbmUuc3RhdGljTW9kZSkge1xuICAgICAgICBzY2VuZS5nbHBsb3QuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmdsY29udGV4dGxvc3QnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYoZ2QgJiYgZ2QuZW1pdCkge1xuICAgICAgICAgICAgICAgIGdkLmVtaXQoJ3Bsb3RseV93ZWJnbGNvbnRleHRsb3N0Jywge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGxheWVyOiBzY2VuZS5pZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgc2NlbmUuZ2xwbG90Lm9uY29udGV4dGxvc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2NlbmUucmVjb3ZlckNvbnRleHQoKTtcbiAgICB9O1xuXG4gICAgc2NlbmUuZ2xwbG90Lm9ucmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNjZW5lLnJlbmRlcigpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbnByb3RvLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2VuZSA9IHRoaXM7XG4gICAgdmFyIGdkID0gc2NlbmUuZ3JhcGhEaXY7XG4gICAgdmFyIHRyYWNlO1xuXG4gICAgLy8gdXBkYXRlIHNpemUgb2Ygc3ZnIGNvbnRhaW5lclxuICAgIHZhciBzdmdDb250YWluZXIgPSBzY2VuZS5zdmdDb250YWluZXI7XG4gICAgdmFyIGNsaWVudFJlY3QgPSBzY2VuZS5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIHdpZHRoID0gY2xpZW50UmVjdC53aWR0aDtcbiAgICB2YXIgaGVpZ2h0ID0gY2xpZW50UmVjdC5oZWlnaHQ7XG4gICAgc3ZnQ29udGFpbmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94JywgJzAgMCAnICsgd2lkdGggKyAnICcgKyBoZWlnaHQpO1xuICAgIHN2Z0NvbnRhaW5lci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnd2lkdGgnLCB3aWR0aCk7XG4gICAgc3ZnQ29udGFpbmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdoZWlnaHQnLCBoZWlnaHQpO1xuXG4gICAgY29tcHV0ZVRpY2tNYXJrcyhzY2VuZSk7XG4gICAgc2NlbmUuZ2xwbG90LmF4ZXMudXBkYXRlKHNjZW5lLmF4ZXNPcHRpb25zKTtcblxuICAgIC8vIGNoZWNrIGlmIHBpY2sgaGFzIGNoYW5nZWRcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNjZW5lLnRyYWNlcyk7XG4gICAgdmFyIGxhc3RQaWNrZWQgPSBudWxsO1xuICAgIHZhciBzZWxlY3Rpb24gPSBzY2VuZS5nbHBsb3Quc2VsZWN0aW9uO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHRyYWNlID0gc2NlbmUudHJhY2VzW2tleXNbaV1dO1xuICAgICAgICBpZih0cmFjZS5kYXRhLmhvdmVyaW5mbyAhPT0gJ3NraXAnICYmIHRyYWNlLmhhbmRsZVBpY2soc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgbGFzdFBpY2tlZCA9IHRyYWNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJhY2Uuc2V0Q29udG91ckxldmVscykgdHJhY2Uuc2V0Q29udG91ckxldmVscygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdHRlcihheGlzTmFtZSwgdmFsKSB7XG4gICAgICAgIHZhciBheGlzID0gc2NlbmUuZnVsbFNjZW5lTGF5b3V0W2F4aXNOYW1lXTtcblxuICAgICAgICByZXR1cm4gQXhlcy50aWNrVGV4dChheGlzLCBheGlzLmQybCh2YWwpLCAnaG92ZXInKS50ZXh0O1xuICAgIH1cblxuICAgIHZhciBvbGRFdmVudERhdGE7XG5cbiAgICBpZihsYXN0UGlja2VkICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBwZGF0YSA9IHByb2plY3Qoc2NlbmUuZ2xwbG90LmNhbWVyYVBhcmFtcywgc2VsZWN0aW9uLmRhdGFDb29yZGluYXRlKTtcbiAgICAgICAgdHJhY2UgPSBsYXN0UGlja2VkLmRhdGE7XG4gICAgICAgIHZhciB0cmFjZU5vdyA9IGdkLl9mdWxsRGF0YVt0cmFjZS5pbmRleF07XG4gICAgICAgIHZhciBwdE51bWJlciA9IHNlbGVjdGlvbi5pbmRleDtcblxuICAgICAgICB2YXIgbGFiZWxzID0ge1xuICAgICAgICAgICAgeExhYmVsOiBmb3JtYXR0ZXIoJ3hheGlzJywgc2VsZWN0aW9uLnRyYWNlQ29vcmRpbmF0ZVswXSksXG4gICAgICAgICAgICB5TGFiZWw6IGZvcm1hdHRlcigneWF4aXMnLCBzZWxlY3Rpb24udHJhY2VDb29yZGluYXRlWzFdKSxcbiAgICAgICAgICAgIHpMYWJlbDogZm9ybWF0dGVyKCd6YXhpcycsIHNlbGVjdGlvbi50cmFjZUNvb3JkaW5hdGVbMl0pXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGhvdmVyaW5mbyA9IEZ4LmNhc3RIb3ZlcmluZm8odHJhY2VOb3csIHNjZW5lLmZ1bGxMYXlvdXQsIHB0TnVtYmVyKTtcbiAgICAgICAgdmFyIGhvdmVyaW5mb1BhcnRzID0gKGhvdmVyaW5mbyB8fCAnJykuc3BsaXQoJysnKTtcbiAgICAgICAgdmFyIGlzSG92ZXJpbmZvQWxsID0gaG92ZXJpbmZvICYmIGhvdmVyaW5mbyA9PT0gJ2FsbCc7XG5cbiAgICAgICAgaWYoIXRyYWNlTm93LmhvdmVydGVtcGxhdGUgJiYgIWlzSG92ZXJpbmZvQWxsKSB7XG4gICAgICAgICAgICBpZihob3ZlcmluZm9QYXJ0cy5pbmRleE9mKCd4JykgPT09IC0xKSBsYWJlbHMueExhYmVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYoaG92ZXJpbmZvUGFydHMuaW5kZXhPZigneScpID09PSAtMSkgbGFiZWxzLnlMYWJlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmKGhvdmVyaW5mb1BhcnRzLmluZGV4T2YoJ3onKSA9PT0gLTEpIGxhYmVscy56TGFiZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZihob3ZlcmluZm9QYXJ0cy5pbmRleE9mKCd0ZXh0JykgPT09IC0xKSBzZWxlY3Rpb24udGV4dExhYmVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYoaG92ZXJpbmZvUGFydHMuaW5kZXhPZignbmFtZScpID09PSAtMSkgbGFzdFBpY2tlZC5uYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHR4O1xuICAgICAgICB2YXIgdmVjdG9yVHggPSBbXTtcblxuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnY29uZScgfHwgdHJhY2UudHlwZSA9PT0gJ3N0cmVhbXR1YmUnKSB7XG4gICAgICAgICAgICBsYWJlbHMudUxhYmVsID0gZm9ybWF0dGVyKCd4YXhpcycsIHNlbGVjdGlvbi50cmFjZUNvb3JkaW5hdGVbM10pO1xuICAgICAgICAgICAgaWYoaXNIb3ZlcmluZm9BbGwgfHwgaG92ZXJpbmZvUGFydHMuaW5kZXhPZigndScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHZlY3RvclR4LnB1c2goJ3U6ICcgKyBsYWJlbHMudUxhYmVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGFiZWxzLnZMYWJlbCA9IGZvcm1hdHRlcigneWF4aXMnLCBzZWxlY3Rpb24udHJhY2VDb29yZGluYXRlWzRdKTtcbiAgICAgICAgICAgIGlmKGlzSG92ZXJpbmZvQWxsIHx8IGhvdmVyaW5mb1BhcnRzLmluZGV4T2YoJ3YnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB2ZWN0b3JUeC5wdXNoKCd2OiAnICsgbGFiZWxzLnZMYWJlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxhYmVscy53TGFiZWwgPSBmb3JtYXR0ZXIoJ3pheGlzJywgc2VsZWN0aW9uLnRyYWNlQ29vcmRpbmF0ZVs1XSk7XG4gICAgICAgICAgICBpZihpc0hvdmVyaW5mb0FsbCB8fCBob3ZlcmluZm9QYXJ0cy5pbmRleE9mKCd3JykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdmVjdG9yVHgucHVzaCgndzogJyArIGxhYmVscy53TGFiZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYWJlbHMubm9ybUxhYmVsID0gc2VsZWN0aW9uLnRyYWNlQ29vcmRpbmF0ZVs2XS50b1ByZWNpc2lvbigzKTtcbiAgICAgICAgICAgIGlmKGlzSG92ZXJpbmZvQWxsIHx8IGhvdmVyaW5mb1BhcnRzLmluZGV4T2YoJ25vcm0nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB2ZWN0b3JUeC5wdXNoKCdub3JtOiAnICsgbGFiZWxzLm5vcm1MYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0cmFjZS50eXBlID09PSAnc3RyZWFtdHViZScpIHtcbiAgICAgICAgICAgICAgICBsYWJlbHMuZGl2ZXJnZW5jZUxhYmVsID0gc2VsZWN0aW9uLnRyYWNlQ29vcmRpbmF0ZVs3XS50b1ByZWNpc2lvbigzKTtcbiAgICAgICAgICAgICAgICBpZihpc0hvdmVyaW5mb0FsbCB8fCBob3ZlcmluZm9QYXJ0cy5pbmRleE9mKCdkaXZlcmdlbmNlJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZlY3RvclR4LnB1c2goJ2RpdmVyZ2VuY2U6ICcgKyBsYWJlbHMuZGl2ZXJnZW5jZUxhYmVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihzZWxlY3Rpb24udGV4dExhYmVsKSB7XG4gICAgICAgICAgICAgICAgdmVjdG9yVHgucHVzaChzZWxlY3Rpb24udGV4dExhYmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR4ID0gdmVjdG9yVHguam9pbignPGJyPicpO1xuICAgICAgICB9IGVsc2UgaWYodHJhY2UudHlwZSA9PT0gJ2lzb3N1cmZhY2UnIHx8IHRyYWNlLnR5cGUgPT09ICd2b2x1bWUnKSB7XG4gICAgICAgICAgICBsYWJlbHMudmFsdWVMYWJlbCA9IEF4ZXMudGlja1RleHQoc2NlbmUuX21vY2tBeGlzLCBzY2VuZS5fbW9ja0F4aXMuZDJsKHNlbGVjdGlvbi50cmFjZUNvb3JkaW5hdGVbM10pLCAnaG92ZXInKS50ZXh0O1xuICAgICAgICAgICAgdmVjdG9yVHgucHVzaCgndmFsdWU6ICcgKyBsYWJlbHMudmFsdWVMYWJlbCk7XG4gICAgICAgICAgICBpZihzZWxlY3Rpb24udGV4dExhYmVsKSB7XG4gICAgICAgICAgICAgICAgdmVjdG9yVHgucHVzaChzZWxlY3Rpb24udGV4dExhYmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR4ID0gdmVjdG9yVHguam9pbignPGJyPicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHggPSBzZWxlY3Rpb24udGV4dExhYmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvaW50RGF0YSA9IHtcbiAgICAgICAgICAgIHg6IHNlbGVjdGlvbi50cmFjZUNvb3JkaW5hdGVbMF0sXG4gICAgICAgICAgICB5OiBzZWxlY3Rpb24udHJhY2VDb29yZGluYXRlWzFdLFxuICAgICAgICAgICAgejogc2VsZWN0aW9uLnRyYWNlQ29vcmRpbmF0ZVsyXSxcbiAgICAgICAgICAgIGRhdGE6IHRyYWNlTm93Ll9pbnB1dCxcbiAgICAgICAgICAgIGZ1bGxEYXRhOiB0cmFjZU5vdyxcbiAgICAgICAgICAgIGN1cnZlTnVtYmVyOiB0cmFjZU5vdy5pbmRleCxcbiAgICAgICAgICAgIHBvaW50TnVtYmVyOiBwdE51bWJlclxuICAgICAgICB9O1xuXG4gICAgICAgIEZ4LmFwcGVuZEFycmF5UG9pbnRWYWx1ZShwb2ludERhdGEsIHRyYWNlTm93LCBwdE51bWJlcik7XG5cbiAgICAgICAgaWYodHJhY2UuX21vZHVsZS5ldmVudERhdGEpIHtcbiAgICAgICAgICAgIHBvaW50RGF0YSA9IHRyYWNlTm93Ll9tb2R1bGUuZXZlbnREYXRhKHBvaW50RGF0YSwgc2VsZWN0aW9uLCB0cmFjZU5vdywge30sIHB0TnVtYmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBldmVudERhdGEgPSB7cG9pbnRzOiBbcG9pbnREYXRhXX07XG5cbiAgICAgICAgaWYoc2NlbmUuZnVsbFNjZW5lTGF5b3V0LmhvdmVybW9kZSkge1xuICAgICAgICAgICAgRngubG9uZUhvdmVyKHtcbiAgICAgICAgICAgICAgICB0cmFjZTogdHJhY2VOb3csXG4gICAgICAgICAgICAgICAgeDogKDAuNSArIDAuNSAqIHBkYXRhWzBdIC8gcGRhdGFbM10pICogd2lkdGgsXG4gICAgICAgICAgICAgICAgeTogKDAuNSAtIDAuNSAqIHBkYXRhWzFdIC8gcGRhdGFbM10pICogaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHhMYWJlbDogbGFiZWxzLnhMYWJlbCxcbiAgICAgICAgICAgICAgICB5TGFiZWw6IGxhYmVscy55TGFiZWwsXG4gICAgICAgICAgICAgICAgekxhYmVsOiBsYWJlbHMuekxhYmVsLFxuICAgICAgICAgICAgICAgIHRleHQ6IHR4LFxuICAgICAgICAgICAgICAgIG5hbWU6IGxhc3RQaWNrZWQubmFtZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogRnguY2FzdEhvdmVyT3B0aW9uKHRyYWNlTm93LCBwdE51bWJlciwgJ2JnY29sb3InKSB8fCBsYXN0UGlja2VkLmNvbG9yLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBGeC5jYXN0SG92ZXJPcHRpb24odHJhY2VOb3csIHB0TnVtYmVyLCAnYm9yZGVyY29sb3InKSxcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiBGeC5jYXN0SG92ZXJPcHRpb24odHJhY2VOb3csIHB0TnVtYmVyLCAnZm9udC5mYW1pbHknKSxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogRnguY2FzdEhvdmVyT3B0aW9uKHRyYWNlTm93LCBwdE51bWJlciwgJ2ZvbnQuc2l6ZScpLFxuICAgICAgICAgICAgICAgIGZvbnRDb2xvcjogRnguY2FzdEhvdmVyT3B0aW9uKHRyYWNlTm93LCBwdE51bWJlciwgJ2ZvbnQuY29sb3InKSxcbiAgICAgICAgICAgICAgICBuYW1lTGVuZ3RoOiBGeC5jYXN0SG92ZXJPcHRpb24odHJhY2VOb3csIHB0TnVtYmVyLCAnbmFtZWxlbmd0aCcpLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogRnguY2FzdEhvdmVyT3B0aW9uKHRyYWNlTm93LCBwdE51bWJlciwgJ2FsaWduJyksXG4gICAgICAgICAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogTGliLmNhc3RPcHRpb24odHJhY2VOb3csIHB0TnVtYmVyLCAnaG92ZXJ0ZW1wbGF0ZScpLFxuICAgICAgICAgICAgICAgIGhvdmVydGVtcGxhdGVMYWJlbHM6IExpYi5leHRlbmRGbGF0KHt9LCBwb2ludERhdGEsIGxhYmVscyksXG4gICAgICAgICAgICAgICAgZXZlbnREYXRhOiBbcG9pbnREYXRhXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogc3ZnQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgIGdkOiBnZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzZWxlY3Rpb24uYnV0dG9ucyAmJiBzZWxlY3Rpb24uZGlzdGFuY2UgPCA1KSB7XG4gICAgICAgICAgICBnZC5lbWl0KCdwbG90bHlfY2xpY2snLCBldmVudERhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2QuZW1pdCgncGxvdGx5X2hvdmVyJywgZXZlbnREYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9sZEV2ZW50RGF0YSA9IGV2ZW50RGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBGeC5sb25lVW5ob3ZlcihzdmdDb250YWluZXIpO1xuICAgICAgICBnZC5lbWl0KCdwbG90bHlfdW5ob3ZlcicsIG9sZEV2ZW50RGF0YSk7XG4gICAgfVxuXG4gICAgc2NlbmUuZHJhd0Fubm90YXRpb25zKHNjZW5lKTtcbn07XG5cbnByb3RvLnJlY292ZXJDb250ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjZW5lID0gdGhpcztcblxuICAgIHNjZW5lLmdscGxvdC5kaXNwb3NlKCk7XG5cbiAgICB2YXIgdHJ5UmVjb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihzY2VuZS5nbHBsb3QuZ2wuaXNDb250ZXh0TG9zdCgpKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodHJ5UmVjb3Zlcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXNjZW5lLmluaXRpYWxpemVHTFBsb3QoKSkge1xuICAgICAgICAgICAgTGliLmVycm9yKCdDYXRhc3Ryb3BoaWMgYW5kIHVucmVjb3ZlcmFibGUgV2ViR0wgZXJyb3IuIENvbnRleHQgbG9zdC4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzY2VuZS5wbG90LmFwcGx5KHNjZW5lLCBzY2VuZS5wbG90QXJncyk7XG4gICAgfTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0cnlSZWNvdmVyKTtcbn07XG5cbnZhciBheGlzUHJvcGVydGllcyA9IFsgJ3hheGlzJywgJ3lheGlzJywgJ3pheGlzJyBdO1xuXG5mdW5jdGlvbiBjb21wdXRlVHJhY2VCb3VuZHMoc2NlbmUsIHRyYWNlLCBib3VuZHMpIHtcbiAgICB2YXIgZnVsbFNjZW5lTGF5b3V0ID0gc2NlbmUuZnVsbFNjZW5lTGF5b3V0O1xuXG4gICAgZm9yKHZhciBkID0gMDsgZCA8IDM7IGQrKykge1xuICAgICAgICB2YXIgYXhpc05hbWUgPSBheGlzUHJvcGVydGllc1tkXTtcbiAgICAgICAgdmFyIGF4TGV0dGVyID0gYXhpc05hbWUuY2hhckF0KDApO1xuICAgICAgICB2YXIgYXggPSBmdWxsU2NlbmVMYXlvdXRbYXhpc05hbWVdO1xuICAgICAgICB2YXIgY29vcmRzID0gdHJhY2VbYXhMZXR0ZXJdO1xuICAgICAgICB2YXIgY2FsZW5kYXIgPSB0cmFjZVtheExldHRlciArICdjYWxlbmRhciddO1xuICAgICAgICB2YXIgbGVuID0gdHJhY2VbJ18nICsgYXhMZXR0ZXIgKyAnbGVuZ3RoJ107XG5cbiAgICAgICAgaWYoIUxpYi5pc0FycmF5T3JUeXBlZEFycmF5KGNvb3JkcykpIHtcbiAgICAgICAgICAgIGJvdW5kc1swXVtkXSA9IE1hdGgubWluKGJvdW5kc1swXVtkXSwgMCk7XG4gICAgICAgICAgICBib3VuZHNbMV1bZF0gPSBNYXRoLm1heChib3VuZHNbMV1bZF0sIGxlbiAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHY7XG5cbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAobGVuIHx8IGNvb3Jkcy5sZW5ndGgpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihMaWIuaXNBcnJheU9yVHlwZWRBcnJheShjb29yZHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjb29yZHNbaV0ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBheC5kMmwoY29vcmRzW2ldW2pdLCAwLCBjYWxlbmRhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaXNOYU4odikgJiYgaXNGaW5pdGUodikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZHNbMF1bZF0gPSBNYXRoLm1pbihib3VuZHNbMF1bZF0sIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kc1sxXVtkXSA9IE1hdGgubWF4KGJvdW5kc1sxXVtkXSwgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2ID0gYXguZDJsKGNvb3Jkc1tpXSwgMCwgY2FsZW5kYXIpO1xuICAgICAgICAgICAgICAgICAgICBpZighaXNOYU4odikgJiYgaXNGaW5pdGUodikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kc1swXVtkXSA9IE1hdGgubWluKGJvdW5kc1swXVtkXSwgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZHNbMV1bZF0gPSBNYXRoLm1heChib3VuZHNbMV1bZF0sIHYpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb21wdXRlQW5ub3RhdGlvbkJvdW5kcyhzY2VuZSwgYm91bmRzKSB7XG4gICAgdmFyIGZ1bGxTY2VuZUxheW91dCA9IHNjZW5lLmZ1bGxTY2VuZUxheW91dDtcbiAgICB2YXIgYW5ub3RhdGlvbnMgPSBmdWxsU2NlbmVMYXlvdXQuYW5ub3RhdGlvbnMgfHwgW107XG5cbiAgICBmb3IodmFyIGQgPSAwOyBkIDwgMzsgZCsrKSB7XG4gICAgICAgIHZhciBheGlzTmFtZSA9IGF4aXNQcm9wZXJ0aWVzW2RdO1xuICAgICAgICB2YXIgYXhMZXR0ZXIgPSBheGlzTmFtZS5jaGFyQXQoMCk7XG4gICAgICAgIHZhciBheCA9IGZ1bGxTY2VuZUxheW91dFtheGlzTmFtZV07XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGFubm90YXRpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgYW5uID0gYW5ub3RhdGlvbnNbal07XG5cbiAgICAgICAgICAgIGlmKGFubi52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF4LnIybChhbm5bYXhMZXR0ZXJdKTtcbiAgICAgICAgICAgICAgICBpZighaXNOYU4ocG9zKSAmJiBpc0Zpbml0ZShwb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kc1swXVtkXSA9IE1hdGgubWluKGJvdW5kc1swXVtkXSwgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgYm91bmRzWzFdW2RdID0gTWF0aC5tYXgoYm91bmRzWzFdW2RdLCBwb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxucHJvdG8ucGxvdCA9IGZ1bmN0aW9uKHNjZW5lRGF0YSwgZnVsbExheW91dCwgbGF5b3V0KSB7XG4gICAgdmFyIHNjZW5lID0gdGhpcztcblxuICAgIC8vIFNhdmUgcGFyYW1ldGVyc1xuICAgIHNjZW5lLnBsb3RBcmdzID0gW3NjZW5lRGF0YSwgZnVsbExheW91dCwgbGF5b3V0XTtcblxuICAgIGlmKHNjZW5lLmdscGxvdC5jb250ZXh0TG9zdCkgcmV0dXJuO1xuXG4gICAgdmFyIGRhdGEsIHRyYWNlO1xuICAgIHZhciBpLCBqLCBheGlzLCBheGlzVHlwZTtcbiAgICB2YXIgZnVsbFNjZW5lTGF5b3V0ID0gZnVsbExheW91dFtzY2VuZS5pZF07XG4gICAgdmFyIHNjZW5lTGF5b3V0ID0gbGF5b3V0W3NjZW5lLmlkXTtcblxuICAgIC8vIFVwZGF0ZSBsYXlvdXRcbiAgICBzY2VuZS5mdWxsTGF5b3V0ID0gZnVsbExheW91dDtcbiAgICBzY2VuZS5mdWxsU2NlbmVMYXlvdXQgPSBmdWxsU2NlbmVMYXlvdXQ7XG5cbiAgICBzY2VuZS5heGVzT3B0aW9ucy5tZXJnZShmdWxsTGF5b3V0LCBmdWxsU2NlbmVMYXlvdXQpO1xuICAgIHNjZW5lLnNwaWtlT3B0aW9ucy5tZXJnZShmdWxsU2NlbmVMYXlvdXQpO1xuXG4gICAgLy8gVXBkYXRlIGNhbWVyYSBhbmQgY2FtZXJhIG1vZGVcbiAgICBzY2VuZS5zZXRWaWV3cG9ydChmdWxsU2NlbmVMYXlvdXQpO1xuICAgIHNjZW5lLnVwZGF0ZUZ4KGZ1bGxTY2VuZUxheW91dC5kcmFnbW9kZSwgZnVsbFNjZW5lTGF5b3V0LmhvdmVybW9kZSk7XG4gICAgc2NlbmUuY2FtZXJhLmVuYWJsZVdoZWVsID0gc2NlbmUuZ3JhcGhEaXYuX2NvbnRleHQuX3Njcm9sbFpvb20uZ2wzZDtcblxuICAgIC8vIFVwZGF0ZSBzY2VuZSBiYWNrZ3JvdW5kXG4gICAgc2NlbmUuZ2xwbG90LnNldENsZWFyQ29sb3Ioc3RyMlJHQkFhcnJheShmdWxsU2NlbmVMYXlvdXQuYmdjb2xvcikpO1xuXG4gICAgLy8gVXBkYXRlIGF4ZXMgZnVuY3Rpb25zIEJFRk9SRSB1cGRhdGluZyB0cmFjZXNcbiAgICBzY2VuZS5zZXRDb252ZXJ0KGF4aXMpO1xuXG4gICAgLy8gQ29udmVydCBzY2VuZSBkYXRhXG4gICAgaWYoIXNjZW5lRGF0YSkgc2NlbmVEYXRhID0gW107XG4gICAgZWxzZSBpZighQXJyYXkuaXNBcnJheShzY2VuZURhdGEpKSBzY2VuZURhdGEgPSBbc2NlbmVEYXRhXTtcblxuICAgIC8vIENvbXB1dGUgdHJhY2UgYm91bmRpbmcgYm94XG4gICAgdmFyIGRhdGFCb3VuZHMgPSBbXG4gICAgICAgIFtJbmZpbml0eSwgSW5maW5pdHksIEluZmluaXR5XSxcbiAgICAgICAgWy1JbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHldXG4gICAgXTtcblxuICAgIGZvcihpID0gMDsgaSA8IHNjZW5lRGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICBkYXRhID0gc2NlbmVEYXRhW2ldO1xuICAgICAgICBpZihkYXRhLnZpc2libGUgIT09IHRydWUgfHwgZGF0YS5fbGVuZ3RoID09PSAwKSBjb250aW51ZTtcblxuICAgICAgICBjb21wdXRlVHJhY2VCb3VuZHModGhpcywgZGF0YSwgZGF0YUJvdW5kcyk7XG4gICAgfVxuICAgIGNvbXB1dGVBbm5vdGF0aW9uQm91bmRzKHRoaXMsIGRhdGFCb3VuZHMpO1xuXG4gICAgdmFyIGRhdGFTY2FsZSA9IFsxLCAxLCAxXTtcbiAgICBmb3IoaiA9IDA7IGogPCAzOyArK2opIHtcbiAgICAgICAgaWYoZGF0YUJvdW5kc1sxXVtqXSA9PT0gZGF0YUJvdW5kc1swXVtqXSkge1xuICAgICAgICAgICAgZGF0YVNjYWxlW2pdID0gMS4wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YVNjYWxlW2pdID0gMS4wIC8gKGRhdGFCb3VuZHNbMV1bal0gLSBkYXRhQm91bmRzWzBdW2pdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNhdmUgc2NhbGVcbiAgICBzY2VuZS5kYXRhU2NhbGUgPSBkYXRhU2NhbGU7XG5cbiAgICAvLyBhZnRlciBjb21wdXRlVHJhY2VCb3VuZHMgd2hlcmUgYXguX2NhdGVnb3JpZXMgYXJlIGZpbGxlZCBpblxuICAgIHNjZW5lLmNvbnZlcnRBbm5vdGF0aW9ucyh0aGlzKTtcblxuICAgIC8vIFVwZGF0ZSB0cmFjZXNcbiAgICBmb3IoaSA9IDA7IGkgPCBzY2VuZURhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZGF0YSA9IHNjZW5lRGF0YVtpXTtcbiAgICAgICAgaWYoZGF0YS52aXNpYmxlICE9PSB0cnVlIHx8IGRhdGEuX2xlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdHJhY2UgPSBzY2VuZS50cmFjZXNbZGF0YS51aWRdO1xuICAgICAgICBpZih0cmFjZSkge1xuICAgICAgICAgICAgaWYodHJhY2UuZGF0YS50eXBlID09PSBkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICB0cmFjZS51cGRhdGUoZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYWNlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB0cmFjZSA9IGRhdGEuX21vZHVsZS5wbG90KHRoaXMsIGRhdGEpO1xuICAgICAgICAgICAgICAgIHNjZW5lLnRyYWNlc1tkYXRhLnVpZF0gPSB0cmFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYWNlID0gZGF0YS5fbW9kdWxlLnBsb3QodGhpcywgZGF0YSk7XG4gICAgICAgICAgICBzY2VuZS50cmFjZXNbZGF0YS51aWRdID0gdHJhY2U7XG4gICAgICAgIH1cbiAgICAgICAgdHJhY2UubmFtZSA9IGRhdGEubmFtZTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZW1wdHkgdHJhY2VzXG4gICAgdmFyIHRyYWNlSWRzID0gT2JqZWN0LmtleXMoc2NlbmUudHJhY2VzKTtcblxuICAgIHRyYWNlSWRMb29wOlxuICAgIGZvcihpID0gMDsgaSA8IHRyYWNlSWRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IHNjZW5lRGF0YS5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgaWYoc2NlbmVEYXRhW2pdLnVpZCA9PT0gdHJhY2VJZHNbaV0gJiZcbiAgICAgICAgICAgICAgICAoc2NlbmVEYXRhW2pdLnZpc2libGUgPT09IHRydWUgJiYgc2NlbmVEYXRhW2pdLl9sZW5ndGggIT09IDApKSB7XG4gICAgICAgICAgICAgICAgY29udGludWUgdHJhY2VJZExvb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJhY2UgPSBzY2VuZS50cmFjZXNbdHJhY2VJZHNbaV1dO1xuICAgICAgICB0cmFjZS5kaXNwb3NlKCk7XG4gICAgICAgIGRlbGV0ZSBzY2VuZS50cmFjZXNbdHJhY2VJZHNbaV1dO1xuICAgIH1cblxuICAgIC8vIG9yZGVyIG9iamVjdCBwZXIgdHJhY2UgaW5kZXhcbiAgICBzY2VuZS5nbHBsb3Qub2JqZWN0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuX3RyYWNlLmRhdGEuaW5kZXggLSBiLl90cmFjZS5kYXRhLmluZGV4O1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHJhbmdlcyAobmVlZHMgdG8gYmUgY2FsbGVkICphZnRlciogb2JqZWN0cyBhcmUgYWRkZWQgZHVlIHRvIHVwZGF0ZXMpXG4gICAgdmFyIHNjZW5lQm91bmRzID0gW1swLCAwLCAwXSwgWzAsIDAsIDBdXTtcbiAgICB2YXIgYXhpc0RhdGFSYW5nZSA9IFtdO1xuICAgIHZhciBheGlzVHlwZVJhdGlvcyA9IHt9O1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgIGF4aXMgPSBmdWxsU2NlbmVMYXlvdXRbYXhpc1Byb3BlcnRpZXNbaV1dO1xuICAgICAgICBheGlzVHlwZSA9IGF4aXMudHlwZTtcblxuICAgICAgICBpZihheGlzVHlwZSBpbiBheGlzVHlwZVJhdGlvcykge1xuICAgICAgICAgICAgYXhpc1R5cGVSYXRpb3NbYXhpc1R5cGVdLmFjYyAqPSBkYXRhU2NhbGVbaV07XG4gICAgICAgICAgICBheGlzVHlwZVJhdGlvc1theGlzVHlwZV0uY291bnQgKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF4aXNUeXBlUmF0aW9zW2F4aXNUeXBlXSA9IHtcbiAgICAgICAgICAgICAgICBhY2M6IGRhdGFTY2FsZVtpXSxcbiAgICAgICAgICAgICAgICBjb3VudDogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGF4aXMuYXV0b3JhbmdlKSB7XG4gICAgICAgICAgICBzY2VuZUJvdW5kc1swXVtpXSA9IEluZmluaXR5O1xuICAgICAgICAgICAgc2NlbmVCb3VuZHNbMV1baV0gPSAtSW5maW5pdHk7XG5cbiAgICAgICAgICAgIHZhciBvYmplY3RzID0gc2NlbmUuZ2xwbG90Lm9iamVjdHM7XG4gICAgICAgICAgICB2YXIgYW5ub3RhdGlvbnMgPSBzY2VuZS5mdWxsU2NlbmVMYXlvdXQuYW5ub3RhdGlvbnMgfHwgW107XG4gICAgICAgICAgICB2YXIgYXhMZXR0ZXIgPSBheGlzLl9uYW1lLmNoYXJBdCgwKTtcblxuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgb2JqZWN0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSBvYmplY3RzW2pdO1xuICAgICAgICAgICAgICAgIHZhciBvYmpCb3VuZHMgPSBvYmouYm91bmRzO1xuICAgICAgICAgICAgICAgIHZhciBwYWQgPSBvYmouX3RyYWNlLmRhdGEuX3BhZCB8fCAwO1xuXG4gICAgICAgICAgICAgICAgaWYob2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdFcnJvckJhcnMnICYmIGF4aXMuX2xvd2VyTG9nRXJyb3JCb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBzY2VuZUJvdW5kc1swXVtpXSA9IE1hdGgubWluKHNjZW5lQm91bmRzWzBdW2ldLCBheGlzLl9sb3dlckxvZ0Vycm9yQm91bmQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjZW5lQm91bmRzWzBdW2ldID0gTWF0aC5taW4oc2NlbmVCb3VuZHNbMF1baV0sIG9iakJvdW5kc1swXVtpXSAvIGRhdGFTY2FsZVtpXSAtIHBhZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjZW5lQm91bmRzWzFdW2ldID0gTWF0aC5tYXgoc2NlbmVCb3VuZHNbMV1baV0sIG9iakJvdW5kc1sxXVtpXSAvIGRhdGFTY2FsZVtpXSArIHBhZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IGFubm90YXRpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFubiA9IGFubm90YXRpb25zW2pdO1xuXG4gICAgICAgICAgICAgICAgLy8gTi5CLiBub3QgdGFraW5nIGludG8gY29uc2lkZXJhdGlvbiB0aGUgYXJyb3doZWFkXG4gICAgICAgICAgICAgICAgaWYoYW5uLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGF4aXMucjJsKGFubltheExldHRlcl0pO1xuICAgICAgICAgICAgICAgICAgICBzY2VuZUJvdW5kc1swXVtpXSA9IE1hdGgubWluKHNjZW5lQm91bmRzWzBdW2ldLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICBzY2VuZUJvdW5kc1sxXVtpXSA9IE1hdGgubWF4KHNjZW5lQm91bmRzWzFdW2ldLCBwb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoJ3JhbmdlbW9kZScgaW4gYXhpcyAmJiBheGlzLnJhbmdlbW9kZSA9PT0gJ3RvemVybycpIHtcbiAgICAgICAgICAgICAgICBzY2VuZUJvdW5kc1swXVtpXSA9IE1hdGgubWluKHNjZW5lQm91bmRzWzBdW2ldLCAwKTtcbiAgICAgICAgICAgICAgICBzY2VuZUJvdW5kc1sxXVtpXSA9IE1hdGgubWF4KHNjZW5lQm91bmRzWzFdW2ldLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHNjZW5lQm91bmRzWzBdW2ldID4gc2NlbmVCb3VuZHNbMV1baV0pIHtcbiAgICAgICAgICAgICAgICBzY2VuZUJvdW5kc1swXVtpXSA9IC0xO1xuICAgICAgICAgICAgICAgIHNjZW5lQm91bmRzWzFdW2ldID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBzY2VuZUJvdW5kc1sxXVtpXSAtIHNjZW5lQm91bmRzWzBdW2ldO1xuICAgICAgICAgICAgICAgIHNjZW5lQm91bmRzWzBdW2ldIC09IGQgLyAzMi4wO1xuICAgICAgICAgICAgICAgIHNjZW5lQm91bmRzWzFdW2ldICs9IGQgLyAzMi4wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihheGlzLmF1dG9yYW5nZSA9PT0gJ3JldmVyc2VkJykge1xuICAgICAgICAgICAgICAgIC8vIHN3YXAgYm91bmRzOlxuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBzY2VuZUJvdW5kc1swXVtpXTtcbiAgICAgICAgICAgICAgICBzY2VuZUJvdW5kc1swXVtpXSA9IHNjZW5lQm91bmRzWzFdW2ldO1xuICAgICAgICAgICAgICAgIHNjZW5lQm91bmRzWzFdW2ldID0gdG1wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gYXhpcy5yYW5nZTtcbiAgICAgICAgICAgIHNjZW5lQm91bmRzWzBdW2ldID0gYXhpcy5yMmwocmFuZ2VbMF0pO1xuICAgICAgICAgICAgc2NlbmVCb3VuZHNbMV1baV0gPSBheGlzLnIybChyYW5nZVsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoc2NlbmVCb3VuZHNbMF1baV0gPT09IHNjZW5lQm91bmRzWzFdW2ldKSB7XG4gICAgICAgICAgICBzY2VuZUJvdW5kc1swXVtpXSAtPSAxO1xuICAgICAgICAgICAgc2NlbmVCb3VuZHNbMV1baV0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBheGlzRGF0YVJhbmdlW2ldID0gc2NlbmVCb3VuZHNbMV1baV0gLSBzY2VuZUJvdW5kc1swXVtpXTtcblxuICAgICAgICAvLyBVcGRhdGUgcGxvdCBib3VuZHNcbiAgICAgICAgc2NlbmUuZ2xwbG90LnNldEJvdW5kcyhpLCB7XG4gICAgICAgICAgICBtaW46IHNjZW5lQm91bmRzWzBdW2ldICogZGF0YVNjYWxlW2ldLFxuICAgICAgICAgICAgbWF4OiBzY2VuZUJvdW5kc1sxXVtpXSAqIGRhdGFTY2FsZVtpXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIER5bmFtaWNhbGx5IHNldCB0aGUgYXNwZWN0IHJhdGlvIGRlcGVuZGluZyBvbiB0aGUgdXNlcnMgYXNwZWN0IHNldHRpbmdzXG4gICAgICovXG4gICAgdmFyIGFzcGVjdFJhdGlvO1xuICAgIHZhciBhc3BlY3Rtb2RlID0gZnVsbFNjZW5lTGF5b3V0LmFzcGVjdG1vZGU7XG4gICAgaWYoYXNwZWN0bW9kZSA9PT0gJ2N1YmUnKSB7XG4gICAgICAgIGFzcGVjdFJhdGlvID0gWzEsIDEsIDFdO1xuICAgIH0gZWxzZSBpZihhc3BlY3Rtb2RlID09PSAnbWFudWFsJykge1xuICAgICAgICB2YXIgdXNlclJhdGlvID0gZnVsbFNjZW5lTGF5b3V0LmFzcGVjdHJhdGlvO1xuICAgICAgICBhc3BlY3RSYXRpbyA9IFt1c2VyUmF0aW8ueCwgdXNlclJhdGlvLnksIHVzZXJSYXRpby56XTtcbiAgICB9IGVsc2UgaWYoYXNwZWN0bW9kZSA9PT0gJ2F1dG8nIHx8IGFzcGVjdG1vZGUgPT09ICdkYXRhJykge1xuICAgICAgICB2YXIgYXhlc1NjYWxlUmF0aW8gPSBbMSwgMSwgMV07XG4gICAgICAgIC8vIENvbXB1dGUgYXhpcyBzY2FsZSBwZXIgY2F0ZWdvcnlcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICBheGlzID0gZnVsbFNjZW5lTGF5b3V0W2F4aXNQcm9wZXJ0aWVzW2ldXTtcbiAgICAgICAgICAgIGF4aXNUeXBlID0gYXhpcy50eXBlO1xuICAgICAgICAgICAgdmFyIGF4aXNSYXRpbyA9IGF4aXNUeXBlUmF0aW9zW2F4aXNUeXBlXTtcbiAgICAgICAgICAgIGF4ZXNTY2FsZVJhdGlvW2ldID0gTWF0aC5wb3coYXhpc1JhdGlvLmFjYywgMS4wIC8gYXhpc1JhdGlvLmNvdW50KSAvIGRhdGFTY2FsZVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGFzcGVjdG1vZGUgPT09ICdkYXRhJykge1xuICAgICAgICAgICAgYXNwZWN0UmF0aW8gPSBheGVzU2NhbGVSYXRpbztcbiAgICAgICAgfSBlbHNlIHsgLy8gaS5lLiAnYXV0bycgb3B0aW9uXG4gICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICBNYXRoLm1heC5hcHBseShudWxsLCBheGVzU2NhbGVSYXRpbykgL1xuICAgICAgICAgICAgICAgIE1hdGgubWluLmFwcGx5KG51bGwsIGF4ZXNTY2FsZVJhdGlvKSA8PSA0XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBVU0UgREFUQSBNT0RFIFdIRU4gQVhJUyBSQU5HRSBESU1FTlNJT05TIEFSRSBSRUxBVElWRUxZIEVRVUFMXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW8gPSBheGVzU2NhbGVSYXRpbztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVVNFIEVRVUFMIE1PREUgV0hFTiBBWElTIFJBTkdFIERJTUVOU0lPTlMgQVJFIEhJR0hMWSBVTkVRVUFMXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW8gPSBbMSwgMSwgMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NjZW5lLmpzIGFzcGVjdFJhdGlvIHdhcyBub3Qgb25lIG9mIHRoZSBlbnVtZXJhdGVkIHR5cGVzJyk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBXcml0ZSBhc3BlY3QgUmF0aW8gYmFjayB0byB1c2VyIGRhdGEgYW5kIGZ1bGxMYXlvdXQgc28gdGhhdCBpdCBpcyBtb2RpZmllcyBhcyB1c2VyXG4gICAgICogbWFuaXB1bGF0ZXMgdGhlIGFzcGVjdG1vZGUgc2V0dGluZ3MgYW5kIHRoZSBmdWxsTGF5b3V0IGlzIHVwLXRvLWRhdGUuXG4gICAgICovXG4gICAgZnVsbFNjZW5lTGF5b3V0LmFzcGVjdHJhdGlvLnggPSBzY2VuZUxheW91dC5hc3BlY3RyYXRpby54ID0gYXNwZWN0UmF0aW9bMF07XG4gICAgZnVsbFNjZW5lTGF5b3V0LmFzcGVjdHJhdGlvLnkgPSBzY2VuZUxheW91dC5hc3BlY3RyYXRpby55ID0gYXNwZWN0UmF0aW9bMV07XG4gICAgZnVsbFNjZW5lTGF5b3V0LmFzcGVjdHJhdGlvLnogPSBzY2VuZUxheW91dC5hc3BlY3RyYXRpby56ID0gYXNwZWN0UmF0aW9bMl07XG5cbiAgICAvKlxuICAgICAqIEZpbmFsbHkgYXNzaWduIHRoZSBjb21wdXRlZCBhc3BlY3JhdGlvIHRvIHRoZSBnbHBsb3QgbW9kdWxlLiBUaGlzIHdpbGwgaGF2ZSBhbiBlZmZlY3RcbiAgICAgKiBvbiB0aGUgbmV4dCByZW5kZXIgY3ljbGUuXG4gICAgICovXG4gICAgc2NlbmUuZ2xwbG90LnNldEFzcGVjdHJhdGlvKGZ1bGxTY2VuZUxheW91dC5hc3BlY3RyYXRpbyk7XG5cbiAgICAvLyBzYXZlICdpbml0aWFsJyBhc3BlY3RyYXRpbyAmIGFzcGVjdG1vZGUgdmlldyBzZXR0aW5ncyBmb3IgbW9kZWJhciBidXR0b25zXG4gICAgaWYoIXNjZW5lLnZpZXdJbml0aWFsLmFzcGVjdHJhdGlvKSB7XG4gICAgICAgIHNjZW5lLnZpZXdJbml0aWFsLmFzcGVjdHJhdGlvID0ge1xuICAgICAgICAgICAgeDogZnVsbFNjZW5lTGF5b3V0LmFzcGVjdHJhdGlvLngsXG4gICAgICAgICAgICB5OiBmdWxsU2NlbmVMYXlvdXQuYXNwZWN0cmF0aW8ueSxcbiAgICAgICAgICAgIHo6IGZ1bGxTY2VuZUxheW91dC5hc3BlY3RyYXRpby56XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmKCFzY2VuZS52aWV3SW5pdGlhbC5hc3BlY3Rtb2RlKSB7XG4gICAgICAgIHNjZW5lLnZpZXdJbml0aWFsLmFzcGVjdG1vZGUgPSBmdWxsU2NlbmVMYXlvdXQuYXNwZWN0bW9kZTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgZnJhbWUgcG9zaXRpb24gZm9yIG11bHRpIHBsb3RzXG4gICAgdmFyIGRvbWFpbiA9IGZ1bGxTY2VuZUxheW91dC5kb21haW4gfHwgbnVsbDtcbiAgICB2YXIgc2l6ZSA9IGZ1bGxMYXlvdXQuX3NpemUgfHwgbnVsbDtcblxuICAgIGlmKGRvbWFpbiAmJiBzaXplKSB7XG4gICAgICAgIHZhciBjb250YWluZXJTdHlsZSA9IHNjZW5lLmNvbnRhaW5lci5zdHlsZTtcbiAgICAgICAgY29udGFpbmVyU3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBjb250YWluZXJTdHlsZS5sZWZ0ID0gKHNpemUubCArIGRvbWFpbi54WzBdICogc2l6ZS53KSArICdweCc7XG4gICAgICAgIGNvbnRhaW5lclN0eWxlLnRvcCA9IChzaXplLnQgKyAoMSAtIGRvbWFpbi55WzFdKSAqIHNpemUuaCkgKyAncHgnO1xuICAgICAgICBjb250YWluZXJTdHlsZS53aWR0aCA9IChzaXplLncgKiAoZG9tYWluLnhbMV0gLSBkb21haW4ueFswXSkpICsgJ3B4JztcbiAgICAgICAgY29udGFpbmVyU3R5bGUuaGVpZ2h0ID0gKHNpemUuaCAqIChkb21haW4ueVsxXSAtIGRvbWFpbi55WzBdKSkgKyAncHgnO1xuICAgIH1cblxuICAgIC8vIGZvcmNlIHJlZHJhdyBzbyB0aGF0IHByb21pc2UgaXMgcmV0dXJuZWQgd2hlbiByZW5kZXJpbmcgaXMgY29tcGxldGVkXG4gICAgc2NlbmUuZ2xwbG90LnJlZHJhdygpO1xufTtcblxucHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2VuZSA9IHRoaXM7XG5cbiAgICBpZighc2NlbmUuZ2xwbG90KSByZXR1cm47XG4gICAgc2NlbmUuY2FtZXJhLm1vdXNlTGlzdGVuZXIuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHNjZW5lLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNjZW5lLmNhbWVyYS53aGVlbExpc3RlbmVyKTtcbiAgICBzY2VuZS5jYW1lcmEgPSBudWxsO1xuICAgIHNjZW5lLmdscGxvdC5kaXNwb3NlKCk7XG4gICAgc2NlbmUuY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NlbmUuY29udGFpbmVyKTtcbiAgICBzY2VuZS5nbHBsb3QgPSBudWxsO1xufTtcblxuLy8gZ2V0Q2FtZXJhQXJyYXlzIDo6IHBsb3RseV9jb29yZHMgLT4gZ2wtcGxvdDNkX2Nvb3Jkc1xuLy8gaW52ZXJzZSBvZiBnZXRMYXlvdXRDYW1lcmFcbmZ1bmN0aW9uIGdldENhbWVyYUFycmF5cyhjYW1lcmEpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBbY2FtZXJhLmV5ZS54LCBjYW1lcmEuZXllLnksIGNhbWVyYS5leWUuel0sXG4gICAgICAgIFtjYW1lcmEuY2VudGVyLngsIGNhbWVyYS5jZW50ZXIueSwgY2FtZXJhLmNlbnRlci56XSxcbiAgICAgICAgW2NhbWVyYS51cC54LCBjYW1lcmEudXAueSwgY2FtZXJhLnVwLnpdXG4gICAgXTtcbn1cblxuLy8gZ2V0TGF5b3V0Q2FtZXJhIDo6IGdsLXBsb3QzZF9jb29yZHMgLT4gcGxvdGx5X2Nvb3Jkc1xuLy8gaW52ZXJzZSBvZiBnZXRDYW1lcmFBcnJheXNcbmZ1bmN0aW9uIGdldExheW91dENhbWVyYShjYW1lcmEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1cDoge3g6IGNhbWVyYS51cFswXSwgeTogY2FtZXJhLnVwWzFdLCB6OiBjYW1lcmEudXBbMl19LFxuICAgICAgICBjZW50ZXI6IHt4OiBjYW1lcmEuY2VudGVyWzBdLCB5OiBjYW1lcmEuY2VudGVyWzFdLCB6OiBjYW1lcmEuY2VudGVyWzJdfSxcbiAgICAgICAgZXllOiB7eDogY2FtZXJhLmV5ZVswXSwgeTogY2FtZXJhLmV5ZVsxXSwgejogY2FtZXJhLmV5ZVsyXX0sXG4gICAgICAgIHByb2plY3Rpb246IHt0eXBlOiAoY2FtZXJhLl9vcnRobyA9PT0gdHJ1ZSkgPyAnb3J0aG9ncmFwaGljJyA6ICdwZXJzcGVjdGl2ZSd9XG4gICAgfTtcbn1cblxuLy8gZ2V0IGNhbWVyYSBwb3NpdGlvbiBpbiBwbG90bHkgY29vcmRzIGZyb20gJ2dsLXBsb3QzZCcgY29vcmRzXG5wcm90by5nZXRDYW1lcmEgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NlbmUgPSB0aGlzO1xuICAgIHNjZW5lLmNhbWVyYS52aWV3LnJlY2FsY01hdHJpeChzY2VuZS5jYW1lcmEudmlldy5sYXN0VCgpKTtcbiAgICByZXR1cm4gZ2V0TGF5b3V0Q2FtZXJhKHNjZW5lLmNhbWVyYSk7XG59O1xuXG4vLyBzZXQgZ2wtcGxvdDNkIGNhbWVyYSBwb3NpdGlvbiBhbmQgc2NlbmUgYXNwZWN0cyB3aXRoIGEgc2V0IG9mIHBsb3RseSBjb29yZHNcbnByb3RvLnNldFZpZXdwb3J0ID0gZnVuY3Rpb24oc2NlbmVMYXlvdXQpIHtcbiAgICB2YXIgc2NlbmUgPSB0aGlzO1xuICAgIHZhciBjYW1lcmFEYXRhID0gc2NlbmVMYXlvdXQuY2FtZXJhO1xuXG4gICAgc2NlbmUuY2FtZXJhLmxvb2tBdC5hcHBseSh0aGlzLCBnZXRDYW1lcmFBcnJheXMoY2FtZXJhRGF0YSkpO1xuICAgIHNjZW5lLmdscGxvdC5zZXRBc3BlY3RyYXRpbyhzY2VuZUxheW91dC5hc3BlY3RyYXRpbyk7XG5cbiAgICB2YXIgbmV3T3J0aG8gPSAoY2FtZXJhRGF0YS5wcm9qZWN0aW9uLnR5cGUgPT09ICdvcnRob2dyYXBoaWMnKTtcbiAgICB2YXIgb2xkT3J0aG8gPSBzY2VuZS5jYW1lcmEuX29ydGhvO1xuXG4gICAgaWYobmV3T3J0aG8gIT09IG9sZE9ydGhvKSB7XG4gICAgICAgIHNjZW5lLmdscGxvdC5yZWRyYXcoKTsgLy8gVE9ETzogZmlndXJlIG91dCB3aHkgd2UgbmVlZCB0byByZWRyYXcgaGVyZT9cbiAgICAgICAgc2NlbmUuZ2xwbG90LmNsZWFyUkdCQSgpO1xuICAgICAgICBzY2VuZS5nbHBsb3QuZGlzcG9zZSgpO1xuICAgICAgICBzY2VuZS5pbml0aWFsaXplR0xQbG90KCk7XG4gICAgfVxufTtcblxucHJvdG8uaXNDYW1lcmFDaGFuZ2VkID0gZnVuY3Rpb24obGF5b3V0KSB7XG4gICAgdmFyIHNjZW5lID0gdGhpcztcbiAgICB2YXIgY2FtZXJhRGF0YSA9IHNjZW5lLmdldENhbWVyYSgpO1xuICAgIHZhciBjYW1lcmFOZXN0ZWRQcm9wID0gTGliLm5lc3RlZFByb3BlcnR5KGxheW91dCwgc2NlbmUuaWQgKyAnLmNhbWVyYScpO1xuICAgIHZhciBjYW1lcmFEYXRhTGFzdFNhdmUgPSBjYW1lcmFOZXN0ZWRQcm9wLmdldCgpO1xuXG4gICAgZnVuY3Rpb24gc2FtZSh4LCB5LCBpLCBqKSB7XG4gICAgICAgIHZhciB2ZWN0b3JzID0gWyd1cCcsICdjZW50ZXInLCAnZXllJ107XG4gICAgICAgIHZhciBjb21wb25lbnRzID0gWyd4JywgJ3knLCAneiddO1xuICAgICAgICByZXR1cm4geVt2ZWN0b3JzW2ldXSAmJiAoeFt2ZWN0b3JzW2ldXVtjb21wb25lbnRzW2pdXSA9PT0geVt2ZWN0b3JzW2ldXVtjb21wb25lbnRzW2pdXSk7XG4gICAgfVxuXG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICBpZihjYW1lcmFEYXRhTGFzdFNhdmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYoIXNhbWUoY2FtZXJhRGF0YSwgY2FtZXJhRGF0YUxhc3RTYXZlLCBpLCBqKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWNhbWVyYURhdGFMYXN0U2F2ZS5wcm9qZWN0aW9uIHx8IChcbiAgICAgICAgICAgIGNhbWVyYURhdGEucHJvamVjdGlvbiAmJlxuICAgICAgICAgICAgY2FtZXJhRGF0YS5wcm9qZWN0aW9uLnR5cGUgIT09IGNhbWVyYURhdGFMYXN0U2F2ZS5wcm9qZWN0aW9uLnR5cGUpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGFuZ2VkO1xufTtcblxucHJvdG8uaXNBc3BlY3RDaGFuZ2VkID0gZnVuY3Rpb24obGF5b3V0KSB7XG4gICAgdmFyIHNjZW5lID0gdGhpcztcbiAgICB2YXIgYXNwZWN0RGF0YSA9IHNjZW5lLmdscGxvdC5nZXRBc3BlY3RyYXRpbygpO1xuICAgIHZhciBhc3BlY3ROZXN0ZWRQcm9wID0gTGliLm5lc3RlZFByb3BlcnR5KGxheW91dCwgc2NlbmUuaWQgKyAnLmFzcGVjdHJhdGlvJyk7XG4gICAgdmFyIGFzcGVjdERhdGFMYXN0U2F2ZSA9IGFzcGVjdE5lc3RlZFByb3AuZ2V0KCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBhc3BlY3REYXRhTGFzdFNhdmUgPT09IHVuZGVmaW5lZCB8fCAoXG4gICAgICAgIGFzcGVjdERhdGFMYXN0U2F2ZS54ICE9PSBhc3BlY3REYXRhLnggfHxcbiAgICAgICAgYXNwZWN0RGF0YUxhc3RTYXZlLnkgIT09IGFzcGVjdERhdGEueSB8fFxuICAgICAgICBhc3BlY3REYXRhTGFzdFNhdmUueiAhPT0gYXNwZWN0RGF0YS56XG4gICAgKSk7XG59O1xuXG4vLyBzYXZlIGNhbWVyYSB0byB1c2VyIGxheW91dCAoaS5lLiBnZC5sYXlvdXQpXG5wcm90by5zYXZlTGF5b3V0ID0gZnVuY3Rpb24obGF5b3V0KSB7XG4gICAgdmFyIHNjZW5lID0gdGhpcztcbiAgICB2YXIgZnVsbExheW91dCA9IHNjZW5lLmZ1bGxMYXlvdXQ7XG5cbiAgICB2YXIgY2FtZXJhRGF0YTtcbiAgICB2YXIgY2FtZXJhTmVzdGVkUHJvcDtcbiAgICB2YXIgY2FtZXJhRGF0YUxhc3RTYXZlO1xuXG4gICAgdmFyIGFzcGVjdERhdGE7XG4gICAgdmFyIGFzcGVjdE5lc3RlZFByb3A7XG4gICAgdmFyIGFzcGVjdERhdGFMYXN0U2F2ZTtcblxuICAgIHZhciBjYW1lcmFDaGFuZ2VkID0gc2NlbmUuaXNDYW1lcmFDaGFuZ2VkKGxheW91dCk7XG4gICAgdmFyIGFzcGVjdENoYW5nZWQgPSBzY2VuZS5pc0FzcGVjdENoYW5nZWQobGF5b3V0KTtcblxuICAgIHZhciBoYXNDaGFuZ2VkID0gY2FtZXJhQ2hhbmdlZCB8fCBhc3BlY3RDaGFuZ2VkO1xuICAgIGlmKGhhc0NoYW5nZWQpIHtcbiAgICAgICAgdmFyIHByZUdVSSA9IHt9O1xuICAgICAgICBpZihjYW1lcmFDaGFuZ2VkKSB7XG4gICAgICAgICAgICBjYW1lcmFEYXRhID0gc2NlbmUuZ2V0Q2FtZXJhKCk7XG4gICAgICAgICAgICBjYW1lcmFOZXN0ZWRQcm9wID0gTGliLm5lc3RlZFByb3BlcnR5KGxheW91dCwgc2NlbmUuaWQgKyAnLmNhbWVyYScpO1xuICAgICAgICAgICAgY2FtZXJhRGF0YUxhc3RTYXZlID0gY2FtZXJhTmVzdGVkUHJvcC5nZXQoKTtcblxuICAgICAgICAgICAgcHJlR1VJW3NjZW5lLmlkICsgJy5jYW1lcmEnXSA9IGNhbWVyYURhdGFMYXN0U2F2ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihhc3BlY3RDaGFuZ2VkKSB7XG4gICAgICAgICAgICBhc3BlY3REYXRhID0gc2NlbmUuZ2xwbG90LmdldEFzcGVjdHJhdGlvKCk7XG4gICAgICAgICAgICBhc3BlY3ROZXN0ZWRQcm9wID0gTGliLm5lc3RlZFByb3BlcnR5KGxheW91dCwgc2NlbmUuaWQgKyAnLmFzcGVjdHJhdGlvJyk7XG4gICAgICAgICAgICBhc3BlY3REYXRhTGFzdFNhdmUgPSBhc3BlY3ROZXN0ZWRQcm9wLmdldCgpO1xuXG4gICAgICAgICAgICBwcmVHVUlbc2NlbmUuaWQgKyAnLmFzcGVjdHJhdGlvJ10gPSBhc3BlY3REYXRhTGFzdFNhdmU7XG4gICAgICAgIH1cbiAgICAgICAgUmVnaXN0cnkuY2FsbCgnX3N0b3JlRGlyZWN0R1VJRWRpdCcsIGxheW91dCwgZnVsbExheW91dC5fcHJlR1VJLCBwcmVHVUkpO1xuXG4gICAgICAgIGlmKGNhbWVyYUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGNhbWVyYU5lc3RlZFByb3Auc2V0KGNhbWVyYURhdGEpO1xuXG4gICAgICAgICAgICB2YXIgY2FtZXJhRnVsbE5QID0gTGliLm5lc3RlZFByb3BlcnR5KGZ1bGxMYXlvdXQsIHNjZW5lLmlkICsgJy5jYW1lcmEnKTtcbiAgICAgICAgICAgIGNhbWVyYUZ1bGxOUC5zZXQoY2FtZXJhRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihhc3BlY3RDaGFuZ2VkKSB7XG4gICAgICAgICAgICBhc3BlY3ROZXN0ZWRQcm9wLnNldChhc3BlY3REYXRhKTtcblxuICAgICAgICAgICAgdmFyIGFzcGVjdEZ1bGxOUCA9IExpYi5uZXN0ZWRQcm9wZXJ0eShmdWxsTGF5b3V0LCBzY2VuZS5pZCArICcuYXNwZWN0cmF0aW8nKTtcbiAgICAgICAgICAgIGFzcGVjdEZ1bGxOUC5zZXQoYXNwZWN0RGF0YSk7XG5cbiAgICAgICAgICAgIHNjZW5lLmdscGxvdC5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBoYXNDaGFuZ2VkO1xufTtcblxucHJvdG8udXBkYXRlRnggPSBmdW5jdGlvbihkcmFnbW9kZSwgaG92ZXJtb2RlKSB7XG4gICAgdmFyIHNjZW5lID0gdGhpcztcbiAgICB2YXIgY2FtZXJhID0gc2NlbmUuY2FtZXJhO1xuICAgIGlmKGNhbWVyYSkge1xuICAgICAgICAvLyByb3RhdGUgYW5kIG9yYml0YWwgYXJlIHN5bm9ueW1vdXNcbiAgICAgICAgaWYoZHJhZ21vZGUgPT09ICdvcmJpdCcpIHtcbiAgICAgICAgICAgIGNhbWVyYS5tb2RlID0gJ29yYml0JztcbiAgICAgICAgICAgIGNhbWVyYS5rZXlCaW5kaW5nTW9kZSA9ICdyb3RhdGUnO1xuICAgICAgICB9IGVsc2UgaWYoZHJhZ21vZGUgPT09ICd0dXJudGFibGUnKSB7XG4gICAgICAgICAgICBjYW1lcmEudXAgPSBbMCwgMCwgMV07XG4gICAgICAgICAgICBjYW1lcmEubW9kZSA9ICd0dXJudGFibGUnO1xuICAgICAgICAgICAgY2FtZXJhLmtleUJpbmRpbmdNb2RlID0gJ3JvdGF0ZSc7XG5cbiAgICAgICAgICAgIC8vIFRoZSBzZXR0ZXIgZm9yIGNhbWVyYS5tb2RlIGFuaW1hdGVzIHRoZSB0cmFuc2l0aW9uIHRvIHotdXAsXG4gICAgICAgICAgICAvLyBidXQgb25seSBpZiB3ZSAqZG9uJ3QqIGV4cGxpY2l0bHkgc2V0IHotdXAgZWFybGllciB2aWEgdGhlXG4gICAgICAgICAgICAvLyByZWxheW91dC4gU28gcHVzaCBgdXBgIGJhY2sgdG8gbGF5b3V0ICYgZnVsbExheW91dCBtYW51YWxseSBub3cuXG4gICAgICAgICAgICB2YXIgZ2QgPSBzY2VuZS5ncmFwaERpdjtcbiAgICAgICAgICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgICAgICAgICB2YXIgZnVsbENhbWVyYSA9IHNjZW5lLmZ1bGxTY2VuZUxheW91dC5jYW1lcmE7XG4gICAgICAgICAgICB2YXIgeCA9IGZ1bGxDYW1lcmEudXAueDtcbiAgICAgICAgICAgIHZhciB5ID0gZnVsbENhbWVyYS51cC55O1xuICAgICAgICAgICAgdmFyIHogPSBmdWxsQ2FtZXJhLnVwLno7XG4gICAgICAgICAgICAvLyBvbmx5IHB1c2ggYHVwYCBiYWNrIHRvIChmdWxsKWxheW91dCBpZiBpdCdzIGdvaW5nIHRvIGNoYW5nZVxuICAgICAgICAgICAgaWYoeiAvIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopIDwgMC45OTkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IHNjZW5lLmlkICsgJy5jYW1lcmEudXAnO1xuICAgICAgICAgICAgICAgIHZhciB6VXAgPSB7eDogMCwgeTogMCwgejogMX07XG4gICAgICAgICAgICAgICAgdmFyIGVkaXRzID0ge307XG4gICAgICAgICAgICAgICAgZWRpdHNbYXR0cl0gPSB6VXA7XG4gICAgICAgICAgICAgICAgdmFyIGxheW91dCA9IGdkLmxheW91dDtcbiAgICAgICAgICAgICAgICBSZWdpc3RyeS5jYWxsKCdfc3RvcmVEaXJlY3RHVUlFZGl0JywgbGF5b3V0LCBmdWxsTGF5b3V0Ll9wcmVHVUksIGVkaXRzKTtcbiAgICAgICAgICAgICAgICBmdWxsQ2FtZXJhLnVwID0gelVwO1xuICAgICAgICAgICAgICAgIExpYi5uZXN0ZWRQcm9wZXJ0eShsYXlvdXQsIGF0dHIpLnNldCh6VXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbm9uZSByb3RhdGlvbiBtb2RlcyBbcGFuIG9yIHpvb21dXG4gICAgICAgICAgICBjYW1lcmEua2V5QmluZGluZ01vZGUgPSBkcmFnbW9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRvIHB1dCBkcmFnbW9kZSBhbmQgaG92ZXJtb2RlIG9uIHRoZSBzYW1lIGdyb3VuZHMgZnJvbSByZWxheW91dFxuICAgIHNjZW5lLmZ1bGxTY2VuZUxheW91dC5ob3Zlcm1vZGUgPSBob3Zlcm1vZGU7XG59O1xuXG5mdW5jdGlvbiBmbGlwUGl4ZWxzKHBpeGVscywgdywgaCkge1xuICAgIGZvcih2YXIgaSA9IDAsIHEgPSBoIC0gMTsgaSA8IHE7ICsraSwgLS1xKSB7XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB3OyArK2opIHtcbiAgICAgICAgICAgIGZvcih2YXIgayA9IDA7IGsgPCA0OyArK2spIHtcbiAgICAgICAgICAgICAgICB2YXIgYSA9IDQgKiAodyAqIGkgKyBqKSArIGs7XG4gICAgICAgICAgICAgICAgdmFyIGIgPSA0ICogKHcgKiBxICsgaikgKyBrO1xuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBwaXhlbHNbYV07XG4gICAgICAgICAgICAgICAgcGl4ZWxzW2FdID0gcGl4ZWxzW2JdO1xuICAgICAgICAgICAgICAgIHBpeGVsc1tiXSA9IHRtcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY29ycmVjdFJHQihwaXhlbHMsIHcsIGgpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaDsgKytpKSB7XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB3OyArK2opIHtcbiAgICAgICAgICAgIHZhciBrID0gNCAqICh3ICogaSArIGopO1xuXG4gICAgICAgICAgICB2YXIgYSA9IHBpeGVsc1trICsgM107IC8vIGFscGhhXG4gICAgICAgICAgICBpZihhID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBxID0gMjU1IC8gYTtcblxuICAgICAgICAgICAgICAgIGZvcih2YXIgbCA9IDA7IGwgPCAzOyArK2wpIHsgLy8gUkdCXG4gICAgICAgICAgICAgICAgICAgIHBpeGVsc1trICsgbF0gPSBNYXRoLm1pbihxICogcGl4ZWxzW2sgKyBsXSwgMjU1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnByb3RvLnRvSW1hZ2UgPSBmdW5jdGlvbihmb3JtYXQpIHtcbiAgICB2YXIgc2NlbmUgPSB0aGlzO1xuXG4gICAgaWYoIWZvcm1hdCkgZm9ybWF0ID0gJ3BuZyc7XG4gICAgaWYoc2NlbmUuc3RhdGljTW9kZSkgc2NlbmUuY29udGFpbmVyLmFwcGVuZENoaWxkKFNUQVRJQ19DQU5WQVMpO1xuXG4gICAgLy8gRm9yY2UgcmVkcmF3XG4gICAgc2NlbmUuZ2xwbG90LnJlZHJhdygpO1xuXG4gICAgLy8gR3JhYiBjb250ZXh0IGFuZCB5YW5rIG91dCBwaXhlbHNcbiAgICB2YXIgZ2wgPSBzY2VuZS5nbHBsb3QuZ2w7XG4gICAgdmFyIHcgPSBnbC5kcmF3aW5nQnVmZmVyV2lkdGg7XG4gICAgdmFyIGggPSBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0O1xuXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKTtcblxuICAgIHZhciBwaXhlbHMgPSBuZXcgVWludDhBcnJheSh3ICogaCAqIDQpO1xuICAgIGdsLnJlYWRQaXhlbHMoMCwgMCwgdywgaCwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgcGl4ZWxzKTtcbiAgICBmbGlwUGl4ZWxzKHBpeGVscywgdywgaCk7XG4gICAgY29ycmVjdFJHQihwaXhlbHMsIHcsIGgpO1xuXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHc7XG4gICAgY2FudmFzLmhlaWdodCA9IGg7XG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB2YXIgaW1hZ2VEYXRhID0gY29udGV4dC5jcmVhdGVJbWFnZURhdGEodywgaCk7XG4gICAgaW1hZ2VEYXRhLmRhdGEuc2V0KHBpeGVscyk7XG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcblxuICAgIHZhciBkYXRhVVJMO1xuXG4gICAgc3dpdGNoKGZvcm1hdCkge1xuICAgICAgICBjYXNlICdqcGVnJzpcbiAgICAgICAgICAgIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2VicCc6XG4gICAgICAgICAgICBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2Uvd2VicCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgfVxuXG4gICAgaWYoc2NlbmUuc3RhdGljTW9kZSkgc2NlbmUuY29udGFpbmVyLnJlbW92ZUNoaWxkKFNUQVRJQ19DQU5WQVMpO1xuXG4gICAgcmV0dXJuIGRhdGFVUkw7XG59O1xuXG5wcm90by5zZXRDb252ZXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjZW5lID0gdGhpcztcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHZhciBheCA9IHNjZW5lLmZ1bGxTY2VuZUxheW91dFtheGlzUHJvcGVydGllc1tpXV07XG4gICAgICAgIEF4ZXMuc2V0Q29udmVydChheCwgc2NlbmUuZnVsbExheW91dCk7XG4gICAgICAgIGF4LnNldFNjYWxlID0gTGliLm5vb3A7XG4gICAgfVxufTtcblxucHJvdG8ubWFrZTR0aERpbWVuc2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2VuZSA9IHRoaXM7XG4gICAgdmFyIGdkID0gc2NlbmUuZ3JhcGhEaXY7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIC8vIG1vY2sgYXhpcyBmb3IgaG92ZXIgZm9ybWF0dGluZ1xuICAgIHNjZW5lLl9tb2NrQXhpcyA9IHtcbiAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgIHNob3dleHBvbmVudDogJ2FsbCcsXG4gICAgICAgIGV4cG9uZW50Zm9ybWF0OiAnQidcbiAgICB9O1xuICAgIEF4ZXMuc2V0Q29udmVydChzY2VuZS5fbW9ja0F4aXMsIGZ1bGxMYXlvdXQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vbGliJyk7XG52YXIgVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9wbG90X2FwaS9wbG90X3RlbXBsYXRlJyk7XG52YXIgaGFuZGxlRG9tYWluRGVmYXVsdHMgPSByZXF1aXJlKCcuL2RvbWFpbicpLmRlZmF1bHRzO1xuXG5cbi8qKlxuICogRmluZCBhbmQgc3VwcGx5IGRlZmF1bHRzIHRvIGFsbCBzdWJwbG90cyBvZiBhIGdpdmVuIHR5cGVcbiAqIFRoaXMgaGFuZGxlcyBzdWJwbG90cyB0aGF0IGFyZSBjb250YWluZWQgd2l0aGluIG9uZSBjb250YWluZXIgLSBzb1xuICogZ2wzZCwgZ2VvLCB0ZXJuYXJ5Li4uIGJ1dCBub3QgMmQgYXhlcyB3aGljaCBoYXZlIHNlcGFyYXRlIHggYW5kIHkgYXhlc1xuICogZmluZHMgc3VicGxvdHMsIGNvZXJjZXMgdGhlaXIgYGRvbWFpbmAgYXR0cmlidXRlcywgdGhlbiBjYWxscyB0aGVcbiAqIGdpdmVuIGhhbmRsZURlZmF1bHRzIGZ1bmN0aW9uIHRvIGZpbGwgaW4gZXZlcnl0aGluZyBlbHNlLlxuICpcbiAqIGxheW91dEluOiB0aGUgY29tcGxldGUgdXNlci1zdXBwbGllZCBpbnB1dCBsYXlvdXRcbiAqIGxheW91dE91dDogdGhlIGNvbXBsZXRlIGZpbmlzaGVkIGxheW91dFxuICogZnVsbERhdGE6IHRoZSBmaW5pc2hlZCBkYXRhIGFycmF5LCB1c2VkIG9ubHkgdG8gZmluZCBzdWJwbG90c1xuICogb3B0czoge1xuICogIHR5cGU6IHN1YnBsb3QgdHlwZSBzdHJpbmdcbiAqICBhdHRyaWJ1dGVzOiBzdWJwbG90IGF0dHJpYnV0ZXMgb2JqZWN0XG4gKiAgcGFydGl0aW9uOiAneCcgb3IgJ3knLCB3aGljaCBkaXJlY3Rpb24gdG8gZGl2aWRlIGRvbWFpbiBzcGFjZSBieSBkZWZhdWx0XG4gKiAgICAgIChkZWZhdWx0ICd4JywgaWUgc2lkZS1ieS1zaWRlIHN1YnBsb3RzKVxuICogICAgICBUT0RPOiB0aGlzIG9wdGlvbiBpcyBvbmx5IGhlcmUgYmVjYXVzZSAzRCBhbmQgZ2VvIG1hZGUgb3Bwb3NpdGVcbiAqICAgICAgY2hvaWNlcyBpbiB0aGlzIHJlZ2FyZCBwcmV2aW91c2x5IGFuZCBJIGRpZG4ndCB3YW50IHRvIGNoYW5nZSBpdC5cbiAqICAgICAgSW5zdGVhZCB3ZSBzaG91bGQgZG86XG4gKiAgICAgIC0gc29tZXRoaW5nIGNvbnNpc3RlbnRcbiAqICAgICAgLSBzb21ldGhpbmcgbW9yZSBzcXVhcmUgKDQgY3V0cyAyeDIsIDUvNiBjdXRzIDJ4MywgZXRjLilcbiAqICAgICAgLSBzb21ldGhpbmcgdGhhdCBpbmNsdWRlcyBhbGwgc3VicGxvdCB0eXBlcyBpbiBvbmUgYXJyYW5nZW1lbnQsXG4gKiAgICAgICAgbm93IHRoYXQgd2UgY2FuIGhhdmUgdGhlbSB0b2dldGhlciFcbiAqICBoYW5kbGVEZWZhdWx0czogZnVuY3Rpb24gb2YgKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgY29lcmNlLCBvcHRzKVxuICogICAgICB0aGlzIG9wdHMgb2JqZWN0IGlzIHBhc3NlZCB0aHJvdWdoIHRvIGhhbmRsZURlZmF1bHRzLCBzbyBhdHRhY2ggYW55XG4gKiAgICAgIGFkZGl0aW9uYWwgaXRlbXMgbmVlZGVkIGJ5IHRoaXMgZnVuY3Rpb24gaGVyZSBhcyB3ZWxsXG4gKiB9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlU3VicGxvdERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhLCBvcHRzKSB7XG4gICAgdmFyIHN1YnBsb3RUeXBlID0gb3B0cy50eXBlO1xuICAgIHZhciBzdWJwbG90QXR0cmlidXRlcyA9IG9wdHMuYXR0cmlidXRlcztcbiAgICB2YXIgaGFuZGxlRGVmYXVsdHMgPSBvcHRzLmhhbmRsZURlZmF1bHRzO1xuICAgIHZhciBwYXJ0aXRpb24gPSBvcHRzLnBhcnRpdGlvbiB8fCAneCc7XG5cbiAgICB2YXIgaWRzID0gbGF5b3V0T3V0Ll9zdWJwbG90c1tzdWJwbG90VHlwZV07XG4gICAgdmFyIGlkc0xlbmd0aCA9IGlkcy5sZW5ndGg7XG5cbiAgICB2YXIgYmFzZUlkID0gaWRzTGVuZ3RoICYmIGlkc1swXS5yZXBsYWNlKC9cXGQrJC8sICcnKTtcblxuICAgIHZhciBzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQ7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIHN1YnBsb3RBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaWRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0gaWRzW2ldO1xuXG4gICAgICAgIC8vIHRlcm5hcnkgdHJhY2VzIGdldCBhIGxheW91dCB0ZXJuYXJ5IGZvciBmcmVlIVxuICAgICAgICBpZihsYXlvdXRJbltpZF0pIHN1YnBsb3RMYXlvdXRJbiA9IGxheW91dEluW2lkXTtcbiAgICAgICAgZWxzZSBzdWJwbG90TGF5b3V0SW4gPSBsYXlvdXRJbltpZF0gPSB7fTtcblxuICAgICAgICBzdWJwbG90TGF5b3V0T3V0ID0gVGVtcGxhdGUubmV3Q29udGFpbmVyKGxheW91dE91dCwgaWQsIGJhc2VJZCk7XG5cbiAgICAgICAgLy8gQWxsIHN1YnBsb3QgY29udGFpbmVycyBnZXQgYSBgdWlyZXZpc2lvbmAgaW5oZXJpdGluZyBmcm9tIHRoZSBiYXNlLlxuICAgICAgICAvLyBDdXJyZW50bHkgYWxsIHN1YnBsb3RzIGNvbnRhaW5lcnMgaGF2ZSBzb21lIHVzZXIgaW50ZXJhY3Rpb25cbiAgICAgICAgLy8gYXR0cmlidXRlcywgYnV0IGlmIHdlIGV2ZXIgYWRkIG9uZSB0aGF0IGRvZXNuJ3QsIHdlIHdvdWxkIG5lZWQgYW5cbiAgICAgICAgLy8gb3B0aW9uIHRvIHNraXAgdGhpcyBzdGVwLlxuICAgICAgICBjb2VyY2UoJ3VpcmV2aXNpb24nLCBsYXlvdXRPdXQudWlyZXZpc2lvbik7XG5cbiAgICAgICAgdmFyIGRmbHREb21haW5zID0ge307XG4gICAgICAgIGRmbHREb21haW5zW3BhcnRpdGlvbl0gPSBbaSAvIGlkc0xlbmd0aCwgKGkgKyAxKSAvIGlkc0xlbmd0aF07XG4gICAgICAgIGhhbmRsZURvbWFpbkRlZmF1bHRzKHN1YnBsb3RMYXlvdXRPdXQsIGxheW91dE91dCwgY29lcmNlLCBkZmx0RG9tYWlucyk7XG5cbiAgICAgICAgb3B0cy5pZCA9IGlkO1xuICAgICAgICBoYW5kbGVEZWZhdWx0cyhzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIGNvZXJjZSwgb3B0cyk7XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnZ2wtcXVhdC9zbGVycCcpIiwibW9kdWxlLmV4cG9ydHMgPVxuICBnbG9iYWwucGVyZm9ybWFuY2UgJiZcbiAgZ2xvYmFsLnBlcmZvcm1hbmNlLm5vdyA/IGZ1bmN0aW9uIG5vdygpIHtcbiAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KClcbiAgfSA6IERhdGUubm93IHx8IGZ1bmN0aW9uIG5vdygpIHtcbiAgICByZXR1cm4gK25ldyBEYXRlXG4gIH1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciB0d29Qcm9kdWN0ID0gcmVxdWlyZShcInR3by1wcm9kdWN0XCIpXG52YXIgcm9idXN0U3VtID0gcmVxdWlyZShcInJvYnVzdC1zdW1cIilcblxubW9kdWxlLmV4cG9ydHMgPSByb2J1c3REb3RQcm9kdWN0XG5cbmZ1bmN0aW9uIHJvYnVzdERvdFByb2R1Y3QoYSwgYikge1xuICB2YXIgciA9IHR3b1Byb2R1Y3QoYVswXSwgYlswXSlcbiAgZm9yKHZhciBpPTE7IGk8YS5sZW5ndGg7ICsraSkge1xuICAgIHIgPSByb2J1c3RTdW0ociwgdHdvUHJvZHVjdChhW2ldLCBiW2ldKSlcbiAgfVxuICByZXR1cm4gclxufSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciByb2J1c3REb3QgPSByZXF1aXJlKFwicm9idXN0LWRvdC1wcm9kdWN0XCIpXG52YXIgcm9idXN0U3VtID0gcmVxdWlyZShcInJvYnVzdC1zdW1cIilcblxubW9kdWxlLmV4cG9ydHMgPSBzcGxpdFBvbHlnb25cbm1vZHVsZS5leHBvcnRzLnBvc2l0aXZlID0gcG9zaXRpdmVcbm1vZHVsZS5leHBvcnRzLm5lZ2F0aXZlID0gbmVnYXRpdmVcblxuZnVuY3Rpb24gcGxhbmVUKHAsIHBsYW5lKSB7XG4gIHZhciByID0gcm9idXN0U3VtKHJvYnVzdERvdChwLCBwbGFuZSksIFtwbGFuZVtwbGFuZS5sZW5ndGgtMV1dKVxuICByZXR1cm4gcltyLmxlbmd0aC0xXVxufVxuXG5cbi8vQ2FuJ3QgZG8gdGhpcyBleGFjdGx5IGFuZCBlbWl0IGEgZmxvYXRpbmcgcG9pbnQgcmVzdWx0XG5mdW5jdGlvbiBsZXJwVyhhLCB3YSwgYiwgd2IpIHtcbiAgdmFyIGQgPSB3YiAtIHdhXG4gIHZhciB0ID0gLXdhIC8gZFxuICBpZih0IDwgMC4wKSB7XG4gICAgdCA9IDAuMFxuICB9IGVsc2UgaWYodCA+IDEuMCkge1xuICAgIHQgPSAxLjBcbiAgfVxuICB2YXIgdGkgPSAxLjAgLSB0XG4gIHZhciBuID0gYS5sZW5ndGhcbiAgdmFyIHIgPSBuZXcgQXJyYXkobilcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgcltpXSA9IHQgKiBhW2ldICsgdGkgKiBiW2ldXG4gIH1cbiAgcmV0dXJuIHJcbn1cblxuZnVuY3Rpb24gc3BsaXRQb2x5Z29uKHBvaW50cywgcGxhbmUpIHtcbiAgdmFyIHBvcyA9IFtdXG4gIHZhciBuZWcgPSBbXVxuICB2YXIgYSA9IHBsYW5lVChwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSwgcGxhbmUpXG4gIGZvcih2YXIgcz1wb2ludHNbcG9pbnRzLmxlbmd0aC0xXSwgdD1wb2ludHNbMF0sIGk9MDsgaTxwb2ludHMubGVuZ3RoOyArK2ksIHM9dCkge1xuICAgIHQgPSBwb2ludHNbaV1cbiAgICB2YXIgYiA9IHBsYW5lVCh0LCBwbGFuZSlcbiAgICBpZigoYSA8IDAgJiYgYiA+IDApIHx8IChhID4gMCAmJiBiIDwgMCkpIHtcbiAgICAgIHZhciBwID0gbGVycFcocywgYiwgdCwgYSlcbiAgICAgIHBvcy5wdXNoKHApXG4gICAgICBuZWcucHVzaChwLnNsaWNlKCkpXG4gICAgfVxuICAgIGlmKGIgPCAwKSB7XG4gICAgICBuZWcucHVzaCh0LnNsaWNlKCkpXG4gICAgfSBlbHNlIGlmKGIgPiAwKSB7XG4gICAgICBwb3MucHVzaCh0LnNsaWNlKCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcy5wdXNoKHQuc2xpY2UoKSlcbiAgICAgIG5lZy5wdXNoKHQuc2xpY2UoKSlcbiAgICB9XG4gICAgYSA9IGJcbiAgfVxuICByZXR1cm4geyBwb3NpdGl2ZTogcG9zLCBuZWdhdGl2ZTogbmVnIH1cbn1cblxuZnVuY3Rpb24gcG9zaXRpdmUocG9pbnRzLCBwbGFuZSkge1xuICB2YXIgcG9zID0gW11cbiAgdmFyIGEgPSBwbGFuZVQocG9pbnRzW3BvaW50cy5sZW5ndGgtMV0sIHBsYW5lKVxuICBmb3IodmFyIHM9cG9pbnRzW3BvaW50cy5sZW5ndGgtMV0sIHQ9cG9pbnRzWzBdLCBpPTA7IGk8cG9pbnRzLmxlbmd0aDsgKytpLCBzPXQpIHtcbiAgICB0ID0gcG9pbnRzW2ldXG4gICAgdmFyIGIgPSBwbGFuZVQodCwgcGxhbmUpXG4gICAgaWYoKGEgPCAwICYmIGIgPiAwKSB8fCAoYSA+IDAgJiYgYiA8IDApKSB7XG4gICAgICBwb3MucHVzaChsZXJwVyhzLCBiLCB0LCBhKSlcbiAgICB9XG4gICAgaWYoYiA+PSAwKSB7XG4gICAgICBwb3MucHVzaCh0LnNsaWNlKCkpXG4gICAgfVxuICAgIGEgPSBiXG4gIH1cbiAgcmV0dXJuIHBvc1xufVxuXG5mdW5jdGlvbiBuZWdhdGl2ZShwb2ludHMsIHBsYW5lKSB7XG4gIHZhciBuZWcgPSBbXVxuICB2YXIgYSA9IHBsYW5lVChwb2ludHNbcG9pbnRzLmxlbmd0aC0xXSwgcGxhbmUpXG4gIGZvcih2YXIgcz1wb2ludHNbcG9pbnRzLmxlbmd0aC0xXSwgdD1wb2ludHNbMF0sIGk9MDsgaTxwb2ludHMubGVuZ3RoOyArK2ksIHM9dCkge1xuICAgIHQgPSBwb2ludHNbaV1cbiAgICB2YXIgYiA9IHBsYW5lVCh0LCBwbGFuZSlcbiAgICBpZigoYSA8IDAgJiYgYiA+IDApIHx8IChhID4gMCAmJiBiIDwgMCkpIHtcbiAgICAgIG5lZy5wdXNoKGxlcnBXKHMsIGIsIHQsIGEpKVxuICAgIH1cbiAgICBpZihiIDw9IDApIHtcbiAgICAgIG5lZy5wdXNoKHQuc2xpY2UoKSlcbiAgICB9XG4gICAgYSA9IGJcbiAgfVxuICByZXR1cm4gbmVnXG59IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVHVybnRhYmxlQ29udHJvbGxlclxuXG52YXIgZmlsdGVyVmVjdG9yID0gcmVxdWlyZSgnZmlsdGVyZWQtdmVjdG9yJylcbnZhciBpbnZlcnQ0NCAgICAgPSByZXF1aXJlKCdnbC1tYXQ0L2ludmVydCcpXG52YXIgcm90YXRlTSAgICAgID0gcmVxdWlyZSgnZ2wtbWF0NC9yb3RhdGUnKVxudmFyIGNyb3NzICAgICAgICA9IHJlcXVpcmUoJ2dsLXZlYzMvY3Jvc3MnKVxudmFyIG5vcm1hbGl6ZTMgICA9IHJlcXVpcmUoJ2dsLXZlYzMvbm9ybWFsaXplJylcbnZhciBkb3QzICAgICAgICAgPSByZXF1aXJlKCdnbC12ZWMzL2RvdCcpXG5cbmZ1bmN0aW9uIGxlbjMoeCwgeSwgeikge1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHgsIDIpICsgTWF0aC5wb3coeSwgMikgKyBNYXRoLnBvdyh6LCAyKSlcbn1cblxuZnVuY3Rpb24gY2xhbXAxKHgpIHtcbiAgcmV0dXJuIE1hdGgubWluKDEuMCwgTWF0aC5tYXgoLTEuMCwgeCkpXG59XG5cbmZ1bmN0aW9uIGZpbmRPcnRob1BhaXIodikge1xuICB2YXIgdnggPSBNYXRoLmFicyh2WzBdKVxuICB2YXIgdnkgPSBNYXRoLmFicyh2WzFdKVxuICB2YXIgdnogPSBNYXRoLmFicyh2WzJdKVxuXG4gIHZhciB1ID0gWzAsMCwwXVxuICBpZih2eCA+IE1hdGgubWF4KHZ5LCB2eikpIHtcbiAgICB1WzJdID0gMVxuICB9IGVsc2UgaWYodnkgPiBNYXRoLm1heCh2eCwgdnopKSB7XG4gICAgdVswXSA9IDFcbiAgfSBlbHNlIHtcbiAgICB1WzFdID0gMVxuICB9XG5cbiAgdmFyIHZ2ID0gMFxuICB2YXIgdXYgPSAwXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSApIHtcbiAgICB2diArPSB2W2ldICogdltpXVxuICAgIHV2ICs9IHVbaV0gKiB2W2ldXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgdVtpXSAtPSAodXYgLyB2dikgKiAgdltpXVxuICB9XG4gIG5vcm1hbGl6ZTModSwgdSlcbiAgcmV0dXJuIHVcbn1cblxuZnVuY3Rpb24gVHVybnRhYmxlQ29udHJvbGxlcih6b29tTWluLCB6b29tTWF4LCBjZW50ZXIsIHVwLCByaWdodCwgcmFkaXVzLCB0aGV0YSwgcGhpKSB7XG4gIHRoaXMuY2VudGVyID0gZmlsdGVyVmVjdG9yKGNlbnRlcilcbiAgdGhpcy51cCAgICAgPSBmaWx0ZXJWZWN0b3IodXApXG4gIHRoaXMucmlnaHQgID0gZmlsdGVyVmVjdG9yKHJpZ2h0KVxuICB0aGlzLnJhZGl1cyA9IGZpbHRlclZlY3RvcihbcmFkaXVzXSlcbiAgdGhpcy5hbmdsZSAgPSBmaWx0ZXJWZWN0b3IoW3RoZXRhLCBwaGldKVxuICB0aGlzLmFuZ2xlLmJvdW5kcyA9IFtbLUluZmluaXR5LC1NYXRoLlBJLzJdLCBbSW5maW5pdHksTWF0aC5QSS8yXV1cbiAgdGhpcy5zZXREaXN0YW5jZUxpbWl0cyh6b29tTWluLCB6b29tTWF4KVxuXG4gIHRoaXMuY29tcHV0ZWRDZW50ZXIgPSB0aGlzLmNlbnRlci5jdXJ2ZSgwKVxuICB0aGlzLmNvbXB1dGVkVXAgICAgID0gdGhpcy51cC5jdXJ2ZSgwKVxuICB0aGlzLmNvbXB1dGVkUmlnaHQgID0gdGhpcy5yaWdodC5jdXJ2ZSgwKVxuICB0aGlzLmNvbXB1dGVkUmFkaXVzID0gdGhpcy5yYWRpdXMuY3VydmUoMClcbiAgdGhpcy5jb21wdXRlZEFuZ2xlICA9IHRoaXMuYW5nbGUuY3VydmUoMClcbiAgdGhpcy5jb21wdXRlZFRvd2FyZCA9IFswLDAsMF1cbiAgdGhpcy5jb21wdXRlZEV5ZSAgICA9IFswLDAsMF1cbiAgdGhpcy5jb21wdXRlZE1hdHJpeCA9IG5ldyBBcnJheSgxNilcbiAgZm9yKHZhciBpPTA7IGk8MTY7ICsraSkge1xuICAgIHRoaXMuY29tcHV0ZWRNYXRyaXhbaV0gPSAwLjVcbiAgfVxuXG4gIHRoaXMucmVjYWxjTWF0cml4KDApXG59XG5cbnZhciBwcm90byA9IFR1cm50YWJsZUNvbnRyb2xsZXIucHJvdG90eXBlXG5cbnByb3RvLnNldERpc3RhbmNlTGltaXRzID0gZnVuY3Rpb24obWluRGlzdCwgbWF4RGlzdCkge1xuICBpZihtaW5EaXN0ID4gMCkge1xuICAgIG1pbkRpc3QgPSBNYXRoLmxvZyhtaW5EaXN0KVxuICB9IGVsc2Uge1xuICAgIG1pbkRpc3QgPSAtSW5maW5pdHlcbiAgfVxuICBpZihtYXhEaXN0ID4gMCkge1xuICAgIG1heERpc3QgPSBNYXRoLmxvZyhtYXhEaXN0KVxuICB9IGVsc2Uge1xuICAgIG1heERpc3QgPSBJbmZpbml0eVxuICB9XG4gIG1heERpc3QgPSBNYXRoLm1heChtYXhEaXN0LCBtaW5EaXN0KVxuICB0aGlzLnJhZGl1cy5ib3VuZHNbMF1bMF0gPSBtaW5EaXN0XG4gIHRoaXMucmFkaXVzLmJvdW5kc1sxXVswXSA9IG1heERpc3Rcbn1cblxucHJvdG8uZ2V0RGlzdGFuY2VMaW1pdHMgPSBmdW5jdGlvbihvdXQpIHtcbiAgdmFyIGJvdW5kcyA9IHRoaXMucmFkaXVzLmJvdW5kc1swXVxuICBpZihvdXQpIHtcbiAgICBvdXRbMF0gPSBNYXRoLmV4cChib3VuZHNbMF1bMF0pXG4gICAgb3V0WzFdID0gTWF0aC5leHAoYm91bmRzWzFdWzBdKVxuICAgIHJldHVybiBvdXRcbiAgfVxuICByZXR1cm4gWyBNYXRoLmV4cChib3VuZHNbMF1bMF0pLCBNYXRoLmV4cChib3VuZHNbMV1bMF0pIF1cbn1cblxucHJvdG8ucmVjYWxjTWF0cml4ID0gZnVuY3Rpb24odCkge1xuICAvL1JlY29tcHV0ZSBjdXJ2ZXNcbiAgdGhpcy5jZW50ZXIuY3VydmUodClcbiAgdGhpcy51cC5jdXJ2ZSh0KVxuICB0aGlzLnJpZ2h0LmN1cnZlKHQpXG4gIHRoaXMucmFkaXVzLmN1cnZlKHQpXG4gIHRoaXMuYW5nbGUuY3VydmUodClcblxuICAvL0NvbXB1dGUgZnJhbWUgZm9yIGNhbWVyYSBtYXRyaXhcbiAgdmFyIHVwICAgICA9IHRoaXMuY29tcHV0ZWRVcFxuICB2YXIgcmlnaHQgID0gdGhpcy5jb21wdXRlZFJpZ2h0XG4gIHZhciB1dSA9IDAuMFxuICB2YXIgdXIgPSAwLjBcbiAgZm9yKHZhciBpPTA7IGk8MzsgKytpKSB7XG4gICAgdXIgKz0gdXBbaV0gKiByaWdodFtpXVxuICAgIHV1ICs9IHVwW2ldICogdXBbaV1cbiAgfVxuICB2YXIgdWwgPSBNYXRoLnNxcnQodXUpXG4gIHZhciByciA9IDAuMFxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICByaWdodFtpXSAtPSB1cFtpXSAqIHVyIC8gdXVcbiAgICByciAgICAgICArPSByaWdodFtpXSAqIHJpZ2h0W2ldXG4gICAgdXBbaV0gICAgLz0gdWxcbiAgfVxuICB2YXIgcmwgPSBNYXRoLnNxcnQocnIpXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIHJpZ2h0W2ldIC89IHJsXG4gIH1cblxuICAvL0NvbXB1dGUgdG93YXJkIHZlY3RvclxuICB2YXIgdG93YXJkID0gdGhpcy5jb21wdXRlZFRvd2FyZFxuICBjcm9zcyh0b3dhcmQsIHVwLCByaWdodClcbiAgbm9ybWFsaXplMyh0b3dhcmQsIHRvd2FyZClcblxuICAvL0NvbXB1dGUgYW5ndWxhciBwYXJhbWV0ZXJzXG4gIHZhciByYWRpdXMgPSBNYXRoLmV4cCh0aGlzLmNvbXB1dGVkUmFkaXVzWzBdKVxuICB2YXIgdGhldGEgID0gdGhpcy5jb21wdXRlZEFuZ2xlWzBdXG4gIHZhciBwaGkgICAgPSB0aGlzLmNvbXB1dGVkQW5nbGVbMV1cblxuICB2YXIgY3RoZXRhID0gTWF0aC5jb3ModGhldGEpXG4gIHZhciBzdGhldGEgPSBNYXRoLnNpbih0aGV0YSlcbiAgdmFyIGNwaGkgICA9IE1hdGguY29zKHBoaSlcbiAgdmFyIHNwaGkgICA9IE1hdGguc2luKHBoaSlcblxuICB2YXIgY2VudGVyID0gdGhpcy5jb21wdXRlZENlbnRlclxuXG4gIHZhciB3eCA9IGN0aGV0YSAqIGNwaGkgXG4gIHZhciB3eSA9IHN0aGV0YSAqIGNwaGlcbiAgdmFyIHd6ID0gc3BoaVxuXG4gIHZhciBzeCA9IC1jdGhldGEgKiBzcGhpXG4gIHZhciBzeSA9IC1zdGhldGEgKiBzcGhpXG4gIHZhciBzeiA9IGNwaGlcblxuICB2YXIgZXllID0gdGhpcy5jb21wdXRlZEV5ZVxuICB2YXIgbWF0ID0gdGhpcy5jb21wdXRlZE1hdHJpeFxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICB2YXIgeCAgICAgID0gd3ggKiByaWdodFtpXSArIHd5ICogdG93YXJkW2ldICsgd3ogKiB1cFtpXVxuICAgIG1hdFs0KmkrMV0gPSBzeCAqIHJpZ2h0W2ldICsgc3kgKiB0b3dhcmRbaV0gKyBzeiAqIHVwW2ldXG4gICAgbWF0WzQqaSsyXSA9IHhcbiAgICBtYXRbNCppKzNdID0gMC4wXG4gIH1cblxuICB2YXIgYXggPSBtYXRbMV1cbiAgdmFyIGF5ID0gbWF0WzVdXG4gIHZhciBheiA9IG1hdFs5XVxuICB2YXIgYnggPSBtYXRbMl1cbiAgdmFyIGJ5ID0gbWF0WzZdXG4gIHZhciBieiA9IG1hdFsxMF1cbiAgdmFyIGN4ID0gYXkgKiBieiAtIGF6ICogYnlcbiAgdmFyIGN5ID0gYXogKiBieCAtIGF4ICogYnpcbiAgdmFyIGN6ID0gYXggKiBieSAtIGF5ICogYnhcbiAgdmFyIGNsID0gbGVuMyhjeCwgY3ksIGN6KVxuICBjeCAvPSBjbFxuICBjeSAvPSBjbFxuICBjeiAvPSBjbFxuICBtYXRbMF0gPSBjeFxuICBtYXRbNF0gPSBjeVxuICBtYXRbOF0gPSBjelxuXG4gIGZvcih2YXIgaT0wOyBpPDM7ICsraSkge1xuICAgIGV5ZVtpXSA9IGNlbnRlcltpXSArIG1hdFsyKzQqaV0qcmFkaXVzXG4gIH1cblxuICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICB2YXIgcnIgPSAwLjBcbiAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgIHJyICs9IG1hdFtpKzQqal0gKiBleWVbal1cbiAgICB9XG4gICAgbWF0WzEyK2ldID0gLXJyXG4gIH1cbiAgbWF0WzE1XSA9IDEuMFxufVxuXG5wcm90by5nZXRNYXRyaXggPSBmdW5jdGlvbih0LCByZXN1bHQpIHtcbiAgdGhpcy5yZWNhbGNNYXRyaXgodClcbiAgdmFyIG1hdCA9IHRoaXMuY29tcHV0ZWRNYXRyaXhcbiAgaWYocmVzdWx0KSB7XG4gICAgZm9yKHZhciBpPTA7IGk8MTY7ICsraSkge1xuICAgICAgcmVzdWx0W2ldID0gbWF0W2ldXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuICByZXR1cm4gbWF0XG59XG5cbnZhciB6QXhpcyA9IFswLDAsMF1cbnByb3RvLnJvdGF0ZSA9IGZ1bmN0aW9uKHQsIGR0aGV0YSwgZHBoaSwgZHJvbGwpIHtcbiAgdGhpcy5hbmdsZS5tb3ZlKHQsIGR0aGV0YSwgZHBoaSlcbiAgaWYoZHJvbGwpIHtcbiAgICB0aGlzLnJlY2FsY01hdHJpeCh0KVxuXG4gICAgdmFyIG1hdCA9IHRoaXMuY29tcHV0ZWRNYXRyaXhcbiAgICB6QXhpc1swXSA9IG1hdFsyXVxuICAgIHpBeGlzWzFdID0gbWF0WzZdXG4gICAgekF4aXNbMl0gPSBtYXRbMTBdXG5cbiAgICB2YXIgdXAgICAgID0gdGhpcy5jb21wdXRlZFVwXG4gICAgdmFyIHJpZ2h0ICA9IHRoaXMuY29tcHV0ZWRSaWdodFxuICAgIHZhciB0b3dhcmQgPSB0aGlzLmNvbXB1dGVkVG93YXJkXG5cbiAgICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICAgIG1hdFs0KmldICAgPSB1cFtpXVxuICAgICAgbWF0WzQqaSsxXSA9IHJpZ2h0W2ldXG4gICAgICBtYXRbNCppKzJdID0gdG93YXJkW2ldXG4gICAgfVxuICAgIHJvdGF0ZU0obWF0LCBtYXQsIGRyb2xsLCB6QXhpcylcbiAgICBmb3IodmFyIGk9MDsgaTwzOyArK2kpIHtcbiAgICAgIHVwW2ldID0gICAgbWF0WzQqaV1cbiAgICAgIHJpZ2h0W2ldID0gbWF0WzQqaSsxXVxuICAgIH1cblxuICAgIHRoaXMudXAuc2V0KHQsIHVwWzBdLCB1cFsxXSwgdXBbMl0pXG4gICAgdGhpcy5yaWdodC5zZXQodCwgcmlnaHRbMF0sIHJpZ2h0WzFdLCByaWdodFsyXSlcbiAgfVxufVxuXG5wcm90by5wYW4gPSBmdW5jdGlvbih0LCBkeCwgZHksIGR6KSB7XG4gIGR4ID0gZHggfHwgMC4wXG4gIGR5ID0gZHkgfHwgMC4wXG4gIGR6ID0gZHogfHwgMC4wXG5cbiAgdGhpcy5yZWNhbGNNYXRyaXgodClcbiAgdmFyIG1hdCA9IHRoaXMuY29tcHV0ZWRNYXRyaXhcblxuICB2YXIgZGlzdCA9IE1hdGguZXhwKHRoaXMuY29tcHV0ZWRSYWRpdXNbMF0pXG5cbiAgdmFyIHV4ID0gbWF0WzFdXG4gIHZhciB1eSA9IG1hdFs1XVxuICB2YXIgdXogPSBtYXRbOV1cbiAgdmFyIHVsID0gbGVuMyh1eCwgdXksIHV6KVxuICB1eCAvPSB1bFxuICB1eSAvPSB1bFxuICB1eiAvPSB1bFxuXG4gIHZhciByeCA9IG1hdFswXVxuICB2YXIgcnkgPSBtYXRbNF1cbiAgdmFyIHJ6ID0gbWF0WzhdXG4gIHZhciBydSA9IHJ4ICogdXggKyByeSAqIHV5ICsgcnogKiB1elxuICByeCAtPSB1eCAqIHJ1XG4gIHJ5IC09IHV5ICogcnVcbiAgcnogLT0gdXogKiBydVxuICB2YXIgcmwgPSBsZW4zKHJ4LCByeSwgcnopXG4gIHJ4IC89IHJsXG4gIHJ5IC89IHJsXG4gIHJ6IC89IHJsXG5cbiAgdmFyIHZ4ID0gcnggKiBkeCArIHV4ICogZHlcbiAgdmFyIHZ5ID0gcnkgKiBkeCArIHV5ICogZHlcbiAgdmFyIHZ6ID0gcnogKiBkeCArIHV6ICogZHlcbiAgdGhpcy5jZW50ZXIubW92ZSh0LCB2eCwgdnksIHZ6KVxuXG4gIC8vVXBkYXRlIHotY29tcG9uZW50IG9mIHJhZGl1c1xuICB2YXIgcmFkaXVzID0gTWF0aC5leHAodGhpcy5jb21wdXRlZFJhZGl1c1swXSlcbiAgcmFkaXVzID0gTWF0aC5tYXgoMWUtNCwgcmFkaXVzICsgZHopXG4gIHRoaXMucmFkaXVzLnNldCh0LCBNYXRoLmxvZyhyYWRpdXMpKVxufVxuXG5wcm90by50cmFuc2xhdGUgPSBmdW5jdGlvbih0LCBkeCwgZHksIGR6KSB7XG4gIHRoaXMuY2VudGVyLm1vdmUodCxcbiAgICBkeHx8MC4wLFxuICAgIGR5fHwwLjAsXG4gICAgZHp8fDAuMClcbn1cblxuLy9SZWNlbnRlcnMgdGhlIGNvb3JkaW5hdGUgYXhlc1xucHJvdG8uc2V0TWF0cml4ID0gZnVuY3Rpb24odCwgbWF0LCBheGVzLCBub1NuYXApIHtcbiAgXG4gIC8vR2V0IHRoZSBheGVzIGZvciB0YXJlXG4gIHZhciB1c2hpZnQgPSAxXG4gIGlmKHR5cGVvZiBheGVzID09PSAnbnVtYmVyJykge1xuICAgIHVzaGlmdCA9IChheGVzKXwwXG4gIH0gXG4gIGlmKHVzaGlmdCA8IDAgfHwgdXNoaWZ0ID4gMykge1xuICAgIHVzaGlmdCA9IDFcbiAgfVxuICB2YXIgdnNoaWZ0ID0gKHVzaGlmdCArIDIpICUgM1xuICB2YXIgZnNoaWZ0ID0gKHVzaGlmdCArIDEpICUgM1xuXG4gIC8vUmVjb21wdXRlIHN0YXRlIGZvciBuZXcgdCB2YWx1ZVxuICBpZighbWF0KSB7IFxuICAgIHRoaXMucmVjYWxjTWF0cml4KHQpXG4gICAgbWF0ID0gdGhpcy5jb21wdXRlZE1hdHJpeFxuICB9XG5cbiAgLy9HZXQgcmlnaHQgYW5kIHVwIHZlY3RvcnNcbiAgdmFyIHV4ID0gbWF0W3VzaGlmdF1cbiAgdmFyIHV5ID0gbWF0W3VzaGlmdCs0XVxuICB2YXIgdXogPSBtYXRbdXNoaWZ0KzhdXG4gIGlmKCFub1NuYXApIHtcbiAgICB2YXIgdWwgPSBsZW4zKHV4LCB1eSwgdXopXG4gICAgdXggLz0gdWxcbiAgICB1eSAvPSB1bFxuICAgIHV6IC89IHVsXG4gIH0gZWxzZSB7XG4gICAgdmFyIGF4ID0gTWF0aC5hYnModXgpXG4gICAgdmFyIGF5ID0gTWF0aC5hYnModXkpXG4gICAgdmFyIGF6ID0gTWF0aC5hYnModXopXG4gICAgdmFyIGFtID0gTWF0aC5tYXgoYXgsYXksYXopXG4gICAgaWYoYXggPT09IGFtKSB7XG4gICAgICB1eCA9ICh1eCA8IDApID8gLTEgOiAxXG4gICAgICB1eSA9IHV6ID0gMFxuICAgIH0gZWxzZSBpZihheiA9PT0gYW0pIHtcbiAgICAgIHV6ID0gKHV6IDwgMCkgPyAtMSA6IDFcbiAgICAgIHV4ID0gdXkgPSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHV5ID0gKHV5IDwgMCkgPyAtMSA6IDFcbiAgICAgIHV4ID0gdXogPSAwXG4gICAgfVxuICB9XG5cbiAgdmFyIHJ4ID0gbWF0W3ZzaGlmdF1cbiAgdmFyIHJ5ID0gbWF0W3ZzaGlmdCs0XVxuICB2YXIgcnogPSBtYXRbdnNoaWZ0KzhdXG4gIHZhciBydSA9IHJ4ICogdXggKyByeSAqIHV5ICsgcnogKiB1elxuICByeCAtPSB1eCAqIHJ1XG4gIHJ5IC09IHV5ICogcnVcbiAgcnogLT0gdXogKiBydVxuICB2YXIgcmwgPSBsZW4zKHJ4LCByeSwgcnopXG4gIHJ4IC89IHJsXG4gIHJ5IC89IHJsXG4gIHJ6IC89IHJsXG4gIFxuICB2YXIgZnggPSB1eSAqIHJ6IC0gdXogKiByeVxuICB2YXIgZnkgPSB1eiAqIHJ4IC0gdXggKiByelxuICB2YXIgZnogPSB1eCAqIHJ5IC0gdXkgKiByeFxuICB2YXIgZmwgPSBsZW4zKGZ4LCBmeSwgZnopXG4gIGZ4IC89IGZsXG4gIGZ5IC89IGZsXG4gIGZ6IC89IGZsXG5cbiAgdGhpcy5jZW50ZXIuanVtcCh0LCBleCwgZXksIGV6KVxuICB0aGlzLnJhZGl1cy5pZGxlKHQpXG4gIHRoaXMudXAuanVtcCh0LCB1eCwgdXksIHV6KVxuICB0aGlzLnJpZ2h0Lmp1bXAodCwgcngsIHJ5LCByeilcblxuICB2YXIgcGhpLCB0aGV0YVxuICBpZih1c2hpZnQgPT09IDIpIHtcbiAgICB2YXIgY3ggPSBtYXRbMV1cbiAgICB2YXIgY3kgPSBtYXRbNV1cbiAgICB2YXIgY3ogPSBtYXRbOV1cbiAgICB2YXIgY3IgPSBjeCAqIHJ4ICsgY3kgKiByeSArIGN6ICogcnpcbiAgICB2YXIgY2YgPSBjeCAqIGZ4ICsgY3kgKiBmeSArIGN6ICogZnpcbiAgICBpZih0dSA8IDApIHtcbiAgICAgIHBoaSA9IC1NYXRoLlBJLzJcbiAgICB9IGVsc2Uge1xuICAgICAgcGhpID0gTWF0aC5QSS8yXG4gICAgfVxuICAgIHRoZXRhID0gTWF0aC5hdGFuMihjZiwgY3IpXG4gIH0gZWxzZSB7XG4gICAgdmFyIHR4ID0gbWF0WzJdXG4gICAgdmFyIHR5ID0gbWF0WzZdXG4gICAgdmFyIHR6ID0gbWF0WzEwXVxuICAgIHZhciB0dSA9IHR4ICogdXggKyB0eSAqIHV5ICsgdHogKiB1elxuICAgIHZhciB0ciA9IHR4ICogcnggKyB0eSAqIHJ5ICsgdHogKiByelxuICAgIHZhciB0ZiA9IHR4ICogZnggKyB0eSAqIGZ5ICsgdHogKiBmelxuXG4gICAgcGhpID0gTWF0aC5hc2luKGNsYW1wMSh0dSkpXG4gICAgdGhldGEgPSBNYXRoLmF0YW4yKHRmLCB0cilcbiAgfVxuXG4gIHRoaXMuYW5nbGUuanVtcCh0LCB0aGV0YSwgcGhpKVxuXG4gIHRoaXMucmVjYWxjTWF0cml4KHQpXG4gIHZhciBkeCA9IG1hdFsyXVxuICB2YXIgZHkgPSBtYXRbNl1cbiAgdmFyIGR6ID0gbWF0WzEwXVxuXG4gIHZhciBpbWF0ID0gdGhpcy5jb21wdXRlZE1hdHJpeFxuICBpbnZlcnQ0NChpbWF0LCBtYXQpXG4gIHZhciB3ICA9IGltYXRbMTVdXG4gIHZhciBleCA9IGltYXRbMTJdIC8gd1xuICB2YXIgZXkgPSBpbWF0WzEzXSAvIHdcbiAgdmFyIGV6ID0gaW1hdFsxNF0gLyB3XG5cbiAgdmFyIGdzID0gTWF0aC5leHAodGhpcy5jb21wdXRlZFJhZGl1c1swXSlcbiAgdGhpcy5jZW50ZXIuanVtcCh0LCBleC1keCpncywgZXktZHkqZ3MsIGV6LWR6KmdzKVxufVxuXG5wcm90by5sYXN0VCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5tYXgoXG4gICAgdGhpcy5jZW50ZXIubGFzdFQoKSxcbiAgICB0aGlzLnVwLmxhc3RUKCksXG4gICAgdGhpcy5yaWdodC5sYXN0VCgpLFxuICAgIHRoaXMucmFkaXVzLmxhc3RUKCksXG4gICAgdGhpcy5hbmdsZS5sYXN0VCgpKVxufVxuXG5wcm90by5pZGxlID0gZnVuY3Rpb24odCkge1xuICB0aGlzLmNlbnRlci5pZGxlKHQpXG4gIHRoaXMudXAuaWRsZSh0KVxuICB0aGlzLnJpZ2h0LmlkbGUodClcbiAgdGhpcy5yYWRpdXMuaWRsZSh0KVxuICB0aGlzLmFuZ2xlLmlkbGUodClcbn1cblxucHJvdG8uZmx1c2ggPSBmdW5jdGlvbih0KSB7XG4gIHRoaXMuY2VudGVyLmZsdXNoKHQpXG4gIHRoaXMudXAuZmx1c2godClcbiAgdGhpcy5yaWdodC5mbHVzaCh0KVxuICB0aGlzLnJhZGl1cy5mbHVzaCh0KVxuICB0aGlzLmFuZ2xlLmZsdXNoKHQpXG59XG5cbnByb3RvLnNldERpc3RhbmNlID0gZnVuY3Rpb24odCwgZCkge1xuICBpZihkID4gMCkge1xuICAgIHRoaXMucmFkaXVzLnNldCh0LCBNYXRoLmxvZyhkKSlcbiAgfVxufVxuXG5wcm90by5sb29rQXQgPSBmdW5jdGlvbih0LCBleWUsIGNlbnRlciwgdXApIHtcbiAgdGhpcy5yZWNhbGNNYXRyaXgodClcblxuICBleWUgICAgPSBleWUgICAgfHwgdGhpcy5jb21wdXRlZEV5ZVxuICBjZW50ZXIgPSBjZW50ZXIgfHwgdGhpcy5jb21wdXRlZENlbnRlclxuICB1cCAgICAgPSB1cCAgICAgfHwgdGhpcy5jb21wdXRlZFVwXG5cbiAgdmFyIHV4ID0gdXBbMF1cbiAgdmFyIHV5ID0gdXBbMV1cbiAgdmFyIHV6ID0gdXBbMl1cbiAgdmFyIHVsID0gbGVuMyh1eCwgdXksIHV6KVxuICBpZih1bCA8IDFlLTYpIHtcbiAgICByZXR1cm5cbiAgfVxuICB1eCAvPSB1bFxuICB1eSAvPSB1bFxuICB1eiAvPSB1bFxuXG4gIHZhciB0eCA9IGV5ZVswXSAtIGNlbnRlclswXVxuICB2YXIgdHkgPSBleWVbMV0gLSBjZW50ZXJbMV1cbiAgdmFyIHR6ID0gZXllWzJdIC0gY2VudGVyWzJdXG4gIHZhciB0bCA9IGxlbjModHgsIHR5LCB0eilcbiAgaWYodGwgPCAxZS02KSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdHggLz0gdGxcbiAgdHkgLz0gdGxcbiAgdHogLz0gdGxcblxuICB2YXIgcmlnaHQgPSB0aGlzLmNvbXB1dGVkUmlnaHRcbiAgdmFyIHJ4ID0gcmlnaHRbMF1cbiAgdmFyIHJ5ID0gcmlnaHRbMV1cbiAgdmFyIHJ6ID0gcmlnaHRbMl1cbiAgdmFyIHJ1ID0gdXgqcnggKyB1eSpyeSArIHV6KnJ6XG4gIHJ4IC09IHJ1ICogdXhcbiAgcnkgLT0gcnUgKiB1eVxuICByeiAtPSBydSAqIHV6XG4gIHZhciBybCA9IGxlbjMocngsIHJ5LCByeilcblxuICBpZihybCA8IDAuMDEpIHtcbiAgICByeCA9IHV5ICogdHogLSB1eiAqIHR5XG4gICAgcnkgPSB1eiAqIHR4IC0gdXggKiB0elxuICAgIHJ6ID0gdXggKiB0eSAtIHV5ICogdHhcbiAgICBybCA9IGxlbjMocngsIHJ5LCByeilcbiAgICBpZihybCA8IDFlLTYpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuICByeCAvPSBybFxuICByeSAvPSBybFxuICByeiAvPSBybFxuXG4gIHRoaXMudXAuc2V0KHQsIHV4LCB1eSwgdXopXG4gIHRoaXMucmlnaHQuc2V0KHQsIHJ4LCByeSwgcnopXG4gIHRoaXMuY2VudGVyLnNldCh0LCBjZW50ZXJbMF0sIGNlbnRlclsxXSwgY2VudGVyWzJdKVxuICB0aGlzLnJhZGl1cy5zZXQodCwgTWF0aC5sb2codGwpKVxuXG4gIHZhciBmeCA9IHV5ICogcnogLSB1eiAqIHJ5XG4gIHZhciBmeSA9IHV6ICogcnggLSB1eCAqIHJ6XG4gIHZhciBmeiA9IHV4ICogcnkgLSB1eSAqIHJ4XG4gIHZhciBmbCA9IGxlbjMoZngsIGZ5LCBmeilcbiAgZnggLz0gZmxcbiAgZnkgLz0gZmxcbiAgZnogLz0gZmxcblxuICB2YXIgdHUgPSB1eCp0eCArIHV5KnR5ICsgdXoqdHpcbiAgdmFyIHRyID0gcngqdHggKyByeSp0eSArIHJ6KnR6XG4gIHZhciB0ZiA9IGZ4KnR4ICsgZnkqdHkgKyBmeip0elxuXG4gIHZhciBwaGkgICA9IE1hdGguYXNpbihjbGFtcDEodHUpKVxuICB2YXIgdGhldGEgPSBNYXRoLmF0YW4yKHRmLCB0cilcblxuICB2YXIgYW5nbGVTdGF0ZSA9IHRoaXMuYW5nbGUuX3N0YXRlXG4gIHZhciBsYXN0VGhldGEgID0gYW5nbGVTdGF0ZVthbmdsZVN0YXRlLmxlbmd0aC0xXVxuICB2YXIgbGFzdFBoaSAgICA9IGFuZ2xlU3RhdGVbYW5nbGVTdGF0ZS5sZW5ndGgtMl1cbiAgbGFzdFRoZXRhICAgICAgPSBsYXN0VGhldGEgJSAoMi4wICogTWF0aC5QSSlcbiAgdmFyIGRwID0gTWF0aC5hYnMobGFzdFRoZXRhICsgMi4wICogTWF0aC5QSSAtIHRoZXRhKVxuICB2YXIgZDAgPSBNYXRoLmFicyhsYXN0VGhldGEgLSB0aGV0YSlcbiAgdmFyIGRuID0gTWF0aC5hYnMobGFzdFRoZXRhIC0gMi4wICogTWF0aC5QSSAtIHRoZXRhKVxuICBpZihkcCA8IGQwKSB7XG4gICAgbGFzdFRoZXRhICs9IDIuMCAqIE1hdGguUElcbiAgfVxuICBpZihkbiA8IGQwKSB7XG4gICAgbGFzdFRoZXRhIC09IDIuMCAqIE1hdGguUElcbiAgfVxuXG4gIHRoaXMuYW5nbGUuanVtcCh0aGlzLmFuZ2xlLmxhc3RUKCksIGxhc3RUaGV0YSwgbGFzdFBoaSlcbiAgdGhpcy5hbmdsZS5zZXQodCwgdGhldGEsIHBoaSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHVybnRhYmxlQ29udHJvbGxlcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgdmFyIGNlbnRlciA9IG9wdGlvbnMuY2VudGVyIHx8IFswLDAsMF1cbiAgdmFyIHVwICAgICA9IG9wdGlvbnMudXAgICAgIHx8IFswLDEsMF1cbiAgdmFyIHJpZ2h0ICA9IG9wdGlvbnMucmlnaHQgIHx8IGZpbmRPcnRob1BhaXIodXApXG4gIHZhciByYWRpdXMgPSBvcHRpb25zLnJhZGl1cyB8fCAxLjBcbiAgdmFyIHRoZXRhICA9IG9wdGlvbnMudGhldGEgIHx8IDAuMFxuICB2YXIgcGhpICAgID0gb3B0aW9ucy5waGkgICAgfHwgMC4wXG5cbiAgY2VudGVyID0gW10uc2xpY2UuY2FsbChjZW50ZXIsIDAsIDMpXG5cbiAgdXAgPSBbXS5zbGljZS5jYWxsKHVwLCAwLCAzKVxuICBub3JtYWxpemUzKHVwLCB1cClcblxuICByaWdodCA9IFtdLnNsaWNlLmNhbGwocmlnaHQsIDAsIDMpXG4gIG5vcm1hbGl6ZTMocmlnaHQsIHJpZ2h0KVxuXG4gIGlmKCdleWUnIGluIG9wdGlvbnMpIHtcbiAgICB2YXIgZXllID0gb3B0aW9ucy5leWVcbiAgICB2YXIgdG93YXJkID0gW1xuICAgICAgZXllWzBdLWNlbnRlclswXSxcbiAgICAgIGV5ZVsxXS1jZW50ZXJbMV0sXG4gICAgICBleWVbMl0tY2VudGVyWzJdXG4gICAgXVxuICAgIGNyb3NzKHJpZ2h0LCB0b3dhcmQsIHVwKVxuICAgIGlmKGxlbjMocmlnaHRbMF0sIHJpZ2h0WzFdLCByaWdodFsyXSkgPCAxZS02KSB7XG4gICAgICByaWdodCA9IGZpbmRPcnRob1BhaXIodXApXG4gICAgfSBlbHNlIHtcbiAgICAgIG5vcm1hbGl6ZTMocmlnaHQsIHJpZ2h0KVxuICAgIH1cblxuICAgIHJhZGl1cyA9IGxlbjModG93YXJkWzBdLCB0b3dhcmRbMV0sIHRvd2FyZFsyXSlcblxuICAgIHZhciB1dCA9IGRvdDModXAsIHRvd2FyZCkgLyByYWRpdXNcbiAgICB2YXIgcnQgPSBkb3QzKHJpZ2h0LCB0b3dhcmQpIC8gcmFkaXVzXG4gICAgcGhpICAgID0gTWF0aC5hY29zKHV0KVxuICAgIHRoZXRhICA9IE1hdGguYWNvcyhydClcbiAgfVxuXG4gIC8vVXNlIGxvZ2FyaXRobWljIGNvb3JkaW5hdGVzIGZvciByYWRpdXNcbiAgcmFkaXVzID0gTWF0aC5sb2cocmFkaXVzKVxuXG4gIC8vUmV0dXJuIHRoZSBjb250cm9sbGVyXG4gIHJldHVybiBuZXcgVHVybnRhYmxlQ29udHJvbGxlcihcbiAgICBvcHRpb25zLnpvb21NaW4sXG4gICAgb3B0aW9ucy56b29tTWF4LFxuICAgIGNlbnRlcixcbiAgICB1cCxcbiAgICByaWdodCxcbiAgICByYWRpdXMsXG4gICAgdGhldGEsXG4gICAgcGhpKVxufSIsIi8vIENvcHlyaWdodCAoQykgMjAxMSBHb29nbGUgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgSW5zdGFsbCBhIGxlYWt5IFdlYWtNYXAgZW11bGF0aW9uIG9uIHBsYXRmb3JtcyB0aGF0XG4gKiBkb24ndCBwcm92aWRlIGEgYnVpbHQtaW4gb25lLlxuICpcbiAqIDxwPkFzc3VtZXMgdGhhdCBhbiBFUzUgcGxhdGZvcm0gd2hlcmUsIGlmIHtAY29kZSBXZWFrTWFwfSBpc1xuICogYWxyZWFkeSBwcmVzZW50LCB0aGVuIGl0IGNvbmZvcm1zIHRvIHRoZSBhbnRpY2lwYXRlZCBFUzZcbiAqIHNwZWNpZmljYXRpb24uIFRvIHJ1biB0aGlzIGZpbGUgb24gYW4gRVM1IG9yIGFsbW9zdCBFUzVcbiAqIGltcGxlbWVudGF0aW9uIHdoZXJlIHRoZSB7QGNvZGUgV2Vha01hcH0gc3BlY2lmaWNhdGlvbiBkb2VzIG5vdFxuICogcXVpdGUgY29uZm9ybSwgcnVuIDxjb2RlPnJlcGFpckVTNS5qczwvY29kZT4gZmlyc3QuXG4gKlxuICogPHA+RXZlbiB0aG91Z2ggV2Vha01hcE1vZHVsZSBpcyBub3QgZ2xvYmFsLCB0aGUgbGludGVyIHRoaW5rcyBpdFxuICogaXMsIHdoaWNoIGlzIHdoeSBpdCBpcyBpbiB0aGUgb3ZlcnJpZGVzIGxpc3QgYmVsb3cuXG4gKlxuICogPHA+Tk9URTogQmVmb3JlIHVzaW5nIHRoaXMgV2Vha01hcCBlbXVsYXRpb24gaW4gYSBub24tU0VTXG4gKiBlbnZpcm9ubWVudCwgc2VlIHRoZSBub3RlIGJlbG93IGFib3V0IGhpZGRlblJlY29yZC5cbiAqXG4gKiBAYXV0aG9yIE1hcmsgUy4gTWlsbGVyXG4gKiBAcmVxdWlyZXMgY3J5cHRvLCBBcnJheUJ1ZmZlciwgVWludDhBcnJheSwgbmF2aWdhdG9yLCBjb25zb2xlXG4gKiBAb3ZlcnJpZGVzIFdlYWtNYXAsIHNlcywgUHJveHlcbiAqIEBvdmVycmlkZXMgV2Vha01hcE1vZHVsZVxuICovXG5cbi8qKlxuICogVGhpcyB7QGNvZGUgV2Vha01hcH0gZW11bGF0aW9uIGlzIG9ic2VydmFibHkgZXF1aXZhbGVudCB0byB0aGVcbiAqIEVTLUhhcm1vbnkgV2Vha01hcCwgYnV0IHdpdGggbGVha2llciBnYXJiYWdlIGNvbGxlY3Rpb24gcHJvcGVydGllcy5cbiAqXG4gKiA8cD5BcyB3aXRoIHRydWUgV2Vha01hcHMsIGluIHRoaXMgZW11bGF0aW9uLCBhIGtleSBkb2VzIG5vdFxuICogcmV0YWluIG1hcHMgaW5kZXhlZCBieSB0aGF0IGtleSBhbmQgKGNydWNpYWxseSkgYSBtYXAgZG9lcyBub3RcbiAqIHJldGFpbiB0aGUga2V5cyBpdCBpbmRleGVzLiBBIG1hcCBieSBpdHNlbGYgYWxzbyBkb2VzIG5vdCByZXRhaW5cbiAqIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIHRoYXQgbWFwLlxuICpcbiAqIDxwPkhvd2V2ZXIsIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEga2V5IGluIHNvbWUgbWFwIGFyZVxuICogcmV0YWluZWQgc28gbG9uZyBhcyB0aGF0IGtleSBpcyByZXRhaW5lZCBhbmQgdGhvc2UgYXNzb2NpYXRpb25zIGFyZVxuICogbm90IG92ZXJyaWRkZW4uIEZvciBleGFtcGxlLCB3aGVuIHVzZWQgdG8gc3VwcG9ydCBtZW1icmFuZXMsIGFsbFxuICogdmFsdWVzIGV4cG9ydGVkIGZyb20gYSBnaXZlbiBtZW1icmFuZSB3aWxsIGxpdmUgZm9yIHRoZSBsaWZldGltZVxuICogdGhleSB3b3VsZCBoYXZlIGhhZCBpbiB0aGUgYWJzZW5jZSBvZiBhbiBpbnRlcnBvc2VkIG1lbWJyYW5lLiBFdmVuXG4gKiB3aGVuIHRoZSBtZW1icmFuZSBpcyByZXZva2VkLCBhbGwgb2JqZWN0cyB0aGF0IHdvdWxkIGhhdmUgYmVlblxuICogcmVhY2hhYmxlIGluIHRoZSBhYnNlbmNlIG9mIHJldm9jYXRpb24gd2lsbCBzdGlsbCBiZSByZWFjaGFibGUsIGFzXG4gKiBmYXIgYXMgdGhlIEdDIGNhbiB0ZWxsLCBldmVuIHRob3VnaCB0aGV5IHdpbGwgbm8gbG9uZ2VyIGJlIHJlbGV2YW50XG4gKiB0byBvbmdvaW5nIGNvbXB1dGF0aW9uLlxuICpcbiAqIDxwPlRoZSBBUEkgaW1wbGVtZW50ZWQgaGVyZSBpcyBhcHByb3hpbWF0ZWx5IHRoZSBBUEkgYXMgaW1wbGVtZW50ZWRcbiAqIGluIEZGNi4wYTEgYW5kIGFncmVlZCB0byBieSBNYXJrTSwgQW5kcmVhcyBHYWwsIGFuZCBEYXZlIEhlcm1hbixcbiAqIHJhdGhlciB0aGFuIHRoZSBvZmZpYWxseSBhcHByb3ZlZCBwcm9wb3NhbCBwYWdlLiBUT0RPKGVyaWdodHMpOlxuICogdXBncmFkZSB0aGUgZWNtYXNjcmlwdCBXZWFrTWFwIHByb3Bvc2FsIHBhZ2UgdG8gZXhwbGFpbiB0aGlzIEFQSVxuICogY2hhbmdlIGFuZCBwcmVzZW50IHRvIEVjbWFTY3JpcHQgY29tbWl0dGVlIGZvciB0aGVpciBhcHByb3ZhbC5cbiAqXG4gKiA8cD5UaGUgZmlyc3QgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBlbXVsYXRpb24gaGVyZSBhbmQgdGhhdCBpblxuICogRkY2LjBhMSBpcyB0aGUgcHJlc2VuY2Ugb2Ygbm9uIGVudW1lcmFibGUge0Bjb2RlIGdldF9fXywgaGFzX19fLFxuICogc2V0X19fLCBhbmQgZGVsZXRlX19ffSBtZXRob2RzIG9uIFdlYWtNYXAgaW5zdGFuY2VzIHRvIHJlcHJlc2VudFxuICogd2hhdCB3b3VsZCBiZSB0aGUgaGlkZGVuIGludGVybmFsIHByb3BlcnRpZXMgb2YgYSBwcmltaXRpdmVcbiAqIGltcGxlbWVudGF0aW9uLiBXaGVyZWFzIHRoZSBGRjYuMGExIFdlYWtNYXAucHJvdG90eXBlIG1ldGhvZHNcbiAqIHJlcXVpcmUgdGhlaXIge0Bjb2RlIHRoaXN9IHRvIGJlIGEgZ2VudWluZSBXZWFrTWFwIGluc3RhbmNlIChpLmUuLFxuICogYW4gb2JqZWN0IG9mIHtAY29kZSBbW0NsYXNzXV19IFwiV2Vha01hcH0pLCBzaW5jZSB0aGVyZSBpcyBub3RoaW5nXG4gKiB1bmZvcmdlYWJsZSBhYm91dCB0aGUgcHNldWRvLWludGVybmFsIG1ldGhvZCBuYW1lcyB1c2VkIGhlcmUsXG4gKiBub3RoaW5nIHByZXZlbnRzIHRoZXNlIGVtdWxhdGVkIHByb3RvdHlwZSBtZXRob2RzIGZyb20gYmVpbmdcbiAqIGFwcGxpZWQgdG8gbm9uLVdlYWtNYXBzIHdpdGggcHNldWRvLWludGVybmFsIG1ldGhvZHMgb2YgdGhlIHNhbWVcbiAqIG5hbWVzLlxuICpcbiAqIDxwPkFub3RoZXIgZGlmZmVyZW5jZSBpcyB0aGF0IG91ciBlbXVsYXRlZCB7QGNvZGVcbiAqIFdlYWtNYXAucHJvdG90eXBlfSBpcyBub3QgaXRzZWxmIGEgV2Vha01hcC4gQSBwcm9ibGVtIHdpdGggdGhlXG4gKiBjdXJyZW50IEZGNi4wYTEgQVBJIGlzIHRoYXQgV2Vha01hcC5wcm90b3R5cGUgaXMgaXRzZWxmIGEgV2Vha01hcFxuICogcHJvdmlkaW5nIGFtYmllbnQgbXV0YWJpbGl0eSBhbmQgYW4gYW1iaWVudCBjb21tdW5pY2F0aW9uc1xuICogY2hhbm5lbC4gVGh1cywgaWYgYSBXZWFrTWFwIGlzIGFscmVhZHkgcHJlc2VudCBhbmQgaGFzIHRoaXNcbiAqIHByb2JsZW0sIHJlcGFpckVTNS5qcyB3cmFwcyBpdCBpbiBhIHNhZmUgd3JhcHBwZXIgaW4gb3JkZXIgdG9cbiAqIHByZXZlbnQgYWNjZXNzIHRvIHRoaXMgY2hhbm5lbC4gKFNlZVxuICogUEFUQ0hfTVVUQUJMRV9GUk9aRU5fV0VBS01BUF9QUk9UTyBpbiByZXBhaXJFUzUuanMpLlxuICovXG5cbi8qKlxuICogSWYgdGhpcyBpcyBhIGZ1bGwgPGEgaHJlZj1cbiAqIFwiaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2VzLWxhYi93aWtpL1NlY3VyZWFibGVFUzVcIlxuICogPnNlY3VyZWFibGUgRVM1PC9hPiBwbGF0Zm9ybSBhbmQgdGhlIEVTLUhhcm1vbnkge0Bjb2RlIFdlYWtNYXB9IGlzXG4gKiBhYnNlbnQsIGluc3RhbGwgYW4gYXBwcm94aW1hdGUgZW11bGF0aW9uLlxuICpcbiAqIDxwPklmIFdlYWtNYXAgaXMgcHJlc2VudCBidXQgY2Fubm90IHN0b3JlIHNvbWUgb2JqZWN0cywgdXNlIG91ciBhcHByb3hpbWF0ZVxuICogZW11bGF0aW9uIGFzIGEgd3JhcHBlci5cbiAqXG4gKiA8cD5JZiB0aGlzIGlzIGFsbW9zdCBhIHNlY3VyZWFibGUgRVM1IHBsYXRmb3JtLCB0aGVuIFdlYWtNYXAuanNcbiAqIHNob3VsZCBiZSBydW4gYWZ0ZXIgcmVwYWlyRVM1LmpzLlxuICpcbiAqIDxwPlNlZSB7QGNvZGUgV2Vha01hcH0gZm9yIGRvY3VtZW50YXRpb24gb2YgdGhlIGdhcmJhZ2UgY29sbGVjdGlvblxuICogcHJvcGVydGllcyBvZiB0aGlzIFdlYWtNYXAgZW11bGF0aW9uLlxuICovXG4oZnVuY3Rpb24gV2Vha01hcE1vZHVsZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKHR5cGVvZiBzZXMgIT09ICd1bmRlZmluZWQnICYmIHNlcy5vayAmJiAhc2VzLm9rKCkpIHtcbiAgICAvLyBhbHJlYWR5IHRvbyBicm9rZW4sIHNvIGdpdmUgdXBcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogSW4gc29tZSBjYXNlcyAoY3VycmVudCBGaXJlZm94KSwgd2UgbXVzdCBtYWtlIGEgY2hvaWNlIGJldHdlZWVuIGFcbiAgICogV2Vha01hcCB3aGljaCBpcyBjYXBhYmxlIG9mIHVzaW5nIGFsbCB2YXJpZXRpZXMgb2YgaG9zdCBvYmplY3RzIGFzXG4gICAqIGtleXMgYW5kIG9uZSB3aGljaCBpcyBjYXBhYmxlIG9mIHNhZmVseSB1c2luZyBwcm94aWVzIGFzIGtleXMuIFNlZVxuICAgKiBjb21tZW50cyBiZWxvdyBhYm91dCBIb3N0V2Vha01hcCBhbmQgRG91YmxlV2Vha01hcCBmb3IgZGV0YWlscy5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiAod2hpY2ggaXMgYSBnbG9iYWwsIG5vdCBleHBvc2VkIHRvIGd1ZXN0cykgbWFya3MgYVxuICAgKiBXZWFrTWFwIGFzIHBlcm1pdHRlZCB0byBkbyB3aGF0IGlzIG5lY2Vzc2FyeSB0byBpbmRleCBhbGwgaG9zdFxuICAgKiBvYmplY3RzLCBhdCB0aGUgY29zdCBvZiBtYWtpbmcgaXQgdW5zYWZlIGZvciBwcm94aWVzLlxuICAgKlxuICAgKiBEbyBub3QgYXBwbHkgdGhpcyBmdW5jdGlvbiB0byBhbnl0aGluZyB3aGljaCBpcyBub3QgYSBnZW51aW5lXG4gICAqIGZyZXNoIFdlYWtNYXAuXG4gICAqL1xuICBmdW5jdGlvbiB3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMobWFwKSB7XG4gICAgLy8gaWRlbnRpdHkgb2YgZnVuY3Rpb24gdXNlZCBhcyBhIHNlY3JldCAtLSBnb29kIGVub3VnaCBhbmQgY2hlYXBcbiAgICBpZiAobWFwLnBlcm1pdEhvc3RPYmplY3RzX19fKSB7XG4gICAgICBtYXAucGVybWl0SG9zdE9iamVjdHNfX18od2Vha01hcFBlcm1pdEhvc3RPYmplY3RzKTtcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVvZiBzZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgc2VzLndlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cyA9IHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cztcbiAgfVxuXG4gIC8vIElFIDExIGhhcyBubyBQcm94eSBidXQgaGFzIGEgYnJva2VuIFdlYWtNYXAgc3VjaCB0aGF0IHdlIG5lZWQgdG8gcGF0Y2hcbiAgLy8gaXQgdXNpbmcgRG91YmxlV2Vha01hcDsgdGhpcyBmbGFnIHRlbGxzIERvdWJsZVdlYWtNYXAgc28uXG4gIHZhciBkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlID0gZmFsc2U7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIGdvb2QtZW5vdWdoIFdlYWtNYXAgaW1wbGVtZW50YXRpb24sIGFuZCBpZiBzb1xuICAvLyBleGl0IHdpdGhvdXQgcmVwbGFjaW5nIGl0LlxuICBpZiAodHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgSG9zdFdlYWtNYXAgPSBXZWFrTWFwO1xuICAgIC8vIFRoZXJlIGlzIGEgV2Vha01hcCAtLSBpcyBpdCBnb29kIGVub3VnaD9cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgL0ZpcmVmb3gvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgIC8vIFdlJ3JlIG5vdyAqYXNzdW1pbmcgbm90KiwgYmVjYXVzZSBhcyBvZiB0aGlzIHdyaXRpbmcgKDIwMTMtMDUtMDYpXG4gICAgICAvLyBGaXJlZm94J3MgV2Vha01hcHMgaGF2ZSBhIG1pc2NlbGxhbnkgb2Ygb2JqZWN0cyB0aGV5IHdvbid0IGFjY2VwdCwgYW5kXG4gICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIG1ha2UgYW4gZXhoYXVzdGl2ZSBsaXN0LCBhbmQgdGVzdGluZyBmb3IganVzdCBvbmVcbiAgICAgIC8vIHdpbGwgYmUgYSBwcm9ibGVtIGlmIHRoYXQgb25lIGlzIGZpeGVkIGFsb25lIChhcyB0aGV5IGRpZCBmb3IgRXZlbnQpLlxuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBhIHBsYXRmb3JtIHRoYXQgd2UgKmNhbiogcmVsaWFibHkgdGVzdCBvbiwgaGVyZSdzIGhvdyB0b1xuICAgICAgLy8gZG8gaXQ6XG4gICAgICAvLyAgdmFyIHByb2JsZW1hdGljID0gLi4uIDtcbiAgICAgIC8vICB2YXIgdGVzdEhvc3RNYXAgPSBuZXcgSG9zdFdlYWtNYXAoKTtcbiAgICAgIC8vICB0cnkge1xuICAgICAgLy8gICAgdGVzdEhvc3RNYXAuc2V0KHByb2JsZW1hdGljLCAxKTsgIC8vIEZpcmVmb3ggMjAgd2lsbCB0aHJvdyBoZXJlXG4gICAgICAvLyAgICBpZiAodGVzdEhvc3RNYXAuZ2V0KHByb2JsZW1hdGljKSA9PT0gMSkge1xuICAgICAgLy8gICAgICByZXR1cm47XG4gICAgICAvLyAgICB9XG4gICAgICAvLyAgfSBjYXRjaCAoZSkge31cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSAxMSBidWc6IFdlYWtNYXBzIHNpbGVudGx5IGZhaWwgdG8gc3RvcmUgZnJvemVuIG9iamVjdHMuXG4gICAgICB2YXIgdGVzdE1hcCA9IG5ldyBIb3N0V2Vha01hcCgpO1xuICAgICAgdmFyIHRlc3RPYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcbiAgICAgIHRlc3RNYXAuc2V0KHRlc3RPYmplY3QsIDEpO1xuICAgICAgaWYgKHRlc3RNYXAuZ2V0KHRlc3RPYmplY3QpICE9PSAxKSB7XG4gICAgICAgIGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgPSB0cnVlO1xuICAgICAgICAvLyBGYWxsIHRocm91Z2ggdG8gaW5zdGFsbGluZyBvdXIgV2Vha01hcC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gV2Vha01hcDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBob3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgZ29wbiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG5cbiAgLyoqXG4gICAqIFNlY3VyaXR5IGRlcGVuZHMgb24gSElEREVOX05BTUUgYmVpbmcgYm90aCA8aT51bmd1ZXNzYWJsZTwvaT4gYW5kXG4gICAqIDxpPnVuZGlzY292ZXJhYmxlPC9pPiBieSB1bnRydXN0ZWQgY29kZS5cbiAgICpcbiAgICogPHA+R2l2ZW4gdGhlIGtub3duIHdlYWtuZXNzZXMgb2YgTWF0aC5yYW5kb20oKSBvbiBleGlzdGluZ1xuICAgKiBicm93c2VycywgaXQgZG9lcyBub3QgZ2VuZXJhdGUgdW5ndWVzc2FiaWxpdHkgd2UgY2FuIGJlIGNvbmZpZGVudFxuICAgKiBvZi5cbiAgICpcbiAgICogPHA+SXQgaXMgdGhlIG1vbmtleSBwYXRjaGluZyBsb2dpYyBpbiB0aGlzIGZpbGUgdGhhdCBpcyBpbnRlbmRlZFxuICAgKiB0byBlbnN1cmUgdW5kaXNjb3ZlcmFiaWxpdHkuIFRoZSBiYXNpYyBpZGVhIGlzIHRoYXQgdGhlcmUgYXJlXG4gICAqIHRocmVlIGZ1bmRhbWVudGFsIG1lYW5zIG9mIGRpc2NvdmVyaW5nIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0OlxuICAgKiBUaGUgZm9yL2luIGxvb3AsIE9iamVjdC5rZXlzKCksIGFuZCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcygpLFxuICAgKiBhcyB3ZWxsIGFzIHNvbWUgcHJvcG9zZWQgRVM2IGV4dGVuc2lvbnMgdGhhdCBhcHBlYXIgb24gb3VyXG4gICAqIHdoaXRlbGlzdC4gVGhlIGZpcnN0IHR3byBvbmx5IGRpc2NvdmVyIGVudW1lcmFibGUgcHJvcGVydGllcywgYW5kXG4gICAqIHdlIG9ubHkgdXNlIEhJRERFTl9OQU1FIHRvIG5hbWUgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSwgc28gdGhlXG4gICAqIG9ubHkgcmVtYWluaW5nIHRocmVhdCBzaG91bGQgYmUgZ2V0T3duUHJvcGVydHlOYW1lcyBhbmQgc29tZVxuICAgKiBwcm9wb3NlZCBFUzYgZXh0ZW5zaW9ucyB0aGF0IGFwcGVhciBvbiBvdXIgd2hpdGVsaXN0LiBXZSBtb25rZXlcbiAgICogcGF0Y2ggdGhlbSB0byByZW1vdmUgSElEREVOX05BTUUgZnJvbSB0aGUgbGlzdCBvZiBwcm9wZXJ0aWVzIHRoZXlcbiAgICogcmV0dXJucy5cbiAgICpcbiAgICogPHA+VE9ETyhlcmlnaHRzKTogT24gYSBwbGF0Zm9ybSB3aXRoIGJ1aWx0LWluIFByb3hpZXMsIHByb3hpZXNcbiAgICogY291bGQgYmUgdXNlZCB0byB0cmFwIGFuZCB0aGVyZWJ5IGRpc2NvdmVyIHRoZSBISURERU5fTkFNRSwgc28gd2VcbiAgICogbmVlZCB0byBtb25rZXkgcGF0Y2ggUHJveHkuY3JlYXRlLCBQcm94eS5jcmVhdGVGdW5jdGlvbiwgZXRjLCBpblxuICAgKiBvcmRlciB0byB3cmFwIHRoZSBwcm92aWRlZCBoYW5kbGVyIHdpdGggdGhlIHJlYWwgaGFuZGxlciB3aGljaFxuICAgKiBmaWx0ZXJzIG91dCBhbGwgdHJhcHMgdXNpbmcgSElEREVOX05BTUUuXG4gICAqXG4gICAqIDxwPlRPRE8oZXJpZ2h0cyk6IFJldmlzaXQgTWlrZSBTdGF5J3Mgc3VnZ2VzdGlvbiB0aGF0IHdlIHVzZSBhblxuICAgKiBlbmNhcHN1bGF0ZWQgZnVuY3Rpb24gYXQgYSBub3QtbmVjZXNzYXJpbHktc2VjcmV0IG5hbWUsIHdoaWNoXG4gICAqIHVzZXMgdGhlIFN0aWVnbGVyIHNoYXJlZC1zdGF0ZSByaWdodHMgYW1wbGlmaWNhdGlvbiBwYXR0ZXJuIHRvXG4gICAqIHJldmVhbCB0aGUgYXNzb2NpYXRlZCB2YWx1ZSBvbmx5IHRvIHRoZSBXZWFrTWFwIGluIHdoaWNoIHRoaXMga2V5XG4gICAqIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGF0IHZhbHVlLiBTaW5jZSBvbmx5IHRoZSBrZXkgcmV0YWlucyB0aGVcbiAgICogZnVuY3Rpb24sIHRoZSBmdW5jdGlvbiBjYW4gYWxzbyByZW1lbWJlciB0aGUga2V5IHdpdGhvdXQgY2F1c2luZ1xuICAgKiBsZWFrYWdlIG9mIHRoZSBrZXksIHNvIHRoaXMgZG9lc24ndCB2aW9sYXRlIG91ciBnZW5lcmFsIGdjXG4gICAqIGdvYWxzLiBJbiBhZGRpdGlvbiwgYmVjYXVzZSB0aGUgbmFtZSBuZWVkIG5vdCBiZSBhIGd1YXJkZWRcbiAgICogc2VjcmV0LCB3ZSBjb3VsZCBlZmZpY2llbnRseSBoYW5kbGUgY3Jvc3MtZnJhbWUgZnJvemVuIGtleXMuXG4gICAqL1xuICB2YXIgSElEREVOX05BTUVfUFJFRklYID0gJ3dlYWttYXA6JztcbiAgdmFyIEhJRERFTl9OQU1FID0gSElEREVOX05BTUVfUFJFRklYICsgJ2lkZW50OicgKyBNYXRoLnJhbmRvbSgpICsgJ19fXyc7XG5cbiAgaWYgKHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgdHlwZW9mIEFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2YgVWludDhBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBhYiA9IG5ldyBBcnJheUJ1ZmZlcigyNSk7XG4gICAgdmFyIHU4cyA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHU4cyk7XG4gICAgSElEREVOX05BTUUgPSBISURERU5fTkFNRV9QUkVGSVggKyAncmFuZDonICtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh1OHMsIGZ1bmN0aW9uKHU4KSB7XG4gICAgICAgIHJldHVybiAodTggJSAzNikudG9TdHJpbmcoMzYpO1xuICAgICAgfSkuam9pbignJykgKyAnX19fJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm90SGlkZGVuTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuICEoXG4gICAgICAgIG5hbWUuc3Vic3RyKDAsIEhJRERFTl9OQU1FX1BSRUZJWC5sZW5ndGgpID09IEhJRERFTl9OQU1FX1BSRUZJWCAmJlxuICAgICAgICBuYW1lLnN1YnN0cihuYW1lLmxlbmd0aCAtIDMpID09PSAnX19fJyk7XG4gIH1cblxuICAvKipcbiAgICogTW9ua2V5IHBhdGNoIGdldE93blByb3BlcnR5TmFtZXMgdG8gYXZvaWQgcmV2ZWFsaW5nIHRoZVxuICAgKiBISURERU5fTkFNRS5cbiAgICpcbiAgICogPHA+VGhlIEVTNS4xIHNwZWMgcmVxdWlyZXMgZWFjaCBuYW1lIHRvIGFwcGVhciBvbmx5IG9uY2UsIGJ1dCBhc1xuICAgKiBvZiB0aGlzIHdyaXRpbmcsIHRoaXMgcmVxdWlyZW1lbnQgaXMgY29udHJvdmVyc2lhbCBmb3IgRVM2LCBzbyB3ZVxuICAgKiBtYWRlIHRoaXMgY29kZSByb2J1c3QgYWdhaW5zdCB0aGlzIGNhc2UuIElmIHRoZSByZXN1bHRpbmcgZXh0cmFcbiAgICogc2VhcmNoIHR1cm5zIG91dCB0byBiZSBleHBlbnNpdmUsIHdlIGNhbiBwcm9iYWJseSByZWxheCB0aGlzIG9uY2VcbiAgICogRVM2IGlzIGFkZXF1YXRlbHkgc3VwcG9ydGVkIG9uIGFsbCBtYWpvciBicm93c2VycywgaWZmIG5vIGJyb3dzZXJcbiAgICogdmVyc2lvbnMgd2Ugc3VwcG9ydCBhdCB0aGF0IHRpbWUgaGF2ZSByZWxheGVkIHRoaXMgY29uc3RyYWludFxuICAgKiB3aXRob3V0IHByb3ZpZGluZyBidWlsdC1pbiBFUzYgV2Vha01hcHMuXG4gICAqL1xuICBkZWZQcm9wKE9iamVjdCwgJ2dldE93blByb3BlcnR5TmFtZXMnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZha2VHZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikge1xuICAgICAgcmV0dXJuIGdvcG4ob2JqKS5maWx0ZXIoaXNOb3RIaWRkZW5OYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBnZXRQcm9wZXJ0eU5hbWVzIGlzIG5vdCBpbiBFUzUgYnV0IGl0IGlzIHByb3Bvc2VkIGZvciBFUzYgYW5kXG4gICAqIGRvZXMgYXBwZWFyIGluIG91ciB3aGl0ZWxpc3QsIHNvIHdlIG5lZWQgdG8gY2xlYW4gaXQgdG9vLlxuICAgKi9cbiAgaWYgKCdnZXRQcm9wZXJ0eU5hbWVzJyBpbiBPYmplY3QpIHtcbiAgICB2YXIgb3JpZ2luYWxHZXRQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldFByb3BlcnR5TmFtZXM7XG4gICAgZGVmUHJvcChPYmplY3QsICdnZXRQcm9wZXJ0eU5hbWVzJywge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZha2VHZXRQcm9wZXJ0eU5hbWVzKG9iaikge1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxHZXRQcm9wZXJ0eU5hbWVzKG9iaikuZmlsdGVyKGlzTm90SGlkZGVuTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogPHA+VG8gdHJlYXQgb2JqZWN0cyBhcyBpZGVudGl0eS1rZXlzIHdpdGggcmVhc29uYWJsZSBlZmZpY2llbmN5XG4gICAqIG9uIEVTNSBieSBpdHNlbGYgKGkuZS4sIHdpdGhvdXQgYW55IG9iamVjdC1rZXllZCBjb2xsZWN0aW9ucyksIHdlXG4gICAqIG5lZWQgdG8gYWRkIGEgaGlkZGVuIHByb3BlcnR5IHRvIHN1Y2gga2V5IG9iamVjdHMgd2hlbiB3ZVxuICAgKiBjYW4uIFRoaXMgcmFpc2VzIHNldmVyYWwgaXNzdWVzOlxuICAgKiA8dWw+XG4gICAqIDxsaT5BcnJhbmdpbmcgdG8gYWRkIHRoaXMgcHJvcGVydHkgdG8gb2JqZWN0cyBiZWZvcmUgd2UgbG9zZSB0aGVcbiAgICogICAgIGNoYW5jZSwgYW5kXG4gICAqIDxsaT5IaWRpbmcgdGhlIGV4aXN0ZW5jZSBvZiB0aGlzIG5ldyBwcm9wZXJ0eSBmcm9tIG1vc3RcbiAgICogICAgIEphdmFTY3JpcHQgY29kZS5cbiAgICogPGxpPlByZXZlbnRpbmcgPGk+Y2VydGlmaWNhdGlvbiB0aGVmdDwvaT4sIHdoZXJlIG9uZSBvYmplY3QgaXNcbiAgICogICAgIGNyZWF0ZWQgZmFsc2VseSBjbGFpbWluZyB0byBiZSB0aGUga2V5IG9mIGFuIGFzc29jaWF0aW9uXG4gICAqICAgICBhY3R1YWxseSBrZXllZCBieSBhbm90aGVyIG9iamVjdC5cbiAgICogPGxpPlByZXZlbnRpbmcgPGk+dmFsdWUgdGhlZnQ8L2k+LCB3aGVyZSB1bnRydXN0ZWQgY29kZSB3aXRoXG4gICAqICAgICBhY2Nlc3MgdG8gYSBrZXkgb2JqZWN0IGJ1dCBub3QgYSB3ZWFrIG1hcCBuZXZlcnRoZWxlc3NcbiAgICogICAgIG9idGFpbnMgYWNjZXNzIHRvIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhhdCBrZXkgaW4gdGhhdFxuICAgKiAgICAgd2VhayBtYXAuXG4gICAqIDwvdWw+XG4gICAqIFdlIGRvIHNvIGJ5XG4gICAqIDx1bD5cbiAgICogPGxpPk1ha2luZyB0aGUgbmFtZSBvZiB0aGUgaGlkZGVuIHByb3BlcnR5IHVuZ3Vlc3NhYmxlLCBzbyBcIltdXCJcbiAgICogICAgIGluZGV4aW5nLCB3aGljaCB3ZSBjYW5ub3QgaW50ZXJjZXB0LCBjYW5ub3QgYmUgdXNlZCB0byBhY2Nlc3NcbiAgICogICAgIGEgcHJvcGVydHkgd2l0aG91dCBrbm93aW5nIHRoZSBuYW1lLlxuICAgKiA8bGk+TWFraW5nIHRoZSBoaWRkZW4gcHJvcGVydHkgbm9uLWVudW1lcmFibGUsIHNvIHdlIG5lZWQgbm90XG4gICAqICAgICB3b3JyeSBhYm91dCBmb3ItaW4gbG9vcHMgb3Ige0Bjb2RlIE9iamVjdC5rZXlzfSxcbiAgICogPGxpPm1vbmtleSBwYXRjaGluZyB0aG9zZSByZWZsZWN0aXZlIG1ldGhvZHMgdGhhdCB3b3VsZFxuICAgKiAgICAgcHJldmVudCBleHRlbnNpb25zLCB0byBhZGQgdGhpcyBoaWRkZW4gcHJvcGVydHkgZmlyc3QsXG4gICAqIDxsaT5tb25rZXkgcGF0Y2hpbmcgdGhvc2UgbWV0aG9kcyB0aGF0IHdvdWxkIHJldmVhbCB0aGlzXG4gICAqICAgICBoaWRkZW4gcHJvcGVydHkuXG4gICAqIDwvdWw+XG4gICAqIFVuZm9ydHVuYXRlbHksIGJlY2F1c2Ugb2Ygc2FtZS1vcmlnaW4gaWZyYW1lcywgd2UgY2Fubm90IHJlbGlhYmx5XG4gICAqIGFkZCB0aGlzIGhpZGRlbiBwcm9wZXJ0eSBiZWZvcmUgYW4gb2JqZWN0IGJlY29tZXNcbiAgICogbm9uLWV4dGVuc2libGUuIEluc3RlYWQsIGlmIHdlIGVuY291bnRlciBhIG5vbi1leHRlbnNpYmxlIG9iamVjdFxuICAgKiB3aXRob3V0IGEgaGlkZGVuIHJlY29yZCB0aGF0IHdlIGNhbiBkZXRlY3QgKHdoZXRoZXIgb3Igbm90IGl0IGhhc1xuICAgKiBhIGhpZGRlbiByZWNvcmQgc3RvcmVkIHVuZGVyIGEgbmFtZSBzZWNyZXQgdG8gdXMpLCB0aGVuIHdlIGp1c3RcbiAgICogdXNlIHRoZSBrZXkgb2JqZWN0IGl0c2VsZiB0byByZXByZXNlbnQgaXRzIGlkZW50aXR5IGluIGEgYnJ1dGVcbiAgICogZm9yY2UgbGVha3kgbWFwIHN0b3JlZCBpbiB0aGUgd2VhayBtYXAsIGxvc2luZyBhbGwgdGhlIGFkdmFudGFnZXNcbiAgICogb2Ygd2Vha25lc3MgZm9yIHRoZXNlLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SGlkZGVuUmVjb3JkKGtleSkge1xuICAgIGlmIChrZXkgIT09IE9iamVjdChrZXkpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOb3QgYW4gb2JqZWN0OiAnICsga2V5KTtcbiAgICB9XG4gICAgdmFyIGhpZGRlblJlY29yZCA9IGtleVtISURERU5fTkFNRV07XG4gICAgaWYgKGhpZGRlblJlY29yZCAmJiBoaWRkZW5SZWNvcmQua2V5ID09PSBrZXkpIHsgcmV0dXJuIGhpZGRlblJlY29yZDsgfVxuICAgIGlmICghaXNFeHRlbnNpYmxlKGtleSkpIHtcbiAgICAgIC8vIFdlYWsgbWFwIG11c3QgYnJ1dGUgZm9yY2UsIGFzIGV4cGxhaW5lZCBpbiBkb2MtY29tbWVudCBhYm92ZS5cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gVGhlIGhpZGRlblJlY29yZCBhbmQgdGhlIGtleSBwb2ludCBkaXJlY3RseSBhdCBlYWNoIG90aGVyLCB2aWFcbiAgICAvLyB0aGUgXCJrZXlcIiBhbmQgSElEREVOX05BTUUgcHJvcGVydGllcyByZXNwZWN0aXZlbHkuIFRoZSBrZXlcbiAgICAvLyBmaWVsZCBpcyBmb3IgcXVpY2tseSB2ZXJpZnlpbmcgdGhhdCB0aGlzIGhpZGRlbiByZWNvcmQgaXMgYW5cbiAgICAvLyBvd24gcHJvcGVydHksIG5vdCBhIGhpZGRlbiByZWNvcmQgZnJvbSB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIC8vXG4gICAgLy8gTk9URTogQmVjYXVzZSB0aGlzIFdlYWtNYXAgZW11bGF0aW9uIGlzIG1lYW50IG9ubHkgZm9yIHN5c3RlbXMgbGlrZVxuICAgIC8vIFNFUyB3aGVyZSBPYmplY3QucHJvdG90eXBlIGlzIGZyb3plbiB3aXRob3V0IGFueSBudW1lcmljXG4gICAgLy8gcHJvcGVydGllcywgaXQgaXMgb2sgdG8gdXNlIGFuIG9iamVjdCBsaXRlcmFsIGZvciB0aGUgaGlkZGVuUmVjb3JkLlxuICAgIC8vIFRoaXMgaGFzIHR3byBhZHZhbnRhZ2VzOlxuICAgIC8vICogSXQgaXMgbXVjaCBmYXN0ZXIgaW4gYSBwZXJmb3JtYW5jZSBjcml0aWNhbCBwbGFjZVxuICAgIC8vICogSXQgYXZvaWRzIHJlbHlpbmcgb24gT2JqZWN0LmNyZWF0ZShudWxsKSwgd2hpY2ggaGFkIGJlZW5cbiAgICAvLyAgIHByb2JsZW1hdGljIG9uIENocm9tZSAyOC4wLjE0ODAuMC4gU2VlXG4gICAgLy8gICBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1jYWphL2lzc3Vlcy9kZXRhaWw/aWQ9MTY4N1xuICAgIGhpZGRlblJlY29yZCA9IHsga2V5OiBrZXkgfTtcblxuICAgIC8vIFdoZW4gdXNpbmcgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbiBvbiBwbGF0Zm9ybXMgd2hlcmVcbiAgICAvLyBPYmplY3QucHJvdG90eXBlIG1pZ2h0IG5vdCBiZSBmcm96ZW4gYW5kIE9iamVjdC5jcmVhdGUobnVsbCkgaXNcbiAgICAvLyByZWxpYWJsZSwgdXNlIHRoZSBmb2xsb3dpbmcgdHdvIGNvbW1lbnRlZCBvdXQgbGluZXMgaW5zdGVhZC5cbiAgICAvLyBoaWRkZW5SZWNvcmQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIC8vIGhpZGRlblJlY29yZC5rZXkgPSBrZXk7XG5cbiAgICAvLyBQbGVhc2UgY29udGFjdCB1cyBpZiB5b3UgbmVlZCB0aGlzIHRvIHdvcmsgb24gcGxhdGZvcm1zIHdoZXJlXG4gICAgLy8gT2JqZWN0LnByb3RvdHlwZSBtaWdodCBub3QgYmUgZnJvemVuIGFuZFxuICAgIC8vIE9iamVjdC5jcmVhdGUobnVsbCkgbWlnaHQgbm90IGJlIHJlbGlhYmxlLlxuXG4gICAgdHJ5IHtcbiAgICAgIGRlZlByb3Aoa2V5LCBISURERU5fTkFNRSwge1xuICAgICAgICB2YWx1ZTogaGlkZGVuUmVjb3JkLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaWRkZW5SZWNvcmQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFVuZGVyIHNvbWUgY2lyY3Vtc3RhbmNlcywgaXNFeHRlbnNpYmxlIHNlZW1zIHRvIG1pc3JlcG9ydCB3aGV0aGVyXG4gICAgICAvLyB0aGUgSElEREVOX05BTUUgY2FuIGJlIGRlZmluZWQuXG4gICAgICAvLyBUaGUgY2lyY3Vtc3RhbmNlcyBoYXZlIG5vdCBiZWVuIGlzb2xhdGVkLCBidXQgYXQgbGVhc3QgYWZmZWN0XG4gICAgICAvLyBOb2RlLmpzIHYwLjEwLjI2IG9uIFRyYXZpc0NJIC8gTGludXgsIGJ1dCBub3QgdGhlIHNhbWUgdmVyc2lvbiBvZlxuICAgICAgLy8gTm9kZS5qcyBvbiBPUyBYLlxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW9ua2V5IHBhdGNoIG9wZXJhdGlvbnMgdGhhdCB3b3VsZCBtYWtlIHRoZWlyIGFyZ3VtZW50XG4gICAqIG5vbi1leHRlbnNpYmxlLlxuICAgKlxuICAgKiA8cD5UaGUgbW9ua2V5IHBhdGNoZWQgdmVyc2lvbnMgdGhyb3cgYSBUeXBlRXJyb3IgaWYgdGhlaXJcbiAgICogYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdCwgc28gaXQgc2hvdWxkIG9ubHkgYmUgZG9uZSB0byBmdW5jdGlvbnNcbiAgICogdGhhdCBzaG91bGQgdGhyb3cgYSBUeXBlRXJyb3IgYW55d2F5IGlmIHRoZWlyIGFyZ3VtZW50IGlzIG5vdCBhblxuICAgKiBvYmplY3QuXG4gICAqL1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXIgb2xkRnJlZXplID0gT2JqZWN0LmZyZWV6ZTtcbiAgICBkZWZQcm9wKE9iamVjdCwgJ2ZyZWV6ZScsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmeWluZ0ZyZWV6ZShvYmopIHtcbiAgICAgICAgZ2V0SGlkZGVuUmVjb3JkKG9iaik7XG4gICAgICAgIHJldHVybiBvbGRGcmVlemUob2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgb2xkU2VhbCA9IE9iamVjdC5zZWFsO1xuICAgIGRlZlByb3AoT2JqZWN0LCAnc2VhbCcsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmeWluZ1NlYWwob2JqKSB7XG4gICAgICAgIGdldEhpZGRlblJlY29yZChvYmopO1xuICAgICAgICByZXR1cm4gb2xkU2VhbChvYmopO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBvbGRQcmV2ZW50RXh0ZW5zaW9ucyA9IE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucztcbiAgICBkZWZQcm9wKE9iamVjdCwgJ3ByZXZlbnRFeHRlbnNpb25zJywge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlkZW50aWZ5aW5nUHJldmVudEV4dGVuc2lvbnMob2JqKSB7XG4gICAgICAgIGdldEhpZGRlblJlY29yZChvYmopO1xuICAgICAgICByZXR1cm4gb2xkUHJldmVudEV4dGVuc2lvbnMob2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBmdW5jdGlvbiBjb25zdEZ1bmMoZnVuYykge1xuICAgIGZ1bmMucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShmdW5jKTtcbiAgfVxuXG4gIHZhciBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZ0RvbmUgPSBmYWxzZTtcbiAgZnVuY3Rpb24gY2FsbGVkQXNGdW5jdGlvbldhcm5pbmcoKSB7XG4gICAgLy8gRnV0dXJlIEVTNiBXZWFrTWFwIGlzIGN1cnJlbnRseSAoMjAxMy0wOS0xMCkgZXhwZWN0ZWQgdG8gcmVqZWN0IFdlYWtNYXAoKVxuICAgIC8vIGJ1dCB3ZSB1c2VkIHRvIHBlcm1pdCBpdCBhbmQgZG8gaXQgb3Vyc2VsdmVzLCBzbyB3YXJuIG9ubHkuXG4gICAgaWYgKCFjYWxsZWRBc0Z1bmN0aW9uV2FybmluZ0RvbmUgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZ0RvbmUgPSB0cnVlO1xuICAgICAgY29uc29sZS53YXJuKCdXZWFrTWFwIHNob3VsZCBiZSBpbnZva2VkIGFzIG5ldyBXZWFrTWFwKCksIG5vdCAnICtcbiAgICAgICAgICAnV2Vha01hcCgpLiBUaGlzIHdpbGwgYmUgYW4gZXJyb3IgaW4gdGhlIGZ1dHVyZS4nKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbmV4dElkID0gMDtcblxuICB2YXIgT3VyV2Vha01hcCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBPdXJXZWFrTWFwKSkgeyAgLy8gYXBwcm94aW1hdGUgdGVzdCBmb3IgbmV3IC4uLigpXG4gICAgICBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZygpO1xuICAgIH1cblxuICAgIC8vIFdlIGFyZSBjdXJyZW50bHkgKDEyLzI1LzIwMTIpIG5ldmVyIGVuY291bnRlcmluZyBhbnkgcHJlbWF0dXJlbHlcbiAgICAvLyBub24tZXh0ZW5zaWJsZSBrZXlzLlxuICAgIHZhciBrZXlzID0gW107IC8vIGJydXRlIGZvcmNlIGZvciBwcmVtYXR1cmVseSBub24tZXh0ZW5zaWJsZSBrZXlzLlxuICAgIHZhciB2YWx1ZXMgPSBbXTsgLy8gYnJ1dGUgZm9yY2UgZm9yIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgIHZhciBpZCA9IG5leHRJZCsrO1xuXG4gICAgZnVuY3Rpb24gZ2V0X19fKGtleSwgb3B0X2RlZmF1bHQpIHtcbiAgICAgIHZhciBpbmRleDtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIGlmIChoaWRkZW5SZWNvcmQpIHtcbiAgICAgICAgcmV0dXJuIGlkIGluIGhpZGRlblJlY29yZCA/IGhpZGRlblJlY29yZFtpZF0gOiBvcHRfZGVmYXVsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0ga2V5cy5pbmRleE9mKGtleSk7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gdmFsdWVzW2luZGV4XSA6IG9wdF9kZWZhdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc19fXyhrZXkpIHtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIGlmIChoaWRkZW5SZWNvcmQpIHtcbiAgICAgICAgcmV0dXJuIGlkIGluIGhpZGRlblJlY29yZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrZXlzLmluZGV4T2Yoa2V5KSA+PSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldF9fXyhrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIGhpZGRlblJlY29yZFtpZF0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0ga2V5cy5pbmRleE9mKGtleSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNpbmNlIHNvbWUgYnJvd3NlcnMgcHJlZW1wdGl2ZWx5IHRlcm1pbmF0ZSBzbG93IHR1cm5zIGJ1dFxuICAgICAgICAgIC8vIHRoZW4gY29udGludWUgY29tcHV0aW5nIHdpdGggcHJlc3VtYWJseSBjb3JydXB0ZWQgaGVhcFxuICAgICAgICAgIC8vIHN0YXRlLCB3ZSBoZXJlIGRlZmVuc2l2ZWx5IGdldCBrZXlzLmxlbmd0aCBmaXJzdCBhbmQgdGhlblxuICAgICAgICAgIC8vIHVzZSBpdCB0byB1cGRhdGUgYm90aCB0aGUgdmFsdWVzIGFuZCBrZXlzIGFycmF5cywga2VlcGluZ1xuICAgICAgICAgIC8vIHRoZW0gaW4gc3luYy5cbiAgICAgICAgICBpbmRleCA9IGtleXMubGVuZ3RoO1xuICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCB2YWx1ZXMgd2lsbCBiZSBvbmUgbG9uZ2VyIHRoYW4ga2V5cy5cbiAgICAgICAgICBrZXlzW2luZGV4XSA9IGtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlX19fKGtleSkge1xuICAgICAgdmFyIGhpZGRlblJlY29yZCA9IGdldEhpZGRlblJlY29yZChrZXkpO1xuICAgICAgdmFyIGluZGV4LCBsYXN0SW5kZXg7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiBoaWRkZW5SZWNvcmQgJiYgZGVsZXRlIGhpZGRlblJlY29yZFtpZF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNpbmNlIHNvbWUgYnJvd3NlcnMgcHJlZW1wdGl2ZWx5IHRlcm1pbmF0ZSBzbG93IHR1cm5zIGJ1dFxuICAgICAgICAvLyB0aGVuIGNvbnRpbnVlIGNvbXB1dGluZyB3aXRoIHBvdGVudGlhbGx5IGNvcnJ1cHRlZCBoZWFwXG4gICAgICAgIC8vIHN0YXRlLCB3ZSBoZXJlIGRlZmVuc2l2ZWx5IGdldCBrZXlzLmxlbmd0aCBmaXJzdCBhbmQgdGhlbiB1c2VcbiAgICAgICAgLy8gaXQgdG8gdXBkYXRlIGJvdGggdGhlIGtleXMgYW5kIHRoZSB2YWx1ZXMgYXJyYXksIGtlZXBpbmdcbiAgICAgICAgLy8gdGhlbSBpbiBzeW5jLiBXZSB1cGRhdGUgdGhlIHR3byB3aXRoIGFuIG9yZGVyIG9mIGFzc2lnbm1lbnRzLFxuICAgICAgICAvLyBzdWNoIHRoYXQgYW55IHByZWZpeCBvZiB0aGVzZSBhc3NpZ25tZW50cyB3aWxsIHByZXNlcnZlIHRoZVxuICAgICAgICAvLyBrZXkvdmFsdWUgY29ycmVzcG9uZGVuY2UsIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlIGRlbGV0ZS5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgbmVlZHMgdG8gd29yayBjb3JyZWN0bHkgd2hlbiBpbmRleCA9PT0gbGFzdEluZGV4LlxuICAgICAgICBsYXN0SW5kZXggPSBrZXlzLmxlbmd0aCAtIDE7XG4gICAgICAgIGtleXNbaW5kZXhdID0gdm9pZCAwO1xuICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCB0aGVyZSdzIGEgdm9pZCAwIGluIHRoZSBrZXlzIGFycmF5LCBidXRcbiAgICAgICAgLy8gbm8gb3BlcmF0aW9uIHdpbGwgY2F1c2UgYSBcImtleXMuaW5kZXhPZih2b2lkIDApXCIsIHNpbmNlXG4gICAgICAgIC8vIGdldEhpZGRlblJlY29yZCh2b2lkIDApIHdpbGwgYWx3YXlzIHRocm93IGFuIGVycm9yIGZpcnN0LlxuICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWVzW2xhc3RJbmRleF07XG4gICAgICAgIC8vIElmIHdlIGNyYXNoIGhlcmUsIHZhbHVlc1tpbmRleF0gY2Fubm90IGJlIGZvdW5kIGhlcmUsXG4gICAgICAgIC8vIGJlY2F1c2Uga2V5c1tpbmRleF0gaXMgdm9pZCAwLlxuICAgICAgICBrZXlzW2luZGV4XSA9IGtleXNbbGFzdEluZGV4XTtcbiAgICAgICAgLy8gSWYgaW5kZXggPT09IGxhc3RJbmRleCBhbmQgd2UgY3Jhc2ggaGVyZSwgdGhlbiBrZXlzW2luZGV4XVxuICAgICAgICAvLyBpcyBzdGlsbCB2b2lkIDAsIHNpbmNlIHRoZSBhbGlhc2luZyBraWxsZWQgdGhlIHByZXZpb3VzIGtleS5cbiAgICAgICAga2V5cy5sZW5ndGggPSBsYXN0SW5kZXg7XG4gICAgICAgIC8vIElmIHdlIGNyYXNoIGhlcmUsIGtleXMgd2lsbCBiZSBvbmUgc2hvcnRlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgdmFsdWVzLmxlbmd0aCA9IGxhc3RJbmRleDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoT3VyV2Vha01hcC5wcm90b3R5cGUsIHtcbiAgICAgIGdldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGdldF9fXykgfSxcbiAgICAgIGhhc19fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGhhc19fXykgfSxcbiAgICAgIHNldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKHNldF9fXykgfSxcbiAgICAgIGRlbGV0ZV9fXzogeyB2YWx1ZTogY29uc3RGdW5jKGRlbGV0ZV9fXykgfVxuICAgIH0pO1xuICB9O1xuXG4gIE91cldlYWtNYXAucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gICAgZ2V0OiB7XG4gICAgICAvKipcbiAgICAgICAqIFJldHVybiB0aGUgdmFsdWUgbW9zdCByZWNlbnRseSBhc3NvY2lhdGVkIHdpdGgga2V5LCBvclxuICAgICAgICogb3B0X2RlZmF1bHQgaWYgbm9uZS5cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldChrZXksIG9wdF9kZWZhdWx0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9fXyhrZXksIG9wdF9kZWZhdWx0KTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBoYXM6IHtcbiAgICAgIC8qKlxuICAgICAgICogSXMgdGhlcmUgYSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGgga2V5IGluIHRoaXMgV2Vha01hcD9cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzX19fKGtleSk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgc2V0OiB7XG4gICAgICAvKipcbiAgICAgICAqIEFzc29jaWF0ZSB2YWx1ZSB3aXRoIGtleSBpbiB0aGlzIFdlYWtNYXAsIG92ZXJ3cml0aW5nIGFueVxuICAgICAgICogcHJldmlvdXMgYXNzb2NpYXRpb24gaWYgcHJlc2VudC5cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldF9fXyhrZXksIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICAnZGVsZXRlJzoge1xuICAgICAgLyoqXG4gICAgICAgKiBSZW1vdmUgYW55IGFzc29jaWF0aW9uIGZvciBrZXkgaW4gdGhpcyBXZWFrTWFwLCByZXR1cm5pbmdcbiAgICAgICAqIHdoZXRoZXIgdGhlcmUgd2FzIG9uZS5cbiAgICAgICAqXG4gICAgICAgKiA8cD5Ob3RlIHRoYXQgdGhlIGJvb2xlYW4gcmV0dXJuIGhlcmUgZG9lcyBub3Qgd29yayBsaWtlIHRoZVxuICAgICAgICoge0Bjb2RlIGRlbGV0ZX0gb3BlcmF0b3IuIFRoZSB7QGNvZGUgZGVsZXRlfSBvcGVyYXRvciByZXR1cm5zXG4gICAgICAgKiB3aGV0aGVyIHRoZSBkZWxldGlvbiBzdWNjZWVkcyBhdCBicmluZ2luZyBhYm91dCBhIHN0YXRlIGluXG4gICAgICAgKiB3aGljaCB0aGUgZGVsZXRlZCBwcm9wZXJ0eSBpcyBhYnNlbnQuIFRoZSB7QGNvZGUgZGVsZXRlfVxuICAgICAgICogb3BlcmF0b3IgdGhlcmVmb3JlIHJldHVybnMgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgd2FzIGFscmVhZHlcbiAgICAgICAqIGFic2VudCwgd2hlcmVhcyB0aGlzIHtAY29kZSBkZWxldGV9IG1ldGhvZCByZXR1cm5zIGZhbHNlIGlmXG4gICAgICAgKiB0aGUgYXNzb2NpYXRpb24gd2FzIGFscmVhZHkgYWJzZW50LlxuICAgICAgICovXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGVfX18oa2V5KTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBIb3N0V2Vha01hcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIC8vIElmIHdlIGdvdCBoZXJlLCB0aGVuIHRoZSBwbGF0Zm9ybSBoYXMgYSBXZWFrTWFwIGJ1dCB3ZSBhcmUgY29uY2VybmVkXG4gICAgICAvLyB0aGF0IGl0IG1heSByZWZ1c2UgdG8gc3RvcmUgc29tZSBrZXkgdHlwZXMuIFRoZXJlZm9yZSwgbWFrZSBhIG1hcFxuICAgICAgLy8gaW1wbGVtZW50YXRpb24gd2hpY2ggbWFrZXMgdXNlIG9mIGJvdGggYXMgcG9zc2libGUuXG5cbiAgICAgIC8vIEluIHRoaXMgbW9kZSB3ZSBhcmUgYWx3YXlzIHVzaW5nIGRvdWJsZSBtYXBzLCBzbyB3ZSBhcmUgbm90IHByb3h5LXNhZmUuXG4gICAgICAvLyBUaGlzIGNvbWJpbmF0aW9uIGRvZXMgbm90IG9jY3VyIGluIGFueSBrbm93biBicm93c2VyLCBidXQgd2UgaGFkIGJlc3RcbiAgICAgIC8vIGJlIHNhZmUuXG4gICAgICBpZiAoZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSAmJiB0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFByb3h5ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBEb3VibGVXZWFrTWFwKCkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgT3VyV2Vha01hcCkpIHsgIC8vIGFwcHJveGltYXRlIHRlc3QgZm9yIG5ldyAuLi4oKVxuICAgICAgICAgIGNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmVmZXJhYmxlLCB0cnVseSB3ZWFrIG1hcC5cbiAgICAgICAgdmFyIGhtYXAgPSBuZXcgSG9zdFdlYWtNYXAoKTtcblxuICAgICAgICAvLyBPdXIgaGlkZGVuLXByb3BlcnR5LWJhc2VkIHBzZXVkby13ZWFrLW1hcC4gTGF6aWx5IGluaXRpYWxpemVkIGluIHRoZVxuICAgICAgICAvLyAnc2V0JyBpbXBsZW1lbnRhdGlvbjsgdGh1cyB3ZSBjYW4gYXZvaWQgcGVyZm9ybWluZyBleHRyYSBsb29rdXBzIGlmXG4gICAgICAgIC8vIHdlIGtub3cgYWxsIGVudHJpZXMgYWN0dWFsbHkgc3RvcmVkIGFyZSBlbnRlcmVkIGluICdobWFwJy5cbiAgICAgICAgdmFyIG9tYXAgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gSGlkZGVuLXByb3BlcnR5IG1hcHMgYXJlIG5vdCBjb21wYXRpYmxlIHdpdGggcHJveGllcyBiZWNhdXNlIHByb3hpZXNcbiAgICAgICAgLy8gY2FuIG9ic2VydmUgdGhlIGhpZGRlbiBuYW1lIGFuZCBlaXRoZXIgYWNjaWRlbnRhbGx5IGV4cG9zZSBpdCBvciBmYWlsXG4gICAgICAgIC8vIHRvIGFsbG93IHRoZSBoaWRkZW4gcHJvcGVydHkgdG8gYmUgc2V0LiBUaGVyZWZvcmUsIHdlIGRvIG5vdCBhbGxvd1xuICAgICAgICAvLyBhcmJpdHJhcnkgV2Vha01hcHMgdG8gc3dpdGNoIHRvIHVzaW5nIGhpZGRlbiBwcm9wZXJ0aWVzLCBidXQgb25seVxuICAgICAgICAvLyB0aG9zZSB3aGljaCBuZWVkIHRoZSBhYmlsaXR5LCBhbmQgdW5wcml2aWxlZ2VkIGNvZGUgaXMgbm90IGFsbG93ZWRcbiAgICAgICAgLy8gdG8gc2V0IHRoZSBmbGFnLlxuICAgICAgICAvL1xuICAgICAgICAvLyAoRXhjZXB0IGluIGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgbW9kZSBpbiB3aGljaCBjYXNlIHdlXG4gICAgICAgIC8vIGRpc2FibGUgcHJveGllcy4pXG4gICAgICAgIHZhciBlbmFibGVTd2l0Y2hpbmcgPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiBkZ2V0KGtleSwgb3B0X2RlZmF1bHQpIHtcbiAgICAgICAgICBpZiAob21hcCkge1xuICAgICAgICAgICAgcmV0dXJuIGhtYXAuaGFzKGtleSkgPyBobWFwLmdldChrZXkpXG4gICAgICAgICAgICAgICAgOiBvbWFwLmdldF9fXyhrZXksIG9wdF9kZWZhdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhtYXAuZ2V0KGtleSwgb3B0X2RlZmF1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRoYXMoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGhtYXAuaGFzKGtleSkgfHwgKG9tYXAgPyBvbWFwLmhhc19fXyhrZXkpIDogZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRzZXQ7XG4gICAgICAgIGlmIChkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlKSB7XG4gICAgICAgICAgZHNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGhtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFobWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgIGlmICghb21hcCkgeyBvbWFwID0gbmV3IE91cldlYWtNYXAoKTsgfVxuICAgICAgICAgICAgICBvbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChlbmFibGVTd2l0Y2hpbmcpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBobWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmICghb21hcCkgeyBvbWFwID0gbmV3IE91cldlYWtNYXAoKTsgfVxuICAgICAgICAgICAgICAgIG9tYXAuc2V0X19fKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBobWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkZGVsZXRlKGtleSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSAhIWhtYXBbJ2RlbGV0ZSddKGtleSk7XG4gICAgICAgICAgaWYgKG9tYXApIHsgcmV0dXJuIG9tYXAuZGVsZXRlX19fKGtleSkgfHwgcmVzdWx0OyB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKE91cldlYWtNYXAucHJvdG90eXBlLCB7XG4gICAgICAgICAgZ2V0X19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoZGdldCkgfSxcbiAgICAgICAgICBoYXNfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhkaGFzKSB9LFxuICAgICAgICAgIHNldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGRzZXQpIH0sXG4gICAgICAgICAgZGVsZXRlX19fOiB7IHZhbHVlOiBjb25zdEZ1bmMoZGRlbGV0ZSkgfSxcbiAgICAgICAgICBwZXJtaXRIb3N0T2JqZWN0c19fXzogeyB2YWx1ZTogY29uc3RGdW5jKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICBpZiAodG9rZW4gPT09IHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cykge1xuICAgICAgICAgICAgICBlbmFibGVTd2l0Y2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdib2d1cyBjYWxsIHRvIHBlcm1pdEhvc3RPYmplY3RzX19fJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSl9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgRG91YmxlV2Vha01hcC5wcm90b3R5cGUgPSBPdXJXZWFrTWFwLnByb3RvdHlwZTtcbiAgICAgIG1vZHVsZS5leHBvcnRzID0gRG91YmxlV2Vha01hcDtcblxuICAgICAgLy8gZGVmaW5lIC5jb25zdHJ1Y3RvciB0byBoaWRlIE91cldlYWtNYXAgY3RvclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYWtNYXAucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCB7XG4gICAgICAgIHZhbHVlOiBXZWFrTWFwLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSwgIC8vIGFzIGRlZmF1bHQgLmNvbnN0cnVjdG9yIGlzXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhlcmUgaXMgbm8gaG9zdCBXZWFrTWFwLCBzbyB3ZSBtdXN0IHVzZSB0aGUgZW11bGF0aW9uLlxuXG4gICAgLy8gRW11bGF0ZWQgV2Vha01hcHMgYXJlIGluY29tcGF0aWJsZSB3aXRoIG5hdGl2ZSBwcm94aWVzIChiZWNhdXNlIHByb3hpZXNcbiAgICAvLyBjYW4gb2JzZXJ2ZSB0aGUgaGlkZGVuIG5hbWUpLCBzbyB3ZSBtdXN0IGRpc2FibGUgUHJveHkgdXNhZ2UgKGluXG4gICAgLy8gQXJyYXlMaWtlIGFuZCBEb21hZG8sIGN1cnJlbnRseSkuXG4gICAgaWYgKHR5cGVvZiBQcm94eSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIFByb3h5ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gT3VyV2Vha01hcDtcbiAgfVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=