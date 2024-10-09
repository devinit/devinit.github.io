(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_plots_subplot_defaults_js-node_modules_plotly_js_src_traces_scatte-90d3da"],{

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

/***/ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");


// arrayOk attributes, merge them into calcdata array
module.exports = function arraysToCalcdata(cd, trace) {
    // so each point knows which index it originally came from
    for(var i = 0; i < cd.length; i++) cd[i].i = i;

    Lib.mergeArray(trace.text, cd, 'tx');
    Lib.mergeArray(trace.texttemplate, cd, 'txt');
    Lib.mergeArray(trace.hovertext, cd, 'htx');
    Lib.mergeArray(trace.customdata, cd, 'data');
    Lib.mergeArray(trace.textposition, cd, 'tp');
    if(trace.textfont) {
        Lib.mergeArrayCastPositive(trace.textfont.size, cd, 'ts');
        Lib.mergeArray(trace.textfont.color, cd, 'tc');
        Lib.mergeArray(trace.textfont.family, cd, 'tf');
    }

    var marker = trace.marker;
    if(marker) {
        Lib.mergeArrayCastPositive(marker.size, cd, 'ms');
        Lib.mergeArrayCastPositive(marker.opacity, cd, 'mo');
        Lib.mergeArray(marker.symbol, cd, 'mx');
        Lib.mergeArray(marker.color, cd, 'mc');

        var markerLine = marker.line;
        if(marker.line) {
            Lib.mergeArray(markerLine.color, cd, 'mlc');
            Lib.mergeArrayCastPositive(markerLine.width, cd, 'mlw');
        }

        var markerGradient = marker.gradient;
        if(markerGradient && markerGradient.type !== 'none') {
            Lib.mergeArray(markerGradient.type, cd, 'mgt');
            Lib.mergeArray(markerGradient.color, cd, 'mgc');
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/calc_selection.js ***!
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

module.exports = function calcSelection(cd, trace) {
    if(Lib.isArrayOrTypedArray(trace.selectedpoints)) {
        Lib.tagSelected(cd, trace);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var calcColorscale = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");

var subTypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");

module.exports = function calcMarkerColorscale(gd, trace) {
    if(subTypes.hasLines(trace) && hasColorscale(trace, 'line')) {
        calcColorscale(gd, trace, {
            vals: trace.line.color,
            containerStr: 'line',
            cLetter: 'c'
        });
    }

    if(subTypes.hasMarkers(trace)) {
        if(hasColorscale(trace, 'marker')) {
            calcColorscale(gd, trace, {
                vals: trace.marker.color,
                containerStr: 'marker',
                cLetter: 'c'
            });
        }
        if(hasColorscale(trace, 'marker.line')) {
            calcColorscale(gd, trace, {
                vals: trace.marker.line.color,
                containerStr: 'marker.line',
                cLetter: 'c'
            });
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js ***!
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




var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

module.exports = function fillColorDefaults(traceIn, traceOut, defaultColor, coerce) {
    var inheritColorFromMarker = false;

    if(traceOut.marker) {
        // don't try to inherit a color array
        var markerColor = traceOut.marker.color;
        var markerLineColor = (traceOut.marker.line || {}).color;

        if(markerColor && !isArrayOrTypedArray(markerColor)) {
            inheritColorFromMarker = markerColor;
        } else if(markerLineColor && !isArrayOrTypedArray(markerLineColor)) {
            inheritColorFromMarker = markerLineColor;
        }
    }

    coerce('fillcolor', Color.addOpacity(
        (traceOut.line || {}).color ||
        inheritColorFromMarker ||
        defaultColor, 0.5
    ));
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/get_trace_color.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/get_trace_color.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var subtypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");


module.exports = function getTraceColor(trace, di) {
    var lc, tc;

    // TODO: text modes

    if(trace.mode === 'lines') {
        lc = trace.line.color;
        return (lc && Color.opacity(lc)) ?
            lc : trace.fillcolor;
    } else if(trace.mode === 'none') {
        return trace.fill ? trace.fillcolor : '';
    } else {
        var mc = di.mcc || (trace.marker || {}).color;
        var mlc = di.mlcc || ((trace.marker || {}).line || {}).color;

        tc = (mc && Color.opacity(mc)) ? mc :
            (mlc && Color.opacity(mlc) &&
                (di.mlw || ((trace.marker || {}).line || {}).width)) ? mlc : '';

        if(tc) {
            // make sure the points aren't TOO transparent
            if(Color.opacity(tc) < 0.3) {
                return Color.addOpacity(tc, 0.3);
            } else return tc;
        } else {
            lc = (trace.line || {}).color;
            return (lc && Color.opacity(lc) &&
                subtypes.hasLines(trace) && trace.line.width) ?
                    lc : trace.fillcolor;
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/line_defaults.js ***!
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



var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");

module.exports = function lineDefaults(traceIn, traceOut, defaultColor, layout, coerce, opts) {
    var markerColor = (traceIn.marker || {}).color;

    coerce('line.color', defaultColor);

    if(hasColorscale(traceIn, 'line')) {
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'line.', cLetter: 'c'});
    } else {
        var lineColorDflt = (isArrayOrTypedArray(markerColor) ? false : markerColor) || defaultColor;
        coerce('line.color', lineColorDflt);
    }

    coerce('line.width');
    if(!(opts || {}).noDash) coerce('line.dash');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js ***!
  \**********************************************************************/
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
    container: 'marker',
    min: 'cmin',
    max: 'cmax'
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/marker_defaults.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");

var subTypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");

/*
 * opts: object of flags to control features not all marker users support
 *   noLine: caller does not support marker lines
 *   gradient: caller supports gradients
 *   noSelect: caller does not support selected/unselected attribute containers
 */
module.exports = function markerDefaults(traceIn, traceOut, defaultColor, layout, coerce, opts) {
    var isBubble = subTypes.isBubble(traceIn);
    var lineColor = (traceIn.line || {}).color;
    var defaultMLC;

    opts = opts || {};

    // marker.color inherit from line.color (even if line.color is an array)
    if(lineColor) defaultColor = lineColor;

    coerce('marker.symbol');
    coerce('marker.opacity', isBubble ? 0.7 : 1);
    coerce('marker.size');

    coerce('marker.color', defaultColor);
    if(hasColorscale(traceIn, 'marker')) {
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'marker.', cLetter: 'c'});
    }

    if(!opts.noSelect) {
        coerce('selected.marker.color');
        coerce('unselected.marker.color');
        coerce('selected.marker.size');
        coerce('unselected.marker.size');
    }

    if(!opts.noLine) {
        // if there's a line with a different color than the marker, use
        // that line color as the default marker line color
        // (except when it's an array)
        // mostly this is for transparent markers to behave nicely
        if(lineColor && !Array.isArray(lineColor) && (traceOut.marker.color !== lineColor)) {
            defaultMLC = lineColor;
        } else if(isBubble) defaultMLC = Color.background;
        else defaultMLC = Color.defaultLine;

        coerce('marker.line.color', defaultMLC);
        if(hasColorscale(traceIn, 'marker.line')) {
            colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'marker.line.', cLetter: 'c'});
        }

        coerce('marker.line.width', isBubble ? 1 : 0);
    }

    if(isBubble) {
        coerce('marker.sizeref');
        coerce('marker.sizemin');
        coerce('marker.sizemode');
    }

    if(opts.gradient) {
        var gradientType = coerce('marker.gradient.type');
        if(gradientType !== 'none') {
            coerce('marker.gradient.color');
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/text_defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

/*
 * opts: object of flags to control features not all text users support
 *   noSelect: caller does not support selected/unselected attribute containers
 */
module.exports = function(traceIn, traceOut, layout, coerce, opts) {
    opts = opts || {};

    coerce('textposition');
    Lib.coerceFont(coerce, 'textfont', layout.font);

    if(!opts.noSelect) {
        coerce('selected.textfont.color');
        coerce('unselected.textfont.color');
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZG9tYWluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9zdWJwbG90X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9hcnJheXNfdG9fY2FsY2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL2NhbGNfc2VsZWN0aW9uLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL2ZpbGxjb2xvcl9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvZ2V0X3RyYWNlX2NvbG9yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9saW5lX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9tYXJrZXJfY29sb3JiYXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL21hcmtlcl9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bs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bkI7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxvQkFBb0IsNklBQTREO0FBQ2hGLHlCQUF5QixtQkFBTyxDQUFDLDRHQUFzQzs7QUFFdkUsZUFBZSxtQkFBTyxDQUFDLDJFQUFZOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrREFBK0QsZ0NBQWdDO0FBQy9GOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsbUVBQW1FLHFDQUFxQztBQUN4Rzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0NzFkODU5YTg5ZTBlZTUyOTY4YjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbi8qKlxuICogTWFrZSBhIHh5IGRvbWFpbiBhdHRyaWJ1dGUgZ3JvdXBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLm5hbWU6IG5hbWUgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIGRlZmF1bHQgZGVzY3JpcHRpb25cbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMudHJhY2U6IHNldCB0byB0cnVlIGZvciB0cmFjZSBjb250YWluZXJzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMuZWRpdFR5cGU6IGVkaXRUeXBlIGZvciBhbGwgcGllY2VzXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLm5vR3JpZENlbGw6IHNldCB0byB0cnVlIHRvIG9taXQgYHJvd2AgYW5kIGBjb2x1bW5gXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIGV4dHJhLmRlc2NyaXB0aW9uOiBleHRyYSBkZXNjcmlwdGlvbi4gTi5CIHdlIHVzZVxuICogICAgIGEgc2VwYXJhdGUgZXh0cmEgY29udGFpbmVyIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoXG4gKiAgICAgdGhlIGNvbXByZXNzX2F0dHJpYnV0ZXMgdHJhbnNmb3JtLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYXR0cmlidXRlcyBvYmplY3QgY29udGFpbmluZyB7eCx5fSBhcyBzcGVjaWZpZWRcbiAqL1xuZXhwb3J0cy5hdHRyaWJ1dGVzID0gZnVuY3Rpb24ob3B0cywgZXh0cmEpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBleHRyYSA9IGV4dHJhIHx8IHt9O1xuXG4gICAgdmFyIGJhc2UgPSB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfVxuICAgICAgICBdLFxuICAgICAgICBkZmx0OiBbMCwgMV1cbiAgICB9O1xuXG4gICAgdmFyIG5hbWVQYXJ0ID0gb3B0cy5uYW1lID8gb3B0cy5uYW1lICsgJyAnIDogJyc7XG4gICAgdmFyIGNvbnRQYXJ0ID0gb3B0cy50cmFjZSA/ICd0cmFjZSAnIDogJ3N1YnBsb3QgJztcbiAgICB2YXIgZGVzY1BhcnQgPSBleHRyYS5kZXNjcmlwdGlvbiA/ICcgJyArIGV4dHJhLmRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICB4OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3Jpem9udGFsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICB5OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB2ZXJ0aWNhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGVcbiAgICB9O1xuXG4gICAgaWYoIW9wdHMubm9HcmlkQ2VsbCkge1xuICAgICAgICBvdXQucm93ID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgcm93IGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgICAgIG91dC5jb2x1bW4gPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyBjb2x1bW4gaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbnRhaW5lck91dCwgbGF5b3V0LCBjb2VyY2UsIGRmbHREb21haW5zKSB7XG4gICAgdmFyIGRmbHRYID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLngpIHx8IFswLCAxXTtcbiAgICB2YXIgZGZsdFkgPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueSkgfHwgWzAsIDFdO1xuXG4gICAgdmFyIGdyaWQgPSBsYXlvdXQuZ3JpZDtcbiAgICBpZihncmlkKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBjb2VyY2UoJ2RvbWFpbi5jb2x1bW4nKTtcbiAgICAgICAgaWYoY29sdW1uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGNvbHVtbiA8IGdyaWQuY29sdW1ucykgZGZsdFggPSBncmlkLl9kb21haW5zLnhbY29sdW1uXTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4uY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IGNvZXJjZSgnZG9tYWluLnJvdycpO1xuICAgICAgICBpZihyb3cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYocm93IDwgZ3JpZC5yb3dzKSBkZmx0WSA9IGdyaWQuX2RvbWFpbnMueVtyb3ddO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5yb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgnZG9tYWluLngnLCBkZmx0WCk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ2RvbWFpbi55JywgZGZsdFkpO1xuXG4gICAgLy8gZG9uJ3QgYWNjZXB0IGJhZCBpbnB1dCBkYXRhXG4gICAgaWYoISh4WzBdIDwgeFsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueCA9IGRmbHRYLnNsaWNlKCk7XG4gICAgaWYoISh5WzBdIDwgeVsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueSA9IGRmbHRZLnNsaWNlKCk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi9saWInKTtcbnZhciBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4vZG9tYWluJykuZGVmYXVsdHM7XG5cblxuLyoqXG4gKiBGaW5kIGFuZCBzdXBwbHkgZGVmYXVsdHMgdG8gYWxsIHN1YnBsb3RzIG9mIGEgZ2l2ZW4gdHlwZVxuICogVGhpcyBoYW5kbGVzIHN1YnBsb3RzIHRoYXQgYXJlIGNvbnRhaW5lZCB3aXRoaW4gb25lIGNvbnRhaW5lciAtIHNvXG4gKiBnbDNkLCBnZW8sIHRlcm5hcnkuLi4gYnV0IG5vdCAyZCBheGVzIHdoaWNoIGhhdmUgc2VwYXJhdGUgeCBhbmQgeSBheGVzXG4gKiBmaW5kcyBzdWJwbG90cywgY29lcmNlcyB0aGVpciBgZG9tYWluYCBhdHRyaWJ1dGVzLCB0aGVuIGNhbGxzIHRoZVxuICogZ2l2ZW4gaGFuZGxlRGVmYXVsdHMgZnVuY3Rpb24gdG8gZmlsbCBpbiBldmVyeXRoaW5nIGVsc2UuXG4gKlxuICogbGF5b3V0SW46IHRoZSBjb21wbGV0ZSB1c2VyLXN1cHBsaWVkIGlucHV0IGxheW91dFxuICogbGF5b3V0T3V0OiB0aGUgY29tcGxldGUgZmluaXNoZWQgbGF5b3V0XG4gKiBmdWxsRGF0YTogdGhlIGZpbmlzaGVkIGRhdGEgYXJyYXksIHVzZWQgb25seSB0byBmaW5kIHN1YnBsb3RzXG4gKiBvcHRzOiB7XG4gKiAgdHlwZTogc3VicGxvdCB0eXBlIHN0cmluZ1xuICogIGF0dHJpYnV0ZXM6IHN1YnBsb3QgYXR0cmlidXRlcyBvYmplY3RcbiAqICBwYXJ0aXRpb246ICd4JyBvciAneScsIHdoaWNoIGRpcmVjdGlvbiB0byBkaXZpZGUgZG9tYWluIHNwYWNlIGJ5IGRlZmF1bHRcbiAqICAgICAgKGRlZmF1bHQgJ3gnLCBpZSBzaWRlLWJ5LXNpZGUgc3VicGxvdHMpXG4gKiAgICAgIFRPRE86IHRoaXMgb3B0aW9uIGlzIG9ubHkgaGVyZSBiZWNhdXNlIDNEIGFuZCBnZW8gbWFkZSBvcHBvc2l0ZVxuICogICAgICBjaG9pY2VzIGluIHRoaXMgcmVnYXJkIHByZXZpb3VzbHkgYW5kIEkgZGlkbid0IHdhbnQgdG8gY2hhbmdlIGl0LlxuICogICAgICBJbnN0ZWFkIHdlIHNob3VsZCBkbzpcbiAqICAgICAgLSBzb21ldGhpbmcgY29uc2lzdGVudFxuICogICAgICAtIHNvbWV0aGluZyBtb3JlIHNxdWFyZSAoNCBjdXRzIDJ4MiwgNS82IGN1dHMgMngzLCBldGMuKVxuICogICAgICAtIHNvbWV0aGluZyB0aGF0IGluY2x1ZGVzIGFsbCBzdWJwbG90IHR5cGVzIGluIG9uZSBhcnJhbmdlbWVudCxcbiAqICAgICAgICBub3cgdGhhdCB3ZSBjYW4gaGF2ZSB0aGVtIHRvZ2V0aGVyIVxuICogIGhhbmRsZURlZmF1bHRzOiBmdW5jdGlvbiBvZiAoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBjb2VyY2UsIG9wdHMpXG4gKiAgICAgIHRoaXMgb3B0cyBvYmplY3QgaXMgcGFzc2VkIHRocm91Z2ggdG8gaGFuZGxlRGVmYXVsdHMsIHNvIGF0dGFjaCBhbnlcbiAqICAgICAgYWRkaXRpb25hbCBpdGVtcyBuZWVkZWQgYnkgdGhpcyBmdW5jdGlvbiBoZXJlIGFzIHdlbGxcbiAqIH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVTdWJwbG90RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEsIG9wdHMpIHtcbiAgICB2YXIgc3VicGxvdFR5cGUgPSBvcHRzLnR5cGU7XG4gICAgdmFyIHN1YnBsb3RBdHRyaWJ1dGVzID0gb3B0cy5hdHRyaWJ1dGVzO1xuICAgIHZhciBoYW5kbGVEZWZhdWx0cyA9IG9wdHMuaGFuZGxlRGVmYXVsdHM7XG4gICAgdmFyIHBhcnRpdGlvbiA9IG9wdHMucGFydGl0aW9uIHx8ICd4JztcblxuICAgIHZhciBpZHMgPSBsYXlvdXRPdXQuX3N1YnBsb3RzW3N1YnBsb3RUeXBlXTtcbiAgICB2YXIgaWRzTGVuZ3RoID0gaWRzLmxlbmd0aDtcblxuICAgIHZhciBiYXNlSWQgPSBpZHNMZW5ndGggJiYgaWRzWzBdLnJlcGxhY2UoL1xcZCskLywgJycpO1xuXG4gICAgdmFyIHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dDtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgc3VicGxvdEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpZHNMZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBpZHNbaV07XG5cbiAgICAgICAgLy8gdGVybmFyeSB0cmFjZXMgZ2V0IGEgbGF5b3V0IHRlcm5hcnkgZm9yIGZyZWUhXG4gICAgICAgIGlmKGxheW91dEluW2lkXSkgc3VicGxvdExheW91dEluID0gbGF5b3V0SW5baWRdO1xuICAgICAgICBlbHNlIHN1YnBsb3RMYXlvdXRJbiA9IGxheW91dEluW2lkXSA9IHt9O1xuXG4gICAgICAgIHN1YnBsb3RMYXlvdXRPdXQgPSBUZW1wbGF0ZS5uZXdDb250YWluZXIobGF5b3V0T3V0LCBpZCwgYmFzZUlkKTtcblxuICAgICAgICAvLyBBbGwgc3VicGxvdCBjb250YWluZXJzIGdldCBhIGB1aXJldmlzaW9uYCBpbmhlcml0aW5nIGZyb20gdGhlIGJhc2UuXG4gICAgICAgIC8vIEN1cnJlbnRseSBhbGwgc3VicGxvdHMgY29udGFpbmVycyBoYXZlIHNvbWUgdXNlciBpbnRlcmFjdGlvblxuICAgICAgICAvLyBhdHRyaWJ1dGVzLCBidXQgaWYgd2UgZXZlciBhZGQgb25lIHRoYXQgZG9lc24ndCwgd2Ugd291bGQgbmVlZCBhblxuICAgICAgICAvLyBvcHRpb24gdG8gc2tpcCB0aGlzIHN0ZXAuXG4gICAgICAgIGNvZXJjZSgndWlyZXZpc2lvbicsIGxheW91dE91dC51aXJldmlzaW9uKTtcblxuICAgICAgICB2YXIgZGZsdERvbWFpbnMgPSB7fTtcbiAgICAgICAgZGZsdERvbWFpbnNbcGFydGl0aW9uXSA9IFtpIC8gaWRzTGVuZ3RoLCAoaSArIDEpIC8gaWRzTGVuZ3RoXTtcbiAgICAgICAgaGFuZGxlRG9tYWluRGVmYXVsdHMoc3VicGxvdExheW91dE91dCwgbGF5b3V0T3V0LCBjb2VyY2UsIGRmbHREb21haW5zKTtcblxuICAgICAgICBvcHRzLmlkID0gaWQ7XG4gICAgICAgIGhhbmRsZURlZmF1bHRzKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgY29lcmNlLCBvcHRzKTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuXG4vLyBhcnJheU9rIGF0dHJpYnV0ZXMsIG1lcmdlIHRoZW0gaW50byBjYWxjZGF0YSBhcnJheVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheXNUb0NhbGNkYXRhKGNkLCB0cmFjZSkge1xuICAgIC8vIHNvIGVhY2ggcG9pbnQga25vd3Mgd2hpY2ggaW5kZXggaXQgb3JpZ2luYWxseSBjYW1lIGZyb21cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIGNkW2ldLmkgPSBpO1xuXG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dCwgY2QsICd0eCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLnRleHR0ZW1wbGF0ZSwgY2QsICd0eHQnKTtcbiAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS5ob3ZlcnRleHQsIGNkLCAnaHR4Jyk7XG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UuY3VzdG9tZGF0YSwgY2QsICdkYXRhJyk7XG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dHBvc2l0aW9uLCBjZCwgJ3RwJyk7XG4gICAgaWYodHJhY2UudGV4dGZvbnQpIHtcbiAgICAgICAgTGliLm1lcmdlQXJyYXlDYXN0UG9zaXRpdmUodHJhY2UudGV4dGZvbnQuc2l6ZSwgY2QsICd0cycpO1xuICAgICAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS50ZXh0Zm9udC5jb2xvciwgY2QsICd0YycpO1xuICAgICAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS50ZXh0Zm9udC5mYW1pbHksIGNkLCAndGYnKTtcbiAgICB9XG5cbiAgICB2YXIgbWFya2VyID0gdHJhY2UubWFya2VyO1xuICAgIGlmKG1hcmtlcikge1xuICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXIuc2l6ZSwgY2QsICdtcycpO1xuICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXIub3BhY2l0eSwgY2QsICdtbycpO1xuICAgICAgICBMaWIubWVyZ2VBcnJheShtYXJrZXIuc3ltYm9sLCBjZCwgJ214Jyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5jb2xvciwgY2QsICdtYycpO1xuXG4gICAgICAgIHZhciBtYXJrZXJMaW5lID0gbWFya2VyLmxpbmU7XG4gICAgICAgIGlmKG1hcmtlci5saW5lKSB7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheShtYXJrZXJMaW5lLmNvbG9yLCBjZCwgJ21sYycpO1xuICAgICAgICAgICAgTGliLm1lcmdlQXJyYXlDYXN0UG9zaXRpdmUobWFya2VyTGluZS53aWR0aCwgY2QsICdtbHcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXJrZXJHcmFkaWVudCA9IG1hcmtlci5ncmFkaWVudDtcbiAgICAgICAgaWYobWFya2VyR3JhZGllbnQgJiYgbWFya2VyR3JhZGllbnQudHlwZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheShtYXJrZXJHcmFkaWVudC50eXBlLCBjZCwgJ21ndCcpO1xuICAgICAgICAgICAgTGliLm1lcmdlQXJyYXkobWFya2VyR3JhZGllbnQuY29sb3IsIGNkLCAnbWdjJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsY1NlbGVjdGlvbihjZCwgdHJhY2UpIHtcbiAgICBpZihMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh0cmFjZS5zZWxlY3RlZHBvaW50cykpIHtcbiAgICAgICAgTGliLnRhZ1NlbGVjdGVkKGNkLCB0cmFjZSk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhhc0NvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvaGVscGVycycpLmhhc0NvbG9yc2NhbGU7XG52YXIgY2FsY0NvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvY2FsYycpO1xuXG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuL3N1YnR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsY01hcmtlckNvbG9yc2NhbGUoZ2QsIHRyYWNlKSB7XG4gICAgaWYoc3ViVHlwZXMuaGFzTGluZXModHJhY2UpICYmIGhhc0NvbG9yc2NhbGUodHJhY2UsICdsaW5lJykpIHtcbiAgICAgICAgY2FsY0NvbG9yc2NhbGUoZ2QsIHRyYWNlLCB7XG4gICAgICAgICAgICB2YWxzOiB0cmFjZS5saW5lLmNvbG9yLFxuICAgICAgICAgICAgY29udGFpbmVyU3RyOiAnbGluZScsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzTWFya2Vycyh0cmFjZSkpIHtcbiAgICAgICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ21hcmtlcicpKSB7XG4gICAgICAgICAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgICAgICB2YWxzOiB0cmFjZS5tYXJrZXIuY29sb3IsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3RyOiAnbWFya2VyJyxcbiAgICAgICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXIubGluZScpKSB7XG4gICAgICAgICAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgICAgICB2YWxzOiB0cmFjZS5tYXJrZXIubGluZS5jb2xvcixcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHI6ICdtYXJrZXIubGluZScsXG4gICAgICAgICAgICAgICAgY0xldHRlcjogJ2MnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbGxDb2xvckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGNvZXJjZSkge1xuICAgIHZhciBpbmhlcml0Q29sb3JGcm9tTWFya2VyID0gZmFsc2U7XG5cbiAgICBpZih0cmFjZU91dC5tYXJrZXIpIHtcbiAgICAgICAgLy8gZG9uJ3QgdHJ5IHRvIGluaGVyaXQgYSBjb2xvciBhcnJheVxuICAgICAgICB2YXIgbWFya2VyQ29sb3IgPSB0cmFjZU91dC5tYXJrZXIuY29sb3I7XG4gICAgICAgIHZhciBtYXJrZXJMaW5lQ29sb3IgPSAodHJhY2VPdXQubWFya2VyLmxpbmUgfHwge30pLmNvbG9yO1xuXG4gICAgICAgIGlmKG1hcmtlckNvbG9yICYmICFpc0FycmF5T3JUeXBlZEFycmF5KG1hcmtlckNvbG9yKSkge1xuICAgICAgICAgICAgaW5oZXJpdENvbG9yRnJvbU1hcmtlciA9IG1hcmtlckNvbG9yO1xuICAgICAgICB9IGVsc2UgaWYobWFya2VyTGluZUNvbG9yICYmICFpc0FycmF5T3JUeXBlZEFycmF5KG1hcmtlckxpbmVDb2xvcikpIHtcbiAgICAgICAgICAgIGluaGVyaXRDb2xvckZyb21NYXJrZXIgPSBtYXJrZXJMaW5lQ29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2VyY2UoJ2ZpbGxjb2xvcicsIENvbG9yLmFkZE9wYWNpdHkoXG4gICAgICAgICh0cmFjZU91dC5saW5lIHx8IHt9KS5jb2xvciB8fFxuICAgICAgICBpbmhlcml0Q29sb3JGcm9tTWFya2VyIHx8XG4gICAgICAgIGRlZmF1bHRDb2xvciwgMC41XG4gICAgKSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBzdWJ0eXBlcyA9IHJlcXVpcmUoJy4vc3VidHlwZXMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFRyYWNlQ29sb3IodHJhY2UsIGRpKSB7XG4gICAgdmFyIGxjLCB0YztcblxuICAgIC8vIFRPRE86IHRleHQgbW9kZXNcblxuICAgIGlmKHRyYWNlLm1vZGUgPT09ICdsaW5lcycpIHtcbiAgICAgICAgbGMgPSB0cmFjZS5saW5lLmNvbG9yO1xuICAgICAgICByZXR1cm4gKGxjICYmIENvbG9yLm9wYWNpdHkobGMpKSA/XG4gICAgICAgICAgICBsYyA6IHRyYWNlLmZpbGxjb2xvcjtcbiAgICB9IGVsc2UgaWYodHJhY2UubW9kZSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIHJldHVybiB0cmFjZS5maWxsID8gdHJhY2UuZmlsbGNvbG9yIDogJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1jID0gZGkubWNjIHx8ICh0cmFjZS5tYXJrZXIgfHwge30pLmNvbG9yO1xuICAgICAgICB2YXIgbWxjID0gZGkubWxjYyB8fCAoKHRyYWNlLm1hcmtlciB8fCB7fSkubGluZSB8fCB7fSkuY29sb3I7XG5cbiAgICAgICAgdGMgPSAobWMgJiYgQ29sb3Iub3BhY2l0eShtYykpID8gbWMgOlxuICAgICAgICAgICAgKG1sYyAmJiBDb2xvci5vcGFjaXR5KG1sYykgJiZcbiAgICAgICAgICAgICAgICAoZGkubWx3IHx8ICgodHJhY2UubWFya2VyIHx8IHt9KS5saW5lIHx8IHt9KS53aWR0aCkpID8gbWxjIDogJyc7XG5cbiAgICAgICAgaWYodGMpIHtcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgcG9pbnRzIGFyZW4ndCBUT08gdHJhbnNwYXJlbnRcbiAgICAgICAgICAgIGlmKENvbG9yLm9wYWNpdHkodGMpIDwgMC4zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbG9yLmFkZE9wYWNpdHkodGMsIDAuMyk7XG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIHRjO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGMgPSAodHJhY2UubGluZSB8fCB7fSkuY29sb3I7XG4gICAgICAgICAgICByZXR1cm4gKGxjICYmIENvbG9yLm9wYWNpdHkobGMpICYmXG4gICAgICAgICAgICAgICAgc3VidHlwZXMuaGFzTGluZXModHJhY2UpICYmIHRyYWNlLmxpbmUud2lkdGgpID9cbiAgICAgICAgICAgICAgICAgICAgbGMgOiB0cmFjZS5maWxsY29sb3I7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheU9yVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmlzQXJyYXlPclR5cGVkQXJyYXk7XG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaW5lRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UsIG9wdHMpIHtcbiAgICB2YXIgbWFya2VyQ29sb3IgPSAodHJhY2VJbi5tYXJrZXIgfHwge30pLmNvbG9yO1xuXG4gICAgY29lcmNlKCdsaW5lLmNvbG9yJywgZGVmYXVsdENvbG9yKTtcblxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2VJbiwgJ2xpbmUnKSkge1xuICAgICAgICBjb2xvcnNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnbGluZS4nLCBjTGV0dGVyOiAnYyd9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbGluZUNvbG9yRGZsdCA9IChpc0FycmF5T3JUeXBlZEFycmF5KG1hcmtlckNvbG9yKSA/IGZhbHNlIDogbWFya2VyQ29sb3IpIHx8IGRlZmF1bHRDb2xvcjtcbiAgICAgICAgY29lcmNlKCdsaW5lLmNvbG9yJywgbGluZUNvbG9yRGZsdCk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdsaW5lLndpZHRoJyk7XG4gICAgaWYoIShvcHRzIHx8IHt9KS5ub0Rhc2gpIGNvZXJjZSgnbGluZS5kYXNoJyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjogJ21hcmtlcicsXG4gICAgbWluOiAnY21pbicsXG4gICAgbWF4OiAnY21heCdcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBoYXNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2hlbHBlcnMnKS5oYXNDb2xvcnNjYWxlO1xudmFyIGNvbG9yc2NhbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9kZWZhdWx0cycpO1xuXG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuL3N1YnR5cGVzJyk7XG5cbi8qXG4gKiBvcHRzOiBvYmplY3Qgb2YgZmxhZ3MgdG8gY29udHJvbCBmZWF0dXJlcyBub3QgYWxsIG1hcmtlciB1c2VycyBzdXBwb3J0XG4gKiAgIG5vTGluZTogY2FsbGVyIGRvZXMgbm90IHN1cHBvcnQgbWFya2VyIGxpbmVzXG4gKiAgIGdyYWRpZW50OiBjYWxsZXIgc3VwcG9ydHMgZ3JhZGllbnRzXG4gKiAgIG5vU2VsZWN0OiBjYWxsZXIgZG9lcyBub3Qgc3VwcG9ydCBzZWxlY3RlZC91bnNlbGVjdGVkIGF0dHJpYnV0ZSBjb250YWluZXJzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWFya2VyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UsIG9wdHMpIHtcbiAgICB2YXIgaXNCdWJibGUgPSBzdWJUeXBlcy5pc0J1YmJsZSh0cmFjZUluKTtcbiAgICB2YXIgbGluZUNvbG9yID0gKHRyYWNlSW4ubGluZSB8fCB7fSkuY29sb3I7XG4gICAgdmFyIGRlZmF1bHRNTEM7XG5cbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgIC8vIG1hcmtlci5jb2xvciBpbmhlcml0IGZyb20gbGluZS5jb2xvciAoZXZlbiBpZiBsaW5lLmNvbG9yIGlzIGFuIGFycmF5KVxuICAgIGlmKGxpbmVDb2xvcikgZGVmYXVsdENvbG9yID0gbGluZUNvbG9yO1xuXG4gICAgY29lcmNlKCdtYXJrZXIuc3ltYm9sJyk7XG4gICAgY29lcmNlKCdtYXJrZXIub3BhY2l0eScsIGlzQnViYmxlID8gMC43IDogMSk7XG4gICAgY29lcmNlKCdtYXJrZXIuc2l6ZScpO1xuXG4gICAgY29lcmNlKCdtYXJrZXIuY29sb3InLCBkZWZhdWx0Q29sb3IpO1xuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2VJbiwgJ21hcmtlcicpKSB7XG4gICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdtYXJrZXIuJywgY0xldHRlcjogJ2MnfSk7XG4gICAgfVxuXG4gICAgaWYoIW9wdHMubm9TZWxlY3QpIHtcbiAgICAgICAgY29lcmNlKCdzZWxlY3RlZC5tYXJrZXIuY29sb3InKTtcbiAgICAgICAgY29lcmNlKCd1bnNlbGVjdGVkLm1hcmtlci5jb2xvcicpO1xuICAgICAgICBjb2VyY2UoJ3NlbGVjdGVkLm1hcmtlci5zaXplJyk7XG4gICAgICAgIGNvZXJjZSgndW5zZWxlY3RlZC5tYXJrZXIuc2l6ZScpO1xuICAgIH1cblxuICAgIGlmKCFvcHRzLm5vTGluZSkge1xuICAgICAgICAvLyBpZiB0aGVyZSdzIGEgbGluZSB3aXRoIGEgZGlmZmVyZW50IGNvbG9yIHRoYW4gdGhlIG1hcmtlciwgdXNlXG4gICAgICAgIC8vIHRoYXQgbGluZSBjb2xvciBhcyB0aGUgZGVmYXVsdCBtYXJrZXIgbGluZSBjb2xvclxuICAgICAgICAvLyAoZXhjZXB0IHdoZW4gaXQncyBhbiBhcnJheSlcbiAgICAgICAgLy8gbW9zdGx5IHRoaXMgaXMgZm9yIHRyYW5zcGFyZW50IG1hcmtlcnMgdG8gYmVoYXZlIG5pY2VseVxuICAgICAgICBpZihsaW5lQ29sb3IgJiYgIUFycmF5LmlzQXJyYXkobGluZUNvbG9yKSAmJiAodHJhY2VPdXQubWFya2VyLmNvbG9yICE9PSBsaW5lQ29sb3IpKSB7XG4gICAgICAgICAgICBkZWZhdWx0TUxDID0gbGluZUNvbG9yO1xuICAgICAgICB9IGVsc2UgaWYoaXNCdWJibGUpIGRlZmF1bHRNTEMgPSBDb2xvci5iYWNrZ3JvdW5kO1xuICAgICAgICBlbHNlIGRlZmF1bHRNTEMgPSBDb2xvci5kZWZhdWx0TGluZTtcblxuICAgICAgICBjb2VyY2UoJ21hcmtlci5saW5lLmNvbG9yJywgZGVmYXVsdE1MQyk7XG4gICAgICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2VJbiwgJ21hcmtlci5saW5lJykpIHtcbiAgICAgICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdtYXJrZXIubGluZS4nLCBjTGV0dGVyOiAnYyd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvZXJjZSgnbWFya2VyLmxpbmUud2lkdGgnLCBpc0J1YmJsZSA/IDEgOiAwKTtcbiAgICB9XG5cbiAgICBpZihpc0J1YmJsZSkge1xuICAgICAgICBjb2VyY2UoJ21hcmtlci5zaXplcmVmJyk7XG4gICAgICAgIGNvZXJjZSgnbWFya2VyLnNpemVtaW4nKTtcbiAgICAgICAgY29lcmNlKCdtYXJrZXIuc2l6ZW1vZGUnKTtcbiAgICB9XG5cbiAgICBpZihvcHRzLmdyYWRpZW50KSB7XG4gICAgICAgIHZhciBncmFkaWVudFR5cGUgPSBjb2VyY2UoJ21hcmtlci5ncmFkaWVudC50eXBlJyk7XG4gICAgICAgIGlmKGdyYWRpZW50VHlwZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBjb2VyY2UoJ21hcmtlci5ncmFkaWVudC5jb2xvcicpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbi8qXG4gKiBvcHRzOiBvYmplY3Qgb2YgZmxhZ3MgdG8gY29udHJvbCBmZWF0dXJlcyBub3QgYWxsIHRleHQgdXNlcnMgc3VwcG9ydFxuICogICBub1NlbGVjdDogY2FsbGVyIGRvZXMgbm90IHN1cHBvcnQgc2VsZWN0ZWQvdW5zZWxlY3RlZCBhdHRyaWJ1dGUgY29udGFpbmVyc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgb3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgY29lcmNlKCd0ZXh0cG9zaXRpb24nKTtcbiAgICBMaWIuY29lcmNlRm9udChjb2VyY2UsICd0ZXh0Zm9udCcsIGxheW91dC5mb250KTtcblxuICAgIGlmKCFvcHRzLm5vU2VsZWN0KSB7XG4gICAgICAgIGNvZXJjZSgnc2VsZWN0ZWQudGV4dGZvbnQuY29sb3InKTtcbiAgICAgICAgY29lcmNlKCd1bnNlbGVjdGVkLnRleHRmb250LmNvbG9yJyk7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=