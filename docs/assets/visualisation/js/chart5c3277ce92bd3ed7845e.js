(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_contour_js"],{

/***/ "./node_modules/plotly.js/lib/contour.js":
/*!***********************************************!*\
  !*** ./node_modules/plotly.js/lib/contour.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/contour */ "./node_modules/plotly.js/src/traces/contour/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/calc.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/calc.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");

var heatmapCalc = __webpack_require__(/*! ../heatmap/calc */ "./node_modules/plotly.js/src/traces/heatmap/calc.js");
var setContours = __webpack_require__(/*! ./set_contours */ "./node_modules/plotly.js/src/traces/contour/set_contours.js");
var endPlus = __webpack_require__(/*! ./end_plus */ "./node_modules/plotly.js/src/traces/contour/end_plus.js");

// most is the same as heatmap calc, then adjust it
// though a few things inside heatmap calc still look for
// contour maps, because the makeBoundArray calls are too entangled
module.exports = function calc(gd, trace) {
    var cd = heatmapCalc(gd, trace);

    var zOut = cd[0].z;
    setContours(trace, zOut);

    var contours = trace.contours;
    var cOpts = Colorscale.extractOpts(trace);
    var cVals;

    if(contours.coloring === 'heatmap' && cOpts.auto && trace.autocontour === false) {
        var start = contours.start;
        var end = endPlus(contours);
        var cs = contours.size || 1;
        var nc = Math.floor((end - start) / cs) + 1;

        if(!isFinite(cs)) {
            cs = 1;
            nc = 1;
        }

        var min0 = start - cs / 2;
        var max0 = min0 + nc * cs;
        cVals = [min0, max0];
    } else {
        cVals = zOut;
    }

    Colorscale.calc(gd, trace, {vals: cVals, cLetter: 'z'});

    return cd;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/constraint_defaults.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/constraint_defaults.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var handleLabelDefaults = __webpack_require__(/*! ./label_defaults */ "./node_modules/plotly.js/src/traces/contour/label_defaults.js");

var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var addOpacity = Color.addOpacity;
var opacity = Color.opacity;

var filterOps = __webpack_require__(/*! ../../constants/filter_ops */ "./node_modules/plotly.js/src/constants/filter_ops.js");
var CONSTRAINT_REDUCTION = filterOps.CONSTRAINT_REDUCTION;
var COMPARISON_OPS2 = filterOps.COMPARISON_OPS2;

module.exports = function handleConstraintDefaults(traceIn, traceOut, coerce, layout, defaultColor, opts) {
    var contours = traceOut.contours;
    var showLines, lineColor, fillColor;

    var operation = coerce('contours.operation');
    contours._operation = CONSTRAINT_REDUCTION[operation];

    handleConstraintValueDefaults(coerce, contours);

    if(operation === '=') {
        showLines = contours.showlines = true;
    } else {
        showLines = coerce('contours.showlines');
        fillColor = coerce('fillcolor', addOpacity(
            (traceIn.line || {}).color || defaultColor, 0.5
        ));
    }

    if(showLines) {
        var lineDfltColor = fillColor && opacity(fillColor) ?
            addOpacity(traceOut.fillcolor, 1) :
            defaultColor;
        lineColor = coerce('line.color', lineDfltColor);
        coerce('line.width', 2);
        coerce('line.dash');
    }

    coerce('line.smoothing');

    handleLabelDefaults(coerce, layout, lineColor, opts);
};

function handleConstraintValueDefaults(coerce, contours) {
    var zvalue;

    if(COMPARISON_OPS2.indexOf(contours.operation) === -1) {
        // Requires an array of two numbers:
        coerce('contours.value', [0, 1]);

        if(!Array.isArray(contours.value)) {
            if(isNumeric(contours.value)) {
                zvalue = parseFloat(contours.value);
                contours.value = [zvalue, zvalue + 1];
            }
        } else if(contours.value.length > 2) {
            contours.value = contours.value.slice(2);
        } else if(contours.length === 0) {
            contours.value = [0, 1];
        } else if(contours.length < 2) {
            zvalue = parseFloat(contours.value[0]);
            contours.value = [zvalue, zvalue + 1];
        } else {
            contours.value = [
                parseFloat(contours.value[0]),
                parseFloat(contours.value[1])
            ];
        }
    } else {
        // Requires a single scalar:
        coerce('contours.value', 0);

        if(!isNumeric(contours.value)) {
            if(Array.isArray(contours.value)) {
                contours.value = parseFloat(contours.value[0]);
            } else {
                contours.value = 0;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/defaults.js ***!
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

var handleXYZDefaults = __webpack_require__(/*! ../heatmap/xyz_defaults */ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js");
var handleConstraintDefaults = __webpack_require__(/*! ./constraint_defaults */ "./node_modules/plotly.js/src/traces/contour/constraint_defaults.js");
var handleContoursDefaults = __webpack_require__(/*! ./contours_defaults */ "./node_modules/plotly.js/src/traces/contour/contours_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ./style_defaults */ "./node_modules/plotly.js/src/traces/contour/style_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/contour/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    function coerce2(attr) {
        return Lib.coerce2(traceIn, traceOut, attributes, attr);
    }

    var len = handleXYZDefaults(traceIn, traceOut, coerce, layout);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');
    coerce('hoverongaps');

    var isConstraint = (coerce('contours.type') === 'constraint');
    coerce('connectgaps', Lib.isArray1D(traceOut.z));

    if(isConstraint) {
        handleConstraintDefaults(traceIn, traceOut, coerce, layout, defaultColor);
    } else {
        handleContoursDefaults(traceIn, traceOut, coerce, coerce2);
        handleStyleDefaults(traceIn, traceOut, coerce, layout);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/hover.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/hover.js ***!
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




var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var heatmapHoverPoints = __webpack_require__(/*! ../heatmap/hover */ "./node_modules/plotly.js/src/traces/heatmap/hover.js");

module.exports = function hoverPoints(pointData, xval, yval, hovermode, hoverLayer) {
    var hoverData = heatmapHoverPoints(pointData, xval, yval, hovermode, hoverLayer, true);

    if(hoverData) {
        hoverData.forEach(function(hoverPt) {
            var trace = hoverPt.trace;
            if(trace.contours.type === 'constraint') {
                if(trace.fillcolor && Color.opacity(trace.fillcolor)) {
                    hoverPt.color = Color.addOpacity(trace.fillcolor, 1);
                } else if(trace.contours.showlines && Color.opacity(trace.line.color)) {
                    hoverPt.color = Color.addOpacity(trace.line.color, 1);
                }
            }
        });
    }

    return hoverData;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/index.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/contour/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/contour/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/contour/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/contour/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/contour/style.js"),
    colorbar: __webpack_require__(/*! ./colorbar */ "./node_modules/plotly.js/src/traces/contour/colorbar.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/contour/hover.js"),

    moduleType: 'trace',
    name: 'contour',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', '2dMap', 'contour', 'showLegend'],
    meta: {
        description: [
            'The data from which contour lines are computed is set in `z`.',
            'Data in `z` must be a {2D array} of numbers.',

            'Say that `z` has N rows and M columns, then by default,',
            'these N rows correspond to N y coordinates',
            '(set in `y` or auto-generated) and the M columns',
            'correspond to M x coordinates (set in `x` or auto-generated).',
            'By setting `transpose` to *true*, the above behavior is flipped.'
        ].join(' ')
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvY29udG91ci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvY29uc3RyYWludF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY29udG91ci9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvaG92ZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL3h5el9kZWZhdWx0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYix5SEFBaUQ7Ozs7Ozs7Ozs7OztBQ1ZqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixpQkFBaUIsbUJBQU8sQ0FBQyxnR0FBNkI7O0FBRXRELGtCQUFrQixtQkFBTyxDQUFDLDRFQUFpQjtBQUMzQyxrQkFBa0IsbUJBQU8sQ0FBQyxtRkFBZ0I7QUFDMUMsY0FBYyxtQkFBTyxDQUFDLDJF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RUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImNoYXJ0NWMzMjc3Y2U5MmJkM2VkNzg0NWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9jb250b3VyJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJyk7XG5cbnZhciBoZWF0bWFwQ2FsYyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvY2FsYycpO1xudmFyIHNldENvbnRvdXJzID0gcmVxdWlyZSgnLi9zZXRfY29udG91cnMnKTtcbnZhciBlbmRQbHVzID0gcmVxdWlyZSgnLi9lbmRfcGx1cycpO1xuXG4vLyBtb3N0IGlzIHRoZSBzYW1lIGFzIGhlYXRtYXAgY2FsYywgdGhlbiBhZGp1c3QgaXRcbi8vIHRob3VnaCBhIGZldyB0aGluZ3MgaW5zaWRlIGhlYXRtYXAgY2FsYyBzdGlsbCBsb29rIGZvclxuLy8gY29udG91ciBtYXBzLCBiZWNhdXNlIHRoZSBtYWtlQm91bmRBcnJheSBjYWxscyBhcmUgdG9vIGVudGFuZ2xlZFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBjZCA9IGhlYXRtYXBDYWxjKGdkLCB0cmFjZSk7XG5cbiAgICB2YXIgek91dCA9IGNkWzBdLno7XG4gICAgc2V0Q29udG91cnModHJhY2UsIHpPdXQpO1xuXG4gICAgdmFyIGNvbnRvdXJzID0gdHJhY2UuY29udG91cnM7XG4gICAgdmFyIGNPcHRzID0gQ29sb3JzY2FsZS5leHRyYWN0T3B0cyh0cmFjZSk7XG4gICAgdmFyIGNWYWxzO1xuXG4gICAgaWYoY29udG91cnMuY29sb3JpbmcgPT09ICdoZWF0bWFwJyAmJiBjT3B0cy5hdXRvICYmIHRyYWNlLmF1dG9jb250b3VyID09PSBmYWxzZSkge1xuICAgICAgICB2YXIgc3RhcnQgPSBjb250b3Vycy5zdGFydDtcbiAgICAgICAgdmFyIGVuZCA9IGVuZFBsdXMoY29udG91cnMpO1xuICAgICAgICB2YXIgY3MgPSBjb250b3Vycy5zaXplIHx8IDE7XG4gICAgICAgIHZhciBuYyA9IE1hdGguZmxvb3IoKGVuZCAtIHN0YXJ0KSAvIGNzKSArIDE7XG5cbiAgICAgICAgaWYoIWlzRmluaXRlKGNzKSkge1xuICAgICAgICAgICAgY3MgPSAxO1xuICAgICAgICAgICAgbmMgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pbjAgPSBzdGFydCAtIGNzIC8gMjtcbiAgICAgICAgdmFyIG1heDAgPSBtaW4wICsgbmMgKiBjcztcbiAgICAgICAgY1ZhbHMgPSBbbWluMCwgbWF4MF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY1ZhbHMgPSB6T3V0O1xuICAgIH1cblxuICAgIENvbG9yc2NhbGUuY2FsYyhnZCwgdHJhY2UsIHt2YWxzOiBjVmFscywgY0xldHRlcjogJ3onfSk7XG5cbiAgICByZXR1cm4gY2Q7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcblxudmFyIGhhbmRsZUxhYmVsRGVmYXVsdHMgPSByZXF1aXJlKCcuL2xhYmVsX2RlZmF1bHRzJyk7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBhZGRPcGFjaXR5ID0gQ29sb3IuYWRkT3BhY2l0eTtcbnZhciBvcGFjaXR5ID0gQ29sb3Iub3BhY2l0eTtcblxudmFyIGZpbHRlck9wcyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9maWx0ZXJfb3BzJyk7XG52YXIgQ09OU1RSQUlOVF9SRURVQ1RJT04gPSBmaWx0ZXJPcHMuQ09OU1RSQUlOVF9SRURVQ1RJT047XG52YXIgQ09NUEFSSVNPTl9PUFMyID0gZmlsdGVyT3BzLkNPTVBBUklTT05fT1BTMjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVDb25zdHJhaW50RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0LCBkZWZhdWx0Q29sb3IsIG9wdHMpIHtcbiAgICB2YXIgY29udG91cnMgPSB0cmFjZU91dC5jb250b3VycztcbiAgICB2YXIgc2hvd0xpbmVzLCBsaW5lQ29sb3IsIGZpbGxDb2xvcjtcblxuICAgIHZhciBvcGVyYXRpb24gPSBjb2VyY2UoJ2NvbnRvdXJzLm9wZXJhdGlvbicpO1xuICAgIGNvbnRvdXJzLl9vcGVyYXRpb24gPSBDT05TVFJBSU5UX1JFRFVDVElPTltvcGVyYXRpb25dO1xuXG4gICAgaGFuZGxlQ29uc3RyYWludFZhbHVlRGVmYXVsdHMoY29lcmNlLCBjb250b3Vycyk7XG5cbiAgICBpZihvcGVyYXRpb24gPT09ICc9Jykge1xuICAgICAgICBzaG93TGluZXMgPSBjb250b3Vycy5zaG93bGluZXMgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNob3dMaW5lcyA9IGNvZXJjZSgnY29udG91cnMuc2hvd2xpbmVzJyk7XG4gICAgICAgIGZpbGxDb2xvciA9IGNvZXJjZSgnZmlsbGNvbG9yJywgYWRkT3BhY2l0eShcbiAgICAgICAgICAgICh0cmFjZUluLmxpbmUgfHwge30pLmNvbG9yIHx8IGRlZmF1bHRDb2xvciwgMC41XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIGlmKHNob3dMaW5lcykge1xuICAgICAgICB2YXIgbGluZURmbHRDb2xvciA9IGZpbGxDb2xvciAmJiBvcGFjaXR5KGZpbGxDb2xvcikgP1xuICAgICAgICAgICAgYWRkT3BhY2l0eSh0cmFjZU91dC5maWxsY29sb3IsIDEpIDpcbiAgICAgICAgICAgIGRlZmF1bHRDb2xvcjtcbiAgICAgICAgbGluZUNvbG9yID0gY29lcmNlKCdsaW5lLmNvbG9yJywgbGluZURmbHRDb2xvcik7XG4gICAgICAgIGNvZXJjZSgnbGluZS53aWR0aCcsIDIpO1xuICAgICAgICBjb2VyY2UoJ2xpbmUuZGFzaCcpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnbGluZS5zbW9vdGhpbmcnKTtcblxuICAgIGhhbmRsZUxhYmVsRGVmYXVsdHMoY29lcmNlLCBsYXlvdXQsIGxpbmVDb2xvciwgb3B0cyk7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVDb25zdHJhaW50VmFsdWVEZWZhdWx0cyhjb2VyY2UsIGNvbnRvdXJzKSB7XG4gICAgdmFyIHp2YWx1ZTtcblxuICAgIGlmKENPTVBBUklTT05fT1BTMi5pbmRleE9mKGNvbnRvdXJzLm9wZXJhdGlvbikgPT09IC0xKSB7XG4gICAgICAgIC8vIFJlcXVpcmVzIGFuIGFycmF5IG9mIHR3byBudW1iZXJzOlxuICAgICAgICBjb2VyY2UoJ2NvbnRvdXJzLnZhbHVlJywgWzAsIDFdKTtcblxuICAgICAgICBpZighQXJyYXkuaXNBcnJheShjb250b3Vycy52YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmKGlzTnVtZXJpYyhjb250b3Vycy52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB6dmFsdWUgPSBwYXJzZUZsb2F0KGNvbnRvdXJzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IFt6dmFsdWUsIHp2YWx1ZSArIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYoY29udG91cnMudmFsdWUubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgY29udG91cnMudmFsdWUgPSBjb250b3Vycy52YWx1ZS5zbGljZSgyKTtcbiAgICAgICAgfSBlbHNlIGlmKGNvbnRvdXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29udG91cnMudmFsdWUgPSBbMCwgMV07XG4gICAgICAgIH0gZWxzZSBpZihjb250b3Vycy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICB6dmFsdWUgPSBwYXJzZUZsb2F0KGNvbnRvdXJzLnZhbHVlWzBdKTtcbiAgICAgICAgICAgIGNvbnRvdXJzLnZhbHVlID0gW3p2YWx1ZSwgenZhbHVlICsgMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IFtcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KGNvbnRvdXJzLnZhbHVlWzBdKSxcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KGNvbnRvdXJzLnZhbHVlWzFdKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlcXVpcmVzIGEgc2luZ2xlIHNjYWxhcjpcbiAgICAgICAgY29lcmNlKCdjb250b3Vycy52YWx1ZScsIDApO1xuXG4gICAgICAgIGlmKCFpc051bWVyaWMoY29udG91cnMudmFsdWUpKSB7XG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KGNvbnRvdXJzLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRvdXJzLnZhbHVlID0gcGFyc2VGbG9hdChjb250b3Vycy52YWx1ZVswXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRvdXJzLnZhbHVlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgaGFuZGxlWFlaRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9oZWF0bWFwL3h5el9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUNvbnN0cmFpbnREZWZhdWx0cyA9IHJlcXVpcmUoJy4vY29uc3RyYWludF9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUNvbnRvdXJzRGVmYXVsdHMgPSByZXF1aXJlKCcuL2NvbnRvdXJzX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlU3R5bGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4vc3R5bGVfZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29lcmNlMihhdHRyKSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlMih0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0cik7XG4gICAgfVxuXG4gICAgdmFyIGxlbiA9IGhhbmRsZVhZWkRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgaWYoIWxlbikge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3RleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuICAgIGNvZXJjZSgnaG92ZXJvbmdhcHMnKTtcblxuICAgIHZhciBpc0NvbnN0cmFpbnQgPSAoY29lcmNlKCdjb250b3Vycy50eXBlJykgPT09ICdjb25zdHJhaW50Jyk7XG4gICAgY29lcmNlKCdjb25uZWN0Z2FwcycsIExpYi5pc0FycmF5MUQodHJhY2VPdXQueikpO1xuXG4gICAgaWYoaXNDb25zdHJhaW50KSB7XG4gICAgICAgIGhhbmRsZUNvbnN0cmFpbnREZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQsIGRlZmF1bHRDb2xvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlQ29udG91cnNEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBjb2VyY2UyKTtcbiAgICAgICAgaGFuZGxlU3R5bGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xuXG52YXIgaGVhdG1hcEhvdmVyUG9pbnRzID0gcmVxdWlyZSgnLi4vaGVhdG1hcC9ob3ZlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlLCBob3ZlckxheWVyKSB7XG4gICAgdmFyIGhvdmVyRGF0YSA9IGhlYXRtYXBIb3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSwgaG92ZXJMYXllciwgdHJ1ZSk7XG5cbiAgICBpZihob3ZlckRhdGEpIHtcbiAgICAgICAgaG92ZXJEYXRhLmZvckVhY2goZnVuY3Rpb24oaG92ZXJQdCkge1xuICAgICAgICAgICAgdmFyIHRyYWNlID0gaG92ZXJQdC50cmFjZTtcbiAgICAgICAgICAgIGlmKHRyYWNlLmNvbnRvdXJzLnR5cGUgPT09ICdjb25zdHJhaW50Jykge1xuICAgICAgICAgICAgICAgIGlmKHRyYWNlLmZpbGxjb2xvciAmJiBDb2xvci5vcGFjaXR5KHRyYWNlLmZpbGxjb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJQdC5jb2xvciA9IENvbG9yLmFkZE9wYWNpdHkodHJhY2UuZmlsbGNvbG9yLCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodHJhY2UuY29udG91cnMuc2hvd2xpbmVzICYmIENvbG9yLm9wYWNpdHkodHJhY2UubGluZS5jb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJQdC5jb2xvciA9IENvbG9yLmFkZE9wYWNpdHkodHJhY2UubGluZS5jb2xvciwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaG92ZXJEYXRhO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKS5wbG90LFxuICAgIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4vY29sb3JiYXInKSxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnY29udG91cicsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbicpLFxuICAgIGNhdGVnb3JpZXM6IFsnY2FydGVzaWFuJywgJ3N2ZycsICcyZE1hcCcsICdjb250b3VyJywgJ3Nob3dMZWdlbmQnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIGRhdGEgZnJvbSB3aGljaCBjb250b3VyIGxpbmVzIGFyZSBjb21wdXRlZCBpcyBzZXQgaW4gYHpgLicsXG4gICAgICAgICAgICAnRGF0YSBpbiBgemAgbXVzdCBiZSBhIHsyRCBhcnJheX0gb2YgbnVtYmVycy4nLFxuXG4gICAgICAgICAgICAnU2F5IHRoYXQgYHpgIGhhcyBOIHJvd3MgYW5kIE0gY29sdW1ucywgdGhlbiBieSBkZWZhdWx0LCcsXG4gICAgICAgICAgICAndGhlc2UgTiByb3dzIGNvcnJlc3BvbmQgdG8gTiB5IGNvb3JkaW5hdGVzJyxcbiAgICAgICAgICAgICcoc2V0IGluIGB5YCBvciBhdXRvLWdlbmVyYXRlZCkgYW5kIHRoZSBNIGNvbHVtbnMnLFxuICAgICAgICAgICAgJ2NvcnJlc3BvbmQgdG8gTSB4IGNvb3JkaW5hdGVzIChzZXQgaW4gYHhgIG9yIGF1dG8tZ2VuZXJhdGVkKS4nLFxuICAgICAgICAgICAgJ0J5IHNldHRpbmcgYHRyYW5zcG9zZWAgdG8gKnRydWUqLCB0aGUgYWJvdmUgYmVoYXZpb3IgaXMgZmxpcHBlZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEZ4ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meCcpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIGV4dHJhY3RPcHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJykuZXh0cmFjdE9wdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUsIGhvdmVyTGF5ZXIsIGNvbnRvdXIpIHtcbiAgICB2YXIgY2QwID0gcG9pbnREYXRhLmNkWzBdO1xuICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcbiAgICB2YXIgeGEgPSBwb2ludERhdGEueGE7XG4gICAgdmFyIHlhID0gcG9pbnREYXRhLnlhO1xuICAgIHZhciB4ID0gY2QwLng7XG4gICAgdmFyIHkgPSBjZDAueTtcbiAgICB2YXIgeiA9IGNkMC56O1xuICAgIHZhciB4YyA9IGNkMC54Q2VudGVyO1xuICAgIHZhciB5YyA9IGNkMC55Q2VudGVyO1xuICAgIHZhciB6bWFzayA9IGNkMC56bWFzaztcbiAgICB2YXIgemhvdmVyZm9ybWF0ID0gdHJhY2UuemhvdmVyZm9ybWF0O1xuICAgIHZhciB4MiA9IHg7XG4gICAgdmFyIHkyID0geTtcblxuICAgIHZhciB4bCwgeWwsIG54LCBueTtcblxuICAgIGlmKHBvaW50RGF0YS5pbmRleCAhPT0gZmFsc2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG54ID0gTWF0aC5yb3VuZChwb2ludERhdGEuaW5kZXhbMV0pO1xuICAgICAgICAgICAgbnkgPSBNYXRoLnJvdW5kKHBvaW50RGF0YS5pbmRleFswXSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgTGliLmVycm9yKCdFcnJvciBob3ZlcmluZyBvbiBoZWF0bWFwLCAnICtcbiAgICAgICAgICAgICAgICAncG9pbnROdW1iZXIgbXVzdCBiZSBbcm93LGNvbF0sIGZvdW5kOicsIHBvaW50RGF0YS5pbmRleCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYobnggPCAwIHx8IG54ID49IHpbMF0ubGVuZ3RoIHx8IG55IDwgMCB8fCBueSA+IHoubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYoRnguaW5ib3goeHZhbCAtIHhbMF0sIHh2YWwgLSB4W3gubGVuZ3RoIC0gMV0sIDApID4gMCB8fFxuICAgICAgICAgICAgRnguaW5ib3goeXZhbCAtIHlbMF0sIHl2YWwgLSB5W3kubGVuZ3RoIC0gMV0sIDApID4gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYoY29udG91cikge1xuICAgICAgICAgICAgdmFyIGkyO1xuICAgICAgICAgICAgeDIgPSBbMiAqIHhbMF0gLSB4WzFdXTtcblxuICAgICAgICAgICAgZm9yKGkyID0gMTsgaTIgPCB4Lmxlbmd0aDsgaTIrKykge1xuICAgICAgICAgICAgICAgIHgyLnB1c2goKHhbaTJdICsgeFtpMiAtIDFdKSAvIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeDIucHVzaChbMiAqIHhbeC5sZW5ndGggLSAxXSAtIHhbeC5sZW5ndGggLSAyXV0pO1xuXG4gICAgICAgICAgICB5MiA9IFsyICogeVswXSAtIHlbMV1dO1xuICAgICAgICAgICAgZm9yKGkyID0gMTsgaTIgPCB5Lmxlbmd0aDsgaTIrKykge1xuICAgICAgICAgICAgICAgIHkyLnB1c2goKHlbaTJdICsgeVtpMiAtIDFdKSAvIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeTIucHVzaChbMiAqIHlbeS5sZW5ndGggLSAxXSAtIHlbeS5sZW5ndGggLSAyXV0pO1xuICAgICAgICB9XG4gICAgICAgIG54ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oeDIubGVuZ3RoIC0gMiwgTGliLmZpbmRCaW4oeHZhbCwgeDIpKSk7XG4gICAgICAgIG55ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oeTIubGVuZ3RoIC0gMiwgTGliLmZpbmRCaW4oeXZhbCwgeTIpKSk7XG4gICAgfVxuXG4gICAgdmFyIHgwID0geGEuYzJwKHhbbnhdKTtcbiAgICB2YXIgeDEgPSB4YS5jMnAoeFtueCArIDFdKTtcbiAgICB2YXIgeTAgPSB5YS5jMnAoeVtueV0pO1xuICAgIHZhciB5MSA9IHlhLmMycCh5W255ICsgMV0pO1xuXG4gICAgaWYoY29udG91cikge1xuICAgICAgICB4MSA9IHgwO1xuICAgICAgICB4bCA9IHhbbnhdO1xuICAgICAgICB5MSA9IHkwO1xuICAgICAgICB5bCA9IHlbbnldO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHhsID0geGMgPyB4Y1tueF0gOiAoKHhbbnhdICsgeFtueCArIDFdKSAvIDIpO1xuICAgICAgICB5bCA9IHljID8geWNbbnldIDogKCh5W255XSArIHlbbnkgKyAxXSkgLyAyKTtcblxuICAgICAgICBpZih4YSAmJiB4YS50eXBlID09PSAnY2F0ZWdvcnknKSB4bCA9IHhbbnhdO1xuICAgICAgICBpZih5YSAmJiB5YS50eXBlID09PSAnY2F0ZWdvcnknKSB5bCA9IHlbbnldO1xuXG4gICAgICAgIGlmKHRyYWNlLnpzbW9vdGgpIHtcbiAgICAgICAgICAgIHgwID0geDEgPSB4YS5jMnAoeGwpO1xuICAgICAgICAgICAgeTAgPSB5MSA9IHlhLmMycCh5bCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgelZhbCA9IHpbbnldW254XTtcbiAgICBpZih6bWFzayAmJiAhem1hc2tbbnldW254XSkgelZhbCA9IHVuZGVmaW5lZDtcblxuICAgIGlmKHpWYWwgPT09IHVuZGVmaW5lZCAmJiAhdHJhY2UuaG92ZXJvbmdhcHMpIHJldHVybjtcblxuICAgIHZhciB0ZXh0O1xuICAgIGlmKEFycmF5LmlzQXJyYXkoY2QwLmhvdmVydGV4dCkgJiYgQXJyYXkuaXNBcnJheShjZDAuaG92ZXJ0ZXh0W255XSkpIHtcbiAgICAgICAgdGV4dCA9IGNkMC5ob3ZlcnRleHRbbnldW254XTtcbiAgICB9IGVsc2UgaWYoQXJyYXkuaXNBcnJheShjZDAudGV4dCkgJiYgQXJyYXkuaXNBcnJheShjZDAudGV4dFtueV0pKSB7XG4gICAgICAgIHRleHQgPSBjZDAudGV4dFtueV1bbnhdO1xuICAgIH1cblxuICAgIC8vIGR1bW15IGF4aXMgZm9yIGZvcm1hdHRpbmcgdGhlIHogdmFsdWVcbiAgICB2YXIgY09wdHMgPSBleHRyYWN0T3B0cyh0cmFjZSk7XG4gICAgdmFyIGR1bW15QXggPSB7XG4gICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICByYW5nZTogW2NPcHRzLm1pbiwgY09wdHMubWF4XSxcbiAgICAgICAgaG92ZXJmb3JtYXQ6IHpob3ZlcmZvcm1hdCxcbiAgICAgICAgX3NlcGFyYXRvcnM6IHhhLl9zZXBhcmF0b3JzLFxuICAgICAgICBfbnVtRm9ybWF0OiB4YS5fbnVtRm9ybWF0XG4gICAgfTtcbiAgICB2YXIgekxhYmVsID0gQXhlcy50aWNrVGV4dChkdW1teUF4LCB6VmFsLCAnaG92ZXInKS50ZXh0O1xuXG4gICAgcmV0dXJuIFtMaWIuZXh0ZW5kRmxhdChwb2ludERhdGEsIHtcbiAgICAgICAgaW5kZXg6IHRyYWNlLl9hZnRlcjJiZWZvcmUgPyB0cmFjZS5fYWZ0ZXIyYmVmb3JlW255XVtueF0gOiBbbnksIG54XSxcbiAgICAgICAgLy8gbmV2ZXIgbGV0IGEgMkQgb3ZlcnJpZGUgMUQgdHlwZSBhcyBjbG9zZXN0IHBvaW50XG4gICAgICAgIGRpc3RhbmNlOiBwb2ludERhdGEubWF4SG92ZXJEaXN0YW5jZSxcbiAgICAgICAgc3Bpa2VEaXN0YW5jZTogcG9pbnREYXRhLm1heFNwaWtlRGlzdGFuY2UsXG4gICAgICAgIHgwOiB4MCxcbiAgICAgICAgeDE6IHgxLFxuICAgICAgICB5MDogeTAsXG4gICAgICAgIHkxOiB5MSxcbiAgICAgICAgeExhYmVsVmFsOiB4bCxcbiAgICAgICAgeUxhYmVsVmFsOiB5bCxcbiAgICAgICAgekxhYmVsVmFsOiB6VmFsLFxuICAgICAgICB6TGFiZWw6IHpMYWJlbCxcbiAgICAgICAgdGV4dDogdGV4dFxuICAgIH0pXTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVhZWkRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCwgeE5hbWUsIHlOYW1lKSB7XG4gICAgdmFyIHogPSBjb2VyY2UoJ3onKTtcbiAgICB4TmFtZSA9IHhOYW1lIHx8ICd4JztcbiAgICB5TmFtZSA9IHlOYW1lIHx8ICd5JztcbiAgICB2YXIgeCwgeTtcblxuICAgIGlmKHogPT09IHVuZGVmaW5lZCB8fCAhei5sZW5ndGgpIHJldHVybiAwO1xuXG4gICAgaWYoTGliLmlzQXJyYXkxRCh0cmFjZUluLnopKSB7XG4gICAgICAgIHggPSBjb2VyY2UoeE5hbWUpO1xuICAgICAgICB5ID0gY29lcmNlKHlOYW1lKTtcblxuICAgICAgICB2YXIgeGxlbiA9IExpYi5taW5Sb3dMZW5ndGgoeCk7XG4gICAgICAgIHZhciB5bGVuID0gTGliLm1pblJvd0xlbmd0aCh5KTtcblxuICAgICAgICAvLyBjb2x1bW4geiBtdXN0IGJlIGFjY29tcGFuaWVkIGJ5IHhOYW1lIGFuZCB5TmFtZSBhcnJheXNcbiAgICAgICAgaWYoeGxlbiA9PT0gMCB8fCB5bGVuID09PSAwKSByZXR1cm4gMDtcblxuICAgICAgICB0cmFjZU91dC5fbGVuZ3RoID0gTWF0aC5taW4oeGxlbiwgeWxlbiwgei5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHggPSBjb29yZERlZmF1bHRzKHhOYW1lLCBjb2VyY2UpO1xuICAgICAgICB5ID0gY29vcmREZWZhdWx0cyh5TmFtZSwgY29lcmNlKTtcblxuICAgICAgICAvLyBUT0RPIHB1dCB6IHZhbGlkYXRpb24gZWxzZXdoZXJlXG4gICAgICAgIGlmKCFpc1ZhbGlkWih6KSkgcmV0dXJuIDA7XG5cbiAgICAgICAgY29lcmNlKCd0cmFuc3Bvc2UnKTtcblxuICAgICAgICB0cmFjZU91dC5fbGVuZ3RoID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY2FsZW5kYXJzJywgJ2hhbmRsZVRyYWNlRGVmYXVsdHMnKTtcbiAgICBoYW5kbGVDYWxlbmRhckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBbeE5hbWUsIHlOYW1lXSwgbGF5b3V0KTtcblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gY29vcmREZWZhdWx0cyhjb29yZFN0ciwgY29lcmNlKSB7XG4gICAgdmFyIGNvb3JkID0gY29lcmNlKGNvb3JkU3RyKTtcbiAgICB2YXIgY29vcmRUeXBlID0gY29vcmQgPyBjb2VyY2UoY29vcmRTdHIgKyAndHlwZScsICdhcnJheScpIDogJ3NjYWxlZCc7XG5cbiAgICBpZihjb29yZFR5cGUgPT09ICdzY2FsZWQnKSB7XG4gICAgICAgIGNvZXJjZShjb29yZFN0ciArICcwJyk7XG4gICAgICAgIGNvZXJjZSgnZCcgKyBjb29yZFN0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvb3JkO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkWih6KSB7XG4gICAgdmFyIGFsbFJvd3NBcmVBcnJheXMgPSB0cnVlO1xuICAgIHZhciBvbmVSb3dJc0ZpbGxlZCA9IGZhbHNlO1xuICAgIHZhciBoYXNPbmVOdW1iZXIgPSBmYWxzZTtcbiAgICB2YXIgemk7XG5cbiAgICAvKlxuICAgICAqIFdpdGhvdXQgdGhpcyBzdGVwOlxuICAgICAqXG4gICAgICogaGFzT25lTnVtYmVyID0gZmFsc2UgYnJlYWtzIGNvbnRvdXIgYnV0IG5vdCBoZWF0bWFwXG4gICAgICogYWxsUm93c0FyZUFycmF5cyA9IGZhbHNlIGJyZWFrcyBjb250b3VyIGJ1dCBub3QgaGVhdG1hcFxuICAgICAqIG9uZVJvd0lzRmlsbGVkID0gZmFsc2UgYnJlYWtzIGJvdGhcbiAgICAgKi9cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB6Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHppID0geltpXTtcbiAgICAgICAgaWYoIUxpYi5pc0FycmF5T3JUeXBlZEFycmF5KHppKSkge1xuICAgICAgICAgICAgYWxsUm93c0FyZUFycmF5cyA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYoemkubGVuZ3RoID4gMCkgb25lUm93SXNGaWxsZWQgPSB0cnVlO1xuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgemkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmKGlzTnVtZXJpYyh6aVtqXSkpIHtcbiAgICAgICAgICAgICAgICBoYXNPbmVOdW1iZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChhbGxSb3dzQXJlQXJyYXlzICYmIG9uZVJvd0lzRmlsbGVkICYmIGhhc09uZU51bWJlcik7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9