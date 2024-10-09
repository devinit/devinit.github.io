(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_histogram_calc_js"],{

/***/ "./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js ***!
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

// arrayOk attributes, merge them into calcdata array
module.exports = function arraysToCalcdata(cd, trace) {
    for(var i = 0; i < cd.length; i++) cd[i].i = i;

    Lib.mergeArray(trace.text, cd, 'tx');
    Lib.mergeArray(trace.hovertext, cd, 'htx');

    var marker = trace.marker;
    if(marker) {
        Lib.mergeArray(marker.opacity, cd, 'mo', true);
        Lib.mergeArray(marker.color, cd, 'mc');

        var markerLine = marker.line;
        if(markerLine) {
            Lib.mergeArray(markerLine.color, cd, 'mlc');
            Lib.mergeArrayCastPositive(markerLine.width, cd, 'mlw');
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/average.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/average.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/





module.exports = function doAvg(size, counts) {
    var nMax = size.length;
    var total = 0;
    for(var i = 0; i < nMax; i++) {
        if(counts[i]) {
            size[i] /= counts[i];
            total += size[i];
        } else size[i] = null;
    }
    return total;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/bin_functions.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/bin_functions.js ***!
  \**********************************************************************/
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


module.exports = {
    count: function(n, i, size) {
        size[n]++;
        return 1;
    },

    sum: function(n, i, size, counterData) {
        var v = counterData[i];
        if(isNumeric(v)) {
            v = Number(v);
            size[n] += v;
            return v;
        }
        return 0;
    },

    avg: function(n, i, size, counterData, counts) {
        var v = counterData[i];
        if(isNumeric(v)) {
            v = Number(v);
            size[n] += v;
            counts[n]++;
        }
        return 0;
    },

    min: function(n, i, size, counterData) {
        var v = counterData[i];
        if(isNumeric(v)) {
            v = Number(v);
            if(!isNumeric(size[n])) {
                size[n] = v;
                return v;
            } else if(size[n] > v) {
                var delta = v - size[n];
                size[n] = v;
                return delta;
            }
        }
        return 0;
    },

    max: function(n, i, size, counterData) {
        var v = counterData[i];
        if(isNumeric(v)) {
            v = Number(v);
            if(!isNumeric(size[n])) {
                size[n] = v;
                return v;
            } else if(size[n] < v) {
                var delta = v - size[n];
                size[n] = v;
                return delta;
            }
        }
        return 0;
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/bin_label_vals.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/bin_label_vals.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var numConstants = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js");
var oneYear = numConstants.ONEAVGYEAR;
var oneMonth = numConstants.ONEAVGMONTH;
var oneDay = numConstants.ONEDAY;
var oneHour = numConstants.ONEHOUR;
var oneMin = numConstants.ONEMIN;
var oneSec = numConstants.ONESEC;
var tickIncrement = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js").tickIncrement;


/*
 * make a function that will find rounded bin edges
 * @param {number} leftGap: how far from the left edge of any bin is the closest data value?
 * @param {number} rightGap: how far from the right edge of any bin is the closest data value?
 * @param {Array[number]} binEdges: the actual edge values used in binning
 * @param {object} pa: the position axis
 * @param {string} calendar: the data calendar
 *
 * @return {function(v, isRightEdge)}:
 *   find the start (isRightEdge is falsy) or end (truthy) label value for a bin edge `v`
 */
module.exports = function getBinSpanLabelRound(leftGap, rightGap, binEdges, pa, calendar) {
    // the rounding digit is the largest digit that changes in *all* of 4 regions:
    // - inside the rightGap before binEdges[0] (shifted 10% to the left)
    // - inside the leftGap after binEdges[0] (expanded by 10% of rightGap on each end)
    // - same for binEdges[1]
    var dv0 = -1.1 * rightGap;
    var dv1 = -0.1 * rightGap;
    var dv2 = leftGap - dv1;
    var edge0 = binEdges[0];
    var edge1 = binEdges[1];
    var leftDigit = Math.min(
        biggestDigitChanged(edge0 + dv1, edge0 + dv2, pa, calendar),
        biggestDigitChanged(edge1 + dv1, edge1 + dv2, pa, calendar)
    );
    var rightDigit = Math.min(
        biggestDigitChanged(edge0 + dv0, edge0 + dv1, pa, calendar),
        biggestDigitChanged(edge1 + dv0, edge1 + dv1, pa, calendar)
    );

    // normally we try to make the label for the right edge different from
    // the left edge label, so it's unambiguous which bin gets data on the edge.
    // but if this results in more than 3 extra digits (or for dates, more than
    // 2 fields ie hr&min or min&sec, which is 3600x), it'll be more clutter than
    // useful so keep the label cleaner instead
    var digit, disambiguateEdges;
    if(leftDigit > rightDigit && rightDigit < Math.abs(edge1 - edge0) / 4000) {
        digit = leftDigit;
        disambiguateEdges = false;
    } else {
        digit = Math.min(leftDigit, rightDigit);
        disambiguateEdges = true;
    }

    if(pa.type === 'date' && digit > oneDay) {
        var dashExclude = (digit === oneYear) ? 1 : 6;
        var increment = (digit === oneYear) ? 'M12' : 'M1';

        return function(v, isRightEdge) {
            var dateStr = pa.c2d(v, oneYear, calendar);
            var dashPos = dateStr.indexOf('-', dashExclude);
            if(dashPos > 0) dateStr = dateStr.substr(0, dashPos);
            var roundedV = pa.d2c(dateStr, 0, calendar);

            if(roundedV < v) {
                var nextV = tickIncrement(roundedV, increment, false, calendar);
                if((roundedV + nextV) / 2 < v + leftGap) roundedV = nextV;
            }

            if(isRightEdge && disambiguateEdges) {
                return tickIncrement(roundedV, increment, true, calendar);
            }

            return roundedV;
        };
    }

    return function(v, isRightEdge) {
        var roundedV = digit * Math.round(v / digit);
        // if we rounded down and we could round up and still be < leftGap
        // (or what leftGap values round to), do that
        if(roundedV + (digit / 10) < v && roundedV + (digit * 0.9) < v + leftGap) {
            roundedV += digit;
        }
        // finally for the right edge back off one digit - but only if we can do that
        // and not clip off any data that's potentially in the bin
        if(isRightEdge && disambiguateEdges) {
            roundedV -= digit;
        }
        return roundedV;
    };
};

/*
 * Find the largest digit that changes within a (calcdata) region [v1, v2]
 * if dates, "digit" means date/time part when it's bigger than a second
 * returns the unit value to round to this digit, eg 0.01 to round to hundredths, or
 * 100 to round to hundreds. returns oneMonth or oneYear for month or year rounding,
 * so that Math.min will work, rather than 'M1' and 'M12'
 */
function biggestDigitChanged(v1, v2, pa, calendar) {
    // are we crossing zero? can't say anything.
    // in principle this doesn't apply to dates but turns out this doesn't matter.
    if(v1 * v2 <= 0) return Infinity;

    var dv = Math.abs(v2 - v1);
    var isDate = pa.type === 'date';
    var digit = biggestGuaranteedDigitChanged(dv, isDate);
    // see if a larger digit also changed
    for(var i = 0; i < 10; i++) {
        // numbers: next digit needs to be >10x but <100x then gets rounded down.
        // dates: next digit can be as much as 60x (then rounded down)
        var nextDigit = biggestGuaranteedDigitChanged(digit * 80, isDate);
        // if we get to years, the chain stops
        if(digit === nextDigit) break;
        if(didDigitChange(nextDigit, v1, v2, isDate, pa, calendar)) digit = nextDigit;
        else break;
    }
    return digit;
}

/*
 * Find the largest digit that *definitely* changes in a region [v, v + dv] for any v
 * for nonuniform date regions (months/years) pick the largest
 */
function biggestGuaranteedDigitChanged(dv, isDate) {
    if(isDate && dv > oneSec) {
        // this is supposed to be the biggest *guaranteed* change
        // so compare to the longest month and year across any calendar,
        // and we'll iterate back up later
        // note: does not support rounding larger than one year. We could add
        // that if anyone wants it, but seems unusual and not strictly necessary.
        if(dv > oneDay) {
            if(dv > oneYear * 1.1) return oneYear;
            if(dv > oneMonth * 1.1) return oneMonth;
            return oneDay;
        }

        if(dv > oneHour) return oneHour;
        if(dv > oneMin) return oneMin;
        return oneSec;
    }
    return Math.pow(10, Math.floor(Math.log(dv) / Math.LN10));
}

function didDigitChange(digit, v1, v2, isDate, pa, calendar) {
    if(isDate && digit > oneDay) {
        var dateParts1 = dateParts(v1, pa, calendar);
        var dateParts2 = dateParts(v2, pa, calendar);
        var parti = (digit === oneYear) ? 0 : 1;
        return dateParts1[parti] !== dateParts2[parti];
    }
    return Math.floor(v2 / digit) - Math.floor(v1 / digit) > 0.1;
}

function dateParts(v, pa, calendar) {
    var parts = pa.c2d(v, oneYear, calendar).split('-');
    if(parts[0] === '') {
        parts.unshift();
        parts[0] = '-' + parts[0];
    }
    return parts;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/calc.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/calc.js ***!
  \*************************************************************/
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
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

var arraysToCalcdata = __webpack_require__(/*! ../bar/arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js");
var binFunctions = __webpack_require__(/*! ./bin_functions */ "./node_modules/plotly.js/src/traces/histogram/bin_functions.js");
var normFunctions = __webpack_require__(/*! ./norm_functions */ "./node_modules/plotly.js/src/traces/histogram/norm_functions.js");
var doAvg = __webpack_require__(/*! ./average */ "./node_modules/plotly.js/src/traces/histogram/average.js");
var getBinSpanLabelRound = __webpack_require__(/*! ./bin_label_vals */ "./node_modules/plotly.js/src/traces/histogram/bin_label_vals.js");

function calc(gd, trace) {
    var pos = [];
    var size = [];
    var pa = Axes.getFromId(gd, trace.orientation === 'h' ? trace.yaxis : trace.xaxis);
    var mainData = trace.orientation === 'h' ? 'y' : 'x';
    var counterData = {x: 'y', y: 'x'}[mainData];
    var calendar = trace[mainData + 'calendar'];
    var cumulativeSpec = trace.cumulative;
    var i;

    var binsAndPos = calcAllAutoBins(gd, trace, pa, mainData);
    var binSpec = binsAndPos[0];
    var pos0 = binsAndPos[1];

    var nonuniformBins = typeof binSpec.size === 'string';
    var binEdges = [];
    var bins = nonuniformBins ? binEdges : binSpec;
    // make the empty bin array
    var inc = [];
    var counts = [];
    var inputPoints = [];
    var total = 0;
    var norm = trace.histnorm;
    var func = trace.histfunc;
    var densityNorm = norm.indexOf('density') !== -1;
    var i2, binEnd, n;

    if(cumulativeSpec.enabled && densityNorm) {
        // we treat "cumulative" like it means "integral" if you use a density norm,
        // which in the end means it's the same as without "density"
        norm = norm.replace(/ ?density$/, '');
        densityNorm = false;
    }

    var extremeFunc = func === 'max' || func === 'min';
    var sizeInit = extremeFunc ? null : 0;
    var binFunc = binFunctions.count;
    var normFunc = normFunctions[norm];
    var isAvg = false;
    var pr2c = function(v) { return pa.r2c(v, 0, calendar); };
    var rawCounterData;

    if(Lib.isArrayOrTypedArray(trace[counterData]) && func !== 'count') {
        rawCounterData = trace[counterData];
        isAvg = func === 'avg';
        binFunc = binFunctions[func];
    }

    // create the bins (and any extra arrays needed)
    // assume more than 1e6 bins is an error, so we don't crash the browser
    i = pr2c(binSpec.start);

    // decrease end a little in case of rounding errors
    binEnd = pr2c(binSpec.end) + (i - Axes.tickIncrement(i, binSpec.size, false, calendar)) / 1e6;

    while(i < binEnd && pos.length < 1e6) {
        i2 = Axes.tickIncrement(i, binSpec.size, false, calendar);
        pos.push((i + i2) / 2);
        size.push(sizeInit);
        inputPoints.push([]);
        // nonuniform bins (like months) we need to search,
        // rather than straight calculate the bin we're in
        binEdges.push(i);
        // nonuniform bins also need nonuniform normalization factors
        if(densityNorm) inc.push(1 / (i2 - i));
        if(isAvg) counts.push(0);
        // break to avoid infinite loops
        if(i2 <= i) break;
        i = i2;
    }
    binEdges.push(i);

    // for date axes we need bin bounds to be calcdata. For nonuniform bins
    // we already have this, but uniform with start/end/size they're still strings.
    if(!nonuniformBins && pa.type === 'date') {
        bins = {
            start: pr2c(bins.start),
            end: pr2c(bins.end),
            size: bins.size
        };
    }

    // stash left and right gaps by group
    if(!gd._fullLayout._roundFnOpts) gd._fullLayout._roundFnOpts = {};
    var groupName = trace['_' + mainData + 'bingroup'];
    var roundFnOpts = {leftGap: Infinity, rightGap: Infinity};
    if(groupName) {
        if(!gd._fullLayout._roundFnOpts[groupName]) gd._fullLayout._roundFnOpts[groupName] = roundFnOpts;
        roundFnOpts = gd._fullLayout._roundFnOpts[groupName];
    }

    // bin the data
    // and make histogram-specific pt-number-to-cd-index map object
    var nMax = size.length;
    var uniqueValsPerBin = true;
    var leftGap = roundFnOpts.leftGap;
    var rightGap = roundFnOpts.rightGap;
    var ptNumber2cdIndex = {};
    for(i = 0; i < pos0.length; i++) {
        var posi = pos0[i];
        n = Lib.findBin(posi, bins);
        if(n >= 0 && n < nMax) {
            total += binFunc(n, i, size, rawCounterData, counts);
            if(uniqueValsPerBin && inputPoints[n].length && posi !== pos0[inputPoints[n][0]]) {
                uniqueValsPerBin = false;
            }
            inputPoints[n].push(i);
            ptNumber2cdIndex[i] = n;

            leftGap = Math.min(leftGap, posi - binEdges[n]);
            rightGap = Math.min(rightGap, binEdges[n + 1] - posi);
        }
    }
    roundFnOpts.leftGap = leftGap;
    roundFnOpts.rightGap = rightGap;

    var roundFn;
    if(!uniqueValsPerBin) {
        roundFn = function(v, isRightEdge) {
            return function() {
                var roundFnOpts = gd._fullLayout._roundFnOpts[groupName];
                return getBinSpanLabelRound(
                    roundFnOpts.leftGap,
                    roundFnOpts.rightGap,
                    binEdges, pa, calendar
                )(v, isRightEdge);
            };
        };
    }

    // average and/or normalize the data, if needed
    if(isAvg) total = doAvg(size, counts);
    if(normFunc) normFunc(size, total, inc);

    // after all normalization etc, now we can accumulate if desired
    if(cumulativeSpec.enabled) cdf(size, cumulativeSpec.direction, cumulativeSpec.currentbin);

    var seriesLen = Math.min(pos.length, size.length);
    var cd = [];
    var firstNonzero = 0;
    var lastNonzero = seriesLen - 1;

    // look for empty bins at the ends to remove, so autoscale omits them
    for(i = 0; i < seriesLen; i++) {
        if(size[i]) {
            firstNonzero = i;
            break;
        }
    }
    for(i = seriesLen - 1; i >= firstNonzero; i--) {
        if(size[i]) {
            lastNonzero = i;
            break;
        }
    }

    // create the "calculated data" to plot
    for(i = firstNonzero; i <= lastNonzero; i++) {
        if((isNumeric(pos[i]) && isNumeric(size[i]))) {
            var cdi = {
                p: pos[i],
                s: size[i],
                b: 0
            };

            // setup hover and event data fields,
            // N.B. pts and "hover" positions ph0/ph1 don't seem to make much sense
            // for cumulative distributions
            if(!cumulativeSpec.enabled) {
                cdi.pts = inputPoints[i];
                if(uniqueValsPerBin) {
                    cdi.ph0 = cdi.ph1 = (inputPoints[i].length) ? pos0[inputPoints[i][0]] : pos[i];
                } else {
                    // Defer evaluation of ph(0|1) in crossTraceCalc
                    trace._computePh = true;
                    cdi.ph0 = roundFn(binEdges[i]);
                    cdi.ph1 = roundFn(binEdges[i + 1], true);
                }
            }
            cd.push(cdi);
        }
    }

    if(cd.length === 1) {
        // when we collapse to a single bin, calcdata no longer describes bin size
        // so we need to explicitly specify it
        cd[0].width1 = Axes.tickIncrement(cd[0].p, binSpec.size, false, calendar) - cd[0].p;
    }

    arraysToCalcdata(cd, trace);

    if(Lib.isArrayOrTypedArray(trace.selectedpoints)) {
        Lib.tagSelected(cd, trace, ptNumber2cdIndex);
    }

    return cd;
}

/*
 * calcAllAutoBins: we want all histograms inside the same bingroup
 * (see logic in Histogram.crossTraceDefaults) to share bin specs
 *
 * If the user has explicitly specified differing
 * bin specs, there's nothing we can do, but if possible we will try to use the
 * smallest bins of any of the auto values for all histograms inside the same
 * bingroup.
 */
function calcAllAutoBins(gd, trace, pa, mainData, _overlayEdgeCase) {
    var binAttr = mainData + 'bins';
    var fullLayout = gd._fullLayout;
    var groupName = trace['_' + mainData + 'bingroup'];
    var binOpts = fullLayout._histogramBinOpts[groupName];
    var isOverlay = fullLayout.barmode === 'overlay';
    var i, traces, tracei, calendar, pos0, autoVals, cumulativeSpec;

    var r2c = function(v) { return pa.r2c(v, 0, calendar); };
    var c2r = function(v) { return pa.c2r(v, 0, calendar); };

    var cleanBound = pa.type === 'date' ?
        function(v) { return (v || v === 0) ? Lib.cleanDate(v, null, calendar) : null; } :
        function(v) { return isNumeric(v) ? Number(v) : null; };

    function setBound(attr, bins, newBins) {
        if(bins[attr + 'Found']) {
            bins[attr] = cleanBound(bins[attr]);
            if(bins[attr] === null) bins[attr] = newBins[attr];
        } else {
            autoVals[attr] = bins[attr] = newBins[attr];
            Lib.nestedProperty(traces[0], binAttr + '.' + attr).set(newBins[attr]);
        }
    }

    // all but the first trace in this group has already been marked finished
    // clear this flag, so next time we run calc we will run autobin again
    if(trace['_' + mainData + 'autoBinFinished']) {
        delete trace['_' + mainData + 'autoBinFinished'];
    } else {
        traces = binOpts.traces;
        var allPos = [];

        // Note: we're including `legendonly` traces here for autobin purposes,
        // so that showing & hiding from the legend won't affect bins.
        // But this complicates things a bit since those traces don't `calc`,
        // hence `isFirstVisible`.
        var isFirstVisible = true;
        var has2dMap = false;
        var hasHist2dContour = false;
        for(i = 0; i < traces.length; i++) {
            tracei = traces[i];

            if(tracei.visible) {
                var mainDatai = binOpts.dirs[i];
                pos0 = tracei['_' + mainDatai + 'pos0'] = pa.makeCalcdata(tracei, mainDatai);

                allPos = Lib.concat(allPos, pos0);
                delete tracei['_' + mainData + 'autoBinFinished'];

                if(trace.visible === true) {
                    if(isFirstVisible) {
                        isFirstVisible = false;
                    } else {
                        delete tracei._autoBin;
                        tracei['_' + mainData + 'autoBinFinished'] = 1;
                    }
                    if(Registry.traceIs(tracei, '2dMap')) {
                        has2dMap = true;
                    }
                    if(tracei.type === 'histogram2dcontour') {
                        hasHist2dContour = true;
                    }
                }
            }
        }

        calendar = traces[0][mainData + 'calendar'];
        var newBinSpec = Axes.autoBin(allPos, pa, binOpts.nbins, has2dMap, calendar, binOpts.sizeFound && binOpts.size);

        var autoBin = traces[0]._autoBin = {};
        autoVals = autoBin[binOpts.dirs[0]] = {};

        if(hasHist2dContour) {
            // the "true" 2nd argument reverses the tick direction (which we can't
            // just do with a minus sign because of month bins)
            if(!binOpts.size) {
                newBinSpec.start = c2r(Axes.tickIncrement(
                    r2c(newBinSpec.start), newBinSpec.size, true, calendar));
            }
            if(binOpts.end === undefined) {
                newBinSpec.end = c2r(Axes.tickIncrement(
                    r2c(newBinSpec.end), newBinSpec.size, false, calendar));
            }
        }

        // Edge case: single-valued histogram overlaying others
        // Use them all together to calculate the bin size for the single-valued one
        if(isOverlay && !Registry.traceIs(trace, '2dMap') && newBinSpec._dataSpan === 0 &&
            pa.type !== 'category' && pa.type !== 'multicategory') {
            // Several single-valued histograms! Stop infinite recursion,
            // just return an extra flag that tells handleSingleValueOverlays
            // to sort out this trace too
            if(_overlayEdgeCase) return [newBinSpec, pos0, true];

            newBinSpec = handleSingleValueOverlays(gd, trace, pa, mainData, binAttr);
        }

        // adjust for CDF edge cases
        cumulativeSpec = tracei.cumulative || {};
        if(cumulativeSpec.enabled && (cumulativeSpec.currentbin !== 'include')) {
            if(cumulativeSpec.direction === 'decreasing') {
                newBinSpec.start = c2r(Axes.tickIncrement(
                    r2c(newBinSpec.start), newBinSpec.size, true, calendar));
            } else {
                newBinSpec.end = c2r(Axes.tickIncrement(
                    r2c(newBinSpec.end), newBinSpec.size, false, calendar));
            }
        }

        binOpts.size = newBinSpec.size;
        if(!binOpts.sizeFound) {
            autoVals.size = newBinSpec.size;
            Lib.nestedProperty(traces[0], binAttr + '.size').set(newBinSpec.size);
        }

        setBound('start', binOpts, newBinSpec);
        setBound('end', binOpts, newBinSpec);
    }

    pos0 = trace['_' + mainData + 'pos0'];
    delete trace['_' + mainData + 'pos0'];

    // Each trace can specify its own start/end, or if omitted
    // we ensure they're beyond the bounds of this trace's data,
    // and we need to make sure start is aligned with the main start
    var traceInputBins = trace._input[binAttr] || {};
    var traceBinOptsCalc = Lib.extendFlat({}, binOpts);
    var mainStart = binOpts.start;
    var startIn = pa.r2l(traceInputBins.start);
    var hasStart = startIn !== undefined;
    if((binOpts.startFound || hasStart) && startIn !== pa.r2l(mainStart)) {
        // We have an explicit start to reconcile across traces
        // if this trace has an explicit start, shift it down to a bin edge
        // if another trace had an explicit start, shift it down to a
        // bin edge past our data
        var traceStart = hasStart ?
            startIn :
            Lib.aggNums(Math.min, null, pos0);

        var dummyAx = {
            type: (pa.type === 'category' || pa.type === 'multicategory') ? 'linear' : pa.type,
            r2l: pa.r2l,
            dtick: binOpts.size,
            tick0: mainStart,
            calendar: calendar,
            range: ([traceStart, Axes.tickIncrement(traceStart, binOpts.size, false, calendar)]).map(pa.l2r)
        };
        var newStart = Axes.tickFirst(dummyAx);
        if(newStart > pa.r2l(traceStart)) {
            newStart = Axes.tickIncrement(newStart, binOpts.size, true, calendar);
        }
        traceBinOptsCalc.start = pa.l2r(newStart);
        if(!hasStart) Lib.nestedProperty(trace, binAttr + '.start').set(traceBinOptsCalc.start);
    }

    var mainEnd = binOpts.end;
    var endIn = pa.r2l(traceInputBins.end);
    var hasEnd = endIn !== undefined;
    if((binOpts.endFound || hasEnd) && endIn !== pa.r2l(mainEnd)) {
        // Reconciling an explicit end is easier, as it doesn't need to
        // match bin edges
        var traceEnd = hasEnd ?
            endIn :
            Lib.aggNums(Math.max, null, pos0);

        traceBinOptsCalc.end = pa.l2r(traceEnd);
        if(!hasEnd) Lib.nestedProperty(trace, binAttr + '.start').set(traceBinOptsCalc.end);
    }

    // Backward compatibility for one-time autobinning.
    // autobin: true is handled in cleanData, but autobin: false
    // needs to be here where we have determined the values.
    var autoBinAttr = 'autobin' + mainData;
    if(trace._input[autoBinAttr] === false) {
        trace._input[binAttr] = Lib.extendFlat({}, trace[binAttr] || {});
        delete trace._input[autoBinAttr];
        delete trace[autoBinAttr];
    }

    return [traceBinOptsCalc, pos0];
}

/*
 * Adjust single-value histograms in overlay mode to make as good a
 * guess as we can at autobin values the user would like.
 *
 * Returns the binSpec for the trace that sparked all this
 */
function handleSingleValueOverlays(gd, trace, pa, mainData, binAttr) {
    var fullLayout = gd._fullLayout;
    var overlaidTraceGroup = getConnectedHistograms(gd, trace);
    var pastThisTrace = false;
    var minSize = Infinity;
    var singleValuedTraces = [trace];
    var i, tracei, binOpts;

    // first collect all the:
    // - min bin size from all multi-valued traces
    // - single-valued traces
    for(i = 0; i < overlaidTraceGroup.length; i++) {
        tracei = overlaidTraceGroup[i];

        if(tracei === trace) {
            pastThisTrace = true;
        } else if(!pastThisTrace) {
            // This trace has already had its autobins calculated, so either:
            // - it is part of a bingroup
            // - it is NOT a single-valued trace
            binOpts = fullLayout._histogramBinOpts[tracei['_' + mainData + 'bingroup']];
            minSize = Math.min(minSize, binOpts.size || tracei[binAttr].size);
        } else {
            var resulti = calcAllAutoBins(gd, tracei, pa, mainData, true);
            var binSpeci = resulti[0];
            var isSingleValued = resulti[2];

            // so we can use this result when we get to tracei in the normal
            // course of events, mark it as done and put _pos0 back
            tracei['_' + mainData + 'autoBinFinished'] = 1;
            tracei['_' + mainData + 'pos0'] = resulti[1];

            if(isSingleValued) {
                singleValuedTraces.push(tracei);
            } else {
                minSize = Math.min(minSize, binSpeci.size);
            }
        }
    }

    // find the real data values for each single-valued trace
    // hunt through pos0 for the first valid value
    var dataVals = new Array(singleValuedTraces.length);
    for(i = 0; i < singleValuedTraces.length; i++) {
        var pos0 = singleValuedTraces[i]['_' + mainData + 'pos0'];
        for(var j = 0; j < pos0.length; j++) {
            if(pos0[j] !== undefined) {
                dataVals[i] = pos0[j];
                break;
            }
        }
    }

    // are ALL traces are single-valued? use the min difference between
    // all of their values (which defaults to 1 if there's still only one)
    if(!isFinite(minSize)) {
        minSize = Lib.distinctVals(dataVals).minDiff;
    }

    // now apply the min size we found to all single-valued traces
    for(i = 0; i < singleValuedTraces.length; i++) {
        tracei = singleValuedTraces[i];
        var calendar = tracei[mainData + 'calendar'];

        var newBins = {
            start: pa.c2r(dataVals[i] - minSize / 2, 0, calendar),
            end: pa.c2r(dataVals[i] + minSize / 2, 0, calendar),
            size: minSize
        };

        tracei._input[binAttr] = tracei[binAttr] = newBins;

        binOpts = fullLayout._histogramBinOpts[tracei['_' + mainData + 'bingroup']];
        if(binOpts) Lib.extendFlat(binOpts, newBins);
    }

    return trace[binAttr];
}

/*
 * Return an array of histograms that share axes and orientation.
 *
 * Only considers histograms. In principle we could include bars in a
 * similar way to how we do manually binned histograms, though this
 * would have tons of edge cases and value judgments to make.
 */
function getConnectedHistograms(gd, trace) {
    var xid = trace.xaxis;
    var yid = trace.yaxis;
    var orientation = trace.orientation;

    var out = [];
    var fullData = gd._fullData;
    for(var i = 0; i < fullData.length; i++) {
        var tracei = fullData[i];
        if(tracei.type === 'histogram' &&
            tracei.visible === true &&
            tracei.orientation === orientation &&
            tracei.xaxis === xid && tracei.yaxis === yid
        ) {
            out.push(tracei);
        }
    }

    return out;
}

function cdf(size, direction, currentBin) {
    var i, vi, prevSum;

    function firstHalfPoint(i) {
        prevSum = size[i];
        size[i] /= 2;
    }

    function nextHalfPoint(i) {
        vi = size[i];
        size[i] = prevSum + vi / 2;
        prevSum += vi;
    }

    if(currentBin === 'half') {
        if(direction === 'increasing') {
            firstHalfPoint(0);
            for(i = 1; i < size.length; i++) {
                nextHalfPoint(i);
            }
        } else {
            firstHalfPoint(size.length - 1);
            for(i = size.length - 2; i >= 0; i--) {
                nextHalfPoint(i);
            }
        }
    } else if(direction === 'increasing') {
        for(i = 1; i < size.length; i++) {
            size[i] += size[i - 1];
        }

        // 'exclude' is identical to 'include' just shifted one bin over
        if(currentBin === 'exclude') {
            size.unshift(0);
            size.pop();
        }
    } else {
        for(i = size.length - 2; i >= 0; i--) {
            size[i] += size[i + 1];
        }

        if(currentBin === 'exclude') {
            size.push(0);
            size.shift();
        }
    }
}

module.exports = {
    calc: calc,
    calcAllAutoBins: calcAllAutoBins
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/norm_functions.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/norm_functions.js ***!
  \***********************************************************************/
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
    percent: function(size, total) {
        var nMax = size.length;
        var norm = 100 / total;
        for(var n = 0; n < nMax; n++) size[n] *= norm;
    },
    probability: function(size, total) {
        var nMax = size.length;
        for(var n = 0; n < nMax; n++) size[n] /= total;
    },
    density: function(size, total, inc, yinc) {
        var nMax = size.length;
        yinc = yinc || 1;
        for(var n = 0; n < nMax; n++) size[n] *= inc[n] * yinc;
    },
    'probability density': function(size, total, inc, yinc) {
        var nMax = size.length;
        if(yinc) total /= yinc;
        for(var n = 0; n < nMax; n++) size[n] *= inc[n] / total;
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9hcnJheXNfdG9fY2FsY2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oaXN0b2dyYW0vYXZlcmFnZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hpc3RvZ3JhbS9iaW5fZnVuY3Rpb25zLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtL2Jpbl9sYWJlbF92YWxzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtL2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oaXN0b2dyYW0vbm9ybV9mdW5jdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3QjtBQUNBO0FBQ0Esa0JBQWtCLGVBQWU7O0FBRWpDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7OztBQUdiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixVQUFVO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q2hrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOzs7QUFHYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0JBQXNCLFVBQVU7QUFDaEMsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsVUFBVTtBQUNoQztBQUNBIiwiZmlsZSI6ImNoYXJ0NDJkZTM4ODc5NmQzMjNjMmYyMDIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuLy8gYXJyYXlPayBhdHRyaWJ1dGVzLCBtZXJnZSB0aGVtIGludG8gY2FsY2RhdGEgYXJyYXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIGNkW2ldLmkgPSBpO1xuXG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dCwgY2QsICd0eCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLmhvdmVydGV4dCwgY2QsICdodHgnKTtcblxuICAgIHZhciBtYXJrZXIgPSB0cmFjZS5tYXJrZXI7XG4gICAgaWYobWFya2VyKSB7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5vcGFjaXR5LCBjZCwgJ21vJywgdHJ1ZSk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5jb2xvciwgY2QsICdtYycpO1xuXG4gICAgICAgIHZhciBtYXJrZXJMaW5lID0gbWFya2VyLmxpbmU7XG4gICAgICAgIGlmKG1hcmtlckxpbmUpIHtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckxpbmUuY29sb3IsIGNkLCAnbWxjJyk7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXJMaW5lLndpZHRoLCBjZCwgJ21sdycpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZG9Bdmcoc2l6ZSwgY291bnRzKSB7XG4gICAgdmFyIG5NYXggPSBzaXplLmxlbmd0aDtcbiAgICB2YXIgdG90YWwgPSAwO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBuTWF4OyBpKyspIHtcbiAgICAgICAgaWYoY291bnRzW2ldKSB7XG4gICAgICAgICAgICBzaXplW2ldIC89IGNvdW50c1tpXTtcbiAgICAgICAgICAgIHRvdGFsICs9IHNpemVbaV07XG4gICAgICAgIH0gZWxzZSBzaXplW2ldID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRvdGFsO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb3VudDogZnVuY3Rpb24obiwgaSwgc2l6ZSkge1xuICAgICAgICBzaXplW25dKys7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH0sXG5cbiAgICBzdW06IGZ1bmN0aW9uKG4sIGksIHNpemUsIGNvdW50ZXJEYXRhKSB7XG4gICAgICAgIHZhciB2ID0gY291bnRlckRhdGFbaV07XG4gICAgICAgIGlmKGlzTnVtZXJpYyh2KSkge1xuICAgICAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgICAgIHNpemVbbl0gKz0gdjtcbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0sXG5cbiAgICBhdmc6IGZ1bmN0aW9uKG4sIGksIHNpemUsIGNvdW50ZXJEYXRhLCBjb3VudHMpIHtcbiAgICAgICAgdmFyIHYgPSBjb3VudGVyRGF0YVtpXTtcbiAgICAgICAgaWYoaXNOdW1lcmljKHYpKSB7XG4gICAgICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICAgICAgc2l6ZVtuXSArPSB2O1xuICAgICAgICAgICAgY291bnRzW25dKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSxcblxuICAgIG1pbjogZnVuY3Rpb24obiwgaSwgc2l6ZSwgY291bnRlckRhdGEpIHtcbiAgICAgICAgdmFyIHYgPSBjb3VudGVyRGF0YVtpXTtcbiAgICAgICAgaWYoaXNOdW1lcmljKHYpKSB7XG4gICAgICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICAgICAgaWYoIWlzTnVtZXJpYyhzaXplW25dKSkge1xuICAgICAgICAgICAgICAgIHNpemVbbl0gPSB2O1xuICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgfSBlbHNlIGlmKHNpemVbbl0gPiB2KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gdiAtIHNpemVbbl07XG4gICAgICAgICAgICAgICAgc2l6ZVtuXSA9IHY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0sXG5cbiAgICBtYXg6IGZ1bmN0aW9uKG4sIGksIHNpemUsIGNvdW50ZXJEYXRhKSB7XG4gICAgICAgIHZhciB2ID0gY291bnRlckRhdGFbaV07XG4gICAgICAgIGlmKGlzTnVtZXJpYyh2KSkge1xuICAgICAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgICAgIGlmKCFpc051bWVyaWMoc2l6ZVtuXSkpIHtcbiAgICAgICAgICAgICAgICBzaXplW25dID0gdjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH0gZWxzZSBpZihzaXplW25dIDwgdikge1xuICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IHYgLSBzaXplW25dO1xuICAgICAgICAgICAgICAgIHNpemVbbl0gPSB2O1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWx0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBudW1Db25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvbnVtZXJpY2FsJyk7XG52YXIgb25lWWVhciA9IG51bUNvbnN0YW50cy5PTkVBVkdZRUFSO1xudmFyIG9uZU1vbnRoID0gbnVtQ29uc3RhbnRzLk9ORUFWR01PTlRIO1xudmFyIG9uZURheSA9IG51bUNvbnN0YW50cy5PTkVEQVk7XG52YXIgb25lSG91ciA9IG51bUNvbnN0YW50cy5PTkVIT1VSO1xudmFyIG9uZU1pbiA9IG51bUNvbnN0YW50cy5PTkVNSU47XG52YXIgb25lU2VjID0gbnVtQ29uc3RhbnRzLk9ORVNFQztcbnZhciB0aWNrSW5jcmVtZW50ID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKS50aWNrSW5jcmVtZW50O1xuXG5cbi8qXG4gKiBtYWtlIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGZpbmQgcm91bmRlZCBiaW4gZWRnZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0R2FwOiBob3cgZmFyIGZyb20gdGhlIGxlZnQgZWRnZSBvZiBhbnkgYmluIGlzIHRoZSBjbG9zZXN0IGRhdGEgdmFsdWU/XG4gKiBAcGFyYW0ge251bWJlcn0gcmlnaHRHYXA6IGhvdyBmYXIgZnJvbSB0aGUgcmlnaHQgZWRnZSBvZiBhbnkgYmluIGlzIHRoZSBjbG9zZXN0IGRhdGEgdmFsdWU/XG4gKiBAcGFyYW0ge0FycmF5W251bWJlcl19IGJpbkVkZ2VzOiB0aGUgYWN0dWFsIGVkZ2UgdmFsdWVzIHVzZWQgaW4gYmlubmluZ1xuICogQHBhcmFtIHtvYmplY3R9IHBhOiB0aGUgcG9zaXRpb24gYXhpc1xuICogQHBhcmFtIHtzdHJpbmd9IGNhbGVuZGFyOiB0aGUgZGF0YSBjYWxlbmRhclxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKHYsIGlzUmlnaHRFZGdlKX06XG4gKiAgIGZpbmQgdGhlIHN0YXJ0IChpc1JpZ2h0RWRnZSBpcyBmYWxzeSkgb3IgZW5kICh0cnV0aHkpIGxhYmVsIHZhbHVlIGZvciBhIGJpbiBlZGdlIGB2YFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldEJpblNwYW5MYWJlbFJvdW5kKGxlZnRHYXAsIHJpZ2h0R2FwLCBiaW5FZGdlcywgcGEsIGNhbGVuZGFyKSB7XG4gICAgLy8gdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIHRoZSBsYXJnZXN0IGRpZ2l0IHRoYXQgY2hhbmdlcyBpbiAqYWxsKiBvZiA0IHJlZ2lvbnM6XG4gICAgLy8gLSBpbnNpZGUgdGhlIHJpZ2h0R2FwIGJlZm9yZSBiaW5FZGdlc1swXSAoc2hpZnRlZCAxMCUgdG8gdGhlIGxlZnQpXG4gICAgLy8gLSBpbnNpZGUgdGhlIGxlZnRHYXAgYWZ0ZXIgYmluRWRnZXNbMF0gKGV4cGFuZGVkIGJ5IDEwJSBvZiByaWdodEdhcCBvbiBlYWNoIGVuZClcbiAgICAvLyAtIHNhbWUgZm9yIGJpbkVkZ2VzWzFdXG4gICAgdmFyIGR2MCA9IC0xLjEgKiByaWdodEdhcDtcbiAgICB2YXIgZHYxID0gLTAuMSAqIHJpZ2h0R2FwO1xuICAgIHZhciBkdjIgPSBsZWZ0R2FwIC0gZHYxO1xuICAgIHZhciBlZGdlMCA9IGJpbkVkZ2VzWzBdO1xuICAgIHZhciBlZGdlMSA9IGJpbkVkZ2VzWzFdO1xuICAgIHZhciBsZWZ0RGlnaXQgPSBNYXRoLm1pbihcbiAgICAgICAgYmlnZ2VzdERpZ2l0Q2hhbmdlZChlZGdlMCArIGR2MSwgZWRnZTAgKyBkdjIsIHBhLCBjYWxlbmRhciksXG4gICAgICAgIGJpZ2dlc3REaWdpdENoYW5nZWQoZWRnZTEgKyBkdjEsIGVkZ2UxICsgZHYyLCBwYSwgY2FsZW5kYXIpXG4gICAgKTtcbiAgICB2YXIgcmlnaHREaWdpdCA9IE1hdGgubWluKFxuICAgICAgICBiaWdnZXN0RGlnaXRDaGFuZ2VkKGVkZ2UwICsgZHYwLCBlZGdlMCArIGR2MSwgcGEsIGNhbGVuZGFyKSxcbiAgICAgICAgYmlnZ2VzdERpZ2l0Q2hhbmdlZChlZGdlMSArIGR2MCwgZWRnZTEgKyBkdjEsIHBhLCBjYWxlbmRhcilcbiAgICApO1xuXG4gICAgLy8gbm9ybWFsbHkgd2UgdHJ5IHRvIG1ha2UgdGhlIGxhYmVsIGZvciB0aGUgcmlnaHQgZWRnZSBkaWZmZXJlbnQgZnJvbVxuICAgIC8vIHRoZSBsZWZ0IGVkZ2UgbGFiZWwsIHNvIGl0J3MgdW5hbWJpZ3VvdXMgd2hpY2ggYmluIGdldHMgZGF0YSBvbiB0aGUgZWRnZS5cbiAgICAvLyBidXQgaWYgdGhpcyByZXN1bHRzIGluIG1vcmUgdGhhbiAzIGV4dHJhIGRpZ2l0cyAob3IgZm9yIGRhdGVzLCBtb3JlIHRoYW5cbiAgICAvLyAyIGZpZWxkcyBpZSBociZtaW4gb3IgbWluJnNlYywgd2hpY2ggaXMgMzYwMHgpLCBpdCdsbCBiZSBtb3JlIGNsdXR0ZXIgdGhhblxuICAgIC8vIHVzZWZ1bCBzbyBrZWVwIHRoZSBsYWJlbCBjbGVhbmVyIGluc3RlYWRcbiAgICB2YXIgZGlnaXQsIGRpc2FtYmlndWF0ZUVkZ2VzO1xuICAgIGlmKGxlZnREaWdpdCA+IHJpZ2h0RGlnaXQgJiYgcmlnaHREaWdpdCA8IE1hdGguYWJzKGVkZ2UxIC0gZWRnZTApIC8gNDAwMCkge1xuICAgICAgICBkaWdpdCA9IGxlZnREaWdpdDtcbiAgICAgICAgZGlzYW1iaWd1YXRlRWRnZXMgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkaWdpdCA9IE1hdGgubWluKGxlZnREaWdpdCwgcmlnaHREaWdpdCk7XG4gICAgICAgIGRpc2FtYmlndWF0ZUVkZ2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZihwYS50eXBlID09PSAnZGF0ZScgJiYgZGlnaXQgPiBvbmVEYXkpIHtcbiAgICAgICAgdmFyIGRhc2hFeGNsdWRlID0gKGRpZ2l0ID09PSBvbmVZZWFyKSA/IDEgOiA2O1xuICAgICAgICB2YXIgaW5jcmVtZW50ID0gKGRpZ2l0ID09PSBvbmVZZWFyKSA/ICdNMTInIDogJ00xJztcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24odiwgaXNSaWdodEVkZ2UpIHtcbiAgICAgICAgICAgIHZhciBkYXRlU3RyID0gcGEuYzJkKHYsIG9uZVllYXIsIGNhbGVuZGFyKTtcbiAgICAgICAgICAgIHZhciBkYXNoUG9zID0gZGF0ZVN0ci5pbmRleE9mKCctJywgZGFzaEV4Y2x1ZGUpO1xuICAgICAgICAgICAgaWYoZGFzaFBvcyA+IDApIGRhdGVTdHIgPSBkYXRlU3RyLnN1YnN0cigwLCBkYXNoUG9zKTtcbiAgICAgICAgICAgIHZhciByb3VuZGVkViA9IHBhLmQyYyhkYXRlU3RyLCAwLCBjYWxlbmRhcik7XG5cbiAgICAgICAgICAgIGlmKHJvdW5kZWRWIDwgdikge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ViA9IHRpY2tJbmNyZW1lbnQocm91bmRlZFYsIGluY3JlbWVudCwgZmFsc2UsIGNhbGVuZGFyKTtcbiAgICAgICAgICAgICAgICBpZigocm91bmRlZFYgKyBuZXh0VikgLyAyIDwgdiArIGxlZnRHYXApIHJvdW5kZWRWID0gbmV4dFY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGlzUmlnaHRFZGdlICYmIGRpc2FtYmlndWF0ZUVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpY2tJbmNyZW1lbnQocm91bmRlZFYsIGluY3JlbWVudCwgdHJ1ZSwgY2FsZW5kYXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcm91bmRlZFY7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHYsIGlzUmlnaHRFZGdlKSB7XG4gICAgICAgIHZhciByb3VuZGVkViA9IGRpZ2l0ICogTWF0aC5yb3VuZCh2IC8gZGlnaXQpO1xuICAgICAgICAvLyBpZiB3ZSByb3VuZGVkIGRvd24gYW5kIHdlIGNvdWxkIHJvdW5kIHVwIGFuZCBzdGlsbCBiZSA8IGxlZnRHYXBcbiAgICAgICAgLy8gKG9yIHdoYXQgbGVmdEdhcCB2YWx1ZXMgcm91bmQgdG8pLCBkbyB0aGF0XG4gICAgICAgIGlmKHJvdW5kZWRWICsgKGRpZ2l0IC8gMTApIDwgdiAmJiByb3VuZGVkViArIChkaWdpdCAqIDAuOSkgPCB2ICsgbGVmdEdhcCkge1xuICAgICAgICAgICAgcm91bmRlZFYgKz0gZGlnaXQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZmluYWxseSBmb3IgdGhlIHJpZ2h0IGVkZ2UgYmFjayBvZmYgb25lIGRpZ2l0IC0gYnV0IG9ubHkgaWYgd2UgY2FuIGRvIHRoYXRcbiAgICAgICAgLy8gYW5kIG5vdCBjbGlwIG9mZiBhbnkgZGF0YSB0aGF0J3MgcG90ZW50aWFsbHkgaW4gdGhlIGJpblxuICAgICAgICBpZihpc1JpZ2h0RWRnZSAmJiBkaXNhbWJpZ3VhdGVFZGdlcykge1xuICAgICAgICAgICAgcm91bmRlZFYgLT0gZGlnaXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvdW5kZWRWO1xuICAgIH07XG59O1xuXG4vKlxuICogRmluZCB0aGUgbGFyZ2VzdCBkaWdpdCB0aGF0IGNoYW5nZXMgd2l0aGluIGEgKGNhbGNkYXRhKSByZWdpb24gW3YxLCB2Ml1cbiAqIGlmIGRhdGVzLCBcImRpZ2l0XCIgbWVhbnMgZGF0ZS90aW1lIHBhcnQgd2hlbiBpdCdzIGJpZ2dlciB0aGFuIGEgc2Vjb25kXG4gKiByZXR1cm5zIHRoZSB1bml0IHZhbHVlIHRvIHJvdW5kIHRvIHRoaXMgZGlnaXQsIGVnIDAuMDEgdG8gcm91bmQgdG8gaHVuZHJlZHRocywgb3JcbiAqIDEwMCB0byByb3VuZCB0byBodW5kcmVkcy4gcmV0dXJucyBvbmVNb250aCBvciBvbmVZZWFyIGZvciBtb250aCBvciB5ZWFyIHJvdW5kaW5nLFxuICogc28gdGhhdCBNYXRoLm1pbiB3aWxsIHdvcmssIHJhdGhlciB0aGFuICdNMScgYW5kICdNMTInXG4gKi9cbmZ1bmN0aW9uIGJpZ2dlc3REaWdpdENoYW5nZWQodjEsIHYyLCBwYSwgY2FsZW5kYXIpIHtcbiAgICAvLyBhcmUgd2UgY3Jvc3NpbmcgemVybz8gY2FuJ3Qgc2F5IGFueXRoaW5nLlxuICAgIC8vIGluIHByaW5jaXBsZSB0aGlzIGRvZXNuJ3QgYXBwbHkgdG8gZGF0ZXMgYnV0IHR1cm5zIG91dCB0aGlzIGRvZXNuJ3QgbWF0dGVyLlxuICAgIGlmKHYxICogdjIgPD0gMCkgcmV0dXJuIEluZmluaXR5O1xuXG4gICAgdmFyIGR2ID0gTWF0aC5hYnModjIgLSB2MSk7XG4gICAgdmFyIGlzRGF0ZSA9IHBhLnR5cGUgPT09ICdkYXRlJztcbiAgICB2YXIgZGlnaXQgPSBiaWdnZXN0R3VhcmFudGVlZERpZ2l0Q2hhbmdlZChkdiwgaXNEYXRlKTtcbiAgICAvLyBzZWUgaWYgYSBsYXJnZXIgZGlnaXQgYWxzbyBjaGFuZ2VkXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgLy8gbnVtYmVyczogbmV4dCBkaWdpdCBuZWVkcyB0byBiZSA+MTB4IGJ1dCA8MTAweCB0aGVuIGdldHMgcm91bmRlZCBkb3duLlxuICAgICAgICAvLyBkYXRlczogbmV4dCBkaWdpdCBjYW4gYmUgYXMgbXVjaCBhcyA2MHggKHRoZW4gcm91bmRlZCBkb3duKVxuICAgICAgICB2YXIgbmV4dERpZ2l0ID0gYmlnZ2VzdEd1YXJhbnRlZWREaWdpdENoYW5nZWQoZGlnaXQgKiA4MCwgaXNEYXRlKTtcbiAgICAgICAgLy8gaWYgd2UgZ2V0IHRvIHllYXJzLCB0aGUgY2hhaW4gc3RvcHNcbiAgICAgICAgaWYoZGlnaXQgPT09IG5leHREaWdpdCkgYnJlYWs7XG4gICAgICAgIGlmKGRpZERpZ2l0Q2hhbmdlKG5leHREaWdpdCwgdjEsIHYyLCBpc0RhdGUsIHBhLCBjYWxlbmRhcikpIGRpZ2l0ID0gbmV4dERpZ2l0O1xuICAgICAgICBlbHNlIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gZGlnaXQ7XG59XG5cbi8qXG4gKiBGaW5kIHRoZSBsYXJnZXN0IGRpZ2l0IHRoYXQgKmRlZmluaXRlbHkqIGNoYW5nZXMgaW4gYSByZWdpb24gW3YsIHYgKyBkdl0gZm9yIGFueSB2XG4gKiBmb3Igbm9udW5pZm9ybSBkYXRlIHJlZ2lvbnMgKG1vbnRocy95ZWFycykgcGljayB0aGUgbGFyZ2VzdFxuICovXG5mdW5jdGlvbiBiaWdnZXN0R3VhcmFudGVlZERpZ2l0Q2hhbmdlZChkdiwgaXNEYXRlKSB7XG4gICAgaWYoaXNEYXRlICYmIGR2ID4gb25lU2VjKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgc3VwcG9zZWQgdG8gYmUgdGhlIGJpZ2dlc3QgKmd1YXJhbnRlZWQqIGNoYW5nZVxuICAgICAgICAvLyBzbyBjb21wYXJlIHRvIHRoZSBsb25nZXN0IG1vbnRoIGFuZCB5ZWFyIGFjcm9zcyBhbnkgY2FsZW5kYXIsXG4gICAgICAgIC8vIGFuZCB3ZSdsbCBpdGVyYXRlIGJhY2sgdXAgbGF0ZXJcbiAgICAgICAgLy8gbm90ZTogZG9lcyBub3Qgc3VwcG9ydCByb3VuZGluZyBsYXJnZXIgdGhhbiBvbmUgeWVhci4gV2UgY291bGQgYWRkXG4gICAgICAgIC8vIHRoYXQgaWYgYW55b25lIHdhbnRzIGl0LCBidXQgc2VlbXMgdW51c3VhbCBhbmQgbm90IHN0cmljdGx5IG5lY2Vzc2FyeS5cbiAgICAgICAgaWYoZHYgPiBvbmVEYXkpIHtcbiAgICAgICAgICAgIGlmKGR2ID4gb25lWWVhciAqIDEuMSkgcmV0dXJuIG9uZVllYXI7XG4gICAgICAgICAgICBpZihkdiA+IG9uZU1vbnRoICogMS4xKSByZXR1cm4gb25lTW9udGg7XG4gICAgICAgICAgICByZXR1cm4gb25lRGF5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZHYgPiBvbmVIb3VyKSByZXR1cm4gb25lSG91cjtcbiAgICAgICAgaWYoZHYgPiBvbmVNaW4pIHJldHVybiBvbmVNaW47XG4gICAgICAgIHJldHVybiBvbmVTZWM7XG4gICAgfVxuICAgIHJldHVybiBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyhkdikgLyBNYXRoLkxOMTApKTtcbn1cblxuZnVuY3Rpb24gZGlkRGlnaXRDaGFuZ2UoZGlnaXQsIHYxLCB2MiwgaXNEYXRlLCBwYSwgY2FsZW5kYXIpIHtcbiAgICBpZihpc0RhdGUgJiYgZGlnaXQgPiBvbmVEYXkpIHtcbiAgICAgICAgdmFyIGRhdGVQYXJ0czEgPSBkYXRlUGFydHModjEsIHBhLCBjYWxlbmRhcik7XG4gICAgICAgIHZhciBkYXRlUGFydHMyID0gZGF0ZVBhcnRzKHYyLCBwYSwgY2FsZW5kYXIpO1xuICAgICAgICB2YXIgcGFydGkgPSAoZGlnaXQgPT09IG9uZVllYXIpID8gMCA6IDE7XG4gICAgICAgIHJldHVybiBkYXRlUGFydHMxW3BhcnRpXSAhPT0gZGF0ZVBhcnRzMltwYXJ0aV07XG4gICAgfVxuICAgIHJldHVybiBNYXRoLmZsb29yKHYyIC8gZGlnaXQpIC0gTWF0aC5mbG9vcih2MSAvIGRpZ2l0KSA+IDAuMTtcbn1cblxuZnVuY3Rpb24gZGF0ZVBhcnRzKHYsIHBhLCBjYWxlbmRhcikge1xuICAgIHZhciBwYXJ0cyA9IHBhLmMyZCh2LCBvbmVZZWFyLCBjYWxlbmRhcikuc3BsaXQoJy0nKTtcbiAgICBpZihwYXJ0c1swXSA9PT0gJycpIHtcbiAgICAgICAgcGFydHMudW5zaGlmdCgpO1xuICAgICAgICBwYXJ0c1swXSA9ICctJyArIHBhcnRzWzBdO1xuICAgIH1cbiAgICByZXR1cm4gcGFydHM7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xuXG52YXIgYXJyYXlzVG9DYWxjZGF0YSA9IHJlcXVpcmUoJy4uL2Jhci9hcnJheXNfdG9fY2FsY2RhdGEnKTtcbnZhciBiaW5GdW5jdGlvbnMgPSByZXF1aXJlKCcuL2Jpbl9mdW5jdGlvbnMnKTtcbnZhciBub3JtRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9ub3JtX2Z1bmN0aW9ucycpO1xudmFyIGRvQXZnID0gcmVxdWlyZSgnLi9hdmVyYWdlJyk7XG52YXIgZ2V0QmluU3BhbkxhYmVsUm91bmQgPSByZXF1aXJlKCcuL2Jpbl9sYWJlbF92YWxzJyk7XG5cbmZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIHBvcyA9IFtdO1xuICAgIHZhciBzaXplID0gW107XG4gICAgdmFyIHBhID0gQXhlcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcgPyB0cmFjZS55YXhpcyA6IHRyYWNlLnhheGlzKTtcbiAgICB2YXIgbWFpbkRhdGEgPSB0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnID8gJ3knIDogJ3gnO1xuICAgIHZhciBjb3VudGVyRGF0YSA9IHt4OiAneScsIHk6ICd4J31bbWFpbkRhdGFdO1xuICAgIHZhciBjYWxlbmRhciA9IHRyYWNlW21haW5EYXRhICsgJ2NhbGVuZGFyJ107XG4gICAgdmFyIGN1bXVsYXRpdmVTcGVjID0gdHJhY2UuY3VtdWxhdGl2ZTtcbiAgICB2YXIgaTtcblxuICAgIHZhciBiaW5zQW5kUG9zID0gY2FsY0FsbEF1dG9CaW5zKGdkLCB0cmFjZSwgcGEsIG1haW5EYXRhKTtcbiAgICB2YXIgYmluU3BlYyA9IGJpbnNBbmRQb3NbMF07XG4gICAgdmFyIHBvczAgPSBiaW5zQW5kUG9zWzFdO1xuXG4gICAgdmFyIG5vbnVuaWZvcm1CaW5zID0gdHlwZW9mIGJpblNwZWMuc2l6ZSA9PT0gJ3N0cmluZyc7XG4gICAgdmFyIGJpbkVkZ2VzID0gW107XG4gICAgdmFyIGJpbnMgPSBub251bmlmb3JtQmlucyA/IGJpbkVkZ2VzIDogYmluU3BlYztcbiAgICAvLyBtYWtlIHRoZSBlbXB0eSBiaW4gYXJyYXlcbiAgICB2YXIgaW5jID0gW107XG4gICAgdmFyIGNvdW50cyA9IFtdO1xuICAgIHZhciBpbnB1dFBvaW50cyA9IFtdO1xuICAgIHZhciB0b3RhbCA9IDA7XG4gICAgdmFyIG5vcm0gPSB0cmFjZS5oaXN0bm9ybTtcbiAgICB2YXIgZnVuYyA9IHRyYWNlLmhpc3RmdW5jO1xuICAgIHZhciBkZW5zaXR5Tm9ybSA9IG5vcm0uaW5kZXhPZignZGVuc2l0eScpICE9PSAtMTtcbiAgICB2YXIgaTIsIGJpbkVuZCwgbjtcblxuICAgIGlmKGN1bXVsYXRpdmVTcGVjLmVuYWJsZWQgJiYgZGVuc2l0eU5vcm0pIHtcbiAgICAgICAgLy8gd2UgdHJlYXQgXCJjdW11bGF0aXZlXCIgbGlrZSBpdCBtZWFucyBcImludGVncmFsXCIgaWYgeW91IHVzZSBhIGRlbnNpdHkgbm9ybSxcbiAgICAgICAgLy8gd2hpY2ggaW4gdGhlIGVuZCBtZWFucyBpdCdzIHRoZSBzYW1lIGFzIHdpdGhvdXQgXCJkZW5zaXR5XCJcbiAgICAgICAgbm9ybSA9IG5vcm0ucmVwbGFjZSgvID9kZW5zaXR5JC8sICcnKTtcbiAgICAgICAgZGVuc2l0eU5vcm0gPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZXh0cmVtZUZ1bmMgPSBmdW5jID09PSAnbWF4JyB8fCBmdW5jID09PSAnbWluJztcbiAgICB2YXIgc2l6ZUluaXQgPSBleHRyZW1lRnVuYyA/IG51bGwgOiAwO1xuICAgIHZhciBiaW5GdW5jID0gYmluRnVuY3Rpb25zLmNvdW50O1xuICAgIHZhciBub3JtRnVuYyA9IG5vcm1GdW5jdGlvbnNbbm9ybV07XG4gICAgdmFyIGlzQXZnID0gZmFsc2U7XG4gICAgdmFyIHByMmMgPSBmdW5jdGlvbih2KSB7IHJldHVybiBwYS5yMmModiwgMCwgY2FsZW5kYXIpOyB9O1xuICAgIHZhciByYXdDb3VudGVyRGF0YTtcblxuICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlW2NvdW50ZXJEYXRhXSkgJiYgZnVuYyAhPT0gJ2NvdW50Jykge1xuICAgICAgICByYXdDb3VudGVyRGF0YSA9IHRyYWNlW2NvdW50ZXJEYXRhXTtcbiAgICAgICAgaXNBdmcgPSBmdW5jID09PSAnYXZnJztcbiAgICAgICAgYmluRnVuYyA9IGJpbkZ1bmN0aW9uc1tmdW5jXTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGhlIGJpbnMgKGFuZCBhbnkgZXh0cmEgYXJyYXlzIG5lZWRlZClcbiAgICAvLyBhc3N1bWUgbW9yZSB0aGFuIDFlNiBiaW5zIGlzIGFuIGVycm9yLCBzbyB3ZSBkb24ndCBjcmFzaCB0aGUgYnJvd3NlclxuICAgIGkgPSBwcjJjKGJpblNwZWMuc3RhcnQpO1xuXG4gICAgLy8gZGVjcmVhc2UgZW5kIGEgbGl0dGxlIGluIGNhc2Ugb2Ygcm91bmRpbmcgZXJyb3JzXG4gICAgYmluRW5kID0gcHIyYyhiaW5TcGVjLmVuZCkgKyAoaSAtIEF4ZXMudGlja0luY3JlbWVudChpLCBiaW5TcGVjLnNpemUsIGZhbHNlLCBjYWxlbmRhcikpIC8gMWU2O1xuXG4gICAgd2hpbGUoaSA8IGJpbkVuZCAmJiBwb3MubGVuZ3RoIDwgMWU2KSB7XG4gICAgICAgIGkyID0gQXhlcy50aWNrSW5jcmVtZW50KGksIGJpblNwZWMuc2l6ZSwgZmFsc2UsIGNhbGVuZGFyKTtcbiAgICAgICAgcG9zLnB1c2goKGkgKyBpMikgLyAyKTtcbiAgICAgICAgc2l6ZS5wdXNoKHNpemVJbml0KTtcbiAgICAgICAgaW5wdXRQb2ludHMucHVzaChbXSk7XG4gICAgICAgIC8vIG5vbnVuaWZvcm0gYmlucyAobGlrZSBtb250aHMpIHdlIG5lZWQgdG8gc2VhcmNoLFxuICAgICAgICAvLyByYXRoZXIgdGhhbiBzdHJhaWdodCBjYWxjdWxhdGUgdGhlIGJpbiB3ZSdyZSBpblxuICAgICAgICBiaW5FZGdlcy5wdXNoKGkpO1xuICAgICAgICAvLyBub251bmlmb3JtIGJpbnMgYWxzbyBuZWVkIG5vbnVuaWZvcm0gbm9ybWFsaXphdGlvbiBmYWN0b3JzXG4gICAgICAgIGlmKGRlbnNpdHlOb3JtKSBpbmMucHVzaCgxIC8gKGkyIC0gaSkpO1xuICAgICAgICBpZihpc0F2ZykgY291bnRzLnB1c2goMCk7XG4gICAgICAgIC8vIGJyZWFrIHRvIGF2b2lkIGluZmluaXRlIGxvb3BzXG4gICAgICAgIGlmKGkyIDw9IGkpIGJyZWFrO1xuICAgICAgICBpID0gaTI7XG4gICAgfVxuICAgIGJpbkVkZ2VzLnB1c2goaSk7XG5cbiAgICAvLyBmb3IgZGF0ZSBheGVzIHdlIG5lZWQgYmluIGJvdW5kcyB0byBiZSBjYWxjZGF0YS4gRm9yIG5vbnVuaWZvcm0gYmluc1xuICAgIC8vIHdlIGFscmVhZHkgaGF2ZSB0aGlzLCBidXQgdW5pZm9ybSB3aXRoIHN0YXJ0L2VuZC9zaXplIHRoZXkncmUgc3RpbGwgc3RyaW5ncy5cbiAgICBpZighbm9udW5pZm9ybUJpbnMgJiYgcGEudHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgIGJpbnMgPSB7XG4gICAgICAgICAgICBzdGFydDogcHIyYyhiaW5zLnN0YXJ0KSxcbiAgICAgICAgICAgIGVuZDogcHIyYyhiaW5zLmVuZCksXG4gICAgICAgICAgICBzaXplOiBiaW5zLnNpemVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBzdGFzaCBsZWZ0IGFuZCByaWdodCBnYXBzIGJ5IGdyb3VwXG4gICAgaWYoIWdkLl9mdWxsTGF5b3V0Ll9yb3VuZEZuT3B0cykgZ2QuX2Z1bGxMYXlvdXQuX3JvdW5kRm5PcHRzID0ge307XG4gICAgdmFyIGdyb3VwTmFtZSA9IHRyYWNlWydfJyArIG1haW5EYXRhICsgJ2Jpbmdyb3VwJ107XG4gICAgdmFyIHJvdW5kRm5PcHRzID0ge2xlZnRHYXA6IEluZmluaXR5LCByaWdodEdhcDogSW5maW5pdHl9O1xuICAgIGlmKGdyb3VwTmFtZSkge1xuICAgICAgICBpZighZ2QuX2Z1bGxMYXlvdXQuX3JvdW5kRm5PcHRzW2dyb3VwTmFtZV0pIGdkLl9mdWxsTGF5b3V0Ll9yb3VuZEZuT3B0c1tncm91cE5hbWVdID0gcm91bmRGbk9wdHM7XG4gICAgICAgIHJvdW5kRm5PcHRzID0gZ2QuX2Z1bGxMYXlvdXQuX3JvdW5kRm5PcHRzW2dyb3VwTmFtZV07XG4gICAgfVxuXG4gICAgLy8gYmluIHRoZSBkYXRhXG4gICAgLy8gYW5kIG1ha2UgaGlzdG9ncmFtLXNwZWNpZmljIHB0LW51bWJlci10by1jZC1pbmRleCBtYXAgb2JqZWN0XG4gICAgdmFyIG5NYXggPSBzaXplLmxlbmd0aDtcbiAgICB2YXIgdW5pcXVlVmFsc1BlckJpbiA9IHRydWU7XG4gICAgdmFyIGxlZnRHYXAgPSByb3VuZEZuT3B0cy5sZWZ0R2FwO1xuICAgIHZhciByaWdodEdhcCA9IHJvdW5kRm5PcHRzLnJpZ2h0R2FwO1xuICAgIHZhciBwdE51bWJlcjJjZEluZGV4ID0ge307XG4gICAgZm9yKGkgPSAwOyBpIDwgcG9zMC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcG9zaSA9IHBvczBbaV07XG4gICAgICAgIG4gPSBMaWIuZmluZEJpbihwb3NpLCBiaW5zKTtcbiAgICAgICAgaWYobiA+PSAwICYmIG4gPCBuTWF4KSB7XG4gICAgICAgICAgICB0b3RhbCArPSBiaW5GdW5jKG4sIGksIHNpemUsIHJhd0NvdW50ZXJEYXRhLCBjb3VudHMpO1xuICAgICAgICAgICAgaWYodW5pcXVlVmFsc1BlckJpbiAmJiBpbnB1dFBvaW50c1tuXS5sZW5ndGggJiYgcG9zaSAhPT0gcG9zMFtpbnB1dFBvaW50c1tuXVswXV0pIHtcbiAgICAgICAgICAgICAgICB1bmlxdWVWYWxzUGVyQmluID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dFBvaW50c1tuXS5wdXNoKGkpO1xuICAgICAgICAgICAgcHROdW1iZXIyY2RJbmRleFtpXSA9IG47XG5cbiAgICAgICAgICAgIGxlZnRHYXAgPSBNYXRoLm1pbihsZWZ0R2FwLCBwb3NpIC0gYmluRWRnZXNbbl0pO1xuICAgICAgICAgICAgcmlnaHRHYXAgPSBNYXRoLm1pbihyaWdodEdhcCwgYmluRWRnZXNbbiArIDFdIC0gcG9zaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcm91bmRGbk9wdHMubGVmdEdhcCA9IGxlZnRHYXA7XG4gICAgcm91bmRGbk9wdHMucmlnaHRHYXAgPSByaWdodEdhcDtcblxuICAgIHZhciByb3VuZEZuO1xuICAgIGlmKCF1bmlxdWVWYWxzUGVyQmluKSB7XG4gICAgICAgIHJvdW5kRm4gPSBmdW5jdGlvbih2LCBpc1JpZ2h0RWRnZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciByb3VuZEZuT3B0cyA9IGdkLl9mdWxsTGF5b3V0Ll9yb3VuZEZuT3B0c1tncm91cE5hbWVdO1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRCaW5TcGFuTGFiZWxSb3VuZChcbiAgICAgICAgICAgICAgICAgICAgcm91bmRGbk9wdHMubGVmdEdhcCxcbiAgICAgICAgICAgICAgICAgICAgcm91bmRGbk9wdHMucmlnaHRHYXAsXG4gICAgICAgICAgICAgICAgICAgIGJpbkVkZ2VzLCBwYSwgY2FsZW5kYXJcbiAgICAgICAgICAgICAgICApKHYsIGlzUmlnaHRFZGdlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gYXZlcmFnZSBhbmQvb3Igbm9ybWFsaXplIHRoZSBkYXRhLCBpZiBuZWVkZWRcbiAgICBpZihpc0F2ZykgdG90YWwgPSBkb0F2ZyhzaXplLCBjb3VudHMpO1xuICAgIGlmKG5vcm1GdW5jKSBub3JtRnVuYyhzaXplLCB0b3RhbCwgaW5jKTtcblxuICAgIC8vIGFmdGVyIGFsbCBub3JtYWxpemF0aW9uIGV0Yywgbm93IHdlIGNhbiBhY2N1bXVsYXRlIGlmIGRlc2lyZWRcbiAgICBpZihjdW11bGF0aXZlU3BlYy5lbmFibGVkKSBjZGYoc2l6ZSwgY3VtdWxhdGl2ZVNwZWMuZGlyZWN0aW9uLCBjdW11bGF0aXZlU3BlYy5jdXJyZW50YmluKTtcblxuICAgIHZhciBzZXJpZXNMZW4gPSBNYXRoLm1pbihwb3MubGVuZ3RoLCBzaXplLmxlbmd0aCk7XG4gICAgdmFyIGNkID0gW107XG4gICAgdmFyIGZpcnN0Tm9uemVybyA9IDA7XG4gICAgdmFyIGxhc3ROb256ZXJvID0gc2VyaWVzTGVuIC0gMTtcblxuICAgIC8vIGxvb2sgZm9yIGVtcHR5IGJpbnMgYXQgdGhlIGVuZHMgdG8gcmVtb3ZlLCBzbyBhdXRvc2NhbGUgb21pdHMgdGhlbVxuICAgIGZvcihpID0gMDsgaSA8IHNlcmllc0xlbjsgaSsrKSB7XG4gICAgICAgIGlmKHNpemVbaV0pIHtcbiAgICAgICAgICAgIGZpcnN0Tm9uemVybyA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IoaSA9IHNlcmllc0xlbiAtIDE7IGkgPj0gZmlyc3ROb256ZXJvOyBpLS0pIHtcbiAgICAgICAgaWYoc2l6ZVtpXSkge1xuICAgICAgICAgICAgbGFzdE5vbnplcm8gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGhlIFwiY2FsY3VsYXRlZCBkYXRhXCIgdG8gcGxvdFxuICAgIGZvcihpID0gZmlyc3ROb256ZXJvOyBpIDw9IGxhc3ROb256ZXJvOyBpKyspIHtcbiAgICAgICAgaWYoKGlzTnVtZXJpYyhwb3NbaV0pICYmIGlzTnVtZXJpYyhzaXplW2ldKSkpIHtcbiAgICAgICAgICAgIHZhciBjZGkgPSB7XG4gICAgICAgICAgICAgICAgcDogcG9zW2ldLFxuICAgICAgICAgICAgICAgIHM6IHNpemVbaV0sXG4gICAgICAgICAgICAgICAgYjogMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0dXAgaG92ZXIgYW5kIGV2ZW50IGRhdGEgZmllbGRzLFxuICAgICAgICAgICAgLy8gTi5CLiBwdHMgYW5kIFwiaG92ZXJcIiBwb3NpdGlvbnMgcGgwL3BoMSBkb24ndCBzZWVtIHRvIG1ha2UgbXVjaCBzZW5zZVxuICAgICAgICAgICAgLy8gZm9yIGN1bXVsYXRpdmUgZGlzdHJpYnV0aW9uc1xuICAgICAgICAgICAgaWYoIWN1bXVsYXRpdmVTcGVjLmVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBjZGkucHRzID0gaW5wdXRQb2ludHNbaV07XG4gICAgICAgICAgICAgICAgaWYodW5pcXVlVmFsc1BlckJpbikge1xuICAgICAgICAgICAgICAgICAgICBjZGkucGgwID0gY2RpLnBoMSA9IChpbnB1dFBvaW50c1tpXS5sZW5ndGgpID8gcG9zMFtpbnB1dFBvaW50c1tpXVswXV0gOiBwb3NbaV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGVmZXIgZXZhbHVhdGlvbiBvZiBwaCgwfDEpIGluIGNyb3NzVHJhY2VDYWxjXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlLl9jb21wdXRlUGggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjZGkucGgwID0gcm91bmRGbihiaW5FZGdlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGNkaS5waDEgPSByb3VuZEZuKGJpbkVkZ2VzW2kgKyAxXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2QucHVzaChjZGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoY2QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIC8vIHdoZW4gd2UgY29sbGFwc2UgdG8gYSBzaW5nbGUgYmluLCBjYWxjZGF0YSBubyBsb25nZXIgZGVzY3JpYmVzIGJpbiBzaXplXG4gICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gZXhwbGljaXRseSBzcGVjaWZ5IGl0XG4gICAgICAgIGNkWzBdLndpZHRoMSA9IEF4ZXMudGlja0luY3JlbWVudChjZFswXS5wLCBiaW5TcGVjLnNpemUsIGZhbHNlLCBjYWxlbmRhcikgLSBjZFswXS5wO1xuICAgIH1cblxuICAgIGFycmF5c1RvQ2FsY2RhdGEoY2QsIHRyYWNlKTtcblxuICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlLnNlbGVjdGVkcG9pbnRzKSkge1xuICAgICAgICBMaWIudGFnU2VsZWN0ZWQoY2QsIHRyYWNlLCBwdE51bWJlcjJjZEluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2Q7XG59XG5cbi8qXG4gKiBjYWxjQWxsQXV0b0JpbnM6IHdlIHdhbnQgYWxsIGhpc3RvZ3JhbXMgaW5zaWRlIHRoZSBzYW1lIGJpbmdyb3VwXG4gKiAoc2VlIGxvZ2ljIGluIEhpc3RvZ3JhbS5jcm9zc1RyYWNlRGVmYXVsdHMpIHRvIHNoYXJlIGJpbiBzcGVjc1xuICpcbiAqIElmIHRoZSB1c2VyIGhhcyBleHBsaWNpdGx5IHNwZWNpZmllZCBkaWZmZXJpbmdcbiAqIGJpbiBzcGVjcywgdGhlcmUncyBub3RoaW5nIHdlIGNhbiBkbywgYnV0IGlmIHBvc3NpYmxlIHdlIHdpbGwgdHJ5IHRvIHVzZSB0aGVcbiAqIHNtYWxsZXN0IGJpbnMgb2YgYW55IG9mIHRoZSBhdXRvIHZhbHVlcyBmb3IgYWxsIGhpc3RvZ3JhbXMgaW5zaWRlIHRoZSBzYW1lXG4gKiBiaW5ncm91cC5cbiAqL1xuZnVuY3Rpb24gY2FsY0FsbEF1dG9CaW5zKGdkLCB0cmFjZSwgcGEsIG1haW5EYXRhLCBfb3ZlcmxheUVkZ2VDYXNlKSB7XG4gICAgdmFyIGJpbkF0dHIgPSBtYWluRGF0YSArICdiaW5zJztcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBncm91cE5hbWUgPSB0cmFjZVsnXycgKyBtYWluRGF0YSArICdiaW5ncm91cCddO1xuICAgIHZhciBiaW5PcHRzID0gZnVsbExheW91dC5faGlzdG9ncmFtQmluT3B0c1tncm91cE5hbWVdO1xuICAgIHZhciBpc092ZXJsYXkgPSBmdWxsTGF5b3V0LmJhcm1vZGUgPT09ICdvdmVybGF5JztcbiAgICB2YXIgaSwgdHJhY2VzLCB0cmFjZWksIGNhbGVuZGFyLCBwb3MwLCBhdXRvVmFscywgY3VtdWxhdGl2ZVNwZWM7XG5cbiAgICB2YXIgcjJjID0gZnVuY3Rpb24odikgeyByZXR1cm4gcGEucjJjKHYsIDAsIGNhbGVuZGFyKTsgfTtcbiAgICB2YXIgYzJyID0gZnVuY3Rpb24odikgeyByZXR1cm4gcGEuYzJyKHYsIDAsIGNhbGVuZGFyKTsgfTtcblxuICAgIHZhciBjbGVhbkJvdW5kID0gcGEudHlwZSA9PT0gJ2RhdGUnID9cbiAgICAgICAgZnVuY3Rpb24odikgeyByZXR1cm4gKHYgfHwgdiA9PT0gMCkgPyBMaWIuY2xlYW5EYXRlKHYsIG51bGwsIGNhbGVuZGFyKSA6IG51bGw7IH0gOlxuICAgICAgICBmdW5jdGlvbih2KSB7IHJldHVybiBpc051bWVyaWModikgPyBOdW1iZXIodikgOiBudWxsOyB9O1xuXG4gICAgZnVuY3Rpb24gc2V0Qm91bmQoYXR0ciwgYmlucywgbmV3Qmlucykge1xuICAgICAgICBpZihiaW5zW2F0dHIgKyAnRm91bmQnXSkge1xuICAgICAgICAgICAgYmluc1thdHRyXSA9IGNsZWFuQm91bmQoYmluc1thdHRyXSk7XG4gICAgICAgICAgICBpZihiaW5zW2F0dHJdID09PSBudWxsKSBiaW5zW2F0dHJdID0gbmV3Qmluc1thdHRyXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF1dG9WYWxzW2F0dHJdID0gYmluc1thdHRyXSA9IG5ld0JpbnNbYXR0cl07XG4gICAgICAgICAgICBMaWIubmVzdGVkUHJvcGVydHkodHJhY2VzWzBdLCBiaW5BdHRyICsgJy4nICsgYXR0cikuc2V0KG5ld0JpbnNbYXR0cl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWxsIGJ1dCB0aGUgZmlyc3QgdHJhY2UgaW4gdGhpcyBncm91cCBoYXMgYWxyZWFkeSBiZWVuIG1hcmtlZCBmaW5pc2hlZFxuICAgIC8vIGNsZWFyIHRoaXMgZmxhZywgc28gbmV4dCB0aW1lIHdlIHJ1biBjYWxjIHdlIHdpbGwgcnVuIGF1dG9iaW4gYWdhaW5cbiAgICBpZih0cmFjZVsnXycgKyBtYWluRGF0YSArICdhdXRvQmluRmluaXNoZWQnXSkge1xuICAgICAgICBkZWxldGUgdHJhY2VbJ18nICsgbWFpbkRhdGEgKyAnYXV0b0JpbkZpbmlzaGVkJ107XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdHJhY2VzID0gYmluT3B0cy50cmFjZXM7XG4gICAgICAgIHZhciBhbGxQb3MgPSBbXTtcblxuICAgICAgICAvLyBOb3RlOiB3ZSdyZSBpbmNsdWRpbmcgYGxlZ2VuZG9ubHlgIHRyYWNlcyBoZXJlIGZvciBhdXRvYmluIHB1cnBvc2VzLFxuICAgICAgICAvLyBzbyB0aGF0IHNob3dpbmcgJiBoaWRpbmcgZnJvbSB0aGUgbGVnZW5kIHdvbid0IGFmZmVjdCBiaW5zLlxuICAgICAgICAvLyBCdXQgdGhpcyBjb21wbGljYXRlcyB0aGluZ3MgYSBiaXQgc2luY2UgdGhvc2UgdHJhY2VzIGRvbid0IGBjYWxjYCxcbiAgICAgICAgLy8gaGVuY2UgYGlzRmlyc3RWaXNpYmxlYC5cbiAgICAgICAgdmFyIGlzRmlyc3RWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGhhczJkTWFwID0gZmFsc2U7XG4gICAgICAgIHZhciBoYXNIaXN0MmRDb250b3VyID0gZmFsc2U7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IHRyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJhY2VpID0gdHJhY2VzW2ldO1xuXG4gICAgICAgICAgICBpZih0cmFjZWkudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHZhciBtYWluRGF0YWkgPSBiaW5PcHRzLmRpcnNbaV07XG4gICAgICAgICAgICAgICAgcG9zMCA9IHRyYWNlaVsnXycgKyBtYWluRGF0YWkgKyAncG9zMCddID0gcGEubWFrZUNhbGNkYXRhKHRyYWNlaSwgbWFpbkRhdGFpKTtcblxuICAgICAgICAgICAgICAgIGFsbFBvcyA9IExpYi5jb25jYXQoYWxsUG9zLCBwb3MwKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdHJhY2VpWydfJyArIG1haW5EYXRhICsgJ2F1dG9CaW5GaW5pc2hlZCddO1xuXG4gICAgICAgICAgICAgICAgaWYodHJhY2UudmlzaWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihpc0ZpcnN0VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNGaXJzdFZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0cmFjZWkuX2F1dG9CaW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjZWlbJ18nICsgbWFpbkRhdGEgKyAnYXV0b0JpbkZpbmlzaGVkJ10gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKFJlZ2lzdHJ5LnRyYWNlSXModHJhY2VpLCAnMmRNYXAnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzMmRNYXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYWNlaS50eXBlID09PSAnaGlzdG9ncmFtMmRjb250b3VyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzSGlzdDJkQ29udG91ciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYWxlbmRhciA9IHRyYWNlc1swXVttYWluRGF0YSArICdjYWxlbmRhciddO1xuICAgICAgICB2YXIgbmV3QmluU3BlYyA9IEF4ZXMuYXV0b0JpbihhbGxQb3MsIHBhLCBiaW5PcHRzLm5iaW5zLCBoYXMyZE1hcCwgY2FsZW5kYXIsIGJpbk9wdHMuc2l6ZUZvdW5kICYmIGJpbk9wdHMuc2l6ZSk7XG5cbiAgICAgICAgdmFyIGF1dG9CaW4gPSB0cmFjZXNbMF0uX2F1dG9CaW4gPSB7fTtcbiAgICAgICAgYXV0b1ZhbHMgPSBhdXRvQmluW2Jpbk9wdHMuZGlyc1swXV0gPSB7fTtcblxuICAgICAgICBpZihoYXNIaXN0MmRDb250b3VyKSB7XG4gICAgICAgICAgICAvLyB0aGUgXCJ0cnVlXCIgMm5kIGFyZ3VtZW50IHJldmVyc2VzIHRoZSB0aWNrIGRpcmVjdGlvbiAod2hpY2ggd2UgY2FuJ3RcbiAgICAgICAgICAgIC8vIGp1c3QgZG8gd2l0aCBhIG1pbnVzIHNpZ24gYmVjYXVzZSBvZiBtb250aCBiaW5zKVxuICAgICAgICAgICAgaWYoIWJpbk9wdHMuc2l6ZSkge1xuICAgICAgICAgICAgICAgIG5ld0JpblNwZWMuc3RhcnQgPSBjMnIoQXhlcy50aWNrSW5jcmVtZW50KFxuICAgICAgICAgICAgICAgICAgICByMmMobmV3QmluU3BlYy5zdGFydCksIG5ld0JpblNwZWMuc2l6ZSwgdHJ1ZSwgY2FsZW5kYXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGJpbk9wdHMuZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBuZXdCaW5TcGVjLmVuZCA9IGMycihBeGVzLnRpY2tJbmNyZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIHIyYyhuZXdCaW5TcGVjLmVuZCksIG5ld0JpblNwZWMuc2l6ZSwgZmFsc2UsIGNhbGVuZGFyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFZGdlIGNhc2U6IHNpbmdsZS12YWx1ZWQgaGlzdG9ncmFtIG92ZXJsYXlpbmcgb3RoZXJzXG4gICAgICAgIC8vIFVzZSB0aGVtIGFsbCB0b2dldGhlciB0byBjYWxjdWxhdGUgdGhlIGJpbiBzaXplIGZvciB0aGUgc2luZ2xlLXZhbHVlZCBvbmVcbiAgICAgICAgaWYoaXNPdmVybGF5ICYmICFSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAnMmRNYXAnKSAmJiBuZXdCaW5TcGVjLl9kYXRhU3BhbiA9PT0gMCAmJlxuICAgICAgICAgICAgcGEudHlwZSAhPT0gJ2NhdGVnb3J5JyAmJiBwYS50eXBlICE9PSAnbXVsdGljYXRlZ29yeScpIHtcbiAgICAgICAgICAgIC8vIFNldmVyYWwgc2luZ2xlLXZhbHVlZCBoaXN0b2dyYW1zISBTdG9wIGluZmluaXRlIHJlY3Vyc2lvbixcbiAgICAgICAgICAgIC8vIGp1c3QgcmV0dXJuIGFuIGV4dHJhIGZsYWcgdGhhdCB0ZWxscyBoYW5kbGVTaW5nbGVWYWx1ZU92ZXJsYXlzXG4gICAgICAgICAgICAvLyB0byBzb3J0IG91dCB0aGlzIHRyYWNlIHRvb1xuICAgICAgICAgICAgaWYoX292ZXJsYXlFZGdlQ2FzZSkgcmV0dXJuIFtuZXdCaW5TcGVjLCBwb3MwLCB0cnVlXTtcblxuICAgICAgICAgICAgbmV3QmluU3BlYyA9IGhhbmRsZVNpbmdsZVZhbHVlT3ZlcmxheXMoZ2QsIHRyYWNlLCBwYSwgbWFpbkRhdGEsIGJpbkF0dHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRqdXN0IGZvciBDREYgZWRnZSBjYXNlc1xuICAgICAgICBjdW11bGF0aXZlU3BlYyA9IHRyYWNlaS5jdW11bGF0aXZlIHx8IHt9O1xuICAgICAgICBpZihjdW11bGF0aXZlU3BlYy5lbmFibGVkICYmIChjdW11bGF0aXZlU3BlYy5jdXJyZW50YmluICE9PSAnaW5jbHVkZScpKSB7XG4gICAgICAgICAgICBpZihjdW11bGF0aXZlU3BlYy5kaXJlY3Rpb24gPT09ICdkZWNyZWFzaW5nJykge1xuICAgICAgICAgICAgICAgIG5ld0JpblNwZWMuc3RhcnQgPSBjMnIoQXhlcy50aWNrSW5jcmVtZW50KFxuICAgICAgICAgICAgICAgICAgICByMmMobmV3QmluU3BlYy5zdGFydCksIG5ld0JpblNwZWMuc2l6ZSwgdHJ1ZSwgY2FsZW5kYXIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3QmluU3BlYy5lbmQgPSBjMnIoQXhlcy50aWNrSW5jcmVtZW50KFxuICAgICAgICAgICAgICAgICAgICByMmMobmV3QmluU3BlYy5lbmQpLCBuZXdCaW5TcGVjLnNpemUsIGZhbHNlLCBjYWxlbmRhcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYmluT3B0cy5zaXplID0gbmV3QmluU3BlYy5zaXplO1xuICAgICAgICBpZighYmluT3B0cy5zaXplRm91bmQpIHtcbiAgICAgICAgICAgIGF1dG9WYWxzLnNpemUgPSBuZXdCaW5TcGVjLnNpemU7XG4gICAgICAgICAgICBMaWIubmVzdGVkUHJvcGVydHkodHJhY2VzWzBdLCBiaW5BdHRyICsgJy5zaXplJykuc2V0KG5ld0JpblNwZWMuc2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRCb3VuZCgnc3RhcnQnLCBiaW5PcHRzLCBuZXdCaW5TcGVjKTtcbiAgICAgICAgc2V0Qm91bmQoJ2VuZCcsIGJpbk9wdHMsIG5ld0JpblNwZWMpO1xuICAgIH1cblxuICAgIHBvczAgPSB0cmFjZVsnXycgKyBtYWluRGF0YSArICdwb3MwJ107XG4gICAgZGVsZXRlIHRyYWNlWydfJyArIG1haW5EYXRhICsgJ3BvczAnXTtcblxuICAgIC8vIEVhY2ggdHJhY2UgY2FuIHNwZWNpZnkgaXRzIG93biBzdGFydC9lbmQsIG9yIGlmIG9taXR0ZWRcbiAgICAvLyB3ZSBlbnN1cmUgdGhleSdyZSBiZXlvbmQgdGhlIGJvdW5kcyBvZiB0aGlzIHRyYWNlJ3MgZGF0YSxcbiAgICAvLyBhbmQgd2UgbmVlZCB0byBtYWtlIHN1cmUgc3RhcnQgaXMgYWxpZ25lZCB3aXRoIHRoZSBtYWluIHN0YXJ0XG4gICAgdmFyIHRyYWNlSW5wdXRCaW5zID0gdHJhY2UuX2lucHV0W2JpbkF0dHJdIHx8IHt9O1xuICAgIHZhciB0cmFjZUJpbk9wdHNDYWxjID0gTGliLmV4dGVuZEZsYXQoe30sIGJpbk9wdHMpO1xuICAgIHZhciBtYWluU3RhcnQgPSBiaW5PcHRzLnN0YXJ0O1xuICAgIHZhciBzdGFydEluID0gcGEucjJsKHRyYWNlSW5wdXRCaW5zLnN0YXJ0KTtcbiAgICB2YXIgaGFzU3RhcnQgPSBzdGFydEluICE9PSB1bmRlZmluZWQ7XG4gICAgaWYoKGJpbk9wdHMuc3RhcnRGb3VuZCB8fCBoYXNTdGFydCkgJiYgc3RhcnRJbiAhPT0gcGEucjJsKG1haW5TdGFydCkpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSBhbiBleHBsaWNpdCBzdGFydCB0byByZWNvbmNpbGUgYWNyb3NzIHRyYWNlc1xuICAgICAgICAvLyBpZiB0aGlzIHRyYWNlIGhhcyBhbiBleHBsaWNpdCBzdGFydCwgc2hpZnQgaXQgZG93biB0byBhIGJpbiBlZGdlXG4gICAgICAgIC8vIGlmIGFub3RoZXIgdHJhY2UgaGFkIGFuIGV4cGxpY2l0IHN0YXJ0LCBzaGlmdCBpdCBkb3duIHRvIGFcbiAgICAgICAgLy8gYmluIGVkZ2UgcGFzdCBvdXIgZGF0YVxuICAgICAgICB2YXIgdHJhY2VTdGFydCA9IGhhc1N0YXJ0ID9cbiAgICAgICAgICAgIHN0YXJ0SW4gOlxuICAgICAgICAgICAgTGliLmFnZ051bXMoTWF0aC5taW4sIG51bGwsIHBvczApO1xuXG4gICAgICAgIHZhciBkdW1teUF4ID0ge1xuICAgICAgICAgICAgdHlwZTogKHBhLnR5cGUgPT09ICdjYXRlZ29yeScgfHwgcGEudHlwZSA9PT0gJ211bHRpY2F0ZWdvcnknKSA/ICdsaW5lYXInIDogcGEudHlwZSxcbiAgICAgICAgICAgIHIybDogcGEucjJsLFxuICAgICAgICAgICAgZHRpY2s6IGJpbk9wdHMuc2l6ZSxcbiAgICAgICAgICAgIHRpY2swOiBtYWluU3RhcnQsXG4gICAgICAgICAgICBjYWxlbmRhcjogY2FsZW5kYXIsXG4gICAgICAgICAgICByYW5nZTogKFt0cmFjZVN0YXJ0LCBBeGVzLnRpY2tJbmNyZW1lbnQodHJhY2VTdGFydCwgYmluT3B0cy5zaXplLCBmYWxzZSwgY2FsZW5kYXIpXSkubWFwKHBhLmwycilcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG5ld1N0YXJ0ID0gQXhlcy50aWNrRmlyc3QoZHVtbXlBeCk7XG4gICAgICAgIGlmKG5ld1N0YXJ0ID4gcGEucjJsKHRyYWNlU3RhcnQpKSB7XG4gICAgICAgICAgICBuZXdTdGFydCA9IEF4ZXMudGlja0luY3JlbWVudChuZXdTdGFydCwgYmluT3B0cy5zaXplLCB0cnVlLCBjYWxlbmRhcik7XG4gICAgICAgIH1cbiAgICAgICAgdHJhY2VCaW5PcHRzQ2FsYy5zdGFydCA9IHBhLmwycihuZXdTdGFydCk7XG4gICAgICAgIGlmKCFoYXNTdGFydCkgTGliLm5lc3RlZFByb3BlcnR5KHRyYWNlLCBiaW5BdHRyICsgJy5zdGFydCcpLnNldCh0cmFjZUJpbk9wdHNDYWxjLnN0YXJ0KTtcbiAgICB9XG5cbiAgICB2YXIgbWFpbkVuZCA9IGJpbk9wdHMuZW5kO1xuICAgIHZhciBlbmRJbiA9IHBhLnIybCh0cmFjZUlucHV0Qmlucy5lbmQpO1xuICAgIHZhciBoYXNFbmQgPSBlbmRJbiAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKChiaW5PcHRzLmVuZEZvdW5kIHx8IGhhc0VuZCkgJiYgZW5kSW4gIT09IHBhLnIybChtYWluRW5kKSkge1xuICAgICAgICAvLyBSZWNvbmNpbGluZyBhbiBleHBsaWNpdCBlbmQgaXMgZWFzaWVyLCBhcyBpdCBkb2Vzbid0IG5lZWQgdG9cbiAgICAgICAgLy8gbWF0Y2ggYmluIGVkZ2VzXG4gICAgICAgIHZhciB0cmFjZUVuZCA9IGhhc0VuZCA/XG4gICAgICAgICAgICBlbmRJbiA6XG4gICAgICAgICAgICBMaWIuYWdnTnVtcyhNYXRoLm1heCwgbnVsbCwgcG9zMCk7XG5cbiAgICAgICAgdHJhY2VCaW5PcHRzQ2FsYy5lbmQgPSBwYS5sMnIodHJhY2VFbmQpO1xuICAgICAgICBpZighaGFzRW5kKSBMaWIubmVzdGVkUHJvcGVydHkodHJhY2UsIGJpbkF0dHIgKyAnLnN0YXJ0Jykuc2V0KHRyYWNlQmluT3B0c0NhbGMuZW5kKTtcbiAgICB9XG5cbiAgICAvLyBCYWNrd2FyZCBjb21wYXRpYmlsaXR5IGZvciBvbmUtdGltZSBhdXRvYmlubmluZy5cbiAgICAvLyBhdXRvYmluOiB0cnVlIGlzIGhhbmRsZWQgaW4gY2xlYW5EYXRhLCBidXQgYXV0b2JpbjogZmFsc2VcbiAgICAvLyBuZWVkcyB0byBiZSBoZXJlIHdoZXJlIHdlIGhhdmUgZGV0ZXJtaW5lZCB0aGUgdmFsdWVzLlxuICAgIHZhciBhdXRvQmluQXR0ciA9ICdhdXRvYmluJyArIG1haW5EYXRhO1xuICAgIGlmKHRyYWNlLl9pbnB1dFthdXRvQmluQXR0cl0gPT09IGZhbHNlKSB7XG4gICAgICAgIHRyYWNlLl9pbnB1dFtiaW5BdHRyXSA9IExpYi5leHRlbmRGbGF0KHt9LCB0cmFjZVtiaW5BdHRyXSB8fCB7fSk7XG4gICAgICAgIGRlbGV0ZSB0cmFjZS5faW5wdXRbYXV0b0JpbkF0dHJdO1xuICAgICAgICBkZWxldGUgdHJhY2VbYXV0b0JpbkF0dHJdO1xuICAgIH1cblxuICAgIHJldHVybiBbdHJhY2VCaW5PcHRzQ2FsYywgcG9zMF07XG59XG5cbi8qXG4gKiBBZGp1c3Qgc2luZ2xlLXZhbHVlIGhpc3RvZ3JhbXMgaW4gb3ZlcmxheSBtb2RlIHRvIG1ha2UgYXMgZ29vZCBhXG4gKiBndWVzcyBhcyB3ZSBjYW4gYXQgYXV0b2JpbiB2YWx1ZXMgdGhlIHVzZXIgd291bGQgbGlrZS5cbiAqXG4gKiBSZXR1cm5zIHRoZSBiaW5TcGVjIGZvciB0aGUgdHJhY2UgdGhhdCBzcGFya2VkIGFsbCB0aGlzXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZVNpbmdsZVZhbHVlT3ZlcmxheXMoZ2QsIHRyYWNlLCBwYSwgbWFpbkRhdGEsIGJpbkF0dHIpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBvdmVybGFpZFRyYWNlR3JvdXAgPSBnZXRDb25uZWN0ZWRIaXN0b2dyYW1zKGdkLCB0cmFjZSk7XG4gICAgdmFyIHBhc3RUaGlzVHJhY2UgPSBmYWxzZTtcbiAgICB2YXIgbWluU2l6ZSA9IEluZmluaXR5O1xuICAgIHZhciBzaW5nbGVWYWx1ZWRUcmFjZXMgPSBbdHJhY2VdO1xuICAgIHZhciBpLCB0cmFjZWksIGJpbk9wdHM7XG5cbiAgICAvLyBmaXJzdCBjb2xsZWN0IGFsbCB0aGU6XG4gICAgLy8gLSBtaW4gYmluIHNpemUgZnJvbSBhbGwgbXVsdGktdmFsdWVkIHRyYWNlc1xuICAgIC8vIC0gc2luZ2xlLXZhbHVlZCB0cmFjZXNcbiAgICBmb3IoaSA9IDA7IGkgPCBvdmVybGFpZFRyYWNlR3JvdXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJhY2VpID0gb3ZlcmxhaWRUcmFjZUdyb3VwW2ldO1xuXG4gICAgICAgIGlmKHRyYWNlaSA9PT0gdHJhY2UpIHtcbiAgICAgICAgICAgIHBhc3RUaGlzVHJhY2UgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYoIXBhc3RUaGlzVHJhY2UpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgdHJhY2UgaGFzIGFscmVhZHkgaGFkIGl0cyBhdXRvYmlucyBjYWxjdWxhdGVkLCBzbyBlaXRoZXI6XG4gICAgICAgICAgICAvLyAtIGl0IGlzIHBhcnQgb2YgYSBiaW5ncm91cFxuICAgICAgICAgICAgLy8gLSBpdCBpcyBOT1QgYSBzaW5nbGUtdmFsdWVkIHRyYWNlXG4gICAgICAgICAgICBiaW5PcHRzID0gZnVsbExheW91dC5faGlzdG9ncmFtQmluT3B0c1t0cmFjZWlbJ18nICsgbWFpbkRhdGEgKyAnYmluZ3JvdXAnXV07XG4gICAgICAgICAgICBtaW5TaXplID0gTWF0aC5taW4obWluU2l6ZSwgYmluT3B0cy5zaXplIHx8IHRyYWNlaVtiaW5BdHRyXS5zaXplKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRpID0gY2FsY0FsbEF1dG9CaW5zKGdkLCB0cmFjZWksIHBhLCBtYWluRGF0YSwgdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgYmluU3BlY2kgPSByZXN1bHRpWzBdO1xuICAgICAgICAgICAgdmFyIGlzU2luZ2xlVmFsdWVkID0gcmVzdWx0aVsyXTtcblxuICAgICAgICAgICAgLy8gc28gd2UgY2FuIHVzZSB0aGlzIHJlc3VsdCB3aGVuIHdlIGdldCB0byB0cmFjZWkgaW4gdGhlIG5vcm1hbFxuICAgICAgICAgICAgLy8gY291cnNlIG9mIGV2ZW50cywgbWFyayBpdCBhcyBkb25lIGFuZCBwdXQgX3BvczAgYmFja1xuICAgICAgICAgICAgdHJhY2VpWydfJyArIG1haW5EYXRhICsgJ2F1dG9CaW5GaW5pc2hlZCddID0gMTtcbiAgICAgICAgICAgIHRyYWNlaVsnXycgKyBtYWluRGF0YSArICdwb3MwJ10gPSByZXN1bHRpWzFdO1xuXG4gICAgICAgICAgICBpZihpc1NpbmdsZVZhbHVlZCkge1xuICAgICAgICAgICAgICAgIHNpbmdsZVZhbHVlZFRyYWNlcy5wdXNoKHRyYWNlaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1pblNpemUgPSBNYXRoLm1pbihtaW5TaXplLCBiaW5TcGVjaS5zaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpbmQgdGhlIHJlYWwgZGF0YSB2YWx1ZXMgZm9yIGVhY2ggc2luZ2xlLXZhbHVlZCB0cmFjZVxuICAgIC8vIGh1bnQgdGhyb3VnaCBwb3MwIGZvciB0aGUgZmlyc3QgdmFsaWQgdmFsdWVcbiAgICB2YXIgZGF0YVZhbHMgPSBuZXcgQXJyYXkoc2luZ2xlVmFsdWVkVHJhY2VzLmxlbmd0aCk7XG4gICAgZm9yKGkgPSAwOyBpIDwgc2luZ2xlVmFsdWVkVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwb3MwID0gc2luZ2xlVmFsdWVkVHJhY2VzW2ldWydfJyArIG1haW5EYXRhICsgJ3BvczAnXTtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHBvczAubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmKHBvczBbal0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRhdGFWYWxzW2ldID0gcG9zMFtqXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFyZSBBTEwgdHJhY2VzIGFyZSBzaW5nbGUtdmFsdWVkPyB1c2UgdGhlIG1pbiBkaWZmZXJlbmNlIGJldHdlZW5cbiAgICAvLyBhbGwgb2YgdGhlaXIgdmFsdWVzICh3aGljaCBkZWZhdWx0cyB0byAxIGlmIHRoZXJlJ3Mgc3RpbGwgb25seSBvbmUpXG4gICAgaWYoIWlzRmluaXRlKG1pblNpemUpKSB7XG4gICAgICAgIG1pblNpemUgPSBMaWIuZGlzdGluY3RWYWxzKGRhdGFWYWxzKS5taW5EaWZmO1xuICAgIH1cblxuICAgIC8vIG5vdyBhcHBseSB0aGUgbWluIHNpemUgd2UgZm91bmQgdG8gYWxsIHNpbmdsZS12YWx1ZWQgdHJhY2VzXG4gICAgZm9yKGkgPSAwOyBpIDwgc2luZ2xlVmFsdWVkVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyYWNlaSA9IHNpbmdsZVZhbHVlZFRyYWNlc1tpXTtcbiAgICAgICAgdmFyIGNhbGVuZGFyID0gdHJhY2VpW21haW5EYXRhICsgJ2NhbGVuZGFyJ107XG5cbiAgICAgICAgdmFyIG5ld0JpbnMgPSB7XG4gICAgICAgICAgICBzdGFydDogcGEuYzJyKGRhdGFWYWxzW2ldIC0gbWluU2l6ZSAvIDIsIDAsIGNhbGVuZGFyKSxcbiAgICAgICAgICAgIGVuZDogcGEuYzJyKGRhdGFWYWxzW2ldICsgbWluU2l6ZSAvIDIsIDAsIGNhbGVuZGFyKSxcbiAgICAgICAgICAgIHNpemU6IG1pblNpemVcbiAgICAgICAgfTtcblxuICAgICAgICB0cmFjZWkuX2lucHV0W2JpbkF0dHJdID0gdHJhY2VpW2JpbkF0dHJdID0gbmV3QmlucztcblxuICAgICAgICBiaW5PcHRzID0gZnVsbExheW91dC5faGlzdG9ncmFtQmluT3B0c1t0cmFjZWlbJ18nICsgbWFpbkRhdGEgKyAnYmluZ3JvdXAnXV07XG4gICAgICAgIGlmKGJpbk9wdHMpIExpYi5leHRlbmRGbGF0KGJpbk9wdHMsIG5ld0JpbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFjZVtiaW5BdHRyXTtcbn1cblxuLypcbiAqIFJldHVybiBhbiBhcnJheSBvZiBoaXN0b2dyYW1zIHRoYXQgc2hhcmUgYXhlcyBhbmQgb3JpZW50YXRpb24uXG4gKlxuICogT25seSBjb25zaWRlcnMgaGlzdG9ncmFtcy4gSW4gcHJpbmNpcGxlIHdlIGNvdWxkIGluY2x1ZGUgYmFycyBpbiBhXG4gKiBzaW1pbGFyIHdheSB0byBob3cgd2UgZG8gbWFudWFsbHkgYmlubmVkIGhpc3RvZ3JhbXMsIHRob3VnaCB0aGlzXG4gKiB3b3VsZCBoYXZlIHRvbnMgb2YgZWRnZSBjYXNlcyBhbmQgdmFsdWUganVkZ21lbnRzIHRvIG1ha2UuXG4gKi9cbmZ1bmN0aW9uIGdldENvbm5lY3RlZEhpc3RvZ3JhbXMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIHhpZCA9IHRyYWNlLnhheGlzO1xuICAgIHZhciB5aWQgPSB0cmFjZS55YXhpcztcbiAgICB2YXIgb3JpZW50YXRpb24gPSB0cmFjZS5vcmllbnRhdGlvbjtcblxuICAgIHZhciBvdXQgPSBbXTtcbiAgICB2YXIgZnVsbERhdGEgPSBnZC5fZnVsbERhdGE7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmFjZWkgPSBmdWxsRGF0YVtpXTtcbiAgICAgICAgaWYodHJhY2VpLnR5cGUgPT09ICdoaXN0b2dyYW0nICYmXG4gICAgICAgICAgICB0cmFjZWkudmlzaWJsZSA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgdHJhY2VpLm9yaWVudGF0aW9uID09PSBvcmllbnRhdGlvbiAmJlxuICAgICAgICAgICAgdHJhY2VpLnhheGlzID09PSB4aWQgJiYgdHJhY2VpLnlheGlzID09PSB5aWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQucHVzaCh0cmFjZWkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gY2RmKHNpemUsIGRpcmVjdGlvbiwgY3VycmVudEJpbikge1xuICAgIHZhciBpLCB2aSwgcHJldlN1bTtcblxuICAgIGZ1bmN0aW9uIGZpcnN0SGFsZlBvaW50KGkpIHtcbiAgICAgICAgcHJldlN1bSA9IHNpemVbaV07XG4gICAgICAgIHNpemVbaV0gLz0gMjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXh0SGFsZlBvaW50KGkpIHtcbiAgICAgICAgdmkgPSBzaXplW2ldO1xuICAgICAgICBzaXplW2ldID0gcHJldlN1bSArIHZpIC8gMjtcbiAgICAgICAgcHJldlN1bSArPSB2aTtcbiAgICB9XG5cbiAgICBpZihjdXJyZW50QmluID09PSAnaGFsZicpIHtcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnaW5jcmVhc2luZycpIHtcbiAgICAgICAgICAgIGZpcnN0SGFsZlBvaW50KDApO1xuICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDwgc2l6ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG5leHRIYWxmUG9pbnQoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaXJzdEhhbGZQb2ludChzaXplLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgZm9yKGkgPSBzaXplLmxlbmd0aCAtIDI7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbmV4dEhhbGZQb2ludChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICdpbmNyZWFzaW5nJykge1xuICAgICAgICBmb3IoaSA9IDE7IGkgPCBzaXplLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzaXplW2ldICs9IHNpemVbaSAtIDFdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gJ2V4Y2x1ZGUnIGlzIGlkZW50aWNhbCB0byAnaW5jbHVkZScganVzdCBzaGlmdGVkIG9uZSBiaW4gb3ZlclxuICAgICAgICBpZihjdXJyZW50QmluID09PSAnZXhjbHVkZScpIHtcbiAgICAgICAgICAgIHNpemUudW5zaGlmdCgwKTtcbiAgICAgICAgICAgIHNpemUucG9wKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoaSA9IHNpemUubGVuZ3RoIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHNpemVbaV0gKz0gc2l6ZVtpICsgMV07XG4gICAgICAgIH1cblxuICAgICAgICBpZihjdXJyZW50QmluID09PSAnZXhjbHVkZScpIHtcbiAgICAgICAgICAgIHNpemUucHVzaCgwKTtcbiAgICAgICAgICAgIHNpemUuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2FsYzogY2FsYyxcbiAgICBjYWxjQWxsQXV0b0JpbnM6IGNhbGNBbGxBdXRvQmluc1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBlcmNlbnQ6IGZ1bmN0aW9uKHNpemUsIHRvdGFsKSB7XG4gICAgICAgIHZhciBuTWF4ID0gc2l6ZS5sZW5ndGg7XG4gICAgICAgIHZhciBub3JtID0gMTAwIC8gdG90YWw7XG4gICAgICAgIGZvcih2YXIgbiA9IDA7IG4gPCBuTWF4OyBuKyspIHNpemVbbl0gKj0gbm9ybTtcbiAgICB9LFxuICAgIHByb2JhYmlsaXR5OiBmdW5jdGlvbihzaXplLCB0b3RhbCkge1xuICAgICAgICB2YXIgbk1heCA9IHNpemUubGVuZ3RoO1xuICAgICAgICBmb3IodmFyIG4gPSAwOyBuIDwgbk1heDsgbisrKSBzaXplW25dIC89IHRvdGFsO1xuICAgIH0sXG4gICAgZGVuc2l0eTogZnVuY3Rpb24oc2l6ZSwgdG90YWwsIGluYywgeWluYykge1xuICAgICAgICB2YXIgbk1heCA9IHNpemUubGVuZ3RoO1xuICAgICAgICB5aW5jID0geWluYyB8fCAxO1xuICAgICAgICBmb3IodmFyIG4gPSAwOyBuIDwgbk1heDsgbisrKSBzaXplW25dICo9IGluY1tuXSAqIHlpbmM7XG4gICAgfSxcbiAgICAncHJvYmFiaWxpdHkgZGVuc2l0eSc6IGZ1bmN0aW9uKHNpemUsIHRvdGFsLCBpbmMsIHlpbmMpIHtcbiAgICAgICAgdmFyIG5NYXggPSBzaXplLmxlbmd0aDtcbiAgICAgICAgaWYoeWluYykgdG90YWwgLz0geWluYztcbiAgICAgICAgZm9yKHZhciBuID0gMDsgbiA8IG5NYXg7IG4rKykgc2l6ZVtuXSAqPSBpbmNbbl0gLyB0b3RhbDtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==