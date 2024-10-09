(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_color-rgba_index_js-node_modules_glslify_browser_js-node_modules_plotly_-51f176"],{

/***/ "./node_modules/clamp/index.js":
/*!*************************************!*\
  !*** ./node_modules/clamp/index.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = clamp

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}


/***/ }),

/***/ "./node_modules/color-name/index.js":
/*!******************************************!*\
  !*** ./node_modules/color-name/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "./node_modules/color-parse/index.js":
/*!*******************************************!*\
  !*** ./node_modules/color-parse/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * @module color-parse
 */



var names = __webpack_require__(/*! color-name */ "./node_modules/color-name/index.js")
var isObject = __webpack_require__(/*! is-plain-obj */ "./node_modules/is-plain-obj/index.js")
var defined = __webpack_require__(/*! defined */ "./node_modules/defined/index.js")

module.exports = parse

/**
 * Base hues
 * http://dev.w3.org/csswg/css-color/#typedef-named-hue
 */
//FIXME: use external hue detector
var baseHues = {
	red: 0,
	orange: 60,
	yellow: 120,
	green: 180,
	blue: 240,
	purple: 300
}

/**
 * Parse color from the string passed
 *
 * @return {Object} A space indicator `space`, an array `values` and `alpha`
 */
function parse (cstr) {
	var m, parts = [], alpha = 1, space

	if (typeof cstr === 'string') {
		//keyword
		if (names[cstr]) {
			parts = names[cstr].slice()
			space = 'rgb'
		}

		//reserved words
		else if (cstr === 'transparent') {
			alpha = 0
			space = 'rgb'
			parts = [0,0,0]
		}

		//hex
		else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
			var base = cstr.slice(1)
			var size = base.length
			var isShort = size <= 4
			alpha = 1

			if (isShort) {
				parts = [
					parseInt(base[0] + base[0], 16),
					parseInt(base[1] + base[1], 16),
					parseInt(base[2] + base[2], 16)
				]
				if (size === 4) {
					alpha = parseInt(base[3] + base[3], 16) / 255
				}
			}
			else {
				parts = [
					parseInt(base[0] + base[1], 16),
					parseInt(base[2] + base[3], 16),
					parseInt(base[4] + base[5], 16)
				]
				if (size === 8) {
					alpha = parseInt(base[6] + base[7], 16) / 255
				}
			}

			if (!parts[0]) parts[0] = 0
			if (!parts[1]) parts[1] = 0
			if (!parts[2]) parts[2] = 0

			space = 'rgb'
		}

		//color space
		else if (m = /^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
			var name = m[1]
			var isRGB = name === 'rgb'
			var base = name.replace(/a$/, '')
			space = base
			var size = base === 'cmyk' ? 4 : base === 'gray' ? 1 : 3
			parts = m[2].trim()
				.split(/\s*,\s*/)
				.map(function (x, i) {
					//<percentage>
					if (/%$/.test(x)) {
						//alpha
						if (i === size)	return parseFloat(x) / 100
						//rgb
						if (base === 'rgb') return parseFloat(x) * 255 / 100
						return parseFloat(x)
					}
					//hue
					else if (base[i] === 'h') {
						//<deg>
						if (/deg$/.test(x)) {
							return parseFloat(x)
						}
						//<base-hue>
						else if (baseHues[x] !== undefined) {
							return baseHues[x]
						}
					}
					return parseFloat(x)
				})

			if (name === base) parts.push(1)
			alpha = (isRGB) ? 1 : (parts[size] === undefined) ? 1 : parts[size]
			parts = parts.slice(0, size)
		}

		//named channels case
		else if (cstr.length > 10 && /[0-9](?:\s|\/)/.test(cstr)) {
			parts = cstr.match(/([0-9]+)/g).map(function (value) {
				return parseFloat(value)
			})

			space = cstr.match(/([a-z])/ig).join('').toLowerCase()
		}
	}

	//numeric case
	else if (!isNaN(cstr)) {
		space = 'rgb'
		parts = [cstr >>> 16, (cstr & 0x00ff00) >>> 8, cstr & 0x0000ff]
	}

	//object case - detects css cases of rgb and hsl
	else if (isObject(cstr)) {
		var r = defined(cstr.r, cstr.red, cstr.R, null)

		if (r !== null) {
			space = 'rgb'
			parts = [
				r,
				defined(cstr.g, cstr.green, cstr.G),
				defined(cstr.b, cstr.blue, cstr.B)
			]
		}
		else {
			space = 'hsl'
			parts = [
				defined(cstr.h, cstr.hue, cstr.H),
				defined(cstr.s, cstr.saturation, cstr.S),
				defined(cstr.l, cstr.lightness, cstr.L, cstr.b, cstr.brightness)
			]
		}

		alpha = defined(cstr.a, cstr.alpha, cstr.opacity, 1)

		if (cstr.opacity != null) alpha /= 100
	}

	//array
	else if (Array.isArray(cstr) || __webpack_require__.g.ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(cstr)) {
		parts = [cstr[0], cstr[1], cstr[2]]
		space = 'rgb'
		alpha = cstr.length === 4 ? cstr[3] : 1
	}

	return {
		space: space,
		values: parts,
		alpha: alpha
	}
}


/***/ }),

/***/ "./node_modules/color-rgba/index.js":
/*!******************************************!*\
  !*** ./node_modules/color-rgba/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/** @module  color-rgba */



var parse = __webpack_require__(/*! color-parse */ "./node_modules/color-parse/index.js")
var hsl = __webpack_require__(/*! color-space/hsl */ "./node_modules/color-space/hsl.js")
var clamp = __webpack_require__(/*! clamp */ "./node_modules/clamp/index.js")

module.exports = function rgba (color) {
	var values, i, l

	//attempt to parse non-array arguments
	var parsed = parse(color)

	if (!parsed.space) return []

	values = Array(3)
	values[0] = clamp(parsed.values[0], 0, 255)
	values[1] = clamp(parsed.values[1], 0, 255)
	values[2] = clamp(parsed.values[2], 0, 255)

	if (parsed.space[0] === 'h') {
		values = hsl.rgb(values)
	}

	values.push(clamp(parsed.alpha, 0, 1))

	return values
}


/***/ }),

/***/ "./node_modules/color-space/hsl.js":
/*!*****************************************!*\
  !*** ./node_modules/color-space/hsl.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * @module color-space/hsl
 */


