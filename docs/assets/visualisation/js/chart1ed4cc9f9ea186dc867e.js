(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_binary-search-bounds_search-bounds_js-node_modules_plotly_js_src_lib_gl_format_c-b09cf9"],{

/***/ "./node_modules/binary-search-bounds/search-bounds.js":
/*!************************************************************!*\
  !*** ./node_modules/binary-search-bounds/search-bounds.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


function compileSearch(funcName, predicate, reversed, extraArgs, earlyOut) {
  var code = [
    "function ", funcName, "(a,l,h,", extraArgs.join(","),  "){",
    earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"),
    ";while(l<=h){var m=(l+h)>>>1,x=a[m]"]
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
  compileSearch("A", "x" + predicate + "y", reversed, ["y"], earlyOut),
  compileSearch("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], earlyOut),
"function dispatchBsearch", suffix, "(a,y,c,l,h){\
if(typeof(c)==='function'){\
return P(a,(l===void 0)?0:l|0,(h===void 0)?a.length-1:h|0,y,c)\
}else{\
return A(a,(c===void 0)?0:c|0,(l===void 0)?a.length-1:l|0,y)\
}}\
return dispatchBsearch", suffix].join(""))
  return result()
}

module.exports = {
  ge: compileBoundsSearch(">=", false,  "GE"),
  gt: compileBoundsSearch(">",  false,  "GT"),
  lt: compileBoundsSearch("<",  true,   "LT"),
  le: compileBoundsSearch("<=", true,   "LE"),
  eq: compileBoundsSearch("-",  true,   "EQ", true)
}


/***/ }),

/***/ "./node_modules/color-normalize/index.js":
/*!***********************************************!*\
  !*** ./node_modules/color-normalize/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/** @module  color-normalize */



var rgba = __webpack_require__(/*! color-rgba */ "./node_modules/color-rgba/index.js")
var clamp = __webpack_require__(/*! clamp */ "./node_modules/clamp/index.js")
var dtype = __webpack_require__(/*! dtype */ "./node_modules/dtype/index.js")

module.exports = function normalize (color, type) {
	if (type === 'float' || !type) type = 'array'
	if (type === 'uint') type = 'uint8'
	if (type === 'uint_clamped') type = 'uint8_clamped'
	var Ctor = dtype(type)
	var output = new Ctor(4)

	var normalize = type !== 'uint8' && type !== 'uint8_clamped'

	// attempt to parse non-array arguments
	if (!color.length || typeof color === 'string') {
		color = rgba(color)
		color[0] /= 255
		color[1] /= 255
		color[2] /= 255
	}

	// 0, 1 are possible contradictory values for Arrays:
	// [1,1,1] input gives [1,1,1] output instead of [1/255,1/255,1/255], which may be collision if input is meant to be uint.
	// converting [1,1,1] to [1/255,1/255,1/255] in case of float input gives larger mistake since [1,1,1] float is frequent edge value, whereas [0,1,1], [1,1,1] etc. uint inputs are relatively rare
	if (isInt(color)) {
		output[0] = color[0]
		output[1] = color[1]
		output[2] = color[2]
		output[3] = color[3] != null ? color[3] : 255

		if (normalize) {
			output[0] /= 255
			output[1] /= 255
			output[2] /= 255
			output[3] /= 255
		}

		return output
	}

	if (!normalize) {
		output[0] = clamp(Math.floor(color[0] * 255), 0, 255)
		output[1] = clamp(Math.floor(color[1] * 255), 0, 255)
		output[2] = clamp(Math.floor(color[2] * 255), 0, 255)
		output[3] = color[3] == null ? 255 : clamp(Math.floor(color[3] * 255), 0, 255)
	} else {
		output[0] = color[0]
		output[1] = color[1]
		output[2] = color[2]
		output[3] = color[3] != null ? color[3] : 1
	}

	return output
}

function isInt(color) {
	if (color instanceof Uint8Array || color instanceof Uint8ClampedArray) return true

	if (Array.isArray(color) &&
		(color[0] > 1 || color[0] === 0) &&
		(color[1] > 1 || color[1] === 0) &&
		(color[2] > 1 || color[2] === 0) &&
		(!color[3] || color[3] > 1)
	) return true

	return false
}


/***/ }),

/***/ "./node_modules/dtype/index.js":
/*!*************************************!*\
  !*** ./node_modules/dtype/index.js ***!
  \*************************************/
