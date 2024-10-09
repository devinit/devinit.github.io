(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_lib_gl_format_color_js-node_modules_plotly_js_src_plots_subplot_de-2df51a"],{

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

/***/ "./node_modules/plotly.js/src/traces/scatter/link_traces.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/link_traces.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var LINKEDFILLS = {tonextx: 1, tonexty: 1, tonext: 1};

module.exports = function linkTraces(gd, plotinfo, cdscatter) {
    var trace, i, group, prevtrace, groupIndex;

    // first sort traces to keep stacks & filled-together groups together
    var groupIndices = {};
    var needsSort = false;
    var prevGroupIndex = -1;
    var nextGroupIndex = 0;
    var prevUnstackedGroupIndex = -1;
    for(i = 0; i < cdscatter.length; i++) {
        trace = cdscatter[i][0].trace;
        group = trace.stackgroup || '';
        if(group) {
            if(group in groupIndices) {
                groupIndex = groupIndices[group];
            } else {
                groupIndex = groupIndices[group] = nextGroupIndex;
                nextGroupIndex++;
            }
        } else if(trace.fill in LINKEDFILLS && prevUnstackedGroupIndex >= 0) {
            groupIndex = prevUnstackedGroupIndex;
        } else {
            groupIndex = prevUnstackedGroupIndex = nextGroupIndex;
            nextGroupIndex++;
        }

        if(groupIndex < prevGroupIndex) needsSort = true;
        trace._groupIndex = prevGroupIndex = groupIndex;
    }

    var cdscatterSorted = cdscatter.slice();
    if(needsSort) {
        cdscatterSorted.sort(function(a, b) {
            var traceA = a[0].trace;
            var traceB = b[0].trace;
            return (traceA._groupIndex - traceB._groupIndex) ||
                (traceA.index - traceB.index);
        });
    }

    // now link traces to each other
    var prevtraces = {};
    for(i = 0; i < cdscatterSorted.length; i++) {
        trace = cdscatterSorted[i][0].trace;
        group = trace.stackgroup || '';

        // Note: The check which ensures all cdscatter here are for the same axis and
        // are either cartesian or scatterternary has been removed. This code assumes
        // the passed scattertraces have been filtered to the proper plot types and
        // the proper subplots.
        if(trace.visible === true) {
            trace._nexttrace = null;

            if(trace.fill in LINKEDFILLS) {
                prevtrace = prevtraces[group];
                trace._prevtrace = prevtrace || null;

                if(prevtrace) {
                    prevtrace._nexttrace = trace;
                }
            }

            trace._ownfill = (trace.fill && (
                trace.fill.substr(0, 6) === 'tozero' ||
                trace.fill === 'toself' ||
                (trace.fill.substr(0, 2) === 'to' && !trace._prevtrace)
            ));

            prevtraces[group] = trace;
        } else {
            trace._prevtrace = trace._nexttrace = trace._ownfill = null;
        }
    }

    return cdscatterSorted;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvbGliL2dsX2Zvcm1hdF9jb2xvci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZG9tYWluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9zdWJwbG90X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9saW5rX3RyYWNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw4REFBZ0I7QUFDeEMsZ0JBQWdCLG1CQUFPLENBQUMsMERBQVk7QUFDcEMsV0FBVyxtQkFBTyxDQUFDLGdFQUFpQjs7QUFFcEMsaUJBQWlCLG1CQUFPLENBQUMsNkZBQTBCO0FBQ25ELGdCQUFnQixvSUFBcUQ7QUFDckUsMEJBQTBCLG1HQUFzQzs7QUFFaEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUJBQWlCLGlHQUFtQzs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTywrQkFBK0IsSUFBSTtBQUN0RDtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLDJEQUEyRDtBQUN4RSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLHlEQUFRO0FBQzFCLGVBQWUsbUJBQU8sQ0FBQyx5RkFBMkI7QUFDbEQsMkJBQTJCLDRGQUE0Qjs7O0FBR3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGVBQWU7QUFDakM7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsbUJBQW1COztBQUVuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsc0JBQXNCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGNBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImNoYXJ0M2M5ZDcwNzRiMGQzNWU3NWQ3ZjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIHRpbnljb2xvciA9IHJlcXVpcmUoJ3Rpbnljb2xvcjInKTtcbnZhciByZ2JhID0gcmVxdWlyZSgnY29sb3Itbm9ybWFsaXplJyk7XG5cbnZhciBDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJyk7XG52YXIgY29sb3JEZmx0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9jb2xvci9hdHRyaWJ1dGVzJykuZGVmYXVsdExpbmU7XG52YXIgaXNBcnJheU9yVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vYXJyYXknKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG52YXIgY29sb3JEZmx0UmdiYSA9IHJnYmEoY29sb3JEZmx0KTtcbnZhciBvcGFjaXR5RGZsdCA9IDE7XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUNvbG9yKGNvbG9ySW4sIG9wYWNpdHlJbikge1xuICAgIHZhciBjb2xvck91dCA9IGNvbG9ySW47XG4gICAgY29sb3JPdXRbM10gKj0gb3BhY2l0eUluO1xuICAgIHJldHVybiBjb2xvck91dDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDb2xvcihjb2xvckluKSB7XG4gICAgaWYoaXNOdW1lcmljKGNvbG9ySW4pKSByZXR1cm4gY29sb3JEZmx0UmdiYTtcblxuICAgIHZhciBjb2xvck91dCA9IHJnYmEoY29sb3JJbik7XG5cbiAgICByZXR1cm4gY29sb3JPdXQubGVuZ3RoID8gY29sb3JPdXQgOiBjb2xvckRmbHRSZ2JhO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU9wYWNpdHkob3BhY2l0eUluKSB7XG4gICAgcmV0dXJuIGlzTnVtZXJpYyhvcGFjaXR5SW4pID8gb3BhY2l0eUluIDogb3BhY2l0eURmbHQ7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdENvbG9yKGNvbnRhaW5lckluLCBvcGFjaXR5SW4sIGxlbikge1xuICAgIHZhciBjb2xvckluID0gY29udGFpbmVySW4uY29sb3I7XG4gICAgdmFyIGlzQXJyYXlDb2xvckluID0gaXNBcnJheU9yVHlwZWRBcnJheShjb2xvckluKTtcbiAgICB2YXIgaXNBcnJheU9wYWNpdHlJbiA9IGlzQXJyYXlPclR5cGVkQXJyYXkob3BhY2l0eUluKTtcbiAgICB2YXIgY09wdHMgPSBDb2xvcnNjYWxlLmV4dHJhY3RPcHRzKGNvbnRhaW5lckluKTtcbiAgICB2YXIgY29sb3JPdXQgPSBbXTtcblxuICAgIHZhciBzY2xGdW5jLCBnZXRDb2xvciwgZ2V0T3BhY2l0eSwgY29sb3JpLCBvcGFjaXR5aTtcblxuICAgIGlmKGNPcHRzLmNvbG9yc2NhbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzY2xGdW5jID0gQ29sb3JzY2FsZS5tYWtlQ29sb3JTY2FsZUZ1bmNGcm9tVHJhY2UoY29udGFpbmVySW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNjbEZ1bmMgPSB2YWxpZGF0ZUNvbG9yO1xuICAgIH1cblxuICAgIGlmKGlzQXJyYXlDb2xvckluKSB7XG4gICAgICAgIGdldENvbG9yID0gZnVuY3Rpb24oYywgaSkge1xuICAgICAgICAgICAgLy8gRklYTUU6IHRoZXJlIGlzIGRvdWJsZSB3b3JrLCBjb25zaWRlcmluZyB0aGF0IHNjbEZ1bmMgZG9lcyB0aGUgb3Bwb3NpdGVcbiAgICAgICAgICAgIHJldHVybiBjW2ldID09PSB1bmRlZmluZWQgPyBjb2xvckRmbHRSZ2JhIDogcmdiYShzY2xGdW5jKGNbaV0pKTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgZ2V0Q29sb3IgPSB2YWxpZGF0ZUNvbG9yO1xuXG4gICAgaWYoaXNBcnJheU9wYWNpdHlJbikge1xuICAgICAgICBnZXRPcGFjaXR5ID0gZnVuY3Rpb24obywgaSkge1xuICAgICAgICAgICAgcmV0dXJuIG9baV0gPT09IHVuZGVmaW5lZCA/IG9wYWNpdHlEZmx0IDogdmFsaWRhdGVPcGFjaXR5KG9baV0pO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBnZXRPcGFjaXR5ID0gdmFsaWRhdGVPcGFjaXR5O1xuXG4gICAgaWYoaXNBcnJheUNvbG9ySW4gfHwgaXNBcnJheU9wYWNpdHlJbikge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbG9yaSA9IGdldENvbG9yKGNvbG9ySW4sIGkpO1xuICAgICAgICAgICAgb3BhY2l0eWkgPSBnZXRPcGFjaXR5KG9wYWNpdHlJbiwgaSk7XG4gICAgICAgICAgICBjb2xvck91dFtpXSA9IGNhbGN1bGF0ZUNvbG9yKGNvbG9yaSwgb3BhY2l0eWkpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGNvbG9yT3V0ID0gY2FsY3VsYXRlQ29sb3IocmdiYShjb2xvckluKSwgb3BhY2l0eUluKTtcblxuICAgIHJldHVybiBjb2xvck91dDtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb2xvclNjYWxlKGNvbnQsIGFscGhhKSB7XG4gICAgaWYoYWxwaGEgPT09IHVuZGVmaW5lZCkgYWxwaGEgPSAxO1xuXG4gICAgdmFyIGNPcHRzID0gQ29sb3JzY2FsZS5leHRyYWN0T3B0cyhjb250KTtcblxuICAgIHZhciBjb2xvcnNjYWxlID0gY09wdHMucmV2ZXJzZXNjYWxlID9cbiAgICAgICAgQ29sb3JzY2FsZS5mbGlwU2NhbGUoY09wdHMuY29sb3JzY2FsZSkgOlxuICAgICAgICBjT3B0cy5jb2xvcnNjYWxlO1xuXG4gICAgcmV0dXJuIGNvbG9yc2NhbGUubWFwKGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZWxlbVswXTtcbiAgICAgICAgdmFyIGNvbG9yID0gdGlueWNvbG9yKGVsZW1bMV0pO1xuICAgICAgICB2YXIgcmdiID0gY29sb3IudG9SZ2IoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHJnYjogW3JnYi5yLCByZ2IuZywgcmdiLmIsIGFscGhhXVxuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXRDb2xvcjogZm9ybWF0Q29sb3IsXG4gICAgcGFyc2VDb2xvclNjYWxlOiBwYXJzZUNvbG9yU2NhbGVcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbi8qKlxuICogTWFrZSBhIHh5IGRvbWFpbiBhdHRyaWJ1dGUgZ3JvdXBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLm5hbWU6IG5hbWUgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIGRlZmF1bHQgZGVzY3JpcHRpb25cbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMudHJhY2U6IHNldCB0byB0cnVlIGZvciB0cmFjZSBjb250YWluZXJzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMuZWRpdFR5cGU6IGVkaXRUeXBlIGZvciBhbGwgcGllY2VzXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLm5vR3JpZENlbGw6IHNldCB0byB0cnVlIHRvIG9taXQgYHJvd2AgYW5kIGBjb2x1bW5gXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIGV4dHJhLmRlc2NyaXB0aW9uOiBleHRyYSBkZXNjcmlwdGlvbi4gTi5CIHdlIHVzZVxuICogICAgIGEgc2VwYXJhdGUgZXh0cmEgY29udGFpbmVyIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoXG4gKiAgICAgdGhlIGNvbXByZXNzX2F0dHJpYnV0ZXMgdHJhbnNmb3JtLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYXR0cmlidXRlcyBvYmplY3QgY29udGFpbmluZyB7eCx5fSBhcyBzcGVjaWZpZWRcbiAqL1xuZXhwb3J0cy5hdHRyaWJ1dGVzID0gZnVuY3Rpb24ob3B0cywgZXh0cmEpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBleHRyYSA9IGV4dHJhIHx8IHt9O1xuXG4gICAgdmFyIGJhc2UgPSB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfVxuICAgICAgICBdLFxuICAgICAgICBkZmx0OiBbMCwgMV1cbiAgICB9O1xuXG4gICAgdmFyIG5hbWVQYXJ0ID0gb3B0cy5uYW1lID8gb3B0cy5uYW1lICsgJyAnIDogJyc7XG4gICAgdmFyIGNvbnRQYXJ0ID0gb3B0cy50cmFjZSA/ICd0cmFjZSAnIDogJ3N1YnBsb3QgJztcbiAgICB2YXIgZGVzY1BhcnQgPSBleHRyYS5kZXNjcmlwdGlvbiA/ICcgJyArIGV4dHJhLmRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICB4OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3Jpem9udGFsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICB5OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB2ZXJ0aWNhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGVcbiAgICB9O1xuXG4gICAgaWYoIW9wdHMubm9HcmlkQ2VsbCkge1xuICAgICAgICBvdXQucm93ID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgcm93IGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgICAgIG91dC5jb2x1bW4gPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyBjb2x1bW4gaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbnRhaW5lck91dCwgbGF5b3V0LCBjb2VyY2UsIGRmbHREb21haW5zKSB7XG4gICAgdmFyIGRmbHRYID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLngpIHx8IFswLCAxXTtcbiAgICB2YXIgZGZsdFkgPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueSkgfHwgWzAsIDFdO1xuXG4gICAgdmFyIGdyaWQgPSBsYXlvdXQuZ3JpZDtcbiAgICBpZihncmlkKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBjb2VyY2UoJ2RvbWFpbi5jb2x1bW4nKTtcbiAgICAgICAgaWYoY29sdW1uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGNvbHVtbiA8IGdyaWQuY29sdW1ucykgZGZsdFggPSBncmlkLl9kb21haW5zLnhbY29sdW1uXTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4uY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IGNvZXJjZSgnZG9tYWluLnJvdycpO1xuICAgICAgICBpZihyb3cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYocm93IDwgZ3JpZC5yb3dzKSBkZmx0WSA9IGdyaWQuX2RvbWFpbnMueVtyb3ddO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5yb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgnZG9tYWluLngnLCBkZmx0WCk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ2RvbWFpbi55JywgZGZsdFkpO1xuXG4gICAgLy8gZG9uJ3QgYWNjZXB0IGJhZCBpbnB1dCBkYXRhXG4gICAgaWYoISh4WzBdIDwgeFsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueCA9IGRmbHRYLnNsaWNlKCk7XG4gICAgaWYoISh5WzBdIDwgeVsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueSA9IGRmbHRZLnNsaWNlKCk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi9saWInKTtcbnZhciBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4vZG9tYWluJykuZGVmYXVsdHM7XG5cblxuLyoqXG4gKiBGaW5kIGFuZCBzdXBwbHkgZGVmYXVsdHMgdG8gYWxsIHN1YnBsb3RzIG9mIGEgZ2l2ZW4gdHlwZVxuICogVGhpcyBoYW5kbGVzIHN1YnBsb3RzIHRoYXQgYXJlIGNvbnRhaW5lZCB3aXRoaW4gb25lIGNvbnRhaW5lciAtIHNvXG4gKiBnbDNkLCBnZW8sIHRlcm5hcnkuLi4gYnV0IG5vdCAyZCBheGVzIHdoaWNoIGhhdmUgc2VwYXJhdGUgeCBhbmQgeSBheGVzXG4gKiBmaW5kcyBzdWJwbG90cywgY29lcmNlcyB0aGVpciBgZG9tYWluYCBhdHRyaWJ1dGVzLCB0aGVuIGNhbGxzIHRoZVxuICogZ2l2ZW4gaGFuZGxlRGVmYXVsdHMgZnVuY3Rpb24gdG8gZmlsbCBpbiBldmVyeXRoaW5nIGVsc2UuXG4gKlxuICogbGF5b3V0SW46IHRoZSBjb21wbGV0ZSB1c2VyLXN1cHBsaWVkIGlucHV0IGxheW91dFxuICogbGF5b3V0T3V0OiB0aGUgY29tcGxldGUgZmluaXNoZWQgbGF5b3V0XG4gKiBmdWxsRGF0YTogdGhlIGZpbmlzaGVkIGRhdGEgYXJyYXksIHVzZWQgb25seSB0byBmaW5kIHN1YnBsb3RzXG4gKiBvcHRzOiB7XG4gKiAgdHlwZTogc3VicGxvdCB0eXBlIHN0cmluZ1xuICogIGF0dHJpYnV0ZXM6IHN1YnBsb3QgYXR0cmlidXRlcyBvYmplY3RcbiAqICBwYXJ0aXRpb246ICd4JyBvciAneScsIHdoaWNoIGRpcmVjdGlvbiB0byBkaXZpZGUgZG9tYWluIHNwYWNlIGJ5IGRlZmF1bHRcbiAqICAgICAgKGRlZmF1bHQgJ3gnLCBpZSBzaWRlLWJ5LXNpZGUgc3VicGxvdHMpXG4gKiAgICAgIFRPRE86IHRoaXMgb3B0aW9uIGlzIG9ubHkgaGVyZSBiZWNhdXNlIDNEIGFuZCBnZW8gbWFkZSBvcHBvc2l0ZVxuICogICAgICBjaG9pY2VzIGluIHRoaXMgcmVnYXJkIHByZXZpb3VzbHkgYW5kIEkgZGlkbid0IHdhbnQgdG8gY2hhbmdlIGl0LlxuICogICAgICBJbnN0ZWFkIHdlIHNob3VsZCBkbzpcbiAqICAgICAgLSBzb21ldGhpbmcgY29uc2lzdGVudFxuICogICAgICAtIHNvbWV0aGluZyBtb3JlIHNxdWFyZSAoNCBjdXRzIDJ4MiwgNS82IGN1dHMgMngzLCBldGMuKVxuICogICAgICAtIHNvbWV0aGluZyB0aGF0IGluY2x1ZGVzIGFsbCBzdWJwbG90IHR5cGVzIGluIG9uZSBhcnJhbmdlbWVudCxcbiAqICAgICAgICBub3cgdGhhdCB3ZSBjYW4gaGF2ZSB0aGVtIHRvZ2V0aGVyIVxuICogIGhhbmRsZURlZmF1bHRzOiBmdW5jdGlvbiBvZiAoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBjb2VyY2UsIG9wdHMpXG4gKiAgICAgIHRoaXMgb3B0cyBvYmplY3QgaXMgcGFzc2VkIHRocm91Z2ggdG8gaGFuZGxlRGVmYXVsdHMsIHNvIGF0dGFjaCBhbnlcbiAqICAgICAgYWRkaXRpb25hbCBpdGVtcyBuZWVkZWQgYnkgdGhpcyBmdW5jdGlvbiBoZXJlIGFzIHdlbGxcbiAqIH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVTdWJwbG90RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEsIG9wdHMpIHtcbiAgICB2YXIgc3VicGxvdFR5cGUgPSBvcHRzLnR5cGU7XG4gICAgdmFyIHN1YnBsb3RBdHRyaWJ1dGVzID0gb3B0cy5hdHRyaWJ1dGVzO1xuICAgIHZhciBoYW5kbGVEZWZhdWx0cyA9IG9wdHMuaGFuZGxlRGVmYXVsdHM7XG4gICAgdmFyIHBhcnRpdGlvbiA9IG9wdHMucGFydGl0aW9uIHx8ICd4JztcblxuICAgIHZhciBpZHMgPSBsYXlvdXRPdXQuX3N1YnBsb3RzW3N1YnBsb3RUeXBlXTtcbiAgICB2YXIgaWRzTGVuZ3RoID0gaWRzLmxlbmd0aDtcblxuICAgIHZhciBiYXNlSWQgPSBpZHNMZW5ndGggJiYgaWRzWzBdLnJlcGxhY2UoL1xcZCskLywgJycpO1xuXG4gICAgdmFyIHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dDtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgc3VicGxvdEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpZHNMZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBpZHNbaV07XG5cbiAgICAgICAgLy8gdGVybmFyeSB0cmFjZXMgZ2V0IGEgbGF5b3V0IHRlcm5hcnkgZm9yIGZyZWUhXG4gICAgICAgIGlmKGxheW91dEluW2lkXSkgc3VicGxvdExheW91dEluID0gbGF5b3V0SW5baWRdO1xuICAgICAgICBlbHNlIHN1YnBsb3RMYXlvdXRJbiA9IGxheW91dEluW2lkXSA9IHt9O1xuXG4gICAgICAgIHN1YnBsb3RMYXlvdXRPdXQgPSBUZW1wbGF0ZS5uZXdDb250YWluZXIobGF5b3V0T3V0LCBpZCwgYmFzZUlkKTtcblxuICAgICAgICAvLyBBbGwgc3VicGxvdCBjb250YWluZXJzIGdldCBhIGB1aXJldmlzaW9uYCBpbmhlcml0aW5nIGZyb20gdGhlIGJhc2UuXG4gICAgICAgIC8vIEN1cnJlbnRseSBhbGwgc3VicGxvdHMgY29udGFpbmVycyBoYXZlIHNvbWUgdXNlciBpbnRlcmFjdGlvblxuICAgICAgICAvLyBhdHRyaWJ1dGVzLCBidXQgaWYgd2UgZXZlciBhZGQgb25lIHRoYXQgZG9lc24ndCwgd2Ugd291bGQgbmVlZCBhblxuICAgICAgICAvLyBvcHRpb24gdG8gc2tpcCB0aGlzIHN0ZXAuXG4gICAgICAgIGNvZXJjZSgndWlyZXZpc2lvbicsIGxheW91dE91dC51aXJldmlzaW9uKTtcblxuICAgICAgICB2YXIgZGZsdERvbWFpbnMgPSB7fTtcbiAgICAgICAgZGZsdERvbWFpbnNbcGFydGl0aW9uXSA9IFtpIC8gaWRzTGVuZ3RoLCAoaSArIDEpIC8gaWRzTGVuZ3RoXTtcbiAgICAgICAgaGFuZGxlRG9tYWluRGVmYXVsdHMoc3VicGxvdExheW91dE91dCwgbGF5b3V0T3V0LCBjb2VyY2UsIGRmbHREb21haW5zKTtcblxuICAgICAgICBvcHRzLmlkID0gaWQ7XG4gICAgICAgIGhhbmRsZURlZmF1bHRzKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgY29lcmNlLCBvcHRzKTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTElOS0VERklMTFMgPSB7dG9uZXh0eDogMSwgdG9uZXh0eTogMSwgdG9uZXh0OiAxfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaW5rVHJhY2VzKGdkLCBwbG90aW5mbywgY2RzY2F0dGVyKSB7XG4gICAgdmFyIHRyYWNlLCBpLCBncm91cCwgcHJldnRyYWNlLCBncm91cEluZGV4O1xuXG4gICAgLy8gZmlyc3Qgc29ydCB0cmFjZXMgdG8ga2VlcCBzdGFja3MgJiBmaWxsZWQtdG9nZXRoZXIgZ3JvdXBzIHRvZ2V0aGVyXG4gICAgdmFyIGdyb3VwSW5kaWNlcyA9IHt9O1xuICAgIHZhciBuZWVkc1NvcnQgPSBmYWxzZTtcbiAgICB2YXIgcHJldkdyb3VwSW5kZXggPSAtMTtcbiAgICB2YXIgbmV4dEdyb3VwSW5kZXggPSAwO1xuICAgIHZhciBwcmV2VW5zdGFja2VkR3JvdXBJbmRleCA9IC0xO1xuICAgIGZvcihpID0gMDsgaSA8IGNkc2NhdHRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICB0cmFjZSA9IGNkc2NhdHRlcltpXVswXS50cmFjZTtcbiAgICAgICAgZ3JvdXAgPSB0cmFjZS5zdGFja2dyb3VwIHx8ICcnO1xuICAgICAgICBpZihncm91cCkge1xuICAgICAgICAgICAgaWYoZ3JvdXAgaW4gZ3JvdXBJbmRpY2VzKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBJbmRleCA9IGdyb3VwSW5kaWNlc1tncm91cF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdyb3VwSW5kZXggPSBncm91cEluZGljZXNbZ3JvdXBdID0gbmV4dEdyb3VwSW5kZXg7XG4gICAgICAgICAgICAgICAgbmV4dEdyb3VwSW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKHRyYWNlLmZpbGwgaW4gTElOS0VERklMTFMgJiYgcHJldlVuc3RhY2tlZEdyb3VwSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgZ3JvdXBJbmRleCA9IHByZXZVbnN0YWNrZWRHcm91cEluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXBJbmRleCA9IHByZXZVbnN0YWNrZWRHcm91cEluZGV4ID0gbmV4dEdyb3VwSW5kZXg7XG4gICAgICAgICAgICBuZXh0R3JvdXBJbmRleCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZ3JvdXBJbmRleCA8IHByZXZHcm91cEluZGV4KSBuZWVkc1NvcnQgPSB0cnVlO1xuICAgICAgICB0cmFjZS5fZ3JvdXBJbmRleCA9IHByZXZHcm91cEluZGV4ID0gZ3JvdXBJbmRleDtcbiAgICB9XG5cbiAgICB2YXIgY2RzY2F0dGVyU29ydGVkID0gY2RzY2F0dGVyLnNsaWNlKCk7XG4gICAgaWYobmVlZHNTb3J0KSB7XG4gICAgICAgIGNkc2NhdHRlclNvcnRlZC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHZhciB0cmFjZUEgPSBhWzBdLnRyYWNlO1xuICAgICAgICAgICAgdmFyIHRyYWNlQiA9IGJbMF0udHJhY2U7XG4gICAgICAgICAgICByZXR1cm4gKHRyYWNlQS5fZ3JvdXBJbmRleCAtIHRyYWNlQi5fZ3JvdXBJbmRleCkgfHxcbiAgICAgICAgICAgICAgICAodHJhY2VBLmluZGV4IC0gdHJhY2VCLmluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbm93IGxpbmsgdHJhY2VzIHRvIGVhY2ggb3RoZXJcbiAgICB2YXIgcHJldnRyYWNlcyA9IHt9O1xuICAgIGZvcihpID0gMDsgaSA8IGNkc2NhdHRlclNvcnRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0cmFjZSA9IGNkc2NhdHRlclNvcnRlZFtpXVswXS50cmFjZTtcbiAgICAgICAgZ3JvdXAgPSB0cmFjZS5zdGFja2dyb3VwIHx8ICcnO1xuXG4gICAgICAgIC8vIE5vdGU6IFRoZSBjaGVjayB3aGljaCBlbnN1cmVzIGFsbCBjZHNjYXR0ZXIgaGVyZSBhcmUgZm9yIHRoZSBzYW1lIGF4aXMgYW5kXG4gICAgICAgIC8vIGFyZSBlaXRoZXIgY2FydGVzaWFuIG9yIHNjYXR0ZXJ0ZXJuYXJ5IGhhcyBiZWVuIHJlbW92ZWQuIFRoaXMgY29kZSBhc3N1bWVzXG4gICAgICAgIC8vIHRoZSBwYXNzZWQgc2NhdHRlcnRyYWNlcyBoYXZlIGJlZW4gZmlsdGVyZWQgdG8gdGhlIHByb3BlciBwbG90IHR5cGVzIGFuZFxuICAgICAgICAvLyB0aGUgcHJvcGVyIHN1YnBsb3RzLlxuICAgICAgICBpZih0cmFjZS52aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0cmFjZS5fbmV4dHRyYWNlID0gbnVsbDtcblxuICAgICAgICAgICAgaWYodHJhY2UuZmlsbCBpbiBMSU5LRURGSUxMUykge1xuICAgICAgICAgICAgICAgIHByZXZ0cmFjZSA9IHByZXZ0cmFjZXNbZ3JvdXBdO1xuICAgICAgICAgICAgICAgIHRyYWNlLl9wcmV2dHJhY2UgPSBwcmV2dHJhY2UgfHwgbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKHByZXZ0cmFjZSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2dHJhY2UuX25leHR0cmFjZSA9IHRyYWNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJhY2UuX293bmZpbGwgPSAodHJhY2UuZmlsbCAmJiAoXG4gICAgICAgICAgICAgICAgdHJhY2UuZmlsbC5zdWJzdHIoMCwgNikgPT09ICd0b3plcm8nIHx8XG4gICAgICAgICAgICAgICAgdHJhY2UuZmlsbCA9PT0gJ3Rvc2VsZicgfHxcbiAgICAgICAgICAgICAgICAodHJhY2UuZmlsbC5zdWJzdHIoMCwgMikgPT09ICd0bycgJiYgIXRyYWNlLl9wcmV2dHJhY2UpXG4gICAgICAgICAgICApKTtcblxuICAgICAgICAgICAgcHJldnRyYWNlc1tncm91cF0gPSB0cmFjZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYWNlLl9wcmV2dHJhY2UgPSB0cmFjZS5fbmV4dHRyYWNlID0gdHJhY2UuX293bmZpbGwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNkc2NhdHRlclNvcnRlZDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9