var rgb = __webpack_require__(/*! ./rgb */ "./node_modules/color-space/rgb.js");

module.exports = {
	name: 'hsl',
	min: [0,0,0],
	max: [360,100,100],
	channel: ['hue', 'saturation', 'lightness'],
	alias: ['HSL'],

	rgb: function(hsl) {
		var h = hsl[0] / 360,
				s = hsl[1] / 100,
				l = hsl[2] / 100,
				t1, t2, t3, rgb, val;

		if (s === 0) {
			val = l * 255;
			return [val, val, val];
		}

		if (l < 0.5) {
			t2 = l * (1 + s);
		}
		else {
			t2 = l + s - l * s;
		}
		t1 = 2 * l - t2;

		rgb = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * - (i - 1);
			if (t3 < 0) {
				t3++;
			}
			else if (t3 > 1) {
				t3--;
			}

			if (6 * t3 < 1) {
				val = t1 + (t2 - t1) * 6 * t3;
			}
			else if (2 * t3 < 1) {
				val = t2;
			}
			else if (3 * t3 < 2) {
				val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			}
			else {
				val = t1;
			}

			rgb[i] = val * 255;
		}

		return rgb;
	}
};


//extend rgb
rgb.hsl = function(rgb) {
	var r = rgb[0]/255,
			g = rgb[1]/255,
			b = rgb[2]/255,
			min = Math.min(r, g, b),
			max = Math.max(r, g, b),
			delta = max - min,
			h, s, l;

	if (max === min) {
		h = 0;
	}
	else if (r === max) {
		h = (g - b) / delta;
	}
	else if (g === max) {
		h = 2 + (b - r) / delta;
	}
	else if (b === max) {
		h = 4 + (r - g)/ delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	}
	else if (l <= 0.5) {
		s = delta / (max + min);
	}
	else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};


/***/ }),

/***/ "./node_modules/color-space/rgb.js":
/*!*****************************************!*\
  !*** ./node_modules/color-space/rgb.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
/**
 * RGB space.
 *
 * @module  color-space/rgb
 */


module.exports = {
	name: 'rgb',
	min: [0,0,0],
	max: [255,255,255],
	channel: ['red', 'green', 'blue'],
	alias: ['RGB']
};


/***/ }),

/***/ "./node_modules/defined/index.js":
/*!***************************************!*\
  !*** ./node_modules/defined/index.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};


/***/ }),

/***/ "./node_modules/glslify/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/glslify/browser.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = function(strings) {
  if (typeof strings === 'string') strings = [strings]
  var exprs = [].slice.call(arguments,1)
  var parts = []
  for (var i = 0; i < strings.length-1; i++) {
    parts.push(strings[i], exprs[i] || '')
  }
  parts.push(strings[i])
  return parts.join('')
}


/***/ }),

/***/ "./node_modules/is-plain-obj/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";

var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};


/***/ }),

/***/ "./node_modules/plotly.js/src/lib/show_no_webgl_msg.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/show_no_webgl_msg.js ***!
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




