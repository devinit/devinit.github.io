(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_scattergl_plot_js-node_modules_plotly_js_src_traces-592916"],{

/***/ "./node_modules/css-font-size-keywords/index.json":
/*!********************************************************!*\
  !*** ./node_modules/css-font-size-keywords/index.json ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('["xx-small","x-small","small","medium","large","x-large","xx-large","larger","smaller"]');

/***/ }),

/***/ "./node_modules/css-font-stretch-keywords/index.json":
/*!***********************************************************!*\
  !*** ./node_modules/css-font-stretch-keywords/index.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('["normal","condensed","semi-condensed","extra-condensed","ultra-condensed","expanded","semi-expanded","extra-expanded","ultra-expanded"]');

/***/ }),

/***/ "./node_modules/css-font-style-keywords/index.json":
/*!*********************************************************!*\
  !*** ./node_modules/css-font-style-keywords/index.json ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('["normal","italic","oblique"]');

/***/ }),

/***/ "./node_modules/css-font-weight-keywords/index.json":
/*!**********************************************************!*\
  !*** ./node_modules/css-font-weight-keywords/index.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('["normal","bold","bolder","lighter","100","200","300","400","500","600","700","800","900"]');

/***/ }),

/***/ "./node_modules/css-font/index.js":
/*!****************************************!*\
  !*** ./node_modules/css-font/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
﻿

module.exports = {
	parse: __webpack_require__(/*! ./parse */ "./node_modules/css-font/parse.js"),
	stringify: __webpack_require__(/*! ./stringify */ "./node_modules/css-font/stringify.js")
}


/***/ }),

/***/ "./node_modules/css-font/lib/util.js":
/*!*******************************************!*\
  !*** ./node_modules/css-font/lib/util.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var sizes = __webpack_require__(/*! css-font-size-keywords */ "./node_modules/css-font-size-keywords/index.json")

module.exports = {
	isSize: function isSize(value) {
		return /^[\d\.]/.test(value)
			|| value.indexOf('/') !== -1
			|| sizes.indexOf(value) !== -1
	}
}


/***/ }),

/***/ "./node_modules/css-font/parse.js":
/*!****************************************!*\
  !*** ./node_modules/css-font/parse.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var unquote = __webpack_require__(/*! unquote */ "./node_modules/unquote/index.js")
var globalKeywords = __webpack_require__(/*! css-global-keywords */ "./node_modules/css-global-keywords/index.json")
var systemFontKeywords = __webpack_require__(/*! css-system-font-keywords */ "./node_modules/css-system-font-keywords/index.json")
var fontWeightKeywords = __webpack_require__(/*! css-font-weight-keywords */ "./node_modules/css-font-weight-keywords/index.json")
var fontStyleKeywords = __webpack_require__(/*! css-font-style-keywords */ "./node_modules/css-font-style-keywords/index.json")
var fontStretchKeywords = __webpack_require__(/*! css-font-stretch-keywords */ "./node_modules/css-font-stretch-keywords/index.json")
var splitBy = __webpack_require__(/*! string-split-by */ "./node_modules/string-split-by/index.js")
var isSize = __webpack_require__(/*! ./lib/util */ "./node_modules/css-font/lib/util.js").isSize


module.exports = parseFont


var cache = parseFont.cache = {}


function parseFont (value) {
	if (typeof value !== 'string') throw new Error('Font argument must be a string.')

	if (cache[value]) return cache[value]

	if (value === '') {
		throw new Error('Cannot parse an empty string.')
	}

	if (systemFontKeywords.indexOf(value) !== -1) {
		return cache[value] = {system: value}
	}

	var font = {
		style: 'normal',
		variant: 'normal',
		weight: 'normal',
		stretch: 'normal',
		lineHeight: 'normal',
		size: '1rem',
		family: ['serif']
	}

	var tokens = splitBy(value, /\s+/)
	var token

	while (token = tokens.shift()) {
		if (globalKeywords.indexOf(token) !== -1) {
			['style', 'variant', 'weight', 'stretch'].forEach(function(prop) {
				font[prop] = token
			})

			return cache[value] = font
		}

		if (fontStyleKeywords.indexOf(token) !== -1) {
			font.style = token
			continue
		}

		if (token === 'normal' || token === 'small-caps') {
			font.variant = token
			continue
		}

		if (fontStretchKeywords.indexOf(token) !== -1) {
			font.stretch = token
			continue
		}

		if (fontWeightKeywords.indexOf(token) !== -1) {
			font.weight = token
			continue
		}


		if (isSize(token)) {
			var parts = splitBy(token, '/')
			font.size = parts[0]
			if (parts[1] != null) {
				font.lineHeight = parseLineHeight(parts[1])
			}
			else if (tokens[0] === '/') {
				tokens.shift()
				font.lineHeight = parseLineHeight(tokens.shift())
 			}

			if (!tokens.length) {
				throw new Error('Missing required font-family.')
			}
			font.family = splitBy(tokens.join(' '), /\s*,\s*/).map(unquote)

			return cache[value] = font
		}

		throw new Error('Unknown or unsupported font token: ' + token)
	}

	throw new Error('Missing required font-size.')
}


function parseLineHeight(value) {
	var parsed = parseFloat(value)
	if (parsed.toString() === value) {
		return parsed
	}
	return value
}


/***/ }),

/***/ "./node_modules/css-font/stringify.js":
/*!********************************************!*\
  !*** ./node_modules/css-font/stringify.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pick = __webpack_require__(/*! pick-by-alias */ "./node_modules/pick-by-alias/index.js")
var isSize = __webpack_require__(/*! ./lib/util */ "./node_modules/css-font/lib/util.js").isSize

var globals = a2o(__webpack_require__(/*! css-global-keywords */ "./node_modules/css-global-keywords/index.json"))
var systems = a2o(__webpack_require__(/*! css-system-font-keywords */ "./node_modules/css-system-font-keywords/index.json"))
var weights = a2o(__webpack_require__(/*! css-font-weight-keywords */ "./node_modules/css-font-weight-keywords/index.json"))
var styles = a2o(__webpack_require__(/*! css-font-style-keywords */ "./node_modules/css-font-style-keywords/index.json"))
var stretches = a2o(__webpack_require__(/*! css-font-stretch-keywords */ "./node_modules/css-font-stretch-keywords/index.json"))

var variants = {'normal': 1, 'small-caps': 1}
var fams = {
	'serif': 1,
	'sans-serif': 1,
	'monospace': 1,
	'cursive': 1,
	'fantasy': 1,
	'system-ui': 1
}

var defaults = {
	style: 'normal',
	variant: 'normal',
	weight: 'normal',
	stretch: 'normal',
	size: '1rem',
	lineHeight: 'normal',
	family: 'serif'
}

module.exports = function stringifyFont (o) {
	o = pick(o, {
		style: 'style fontstyle fontStyle font-style slope distinction',
		variant: 'variant font-variant fontVariant fontvariant var capitalization',
		weight: 'weight w font-weight fontWeight fontweight',
		stretch: 'stretch font-stretch fontStretch fontstretch width',
		size: 'size s font-size fontSize fontsize height em emSize',
		lineHeight: 'lh line-height lineHeight lineheight leading',
		family: 'font family fontFamily font-family fontfamily type typeface face',
		system: 'system reserved default global',
	})

	if (o.system) {
		if (o.system) verify(o.system, systems)
		return o.system
	}

	verify(o.style, styles)
	verify(o.variant, variants)
	verify(o.weight, weights)
	verify(o.stretch, stretches)

	// default root value is medium, but by default it's inherited
	if (o.size == null) o.size = defaults.size
	if (typeof o.size === 'number') o.size += 'px'

	if (!isSize) throw Error('Bad size value `' + o.size + '`')

	// many user-agents use serif, we don't detect that for consistency
	if (!o.family) o.family = defaults.family
	if (Array.isArray(o.family)) {
		if (!o.family.length) o.family = [defaults.family]
		o.family = o.family.map(function (f) {
			return fams[f] ? f : '"' + f + '"'
		}).join(', ')
	}

	// [ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ]
	var result = []

	result.push(o.style)
	if (o.variant !== o.style) result.push(o.variant)

	if (o.weight !== o.variant &&
		o.weight !== o.style) result.push(o.weight)

	if (o.stretch !== o.weight &&
		o.stretch !== o.variant &&
		o.stretch !== o.style) result.push(o.stretch)

	result.push(o.size + (o.lineHeight == null || o.lineHeight === 'normal' || (o.lineHeight + '' === '1')  ? '' : ('/' + o.lineHeight)))
	result.push(o.family)

	return result.filter(Boolean).join(' ')
}

function verify (value, values) {
	if (value && !values[value] && !globals[value]) throw Error('Unknown keyword `' + value +'`')

	return value
}


// ['a', 'b'] -> {a: true, b: true}
function a2o (a) {
	var o = {}
	for (var i = 0; i < a.length; i++) {
		o[a[i]] = 1
	}
	return o
}


/***/ }),

/***/ "./node_modules/css-global-keywords/index.json":
/*!*****************************************************!*\
  !*** ./node_modules/css-global-keywords/index.json ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('["inherit","initial","unset"]');

/***/ }),

/***/ "./node_modules/css-system-font-keywords/index.json":
/*!**********************************************************!*\
  !*** ./node_modules/css-system-font-keywords/index.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('["caption","icon","menu","message-box","small-caption","status-bar"]');

/***/ }),

/***/ "./node_modules/detect-kerning/index.js":
/*!**********************************************!*\
  !*** ./node_modules/detect-kerning/index.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";



module.exports = kerning


var canvas = kerning.canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')
var asciiPairs = createPairs([32, 126])

kerning.createPairs = createPairs
kerning.ascii = asciiPairs


function kerning (family, o) {
	if (Array.isArray(family)) family = family.join(', ')

	var table = {}, pairs, fs = 16, threshold = .05

	if (o) {
		if (o.length === 2 && typeof o[0] === 'number') {
			pairs = createPairs(o)
		}
		else if (Array.isArray(o)) {
			pairs = o
		}
		else {
			if (o.o) pairs = createPairs(o.o)
			else if (o.pairs) pairs = o.pairs

			if (o.fontSize) fs = o.fontSize
			if (o.threshold != null) threshold = o.threshold
		}
	}

	if (!pairs) pairs = asciiPairs

	ctx.font = fs + 'px ' + family

	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i]
		var width = ctx.measureText(pair[0]).width + ctx.measureText(pair[1]).width
		var kerningWidth = ctx.measureText(pair).width
		if (Math.abs(width - kerningWidth) > fs * threshold) {
			var emWidth = (kerningWidth - width) / fs
			table[pair] = emWidth * 1000
		}
	}

	return table
}


function createPairs (range) {
	var pairs = []

    for (var i = range[0]; i <= range[1]; i++) {
		var leftChar = String.fromCharCode(i)
		for (var j = range[0]; j < range[1]; j++) {
			var rightChar = String.fromCharCode(j)
			var pair = leftChar + rightChar

			pairs.push(pair)
		}
	}

	return pairs
}


/***/ }),

/***/ "./node_modules/font-atlas/index.js":
/*!******************************************!*\
  !*** ./node_modules/font-atlas/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var stringifyFont = __webpack_require__(/*! css-font/stringify */ "./node_modules/css-font/stringify.js")
var defaultChars = [32, 126]

module.exports = atlas

function atlas(options) {
  options = options || {}

  var shape  = options.shape ? options.shape : options.canvas ? [options.canvas.width, options.canvas.height] : [512, 512]
  var canvas = options.canvas || document.createElement('canvas')
  var font   = options.font
  var step   = typeof options.step === 'number' ? [options.step, options.step] : options.step || [32, 32]
  var chars  = options.chars || defaultChars

  if (font && typeof font !== 'string') font = stringifyFont(font)

  if (!Array.isArray(chars)) {
    chars = String(chars).split('')
  } else
  if (chars.length === 2
    && typeof chars[0] === 'number'
    && typeof chars[1] === 'number'
  ) {
    var newchars = []

    for (var i = chars[0], j = 0; i <= chars[1]; i++) {
      newchars[j++] = String.fromCharCode(i)
    }

    chars = newchars
  }

  shape = shape.slice()
  canvas.width  = shape[0]
  canvas.height = shape[1]

  var ctx = canvas.getContext('2d')

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.font = font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'

  var x = step[0] / 2
  var y = step[1] / 2
  for (var i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], x, y)
    if ((x += step[0]) > shape[0] - step[0]/2) (x = step[0]/2), (y += step[1])
  }

  return canvas
}


/***/ }),

/***/ "./node_modules/font-measure/index.js":
/*!********************************************!*\
  !*** ./node_modules/font-measure/index.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";


module.exports = measure

measure.canvas = document.createElement('canvas')
measure.cache = {}

function measure (font, o) {
	if (!o) o = {}

	if (typeof font === 'string' || Array.isArray(font)) {
		o.family = font
	}

	var family = Array.isArray(o.family) ? o.family.join(', ') : o.family
	if (!family) throw Error('`family` must be defined')

	var fs = o.size || o.fontSize || o.em || 48
	var weight = o.weight || o.fontWeight || ''
	var style = o.style || o.fontStyle || ''
	var font = [style, weight, fs].join(' ') + 'px ' + family
	var origin = o.origin || 'top'

	if (measure.cache[family]) {
		// return more precise values if cache has them
		if (fs <= measure.cache[family].em) {
			return applyOrigin(measure.cache[family], origin)
		}
	}

	var canvas = o.canvas || measure.canvas
	var ctx = canvas.getContext('2d')
	var chars = {
		upper: o.upper !== undefined ? o.upper : 'H',
		lower: o.lower !== undefined ? o.lower : 'x',
		descent: o.descent !== undefined ? o.descent : 'p',
		ascent: o.ascent !== undefined ? o.ascent : 'h',
		tittle: o.tittle !== undefined ? o.tittle : 'i',
		overshoot: o.overshoot !== undefined ? o.overshoot : 'O'
	}
	var l = Math.ceil(fs * 1.5)
	canvas.height = l
	canvas.width = l * .5
	ctx.font = font

	var char = 'H'
	var result = {
		top: 0
	}

	// measure line-height
	ctx.clearRect(0, 0, l, l)
	ctx.textBaseline = 'top'
	ctx.fillStyle = 'black'
	ctx.fillText(char, 0, 0)
	var topPx = firstTop(ctx.getImageData(0, 0, l, l))
	ctx.clearRect(0, 0, l, l)
	ctx.textBaseline = 'bottom'
	ctx.fillText(char, 0, l)
	var bottomPx = firstTop(ctx.getImageData(0, 0, l, l))
	result.lineHeight =
	result.bottom = l - bottomPx + topPx

	// measure baseline
	ctx.clearRect(0, 0, l, l)
	ctx.textBaseline = 'alphabetic'
	ctx.fillText(char, 0, l)
	var baselinePx = firstTop(ctx.getImageData(0, 0, l, l))
	var baseline = l - baselinePx - 1 + topPx
	result.baseline =
	result.alphabetic = baseline

	// measure median
	ctx.clearRect(0, 0, l, l)
	ctx.textBaseline = 'middle'
	ctx.fillText(char, 0, l * .5)
	var medianPx = firstTop(ctx.getImageData(0, 0, l, l))
	result.median =
	result.middle = l - medianPx - 1 + topPx - l * .5

	// measure hanging
	ctx.clearRect(0, 0, l, l)
	ctx.textBaseline = 'hanging'
	ctx.fillText(char, 0, l * .5)
	var hangingPx = firstTop(ctx.getImageData(0, 0, l, l))
	result.hanging = l - hangingPx - 1 + topPx - l * .5

	// measure ideographic
	ctx.clearRect(0, 0, l, l)
	ctx.textBaseline = 'ideographic'
	ctx.fillText(char, 0, l)
	var ideographicPx = firstTop(ctx.getImageData(0, 0, l, l))
	result.ideographic = l - ideographicPx - 1 + topPx

	// measure cap
	if (chars.upper) {
		ctx.clearRect(0, 0, l, l)
		ctx.textBaseline = 'top'
		ctx.fillText(chars.upper, 0, 0)
		result.upper = firstTop(ctx.getImageData(0, 0, l, l))
		result.capHeight = (result.baseline - result.upper)
	}

	// measure x
	if (chars.lower) {
		ctx.clearRect(0, 0, l, l)
		ctx.textBaseline = 'top'
		ctx.fillText(chars.lower, 0, 0)
		result.lower = firstTop(ctx.getImageData(0, 0, l, l))
		result.xHeight = (result.baseline - result.lower)
	}

	// measure tittle
	if (chars.tittle) {
		ctx.clearRect(0, 0, l, l)
		ctx.textBaseline = 'top'
		ctx.fillText(chars.tittle, 0, 0)
		result.tittle = firstTop(ctx.getImageData(0, 0, l, l))
	}

	// measure ascent
	if (chars.ascent) {
		ctx.clearRect(0, 0, l, l)
		ctx.textBaseline = 'top'
		ctx.fillText(chars.ascent, 0, 0)
		result.ascent = firstTop(ctx.getImageData(0, 0, l, l))
	}

	// measure descent
	if (chars.descent) {
		ctx.clearRect(0, 0, l, l)
		ctx.textBaseline = 'top'
		ctx.fillText(chars.descent, 0, 0)
		result.descent = firstBottom(ctx.getImageData(0, 0, l, l))
	}

	// measure overshoot
	if (chars.overshoot) {
		ctx.clearRect(0, 0, l, l)
		ctx.textBaseline = 'top'
		ctx.fillText(chars.overshoot, 0, 0)
		var overshootPx = firstBottom(ctx.getImageData(0, 0, l, l))
		result.overshoot = overshootPx - baseline
	}

	// normalize result
	for (var name in result) {
		result[name] /= fs
	}

	result.em = fs
	measure.cache[family] = result

	return applyOrigin(result, origin)
}

function applyOrigin(obj, origin) {
	var res = {}
	if (typeof origin === 'string') origin = obj[origin]
	for (var name in obj) {
		if (name === 'em') continue
		res[name] = obj[name] - origin
	}
	return res
}

function firstTop(iData) {
	var l = iData.height
	var data = iData.data
	for (var i = 3; i < data.length; i+=4) {
		if (data[i] !== 0) {
			return Math.floor((i - 3) *.25 / l)
		}
	}
}

function firstBottom(iData) {
	var l = iData.height
	var data = iData.data
	for (var i = data.length - 1; i > 0; i -= 4) {
		if (data[i] !== 0) {
			return Math.floor((i - 3) *.25 / l)
		}
	}
}


/***/ }),

/***/ "./node_modules/gl-text/dist.js":
/*!**************************************!*\
  !*** ./node_modules/gl-text/dist.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Font = __webpack_require__(/*! css-font */ "./node_modules/css-font/index.js")
var pick = __webpack_require__(/*! pick-by-alias */ "./node_modules/pick-by-alias/index.js")
var createRegl = __webpack_require__(/*! regl */ "./node_modules/regl/dist/regl.js")
var createGl = __webpack_require__(/*! gl-util/context */ "./node_modules/gl-util/context.js")
var WeakMap = __webpack_require__(/*! es6-weak-map */ "./node_modules/es6-weak-map/index.js")
var rgba = __webpack_require__(/*! color-normalize */ "./node_modules/color-normalize/index.js")
var fontAtlas = __webpack_require__(/*! font-atlas */ "./node_modules/font-atlas/index.js")
var pool = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var parseRect = __webpack_require__(/*! parse-rect */ "./node_modules/parse-rect/index.js")
var isObj = __webpack_require__(/*! is-plain-obj */ "./node_modules/is-plain-obj/index.js")
var parseUnit = __webpack_require__(/*! parse-unit */ "./node_modules/parse-unit/index.js")
var px = __webpack_require__(/*! to-px */ "./node_modules/to-px/topx.js")
var kerning = __webpack_require__(/*! detect-kerning */ "./node_modules/detect-kerning/index.js")
var extend = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js")
var metrics = __webpack_require__(/*! font-measure */ "./node_modules/font-measure/index.js")
var flatten = __webpack_require__(/*! flatten-vertex-data */ "./node_modules/flatten-vertex-data/index.js")
var ref = __webpack_require__(/*! bit-twiddle */ "./node_modules/bit-twiddle/twiddle.js");
var nextPow2 = ref.nextPow2;

var shaderCache = new WeakMap


// Safari does not support font-stretch
var isStretchSupported = false
if (document.body) {
    var el = document.body.appendChild(document.createElement('div'))
    el.style.font = 'italic small-caps bold condensed 16px/2 cursive'
    if (getComputedStyle(el).fontStretch) {
        isStretchSupported = true
    }
    document.body.removeChild(el)
}

var GlText = function GlText (o) {
	if (isRegl(o)) {
		o = {regl: o}
		this.gl = o.regl._gl
	}
	else {
		this.gl = createGl(o)
	}

	this.shader = shaderCache.get(this.gl)

	if (!this.shader) {
		this.regl = o.regl || createRegl({ gl: this.gl })
	}
	else {
		this.regl = this.shader.regl
	}

	this.charBuffer = this.regl.buffer({ type: 'uint8', usage: 'stream' })
	this.sizeBuffer = this.regl.buffer({ type: 'float', usage: 'stream' })

	if (!this.shader) {
		this.shader = this.createShader()
		shaderCache.set(this.gl, this.shader)
	}

	this.batch = []

	// multiple options initial state
	this.fontSize = []
	this.font = []
	this.fontAtlas = []

	this.draw = this.shader.draw.bind(this)
	this.render = function () {
		// FIXME: add Safari regl report here:
		// charBuffer and width just do not trigger
		this.regl._refresh()
		this.draw(this.batch)
	}
	this.canvas = this.gl.canvas

	this.update(isObj(o) ? o : {})
};

GlText.prototype.createShader = function createShader () {
	var regl = this.regl

	// FIXME: store 2 shader versions: with normal viewport and without
	// draw texture method
	var draw = regl({
		blend: {
			enable: true,
			color: [0,0,0,1],

			func: {
				srcRGB: 'src alpha',
				dstRGB: 'one minus src alpha',
				srcAlpha: 'one minus dst alpha',
				dstAlpha: 'one'
			}
		},
		stencil: {enable: false},
		depth: {enable: false},

		count: regl.prop('count'),
		offset: regl.prop('offset'),
		attributes: {
			charOffset: {
				offset: 4,
				stride: 8,
				buffer: regl.this('sizeBuffer')
			},
			width: {
				offset: 0,
				stride: 8,
				buffer: regl.this('sizeBuffer')
			},
			char: regl.this('charBuffer'),
			position: regl.this('position')
		},
		uniforms: {
			atlasSize: function (c, p) { return [p.atlas.width, p.atlas.height]; },
			atlasDim: function (c, p) { return [p.atlas.cols, p.atlas.rows]; },
			atlas: function (c, p) { return p.atlas.texture; },
			charStep: function (c, p) { return p.atlas.step; },
			em: function (c, p) { return p.atlas.em; },
			color: regl.prop('color'),
			opacity: regl.prop('opacity'),
			viewport: regl.this('viewportArray'),
			scale: regl.this('scale'),
			align: regl.prop('align'),
			baseline: regl.prop('baseline'),
			translate: regl.this('translate'),
			positionOffset: regl.prop('positionOffset')
		},
		primitive: 'points',
		viewport: regl.this('viewport'),

		vert: ("\n\t\t\tprecision highp float;\n\t\t\tattribute float width, charOffset, char;\n\t\t\tattribute vec2 position;\n\t\t\tuniform float fontSize, charStep, em, align, baseline;\n\t\t\tuniform vec4 viewport;\n\t\t\tuniform vec4 color;\n\t\t\tuniform vec2 atlasSize, atlasDim, scale, translate, positionOffset;\n\t\t\tvarying vec2 charCoord, charId;\n\t\t\tvarying float charWidth;\n\t\t\tvarying vec4 fontColor;\n\t\t\tvoid main () {\n\t\t\t\t" + (!GlText.normalViewport ? 'vec2 positionOffset = vec2(positionOffset.x,- positionOffset.y);' : '') + "\n\n\t\t\t\tvec2 offset = floor(em * (vec2(align + charOffset, baseline)\n\t\t\t\t\t+ positionOffset))\n\t\t\t\t\t/ (viewport.zw * scale.xy);\n\n\t\t\t\tvec2 position = (position + translate) * scale;\n\t\t\t\tposition += offset * scale;\n\n\t\t\t\t" + (GlText.normalViewport ? 'position.y = 1. - position.y;' : '') + "\n\n\t\t\t\tcharCoord = position * viewport.zw + viewport.xy;\n\n\t\t\t\tgl_Position = vec4(position * 2. - 1., 0, 1);\n\n\t\t\t\tgl_PointSize = charStep;\n\n\t\t\t\tcharId.x = mod(char, atlasDim.x);\n\t\t\t\tcharId.y = floor(char / atlasDim.x);\n\n\t\t\t\tcharWidth = width * em;\n\n\t\t\t\tfontColor = color / 255.;\n\t\t\t}"),

		frag: "\n\t\t\tprecision highp float;\n\t\t\tuniform sampler2D atlas;\n\t\t\tuniform float fontSize, charStep, opacity;\n\t\t\tuniform vec2 atlasSize;\n\t\t\tuniform vec4 viewport;\n\t\t\tvarying vec4 fontColor;\n\t\t\tvarying vec2 charCoord, charId;\n\t\t\tvarying float charWidth;\n\n\t\t\tfloat lightness(vec4 color) {\n\t\t\t\treturn color.r * 0.299 + color.g * 0.587 + color.b * 0.114;\n\t\t\t}\n\n\t\t\tvoid main () {\n\t\t\t\tvec2 uv = gl_FragCoord.xy - charCoord + charStep * .5;\n\t\t\t\tfloat halfCharStep = floor(charStep * .5 + .5);\n\n\t\t\t\t// invert y and shift by 1px (FF expecially needs that)\n\t\t\t\tuv.y = charStep - uv.y;\n\n\t\t\t\t// ignore points outside of character bounding box\n\t\t\t\tfloat halfCharWidth = ceil(charWidth * .5);\n\t\t\t\tif (floor(uv.x) > halfCharStep + halfCharWidth ||\n\t\t\t\t\tfloor(uv.x) < halfCharStep - halfCharWidth) return;\n\n\t\t\t\tuv += charId * charStep;\n\t\t\t\tuv = uv / atlasSize;\n\n\t\t\t\tvec4 color = fontColor;\n\t\t\t\tvec4 mask = texture2D(atlas, uv);\n\n\t\t\t\tfloat maskY = lightness(mask);\n\t\t\t\t// float colorY = lightness(color);\n\t\t\t\tcolor.a *= maskY;\n\t\t\t\tcolor.a *= opacity;\n\n\t\t\t\t// color.a += .1;\n\n\t\t\t\t// antialiasing, see yiq color space y-channel formula\n\t\t\t\t// color.rgb += (1. - color.rgb) * (1. - mask.rgb);\n\n\t\t\t\tgl_FragColor = color;\n\t\t\t}"
	})

	// per font-size atlas
	var atlas = {}

	return { regl: regl, draw: draw, atlas: atlas }
};

GlText.prototype.update = function update (o) {
		var this$1 = this;

	if (typeof o === 'string') { o = { text: o } }
	else if (!o) { return }

	// FIXME: make this a static transform or more general approact
	o = pick(o, {
		position: 'position positions coord coords coordinates',
		font: 'font fontFace fontface typeface cssFont css-font family fontFamily',
		fontSize: 'fontSize fontsize size font-size',
		text: 'text texts chars characters value values symbols',
		align: 'align alignment textAlign textbaseline',
		baseline: 'baseline textBaseline textbaseline',
		direction: 'dir direction textDirection',
		color: 'color colour fill fill-color fillColor textColor textcolor',
		kerning: 'kerning kern',
		range: 'range dataBox',
		viewport: 'vp viewport viewBox viewbox viewPort',
		opacity: 'opacity alpha transparency visible visibility opaque',
		offset: 'offset positionOffset padding shift indent indentation'
	}, true)


	if (o.opacity != null) {
		if (Array.isArray(o.opacity)) {
			this.opacity = o.opacity.map(function (o) { return parseFloat(o); })
		}
		else {
			this.opacity = parseFloat(o.opacity)
		}
	}

	if (o.viewport != null) {
		this.viewport = parseRect(o.viewport)

		if (GlText.normalViewport) {
			this.viewport.y = this.canvas.height - this.viewport.y - this.viewport.height
		}

		this.viewportArray = [this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height]

	}
	if (this.viewport == null) {
		this.viewport = {
			x: 0, y: 0,
			width: this.gl.drawingBufferWidth,
			height: this.gl.drawingBufferHeight
		}
		this.viewportArray = [this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height]
	}

	if (o.kerning != null) { this.kerning = o.kerning }

	if (o.offset != null) {
		if (typeof o.offset === 'number') { o.offset = [o.offset, 0] }

		this.positionOffset = flatten(o.offset)
	}

	if (o.direction) { this.direction = o.direction }

	if (o.range) {
		this.range = o.range
		this.scale = [1 / (o.range[2] - o.range[0]), 1 / (o.range[3] - o.range[1])]
		this.translate = [-o.range[0], -o.range[1]]
	}
	if (o.scale) { this.scale = o.scale }
	if (o.translate) { this.translate = o.translate }

	// default scale corresponds to viewport
	if (!this.scale) { this.scale = [1 / this.viewport.width, 1 / this.viewport.height] }

	if (!this.translate) { this.translate = [0, 0] }

	if (!this.font.length && !o.font) { o.font = GlText.baseFontSize + 'px sans-serif' }

	// normalize font caching string
	var newFont = false, newFontSize = false

	// obtain new font data
	if (o.font) {
		(Array.isArray(o.font) ? o.font : [o.font]).forEach(function (font, i) {
			// normalize font
			if (typeof font === 'string') {
				try {
					font = Font.parse(font)
				} catch (e) {
					font = Font.parse(GlText.baseFontSize + 'px ' + font)
				}
			}
			else { font = Font.parse(Font.stringify(font)) }

			var baseString = Font.stringify({
				size: GlText.baseFontSize,
				family: font.family,
				stretch: isStretchSupported ? font.stretch : undefined,
				variant: font.variant,
				weight: font.weight,
				style: font.style
			})

			var unit = parseUnit(font.size)
			var fs = Math.round(unit[0] * px(unit[1]))
			if (fs !== this$1.fontSize[i]) {
				newFontSize = true
				this$1.fontSize[i] = fs
			}

			// calc new font metrics/atlas
			if (!this$1.font[i] || baseString != this$1.font[i].baseString) {
				newFont = true

				// obtain font cache or create one
				this$1.font[i] = GlText.fonts[baseString]
				if (!this$1.font[i]) {
					var family = font.family.join(', ')
					var style = [font.style]
					if (font.style != font.variant) { style.push(font.variant) }
					if (font.variant != font.weight) { style.push(font.weight) }
					if (isStretchSupported && font.weight != font.stretch) { style.push(font.stretch) }

					this$1.font[i] = {
						baseString: baseString,

						// typeface
						family: family,
						weight: font.weight,
						stretch: font.stretch,
						style: font.style,
						variant: font.variant,

						// widths of characters
						width: {},

						// kernin pairs offsets
						kerning: {},

						metrics: metrics(family, {
							origin: 'top',
							fontSize: GlText.baseFontSize,
							fontStyle: style.join(' ')
						})
					}

					GlText.fonts[baseString] = this$1.font[i]
				}
			}
		})
	}

	// FIXME: make independend font-size
	// if (o.fontSize) {
	// let unit = parseUnit(o.fontSize)
	// let fs = Math.round(unit[0] * px(unit[1]))

	// if (fs != this.fontSize) {
	// 	newFontSize = true
	// 	this.fontSize = fs
	// }
	// }

	if (newFont || newFontSize) {
		this.font.forEach(function (font, i) {
			var fontString = Font.stringify({
				size: this$1.fontSize[i],
				family: font.family,
				stretch: isStretchSupported ? font.stretch : undefined,
				variant: font.variant,
				weight: font.weight,
				style: font.style
			})

			// calc new font size atlas
			this$1.fontAtlas[i] = this$1.shader.atlas[fontString]

			if (!this$1.fontAtlas[i]) {
				var metrics = font.metrics

				this$1.shader.atlas[fontString] =
				this$1.fontAtlas[i] = {
					fontString: fontString,
					// even step is better for rendered characters
					step: Math.ceil(this$1.fontSize[i] * metrics.bottom * .5) * 2,
					em: this$1.fontSize[i],
					cols: 0,
					rows: 0,
					height: 0,
					width: 0,
					chars: [],
					ids: {},
					texture: this$1.regl.texture()
				}
			}

			// bump atlas characters
			if (o.text == null) { o.text = this$1.text }
		})
	}

	// if multiple positions - duplicate text arguments
	// FIXME: this possibly can be done better to avoid array spawn
	if (typeof o.text === 'string' && o.position && o.position.length > 2) {
		var textArray = Array(o.position.length * .5)
		for (var i = 0; i < textArray.length; i++) {
			textArray[i] = o.text
		}
		o.text = textArray
	}

	// calculate offsets for the new font/text
	var newAtlasChars
	if (o.text != null || newFont) {
		// FIXME: ignore spaces
		// text offsets within the text buffer
		this.textOffsets = [0]

		if (Array.isArray(o.text)) {
			this.count = o.text[0].length
			this.counts = [this.count]
			for (var i$1 = 1; i$1 < o.text.length; i$1++) {
				this.textOffsets[i$1] = this.textOffsets[i$1 - 1] + o.text[i$1 - 1].length
				this.count += o.text[i$1].length
				this.counts.push(o.text[i$1].length)
			}
			this.text = o.text.join('')
		}
		else {
			this.text = o.text
			this.count = this.text.length
			this.counts = [this.count]
		}

		newAtlasChars = []

		// detect & measure new characters
		this.font.forEach(function (font, idx) {
			GlText.atlasContext.font = font.baseString

			var atlas = this$1.fontAtlas[idx]

			for (var i = 0; i < this$1.text.length; i++) {
				var char = this$1.text.charAt(i)

				if (atlas.ids[char] == null) {
					atlas.ids[char] = atlas.chars.length
					atlas.chars.push(char)
					newAtlasChars.push(char)
				}

				if (font.width[char] == null) {
					font.width[char] = GlText.atlasContext.measureText(char).width / GlText.baseFontSize

					// measure kerning pairs for the new character
					if (this$1.kerning) {
						var pairs = []
						for (var baseChar in font.width) {
							pairs.push(baseChar + char, char + baseChar)
						}
						extend(font.kerning, kerning(font.family, {
							pairs: pairs
						}))
					}
				}
			}
		})
	}

	// create single position buffer (faster than batch or multiple separate instances)
	if (o.position) {
		if (o.position.length > 2) {
			var flat = !o.position[0].length
			var positionData = pool.mallocFloat(this.count * 2)
			for (var i$2 = 0, ptr = 0; i$2 < this.counts.length; i$2++) {
				var count = this.counts[i$2]
				if (flat) {
					for (var j = 0; j < count; j++) {
						positionData[ptr++] = o.position[i$2 * 2]
						positionData[ptr++] = o.position[i$2 * 2 + 1]
					}
				}
				else {
					for (var j$1 = 0; j$1 < count; j$1++) {
						positionData[ptr++] = o.position[i$2][0]
						positionData[ptr++] = o.position[i$2][1]
					}
				}
			}
			if (this.position.call) {
				this.position({
					type: 'float',
					data: positionData
				})
			} else {
				this.position = this.regl.buffer({
					type: 'float',
					data: positionData
				})
			}
			pool.freeFloat(positionData)
		}
		else {
			if (this.position.destroy) { this.position.destroy() }
			this.position = {
				constant: o.position
			}
		}
	}

	// populate text/offset buffers if font/text has changed
	// as [charWidth, offset, charWidth, offset...]
	// that is in em units since font-size can change often
	if (o.text || newFont) {
		var charIds = pool.mallocUint8(this.count)
		var sizeData = pool.mallocFloat(this.count * 2)
		this.textWidth = []

		for (var i$3 = 0, ptr$1 = 0; i$3 < this.counts.length; i$3++) {
			var count$1 = this.counts[i$3]
			var font = this.font[i$3] || this.font[0]
			var atlas = this.fontAtlas[i$3] || this.fontAtlas[0]

			for (var j$2 = 0; j$2 < count$1; j$2++) {
				var char = this.text.charAt(ptr$1)
				var prevChar = this.text.charAt(ptr$1 - 1)

				charIds[ptr$1] = atlas.ids[char]
				sizeData[ptr$1 * 2] = font.width[char]

				if (j$2) {
					var prevWidth = sizeData[ptr$1 * 2 - 2]
					var currWidth = sizeData[ptr$1 * 2]
					var prevOffset = sizeData[ptr$1 * 2 - 1]
					var offset = prevOffset + prevWidth * .5 + currWidth * .5;

					if (this.kerning) {
						var kerning$1 = font.kerning[prevChar + char]
						if (kerning$1) {
							offset += kerning$1 * 1e-3
						}
					}

					sizeData[ptr$1 * 2 + 1] = offset
				}
				else {
					sizeData[ptr$1 * 2 + 1] = sizeData[ptr$1 * 2] * .5
				}

				ptr$1++
			}
			this.textWidth.push(
				!sizeData.length ? 0 :
				// last offset + half last width
				sizeData[ptr$1 * 2 - 2] * .5 + sizeData[ptr$1 * 2 - 1]
			)
		}


		// bump recalc align offset
		if (!o.align) { o.align = this.align }
		this.charBuffer({data: charIds, type: 'uint8', usage: 'stream'})
		this.sizeBuffer({data: sizeData, type: 'float', usage: 'stream'})
		pool.freeUint8(charIds)
		pool.freeFloat(sizeData)

		// udpate font atlas and texture
		if (newAtlasChars.length) {
			this.font.forEach(function (font, i) {
				var atlas = this$1.fontAtlas[i]

				// FIXME: insert metrics-based ratio here
				var step = atlas.step

				var maxCols = Math.floor(GlText.maxAtlasSize / step)
				var cols = Math.min(maxCols, atlas.chars.length)
				var rows = Math.ceil(atlas.chars.length / cols)

				var atlasWidth = nextPow2( cols * step )
				// let atlasHeight = Math.min(rows * step + step * .5, GlText.maxAtlasSize);
				var atlasHeight = nextPow2( rows * step );

				atlas.width = atlasWidth
				atlas.height = atlasHeight;
				atlas.rows = rows
				atlas.cols = cols

				if (!atlas.em) { return }

				atlas.texture({
					data: fontAtlas({
						canvas: GlText.atlasCanvas,
						font: atlas.fontString,
						chars: atlas.chars,
						shape: [atlasWidth, atlasHeight],
						step: [step, step]
					})
				})

			})
		}
	}

	if (o.align) {
		this.align = o.align
		this.alignOffset = this.textWidth.map(function (textWidth, i) {
			var align = !Array.isArray(this$1.align) ? this$1.align : this$1.align.length > 1 ? this$1.align[i] : this$1.align[0]

			if (typeof align === 'number') { return align }
			switch (align) {
				case 'right':
				case 'end':
					return -textWidth
				case 'center':
				case 'centre':
				case 'middle':
					return -textWidth * .5
			}

			return 0
		})
	}

	if (this.baseline == null && o.baseline == null) {
		o.baseline = 0
	}
	if (o.baseline != null) {
		this.baseline = o.baseline
		if (!Array.isArray(this.baseline)) { this.baseline = [this.baseline] }
		this.baselineOffset = this.baseline.map(function (baseline, i) {
			var m = (this$1.font[i] || this$1.font[0]).metrics
			var base = 0

			base += m.bottom * .5

			if (typeof baseline === 'number') {
				base += (baseline - m.baseline)
			}
			else {
				base += -m[baseline]
			}

			if (!GlText.normalViewport) { base *= -1 }
			return base
		})
	}

	// flatten colors to a single uint8 array
	if (o.color != null) {
		if (!o.color) { o.color = 'transparent' }

		// single color
		if (typeof o.color === 'string' || !isNaN(o.color)) {
			this.color = rgba(o.color, 'uint8')
		}
		// array
		else {
			var colorData

			// flat array
			if (typeof o.color[0] === 'number' && o.color.length > this.counts.length) {
				var l = o.color.length
				colorData = pool.mallocUint8(l)
				var sub = (o.color.subarray || o.color.slice).bind(o.color)
				for (var i$4 = 0; i$4 < l; i$4 += 4) {
					colorData.set(rgba(sub(i$4, i$4 + 4), 'uint8'), i$4)
				}
			}
			// nested array
			else {
				var l$1 = o.color.length
				colorData = pool.mallocUint8(l$1 * 4)
				for (var i$5 = 0; i$5 < l$1; i$5++) {
					colorData.set(rgba(o.color[i$5] || 0, 'uint8'), i$5 * 4)
				}
			}

			this.color = colorData
		}
	}

	// update render batch
	if (o.position || o.text || o.color || o.baseline || o.align || o.font || o.offset || o.opacity) {
		var isBatch = (this.color.length > 4)
			|| (this.baselineOffset.length > 1)
			|| (this.align && this.align.length > 1)
			|| (this.fontAtlas.length > 1)
			|| (this.positionOffset.length > 2)
		if (isBatch) {
			var length = Math.max(
				this.position.length * .5 || 0,
				this.color.length * .25 || 0,
				this.baselineOffset.length || 0,
				this.alignOffset.length || 0,
				this.font.length || 0,
				this.opacity.length || 0,
				this.positionOffset.length * .5 || 0
			)
			this.batch = Array(length)
			for (var i$6 = 0; i$6 < this.batch.length; i$6++) {
				this.batch[i$6] = {
					count: this.counts.length > 1 ? this.counts[i$6] : this.counts[0],
					offset: this.textOffsets.length > 1 ? this.textOffsets[i$6] : this.textOffsets[0],
					color: !this.color ? [0,0,0,255] : this.color.length <= 4 ? this.color : this.color.subarray(i$6 * 4, i$6 * 4 + 4),
					opacity: Array.isArray(this.opacity) ? this.opacity[i$6] : this.opacity,
					baseline: this.baselineOffset[i$6] != null ? this.baselineOffset[i$6] : this.baselineOffset[0],
					align: !this.align ? 0 : this.alignOffset[i$6] != null ? this.alignOffset[i$6] : this.alignOffset[0],
					atlas: this.fontAtlas[i$6] || this.fontAtlas[0],
					positionOffset: this.positionOffset.length > 2 ? this.positionOffset.subarray(i$6 * 2, i$6 * 2 + 2) : this.positionOffset
				}
			}
		}
		// single-color, single-baseline, single-align batch is faster to render
		else {
			if (this.count) {
				this.batch = [{
					count: this.count,
					offset: 0,
					color: this.color || [0,0,0,255],
					opacity: Array.isArray(this.opacity) ? this.opacity[0] : this.opacity,
					baseline: this.baselineOffset[0],
					align: this.alignOffset ? this.alignOffset[0] : 0,
					atlas: this.fontAtlas[0],
					positionOffset: this.positionOffset
				}]
			}
			else {
				this.batch = []
			}
		}
	}
};

