(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_scatterpolar_js-node_modules_plotly_js_src_plots_subplot_defaults_js"],{

/***/ "./node_modules/plotly.js/lib/scatterpolar.js":
/*!****************************************************!*\
  !*** ./node_modules/plotly.js/lib/scatterpolar.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/scatterpolar */ "./node_modules/plotly.js/src/traces/scatterpolar/index.js");


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

/***/ "./node_modules/plotly.js/src/traces/scatterpolar/calc.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolar/calc.js ***!
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




var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

var calcColorscale = __webpack_require__(/*! ../scatter/colorscale_calc */ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js");
var arraysToCalcdata = __webpack_require__(/*! ../scatter/arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");
var calcMarkerSize = __webpack_require__(/*! ../scatter/calc */ "./node_modules/plotly.js/src/traces/scatter/calc.js").calcMarkerSize;

module.exports = function calc(gd, trace) {
    var fullLayout = gd._fullLayout;
    var subplotId = trace.subplot;
    var radialAxis = fullLayout[subplotId].radialaxis;
    var angularAxis = fullLayout[subplotId].angularaxis;
    var rArray = radialAxis.makeCalcdata(trace, 'r');
    var thetaArray = angularAxis.makeCalcdata(trace, 'theta');
    var len = trace._length;
    var cd = new Array(len);

    for(var i = 0; i < len; i++) {
        var r = rArray[i];
        var theta = thetaArray[i];
        var cdi = cd[i] = {};

        if(isNumeric(r) && isNumeric(theta)) {
            cdi.r = r;
            cdi.theta = theta;
        } else {
            cdi.r = BADNUM;
        }
    }

    var ppad = calcMarkerSize(trace, len);
    trace._extremes.x = Axes.findExtremes(radialAxis, rArray, {ppad: ppad});

    calcColorscale(gd, trace);
    arraysToCalcdata(cd, trace);
    calcSelection(cd, trace);

    return cd;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolar/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolar/index.js ***!
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



module.exports = {
    moduleType: 'trace',
    name: 'scatterpolar',
    basePlotModule: __webpack_require__(/*! ../../plots/polar */ "./node_modules/plotly.js/src/plots/polar/index.js"),
    categories: ['polar', 'symbols', 'showLegend', 'scatter-like'],

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatterpolar/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/scatterpolar/defaults.js").supplyDefaults,
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    formatLabels: __webpack_require__(/*! ./format_labels */ "./node_modules/plotly.js/src/traces/scatterpolar/format_labels.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/scatterpolar/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/scatterpolar/plot.js"),
    style: __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js").style,
    styleOnSelect: __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/scatterpolar/hover.js").hoverPoints,
    selectPoints: __webpack_require__(/*! ../scatter/select */ "./node_modules/plotly.js/src/traces/scatter/select.js"),

    meta: {
        hrName: 'scatter_polar',
        description: [
            'The scatterpolar trace type encompasses line charts, scatter charts, text charts, and bubble charts',
            'in polar coordinates.',
            'The data visualized as scatter point or lines is set in',
            '`r` (radial) and `theta` (angular) coordinates',
            'Text (appearing either on the chart or on hover only) is via `text`.',
            'Bubble charts are achieved by setting `marker.size` and/or `marker.color`',
            'to numerical arrays.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolar/plot.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolar/plot.js ***!
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



var scatterPlot = __webpack_require__(/*! ../scatter/plot */ "./node_modules/plotly.js/src/traces/scatter/plot.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function plot(gd, subplot, moduleCalcData) {
    var mlayer = subplot.layers.frontplot.select('g.scatterlayer');

    var plotinfo = {
        xaxis: subplot.xaxis,
        yaxis: subplot.yaxis,
        plot: subplot.framework,
        layerClipId: subplot._hasClipOnAxisFalse ? subplot.clipIds.forTraces : null
    };

    var radialAxis = subplot.radialAxis;
    var angularAxis = subplot.angularAxis;

    // convert:
    // 'c' (r,theta) -> 'geometric' (r,theta) -> (x,y)
    for(var i = 0; i < moduleCalcData.length; i++) {
        var cdi = moduleCalcData[i];

        for(var j = 0; j < cdi.length; j++) {
            var cd = cdi[j];
            var r = cd.r;

            if(r === BADNUM) {
                cd.x = cd.y = BADNUM;
            } else {
                var rg = radialAxis.c2g(r);
                var thetag = angularAxis.c2g(cd.theta);
                cd.x = rg * Math.cos(thetag);
                cd.y = rg * Math.sin(thetag);
            }
        }
    }

    scatterPlot(gd, plotinfo, moduleCalcData, mlayer);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc2NhdHRlcnBvbGFyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9kb21haW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL3N1YnBsb3RfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVycG9sYXIvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJwb2xhci9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJwb2xhci9wbG90LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLG1JQUFzRDs7Ozs7Ozs7Ozs7O0FDVnREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGlCQUFpQixpR0FBbUM7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU8sK0JBQStCLElBQUk7QUFDdEQ7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwyREFBMkQ7QUFDeEUsYUFBYTtBQUNiO0FB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QkFBa0IsbUJBQU8sQ0FBQyw0RUFBaUI7QUFDM0MsYUFBYSxrSEFBMkM7O0FBRXhEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQiwyQkFBMkI7QUFDN0M7O0FBRUEsc0JBQXNCLGdCQUFnQjtBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydGU4NDQyMjNkZWI2YzA0YTI0Y2ZiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvc2NhdHRlcnBvbGFyJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbi8qKlxuICogTWFrZSBhIHh5IGRvbWFpbiBhdHRyaWJ1dGUgZ3JvdXBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLm5hbWU6IG5hbWUgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIGRlZmF1bHQgZGVzY3JpcHRpb25cbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMudHJhY2U6IHNldCB0byB0cnVlIGZvciB0cmFjZSBjb250YWluZXJzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMuZWRpdFR5cGU6IGVkaXRUeXBlIGZvciBhbGwgcGllY2VzXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLm5vR3JpZENlbGw6IHNldCB0byB0cnVlIHRvIG9taXQgYHJvd2AgYW5kIGBjb2x1bW5gXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIGV4dHJhLmRlc2NyaXB0aW9uOiBleHRyYSBkZXNjcmlwdGlvbi4gTi5CIHdlIHVzZVxuICogICAgIGEgc2VwYXJhdGUgZXh0cmEgY29udGFpbmVyIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoXG4gKiAgICAgdGhlIGNvbXByZXNzX2F0dHJpYnV0ZXMgdHJhbnNmb3JtLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYXR0cmlidXRlcyBvYmplY3QgY29udGFpbmluZyB7eCx5fSBhcyBzcGVjaWZpZWRcbiAqL1xuZXhwb3J0cy5hdHRyaWJ1dGVzID0gZnVuY3Rpb24ob3B0cywgZXh0cmEpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBleHRyYSA9IGV4dHJhIHx8IHt9O1xuXG4gICAgdmFyIGJhc2UgPSB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfVxuICAgICAgICBdLFxuICAgICAgICBkZmx0OiBbMCwgMV1cbiAgICB9O1xuXG4gICAgdmFyIG5hbWVQYXJ0ID0gb3B0cy5uYW1lID8gb3B0cy5uYW1lICsgJyAnIDogJyc7XG4gICAgdmFyIGNvbnRQYXJ0ID0gb3B0cy50cmFjZSA/ICd0cmFjZSAnIDogJ3N1YnBsb3QgJztcbiAgICB2YXIgZGVzY1BhcnQgPSBleHRyYS5kZXNjcmlwdGlvbiA/ICcgJyArIGV4dHJhLmRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICB4OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3Jpem9udGFsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICB5OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB2ZXJ0aWNhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGVcbiAgICB9O1xuXG4gICAgaWYoIW9wdHMubm9HcmlkQ2VsbCkge1xuICAgICAgICBvdXQucm93ID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgcm93IGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgICAgIG91dC5jb2x1bW4gPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyBjb2x1bW4gaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbnRhaW5lck91dCwgbGF5b3V0LCBjb2VyY2UsIGRmbHREb21haW5zKSB7XG4gICAgdmFyIGRmbHRYID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLngpIHx8IFswLCAxXTtcbiAgICB2YXIgZGZsdFkgPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueSkgfHwgWzAsIDFdO1xuXG4gICAgdmFyIGdyaWQgPSBsYXlvdXQuZ3JpZDtcbiAgICBpZihncmlkKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBjb2VyY2UoJ2RvbWFpbi5jb2x1bW4nKTtcbiAgICAgICAgaWYoY29sdW1uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGNvbHVtbiA8IGdyaWQuY29sdW1ucykgZGZsdFggPSBncmlkLl9kb21haW5zLnhbY29sdW1uXTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4uY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IGNvZXJjZSgnZG9tYWluLnJvdycpO1xuICAgICAgICBpZihyb3cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYocm93IDwgZ3JpZC5yb3dzKSBkZmx0WSA9IGdyaWQuX2RvbWFpbnMueVtyb3ddO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5yb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgnZG9tYWluLngnLCBkZmx0WCk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ2RvbWFpbi55JywgZGZsdFkpO1xuXG4gICAgLy8gZG9uJ3QgYWNjZXB0IGJhZCBpbnB1dCBkYXRhXG4gICAgaWYoISh4WzBdIDwgeFsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueCA9IGRmbHRYLnNsaWNlKCk7XG4gICAgaWYoISh5WzBdIDwgeVsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueSA9IGRmbHRZLnNsaWNlKCk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi9saWInKTtcbnZhciBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4vZG9tYWluJykuZGVmYXVsdHM7XG5cblxuLyoqXG4gKiBGaW5kIGFuZCBzdXBwbHkgZGVmYXVsdHMgdG8gYWxsIHN1YnBsb3RzIG9mIGEgZ2l2ZW4gdHlwZVxuICogVGhpcyBoYW5kbGVzIHN1YnBsb3RzIHRoYXQgYXJlIGNvbnRhaW5lZCB3aXRoaW4gb25lIGNvbnRhaW5lciAtIHNvXG4gKiBnbDNkLCBnZW8sIHRlcm5hcnkuLi4gYnV0IG5vdCAyZCBheGVzIHdoaWNoIGhhdmUgc2VwYXJhdGUgeCBhbmQgeSBheGVzXG4gKiBmaW5kcyBzdWJwbG90cywgY29lcmNlcyB0aGVpciBgZG9tYWluYCBhdHRyaWJ1dGVzLCB0aGVuIGNhbGxzIHRoZVxuICogZ2l2ZW4gaGFuZGxlRGVmYXVsdHMgZnVuY3Rpb24gdG8gZmlsbCBpbiBldmVyeXRoaW5nIGVsc2UuXG4gKlxuICogbGF5b3V0SW46IHRoZSBjb21wbGV0ZSB1c2VyLXN1cHBsaWVkIGlucHV0IGxheW91dFxuICogbGF5b3V0T3V0OiB0aGUgY29tcGxldGUgZmluaXNoZWQgbGF5b3V0XG4gKiBmdWxsRGF0YTogdGhlIGZpbmlzaGVkIGRhdGEgYXJyYXksIHVzZWQgb25seSB0byBmaW5kIHN1YnBsb3RzXG4gKiBvcHRzOiB7XG4gKiAgdHlwZTogc3VicGxvdCB0eXBlIHN0cmluZ1xuICogIGF0dHJpYnV0ZXM6IHN1YnBsb3QgYXR0cmlidXRlcyBvYmplY3RcbiAqICBwYXJ0aXRpb246ICd4JyBvciAneScsIHdoaWNoIGRpcmVjdGlvbiB0byBkaXZpZGUgZG9tYWluIHNwYWNlIGJ5IGRlZmF1bHRcbiAqICAgICAgKGRlZmF1bHQgJ3gnLCBpZSBzaWRlLWJ5LXNpZGUgc3VicGxvdHMpXG4gKiAgICAgIFRPRE86IHRoaXMgb3B0aW9uIGlzIG9ubHkgaGVyZSBiZWNhdXNlIDNEIGFuZCBnZW8gbWFkZSBvcHBvc2l0ZVxuICogICAgICBjaG9pY2VzIGluIHRoaXMgcmVnYXJkIHByZXZpb3VzbHkgYW5kIEkgZGlkbid0IHdhbnQgdG8gY2hhbmdlIGl0LlxuICogICAgICBJbnN0ZWFkIHdlIHNob3VsZCBkbzpcbiAqICAgICAgLSBzb21ldGhpbmcgY29uc2lzdGVudFxuICogICAgICAtIHNvbWV0aGluZyBtb3JlIHNxdWFyZSAoNCBjdXRzIDJ4MiwgNS82IGN1dHMgMngzLCBldGMuKVxuICogICAgICAtIHNvbWV0aGluZyB0aGF0IGluY2x1ZGVzIGFsbCBzdWJwbG90IHR5cGVzIGluIG9uZSBhcnJhbmdlbWVudCxcbiAqICAgICAgICBub3cgdGhhdCB3ZSBjYW4gaGF2ZSB0aGVtIHRvZ2V0aGVyIVxuICogIGhhbmRsZURlZmF1bHRzOiBmdW5jdGlvbiBvZiAoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBjb2VyY2UsIG9wdHMpXG4gKiAgICAgIHRoaXMgb3B0cyBvYmplY3QgaXMgcGFzc2VkIHRocm91Z2ggdG8gaGFuZGxlRGVmYXVsdHMsIHNvIGF0dGFjaCBhbnlcbiAqICAgICAgYWRkaXRpb25hbCBpdGVtcyBuZWVkZWQgYnkgdGhpcyBmdW5jdGlvbiBoZXJlIGFzIHdlbGxcbiAqIH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVTdWJwbG90RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEsIG9wdHMpIHtcbiAgICB2YXIgc3VicGxvdFR5cGUgPSBvcHRzLnR5cGU7XG4gICAgdmFyIHN1YnBsb3RBdHRyaWJ1dGVzID0gb3B0cy5hdHRyaWJ1dGVzO1xuICAgIHZhciBoYW5kbGVEZWZhdWx0cyA9IG9wdHMuaGFuZGxlRGVmYXVsdHM7XG4gICAgdmFyIHBhcnRpdGlvbiA9IG9wdHMucGFydGl0aW9uIHx8ICd4JztcblxuICAgIHZhciBpZHMgPSBsYXlvdXRPdXQuX3N1YnBsb3RzW3N1YnBsb3RUeXBlXTtcbiAgICB2YXIgaWRzTGVuZ3RoID0gaWRzLmxlbmd0aDtcblxuICAgIHZhciBiYXNlSWQgPSBpZHNMZW5ndGggJiYgaWRzWzBdLnJlcGxhY2UoL1xcZCskLywgJycpO1xuXG4gICAgdmFyIHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dDtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgc3VicGxvdEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpZHNMZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBpZHNbaV07XG5cbiAgICAgICAgLy8gdGVybmFyeSB0cmFjZXMgZ2V0IGEgbGF5b3V0IHRlcm5hcnkgZm9yIGZyZWUhXG4gICAgICAgIGlmKGxheW91dEluW2lkXSkgc3VicGxvdExheW91dEluID0gbGF5b3V0SW5baWRdO1xuICAgICAgICBlbHNlIHN1YnBsb3RMYXlvdXRJbiA9IGxheW91dEluW2lkXSA9IHt9O1xuXG4gICAgICAgIHN1YnBsb3RMYXlvdXRPdXQgPSBUZW1wbGF0ZS5uZXdDb250YWluZXIobGF5b3V0T3V0LCBpZCwgYmFzZUlkKTtcblxuICAgICAgICAvLyBBbGwgc3VicGxvdCBjb250YWluZXJzIGdldCBhIGB1aXJldmlzaW9uYCBpbmhlcml0aW5nIGZyb20gdGhlIGJhc2UuXG4gICAgICAgIC8vIEN1cnJlbnRseSBhbGwgc3VicGxvdHMgY29udGFpbmVycyBoYXZlIHNvbWUgdXNlciBpbnRlcmFjdGlvblxuICAgICAgICAvLyBhdHRyaWJ1dGVzLCBidXQgaWYgd2UgZXZlciBhZGQgb25lIHRoYXQgZG9lc24ndCwgd2Ugd291bGQgbmVlZCBhblxuICAgICAgICAvLyBvcHRpb24gdG8gc2tpcCB0aGlzIHN0ZXAuXG4gICAgICAgIGNvZXJjZSgndWlyZXZpc2lvbicsIGxheW91dE91dC51aXJldmlzaW9uKTtcblxuICAgICAgICB2YXIgZGZsdERvbWFpbnMgPSB7fTtcbiAgICAgICAgZGZsdERvbWFpbnNbcGFydGl0aW9uXSA9IFtpIC8gaWRzTGVuZ3RoLCAoaSArIDEpIC8gaWRzTGVuZ3RoXTtcbiAgICAgICAgaGFuZGxlRG9tYWluRGVmYXVsdHMoc3VicGxvdExheW91dE91dCwgbGF5b3V0T3V0LCBjb2VyY2UsIGRmbHREb21haW5zKTtcblxuICAgICAgICBvcHRzLmlkID0gaWQ7XG4gICAgICAgIGhhbmRsZURlZmF1bHRzKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgY29lcmNlLCBvcHRzKTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcblxudmFyIGNhbGNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMnKTtcbnZhciBhcnJheXNUb0NhbGNkYXRhID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hcnJheXNfdG9fY2FsY2RhdGEnKTtcbnZhciBjYWxjU2VsZWN0aW9uID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jYWxjX3NlbGVjdGlvbicpO1xudmFyIGNhbGNNYXJrZXJTaXplID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jYWxjJykuY2FsY01hcmtlclNpemU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBzdWJwbG90SWQgPSB0cmFjZS5zdWJwbG90O1xuICAgIHZhciByYWRpYWxBeGlzID0gZnVsbExheW91dFtzdWJwbG90SWRdLnJhZGlhbGF4aXM7XG4gICAgdmFyIGFuZ3VsYXJBeGlzID0gZnVsbExheW91dFtzdWJwbG90SWRdLmFuZ3VsYXJheGlzO1xuICAgIHZhciByQXJyYXkgPSByYWRpYWxBeGlzLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3InKTtcbiAgICB2YXIgdGhldGFBcnJheSA9IGFuZ3VsYXJBeGlzLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3RoZXRhJyk7XG4gICAgdmFyIGxlbiA9IHRyYWNlLl9sZW5ndGg7XG4gICAgdmFyIGNkID0gbmV3IEFycmF5KGxlbik7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHIgPSByQXJyYXlbaV07XG4gICAgICAgIHZhciB0aGV0YSA9IHRoZXRhQXJyYXlbaV07XG4gICAgICAgIHZhciBjZGkgPSBjZFtpXSA9IHt9O1xuXG4gICAgICAgIGlmKGlzTnVtZXJpYyhyKSAmJiBpc051bWVyaWModGhldGEpKSB7XG4gICAgICAgICAgICBjZGkuciA9IHI7XG4gICAgICAgICAgICBjZGkudGhldGEgPSB0aGV0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNkaS5yID0gQkFETlVNO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHBwYWQgPSBjYWxjTWFya2VyU2l6ZSh0cmFjZSwgbGVuKTtcbiAgICB0cmFjZS5fZXh0cmVtZXMueCA9IEF4ZXMuZmluZEV4dHJlbWVzKHJhZGlhbEF4aXMsIHJBcnJheSwge3BwYWQ6IHBwYWR9KTtcblxuICAgIGNhbGNDb2xvcnNjYWxlKGdkLCB0cmFjZSk7XG4gICAgYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpO1xuICAgIGNhbGNTZWxlY3Rpb24oY2QsIHRyYWNlKTtcblxuICAgIHJldHVybiBjZDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3NjYXR0ZXJwb2xhcicsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3BvbGFyJyksXG4gICAgY2F0ZWdvcmllczogWydwb2xhcicsICdzeW1ib2xzJywgJ3Nob3dMZWdlbmQnLCAnc2NhdHRlci1saWtlJ10sXG5cbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLnN1cHBseURlZmF1bHRzLFxuICAgIGNvbG9yYmFyOiByZXF1aXJlKCcuLi9zY2F0dGVyL21hcmtlcl9jb2xvcmJhcicpLFxuICAgIGZvcm1hdExhYmVsczogcmVxdWlyZSgnLi9mb3JtYXRfbGFiZWxzJyksXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJyksXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JyksXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvc3R5bGUnKS5zdHlsZSxcbiAgICBzdHlsZU9uU2VsZWN0OiByZXF1aXJlKCcuLi9zY2F0dGVyL3N0eWxlJykuc3R5bGVPblNlbGVjdCxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLmhvdmVyUG9pbnRzLFxuICAgIHNlbGVjdFBvaW50czogcmVxdWlyZSgnLi4vc2NhdHRlci9zZWxlY3QnKSxcblxuICAgIG1ldGE6IHtcbiAgICAgICAgaHJOYW1lOiAnc2NhdHRlcl9wb2xhcicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIHNjYXR0ZXJwb2xhciB0cmFjZSB0eXBlIGVuY29tcGFzc2VzIGxpbmUgY2hhcnRzLCBzY2F0dGVyIGNoYXJ0cywgdGV4dCBjaGFydHMsIGFuZCBidWJibGUgY2hhcnRzJyxcbiAgICAgICAgICAgICdpbiBwb2xhciBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ1RoZSBkYXRhIHZpc3VhbGl6ZWQgYXMgc2NhdHRlciBwb2ludCBvciBsaW5lcyBpcyBzZXQgaW4nLFxuICAgICAgICAgICAgJ2ByYCAocmFkaWFsKSBhbmQgYHRoZXRhYCAoYW5ndWxhcikgY29vcmRpbmF0ZXMnLFxuICAgICAgICAgICAgJ1RleHQgKGFwcGVhcmluZyBlaXRoZXIgb24gdGhlIGNoYXJ0IG9yIG9uIGhvdmVyIG9ubHkpIGlzIHZpYSBgdGV4dGAuJyxcbiAgICAgICAgICAgICdCdWJibGUgY2hhcnRzIGFyZSBhY2hpZXZlZCBieSBzZXR0aW5nIGBtYXJrZXIuc2l6ZWAgYW5kL29yIGBtYXJrZXIuY29sb3JgJyxcbiAgICAgICAgICAgICd0byBudW1lcmljYWwgYXJyYXlzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NhdHRlclBsb3QgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3Bsb3QnKTtcbnZhciBCQUROVU0gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvbnVtZXJpY2FsJykuQkFETlVNO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ2QsIHN1YnBsb3QsIG1vZHVsZUNhbGNEYXRhKSB7XG4gICAgdmFyIG1sYXllciA9IHN1YnBsb3QubGF5ZXJzLmZyb250cGxvdC5zZWxlY3QoJ2cuc2NhdHRlcmxheWVyJyk7XG5cbiAgICB2YXIgcGxvdGluZm8gPSB7XG4gICAgICAgIHhheGlzOiBzdWJwbG90LnhheGlzLFxuICAgICAgICB5YXhpczogc3VicGxvdC55YXhpcyxcbiAgICAgICAgcGxvdDogc3VicGxvdC5mcmFtZXdvcmssXG4gICAgICAgIGxheWVyQ2xpcElkOiBzdWJwbG90Ll9oYXNDbGlwT25BeGlzRmFsc2UgPyBzdWJwbG90LmNsaXBJZHMuZm9yVHJhY2VzIDogbnVsbFxuICAgIH07XG5cbiAgICB2YXIgcmFkaWFsQXhpcyA9IHN1YnBsb3QucmFkaWFsQXhpcztcbiAgICB2YXIgYW5ndWxhckF4aXMgPSBzdWJwbG90LmFuZ3VsYXJBeGlzO1xuXG4gICAgLy8gY29udmVydDpcbiAgICAvLyAnYycgKHIsdGhldGEpIC0+ICdnZW9tZXRyaWMnIChyLHRoZXRhKSAtPiAoeCx5KVxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGVDYWxjRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2RpID0gbW9kdWxlQ2FsY0RhdGFbaV07XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGNkaS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGNkID0gY2RpW2pdO1xuICAgICAgICAgICAgdmFyIHIgPSBjZC5yO1xuXG4gICAgICAgICAgICBpZihyID09PSBCQUROVU0pIHtcbiAgICAgICAgICAgICAgICBjZC54ID0gY2QueSA9IEJBRE5VTTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHJnID0gcmFkaWFsQXhpcy5jMmcocik7XG4gICAgICAgICAgICAgICAgdmFyIHRoZXRhZyA9IGFuZ3VsYXJBeGlzLmMyZyhjZC50aGV0YSk7XG4gICAgICAgICAgICAgICAgY2QueCA9IHJnICogTWF0aC5jb3ModGhldGFnKTtcbiAgICAgICAgICAgICAgICBjZC55ID0gcmcgKiBNYXRoLnNpbih0aGV0YWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2NhdHRlclBsb3QoZ2QsIHBsb3RpbmZvLCBtb2R1bGVDYWxjRGF0YSwgbWxheWVyKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9