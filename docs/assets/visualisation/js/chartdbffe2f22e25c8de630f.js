(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_contour_plot_js-node_modules_plotly_js_src_traces_c-0d1c8c"],{

/***/ "./node_modules/plotly.js/src/traces/contour/close_boundaries.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/close_boundaries.js ***!
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



module.exports = function(pathinfo, contours) {
    var pi0 = pathinfo[0];
    var z = pi0.z;
    var i;

    switch(contours.type) {
        case 'levels':
            // Why (just) use z[0][0] and z[0][1]?
            //
            // N.B. using boundaryMin instead of edgeVal2 here makes the
            //      `contour_scatter` mock fail
            var edgeVal2 = Math.min(z[0][0], z[0][1]);

            for(i = 0; i < pathinfo.length; i++) {
                var pi = pathinfo[i];
                pi.prefixBoundary = !pi.edgepaths.length &&
                    (edgeVal2 > pi.level || pi.starts.length && edgeVal2 === pi.level);
            }
            break;
        case 'constraint':
            // after convertToConstraints, pathinfo has length=0
            pi0.prefixBoundary = false;

            // joinAllPaths does enough already when edgepaths are present
            if(pi0.edgepaths.length) return;

            var na = pi0.x.length;
            var nb = pi0.y.length;
            var boundaryMax = -Infinity;
            var boundaryMin = Infinity;

            for(i = 0; i < nb; i++) {
                boundaryMin = Math.min(boundaryMin, z[i][0]);
                boundaryMin = Math.min(boundaryMin, z[i][na - 1]);
                boundaryMax = Math.max(boundaryMax, z[i][0]);
                boundaryMax = Math.max(boundaryMax, z[i][na - 1]);
            }
            for(i = 1; i < na - 1; i++) {
                boundaryMin = Math.min(boundaryMin, z[0][i]);
                boundaryMin = Math.min(boundaryMin, z[nb - 1][i]);
                boundaryMax = Math.max(boundaryMax, z[0][i]);
                boundaryMax = Math.max(boundaryMax, z[nb - 1][i]);
            }

            var contoursValue = contours.value;
            var v1, v2;

            switch(contours._operation) {
                case '>':
                    if(contoursValue > boundaryMax) {
                        pi0.prefixBoundary = true;
                    }
                    break;
                case '<':
                    if(contoursValue < boundaryMin ||
                        (pi0.starts.length && contoursValue === boundaryMin)) {
                        pi0.prefixBoundary = true;
                    }
                    break;
                case '[]':
                    v1 = Math.min(contoursValue[0], contoursValue[1]);
                    v2 = Math.max(contoursValue[0], contoursValue[1]);
                    if(v2 < boundaryMin || v1 > boundaryMax ||
                        (pi0.starts.length && v2 === boundaryMin)) {
                        pi0.prefixBoundary = true;
                    }
                    break;
                case '][':
                    v1 = Math.min(contoursValue[0], contoursValue[1]);
                    v2 = Math.max(contoursValue[0], contoursValue[1]);
                    if(v1 < boundaryMin && v2 > boundaryMax) {
                        pi0.prefixBoundary = true;
                    }
                    break;
            }
            break;
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/constants.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/constants.js ***!
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


module.exports = {
    // some constants to help with marching squares algorithm
    // where does the path start for each index?
    BOTTOMSTART: [1, 9, 13, 104, 713],
    TOPSTART: [4, 6, 7, 104, 713],
    LEFTSTART: [8, 12, 14, 208, 1114],
    RIGHTSTART: [2, 3, 11, 208, 1114],

    // which way [dx,dy] do we leave a given index?
    // saddles are already disambiguated
    NEWDELTA: [
        null, [-1, 0], [0, -1], [-1, 0],
        [1, 0], null, [0, -1], [-1, 0],
        [0, 1], [0, 1], null, [0, 1],
        [1, 0], [1, 0], [0, -1]
    ],

    // for each saddle, the first index here is used
    // for dx||dy<0, the second for dx||dy>0
    CHOOSESADDLE: {
        104: [4, 1],
        208: [2, 8],
        713: [7, 13],
        1114: [11, 14]
    },

    // after one index has been used for a saddle, which do we
    // substitute to be used up later?
    SADDLEREMAINDER: {1: 4, 2: 8, 4: 1, 7: 13, 8: 2, 11: 14, 13: 7, 14: 11},

    // length of a contour, as a multiple of the plot area diagonal, per label
    LABELDISTANCE: 2,

    // number of contour levels after which we start increasing the number of
    // labels we draw. Many contours means they will generally be close
    // together, so it will be harder to follow a long way to find a label
    LABELINCREASE: 10,

    // minimum length of a contour line, as a multiple of the label length,
    // at which we draw *any* labels
    LABELMIN: 3,

    // max number of labels to draw on a single contour path, no matter how long
    LABELMAX: 10,

    // constants for the label position cost function
    LABELOPTIMIZER: {
        // weight given to edge proximity
        EDGECOST: 1,
        // weight given to the angle off horizontal
        ANGLECOST: 1,
        // weight given to distance from already-placed labels
        NEIGHBORCOST: 5,
        // cost multiplier for labels on the same level
        SAMELEVELFACTOR: 10,
        // minimum distance (as a multiple of the label length)
        // for labels on the same level
        SAMELEVELDISTANCE: 5,
        // maximum cost before we won't even place the label
        MAXCOST: 100,
        // number of evenly spaced points to look at in the first
        // iteration of the search
        INITIALSEARCHPOINTS: 10,
        // number of binary search iterations after the initial wide search
        ITERATIONS: 5
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/constraint_mapping.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/constraint_mapping.js ***!
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



var filterOps = __webpack_require__(/*! ../../constants/filter_ops */ "./node_modules/plotly.js/src/constants/filter_ops.js");
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

// This syntax conforms to the existing filter transform syntax, but we don't care
// about open vs. closed intervals for simply drawing contours constraints:
module.exports = {
    '[]': makeRangeSettings('[]'),
    '][': makeRangeSettings(']['),
    '>': makeInequalitySettings('>'),
    '<': makeInequalitySettings('<'),
    '=': makeInequalitySettings('=')
};

// This does not in any way shape or form support calendars. It's adapted from
// transforms/filter.js.
function coerceValue(operation, value) {
    var hasArrayValue = Array.isArray(value);

    var coercedValue;

    function coerce(value) {
        return isNumeric(value) ? (+value) : null;
    }

    if(filterOps.COMPARISON_OPS2.indexOf(operation) !== -1) {
        coercedValue = hasArrayValue ? coerce(value[0]) : coerce(value);
    } else if(filterOps.INTERVAL_OPS.indexOf(operation) !== -1) {
        coercedValue = hasArrayValue ?
            [coerce(value[0]), coerce(value[1])] :
            [coerce(value), coerce(value)];
    } else if(filterOps.SET_OPS.indexOf(operation) !== -1) {
        coercedValue = hasArrayValue ? value.map(coerce) : [coerce(value)];
    }

    return coercedValue;
}

// Returns a parabola scaled so that the min/max is either +/- 1 and zero at the two values
// provided. The data is mapped by this function when constructing intervals so that it's
// very easy to construct contours as normal.
function makeRangeSettings(operation) {
    return function(value) {
        value = coerceValue(operation, value);

        // Ensure proper ordering:
        var min = Math.min(value[0], value[1]);
        var max = Math.max(value[0], value[1]);

        return {
            start: min,
            end: max,
            size: max - min
        };
    };
}

function makeInequalitySettings(operation) {
    return function(value) {
        value = coerceValue(operation, value);

        return {
            start: value,
            end: Infinity,
            size: Infinity
        };
    };
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/convert_to_constraints.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/convert_to_constraints.js ***!
  \*****************************************************************************/
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

// The contour extraction is great, except it totally fails for constraints because we
// need weird range loops and flipped contours instead of the usual format. This function
// does some weird manipulation of the extracted pathinfo data such that it magically
// draws contours correctly *as* constraints.
//
// ** I do not know which "weird range loops" the comment above is referring to.
module.exports = function(pathinfo, operation) {
    var i, pi0, pi1;

    var op0 = function(arr) { return arr.reverse(); };
    var op1 = function(arr) { return arr; };

    switch(operation) {
        case '=':
        case '<':
            return pathinfo;
        case '>':
            if(pathinfo.length !== 1) {
                Lib.warn('Contour data invalid for the specified inequality operation.');
            }

            // In this case there should be exactly one contour levels in pathinfo.
            // We flip all of the data. This will draw the contour as closed.
            pi0 = pathinfo[0];

            for(i = 0; i < pi0.edgepaths.length; i++) {
                pi0.edgepaths[i] = op0(pi0.edgepaths[i]);
            }
            for(i = 0; i < pi0.paths.length; i++) {
                pi0.paths[i] = op0(pi0.paths[i]);
            }
            for(i = 0; i < pi0.starts.length; i++) {
                pi0.starts[i] = op0(pi0.starts[i]);
            }

            return pathinfo;
        case '][':
            var tmp = op0;
            op0 = op1;
            op1 = tmp;
            // It's a nice rule, except this definitely *is* what's intended here.
            /* eslint-disable: no-fallthrough */
        case '[]':
            /* eslint-enable: no-fallthrough */
            if(pathinfo.length !== 2) {
                Lib.warn('Contour data invalid for the specified inequality range operation.');
            }

            // In this case there should be exactly two contour levels in pathinfo.
            // - We concatenate the info into one pathinfo.
            // - We must also flip all of the data in the `[]` case.
            // This will draw the contours as closed.
            pi0 = copyPathinfo(pathinfo[0]);
            pi1 = copyPathinfo(pathinfo[1]);

            for(i = 0; i < pi0.edgepaths.length; i++) {
                pi0.edgepaths[i] = op0(pi0.edgepaths[i]);
            }
            for(i = 0; i < pi0.paths.length; i++) {
                pi0.paths[i] = op0(pi0.paths[i]);
            }
            for(i = 0; i < pi0.starts.length; i++) {
                pi0.starts[i] = op0(pi0.starts[i]);
            }

            while(pi1.edgepaths.length) {
                pi0.edgepaths.push(op1(pi1.edgepaths.shift()));
            }
            while(pi1.paths.length) {
                pi0.paths.push(op1(pi1.paths.shift()));
            }
            while(pi1.starts.length) {
                pi0.starts.push(op1(pi1.starts.shift()));
            }

            return [pi0];
    }
};

function copyPathinfo(pi) {
    return Lib.extendFlat({}, pi, {
        edgepaths: Lib.extendDeep([], pi.edgepaths),
        paths: Lib.extendDeep([], pi.paths),
        starts: Lib.extendDeep([], pi.starts)
    });
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/empty_pathinfo.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/empty_pathinfo.js ***!
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
var constraintMapping = __webpack_require__(/*! ./constraint_mapping */ "./node_modules/plotly.js/src/traces/contour/constraint_mapping.js");
var endPlus = __webpack_require__(/*! ./end_plus */ "./node_modules/plotly.js/src/traces/contour/end_plus.js");

module.exports = function emptyPathinfo(contours, plotinfo, cd0) {
    var contoursFinal = (contours.type === 'constraint') ?
        constraintMapping[contours._operation](contours.value) :
        contours;

    var cs = contoursFinal.size;
    var pathinfo = [];
    var end = endPlus(contoursFinal);

    var carpet = cd0.trace._carpetTrace;

    var basePathinfo = carpet ? {
        // store axes so we can convert to px
        xaxis: carpet.aaxis,
        yaxis: carpet.baxis,
        // full data arrays to use for interpolation
        x: cd0.a,
        y: cd0.b
    } : {
        xaxis: plotinfo.xaxis,
        yaxis: plotinfo.yaxis,
        x: cd0.x,
        y: cd0.y
    };

    for(var ci = contoursFinal.start; ci < end; ci += cs) {
        pathinfo.push(Lib.extendFlat({
            level: ci,
            // all the cells with nontrivial marching index
            crossings: {},
            // starting points on the edges of the lattice for each contour
            starts: [],
            // all unclosed paths (may have less items than starts,
            // if a path is closed by rounding)
            edgepaths: [],
            // all closed paths
            paths: [],
            z: cd0.z,
            smoothing: cd0.trace.line.smoothing
        }, basePathinfo));

        if(pathinfo.length > 1000) {
            Lib.warn('Too many contours, clipping at 1000', contours);
            break;
        }
    }
    return pathinfo;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/find_all_paths.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/find_all_paths.js ***!
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
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/contour/constants.js");

module.exports = function findAllPaths(pathinfo, xtol, ytol) {
    var cnt,
        startLoc,
        i,
        pi,
        j;

    // Default just passes these values through as they were before:
    xtol = xtol || 0.01;
    ytol = ytol || 0.01;

    for(i = 0; i < pathinfo.length; i++) {
        pi = pathinfo[i];

        for(j = 0; j < pi.starts.length; j++) {
            startLoc = pi.starts[j];
            makePath(pi, startLoc, 'edge', xtol, ytol);
        }

        cnt = 0;
        while(Object.keys(pi.crossings).length && cnt < 10000) {
            cnt++;
            startLoc = Object.keys(pi.crossings)[0].split(',').map(Number);
            makePath(pi, startLoc, undefined, xtol, ytol);
        }
        if(cnt === 10000) Lib.log('Infinite loop in contour?');
    }
};

function equalPts(pt1, pt2, xtol, ytol) {
    return Math.abs(pt1[0] - pt2[0]) < xtol &&
           Math.abs(pt1[1] - pt2[1]) < ytol;
}

// distance in index units - uses the 3rd and 4th items in points
function ptDist(pt1, pt2) {
    var dx = pt1[2] - pt2[2];
    var dy = pt1[3] - pt2[3];
    return Math.sqrt(dx * dx + dy * dy);
}

function makePath(pi, loc, edgeflag, xtol, ytol) {
    var locStr = loc.join(',');
    var mi = pi.crossings[locStr];
    var marchStep = getStartStep(mi, edgeflag, loc);
    // start by going backward a half step and finding the crossing point
    var pts = [getInterpPx(pi, loc, [-marchStep[0], -marchStep[1]])];
    var m = pi.z.length;
    var n = pi.z[0].length;
    var startLoc = loc.slice();
    var startStep = marchStep.slice();
    var cnt;

    // now follow the path
    for(cnt = 0; cnt < 10000; cnt++) { // just to avoid infinite loops
        if(mi > 20) {
            mi = constants.CHOOSESADDLE[mi][(marchStep[0] || marchStep[1]) < 0 ? 0 : 1];
            pi.crossings[locStr] = constants.SADDLEREMAINDER[mi];
        } else {
            delete pi.crossings[locStr];
        }

        marchStep = constants.NEWDELTA[mi];
        if(!marchStep) {
            Lib.log('Found bad marching index:', mi, loc, pi.level);
            break;
        }

        // find the crossing a half step forward, and then take the full step
        pts.push(getInterpPx(pi, loc, marchStep));
        loc[0] += marchStep[0];
        loc[1] += marchStep[1];
        locStr = loc.join(',');

        // don't include the same point multiple times
        if(equalPts(pts[pts.length - 1], pts[pts.length - 2], xtol, ytol)) pts.pop();

        var atEdge = (marchStep[0] && (loc[0] < 0 || loc[0] > n - 2)) ||
                (marchStep[1] && (loc[1] < 0 || loc[1] > m - 2));

        var closedLoop = loc[0] === startLoc[0] && loc[1] === startLoc[1] &&
                marchStep[0] === startStep[0] && marchStep[1] === startStep[1];

        // have we completed a loop, or reached an edge?
        if((closedLoop) || (edgeflag && atEdge)) break;

        mi = pi.crossings[locStr];
    }

    if(cnt === 10000) {
        Lib.log('Infinite loop in contour?');
    }
    var closedpath = equalPts(pts[0], pts[pts.length - 1], xtol, ytol);
    var totaldist = 0;
    var distThresholdFactor = 0.2 * pi.smoothing;
    var alldists = [];
    var cropstart = 0;
    var distgroup, cnt2, cnt3, newpt, ptcnt, ptavg, thisdist,
        i, j, edgepathi, edgepathj;

    /*
     * Check for points that are too close together (<1/5 the average dist
     * *in grid index units* (important for log axes and nonuniform grids),
     * less if less smoothed) and just take the center (or avg of center 2).
     * This cuts down on funny behavior when a point is very close to a
     * contour level.
     */
    for(cnt = 1; cnt < pts.length; cnt++) {
        thisdist = ptDist(pts[cnt], pts[cnt - 1]);
        totaldist += thisdist;
        alldists.push(thisdist);
    }

    var distThreshold = totaldist / alldists.length * distThresholdFactor;

    function getpt(i) { return pts[i % pts.length]; }

    for(cnt = pts.length - 2; cnt >= cropstart; cnt--) {
        distgroup = alldists[cnt];
        if(distgroup < distThreshold) {
            cnt3 = 0;
            for(cnt2 = cnt - 1; cnt2 >= cropstart; cnt2--) {
                if(distgroup + alldists[cnt2] < distThreshold) {
                    distgroup += alldists[cnt2];
                } else break;
            }

            // closed path with close points wrapping around the boundary?
            if(closedpath && cnt === pts.length - 2) {
                for(cnt3 = 0; cnt3 < cnt2; cnt3++) {
                    if(distgroup + alldists[cnt3] < distThreshold) {
                        distgroup += alldists[cnt3];
                    } else break;
                }
            }
            ptcnt = cnt - cnt2 + cnt3 + 1;
            ptavg = Math.floor((cnt + cnt2 + cnt3 + 2) / 2);

            // either endpoint included: keep the endpoint
            if(!closedpath && cnt === pts.length - 2) newpt = pts[pts.length - 1];
            else if(!closedpath && cnt2 === -1) newpt = pts[0];

            // odd # of points - just take the central one
            else if(ptcnt % 2) newpt = getpt(ptavg);

            // even # of pts - average central two
            else {
                newpt = [(getpt(ptavg)[0] + getpt(ptavg + 1)[0]) / 2,
                    (getpt(ptavg)[1] + getpt(ptavg + 1)[1]) / 2];
            }

            pts.splice(cnt2 + 1, cnt - cnt2 + 1, newpt);
            cnt = cnt2 + 1;
            if(cnt3) cropstart = cnt3;
            if(closedpath) {
                if(cnt === pts.length - 2) pts[cnt3] = pts[pts.length - 1];
                else if(cnt === 0) pts[pts.length - 1] = pts[0];
            }
        }
    }
    pts.splice(0, cropstart);

    // done with the index parts - remove them so path generation works right
    // because it depends on only having [xpx, ypx]
    for(cnt = 0; cnt < pts.length; cnt++) pts[cnt].length = 2;

    // don't return single-point paths (ie all points were the same
    // so they got deleted?)
    if(pts.length < 2) return;
    else if(closedpath) {
        pts.pop();
        pi.paths.push(pts);
    } else {
        if(!edgeflag) {
            Lib.log('Unclosed interior contour?',
                pi.level, startLoc.join(','), pts.join('L'));
        }

        // edge path - does it start where an existing edge path ends, or vice versa?
        var merged = false;
        for(i = 0; i < pi.edgepaths.length; i++) {
            edgepathi = pi.edgepaths[i];
            if(!merged && equalPts(edgepathi[0], pts[pts.length - 1], xtol, ytol)) {
                pts.pop();
                merged = true;

                // now does it ALSO meet the end of another (or the same) path?
                var doublemerged = false;
                for(j = 0; j < pi.edgepaths.length; j++) {
                    edgepathj = pi.edgepaths[j];
                    if(equalPts(edgepathj[edgepathj.length - 1], pts[0], xtol, ytol)) {
                        doublemerged = true;
                        pts.shift();
                        pi.edgepaths.splice(i, 1);
                        if(j === i) {
                            // the path is now closed
                            pi.paths.push(pts.concat(edgepathj));
                        } else {
                            if(j > i) j--;
                            pi.edgepaths[j] = edgepathj.concat(pts, edgepathi);
                        }
                        break;
                    }
                }
                if(!doublemerged) {
                    pi.edgepaths[i] = pts.concat(edgepathi);
                }
            }
        }
        for(i = 0; i < pi.edgepaths.length; i++) {
            if(merged) break;
            edgepathi = pi.edgepaths[i];
            if(equalPts(edgepathi[edgepathi.length - 1], pts[0], xtol, ytol)) {
                pts.shift();
                pi.edgepaths[i] = edgepathi.concat(pts);
                merged = true;
            }
        }

        if(!merged) pi.edgepaths.push(pts);
    }
}

// special function to get the marching step of the
// first point in the path (leading to loc)
function getStartStep(mi, edgeflag, loc) {
    var dx = 0;
    var dy = 0;
    if(mi > 20 && edgeflag) {
        // these saddles start at +/- x
        if(mi === 208 || mi === 1114) {
            // if we're starting at the left side, we must be going right
            dx = loc[0] === 0 ? 1 : -1;
        } else {
            // if we're starting at the bottom, we must be going up
            dy = loc[1] === 0 ? 1 : -1;
        }
    } else if(constants.BOTTOMSTART.indexOf(mi) !== -1) dy = 1;
    else if(constants.LEFTSTART.indexOf(mi) !== -1) dx = 1;
    else if(constants.TOPSTART.indexOf(mi) !== -1) dy = -1;
    else dx = -1;
    return [dx, dy];
}

/*
 * Find the pixel coordinates of a particular crossing
 *
 * @param {object} pi: the pathinfo object at this level
 * @param {array} loc: the grid index [x, y] of the crossing
 * @param {array} step: the direction [dx, dy] we're moving on the grid
 *
 * @return {array} [xpx, ypx, xi, yi]: the first two are the pixel location,
 *   the next two are the interpolated grid indices, which we use for
 *   distance calculations to delete points that are too close together.
 *   This is important when the grid is nonuniform (and most dramatically when
 *   we're on log axes and include invalid (0 or negative) values.
 *   It's crucial to delete these extra two before turning an array of these
 *   points into a path, because those routines require length-2 points.
 */
function getInterpPx(pi, loc, step) {
    var locx = loc[0] + Math.max(step[0], 0);
    var locy = loc[1] + Math.max(step[1], 0);
    var zxy = pi.z[locy][locx];
    var xa = pi.xaxis;
    var ya = pi.yaxis;

    if(step[1]) {
        var dx = (pi.level - zxy) / (pi.z[locy][locx + 1] - zxy);

        return [xa.c2p((1 - dx) * pi.x[locx] + dx * pi.x[locx + 1], true),
            ya.c2p(pi.y[locy], true),
            locx + dx, locy];
    } else {
        var dy = (pi.level - zxy) / (pi.z[locy + 1][locx] - zxy);
        return [xa.c2p(pi.x[locx], true),
            ya.c2p((1 - dy) * pi.y[locy] + dy * pi.y[locy + 1], true),
            locx, locy + dy];
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/make_crossings.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/make_crossings.js ***!
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



var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/contour/constants.js");

// Calculate all the marching indices, for ALL levels at once.
// since we want to be exhaustive we'll check for contour crossings
// at every intersection, rather than just following a path
// TODO: shorten the inner loop to only the relevant levels
module.exports = function makeCrossings(pathinfo) {
    var z = pathinfo[0].z;
    var m = z.length;
    var n = z[0].length; // we already made sure z isn't ragged in interp2d
    var twoWide = m === 2 || n === 2;
    var xi;
    var yi;
    var startIndices;
    var ystartIndices;
    var label;
    var corners;
    var mi;
    var pi;
    var i;

    for(yi = 0; yi < m - 1; yi++) {
        ystartIndices = [];
        if(yi === 0) ystartIndices = ystartIndices.concat(constants.BOTTOMSTART);
        if(yi === m - 2) ystartIndices = ystartIndices.concat(constants.TOPSTART);

        for(xi = 0; xi < n - 1; xi++) {
            startIndices = ystartIndices.slice();
            if(xi === 0) startIndices = startIndices.concat(constants.LEFTSTART);
            if(xi === n - 2) startIndices = startIndices.concat(constants.RIGHTSTART);

            label = xi + ',' + yi;
            corners = [[z[yi][xi], z[yi][xi + 1]],
                       [z[yi + 1][xi], z[yi + 1][xi + 1]]];
            for(i = 0; i < pathinfo.length; i++) {
                pi = pathinfo[i];
                mi = getMarchingIndex(pi.level, corners);
                if(!mi) continue;

                pi.crossings[label] = mi;
                if(startIndices.indexOf(mi) !== -1) {
                    pi.starts.push([xi, yi]);
                    if(twoWide && startIndices.indexOf(mi,
                            startIndices.indexOf(mi) + 1) !== -1) {
                        // the same square has starts from opposite sides
                        // it's not possible to have starts on opposite edges
                        // of a corner, only a start and an end...
                        // but if the array is only two points wide (either way)
                        // you can have starts on opposite sides.
                        pi.starts.push([xi, yi]);
                    }
                }
            }
        }
    }
};

// modified marching squares algorithm,
// so we disambiguate the saddle points from the start
// and we ignore the cases with no crossings
// the index I'm using is based on:
// http://en.wikipedia.org/wiki/Marching_squares
// except that the saddles bifurcate and I represent them
// as the decimal combination of the two appropriate
// non-saddle indices
function getMarchingIndex(val, corners) {
    var mi = (corners[0][0] > val ? 0 : 1) +
             (corners[0][1] > val ? 0 : 2) +
             (corners[1][1] > val ? 0 : 4) +
             (corners[1][0] > val ? 0 : 8);
    if(mi === 5 || mi === 10) {
        var avg = (corners[0][0] + corners[0][1] +
                   corners[1][0] + corners[1][1]) / 4;
        // two peaks with a big valley
        if(val > avg) return (mi === 5) ? 713 : 1114;
        // two valleys with a big ridge
        return (mi === 5) ? 104 : 208;
    }
    return (mi === 15) ? 0 : mi;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/plot.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/plot.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

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
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var setConvert = __webpack_require__(/*! ../../plots/cartesian/set_convert */ "./node_modules/plotly.js/src/plots/cartesian/set_convert.js");

var heatmapPlot = __webpack_require__(/*! ../heatmap/plot */ "./node_modules/plotly.js/src/traces/heatmap/plot.js");
var makeCrossings = __webpack_require__(/*! ./make_crossings */ "./node_modules/plotly.js/src/traces/contour/make_crossings.js");
var findAllPaths = __webpack_require__(/*! ./find_all_paths */ "./node_modules/plotly.js/src/traces/contour/find_all_paths.js");
var emptyPathinfo = __webpack_require__(/*! ./empty_pathinfo */ "./node_modules/plotly.js/src/traces/contour/empty_pathinfo.js");
var convertToConstraints = __webpack_require__(/*! ./convert_to_constraints */ "./node_modules/plotly.js/src/traces/contour/convert_to_constraints.js");
var closeBoundaries = __webpack_require__(/*! ./close_boundaries */ "./node_modules/plotly.js/src/traces/contour/close_boundaries.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/contour/constants.js");
var costConstants = constants.LABELOPTIMIZER;

exports.plot = function plot(gd, plotinfo, cdcontours, contourLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    Lib.makeTraceGroups(contourLayer, cdcontours, 'contour').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;
        var x = cd0.x;
        var y = cd0.y;
        var contours = trace.contours;
        var pathinfo = emptyPathinfo(contours, plotinfo, cd0);

        // use a heatmap to fill - draw it behind the lines
        var heatmapColoringLayer = Lib.ensureSingle(plotGroup, 'g', 'heatmapcoloring');
        var cdheatmaps = [];
        if(contours.coloring === 'heatmap') {
            cdheatmaps = [cd];
        }
        heatmapPlot(gd, plotinfo, cdheatmaps, heatmapColoringLayer);

        makeCrossings(pathinfo);
        findAllPaths(pathinfo);

        var leftedge = xa.c2p(x[0], true);
        var rightedge = xa.c2p(x[x.length - 1], true);
        var bottomedge = ya.c2p(y[0], true);
        var topedge = ya.c2p(y[y.length - 1], true);
        var perimeter = [
            [leftedge, topedge],
            [rightedge, topedge],
            [rightedge, bottomedge],
            [leftedge, bottomedge]
        ];

        var fillPathinfo = pathinfo;
        if(contours.type === 'constraint') {
            // N.B. this also mutates pathinfo
            fillPathinfo = convertToConstraints(pathinfo, contours._operation);
        }

        // draw everything
        makeBackground(plotGroup, perimeter, contours);
        makeFills(plotGroup, fillPathinfo, perimeter, contours);
        makeLinesAndLabels(plotGroup, pathinfo, gd, cd0, contours);
        clipGaps(plotGroup, plotinfo, gd, cd0, perimeter);
    });
};

function makeBackground(plotgroup, perimeter, contours) {
    var bggroup = Lib.ensureSingle(plotgroup, 'g', 'contourbg');

    var bgfill = bggroup.selectAll('path')
        .data(contours.coloring === 'fill' ? [0] : []);
    bgfill.enter().append('path');
    bgfill.exit().remove();
    bgfill
        .attr('d', 'M' + perimeter.join('L') + 'Z')
        .style('stroke', 'none');
}

function makeFills(plotgroup, pathinfo, perimeter, contours) {
    var hasFills = contours.coloring === 'fill' || (contours.type === 'constraint' && contours._operation !== '=');
    var boundaryPath = 'M' + perimeter.join('L') + 'Z';

    // fills prefixBoundary in pathinfo items
    if(hasFills) {
        closeBoundaries(pathinfo, contours);
    }

    var fillgroup = Lib.ensureSingle(plotgroup, 'g', 'contourfill');

    var fillitems = fillgroup.selectAll('path').data(hasFills ? pathinfo : []);
    fillitems.enter().append('path');
    fillitems.exit().remove();
    fillitems.each(function(pi) {
        // join all paths for this level together into a single path
        // first follow clockwise around the perimeter to close any open paths
        // if the whole perimeter is above this level, start with a path
        // enclosing the whole thing. With all that, the parity should mean
        // that we always fill everything above the contour, nothing below
        var fullpath = (pi.prefixBoundary ? boundaryPath : '') +
            joinAllPaths(pi, perimeter);

        if(!fullpath) {
            d3.select(this).remove();
        } else {
            d3.select(this)
                .attr('d', fullpath)
                .style('stroke', 'none');
        }
    });
}

function joinAllPaths(pi, perimeter) {
    var fullpath = '';
    var i = 0;
    var startsleft = pi.edgepaths.map(function(v, i) { return i; });
    var newloop = true;
    var endpt;
    var newendpt;
    var cnt;
    var nexti;
    var possiblei;
    var addpath;

    function istop(pt) { return Math.abs(pt[1] - perimeter[0][1]) < 0.01; }
    function isbottom(pt) { return Math.abs(pt[1] - perimeter[2][1]) < 0.01; }
    function isleft(pt) { return Math.abs(pt[0] - perimeter[0][0]) < 0.01; }
    function isright(pt) { return Math.abs(pt[0] - perimeter[2][0]) < 0.01; }

    while(startsleft.length) {
        addpath = Drawing.smoothopen(pi.edgepaths[i], pi.smoothing);
        fullpath += newloop ? addpath : addpath.replace(/^M/, 'L');
        startsleft.splice(startsleft.indexOf(i), 1);
        endpt = pi.edgepaths[i][pi.edgepaths[i].length - 1];
        nexti = -1;

        // now loop through sides, moving our endpoint until we find a new start
        for(cnt = 0; cnt < 4; cnt++) { // just to prevent infinite loops
            if(!endpt) {
                Lib.log('Missing end?', i, pi);
                break;
            }

            if(istop(endpt) && !isright(endpt)) newendpt = perimeter[1]; // right top
            else if(isleft(endpt)) newendpt = perimeter[0]; // left top
            else if(isbottom(endpt)) newendpt = perimeter[3]; // right bottom
            else if(isright(endpt)) newendpt = perimeter[2]; // left bottom

            for(possiblei = 0; possiblei < pi.edgepaths.length; possiblei++) {
                var ptNew = pi.edgepaths[possiblei][0];
                // is ptNew on the (horz. or vert.) segment from endpt to newendpt?
                if(Math.abs(endpt[0] - newendpt[0]) < 0.01) {
                    if(Math.abs(endpt[0] - ptNew[0]) < 0.01 &&
                            (ptNew[1] - endpt[1]) * (newendpt[1] - ptNew[1]) >= 0) {
                        newendpt = ptNew;
                        nexti = possiblei;
                    }
                } else if(Math.abs(endpt[1] - newendpt[1]) < 0.01) {
                    if(Math.abs(endpt[1] - ptNew[1]) < 0.01 &&
                            (ptNew[0] - endpt[0]) * (newendpt[0] - ptNew[0]) >= 0) {
                        newendpt = ptNew;
                        nexti = possiblei;
                    }
                } else {
                    Lib.log('endpt to newendpt is not vert. or horz.',
                        endpt, newendpt, ptNew);
                }
            }

            endpt = newendpt;

            if(nexti >= 0) break;
            fullpath += 'L' + newendpt;
        }

        if(nexti === pi.edgepaths.length) {
            Lib.log('unclosed perimeter path');
            break;
        }

        i = nexti;

        // if we closed back on a loop we already included,
        // close it and start a new loop
        newloop = (startsleft.indexOf(i) === -1);
        if(newloop) {
            i = startsleft[0];
            fullpath += 'Z';
        }
    }

    // finally add the interior paths
    for(i = 0; i < pi.paths.length; i++) {
        fullpath += Drawing.smoothclosed(pi.paths[i], pi.smoothing);
    }

    return fullpath;
}

function makeLinesAndLabels(plotgroup, pathinfo, gd, cd0, contours) {
    var lineContainer = Lib.ensureSingle(plotgroup, 'g', 'contourlines');
    var showLines = contours.showlines !== false;
    var showLabels = contours.showlabels;
    var clipLinesForLabels = showLines && showLabels;

    // Even if we're not going to show lines, we need to create them
    // if we're showing labels, because the fill paths include the perimeter
    // so can't be used to position the labels correctly.
    // In this case we'll remove the lines after making the labels.
    var linegroup = exports.createLines(lineContainer, showLines || showLabels, pathinfo);

    var lineClip = exports.createLineClip(lineContainer, clipLinesForLabels, gd, cd0.trace.uid);

    var labelGroup = plotgroup.selectAll('g.contourlabels')
        .data(showLabels ? [0] : []);

    labelGroup.exit().remove();

    labelGroup.enter().append('g')
        .classed('contourlabels', true);

    if(showLabels) {
        var labelClipPathData = [];
        var labelData = [];

        // invalidate the getTextLocation cache in case paths changed
        Lib.clearLocationCache();

        var contourFormat = exports.labelFormatter(gd, cd0);

        var dummyText = Drawing.tester.append('text')
            .attr('data-notex', 1)
            .call(Drawing.font, contours.labelfont);

        var xa = pathinfo[0].xaxis;
        var ya = pathinfo[0].yaxis;
        var xLen = xa._length;
        var yLen = ya._length;
        var xRng = xa.range;
        var yRng = ya.range;
        var xMin = Lib.aggNums(Math.min, null, cd0.x);
        var xMax = Lib.aggNums(Math.max, null, cd0.x);
        var yMin = Lib.aggNums(Math.min, null, cd0.y);
        var yMax = Lib.aggNums(Math.max, null, cd0.y);
        var x0 = Math.max(xa.c2p(xMin, true), 0);
        var x1 = Math.min(xa.c2p(xMax, true), xLen);
        var y0 = Math.max(ya.c2p(yMax, true), 0);
        var y1 = Math.min(ya.c2p(yMin, true), yLen);

        // visible bounds of the contour trace (and the midpoints, to
        // help with cost calculations)
        var bounds = {};

        if(xRng[0] < xRng[1]) {
            bounds.left = x0;
            bounds.right = x1;
        } else {
            bounds.left = x1;
            bounds.right = x0;
        }

        if(yRng[0] < yRng[1]) {
            bounds.top = y0;
            bounds.bottom = y1;
        } else {
            bounds.top = y1;
            bounds.bottom = y0;
        }

        bounds.middle = (bounds.top + bounds.bottom) / 2;
        bounds.center = (bounds.left + bounds.right) / 2;

        labelClipPathData.push([
            [bounds.left, bounds.top],
            [bounds.right, bounds.top],
            [bounds.right, bounds.bottom],
            [bounds.left, bounds.bottom]
        ]);

        var plotDiagonal = Math.sqrt(xLen * xLen + yLen * yLen);

        // the path length to use to scale the number of labels to draw:
        var normLength = constants.LABELDISTANCE * plotDiagonal /
            Math.max(1, pathinfo.length / constants.LABELINCREASE);

        linegroup.each(function(d) {
            var textOpts = exports.calcTextOpts(d.level, contourFormat, dummyText, gd);

            d3.select(this).selectAll('path').each(function() {
                var path = this;
                var pathBounds = Lib.getVisibleSegment(path, bounds, textOpts.height / 2);
                if(!pathBounds) return;

                if(pathBounds.len < (textOpts.width + textOpts.height) * constants.LABELMIN) return;

                var maxLabels = Math.min(Math.ceil(pathBounds.len / normLength),
                    constants.LABELMAX);

                for(var i = 0; i < maxLabels; i++) {
                    var loc = exports.findBestTextLocation(path, pathBounds, textOpts,
                        labelData, bounds);

                    if(!loc) break;

                    exports.addLabelData(loc, textOpts, labelData, labelClipPathData);
                }
            });
        });

        dummyText.remove();

        exports.drawLabels(labelGroup, labelData, gd, lineClip,
            clipLinesForLabels ? labelClipPathData : null);
    }

    if(showLabels && !showLines) linegroup.remove();
}

exports.createLines = function(lineContainer, makeLines, pathinfo) {
    var smoothing = pathinfo[0].smoothing;

    var linegroup = lineContainer.selectAll('g.contourlevel')
        .data(makeLines ? pathinfo : []);

    linegroup.exit().remove();
    linegroup.enter().append('g')
        .classed('contourlevel', true);

    if(makeLines) {
        // pedgepaths / ppaths are used by contourcarpet, for the paths transformed from a/b to x/y
        // edgepaths / paths are used by contour since it's in x/y from the start
        var opencontourlines = linegroup.selectAll('path.openline')
            .data(function(d) { return d.pedgepaths || d.edgepaths; });

        opencontourlines.exit().remove();
        opencontourlines.enter().append('path')
            .classed('openline', true);

        opencontourlines
            .attr('d', function(d) {
                return Drawing.smoothopen(d, smoothing);
            })
            .style('stroke-miterlimit', 1)
            .style('vector-effect', 'non-scaling-stroke');

        var closedcontourlines = linegroup.selectAll('path.closedline')
            .data(function(d) { return d.ppaths || d.paths; });

        closedcontourlines.exit().remove();
        closedcontourlines.enter().append('path')
            .classed('closedline', true);

        closedcontourlines
            .attr('d', function(d) {
                return Drawing.smoothclosed(d, smoothing);
            })
            .style('stroke-miterlimit', 1)
            .style('vector-effect', 'non-scaling-stroke');
    }

    return linegroup;
};

exports.createLineClip = function(lineContainer, clipLinesForLabels, gd, uid) {
    var clips = gd._fullLayout._clips;
    var clipId = clipLinesForLabels ? ('clipline' + uid) : null;

    var lineClip = clips.selectAll('#' + clipId)
        .data(clipLinesForLabels ? [0] : []);
    lineClip.exit().remove();

    lineClip.enter().append('clipPath')
        .classed('contourlineclip', true)
        .attr('id', clipId);

    Drawing.setClipUrl(lineContainer, clipId, gd);

    return lineClip;
};

exports.labelFormatter = function(gd, cd0) {
    var fullLayout = gd._fullLayout;
    var trace = cd0.trace;
    var contours = trace.contours;

    var formatAxis = {
        type: 'linear',
        _id: 'ycontour',
        showexponent: 'all',
        exponentformat: 'B'
    };

    if(contours.labelformat) {
        formatAxis.tickformat = contours.labelformat;
        setConvert(formatAxis, fullLayout);
    } else {
        var cOpts = Colorscale.extractOpts(trace);
        if(cOpts && cOpts.colorbar && cOpts.colorbar._axis) {
            formatAxis = cOpts.colorbar._axis;
        } else {
            if(contours.type === 'constraint') {
                var value = contours.value;
                if(Array.isArray(value)) {
                    formatAxis.range = [value[0], value[value.length - 1]];
                } else formatAxis.range = [value, value];
            } else {
                formatAxis.range = [contours.start, contours.end];
                formatAxis.nticks = (contours.end - contours.start) / contours.size;
            }

            if(formatAxis.range[0] === formatAxis.range[1]) {
                formatAxis.range[1] += formatAxis.range[0] || 1;
            }
            if(!formatAxis.nticks) formatAxis.nticks = 1000;

            setConvert(formatAxis, fullLayout);
            Axes.prepTicks(formatAxis);
            formatAxis._tmin = null;
            formatAxis._tmax = null;
        }
    }

    return function(v) { return Axes.tickText(formatAxis, v).text; };
};

exports.calcTextOpts = function(level, contourFormat, dummyText, gd) {
    var text = contourFormat(level);
    dummyText.text(text)
        .call(svgTextUtils.convertToTspans, gd);

    var el = dummyText.node();
    var bBox = Drawing.bBox(el, true);

    return {
        text: text,
        width: bBox.width,
        height: bBox.height,
        fontSize: +(el.style['font-size'].replace('px', '')),
        level: level,
        dy: (bBox.top + bBox.bottom) / 2
    };
};

exports.findBestTextLocation = function(path, pathBounds, textOpts, labelData, plotBounds) {
    var textWidth = textOpts.width;

    var p0, dp, pMax, pMin, loc;
    if(pathBounds.isClosed) {
        dp = pathBounds.len / costConstants.INITIALSEARCHPOINTS;
        p0 = pathBounds.min + dp / 2;
        pMax = pathBounds.max;
    } else {
        dp = (pathBounds.len - textWidth) / (costConstants.INITIALSEARCHPOINTS + 1);
        p0 = pathBounds.min + dp + textWidth / 2;
        pMax = pathBounds.max - (dp + textWidth) / 2;
    }

    var cost = Infinity;
    for(var j = 0; j < costConstants.ITERATIONS; j++) {
        for(var p = p0; p < pMax; p += dp) {
            var newLocation = Lib.getTextLocation(path, pathBounds.total, p, textWidth);
            var newCost = locationCost(newLocation, textOpts, labelData, plotBounds);
            if(newCost < cost) {
                cost = newCost;
                loc = newLocation;
                pMin = p;
            }
        }
        if(cost > costConstants.MAXCOST * 2) break;

        // subsequent iterations just look half steps away from the
        // best we found in the previous iteration
        if(j) dp /= 2;
        p0 = pMin - dp / 2;
        pMax = p0 + dp * 1.5;
    }
    if(cost <= costConstants.MAXCOST) return loc;
};

/*
 * locationCost: a cost function for label locations
 * composed of three kinds of penalty:
 * - for open paths, being close to the end of the path
 * - the angle away from horizontal
 * - being too close to already placed neighbors
 */
function locationCost(loc, textOpts, labelData, bounds) {
    var halfWidth = textOpts.width / 2;
    var halfHeight = textOpts.height / 2;
    var x = loc.x;
    var y = loc.y;
    var theta = loc.theta;
    var dx = Math.cos(theta) * halfWidth;
    var dy = Math.sin(theta) * halfWidth;

    // cost for being near an edge
    var normX = ((x > bounds.center) ? (bounds.right - x) : (x - bounds.left)) /
        (dx + Math.abs(Math.sin(theta) * halfHeight));
    var normY = ((y > bounds.middle) ? (bounds.bottom - y) : (y - bounds.top)) /
        (Math.abs(dy) + Math.cos(theta) * halfHeight);
    if(normX < 1 || normY < 1) return Infinity;
    var cost = costConstants.EDGECOST * (1 / (normX - 1) + 1 / (normY - 1));

    // cost for not being horizontal
    cost += costConstants.ANGLECOST * theta * theta;

    // cost for being close to other labels
    var x1 = x - dx;
    var y1 = y - dy;
    var x2 = x + dx;
    var y2 = y + dy;
    for(var i = 0; i < labelData.length; i++) {
        var labeli = labelData[i];
        var dxd = Math.cos(labeli.theta) * labeli.width / 2;
        var dyd = Math.sin(labeli.theta) * labeli.width / 2;
        var dist = Lib.segmentDistance(
            x1, y1,
            x2, y2,
            labeli.x - dxd, labeli.y - dyd,
            labeli.x + dxd, labeli.y + dyd
        ) * 2 / (textOpts.height + labeli.height);

        var sameLevel = labeli.level === textOpts.level;
        var distOffset = sameLevel ? costConstants.SAMELEVELDISTANCE : 1;

        if(dist <= distOffset) return Infinity;

        var distFactor = costConstants.NEIGHBORCOST *
            (sameLevel ? costConstants.SAMELEVELFACTOR : 1);

        cost += distFactor / (dist - distOffset);
    }

    return cost;
}

exports.addLabelData = function(loc, textOpts, labelData, labelClipPathData) {
    var fontSize = textOpts.fontSize;
    var w = textOpts.width + fontSize / 3;
    var h = Math.max(0, textOpts.height - fontSize / 3);

    var x = loc.x;
    var y = loc.y;
    var theta = loc.theta;

    var sin = Math.sin(theta);
    var cos = Math.cos(theta);

    var rotateXY = function(dx, dy) {
        return [
            x + dx * cos - dy * sin,
            y + dx * sin + dy * cos
        ];
    };

    var bBoxPts = [
        rotateXY(-w / 2, -h / 2),
        rotateXY(-w / 2, h / 2),
        rotateXY(w / 2, h / 2),
        rotateXY(w / 2, -h / 2)
    ];

    labelData.push({
        text: textOpts.text,
        x: x,
        y: y,
        dy: textOpts.dy,
        theta: theta,
        level: textOpts.level,
        width: w,
        height: h
    });

    labelClipPathData.push(bBoxPts);
};

exports.drawLabels = function(labelGroup, labelData, gd, lineClip, labelClipPathData) {
    var labels = labelGroup.selectAll('text')
        .data(labelData, function(d) {
            return d.text + ',' + d.x + ',' + d.y + ',' + d.theta;
        });

    labels.exit().remove();

    labels.enter().append('text')
        .attr({
            'data-notex': 1,
            'text-anchor': 'middle'
        })
        .each(function(d) {
            var x = d.x + Math.sin(d.theta) * d.dy;
            var y = d.y - Math.cos(d.theta) * d.dy;
            d3.select(this)
                .text(d.text)
                .attr({
                    x: x,
                    y: y,
                    transform: 'rotate(' + (180 * d.theta / Math.PI) + ' ' + x + ' ' + y + ')'
                })
                .call(svgTextUtils.convertToTspans, gd);
        });

    if(labelClipPathData) {
        var clipPath = '';
        for(var i = 0; i < labelClipPathData.length; i++) {
            clipPath += 'M' + labelClipPathData[i].join('L') + 'Z';
        }

        var lineClipPath = Lib.ensureSingle(lineClip, 'path', '');
        lineClipPath.attr('d', clipPath);
    }
};

function clipGaps(plotGroup, plotinfo, gd, cd0, perimeter) {
    var trace = cd0.trace;
    var clips = gd._fullLayout._clips;
    var clipId = 'clip' + trace.uid;

    var clipPath = clips.selectAll('#' + clipId)
        .data(trace.connectgaps ? [] : [0]);
    clipPath.enter().append('clipPath')
        .classed('contourclip', true)
        .attr('id', clipId);
    clipPath.exit().remove();

    if(trace.connectgaps === false) {
        var clipPathInfo = {
            // fraction of the way from missing to present point
            // to draw the boundary.
            // if you make this 1 (or 1-epsilon) then a point in
            // a sea of missing data will disappear entirely.
            level: 0.9,
            crossings: {},
            starts: [],
            edgepaths: [],
            paths: [],
            xaxis: plotinfo.xaxis,
            yaxis: plotinfo.yaxis,
            x: cd0.x,
            y: cd0.y,
            // 0 = no data, 1 = data
            z: makeClipMask(cd0),
            smoothing: 0
        };

        makeCrossings([clipPathInfo]);
        findAllPaths([clipPathInfo]);
        closeBoundaries([clipPathInfo], {type: 'levels'});

        var path = Lib.ensureSingle(clipPath, 'path', '');
        path.attr('d',
            (clipPathInfo.prefixBoundary ? 'M' + perimeter.join('L') + 'Z' : '') +
            joinAllPaths(clipPathInfo, perimeter)
        );
    } else clipId = null;

    Drawing.setClipUrl(plotGroup, clipId, gd);
}

function makeClipMask(cd0) {
    var empties = cd0.trace._emptypoints;
    var z = [];
    var m = cd0.z.length;
    var n = cd0.z[0].length;
    var i;
    var row = [];
    var emptyPoint;

    for(i = 0; i < n; i++) row.push(1);
    for(i = 0; i < m; i++) z.push(row.slice());
    for(i = 0; i < empties.length; i++) {
        emptyPoint = empties[i];
        z[emptyPoint[0]][emptyPoint[1]] = 0;
    }
    // save this mask to determine whether to show this data in hover
    cd0.zmask = z;
    return z;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/style.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/style.js ***!
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




var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var heatmapStyle = __webpack_require__(/*! ../heatmap/style */ "./node_modules/plotly.js/src/traces/heatmap/style.js");

var makeColorMap = __webpack_require__(/*! ./make_color_map */ "./node_modules/plotly.js/src/traces/contour/make_color_map.js");


module.exports = function style(gd) {
    var contours = d3.select(gd).selectAll('g.contour');

    contours.style('opacity', function(d) {
        return d[0].trace.opacity;
    });

    contours.each(function(d) {
        var c = d3.select(this);
        var trace = d[0].trace;
        var contours = trace.contours;
        var line = trace.line;
        var cs = contours.size || 1;
        var start = contours.start;

        // for contourcarpet only - is this a constraint-type contour trace?
        var isConstraintType = contours.type === 'constraint';
        var colorLines = !isConstraintType && contours.coloring === 'lines';
        var colorFills = !isConstraintType && contours.coloring === 'fill';

        var colorMap = (colorLines || colorFills) ? makeColorMap(trace) : null;

        c.selectAll('g.contourlevel').each(function(d) {
            d3.select(this).selectAll('path')
                .call(Drawing.lineGroupStyle,
                    line.width,
                    colorLines ? colorMap(d.level) : line.color,
                    line.dash);
        });

        var labelFont = contours.labelfont;
        c.selectAll('g.contourlabels text').each(function(d) {
            Drawing.font(d3.select(this), {
                family: labelFont.family,
                size: labelFont.size,
                color: labelFont.color || (colorLines ? colorMap(d.level) : line.color)
            });
        });

        if(isConstraintType) {
            c.selectAll('g.contourfill path')
                .style('fill', trace.fillcolor);
        } else if(colorFills) {
            var firstFill;

            c.selectAll('g.contourfill path')
                .style('fill', function(d) {
                    if(firstFill === undefined) firstFill = d.level;
                    return colorMap(d.level + 0.5 * cs);
                });

            if(firstFill === undefined) firstFill = start;

            c.selectAll('g.contourbg path')
                .style('fill', colorMap(firstFill - 0.5 * cs));
        }
    });

    heatmapStyle(gd);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvY2xvc2VfYm91bmRhcmllcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY29udG91ci9jb25zdHJhaW50X21hcHBpbmcuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL2NvbnZlcnRfdG9fY29uc3RyYWludHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL2VtcHR5X3BhdGhpbmZvLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY29udG91ci9maW5kX2FsbF9wYXRocy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvbWFrZV9jcm9zc2luZ3MuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL3Bsb3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QWMsb0JBQW9CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNockJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7O0FBRXJCLGNBQWMsbUJBQU8sQ0FBQywwRkFBMEI7QUFDaEQsbUJBQW1CLG1CQUFPLENBQUMsOEVBQWtCOztBQUU3QyxtQkFBbUIsbUJBQU8sQ0FBQyx1RkFBa0I7OztBQUc3QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EiLCJmaWxlIjoiY2hhcnRkYmZmZTJmMjJlMjVjOGRlNjMwZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwYXRoaW5mbywgY29udG91cnMpIHtcbiAgICB2YXIgcGkwID0gcGF0aGluZm9bMF07XG4gICAgdmFyIHogPSBwaTAuejtcbiAgICB2YXIgaTtcblxuICAgIHN3aXRjaChjb250b3Vycy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xldmVscyc6XG4gICAgICAgICAgICAvLyBXaHkgKGp1c3QpIHVzZSB6WzBdWzBdIGFuZCB6WzBdWzFdP1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIE4uQi4gdXNpbmcgYm91bmRhcnlNaW4gaW5zdGVhZCBvZiBlZGdlVmFsMiBoZXJlIG1ha2VzIHRoZVxuICAgICAgICAgICAgLy8gICAgICBgY29udG91cl9zY2F0dGVyYCBtb2NrIGZhaWxcbiAgICAgICAgICAgIHZhciBlZGdlVmFsMiA9IE1hdGgubWluKHpbMF1bMF0sIHpbMF1bMV0pO1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBwYXRoaW5mby5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBwaSA9IHBhdGhpbmZvW2ldO1xuICAgICAgICAgICAgICAgIHBpLnByZWZpeEJvdW5kYXJ5ID0gIXBpLmVkZ2VwYXRocy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAgICAgKGVkZ2VWYWwyID4gcGkubGV2ZWwgfHwgcGkuc3RhcnRzLmxlbmd0aCAmJiBlZGdlVmFsMiA9PT0gcGkubGV2ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NvbnN0cmFpbnQnOlxuICAgICAgICAgICAgLy8gYWZ0ZXIgY29udmVydFRvQ29uc3RyYWludHMsIHBhdGhpbmZvIGhhcyBsZW5ndGg9MFxuICAgICAgICAgICAgcGkwLnByZWZpeEJvdW5kYXJ5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGpvaW5BbGxQYXRocyBkb2VzIGVub3VnaCBhbHJlYWR5IHdoZW4gZWRnZXBhdGhzIGFyZSBwcmVzZW50XG4gICAgICAgICAgICBpZihwaTAuZWRnZXBhdGhzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgbmEgPSBwaTAueC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgbmIgPSBwaTAueS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgYm91bmRhcnlNYXggPSAtSW5maW5pdHk7XG4gICAgICAgICAgICB2YXIgYm91bmRhcnlNaW4gPSBJbmZpbml0eTtcblxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbmI7IGkrKykge1xuICAgICAgICAgICAgICAgIGJvdW5kYXJ5TWluID0gTWF0aC5taW4oYm91bmRhcnlNaW4sIHpbaV1bMF0pO1xuICAgICAgICAgICAgICAgIGJvdW5kYXJ5TWluID0gTWF0aC5taW4oYm91bmRhcnlNaW4sIHpbaV1bbmEgLSAxXSk7XG4gICAgICAgICAgICAgICAgYm91bmRhcnlNYXggPSBNYXRoLm1heChib3VuZGFyeU1heCwgeltpXVswXSk7XG4gICAgICAgICAgICAgICAgYm91bmRhcnlNYXggPSBNYXRoLm1heChib3VuZGFyeU1heCwgeltpXVtuYSAtIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8IG5hIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm91bmRhcnlNaW4gPSBNYXRoLm1pbihib3VuZGFyeU1pbiwgelswXVtpXSk7XG4gICAgICAgICAgICAgICAgYm91bmRhcnlNaW4gPSBNYXRoLm1pbihib3VuZGFyeU1pbiwgeltuYiAtIDFdW2ldKTtcbiAgICAgICAgICAgICAgICBib3VuZGFyeU1heCA9IE1hdGgubWF4KGJvdW5kYXJ5TWF4LCB6WzBdW2ldKTtcbiAgICAgICAgICAgICAgICBib3VuZGFyeU1heCA9IE1hdGgubWF4KGJvdW5kYXJ5TWF4LCB6W25iIC0gMV1baV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29udG91cnNWYWx1ZSA9IGNvbnRvdXJzLnZhbHVlO1xuICAgICAgICAgICAgdmFyIHYxLCB2MjtcblxuICAgICAgICAgICAgc3dpdGNoKGNvbnRvdXJzLl9vcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICAgICAgICAgICAgaWYoY29udG91cnNWYWx1ZSA+IGJvdW5kYXJ5TWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaTAucHJlZml4Qm91bmRhcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgICAgICAgICAgICBpZihjb250b3Vyc1ZhbHVlIDwgYm91bmRhcnlNaW4gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChwaTAuc3RhcnRzLmxlbmd0aCAmJiBjb250b3Vyc1ZhbHVlID09PSBib3VuZGFyeU1pbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpMC5wcmVmaXhCb3VuZGFyeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnW10nOlxuICAgICAgICAgICAgICAgICAgICB2MSA9IE1hdGgubWluKGNvbnRvdXJzVmFsdWVbMF0sIGNvbnRvdXJzVmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICB2MiA9IE1hdGgubWF4KGNvbnRvdXJzVmFsdWVbMF0sIGNvbnRvdXJzVmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBpZih2MiA8IGJvdW5kYXJ5TWluIHx8IHYxID4gYm91bmRhcnlNYXggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChwaTAuc3RhcnRzLmxlbmd0aCAmJiB2MiA9PT0gYm91bmRhcnlNaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaTAucHJlZml4Qm91bmRhcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ11bJzpcbiAgICAgICAgICAgICAgICAgICAgdjEgPSBNYXRoLm1pbihjb250b3Vyc1ZhbHVlWzBdLCBjb250b3Vyc1ZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgdjIgPSBNYXRoLm1heChjb250b3Vyc1ZhbHVlWzBdLCBjb250b3Vyc1ZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodjEgPCBib3VuZGFyeU1pbiAmJiB2MiA+IGJvdW5kYXJ5TWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaTAucHJlZml4Qm91bmRhcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIHNvbWUgY29uc3RhbnRzIHRvIGhlbHAgd2l0aCBtYXJjaGluZyBzcXVhcmVzIGFsZ29yaXRobVxuICAgIC8vIHdoZXJlIGRvZXMgdGhlIHBhdGggc3RhcnQgZm9yIGVhY2ggaW5kZXg/XG4gICAgQk9UVE9NU1RBUlQ6IFsxLCA5LCAxMywgMTA0LCA3MTNdLFxuICAgIFRPUFNUQVJUOiBbNCwgNiwgNywgMTA0LCA3MTNdLFxuICAgIExFRlRTVEFSVDogWzgsIDEyLCAxNCwgMjA4LCAxMTE0XSxcbiAgICBSSUdIVFNUQVJUOiBbMiwgMywgMTEsIDIwOCwgMTExNF0sXG5cbiAgICAvLyB3aGljaCB3YXkgW2R4LGR5XSBkbyB3ZSBsZWF2ZSBhIGdpdmVuIGluZGV4P1xuICAgIC8vIHNhZGRsZXMgYXJlIGFscmVhZHkgZGlzYW1iaWd1YXRlZFxuICAgIE5FV0RFTFRBOiBbXG4gICAgICAgIG51bGwsIFstMSwgMF0sIFswLCAtMV0sIFstMSwgMF0sXG4gICAgICAgIFsxLCAwXSwgbnVsbCwgWzAsIC0xXSwgWy0xLCAwXSxcbiAgICAgICAgWzAsIDFdLCBbMCwgMV0sIG51bGwsIFswLCAxXSxcbiAgICAgICAgWzEsIDBdLCBbMSwgMF0sIFswLCAtMV1cbiAgICBdLFxuXG4gICAgLy8gZm9yIGVhY2ggc2FkZGxlLCB0aGUgZmlyc3QgaW5kZXggaGVyZSBpcyB1c2VkXG4gICAgLy8gZm9yIGR4fHxkeTwwLCB0aGUgc2Vjb25kIGZvciBkeHx8ZHk+MFxuICAgIENIT09TRVNBRERMRToge1xuICAgICAgICAxMDQ6IFs0LCAxXSxcbiAgICAgICAgMjA4OiBbMiwgOF0sXG4gICAgICAgIDcxMzogWzcsIDEzXSxcbiAgICAgICAgMTExNDogWzExLCAxNF1cbiAgICB9LFxuXG4gICAgLy8gYWZ0ZXIgb25lIGluZGV4IGhhcyBiZWVuIHVzZWQgZm9yIGEgc2FkZGxlLCB3aGljaCBkbyB3ZVxuICAgIC8vIHN1YnN0aXR1dGUgdG8gYmUgdXNlZCB1cCBsYXRlcj9cbiAgICBTQURETEVSRU1BSU5ERVI6IHsxOiA0LCAyOiA4LCA0OiAxLCA3OiAxMywgODogMiwgMTE6IDE0LCAxMzogNywgMTQ6IDExfSxcblxuICAgIC8vIGxlbmd0aCBvZiBhIGNvbnRvdXIsIGFzIGEgbXVsdGlwbGUgb2YgdGhlIHBsb3QgYXJlYSBkaWFnb25hbCwgcGVyIGxhYmVsXG4gICAgTEFCRUxESVNUQU5DRTogMixcblxuICAgIC8vIG51bWJlciBvZiBjb250b3VyIGxldmVscyBhZnRlciB3aGljaCB3ZSBzdGFydCBpbmNyZWFzaW5nIHRoZSBudW1iZXIgb2ZcbiAgICAvLyBsYWJlbHMgd2UgZHJhdy4gTWFueSBjb250b3VycyBtZWFucyB0aGV5IHdpbGwgZ2VuZXJhbGx5IGJlIGNsb3NlXG4gICAgLy8gdG9nZXRoZXIsIHNvIGl0IHdpbGwgYmUgaGFyZGVyIHRvIGZvbGxvdyBhIGxvbmcgd2F5IHRvIGZpbmQgYSBsYWJlbFxuICAgIExBQkVMSU5DUkVBU0U6IDEwLFxuXG4gICAgLy8gbWluaW11bSBsZW5ndGggb2YgYSBjb250b3VyIGxpbmUsIGFzIGEgbXVsdGlwbGUgb2YgdGhlIGxhYmVsIGxlbmd0aCxcbiAgICAvLyBhdCB3aGljaCB3ZSBkcmF3ICphbnkqIGxhYmVsc1xuICAgIExBQkVMTUlOOiAzLFxuXG4gICAgLy8gbWF4IG51bWJlciBvZiBsYWJlbHMgdG8gZHJhdyBvbiBhIHNpbmdsZSBjb250b3VyIHBhdGgsIG5vIG1hdHRlciBob3cgbG9uZ1xuICAgIExBQkVMTUFYOiAxMCxcblxuICAgIC8vIGNvbnN0YW50cyBmb3IgdGhlIGxhYmVsIHBvc2l0aW9uIGNvc3QgZnVuY3Rpb25cbiAgICBMQUJFTE9QVElNSVpFUjoge1xuICAgICAgICAvLyB3ZWlnaHQgZ2l2ZW4gdG8gZWRnZSBwcm94aW1pdHlcbiAgICAgICAgRURHRUNPU1Q6IDEsXG4gICAgICAgIC8vIHdlaWdodCBnaXZlbiB0byB0aGUgYW5nbGUgb2ZmIGhvcml6b250YWxcbiAgICAgICAgQU5HTEVDT1NUOiAxLFxuICAgICAgICAvLyB3ZWlnaHQgZ2l2ZW4gdG8gZGlzdGFuY2UgZnJvbSBhbHJlYWR5LXBsYWNlZCBsYWJlbHNcbiAgICAgICAgTkVJR0hCT1JDT1NUOiA1LFxuICAgICAgICAvLyBjb3N0IG11bHRpcGxpZXIgZm9yIGxhYmVscyBvbiB0aGUgc2FtZSBsZXZlbFxuICAgICAgICBTQU1FTEVWRUxGQUNUT1I6IDEwLFxuICAgICAgICAvLyBtaW5pbXVtIGRpc3RhbmNlIChhcyBhIG11bHRpcGxlIG9mIHRoZSBsYWJlbCBsZW5ndGgpXG4gICAgICAgIC8vIGZvciBsYWJlbHMgb24gdGhlIHNhbWUgbGV2ZWxcbiAgICAgICAgU0FNRUxFVkVMRElTVEFOQ0U6IDUsXG4gICAgICAgIC8vIG1heGltdW0gY29zdCBiZWZvcmUgd2Ugd29uJ3QgZXZlbiBwbGFjZSB0aGUgbGFiZWxcbiAgICAgICAgTUFYQ09TVDogMTAwLFxuICAgICAgICAvLyBudW1iZXIgb2YgZXZlbmx5IHNwYWNlZCBwb2ludHMgdG8gbG9vayBhdCBpbiB0aGUgZmlyc3RcbiAgICAgICAgLy8gaXRlcmF0aW9uIG9mIHRoZSBzZWFyY2hcbiAgICAgICAgSU5JVElBTFNFQVJDSFBPSU5UUzogMTAsXG4gICAgICAgIC8vIG51bWJlciBvZiBiaW5hcnkgc2VhcmNoIGl0ZXJhdGlvbnMgYWZ0ZXIgdGhlIGluaXRpYWwgd2lkZSBzZWFyY2hcbiAgICAgICAgSVRFUkFUSU9OUzogNVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBmaWx0ZXJPcHMgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZmlsdGVyX29wcycpO1xudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG5cbi8vIFRoaXMgc3ludGF4IGNvbmZvcm1zIHRvIHRoZSBleGlzdGluZyBmaWx0ZXIgdHJhbnNmb3JtIHN5bnRheCwgYnV0IHdlIGRvbid0IGNhcmVcbi8vIGFib3V0IG9wZW4gdnMuIGNsb3NlZCBpbnRlcnZhbHMgZm9yIHNpbXBseSBkcmF3aW5nIGNvbnRvdXJzIGNvbnN0cmFpbnRzOlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ1tdJzogbWFrZVJhbmdlU2V0dGluZ3MoJ1tdJyksXG4gICAgJ11bJzogbWFrZVJhbmdlU2V0dGluZ3MoJ11bJyksXG4gICAgJz4nOiBtYWtlSW5lcXVhbGl0eVNldHRpbmdzKCc+JyksXG4gICAgJzwnOiBtYWtlSW5lcXVhbGl0eVNldHRpbmdzKCc8JyksXG4gICAgJz0nOiBtYWtlSW5lcXVhbGl0eVNldHRpbmdzKCc9Jylcbn07XG5cbi8vIFRoaXMgZG9lcyBub3QgaW4gYW55IHdheSBzaGFwZSBvciBmb3JtIHN1cHBvcnQgY2FsZW5kYXJzLiBJdCdzIGFkYXB0ZWQgZnJvbVxuLy8gdHJhbnNmb3Jtcy9maWx0ZXIuanMuXG5mdW5jdGlvbiBjb2VyY2VWYWx1ZShvcGVyYXRpb24sIHZhbHVlKSB7XG4gICAgdmFyIGhhc0FycmF5VmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcblxuICAgIHZhciBjb2VyY2VkVmFsdWU7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGlzTnVtZXJpYyh2YWx1ZSkgPyAoK3ZhbHVlKSA6IG51bGw7XG4gICAgfVxuXG4gICAgaWYoZmlsdGVyT3BzLkNPTVBBUklTT05fT1BTMi5pbmRleE9mKG9wZXJhdGlvbikgIT09IC0xKSB7XG4gICAgICAgIGNvZXJjZWRWYWx1ZSA9IGhhc0FycmF5VmFsdWUgPyBjb2VyY2UodmFsdWVbMF0pIDogY29lcmNlKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYoZmlsdGVyT3BzLklOVEVSVkFMX09QUy5pbmRleE9mKG9wZXJhdGlvbikgIT09IC0xKSB7XG4gICAgICAgIGNvZXJjZWRWYWx1ZSA9IGhhc0FycmF5VmFsdWUgP1xuICAgICAgICAgICAgW2NvZXJjZSh2YWx1ZVswXSksIGNvZXJjZSh2YWx1ZVsxXSldIDpcbiAgICAgICAgICAgIFtjb2VyY2UodmFsdWUpLCBjb2VyY2UodmFsdWUpXTtcbiAgICB9IGVsc2UgaWYoZmlsdGVyT3BzLlNFVF9PUFMuaW5kZXhPZihvcGVyYXRpb24pICE9PSAtMSkge1xuICAgICAgICBjb2VyY2VkVmFsdWUgPSBoYXNBcnJheVZhbHVlID8gdmFsdWUubWFwKGNvZXJjZSkgOiBbY29lcmNlKHZhbHVlKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvZXJjZWRWYWx1ZTtcbn1cblxuLy8gUmV0dXJucyBhIHBhcmFib2xhIHNjYWxlZCBzbyB0aGF0IHRoZSBtaW4vbWF4IGlzIGVpdGhlciArLy0gMSBhbmQgemVybyBhdCB0aGUgdHdvIHZhbHVlc1xuLy8gcHJvdmlkZWQuIFRoZSBkYXRhIGlzIG1hcHBlZCBieSB0aGlzIGZ1bmN0aW9uIHdoZW4gY29uc3RydWN0aW5nIGludGVydmFscyBzbyB0aGF0IGl0J3Ncbi8vIHZlcnkgZWFzeSB0byBjb25zdHJ1Y3QgY29udG91cnMgYXMgbm9ybWFsLlxuZnVuY3Rpb24gbWFrZVJhbmdlU2V0dGluZ3Mob3BlcmF0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhbHVlID0gY29lcmNlVmFsdWUob3BlcmF0aW9uLCB2YWx1ZSk7XG5cbiAgICAgICAgLy8gRW5zdXJlIHByb3BlciBvcmRlcmluZzpcbiAgICAgICAgdmFyIG1pbiA9IE1hdGgubWluKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgICAgIHZhciBtYXggPSBNYXRoLm1heCh2YWx1ZVswXSwgdmFsdWVbMV0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDogbWluLFxuICAgICAgICAgICAgZW5kOiBtYXgsXG4gICAgICAgICAgICBzaXplOiBtYXggLSBtaW5cbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBtYWtlSW5lcXVhbGl0eVNldHRpbmdzKG9wZXJhdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB2YWx1ZSA9IGNvZXJjZVZhbHVlKG9wZXJhdGlvbiwgdmFsdWUpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDogdmFsdWUsXG4gICAgICAgICAgICBlbmQ6IEluZmluaXR5LFxuICAgICAgICAgICAgc2l6ZTogSW5maW5pdHlcbiAgICAgICAgfTtcbiAgICB9O1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbi8vIFRoZSBjb250b3VyIGV4dHJhY3Rpb24gaXMgZ3JlYXQsIGV4Y2VwdCBpdCB0b3RhbGx5IGZhaWxzIGZvciBjb25zdHJhaW50cyBiZWNhdXNlIHdlXG4vLyBuZWVkIHdlaXJkIHJhbmdlIGxvb3BzIGFuZCBmbGlwcGVkIGNvbnRvdXJzIGluc3RlYWQgb2YgdGhlIHVzdWFsIGZvcm1hdC4gVGhpcyBmdW5jdGlvblxuLy8gZG9lcyBzb21lIHdlaXJkIG1hbmlwdWxhdGlvbiBvZiB0aGUgZXh0cmFjdGVkIHBhdGhpbmZvIGRhdGEgc3VjaCB0aGF0IGl0IG1hZ2ljYWxseVxuLy8gZHJhd3MgY29udG91cnMgY29ycmVjdGx5ICphcyogY29uc3RyYWludHMuXG4vL1xuLy8gKiogSSBkbyBub3Qga25vdyB3aGljaCBcIndlaXJkIHJhbmdlIGxvb3BzXCIgdGhlIGNvbW1lbnQgYWJvdmUgaXMgcmVmZXJyaW5nIHRvLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwYXRoaW5mbywgb3BlcmF0aW9uKSB7XG4gICAgdmFyIGksIHBpMCwgcGkxO1xuXG4gICAgdmFyIG9wMCA9IGZ1bmN0aW9uKGFycikgeyByZXR1cm4gYXJyLnJldmVyc2UoKTsgfTtcbiAgICB2YXIgb3AxID0gZnVuY3Rpb24oYXJyKSB7IHJldHVybiBhcnI7IH07XG5cbiAgICBzd2l0Y2gob3BlcmF0aW9uKSB7XG4gICAgICAgIGNhc2UgJz0nOlxuICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICAgIHJldHVybiBwYXRoaW5mbztcbiAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgICBpZihwYXRoaW5mby5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgICAgICBMaWIud2FybignQ29udG91ciBkYXRhIGludmFsaWQgZm9yIHRoZSBzcGVjaWZpZWQgaW5lcXVhbGl0eSBvcGVyYXRpb24uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEluIHRoaXMgY2FzZSB0aGVyZSBzaG91bGQgYmUgZXhhY3RseSBvbmUgY29udG91ciBsZXZlbHMgaW4gcGF0aGluZm8uXG4gICAgICAgICAgICAvLyBXZSBmbGlwIGFsbCBvZiB0aGUgZGF0YS4gVGhpcyB3aWxsIGRyYXcgdGhlIGNvbnRvdXIgYXMgY2xvc2VkLlxuICAgICAgICAgICAgcGkwID0gcGF0aGluZm9bMF07XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHBpMC5lZGdlcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwaTAuZWRnZXBhdGhzW2ldID0gb3AwKHBpMC5lZGdlcGF0aHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgcGkwLnBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGkwLnBhdGhzW2ldID0gb3AwKHBpMC5wYXRoc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBwaTAuc3RhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGkwLnN0YXJ0c1tpXSA9IG9wMChwaTAuc3RhcnRzW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGhpbmZvO1xuICAgICAgICBjYXNlICddWyc6XG4gICAgICAgICAgICB2YXIgdG1wID0gb3AwO1xuICAgICAgICAgICAgb3AwID0gb3AxO1xuICAgICAgICAgICAgb3AxID0gdG1wO1xuICAgICAgICAgICAgLy8gSXQncyBhIG5pY2UgcnVsZSwgZXhjZXB0IHRoaXMgZGVmaW5pdGVseSAqaXMqIHdoYXQncyBpbnRlbmRlZCBoZXJlLlxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGU6IG5vLWZhbGx0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ1tdJzpcbiAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGU6IG5vLWZhbGx0aHJvdWdoICovXG4gICAgICAgICAgICBpZihwYXRoaW5mby5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgICAgICAgICBMaWIud2FybignQ29udG91ciBkYXRhIGludmFsaWQgZm9yIHRoZSBzcGVjaWZpZWQgaW5lcXVhbGl0eSByYW5nZSBvcGVyYXRpb24uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEluIHRoaXMgY2FzZSB0aGVyZSBzaG91bGQgYmUgZXhhY3RseSB0d28gY29udG91ciBsZXZlbHMgaW4gcGF0aGluZm8uXG4gICAgICAgICAgICAvLyAtIFdlIGNvbmNhdGVuYXRlIHRoZSBpbmZvIGludG8gb25lIHBhdGhpbmZvLlxuICAgICAgICAgICAgLy8gLSBXZSBtdXN0IGFsc28gZmxpcCBhbGwgb2YgdGhlIGRhdGEgaW4gdGhlIGBbXWAgY2FzZS5cbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBkcmF3IHRoZSBjb250b3VycyBhcyBjbG9zZWQuXG4gICAgICAgICAgICBwaTAgPSBjb3B5UGF0aGluZm8ocGF0aGluZm9bMF0pO1xuICAgICAgICAgICAgcGkxID0gY29weVBhdGhpbmZvKHBhdGhpbmZvWzFdKTtcblxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgcGkwLmVkZ2VwYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBpMC5lZGdlcGF0aHNbaV0gPSBvcDAocGkwLmVkZ2VwYXRoc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBwaTAucGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwaTAucGF0aHNbaV0gPSBvcDAocGkwLnBhdGhzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHBpMC5zdGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwaTAuc3RhcnRzW2ldID0gb3AwKHBpMC5zdGFydHNbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZShwaTEuZWRnZXBhdGhzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBpMC5lZGdlcGF0aHMucHVzaChvcDEocGkxLmVkZ2VwYXRocy5zaGlmdCgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZShwaTEucGF0aHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcGkwLnBhdGhzLnB1c2gob3AxKHBpMS5wYXRocy5zaGlmdCgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZShwaTEuc3RhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBpMC5zdGFydHMucHVzaChvcDEocGkxLnN0YXJ0cy5zaGlmdCgpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBbcGkwXTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjb3B5UGF0aGluZm8ocGkpIHtcbiAgICByZXR1cm4gTGliLmV4dGVuZEZsYXQoe30sIHBpLCB7XG4gICAgICAgIGVkZ2VwYXRoczogTGliLmV4dGVuZERlZXAoW10sIHBpLmVkZ2VwYXRocyksXG4gICAgICAgIHBhdGhzOiBMaWIuZXh0ZW5kRGVlcChbXSwgcGkucGF0aHMpLFxuICAgICAgICBzdGFydHM6IExpYi5leHRlbmREZWVwKFtdLCBwaS5zdGFydHMpXG4gICAgfSk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBjb25zdHJhaW50TWFwcGluZyA9IHJlcXVpcmUoJy4vY29uc3RyYWludF9tYXBwaW5nJyk7XG52YXIgZW5kUGx1cyA9IHJlcXVpcmUoJy4vZW5kX3BsdXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbXB0eVBhdGhpbmZvKGNvbnRvdXJzLCBwbG90aW5mbywgY2QwKSB7XG4gICAgdmFyIGNvbnRvdXJzRmluYWwgPSAoY29udG91cnMudHlwZSA9PT0gJ2NvbnN0cmFpbnQnKSA/XG4gICAgICAgIGNvbnN0cmFpbnRNYXBwaW5nW2NvbnRvdXJzLl9vcGVyYXRpb25dKGNvbnRvdXJzLnZhbHVlKSA6XG4gICAgICAgIGNvbnRvdXJzO1xuXG4gICAgdmFyIGNzID0gY29udG91cnNGaW5hbC5zaXplO1xuICAgIHZhciBwYXRoaW5mbyA9IFtdO1xuICAgIHZhciBlbmQgPSBlbmRQbHVzKGNvbnRvdXJzRmluYWwpO1xuXG4gICAgdmFyIGNhcnBldCA9IGNkMC50cmFjZS5fY2FycGV0VHJhY2U7XG5cbiAgICB2YXIgYmFzZVBhdGhpbmZvID0gY2FycGV0ID8ge1xuICAgICAgICAvLyBzdG9yZSBheGVzIHNvIHdlIGNhbiBjb252ZXJ0IHRvIHB4XG4gICAgICAgIHhheGlzOiBjYXJwZXQuYWF4aXMsXG4gICAgICAgIHlheGlzOiBjYXJwZXQuYmF4aXMsXG4gICAgICAgIC8vIGZ1bGwgZGF0YSBhcnJheXMgdG8gdXNlIGZvciBpbnRlcnBvbGF0aW9uXG4gICAgICAgIHg6IGNkMC5hLFxuICAgICAgICB5OiBjZDAuYlxuICAgIH0gOiB7XG4gICAgICAgIHhheGlzOiBwbG90aW5mby54YXhpcyxcbiAgICAgICAgeWF4aXM6IHBsb3RpbmZvLnlheGlzLFxuICAgICAgICB4OiBjZDAueCxcbiAgICAgICAgeTogY2QwLnlcbiAgICB9O1xuXG4gICAgZm9yKHZhciBjaSA9IGNvbnRvdXJzRmluYWwuc3RhcnQ7IGNpIDwgZW5kOyBjaSArPSBjcykge1xuICAgICAgICBwYXRoaW5mby5wdXNoKExpYi5leHRlbmRGbGF0KHtcbiAgICAgICAgICAgIGxldmVsOiBjaSxcbiAgICAgICAgICAgIC8vIGFsbCB0aGUgY2VsbHMgd2l0aCBub250cml2aWFsIG1hcmNoaW5nIGluZGV4XG4gICAgICAgICAgICBjcm9zc2luZ3M6IHt9LFxuICAgICAgICAgICAgLy8gc3RhcnRpbmcgcG9pbnRzIG9uIHRoZSBlZGdlcyBvZiB0aGUgbGF0dGljZSBmb3IgZWFjaCBjb250b3VyXG4gICAgICAgICAgICBzdGFydHM6IFtdLFxuICAgICAgICAgICAgLy8gYWxsIHVuY2xvc2VkIHBhdGhzIChtYXkgaGF2ZSBsZXNzIGl0ZW1zIHRoYW4gc3RhcnRzLFxuICAgICAgICAgICAgLy8gaWYgYSBwYXRoIGlzIGNsb3NlZCBieSByb3VuZGluZylcbiAgICAgICAgICAgIGVkZ2VwYXRoczogW10sXG4gICAgICAgICAgICAvLyBhbGwgY2xvc2VkIHBhdGhzXG4gICAgICAgICAgICBwYXRoczogW10sXG4gICAgICAgICAgICB6OiBjZDAueixcbiAgICAgICAgICAgIHNtb290aGluZzogY2QwLnRyYWNlLmxpbmUuc21vb3RoaW5nXG4gICAgICAgIH0sIGJhc2VQYXRoaW5mbykpO1xuXG4gICAgICAgIGlmKHBhdGhpbmZvLmxlbmd0aCA+IDEwMDApIHtcbiAgICAgICAgICAgIExpYi53YXJuKCdUb28gbWFueSBjb250b3VycywgY2xpcHBpbmcgYXQgMTAwMCcsIGNvbnRvdXJzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXRoaW5mbztcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbmRBbGxQYXRocyhwYXRoaW5mbywgeHRvbCwgeXRvbCkge1xuICAgIHZhciBjbnQsXG4gICAgICAgIHN0YXJ0TG9jLFxuICAgICAgICBpLFxuICAgICAgICBwaSxcbiAgICAgICAgajtcblxuICAgIC8vIERlZmF1bHQganVzdCBwYXNzZXMgdGhlc2UgdmFsdWVzIHRocm91Z2ggYXMgdGhleSB3ZXJlIGJlZm9yZTpcbiAgICB4dG9sID0geHRvbCB8fCAwLjAxO1xuICAgIHl0b2wgPSB5dG9sIHx8IDAuMDE7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBwYXRoaW5mby5sZW5ndGg7IGkrKykge1xuICAgICAgICBwaSA9IHBhdGhpbmZvW2ldO1xuXG4gICAgICAgIGZvcihqID0gMDsgaiA8IHBpLnN0YXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgc3RhcnRMb2MgPSBwaS5zdGFydHNbal07XG4gICAgICAgICAgICBtYWtlUGF0aChwaSwgc3RhcnRMb2MsICdlZGdlJywgeHRvbCwgeXRvbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjbnQgPSAwO1xuICAgICAgICB3aGlsZShPYmplY3Qua2V5cyhwaS5jcm9zc2luZ3MpLmxlbmd0aCAmJiBjbnQgPCAxMDAwMCkge1xuICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICBzdGFydExvYyA9IE9iamVjdC5rZXlzKHBpLmNyb3NzaW5ncylbMF0uc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgICAgIG1ha2VQYXRoKHBpLCBzdGFydExvYywgdW5kZWZpbmVkLCB4dG9sLCB5dG9sKTtcbiAgICAgICAgfVxuICAgICAgICBpZihjbnQgPT09IDEwMDAwKSBMaWIubG9nKCdJbmZpbml0ZSBsb29wIGluIGNvbnRvdXI/Jyk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZXF1YWxQdHMocHQxLCBwdDIsIHh0b2wsIHl0b2wpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMocHQxWzBdIC0gcHQyWzBdKSA8IHh0b2wgJiZcbiAgICAgICAgICAgTWF0aC5hYnMocHQxWzFdIC0gcHQyWzFdKSA8IHl0b2w7XG59XG5cbi8vIGRpc3RhbmNlIGluIGluZGV4IHVuaXRzIC0gdXNlcyB0aGUgM3JkIGFuZCA0dGggaXRlbXMgaW4gcG9pbnRzXG5mdW5jdGlvbiBwdERpc3QocHQxLCBwdDIpIHtcbiAgICB2YXIgZHggPSBwdDFbMl0gLSBwdDJbMl07XG4gICAgdmFyIGR5ID0gcHQxWzNdIC0gcHQyWzNdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xufVxuXG5mdW5jdGlvbiBtYWtlUGF0aChwaSwgbG9jLCBlZGdlZmxhZywgeHRvbCwgeXRvbCkge1xuICAgIHZhciBsb2NTdHIgPSBsb2Muam9pbignLCcpO1xuICAgIHZhciBtaSA9IHBpLmNyb3NzaW5nc1tsb2NTdHJdO1xuICAgIHZhciBtYXJjaFN0ZXAgPSBnZXRTdGFydFN0ZXAobWksIGVkZ2VmbGFnLCBsb2MpO1xuICAgIC8vIHN0YXJ0IGJ5IGdvaW5nIGJhY2t3YXJkIGEgaGFsZiBzdGVwIGFuZCBmaW5kaW5nIHRoZSBjcm9zc2luZyBwb2ludFxuICAgIHZhciBwdHMgPSBbZ2V0SW50ZXJwUHgocGksIGxvYywgWy1tYXJjaFN0ZXBbMF0sIC1tYXJjaFN0ZXBbMV1dKV07XG4gICAgdmFyIG0gPSBwaS56Lmxlbmd0aDtcbiAgICB2YXIgbiA9IHBpLnpbMF0ubGVuZ3RoO1xuICAgIHZhciBzdGFydExvYyA9IGxvYy5zbGljZSgpO1xuICAgIHZhciBzdGFydFN0ZXAgPSBtYXJjaFN0ZXAuc2xpY2UoKTtcbiAgICB2YXIgY250O1xuXG4gICAgLy8gbm93IGZvbGxvdyB0aGUgcGF0aFxuICAgIGZvcihjbnQgPSAwOyBjbnQgPCAxMDAwMDsgY250KyspIHsgLy8ganVzdCB0byBhdm9pZCBpbmZpbml0ZSBsb29wc1xuICAgICAgICBpZihtaSA+IDIwKSB7XG4gICAgICAgICAgICBtaSA9IGNvbnN0YW50cy5DSE9PU0VTQURETEVbbWldWyhtYXJjaFN0ZXBbMF0gfHwgbWFyY2hTdGVwWzFdKSA8IDAgPyAwIDogMV07XG4gICAgICAgICAgICBwaS5jcm9zc2luZ3NbbG9jU3RyXSA9IGNvbnN0YW50cy5TQURETEVSRU1BSU5ERVJbbWldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHBpLmNyb3NzaW5nc1tsb2NTdHJdO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFyY2hTdGVwID0gY29uc3RhbnRzLk5FV0RFTFRBW21pXTtcbiAgICAgICAgaWYoIW1hcmNoU3RlcCkge1xuICAgICAgICAgICAgTGliLmxvZygnRm91bmQgYmFkIG1hcmNoaW5nIGluZGV4OicsIG1pLCBsb2MsIHBpLmxldmVsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCB0aGUgY3Jvc3NpbmcgYSBoYWxmIHN0ZXAgZm9yd2FyZCwgYW5kIHRoZW4gdGFrZSB0aGUgZnVsbCBzdGVwXG4gICAgICAgIHB0cy5wdXNoKGdldEludGVycFB4KHBpLCBsb2MsIG1hcmNoU3RlcCkpO1xuICAgICAgICBsb2NbMF0gKz0gbWFyY2hTdGVwWzBdO1xuICAgICAgICBsb2NbMV0gKz0gbWFyY2hTdGVwWzFdO1xuICAgICAgICBsb2NTdHIgPSBsb2Muam9pbignLCcpO1xuXG4gICAgICAgIC8vIGRvbid0IGluY2x1ZGUgdGhlIHNhbWUgcG9pbnQgbXVsdGlwbGUgdGltZXNcbiAgICAgICAgaWYoZXF1YWxQdHMocHRzW3B0cy5sZW5ndGggLSAxXSwgcHRzW3B0cy5sZW5ndGggLSAyXSwgeHRvbCwgeXRvbCkpIHB0cy5wb3AoKTtcblxuICAgICAgICB2YXIgYXRFZGdlID0gKG1hcmNoU3RlcFswXSAmJiAobG9jWzBdIDwgMCB8fCBsb2NbMF0gPiBuIC0gMikpIHx8XG4gICAgICAgICAgICAgICAgKG1hcmNoU3RlcFsxXSAmJiAobG9jWzFdIDwgMCB8fCBsb2NbMV0gPiBtIC0gMikpO1xuXG4gICAgICAgIHZhciBjbG9zZWRMb29wID0gbG9jWzBdID09PSBzdGFydExvY1swXSAmJiBsb2NbMV0gPT09IHN0YXJ0TG9jWzFdICYmXG4gICAgICAgICAgICAgICAgbWFyY2hTdGVwWzBdID09PSBzdGFydFN0ZXBbMF0gJiYgbWFyY2hTdGVwWzFdID09PSBzdGFydFN0ZXBbMV07XG5cbiAgICAgICAgLy8gaGF2ZSB3ZSBjb21wbGV0ZWQgYSBsb29wLCBvciByZWFjaGVkIGFuIGVkZ2U/XG4gICAgICAgIGlmKChjbG9zZWRMb29wKSB8fCAoZWRnZWZsYWcgJiYgYXRFZGdlKSkgYnJlYWs7XG5cbiAgICAgICAgbWkgPSBwaS5jcm9zc2luZ3NbbG9jU3RyXTtcbiAgICB9XG5cbiAgICBpZihjbnQgPT09IDEwMDAwKSB7XG4gICAgICAgIExpYi5sb2coJ0luZmluaXRlIGxvb3AgaW4gY29udG91cj8nKTtcbiAgICB9XG4gICAgdmFyIGNsb3NlZHBhdGggPSBlcXVhbFB0cyhwdHNbMF0sIHB0c1twdHMubGVuZ3RoIC0gMV0sIHh0b2wsIHl0b2wpO1xuICAgIHZhciB0b3RhbGRpc3QgPSAwO1xuICAgIHZhciBkaXN0VGhyZXNob2xkRmFjdG9yID0gMC4yICogcGkuc21vb3RoaW5nO1xuICAgIHZhciBhbGxkaXN0cyA9IFtdO1xuICAgIHZhciBjcm9wc3RhcnQgPSAwO1xuICAgIHZhciBkaXN0Z3JvdXAsIGNudDIsIGNudDMsIG5ld3B0LCBwdGNudCwgcHRhdmcsIHRoaXNkaXN0LFxuICAgICAgICBpLCBqLCBlZGdlcGF0aGksIGVkZ2VwYXRoajtcblxuICAgIC8qXG4gICAgICogQ2hlY2sgZm9yIHBvaW50cyB0aGF0IGFyZSB0b28gY2xvc2UgdG9nZXRoZXIgKDwxLzUgdGhlIGF2ZXJhZ2UgZGlzdFxuICAgICAqICppbiBncmlkIGluZGV4IHVuaXRzKiAoaW1wb3J0YW50IGZvciBsb2cgYXhlcyBhbmQgbm9udW5pZm9ybSBncmlkcyksXG4gICAgICogbGVzcyBpZiBsZXNzIHNtb290aGVkKSBhbmQganVzdCB0YWtlIHRoZSBjZW50ZXIgKG9yIGF2ZyBvZiBjZW50ZXIgMikuXG4gICAgICogVGhpcyBjdXRzIGRvd24gb24gZnVubnkgYmVoYXZpb3Igd2hlbiBhIHBvaW50IGlzIHZlcnkgY2xvc2UgdG8gYVxuICAgICAqIGNvbnRvdXIgbGV2ZWwuXG4gICAgICovXG4gICAgZm9yKGNudCA9IDE7IGNudCA8IHB0cy5sZW5ndGg7IGNudCsrKSB7XG4gICAgICAgIHRoaXNkaXN0ID0gcHREaXN0KHB0c1tjbnRdLCBwdHNbY250IC0gMV0pO1xuICAgICAgICB0b3RhbGRpc3QgKz0gdGhpc2Rpc3Q7XG4gICAgICAgIGFsbGRpc3RzLnB1c2godGhpc2Rpc3QpO1xuICAgIH1cblxuICAgIHZhciBkaXN0VGhyZXNob2xkID0gdG90YWxkaXN0IC8gYWxsZGlzdHMubGVuZ3RoICogZGlzdFRocmVzaG9sZEZhY3RvcjtcblxuICAgIGZ1bmN0aW9uIGdldHB0KGkpIHsgcmV0dXJuIHB0c1tpICUgcHRzLmxlbmd0aF07IH1cblxuICAgIGZvcihjbnQgPSBwdHMubGVuZ3RoIC0gMjsgY250ID49IGNyb3BzdGFydDsgY250LS0pIHtcbiAgICAgICAgZGlzdGdyb3VwID0gYWxsZGlzdHNbY250XTtcbiAgICAgICAgaWYoZGlzdGdyb3VwIDwgZGlzdFRocmVzaG9sZCkge1xuICAgICAgICAgICAgY250MyA9IDA7XG4gICAgICAgICAgICBmb3IoY250MiA9IGNudCAtIDE7IGNudDIgPj0gY3JvcHN0YXJ0OyBjbnQyLS0pIHtcbiAgICAgICAgICAgICAgICBpZihkaXN0Z3JvdXAgKyBhbGxkaXN0c1tjbnQyXSA8IGRpc3RUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzdGdyb3VwICs9IGFsbGRpc3RzW2NudDJdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2xvc2VkIHBhdGggd2l0aCBjbG9zZSBwb2ludHMgd3JhcHBpbmcgYXJvdW5kIHRoZSBib3VuZGFyeT9cbiAgICAgICAgICAgIGlmKGNsb3NlZHBhdGggJiYgY250ID09PSBwdHMubGVuZ3RoIC0gMikge1xuICAgICAgICAgICAgICAgIGZvcihjbnQzID0gMDsgY250MyA8IGNudDI7IGNudDMrKykge1xuICAgICAgICAgICAgICAgICAgICBpZihkaXN0Z3JvdXAgKyBhbGxkaXN0c1tjbnQzXSA8IGRpc3RUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Rncm91cCArPSBhbGxkaXN0c1tjbnQzXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHB0Y250ID0gY250IC0gY250MiArIGNudDMgKyAxO1xuICAgICAgICAgICAgcHRhdmcgPSBNYXRoLmZsb29yKChjbnQgKyBjbnQyICsgY250MyArIDIpIC8gMik7XG5cbiAgICAgICAgICAgIC8vIGVpdGhlciBlbmRwb2ludCBpbmNsdWRlZDoga2VlcCB0aGUgZW5kcG9pbnRcbiAgICAgICAgICAgIGlmKCFjbG9zZWRwYXRoICYmIGNudCA9PT0gcHRzLmxlbmd0aCAtIDIpIG5ld3B0ID0gcHRzW3B0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGVsc2UgaWYoIWNsb3NlZHBhdGggJiYgY250MiA9PT0gLTEpIG5ld3B0ID0gcHRzWzBdO1xuXG4gICAgICAgICAgICAvLyBvZGQgIyBvZiBwb2ludHMgLSBqdXN0IHRha2UgdGhlIGNlbnRyYWwgb25lXG4gICAgICAgICAgICBlbHNlIGlmKHB0Y250ICUgMikgbmV3cHQgPSBnZXRwdChwdGF2Zyk7XG5cbiAgICAgICAgICAgIC8vIGV2ZW4gIyBvZiBwdHMgLSBhdmVyYWdlIGNlbnRyYWwgdHdvXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdwdCA9IFsoZ2V0cHQocHRhdmcpWzBdICsgZ2V0cHQocHRhdmcgKyAxKVswXSkgLyAyLFxuICAgICAgICAgICAgICAgICAgICAoZ2V0cHQocHRhdmcpWzFdICsgZ2V0cHQocHRhdmcgKyAxKVsxXSkgLyAyXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHRzLnNwbGljZShjbnQyICsgMSwgY250IC0gY250MiArIDEsIG5ld3B0KTtcbiAgICAgICAgICAgIGNudCA9IGNudDIgKyAxO1xuICAgICAgICAgICAgaWYoY250MykgY3JvcHN0YXJ0ID0gY250MztcbiAgICAgICAgICAgIGlmKGNsb3NlZHBhdGgpIHtcbiAgICAgICAgICAgICAgICBpZihjbnQgPT09IHB0cy5sZW5ndGggLSAyKSBwdHNbY250M10gPSBwdHNbcHRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYoY250ID09PSAwKSBwdHNbcHRzLmxlbmd0aCAtIDFdID0gcHRzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHB0cy5zcGxpY2UoMCwgY3JvcHN0YXJ0KTtcblxuICAgIC8vIGRvbmUgd2l0aCB0aGUgaW5kZXggcGFydHMgLSByZW1vdmUgdGhlbSBzbyBwYXRoIGdlbmVyYXRpb24gd29ya3MgcmlnaHRcbiAgICAvLyBiZWNhdXNlIGl0IGRlcGVuZHMgb24gb25seSBoYXZpbmcgW3hweCwgeXB4XVxuICAgIGZvcihjbnQgPSAwOyBjbnQgPCBwdHMubGVuZ3RoOyBjbnQrKykgcHRzW2NudF0ubGVuZ3RoID0gMjtcblxuICAgIC8vIGRvbid0IHJldHVybiBzaW5nbGUtcG9pbnQgcGF0aHMgKGllIGFsbCBwb2ludHMgd2VyZSB0aGUgc2FtZVxuICAgIC8vIHNvIHRoZXkgZ290IGRlbGV0ZWQ/KVxuICAgIGlmKHB0cy5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgZWxzZSBpZihjbG9zZWRwYXRoKSB7XG4gICAgICAgIHB0cy5wb3AoKTtcbiAgICAgICAgcGkucGF0aHMucHVzaChwdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCFlZGdlZmxhZykge1xuICAgICAgICAgICAgTGliLmxvZygnVW5jbG9zZWQgaW50ZXJpb3IgY29udG91cj8nLFxuICAgICAgICAgICAgICAgIHBpLmxldmVsLCBzdGFydExvYy5qb2luKCcsJyksIHB0cy5qb2luKCdMJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWRnZSBwYXRoIC0gZG9lcyBpdCBzdGFydCB3aGVyZSBhbiBleGlzdGluZyBlZGdlIHBhdGggZW5kcywgb3IgdmljZSB2ZXJzYT9cbiAgICAgICAgdmFyIG1lcmdlZCA9IGZhbHNlO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBwaS5lZGdlcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVkZ2VwYXRoaSA9IHBpLmVkZ2VwYXRoc1tpXTtcbiAgICAgICAgICAgIGlmKCFtZXJnZWQgJiYgZXF1YWxQdHMoZWRnZXBhdGhpWzBdLCBwdHNbcHRzLmxlbmd0aCAtIDFdLCB4dG9sLCB5dG9sKSkge1xuICAgICAgICAgICAgICAgIHB0cy5wb3AoKTtcbiAgICAgICAgICAgICAgICBtZXJnZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy8gbm93IGRvZXMgaXQgQUxTTyBtZWV0IHRoZSBlbmQgb2YgYW5vdGhlciAob3IgdGhlIHNhbWUpIHBhdGg/XG4gICAgICAgICAgICAgICAgdmFyIGRvdWJsZW1lcmdlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IHBpLmVkZ2VwYXRocy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBlZGdlcGF0aGogPSBwaS5lZGdlcGF0aHNbal07XG4gICAgICAgICAgICAgICAgICAgIGlmKGVxdWFsUHRzKGVkZ2VwYXRoaltlZGdlcGF0aGoubGVuZ3RoIC0gMV0sIHB0c1swXSwgeHRvbCwgeXRvbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdWJsZW1lcmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpLmVkZ2VwYXRocy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihqID09PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHBhdGggaXMgbm93IGNsb3NlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpLnBhdGhzLnB1c2gocHRzLmNvbmNhdChlZGdlcGF0aGopKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaiA+IGkpIGotLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaS5lZGdlcGF0aHNbal0gPSBlZGdlcGF0aGouY29uY2F0KHB0cywgZWRnZXBhdGhpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCFkb3VibGVtZXJnZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGkuZWRnZXBhdGhzW2ldID0gcHRzLmNvbmNhdChlZGdlcGF0aGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBwaS5lZGdlcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKG1lcmdlZCkgYnJlYWs7XG4gICAgICAgICAgICBlZGdlcGF0aGkgPSBwaS5lZGdlcGF0aHNbaV07XG4gICAgICAgICAgICBpZihlcXVhbFB0cyhlZGdlcGF0aGlbZWRnZXBhdGhpLmxlbmd0aCAtIDFdLCBwdHNbMF0sIHh0b2wsIHl0b2wpKSB7XG4gICAgICAgICAgICAgICAgcHRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgcGkuZWRnZXBhdGhzW2ldID0gZWRnZXBhdGhpLmNvbmNhdChwdHMpO1xuICAgICAgICAgICAgICAgIG1lcmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZighbWVyZ2VkKSBwaS5lZGdlcGF0aHMucHVzaChwdHMpO1xuICAgIH1cbn1cblxuLy8gc3BlY2lhbCBmdW5jdGlvbiB0byBnZXQgdGhlIG1hcmNoaW5nIHN0ZXAgb2YgdGhlXG4vLyBmaXJzdCBwb2ludCBpbiB0aGUgcGF0aCAobGVhZGluZyB0byBsb2MpXG5mdW5jdGlvbiBnZXRTdGFydFN0ZXAobWksIGVkZ2VmbGFnLCBsb2MpIHtcbiAgICB2YXIgZHggPSAwO1xuICAgIHZhciBkeSA9IDA7XG4gICAgaWYobWkgPiAyMCAmJiBlZGdlZmxhZykge1xuICAgICAgICAvLyB0aGVzZSBzYWRkbGVzIHN0YXJ0IGF0ICsvLSB4XG4gICAgICAgIGlmKG1pID09PSAyMDggfHwgbWkgPT09IDExMTQpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlJ3JlIHN0YXJ0aW5nIGF0IHRoZSBsZWZ0IHNpZGUsIHdlIG11c3QgYmUgZ29pbmcgcmlnaHRcbiAgICAgICAgICAgIGR4ID0gbG9jWzBdID09PSAwID8gMSA6IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgd2UncmUgc3RhcnRpbmcgYXQgdGhlIGJvdHRvbSwgd2UgbXVzdCBiZSBnb2luZyB1cFxuICAgICAgICAgICAgZHkgPSBsb2NbMV0gPT09IDAgPyAxIDogLTE7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYoY29uc3RhbnRzLkJPVFRPTVNUQVJULmluZGV4T2YobWkpICE9PSAtMSkgZHkgPSAxO1xuICAgIGVsc2UgaWYoY29uc3RhbnRzLkxFRlRTVEFSVC5pbmRleE9mKG1pKSAhPT0gLTEpIGR4ID0gMTtcbiAgICBlbHNlIGlmKGNvbnN0YW50cy5UT1BTVEFSVC5pbmRleE9mKG1pKSAhPT0gLTEpIGR5ID0gLTE7XG4gICAgZWxzZSBkeCA9IC0xO1xuICAgIHJldHVybiBbZHgsIGR5XTtcbn1cblxuLypcbiAqIEZpbmQgdGhlIHBpeGVsIGNvb3JkaW5hdGVzIG9mIGEgcGFydGljdWxhciBjcm9zc2luZ1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwaTogdGhlIHBhdGhpbmZvIG9iamVjdCBhdCB0aGlzIGxldmVsXG4gKiBAcGFyYW0ge2FycmF5fSBsb2M6IHRoZSBncmlkIGluZGV4IFt4LCB5XSBvZiB0aGUgY3Jvc3NpbmdcbiAqIEBwYXJhbSB7YXJyYXl9IHN0ZXA6IHRoZSBkaXJlY3Rpb24gW2R4LCBkeV0gd2UncmUgbW92aW5nIG9uIHRoZSBncmlkXG4gKlxuICogQHJldHVybiB7YXJyYXl9IFt4cHgsIHlweCwgeGksIHlpXTogdGhlIGZpcnN0IHR3byBhcmUgdGhlIHBpeGVsIGxvY2F0aW9uLFxuICogICB0aGUgbmV4dCB0d28gYXJlIHRoZSBpbnRlcnBvbGF0ZWQgZ3JpZCBpbmRpY2VzLCB3aGljaCB3ZSB1c2UgZm9yXG4gKiAgIGRpc3RhbmNlIGNhbGN1bGF0aW9ucyB0byBkZWxldGUgcG9pbnRzIHRoYXQgYXJlIHRvbyBjbG9zZSB0b2dldGhlci5cbiAqICAgVGhpcyBpcyBpbXBvcnRhbnQgd2hlbiB0aGUgZ3JpZCBpcyBub251bmlmb3JtIChhbmQgbW9zdCBkcmFtYXRpY2FsbHkgd2hlblxuICogICB3ZSdyZSBvbiBsb2cgYXhlcyBhbmQgaW5jbHVkZSBpbnZhbGlkICgwIG9yIG5lZ2F0aXZlKSB2YWx1ZXMuXG4gKiAgIEl0J3MgY3J1Y2lhbCB0byBkZWxldGUgdGhlc2UgZXh0cmEgdHdvIGJlZm9yZSB0dXJuaW5nIGFuIGFycmF5IG9mIHRoZXNlXG4gKiAgIHBvaW50cyBpbnRvIGEgcGF0aCwgYmVjYXVzZSB0aG9zZSByb3V0aW5lcyByZXF1aXJlIGxlbmd0aC0yIHBvaW50cy5cbiAqL1xuZnVuY3Rpb24gZ2V0SW50ZXJwUHgocGksIGxvYywgc3RlcCkge1xuICAgIHZhciBsb2N4ID0gbG9jWzBdICsgTWF0aC5tYXgoc3RlcFswXSwgMCk7XG4gICAgdmFyIGxvY3kgPSBsb2NbMV0gKyBNYXRoLm1heChzdGVwWzFdLCAwKTtcbiAgICB2YXIgenh5ID0gcGkueltsb2N5XVtsb2N4XTtcbiAgICB2YXIgeGEgPSBwaS54YXhpcztcbiAgICB2YXIgeWEgPSBwaS55YXhpcztcblxuICAgIGlmKHN0ZXBbMV0pIHtcbiAgICAgICAgdmFyIGR4ID0gKHBpLmxldmVsIC0genh5KSAvIChwaS56W2xvY3ldW2xvY3ggKyAxXSAtIHp4eSk7XG5cbiAgICAgICAgcmV0dXJuIFt4YS5jMnAoKDEgLSBkeCkgKiBwaS54W2xvY3hdICsgZHggKiBwaS54W2xvY3ggKyAxXSwgdHJ1ZSksXG4gICAgICAgICAgICB5YS5jMnAocGkueVtsb2N5XSwgdHJ1ZSksXG4gICAgICAgICAgICBsb2N4ICsgZHgsIGxvY3ldO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkeSA9IChwaS5sZXZlbCAtIHp4eSkgLyAocGkueltsb2N5ICsgMV1bbG9jeF0gLSB6eHkpO1xuICAgICAgICByZXR1cm4gW3hhLmMycChwaS54W2xvY3hdLCB0cnVlKSxcbiAgICAgICAgICAgIHlhLmMycCgoMSAtIGR5KSAqIHBpLnlbbG9jeV0gKyBkeSAqIHBpLnlbbG9jeSArIDFdLCB0cnVlKSxcbiAgICAgICAgICAgIGxvY3gsIGxvY3kgKyBkeV07XG4gICAgfVxufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuLy8gQ2FsY3VsYXRlIGFsbCB0aGUgbWFyY2hpbmcgaW5kaWNlcywgZm9yIEFMTCBsZXZlbHMgYXQgb25jZS5cbi8vIHNpbmNlIHdlIHdhbnQgdG8gYmUgZXhoYXVzdGl2ZSB3ZSdsbCBjaGVjayBmb3IgY29udG91ciBjcm9zc2luZ3Ncbi8vIGF0IGV2ZXJ5IGludGVyc2VjdGlvbiwgcmF0aGVyIHRoYW4ganVzdCBmb2xsb3dpbmcgYSBwYXRoXG4vLyBUT0RPOiBzaG9ydGVuIHRoZSBpbm5lciBsb29wIHRvIG9ubHkgdGhlIHJlbGV2YW50IGxldmVsc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYWtlQ3Jvc3NpbmdzKHBhdGhpbmZvKSB7XG4gICAgdmFyIHogPSBwYXRoaW5mb1swXS56O1xuICAgIHZhciBtID0gei5sZW5ndGg7XG4gICAgdmFyIG4gPSB6WzBdLmxlbmd0aDsgLy8gd2UgYWxyZWFkeSBtYWRlIHN1cmUgeiBpc24ndCByYWdnZWQgaW4gaW50ZXJwMmRcbiAgICB2YXIgdHdvV2lkZSA9IG0gPT09IDIgfHwgbiA9PT0gMjtcbiAgICB2YXIgeGk7XG4gICAgdmFyIHlpO1xuICAgIHZhciBzdGFydEluZGljZXM7XG4gICAgdmFyIHlzdGFydEluZGljZXM7XG4gICAgdmFyIGxhYmVsO1xuICAgIHZhciBjb3JuZXJzO1xuICAgIHZhciBtaTtcbiAgICB2YXIgcGk7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IoeWkgPSAwOyB5aSA8IG0gLSAxOyB5aSsrKSB7XG4gICAgICAgIHlzdGFydEluZGljZXMgPSBbXTtcbiAgICAgICAgaWYoeWkgPT09IDApIHlzdGFydEluZGljZXMgPSB5c3RhcnRJbmRpY2VzLmNvbmNhdChjb25zdGFudHMuQk9UVE9NU1RBUlQpO1xuICAgICAgICBpZih5aSA9PT0gbSAtIDIpIHlzdGFydEluZGljZXMgPSB5c3RhcnRJbmRpY2VzLmNvbmNhdChjb25zdGFudHMuVE9QU1RBUlQpO1xuXG4gICAgICAgIGZvcih4aSA9IDA7IHhpIDwgbiAtIDE7IHhpKyspIHtcbiAgICAgICAgICAgIHN0YXJ0SW5kaWNlcyA9IHlzdGFydEluZGljZXMuc2xpY2UoKTtcbiAgICAgICAgICAgIGlmKHhpID09PSAwKSBzdGFydEluZGljZXMgPSBzdGFydEluZGljZXMuY29uY2F0KGNvbnN0YW50cy5MRUZUU1RBUlQpO1xuICAgICAgICAgICAgaWYoeGkgPT09IG4gLSAyKSBzdGFydEluZGljZXMgPSBzdGFydEluZGljZXMuY29uY2F0KGNvbnN0YW50cy5SSUdIVFNUQVJUKTtcblxuICAgICAgICAgICAgbGFiZWwgPSB4aSArICcsJyArIHlpO1xuICAgICAgICAgICAgY29ybmVycyA9IFtbelt5aV1beGldLCB6W3lpXVt4aSArIDFdXSxcbiAgICAgICAgICAgICAgICAgICAgICAgW3pbeWkgKyAxXVt4aV0sIHpbeWkgKyAxXVt4aSArIDFdXV07XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBwYXRoaW5mby5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBpID0gcGF0aGluZm9baV07XG4gICAgICAgICAgICAgICAgbWkgPSBnZXRNYXJjaGluZ0luZGV4KHBpLmxldmVsLCBjb3JuZXJzKTtcbiAgICAgICAgICAgICAgICBpZighbWkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgcGkuY3Jvc3NpbmdzW2xhYmVsXSA9IG1pO1xuICAgICAgICAgICAgICAgIGlmKHN0YXJ0SW5kaWNlcy5pbmRleE9mKG1pKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGkuc3RhcnRzLnB1c2goW3hpLCB5aV0pO1xuICAgICAgICAgICAgICAgICAgICBpZih0d29XaWRlICYmIHN0YXJ0SW5kaWNlcy5pbmRleE9mKG1pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SW5kaWNlcy5pbmRleE9mKG1pKSArIDEpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHNhbWUgc3F1YXJlIGhhcyBzdGFydHMgZnJvbSBvcHBvc2l0ZSBzaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQncyBub3QgcG9zc2libGUgdG8gaGF2ZSBzdGFydHMgb24gb3Bwb3NpdGUgZWRnZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9mIGEgY29ybmVyLCBvbmx5IGEgc3RhcnQgYW5kIGFuIGVuZC4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnV0IGlmIHRoZSBhcnJheSBpcyBvbmx5IHR3byBwb2ludHMgd2lkZSAoZWl0aGVyIHdheSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHlvdSBjYW4gaGF2ZSBzdGFydHMgb24gb3Bwb3NpdGUgc2lkZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBwaS5zdGFydHMucHVzaChbeGksIHlpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vLyBtb2RpZmllZCBtYXJjaGluZyBzcXVhcmVzIGFsZ29yaXRobSxcbi8vIHNvIHdlIGRpc2FtYmlndWF0ZSB0aGUgc2FkZGxlIHBvaW50cyBmcm9tIHRoZSBzdGFydFxuLy8gYW5kIHdlIGlnbm9yZSB0aGUgY2FzZXMgd2l0aCBubyBjcm9zc2luZ3Ncbi8vIHRoZSBpbmRleCBJJ20gdXNpbmcgaXMgYmFzZWQgb246XG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01hcmNoaW5nX3NxdWFyZXNcbi8vIGV4Y2VwdCB0aGF0IHRoZSBzYWRkbGVzIGJpZnVyY2F0ZSBhbmQgSSByZXByZXNlbnQgdGhlbVxuLy8gYXMgdGhlIGRlY2ltYWwgY29tYmluYXRpb24gb2YgdGhlIHR3byBhcHByb3ByaWF0ZVxuLy8gbm9uLXNhZGRsZSBpbmRpY2VzXG5mdW5jdGlvbiBnZXRNYXJjaGluZ0luZGV4KHZhbCwgY29ybmVycykge1xuICAgIHZhciBtaSA9IChjb3JuZXJzWzBdWzBdID4gdmFsID8gMCA6IDEpICtcbiAgICAgICAgICAgICAoY29ybmVyc1swXVsxXSA+IHZhbCA/IDAgOiAyKSArXG4gICAgICAgICAgICAgKGNvcm5lcnNbMV1bMV0gPiB2YWwgPyAwIDogNCkgK1xuICAgICAgICAgICAgIChjb3JuZXJzWzFdWzBdID4gdmFsID8gMCA6IDgpO1xuICAgIGlmKG1pID09PSA1IHx8IG1pID09PSAxMCkge1xuICAgICAgICB2YXIgYXZnID0gKGNvcm5lcnNbMF1bMF0gKyBjb3JuZXJzWzBdWzFdICtcbiAgICAgICAgICAgICAgICAgICBjb3JuZXJzWzFdWzBdICsgY29ybmVyc1sxXVsxXSkgLyA0O1xuICAgICAgICAvLyB0d28gcGVha3Mgd2l0aCBhIGJpZyB2YWxsZXlcbiAgICAgICAgaWYodmFsID4gYXZnKSByZXR1cm4gKG1pID09PSA1KSA/IDcxMyA6IDExMTQ7XG4gICAgICAgIC8vIHR3byB2YWxsZXlzIHdpdGggYSBiaWcgcmlkZ2VcbiAgICAgICAgcmV0dXJuIChtaSA9PT0gNSkgPyAxMDQgOiAyMDg7XG4gICAgfVxuICAgIHJldHVybiAobWkgPT09IDE1KSA/IDAgOiBtaTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIENvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKTtcbnZhciBzdmdUZXh0VXRpbHMgPSByZXF1aXJlKCcuLi8uLi9saWIvc3ZnX3RleHRfdXRpbHMnKTtcbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBzZXRDb252ZXJ0ID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL3NldF9jb252ZXJ0Jyk7XG5cbnZhciBoZWF0bWFwUGxvdCA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvcGxvdCcpO1xudmFyIG1ha2VDcm9zc2luZ3MgPSByZXF1aXJlKCcuL21ha2VfY3Jvc3NpbmdzJyk7XG52YXIgZmluZEFsbFBhdGhzID0gcmVxdWlyZSgnLi9maW5kX2FsbF9wYXRocycpO1xudmFyIGVtcHR5UGF0aGluZm8gPSByZXF1aXJlKCcuL2VtcHR5X3BhdGhpbmZvJyk7XG52YXIgY29udmVydFRvQ29uc3RyYWludHMgPSByZXF1aXJlKCcuL2NvbnZlcnRfdG9fY29uc3RyYWludHMnKTtcbnZhciBjbG9zZUJvdW5kYXJpZXMgPSByZXF1aXJlKCcuL2Nsb3NlX2JvdW5kYXJpZXMnKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xudmFyIGNvc3RDb25zdGFudHMgPSBjb25zdGFudHMuTEFCRUxPUFRJTUlaRVI7XG5cbmV4cG9ydHMucGxvdCA9IGZ1bmN0aW9uIHBsb3QoZ2QsIHBsb3RpbmZvLCBjZGNvbnRvdXJzLCBjb250b3VyTGF5ZXIpIHtcbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcblxuICAgIExpYi5tYWtlVHJhY2VHcm91cHMoY29udG91ckxheWVyLCBjZGNvbnRvdXJzLCAnY29udG91cicpLmVhY2goZnVuY3Rpb24oY2QpIHtcbiAgICAgICAgdmFyIHBsb3RHcm91cCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGNkMCA9IGNkWzBdO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgICAgIHZhciB4ID0gY2QwLng7XG4gICAgICAgIHZhciB5ID0gY2QwLnk7XG4gICAgICAgIHZhciBjb250b3VycyA9IHRyYWNlLmNvbnRvdXJzO1xuICAgICAgICB2YXIgcGF0aGluZm8gPSBlbXB0eVBhdGhpbmZvKGNvbnRvdXJzLCBwbG90aW5mbywgY2QwKTtcblxuICAgICAgICAvLyB1c2UgYSBoZWF0bWFwIHRvIGZpbGwgLSBkcmF3IGl0IGJlaGluZCB0aGUgbGluZXNcbiAgICAgICAgdmFyIGhlYXRtYXBDb2xvcmluZ0xheWVyID0gTGliLmVuc3VyZVNpbmdsZShwbG90R3JvdXAsICdnJywgJ2hlYXRtYXBjb2xvcmluZycpO1xuICAgICAgICB2YXIgY2RoZWF0bWFwcyA9IFtdO1xuICAgICAgICBpZihjb250b3Vycy5jb2xvcmluZyA9PT0gJ2hlYXRtYXAnKSB7XG4gICAgICAgICAgICBjZGhlYXRtYXBzID0gW2NkXTtcbiAgICAgICAgfVxuICAgICAgICBoZWF0bWFwUGxvdChnZCwgcGxvdGluZm8sIGNkaGVhdG1hcHMsIGhlYXRtYXBDb2xvcmluZ0xheWVyKTtcblxuICAgICAgICBtYWtlQ3Jvc3NpbmdzKHBhdGhpbmZvKTtcbiAgICAgICAgZmluZEFsbFBhdGhzKHBhdGhpbmZvKTtcblxuICAgICAgICB2YXIgbGVmdGVkZ2UgPSB4YS5jMnAoeFswXSwgdHJ1ZSk7XG4gICAgICAgIHZhciByaWdodGVkZ2UgPSB4YS5jMnAoeFt4Lmxlbmd0aCAtIDFdLCB0cnVlKTtcbiAgICAgICAgdmFyIGJvdHRvbWVkZ2UgPSB5YS5jMnAoeVswXSwgdHJ1ZSk7XG4gICAgICAgIHZhciB0b3BlZGdlID0geWEuYzJwKHlbeS5sZW5ndGggLSAxXSwgdHJ1ZSk7XG4gICAgICAgIHZhciBwZXJpbWV0ZXIgPSBbXG4gICAgICAgICAgICBbbGVmdGVkZ2UsIHRvcGVkZ2VdLFxuICAgICAgICAgICAgW3JpZ2h0ZWRnZSwgdG9wZWRnZV0sXG4gICAgICAgICAgICBbcmlnaHRlZGdlLCBib3R0b21lZGdlXSxcbiAgICAgICAgICAgIFtsZWZ0ZWRnZSwgYm90dG9tZWRnZV1cbiAgICAgICAgXTtcblxuICAgICAgICB2YXIgZmlsbFBhdGhpbmZvID0gcGF0aGluZm87XG4gICAgICAgIGlmKGNvbnRvdXJzLnR5cGUgPT09ICdjb25zdHJhaW50Jykge1xuICAgICAgICAgICAgLy8gTi5CLiB0aGlzIGFsc28gbXV0YXRlcyBwYXRoaW5mb1xuICAgICAgICAgICAgZmlsbFBhdGhpbmZvID0gY29udmVydFRvQ29uc3RyYWludHMocGF0aGluZm8sIGNvbnRvdXJzLl9vcGVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHJhdyBldmVyeXRoaW5nXG4gICAgICAgIG1ha2VCYWNrZ3JvdW5kKHBsb3RHcm91cCwgcGVyaW1ldGVyLCBjb250b3Vycyk7XG4gICAgICAgIG1ha2VGaWxscyhwbG90R3JvdXAsIGZpbGxQYXRoaW5mbywgcGVyaW1ldGVyLCBjb250b3Vycyk7XG4gICAgICAgIG1ha2VMaW5lc0FuZExhYmVscyhwbG90R3JvdXAsIHBhdGhpbmZvLCBnZCwgY2QwLCBjb250b3Vycyk7XG4gICAgICAgIGNsaXBHYXBzKHBsb3RHcm91cCwgcGxvdGluZm8sIGdkLCBjZDAsIHBlcmltZXRlcik7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBtYWtlQmFja2dyb3VuZChwbG90Z3JvdXAsIHBlcmltZXRlciwgY29udG91cnMpIHtcbiAgICB2YXIgYmdncm91cCA9IExpYi5lbnN1cmVTaW5nbGUocGxvdGdyb3VwLCAnZycsICdjb250b3VyYmcnKTtcblxuICAgIHZhciBiZ2ZpbGwgPSBiZ2dyb3VwLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAgIC5kYXRhKGNvbnRvdXJzLmNvbG9yaW5nID09PSAnZmlsbCcgPyBbMF0gOiBbXSk7XG4gICAgYmdmaWxsLmVudGVyKCkuYXBwZW5kKCdwYXRoJyk7XG4gICAgYmdmaWxsLmV4aXQoKS5yZW1vdmUoKTtcbiAgICBiZ2ZpbGxcbiAgICAgICAgLmF0dHIoJ2QnLCAnTScgKyBwZXJpbWV0ZXIuam9pbignTCcpICsgJ1onKVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJyk7XG59XG5cbmZ1bmN0aW9uIG1ha2VGaWxscyhwbG90Z3JvdXAsIHBhdGhpbmZvLCBwZXJpbWV0ZXIsIGNvbnRvdXJzKSB7XG4gICAgdmFyIGhhc0ZpbGxzID0gY29udG91cnMuY29sb3JpbmcgPT09ICdmaWxsJyB8fCAoY29udG91cnMudHlwZSA9PT0gJ2NvbnN0cmFpbnQnICYmIGNvbnRvdXJzLl9vcGVyYXRpb24gIT09ICc9Jyk7XG4gICAgdmFyIGJvdW5kYXJ5UGF0aCA9ICdNJyArIHBlcmltZXRlci5qb2luKCdMJykgKyAnWic7XG5cbiAgICAvLyBmaWxscyBwcmVmaXhCb3VuZGFyeSBpbiBwYXRoaW5mbyBpdGVtc1xuICAgIGlmKGhhc0ZpbGxzKSB7XG4gICAgICAgIGNsb3NlQm91bmRhcmllcyhwYXRoaW5mbywgY29udG91cnMpO1xuICAgIH1cblxuICAgIHZhciBmaWxsZ3JvdXAgPSBMaWIuZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ2cnLCAnY29udG91cmZpbGwnKTtcblxuICAgIHZhciBmaWxsaXRlbXMgPSBmaWxsZ3JvdXAuc2VsZWN0QWxsKCdwYXRoJykuZGF0YShoYXNGaWxscyA/IHBhdGhpbmZvIDogW10pO1xuICAgIGZpbGxpdGVtcy5lbnRlcigpLmFwcGVuZCgncGF0aCcpO1xuICAgIGZpbGxpdGVtcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgZmlsbGl0ZW1zLmVhY2goZnVuY3Rpb24ocGkpIHtcbiAgICAgICAgLy8gam9pbiBhbGwgcGF0aHMgZm9yIHRoaXMgbGV2ZWwgdG9nZXRoZXIgaW50byBhIHNpbmdsZSBwYXRoXG4gICAgICAgIC8vIGZpcnN0IGZvbGxvdyBjbG9ja3dpc2UgYXJvdW5kIHRoZSBwZXJpbWV0ZXIgdG8gY2xvc2UgYW55IG9wZW4gcGF0aHNcbiAgICAgICAgLy8gaWYgdGhlIHdob2xlIHBlcmltZXRlciBpcyBhYm92ZSB0aGlzIGxldmVsLCBzdGFydCB3aXRoIGEgcGF0aFxuICAgICAgICAvLyBlbmNsb3NpbmcgdGhlIHdob2xlIHRoaW5nLiBXaXRoIGFsbCB0aGF0LCB0aGUgcGFyaXR5IHNob3VsZCBtZWFuXG4gICAgICAgIC8vIHRoYXQgd2UgYWx3YXlzIGZpbGwgZXZlcnl0aGluZyBhYm92ZSB0aGUgY29udG91ciwgbm90aGluZyBiZWxvd1xuICAgICAgICB2YXIgZnVsbHBhdGggPSAocGkucHJlZml4Qm91bmRhcnkgPyBib3VuZGFyeVBhdGggOiAnJykgK1xuICAgICAgICAgICAgam9pbkFsbFBhdGhzKHBpLCBwZXJpbWV0ZXIpO1xuXG4gICAgICAgIGlmKCFmdWxscGF0aCkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdWxscGF0aClcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gam9pbkFsbFBhdGhzKHBpLCBwZXJpbWV0ZXIpIHtcbiAgICB2YXIgZnVsbHBhdGggPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHN0YXJ0c2xlZnQgPSBwaS5lZGdlcGF0aHMubWFwKGZ1bmN0aW9uKHYsIGkpIHsgcmV0dXJuIGk7IH0pO1xuICAgIHZhciBuZXdsb29wID0gdHJ1ZTtcbiAgICB2YXIgZW5kcHQ7XG4gICAgdmFyIG5ld2VuZHB0O1xuICAgIHZhciBjbnQ7XG4gICAgdmFyIG5leHRpO1xuICAgIHZhciBwb3NzaWJsZWk7XG4gICAgdmFyIGFkZHBhdGg7XG5cbiAgICBmdW5jdGlvbiBpc3RvcChwdCkgeyByZXR1cm4gTWF0aC5hYnMocHRbMV0gLSBwZXJpbWV0ZXJbMF1bMV0pIDwgMC4wMTsgfVxuICAgIGZ1bmN0aW9uIGlzYm90dG9tKHB0KSB7IHJldHVybiBNYXRoLmFicyhwdFsxXSAtIHBlcmltZXRlclsyXVsxXSkgPCAwLjAxOyB9XG4gICAgZnVuY3Rpb24gaXNsZWZ0KHB0KSB7IHJldHVybiBNYXRoLmFicyhwdFswXSAtIHBlcmltZXRlclswXVswXSkgPCAwLjAxOyB9XG4gICAgZnVuY3Rpb24gaXNyaWdodChwdCkgeyByZXR1cm4gTWF0aC5hYnMocHRbMF0gLSBwZXJpbWV0ZXJbMl1bMF0pIDwgMC4wMTsgfVxuXG4gICAgd2hpbGUoc3RhcnRzbGVmdC5sZW5ndGgpIHtcbiAgICAgICAgYWRkcGF0aCA9IERyYXdpbmcuc21vb3Rob3BlbihwaS5lZGdlcGF0aHNbaV0sIHBpLnNtb290aGluZyk7XG4gICAgICAgIGZ1bGxwYXRoICs9IG5ld2xvb3AgPyBhZGRwYXRoIDogYWRkcGF0aC5yZXBsYWNlKC9eTS8sICdMJyk7XG4gICAgICAgIHN0YXJ0c2xlZnQuc3BsaWNlKHN0YXJ0c2xlZnQuaW5kZXhPZihpKSwgMSk7XG4gICAgICAgIGVuZHB0ID0gcGkuZWRnZXBhdGhzW2ldW3BpLmVkZ2VwYXRoc1tpXS5sZW5ndGggLSAxXTtcbiAgICAgICAgbmV4dGkgPSAtMTtcblxuICAgICAgICAvLyBub3cgbG9vcCB0aHJvdWdoIHNpZGVzLCBtb3Zpbmcgb3VyIGVuZHBvaW50IHVudGlsIHdlIGZpbmQgYSBuZXcgc3RhcnRcbiAgICAgICAgZm9yKGNudCA9IDA7IGNudCA8IDQ7IGNudCsrKSB7IC8vIGp1c3QgdG8gcHJldmVudCBpbmZpbml0ZSBsb29wc1xuICAgICAgICAgICAgaWYoIWVuZHB0KSB7XG4gICAgICAgICAgICAgICAgTGliLmxvZygnTWlzc2luZyBlbmQ/JywgaSwgcGkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpc3RvcChlbmRwdCkgJiYgIWlzcmlnaHQoZW5kcHQpKSBuZXdlbmRwdCA9IHBlcmltZXRlclsxXTsgLy8gcmlnaHQgdG9wXG4gICAgICAgICAgICBlbHNlIGlmKGlzbGVmdChlbmRwdCkpIG5ld2VuZHB0ID0gcGVyaW1ldGVyWzBdOyAvLyBsZWZ0IHRvcFxuICAgICAgICAgICAgZWxzZSBpZihpc2JvdHRvbShlbmRwdCkpIG5ld2VuZHB0ID0gcGVyaW1ldGVyWzNdOyAvLyByaWdodCBib3R0b21cbiAgICAgICAgICAgIGVsc2UgaWYoaXNyaWdodChlbmRwdCkpIG5ld2VuZHB0ID0gcGVyaW1ldGVyWzJdOyAvLyBsZWZ0IGJvdHRvbVxuXG4gICAgICAgICAgICBmb3IocG9zc2libGVpID0gMDsgcG9zc2libGVpIDwgcGkuZWRnZXBhdGhzLmxlbmd0aDsgcG9zc2libGVpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHROZXcgPSBwaS5lZGdlcGF0aHNbcG9zc2libGVpXVswXTtcbiAgICAgICAgICAgICAgICAvLyBpcyBwdE5ldyBvbiB0aGUgKGhvcnouIG9yIHZlcnQuKSBzZWdtZW50IGZyb20gZW5kcHQgdG8gbmV3ZW5kcHQ/XG4gICAgICAgICAgICAgICAgaWYoTWF0aC5hYnMoZW5kcHRbMF0gLSBuZXdlbmRwdFswXSkgPCAwLjAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKE1hdGguYWJzKGVuZHB0WzBdIC0gcHROZXdbMF0pIDwgMC4wMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwdE5ld1sxXSAtIGVuZHB0WzFdKSAqIChuZXdlbmRwdFsxXSAtIHB0TmV3WzFdKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdlbmRwdCA9IHB0TmV3O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dGkgPSBwb3NzaWJsZWk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoTWF0aC5hYnMoZW5kcHRbMV0gLSBuZXdlbmRwdFsxXSkgPCAwLjAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKE1hdGguYWJzKGVuZHB0WzFdIC0gcHROZXdbMV0pIDwgMC4wMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwdE5ld1swXSAtIGVuZHB0WzBdKSAqIChuZXdlbmRwdFswXSAtIHB0TmV3WzBdKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdlbmRwdCA9IHB0TmV3O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dGkgPSBwb3NzaWJsZWk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBMaWIubG9nKCdlbmRwdCB0byBuZXdlbmRwdCBpcyBub3QgdmVydC4gb3IgaG9yei4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kcHQsIG5ld2VuZHB0LCBwdE5ldyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbmRwdCA9IG5ld2VuZHB0O1xuXG4gICAgICAgICAgICBpZihuZXh0aSA+PSAwKSBicmVhaztcbiAgICAgICAgICAgIGZ1bGxwYXRoICs9ICdMJyArIG5ld2VuZHB0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobmV4dGkgPT09IHBpLmVkZ2VwYXRocy5sZW5ndGgpIHtcbiAgICAgICAgICAgIExpYi5sb2coJ3VuY2xvc2VkIHBlcmltZXRlciBwYXRoJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGkgPSBuZXh0aTtcblxuICAgICAgICAvLyBpZiB3ZSBjbG9zZWQgYmFjayBvbiBhIGxvb3Agd2UgYWxyZWFkeSBpbmNsdWRlZCxcbiAgICAgICAgLy8gY2xvc2UgaXQgYW5kIHN0YXJ0IGEgbmV3IGxvb3BcbiAgICAgICAgbmV3bG9vcCA9IChzdGFydHNsZWZ0LmluZGV4T2YoaSkgPT09IC0xKTtcbiAgICAgICAgaWYobmV3bG9vcCkge1xuICAgICAgICAgICAgaSA9IHN0YXJ0c2xlZnRbMF07XG4gICAgICAgICAgICBmdWxscGF0aCArPSAnWic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaW5hbGx5IGFkZCB0aGUgaW50ZXJpb3IgcGF0aHNcbiAgICBmb3IoaSA9IDA7IGkgPCBwaS5wYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmdWxscGF0aCArPSBEcmF3aW5nLnNtb290aGNsb3NlZChwaS5wYXRoc1tpXSwgcGkuc21vb3RoaW5nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVsbHBhdGg7XG59XG5cbmZ1bmN0aW9uIG1ha2VMaW5lc0FuZExhYmVscyhwbG90Z3JvdXAsIHBhdGhpbmZvLCBnZCwgY2QwLCBjb250b3Vycykge1xuICAgIHZhciBsaW5lQ29udGFpbmVyID0gTGliLmVuc3VyZVNpbmdsZShwbG90Z3JvdXAsICdnJywgJ2NvbnRvdXJsaW5lcycpO1xuICAgIHZhciBzaG93TGluZXMgPSBjb250b3Vycy5zaG93bGluZXMgIT09IGZhbHNlO1xuICAgIHZhciBzaG93TGFiZWxzID0gY29udG91cnMuc2hvd2xhYmVscztcbiAgICB2YXIgY2xpcExpbmVzRm9yTGFiZWxzID0gc2hvd0xpbmVzICYmIHNob3dMYWJlbHM7XG5cbiAgICAvLyBFdmVuIGlmIHdlJ3JlIG5vdCBnb2luZyB0byBzaG93IGxpbmVzLCB3ZSBuZWVkIHRvIGNyZWF0ZSB0aGVtXG4gICAgLy8gaWYgd2UncmUgc2hvd2luZyBsYWJlbHMsIGJlY2F1c2UgdGhlIGZpbGwgcGF0aHMgaW5jbHVkZSB0aGUgcGVyaW1ldGVyXG4gICAgLy8gc28gY2FuJ3QgYmUgdXNlZCB0byBwb3NpdGlvbiB0aGUgbGFiZWxzIGNvcnJlY3RseS5cbiAgICAvLyBJbiB0aGlzIGNhc2Ugd2UnbGwgcmVtb3ZlIHRoZSBsaW5lcyBhZnRlciBtYWtpbmcgdGhlIGxhYmVscy5cbiAgICB2YXIgbGluZWdyb3VwID0gZXhwb3J0cy5jcmVhdGVMaW5lcyhsaW5lQ29udGFpbmVyLCBzaG93TGluZXMgfHwgc2hvd0xhYmVscywgcGF0aGluZm8pO1xuXG4gICAgdmFyIGxpbmVDbGlwID0gZXhwb3J0cy5jcmVhdGVMaW5lQ2xpcChsaW5lQ29udGFpbmVyLCBjbGlwTGluZXNGb3JMYWJlbHMsIGdkLCBjZDAudHJhY2UudWlkKTtcblxuICAgIHZhciBsYWJlbEdyb3VwID0gcGxvdGdyb3VwLnNlbGVjdEFsbCgnZy5jb250b3VybGFiZWxzJylcbiAgICAgICAgLmRhdGEoc2hvd0xhYmVscyA/IFswXSA6IFtdKTtcblxuICAgIGxhYmVsR3JvdXAuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgbGFiZWxHcm91cC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKCdjb250b3VybGFiZWxzJywgdHJ1ZSk7XG5cbiAgICBpZihzaG93TGFiZWxzKSB7XG4gICAgICAgIHZhciBsYWJlbENsaXBQYXRoRGF0YSA9IFtdO1xuICAgICAgICB2YXIgbGFiZWxEYXRhID0gW107XG5cbiAgICAgICAgLy8gaW52YWxpZGF0ZSB0aGUgZ2V0VGV4dExvY2F0aW9uIGNhY2hlIGluIGNhc2UgcGF0aHMgY2hhbmdlZFxuICAgICAgICBMaWIuY2xlYXJMb2NhdGlvbkNhY2hlKCk7XG5cbiAgICAgICAgdmFyIGNvbnRvdXJGb3JtYXQgPSBleHBvcnRzLmxhYmVsRm9ybWF0dGVyKGdkLCBjZDApO1xuXG4gICAgICAgIHZhciBkdW1teVRleHQgPSBEcmF3aW5nLnRlc3Rlci5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtbm90ZXgnLCAxKVxuICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5mb250LCBjb250b3Vycy5sYWJlbGZvbnQpO1xuXG4gICAgICAgIHZhciB4YSA9IHBhdGhpbmZvWzBdLnhheGlzO1xuICAgICAgICB2YXIgeWEgPSBwYXRoaW5mb1swXS55YXhpcztcbiAgICAgICAgdmFyIHhMZW4gPSB4YS5fbGVuZ3RoO1xuICAgICAgICB2YXIgeUxlbiA9IHlhLl9sZW5ndGg7XG4gICAgICAgIHZhciB4Um5nID0geGEucmFuZ2U7XG4gICAgICAgIHZhciB5Um5nID0geWEucmFuZ2U7XG4gICAgICAgIHZhciB4TWluID0gTGliLmFnZ051bXMoTWF0aC5taW4sIG51bGwsIGNkMC54KTtcbiAgICAgICAgdmFyIHhNYXggPSBMaWIuYWdnTnVtcyhNYXRoLm1heCwgbnVsbCwgY2QwLngpO1xuICAgICAgICB2YXIgeU1pbiA9IExpYi5hZ2dOdW1zKE1hdGgubWluLCBudWxsLCBjZDAueSk7XG4gICAgICAgIHZhciB5TWF4ID0gTGliLmFnZ051bXMoTWF0aC5tYXgsIG51bGwsIGNkMC55KTtcbiAgICAgICAgdmFyIHgwID0gTWF0aC5tYXgoeGEuYzJwKHhNaW4sIHRydWUpLCAwKTtcbiAgICAgICAgdmFyIHgxID0gTWF0aC5taW4oeGEuYzJwKHhNYXgsIHRydWUpLCB4TGVuKTtcbiAgICAgICAgdmFyIHkwID0gTWF0aC5tYXgoeWEuYzJwKHlNYXgsIHRydWUpLCAwKTtcbiAgICAgICAgdmFyIHkxID0gTWF0aC5taW4oeWEuYzJwKHlNaW4sIHRydWUpLCB5TGVuKTtcblxuICAgICAgICAvLyB2aXNpYmxlIGJvdW5kcyBvZiB0aGUgY29udG91ciB0cmFjZSAoYW5kIHRoZSBtaWRwb2ludHMsIHRvXG4gICAgICAgIC8vIGhlbHAgd2l0aCBjb3N0IGNhbGN1bGF0aW9ucylcbiAgICAgICAgdmFyIGJvdW5kcyA9IHt9O1xuXG4gICAgICAgIGlmKHhSbmdbMF0gPCB4Um5nWzFdKSB7XG4gICAgICAgICAgICBib3VuZHMubGVmdCA9IHgwO1xuICAgICAgICAgICAgYm91bmRzLnJpZ2h0ID0geDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib3VuZHMubGVmdCA9IHgxO1xuICAgICAgICAgICAgYm91bmRzLnJpZ2h0ID0geDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZih5Um5nWzBdIDwgeVJuZ1sxXSkge1xuICAgICAgICAgICAgYm91bmRzLnRvcCA9IHkwO1xuICAgICAgICAgICAgYm91bmRzLmJvdHRvbSA9IHkxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm91bmRzLnRvcCA9IHkxO1xuICAgICAgICAgICAgYm91bmRzLmJvdHRvbSA9IHkwO1xuICAgICAgICB9XG5cbiAgICAgICAgYm91bmRzLm1pZGRsZSA9IChib3VuZHMudG9wICsgYm91bmRzLmJvdHRvbSkgLyAyO1xuICAgICAgICBib3VuZHMuY2VudGVyID0gKGJvdW5kcy5sZWZ0ICsgYm91bmRzLnJpZ2h0KSAvIDI7XG5cbiAgICAgICAgbGFiZWxDbGlwUGF0aERhdGEucHVzaChbXG4gICAgICAgICAgICBbYm91bmRzLmxlZnQsIGJvdW5kcy50b3BdLFxuICAgICAgICAgICAgW2JvdW5kcy5yaWdodCwgYm91bmRzLnRvcF0sXG4gICAgICAgICAgICBbYm91bmRzLnJpZ2h0LCBib3VuZHMuYm90dG9tXSxcbiAgICAgICAgICAgIFtib3VuZHMubGVmdCwgYm91bmRzLmJvdHRvbV1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgdmFyIHBsb3REaWFnb25hbCA9IE1hdGguc3FydCh4TGVuICogeExlbiArIHlMZW4gKiB5TGVuKTtcblxuICAgICAgICAvLyB0aGUgcGF0aCBsZW5ndGggdG8gdXNlIHRvIHNjYWxlIHRoZSBudW1iZXIgb2YgbGFiZWxzIHRvIGRyYXc6XG4gICAgICAgIHZhciBub3JtTGVuZ3RoID0gY29uc3RhbnRzLkxBQkVMRElTVEFOQ0UgKiBwbG90RGlhZ29uYWwgL1xuICAgICAgICAgICAgTWF0aC5tYXgoMSwgcGF0aGluZm8ubGVuZ3RoIC8gY29uc3RhbnRzLkxBQkVMSU5DUkVBU0UpO1xuXG4gICAgICAgIGxpbmVncm91cC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0T3B0cyA9IGV4cG9ydHMuY2FsY1RleHRPcHRzKGQubGV2ZWwsIGNvbnRvdXJGb3JtYXQsIGR1bW15VGV4dCwgZ2QpO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCdwYXRoJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIHBhdGhCb3VuZHMgPSBMaWIuZ2V0VmlzaWJsZVNlZ21lbnQocGF0aCwgYm91bmRzLCB0ZXh0T3B0cy5oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgICAgICBpZighcGF0aEJvdW5kcykgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgaWYocGF0aEJvdW5kcy5sZW4gPCAodGV4dE9wdHMud2lkdGggKyB0ZXh0T3B0cy5oZWlnaHQpICogY29uc3RhbnRzLkxBQkVMTUlOKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB2YXIgbWF4TGFiZWxzID0gTWF0aC5taW4oTWF0aC5jZWlsKHBhdGhCb3VuZHMubGVuIC8gbm9ybUxlbmd0aCksXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0YW50cy5MQUJFTE1BWCk7XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbWF4TGFiZWxzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvYyA9IGV4cG9ydHMuZmluZEJlc3RUZXh0TG9jYXRpb24ocGF0aCwgcGF0aEJvdW5kcywgdGV4dE9wdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbERhdGEsIGJvdW5kcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIWxvYykgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0cy5hZGRMYWJlbERhdGEobG9jLCB0ZXh0T3B0cywgbGFiZWxEYXRhLCBsYWJlbENsaXBQYXRoRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGR1bW15VGV4dC5yZW1vdmUoKTtcblxuICAgICAgICBleHBvcnRzLmRyYXdMYWJlbHMobGFiZWxHcm91cCwgbGFiZWxEYXRhLCBnZCwgbGluZUNsaXAsXG4gICAgICAgICAgICBjbGlwTGluZXNGb3JMYWJlbHMgPyBsYWJlbENsaXBQYXRoRGF0YSA6IG51bGwpO1xuICAgIH1cblxuICAgIGlmKHNob3dMYWJlbHMgJiYgIXNob3dMaW5lcykgbGluZWdyb3VwLnJlbW92ZSgpO1xufVxuXG5leHBvcnRzLmNyZWF0ZUxpbmVzID0gZnVuY3Rpb24obGluZUNvbnRhaW5lciwgbWFrZUxpbmVzLCBwYXRoaW5mbykge1xuICAgIHZhciBzbW9vdGhpbmcgPSBwYXRoaW5mb1swXS5zbW9vdGhpbmc7XG5cbiAgICB2YXIgbGluZWdyb3VwID0gbGluZUNvbnRhaW5lci5zZWxlY3RBbGwoJ2cuY29udG91cmxldmVsJylcbiAgICAgICAgLmRhdGEobWFrZUxpbmVzID8gcGF0aGluZm8gOiBbXSk7XG5cbiAgICBsaW5lZ3JvdXAuZXhpdCgpLnJlbW92ZSgpO1xuICAgIGxpbmVncm91cC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKCdjb250b3VybGV2ZWwnLCB0cnVlKTtcblxuICAgIGlmKG1ha2VMaW5lcykge1xuICAgICAgICAvLyBwZWRnZXBhdGhzIC8gcHBhdGhzIGFyZSB1c2VkIGJ5IGNvbnRvdXJjYXJwZXQsIGZvciB0aGUgcGF0aHMgdHJhbnNmb3JtZWQgZnJvbSBhL2IgdG8geC95XG4gICAgICAgIC8vIGVkZ2VwYXRocyAvIHBhdGhzIGFyZSB1c2VkIGJ5IGNvbnRvdXIgc2luY2UgaXQncyBpbiB4L3kgZnJvbSB0aGUgc3RhcnRcbiAgICAgICAgdmFyIG9wZW5jb250b3VybGluZXMgPSBsaW5lZ3JvdXAuc2VsZWN0QWxsKCdwYXRoLm9wZW5saW5lJylcbiAgICAgICAgICAgIC5kYXRhKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQucGVkZ2VwYXRocyB8fCBkLmVkZ2VwYXRoczsgfSk7XG5cbiAgICAgICAgb3BlbmNvbnRvdXJsaW5lcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIG9wZW5jb250b3VybGluZXMuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ29wZW5saW5lJywgdHJ1ZSk7XG5cbiAgICAgICAgb3BlbmNvbnRvdXJsaW5lc1xuICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERyYXdpbmcuc21vb3Rob3BlbihkLCBzbW9vdGhpbmcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLW1pdGVybGltaXQnLCAxKVxuICAgICAgICAgICAgLnN0eWxlKCd2ZWN0b3ItZWZmZWN0JywgJ25vbi1zY2FsaW5nLXN0cm9rZScpO1xuXG4gICAgICAgIHZhciBjbG9zZWRjb250b3VybGluZXMgPSBsaW5lZ3JvdXAuc2VsZWN0QWxsKCdwYXRoLmNsb3NlZGxpbmUnKVxuICAgICAgICAgICAgLmRhdGEoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5wcGF0aHMgfHwgZC5wYXRoczsgfSk7XG5cbiAgICAgICAgY2xvc2VkY29udG91cmxpbmVzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgY2xvc2VkY29udG91cmxpbmVzLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjbG9zZWRsaW5lJywgdHJ1ZSk7XG5cbiAgICAgICAgY2xvc2VkY29udG91cmxpbmVzXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRHJhd2luZy5zbW9vdGhjbG9zZWQoZCwgc21vb3RoaW5nKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS1taXRlcmxpbWl0JywgMSlcbiAgICAgICAgICAgIC5zdHlsZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGluZWdyb3VwO1xufTtcblxuZXhwb3J0cy5jcmVhdGVMaW5lQ2xpcCA9IGZ1bmN0aW9uKGxpbmVDb250YWluZXIsIGNsaXBMaW5lc0ZvckxhYmVscywgZ2QsIHVpZCkge1xuICAgIHZhciBjbGlwcyA9IGdkLl9mdWxsTGF5b3V0Ll9jbGlwcztcbiAgICB2YXIgY2xpcElkID0gY2xpcExpbmVzRm9yTGFiZWxzID8gKCdjbGlwbGluZScgKyB1aWQpIDogbnVsbDtcblxuICAgIHZhciBsaW5lQ2xpcCA9IGNsaXBzLnNlbGVjdEFsbCgnIycgKyBjbGlwSWQpXG4gICAgICAgIC5kYXRhKGNsaXBMaW5lc0ZvckxhYmVscyA/IFswXSA6IFtdKTtcbiAgICBsaW5lQ2xpcC5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICBsaW5lQ2xpcC5lbnRlcigpLmFwcGVuZCgnY2xpcFBhdGgnKVxuICAgICAgICAuY2xhc3NlZCgnY29udG91cmxpbmVjbGlwJywgdHJ1ZSlcbiAgICAgICAgLmF0dHIoJ2lkJywgY2xpcElkKTtcblxuICAgIERyYXdpbmcuc2V0Q2xpcFVybChsaW5lQ29udGFpbmVyLCBjbGlwSWQsIGdkKTtcblxuICAgIHJldHVybiBsaW5lQ2xpcDtcbn07XG5cbmV4cG9ydHMubGFiZWxGb3JtYXR0ZXIgPSBmdW5jdGlvbihnZCwgY2QwKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgdmFyIGNvbnRvdXJzID0gdHJhY2UuY29udG91cnM7XG5cbiAgICB2YXIgZm9ybWF0QXhpcyA9IHtcbiAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgIF9pZDogJ3ljb250b3VyJyxcbiAgICAgICAgc2hvd2V4cG9uZW50OiAnYWxsJyxcbiAgICAgICAgZXhwb25lbnRmb3JtYXQ6ICdCJ1xuICAgIH07XG5cbiAgICBpZihjb250b3Vycy5sYWJlbGZvcm1hdCkge1xuICAgICAgICBmb3JtYXRBeGlzLnRpY2tmb3JtYXQgPSBjb250b3Vycy5sYWJlbGZvcm1hdDtcbiAgICAgICAgc2V0Q29udmVydChmb3JtYXRBeGlzLCBmdWxsTGF5b3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY09wdHMgPSBDb2xvcnNjYWxlLmV4dHJhY3RPcHRzKHRyYWNlKTtcbiAgICAgICAgaWYoY09wdHMgJiYgY09wdHMuY29sb3JiYXIgJiYgY09wdHMuY29sb3JiYXIuX2F4aXMpIHtcbiAgICAgICAgICAgIGZvcm1hdEF4aXMgPSBjT3B0cy5jb2xvcmJhci5fYXhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGNvbnRvdXJzLnR5cGUgPT09ICdjb25zdHJhaW50Jykge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNvbnRvdXJzLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdEF4aXMucmFuZ2UgPSBbdmFsdWVbMF0sIHZhbHVlW3ZhbHVlLmxlbmd0aCAtIDFdXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgZm9ybWF0QXhpcy5yYW5nZSA9IFt2YWx1ZSwgdmFsdWVdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtYXRBeGlzLnJhbmdlID0gW2NvbnRvdXJzLnN0YXJ0LCBjb250b3Vycy5lbmRdO1xuICAgICAgICAgICAgICAgIGZvcm1hdEF4aXMubnRpY2tzID0gKGNvbnRvdXJzLmVuZCAtIGNvbnRvdXJzLnN0YXJ0KSAvIGNvbnRvdXJzLnNpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGZvcm1hdEF4aXMucmFuZ2VbMF0gPT09IGZvcm1hdEF4aXMucmFuZ2VbMV0pIHtcbiAgICAgICAgICAgICAgICBmb3JtYXRBeGlzLnJhbmdlWzFdICs9IGZvcm1hdEF4aXMucmFuZ2VbMF0gfHwgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCFmb3JtYXRBeGlzLm50aWNrcykgZm9ybWF0QXhpcy5udGlja3MgPSAxMDAwO1xuXG4gICAgICAgICAgICBzZXRDb252ZXJ0KGZvcm1hdEF4aXMsIGZ1bGxMYXlvdXQpO1xuICAgICAgICAgICAgQXhlcy5wcmVwVGlja3MoZm9ybWF0QXhpcyk7XG4gICAgICAgICAgICBmb3JtYXRBeGlzLl90bWluID0gbnVsbDtcbiAgICAgICAgICAgIGZvcm1hdEF4aXMuX3RtYXggPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHYpIHsgcmV0dXJuIEF4ZXMudGlja1RleHQoZm9ybWF0QXhpcywgdikudGV4dDsgfTtcbn07XG5cbmV4cG9ydHMuY2FsY1RleHRPcHRzID0gZnVuY3Rpb24obGV2ZWwsIGNvbnRvdXJGb3JtYXQsIGR1bW15VGV4dCwgZ2QpIHtcbiAgICB2YXIgdGV4dCA9IGNvbnRvdXJGb3JtYXQobGV2ZWwpO1xuICAgIGR1bW15VGV4dC50ZXh0KHRleHQpXG4gICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcblxuICAgIHZhciBlbCA9IGR1bW15VGV4dC5ub2RlKCk7XG4gICAgdmFyIGJCb3ggPSBEcmF3aW5nLmJCb3goZWwsIHRydWUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgd2lkdGg6IGJCb3gud2lkdGgsXG4gICAgICAgIGhlaWdodDogYkJveC5oZWlnaHQsXG4gICAgICAgIGZvbnRTaXplOiArKGVsLnN0eWxlWydmb250LXNpemUnXS5yZXBsYWNlKCdweCcsICcnKSksXG4gICAgICAgIGxldmVsOiBsZXZlbCxcbiAgICAgICAgZHk6IChiQm94LnRvcCArIGJCb3guYm90dG9tKSAvIDJcbiAgICB9O1xufTtcblxuZXhwb3J0cy5maW5kQmVzdFRleHRMb2NhdGlvbiA9IGZ1bmN0aW9uKHBhdGgsIHBhdGhCb3VuZHMsIHRleHRPcHRzLCBsYWJlbERhdGEsIHBsb3RCb3VuZHMpIHtcbiAgICB2YXIgdGV4dFdpZHRoID0gdGV4dE9wdHMud2lkdGg7XG5cbiAgICB2YXIgcDAsIGRwLCBwTWF4LCBwTWluLCBsb2M7XG4gICAgaWYocGF0aEJvdW5kcy5pc0Nsb3NlZCkge1xuICAgICAgICBkcCA9IHBhdGhCb3VuZHMubGVuIC8gY29zdENvbnN0YW50cy5JTklUSUFMU0VBUkNIUE9JTlRTO1xuICAgICAgICBwMCA9IHBhdGhCb3VuZHMubWluICsgZHAgLyAyO1xuICAgICAgICBwTWF4ID0gcGF0aEJvdW5kcy5tYXg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZHAgPSAocGF0aEJvdW5kcy5sZW4gLSB0ZXh0V2lkdGgpIC8gKGNvc3RDb25zdGFudHMuSU5JVElBTFNFQVJDSFBPSU5UUyArIDEpO1xuICAgICAgICBwMCA9IHBhdGhCb3VuZHMubWluICsgZHAgKyB0ZXh0V2lkdGggLyAyO1xuICAgICAgICBwTWF4ID0gcGF0aEJvdW5kcy5tYXggLSAoZHAgKyB0ZXh0V2lkdGgpIC8gMjtcbiAgICB9XG5cbiAgICB2YXIgY29zdCA9IEluZmluaXR5O1xuICAgIGZvcih2YXIgaiA9IDA7IGogPCBjb3N0Q29uc3RhbnRzLklURVJBVElPTlM7IGorKykge1xuICAgICAgICBmb3IodmFyIHAgPSBwMDsgcCA8IHBNYXg7IHAgKz0gZHApIHtcbiAgICAgICAgICAgIHZhciBuZXdMb2NhdGlvbiA9IExpYi5nZXRUZXh0TG9jYXRpb24ocGF0aCwgcGF0aEJvdW5kcy50b3RhbCwgcCwgdGV4dFdpZHRoKTtcbiAgICAgICAgICAgIHZhciBuZXdDb3N0ID0gbG9jYXRpb25Db3N0KG5ld0xvY2F0aW9uLCB0ZXh0T3B0cywgbGFiZWxEYXRhLCBwbG90Qm91bmRzKTtcbiAgICAgICAgICAgIGlmKG5ld0Nvc3QgPCBjb3N0KSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IG5ld0Nvc3Q7XG4gICAgICAgICAgICAgICAgbG9jID0gbmV3TG9jYXRpb247XG4gICAgICAgICAgICAgICAgcE1pbiA9IHA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29zdCA+IGNvc3RDb25zdGFudHMuTUFYQ09TVCAqIDIpIGJyZWFrO1xuXG4gICAgICAgIC8vIHN1YnNlcXVlbnQgaXRlcmF0aW9ucyBqdXN0IGxvb2sgaGFsZiBzdGVwcyBhd2F5IGZyb20gdGhlXG4gICAgICAgIC8vIGJlc3Qgd2UgZm91bmQgaW4gdGhlIHByZXZpb3VzIGl0ZXJhdGlvblxuICAgICAgICBpZihqKSBkcCAvPSAyO1xuICAgICAgICBwMCA9IHBNaW4gLSBkcCAvIDI7XG4gICAgICAgIHBNYXggPSBwMCArIGRwICogMS41O1xuICAgIH1cbiAgICBpZihjb3N0IDw9IGNvc3RDb25zdGFudHMuTUFYQ09TVCkgcmV0dXJuIGxvYztcbn07XG5cbi8qXG4gKiBsb2NhdGlvbkNvc3Q6IGEgY29zdCBmdW5jdGlvbiBmb3IgbGFiZWwgbG9jYXRpb25zXG4gKiBjb21wb3NlZCBvZiB0aHJlZSBraW5kcyBvZiBwZW5hbHR5OlxuICogLSBmb3Igb3BlbiBwYXRocywgYmVpbmcgY2xvc2UgdG8gdGhlIGVuZCBvZiB0aGUgcGF0aFxuICogLSB0aGUgYW5nbGUgYXdheSBmcm9tIGhvcml6b250YWxcbiAqIC0gYmVpbmcgdG9vIGNsb3NlIHRvIGFscmVhZHkgcGxhY2VkIG5laWdoYm9yc1xuICovXG5mdW5jdGlvbiBsb2NhdGlvbkNvc3QobG9jLCB0ZXh0T3B0cywgbGFiZWxEYXRhLCBib3VuZHMpIHtcbiAgICB2YXIgaGFsZldpZHRoID0gdGV4dE9wdHMud2lkdGggLyAyO1xuICAgIHZhciBoYWxmSGVpZ2h0ID0gdGV4dE9wdHMuaGVpZ2h0IC8gMjtcbiAgICB2YXIgeCA9IGxvYy54O1xuICAgIHZhciB5ID0gbG9jLnk7XG4gICAgdmFyIHRoZXRhID0gbG9jLnRoZXRhO1xuICAgIHZhciBkeCA9IE1hdGguY29zKHRoZXRhKSAqIGhhbGZXaWR0aDtcbiAgICB2YXIgZHkgPSBNYXRoLnNpbih0aGV0YSkgKiBoYWxmV2lkdGg7XG5cbiAgICAvLyBjb3N0IGZvciBiZWluZyBuZWFyIGFuIGVkZ2VcbiAgICB2YXIgbm9ybVggPSAoKHggPiBib3VuZHMuY2VudGVyKSA/IChib3VuZHMucmlnaHQgLSB4KSA6ICh4IC0gYm91bmRzLmxlZnQpKSAvXG4gICAgICAgIChkeCArIE1hdGguYWJzKE1hdGguc2luKHRoZXRhKSAqIGhhbGZIZWlnaHQpKTtcbiAgICB2YXIgbm9ybVkgPSAoKHkgPiBib3VuZHMubWlkZGxlKSA/IChib3VuZHMuYm90dG9tIC0geSkgOiAoeSAtIGJvdW5kcy50b3ApKSAvXG4gICAgICAgIChNYXRoLmFicyhkeSkgKyBNYXRoLmNvcyh0aGV0YSkgKiBoYWxmSGVpZ2h0KTtcbiAgICBpZihub3JtWCA8IDEgfHwgbm9ybVkgPCAxKSByZXR1cm4gSW5maW5pdHk7XG4gICAgdmFyIGNvc3QgPSBjb3N0Q29uc3RhbnRzLkVER0VDT1NUICogKDEgLyAobm9ybVggLSAxKSArIDEgLyAobm9ybVkgLSAxKSk7XG5cbiAgICAvLyBjb3N0IGZvciBub3QgYmVpbmcgaG9yaXpvbnRhbFxuICAgIGNvc3QgKz0gY29zdENvbnN0YW50cy5BTkdMRUNPU1QgKiB0aGV0YSAqIHRoZXRhO1xuXG4gICAgLy8gY29zdCBmb3IgYmVpbmcgY2xvc2UgdG8gb3RoZXIgbGFiZWxzXG4gICAgdmFyIHgxID0geCAtIGR4O1xuICAgIHZhciB5MSA9IHkgLSBkeTtcbiAgICB2YXIgeDIgPSB4ICsgZHg7XG4gICAgdmFyIHkyID0geSArIGR5O1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsYWJlbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGxhYmVsaSA9IGxhYmVsRGF0YVtpXTtcbiAgICAgICAgdmFyIGR4ZCA9IE1hdGguY29zKGxhYmVsaS50aGV0YSkgKiBsYWJlbGkud2lkdGggLyAyO1xuICAgICAgICB2YXIgZHlkID0gTWF0aC5zaW4obGFiZWxpLnRoZXRhKSAqIGxhYmVsaS53aWR0aCAvIDI7XG4gICAgICAgIHZhciBkaXN0ID0gTGliLnNlZ21lbnREaXN0YW5jZShcbiAgICAgICAgICAgIHgxLCB5MSxcbiAgICAgICAgICAgIHgyLCB5MixcbiAgICAgICAgICAgIGxhYmVsaS54IC0gZHhkLCBsYWJlbGkueSAtIGR5ZCxcbiAgICAgICAgICAgIGxhYmVsaS54ICsgZHhkLCBsYWJlbGkueSArIGR5ZFxuICAgICAgICApICogMiAvICh0ZXh0T3B0cy5oZWlnaHQgKyBsYWJlbGkuaGVpZ2h0KTtcblxuICAgICAgICB2YXIgc2FtZUxldmVsID0gbGFiZWxpLmxldmVsID09PSB0ZXh0T3B0cy5sZXZlbDtcbiAgICAgICAgdmFyIGRpc3RPZmZzZXQgPSBzYW1lTGV2ZWwgPyBjb3N0Q29uc3RhbnRzLlNBTUVMRVZFTERJU1RBTkNFIDogMTtcblxuICAgICAgICBpZihkaXN0IDw9IGRpc3RPZmZzZXQpIHJldHVybiBJbmZpbml0eTtcblxuICAgICAgICB2YXIgZGlzdEZhY3RvciA9IGNvc3RDb25zdGFudHMuTkVJR0hCT1JDT1NUICpcbiAgICAgICAgICAgIChzYW1lTGV2ZWwgPyBjb3N0Q29uc3RhbnRzLlNBTUVMRVZFTEZBQ1RPUiA6IDEpO1xuXG4gICAgICAgIGNvc3QgKz0gZGlzdEZhY3RvciAvIChkaXN0IC0gZGlzdE9mZnNldCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvc3Q7XG59XG5cbmV4cG9ydHMuYWRkTGFiZWxEYXRhID0gZnVuY3Rpb24obG9jLCB0ZXh0T3B0cywgbGFiZWxEYXRhLCBsYWJlbENsaXBQYXRoRGF0YSkge1xuICAgIHZhciBmb250U2l6ZSA9IHRleHRPcHRzLmZvbnRTaXplO1xuICAgIHZhciB3ID0gdGV4dE9wdHMud2lkdGggKyBmb250U2l6ZSAvIDM7XG4gICAgdmFyIGggPSBNYXRoLm1heCgwLCB0ZXh0T3B0cy5oZWlnaHQgLSBmb250U2l6ZSAvIDMpO1xuXG4gICAgdmFyIHggPSBsb2MueDtcbiAgICB2YXIgeSA9IGxvYy55O1xuICAgIHZhciB0aGV0YSA9IGxvYy50aGV0YTtcblxuICAgIHZhciBzaW4gPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgdmFyIGNvcyA9IE1hdGguY29zKHRoZXRhKTtcblxuICAgIHZhciByb3RhdGVYWSA9IGZ1bmN0aW9uKGR4LCBkeSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeCArIGR4ICogY29zIC0gZHkgKiBzaW4sXG4gICAgICAgICAgICB5ICsgZHggKiBzaW4gKyBkeSAqIGNvc1xuICAgICAgICBdO1xuICAgIH07XG5cbiAgICB2YXIgYkJveFB0cyA9IFtcbiAgICAgICAgcm90YXRlWFkoLXcgLyAyLCAtaCAvIDIpLFxuICAgICAgICByb3RhdGVYWSgtdyAvIDIsIGggLyAyKSxcbiAgICAgICAgcm90YXRlWFkodyAvIDIsIGggLyAyKSxcbiAgICAgICAgcm90YXRlWFkodyAvIDIsIC1oIC8gMilcbiAgICBdO1xuXG4gICAgbGFiZWxEYXRhLnB1c2goe1xuICAgICAgICB0ZXh0OiB0ZXh0T3B0cy50ZXh0LFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICBkeTogdGV4dE9wdHMuZHksXG4gICAgICAgIHRoZXRhOiB0aGV0YSxcbiAgICAgICAgbGV2ZWw6IHRleHRPcHRzLmxldmVsLFxuICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgaGVpZ2h0OiBoXG4gICAgfSk7XG5cbiAgICBsYWJlbENsaXBQYXRoRGF0YS5wdXNoKGJCb3hQdHMpO1xufTtcblxuZXhwb3J0cy5kcmF3TGFiZWxzID0gZnVuY3Rpb24obGFiZWxHcm91cCwgbGFiZWxEYXRhLCBnZCwgbGluZUNsaXAsIGxhYmVsQ2xpcFBhdGhEYXRhKSB7XG4gICAgdmFyIGxhYmVscyA9IGxhYmVsR3JvdXAuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgLmRhdGEobGFiZWxEYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC50ZXh0ICsgJywnICsgZC54ICsgJywnICsgZC55ICsgJywnICsgZC50aGV0YTtcbiAgICAgICAgfSk7XG5cbiAgICBsYWJlbHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgbGFiZWxzLmVudGVyKCkuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgJ2RhdGEtbm90ZXgnOiAxLFxuICAgICAgICAgICAgJ3RleHQtYW5jaG9yJzogJ21pZGRsZSdcbiAgICAgICAgfSlcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHggPSBkLnggKyBNYXRoLnNpbihkLnRoZXRhKSAqIGQuZHk7XG4gICAgICAgICAgICB2YXIgeSA9IGQueSAtIE1hdGguY29zKGQudGhldGEpICogZC5keTtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgIC50ZXh0KGQudGV4dClcbiAgICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgnICsgKDE4MCAqIGQudGhldGEgLyBNYXRoLlBJKSArICcgJyArIHggKyAnICcgKyB5ICsgJyknXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMuY29udmVydFRvVHNwYW5zLCBnZCk7XG4gICAgICAgIH0pO1xuXG4gICAgaWYobGFiZWxDbGlwUGF0aERhdGEpIHtcbiAgICAgICAgdmFyIGNsaXBQYXRoID0gJyc7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsYWJlbENsaXBQYXRoRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2xpcFBhdGggKz0gJ00nICsgbGFiZWxDbGlwUGF0aERhdGFbaV0uam9pbignTCcpICsgJ1onO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpbmVDbGlwUGF0aCA9IExpYi5lbnN1cmVTaW5nbGUobGluZUNsaXAsICdwYXRoJywgJycpO1xuICAgICAgICBsaW5lQ2xpcFBhdGguYXR0cignZCcsIGNsaXBQYXRoKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBjbGlwR2FwcyhwbG90R3JvdXAsIHBsb3RpbmZvLCBnZCwgY2QwLCBwZXJpbWV0ZXIpIHtcbiAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgdmFyIGNsaXBzID0gZ2QuX2Z1bGxMYXlvdXQuX2NsaXBzO1xuICAgIHZhciBjbGlwSWQgPSAnY2xpcCcgKyB0cmFjZS51aWQ7XG5cbiAgICB2YXIgY2xpcFBhdGggPSBjbGlwcy5zZWxlY3RBbGwoJyMnICsgY2xpcElkKVxuICAgICAgICAuZGF0YSh0cmFjZS5jb25uZWN0Z2FwcyA/IFtdIDogWzBdKTtcbiAgICBjbGlwUGF0aC5lbnRlcigpLmFwcGVuZCgnY2xpcFBhdGgnKVxuICAgICAgICAuY2xhc3NlZCgnY29udG91cmNsaXAnLCB0cnVlKVxuICAgICAgICAuYXR0cignaWQnLCBjbGlwSWQpO1xuICAgIGNsaXBQYXRoLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIGlmKHRyYWNlLmNvbm5lY3RnYXBzID09PSBmYWxzZSkge1xuICAgICAgICB2YXIgY2xpcFBhdGhJbmZvID0ge1xuICAgICAgICAgICAgLy8gZnJhY3Rpb24gb2YgdGhlIHdheSBmcm9tIG1pc3NpbmcgdG8gcHJlc2VudCBwb2ludFxuICAgICAgICAgICAgLy8gdG8gZHJhdyB0aGUgYm91bmRhcnkuXG4gICAgICAgICAgICAvLyBpZiB5b3UgbWFrZSB0aGlzIDEgKG9yIDEtZXBzaWxvbikgdGhlbiBhIHBvaW50IGluXG4gICAgICAgICAgICAvLyBhIHNlYSBvZiBtaXNzaW5nIGRhdGEgd2lsbCBkaXNhcHBlYXIgZW50aXJlbHkuXG4gICAgICAgICAgICBsZXZlbDogMC45LFxuICAgICAgICAgICAgY3Jvc3NpbmdzOiB7fSxcbiAgICAgICAgICAgIHN0YXJ0czogW10sXG4gICAgICAgICAgICBlZGdlcGF0aHM6IFtdLFxuICAgICAgICAgICAgcGF0aHM6IFtdLFxuICAgICAgICAgICAgeGF4aXM6IHBsb3RpbmZvLnhheGlzLFxuICAgICAgICAgICAgeWF4aXM6IHBsb3RpbmZvLnlheGlzLFxuICAgICAgICAgICAgeDogY2QwLngsXG4gICAgICAgICAgICB5OiBjZDAueSxcbiAgICAgICAgICAgIC8vIDAgPSBubyBkYXRhLCAxID0gZGF0YVxuICAgICAgICAgICAgejogbWFrZUNsaXBNYXNrKGNkMCksXG4gICAgICAgICAgICBzbW9vdGhpbmc6IDBcbiAgICAgICAgfTtcblxuICAgICAgICBtYWtlQ3Jvc3NpbmdzKFtjbGlwUGF0aEluZm9dKTtcbiAgICAgICAgZmluZEFsbFBhdGhzKFtjbGlwUGF0aEluZm9dKTtcbiAgICAgICAgY2xvc2VCb3VuZGFyaWVzKFtjbGlwUGF0aEluZm9dLCB7dHlwZTogJ2xldmVscyd9KTtcblxuICAgICAgICB2YXIgcGF0aCA9IExpYi5lbnN1cmVTaW5nbGUoY2xpcFBhdGgsICdwYXRoJywgJycpO1xuICAgICAgICBwYXRoLmF0dHIoJ2QnLFxuICAgICAgICAgICAgKGNsaXBQYXRoSW5mby5wcmVmaXhCb3VuZGFyeSA/ICdNJyArIHBlcmltZXRlci5qb2luKCdMJykgKyAnWicgOiAnJykgK1xuICAgICAgICAgICAgam9pbkFsbFBhdGhzKGNsaXBQYXRoSW5mbywgcGVyaW1ldGVyKVxuICAgICAgICApO1xuICAgIH0gZWxzZSBjbGlwSWQgPSBudWxsO1xuXG4gICAgRHJhd2luZy5zZXRDbGlwVXJsKHBsb3RHcm91cCwgY2xpcElkLCBnZCk7XG59XG5cbmZ1bmN0aW9uIG1ha2VDbGlwTWFzayhjZDApIHtcbiAgICB2YXIgZW1wdGllcyA9IGNkMC50cmFjZS5fZW1wdHlwb2ludHM7XG4gICAgdmFyIHogPSBbXTtcbiAgICB2YXIgbSA9IGNkMC56Lmxlbmd0aDtcbiAgICB2YXIgbiA9IGNkMC56WzBdLmxlbmd0aDtcbiAgICB2YXIgaTtcbiAgICB2YXIgcm93ID0gW107XG4gICAgdmFyIGVtcHR5UG9pbnQ7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBuOyBpKyspIHJvdy5wdXNoKDEpO1xuICAgIGZvcihpID0gMDsgaSA8IG07IGkrKykgei5wdXNoKHJvdy5zbGljZSgpKTtcbiAgICBmb3IoaSA9IDA7IGkgPCBlbXB0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVtcHR5UG9pbnQgPSBlbXB0aWVzW2ldO1xuICAgICAgICB6W2VtcHR5UG9pbnRbMF1dW2VtcHR5UG9pbnRbMV1dID0gMDtcbiAgICB9XG4gICAgLy8gc2F2ZSB0aGlzIG1hc2sgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gc2hvdyB0aGlzIGRhdGEgaW4gaG92ZXJcbiAgICBjZDAuem1hc2sgPSB6O1xuICAgIHJldHVybiB6O1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgaGVhdG1hcFN0eWxlID0gcmVxdWlyZSgnLi4vaGVhdG1hcC9zdHlsZScpO1xuXG52YXIgbWFrZUNvbG9yTWFwID0gcmVxdWlyZSgnLi9tYWtlX2NvbG9yX21hcCcpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3R5bGUoZ2QpIHtcbiAgICB2YXIgY29udG91cnMgPSBkMy5zZWxlY3QoZ2QpLnNlbGVjdEFsbCgnZy5jb250b3VyJyk7XG5cbiAgICBjb250b3Vycy5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGRbMF0udHJhY2Uub3BhY2l0eTtcbiAgICB9KTtcblxuICAgIGNvbnRvdXJzLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgYyA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIHRyYWNlID0gZFswXS50cmFjZTtcbiAgICAgICAgdmFyIGNvbnRvdXJzID0gdHJhY2UuY29udG91cnM7XG4gICAgICAgIHZhciBsaW5lID0gdHJhY2UubGluZTtcbiAgICAgICAgdmFyIGNzID0gY29udG91cnMuc2l6ZSB8fCAxO1xuICAgICAgICB2YXIgc3RhcnQgPSBjb250b3Vycy5zdGFydDtcblxuICAgICAgICAvLyBmb3IgY29udG91cmNhcnBldCBvbmx5IC0gaXMgdGhpcyBhIGNvbnN0cmFpbnQtdHlwZSBjb250b3VyIHRyYWNlP1xuICAgICAgICB2YXIgaXNDb25zdHJhaW50VHlwZSA9IGNvbnRvdXJzLnR5cGUgPT09ICdjb25zdHJhaW50JztcbiAgICAgICAgdmFyIGNvbG9yTGluZXMgPSAhaXNDb25zdHJhaW50VHlwZSAmJiBjb250b3Vycy5jb2xvcmluZyA9PT0gJ2xpbmVzJztcbiAgICAgICAgdmFyIGNvbG9yRmlsbHMgPSAhaXNDb25zdHJhaW50VHlwZSAmJiBjb250b3Vycy5jb2xvcmluZyA9PT0gJ2ZpbGwnO1xuXG4gICAgICAgIHZhciBjb2xvck1hcCA9IChjb2xvckxpbmVzIHx8IGNvbG9yRmlsbHMpID8gbWFrZUNvbG9yTWFwKHRyYWNlKSA6IG51bGw7XG5cbiAgICAgICAgYy5zZWxlY3RBbGwoJ2cuY29udG91cmxldmVsJykuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLmxpbmVHcm91cFN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBsaW5lLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBjb2xvckxpbmVzID8gY29sb3JNYXAoZC5sZXZlbCkgOiBsaW5lLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBsaW5lLmRhc2gpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbGFiZWxGb250ID0gY29udG91cnMubGFiZWxmb250O1xuICAgICAgICBjLnNlbGVjdEFsbCgnZy5jb250b3VybGFiZWxzIHRleHQnKS5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIERyYXdpbmcuZm9udChkMy5zZWxlY3QodGhpcyksIHtcbiAgICAgICAgICAgICAgICBmYW1pbHk6IGxhYmVsRm9udC5mYW1pbHksXG4gICAgICAgICAgICAgICAgc2l6ZTogbGFiZWxGb250LnNpemUsXG4gICAgICAgICAgICAgICAgY29sb3I6IGxhYmVsRm9udC5jb2xvciB8fCAoY29sb3JMaW5lcyA/IGNvbG9yTWFwKGQubGV2ZWwpIDogbGluZS5jb2xvcilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihpc0NvbnN0cmFpbnRUeXBlKSB7XG4gICAgICAgICAgICBjLnNlbGVjdEFsbCgnZy5jb250b3VyZmlsbCBwYXRoJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCB0cmFjZS5maWxsY29sb3IpO1xuICAgICAgICB9IGVsc2UgaWYoY29sb3JGaWxscykge1xuICAgICAgICAgICAgdmFyIGZpcnN0RmlsbDtcblxuICAgICAgICAgICAgYy5zZWxlY3RBbGwoJ2cuY29udG91cmZpbGwgcGF0aCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICBpZihmaXJzdEZpbGwgPT09IHVuZGVmaW5lZCkgZmlyc3RGaWxsID0gZC5sZXZlbDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9yTWFwKGQubGV2ZWwgKyAwLjUgKiBjcyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKGZpcnN0RmlsbCA9PT0gdW5kZWZpbmVkKSBmaXJzdEZpbGwgPSBzdGFydDtcblxuICAgICAgICAgICAgYy5zZWxlY3RBbGwoJ2cuY29udG91cmJnIHBhdGgnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGNvbG9yTWFwKGZpcnN0RmlsbCAtIDAuNSAqIGNzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGhlYXRtYXBTdHlsZShnZCk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==