(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_gl-mat4_fromQuat_js-node_modules_plotly_js_src_plots_cartesian_type_defaults_js--9a2cc3"],{

/***/ "./node_modules/gl-mat4/fromQuat.js":
/*!******************************************!*\
  !*** ./node_modules/gl-mat4/fromQuat.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/type_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/type_defaults.js ***!
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



var traceIs = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js").traceIs;
var autoType = __webpack_require__(/*! ./axis_autotype */ "./node_modules/plotly.js/src/plots/cartesian/axis_autotype.js");

/*
 *  data: the plot data to use in choosing auto type
 *  name: axis object name (ie 'xaxis') if one should be stored
 */
module.exports = function handleTypeDefaults(containerIn, containerOut, coerce, options) {
    var axType = coerce('type', (options.splomStash || {}).type);

    if(axType === '-') {
        setAutoType(containerOut, options.data);

        if(containerOut.type === '-') {
            containerOut.type = 'linear';
        } else {
            // copy autoType back to input axis
            // note that if this object didn't exist
            // in the input layout, we have to put it in
            // this happens in the main supplyDefaults function
            containerIn.type = containerOut.type;
        }
    }
};

function setAutoType(ax, data) {
    // new logic: let people specify any type they want,
    // only autotype if type is '-'
    if(ax.type !== '-') return;

    var id = ax._id;
    var axLetter = id.charAt(0);
    var i;

    // support 3d
    if(id.indexOf('scene') !== -1) id = axLetter;

    var d0 = getFirstNonEmptyTrace(data, id, axLetter);
    if(!d0) return;

    // first check for histograms, as the count direction
    // should always default to a linear axis
    if(d0.type === 'histogram' &&
        axLetter === {v: 'y', h: 'x'}[d0.orientation || 'v']
    ) {
        ax.type = 'linear';
        return;
    }

    var calAttr = axLetter + 'calendar';
    var calendar = d0[calAttr];
    var opts = {noMultiCategory: !traceIs(d0, 'cartesian') || traceIs(d0, 'noMultiCategory')};

    // To not confuse 2D x/y used for per-box sample points for multicategory coordinates
    if(d0.type === 'box' && d0._hasPreCompStats &&
        axLetter === {h: 'x', v: 'y'}[d0.orientation || 'v']
    ) {
        opts.noMultiCategory = true;
    }

    // check all boxes on this x axis to see
    // if they're dates, numbers, or categories
    if(isBoxWithoutPositionCoords(d0, axLetter)) {
        var posLetter = getBoxPosLetter(d0);
        var boxPositions = [];

        for(i = 0; i < data.length; i++) {
            var trace = data[i];
            if(!traceIs(trace, 'box-violin') || (trace[axLetter + 'axis'] || axLetter) !== id) continue;

            if(trace[posLetter] !== undefined) boxPositions.push(trace[posLetter][0]);
            else if(trace.name !== undefined) boxPositions.push(trace.name);
            else boxPositions.push('text');

            if(trace[calAttr] !== calendar) calendar = undefined;
        }

        ax.type = autoType(boxPositions, calendar, opts);
    } else if(d0.type === 'splom') {
        var dimensions = d0.dimensions;
        var dim = dimensions[d0._axesDim[id]];
        if(dim.visible) ax.type = autoType(dim.values, calendar, opts);
    } else {
        ax.type = autoType(d0[axLetter] || [d0[axLetter + '0']], calendar, opts);
    }
}

function getFirstNonEmptyTrace(data, id, axLetter) {
    for(var i = 0; i < data.length; i++) {
        var trace = data[i];

        if(trace.type === 'splom' &&
                trace._length > 0 &&
                (trace['_' + axLetter + 'axes'] || {})[id]
        ) {
            return trace;
        }

        if((trace[axLetter + 'axis'] || axLetter) === id) {
            if(isBoxWithoutPositionCoords(trace, axLetter)) {
                return trace;
            } else if((trace[axLetter] || []).length || trace[axLetter + '0']) {
                return trace;
            }
        }
    }
}

function getBoxPosLetter(trace) {
    return {v: 'x', h: 'y'}[trace.orientation || 'v'];
}

function isBoxWithoutPositionCoords(trace, axLetter) {
    var posLetter = getBoxPosLetter(trace);
    var isBox = traceIs(trace, 'box-violin');
    var isCandlestick = traceIs(trace._fullInput || {}, 'candlestick');

    return (
        isBox &&
        !isCandlestick &&
        axLetter === posLetter &&
        trace[posLetter] === undefined &&
        trace[posLetter + '0'] === undefined
    );
}


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

