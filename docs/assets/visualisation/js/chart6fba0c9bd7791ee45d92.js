(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_heatmap_calc_js"],{

/***/ "./node_modules/plotly.js/src/traces/heatmap/calc.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/calc.js ***!
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



var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

var histogram2dCalc = __webpack_require__(/*! ../histogram2d/calc */ "./node_modules/plotly.js/src/traces/histogram2d/calc.js");
var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");
var convertColumnData = __webpack_require__(/*! ./convert_column_xyz */ "./node_modules/plotly.js/src/traces/heatmap/convert_column_xyz.js");
var clean2dArray = __webpack_require__(/*! ./clean_2d_array */ "./node_modules/plotly.js/src/traces/heatmap/clean_2d_array.js");
var interp2d = __webpack_require__(/*! ./interp2d */ "./node_modules/plotly.js/src/traces/heatmap/interp2d.js");
var findEmpties = __webpack_require__(/*! ./find_empties */ "./node_modules/plotly.js/src/traces/heatmap/find_empties.js");
var makeBoundArray = __webpack_require__(/*! ./make_bound_array */ "./node_modules/plotly.js/src/traces/heatmap/make_bound_array.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function calc(gd, trace) {
    // prepare the raw data
    // run makeCalcdata on x and y even for heatmaps, in case of category mappings
    var xa = Axes.getFromId(gd, trace.xaxis || 'x');
    var ya = Axes.getFromId(gd, trace.yaxis || 'y');
    var isContour = Registry.traceIs(trace, 'contour');
    var isHist = Registry.traceIs(trace, 'histogram');
    var isGL2D = Registry.traceIs(trace, 'gl2d');
    var zsmooth = isContour ? 'best' : trace.zsmooth;
    var x;
    var x0;
    var dx;
    var y;
    var y0;
    var dy;
    var z;
    var i;
    var binned;

    // cancel minimum tick spacings (only applies to bars and boxes)
    xa._minDtick = 0;
    ya._minDtick = 0;

    if(isHist) {
        binned = histogram2dCalc(gd, trace);
        x = binned.x;
        x0 = binned.x0;
        dx = binned.dx;
        y = binned.y;
        y0 = binned.y0;
        dy = binned.dy;
        z = binned.z;
    } else {
        var zIn = trace.z;
        if(Lib.isArray1D(zIn)) {
            convertColumnData(trace, xa, ya, 'x', 'y', ['z']);
            x = trace._x;
            y = trace._y;
            zIn = trace._z;
        } else {
            x = trace._x = trace.x ? xa.makeCalcdata(trace, 'x') : [];
            y = trace._y = trace.y ? ya.makeCalcdata(trace, 'y') : [];
        }

        x0 = trace.x0;
        dx = trace.dx;
        y0 = trace.y0;
        dy = trace.dy;

        z = clean2dArray(zIn, trace, xa, ya);
    }

    if(xa.rangebreaks || ya.rangebreaks) {
        z = dropZonBreaks(x, y, z);

        if(!isHist) {
            x = skipBreaks(x);
            y = skipBreaks(y);

            trace._x = x;
            trace._y = y;
        }
    }

    if(!isHist && (isContour || trace.connectgaps)) {
        trace._emptypoints = findEmpties(z);
        interp2d(z, trace._emptypoints);
    }

    function noZsmooth(msg) {
        zsmooth = trace._input.zsmooth = trace.zsmooth = false;
        Lib.warn('cannot use zsmooth: "fast": ' + msg);
    }

    // check whether we really can smooth (ie all boxes are about the same size)
    if(zsmooth === 'fast') {
        if(xa.type === 'log' || ya.type === 'log') {
            noZsmooth('log axis found');
        } else if(!isHist) {
            if(x.length) {
                var avgdx = (x[x.length - 1] - x[0]) / (x.length - 1);
                var maxErrX = Math.abs(avgdx / 100);
                for(i = 0; i < x.length - 1; i++) {
                    if(Math.abs(x[i + 1] - x[i] - avgdx) > maxErrX) {
                        noZsmooth('x scale is not linear');
                        break;
                    }
                }
            }
            if(y.length && zsmooth === 'fast') {
                var avgdy = (y[y.length - 1] - y[0]) / (y.length - 1);
                var maxErrY = Math.abs(avgdy / 100);
                for(i = 0; i < y.length - 1; i++) {
                    if(Math.abs(y[i + 1] - y[i] - avgdy) > maxErrY) {
                        noZsmooth('y scale is not linear');
                        break;
                    }
                }
            }
        }
    }

    // create arrays of brick boundaries, to be used by autorange and heatmap.plot
    var xlen = Lib.maxRowLength(z);
    var xIn = trace.xtype === 'scaled' ? '' : x;
    var xArray = makeBoundArray(trace, xIn, x0, dx, xlen, xa);
    var yIn = trace.ytype === 'scaled' ? '' : y;
    var yArray = makeBoundArray(trace, yIn, y0, dy, z.length, ya);

    // handled in gl2d convert step
    if(!isGL2D) {
        trace._extremes[xa._id] = Axes.findExtremes(xa, xArray);
        trace._extremes[ya._id] = Axes.findExtremes(ya, yArray);
    }

    var cd0 = {
        x: xArray,
        y: yArray,
        z: z,
        text: trace._text || trace.text,
        hovertext: trace._hovertext || trace.hovertext
    };

    if(xIn && xIn.length === xArray.length - 1) cd0.xCenter = xIn;
    if(yIn && yIn.length === yArray.length - 1) cd0.yCenter = yIn;

    if(isHist) {
        cd0.xRanges = binned.xRanges;
        cd0.yRanges = binned.yRanges;
        cd0.pts = binned.pts;
    }

    if(!isContour) {
        colorscaleCalc(gd, trace, {vals: z, cLetter: 'z'});
    }

    if(isContour && trace.contours && trace.contours.coloring === 'heatmap') {
        var dummyTrace = {
            type: trace.type === 'contour' ? 'heatmap' : 'histogram2d',
            xcalendar: trace.xcalendar,
            ycalendar: trace.ycalendar
        };
        cd0.xfill = makeBoundArray(dummyTrace, xIn, x0, dx, xlen, xa);
        cd0.yfill = makeBoundArray(dummyTrace, yIn, y0, dy, z.length, ya);
    }

    return [cd0];
};

function skipBreaks(a) {
    var b = [];
    var len = a.length;
    for(var i = 0; i < len; i++) {
        var v = a[i];
        if(v !== BADNUM) b.push(v);
    }
    return b;
}

function dropZonBreaks(x, y, z) {
    var newZ = [];
    var k = -1;
    for(var i = 0; i < z.length; i++) {
        if(y[i] === BADNUM) continue;
        k++;
        newZ[k] = [];
        for(var j = 0; j < z[i].length; j++) {
            if(x[j] === BADNUM) continue;

            newZ[k].push(z[i][j]);
        }
    }
    return newZ;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram2d/calc.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram2d/calc.js ***!
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
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

var binFunctions = __webpack_require__(/*! ../histogram/bin_functions */ "./node_modules/plotly.js/src/traces/histogram/bin_functions.js");
var normFunctions = __webpack_require__(/*! ../histogram/norm_functions */ "./node_modules/plotly.js/src/traces/histogram/norm_functions.js");
var doAvg = __webpack_require__(/*! ../histogram/average */ "./node_modules/plotly.js/src/traces/histogram/average.js");
var getBinSpanLabelRound = __webpack_require__(/*! ../histogram/bin_label_vals */ "./node_modules/plotly.js/src/traces/histogram/bin_label_vals.js");
var calcAllAutoBins = __webpack_require__(/*! ../histogram/calc */ "./node_modules/plotly.js/src/traces/histogram/calc.js").calcAllAutoBins;

module.exports = function calc(gd, trace) {
    var xa = Axes.getFromId(gd, trace.xaxis);
    var ya = Axes.getFromId(gd, trace.yaxis);

    var xcalendar = trace.xcalendar;
    var ycalendar = trace.ycalendar;
    var xr2c = function(v) { return xa.r2c(v, 0, xcalendar); };
    var yr2c = function(v) { return ya.r2c(v, 0, ycalendar); };
    var xc2r = function(v) { return xa.c2r(v, 0, xcalendar); };
    var yc2r = function(v) { return ya.c2r(v, 0, ycalendar); };

    var i, j, n, m;

    // calculate the bins
    var xBinsAndPos = calcAllAutoBins(gd, trace, xa, 'x');
    var xBinSpec = xBinsAndPos[0];
    var xPos0 = xBinsAndPos[1];
    var yBinsAndPos = calcAllAutoBins(gd, trace, ya, 'y');
    var yBinSpec = yBinsAndPos[0];
    var yPos0 = yBinsAndPos[1];

    var serieslen = trace._length;
    if(xPos0.length > serieslen) xPos0.splice(serieslen, xPos0.length - serieslen);
    if(yPos0.length > serieslen) yPos0.splice(serieslen, yPos0.length - serieslen);

    // make the empty bin array & scale the map
    var z = [];
    var onecol = [];
    var zerocol = [];
    var nonuniformBinsX = typeof xBinSpec.size === 'string';
    var nonuniformBinsY = typeof yBinSpec.size === 'string';
    var xEdges = [];
    var yEdges = [];
    var xbins = nonuniformBinsX ? xEdges : xBinSpec;
    var ybins = nonuniformBinsY ? yEdges : yBinSpec;
    var total = 0;
    var counts = [];
    var inputPoints = [];
    var norm = trace.histnorm;
    var func = trace.histfunc;
    var densitynorm = norm.indexOf('density') !== -1;
    var extremefunc = func === 'max' || func === 'min';
    var sizeinit = extremefunc ? null : 0;
    var binfunc = binFunctions.count;
    var normfunc = normFunctions[norm];
    var doavg = false;
    var xinc = [];
    var yinc = [];

    // set a binning function other than count?
    // for binning functions: check first for 'z',
    // then 'mc' in case we had a colored scatter plot
    // and want to transfer these colors to the 2D histo
    // TODO: axe this, make it the responsibility of the app changing type? or an impliedEdit?
    var rawCounterData = ('z' in trace) ?
        trace.z :
        (('marker' in trace && Array.isArray(trace.marker.color)) ?
            trace.marker.color : '');
    if(rawCounterData && func !== 'count') {
        doavg = func === 'avg';
        binfunc = binFunctions[func];
    }

    // decrease end a little in case of rounding errors
    var xBinSize = xBinSpec.size;
    var xBinStart = xr2c(xBinSpec.start);
    var xBinEnd = xr2c(xBinSpec.end) +
        (xBinStart - Axes.tickIncrement(xBinStart, xBinSize, false, xcalendar)) / 1e6;

    for(i = xBinStart; i < xBinEnd; i = Axes.tickIncrement(i, xBinSize, false, xcalendar)) {
        onecol.push(sizeinit);
        xEdges.push(i);
        if(doavg) zerocol.push(0);
    }
    xEdges.push(i);

    var nx = onecol.length;
    var dx = (i - xBinStart) / nx;
    var x0 = xc2r(xBinStart + dx / 2);

    var yBinSize = yBinSpec.size;
    var yBinStart = yr2c(yBinSpec.start);
    var yBinEnd = yr2c(yBinSpec.end) +
        (yBinStart - Axes.tickIncrement(yBinStart, yBinSize, false, ycalendar)) / 1e6;

    for(i = yBinStart; i < yBinEnd; i = Axes.tickIncrement(i, yBinSize, false, ycalendar)) {
        z.push(onecol.slice());
        yEdges.push(i);
        var ipCol = new Array(nx);
        for(j = 0; j < nx; j++) ipCol[j] = [];
        inputPoints.push(ipCol);
        if(doavg) counts.push(zerocol.slice());
    }
    yEdges.push(i);

    var ny = z.length;
    var dy = (i - yBinStart) / ny;
    var y0 = yc2r(yBinStart + dy / 2);

    if(densitynorm) {
        xinc = makeIncrements(onecol.length, xbins, dx, nonuniformBinsX);
        yinc = makeIncrements(z.length, ybins, dy, nonuniformBinsY);
    }

    // for date axes we need bin bounds to be calcdata. For nonuniform bins
    // we already have this, but uniform with start/end/size they're still strings.
    if(!nonuniformBinsX && xa.type === 'date') xbins = binsToCalc(xr2c, xbins);
    if(!nonuniformBinsY && ya.type === 'date') ybins = binsToCalc(yr2c, ybins);

    // put data into bins
    var uniqueValsPerX = true;
    var uniqueValsPerY = true;
    var xVals = new Array(nx);
    var yVals = new Array(ny);
    var xGapLow = Infinity;
    var xGapHigh = Infinity;
    var yGapLow = Infinity;
    var yGapHigh = Infinity;
    for(i = 0; i < serieslen; i++) {
        var xi = xPos0[i];
        var yi = yPos0[i];
        n = Lib.findBin(xi, xbins);
        m = Lib.findBin(yi, ybins);
        if(n >= 0 && n < nx && m >= 0 && m < ny) {
            total += binfunc(n, i, z[m], rawCounterData, counts[m]);
            inputPoints[m][n].push(i);

            if(uniqueValsPerX) {
                if(xVals[n] === undefined) xVals[n] = xi;
                else if(xVals[n] !== xi) uniqueValsPerX = false;
            }
            if(uniqueValsPerY) {
                if(yVals[m] === undefined) yVals[m] = yi;
                else if(yVals[m] !== yi) uniqueValsPerY = false;
            }

            xGapLow = Math.min(xGapLow, xi - xEdges[n]);
            xGapHigh = Math.min(xGapHigh, xEdges[n + 1] - xi);
            yGapLow = Math.min(yGapLow, yi - yEdges[m]);
            yGapHigh = Math.min(yGapHigh, yEdges[m + 1] - yi);
        }
    }
    // normalize, if needed
    if(doavg) {
        for(m = 0; m < ny; m++) total += doAvg(z[m], counts[m]);
    }
    if(normfunc) {
        for(m = 0; m < ny; m++) normfunc(z[m], total, xinc, yinc[m]);
    }

    return {
        x: xPos0,
        xRanges: getRanges(xEdges, uniqueValsPerX && xVals, xGapLow, xGapHigh, xa, xcalendar),
        x0: x0,
        dx: dx,
        y: yPos0,
        yRanges: getRanges(yEdges, uniqueValsPerY && yVals, yGapLow, yGapHigh, ya, ycalendar),
        y0: y0,
        dy: dy,
        z: z,
        pts: inputPoints
    };
};

function makeIncrements(len, bins, dv, nonuniform) {
    var out = new Array(len);
    var i;
    if(nonuniform) {
        for(i = 0; i < len; i++) out[i] = 1 / (bins[i + 1] - bins[i]);
    } else {
        var inc = 1 / dv;
        for(i = 0; i < len; i++) out[i] = inc;
    }
    return out;
}

function binsToCalc(r2c, bins) {
    return {
        start: r2c(bins.start),
        end: r2c(bins.end),
        size: bins.size
    };
}

function getRanges(edges, uniqueVals, gapLow, gapHigh, ax, calendar) {
    var i;
    var len = edges.length - 1;
    var out = new Array(len);
    var roundFn = getBinSpanLabelRound(gapLow, gapHigh, edges, ax, calendar);

    for(i = 0; i < len; i++) {
        var v = (uniqueVals || [])[i];
        out[i] = v === undefined ?
            [roundFn(edges[i]), roundFn(edges[i + 1], true)] :
            [v, v];
    }
    return out;
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hpc3RvZ3JhbTJkL2NhbGMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLGdFQUFnQjtBQUN2QyxVQUFVLG1CQUFPLENBQUMsNERBQVc7QUFDN0IsV0FBVyxtQkFBTyxDQUFDLHdGQUE0Qjs7QUFFL0Msc0JBQXNCLG1CQUFPLENBQUMsb0ZBQXFCO0FBQ25ELHFCQUFxQixtQkFBTyxDQUFDLG9HQUFrQztBQUMvRCx3QkFBd0IsbUJBQU8sQ0FBQywrRkFBc0I7QUFDdEQsbUJBQW1CLG1CQUFPLENBQUMsdUZBQWtCO0FBQzdDLGVBQWUsbUJBQU8sQ0FBQywyRUFBWTtBQUNuQyxrQkFBa0IsbUJBQU8sQ0FBQyxtRkFBZ0I7QUFDMUMscUJBQXFCLG1CQUFPLENBQUMsMkZBQW9CO0FBQ2pELGFBQWEsa0hBQTJDOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGtCQUFrQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsa0JBQWtCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLHNCQUFzQjtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixXQUFXLG1CQUFPLENBQUMsd0ZBQTRCOztBQUUvQyxtQkFBbUIsbUJBQU8sQ0FBQyxrR0FBNEI7QUFDdkQsb0JBQW9CLG1CQUFPLENBQUMsb0dBQTZCO0FBQ3pELFlBQVksbUJBQU8sQ0FBQyxzRkFBc0I7QUFDMUMsMkJBQTJCLG1CQUFPLENBQUMsb0dBQTZCO0FBQ2hFLHNCQUFzQixxSEFBNEM7O0FBRWxFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLGdDQUFnQztBQUM1RCw0QkFBNEIsZ0NBQWdDO0FBQzVELDRCQUE0QixnQ0FBZ0M7QUFDNUQsNEJBQTRCLGdDQUFnQzs7QUFFNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsYUFBYTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsYUFBYTtBQUNuQztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxlQUFlO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCLEtBQUs7QUFDTDtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDZmYmEwYzliZDc3OTFlZTQ1ZDkyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xuXG52YXIgaGlzdG9ncmFtMmRDYWxjID0gcmVxdWlyZSgnLi4vaGlzdG9ncmFtMmQvY2FsYycpO1xudmFyIGNvbG9yc2NhbGVDYWxjID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2NhbGMnKTtcbnZhciBjb252ZXJ0Q29sdW1uRGF0YSA9IHJlcXVpcmUoJy4vY29udmVydF9jb2x1bW5feHl6Jyk7XG52YXIgY2xlYW4yZEFycmF5ID0gcmVxdWlyZSgnLi9jbGVhbl8yZF9hcnJheScpO1xudmFyIGludGVycDJkID0gcmVxdWlyZSgnLi9pbnRlcnAyZCcpO1xudmFyIGZpbmRFbXB0aWVzID0gcmVxdWlyZSgnLi9maW5kX2VtcHRpZXMnKTtcbnZhciBtYWtlQm91bmRBcnJheSA9IHJlcXVpcmUoJy4vbWFrZV9ib3VuZF9hcnJheScpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICAvLyBwcmVwYXJlIHRoZSByYXcgZGF0YVxuICAgIC8vIHJ1biBtYWtlQ2FsY2RhdGEgb24geCBhbmQgeSBldmVuIGZvciBoZWF0bWFwcywgaW4gY2FzZSBvZiBjYXRlZ29yeSBtYXBwaW5nc1xuICAgIHZhciB4YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS54YXhpcyB8fCAneCcpO1xuICAgIHZhciB5YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS55YXhpcyB8fCAneScpO1xuICAgIHZhciBpc0NvbnRvdXIgPSBSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAnY29udG91cicpO1xuICAgIHZhciBpc0hpc3QgPSBSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAnaGlzdG9ncmFtJyk7XG4gICAgdmFyIGlzR0wyRCA9IFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsICdnbDJkJyk7XG4gICAgdmFyIHpzbW9vdGggPSBpc0NvbnRvdXIgPyAnYmVzdCcgOiB0cmFjZS56c21vb3RoO1xuICAgIHZhciB4O1xuICAgIHZhciB4MDtcbiAgICB2YXIgZHg7XG4gICAgdmFyIHk7XG4gICAgdmFyIHkwO1xuICAgIHZhciBkeTtcbiAgICB2YXIgejtcbiAgICB2YXIgaTtcbiAgICB2YXIgYmlubmVkO1xuXG4gICAgLy8gY2FuY2VsIG1pbmltdW0gdGljayBzcGFjaW5ncyAob25seSBhcHBsaWVzIHRvIGJhcnMgYW5kIGJveGVzKVxuICAgIHhhLl9taW5EdGljayA9IDA7XG4gICAgeWEuX21pbkR0aWNrID0gMDtcblxuICAgIGlmKGlzSGlzdCkge1xuICAgICAgICBiaW5uZWQgPSBoaXN0b2dyYW0yZENhbGMoZ2QsIHRyYWNlKTtcbiAgICAgICAgeCA9IGJpbm5lZC54O1xuICAgICAgICB4MCA9IGJpbm5lZC54MDtcbiAgICAgICAgZHggPSBiaW5uZWQuZHg7XG4gICAgICAgIHkgPSBiaW5uZWQueTtcbiAgICAgICAgeTAgPSBiaW5uZWQueTA7XG4gICAgICAgIGR5ID0gYmlubmVkLmR5O1xuICAgICAgICB6ID0gYmlubmVkLno7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHpJbiA9IHRyYWNlLno7XG4gICAgICAgIGlmKExpYi5pc0FycmF5MUQoekluKSkge1xuICAgICAgICAgICAgY29udmVydENvbHVtbkRhdGEodHJhY2UsIHhhLCB5YSwgJ3gnLCAneScsIFsneiddKTtcbiAgICAgICAgICAgIHggPSB0cmFjZS5feDtcbiAgICAgICAgICAgIHkgPSB0cmFjZS5feTtcbiAgICAgICAgICAgIHpJbiA9IHRyYWNlLl96O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IHRyYWNlLl94ID0gdHJhY2UueCA/IHhhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3gnKSA6IFtdO1xuICAgICAgICAgICAgeSA9IHRyYWNlLl95ID0gdHJhY2UueSA/IHlhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3knKSA6IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgeDAgPSB0cmFjZS54MDtcbiAgICAgICAgZHggPSB0cmFjZS5keDtcbiAgICAgICAgeTAgPSB0cmFjZS55MDtcbiAgICAgICAgZHkgPSB0cmFjZS5keTtcblxuICAgICAgICB6ID0gY2xlYW4yZEFycmF5KHpJbiwgdHJhY2UsIHhhLCB5YSk7XG4gICAgfVxuXG4gICAgaWYoeGEucmFuZ2VicmVha3MgfHwgeWEucmFuZ2VicmVha3MpIHtcbiAgICAgICAgeiA9IGRyb3Bab25CcmVha3MoeCwgeSwgeik7XG5cbiAgICAgICAgaWYoIWlzSGlzdCkge1xuICAgICAgICAgICAgeCA9IHNraXBCcmVha3MoeCk7XG4gICAgICAgICAgICB5ID0gc2tpcEJyZWFrcyh5KTtcblxuICAgICAgICAgICAgdHJhY2UuX3ggPSB4O1xuICAgICAgICAgICAgdHJhY2UuX3kgPSB5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIWlzSGlzdCAmJiAoaXNDb250b3VyIHx8IHRyYWNlLmNvbm5lY3RnYXBzKSkge1xuICAgICAgICB0cmFjZS5fZW1wdHlwb2ludHMgPSBmaW5kRW1wdGllcyh6KTtcbiAgICAgICAgaW50ZXJwMmQoeiwgdHJhY2UuX2VtcHR5cG9pbnRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub1pzbW9vdGgobXNnKSB7XG4gICAgICAgIHpzbW9vdGggPSB0cmFjZS5faW5wdXQuenNtb290aCA9IHRyYWNlLnpzbW9vdGggPSBmYWxzZTtcbiAgICAgICAgTGliLndhcm4oJ2Nhbm5vdCB1c2UgenNtb290aDogXCJmYXN0XCI6ICcgKyBtc2cpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgd2UgcmVhbGx5IGNhbiBzbW9vdGggKGllIGFsbCBib3hlcyBhcmUgYWJvdXQgdGhlIHNhbWUgc2l6ZSlcbiAgICBpZih6c21vb3RoID09PSAnZmFzdCcpIHtcbiAgICAgICAgaWYoeGEudHlwZSA9PT0gJ2xvZycgfHwgeWEudHlwZSA9PT0gJ2xvZycpIHtcbiAgICAgICAgICAgIG5vWnNtb290aCgnbG9nIGF4aXMgZm91bmQnKTtcbiAgICAgICAgfSBlbHNlIGlmKCFpc0hpc3QpIHtcbiAgICAgICAgICAgIGlmKHgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF2Z2R4ID0gKHhbeC5sZW5ndGggLSAxXSAtIHhbMF0pIC8gKHgubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgdmFyIG1heEVyclggPSBNYXRoLmFicyhhdmdkeCAvIDEwMCk7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgeC5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoTWF0aC5hYnMoeFtpICsgMV0gLSB4W2ldIC0gYXZnZHgpID4gbWF4RXJyWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9ac21vb3RoKCd4IHNjYWxlIGlzIG5vdCBsaW5lYXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeS5sZW5ndGggJiYgenNtb290aCA9PT0gJ2Zhc3QnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF2Z2R5ID0gKHlbeS5sZW5ndGggLSAxXSAtIHlbMF0pIC8gKHkubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgdmFyIG1heEVyclkgPSBNYXRoLmFicyhhdmdkeSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgeS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoTWF0aC5hYnMoeVtpICsgMV0gLSB5W2ldIC0gYXZnZHkpID4gbWF4RXJyWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9ac21vb3RoKCd5IHNjYWxlIGlzIG5vdCBsaW5lYXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGFycmF5cyBvZiBicmljayBib3VuZGFyaWVzLCB0byBiZSB1c2VkIGJ5IGF1dG9yYW5nZSBhbmQgaGVhdG1hcC5wbG90XG4gICAgdmFyIHhsZW4gPSBMaWIubWF4Um93TGVuZ3RoKHopO1xuICAgIHZhciB4SW4gPSB0cmFjZS54dHlwZSA9PT0gJ3NjYWxlZCcgPyAnJyA6IHg7XG4gICAgdmFyIHhBcnJheSA9IG1ha2VCb3VuZEFycmF5KHRyYWNlLCB4SW4sIHgwLCBkeCwgeGxlbiwgeGEpO1xuICAgIHZhciB5SW4gPSB0cmFjZS55dHlwZSA9PT0gJ3NjYWxlZCcgPyAnJyA6IHk7XG4gICAgdmFyIHlBcnJheSA9IG1ha2VCb3VuZEFycmF5KHRyYWNlLCB5SW4sIHkwLCBkeSwgei5sZW5ndGgsIHlhKTtcblxuICAgIC8vIGhhbmRsZWQgaW4gZ2wyZCBjb252ZXJ0IHN0ZXBcbiAgICBpZighaXNHTDJEKSB7XG4gICAgICAgIHRyYWNlLl9leHRyZW1lc1t4YS5faWRdID0gQXhlcy5maW5kRXh0cmVtZXMoeGEsIHhBcnJheSk7XG4gICAgICAgIHRyYWNlLl9leHRyZW1lc1t5YS5faWRdID0gQXhlcy5maW5kRXh0cmVtZXMoeWEsIHlBcnJheSk7XG4gICAgfVxuXG4gICAgdmFyIGNkMCA9IHtcbiAgICAgICAgeDogeEFycmF5LFxuICAgICAgICB5OiB5QXJyYXksXG4gICAgICAgIHo6IHosXG4gICAgICAgIHRleHQ6IHRyYWNlLl90ZXh0IHx8IHRyYWNlLnRleHQsXG4gICAgICAgIGhvdmVydGV4dDogdHJhY2UuX2hvdmVydGV4dCB8fCB0cmFjZS5ob3ZlcnRleHRcbiAgICB9O1xuXG4gICAgaWYoeEluICYmIHhJbi5sZW5ndGggPT09IHhBcnJheS5sZW5ndGggLSAxKSBjZDAueENlbnRlciA9IHhJbjtcbiAgICBpZih5SW4gJiYgeUluLmxlbmd0aCA9PT0geUFycmF5Lmxlbmd0aCAtIDEpIGNkMC55Q2VudGVyID0geUluO1xuXG4gICAgaWYoaXNIaXN0KSB7XG4gICAgICAgIGNkMC54UmFuZ2VzID0gYmlubmVkLnhSYW5nZXM7XG4gICAgICAgIGNkMC55UmFuZ2VzID0gYmlubmVkLnlSYW5nZXM7XG4gICAgICAgIGNkMC5wdHMgPSBiaW5uZWQucHRzO1xuICAgIH1cblxuICAgIGlmKCFpc0NvbnRvdXIpIHtcbiAgICAgICAgY29sb3JzY2FsZUNhbGMoZ2QsIHRyYWNlLCB7dmFsczogeiwgY0xldHRlcjogJ3onfSk7XG4gICAgfVxuXG4gICAgaWYoaXNDb250b3VyICYmIHRyYWNlLmNvbnRvdXJzICYmIHRyYWNlLmNvbnRvdXJzLmNvbG9yaW5nID09PSAnaGVhdG1hcCcpIHtcbiAgICAgICAgdmFyIGR1bW15VHJhY2UgPSB7XG4gICAgICAgICAgICB0eXBlOiB0cmFjZS50eXBlID09PSAnY29udG91cicgPyAnaGVhdG1hcCcgOiAnaGlzdG9ncmFtMmQnLFxuICAgICAgICAgICAgeGNhbGVuZGFyOiB0cmFjZS54Y2FsZW5kYXIsXG4gICAgICAgICAgICB5Y2FsZW5kYXI6IHRyYWNlLnljYWxlbmRhclxuICAgICAgICB9O1xuICAgICAgICBjZDAueGZpbGwgPSBtYWtlQm91bmRBcnJheShkdW1teVRyYWNlLCB4SW4sIHgwLCBkeCwgeGxlbiwgeGEpO1xuICAgICAgICBjZDAueWZpbGwgPSBtYWtlQm91bmRBcnJheShkdW1teVRyYWNlLCB5SW4sIHkwLCBkeSwgei5sZW5ndGgsIHlhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2NkMF07XG59O1xuXG5mdW5jdGlvbiBza2lwQnJlYWtzKGEpIHtcbiAgICB2YXIgYiA9IFtdO1xuICAgIHZhciBsZW4gPSBhLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHYgPSBhW2ldO1xuICAgICAgICBpZih2ICE9PSBCQUROVU0pIGIucHVzaCh2KTtcbiAgICB9XG4gICAgcmV0dXJuIGI7XG59XG5cbmZ1bmN0aW9uIGRyb3Bab25CcmVha3MoeCwgeSwgeikge1xuICAgIHZhciBuZXdaID0gW107XG4gICAgdmFyIGsgPSAtMTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgei5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZih5W2ldID09PSBCQUROVU0pIGNvbnRpbnVlO1xuICAgICAgICBrKys7XG4gICAgICAgIG5ld1pba10gPSBbXTtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHpbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmKHhbal0gPT09IEJBRE5VTSkgY29udGludWU7XG5cbiAgICAgICAgICAgIG5ld1pba10ucHVzaCh6W2ldW2pdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3Wjtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xuXG52YXIgYmluRnVuY3Rpb25zID0gcmVxdWlyZSgnLi4vaGlzdG9ncmFtL2Jpbl9mdW5jdGlvbnMnKTtcbnZhciBub3JtRnVuY3Rpb25zID0gcmVxdWlyZSgnLi4vaGlzdG9ncmFtL25vcm1fZnVuY3Rpb25zJyk7XG52YXIgZG9BdmcgPSByZXF1aXJlKCcuLi9oaXN0b2dyYW0vYXZlcmFnZScpO1xudmFyIGdldEJpblNwYW5MYWJlbFJvdW5kID0gcmVxdWlyZSgnLi4vaGlzdG9ncmFtL2Jpbl9sYWJlbF92YWxzJyk7XG52YXIgY2FsY0FsbEF1dG9CaW5zID0gcmVxdWlyZSgnLi4vaGlzdG9ncmFtL2NhbGMnKS5jYWxjQWxsQXV0b0JpbnM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgeGEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueGF4aXMpO1xuICAgIHZhciB5YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS55YXhpcyk7XG5cbiAgICB2YXIgeGNhbGVuZGFyID0gdHJhY2UueGNhbGVuZGFyO1xuICAgIHZhciB5Y2FsZW5kYXIgPSB0cmFjZS55Y2FsZW5kYXI7XG4gICAgdmFyIHhyMmMgPSBmdW5jdGlvbih2KSB7IHJldHVybiB4YS5yMmModiwgMCwgeGNhbGVuZGFyKTsgfTtcbiAgICB2YXIgeXIyYyA9IGZ1bmN0aW9uKHYpIHsgcmV0dXJuIHlhLnIyYyh2LCAwLCB5Y2FsZW5kYXIpOyB9O1xuICAgIHZhciB4YzJyID0gZnVuY3Rpb24odikgeyByZXR1cm4geGEuYzJyKHYsIDAsIHhjYWxlbmRhcik7IH07XG4gICAgdmFyIHljMnIgPSBmdW5jdGlvbih2KSB7IHJldHVybiB5YS5jMnIodiwgMCwgeWNhbGVuZGFyKTsgfTtcblxuICAgIHZhciBpLCBqLCBuLCBtO1xuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBiaW5zXG4gICAgdmFyIHhCaW5zQW5kUG9zID0gY2FsY0FsbEF1dG9CaW5zKGdkLCB0cmFjZSwgeGEsICd4Jyk7XG4gICAgdmFyIHhCaW5TcGVjID0geEJpbnNBbmRQb3NbMF07XG4gICAgdmFyIHhQb3MwID0geEJpbnNBbmRQb3NbMV07XG4gICAgdmFyIHlCaW5zQW5kUG9zID0gY2FsY0FsbEF1dG9CaW5zKGdkLCB0cmFjZSwgeWEsICd5Jyk7XG4gICAgdmFyIHlCaW5TcGVjID0geUJpbnNBbmRQb3NbMF07XG4gICAgdmFyIHlQb3MwID0geUJpbnNBbmRQb3NbMV07XG5cbiAgICB2YXIgc2VyaWVzbGVuID0gdHJhY2UuX2xlbmd0aDtcbiAgICBpZih4UG9zMC5sZW5ndGggPiBzZXJpZXNsZW4pIHhQb3MwLnNwbGljZShzZXJpZXNsZW4sIHhQb3MwLmxlbmd0aCAtIHNlcmllc2xlbik7XG4gICAgaWYoeVBvczAubGVuZ3RoID4gc2VyaWVzbGVuKSB5UG9zMC5zcGxpY2Uoc2VyaWVzbGVuLCB5UG9zMC5sZW5ndGggLSBzZXJpZXNsZW4pO1xuXG4gICAgLy8gbWFrZSB0aGUgZW1wdHkgYmluIGFycmF5ICYgc2NhbGUgdGhlIG1hcFxuICAgIHZhciB6ID0gW107XG4gICAgdmFyIG9uZWNvbCA9IFtdO1xuICAgIHZhciB6ZXJvY29sID0gW107XG4gICAgdmFyIG5vbnVuaWZvcm1CaW5zWCA9IHR5cGVvZiB4QmluU3BlYy5zaXplID09PSAnc3RyaW5nJztcbiAgICB2YXIgbm9udW5pZm9ybUJpbnNZID0gdHlwZW9mIHlCaW5TcGVjLnNpemUgPT09ICdzdHJpbmcnO1xuICAgIHZhciB4RWRnZXMgPSBbXTtcbiAgICB2YXIgeUVkZ2VzID0gW107XG4gICAgdmFyIHhiaW5zID0gbm9udW5pZm9ybUJpbnNYID8geEVkZ2VzIDogeEJpblNwZWM7XG4gICAgdmFyIHliaW5zID0gbm9udW5pZm9ybUJpbnNZID8geUVkZ2VzIDogeUJpblNwZWM7XG4gICAgdmFyIHRvdGFsID0gMDtcbiAgICB2YXIgY291bnRzID0gW107XG4gICAgdmFyIGlucHV0UG9pbnRzID0gW107XG4gICAgdmFyIG5vcm0gPSB0cmFjZS5oaXN0bm9ybTtcbiAgICB2YXIgZnVuYyA9IHRyYWNlLmhpc3RmdW5jO1xuICAgIHZhciBkZW5zaXR5bm9ybSA9IG5vcm0uaW5kZXhPZignZGVuc2l0eScpICE9PSAtMTtcbiAgICB2YXIgZXh0cmVtZWZ1bmMgPSBmdW5jID09PSAnbWF4JyB8fCBmdW5jID09PSAnbWluJztcbiAgICB2YXIgc2l6ZWluaXQgPSBleHRyZW1lZnVuYyA/IG51bGwgOiAwO1xuICAgIHZhciBiaW5mdW5jID0gYmluRnVuY3Rpb25zLmNvdW50O1xuICAgIHZhciBub3JtZnVuYyA9IG5vcm1GdW5jdGlvbnNbbm9ybV07XG4gICAgdmFyIGRvYXZnID0gZmFsc2U7XG4gICAgdmFyIHhpbmMgPSBbXTtcbiAgICB2YXIgeWluYyA9IFtdO1xuXG4gICAgLy8gc2V0IGEgYmlubmluZyBmdW5jdGlvbiBvdGhlciB0aGFuIGNvdW50P1xuICAgIC8vIGZvciBiaW5uaW5nIGZ1bmN0aW9uczogY2hlY2sgZmlyc3QgZm9yICd6JyxcbiAgICAvLyB0aGVuICdtYycgaW4gY2FzZSB3ZSBoYWQgYSBjb2xvcmVkIHNjYXR0ZXIgcGxvdFxuICAgIC8vIGFuZCB3YW50IHRvIHRyYW5zZmVyIHRoZXNlIGNvbG9ycyB0byB0aGUgMkQgaGlzdG9cbiAgICAvLyBUT0RPOiBheGUgdGhpcywgbWFrZSBpdCB0aGUgcmVzcG9uc2liaWxpdHkgb2YgdGhlIGFwcCBjaGFuZ2luZyB0eXBlPyBvciBhbiBpbXBsaWVkRWRpdD9cbiAgICB2YXIgcmF3Q291bnRlckRhdGEgPSAoJ3onIGluIHRyYWNlKSA/XG4gICAgICAgIHRyYWNlLnogOlxuICAgICAgICAoKCdtYXJrZXInIGluIHRyYWNlICYmIEFycmF5LmlzQXJyYXkodHJhY2UubWFya2VyLmNvbG9yKSkgP1xuICAgICAgICAgICAgdHJhY2UubWFya2VyLmNvbG9yIDogJycpO1xuICAgIGlmKHJhd0NvdW50ZXJEYXRhICYmIGZ1bmMgIT09ICdjb3VudCcpIHtcbiAgICAgICAgZG9hdmcgPSBmdW5jID09PSAnYXZnJztcbiAgICAgICAgYmluZnVuYyA9IGJpbkZ1bmN0aW9uc1tmdW5jXTtcbiAgICB9XG5cbiAgICAvLyBkZWNyZWFzZSBlbmQgYSBsaXR0bGUgaW4gY2FzZSBvZiByb3VuZGluZyBlcnJvcnNcbiAgICB2YXIgeEJpblNpemUgPSB4QmluU3BlYy5zaXplO1xuICAgIHZhciB4QmluU3RhcnQgPSB4cjJjKHhCaW5TcGVjLnN0YXJ0KTtcbiAgICB2YXIgeEJpbkVuZCA9IHhyMmMoeEJpblNwZWMuZW5kKSArXG4gICAgICAgICh4QmluU3RhcnQgLSBBeGVzLnRpY2tJbmNyZW1lbnQoeEJpblN0YXJ0LCB4QmluU2l6ZSwgZmFsc2UsIHhjYWxlbmRhcikpIC8gMWU2O1xuXG4gICAgZm9yKGkgPSB4QmluU3RhcnQ7IGkgPCB4QmluRW5kOyBpID0gQXhlcy50aWNrSW5jcmVtZW50KGksIHhCaW5TaXplLCBmYWxzZSwgeGNhbGVuZGFyKSkge1xuICAgICAgICBvbmVjb2wucHVzaChzaXplaW5pdCk7XG4gICAgICAgIHhFZGdlcy5wdXNoKGkpO1xuICAgICAgICBpZihkb2F2ZykgemVyb2NvbC5wdXNoKDApO1xuICAgIH1cbiAgICB4RWRnZXMucHVzaChpKTtcblxuICAgIHZhciBueCA9IG9uZWNvbC5sZW5ndGg7XG4gICAgdmFyIGR4ID0gKGkgLSB4QmluU3RhcnQpIC8gbng7XG4gICAgdmFyIHgwID0geGMycih4QmluU3RhcnQgKyBkeCAvIDIpO1xuXG4gICAgdmFyIHlCaW5TaXplID0geUJpblNwZWMuc2l6ZTtcbiAgICB2YXIgeUJpblN0YXJ0ID0geXIyYyh5QmluU3BlYy5zdGFydCk7XG4gICAgdmFyIHlCaW5FbmQgPSB5cjJjKHlCaW5TcGVjLmVuZCkgK1xuICAgICAgICAoeUJpblN0YXJ0IC0gQXhlcy50aWNrSW5jcmVtZW50KHlCaW5TdGFydCwgeUJpblNpemUsIGZhbHNlLCB5Y2FsZW5kYXIpKSAvIDFlNjtcblxuICAgIGZvcihpID0geUJpblN0YXJ0OyBpIDwgeUJpbkVuZDsgaSA9IEF4ZXMudGlja0luY3JlbWVudChpLCB5QmluU2l6ZSwgZmFsc2UsIHljYWxlbmRhcikpIHtcbiAgICAgICAgei5wdXNoKG9uZWNvbC5zbGljZSgpKTtcbiAgICAgICAgeUVkZ2VzLnB1c2goaSk7XG4gICAgICAgIHZhciBpcENvbCA9IG5ldyBBcnJheShueCk7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IG54OyBqKyspIGlwQ29sW2pdID0gW107XG4gICAgICAgIGlucHV0UG9pbnRzLnB1c2goaXBDb2wpO1xuICAgICAgICBpZihkb2F2ZykgY291bnRzLnB1c2goemVyb2NvbC5zbGljZSgpKTtcbiAgICB9XG4gICAgeUVkZ2VzLnB1c2goaSk7XG5cbiAgICB2YXIgbnkgPSB6Lmxlbmd0aDtcbiAgICB2YXIgZHkgPSAoaSAtIHlCaW5TdGFydCkgLyBueTtcbiAgICB2YXIgeTAgPSB5YzJyKHlCaW5TdGFydCArIGR5IC8gMik7XG5cbiAgICBpZihkZW5zaXR5bm9ybSkge1xuICAgICAgICB4aW5jID0gbWFrZUluY3JlbWVudHMob25lY29sLmxlbmd0aCwgeGJpbnMsIGR4LCBub251bmlmb3JtQmluc1gpO1xuICAgICAgICB5aW5jID0gbWFrZUluY3JlbWVudHMoei5sZW5ndGgsIHliaW5zLCBkeSwgbm9udW5pZm9ybUJpbnNZKTtcbiAgICB9XG5cbiAgICAvLyBmb3IgZGF0ZSBheGVzIHdlIG5lZWQgYmluIGJvdW5kcyB0byBiZSBjYWxjZGF0YS4gRm9yIG5vbnVuaWZvcm0gYmluc1xuICAgIC8vIHdlIGFscmVhZHkgaGF2ZSB0aGlzLCBidXQgdW5pZm9ybSB3aXRoIHN0YXJ0L2VuZC9zaXplIHRoZXkncmUgc3RpbGwgc3RyaW5ncy5cbiAgICBpZighbm9udW5pZm9ybUJpbnNYICYmIHhhLnR5cGUgPT09ICdkYXRlJykgeGJpbnMgPSBiaW5zVG9DYWxjKHhyMmMsIHhiaW5zKTtcbiAgICBpZighbm9udW5pZm9ybUJpbnNZICYmIHlhLnR5cGUgPT09ICdkYXRlJykgeWJpbnMgPSBiaW5zVG9DYWxjKHlyMmMsIHliaW5zKTtcblxuICAgIC8vIHB1dCBkYXRhIGludG8gYmluc1xuICAgIHZhciB1bmlxdWVWYWxzUGVyWCA9IHRydWU7XG4gICAgdmFyIHVuaXF1ZVZhbHNQZXJZID0gdHJ1ZTtcbiAgICB2YXIgeFZhbHMgPSBuZXcgQXJyYXkobngpO1xuICAgIHZhciB5VmFscyA9IG5ldyBBcnJheShueSk7XG4gICAgdmFyIHhHYXBMb3cgPSBJbmZpbml0eTtcbiAgICB2YXIgeEdhcEhpZ2ggPSBJbmZpbml0eTtcbiAgICB2YXIgeUdhcExvdyA9IEluZmluaXR5O1xuICAgIHZhciB5R2FwSGlnaCA9IEluZmluaXR5O1xuICAgIGZvcihpID0gMDsgaSA8IHNlcmllc2xlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4aSA9IHhQb3MwW2ldO1xuICAgICAgICB2YXIgeWkgPSB5UG9zMFtpXTtcbiAgICAgICAgbiA9IExpYi5maW5kQmluKHhpLCB4Ymlucyk7XG4gICAgICAgIG0gPSBMaWIuZmluZEJpbih5aSwgeWJpbnMpO1xuICAgICAgICBpZihuID49IDAgJiYgbiA8IG54ICYmIG0gPj0gMCAmJiBtIDwgbnkpIHtcbiAgICAgICAgICAgIHRvdGFsICs9IGJpbmZ1bmMobiwgaSwgelttXSwgcmF3Q291bnRlckRhdGEsIGNvdW50c1ttXSk7XG4gICAgICAgICAgICBpbnB1dFBvaW50c1ttXVtuXS5wdXNoKGkpO1xuXG4gICAgICAgICAgICBpZih1bmlxdWVWYWxzUGVyWCkge1xuICAgICAgICAgICAgICAgIGlmKHhWYWxzW25dID09PSB1bmRlZmluZWQpIHhWYWxzW25dID0geGk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih4VmFsc1tuXSAhPT0geGkpIHVuaXF1ZVZhbHNQZXJYID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih1bmlxdWVWYWxzUGVyWSkge1xuICAgICAgICAgICAgICAgIGlmKHlWYWxzW21dID09PSB1bmRlZmluZWQpIHlWYWxzW21dID0geWk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih5VmFsc1ttXSAhPT0geWkpIHVuaXF1ZVZhbHNQZXJZID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHhHYXBMb3cgPSBNYXRoLm1pbih4R2FwTG93LCB4aSAtIHhFZGdlc1tuXSk7XG4gICAgICAgICAgICB4R2FwSGlnaCA9IE1hdGgubWluKHhHYXBIaWdoLCB4RWRnZXNbbiArIDFdIC0geGkpO1xuICAgICAgICAgICAgeUdhcExvdyA9IE1hdGgubWluKHlHYXBMb3csIHlpIC0geUVkZ2VzW21dKTtcbiAgICAgICAgICAgIHlHYXBIaWdoID0gTWF0aC5taW4oeUdhcEhpZ2gsIHlFZGdlc1ttICsgMV0gLSB5aSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gbm9ybWFsaXplLCBpZiBuZWVkZWRcbiAgICBpZihkb2F2Zykge1xuICAgICAgICBmb3IobSA9IDA7IG0gPCBueTsgbSsrKSB0b3RhbCArPSBkb0F2Zyh6W21dLCBjb3VudHNbbV0pO1xuICAgIH1cbiAgICBpZihub3JtZnVuYykge1xuICAgICAgICBmb3IobSA9IDA7IG0gPCBueTsgbSsrKSBub3JtZnVuYyh6W21dLCB0b3RhbCwgeGluYywgeWluY1ttXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeFBvczAsXG4gICAgICAgIHhSYW5nZXM6IGdldFJhbmdlcyh4RWRnZXMsIHVuaXF1ZVZhbHNQZXJYICYmIHhWYWxzLCB4R2FwTG93LCB4R2FwSGlnaCwgeGEsIHhjYWxlbmRhciksXG4gICAgICAgIHgwOiB4MCxcbiAgICAgICAgZHg6IGR4LFxuICAgICAgICB5OiB5UG9zMCxcbiAgICAgICAgeVJhbmdlczogZ2V0UmFuZ2VzKHlFZGdlcywgdW5pcXVlVmFsc1BlclkgJiYgeVZhbHMsIHlHYXBMb3csIHlHYXBIaWdoLCB5YSwgeWNhbGVuZGFyKSxcbiAgICAgICAgeTA6IHkwLFxuICAgICAgICBkeTogZHksXG4gICAgICAgIHo6IHosXG4gICAgICAgIHB0czogaW5wdXRQb2ludHNcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gbWFrZUluY3JlbWVudHMobGVuLCBiaW5zLCBkdiwgbm9udW5pZm9ybSkge1xuICAgIHZhciBvdXQgPSBuZXcgQXJyYXkobGVuKTtcbiAgICB2YXIgaTtcbiAgICBpZihub251bmlmb3JtKSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSBvdXRbaV0gPSAxIC8gKGJpbnNbaSArIDFdIC0gYmluc1tpXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGluYyA9IDEgLyBkdjtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIG91dFtpXSA9IGluYztcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gYmluc1RvQ2FsYyhyMmMsIGJpbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogcjJjKGJpbnMuc3RhcnQpLFxuICAgICAgICBlbmQ6IHIyYyhiaW5zLmVuZCksXG4gICAgICAgIHNpemU6IGJpbnMuc2l6ZVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldFJhbmdlcyhlZGdlcywgdW5pcXVlVmFscywgZ2FwTG93LCBnYXBIaWdoLCBheCwgY2FsZW5kYXIpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuID0gZWRnZXMubGVuZ3RoIC0gMTtcbiAgICB2YXIgb3V0ID0gbmV3IEFycmF5KGxlbik7XG4gICAgdmFyIHJvdW5kRm4gPSBnZXRCaW5TcGFuTGFiZWxSb3VuZChnYXBMb3csIGdhcEhpZ2gsIGVkZ2VzLCBheCwgY2FsZW5kYXIpO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHYgPSAodW5pcXVlVmFscyB8fCBbXSlbaV07XG4gICAgICAgIG91dFtpXSA9IHYgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICBbcm91bmRGbihlZGdlc1tpXSksIHJvdW5kRm4oZWRnZXNbaSArIDFdLCB0cnVlKV0gOlxuICAgICAgICAgICAgW3YsIHZdO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==