/***/ ((module) => {

module.exports = function(dtype) {
  switch (dtype) {
    case 'int8':
      return Int8Array
    case 'int16':
      return Int16Array
    case 'int32':
      return Int32Array
    case 'uint8':
      return Uint8Array
    case 'uint16':
      return Uint16Array
    case 'uint32':
      return Uint32Array
    case 'float32':
      return Float32Array
    case 'float64':
      return Float64Array
    case 'array':
      return Array
    case 'uint8_clamped':
      return Uint8ClampedArray
  }
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

/***/ "./node_modules/plotly.js/src/plots/domain.js":
/*!****************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/domain.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var extendFlat = __webpack_require__(/*! ../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

/**
 * Make a xy domain attribute group
 *
 * @param {object} opts
 *   @param {string}
 *     opts.name: name to be inserted in the default description
 *   @param {boolean}
 *     opts.trace: set to true for trace containers
 *   @param {string}
 *     opts.editType: editType for all pieces
 *   @param {boolean}
 *     opts.noGridCell: set to true to omit `row` and `column`
 *
 * @param {object} extra
 *   @param {string}
 *     extra.description: extra description. N.B we use
 *     a separate extra container to make it compatible with
 *     the compress_attributes transform.
 *
 * @return {object} attributes object containing {x,y} as specified
 */
exports.attributes = function(opts, extra) {
    opts = opts || {};
    extra = extra || {};

    var base = {
        valType: 'info_array',
        role: 'info',
        editType: opts.editType,
        items: [
            {valType: 'number', min: 0, max: 1, editType: opts.editType},
            {valType: 'number', min: 0, max: 1, editType: opts.editType}
        ],
        dflt: [0, 1]
    };

    var namePart = opts.name ? opts.name + ' ' : '';
    var contPart = opts.trace ? 'trace ' : 'subplot ';
    var descPart = extra.description ? ' ' + extra.description : '';

    var out = {
        x: extendFlat({}, base, {
            description: [
                'Sets the horizontal domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        y: extendFlat({}, base, {
            description: [
                'Sets the vertical domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        editType: opts.editType
    };

    if(!opts.noGridCell) {
        out.row = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this row in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
        out.column = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this column in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
    }

    return out;
};

exports.defaults = function(containerOut, layout, coerce, dfltDomains) {
    var dfltX = (dfltDomains && dfltDomains.x) || [0, 1];
    var dfltY = (dfltDomains && dfltDomains.y) || [0, 1];

    var grid = layout.grid;
    if(grid) {
        var column = coerce('domain.column');
        if(column !== undefined) {
            if(column < grid.columns) dfltX = grid._domains.x[column];
            else delete containerOut.domain.column;
        }

        var row = coerce('domain.row');
        if(row !== undefined) {
            if(row < grid.rows) dfltY = grid._domains.y[row];
            else delete containerOut.domain.row;
        }
    }

    var x = coerce('domain.x', dfltX);
    var y = coerce('domain.y', dfltY);

    // don't accept bad input data
    if(!(x[0] < x[1])) containerOut.domain.x = dfltX.slice();
    if(!(y[0] < y[1])) containerOut.domain.y = dfltY.slice();
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/merge_length.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/merge_length.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



/**
 * mergeLength: set trace length as the minimum of all dimension data lengths
 *     and propagates this length into each dimension
 *
 * @param {object} traceOut: the fullData trace
 * @param {Array(object)} dimensions: array of dimension objects
 * @param {string} dataAttr: the attribute of each dimension containing the data
 * @param {integer} len: an already-existing length from other attributes
 */
module.exports = function(traceOut, dimensions, dataAttr, len) {
    if(!len) len = Infinity;
    var i, dimi;
    for(i = 0; i < dimensions.length; i++) {
        dimi = dimensions[i];
        if(dimi.visible) len = Math.min(len, dimi[dataAttr].length);
    }
    if(len === Infinity) len = 0;

    traceOut._length = len;
    for(i = 0; i < dimensions.length; i++) {
        dimi = dimensions[i];
        if(dimi.visible) dimi._length = len;
    }

    return len;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2JpbmFyeS1zZWFyY2gtYm91bmRzL3NlYXJjaC1ib3VuZHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9jb2xvci1ub3JtYWxpemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kdHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvbGliL2dsX2Zvcm1hdF9jb2xvci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZG9tYWluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGFyY29vcmRzL21lcmdlX2xlbmd0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBWTs7QUFFWjtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0EsTUFBTSxZQUFZO0FBQ2xCO0FBQ0E7QUFDQSxrQkFBa0IsVUFBVSxTQUFTLGNBQWM7QUFDbkQsS0FBSztBQUNMLGtCQUFrQixhQUFhLFVBQVUsU0FBUyxjQUFjO0FBQ2hFO0FBQ0EsR0FBRztBQUNILGdCQUFnQixvQkFBb0IsSUFBSTtBQUN4QztBQUNBO0FBQ0EscUJBQXFCLEtBQUssTUFBTTtBQUNoQyxHQUFHO0FBQ0gscUJBQXFCLEtBQUssTUFBTTtBQUNoQztBQUNBLGNBQWM7QUFDZDtBQUNBLDBCQUEwQjtBQUMxQixHQUFHO0FBQ0gseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRCwyQkFBMkI7QUFDM0I7QUFDQSxDQUFDLEtBQUs7QUFDTjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHVCQUF1QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsdUJBQXVCO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImNoYXJ0MWVkNGNjOWY5ZWExODZkYzg2N2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBjb21waWxlU2VhcmNoKGZ1bmNOYW1lLCBwcmVkaWNhdGUsIHJldmVyc2VkLCBleHRyYUFyZ3MsIGVhcmx5T3V0KSB7XG4gIHZhciBjb2RlID0gW1xuICAgIFwiZnVuY3Rpb24gXCIsIGZ1bmNOYW1lLCBcIihhLGwsaCxcIiwgZXh0cmFBcmdzLmpvaW4oXCIsXCIpLCAgXCIpe1wiLFxuICAgIGVhcmx5T3V0ID8gXCJcIiA6IFwidmFyIGk9XCIsIChyZXZlcnNlZCA/IFwibC0xXCIgOiBcImgrMVwiKSxcbiAgICBcIjt3aGlsZShsPD1oKXt2YXIgbT0obCtoKT4+PjEseD1hW21dXCJdXG4gIGlmKGVhcmx5T3V0KSB7XG4gICAgaWYocHJlZGljYXRlLmluZGV4T2YoXCJjXCIpIDwgMCkge1xuICAgICAgY29kZS5wdXNoKFwiO2lmKHg9PT15KXtyZXR1cm4gbX1lbHNlIGlmKHg8PXkpe1wiKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2RlLnB1c2goXCI7dmFyIHA9Yyh4LHkpO2lmKHA9PT0wKXtyZXR1cm4gbX1lbHNlIGlmKHA8PTApe1wiKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb2RlLnB1c2goXCI7aWYoXCIsIHByZWRpY2F0ZSwgXCIpe2k9bTtcIilcbiAgfVxuICBpZihyZXZlcnNlZCkge1xuICAgIGNvZGUucHVzaChcImw9bSsxfWVsc2V7aD1tLTF9XCIpXG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKFwiaD1tLTF9ZWxzZXtsPW0rMX1cIilcbiAgfVxuICBjb2RlLnB1c2goXCJ9XCIpXG4gIGlmKGVhcmx5T3V0KSB7XG4gICAgY29kZS5wdXNoKFwicmV0dXJuIC0xfTtcIilcbiAgfSBlbHNlIHtcbiAgICBjb2RlLnB1c2goXCJyZXR1cm4gaX07XCIpXG4gIH1cbiAgcmV0dXJuIGNvZGUuam9pbihcIlwiKVxufVxuXG5mdW5jdGlvbiBjb21waWxlQm91bmRzU2VhcmNoKHByZWRpY2F0ZSwgcmV2ZXJzZWQsIHN1ZmZpeCwgZWFybHlPdXQpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBGdW5jdGlvbihbXG4gIGNvbXBpbGVTZWFyY2goXCJBXCIsIFwieFwiICsgcHJlZGljYXRlICsgXCJ5XCIsIHJldmVyc2VkLCBbXCJ5XCJdLCBlYXJseU91dCksXG4gIGNvbXBpbGVTZWFyY2goXCJQXCIsIFwiYyh4LHkpXCIgKyBwcmVkaWNhdGUgKyBcIjBcIiwgcmV2ZXJzZWQsIFtcInlcIiwgXCJjXCJdLCBlYXJseU91dCksXG5cImZ1bmN0aW9uIGRpc3BhdGNoQnNlYXJjaFwiLCBzdWZmaXgsIFwiKGEseSxjLGwsaCl7XFxcbmlmKHR5cGVvZihjKT09PSdmdW5jdGlvbicpe1xcXG5yZXR1cm4gUChhLChsPT09dm9pZCAwKT8wOmx8MCwoaD09PXZvaWQgMCk/YS5sZW5ndGgtMTpofDAseSxjKVxcXG59ZWxzZXtcXFxucmV0dXJuIEEoYSwoYz09PXZvaWQgMCk/MDpjfDAsKGw9PT12b2lkIDApP2EubGVuZ3RoLTE6bHwwLHkpXFxcbn19XFxcbnJldHVybiBkaXNwYXRjaEJzZWFyY2hcIiwgc3VmZml4XS5qb2luKFwiXCIpKVxuICByZXR1cm4gcmVzdWx0KClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdlOiBjb21waWxlQm91bmRzU2VhcmNoKFwiPj1cIiwgZmFsc2UsICBcIkdFXCIpLFxuICBndDogY29tcGlsZUJvdW5kc1NlYXJjaChcIj5cIiwgIGZhbHNlLCAgXCJHVFwiKSxcbiAgbHQ6IGNvbXBpbGVCb3VuZHNTZWFyY2goXCI8XCIsICB0cnVlLCAgIFwiTFRcIiksXG4gIGxlOiBjb21waWxlQm91bmRzU2VhcmNoKFwiPD1cIiwgdHJ1ZSwgICBcIkxFXCIpLFxuICBlcTogY29tcGlsZUJvdW5kc1NlYXJjaChcIi1cIiwgIHRydWUsICAgXCJFUVwiLCB0cnVlKVxufVxuIiwiLyoqIEBtb2R1bGUgIGNvbG9yLW5vcm1hbGl6ZSAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgcmdiYSA9IHJlcXVpcmUoJ2NvbG9yLXJnYmEnKVxyXG52YXIgY2xhbXAgPSByZXF1aXJlKCdjbGFtcCcpXHJcbnZhciBkdHlwZSA9IHJlcXVpcmUoJ2R0eXBlJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplIChjb2xvciwgdHlwZSkge1xyXG5cdGlmICh0eXBlID09PSAnZmxvYXQnIHx8ICF0eXBlKSB0eXBlID0gJ2FycmF5J1xyXG5cdGlmICh0eXBlID09PSAndWludCcpIHR5cGUgPSAndWludDgnXHJcblx0aWYgKHR5cGUgPT09ICd1aW50X2NsYW1wZWQnKSB0eXBlID0gJ3VpbnQ4X2NsYW1wZWQnXHJcblx0dmFyIEN0b3IgPSBkdHlwZSh0eXBlKVxyXG5cdHZhciBvdXRwdXQgPSBuZXcgQ3Rvcig0KVxyXG5cclxuXHR2YXIgbm9ybWFsaXplID0gdHlwZSAhPT0gJ3VpbnQ4JyAmJiB0eXBlICE9PSAndWludDhfY2xhbXBlZCdcclxuXHJcblx0Ly8gYXR0ZW1wdCB0byBwYXJzZSBub24tYXJyYXkgYXJndW1lbnRzXHJcblx0aWYgKCFjb2xvci5sZW5ndGggfHwgdHlwZW9mIGNvbG9yID09PSAnc3RyaW5nJykge1xyXG5cdFx0Y29sb3IgPSByZ2JhKGNvbG9yKVxyXG5cdFx0Y29sb3JbMF0gLz0gMjU1XHJcblx0XHRjb2xvclsxXSAvPSAyNTVcclxuXHRcdGNvbG9yWzJdIC89IDI1NVxyXG5cdH1cclxuXHJcblx0Ly8gMCwgMSBhcmUgcG9zc2libGUgY29udHJhZGljdG9yeSB2YWx1ZXMgZm9yIEFycmF5czpcclxuXHQvLyBbMSwxLDFdIGlucHV0IGdpdmVzIFsxLDEsMV0gb3V0cHV0IGluc3RlYWQgb2YgWzEvMjU1LDEvMjU1LDEvMjU1XSwgd2hpY2ggbWF5IGJlIGNvbGxpc2lvbiBpZiBpbnB1dCBpcyBtZWFudCB0byBiZSB1aW50LlxyXG5cdC8vIGNvbnZlcnRpbmcgWzEsMSwxXSB0byBbMS8yNTUsMS8yNTUsMS8yNTVdIGluIGNhc2Ugb2YgZmxvYXQgaW5wdXQgZ2l2ZXMgbGFyZ2VyIG1pc3Rha2Ugc2luY2UgWzEsMSwxXSBmbG9hdCBpcyBmcmVxdWVudCBlZGdlIHZhbHVlLCB3aGVyZWFzIFswLDEsMV0sIFsxLDEsMV0gZXRjLiB1aW50IGlucHV0cyBhcmUgcmVsYXRpdmVseSByYXJlXHJcblx0aWYgKGlzSW50KGNvbG9yKSkge1xyXG5cdFx0b3V0cHV0WzBdID0gY29sb3JbMF1cclxuXHRcdG91dHB1dFsxXSA9IGNvbG9yWzFdXHJcblx0XHRvdXRwdXRbMl0gPSBjb2xvclsyXVxyXG5cdFx0b3V0cHV0WzNdID0gY29sb3JbM10gIT0gbnVsbCA/IGNvbG9yWzNdIDogMjU1XHJcblxyXG5cdFx0aWYgKG5vcm1hbGl6ZSkge1xyXG5cdFx0XHRvdXRwdXRbMF0gLz0gMjU1XHJcblx0XHRcdG91dHB1dFsxXSAvPSAyNTVcclxuXHRcdFx0b3V0cHV0WzJdIC89IDI1NVxyXG5cdFx0XHRvdXRwdXRbM10gLz0gMjU1XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG91dHB1dFxyXG5cdH1cclxuXHJcblx0aWYgKCFub3JtYWxpemUpIHtcclxuXHRcdG91dHB1dFswXSA9IGNsYW1wKE1hdGguZmxvb3IoY29sb3JbMF0gKiAyNTUpLCAwLCAyNTUpXHJcblx0XHRvdXRwdXRbMV0gPSBjbGFtcChNYXRoLmZsb29yKGNvbG9yWzFdICogMjU1KSwgMCwgMjU1KVxyXG5cdFx0b3V0cHV0WzJdID0gY2xhbXAoTWF0aC5mbG9vcihjb2xvclsyXSAqIDI1NSksIDAsIDI1NSlcclxuXHRcdG91dHB1dFszXSA9IGNvbG9yWzNdID09IG51bGwgPyAyNTUgOiBjbGFtcChNYXRoLmZsb29yKGNvbG9yWzNdICogMjU1KSwgMCwgMjU1KVxyXG5cdH0gZWxzZSB7XHJcblx0XHRvdXRwdXRbMF0gPSBjb2xvclswXVxyXG5cdFx0b3V0cHV0WzFdID0gY29sb3JbMV1cclxuXHRcdG91dHB1dFsyXSA9IGNvbG9yWzJdXHJcblx0XHRvdXRwdXRbM10gPSBjb2xvclszXSAhPSBudWxsID8gY29sb3JbM10gOiAxXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gb3V0cHV0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW50KGNvbG9yKSB7XHJcblx0aWYgKGNvbG9yIGluc3RhbmNlb2YgVWludDhBcnJheSB8fCBjb2xvciBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSByZXR1cm4gdHJ1ZVxyXG5cclxuXHRpZiAoQXJyYXkuaXNBcnJheShjb2xvcikgJiZcclxuXHRcdChjb2xvclswXSA+IDEgfHwgY29sb3JbMF0gPT09IDApICYmXHJcblx0XHQoY29sb3JbMV0gPiAxIHx8IGNvbG9yWzFdID09PSAwKSAmJlxyXG5cdFx0KGNvbG9yWzJdID4gMSB8fCBjb2xvclsyXSA9PT0gMCkgJiZcclxuXHRcdCghY29sb3JbM10gfHwgY29sb3JbM10gPiAxKVxyXG5cdCkgcmV0dXJuIHRydWVcclxuXHJcblx0cmV0dXJuIGZhbHNlXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkdHlwZSkge1xuICBzd2l0Y2ggKGR0eXBlKSB7XG4gICAgY2FzZSAnaW50OCc6XG4gICAgICByZXR1cm4gSW50OEFycmF5XG4gICAgY2FzZSAnaW50MTYnOlxuICAgICAgcmV0dXJuIEludDE2QXJyYXlcbiAgICBjYXNlICdpbnQzMic6XG4gICAgICByZXR1cm4gSW50MzJBcnJheVxuICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgIHJldHVybiBVaW50OEFycmF5XG4gICAgY2FzZSAndWludDE2JzpcbiAgICAgIHJldHVybiBVaW50MTZBcnJheVxuICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICByZXR1cm4gVWludDMyQXJyYXlcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBGbG9hdDMyQXJyYXlcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBGbG9hdDY0QXJyYXlcbiAgICBjYXNlICdhcnJheSc6XG4gICAgICByZXR1cm4gQXJyYXlcbiAgICBjYXNlICd1aW50OF9jbGFtcGVkJzpcbiAgICAgIHJldHVybiBVaW50OENsYW1wZWRBcnJheVxuICB9XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIHRpbnljb2xvciA9IHJlcXVpcmUoJ3Rpbnljb2xvcjInKTtcbnZhciByZ2JhID0gcmVxdWlyZSgnY29sb3Itbm9ybWFsaXplJyk7XG5cbnZhciBDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJyk7XG52YXIgY29sb3JEZmx0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb2xvci9hdHRyaWJ1dGVzJykuZGVmYXVsdExpbmU7XG52YXIgaXNBcnJheU9yVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vYXJyYXknKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG52YXIgY29sb3JEZmx0UmdiYSA9IHJnYmEoY29sb3JEZmx0KTtcbnZhciBvcGFjaXR5RGZsdCA9IDE7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUNvbG9yKGNvbG9ySW4sIG9wYWNpdHlJbikge1xuICAgIHZhciBjb2xvck91dCA9IGNvbG9ySW47XG4gICAgY29sb3JPdXRbM10gKj0gb3BhY2l0eUluO1xuICAgIHJldHVybiBjb2xvck91dDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDb2xvcihjb2xvckluKSB7XG4gICAgaWYoaXNOdW1lcmljKGNvbG9ySW4pKSByZXR1cm4gY29sb3JEZmx0UmdiYTtcblxuICAgIHZhciBjb2xvck91dCA9IHJnYmEoY29sb3JJbik7XG5cbiAgICByZXR1cm4gY29sb3JPdXQubGVuZ3RoID8gY29sb3JPdXQgOiBjb2xvckRmbHRSZ2JhO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU9wYWNpdHkob3BhY2l0eUluKSB7XG4gICAgcmV0dXJuIGlzTnVtZXJpYyhvcGFjaXR5SW4pID8gb3BhY2l0eUluIDogb3BhY2l0eURmbHQ7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdENvbG9yKGNvbnRhaW5lckluLCBvcGFjaXR5SW4sIGxlbikge1xuICAgIHZhciBjb2xvckluID0gY29udGFpbmVySW4uY29sb3I7XG4gICAgdmFyIGlzQXJyYXlDb2xvckluID0gaXNBcnJheU9yVHlwZWRBcnJheShjb2xvckluKTtcbiAgICB2YXIgaXNBcnJheU9wYWNpdHlJbiA9IGlzQXJyYXlPclR5cGVkQXJyYXkob3BhY2l0eUluKTtcbiAgICB2YXIgY09wdHMgPSBDb2xvcnNjYWxlLmV4dHJhY3RPcHRzKGNvbnRhaW5lckluKTtcbiAgICB2YXIgY29sb3JPdXQgPSBbXTtcblxuICAgIHZhciBzY2xGdW5jLCBnZXRDb2xvciwgZ2V0T3BhY2l0eSwgY29sb3JpLCBvcGFjaXR5aTtcblxuICAgIGlmKGNPcHRzLmNvbG9yc2NhbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzY2xGdW5jID0gQ29sb3JzY2FsZS5tYWtlQ29sb3JTY2FsZUZ1bmNGcm9tVHJhY2UoY29udGFpbmVySW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNjbEZ1bmMgPSB2YWxpZGF0ZUNvbG9yO1xuICAgIH1cblxuICAgIGlmKGlzQXJyYXlDb2xvckluKSB7XG4gICAgICAgIGdldENvbG9yID0gZnVuY3Rpb24oYywgaSkge1xuICAgICAgICAgICAgLy8gRklYTUU6IHRoZXJlIGlzIGRvdWJsZSB3b3JrLCBjb25zaWRlcmluZyB0aGF0IHNjbEZ1bmMgZG9lcyB0aGUgb3Bwb3NpdGVcbiAgICAgICAgICAgIHJldHVybiBjW2ldID09PSB1bmRlZmluZWQgPyBjb2xvckRmbHRSZ2JhIDogcmdiYShzY2xGdW5jKGNbaV0pKTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgZ2V0Q29sb3IgPSB2YWxpZGF0ZUNvbG9yO1xuXG4gICAgaWYoaXNBcnJheU9wYWNpdHlJbikge1xuICAgICAgICBnZXRPcGFjaXR5ID0gZnVuY3Rpb24obywgaSkge1xuICAgICAgICAgICAgcmV0dXJuIG9baV0gPT09IHVuZGVmaW5lZCA/IG9wYWNpdHlEZmx0IDogdmFsaWRhdGVPcGFjaXR5KG9baV0pO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBnZXRPcGFjaXR5ID0gdmFsaWRhdGVPcGFjaXR5O1xuXG4gICAgaWYoaXNBcnJheUNvbG9ySW4gfHwgaXNBcnJheU9wYWNpdHlJbikge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbG9yaSA9IGdldENvbG9yKGNvbG9ySW4sIGkpO1xuICAgICAgICAgICAgb3BhY2l0eWkgPSBnZXRPcGFjaXR5KG9wYWNpdHlJbiwgaSk7XG4gICAgICAgICAgICBjb2xvck91dFtpXSA9IGNhbGN1bGF0ZUNvbG9yKGNvbG9yaSwgb3BhY2l0eWkpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGNvbG9yT3V0ID0gY2FsY3VsYXRlQ29sb3IocmdiYShjb2xvckluKSwgb3BhY2l0eUluKTtcblxuICAgIHJldHVybiBjb2xvck91dDtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb2xvclNjYWxlKGNvbnQsIGFscGhhKSB7XG4gICAgaWYoYWxwaGEgPT09IHVuZGVmaW5lZCkgYWxwaGEgPSAxO1xuXG4gICAgdmFyIGNPcHRzID0gQ29sb3JzY2FsZS5leHRyYWN0T3B0cyhjb250KTtcblxuICAgIHZhciBjb2xvcnNjYWxlID0gY09wdHMucmV2ZXJzZXNjYWxlID9cbiAgICAgICAgQ29sb3JzY2FsZS5mbGlwU2NhbGUoY09wdHMuY29sb3JzY2FsZSkgOlxuICAgICAgICBjT3B0cy5jb2xvcnNjYWxlO1xuXG4gICAgcmV0dXJuIGNvbG9yc2NhbGUubWFwKGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZWxlbVswXTtcbiAgICAgICAgdmFyIGNvbG9yID0gdGlueWNvbG9yKGVsZW1bMV0pO1xuICAgICAgICB2YXIgcmdiID0gY29sb3IudG9SZ2IoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHJnYjogW3JnYi5yLCByZ2IuZywgcmdiLmIsIGFscGhhXVxuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXRDb2xvcjogZm9ybWF0Q29sb3IsXG4gICAgcGFyc2VDb2xvclNjYWxlOiBwYXJzZUNvbG9yU2NhbGVcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbi8qKlxuICogTWFrZSBhIHh5IGRvbWFpbiBhdHRyaWJ1dGUgZ3JvdXBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLm5hbWU6IG5hbWUgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIGRlZmF1bHQgZGVzY3JpcHRpb25cbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMudHJhY2U6IHNldCB0byB0cnVlIGZvciB0cmFjZSBjb250YWluZXJzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMuZWRpdFR5cGU6IGVkaXRUeXBlIGZvciBhbGwgcGllY2VzXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLm5vR3JpZENlbGw6IHNldCB0byB0cnVlIHRvIG9taXQgYHJvd2AgYW5kIGBjb2x1bW5gXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIGV4dHJhLmRlc2NyaXB0aW9uOiBleHRyYSBkZXNjcmlwdGlvbi4gTi5CIHdlIHVzZVxuICogICAgIGEgc2VwYXJhdGUgZXh0cmEgY29udGFpbmVyIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoXG4gKiAgICAgdGhlIGNvbXByZXNzX2F0dHJpYnV0ZXMgdHJhbnNmb3JtLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYXR0cmlidXRlcyBvYmplY3QgY29udGFpbmluZyB7eCx5fSBhcyBzcGVjaWZpZWRcbiAqL1xuZXhwb3J0cy5hdHRyaWJ1dGVzID0gZnVuY3Rpb24ob3B0cywgZXh0cmEpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBleHRyYSA9IGV4dHJhIHx8IHt9O1xuXG4gICAgdmFyIGJhc2UgPSB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfVxuICAgICAgICBdLFxuICAgICAgICBkZmx0OiBbMCwgMV1cbiAgICB9O1xuXG4gICAgdmFyIG5hbWVQYXJ0ID0gb3B0cy5uYW1lID8gb3B0cy5uYW1lICsgJyAnIDogJyc7XG4gICAgdmFyIGNvbnRQYXJ0ID0gb3B0cy50cmFjZSA/ICd0cmFjZSAnIDogJ3N1YnBsb3QgJztcbiAgICB2YXIgZGVzY1BhcnQgPSBleHRyYS5kZXNjcmlwdGlvbiA/ICcgJyArIGV4dHJhLmRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICB4OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3Jpem9udGFsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICB5OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB2ZXJ0aWNhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGVcbiAgICB9O1xuXG4gICAgaWYoIW9wdHMubm9HcmlkQ2VsbCkge1xuICAgICAgICBvdXQucm93ID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgcm93IGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgICAgIG91dC5jb2x1bW4gPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyBjb2x1bW4gaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbnRhaW5lck91dCwgbGF5b3V0LCBjb2VyY2UsIGRmbHREb21haW5zKSB7XG4gICAgdmFyIGRmbHRYID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLngpIHx8IFswLCAxXTtcbiAgICB2YXIgZGZsdFkgPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueSkgfHwgWzAsIDFdO1xuXG4gICAgdmFyIGdyaWQgPSBsYXlvdXQuZ3JpZDtcbiAgICBpZihncmlkKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBjb2VyY2UoJ2RvbWFpbi5jb2x1bW4nKTtcbiAgICAgICAgaWYoY29sdW1uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGNvbHVtbiA8IGdyaWQuY29sdW1ucykgZGZsdFggPSBncmlkLl9kb21haW5zLnhbY29sdW1uXTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4uY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IGNvZXJjZSgnZG9tYWluLnJvdycpO1xuICAgICAgICBpZihyb3cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYocm93IDwgZ3JpZC5yb3dzKSBkZmx0WSA9IGdyaWQuX2RvbWFpbnMueVtyb3ddO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5yb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgnZG9tYWluLngnLCBkZmx0WCk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ2RvbWFpbi55JywgZGZsdFkpO1xuXG4gICAgLy8gZG9uJ3QgYWNjZXB0IGJhZCBpbnB1dCBkYXRhXG4gICAgaWYoISh4WzBdIDwgeFsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueCA9IGRmbHRYLnNsaWNlKCk7XG4gICAgaWYoISh5WzBdIDwgeVsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueSA9IGRmbHRZLnNsaWNlKCk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIG1lcmdlTGVuZ3RoOiBzZXQgdHJhY2UgbGVuZ3RoIGFzIHRoZSBtaW5pbXVtIG9mIGFsbCBkaW1lbnNpb24gZGF0YSBsZW5ndGhzXG4gKiAgICAgYW5kIHByb3BhZ2F0ZXMgdGhpcyBsZW5ndGggaW50byBlYWNoIGRpbWVuc2lvblxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0cmFjZU91dDogdGhlIGZ1bGxEYXRhIHRyYWNlXG4gKiBAcGFyYW0ge0FycmF5KG9iamVjdCl9IGRpbWVuc2lvbnM6IGFycmF5IG9mIGRpbWVuc2lvbiBvYmplY3RzXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YUF0dHI6IHRoZSBhdHRyaWJ1dGUgb2YgZWFjaCBkaW1lbnNpb24gY29udGFpbmluZyB0aGUgZGF0YVxuICogQHBhcmFtIHtpbnRlZ2VyfSBsZW46IGFuIGFscmVhZHktZXhpc3RpbmcgbGVuZ3RoIGZyb20gb3RoZXIgYXR0cmlidXRlc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRyYWNlT3V0LCBkaW1lbnNpb25zLCBkYXRhQXR0ciwgbGVuKSB7XG4gICAgaWYoIWxlbikgbGVuID0gSW5maW5pdHk7XG4gICAgdmFyIGksIGRpbWk7XG4gICAgZm9yKGkgPSAwOyBpIDwgZGltZW5zaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkaW1pID0gZGltZW5zaW9uc1tpXTtcbiAgICAgICAgaWYoZGltaS52aXNpYmxlKSBsZW4gPSBNYXRoLm1pbihsZW4sIGRpbWlbZGF0YUF0dHJdLmxlbmd0aCk7XG4gICAgfVxuICAgIGlmKGxlbiA9PT0gSW5maW5pdHkpIGxlbiA9IDA7XG5cbiAgICB0cmFjZU91dC5fbGVuZ3RoID0gbGVuO1xuICAgIGZvcihpID0gMDsgaSA8IGRpbWVuc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGltaSA9IGRpbWVuc2lvbnNbaV07XG4gICAgICAgIGlmKGRpbWkudmlzaWJsZSkgZGltaS5fbGVuZ3RoID0gbGVuO1xuICAgIH1cblxuICAgIHJldHVybiBsZW47XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==