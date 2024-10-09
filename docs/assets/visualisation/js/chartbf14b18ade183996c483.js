(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_lib_geojson_utils_js-node_modules_plotly_js_src_plots_subplot_defa-fbf093"],{

/***/ "./node_modules/plotly.js/src/lib/geojson_utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/geojson_utils.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var BADNUM = __webpack_require__(/*! ../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

/**
 * Convert calcTrace to GeoJSON 'MultiLineString' coordinate arrays
 *
 * @param {object} calcTrace
 *  gd.calcdata item.
 *  Note that calcTrace[i].lonlat is assumed to be defined
 *
 * @return {array}
 *  return line coords array (or array of arrays)
 *
 */
exports.calcTraceToLineCoords = function(calcTrace) {
    var trace = calcTrace[0].trace;
    var connectgaps = trace.connectgaps;

    var coords = [];
    var lineString = [];

    for(var i = 0; i < calcTrace.length; i++) {
        var calcPt = calcTrace[i];
        var lonlat = calcPt.lonlat;

        if(lonlat[0] !== BADNUM) {
            lineString.push(lonlat);
        } else if(!connectgaps && lineString.length > 0) {
            coords.push(lineString);
            lineString = [];
        }
    }

    if(lineString.length > 0) {
        coords.push(lineString);
    }

    return coords;
};


/**
 * Make line ('LineString' or 'MultiLineString') GeoJSON
 *
 * @param {array} coords
 *  results form calcTraceToLineCoords
 * @return {object} out
 *  GeoJSON object
 *
 */
exports.makeLine = function(coords) {
    if(coords.length === 1) {
        return {
            type: 'LineString',
            coordinates: coords[0]
        };
    } else {
        return {
            type: 'MultiLineString',
            coordinates: coords
        };
    }
};

/**
 * Make polygon ('Polygon' or 'MultiPolygon') GeoJSON
 *
 * @param {array} coords
 *  results form calcTraceToLineCoords
 * @return {object} out
 *  GeoJSON object
 */
exports.makePolygon = function(coords) {
    if(coords.length === 1) {
        return {
            type: 'Polygon',
            coordinates: coords
        };
    } else {
        var _coords = new Array(coords.length);

        for(var i = 0; i < coords.length; i++) {
            _coords[i] = [coords[i]];
        }

        return {
            type: 'MultiPolygon',
            coordinates: _coords
        };
    }
};

/**
 * Make blank GeoJSON
 *
 * @return {object}
 *  Blank GeoJSON object
 *
 */
exports.makeBlank = function() {
    return {
        type: 'Point',
        coordinates: []
    };
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

/***/ "./node_modules/plotly.js/src/traces/scatter/style.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/style.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

function style(gd) {
    var s = d3.select(gd).selectAll('g.trace.scatter');

    s.style('opacity', function(d) {
        return d[0].trace.opacity;
    });

    s.selectAll('g.points').each(function(d) {
        var sel = d3.select(this);
        var trace = d.trace || d[0].trace;
        stylePoints(sel, trace, gd);
    });

    s.selectAll('g.text').each(function(d) {
        var sel = d3.select(this);
        var trace = d.trace || d[0].trace;
        styleText(sel, trace, gd);
    });

    s.selectAll('g.trace path.js-line')
        .call(Drawing.lineGroupStyle);

    s.selectAll('g.trace path.js-fill')
        .call(Drawing.fillGroupStyle);

    Registry.getComponentMethod('errorbars', 'style')(s);
}

function stylePoints(sel, trace, gd) {
    Drawing.pointStyle(sel.selectAll('path.point'), trace, gd);
}

function styleText(sel, trace, gd) {
    Drawing.textPointStyle(sel.selectAll('text'), trace, gd);
}

function styleOnSelect(gd, cd, sel) {
    var trace = cd[0].trace;

    if(trace.selectedpoints) {
        Drawing.selectedPointStyle(sel.selectAll('path.point'), trace);
        Drawing.selectedTextStyle(sel.selectAll('text'), trace);
    } else {
        stylePoints(sel, trace, gd);
        styleText(sel, trace, gd);
    }
}

module.exports = {
    style: style,
    stylePoints: stylePoints,
    styleText: styleText,
    styleOnSelect: styleOnSelect
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

/***/ "./node_modules/plotly.js/src/traces/scattergeo/calc.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/calc.js ***!
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




var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

var calcMarkerColorscale = __webpack_require__(/*! ../scatter/colorscale_calc */ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js");
var arraysToCalcdata = __webpack_require__(/*! ../scatter/arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");

var _ = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js")._;

function isNonBlankString(v) {
    return v && typeof v === 'string';
}

module.exports = function calc(gd, trace) {
    var hasLocationData = Array.isArray(trace.locations);
    var len = hasLocationData ? trace.locations.length : trace._length;
    var calcTrace = new Array(len);

    var isValidLoc;
    if(trace.geojson) {
        isValidLoc = function(v) { return isNonBlankString(v) || isNumeric(v); };
    } else {
        isValidLoc = isNonBlankString;
    }

    for(var i = 0; i < len; i++) {
        var calcPt = calcTrace[i] = {};

        if(hasLocationData) {
            var loc = trace.locations[i];
            calcPt.loc = isValidLoc(loc) ? loc : null;
        } else {
            var lon = trace.lon[i];
            var lat = trace.lat[i];

            if(isNumeric(lon) && isNumeric(lat)) calcPt.lonlat = [+lon, +lat];
            else calcPt.lonlat = [BADNUM, BADNUM];
        }
    }

    arraysToCalcdata(calcTrace, trace);
    calcMarkerColorscale(gd, trace);
    calcSelection(calcTrace, trace);

    if(len) {
        calcTrace[0].t = {
            labels: {
                lat: _(gd, 'lat:') + ' ',
                lon: _(gd, 'lon:') + ' '
            }
        };
    }

    return calcTrace;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvbGliL2dlb2pzb25fdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2RvbWFpbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvc3VicGxvdF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvZmlsbGNvbG9yX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9saW5lX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9zdHlsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvdGV4dF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJnZW8vY2FsYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsYUFBYSwrR0FBd0M7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsZ0JBQWdCLG1CQUFPLENBQUMsOERBQWdCO0FBQ3hDLGFBQWEsa0hBQTJDOztBQUV4RCwyQkFBMkIsbUJBQU8sQ0FBQyxrR0FBNEI7QUFDL0QsdUJBQXVCLG1CQUFPLENBQUMsd0dBQStCO0FBQzlELG9CQUFvQixtQkFBTyxDQUFDLGdHQUEyQjs7QUFFdkQsUUFBUSxtRkFBc0I7O0FBRTlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLDRDQUE0QztBQUM5RSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxrQkFBa0IsU0FBUztBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImNoYXJ0YmYxNGIxOGFkZTE4Mzk5NmM0ODMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbi8qKlxuICogQ29udmVydCBjYWxjVHJhY2UgdG8gR2VvSlNPTiAnTXVsdGlMaW5lU3RyaW5nJyBjb29yZGluYXRlIGFycmF5c1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjYWxjVHJhY2VcbiAqICBnZC5jYWxjZGF0YSBpdGVtLlxuICogIE5vdGUgdGhhdCBjYWxjVHJhY2VbaV0ubG9ubGF0IGlzIGFzc3VtZWQgdG8gYmUgZGVmaW5lZFxuICpcbiAqIEByZXR1cm4ge2FycmF5fVxuICogIHJldHVybiBsaW5lIGNvb3JkcyBhcnJheSAob3IgYXJyYXkgb2YgYXJyYXlzKVxuICpcbiAqL1xuZXhwb3J0cy5jYWxjVHJhY2VUb0xpbmVDb29yZHMgPSBmdW5jdGlvbihjYWxjVHJhY2UpIHtcbiAgICB2YXIgdHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG4gICAgdmFyIGNvbm5lY3RnYXBzID0gdHJhY2UuY29ubmVjdGdhcHM7XG5cbiAgICB2YXIgY29vcmRzID0gW107XG4gICAgdmFyIGxpbmVTdHJpbmcgPSBbXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYWxjVHJhY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNhbGNQdCA9IGNhbGNUcmFjZVtpXTtcbiAgICAgICAgdmFyIGxvbmxhdCA9IGNhbGNQdC5sb25sYXQ7XG5cbiAgICAgICAgaWYobG9ubGF0WzBdICE9PSBCQUROVU0pIHtcbiAgICAgICAgICAgIGxpbmVTdHJpbmcucHVzaChsb25sYXQpO1xuICAgICAgICB9IGVsc2UgaWYoIWNvbm5lY3RnYXBzICYmIGxpbmVTdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29vcmRzLnB1c2gobGluZVN0cmluZyk7XG4gICAgICAgICAgICBsaW5lU3RyaW5nID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihsaW5lU3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29vcmRzLnB1c2gobGluZVN0cmluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvb3Jkcztcbn07XG5cblxuLyoqXG4gKiBNYWtlIGxpbmUgKCdMaW5lU3RyaW5nJyBvciAnTXVsdGlMaW5lU3RyaW5nJykgR2VvSlNPTlxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGNvb3Jkc1xuICogIHJlc3VsdHMgZm9ybSBjYWxjVHJhY2VUb0xpbmVDb29yZHNcbiAqIEByZXR1cm4ge29iamVjdH0gb3V0XG4gKiAgR2VvSlNPTiBvYmplY3RcbiAqXG4gKi9cbmV4cG9ydHMubWFrZUxpbmUgPSBmdW5jdGlvbihjb29yZHMpIHtcbiAgICBpZihjb29yZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICAgICAgICBjb29yZGluYXRlczogY29vcmRzWzBdXG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdNdWx0aUxpbmVTdHJpbmcnLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3Jkc1xuICAgICAgICB9O1xuICAgIH1cbn07XG5cbi8qKlxuICogTWFrZSBwb2x5Z29uICgnUG9seWdvbicgb3IgJ011bHRpUG9seWdvbicpIEdlb0pTT05cbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBjb29yZHNcbiAqICByZXN1bHRzIGZvcm0gY2FsY1RyYWNlVG9MaW5lQ29vcmRzXG4gKiBAcmV0dXJuIHtvYmplY3R9IG91dFxuICogIEdlb0pTT04gb2JqZWN0XG4gKi9cbmV4cG9ydHMubWFrZVBvbHlnb24gPSBmdW5jdGlvbihjb29yZHMpIHtcbiAgICBpZihjb29yZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgICAgICBjb29yZGluYXRlczogY29vcmRzXG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF9jb29yZHMgPSBuZXcgQXJyYXkoY29vcmRzLmxlbmd0aCk7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX2Nvb3Jkc1tpXSA9IFtjb29yZHNbaV1dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdNdWx0aVBvbHlnb24nLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IF9jb29yZHNcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG4vKipcbiAqIE1ha2UgYmxhbmsgR2VvSlNPTlxuICpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqICBCbGFuayBHZW9KU09OIG9iamVjdFxuICpcbiAqL1xuZXhwb3J0cy5tYWtlQmxhbmsgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICBjb29yZGluYXRlczogW11cbiAgICB9O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxuLyoqXG4gKiBNYWtlIGEgeHkgZG9tYWluIGF0dHJpYnV0ZSBncm91cFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMubmFtZTogbmFtZSB0byBiZSBpbnNlcnRlZCBpbiB0aGUgZGVmYXVsdCBkZXNjcmlwdGlvblxuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy50cmFjZTogc2V0IHRvIHRydWUgZm9yIHRyYWNlIGNvbnRhaW5lcnNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5lZGl0VHlwZTogZWRpdFR5cGUgZm9yIGFsbCBwaWVjZXNcbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMubm9HcmlkQ2VsbDogc2V0IHRvIHRydWUgdG8gb21pdCBgcm93YCBhbmQgYGNvbHVtbmBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0cmFcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgZXh0cmEuZGVzY3JpcHRpb246IGV4dHJhIGRlc2NyaXB0aW9uLiBOLkIgd2UgdXNlXG4gKiAgICAgYSBzZXBhcmF0ZSBleHRyYSBjb250YWluZXIgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGhcbiAqICAgICB0aGUgY29tcHJlc3NfYXR0cmlidXRlcyB0cmFuc2Zvcm0uXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBhdHRyaWJ1dGVzIG9iamVjdCBjb250YWluaW5nIHt4LHl9IGFzIHNwZWNpZmllZFxuICovXG5leHBvcnRzLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbihvcHRzLCBleHRyYSkge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGV4dHJhID0gZXh0cmEgfHwge307XG5cbiAgICB2YXIgYmFzZSA9IHtcbiAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9LFxuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9XG4gICAgICAgIF0sXG4gICAgICAgIGRmbHQ6IFswLCAxXVxuICAgIH07XG5cbiAgICB2YXIgbmFtZVBhcnQgPSBvcHRzLm5hbWUgPyBvcHRzLm5hbWUgKyAnICcgOiAnJztcbiAgICB2YXIgY29udFBhcnQgPSBvcHRzLnRyYWNlID8gJ3RyYWNlICcgOiAnc3VicGxvdCAnO1xuICAgIHZhciBkZXNjUGFydCA9IGV4dHJhLmRlc2NyaXB0aW9uID8gJyAnICsgZXh0cmEuZGVzY3JpcHRpb24gOiAnJztcblxuICAgIHZhciBvdXQgPSB7XG4gICAgICAgIHg6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGhvcml6b250YWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIHk6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHZlcnRpY2FsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZVxuICAgIH07XG5cbiAgICBpZighb3B0cy5ub0dyaWRDZWxsKSB7XG4gICAgICAgIG91dC5yb3cgPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyByb3cgaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICAgICAgb3V0LmNvbHVtbiA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIGNvbHVtbiBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5leHBvcnRzLmRlZmF1bHRzID0gZnVuY3Rpb24oY29udGFpbmVyT3V0LCBsYXlvdXQsIGNvZXJjZSwgZGZsdERvbWFpbnMpIHtcbiAgICB2YXIgZGZsdFggPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueCkgfHwgWzAsIDFdO1xuICAgIHZhciBkZmx0WSA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy55KSB8fCBbMCwgMV07XG5cbiAgICB2YXIgZ3JpZCA9IGxheW91dC5ncmlkO1xuICAgIGlmKGdyaWQpIHtcbiAgICAgICAgdmFyIGNvbHVtbiA9IGNvZXJjZSgnZG9tYWluLmNvbHVtbicpO1xuICAgICAgICBpZihjb2x1bW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoY29sdW1uIDwgZ3JpZC5jb2x1bW5zKSBkZmx0WCA9IGdyaWQuX2RvbWFpbnMueFtjb2x1bW5dO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5jb2x1bW47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm93ID0gY29lcmNlKCdkb21haW4ucm93Jyk7XG4gICAgICAgIGlmKHJvdyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihyb3cgPCBncmlkLnJvd3MpIGRmbHRZID0gZ3JpZC5fZG9tYWlucy55W3Jvd107XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLnJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB4ID0gY29lcmNlKCdkb21haW4ueCcsIGRmbHRYKTtcbiAgICB2YXIgeSA9IGNvZXJjZSgnZG9tYWluLnknLCBkZmx0WSk7XG5cbiAgICAvLyBkb24ndCBhY2NlcHQgYmFkIGlucHV0IGRhdGFcbiAgICBpZighKHhbMF0gPCB4WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi54ID0gZGZsdFguc2xpY2UoKTtcbiAgICBpZighKHlbMF0gPCB5WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi55ID0gZGZsdFkuc2xpY2UoKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uL2xpYicpO1xudmFyIFRlbXBsYXRlID0gcmVxdWlyZSgnLi4vcGxvdF9hcGkvcGxvdF90ZW1wbGF0ZScpO1xudmFyIGhhbmRsZURvbWFpbkRlZmF1bHRzID0gcmVxdWlyZSgnLi9kb21haW4nKS5kZWZhdWx0cztcblxuXG4vKipcbiAqIEZpbmQgYW5kIHN1cHBseSBkZWZhdWx0cyB0byBhbGwgc3VicGxvdHMgb2YgYSBnaXZlbiB0eXBlXG4gKiBUaGlzIGhhbmRsZXMgc3VicGxvdHMgdGhhdCBhcmUgY29udGFpbmVkIHdpdGhpbiBvbmUgY29udGFpbmVyIC0gc29cbiAqIGdsM2QsIGdlbywgdGVybmFyeS4uLiBidXQgbm90IDJkIGF4ZXMgd2hpY2ggaGF2ZSBzZXBhcmF0ZSB4IGFuZCB5IGF4ZXNcbiAqIGZpbmRzIHN1YnBsb3RzLCBjb2VyY2VzIHRoZWlyIGBkb21haW5gIGF0dHJpYnV0ZXMsIHRoZW4gY2FsbHMgdGhlXG4gKiBnaXZlbiBoYW5kbGVEZWZhdWx0cyBmdW5jdGlvbiB0byBmaWxsIGluIGV2ZXJ5dGhpbmcgZWxzZS5cbiAqXG4gKiBsYXlvdXRJbjogdGhlIGNvbXBsZXRlIHVzZXItc3VwcGxpZWQgaW5wdXQgbGF5b3V0XG4gKiBsYXlvdXRPdXQ6IHRoZSBjb21wbGV0ZSBmaW5pc2hlZCBsYXlvdXRcbiAqIGZ1bGxEYXRhOiB0aGUgZmluaXNoZWQgZGF0YSBhcnJheSwgdXNlZCBvbmx5IHRvIGZpbmQgc3VicGxvdHNcbiAqIG9wdHM6IHtcbiAqICB0eXBlOiBzdWJwbG90IHR5cGUgc3RyaW5nXG4gKiAgYXR0cmlidXRlczogc3VicGxvdCBhdHRyaWJ1dGVzIG9iamVjdFxuICogIHBhcnRpdGlvbjogJ3gnIG9yICd5Jywgd2hpY2ggZGlyZWN0aW9uIHRvIGRpdmlkZSBkb21haW4gc3BhY2UgYnkgZGVmYXVsdFxuICogICAgICAoZGVmYXVsdCAneCcsIGllIHNpZGUtYnktc2lkZSBzdWJwbG90cylcbiAqICAgICAgVE9ETzogdGhpcyBvcHRpb24gaXMgb25seSBoZXJlIGJlY2F1c2UgM0QgYW5kIGdlbyBtYWRlIG9wcG9zaXRlXG4gKiAgICAgIGNob2ljZXMgaW4gdGhpcyByZWdhcmQgcHJldmlvdXNseSBhbmQgSSBkaWRuJ3Qgd2FudCB0byBjaGFuZ2UgaXQuXG4gKiAgICAgIEluc3RlYWQgd2Ugc2hvdWxkIGRvOlxuICogICAgICAtIHNvbWV0aGluZyBjb25zaXN0ZW50XG4gKiAgICAgIC0gc29tZXRoaW5nIG1vcmUgc3F1YXJlICg0IGN1dHMgMngyLCA1LzYgY3V0cyAyeDMsIGV0Yy4pXG4gKiAgICAgIC0gc29tZXRoaW5nIHRoYXQgaW5jbHVkZXMgYWxsIHN1YnBsb3QgdHlwZXMgaW4gb25lIGFycmFuZ2VtZW50LFxuICogICAgICAgIG5vdyB0aGF0IHdlIGNhbiBoYXZlIHRoZW0gdG9nZXRoZXIhXG4gKiAgaGFuZGxlRGVmYXVsdHM6IGZ1bmN0aW9uIG9mIChzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIGNvZXJjZSwgb3B0cylcbiAqICAgICAgdGhpcyBvcHRzIG9iamVjdCBpcyBwYXNzZWQgdGhyb3VnaCB0byBoYW5kbGVEZWZhdWx0cywgc28gYXR0YWNoIGFueVxuICogICAgICBhZGRpdGlvbmFsIGl0ZW1zIG5lZWRlZCBieSB0aGlzIGZ1bmN0aW9uIGhlcmUgYXMgd2VsbFxuICogfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVN1YnBsb3REZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSwgb3B0cykge1xuICAgIHZhciBzdWJwbG90VHlwZSA9IG9wdHMudHlwZTtcbiAgICB2YXIgc3VicGxvdEF0dHJpYnV0ZXMgPSBvcHRzLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGhhbmRsZURlZmF1bHRzID0gb3B0cy5oYW5kbGVEZWZhdWx0cztcbiAgICB2YXIgcGFydGl0aW9uID0gb3B0cy5wYXJ0aXRpb24gfHwgJ3gnO1xuXG4gICAgdmFyIGlkcyA9IGxheW91dE91dC5fc3VicGxvdHNbc3VicGxvdFR5cGVdO1xuICAgIHZhciBpZHNMZW5ndGggPSBpZHMubGVuZ3RoO1xuXG4gICAgdmFyIGJhc2VJZCA9IGlkc0xlbmd0aCAmJiBpZHNbMF0ucmVwbGFjZSgvXFxkKyQvLCAnJyk7XG5cbiAgICB2YXIgc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0O1xuXG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2Uoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBzdWJwbG90QXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGlkc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IGlkc1tpXTtcblxuICAgICAgICAvLyB0ZXJuYXJ5IHRyYWNlcyBnZXQgYSBsYXlvdXQgdGVybmFyeSBmb3IgZnJlZSFcbiAgICAgICAgaWYobGF5b3V0SW5baWRdKSBzdWJwbG90TGF5b3V0SW4gPSBsYXlvdXRJbltpZF07XG4gICAgICAgIGVsc2Ugc3VicGxvdExheW91dEluID0gbGF5b3V0SW5baWRdID0ge307XG5cbiAgICAgICAgc3VicGxvdExheW91dE91dCA9IFRlbXBsYXRlLm5ld0NvbnRhaW5lcihsYXlvdXRPdXQsIGlkLCBiYXNlSWQpO1xuXG4gICAgICAgIC8vIEFsbCBzdWJwbG90IGNvbnRhaW5lcnMgZ2V0IGEgYHVpcmV2aXNpb25gIGluaGVyaXRpbmcgZnJvbSB0aGUgYmFzZS5cbiAgICAgICAgLy8gQ3VycmVudGx5IGFsbCBzdWJwbG90cyBjb250YWluZXJzIGhhdmUgc29tZSB1c2VyIGludGVyYWN0aW9uXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMsIGJ1dCBpZiB3ZSBldmVyIGFkZCBvbmUgdGhhdCBkb2Vzbid0LCB3ZSB3b3VsZCBuZWVkIGFuXG4gICAgICAgIC8vIG9wdGlvbiB0byBza2lwIHRoaXMgc3RlcC5cbiAgICAgICAgY29lcmNlKCd1aXJldmlzaW9uJywgbGF5b3V0T3V0LnVpcmV2aXNpb24pO1xuXG4gICAgICAgIHZhciBkZmx0RG9tYWlucyA9IHt9O1xuICAgICAgICBkZmx0RG9tYWluc1twYXJ0aXRpb25dID0gW2kgLyBpZHNMZW5ndGgsIChpICsgMSkgLyBpZHNMZW5ndGhdO1xuICAgICAgICBoYW5kbGVEb21haW5EZWZhdWx0cyhzdWJwbG90TGF5b3V0T3V0LCBsYXlvdXRPdXQsIGNvZXJjZSwgZGZsdERvbWFpbnMpO1xuXG4gICAgICAgIG9wdHMuaWQgPSBpZDtcbiAgICAgICAgaGFuZGxlRGVmYXVsdHMoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBjb2VyY2UsIG9wdHMpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbGxDb2xvckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGNvZXJjZSkge1xuICAgIHZhciBpbmhlcml0Q29sb3JGcm9tTWFya2VyID0gZmFsc2U7XG5cbiAgICBpZih0cmFjZU91dC5tYXJrZXIpIHtcbiAgICAgICAgLy8gZG9uJ3QgdHJ5IHRvIGluaGVyaXQgYSBjb2xvciBhcnJheVxuICAgICAgICB2YXIgbWFya2VyQ29sb3IgPSB0cmFjZU91dC5tYXJrZXIuY29sb3I7XG4gICAgICAgIHZhciBtYXJrZXJMaW5lQ29sb3IgPSAodHJhY2VPdXQubWFya2VyLmxpbmUgfHwge30pLmNvbG9yO1xuXG4gICAgICAgIGlmKG1hcmtlckNvbG9yICYmICFpc0FycmF5T3JUeXBlZEFycmF5KG1hcmtlckNvbG9yKSkge1xuICAgICAgICAgICAgaW5oZXJpdENvbG9yRnJvbU1hcmtlciA9IG1hcmtlckNvbG9yO1xuICAgICAgICB9IGVsc2UgaWYobWFya2VyTGluZUNvbG9yICYmICFpc0FycmF5T3JUeXBlZEFycmF5KG1hcmtlckxpbmVDb2xvcikpIHtcbiAgICAgICAgICAgIGluaGVyaXRDb2xvckZyb21NYXJrZXIgPSBtYXJrZXJMaW5lQ29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2VyY2UoJ2ZpbGxjb2xvcicsIENvbG9yLmFkZE9wYWNpdHkoXG4gICAgICAgICh0cmFjZU91dC5saW5lIHx8IHt9KS5jb2xvciB8fFxuICAgICAgICBpbmhlcml0Q29sb3JGcm9tTWFya2VyIHx8XG4gICAgICAgIGRlZmF1bHRDb2xvciwgMC41XG4gICAgKSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheU9yVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmlzQXJyYXlPclR5cGVkQXJyYXk7XG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaW5lRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UsIG9wdHMpIHtcbiAgICB2YXIgbWFya2VyQ29sb3IgPSAodHJhY2VJbi5tYXJrZXIgfHwge30pLmNvbG9yO1xuXG4gICAgY29lcmNlKCdsaW5lLmNvbG9yJywgZGVmYXVsdENvbG9yKTtcblxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2VJbiwgJ2xpbmUnKSkge1xuICAgICAgICBjb2xvcnNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnbGluZS4nLCBjTGV0dGVyOiAnYyd9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbGluZUNvbG9yRGZsdCA9IChpc0FycmF5T3JUeXBlZEFycmF5KG1hcmtlckNvbG9yKSA/IGZhbHNlIDogbWFya2VyQ29sb3IpIHx8IGRlZmF1bHRDb2xvcjtcbiAgICAgICAgY29lcmNlKCdsaW5lLmNvbG9yJywgbGluZUNvbG9yRGZsdCk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdsaW5lLndpZHRoJyk7XG4gICAgaWYoIShvcHRzIHx8IHt9KS5ub0Rhc2gpIGNvZXJjZSgnbGluZS5kYXNoJyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxuZnVuY3Rpb24gc3R5bGUoZ2QpIHtcbiAgICB2YXIgcyA9IGQzLnNlbGVjdChnZCkuc2VsZWN0QWxsKCdnLnRyYWNlLnNjYXR0ZXInKTtcblxuICAgIHMuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkWzBdLnRyYWNlLm9wYWNpdHk7XG4gICAgfSk7XG5cbiAgICBzLnNlbGVjdEFsbCgnZy5wb2ludHMnKS5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIHRyYWNlID0gZC50cmFjZSB8fCBkWzBdLnRyYWNlO1xuICAgICAgICBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCk7XG4gICAgfSk7XG5cbiAgICBzLnNlbGVjdEFsbCgnZy50ZXh0JykuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciB0cmFjZSA9IGQudHJhY2UgfHwgZFswXS50cmFjZTtcbiAgICAgICAgc3R5bGVUZXh0KHNlbCwgdHJhY2UsIGdkKTtcbiAgICB9KTtcblxuICAgIHMuc2VsZWN0QWxsKCdnLnRyYWNlIHBhdGguanMtbGluZScpXG4gICAgICAgIC5jYWxsKERyYXdpbmcubGluZUdyb3VwU3R5bGUpO1xuXG4gICAgcy5zZWxlY3RBbGwoJ2cudHJhY2UgcGF0aC5qcy1maWxsJylcbiAgICAgICAgLmNhbGwoRHJhd2luZy5maWxsR3JvdXBTdHlsZSk7XG5cbiAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdzdHlsZScpKHMpO1xufVxuXG5mdW5jdGlvbiBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCkge1xuICAgIERyYXdpbmcucG9pbnRTdHlsZShzZWwuc2VsZWN0QWxsKCdwYXRoLnBvaW50JyksIHRyYWNlLCBnZCk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlVGV4dChzZWwsIHRyYWNlLCBnZCkge1xuICAgIERyYXdpbmcudGV4dFBvaW50U3R5bGUoc2VsLnNlbGVjdEFsbCgndGV4dCcpLCB0cmFjZSwgZ2QpO1xufVxuXG5mdW5jdGlvbiBzdHlsZU9uU2VsZWN0KGdkLCBjZCwgc2VsKSB7XG4gICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG5cbiAgICBpZih0cmFjZS5zZWxlY3RlZHBvaW50cykge1xuICAgICAgICBEcmF3aW5nLnNlbGVjdGVkUG9pbnRTdHlsZShzZWwuc2VsZWN0QWxsKCdwYXRoLnBvaW50JyksIHRyYWNlKTtcbiAgICAgICAgRHJhd2luZy5zZWxlY3RlZFRleHRTdHlsZShzZWwuc2VsZWN0QWxsKCd0ZXh0JyksIHRyYWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCk7XG4gICAgICAgIHN0eWxlVGV4dChzZWwsIHRyYWNlLCBnZCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHlsZTogc3R5bGUsXG4gICAgc3R5bGVQb2ludHM6IHN0eWxlUG9pbnRzLFxuICAgIHN0eWxlVGV4dDogc3R5bGVUZXh0LFxuICAgIHN0eWxlT25TZWxlY3Q6IHN0eWxlT25TZWxlY3Rcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG4vKlxuICogb3B0czogb2JqZWN0IG9mIGZsYWdzIHRvIGNvbnRyb2wgZmVhdHVyZXMgbm90IGFsbCB0ZXh0IHVzZXJzIHN1cHBvcnRcbiAqICAgbm9TZWxlY3Q6IGNhbGxlciBkb2VzIG5vdCBzdXBwb3J0IHNlbGVjdGVkL3Vuc2VsZWN0ZWQgYXR0cmlidXRlIGNvbnRhaW5lcnNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgIGNvZXJjZSgndGV4dHBvc2l0aW9uJyk7XG4gICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAndGV4dGZvbnQnLCBsYXlvdXQuZm9udCk7XG5cbiAgICBpZighb3B0cy5ub1NlbGVjdCkge1xuICAgICAgICBjb2VyY2UoJ3NlbGVjdGVkLnRleHRmb250LmNvbG9yJyk7XG4gICAgICAgIGNvZXJjZSgndW5zZWxlY3RlZC50ZXh0Zm9udC5jb2xvcicpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxudmFyIGNhbGNNYXJrZXJDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMnKTtcbnZhciBhcnJheXNUb0NhbGNkYXRhID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hcnJheXNfdG9fY2FsY2RhdGEnKTtcbnZhciBjYWxjU2VsZWN0aW9uID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jYWxjX3NlbGVjdGlvbicpO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLl87XG5cbmZ1bmN0aW9uIGlzTm9uQmxhbmtTdHJpbmcodikge1xuICAgIHJldHVybiB2ICYmIHR5cGVvZiB2ID09PSAnc3RyaW5nJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBoYXNMb2NhdGlvbkRhdGEgPSBBcnJheS5pc0FycmF5KHRyYWNlLmxvY2F0aW9ucyk7XG4gICAgdmFyIGxlbiA9IGhhc0xvY2F0aW9uRGF0YSA/IHRyYWNlLmxvY2F0aW9ucy5sZW5ndGggOiB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciBjYWxjVHJhY2UgPSBuZXcgQXJyYXkobGVuKTtcblxuICAgIHZhciBpc1ZhbGlkTG9jO1xuICAgIGlmKHRyYWNlLmdlb2pzb24pIHtcbiAgICAgICAgaXNWYWxpZExvYyA9IGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGlzTm9uQmxhbmtTdHJpbmcodikgfHwgaXNOdW1lcmljKHYpOyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlzVmFsaWRMb2MgPSBpc05vbkJsYW5rU3RyaW5nO1xuICAgIH1cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgY2FsY1B0ID0gY2FsY1RyYWNlW2ldID0ge307XG5cbiAgICAgICAgaWYoaGFzTG9jYXRpb25EYXRhKSB7XG4gICAgICAgICAgICB2YXIgbG9jID0gdHJhY2UubG9jYXRpb25zW2ldO1xuICAgICAgICAgICAgY2FsY1B0LmxvYyA9IGlzVmFsaWRMb2MobG9jKSA/IGxvYyA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbG9uID0gdHJhY2UubG9uW2ldO1xuICAgICAgICAgICAgdmFyIGxhdCA9IHRyYWNlLmxhdFtpXTtcblxuICAgICAgICAgICAgaWYoaXNOdW1lcmljKGxvbikgJiYgaXNOdW1lcmljKGxhdCkpIGNhbGNQdC5sb25sYXQgPSBbK2xvbiwgK2xhdF07XG4gICAgICAgICAgICBlbHNlIGNhbGNQdC5sb25sYXQgPSBbQkFETlVNLCBCQUROVU1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXJyYXlzVG9DYWxjZGF0YShjYWxjVHJhY2UsIHRyYWNlKTtcbiAgICBjYWxjTWFya2VyQ29sb3JzY2FsZShnZCwgdHJhY2UpO1xuICAgIGNhbGNTZWxlY3Rpb24oY2FsY1RyYWNlLCB0cmFjZSk7XG5cbiAgICBpZihsZW4pIHtcbiAgICAgICAgY2FsY1RyYWNlWzBdLnQgPSB7XG4gICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBsYXQ6IF8oZ2QsICdsYXQ6JykgKyAnICcsXG4gICAgICAgICAgICAgICAgbG9uOiBfKGdkLCAnbG9uOicpICsgJyAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbGNUcmFjZTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9