GlText.prototype.destroy = function destroy () {
	// TODO: count instances of atlases and destroy all on null
};


// defaults
GlText.prototype.kerning = true
GlText.prototype.position = { constant: new Float32Array(2) }
GlText.prototype.translate = null
GlText.prototype.scale = null
GlText.prototype.font = null
GlText.prototype.text = ''
GlText.prototype.positionOffset = [0, 0]
GlText.prototype.opacity = 1
GlText.prototype.color = new Uint8Array([0, 0, 0, 255])
GlText.prototype.alignOffset = [0, 0]


// whether viewport should be top↓bottom 2d one (true) or webgl one (false)
GlText.normalViewport = false

// size of an atlas
GlText.maxAtlasSize = 1024

// font atlas canvas is singleton
GlText.atlasCanvas = document.createElement('canvas')
GlText.atlasContext = GlText.atlasCanvas.getContext('2d', {alpha: false})

// font-size used for metrics, atlas step calculation
GlText.baseFontSize = 64

// fonts storage
GlText.fonts = {}

// max number of different font atlases/textures cached
// FIXME: enable atlas size limitation via LRU
// GlText.atlasCacheSize = 64

function isRegl (o) {
	return typeof o === 'function' &&
	o._gl &&
	o.prop &&
	o.texture &&
	o.buffer
}


module.exports = GlText



/***/ }),

/***/ "./node_modules/gl-util/context.js":
/*!*****************************************!*\
  !*** ./node_modules/gl-util/context.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/** @module  gl-util/context */


var pick = __webpack_require__(/*! pick-by-alias */ "./node_modules/pick-by-alias/index.js")

module.exports = function setContext (o) {
	if (!o) o = {}
	else if (typeof o === 'string') o = {container: o}

	// HTMLCanvasElement
	if (isCanvas(o)) {
		o = {container: o}
	}
	// HTMLElement
	else if (isElement(o)) {
		o = {container: o}
	}
	// WebGLContext
	else if (isContext(o)) {
		o = {gl: o}
	}
	// options object
	else {
		o = pick(o, {
			container: 'container target element el canvas holder parent parentNode wrapper use ref root node',
			gl: 'gl context webgl glContext',
			attrs: 'attributes attrs contextAttributes',
			pixelRatio: 'pixelRatio pxRatio px ratio pxratio pixelratio',
			width: 'w width',
			height: 'h height'
		}, true)
	}

	if (!o.pixelRatio) o.pixelRatio = __webpack_require__.g.pixelRatio || 1

	// make sure there is container and canvas
	if (o.gl) {
		return o.gl
	}
	if (o.canvas) {
		o.container = o.canvas.parentNode
	}
	if (o.container) {
		if (typeof o.container === 'string') {
			var c = document.querySelector(o.container)
			if (!c) throw Error('Element ' + o.container + ' is not found')
			o.container = c
		}
		if (isCanvas(o.container)) {
			o.canvas = o.container
			o.container = o.canvas.parentNode
		}
		else if (!o.canvas) {
			o.canvas = createCanvas()
			o.container.appendChild(o.canvas)
			resize(o)
		}
	}
	// blank new canvas
	else if (!o.canvas) {
		if (typeof document !== 'undefined') {
			o.container = document.body || document.documentElement
			o.canvas = createCanvas()
			o.container.appendChild(o.canvas)
			resize(o)
		}
		else {
			throw Error('Not DOM environment. Use headless-gl.')
		}
	}

	// make sure there is context
	if (!o.gl) {
		['webgl', 'experimental-webgl', 'webgl-experimental'].some(function (c) {
			try {
				o.gl = o.canvas.getContext(c, o.attrs);
			} catch (e) { /* no-op */ }
			return o.gl;
		});
	}

	return o.gl
}


function resize (o) {
	if (o.container) {
		if (o.container == document.body) {
			if (!document.body.style.width) o.canvas.width = o.width || (o.pixelRatio * __webpack_require__.g.innerWidth)
			if (!document.body.style.height) o.canvas.height = o.height || (o.pixelRatio * __webpack_require__.g.innerHeight)
		}
		else {
			var bounds = o.container.getBoundingClientRect()
			o.canvas.width = o.width || (bounds.right - bounds.left)
			o.canvas.height = o.height || (bounds.bottom - bounds.top)
		}
	}
}

function isCanvas (e) {
	return typeof e.getContext === 'function'
		&& 'width' in e
		&& 'height' in e
}

function isElement (e) {
	return typeof e.nodeName === 'string' &&
		typeof e.appendChild === 'function' &&
		typeof e.getBoundingClientRect === 'function'
}

function isContext (e) {
	return typeof e.drawArrays === 'function' ||
		typeof e.drawElements === 'function'
}

function createCanvas () {
	var canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.style.top = 0
	canvas.style.left = 0

	return canvas
}


/***/ }),

/***/ "./node_modules/parenthesis/index.js":
/*!*******************************************!*\
  !*** ./node_modules/parenthesis/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/**
 * @module parenthesis
 */

function parse (str, opts) {
	// pretend non-string parsed per-se
	if (typeof str !== 'string') return [str]

	var res = [str]

	if (typeof opts === 'string' || Array.isArray(opts)) {
		opts = {brackets: opts}
	}
	else if (!opts) opts = {}

	var brackets = opts.brackets ? (Array.isArray(opts.brackets) ? opts.brackets : [opts.brackets]) : ['{}', '[]', '()']

	var escape = opts.escape || '___'

	var flat = !!opts.flat

	brackets.forEach(function (bracket) {
		// create parenthesis regex
		var pRE = new RegExp(['\\', bracket[0], '[^\\', bracket[0], '\\', bracket[1], ']*\\', bracket[1]].join(''))

		var ids = []

		function replaceToken(token, idx, str){
			// save token to res
			var refId = res.push(token.slice(bracket[0].length, -bracket[1].length)) - 1

			ids.push(refId)

			return escape + refId + escape
		}

		res.forEach(function (str, i) {
			var prevStr

			// replace paren tokens till there’s none
			var a = 0
			while (str != prevStr) {
				prevStr = str
				str = str.replace(pRE, replaceToken)
				if (a++ > 10e3) throw Error('References have circular dependency. Please, check them.')
			}

			res[i] = str
		})

		// wrap found refs to brackets
		ids = ids.reverse()
		res = res.map(function (str) {
			ids.forEach(function (id) {
				str = str.replace(new RegExp('(\\' + escape + id + '\\' + escape + ')', 'g'), bracket[0] + '$1' + bracket[1])
			})
			return str
		})
	})

	var re = new RegExp('\\' + escape + '([0-9]+)' + '\\' + escape)

	// transform references to tree
	function nest (str, refs, escape) {
		var res = [], match

		var a = 0
		while (match = re.exec(str)) {
			if (a++ > 10e3) throw Error('Circular references in parenthesis')

			res.push(str.slice(0, match.index))

			res.push(nest(refs[match[1]], refs))

			str = str.slice(match.index + match[0].length)
		}

		res.push(str)

		return res
	}

	return flat ? res : nest(res[0], res)
}

function stringify (arg, opts) {
	if (opts && opts.flat) {
		var escape = opts && opts.escape || '___'

		var str = arg[0], prevStr

		// pretend bad string stringified with no parentheses
		if (!str) return ''


		var re = new RegExp('\\' + escape + '([0-9]+)' + '\\' + escape)

		var a = 0
		while (str != prevStr) {
			if (a++ > 10e3) throw Error('Circular references in ' + arg)
			prevStr = str
			str = str.replace(re, replaceRef)
		}

		return str
	}

	return arg.reduce(function f (prev, curr) {
		if (Array.isArray(curr)) {
			curr = curr.reduce(f, '')
		}
		return prev + curr
	}, '')

	function replaceRef(match, idx){
		if (arg[idx] == null) throw Error('Reference ' + idx + 'is undefined')
		return arg[idx]
	}
}

function parenthesis (arg, opts) {
	if (Array.isArray(arg)) {
		return stringify(arg, opts)
	}
	else {
		return parse(arg, opts)
	}
}

parenthesis.parse = parse
parenthesis.stringify = stringify

module.exports = parenthesis


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/edit_style.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/edit_style.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var DESELECTDIM = __webpack_require__(/*! ../../constants/interactions */ "./node_modules/plotly.js/src/constants/interactions.js").DESELECTDIM;

function styleTextSelection(cd) {
    var cd0 = cd[0];
    var trace = cd0.trace;
    var stash = cd0.t;
    var scene = stash._scene;
    var index = stash.index;
    var els = scene.selectBatch[index];
    var unels = scene.unselectBatch[index];
    var baseOpts = scene.textOptions[index];
    var selOpts = scene.textSelectedOptions[index] || {};
    var unselOpts = scene.textUnselectedOptions[index] || {};
    var opts = Lib.extendFlat({}, baseOpts);
    var i, j;

    if(els.length || unels.length) {
        var stc = selOpts.color;
        var utc = unselOpts.color;
        var base = baseOpts.color;
        var hasArrayBase = Array.isArray(base);
        opts.color = new Array(trace._length);

        for(i = 0; i < els.length; i++) {
            j = els[i];
            opts.color[j] = stc || (hasArrayBase ? base[j] : base);
        }
        for(i = 0; i < unels.length; i++) {
            j = unels[i];
            var basej = hasArrayBase ? base[j] : base;
            opts.color[j] = utc ? utc :
                stc ? basej : Color.addOpacity(basej, DESELECTDIM);
        }
    }

    scene.glText[index].update(opts);
}

module.exports = {
    styleTextSelection: styleTextSelection
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/plot.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/plot.js ***!
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



var createScatter = __webpack_require__(/*! regl-scatter2d */ "./node_modules/regl-scatter2d/bundle.js");
var createLine = __webpack_require__(/*! regl-line2d */ "./node_modules/regl-line2d/index.js");
var createError = __webpack_require__(/*! regl-error2d */ "./node_modules/regl-error2d/index.js");
var Text = __webpack_require__(/*! gl-text */ "./node_modules/gl-text/dist.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var selectMode = __webpack_require__(/*! ../../components/dragelement/helpers */ "./node_modules/plotly.js/src/components/dragelement/helpers.js").selectMode;
var prepareRegl = __webpack_require__(/*! ../../lib/prepare_regl */ "./node_modules/plotly.js/src/lib/prepare_regl.js");

var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var linkTraces = __webpack_require__(/*! ../scatter/link_traces */ "./node_modules/plotly.js/src/traces/scatter/link_traces.js");

var styleTextSelection = __webpack_require__(/*! ./edit_style */ "./node_modules/plotly.js/src/traces/scattergl/edit_style.js").styleTextSelection;

function getViewport(fullLayout, xaxis, yaxis) {
    var gs = fullLayout._size;
    var width = fullLayout.width;
    var height = fullLayout.height;
    return [
        gs.l + xaxis.domain[0] * gs.w,
        gs.b + yaxis.domain[0] * gs.h,
        (width - gs.r) - (1 - xaxis.domain[1]) * gs.w,
        (height - gs.t) - (1 - yaxis.domain[1]) * gs.h
    ];
}

module.exports = function plot(gd, subplot, cdata) {
    if(!cdata.length) return;

    var fullLayout = gd._fullLayout;
    var scene = subplot._scene;
    var xaxis = subplot.xaxis;
    var yaxis = subplot.yaxis;
    var i, j;

    // we may have more subplots than initialized data due to Axes.getSubplots method
    if(!scene) return;

    var success = prepareRegl(gd, ['ANGLE_instanced_arrays', 'OES_element_index_uint']);
    if(!success) {
        scene.init();
        return;
    }

    var count = scene.count;
    var regl = fullLayout._glcanvas.data()[0].regl;

    // that is needed for fills
    linkTraces(gd, subplot, cdata);

    if(scene.dirty) {
        // make sure scenes are created
        if(scene.error2d === true) {
            scene.error2d = createError(regl);
        }
        if(scene.line2d === true) {
            scene.line2d = createLine(regl);
        }
        if(scene.scatter2d === true) {
            scene.scatter2d = createScatter(regl);
        }
        if(scene.fill2d === true) {
            scene.fill2d = createLine(regl);
        }
        if(scene.glText === true) {
            scene.glText = new Array(count);
            for(i = 0; i < count; i++) {
                scene.glText[i] = new Text(regl);
            }
        }

        // update main marker options
        if(scene.glText) {
            if(count > scene.glText.length) {
                // add gl text marker
                var textsToAdd = count - scene.glText.length;
                for(i = 0; i < textsToAdd; i++) {
                    scene.glText.push(new Text(regl));
                }
            } else if(count < scene.glText.length) {
                // remove gl text marker
                var textsToRemove = scene.glText.length - count;
                var removedTexts = scene.glText.splice(count, textsToRemove);
                removedTexts.forEach(function(text) { text.destroy(); });
            }

            for(i = 0; i < count; i++) {
                scene.glText[i].update(scene.textOptions[i]);
            }
        }
        if(scene.line2d) {
            scene.line2d.update(scene.lineOptions);
            scene.lineOptions = scene.lineOptions.map(function(lineOptions) {
                if(lineOptions && lineOptions.positions) {
                    var srcPos = lineOptions.positions;

                    var firstptdef = 0;
                    while(firstptdef < srcPos.length && (isNaN(srcPos[firstptdef]) || isNaN(srcPos[firstptdef + 1]))) {
                        firstptdef += 2;
                    }
                    var lastptdef = srcPos.length - 2;
                    while(lastptdef > firstptdef && (isNaN(srcPos[lastptdef]) || isNaN(srcPos[lastptdef + 1]))) {
                        lastptdef -= 2;
                    }
                    lineOptions.positions = srcPos.slice(firstptdef, lastptdef + 2);
                }
                return lineOptions;
            });
            scene.line2d.update(scene.lineOptions);
        }
        if(scene.error2d) {
            var errorBatch = (scene.errorXOptions || []).concat(scene.errorYOptions || []);
            scene.error2d.update(errorBatch);
        }
        if(scene.scatter2d) {
            scene.scatter2d.update(scene.markerOptions);
        }

        // fill requires linked traces, so we generate it's positions here
        scene.fillOrder = Lib.repeat(null, count);
        if(scene.fill2d) {
            scene.fillOptions = scene.fillOptions.map(function(fillOptions, i) {
                var cdscatter = cdata[i];
                if(!fillOptions || !cdscatter || !cdscatter[0] || !cdscatter[0].trace) return;
                var cd = cdscatter[0];
                var trace = cd.trace;
                var stash = cd.t;
                var lineOptions = scene.lineOptions[i];
                var last, j;

                var fillData = [];
                if(trace._ownfill) fillData.push(i);
                if(trace._nexttrace) fillData.push(i + 1);
                if(fillData.length) scene.fillOrder[i] = fillData;

                var pos = [];
                var srcPos = (lineOptions && lineOptions.positions) || stash.positions;
                var firstptdef, lastptdef;

                if(trace.fill === 'tozeroy') {
                    firstptdef = 0;
                    while(firstptdef < srcPos.length && isNaN(srcPos[firstptdef + 1])) {
                        firstptdef += 2;
                    }
                    lastptdef = srcPos.length - 2;
                    while(lastptdef > firstptdef && isNaN(srcPos[lastptdef + 1])) {
                        lastptdef -= 2;
                    }
                    if(srcPos[firstptdef + 1] !== 0) {
                        pos = [srcPos[firstptdef], 0];
                    }
                    pos = pos.concat(srcPos.slice(firstptdef, lastptdef + 2));
                    if(srcPos[lastptdef + 1] !== 0) {
                        pos = pos.concat([srcPos[lastptdef], 0]);
                    }
                } else if(trace.fill === 'tozerox') {
                    firstptdef = 0;
                    while(firstptdef < srcPos.length && isNaN(srcPos[firstptdef])) {
                        firstptdef += 2;
                    }
                    lastptdef = srcPos.length - 2;
                    while(lastptdef > firstptdef && isNaN(srcPos[lastptdef])) {
                        lastptdef -= 2;
                    }
                    if(srcPos[firstptdef] !== 0) {
                        pos = [0, srcPos[firstptdef + 1]];
                    }
                    pos = pos.concat(srcPos.slice(firstptdef, lastptdef + 2));
                    if(srcPos[lastptdef] !== 0) {
                        pos = pos.concat([ 0, srcPos[lastptdef + 1]]);
                    }
                } else if(trace.fill === 'toself' || trace.fill === 'tonext') {
                    pos = [];
                    last = 0;
                    for(j = 0; j < srcPos.length; j += 2) {
                        if(isNaN(srcPos[j]) || isNaN(srcPos[j + 1])) {
                            pos = pos.concat(srcPos.slice(last, j));
                            pos.push(srcPos[last], srcPos[last + 1]);
                            last = j + 2;
                        }
                    }
                    pos = pos.concat(srcPos.slice(last));
                    if(last) {
                        pos.push(srcPos[last], srcPos[last + 1]);
                    }
                } else {
                    var nextTrace = trace._nexttrace;

                    if(nextTrace) {
                        var nextOptions = scene.lineOptions[i + 1];

                        if(nextOptions) {
                            var nextPos = nextOptions.positions;
                            if(trace.fill === 'tonexty') {
                                pos = srcPos.slice();

                                for(i = Math.floor(nextPos.length / 2); i--;) {
                                    var xx = nextPos[i * 2];
                                    var yy = nextPos[i * 2 + 1];
                                    if(isNaN(xx) || isNaN(yy)) continue;
                                    pos.push(xx, yy);
                                }
                                fillOptions.fill = nextTrace.fillcolor;
                            }
                        }
                    }
                }

                // detect prev trace positions to exclude from current fill
                if(trace._prevtrace && trace._prevtrace.fill === 'tonext') {
                    var prevLinePos = scene.lineOptions[i - 1].positions;

                    // FIXME: likely this logic should be tested better
                    var offset = pos.length / 2;
                    last = offset;
                    var hole = [last];
                    for(j = 0; j < prevLinePos.length; j += 2) {
                        if(isNaN(prevLinePos[j]) || isNaN(prevLinePos[j + 1])) {
                            hole.push(j / 2 + offset + 1);
                            last = j + 2;
                        }
                    }

                    pos = pos.concat(prevLinePos);
                    fillOptions.hole = hole;
                }
                fillOptions.fillmode = trace.fill;
                fillOptions.opacity = trace.opacity;
                fillOptions.positions = pos;

                return fillOptions;
            });

            scene.fill2d.update(scene.fillOptions);
        }
    }

    // form batch arrays, and check for selected points
    var dragmode = fullLayout.dragmode;
    var isSelectMode = selectMode(dragmode);
    var clickSelectEnabled = fullLayout.clickmode.indexOf('select') > -1;

    for(i = 0; i < count; i++) {
        var cd0 = cdata[i][0];
        var trace = cd0.trace;
        var stash = cd0.t;
        var index = stash.index;
        var len = trace._length;
        var x = stash.x;
        var y = stash.y;

        if(trace.selectedpoints || isSelectMode || clickSelectEnabled) {
            if(!isSelectMode) isSelectMode = true;

            // regenerate scene batch, if traces number changed during selection
            if(trace.selectedpoints) {
                var selPts = scene.selectBatch[index] = Lib.selIndices2selPoints(trace);

                var selDict = {};
                for(j = 0; j < selPts.length; j++) {
                    selDict[selPts[j]] = 1;
                }
                var unselPts = [];
                for(j = 0; j < len; j++) {
                    if(!selDict[j]) unselPts.push(j);
                }
                scene.unselectBatch[index] = unselPts;
            }

            // precalculate px coords since we are not going to pan during select
            // TODO, could do better here e.g.
            // - spin that in a webworker
            // - compute selection from polygons in data coordinates
            //   (maybe just for linear axes)
            var xpx = stash.xpx = new Array(len);
            var ypx = stash.ypx = new Array(len);
            for(j = 0; j < len; j++) {
                xpx[j] = xaxis.c2p(x[j]);
                ypx[j] = yaxis.c2p(y[j]);
            }
        } else {
            stash.xpx = stash.ypx = null;
        }
    }

    if(isSelectMode) {
        // create scatter instance by cloning scatter2d
        if(!scene.select2d) {
            scene.select2d = createScatter(fullLayout._glcanvas.data()[1].regl);
        }

        // use unselected styles on 'context' canvas
        if(scene.scatter2d) {
            var unselOpts = new Array(count);
            for(i = 0; i < count; i++) {
                unselOpts[i] = scene.selectBatch[i].length || scene.unselectBatch[i].length ?
                    scene.markerUnselectedOptions[i] :
                    {};
            }
            scene.scatter2d.update(unselOpts);
        }

        // use selected style on 'focus' canvas
        if(scene.select2d) {
            scene.select2d.update(scene.markerOptions);
            scene.select2d.update(scene.markerSelectedOptions);
        }

        if(scene.glText) {
            cdata.forEach(function(cdscatter) {
                var trace = ((cdscatter || [])[0] || {}).trace || {};
                if(subTypes.hasText(trace)) {
                    styleTextSelection(cdscatter);
                }
            });
        }
    } else {
        // reset 'context' scatter2d opts to base opts,
        // thus unsetting markerUnselectedOptions from selection
        if(scene.scatter2d) {
            scene.scatter2d.update(scene.markerOptions);
        }
    }

    // provide viewport and range
    var vpRange0 = {
        viewport: getViewport(fullLayout, xaxis, yaxis),
        // TODO do we need those fallbacks?
        range: [
            (xaxis._rl || xaxis.range)[0],
            (yaxis._rl || yaxis.range)[0],
            (xaxis._rl || xaxis.range)[1],
            (yaxis._rl || yaxis.range)[1]
        ]
    };
    var vpRange = Lib.repeat(vpRange0, scene.count);

    // upload viewport/range data to GPU
    if(scene.fill2d) {
        scene.fill2d.update(vpRange);
    }
    if(scene.line2d) {
        scene.line2d.update(vpRange);
    }
    if(scene.error2d) {
        scene.error2d.update(vpRange.concat(vpRange));
    }
    if(scene.scatter2d) {
        scene.scatter2d.update(vpRange);
    }
    if(scene.select2d) {
        scene.select2d.update(vpRange);
    }
    if(scene.glText) {
        scene.glText.forEach(function(text) { text.update(vpRange0); });
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/scene_update.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/scene_update.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

// make sure scene exists on subplot, return it
module.exports = function sceneUpdate(gd, subplot) {
    var scene = subplot._scene;

    var resetOpts = {
        // number of traces in subplot, since scene:subplot -> 1:1
        count: 0,
        // whether scene requires init hook in plot call (dirty plot call)
        dirty: true,
        // last used options
        lineOptions: [],
        fillOptions: [],
        markerOptions: [],
        markerSelectedOptions: [],
        markerUnselectedOptions: [],
        errorXOptions: [],
        errorYOptions: [],
        textOptions: [],
        textSelectedOptions: [],
        textUnselectedOptions: [],
        // selection batches
        selectBatch: [],
        unselectBatch: []
    };

    // regl- component stubs, initialized in dirty plot call
    var initOpts = {
        fill2d: false,
        scatter2d: false,
        error2d: false,
        line2d: false,
        glText: false,
        select2d: false
    };

    if(!subplot._scene) {
        scene = subplot._scene = {};

        scene.init = function init() {
            Lib.extendFlat(scene, initOpts, resetOpts);
        };

        scene.init();

        // apply new option to all regl components (used on drag)
        scene.update = function update(opt) {
            var opts = Lib.repeat(opt, scene.count);

            if(scene.fill2d) scene.fill2d.update(opts);
            if(scene.scatter2d) scene.scatter2d.update(opts);
            if(scene.line2d) scene.line2d.update(opts);
            if(scene.error2d) scene.error2d.update(opts.concat(opts));
            if(scene.select2d) scene.select2d.update(opts);
            if(scene.glText) {
                for(var i = 0; i < scene.count; i++) {
                    scene.glText[i].update(opt);
                }
            }
        };

        // draw traces in proper order
        scene.draw = function draw() {
            var count = scene.count;
            var fill2d = scene.fill2d;
            var error2d = scene.error2d;
            var line2d = scene.line2d;
            var scatter2d = scene.scatter2d;
            var glText = scene.glText;
            var select2d = scene.select2d;
            var selectBatch = scene.selectBatch;
            var unselectBatch = scene.unselectBatch;

            for(var i = 0; i < count; i++) {
                if(fill2d && scene.fillOrder[i]) {
                    fill2d.draw(scene.fillOrder[i]);
                }
                if(line2d && scene.lineOptions[i]) {
                    line2d.draw(i);
                }
                if(error2d) {
                    if(scene.errorXOptions[i]) error2d.draw(i);
                    if(scene.errorYOptions[i]) error2d.draw(i + count);
                }
                if(scatter2d && scene.markerOptions[i]) {
                    if(unselectBatch[i].length) {
                        var arg = Lib.repeat([], scene.count);
                        arg[i] = unselectBatch[i];
                        scatter2d.draw(arg);
                    } else if(!selectBatch[i].length) {
                        scatter2d.draw(i);
                    }
                }
                if(glText[i] && scene.textOptions[i]) {
                    glText[i].render();
                }
            }

            if(select2d) {
                select2d.draw(selectBatch);
            }

            scene.dirty = false;
        };

        // remove scene resources
        scene.destroy = function destroy() {
            if(scene.fill2d && scene.fill2d.destroy) scene.fill2d.destroy();
            if(scene.scatter2d && scene.scatter2d.destroy) scene.scatter2d.destroy();
            if(scene.error2d && scene.error2d.destroy) scene.error2d.destroy();
            if(scene.line2d && scene.line2d.destroy) scene.line2d.destroy();
            if(scene.select2d && scene.select2d.destroy) scene.select2d.destroy();
            if(scene.glText) {
                scene.glText.forEach(function(text) {
                    if(text.destroy) text.destroy();
                });
            }

            scene.lineOptions = null;
            scene.fillOptions = null;
            scene.markerOptions = null;
            scene.markerSelectedOptions = null;
            scene.markerUnselectedOptions = null;
            scene.errorXOptions = null;
            scene.errorYOptions = null;
            scene.textOptions = null;
            scene.textSelectedOptions = null;
            scene.textUnselectedOptions = null;

            scene.selectBatch = null;
            scene.unselectBatch = null;

            // we can't just delete _scene, because `destroy` is called in the
            // middle of supplyDefaults, before relinkPrivateKeys which will put it back.
            subplot._scene = null;
        };
    }

    // in case if we have scene from the last calc - reset data
    if(!scene.dirty) {
        Lib.extendFlat(scene, resetOpts);
    }

    return scene;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergl/select.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergl/select.js ***!
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



var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var styleTextSelection = __webpack_require__(/*! ./edit_style */ "./node_modules/plotly.js/src/traces/scattergl/edit_style.js").styleTextSelection;

module.exports = function select(searchInfo, selectionTester) {
    var cd = searchInfo.cd;
    var selection = [];
    var trace = cd[0].trace;
    var stash = cd[0].t;
    var len = trace._length;
    var x = stash.x;
    var y = stash.y;
    var scene = stash._scene;
    var index = stash.index;

    if(!scene) return selection;

    var hasText = subTypes.hasText(trace);
    var hasMarkers = subTypes.hasMarkers(trace);
    var hasOnlyLines = !hasMarkers && !hasText;

    if(trace.visible !== true || hasOnlyLines) return selection;

    var els = [];
    var unels = [];

    // degenerate polygon does not enable selection
    // filter out points by visible scatter ones
    if(selectionTester !== false && !selectionTester.degenerate) {
        for(var i = 0; i < len; i++) {
            if(selectionTester.contains([stash.xpx[i], stash.ypx[i]], false, i, searchInfo)) {
                els.push(i);
                selection.push({
                    pointNumber: i,
                    x: x[i],
                    y: y[i]
                });
            } else {
                unels.push(i);
            }
        }
    }

    if(hasMarkers) {
        var scatter2d = scene.scatter2d;

        if(!els.length && !unels.length) {
            // reset to base styles when clearing
            var baseOpts = new Array(scene.count);
            baseOpts[index] = scene.markerOptions[index];
            scatter2d.update.apply(scatter2d, baseOpts);
        } else if(!scene.selectBatch[index].length && !scene.unselectBatch[index].length) {
            // set unselected styles on 'context' canvas (if not done already)
            var unselOpts = new Array(scene.count);
            unselOpts[index] = scene.markerUnselectedOptions[index];
            scatter2d.update.apply(scatter2d, unselOpts);
        }
    }

    scene.selectBatch[index] = els;
    scene.unselectBatch[index] = unels;

    if(hasText) {
        styleTextSelection(cd);
    }

    return selection;
};


/***/ }),

/***/ "./node_modules/regl-error2d/index.js":
/*!********************************************!*\
  !*** ./node_modules/regl-error2d/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const getBounds = __webpack_require__(/*! array-bounds */ "./node_modules/array-bounds/index.js")
const rgba = __webpack_require__(/*! color-normalize */ "./node_modules/color-normalize/index.js")
const updateDiff = __webpack_require__(/*! update-diff */ "./node_modules/update-diff/index.js")
const pick = __webpack_require__(/*! pick-by-alias */ "./node_modules/pick-by-alias/index.js")
const extend = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js")
const flatten = __webpack_require__(/*! flatten-vertex-data */ "./node_modules/flatten-vertex-data/index.js")
const {float32, fract32} = __webpack_require__(/*! to-float32 */ "./node_modules/to-float32/index.js")

module.exports = Error2D

const WEIGHTS = [
	//direction, lineWidth shift, capSize shift

	// x-error bar
	[1, 0, 0, 1, 0, 0],
	[1, 0, 0, -1, 0, 0],
	[-1, 0, 0, -1, 0, 0],

	[-1, 0, 0, -1, 0, 0],
	[-1, 0, 0, 1, 0, 0],
	[1, 0, 0, 1, 0, 0],

	// x-error right cap
	[1, 0, -1, 0, 0, 1],
	[1, 0, -1, 0, 0, -1],
	[1, 0, 1, 0, 0, -1],

	[1, 0, 1, 0, 0, -1],
	[1, 0, 1, 0, 0, 1],
	[1, 0, -1, 0, 0, 1],

	// x-error left cap
	[-1, 0, -1, 0, 0, 1],
	[-1, 0, -1, 0, 0, -1],
	[-1, 0, 1, 0, 0, -1],

	[-1, 0, 1, 0, 0, -1],
	[-1, 0, 1, 0, 0, 1],
	[-1, 0, -1, 0, 0, 1],

	// y-error bar
	[0, 1, 1, 0, 0, 0],
	[0, 1, -1, 0, 0, 0],
	[0, -1, -1, 0, 0, 0],

	[0, -1, -1, 0, 0, 0],
	[0, 1, 1, 0, 0, 0],
	[0, -1, 1, 0, 0, 0],

	// y-error top cap
	[0, 1, 0, -1, 1, 0],
	[0, 1, 0, -1, -1, 0],
	[0, 1, 0, 1, -1, 0],

	[0, 1, 0, 1, 1, 0],
	[0, 1, 0, -1, 1, 0],
	[0, 1, 0, 1, -1, 0],

	// y-error bottom cap
	[0, -1, 0, -1, 1, 0],
	[0, -1, 0, -1, -1, 0],
	[0, -1, 0, 1, -1, 0],

	[0, -1, 0, 1, 1, 0],
	[0, -1, 0, -1, 1, 0],
	[0, -1, 0, 1, -1, 0]
]


function Error2D (regl, options) {
	if (typeof regl === 'function') {
		if (!options) options = {}
		options.regl = regl
	}
	else {
		options = regl
	}
	if (options.length) options.positions = options
	regl = options.regl

	if (!regl.hasExtension('ANGLE_instanced_arrays')) {
		throw Error('regl-error2d: `ANGLE_instanced_arrays` extension should be enabled');
	}

	// persistent variables
	let gl = regl._gl, drawErrors, positionBuffer, positionFractBuffer, colorBuffer, errorBuffer, meshBuffer,
			defaults = {
				color: 'black',
				capSize: 5,
				lineWidth: 1,
				opacity: 1,
				viewport: null,
				range: null,
				offset: 0,
				count: 0,
				bounds: null,
				positions: [],
				errors: []
			}, groups = []

	//color per-point
	colorBuffer = regl.buffer({
		usage: 'dynamic',
		type: 'uint8',
		data: new Uint8Array(0)
	})
	//xy-position per-point
	positionBuffer = regl.buffer({
		usage: 'dynamic',
		type: 'float',
		data: new Uint8Array(0)
	})
	//xy-position float32-fraction
	positionFractBuffer = regl.buffer({
		usage: 'dynamic',
		type: 'float',
		data: new Uint8Array(0)
	})
	//4 errors per-point
	errorBuffer = regl.buffer({
		usage: 'dynamic',
		type: 'float',
		data: new Uint8Array(0)
	})
	//error bar mesh
	meshBuffer = regl.buffer({
		usage: 'static',
		type: 'float',
		data: WEIGHTS
	})

	update(options)

	//drawing method
	drawErrors = regl({
		vert: `
		precision highp float;

		attribute vec2 position, positionFract;
		attribute vec4 error;
		attribute vec4 color;

		attribute vec2 direction, lineOffset, capOffset;

		uniform vec4 viewport;
		uniform float lineWidth, capSize;
		uniform vec2 scale, scaleFract, translate, translateFract;

		varying vec4 fragColor;

		void main() {
			fragColor = color / 255.;

			vec2 pixelOffset = lineWidth * lineOffset + (capSize + lineWidth) * capOffset;

			vec2 dxy = -step(.5, direction.xy) * error.xz + step(direction.xy, vec2(-.5)) * error.yw;

			vec2 position = position + dxy;

			vec2 pos = (position + translate) * scale
				+ (positionFract + translateFract) * scale
				+ (position + translate) * scaleFract
				+ (positionFract + translateFract) * scaleFract;

			pos += pixelOffset / viewport.zw;

			gl_Position = vec4(pos * 2. - 1., 0, 1);
		}
		`,

		frag: `
		precision highp float;

		varying vec4 fragColor;

		uniform float opacity;

		void main() {
			gl_FragColor = fragColor;
			gl_FragColor.a *= opacity;
		}
		`,

		uniforms: {
			range: regl.prop('range'),
			lineWidth: regl.prop('lineWidth'),
			capSize: regl.prop('capSize'),
			opacity: regl.prop('opacity'),
			scale: regl.prop('scale'),
			translate: regl.prop('translate'),
			scaleFract: regl.prop('scaleFract'),
			translateFract: regl.prop('translateFract'),
			viewport: (ctx, prop) => [prop.viewport.x, prop.viewport.y, ctx.viewportWidth, ctx.viewportHeight]
		},

		attributes: {
			//dynamic attributes
			color: {
				buffer: colorBuffer,
				offset: (ctx, prop) => prop.offset * 4,
				divisor: 1,
			},
			position: {
				buffer: positionBuffer,
				offset: (ctx, prop) => prop.offset * 8,
				divisor: 1
			},
			positionFract: {
				buffer: positionFractBuffer,
				offset: (ctx, prop) => prop.offset * 8,
				divisor: 1
			},
			error: {
				buffer: errorBuffer,
				offset: (ctx, prop) => prop.offset * 16,
				divisor: 1
			},

			//static attributes
			direction: {
				buffer: meshBuffer,
				stride: 24,
				offset: 0
			},
			lineOffset: {
				buffer: meshBuffer,
				stride: 24,
				offset: 8
			},
			capOffset: {
				buffer: meshBuffer,
				stride: 24,
				offset: 16
			}
		},

		primitive: 'triangles',

		blend: {
			enable: true,
			color: [0,0,0,0],
			equation: {
				rgb: 'add',
				alpha: 'add'
			},
			func: {
				srcRGB: 'src alpha',
				dstRGB: 'one minus src alpha',
				srcAlpha: 'one minus dst alpha',
				dstAlpha: 'one'
			}
		},

		depth: {
			enable: false
		},

		scissor: {
			enable: true,
			box: regl.prop('viewport')
		},
		viewport: regl.prop('viewport'),
		stencil: false,

		instances: regl.prop('count'),
		count: WEIGHTS.length
	})

	//expose API
	extend(error2d, {
		update: update,
		draw: draw,
		destroy: destroy,
		regl: regl,
		gl: gl,
		canvas: gl.canvas,
		groups: groups
	})

	return error2d

	function error2d (opts) {
		//update
		if (opts) {
			update(opts)
		}

		//destroy
		else if (opts === null) {
			destroy()
		}

		draw()
	}


	//main draw method
	function draw (options) {
		if (typeof options === 'number') return drawGroup(options)

		//make options a batch
		if (options && !Array.isArray(options)) options = [options]


		regl._refresh()

		//render multiple polylines via regl batch
		groups.forEach((s, i) => {
			if (!s) return

			if (options) {
				if (!options[i]) s.draw = false
				else s.draw = true
			}

			//ignore draw flag for one pass
			if (!s.draw) {
				s.draw = true;
				return
			}

			drawGroup(i)
		})
	}

	//draw single error group by id
	function drawGroup (s) {
		if (typeof s === 'number') s = groups[s]
		if (s == null) return

		if (!(s && s.count && s.color && s.opacity && s.positions && s.positions.length > 1)) return

		s.scaleRatio = [
			s.scale[0] * s.viewport.width,
			s.scale[1] * s.viewport.height
		]

		drawErrors(s)

		if (s.after) s.after(s)
	}

	function update (options) {
		if (!options) return

		//direct points argument
		if (options.length != null) {
			if (typeof options[0] === 'number') options = [{positions: options}]
		}

		//make options a batch
		else if (!Array.isArray(options)) options = [options]

		//global count of points
		let pointCount = 0, errorCount = 0

		error2d.groups = groups = options.map((options, i) => {
			let group = groups[i]

			if (!options) return group
			else if (typeof options === 'function') options = {after: options}
			else if (typeof options[0] === 'number') options = {positions: options}

			//copy options to avoid mutation & handle aliases
			options = pick(options, {
				color: 'color colors fill',
				capSize: 'capSize cap capsize cap-size',
				lineWidth: 'lineWidth line-width width line thickness',
				opacity: 'opacity alpha',
				range: 'range dataBox',
				viewport: 'viewport viewBox',
				errors: 'errors error',
				positions: 'positions position data points'
			})

			if (!group) {
				groups[i] = group = {
					id: i,
					scale: null,
					translate: null,
					scaleFract: null,
					translateFract: null,
					draw: true
				}
				options = extend({}, defaults, options)
			}

			updateDiff(group, options, [{
				lineWidth: v => +v * .5,
				capSize: v => +v * .5,
				opacity: parseFloat,
				errors: errors => {
					errors = flatten(errors)

					errorCount += errors.length
					return errors
				},
				positions: (positions, state) => {
					positions = flatten(positions, 'float64')
					state.count = Math.floor(positions.length / 2)
					state.bounds = getBounds(positions, 2)
					state.offset = pointCount

					pointCount += state.count

					return positions
				}
			}, {
				color: (colors, state) => {
					let count = state.count

					if (!colors) colors = 'transparent'

					// 'black' or [0,0,0,0] case
					if (!Array.isArray(colors) || typeof colors[0] === 'number') {
						let color = colors
						colors = Array(count)
						for (let i = 0; i < count; i++) {
							colors[i] = color
						}
					}

					if (colors.length < count) throw Error('Not enough colors')

					let colorData = new Uint8Array(count * 4)

					//convert colors to float arrays
					for (let i = 0; i < count; i++) {
						let c = rgba(colors[i], 'uint8')
						colorData.set(c, i * 4)
					}

					return colorData
				},

				range: (range, state, options) => {
					let bounds = state.bounds
					if (!range) range = bounds

					state.scale = [1 / (range[2] - range[0]), 1 / (range[3] - range[1])]
					state.translate = [-range[0], -range[1]]

					state.scaleFract = fract32(state.scale)
					state.translateFract = fract32(state.translate)

					return range
				},

				viewport: vp => {
					let viewport

					if (Array.isArray(vp)) {
						viewport = {
							x: vp[0],
							y: vp[1],
							width: vp[2] - vp[0],
							height: vp[3] - vp[1]
						}
					}
					else if (vp) {
						viewport = {
							x: vp.x || vp.left || 0,
							y: vp.y || vp.top || 0
						}

						if (vp.right) viewport.width = vp.right - viewport.x
						else viewport.width = vp.w || vp.width || 0

						if (vp.bottom) viewport.height = vp.bottom - viewport.y
						else viewport.height = vp.h || vp.height || 0
					}
					else {
						viewport = {
							x: 0, y: 0,
							width: gl.drawingBufferWidth,
							height: gl.drawingBufferHeight
						}
					}

					return viewport
				}
			}])

			return group
		})

		if (pointCount || errorCount) {
			let len = groups.reduce((acc, group, i) => {
				return acc + (group ? group.count : 0)
			}, 0)

			let positionData = new Float64Array(len * 2)
			let colorData = new Uint8Array(len * 4)
			let errorData = new Float32Array(len * 4)

			groups.forEach((group, i) => {
				if (!group) return
				let {positions, count, offset, color, errors} = group
				if (!count) return

				colorData.set(color, offset * 4)
				errorData.set(errors, offset * 4)
				positionData.set(positions, offset * 2)
			})

			positionBuffer(float32(positionData))
			positionFractBuffer(fract32(positionData))
			colorBuffer(colorData)
			errorBuffer(errorData)
		}

	}

	function destroy () {
		positionBuffer.destroy()
		positionFractBuffer.destroy()
		colorBuffer.destroy()
		errorBuffer.destroy()
		meshBuffer.destroy()
	}
}


/***/ }),

