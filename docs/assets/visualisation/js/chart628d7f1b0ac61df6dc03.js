(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_lib_gup_js-node_modules_plotly_js_src_traces_parcoords_merge_length_js"],{

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

/***/ "./node_modules/plotly.js/src/traces/parcoords/merge_length.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/merge_length.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



/**
 * mergeLength: set trace length as the minimum of all dimension data lengths
 *     and propagates this length into each dimension
 *
 * @param {object} traceOut: the fullData trace
 * @param {Array(object)} dimensions: array of dimension objects
 * @param {string} dataAttr: the attribute of each dimension containing the data
 * @param {integer} len: an already-existing length from other attributes
 */
module.exports = function(traceOut, dimensions, dataAttr, len) {
    if(!len) len = Infinity;
    var i, dimi;
    for(i = 0; i < dimensions.length; i++) {
        dimi = dimensions[i];
        if(dimi.visible) len = Math.min(len, dimi[dataAttr].length);
    }
    if(len === Infinity) len = 0;

    traceOut._length = len;
    for(i = 0; i < dimensions.length; i++) {
        dimi = dimensions[i];
        if(dimi.visible) dimi._length = len;
    }

    return len;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvbGliL2d1cC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BhcmNvb3Jkcy9tZXJnZV9sZW5ndGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLGdFQUFZOztBQUVuQyxrQkFBa0I7O0FBRWxCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGNBQWM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCOzs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHVCQUF1QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsdUJBQXVCO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImNoYXJ0NjI4ZDdmMWIwYWM2MWRmNmRjMDMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuZnVuY3Rpb24gd3JhcChkKSB7cmV0dXJuIFtkXTt9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLy8gVGhlIEQzIGRhdGEgYmluZGluZyBjb25jZXB0IGFuZCB0aGUgR2VuZXJhbCBVcGRhdGUgUGF0dGVybiBwcm9tb3RlcyB0aGUgaWRlYSBvZlxuICAgIC8vIHRyYXZlcnNpbmcgaW50byB0aGUgc2NlbmVncmFwaCBieSB1c2luZyB0aGUgYC5kYXRhKGZ1biwga2V5RnVuKWAgY2FsbC5cbiAgICAvLyBUaGUgYGZ1bmAgaXMgbW9zdCBvZnRlbiBhIGByZXBlYXRgLCBpZS4gdGhlIGVsZW1lbnRzIGJlbmVhdGggYSBgPGc+YCBlbGVtZW50IG5lZWRcbiAgICAvLyBhY2Nlc3MgdG8gdGhlIHNhbWUgZGF0YSwgb3IgYSBgZGVzY2VuZGAsIHdoaWNoIGZhbnMgYSBzY2VuZWdyYXBoIG5vZGUgaW50byBhIGJ1bmNoIG9mXG4gICAgLy8gb2YgZWxlbWVudHMsIGUuZy4gcG9pbnRzLCBsaW5lcywgcm93cywgcmVxdWlyaW5nIGFuIGFycmF5IGFzIGlucHV0LlxuICAgIC8vIFRoZSByb2xlIG9mIHRoZSBga2V5RnVuYCBpcyB0byBpZGVudGlmeSB3aGF0IGVsZW1lbnRzIGFyZSBiZWluZyBlbnRlcmVkL2V4aXRlZC91cGRhdGVkLFxuICAgIC8vIG90aGVyd2lzZSBEMyByZXZlcnRzIHRvIHVzaW5nIGEgcGxhaW4gaW5kZXggd2hpY2ggd291bGQgc2NyZXcgdXAgYHRyYW5zaXRpb25gcy5cbiAgICBrZXlGdW46IGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5rZXk7fSxcbiAgICByZXBlYXQ6IHdyYXAsXG4gICAgZGVzY2VuZDogaWRlbnRpdHksXG5cbiAgICAvLyBQbG90bHkuanMgdXNlcyBhIGNvbnZlbnRpb24gb2Ygc3RvcmluZyB0aGUgYWN0dWFsIGNvbnRlbnRzIG9mIHRoZSBgY2FsY0RhdGFgIGFzIHRoZVxuICAgIC8vIGVsZW1lbnQgemVybyBvZiBhIGNvbnRhaW5lciBhcnJheS4gVGhlc2UgaGVscGVycyBhcmUganVzdCB1c2VkIGZvciBjbGFyaXR5IGFzIGFcbiAgICAvLyBuZXdjb21lciB0byB0aGUgY29kZWJhc2UgbWF5IG5vdCBrbm93IHdoYXQgdGhlIGBbMF1gIGlzLCBhbmQgd2hldGhlciB0aGVyZSBjYW4gYmUgZnVydGhlclxuICAgIC8vIGVsZW1lbnRzIChub3QgYXRtKS5cbiAgICB3cmFwOiB3cmFwLFxuICAgIHVud3JhcDogZnVuY3Rpb24oZCkge3JldHVybiBkWzBdO31cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogbWVyZ2VMZW5ndGg6IHNldCB0cmFjZSBsZW5ndGggYXMgdGhlIG1pbmltdW0gb2YgYWxsIGRpbWVuc2lvbiBkYXRhIGxlbmd0aHNcbiAqICAgICBhbmQgcHJvcGFnYXRlcyB0aGlzIGxlbmd0aCBpbnRvIGVhY2ggZGltZW5zaW9uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRyYWNlT3V0OiB0aGUgZnVsbERhdGEgdHJhY2VcbiAqIEBwYXJhbSB7QXJyYXkob2JqZWN0KX0gZGltZW5zaW9uczogYXJyYXkgb2YgZGltZW5zaW9uIG9iamVjdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhQXR0cjogdGhlIGF0dHJpYnV0ZSBvZiBlYWNoIGRpbWVuc2lvbiBjb250YWluaW5nIHRoZSBkYXRhXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGxlbjogYW4gYWxyZWFkeS1leGlzdGluZyBsZW5ndGggZnJvbSBvdGhlciBhdHRyaWJ1dGVzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odHJhY2VPdXQsIGRpbWVuc2lvbnMsIGRhdGFBdHRyLCBsZW4pIHtcbiAgICBpZighbGVuKSBsZW4gPSBJbmZpbml0eTtcbiAgICB2YXIgaSwgZGltaTtcbiAgICBmb3IoaSA9IDA7IGkgPCBkaW1lbnNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRpbWkgPSBkaW1lbnNpb25zW2ldO1xuICAgICAgICBpZihkaW1pLnZpc2libGUpIGxlbiA9IE1hdGgubWluKGxlbiwgZGltaVtkYXRhQXR0cl0ubGVuZ3RoKTtcbiAgICB9XG4gICAgaWYobGVuID09PSBJbmZpbml0eSkgbGVuID0gMDtcblxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG4gICAgZm9yKGkgPSAwOyBpIDwgZGltZW5zaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkaW1pID0gZGltZW5zaW9uc1tpXTtcbiAgICAgICAgaWYoZGltaS52aXNpYmxlKSBkaW1pLl9sZW5ndGggPSBsZW47XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlbjtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9