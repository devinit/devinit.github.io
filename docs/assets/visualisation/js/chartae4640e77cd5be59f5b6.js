(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_lib_gup_js-node_modules_plotly_js_src_plots_domain_js-_0a3e-_81f00"],{

/***/ "./node_modules/plotly.js/src/lib/gup.js":
/*!***********************************************!*\
  !*** ./node_modules/plotly.js/src/lib/gup.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var identity = __webpack_require__(/*! ./identity */ "./node_modules/plotly.js/src/lib/identity.js");

function wrap(d) {return [d];}

module.exports = {

    // The D3 data binding concept and the General Update Pattern promotes the idea of
    // traversing into the scenegraph by using the `.data(fun, keyFun)` call.
    // The `fun` is most often a `repeat`, ie. the elements beneath a `<g>` element need
    // access to the same data, or a `descend`, which fans a scenegraph node into a bunch of
    // of elements, e.g. points, lines, rows, requiring an array as input.
    // The role of the `keyFun` is to identify what elements are being entered/exited/updated,
    // otherwise D3 reverts to using a plain index which would screw up `transition`s.
    keyFun: function(d) {return d.key;},
    repeat: wrap,
    descend: identity,

    // Plotly.js uses a convention of storing the actual contents of the `calcData` as the
    // element zero of a container array. These helpers are just used for clarity as a
    // newcomer to the codebase may not know what the `[0]` is, and whether there can be further
    // elements (not atm).
    wrap: wrap,
    unwrap: function(d) {return d[0];}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvbGliL2d1cC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZG9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGVBQWUsbUJBQU8sQ0FBQyxnRUFBWTs7QUFFbkMsa0JBQWtCOztBQUVsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixjQUFjO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qjs7Ozs7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGlCQUFpQixpR0FBbUM7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU8sK0JBQStCLElBQUk7QUFDdEQ7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwyREFBMkQ7QUFDeEUsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0YWU0NjQwZTc3Y2Q1YmU1OWY1YjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuZnVuY3Rpb24gd3JhcChkKSB7cmV0dXJuIFtkXTt9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLy8gVGhlIEQzIGRhdGEgYmluZGluZyBjb25jZXB0IGFuZCB0aGUgR2VuZXJhbCBVcGRhdGUgUGF0dGVybiBwcm9tb3RlcyB0aGUgaWRlYSBvZlxuICAgIC8vIHRyYXZlcnNpbmcgaW50byB0aGUgc2NlbmVncmFwaCBieSB1c2luZyB0aGUgYC5kYXRhKGZ1biwga2V5RnVuKWAgY2FsbC5cbiAgICAvLyBUaGUgYGZ1bmAgaXMgbW9zdCBvZnRlbiBhIGByZXBlYXRgLCBpZS4gdGhlIGVsZW1lbnRzIGJlbmVhdGggYSBgPGc+YCBlbGVtZW50IG5lZWRcbiAgICAvLyBhY2Nlc3MgdG8gdGhlIHNhbWUgZGF0YSwgb3IgYSBgZGVzY2VuZGAsIHdoaWNoIGZhbnMgYSBzY2VuZWdyYXBoIG5vZGUgaW50byBhIGJ1bmNoIG9mXG4gICAgLy8gb2YgZWxlbWVudHMsIGUuZy4gcG9pbnRzLCBsaW5lcywgcm93cywgcmVxdWlyaW5nIGFuIGFycmF5IGFzIGlucHV0LlxuICAgIC8vIFRoZSByb2xlIG9mIHRoZSBga2V5RnVuYCBpcyB0byBpZGVudGlmeSB3aGF0IGVsZW1lbnRzIGFyZSBiZWluZyBlbnRlcmVkL2V4aXRlZC91cGRhdGVkLFxuICAgIC8vIG90aGVyd2lzZSBEMyByZXZlcnRzIHRvIHVzaW5nIGEgcGxhaW4gaW5kZXggd2hpY2ggd291bGQgc2NyZXcgdXAgYHRyYW5zaXRpb25gcy5cbiAgICBrZXlGdW46IGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5rZXk7fSxcbiAgICByZXBlYXQ6IHdyYXAsXG4gICAgZGVzY2VuZDogaWRlbnRpdHksXG5cbiAgICAvLyBQbG90bHkuanMgdXNlcyBhIGNvbnZlbnRpb24gb2Ygc3RvcmluZyB0aGUgYWN0dWFsIGNvbnRlbnRzIG9mIHRoZSBgY2FsY0RhdGFgIGFzIHRoZVxuICAgIC8vIGVsZW1lbnQgemVybyBvZiBhIGNvbnRhaW5lciBhcnJheS4gVGhlc2UgaGVscGVycyBhcmUganVzdCB1c2VkIGZvciBjbGFyaXR5IGFzIGFcbiAgICAvLyBuZXdjb21lciB0byB0aGUgY29kZWJhc2UgbWF5IG5vdCBrbm93IHdoYXQgdGhlIGBbMF1gIGlzLCBhbmQgd2hldGhlciB0aGVyZSBjYW4gYmUgZnVydGhlclxuICAgIC8vIGVsZW1lbnRzIChub3QgYXRtKS5cbiAgICB3cmFwOiB3cmFwLFxuICAgIHVud3JhcDogZnVuY3Rpb24oZCkge3JldHVybiBkWzBdO31cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbi8qKlxuICogTWFrZSBhIHh5IGRvbWFpbiBhdHRyaWJ1dGUgZ3JvdXBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLm5hbWU6IG5hbWUgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIGRlZmF1bHQgZGVzY3JpcHRpb25cbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMudHJhY2U6IHNldCB0byB0cnVlIGZvciB0cmFjZSBjb250YWluZXJzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMuZWRpdFR5cGU6IGVkaXRUeXBlIGZvciBhbGwgcGllY2VzXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLm5vR3JpZENlbGw6IHNldCB0byB0cnVlIHRvIG9taXQgYHJvd2AgYW5kIGBjb2x1bW5gXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIGV4dHJhLmRlc2NyaXB0aW9uOiBleHRyYSBkZXNjcmlwdGlvbi4gTi5CIHdlIHVzZVxuICogICAgIGEgc2VwYXJhdGUgZXh0cmEgY29udGFpbmVyIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoXG4gKiAgICAgdGhlIGNvbXByZXNzX2F0dHJpYnV0ZXMgdHJhbnNmb3JtLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYXR0cmlidXRlcyBvYmplY3QgY29udGFpbmluZyB7eCx5fSBhcyBzcGVjaWZpZWRcbiAqL1xuZXhwb3J0cy5hdHRyaWJ1dGVzID0gZnVuY3Rpb24ob3B0cywgZXh0cmEpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBleHRyYSA9IGV4dHJhIHx8IHt9O1xuXG4gICAgdmFyIGJhc2UgPSB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfVxuICAgICAgICBdLFxuICAgICAgICBkZmx0OiBbMCwgMV1cbiAgICB9O1xuXG4gICAgdmFyIG5hbWVQYXJ0ID0gb3B0cy5uYW1lID8gb3B0cy5uYW1lICsgJyAnIDogJyc7XG4gICAgdmFyIGNvbnRQYXJ0ID0gb3B0cy50cmFjZSA/ICd0cmFjZSAnIDogJ3N1YnBsb3QgJztcbiAgICB2YXIgZGVzY1BhcnQgPSBleHRyYS5kZXNjcmlwdGlvbiA/ICcgJyArIGV4dHJhLmRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICB4OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3Jpem9udGFsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICB5OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB2ZXJ0aWNhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGVcbiAgICB9O1xuXG4gICAgaWYoIW9wdHMubm9HcmlkQ2VsbCkge1xuICAgICAgICBvdXQucm93ID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgcm93IGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgICAgIG91dC5jb2x1bW4gPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyBjb2x1bW4gaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbnRhaW5lck91dCwgbGF5b3V0LCBjb2VyY2UsIGRmbHREb21haW5zKSB7XG4gICAgdmFyIGRmbHRYID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLngpIHx8IFswLCAxXTtcbiAgICB2YXIgZGZsdFkgPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueSkgfHwgWzAsIDFdO1xuXG4gICAgdmFyIGdyaWQgPSBsYXlvdXQuZ3JpZDtcbiAgICBpZihncmlkKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBjb2VyY2UoJ2RvbWFpbi5jb2x1bW4nKTtcbiAgICAgICAgaWYoY29sdW1uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGNvbHVtbiA8IGdyaWQuY29sdW1ucykgZGZsdFggPSBncmlkLl9kb21haW5zLnhbY29sdW1uXTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4uY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IGNvZXJjZSgnZG9tYWluLnJvdycpO1xuICAgICAgICBpZihyb3cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYocm93IDwgZ3JpZC5yb3dzKSBkZmx0WSA9IGdyaWQuX2RvbWFpbnMueVtyb3ddO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5yb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgnZG9tYWluLngnLCBkZmx0WCk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ2RvbWFpbi55JywgZGZsdFkpO1xuXG4gICAgLy8gZG9uJ3QgYWNjZXB0IGJhZCBpbnB1dCBkYXRhXG4gICAgaWYoISh4WzBdIDwgeFsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueCA9IGRmbHRYLnNsaWNlKCk7XG4gICAgaWYoISh5WzBdIDwgeVsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueSA9IGRmbHRZLnNsaWNlKCk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==