/***/ "./node_modules/string-split-by/index.js":
/*!***********************************************!*\
  !*** ./node_modules/string-split-by/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var paren = __webpack_require__(/*! parenthesis */ "./node_modules/parenthesis/index.js")

module.exports = function splitBy (string, separator, o) {
	if (string == null) throw Error('First argument should be a string')
	if (separator == null) throw Error('Separator should be a string or a RegExp')

	if (!o) o = {}
	else if (typeof o === 'string' || Array.isArray(o)) {
		o = {ignore: o}
	}

	if (o.escape == null) o.escape = true
	if (o.ignore == null) o.ignore = ['[]', '()', '{}', '<>', '""', "''", '``', '“”', '«»']
	else {
		if (typeof o.ignore === 'string') {o.ignore = [o.ignore]}

		o.ignore = o.ignore.map(function (pair) {
			// '"' → '""'
			if (pair.length === 1) pair = pair + pair
			return pair
		})
	}

	var tokens = paren.parse(string, {flat: true, brackets: o.ignore})
	var str = tokens[0]

	var parts = str.split(separator)

	// join parts separated by escape
	if (o.escape) {
		var cleanParts = []
		for (var i = 0; i < parts.length; i++) {
			var prev = parts[i]
			var part = parts[i + 1]

			if (prev[prev.length - 1] === '\\' && prev[prev.length - 2] !== '\\') {
				cleanParts.push(prev + separator + part)
				i++
			}
			else {
				cleanParts.push(prev)
			}
		}
		parts = cleanParts
	}

	// open parens pack & apply unquotes, if any
	for (var i = 0; i < parts.length; i++) {
		tokens[0] = parts[i]
		parts[i] = paren.stringify(tokens, {flat: true})
	}

	return parts
}


/***/ }),

/***/ "./node_modules/unquote/index.js":
/*!***************************************!*\
  !*** ./node_modules/unquote/index.js ***!
  \***************************************/