/***/ "./node_modules/plotly.js/src/plots/gl3d/project.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/project.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




function xformMatrix(m, v) {
    var out = [0, 0, 0, 0];
    var i, j;

    for(i = 0; i < 4; ++i) {
        for(j = 0; j < 4; ++j) {
            out[j] += m[4 * i + j] * v[i];
        }
    }

    return out;
}

function project(camera, v) {
    var p = xformMatrix(camera.projection,
        xformMatrix(camera.view,
        xformMatrix(camera.model, [v[0], v[1], v[2], 1])));
    return p;
}

module.exports = project;


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


/***/ }),

/***/ "?a259":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvZnJvbVF1YXQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2NhcnRlc2lhbi90eXBlX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9kb21haW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2dsM2QvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvYXJyYXlzX3RvX2NhbGNkYXRhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL2xpbmVfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL21hcmtlcl9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvdGV4dF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlL2lnbm9yZWR8L2hvbWUvYWxleC9naXQvREl3ZWJzaXRlLXJlZGVzaWduL25vZGVfbW9kdWxlcy9iaWctcmF0L25vZGVfbW9kdWxlcy9ibi5qcy9saWJ8YnVmZmVyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFD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Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsc0ZBQXdCO0FBQzVDLG9CQUFvQiw2SUFBNEQ7QUFDaEYseUJBQXlCLG1CQUFPLENBQUMsNEdBQXNDOztBQUV2RSxlQUFlLG1CQUFPLENBQUMsMkVBQVk7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtEQUErRCxnQ0FBZ0M7QUFDL0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxtRUFBbUUscUNBQXFDO0FBQ3hHOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM0JBLGUiLCJmaWxlIjoiY2hhcnRlY2ZiYzE0MWI2NmUzZmRhOWZkNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZnJvbVF1YXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB5eCA9IHkgKiB4MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHp4ID0geiAqIHgyLFxuICAgICAgICB6eSA9IHogKiB5MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgIG91dFsyXSA9IHp4IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcblxuICAgIG91dFs0XSA9IHl4IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtIHh4IC0geno7XG4gICAgb3V0WzZdID0genkgKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuXG4gICAgb3V0WzhdID0genggKyB3eTtcbiAgICBvdXRbOV0gPSB6eSAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0geHggLSB5eTtcbiAgICBvdXRbMTFdID0gMDtcblxuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07IiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJhY2VJcyA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5JykudHJhY2VJcztcbnZhciBhdXRvVHlwZSA9IHJlcXVpcmUoJy4vYXhpc19hdXRvdHlwZScpO1xuXG4vKlxuICogIGRhdGE6IHRoZSBwbG90IGRhdGEgdG8gdXNlIGluIGNob29zaW5nIGF1dG8gdHlwZVxuICogIG5hbWU6IGF4aXMgb2JqZWN0IG5hbWUgKGllICd4YXhpcycpIGlmIG9uZSBzaG91bGQgYmUgc3RvcmVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlVHlwZURlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGNvZXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBheFR5cGUgPSBjb2VyY2UoJ3R5cGUnLCAob3B0aW9ucy5zcGxvbVN0YXNoIHx8IHt9KS50eXBlKTtcblxuICAgIGlmKGF4VHlwZSA9PT0gJy0nKSB7XG4gICAgICAgIHNldEF1dG9UeXBlKGNvbnRhaW5lck91dCwgb3B0aW9ucy5kYXRhKTtcblxuICAgICAgICBpZihjb250YWluZXJPdXQudHlwZSA9PT0gJy0nKSB7XG4gICAgICAgICAgICBjb250YWluZXJPdXQudHlwZSA9ICdsaW5lYXInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29weSBhdXRvVHlwZSBiYWNrIHRvIGlucHV0IGF4aXNcbiAgICAgICAgICAgIC8vIG5vdGUgdGhhdCBpZiB0aGlzIG9iamVjdCBkaWRuJ3QgZXhpc3RcbiAgICAgICAgICAgIC8vIGluIHRoZSBpbnB1dCBsYXlvdXQsIHdlIGhhdmUgdG8gcHV0IGl0IGluXG4gICAgICAgICAgICAvLyB0aGlzIGhhcHBlbnMgaW4gdGhlIG1haW4gc3VwcGx5RGVmYXVsdHMgZnVuY3Rpb25cbiAgICAgICAgICAgIGNvbnRhaW5lckluLnR5cGUgPSBjb250YWluZXJPdXQudHlwZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHNldEF1dG9UeXBlKGF4LCBkYXRhKSB7XG4gICAgLy8gbmV3IGxvZ2ljOiBsZXQgcGVvcGxlIHNwZWNpZnkgYW55IHR5cGUgdGhleSB3YW50LFxuICAgIC8vIG9ubHkgYXV0b3R5cGUgaWYgdHlwZSBpcyAnLSdcbiAgICBpZihheC50eXBlICE9PSAnLScpIHJldHVybjtcblxuICAgIHZhciBpZCA9IGF4Ll9pZDtcbiAgICB2YXIgYXhMZXR0ZXIgPSBpZC5jaGFyQXQoMCk7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBzdXBwb3J0IDNkXG4gICAgaWYoaWQuaW5kZXhPZignc2NlbmUnKSAhPT0gLTEpIGlkID0gYXhMZXR0ZXI7XG5cbiAgICB2YXIgZDAgPSBnZXRGaXJzdE5vbkVtcHR5VHJhY2UoZGF0YSwgaWQsIGF4TGV0dGVyKTtcbiAgICBpZighZDApIHJldHVybjtcblxuICAgIC8vIGZpcnN0IGNoZWNrIGZvciBoaXN0b2dyYW1zLCBhcyB0aGUgY291bnQgZGlyZWN0aW9uXG4gICAgLy8gc2hvdWxkIGFsd2F5cyBkZWZhdWx0IHRvIGEgbGluZWFyIGF4aXNcbiAgICBpZihkMC50eXBlID09PSAnaGlzdG9ncmFtJyAmJlxuICAgICAgICBheExldHRlciA9PT0ge3Y6ICd5JywgaDogJ3gnfVtkMC5vcmllbnRhdGlvbiB8fCAndiddXG4gICAgKSB7XG4gICAgICAgIGF4LnR5cGUgPSAnbGluZWFyJztcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjYWxBdHRyID0gYXhMZXR0ZXIgKyAnY2FsZW5kYXInO1xuICAgIHZhciBjYWxlbmRhciA9IGQwW2NhbEF0dHJdO1xuICAgIHZhciBvcHRzID0ge25vTXVsdGlDYXRlZ29yeTogIXRyYWNlSXMoZDAsICdjYXJ0ZXNpYW4nKSB8fCB0cmFjZUlzKGQwLCAnbm9NdWx0aUNhdGVnb3J5Jyl9O1xuXG4gICAgLy8gVG8gbm90IGNvbmZ1c2UgMkQgeC95IHVzZWQgZm9yIHBlci1ib3ggc2FtcGxlIHBvaW50cyBmb3IgbXVsdGljYXRlZ29yeSBjb29yZGluYXRlc1xuICAgIGlmKGQwLnR5cGUgPT09ICdib3gnICYmIGQwLl9oYXNQcmVDb21wU3RhdHMgJiZcbiAgICAgICAgYXhMZXR0ZXIgPT09IHtoOiAneCcsIHY6ICd5J31bZDAub3JpZW50YXRpb24gfHwgJ3YnXVxuICAgICkge1xuICAgICAgICBvcHRzLm5vTXVsdGlDYXRlZ29yeSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgYWxsIGJveGVzIG9uIHRoaXMgeCBheGlzIHRvIHNlZVxuICAgIC8vIGlmIHRoZXkncmUgZGF0ZXMsIG51bWJlcnMsIG9yIGNhdGVnb3JpZXNcbiAgICBpZihpc0JveFdpdGhvdXRQb3NpdGlvbkNvb3JkcyhkMCwgYXhMZXR0ZXIpKSB7XG4gICAgICAgIHZhciBwb3NMZXR0ZXIgPSBnZXRCb3hQb3NMZXR0ZXIoZDApO1xuICAgICAgICB2YXIgYm94UG9zaXRpb25zID0gW107XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRyYWNlID0gZGF0YVtpXTtcbiAgICAgICAgICAgIGlmKCF0cmFjZUlzKHRyYWNlLCAnYm94LXZpb2xpbicpIHx8ICh0cmFjZVtheExldHRlciArICdheGlzJ10gfHwgYXhMZXR0ZXIpICE9PSBpZCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlW3Bvc0xldHRlcl0gIT09IHVuZGVmaW5lZCkgYm94UG9zaXRpb25zLnB1c2godHJhY2VbcG9zTGV0dGVyXVswXSk7XG4gICAgICAgICAgICBlbHNlIGlmKHRyYWNlLm5hbWUgIT09IHVuZGVmaW5lZCkgYm94UG9zaXRpb25zLnB1c2godHJhY2UubmFtZSk7XG4gICAgICAgICAgICBlbHNlIGJveFBvc2l0aW9ucy5wdXNoKCd0ZXh0Jyk7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlW2NhbEF0dHJdICE9PSBjYWxlbmRhcikgY2FsZW5kYXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBheC50eXBlID0gYXV0b1R5cGUoYm94UG9zaXRpb25zLCBjYWxlbmRhciwgb3B0cyk7XG4gICAgfSBlbHNlIGlmKGQwLnR5cGUgPT09ICdzcGxvbScpIHtcbiAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBkMC5kaW1lbnNpb25zO1xuICAgICAgICB2YXIgZGltID0gZGltZW5zaW9uc1tkMC5fYXhlc0RpbVtpZF1dO1xuICAgICAgICBpZihkaW0udmlzaWJsZSkgYXgudHlwZSA9IGF1dG9UeXBlKGRpbS52YWx1ZXMsIGNhbGVuZGFyLCBvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBheC50eXBlID0gYXV0b1R5cGUoZDBbYXhMZXR0ZXJdIHx8IFtkMFtheExldHRlciArICcwJ11dLCBjYWxlbmRhciwgb3B0cyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRGaXJzdE5vbkVtcHR5VHJhY2UoZGF0YSwgaWQsIGF4TGV0dGVyKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZGF0YVtpXTtcblxuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnc3Bsb20nICYmXG4gICAgICAgICAgICAgICAgdHJhY2UuX2xlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAodHJhY2VbJ18nICsgYXhMZXR0ZXIgKyAnYXhlcyddIHx8IHt9KVtpZF1cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZigodHJhY2VbYXhMZXR0ZXIgKyAnYXhpcyddIHx8IGF4TGV0dGVyKSA9PT0gaWQpIHtcbiAgICAgICAgICAgIGlmKGlzQm94V2l0aG91dFBvc2l0aW9uQ29vcmRzKHRyYWNlLCBheExldHRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYoKHRyYWNlW2F4TGV0dGVyXSB8fCBbXSkubGVuZ3RoIHx8IHRyYWNlW2F4TGV0dGVyICsgJzAnXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0Qm94UG9zTGV0dGVyKHRyYWNlKSB7XG4gICAgcmV0dXJuIHt2OiAneCcsIGg6ICd5J31bdHJhY2Uub3JpZW50YXRpb24gfHwgJ3YnXTtcbn1cblxuZnVuY3Rpb24gaXNCb3hXaXRob3V0UG9zaXRpb25Db29yZHModHJhY2UsIGF4TGV0dGVyKSB7XG4gICAgdmFyIHBvc0xldHRlciA9IGdldEJveFBvc0xldHRlcih0cmFjZSk7XG4gICAgdmFyIGlzQm94ID0gdHJhY2VJcyh0cmFjZSwgJ2JveC12aW9saW4nKTtcbiAgICB2YXIgaXNDYW5kbGVzdGljayA9IHRyYWNlSXModHJhY2UuX2Z1bGxJbnB1dCB8fCB7fSwgJ2NhbmRsZXN0aWNrJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBpc0JveCAmJlxuICAgICAgICAhaXNDYW5kbGVzdGljayAmJlxuICAgICAgICBheExldHRlciA9PT0gcG9zTGV0dGVyICYmXG4gICAgICAgIHRyYWNlW3Bvc0xldHRlcl0gPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0cmFjZVtwb3NMZXR0ZXIgKyAnMCddID09PSB1bmRlZmluZWRcbiAgICApO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG4vKipcbiAqIE1ha2UgYSB4eSBkb21haW4gYXR0cmlidXRlIGdyb3VwXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5uYW1lOiBuYW1lIHRvIGJlIGluc2VydGVkIGluIHRoZSBkZWZhdWx0IGRlc2NyaXB0aW9uXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLnRyYWNlOiBzZXQgdG8gdHJ1ZSBmb3IgdHJhY2UgY29udGFpbmVyc1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLmVkaXRUeXBlOiBlZGl0VHlwZSBmb3IgYWxsIHBpZWNlc1xuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy5ub0dyaWRDZWxsOiBzZXQgdG8gdHJ1ZSB0byBvbWl0IGByb3dgIGFuZCBgY29sdW1uYFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRyYVxuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBleHRyYS5kZXNjcmlwdGlvbjogZXh0cmEgZGVzY3JpcHRpb24uIE4uQiB3ZSB1c2VcbiAqICAgICBhIHNlcGFyYXRlIGV4dHJhIGNvbnRhaW5lciB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aFxuICogICAgIHRoZSBjb21wcmVzc19hdHRyaWJ1dGVzIHRyYW5zZm9ybS5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IGF0dHJpYnV0ZXMgb2JqZWN0IGNvbnRhaW5pbmcge3gseX0gYXMgc3BlY2lmaWVkXG4gKi9cbmV4cG9ydHMuYXR0cmlidXRlcyA9IGZ1bmN0aW9uKG9wdHMsIGV4dHJhKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgZXh0cmEgPSBleHRyYSB8fCB7fTtcblxuICAgIHZhciBiYXNlID0ge1xuICAgICAgICB2YWxUeXBlOiAnaW5mb19hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX0sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX1cbiAgICAgICAgXSxcbiAgICAgICAgZGZsdDogWzAsIDFdXG4gICAgfTtcblxuICAgIHZhciBuYW1lUGFydCA9IG9wdHMubmFtZSA/IG9wdHMubmFtZSArICcgJyA6ICcnO1xuICAgIHZhciBjb250UGFydCA9IG9wdHMudHJhY2UgPyAndHJhY2UgJyA6ICdzdWJwbG90ICc7XG4gICAgdmFyIGRlc2NQYXJ0ID0gZXh0cmEuZGVzY3JpcHRpb24gPyAnICcgKyBleHRyYS5kZXNjcmlwdGlvbiA6ICcnO1xuXG4gICAgdmFyIG91dCA9IHtcbiAgICAgICAgeDogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgaG9yaXpvbnRhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgeTogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdmVydGljYWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlXG4gICAgfTtcblxuICAgIGlmKCFvcHRzLm5vR3JpZENlbGwpIHtcbiAgICAgICAgb3V0LnJvdyA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIHJvdyBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgICAgICBvdXQuY29sdW1uID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgY29sdW1uIGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBmdW5jdGlvbihjb250YWluZXJPdXQsIGxheW91dCwgY29lcmNlLCBkZmx0RG9tYWlucykge1xuICAgIHZhciBkZmx0WCA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy54KSB8fCBbMCwgMV07XG4gICAgdmFyIGRmbHRZID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLnkpIHx8IFswLCAxXTtcblxuICAgIHZhciBncmlkID0gbGF5b3V0LmdyaWQ7XG4gICAgaWYoZ3JpZCkge1xuICAgICAgICB2YXIgY29sdW1uID0gY29lcmNlKCdkb21haW4uY29sdW1uJyk7XG4gICAgICAgIGlmKGNvbHVtbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihjb2x1bW4gPCBncmlkLmNvbHVtbnMpIGRmbHRYID0gZ3JpZC5fZG9tYWlucy54W2NvbHVtbl07XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLmNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3cgPSBjb2VyY2UoJ2RvbWFpbi5yb3cnKTtcbiAgICAgICAgaWYocm93ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKHJvdyA8IGdyaWQucm93cykgZGZsdFkgPSBncmlkLl9kb21haW5zLnlbcm93XTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4ucm93O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHggPSBjb2VyY2UoJ2RvbWFpbi54JywgZGZsdFgpO1xuICAgIHZhciB5ID0gY29lcmNlKCdkb21haW4ueScsIGRmbHRZKTtcblxuICAgIC8vIGRvbid0IGFjY2VwdCBiYWQgaW5wdXQgZGF0YVxuICAgIGlmKCEoeFswXSA8IHhbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnggPSBkZmx0WC5zbGljZSgpO1xuICAgIGlmKCEoeVswXSA8IHlbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnkgPSBkZmx0WS5zbGljZSgpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB4Zm9ybU1hdHJpeChtLCB2KSB7XG4gICAgdmFyIG91dCA9IFswLCAwLCAwLCAwXTtcbiAgICB2YXIgaSwgajtcblxuICAgIGZvcihpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICBmb3IoaiA9IDA7IGogPCA0OyArK2opIHtcbiAgICAgICAgICAgIG91dFtqXSArPSBtWzQgKiBpICsgal0gKiB2W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gcHJvamVjdChjYW1lcmEsIHYpIHtcbiAgICB2YXIgcCA9IHhmb3JtTWF0cml4KGNhbWVyYS5wcm9qZWN0aW9uLFxuICAgICAgICB4Zm9ybU1hdHJpeChjYW1lcmEudmlldyxcbiAgICAgICAgeGZvcm1NYXRyaXgoY2FtZXJhLm1vZGVsLCBbdlswXSwgdlsxXSwgdlsyXSwgMV0pKSk7XG4gICAgcmV0dXJuIHA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdDtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cblxuLy8gYXJyYXlPayBhdHRyaWJ1dGVzLCBtZXJnZSB0aGVtIGludG8gY2FsY2RhdGEgYXJyYXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpIHtcbiAgICAvLyBzbyBlYWNoIHBvaW50IGtub3dzIHdoaWNoIGluZGV4IGl0IG9yaWdpbmFsbHkgY2FtZSBmcm9tXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNkLmxlbmd0aDsgaSsrKSBjZFtpXS5pID0gaTtcblxuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLnRleHQsIGNkLCAndHgnKTtcbiAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS50ZXh0dGVtcGxhdGUsIGNkLCAndHh0Jyk7XG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UuaG92ZXJ0ZXh0LCBjZCwgJ2h0eCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLmN1c3RvbWRhdGEsIGNkLCAnZGF0YScpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLnRleHRwb3NpdGlvbiwgY2QsICd0cCcpO1xuICAgIGlmKHRyYWNlLnRleHRmb250KSB7XG4gICAgICAgIExpYi5tZXJnZUFycmF5Q2FzdFBvc2l0aXZlKHRyYWNlLnRleHRmb250LnNpemUsIGNkLCAndHMnKTtcbiAgICAgICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dGZvbnQuY29sb3IsIGNkLCAndGMnKTtcbiAgICAgICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dGZvbnQuZmFtaWx5LCBjZCwgJ3RmJyk7XG4gICAgfVxuXG4gICAgdmFyIG1hcmtlciA9IHRyYWNlLm1hcmtlcjtcbiAgICBpZihtYXJrZXIpIHtcbiAgICAgICAgTGliLm1lcmdlQXJyYXlDYXN0UG9zaXRpdmUobWFya2VyLnNpemUsIGNkLCAnbXMnKTtcbiAgICAgICAgTGliLm1lcmdlQXJyYXlDYXN0UG9zaXRpdmUobWFya2VyLm9wYWNpdHksIGNkLCAnbW8nKTtcbiAgICAgICAgTGliLm1lcmdlQXJyYXkobWFya2VyLnN5bWJvbCwgY2QsICdteCcpO1xuICAgICAgICBMaWIubWVyZ2VBcnJheShtYXJrZXIuY29sb3IsIGNkLCAnbWMnKTtcblxuICAgICAgICB2YXIgbWFya2VyTGluZSA9IG1hcmtlci5saW5lO1xuICAgICAgICBpZihtYXJrZXIubGluZSkge1xuICAgICAgICAgICAgTGliLm1lcmdlQXJyYXkobWFya2VyTGluZS5jb2xvciwgY2QsICdtbGMnKTtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5Q2FzdFBvc2l0aXZlKG1hcmtlckxpbmUud2lkdGgsIGNkLCAnbWx3Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWFya2VyR3JhZGllbnQgPSBtYXJrZXIuZ3JhZGllbnQ7XG4gICAgICAgIGlmKG1hcmtlckdyYWRpZW50ICYmIG1hcmtlckdyYWRpZW50LnR5cGUgIT09ICdub25lJykge1xuICAgICAgICAgICAgTGliLm1lcmdlQXJyYXkobWFya2VyR3JhZGllbnQudHlwZSwgY2QsICdtZ3QnKTtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckdyYWRpZW50LmNvbG9yLCBjZCwgJ21nYycpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhhc0NvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvaGVscGVycycpLmhhc0NvbG9yc2NhbGU7XG52YXIgY2FsY0NvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvY2FsYycpO1xuXG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuL3N1YnR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsY01hcmtlckNvbG9yc2NhbGUoZ2QsIHRyYWNlKSB7XG4gICAgaWYoc3ViVHlwZXMuaGFzTGluZXModHJhY2UpICYmIGhhc0NvbG9yc2NhbGUodHJhY2UsICdsaW5lJykpIHtcbiAgICAgICAgY2FsY0NvbG9yc2NhbGUoZ2QsIHRyYWNlLCB7XG4gICAgICAgICAgICB2YWxzOiB0cmFjZS5saW5lLmNvbG9yLFxuICAgICAgICAgICAgY29udGFpbmVyU3RyOiAnbGluZScsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzTWFya2Vycyh0cmFjZSkpIHtcbiAgICAgICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ21hcmtlcicpKSB7XG4gICAgICAgICAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgICAgICB2YWxzOiB0cmFjZS5tYXJrZXIuY29sb3IsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3RyOiAnbWFya2VyJyxcbiAgICAgICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXIubGluZScpKSB7XG4gICAgICAgICAgICBjYWxjQ29sb3JzY2FsZShnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgICAgICB2YWxzOiB0cmFjZS5tYXJrZXIubGluZS5jb2xvcixcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHI6ICdtYXJrZXIubGluZScsXG4gICAgICAgICAgICAgICAgY0xldHRlcjogJ2MnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5T3JUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuaXNBcnJheU9yVHlwZWRBcnJheTtcbnZhciBoYXNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2hlbHBlcnMnKS5oYXNDb2xvcnNjYWxlO1xudmFyIGNvbG9yc2NhbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9kZWZhdWx0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpbmVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSwgb3B0cykge1xuICAgIHZhciBtYXJrZXJDb2xvciA9ICh0cmFjZUluLm1hcmtlciB8fCB7fSkuY29sb3I7XG5cbiAgICBjb2VyY2UoJ2xpbmUuY29sb3InLCBkZWZhdWx0Q29sb3IpO1xuXG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZUluLCAnbGluZScpKSB7XG4gICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdsaW5lLicsIGNMZXR0ZXI6ICdjJ30pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBsaW5lQ29sb3JEZmx0ID0gKGlzQXJyYXlPclR5cGVkQXJyYXkobWFya2VyQ29sb3IpID8gZmFsc2UgOiBtYXJrZXJDb2xvcikgfHwgZGVmYXVsdENvbG9yO1xuICAgICAgICBjb2VyY2UoJ2xpbmUuY29sb3InLCBsaW5lQ29sb3JEZmx0KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2xpbmUud2lkdGgnKTtcbiAgICBpZighKG9wdHMgfHwge30pLm5vRGFzaCkgY29lcmNlKCdsaW5lLmRhc2gnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBoYXNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2hlbHBlcnMnKS5oYXNDb2xvcnNjYWxlO1xudmFyIGNvbG9yc2NhbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9kZWZhdWx0cycpO1xuXG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuL3N1YnR5cGVzJyk7XG5cbi8qXG4gKiBvcHRzOiBvYmplY3Qgb2YgZmxhZ3MgdG8gY29udHJvbCBmZWF0dXJlcyBub3QgYWxsIG1hcmtlciB1c2VycyBzdXBwb3J0XG4gKiAgIG5vTGluZTogY2FsbGVyIGRvZXMgbm90IHN1cHBvcnQgbWFya2VyIGxpbmVzXG4gKiAgIGdyYWRpZW50OiBjYWxsZXIgc3VwcG9ydHMgZ3JhZGllbnRzXG4gKiAgIG5vU2VsZWN0OiBjYWxsZXIgZG9lcyBub3Qgc3VwcG9ydCBzZWxlY3RlZC91bnNlbGVjdGVkIGF0dHJpYnV0ZSBjb250YWluZXJzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWFya2VyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UsIG9wdHMpIHtcbiAgICB2YXIgaXNCdWJibGUgPSBzdWJUeXBlcy5pc0J1YmJsZSh0cmFjZUluKTtcbiAgICB2YXIgbGluZUNvbG9yID0gKHRyYWNlSW4ubGluZSB8fCB7fSkuY29sb3I7XG4gICAgdmFyIGRlZmF1bHRNTEM7XG5cbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgIC8vIG1hcmtlci5jb2xvciBpbmhlcml0IGZyb20gbGluZS5jb2xvciAoZXZlbiBpZiBsaW5lLmNvbG9yIGlzIGFuIGFycmF5KVxuICAgIGlmKGxpbmVDb2xvcikgZGVmYXVsdENvbG9yID0gbGluZUNvbG9yO1xuXG4gICAgY29lcmNlKCdtYXJrZXIuc3ltYm9sJyk7XG4gICAgY29lcmNlKCdtYXJrZXIub3BhY2l0eScsIGlzQnViYmxlID8gMC43IDogMSk7XG4gICAgY29lcmNlKCdtYXJrZXIuc2l6ZScpO1xuXG4gICAgY29lcmNlKCdtYXJrZXIuY29sb3InLCBkZWZhdWx0Q29sb3IpO1xuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2VJbiwgJ21hcmtlcicpKSB7XG4gICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdtYXJrZXIuJywgY0xldHRlcjogJ2MnfSk7XG4gICAgfVxuXG4gICAgaWYoIW9wdHMubm9TZWxlY3QpIHtcbiAgICAgICAgY29lcmNlKCdzZWxlY3RlZC5tYXJrZXIuY29sb3InKTtcbiAgICAgICAgY29lcmNlKCd1bnNlbGVjdGVkLm1hcmtlci5jb2xvcicpO1xuICAgICAgICBjb2VyY2UoJ3NlbGVjdGVkLm1hcmtlci5zaXplJyk7XG4gICAgICAgIGNvZXJjZSgndW5zZWxlY3RlZC5tYXJrZXIuc2l6ZScpO1xuICAgIH1cblxuICAgIGlmKCFvcHRzLm5vTGluZSkge1xuICAgICAgICAvLyBpZiB0aGVyZSdzIGEgbGluZSB3aXRoIGEgZGlmZmVyZW50IGNvbG9yIHRoYW4gdGhlIG1hcmtlciwgdXNlXG4gICAgICAgIC8vIHRoYXQgbGluZSBjb2xvciBhcyB0aGUgZGVmYXVsdCBtYXJrZXIgbGluZSBjb2xvclxuICAgICAgICAvLyAoZXhjZXB0IHdoZW4gaXQncyBhbiBhcnJheSlcbiAgICAgICAgLy8gbW9zdGx5IHRoaXMgaXMgZm9yIHRyYW5zcGFyZW50IG1hcmtlcnMgdG8gYmVoYXZlIG5pY2VseVxuICAgICAgICBpZihsaW5lQ29sb3IgJiYgIUFycmF5LmlzQXJyYXkobGluZUNvbG9yKSAmJiAodHJhY2VPdXQubWFya2VyLmNvbG9yICE9PSBsaW5lQ29sb3IpKSB7XG4gICAgICAgICAgICBkZWZhdWx0TUxDID0gbGluZUNvbG9yO1xuICAgICAgICB9IGVsc2UgaWYoaXNCdWJibGUpIGRlZmF1bHRNTEMgPSBDb2xvci5iYWNrZ3JvdW5kO1xuICAgICAgICBlbHNlIGRlZmF1bHRNTEMgPSBDb2xvci5kZWZhdWx0TGluZTtcblxuICAgICAgICBjb2VyY2UoJ21hcmtlci5saW5lLmNvbG9yJywgZGVmYXVsdE1MQyk7XG4gICAgICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2VJbiwgJ21hcmtlci5saW5lJykpIHtcbiAgICAgICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdtYXJrZXIubGluZS4nLCBjTGV0dGVyOiAnYyd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvZXJjZSgnbWFya2VyLmxpbmUud2lkdGgnLCBpc0J1YmJsZSA/IDEgOiAwKTtcbiAgICB9XG5cbiAgICBpZihpc0J1YmJsZSkge1xuICAgICAgICBjb2VyY2UoJ21hcmtlci5zaXplcmVmJyk7XG4gICAgICAgIGNvZXJjZSgnbWFya2VyLnNpemVtaW4nKTtcbiAgICAgICAgY29lcmNlKCdtYXJrZXIuc2l6ZW1vZGUnKTtcbiAgICB9XG5cbiAgICBpZihvcHRzLmdyYWRpZW50KSB7XG4gICAgICAgIHZhciBncmFkaWVudFR5cGUgPSBjb2VyY2UoJ21hcmtlci5ncmFkaWVudC50eXBlJyk7XG4gICAgICAgIGlmKGdyYWRpZW50VHlwZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBjb2VyY2UoJ21hcmtlci5ncmFkaWVudC5jb2xvcicpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbi8qXG4gKiBvcHRzOiBvYmplY3Qgb2YgZmxhZ3MgdG8gY29udHJvbCBmZWF0dXJlcyBub3QgYWxsIHRleHQgdXNlcnMgc3VwcG9ydFxuICogICBub1NlbGVjdDogY2FsbGVyIGRvZXMgbm90IHN1cHBvcnQgc2VsZWN0ZWQvdW5zZWxlY3RlZCBhdHRyaWJ1dGUgY29udGFpbmVyc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgb3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgY29lcmNlKCd0ZXh0cG9zaXRpb24nKTtcbiAgICBMaWIuY29lcmNlRm9udChjb2VyY2UsICd0ZXh0Zm9udCcsIGxheW91dC5mb250KTtcblxuICAgIGlmKCFvcHRzLm5vU2VsZWN0KSB7XG4gICAgICAgIGNvZXJjZSgnc2VsZWN0ZWQudGV4dGZvbnQuY29sb3InKTtcbiAgICAgICAgY29lcmNlKCd1bnNlbGVjdGVkLnRleHRmb250LmNvbG9yJyk7XG4gICAgfVxufTtcbiIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=