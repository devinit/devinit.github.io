(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_plots_subplot_defaults_js-node_modules_plotly_js_src_traces_heatma-ff9f47"],{

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

/***/ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/colorbar.js ***!
  \***************************************************************/
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
    min: 'zmin',
    max: 'zmax'
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

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/attributes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/attributes.js ***!
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



var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;
var scatterGeoAttrs = __webpack_require__(/*! ../scattergeo/attributes */ "./node_modules/plotly.js/src/traces/scattergeo/attributes.js");
var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var mapboxAttrs = __webpack_require__(/*! ../../plots/mapbox/layout_attributes */ "./node_modules/plotly.js/src/plots/mapbox/layout_attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var lineAttrs = scatterGeoAttrs.line;
var markerAttrs = scatterGeoAttrs.marker;

module.exports = overrideAll({
    lon: scatterGeoAttrs.lon,
    lat: scatterGeoAttrs.lat,

    // locations
    // locationmode

    mode: extendFlat({}, scatterAttrs.mode, {
        dflt: 'markers',
        description: [
            'Determines the drawing mode for this scatter trace.',
            'If the provided `mode` includes *text* then the `text` elements',
            'appear at the coordinates. Otherwise, the `text` elements',
            'appear on hover.'
        ].join(' ')
    }),

    text: extendFlat({}, scatterAttrs.text, {
        description: [
            'Sets text elements associated with each (lon,lat) pair',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (lon,lat) coordinates.',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    }),
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: ['lat', 'lon', 'text']
    }),
    hovertext: extendFlat({}, scatterAttrs.hovertext, {
        description: [
            'Sets hover text elements associated with each (lon,lat) pair',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (lon,lat) coordinates.',
            'To be seen, trace `hoverinfo` must contain a *text* flag.'
        ].join(' ')
    }),

    line: {
        color: lineAttrs.color,
        width: lineAttrs.width

        // TODO
        // dash: dash
    },

    connectgaps: scatterAttrs.connectgaps,

    marker: extendFlat({
        symbol: {
            valType: 'string',
            dflt: 'circle',
            role: 'style',
            arrayOk: true,
            description: [
                'Sets the marker symbol.',
                'Full list: https://www.mapbox.com/maki-icons/',
                'Note that the array `marker.color` and `marker.size`',
                'are only available for *circle* symbols.'
            ].join(' ')
        },
        angle: {
            valType: 'number',
            dflt: 'auto',
            role: 'style',
            arrayOk: true,
            description: [
                'Sets the marker orientation from true North, in degrees clockwise.',
                'When using the *auto* default, no rotation would be applied',
                'in perspective views which is different from using a zero angle.'
            ].join(' ')
        },
        allowoverlap: {
            valType: 'boolean',
            dflt: false,
            role: 'style',
            description: [
                'Flag to draw all symbols, even if they overlap.'
            ].join(' ')
        },
        opacity: markerAttrs.opacity,
        size: markerAttrs.size,
        sizeref: markerAttrs.sizeref,
        sizemin: markerAttrs.sizemin,
        sizemode: markerAttrs.sizemode
    },
        colorScaleAttrs('marker')
        // line
    ),

    fill: scatterGeoAttrs.fill,
    fillcolor: scatterAttrs.fillcolor,

    textfont: mapboxAttrs.layers.symbol.textfont,
    textposition: mapboxAttrs.layers.symbol.textposition,

    below: {
        valType: 'string',
        role: 'info',
        description: [
            'Determines if this scattermapbox trace\'s layers are to be inserted',
            'before the layer with the specified ID.',
            'By default, scattermapbox layers are inserted',
            'above all the base layers.',
            'To place the scattermapbox layers above every other layer, set `below` to *\'\'*.'
        ].join(' ')
    },

    selected: {
        marker: scatterAttrs.selected.marker
    },
    unselected: {
        marker: scatterAttrs.unselected.marker
    },

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['lon', 'lat', 'text', 'name']
    }),
    hovertemplate: hovertemplateAttrs(),
}, 'calc', 'nested');


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/format_labels.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/format_labels.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

module.exports = function formatLabels(cdi, trace, fullLayout) {
    var labels = {};

    var subplot = fullLayout[trace.subplot]._subplot;
    var ax = subplot.mockAxis;

    var lonlat = cdi.lonlat;
    labels.lonLabel = Axes.tickText(ax, ax.c2l(lonlat[0]), true).text;
    labels.latLabel = Axes.tickText(ax, ax.c2l(lonlat[1]), true).text;

    return labels;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/hover.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/hover.js ***!
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




var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var getTraceColor = __webpack_require__(/*! ../scatter/get_trace_color */ "./node_modules/plotly.js/src/traces/scatter/get_trace_color.js");
var fillText = Lib.fillText;
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function hoverPoints(pointData, xval, yval) {
    var cd = pointData.cd;
    var trace = cd[0].trace;
    var xa = pointData.xa;
    var ya = pointData.ya;
    var subplot = pointData.subplot;

    // compute winding number about [-180, 180] globe
    var winding = (xval >= 0) ?
        Math.floor((xval + 180) / 360) :
        Math.ceil((xval - 180) / 360);

    // shift longitude to [-180, 180] to determine closest point
    var lonShift = winding * 360;
    var xval2 = xval - lonShift;

    function distFn(d) {
        var lonlat = d.lonlat;
        if(lonlat[0] === BADNUM) return Infinity;

        var lon = Lib.modHalf(lonlat[0], 360);
        var lat = lonlat[1];
        var pt = subplot.project([lon, lat]);
        var dx = pt.x - xa.c2p([xval2, lat]);
        var dy = pt.y - ya.c2p([lon, yval]);
        var rad = Math.max(3, d.mrc || 0);

        return Math.max(Math.sqrt(dx * dx + dy * dy) - rad, 1 - 3 / rad);
    }

    Fx.getClosest(cd, distFn, pointData);

    // skip the rest (for this trace) if we didn't find a close point
    if(pointData.index === false) return;

    var di = cd[pointData.index];
    var lonlat = di.lonlat;
    var lonlatShifted = [Lib.modHalf(lonlat[0], 360) + lonShift, lonlat[1]];

    // shift labels back to original winded globe
    var xc = xa.c2p(lonlatShifted);
    var yc = ya.c2p(lonlatShifted);
    var rad = di.mrc || 1;

    pointData.x0 = xc - rad;
    pointData.x1 = xc + rad;
    pointData.y0 = yc - rad;
    pointData.y1 = yc + rad;

    var fullLayout = {};
    fullLayout[trace.subplot] = {_subplot: subplot};
    var labels = trace._module.formatLabels(di, trace, fullLayout);
    pointData.lonLabel = labels.lonLabel;
    pointData.latLabel = labels.latLabel;

    pointData.color = getTraceColor(trace, di);
    pointData.extraText = getExtraText(trace, di, cd[0].t.labels);
    pointData.hovertemplate = trace.hovertemplate;

    return [pointData];
};

function getExtraText(trace, di, labels) {
    if(trace.hovertemplate) return;

    var hoverinfo = di.hi || trace.hoverinfo;
    var parts = hoverinfo.split('+');
    var isAll = parts.indexOf('all') !== -1;
    var hasLon = parts.indexOf('lon') !== -1;
    var hasLat = parts.indexOf('lat') !== -1;
    var lonlat = di.lonlat;
    var text = [];

    // TODO should we use a mock axis to format hover?
    // If so, we'll need to make precision be zoom-level dependent
    function format(v) {
        return v + '\u00B0';
    }

    if(isAll || (hasLon && hasLat)) {
        text.push('(' + format(lonlat[0]) + ', ' + format(lonlat[1]) + ')');
    } else if(hasLon) {
        text.push(labels.lon + format(lonlat[0]));
    } else if(hasLat) {
        text.push(labels.lat + format(lonlat[1]));
    }

    if(isAll || parts.indexOf('text') !== -1) {
        fillText(di, trace, text);
    }

    return text.join('<br>');
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZG9tYWluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9zdWJwbG90X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9jb2xvcmJhci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvZ2V0X3RyYWNlX2NvbG9yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcm1hcGJveC9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcm1hcGJveC9mb3JtYXRfbGFiZWxzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcm1hcGJveC9ob3Zlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixpQkFBaUIsaUdBQW1DOztBQUVwRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPLCtCQUErQixJQUFJO0FBQ3REO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtB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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydGI3YzM0ZGU0MTc3OTUzZWEwNDg1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG4vKipcbiAqIE1ha2UgYSB4eSBkb21haW4gYXR0cmlidXRlIGdyb3VwXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5uYW1lOiBuYW1lIHRvIGJlIGluc2VydGVkIGluIHRoZSBkZWZhdWx0IGRlc2NyaXB0aW9uXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLnRyYWNlOiBzZXQgdG8gdHJ1ZSBmb3IgdHJhY2UgY29udGFpbmVyc1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLmVkaXRUeXBlOiBlZGl0VHlwZSBmb3IgYWxsIHBpZWNlc1xuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy5ub0dyaWRDZWxsOiBzZXQgdG8gdHJ1ZSB0byBvbWl0IGByb3dgIGFuZCBgY29sdW1uYFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRyYVxuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBleHRyYS5kZXNjcmlwdGlvbjogZXh0cmEgZGVzY3JpcHRpb24uIE4uQiB3ZSB1c2VcbiAqICAgICBhIHNlcGFyYXRlIGV4dHJhIGNvbnRhaW5lciB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aFxuICogICAgIHRoZSBjb21wcmVzc19hdHRyaWJ1dGVzIHRyYW5zZm9ybS5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IGF0dHJpYnV0ZXMgb2JqZWN0IGNvbnRhaW5pbmcge3gseX0gYXMgc3BlY2lmaWVkXG4gKi9cbmV4cG9ydHMuYXR0cmlidXRlcyA9IGZ1bmN0aW9uKG9wdHMsIGV4dHJhKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgZXh0cmEgPSBleHRyYSB8fCB7fTtcblxuICAgIHZhciBiYXNlID0ge1xuICAgICAgICB2YWxUeXBlOiAnaW5mb19hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX0sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX1cbiAgICAgICAgXSxcbiAgICAgICAgZGZsdDogWzAsIDFdXG4gICAgfTtcblxuICAgIHZhciBuYW1lUGFydCA9IG9wdHMubmFtZSA/IG9wdHMubmFtZSArICcgJyA6ICcnO1xuICAgIHZhciBjb250UGFydCA9IG9wdHMudHJhY2UgPyAndHJhY2UgJyA6ICdzdWJwbG90ICc7XG4gICAgdmFyIGRlc2NQYXJ0ID0gZXh0cmEuZGVzY3JpcHRpb24gPyAnICcgKyBleHRyYS5kZXNjcmlwdGlvbiA6ICcnO1xuXG4gICAgdmFyIG91dCA9IHtcbiAgICAgICAgeDogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgaG9yaXpvbnRhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgeTogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdmVydGljYWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlXG4gICAgfTtcblxuICAgIGlmKCFvcHRzLm5vR3JpZENlbGwpIHtcbiAgICAgICAgb3V0LnJvdyA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIHJvdyBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgICAgICBvdXQuY29sdW1uID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgY29sdW1uIGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBmdW5jdGlvbihjb250YWluZXJPdXQsIGxheW91dCwgY29lcmNlLCBkZmx0RG9tYWlucykge1xuICAgIHZhciBkZmx0WCA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy54KSB8fCBbMCwgMV07XG4gICAgdmFyIGRmbHRZID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLnkpIHx8IFswLCAxXTtcblxuICAgIHZhciBncmlkID0gbGF5b3V0LmdyaWQ7XG4gICAgaWYoZ3JpZCkge1xuICAgICAgICB2YXIgY29sdW1uID0gY29lcmNlKCdkb21haW4uY29sdW1uJyk7XG4gICAgICAgIGlmKGNvbHVtbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihjb2x1bW4gPCBncmlkLmNvbHVtbnMpIGRmbHRYID0gZ3JpZC5fZG9tYWlucy54W2NvbHVtbl07XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLmNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3cgPSBjb2VyY2UoJ2RvbWFpbi5yb3cnKTtcbiAgICAgICAgaWYocm93ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKHJvdyA8IGdyaWQucm93cykgZGZsdFkgPSBncmlkLl9kb21haW5zLnlbcm93XTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4ucm93O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHggPSBjb2VyY2UoJ2RvbWFpbi54JywgZGZsdFgpO1xuICAgIHZhciB5ID0gY29lcmNlKCdkb21haW4ueScsIGRmbHRZKTtcblxuICAgIC8vIGRvbid0IGFjY2VwdCBiYWQgaW5wdXQgZGF0YVxuICAgIGlmKCEoeFswXSA8IHhbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnggPSBkZmx0WC5zbGljZSgpO1xuICAgIGlmKCEoeVswXSA8IHlbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnkgPSBkZmx0WS5zbGljZSgpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vbGliJyk7XG52YXIgVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9wbG90X2FwaS9wbG90X3RlbXBsYXRlJyk7XG52YXIgaGFuZGxlRG9tYWluRGVmYXVsdHMgPSByZXF1aXJlKCcuL2RvbWFpbicpLmRlZmF1bHRzO1xuXG5cbi8qKlxuICogRmluZCBhbmQgc3VwcGx5IGRlZmF1bHRzIHRvIGFsbCBzdWJwbG90cyBvZiBhIGdpdmVuIHR5cGVcbiAqIFRoaXMgaGFuZGxlcyBzdWJwbG90cyB0aGF0IGFyZSBjb250YWluZWQgd2l0aGluIG9uZSBjb250YWluZXIgLSBzb1xuICogZ2wzZCwgZ2VvLCB0ZXJuYXJ5Li4uIGJ1dCBub3QgMmQgYXhlcyB3aGljaCBoYXZlIHNlcGFyYXRlIHggYW5kIHkgYXhlc1xuICogZmluZHMgc3VicGxvdHMsIGNvZXJjZXMgdGhlaXIgYGRvbWFpbmAgYXR0cmlidXRlcywgdGhlbiBjYWxscyB0aGVcbiAqIGdpdmVuIGhhbmRsZURlZmF1bHRzIGZ1bmN0aW9uIHRvIGZpbGwgaW4gZXZlcnl0aGluZyBlbHNlLlxuICpcbiAqIGxheW91dEluOiB0aGUgY29tcGxldGUgdXNlci1zdXBwbGllZCBpbnB1dCBsYXlvdXRcbiAqIGxheW91dE91dDogdGhlIGNvbXBsZXRlIGZpbmlzaGVkIGxheW91dFxuICogZnVsbERhdGE6IHRoZSBmaW5pc2hlZCBkYXRhIGFycmF5LCB1c2VkIG9ubHkgdG8gZmluZCBzdWJwbG90c1xuICogb3B0czoge1xuICogIHR5cGU6IHN1YnBsb3QgdHlwZSBzdHJpbmdcbiAqICBhdHRyaWJ1dGVzOiBzdWJwbG90IGF0dHJpYnV0ZXMgb2JqZWN0XG4gKiAgcGFydGl0aW9uOiAneCcgb3IgJ3knLCB3aGljaCBkaXJlY3Rpb24gdG8gZGl2aWRlIGRvbWFpbiBzcGFjZSBieSBkZWZhdWx0XG4gKiAgICAgIChkZWZhdWx0ICd4JywgaWUgc2lkZS1ieS1zaWRlIHN1YnBsb3RzKVxuICogICAgICBUT0RPOiB0aGlzIG9wdGlvbiBpcyBvbmx5IGhlcmUgYmVjYXVzZSAzRCBhbmQgZ2VvIG1hZGUgb3Bwb3NpdGVcbiAqICAgICAgY2hvaWNlcyBpbiB0aGlzIHJlZ2FyZCBwcmV2aW91c2x5IGFuZCBJIGRpZG4ndCB3YW50IHRvIGNoYW5nZSBpdC5cbiAqICAgICAgSW5zdGVhZCB3ZSBzaG91bGQgZG86XG4gKiAgICAgIC0gc29tZXRoaW5nIGNvbnNpc3RlbnRcbiAqICAgICAgLSBzb21ldGhpbmcgbW9yZSBzcXVhcmUgKDQgY3V0cyAyeDIsIDUvNiBjdXRzIDJ4MywgZXRjLilcbiAqICAgICAgLSBzb21ldGhpbmcgdGhhdCBpbmNsdWRlcyBhbGwgc3VicGxvdCB0eXBlcyBpbiBvbmUgYXJyYW5nZW1lbnQsXG4gKiAgICAgICAgbm93IHRoYXQgd2UgY2FuIGhhdmUgdGhlbSB0b2dldGhlciFcbiAqICBoYW5kbGVEZWZhdWx0czogZnVuY3Rpb24gb2YgKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgY29lcmNlLCBvcHRzKVxuICogICAgICB0aGlzIG9wdHMgb2JqZWN0IGlzIHBhc3NlZCB0aHJvdWdoIHRvIGhhbmRsZURlZmF1bHRzLCBzbyBhdHRhY2ggYW55XG4gKiAgICAgIGFkZGl0aW9uYWwgaXRlbXMgbmVlZGVkIGJ5IHRoaXMgZnVuY3Rpb24gaGVyZSBhcyB3ZWxsXG4gKiB9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlU3VicGxvdERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhLCBvcHRzKSB7XG4gICAgdmFyIHN1YnBsb3RUeXBlID0gb3B0cy50eXBlO1xuICAgIHZhciBzdWJwbG90QXR0cmlidXRlcyA9IG9wdHMuYXR0cmlidXRlcztcbiAgICB2YXIgaGFuZGxlRGVmYXVsdHMgPSBvcHRzLmhhbmRsZURlZmF1bHRzO1xuICAgIHZhciBwYXJ0aXRpb24gPSBvcHRzLnBhcnRpdGlvbiB8fCAneCc7XG5cbiAgICB2YXIgaWRzID0gbGF5b3V0T3V0Ll9zdWJwbG90c1tzdWJwbG90VHlwZV07XG4gICAgdmFyIGlkc0xlbmd0aCA9IGlkcy5sZW5ndGg7XG5cbiAgICB2YXIgYmFzZUlkID0gaWRzTGVuZ3RoICYmIGlkc1swXS5yZXBsYWNlKC9cXGQrJC8sICcnKTtcblxuICAgIHZhciBzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQ7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIHN1YnBsb3RBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaWRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0gaWRzW2ldO1xuXG4gICAgICAgIC8vIHRlcm5hcnkgdHJhY2VzIGdldCBhIGxheW91dCB0ZXJuYXJ5IGZvciBmcmVlIVxuICAgICAgICBpZihsYXlvdXRJbltpZF0pIHN1YnBsb3RMYXlvdXRJbiA9IGxheW91dEluW2lkXTtcbiAgICAgICAgZWxzZSBzdWJwbG90TGF5b3V0SW4gPSBsYXlvdXRJbltpZF0gPSB7fTtcblxuICAgICAgICBzdWJwbG90TGF5b3V0T3V0ID0gVGVtcGxhdGUubmV3Q29udGFpbmVyKGxheW91dE91dCwgaWQsIGJhc2VJZCk7XG5cbiAgICAgICAgLy8gQWxsIHN1YnBsb3QgY29udGFpbmVycyBnZXQgYSBgdWlyZXZpc2lvbmAgaW5oZXJpdGluZyBmcm9tIHRoZSBiYXNlLlxuICAgICAgICAvLyBDdXJyZW50bHkgYWxsIHN1YnBsb3RzIGNvbnRhaW5lcnMgaGF2ZSBzb21lIHVzZXIgaW50ZXJhY3Rpb25cbiAgICAgICAgLy8gYXR0cmlidXRlcywgYnV0IGlmIHdlIGV2ZXIgYWRkIG9uZSB0aGF0IGRvZXNuJ3QsIHdlIHdvdWxkIG5lZWQgYW5cbiAgICAgICAgLy8gb3B0aW9uIHRvIHNraXAgdGhpcyBzdGVwLlxuICAgICAgICBjb2VyY2UoJ3VpcmV2aXNpb24nLCBsYXlvdXRPdXQudWlyZXZpc2lvbik7XG5cbiAgICAgICAgdmFyIGRmbHREb21haW5zID0ge307XG4gICAgICAgIGRmbHREb21haW5zW3BhcnRpdGlvbl0gPSBbaSAvIGlkc0xlbmd0aCwgKGkgKyAxKSAvIGlkc0xlbmd0aF07XG4gICAgICAgIGhhbmRsZURvbWFpbkRlZmF1bHRzKHN1YnBsb3RMYXlvdXRPdXQsIGxheW91dE91dCwgY29lcmNlLCBkZmx0RG9tYWlucyk7XG5cbiAgICAgICAgb3B0cy5pZCA9IGlkO1xuICAgICAgICBoYW5kbGVEZWZhdWx0cyhzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIGNvZXJjZSwgb3B0cyk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWluOiAnem1pbicsXG4gICAgbWF4OiAnem1heCdcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIHN1YnR5cGVzID0gcmVxdWlyZSgnLi9zdWJ0eXBlcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0VHJhY2VDb2xvcih0cmFjZSwgZGkpIHtcbiAgICB2YXIgbGMsIHRjO1xuXG4gICAgLy8gVE9ETzogdGV4dCBtb2Rlc1xuXG4gICAgaWYodHJhY2UubW9kZSA9PT0gJ2xpbmVzJykge1xuICAgICAgICBsYyA9IHRyYWNlLmxpbmUuY29sb3I7XG4gICAgICAgIHJldHVybiAobGMgJiYgQ29sb3Iub3BhY2l0eShsYykpID9cbiAgICAgICAgICAgIGxjIDogdHJhY2UuZmlsbGNvbG9yO1xuICAgIH0gZWxzZSBpZih0cmFjZS5tb2RlID09PSAnbm9uZScpIHtcbiAgICAgICAgcmV0dXJuIHRyYWNlLmZpbGwgPyB0cmFjZS5maWxsY29sb3IgOiAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbWMgPSBkaS5tY2MgfHwgKHRyYWNlLm1hcmtlciB8fCB7fSkuY29sb3I7XG4gICAgICAgIHZhciBtbGMgPSBkaS5tbGNjIHx8ICgodHJhY2UubWFya2VyIHx8IHt9KS5saW5lIHx8IHt9KS5jb2xvcjtcblxuICAgICAgICB0YyA9IChtYyAmJiBDb2xvci5vcGFjaXR5KG1jKSkgPyBtYyA6XG4gICAgICAgICAgICAobWxjICYmIENvbG9yLm9wYWNpdHkobWxjKSAmJlxuICAgICAgICAgICAgICAgIChkaS5tbHcgfHwgKCh0cmFjZS5tYXJrZXIgfHwge30pLmxpbmUgfHwge30pLndpZHRoKSkgPyBtbGMgOiAnJztcblxuICAgICAgICBpZih0Yykge1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBwb2ludHMgYXJlbid0IFRPTyB0cmFuc3BhcmVudFxuICAgICAgICAgICAgaWYoQ29sb3Iub3BhY2l0eSh0YykgPCAwLjMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29sb3IuYWRkT3BhY2l0eSh0YywgMC4zKTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gdGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYyA9ICh0cmFjZS5saW5lIHx8IHt9KS5jb2xvcjtcbiAgICAgICAgICAgIHJldHVybiAobGMgJiYgQ29sb3Iub3BhY2l0eShsYykgJiZcbiAgICAgICAgICAgICAgICBzdWJ0eXBlcy5oYXNMaW5lcyh0cmFjZSkgJiYgdHJhY2UubGluZS53aWR0aCkgP1xuICAgICAgICAgICAgICAgICAgICBsYyA6IHRyYWNlLmZpbGxjb2xvcjtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIHRleHR0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLnRleHR0ZW1wbGF0ZUF0dHJzO1xudmFyIHNjYXR0ZXJHZW9BdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXJnZW8vYXR0cmlidXRlcycpO1xudmFyIHNjYXR0ZXJBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXR0cmlidXRlcycpO1xudmFyIG1hcGJveEF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvbWFwYm94L2xheW91dF9hdHRyaWJ1dGVzJyk7XG52YXIgYmFzZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvYXR0cmlidXRlcycpO1xudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG52YXIgb3ZlcnJpZGVBbGwgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9lZGl0X3R5cGVzJykub3ZlcnJpZGVBbGw7XG5cbnZhciBsaW5lQXR0cnMgPSBzY2F0dGVyR2VvQXR0cnMubGluZTtcbnZhciBtYXJrZXJBdHRycyA9IHNjYXR0ZXJHZW9BdHRycy5tYXJrZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlcnJpZGVBbGwoe1xuICAgIGxvbjogc2NhdHRlckdlb0F0dHJzLmxvbixcbiAgICBsYXQ6IHNjYXR0ZXJHZW9BdHRycy5sYXQsXG5cbiAgICAvLyBsb2NhdGlvbnNcbiAgICAvLyBsb2NhdGlvbm1vZGVcblxuICAgIG1vZGU6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5tb2RlLCB7XG4gICAgICAgIGRmbHQ6ICdtYXJrZXJzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHRoZSBkcmF3aW5nIG1vZGUgZm9yIHRoaXMgc2NhdHRlciB0cmFjZS4nLFxuICAgICAgICAgICAgJ0lmIHRoZSBwcm92aWRlZCBgbW9kZWAgaW5jbHVkZXMgKnRleHQqIHRoZW4gdGhlIGB0ZXh0YCBlbGVtZW50cycsXG4gICAgICAgICAgICAnYXBwZWFyIGF0IHRoZSBjb29yZGluYXRlcy4gT3RoZXJ3aXNlLCB0aGUgYHRleHRgIGVsZW1lbnRzJyxcbiAgICAgICAgICAgICdhcHBlYXIgb24gaG92ZXIuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuXG4gICAgdGV4dDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLnRleHQsIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggKGxvbixsYXQpIHBhaXInLFxuICAgICAgICAgICAgJ0lmIGEgc2luZ2xlIHN0cmluZywgdGhlIHNhbWUgc3RyaW5nIGFwcGVhcnMgb3ZlcicsXG4gICAgICAgICAgICAnYWxsIHRoZSBkYXRhIHBvaW50cy4nLFxuICAgICAgICAgICAgJ0lmIGFuIGFycmF5IG9mIHN0cmluZywgdGhlIGl0ZW1zIGFyZSBtYXBwZWQgaW4gb3JkZXIgdG8gdGhlJyxcbiAgICAgICAgICAgICd0aGlzIHRyYWNlXFwncyAobG9uLGxhdCkgY29vcmRpbmF0ZXMuJyxcbiAgICAgICAgICAgICdJZiB0cmFjZSBgaG92ZXJpbmZvYCBjb250YWlucyBhICp0ZXh0KiBmbGFnIGFuZCAqaG92ZXJ0ZXh0KiBpcyBub3Qgc2V0LCcsXG4gICAgICAgICAgICAndGhlc2UgZWxlbWVudHMgd2lsbCBiZSBzZWVuIGluIHRoZSBob3ZlciBsYWJlbHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIHRleHR0ZW1wbGF0ZTogdGV4dHRlbXBsYXRlQXR0cnMoe2VkaXRUeXBlOiAncGxvdCd9LCB7XG4gICAgICAgIGtleXM6IFsnbGF0JywgJ2xvbicsICd0ZXh0J11cbiAgICB9KSxcbiAgICBob3ZlcnRleHQ6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5ob3ZlcnRleHQsIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIGhvdmVyIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggKGxvbixsYXQpIHBhaXInLFxuICAgICAgICAgICAgJ0lmIGEgc2luZ2xlIHN0cmluZywgdGhlIHNhbWUgc3RyaW5nIGFwcGVhcnMgb3ZlcicsXG4gICAgICAgICAgICAnYWxsIHRoZSBkYXRhIHBvaW50cy4nLFxuICAgICAgICAgICAgJ0lmIGFuIGFycmF5IG9mIHN0cmluZywgdGhlIGl0ZW1zIGFyZSBtYXBwZWQgaW4gb3JkZXIgdG8gdGhlJyxcbiAgICAgICAgICAgICd0aGlzIHRyYWNlXFwncyAobG9uLGxhdCkgY29vcmRpbmF0ZXMuJyxcbiAgICAgICAgICAgICdUbyBiZSBzZWVuLCB0cmFjZSBgaG92ZXJpbmZvYCBtdXN0IGNvbnRhaW4gYSAqdGV4dCogZmxhZy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG5cbiAgICBsaW5lOiB7XG4gICAgICAgIGNvbG9yOiBsaW5lQXR0cnMuY29sb3IsXG4gICAgICAgIHdpZHRoOiBsaW5lQXR0cnMud2lkdGhcblxuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIGRhc2g6IGRhc2hcbiAgICB9LFxuXG4gICAgY29ubmVjdGdhcHM6IHNjYXR0ZXJBdHRycy5jb25uZWN0Z2FwcyxcblxuICAgIG1hcmtlcjogZXh0ZW5kRmxhdCh7XG4gICAgICAgIHN5bWJvbDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBkZmx0OiAnY2lyY2xlJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgbWFya2VyIHN5bWJvbC4nLFxuICAgICAgICAgICAgICAgICdGdWxsIGxpc3Q6IGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFraS1pY29ucy8nLFxuICAgICAgICAgICAgICAgICdOb3RlIHRoYXQgdGhlIGFycmF5IGBtYXJrZXIuY29sb3JgIGFuZCBgbWFya2VyLnNpemVgJyxcbiAgICAgICAgICAgICAgICAnYXJlIG9ubHkgYXZhaWxhYmxlIGZvciAqY2lyY2xlKiBzeW1ib2xzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGFuZ2xlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIGRmbHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgbWFya2VyIG9yaWVudGF0aW9uIGZyb20gdHJ1ZSBOb3J0aCwgaW4gZGVncmVlcyBjbG9ja3dpc2UuJyxcbiAgICAgICAgICAgICAgICAnV2hlbiB1c2luZyB0aGUgKmF1dG8qIGRlZmF1bHQsIG5vIHJvdGF0aW9uIHdvdWxkIGJlIGFwcGxpZWQnLFxuICAgICAgICAgICAgICAgICdpbiBwZXJzcGVjdGl2ZSB2aWV3cyB3aGljaCBpcyBkaWZmZXJlbnQgZnJvbSB1c2luZyBhIHplcm8gYW5nbGUuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgYWxsb3dvdmVybGFwOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdGbGFnIHRvIGRyYXcgYWxsIHN5bWJvbHMsIGV2ZW4gaWYgdGhleSBvdmVybGFwLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIG9wYWNpdHk6IG1hcmtlckF0dHJzLm9wYWNpdHksXG4gICAgICAgIHNpemU6IG1hcmtlckF0dHJzLnNpemUsXG4gICAgICAgIHNpemVyZWY6IG1hcmtlckF0dHJzLnNpemVyZWYsXG4gICAgICAgIHNpemVtaW46IG1hcmtlckF0dHJzLnNpemVtaW4sXG4gICAgICAgIHNpemVtb2RlOiBtYXJrZXJBdHRycy5zaXplbW9kZVxuICAgIH0sXG4gICAgICAgIGNvbG9yU2NhbGVBdHRycygnbWFya2VyJylcbiAgICAgICAgLy8gbGluZVxuICAgICksXG5cbiAgICBmaWxsOiBzY2F0dGVyR2VvQXR0cnMuZmlsbCxcbiAgICBmaWxsY29sb3I6IHNjYXR0ZXJBdHRycy5maWxsY29sb3IsXG5cbiAgICB0ZXh0Zm9udDogbWFwYm94QXR0cnMubGF5ZXJzLnN5bWJvbC50ZXh0Zm9udCxcbiAgICB0ZXh0cG9zaXRpb246IG1hcGJveEF0dHJzLmxheWVycy5zeW1ib2wudGV4dHBvc2l0aW9uLFxuXG4gICAgYmVsb3c6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIGlmIHRoaXMgc2NhdHRlcm1hcGJveCB0cmFjZVxcJ3MgbGF5ZXJzIGFyZSB0byBiZSBpbnNlcnRlZCcsXG4gICAgICAgICAgICAnYmVmb3JlIHRoZSBsYXllciB3aXRoIHRoZSBzcGVjaWZpZWQgSUQuJyxcbiAgICAgICAgICAgICdCeSBkZWZhdWx0LCBzY2F0dGVybWFwYm94IGxheWVycyBhcmUgaW5zZXJ0ZWQnLFxuICAgICAgICAgICAgJ2Fib3ZlIGFsbCB0aGUgYmFzZSBsYXllcnMuJyxcbiAgICAgICAgICAgICdUbyBwbGFjZSB0aGUgc2NhdHRlcm1hcGJveCBsYXllcnMgYWJvdmUgZXZlcnkgb3RoZXIgbGF5ZXIsIHNldCBgYmVsb3dgIHRvICpcXCdcXCcqLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgbWFya2VyOiBzY2F0dGVyQXR0cnMuc2VsZWN0ZWQubWFya2VyXG4gICAgfSxcbiAgICB1bnNlbGVjdGVkOiB7XG4gICAgICAgIG1hcmtlcjogc2NhdHRlckF0dHJzLnVuc2VsZWN0ZWQubWFya2VyXG4gICAgfSxcblxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbywge1xuICAgICAgICBmbGFnczogWydsb24nLCAnbGF0JywgJ3RleHQnLCAnbmFtZSddXG4gICAgfSksXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKCksXG59LCAnY2FsYycsICduZXN0ZWQnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvcm1hdExhYmVscyhjZGksIHRyYWNlLCBmdWxsTGF5b3V0KSB7XG4gICAgdmFyIGxhYmVscyA9IHt9O1xuXG4gICAgdmFyIHN1YnBsb3QgPSBmdWxsTGF5b3V0W3RyYWNlLnN1YnBsb3RdLl9zdWJwbG90O1xuICAgIHZhciBheCA9IHN1YnBsb3QubW9ja0F4aXM7XG5cbiAgICB2YXIgbG9ubGF0ID0gY2RpLmxvbmxhdDtcbiAgICBsYWJlbHMubG9uTGFiZWwgPSBBeGVzLnRpY2tUZXh0KGF4LCBheC5jMmwobG9ubGF0WzBdKSwgdHJ1ZSkudGV4dDtcbiAgICBsYWJlbHMubGF0TGFiZWwgPSBBeGVzLnRpY2tUZXh0KGF4LCBheC5jMmwobG9ubGF0WzFdKSwgdHJ1ZSkudGV4dDtcblxuICAgIHJldHVybiBsYWJlbHM7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBGeCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBnZXRUcmFjZUNvbG9yID0gcmVxdWlyZSgnLi4vc2NhdHRlci9nZXRfdHJhY2VfY29sb3InKTtcbnZhciBmaWxsVGV4dCA9IExpYi5maWxsVGV4dDtcbnZhciBCQUROVU0gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvbnVtZXJpY2FsJykuQkFETlVNO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCkge1xuICAgIHZhciBjZCA9IHBvaW50RGF0YS5jZDtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgeGEgPSBwb2ludERhdGEueGE7XG4gICAgdmFyIHlhID0gcG9pbnREYXRhLnlhO1xuICAgIHZhciBzdWJwbG90ID0gcG9pbnREYXRhLnN1YnBsb3Q7XG5cbiAgICAvLyBjb21wdXRlIHdpbmRpbmcgbnVtYmVyIGFib3V0IFstMTgwLCAxODBdIGdsb2JlXG4gICAgdmFyIHdpbmRpbmcgPSAoeHZhbCA+PSAwKSA/XG4gICAgICAgIE1hdGguZmxvb3IoKHh2YWwgKyAxODApIC8gMzYwKSA6XG4gICAgICAgIE1hdGguY2VpbCgoeHZhbCAtIDE4MCkgLyAzNjApO1xuXG4gICAgLy8gc2hpZnQgbG9uZ2l0dWRlIHRvIFstMTgwLCAxODBdIHRvIGRldGVybWluZSBjbG9zZXN0IHBvaW50XG4gICAgdmFyIGxvblNoaWZ0ID0gd2luZGluZyAqIDM2MDtcbiAgICB2YXIgeHZhbDIgPSB4dmFsIC0gbG9uU2hpZnQ7XG5cbiAgICBmdW5jdGlvbiBkaXN0Rm4oZCkge1xuICAgICAgICB2YXIgbG9ubGF0ID0gZC5sb25sYXQ7XG4gICAgICAgIGlmKGxvbmxhdFswXSA9PT0gQkFETlVNKSByZXR1cm4gSW5maW5pdHk7XG5cbiAgICAgICAgdmFyIGxvbiA9IExpYi5tb2RIYWxmKGxvbmxhdFswXSwgMzYwKTtcbiAgICAgICAgdmFyIGxhdCA9IGxvbmxhdFsxXTtcbiAgICAgICAgdmFyIHB0ID0gc3VicGxvdC5wcm9qZWN0KFtsb24sIGxhdF0pO1xuICAgICAgICB2YXIgZHggPSBwdC54IC0geGEuYzJwKFt4dmFsMiwgbGF0XSk7XG4gICAgICAgIHZhciBkeSA9IHB0LnkgLSB5YS5jMnAoW2xvbiwgeXZhbF0pO1xuICAgICAgICB2YXIgcmFkID0gTWF0aC5tYXgoMywgZC5tcmMgfHwgMCk7XG5cbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgLSByYWQsIDEgLSAzIC8gcmFkKTtcbiAgICB9XG5cbiAgICBGeC5nZXRDbG9zZXN0KGNkLCBkaXN0Rm4sIHBvaW50RGF0YSk7XG5cbiAgICAvLyBza2lwIHRoZSByZXN0IChmb3IgdGhpcyB0cmFjZSkgaWYgd2UgZGlkbid0IGZpbmQgYSBjbG9zZSBwb2ludFxuICAgIGlmKHBvaW50RGF0YS5pbmRleCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIHZhciBkaSA9IGNkW3BvaW50RGF0YS5pbmRleF07XG4gICAgdmFyIGxvbmxhdCA9IGRpLmxvbmxhdDtcbiAgICB2YXIgbG9ubGF0U2hpZnRlZCA9IFtMaWIubW9kSGFsZihsb25sYXRbMF0sIDM2MCkgKyBsb25TaGlmdCwgbG9ubGF0WzFdXTtcblxuICAgIC8vIHNoaWZ0IGxhYmVscyBiYWNrIHRvIG9yaWdpbmFsIHdpbmRlZCBnbG9iZVxuICAgIHZhciB4YyA9IHhhLmMycChsb25sYXRTaGlmdGVkKTtcbiAgICB2YXIgeWMgPSB5YS5jMnAobG9ubGF0U2hpZnRlZCk7XG4gICAgdmFyIHJhZCA9IGRpLm1yYyB8fCAxO1xuXG4gICAgcG9pbnREYXRhLngwID0geGMgLSByYWQ7XG4gICAgcG9pbnREYXRhLngxID0geGMgKyByYWQ7XG4gICAgcG9pbnREYXRhLnkwID0geWMgLSByYWQ7XG4gICAgcG9pbnREYXRhLnkxID0geWMgKyByYWQ7XG5cbiAgICB2YXIgZnVsbExheW91dCA9IHt9O1xuICAgIGZ1bGxMYXlvdXRbdHJhY2Uuc3VicGxvdF0gPSB7X3N1YnBsb3Q6IHN1YnBsb3R9O1xuICAgIHZhciBsYWJlbHMgPSB0cmFjZS5fbW9kdWxlLmZvcm1hdExhYmVscyhkaSwgdHJhY2UsIGZ1bGxMYXlvdXQpO1xuICAgIHBvaW50RGF0YS5sb25MYWJlbCA9IGxhYmVscy5sb25MYWJlbDtcbiAgICBwb2ludERhdGEubGF0TGFiZWwgPSBsYWJlbHMubGF0TGFiZWw7XG5cbiAgICBwb2ludERhdGEuY29sb3IgPSBnZXRUcmFjZUNvbG9yKHRyYWNlLCBkaSk7XG4gICAgcG9pbnREYXRhLmV4dHJhVGV4dCA9IGdldEV4dHJhVGV4dCh0cmFjZSwgZGksIGNkWzBdLnQubGFiZWxzKTtcbiAgICBwb2ludERhdGEuaG92ZXJ0ZW1wbGF0ZSA9IHRyYWNlLmhvdmVydGVtcGxhdGU7XG5cbiAgICByZXR1cm4gW3BvaW50RGF0YV07XG59O1xuXG5mdW5jdGlvbiBnZXRFeHRyYVRleHQodHJhY2UsIGRpLCBsYWJlbHMpIHtcbiAgICBpZih0cmFjZS5ob3ZlcnRlbXBsYXRlKSByZXR1cm47XG5cbiAgICB2YXIgaG92ZXJpbmZvID0gZGkuaGkgfHwgdHJhY2UuaG92ZXJpbmZvO1xuICAgIHZhciBwYXJ0cyA9IGhvdmVyaW5mby5zcGxpdCgnKycpO1xuICAgIHZhciBpc0FsbCA9IHBhcnRzLmluZGV4T2YoJ2FsbCcpICE9PSAtMTtcbiAgICB2YXIgaGFzTG9uID0gcGFydHMuaW5kZXhPZignbG9uJykgIT09IC0xO1xuICAgIHZhciBoYXNMYXQgPSBwYXJ0cy5pbmRleE9mKCdsYXQnKSAhPT0gLTE7XG4gICAgdmFyIGxvbmxhdCA9IGRpLmxvbmxhdDtcbiAgICB2YXIgdGV4dCA9IFtdO1xuXG4gICAgLy8gVE9ETyBzaG91bGQgd2UgdXNlIGEgbW9jayBheGlzIHRvIGZvcm1hdCBob3Zlcj9cbiAgICAvLyBJZiBzbywgd2UnbGwgbmVlZCB0byBtYWtlIHByZWNpc2lvbiBiZSB6b29tLWxldmVsIGRlcGVuZGVudFxuICAgIGZ1bmN0aW9uIGZvcm1hdCh2KSB7XG4gICAgICAgIHJldHVybiB2ICsgJ1xcdTAwQjAnO1xuICAgIH1cblxuICAgIGlmKGlzQWxsIHx8IChoYXNMb24gJiYgaGFzTGF0KSkge1xuICAgICAgICB0ZXh0LnB1c2goJygnICsgZm9ybWF0KGxvbmxhdFswXSkgKyAnLCAnICsgZm9ybWF0KGxvbmxhdFsxXSkgKyAnKScpO1xuICAgIH0gZWxzZSBpZihoYXNMb24pIHtcbiAgICAgICAgdGV4dC5wdXNoKGxhYmVscy5sb24gKyBmb3JtYXQobG9ubGF0WzBdKSk7XG4gICAgfSBlbHNlIGlmKGhhc0xhdCkge1xuICAgICAgICB0ZXh0LnB1c2gobGFiZWxzLmxhdCArIGZvcm1hdChsb25sYXRbMV0pKTtcbiAgICB9XG5cbiAgICBpZihpc0FsbCB8fCBwYXJ0cy5pbmRleE9mKCd0ZXh0JykgIT09IC0xKSB7XG4gICAgICAgIGZpbGxUZXh0KGRpLCB0cmFjZSwgdGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHQuam9pbignPGJyPicpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==