var Color = __webpack_require__(/*! ../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var noop = function() {};


/**
 * Prints a no webgl error message into the scene container
 * @param {scene instance} scene
 *
 * Expects 'scene' to have property 'container'
 *
 */
module.exports = function showNoWebGlMsg(scene) {
    for(var prop in scene) {
        if(typeof scene[prop] === 'function') scene[prop] = noop;
    }

    scene.destroy = function() {
        scene.container.parentNode.removeChild(scene.container);
    };

    var div = document.createElement('div');
    div.className = 'no-webgl';
    div.style.cursor = 'pointer';
    div.style.fontSize = '24px';
    div.style.color = Color.defaults[0];
    div.style.position = 'absolute';
    div.style.left = div.style.top = '0px';
    div.style.width = div.style.height = '100%';
    div.style['background-color'] = Color.lightLine;
    div.style['z-index'] = 30;

    var p = document.createElement('p');
    p.textContent = 'WebGL is not supported by your browser - visit https://get.webgl.org for more info';
    p.style.position = 'relative';
    p.style.top = '50%';
    p.style.left = '50%';
    p.style.height = '30%';
    p.style.width = '50%';
    p.style.margin = '-15% 0 0 -25%';

    div.appendChild(p);
    scene.container.appendChild(div);
    scene.container.style.background = '#FFFFFF';
    scene.container.onclick = function() {
        window.open('https://get.webgl.org');
    };

    // return before setting up camera and onrender methods
    return false;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2NsYW1wL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvY29sb3ItbmFtZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2NvbG9yLXBhcnNlL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvY29sb3ItcmdiYS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2NvbG9yLXNwYWNlL2hzbC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2NvbG9yLXNwYWNlL3JnYi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RlZmluZWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbHNsaWZ5L2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9pcy1wbGFpbi1vYmovaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL2xpYi9zaG93X25vX3dlYmdsX21zZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ05ZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0ZmJmNGM0Y2UzNmE5NDg1NDljNmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGNsYW1wXG5cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICByZXR1cm4gbWluIDwgbWF4XG4gICAgPyAodmFsdWUgPCBtaW4gPyBtaW4gOiB2YWx1ZSA+IG1heCA/IG1heCA6IHZhbHVlKVxuICAgIDogKHZhbHVlIDwgbWF4ID8gbWF4IDogdmFsdWUgPiBtaW4gPyBtaW4gOiB2YWx1ZSlcbn1cbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0XCJhbGljZWJsdWVcIjogWzI0MCwgMjQ4LCAyNTVdLFxyXG5cdFwiYW50aXF1ZXdoaXRlXCI6IFsyNTAsIDIzNSwgMjE1XSxcclxuXHRcImFxdWFcIjogWzAsIDI1NSwgMjU1XSxcclxuXHRcImFxdWFtYXJpbmVcIjogWzEyNywgMjU1LCAyMTJdLFxyXG5cdFwiYXp1cmVcIjogWzI0MCwgMjU1LCAyNTVdLFxyXG5cdFwiYmVpZ2VcIjogWzI0NSwgMjQ1LCAyMjBdLFxyXG5cdFwiYmlzcXVlXCI6IFsyNTUsIDIyOCwgMTk2XSxcclxuXHRcImJsYWNrXCI6IFswLCAwLCAwXSxcclxuXHRcImJsYW5jaGVkYWxtb25kXCI6IFsyNTUsIDIzNSwgMjA1XSxcclxuXHRcImJsdWVcIjogWzAsIDAsIDI1NV0sXHJcblx0XCJibHVldmlvbGV0XCI6IFsxMzgsIDQzLCAyMjZdLFxyXG5cdFwiYnJvd25cIjogWzE2NSwgNDIsIDQyXSxcclxuXHRcImJ1cmx5d29vZFwiOiBbMjIyLCAxODQsIDEzNV0sXHJcblx0XCJjYWRldGJsdWVcIjogWzk1LCAxNTgsIDE2MF0sXHJcblx0XCJjaGFydHJldXNlXCI6IFsxMjcsIDI1NSwgMF0sXHJcblx0XCJjaG9jb2xhdGVcIjogWzIxMCwgMTA1LCAzMF0sXHJcblx0XCJjb3JhbFwiOiBbMjU1LCAxMjcsIDgwXSxcclxuXHRcImNvcm5mbG93ZXJibHVlXCI6IFsxMDAsIDE0OSwgMjM3XSxcclxuXHRcImNvcm5zaWxrXCI6IFsyNTUsIDI0OCwgMjIwXSxcclxuXHRcImNyaW1zb25cIjogWzIyMCwgMjAsIDYwXSxcclxuXHRcImN5YW5cIjogWzAsIDI1NSwgMjU1XSxcclxuXHRcImRhcmtibHVlXCI6IFswLCAwLCAxMzldLFxyXG5cdFwiZGFya2N5YW5cIjogWzAsIDEzOSwgMTM5XSxcclxuXHRcImRhcmtnb2xkZW5yb2RcIjogWzE4NCwgMTM0LCAxMV0sXHJcblx0XCJkYXJrZ3JheVwiOiBbMTY5LCAxNjksIDE2OV0sXHJcblx0XCJkYXJrZ3JlZW5cIjogWzAsIDEwMCwgMF0sXHJcblx0XCJkYXJrZ3JleVwiOiBbMTY5LCAxNjksIDE2OV0sXHJcblx0XCJkYXJra2hha2lcIjogWzE4OSwgMTgzLCAxMDddLFxyXG5cdFwiZGFya21hZ2VudGFcIjogWzEzOSwgMCwgMTM5XSxcclxuXHRcImRhcmtvbGl2ZWdyZWVuXCI6IFs4NSwgMTA3LCA0N10sXHJcblx0XCJkYXJrb3JhbmdlXCI6IFsyNTUsIDE0MCwgMF0sXHJcblx0XCJkYXJrb3JjaGlkXCI6IFsxNTMsIDUwLCAyMDRdLFxyXG5cdFwiZGFya3JlZFwiOiBbMTM5LCAwLCAwXSxcclxuXHRcImRhcmtzYWxtb25cIjogWzIzMywgMTUwLCAxMjJdLFxyXG5cdFwiZGFya3NlYWdyZWVuXCI6IFsxNDMsIDE4OCwgMTQzXSxcclxuXHRcImRhcmtzbGF0ZWJsdWVcIjogWzcyLCA2MSwgMTM5XSxcclxuXHRcImRhcmtzbGF0ZWdyYXlcIjogWzQ3LCA3OSwgNzldLFxyXG5cdFwiZGFya3NsYXRlZ3JleVwiOiBbNDcsIDc5LCA3OV0sXHJcblx0XCJkYXJrdHVycXVvaXNlXCI6IFswLCAyMDYsIDIwOV0sXHJcblx0XCJkYXJrdmlvbGV0XCI6IFsxNDgsIDAsIDIxMV0sXHJcblx0XCJkZWVwcGlua1wiOiBbMjU1LCAyMCwgMTQ3XSxcclxuXHRcImRlZXBza3libHVlXCI6IFswLCAxOTEsIDI1NV0sXHJcblx0XCJkaW1ncmF5XCI6IFsxMDUsIDEwNSwgMTA1XSxcclxuXHRcImRpbWdyZXlcIjogWzEwNSwgMTA1LCAxMDVdLFxyXG5cdFwiZG9kZ2VyYmx1ZVwiOiBbMzAsIDE0NCwgMjU1XSxcclxuXHRcImZpcmVicmlja1wiOiBbMTc4LCAzNCwgMzRdLFxyXG5cdFwiZmxvcmFsd2hpdGVcIjogWzI1NSwgMjUwLCAyNDBdLFxyXG5cdFwiZm9yZXN0Z3JlZW5cIjogWzM0LCAxMzksIDM0XSxcclxuXHRcImZ1Y2hzaWFcIjogWzI1NSwgMCwgMjU1XSxcclxuXHRcImdhaW5zYm9yb1wiOiBbMjIwLCAyMjAsIDIyMF0sXHJcblx0XCJnaG9zdHdoaXRlXCI6IFsyNDgsIDI0OCwgMjU1XSxcclxuXHRcImdvbGRcIjogWzI1NSwgMjE1LCAwXSxcclxuXHRcImdvbGRlbnJvZFwiOiBbMjE4LCAxNjUsIDMyXSxcclxuXHRcImdyYXlcIjogWzEyOCwgMTI4LCAxMjhdLFxyXG5cdFwiZ3JlZW5cIjogWzAsIDEyOCwgMF0sXHJcblx0XCJncmVlbnllbGxvd1wiOiBbMTczLCAyNTUsIDQ3XSxcclxuXHRcImdyZXlcIjogWzEyOCwgMTI4LCAxMjhdLFxyXG5cdFwiaG9uZXlkZXdcIjogWzI0MCwgMjU1LCAyNDBdLFxyXG5cdFwiaG90cGlua1wiOiBbMjU1LCAxMDUsIDE4MF0sXHJcblx0XCJpbmRpYW5yZWRcIjogWzIwNSwgOTIsIDkyXSxcclxuXHRcImluZGlnb1wiOiBbNzUsIDAsIDEzMF0sXHJcblx0XCJpdm9yeVwiOiBbMjU1LCAyNTUsIDI0MF0sXHJcblx0XCJraGFraVwiOiBbMjQwLCAyMzAsIDE0MF0sXHJcblx0XCJsYXZlbmRlclwiOiBbMjMwLCAyMzAsIDI1MF0sXHJcblx0XCJsYXZlbmRlcmJsdXNoXCI6IFsyNTUsIDI0MCwgMjQ1XSxcclxuXHRcImxhd25ncmVlblwiOiBbMTI0LCAyNTIsIDBdLFxyXG5cdFwibGVtb25jaGlmZm9uXCI6IFsyNTUsIDI1MCwgMjA1XSxcclxuXHRcImxpZ2h0Ymx1ZVwiOiBbMTczLCAyMTYsIDIzMF0sXHJcblx0XCJsaWdodGNvcmFsXCI6IFsyNDAsIDEyOCwgMTI4XSxcclxuXHRcImxpZ2h0Y3lhblwiOiBbMjI0LCAyNTUsIDI1NV0sXHJcblx0XCJsaWdodGdvbGRlbnJvZHllbGxvd1wiOiBbMjUwLCAyNTAsIDIxMF0sXHJcblx0XCJsaWdodGdyYXlcIjogWzIxMSwgMjExLCAyMTFdLFxyXG5cdFwibGlnaHRncmVlblwiOiBbMTQ0LCAyMzgsIDE0NF0sXHJcblx0XCJsaWdodGdyZXlcIjogWzIxMSwgMjExLCAyMTFdLFxyXG5cdFwibGlnaHRwaW5rXCI6IFsyNTUsIDE4MiwgMTkzXSxcclxuXHRcImxpZ2h0c2FsbW9uXCI6IFsyNTUsIDE2MCwgMTIyXSxcclxuXHRcImxpZ2h0c2VhZ3JlZW5cIjogWzMyLCAxNzgsIDE3MF0sXHJcblx0XCJsaWdodHNreWJsdWVcIjogWzEzNSwgMjA2LCAyNTBdLFxyXG5cdFwibGlnaHRzbGF0ZWdyYXlcIjogWzExOSwgMTM2LCAxNTNdLFxyXG5cdFwibGlnaHRzbGF0ZWdyZXlcIjogWzExOSwgMTM2LCAxNTNdLFxyXG5cdFwibGlnaHRzdGVlbGJsdWVcIjogWzE3NiwgMTk2LCAyMjJdLFxyXG5cdFwibGlnaHR5ZWxsb3dcIjogWzI1NSwgMjU1LCAyMjRdLFxyXG5cdFwibGltZVwiOiBbMCwgMjU1LCAwXSxcclxuXHRcImxpbWVncmVlblwiOiBbNTAsIDIwNSwgNTBdLFxyXG5cdFwibGluZW5cIjogWzI1MCwgMjQwLCAyMzBdLFxyXG5cdFwibWFnZW50YVwiOiBbMjU1LCAwLCAyNTVdLFxyXG5cdFwibWFyb29uXCI6IFsxMjgsIDAsIDBdLFxyXG5cdFwibWVkaXVtYXF1YW1hcmluZVwiOiBbMTAyLCAyMDUsIDE3MF0sXHJcblx0XCJtZWRpdW1ibHVlXCI6IFswLCAwLCAyMDVdLFxyXG5cdFwibWVkaXVtb3JjaGlkXCI6IFsxODYsIDg1LCAyMTFdLFxyXG5cdFwibWVkaXVtcHVycGxlXCI6IFsxNDcsIDExMiwgMjE5XSxcclxuXHRcIm1lZGl1bXNlYWdyZWVuXCI6IFs2MCwgMTc5LCAxMTNdLFxyXG5cdFwibWVkaXVtc2xhdGVibHVlXCI6IFsxMjMsIDEwNCwgMjM4XSxcclxuXHRcIm1lZGl1bXNwcmluZ2dyZWVuXCI6IFswLCAyNTAsIDE1NF0sXHJcblx0XCJtZWRpdW10dXJxdW9pc2VcIjogWzcyLCAyMDksIDIwNF0sXHJcblx0XCJtZWRpdW12aW9sZXRyZWRcIjogWzE5OSwgMjEsIDEzM10sXHJcblx0XCJtaWRuaWdodGJsdWVcIjogWzI1LCAyNSwgMTEyXSxcclxuXHRcIm1pbnRjcmVhbVwiOiBbMjQ1LCAyNTUsIDI1MF0sXHJcblx0XCJtaXN0eXJvc2VcIjogWzI1NSwgMjI4LCAyMjVdLFxyXG5cdFwibW9jY2FzaW5cIjogWzI1NSwgMjI4LCAxODFdLFxyXG5cdFwibmF2YWpvd2hpdGVcIjogWzI1NSwgMjIyLCAxNzNdLFxyXG5cdFwibmF2eVwiOiBbMCwgMCwgMTI4XSxcclxuXHRcIm9sZGxhY2VcIjogWzI1MywgMjQ1LCAyMzBdLFxyXG5cdFwib2xpdmVcIjogWzEyOCwgMTI4LCAwXSxcclxuXHRcIm9saXZlZHJhYlwiOiBbMTA3LCAxNDIsIDM1XSxcclxuXHRcIm9yYW5nZVwiOiBbMjU1LCAxNjUsIDBdLFxyXG5cdFwib3JhbmdlcmVkXCI6IFsyNTUsIDY5LCAwXSxcclxuXHRcIm9yY2hpZFwiOiBbMjE4LCAxMTIsIDIxNF0sXHJcblx0XCJwYWxlZ29sZGVucm9kXCI6IFsyMzgsIDIzMiwgMTcwXSxcclxuXHRcInBhbGVncmVlblwiOiBbMTUyLCAyNTEsIDE1Ml0sXHJcblx0XCJwYWxldHVycXVvaXNlXCI6IFsxNzUsIDIzOCwgMjM4XSxcclxuXHRcInBhbGV2aW9sZXRyZWRcIjogWzIxOSwgMTEyLCAxNDddLFxyXG5cdFwicGFwYXlhd2hpcFwiOiBbMjU1LCAyMzksIDIxM10sXHJcblx0XCJwZWFjaHB1ZmZcIjogWzI1NSwgMjE4LCAxODVdLFxyXG5cdFwicGVydVwiOiBbMjA1LCAxMzMsIDYzXSxcclxuXHRcInBpbmtcIjogWzI1NSwgMTkyLCAyMDNdLFxyXG5cdFwicGx1bVwiOiBbMjIxLCAxNjAsIDIyMV0sXHJcblx0XCJwb3dkZXJibHVlXCI6IFsxNzYsIDIyNCwgMjMwXSxcclxuXHRcInB1cnBsZVwiOiBbMTI4LCAwLCAxMjhdLFxyXG5cdFwicmViZWNjYXB1cnBsZVwiOiBbMTAyLCA1MSwgMTUzXSxcclxuXHRcInJlZFwiOiBbMjU1LCAwLCAwXSxcclxuXHRcInJvc3licm93blwiOiBbMTg4LCAxNDMsIDE0M10sXHJcblx0XCJyb3lhbGJsdWVcIjogWzY1LCAxMDUsIDIyNV0sXHJcblx0XCJzYWRkbGVicm93blwiOiBbMTM5LCA2OSwgMTldLFxyXG5cdFwic2FsbW9uXCI6IFsyNTAsIDEyOCwgMTE0XSxcclxuXHRcInNhbmR5YnJvd25cIjogWzI0NCwgMTY0LCA5Nl0sXHJcblx0XCJzZWFncmVlblwiOiBbNDYsIDEzOSwgODddLFxyXG5cdFwic2Vhc2hlbGxcIjogWzI1NSwgMjQ1LCAyMzhdLFxyXG5cdFwic2llbm5hXCI6IFsxNjAsIDgyLCA0NV0sXHJcblx0XCJzaWx2ZXJcIjogWzE5MiwgMTkyLCAxOTJdLFxyXG5cdFwic2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDIzNV0sXHJcblx0XCJzbGF0ZWJsdWVcIjogWzEwNiwgOTAsIDIwNV0sXHJcblx0XCJzbGF0ZWdyYXlcIjogWzExMiwgMTI4LCAxNDRdLFxyXG5cdFwic2xhdGVncmV5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcclxuXHRcInNub3dcIjogWzI1NSwgMjUwLCAyNTBdLFxyXG5cdFwic3ByaW5nZ3JlZW5cIjogWzAsIDI1NSwgMTI3XSxcclxuXHRcInN0ZWVsYmx1ZVwiOiBbNzAsIDEzMCwgMTgwXSxcclxuXHRcInRhblwiOiBbMjEwLCAxODAsIDE0MF0sXHJcblx0XCJ0ZWFsXCI6IFswLCAxMjgsIDEyOF0sXHJcblx0XCJ0aGlzdGxlXCI6IFsyMTYsIDE5MSwgMjE2XSxcclxuXHRcInRvbWF0b1wiOiBbMjU1LCA5OSwgNzFdLFxyXG5cdFwidHVycXVvaXNlXCI6IFs2NCwgMjI0LCAyMDhdLFxyXG5cdFwidmlvbGV0XCI6IFsyMzgsIDEzMCwgMjM4XSxcclxuXHRcIndoZWF0XCI6IFsyNDUsIDIyMiwgMTc5XSxcclxuXHRcIndoaXRlXCI6IFsyNTUsIDI1NSwgMjU1XSxcclxuXHRcIndoaXRlc21va2VcIjogWzI0NSwgMjQ1LCAyNDVdLFxyXG5cdFwieWVsbG93XCI6IFsyNTUsIDI1NSwgMF0sXHJcblx0XCJ5ZWxsb3dncmVlblwiOiBbMTU0LCAyMDUsIDUwXVxyXG59O1xyXG4iLCIvKipcbiAqIEBtb2R1bGUgY29sb3ItcGFyc2VcbiAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIG5hbWVzID0gcmVxdWlyZSgnY29sb3ItbmFtZScpXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCdpcy1wbGFpbi1vYmonKVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCdkZWZpbmVkJylcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuXG4vKipcbiAqIEJhc2UgaHVlc1xuICogaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLWNvbG9yLyN0eXBlZGVmLW5hbWVkLWh1ZVxuICovXG4vL0ZJWE1FOiB1c2UgZXh0ZXJuYWwgaHVlIGRldGVjdG9yXG52YXIgYmFzZUh1ZXMgPSB7XG5cdHJlZDogMCxcblx0b3JhbmdlOiA2MCxcblx0eWVsbG93OiAxMjAsXG5cdGdyZWVuOiAxODAsXG5cdGJsdWU6IDI0MCxcblx0cHVycGxlOiAzMDBcbn1cblxuLyoqXG4gKiBQYXJzZSBjb2xvciBmcm9tIHRoZSBzdHJpbmcgcGFzc2VkXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBBIHNwYWNlIGluZGljYXRvciBgc3BhY2VgLCBhbiBhcnJheSBgdmFsdWVzYCBhbmQgYGFscGhhYFxuICovXG5mdW5jdGlvbiBwYXJzZSAoY3N0cikge1xuXHR2YXIgbSwgcGFydHMgPSBbXSwgYWxwaGEgPSAxLCBzcGFjZVxuXG5cdGlmICh0eXBlb2YgY3N0ciA9PT0gJ3N0cmluZycpIHtcblx0XHQvL2tleXdvcmRcblx0XHRpZiAobmFtZXNbY3N0cl0pIHtcblx0XHRcdHBhcnRzID0gbmFtZXNbY3N0cl0uc2xpY2UoKVxuXHRcdFx0c3BhY2UgPSAncmdiJ1xuXHRcdH1cblxuXHRcdC8vcmVzZXJ2ZWQgd29yZHNcblx0XHRlbHNlIGlmIChjc3RyID09PSAndHJhbnNwYXJlbnQnKSB7XG5cdFx0XHRhbHBoYSA9IDBcblx0XHRcdHNwYWNlID0gJ3JnYidcblx0XHRcdHBhcnRzID0gWzAsMCwwXVxuXHRcdH1cblxuXHRcdC8vaGV4XG5cdFx0ZWxzZSBpZiAoL14jW0EtRmEtZjAtOV0rJC8udGVzdChjc3RyKSkge1xuXHRcdFx0dmFyIGJhc2UgPSBjc3RyLnNsaWNlKDEpXG5cdFx0XHR2YXIgc2l6ZSA9IGJhc2UubGVuZ3RoXG5cdFx0XHR2YXIgaXNTaG9ydCA9IHNpemUgPD0gNFxuXHRcdFx0YWxwaGEgPSAxXG5cblx0XHRcdGlmIChpc1Nob3J0KSB7XG5cdFx0XHRcdHBhcnRzID0gW1xuXHRcdFx0XHRcdHBhcnNlSW50KGJhc2VbMF0gKyBiYXNlWzBdLCAxNiksXG5cdFx0XHRcdFx0cGFyc2VJbnQoYmFzZVsxXSArIGJhc2VbMV0sIDE2KSxcblx0XHRcdFx0XHRwYXJzZUludChiYXNlWzJdICsgYmFzZVsyXSwgMTYpXG5cdFx0XHRcdF1cblx0XHRcdFx0aWYgKHNpemUgPT09IDQpIHtcblx0XHRcdFx0XHRhbHBoYSA9IHBhcnNlSW50KGJhc2VbM10gKyBiYXNlWzNdLCAxNikgLyAyNTVcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHBhcnRzID0gW1xuXHRcdFx0XHRcdHBhcnNlSW50KGJhc2VbMF0gKyBiYXNlWzFdLCAxNiksXG5cdFx0XHRcdFx0cGFyc2VJbnQoYmFzZVsyXSArIGJhc2VbM10sIDE2KSxcblx0XHRcdFx0XHRwYXJzZUludChiYXNlWzRdICsgYmFzZVs1XSwgMTYpXG5cdFx0XHRcdF1cblx0XHRcdFx0aWYgKHNpemUgPT09IDgpIHtcblx0XHRcdFx0XHRhbHBoYSA9IHBhcnNlSW50KGJhc2VbNl0gKyBiYXNlWzddLCAxNikgLyAyNTVcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXBhcnRzWzBdKSBwYXJ0c1swXSA9IDBcblx0XHRcdGlmICghcGFydHNbMV0pIHBhcnRzWzFdID0gMFxuXHRcdFx0aWYgKCFwYXJ0c1syXSkgcGFydHNbMl0gPSAwXG5cblx0XHRcdHNwYWNlID0gJ3JnYidcblx0XHR9XG5cblx0XHQvL2NvbG9yIHNwYWNlXG5cdFx0ZWxzZSBpZiAobSA9IC9eKCg/OnJnYnxoc1tsdmJdfGh3YnxjbXlrP3x4eVt6eV18Z3JheXxsYWJ8bGNodT92P3xbbHlddXZ8bG1zKWE/KVxccypcXCgoW15cXCldKilcXCkvLmV4ZWMoY3N0cikpIHtcblx0XHRcdHZhciBuYW1lID0gbVsxXVxuXHRcdFx0dmFyIGlzUkdCID0gbmFtZSA9PT0gJ3JnYidcblx0XHRcdHZhciBiYXNlID0gbmFtZS5yZXBsYWNlKC9hJC8sICcnKVxuXHRcdFx0c3BhY2UgPSBiYXNlXG5cdFx0XHR2YXIgc2l6ZSA9IGJhc2UgPT09ICdjbXlrJyA/IDQgOiBiYXNlID09PSAnZ3JheScgPyAxIDogM1xuXHRcdFx0cGFydHMgPSBtWzJdLnRyaW0oKVxuXHRcdFx0XHQuc3BsaXQoL1xccyosXFxzKi8pXG5cdFx0XHRcdC5tYXAoZnVuY3Rpb24gKHgsIGkpIHtcblx0XHRcdFx0XHQvLzxwZXJjZW50YWdlPlxuXHRcdFx0XHRcdGlmICgvJSQvLnRlc3QoeCkpIHtcblx0XHRcdFx0XHRcdC8vYWxwaGFcblx0XHRcdFx0XHRcdGlmIChpID09PSBzaXplKVx0cmV0dXJuIHBhcnNlRmxvYXQoeCkgLyAxMDBcblx0XHRcdFx0XHRcdC8vcmdiXG5cdFx0XHRcdFx0XHRpZiAoYmFzZSA9PT0gJ3JnYicpIHJldHVybiBwYXJzZUZsb2F0KHgpICogMjU1IC8gMTAwXG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFyc2VGbG9hdCh4KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvL2h1ZVxuXHRcdFx0XHRcdGVsc2UgaWYgKGJhc2VbaV0gPT09ICdoJykge1xuXHRcdFx0XHRcdFx0Ly88ZGVnPlxuXHRcdFx0XHRcdFx0aWYgKC9kZWckLy50ZXN0KHgpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUZsb2F0KHgpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLzxiYXNlLWh1ZT5cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGJhc2VIdWVzW3hdICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGJhc2VIdWVzW3hdXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUZsb2F0KHgpXG5cdFx0XHRcdH0pXG5cblx0XHRcdGlmIChuYW1lID09PSBiYXNlKSBwYXJ0cy5wdXNoKDEpXG5cdFx0XHRhbHBoYSA9IChpc1JHQikgPyAxIDogKHBhcnRzW3NpemVdID09PSB1bmRlZmluZWQpID8gMSA6IHBhcnRzW3NpemVdXG5cdFx0XHRwYXJ0cyA9IHBhcnRzLnNsaWNlKDAsIHNpemUpXG5cdFx0fVxuXG5cdFx0Ly9uYW1lZCBjaGFubmVscyBjYXNlXG5cdFx0ZWxzZSBpZiAoY3N0ci5sZW5ndGggPiAxMCAmJiAvWzAtOV0oPzpcXHN8XFwvKS8udGVzdChjc3RyKSkge1xuXHRcdFx0cGFydHMgPSBjc3RyLm1hdGNoKC8oWzAtOV0rKS9nKS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKVxuXHRcdFx0fSlcblxuXHRcdFx0c3BhY2UgPSBjc3RyLm1hdGNoKC8oW2Etel0pL2lnKS5qb2luKCcnKS50b0xvd2VyQ2FzZSgpXG5cdFx0fVxuXHR9XG5cblx0Ly9udW1lcmljIGNhc2Vcblx0ZWxzZSBpZiAoIWlzTmFOKGNzdHIpKSB7XG5cdFx0c3BhY2UgPSAncmdiJ1xuXHRcdHBhcnRzID0gW2NzdHIgPj4+IDE2LCAoY3N0ciAmIDB4MDBmZjAwKSA+Pj4gOCwgY3N0ciAmIDB4MDAwMGZmXVxuXHR9XG5cblx0Ly9vYmplY3QgY2FzZSAtIGRldGVjdHMgY3NzIGNhc2VzIG9mIHJnYiBhbmQgaHNsXG5cdGVsc2UgaWYgKGlzT2JqZWN0KGNzdHIpKSB7XG5cdFx0dmFyIHIgPSBkZWZpbmVkKGNzdHIuciwgY3N0ci5yZWQsIGNzdHIuUiwgbnVsbClcblxuXHRcdGlmIChyICE9PSBudWxsKSB7XG5cdFx0XHRzcGFjZSA9ICdyZ2InXG5cdFx0XHRwYXJ0cyA9IFtcblx0XHRcdFx0cixcblx0XHRcdFx0ZGVmaW5lZChjc3RyLmcsIGNzdHIuZ3JlZW4sIGNzdHIuRyksXG5cdFx0XHRcdGRlZmluZWQoY3N0ci5iLCBjc3RyLmJsdWUsIGNzdHIuQilcblx0XHRcdF1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRzcGFjZSA9ICdoc2wnXG5cdFx0XHRwYXJ0cyA9IFtcblx0XHRcdFx0ZGVmaW5lZChjc3RyLmgsIGNzdHIuaHVlLCBjc3RyLkgpLFxuXHRcdFx0XHRkZWZpbmVkKGNzdHIucywgY3N0ci5zYXR1cmF0aW9uLCBjc3RyLlMpLFxuXHRcdFx0XHRkZWZpbmVkKGNzdHIubCwgY3N0ci5saWdodG5lc3MsIGNzdHIuTCwgY3N0ci5iLCBjc3RyLmJyaWdodG5lc3MpXG5cdFx0XHRdXG5cdFx0fVxuXG5cdFx0YWxwaGEgPSBkZWZpbmVkKGNzdHIuYSwgY3N0ci5hbHBoYSwgY3N0ci5vcGFjaXR5LCAxKVxuXG5cdFx0aWYgKGNzdHIub3BhY2l0eSAhPSBudWxsKSBhbHBoYSAvPSAxMDBcblx0fVxuXG5cdC8vYXJyYXlcblx0ZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjc3RyKSB8fCBnbG9iYWwuQXJyYXlCdWZmZXIgJiYgQXJyYXlCdWZmZXIuaXNWaWV3ICYmIEFycmF5QnVmZmVyLmlzVmlldyhjc3RyKSkge1xuXHRcdHBhcnRzID0gW2NzdHJbMF0sIGNzdHJbMV0sIGNzdHJbMl1dXG5cdFx0c3BhY2UgPSAncmdiJ1xuXHRcdGFscGhhID0gY3N0ci5sZW5ndGggPT09IDQgPyBjc3RyWzNdIDogMVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzcGFjZTogc3BhY2UsXG5cdFx0dmFsdWVzOiBwYXJ0cyxcblx0XHRhbHBoYTogYWxwaGFcblx0fVxufVxuIiwiLyoqIEBtb2R1bGUgIGNvbG9yLXJnYmEgKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBwYXJzZSA9IHJlcXVpcmUoJ2NvbG9yLXBhcnNlJylcbnZhciBoc2wgPSByZXF1aXJlKCdjb2xvci1zcGFjZS9oc2wnKVxudmFyIGNsYW1wID0gcmVxdWlyZSgnY2xhbXAnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJnYmEgKGNvbG9yKSB7XG5cdHZhciB2YWx1ZXMsIGksIGxcblxuXHQvL2F0dGVtcHQgdG8gcGFyc2Ugbm9uLWFycmF5IGFyZ3VtZW50c1xuXHR2YXIgcGFyc2VkID0gcGFyc2UoY29sb3IpXG5cblx0aWYgKCFwYXJzZWQuc3BhY2UpIHJldHVybiBbXVxuXG5cdHZhbHVlcyA9IEFycmF5KDMpXG5cdHZhbHVlc1swXSA9IGNsYW1wKHBhcnNlZC52YWx1ZXNbMF0sIDAsIDI1NSlcblx0dmFsdWVzWzFdID0gY2xhbXAocGFyc2VkLnZhbHVlc1sxXSwgMCwgMjU1KVxuXHR2YWx1ZXNbMl0gPSBjbGFtcChwYXJzZWQudmFsdWVzWzJdLCAwLCAyNTUpXG5cblx0aWYgKHBhcnNlZC5zcGFjZVswXSA9PT0gJ2gnKSB7XG5cdFx0dmFsdWVzID0gaHNsLnJnYih2YWx1ZXMpXG5cdH1cblxuXHR2YWx1ZXMucHVzaChjbGFtcChwYXJzZWQuYWxwaGEsIDAsIDEpKVxuXG5cdHJldHVybiB2YWx1ZXNcbn1cbiIsIi8qKlxuICogQG1vZHVsZSBjb2xvci1zcGFjZS9oc2xcbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbnZhciByZ2IgPSByZXF1aXJlKCcuL3JnYicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0bmFtZTogJ2hzbCcsXG5cdG1pbjogWzAsMCwwXSxcblx0bWF4OiBbMzYwLDEwMCwxMDBdLFxuXHRjaGFubmVsOiBbJ2h1ZScsICdzYXR1cmF0aW9uJywgJ2xpZ2h0bmVzcyddLFxuXHRhbGlhczogWydIU0wnXSxcblxuXHRyZ2I6IGZ1bmN0aW9uKGhzbCkge1xuXHRcdHZhciBoID0gaHNsWzBdIC8gMzYwLFxuXHRcdFx0XHRzID0gaHNsWzFdIC8gMTAwLFxuXHRcdFx0XHRsID0gaHNsWzJdIC8gMTAwLFxuXHRcdFx0XHR0MSwgdDIsIHQzLCByZ2IsIHZhbDtcblxuXHRcdGlmIChzID09PSAwKSB7XG5cdFx0XHR2YWwgPSBsICogMjU1O1xuXHRcdFx0cmV0dXJuIFt2YWwsIHZhbCwgdmFsXTtcblx0XHR9XG5cblx0XHRpZiAobCA8IDAuNSkge1xuXHRcdFx0dDIgPSBsICogKDEgKyBzKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0MiA9IGwgKyBzIC0gbCAqIHM7XG5cdFx0fVxuXHRcdHQxID0gMiAqIGwgLSB0MjtcblxuXHRcdHJnYiA9IFswLCAwLCAwXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdFx0dDMgPSBoICsgMSAvIDMgKiAtIChpIC0gMSk7XG5cdFx0XHRpZiAodDMgPCAwKSB7XG5cdFx0XHRcdHQzKys7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0MyA+IDEpIHtcblx0XHRcdFx0dDMtLTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKDYgKiB0MyA8IDEpIHtcblx0XHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiA2ICogdDM7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICgyICogdDMgPCAxKSB7XG5cdFx0XHRcdHZhbCA9IHQyO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoMyAqIHQzIDwgMikge1xuXHRcdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqICgyIC8gMyAtIHQzKSAqIDY7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dmFsID0gdDE7XG5cdFx0XHR9XG5cblx0XHRcdHJnYltpXSA9IHZhbCAqIDI1NTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmdiO1xuXHR9XG59O1xuXG5cbi8vZXh0ZW5kIHJnYlxucmdiLmhzbCA9IGZ1bmN0aW9uKHJnYikge1xuXHR2YXIgciA9IHJnYlswXS8yNTUsXG5cdFx0XHRnID0gcmdiWzFdLzI1NSxcblx0XHRcdGIgPSByZ2JbMl0vMjU1LFxuXHRcdFx0bWluID0gTWF0aC5taW4ociwgZywgYiksXG5cdFx0XHRtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcblx0XHRcdGRlbHRhID0gbWF4IC0gbWluLFxuXHRcdFx0aCwgcywgbDtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRoID0gMDtcblx0fVxuXHRlbHNlIGlmIChyID09PSBtYXgpIHtcblx0XHRoID0gKGcgLSBiKSAvIGRlbHRhO1xuXHR9XG5cdGVsc2UgaWYgKGcgPT09IG1heCkge1xuXHRcdGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuXHR9XG5cdGVsc2UgaWYgKGIgPT09IG1heCkge1xuXHRcdGggPSA0ICsgKHIgLSBnKS8gZGVsdGE7XG5cdH1cblxuXHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0bCA9IChtaW4gKyBtYXgpIC8gMjtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRzID0gMDtcblx0fVxuXHRlbHNlIGlmIChsIDw9IDAuNSkge1xuXHRcdHMgPSBkZWx0YSAvIChtYXggKyBtaW4pO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHMgPSBkZWx0YSAvICgyIC0gbWF4IC0gbWluKTtcblx0fVxuXG5cdHJldHVybiBbaCwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuIiwiLyoqXG4gKiBSR0Igc3BhY2UuXG4gKlxuICogQG1vZHVsZSAgY29sb3Itc3BhY2UvcmdiXG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0bmFtZTogJ3JnYicsXG5cdG1pbjogWzAsMCwwXSxcblx0bWF4OiBbMjU1LDI1NSwyNTVdLFxuXHRjaGFubmVsOiBbJ3JlZCcsICdncmVlbicsICdibHVlJ10sXG5cdGFsaWFzOiBbJ1JHQiddXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gYXJndW1lbnRzW2ldO1xuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cmluZ3MpIHtcclxuICBpZiAodHlwZW9mIHN0cmluZ3MgPT09ICdzdHJpbmcnKSBzdHJpbmdzID0gW3N0cmluZ3NdXHJcbiAgdmFyIGV4cHJzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSlcclxuICB2YXIgcGFydHMgPSBbXVxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGgtMTsgaSsrKSB7XHJcbiAgICBwYXJ0cy5wdXNoKHN0cmluZ3NbaV0sIGV4cHJzW2ldIHx8ICcnKVxyXG4gIH1cclxuICBwYXJ0cy5wdXNoKHN0cmluZ3NbaV0pXHJcbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoeCkge1xuXHR2YXIgcHJvdG90eXBlO1xuXHRyZXR1cm4gdG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgKHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih4KSwgcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29sb3InKTtcblxudmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuXG5cbi8qKlxuICogUHJpbnRzIGEgbm8gd2ViZ2wgZXJyb3IgbWVzc2FnZSBpbnRvIHRoZSBzY2VuZSBjb250YWluZXJcbiAqIEBwYXJhbSB7c2NlbmUgaW5zdGFuY2V9IHNjZW5lXG4gKlxuICogRXhwZWN0cyAnc2NlbmUnIHRvIGhhdmUgcHJvcGVydHkgJ2NvbnRhaW5lcidcbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hvd05vV2ViR2xNc2coc2NlbmUpIHtcbiAgICBmb3IodmFyIHByb3AgaW4gc2NlbmUpIHtcbiAgICAgICAgaWYodHlwZW9mIHNjZW5lW3Byb3BdID09PSAnZnVuY3Rpb24nKSBzY2VuZVtwcm9wXSA9IG5vb3A7XG4gICAgfVxuXG4gICAgc2NlbmUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzY2VuZS5jb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY2VuZS5jb250YWluZXIpO1xuICAgIH07XG5cbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSA9ICduby13ZWJnbCc7XG4gICAgZGl2LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICBkaXYuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgZGl2LnN0eWxlLmNvbG9yID0gQ29sb3IuZGVmYXVsdHNbMF07XG4gICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBkaXYuc3R5bGUubGVmdCA9IGRpdi5zdHlsZS50b3AgPSAnMHB4JztcbiAgICBkaXYuc3R5bGUud2lkdGggPSBkaXYuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGRpdi5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gQ29sb3IubGlnaHRMaW5lO1xuICAgIGRpdi5zdHlsZVsnei1pbmRleCddID0gMzA7XG5cbiAgICB2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBwLnRleHRDb250ZW50ID0gJ1dlYkdMIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyIC0gdmlzaXQgaHR0cHM6Ly9nZXQud2ViZ2wub3JnIGZvciBtb3JlIGluZm8nO1xuICAgIHAuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIHAuc3R5bGUudG9wID0gJzUwJSc7XG4gICAgcC5zdHlsZS5sZWZ0ID0gJzUwJSc7XG4gICAgcC5zdHlsZS5oZWlnaHQgPSAnMzAlJztcbiAgICBwLnN0eWxlLndpZHRoID0gJzUwJSc7XG4gICAgcC5zdHlsZS5tYXJnaW4gPSAnLTE1JSAwIDAgLTI1JSc7XG5cbiAgICBkaXYuYXBwZW5kQ2hpbGQocCk7XG4gICAgc2NlbmUuY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgc2NlbmUuY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmQgPSAnI0ZGRkZGRic7XG4gICAgc2NlbmUuY29udGFpbmVyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vZ2V0LndlYmdsLm9yZycpO1xuICAgIH07XG5cbiAgICAvLyByZXR1cm4gYmVmb3JlIHNldHRpbmcgdXAgY2FtZXJhIGFuZCBvbnJlbmRlciBtZXRob2RzXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=