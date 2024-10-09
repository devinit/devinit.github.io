(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_heatmap_js"],{

/***/ "./node_modules/plotly.js/lib/heatmap.js":
/*!***********************************************!*\
  !*** ./node_modules/plotly.js/lib/heatmap.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/heatmap */ "./node_modules/plotly.js/src/traces/heatmap/index.js");


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

/***/ "./node_modules/plotly.js/src/traces/heatmap/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/defaults.js ***!
  \***************************************************************/
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

var handleXYZDefaults = __webpack_require__(/*! ./xyz_defaults */ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ./style_defaults */ "./node_modules/plotly.js/src/traces/heatmap/style_defaults.js");
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/heatmap/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var validData = handleXYZDefaults(traceIn, traceOut, coerce, layout);
    if(!validData) {
        traceOut.visible = false;
        return;
    }

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    handleStyleDefaults(traceIn, traceOut, coerce, layout);

    coerce('hoverongaps');
    coerce('connectgaps', Lib.isArray1D(traceOut.z) && (traceOut.zsmooth !== false));

    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'z'});
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/hover.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/hover.js ***!
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



var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var extractOpts = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").extractOpts;

module.exports = function hoverPoints(pointData, xval, yval, hovermode, hoverLayer, contour) {
    var cd0 = pointData.cd[0];
    var trace = cd0.trace;
    var xa = pointData.xa;
    var ya = pointData.ya;
    var x = cd0.x;
    var y = cd0.y;
    var z = cd0.z;
    var xc = cd0.xCenter;
    var yc = cd0.yCenter;
    var zmask = cd0.zmask;
    var zhoverformat = trace.zhoverformat;
    var x2 = x;
    var y2 = y;

    var xl, yl, nx, ny;

    if(pointData.index !== false) {
        try {
            nx = Math.round(pointData.index[1]);
            ny = Math.round(pointData.index[0]);
        } catch(e) {
            Lib.error('Error hovering on heatmap, ' +
                'pointNumber must be [row,col], found:', pointData.index);
            return;
        }
        if(nx < 0 || nx >= z[0].length || ny < 0 || ny > z.length) {
            return;
        }
    } else if(Fx.inbox(xval - x[0], xval - x[x.length - 1], 0) > 0 ||
            Fx.inbox(yval - y[0], yval - y[y.length - 1], 0) > 0) {
        return;
    } else {
        if(contour) {
            var i2;
            x2 = [2 * x[0] - x[1]];

            for(i2 = 1; i2 < x.length; i2++) {
                x2.push((x[i2] + x[i2 - 1]) / 2);
            }
            x2.push([2 * x[x.length - 1] - x[x.length - 2]]);

            y2 = [2 * y[0] - y[1]];
            for(i2 = 1; i2 < y.length; i2++) {
                y2.push((y[i2] + y[i2 - 1]) / 2);
            }
            y2.push([2 * y[y.length - 1] - y[y.length - 2]]);
        }
        nx = Math.max(0, Math.min(x2.length - 2, Lib.findBin(xval, x2)));
        ny = Math.max(0, Math.min(y2.length - 2, Lib.findBin(yval, y2)));
    }

    var x0 = xa.c2p(x[nx]);
    var x1 = xa.c2p(x[nx + 1]);
    var y0 = ya.c2p(y[ny]);
    var y1 = ya.c2p(y[ny + 1]);

    if(contour) {
        x1 = x0;
        xl = x[nx];
        y1 = y0;
        yl = y[ny];
    } else {
        xl = xc ? xc[nx] : ((x[nx] + x[nx + 1]) / 2);
        yl = yc ? yc[ny] : ((y[ny] + y[ny + 1]) / 2);

        if(xa && xa.type === 'category') xl = x[nx];
        if(ya && ya.type === 'category') yl = y[ny];

        if(trace.zsmooth) {
            x0 = x1 = xa.c2p(xl);
            y0 = y1 = ya.c2p(yl);
        }
    }

    var zVal = z[ny][nx];
    if(zmask && !zmask[ny][nx]) zVal = undefined;

    if(zVal === undefined && !trace.hoverongaps) return;

    var text;
    if(Array.isArray(cd0.hovertext) && Array.isArray(cd0.hovertext[ny])) {
        text = cd0.hovertext[ny][nx];
    } else if(Array.isArray(cd0.text) && Array.isArray(cd0.text[ny])) {
        text = cd0.text[ny][nx];
    }

    // dummy axis for formatting the z value
    var cOpts = extractOpts(trace);
    var dummyAx = {
        type: 'linear',
        range: [cOpts.min, cOpts.max],
        hoverformat: zhoverformat,
        _separators: xa._separators,
        _numFormat: xa._numFormat
    };
    var zLabel = Axes.tickText(dummyAx, zVal, 'hover').text;

    return [Lib.extendFlat(pointData, {
        index: trace._after2before ? trace._after2before[ny][nx] : [ny, nx],
        // never let a 2D override 1D type as closest point
        distance: pointData.maxHoverDistance,
        spikeDistance: pointData.maxSpikeDistance,
        x0: x0,
        x1: x1,
        y0: y0,
        y1: y1,
        xLabelVal: xl,
        yLabelVal: yl,
        zLabelVal: zVal,
        zLabel: zLabel,
        text: text
    })];
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/index.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/heatmap/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/heatmap/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/heatmap/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/heatmap/plot.js"),
    colorbar: __webpack_require__(/*! ./colorbar */ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/heatmap/style.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/heatmap/hover.js"),

    moduleType: 'trace',
    name: 'heatmap',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', '2dMap', 'showLegend'],
    meta: {
        description: [
            'The data that describes the heatmap value-to-color mapping',
            'is set in `z`.',
            'Data in `z` can either be a {2D array} of values (ragged or not)',
            'or a 1D array of values.',

            'In the case where `z` is a {2D array},',
            'say that `z` has N rows and M columns.',
            'Then, by default, the resulting heatmap will have N partitions along',
            'the y axis and M partitions along the x axis.',
            'In other words, the i-th row/ j-th column cell in `z`',
            'is mapped to the i-th partition of the y axis',
            '(starting from the bottom of the plot) and the j-th partition',
            'of the x-axis (starting from the left of the plot).',
            'This behavior can be flipped by using `transpose`.',
            'Moreover, `x` (`y`) can be provided with M or M+1 (N or N+1) elements.',
            'If M (N), then the coordinates correspond to the center of the',
            'heatmap cells and the cells have equal width.',
            'If M+1 (N+1), then the coordinates correspond to the edges of the',
            'heatmap cells.',

            'In the case where `z` is a 1D {array}, the x and y coordinates must be',
            'provided in `x` and `y` respectively to form data triplets.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/style_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/style_defaults.js ***!
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




module.exports = function handleStyleDefaults(traceIn, traceOut, coerce) {
    var zsmooth = coerce('zsmooth');
    if(zsmooth === false) {
        // ensure that xgap and ygap are coerced only when zsmooth allows them to have an effect.
        coerce('xgap');
        coerce('ygap');
    }

    coerce('zhoverformat');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js ***!
  \*******************************************************************/
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

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

module.exports = function handleXYZDefaults(traceIn, traceOut, coerce, layout, xName, yName) {
    var z = coerce('z');
    xName = xName || 'x';
    yName = yName || 'y';
    var x, y;

    if(z === undefined || !z.length) return 0;

    if(Lib.isArray1D(traceIn.z)) {
        x = coerce(xName);
        y = coerce(yName);

        var xlen = Lib.minRowLength(x);
        var ylen = Lib.minRowLength(y);

        // column z must be accompanied by xName and yName arrays
        if(xlen === 0 || ylen === 0) return 0;

        traceOut._length = Math.min(xlen, ylen, z.length);
    } else {
        x = coordDefaults(xName, coerce);
        y = coordDefaults(yName, coerce);

        // TODO put z validation elsewhere
        if(!isValidZ(z)) return 0;

        coerce('transpose');

        traceOut._length = null;
    }

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, [xName, yName], layout);

    return true;
};

function coordDefaults(coordStr, coerce) {
    var coord = coerce(coordStr);
    var coordType = coord ? coerce(coordStr + 'type', 'array') : 'scaled';

    if(coordType === 'scaled') {
        coerce(coordStr + '0');
        coerce('d' + coordStr);
    }

    return coord;
}

function isValidZ(z) {
    var allRowsAreArrays = true;
    var oneRowIsFilled = false;
    var hasOneNumber = false;
    var zi;

    /*
     * Without this step:
     *
     * hasOneNumber = false breaks contour but not heatmap
     * allRowsAreArrays = false breaks contour but not heatmap
     * oneRowIsFilled = false breaks both
     */

    for(var i = 0; i < z.length; i++) {
        zi = z[i];
        if(!Lib.isArrayOrTypedArray(zi)) {
            allRowsAreArrays = false;
            break;
        }
        if(zi.length > 0) oneRowIsFilled = true;
        for(var j = 0; j < zi.length; j++) {
            if(isNumeric(zi[j])) {
                hasOneNumber = true;
                break;
            }
        }
    }

    return (allRowsAreArrays && oneRowIsFilled && hasOneNumber);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaGVhdG1hcC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvY29sb3JiYXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9ob3Zlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL3N0eWxlX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC94eXpfZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIseUhBQWlEOzs7Ozs7Ozs7Ozs7QUNWakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCLHdCQUF3QixtQkFBTyxDQUFDLG1GQUFnQjtBQUNoRCwwQkFBMEIsbUJBQU8sQ0FBQyx1RkFBa0I7QUFDcEQseUJBQXlCLG1CQUFPLENBQUMsNEdBQXND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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGVBQWU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ3YjY0NjUzZWI1NDI1ZjAxMTM1ZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL2hlYXRtYXAnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWluOiAnem1pbicsXG4gICAgbWF4OiAnem1heCdcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgaGFuZGxlWFlaRGVmYXVsdHMgPSByZXF1aXJlKCcuL3h5el9kZWZhdWx0cycpO1xudmFyIGhhbmRsZVN0eWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuL3N0eWxlX2RlZmF1bHRzJyk7XG52YXIgY29sb3JzY2FsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciB2YWxpZERhdGEgPSBoYW5kbGVYWVpEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuICAgIGlmKCF2YWxpZERhdGEpIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIGhhbmRsZVN0eWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0KTtcblxuICAgIGNvZXJjZSgnaG92ZXJvbmdhcHMnKTtcbiAgICBjb2VyY2UoJ2Nvbm5lY3RnYXBzJywgTGliLmlzQXJyYXkxRCh0cmFjZU91dC56KSAmJiAodHJhY2VPdXQuenNtb290aCAhPT0gZmFsc2UpKTtcblxuICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICcnLCBjTGV0dGVyOiAneid9KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBGeCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBleHRyYWN0T3B0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpLmV4dHJhY3RPcHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlLCBob3ZlckxheWVyLCBjb250b3VyKSB7XG4gICAgdmFyIGNkMCA9IHBvaW50RGF0YS5jZFswXTtcbiAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgdmFyIHhhID0gcG9pbnREYXRhLnhhO1xuICAgIHZhciB5YSA9IHBvaW50RGF0YS55YTtcbiAgICB2YXIgeCA9IGNkMC54O1xuICAgIHZhciB5ID0gY2QwLnk7XG4gICAgdmFyIHogPSBjZDAuejtcbiAgICB2YXIgeGMgPSBjZDAueENlbnRlcjtcbiAgICB2YXIgeWMgPSBjZDAueUNlbnRlcjtcbiAgICB2YXIgem1hc2sgPSBjZDAuem1hc2s7XG4gICAgdmFyIHpob3ZlcmZvcm1hdCA9IHRyYWNlLnpob3ZlcmZvcm1hdDtcbiAgICB2YXIgeDIgPSB4O1xuICAgIHZhciB5MiA9IHk7XG5cbiAgICB2YXIgeGwsIHlsLCBueCwgbnk7XG5cbiAgICBpZihwb2ludERhdGEuaW5kZXggIT09IGZhbHNlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBueCA9IE1hdGgucm91bmQocG9pbnREYXRhLmluZGV4WzFdKTtcbiAgICAgICAgICAgIG55ID0gTWF0aC5yb3VuZChwb2ludERhdGEuaW5kZXhbMF0pO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIExpYi5lcnJvcignRXJyb3IgaG92ZXJpbmcgb24gaGVhdG1hcCwgJyArXG4gICAgICAgICAgICAgICAgJ3BvaW50TnVtYmVyIG11c3QgYmUgW3Jvdyxjb2xdLCBmb3VuZDonLCBwb2ludERhdGEuaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKG54IDwgMCB8fCBueCA+PSB6WzBdLmxlbmd0aCB8fCBueSA8IDAgfHwgbnkgPiB6Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKEZ4LmluYm94KHh2YWwgLSB4WzBdLCB4dmFsIC0geFt4Lmxlbmd0aCAtIDFdLCAwKSA+IDAgfHxcbiAgICAgICAgICAgIEZ4LmluYm94KHl2YWwgLSB5WzBdLCB5dmFsIC0geVt5Lmxlbmd0aCAtIDFdLCAwKSA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGNvbnRvdXIpIHtcbiAgICAgICAgICAgIHZhciBpMjtcbiAgICAgICAgICAgIHgyID0gWzIgKiB4WzBdIC0geFsxXV07XG5cbiAgICAgICAgICAgIGZvcihpMiA9IDE7IGkyIDwgeC5sZW5ndGg7IGkyKyspIHtcbiAgICAgICAgICAgICAgICB4Mi5wdXNoKCh4W2kyXSArIHhbaTIgLSAxXSkgLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHgyLnB1c2goWzIgKiB4W3gubGVuZ3RoIC0gMV0gLSB4W3gubGVuZ3RoIC0gMl1dKTtcblxuICAgICAgICAgICAgeTIgPSBbMiAqIHlbMF0gLSB5WzFdXTtcbiAgICAgICAgICAgIGZvcihpMiA9IDE7IGkyIDwgeS5sZW5ndGg7IGkyKyspIHtcbiAgICAgICAgICAgICAgICB5Mi5wdXNoKCh5W2kyXSArIHlbaTIgLSAxXSkgLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHkyLnB1c2goWzIgKiB5W3kubGVuZ3RoIC0gMV0gLSB5W3kubGVuZ3RoIC0gMl1dKTtcbiAgICAgICAgfVxuICAgICAgICBueCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHgyLmxlbmd0aCAtIDIsIExpYi5maW5kQmluKHh2YWwsIHgyKSkpO1xuICAgICAgICBueSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHkyLmxlbmd0aCAtIDIsIExpYi5maW5kQmluKHl2YWwsIHkyKSkpO1xuICAgIH1cblxuICAgIHZhciB4MCA9IHhhLmMycCh4W254XSk7XG4gICAgdmFyIHgxID0geGEuYzJwKHhbbnggKyAxXSk7XG4gICAgdmFyIHkwID0geWEuYzJwKHlbbnldKTtcbiAgICB2YXIgeTEgPSB5YS5jMnAoeVtueSArIDFdKTtcblxuICAgIGlmKGNvbnRvdXIpIHtcbiAgICAgICAgeDEgPSB4MDtcbiAgICAgICAgeGwgPSB4W254XTtcbiAgICAgICAgeTEgPSB5MDtcbiAgICAgICAgeWwgPSB5W255XTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB4bCA9IHhjID8geGNbbnhdIDogKCh4W254XSArIHhbbnggKyAxXSkgLyAyKTtcbiAgICAgICAgeWwgPSB5YyA/IHljW255XSA6ICgoeVtueV0gKyB5W255ICsgMV0pIC8gMik7XG5cbiAgICAgICAgaWYoeGEgJiYgeGEudHlwZSA9PT0gJ2NhdGVnb3J5JykgeGwgPSB4W254XTtcbiAgICAgICAgaWYoeWEgJiYgeWEudHlwZSA9PT0gJ2NhdGVnb3J5JykgeWwgPSB5W255XTtcblxuICAgICAgICBpZih0cmFjZS56c21vb3RoKSB7XG4gICAgICAgICAgICB4MCA9IHgxID0geGEuYzJwKHhsKTtcbiAgICAgICAgICAgIHkwID0geTEgPSB5YS5jMnAoeWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHpWYWwgPSB6W255XVtueF07XG4gICAgaWYoem1hc2sgJiYgIXptYXNrW255XVtueF0pIHpWYWwgPSB1bmRlZmluZWQ7XG5cbiAgICBpZih6VmFsID09PSB1bmRlZmluZWQgJiYgIXRyYWNlLmhvdmVyb25nYXBzKSByZXR1cm47XG5cbiAgICB2YXIgdGV4dDtcbiAgICBpZihBcnJheS5pc0FycmF5KGNkMC5ob3ZlcnRleHQpICYmIEFycmF5LmlzQXJyYXkoY2QwLmhvdmVydGV4dFtueV0pKSB7XG4gICAgICAgIHRleHQgPSBjZDAuaG92ZXJ0ZXh0W255XVtueF07XG4gICAgfSBlbHNlIGlmKEFycmF5LmlzQXJyYXkoY2QwLnRleHQpICYmIEFycmF5LmlzQXJyYXkoY2QwLnRleHRbbnldKSkge1xuICAgICAgICB0ZXh0ID0gY2QwLnRleHRbbnldW254XTtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBheGlzIGZvciBmb3JtYXR0aW5nIHRoZSB6IHZhbHVlXG4gICAgdmFyIGNPcHRzID0gZXh0cmFjdE9wdHModHJhY2UpO1xuICAgIHZhciBkdW1teUF4ID0ge1xuICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgcmFuZ2U6IFtjT3B0cy5taW4sIGNPcHRzLm1heF0sXG4gICAgICAgIGhvdmVyZm9ybWF0OiB6aG92ZXJmb3JtYXQsXG4gICAgICAgIF9zZXBhcmF0b3JzOiB4YS5fc2VwYXJhdG9ycyxcbiAgICAgICAgX251bUZvcm1hdDogeGEuX251bUZvcm1hdFxuICAgIH07XG4gICAgdmFyIHpMYWJlbCA9IEF4ZXMudGlja1RleHQoZHVtbXlBeCwgelZhbCwgJ2hvdmVyJykudGV4dDtcblxuICAgIHJldHVybiBbTGliLmV4dGVuZEZsYXQocG9pbnREYXRhLCB7XG4gICAgICAgIGluZGV4OiB0cmFjZS5fYWZ0ZXIyYmVmb3JlID8gdHJhY2UuX2FmdGVyMmJlZm9yZVtueV1bbnhdIDogW255LCBueF0sXG4gICAgICAgIC8vIG5ldmVyIGxldCBhIDJEIG92ZXJyaWRlIDFEIHR5cGUgYXMgY2xvc2VzdCBwb2ludFxuICAgICAgICBkaXN0YW5jZTogcG9pbnREYXRhLm1heEhvdmVyRGlzdGFuY2UsXG4gICAgICAgIHNwaWtlRGlzdGFuY2U6IHBvaW50RGF0YS5tYXhTcGlrZURpc3RhbmNlLFxuICAgICAgICB4MDogeDAsXG4gICAgICAgIHgxOiB4MSxcbiAgICAgICAgeTA6IHkwLFxuICAgICAgICB5MTogeTEsXG4gICAgICAgIHhMYWJlbFZhbDogeGwsXG4gICAgICAgIHlMYWJlbFZhbDogeWwsXG4gICAgICAgIHpMYWJlbFZhbDogelZhbCxcbiAgICAgICAgekxhYmVsOiB6TGFiZWwsXG4gICAgICAgIHRleHQ6IHRleHRcbiAgICB9KV07XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLFxuICAgIGNvbG9yYmFyOiByZXF1aXJlKCcuL2NvbG9yYmFyJyksXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKSxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnaGVhdG1hcCcsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbicpLFxuICAgIGNhdGVnb3JpZXM6IFsnY2FydGVzaWFuJywgJ3N2ZycsICcyZE1hcCcsICdzaG93TGVnZW5kJ10sXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBkYXRhIHRoYXQgZGVzY3JpYmVzIHRoZSBoZWF0bWFwIHZhbHVlLXRvLWNvbG9yIG1hcHBpbmcnLFxuICAgICAgICAgICAgJ2lzIHNldCBpbiBgemAuJyxcbiAgICAgICAgICAgICdEYXRhIGluIGB6YCBjYW4gZWl0aGVyIGJlIGEgezJEIGFycmF5fSBvZiB2YWx1ZXMgKHJhZ2dlZCBvciBub3QpJyxcbiAgICAgICAgICAgICdvciBhIDFEIGFycmF5IG9mIHZhbHVlcy4nLFxuXG4gICAgICAgICAgICAnSW4gdGhlIGNhc2Ugd2hlcmUgYHpgIGlzIGEgezJEIGFycmF5fSwnLFxuICAgICAgICAgICAgJ3NheSB0aGF0IGB6YCBoYXMgTiByb3dzIGFuZCBNIGNvbHVtbnMuJyxcbiAgICAgICAgICAgICdUaGVuLCBieSBkZWZhdWx0LCB0aGUgcmVzdWx0aW5nIGhlYXRtYXAgd2lsbCBoYXZlIE4gcGFydGl0aW9ucyBhbG9uZycsXG4gICAgICAgICAgICAndGhlIHkgYXhpcyBhbmQgTSBwYXJ0aXRpb25zIGFsb25nIHRoZSB4IGF4aXMuJyxcbiAgICAgICAgICAgICdJbiBvdGhlciB3b3JkcywgdGhlIGktdGggcm93LyBqLXRoIGNvbHVtbiBjZWxsIGluIGB6YCcsXG4gICAgICAgICAgICAnaXMgbWFwcGVkIHRvIHRoZSBpLXRoIHBhcnRpdGlvbiBvZiB0aGUgeSBheGlzJyxcbiAgICAgICAgICAgICcoc3RhcnRpbmcgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBwbG90KSBhbmQgdGhlIGotdGggcGFydGl0aW9uJyxcbiAgICAgICAgICAgICdvZiB0aGUgeC1heGlzIChzdGFydGluZyBmcm9tIHRoZSBsZWZ0IG9mIHRoZSBwbG90KS4nLFxuICAgICAgICAgICAgJ1RoaXMgYmVoYXZpb3IgY2FuIGJlIGZsaXBwZWQgYnkgdXNpbmcgYHRyYW5zcG9zZWAuJyxcbiAgICAgICAgICAgICdNb3Jlb3ZlciwgYHhgIChgeWApIGNhbiBiZSBwcm92aWRlZCB3aXRoIE0gb3IgTSsxIChOIG9yIE4rMSkgZWxlbWVudHMuJyxcbiAgICAgICAgICAgICdJZiBNIChOKSwgdGhlbiB0aGUgY29vcmRpbmF0ZXMgY29ycmVzcG9uZCB0byB0aGUgY2VudGVyIG9mIHRoZScsXG4gICAgICAgICAgICAnaGVhdG1hcCBjZWxscyBhbmQgdGhlIGNlbGxzIGhhdmUgZXF1YWwgd2lkdGguJyxcbiAgICAgICAgICAgICdJZiBNKzEgKE4rMSksIHRoZW4gdGhlIGNvb3JkaW5hdGVzIGNvcnJlc3BvbmQgdG8gdGhlIGVkZ2VzIG9mIHRoZScsXG4gICAgICAgICAgICAnaGVhdG1hcCBjZWxscy4nLFxuXG4gICAgICAgICAgICAnSW4gdGhlIGNhc2Ugd2hlcmUgYHpgIGlzIGEgMUQge2FycmF5fSwgdGhlIHggYW5kIHkgY29vcmRpbmF0ZXMgbXVzdCBiZScsXG4gICAgICAgICAgICAncHJvdmlkZWQgaW4gYHhgIGFuZCBgeWAgcmVzcGVjdGl2ZWx5IHRvIGZvcm0gZGF0YSB0cmlwbGV0cy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVN0eWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSkge1xuICAgIHZhciB6c21vb3RoID0gY29lcmNlKCd6c21vb3RoJyk7XG4gICAgaWYoenNtb290aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gZW5zdXJlIHRoYXQgeGdhcCBhbmQgeWdhcCBhcmUgY29lcmNlZCBvbmx5IHdoZW4genNtb290aCBhbGxvd3MgdGhlbSB0byBoYXZlIGFuIGVmZmVjdC5cbiAgICAgICAgY29lcmNlKCd4Z2FwJyk7XG4gICAgICAgIGNvZXJjZSgneWdhcCcpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnemhvdmVyZm9ybWF0Jyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVYWVpEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQsIHhOYW1lLCB5TmFtZSkge1xuICAgIHZhciB6ID0gY29lcmNlKCd6Jyk7XG4gICAgeE5hbWUgPSB4TmFtZSB8fCAneCc7XG4gICAgeU5hbWUgPSB5TmFtZSB8fCAneSc7XG4gICAgdmFyIHgsIHk7XG5cbiAgICBpZih6ID09PSB1bmRlZmluZWQgfHwgIXoubGVuZ3RoKSByZXR1cm4gMDtcblxuICAgIGlmKExpYi5pc0FycmF5MUQodHJhY2VJbi56KSkge1xuICAgICAgICB4ID0gY29lcmNlKHhOYW1lKTtcbiAgICAgICAgeSA9IGNvZXJjZSh5TmFtZSk7XG5cbiAgICAgICAgdmFyIHhsZW4gPSBMaWIubWluUm93TGVuZ3RoKHgpO1xuICAgICAgICB2YXIgeWxlbiA9IExpYi5taW5Sb3dMZW5ndGgoeSk7XG5cbiAgICAgICAgLy8gY29sdW1uIHogbXVzdCBiZSBhY2NvbXBhbmllZCBieSB4TmFtZSBhbmQgeU5hbWUgYXJyYXlzXG4gICAgICAgIGlmKHhsZW4gPT09IDAgfHwgeWxlbiA9PT0gMCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdHJhY2VPdXQuX2xlbmd0aCA9IE1hdGgubWluKHhsZW4sIHlsZW4sIHoubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB4ID0gY29vcmREZWZhdWx0cyh4TmFtZSwgY29lcmNlKTtcbiAgICAgICAgeSA9IGNvb3JkRGVmYXVsdHMoeU5hbWUsIGNvZXJjZSk7XG5cbiAgICAgICAgLy8gVE9ETyBwdXQgeiB2YWxpZGF0aW9uIGVsc2V3aGVyZVxuICAgICAgICBpZighaXNWYWxpZFooeikpIHJldHVybiAwO1xuXG4gICAgICAgIGNvZXJjZSgndHJhbnNwb3NlJyk7XG5cbiAgICAgICAgdHJhY2VPdXQuX2xlbmd0aCA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2NhbGVuZGFycycsICdoYW5kbGVUcmFjZURlZmF1bHRzJyk7XG4gICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgW3hOYW1lLCB5TmFtZV0sIGxheW91dCk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIGNvb3JkRGVmYXVsdHMoY29vcmRTdHIsIGNvZXJjZSkge1xuICAgIHZhciBjb29yZCA9IGNvZXJjZShjb29yZFN0cik7XG4gICAgdmFyIGNvb3JkVHlwZSA9IGNvb3JkID8gY29lcmNlKGNvb3JkU3RyICsgJ3R5cGUnLCAnYXJyYXknKSA6ICdzY2FsZWQnO1xuXG4gICAgaWYoY29vcmRUeXBlID09PSAnc2NhbGVkJykge1xuICAgICAgICBjb2VyY2UoY29vcmRTdHIgKyAnMCcpO1xuICAgICAgICBjb2VyY2UoJ2QnICsgY29vcmRTdHIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb29yZDtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFooeikge1xuICAgIHZhciBhbGxSb3dzQXJlQXJyYXlzID0gdHJ1ZTtcbiAgICB2YXIgb25lUm93SXNGaWxsZWQgPSBmYWxzZTtcbiAgICB2YXIgaGFzT25lTnVtYmVyID0gZmFsc2U7XG4gICAgdmFyIHppO1xuXG4gICAgLypcbiAgICAgKiBXaXRob3V0IHRoaXMgc3RlcDpcbiAgICAgKlxuICAgICAqIGhhc09uZU51bWJlciA9IGZhbHNlIGJyZWFrcyBjb250b3VyIGJ1dCBub3QgaGVhdG1hcFxuICAgICAqIGFsbFJvd3NBcmVBcnJheXMgPSBmYWxzZSBicmVha3MgY29udG91ciBidXQgbm90IGhlYXRtYXBcbiAgICAgKiBvbmVSb3dJc0ZpbGxlZCA9IGZhbHNlIGJyZWFrcyBib3RoXG4gICAgICovXG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgei5sZW5ndGg7IGkrKykge1xuICAgICAgICB6aSA9IHpbaV07XG4gICAgICAgIGlmKCFMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh6aSkpIHtcbiAgICAgICAgICAgIGFsbFJvd3NBcmVBcnJheXMgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmKHppLmxlbmd0aCA+IDApIG9uZVJvd0lzRmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHppLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZihpc051bWVyaWMoemlbal0pKSB7XG4gICAgICAgICAgICAgICAgaGFzT25lTnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoYWxsUm93c0FyZUFycmF5cyAmJiBvbmVSb3dJc0ZpbGxlZCAmJiBoYXNPbmVOdW1iZXIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==