(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_scatter_line_points_js-node_modules_plotly_js_src_t-dd850f"],{

/***/ "./node_modules/plotly.js/src/traces/scatter/line_points.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/line_points.js ***!
  \******************************************************************/
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
var BADNUM = numConstants.BADNUM;
var LOG_CLIP = numConstants.LOG_CLIP;
var LOG_CLIP_PLUS = LOG_CLIP + 0.5;
var LOG_CLIP_MINUS = LOG_CLIP - 0.5;
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var segmentsIntersect = Lib.segmentsIntersect;
var constrain = Lib.constrain;
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/scatter/constants.js");


module.exports = function linePoints(d, opts) {
    var xa = opts.xaxis;
    var ya = opts.yaxis;
    var xLog = xa.type === 'log';
    var yLog = ya.type === 'log';
    var xLen = xa._length;
    var yLen = ya._length;
    var connectGaps = opts.connectGaps;
    var baseTolerance = opts.baseTolerance;
    var shape = opts.shape;
    var linear = shape === 'linear';
    var fill = opts.fill && opts.fill !== 'none';
    var segments = [];
    var minTolerance = constants.minTolerance;
    var len = d.length;
    var pts = new Array(len);
    var pti = 0;

    var i;

    // pt variables are pixel coordinates [x,y] of one point
    // these four are the outputs of clustering on a line
    var clusterStartPt, clusterEndPt, clusterHighPt, clusterLowPt;

    // "this" is the next point we're considering adding to the cluster
    var thisPt;

    // did we encounter the high point first, then a low point, or vice versa?
    var clusterHighFirst;

    // the first two points in the cluster determine its unit vector
    // so the second is always in the "High" direction
    var clusterUnitVector;

    // the pixel delta from clusterStartPt
    var thisVector;

    // val variables are (signed) pixel distances along the cluster vector
    var clusterRefDist, clusterHighVal, clusterLowVal, thisVal;

    // deviation variables are (signed) pixel distances normal to the cluster vector
    var clusterMinDeviation, clusterMaxDeviation, thisDeviation;

    // turn one calcdata point into pixel coordinates
    function getPt(index) {
        var di = d[index];
        if(!di) return false;
        var x = opts.linearized ? xa.l2p(di.x) : xa.c2p(di.x);
        var y = opts.linearized ? ya.l2p(di.y) : ya.c2p(di.y);

        // if non-positive log values, set them VERY far off-screen
        // so the line looks essentially straight from the previous point.
        if(x === BADNUM) {
            if(xLog) x = xa.c2p(di.x, true);
            if(x === BADNUM) return false;
            // If BOTH were bad log values, make the line follow a constant
            // exponent rather than a constant slope
            if(yLog && y === BADNUM) {
                x *= Math.abs(xa._m * yLen * (xa._m > 0 ? LOG_CLIP_PLUS : LOG_CLIP_MINUS) /
                    (ya._m * xLen * (ya._m > 0 ? LOG_CLIP_PLUS : LOG_CLIP_MINUS)));
            }
            x *= 1000;
        }
        if(y === BADNUM) {
            if(yLog) y = ya.c2p(di.y, true);
            if(y === BADNUM) return false;
            y *= 1000;
        }
        return [x, y];
    }

    function crossesViewport(xFrac0, yFrac0, xFrac1, yFrac1) {
        var dx = xFrac1 - xFrac0;
        var dy = yFrac1 - yFrac0;
        var dx0 = 0.5 - xFrac0;
        var dy0 = 0.5 - yFrac0;
        var norm2 = dx * dx + dy * dy;
        var dot = dx * dx0 + dy * dy0;
        if(dot > 0 && dot < norm2) {
            var cross = dx0 * dy - dy0 * dx;
            if(cross * cross < norm2) return true;
        }
    }

    var latestXFrac, latestYFrac;
    // if we're off-screen, increase tolerance over baseTolerance
    function getTolerance(pt, nextPt) {
        var xFrac = pt[0] / xLen;
        var yFrac = pt[1] / yLen;
        var offScreenFraction = Math.max(0, -xFrac, xFrac - 1, -yFrac, yFrac - 1);
        if(offScreenFraction && (latestXFrac !== undefined) &&
            crossesViewport(xFrac, yFrac, latestXFrac, latestYFrac)
        ) {
            offScreenFraction = 0;
        }
        if(offScreenFraction && nextPt &&
            crossesViewport(xFrac, yFrac, nextPt[0] / xLen, nextPt[1] / yLen)
        ) {
            offScreenFraction = 0;
        }

        return (1 + constants.toleranceGrowth * offScreenFraction) * baseTolerance;
    }

    function ptDist(pt1, pt2) {
        var dx = pt1[0] - pt2[0];
        var dy = pt1[1] - pt2[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    // last bit of filtering: clip paths that are VERY far off-screen
    // so we don't get near the browser's hard limit (+/- 2^29 px in Chrome and FF)

    var maxScreensAway = constants.maxScreensAway;

    // find the intersections between the segment from pt1 to pt2
    // and the large rectangle maxScreensAway around the viewport
    // if one of pt1 and pt2 is inside and the other outside, there
    // will be only one intersection.
    // if both are outside there will be 0 or 2 intersections
    // (or 1 if it's right at a corner - we'll treat that like 0)
    // returns an array of intersection pts
    var xEdge0 = -xLen * maxScreensAway;
    var xEdge1 = xLen * (1 + maxScreensAway);
    var yEdge0 = -yLen * maxScreensAway;
    var yEdge1 = yLen * (1 + maxScreensAway);
    var edges = [
        [xEdge0, yEdge0, xEdge1, yEdge0],
        [xEdge1, yEdge0, xEdge1, yEdge1],
        [xEdge1, yEdge1, xEdge0, yEdge1],
        [xEdge0, yEdge1, xEdge0, yEdge0]
    ];
    var xEdge, yEdge, lastXEdge, lastYEdge, lastFarPt, edgePt;

    // for linear line shape, edge intersections should be linearly interpolated
    // spline uses this too, which isn't precisely correct but is actually pretty
    // good, because Catmull-Rom weights far-away points less in creating the curvature
    function getLinearEdgeIntersections(pt1, pt2) {
        var out = [];
        var ptCount = 0;
        for(var i = 0; i < 4; i++) {
            var edge = edges[i];
            var ptInt = segmentsIntersect(
                pt1[0], pt1[1], pt2[0], pt2[1],
                edge[0], edge[1], edge[2], edge[3]
            );
            if(ptInt && (!ptCount ||
                Math.abs(ptInt.x - out[0][0]) > 1 ||
                Math.abs(ptInt.y - out[0][1]) > 1
            )) {
                ptInt = [ptInt.x, ptInt.y];
                // if we have 2 intersections, make sure the closest one to pt1 comes first
                if(ptCount && ptDist(ptInt, pt1) < ptDist(out[0], pt1)) out.unshift(ptInt);
                else out.push(ptInt);
                ptCount++;
            }
        }
        return out;
    }

    function onlyConstrainedPoint(pt) {
        if(pt[0] < xEdge0 || pt[0] > xEdge1 || pt[1] < yEdge0 || pt[1] > yEdge1) {
            return [constrain(pt[0], xEdge0, xEdge1), constrain(pt[1], yEdge0, yEdge1)];
        }
    }

    function sameEdge(pt1, pt2) {
        if(pt1[0] === pt2[0] && (pt1[0] === xEdge0 || pt1[0] === xEdge1)) return true;
        if(pt1[1] === pt2[1] && (pt1[1] === yEdge0 || pt1[1] === yEdge1)) return true;
    }

    // for line shapes hv and vh, movement in the two dimensions is decoupled,
    // so all we need to do is constrain each dimension independently
    function getHVEdgeIntersections(pt1, pt2) {
        var out = [];
        var ptInt1 = onlyConstrainedPoint(pt1);
        var ptInt2 = onlyConstrainedPoint(pt2);
        if(ptInt1 && ptInt2 && sameEdge(ptInt1, ptInt2)) return out;

        if(ptInt1) out.push(ptInt1);
        if(ptInt2) out.push(ptInt2);
        return out;
    }

    // hvh and vhv we sometimes have to move one of the intersection points
    // out BEYOND the clipping rect, by a maximum of a factor of 2, so that
    // the midpoint line is drawn in the right place
    function getABAEdgeIntersections(dim, limit0, limit1) {
        return function(pt1, pt2) {
            var ptInt1 = onlyConstrainedPoint(pt1);
            var ptInt2 = onlyConstrainedPoint(pt2);

            var out = [];
            if(ptInt1 && ptInt2 && sameEdge(ptInt1, ptInt2)) return out;

            if(ptInt1) out.push(ptInt1);
            if(ptInt2) out.push(ptInt2);

            var midShift = 2 * Lib.constrain((pt1[dim] + pt2[dim]) / 2, limit0, limit1) -
                ((ptInt1 || pt1)[dim] + (ptInt2 || pt2)[dim]);
            if(midShift) {
                var ptToAlter;
                if(ptInt1 && ptInt2) {
                    ptToAlter = (midShift > 0 === ptInt1[dim] > ptInt2[dim]) ? ptInt1 : ptInt2;
                } else ptToAlter = ptInt1 || ptInt2;

                ptToAlter[dim] += midShift;
            }

            return out;
        };
    }

    var getEdgeIntersections;
    if(shape === 'linear' || shape === 'spline') {
        getEdgeIntersections = getLinearEdgeIntersections;
    } else if(shape === 'hv' || shape === 'vh') {
        getEdgeIntersections = getHVEdgeIntersections;
    } else if(shape === 'hvh') getEdgeIntersections = getABAEdgeIntersections(0, xEdge0, xEdge1);
    else if(shape === 'vhv') getEdgeIntersections = getABAEdgeIntersections(1, yEdge0, yEdge1);

    // a segment pt1->pt2 entirely outside the nearby region:
    // find the corner it gets closest to touching
    function getClosestCorner(pt1, pt2) {
        var dx = pt2[0] - pt1[0];
        var m = (pt2[1] - pt1[1]) / dx;
        var b = (pt1[1] * pt2[0] - pt2[1] * pt1[0]) / dx;

        if(b > 0) return [m > 0 ? xEdge0 : xEdge1, yEdge1];
        else return [m > 0 ? xEdge1 : xEdge0, yEdge0];
    }

    function updateEdge(pt) {
        var x = pt[0];
        var y = pt[1];
        var xSame = x === pts[pti - 1][0];
        var ySame = y === pts[pti - 1][1];
        // duplicate point?
        if(xSame && ySame) return;
        if(pti > 1) {
            // backtracking along an edge?
            var xSame2 = x === pts[pti - 2][0];
            var ySame2 = y === pts[pti - 2][1];
            if(xSame && (x === xEdge0 || x === xEdge1) && xSame2) {
                if(ySame2) pti--; // backtracking exactly - drop prev pt and don't add
                else pts[pti - 1] = pt; // not exact: replace the prev pt
            } else if(ySame && (y === yEdge0 || y === yEdge1) && ySame2) {
                if(xSame2) pti--;
                else pts[pti - 1] = pt;
            } else pts[pti++] = pt;
        } else pts[pti++] = pt;
    }

    function updateEdgesForReentry(pt) {
        // if we're outside the nearby region and going back in,
        // we may need to loop around a corner point
        if(pts[pti - 1][0] !== pt[0] && pts[pti - 1][1] !== pt[1]) {
            updateEdge([lastXEdge, lastYEdge]);
        }
        updateEdge(pt);
        lastFarPt = null;
        lastXEdge = lastYEdge = 0;
    }

    function addPt(pt) {
        latestXFrac = pt[0] / xLen;
        latestYFrac = pt[1] / yLen;
        // Are we more than maxScreensAway off-screen any direction?
        // if so, clip to this box, but in such a way that on-screen
        // drawing is unchanged
        xEdge = (pt[0] < xEdge0) ? xEdge0 : (pt[0] > xEdge1) ? xEdge1 : 0;
        yEdge = (pt[1] < yEdge0) ? yEdge0 : (pt[1] > yEdge1) ? yEdge1 : 0;
        if(xEdge || yEdge) {
            if(!pti) {
                // to get fills right - if first point is far, push it toward the
                // screen in whichever direction(s) are far

                pts[pti++] = [xEdge || pt[0], yEdge || pt[1]];
            } else if(lastFarPt) {
                // both this point and the last are outside the nearby region
                // check if we're crossing the nearby region
                var intersections = getEdgeIntersections(lastFarPt, pt);
                if(intersections.length > 1) {
                    updateEdgesForReentry(intersections[0]);
                    pts[pti++] = intersections[1];
                }
            } else {
                // we're leaving the nearby region - add the point where we left it

                edgePt = getEdgeIntersections(pts[pti - 1], pt)[0];
                pts[pti++] = edgePt;
            }

            var lastPt = pts[pti - 1];
            if(xEdge && yEdge && (lastPt[0] !== xEdge || lastPt[1] !== yEdge)) {
                // we've gone out beyond a new corner: add the corner too
                // so that the next point will take the right winding
                if(lastFarPt) {
                    if(lastXEdge !== xEdge && lastYEdge !== yEdge) {
                        if(lastXEdge && lastYEdge) {
                            // we've gone around to an opposite corner - we
                            // need to add the correct extra corner
                            // in order to get the right winding
                            updateEdge(getClosestCorner(lastFarPt, pt));
                        } else {
                            // we're coming from a far edge - the extra corner
                            // we need is determined uniquely by the sectors
                            updateEdge([lastXEdge || xEdge, lastYEdge || yEdge]);
                        }
                    } else if(lastXEdge && lastYEdge) {
                        updateEdge([lastXEdge, lastYEdge]);
                    }
                }
                updateEdge([xEdge, yEdge]);
            } else if((lastXEdge - xEdge) && (lastYEdge - yEdge)) {
                // we're coming from an edge or far corner to an edge - again the
                // extra corner we need is uniquely determined by the sectors
                updateEdge([xEdge || lastXEdge, yEdge || lastYEdge]);
            }
            lastFarPt = pt;
            lastXEdge = xEdge;
            lastYEdge = yEdge;
        } else {
            if(lastFarPt) {
                // this point is in range but the previous wasn't: add its entry pt first
                updateEdgesForReentry(getEdgeIntersections(lastFarPt, pt)[0]);
            }

            pts[pti++] = pt;
        }
    }

    // loop over ALL points in this trace
    for(i = 0; i < len; i++) {
        clusterStartPt = getPt(i);
        if(!clusterStartPt) continue;

        pti = 0;
        lastFarPt = null;
        addPt(clusterStartPt);

        // loop over one segment of the trace
        for(i++; i < len; i++) {
            clusterHighPt = getPt(i);
            if(!clusterHighPt) {
                if(connectGaps) continue;
                else break;
            }

            // can't decimate if nonlinear line shape
            // TODO: we *could* decimate [hv]{2,3} shapes if we restricted clusters to horz or vert again
            // but spline would be verrry awkward to decimate
            if(!linear || !opts.simplify) {
                addPt(clusterHighPt);
                continue;
            }

            var nextPt = getPt(i + 1);

            clusterRefDist = ptDist(clusterHighPt, clusterStartPt);

            // #3147 - always include the very first and last points for fills
            if(!(fill && (pti === 0 || pti === len - 1)) &&
                clusterRefDist < getTolerance(clusterHighPt, nextPt) * minTolerance) continue;

            clusterUnitVector = [
                (clusterHighPt[0] - clusterStartPt[0]) / clusterRefDist,
                (clusterHighPt[1] - clusterStartPt[1]) / clusterRefDist
            ];

            clusterLowPt = clusterStartPt;
            clusterHighVal = clusterRefDist;
            clusterLowVal = clusterMinDeviation = clusterMaxDeviation = 0;
            clusterHighFirst = false;
            clusterEndPt = clusterHighPt;

            // loop over one cluster of points that collapse onto one line
            for(i++; i < d.length; i++) {
                thisPt = nextPt;
                nextPt = getPt(i + 1);
                if(!thisPt) {
                    if(connectGaps) continue;
                    else break;
                }
                thisVector = [
                    thisPt[0] - clusterStartPt[0],
                    thisPt[1] - clusterStartPt[1]
                ];
                // cross product (or dot with normal to the cluster vector)
                thisDeviation = thisVector[0] * clusterUnitVector[1] - thisVector[1] * clusterUnitVector[0];
                clusterMinDeviation = Math.min(clusterMinDeviation, thisDeviation);
                clusterMaxDeviation = Math.max(clusterMaxDeviation, thisDeviation);

                if(clusterMaxDeviation - clusterMinDeviation > getTolerance(thisPt, nextPt)) break;

                clusterEndPt = thisPt;
                thisVal = thisVector[0] * clusterUnitVector[0] + thisVector[1] * clusterUnitVector[1];

                if(thisVal > clusterHighVal) {
                    clusterHighVal = thisVal;
                    clusterHighPt = thisPt;
                    clusterHighFirst = false;
                } else if(thisVal < clusterLowVal) {
                    clusterLowVal = thisVal;
                    clusterLowPt = thisPt;
                    clusterHighFirst = true;
                }
            }

            // insert this cluster into pts
            // we've already inserted the start pt, now check if we have high and low pts
            if(clusterHighFirst) {
                addPt(clusterHighPt);
                if(clusterEndPt !== clusterLowPt) addPt(clusterLowPt);
            } else {
                if(clusterLowPt !== clusterStartPt) addPt(clusterLowPt);
                if(clusterEndPt !== clusterHighPt) addPt(clusterHighPt);
            }
            // and finally insert the end pt
            addPt(clusterEndPt);

            // have we reached the end of this segment?
            if(i >= d.length || !thisPt) break;

            // otherwise we have an out-of-cluster point to insert as next clusterStartPt
            addPt(thisPt);
            clusterStartPt = thisPt;
        }

        // to get fills right - repeat what we did at the start
        if(lastFarPt) updateEdge([lastXEdge || lastFarPt[0], lastYEdge || lastFarPt[1]]);

        segments.push(pts.slice(0, pti));
    }

    return segments;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/style.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/style.js ***!
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
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

function style(gd) {
    var s = d3.select(gd).selectAll('g.trace.scatter');

    s.style('opacity', function(d) {
        return d[0].trace.opacity;
    });

    s.selectAll('g.points').each(function(d) {
        var sel = d3.select(this);
        var trace = d.trace || d[0].trace;
        stylePoints(sel, trace, gd);
    });

    s.selectAll('g.text').each(function(d) {
        var sel = d3.select(this);
        var trace = d.trace || d[0].trace;
        styleText(sel, trace, gd);
    });

    s.selectAll('g.trace path.js-line')
        .call(Drawing.lineGroupStyle);

    s.selectAll('g.trace path.js-fill')
        .call(Drawing.fillGroupStyle);

    Registry.getComponentMethod('errorbars', 'style')(s);
}

function stylePoints(sel, trace, gd) {
    Drawing.pointStyle(sel.selectAll('path.point'), trace, gd);
}

function styleText(sel, trace, gd) {
    Drawing.textPointStyle(sel.selectAll('text'), trace, gd);
}

function styleOnSelect(gd, cd, sel) {
    var trace = cd[0].trace;

    if(trace.selectedpoints) {
        Drawing.selectedPointStyle(sel.selectAll('path.point'), trace);
        Drawing.selectedTextStyle(sel.selectAll('text'), trace);
    } else {
        stylePoints(sel, trace, gd);
        styleText(sel, trace, gd);
    }
}

module.exports = {
    style: style,
    stylePoints: stylePoints,
    styleText: styleText,
    styleOnSelect: styleOnSelect
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbGluZV9wb2ludHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyxzRkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLG1CQUFPLENBQUMsNERBQVc7QUFDN0I7QUFDQTtBQUNBLGdCQUFnQixtQkFBTyxDQUFDLDZFQUFhOzs7QUFHckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyx1Q0FBdUM7QUFDdkMsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOENBQThDLElBQUk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxtQ0FBSTtBQUNyQixjQUFjLG1CQUFPLENBQUMsMEZBQTBCO0FBQ2hELGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRXZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydGM2OGMyY2RjYWI1ZTJhOWI3NDIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBudW1Db25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvbnVtZXJpY2FsJyk7XG52YXIgQkFETlVNID0gbnVtQ29uc3RhbnRzLkJBRE5VTTtcbnZhciBMT0dfQ0xJUCA9IG51bUNvbnN0YW50cy5MT0dfQ0xJUDtcbnZhciBMT0dfQ0xJUF9QTFVTID0gTE9HX0NMSVAgKyAwLjU7XG52YXIgTE9HX0NMSVBfTUlOVVMgPSBMT0dfQ0xJUCAtIDAuNTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBzZWdtZW50c0ludGVyc2VjdCA9IExpYi5zZWdtZW50c0ludGVyc2VjdDtcbnZhciBjb25zdHJhaW4gPSBMaWIuY29uc3RyYWluO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaW5lUG9pbnRzKGQsIG9wdHMpIHtcbiAgICB2YXIgeGEgPSBvcHRzLnhheGlzO1xuICAgIHZhciB5YSA9IG9wdHMueWF4aXM7XG4gICAgdmFyIHhMb2cgPSB4YS50eXBlID09PSAnbG9nJztcbiAgICB2YXIgeUxvZyA9IHlhLnR5cGUgPT09ICdsb2cnO1xuICAgIHZhciB4TGVuID0geGEuX2xlbmd0aDtcbiAgICB2YXIgeUxlbiA9IHlhLl9sZW5ndGg7XG4gICAgdmFyIGNvbm5lY3RHYXBzID0gb3B0cy5jb25uZWN0R2FwcztcbiAgICB2YXIgYmFzZVRvbGVyYW5jZSA9IG9wdHMuYmFzZVRvbGVyYW5jZTtcbiAgICB2YXIgc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgIHZhciBsaW5lYXIgPSBzaGFwZSA9PT0gJ2xpbmVhcic7XG4gICAgdmFyIGZpbGwgPSBvcHRzLmZpbGwgJiYgb3B0cy5maWxsICE9PSAnbm9uZSc7XG4gICAgdmFyIHNlZ21lbnRzID0gW107XG4gICAgdmFyIG1pblRvbGVyYW5jZSA9IGNvbnN0YW50cy5taW5Ub2xlcmFuY2U7XG4gICAgdmFyIGxlbiA9IGQubGVuZ3RoO1xuICAgIHZhciBwdHMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICB2YXIgcHRpID0gMDtcblxuICAgIHZhciBpO1xuXG4gICAgLy8gcHQgdmFyaWFibGVzIGFyZSBwaXhlbCBjb29yZGluYXRlcyBbeCx5XSBvZiBvbmUgcG9pbnRcbiAgICAvLyB0aGVzZSBmb3VyIGFyZSB0aGUgb3V0cHV0cyBvZiBjbHVzdGVyaW5nIG9uIGEgbGluZVxuICAgIHZhciBjbHVzdGVyU3RhcnRQdCwgY2x1c3RlckVuZFB0LCBjbHVzdGVySGlnaFB0LCBjbHVzdGVyTG93UHQ7XG5cbiAgICAvLyBcInRoaXNcIiBpcyB0aGUgbmV4dCBwb2ludCB3ZSdyZSBjb25zaWRlcmluZyBhZGRpbmcgdG8gdGhlIGNsdXN0ZXJcbiAgICB2YXIgdGhpc1B0O1xuXG4gICAgLy8gZGlkIHdlIGVuY291bnRlciB0aGUgaGlnaCBwb2ludCBmaXJzdCwgdGhlbiBhIGxvdyBwb2ludCwgb3IgdmljZSB2ZXJzYT9cbiAgICB2YXIgY2x1c3RlckhpZ2hGaXJzdDtcblxuICAgIC8vIHRoZSBmaXJzdCB0d28gcG9pbnRzIGluIHRoZSBjbHVzdGVyIGRldGVybWluZSBpdHMgdW5pdCB2ZWN0b3JcbiAgICAvLyBzbyB0aGUgc2Vjb25kIGlzIGFsd2F5cyBpbiB0aGUgXCJIaWdoXCIgZGlyZWN0aW9uXG4gICAgdmFyIGNsdXN0ZXJVbml0VmVjdG9yO1xuXG4gICAgLy8gdGhlIHBpeGVsIGRlbHRhIGZyb20gY2x1c3RlclN0YXJ0UHRcbiAgICB2YXIgdGhpc1ZlY3RvcjtcblxuICAgIC8vIHZhbCB2YXJpYWJsZXMgYXJlIChzaWduZWQpIHBpeGVsIGRpc3RhbmNlcyBhbG9uZyB0aGUgY2x1c3RlciB2ZWN0b3JcbiAgICB2YXIgY2x1c3RlclJlZkRpc3QsIGNsdXN0ZXJIaWdoVmFsLCBjbHVzdGVyTG93VmFsLCB0aGlzVmFsO1xuXG4gICAgLy8gZGV2aWF0aW9uIHZhcmlhYmxlcyBhcmUgKHNpZ25lZCkgcGl4ZWwgZGlzdGFuY2VzIG5vcm1hbCB0byB0aGUgY2x1c3RlciB2ZWN0b3JcbiAgICB2YXIgY2x1c3Rlck1pbkRldmlhdGlvbiwgY2x1c3Rlck1heERldmlhdGlvbiwgdGhpc0RldmlhdGlvbjtcblxuICAgIC8vIHR1cm4gb25lIGNhbGNkYXRhIHBvaW50IGludG8gcGl4ZWwgY29vcmRpbmF0ZXNcbiAgICBmdW5jdGlvbiBnZXRQdChpbmRleCkge1xuICAgICAgICB2YXIgZGkgPSBkW2luZGV4XTtcbiAgICAgICAgaWYoIWRpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciB4ID0gb3B0cy5saW5lYXJpemVkID8geGEubDJwKGRpLngpIDogeGEuYzJwKGRpLngpO1xuICAgICAgICB2YXIgeSA9IG9wdHMubGluZWFyaXplZCA/IHlhLmwycChkaS55KSA6IHlhLmMycChkaS55KTtcblxuICAgICAgICAvLyBpZiBub24tcG9zaXRpdmUgbG9nIHZhbHVlcywgc2V0IHRoZW0gVkVSWSBmYXIgb2ZmLXNjcmVlblxuICAgICAgICAvLyBzbyB0aGUgbGluZSBsb29rcyBlc3NlbnRpYWxseSBzdHJhaWdodCBmcm9tIHRoZSBwcmV2aW91cyBwb2ludC5cbiAgICAgICAgaWYoeCA9PT0gQkFETlVNKSB7XG4gICAgICAgICAgICBpZih4TG9nKSB4ID0geGEuYzJwKGRpLngsIHRydWUpO1xuICAgICAgICAgICAgaWYoeCA9PT0gQkFETlVNKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAvLyBJZiBCT1RIIHdlcmUgYmFkIGxvZyB2YWx1ZXMsIG1ha2UgdGhlIGxpbmUgZm9sbG93IGEgY29uc3RhbnRcbiAgICAgICAgICAgIC8vIGV4cG9uZW50IHJhdGhlciB0aGFuIGEgY29uc3RhbnQgc2xvcGVcbiAgICAgICAgICAgIGlmKHlMb2cgJiYgeSA9PT0gQkFETlVNKSB7XG4gICAgICAgICAgICAgICAgeCAqPSBNYXRoLmFicyh4YS5fbSAqIHlMZW4gKiAoeGEuX20gPiAwID8gTE9HX0NMSVBfUExVUyA6IExPR19DTElQX01JTlVTKSAvXG4gICAgICAgICAgICAgICAgICAgICh5YS5fbSAqIHhMZW4gKiAoeWEuX20gPiAwID8gTE9HX0NMSVBfUExVUyA6IExPR19DTElQX01JTlVTKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeCAqPSAxMDAwO1xuICAgICAgICB9XG4gICAgICAgIGlmKHkgPT09IEJBRE5VTSkge1xuICAgICAgICAgICAgaWYoeUxvZykgeSA9IHlhLmMycChkaS55LCB0cnVlKTtcbiAgICAgICAgICAgIGlmKHkgPT09IEJBRE5VTSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgeSAqPSAxMDAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3Jvc3Nlc1ZpZXdwb3J0KHhGcmFjMCwgeUZyYWMwLCB4RnJhYzEsIHlGcmFjMSkge1xuICAgICAgICB2YXIgZHggPSB4RnJhYzEgLSB4RnJhYzA7XG4gICAgICAgIHZhciBkeSA9IHlGcmFjMSAtIHlGcmFjMDtcbiAgICAgICAgdmFyIGR4MCA9IDAuNSAtIHhGcmFjMDtcbiAgICAgICAgdmFyIGR5MCA9IDAuNSAtIHlGcmFjMDtcbiAgICAgICAgdmFyIG5vcm0yID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICAgIHZhciBkb3QgPSBkeCAqIGR4MCArIGR5ICogZHkwO1xuICAgICAgICBpZihkb3QgPiAwICYmIGRvdCA8IG5vcm0yKSB7XG4gICAgICAgICAgICB2YXIgY3Jvc3MgPSBkeDAgKiBkeSAtIGR5MCAqIGR4O1xuICAgICAgICAgICAgaWYoY3Jvc3MgKiBjcm9zcyA8IG5vcm0yKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsYXRlc3RYRnJhYywgbGF0ZXN0WUZyYWM7XG4gICAgLy8gaWYgd2UncmUgb2ZmLXNjcmVlbiwgaW5jcmVhc2UgdG9sZXJhbmNlIG92ZXIgYmFzZVRvbGVyYW5jZVxuICAgIGZ1bmN0aW9uIGdldFRvbGVyYW5jZShwdCwgbmV4dFB0KSB7XG4gICAgICAgIHZhciB4RnJhYyA9IHB0WzBdIC8geExlbjtcbiAgICAgICAgdmFyIHlGcmFjID0gcHRbMV0gLyB5TGVuO1xuICAgICAgICB2YXIgb2ZmU2NyZWVuRnJhY3Rpb24gPSBNYXRoLm1heCgwLCAteEZyYWMsIHhGcmFjIC0gMSwgLXlGcmFjLCB5RnJhYyAtIDEpO1xuICAgICAgICBpZihvZmZTY3JlZW5GcmFjdGlvbiAmJiAobGF0ZXN0WEZyYWMgIT09IHVuZGVmaW5lZCkgJiZcbiAgICAgICAgICAgIGNyb3NzZXNWaWV3cG9ydCh4RnJhYywgeUZyYWMsIGxhdGVzdFhGcmFjLCBsYXRlc3RZRnJhYylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvZmZTY3JlZW5GcmFjdGlvbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYob2ZmU2NyZWVuRnJhY3Rpb24gJiYgbmV4dFB0ICYmXG4gICAgICAgICAgICBjcm9zc2VzVmlld3BvcnQoeEZyYWMsIHlGcmFjLCBuZXh0UHRbMF0gLyB4TGVuLCBuZXh0UHRbMV0gLyB5TGVuKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIG9mZlNjcmVlbkZyYWN0aW9uID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoMSArIGNvbnN0YW50cy50b2xlcmFuY2VHcm93dGggKiBvZmZTY3JlZW5GcmFjdGlvbikgKiBiYXNlVG9sZXJhbmNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHB0RGlzdChwdDEsIHB0Mikge1xuICAgICAgICB2YXIgZHggPSBwdDFbMF0gLSBwdDJbMF07XG4gICAgICAgIHZhciBkeSA9IHB0MVsxXSAtIHB0MlsxXTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgfVxuXG4gICAgLy8gbGFzdCBiaXQgb2YgZmlsdGVyaW5nOiBjbGlwIHBhdGhzIHRoYXQgYXJlIFZFUlkgZmFyIG9mZi1zY3JlZW5cbiAgICAvLyBzbyB3ZSBkb24ndCBnZXQgbmVhciB0aGUgYnJvd3NlcidzIGhhcmQgbGltaXQgKCsvLSAyXjI5IHB4IGluIENocm9tZSBhbmQgRkYpXG5cbiAgICB2YXIgbWF4U2NyZWVuc0F3YXkgPSBjb25zdGFudHMubWF4U2NyZWVuc0F3YXk7XG5cbiAgICAvLyBmaW5kIHRoZSBpbnRlcnNlY3Rpb25zIGJldHdlZW4gdGhlIHNlZ21lbnQgZnJvbSBwdDEgdG8gcHQyXG4gICAgLy8gYW5kIHRoZSBsYXJnZSByZWN0YW5nbGUgbWF4U2NyZWVuc0F3YXkgYXJvdW5kIHRoZSB2aWV3cG9ydFxuICAgIC8vIGlmIG9uZSBvZiBwdDEgYW5kIHB0MiBpcyBpbnNpZGUgYW5kIHRoZSBvdGhlciBvdXRzaWRlLCB0aGVyZVxuICAgIC8vIHdpbGwgYmUgb25seSBvbmUgaW50ZXJzZWN0aW9uLlxuICAgIC8vIGlmIGJvdGggYXJlIG91dHNpZGUgdGhlcmUgd2lsbCBiZSAwIG9yIDIgaW50ZXJzZWN0aW9uc1xuICAgIC8vIChvciAxIGlmIGl0J3MgcmlnaHQgYXQgYSBjb3JuZXIgLSB3ZSdsbCB0cmVhdCB0aGF0IGxpa2UgMClcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIGludGVyc2VjdGlvbiBwdHNcbiAgICB2YXIgeEVkZ2UwID0gLXhMZW4gKiBtYXhTY3JlZW5zQXdheTtcbiAgICB2YXIgeEVkZ2UxID0geExlbiAqICgxICsgbWF4U2NyZWVuc0F3YXkpO1xuICAgIHZhciB5RWRnZTAgPSAteUxlbiAqIG1heFNjcmVlbnNBd2F5O1xuICAgIHZhciB5RWRnZTEgPSB5TGVuICogKDEgKyBtYXhTY3JlZW5zQXdheSk7XG4gICAgdmFyIGVkZ2VzID0gW1xuICAgICAgICBbeEVkZ2UwLCB5RWRnZTAsIHhFZGdlMSwgeUVkZ2UwXSxcbiAgICAgICAgW3hFZGdlMSwgeUVkZ2UwLCB4RWRnZTEsIHlFZGdlMV0sXG4gICAgICAgIFt4RWRnZTEsIHlFZGdlMSwgeEVkZ2UwLCB5RWRnZTFdLFxuICAgICAgICBbeEVkZ2UwLCB5RWRnZTEsIHhFZGdlMCwgeUVkZ2UwXVxuICAgIF07XG4gICAgdmFyIHhFZGdlLCB5RWRnZSwgbGFzdFhFZGdlLCBsYXN0WUVkZ2UsIGxhc3RGYXJQdCwgZWRnZVB0O1xuXG4gICAgLy8gZm9yIGxpbmVhciBsaW5lIHNoYXBlLCBlZGdlIGludGVyc2VjdGlvbnMgc2hvdWxkIGJlIGxpbmVhcmx5IGludGVycG9sYXRlZFxuICAgIC8vIHNwbGluZSB1c2VzIHRoaXMgdG9vLCB3aGljaCBpc24ndCBwcmVjaXNlbHkgY29ycmVjdCBidXQgaXMgYWN0dWFsbHkgcHJldHR5XG4gICAgLy8gZ29vZCwgYmVjYXVzZSBDYXRtdWxsLVJvbSB3ZWlnaHRzIGZhci1hd2F5IHBvaW50cyBsZXNzIGluIGNyZWF0aW5nIHRoZSBjdXJ2YXR1cmVcbiAgICBmdW5jdGlvbiBnZXRMaW5lYXJFZGdlSW50ZXJzZWN0aW9ucyhwdDEsIHB0Mikge1xuICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgIHZhciBwdENvdW50ID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVkZ2UgPSBlZGdlc1tpXTtcbiAgICAgICAgICAgIHZhciBwdEludCA9IHNlZ21lbnRzSW50ZXJzZWN0KFxuICAgICAgICAgICAgICAgIHB0MVswXSwgcHQxWzFdLCBwdDJbMF0sIHB0MlsxXSxcbiAgICAgICAgICAgICAgICBlZGdlWzBdLCBlZGdlWzFdLCBlZGdlWzJdLCBlZGdlWzNdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYocHRJbnQgJiYgKCFwdENvdW50IHx8XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMocHRJbnQueCAtIG91dFswXVswXSkgPiAxIHx8XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMocHRJbnQueSAtIG91dFswXVsxXSkgPiAxXG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgICAgICAgcHRJbnQgPSBbcHRJbnQueCwgcHRJbnQueV07XG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSAyIGludGVyc2VjdGlvbnMsIG1ha2Ugc3VyZSB0aGUgY2xvc2VzdCBvbmUgdG8gcHQxIGNvbWVzIGZpcnN0XG4gICAgICAgICAgICAgICAgaWYocHRDb3VudCAmJiBwdERpc3QocHRJbnQsIHB0MSkgPCBwdERpc3Qob3V0WzBdLCBwdDEpKSBvdXQudW5zaGlmdChwdEludCk7XG4gICAgICAgICAgICAgICAgZWxzZSBvdXQucHVzaChwdEludCk7XG4gICAgICAgICAgICAgICAgcHRDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25seUNvbnN0cmFpbmVkUG9pbnQocHQpIHtcbiAgICAgICAgaWYocHRbMF0gPCB4RWRnZTAgfHwgcHRbMF0gPiB4RWRnZTEgfHwgcHRbMV0gPCB5RWRnZTAgfHwgcHRbMV0gPiB5RWRnZTEpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29uc3RyYWluKHB0WzBdLCB4RWRnZTAsIHhFZGdlMSksIGNvbnN0cmFpbihwdFsxXSwgeUVkZ2UwLCB5RWRnZTEpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhbWVFZGdlKHB0MSwgcHQyKSB7XG4gICAgICAgIGlmKHB0MVswXSA9PT0gcHQyWzBdICYmIChwdDFbMF0gPT09IHhFZGdlMCB8fCBwdDFbMF0gPT09IHhFZGdlMSkpIHJldHVybiB0cnVlO1xuICAgICAgICBpZihwdDFbMV0gPT09IHB0MlsxXSAmJiAocHQxWzFdID09PSB5RWRnZTAgfHwgcHQxWzFdID09PSB5RWRnZTEpKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBmb3IgbGluZSBzaGFwZXMgaHYgYW5kIHZoLCBtb3ZlbWVudCBpbiB0aGUgdHdvIGRpbWVuc2lvbnMgaXMgZGVjb3VwbGVkLFxuICAgIC8vIHNvIGFsbCB3ZSBuZWVkIHRvIGRvIGlzIGNvbnN0cmFpbiBlYWNoIGRpbWVuc2lvbiBpbmRlcGVuZGVudGx5XG4gICAgZnVuY3Rpb24gZ2V0SFZFZGdlSW50ZXJzZWN0aW9ucyhwdDEsIHB0Mikge1xuICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgIHZhciBwdEludDEgPSBvbmx5Q29uc3RyYWluZWRQb2ludChwdDEpO1xuICAgICAgICB2YXIgcHRJbnQyID0gb25seUNvbnN0cmFpbmVkUG9pbnQocHQyKTtcbiAgICAgICAgaWYocHRJbnQxICYmIHB0SW50MiAmJiBzYW1lRWRnZShwdEludDEsIHB0SW50MikpIHJldHVybiBvdXQ7XG5cbiAgICAgICAgaWYocHRJbnQxKSBvdXQucHVzaChwdEludDEpO1xuICAgICAgICBpZihwdEludDIpIG91dC5wdXNoKHB0SW50Mik7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLy8gaHZoIGFuZCB2aHYgd2Ugc29tZXRpbWVzIGhhdmUgdG8gbW92ZSBvbmUgb2YgdGhlIGludGVyc2VjdGlvbiBwb2ludHNcbiAgICAvLyBvdXQgQkVZT05EIHRoZSBjbGlwcGluZyByZWN0LCBieSBhIG1heGltdW0gb2YgYSBmYWN0b3Igb2YgMiwgc28gdGhhdFxuICAgIC8vIHRoZSBtaWRwb2ludCBsaW5lIGlzIGRyYXduIGluIHRoZSByaWdodCBwbGFjZVxuICAgIGZ1bmN0aW9uIGdldEFCQUVkZ2VJbnRlcnNlY3Rpb25zKGRpbSwgbGltaXQwLCBsaW1pdDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHB0MSwgcHQyKSB7XG4gICAgICAgICAgICB2YXIgcHRJbnQxID0gb25seUNvbnN0cmFpbmVkUG9pbnQocHQxKTtcbiAgICAgICAgICAgIHZhciBwdEludDIgPSBvbmx5Q29uc3RyYWluZWRQb2ludChwdDIpO1xuXG4gICAgICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgICAgICBpZihwdEludDEgJiYgcHRJbnQyICYmIHNhbWVFZGdlKHB0SW50MSwgcHRJbnQyKSkgcmV0dXJuIG91dDtcblxuICAgICAgICAgICAgaWYocHRJbnQxKSBvdXQucHVzaChwdEludDEpO1xuICAgICAgICAgICAgaWYocHRJbnQyKSBvdXQucHVzaChwdEludDIpO1xuXG4gICAgICAgICAgICB2YXIgbWlkU2hpZnQgPSAyICogTGliLmNvbnN0cmFpbigocHQxW2RpbV0gKyBwdDJbZGltXSkgLyAyLCBsaW1pdDAsIGxpbWl0MSkgLVxuICAgICAgICAgICAgICAgICgocHRJbnQxIHx8IHB0MSlbZGltXSArIChwdEludDIgfHwgcHQyKVtkaW1dKTtcbiAgICAgICAgICAgIGlmKG1pZFNoaWZ0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHB0VG9BbHRlcjtcbiAgICAgICAgICAgICAgICBpZihwdEludDEgJiYgcHRJbnQyKSB7XG4gICAgICAgICAgICAgICAgICAgIHB0VG9BbHRlciA9IChtaWRTaGlmdCA+IDAgPT09IHB0SW50MVtkaW1dID4gcHRJbnQyW2RpbV0pID8gcHRJbnQxIDogcHRJbnQyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBwdFRvQWx0ZXIgPSBwdEludDEgfHwgcHRJbnQyO1xuXG4gICAgICAgICAgICAgICAgcHRUb0FsdGVyW2RpbV0gKz0gbWlkU2hpZnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGdldEVkZ2VJbnRlcnNlY3Rpb25zO1xuICAgIGlmKHNoYXBlID09PSAnbGluZWFyJyB8fCBzaGFwZSA9PT0gJ3NwbGluZScpIHtcbiAgICAgICAgZ2V0RWRnZUludGVyc2VjdGlvbnMgPSBnZXRMaW5lYXJFZGdlSW50ZXJzZWN0aW9ucztcbiAgICB9IGVsc2UgaWYoc2hhcGUgPT09ICdodicgfHwgc2hhcGUgPT09ICd2aCcpIHtcbiAgICAgICAgZ2V0RWRnZUludGVyc2VjdGlvbnMgPSBnZXRIVkVkZ2VJbnRlcnNlY3Rpb25zO1xuICAgIH0gZWxzZSBpZihzaGFwZSA9PT0gJ2h2aCcpIGdldEVkZ2VJbnRlcnNlY3Rpb25zID0gZ2V0QUJBRWRnZUludGVyc2VjdGlvbnMoMCwgeEVkZ2UwLCB4RWRnZTEpO1xuICAgIGVsc2UgaWYoc2hhcGUgPT09ICd2aHYnKSBnZXRFZGdlSW50ZXJzZWN0aW9ucyA9IGdldEFCQUVkZ2VJbnRlcnNlY3Rpb25zKDEsIHlFZGdlMCwgeUVkZ2UxKTtcblxuICAgIC8vIGEgc2VnbWVudCBwdDEtPnB0MiBlbnRpcmVseSBvdXRzaWRlIHRoZSBuZWFyYnkgcmVnaW9uOlxuICAgIC8vIGZpbmQgdGhlIGNvcm5lciBpdCBnZXRzIGNsb3Nlc3QgdG8gdG91Y2hpbmdcbiAgICBmdW5jdGlvbiBnZXRDbG9zZXN0Q29ybmVyKHB0MSwgcHQyKSB7XG4gICAgICAgIHZhciBkeCA9IHB0MlswXSAtIHB0MVswXTtcbiAgICAgICAgdmFyIG0gPSAocHQyWzFdIC0gcHQxWzFdKSAvIGR4O1xuICAgICAgICB2YXIgYiA9IChwdDFbMV0gKiBwdDJbMF0gLSBwdDJbMV0gKiBwdDFbMF0pIC8gZHg7XG5cbiAgICAgICAgaWYoYiA+IDApIHJldHVybiBbbSA+IDAgPyB4RWRnZTAgOiB4RWRnZTEsIHlFZGdlMV07XG4gICAgICAgIGVsc2UgcmV0dXJuIFttID4gMCA/IHhFZGdlMSA6IHhFZGdlMCwgeUVkZ2UwXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVFZGdlKHB0KSB7XG4gICAgICAgIHZhciB4ID0gcHRbMF07XG4gICAgICAgIHZhciB5ID0gcHRbMV07XG4gICAgICAgIHZhciB4U2FtZSA9IHggPT09IHB0c1twdGkgLSAxXVswXTtcbiAgICAgICAgdmFyIHlTYW1lID0geSA9PT0gcHRzW3B0aSAtIDFdWzFdO1xuICAgICAgICAvLyBkdXBsaWNhdGUgcG9pbnQ/XG4gICAgICAgIGlmKHhTYW1lICYmIHlTYW1lKSByZXR1cm47XG4gICAgICAgIGlmKHB0aSA+IDEpIHtcbiAgICAgICAgICAgIC8vIGJhY2t0cmFja2luZyBhbG9uZyBhbiBlZGdlP1xuICAgICAgICAgICAgdmFyIHhTYW1lMiA9IHggPT09IHB0c1twdGkgLSAyXVswXTtcbiAgICAgICAgICAgIHZhciB5U2FtZTIgPSB5ID09PSBwdHNbcHRpIC0gMl1bMV07XG4gICAgICAgICAgICBpZih4U2FtZSAmJiAoeCA9PT0geEVkZ2UwIHx8IHggPT09IHhFZGdlMSkgJiYgeFNhbWUyKSB7XG4gICAgICAgICAgICAgICAgaWYoeVNhbWUyKSBwdGktLTsgLy8gYmFja3RyYWNraW5nIGV4YWN0bHkgLSBkcm9wIHByZXYgcHQgYW5kIGRvbid0IGFkZFxuICAgICAgICAgICAgICAgIGVsc2UgcHRzW3B0aSAtIDFdID0gcHQ7IC8vIG5vdCBleGFjdDogcmVwbGFjZSB0aGUgcHJldiBwdFxuICAgICAgICAgICAgfSBlbHNlIGlmKHlTYW1lICYmICh5ID09PSB5RWRnZTAgfHwgeSA9PT0geUVkZ2UxKSAmJiB5U2FtZTIpIHtcbiAgICAgICAgICAgICAgICBpZih4U2FtZTIpIHB0aS0tO1xuICAgICAgICAgICAgICAgIGVsc2UgcHRzW3B0aSAtIDFdID0gcHQ7XG4gICAgICAgICAgICB9IGVsc2UgcHRzW3B0aSsrXSA9IHB0O1xuICAgICAgICB9IGVsc2UgcHRzW3B0aSsrXSA9IHB0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUVkZ2VzRm9yUmVlbnRyeShwdCkge1xuICAgICAgICAvLyBpZiB3ZSdyZSBvdXRzaWRlIHRoZSBuZWFyYnkgcmVnaW9uIGFuZCBnb2luZyBiYWNrIGluLFxuICAgICAgICAvLyB3ZSBtYXkgbmVlZCB0byBsb29wIGFyb3VuZCBhIGNvcm5lciBwb2ludFxuICAgICAgICBpZihwdHNbcHRpIC0gMV1bMF0gIT09IHB0WzBdICYmIHB0c1twdGkgLSAxXVsxXSAhPT0gcHRbMV0pIHtcbiAgICAgICAgICAgIHVwZGF0ZUVkZ2UoW2xhc3RYRWRnZSwgbGFzdFlFZGdlXSk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlRWRnZShwdCk7XG4gICAgICAgIGxhc3RGYXJQdCA9IG51bGw7XG4gICAgICAgIGxhc3RYRWRnZSA9IGxhc3RZRWRnZSA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHQocHQpIHtcbiAgICAgICAgbGF0ZXN0WEZyYWMgPSBwdFswXSAvIHhMZW47XG4gICAgICAgIGxhdGVzdFlGcmFjID0gcHRbMV0gLyB5TGVuO1xuICAgICAgICAvLyBBcmUgd2UgbW9yZSB0aGFuIG1heFNjcmVlbnNBd2F5IG9mZi1zY3JlZW4gYW55IGRpcmVjdGlvbj9cbiAgICAgICAgLy8gaWYgc28sIGNsaXAgdG8gdGhpcyBib3gsIGJ1dCBpbiBzdWNoIGEgd2F5IHRoYXQgb24tc2NyZWVuXG4gICAgICAgIC8vIGRyYXdpbmcgaXMgdW5jaGFuZ2VkXG4gICAgICAgIHhFZGdlID0gKHB0WzBdIDwgeEVkZ2UwKSA/IHhFZGdlMCA6IChwdFswXSA+IHhFZGdlMSkgPyB4RWRnZTEgOiAwO1xuICAgICAgICB5RWRnZSA9IChwdFsxXSA8IHlFZGdlMCkgPyB5RWRnZTAgOiAocHRbMV0gPiB5RWRnZTEpID8geUVkZ2UxIDogMDtcbiAgICAgICAgaWYoeEVkZ2UgfHwgeUVkZ2UpIHtcbiAgICAgICAgICAgIGlmKCFwdGkpIHtcbiAgICAgICAgICAgICAgICAvLyB0byBnZXQgZmlsbHMgcmlnaHQgLSBpZiBmaXJzdCBwb2ludCBpcyBmYXIsIHB1c2ggaXQgdG93YXJkIHRoZVxuICAgICAgICAgICAgICAgIC8vIHNjcmVlbiBpbiB3aGljaGV2ZXIgZGlyZWN0aW9uKHMpIGFyZSBmYXJcblxuICAgICAgICAgICAgICAgIHB0c1twdGkrK10gPSBbeEVkZ2UgfHwgcHRbMF0sIHlFZGdlIHx8IHB0WzFdXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihsYXN0RmFyUHQpIHtcbiAgICAgICAgICAgICAgICAvLyBib3RoIHRoaXMgcG9pbnQgYW5kIHRoZSBsYXN0IGFyZSBvdXRzaWRlIHRoZSBuZWFyYnkgcmVnaW9uXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UncmUgY3Jvc3NpbmcgdGhlIG5lYXJieSByZWdpb25cbiAgICAgICAgICAgICAgICB2YXIgaW50ZXJzZWN0aW9ucyA9IGdldEVkZ2VJbnRlcnNlY3Rpb25zKGxhc3RGYXJQdCwgcHQpO1xuICAgICAgICAgICAgICAgIGlmKGludGVyc2VjdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVFZGdlc0ZvclJlZW50cnkoaW50ZXJzZWN0aW9uc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHB0c1twdGkrK10gPSBpbnRlcnNlY3Rpb25zWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gd2UncmUgbGVhdmluZyB0aGUgbmVhcmJ5IHJlZ2lvbiAtIGFkZCB0aGUgcG9pbnQgd2hlcmUgd2UgbGVmdCBpdFxuXG4gICAgICAgICAgICAgICAgZWRnZVB0ID0gZ2V0RWRnZUludGVyc2VjdGlvbnMocHRzW3B0aSAtIDFdLCBwdClbMF07XG4gICAgICAgICAgICAgICAgcHRzW3B0aSsrXSA9IGVkZ2VQdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGxhc3RQdCA9IHB0c1twdGkgLSAxXTtcbiAgICAgICAgICAgIGlmKHhFZGdlICYmIHlFZGdlICYmIChsYXN0UHRbMF0gIT09IHhFZGdlIHx8IGxhc3RQdFsxXSAhPT0geUVkZ2UpKSB7XG4gICAgICAgICAgICAgICAgLy8gd2UndmUgZ29uZSBvdXQgYmV5b25kIGEgbmV3IGNvcm5lcjogYWRkIHRoZSBjb3JuZXIgdG9vXG4gICAgICAgICAgICAgICAgLy8gc28gdGhhdCB0aGUgbmV4dCBwb2ludCB3aWxsIHRha2UgdGhlIHJpZ2h0IHdpbmRpbmdcbiAgICAgICAgICAgICAgICBpZihsYXN0RmFyUHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobGFzdFhFZGdlICE9PSB4RWRnZSAmJiBsYXN0WUVkZ2UgIT09IHlFZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0WEVkZ2UgJiYgbGFzdFlFZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UndmUgZ29uZSBhcm91bmQgdG8gYW4gb3Bwb3NpdGUgY29ybmVyIC0gd2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGFkZCB0aGUgY29ycmVjdCBleHRyYSBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiBvcmRlciB0byBnZXQgdGhlIHJpZ2h0IHdpbmRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVFZGdlKGdldENsb3Nlc3RDb3JuZXIobGFzdEZhclB0LCBwdCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBjb21pbmcgZnJvbSBhIGZhciBlZGdlIC0gdGhlIGV4dHJhIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgaXMgZGV0ZXJtaW5lZCB1bmlxdWVseSBieSB0aGUgc2VjdG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUVkZ2UoW2xhc3RYRWRnZSB8fCB4RWRnZSwgbGFzdFlFZGdlIHx8IHlFZGdlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihsYXN0WEVkZ2UgJiYgbGFzdFlFZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVFZGdlKFtsYXN0WEVkZ2UsIGxhc3RZRWRnZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVwZGF0ZUVkZ2UoW3hFZGdlLCB5RWRnZV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmKChsYXN0WEVkZ2UgLSB4RWRnZSkgJiYgKGxhc3RZRWRnZSAtIHlFZGdlKSkge1xuICAgICAgICAgICAgICAgIC8vIHdlJ3JlIGNvbWluZyBmcm9tIGFuIGVkZ2Ugb3IgZmFyIGNvcm5lciB0byBhbiBlZGdlIC0gYWdhaW4gdGhlXG4gICAgICAgICAgICAgICAgLy8gZXh0cmEgY29ybmVyIHdlIG5lZWQgaXMgdW5pcXVlbHkgZGV0ZXJtaW5lZCBieSB0aGUgc2VjdG9yc1xuICAgICAgICAgICAgICAgIHVwZGF0ZUVkZ2UoW3hFZGdlIHx8IGxhc3RYRWRnZSwgeUVkZ2UgfHwgbGFzdFlFZGdlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0RmFyUHQgPSBwdDtcbiAgICAgICAgICAgIGxhc3RYRWRnZSA9IHhFZGdlO1xuICAgICAgICAgICAgbGFzdFlFZGdlID0geUVkZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihsYXN0RmFyUHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHBvaW50IGlzIGluIHJhbmdlIGJ1dCB0aGUgcHJldmlvdXMgd2Fzbid0OiBhZGQgaXRzIGVudHJ5IHB0IGZpcnN0XG4gICAgICAgICAgICAgICAgdXBkYXRlRWRnZXNGb3JSZWVudHJ5KGdldEVkZ2VJbnRlcnNlY3Rpb25zKGxhc3RGYXJQdCwgcHQpWzBdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHRzW3B0aSsrXSA9IHB0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbG9vcCBvdmVyIEFMTCBwb2ludHMgaW4gdGhpcyB0cmFjZVxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNsdXN0ZXJTdGFydFB0ID0gZ2V0UHQoaSk7XG4gICAgICAgIGlmKCFjbHVzdGVyU3RhcnRQdCkgY29udGludWU7XG5cbiAgICAgICAgcHRpID0gMDtcbiAgICAgICAgbGFzdEZhclB0ID0gbnVsbDtcbiAgICAgICAgYWRkUHQoY2x1c3RlclN0YXJ0UHQpO1xuXG4gICAgICAgIC8vIGxvb3Agb3ZlciBvbmUgc2VnbWVudCBvZiB0aGUgdHJhY2VcbiAgICAgICAgZm9yKGkrKzsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjbHVzdGVySGlnaFB0ID0gZ2V0UHQoaSk7XG4gICAgICAgICAgICBpZighY2x1c3RlckhpZ2hQdCkge1xuICAgICAgICAgICAgICAgIGlmKGNvbm5lY3RHYXBzKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBlbHNlIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYW4ndCBkZWNpbWF0ZSBpZiBub25saW5lYXIgbGluZSBzaGFwZVxuICAgICAgICAgICAgLy8gVE9ETzogd2UgKmNvdWxkKiBkZWNpbWF0ZSBbaHZdezIsM30gc2hhcGVzIGlmIHdlIHJlc3RyaWN0ZWQgY2x1c3RlcnMgdG8gaG9yeiBvciB2ZXJ0IGFnYWluXG4gICAgICAgICAgICAvLyBidXQgc3BsaW5lIHdvdWxkIGJlIHZlcnJyeSBhd2t3YXJkIHRvIGRlY2ltYXRlXG4gICAgICAgICAgICBpZighbGluZWFyIHx8ICFvcHRzLnNpbXBsaWZ5KSB7XG4gICAgICAgICAgICAgICAgYWRkUHQoY2x1c3RlckhpZ2hQdCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuZXh0UHQgPSBnZXRQdChpICsgMSk7XG5cbiAgICAgICAgICAgIGNsdXN0ZXJSZWZEaXN0ID0gcHREaXN0KGNsdXN0ZXJIaWdoUHQsIGNsdXN0ZXJTdGFydFB0KTtcblxuICAgICAgICAgICAgLy8gIzMxNDcgLSBhbHdheXMgaW5jbHVkZSB0aGUgdmVyeSBmaXJzdCBhbmQgbGFzdCBwb2ludHMgZm9yIGZpbGxzXG4gICAgICAgICAgICBpZighKGZpbGwgJiYgKHB0aSA9PT0gMCB8fCBwdGkgPT09IGxlbiAtIDEpKSAmJlxuICAgICAgICAgICAgICAgIGNsdXN0ZXJSZWZEaXN0IDwgZ2V0VG9sZXJhbmNlKGNsdXN0ZXJIaWdoUHQsIG5leHRQdCkgKiBtaW5Ub2xlcmFuY2UpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjbHVzdGVyVW5pdFZlY3RvciA9IFtcbiAgICAgICAgICAgICAgICAoY2x1c3RlckhpZ2hQdFswXSAtIGNsdXN0ZXJTdGFydFB0WzBdKSAvIGNsdXN0ZXJSZWZEaXN0LFxuICAgICAgICAgICAgICAgIChjbHVzdGVySGlnaFB0WzFdIC0gY2x1c3RlclN0YXJ0UHRbMV0pIC8gY2x1c3RlclJlZkRpc3RcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGNsdXN0ZXJMb3dQdCA9IGNsdXN0ZXJTdGFydFB0O1xuICAgICAgICAgICAgY2x1c3RlckhpZ2hWYWwgPSBjbHVzdGVyUmVmRGlzdDtcbiAgICAgICAgICAgIGNsdXN0ZXJMb3dWYWwgPSBjbHVzdGVyTWluRGV2aWF0aW9uID0gY2x1c3Rlck1heERldmlhdGlvbiA9IDA7XG4gICAgICAgICAgICBjbHVzdGVySGlnaEZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICBjbHVzdGVyRW5kUHQgPSBjbHVzdGVySGlnaFB0O1xuXG4gICAgICAgICAgICAvLyBsb29wIG92ZXIgb25lIGNsdXN0ZXIgb2YgcG9pbnRzIHRoYXQgY29sbGFwc2Ugb250byBvbmUgbGluZVxuICAgICAgICAgICAgZm9yKGkrKzsgaSA8IGQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzUHQgPSBuZXh0UHQ7XG4gICAgICAgICAgICAgICAgbmV4dFB0ID0gZ2V0UHQoaSArIDEpO1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzUHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29ubmVjdEdhcHMpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzVmVjdG9yID0gW1xuICAgICAgICAgICAgICAgICAgICB0aGlzUHRbMF0gLSBjbHVzdGVyU3RhcnRQdFswXSxcbiAgICAgICAgICAgICAgICAgICAgdGhpc1B0WzFdIC0gY2x1c3RlclN0YXJ0UHRbMV1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIC8vIGNyb3NzIHByb2R1Y3QgKG9yIGRvdCB3aXRoIG5vcm1hbCB0byB0aGUgY2x1c3RlciB2ZWN0b3IpXG4gICAgICAgICAgICAgICAgdGhpc0RldmlhdGlvbiA9IHRoaXNWZWN0b3JbMF0gKiBjbHVzdGVyVW5pdFZlY3RvclsxXSAtIHRoaXNWZWN0b3JbMV0gKiBjbHVzdGVyVW5pdFZlY3RvclswXTtcbiAgICAgICAgICAgICAgICBjbHVzdGVyTWluRGV2aWF0aW9uID0gTWF0aC5taW4oY2x1c3Rlck1pbkRldmlhdGlvbiwgdGhpc0RldmlhdGlvbik7XG4gICAgICAgICAgICAgICAgY2x1c3Rlck1heERldmlhdGlvbiA9IE1hdGgubWF4KGNsdXN0ZXJNYXhEZXZpYXRpb24sIHRoaXNEZXZpYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgaWYoY2x1c3Rlck1heERldmlhdGlvbiAtIGNsdXN0ZXJNaW5EZXZpYXRpb24gPiBnZXRUb2xlcmFuY2UodGhpc1B0LCBuZXh0UHQpKSBicmVhaztcblxuICAgICAgICAgICAgICAgIGNsdXN0ZXJFbmRQdCA9IHRoaXNQdDtcbiAgICAgICAgICAgICAgICB0aGlzVmFsID0gdGhpc1ZlY3RvclswXSAqIGNsdXN0ZXJVbml0VmVjdG9yWzBdICsgdGhpc1ZlY3RvclsxXSAqIGNsdXN0ZXJVbml0VmVjdG9yWzFdO1xuXG4gICAgICAgICAgICAgICAgaWYodGhpc1ZhbCA+IGNsdXN0ZXJIaWdoVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJIaWdoVmFsID0gdGhpc1ZhbDtcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlckhpZ2hQdCA9IHRoaXNQdDtcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlckhpZ2hGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzVmFsIDwgY2x1c3Rlckxvd1ZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjbHVzdGVyTG93VmFsID0gdGhpc1ZhbDtcbiAgICAgICAgICAgICAgICAgICAgY2x1c3Rlckxvd1B0ID0gdGhpc1B0O1xuICAgICAgICAgICAgICAgICAgICBjbHVzdGVySGlnaEZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGluc2VydCB0aGlzIGNsdXN0ZXIgaW50byBwdHNcbiAgICAgICAgICAgIC8vIHdlJ3ZlIGFscmVhZHkgaW5zZXJ0ZWQgdGhlIHN0YXJ0IHB0LCBub3cgY2hlY2sgaWYgd2UgaGF2ZSBoaWdoIGFuZCBsb3cgcHRzXG4gICAgICAgICAgICBpZihjbHVzdGVySGlnaEZpcnN0KSB7XG4gICAgICAgICAgICAgICAgYWRkUHQoY2x1c3RlckhpZ2hQdCk7XG4gICAgICAgICAgICAgICAgaWYoY2x1c3RlckVuZFB0ICE9PSBjbHVzdGVyTG93UHQpIGFkZFB0KGNsdXN0ZXJMb3dQdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKGNsdXN0ZXJMb3dQdCAhPT0gY2x1c3RlclN0YXJ0UHQpIGFkZFB0KGNsdXN0ZXJMb3dQdCk7XG4gICAgICAgICAgICAgICAgaWYoY2x1c3RlckVuZFB0ICE9PSBjbHVzdGVySGlnaFB0KSBhZGRQdChjbHVzdGVySGlnaFB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFuZCBmaW5hbGx5IGluc2VydCB0aGUgZW5kIHB0XG4gICAgICAgICAgICBhZGRQdChjbHVzdGVyRW5kUHQpO1xuXG4gICAgICAgICAgICAvLyBoYXZlIHdlIHJlYWNoZWQgdGhlIGVuZCBvZiB0aGlzIHNlZ21lbnQ/XG4gICAgICAgICAgICBpZihpID49IGQubGVuZ3RoIHx8ICF0aGlzUHQpIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBvdGhlcndpc2Ugd2UgaGF2ZSBhbiBvdXQtb2YtY2x1c3RlciBwb2ludCB0byBpbnNlcnQgYXMgbmV4dCBjbHVzdGVyU3RhcnRQdFxuICAgICAgICAgICAgYWRkUHQodGhpc1B0KTtcbiAgICAgICAgICAgIGNsdXN0ZXJTdGFydFB0ID0gdGhpc1B0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG8gZ2V0IGZpbGxzIHJpZ2h0IC0gcmVwZWF0IHdoYXQgd2UgZGlkIGF0IHRoZSBzdGFydFxuICAgICAgICBpZihsYXN0RmFyUHQpIHVwZGF0ZUVkZ2UoW2xhc3RYRWRnZSB8fCBsYXN0RmFyUHRbMF0sIGxhc3RZRWRnZSB8fCBsYXN0RmFyUHRbMV1dKTtcblxuICAgICAgICBzZWdtZW50cy5wdXNoKHB0cy5zbGljZSgwLCBwdGkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxuZnVuY3Rpb24gc3R5bGUoZ2QpIHtcbiAgICB2YXIgcyA9IGQzLnNlbGVjdChnZCkuc2VsZWN0QWxsKCdnLnRyYWNlLnNjYXR0ZXInKTtcblxuICAgIHMuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkWzBdLnRyYWNlLm9wYWNpdHk7XG4gICAgfSk7XG5cbiAgICBzLnNlbGVjdEFsbCgnZy5wb2ludHMnKS5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIHRyYWNlID0gZC50cmFjZSB8fCBkWzBdLnRyYWNlO1xuICAgICAgICBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCk7XG4gICAgfSk7XG5cbiAgICBzLnNlbGVjdEFsbCgnZy50ZXh0JykuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciB0cmFjZSA9IGQudHJhY2UgfHwgZFswXS50cmFjZTtcbiAgICAgICAgc3R5bGVUZXh0KHNlbCwgdHJhY2UsIGdkKTtcbiAgICB9KTtcblxuICAgIHMuc2VsZWN0QWxsKCdnLnRyYWNlIHBhdGguanMtbGluZScpXG4gICAgICAgIC5jYWxsKERyYXdpbmcubGluZUdyb3VwU3R5bGUpO1xuXG4gICAgcy5zZWxlY3RBbGwoJ2cudHJhY2UgcGF0aC5qcy1maWxsJylcbiAgICAgICAgLmNhbGwoRHJhd2luZy5maWxsR3JvdXBTdHlsZSk7XG5cbiAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdzdHlsZScpKHMpO1xufVxuXG5mdW5jdGlvbiBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCkge1xuICAgIERyYXdpbmcucG9pbnRTdHlsZShzZWwuc2VsZWN0QWxsKCdwYXRoLnBvaW50JyksIHRyYWNlLCBnZCk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlVGV4dChzZWwsIHRyYWNlLCBnZCkge1xuICAgIERyYXdpbmcudGV4dFBvaW50U3R5bGUoc2VsLnNlbGVjdEFsbCgndGV4dCcpLCB0cmFjZSwgZ2QpO1xufVxuXG5mdW5jdGlvbiBzdHlsZU9uU2VsZWN0KGdkLCBjZCwgc2VsKSB7XG4gICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG5cbiAgICBpZih0cmFjZS5zZWxlY3RlZHBvaW50cykge1xuICAgICAgICBEcmF3aW5nLnNlbGVjdGVkUG9pbnRTdHlsZShzZWwuc2VsZWN0QWxsKCdwYXRoLnBvaW50JyksIHRyYWNlKTtcbiAgICAgICAgRHJhd2luZy5zZWxlY3RlZFRleHRTdHlsZShzZWwuc2VsZWN0QWxsKCd0ZXh0JyksIHRyYWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCk7XG4gICAgICAgIHN0eWxlVGV4dChzZWwsIHRyYWNlLCBnZCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHlsZTogc3R5bGUsXG4gICAgc3R5bGVQb2ludHM6IHN0eWxlUG9pbnRzLFxuICAgIHN0eWxlVGV4dDogc3R5bGVUZXh0LFxuICAgIHN0eWxlT25TZWxlY3Q6IHN0eWxlT25TZWxlY3Rcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9