(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_plots_subplot_defaults_js-node_modules_plotly_js_src_traces_scatte-f9bdb9"],{

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZG9tYWluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9zdWJwbG90X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9hcnJheXNfdG9fY2FsY2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL2NhbGNfc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGlCQUFpQixpR0FBbUM7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU8sK0JBQStCLElBQUk7QUFDdEQ7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwyREFBMkQ7QUFDeEUsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyx5REFBUTtBQUMxQixlQUFlLG1CQUFPLENBQUMseUZBQTJCO0FBQ2xELDJCQUEyQiw0RkFBNEI7OztBQUd2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixlQUFlO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7OztBQUc3QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZUFBZTs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ3M2Y3YWIwODIyOTUzZGZkNTFlOC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxuLyoqXG4gKiBNYWtlIGEgeHkgZG9tYWluIGF0dHJpYnV0ZSBncm91cFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMubmFtZTogbmFtZSB0byBiZSBpbnNlcnRlZCBpbiB0aGUgZGVmYXVsdCBkZXNjcmlwdGlvblxuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy50cmFjZTogc2V0IHRvIHRydWUgZm9yIHRyYWNlIGNvbnRhaW5lcnNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5lZGl0VHlwZTogZWRpdFR5cGUgZm9yIGFsbCBwaWVjZXNcbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMubm9HcmlkQ2VsbDogc2V0IHRvIHRydWUgdG8gb21pdCBgcm93YCBhbmQgYGNvbHVtbmBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0cmFcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgZXh0cmEuZGVzY3JpcHRpb246IGV4dHJhIGRlc2NyaXB0aW9uLiBOLkIgd2UgdXNlXG4gKiAgICAgYSBzZXBhcmF0ZSBleHRyYSBjb250YWluZXIgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGhcbiAqICAgICB0aGUgY29tcHJlc3NfYXR0cmlidXRlcyB0cmFuc2Zvcm0uXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBhdHRyaWJ1dGVzIG9iamVjdCBjb250YWluaW5nIHt4LHl9IGFzIHNwZWNpZmllZFxuICovXG5leHBvcnRzLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbihvcHRzLCBleHRyYSkge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGV4dHJhID0gZXh0cmEgfHwge307XG5cbiAgICB2YXIgYmFzZSA9IHtcbiAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9LFxuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9XG4gICAgICAgIF0sXG4gICAgICAgIGRmbHQ6IFswLCAxXVxuICAgIH07XG5cbiAgICB2YXIgbmFtZVBhcnQgPSBvcHRzLm5hbWUgPyBvcHRzLm5hbWUgKyAnICcgOiAnJztcbiAgICB2YXIgY29udFBhcnQgPSBvcHRzLnRyYWNlID8gJ3RyYWNlICcgOiAnc3VicGxvdCAnO1xuICAgIHZhciBkZXNjUGFydCA9IGV4dHJhLmRlc2NyaXB0aW9uID8gJyAnICsgZXh0cmEuZGVzY3JpcHRpb24gOiAnJztcblxuICAgIHZhciBvdXQgPSB7XG4gICAgICAgIHg6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGhvcml6b250YWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIHk6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHZlcnRpY2FsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZVxuICAgIH07XG5cbiAgICBpZighb3B0cy5ub0dyaWRDZWxsKSB7XG4gICAgICAgIG91dC5yb3cgPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyByb3cgaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICAgICAgb3V0LmNvbHVtbiA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIGNvbHVtbiBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5leHBvcnRzLmRlZmF1bHRzID0gZnVuY3Rpb24oY29udGFpbmVyT3V0LCBsYXlvdXQsIGNvZXJjZSwgZGZsdERvbWFpbnMpIHtcbiAgICB2YXIgZGZsdFggPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueCkgfHwgWzAsIDFdO1xuICAgIHZhciBkZmx0WSA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy55KSB8fCBbMCwgMV07XG5cbiAgICB2YXIgZ3JpZCA9IGxheW91dC5ncmlkO1xuICAgIGlmKGdyaWQpIHtcbiAgICAgICAgdmFyIGNvbHVtbiA9IGNvZXJjZSgnZG9tYWluLmNvbHVtbicpO1xuICAgICAgICBpZihjb2x1bW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoY29sdW1uIDwgZ3JpZC5jb2x1bW5zKSBkZmx0WCA9IGdyaWQuX2RvbWFpbnMueFtjb2x1bW5dO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5jb2x1bW47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm93ID0gY29lcmNlKCdkb21haW4ucm93Jyk7XG4gICAgICAgIGlmKHJvdyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihyb3cgPCBncmlkLnJvd3MpIGRmbHRZID0gZ3JpZC5fZG9tYWlucy55W3Jvd107XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLnJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB4ID0gY29lcmNlKCdkb21haW4ueCcsIGRmbHRYKTtcbiAgICB2YXIgeSA9IGNvZXJjZSgnZG9tYWluLnknLCBkZmx0WSk7XG5cbiAgICAvLyBkb24ndCBhY2NlcHQgYmFkIGlucHV0IGRhdGFcbiAgICBpZighKHhbMF0gPCB4WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi54ID0gZGZsdFguc2xpY2UoKTtcbiAgICBpZighKHlbMF0gPCB5WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi55ID0gZGZsdFkuc2xpY2UoKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uL2xpYicpO1xudmFyIFRlbXBsYXRlID0gcmVxdWlyZSgnLi4vcGxvdF9hcGkvcGxvdF90ZW1wbGF0ZScpO1xudmFyIGhhbmRsZURvbWFpbkRlZmF1bHRzID0gcmVxdWlyZSgnLi9kb21haW4nKS5kZWZhdWx0cztcblxuXG4vKipcbiAqIEZpbmQgYW5kIHN1cHBseSBkZWZhdWx0cyB0byBhbGwgc3VicGxvdHMgb2YgYSBnaXZlbiB0eXBlXG4gKiBUaGlzIGhhbmRsZXMgc3VicGxvdHMgdGhhdCBhcmUgY29udGFpbmVkIHdpdGhpbiBvbmUgY29udGFpbmVyIC0gc29cbiAqIGdsM2QsIGdlbywgdGVybmFyeS4uLiBidXQgbm90IDJkIGF4ZXMgd2hpY2ggaGF2ZSBzZXBhcmF0ZSB4IGFuZCB5IGF4ZXNcbiAqIGZpbmRzIHN1YnBsb3RzLCBjb2VyY2VzIHRoZWlyIGBkb21haW5gIGF0dHJpYnV0ZXMsIHRoZW4gY2FsbHMgdGhlXG4gKiBnaXZlbiBoYW5kbGVEZWZhdWx0cyBmdW5jdGlvbiB0byBmaWxsIGluIGV2ZXJ5dGhpbmcgZWxzZS5cbiAqXG4gKiBsYXlvdXRJbjogdGhlIGNvbXBsZXRlIHVzZXItc3VwcGxpZWQgaW5wdXQgbGF5b3V0XG4gKiBsYXlvdXRPdXQ6IHRoZSBjb21wbGV0ZSBmaW5pc2hlZCBsYXlvdXRcbiAqIGZ1bGxEYXRhOiB0aGUgZmluaXNoZWQgZGF0YSBhcnJheSwgdXNlZCBvbmx5IHRvIGZpbmQgc3VicGxvdHNcbiAqIG9wdHM6IHtcbiAqICB0eXBlOiBzdWJwbG90IHR5cGUgc3RyaW5nXG4gKiAgYXR0cmlidXRlczogc3VicGxvdCBhdHRyaWJ1dGVzIG9iamVjdFxuICogIHBhcnRpdGlvbjogJ3gnIG9yICd5Jywgd2hpY2ggZGlyZWN0aW9uIHRvIGRpdmlkZSBkb21haW4gc3BhY2UgYnkgZGVmYXVsdFxuICogICAgICAoZGVmYXVsdCAneCcsIGllIHNpZGUtYnktc2lkZSBzdWJwbG90cylcbiAqICAgICAgVE9ETzogdGhpcyBvcHRpb24gaXMgb25seSBoZXJlIGJlY2F1c2UgM0QgYW5kIGdlbyBtYWRlIG9wcG9zaXRlXG4gKiAgICAgIGNob2ljZXMgaW4gdGhpcyByZWdhcmQgcHJldmlvdXNseSBhbmQgSSBkaWRuJ3Qgd2FudCB0byBjaGFuZ2UgaXQuXG4gKiAgICAgIEluc3RlYWQgd2Ugc2hvdWxkIGRvOlxuICogICAgICAtIHNvbWV0aGluZyBjb25zaXN0ZW50XG4gKiAgICAgIC0gc29tZXRoaW5nIG1vcmUgc3F1YXJlICg0IGN1dHMgMngyLCA1LzYgY3V0cyAyeDMsIGV0Yy4pXG4gKiAgICAgIC0gc29tZXRoaW5nIHRoYXQgaW5jbHVkZXMgYWxsIHN1YnBsb3QgdHlwZXMgaW4gb25lIGFycmFuZ2VtZW50LFxuICogICAgICAgIG5vdyB0aGF0IHdlIGNhbiBoYXZlIHRoZW0gdG9nZXRoZXIhXG4gKiAgaGFuZGxlRGVmYXVsdHM6IGZ1bmN0aW9uIG9mIChzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIGNvZXJjZSwgb3B0cylcbiAqICAgICAgdGhpcyBvcHRzIG9iamVjdCBpcyBwYXNzZWQgdGhyb3VnaCB0byBoYW5kbGVEZWZhdWx0cywgc28gYXR0YWNoIGFueVxuICogICAgICBhZGRpdGlvbmFsIGl0ZW1zIG5lZWRlZCBieSB0aGlzIGZ1bmN0aW9uIGhlcmUgYXMgd2VsbFxuICogfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVN1YnBsb3REZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSwgb3B0cykge1xuICAgIHZhciBzdWJwbG90VHlwZSA9IG9wdHMudHlwZTtcbiAgICB2YXIgc3VicGxvdEF0dHJpYnV0ZXMgPSBvcHRzLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGhhbmRsZURlZmF1bHRzID0gb3B0cy5oYW5kbGVEZWZhdWx0cztcbiAgICB2YXIgcGFydGl0aW9uID0gb3B0cy5wYXJ0aXRpb24gfHwgJ3gnO1xuXG4gICAgdmFyIGlkcyA9IGxheW91dE91dC5fc3VicGxvdHNbc3VicGxvdFR5cGVdO1xuICAgIHZhciBpZHNMZW5ndGggPSBpZHMubGVuZ3RoO1xuXG4gICAgdmFyIGJhc2VJZCA9IGlkc0xlbmd0aCAmJiBpZHNbMF0ucmVwbGFjZSgvXFxkKyQvLCAnJyk7XG5cbiAgICB2YXIgc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0O1xuXG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2Uoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBzdWJwbG90QXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGlkc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IGlkc1tpXTtcblxuICAgICAgICAvLyB0ZXJuYXJ5IHRyYWNlcyBnZXQgYSBsYXlvdXQgdGVybmFyeSBmb3IgZnJlZSFcbiAgICAgICAgaWYobGF5b3V0SW5baWRdKSBzdWJwbG90TGF5b3V0SW4gPSBsYXlvdXRJbltpZF07XG4gICAgICAgIGVsc2Ugc3VicGxvdExheW91dEluID0gbGF5b3V0SW5baWRdID0ge307XG5cbiAgICAgICAgc3VicGxvdExheW91dE91dCA9IFRlbXBsYXRlLm5ld0NvbnRhaW5lcihsYXlvdXRPdXQsIGlkLCBiYXNlSWQpO1xuXG4gICAgICAgIC8vIEFsbCBzdWJwbG90IGNvbnRhaW5lcnMgZ2V0IGEgYHVpcmV2aXNpb25gIGluaGVyaXRpbmcgZnJvbSB0aGUgYmFzZS5cbiAgICAgICAgLy8gQ3VycmVudGx5IGFsbCBzdWJwbG90cyBjb250YWluZXJzIGhhdmUgc29tZSB1c2VyIGludGVyYWN0aW9uXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMsIGJ1dCBpZiB3ZSBldmVyIGFkZCBvbmUgdGhhdCBkb2Vzbid0LCB3ZSB3b3VsZCBuZWVkIGFuXG4gICAgICAgIC8vIG9wdGlvbiB0byBza2lwIHRoaXMgc3RlcC5cbiAgICAgICAgY29lcmNlKCd1aXJldmlzaW9uJywgbGF5b3V0T3V0LnVpcmV2aXNpb24pO1xuXG4gICAgICAgIHZhciBkZmx0RG9tYWlucyA9IHt9O1xuICAgICAgICBkZmx0RG9tYWluc1twYXJ0aXRpb25dID0gW2kgLyBpZHNMZW5ndGgsIChpICsgMSkgLyBpZHNMZW5ndGhdO1xuICAgICAgICBoYW5kbGVEb21haW5EZWZhdWx0cyhzdWJwbG90TGF5b3V0T3V0LCBsYXlvdXRPdXQsIGNvZXJjZSwgZGZsdERvbWFpbnMpO1xuXG4gICAgICAgIG9wdHMuaWQgPSBpZDtcbiAgICAgICAgaGFuZGxlRGVmYXVsdHMoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBjb2VyY2UsIG9wdHMpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG5cbi8vIGFycmF5T2sgYXR0cmlidXRlcywgbWVyZ2UgdGhlbSBpbnRvIGNhbGNkYXRhIGFycmF5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5c1RvQ2FsY2RhdGEoY2QsIHRyYWNlKSB7XG4gICAgLy8gc28gZWFjaCBwb2ludCBrbm93cyB3aGljaCBpbmRleCBpdCBvcmlnaW5hbGx5IGNhbWUgZnJvbVxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjZC5sZW5ndGg7IGkrKykgY2RbaV0uaSA9IGk7XG5cbiAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS50ZXh0LCBjZCwgJ3R4Jyk7XG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dHRlbXBsYXRlLCBjZCwgJ3R4dCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLmhvdmVydGV4dCwgY2QsICdodHgnKTtcbiAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS5jdXN0b21kYXRhLCBjZCwgJ2RhdGEnKTtcbiAgICBMaWIubWVyZ2VBcnJheSh0cmFjZS50ZXh0cG9zaXRpb24sIGNkLCAndHAnKTtcbiAgICBpZih0cmFjZS50ZXh0Zm9udCkge1xuICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZSh0cmFjZS50ZXh0Zm9udC5zaXplLCBjZCwgJ3RzJyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLnRleHRmb250LmNvbG9yLCBjZCwgJ3RjJyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLnRleHRmb250LmZhbWlseSwgY2QsICd0ZicpO1xuICAgIH1cblxuICAgIHZhciBtYXJrZXIgPSB0cmFjZS5tYXJrZXI7XG4gICAgaWYobWFya2VyKSB7XG4gICAgICAgIExpYi5tZXJnZUFycmF5Q2FzdFBvc2l0aXZlKG1hcmtlci5zaXplLCBjZCwgJ21zJyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5Q2FzdFBvc2l0aXZlKG1hcmtlci5vcGFjaXR5LCBjZCwgJ21vJyk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5zeW1ib2wsIGNkLCAnbXgnKTtcbiAgICAgICAgTGliLm1lcmdlQXJyYXkobWFya2VyLmNvbG9yLCBjZCwgJ21jJyk7XG5cbiAgICAgICAgdmFyIG1hcmtlckxpbmUgPSBtYXJrZXIubGluZTtcbiAgICAgICAgaWYobWFya2VyLmxpbmUpIHtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckxpbmUuY29sb3IsIGNkLCAnbWxjJyk7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXJMaW5lLndpZHRoLCBjZCwgJ21sdycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hcmtlckdyYWRpZW50ID0gbWFya2VyLmdyYWRpZW50O1xuICAgICAgICBpZihtYXJrZXJHcmFkaWVudCAmJiBtYXJrZXJHcmFkaWVudC50eXBlICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckdyYWRpZW50LnR5cGUsIGNkLCAnbWd0Jyk7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheShtYXJrZXJHcmFkaWVudC5jb2xvciwgY2QsICdtZ2MnKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjU2VsZWN0aW9uKGNkLCB0cmFjZSkge1xuICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlLnNlbGVjdGVkcG9pbnRzKSkge1xuICAgICAgICBMaWIudGFnU2VsZWN0ZWQoY2QsIHRyYWNlKTtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==