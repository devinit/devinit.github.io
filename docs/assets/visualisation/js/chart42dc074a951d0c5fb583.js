(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_heatmap_attributes_js-node_modules_plotly_js_src_tr-c6e906"],{

/***/ "./node_modules/plotly.js/src/traces/heatmap/attributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/attributes.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var FORMAT_LINK = __webpack_require__(/*! ../../constants/docs */ "./node_modules/plotly.js/src/constants/docs.js").FORMAT_LINK;

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = extendFlat({
    z: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the z data.'
    },
    x: extendFlat({}, scatterAttrs.x, {impliedEdits: {xtype: 'array'}}),
    x0: extendFlat({}, scatterAttrs.x0, {impliedEdits: {xtype: 'scaled'}}),
    dx: extendFlat({}, scatterAttrs.dx, {impliedEdits: {xtype: 'scaled'}}),
    y: extendFlat({}, scatterAttrs.y, {impliedEdits: {ytype: 'array'}}),
    y0: extendFlat({}, scatterAttrs.y0, {impliedEdits: {ytype: 'scaled'}}),
    dy: extendFlat({}, scatterAttrs.dy, {impliedEdits: {ytype: 'scaled'}}),

    text: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the text elements associated with each z value.'
    },
    hovertext: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Same as `text`.'
    },
    transpose: {
        valType: 'boolean',
        dflt: false,
        role: 'info',
        editType: 'calc',
        description: 'Transposes the z data.'
    },
    xtype: {
        valType: 'enumerated',
        values: ['array', 'scaled'],
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'If *array*, the heatmap\'s x coordinates are given by *x*',
            '(the default behavior when `x` is provided).',
            'If *scaled*, the heatmap\'s x coordinates are given by *x0* and *dx*',
            '(the default behavior when `x` is not provided).'
        ].join(' ')
    },
    ytype: {
        valType: 'enumerated',
        values: ['array', 'scaled'],
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'If *array*, the heatmap\'s y coordinates are given by *y*',
            '(the default behavior when `y` is provided)',
            'If *scaled*, the heatmap\'s y coordinates are given by *y0* and *dy*',
            '(the default behavior when `y` is not provided)'
        ].join(' ')
    },
    zsmooth: {
        valType: 'enumerated',
        values: ['fast', 'best', false],
        dflt: false,
        role: 'style',
        editType: 'calc',
        description: [
            'Picks a smoothing algorithm use to smooth `z` data.'
        ].join(' ')
    },
    hoverongaps: {
        valType: 'boolean',
        dflt: true,
        role: 'style',
        editType: 'none',
        description: [
            'Determines whether or not gaps',
            '(i.e. {nan} or missing values)',
            'in the `z` data have hover labels associated with them.'
        ].join(' ')
    },
    connectgaps: {
        valType: 'boolean',
        role: 'info',
        editType: 'calc',
        description: [
            'Determines whether or not gaps',
            '(i.e. {nan} or missing values)',
            'in the `z` data are filled in.',
            'It is defaulted to true if `z` is a',
            'one dimensional array and `zsmooth` is not false;',
            'otherwise it is defaulted to false.'
        ].join(' ')
    },
    xgap: {
        valType: 'number',
        dflt: 0,
        min: 0,
        role: 'style',
        editType: 'plot',
        description: 'Sets the horizontal gap (in pixels) between bricks.'
    },
    ygap: {
        valType: 'number',
        dflt: 0,
        min: 0,
        role: 'style',
        editType: 'plot',
        description: 'Sets the vertical gap (in pixels) between bricks.'
    },
    zhoverformat: {
        valType: 'string',
        dflt: '',
        role: 'style',
        editType: 'none',
        description: [
            'Sets the hover text formatting rule using d3 formatting mini-languages',
            'which are very similar to those in Python. See:',
            FORMAT_LINK
        ].join(' ')
    },
    hovertemplate: hovertemplateAttrs(),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
}, {
    transforms: undefined
},
    colorScaleAttrs('', {cLetter: 'z', autoColorDflt: false})
);


/***/ }),

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


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/find_empties.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/find_empties.js ***!
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



var maxRowLength = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").maxRowLength;

/* Return a list of empty points in 2D array z
 * each empty point z[i][j] gives an array [i, j, neighborCount]
 * neighborCount is the count of 4 nearest neighbors that DO exist
 * this is to give us an order of points to evaluate for interpolation.
 * if no neighbors exist, we iteratively look for neighbors that HAVE
 * neighbors, and add a fractional neighborCount
 */
