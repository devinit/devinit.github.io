(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_box_calc_js-node_modules_plotly_js_src_traces_box_d-024de4"],{

/***/ "./node_modules/plotly.js/src/traces/box/calc.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/calc.js ***!
  \*******************************************************/
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

var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;
var _ = Lib._;

module.exports = function calc(gd, trace) {
    var fullLayout = gd._fullLayout;
    var xa = Axes.getFromId(gd, trace.xaxis || 'x');
    var ya = Axes.getFromId(gd, trace.yaxis || 'y');
    var cd = [];

    // N.B. violin reuses same Box.calc
    var numKey = trace.type === 'violin' ? '_numViolins' : '_numBoxes';

    var i, j;
    var valAxis, valLetter;
    var posAxis, posLetter;

    if(trace.orientation === 'h') {
        valAxis = xa;
        valLetter = 'x';
        posAxis = ya;
        posLetter = 'y';
    } else {
        valAxis = ya;
        valLetter = 'y';
        posAxis = xa;
        posLetter = 'x';
    }

    var posArray = getPos(trace, posLetter, posAxis, fullLayout[numKey]);
    var dv = Lib.distinctVals(posArray);
    var posDistinct = dv.vals;
    var dPos = dv.minDiff / 2;

    // item in trace calcdata
    var cdi;
    // array of {v: v, i, i} sample pts
    var pts;
    // values of the `pts` array of objects
    var boxVals;
    // length of sample
    var N;
    // single sample point
    var pt;
    // single sample value
    var v;

    // filter function for outlier pts
    // outlier definition based on http://www.physics.csbsju.edu/stats/box2.html
    var ptFilterFn = (trace.boxpoints || trace.points) === 'all' ?
        Lib.identity :
        function(pt) { return (pt.v < cdi.lf || pt.v > cdi.uf); };

    if(trace._hasPreCompStats) {
        var valArrayRaw = trace[valLetter];
        var d2c = function(k) { return valAxis.d2c((trace[k] || [])[i]); };
        var minVal = Infinity;
        var maxVal = -Infinity;

        for(i = 0; i < trace._length; i++) {
            var posi = posArray[i];
            if(!isNumeric(posi)) continue;

            cdi = {};
            cdi.pos = cdi[posLetter] = posi;

            cdi.q1 = d2c('q1');
            cdi.med = d2c('median');
            cdi.q3 = d2c('q3');

            pts = [];
            if(valArrayRaw && Lib.isArrayOrTypedArray(valArrayRaw[i])) {
                for(j = 0; j < valArrayRaw[i].length; j++) {
                    v = valAxis.d2c(valArrayRaw[i][j]);
                    if(v !== BADNUM) {
                        pt = {v: v, i: [i, j]};
                        arraysToCalcdata(pt, trace, [i, j]);
                        pts.push(pt);
                    }
                }
            }
            cdi.pts = pts.sort(sortByVal);
            boxVals = cdi[valLetter] = pts.map(extractVal);
            N = boxVals.length;

            if(cdi.med !== BADNUM && cdi.q1 !== BADNUM && cdi.q3 !== BADNUM &&
                cdi.med >= cdi.q1 && cdi.q3 >= cdi.med
            ) {
                var lf = d2c('lowerfence');
                cdi.lf = (lf !== BADNUM && lf <= cdi.q1) ?
                    lf :
                    computeLowerFence(cdi, boxVals, N);

                var uf = d2c('upperfence');
                cdi.uf = (uf !== BADNUM && uf >= cdi.q3) ?
                    uf :
                    computeUpperFence(cdi, boxVals, N);

                var mean = d2c('mean');
                cdi.mean = (mean !== BADNUM) ?
                    mean :
                    (N ? Lib.mean(boxVals, N) : (cdi.q1 + cdi.q3) / 2);

                var sd = d2c('sd');
                cdi.sd = (mean !== BADNUM && sd >= 0) ?
                    sd :
                    (N ? Lib.stdev(boxVals, N, cdi.mean) : (cdi.q3 - cdi.q1));

                cdi.lo = computeLowerOutlierBound(cdi);
                cdi.uo = computeUpperOutlierBound(cdi);

                var ns = d2c('notchspan');
                ns = (ns !== BADNUM && ns > 0) ? ns : computeNotchSpan(cdi, N);
                cdi.ln = cdi.med - ns;
                cdi.un = cdi.med + ns;

                var imin = cdi.lf;
                var imax = cdi.uf;
                if(trace.boxpoints && boxVals.length) {
                    imin = Math.min(imin, boxVals[0]);
                    imax = Math.max(imax, boxVals[N - 1]);
                }
                if(trace.notched) {
                    imin = Math.min(imin, cdi.ln);
                    imax = Math.max(imax, cdi.un);
                }
                cdi.min = imin;
                cdi.max = imax;
            } else {
                Lib.warn([
                    'Invalid input - make sure that q1 <= median <= q3',
                    'q1 = ' + cdi.q1,
                    'median = ' + cdi.med,
                    'q3 = ' + cdi.q3
                ].join('\n'));

                var v0;
                if(cdi.med !== BADNUM) {
                    v0 = cdi.med;
                } else if(cdi.q1 !== BADNUM) {
                    if(cdi.q3 !== BADNUM) v0 = (cdi.q1 + cdi.q3) / 2;
                    else v0 = cdi.q1;
                } else if(cdi.q3 !== BADNUM) {
                    v0 = cdi.q3;
                } else {
                    v0 = 0;
                }

                // draw box as line segment
                cdi.med = v0;
                cdi.q1 = cdi.q3 = v0;
                cdi.lf = cdi.uf = v0;
                cdi.mean = cdi.sd = v0;
                cdi.ln = cdi.un = v0;
                cdi.min = cdi.max = v0;
            }

            minVal = Math.min(minVal, cdi.min);
            maxVal = Math.max(maxVal, cdi.max);

            cdi.pts2 = pts.filter(ptFilterFn);

            cd.push(cdi);
        }

        trace._extremes[valAxis._id] = Axes.findExtremes(valAxis,
            [minVal, maxVal],
            {padded: true}
        );
    } else {
        var valArray = valAxis.makeCalcdata(trace, valLetter);
        var posBins = makeBins(posDistinct, dPos);
        var pLen = posDistinct.length;
        var ptsPerBin = initNestedArray(pLen);

        // bin pts info per position bins
        for(i = 0; i < trace._length; i++) {
            v = valArray[i];
            if(!isNumeric(v)) continue;

            var n = Lib.findBin(posArray[i], posBins);
            if(n >= 0 && n < pLen) {
                pt = {v: v, i: i};
                arraysToCalcdata(pt, trace, i);
                ptsPerBin[n].push(pt);
            }
        }

        var minLowerNotch = Infinity;
        var maxUpperNotch = -Infinity;

        var quartilemethod = trace.quartilemethod;
        var usesExclusive = quartilemethod === 'exclusive';
        var usesInclusive = quartilemethod === 'inclusive';

        // build calcdata trace items, one item per distinct position
        for(i = 0; i < pLen; i++) {
            if(ptsPerBin[i].length > 0) {
                cdi = {};
                cdi.pos = cdi[posLetter] = posDistinct[i];

                pts = cdi.pts = ptsPerBin[i].sort(sortByVal);
                boxVals = cdi[valLetter] = pts.map(extractVal);
                N = boxVals.length;

                cdi.min = boxVals[0];
                cdi.max = boxVals[N - 1];
                cdi.mean = Lib.mean(boxVals, N);
                cdi.sd = Lib.stdev(boxVals, N, cdi.mean);
                cdi.med = Lib.interp(boxVals, 0.5);

                if((N % 2) && (usesExclusive || usesInclusive)) {
                    var lower;
                    var upper;

                    if(usesExclusive) {
                        // do NOT include the median in either half
                        lower = boxVals.slice(0, N / 2);
                        upper = boxVals.slice(N / 2 + 1);
                    } else if(usesInclusive) {
                        // include the median in either half
                        lower = boxVals.slice(0, N / 2 + 1);
                        upper = boxVals.slice(N / 2);
                    }

                    cdi.q1 = Lib.interp(lower, 0.5);
                    cdi.q3 = Lib.interp(upper, 0.5);
                } else {
                    cdi.q1 = Lib.interp(boxVals, 0.25);
                    cdi.q3 = Lib.interp(boxVals, 0.75);
                }

                // lower and upper fences
                cdi.lf = computeLowerFence(cdi, boxVals, N);
                cdi.uf = computeUpperFence(cdi, boxVals, N);

                // lower and upper outliers bounds
                cdi.lo = computeLowerOutlierBound(cdi);
                cdi.uo = computeUpperOutlierBound(cdi);

                // lower and upper notches
                var mci = computeNotchSpan(cdi, N);
                cdi.ln = cdi.med - mci;
                cdi.un = cdi.med + mci;
                minLowerNotch = Math.min(minLowerNotch, cdi.ln);
                maxUpperNotch = Math.max(maxUpperNotch, cdi.un);

                cdi.pts2 = pts.filter(ptFilterFn);

                cd.push(cdi);
            }
        }

        trace._extremes[valAxis._id] = Axes.findExtremes(valAxis,
            trace.notched ? valArray.concat([minLowerNotch, maxUpperNotch]) : valArray,
            {padded: true}
        );
    }

    calcSelection(cd, trace);

    if(cd.length > 0) {
        cd[0].t = {
            num: fullLayout[numKey],
            dPos: dPos,
            posLetter: posLetter,
            valLetter: valLetter,
            labels: {
                med: _(gd, 'median:'),
                min: _(gd, 'min:'),
                q1: _(gd, 'q1:'),
                q3: _(gd, 'q3:'),
                max: _(gd, 'max:'),
                mean: trace.boxmean === 'sd' ? _(gd, 'mean ± σ:') : _(gd, 'mean:'),
                lf: _(gd, 'lower fence:'),
                uf: _(gd, 'upper fence:')
            }
        };

        fullLayout[numKey]++;
        return cd;
    } else {
        return [{t: {empty: true}}];
    }
};

// In vertical (horizontal) box plots:
// if no x (y) data, use x0 (y0), or name
// so if you want one box
// per trace, set x0 (y0) to the x (y) value or category for this trace
// (or set x (y) to a constant array matching y (x))
function getPos(trace, posLetter, posAxis, num) {
    var hasPosArray = posLetter in trace;
    var hasPos0 = posLetter + '0' in trace;
    var hasPosStep = 'd' + posLetter in trace;

    if(hasPosArray || (hasPos0 && hasPosStep)) {
        return posAxis.makeCalcdata(trace, posLetter);
    }

    var pos0;
    if(hasPos0) {
        pos0 = trace[posLetter + '0'];
    } else if('name' in trace && (
        posAxis.type === 'category' || (
            isNumeric(trace.name) &&
            ['linear', 'log'].indexOf(posAxis.type) !== -1
        ) || (
            Lib.isDateTime(trace.name) &&
            posAxis.type === 'date'
        )
    )) {
        pos0 = trace.name;
    } else {
        pos0 = num;
    }

    var pos0c = posAxis.type === 'multicategory' ?
        posAxis.r2c_just_indices(pos0) :
        posAxis.d2c(pos0, 0, trace[posLetter + 'calendar']);

    var len = trace._length;
    var out = new Array(len);
    for(var i = 0; i < len; i++) out[i] = pos0c;

    return out;
}

function makeBins(x, dx) {
    var len = x.length;
    var bins = new Array(len + 1);

    for(var i = 0; i < len; i++) {
        bins[i] = x[i] - dx;
    }
    bins[len] = x[len - 1] + dx;

    return bins;
}

function initNestedArray(len) {
    var arr = new Array(len);
    for(var i = 0; i < len; i++) {
        arr[i] = [];
    }
    return arr;
}

var TRACE_TO_CALC = {
    text: 'tx',
    hovertext: 'htx'
};

function arraysToCalcdata(pt, trace, ptNumber) {
    for(var k in TRACE_TO_CALC) {
        if(Lib.isArrayOrTypedArray(trace[k])) {
            if(Array.isArray(ptNumber)) {
                if(Lib.isArrayOrTypedArray(trace[k][ptNumber[0]])) {
                    pt[TRACE_TO_CALC[k]] = trace[k][ptNumber[0]][ptNumber[1]];
                }
            } else {
                pt[TRACE_TO_CALC[k]] = trace[k][ptNumber];
            }
        }
    }
}

function calcSelection(cd, trace) {
    if(Lib.isArrayOrTypedArray(trace.selectedpoints)) {
        for(var i = 0; i < cd.length; i++) {
            var pts = cd[i].pts || [];
            var ptNumber2cdIndex = {};

            for(var j = 0; j < pts.length; j++) {
                ptNumber2cdIndex[pts[j].i] = j;
            }

            Lib.tagSelected(pts, trace, ptNumber2cdIndex);
        }
    }
}

function sortByVal(a, b) { return a.v - b.v; }

function extractVal(o) { return o.v; }

// last point below 1.5 * IQR
function computeLowerFence(cdi, boxVals, N) {
    if(N === 0) return cdi.q1;
    return Math.min(
        cdi.q1,
        boxVals[Math.min(
            Lib.findBin(2.5 * cdi.q1 - 1.5 * cdi.q3, boxVals, true) + 1,
            N - 1
        )]
    );
}

// last point above 1.5 * IQR
function computeUpperFence(cdi, boxVals, N) {
    if(N === 0) return cdi.q3;
    return Math.max(
        cdi.q3,
        boxVals[Math.max(
            Lib.findBin(2.5 * cdi.q3 - 1.5 * cdi.q1, boxVals),
            0
        )]
    );
}

// 3 IQR below (don't clip to max/min,
// this is only for discriminating suspected & far outliers)
function computeLowerOutlierBound(cdi) {
    return 4 * cdi.q1 - 3 * cdi.q3;
}

// 3 IQR above (don't clip to max/min,
// this is only for discriminating suspected & far outliers)
function computeUpperOutlierBound(cdi) {
    return 4 * cdi.q3 - 3 * cdi.q1;
}

// 95% confidence intervals for median
function computeNotchSpan(cdi, N) {
    if(N === 0) return 0;
    return 1.57 * (cdi.q3 - cdi.q1) / Math.sqrt(N);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/defaults.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var handleGroupingDefaults = __webpack_require__(/*! ../bar/defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").handleGroupingDefaults;
var autoType = __webpack_require__(/*! ../../plots/cartesian/axis_autotype */ "./node_modules/plotly.js/src/plots/cartesian/axis_autotype.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/box/attributes.js");

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    handleSampleDefaults(traceIn, traceOut, coerce, layout);
    if(traceOut.visible === false) return;

    var hasPreCompStats = traceOut._hasPreCompStats;

    if(hasPreCompStats) {
        coerce('lowerfence');
        coerce('upperfence');
    }

    coerce('line.color', (traceIn.marker || {}).color || defaultColor);
    coerce('line.width');
    coerce('fillcolor', Color.addOpacity(traceOut.line.color, 0.5));

    var boxmeanDflt = false;
    if(hasPreCompStats) {
        var mean = coerce('mean');
        var sd = coerce('sd');
        if(mean && mean.length) {
            boxmeanDflt = true;
            if(sd && sd.length) boxmeanDflt = 'sd';
        }
    }
    coerce('boxmean', boxmeanDflt);

    coerce('whiskerwidth');
    coerce('width');
    coerce('quartilemethod');

    var notchedDflt = false;
    if(hasPreCompStats) {
        var notchspan = coerce('notchspan');
        if(notchspan && notchspan.length) {
            notchedDflt = true;
        }
    } else if(Lib.validate(traceIn.notchwidth, attributes.notchwidth)) {
        notchedDflt = true;
    }
    var notched = coerce('notched', notchedDflt);
    if(notched) coerce('notchwidth');

    handlePointsDefaults(traceIn, traceOut, coerce, {prefix: 'box'});
}

function handleSampleDefaults(traceIn, traceOut, coerce, layout) {
    function getDims(arr) {
        var dims = 0;
        if(arr && arr.length) {
            dims += 1;
            if(Lib.isArrayOrTypedArray(arr[0]) && arr[0].length) {
                dims += 1;
            }
        }
        return dims;
    }

    function valid(astr) {
        return Lib.validate(traceIn[astr], attributes[astr]);
    }

    var y = coerce('y');
    var x = coerce('x');

    var sLen;
    if(traceOut.type === 'box') {
        var q1 = coerce('q1');
        var median = coerce('median');
        var q3 = coerce('q3');

        traceOut._hasPreCompStats = (
            q1 && q1.length &&
            median && median.length &&
            q3 && q3.length
        );
        sLen = Math.min(
            Lib.minRowLength(q1),
            Lib.minRowLength(median),
            Lib.minRowLength(q3)
        );
    }

    var yDims = getDims(y);
    var xDims = getDims(x);
    var yLen = yDims && Lib.minRowLength(y);
    var xLen = xDims && Lib.minRowLength(x);

    var defaultOrientation, len;
    if(traceOut._hasPreCompStats) {
        switch(String(xDims) + String(yDims)) {
            // no x / no y
            case '00':
                var setInX = valid('x0') || valid('dx');
                var setInY = valid('y0') || valid('dy');

                if(setInY && !setInX) {
                    defaultOrientation = 'h';
                } else {
                    defaultOrientation = 'v';
                }

                len = sLen;
                break;
            // just x
            case '10':
                defaultOrientation = 'v';
                len = Math.min(sLen, xLen);
                break;
            case '20':
                defaultOrientation = 'h';
                len = Math.min(sLen, x.length);
                break;
            // just y
            case '01':
                defaultOrientation = 'h';
                len = Math.min(sLen, yLen);
                break;
            case '02':
                defaultOrientation = 'v';
                len = Math.min(sLen, y.length);
                break;
            // both
            case '12':
                defaultOrientation = 'v';
                len = Math.min(sLen, xLen, y.length);
                break;
            case '21':
                defaultOrientation = 'h';
                len = Math.min(sLen, x.length, yLen);
                break;
            case '11':
                // this one is ill-defined
                len = 0;
                break;
            case '22':
                var hasCategories = false;
                var i;
                for(i = 0; i < x.length; i++) {
                    if(autoType(x[i]) === 'category') {
                        hasCategories = true;
                        break;
                    }
                }

                if(hasCategories) {
                    defaultOrientation = 'v';
                    len = Math.min(sLen, xLen, y.length);
                } else {
                    for(i = 0; i < y.length; i++) {
                        if(autoType(y[i]) === 'category') {
                            hasCategories = true;
                            break;
                        }
                    }

                    if(hasCategories) {
                        defaultOrientation = 'h';
                        len = Math.min(sLen, x.length, yLen);
                    } else {
                        defaultOrientation = 'v';
                        len = Math.min(sLen, xLen, y.length);
                    }
                }
                break;
        }
    } else if(yDims > 0) {
        defaultOrientation = 'v';
        if(xDims > 0) {
            len = Math.min(xLen, yLen);
        } else {
            len = Math.min(yLen);
        }
    } else if(xDims > 0) {
        defaultOrientation = 'h';
        len = Math.min(xLen);
    } else {
        len = 0;
    }

    if(!len) {
        traceOut.visible = false;
        return;
    }
    traceOut._length = len;

    var orientation = coerce('orientation', defaultOrientation);

    // these are just used for positioning, they never define the sample
    if(traceOut._hasPreCompStats) {
        if(orientation === 'v' && xDims === 0) {
            coerce('x0', 0);
            coerce('dx', 1);
        } else if(orientation === 'h' && yDims === 0) {
            coerce('y0', 0);
            coerce('dy', 1);
        }
    } else {
        if(orientation === 'v' && xDims === 0) {
            coerce('x0');
        } else if(orientation === 'h' && yDims === 0) {
            coerce('y0');
        }
    }

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y'], layout);
}

function handlePointsDefaults(traceIn, traceOut, coerce, opts) {
    var prefix = opts.prefix;

    var outlierColorDflt = Lib.coerce2(traceIn, traceOut, attributes, 'marker.outliercolor');
    var lineoutliercolor = coerce('marker.line.outliercolor');

    var modeDflt = 'outliers';
    if(traceOut._hasPreCompStats) {
        modeDflt = 'all';
    } else if(outlierColorDflt || lineoutliercolor) {
        modeDflt = 'suspectedoutliers';
    }

    var mode = coerce(prefix + 'points', modeDflt);

    if(mode) {
        coerce('jitter', mode === 'all' ? 0.3 : 0);
        coerce('pointpos', mode === 'all' ? -1.5 : 0);

        coerce('marker.symbol');
        coerce('marker.opacity');
        coerce('marker.size');
        coerce('marker.color', traceOut.line.color);
        coerce('marker.line.color');
        coerce('marker.line.width');

        if(mode === 'suspectedoutliers') {
            coerce('marker.line.outliercolor', traceOut.marker.color);
            coerce('marker.line.outlierwidth');
        }

        coerce('selected.marker.color');
        coerce('unselected.marker.color');
        coerce('selected.marker.size');
        coerce('unselected.marker.size');

        coerce('text');
        coerce('hovertext');
    } else {
        delete traceOut.marker;
    }

    var hoveron = coerce('hoveron');
    if(hoveron === 'all' || hoveron.indexOf('points') !== -1) {
        coerce('hovertemplate');
    }

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
}

function crossTraceDefaults(fullData, fullLayout) {
    var traceIn, traceOut;

    function coerce(attr) {
        return Lib.coerce(traceOut._input, traceOut, attributes, attr);
    }

    for(var i = 0; i < fullData.length; i++) {
        traceOut = fullData[i];
        var traceType = traceOut.type;

        if(traceType === 'box' || traceType === 'violin') {
            traceIn = traceOut._input;
            if(fullLayout[traceType + 'mode'] === 'group') {
                handleGroupingDefaults(traceIn, traceOut, fullLayout, coerce);
            }
        }
    }
}

module.exports = {
    supplyDefaults: supplyDefaults,
    crossTraceDefaults: crossTraceDefaults,

    handleSampleDefaults: handleSampleDefaults,
    handlePointsDefaults: handlePointsDefaults
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/hover.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/hover.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var fillText = Lib.fillText;

function hoverPoints(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var trace = cd[0].trace;
    var hoveron = trace.hoveron;
    var closeBoxData = [];
    var closePtData;

    if(hoveron.indexOf('boxes') !== -1) {
        closeBoxData = closeBoxData.concat(hoverOnBoxes(pointData, xval, yval, hovermode));
    }

    if(hoveron.indexOf('points') !== -1) {
        closePtData = hoverOnPoints(pointData, xval, yval);
    }

    // If there's a point in range and hoveron has points, show the best single point only.
    // If hoveron has boxes and there's no point in range (or hoveron doesn't have points), show the box stats.
    if(hovermode === 'closest') {
        if(closePtData) return [closePtData];
        return closeBoxData;
    }

    // Otherwise in compare mode, allow a point AND the box stats to be labeled
    // If there are multiple boxes in range (ie boxmode = 'overlay') we'll see stats for all of them.
    if(closePtData) {
        closeBoxData.push(closePtData);
        return closeBoxData;
    }
    return closeBoxData;
}

function hoverOnBoxes(pointData, xval, yval, hovermode) {
    var cd = pointData.cd;
    var xa = pointData.xa;
    var ya = pointData.ya;
    var trace = cd[0].trace;
    var t = cd[0].t;
    var isViolin = trace.type === 'violin';
    var closeBoxData = [];

    var pLetter, vLetter, pAxis, vAxis, vVal, pVal, dx, dy, dPos,
        hoverPseudoDistance, spikePseudoDistance;

    var boxDelta = t.bdPos;
    var boxDeltaPos, boxDeltaNeg;
    var posAcceptance = t.wHover;
    var shiftPos = function(di) { return pAxis.c2l(di.pos) + t.bPos - pAxis.c2l(pVal); };

    if(isViolin && trace.side !== 'both') {
        if(trace.side === 'positive') {
            dPos = function(di) {
                var pos = shiftPos(di);
                return Fx.inbox(pos, pos + posAcceptance, hoverPseudoDistance);
            };
            boxDeltaPos = boxDelta;
            boxDeltaNeg = 0;
        }
        if(trace.side === 'negative') {
            dPos = function(di) {
                var pos = shiftPos(di);
                return Fx.inbox(pos - posAcceptance, pos, hoverPseudoDistance);
            };
            boxDeltaPos = 0;
            boxDeltaNeg = boxDelta;
        }
    } else {
        dPos = function(di) {
            var pos = shiftPos(di);
            return Fx.inbox(pos - posAcceptance, pos + posAcceptance, hoverPseudoDistance);
        };
        boxDeltaPos = boxDeltaNeg = boxDelta;
    }

    var dVal;

    if(isViolin) {
        dVal = function(di) {
            return Fx.inbox(di.span[0] - vVal, di.span[1] - vVal, hoverPseudoDistance);
        };
    } else {
        dVal = function(di) {
            return Fx.inbox(di.min - vVal, di.max - vVal, hoverPseudoDistance);
        };
    }

    if(trace.orientation === 'h') {
        vVal = xval;
        pVal = yval;
        dx = dVal;
        dy = dPos;
        pLetter = 'y';
        pAxis = ya;
        vLetter = 'x';
        vAxis = xa;
    } else {
        vVal = yval;
        pVal = xval;
        dx = dPos;
        dy = dVal;
        pLetter = 'x';
        pAxis = xa;
        vLetter = 'y';
        vAxis = ya;
    }

    // if two boxes are overlaying, let the narrowest one win
    var pseudoDistance = Math.min(1, boxDelta / Math.abs(pAxis.r2c(pAxis.range[1]) - pAxis.r2c(pAxis.range[0])));
    hoverPseudoDistance = pointData.maxHoverDistance - pseudoDistance;
    spikePseudoDistance = pointData.maxSpikeDistance - pseudoDistance;

    function dxy(di) { return (dx(di) + dy(di)) / 2; }
    var distfn = Fx.getDistanceFunction(hovermode, dx, dy, dxy);
    Fx.getClosest(cd, distfn, pointData);

    // skip the rest (for this trace) if we didn't find a close point
    // and create the item(s) in closedata for this point
    if(pointData.index === false) return [];

    var di = cd[pointData.index];
    var lc = trace.line.color;
    var mc = (trace.marker || {}).color;

    if(Color.opacity(lc) && trace.line.width) pointData.color = lc;
    else if(Color.opacity(mc) && trace.boxpoints) pointData.color = mc;
    else pointData.color = trace.fillcolor;

    pointData[pLetter + '0'] = pAxis.c2p(di.pos + t.bPos - boxDeltaNeg, true);
    pointData[pLetter + '1'] = pAxis.c2p(di.pos + t.bPos + boxDeltaPos, true);

    pointData[pLetter + 'LabelVal'] = di.pos;

    var spikePosAttr = pLetter + 'Spike';
    pointData.spikeDistance = dxy(di) * spikePseudoDistance / hoverPseudoDistance;
    pointData[spikePosAttr] = pAxis.c2p(di.pos, true);

    // box plots: each "point" gets many labels
    var usedVals = {};
    var attrs = ['med', 'q1', 'q3', 'min', 'max'];

    if(trace.boxmean || (trace.meanline || {}).visible) {
        attrs.push('mean');
    }
    if(trace.boxpoints || trace.points) {
        attrs.push('lf', 'uf');
    }

    for(var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];

        if(!(attr in di) || (di[attr] in usedVals)) continue;
        usedVals[di[attr]] = true;

        // copy out to a new object for each value to label
        var val = di[attr];
        var valPx = vAxis.c2p(val, true);
        var pointData2 = Lib.extendFlat({}, pointData);

        pointData2.attr = attr;
        pointData2[vLetter + '0'] = pointData2[vLetter + '1'] = valPx;
        pointData2[vLetter + 'LabelVal'] = val;
        pointData2[vLetter + 'Label'] = (t.labels ? t.labels[attr] + ' ' : '') + Axes.hoverLabelText(vAxis, val);

        // Note: introduced to be able to distinguish a
        // clicked point from a box during click-to-select
        pointData2.hoverOnBox = true;

        if(attr === 'mean' && ('sd' in di) && trace.boxmean === 'sd') {
            pointData2[vLetter + 'err'] = di.sd;
        }

        // only keep name and spikes on the first item (median)
        pointData.name = '';
        pointData.spikeDistance = undefined;
        pointData[spikePosAttr] = undefined;

        // no hovertemplate support yet
        pointData2.hovertemplate = false;

        closeBoxData.push(pointData2);
    }

    return closeBoxData;
}

function hoverOnPoints(pointData, xval, yval) {
    var cd = pointData.cd;
    var xa = pointData.xa;
    var ya = pointData.ya;
    var trace = cd[0].trace;
    var xPx = xa.c2p(xval);
    var yPx = ya.c2p(yval);
    var closePtData;

    var dx = function(di) {
        var rad = Math.max(3, di.mrc || 0);
        return Math.max(Math.abs(xa.c2p(di.x) - xPx) - rad, 1 - 3 / rad);
    };
    var dy = function(di) {
        var rad = Math.max(3, di.mrc || 0);
        return Math.max(Math.abs(ya.c2p(di.y) - yPx) - rad, 1 - 3 / rad);
    };
    var distfn = Fx.quadrature(dx, dy);

    // show one point per trace
    var ijClosest = false;
    var di, pt;

    for(var i = 0; i < cd.length; i++) {
        di = cd[i];

        for(var j = 0; j < (di.pts || []).length; j++) {
            pt = di.pts[j];

            var newDistance = distfn(pt);
            if(newDistance <= pointData.distance) {
                pointData.distance = newDistance;
                ijClosest = [i, j];
            }
        }
    }

    if(!ijClosest) return false;

    di = cd[ijClosest[0]];
    pt = di.pts[ijClosest[1]];

    var xc = xa.c2p(pt.x, true);
    var yc = ya.c2p(pt.y, true);
    var rad = pt.mrc || 1;

    closePtData = Lib.extendFlat({}, pointData, {
        // corresponds to index in x/y input data array
        index: pt.i,
        color: (trace.marker || {}).color,
        name: trace.name,
        x0: xc - rad,
        x1: xc + rad,
        y0: yc - rad,
        y1: yc + rad,
        spikeDistance: pointData.distance,
        hovertemplate: trace.hovertemplate
    });

    var pa;
    if(trace.orientation === 'h') {
        pa = ya;
        closePtData.xLabelVal = pt.x;
        closePtData.yLabelVal = di.pos;
    } else {
        pa = xa;
        closePtData.xLabelVal = di.pos;
        closePtData.yLabelVal = pt.y;
    }

    var pLetter = pa._id.charAt(0);
    closePtData[pLetter + 'Spike'] = pa.c2p(di.pos, true);

    fillText(pt, trace, closePtData);

    return closePtData;
}

module.exports = {
    hoverPoints: hoverPoints,
    hoverOnBoxes: hoverOnBoxes,
    hoverOnPoints: hoverOnPoints
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/select.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/select.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function selectPoints(searchInfo, selectionTester) {
    var cd = searchInfo.cd;
    var xa = searchInfo.xaxis;
    var ya = searchInfo.yaxis;
    var selection = [];
    var i, j;

    if(selectionTester === false) {
        for(i = 0; i < cd.length; i++) {
            for(j = 0; j < (cd[i].pts || []).length; j++) {
                // clear selection
                cd[i].pts[j].selected = 0;
            }
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            for(j = 0; j < (cd[i].pts || []).length; j++) {
                var pt = cd[i].pts[j];
                var x = xa.c2p(pt.x);
                var y = ya.c2p(pt.y);

                if(selectionTester.contains([x, y], null, pt.i, searchInfo)) {
                    selection.push({
                        pointNumber: pt.i,
                        x: xa.c2d(pt.x),
                        y: ya.c2d(pt.y)
                    });
                    pt.selected = 1;
                } else {
                    pt.selected = 0;
                }
            }
        }
    }

    return selection;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2JveC9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYm94L2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYm94L2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYm94L3NlbGVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw4REFBZ0I7O0FBRXhDLFdBQVcsbUJBQU8sQ0FBQyx3RkFBNEI7QUFDL0MsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3QixhQUFhLGtIQUEyQztBQUN4RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFdBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHlDQUF5Qzs7QUFFL0Q7QUFDQTtBQUNBLCtCQUErQix5Q0FBeUM7QUFDeEU7QUFDQTs7QUFFQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQiwyQkFBMkI7QUFDckQ7QUFDQTtBQUNBLDhC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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsZUFBZTtBQUNqQzs7QUFFQSxzQkFBc0IsMkJBQTJCO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGVBQWU7QUFDakMsc0JBQXNCLDhCQUE4QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxrQkFBa0IsZUFBZTtBQUNqQyxzQkFBc0IsOEJBQThCO0FBQ3BEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydDM0ZjQ2ZDNlYzBkODYxMmQwNDc3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcbnZhciBfID0gTGliLl87XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciB4YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS54YXhpcyB8fCAneCcpO1xuICAgIHZhciB5YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS55YXhpcyB8fCAneScpO1xuICAgIHZhciBjZCA9IFtdO1xuXG4gICAgLy8gTi5CLiB2aW9saW4gcmV1c2VzIHNhbWUgQm94LmNhbGNcbiAgICB2YXIgbnVtS2V5ID0gdHJhY2UudHlwZSA9PT0gJ3Zpb2xpbicgPyAnX251bVZpb2xpbnMnIDogJ19udW1Cb3hlcyc7XG5cbiAgICB2YXIgaSwgajtcbiAgICB2YXIgdmFsQXhpcywgdmFsTGV0dGVyO1xuICAgIHZhciBwb3NBeGlzLCBwb3NMZXR0ZXI7XG5cbiAgICBpZih0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICAgIHZhbEF4aXMgPSB4YTtcbiAgICAgICAgdmFsTGV0dGVyID0gJ3gnO1xuICAgICAgICBwb3NBeGlzID0geWE7XG4gICAgICAgIHBvc0xldHRlciA9ICd5JztcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YWxBeGlzID0geWE7XG4gICAgICAgIHZhbExldHRlciA9ICd5JztcbiAgICAgICAgcG9zQXhpcyA9IHhhO1xuICAgICAgICBwb3NMZXR0ZXIgPSAneCc7XG4gICAgfVxuXG4gICAgdmFyIHBvc0FycmF5ID0gZ2V0UG9zKHRyYWNlLCBwb3NMZXR0ZXIsIHBvc0F4aXMsIGZ1bGxMYXlvdXRbbnVtS2V5XSk7XG4gICAgdmFyIGR2ID0gTGliLmRpc3RpbmN0VmFscyhwb3NBcnJheSk7XG4gICAgdmFyIHBvc0Rpc3RpbmN0ID0gZHYudmFscztcbiAgICB2YXIgZFBvcyA9IGR2Lm1pbkRpZmYgLyAyO1xuXG4gICAgLy8gaXRlbSBpbiB0cmFjZSBjYWxjZGF0YVxuICAgIHZhciBjZGk7XG4gICAgLy8gYXJyYXkgb2Yge3Y6IHYsIGksIGl9IHNhbXBsZSBwdHNcbiAgICB2YXIgcHRzO1xuICAgIC8vIHZhbHVlcyBvZiB0aGUgYHB0c2AgYXJyYXkgb2Ygb2JqZWN0c1xuICAgIHZhciBib3hWYWxzO1xuICAgIC8vIGxlbmd0aCBvZiBzYW1wbGVcbiAgICB2YXIgTjtcbiAgICAvLyBzaW5nbGUgc2FtcGxlIHBvaW50XG4gICAgdmFyIHB0O1xuICAgIC8vIHNpbmdsZSBzYW1wbGUgdmFsdWVcbiAgICB2YXIgdjtcblxuICAgIC8vIGZpbHRlciBmdW5jdGlvbiBmb3Igb3V0bGllciBwdHNcbiAgICAvLyBvdXRsaWVyIGRlZmluaXRpb24gYmFzZWQgb24gaHR0cDovL3d3dy5waHlzaWNzLmNzYnNqdS5lZHUvc3RhdHMvYm94Mi5odG1sXG4gICAgdmFyIHB0RmlsdGVyRm4gPSAodHJhY2UuYm94cG9pbnRzIHx8IHRyYWNlLnBvaW50cykgPT09ICdhbGwnID9cbiAgICAgICAgTGliLmlkZW50aXR5IDpcbiAgICAgICAgZnVuY3Rpb24ocHQpIHsgcmV0dXJuIChwdC52IDwgY2RpLmxmIHx8IHB0LnYgPiBjZGkudWYpOyB9O1xuXG4gICAgaWYodHJhY2UuX2hhc1ByZUNvbXBTdGF0cykge1xuICAgICAgICB2YXIgdmFsQXJyYXlSYXcgPSB0cmFjZVt2YWxMZXR0ZXJdO1xuICAgICAgICB2YXIgZDJjID0gZnVuY3Rpb24oaykgeyByZXR1cm4gdmFsQXhpcy5kMmMoKHRyYWNlW2tdIHx8IFtdKVtpXSk7IH07XG4gICAgICAgIHZhciBtaW5WYWwgPSBJbmZpbml0eTtcbiAgICAgICAgdmFyIG1heFZhbCA9IC1JbmZpbml0eTtcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCB0cmFjZS5fbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwb3NpID0gcG9zQXJyYXlbaV07XG4gICAgICAgICAgICBpZighaXNOdW1lcmljKHBvc2kpKSBjb250aW51ZTtcblxuICAgICAgICAgICAgY2RpID0ge307XG4gICAgICAgICAgICBjZGkucG9zID0gY2RpW3Bvc0xldHRlcl0gPSBwb3NpO1xuXG4gICAgICAgICAgICBjZGkucTEgPSBkMmMoJ3ExJyk7XG4gICAgICAgICAgICBjZGkubWVkID0gZDJjKCdtZWRpYW4nKTtcbiAgICAgICAgICAgIGNkaS5xMyA9IGQyYygncTMnKTtcblxuICAgICAgICAgICAgcHRzID0gW107XG4gICAgICAgICAgICBpZih2YWxBcnJheVJhdyAmJiBMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh2YWxBcnJheVJhd1tpXSkpIHtcbiAgICAgICAgICAgICAgICBmb3IoaiA9IDA7IGogPCB2YWxBcnJheVJhd1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2ID0gdmFsQXhpcy5kMmModmFsQXJyYXlSYXdbaV1bal0pO1xuICAgICAgICAgICAgICAgICAgICBpZih2ICE9PSBCQUROVU0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB0ID0ge3Y6IHYsIGk6IFtpLCBqXX07XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJheXNUb0NhbGNkYXRhKHB0LCB0cmFjZSwgW2ksIGpdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB0cy5wdXNoKHB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNkaS5wdHMgPSBwdHMuc29ydChzb3J0QnlWYWwpO1xuICAgICAgICAgICAgYm94VmFscyA9IGNkaVt2YWxMZXR0ZXJdID0gcHRzLm1hcChleHRyYWN0VmFsKTtcbiAgICAgICAgICAgIE4gPSBib3hWYWxzLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYoY2RpLm1lZCAhPT0gQkFETlVNICYmIGNkaS5xMSAhPT0gQkFETlVNICYmIGNkaS5xMyAhPT0gQkFETlVNICYmXG4gICAgICAgICAgICAgICAgY2RpLm1lZCA+PSBjZGkucTEgJiYgY2RpLnEzID49IGNkaS5tZWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHZhciBsZiA9IGQyYygnbG93ZXJmZW5jZScpO1xuICAgICAgICAgICAgICAgIGNkaS5sZiA9IChsZiAhPT0gQkFETlVNICYmIGxmIDw9IGNkaS5xMSkgP1xuICAgICAgICAgICAgICAgICAgICBsZiA6XG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVMb3dlckZlbmNlKGNkaSwgYm94VmFscywgTik7XG5cbiAgICAgICAgICAgICAgICB2YXIgdWYgPSBkMmMoJ3VwcGVyZmVuY2UnKTtcbiAgICAgICAgICAgICAgICBjZGkudWYgPSAodWYgIT09IEJBRE5VTSAmJiB1ZiA+PSBjZGkucTMpID9cbiAgICAgICAgICAgICAgICAgICAgdWYgOlxuICAgICAgICAgICAgICAgICAgICBjb21wdXRlVXBwZXJGZW5jZShjZGksIGJveFZhbHMsIE4pO1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lYW4gPSBkMmMoJ21lYW4nKTtcbiAgICAgICAgICAgICAgICBjZGkubWVhbiA9IChtZWFuICE9PSBCQUROVU0pID9cbiAgICAgICAgICAgICAgICAgICAgbWVhbiA6XG4gICAgICAgICAgICAgICAgICAgIChOID8gTGliLm1lYW4oYm94VmFscywgTikgOiAoY2RpLnExICsgY2RpLnEzKSAvIDIpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNkID0gZDJjKCdzZCcpO1xuICAgICAgICAgICAgICAgIGNkaS5zZCA9IChtZWFuICE9PSBCQUROVU0gJiYgc2QgPj0gMCkgP1xuICAgICAgICAgICAgICAgICAgICBzZCA6XG4gICAgICAgICAgICAgICAgICAgIChOID8gTGliLnN0ZGV2KGJveFZhbHMsIE4sIGNkaS5tZWFuKSA6IChjZGkucTMgLSBjZGkucTEpKTtcblxuICAgICAgICAgICAgICAgIGNkaS5sbyA9IGNvbXB1dGVMb3dlck91dGxpZXJCb3VuZChjZGkpO1xuICAgICAgICAgICAgICAgIGNkaS51byA9IGNvbXB1dGVVcHBlck91dGxpZXJCb3VuZChjZGkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5zID0gZDJjKCdub3RjaHNwYW4nKTtcbiAgICAgICAgICAgICAgICBucyA9IChucyAhPT0gQkFETlVNICYmIG5zID4gMCkgPyBucyA6IGNvbXB1dGVOb3RjaFNwYW4oY2RpLCBOKTtcbiAgICAgICAgICAgICAgICBjZGkubG4gPSBjZGkubWVkIC0gbnM7XG4gICAgICAgICAgICAgICAgY2RpLnVuID0gY2RpLm1lZCArIG5zO1xuXG4gICAgICAgICAgICAgICAgdmFyIGltaW4gPSBjZGkubGY7XG4gICAgICAgICAgICAgICAgdmFyIGltYXggPSBjZGkudWY7XG4gICAgICAgICAgICAgICAgaWYodHJhY2UuYm94cG9pbnRzICYmIGJveFZhbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGltaW4gPSBNYXRoLm1pbihpbWluLCBib3hWYWxzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgaW1heCA9IE1hdGgubWF4KGltYXgsIGJveFZhbHNbTiAtIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodHJhY2Uubm90Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICBpbWluID0gTWF0aC5taW4oaW1pbiwgY2RpLmxuKTtcbiAgICAgICAgICAgICAgICAgICAgaW1heCA9IE1hdGgubWF4KGltYXgsIGNkaS51bik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNkaS5taW4gPSBpbWluO1xuICAgICAgICAgICAgICAgIGNkaS5tYXggPSBpbWF4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBMaWIud2FybihbXG4gICAgICAgICAgICAgICAgICAgICdJbnZhbGlkIGlucHV0IC0gbWFrZSBzdXJlIHRoYXQgcTEgPD0gbWVkaWFuIDw9IHEzJyxcbiAgICAgICAgICAgICAgICAgICAgJ3ExID0gJyArIGNkaS5xMSxcbiAgICAgICAgICAgICAgICAgICAgJ21lZGlhbiA9ICcgKyBjZGkubWVkLFxuICAgICAgICAgICAgICAgICAgICAncTMgPSAnICsgY2RpLnEzXG4gICAgICAgICAgICAgICAgXS5qb2luKCdcXG4nKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdjA7XG4gICAgICAgICAgICAgICAgaWYoY2RpLm1lZCAhPT0gQkFETlVNKSB7XG4gICAgICAgICAgICAgICAgICAgIHYwID0gY2RpLm1lZDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2RpLnExICE9PSBCQUROVU0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoY2RpLnEzICE9PSBCQUROVU0pIHYwID0gKGNkaS5xMSArIGNkaS5xMykgLyAyO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHYwID0gY2RpLnExO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjZGkucTMgIT09IEJBRE5VTSkge1xuICAgICAgICAgICAgICAgICAgICB2MCA9IGNkaS5xMztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2MCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBib3ggYXMgbGluZSBzZWdtZW50XG4gICAgICAgICAgICAgICAgY2RpLm1lZCA9IHYwO1xuICAgICAgICAgICAgICAgIGNkaS5xMSA9IGNkaS5xMyA9IHYwO1xuICAgICAgICAgICAgICAgIGNkaS5sZiA9IGNkaS51ZiA9IHYwO1xuICAgICAgICAgICAgICAgIGNkaS5tZWFuID0gY2RpLnNkID0gdjA7XG4gICAgICAgICAgICAgICAgY2RpLmxuID0gY2RpLnVuID0gdjA7XG4gICAgICAgICAgICAgICAgY2RpLm1pbiA9IGNkaS5tYXggPSB2MDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWluVmFsID0gTWF0aC5taW4obWluVmFsLCBjZGkubWluKTtcbiAgICAgICAgICAgIG1heFZhbCA9IE1hdGgubWF4KG1heFZhbCwgY2RpLm1heCk7XG5cbiAgICAgICAgICAgIGNkaS5wdHMyID0gcHRzLmZpbHRlcihwdEZpbHRlckZuKTtcblxuICAgICAgICAgICAgY2QucHVzaChjZGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhY2UuX2V4dHJlbWVzW3ZhbEF4aXMuX2lkXSA9IEF4ZXMuZmluZEV4dHJlbWVzKHZhbEF4aXMsXG4gICAgICAgICAgICBbbWluVmFsLCBtYXhWYWxdLFxuICAgICAgICAgICAge3BhZGRlZDogdHJ1ZX1cbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdmFsQXJyYXkgPSB2YWxBeGlzLm1ha2VDYWxjZGF0YSh0cmFjZSwgdmFsTGV0dGVyKTtcbiAgICAgICAgdmFyIHBvc0JpbnMgPSBtYWtlQmlucyhwb3NEaXN0aW5jdCwgZFBvcyk7XG4gICAgICAgIHZhciBwTGVuID0gcG9zRGlzdGluY3QubGVuZ3RoO1xuICAgICAgICB2YXIgcHRzUGVyQmluID0gaW5pdE5lc3RlZEFycmF5KHBMZW4pO1xuXG4gICAgICAgIC8vIGJpbiBwdHMgaW5mbyBwZXIgcG9zaXRpb24gYmluc1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCB0cmFjZS5fbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHYgPSB2YWxBcnJheVtpXTtcbiAgICAgICAgICAgIGlmKCFpc051bWVyaWModikpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgbiA9IExpYi5maW5kQmluKHBvc0FycmF5W2ldLCBwb3NCaW5zKTtcbiAgICAgICAgICAgIGlmKG4gPj0gMCAmJiBuIDwgcExlbikge1xuICAgICAgICAgICAgICAgIHB0ID0ge3Y6IHYsIGk6IGl9O1xuICAgICAgICAgICAgICAgIGFycmF5c1RvQ2FsY2RhdGEocHQsIHRyYWNlLCBpKTtcbiAgICAgICAgICAgICAgICBwdHNQZXJCaW5bbl0ucHVzaChwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWluTG93ZXJOb3RjaCA9IEluZmluaXR5O1xuICAgICAgICB2YXIgbWF4VXBwZXJOb3RjaCA9IC1JbmZpbml0eTtcblxuICAgICAgICB2YXIgcXVhcnRpbGVtZXRob2QgPSB0cmFjZS5xdWFydGlsZW1ldGhvZDtcbiAgICAgICAgdmFyIHVzZXNFeGNsdXNpdmUgPSBxdWFydGlsZW1ldGhvZCA9PT0gJ2V4Y2x1c2l2ZSc7XG4gICAgICAgIHZhciB1c2VzSW5jbHVzaXZlID0gcXVhcnRpbGVtZXRob2QgPT09ICdpbmNsdXNpdmUnO1xuXG4gICAgICAgIC8vIGJ1aWxkIGNhbGNkYXRhIHRyYWNlIGl0ZW1zLCBvbmUgaXRlbSBwZXIgZGlzdGluY3QgcG9zaXRpb25cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgcExlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZihwdHNQZXJCaW5baV0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNkaSA9IHt9O1xuICAgICAgICAgICAgICAgIGNkaS5wb3MgPSBjZGlbcG9zTGV0dGVyXSA9IHBvc0Rpc3RpbmN0W2ldO1xuXG4gICAgICAgICAgICAgICAgcHRzID0gY2RpLnB0cyA9IHB0c1BlckJpbltpXS5zb3J0KHNvcnRCeVZhbCk7XG4gICAgICAgICAgICAgICAgYm94VmFscyA9IGNkaVt2YWxMZXR0ZXJdID0gcHRzLm1hcChleHRyYWN0VmFsKTtcbiAgICAgICAgICAgICAgICBOID0gYm94VmFscy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBjZGkubWluID0gYm94VmFsc1swXTtcbiAgICAgICAgICAgICAgICBjZGkubWF4ID0gYm94VmFsc1tOIC0gMV07XG4gICAgICAgICAgICAgICAgY2RpLm1lYW4gPSBMaWIubWVhbihib3hWYWxzLCBOKTtcbiAgICAgICAgICAgICAgICBjZGkuc2QgPSBMaWIuc3RkZXYoYm94VmFscywgTiwgY2RpLm1lYW4pO1xuICAgICAgICAgICAgICAgIGNkaS5tZWQgPSBMaWIuaW50ZXJwKGJveFZhbHMsIDAuNSk7XG5cbiAgICAgICAgICAgICAgICBpZigoTiAlIDIpICYmICh1c2VzRXhjbHVzaXZlIHx8IHVzZXNJbmNsdXNpdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb3dlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVwcGVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHVzZXNFeGNsdXNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIE5PVCBpbmNsdWRlIHRoZSBtZWRpYW4gaW4gZWl0aGVyIGhhbGZcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyID0gYm94VmFscy5zbGljZSgwLCBOIC8gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cHBlciA9IGJveFZhbHMuc2xpY2UoTiAvIDIgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHVzZXNJbmNsdXNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluY2x1ZGUgdGhlIG1lZGlhbiBpbiBlaXRoZXIgaGFsZlxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXIgPSBib3hWYWxzLnNsaWNlKDAsIE4gLyAyICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cHBlciA9IGJveFZhbHMuc2xpY2UoTiAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2RpLnExID0gTGliLmludGVycChsb3dlciwgMC41KTtcbiAgICAgICAgICAgICAgICAgICAgY2RpLnEzID0gTGliLmludGVycCh1cHBlciwgMC41KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjZGkucTEgPSBMaWIuaW50ZXJwKGJveFZhbHMsIDAuMjUpO1xuICAgICAgICAgICAgICAgICAgICBjZGkucTMgPSBMaWIuaW50ZXJwKGJveFZhbHMsIDAuNzUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGxvd2VyIGFuZCB1cHBlciBmZW5jZXNcbiAgICAgICAgICAgICAgICBjZGkubGYgPSBjb21wdXRlTG93ZXJGZW5jZShjZGksIGJveFZhbHMsIE4pO1xuICAgICAgICAgICAgICAgIGNkaS51ZiA9IGNvbXB1dGVVcHBlckZlbmNlKGNkaSwgYm94VmFscywgTik7XG5cbiAgICAgICAgICAgICAgICAvLyBsb3dlciBhbmQgdXBwZXIgb3V0bGllcnMgYm91bmRzXG4gICAgICAgICAgICAgICAgY2RpLmxvID0gY29tcHV0ZUxvd2VyT3V0bGllckJvdW5kKGNkaSk7XG4gICAgICAgICAgICAgICAgY2RpLnVvID0gY29tcHV0ZVVwcGVyT3V0bGllckJvdW5kKGNkaSk7XG5cbiAgICAgICAgICAgICAgICAvLyBsb3dlciBhbmQgdXBwZXIgbm90Y2hlc1xuICAgICAgICAgICAgICAgIHZhciBtY2kgPSBjb21wdXRlTm90Y2hTcGFuKGNkaSwgTik7XG4gICAgICAgICAgICAgICAgY2RpLmxuID0gY2RpLm1lZCAtIG1jaTtcbiAgICAgICAgICAgICAgICBjZGkudW4gPSBjZGkubWVkICsgbWNpO1xuICAgICAgICAgICAgICAgIG1pbkxvd2VyTm90Y2ggPSBNYXRoLm1pbihtaW5Mb3dlck5vdGNoLCBjZGkubG4pO1xuICAgICAgICAgICAgICAgIG1heFVwcGVyTm90Y2ggPSBNYXRoLm1heChtYXhVcHBlck5vdGNoLCBjZGkudW4pO1xuXG4gICAgICAgICAgICAgICAgY2RpLnB0czIgPSBwdHMuZmlsdGVyKHB0RmlsdGVyRm4pO1xuXG4gICAgICAgICAgICAgICAgY2QucHVzaChjZGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHJhY2UuX2V4dHJlbWVzW3ZhbEF4aXMuX2lkXSA9IEF4ZXMuZmluZEV4dHJlbWVzKHZhbEF4aXMsXG4gICAgICAgICAgICB0cmFjZS5ub3RjaGVkID8gdmFsQXJyYXkuY29uY2F0KFttaW5Mb3dlck5vdGNoLCBtYXhVcHBlck5vdGNoXSkgOiB2YWxBcnJheSxcbiAgICAgICAgICAgIHtwYWRkZWQ6IHRydWV9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY2FsY1NlbGVjdGlvbihjZCwgdHJhY2UpO1xuXG4gICAgaWYoY2QubGVuZ3RoID4gMCkge1xuICAgICAgICBjZFswXS50ID0ge1xuICAgICAgICAgICAgbnVtOiBmdWxsTGF5b3V0W251bUtleV0sXG4gICAgICAgICAgICBkUG9zOiBkUG9zLFxuICAgICAgICAgICAgcG9zTGV0dGVyOiBwb3NMZXR0ZXIsXG4gICAgICAgICAgICB2YWxMZXR0ZXI6IHZhbExldHRlcixcbiAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIG1lZDogXyhnZCwgJ21lZGlhbjonKSxcbiAgICAgICAgICAgICAgICBtaW46IF8oZ2QsICdtaW46JyksXG4gICAgICAgICAgICAgICAgcTE6IF8oZ2QsICdxMTonKSxcbiAgICAgICAgICAgICAgICBxMzogXyhnZCwgJ3EzOicpLFxuICAgICAgICAgICAgICAgIG1heDogXyhnZCwgJ21heDonKSxcbiAgICAgICAgICAgICAgICBtZWFuOiB0cmFjZS5ib3htZWFuID09PSAnc2QnID8gXyhnZCwgJ21lYW4gwrEgz4M6JykgOiBfKGdkLCAnbWVhbjonKSxcbiAgICAgICAgICAgICAgICBsZjogXyhnZCwgJ2xvd2VyIGZlbmNlOicpLFxuICAgICAgICAgICAgICAgIHVmOiBfKGdkLCAndXBwZXIgZmVuY2U6JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdWxsTGF5b3V0W251bUtleV0rKztcbiAgICAgICAgcmV0dXJuIGNkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbe3Q6IHtlbXB0eTogdHJ1ZX19XTtcbiAgICB9XG59O1xuXG4vLyBJbiB2ZXJ0aWNhbCAoaG9yaXpvbnRhbCkgYm94IHBsb3RzOlxuLy8gaWYgbm8geCAoeSkgZGF0YSwgdXNlIHgwICh5MCksIG9yIG5hbWVcbi8vIHNvIGlmIHlvdSB3YW50IG9uZSBib3hcbi8vIHBlciB0cmFjZSwgc2V0IHgwICh5MCkgdG8gdGhlIHggKHkpIHZhbHVlIG9yIGNhdGVnb3J5IGZvciB0aGlzIHRyYWNlXG4vLyAob3Igc2V0IHggKHkpIHRvIGEgY29uc3RhbnQgYXJyYXkgbWF0Y2hpbmcgeSAoeCkpXG5mdW5jdGlvbiBnZXRQb3ModHJhY2UsIHBvc0xldHRlciwgcG9zQXhpcywgbnVtKSB7XG4gICAgdmFyIGhhc1Bvc0FycmF5ID0gcG9zTGV0dGVyIGluIHRyYWNlO1xuICAgIHZhciBoYXNQb3MwID0gcG9zTGV0dGVyICsgJzAnIGluIHRyYWNlO1xuICAgIHZhciBoYXNQb3NTdGVwID0gJ2QnICsgcG9zTGV0dGVyIGluIHRyYWNlO1xuXG4gICAgaWYoaGFzUG9zQXJyYXkgfHwgKGhhc1BvczAgJiYgaGFzUG9zU3RlcCkpIHtcbiAgICAgICAgcmV0dXJuIHBvc0F4aXMubWFrZUNhbGNkYXRhKHRyYWNlLCBwb3NMZXR0ZXIpO1xuICAgIH1cblxuICAgIHZhciBwb3MwO1xuICAgIGlmKGhhc1BvczApIHtcbiAgICAgICAgcG9zMCA9IHRyYWNlW3Bvc0xldHRlciArICcwJ107XG4gICAgfSBlbHNlIGlmKCduYW1lJyBpbiB0cmFjZSAmJiAoXG4gICAgICAgIHBvc0F4aXMudHlwZSA9PT0gJ2NhdGVnb3J5JyB8fCAoXG4gICAgICAgICAgICBpc051bWVyaWModHJhY2UubmFtZSkgJiZcbiAgICAgICAgICAgIFsnbGluZWFyJywgJ2xvZyddLmluZGV4T2YocG9zQXhpcy50eXBlKSAhPT0gLTFcbiAgICAgICAgKSB8fCAoXG4gICAgICAgICAgICBMaWIuaXNEYXRlVGltZSh0cmFjZS5uYW1lKSAmJlxuICAgICAgICAgICAgcG9zQXhpcy50eXBlID09PSAnZGF0ZSdcbiAgICAgICAgKVxuICAgICkpIHtcbiAgICAgICAgcG9zMCA9IHRyYWNlLm5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcG9zMCA9IG51bTtcbiAgICB9XG5cbiAgICB2YXIgcG9zMGMgPSBwb3NBeGlzLnR5cGUgPT09ICdtdWx0aWNhdGVnb3J5JyA/XG4gICAgICAgIHBvc0F4aXMucjJjX2p1c3RfaW5kaWNlcyhwb3MwKSA6XG4gICAgICAgIHBvc0F4aXMuZDJjKHBvczAsIDAsIHRyYWNlW3Bvc0xldHRlciArICdjYWxlbmRhciddKTtcblxuICAgIHZhciBsZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciBvdXQgPSBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIG91dFtpXSA9IHBvczBjO1xuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gbWFrZUJpbnMoeCwgZHgpIHtcbiAgICB2YXIgbGVuID0geC5sZW5ndGg7XG4gICAgdmFyIGJpbnMgPSBuZXcgQXJyYXkobGVuICsgMSk7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgYmluc1tpXSA9IHhbaV0gLSBkeDtcbiAgICB9XG4gICAgYmluc1tsZW5dID0geFtsZW4gLSAxXSArIGR4O1xuXG4gICAgcmV0dXJuIGJpbnM7XG59XG5cbmZ1bmN0aW9uIGluaXROZXN0ZWRBcnJheShsZW4pIHtcbiAgICB2YXIgYXJyID0gbmV3IEFycmF5KGxlbik7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGFycltpXSA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufVxuXG52YXIgVFJBQ0VfVE9fQ0FMQyA9IHtcbiAgICB0ZXh0OiAndHgnLFxuICAgIGhvdmVydGV4dDogJ2h0eCdcbn07XG5cbmZ1bmN0aW9uIGFycmF5c1RvQ2FsY2RhdGEocHQsIHRyYWNlLCBwdE51bWJlcikge1xuICAgIGZvcih2YXIgayBpbiBUUkFDRV9UT19DQUxDKSB7XG4gICAgICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlW2tdKSkge1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShwdE51bWJlcikpIHtcbiAgICAgICAgICAgICAgICBpZihMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh0cmFjZVtrXVtwdE51bWJlclswXV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHB0W1RSQUNFX1RPX0NBTENba11dID0gdHJhY2Vba11bcHROdW1iZXJbMF1dW3B0TnVtYmVyWzFdXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHB0W1RSQUNFX1RPX0NBTENba11dID0gdHJhY2Vba11bcHROdW1iZXJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxjU2VsZWN0aW9uKGNkLCB0cmFjZSkge1xuICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlLnNlbGVjdGVkcG9pbnRzKSkge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwdHMgPSBjZFtpXS5wdHMgfHwgW107XG4gICAgICAgICAgICB2YXIgcHROdW1iZXIyY2RJbmRleCA9IHt9O1xuXG4gICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgcHRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcHROdW1iZXIyY2RJbmRleFtwdHNbal0uaV0gPSBqO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMaWIudGFnU2VsZWN0ZWQocHRzLCB0cmFjZSwgcHROdW1iZXIyY2RJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNvcnRCeVZhbChhLCBiKSB7IHJldHVybiBhLnYgLSBiLnY7IH1cblxuZnVuY3Rpb24gZXh0cmFjdFZhbChvKSB7IHJldHVybiBvLnY7IH1cblxuLy8gbGFzdCBwb2ludCBiZWxvdyAxLjUgKiBJUVJcbmZ1bmN0aW9uIGNvbXB1dGVMb3dlckZlbmNlKGNkaSwgYm94VmFscywgTikge1xuICAgIGlmKE4gPT09IDApIHJldHVybiBjZGkucTE7XG4gICAgcmV0dXJuIE1hdGgubWluKFxuICAgICAgICBjZGkucTEsXG4gICAgICAgIGJveFZhbHNbTWF0aC5taW4oXG4gICAgICAgICAgICBMaWIuZmluZEJpbigyLjUgKiBjZGkucTEgLSAxLjUgKiBjZGkucTMsIGJveFZhbHMsIHRydWUpICsgMSxcbiAgICAgICAgICAgIE4gLSAxXG4gICAgICAgICldXG4gICAgKTtcbn1cblxuLy8gbGFzdCBwb2ludCBhYm92ZSAxLjUgKiBJUVJcbmZ1bmN0aW9uIGNvbXB1dGVVcHBlckZlbmNlKGNkaSwgYm94VmFscywgTikge1xuICAgIGlmKE4gPT09IDApIHJldHVybiBjZGkucTM7XG4gICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICBjZGkucTMsXG4gICAgICAgIGJveFZhbHNbTWF0aC5tYXgoXG4gICAgICAgICAgICBMaWIuZmluZEJpbigyLjUgKiBjZGkucTMgLSAxLjUgKiBjZGkucTEsIGJveFZhbHMpLFxuICAgICAgICAgICAgMFxuICAgICAgICApXVxuICAgICk7XG59XG5cbi8vIDMgSVFSIGJlbG93IChkb24ndCBjbGlwIHRvIG1heC9taW4sXG4vLyB0aGlzIGlzIG9ubHkgZm9yIGRpc2NyaW1pbmF0aW5nIHN1c3BlY3RlZCAmIGZhciBvdXRsaWVycylcbmZ1bmN0aW9uIGNvbXB1dGVMb3dlck91dGxpZXJCb3VuZChjZGkpIHtcbiAgICByZXR1cm4gNCAqIGNkaS5xMSAtIDMgKiBjZGkucTM7XG59XG5cbi8vIDMgSVFSIGFib3ZlIChkb24ndCBjbGlwIHRvIG1heC9taW4sXG4vLyB0aGlzIGlzIG9ubHkgZm9yIGRpc2NyaW1pbmF0aW5nIHN1c3BlY3RlZCAmIGZhciBvdXRsaWVycylcbmZ1bmN0aW9uIGNvbXB1dGVVcHBlck91dGxpZXJCb3VuZChjZGkpIHtcbiAgICByZXR1cm4gNCAqIGNkaS5xMyAtIDMgKiBjZGkucTE7XG59XG5cbi8vIDk1JSBjb25maWRlbmNlIGludGVydmFscyBmb3IgbWVkaWFuXG5mdW5jdGlvbiBjb21wdXRlTm90Y2hTcGFuKGNkaSwgTikge1xuICAgIGlmKE4gPT09IDApIHJldHVybiAwO1xuICAgIHJldHVybiAxLjU3ICogKGNkaS5xMyAtIGNkaS5xMSkgLyBNYXRoLnNxcnQoTik7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgaGFuZGxlR3JvdXBpbmdEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2Jhci9kZWZhdWx0cycpLmhhbmRsZUdyb3VwaW5nRGVmYXVsdHM7XG52YXIgYXV0b1R5cGUgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhpc19hdXRvdHlwZScpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcblxuZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGhhbmRsZVNhbXBsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgaWYodHJhY2VPdXQudmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIHZhciBoYXNQcmVDb21wU3RhdHMgPSB0cmFjZU91dC5faGFzUHJlQ29tcFN0YXRzO1xuXG4gICAgaWYoaGFzUHJlQ29tcFN0YXRzKSB7XG4gICAgICAgIGNvZXJjZSgnbG93ZXJmZW5jZScpO1xuICAgICAgICBjb2VyY2UoJ3VwcGVyZmVuY2UnKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2xpbmUuY29sb3InLCAodHJhY2VJbi5tYXJrZXIgfHwge30pLmNvbG9yIHx8IGRlZmF1bHRDb2xvcik7XG4gICAgY29lcmNlKCdsaW5lLndpZHRoJyk7XG4gICAgY29lcmNlKCdmaWxsY29sb3InLCBDb2xvci5hZGRPcGFjaXR5KHRyYWNlT3V0LmxpbmUuY29sb3IsIDAuNSkpO1xuXG4gICAgdmFyIGJveG1lYW5EZmx0ID0gZmFsc2U7XG4gICAgaWYoaGFzUHJlQ29tcFN0YXRzKSB7XG4gICAgICAgIHZhciBtZWFuID0gY29lcmNlKCdtZWFuJyk7XG4gICAgICAgIHZhciBzZCA9IGNvZXJjZSgnc2QnKTtcbiAgICAgICAgaWYobWVhbiAmJiBtZWFuLmxlbmd0aCkge1xuICAgICAgICAgICAgYm94bWVhbkRmbHQgPSB0cnVlO1xuICAgICAgICAgICAgaWYoc2QgJiYgc2QubGVuZ3RoKSBib3htZWFuRGZsdCA9ICdzZCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29lcmNlKCdib3htZWFuJywgYm94bWVhbkRmbHQpO1xuXG4gICAgY29lcmNlKCd3aGlza2Vyd2lkdGgnKTtcbiAgICBjb2VyY2UoJ3dpZHRoJyk7XG4gICAgY29lcmNlKCdxdWFydGlsZW1ldGhvZCcpO1xuXG4gICAgdmFyIG5vdGNoZWREZmx0ID0gZmFsc2U7XG4gICAgaWYoaGFzUHJlQ29tcFN0YXRzKSB7XG4gICAgICAgIHZhciBub3RjaHNwYW4gPSBjb2VyY2UoJ25vdGNoc3BhbicpO1xuICAgICAgICBpZihub3RjaHNwYW4gJiYgbm90Y2hzcGFuLmxlbmd0aCkge1xuICAgICAgICAgICAgbm90Y2hlZERmbHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKExpYi52YWxpZGF0ZSh0cmFjZUluLm5vdGNod2lkdGgsIGF0dHJpYnV0ZXMubm90Y2h3aWR0aCkpIHtcbiAgICAgICAgbm90Y2hlZERmbHQgPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgbm90Y2hlZCA9IGNvZXJjZSgnbm90Y2hlZCcsIG5vdGNoZWREZmx0KTtcbiAgICBpZihub3RjaGVkKSBjb2VyY2UoJ25vdGNod2lkdGgnKTtcblxuICAgIGhhbmRsZVBvaW50c0RlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdib3gnfSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVNhbXBsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGdldERpbXMoYXJyKSB7XG4gICAgICAgIHZhciBkaW1zID0gMDtcbiAgICAgICAgaWYoYXJyICYmIGFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRpbXMgKz0gMTtcbiAgICAgICAgICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KGFyclswXSkgJiYgYXJyWzBdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRpbXMgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGltcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZChhc3RyKSB7XG4gICAgICAgIHJldHVybiBMaWIudmFsaWRhdGUodHJhY2VJblthc3RyXSwgYXR0cmlidXRlc1thc3RyXSk7XG4gICAgfVxuXG4gICAgdmFyIHkgPSBjb2VyY2UoJ3knKTtcbiAgICB2YXIgeCA9IGNvZXJjZSgneCcpO1xuXG4gICAgdmFyIHNMZW47XG4gICAgaWYodHJhY2VPdXQudHlwZSA9PT0gJ2JveCcpIHtcbiAgICAgICAgdmFyIHExID0gY29lcmNlKCdxMScpO1xuICAgICAgICB2YXIgbWVkaWFuID0gY29lcmNlKCdtZWRpYW4nKTtcbiAgICAgICAgdmFyIHEzID0gY29lcmNlKCdxMycpO1xuXG4gICAgICAgIHRyYWNlT3V0Ll9oYXNQcmVDb21wU3RhdHMgPSAoXG4gICAgICAgICAgICBxMSAmJiBxMS5sZW5ndGggJiZcbiAgICAgICAgICAgIG1lZGlhbiAmJiBtZWRpYW4ubGVuZ3RoICYmXG4gICAgICAgICAgICBxMyAmJiBxMy5sZW5ndGhcbiAgICAgICAgKTtcbiAgICAgICAgc0xlbiA9IE1hdGgubWluKFxuICAgICAgICAgICAgTGliLm1pblJvd0xlbmd0aChxMSksXG4gICAgICAgICAgICBMaWIubWluUm93TGVuZ3RoKG1lZGlhbiksXG4gICAgICAgICAgICBMaWIubWluUm93TGVuZ3RoKHEzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHZhciB5RGltcyA9IGdldERpbXMoeSk7XG4gICAgdmFyIHhEaW1zID0gZ2V0RGltcyh4KTtcbiAgICB2YXIgeUxlbiA9IHlEaW1zICYmIExpYi5taW5Sb3dMZW5ndGgoeSk7XG4gICAgdmFyIHhMZW4gPSB4RGltcyAmJiBMaWIubWluUm93TGVuZ3RoKHgpO1xuXG4gICAgdmFyIGRlZmF1bHRPcmllbnRhdGlvbiwgbGVuO1xuICAgIGlmKHRyYWNlT3V0Ll9oYXNQcmVDb21wU3RhdHMpIHtcbiAgICAgICAgc3dpdGNoKFN0cmluZyh4RGltcykgKyBTdHJpbmcoeURpbXMpKSB7XG4gICAgICAgICAgICAvLyBubyB4IC8gbm8geVxuICAgICAgICAgICAgY2FzZSAnMDAnOlxuICAgICAgICAgICAgICAgIHZhciBzZXRJblggPSB2YWxpZCgneDAnKSB8fCB2YWxpZCgnZHgnKTtcbiAgICAgICAgICAgICAgICB2YXIgc2V0SW5ZID0gdmFsaWQoJ3kwJykgfHwgdmFsaWQoJ2R5Jyk7XG5cbiAgICAgICAgICAgICAgICBpZihzZXRJblkgJiYgIXNldEluWCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0T3JpZW50YXRpb24gPSAnaCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE9yaWVudGF0aW9uID0gJ3YnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxlbiA9IHNMZW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBqdXN0IHhcbiAgICAgICAgICAgIGNhc2UgJzEwJzpcbiAgICAgICAgICAgICAgICBkZWZhdWx0T3JpZW50YXRpb24gPSAndic7XG4gICAgICAgICAgICAgICAgbGVuID0gTWF0aC5taW4oc0xlbiwgeExlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcyMCc6XG4gICAgICAgICAgICAgICAgZGVmYXVsdE9yaWVudGF0aW9uID0gJ2gnO1xuICAgICAgICAgICAgICAgIGxlbiA9IE1hdGgubWluKHNMZW4sIHgubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGp1c3QgeVxuICAgICAgICAgICAgY2FzZSAnMDEnOlxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcmllbnRhdGlvbiA9ICdoJztcbiAgICAgICAgICAgICAgICBsZW4gPSBNYXRoLm1pbihzTGVuLCB5TGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzAyJzpcbiAgICAgICAgICAgICAgICBkZWZhdWx0T3JpZW50YXRpb24gPSAndic7XG4gICAgICAgICAgICAgICAgbGVuID0gTWF0aC5taW4oc0xlbiwgeS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gYm90aFxuICAgICAgICAgICAgY2FzZSAnMTInOlxuICAgICAgICAgICAgICAgIGRlZmF1bHRPcmllbnRhdGlvbiA9ICd2JztcbiAgICAgICAgICAgICAgICBsZW4gPSBNYXRoLm1pbihzTGVuLCB4TGVuLCB5Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcyMSc6XG4gICAgICAgICAgICAgICAgZGVmYXVsdE9yaWVudGF0aW9uID0gJ2gnO1xuICAgICAgICAgICAgICAgIGxlbiA9IE1hdGgubWluKHNMZW4sIHgubGVuZ3RoLCB5TGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzExJzpcbiAgICAgICAgICAgICAgICAvLyB0aGlzIG9uZSBpcyBpbGwtZGVmaW5lZFxuICAgICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcyMic6XG4gICAgICAgICAgICAgICAgdmFyIGhhc0NhdGVnb3JpZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGF1dG9UeXBlKHhbaV0pID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNDYXRlZ29yaWVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaGFzQ2F0ZWdvcmllcykge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0T3JpZW50YXRpb24gPSAndic7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IE1hdGgubWluKHNMZW4sIHhMZW4sIHkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhdXRvVHlwZSh5W2ldKSA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NhdGVnb3JpZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoaGFzQ2F0ZWdvcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE9yaWVudGF0aW9uID0gJ2gnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gTWF0aC5taW4oc0xlbiwgeC5sZW5ndGgsIHlMZW4pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE9yaWVudGF0aW9uID0gJ3YnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gTWF0aC5taW4oc0xlbiwgeExlbiwgeS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKHlEaW1zID4gMCkge1xuICAgICAgICBkZWZhdWx0T3JpZW50YXRpb24gPSAndic7XG4gICAgICAgIGlmKHhEaW1zID4gMCkge1xuICAgICAgICAgICAgbGVuID0gTWF0aC5taW4oeExlbiwgeUxlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZW4gPSBNYXRoLm1pbih5TGVuKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZih4RGltcyA+IDApIHtcbiAgICAgICAgZGVmYXVsdE9yaWVudGF0aW9uID0gJ2gnO1xuICAgICAgICBsZW4gPSBNYXRoLm1pbih4TGVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSAwO1xuICAgIH1cblxuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICB2YXIgb3JpZW50YXRpb24gPSBjb2VyY2UoJ29yaWVudGF0aW9uJywgZGVmYXVsdE9yaWVudGF0aW9uKTtcblxuICAgIC8vIHRoZXNlIGFyZSBqdXN0IHVzZWQgZm9yIHBvc2l0aW9uaW5nLCB0aGV5IG5ldmVyIGRlZmluZSB0aGUgc2FtcGxlXG4gICAgaWYodHJhY2VPdXQuX2hhc1ByZUNvbXBTdGF0cykge1xuICAgICAgICBpZihvcmllbnRhdGlvbiA9PT0gJ3YnICYmIHhEaW1zID09PSAwKSB7XG4gICAgICAgICAgICBjb2VyY2UoJ3gwJywgMCk7XG4gICAgICAgICAgICBjb2VyY2UoJ2R4JywgMSk7XG4gICAgICAgIH0gZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gJ2gnICYmIHlEaW1zID09PSAwKSB7XG4gICAgICAgICAgICBjb2VyY2UoJ3kwJywgMCk7XG4gICAgICAgICAgICBjb2VyY2UoJ2R5JywgMSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZihvcmllbnRhdGlvbiA9PT0gJ3YnICYmIHhEaW1zID09PSAwKSB7XG4gICAgICAgICAgICBjb2VyY2UoJ3gwJyk7XG4gICAgICAgIH0gZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gJ2gnICYmIHlEaW1zID09PSAwKSB7XG4gICAgICAgICAgICBjb2VyY2UoJ3kwJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY2FsZW5kYXJzJywgJ2hhbmRsZVRyYWNlRGVmYXVsdHMnKTtcbiAgICBoYW5kbGVDYWxlbmRhckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBbJ3gnLCAneSddLCBsYXlvdXQpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVQb2ludHNEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBvcHRzKSB7XG4gICAgdmFyIHByZWZpeCA9IG9wdHMucHJlZml4O1xuXG4gICAgdmFyIG91dGxpZXJDb2xvckRmbHQgPSBMaWIuY29lcmNlMih0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgJ21hcmtlci5vdXRsaWVyY29sb3InKTtcbiAgICB2YXIgbGluZW91dGxpZXJjb2xvciA9IGNvZXJjZSgnbWFya2VyLmxpbmUub3V0bGllcmNvbG9yJyk7XG5cbiAgICB2YXIgbW9kZURmbHQgPSAnb3V0bGllcnMnO1xuICAgIGlmKHRyYWNlT3V0Ll9oYXNQcmVDb21wU3RhdHMpIHtcbiAgICAgICAgbW9kZURmbHQgPSAnYWxsJztcbiAgICB9IGVsc2UgaWYob3V0bGllckNvbG9yRGZsdCB8fCBsaW5lb3V0bGllcmNvbG9yKSB7XG4gICAgICAgIG1vZGVEZmx0ID0gJ3N1c3BlY3RlZG91dGxpZXJzJztcbiAgICB9XG5cbiAgICB2YXIgbW9kZSA9IGNvZXJjZShwcmVmaXggKyAncG9pbnRzJywgbW9kZURmbHQpO1xuXG4gICAgaWYobW9kZSkge1xuICAgICAgICBjb2VyY2UoJ2ppdHRlcicsIG1vZGUgPT09ICdhbGwnID8gMC4zIDogMCk7XG4gICAgICAgIGNvZXJjZSgncG9pbnRwb3MnLCBtb2RlID09PSAnYWxsJyA/IC0xLjUgOiAwKTtcblxuICAgICAgICBjb2VyY2UoJ21hcmtlci5zeW1ib2wnKTtcbiAgICAgICAgY29lcmNlKCdtYXJrZXIub3BhY2l0eScpO1xuICAgICAgICBjb2VyY2UoJ21hcmtlci5zaXplJyk7XG4gICAgICAgIGNvZXJjZSgnbWFya2VyLmNvbG9yJywgdHJhY2VPdXQubGluZS5jb2xvcik7XG4gICAgICAgIGNvZXJjZSgnbWFya2VyLmxpbmUuY29sb3InKTtcbiAgICAgICAgY29lcmNlKCdtYXJrZXIubGluZS53aWR0aCcpO1xuXG4gICAgICAgIGlmKG1vZGUgPT09ICdzdXNwZWN0ZWRvdXRsaWVycycpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnbWFya2VyLmxpbmUub3V0bGllcmNvbG9yJywgdHJhY2VPdXQubWFya2VyLmNvbG9yKTtcbiAgICAgICAgICAgIGNvZXJjZSgnbWFya2VyLmxpbmUub3V0bGllcndpZHRoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb2VyY2UoJ3NlbGVjdGVkLm1hcmtlci5jb2xvcicpO1xuICAgICAgICBjb2VyY2UoJ3Vuc2VsZWN0ZWQubWFya2VyLmNvbG9yJyk7XG4gICAgICAgIGNvZXJjZSgnc2VsZWN0ZWQubWFya2VyLnNpemUnKTtcbiAgICAgICAgY29lcmNlKCd1bnNlbGVjdGVkLm1hcmtlci5zaXplJyk7XG5cbiAgICAgICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRyYWNlT3V0Lm1hcmtlcjtcbiAgICB9XG5cbiAgICB2YXIgaG92ZXJvbiA9IGNvZXJjZSgnaG92ZXJvbicpO1xuICAgIGlmKGhvdmVyb24gPT09ICdhbGwnIHx8IGhvdmVyb24uaW5kZXhPZigncG9pbnRzJykgIT09IC0xKSB7XG4gICAgICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuICAgIH1cblxuICAgIExpYi5jb2VyY2VTZWxlY3Rpb25NYXJrZXJPcGFjaXR5KHRyYWNlT3V0LCBjb2VyY2UpO1xufVxuXG5mdW5jdGlvbiBjcm9zc1RyYWNlRGVmYXVsdHMoZnVsbERhdGEsIGZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgdHJhY2VJbiwgdHJhY2VPdXQ7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0cikge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZU91dC5faW5wdXQsIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyKTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJhY2VPdXQgPSBmdWxsRGF0YVtpXTtcbiAgICAgICAgdmFyIHRyYWNlVHlwZSA9IHRyYWNlT3V0LnR5cGU7XG5cbiAgICAgICAgaWYodHJhY2VUeXBlID09PSAnYm94JyB8fCB0cmFjZVR5cGUgPT09ICd2aW9saW4nKSB7XG4gICAgICAgICAgICB0cmFjZUluID0gdHJhY2VPdXQuX2lucHV0O1xuICAgICAgICAgICAgaWYoZnVsbExheW91dFt0cmFjZVR5cGUgKyAnbW9kZSddID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlR3JvdXBpbmdEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZnVsbExheW91dCwgY29lcmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3VwcGx5RGVmYXVsdHM6IHN1cHBseURlZmF1bHRzLFxuICAgIGNyb3NzVHJhY2VEZWZhdWx0czogY3Jvc3NUcmFjZURlZmF1bHRzLFxuXG4gICAgaGFuZGxlU2FtcGxlRGVmYXVsdHM6IGhhbmRsZVNhbXBsZURlZmF1bHRzLFxuICAgIGhhbmRsZVBvaW50c0RlZmF1bHRzOiBoYW5kbGVQb2ludHNEZWZhdWx0c1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEZ4ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meCcpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIGZpbGxUZXh0ID0gTGliLmZpbGxUZXh0O1xuXG5mdW5jdGlvbiBob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSkge1xuICAgIHZhciBjZCA9IHBvaW50RGF0YS5jZDtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgaG92ZXJvbiA9IHRyYWNlLmhvdmVyb247XG4gICAgdmFyIGNsb3NlQm94RGF0YSA9IFtdO1xuICAgIHZhciBjbG9zZVB0RGF0YTtcblxuICAgIGlmKGhvdmVyb24uaW5kZXhPZignYm94ZXMnKSAhPT0gLTEpIHtcbiAgICAgICAgY2xvc2VCb3hEYXRhID0gY2xvc2VCb3hEYXRhLmNvbmNhdChob3Zlck9uQm94ZXMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpKTtcbiAgICB9XG5cbiAgICBpZihob3Zlcm9uLmluZGV4T2YoJ3BvaW50cycpICE9PSAtMSkge1xuICAgICAgICBjbG9zZVB0RGF0YSA9IGhvdmVyT25Qb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcG9pbnQgaW4gcmFuZ2UgYW5kIGhvdmVyb24gaGFzIHBvaW50cywgc2hvdyB0aGUgYmVzdCBzaW5nbGUgcG9pbnQgb25seS5cbiAgICAvLyBJZiBob3Zlcm9uIGhhcyBib3hlcyBhbmQgdGhlcmUncyBubyBwb2ludCBpbiByYW5nZSAob3IgaG92ZXJvbiBkb2Vzbid0IGhhdmUgcG9pbnRzKSwgc2hvdyB0aGUgYm94IHN0YXRzLlxuICAgIGlmKGhvdmVybW9kZSA9PT0gJ2Nsb3Nlc3QnKSB7XG4gICAgICAgIGlmKGNsb3NlUHREYXRhKSByZXR1cm4gW2Nsb3NlUHREYXRhXTtcbiAgICAgICAgcmV0dXJuIGNsb3NlQm94RGF0YTtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UgaW4gY29tcGFyZSBtb2RlLCBhbGxvdyBhIHBvaW50IEFORCB0aGUgYm94IHN0YXRzIHRvIGJlIGxhYmVsZWRcbiAgICAvLyBJZiB0aGVyZSBhcmUgbXVsdGlwbGUgYm94ZXMgaW4gcmFuZ2UgKGllIGJveG1vZGUgPSAnb3ZlcmxheScpIHdlJ2xsIHNlZSBzdGF0cyBmb3IgYWxsIG9mIHRoZW0uXG4gICAgaWYoY2xvc2VQdERhdGEpIHtcbiAgICAgICAgY2xvc2VCb3hEYXRhLnB1c2goY2xvc2VQdERhdGEpO1xuICAgICAgICByZXR1cm4gY2xvc2VCb3hEYXRhO1xuICAgIH1cbiAgICByZXR1cm4gY2xvc2VCb3hEYXRhO1xufVxuXG5mdW5jdGlvbiBob3Zlck9uQm94ZXMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpIHtcbiAgICB2YXIgY2QgPSBwb2ludERhdGEuY2Q7XG4gICAgdmFyIHhhID0gcG9pbnREYXRhLnhhO1xuICAgIHZhciB5YSA9IHBvaW50RGF0YS55YTtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgdCA9IGNkWzBdLnQ7XG4gICAgdmFyIGlzVmlvbGluID0gdHJhY2UudHlwZSA9PT0gJ3Zpb2xpbic7XG4gICAgdmFyIGNsb3NlQm94RGF0YSA9IFtdO1xuXG4gICAgdmFyIHBMZXR0ZXIsIHZMZXR0ZXIsIHBBeGlzLCB2QXhpcywgdlZhbCwgcFZhbCwgZHgsIGR5LCBkUG9zLFxuICAgICAgICBob3ZlclBzZXVkb0Rpc3RhbmNlLCBzcGlrZVBzZXVkb0Rpc3RhbmNlO1xuXG4gICAgdmFyIGJveERlbHRhID0gdC5iZFBvcztcbiAgICB2YXIgYm94RGVsdGFQb3MsIGJveERlbHRhTmVnO1xuICAgIHZhciBwb3NBY2NlcHRhbmNlID0gdC53SG92ZXI7XG4gICAgdmFyIHNoaWZ0UG9zID0gZnVuY3Rpb24oZGkpIHsgcmV0dXJuIHBBeGlzLmMybChkaS5wb3MpICsgdC5iUG9zIC0gcEF4aXMuYzJsKHBWYWwpOyB9O1xuXG4gICAgaWYoaXNWaW9saW4gJiYgdHJhY2Uuc2lkZSAhPT0gJ2JvdGgnKSB7XG4gICAgICAgIGlmKHRyYWNlLnNpZGUgPT09ICdwb3NpdGl2ZScpIHtcbiAgICAgICAgICAgIGRQb3MgPSBmdW5jdGlvbihkaSkge1xuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBzaGlmdFBvcyhkaSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEZ4LmluYm94KHBvcywgcG9zICsgcG9zQWNjZXB0YW5jZSwgaG92ZXJQc2V1ZG9EaXN0YW5jZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYm94RGVsdGFQb3MgPSBib3hEZWx0YTtcbiAgICAgICAgICAgIGJveERlbHRhTmVnID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZih0cmFjZS5zaWRlID09PSAnbmVnYXRpdmUnKSB7XG4gICAgICAgICAgICBkUG9zID0gZnVuY3Rpb24oZGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gc2hpZnRQb3MoZGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBGeC5pbmJveChwb3MgLSBwb3NBY2NlcHRhbmNlLCBwb3MsIGhvdmVyUHNldWRvRGlzdGFuY2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJveERlbHRhUG9zID0gMDtcbiAgICAgICAgICAgIGJveERlbHRhTmVnID0gYm94RGVsdGE7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBkUG9zID0gZnVuY3Rpb24oZGkpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSBzaGlmdFBvcyhkaSk7XG4gICAgICAgICAgICByZXR1cm4gRnguaW5ib3gocG9zIC0gcG9zQWNjZXB0YW5jZSwgcG9zICsgcG9zQWNjZXB0YW5jZSwgaG92ZXJQc2V1ZG9EaXN0YW5jZSk7XG4gICAgICAgIH07XG4gICAgICAgIGJveERlbHRhUG9zID0gYm94RGVsdGFOZWcgPSBib3hEZWx0YTtcbiAgICB9XG5cbiAgICB2YXIgZFZhbDtcblxuICAgIGlmKGlzVmlvbGluKSB7XG4gICAgICAgIGRWYWwgPSBmdW5jdGlvbihkaSkge1xuICAgICAgICAgICAgcmV0dXJuIEZ4LmluYm94KGRpLnNwYW5bMF0gLSB2VmFsLCBkaS5zcGFuWzFdIC0gdlZhbCwgaG92ZXJQc2V1ZG9EaXN0YW5jZSk7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZFZhbCA9IGZ1bmN0aW9uKGRpKSB7XG4gICAgICAgICAgICByZXR1cm4gRnguaW5ib3goZGkubWluIC0gdlZhbCwgZGkubWF4IC0gdlZhbCwgaG92ZXJQc2V1ZG9EaXN0YW5jZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICB2VmFsID0geHZhbDtcbiAgICAgICAgcFZhbCA9IHl2YWw7XG4gICAgICAgIGR4ID0gZFZhbDtcbiAgICAgICAgZHkgPSBkUG9zO1xuICAgICAgICBwTGV0dGVyID0gJ3knO1xuICAgICAgICBwQXhpcyA9IHlhO1xuICAgICAgICB2TGV0dGVyID0gJ3gnO1xuICAgICAgICB2QXhpcyA9IHhhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZWYWwgPSB5dmFsO1xuICAgICAgICBwVmFsID0geHZhbDtcbiAgICAgICAgZHggPSBkUG9zO1xuICAgICAgICBkeSA9IGRWYWw7XG4gICAgICAgIHBMZXR0ZXIgPSAneCc7XG4gICAgICAgIHBBeGlzID0geGE7XG4gICAgICAgIHZMZXR0ZXIgPSAneSc7XG4gICAgICAgIHZBeGlzID0geWE7XG4gICAgfVxuXG4gICAgLy8gaWYgdHdvIGJveGVzIGFyZSBvdmVybGF5aW5nLCBsZXQgdGhlIG5hcnJvd2VzdCBvbmUgd2luXG4gICAgdmFyIHBzZXVkb0Rpc3RhbmNlID0gTWF0aC5taW4oMSwgYm94RGVsdGEgLyBNYXRoLmFicyhwQXhpcy5yMmMocEF4aXMucmFuZ2VbMV0pIC0gcEF4aXMucjJjKHBBeGlzLnJhbmdlWzBdKSkpO1xuICAgIGhvdmVyUHNldWRvRGlzdGFuY2UgPSBwb2ludERhdGEubWF4SG92ZXJEaXN0YW5jZSAtIHBzZXVkb0Rpc3RhbmNlO1xuICAgIHNwaWtlUHNldWRvRGlzdGFuY2UgPSBwb2ludERhdGEubWF4U3Bpa2VEaXN0YW5jZSAtIHBzZXVkb0Rpc3RhbmNlO1xuXG4gICAgZnVuY3Rpb24gZHh5KGRpKSB7IHJldHVybiAoZHgoZGkpICsgZHkoZGkpKSAvIDI7IH1cbiAgICB2YXIgZGlzdGZuID0gRnguZ2V0RGlzdGFuY2VGdW5jdGlvbihob3Zlcm1vZGUsIGR4LCBkeSwgZHh5KTtcbiAgICBGeC5nZXRDbG9zZXN0KGNkLCBkaXN0Zm4sIHBvaW50RGF0YSk7XG5cbiAgICAvLyBza2lwIHRoZSByZXN0IChmb3IgdGhpcyB0cmFjZSkgaWYgd2UgZGlkbid0IGZpbmQgYSBjbG9zZSBwb2ludFxuICAgIC8vIGFuZCBjcmVhdGUgdGhlIGl0ZW0ocykgaW4gY2xvc2VkYXRhIGZvciB0aGlzIHBvaW50XG4gICAgaWYocG9pbnREYXRhLmluZGV4ID09PSBmYWxzZSkgcmV0dXJuIFtdO1xuXG4gICAgdmFyIGRpID0gY2RbcG9pbnREYXRhLmluZGV4XTtcbiAgICB2YXIgbGMgPSB0cmFjZS5saW5lLmNvbG9yO1xuICAgIHZhciBtYyA9ICh0cmFjZS5tYXJrZXIgfHwge30pLmNvbG9yO1xuXG4gICAgaWYoQ29sb3Iub3BhY2l0eShsYykgJiYgdHJhY2UubGluZS53aWR0aCkgcG9pbnREYXRhLmNvbG9yID0gbGM7XG4gICAgZWxzZSBpZihDb2xvci5vcGFjaXR5KG1jKSAmJiB0cmFjZS5ib3hwb2ludHMpIHBvaW50RGF0YS5jb2xvciA9IG1jO1xuICAgIGVsc2UgcG9pbnREYXRhLmNvbG9yID0gdHJhY2UuZmlsbGNvbG9yO1xuXG4gICAgcG9pbnREYXRhW3BMZXR0ZXIgKyAnMCddID0gcEF4aXMuYzJwKGRpLnBvcyArIHQuYlBvcyAtIGJveERlbHRhTmVnLCB0cnVlKTtcbiAgICBwb2ludERhdGFbcExldHRlciArICcxJ10gPSBwQXhpcy5jMnAoZGkucG9zICsgdC5iUG9zICsgYm94RGVsdGFQb3MsIHRydWUpO1xuXG4gICAgcG9pbnREYXRhW3BMZXR0ZXIgKyAnTGFiZWxWYWwnXSA9IGRpLnBvcztcblxuICAgIHZhciBzcGlrZVBvc0F0dHIgPSBwTGV0dGVyICsgJ1NwaWtlJztcbiAgICBwb2ludERhdGEuc3Bpa2VEaXN0YW5jZSA9IGR4eShkaSkgKiBzcGlrZVBzZXVkb0Rpc3RhbmNlIC8gaG92ZXJQc2V1ZG9EaXN0YW5jZTtcbiAgICBwb2ludERhdGFbc3Bpa2VQb3NBdHRyXSA9IHBBeGlzLmMycChkaS5wb3MsIHRydWUpO1xuXG4gICAgLy8gYm94IHBsb3RzOiBlYWNoIFwicG9pbnRcIiBnZXRzIG1hbnkgbGFiZWxzXG4gICAgdmFyIHVzZWRWYWxzID0ge307XG4gICAgdmFyIGF0dHJzID0gWydtZWQnLCAncTEnLCAncTMnLCAnbWluJywgJ21heCddO1xuXG4gICAgaWYodHJhY2UuYm94bWVhbiB8fCAodHJhY2UubWVhbmxpbmUgfHwge30pLnZpc2libGUpIHtcbiAgICAgICAgYXR0cnMucHVzaCgnbWVhbicpO1xuICAgIH1cbiAgICBpZih0cmFjZS5ib3hwb2ludHMgfHwgdHJhY2UucG9pbnRzKSB7XG4gICAgICAgIGF0dHJzLnB1c2goJ2xmJywgJ3VmJyk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdHRyID0gYXR0cnNbaV07XG5cbiAgICAgICAgaWYoIShhdHRyIGluIGRpKSB8fCAoZGlbYXR0cl0gaW4gdXNlZFZhbHMpKSBjb250aW51ZTtcbiAgICAgICAgdXNlZFZhbHNbZGlbYXR0cl1dID0gdHJ1ZTtcblxuICAgICAgICAvLyBjb3B5IG91dCB0byBhIG5ldyBvYmplY3QgZm9yIGVhY2ggdmFsdWUgdG8gbGFiZWxcbiAgICAgICAgdmFyIHZhbCA9IGRpW2F0dHJdO1xuICAgICAgICB2YXIgdmFsUHggPSB2QXhpcy5jMnAodmFsLCB0cnVlKTtcbiAgICAgICAgdmFyIHBvaW50RGF0YTIgPSBMaWIuZXh0ZW5kRmxhdCh7fSwgcG9pbnREYXRhKTtcblxuICAgICAgICBwb2ludERhdGEyLmF0dHIgPSBhdHRyO1xuICAgICAgICBwb2ludERhdGEyW3ZMZXR0ZXIgKyAnMCddID0gcG9pbnREYXRhMlt2TGV0dGVyICsgJzEnXSA9IHZhbFB4O1xuICAgICAgICBwb2ludERhdGEyW3ZMZXR0ZXIgKyAnTGFiZWxWYWwnXSA9IHZhbDtcbiAgICAgICAgcG9pbnREYXRhMlt2TGV0dGVyICsgJ0xhYmVsJ10gPSAodC5sYWJlbHMgPyB0LmxhYmVsc1thdHRyXSArICcgJyA6ICcnKSArIEF4ZXMuaG92ZXJMYWJlbFRleHQodkF4aXMsIHZhbCk7XG5cbiAgICAgICAgLy8gTm90ZTogaW50cm9kdWNlZCB0byBiZSBhYmxlIHRvIGRpc3Rpbmd1aXNoIGFcbiAgICAgICAgLy8gY2xpY2tlZCBwb2ludCBmcm9tIGEgYm94IGR1cmluZyBjbGljay10by1zZWxlY3RcbiAgICAgICAgcG9pbnREYXRhMi5ob3Zlck9uQm94ID0gdHJ1ZTtcblxuICAgICAgICBpZihhdHRyID09PSAnbWVhbicgJiYgKCdzZCcgaW4gZGkpICYmIHRyYWNlLmJveG1lYW4gPT09ICdzZCcpIHtcbiAgICAgICAgICAgIHBvaW50RGF0YTJbdkxldHRlciArICdlcnInXSA9IGRpLnNkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb25seSBrZWVwIG5hbWUgYW5kIHNwaWtlcyBvbiB0aGUgZmlyc3QgaXRlbSAobWVkaWFuKVxuICAgICAgICBwb2ludERhdGEubmFtZSA9ICcnO1xuICAgICAgICBwb2ludERhdGEuc3Bpa2VEaXN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcG9pbnREYXRhW3NwaWtlUG9zQXR0cl0gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gbm8gaG92ZXJ0ZW1wbGF0ZSBzdXBwb3J0IHlldFxuICAgICAgICBwb2ludERhdGEyLmhvdmVydGVtcGxhdGUgPSBmYWxzZTtcblxuICAgICAgICBjbG9zZUJveERhdGEucHVzaChwb2ludERhdGEyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvc2VCb3hEYXRhO1xufVxuXG5mdW5jdGlvbiBob3Zlck9uUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCkge1xuICAgIHZhciBjZCA9IHBvaW50RGF0YS5jZDtcbiAgICB2YXIgeGEgPSBwb2ludERhdGEueGE7XG4gICAgdmFyIHlhID0gcG9pbnREYXRhLnlhO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciB4UHggPSB4YS5jMnAoeHZhbCk7XG4gICAgdmFyIHlQeCA9IHlhLmMycCh5dmFsKTtcbiAgICB2YXIgY2xvc2VQdERhdGE7XG5cbiAgICB2YXIgZHggPSBmdW5jdGlvbihkaSkge1xuICAgICAgICB2YXIgcmFkID0gTWF0aC5tYXgoMywgZGkubXJjIHx8IDApO1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5hYnMoeGEuYzJwKGRpLngpIC0geFB4KSAtIHJhZCwgMSAtIDMgLyByYWQpO1xuICAgIH07XG4gICAgdmFyIGR5ID0gZnVuY3Rpb24oZGkpIHtcbiAgICAgICAgdmFyIHJhZCA9IE1hdGgubWF4KDMsIGRpLm1yYyB8fCAwKTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGguYWJzKHlhLmMycChkaS55KSAtIHlQeCkgLSByYWQsIDEgLSAzIC8gcmFkKTtcbiAgICB9O1xuICAgIHZhciBkaXN0Zm4gPSBGeC5xdWFkcmF0dXJlKGR4LCBkeSk7XG5cbiAgICAvLyBzaG93IG9uZSBwb2ludCBwZXIgdHJhY2VcbiAgICB2YXIgaWpDbG9zZXN0ID0gZmFsc2U7XG4gICAgdmFyIGRpLCBwdDtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBkaSA9IGNkW2ldO1xuXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCAoZGkucHRzIHx8IFtdKS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcHQgPSBkaS5wdHNbal07XG5cbiAgICAgICAgICAgIHZhciBuZXdEaXN0YW5jZSA9IGRpc3RmbihwdCk7XG4gICAgICAgICAgICBpZihuZXdEaXN0YW5jZSA8PSBwb2ludERhdGEuZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBwb2ludERhdGEuZGlzdGFuY2UgPSBuZXdEaXN0YW5jZTtcbiAgICAgICAgICAgICAgICBpakNsb3Nlc3QgPSBbaSwgal07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZighaWpDbG9zZXN0KSByZXR1cm4gZmFsc2U7XG5cbiAgICBkaSA9IGNkW2lqQ2xvc2VzdFswXV07XG4gICAgcHQgPSBkaS5wdHNbaWpDbG9zZXN0WzFdXTtcblxuICAgIHZhciB4YyA9IHhhLmMycChwdC54LCB0cnVlKTtcbiAgICB2YXIgeWMgPSB5YS5jMnAocHQueSwgdHJ1ZSk7XG4gICAgdmFyIHJhZCA9IHB0Lm1yYyB8fCAxO1xuXG4gICAgY2xvc2VQdERhdGEgPSBMaWIuZXh0ZW5kRmxhdCh7fSwgcG9pbnREYXRhLCB7XG4gICAgICAgIC8vIGNvcnJlc3BvbmRzIHRvIGluZGV4IGluIHgveSBpbnB1dCBkYXRhIGFycmF5XG4gICAgICAgIGluZGV4OiBwdC5pLFxuICAgICAgICBjb2xvcjogKHRyYWNlLm1hcmtlciB8fCB7fSkuY29sb3IsXG4gICAgICAgIG5hbWU6IHRyYWNlLm5hbWUsXG4gICAgICAgIHgwOiB4YyAtIHJhZCxcbiAgICAgICAgeDE6IHhjICsgcmFkLFxuICAgICAgICB5MDogeWMgLSByYWQsXG4gICAgICAgIHkxOiB5YyArIHJhZCxcbiAgICAgICAgc3Bpa2VEaXN0YW5jZTogcG9pbnREYXRhLmRpc3RhbmNlLFxuICAgICAgICBob3ZlcnRlbXBsYXRlOiB0cmFjZS5ob3ZlcnRlbXBsYXRlXG4gICAgfSk7XG5cbiAgICB2YXIgcGE7XG4gICAgaWYodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICBwYSA9IHlhO1xuICAgICAgICBjbG9zZVB0RGF0YS54TGFiZWxWYWwgPSBwdC54O1xuICAgICAgICBjbG9zZVB0RGF0YS55TGFiZWxWYWwgPSBkaS5wb3M7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGEgPSB4YTtcbiAgICAgICAgY2xvc2VQdERhdGEueExhYmVsVmFsID0gZGkucG9zO1xuICAgICAgICBjbG9zZVB0RGF0YS55TGFiZWxWYWwgPSBwdC55O1xuICAgIH1cblxuICAgIHZhciBwTGV0dGVyID0gcGEuX2lkLmNoYXJBdCgwKTtcbiAgICBjbG9zZVB0RGF0YVtwTGV0dGVyICsgJ1NwaWtlJ10gPSBwYS5jMnAoZGkucG9zLCB0cnVlKTtcblxuICAgIGZpbGxUZXh0KHB0LCB0cmFjZSwgY2xvc2VQdERhdGEpO1xuXG4gICAgcmV0dXJuIGNsb3NlUHREYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBob3ZlclBvaW50czogaG92ZXJQb2ludHMsXG4gICAgaG92ZXJPbkJveGVzOiBob3Zlck9uQm94ZXMsXG4gICAgaG92ZXJPblBvaW50czogaG92ZXJPblBvaW50c1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWxlY3RQb2ludHMoc2VhcmNoSW5mbywgc2VsZWN0aW9uVGVzdGVyKSB7XG4gICAgdmFyIGNkID0gc2VhcmNoSW5mby5jZDtcbiAgICB2YXIgeGEgPSBzZWFyY2hJbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHNlYXJjaEluZm8ueWF4aXM7XG4gICAgdmFyIHNlbGVjdGlvbiA9IFtdO1xuICAgIHZhciBpLCBqO1xuXG4gICAgaWYoc2VsZWN0aW9uVGVzdGVyID09PSBmYWxzZSkge1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgKGNkW2ldLnB0cyB8fCBbXSkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICBjZFtpXS5wdHNbal0uc2VsZWN0ZWQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IChjZFtpXS5wdHMgfHwgW10pLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHB0ID0gY2RbaV0ucHRzW2pdO1xuICAgICAgICAgICAgICAgIHZhciB4ID0geGEuYzJwKHB0LngpO1xuICAgICAgICAgICAgICAgIHZhciB5ID0geWEuYzJwKHB0LnkpO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0aW9uVGVzdGVyLmNvbnRhaW5zKFt4LCB5XSwgbnVsbCwgcHQuaSwgc2VhcmNoSW5mbykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnROdW1iZXI6IHB0LmksXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4YS5jMmQocHQueCksXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5YS5jMmQocHQueSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHB0LnNlbGVjdGVkID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwdC5zZWxlY3RlZCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9