/***/ ((module) => {

var reg = /[\'\"]/

module.exports = function unquote(str) {
  if (!str) {
    return ''
  }
  if (reg.test(str.charAt(0))) {
    str = str.substr(1)
  }
  if (reg.test(str.charAt(str.length - 1))) {
    str = str.substr(0, str.length - 1)
  }
  return str
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1mb250L2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvY3NzLWZvbnQvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9jc3MtZm9udC9wYXJzZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1mb250L3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RldGVjdC1rZXJuaW5nL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZm9udC1hdGxhcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2ZvbnQtbWVhc3VyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXRleHQvZGlzdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXV0aWwvY29udGV4dC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3BhcmVudGhlc2lzL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcmdsL2VkaXRfc3R5bGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyZ2wvcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJnbC9zY2VuZV91cGRhdGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyZ2wvc2VsZWN0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcmVnbC1lcnJvcjJkL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvc3RyaW5nLXNwbGl0LWJ5L2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdW5xdW90ZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLENBQWE7O0FBRWI7QUFDQSxRQUFRLG1CQUFPLENBQUMsaURBQVM7QUFDekIsWUFBWSxtQkFBTyxDQUFDLHlEQUFhO0FBQ2pDOzs7Ozs7Ozs7Ozs7QUNMWTs7QUFFWixZQUFZLG1CQUFPLENBQUMsZ0ZBQXdCOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVlk7O0FBRVosY0FBYyxtQkFBTyxDQUFDLGdEQUFTO0FBQy9CLHFCQUFxQixtQkFBTyxDQUFDLDBFQUFxQjtBQUNsRCx5QkFBeUIsbUJBQU8sQ0FBQyxvRkFBMEI7QUFDM0QseUJBQXlCLG1CQUFPLENBQUMsb0ZBQTBCO0FBQzNELHdCQUF3QixtQkFBTyxDQUFDLGtGQUF5QjtBQUN6RCwwQkFBMEIsbUJBQU8sQ0FBQyxzRkFBMkI7QUFDN0QsY0FBYyxtQkFBTyxDQUFDLGdFQUFpQjtBQUN2QyxhQUFhLG1GQUE0Qjs7O0FBR3pDOzs7QUFHQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1ELG1CQUFtQjtBQUN0RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNEQUFzRDtBQUN0RCx1REFBdUQ7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsV0FBVztBQUNoQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsd0NBQXdDO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxZ0JZOztBQUVaLFlBQVksbUJBQU8sQ0FBQyx3REFBYTs7QUFFakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLG1DQUFtQywrQkFBK0I7QUFDbEU7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBLHNDQUFzQyxXQUFXO0FBQ2pEOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydGUxZTlkZTZlYTY1N2ExOTRjYTA4LmpzIiwic291cmNlc0NvbnRlbnQiOlsi77u/J3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRwYXJzZTogcmVxdWlyZSgnLi9wYXJzZScpLFxyXG5cdHN0cmluZ2lmeTogcmVxdWlyZSgnLi9zdHJpbmdpZnknKVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIHNpemVzID0gcmVxdWlyZSgnY3NzLWZvbnQtc2l6ZS1rZXl3b3JkcycpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRpc1NpemU6IGZ1bmN0aW9uIGlzU2l6ZSh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIC9eW1xcZFxcLl0vLnRlc3QodmFsdWUpXHJcblx0XHRcdHx8IHZhbHVlLmluZGV4T2YoJy8nKSAhPT0gLTFcclxuXHRcdFx0fHwgc2l6ZXMuaW5kZXhPZih2YWx1ZSkgIT09IC0xXHJcblx0fVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIHVucXVvdGUgPSByZXF1aXJlKCd1bnF1b3RlJylcclxudmFyIGdsb2JhbEtleXdvcmRzID0gcmVxdWlyZSgnY3NzLWdsb2JhbC1rZXl3b3JkcycpXHJcbnZhciBzeXN0ZW1Gb250S2V5d29yZHMgPSByZXF1aXJlKCdjc3Mtc3lzdGVtLWZvbnQta2V5d29yZHMnKVxyXG52YXIgZm9udFdlaWdodEtleXdvcmRzID0gcmVxdWlyZSgnY3NzLWZvbnQtd2VpZ2h0LWtleXdvcmRzJylcclxudmFyIGZvbnRTdHlsZUtleXdvcmRzID0gcmVxdWlyZSgnY3NzLWZvbnQtc3R5bGUta2V5d29yZHMnKVxyXG52YXIgZm9udFN0cmV0Y2hLZXl3b3JkcyA9IHJlcXVpcmUoJ2Nzcy1mb250LXN0cmV0Y2gta2V5d29yZHMnKVxyXG52YXIgc3BsaXRCeSA9IHJlcXVpcmUoJ3N0cmluZy1zcGxpdC1ieScpXHJcbnZhciBpc1NpemUgPSByZXF1aXJlKCcuL2xpYi91dGlsJykuaXNTaXplXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZUZvbnRcclxuXHJcblxyXG52YXIgY2FjaGUgPSBwYXJzZUZvbnQuY2FjaGUgPSB7fVxyXG5cclxuXHJcbmZ1bmN0aW9uIHBhcnNlRm9udCAodmFsdWUpIHtcclxuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdGb250IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcuJylcclxuXHJcblx0aWYgKGNhY2hlW3ZhbHVlXSkgcmV0dXJuIGNhY2hlW3ZhbHVlXVxyXG5cclxuXHRpZiAodmFsdWUgPT09ICcnKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBwYXJzZSBhbiBlbXB0eSBzdHJpbmcuJylcclxuXHR9XHJcblxyXG5cdGlmIChzeXN0ZW1Gb250S2V5d29yZHMuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XHJcblx0XHRyZXR1cm4gY2FjaGVbdmFsdWVdID0ge3N5c3RlbTogdmFsdWV9XHJcblx0fVxyXG5cclxuXHR2YXIgZm9udCA9IHtcclxuXHRcdHN0eWxlOiAnbm9ybWFsJyxcclxuXHRcdHZhcmlhbnQ6ICdub3JtYWwnLFxyXG5cdFx0d2VpZ2h0OiAnbm9ybWFsJyxcclxuXHRcdHN0cmV0Y2g6ICdub3JtYWwnLFxyXG5cdFx0bGluZUhlaWdodDogJ25vcm1hbCcsXHJcblx0XHRzaXplOiAnMXJlbScsXHJcblx0XHRmYW1pbHk6IFsnc2VyaWYnXVxyXG5cdH1cclxuXHJcblx0dmFyIHRva2VucyA9IHNwbGl0QnkodmFsdWUsIC9cXHMrLylcclxuXHR2YXIgdG9rZW5cclxuXHJcblx0d2hpbGUgKHRva2VuID0gdG9rZW5zLnNoaWZ0KCkpIHtcclxuXHRcdGlmIChnbG9iYWxLZXl3b3Jkcy5pbmRleE9mKHRva2VuKSAhPT0gLTEpIHtcclxuXHRcdFx0WydzdHlsZScsICd2YXJpYW50JywgJ3dlaWdodCcsICdzdHJldGNoJ10uZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XHJcblx0XHRcdFx0Zm9udFtwcm9wXSA9IHRva2VuXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRyZXR1cm4gY2FjaGVbdmFsdWVdID0gZm9udFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChmb250U3R5bGVLZXl3b3Jkcy5pbmRleE9mKHRva2VuKSAhPT0gLTEpIHtcclxuXHRcdFx0Zm9udC5zdHlsZSA9IHRva2VuXHJcblx0XHRcdGNvbnRpbnVlXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRva2VuID09PSAnbm9ybWFsJyB8fCB0b2tlbiA9PT0gJ3NtYWxsLWNhcHMnKSB7XHJcblx0XHRcdGZvbnQudmFyaWFudCA9IHRva2VuXHJcblx0XHRcdGNvbnRpbnVlXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGZvbnRTdHJldGNoS2V5d29yZHMuaW5kZXhPZih0b2tlbikgIT09IC0xKSB7XHJcblx0XHRcdGZvbnQuc3RyZXRjaCA9IHRva2VuXHJcblx0XHRcdGNvbnRpbnVlXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGZvbnRXZWlnaHRLZXl3b3Jkcy5pbmRleE9mKHRva2VuKSAhPT0gLTEpIHtcclxuXHRcdFx0Zm9udC53ZWlnaHQgPSB0b2tlblxyXG5cdFx0XHRjb250aW51ZVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRpZiAoaXNTaXplKHRva2VuKSkge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBzcGxpdEJ5KHRva2VuLCAnLycpXHJcblx0XHRcdGZvbnQuc2l6ZSA9IHBhcnRzWzBdXHJcblx0XHRcdGlmIChwYXJ0c1sxXSAhPSBudWxsKSB7XHJcblx0XHRcdFx0Zm9udC5saW5lSGVpZ2h0ID0gcGFyc2VMaW5lSGVpZ2h0KHBhcnRzWzFdKVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHRva2Vuc1swXSA9PT0gJy8nKSB7XHJcblx0XHRcdFx0dG9rZW5zLnNoaWZ0KClcclxuXHRcdFx0XHRmb250LmxpbmVIZWlnaHQgPSBwYXJzZUxpbmVIZWlnaHQodG9rZW5zLnNoaWZ0KCkpXHJcbiBcdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXRva2Vucy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgZm9udC1mYW1pbHkuJylcclxuXHRcdFx0fVxyXG5cdFx0XHRmb250LmZhbWlseSA9IHNwbGl0QnkodG9rZW5zLmpvaW4oJyAnKSwgL1xccyosXFxzKi8pLm1hcCh1bnF1b3RlKVxyXG5cclxuXHRcdFx0cmV0dXJuIGNhY2hlW3ZhbHVlXSA9IGZvbnRcclxuXHRcdH1cclxuXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gb3IgdW5zdXBwb3J0ZWQgZm9udCB0b2tlbjogJyArIHRva2VuKVxyXG5cdH1cclxuXHJcblx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIGZvbnQtc2l6ZS4nKVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcGFyc2VMaW5lSGVpZ2h0KHZhbHVlKSB7XHJcblx0dmFyIHBhcnNlZCA9IHBhcnNlRmxvYXQodmFsdWUpXHJcblx0aWYgKHBhcnNlZC50b1N0cmluZygpID09PSB2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHBhcnNlZFxyXG5cdH1cclxuXHRyZXR1cm4gdmFsdWVcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciBwaWNrID0gcmVxdWlyZSgncGljay1ieS1hbGlhcycpXHJcbnZhciBpc1NpemUgPSByZXF1aXJlKCcuL2xpYi91dGlsJykuaXNTaXplXHJcblxyXG52YXIgZ2xvYmFscyA9IGEybyhyZXF1aXJlKCdjc3MtZ2xvYmFsLWtleXdvcmRzJykpXHJcbnZhciBzeXN0ZW1zID0gYTJvKHJlcXVpcmUoJ2Nzcy1zeXN0ZW0tZm9udC1rZXl3b3JkcycpKVxyXG52YXIgd2VpZ2h0cyA9IGEybyhyZXF1aXJlKCdjc3MtZm9udC13ZWlnaHQta2V5d29yZHMnKSlcclxudmFyIHN0eWxlcyA9IGEybyhyZXF1aXJlKCdjc3MtZm9udC1zdHlsZS1rZXl3b3JkcycpKVxyXG52YXIgc3RyZXRjaGVzID0gYTJvKHJlcXVpcmUoJ2Nzcy1mb250LXN0cmV0Y2gta2V5d29yZHMnKSlcclxuXHJcbnZhciB2YXJpYW50cyA9IHsnbm9ybWFsJzogMSwgJ3NtYWxsLWNhcHMnOiAxfVxyXG52YXIgZmFtcyA9IHtcclxuXHQnc2VyaWYnOiAxLFxyXG5cdCdzYW5zLXNlcmlmJzogMSxcclxuXHQnbW9ub3NwYWNlJzogMSxcclxuXHQnY3Vyc2l2ZSc6IDEsXHJcblx0J2ZhbnRhc3knOiAxLFxyXG5cdCdzeXN0ZW0tdWknOiAxXHJcbn1cclxuXHJcbnZhciBkZWZhdWx0cyA9IHtcclxuXHRzdHlsZTogJ25vcm1hbCcsXHJcblx0dmFyaWFudDogJ25vcm1hbCcsXHJcblx0d2VpZ2h0OiAnbm9ybWFsJyxcclxuXHRzdHJldGNoOiAnbm9ybWFsJyxcclxuXHRzaXplOiAnMXJlbScsXHJcblx0bGluZUhlaWdodDogJ25vcm1hbCcsXHJcblx0ZmFtaWx5OiAnc2VyaWYnXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5naWZ5Rm9udCAobykge1xyXG5cdG8gPSBwaWNrKG8sIHtcclxuXHRcdHN0eWxlOiAnc3R5bGUgZm9udHN0eWxlIGZvbnRTdHlsZSBmb250LXN0eWxlIHNsb3BlIGRpc3RpbmN0aW9uJyxcclxuXHRcdHZhcmlhbnQ6ICd2YXJpYW50IGZvbnQtdmFyaWFudCBmb250VmFyaWFudCBmb250dmFyaWFudCB2YXIgY2FwaXRhbGl6YXRpb24nLFxyXG5cdFx0d2VpZ2h0OiAnd2VpZ2h0IHcgZm9udC13ZWlnaHQgZm9udFdlaWdodCBmb250d2VpZ2h0JyxcclxuXHRcdHN0cmV0Y2g6ICdzdHJldGNoIGZvbnQtc3RyZXRjaCBmb250U3RyZXRjaCBmb250c3RyZXRjaCB3aWR0aCcsXHJcblx0XHRzaXplOiAnc2l6ZSBzIGZvbnQtc2l6ZSBmb250U2l6ZSBmb250c2l6ZSBoZWlnaHQgZW0gZW1TaXplJyxcclxuXHRcdGxpbmVIZWlnaHQ6ICdsaCBsaW5lLWhlaWdodCBsaW5lSGVpZ2h0IGxpbmVoZWlnaHQgbGVhZGluZycsXHJcblx0XHRmYW1pbHk6ICdmb250IGZhbWlseSBmb250RmFtaWx5IGZvbnQtZmFtaWx5IGZvbnRmYW1pbHkgdHlwZSB0eXBlZmFjZSBmYWNlJyxcclxuXHRcdHN5c3RlbTogJ3N5c3RlbSByZXNlcnZlZCBkZWZhdWx0IGdsb2JhbCcsXHJcblx0fSlcclxuXHJcblx0aWYgKG8uc3lzdGVtKSB7XHJcblx0XHRpZiAoby5zeXN0ZW0pIHZlcmlmeShvLnN5c3RlbSwgc3lzdGVtcylcclxuXHRcdHJldHVybiBvLnN5c3RlbVxyXG5cdH1cclxuXHJcblx0dmVyaWZ5KG8uc3R5bGUsIHN0eWxlcylcclxuXHR2ZXJpZnkoby52YXJpYW50LCB2YXJpYW50cylcclxuXHR2ZXJpZnkoby53ZWlnaHQsIHdlaWdodHMpXHJcblx0dmVyaWZ5KG8uc3RyZXRjaCwgc3RyZXRjaGVzKVxyXG5cclxuXHQvLyBkZWZhdWx0IHJvb3QgdmFsdWUgaXMgbWVkaXVtLCBidXQgYnkgZGVmYXVsdCBpdCdzIGluaGVyaXRlZFxyXG5cdGlmIChvLnNpemUgPT0gbnVsbCkgby5zaXplID0gZGVmYXVsdHMuc2l6ZVxyXG5cdGlmICh0eXBlb2Ygby5zaXplID09PSAnbnVtYmVyJykgby5zaXplICs9ICdweCdcclxuXHJcblx0aWYgKCFpc1NpemUpIHRocm93IEVycm9yKCdCYWQgc2l6ZSB2YWx1ZSBgJyArIG8uc2l6ZSArICdgJylcclxuXHJcblx0Ly8gbWFueSB1c2VyLWFnZW50cyB1c2Ugc2VyaWYsIHdlIGRvbid0IGRldGVjdCB0aGF0IGZvciBjb25zaXN0ZW5jeVxyXG5cdGlmICghby5mYW1pbHkpIG8uZmFtaWx5ID0gZGVmYXVsdHMuZmFtaWx5XHJcblx0aWYgKEFycmF5LmlzQXJyYXkoby5mYW1pbHkpKSB7XHJcblx0XHRpZiAoIW8uZmFtaWx5Lmxlbmd0aCkgby5mYW1pbHkgPSBbZGVmYXVsdHMuZmFtaWx5XVxyXG5cdFx0by5mYW1pbHkgPSBvLmZhbWlseS5tYXAoZnVuY3Rpb24gKGYpIHtcclxuXHRcdFx0cmV0dXJuIGZhbXNbZl0gPyBmIDogJ1wiJyArIGYgKyAnXCInXHJcblx0XHR9KS5qb2luKCcsICcpXHJcblx0fVxyXG5cclxuXHQvLyBbIFsgPCdmb250LXN0eWxlJz4gfHwgPGZvbnQtdmFyaWFudC1jc3MyMT4gfHwgPCdmb250LXdlaWdodCc+IHx8IDwnZm9udC1zdHJldGNoJz4gXT8gPCdmb250LXNpemUnPiBbIC8gPCdsaW5lLWhlaWdodCc+IF0/IDwnZm9udC1mYW1pbHknPiBdXHJcblx0dmFyIHJlc3VsdCA9IFtdXHJcblxyXG5cdHJlc3VsdC5wdXNoKG8uc3R5bGUpXHJcblx0aWYgKG8udmFyaWFudCAhPT0gby5zdHlsZSkgcmVzdWx0LnB1c2goby52YXJpYW50KVxyXG5cclxuXHRpZiAoby53ZWlnaHQgIT09IG8udmFyaWFudCAmJlxyXG5cdFx0by53ZWlnaHQgIT09IG8uc3R5bGUpIHJlc3VsdC5wdXNoKG8ud2VpZ2h0KVxyXG5cclxuXHRpZiAoby5zdHJldGNoICE9PSBvLndlaWdodCAmJlxyXG5cdFx0by5zdHJldGNoICE9PSBvLnZhcmlhbnQgJiZcclxuXHRcdG8uc3RyZXRjaCAhPT0gby5zdHlsZSkgcmVzdWx0LnB1c2goby5zdHJldGNoKVxyXG5cclxuXHRyZXN1bHQucHVzaChvLnNpemUgKyAoby5saW5lSGVpZ2h0ID09IG51bGwgfHwgby5saW5lSGVpZ2h0ID09PSAnbm9ybWFsJyB8fCAoby5saW5lSGVpZ2h0ICsgJycgPT09ICcxJykgID8gJycgOiAoJy8nICsgby5saW5lSGVpZ2h0KSkpXHJcblx0cmVzdWx0LnB1c2goby5mYW1pbHkpXHJcblxyXG5cdHJldHVybiByZXN1bHQuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKVxyXG59XHJcblxyXG5mdW5jdGlvbiB2ZXJpZnkgKHZhbHVlLCB2YWx1ZXMpIHtcclxuXHRpZiAodmFsdWUgJiYgIXZhbHVlc1t2YWx1ZV0gJiYgIWdsb2JhbHNbdmFsdWVdKSB0aHJvdyBFcnJvcignVW5rbm93biBrZXl3b3JkIGAnICsgdmFsdWUgKydgJylcclxuXHJcblx0cmV0dXJuIHZhbHVlXHJcbn1cclxuXHJcblxyXG4vLyBbJ2EnLCAnYiddIC0+IHthOiB0cnVlLCBiOiB0cnVlfVxyXG5mdW5jdGlvbiBhMm8gKGEpIHtcclxuXHR2YXIgbyA9IHt9XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRvW2FbaV1dID0gMVxyXG5cdH1cclxuXHRyZXR1cm4gb1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ga2VybmluZ1xyXG5cclxuXHJcbnZhciBjYW52YXMgPSBrZXJuaW5nLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbnZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG52YXIgYXNjaWlQYWlycyA9IGNyZWF0ZVBhaXJzKFszMiwgMTI2XSlcclxuXHJcbmtlcm5pbmcuY3JlYXRlUGFpcnMgPSBjcmVhdGVQYWlyc1xyXG5rZXJuaW5nLmFzY2lpID0gYXNjaWlQYWlyc1xyXG5cclxuXHJcbmZ1bmN0aW9uIGtlcm5pbmcgKGZhbWlseSwgbykge1xyXG5cdGlmIChBcnJheS5pc0FycmF5KGZhbWlseSkpIGZhbWlseSA9IGZhbWlseS5qb2luKCcsICcpXHJcblxyXG5cdHZhciB0YWJsZSA9IHt9LCBwYWlycywgZnMgPSAxNiwgdGhyZXNob2xkID0gLjA1XHJcblxyXG5cdGlmIChvKSB7XHJcblx0XHRpZiAoby5sZW5ndGggPT09IDIgJiYgdHlwZW9mIG9bMF0gPT09ICdudW1iZXInKSB7XHJcblx0XHRcdHBhaXJzID0gY3JlYXRlUGFpcnMobylcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobykpIHtcclxuXHRcdFx0cGFpcnMgPSBvXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0aWYgKG8ubykgcGFpcnMgPSBjcmVhdGVQYWlycyhvLm8pXHJcblx0XHRcdGVsc2UgaWYgKG8ucGFpcnMpIHBhaXJzID0gby5wYWlyc1xyXG5cclxuXHRcdFx0aWYgKG8uZm9udFNpemUpIGZzID0gby5mb250U2l6ZVxyXG5cdFx0XHRpZiAoby50aHJlc2hvbGQgIT0gbnVsbCkgdGhyZXNob2xkID0gby50aHJlc2hvbGRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmICghcGFpcnMpIHBhaXJzID0gYXNjaWlQYWlyc1xyXG5cclxuXHRjdHguZm9udCA9IGZzICsgJ3B4ICcgKyBmYW1pbHlcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHBhaXIgPSBwYWlyc1tpXVxyXG5cdFx0dmFyIHdpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KHBhaXJbMF0pLndpZHRoICsgY3R4Lm1lYXN1cmVUZXh0KHBhaXJbMV0pLndpZHRoXHJcblx0XHR2YXIga2VybmluZ1dpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KHBhaXIpLndpZHRoXHJcblx0XHRpZiAoTWF0aC5hYnMod2lkdGggLSBrZXJuaW5nV2lkdGgpID4gZnMgKiB0aHJlc2hvbGQpIHtcclxuXHRcdFx0dmFyIGVtV2lkdGggPSAoa2VybmluZ1dpZHRoIC0gd2lkdGgpIC8gZnNcclxuXHRcdFx0dGFibGVbcGFpcl0gPSBlbVdpZHRoICogMTAwMFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhYmxlXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYWlycyAocmFuZ2UpIHtcclxuXHR2YXIgcGFpcnMgPSBbXVxyXG5cclxuICAgIGZvciAodmFyIGkgPSByYW5nZVswXTsgaSA8PSByYW5nZVsxXTsgaSsrKSB7XHJcblx0XHR2YXIgbGVmdENoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXHJcblx0XHRmb3IgKHZhciBqID0gcmFuZ2VbMF07IGogPCByYW5nZVsxXTsgaisrKSB7XHJcblx0XHRcdHZhciByaWdodENoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGopXHJcblx0XHRcdHZhciBwYWlyID0gbGVmdENoYXIgKyByaWdodENoYXJcclxuXHJcblx0XHRcdHBhaXJzLnB1c2gocGFpcilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBwYWlyc1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIHN0cmluZ2lmeUZvbnQgPSByZXF1aXJlKCdjc3MtZm9udC9zdHJpbmdpZnknKVxyXG52YXIgZGVmYXVsdENoYXJzID0gWzMyLCAxMjZdXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0bGFzXHJcblxyXG5mdW5jdGlvbiBhdGxhcyhvcHRpb25zKSB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuXHJcbiAgdmFyIHNoYXBlICA9IG9wdGlvbnMuc2hhcGUgPyBvcHRpb25zLnNoYXBlIDogb3B0aW9ucy5jYW52YXMgPyBbb3B0aW9ucy5jYW52YXMud2lkdGgsIG9wdGlvbnMuY2FudmFzLmhlaWdodF0gOiBbNTEyLCA1MTJdXHJcbiAgdmFyIGNhbnZhcyA9IG9wdGlvbnMuY2FudmFzIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbiAgdmFyIGZvbnQgICA9IG9wdGlvbnMuZm9udFxyXG4gIHZhciBzdGVwICAgPSB0eXBlb2Ygb3B0aW9ucy5zdGVwID09PSAnbnVtYmVyJyA/IFtvcHRpb25zLnN0ZXAsIG9wdGlvbnMuc3RlcF0gOiBvcHRpb25zLnN0ZXAgfHwgWzMyLCAzMl1cclxuICB2YXIgY2hhcnMgID0gb3B0aW9ucy5jaGFycyB8fCBkZWZhdWx0Q2hhcnNcclxuXHJcbiAgaWYgKGZvbnQgJiYgdHlwZW9mIGZvbnQgIT09ICdzdHJpbmcnKSBmb250ID0gc3RyaW5naWZ5Rm9udChmb250KVxyXG5cclxuICBpZiAoIUFycmF5LmlzQXJyYXkoY2hhcnMpKSB7XHJcbiAgICBjaGFycyA9IFN0cmluZyhjaGFycykuc3BsaXQoJycpXHJcbiAgfSBlbHNlXHJcbiAgaWYgKGNoYXJzLmxlbmd0aCA9PT0gMlxyXG4gICAgJiYgdHlwZW9mIGNoYXJzWzBdID09PSAnbnVtYmVyJ1xyXG4gICAgJiYgdHlwZW9mIGNoYXJzWzFdID09PSAnbnVtYmVyJ1xyXG4gICkge1xyXG4gICAgdmFyIG5ld2NoYXJzID0gW11cclxuXHJcbiAgICBmb3IgKHZhciBpID0gY2hhcnNbMF0sIGogPSAwOyBpIDw9IGNoYXJzWzFdOyBpKyspIHtcclxuICAgICAgbmV3Y2hhcnNbaisrXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSlcclxuICAgIH1cclxuXHJcbiAgICBjaGFycyA9IG5ld2NoYXJzXHJcbiAgfVxyXG5cclxuICBzaGFwZSA9IHNoYXBlLnNsaWNlKClcclxuICBjYW52YXMud2lkdGggID0gc2hhcGVbMF1cclxuICBjYW52YXMuaGVpZ2h0ID0gc2hhcGVbMV1cclxuXHJcbiAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcblxyXG4gIGN0eC5maWxsU3R5bGUgPSAnIzAwMCdcclxuICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KVxyXG5cclxuICBjdHguZm9udCA9IGZvbnRcclxuICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcidcclxuICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSdcclxuICBjdHguZmlsbFN0eWxlID0gJyNmZmYnXHJcblxyXG4gIHZhciB4ID0gc3RlcFswXSAvIDJcclxuICB2YXIgeSA9IHN0ZXBbMV0gLyAyXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgY3R4LmZpbGxUZXh0KGNoYXJzW2ldLCB4LCB5KVxyXG4gICAgaWYgKCh4ICs9IHN0ZXBbMF0pID4gc2hhcGVbMF0gLSBzdGVwWzBdLzIpICh4ID0gc3RlcFswXS8yKSwgKHkgKz0gc3RlcFsxXSlcclxuICB9XHJcblxyXG4gIHJldHVybiBjYW52YXNcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWVhc3VyZVxyXG5cclxubWVhc3VyZS5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxyXG5tZWFzdXJlLmNhY2hlID0ge31cclxuXHJcbmZ1bmN0aW9uIG1lYXN1cmUgKGZvbnQsIG8pIHtcclxuXHRpZiAoIW8pIG8gPSB7fVxyXG5cclxuXHRpZiAodHlwZW9mIGZvbnQgPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkoZm9udCkpIHtcclxuXHRcdG8uZmFtaWx5ID0gZm9udFxyXG5cdH1cclxuXHJcblx0dmFyIGZhbWlseSA9IEFycmF5LmlzQXJyYXkoby5mYW1pbHkpID8gby5mYW1pbHkuam9pbignLCAnKSA6IG8uZmFtaWx5XHJcblx0aWYgKCFmYW1pbHkpIHRocm93IEVycm9yKCdgZmFtaWx5YCBtdXN0IGJlIGRlZmluZWQnKVxyXG5cclxuXHR2YXIgZnMgPSBvLnNpemUgfHwgby5mb250U2l6ZSB8fCBvLmVtIHx8IDQ4XHJcblx0dmFyIHdlaWdodCA9IG8ud2VpZ2h0IHx8IG8uZm9udFdlaWdodCB8fCAnJ1xyXG5cdHZhciBzdHlsZSA9IG8uc3R5bGUgfHwgby5mb250U3R5bGUgfHwgJydcclxuXHR2YXIgZm9udCA9IFtzdHlsZSwgd2VpZ2h0LCBmc10uam9pbignICcpICsgJ3B4ICcgKyBmYW1pbHlcclxuXHR2YXIgb3JpZ2luID0gby5vcmlnaW4gfHwgJ3RvcCdcclxuXHJcblx0aWYgKG1lYXN1cmUuY2FjaGVbZmFtaWx5XSkge1xyXG5cdFx0Ly8gcmV0dXJuIG1vcmUgcHJlY2lzZSB2YWx1ZXMgaWYgY2FjaGUgaGFzIHRoZW1cclxuXHRcdGlmIChmcyA8PSBtZWFzdXJlLmNhY2hlW2ZhbWlseV0uZW0pIHtcclxuXHRcdFx0cmV0dXJuIGFwcGx5T3JpZ2luKG1lYXN1cmUuY2FjaGVbZmFtaWx5XSwgb3JpZ2luKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIGNhbnZhcyA9IG8uY2FudmFzIHx8IG1lYXN1cmUuY2FudmFzXHJcblx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcblx0dmFyIGNoYXJzID0ge1xyXG5cdFx0dXBwZXI6IG8udXBwZXIgIT09IHVuZGVmaW5lZCA/IG8udXBwZXIgOiAnSCcsXHJcblx0XHRsb3dlcjogby5sb3dlciAhPT0gdW5kZWZpbmVkID8gby5sb3dlciA6ICd4JyxcclxuXHRcdGRlc2NlbnQ6IG8uZGVzY2VudCAhPT0gdW5kZWZpbmVkID8gby5kZXNjZW50IDogJ3AnLFxyXG5cdFx0YXNjZW50OiBvLmFzY2VudCAhPT0gdW5kZWZpbmVkID8gby5hc2NlbnQgOiAnaCcsXHJcblx0XHR0aXR0bGU6IG8udGl0dGxlICE9PSB1bmRlZmluZWQgPyBvLnRpdHRsZSA6ICdpJyxcclxuXHRcdG92ZXJzaG9vdDogby5vdmVyc2hvb3QgIT09IHVuZGVmaW5lZCA/IG8ub3ZlcnNob290IDogJ08nXHJcblx0fVxyXG5cdHZhciBsID0gTWF0aC5jZWlsKGZzICogMS41KVxyXG5cdGNhbnZhcy5oZWlnaHQgPSBsXHJcblx0Y2FudmFzLndpZHRoID0gbCAqIC41XHJcblx0Y3R4LmZvbnQgPSBmb250XHJcblxyXG5cdHZhciBjaGFyID0gJ0gnXHJcblx0dmFyIHJlc3VsdCA9IHtcclxuXHRcdHRvcDogMFxyXG5cdH1cclxuXHJcblx0Ly8gbWVhc3VyZSBsaW5lLWhlaWdodFxyXG5cdGN0eC5jbGVhclJlY3QoMCwgMCwgbCwgbClcclxuXHRjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCdcclxuXHRjdHguZmlsbFN0eWxlID0gJ2JsYWNrJ1xyXG5cdGN0eC5maWxsVGV4dChjaGFyLCAwLCAwKVxyXG5cdHZhciB0b3BQeCA9IGZpcnN0VG9wKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgbCwgbCkpXHJcblx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBsLCBsKVxyXG5cdGN0eC50ZXh0QmFzZWxpbmUgPSAnYm90dG9tJ1xyXG5cdGN0eC5maWxsVGV4dChjaGFyLCAwLCBsKVxyXG5cdHZhciBib3R0b21QeCA9IGZpcnN0VG9wKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgbCwgbCkpXHJcblx0cmVzdWx0LmxpbmVIZWlnaHQgPVxyXG5cdHJlc3VsdC5ib3R0b20gPSBsIC0gYm90dG9tUHggKyB0b3BQeFxyXG5cclxuXHQvLyBtZWFzdXJlIGJhc2VsaW5lXHJcblx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBsLCBsKVxyXG5cdGN0eC50ZXh0QmFzZWxpbmUgPSAnYWxwaGFiZXRpYydcclxuXHRjdHguZmlsbFRleHQoY2hhciwgMCwgbClcclxuXHR2YXIgYmFzZWxpbmVQeCA9IGZpcnN0VG9wKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgbCwgbCkpXHJcblx0dmFyIGJhc2VsaW5lID0gbCAtIGJhc2VsaW5lUHggLSAxICsgdG9wUHhcclxuXHRyZXN1bHQuYmFzZWxpbmUgPVxyXG5cdHJlc3VsdC5hbHBoYWJldGljID0gYmFzZWxpbmVcclxuXHJcblx0Ly8gbWVhc3VyZSBtZWRpYW5cclxuXHRjdHguY2xlYXJSZWN0KDAsIDAsIGwsIGwpXHJcblx0Y3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnXHJcblx0Y3R4LmZpbGxUZXh0KGNoYXIsIDAsIGwgKiAuNSlcclxuXHR2YXIgbWVkaWFuUHggPSBmaXJzdFRvcChjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGwsIGwpKVxyXG5cdHJlc3VsdC5tZWRpYW4gPVxyXG5cdHJlc3VsdC5taWRkbGUgPSBsIC0gbWVkaWFuUHggLSAxICsgdG9wUHggLSBsICogLjVcclxuXHJcblx0Ly8gbWVhc3VyZSBoYW5naW5nXHJcblx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBsLCBsKVxyXG5cdGN0eC50ZXh0QmFzZWxpbmUgPSAnaGFuZ2luZydcclxuXHRjdHguZmlsbFRleHQoY2hhciwgMCwgbCAqIC41KVxyXG5cdHZhciBoYW5naW5nUHggPSBmaXJzdFRvcChjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGwsIGwpKVxyXG5cdHJlc3VsdC5oYW5naW5nID0gbCAtIGhhbmdpbmdQeCAtIDEgKyB0b3BQeCAtIGwgKiAuNVxyXG5cclxuXHQvLyBtZWFzdXJlIGlkZW9ncmFwaGljXHJcblx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBsLCBsKVxyXG5cdGN0eC50ZXh0QmFzZWxpbmUgPSAnaWRlb2dyYXBoaWMnXHJcblx0Y3R4LmZpbGxUZXh0KGNoYXIsIDAsIGwpXHJcblx0dmFyIGlkZW9ncmFwaGljUHggPSBmaXJzdFRvcChjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGwsIGwpKVxyXG5cdHJlc3VsdC5pZGVvZ3JhcGhpYyA9IGwgLSBpZGVvZ3JhcGhpY1B4IC0gMSArIHRvcFB4XHJcblxyXG5cdC8vIG1lYXN1cmUgY2FwXHJcblx0aWYgKGNoYXJzLnVwcGVyKSB7XHJcblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGwsIGwpXHJcblx0XHRjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCdcclxuXHRcdGN0eC5maWxsVGV4dChjaGFycy51cHBlciwgMCwgMClcclxuXHRcdHJlc3VsdC51cHBlciA9IGZpcnN0VG9wKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgbCwgbCkpXHJcblx0XHRyZXN1bHQuY2FwSGVpZ2h0ID0gKHJlc3VsdC5iYXNlbGluZSAtIHJlc3VsdC51cHBlcilcclxuXHR9XHJcblxyXG5cdC8vIG1lYXN1cmUgeFxyXG5cdGlmIChjaGFycy5sb3dlcikge1xyXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBsLCBsKVxyXG5cdFx0Y3R4LnRleHRCYXNlbGluZSA9ICd0b3AnXHJcblx0XHRjdHguZmlsbFRleHQoY2hhcnMubG93ZXIsIDAsIDApXHJcblx0XHRyZXN1bHQubG93ZXIgPSBmaXJzdFRvcChjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGwsIGwpKVxyXG5cdFx0cmVzdWx0LnhIZWlnaHQgPSAocmVzdWx0LmJhc2VsaW5lIC0gcmVzdWx0Lmxvd2VyKVxyXG5cdH1cclxuXHJcblx0Ly8gbWVhc3VyZSB0aXR0bGVcclxuXHRpZiAoY2hhcnMudGl0dGxlKSB7XHJcblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGwsIGwpXHJcblx0XHRjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCdcclxuXHRcdGN0eC5maWxsVGV4dChjaGFycy50aXR0bGUsIDAsIDApXHJcblx0XHRyZXN1bHQudGl0dGxlID0gZmlyc3RUb3AoY3R4LmdldEltYWdlRGF0YSgwLCAwLCBsLCBsKSlcclxuXHR9XHJcblxyXG5cdC8vIG1lYXN1cmUgYXNjZW50XHJcblx0aWYgKGNoYXJzLmFzY2VudCkge1xyXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBsLCBsKVxyXG5cdFx0Y3R4LnRleHRCYXNlbGluZSA9ICd0b3AnXHJcblx0XHRjdHguZmlsbFRleHQoY2hhcnMuYXNjZW50LCAwLCAwKVxyXG5cdFx0cmVzdWx0LmFzY2VudCA9IGZpcnN0VG9wKGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgbCwgbCkpXHJcblx0fVxyXG5cclxuXHQvLyBtZWFzdXJlIGRlc2NlbnRcclxuXHRpZiAoY2hhcnMuZGVzY2VudCkge1xyXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBsLCBsKVxyXG5cdFx0Y3R4LnRleHRCYXNlbGluZSA9ICd0b3AnXHJcblx0XHRjdHguZmlsbFRleHQoY2hhcnMuZGVzY2VudCwgMCwgMClcclxuXHRcdHJlc3VsdC5kZXNjZW50ID0gZmlyc3RCb3R0b20oY3R4LmdldEltYWdlRGF0YSgwLCAwLCBsLCBsKSlcclxuXHR9XHJcblxyXG5cdC8vIG1lYXN1cmUgb3ZlcnNob290XHJcblx0aWYgKGNoYXJzLm92ZXJzaG9vdCkge1xyXG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBsLCBsKVxyXG5cdFx0Y3R4LnRleHRCYXNlbGluZSA9ICd0b3AnXHJcblx0XHRjdHguZmlsbFRleHQoY2hhcnMub3ZlcnNob290LCAwLCAwKVxyXG5cdFx0dmFyIG92ZXJzaG9vdFB4ID0gZmlyc3RCb3R0b20oY3R4LmdldEltYWdlRGF0YSgwLCAwLCBsLCBsKSlcclxuXHRcdHJlc3VsdC5vdmVyc2hvb3QgPSBvdmVyc2hvb3RQeCAtIGJhc2VsaW5lXHJcblx0fVxyXG5cclxuXHQvLyBub3JtYWxpemUgcmVzdWx0XHJcblx0Zm9yICh2YXIgbmFtZSBpbiByZXN1bHQpIHtcclxuXHRcdHJlc3VsdFtuYW1lXSAvPSBmc1xyXG5cdH1cclxuXHJcblx0cmVzdWx0LmVtID0gZnNcclxuXHRtZWFzdXJlLmNhY2hlW2ZhbWlseV0gPSByZXN1bHRcclxuXHJcblx0cmV0dXJuIGFwcGx5T3JpZ2luKHJlc3VsdCwgb3JpZ2luKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseU9yaWdpbihvYmosIG9yaWdpbikge1xyXG5cdHZhciByZXMgPSB7fVxyXG5cdGlmICh0eXBlb2Ygb3JpZ2luID09PSAnc3RyaW5nJykgb3JpZ2luID0gb2JqW29yaWdpbl1cclxuXHRmb3IgKHZhciBuYW1lIGluIG9iaikge1xyXG5cdFx0aWYgKG5hbWUgPT09ICdlbScpIGNvbnRpbnVlXHJcblx0XHRyZXNbbmFtZV0gPSBvYmpbbmFtZV0gLSBvcmlnaW5cclxuXHR9XHJcblx0cmV0dXJuIHJlc1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaXJzdFRvcChpRGF0YSkge1xyXG5cdHZhciBsID0gaURhdGEuaGVpZ2h0XHJcblx0dmFyIGRhdGEgPSBpRGF0YS5kYXRhXHJcblx0Zm9yICh2YXIgaSA9IDM7IGkgPCBkYXRhLmxlbmd0aDsgaSs9NCkge1xyXG5cdFx0aWYgKGRhdGFbaV0gIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoKGkgLSAzKSAqLjI1IC8gbClcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpcnN0Qm90dG9tKGlEYXRhKSB7XHJcblx0dmFyIGwgPSBpRGF0YS5oZWlnaHRcclxuXHR2YXIgZGF0YSA9IGlEYXRhLmRhdGFcclxuXHRmb3IgKHZhciBpID0gZGF0YS5sZW5ndGggLSAxOyBpID4gMDsgaSAtPSA0KSB7XHJcblx0XHRpZiAoZGF0YVtpXSAhPT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5mbG9vcigoaSAtIDMpICouMjUgLyBsKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcblxudmFyIEZvbnQgPSByZXF1aXJlKCdjc3MtZm9udCcpXG52YXIgcGljayA9IHJlcXVpcmUoJ3BpY2stYnktYWxpYXMnKVxudmFyIGNyZWF0ZVJlZ2wgPSByZXF1aXJlKCdyZWdsJylcbnZhciBjcmVhdGVHbCA9IHJlcXVpcmUoJ2dsLXV0aWwvY29udGV4dCcpXG52YXIgV2Vha01hcCA9IHJlcXVpcmUoJ2VzNi13ZWFrLW1hcCcpXG52YXIgcmdiYSA9IHJlcXVpcmUoJ2NvbG9yLW5vcm1hbGl6ZScpXG52YXIgZm9udEF0bGFzID0gcmVxdWlyZSgnZm9udC1hdGxhcycpXG52YXIgcG9vbCA9IHJlcXVpcmUoJ3R5cGVkYXJyYXktcG9vbCcpXG52YXIgcGFyc2VSZWN0ID0gcmVxdWlyZSgncGFyc2UtcmVjdCcpXG52YXIgaXNPYmogPSByZXF1aXJlKCdpcy1wbGFpbi1vYmonKVxudmFyIHBhcnNlVW5pdCA9IHJlcXVpcmUoJ3BhcnNlLXVuaXQnKVxudmFyIHB4ID0gcmVxdWlyZSgndG8tcHgnKVxudmFyIGtlcm5pbmcgPSByZXF1aXJlKCdkZXRlY3Qta2VybmluZycpXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpXG52YXIgbWV0cmljcyA9IHJlcXVpcmUoJ2ZvbnQtbWVhc3VyZScpXG52YXIgZmxhdHRlbiA9IHJlcXVpcmUoJ2ZsYXR0ZW4tdmVydGV4LWRhdGEnKVxudmFyIHJlZiA9IHJlcXVpcmUoJ2JpdC10d2lkZGxlJyk7XG52YXIgbmV4dFBvdzIgPSByZWYubmV4dFBvdzI7XG5cbnZhciBzaGFkZXJDYWNoZSA9IG5ldyBXZWFrTWFwXG5cblxuLy8gU2FmYXJpIGRvZXMgbm90IHN1cHBvcnQgZm9udC1zdHJldGNoXG52YXIgaXNTdHJldGNoU3VwcG9ydGVkID0gZmFsc2VcbmlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICBlbC5zdHlsZS5mb250ID0gJ2l0YWxpYyBzbWFsbC1jYXBzIGJvbGQgY29uZGVuc2VkIDE2cHgvMiBjdXJzaXZlJ1xuICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGVsKS5mb250U3RyZXRjaCkge1xuICAgICAgICBpc1N0cmV0Y2hTdXBwb3J0ZWQgPSB0cnVlXG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWwpXG59XG5cbnZhciBHbFRleHQgPSBmdW5jdGlvbiBHbFRleHQgKG8pIHtcblx0aWYgKGlzUmVnbChvKSkge1xuXHRcdG8gPSB7cmVnbDogb31cblx0XHR0aGlzLmdsID0gby5yZWdsLl9nbFxuXHR9XG5cdGVsc2Uge1xuXHRcdHRoaXMuZ2wgPSBjcmVhdGVHbChvKVxuXHR9XG5cblx0dGhpcy5zaGFkZXIgPSBzaGFkZXJDYWNoZS5nZXQodGhpcy5nbClcblxuXHRpZiAoIXRoaXMuc2hhZGVyKSB7XG5cdFx0dGhpcy5yZWdsID0gby5yZWdsIHx8IGNyZWF0ZVJlZ2woeyBnbDogdGhpcy5nbCB9KVxuXHR9XG5cdGVsc2Uge1xuXHRcdHRoaXMucmVnbCA9IHRoaXMuc2hhZGVyLnJlZ2xcblx0fVxuXG5cdHRoaXMuY2hhckJ1ZmZlciA9IHRoaXMucmVnbC5idWZmZXIoeyB0eXBlOiAndWludDgnLCB1c2FnZTogJ3N0cmVhbScgfSlcblx0dGhpcy5zaXplQnVmZmVyID0gdGhpcy5yZWdsLmJ1ZmZlcih7IHR5cGU6ICdmbG9hdCcsIHVzYWdlOiAnc3RyZWFtJyB9KVxuXG5cdGlmICghdGhpcy5zaGFkZXIpIHtcblx0XHR0aGlzLnNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKClcblx0XHRzaGFkZXJDYWNoZS5zZXQodGhpcy5nbCwgdGhpcy5zaGFkZXIpXG5cdH1cblxuXHR0aGlzLmJhdGNoID0gW11cblxuXHQvLyBtdWx0aXBsZSBvcHRpb25zIGluaXRpYWwgc3RhdGVcblx0dGhpcy5mb250U2l6ZSA9IFtdXG5cdHRoaXMuZm9udCA9IFtdXG5cdHRoaXMuZm9udEF0bGFzID0gW11cblxuXHR0aGlzLmRyYXcgPSB0aGlzLnNoYWRlci5kcmF3LmJpbmQodGhpcylcblx0dGhpcy5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gRklYTUU6IGFkZCBTYWZhcmkgcmVnbCByZXBvcnQgaGVyZTpcblx0XHQvLyBjaGFyQnVmZmVyIGFuZCB3aWR0aCBqdXN0IGRvIG5vdCB0cmlnZ2VyXG5cdFx0dGhpcy5yZWdsLl9yZWZyZXNoKClcblx0XHR0aGlzLmRyYXcodGhpcy5iYXRjaClcblx0fVxuXHR0aGlzLmNhbnZhcyA9IHRoaXMuZ2wuY2FudmFzXG5cblx0dGhpcy51cGRhdGUoaXNPYmoobykgPyBvIDoge30pXG59O1xuXG5HbFRleHQucHJvdG90eXBlLmNyZWF0ZVNoYWRlciA9IGZ1bmN0aW9uIGNyZWF0ZVNoYWRlciAoKSB7XG5cdHZhciByZWdsID0gdGhpcy5yZWdsXG5cblx0Ly8gRklYTUU6IHN0b3JlIDIgc2hhZGVyIHZlcnNpb25zOiB3aXRoIG5vcm1hbCB2aWV3cG9ydCBhbmQgd2l0aG91dFxuXHQvLyBkcmF3IHRleHR1cmUgbWV0aG9kXG5cdHZhciBkcmF3ID0gcmVnbCh7XG5cdFx0YmxlbmQ6IHtcblx0XHRcdGVuYWJsZTogdHJ1ZSxcblx0XHRcdGNvbG9yOiBbMCwwLDAsMV0sXG5cblx0XHRcdGZ1bmM6IHtcblx0XHRcdFx0c3JjUkdCOiAnc3JjIGFscGhhJyxcblx0XHRcdFx0ZHN0UkdCOiAnb25lIG1pbnVzIHNyYyBhbHBoYScsXG5cdFx0XHRcdHNyY0FscGhhOiAnb25lIG1pbnVzIGRzdCBhbHBoYScsXG5cdFx0XHRcdGRzdEFscGhhOiAnb25lJ1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0c3RlbmNpbDoge2VuYWJsZTogZmFsc2V9LFxuXHRcdGRlcHRoOiB7ZW5hYmxlOiBmYWxzZX0sXG5cblx0XHRjb3VudDogcmVnbC5wcm9wKCdjb3VudCcpLFxuXHRcdG9mZnNldDogcmVnbC5wcm9wKCdvZmZzZXQnKSxcblx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRjaGFyT2Zmc2V0OiB7XG5cdFx0XHRcdG9mZnNldDogNCxcblx0XHRcdFx0c3RyaWRlOiA4LFxuXHRcdFx0XHRidWZmZXI6IHJlZ2wudGhpcygnc2l6ZUJ1ZmZlcicpXG5cdFx0XHR9LFxuXHRcdFx0d2lkdGg6IHtcblx0XHRcdFx0b2Zmc2V0OiAwLFxuXHRcdFx0XHRzdHJpZGU6IDgsXG5cdFx0XHRcdGJ1ZmZlcjogcmVnbC50aGlzKCdzaXplQnVmZmVyJylcblx0XHRcdH0sXG5cdFx0XHRjaGFyOiByZWdsLnRoaXMoJ2NoYXJCdWZmZXInKSxcblx0XHRcdHBvc2l0aW9uOiByZWdsLnRoaXMoJ3Bvc2l0aW9uJylcblx0XHR9LFxuXHRcdHVuaWZvcm1zOiB7XG5cdFx0XHRhdGxhc1NpemU6IGZ1bmN0aW9uIChjLCBwKSB7IHJldHVybiBbcC5hdGxhcy53aWR0aCwgcC5hdGxhcy5oZWlnaHRdOyB9LFxuXHRcdFx0YXRsYXNEaW06IGZ1bmN0aW9uIChjLCBwKSB7IHJldHVybiBbcC5hdGxhcy5jb2xzLCBwLmF0bGFzLnJvd3NdOyB9LFxuXHRcdFx0YXRsYXM6IGZ1bmN0aW9uIChjLCBwKSB7IHJldHVybiBwLmF0bGFzLnRleHR1cmU7IH0sXG5cdFx0XHRjaGFyU3RlcDogZnVuY3Rpb24gKGMsIHApIHsgcmV0dXJuIHAuYXRsYXMuc3RlcDsgfSxcblx0XHRcdGVtOiBmdW5jdGlvbiAoYywgcCkgeyByZXR1cm4gcC5hdGxhcy5lbTsgfSxcblx0XHRcdGNvbG9yOiByZWdsLnByb3AoJ2NvbG9yJyksXG5cdFx0XHRvcGFjaXR5OiByZWdsLnByb3AoJ29wYWNpdHknKSxcblx0XHRcdHZpZXdwb3J0OiByZWdsLnRoaXMoJ3ZpZXdwb3J0QXJyYXknKSxcblx0XHRcdHNjYWxlOiByZWdsLnRoaXMoJ3NjYWxlJyksXG5cdFx0XHRhbGlnbjogcmVnbC5wcm9wKCdhbGlnbicpLFxuXHRcdFx0YmFzZWxpbmU6IHJlZ2wucHJvcCgnYmFzZWxpbmUnKSxcblx0XHRcdHRyYW5zbGF0ZTogcmVnbC50aGlzKCd0cmFuc2xhdGUnKSxcblx0XHRcdHBvc2l0aW9uT2Zmc2V0OiByZWdsLnByb3AoJ3Bvc2l0aW9uT2Zmc2V0Jylcblx0XHR9LFxuXHRcdHByaW1pdGl2ZTogJ3BvaW50cycsXG5cdFx0dmlld3BvcnQ6IHJlZ2wudGhpcygndmlld3BvcnQnKSxcblxuXHRcdHZlcnQ6IChcIlxcblxcdFxcdFxcdHByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5cXHRcXHRcXHRhdHRyaWJ1dGUgZmxvYXQgd2lkdGgsIGNoYXJPZmZzZXQsIGNoYXI7XFxuXFx0XFx0XFx0YXR0cmlidXRlIHZlYzIgcG9zaXRpb247XFxuXFx0XFx0XFx0dW5pZm9ybSBmbG9hdCBmb250U2l6ZSwgY2hhclN0ZXAsIGVtLCBhbGlnbiwgYmFzZWxpbmU7XFxuXFx0XFx0XFx0dW5pZm9ybSB2ZWM0IHZpZXdwb3J0O1xcblxcdFxcdFxcdHVuaWZvcm0gdmVjNCBjb2xvcjtcXG5cXHRcXHRcXHR1bmlmb3JtIHZlYzIgYXRsYXNTaXplLCBhdGxhc0RpbSwgc2NhbGUsIHRyYW5zbGF0ZSwgcG9zaXRpb25PZmZzZXQ7XFxuXFx0XFx0XFx0dmFyeWluZyB2ZWMyIGNoYXJDb29yZCwgY2hhcklkO1xcblxcdFxcdFxcdHZhcnlpbmcgZmxvYXQgY2hhcldpZHRoO1xcblxcdFxcdFxcdHZhcnlpbmcgdmVjNCBmb250Q29sb3I7XFxuXFx0XFx0XFx0dm9pZCBtYWluICgpIHtcXG5cXHRcXHRcXHRcXHRcIiArICghR2xUZXh0Lm5vcm1hbFZpZXdwb3J0ID8gJ3ZlYzIgcG9zaXRpb25PZmZzZXQgPSB2ZWMyKHBvc2l0aW9uT2Zmc2V0LngsLSBwb3NpdGlvbk9mZnNldC55KTsnIDogJycpICsgXCJcXG5cXG5cXHRcXHRcXHRcXHR2ZWMyIG9mZnNldCA9IGZsb29yKGVtICogKHZlYzIoYWxpZ24gKyBjaGFyT2Zmc2V0LCBiYXNlbGluZSlcXG5cXHRcXHRcXHRcXHRcXHQrIHBvc2l0aW9uT2Zmc2V0KSlcXG5cXHRcXHRcXHRcXHRcXHQvICh2aWV3cG9ydC56dyAqIHNjYWxlLnh5KTtcXG5cXG5cXHRcXHRcXHRcXHR2ZWMyIHBvc2l0aW9uID0gKHBvc2l0aW9uICsgdHJhbnNsYXRlKSAqIHNjYWxlO1xcblxcdFxcdFxcdFxcdHBvc2l0aW9uICs9IG9mZnNldCAqIHNjYWxlO1xcblxcblxcdFxcdFxcdFxcdFwiICsgKEdsVGV4dC5ub3JtYWxWaWV3cG9ydCA/ICdwb3NpdGlvbi55ID0gMS4gLSBwb3NpdGlvbi55OycgOiAnJykgKyBcIlxcblxcblxcdFxcdFxcdFxcdGNoYXJDb29yZCA9IHBvc2l0aW9uICogdmlld3BvcnQuencgKyB2aWV3cG9ydC54eTtcXG5cXG5cXHRcXHRcXHRcXHRnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24gKiAyLiAtIDEuLCAwLCAxKTtcXG5cXG5cXHRcXHRcXHRcXHRnbF9Qb2ludFNpemUgPSBjaGFyU3RlcDtcXG5cXG5cXHRcXHRcXHRcXHRjaGFySWQueCA9IG1vZChjaGFyLCBhdGxhc0RpbS54KTtcXG5cXHRcXHRcXHRcXHRjaGFySWQueSA9IGZsb29yKGNoYXIgLyBhdGxhc0RpbS54KTtcXG5cXG5cXHRcXHRcXHRcXHRjaGFyV2lkdGggPSB3aWR0aCAqIGVtO1xcblxcblxcdFxcdFxcdFxcdGZvbnRDb2xvciA9IGNvbG9yIC8gMjU1LjtcXG5cXHRcXHRcXHR9XCIpLFxuXG5cdFx0ZnJhZzogXCJcXG5cXHRcXHRcXHRwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuXFx0XFx0XFx0dW5pZm9ybSBzYW1wbGVyMkQgYXRsYXM7XFxuXFx0XFx0XFx0dW5pZm9ybSBmbG9hdCBmb250U2l6ZSwgY2hhclN0ZXAsIG9wYWNpdHk7XFxuXFx0XFx0XFx0dW5pZm9ybSB2ZWMyIGF0bGFzU2l6ZTtcXG5cXHRcXHRcXHR1bmlmb3JtIHZlYzQgdmlld3BvcnQ7XFxuXFx0XFx0XFx0dmFyeWluZyB2ZWM0IGZvbnRDb2xvcjtcXG5cXHRcXHRcXHR2YXJ5aW5nIHZlYzIgY2hhckNvb3JkLCBjaGFySWQ7XFxuXFx0XFx0XFx0dmFyeWluZyBmbG9hdCBjaGFyV2lkdGg7XFxuXFxuXFx0XFx0XFx0ZmxvYXQgbGlnaHRuZXNzKHZlYzQgY29sb3IpIHtcXG5cXHRcXHRcXHRcXHRyZXR1cm4gY29sb3IuciAqIDAuMjk5ICsgY29sb3IuZyAqIDAuNTg3ICsgY29sb3IuYiAqIDAuMTE0O1xcblxcdFxcdFxcdH1cXG5cXG5cXHRcXHRcXHR2b2lkIG1haW4gKCkge1xcblxcdFxcdFxcdFxcdHZlYzIgdXYgPSBnbF9GcmFnQ29vcmQueHkgLSBjaGFyQ29vcmQgKyBjaGFyU3RlcCAqIC41O1xcblxcdFxcdFxcdFxcdGZsb2F0IGhhbGZDaGFyU3RlcCA9IGZsb29yKGNoYXJTdGVwICogLjUgKyAuNSk7XFxuXFxuXFx0XFx0XFx0XFx0Ly8gaW52ZXJ0IHkgYW5kIHNoaWZ0IGJ5IDFweCAoRkYgZXhwZWNpYWxseSBuZWVkcyB0aGF0KVxcblxcdFxcdFxcdFxcdHV2LnkgPSBjaGFyU3RlcCAtIHV2Lnk7XFxuXFxuXFx0XFx0XFx0XFx0Ly8gaWdub3JlIHBvaW50cyBvdXRzaWRlIG9mIGNoYXJhY3RlciBib3VuZGluZyBib3hcXG5cXHRcXHRcXHRcXHRmbG9hdCBoYWxmQ2hhcldpZHRoID0gY2VpbChjaGFyV2lkdGggKiAuNSk7XFxuXFx0XFx0XFx0XFx0aWYgKGZsb29yKHV2LngpID4gaGFsZkNoYXJTdGVwICsgaGFsZkNoYXJXaWR0aCB8fFxcblxcdFxcdFxcdFxcdFxcdGZsb29yKHV2LngpIDwgaGFsZkNoYXJTdGVwIC0gaGFsZkNoYXJXaWR0aCkgcmV0dXJuO1xcblxcblxcdFxcdFxcdFxcdHV2ICs9IGNoYXJJZCAqIGNoYXJTdGVwO1xcblxcdFxcdFxcdFxcdHV2ID0gdXYgLyBhdGxhc1NpemU7XFxuXFxuXFx0XFx0XFx0XFx0dmVjNCBjb2xvciA9IGZvbnRDb2xvcjtcXG5cXHRcXHRcXHRcXHR2ZWM0IG1hc2sgPSB0ZXh0dXJlMkQoYXRsYXMsIHV2KTtcXG5cXG5cXHRcXHRcXHRcXHRmbG9hdCBtYXNrWSA9IGxpZ2h0bmVzcyhtYXNrKTtcXG5cXHRcXHRcXHRcXHQvLyBmbG9hdCBjb2xvclkgPSBsaWdodG5lc3MoY29sb3IpO1xcblxcdFxcdFxcdFxcdGNvbG9yLmEgKj0gbWFza1k7XFxuXFx0XFx0XFx0XFx0Y29sb3IuYSAqPSBvcGFjaXR5O1xcblxcblxcdFxcdFxcdFxcdC8vIGNvbG9yLmEgKz0gLjE7XFxuXFxuXFx0XFx0XFx0XFx0Ly8gYW50aWFsaWFzaW5nLCBzZWUgeWlxIGNvbG9yIHNwYWNlIHktY2hhbm5lbCBmb3JtdWxhXFxuXFx0XFx0XFx0XFx0Ly8gY29sb3IucmdiICs9ICgxLiAtIGNvbG9yLnJnYikgKiAoMS4gLSBtYXNrLnJnYik7XFxuXFxuXFx0XFx0XFx0XFx0Z2xfRnJhZ0NvbG9yID0gY29sb3I7XFxuXFx0XFx0XFx0fVwiXG5cdH0pXG5cblx0Ly8gcGVyIGZvbnQtc2l6ZSBhdGxhc1xuXHR2YXIgYXRsYXMgPSB7fVxuXG5cdHJldHVybiB7IHJlZ2w6IHJlZ2wsIGRyYXc6IGRyYXcsIGF0bGFzOiBhdGxhcyB9XG59O1xuXG5HbFRleHQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAobykge1xuXHRcdHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdGlmICh0eXBlb2YgbyA9PT0gJ3N0cmluZycpIHsgbyA9IHsgdGV4dDogbyB9IH1cblx0ZWxzZSBpZiAoIW8pIHsgcmV0dXJuIH1cblxuXHQvLyBGSVhNRTogbWFrZSB0aGlzIGEgc3RhdGljIHRyYW5zZm9ybSBvciBtb3JlIGdlbmVyYWwgYXBwcm9hY3Rcblx0byA9IHBpY2sobywge1xuXHRcdHBvc2l0aW9uOiAncG9zaXRpb24gcG9zaXRpb25zIGNvb3JkIGNvb3JkcyBjb29yZGluYXRlcycsXG5cdFx0Zm9udDogJ2ZvbnQgZm9udEZhY2UgZm9udGZhY2UgdHlwZWZhY2UgY3NzRm9udCBjc3MtZm9udCBmYW1pbHkgZm9udEZhbWlseScsXG5cdFx0Zm9udFNpemU6ICdmb250U2l6ZSBmb250c2l6ZSBzaXplIGZvbnQtc2l6ZScsXG5cdFx0dGV4dDogJ3RleHQgdGV4dHMgY2hhcnMgY2hhcmFjdGVycyB2YWx1ZSB2YWx1ZXMgc3ltYm9scycsXG5cdFx0YWxpZ246ICdhbGlnbiBhbGlnbm1lbnQgdGV4dEFsaWduIHRleHRiYXNlbGluZScsXG5cdFx0YmFzZWxpbmU6ICdiYXNlbGluZSB0ZXh0QmFzZWxpbmUgdGV4dGJhc2VsaW5lJyxcblx0XHRkaXJlY3Rpb246ICdkaXIgZGlyZWN0aW9uIHRleHREaXJlY3Rpb24nLFxuXHRcdGNvbG9yOiAnY29sb3IgY29sb3VyIGZpbGwgZmlsbC1jb2xvciBmaWxsQ29sb3IgdGV4dENvbG9yIHRleHRjb2xvcicsXG5cdFx0a2VybmluZzogJ2tlcm5pbmcga2VybicsXG5cdFx0cmFuZ2U6ICdyYW5nZSBkYXRhQm94Jyxcblx0XHR2aWV3cG9ydDogJ3ZwIHZpZXdwb3J0IHZpZXdCb3ggdmlld2JveCB2aWV3UG9ydCcsXG5cdFx0b3BhY2l0eTogJ29wYWNpdHkgYWxwaGEgdHJhbnNwYXJlbmN5IHZpc2libGUgdmlzaWJpbGl0eSBvcGFxdWUnLFxuXHRcdG9mZnNldDogJ29mZnNldCBwb3NpdGlvbk9mZnNldCBwYWRkaW5nIHNoaWZ0IGluZGVudCBpbmRlbnRhdGlvbidcblx0fSwgdHJ1ZSlcblxuXG5cdGlmIChvLm9wYWNpdHkgIT0gbnVsbCkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KG8ub3BhY2l0eSkpIHtcblx0XHRcdHRoaXMub3BhY2l0eSA9IG8ub3BhY2l0eS5tYXAoZnVuY3Rpb24gKG8pIHsgcmV0dXJuIHBhcnNlRmxvYXQobyk7IH0pXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5vcGFjaXR5ID0gcGFyc2VGbG9hdChvLm9wYWNpdHkpXG5cdFx0fVxuXHR9XG5cblx0aWYgKG8udmlld3BvcnQgIT0gbnVsbCkge1xuXHRcdHRoaXMudmlld3BvcnQgPSBwYXJzZVJlY3Qoby52aWV3cG9ydClcblxuXHRcdGlmIChHbFRleHQubm9ybWFsVmlld3BvcnQpIHtcblx0XHRcdHRoaXMudmlld3BvcnQueSA9IHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMudmlld3BvcnQueSAtIHRoaXMudmlld3BvcnQuaGVpZ2h0XG5cdFx0fVxuXG5cdFx0dGhpcy52aWV3cG9ydEFycmF5ID0gW3RoaXMudmlld3BvcnQueCwgdGhpcy52aWV3cG9ydC55LCB0aGlzLnZpZXdwb3J0LndpZHRoLCB0aGlzLnZpZXdwb3J0LmhlaWdodF1cblxuXHR9XG5cdGlmICh0aGlzLnZpZXdwb3J0ID09IG51bGwpIHtcblx0XHR0aGlzLnZpZXdwb3J0ID0ge1xuXHRcdFx0eDogMCwgeTogMCxcblx0XHRcdHdpZHRoOiB0aGlzLmdsLmRyYXdpbmdCdWZmZXJXaWR0aCxcblx0XHRcdGhlaWdodDogdGhpcy5nbC5kcmF3aW5nQnVmZmVySGVpZ2h0XG5cdFx0fVxuXHRcdHRoaXMudmlld3BvcnRBcnJheSA9IFt0aGlzLnZpZXdwb3J0LngsIHRoaXMudmlld3BvcnQueSwgdGhpcy52aWV3cG9ydC53aWR0aCwgdGhpcy52aWV3cG9ydC5oZWlnaHRdXG5cdH1cblxuXHRpZiAoby5rZXJuaW5nICE9IG51bGwpIHsgdGhpcy5rZXJuaW5nID0gby5rZXJuaW5nIH1cblxuXHRpZiAoby5vZmZzZXQgIT0gbnVsbCkge1xuXHRcdGlmICh0eXBlb2Ygby5vZmZzZXQgPT09ICdudW1iZXInKSB7IG8ub2Zmc2V0ID0gW28ub2Zmc2V0LCAwXSB9XG5cblx0XHR0aGlzLnBvc2l0aW9uT2Zmc2V0ID0gZmxhdHRlbihvLm9mZnNldClcblx0fVxuXG5cdGlmIChvLmRpcmVjdGlvbikgeyB0aGlzLmRpcmVjdGlvbiA9IG8uZGlyZWN0aW9uIH1cblxuXHRpZiAoby5yYW5nZSkge1xuXHRcdHRoaXMucmFuZ2UgPSBvLnJhbmdlXG5cdFx0dGhpcy5zY2FsZSA9IFsxIC8gKG8ucmFuZ2VbMl0gLSBvLnJhbmdlWzBdKSwgMSAvIChvLnJhbmdlWzNdIC0gby5yYW5nZVsxXSldXG5cdFx0dGhpcy50cmFuc2xhdGUgPSBbLW8ucmFuZ2VbMF0sIC1vLnJhbmdlWzFdXVxuXHR9XG5cdGlmIChvLnNjYWxlKSB7IHRoaXMuc2NhbGUgPSBvLnNjYWxlIH1cblx0aWYgKG8udHJhbnNsYXRlKSB7IHRoaXMudHJhbnNsYXRlID0gby50cmFuc2xhdGUgfVxuXG5cdC8vIGRlZmF1bHQgc2NhbGUgY29ycmVzcG9uZHMgdG8gdmlld3BvcnRcblx0aWYgKCF0aGlzLnNjYWxlKSB7IHRoaXMuc2NhbGUgPSBbMSAvIHRoaXMudmlld3BvcnQud2lkdGgsIDEgLyB0aGlzLnZpZXdwb3J0LmhlaWdodF0gfVxuXG5cdGlmICghdGhpcy50cmFuc2xhdGUpIHsgdGhpcy50cmFuc2xhdGUgPSBbMCwgMF0gfVxuXG5cdGlmICghdGhpcy5mb250Lmxlbmd0aCAmJiAhby5mb250KSB7IG8uZm9udCA9IEdsVGV4dC5iYXNlRm9udFNpemUgKyAncHggc2Fucy1zZXJpZicgfVxuXG5cdC8vIG5vcm1hbGl6ZSBmb250IGNhY2hpbmcgc3RyaW5nXG5cdHZhciBuZXdGb250ID0gZmFsc2UsIG5ld0ZvbnRTaXplID0gZmFsc2VcblxuXHQvLyBvYnRhaW4gbmV3IGZvbnQgZGF0YVxuXHRpZiAoby5mb250KSB7XG5cdFx0KEFycmF5LmlzQXJyYXkoby5mb250KSA/IG8uZm9udCA6IFtvLmZvbnRdKS5mb3JFYWNoKGZ1bmN0aW9uIChmb250LCBpKSB7XG5cdFx0XHQvLyBub3JtYWxpemUgZm9udFxuXHRcdFx0aWYgKHR5cGVvZiBmb250ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZvbnQgPSBGb250LnBhcnNlKGZvbnQpXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRmb250ID0gRm9udC5wYXJzZShHbFRleHQuYmFzZUZvbnRTaXplICsgJ3B4ICcgKyBmb250KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHsgZm9udCA9IEZvbnQucGFyc2UoRm9udC5zdHJpbmdpZnkoZm9udCkpIH1cblxuXHRcdFx0dmFyIGJhc2VTdHJpbmcgPSBGb250LnN0cmluZ2lmeSh7XG5cdFx0XHRcdHNpemU6IEdsVGV4dC5iYXNlRm9udFNpemUsXG5cdFx0XHRcdGZhbWlseTogZm9udC5mYW1pbHksXG5cdFx0XHRcdHN0cmV0Y2g6IGlzU3RyZXRjaFN1cHBvcnRlZCA/IGZvbnQuc3RyZXRjaCA6IHVuZGVmaW5lZCxcblx0XHRcdFx0dmFyaWFudDogZm9udC52YXJpYW50LFxuXHRcdFx0XHR3ZWlnaHQ6IGZvbnQud2VpZ2h0LFxuXHRcdFx0XHRzdHlsZTogZm9udC5zdHlsZVxuXHRcdFx0fSlcblxuXHRcdFx0dmFyIHVuaXQgPSBwYXJzZVVuaXQoZm9udC5zaXplKVxuXHRcdFx0dmFyIGZzID0gTWF0aC5yb3VuZCh1bml0WzBdICogcHgodW5pdFsxXSkpXG5cdFx0XHRpZiAoZnMgIT09IHRoaXMkMS5mb250U2l6ZVtpXSkge1xuXHRcdFx0XHRuZXdGb250U2l6ZSA9IHRydWVcblx0XHRcdFx0dGhpcyQxLmZvbnRTaXplW2ldID0gZnNcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2FsYyBuZXcgZm9udCBtZXRyaWNzL2F0bGFzXG5cdFx0XHRpZiAoIXRoaXMkMS5mb250W2ldIHx8IGJhc2VTdHJpbmcgIT0gdGhpcyQxLmZvbnRbaV0uYmFzZVN0cmluZykge1xuXHRcdFx0XHRuZXdGb250ID0gdHJ1ZVxuXG5cdFx0XHRcdC8vIG9idGFpbiBmb250IGNhY2hlIG9yIGNyZWF0ZSBvbmVcblx0XHRcdFx0dGhpcyQxLmZvbnRbaV0gPSBHbFRleHQuZm9udHNbYmFzZVN0cmluZ11cblx0XHRcdFx0aWYgKCF0aGlzJDEuZm9udFtpXSkge1xuXHRcdFx0XHRcdHZhciBmYW1pbHkgPSBmb250LmZhbWlseS5qb2luKCcsICcpXG5cdFx0XHRcdFx0dmFyIHN0eWxlID0gW2ZvbnQuc3R5bGVdXG5cdFx0XHRcdFx0aWYgKGZvbnQuc3R5bGUgIT0gZm9udC52YXJpYW50KSB7IHN0eWxlLnB1c2goZm9udC52YXJpYW50KSB9XG5cdFx0XHRcdFx0aWYgKGZvbnQudmFyaWFudCAhPSBmb250LndlaWdodCkgeyBzdHlsZS5wdXNoKGZvbnQud2VpZ2h0KSB9XG5cdFx0XHRcdFx0aWYgKGlzU3RyZXRjaFN1cHBvcnRlZCAmJiBmb250LndlaWdodCAhPSBmb250LnN0cmV0Y2gpIHsgc3R5bGUucHVzaChmb250LnN0cmV0Y2gpIH1cblxuXHRcdFx0XHRcdHRoaXMkMS5mb250W2ldID0ge1xuXHRcdFx0XHRcdFx0YmFzZVN0cmluZzogYmFzZVN0cmluZyxcblxuXHRcdFx0XHRcdFx0Ly8gdHlwZWZhY2Vcblx0XHRcdFx0XHRcdGZhbWlseTogZmFtaWx5LFxuXHRcdFx0XHRcdFx0d2VpZ2h0OiBmb250LndlaWdodCxcblx0XHRcdFx0XHRcdHN0cmV0Y2g6IGZvbnQuc3RyZXRjaCxcblx0XHRcdFx0XHRcdHN0eWxlOiBmb250LnN0eWxlLFxuXHRcdFx0XHRcdFx0dmFyaWFudDogZm9udC52YXJpYW50LFxuXG5cdFx0XHRcdFx0XHQvLyB3aWR0aHMgb2YgY2hhcmFjdGVyc1xuXHRcdFx0XHRcdFx0d2lkdGg6IHt9LFxuXG5cdFx0XHRcdFx0XHQvLyBrZXJuaW4gcGFpcnMgb2Zmc2V0c1xuXHRcdFx0XHRcdFx0a2VybmluZzoge30sXG5cblx0XHRcdFx0XHRcdG1ldHJpY3M6IG1ldHJpY3MoZmFtaWx5LCB7XG5cdFx0XHRcdFx0XHRcdG9yaWdpbjogJ3RvcCcsXG5cdFx0XHRcdFx0XHRcdGZvbnRTaXplOiBHbFRleHQuYmFzZUZvbnRTaXplLFxuXHRcdFx0XHRcdFx0XHRmb250U3R5bGU6IHN0eWxlLmpvaW4oJyAnKVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRHbFRleHQuZm9udHNbYmFzZVN0cmluZ10gPSB0aGlzJDEuZm9udFtpXVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdC8vIEZJWE1FOiBtYWtlIGluZGVwZW5kZW5kIGZvbnQtc2l6ZVxuXHQvLyBpZiAoby5mb250U2l6ZSkge1xuXHQvLyBsZXQgdW5pdCA9IHBhcnNlVW5pdChvLmZvbnRTaXplKVxuXHQvLyBsZXQgZnMgPSBNYXRoLnJvdW5kKHVuaXRbMF0gKiBweCh1bml0WzFdKSlcblxuXHQvLyBpZiAoZnMgIT0gdGhpcy5mb250U2l6ZSkge1xuXHQvLyBcdG5ld0ZvbnRTaXplID0gdHJ1ZVxuXHQvLyBcdHRoaXMuZm9udFNpemUgPSBmc1xuXHQvLyB9XG5cdC8vIH1cblxuXHRpZiAobmV3Rm9udCB8fCBuZXdGb250U2l6ZSkge1xuXHRcdHRoaXMuZm9udC5mb3JFYWNoKGZ1bmN0aW9uIChmb250LCBpKSB7XG5cdFx0XHR2YXIgZm9udFN0cmluZyA9IEZvbnQuc3RyaW5naWZ5KHtcblx0XHRcdFx0c2l6ZTogdGhpcyQxLmZvbnRTaXplW2ldLFxuXHRcdFx0XHRmYW1pbHk6IGZvbnQuZmFtaWx5LFxuXHRcdFx0XHRzdHJldGNoOiBpc1N0cmV0Y2hTdXBwb3J0ZWQgPyBmb250LnN0cmV0Y2ggOiB1bmRlZmluZWQsXG5cdFx0XHRcdHZhcmlhbnQ6IGZvbnQudmFyaWFudCxcblx0XHRcdFx0d2VpZ2h0OiBmb250LndlaWdodCxcblx0XHRcdFx0c3R5bGU6IGZvbnQuc3R5bGVcblx0XHRcdH0pXG5cblx0XHRcdC8vIGNhbGMgbmV3IGZvbnQgc2l6ZSBhdGxhc1xuXHRcdFx0dGhpcyQxLmZvbnRBdGxhc1tpXSA9IHRoaXMkMS5zaGFkZXIuYXRsYXNbZm9udFN0cmluZ11cblxuXHRcdFx0aWYgKCF0aGlzJDEuZm9udEF0bGFzW2ldKSB7XG5cdFx0XHRcdHZhciBtZXRyaWNzID0gZm9udC5tZXRyaWNzXG5cblx0XHRcdFx0dGhpcyQxLnNoYWRlci5hdGxhc1tmb250U3RyaW5nXSA9XG5cdFx0XHRcdHRoaXMkMS5mb250QXRsYXNbaV0gPSB7XG5cdFx0XHRcdFx0Zm9udFN0cmluZzogZm9udFN0cmluZyxcblx0XHRcdFx0XHQvLyBldmVuIHN0ZXAgaXMgYmV0dGVyIGZvciByZW5kZXJlZCBjaGFyYWN0ZXJzXG5cdFx0XHRcdFx0c3RlcDogTWF0aC5jZWlsKHRoaXMkMS5mb250U2l6ZVtpXSAqIG1ldHJpY3MuYm90dG9tICogLjUpICogMixcblx0XHRcdFx0XHRlbTogdGhpcyQxLmZvbnRTaXplW2ldLFxuXHRcdFx0XHRcdGNvbHM6IDAsXG5cdFx0XHRcdFx0cm93czogMCxcblx0XHRcdFx0XHRoZWlnaHQ6IDAsXG5cdFx0XHRcdFx0d2lkdGg6IDAsXG5cdFx0XHRcdFx0Y2hhcnM6IFtdLFxuXHRcdFx0XHRcdGlkczoge30sXG5cdFx0XHRcdFx0dGV4dHVyZTogdGhpcyQxLnJlZ2wudGV4dHVyZSgpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gYnVtcCBhdGxhcyBjaGFyYWN0ZXJzXG5cdFx0XHRpZiAoby50ZXh0ID09IG51bGwpIHsgby50ZXh0ID0gdGhpcyQxLnRleHQgfVxuXHRcdH0pXG5cdH1cblxuXHQvLyBpZiBtdWx0aXBsZSBwb3NpdGlvbnMgLSBkdXBsaWNhdGUgdGV4dCBhcmd1bWVudHNcblx0Ly8gRklYTUU6IHRoaXMgcG9zc2libHkgY2FuIGJlIGRvbmUgYmV0dGVyIHRvIGF2b2lkIGFycmF5IHNwYXduXG5cdGlmICh0eXBlb2Ygby50ZXh0ID09PSAnc3RyaW5nJyAmJiBvLnBvc2l0aW9uICYmIG8ucG9zaXRpb24ubGVuZ3RoID4gMikge1xuXHRcdHZhciB0ZXh0QXJyYXkgPSBBcnJheShvLnBvc2l0aW9uLmxlbmd0aCAqIC41KVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dEFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0ZXh0QXJyYXlbaV0gPSBvLnRleHRcblx0XHR9XG5cdFx0by50ZXh0ID0gdGV4dEFycmF5XG5cdH1cblxuXHQvLyBjYWxjdWxhdGUgb2Zmc2V0cyBmb3IgdGhlIG5ldyBmb250L3RleHRcblx0dmFyIG5ld0F0bGFzQ2hhcnNcblx0aWYgKG8udGV4dCAhPSBudWxsIHx8IG5ld0ZvbnQpIHtcblx0XHQvLyBGSVhNRTogaWdub3JlIHNwYWNlc1xuXHRcdC8vIHRleHQgb2Zmc2V0cyB3aXRoaW4gdGhlIHRleHQgYnVmZmVyXG5cdFx0dGhpcy50ZXh0T2Zmc2V0cyA9IFswXVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoby50ZXh0KSkge1xuXHRcdFx0dGhpcy5jb3VudCA9IG8udGV4dFswXS5sZW5ndGhcblx0XHRcdHRoaXMuY291bnRzID0gW3RoaXMuY291bnRdXG5cdFx0XHRmb3IgKHZhciBpJDEgPSAxOyBpJDEgPCBvLnRleHQubGVuZ3RoOyBpJDErKykge1xuXHRcdFx0XHR0aGlzLnRleHRPZmZzZXRzW2kkMV0gPSB0aGlzLnRleHRPZmZzZXRzW2kkMSAtIDFdICsgby50ZXh0W2kkMSAtIDFdLmxlbmd0aFxuXHRcdFx0XHR0aGlzLmNvdW50ICs9IG8udGV4dFtpJDFdLmxlbmd0aFxuXHRcdFx0XHR0aGlzLmNvdW50cy5wdXNoKG8udGV4dFtpJDFdLmxlbmd0aClcblx0XHRcdH1cblx0XHRcdHRoaXMudGV4dCA9IG8udGV4dC5qb2luKCcnKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMudGV4dCA9IG8udGV4dFxuXHRcdFx0dGhpcy5jb3VudCA9IHRoaXMudGV4dC5sZW5ndGhcblx0XHRcdHRoaXMuY291bnRzID0gW3RoaXMuY291bnRdXG5cdFx0fVxuXG5cdFx0bmV3QXRsYXNDaGFycyA9IFtdXG5cblx0XHQvLyBkZXRlY3QgJiBtZWFzdXJlIG5ldyBjaGFyYWN0ZXJzXG5cdFx0dGhpcy5mb250LmZvckVhY2goZnVuY3Rpb24gKGZvbnQsIGlkeCkge1xuXHRcdFx0R2xUZXh0LmF0bGFzQ29udGV4dC5mb250ID0gZm9udC5iYXNlU3RyaW5nXG5cblx0XHRcdHZhciBhdGxhcyA9IHRoaXMkMS5mb250QXRsYXNbaWR4XVxuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMkMS50ZXh0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBjaGFyID0gdGhpcyQxLnRleHQuY2hhckF0KGkpXG5cblx0XHRcdFx0aWYgKGF0bGFzLmlkc1tjaGFyXSA9PSBudWxsKSB7XG5cdFx0XHRcdFx0YXRsYXMuaWRzW2NoYXJdID0gYXRsYXMuY2hhcnMubGVuZ3RoXG5cdFx0XHRcdFx0YXRsYXMuY2hhcnMucHVzaChjaGFyKVxuXHRcdFx0XHRcdG5ld0F0bGFzQ2hhcnMucHVzaChjaGFyKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGZvbnQud2lkdGhbY2hhcl0gPT0gbnVsbCkge1xuXHRcdFx0XHRcdGZvbnQud2lkdGhbY2hhcl0gPSBHbFRleHQuYXRsYXNDb250ZXh0Lm1lYXN1cmVUZXh0KGNoYXIpLndpZHRoIC8gR2xUZXh0LmJhc2VGb250U2l6ZVxuXG5cdFx0XHRcdFx0Ly8gbWVhc3VyZSBrZXJuaW5nIHBhaXJzIGZvciB0aGUgbmV3IGNoYXJhY3RlclxuXHRcdFx0XHRcdGlmICh0aGlzJDEua2VybmluZykge1xuXHRcdFx0XHRcdFx0dmFyIHBhaXJzID0gW11cblx0XHRcdFx0XHRcdGZvciAodmFyIGJhc2VDaGFyIGluIGZvbnQud2lkdGgpIHtcblx0XHRcdFx0XHRcdFx0cGFpcnMucHVzaChiYXNlQ2hhciArIGNoYXIsIGNoYXIgKyBiYXNlQ2hhcilcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGV4dGVuZChmb250Lmtlcm5pbmcsIGtlcm5pbmcoZm9udC5mYW1pbHksIHtcblx0XHRcdFx0XHRcdFx0cGFpcnM6IHBhaXJzXG5cdFx0XHRcdFx0XHR9KSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0Ly8gY3JlYXRlIHNpbmdsZSBwb3NpdGlvbiBidWZmZXIgKGZhc3RlciB0aGFuIGJhdGNoIG9yIG11bHRpcGxlIHNlcGFyYXRlIGluc3RhbmNlcylcblx0aWYgKG8ucG9zaXRpb24pIHtcblx0XHRpZiAoby5wb3NpdGlvbi5sZW5ndGggPiAyKSB7XG5cdFx0XHR2YXIgZmxhdCA9ICFvLnBvc2l0aW9uWzBdLmxlbmd0aFxuXHRcdFx0dmFyIHBvc2l0aW9uRGF0YSA9IHBvb2wubWFsbG9jRmxvYXQodGhpcy5jb3VudCAqIDIpXG5cdFx0XHRmb3IgKHZhciBpJDIgPSAwLCBwdHIgPSAwOyBpJDIgPCB0aGlzLmNvdW50cy5sZW5ndGg7IGkkMisrKSB7XG5cdFx0XHRcdHZhciBjb3VudCA9IHRoaXMuY291bnRzW2kkMl1cblx0XHRcdFx0aWYgKGZsYXQpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uRGF0YVtwdHIrK10gPSBvLnBvc2l0aW9uW2kkMiAqIDJdXG5cdFx0XHRcdFx0XHRwb3NpdGlvbkRhdGFbcHRyKytdID0gby5wb3NpdGlvbltpJDIgKiAyICsgMV1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaiQxID0gMDsgaiQxIDwgY291bnQ7IGokMSsrKSB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbkRhdGFbcHRyKytdID0gby5wb3NpdGlvbltpJDJdWzBdXG5cdFx0XHRcdFx0XHRwb3NpdGlvbkRhdGFbcHRyKytdID0gby5wb3NpdGlvbltpJDJdWzFdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5wb3NpdGlvbi5jYWxsKSB7XG5cdFx0XHRcdHRoaXMucG9zaXRpb24oe1xuXHRcdFx0XHRcdHR5cGU6ICdmbG9hdCcsXG5cdFx0XHRcdFx0ZGF0YTogcG9zaXRpb25EYXRhXG5cdFx0XHRcdH0pXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnBvc2l0aW9uID0gdGhpcy5yZWdsLmJ1ZmZlcih7XG5cdFx0XHRcdFx0dHlwZTogJ2Zsb2F0Jyxcblx0XHRcdFx0XHRkYXRhOiBwb3NpdGlvbkRhdGFcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdHBvb2wuZnJlZUZsb2F0KHBvc2l0aW9uRGF0YSlcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5wb3NpdGlvbi5kZXN0cm95KSB7IHRoaXMucG9zaXRpb24uZGVzdHJveSgpIH1cblx0XHRcdHRoaXMucG9zaXRpb24gPSB7XG5cdFx0XHRcdGNvbnN0YW50OiBvLnBvc2l0aW9uXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gcG9wdWxhdGUgdGV4dC9vZmZzZXQgYnVmZmVycyBpZiBmb250L3RleHQgaGFzIGNoYW5nZWRcblx0Ly8gYXMgW2NoYXJXaWR0aCwgb2Zmc2V0LCBjaGFyV2lkdGgsIG9mZnNldC4uLl1cblx0Ly8gdGhhdCBpcyBpbiBlbSB1bml0cyBzaW5jZSBmb250LXNpemUgY2FuIGNoYW5nZSBvZnRlblxuXHRpZiAoby50ZXh0IHx8IG5ld0ZvbnQpIHtcblx0XHR2YXIgY2hhcklkcyA9IHBvb2wubWFsbG9jVWludDgodGhpcy5jb3VudClcblx0XHR2YXIgc2l6ZURhdGEgPSBwb29sLm1hbGxvY0Zsb2F0KHRoaXMuY291bnQgKiAyKVxuXHRcdHRoaXMudGV4dFdpZHRoID0gW11cblxuXHRcdGZvciAodmFyIGkkMyA9IDAsIHB0ciQxID0gMDsgaSQzIDwgdGhpcy5jb3VudHMubGVuZ3RoOyBpJDMrKykge1xuXHRcdFx0dmFyIGNvdW50JDEgPSB0aGlzLmNvdW50c1tpJDNdXG5cdFx0XHR2YXIgZm9udCA9IHRoaXMuZm9udFtpJDNdIHx8IHRoaXMuZm9udFswXVxuXHRcdFx0dmFyIGF0bGFzID0gdGhpcy5mb250QXRsYXNbaSQzXSB8fCB0aGlzLmZvbnRBdGxhc1swXVxuXG5cdFx0XHRmb3IgKHZhciBqJDIgPSAwOyBqJDIgPCBjb3VudCQxOyBqJDIrKykge1xuXHRcdFx0XHR2YXIgY2hhciA9IHRoaXMudGV4dC5jaGFyQXQocHRyJDEpXG5cdFx0XHRcdHZhciBwcmV2Q2hhciA9IHRoaXMudGV4dC5jaGFyQXQocHRyJDEgLSAxKVxuXG5cdFx0XHRcdGNoYXJJZHNbcHRyJDFdID0gYXRsYXMuaWRzW2NoYXJdXG5cdFx0XHRcdHNpemVEYXRhW3B0ciQxICogMl0gPSBmb250LndpZHRoW2NoYXJdXG5cblx0XHRcdFx0aWYgKGokMikge1xuXHRcdFx0XHRcdHZhciBwcmV2V2lkdGggPSBzaXplRGF0YVtwdHIkMSAqIDIgLSAyXVxuXHRcdFx0XHRcdHZhciBjdXJyV2lkdGggPSBzaXplRGF0YVtwdHIkMSAqIDJdXG5cdFx0XHRcdFx0dmFyIHByZXZPZmZzZXQgPSBzaXplRGF0YVtwdHIkMSAqIDIgLSAxXVxuXHRcdFx0XHRcdHZhciBvZmZzZXQgPSBwcmV2T2Zmc2V0ICsgcHJldldpZHRoICogLjUgKyBjdXJyV2lkdGggKiAuNTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmtlcm5pbmcpIHtcblx0XHRcdFx0XHRcdHZhciBrZXJuaW5nJDEgPSBmb250Lmtlcm5pbmdbcHJldkNoYXIgKyBjaGFyXVxuXHRcdFx0XHRcdFx0aWYgKGtlcm5pbmckMSkge1xuXHRcdFx0XHRcdFx0XHRvZmZzZXQgKz0ga2VybmluZyQxICogMWUtM1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNpemVEYXRhW3B0ciQxICogMiArIDFdID0gb2Zmc2V0XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0c2l6ZURhdGFbcHRyJDEgKiAyICsgMV0gPSBzaXplRGF0YVtwdHIkMSAqIDJdICogLjVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHB0ciQxKytcblx0XHRcdH1cblx0XHRcdHRoaXMudGV4dFdpZHRoLnB1c2goXG5cdFx0XHRcdCFzaXplRGF0YS5sZW5ndGggPyAwIDpcblx0XHRcdFx0Ly8gbGFzdCBvZmZzZXQgKyBoYWxmIGxhc3Qgd2lkdGhcblx0XHRcdFx0c2l6ZURhdGFbcHRyJDEgKiAyIC0gMl0gKiAuNSArIHNpemVEYXRhW3B0ciQxICogMiAtIDFdXG5cdFx0XHQpXG5cdFx0fVxuXG5cblx0XHQvLyBidW1wIHJlY2FsYyBhbGlnbiBvZmZzZXRcblx0XHRpZiAoIW8uYWxpZ24pIHsgby5hbGlnbiA9IHRoaXMuYWxpZ24gfVxuXHRcdHRoaXMuY2hhckJ1ZmZlcih7ZGF0YTogY2hhcklkcywgdHlwZTogJ3VpbnQ4JywgdXNhZ2U6ICdzdHJlYW0nfSlcblx0XHR0aGlzLnNpemVCdWZmZXIoe2RhdGE6IHNpemVEYXRhLCB0eXBlOiAnZmxvYXQnLCB1c2FnZTogJ3N0cmVhbSd9KVxuXHRcdHBvb2wuZnJlZVVpbnQ4KGNoYXJJZHMpXG5cdFx0cG9vbC5mcmVlRmxvYXQoc2l6ZURhdGEpXG5cblx0XHQvLyB1ZHBhdGUgZm9udCBhdGxhcyBhbmQgdGV4dHVyZVxuXHRcdGlmIChuZXdBdGxhc0NoYXJzLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5mb250LmZvckVhY2goZnVuY3Rpb24gKGZvbnQsIGkpIHtcblx0XHRcdFx0dmFyIGF0bGFzID0gdGhpcyQxLmZvbnRBdGxhc1tpXVxuXG5cdFx0XHRcdC8vIEZJWE1FOiBpbnNlcnQgbWV0cmljcy1iYXNlZCByYXRpbyBoZXJlXG5cdFx0XHRcdHZhciBzdGVwID0gYXRsYXMuc3RlcFxuXG5cdFx0XHRcdHZhciBtYXhDb2xzID0gTWF0aC5mbG9vcihHbFRleHQubWF4QXRsYXNTaXplIC8gc3RlcClcblx0XHRcdFx0dmFyIGNvbHMgPSBNYXRoLm1pbihtYXhDb2xzLCBhdGxhcy5jaGFycy5sZW5ndGgpXG5cdFx0XHRcdHZhciByb3dzID0gTWF0aC5jZWlsKGF0bGFzLmNoYXJzLmxlbmd0aCAvIGNvbHMpXG5cblx0XHRcdFx0dmFyIGF0bGFzV2lkdGggPSBuZXh0UG93MiggY29scyAqIHN0ZXAgKVxuXHRcdFx0XHQvLyBsZXQgYXRsYXNIZWlnaHQgPSBNYXRoLm1pbihyb3dzICogc3RlcCArIHN0ZXAgKiAuNSwgR2xUZXh0Lm1heEF0bGFzU2l6ZSk7XG5cdFx0XHRcdHZhciBhdGxhc0hlaWdodCA9IG5leHRQb3cyKCByb3dzICogc3RlcCApO1xuXG5cdFx0XHRcdGF0bGFzLndpZHRoID0gYXRsYXNXaWR0aFxuXHRcdFx0XHRhdGxhcy5oZWlnaHQgPSBhdGxhc0hlaWdodDtcblx0XHRcdFx0YXRsYXMucm93cyA9IHJvd3Ncblx0XHRcdFx0YXRsYXMuY29scyA9IGNvbHNcblxuXHRcdFx0XHRpZiAoIWF0bGFzLmVtKSB7IHJldHVybiB9XG5cblx0XHRcdFx0YXRsYXMudGV4dHVyZSh7XG5cdFx0XHRcdFx0ZGF0YTogZm9udEF0bGFzKHtcblx0XHRcdFx0XHRcdGNhbnZhczogR2xUZXh0LmF0bGFzQ2FudmFzLFxuXHRcdFx0XHRcdFx0Zm9udDogYXRsYXMuZm9udFN0cmluZyxcblx0XHRcdFx0XHRcdGNoYXJzOiBhdGxhcy5jaGFycyxcblx0XHRcdFx0XHRcdHNoYXBlOiBbYXRsYXNXaWR0aCwgYXRsYXNIZWlnaHRdLFxuXHRcdFx0XHRcdFx0c3RlcDogW3N0ZXAsIHN0ZXBdXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSlcblxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRpZiAoby5hbGlnbikge1xuXHRcdHRoaXMuYWxpZ24gPSBvLmFsaWduXG5cdFx0dGhpcy5hbGlnbk9mZnNldCA9IHRoaXMudGV4dFdpZHRoLm1hcChmdW5jdGlvbiAodGV4dFdpZHRoLCBpKSB7XG5cdFx0XHR2YXIgYWxpZ24gPSAhQXJyYXkuaXNBcnJheSh0aGlzJDEuYWxpZ24pID8gdGhpcyQxLmFsaWduIDogdGhpcyQxLmFsaWduLmxlbmd0aCA+IDEgPyB0aGlzJDEuYWxpZ25baV0gOiB0aGlzJDEuYWxpZ25bMF1cblxuXHRcdFx0aWYgKHR5cGVvZiBhbGlnbiA9PT0gJ251bWJlcicpIHsgcmV0dXJuIGFsaWduIH1cblx0XHRcdHN3aXRjaCAoYWxpZ24pIHtcblx0XHRcdFx0Y2FzZSAncmlnaHQnOlxuXHRcdFx0XHRjYXNlICdlbmQnOlxuXHRcdFx0XHRcdHJldHVybiAtdGV4dFdpZHRoXG5cdFx0XHRcdGNhc2UgJ2NlbnRlcic6XG5cdFx0XHRcdGNhc2UgJ2NlbnRyZSc6XG5cdFx0XHRcdGNhc2UgJ21pZGRsZSc6XG5cdFx0XHRcdFx0cmV0dXJuIC10ZXh0V2lkdGggKiAuNVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMFxuXHRcdH0pXG5cdH1cblxuXHRpZiAodGhpcy5iYXNlbGluZSA9PSBudWxsICYmIG8uYmFzZWxpbmUgPT0gbnVsbCkge1xuXHRcdG8uYmFzZWxpbmUgPSAwXG5cdH1cblx0aWYgKG8uYmFzZWxpbmUgIT0gbnVsbCkge1xuXHRcdHRoaXMuYmFzZWxpbmUgPSBvLmJhc2VsaW5lXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMuYmFzZWxpbmUpKSB7IHRoaXMuYmFzZWxpbmUgPSBbdGhpcy5iYXNlbGluZV0gfVxuXHRcdHRoaXMuYmFzZWxpbmVPZmZzZXQgPSB0aGlzLmJhc2VsaW5lLm1hcChmdW5jdGlvbiAoYmFzZWxpbmUsIGkpIHtcblx0XHRcdHZhciBtID0gKHRoaXMkMS5mb250W2ldIHx8IHRoaXMkMS5mb250WzBdKS5tZXRyaWNzXG5cdFx0XHR2YXIgYmFzZSA9IDBcblxuXHRcdFx0YmFzZSArPSBtLmJvdHRvbSAqIC41XG5cblx0XHRcdGlmICh0eXBlb2YgYmFzZWxpbmUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGJhc2UgKz0gKGJhc2VsaW5lIC0gbS5iYXNlbGluZSlcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRiYXNlICs9IC1tW2Jhc2VsaW5lXVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIUdsVGV4dC5ub3JtYWxWaWV3cG9ydCkgeyBiYXNlICo9IC0xIH1cblx0XHRcdHJldHVybiBiYXNlXG5cdFx0fSlcblx0fVxuXG5cdC8vIGZsYXR0ZW4gY29sb3JzIHRvIGEgc2luZ2xlIHVpbnQ4IGFycmF5XG5cdGlmIChvLmNvbG9yICE9IG51bGwpIHtcblx0XHRpZiAoIW8uY29sb3IpIHsgby5jb2xvciA9ICd0cmFuc3BhcmVudCcgfVxuXG5cdFx0Ly8gc2luZ2xlIGNvbG9yXG5cdFx0aWYgKHR5cGVvZiBvLmNvbG9yID09PSAnc3RyaW5nJyB8fCAhaXNOYU4oby5jb2xvcikpIHtcblx0XHRcdHRoaXMuY29sb3IgPSByZ2JhKG8uY29sb3IsICd1aW50OCcpXG5cdFx0fVxuXHRcdC8vIGFycmF5XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgY29sb3JEYXRhXG5cblx0XHRcdC8vIGZsYXQgYXJyYXlcblx0XHRcdGlmICh0eXBlb2Ygby5jb2xvclswXSA9PT0gJ251bWJlcicgJiYgby5jb2xvci5sZW5ndGggPiB0aGlzLmNvdW50cy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGwgPSBvLmNvbG9yLmxlbmd0aFxuXHRcdFx0XHRjb2xvckRhdGEgPSBwb29sLm1hbGxvY1VpbnQ4KGwpXG5cdFx0XHRcdHZhciBzdWIgPSAoby5jb2xvci5zdWJhcnJheSB8fCBvLmNvbG9yLnNsaWNlKS5iaW5kKG8uY29sb3IpXG5cdFx0XHRcdGZvciAodmFyIGkkNCA9IDA7IGkkNCA8IGw7IGkkNCArPSA0KSB7XG5cdFx0XHRcdFx0Y29sb3JEYXRhLnNldChyZ2JhKHN1YihpJDQsIGkkNCArIDQpLCAndWludDgnKSwgaSQ0KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBuZXN0ZWQgYXJyYXlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR2YXIgbCQxID0gby5jb2xvci5sZW5ndGhcblx0XHRcdFx0Y29sb3JEYXRhID0gcG9vbC5tYWxsb2NVaW50OChsJDEgKiA0KVxuXHRcdFx0XHRmb3IgKHZhciBpJDUgPSAwOyBpJDUgPCBsJDE7IGkkNSsrKSB7XG5cdFx0XHRcdFx0Y29sb3JEYXRhLnNldChyZ2JhKG8uY29sb3JbaSQ1XSB8fCAwLCAndWludDgnKSwgaSQ1ICogNClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmNvbG9yID0gY29sb3JEYXRhXG5cdFx0fVxuXHR9XG5cblx0Ly8gdXBkYXRlIHJlbmRlciBiYXRjaFxuXHRpZiAoby5wb3NpdGlvbiB8fCBvLnRleHQgfHwgby5jb2xvciB8fCBvLmJhc2VsaW5lIHx8IG8uYWxpZ24gfHwgby5mb250IHx8IG8ub2Zmc2V0IHx8IG8ub3BhY2l0eSkge1xuXHRcdHZhciBpc0JhdGNoID0gKHRoaXMuY29sb3IubGVuZ3RoID4gNClcblx0XHRcdHx8ICh0aGlzLmJhc2VsaW5lT2Zmc2V0Lmxlbmd0aCA+IDEpXG5cdFx0XHR8fCAodGhpcy5hbGlnbiAmJiB0aGlzLmFsaWduLmxlbmd0aCA+IDEpXG5cdFx0XHR8fCAodGhpcy5mb250QXRsYXMubGVuZ3RoID4gMSlcblx0XHRcdHx8ICh0aGlzLnBvc2l0aW9uT2Zmc2V0Lmxlbmd0aCA+IDIpXG5cdFx0aWYgKGlzQmF0Y2gpIHtcblx0XHRcdHZhciBsZW5ndGggPSBNYXRoLm1heChcblx0XHRcdFx0dGhpcy5wb3NpdGlvbi5sZW5ndGggKiAuNSB8fCAwLFxuXHRcdFx0XHR0aGlzLmNvbG9yLmxlbmd0aCAqIC4yNSB8fCAwLFxuXHRcdFx0XHR0aGlzLmJhc2VsaW5lT2Zmc2V0Lmxlbmd0aCB8fCAwLFxuXHRcdFx0XHR0aGlzLmFsaWduT2Zmc2V0Lmxlbmd0aCB8fCAwLFxuXHRcdFx0XHR0aGlzLmZvbnQubGVuZ3RoIHx8IDAsXG5cdFx0XHRcdHRoaXMub3BhY2l0eS5sZW5ndGggfHwgMCxcblx0XHRcdFx0dGhpcy5wb3NpdGlvbk9mZnNldC5sZW5ndGggKiAuNSB8fCAwXG5cdFx0XHQpXG5cdFx0XHR0aGlzLmJhdGNoID0gQXJyYXkobGVuZ3RoKVxuXHRcdFx0Zm9yICh2YXIgaSQ2ID0gMDsgaSQ2IDwgdGhpcy5iYXRjaC5sZW5ndGg7IGkkNisrKSB7XG5cdFx0XHRcdHRoaXMuYmF0Y2hbaSQ2XSA9IHtcblx0XHRcdFx0XHRjb3VudDogdGhpcy5jb3VudHMubGVuZ3RoID4gMSA/IHRoaXMuY291bnRzW2kkNl0gOiB0aGlzLmNvdW50c1swXSxcblx0XHRcdFx0XHRvZmZzZXQ6IHRoaXMudGV4dE9mZnNldHMubGVuZ3RoID4gMSA/IHRoaXMudGV4dE9mZnNldHNbaSQ2XSA6IHRoaXMudGV4dE9mZnNldHNbMF0sXG5cdFx0XHRcdFx0Y29sb3I6ICF0aGlzLmNvbG9yID8gWzAsMCwwLDI1NV0gOiB0aGlzLmNvbG9yLmxlbmd0aCA8PSA0ID8gdGhpcy5jb2xvciA6IHRoaXMuY29sb3Iuc3ViYXJyYXkoaSQ2ICogNCwgaSQ2ICogNCArIDQpLFxuXHRcdFx0XHRcdG9wYWNpdHk6IEFycmF5LmlzQXJyYXkodGhpcy5vcGFjaXR5KSA/IHRoaXMub3BhY2l0eVtpJDZdIDogdGhpcy5vcGFjaXR5LFxuXHRcdFx0XHRcdGJhc2VsaW5lOiB0aGlzLmJhc2VsaW5lT2Zmc2V0W2kkNl0gIT0gbnVsbCA/IHRoaXMuYmFzZWxpbmVPZmZzZXRbaSQ2XSA6IHRoaXMuYmFzZWxpbmVPZmZzZXRbMF0sXG5cdFx0XHRcdFx0YWxpZ246ICF0aGlzLmFsaWduID8gMCA6IHRoaXMuYWxpZ25PZmZzZXRbaSQ2XSAhPSBudWxsID8gdGhpcy5hbGlnbk9mZnNldFtpJDZdIDogdGhpcy5hbGlnbk9mZnNldFswXSxcblx0XHRcdFx0XHRhdGxhczogdGhpcy5mb250QXRsYXNbaSQ2XSB8fCB0aGlzLmZvbnRBdGxhc1swXSxcblx0XHRcdFx0XHRwb3NpdGlvbk9mZnNldDogdGhpcy5wb3NpdGlvbk9mZnNldC5sZW5ndGggPiAyID8gdGhpcy5wb3NpdGlvbk9mZnNldC5zdWJhcnJheShpJDYgKiAyLCBpJDYgKiAyICsgMikgOiB0aGlzLnBvc2l0aW9uT2Zmc2V0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gc2luZ2xlLWNvbG9yLCBzaW5nbGUtYmFzZWxpbmUsIHNpbmdsZS1hbGlnbiBiYXRjaCBpcyBmYXN0ZXIgdG8gcmVuZGVyXG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5jb3VudCkge1xuXHRcdFx0XHR0aGlzLmJhdGNoID0gW3tcblx0XHRcdFx0XHRjb3VudDogdGhpcy5jb3VudCxcblx0XHRcdFx0XHRvZmZzZXQ6IDAsXG5cdFx0XHRcdFx0Y29sb3I6IHRoaXMuY29sb3IgfHwgWzAsMCwwLDI1NV0sXG5cdFx0XHRcdFx0b3BhY2l0eTogQXJyYXkuaXNBcnJheSh0aGlzLm9wYWNpdHkpID8gdGhpcy5vcGFjaXR5WzBdIDogdGhpcy5vcGFjaXR5LFxuXHRcdFx0XHRcdGJhc2VsaW5lOiB0aGlzLmJhc2VsaW5lT2Zmc2V0WzBdLFxuXHRcdFx0XHRcdGFsaWduOiB0aGlzLmFsaWduT2Zmc2V0ID8gdGhpcy5hbGlnbk9mZnNldFswXSA6IDAsXG5cdFx0XHRcdFx0YXRsYXM6IHRoaXMuZm9udEF0bGFzWzBdLFxuXHRcdFx0XHRcdHBvc2l0aW9uT2Zmc2V0OiB0aGlzLnBvc2l0aW9uT2Zmc2V0XG5cdFx0XHRcdH1dXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5iYXRjaCA9IFtdXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG5HbFRleHQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcblx0Ly8gVE9ETzogY291bnQgaW5zdGFuY2VzIG9mIGF0bGFzZXMgYW5kIGRlc3Ryb3kgYWxsIG9uIG51bGxcbn07XG5cblxuLy8gZGVmYXVsdHNcbkdsVGV4dC5wcm90b3R5cGUua2VybmluZyA9IHRydWVcbkdsVGV4dC5wcm90b3R5cGUucG9zaXRpb24gPSB7IGNvbnN0YW50OiBuZXcgRmxvYXQzMkFycmF5KDIpIH1cbkdsVGV4dC5wcm90b3R5cGUudHJhbnNsYXRlID0gbnVsbFxuR2xUZXh0LnByb3RvdHlwZS5zY2FsZSA9IG51bGxcbkdsVGV4dC5wcm90b3R5cGUuZm9udCA9IG51bGxcbkdsVGV4dC5wcm90b3R5cGUudGV4dCA9ICcnXG5HbFRleHQucHJvdG90eXBlLnBvc2l0aW9uT2Zmc2V0ID0gWzAsIDBdXG5HbFRleHQucHJvdG90eXBlLm9wYWNpdHkgPSAxXG5HbFRleHQucHJvdG90eXBlLmNvbG9yID0gbmV3IFVpbnQ4QXJyYXkoWzAsIDAsIDAsIDI1NV0pXG5HbFRleHQucHJvdG90eXBlLmFsaWduT2Zmc2V0ID0gWzAsIDBdXG5cblxuLy8gd2hldGhlciB2aWV3cG9ydCBzaG91bGQgYmUgdG9w4oaTYm90dG9tIDJkIG9uZSAodHJ1ZSkgb3Igd2ViZ2wgb25lIChmYWxzZSlcbkdsVGV4dC5ub3JtYWxWaWV3cG9ydCA9IGZhbHNlXG5cbi8vIHNpemUgb2YgYW4gYXRsYXNcbkdsVGV4dC5tYXhBdGxhc1NpemUgPSAxMDI0XG5cbi8vIGZvbnQgYXRsYXMgY2FudmFzIGlzIHNpbmdsZXRvblxuR2xUZXh0LmF0bGFzQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbkdsVGV4dC5hdGxhc0NvbnRleHQgPSBHbFRleHQuYXRsYXNDYW52YXMuZ2V0Q29udGV4dCgnMmQnLCB7YWxwaGE6IGZhbHNlfSlcblxuLy8gZm9udC1zaXplIHVzZWQgZm9yIG1ldHJpY3MsIGF0bGFzIHN0ZXAgY2FsY3VsYXRpb25cbkdsVGV4dC5iYXNlRm9udFNpemUgPSA2NFxuXG4vLyBmb250cyBzdG9yYWdlXG5HbFRleHQuZm9udHMgPSB7fVxuXG4vLyBtYXggbnVtYmVyIG9mIGRpZmZlcmVudCBmb250IGF0bGFzZXMvdGV4dHVyZXMgY2FjaGVkXG4vLyBGSVhNRTogZW5hYmxlIGF0bGFzIHNpemUgbGltaXRhdGlvbiB2aWEgTFJVXG4vLyBHbFRleHQuYXRsYXNDYWNoZVNpemUgPSA2NFxuXG5mdW5jdGlvbiBpc1JlZ2wgKG8pIHtcblx0cmV0dXJuIHR5cGVvZiBvID09PSAnZnVuY3Rpb24nICYmXG5cdG8uX2dsICYmXG5cdG8ucHJvcCAmJlxuXHRvLnRleHR1cmUgJiZcblx0by5idWZmZXJcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEdsVGV4dFxuXG4iLCIvKiogQG1vZHVsZSAgZ2wtdXRpbC9jb250ZXh0ICovXHJcbid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIHBpY2sgPSByZXF1aXJlKCdwaWNrLWJ5LWFsaWFzJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0Q29udGV4dCAobykge1xyXG5cdGlmICghbykgbyA9IHt9XHJcblx0ZWxzZSBpZiAodHlwZW9mIG8gPT09ICdzdHJpbmcnKSBvID0ge2NvbnRhaW5lcjogb31cclxuXHJcblx0Ly8gSFRNTENhbnZhc0VsZW1lbnRcclxuXHRpZiAoaXNDYW52YXMobykpIHtcclxuXHRcdG8gPSB7Y29udGFpbmVyOiBvfVxyXG5cdH1cclxuXHQvLyBIVE1MRWxlbWVudFxyXG5cdGVsc2UgaWYgKGlzRWxlbWVudChvKSkge1xyXG5cdFx0byA9IHtjb250YWluZXI6IG99XHJcblx0fVxyXG5cdC8vIFdlYkdMQ29udGV4dFxyXG5cdGVsc2UgaWYgKGlzQ29udGV4dChvKSkge1xyXG5cdFx0byA9IHtnbDogb31cclxuXHR9XHJcblx0Ly8gb3B0aW9ucyBvYmplY3RcclxuXHRlbHNlIHtcclxuXHRcdG8gPSBwaWNrKG8sIHtcclxuXHRcdFx0Y29udGFpbmVyOiAnY29udGFpbmVyIHRhcmdldCBlbGVtZW50IGVsIGNhbnZhcyBob2xkZXIgcGFyZW50IHBhcmVudE5vZGUgd3JhcHBlciB1c2UgcmVmIHJvb3Qgbm9kZScsXHJcblx0XHRcdGdsOiAnZ2wgY29udGV4dCB3ZWJnbCBnbENvbnRleHQnLFxyXG5cdFx0XHRhdHRyczogJ2F0dHJpYnV0ZXMgYXR0cnMgY29udGV4dEF0dHJpYnV0ZXMnLFxyXG5cdFx0XHRwaXhlbFJhdGlvOiAncGl4ZWxSYXRpbyBweFJhdGlvIHB4IHJhdGlvIHB4cmF0aW8gcGl4ZWxyYXRpbycsXHJcblx0XHRcdHdpZHRoOiAndyB3aWR0aCcsXHJcblx0XHRcdGhlaWdodDogJ2ggaGVpZ2h0J1xyXG5cdFx0fSwgdHJ1ZSlcclxuXHR9XHJcblxyXG5cdGlmICghby5waXhlbFJhdGlvKSBvLnBpeGVsUmF0aW8gPSBnbG9iYWwucGl4ZWxSYXRpbyB8fCAxXHJcblxyXG5cdC8vIG1ha2Ugc3VyZSB0aGVyZSBpcyBjb250YWluZXIgYW5kIGNhbnZhc1xyXG5cdGlmIChvLmdsKSB7XHJcblx0XHRyZXR1cm4gby5nbFxyXG5cdH1cclxuXHRpZiAoby5jYW52YXMpIHtcclxuXHRcdG8uY29udGFpbmVyID0gby5jYW52YXMucGFyZW50Tm9kZVxyXG5cdH1cclxuXHRpZiAoby5jb250YWluZXIpIHtcclxuXHRcdGlmICh0eXBlb2Ygby5jb250YWluZXIgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHZhciBjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvLmNvbnRhaW5lcilcclxuXHRcdFx0aWYgKCFjKSB0aHJvdyBFcnJvcignRWxlbWVudCAnICsgby5jb250YWluZXIgKyAnIGlzIG5vdCBmb3VuZCcpXHJcblx0XHRcdG8uY29udGFpbmVyID0gY1xyXG5cdFx0fVxyXG5cdFx0aWYgKGlzQ2FudmFzKG8uY29udGFpbmVyKSkge1xyXG5cdFx0XHRvLmNhbnZhcyA9IG8uY29udGFpbmVyXHJcblx0XHRcdG8uY29udGFpbmVyID0gby5jYW52YXMucGFyZW50Tm9kZVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoIW8uY2FudmFzKSB7XHJcblx0XHRcdG8uY2FudmFzID0gY3JlYXRlQ2FudmFzKClcclxuXHRcdFx0by5jb250YWluZXIuYXBwZW5kQ2hpbGQoby5jYW52YXMpXHJcblx0XHRcdHJlc2l6ZShvKVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvLyBibGFuayBuZXcgY2FudmFzXHJcblx0ZWxzZSBpZiAoIW8uY2FudmFzKSB7XHJcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRvLmNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XHJcblx0XHRcdG8uY2FudmFzID0gY3JlYXRlQ2FudmFzKClcclxuXHRcdFx0by5jb250YWluZXIuYXBwZW5kQ2hpbGQoby5jYW52YXMpXHJcblx0XHRcdHJlc2l6ZShvKVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRocm93IEVycm9yKCdOb3QgRE9NIGVudmlyb25tZW50LiBVc2UgaGVhZGxlc3MtZ2wuJylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIG1ha2Ugc3VyZSB0aGVyZSBpcyBjb250ZXh0XHJcblx0aWYgKCFvLmdsKSB7XHJcblx0XHRbJ3dlYmdsJywgJ2V4cGVyaW1lbnRhbC13ZWJnbCcsICd3ZWJnbC1leHBlcmltZW50YWwnXS5zb21lKGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0by5nbCA9IG8uY2FudmFzLmdldENvbnRleHQoYywgby5hdHRycyk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHsgLyogbm8tb3AgKi8gfVxyXG5cdFx0XHRyZXR1cm4gby5nbDtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIG8uZ2xcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlc2l6ZSAobykge1xyXG5cdGlmIChvLmNvbnRhaW5lcikge1xyXG5cdFx0aWYgKG8uY29udGFpbmVyID09IGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFx0aWYgKCFkb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoKSBvLmNhbnZhcy53aWR0aCA9IG8ud2lkdGggfHwgKG8ucGl4ZWxSYXRpbyAqIGdsb2JhbC5pbm5lcldpZHRoKVxyXG5cdFx0XHRpZiAoIWRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0KSBvLmNhbnZhcy5oZWlnaHQgPSBvLmhlaWdodCB8fCAoby5waXhlbFJhdGlvICogZ2xvYmFsLmlubmVySGVpZ2h0KVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHZhciBib3VuZHMgPSBvLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cdFx0XHRvLmNhbnZhcy53aWR0aCA9IG8ud2lkdGggfHwgKGJvdW5kcy5yaWdodCAtIGJvdW5kcy5sZWZ0KVxyXG5cdFx0XHRvLmNhbnZhcy5oZWlnaHQgPSBvLmhlaWdodCB8fCAoYm91bmRzLmJvdHRvbSAtIGJvdW5kcy50b3ApXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0NhbnZhcyAoZSkge1xyXG5cdHJldHVybiB0eXBlb2YgZS5nZXRDb250ZXh0ID09PSAnZnVuY3Rpb24nXHJcblx0XHQmJiAnd2lkdGgnIGluIGVcclxuXHRcdCYmICdoZWlnaHQnIGluIGVcclxufVxyXG5cclxuZnVuY3Rpb24gaXNFbGVtZW50IChlKSB7XHJcblx0cmV0dXJuIHR5cGVvZiBlLm5vZGVOYW1lID09PSAnc3RyaW5nJyAmJlxyXG5cdFx0dHlwZW9mIGUuYXBwZW5kQ2hpbGQgPT09ICdmdW5jdGlvbicgJiZcclxuXHRcdHR5cGVvZiBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9PT0gJ2Z1bmN0aW9uJ1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0NvbnRleHQgKGUpIHtcclxuXHRyZXR1cm4gdHlwZW9mIGUuZHJhd0FycmF5cyA9PT0gJ2Z1bmN0aW9uJyB8fFxyXG5cdFx0dHlwZW9mIGUuZHJhd0VsZW1lbnRzID09PSAnZnVuY3Rpb24nXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyAoKSB7XHJcblx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcblx0Y2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xyXG5cdGNhbnZhcy5zdHlsZS50b3AgPSAwXHJcblx0Y2FudmFzLnN0eWxlLmxlZnQgPSAwXHJcblxyXG5cdHJldHVybiBjYW52YXNcclxufVxyXG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBAbW9kdWxlIHBhcmVudGhlc2lzXG4gKi9cblxuZnVuY3Rpb24gcGFyc2UgKHN0ciwgb3B0cykge1xuXHQvLyBwcmV0ZW5kIG5vbi1zdHJpbmcgcGFyc2VkIHBlci1zZVxuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHJldHVybiBbc3RyXVxuXG5cdHZhciByZXMgPSBbc3RyXVxuXG5cdGlmICh0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheShvcHRzKSkge1xuXHRcdG9wdHMgPSB7YnJhY2tldHM6IG9wdHN9XG5cdH1cblx0ZWxzZSBpZiAoIW9wdHMpIG9wdHMgPSB7fVxuXG5cdHZhciBicmFja2V0cyA9IG9wdHMuYnJhY2tldHMgPyAoQXJyYXkuaXNBcnJheShvcHRzLmJyYWNrZXRzKSA/IG9wdHMuYnJhY2tldHMgOiBbb3B0cy5icmFja2V0c10pIDogWyd7fScsICdbXScsICcoKSddXG5cblx0dmFyIGVzY2FwZSA9IG9wdHMuZXNjYXBlIHx8ICdfX18nXG5cblx0dmFyIGZsYXQgPSAhIW9wdHMuZmxhdFxuXG5cdGJyYWNrZXRzLmZvckVhY2goZnVuY3Rpb24gKGJyYWNrZXQpIHtcblx0XHQvLyBjcmVhdGUgcGFyZW50aGVzaXMgcmVnZXhcblx0XHR2YXIgcFJFID0gbmV3IFJlZ0V4cChbJ1xcXFwnLCBicmFja2V0WzBdLCAnW15cXFxcJywgYnJhY2tldFswXSwgJ1xcXFwnLCBicmFja2V0WzFdLCAnXSpcXFxcJywgYnJhY2tldFsxXV0uam9pbignJykpXG5cblx0XHR2YXIgaWRzID0gW11cblxuXHRcdGZ1bmN0aW9uIHJlcGxhY2VUb2tlbih0b2tlbiwgaWR4LCBzdHIpe1xuXHRcdFx0Ly8gc2F2ZSB0b2tlbiB0byByZXNcblx0XHRcdHZhciByZWZJZCA9IHJlcy5wdXNoKHRva2VuLnNsaWNlKGJyYWNrZXRbMF0ubGVuZ3RoLCAtYnJhY2tldFsxXS5sZW5ndGgpKSAtIDFcblxuXHRcdFx0aWRzLnB1c2gocmVmSWQpXG5cblx0XHRcdHJldHVybiBlc2NhcGUgKyByZWZJZCArIGVzY2FwZVxuXHRcdH1cblxuXHRcdHJlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdHIsIGkpIHtcblx0XHRcdHZhciBwcmV2U3RyXG5cblx0XHRcdC8vIHJlcGxhY2UgcGFyZW4gdG9rZW5zIHRpbGwgdGhlcmXigJlzIG5vbmVcblx0XHRcdHZhciBhID0gMFxuXHRcdFx0d2hpbGUgKHN0ciAhPSBwcmV2U3RyKSB7XG5cdFx0XHRcdHByZXZTdHIgPSBzdHJcblx0XHRcdFx0c3RyID0gc3RyLnJlcGxhY2UocFJFLCByZXBsYWNlVG9rZW4pXG5cdFx0XHRcdGlmIChhKysgPiAxMGUzKSB0aHJvdyBFcnJvcignUmVmZXJlbmNlcyBoYXZlIGNpcmN1bGFyIGRlcGVuZGVuY3kuIFBsZWFzZSwgY2hlY2sgdGhlbS4nKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXNbaV0gPSBzdHJcblx0XHR9KVxuXG5cdFx0Ly8gd3JhcCBmb3VuZCByZWZzIHRvIGJyYWNrZXRzXG5cdFx0aWRzID0gaWRzLnJldmVyc2UoKVxuXHRcdHJlcyA9IHJlcy5tYXAoZnVuY3Rpb24gKHN0cikge1xuXHRcdFx0aWRzLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoJyhcXFxcJyArIGVzY2FwZSArIGlkICsgJ1xcXFwnICsgZXNjYXBlICsgJyknLCAnZycpLCBicmFja2V0WzBdICsgJyQxJyArIGJyYWNrZXRbMV0pXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHN0clxuXHRcdH0pXG5cdH0pXG5cblx0dmFyIHJlID0gbmV3IFJlZ0V4cCgnXFxcXCcgKyBlc2NhcGUgKyAnKFswLTldKyknICsgJ1xcXFwnICsgZXNjYXBlKVxuXG5cdC8vIHRyYW5zZm9ybSByZWZlcmVuY2VzIHRvIHRyZWVcblx0ZnVuY3Rpb24gbmVzdCAoc3RyLCByZWZzLCBlc2NhcGUpIHtcblx0XHR2YXIgcmVzID0gW10sIG1hdGNoXG5cblx0XHR2YXIgYSA9IDBcblx0XHR3aGlsZSAobWF0Y2ggPSByZS5leGVjKHN0cikpIHtcblx0XHRcdGlmIChhKysgPiAxMGUzKSB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlcyBpbiBwYXJlbnRoZXNpcycpXG5cblx0XHRcdHJlcy5wdXNoKHN0ci5zbGljZSgwLCBtYXRjaC5pbmRleCkpXG5cblx0XHRcdHJlcy5wdXNoKG5lc3QocmVmc1ttYXRjaFsxXV0sIHJlZnMpKVxuXG5cdFx0XHRzdHIgPSBzdHIuc2xpY2UobWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpXG5cdFx0fVxuXG5cdFx0cmVzLnB1c2goc3RyKVxuXG5cdFx0cmV0dXJuIHJlc1xuXHR9XG5cblx0cmV0dXJuIGZsYXQgPyByZXMgOiBuZXN0KHJlc1swXSwgcmVzKVxufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkgKGFyZywgb3B0cykge1xuXHRpZiAob3B0cyAmJiBvcHRzLmZsYXQpIHtcblx0XHR2YXIgZXNjYXBlID0gb3B0cyAmJiBvcHRzLmVzY2FwZSB8fCAnX19fJ1xuXG5cdFx0dmFyIHN0ciA9IGFyZ1swXSwgcHJldlN0clxuXG5cdFx0Ly8gcHJldGVuZCBiYWQgc3RyaW5nIHN0cmluZ2lmaWVkIHdpdGggbm8gcGFyZW50aGVzZXNcblx0XHRpZiAoIXN0cikgcmV0dXJuICcnXG5cblxuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAoJ1xcXFwnICsgZXNjYXBlICsgJyhbMC05XSspJyArICdcXFxcJyArIGVzY2FwZSlcblxuXHRcdHZhciBhID0gMFxuXHRcdHdoaWxlIChzdHIgIT0gcHJldlN0cikge1xuXHRcdFx0aWYgKGErKyA+IDEwZTMpIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2VzIGluICcgKyBhcmcpXG5cdFx0XHRwcmV2U3RyID0gc3RyXG5cdFx0XHRzdHIgPSBzdHIucmVwbGFjZShyZSwgcmVwbGFjZVJlZilcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RyXG5cdH1cblxuXHRyZXR1cm4gYXJnLnJlZHVjZShmdW5jdGlvbiBmIChwcmV2LCBjdXJyKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoY3VycikpIHtcblx0XHRcdGN1cnIgPSBjdXJyLnJlZHVjZShmLCAnJylcblx0XHR9XG5cdFx0cmV0dXJuIHByZXYgKyBjdXJyXG5cdH0sICcnKVxuXG5cdGZ1bmN0aW9uIHJlcGxhY2VSZWYobWF0Y2gsIGlkeCl7XG5cdFx0aWYgKGFyZ1tpZHhdID09IG51bGwpIHRocm93IEVycm9yKCdSZWZlcmVuY2UgJyArIGlkeCArICdpcyB1bmRlZmluZWQnKVxuXHRcdHJldHVybiBhcmdbaWR4XVxuXHR9XG59XG5cbmZ1bmN0aW9uIHBhcmVudGhlc2lzIChhcmcsIG9wdHMpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdHJldHVybiBzdHJpbmdpZnkoYXJnLCBvcHRzKVxuXHR9XG5cdGVsc2Uge1xuXHRcdHJldHVybiBwYXJzZShhcmcsIG9wdHMpXG5cdH1cbn1cblxucGFyZW50aGVzaXMucGFyc2UgPSBwYXJzZVxucGFyZW50aGVzaXMuc3RyaW5naWZ5ID0gc3RyaW5naWZ5XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50aGVzaXNcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xuXG52YXIgREVTRUxFQ1RESU0gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvaW50ZXJhY3Rpb25zJykuREVTRUxFQ1RESU07XG5cbmZ1bmN0aW9uIHN0eWxlVGV4dFNlbGVjdGlvbihjZCkge1xuICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgdmFyIHN0YXNoID0gY2QwLnQ7XG4gICAgdmFyIHNjZW5lID0gc3Rhc2guX3NjZW5lO1xuICAgIHZhciBpbmRleCA9IHN0YXNoLmluZGV4O1xuICAgIHZhciBlbHMgPSBzY2VuZS5zZWxlY3RCYXRjaFtpbmRleF07XG4gICAgdmFyIHVuZWxzID0gc2NlbmUudW5zZWxlY3RCYXRjaFtpbmRleF07XG4gICAgdmFyIGJhc2VPcHRzID0gc2NlbmUudGV4dE9wdGlvbnNbaW5kZXhdO1xuICAgIHZhciBzZWxPcHRzID0gc2NlbmUudGV4dFNlbGVjdGVkT3B0aW9uc1tpbmRleF0gfHwge307XG4gICAgdmFyIHVuc2VsT3B0cyA9IHNjZW5lLnRleHRVbnNlbGVjdGVkT3B0aW9uc1tpbmRleF0gfHwge307XG4gICAgdmFyIG9wdHMgPSBMaWIuZXh0ZW5kRmxhdCh7fSwgYmFzZU9wdHMpO1xuICAgIHZhciBpLCBqO1xuXG4gICAgaWYoZWxzLmxlbmd0aCB8fCB1bmVscy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHN0YyA9IHNlbE9wdHMuY29sb3I7XG4gICAgICAgIHZhciB1dGMgPSB1bnNlbE9wdHMuY29sb3I7XG4gICAgICAgIHZhciBiYXNlID0gYmFzZU9wdHMuY29sb3I7XG4gICAgICAgIHZhciBoYXNBcnJheUJhc2UgPSBBcnJheS5pc0FycmF5KGJhc2UpO1xuICAgICAgICBvcHRzLmNvbG9yID0gbmV3IEFycmF5KHRyYWNlLl9sZW5ndGgpO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaiA9IGVsc1tpXTtcbiAgICAgICAgICAgIG9wdHMuY29sb3Jbal0gPSBzdGMgfHwgKGhhc0FycmF5QmFzZSA/IGJhc2Vbal0gOiBiYXNlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IoaSA9IDA7IGkgPCB1bmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaiA9IHVuZWxzW2ldO1xuICAgICAgICAgICAgdmFyIGJhc2VqID0gaGFzQXJyYXlCYXNlID8gYmFzZVtqXSA6IGJhc2U7XG4gICAgICAgICAgICBvcHRzLmNvbG9yW2pdID0gdXRjID8gdXRjIDpcbiAgICAgICAgICAgICAgICBzdGMgPyBiYXNlaiA6IENvbG9yLmFkZE9wYWNpdHkoYmFzZWosIERFU0VMRUNURElNKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjZW5lLmdsVGV4dFtpbmRleF0udXBkYXRlKG9wdHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHlsZVRleHRTZWxlY3Rpb246IHN0eWxlVGV4dFNlbGVjdGlvblxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZVNjYXR0ZXIgPSByZXF1aXJlKCdyZWdsLXNjYXR0ZXIyZCcpO1xudmFyIGNyZWF0ZUxpbmUgPSByZXF1aXJlKCdyZWdsLWxpbmUyZCcpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgncmVnbC1lcnJvcjJkJyk7XG52YXIgVGV4dCA9IHJlcXVpcmUoJ2dsLXRleHQnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHNlbGVjdE1vZGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYWdlbGVtZW50L2hlbHBlcnMnKS5zZWxlY3RNb2RlO1xudmFyIHByZXBhcmVSZWdsID0gcmVxdWlyZSgnLi4vLi4vbGliL3ByZXBhcmVfcmVnbCcpO1xuXG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgbGlua1RyYWNlcyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbGlua190cmFjZXMnKTtcblxudmFyIHN0eWxlVGV4dFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4vZWRpdF9zdHlsZScpLnN0eWxlVGV4dFNlbGVjdGlvbjtcblxuZnVuY3Rpb24gZ2V0Vmlld3BvcnQoZnVsbExheW91dCwgeGF4aXMsIHlheGlzKSB7XG4gICAgdmFyIGdzID0gZnVsbExheW91dC5fc2l6ZTtcbiAgICB2YXIgd2lkdGggPSBmdWxsTGF5b3V0LndpZHRoO1xuICAgIHZhciBoZWlnaHQgPSBmdWxsTGF5b3V0LmhlaWdodDtcbiAgICByZXR1cm4gW1xuICAgICAgICBncy5sICsgeGF4aXMuZG9tYWluWzBdICogZ3MudyxcbiAgICAgICAgZ3MuYiArIHlheGlzLmRvbWFpblswXSAqIGdzLmgsXG4gICAgICAgICh3aWR0aCAtIGdzLnIpIC0gKDEgLSB4YXhpcy5kb21haW5bMV0pICogZ3MudyxcbiAgICAgICAgKGhlaWdodCAtIGdzLnQpIC0gKDEgLSB5YXhpcy5kb21haW5bMV0pICogZ3MuaFxuICAgIF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGxvdChnZCwgc3VicGxvdCwgY2RhdGEpIHtcbiAgICBpZighY2RhdGEubGVuZ3RoKSByZXR1cm47XG5cbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBzY2VuZSA9IHN1YnBsb3QuX3NjZW5lO1xuICAgIHZhciB4YXhpcyA9IHN1YnBsb3QueGF4aXM7XG4gICAgdmFyIHlheGlzID0gc3VicGxvdC55YXhpcztcbiAgICB2YXIgaSwgajtcblxuICAgIC8vIHdlIG1heSBoYXZlIG1vcmUgc3VicGxvdHMgdGhhbiBpbml0aWFsaXplZCBkYXRhIGR1ZSB0byBBeGVzLmdldFN1YnBsb3RzIG1ldGhvZFxuICAgIGlmKCFzY2VuZSkgcmV0dXJuO1xuXG4gICAgdmFyIHN1Y2Nlc3MgPSBwcmVwYXJlUmVnbChnZCwgWydBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJywgJ09FU19lbGVtZW50X2luZGV4X3VpbnQnXSk7XG4gICAgaWYoIXN1Y2Nlc3MpIHtcbiAgICAgICAgc2NlbmUuaW5pdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNvdW50ID0gc2NlbmUuY291bnQ7XG4gICAgdmFyIHJlZ2wgPSBmdWxsTGF5b3V0Ll9nbGNhbnZhcy5kYXRhKClbMF0ucmVnbDtcblxuICAgIC8vIHRoYXQgaXMgbmVlZGVkIGZvciBmaWxsc1xuICAgIGxpbmtUcmFjZXMoZ2QsIHN1YnBsb3QsIGNkYXRhKTtcblxuICAgIGlmKHNjZW5lLmRpcnR5KSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSBzY2VuZXMgYXJlIGNyZWF0ZWRcbiAgICAgICAgaWYoc2NlbmUuZXJyb3IyZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2NlbmUuZXJyb3IyZCA9IGNyZWF0ZUVycm9yKHJlZ2wpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNjZW5lLmxpbmUyZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2NlbmUubGluZTJkID0gY3JlYXRlTGluZShyZWdsKTtcbiAgICAgICAgfVxuICAgICAgICBpZihzY2VuZS5zY2F0dGVyMmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHNjZW5lLnNjYXR0ZXIyZCA9IGNyZWF0ZVNjYXR0ZXIocmVnbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoc2NlbmUuZmlsbDJkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzY2VuZS5maWxsMmQgPSBjcmVhdGVMaW5lKHJlZ2wpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNjZW5lLmdsVGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2NlbmUuZ2xUZXh0ID0gbmV3IEFycmF5KGNvdW50KTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBzY2VuZS5nbFRleHRbaV0gPSBuZXcgVGV4dChyZWdsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBtYWluIG1hcmtlciBvcHRpb25zXG4gICAgICAgIGlmKHNjZW5lLmdsVGV4dCkge1xuICAgICAgICAgICAgaWYoY291bnQgPiBzY2VuZS5nbFRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGdsIHRleHQgbWFya2VyXG4gICAgICAgICAgICAgICAgdmFyIHRleHRzVG9BZGQgPSBjb3VudCAtIHNjZW5lLmdsVGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgdGV4dHNUb0FkZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLmdsVGV4dC5wdXNoKG5ldyBUZXh0KHJlZ2wpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPCBzY2VuZS5nbFRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGdsIHRleHQgbWFya2VyXG4gICAgICAgICAgICAgICAgdmFyIHRleHRzVG9SZW1vdmUgPSBzY2VuZS5nbFRleHQubGVuZ3RoIC0gY291bnQ7XG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZWRUZXh0cyA9IHNjZW5lLmdsVGV4dC5zcGxpY2UoY291bnQsIHRleHRzVG9SZW1vdmUpO1xuICAgICAgICAgICAgICAgIHJlbW92ZWRUZXh0cy5mb3JFYWNoKGZ1bmN0aW9uKHRleHQpIHsgdGV4dC5kZXN0cm95KCk7IH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2NlbmUuZ2xUZXh0W2ldLnVwZGF0ZShzY2VuZS50ZXh0T3B0aW9uc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoc2NlbmUubGluZTJkKSB7XG4gICAgICAgICAgICBzY2VuZS5saW5lMmQudXBkYXRlKHNjZW5lLmxpbmVPcHRpb25zKTtcbiAgICAgICAgICAgIHNjZW5lLmxpbmVPcHRpb25zID0gc2NlbmUubGluZU9wdGlvbnMubWFwKGZ1bmN0aW9uKGxpbmVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYobGluZU9wdGlvbnMgJiYgbGluZU9wdGlvbnMucG9zaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcmNQb3MgPSBsaW5lT3B0aW9ucy5wb3NpdGlvbnM7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0cHRkZWYgPSAwO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZShmaXJzdHB0ZGVmIDwgc3JjUG9zLmxlbmd0aCAmJiAoaXNOYU4oc3JjUG9zW2ZpcnN0cHRkZWZdKSB8fCBpc05hTihzcmNQb3NbZmlyc3RwdGRlZiArIDFdKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0cHRkZWYgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdHB0ZGVmID0gc3JjUG9zLmxlbmd0aCAtIDI7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKGxhc3RwdGRlZiA+IGZpcnN0cHRkZWYgJiYgKGlzTmFOKHNyY1Bvc1tsYXN0cHRkZWZdKSB8fCBpc05hTihzcmNQb3NbbGFzdHB0ZGVmICsgMV0pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdHB0ZGVmIC09IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGluZU9wdGlvbnMucG9zaXRpb25zID0gc3JjUG9zLnNsaWNlKGZpcnN0cHRkZWYsIGxhc3RwdGRlZiArIDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbGluZU9wdGlvbnM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjZW5lLmxpbmUyZC51cGRhdGUoc2NlbmUubGluZU9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNjZW5lLmVycm9yMmQpIHtcbiAgICAgICAgICAgIHZhciBlcnJvckJhdGNoID0gKHNjZW5lLmVycm9yWE9wdGlvbnMgfHwgW10pLmNvbmNhdChzY2VuZS5lcnJvcllPcHRpb25zIHx8IFtdKTtcbiAgICAgICAgICAgIHNjZW5lLmVycm9yMmQudXBkYXRlKGVycm9yQmF0Y2gpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNjZW5lLnNjYXR0ZXIyZCkge1xuICAgICAgICAgICAgc2NlbmUuc2NhdHRlcjJkLnVwZGF0ZShzY2VuZS5tYXJrZXJPcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbGwgcmVxdWlyZXMgbGlua2VkIHRyYWNlcywgc28gd2UgZ2VuZXJhdGUgaXQncyBwb3NpdGlvbnMgaGVyZVxuICAgICAgICBzY2VuZS5maWxsT3JkZXIgPSBMaWIucmVwZWF0KG51bGwsIGNvdW50KTtcbiAgICAgICAgaWYoc2NlbmUuZmlsbDJkKSB7XG4gICAgICAgICAgICBzY2VuZS5maWxsT3B0aW9ucyA9IHNjZW5lLmZpbGxPcHRpb25zLm1hcChmdW5jdGlvbihmaWxsT3B0aW9ucywgaSkge1xuICAgICAgICAgICAgICAgIHZhciBjZHNjYXR0ZXIgPSBjZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBpZighZmlsbE9wdGlvbnMgfHwgIWNkc2NhdHRlciB8fCAhY2RzY2F0dGVyWzBdIHx8ICFjZHNjYXR0ZXJbMF0udHJhY2UpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgY2QgPSBjZHNjYXR0ZXJbMF07XG4gICAgICAgICAgICAgICAgdmFyIHRyYWNlID0gY2QudHJhY2U7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXNoID0gY2QudDtcbiAgICAgICAgICAgICAgICB2YXIgbGluZU9wdGlvbnMgPSBzY2VuZS5saW5lT3B0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdCwgajtcblxuICAgICAgICAgICAgICAgIHZhciBmaWxsRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmKHRyYWNlLl9vd25maWxsKSBmaWxsRGF0YS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGlmKHRyYWNlLl9uZXh0dHJhY2UpIGZpbGxEYXRhLnB1c2goaSArIDEpO1xuICAgICAgICAgICAgICAgIGlmKGZpbGxEYXRhLmxlbmd0aCkgc2NlbmUuZmlsbE9yZGVyW2ldID0gZmlsbERhdGE7XG5cbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gW107XG4gICAgICAgICAgICAgICAgdmFyIHNyY1BvcyA9IChsaW5lT3B0aW9ucyAmJiBsaW5lT3B0aW9ucy5wb3NpdGlvbnMpIHx8IHN0YXNoLnBvc2l0aW9ucztcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RwdGRlZiwgbGFzdHB0ZGVmO1xuXG4gICAgICAgICAgICAgICAgaWYodHJhY2UuZmlsbCA9PT0gJ3RvemVyb3knKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0cHRkZWYgPSAwO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZShmaXJzdHB0ZGVmIDwgc3JjUG9zLmxlbmd0aCAmJiBpc05hTihzcmNQb3NbZmlyc3RwdGRlZiArIDFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RwdGRlZiArPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxhc3RwdGRlZiA9IHNyY1Bvcy5sZW5ndGggLSAyO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZShsYXN0cHRkZWYgPiBmaXJzdHB0ZGVmICYmIGlzTmFOKHNyY1Bvc1tsYXN0cHRkZWYgKyAxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RwdGRlZiAtPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNyY1Bvc1tmaXJzdHB0ZGVmICsgMV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IFtzcmNQb3NbZmlyc3RwdGRlZl0sIDBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHBvcy5jb25jYXQoc3JjUG9zLnNsaWNlKGZpcnN0cHRkZWYsIGxhc3RwdGRlZiArIDIpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc3JjUG9zW2xhc3RwdGRlZiArIDFdICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBwb3MuY29uY2F0KFtzcmNQb3NbbGFzdHB0ZGVmXSwgMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRyYWNlLmZpbGwgPT09ICd0b3plcm94Jykge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdHB0ZGVmID0gMDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoZmlyc3RwdGRlZiA8IHNyY1Bvcy5sZW5ndGggJiYgaXNOYU4oc3JjUG9zW2ZpcnN0cHRkZWZdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RwdGRlZiArPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxhc3RwdGRlZiA9IHNyY1Bvcy5sZW5ndGggLSAyO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZShsYXN0cHRkZWYgPiBmaXJzdHB0ZGVmICYmIGlzTmFOKHNyY1Bvc1tsYXN0cHRkZWZdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdHB0ZGVmIC09IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc3JjUG9zW2ZpcnN0cHRkZWZdICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBbMCwgc3JjUG9zW2ZpcnN0cHRkZWYgKyAxXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcG9zID0gcG9zLmNvbmNhdChzcmNQb3Muc2xpY2UoZmlyc3RwdGRlZiwgbGFzdHB0ZGVmICsgMikpO1xuICAgICAgICAgICAgICAgICAgICBpZihzcmNQb3NbbGFzdHB0ZGVmXSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gcG9zLmNvbmNhdChbIDAsIHNyY1Bvc1tsYXN0cHRkZWYgKyAxXV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRyYWNlLmZpbGwgPT09ICd0b3NlbGYnIHx8IHRyYWNlLmZpbGwgPT09ICd0b25leHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgc3JjUG9zLmxlbmd0aDsgaiArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpc05hTihzcmNQb3Nbal0pIHx8IGlzTmFOKHNyY1Bvc1tqICsgMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gcG9zLmNvbmNhdChzcmNQb3Muc2xpY2UobGFzdCwgaikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5wdXNoKHNyY1Bvc1tsYXN0XSwgc3JjUG9zW2xhc3QgKyAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdCA9IGogKyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHBvcy5jb25jYXQoc3JjUG9zLnNsaWNlKGxhc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobGFzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLnB1c2goc3JjUG9zW2xhc3RdLCBzcmNQb3NbbGFzdCArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0VHJhY2UgPSB0cmFjZS5fbmV4dHRyYWNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKG5leHRUcmFjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRPcHRpb25zID0gc2NlbmUubGluZU9wdGlvbnNbaSArIDFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXh0T3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0UG9zID0gbmV4dE9wdGlvbnMucG9zaXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRyYWNlLmZpbGwgPT09ICd0b25leHR5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBzcmNQb3Muc2xpY2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IE1hdGguZmxvb3IobmV4dFBvcy5sZW5ndGggLyAyKTsgaS0tOykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHh4ID0gbmV4dFBvc1tpICogMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeXkgPSBuZXh0UG9zW2kgKiAyICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc05hTih4eCkgfHwgaXNOYU4oeXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5wdXNoKHh4LCB5eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbE9wdGlvbnMuZmlsbCA9IG5leHRUcmFjZS5maWxsY29sb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZGV0ZWN0IHByZXYgdHJhY2UgcG9zaXRpb25zIHRvIGV4Y2x1ZGUgZnJvbSBjdXJyZW50IGZpbGxcbiAgICAgICAgICAgICAgICBpZih0cmFjZS5fcHJldnRyYWNlICYmIHRyYWNlLl9wcmV2dHJhY2UuZmlsbCA9PT0gJ3RvbmV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZMaW5lUG9zID0gc2NlbmUubGluZU9wdGlvbnNbaSAtIDFdLnBvc2l0aW9ucztcblxuICAgICAgICAgICAgICAgICAgICAvLyBGSVhNRTogbGlrZWx5IHRoaXMgbG9naWMgc2hvdWxkIGJlIHRlc3RlZCBiZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IHBvcy5sZW5ndGggLyAyO1xuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgaG9sZSA9IFtsYXN0XTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgcHJldkxpbmVQb3MubGVuZ3RoOyBqICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzTmFOKHByZXZMaW5lUG9zW2pdKSB8fCBpc05hTihwcmV2TGluZVBvc1tqICsgMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sZS5wdXNoKGogLyAyICsgb2Zmc2V0ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdCA9IGogKyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcG9zID0gcG9zLmNvbmNhdChwcmV2TGluZVBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGZpbGxPcHRpb25zLmhvbGUgPSBob2xlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaWxsT3B0aW9ucy5maWxsbW9kZSA9IHRyYWNlLmZpbGw7XG4gICAgICAgICAgICAgICAgZmlsbE9wdGlvbnMub3BhY2l0eSA9IHRyYWNlLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgZmlsbE9wdGlvbnMucG9zaXRpb25zID0gcG9zO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGxPcHRpb25zO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNjZW5lLmZpbGwyZC51cGRhdGUoc2NlbmUuZmlsbE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9ybSBiYXRjaCBhcnJheXMsIGFuZCBjaGVjayBmb3Igc2VsZWN0ZWQgcG9pbnRzXG4gICAgdmFyIGRyYWdtb2RlID0gZnVsbExheW91dC5kcmFnbW9kZTtcbiAgICB2YXIgaXNTZWxlY3RNb2RlID0gc2VsZWN0TW9kZShkcmFnbW9kZSk7XG4gICAgdmFyIGNsaWNrU2VsZWN0RW5hYmxlZCA9IGZ1bGxMYXlvdXQuY2xpY2ttb2RlLmluZGV4T2YoJ3NlbGVjdCcpID4gLTE7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIHZhciBjZDAgPSBjZGF0YVtpXVswXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuICAgICAgICB2YXIgc3Rhc2ggPSBjZDAudDtcbiAgICAgICAgdmFyIGluZGV4ID0gc3Rhc2guaW5kZXg7XG4gICAgICAgIHZhciBsZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgICAgICB2YXIgeCA9IHN0YXNoLng7XG4gICAgICAgIHZhciB5ID0gc3Rhc2gueTtcblxuICAgICAgICBpZih0cmFjZS5zZWxlY3RlZHBvaW50cyB8fCBpc1NlbGVjdE1vZGUgfHwgY2xpY2tTZWxlY3RFbmFibGVkKSB7XG4gICAgICAgICAgICBpZighaXNTZWxlY3RNb2RlKSBpc1NlbGVjdE1vZGUgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyByZWdlbmVyYXRlIHNjZW5lIGJhdGNoLCBpZiB0cmFjZXMgbnVtYmVyIGNoYW5nZWQgZHVyaW5nIHNlbGVjdGlvblxuICAgICAgICAgICAgaWYodHJhY2Uuc2VsZWN0ZWRwb2ludHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsUHRzID0gc2NlbmUuc2VsZWN0QmF0Y2hbaW5kZXhdID0gTGliLnNlbEluZGljZXMyc2VsUG9pbnRzKHRyYWNlKTtcblxuICAgICAgICAgICAgICAgIHZhciBzZWxEaWN0ID0ge307XG4gICAgICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgc2VsUHRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbERpY3Rbc2VsUHRzW2pdXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB1bnNlbFB0cyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxEaWN0W2pdKSB1bnNlbFB0cy5wdXNoKGopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY2VuZS51bnNlbGVjdEJhdGNoW2luZGV4XSA9IHVuc2VsUHRzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBwcmVjYWxjdWxhdGUgcHggY29vcmRzIHNpbmNlIHdlIGFyZSBub3QgZ29pbmcgdG8gcGFuIGR1cmluZyBzZWxlY3RcbiAgICAgICAgICAgIC8vIFRPRE8sIGNvdWxkIGRvIGJldHRlciBoZXJlIGUuZy5cbiAgICAgICAgICAgIC8vIC0gc3BpbiB0aGF0IGluIGEgd2Vid29ya2VyXG4gICAgICAgICAgICAvLyAtIGNvbXB1dGUgc2VsZWN0aW9uIGZyb20gcG9seWdvbnMgaW4gZGF0YSBjb29yZGluYXRlc1xuICAgICAgICAgICAgLy8gICAobWF5YmUganVzdCBmb3IgbGluZWFyIGF4ZXMpXG4gICAgICAgICAgICB2YXIgeHB4ID0gc3Rhc2gueHB4ID0gbmV3IEFycmF5KGxlbik7XG4gICAgICAgICAgICB2YXIgeXB4ID0gc3Rhc2gueXB4ID0gbmV3IEFycmF5KGxlbik7XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgICAgIHhweFtqXSA9IHhheGlzLmMycCh4W2pdKTtcbiAgICAgICAgICAgICAgICB5cHhbal0gPSB5YXhpcy5jMnAoeVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFzaC54cHggPSBzdGFzaC55cHggPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoaXNTZWxlY3RNb2RlKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBzY2F0dGVyIGluc3RhbmNlIGJ5IGNsb25pbmcgc2NhdHRlcjJkXG4gICAgICAgIGlmKCFzY2VuZS5zZWxlY3QyZCkge1xuICAgICAgICAgICAgc2NlbmUuc2VsZWN0MmQgPSBjcmVhdGVTY2F0dGVyKGZ1bGxMYXlvdXQuX2dsY2FudmFzLmRhdGEoKVsxXS5yZWdsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVzZSB1bnNlbGVjdGVkIHN0eWxlcyBvbiAnY29udGV4dCcgY2FudmFzXG4gICAgICAgIGlmKHNjZW5lLnNjYXR0ZXIyZCkge1xuICAgICAgICAgICAgdmFyIHVuc2VsT3B0cyA9IG5ldyBBcnJheShjb3VudCk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdW5zZWxPcHRzW2ldID0gc2NlbmUuc2VsZWN0QmF0Y2hbaV0ubGVuZ3RoIHx8IHNjZW5lLnVuc2VsZWN0QmF0Y2hbaV0ubGVuZ3RoID9cbiAgICAgICAgICAgICAgICAgICAgc2NlbmUubWFya2VyVW5zZWxlY3RlZE9wdGlvbnNbaV0gOlxuICAgICAgICAgICAgICAgICAgICB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjZW5lLnNjYXR0ZXIyZC51cGRhdGUodW5zZWxPcHRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVzZSBzZWxlY3RlZCBzdHlsZSBvbiAnZm9jdXMnIGNhbnZhc1xuICAgICAgICBpZihzY2VuZS5zZWxlY3QyZCkge1xuICAgICAgICAgICAgc2NlbmUuc2VsZWN0MmQudXBkYXRlKHNjZW5lLm1hcmtlck9wdGlvbnMpO1xuICAgICAgICAgICAgc2NlbmUuc2VsZWN0MmQudXBkYXRlKHNjZW5lLm1hcmtlclNlbGVjdGVkT3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzY2VuZS5nbFRleHQpIHtcbiAgICAgICAgICAgIGNkYXRhLmZvckVhY2goZnVuY3Rpb24oY2RzY2F0dGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyYWNlID0gKChjZHNjYXR0ZXIgfHwgW10pWzBdIHx8IHt9KS50cmFjZSB8fCB7fTtcbiAgICAgICAgICAgICAgICBpZihzdWJUeXBlcy5oYXNUZXh0KHRyYWNlKSkge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZVRleHRTZWxlY3Rpb24oY2RzY2F0dGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlc2V0ICdjb250ZXh0JyBzY2F0dGVyMmQgb3B0cyB0byBiYXNlIG9wdHMsXG4gICAgICAgIC8vIHRodXMgdW5zZXR0aW5nIG1hcmtlclVuc2VsZWN0ZWRPcHRpb25zIGZyb20gc2VsZWN0aW9uXG4gICAgICAgIGlmKHNjZW5lLnNjYXR0ZXIyZCkge1xuICAgICAgICAgICAgc2NlbmUuc2NhdHRlcjJkLnVwZGF0ZShzY2VuZS5tYXJrZXJPcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHByb3ZpZGUgdmlld3BvcnQgYW5kIHJhbmdlXG4gICAgdmFyIHZwUmFuZ2UwID0ge1xuICAgICAgICB2aWV3cG9ydDogZ2V0Vmlld3BvcnQoZnVsbExheW91dCwgeGF4aXMsIHlheGlzKSxcbiAgICAgICAgLy8gVE9ETyBkbyB3ZSBuZWVkIHRob3NlIGZhbGxiYWNrcz9cbiAgICAgICAgcmFuZ2U6IFtcbiAgICAgICAgICAgICh4YXhpcy5fcmwgfHwgeGF4aXMucmFuZ2UpWzBdLFxuICAgICAgICAgICAgKHlheGlzLl9ybCB8fCB5YXhpcy5yYW5nZSlbMF0sXG4gICAgICAgICAgICAoeGF4aXMuX3JsIHx8IHhheGlzLnJhbmdlKVsxXSxcbiAgICAgICAgICAgICh5YXhpcy5fcmwgfHwgeWF4aXMucmFuZ2UpWzFdXG4gICAgICAgIF1cbiAgICB9O1xuICAgIHZhciB2cFJhbmdlID0gTGliLnJlcGVhdCh2cFJhbmdlMCwgc2NlbmUuY291bnQpO1xuXG4gICAgLy8gdXBsb2FkIHZpZXdwb3J0L3JhbmdlIGRhdGEgdG8gR1BVXG4gICAgaWYoc2NlbmUuZmlsbDJkKSB7XG4gICAgICAgIHNjZW5lLmZpbGwyZC51cGRhdGUodnBSYW5nZSk7XG4gICAgfVxuICAgIGlmKHNjZW5lLmxpbmUyZCkge1xuICAgICAgICBzY2VuZS5saW5lMmQudXBkYXRlKHZwUmFuZ2UpO1xuICAgIH1cbiAgICBpZihzY2VuZS5lcnJvcjJkKSB7XG4gICAgICAgIHNjZW5lLmVycm9yMmQudXBkYXRlKHZwUmFuZ2UuY29uY2F0KHZwUmFuZ2UpKTtcbiAgICB9XG4gICAgaWYoc2NlbmUuc2NhdHRlcjJkKSB7XG4gICAgICAgIHNjZW5lLnNjYXR0ZXIyZC51cGRhdGUodnBSYW5nZSk7XG4gICAgfVxuICAgIGlmKHNjZW5lLnNlbGVjdDJkKSB7XG4gICAgICAgIHNjZW5lLnNlbGVjdDJkLnVwZGF0ZSh2cFJhbmdlKTtcbiAgICB9XG4gICAgaWYoc2NlbmUuZ2xUZXh0KSB7XG4gICAgICAgIHNjZW5lLmdsVGV4dC5mb3JFYWNoKGZ1bmN0aW9uKHRleHQpIHsgdGV4dC51cGRhdGUodnBSYW5nZTApOyB9KTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbi8vIG1ha2Ugc3VyZSBzY2VuZSBleGlzdHMgb24gc3VicGxvdCwgcmV0dXJuIGl0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNjZW5lVXBkYXRlKGdkLCBzdWJwbG90KSB7XG4gICAgdmFyIHNjZW5lID0gc3VicGxvdC5fc2NlbmU7XG5cbiAgICB2YXIgcmVzZXRPcHRzID0ge1xuICAgICAgICAvLyBudW1iZXIgb2YgdHJhY2VzIGluIHN1YnBsb3QsIHNpbmNlIHNjZW5lOnN1YnBsb3QgLT4gMToxXG4gICAgICAgIGNvdW50OiAwLFxuICAgICAgICAvLyB3aGV0aGVyIHNjZW5lIHJlcXVpcmVzIGluaXQgaG9vayBpbiBwbG90IGNhbGwgKGRpcnR5IHBsb3QgY2FsbClcbiAgICAgICAgZGlydHk6IHRydWUsXG4gICAgICAgIC8vIGxhc3QgdXNlZCBvcHRpb25zXG4gICAgICAgIGxpbmVPcHRpb25zOiBbXSxcbiAgICAgICAgZmlsbE9wdGlvbnM6IFtdLFxuICAgICAgICBtYXJrZXJPcHRpb25zOiBbXSxcbiAgICAgICAgbWFya2VyU2VsZWN0ZWRPcHRpb25zOiBbXSxcbiAgICAgICAgbWFya2VyVW5zZWxlY3RlZE9wdGlvbnM6IFtdLFxuICAgICAgICBlcnJvclhPcHRpb25zOiBbXSxcbiAgICAgICAgZXJyb3JZT3B0aW9uczogW10sXG4gICAgICAgIHRleHRPcHRpb25zOiBbXSxcbiAgICAgICAgdGV4dFNlbGVjdGVkT3B0aW9uczogW10sXG4gICAgICAgIHRleHRVbnNlbGVjdGVkT3B0aW9uczogW10sXG4gICAgICAgIC8vIHNlbGVjdGlvbiBiYXRjaGVzXG4gICAgICAgIHNlbGVjdEJhdGNoOiBbXSxcbiAgICAgICAgdW5zZWxlY3RCYXRjaDogW11cbiAgICB9O1xuXG4gICAgLy8gcmVnbC0gY29tcG9uZW50IHN0dWJzLCBpbml0aWFsaXplZCBpbiBkaXJ0eSBwbG90IGNhbGxcbiAgICB2YXIgaW5pdE9wdHMgPSB7XG4gICAgICAgIGZpbGwyZDogZmFsc2UsXG4gICAgICAgIHNjYXR0ZXIyZDogZmFsc2UsXG4gICAgICAgIGVycm9yMmQ6IGZhbHNlLFxuICAgICAgICBsaW5lMmQ6IGZhbHNlLFxuICAgICAgICBnbFRleHQ6IGZhbHNlLFxuICAgICAgICBzZWxlY3QyZDogZmFsc2VcbiAgICB9O1xuXG4gICAgaWYoIXN1YnBsb3QuX3NjZW5lKSB7XG4gICAgICAgIHNjZW5lID0gc3VicGxvdC5fc2NlbmUgPSB7fTtcblxuICAgICAgICBzY2VuZS5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KHNjZW5lLCBpbml0T3B0cywgcmVzZXRPcHRzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY2VuZS5pbml0KCk7XG5cbiAgICAgICAgLy8gYXBwbHkgbmV3IG9wdGlvbiB0byBhbGwgcmVnbCBjb21wb25lbnRzICh1c2VkIG9uIGRyYWcpXG4gICAgICAgIHNjZW5lLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShvcHQpIHtcbiAgICAgICAgICAgIHZhciBvcHRzID0gTGliLnJlcGVhdChvcHQsIHNjZW5lLmNvdW50KTtcblxuICAgICAgICAgICAgaWYoc2NlbmUuZmlsbDJkKSBzY2VuZS5maWxsMmQudXBkYXRlKG9wdHMpO1xuICAgICAgICAgICAgaWYoc2NlbmUuc2NhdHRlcjJkKSBzY2VuZS5zY2F0dGVyMmQudXBkYXRlKG9wdHMpO1xuICAgICAgICAgICAgaWYoc2NlbmUubGluZTJkKSBzY2VuZS5saW5lMmQudXBkYXRlKG9wdHMpO1xuICAgICAgICAgICAgaWYoc2NlbmUuZXJyb3IyZCkgc2NlbmUuZXJyb3IyZC51cGRhdGUob3B0cy5jb25jYXQob3B0cykpO1xuICAgICAgICAgICAgaWYoc2NlbmUuc2VsZWN0MmQpIHNjZW5lLnNlbGVjdDJkLnVwZGF0ZShvcHRzKTtcbiAgICAgICAgICAgIGlmKHNjZW5lLmdsVGV4dCkge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzY2VuZS5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLmdsVGV4dFtpXS51cGRhdGUob3B0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gZHJhdyB0cmFjZXMgaW4gcHJvcGVyIG9yZGVyXG4gICAgICAgIHNjZW5lLmRyYXcgPSBmdW5jdGlvbiBkcmF3KCkge1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gc2NlbmUuY291bnQ7XG4gICAgICAgICAgICB2YXIgZmlsbDJkID0gc2NlbmUuZmlsbDJkO1xuICAgICAgICAgICAgdmFyIGVycm9yMmQgPSBzY2VuZS5lcnJvcjJkO1xuICAgICAgICAgICAgdmFyIGxpbmUyZCA9IHNjZW5lLmxpbmUyZDtcbiAgICAgICAgICAgIHZhciBzY2F0dGVyMmQgPSBzY2VuZS5zY2F0dGVyMmQ7XG4gICAgICAgICAgICB2YXIgZ2xUZXh0ID0gc2NlbmUuZ2xUZXh0O1xuICAgICAgICAgICAgdmFyIHNlbGVjdDJkID0gc2NlbmUuc2VsZWN0MmQ7XG4gICAgICAgICAgICB2YXIgc2VsZWN0QmF0Y2ggPSBzY2VuZS5zZWxlY3RCYXRjaDtcbiAgICAgICAgICAgIHZhciB1bnNlbGVjdEJhdGNoID0gc2NlbmUudW5zZWxlY3RCYXRjaDtcblxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihmaWxsMmQgJiYgc2NlbmUuZmlsbE9yZGVyW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGwyZC5kcmF3KHNjZW5lLmZpbGxPcmRlcltpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGxpbmUyZCAmJiBzY2VuZS5saW5lT3B0aW9uc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lMmQuZHJhdyhpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoZXJyb3IyZCkge1xuICAgICAgICAgICAgICAgICAgICBpZihzY2VuZS5lcnJvclhPcHRpb25zW2ldKSBlcnJvcjJkLmRyYXcoaSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNjZW5lLmVycm9yWU9wdGlvbnNbaV0pIGVycm9yMmQuZHJhdyhpICsgY291bnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzY2F0dGVyMmQgJiYgc2NlbmUubWFya2VyT3B0aW9uc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBpZih1bnNlbGVjdEJhdGNoW2ldLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZyA9IExpYi5yZXBlYXQoW10sIHNjZW5lLmNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ1tpXSA9IHVuc2VsZWN0QmF0Y2hbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2F0dGVyMmQuZHJhdyhhcmcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIXNlbGVjdEJhdGNoW2ldLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlcjJkLmRyYXcoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoZ2xUZXh0W2ldICYmIHNjZW5lLnRleHRPcHRpb25zW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsVGV4dFtpXS5yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNlbGVjdDJkKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0MmQuZHJhdyhzZWxlY3RCYXRjaCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjZW5lLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gcmVtb3ZlIHNjZW5lIHJlc291cmNlc1xuICAgICAgICBzY2VuZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgIGlmKHNjZW5lLmZpbGwyZCAmJiBzY2VuZS5maWxsMmQuZGVzdHJveSkgc2NlbmUuZmlsbDJkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGlmKHNjZW5lLnNjYXR0ZXIyZCAmJiBzY2VuZS5zY2F0dGVyMmQuZGVzdHJveSkgc2NlbmUuc2NhdHRlcjJkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGlmKHNjZW5lLmVycm9yMmQgJiYgc2NlbmUuZXJyb3IyZC5kZXN0cm95KSBzY2VuZS5lcnJvcjJkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGlmKHNjZW5lLmxpbmUyZCAmJiBzY2VuZS5saW5lMmQuZGVzdHJveSkgc2NlbmUubGluZTJkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGlmKHNjZW5lLnNlbGVjdDJkICYmIHNjZW5lLnNlbGVjdDJkLmRlc3Ryb3kpIHNjZW5lLnNlbGVjdDJkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGlmKHNjZW5lLmdsVGV4dCkge1xuICAgICAgICAgICAgICAgIHNjZW5lLmdsVGV4dC5mb3JFYWNoKGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGV4dC5kZXN0cm95KSB0ZXh0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2NlbmUubGluZU9wdGlvbnMgPSBudWxsO1xuICAgICAgICAgICAgc2NlbmUuZmlsbE9wdGlvbnMgPSBudWxsO1xuICAgICAgICAgICAgc2NlbmUubWFya2VyT3B0aW9ucyA9IG51bGw7XG4gICAgICAgICAgICBzY2VuZS5tYXJrZXJTZWxlY3RlZE9wdGlvbnMgPSBudWxsO1xuICAgICAgICAgICAgc2NlbmUubWFya2VyVW5zZWxlY3RlZE9wdGlvbnMgPSBudWxsO1xuICAgICAgICAgICAgc2NlbmUuZXJyb3JYT3B0aW9ucyA9IG51bGw7XG4gICAgICAgICAgICBzY2VuZS5lcnJvcllPcHRpb25zID0gbnVsbDtcbiAgICAgICAgICAgIHNjZW5lLnRleHRPcHRpb25zID0gbnVsbDtcbiAgICAgICAgICAgIHNjZW5lLnRleHRTZWxlY3RlZE9wdGlvbnMgPSBudWxsO1xuICAgICAgICAgICAgc2NlbmUudGV4dFVuc2VsZWN0ZWRPcHRpb25zID0gbnVsbDtcblxuICAgICAgICAgICAgc2NlbmUuc2VsZWN0QmF0Y2ggPSBudWxsO1xuICAgICAgICAgICAgc2NlbmUudW5zZWxlY3RCYXRjaCA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIHdlIGNhbid0IGp1c3QgZGVsZXRlIF9zY2VuZSwgYmVjYXVzZSBgZGVzdHJveWAgaXMgY2FsbGVkIGluIHRoZVxuICAgICAgICAgICAgLy8gbWlkZGxlIG9mIHN1cHBseURlZmF1bHRzLCBiZWZvcmUgcmVsaW5rUHJpdmF0ZUtleXMgd2hpY2ggd2lsbCBwdXQgaXQgYmFjay5cbiAgICAgICAgICAgIHN1YnBsb3QuX3NjZW5lID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBpbiBjYXNlIGlmIHdlIGhhdmUgc2NlbmUgZnJvbSB0aGUgbGFzdCBjYWxjIC0gcmVzZXQgZGF0YVxuICAgIGlmKCFzY2VuZS5kaXJ0eSkge1xuICAgICAgICBMaWIuZXh0ZW5kRmxhdChzY2VuZSwgcmVzZXRPcHRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NlbmU7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgc3R5bGVUZXh0U2VsZWN0aW9uID0gcmVxdWlyZSgnLi9lZGl0X3N0eWxlJykuc3R5bGVUZXh0U2VsZWN0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNlbGVjdChzZWFyY2hJbmZvLCBzZWxlY3Rpb25UZXN0ZXIpIHtcbiAgICB2YXIgY2QgPSBzZWFyY2hJbmZvLmNkO1xuICAgIHZhciBzZWxlY3Rpb24gPSBbXTtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgc3Rhc2ggPSBjZFswXS50O1xuICAgIHZhciBsZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciB4ID0gc3Rhc2gueDtcbiAgICB2YXIgeSA9IHN0YXNoLnk7XG4gICAgdmFyIHNjZW5lID0gc3Rhc2guX3NjZW5lO1xuICAgIHZhciBpbmRleCA9IHN0YXNoLmluZGV4O1xuXG4gICAgaWYoIXNjZW5lKSByZXR1cm4gc2VsZWN0aW9uO1xuXG4gICAgdmFyIGhhc1RleHQgPSBzdWJUeXBlcy5oYXNUZXh0KHRyYWNlKTtcbiAgICB2YXIgaGFzTWFya2VycyA9IHN1YlR5cGVzLmhhc01hcmtlcnModHJhY2UpO1xuICAgIHZhciBoYXNPbmx5TGluZXMgPSAhaGFzTWFya2VycyAmJiAhaGFzVGV4dDtcblxuICAgIGlmKHRyYWNlLnZpc2libGUgIT09IHRydWUgfHwgaGFzT25seUxpbmVzKSByZXR1cm4gc2VsZWN0aW9uO1xuXG4gICAgdmFyIGVscyA9IFtdO1xuICAgIHZhciB1bmVscyA9IFtdO1xuXG4gICAgLy8gZGVnZW5lcmF0ZSBwb2x5Z29uIGRvZXMgbm90IGVuYWJsZSBzZWxlY3Rpb25cbiAgICAvLyBmaWx0ZXIgb3V0IHBvaW50cyBieSB2aXNpYmxlIHNjYXR0ZXIgb25lc1xuICAgIGlmKHNlbGVjdGlvblRlc3RlciAhPT0gZmFsc2UgJiYgIXNlbGVjdGlvblRlc3Rlci5kZWdlbmVyYXRlKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYoc2VsZWN0aW9uVGVzdGVyLmNvbnRhaW5zKFtzdGFzaC54cHhbaV0sIHN0YXNoLnlweFtpXV0sIGZhbHNlLCBpLCBzZWFyY2hJbmZvKSkge1xuICAgICAgICAgICAgICAgIGVscy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnROdW1iZXI6IGksXG4gICAgICAgICAgICAgICAgICAgIHg6IHhbaV0sXG4gICAgICAgICAgICAgICAgICAgIHk6IHlbaV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5lbHMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKGhhc01hcmtlcnMpIHtcbiAgICAgICAgdmFyIHNjYXR0ZXIyZCA9IHNjZW5lLnNjYXR0ZXIyZDtcblxuICAgICAgICBpZighZWxzLmxlbmd0aCAmJiAhdW5lbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyByZXNldCB0byBiYXNlIHN0eWxlcyB3aGVuIGNsZWFyaW5nXG4gICAgICAgICAgICB2YXIgYmFzZU9wdHMgPSBuZXcgQXJyYXkoc2NlbmUuY291bnQpO1xuICAgICAgICAgICAgYmFzZU9wdHNbaW5kZXhdID0gc2NlbmUubWFya2VyT3B0aW9uc1tpbmRleF07XG4gICAgICAgICAgICBzY2F0dGVyMmQudXBkYXRlLmFwcGx5KHNjYXR0ZXIyZCwgYmFzZU9wdHMpO1xuICAgICAgICB9IGVsc2UgaWYoIXNjZW5lLnNlbGVjdEJhdGNoW2luZGV4XS5sZW5ndGggJiYgIXNjZW5lLnVuc2VsZWN0QmF0Y2hbaW5kZXhdLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gc2V0IHVuc2VsZWN0ZWQgc3R5bGVzIG9uICdjb250ZXh0JyBjYW52YXMgKGlmIG5vdCBkb25lIGFscmVhZHkpXG4gICAgICAgICAgICB2YXIgdW5zZWxPcHRzID0gbmV3IEFycmF5KHNjZW5lLmNvdW50KTtcbiAgICAgICAgICAgIHVuc2VsT3B0c1tpbmRleF0gPSBzY2VuZS5tYXJrZXJVbnNlbGVjdGVkT3B0aW9uc1tpbmRleF07XG4gICAgICAgICAgICBzY2F0dGVyMmQudXBkYXRlLmFwcGx5KHNjYXR0ZXIyZCwgdW5zZWxPcHRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjZW5lLnNlbGVjdEJhdGNoW2luZGV4XSA9IGVscztcbiAgICBzY2VuZS51bnNlbGVjdEJhdGNoW2luZGV4XSA9IHVuZWxzO1xuXG4gICAgaWYoaGFzVGV4dCkge1xuICAgICAgICBzdHlsZVRleHRTZWxlY3Rpb24oY2QpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3Rpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGdldEJvdW5kcyA9IHJlcXVpcmUoJ2FycmF5LWJvdW5kcycpXG5jb25zdCByZ2JhID0gcmVxdWlyZSgnY29sb3Itbm9ybWFsaXplJylcbmNvbnN0IHVwZGF0ZURpZmYgPSByZXF1aXJlKCd1cGRhdGUtZGlmZicpXG5jb25zdCBwaWNrID0gcmVxdWlyZSgncGljay1ieS1hbGlhcycpXG5jb25zdCBleHRlbmQgPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJylcbmNvbnN0IGZsYXR0ZW4gPSByZXF1aXJlKCdmbGF0dGVuLXZlcnRleC1kYXRhJylcbmNvbnN0IHtmbG9hdDMyLCBmcmFjdDMyfSA9IHJlcXVpcmUoJ3RvLWZsb2F0MzInKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVycm9yMkRcblxuY29uc3QgV0VJR0hUUyA9IFtcblx0Ly9kaXJlY3Rpb24sIGxpbmVXaWR0aCBzaGlmdCwgY2FwU2l6ZSBzaGlmdFxuXG5cdC8vIHgtZXJyb3IgYmFyXG5cdFsxLCAwLCAwLCAxLCAwLCAwXSxcblx0WzEsIDAsIDAsIC0xLCAwLCAwXSxcblx0Wy0xLCAwLCAwLCAtMSwgMCwgMF0sXG5cblx0Wy0xLCAwLCAwLCAtMSwgMCwgMF0sXG5cdFstMSwgMCwgMCwgMSwgMCwgMF0sXG5cdFsxLCAwLCAwLCAxLCAwLCAwXSxcblxuXHQvLyB4LWVycm9yIHJpZ2h0IGNhcFxuXHRbMSwgMCwgLTEsIDAsIDAsIDFdLFxuXHRbMSwgMCwgLTEsIDAsIDAsIC0xXSxcblx0WzEsIDAsIDEsIDAsIDAsIC0xXSxcblxuXHRbMSwgMCwgMSwgMCwgMCwgLTFdLFxuXHRbMSwgMCwgMSwgMCwgMCwgMV0sXG5cdFsxLCAwLCAtMSwgMCwgMCwgMV0sXG5cblx0Ly8geC1lcnJvciBsZWZ0IGNhcFxuXHRbLTEsIDAsIC0xLCAwLCAwLCAxXSxcblx0Wy0xLCAwLCAtMSwgMCwgMCwgLTFdLFxuXHRbLTEsIDAsIDEsIDAsIDAsIC0xXSxcblxuXHRbLTEsIDAsIDEsIDAsIDAsIC0xXSxcblx0Wy0xLCAwLCAxLCAwLCAwLCAxXSxcblx0Wy0xLCAwLCAtMSwgMCwgMCwgMV0sXG5cblx0Ly8geS1lcnJvciBiYXJcblx0WzAsIDEsIDEsIDAsIDAsIDBdLFxuXHRbMCwgMSwgLTEsIDAsIDAsIDBdLFxuXHRbMCwgLTEsIC0xLCAwLCAwLCAwXSxcblxuXHRbMCwgLTEsIC0xLCAwLCAwLCAwXSxcblx0WzAsIDEsIDEsIDAsIDAsIDBdLFxuXHRbMCwgLTEsIDEsIDAsIDAsIDBdLFxuXG5cdC8vIHktZXJyb3IgdG9wIGNhcFxuXHRbMCwgMSwgMCwgLTEsIDEsIDBdLFxuXHRbMCwgMSwgMCwgLTEsIC0xLCAwXSxcblx0WzAsIDEsIDAsIDEsIC0xLCAwXSxcblxuXHRbMCwgMSwgMCwgMSwgMSwgMF0sXG5cdFswLCAxLCAwLCAtMSwgMSwgMF0sXG5cdFswLCAxLCAwLCAxLCAtMSwgMF0sXG5cblx0Ly8geS1lcnJvciBib3R0b20gY2FwXG5cdFswLCAtMSwgMCwgLTEsIDEsIDBdLFxuXHRbMCwgLTEsIDAsIC0xLCAtMSwgMF0sXG5cdFswLCAtMSwgMCwgMSwgLTEsIDBdLFxuXG5cdFswLCAtMSwgMCwgMSwgMSwgMF0sXG5cdFswLCAtMSwgMCwgLTEsIDEsIDBdLFxuXHRbMCwgLTEsIDAsIDEsIC0xLCAwXVxuXVxuXG5cbmZ1bmN0aW9uIEVycm9yMkQgKHJlZ2wsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiByZWdsID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKCFvcHRpb25zKSBvcHRpb25zID0ge31cblx0XHRvcHRpb25zLnJlZ2wgPSByZWdsXG5cdH1cblx0ZWxzZSB7XG5cdFx0b3B0aW9ucyA9IHJlZ2xcblx0fVxuXHRpZiAob3B0aW9ucy5sZW5ndGgpIG9wdGlvbnMucG9zaXRpb25zID0gb3B0aW9uc1xuXHRyZWdsID0gb3B0aW9ucy5yZWdsXG5cblx0aWYgKCFyZWdsLmhhc0V4dGVuc2lvbignQU5HTEVfaW5zdGFuY2VkX2FycmF5cycpKSB7XG5cdFx0dGhyb3cgRXJyb3IoJ3JlZ2wtZXJyb3IyZDogYEFOR0xFX2luc3RhbmNlZF9hcnJheXNgIGV4dGVuc2lvbiBzaG91bGQgYmUgZW5hYmxlZCcpO1xuXHR9XG5cblx0Ly8gcGVyc2lzdGVudCB2YXJpYWJsZXNcblx0bGV0IGdsID0gcmVnbC5fZ2wsIGRyYXdFcnJvcnMsIHBvc2l0aW9uQnVmZmVyLCBwb3NpdGlvbkZyYWN0QnVmZmVyLCBjb2xvckJ1ZmZlciwgZXJyb3JCdWZmZXIsIG1lc2hCdWZmZXIsXG5cdFx0XHRkZWZhdWx0cyA9IHtcblx0XHRcdFx0Y29sb3I6ICdibGFjaycsXG5cdFx0XHRcdGNhcFNpemU6IDUsXG5cdFx0XHRcdGxpbmVXaWR0aDogMSxcblx0XHRcdFx0b3BhY2l0eTogMSxcblx0XHRcdFx0dmlld3BvcnQ6IG51bGwsXG5cdFx0XHRcdHJhbmdlOiBudWxsLFxuXHRcdFx0XHRvZmZzZXQ6IDAsXG5cdFx0XHRcdGNvdW50OiAwLFxuXHRcdFx0XHRib3VuZHM6IG51bGwsXG5cdFx0XHRcdHBvc2l0aW9uczogW10sXG5cdFx0XHRcdGVycm9yczogW11cblx0XHRcdH0sIGdyb3VwcyA9IFtdXG5cblx0Ly9jb2xvciBwZXItcG9pbnRcblx0Y29sb3JCdWZmZXIgPSByZWdsLmJ1ZmZlcih7XG5cdFx0dXNhZ2U6ICdkeW5hbWljJyxcblx0XHR0eXBlOiAndWludDgnLFxuXHRcdGRhdGE6IG5ldyBVaW50OEFycmF5KDApXG5cdH0pXG5cdC8veHktcG9zaXRpb24gcGVyLXBvaW50XG5cdHBvc2l0aW9uQnVmZmVyID0gcmVnbC5idWZmZXIoe1xuXHRcdHVzYWdlOiAnZHluYW1pYycsXG5cdFx0dHlwZTogJ2Zsb2F0Jyxcblx0XHRkYXRhOiBuZXcgVWludDhBcnJheSgwKVxuXHR9KVxuXHQvL3h5LXBvc2l0aW9uIGZsb2F0MzItZnJhY3Rpb25cblx0cG9zaXRpb25GcmFjdEJ1ZmZlciA9IHJlZ2wuYnVmZmVyKHtcblx0XHR1c2FnZTogJ2R5bmFtaWMnLFxuXHRcdHR5cGU6ICdmbG9hdCcsXG5cdFx0ZGF0YTogbmV3IFVpbnQ4QXJyYXkoMClcblx0fSlcblx0Ly80IGVycm9ycyBwZXItcG9pbnRcblx0ZXJyb3JCdWZmZXIgPSByZWdsLmJ1ZmZlcih7XG5cdFx0dXNhZ2U6ICdkeW5hbWljJyxcblx0XHR0eXBlOiAnZmxvYXQnLFxuXHRcdGRhdGE6IG5ldyBVaW50OEFycmF5KDApXG5cdH0pXG5cdC8vZXJyb3IgYmFyIG1lc2hcblx0bWVzaEJ1ZmZlciA9IHJlZ2wuYnVmZmVyKHtcblx0XHR1c2FnZTogJ3N0YXRpYycsXG5cdFx0dHlwZTogJ2Zsb2F0Jyxcblx0XHRkYXRhOiBXRUlHSFRTXG5cdH0pXG5cblx0dXBkYXRlKG9wdGlvbnMpXG5cblx0Ly9kcmF3aW5nIG1ldGhvZFxuXHRkcmF3RXJyb3JzID0gcmVnbCh7XG5cdFx0dmVydDogYFxuXHRcdHByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxuXHRcdGF0dHJpYnV0ZSB2ZWMyIHBvc2l0aW9uLCBwb3NpdGlvbkZyYWN0O1xuXHRcdGF0dHJpYnV0ZSB2ZWM0IGVycm9yO1xuXHRcdGF0dHJpYnV0ZSB2ZWM0IGNvbG9yO1xuXG5cdFx0YXR0cmlidXRlIHZlYzIgZGlyZWN0aW9uLCBsaW5lT2Zmc2V0LCBjYXBPZmZzZXQ7XG5cblx0XHR1bmlmb3JtIHZlYzQgdmlld3BvcnQ7XG5cdFx0dW5pZm9ybSBmbG9hdCBsaW5lV2lkdGgsIGNhcFNpemU7XG5cdFx0dW5pZm9ybSB2ZWMyIHNjYWxlLCBzY2FsZUZyYWN0LCB0cmFuc2xhdGUsIHRyYW5zbGF0ZUZyYWN0O1xuXG5cdFx0dmFyeWluZyB2ZWM0IGZyYWdDb2xvcjtcblxuXHRcdHZvaWQgbWFpbigpIHtcblx0XHRcdGZyYWdDb2xvciA9IGNvbG9yIC8gMjU1LjtcblxuXHRcdFx0dmVjMiBwaXhlbE9mZnNldCA9IGxpbmVXaWR0aCAqIGxpbmVPZmZzZXQgKyAoY2FwU2l6ZSArIGxpbmVXaWR0aCkgKiBjYXBPZmZzZXQ7XG5cblx0XHRcdHZlYzIgZHh5ID0gLXN0ZXAoLjUsIGRpcmVjdGlvbi54eSkgKiBlcnJvci54eiArIHN0ZXAoZGlyZWN0aW9uLnh5LCB2ZWMyKC0uNSkpICogZXJyb3IueXc7XG5cblx0XHRcdHZlYzIgcG9zaXRpb24gPSBwb3NpdGlvbiArIGR4eTtcblxuXHRcdFx0dmVjMiBwb3MgPSAocG9zaXRpb24gKyB0cmFuc2xhdGUpICogc2NhbGVcblx0XHRcdFx0KyAocG9zaXRpb25GcmFjdCArIHRyYW5zbGF0ZUZyYWN0KSAqIHNjYWxlXG5cdFx0XHRcdCsgKHBvc2l0aW9uICsgdHJhbnNsYXRlKSAqIHNjYWxlRnJhY3Rcblx0XHRcdFx0KyAocG9zaXRpb25GcmFjdCArIHRyYW5zbGF0ZUZyYWN0KSAqIHNjYWxlRnJhY3Q7XG5cblx0XHRcdHBvcyArPSBwaXhlbE9mZnNldCAvIHZpZXdwb3J0Lnp3O1xuXG5cdFx0XHRnbF9Qb3NpdGlvbiA9IHZlYzQocG9zICogMi4gLSAxLiwgMCwgMSk7XG5cdFx0fVxuXHRcdGAsXG5cblx0XHRmcmFnOiBgXG5cdFx0cHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG5cdFx0dmFyeWluZyB2ZWM0IGZyYWdDb2xvcjtcblxuXHRcdHVuaWZvcm0gZmxvYXQgb3BhY2l0eTtcblxuXHRcdHZvaWQgbWFpbigpIHtcblx0XHRcdGdsX0ZyYWdDb2xvciA9IGZyYWdDb2xvcjtcblx0XHRcdGdsX0ZyYWdDb2xvci5hICo9IG9wYWNpdHk7XG5cdFx0fVxuXHRcdGAsXG5cblx0XHR1bmlmb3Jtczoge1xuXHRcdFx0cmFuZ2U6IHJlZ2wucHJvcCgncmFuZ2UnKSxcblx0XHRcdGxpbmVXaWR0aDogcmVnbC5wcm9wKCdsaW5lV2lkdGgnKSxcblx0XHRcdGNhcFNpemU6IHJlZ2wucHJvcCgnY2FwU2l6ZScpLFxuXHRcdFx0b3BhY2l0eTogcmVnbC5wcm9wKCdvcGFjaXR5JyksXG5cdFx0XHRzY2FsZTogcmVnbC5wcm9wKCdzY2FsZScpLFxuXHRcdFx0dHJhbnNsYXRlOiByZWdsLnByb3AoJ3RyYW5zbGF0ZScpLFxuXHRcdFx0c2NhbGVGcmFjdDogcmVnbC5wcm9wKCdzY2FsZUZyYWN0JyksXG5cdFx0XHR0cmFuc2xhdGVGcmFjdDogcmVnbC5wcm9wKCd0cmFuc2xhdGVGcmFjdCcpLFxuXHRcdFx0dmlld3BvcnQ6IChjdHgsIHByb3ApID0+IFtwcm9wLnZpZXdwb3J0LngsIHByb3Audmlld3BvcnQueSwgY3R4LnZpZXdwb3J0V2lkdGgsIGN0eC52aWV3cG9ydEhlaWdodF1cblx0XHR9LFxuXG5cdFx0YXR0cmlidXRlczoge1xuXHRcdFx0Ly9keW5hbWljIGF0dHJpYnV0ZXNcblx0XHRcdGNvbG9yOiB7XG5cdFx0XHRcdGJ1ZmZlcjogY29sb3JCdWZmZXIsXG5cdFx0XHRcdG9mZnNldDogKGN0eCwgcHJvcCkgPT4gcHJvcC5vZmZzZXQgKiA0LFxuXHRcdFx0XHRkaXZpc29yOiAxLFxuXHRcdFx0fSxcblx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdGJ1ZmZlcjogcG9zaXRpb25CdWZmZXIsXG5cdFx0XHRcdG9mZnNldDogKGN0eCwgcHJvcCkgPT4gcHJvcC5vZmZzZXQgKiA4LFxuXHRcdFx0XHRkaXZpc29yOiAxXG5cdFx0XHR9LFxuXHRcdFx0cG9zaXRpb25GcmFjdDoge1xuXHRcdFx0XHRidWZmZXI6IHBvc2l0aW9uRnJhY3RCdWZmZXIsXG5cdFx0XHRcdG9mZnNldDogKGN0eCwgcHJvcCkgPT4gcHJvcC5vZmZzZXQgKiA4LFxuXHRcdFx0XHRkaXZpc29yOiAxXG5cdFx0XHR9LFxuXHRcdFx0ZXJyb3I6IHtcblx0XHRcdFx0YnVmZmVyOiBlcnJvckJ1ZmZlcixcblx0XHRcdFx0b2Zmc2V0OiAoY3R4LCBwcm9wKSA9PiBwcm9wLm9mZnNldCAqIDE2LFxuXHRcdFx0XHRkaXZpc29yOiAxXG5cdFx0XHR9LFxuXG5cdFx0XHQvL3N0YXRpYyBhdHRyaWJ1dGVzXG5cdFx0XHRkaXJlY3Rpb246IHtcblx0XHRcdFx0YnVmZmVyOiBtZXNoQnVmZmVyLFxuXHRcdFx0XHRzdHJpZGU6IDI0LFxuXHRcdFx0XHRvZmZzZXQ6IDBcblx0XHRcdH0sXG5cdFx0XHRsaW5lT2Zmc2V0OiB7XG5cdFx0XHRcdGJ1ZmZlcjogbWVzaEJ1ZmZlcixcblx0XHRcdFx0c3RyaWRlOiAyNCxcblx0XHRcdFx0b2Zmc2V0OiA4XG5cdFx0XHR9LFxuXHRcdFx0Y2FwT2Zmc2V0OiB7XG5cdFx0XHRcdGJ1ZmZlcjogbWVzaEJ1ZmZlcixcblx0XHRcdFx0c3RyaWRlOiAyNCxcblx0XHRcdFx0b2Zmc2V0OiAxNlxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwcmltaXRpdmU6ICd0cmlhbmdsZXMnLFxuXG5cdFx0YmxlbmQ6IHtcblx0XHRcdGVuYWJsZTogdHJ1ZSxcblx0XHRcdGNvbG9yOiBbMCwwLDAsMF0sXG5cdFx0XHRlcXVhdGlvbjoge1xuXHRcdFx0XHRyZ2I6ICdhZGQnLFxuXHRcdFx0XHRhbHBoYTogJ2FkZCdcblx0XHRcdH0sXG5cdFx0XHRmdW5jOiB7XG5cdFx0XHRcdHNyY1JHQjogJ3NyYyBhbHBoYScsXG5cdFx0XHRcdGRzdFJHQjogJ29uZSBtaW51cyBzcmMgYWxwaGEnLFxuXHRcdFx0XHRzcmNBbHBoYTogJ29uZSBtaW51cyBkc3QgYWxwaGEnLFxuXHRcdFx0XHRkc3RBbHBoYTogJ29uZSdcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0ZGVwdGg6IHtcblx0XHRcdGVuYWJsZTogZmFsc2Vcblx0XHR9LFxuXG5cdFx0c2Npc3Nvcjoge1xuXHRcdFx0ZW5hYmxlOiB0cnVlLFxuXHRcdFx0Ym94OiByZWdsLnByb3AoJ3ZpZXdwb3J0Jylcblx0XHR9LFxuXHRcdHZpZXdwb3J0OiByZWdsLnByb3AoJ3ZpZXdwb3J0JyksXG5cdFx0c3RlbmNpbDogZmFsc2UsXG5cblx0XHRpbnN0YW5jZXM6IHJlZ2wucHJvcCgnY291bnQnKSxcblx0XHRjb3VudDogV0VJR0hUUy5sZW5ndGhcblx0fSlcblxuXHQvL2V4cG9zZSBBUElcblx0ZXh0ZW5kKGVycm9yMmQsIHtcblx0XHR1cGRhdGU6IHVwZGF0ZSxcblx0XHRkcmF3OiBkcmF3LFxuXHRcdGRlc3Ryb3k6IGRlc3Ryb3ksXG5cdFx0cmVnbDogcmVnbCxcblx0XHRnbDogZ2wsXG5cdFx0Y2FudmFzOiBnbC5jYW52YXMsXG5cdFx0Z3JvdXBzOiBncm91cHNcblx0fSlcblxuXHRyZXR1cm4gZXJyb3IyZFxuXG5cdGZ1bmN0aW9uIGVycm9yMmQgKG9wdHMpIHtcblx0XHQvL3VwZGF0ZVxuXHRcdGlmIChvcHRzKSB7XG5cdFx0XHR1cGRhdGUob3B0cylcblx0XHR9XG5cblx0XHQvL2Rlc3Ryb3lcblx0XHRlbHNlIGlmIChvcHRzID09PSBudWxsKSB7XG5cdFx0XHRkZXN0cm95KClcblx0XHR9XG5cblx0XHRkcmF3KClcblx0fVxuXG5cblx0Ly9tYWluIGRyYXcgbWV0aG9kXG5cdGZ1bmN0aW9uIGRyYXcgKG9wdGlvbnMpIHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdudW1iZXInKSByZXR1cm4gZHJhd0dyb3VwKG9wdGlvbnMpXG5cblx0XHQvL21ha2Ugb3B0aW9ucyBhIGJhdGNoXG5cdFx0aWYgKG9wdGlvbnMgJiYgIUFycmF5LmlzQXJyYXkob3B0aW9ucykpIG9wdGlvbnMgPSBbb3B0aW9uc11cblxuXG5cdFx0cmVnbC5fcmVmcmVzaCgpXG5cblx0XHQvL3JlbmRlciBtdWx0aXBsZSBwb2x5bGluZXMgdmlhIHJlZ2wgYmF0Y2hcblx0XHRncm91cHMuZm9yRWFjaCgocywgaSkgPT4ge1xuXHRcdFx0aWYgKCFzKSByZXR1cm5cblxuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0aWYgKCFvcHRpb25zW2ldKSBzLmRyYXcgPSBmYWxzZVxuXHRcdFx0XHRlbHNlIHMuZHJhdyA9IHRydWVcblx0XHRcdH1cblxuXHRcdFx0Ly9pZ25vcmUgZHJhdyBmbGFnIGZvciBvbmUgcGFzc1xuXHRcdFx0aWYgKCFzLmRyYXcpIHtcblx0XHRcdFx0cy5kcmF3ID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cblx0XHRcdGRyYXdHcm91cChpKVxuXHRcdH0pXG5cdH1cblxuXHQvL2RyYXcgc2luZ2xlIGVycm9yIGdyb3VwIGJ5IGlkXG5cdGZ1bmN0aW9uIGRyYXdHcm91cCAocykge1xuXHRcdGlmICh0eXBlb2YgcyA9PT0gJ251bWJlcicpIHMgPSBncm91cHNbc11cblx0XHRpZiAocyA9PSBudWxsKSByZXR1cm5cblxuXHRcdGlmICghKHMgJiYgcy5jb3VudCAmJiBzLmNvbG9yICYmIHMub3BhY2l0eSAmJiBzLnBvc2l0aW9ucyAmJiBzLnBvc2l0aW9ucy5sZW5ndGggPiAxKSkgcmV0dXJuXG5cblx0XHRzLnNjYWxlUmF0aW8gPSBbXG5cdFx0XHRzLnNjYWxlWzBdICogcy52aWV3cG9ydC53aWR0aCxcblx0XHRcdHMuc2NhbGVbMV0gKiBzLnZpZXdwb3J0LmhlaWdodFxuXHRcdF1cblxuXHRcdGRyYXdFcnJvcnMocylcblxuXHRcdGlmIChzLmFmdGVyKSBzLmFmdGVyKHMpXG5cdH1cblxuXHRmdW5jdGlvbiB1cGRhdGUgKG9wdGlvbnMpIHtcblx0XHRpZiAoIW9wdGlvbnMpIHJldHVyblxuXG5cdFx0Ly9kaXJlY3QgcG9pbnRzIGFyZ3VtZW50XG5cdFx0aWYgKG9wdGlvbnMubGVuZ3RoICE9IG51bGwpIHtcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9uc1swXSA9PT0gJ251bWJlcicpIG9wdGlvbnMgPSBbe3Bvc2l0aW9uczogb3B0aW9uc31dXG5cdFx0fVxuXG5cdFx0Ly9tYWtlIG9wdGlvbnMgYSBiYXRjaFxuXHRcdGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KG9wdGlvbnMpKSBvcHRpb25zID0gW29wdGlvbnNdXG5cblx0XHQvL2dsb2JhbCBjb3VudCBvZiBwb2ludHNcblx0XHRsZXQgcG9pbnRDb3VudCA9IDAsIGVycm9yQ291bnQgPSAwXG5cblx0XHRlcnJvcjJkLmdyb3VwcyA9IGdyb3VwcyA9IG9wdGlvbnMubWFwKChvcHRpb25zLCBpKSA9PiB7XG5cdFx0XHRsZXQgZ3JvdXAgPSBncm91cHNbaV1cblxuXHRcdFx0aWYgKCFvcHRpb25zKSByZXR1cm4gZ3JvdXBcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSBvcHRpb25zID0ge2FmdGVyOiBvcHRpb25zfVxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIG9wdGlvbnNbMF0gPT09ICdudW1iZXInKSBvcHRpb25zID0ge3Bvc2l0aW9uczogb3B0aW9uc31cblxuXHRcdFx0Ly9jb3B5IG9wdGlvbnMgdG8gYXZvaWQgbXV0YXRpb24gJiBoYW5kbGUgYWxpYXNlc1xuXHRcdFx0b3B0aW9ucyA9IHBpY2sob3B0aW9ucywge1xuXHRcdFx0XHRjb2xvcjogJ2NvbG9yIGNvbG9ycyBmaWxsJyxcblx0XHRcdFx0Y2FwU2l6ZTogJ2NhcFNpemUgY2FwIGNhcHNpemUgY2FwLXNpemUnLFxuXHRcdFx0XHRsaW5lV2lkdGg6ICdsaW5lV2lkdGggbGluZS13aWR0aCB3aWR0aCBsaW5lIHRoaWNrbmVzcycsXG5cdFx0XHRcdG9wYWNpdHk6ICdvcGFjaXR5IGFscGhhJyxcblx0XHRcdFx0cmFuZ2U6ICdyYW5nZSBkYXRhQm94Jyxcblx0XHRcdFx0dmlld3BvcnQ6ICd2aWV3cG9ydCB2aWV3Qm94Jyxcblx0XHRcdFx0ZXJyb3JzOiAnZXJyb3JzIGVycm9yJyxcblx0XHRcdFx0cG9zaXRpb25zOiAncG9zaXRpb25zIHBvc2l0aW9uIGRhdGEgcG9pbnRzJ1xuXHRcdFx0fSlcblxuXHRcdFx0aWYgKCFncm91cCkge1xuXHRcdFx0XHRncm91cHNbaV0gPSBncm91cCA9IHtcblx0XHRcdFx0XHRpZDogaSxcblx0XHRcdFx0XHRzY2FsZTogbnVsbCxcblx0XHRcdFx0XHR0cmFuc2xhdGU6IG51bGwsXG5cdFx0XHRcdFx0c2NhbGVGcmFjdDogbnVsbCxcblx0XHRcdFx0XHR0cmFuc2xhdGVGcmFjdDogbnVsbCxcblx0XHRcdFx0XHRkcmF3OiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdFx0b3B0aW9ucyA9IGV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpXG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZURpZmYoZ3JvdXAsIG9wdGlvbnMsIFt7XG5cdFx0XHRcdGxpbmVXaWR0aDogdiA9PiArdiAqIC41LFxuXHRcdFx0XHRjYXBTaXplOiB2ID0+ICt2ICogLjUsXG5cdFx0XHRcdG9wYWNpdHk6IHBhcnNlRmxvYXQsXG5cdFx0XHRcdGVycm9yczogZXJyb3JzID0+IHtcblx0XHRcdFx0XHRlcnJvcnMgPSBmbGF0dGVuKGVycm9ycylcblxuXHRcdFx0XHRcdGVycm9yQ291bnQgKz0gZXJyb3JzLmxlbmd0aFxuXHRcdFx0XHRcdHJldHVybiBlcnJvcnNcblx0XHRcdFx0fSxcblx0XHRcdFx0cG9zaXRpb25zOiAocG9zaXRpb25zLCBzdGF0ZSkgPT4ge1xuXHRcdFx0XHRcdHBvc2l0aW9ucyA9IGZsYXR0ZW4ocG9zaXRpb25zLCAnZmxvYXQ2NCcpXG5cdFx0XHRcdFx0c3RhdGUuY291bnQgPSBNYXRoLmZsb29yKHBvc2l0aW9ucy5sZW5ndGggLyAyKVxuXHRcdFx0XHRcdHN0YXRlLmJvdW5kcyA9IGdldEJvdW5kcyhwb3NpdGlvbnMsIDIpXG5cdFx0XHRcdFx0c3RhdGUub2Zmc2V0ID0gcG9pbnRDb3VudFxuXG5cdFx0XHRcdFx0cG9pbnRDb3VudCArPSBzdGF0ZS5jb3VudFxuXG5cdFx0XHRcdFx0cmV0dXJuIHBvc2l0aW9uc1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB7XG5cdFx0XHRcdGNvbG9yOiAoY29sb3JzLCBzdGF0ZSkgPT4ge1xuXHRcdFx0XHRcdGxldCBjb3VudCA9IHN0YXRlLmNvdW50XG5cblx0XHRcdFx0XHRpZiAoIWNvbG9ycykgY29sb3JzID0gJ3RyYW5zcGFyZW50J1xuXG5cdFx0XHRcdFx0Ly8gJ2JsYWNrJyBvciBbMCwwLDAsMF0gY2FzZVxuXHRcdFx0XHRcdGlmICghQXJyYXkuaXNBcnJheShjb2xvcnMpIHx8IHR5cGVvZiBjb2xvcnNbMF0gPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0XHRsZXQgY29sb3IgPSBjb2xvcnNcblx0XHRcdFx0XHRcdGNvbG9ycyA9IEFycmF5KGNvdW50KVxuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGNvbG9yc1tpXSA9IGNvbG9yXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGNvbG9ycy5sZW5ndGggPCBjb3VudCkgdGhyb3cgRXJyb3IoJ05vdCBlbm91Z2ggY29sb3JzJylcblxuXHRcdFx0XHRcdGxldCBjb2xvckRhdGEgPSBuZXcgVWludDhBcnJheShjb3VudCAqIDQpXG5cblx0XHRcdFx0XHQvL2NvbnZlcnQgY29sb3JzIHRvIGZsb2F0IGFycmF5c1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHRcdFx0XHRcdFx0bGV0IGMgPSByZ2JhKGNvbG9yc1tpXSwgJ3VpbnQ4Jylcblx0XHRcdFx0XHRcdGNvbG9yRGF0YS5zZXQoYywgaSAqIDQpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGNvbG9yRGF0YVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdHJhbmdlOiAocmFuZ2UsIHN0YXRlLCBvcHRpb25zKSA9PiB7XG5cdFx0XHRcdFx0bGV0IGJvdW5kcyA9IHN0YXRlLmJvdW5kc1xuXHRcdFx0XHRcdGlmICghcmFuZ2UpIHJhbmdlID0gYm91bmRzXG5cblx0XHRcdFx0XHRzdGF0ZS5zY2FsZSA9IFsxIC8gKHJhbmdlWzJdIC0gcmFuZ2VbMF0pLCAxIC8gKHJhbmdlWzNdIC0gcmFuZ2VbMV0pXVxuXHRcdFx0XHRcdHN0YXRlLnRyYW5zbGF0ZSA9IFstcmFuZ2VbMF0sIC1yYW5nZVsxXV1cblxuXHRcdFx0XHRcdHN0YXRlLnNjYWxlRnJhY3QgPSBmcmFjdDMyKHN0YXRlLnNjYWxlKVxuXHRcdFx0XHRcdHN0YXRlLnRyYW5zbGF0ZUZyYWN0ID0gZnJhY3QzMihzdGF0ZS50cmFuc2xhdGUpXG5cblx0XHRcdFx0XHRyZXR1cm4gcmFuZ2Vcblx0XHRcdFx0fSxcblxuXHRcdFx0XHR2aWV3cG9ydDogdnAgPT4ge1xuXHRcdFx0XHRcdGxldCB2aWV3cG9ydFxuXG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodnApKSB7XG5cdFx0XHRcdFx0XHR2aWV3cG9ydCA9IHtcblx0XHRcdFx0XHRcdFx0eDogdnBbMF0sXG5cdFx0XHRcdFx0XHRcdHk6IHZwWzFdLFxuXHRcdFx0XHRcdFx0XHR3aWR0aDogdnBbMl0gLSB2cFswXSxcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiB2cFszXSAtIHZwWzFdXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKHZwKSB7XG5cdFx0XHRcdFx0XHR2aWV3cG9ydCA9IHtcblx0XHRcdFx0XHRcdFx0eDogdnAueCB8fCB2cC5sZWZ0IHx8IDAsXG5cdFx0XHRcdFx0XHRcdHk6IHZwLnkgfHwgdnAudG9wIHx8IDBcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKHZwLnJpZ2h0KSB2aWV3cG9ydC53aWR0aCA9IHZwLnJpZ2h0IC0gdmlld3BvcnQueFxuXHRcdFx0XHRcdFx0ZWxzZSB2aWV3cG9ydC53aWR0aCA9IHZwLncgfHwgdnAud2lkdGggfHwgMFxuXG5cdFx0XHRcdFx0XHRpZiAodnAuYm90dG9tKSB2aWV3cG9ydC5oZWlnaHQgPSB2cC5ib3R0b20gLSB2aWV3cG9ydC55XG5cdFx0XHRcdFx0XHRlbHNlIHZpZXdwb3J0LmhlaWdodCA9IHZwLmggfHwgdnAuaGVpZ2h0IHx8IDBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR2aWV3cG9ydCA9IHtcblx0XHRcdFx0XHRcdFx0eDogMCwgeTogMCxcblx0XHRcdFx0XHRcdFx0d2lkdGg6IGdsLmRyYXdpbmdCdWZmZXJXaWR0aCxcblx0XHRcdFx0XHRcdFx0aGVpZ2h0OiBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHZpZXdwb3J0XG5cdFx0XHRcdH1cblx0XHRcdH1dKVxuXG5cdFx0XHRyZXR1cm4gZ3JvdXBcblx0XHR9KVxuXG5cdFx0aWYgKHBvaW50Q291bnQgfHwgZXJyb3JDb3VudCkge1xuXHRcdFx0bGV0IGxlbiA9IGdyb3Vwcy5yZWR1Y2UoKGFjYywgZ3JvdXAsIGkpID0+IHtcblx0XHRcdFx0cmV0dXJuIGFjYyArIChncm91cCA/IGdyb3VwLmNvdW50IDogMClcblx0XHRcdH0sIDApXG5cblx0XHRcdGxldCBwb3NpdGlvbkRhdGEgPSBuZXcgRmxvYXQ2NEFycmF5KGxlbiAqIDIpXG5cdFx0XHRsZXQgY29sb3JEYXRhID0gbmV3IFVpbnQ4QXJyYXkobGVuICogNClcblx0XHRcdGxldCBlcnJvckRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KGxlbiAqIDQpXG5cblx0XHRcdGdyb3Vwcy5mb3JFYWNoKChncm91cCwgaSkgPT4ge1xuXHRcdFx0XHRpZiAoIWdyb3VwKSByZXR1cm5cblx0XHRcdFx0bGV0IHtwb3NpdGlvbnMsIGNvdW50LCBvZmZzZXQsIGNvbG9yLCBlcnJvcnN9ID0gZ3JvdXBcblx0XHRcdFx0aWYgKCFjb3VudCkgcmV0dXJuXG5cblx0XHRcdFx0Y29sb3JEYXRhLnNldChjb2xvciwgb2Zmc2V0ICogNClcblx0XHRcdFx0ZXJyb3JEYXRhLnNldChlcnJvcnMsIG9mZnNldCAqIDQpXG5cdFx0XHRcdHBvc2l0aW9uRGF0YS5zZXQocG9zaXRpb25zLCBvZmZzZXQgKiAyKVxuXHRcdFx0fSlcblxuXHRcdFx0cG9zaXRpb25CdWZmZXIoZmxvYXQzMihwb3NpdGlvbkRhdGEpKVxuXHRcdFx0cG9zaXRpb25GcmFjdEJ1ZmZlcihmcmFjdDMyKHBvc2l0aW9uRGF0YSkpXG5cdFx0XHRjb2xvckJ1ZmZlcihjb2xvckRhdGEpXG5cdFx0XHRlcnJvckJ1ZmZlcihlcnJvckRhdGEpXG5cdFx0fVxuXG5cdH1cblxuXHRmdW5jdGlvbiBkZXN0cm95ICgpIHtcblx0XHRwb3NpdGlvbkJ1ZmZlci5kZXN0cm95KClcblx0XHRwb3NpdGlvbkZyYWN0QnVmZmVyLmRlc3Ryb3koKVxuXHRcdGNvbG9yQnVmZmVyLmRlc3Ryb3koKVxuXHRcdGVycm9yQnVmZmVyLmRlc3Ryb3koKVxuXHRcdG1lc2hCdWZmZXIuZGVzdHJveSgpXG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyIHBhcmVuID0gcmVxdWlyZSgncGFyZW50aGVzaXMnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcGxpdEJ5IChzdHJpbmcsIHNlcGFyYXRvciwgbykge1xyXG5cdGlmIChzdHJpbmcgPT0gbnVsbCkgdGhyb3cgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHNob3VsZCBiZSBhIHN0cmluZycpXHJcblx0aWYgKHNlcGFyYXRvciA9PSBudWxsKSB0aHJvdyBFcnJvcignU2VwYXJhdG9yIHNob3VsZCBiZSBhIHN0cmluZyBvciBhIFJlZ0V4cCcpXHJcblxyXG5cdGlmICghbykgbyA9IHt9XHJcblx0ZWxzZSBpZiAodHlwZW9mIG8gPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkobykpIHtcclxuXHRcdG8gPSB7aWdub3JlOiBvfVxyXG5cdH1cclxuXHJcblx0aWYgKG8uZXNjYXBlID09IG51bGwpIG8uZXNjYXBlID0gdHJ1ZVxyXG5cdGlmIChvLmlnbm9yZSA9PSBudWxsKSBvLmlnbm9yZSA9IFsnW10nLCAnKCknLCAne30nLCAnPD4nLCAnXCJcIicsIFwiJydcIiwgJ2BgJywgJ+KAnOKAnScsICfCq8K7J11cclxuXHRlbHNlIHtcclxuXHRcdGlmICh0eXBlb2Ygby5pZ25vcmUgPT09ICdzdHJpbmcnKSB7by5pZ25vcmUgPSBbby5pZ25vcmVdfVxyXG5cclxuXHRcdG8uaWdub3JlID0gby5pZ25vcmUubWFwKGZ1bmN0aW9uIChwYWlyKSB7XHJcblx0XHRcdC8vICdcIicg4oaSICdcIlwiJ1xyXG5cdFx0XHRpZiAocGFpci5sZW5ndGggPT09IDEpIHBhaXIgPSBwYWlyICsgcGFpclxyXG5cdFx0XHRyZXR1cm4gcGFpclxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHZhciB0b2tlbnMgPSBwYXJlbi5wYXJzZShzdHJpbmcsIHtmbGF0OiB0cnVlLCBicmFja2V0czogby5pZ25vcmV9KVxyXG5cdHZhciBzdHIgPSB0b2tlbnNbMF1cclxuXHJcblx0dmFyIHBhcnRzID0gc3RyLnNwbGl0KHNlcGFyYXRvcilcclxuXHJcblx0Ly8gam9pbiBwYXJ0cyBzZXBhcmF0ZWQgYnkgZXNjYXBlXHJcblx0aWYgKG8uZXNjYXBlKSB7XHJcblx0XHR2YXIgY2xlYW5QYXJ0cyA9IFtdXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBwcmV2ID0gcGFydHNbaV1cclxuXHRcdFx0dmFyIHBhcnQgPSBwYXJ0c1tpICsgMV1cclxuXHJcblx0XHRcdGlmIChwcmV2W3ByZXYubGVuZ3RoIC0gMV0gPT09ICdcXFxcJyAmJiBwcmV2W3ByZXYubGVuZ3RoIC0gMl0gIT09ICdcXFxcJykge1xyXG5cdFx0XHRcdGNsZWFuUGFydHMucHVzaChwcmV2ICsgc2VwYXJhdG9yICsgcGFydClcclxuXHRcdFx0XHRpKytcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRjbGVhblBhcnRzLnB1c2gocHJldilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cGFydHMgPSBjbGVhblBhcnRzXHJcblx0fVxyXG5cclxuXHQvLyBvcGVuIHBhcmVucyBwYWNrICYgYXBwbHkgdW5xdW90ZXMsIGlmIGFueVxyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHRva2Vuc1swXSA9IHBhcnRzW2ldXHJcblx0XHRwYXJ0c1tpXSA9IHBhcmVuLnN0cmluZ2lmeSh0b2tlbnMsIHtmbGF0OiB0cnVlfSlcclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJ0c1xyXG59XHJcbiIsInZhciByZWcgPSAvW1xcJ1xcXCJdL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHVucXVvdGUoc3RyKSB7XG4gIGlmICghc3RyKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cbiAgaWYgKHJlZy50ZXN0KHN0ci5jaGFyQXQoMCkpKSB7XG4gICAgc3RyID0gc3RyLnN1YnN0cigxKVxuICB9XG4gIGlmIChyZWcudGVzdChzdHIuY2hhckF0KHN0ci5sZW5ndGggLSAxKSkpIHtcbiAgICBzdHIgPSBzdHIuc3Vic3RyKDAsIHN0ci5sZW5ndGggLSAxKVxuICB9XG4gIHJldHVybiBzdHJcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=