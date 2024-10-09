(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_plots_cartesian_line_grid_defaults_js-node_modules_plotly_js_src_p-c7a6bc"],{

/***/ "./node_modules/plotly.js/src/plots/cartesian/line_grid_defaults.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/line_grid_defaults.js ***!
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



var colorMix = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js").mix;
var lightFraction = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js").lightFraction;
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

/**
 * @param {object} opts :
 *   - dfltColor {string} : default axis color
 *   - bgColor {string} : combined subplot bg color
 *   - blend {number, optional} : blend percentage (to compute dflt grid color)
 *   - showLine {boolean} : show line by default
 *   - showGrid {boolean} : show grid by default
 *   - noZeroLine {boolean} : don't coerce zeroline* attributes
 *   - attributes {object} : attribute object associated with input containers
 */
module.exports = function handleLineGridDefaults(containerIn, containerOut, coerce, opts) {
    opts = opts || {};

    var dfltColor = opts.dfltColor;

    function coerce2(attr, dflt) {
        return Lib.coerce2(containerIn, containerOut, opts.attributes, attr, dflt);
    }

    var lineColor = coerce2('linecolor', dfltColor);
    var lineWidth = coerce2('linewidth');
    var showLine = coerce('showline', opts.showLine || !!lineColor || !!lineWidth);

    if(!showLine) {
        delete containerOut.linecolor;
        delete containerOut.linewidth;
    }

    var gridColorDflt = colorMix(dfltColor, opts.bgColor, opts.blend || lightFraction).toRgbString();
    var gridColor = coerce2('gridcolor', gridColorDflt);
    var gridWidth = coerce2('gridwidth');
    var showGridLines = coerce('showgrid', opts.showGrid || !!gridColor || !!gridWidth);

    if(!showGridLines) {
        delete containerOut.gridcolor;
        delete containerOut.gridwidth;
    }

    if(!opts.noZeroLine) {
        var zeroLineColor = coerce2('zerolinecolor', dfltColor);
        var zeroLineWidth = coerce2('zerolinewidth');
        var showZeroLine = coerce('zeroline', opts.showGrid || !!zeroLineColor || !!zeroLineWidth);

        if(!showZeroLine) {
            delete containerOut.zerolinecolor;
            delete containerOut.zerolinewidth;
        }
    }
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL2xpbmVfZ3JpZF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZG9tYWluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9zdWJwbG90X2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGVBQWUsbUZBQXlCO0FBQ3hDLG9CQUFvQix5SUFBMEQ7QUFDOUUsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3QjtBQUNBLFdBQVcsT0FBTztBQUNsQixrQkFBa0IsT0FBTztBQUN6QixnQkFBZ0IsT0FBTztBQUN2QixjQUFjLGlCQUFpQjtBQUMvQixpQkFBaUIsUUFBUTtBQUN6QixpQkFBaUIsUUFBUTtBQUN6QixtQkFBbUIsUUFBUTtBQUMzQixtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixpQkFBaUIsaUdBQW1DOztBQUVwRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPLCtCQUErQixJQUFJO0FBQ3REO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsMkRBQTJEO0FBQ3hFLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixVQUFVLG1CQUFPLENBQUMseURBQVE7QUFDMUIsZUFBZSxtQkFBTyxDQUFDLHlGQUEyQjtBQUNsRCwyQkFBMkIsNEZBQTRCOzs7QUFHdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsZUFBZTtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQwMDVlMDYxNTA5MzhkYTg1ZDcyOS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNvbG9yTWl4ID0gcmVxdWlyZSgndGlueWNvbG9yMicpLm1peDtcbnZhciBsaWdodEZyYWN0aW9uID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvci9hdHRyaWJ1dGVzJykubGlnaHRGcmFjdGlvbjtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0cyA6XG4gKiAgIC0gZGZsdENvbG9yIHtzdHJpbmd9IDogZGVmYXVsdCBheGlzIGNvbG9yXG4gKiAgIC0gYmdDb2xvciB7c3RyaW5nfSA6IGNvbWJpbmVkIHN1YnBsb3QgYmcgY29sb3JcbiAqICAgLSBibGVuZCB7bnVtYmVyLCBvcHRpb25hbH0gOiBibGVuZCBwZXJjZW50YWdlICh0byBjb21wdXRlIGRmbHQgZ3JpZCBjb2xvcilcbiAqICAgLSBzaG93TGluZSB7Ym9vbGVhbn0gOiBzaG93IGxpbmUgYnkgZGVmYXVsdFxuICogICAtIHNob3dHcmlkIHtib29sZWFufSA6IHNob3cgZ3JpZCBieSBkZWZhdWx0XG4gKiAgIC0gbm9aZXJvTGluZSB7Ym9vbGVhbn0gOiBkb24ndCBjb2VyY2UgemVyb2xpbmUqIGF0dHJpYnV0ZXNcbiAqICAgLSBhdHRyaWJ1dGVzIHtvYmplY3R9IDogYXR0cmlidXRlIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggaW5wdXQgY29udGFpbmVyc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZUxpbmVHcmlkRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCBvcHRzKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICB2YXIgZGZsdENvbG9yID0gb3B0cy5kZmx0Q29sb3I7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UyKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UyKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIG9wdHMuYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIGxpbmVDb2xvciA9IGNvZXJjZTIoJ2xpbmVjb2xvcicsIGRmbHRDb2xvcik7XG4gICAgdmFyIGxpbmVXaWR0aCA9IGNvZXJjZTIoJ2xpbmV3aWR0aCcpO1xuICAgIHZhciBzaG93TGluZSA9IGNvZXJjZSgnc2hvd2xpbmUnLCBvcHRzLnNob3dMaW5lIHx8ICEhbGluZUNvbG9yIHx8ICEhbGluZVdpZHRoKTtcblxuICAgIGlmKCFzaG93TGluZSkge1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LmxpbmVjb2xvcjtcbiAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC5saW5ld2lkdGg7XG4gICAgfVxuXG4gICAgdmFyIGdyaWRDb2xvckRmbHQgPSBjb2xvck1peChkZmx0Q29sb3IsIG9wdHMuYmdDb2xvciwgb3B0cy5ibGVuZCB8fCBsaWdodEZyYWN0aW9uKS50b1JnYlN0cmluZygpO1xuICAgIHZhciBncmlkQ29sb3IgPSBjb2VyY2UyKCdncmlkY29sb3InLCBncmlkQ29sb3JEZmx0KTtcbiAgICB2YXIgZ3JpZFdpZHRoID0gY29lcmNlMignZ3JpZHdpZHRoJyk7XG4gICAgdmFyIHNob3dHcmlkTGluZXMgPSBjb2VyY2UoJ3Nob3dncmlkJywgb3B0cy5zaG93R3JpZCB8fCAhIWdyaWRDb2xvciB8fCAhIWdyaWRXaWR0aCk7XG5cbiAgICBpZighc2hvd0dyaWRMaW5lcykge1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LmdyaWRjb2xvcjtcbiAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC5ncmlkd2lkdGg7XG4gICAgfVxuXG4gICAgaWYoIW9wdHMubm9aZXJvTGluZSkge1xuICAgICAgICB2YXIgemVyb0xpbmVDb2xvciA9IGNvZXJjZTIoJ3plcm9saW5lY29sb3InLCBkZmx0Q29sb3IpO1xuICAgICAgICB2YXIgemVyb0xpbmVXaWR0aCA9IGNvZXJjZTIoJ3plcm9saW5ld2lkdGgnKTtcbiAgICAgICAgdmFyIHNob3daZXJvTGluZSA9IGNvZXJjZSgnemVyb2xpbmUnLCBvcHRzLnNob3dHcmlkIHx8ICEhemVyb0xpbmVDb2xvciB8fCAhIXplcm9MaW5lV2lkdGgpO1xuXG4gICAgICAgIGlmKCFzaG93WmVyb0xpbmUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQuemVyb2xpbmVjb2xvcjtcbiAgICAgICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQuemVyb2xpbmV3aWR0aDtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbi8qKlxuICogTWFrZSBhIHh5IGRvbWFpbiBhdHRyaWJ1dGUgZ3JvdXBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLm5hbWU6IG5hbWUgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIGRlZmF1bHQgZGVzY3JpcHRpb25cbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMudHJhY2U6IHNldCB0byB0cnVlIGZvciB0cmFjZSBjb250YWluZXJzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMuZWRpdFR5cGU6IGVkaXRUeXBlIGZvciBhbGwgcGllY2VzXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLm5vR3JpZENlbGw6IHNldCB0byB0cnVlIHRvIG9taXQgYHJvd2AgYW5kIGBjb2x1bW5gXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIGV4dHJhLmRlc2NyaXB0aW9uOiBleHRyYSBkZXNjcmlwdGlvbi4gTi5CIHdlIHVzZVxuICogICAgIGEgc2VwYXJhdGUgZXh0cmEgY29udGFpbmVyIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoXG4gKiAgICAgdGhlIGNvbXByZXNzX2F0dHJpYnV0ZXMgdHJhbnNmb3JtLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYXR0cmlidXRlcyBvYmplY3QgY29udGFpbmluZyB7eCx5fSBhcyBzcGVjaWZpZWRcbiAqL1xuZXhwb3J0cy5hdHRyaWJ1dGVzID0gZnVuY3Rpb24ob3B0cywgZXh0cmEpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBleHRyYSA9IGV4dHJhIHx8IHt9O1xuXG4gICAgdmFyIGJhc2UgPSB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfVxuICAgICAgICBdLFxuICAgICAgICBkZmx0OiBbMCwgMV1cbiAgICB9O1xuXG4gICAgdmFyIG5hbWVQYXJ0ID0gb3B0cy5uYW1lID8gb3B0cy5uYW1lICsgJyAnIDogJyc7XG4gICAgdmFyIGNvbnRQYXJ0ID0gb3B0cy50cmFjZSA/ICd0cmFjZSAnIDogJ3N1YnBsb3QgJztcbiAgICB2YXIgZGVzY1BhcnQgPSBleHRyYS5kZXNjcmlwdGlvbiA/ICcgJyArIGV4dHJhLmRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICB4OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3Jpem9udGFsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICB5OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB2ZXJ0aWNhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGVcbiAgICB9O1xuXG4gICAgaWYoIW9wdHMubm9HcmlkQ2VsbCkge1xuICAgICAgICBvdXQucm93ID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgcm93IGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgICAgIG91dC5jb2x1bW4gPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyBjb2x1bW4gaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbnRhaW5lck91dCwgbGF5b3V0LCBjb2VyY2UsIGRmbHREb21haW5zKSB7XG4gICAgdmFyIGRmbHRYID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLngpIHx8IFswLCAxXTtcbiAgICB2YXIgZGZsdFkgPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueSkgfHwgWzAsIDFdO1xuXG4gICAgdmFyIGdyaWQgPSBsYXlvdXQuZ3JpZDtcbiAgICBpZihncmlkKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBjb2VyY2UoJ2RvbWFpbi5jb2x1bW4nKTtcbiAgICAgICAgaWYoY29sdW1uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGNvbHVtbiA8IGdyaWQuY29sdW1ucykgZGZsdFggPSBncmlkLl9kb21haW5zLnhbY29sdW1uXTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4uY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IGNvZXJjZSgnZG9tYWluLnJvdycpO1xuICAgICAgICBpZihyb3cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYocm93IDwgZ3JpZC5yb3dzKSBkZmx0WSA9IGdyaWQuX2RvbWFpbnMueVtyb3ddO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5yb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgnZG9tYWluLngnLCBkZmx0WCk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ2RvbWFpbi55JywgZGZsdFkpO1xuXG4gICAgLy8gZG9uJ3QgYWNjZXB0IGJhZCBpbnB1dCBkYXRhXG4gICAgaWYoISh4WzBdIDwgeFsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueCA9IGRmbHRYLnNsaWNlKCk7XG4gICAgaWYoISh5WzBdIDwgeVsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueSA9IGRmbHRZLnNsaWNlKCk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi9saWInKTtcbnZhciBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4vZG9tYWluJykuZGVmYXVsdHM7XG5cblxuLyoqXG4gKiBGaW5kIGFuZCBzdXBwbHkgZGVmYXVsdHMgdG8gYWxsIHN1YnBsb3RzIG9mIGEgZ2l2ZW4gdHlwZVxuICogVGhpcyBoYW5kbGVzIHN1YnBsb3RzIHRoYXQgYXJlIGNvbnRhaW5lZCB3aXRoaW4gb25lIGNvbnRhaW5lciAtIHNvXG4gKiBnbDNkLCBnZW8sIHRlcm5hcnkuLi4gYnV0IG5vdCAyZCBheGVzIHdoaWNoIGhhdmUgc2VwYXJhdGUgeCBhbmQgeSBheGVzXG4gKiBmaW5kcyBzdWJwbG90cywgY29lcmNlcyB0aGVpciBgZG9tYWluYCBhdHRyaWJ1dGVzLCB0aGVuIGNhbGxzIHRoZVxuICogZ2l2ZW4gaGFuZGxlRGVmYXVsdHMgZnVuY3Rpb24gdG8gZmlsbCBpbiBldmVyeXRoaW5nIGVsc2UuXG4gKlxuICogbGF5b3V0SW46IHRoZSBjb21wbGV0ZSB1c2VyLXN1cHBsaWVkIGlucHV0IGxheW91dFxuICogbGF5b3V0T3V0OiB0aGUgY29tcGxldGUgZmluaXNoZWQgbGF5b3V0XG4gKiBmdWxsRGF0YTogdGhlIGZpbmlzaGVkIGRhdGEgYXJyYXksIHVzZWQgb25seSB0byBmaW5kIHN1YnBsb3RzXG4gKiBvcHRzOiB7XG4gKiAgdHlwZTogc3VicGxvdCB0eXBlIHN0cmluZ1xuICogIGF0dHJpYnV0ZXM6IHN1YnBsb3QgYXR0cmlidXRlcyBvYmplY3RcbiAqICBwYXJ0aXRpb246ICd4JyBvciAneScsIHdoaWNoIGRpcmVjdGlvbiB0byBkaXZpZGUgZG9tYWluIHNwYWNlIGJ5IGRlZmF1bHRcbiAqICAgICAgKGRlZmF1bHQgJ3gnLCBpZSBzaWRlLWJ5LXNpZGUgc3VicGxvdHMpXG4gKiAgICAgIFRPRE86IHRoaXMgb3B0aW9uIGlzIG9ubHkgaGVyZSBiZWNhdXNlIDNEIGFuZCBnZW8gbWFkZSBvcHBvc2l0ZVxuICogICAgICBjaG9pY2VzIGluIHRoaXMgcmVnYXJkIHByZXZpb3VzbHkgYW5kIEkgZGlkbid0IHdhbnQgdG8gY2hhbmdlIGl0LlxuICogICAgICBJbnN0ZWFkIHdlIHNob3VsZCBkbzpcbiAqICAgICAgLSBzb21ldGhpbmcgY29uc2lzdGVudFxuICogICAgICAtIHNvbWV0aGluZyBtb3JlIHNxdWFyZSAoNCBjdXRzIDJ4MiwgNS82IGN1dHMgMngzLCBldGMuKVxuICogICAgICAtIHNvbWV0aGluZyB0aGF0IGluY2x1ZGVzIGFsbCBzdWJwbG90IHR5cGVzIGluIG9uZSBhcnJhbmdlbWVudCxcbiAqICAgICAgICBub3cgdGhhdCB3ZSBjYW4gaGF2ZSB0aGVtIHRvZ2V0aGVyIVxuICogIGhhbmRsZURlZmF1bHRzOiBmdW5jdGlvbiBvZiAoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBjb2VyY2UsIG9wdHMpXG4gKiAgICAgIHRoaXMgb3B0cyBvYmplY3QgaXMgcGFzc2VkIHRocm91Z2ggdG8gaGFuZGxlRGVmYXVsdHMsIHNvIGF0dGFjaCBhbnlcbiAqICAgICAgYWRkaXRpb25hbCBpdGVtcyBuZWVkZWQgYnkgdGhpcyBmdW5jdGlvbiBoZXJlIGFzIHdlbGxcbiAqIH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVTdWJwbG90RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEsIG9wdHMpIHtcbiAgICB2YXIgc3VicGxvdFR5cGUgPSBvcHRzLnR5cGU7XG4gICAgdmFyIHN1YnBsb3RBdHRyaWJ1dGVzID0gb3B0cy5hdHRyaWJ1dGVzO1xuICAgIHZhciBoYW5kbGVEZWZhdWx0cyA9IG9wdHMuaGFuZGxlRGVmYXVsdHM7XG4gICAgdmFyIHBhcnRpdGlvbiA9IG9wdHMucGFydGl0aW9uIHx8ICd4JztcblxuICAgIHZhciBpZHMgPSBsYXlvdXRPdXQuX3N1YnBsb3RzW3N1YnBsb3RUeXBlXTtcbiAgICB2YXIgaWRzTGVuZ3RoID0gaWRzLmxlbmd0aDtcblxuICAgIHZhciBiYXNlSWQgPSBpZHNMZW5ndGggJiYgaWRzWzBdLnJlcGxhY2UoL1xcZCskLywgJycpO1xuXG4gICAgdmFyIHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dDtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgc3VicGxvdEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpZHNMZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBpZHNbaV07XG5cbiAgICAgICAgLy8gdGVybmFyeSB0cmFjZXMgZ2V0IGEgbGF5b3V0IHRlcm5hcnkgZm9yIGZyZWUhXG4gICAgICAgIGlmKGxheW91dEluW2lkXSkgc3VicGxvdExheW91dEluID0gbGF5b3V0SW5baWRdO1xuICAgICAgICBlbHNlIHN1YnBsb3RMYXlvdXRJbiA9IGxheW91dEluW2lkXSA9IHt9O1xuXG4gICAgICAgIHN1YnBsb3RMYXlvdXRPdXQgPSBUZW1wbGF0ZS5uZXdDb250YWluZXIobGF5b3V0T3V0LCBpZCwgYmFzZUlkKTtcblxuICAgICAgICAvLyBBbGwgc3VicGxvdCBjb250YWluZXJzIGdldCBhIGB1aXJldmlzaW9uYCBpbmhlcml0aW5nIGZyb20gdGhlIGJhc2UuXG4gICAgICAgIC8vIEN1cnJlbnRseSBhbGwgc3VicGxvdHMgY29udGFpbmVycyBoYXZlIHNvbWUgdXNlciBpbnRlcmFjdGlvblxuICAgICAgICAvLyBhdHRyaWJ1dGVzLCBidXQgaWYgd2UgZXZlciBhZGQgb25lIHRoYXQgZG9lc24ndCwgd2Ugd291bGQgbmVlZCBhblxuICAgICAgICAvLyBvcHRpb24gdG8gc2tpcCB0aGlzIHN0ZXAuXG4gICAgICAgIGNvZXJjZSgndWlyZXZpc2lvbicsIGxheW91dE91dC51aXJldmlzaW9uKTtcblxuICAgICAgICB2YXIgZGZsdERvbWFpbnMgPSB7fTtcbiAgICAgICAgZGZsdERvbWFpbnNbcGFydGl0aW9uXSA9IFtpIC8gaWRzTGVuZ3RoLCAoaSArIDEpIC8gaWRzTGVuZ3RoXTtcbiAgICAgICAgaGFuZGxlRG9tYWluRGVmYXVsdHMoc3VicGxvdExheW91dE91dCwgbGF5b3V0T3V0LCBjb2VyY2UsIGRmbHREb21haW5zKTtcblxuICAgICAgICBvcHRzLmlkID0gaWQ7XG4gICAgICAgIGhhbmRsZURlZmF1bHRzKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgY29lcmNlLCBvcHRzKTtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==