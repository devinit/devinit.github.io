(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_traces_carpet_lookup_carpetid_js"],{

/***/ "./node_modules/plotly.js/src/traces/carpet/lookup_carpetid.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/lookup_carpetid.js ***!
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



/*
 * Given a trace, look up the carpet axis by carpet.
 */
module.exports = function(gd, trace) {
    var n = gd._fullData.length;
    var firstAxis;
    for(var i = 0; i < n; i++) {
        var maybeCarpet = gd._fullData[i];

        if(maybeCarpet.index === trace.index) continue;

        if(maybeCarpet.type === 'carpet') {
            if(!firstAxis) {
                firstAxis = maybeCarpet;
            }

            if(maybeCarpet.carpet === trace.carpet) {
                return maybeCarpet;
            }
        }
    }

    return firstAxis;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9sb29rdXBfY2FycGV0aWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImNoYXJ0N2I1NzY1NzE4YTFmZThkZTg3NzkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBHaXZlbiBhIHRyYWNlLCBsb29rIHVwIHRoZSBjYXJwZXQgYXhpcyBieSBjYXJwZXQuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZ2QsIHRyYWNlKSB7XG4gICAgdmFyIG4gPSBnZC5fZnVsbERhdGEubGVuZ3RoO1xuICAgIHZhciBmaXJzdEF4aXM7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICB2YXIgbWF5YmVDYXJwZXQgPSBnZC5fZnVsbERhdGFbaV07XG5cbiAgICAgICAgaWYobWF5YmVDYXJwZXQuaW5kZXggPT09IHRyYWNlLmluZGV4KSBjb250aW51ZTtcblxuICAgICAgICBpZihtYXliZUNhcnBldC50eXBlID09PSAnY2FycGV0Jykge1xuICAgICAgICAgICAgaWYoIWZpcnN0QXhpcykge1xuICAgICAgICAgICAgICAgIGZpcnN0QXhpcyA9IG1heWJlQ2FycGV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihtYXliZUNhcnBldC5jYXJwZXQgPT09IHRyYWNlLmNhcnBldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXliZUNhcnBldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaXJzdEF4aXM7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==