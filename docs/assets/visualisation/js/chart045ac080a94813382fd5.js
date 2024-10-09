(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_gl-mat4_fromQuat_js-node_modules_plotly_js_src_plots_cartesian_type_defaults_js--260177"],{

/***/ "./node_modules/gl-mat4/fromQuat.js":
/*!******************************************!*\
  !*** ./node_modules/gl-mat4/fromQuat.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/type_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/type_defaults.js ***!
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



var traceIs = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js").traceIs;
var autoType = __webpack_require__(/*! ./axis_autotype */ "./node_modules/plotly.js/src/plots/cartesian/axis_autotype.js");

/*
 *  data: the plot data to use in choosing auto type
 *  name: axis object name (ie 'xaxis') if one should be stored
 */
module.exports = function handleTypeDefaults(containerIn, containerOut, coerce, options) {
    var axType = coerce('type', (options.splomStash || {}).type);

    if(axType === '-') {
        setAutoType(containerOut, options.data);

        if(containerOut.type === '-') {
            containerOut.type = 'linear';
        } else {
            // copy autoType back to input axis
            // note that if this object didn't exist
            // in the input layout, we have to put it in
            // this happens in the main supplyDefaults function
            containerIn.type = containerOut.type;
        }
    }
};

function setAutoType(ax, data) {
    // new logic: let people specify any type they want,
    // only autotype if type is '-'
    if(ax.type !== '-') return;

    var id = ax._id;
    var axLetter = id.charAt(0);
    var i;

    // support 3d
    if(id.indexOf('scene') !== -1) id = axLetter;

    var d0 = getFirstNonEmptyTrace(data, id, axLetter);
    if(!d0) return;

    // first check for histograms, as the count direction
    // should always default to a linear axis
    if(d0.type === 'histogram' &&
        axLetter === {v: 'y', h: 'x'}[d0.orientation || 'v']
    ) {
        ax.type = 'linear';
        return;
    }

    var calAttr = axLetter + 'calendar';
    var calendar = d0[calAttr];
    var opts = {noMultiCategory: !traceIs(d0, 'cartesian') || traceIs(d0, 'noMultiCategory')};

    // To not confuse 2D x/y used for per-box sample points for multicategory coordinates
    if(d0.type === 'box' && d0._hasPreCompStats &&
        axLetter === {h: 'x', v: 'y'}[d0.orientation || 'v']
    ) {
        opts.noMultiCategory = true;
    }

    // check all boxes on this x axis to see
    // if they're dates, numbers, or categories
    if(isBoxWithoutPositionCoords(d0, axLetter)) {
        var posLetter = getBoxPosLetter(d0);
        var boxPositions = [];

        for(i = 0; i < data.length; i++) {
            var trace = data[i];
            if(!traceIs(trace, 'box-violin') || (trace[axLetter + 'axis'] || axLetter) !== id) continue;

            if(trace[posLetter] !== undefined) boxPositions.push(trace[posLetter][0]);
            else if(trace.name !== undefined) boxPositions.push(trace.name);
            else boxPositions.push('text');

            if(trace[calAttr] !== calendar) calendar = undefined;
        }

        ax.type = autoType(boxPositions, calendar, opts);
    } else if(d0.type === 'splom') {
        var dimensions = d0.dimensions;
        var dim = dimensions[d0._axesDim[id]];
        if(dim.visible) ax.type = autoType(dim.values, calendar, opts);
    } else {
        ax.type = autoType(d0[axLetter] || [d0[axLetter + '0']], calendar, opts);
    }
}

function getFirstNonEmptyTrace(data, id, axLetter) {
    for(var i = 0; i < data.length; i++) {
        var trace = data[i];

        if(trace.type === 'splom' &&
                trace._length > 0 &&
                (trace['_' + axLetter + 'axes'] || {})[id]
        ) {
            return trace;
        }

        if((trace[axLetter + 'axis'] || axLetter) === id) {
            if(isBoxWithoutPositionCoords(trace, axLetter)) {
                return trace;
            } else if((trace[axLetter] || []).length || trace[axLetter + '0']) {
                return trace;
            }
        }
    }
}

function getBoxPosLetter(trace) {
    return {v: 'x', h: 'y'}[trace.orientation || 'v'];
}

