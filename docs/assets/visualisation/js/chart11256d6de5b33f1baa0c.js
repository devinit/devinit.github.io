(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_ohlc_js"],{

/***/ "./node_modules/plotly.js/lib/ohlc.js":
/*!********************************************!*\
  !*** ./node_modules/plotly.js/lib/ohlc.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/ohlc */ "./node_modules/plotly.js/src/traces/ohlc/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/defaults.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var handleOHLC = __webpack_require__(/*! ./ohlc_defaults */ "./node_modules/plotly.js/src/traces/ohlc/ohlc_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/ohlc/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleOHLC(traceIn, traceOut, coerce, layout);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('line.width');
    coerce('line.dash');

    handleDirection(traceIn, traceOut, coerce, 'increasing');
    handleDirection(traceIn, traceOut, coerce, 'decreasing');

    coerce('text');
    coerce('hovertext');
    coerce('tickwidth');

    layout._requestRangeslider[traceOut.xaxis] = true;
};

function handleDirection(traceIn, traceOut, coerce, direction) {
    coerce(direction + '.line.color');
    coerce(direction + '.line.width', traceOut.line.width);
    coerce(direction + '.line.dash', traceOut.line.dash);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/index.js ***!
  \*********************************************************/
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
    name: 'ohlc',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', 'showLegend'],
    meta: {
        description: [
            'The ohlc (short for Open-High-Low-Close) is a style of financial chart describing',
            'open, high, low and close for a given `x` coordinate (most likely time).',

            'The tip of the lines represent the `low` and `high` values and',
            'the horizontal segments represent the `open` and `close` values.',

            'Sample points where the close value is higher (lower) then the open',
            'value are called increasing (decreasing).',

            'By default, increasing items are drawn in green whereas',
            'decreasing are drawn in red.'
        ].join(' ')
    },

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/ohlc/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/ohlc/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/ohlc/calc.js").calc,
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/ohlc/plot.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/ohlc/style.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/ohlc/hover.js").hoverPoints,
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/ohlc/select.js")
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/plot.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/plot.js ***!
  \********************************************************/
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

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

module.exports = function plot(gd, plotinfo, cdOHLC, ohlcLayer) {
    var ya = plotinfo.yaxis;
    var xa = plotinfo.xaxis;
    var posHasRangeBreaks = !!xa.rangebreaks;

    Lib.makeTraceGroups(ohlcLayer, cdOHLC, 'trace ohlc').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var t = cd0.t;
        var trace = cd0.trace;

        if(trace.visible !== true || t.empty) {
            plotGroup.remove();
            return;
        }

        var tickLen = t.tickLen;

        var paths = plotGroup.selectAll('path').data(Lib.identity);

        paths.enter().append('path');

        paths.exit().remove();

        paths.attr('d', function(d) {
            if(d.empty) return 'M0,0Z';

            var xo = xa.c2p(d.pos - tickLen, true);
            var xc = xa.c2p(d.pos + tickLen, true);
            var x = posHasRangeBreaks ? (xo + xc) / 2 : xa.c2p(d.pos, true);

            var yo = ya.c2p(d.o, true);
            var yh = ya.c2p(d.h, true);
            var yl = ya.c2p(d.l, true);
            var yc = ya.c2p(d.c, true);

            return 'M' + xo + ',' + yo + 'H' + x +
                'M' + x + ',' + yh + 'V' + yl +
                'M' + xc + ',' + yc + 'H' + x;
        });
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/ohlc/style.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/ohlc/style.js ***!
  \*********************************************************/
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

module.exports = function style(gd, cd, sel) {
    var s = sel ? sel : d3.select(gd).selectAll('g.ohlclayer').selectAll('g.trace');

    s.style('opacity', function(d) {
        return d[0].trace.opacity;
    });

    s.each(function(d) {
        var trace = d[0].trace;

        d3.select(this).selectAll('path').each(function(di) {
            if(di.empty) return;

            var dirLine = trace[di.dir].line;
            d3.select(this)
                .style('fill', 'none')
                .call(Color.stroke, dirLine.color)
                .call(Drawing.dashLine, dirLine.dash, dirLine.width)
                // TODO: custom selection style for OHLC
                .style('opacity', trace.selectedpoints && !di.selected ? 0.3 : 1);
        });
    });
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvb2hsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL29obGMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9vaGxjL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvb2hsYy9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvb2hsYy9zdHlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixtSEFBOEM7Ozs7Ozs7Ozs7OztBQ1Y5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGlCQUFpQixtQkFBTyxDQUFDLGtGQUFpQjtBQUMxQyxpQkFBaUIsbUJBQU8sQ0FBQyw0RUFBYzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLG9GQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLGdCQUFnQixtQkFBTyxDQUFDLDRFQUFjO0FBQ3RDLG9CQUFvQixtQkFBTyxDQUFDLHdFQUFZO0FBQ3hDLFVBQVUsMEZBQXNCO0FBQ2hDLFVBQVUsbUJBQU8sQ0FBQyxnRUFBUTtBQUMxQixXQUFXLG1CQUFPLENBQUMsa0VBQVM7QUFDNUIsaUJBQWlCLG1HQUE4QjtBQUMvQyxrQkFBa0IsbUJBQU8sQ0FBQyxvRUFBVTtBQUNwQzs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxtQ0FBSTs7QUFFckIsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7OztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsY0FBYyxtQkFBTyxDQUFDLDBGQUEwQjtBQUNoRCxZQUFZLG1CQUFPLENBQUMsc0ZBQXdCOztBQUU1QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wiLCJmaWxlIjoiY2hhcnQxMTI1NmQ2ZGU1YjMzZjFiYWEwYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL29obGMnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgaGFuZGxlT0hMQyA9IHJlcXVpcmUoJy4vb2hsY19kZWZhdWx0cycpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIGxlbiA9IGhhbmRsZU9ITEModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0KTtcbiAgICBpZighbGVuKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgnbGluZS53aWR0aCcpO1xuICAgIGNvZXJjZSgnbGluZS5kYXNoJyk7XG5cbiAgICBoYW5kbGVEaXJlY3Rpb24odHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgJ2luY3JlYXNpbmcnKTtcbiAgICBoYW5kbGVEaXJlY3Rpb24odHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgJ2RlY3JlYXNpbmcnKTtcblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCd0aWNrd2lkdGgnKTtcblxuICAgIGxheW91dC5fcmVxdWVzdFJhbmdlc2xpZGVyW3RyYWNlT3V0LnhheGlzXSA9IHRydWU7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVEaXJlY3Rpb24odHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgZGlyZWN0aW9uKSB7XG4gICAgY29lcmNlKGRpcmVjdGlvbiArICcubGluZS5jb2xvcicpO1xuICAgIGNvZXJjZShkaXJlY3Rpb24gKyAnLmxpbmUud2lkdGgnLCB0cmFjZU91dC5saW5lLndpZHRoKTtcbiAgICBjb2VyY2UoZGlyZWN0aW9uICsgJy5saW5lLmRhc2gnLCB0cmFjZU91dC5saW5lLmRhc2gpO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdvaGxjJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydjYXJ0ZXNpYW4nLCAnc3ZnJywgJ3Nob3dMZWdlbmQnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIG9obGMgKHNob3J0IGZvciBPcGVuLUhpZ2gtTG93LUNsb3NlKSBpcyBhIHN0eWxlIG9mIGZpbmFuY2lhbCBjaGFydCBkZXNjcmliaW5nJyxcbiAgICAgICAgICAgICdvcGVuLCBoaWdoLCBsb3cgYW5kIGNsb3NlIGZvciBhIGdpdmVuIGB4YCBjb29yZGluYXRlIChtb3N0IGxpa2VseSB0aW1lKS4nLFxuXG4gICAgICAgICAgICAnVGhlIHRpcCBvZiB0aGUgbGluZXMgcmVwcmVzZW50IHRoZSBgbG93YCBhbmQgYGhpZ2hgIHZhbHVlcyBhbmQnLFxuICAgICAgICAgICAgJ3RoZSBob3Jpem9udGFsIHNlZ21lbnRzIHJlcHJlc2VudCB0aGUgYG9wZW5gIGFuZCBgY2xvc2VgIHZhbHVlcy4nLFxuXG4gICAgICAgICAgICAnU2FtcGxlIHBvaW50cyB3aGVyZSB0aGUgY2xvc2UgdmFsdWUgaXMgaGlnaGVyIChsb3dlcikgdGhlbiB0aGUgb3BlbicsXG4gICAgICAgICAgICAndmFsdWUgYXJlIGNhbGxlZCBpbmNyZWFzaW5nIChkZWNyZWFzaW5nKS4nLFxuXG4gICAgICAgICAgICAnQnkgZGVmYXVsdCwgaW5jcmVhc2luZyBpdGVtcyBhcmUgZHJhd24gaW4gZ3JlZW4gd2hlcmVhcycsXG4gICAgICAgICAgICAnZGVjcmVhc2luZyBhcmUgZHJhd24gaW4gcmVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKS5jYWxjLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLFxuICAgIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gICAgaG92ZXJQb2ludHM6IHJlcXVpcmUoJy4vaG92ZXInKS5ob3ZlclBvaW50cyxcbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4vc2VsZWN0Jylcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwbG90KGdkLCBwbG90aW5mbywgY2RPSExDLCBvaGxjTGF5ZXIpIHtcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgcG9zSGFzUmFuZ2VCcmVha3MgPSAhIXhhLnJhbmdlYnJlYWtzO1xuXG4gICAgTGliLm1ha2VUcmFjZUdyb3VwcyhvaGxjTGF5ZXIsIGNkT0hMQywgJ3RyYWNlIG9obGMnKS5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgIHZhciBwbG90R3JvdXAgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICAgICAgdmFyIHQgPSBjZDAudDtcbiAgICAgICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuXG4gICAgICAgIGlmKHRyYWNlLnZpc2libGUgIT09IHRydWUgfHwgdC5lbXB0eSkge1xuICAgICAgICAgICAgcGxvdEdyb3VwLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRpY2tMZW4gPSB0LnRpY2tMZW47XG5cbiAgICAgICAgdmFyIHBhdGhzID0gcGxvdEdyb3VwLnNlbGVjdEFsbCgncGF0aCcpLmRhdGEoTGliLmlkZW50aXR5KTtcblxuICAgICAgICBwYXRocy5lbnRlcigpLmFwcGVuZCgncGF0aCcpO1xuXG4gICAgICAgIHBhdGhzLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICBwYXRocy5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgaWYoZC5lbXB0eSkgcmV0dXJuICdNMCwwWic7XG5cbiAgICAgICAgICAgIHZhciB4byA9IHhhLmMycChkLnBvcyAtIHRpY2tMZW4sIHRydWUpO1xuICAgICAgICAgICAgdmFyIHhjID0geGEuYzJwKGQucG9zICsgdGlja0xlbiwgdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgeCA9IHBvc0hhc1JhbmdlQnJlYWtzID8gKHhvICsgeGMpIC8gMiA6IHhhLmMycChkLnBvcywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHZhciB5byA9IHlhLmMycChkLm8sIHRydWUpO1xuICAgICAgICAgICAgdmFyIHloID0geWEuYzJwKGQuaCwgdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgeWwgPSB5YS5jMnAoZC5sLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciB5YyA9IHlhLmMycChkLmMsIHRydWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gJ00nICsgeG8gKyAnLCcgKyB5byArICdIJyArIHggK1xuICAgICAgICAgICAgICAgICdNJyArIHggKyAnLCcgKyB5aCArICdWJyArIHlsICtcbiAgICAgICAgICAgICAgICAnTScgKyB4YyArICcsJyArIHljICsgJ0gnICsgeDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHlsZShnZCwgY2QsIHNlbCkge1xuICAgIHZhciBzID0gc2VsID8gc2VsIDogZDMuc2VsZWN0KGdkKS5zZWxlY3RBbGwoJ2cub2hsY2xheWVyJykuc2VsZWN0QWxsKCdnLnRyYWNlJyk7XG5cbiAgICBzLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZFswXS50cmFjZS5vcGFjaXR5O1xuICAgIH0pO1xuXG4gICAgcy5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZFswXS50cmFjZTtcblxuICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCdwYXRoJykuZWFjaChmdW5jdGlvbihkaSkge1xuICAgICAgICAgICAgaWYoZGkuZW1wdHkpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGRpckxpbmUgPSB0cmFjZVtkaS5kaXJdLmxpbmU7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCBkaXJMaW5lLmNvbG9yKVxuICAgICAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZGFzaExpbmUsIGRpckxpbmUuZGFzaCwgZGlyTGluZS53aWR0aClcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjdXN0b20gc2VsZWN0aW9uIHN0eWxlIGZvciBPSExDXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgdHJhY2Uuc2VsZWN0ZWRwb2ludHMgJiYgIWRpLnNlbGVjdGVkID8gMC4zIDogMSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=