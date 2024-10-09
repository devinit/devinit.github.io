(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_constants_delta_js-node_modules_plotly_js_src_plots_cartesian_posi-d94ea5"],{

/***/ "./node_modules/plotly.js/src/constants/delta.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/constants/delta.js ***!
  \*******************************************************/
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
    INCREASING: {
        COLOR: '#3D9970',
        SYMBOL: '▲'
    },
    DECREASING: {
        COLOR: '#FF4136',
        SYMBOL: '▼'
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/position_defaults.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/position_defaults.js ***!
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




var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");


module.exports = function handlePositionDefaults(containerIn, containerOut, coerce, options) {
    var counterAxes = options.counterAxes || [];
    var overlayableAxes = options.overlayableAxes || [];
    var letter = options.letter;
    var grid = options.grid;

    var dfltAnchor, dfltDomain, dfltSide, dfltPosition;

    if(grid) {
        dfltDomain = grid._domains[letter][grid._axisMap[containerOut._id]];
        dfltAnchor = grid._anchors[containerOut._id];
        if(dfltDomain) {
            dfltSide = grid[letter + 'side'].split(' ')[0];
            dfltPosition = grid.domain[letter][dfltSide === 'right' || dfltSide === 'top' ? 1 : 0];
        }
    }

    // Even if there's a grid, this axis may not be in it - fall back on non-grid defaults
    dfltDomain = dfltDomain || [0, 1];
    dfltAnchor = dfltAnchor || (isNumeric(containerIn.position) ? 'free' : (counterAxes[0] || 'free'));
    dfltSide = dfltSide || (letter === 'x' ? 'bottom' : 'left');
    dfltPosition = dfltPosition || 0;

    var anchor = Lib.coerce(containerIn, containerOut, {
        anchor: {
            valType: 'enumerated',
            values: ['free'].concat(counterAxes),
            dflt: dfltAnchor
        }
    }, 'anchor');

    if(anchor === 'free') coerce('position', dfltPosition);

    Lib.coerce(containerIn, containerOut, {
        side: {
            valType: 'enumerated',
            values: letter === 'x' ? ['bottom', 'top'] : ['left', 'right'],
            dflt: dfltSide
        }
    }, 'side');

    var overlaying = false;
    if(overlayableAxes.length) {
        overlaying = Lib.coerce(containerIn, containerOut, {
            overlaying: {
                valType: 'enumerated',
                values: [false].concat(overlayableAxes),
                dflt: false
            }
        }, 'overlaying');
    }

    if(!overlaying) {
        // TODO: right now I'm copying this domain over to overlaying axes
        // in ax.setscale()... but this means we still need (imperfect) logic
        // in the axes popover to hide domain for the overlaying axis.
        // perhaps I should make a private version _domain that all axes get???
        var domain = coerce('domain', dfltDomain);

        // according to https://www.npmjs.com/package/canvas-size
        // the minimum value of max canvas width across browsers and devices is 4096
        // which applied in the calculation below:
        if(domain[0] > domain[1] - 1 / 4096) containerOut.domain = dfltDomain;
        Lib.noneOrAll(containerIn.domain, containerOut.domain, dfltDomain);
    }

    coerce('layer');

    return containerOut;
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29uc3RhbnRzL2RlbHRhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9jYXJ0ZXNpYW4vcG9zaXRpb25fZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2RvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLDhEQUFnQjs7QUFFeEMsVUFBVSxtQkFBTyxDQUFDLDREQUFXOzs7QUFHN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUJBQWlCLGlHQUFtQzs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTywrQkFBK0IsSUFBSTtBQUN0RDtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLDJEQUEyRDtBQUN4RSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnRjNTIzODJiZTM0OGVjMWM2NWZiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgSU5DUkVBU0lORzoge1xuICAgICAgICBDT0xPUjogJyMzRDk5NzAnLFxuICAgICAgICBTWU1CT0w6ICfilrInXG4gICAgfSxcbiAgICBERUNSRUFTSU5HOiB7XG4gICAgICAgIENPTE9SOiAnI0ZGNDEzNicsXG4gICAgICAgIFNZTUJPTDogJ+KWvCdcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVQb3NpdGlvbkRlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGNvZXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBjb3VudGVyQXhlcyA9IG9wdGlvbnMuY291bnRlckF4ZXMgfHwgW107XG4gICAgdmFyIG92ZXJsYXlhYmxlQXhlcyA9IG9wdGlvbnMub3ZlcmxheWFibGVBeGVzIHx8IFtdO1xuICAgIHZhciBsZXR0ZXIgPSBvcHRpb25zLmxldHRlcjtcbiAgICB2YXIgZ3JpZCA9IG9wdGlvbnMuZ3JpZDtcblxuICAgIHZhciBkZmx0QW5jaG9yLCBkZmx0RG9tYWluLCBkZmx0U2lkZSwgZGZsdFBvc2l0aW9uO1xuXG4gICAgaWYoZ3JpZCkge1xuICAgICAgICBkZmx0RG9tYWluID0gZ3JpZC5fZG9tYWluc1tsZXR0ZXJdW2dyaWQuX2F4aXNNYXBbY29udGFpbmVyT3V0Ll9pZF1dO1xuICAgICAgICBkZmx0QW5jaG9yID0gZ3JpZC5fYW5jaG9yc1tjb250YWluZXJPdXQuX2lkXTtcbiAgICAgICAgaWYoZGZsdERvbWFpbikge1xuICAgICAgICAgICAgZGZsdFNpZGUgPSBncmlkW2xldHRlciArICdzaWRlJ10uc3BsaXQoJyAnKVswXTtcbiAgICAgICAgICAgIGRmbHRQb3NpdGlvbiA9IGdyaWQuZG9tYWluW2xldHRlcl1bZGZsdFNpZGUgPT09ICdyaWdodCcgfHwgZGZsdFNpZGUgPT09ICd0b3AnID8gMSA6IDBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXZlbiBpZiB0aGVyZSdzIGEgZ3JpZCwgdGhpcyBheGlzIG1heSBub3QgYmUgaW4gaXQgLSBmYWxsIGJhY2sgb24gbm9uLWdyaWQgZGVmYXVsdHNcbiAgICBkZmx0RG9tYWluID0gZGZsdERvbWFpbiB8fCBbMCwgMV07XG4gICAgZGZsdEFuY2hvciA9IGRmbHRBbmNob3IgfHwgKGlzTnVtZXJpYyhjb250YWluZXJJbi5wb3NpdGlvbikgPyAnZnJlZScgOiAoY291bnRlckF4ZXNbMF0gfHwgJ2ZyZWUnKSk7XG4gICAgZGZsdFNpZGUgPSBkZmx0U2lkZSB8fCAobGV0dGVyID09PSAneCcgPyAnYm90dG9tJyA6ICdsZWZ0Jyk7XG4gICAgZGZsdFBvc2l0aW9uID0gZGZsdFBvc2l0aW9uIHx8IDA7XG5cbiAgICB2YXIgYW5jaG9yID0gTGliLmNvZXJjZShjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCB7XG4gICAgICAgIGFuY2hvcjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ2ZyZWUnXS5jb25jYXQoY291bnRlckF4ZXMpLFxuICAgICAgICAgICAgZGZsdDogZGZsdEFuY2hvclxuICAgICAgICB9XG4gICAgfSwgJ2FuY2hvcicpO1xuXG4gICAgaWYoYW5jaG9yID09PSAnZnJlZScpIGNvZXJjZSgncG9zaXRpb24nLCBkZmx0UG9zaXRpb24pO1xuXG4gICAgTGliLmNvZXJjZShjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCB7XG4gICAgICAgIHNpZGU6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogbGV0dGVyID09PSAneCcgPyBbJ2JvdHRvbScsICd0b3AnXSA6IFsnbGVmdCcsICdyaWdodCddLFxuICAgICAgICAgICAgZGZsdDogZGZsdFNpZGVcbiAgICAgICAgfVxuICAgIH0sICdzaWRlJyk7XG5cbiAgICB2YXIgb3ZlcmxheWluZyA9IGZhbHNlO1xuICAgIGlmKG92ZXJsYXlhYmxlQXhlcy5sZW5ndGgpIHtcbiAgICAgICAgb3ZlcmxheWluZyA9IExpYi5jb2VyY2UoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwge1xuICAgICAgICAgICAgb3ZlcmxheWluZzoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFtmYWxzZV0uY29uY2F0KG92ZXJsYXlhYmxlQXhlcyksXG4gICAgICAgICAgICAgICAgZGZsdDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgJ292ZXJsYXlpbmcnKTtcbiAgICB9XG5cbiAgICBpZighb3ZlcmxheWluZykge1xuICAgICAgICAvLyBUT0RPOiByaWdodCBub3cgSSdtIGNvcHlpbmcgdGhpcyBkb21haW4gb3ZlciB0byBvdmVybGF5aW5nIGF4ZXNcbiAgICAgICAgLy8gaW4gYXguc2V0c2NhbGUoKS4uLiBidXQgdGhpcyBtZWFucyB3ZSBzdGlsbCBuZWVkIChpbXBlcmZlY3QpIGxvZ2ljXG4gICAgICAgIC8vIGluIHRoZSBheGVzIHBvcG92ZXIgdG8gaGlkZSBkb21haW4gZm9yIHRoZSBvdmVybGF5aW5nIGF4aXMuXG4gICAgICAgIC8vIHBlcmhhcHMgSSBzaG91bGQgbWFrZSBhIHByaXZhdGUgdmVyc2lvbiBfZG9tYWluIHRoYXQgYWxsIGF4ZXMgZ2V0Pz8/XG4gICAgICAgIHZhciBkb21haW4gPSBjb2VyY2UoJ2RvbWFpbicsIGRmbHREb21haW4pO1xuXG4gICAgICAgIC8vIGFjY29yZGluZyB0byBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9jYW52YXMtc2l6ZVxuICAgICAgICAvLyB0aGUgbWluaW11bSB2YWx1ZSBvZiBtYXggY2FudmFzIHdpZHRoIGFjcm9zcyBicm93c2VycyBhbmQgZGV2aWNlcyBpcyA0MDk2XG4gICAgICAgIC8vIHdoaWNoIGFwcGxpZWQgaW4gdGhlIGNhbGN1bGF0aW9uIGJlbG93OlxuICAgICAgICBpZihkb21haW5bMF0gPiBkb21haW5bMV0gLSAxIC8gNDA5NikgY29udGFpbmVyT3V0LmRvbWFpbiA9IGRmbHREb21haW47XG4gICAgICAgIExpYi5ub25lT3JBbGwoY29udGFpbmVySW4uZG9tYWluLCBjb250YWluZXJPdXQuZG9tYWluLCBkZmx0RG9tYWluKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2xheWVyJyk7XG5cbiAgICByZXR1cm4gY29udGFpbmVyT3V0O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxuLyoqXG4gKiBNYWtlIGEgeHkgZG9tYWluIGF0dHJpYnV0ZSBncm91cFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMubmFtZTogbmFtZSB0byBiZSBpbnNlcnRlZCBpbiB0aGUgZGVmYXVsdCBkZXNjcmlwdGlvblxuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy50cmFjZTogc2V0IHRvIHRydWUgZm9yIHRyYWNlIGNvbnRhaW5lcnNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5lZGl0VHlwZTogZWRpdFR5cGUgZm9yIGFsbCBwaWVjZXNcbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMubm9HcmlkQ2VsbDogc2V0IHRvIHRydWUgdG8gb21pdCBgcm93YCBhbmQgYGNvbHVtbmBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0cmFcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgZXh0cmEuZGVzY3JpcHRpb246IGV4dHJhIGRlc2NyaXB0aW9uLiBOLkIgd2UgdXNlXG4gKiAgICAgYSBzZXBhcmF0ZSBleHRyYSBjb250YWluZXIgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGhcbiAqICAgICB0aGUgY29tcHJlc3NfYXR0cmlidXRlcyB0cmFuc2Zvcm0uXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBhdHRyaWJ1dGVzIG9iamVjdCBjb250YWluaW5nIHt4LHl9IGFzIHNwZWNpZmllZFxuICovXG5leHBvcnRzLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbihvcHRzLCBleHRyYSkge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGV4dHJhID0gZXh0cmEgfHwge307XG5cbiAgICB2YXIgYmFzZSA9IHtcbiAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9LFxuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9XG4gICAgICAgIF0sXG4gICAgICAgIGRmbHQ6IFswLCAxXVxuICAgIH07XG5cbiAgICB2YXIgbmFtZVBhcnQgPSBvcHRzLm5hbWUgPyBvcHRzLm5hbWUgKyAnICcgOiAnJztcbiAgICB2YXIgY29udFBhcnQgPSBvcHRzLnRyYWNlID8gJ3RyYWNlICcgOiAnc3VicGxvdCAnO1xuICAgIHZhciBkZXNjUGFydCA9IGV4dHJhLmRlc2NyaXB0aW9uID8gJyAnICsgZXh0cmEuZGVzY3JpcHRpb24gOiAnJztcblxuICAgIHZhciBvdXQgPSB7XG4gICAgICAgIHg6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGhvcml6b250YWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIHk6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHZlcnRpY2FsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZVxuICAgIH07XG5cbiAgICBpZighb3B0cy5ub0dyaWRDZWxsKSB7XG4gICAgICAgIG91dC5yb3cgPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyByb3cgaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICAgICAgb3V0LmNvbHVtbiA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIGNvbHVtbiBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5leHBvcnRzLmRlZmF1bHRzID0gZnVuY3Rpb24oY29udGFpbmVyT3V0LCBsYXlvdXQsIGNvZXJjZSwgZGZsdERvbWFpbnMpIHtcbiAgICB2YXIgZGZsdFggPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueCkgfHwgWzAsIDFdO1xuICAgIHZhciBkZmx0WSA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy55KSB8fCBbMCwgMV07XG5cbiAgICB2YXIgZ3JpZCA9IGxheW91dC5ncmlkO1xuICAgIGlmKGdyaWQpIHtcbiAgICAgICAgdmFyIGNvbHVtbiA9IGNvZXJjZSgnZG9tYWluLmNvbHVtbicpO1xuICAgICAgICBpZihjb2x1bW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoY29sdW1uIDwgZ3JpZC5jb2x1bW5zKSBkZmx0WCA9IGdyaWQuX2RvbWFpbnMueFtjb2x1bW5dO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5jb2x1bW47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm93ID0gY29lcmNlKCdkb21haW4ucm93Jyk7XG4gICAgICAgIGlmKHJvdyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihyb3cgPCBncmlkLnJvd3MpIGRmbHRZID0gZ3JpZC5fZG9tYWlucy55W3Jvd107XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLnJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB4ID0gY29lcmNlKCdkb21haW4ueCcsIGRmbHRYKTtcbiAgICB2YXIgeSA9IGNvZXJjZSgnZG9tYWluLnknLCBkZmx0WSk7XG5cbiAgICAvLyBkb24ndCBhY2NlcHQgYmFkIGlucHV0IGRhdGFcbiAgICBpZighKHhbMF0gPCB4WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi54ID0gZGZsdFguc2xpY2UoKTtcbiAgICBpZighKHlbMF0gPCB5WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi55ID0gZGZsdFkuc2xpY2UoKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9