function isBoxWithoutPositionCoords(trace, axLetter) {
    var posLetter = getBoxPosLetter(trace);
    var isBox = traceIs(trace, 'box-violin');
    var isCandlestick = traceIs(trace._fullInput || {}, 'candlestick');

    return (
        isBox &&
        !isCandlestick &&
        axLetter === posLetter &&
        trace[posLetter] === undefined &&
        trace[posLetter + '0'] === undefined
    );
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/domain.js":
/*!****************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/domain.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var extendFlat = __webpack_require__(/*! ../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

/**
 * Make a xy domain attribute group
 *
 * @param {object} opts
 *   @param {string}
 *     opts.name: name to be inserted in the default description
 *   @param {boolean}
 *     opts.trace: set to true for trace containers
 *   @param {string}
 *     opts.editType: editType for all pieces
 *   @param {boolean}
 *     opts.noGridCell: set to true to omit `row` and `column`
 *
 * @param {object} extra
 *   @param {string}
 *     extra.description: extra description. N.B we use
 *     a separate extra container to make it compatible with
 *     the compress_attributes transform.
 *
 * @return {object} attributes object containing {x,y} as specified
 */
exports.attributes = function(opts, extra) {
    opts = opts || {};
    extra = extra || {};

    var base = {
        valType: 'info_array',
        role: 'info',
        editType: opts.editType,
        items: [
            {valType: 'number', min: 0, max: 1, editType: opts.editType},
            {valType: 'number', min: 0, max: 1, editType: opts.editType}
        ],
        dflt: [0, 1]
    };

    var namePart = opts.name ? opts.name + ' ' : '';
    var contPart = opts.trace ? 'trace ' : 'subplot ';
    var descPart = extra.description ? ' ' + extra.description : '';

    var out = {
        x: extendFlat({}, base, {
            description: [
                'Sets the horizontal domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        y: extendFlat({}, base, {
            description: [
                'Sets the vertical domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        editType: opts.editType
    };

    if(!opts.noGridCell) {
        out.row = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this row in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
        out.column = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this column in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
    }

    return out;
};

exports.defaults = function(containerOut, layout, coerce, dfltDomains) {
    var dfltX = (dfltDomains && dfltDomains.x) || [0, 1];
    var dfltY = (dfltDomains && dfltDomains.y) || [0, 1];

    var grid = layout.grid;
    if(grid) {
        var column = coerce('domain.column');
        if(column !== undefined) {
            if(column < grid.columns) dfltX = grid._domains.x[column];
            else delete containerOut.domain.column;
        }

        var row = coerce('domain.row');
        if(row !== undefined) {
            if(row < grid.rows) dfltY = grid._domains.y[row];
            else delete containerOut.domain.row;
        }
    }

    var x = coerce('domain.x', dfltX);
    var y = coerce('domain.y', dfltY);

    // don't accept bad input data
    if(!(x[0] < x[1])) containerOut.domain.x = dfltX.slice();
    if(!(y[0] < y[1])) containerOut.domain.y = dfltY.slice();
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl3d/project.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/project.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




function xformMatrix(m, v) {
    var out = [0, 0, 0, 0];
    var i, j;

    for(i = 0; i < 4; ++i) {
        for(j = 0; j < 4; ++j) {
            out[j] += m[4 * i + j] * v[i];
        }
    }

    return out;
}

function project(camera, v) {
    var p = xformMatrix(camera.projection,
        xformMatrix(camera.view,
        xformMatrix(camera.model, [v[0], v[1], v[2], 1])));
    return p;
}

module.exports = project;


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

/***/ "?a259":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvZnJvbVF1YXQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2NhcnRlc2lhbi90eXBlX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9kb21haW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2dsM2QvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvZmluZF9lbXB0aWVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9pbnRlcnAyZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlL2lnbm9yZWR8L2hvbWUvYWxleC9naXQvREl3ZWJzaXRlLXJlZGVzaWduL25vZGVfbW9kdWxlcy9iaWctcmF0L25vZGVfbW9kdWxlcy9ibi5qcy9saWJ8YnVmZmVyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsTUFBTTtBQUNqQixhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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OztBQUVBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbElBLGUiLCJmaWxlIjoiY2hhcnQwNDVhYzA4MGE5NDgxMzM4MmZkNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZnJvbVF1YXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB5eCA9IHkgKiB4MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHp4ID0geiAqIHgyLFxuICAgICAgICB6eSA9IHogKiB5MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgIG91dFsyXSA9IHp4IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcblxuICAgIG91dFs0XSA9IHl4IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtIHh4IC0geno7XG4gICAgb3V0WzZdID0genkgKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuXG4gICAgb3V0WzhdID0genggKyB3eTtcbiAgICBvdXRbOV0gPSB6eSAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0geHggLSB5eTtcbiAgICBvdXRbMTFdID0gMDtcblxuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07IiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJhY2VJcyA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5JykudHJhY2VJcztcbnZhciBhdXRvVHlwZSA9IHJlcXVpcmUoJy4vYXhpc19hdXRvdHlwZScpO1xuXG4vKlxuICogIGRhdGE6IHRoZSBwbG90IGRhdGEgdG8gdXNlIGluIGNob29zaW5nIGF1dG8gdHlwZVxuICogIG5hbWU6IGF4aXMgb2JqZWN0IG5hbWUgKGllICd4YXhpcycpIGlmIG9uZSBzaG91bGQgYmUgc3RvcmVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlVHlwZURlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGNvZXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBheFR5cGUgPSBjb2VyY2UoJ3R5cGUnLCAob3B0aW9ucy5zcGxvbVN0YXNoIHx8IHt9KS50eXBlKTtcblxuICAgIGlmKGF4VHlwZSA9PT0gJy0nKSB7XG4gICAgICAgIHNldEF1dG9UeXBlKGNvbnRhaW5lck91dCwgb3B0aW9ucy5kYXRhKTtcblxuICAgICAgICBpZihjb250YWluZXJPdXQudHlwZSA9PT0gJy0nKSB7XG4gICAgICAgICAgICBjb250YWluZXJPdXQudHlwZSA9ICdsaW5lYXInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29weSBhdXRvVHlwZSBiYWNrIHRvIGlucHV0IGF4aXNcbiAgICAgICAgICAgIC8vIG5vdGUgdGhhdCBpZiB0aGlzIG9iamVjdCBkaWRuJ3QgZXhpc3RcbiAgICAgICAgICAgIC8vIGluIHRoZSBpbnB1dCBsYXlvdXQsIHdlIGhhdmUgdG8gcHV0IGl0IGluXG4gICAgICAgICAgICAvLyB0aGlzIGhhcHBlbnMgaW4gdGhlIG1haW4gc3VwcGx5RGVmYXVsdHMgZnVuY3Rpb25cbiAgICAgICAgICAgIGNvbnRhaW5lckluLnR5cGUgPSBjb250YWluZXJPdXQudHlwZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHNldEF1dG9UeXBlKGF4LCBkYXRhKSB7XG4gICAgLy8gbmV3IGxvZ2ljOiBsZXQgcGVvcGxlIHNwZWNpZnkgYW55IHR5cGUgdGhleSB3YW50LFxuICAgIC8vIG9ubHkgYXV0b3R5cGUgaWYgdHlwZSBpcyAnLSdcbiAgICBpZihheC50eXBlICE9PSAnLScpIHJldHVybjtcblxuICAgIHZhciBpZCA9IGF4Ll9pZDtcbiAgICB2YXIgYXhMZXR0ZXIgPSBpZC5jaGFyQXQoMCk7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBzdXBwb3J0IDNkXG4gICAgaWYoaWQuaW5kZXhPZignc2NlbmUnKSAhPT0gLTEpIGlkID0gYXhMZXR0ZXI7XG5cbiAgICB2YXIgZDAgPSBnZXRGaXJzdE5vbkVtcHR5VHJhY2UoZGF0YSwgaWQsIGF4TGV0dGVyKTtcbiAgICBpZighZDApIHJldHVybjtcblxuICAgIC8vIGZpcnN0IGNoZWNrIGZvciBoaXN0b2dyYW1zLCBhcyB0aGUgY291bnQgZGlyZWN0aW9uXG4gICAgLy8gc2hvdWxkIGFsd2F5cyBkZWZhdWx0IHRvIGEgbGluZWFyIGF4aXNcbiAgICBpZihkMC50eXBlID09PSAnaGlzdG9ncmFtJyAmJlxuICAgICAgICBheExldHRlciA9PT0ge3Y6ICd5JywgaDogJ3gnfVtkMC5vcmllbnRhdGlvbiB8fCAndiddXG4gICAgKSB7XG4gICAgICAgIGF4LnR5cGUgPSAnbGluZWFyJztcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjYWxBdHRyID0gYXhMZXR0ZXIgKyAnY2FsZW5kYXInO1xuICAgIHZhciBjYWxlbmRhciA9IGQwW2NhbEF0dHJdO1xuICAgIHZhciBvcHRzID0ge25vTXVsdGlDYXRlZ29yeTogIXRyYWNlSXMoZDAsICdjYXJ0ZXNpYW4nKSB8fCB0cmFjZUlzKGQwLCAnbm9NdWx0aUNhdGVnb3J5Jyl9O1xuXG4gICAgLy8gVG8gbm90IGNvbmZ1c2UgMkQgeC95IHVzZWQgZm9yIHBlci1ib3ggc2FtcGxlIHBvaW50cyBmb3IgbXVsdGljYXRlZ29yeSBjb29yZGluYXRlc1xuICAgIGlmKGQwLnR5cGUgPT09ICdib3gnICYmIGQwLl9oYXNQcmVDb21wU3RhdHMgJiZcbiAgICAgICAgYXhMZXR0ZXIgPT09IHtoOiAneCcsIHY6ICd5J31bZDAub3JpZW50YXRpb24gfHwgJ3YnXVxuICAgICkge1xuICAgICAgICBvcHRzLm5vTXVsdGlDYXRlZ29yeSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgYWxsIGJveGVzIG9uIHRoaXMgeCBheGlzIHRvIHNlZVxuICAgIC8vIGlmIHRoZXkncmUgZGF0ZXMsIG51bWJlcnMsIG9yIGNhdGVnb3JpZXNcbiAgICBpZihpc0JveFdpdGhvdXRQb3NpdGlvbkNvb3JkcyhkMCwgYXhMZXR0ZXIpKSB7XG4gICAgICAgIHZhciBwb3NMZXR0ZXIgPSBnZXRCb3hQb3NMZXR0ZXIoZDApO1xuICAgICAgICB2YXIgYm94UG9zaXRpb25zID0gW107XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRyYWNlID0gZGF0YVtpXTtcbiAgICAgICAgICAgIGlmKCF0cmFjZUlzKHRyYWNlLCAnYm94LXZpb2xpbicpIHx8ICh0cmFjZVtheExldHRlciArICdheGlzJ10gfHwgYXhMZXR0ZXIpICE9PSBpZCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlW3Bvc0xldHRlcl0gIT09IHVuZGVmaW5lZCkgYm94UG9zaXRpb25zLnB1c2godHJhY2VbcG9zTGV0dGVyXVswXSk7XG4gICAgICAgICAgICBlbHNlIGlmKHRyYWNlLm5hbWUgIT09IHVuZGVmaW5lZCkgYm94UG9zaXRpb25zLnB1c2godHJhY2UubmFtZSk7XG4gICAgICAgICAgICBlbHNlIGJveFBvc2l0aW9ucy5wdXNoKCd0ZXh0Jyk7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlW2NhbEF0dHJdICE9PSBjYWxlbmRhcikgY2FsZW5kYXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBheC50eXBlID0gYXV0b1R5cGUoYm94UG9zaXRpb25zLCBjYWxlbmRhciwgb3B0cyk7XG4gICAgfSBlbHNlIGlmKGQwLnR5cGUgPT09ICdzcGxvbScpIHtcbiAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBkMC5kaW1lbnNpb25zO1xuICAgICAgICB2YXIgZGltID0gZGltZW5zaW9uc1tkMC5fYXhlc0RpbVtpZF1dO1xuICAgICAgICBpZihkaW0udmlzaWJsZSkgYXgudHlwZSA9IGF1dG9UeXBlKGRpbS52YWx1ZXMsIGNhbGVuZGFyLCBvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBheC50eXBlID0gYXV0b1R5cGUoZDBbYXhMZXR0ZXJdIHx8IFtkMFtheExldHRlciArICcwJ11dLCBjYWxlbmRhciwgb3B0cyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRGaXJzdE5vbkVtcHR5VHJhY2UoZGF0YSwgaWQsIGF4TGV0dGVyKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZGF0YVtpXTtcblxuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnc3Bsb20nICYmXG4gICAgICAgICAgICAgICAgdHJhY2UuX2xlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAodHJhY2VbJ18nICsgYXhMZXR0ZXIgKyAnYXhlcyddIHx8IHt9KVtpZF1cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZigodHJhY2VbYXhMZXR0ZXIgKyAnYXhpcyddIHx8IGF4TGV0dGVyKSA9PT0gaWQpIHtcbiAgICAgICAgICAgIGlmKGlzQm94V2l0aG91dFBvc2l0aW9uQ29vcmRzKHRyYWNlLCBheExldHRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYoKHRyYWNlW2F4TGV0dGVyXSB8fCBbXSkubGVuZ3RoIHx8IHRyYWNlW2F4TGV0dGVyICsgJzAnXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0Qm94UG9zTGV0dGVyKHRyYWNlKSB7XG4gICAgcmV0dXJuIHt2OiAneCcsIGg6ICd5J31bdHJhY2Uub3JpZW50YXRpb24gfHwgJ3YnXTtcbn1cblxuZnVuY3Rpb24gaXNCb3hXaXRob3V0UG9zaXRpb25Db29yZHModHJhY2UsIGF4TGV0dGVyKSB7XG4gICAgdmFyIHBvc0xldHRlciA9IGdldEJveFBvc0xldHRlcih0cmFjZSk7XG4gICAgdmFyIGlzQm94ID0gdHJhY2VJcyh0cmFjZSwgJ2JveC12aW9saW4nKTtcbiAgICB2YXIgaXNDYW5kbGVzdGljayA9IHRyYWNlSXModHJhY2UuX2Z1bGxJbnB1dCB8fCB7fSwgJ2NhbmRsZXN0aWNrJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBpc0JveCAmJlxuICAgICAgICAhaXNDYW5kbGVzdGljayAmJlxuICAgICAgICBheExldHRlciA9PT0gcG9zTGV0dGVyICYmXG4gICAgICAgIHRyYWNlW3Bvc0xldHRlcl0gPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0cmFjZVtwb3NMZXR0ZXIgKyAnMCddID09PSB1bmRlZmluZWRcbiAgICApO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG4vKipcbiAqIE1ha2UgYSB4eSBkb21haW4gYXR0cmlidXRlIGdyb3VwXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5uYW1lOiBuYW1lIHRvIGJlIGluc2VydGVkIGluIHRoZSBkZWZhdWx0IGRlc2NyaXB0aW9uXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLnRyYWNlOiBzZXQgdG8gdHJ1ZSBmb3IgdHJhY2UgY29udGFpbmVyc1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLmVkaXRUeXBlOiBlZGl0VHlwZSBmb3IgYWxsIHBpZWNlc1xuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy5ub0dyaWRDZWxsOiBzZXQgdG8gdHJ1ZSB0byBvbWl0IGByb3dgIGFuZCBgY29sdW1uYFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRyYVxuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBleHRyYS5kZXNjcmlwdGlvbjogZXh0cmEgZGVzY3JpcHRpb24uIE4uQiB3ZSB1c2VcbiAqICAgICBhIHNlcGFyYXRlIGV4dHJhIGNvbnRhaW5lciB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aFxuICogICAgIHRoZSBjb21wcmVzc19hdHRyaWJ1dGVzIHRyYW5zZm9ybS5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IGF0dHJpYnV0ZXMgb2JqZWN0IGNvbnRhaW5pbmcge3gseX0gYXMgc3BlY2lmaWVkXG4gKi9cbmV4cG9ydHMuYXR0cmlidXRlcyA9IGZ1bmN0aW9uKG9wdHMsIGV4dHJhKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgZXh0cmEgPSBleHRyYSB8fCB7fTtcblxuICAgIHZhciBiYXNlID0ge1xuICAgICAgICB2YWxUeXBlOiAnaW5mb19hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX0sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX1cbiAgICAgICAgXSxcbiAgICAgICAgZGZsdDogWzAsIDFdXG4gICAgfTtcblxuICAgIHZhciBuYW1lUGFydCA9IG9wdHMubmFtZSA/IG9wdHMubmFtZSArICcgJyA6ICcnO1xuICAgIHZhciBjb250UGFydCA9IG9wdHMudHJhY2UgPyAndHJhY2UgJyA6ICdzdWJwbG90ICc7XG4gICAgdmFyIGRlc2NQYXJ0ID0gZXh0cmEuZGVzY3JpcHRpb24gPyAnICcgKyBleHRyYS5kZXNjcmlwdGlvbiA6ICcnO1xuXG4gICAgdmFyIG91dCA9IHtcbiAgICAgICAgeDogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgaG9yaXpvbnRhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgeTogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdmVydGljYWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlXG4gICAgfTtcblxuICAgIGlmKCFvcHRzLm5vR3JpZENlbGwpIHtcbiAgICAgICAgb3V0LnJvdyA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIHJvdyBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgICAgICBvdXQuY29sdW1uID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgY29sdW1uIGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBmdW5jdGlvbihjb250YWluZXJPdXQsIGxheW91dCwgY29lcmNlLCBkZmx0RG9tYWlucykge1xuICAgIHZhciBkZmx0WCA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy54KSB8fCBbMCwgMV07XG4gICAgdmFyIGRmbHRZID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLnkpIHx8IFswLCAxXTtcblxuICAgIHZhciBncmlkID0gbGF5b3V0LmdyaWQ7XG4gICAgaWYoZ3JpZCkge1xuICAgICAgICB2YXIgY29sdW1uID0gY29lcmNlKCdkb21haW4uY29sdW1uJyk7XG4gICAgICAgIGlmKGNvbHVtbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihjb2x1bW4gPCBncmlkLmNvbHVtbnMpIGRmbHRYID0gZ3JpZC5fZG9tYWlucy54W2NvbHVtbl07XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLmNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3cgPSBjb2VyY2UoJ2RvbWFpbi5yb3cnKTtcbiAgICAgICAgaWYocm93ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKHJvdyA8IGdyaWQucm93cykgZGZsdFkgPSBncmlkLl9kb21haW5zLnlbcm93XTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4ucm93O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHggPSBjb2VyY2UoJ2RvbWFpbi54JywgZGZsdFgpO1xuICAgIHZhciB5ID0gY29lcmNlKCdkb21haW4ueScsIGRmbHRZKTtcblxuICAgIC8vIGRvbid0IGFjY2VwdCBiYWQgaW5wdXQgZGF0YVxuICAgIGlmKCEoeFswXSA8IHhbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnggPSBkZmx0WC5zbGljZSgpO1xuICAgIGlmKCEoeVswXSA8IHlbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnkgPSBkZmx0WS5zbGljZSgpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB4Zm9ybU1hdHJpeChtLCB2KSB7XG4gICAgdmFyIG91dCA9IFswLCAwLCAwLCAwXTtcbiAgICB2YXIgaSwgajtcblxuICAgIGZvcihpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICBmb3IoaiA9IDA7IGogPCA0OyArK2opIHtcbiAgICAgICAgICAgIG91dFtqXSArPSBtWzQgKiBpICsgal0gKiB2W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gcHJvamVjdChjYW1lcmEsIHYpIHtcbiAgICB2YXIgcCA9IHhmb3JtTWF0cml4KGNhbWVyYS5wcm9qZWN0aW9uLFxuICAgICAgICB4Zm9ybU1hdHJpeChjYW1lcmEudmlldyxcbiAgICAgICAgeGZvcm1NYXRyaXgoY2FtZXJhLm1vZGVsLCBbdlswXSwgdlsxXSwgdlsyXSwgMV0pKSk7XG4gICAgcmV0dXJuIHA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdDtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIG1heFJvd0xlbmd0aCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLm1heFJvd0xlbmd0aDtcblxuLyogUmV0dXJuIGEgbGlzdCBvZiBlbXB0eSBwb2ludHMgaW4gMkQgYXJyYXkgelxuICogZWFjaCBlbXB0eSBwb2ludCB6W2ldW2pdIGdpdmVzIGFuIGFycmF5IFtpLCBqLCBuZWlnaGJvckNvdW50XVxuICogbmVpZ2hib3JDb3VudCBpcyB0aGUgY291bnQgb2YgNCBuZWFyZXN0IG5laWdoYm9ycyB0aGF0IERPIGV4aXN0XG4gKiB0aGlzIGlzIHRvIGdpdmUgdXMgYW4gb3JkZXIgb2YgcG9pbnRzIHRvIGV2YWx1YXRlIGZvciBpbnRlcnBvbGF0aW9uLlxuICogaWYgbm8gbmVpZ2hib3JzIGV4aXN0LCB3ZSBpdGVyYXRpdmVseSBsb29rIGZvciBuZWlnaGJvcnMgdGhhdCBIQVZFXG4gKiBuZWlnaGJvcnMsIGFuZCBhZGQgYSBmcmFjdGlvbmFsIG5laWdoYm9yQ291bnRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaW5kRW1wdGllcyh6KSB7XG4gICAgdmFyIGVtcHRpZXMgPSBbXTtcbiAgICB2YXIgbmVpZ2hib3JIYXNoID0ge307XG4gICAgdmFyIG5vTmVpZ2hib3JMaXN0ID0gW107XG4gICAgdmFyIG5leHRSb3cgPSB6WzBdO1xuICAgIHZhciByb3cgPSBbXTtcbiAgICB2YXIgYmxhbmsgPSBbMCwgMCwgMF07XG4gICAgdmFyIHJvd0xlbmd0aCA9IG1heFJvd0xlbmd0aCh6KTtcbiAgICB2YXIgcHJldlJvdztcbiAgICB2YXIgaTtcbiAgICB2YXIgajtcbiAgICB2YXIgdGhpc1B0O1xuICAgIHZhciBwO1xuICAgIHZhciBuZWlnaGJvckNvdW50O1xuICAgIHZhciBuZXdOZWlnaGJvckhhc2g7XG4gICAgdmFyIGZvdW5kTmV3TmVpZ2hib3JzO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgei5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcmV2Um93ID0gcm93O1xuICAgICAgICByb3cgPSBuZXh0Um93O1xuICAgICAgICBuZXh0Um93ID0geltpICsgMV0gfHwgW107XG4gICAgICAgIGZvcihqID0gMDsgaiA8IHJvd0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZihyb3dbal0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5laWdoYm9yQ291bnQgPSAocm93W2ogLSAxXSAhPT0gdW5kZWZpbmVkID8gMSA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgKHJvd1tqICsgMV0gIT09IHVuZGVmaW5lZCA/IDEgOiAwKSArXG4gICAgICAgICAgICAgICAgICAgIChwcmV2Um93W2pdICE9PSB1bmRlZmluZWQgPyAxIDogMCkgK1xuICAgICAgICAgICAgICAgICAgICAobmV4dFJvd1tqXSAhPT0gdW5kZWZpbmVkID8gMSA6IDApO1xuXG4gICAgICAgICAgICAgICAgaWYobmVpZ2hib3JDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgdGhpcyBwdXJwb3NlLCBkb24ndCBjb3VudCBvZmYtdGhlLWVkZ2UgcG9pbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIHVuZGVmaW5lZCBuZWlnaGJvcnNcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA9PT0gMCkgbmVpZ2hib3JDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBpZihqID09PSAwKSBuZWlnaGJvckNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPT09IHoubGVuZ3RoIC0gMSkgbmVpZ2hib3JDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBpZihqID09PSByb3cubGVuZ3RoIC0gMSkgbmVpZ2hib3JDb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFsbCBuZWlnaGJvcnMgdGhhdCBjb3VsZCBleGlzdCBkbywgd2UgZG9uJ3RcbiAgICAgICAgICAgICAgICAgICAgLy8gbmVlZCB0aGlzIGZvciBmaW5kaW5nIGZhcnRoZXIgbmVpZ2hib3JzXG4gICAgICAgICAgICAgICAgICAgIGlmKG5laWdoYm9yQ291bnQgPCA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvckhhc2hbW2ksIGpdXSA9IFtpLCBqLCBuZWlnaGJvckNvdW50XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVtcHRpZXMucHVzaChbaSwgaiwgbmVpZ2hib3JDb3VudF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBub05laWdoYm9yTGlzdC5wdXNoKFtpLCBqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZShub05laWdoYm9yTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgbmV3TmVpZ2hib3JIYXNoID0ge307XG4gICAgICAgIGZvdW5kTmV3TmVpZ2hib3JzID0gZmFsc2U7XG5cbiAgICAgICAgLy8gbG9vayBmb3IgY2VsbHMgdGhhdCBub3cgaGF2ZSBuZWlnaGJvcnMgYnV0IGRpZG4ndCBiZWZvcmVcbiAgICAgICAgZm9yKHAgPSBub05laWdoYm9yTGlzdC5sZW5ndGggLSAxOyBwID49IDA7IHAtLSkge1xuICAgICAgICAgICAgdGhpc1B0ID0gbm9OZWlnaGJvckxpc3RbcF07XG4gICAgICAgICAgICBpID0gdGhpc1B0WzBdO1xuICAgICAgICAgICAgaiA9IHRoaXNQdFsxXTtcblxuICAgICAgICAgICAgbmVpZ2hib3JDb3VudCA9ICgobmVpZ2hib3JIYXNoW1tpIC0gMSwgal1dIHx8IGJsYW5rKVsyXSArXG4gICAgICAgICAgICAgICAgKG5laWdoYm9ySGFzaFtbaSArIDEsIGpdXSB8fCBibGFuaylbMl0gK1xuICAgICAgICAgICAgICAgIChuZWlnaGJvckhhc2hbW2ksIGogLSAxXV0gfHwgYmxhbmspWzJdICtcbiAgICAgICAgICAgICAgICAobmVpZ2hib3JIYXNoW1tpLCBqICsgMV1dIHx8IGJsYW5rKVsyXSkgLyAyMDtcblxuICAgICAgICAgICAgaWYobmVpZ2hib3JDb3VudCkge1xuICAgICAgICAgICAgICAgIG5ld05laWdoYm9ySGFzaFt0aGlzUHRdID0gW2ksIGosIG5laWdoYm9yQ291bnRdO1xuICAgICAgICAgICAgICAgIG5vTmVpZ2hib3JMaXN0LnNwbGljZShwLCAxKTtcbiAgICAgICAgICAgICAgICBmb3VuZE5ld05laWdoYm9ycyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZighZm91bmROZXdOZWlnaGJvcnMpIHtcbiAgICAgICAgICAgIHRocm93ICdmaW5kRW1wdGllcyBpdGVyYXRlZCB3aXRoIG5vIG5ldyBuZWlnaGJvcnMnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHV0IHRoZXNlIG5ldyBjZWxscyBpbnRvIHRoZSBtYWluIG5laWdoYm9yIGxpc3RcbiAgICAgICAgZm9yKHRoaXNQdCBpbiBuZXdOZWlnaGJvckhhc2gpIHtcbiAgICAgICAgICAgIG5laWdoYm9ySGFzaFt0aGlzUHRdID0gbmV3TmVpZ2hib3JIYXNoW3RoaXNQdF07XG4gICAgICAgICAgICBlbXB0aWVzLnB1c2gobmV3TmVpZ2hib3JIYXNoW3RoaXNQdF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc29ydCB0aGUgZnVsbCBsaXN0IGluIGRlc2NlbmRpbmcgb3JkZXIgb2YgbmVpZ2hib3IgY291bnRcbiAgICByZXR1cm4gZW1wdGllcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGJbMl0gLSBhWzJdOyB9KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxudmFyIElOVEVSUFRIUkVTSE9MRCA9IDFlLTI7XG52YXIgTkVJR0hCT1JTSElGVFMgPSBbWy0xLCAwXSwgWzEsIDBdLCBbMCwgLTFdLCBbMCwgMV1dO1xuXG5mdW5jdGlvbiBjb3JyZWN0aW9uT3ZlcnNob290KG1heEZyYWN0aW9uYWxDaGFuZ2UpIHtcbiAgICAvLyBzdGFydCB3aXRoIGxlc3Mgb3ZlcnNob290LCB1bnRpbCB3ZSBrbm93IGl0J3MgY29udmVyZ2luZyxcbiAgICAvLyB0aGVuIHJhbXAgdXAgdGhlIG92ZXJzaG9vdCBmb3IgZmFzdGVyIGNvbnZlcmdlbmNlXG4gICAgcmV0dXJuIDAuNSAtIDAuMjUgKiBNYXRoLm1pbigxLCBtYXhGcmFjdGlvbmFsQ2hhbmdlICogMC41KTtcbn1cblxuLypcbiAqIGludGVycDJkOiBGaWxsIGluIG1pc3NpbmcgZGF0YSBmcm9tIGEgMkQgYXJyYXkgdXNpbmcgYW4gaXRlcmF0aXZlXG4gKiAgIHBvaXNzb24gZXF1YXRpb24gc29sdmVyIHdpdGggemVyby1kZXJpdmF0aXZlIEJDIGF0IGVkZ2VzLlxuICogICBBbWF6aW5nbHksIHRoaXMganVzdCBhbW91bnRzIHRvIHJlcGVhdGVkbHkgYXZlcmFnaW5nIGFsbCB0aGUgZXhpc3RpbmdcbiAqICAgbmVhcmVzdCBuZWlnaGJvcnMsIGF0IGxlYXN0IGlmIHdlIGRvbid0IHRha2UgeC95IHNjYWxpbmcgaW50byBhY2NvdW50LFxuICogICB3aGljaCBpcyB0aGUgcmlnaHQgYXBwcm9hY2ggaGVyZSB3aGVyZSB4IGFuZCB5IG1heSBub3QgZXZlbiBoYXZlIHRoZVxuICogICBzYW1lIHVuaXRzLlxuICpcbiAqIEBwYXJhbSB7YXJyYXkgb2YgYXJyYXlzfSB6XG4gKiAgICAgIFRoZSAyRCBhcnJheSB0byBmaWxsIGluLiBXaWxsIGJlIG11dGF0ZWQgaGVyZS4gQXNzdW1lZCB0byBhbHJlYWR5IGJlXG4gKiAgICAgIGNsZWFuZWQsIHNvIGFsbCBlbnRyaWVzIGFyZSBudW1iZXJzIGV4Y2VwdCBnYXBzLCB3aGljaCBhcmUgYHVuZGVmaW5lZGAuXG4gKiBAcGFyYW0ge2FycmF5IG9mIGFycmF5c30gZW1wdHlQb2ludHNcbiAqICAgICAgRWFjaCBlbnRyeSBbaSwgaiwgbmVpZ2hib3JDb3VudF0gZm9yIGVtcHR5IHBvaW50cyB6W2ldW2pdIGFuZCB0aGUgbnVtYmVyXG4gKiAgICAgIG9mIG5laWdoYm9ycyB0aGF0IGFyZSAqbm90KiBtaXNzaW5nLiBBc3N1bWVkIHRvIGJlIHNvcnRlZCBmcm9tIG1vc3QgdG9cbiAqICAgICAgbGVhc3QgbmVpZ2hib3JzLCBhcyBwcm9kdWNlZCBieSBoZWF0bWFwL2ZpbmRfZW1wdGllcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnRlcnAyZCh6LCBlbXB0eVBvaW50cykge1xuICAgIHZhciBtYXhGcmFjdGlvbmFsQ2hhbmdlID0gMTtcbiAgICB2YXIgaTtcblxuICAgIC8vIG9uZSBwYXNzIHRvIGZpbGwgaW4gYSBzdGFydGluZyB2YWx1ZSBmb3IgYWxsIHRoZSBlbXB0aWVzXG4gICAgaXRlcmF0ZUludGVycDJkKHosIGVtcHR5UG9pbnRzKTtcblxuICAgIC8vIHdlJ3JlIGRvbid0IG5lZWQgdG8gaXRlcmF0ZSBsb25lIGVtcHRpZXMgLSByZW1vdmUgdGhlbVxuICAgIGZvcihpID0gMDsgaSA8IGVtcHR5UG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKGVtcHR5UG9pbnRzW2ldWzJdIDwgNCkgYnJlYWs7XG4gICAgfVxuICAgIC8vIGJ1dCBkb24ndCByZW1vdmUgdGhlc2UgcG9pbnRzIGZyb20gdGhlIG9yaWdpbmFsIGFycmF5LFxuICAgIC8vIHdlJ2xsIHVzZSB0aGVtIGZvciBtYXNraW5nLCBzbyBtYWtlIGEgY29weS5cbiAgICBlbXB0eVBvaW50cyA9IGVtcHR5UG9pbnRzLnNsaWNlKGkpO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgMTAwICYmIG1heEZyYWN0aW9uYWxDaGFuZ2UgPiBJTlRFUlBUSFJFU0hPTEQ7IGkrKykge1xuICAgICAgICBtYXhGcmFjdGlvbmFsQ2hhbmdlID0gaXRlcmF0ZUludGVycDJkKHosIGVtcHR5UG9pbnRzLFxuICAgICAgICAgICAgY29ycmVjdGlvbk92ZXJzaG9vdChtYXhGcmFjdGlvbmFsQ2hhbmdlKSk7XG4gICAgfVxuICAgIGlmKG1heEZyYWN0aW9uYWxDaGFuZ2UgPiBJTlRFUlBUSFJFU0hPTEQpIHtcbiAgICAgICAgTGliLmxvZygnaW50ZXJwMmQgZGlkblxcJ3QgY29udmVyZ2UgcXVpY2tseScsIG1heEZyYWN0aW9uYWxDaGFuZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiB6O1xufTtcblxuZnVuY3Rpb24gaXRlcmF0ZUludGVycDJkKHosIGVtcHR5UG9pbnRzLCBvdmVyc2hvb3QpIHtcbiAgICB2YXIgbWF4RnJhY3Rpb25hbENoYW5nZSA9IDA7XG4gICAgdmFyIHRoaXNQdDtcbiAgICB2YXIgaTtcbiAgICB2YXIgajtcbiAgICB2YXIgcDtcbiAgICB2YXIgcTtcbiAgICB2YXIgbmVpZ2hib3JTaGlmdDtcbiAgICB2YXIgbmVpZ2hib3JSb3c7XG4gICAgdmFyIG5laWdoYm9yVmFsO1xuICAgIHZhciBuZWlnaGJvckNvdW50O1xuICAgIHZhciBuZWlnaGJvclN1bTtcbiAgICB2YXIgaW5pdGlhbFZhbDtcbiAgICB2YXIgbWluTmVpZ2hib3I7XG4gICAgdmFyIG1heE5laWdoYm9yO1xuXG4gICAgZm9yKHAgPSAwOyBwIDwgZW1wdHlQb2ludHMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgdGhpc1B0ID0gZW1wdHlQb2ludHNbcF07XG4gICAgICAgIGkgPSB0aGlzUHRbMF07XG4gICAgICAgIGogPSB0aGlzUHRbMV07XG4gICAgICAgIGluaXRpYWxWYWwgPSB6W2ldW2pdO1xuICAgICAgICBuZWlnaGJvclN1bSA9IDA7XG4gICAgICAgIG5laWdoYm9yQ291bnQgPSAwO1xuXG4gICAgICAgIGZvcihxID0gMDsgcSA8IDQ7IHErKykge1xuICAgICAgICAgICAgbmVpZ2hib3JTaGlmdCA9IE5FSUdIQk9SU0hJRlRTW3FdO1xuICAgICAgICAgICAgbmVpZ2hib3JSb3cgPSB6W2kgKyBuZWlnaGJvclNoaWZ0WzBdXTtcbiAgICAgICAgICAgIGlmKCFuZWlnaGJvclJvdykgY29udGludWU7XG4gICAgICAgICAgICBuZWlnaGJvclZhbCA9IG5laWdoYm9yUm93W2ogKyBuZWlnaGJvclNoaWZ0WzFdXTtcbiAgICAgICAgICAgIGlmKG5laWdoYm9yVmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZihuZWlnaGJvclN1bSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtaW5OZWlnaGJvciA9IG1heE5laWdoYm9yID0gbmVpZ2hib3JWYWw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWluTmVpZ2hib3IgPSBNYXRoLm1pbihtaW5OZWlnaGJvciwgbmVpZ2hib3JWYWwpO1xuICAgICAgICAgICAgICAgICAgICBtYXhOZWlnaGJvciA9IE1hdGgubWF4KG1heE5laWdoYm9yLCBuZWlnaGJvclZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5laWdoYm9yQ291bnQrKztcbiAgICAgICAgICAgICAgICBuZWlnaGJvclN1bSArPSBuZWlnaGJvclZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG5laWdoYm9yQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93ICdpdGVyYXRlSW50ZXJwMmQgb3JkZXIgaXMgd3Jvbmc6IG5vIGRlZmluZWQgbmVpZ2hib3JzJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIGxhcGxhY2UgZXF1YXRpb24gaW50ZXJwb2xhdGlvbjpcbiAgICAgICAgLy8gZWFjaCBwb2ludCBpcyBqdXN0IHRoZSBhdmVyYWdlIG9mIGl0cyBuZWlnaGJvcnNcbiAgICAgICAgLy8gbm90ZSB0aGF0IHRoaXMgaWdub3JlcyBkaWZmZXJlbnRpYWwgeC95IHNjYWxpbmdcbiAgICAgICAgLy8gd2hpY2ggSSB0aGluayBpcyB0aGUgcmlnaHQgYXBwcm9hY2gsIHNpbmNlIHdlXG4gICAgICAgIC8vIGRvbid0IGtub3cgd2hhdCB0aGF0IHNjYWxpbmcgbWVhbnNcbiAgICAgICAgeltpXVtqXSA9IG5laWdoYm9yU3VtIC8gbmVpZ2hib3JDb3VudDtcblxuICAgICAgICBpZihpbml0aWFsVmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKG5laWdoYm9yQ291bnQgPCA0KSBtYXhGcmFjdGlvbmFsQ2hhbmdlID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHdlIGNhbiBtYWtlIGxhcmdlIGVtcHR5IHJlZ2lvbnMgY29udmVyZ2UgZmFzdGVyXG4gICAgICAgICAgICAvLyBpZiB3ZSBvdmVyc2hvb3QgdGhlIGNoYW5nZSB2cyB0aGUgcHJldmlvdXMgdmFsdWVcbiAgICAgICAgICAgIHpbaV1bal0gPSAoMSArIG92ZXJzaG9vdCkgKiB6W2ldW2pdIC0gb3ZlcnNob290ICogaW5pdGlhbFZhbDtcblxuICAgICAgICAgICAgaWYobWF4TmVpZ2hib3IgPiBtaW5OZWlnaGJvcikge1xuICAgICAgICAgICAgICAgIG1heEZyYWN0aW9uYWxDaGFuZ2UgPSBNYXRoLm1heChtYXhGcmFjdGlvbmFsQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyh6W2ldW2pdIC0gaW5pdGlhbFZhbCkgLyAobWF4TmVpZ2hib3IgLSBtaW5OZWlnaGJvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heEZyYWN0aW9uYWxDaGFuZ2U7XG59XG4iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9