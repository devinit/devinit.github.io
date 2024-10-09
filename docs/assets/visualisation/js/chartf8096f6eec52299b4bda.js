(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_traces_heatmap_clean_2d_array_js-node_modules_plotly_js_src_traces-07b6c4"],{

/***/ "./node_modules/plotly.js/src/traces/heatmap/clean_2d_array.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/clean_2d_array.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function clean2dArray(zOld, trace, xa, ya) {
    var rowlen, collen, getCollen, old2new, i, j;

    function cleanZvalue(v) {
        if(!isNumeric(v)) return undefined;
        return +v;
    }

    if(trace && trace.transpose) {
        rowlen = 0;
        for(i = 0; i < zOld.length; i++) rowlen = Math.max(rowlen, zOld[i].length);
        if(rowlen === 0) return false;
        getCollen = function(zOld) { return zOld.length; };
        old2new = function(zOld, i, j) { return (zOld[j] || [])[i]; };
    } else {
        rowlen = zOld.length;
        getCollen = function(zOld, i) { return zOld[i].length; };
        old2new = function(zOld, i, j) { return (zOld[i] || [])[j]; };
    }

    var padOld2new = function(zOld, i, j) {
        if(i === BADNUM || j === BADNUM) return BADNUM;
        return old2new(zOld, i, j);
    };

    function axisMapping(ax) {
        if(trace && trace.type !== 'carpet' && trace.type !== 'contourcarpet' &&
            ax && ax.type === 'category' && trace['_' + ax._id.charAt(0)].length) {
            var axLetter = ax._id.charAt(0);
            var axMapping = {};
            var traceCategories = trace['_' + axLetter + 'CategoryMap'] || trace[axLetter];
            for(i = 0; i < traceCategories.length; i++) {
                axMapping[traceCategories[i]] = i;
            }
            return function(i) {
                var ind = axMapping[ax._categories[i]];
                return ind + 1 ? ind : BADNUM;
            };
        } else {
            return Lib.identity;
        }
    }

    var xMap = axisMapping(xa);
    var yMap = axisMapping(ya);

    if(ya && ya.type === 'category') rowlen = ya._categories.length;
    var zNew = new Array(rowlen);

    for(i = 0; i < rowlen; i++) {
        if(xa && xa.type === 'category') {
            collen = xa._categories.length;
        } else {
            collen = getCollen(zOld, i);
        }
        zNew[i] = new Array(collen);
        for(j = 0; j < collen; j++) zNew[i][j] = cleanZvalue(padOld2new(zOld, yMap(i), xMap(j)));
    }

    return zNew;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/convert_column_xyz.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/convert_column_xyz.js ***!
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
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function convertColumnData(trace, ax1, ax2, var1Name, var2Name, arrayVarNames) {
    var colLen = trace._length;
    var col1 = ax1.makeCalcdata(trace, var1Name);
    var col2 = ax2.makeCalcdata(trace, var2Name);
    var textCol = trace.text;
    var hasColumnText = (textCol !== undefined && Lib.isArray1D(textCol));
    var hoverTextCol = trace.hovertext;
    var hasColumnHoverText = (hoverTextCol !== undefined && Lib.isArray1D(hoverTextCol));
    var i, j;

    var col1dv = Lib.distinctVals(col1);
    var col1vals = col1dv.vals;
    var col2dv = Lib.distinctVals(col2);
    var col2vals = col2dv.vals;
    var newArrays = [];
    var text;
    var hovertext;

    var nI = col2vals.length;
    var nJ = col1vals.length;

    for(i = 0; i < arrayVarNames.length; i++) {
        newArrays[i] = Lib.init2dArray(nI, nJ);
    }

    if(hasColumnText) {
        text = Lib.init2dArray(nI, nJ);
    }
    if(hasColumnHoverText) {
        hovertext = Lib.init2dArray(nI, nJ);
    }

    var after2before = Lib.init2dArray(nI, nJ);

    for(i = 0; i < colLen; i++) {
        if(col1[i] !== BADNUM && col2[i] !== BADNUM) {
            var i1 = Lib.findBin(col1[i] + col1dv.minDiff / 2, col1vals);
            var i2 = Lib.findBin(col2[i] + col2dv.minDiff / 2, col2vals);

            for(j = 0; j < arrayVarNames.length; j++) {
                var arrayVarName = arrayVarNames[j];
                var arrayVar = trace[arrayVarName];
                var newArray = newArrays[j];
                newArray[i2][i1] = arrayVar[i];
                after2before[i2][i1] = i;
            }

            if(hasColumnText) text[i2][i1] = textCol[i];
            if(hasColumnHoverText) hovertext[i2][i1] = hoverTextCol[i];
        }
    }

    trace['_' + var1Name] = col1vals;
    trace['_' + var2Name] = col2vals;
    for(j = 0; j < arrayVarNames.length; j++) {
        trace['_' + arrayVarNames[j]] = newArrays[j];
    }
    if(hasColumnText) trace._text = text;
    if(hasColumnHoverText) trace._hovertext = hovertext;

    if(ax1 && ax1.type === 'category') {
        trace['_' + var1Name + 'CategoryMap'] = col1vals.map(function(v) { return ax1._categories[v];});
    }

    if(ax2 && ax2.type === 'category') {
        trace['_' + var2Name + 'CategoryMap'] = col2vals.map(function(v) { return ax2._categories[v];});
    }

    trace._after2before = after2before;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvY2xlYW5fMmRfYXJyYXkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL2NvbnZlcnRfY29sdW1uX3h5ei5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw4REFBZ0I7QUFDeEMsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGFBQWEsa0hBQTJDOztBQUV4RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0Esb0NBQW9DLG9CQUFvQjtBQUN4RCx3Q0FBd0MsMkJBQTJCO0FBQ25FLEtBQUs7QUFDTDtBQUNBLHVDQUF1Qyx1QkFBdUI7QUFDOUQsd0NBQXdDLDJCQUEyQjtBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNEJBQTRCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGNBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGFBQWEsa0hBQTJDOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxjQUFjLDBCQUEwQjtBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBOztBQUVBLHNCQUFzQiwwQkFBMEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLDBCQUEwQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBFQUEwRSw0QkFBNEI7QUFDdEc7O0FBRUE7QUFDQSwwRUFBMEUsNEJBQTRCO0FBQ3RHOztBQUVBO0FBQ0EiLCJmaWxlIjoiY2hhcnRmODA5NmY2ZWVjNTIyOTliNGJkYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbGVhbjJkQXJyYXkoek9sZCwgdHJhY2UsIHhhLCB5YSkge1xuICAgIHZhciByb3dsZW4sIGNvbGxlbiwgZ2V0Q29sbGVuLCBvbGQybmV3LCBpLCBqO1xuXG4gICAgZnVuY3Rpb24gY2xlYW5admFsdWUodikge1xuICAgICAgICBpZighaXNOdW1lcmljKHYpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gK3Y7XG4gICAgfVxuXG4gICAgaWYodHJhY2UgJiYgdHJhY2UudHJhbnNwb3NlKSB7XG4gICAgICAgIHJvd2xlbiA9IDA7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IHpPbGQubGVuZ3RoOyBpKyspIHJvd2xlbiA9IE1hdGgubWF4KHJvd2xlbiwgek9sZFtpXS5sZW5ndGgpO1xuICAgICAgICBpZihyb3dsZW4gPT09IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgZ2V0Q29sbGVuID0gZnVuY3Rpb24oek9sZCkgeyByZXR1cm4gek9sZC5sZW5ndGg7IH07XG4gICAgICAgIG9sZDJuZXcgPSBmdW5jdGlvbih6T2xkLCBpLCBqKSB7IHJldHVybiAoek9sZFtqXSB8fCBbXSlbaV07IH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm93bGVuID0gek9sZC5sZW5ndGg7XG4gICAgICAgIGdldENvbGxlbiA9IGZ1bmN0aW9uKHpPbGQsIGkpIHsgcmV0dXJuIHpPbGRbaV0ubGVuZ3RoOyB9O1xuICAgICAgICBvbGQybmV3ID0gZnVuY3Rpb24oek9sZCwgaSwgaikgeyByZXR1cm4gKHpPbGRbaV0gfHwgW10pW2pdOyB9O1xuICAgIH1cblxuICAgIHZhciBwYWRPbGQybmV3ID0gZnVuY3Rpb24oek9sZCwgaSwgaikge1xuICAgICAgICBpZihpID09PSBCQUROVU0gfHwgaiA9PT0gQkFETlVNKSByZXR1cm4gQkFETlVNO1xuICAgICAgICByZXR1cm4gb2xkMm5ldyh6T2xkLCBpLCBqKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXhpc01hcHBpbmcoYXgpIHtcbiAgICAgICAgaWYodHJhY2UgJiYgdHJhY2UudHlwZSAhPT0gJ2NhcnBldCcgJiYgdHJhY2UudHlwZSAhPT0gJ2NvbnRvdXJjYXJwZXQnICYmXG4gICAgICAgICAgICBheCAmJiBheC50eXBlID09PSAnY2F0ZWdvcnknICYmIHRyYWNlWydfJyArIGF4Ll9pZC5jaGFyQXQoMCldLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGF4TGV0dGVyID0gYXguX2lkLmNoYXJBdCgwKTtcbiAgICAgICAgICAgIHZhciBheE1hcHBpbmcgPSB7fTtcbiAgICAgICAgICAgIHZhciB0cmFjZUNhdGVnb3JpZXMgPSB0cmFjZVsnXycgKyBheExldHRlciArICdDYXRlZ29yeU1hcCddIHx8IHRyYWNlW2F4TGV0dGVyXTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHRyYWNlQ2F0ZWdvcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGF4TWFwcGluZ1t0cmFjZUNhdGVnb3JpZXNbaV1dID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZCA9IGF4TWFwcGluZ1theC5fY2F0ZWdvcmllc1tpXV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZCArIDEgPyBpbmQgOiBCQUROVU07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIExpYi5pZGVudGl0eTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB4TWFwID0gYXhpc01hcHBpbmcoeGEpO1xuICAgIHZhciB5TWFwID0gYXhpc01hcHBpbmcoeWEpO1xuXG4gICAgaWYoeWEgJiYgeWEudHlwZSA9PT0gJ2NhdGVnb3J5Jykgcm93bGVuID0geWEuX2NhdGVnb3JpZXMubGVuZ3RoO1xuICAgIHZhciB6TmV3ID0gbmV3IEFycmF5KHJvd2xlbik7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCByb3dsZW47IGkrKykge1xuICAgICAgICBpZih4YSAmJiB4YS50eXBlID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICAgICAgICBjb2xsZW4gPSB4YS5fY2F0ZWdvcmllcy5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsZW4gPSBnZXRDb2xsZW4oek9sZCwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgek5ld1tpXSA9IG5ldyBBcnJheShjb2xsZW4pO1xuICAgICAgICBmb3IoaiA9IDA7IGogPCBjb2xsZW47IGorKykgek5ld1tpXVtqXSA9IGNsZWFuWnZhbHVlKHBhZE9sZDJuZXcoek9sZCwgeU1hcChpKSwgeE1hcChqKSkpO1xuICAgIH1cblxuICAgIHJldHVybiB6TmV3O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb252ZXJ0Q29sdW1uRGF0YSh0cmFjZSwgYXgxLCBheDIsIHZhcjFOYW1lLCB2YXIyTmFtZSwgYXJyYXlWYXJOYW1lcykge1xuICAgIHZhciBjb2xMZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciBjb2wxID0gYXgxLm1ha2VDYWxjZGF0YSh0cmFjZSwgdmFyMU5hbWUpO1xuICAgIHZhciBjb2wyID0gYXgyLm1ha2VDYWxjZGF0YSh0cmFjZSwgdmFyMk5hbWUpO1xuICAgIHZhciB0ZXh0Q29sID0gdHJhY2UudGV4dDtcbiAgICB2YXIgaGFzQ29sdW1uVGV4dCA9ICh0ZXh0Q29sICE9PSB1bmRlZmluZWQgJiYgTGliLmlzQXJyYXkxRCh0ZXh0Q29sKSk7XG4gICAgdmFyIGhvdmVyVGV4dENvbCA9IHRyYWNlLmhvdmVydGV4dDtcbiAgICB2YXIgaGFzQ29sdW1uSG92ZXJUZXh0ID0gKGhvdmVyVGV4dENvbCAhPT0gdW5kZWZpbmVkICYmIExpYi5pc0FycmF5MUQoaG92ZXJUZXh0Q29sKSk7XG4gICAgdmFyIGksIGo7XG5cbiAgICB2YXIgY29sMWR2ID0gTGliLmRpc3RpbmN0VmFscyhjb2wxKTtcbiAgICB2YXIgY29sMXZhbHMgPSBjb2wxZHYudmFscztcbiAgICB2YXIgY29sMmR2ID0gTGliLmRpc3RpbmN0VmFscyhjb2wyKTtcbiAgICB2YXIgY29sMnZhbHMgPSBjb2wyZHYudmFscztcbiAgICB2YXIgbmV3QXJyYXlzID0gW107XG4gICAgdmFyIHRleHQ7XG4gICAgdmFyIGhvdmVydGV4dDtcblxuICAgIHZhciBuSSA9IGNvbDJ2YWxzLmxlbmd0aDtcbiAgICB2YXIgbkogPSBjb2wxdmFscy5sZW5ndGg7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBhcnJheVZhck5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5ld0FycmF5c1tpXSA9IExpYi5pbml0MmRBcnJheShuSSwgbkopO1xuICAgIH1cblxuICAgIGlmKGhhc0NvbHVtblRleHQpIHtcbiAgICAgICAgdGV4dCA9IExpYi5pbml0MmRBcnJheShuSSwgbkopO1xuICAgIH1cbiAgICBpZihoYXNDb2x1bW5Ib3ZlclRleHQpIHtcbiAgICAgICAgaG92ZXJ0ZXh0ID0gTGliLmluaXQyZEFycmF5KG5JLCBuSik7XG4gICAgfVxuXG4gICAgdmFyIGFmdGVyMmJlZm9yZSA9IExpYi5pbml0MmRBcnJheShuSSwgbkopO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgY29sTGVuOyBpKyspIHtcbiAgICAgICAgaWYoY29sMVtpXSAhPT0gQkFETlVNICYmIGNvbDJbaV0gIT09IEJBRE5VTSkge1xuICAgICAgICAgICAgdmFyIGkxID0gTGliLmZpbmRCaW4oY29sMVtpXSArIGNvbDFkdi5taW5EaWZmIC8gMiwgY29sMXZhbHMpO1xuICAgICAgICAgICAgdmFyIGkyID0gTGliLmZpbmRCaW4oY29sMltpXSArIGNvbDJkdi5taW5EaWZmIC8gMiwgY29sMnZhbHMpO1xuXG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBhcnJheVZhck5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFycmF5VmFyTmFtZSA9IGFycmF5VmFyTmFtZXNbal07XG4gICAgICAgICAgICAgICAgdmFyIGFycmF5VmFyID0gdHJhY2VbYXJyYXlWYXJOYW1lXTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3QXJyYXkgPSBuZXdBcnJheXNbal07XG4gICAgICAgICAgICAgICAgbmV3QXJyYXlbaTJdW2kxXSA9IGFycmF5VmFyW2ldO1xuICAgICAgICAgICAgICAgIGFmdGVyMmJlZm9yZVtpMl1baTFdID0gaTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaGFzQ29sdW1uVGV4dCkgdGV4dFtpMl1baTFdID0gdGV4dENvbFtpXTtcbiAgICAgICAgICAgIGlmKGhhc0NvbHVtbkhvdmVyVGV4dCkgaG92ZXJ0ZXh0W2kyXVtpMV0gPSBob3ZlclRleHRDb2xbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFjZVsnXycgKyB2YXIxTmFtZV0gPSBjb2wxdmFscztcbiAgICB0cmFjZVsnXycgKyB2YXIyTmFtZV0gPSBjb2wydmFscztcbiAgICBmb3IoaiA9IDA7IGogPCBhcnJheVZhck5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHRyYWNlWydfJyArIGFycmF5VmFyTmFtZXNbal1dID0gbmV3QXJyYXlzW2pdO1xuICAgIH1cbiAgICBpZihoYXNDb2x1bW5UZXh0KSB0cmFjZS5fdGV4dCA9IHRleHQ7XG4gICAgaWYoaGFzQ29sdW1uSG92ZXJUZXh0KSB0cmFjZS5faG92ZXJ0ZXh0ID0gaG92ZXJ0ZXh0O1xuXG4gICAgaWYoYXgxICYmIGF4MS50eXBlID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICAgIHRyYWNlWydfJyArIHZhcjFOYW1lICsgJ0NhdGVnb3J5TWFwJ10gPSBjb2wxdmFscy5tYXAoZnVuY3Rpb24odikgeyByZXR1cm4gYXgxLl9jYXRlZ29yaWVzW3ZdO30pO1xuICAgIH1cblxuICAgIGlmKGF4MiAmJiBheDIudHlwZSA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICB0cmFjZVsnXycgKyB2YXIyTmFtZSArICdDYXRlZ29yeU1hcCddID0gY29sMnZhbHMubWFwKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGF4Mi5fY2F0ZWdvcmllc1t2XTt9KTtcbiAgICB9XG5cbiAgICB0cmFjZS5fYWZ0ZXIyYmVmb3JlID0gYWZ0ZXIyYmVmb3JlO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=