module.exports = function findEmpties(z) {
    var empties = [];
    var neighborHash = {};
    var noNeighborList = [];
    var nextRow = z[0];
    var row = [];
    var blank = [0, 0, 0];
    var rowLength = maxRowLength(z);
    var prevRow;
    var i;
    var j;
    var thisPt;
    var p;
    var neighborCount;
    var newNeighborHash;
    var foundNewNeighbors;

    for(i = 0; i < z.length; i++) {
        prevRow = row;
        row = nextRow;
        nextRow = z[i + 1] || [];
        for(j = 0; j < rowLength; j++) {
            if(row[j] === undefined) {
                neighborCount = (row[j - 1] !== undefined ? 1 : 0) +
                    (row[j + 1] !== undefined ? 1 : 0) +
                    (prevRow[j] !== undefined ? 1 : 0) +
                    (nextRow[j] !== undefined ? 1 : 0);

                if(neighborCount) {
                    // for this purpose, don't count off-the-edge points
                    // as undefined neighbors
                    if(i === 0) neighborCount++;
                    if(j === 0) neighborCount++;
                    if(i === z.length - 1) neighborCount++;
                    if(j === row.length - 1) neighborCount++;

                    // if all neighbors that could exist do, we don't
                    // need this for finding farther neighbors
                    if(neighborCount < 4) {
                        neighborHash[[i, j]] = [i, j, neighborCount];
                    }

                    empties.push([i, j, neighborCount]);
                } else noNeighborList.push([i, j]);
            }
        }
    }

    while(noNeighborList.length) {
        newNeighborHash = {};
        foundNewNeighbors = false;

        // look for cells that now have neighbors but didn't before
        for(p = noNeighborList.length - 1; p >= 0; p--) {
            thisPt = noNeighborList[p];
            i = thisPt[0];
            j = thisPt[1];

            neighborCount = ((neighborHash[[i - 1, j]] || blank)[2] +
                (neighborHash[[i + 1, j]] || blank)[2] +
                (neighborHash[[i, j - 1]] || blank)[2] +
                (neighborHash[[i, j + 1]] || blank)[2]) / 20;

            if(neighborCount) {
                newNeighborHash[thisPt] = [i, j, neighborCount];
                noNeighborList.splice(p, 1);
                foundNewNeighbors = true;
            }
        }

        if(!foundNewNeighbors) {
            throw 'findEmpties iterated with no new neighbors';
        }

        // put these new cells into the main neighbor list
        for(thisPt in newNeighborHash) {
            neighborHash[thisPt] = newNeighborHash[thisPt];
            empties.push(newNeighborHash[thisPt]);
        }
    }

    // sort the full list in descending order of neighbor count
    return empties.sort(function(a, b) { return b[2] - a[2]; });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/interp2d.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/interp2d.js ***!
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

var INTERPTHRESHOLD = 1e-2;
var NEIGHBORSHIFTS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function correctionOvershoot(maxFractionalChange) {
    // start with less overshoot, until we know it's converging,
    // then ramp up the overshoot for faster convergence
    return 0.5 - 0.25 * Math.min(1, maxFractionalChange * 0.5);
}

/*
 * interp2d: Fill in missing data from a 2D array using an iterative
 *   poisson equation solver with zero-derivative BC at edges.
 *   Amazingly, this just amounts to repeatedly averaging all the existing
 *   nearest neighbors, at least if we don't take x/y scaling into account,
 *   which is the right approach here where x and y may not even have the
 *   same units.
 *
 * @param {array of arrays} z
 *      The 2D array to fill in. Will be mutated here. Assumed to already be
 *      cleaned, so all entries are numbers except gaps, which are `undefined`.
 * @param {array of arrays} emptyPoints
 *      Each entry [i, j, neighborCount] for empty points z[i][j] and the number
 *      of neighbors that are *not* missing. Assumed to be sorted from most to
 *      least neighbors, as produced by heatmap/find_empties.
 */
module.exports = function interp2d(z, emptyPoints) {
    var maxFractionalChange = 1;
    var i;

    // one pass to fill in a starting value for all the empties
    iterateInterp2d(z, emptyPoints);

    // we're don't need to iterate lone empties - remove them
    for(i = 0; i < emptyPoints.length; i++) {
        if(emptyPoints[i][2] < 4) break;
    }
    // but don't remove these points from the original array,
    // we'll use them for masking, so make a copy.
    emptyPoints = emptyPoints.slice(i);

    for(i = 0; i < 100 && maxFractionalChange > INTERPTHRESHOLD; i++) {
        maxFractionalChange = iterateInterp2d(z, emptyPoints,
            correctionOvershoot(maxFractionalChange));
    }
    if(maxFractionalChange > INTERPTHRESHOLD) {
        Lib.log('interp2d didn\'t converge quickly', maxFractionalChange);
    }

    return z;
};

function iterateInterp2d(z, emptyPoints, overshoot) {
    var maxFractionalChange = 0;
    var thisPt;
    var i;
    var j;
    var p;
    var q;
    var neighborShift;
    var neighborRow;
    var neighborVal;
    var neighborCount;
    var neighborSum;
    var initialVal;
    var minNeighbor;
    var maxNeighbor;

    for(p = 0; p < emptyPoints.length; p++) {
        thisPt = emptyPoints[p];
        i = thisPt[0];
        j = thisPt[1];
        initialVal = z[i][j];
        neighborSum = 0;
        neighborCount = 0;

        for(q = 0; q < 4; q++) {
            neighborShift = NEIGHBORSHIFTS[q];
            neighborRow = z[i + neighborShift[0]];
            if(!neighborRow) continue;
            neighborVal = neighborRow[j + neighborShift[1]];
            if(neighborVal !== undefined) {
                if(neighborSum === 0) {
                    minNeighbor = maxNeighbor = neighborVal;
                } else {
                    minNeighbor = Math.min(minNeighbor, neighborVal);
                    maxNeighbor = Math.max(maxNeighbor, neighborVal);
                }
                neighborCount++;
                neighborSum += neighborVal;
            }
        }

        if(neighborCount === 0) {
            throw 'iterateInterp2d order is wrong: no defined neighbors';
        }

        // this is the laplace equation interpolation:
        // each point is just the average of its neighbors
        // note that this ignores differential x/y scaling
        // which I think is the right approach, since we
        // don't know what that scaling means
        z[i][j] = neighborSum / neighborCount;

        if(initialVal === undefined) {
            if(neighborCount < 4) maxFractionalChange = 1;
        } else {
            // we can make large empty regions converge faster
            // if we overshoot the change vs the previous value
            z[i][j] = (1 + overshoot) * z[i][j] - overshoot * initialVal;

            if(maxNeighbor > minNeighbor) {
                maxFractionalChange = Math.max(maxFractionalChange,
                    Math.abs(z[i][j] - initialVal) / (maxNeighbor - minNeighbor));
            }
        }
    }

    return maxFractionalChange;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/make_bound_array.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/make_bound_array.js ***!
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



var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

module.exports = function makeBoundArray(trace, arrayIn, v0In, dvIn, numbricks, ax) {
    var arrayOut = [];
    var isContour = Registry.traceIs(trace, 'contour');
    var isHist = Registry.traceIs(trace, 'histogram');
    var isGL2D = Registry.traceIs(trace, 'gl2d');
    var v0;
    var dv;
    var i;

    var isArrayOfTwoItemsOrMore = isArrayOrTypedArray(arrayIn) && arrayIn.length > 1;

    if(isArrayOfTwoItemsOrMore && !isHist && (ax.type !== 'category')) {
        var len = arrayIn.length;

        // given vals are brick centers
        // hopefully length === numbricks, but use this method even if too few are supplied
        // and extend it linearly based on the last two points
        if(len <= numbricks) {
            // contour plots only want the centers
            if(isContour || isGL2D) arrayOut = arrayIn.slice(0, numbricks);
            else if(numbricks === 1) {
                arrayOut = [arrayIn[0] - 0.5, arrayIn[0] + 0.5];
            } else {
                arrayOut = [1.5 * arrayIn[0] - 0.5 * arrayIn[1]];

                for(i = 1; i < len; i++) {
                    arrayOut.push((arrayIn[i - 1] + arrayIn[i]) * 0.5);
                }

                arrayOut.push(1.5 * arrayIn[len - 1] - 0.5 * arrayIn[len - 2]);
            }

            if(len < numbricks) {
                var lastPt = arrayOut[arrayOut.length - 1];
                var delta = lastPt - arrayOut[arrayOut.length - 2];

                for(i = len; i < numbricks; i++) {
                    lastPt += delta;
                    arrayOut.push(lastPt);
                }
            }
        } else {
            // hopefully length === numbricks+1, but do something regardless:
            // given vals are brick boundaries
            return isContour ?
                arrayIn.slice(0, numbricks) :  // we must be strict for contours
                arrayIn.slice(0, numbricks + 1);
        }
    } else {
        var calendar = trace[ax._id.charAt(0) + 'calendar'];

        if(isHist) {
            v0 = ax.r2c(v0In, 0, calendar);
        } else {
            if(isArrayOrTypedArray(arrayIn) && arrayIn.length === 1) {
                v0 = arrayIn[0];
            } else if(v0In === undefined) {
                v0 = 0;
            } else {
                var fn = ax.type === 'log' ? ax.d2c : ax.r2c;
                v0 = fn(v0In, 0, calendar);
            }
        }

        dv = dvIn || 1;

        for(i = (isContour || isGL2D) ? 0 : -0.5; i < numbricks; i++) {
            arrayOut.push(v0 + dv * i);
        }
    }

    return arrayOut;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvY2xlYW5fMmRfYXJyYXkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL2NvbnZlcnRfY29sdW1uX3h5ei5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvZmluZF9lbXB0aWVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9pbnRlcnAyZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvbWFrZV9ib3VuZF9hcnJheS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyx3RkFBdUI7QUFDbEQsZ0JBQWdCLG1CQUFPLENBQUMsZ0ZBQXdCO0FBQ2hELHlCQUF5QiwwSUFBNkQ7QUFDdEYsc0JBQXNCLG1CQUFPLENBQUMsZ0hBQXdDO0FBQ3RFLGtCQUFrQiw2R0FBMkM7O0FBRTdELGlCQUFpQixvR0FBc0M7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsb0JBQW9CLG1CQUFtQixlQUFlLGdCQUFnQjtBQUN0RSxxQkFBcUIsb0JBQW9CLGVBQWUsaUJBQWlCO0FBQ3pFLHFCQUFxQixvQkFBb0IsZUFBZSxpQkFBaUI7QUFDekUsb0JBQW9C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Ii8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNjYXR0ZXJBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXR0cmlidXRlcycpO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG52YXIgRk9STUFUX0xJTksgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZG9jcycpLkZPUk1BVF9MSU5LO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZEZsYXQoe1xuICAgIHo6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHogZGF0YS4nXG4gICAgfSxcbiAgICB4OiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMueCwge2ltcGxpZWRFZGl0czoge3h0eXBlOiAnYXJyYXknfX0pLFxuICAgIHgwOiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMueDAsIHtpbXBsaWVkRWRpdHM6IHt4dHlwZTogJ3NjYWxlZCd9fSksXG4gICAgZHg6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5keCwge2ltcGxpZWRFZGl0czoge3h0eXBlOiAnc2NhbGVkJ319KSxcbiAgICB5OiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMueSwge2ltcGxpZWRFZGl0czoge3l0eXBlOiAnYXJyYXknfX0pLFxuICAgIHkwOiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMueTAsIHtpbXBsaWVkRWRpdHM6IHt5dHlwZTogJ3NjYWxlZCd9fSksXG4gICAgZHk6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5keSwge2ltcGxpZWRFZGl0czoge3l0eXBlOiAnc2NhbGVkJ319KSxcblxuICAgIHRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggeiB2YWx1ZS4nXG4gICAgfSxcbiAgICBob3ZlcnRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NhbWUgYXMgYHRleHRgLidcbiAgICB9LFxuICAgIHRyYW5zcG9zZToge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVHJhbnNwb3NlcyB0aGUgeiBkYXRhLidcbiAgICB9LFxuICAgIHh0eXBlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ2FycmF5JywgJ3NjYWxlZCddLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgKmFycmF5KiwgdGhlIGhlYXRtYXBcXCdzIHggY29vcmRpbmF0ZXMgYXJlIGdpdmVuIGJ5ICp4KicsXG4gICAgICAgICAgICAnKHRoZSBkZWZhdWx0IGJlaGF2aW9yIHdoZW4gYHhgIGlzIHByb3ZpZGVkKS4nLFxuICAgICAgICAgICAgJ0lmICpzY2FsZWQqLCB0aGUgaGVhdG1hcFxcJ3MgeCBjb29yZGluYXRlcyBhcmUgZ2l2ZW4gYnkgKngwKiBhbmQgKmR4KicsXG4gICAgICAgICAgICAnKHRoZSBkZWZhdWx0IGJlaGF2aW9yIHdoZW4gYHhgIGlzIG5vdCBwcm92aWRlZCkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeXR5cGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnYXJyYXknLCAnc2NhbGVkJ10sXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdJZiAqYXJyYXkqLCB0aGUgaGVhdG1hcFxcJ3MgeSBjb29yZGluYXRlcyBhcmUgZ2l2ZW4gYnkgKnkqJyxcbiAgICAgICAgICAgICcodGhlIGRlZmF1bHQgYmVoYXZpb3Igd2hlbiBgeWAgaXMgcHJvdmlkZWQpJyxcbiAgICAgICAgICAgICdJZiAqc2NhbGVkKiwgdGhlIGhlYXRtYXBcXCdzIHkgY29vcmRpbmF0ZXMgYXJlIGdpdmVuIGJ5ICp5MCogYW5kICpkeSonLFxuICAgICAgICAgICAgJyh0aGUgZGVmYXVsdCBiZWhhdmlvciB3aGVuIGB5YCBpcyBub3QgcHJvdmlkZWQpJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgenNtb290aDoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydmYXN0JywgJ2Jlc3QnLCBmYWxzZV0sXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1BpY2tzIGEgc21vb3RoaW5nIGFsZ29yaXRobSB1c2UgdG8gc21vb3RoIGB6YCBkYXRhLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGhvdmVyb25nYXBzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdub25lJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGdhcHMnLFxuICAgICAgICAgICAgJyhpLmUuIHtuYW59IG9yIG1pc3NpbmcgdmFsdWVzKScsXG4gICAgICAgICAgICAnaW4gdGhlIGB6YCBkYXRhIGhhdmUgaG92ZXIgbGFiZWxzIGFzc29jaWF0ZWQgd2l0aCB0aGVtLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGNvbm5lY3RnYXBzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgZ2FwcycsXG4gICAgICAgICAgICAnKGkuZS4ge25hbn0gb3IgbWlzc2luZyB2YWx1ZXMpJyxcbiAgICAgICAgICAgICdpbiB0aGUgYHpgIGRhdGEgYXJlIGZpbGxlZCBpbi4nLFxuICAgICAgICAgICAgJ0l0IGlzIGRlZmF1bHRlZCB0byB0cnVlIGlmIGB6YCBpcyBhJyxcbiAgICAgICAgICAgICdvbmUgZGltZW5zaW9uYWwgYXJyYXkgYW5kIGB6c21vb3RoYCBpcyBub3QgZmFsc2U7JyxcbiAgICAgICAgICAgICdvdGhlcndpc2UgaXQgaXMgZGVmYXVsdGVkIHRvIGZhbHNlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHhnYXA6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IDAsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBob3Jpem9udGFsIGdhcCAoaW4gcGl4ZWxzKSBiZXR3ZWVuIGJyaWNrcy4nXG4gICAgfSxcbiAgICB5Z2FwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgdmVydGljYWwgZ2FwIChpbiBwaXhlbHMpIGJldHdlZW4gYnJpY2tzLidcbiAgICB9LFxuICAgIHpob3ZlcmZvcm1hdDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnbm9uZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgaG92ZXIgdGV4dCBmb3JtYXR0aW5nIHJ1bGUgdXNpbmcgZDMgZm9ybWF0dGluZyBtaW5pLWxhbmd1YWdlcycsXG4gICAgICAgICAgICAnd2hpY2ggYXJlIHZlcnkgc2ltaWxhciB0byB0aG9zZSBpbiBQeXRob24uIFNlZTonLFxuICAgICAgICAgICAgRk9STUFUX0xJTktcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycygpLFxuICAgIHNob3dsZWdlbmQ6IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5zaG93bGVnZW5kLCB7ZGZsdDogZmFsc2V9KVxufSwge1xuICAgIHRyYW5zZm9ybXM6IHVuZGVmaW5lZFxufSxcbiAgICBjb2xvclNjYWxlQXR0cnMoJycsIHtjTGV0dGVyOiAneicsIGF1dG9Db2xvckRmbHQ6IGZhbHNlfSlcbik7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2xlYW4yZEFycmF5KHpPbGQsIHRyYWNlLCB4YSwgeWEpIHtcbiAgICB2YXIgcm93bGVuLCBjb2xsZW4sIGdldENvbGxlbiwgb2xkMm5ldywgaSwgajtcblxuICAgIGZ1bmN0aW9uIGNsZWFuWnZhbHVlKHYpIHtcbiAgICAgICAgaWYoIWlzTnVtZXJpYyh2KSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuICt2O1xuICAgIH1cblxuICAgIGlmKHRyYWNlICYmIHRyYWNlLnRyYW5zcG9zZSkge1xuICAgICAgICByb3dsZW4gPSAwO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCB6T2xkLmxlbmd0aDsgaSsrKSByb3dsZW4gPSBNYXRoLm1heChyb3dsZW4sIHpPbGRbaV0ubGVuZ3RoKTtcbiAgICAgICAgaWYocm93bGVuID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGdldENvbGxlbiA9IGZ1bmN0aW9uKHpPbGQpIHsgcmV0dXJuIHpPbGQubGVuZ3RoOyB9O1xuICAgICAgICBvbGQybmV3ID0gZnVuY3Rpb24oek9sZCwgaSwgaikgeyByZXR1cm4gKHpPbGRbal0gfHwgW10pW2ldOyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd2xlbiA9IHpPbGQubGVuZ3RoO1xuICAgICAgICBnZXRDb2xsZW4gPSBmdW5jdGlvbih6T2xkLCBpKSB7IHJldHVybiB6T2xkW2ldLmxlbmd0aDsgfTtcbiAgICAgICAgb2xkMm5ldyA9IGZ1bmN0aW9uKHpPbGQsIGksIGopIHsgcmV0dXJuICh6T2xkW2ldIHx8IFtdKVtqXTsgfTtcbiAgICB9XG5cbiAgICB2YXIgcGFkT2xkMm5ldyA9IGZ1bmN0aW9uKHpPbGQsIGksIGopIHtcbiAgICAgICAgaWYoaSA9PT0gQkFETlVNIHx8IGogPT09IEJBRE5VTSkgcmV0dXJuIEJBRE5VTTtcbiAgICAgICAgcmV0dXJuIG9sZDJuZXcoek9sZCwgaSwgaik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGF4aXNNYXBwaW5nKGF4KSB7XG4gICAgICAgIGlmKHRyYWNlICYmIHRyYWNlLnR5cGUgIT09ICdjYXJwZXQnICYmIHRyYWNlLnR5cGUgIT09ICdjb250b3VyY2FycGV0JyAmJlxuICAgICAgICAgICAgYXggJiYgYXgudHlwZSA9PT0gJ2NhdGVnb3J5JyAmJiB0cmFjZVsnXycgKyBheC5faWQuY2hhckF0KDApXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBheExldHRlciA9IGF4Ll9pZC5jaGFyQXQoMCk7XG4gICAgICAgICAgICB2YXIgYXhNYXBwaW5nID0ge307XG4gICAgICAgICAgICB2YXIgdHJhY2VDYXRlZ29yaWVzID0gdHJhY2VbJ18nICsgYXhMZXR0ZXIgKyAnQ2F0ZWdvcnlNYXAnXSB8fCB0cmFjZVtheExldHRlcl07XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0cmFjZUNhdGVnb3JpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBheE1hcHBpbmdbdHJhY2VDYXRlZ29yaWVzW2ldXSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmQgPSBheE1hcHBpbmdbYXguX2NhdGVnb3JpZXNbaV1dO1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmQgKyAxID8gaW5kIDogQkFETlVNO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBMaWIuaWRlbnRpdHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeE1hcCA9IGF4aXNNYXBwaW5nKHhhKTtcbiAgICB2YXIgeU1hcCA9IGF4aXNNYXBwaW5nKHlhKTtcblxuICAgIGlmKHlhICYmIHlhLnR5cGUgPT09ICdjYXRlZ29yeScpIHJvd2xlbiA9IHlhLl9jYXRlZ29yaWVzLmxlbmd0aDtcbiAgICB2YXIgek5ldyA9IG5ldyBBcnJheShyb3dsZW4pO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgcm93bGVuOyBpKyspIHtcbiAgICAgICAgaWYoeGEgJiYgeGEudHlwZSA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICAgICAgY29sbGVuID0geGEuX2NhdGVnb3JpZXMubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sbGVuID0gZ2V0Q29sbGVuKHpPbGQsIGkpO1xuICAgICAgICB9XG4gICAgICAgIHpOZXdbaV0gPSBuZXcgQXJyYXkoY29sbGVuKTtcbiAgICAgICAgZm9yKGogPSAwOyBqIDwgY29sbGVuOyBqKyspIHpOZXdbaV1bal0gPSBjbGVhblp2YWx1ZShwYWRPbGQybmV3KHpPbGQsIHlNYXAoaSksIHhNYXAoaikpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gek5ldztcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29udmVydENvbHVtbkRhdGEodHJhY2UsIGF4MSwgYXgyLCB2YXIxTmFtZSwgdmFyMk5hbWUsIGFycmF5VmFyTmFtZXMpIHtcbiAgICB2YXIgY29sTGVuID0gdHJhY2UuX2xlbmd0aDtcbiAgICB2YXIgY29sMSA9IGF4MS5tYWtlQ2FsY2RhdGEodHJhY2UsIHZhcjFOYW1lKTtcbiAgICB2YXIgY29sMiA9IGF4Mi5tYWtlQ2FsY2RhdGEodHJhY2UsIHZhcjJOYW1lKTtcbiAgICB2YXIgdGV4dENvbCA9IHRyYWNlLnRleHQ7XG4gICAgdmFyIGhhc0NvbHVtblRleHQgPSAodGV4dENvbCAhPT0gdW5kZWZpbmVkICYmIExpYi5pc0FycmF5MUQodGV4dENvbCkpO1xuICAgIHZhciBob3ZlclRleHRDb2wgPSB0cmFjZS5ob3ZlcnRleHQ7XG4gICAgdmFyIGhhc0NvbHVtbkhvdmVyVGV4dCA9IChob3ZlclRleHRDb2wgIT09IHVuZGVmaW5lZCAmJiBMaWIuaXNBcnJheTFEKGhvdmVyVGV4dENvbCkpO1xuICAgIHZhciBpLCBqO1xuXG4gICAgdmFyIGNvbDFkdiA9IExpYi5kaXN0aW5jdFZhbHMoY29sMSk7XG4gICAgdmFyIGNvbDF2YWxzID0gY29sMWR2LnZhbHM7XG4gICAgdmFyIGNvbDJkdiA9IExpYi5kaXN0aW5jdFZhbHMoY29sMik7XG4gICAgdmFyIGNvbDJ2YWxzID0gY29sMmR2LnZhbHM7XG4gICAgdmFyIG5ld0FycmF5cyA9IFtdO1xuICAgIHZhciB0ZXh0O1xuICAgIHZhciBob3ZlcnRleHQ7XG5cbiAgICB2YXIgbkkgPSBjb2wydmFscy5sZW5ndGg7XG4gICAgdmFyIG5KID0gY29sMXZhbHMubGVuZ3RoO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgYXJyYXlWYXJOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBuZXdBcnJheXNbaV0gPSBMaWIuaW5pdDJkQXJyYXkobkksIG5KKTtcbiAgICB9XG5cbiAgICBpZihoYXNDb2x1bW5UZXh0KSB7XG4gICAgICAgIHRleHQgPSBMaWIuaW5pdDJkQXJyYXkobkksIG5KKTtcbiAgICB9XG4gICAgaWYoaGFzQ29sdW1uSG92ZXJUZXh0KSB7XG4gICAgICAgIGhvdmVydGV4dCA9IExpYi5pbml0MmRBcnJheShuSSwgbkopO1xuICAgIH1cblxuICAgIHZhciBhZnRlcjJiZWZvcmUgPSBMaWIuaW5pdDJkQXJyYXkobkksIG5KKTtcblxuICAgIGZvcihpID0gMDsgaSA8IGNvbExlbjsgaSsrKSB7XG4gICAgICAgIGlmKGNvbDFbaV0gIT09IEJBRE5VTSAmJiBjb2wyW2ldICE9PSBCQUROVU0pIHtcbiAgICAgICAgICAgIHZhciBpMSA9IExpYi5maW5kQmluKGNvbDFbaV0gKyBjb2wxZHYubWluRGlmZiAvIDIsIGNvbDF2YWxzKTtcbiAgICAgICAgICAgIHZhciBpMiA9IExpYi5maW5kQmluKGNvbDJbaV0gKyBjb2wyZHYubWluRGlmZiAvIDIsIGNvbDJ2YWxzKTtcblxuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgYXJyYXlWYXJOYW1lcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBhcnJheVZhck5hbWUgPSBhcnJheVZhck5hbWVzW2pdO1xuICAgICAgICAgICAgICAgIHZhciBhcnJheVZhciA9IHRyYWNlW2FycmF5VmFyTmFtZV07XG4gICAgICAgICAgICAgICAgdmFyIG5ld0FycmF5ID0gbmV3QXJyYXlzW2pdO1xuICAgICAgICAgICAgICAgIG5ld0FycmF5W2kyXVtpMV0gPSBhcnJheVZhcltpXTtcbiAgICAgICAgICAgICAgICBhZnRlcjJiZWZvcmVbaTJdW2kxXSA9IGk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGhhc0NvbHVtblRleHQpIHRleHRbaTJdW2kxXSA9IHRleHRDb2xbaV07XG4gICAgICAgICAgICBpZihoYXNDb2x1bW5Ib3ZlclRleHQpIGhvdmVydGV4dFtpMl1baTFdID0gaG92ZXJUZXh0Q29sW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhY2VbJ18nICsgdmFyMU5hbWVdID0gY29sMXZhbHM7XG4gICAgdHJhY2VbJ18nICsgdmFyMk5hbWVdID0gY29sMnZhbHM7XG4gICAgZm9yKGogPSAwOyBqIDwgYXJyYXlWYXJOYW1lcy5sZW5ndGg7IGorKykge1xuICAgICAgICB0cmFjZVsnXycgKyBhcnJheVZhck5hbWVzW2pdXSA9IG5ld0FycmF5c1tqXTtcbiAgICB9XG4gICAgaWYoaGFzQ29sdW1uVGV4dCkgdHJhY2UuX3RleHQgPSB0ZXh0O1xuICAgIGlmKGhhc0NvbHVtbkhvdmVyVGV4dCkgdHJhY2UuX2hvdmVydGV4dCA9IGhvdmVydGV4dDtcblxuICAgIGlmKGF4MSAmJiBheDEudHlwZSA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICB0cmFjZVsnXycgKyB2YXIxTmFtZSArICdDYXRlZ29yeU1hcCddID0gY29sMXZhbHMubWFwKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGF4MS5fY2F0ZWdvcmllc1t2XTt9KTtcbiAgICB9XG5cbiAgICBpZihheDIgJiYgYXgyLnR5cGUgPT09ICdjYXRlZ29yeScpIHtcbiAgICAgICAgdHJhY2VbJ18nICsgdmFyMk5hbWUgKyAnQ2F0ZWdvcnlNYXAnXSA9IGNvbDJ2YWxzLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiBheDIuX2NhdGVnb3JpZXNbdl07fSk7XG4gICAgfVxuXG4gICAgdHJhY2UuX2FmdGVyMmJlZm9yZSA9IGFmdGVyMmJlZm9yZTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBtYXhSb3dMZW5ndGggPSByZXF1aXJlKCcuLi8uLi9saWInKS5tYXhSb3dMZW5ndGg7XG5cbi8qIFJldHVybiBhIGxpc3Qgb2YgZW1wdHkgcG9pbnRzIGluIDJEIGFycmF5IHpcbiAqIGVhY2ggZW1wdHkgcG9pbnQgeltpXVtqXSBnaXZlcyBhbiBhcnJheSBbaSwgaiwgbmVpZ2hib3JDb3VudF1cbiAqIG5laWdoYm9yQ291bnQgaXMgdGhlIGNvdW50IG9mIDQgbmVhcmVzdCBuZWlnaGJvcnMgdGhhdCBETyBleGlzdFxuICogdGhpcyBpcyB0byBnaXZlIHVzIGFuIG9yZGVyIG9mIHBvaW50cyB0byBldmFsdWF0ZSBmb3IgaW50ZXJwb2xhdGlvbi5cbiAqIGlmIG5vIG5laWdoYm9ycyBleGlzdCwgd2UgaXRlcmF0aXZlbHkgbG9vayBmb3IgbmVpZ2hib3JzIHRoYXQgSEFWRVxuICogbmVpZ2hib3JzLCBhbmQgYWRkIGEgZnJhY3Rpb25hbCBuZWlnaGJvckNvdW50XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmluZEVtcHRpZXMoeikge1xuICAgIHZhciBlbXB0aWVzID0gW107XG4gICAgdmFyIG5laWdoYm9ySGFzaCA9IHt9O1xuICAgIHZhciBub05laWdoYm9yTGlzdCA9IFtdO1xuICAgIHZhciBuZXh0Um93ID0gelswXTtcbiAgICB2YXIgcm93ID0gW107XG4gICAgdmFyIGJsYW5rID0gWzAsIDAsIDBdO1xuICAgIHZhciByb3dMZW5ndGggPSBtYXhSb3dMZW5ndGgoeik7XG4gICAgdmFyIHByZXZSb3c7XG4gICAgdmFyIGk7XG4gICAgdmFyIGo7XG4gICAgdmFyIHRoaXNQdDtcbiAgICB2YXIgcDtcbiAgICB2YXIgbmVpZ2hib3JDb3VudDtcbiAgICB2YXIgbmV3TmVpZ2hib3JIYXNoO1xuICAgIHZhciBmb3VuZE5ld05laWdoYm9ycztcblxuICAgIGZvcihpID0gMDsgaSA8IHoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJldlJvdyA9IHJvdztcbiAgICAgICAgcm93ID0gbmV4dFJvdztcbiAgICAgICAgbmV4dFJvdyA9IHpbaSArIDFdIHx8IFtdO1xuICAgICAgICBmb3IoaiA9IDA7IGogPCByb3dMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYocm93W2pdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBuZWlnaGJvckNvdW50ID0gKHJvd1tqIC0gMV0gIT09IHVuZGVmaW5lZCA/IDEgOiAwKSArXG4gICAgICAgICAgICAgICAgICAgIChyb3dbaiArIDFdICE9PSB1bmRlZmluZWQgPyAxIDogMCkgK1xuICAgICAgICAgICAgICAgICAgICAocHJldlJvd1tqXSAhPT0gdW5kZWZpbmVkID8gMSA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgKG5leHRSb3dbal0gIT09IHVuZGVmaW5lZCA/IDEgOiAwKTtcblxuICAgICAgICAgICAgICAgIGlmKG5laWdoYm9yQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIHRoaXMgcHVycG9zZSwgZG9uJ3QgY291bnQgb2ZmLXRoZS1lZGdlIHBvaW50c1xuICAgICAgICAgICAgICAgICAgICAvLyBhcyB1bmRlZmluZWQgbmVpZ2hib3JzXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPT09IDApIG5laWdoYm9yQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgaWYoaiA9PT0gMCkgbmVpZ2hib3JDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBpZihpID09PSB6Lmxlbmd0aCAtIDEpIG5laWdoYm9yQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgaWYoaiA9PT0gcm93Lmxlbmd0aCAtIDEpIG5laWdoYm9yQ291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBhbGwgbmVpZ2hib3JzIHRoYXQgY291bGQgZXhpc3QgZG8sIHdlIGRvbid0XG4gICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdGhpcyBmb3IgZmluZGluZyBmYXJ0aGVyIG5laWdoYm9yc1xuICAgICAgICAgICAgICAgICAgICBpZihuZWlnaGJvckNvdW50IDwgNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JIYXNoW1tpLCBqXV0gPSBbaSwgaiwgbmVpZ2hib3JDb3VudF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbXB0aWVzLnB1c2goW2ksIGosIG5laWdoYm9yQ291bnRdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Ugbm9OZWlnaGJvckxpc3QucHVzaChbaSwgal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUobm9OZWlnaGJvckxpc3QubGVuZ3RoKSB7XG4gICAgICAgIG5ld05laWdoYm9ySGFzaCA9IHt9O1xuICAgICAgICBmb3VuZE5ld05laWdoYm9ycyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGxvb2sgZm9yIGNlbGxzIHRoYXQgbm93IGhhdmUgbmVpZ2hib3JzIGJ1dCBkaWRuJ3QgYmVmb3JlXG4gICAgICAgIGZvcihwID0gbm9OZWlnaGJvckxpc3QubGVuZ3RoIC0gMTsgcCA+PSAwOyBwLS0pIHtcbiAgICAgICAgICAgIHRoaXNQdCA9IG5vTmVpZ2hib3JMaXN0W3BdO1xuICAgICAgICAgICAgaSA9IHRoaXNQdFswXTtcbiAgICAgICAgICAgIGogPSB0aGlzUHRbMV07XG5cbiAgICAgICAgICAgIG5laWdoYm9yQ291bnQgPSAoKG5laWdoYm9ySGFzaFtbaSAtIDEsIGpdXSB8fCBibGFuaylbMl0gK1xuICAgICAgICAgICAgICAgIChuZWlnaGJvckhhc2hbW2kgKyAxLCBqXV0gfHwgYmxhbmspWzJdICtcbiAgICAgICAgICAgICAgICAobmVpZ2hib3JIYXNoW1tpLCBqIC0gMV1dIHx8IGJsYW5rKVsyXSArXG4gICAgICAgICAgICAgICAgKG5laWdoYm9ySGFzaFtbaSwgaiArIDFdXSB8fCBibGFuaylbMl0pIC8gMjA7XG5cbiAgICAgICAgICAgIGlmKG5laWdoYm9yQ291bnQpIHtcbiAgICAgICAgICAgICAgICBuZXdOZWlnaGJvckhhc2hbdGhpc1B0XSA9IFtpLCBqLCBuZWlnaGJvckNvdW50XTtcbiAgICAgICAgICAgICAgICBub05laWdoYm9yTGlzdC5zcGxpY2UocCwgMSk7XG4gICAgICAgICAgICAgICAgZm91bmROZXdOZWlnaGJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWZvdW5kTmV3TmVpZ2hib3JzKSB7XG4gICAgICAgICAgICB0aHJvdyAnZmluZEVtcHRpZXMgaXRlcmF0ZWQgd2l0aCBubyBuZXcgbmVpZ2hib3JzJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHB1dCB0aGVzZSBuZXcgY2VsbHMgaW50byB0aGUgbWFpbiBuZWlnaGJvciBsaXN0XG4gICAgICAgIGZvcih0aGlzUHQgaW4gbmV3TmVpZ2hib3JIYXNoKSB7XG4gICAgICAgICAgICBuZWlnaGJvckhhc2hbdGhpc1B0XSA9IG5ld05laWdoYm9ySGFzaFt0aGlzUHRdO1xuICAgICAgICAgICAgZW1wdGllcy5wdXNoKG5ld05laWdoYm9ySGFzaFt0aGlzUHRdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNvcnQgdGhlIGZ1bGwgbGlzdCBpbiBkZXNjZW5kaW5nIG9yZGVyIG9mIG5laWdoYm9yIGNvdW50XG4gICAgcmV0dXJuIGVtcHRpZXMuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBiWzJdIC0gYVsyXTsgfSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBJTlRFUlBUSFJFU0hPTEQgPSAxZS0yO1xudmFyIE5FSUdIQk9SU0hJRlRTID0gW1stMSwgMF0sIFsxLCAwXSwgWzAsIC0xXSwgWzAsIDFdXTtcblxuZnVuY3Rpb24gY29ycmVjdGlvbk92ZXJzaG9vdChtYXhGcmFjdGlvbmFsQ2hhbmdlKSB7XG4gICAgLy8gc3RhcnQgd2l0aCBsZXNzIG92ZXJzaG9vdCwgdW50aWwgd2Uga25vdyBpdCdzIGNvbnZlcmdpbmcsXG4gICAgLy8gdGhlbiByYW1wIHVwIHRoZSBvdmVyc2hvb3QgZm9yIGZhc3RlciBjb252ZXJnZW5jZVxuICAgIHJldHVybiAwLjUgLSAwLjI1ICogTWF0aC5taW4oMSwgbWF4RnJhY3Rpb25hbENoYW5nZSAqIDAuNSk7XG59XG5cbi8qXG4gKiBpbnRlcnAyZDogRmlsbCBpbiBtaXNzaW5nIGRhdGEgZnJvbSBhIDJEIGFycmF5IHVzaW5nIGFuIGl0ZXJhdGl2ZVxuICogICBwb2lzc29uIGVxdWF0aW9uIHNvbHZlciB3aXRoIHplcm8tZGVyaXZhdGl2ZSBCQyBhdCBlZGdlcy5cbiAqICAgQW1hemluZ2x5LCB0aGlzIGp1c3QgYW1vdW50cyB0byByZXBlYXRlZGx5IGF2ZXJhZ2luZyBhbGwgdGhlIGV4aXN0aW5nXG4gKiAgIG5lYXJlc3QgbmVpZ2hib3JzLCBhdCBsZWFzdCBpZiB3ZSBkb24ndCB0YWtlIHgveSBzY2FsaW5nIGludG8gYWNjb3VudCxcbiAqICAgd2hpY2ggaXMgdGhlIHJpZ2h0IGFwcHJvYWNoIGhlcmUgd2hlcmUgeCBhbmQgeSBtYXkgbm90IGV2ZW4gaGF2ZSB0aGVcbiAqICAgc2FtZSB1bml0cy5cbiAqXG4gKiBAcGFyYW0ge2FycmF5IG9mIGFycmF5c30gelxuICogICAgICBUaGUgMkQgYXJyYXkgdG8gZmlsbCBpbi4gV2lsbCBiZSBtdXRhdGVkIGhlcmUuIEFzc3VtZWQgdG8gYWxyZWFkeSBiZVxuICogICAgICBjbGVhbmVkLCBzbyBhbGwgZW50cmllcyBhcmUgbnVtYmVycyBleGNlcHQgZ2Fwcywgd2hpY2ggYXJlIGB1bmRlZmluZWRgLlxuICogQHBhcmFtIHthcnJheSBvZiBhcnJheXN9IGVtcHR5UG9pbnRzXG4gKiAgICAgIEVhY2ggZW50cnkgW2ksIGosIG5laWdoYm9yQ291bnRdIGZvciBlbXB0eSBwb2ludHMgeltpXVtqXSBhbmQgdGhlIG51bWJlclxuICogICAgICBvZiBuZWlnaGJvcnMgdGhhdCBhcmUgKm5vdCogbWlzc2luZy4gQXNzdW1lZCB0byBiZSBzb3J0ZWQgZnJvbSBtb3N0IHRvXG4gKiAgICAgIGxlYXN0IG5laWdoYm9ycywgYXMgcHJvZHVjZWQgYnkgaGVhdG1hcC9maW5kX2VtcHRpZXMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW50ZXJwMmQoeiwgZW1wdHlQb2ludHMpIHtcbiAgICB2YXIgbWF4RnJhY3Rpb25hbENoYW5nZSA9IDE7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBvbmUgcGFzcyB0byBmaWxsIGluIGEgc3RhcnRpbmcgdmFsdWUgZm9yIGFsbCB0aGUgZW1wdGllc1xuICAgIGl0ZXJhdGVJbnRlcnAyZCh6LCBlbXB0eVBvaW50cyk7XG5cbiAgICAvLyB3ZSdyZSBkb24ndCBuZWVkIHRvIGl0ZXJhdGUgbG9uZSBlbXB0aWVzIC0gcmVtb3ZlIHRoZW1cbiAgICBmb3IoaSA9IDA7IGkgPCBlbXB0eVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihlbXB0eVBvaW50c1tpXVsyXSA8IDQpIGJyZWFrO1xuICAgIH1cbiAgICAvLyBidXQgZG9uJ3QgcmVtb3ZlIHRoZXNlIHBvaW50cyBmcm9tIHRoZSBvcmlnaW5hbCBhcnJheSxcbiAgICAvLyB3ZSdsbCB1c2UgdGhlbSBmb3IgbWFza2luZywgc28gbWFrZSBhIGNvcHkuXG4gICAgZW1wdHlQb2ludHMgPSBlbXB0eVBvaW50cy5zbGljZShpKTtcblxuICAgIGZvcihpID0gMDsgaSA8IDEwMCAmJiBtYXhGcmFjdGlvbmFsQ2hhbmdlID4gSU5URVJQVEhSRVNIT0xEOyBpKyspIHtcbiAgICAgICAgbWF4RnJhY3Rpb25hbENoYW5nZSA9IGl0ZXJhdGVJbnRlcnAyZCh6LCBlbXB0eVBvaW50cyxcbiAgICAgICAgICAgIGNvcnJlY3Rpb25PdmVyc2hvb3QobWF4RnJhY3Rpb25hbENoYW5nZSkpO1xuICAgIH1cbiAgICBpZihtYXhGcmFjdGlvbmFsQ2hhbmdlID4gSU5URVJQVEhSRVNIT0xEKSB7XG4gICAgICAgIExpYi5sb2coJ2ludGVycDJkIGRpZG5cXCd0IGNvbnZlcmdlIHF1aWNrbHknLCBtYXhGcmFjdGlvbmFsQ2hhbmdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gejtcbn07XG5cbmZ1bmN0aW9uIGl0ZXJhdGVJbnRlcnAyZCh6LCBlbXB0eVBvaW50cywgb3ZlcnNob290KSB7XG4gICAgdmFyIG1heEZyYWN0aW9uYWxDaGFuZ2UgPSAwO1xuICAgIHZhciB0aGlzUHQ7XG4gICAgdmFyIGk7XG4gICAgdmFyIGo7XG4gICAgdmFyIHA7XG4gICAgdmFyIHE7XG4gICAgdmFyIG5laWdoYm9yU2hpZnQ7XG4gICAgdmFyIG5laWdoYm9yUm93O1xuICAgIHZhciBuZWlnaGJvclZhbDtcbiAgICB2YXIgbmVpZ2hib3JDb3VudDtcbiAgICB2YXIgbmVpZ2hib3JTdW07XG4gICAgdmFyIGluaXRpYWxWYWw7XG4gICAgdmFyIG1pbk5laWdoYm9yO1xuICAgIHZhciBtYXhOZWlnaGJvcjtcblxuICAgIGZvcihwID0gMDsgcCA8IGVtcHR5UG9pbnRzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIHRoaXNQdCA9IGVtcHR5UG9pbnRzW3BdO1xuICAgICAgICBpID0gdGhpc1B0WzBdO1xuICAgICAgICBqID0gdGhpc1B0WzFdO1xuICAgICAgICBpbml0aWFsVmFsID0geltpXVtqXTtcbiAgICAgICAgbmVpZ2hib3JTdW0gPSAwO1xuICAgICAgICBuZWlnaGJvckNvdW50ID0gMDtcblxuICAgICAgICBmb3IocSA9IDA7IHEgPCA0OyBxKyspIHtcbiAgICAgICAgICAgIG5laWdoYm9yU2hpZnQgPSBORUlHSEJPUlNISUZUU1txXTtcbiAgICAgICAgICAgIG5laWdoYm9yUm93ID0geltpICsgbmVpZ2hib3JTaGlmdFswXV07XG4gICAgICAgICAgICBpZighbmVpZ2hib3JSb3cpIGNvbnRpbnVlO1xuICAgICAgICAgICAgbmVpZ2hib3JWYWwgPSBuZWlnaGJvclJvd1tqICsgbmVpZ2hib3JTaGlmdFsxXV07XG4gICAgICAgICAgICBpZihuZWlnaGJvclZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYobmVpZ2hib3JTdW0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbWluTmVpZ2hib3IgPSBtYXhOZWlnaGJvciA9IG5laWdoYm9yVmFsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbk5laWdoYm9yID0gTWF0aC5taW4obWluTmVpZ2hib3IsIG5laWdoYm9yVmFsKTtcbiAgICAgICAgICAgICAgICAgICAgbWF4TmVpZ2hib3IgPSBNYXRoLm1heChtYXhOZWlnaGJvciwgbmVpZ2hib3JWYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZWlnaGJvckNvdW50Kys7XG4gICAgICAgICAgICAgICAgbmVpZ2hib3JTdW0gKz0gbmVpZ2hib3JWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihuZWlnaGJvckNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyAnaXRlcmF0ZUludGVycDJkIG9yZGVyIGlzIHdyb25nOiBubyBkZWZpbmVkIG5laWdoYm9ycyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzIGlzIHRoZSBsYXBsYWNlIGVxdWF0aW9uIGludGVycG9sYXRpb246XG4gICAgICAgIC8vIGVhY2ggcG9pbnQgaXMganVzdCB0aGUgYXZlcmFnZSBvZiBpdHMgbmVpZ2hib3JzXG4gICAgICAgIC8vIG5vdGUgdGhhdCB0aGlzIGlnbm9yZXMgZGlmZmVyZW50aWFsIHgveSBzY2FsaW5nXG4gICAgICAgIC8vIHdoaWNoIEkgdGhpbmsgaXMgdGhlIHJpZ2h0IGFwcHJvYWNoLCBzaW5jZSB3ZVxuICAgICAgICAvLyBkb24ndCBrbm93IHdoYXQgdGhhdCBzY2FsaW5nIG1lYW5zXG4gICAgICAgIHpbaV1bal0gPSBuZWlnaGJvclN1bSAvIG5laWdoYm9yQ291bnQ7XG5cbiAgICAgICAgaWYoaW5pdGlhbFZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihuZWlnaGJvckNvdW50IDwgNCkgbWF4RnJhY3Rpb25hbENoYW5nZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZSBjYW4gbWFrZSBsYXJnZSBlbXB0eSByZWdpb25zIGNvbnZlcmdlIGZhc3RlclxuICAgICAgICAgICAgLy8gaWYgd2Ugb3ZlcnNob290IHRoZSBjaGFuZ2UgdnMgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgICAgICB6W2ldW2pdID0gKDEgKyBvdmVyc2hvb3QpICogeltpXVtqXSAtIG92ZXJzaG9vdCAqIGluaXRpYWxWYWw7XG5cbiAgICAgICAgICAgIGlmKG1heE5laWdoYm9yID4gbWluTmVpZ2hib3IpIHtcbiAgICAgICAgICAgICAgICBtYXhGcmFjdGlvbmFsQ2hhbmdlID0gTWF0aC5tYXgobWF4RnJhY3Rpb25hbENoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoeltpXVtqXSAtIGluaXRpYWxWYWwpIC8gKG1heE5laWdoYm9yIC0gbWluTmVpZ2hib3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXhGcmFjdGlvbmFsQ2hhbmdlO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1ha2VCb3VuZEFycmF5KHRyYWNlLCBhcnJheUluLCB2MEluLCBkdkluLCBudW1icmlja3MsIGF4KSB7XG4gICAgdmFyIGFycmF5T3V0ID0gW107XG4gICAgdmFyIGlzQ29udG91ciA9IFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsICdjb250b3VyJyk7XG4gICAgdmFyIGlzSGlzdCA9IFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsICdoaXN0b2dyYW0nKTtcbiAgICB2YXIgaXNHTDJEID0gUmVnaXN0cnkudHJhY2VJcyh0cmFjZSwgJ2dsMmQnKTtcbiAgICB2YXIgdjA7XG4gICAgdmFyIGR2O1xuICAgIHZhciBpO1xuXG4gICAgdmFyIGlzQXJyYXlPZlR3b0l0ZW1zT3JNb3JlID0gaXNBcnJheU9yVHlwZWRBcnJheShhcnJheUluKSAmJiBhcnJheUluLmxlbmd0aCA+IDE7XG5cbiAgICBpZihpc0FycmF5T2ZUd29JdGVtc09yTW9yZSAmJiAhaXNIaXN0ICYmIChheC50eXBlICE9PSAnY2F0ZWdvcnknKSkge1xuICAgICAgICB2YXIgbGVuID0gYXJyYXlJbi5sZW5ndGg7XG5cbiAgICAgICAgLy8gZ2l2ZW4gdmFscyBhcmUgYnJpY2sgY2VudGVyc1xuICAgICAgICAvLyBob3BlZnVsbHkgbGVuZ3RoID09PSBudW1icmlja3MsIGJ1dCB1c2UgdGhpcyBtZXRob2QgZXZlbiBpZiB0b28gZmV3IGFyZSBzdXBwbGllZFxuICAgICAgICAvLyBhbmQgZXh0ZW5kIGl0IGxpbmVhcmx5IGJhc2VkIG9uIHRoZSBsYXN0IHR3byBwb2ludHNcbiAgICAgICAgaWYobGVuIDw9IG51bWJyaWNrcykge1xuICAgICAgICAgICAgLy8gY29udG91ciBwbG90cyBvbmx5IHdhbnQgdGhlIGNlbnRlcnNcbiAgICAgICAgICAgIGlmKGlzQ29udG91ciB8fCBpc0dMMkQpIGFycmF5T3V0ID0gYXJyYXlJbi5zbGljZSgwLCBudW1icmlja3MpO1xuICAgICAgICAgICAgZWxzZSBpZihudW1icmlja3MgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBhcnJheU91dCA9IFthcnJheUluWzBdIC0gMC41LCBhcnJheUluWzBdICsgMC41XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJyYXlPdXQgPSBbMS41ICogYXJyYXlJblswXSAtIDAuNSAqIGFycmF5SW5bMV1dO1xuXG4gICAgICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlPdXQucHVzaCgoYXJyYXlJbltpIC0gMV0gKyBhcnJheUluW2ldKSAqIDAuNSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYXJyYXlPdXQucHVzaCgxLjUgKiBhcnJheUluW2xlbiAtIDFdIC0gMC41ICogYXJyYXlJbltsZW4gLSAyXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGxlbiA8IG51bWJyaWNrcykge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0UHQgPSBhcnJheU91dFthcnJheU91dC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICB2YXIgZGVsdGEgPSBsYXN0UHQgLSBhcnJheU91dFthcnJheU91dC5sZW5ndGggLSAyXTtcblxuICAgICAgICAgICAgICAgIGZvcihpID0gbGVuOyBpIDwgbnVtYnJpY2tzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFB0ICs9IGRlbHRhO1xuICAgICAgICAgICAgICAgICAgICBhcnJheU91dC5wdXNoKGxhc3RQdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaG9wZWZ1bGx5IGxlbmd0aCA9PT0gbnVtYnJpY2tzKzEsIGJ1dCBkbyBzb21ldGhpbmcgcmVnYXJkbGVzczpcbiAgICAgICAgICAgIC8vIGdpdmVuIHZhbHMgYXJlIGJyaWNrIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIHJldHVybiBpc0NvbnRvdXIgP1xuICAgICAgICAgICAgICAgIGFycmF5SW4uc2xpY2UoMCwgbnVtYnJpY2tzKSA6ICAvLyB3ZSBtdXN0IGJlIHN0cmljdCBmb3IgY29udG91cnNcbiAgICAgICAgICAgICAgICBhcnJheUluLnNsaWNlKDAsIG51bWJyaWNrcyArIDEpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNhbGVuZGFyID0gdHJhY2VbYXguX2lkLmNoYXJBdCgwKSArICdjYWxlbmRhciddO1xuXG4gICAgICAgIGlmKGlzSGlzdCkge1xuICAgICAgICAgICAgdjAgPSBheC5yMmModjBJbiwgMCwgY2FsZW5kYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYoaXNBcnJheU9yVHlwZWRBcnJheShhcnJheUluKSAmJiBhcnJheUluLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHYwID0gYXJyYXlJblswXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih2MEluID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2MCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBmbiA9IGF4LnR5cGUgPT09ICdsb2cnID8gYXguZDJjIDogYXgucjJjO1xuICAgICAgICAgICAgICAgIHYwID0gZm4odjBJbiwgMCwgY2FsZW5kYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZHYgPSBkdkluIHx8IDE7XG5cbiAgICAgICAgZm9yKGkgPSAoaXNDb250b3VyIHx8IGlzR0wyRCkgPyAwIDogLTAuNTsgaSA8IG51bWJyaWNrczsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheU91dC5wdXNoKHYwICsgZHYgKiBpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheU91dDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9