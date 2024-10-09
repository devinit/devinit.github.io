(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_scatter_plot_js-node_modules_plotly_js_src_traces_s-85cd94"],{

/***/ "./node_modules/plotly.js/src/traces/scatter/link_traces.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/link_traces.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var LINKEDFILLS = {tonextx: 1, tonexty: 1, tonext: 1};

module.exports = function linkTraces(gd, plotinfo, cdscatter) {
    var trace, i, group, prevtrace, groupIndex;

    // first sort traces to keep stacks & filled-together groups together
    var groupIndices = {};
    var needsSort = false;
    var prevGroupIndex = -1;
    var nextGroupIndex = 0;
    var prevUnstackedGroupIndex = -1;
    for(i = 0; i < cdscatter.length; i++) {
        trace = cdscatter[i][0].trace;
        group = trace.stackgroup || '';
        if(group) {
            if(group in groupIndices) {
                groupIndex = groupIndices[group];
            } else {
                groupIndex = groupIndices[group] = nextGroupIndex;
                nextGroupIndex++;
            }
        } else if(trace.fill in LINKEDFILLS && prevUnstackedGroupIndex >= 0) {
            groupIndex = prevUnstackedGroupIndex;
        } else {
            groupIndex = prevUnstackedGroupIndex = nextGroupIndex;
            nextGroupIndex++;
        }

        if(groupIndex < prevGroupIndex) needsSort = true;
        trace._groupIndex = prevGroupIndex = groupIndex;
    }

    var cdscatterSorted = cdscatter.slice();
    if(needsSort) {
        cdscatterSorted.sort(function(a, b) {
            var traceA = a[0].trace;
            var traceB = b[0].trace;
            return (traceA._groupIndex - traceB._groupIndex) ||
                (traceA.index - traceB.index);
        });
    }

    // now link traces to each other
    var prevtraces = {};
    for(i = 0; i < cdscatterSorted.length; i++) {
        trace = cdscatterSorted[i][0].trace;
        group = trace.stackgroup || '';

        // Note: The check which ensures all cdscatter here are for the same axis and
        // are either cartesian or scatterternary has been removed. This code assumes
        // the passed scattertraces have been filtered to the proper plot types and
        // the proper subplots.
        if(trace.visible === true) {
            trace._nexttrace = null;

            if(trace.fill in LINKEDFILLS) {
                prevtrace = prevtraces[group];
                trace._prevtrace = prevtrace || null;

                if(prevtrace) {
                    prevtrace._nexttrace = trace;
                }
            }

            trace._ownfill = (trace.fill && (
                trace.fill.substr(0, 6) === 'tozero' ||
                trace.fill === 'toself' ||
                (trace.fill.substr(0, 2) === 'to' && !trace._prevtrace)
            ));

            prevtraces[group] = trace;
        } else {
            trace._prevtrace = trace._nexttrace = trace._ownfill = null;
        }
    }

    return cdscatterSorted;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/plot.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/plot.js ***!
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




var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var ensureSingle = Lib.ensureSingle;
var identity = Lib.identity;
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");

var subTypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var linePoints = __webpack_require__(/*! ./line_points */ "./node_modules/plotly.js/src/traces/scatter/line_points.js");
var linkTraces = __webpack_require__(/*! ./link_traces */ "./node_modules/plotly.js/src/traces/scatter/link_traces.js");
var polygonTester = __webpack_require__(/*! ../../lib/polygon */ "./node_modules/plotly.js/src/lib/polygon.js").tester;

module.exports = function plot(gd, plotinfo, cdscatter, scatterLayer, transitionOpts, makeOnCompleteCallback) {
    var join, onComplete;

    // If transition config is provided, then it is only a partial replot and traces not
    // updated are removed.
    var isFullReplot = !transitionOpts;
    var hasTransition = !!transitionOpts && transitionOpts.duration > 0;

    // Link traces so the z-order of fill layers is correct
    var cdscatterSorted = linkTraces(gd, plotinfo, cdscatter);

    join = scatterLayer.selectAll('g.trace')
        .data(cdscatterSorted, function(d) { return d[0].trace.uid; });

    // Append new traces:
    join.enter().append('g')
        .attr('class', function(d) {
            return 'trace scatter trace' + d[0].trace.uid;
        })
        .style('stroke-miterlimit', 2);
    join.order();

    createFills(gd, join, plotinfo);

    if(hasTransition) {
        if(makeOnCompleteCallback) {
            // If it was passed a callback to register completion, make a callback. If
            // this is created, then it must be executed on completion, otherwise the
            // pos-transition redraw will not execute:
            onComplete = makeOnCompleteCallback();
        }

        var transition = d3.transition()
            .duration(transitionOpts.duration)
            .ease(transitionOpts.easing)
            .each('end', function() {
                onComplete && onComplete();
            })
            .each('interrupt', function() {
                onComplete && onComplete();
            });

        transition.each(function() {
            // Must run the selection again since otherwise enters/updates get grouped together
            // and these get executed out of order. Except we need them in order!
            scatterLayer.selectAll('g.trace').each(function(d, i) {
                plotOne(gd, i, plotinfo, d, cdscatterSorted, this, transitionOpts);
            });
        });
    } else {
        join.each(function(d, i) {
            plotOne(gd, i, plotinfo, d, cdscatterSorted, this, transitionOpts);
        });
    }

    if(isFullReplot) {
        join.exit().remove();
    }

    // remove paths that didn't get used
    scatterLayer.selectAll('path:not([d])').remove();
};

function createFills(gd, traceJoin, plotinfo) {
    traceJoin.each(function(d) {
        var fills = ensureSingle(d3.select(this), 'g', 'fills');
        Drawing.setClipUrl(fills, plotinfo.layerClipId, gd);

        var trace = d[0].trace;

        var fillData = [];
        if(trace._ownfill) fillData.push('_ownFill');
        if(trace._nexttrace) fillData.push('_nextFill');

        var fillJoin = fills.selectAll('g').data(fillData, identity);

        fillJoin.enter().append('g');

        fillJoin.exit()
            .each(function(d) { trace[d] = null; })
            .remove();

        fillJoin.order().each(function(d) {
            // make a path element inside the fill group, just so
            // we can give it its own data later on and the group can
            // keep its simple '_*Fill' data
            trace[d] = ensureSingle(d3.select(this), 'path', 'js-fill');
        });
    });
}

function plotOne(gd, idx, plotinfo, cdscatter, cdscatterAll, element, transitionOpts) {
    var i;

    // Since this has been reorganized and we're executing this on individual traces,
    // we need to pass it the full list of cdscatter as well as this trace's index (idx)
    // since it does an internal n^2 loop over comparisons with other traces:
    selectMarkers(gd, idx, plotinfo, cdscatter, cdscatterAll);

    var hasTransition = !!transitionOpts && transitionOpts.duration > 0;

    function transition(selection) {
        return hasTransition ? selection.transition() : selection;
    }

    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    var trace = cdscatter[0].trace;
    var line = trace.line;
    var tr = d3.select(element);

    var errorBarGroup = ensureSingle(tr, 'g', 'errorbars');
    var lines = ensureSingle(tr, 'g', 'lines');
    var points = ensureSingle(tr, 'g', 'points');
    var text = ensureSingle(tr, 'g', 'text');

    // error bars are at the bottom
    Registry.getComponentMethod('errorbars', 'plot')(gd, errorBarGroup, plotinfo, transitionOpts);

    if(trace.visible !== true) return;

    transition(tr).style('opacity', trace.opacity);

    // BUILD LINES AND FILLS
    var ownFillEl3, tonext;
    var ownFillDir = trace.fill.charAt(trace.fill.length - 1);
    if(ownFillDir !== 'x' && ownFillDir !== 'y') ownFillDir = '';

    // store node for tweaking by selectPoints
    cdscatter[0][plotinfo.isRangePlot ? 'nodeRangePlot3' : 'node3'] = tr;

    var prevRevpath = '';
    var prevPolygons = [];
    var prevtrace = trace._prevtrace;

    if(prevtrace) {
        prevRevpath = prevtrace._prevRevpath || '';
        tonext = prevtrace._nextFill;
        prevPolygons = prevtrace._polygons;
    }

    var thispath;
    var thisrevpath;
    // fullpath is all paths for this curve, joined together straight
    // across gaps, for filling
    var fullpath = '';
    // revpath is fullpath reversed, for fill-to-next
    var revpath = '';
    // functions for converting a point array to a path
    var pathfn, revpathbase, revpathfn;
    // variables used before and after the data join
    var pt0, lastSegment, pt1, thisPolygons;

    // initialize line join data / method
    var segments = [];
    var makeUpdate = Lib.noop;

    ownFillEl3 = trace._ownFill;

    if(subTypes.hasLines(trace) || trace.fill !== 'none') {
        if(tonext) {
            // This tells .style which trace to use for fill information:
            tonext.datum(cdscatter);
        }

        if(['hv', 'vh', 'hvh', 'vhv'].indexOf(line.shape) !== -1) {
            pathfn = Drawing.steps(line.shape);
            revpathbase = Drawing.steps(
                line.shape.split('').reverse().join('')
            );
        } else if(line.shape === 'spline') {
            pathfn = revpathbase = function(pts) {
                var pLast = pts[pts.length - 1];
                if(pts.length > 1 && pts[0][0] === pLast[0] && pts[0][1] === pLast[1]) {
                    // identical start and end points: treat it as a
                    // closed curve so we don't get a kink
                    return Drawing.smoothclosed(pts.slice(1), line.smoothing);
                } else {
                    return Drawing.smoothopen(pts, line.smoothing);
                }
            };
        } else {
            pathfn = revpathbase = function(pts) {
                return 'M' + pts.join('L');
            };
        }

        revpathfn = function(pts) {
            // note: this is destructive (reverses pts in place) so can't use pts after this
            return revpathbase(pts.reverse());
        };

        segments = linePoints(cdscatter, {
            xaxis: xa,
            yaxis: ya,
            connectGaps: trace.connectgaps,
            baseTolerance: Math.max(line.width || 1, 3) / 4,
            shape: line.shape,
            simplify: line.simplify,
            fill: trace.fill
        });

        // since we already have the pixel segments here, use them to make
        // polygons for hover on fill
        // TODO: can we skip this if hoveron!=fills? That would mean we
        // need to redraw when you change hoveron...
        thisPolygons = trace._polygons = new Array(segments.length);
        for(i = 0; i < segments.length; i++) {
            trace._polygons[i] = polygonTester(segments[i]);
        }

        if(segments.length) {
            pt0 = segments[0][0];
            lastSegment = segments[segments.length - 1];
            pt1 = lastSegment[lastSegment.length - 1];
        }

        makeUpdate = function(isEnter) {
            return function(pts) {
                thispath = pathfn(pts);
                thisrevpath = revpathfn(pts);
                if(!fullpath) {
                    fullpath = thispath;
                    revpath = thisrevpath;
                } else if(ownFillDir) {
                    fullpath += 'L' + thispath.substr(1);
                    revpath = thisrevpath + ('L' + revpath.substr(1));
                } else {
                    fullpath += 'Z' + thispath;
                    revpath = thisrevpath + 'Z' + revpath;
                }

                if(subTypes.hasLines(trace) && pts.length > 1) {
                    var el = d3.select(this);

                    // This makes the coloring work correctly:
                    el.datum(cdscatter);

                    if(isEnter) {
                        transition(el.style('opacity', 0)
                            .attr('d', thispath)
                            .call(Drawing.lineGroupStyle))
                                .style('opacity', 1);
                    } else {
                        var sel = transition(el);
                        sel.attr('d', thispath);
                        Drawing.singleLineStyle(cdscatter, sel);
                    }
                }
            };
        };
    }

    var lineJoin = lines.selectAll('.js-line').data(segments);

    transition(lineJoin.exit())
        .style('opacity', 0)
        .remove();

    lineJoin.each(makeUpdate(false));

    lineJoin.enter().append('path')
        .classed('js-line', true)
        .style('vector-effect', 'non-scaling-stroke')
        .call(Drawing.lineGroupStyle)
        .each(makeUpdate(true));

    Drawing.setClipUrl(lineJoin, plotinfo.layerClipId, gd);

    function clearFill(selection) {
        transition(selection).attr('d', 'M0,0Z');
    }

    if(segments.length) {
        if(ownFillEl3) {
            ownFillEl3.datum(cdscatter);
            if(pt0 && pt1) {
                if(ownFillDir) {
                    if(ownFillDir === 'y') {
                        pt0[1] = pt1[1] = ya.c2p(0, true);
                    } else if(ownFillDir === 'x') {
                        pt0[0] = pt1[0] = xa.c2p(0, true);
                    }

                    // fill to zero: full trace path, plus extension of
                    // the endpoints to the appropriate axis
                    // For the sake of animations, wrap the points around so that
                    // the points on the axes are the first two points. Otherwise
                    // animations get a little crazy if the number of points changes.
                    transition(ownFillEl3).attr('d', 'M' + pt1 + 'L' + pt0 + 'L' + fullpath.substr(1))
                        .call(Drawing.singleFillStyle);
                } else {
                    // fill to self: just join the path to itself
                    transition(ownFillEl3).attr('d', fullpath + 'Z')
                        .call(Drawing.singleFillStyle);
                }
            }
        } else if(tonext) {
            if(trace.fill.substr(0, 6) === 'tonext' && fullpath && prevRevpath) {
                // fill to next: full trace path, plus the previous path reversed
                if(trace.fill === 'tonext') {
                    // tonext: for use by concentric shapes, like manually constructed
                    // contours, we just add the two paths closed on themselves.
                    // This makes strange results if one path is *not* entirely
                    // inside the other, but then that is a strange usage.
                    transition(tonext).attr('d', fullpath + 'Z' + prevRevpath + 'Z')
                        .call(Drawing.singleFillStyle);
                } else {
                    // tonextx/y: for now just connect endpoints with lines. This is
                    // the correct behavior if the endpoints are at the same value of
                    // y/x, but if they *aren't*, we should ideally do more complicated
                    // things depending on whether the new endpoint projects onto the
                    // existing curve or off the end of it
                    transition(tonext).attr('d', fullpath + 'L' + prevRevpath.substr(1) + 'Z')
                        .call(Drawing.singleFillStyle);
                }
                trace._polygons = trace._polygons.concat(prevPolygons);
            } else {
                clearFill(tonext);
                trace._polygons = null;
            }
        }
        trace._prevRevpath = revpath;
        trace._prevPolygons = thisPolygons;
    } else {
        if(ownFillEl3) clearFill(ownFillEl3);
        else if(tonext) clearFill(tonext);
        trace._polygons = trace._prevRevpath = trace._prevPolygons = null;
    }


    function visFilter(d) {
        return d.filter(function(v) { return !v.gap && v.vis; });
    }

    function visFilterWithGaps(d) {
        return d.filter(function(v) { return v.vis; });
    }

    function gapFilter(d) {
        return d.filter(function(v) { return !v.gap; });
    }

    function keyFunc(d) {
        return d.id;
    }

    // Returns a function if the trace is keyed, otherwise returns undefined
    function getKeyFunc(trace) {
        if(trace.ids) {
            return keyFunc;
        }
    }

    function hideFilter() {
        return false;
    }

    function makePoints(points, text, cdscatter) {
        var join, selection, hasNode;

        var trace = cdscatter[0].trace;
        var showMarkers = subTypes.hasMarkers(trace);
        var showText = subTypes.hasText(trace);

        var keyFunc = getKeyFunc(trace);
        var markerFilter = hideFilter;
        var textFilter = hideFilter;

        if(showMarkers || showText) {
            var showFilter = identity;
            // if we're stacking, "infer zero" gap mode gets markers in the
            // gap points - because we've inferred a zero there - but other
            // modes (currently "interpolate", later "interrupt" hopefully)
            // we don't draw generated markers
            var stackGroup = trace.stackgroup;
            var isInferZero = stackGroup && (
                gd._fullLayout._scatterStackOpts[xa._id + ya._id][stackGroup].stackgaps === 'infer zero');
            if(trace.marker.maxdisplayed || trace._needsCull) {
                showFilter = isInferZero ? visFilterWithGaps : visFilter;
            } else if(stackGroup && !isInferZero) {
                showFilter = gapFilter;
            }

            if(showMarkers) markerFilter = showFilter;
            if(showText) textFilter = showFilter;
        }

        // marker points

        selection = points.selectAll('path.point');

        join = selection.data(markerFilter, keyFunc);

        var enter = join.enter().append('path')
            .classed('point', true);

        if(hasTransition) {
            enter
                .call(Drawing.pointStyle, trace, gd)
                .call(Drawing.translatePoints, xa, ya)
                .style('opacity', 0)
                .transition()
                .style('opacity', 1);
        }

        join.order();

        var styleFns;
        if(showMarkers) {
            styleFns = Drawing.makePointStyleFns(trace);
        }

        join.each(function(d) {
            var el = d3.select(this);
            var sel = transition(el);
            hasNode = Drawing.translatePoint(d, sel, xa, ya);

            if(hasNode) {
                Drawing.singlePointStyle(d, sel, trace, styleFns, gd);

                if(plotinfo.layerClipId) {
                    Drawing.hideOutsideRangePoint(d, sel, xa, ya, trace.xcalendar, trace.ycalendar);
                }

                if(trace.customdata) {
                    el.classed('plotly-customdata', d.data !== null && d.data !== undefined);
                }
            } else {
                sel.remove();
            }
        });

        if(hasTransition) {
            join.exit().transition()
                .style('opacity', 0)
                .remove();
        } else {
            join.exit().remove();
        }

        // text points
        selection = text.selectAll('g');
        join = selection.data(textFilter, keyFunc);

        // each text needs to go in its own 'g' in case
        // it gets converted to mathjax
        join.enter().append('g').classed('textpoint', true).append('text');

        join.order();

        join.each(function(d) {
            var g = d3.select(this);
            var sel = transition(g.select('text'));
            hasNode = Drawing.translatePoint(d, sel, xa, ya);

            if(hasNode) {
                if(plotinfo.layerClipId) {
                    Drawing.hideOutsideRangePoint(d, g, xa, ya, trace.xcalendar, trace.ycalendar);
                }
            } else {
                g.remove();
            }
        });

        join.selectAll('text')
            .call(Drawing.textPointStyle, trace, gd)
            .each(function(d) {
                // This just *has* to be totally custom becuase of SVG text positioning :(
                // It's obviously copied from translatePoint; we just can't use that
                var x = xa.c2p(d.x);
                var y = ya.c2p(d.y);

                d3.select(this).selectAll('tspan.line').each(function() {
                    transition(d3.select(this)).attr({x: x, y: y});
                });
            });

        join.exit().remove();
    }

    points.datum(cdscatter);
    text.datum(cdscatter);
    makePoints(points, text, cdscatter);

    // lastly, clip points groups of `cliponaxis !== false` traces
    // on `plotinfo._hasClipOnAxisFalse === true` subplots
    var hasClipOnAxisFalse = trace.cliponaxis === false;
    var clipUrl = hasClipOnAxisFalse ? null : plotinfo.layerClipId;
    Drawing.setClipUrl(points, clipUrl, gd);
    Drawing.setClipUrl(text, clipUrl, gd);
}

function selectMarkers(gd, idx, plotinfo, cdscatter, cdscatterAll) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;
    var xr = d3.extent(Lib.simpleMap(xa.range, xa.r2c));
    var yr = d3.extent(Lib.simpleMap(ya.range, ya.r2c));

    var trace = cdscatter[0].trace;
    if(!subTypes.hasMarkers(trace)) return;
    // if marker.maxdisplayed is used, select a maximum of
    // mnum markers to show, from the set that are in the viewport
    var mnum = trace.marker.maxdisplayed;

    // TODO: remove some as we get away from the viewport?
    if(mnum === 0) return;

    var cd = cdscatter.filter(function(v) {
        return v.x >= xr[0] && v.x <= xr[1] && v.y >= yr[0] && v.y <= yr[1];
    });
    var inc = Math.ceil(cd.length / mnum);
    var tnum = 0;
    cdscatterAll.forEach(function(cdj, j) {
        var tracei = cdj[0].trace;
        if(subTypes.hasMarkers(tracei) &&
                tracei.marker.maxdisplayed > 0 && j < idx) {
            tnum++;
        }
    });

    // if multiple traces use maxdisplayed, stagger which markers we
    // display this formula offsets successive traces by 1/3 of the
    // increment, adding an extra small amount after each triplet so
    // it's not quite periodic
    var i0 = Math.round(tnum * inc / 3 + Math.floor(tnum / 3) * inc / 7.1);

    // for error bars: save in cd which markers to show
    // so we don't have to repeat this
    cdscatter.forEach(function(v) { delete v.vis; });
    cd.forEach(function(v, i) {
        if(Math.round((i + i0) % inc) === 0) v.vis = true;
    });
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/select.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/select.js ***!
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




var subtypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");

module.exports = function selectPoints(searchInfo, selectionTester) {
    var cd = searchInfo.cd;
    var xa = searchInfo.xaxis;
    var ya = searchInfo.yaxis;
    var selection = [];
    var trace = cd[0].trace;
    var i;
    var di;
    var x;
    var y;

    var hasOnlyLines = (!subtypes.hasMarkers(trace) && !subtypes.hasText(trace));
    if(hasOnlyLines) return [];

    if(selectionTester === false) { // clear selection
        for(i = 0; i < cd.length; i++) {
            cd[i].selected = 0;
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            di = cd[i];
            x = xa.c2p(di.x);
            y = ya.c2p(di.y);

            if((di.i !== null) && selectionTester.contains([x, y], false, i, searchInfo)) {
                selection.push({
                    pointNumber: di.i,
                    x: xa.c2d(di.x),
                    y: ya.c2d(di.y)
                });
                di.selected = 1;
            } else {
                di.selected = 0;
            }
        }
    }

    return selection;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbGlua190cmFjZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL3Bsb3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL3NlbGVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixtQkFBbUI7O0FBRW5CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxzQkFBc0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsY0FBYyw0QkFBNEI7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLG1DQUFJOztBQUVyQixlQUFlLG1CQUFPLENBQUMsZ0VBQWdCO0FBQ3ZDLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QjtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLDBGQUEwQjs7QUFFaEQsZUFBZSxtQkFBTyxDQUFDLDJFQUFZO0FBQ25DLGlCQUFpQixtQkFBTyxDQUFDLGlGQUFlO0FBQ3hDLGlCQUFpQixtQkFBTyxDQUFDLGlGQUFlO0FBQ3hDLG9CQUFvQixrR0FBbUM7O0FBRXZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRDQUE0Qyx1QkFBdUIsRUFBRTs7QUFFckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsK0JBQStCLGlCQUFpQixFQUFFO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLHFDQUFxQyx3QkFBd0IsRUFBRTtBQUMvRDs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjLEVBQUU7QUFDckQ7O0FBRUE7QUFDQSxxQ0FBcUMsZUFBZSxFQUFFO0FBQ3REOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7O0FBRUE7QUFDQSxzREFBc0QsV0FBVztBQUNqRSxpQkFBaUI7QUFDakIsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxjQUFjLEVBQUU7QUFDbkQ7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7O0FDOWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLDJFQUFZOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1DQUFtQztBQUNuQyxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMLGtCQUFrQixlQUFlO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoiY2hhcnRlYjM0MDVkMzI2NDlmOWExZDBhYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExJTktFREZJTExTID0ge3RvbmV4dHg6IDEsIHRvbmV4dHk6IDEsIHRvbmV4dDogMX07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlua1RyYWNlcyhnZCwgcGxvdGluZm8sIGNkc2NhdHRlcikge1xuICAgIHZhciB0cmFjZSwgaSwgZ3JvdXAsIHByZXZ0cmFjZSwgZ3JvdXBJbmRleDtcblxuICAgIC8vIGZpcnN0IHNvcnQgdHJhY2VzIHRvIGtlZXAgc3RhY2tzICYgZmlsbGVkLXRvZ2V0aGVyIGdyb3VwcyB0b2dldGhlclxuICAgIHZhciBncm91cEluZGljZXMgPSB7fTtcbiAgICB2YXIgbmVlZHNTb3J0ID0gZmFsc2U7XG4gICAgdmFyIHByZXZHcm91cEluZGV4ID0gLTE7XG4gICAgdmFyIG5leHRHcm91cEluZGV4ID0gMDtcbiAgICB2YXIgcHJldlVuc3RhY2tlZEdyb3VwSW5kZXggPSAtMTtcbiAgICBmb3IoaSA9IDA7IGkgPCBjZHNjYXR0ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJhY2UgPSBjZHNjYXR0ZXJbaV1bMF0udHJhY2U7XG4gICAgICAgIGdyb3VwID0gdHJhY2Uuc3RhY2tncm91cCB8fCAnJztcbiAgICAgICAgaWYoZ3JvdXApIHtcbiAgICAgICAgICAgIGlmKGdyb3VwIGluIGdyb3VwSW5kaWNlcykge1xuICAgICAgICAgICAgICAgIGdyb3VwSW5kZXggPSBncm91cEluZGljZXNbZ3JvdXBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBncm91cEluZGV4ID0gZ3JvdXBJbmRpY2VzW2dyb3VwXSA9IG5leHRHcm91cEluZGV4O1xuICAgICAgICAgICAgICAgIG5leHRHcm91cEluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZih0cmFjZS5maWxsIGluIExJTktFREZJTExTICYmIHByZXZVbnN0YWNrZWRHcm91cEluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGdyb3VwSW5kZXggPSBwcmV2VW5zdGFja2VkR3JvdXBJbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwSW5kZXggPSBwcmV2VW5zdGFja2VkR3JvdXBJbmRleCA9IG5leHRHcm91cEluZGV4O1xuICAgICAgICAgICAgbmV4dEdyb3VwSW5kZXgrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGdyb3VwSW5kZXggPCBwcmV2R3JvdXBJbmRleCkgbmVlZHNTb3J0ID0gdHJ1ZTtcbiAgICAgICAgdHJhY2UuX2dyb3VwSW5kZXggPSBwcmV2R3JvdXBJbmRleCA9IGdyb3VwSW5kZXg7XG4gICAgfVxuXG4gICAgdmFyIGNkc2NhdHRlclNvcnRlZCA9IGNkc2NhdHRlci5zbGljZSgpO1xuICAgIGlmKG5lZWRzU29ydCkge1xuICAgICAgICBjZHNjYXR0ZXJTb3J0ZWQuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2VBID0gYVswXS50cmFjZTtcbiAgICAgICAgICAgIHZhciB0cmFjZUIgPSBiWzBdLnRyYWNlO1xuICAgICAgICAgICAgcmV0dXJuICh0cmFjZUEuX2dyb3VwSW5kZXggLSB0cmFjZUIuX2dyb3VwSW5kZXgpIHx8XG4gICAgICAgICAgICAgICAgKHRyYWNlQS5pbmRleCAtIHRyYWNlQi5pbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIG5vdyBsaW5rIHRyYWNlcyB0byBlYWNoIG90aGVyXG4gICAgdmFyIHByZXZ0cmFjZXMgPSB7fTtcbiAgICBmb3IoaSA9IDA7IGkgPCBjZHNjYXR0ZXJTb3J0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJhY2UgPSBjZHNjYXR0ZXJTb3J0ZWRbaV1bMF0udHJhY2U7XG4gICAgICAgIGdyb3VwID0gdHJhY2Uuc3RhY2tncm91cCB8fCAnJztcblxuICAgICAgICAvLyBOb3RlOiBUaGUgY2hlY2sgd2hpY2ggZW5zdXJlcyBhbGwgY2RzY2F0dGVyIGhlcmUgYXJlIGZvciB0aGUgc2FtZSBheGlzIGFuZFxuICAgICAgICAvLyBhcmUgZWl0aGVyIGNhcnRlc2lhbiBvciBzY2F0dGVydGVybmFyeSBoYXMgYmVlbiByZW1vdmVkLiBUaGlzIGNvZGUgYXNzdW1lc1xuICAgICAgICAvLyB0aGUgcGFzc2VkIHNjYXR0ZXJ0cmFjZXMgaGF2ZSBiZWVuIGZpbHRlcmVkIHRvIHRoZSBwcm9wZXIgcGxvdCB0eXBlcyBhbmRcbiAgICAgICAgLy8gdGhlIHByb3BlciBzdWJwbG90cy5cbiAgICAgICAgaWYodHJhY2UudmlzaWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdHJhY2UuX25leHR0cmFjZSA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlLmZpbGwgaW4gTElOS0VERklMTFMpIHtcbiAgICAgICAgICAgICAgICBwcmV2dHJhY2UgPSBwcmV2dHJhY2VzW2dyb3VwXTtcbiAgICAgICAgICAgICAgICB0cmFjZS5fcHJldnRyYWNlID0gcHJldnRyYWNlIHx8IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZihwcmV2dHJhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldnRyYWNlLl9uZXh0dHJhY2UgPSB0cmFjZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyYWNlLl9vd25maWxsID0gKHRyYWNlLmZpbGwgJiYgKFxuICAgICAgICAgICAgICAgIHRyYWNlLmZpbGwuc3Vic3RyKDAsIDYpID09PSAndG96ZXJvJyB8fFxuICAgICAgICAgICAgICAgIHRyYWNlLmZpbGwgPT09ICd0b3NlbGYnIHx8XG4gICAgICAgICAgICAgICAgKHRyYWNlLmZpbGwuc3Vic3RyKDAsIDIpID09PSAndG8nICYmICF0cmFjZS5fcHJldnRyYWNlKVxuICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgICAgIHByZXZ0cmFjZXNbZ3JvdXBdID0gdHJhY2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFjZS5fcHJldnRyYWNlID0gdHJhY2UuX25leHR0cmFjZSA9IHRyYWNlLl9vd25maWxsID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjZHNjYXR0ZXJTb3J0ZWQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgZW5zdXJlU2luZ2xlID0gTGliLmVuc3VyZVNpbmdsZTtcbnZhciBpZGVudGl0eSA9IExpYi5pZGVudGl0eTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG5cbnZhciBzdWJUeXBlcyA9IHJlcXVpcmUoJy4vc3VidHlwZXMnKTtcbnZhciBsaW5lUG9pbnRzID0gcmVxdWlyZSgnLi9saW5lX3BvaW50cycpO1xudmFyIGxpbmtUcmFjZXMgPSByZXF1aXJlKCcuL2xpbmtfdHJhY2VzJyk7XG52YXIgcG9seWdvblRlc3RlciA9IHJlcXVpcmUoJy4uLy4uL2xpYi9wb2x5Z29uJykudGVzdGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ2QsIHBsb3RpbmZvLCBjZHNjYXR0ZXIsIHNjYXR0ZXJMYXllciwgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICB2YXIgam9pbiwgb25Db21wbGV0ZTtcblxuICAgIC8vIElmIHRyYW5zaXRpb24gY29uZmlnIGlzIHByb3ZpZGVkLCB0aGVuIGl0IGlzIG9ubHkgYSBwYXJ0aWFsIHJlcGxvdCBhbmQgdHJhY2VzIG5vdFxuICAgIC8vIHVwZGF0ZWQgYXJlIHJlbW92ZWQuXG4gICAgdmFyIGlzRnVsbFJlcGxvdCA9ICF0cmFuc2l0aW9uT3B0cztcbiAgICB2YXIgaGFzVHJhbnNpdGlvbiA9ICEhdHJhbnNpdGlvbk9wdHMgJiYgdHJhbnNpdGlvbk9wdHMuZHVyYXRpb24gPiAwO1xuXG4gICAgLy8gTGluayB0cmFjZXMgc28gdGhlIHotb3JkZXIgb2YgZmlsbCBsYXllcnMgaXMgY29ycmVjdFxuICAgIHZhciBjZHNjYXR0ZXJTb3J0ZWQgPSBsaW5rVHJhY2VzKGdkLCBwbG90aW5mbywgY2RzY2F0dGVyKTtcblxuICAgIGpvaW4gPSBzY2F0dGVyTGF5ZXIuc2VsZWN0QWxsKCdnLnRyYWNlJylcbiAgICAgICAgLmRhdGEoY2RzY2F0dGVyU29ydGVkLCBmdW5jdGlvbihkKSB7IHJldHVybiBkWzBdLnRyYWNlLnVpZDsgfSk7XG5cbiAgICAvLyBBcHBlbmQgbmV3IHRyYWNlczpcbiAgICBqb2luLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuICd0cmFjZSBzY2F0dGVyIHRyYWNlJyArIGRbMF0udHJhY2UudWlkO1xuICAgICAgICB9KVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZS1taXRlcmxpbWl0JywgMik7XG4gICAgam9pbi5vcmRlcigpO1xuXG4gICAgY3JlYXRlRmlsbHMoZ2QsIGpvaW4sIHBsb3RpbmZvKTtcblxuICAgIGlmKGhhc1RyYW5zaXRpb24pIHtcbiAgICAgICAgaWYobWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gSWYgaXQgd2FzIHBhc3NlZCBhIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGNvbXBsZXRpb24sIG1ha2UgYSBjYWxsYmFjay4gSWZcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgY3JlYXRlZCwgdGhlbiBpdCBtdXN0IGJlIGV4ZWN1dGVkIG9uIGNvbXBsZXRpb24sIG90aGVyd2lzZSB0aGVcbiAgICAgICAgICAgIC8vIHBvcy10cmFuc2l0aW9uIHJlZHJhdyB3aWxsIG5vdCBleGVjdXRlOlxuICAgICAgICAgICAgb25Db21wbGV0ZSA9IG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0cmFuc2l0aW9uID0gZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24odHJhbnNpdGlvbk9wdHMuZHVyYXRpb24pXG4gICAgICAgICAgICAuZWFzZSh0cmFuc2l0aW9uT3B0cy5lYXNpbmcpXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goJ2ludGVycnVwdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdHJhbnNpdGlvbi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gTXVzdCBydW4gdGhlIHNlbGVjdGlvbiBhZ2FpbiBzaW5jZSBvdGhlcndpc2UgZW50ZXJzL3VwZGF0ZXMgZ2V0IGdyb3VwZWQgdG9nZXRoZXJcbiAgICAgICAgICAgIC8vIGFuZCB0aGVzZSBnZXQgZXhlY3V0ZWQgb3V0IG9mIG9yZGVyLiBFeGNlcHQgd2UgbmVlZCB0aGVtIGluIG9yZGVyIVxuICAgICAgICAgICAgc2NhdHRlckxheWVyLnNlbGVjdEFsbCgnZy50cmFjZScpLmVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIHBsb3RPbmUoZ2QsIGksIHBsb3RpbmZvLCBkLCBjZHNjYXR0ZXJTb3J0ZWQsIHRoaXMsIHRyYW5zaXRpb25PcHRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBqb2luLmVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgcGxvdE9uZShnZCwgaSwgcGxvdGluZm8sIGQsIGNkc2NhdHRlclNvcnRlZCwgdGhpcywgdHJhbnNpdGlvbk9wdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZihpc0Z1bGxSZXBsb3QpIHtcbiAgICAgICAgam9pbi5leGl0KCkucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIHBhdGhzIHRoYXQgZGlkbid0IGdldCB1c2VkXG4gICAgc2NhdHRlckxheWVyLnNlbGVjdEFsbCgncGF0aDpub3QoW2RdKScpLnJlbW92ZSgpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlRmlsbHMoZ2QsIHRyYWNlSm9pbiwgcGxvdGluZm8pIHtcbiAgICB0cmFjZUpvaW4uZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBmaWxscyA9IGVuc3VyZVNpbmdsZShkMy5zZWxlY3QodGhpcyksICdnJywgJ2ZpbGxzJyk7XG4gICAgICAgIERyYXdpbmcuc2V0Q2xpcFVybChmaWxscywgcGxvdGluZm8ubGF5ZXJDbGlwSWQsIGdkKTtcblxuICAgICAgICB2YXIgdHJhY2UgPSBkWzBdLnRyYWNlO1xuXG4gICAgICAgIHZhciBmaWxsRGF0YSA9IFtdO1xuICAgICAgICBpZih0cmFjZS5fb3duZmlsbCkgZmlsbERhdGEucHVzaCgnX293bkZpbGwnKTtcbiAgICAgICAgaWYodHJhY2UuX25leHR0cmFjZSkgZmlsbERhdGEucHVzaCgnX25leHRGaWxsJyk7XG5cbiAgICAgICAgdmFyIGZpbGxKb2luID0gZmlsbHMuc2VsZWN0QWxsKCdnJykuZGF0YShmaWxsRGF0YSwgaWRlbnRpdHkpO1xuXG4gICAgICAgIGZpbGxKb2luLmVudGVyKCkuYXBwZW5kKCdnJyk7XG5cbiAgICAgICAgZmlsbEpvaW4uZXhpdCgpXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbihkKSB7IHRyYWNlW2RdID0gbnVsbDsgfSlcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcblxuICAgICAgICBmaWxsSm9pbi5vcmRlcigpLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgLy8gbWFrZSBhIHBhdGggZWxlbWVudCBpbnNpZGUgdGhlIGZpbGwgZ3JvdXAsIGp1c3Qgc29cbiAgICAgICAgICAgIC8vIHdlIGNhbiBnaXZlIGl0IGl0cyBvd24gZGF0YSBsYXRlciBvbiBhbmQgdGhlIGdyb3VwIGNhblxuICAgICAgICAgICAgLy8ga2VlcCBpdHMgc2ltcGxlICdfKkZpbGwnIGRhdGFcbiAgICAgICAgICAgIHRyYWNlW2RdID0gZW5zdXJlU2luZ2xlKGQzLnNlbGVjdCh0aGlzKSwgJ3BhdGgnLCAnanMtZmlsbCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcGxvdE9uZShnZCwgaWR4LCBwbG90aW5mbywgY2RzY2F0dGVyLCBjZHNjYXR0ZXJBbGwsIGVsZW1lbnQsIHRyYW5zaXRpb25PcHRzKSB7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBTaW5jZSB0aGlzIGhhcyBiZWVuIHJlb3JnYW5pemVkIGFuZCB3ZSdyZSBleGVjdXRpbmcgdGhpcyBvbiBpbmRpdmlkdWFsIHRyYWNlcyxcbiAgICAvLyB3ZSBuZWVkIHRvIHBhc3MgaXQgdGhlIGZ1bGwgbGlzdCBvZiBjZHNjYXR0ZXIgYXMgd2VsbCBhcyB0aGlzIHRyYWNlJ3MgaW5kZXggKGlkeClcbiAgICAvLyBzaW5jZSBpdCBkb2VzIGFuIGludGVybmFsIG5eMiBsb29wIG92ZXIgY29tcGFyaXNvbnMgd2l0aCBvdGhlciB0cmFjZXM6XG4gICAgc2VsZWN0TWFya2VycyhnZCwgaWR4LCBwbG90aW5mbywgY2RzY2F0dGVyLCBjZHNjYXR0ZXJBbGwpO1xuXG4gICAgdmFyIGhhc1RyYW5zaXRpb24gPSAhIXRyYW5zaXRpb25PcHRzICYmIHRyYW5zaXRpb25PcHRzLmR1cmF0aW9uID4gMDtcblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBoYXNUcmFuc2l0aW9uID8gc2VsZWN0aW9uLnRyYW5zaXRpb24oKSA6IHNlbGVjdGlvbjtcbiAgICB9XG5cbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcblxuICAgIHZhciB0cmFjZSA9IGNkc2NhdHRlclswXS50cmFjZTtcbiAgICB2YXIgbGluZSA9IHRyYWNlLmxpbmU7XG4gICAgdmFyIHRyID0gZDMuc2VsZWN0KGVsZW1lbnQpO1xuXG4gICAgdmFyIGVycm9yQmFyR3JvdXAgPSBlbnN1cmVTaW5nbGUodHIsICdnJywgJ2Vycm9yYmFycycpO1xuICAgIHZhciBsaW5lcyA9IGVuc3VyZVNpbmdsZSh0ciwgJ2cnLCAnbGluZXMnKTtcbiAgICB2YXIgcG9pbnRzID0gZW5zdXJlU2luZ2xlKHRyLCAnZycsICdwb2ludHMnKTtcbiAgICB2YXIgdGV4dCA9IGVuc3VyZVNpbmdsZSh0ciwgJ2cnLCAndGV4dCcpO1xuXG4gICAgLy8gZXJyb3IgYmFycyBhcmUgYXQgdGhlIGJvdHRvbVxuICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnZXJyb3JiYXJzJywgJ3Bsb3QnKShnZCwgZXJyb3JCYXJHcm91cCwgcGxvdGluZm8sIHRyYW5zaXRpb25PcHRzKTtcblxuICAgIGlmKHRyYWNlLnZpc2libGUgIT09IHRydWUpIHJldHVybjtcblxuICAgIHRyYW5zaXRpb24odHIpLnN0eWxlKCdvcGFjaXR5JywgdHJhY2Uub3BhY2l0eSk7XG5cbiAgICAvLyBCVUlMRCBMSU5FUyBBTkQgRklMTFNcbiAgICB2YXIgb3duRmlsbEVsMywgdG9uZXh0O1xuICAgIHZhciBvd25GaWxsRGlyID0gdHJhY2UuZmlsbC5jaGFyQXQodHJhY2UuZmlsbC5sZW5ndGggLSAxKTtcbiAgICBpZihvd25GaWxsRGlyICE9PSAneCcgJiYgb3duRmlsbERpciAhPT0gJ3knKSBvd25GaWxsRGlyID0gJyc7XG5cbiAgICAvLyBzdG9yZSBub2RlIGZvciB0d2Vha2luZyBieSBzZWxlY3RQb2ludHNcbiAgICBjZHNjYXR0ZXJbMF1bcGxvdGluZm8uaXNSYW5nZVBsb3QgPyAnbm9kZVJhbmdlUGxvdDMnIDogJ25vZGUzJ10gPSB0cjtcblxuICAgIHZhciBwcmV2UmV2cGF0aCA9ICcnO1xuICAgIHZhciBwcmV2UG9seWdvbnMgPSBbXTtcbiAgICB2YXIgcHJldnRyYWNlID0gdHJhY2UuX3ByZXZ0cmFjZTtcblxuICAgIGlmKHByZXZ0cmFjZSkge1xuICAgICAgICBwcmV2UmV2cGF0aCA9IHByZXZ0cmFjZS5fcHJldlJldnBhdGggfHwgJyc7XG4gICAgICAgIHRvbmV4dCA9IHByZXZ0cmFjZS5fbmV4dEZpbGw7XG4gICAgICAgIHByZXZQb2x5Z29ucyA9IHByZXZ0cmFjZS5fcG9seWdvbnM7XG4gICAgfVxuXG4gICAgdmFyIHRoaXNwYXRoO1xuICAgIHZhciB0aGlzcmV2cGF0aDtcbiAgICAvLyBmdWxscGF0aCBpcyBhbGwgcGF0aHMgZm9yIHRoaXMgY3VydmUsIGpvaW5lZCB0b2dldGhlciBzdHJhaWdodFxuICAgIC8vIGFjcm9zcyBnYXBzLCBmb3IgZmlsbGluZ1xuICAgIHZhciBmdWxscGF0aCA9ICcnO1xuICAgIC8vIHJldnBhdGggaXMgZnVsbHBhdGggcmV2ZXJzZWQsIGZvciBmaWxsLXRvLW5leHRcbiAgICB2YXIgcmV2cGF0aCA9ICcnO1xuICAgIC8vIGZ1bmN0aW9ucyBmb3IgY29udmVydGluZyBhIHBvaW50IGFycmF5IHRvIGEgcGF0aFxuICAgIHZhciBwYXRoZm4sIHJldnBhdGhiYXNlLCByZXZwYXRoZm47XG4gICAgLy8gdmFyaWFibGVzIHVzZWQgYmVmb3JlIGFuZCBhZnRlciB0aGUgZGF0YSBqb2luXG4gICAgdmFyIHB0MCwgbGFzdFNlZ21lbnQsIHB0MSwgdGhpc1BvbHlnb25zO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBsaW5lIGpvaW4gZGF0YSAvIG1ldGhvZFxuICAgIHZhciBzZWdtZW50cyA9IFtdO1xuICAgIHZhciBtYWtlVXBkYXRlID0gTGliLm5vb3A7XG5cbiAgICBvd25GaWxsRWwzID0gdHJhY2UuX293bkZpbGw7XG5cbiAgICBpZihzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZSkgfHwgdHJhY2UuZmlsbCAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGlmKHRvbmV4dCkge1xuICAgICAgICAgICAgLy8gVGhpcyB0ZWxscyAuc3R5bGUgd2hpY2ggdHJhY2UgdG8gdXNlIGZvciBmaWxsIGluZm9ybWF0aW9uOlxuICAgICAgICAgICAgdG9uZXh0LmRhdHVtKGNkc2NhdHRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZihbJ2h2JywgJ3ZoJywgJ2h2aCcsICd2aHYnXS5pbmRleE9mKGxpbmUuc2hhcGUpICE9PSAtMSkge1xuICAgICAgICAgICAgcGF0aGZuID0gRHJhd2luZy5zdGVwcyhsaW5lLnNoYXBlKTtcbiAgICAgICAgICAgIHJldnBhdGhiYXNlID0gRHJhd2luZy5zdGVwcyhcbiAgICAgICAgICAgICAgICBsaW5lLnNoYXBlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZihsaW5lLnNoYXBlID09PSAnc3BsaW5lJykge1xuICAgICAgICAgICAgcGF0aGZuID0gcmV2cGF0aGJhc2UgPSBmdW5jdGlvbihwdHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcExhc3QgPSBwdHNbcHRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmKHB0cy5sZW5ndGggPiAxICYmIHB0c1swXVswXSA9PT0gcExhc3RbMF0gJiYgcHRzWzBdWzFdID09PSBwTGFzdFsxXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZGVudGljYWwgc3RhcnQgYW5kIGVuZCBwb2ludHM6IHRyZWF0IGl0IGFzIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2VkIGN1cnZlIHNvIHdlIGRvbid0IGdldCBhIGtpbmtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERyYXdpbmcuc21vb3RoY2xvc2VkKHB0cy5zbGljZSgxKSwgbGluZS5zbW9vdGhpbmcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBEcmF3aW5nLnNtb290aG9wZW4ocHRzLCBsaW5lLnNtb290aGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGhmbiA9IHJldnBhdGhiYXNlID0gZnVuY3Rpb24ocHRzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdNJyArIHB0cy5qb2luKCdMJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV2cGF0aGZuID0gZnVuY3Rpb24ocHRzKSB7XG4gICAgICAgICAgICAvLyBub3RlOiB0aGlzIGlzIGRlc3RydWN0aXZlIChyZXZlcnNlcyBwdHMgaW4gcGxhY2UpIHNvIGNhbid0IHVzZSBwdHMgYWZ0ZXIgdGhpc1xuICAgICAgICAgICAgcmV0dXJuIHJldnBhdGhiYXNlKHB0cy5yZXZlcnNlKCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlZ21lbnRzID0gbGluZVBvaW50cyhjZHNjYXR0ZXIsIHtcbiAgICAgICAgICAgIHhheGlzOiB4YSxcbiAgICAgICAgICAgIHlheGlzOiB5YSxcbiAgICAgICAgICAgIGNvbm5lY3RHYXBzOiB0cmFjZS5jb25uZWN0Z2FwcyxcbiAgICAgICAgICAgIGJhc2VUb2xlcmFuY2U6IE1hdGgubWF4KGxpbmUud2lkdGggfHwgMSwgMykgLyA0LFxuICAgICAgICAgICAgc2hhcGU6IGxpbmUuc2hhcGUsXG4gICAgICAgICAgICBzaW1wbGlmeTogbGluZS5zaW1wbGlmeSxcbiAgICAgICAgICAgIGZpbGw6IHRyYWNlLmZpbGxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2luY2Ugd2UgYWxyZWFkeSBoYXZlIHRoZSBwaXhlbCBzZWdtZW50cyBoZXJlLCB1c2UgdGhlbSB0byBtYWtlXG4gICAgICAgIC8vIHBvbHlnb25zIGZvciBob3ZlciBvbiBmaWxsXG4gICAgICAgIC8vIFRPRE86IGNhbiB3ZSBza2lwIHRoaXMgaWYgaG92ZXJvbiE9ZmlsbHM/IFRoYXQgd291bGQgbWVhbiB3ZVxuICAgICAgICAvLyBuZWVkIHRvIHJlZHJhdyB3aGVuIHlvdSBjaGFuZ2UgaG92ZXJvbi4uLlxuICAgICAgICB0aGlzUG9seWdvbnMgPSB0cmFjZS5fcG9seWdvbnMgPSBuZXcgQXJyYXkoc2VnbWVudHMubGVuZ3RoKTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYWNlLl9wb2x5Z29uc1tpXSA9IHBvbHlnb25UZXN0ZXIoc2VnbWVudHNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwdDAgPSBzZWdtZW50c1swXVswXTtcbiAgICAgICAgICAgIGxhc3RTZWdtZW50ID0gc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBwdDEgPSBsYXN0U2VnbWVudFtsYXN0U2VnbWVudC5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1ha2VVcGRhdGUgPSBmdW5jdGlvbihpc0VudGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24ocHRzKSB7XG4gICAgICAgICAgICAgICAgdGhpc3BhdGggPSBwYXRoZm4ocHRzKTtcbiAgICAgICAgICAgICAgICB0aGlzcmV2cGF0aCA9IHJldnBhdGhmbihwdHMpO1xuICAgICAgICAgICAgICAgIGlmKCFmdWxscGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBmdWxscGF0aCA9IHRoaXNwYXRoO1xuICAgICAgICAgICAgICAgICAgICByZXZwYXRoID0gdGhpc3JldnBhdGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKG93bkZpbGxEaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVsbHBhdGggKz0gJ0wnICsgdGhpc3BhdGguc3Vic3RyKDEpO1xuICAgICAgICAgICAgICAgICAgICByZXZwYXRoID0gdGhpc3JldnBhdGggKyAoJ0wnICsgcmV2cGF0aC5zdWJzdHIoMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxwYXRoICs9ICdaJyArIHRoaXNwYXRoO1xuICAgICAgICAgICAgICAgICAgICByZXZwYXRoID0gdGhpc3JldnBhdGggKyAnWicgKyByZXZwYXRoO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHN1YlR5cGVzLmhhc0xpbmVzKHRyYWNlKSAmJiBwdHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBtYWtlcyB0aGUgY29sb3Jpbmcgd29yayBjb3JyZWN0bHk6XG4gICAgICAgICAgICAgICAgICAgIGVsLmRhdHVtKGNkc2NhdHRlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoaXNFbnRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbihlbC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCB0aGlzcGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLmxpbmVHcm91cFN0eWxlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gdHJhbnNpdGlvbihlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWwuYXR0cignZCcsIHRoaXNwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIERyYXdpbmcuc2luZ2xlTGluZVN0eWxlKGNkc2NhdHRlciwgc2VsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGxpbmVKb2luID0gbGluZXMuc2VsZWN0QWxsKCcuanMtbGluZScpLmRhdGEoc2VnbWVudHMpO1xuXG4gICAgdHJhbnNpdGlvbihsaW5lSm9pbi5leGl0KCkpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAgIC5yZW1vdmUoKTtcblxuICAgIGxpbmVKb2luLmVhY2gobWFrZVVwZGF0ZShmYWxzZSkpO1xuXG4gICAgbGluZUpvaW4uZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAuY2xhc3NlZCgnanMtbGluZScsIHRydWUpXG4gICAgICAgIC5zdHlsZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKVxuICAgICAgICAuY2FsbChEcmF3aW5nLmxpbmVHcm91cFN0eWxlKVxuICAgICAgICAuZWFjaChtYWtlVXBkYXRlKHRydWUpKTtcblxuICAgIERyYXdpbmcuc2V0Q2xpcFVybChsaW5lSm9pbiwgcGxvdGluZm8ubGF5ZXJDbGlwSWQsIGdkKTtcblxuICAgIGZ1bmN0aW9uIGNsZWFyRmlsbChzZWxlY3Rpb24pIHtcbiAgICAgICAgdHJhbnNpdGlvbihzZWxlY3Rpb24pLmF0dHIoJ2QnLCAnTTAsMFonKTtcbiAgICB9XG5cbiAgICBpZihzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgaWYob3duRmlsbEVsMykge1xuICAgICAgICAgICAgb3duRmlsbEVsMy5kYXR1bShjZHNjYXR0ZXIpO1xuICAgICAgICAgICAgaWYocHQwICYmIHB0MSkge1xuICAgICAgICAgICAgICAgIGlmKG93bkZpbGxEaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYob3duRmlsbERpciA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdDBbMV0gPSBwdDFbMV0gPSB5YS5jMnAoMCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihvd25GaWxsRGlyID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB0MFswXSA9IHB0MVswXSA9IHhhLmMycCgwLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbGwgdG8gemVybzogZnVsbCB0cmFjZSBwYXRoLCBwbHVzIGV4dGVuc2lvbiBvZlxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZW5kcG9pbnRzIHRvIHRoZSBhcHByb3ByaWF0ZSBheGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciB0aGUgc2FrZSBvZiBhbmltYXRpb25zLCB3cmFwIHRoZSBwb2ludHMgYXJvdW5kIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHBvaW50cyBvbiB0aGUgYXhlcyBhcmUgdGhlIGZpcnN0IHR3byBwb2ludHMuIE90aGVyd2lzZVxuICAgICAgICAgICAgICAgICAgICAvLyBhbmltYXRpb25zIGdldCBhIGxpdHRsZSBjcmF6eSBpZiB0aGUgbnVtYmVyIG9mIHBvaW50cyBjaGFuZ2VzLlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKG93bkZpbGxFbDMpLmF0dHIoJ2QnLCAnTScgKyBwdDEgKyAnTCcgKyBwdDAgKyAnTCcgKyBmdWxscGF0aC5zdWJzdHIoMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNpbmdsZUZpbGxTdHlsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlsbCB0byBzZWxmOiBqdXN0IGpvaW4gdGhlIHBhdGggdG8gaXRzZWxmXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24ob3duRmlsbEVsMykuYXR0cignZCcsIGZ1bGxwYXRoICsgJ1onKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5zaW5nbGVGaWxsU3R5bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKHRvbmV4dCkge1xuICAgICAgICAgICAgaWYodHJhY2UuZmlsbC5zdWJzdHIoMCwgNikgPT09ICd0b25leHQnICYmIGZ1bGxwYXRoICYmIHByZXZSZXZwYXRoKSB7XG4gICAgICAgICAgICAgICAgLy8gZmlsbCB0byBuZXh0OiBmdWxsIHRyYWNlIHBhdGgsIHBsdXMgdGhlIHByZXZpb3VzIHBhdGggcmV2ZXJzZWRcbiAgICAgICAgICAgICAgICBpZih0cmFjZS5maWxsID09PSAndG9uZXh0Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0b25leHQ6IGZvciB1c2UgYnkgY29uY2VudHJpYyBzaGFwZXMsIGxpa2UgbWFudWFsbHkgY29uc3RydWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udG91cnMsIHdlIGp1c3QgYWRkIHRoZSB0d28gcGF0aHMgY2xvc2VkIG9uIHRoZW1zZWx2ZXMuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgbWFrZXMgc3RyYW5nZSByZXN1bHRzIGlmIG9uZSBwYXRoIGlzICpub3QqIGVudGlyZWx5XG4gICAgICAgICAgICAgICAgICAgIC8vIGluc2lkZSB0aGUgb3RoZXIsIGJ1dCB0aGVuIHRoYXQgaXMgYSBzdHJhbmdlIHVzYWdlLlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKHRvbmV4dCkuYXR0cignZCcsIGZ1bGxwYXRoICsgJ1onICsgcHJldlJldnBhdGggKyAnWicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNpbmdsZUZpbGxTdHlsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdG9uZXh0eC95OiBmb3Igbm93IGp1c3QgY29ubmVjdCBlbmRwb2ludHMgd2l0aCBsaW5lcy4gVGhpcyBpc1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY29ycmVjdCBiZWhhdmlvciBpZiB0aGUgZW5kcG9pbnRzIGFyZSBhdCB0aGUgc2FtZSB2YWx1ZSBvZlxuICAgICAgICAgICAgICAgICAgICAvLyB5L3gsIGJ1dCBpZiB0aGV5ICphcmVuJ3QqLCB3ZSBzaG91bGQgaWRlYWxseSBkbyBtb3JlIGNvbXBsaWNhdGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaW5ncyBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgbmV3IGVuZHBvaW50IHByb2plY3RzIG9udG8gdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0aW5nIGN1cnZlIG9yIG9mZiB0aGUgZW5kIG9mIGl0XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24odG9uZXh0KS5hdHRyKCdkJywgZnVsbHBhdGggKyAnTCcgKyBwcmV2UmV2cGF0aC5zdWJzdHIoMSkgKyAnWicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNpbmdsZUZpbGxTdHlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyYWNlLl9wb2x5Z29ucyA9IHRyYWNlLl9wb2x5Z29ucy5jb25jYXQocHJldlBvbHlnb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xlYXJGaWxsKHRvbmV4dCk7XG4gICAgICAgICAgICAgICAgdHJhY2UuX3BvbHlnb25zID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmFjZS5fcHJldlJldnBhdGggPSByZXZwYXRoO1xuICAgICAgICB0cmFjZS5fcHJldlBvbHlnb25zID0gdGhpc1BvbHlnb25zO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKG93bkZpbGxFbDMpIGNsZWFyRmlsbChvd25GaWxsRWwzKTtcbiAgICAgICAgZWxzZSBpZih0b25leHQpIGNsZWFyRmlsbCh0b25leHQpO1xuICAgICAgICB0cmFjZS5fcG9seWdvbnMgPSB0cmFjZS5fcHJldlJldnBhdGggPSB0cmFjZS5fcHJldlBvbHlnb25zID0gbnVsbDtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHZpc0ZpbHRlcihkKSB7XG4gICAgICAgIHJldHVybiBkLmZpbHRlcihmdW5jdGlvbih2KSB7IHJldHVybiAhdi5nYXAgJiYgdi52aXM7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZpc0ZpbHRlcldpdGhHYXBzKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuZmlsdGVyKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIHYudmlzOyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnYXBGaWx0ZXIoZCkge1xuICAgICAgICByZXR1cm4gZC5maWx0ZXIoZnVuY3Rpb24odikgeyByZXR1cm4gIXYuZ2FwOyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBrZXlGdW5jKGQpIHtcbiAgICAgICAgcmV0dXJuIGQuaWQ7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIGlmIHRoZSB0cmFjZSBpcyBrZXllZCwgb3RoZXJ3aXNlIHJldHVybnMgdW5kZWZpbmVkXG4gICAgZnVuY3Rpb24gZ2V0S2V5RnVuYyh0cmFjZSkge1xuICAgICAgICBpZih0cmFjZS5pZHMpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXlGdW5jO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZUZpbHRlcigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VQb2ludHMocG9pbnRzLCB0ZXh0LCBjZHNjYXR0ZXIpIHtcbiAgICAgICAgdmFyIGpvaW4sIHNlbGVjdGlvbiwgaGFzTm9kZTtcblxuICAgICAgICB2YXIgdHJhY2UgPSBjZHNjYXR0ZXJbMF0udHJhY2U7XG4gICAgICAgIHZhciBzaG93TWFya2VycyA9IHN1YlR5cGVzLmhhc01hcmtlcnModHJhY2UpO1xuICAgICAgICB2YXIgc2hvd1RleHQgPSBzdWJUeXBlcy5oYXNUZXh0KHRyYWNlKTtcblxuICAgICAgICB2YXIga2V5RnVuYyA9IGdldEtleUZ1bmModHJhY2UpO1xuICAgICAgICB2YXIgbWFya2VyRmlsdGVyID0gaGlkZUZpbHRlcjtcbiAgICAgICAgdmFyIHRleHRGaWx0ZXIgPSBoaWRlRmlsdGVyO1xuXG4gICAgICAgIGlmKHNob3dNYXJrZXJzIHx8IHNob3dUZXh0KSB7XG4gICAgICAgICAgICB2YXIgc2hvd0ZpbHRlciA9IGlkZW50aXR5O1xuICAgICAgICAgICAgLy8gaWYgd2UncmUgc3RhY2tpbmcsIFwiaW5mZXIgemVyb1wiIGdhcCBtb2RlIGdldHMgbWFya2VycyBpbiB0aGVcbiAgICAgICAgICAgIC8vIGdhcCBwb2ludHMgLSBiZWNhdXNlIHdlJ3ZlIGluZmVycmVkIGEgemVybyB0aGVyZSAtIGJ1dCBvdGhlclxuICAgICAgICAgICAgLy8gbW9kZXMgKGN1cnJlbnRseSBcImludGVycG9sYXRlXCIsIGxhdGVyIFwiaW50ZXJydXB0XCIgaG9wZWZ1bGx5KVxuICAgICAgICAgICAgLy8gd2UgZG9uJ3QgZHJhdyBnZW5lcmF0ZWQgbWFya2Vyc1xuICAgICAgICAgICAgdmFyIHN0YWNrR3JvdXAgPSB0cmFjZS5zdGFja2dyb3VwO1xuICAgICAgICAgICAgdmFyIGlzSW5mZXJaZXJvID0gc3RhY2tHcm91cCAmJiAoXG4gICAgICAgICAgICAgICAgZ2QuX2Z1bGxMYXlvdXQuX3NjYXR0ZXJTdGFja09wdHNbeGEuX2lkICsgeWEuX2lkXVtzdGFja0dyb3VwXS5zdGFja2dhcHMgPT09ICdpbmZlciB6ZXJvJyk7XG4gICAgICAgICAgICBpZih0cmFjZS5tYXJrZXIubWF4ZGlzcGxheWVkIHx8IHRyYWNlLl9uZWVkc0N1bGwpIHtcbiAgICAgICAgICAgICAgICBzaG93RmlsdGVyID0gaXNJbmZlclplcm8gPyB2aXNGaWx0ZXJXaXRoR2FwcyA6IHZpc0ZpbHRlcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZihzdGFja0dyb3VwICYmICFpc0luZmVyWmVybykge1xuICAgICAgICAgICAgICAgIHNob3dGaWx0ZXIgPSBnYXBGaWx0ZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNob3dNYXJrZXJzKSBtYXJrZXJGaWx0ZXIgPSBzaG93RmlsdGVyO1xuICAgICAgICAgICAgaWYoc2hvd1RleHQpIHRleHRGaWx0ZXIgPSBzaG93RmlsdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFya2VyIHBvaW50c1xuXG4gICAgICAgIHNlbGVjdGlvbiA9IHBvaW50cy5zZWxlY3RBbGwoJ3BhdGgucG9pbnQnKTtcblxuICAgICAgICBqb2luID0gc2VsZWN0aW9uLmRhdGEobWFya2VyRmlsdGVyLCBrZXlGdW5jKTtcblxuICAgICAgICB2YXIgZW50ZXIgPSBqb2luLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdwb2ludCcsIHRydWUpO1xuXG4gICAgICAgIGlmKGhhc1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIGVudGVyXG4gICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5wb2ludFN0eWxlLCB0cmFjZSwgZ2QpXG4gICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy50cmFuc2xhdGVQb2ludHMsIHhhLCB5YSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGpvaW4ub3JkZXIoKTtcblxuICAgICAgICB2YXIgc3R5bGVGbnM7XG4gICAgICAgIGlmKHNob3dNYXJrZXJzKSB7XG4gICAgICAgICAgICBzdHlsZUZucyA9IERyYXdpbmcubWFrZVBvaW50U3R5bGVGbnModHJhY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgam9pbi5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBzZWwgPSB0cmFuc2l0aW9uKGVsKTtcbiAgICAgICAgICAgIGhhc05vZGUgPSBEcmF3aW5nLnRyYW5zbGF0ZVBvaW50KGQsIHNlbCwgeGEsIHlhKTtcblxuICAgICAgICAgICAgaWYoaGFzTm9kZSkge1xuICAgICAgICAgICAgICAgIERyYXdpbmcuc2luZ2xlUG9pbnRTdHlsZShkLCBzZWwsIHRyYWNlLCBzdHlsZUZucywgZ2QpO1xuXG4gICAgICAgICAgICAgICAgaWYocGxvdGluZm8ubGF5ZXJDbGlwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgRHJhd2luZy5oaWRlT3V0c2lkZVJhbmdlUG9pbnQoZCwgc2VsLCB4YSwgeWEsIHRyYWNlLnhjYWxlbmRhciwgdHJhY2UueWNhbGVuZGFyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih0cmFjZS5jdXN0b21kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzZWQoJ3Bsb3RseS1jdXN0b21kYXRhJywgZC5kYXRhICE9PSBudWxsICYmIGQuZGF0YSAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoaGFzVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgam9pbi5leGl0KCkudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMClcbiAgICAgICAgICAgICAgICAucmVtb3ZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBqb2luLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRleHQgcG9pbnRzXG4gICAgICAgIHNlbGVjdGlvbiA9IHRleHQuc2VsZWN0QWxsKCdnJyk7XG4gICAgICAgIGpvaW4gPSBzZWxlY3Rpb24uZGF0YSh0ZXh0RmlsdGVyLCBrZXlGdW5jKTtcblxuICAgICAgICAvLyBlYWNoIHRleHQgbmVlZHMgdG8gZ28gaW4gaXRzIG93biAnZycgaW4gY2FzZVxuICAgICAgICAvLyBpdCBnZXRzIGNvbnZlcnRlZCB0byBtYXRoamF4XG4gICAgICAgIGpvaW4uZW50ZXIoKS5hcHBlbmQoJ2cnKS5jbGFzc2VkKCd0ZXh0cG9pbnQnLCB0cnVlKS5hcHBlbmQoJ3RleHQnKTtcblxuICAgICAgICBqb2luLm9yZGVyKCk7XG5cbiAgICAgICAgam9pbi5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciBnID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgdmFyIHNlbCA9IHRyYW5zaXRpb24oZy5zZWxlY3QoJ3RleHQnKSk7XG4gICAgICAgICAgICBoYXNOb2RlID0gRHJhd2luZy50cmFuc2xhdGVQb2ludChkLCBzZWwsIHhhLCB5YSk7XG5cbiAgICAgICAgICAgIGlmKGhhc05vZGUpIHtcbiAgICAgICAgICAgICAgICBpZihwbG90aW5mby5sYXllckNsaXBJZCkge1xuICAgICAgICAgICAgICAgICAgICBEcmF3aW5nLmhpZGVPdXRzaWRlUmFuZ2VQb2ludChkLCBnLCB4YSwgeWEsIHRyYWNlLnhjYWxlbmRhciwgdHJhY2UueWNhbGVuZGFyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGcucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGpvaW4uc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgICAgIC5jYWxsKERyYXdpbmcudGV4dFBvaW50U3R5bGUsIHRyYWNlLCBnZClcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGp1c3QgKmhhcyogdG8gYmUgdG90YWxseSBjdXN0b20gYmVjdWFzZSBvZiBTVkcgdGV4dCBwb3NpdGlvbmluZyA6KFxuICAgICAgICAgICAgICAgIC8vIEl0J3Mgb2J2aW91c2x5IGNvcGllZCBmcm9tIHRyYW5zbGF0ZVBvaW50OyB3ZSBqdXN0IGNhbid0IHVzZSB0aGF0XG4gICAgICAgICAgICAgICAgdmFyIHggPSB4YS5jMnAoZC54KTtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHlhLmMycChkLnkpO1xuXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnNlbGVjdEFsbCgndHNwYW4ubGluZScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24oZDMuc2VsZWN0KHRoaXMpKS5hdHRyKHt4OiB4LCB5OiB5fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBqb2luLmV4aXQoKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBwb2ludHMuZGF0dW0oY2RzY2F0dGVyKTtcbiAgICB0ZXh0LmRhdHVtKGNkc2NhdHRlcik7XG4gICAgbWFrZVBvaW50cyhwb2ludHMsIHRleHQsIGNkc2NhdHRlcik7XG5cbiAgICAvLyBsYXN0bHksIGNsaXAgcG9pbnRzIGdyb3VwcyBvZiBgY2xpcG9uYXhpcyAhPT0gZmFsc2VgIHRyYWNlc1xuICAgIC8vIG9uIGBwbG90aW5mby5faGFzQ2xpcE9uQXhpc0ZhbHNlID09PSB0cnVlYCBzdWJwbG90c1xuICAgIHZhciBoYXNDbGlwT25BeGlzRmFsc2UgPSB0cmFjZS5jbGlwb25heGlzID09PSBmYWxzZTtcbiAgICB2YXIgY2xpcFVybCA9IGhhc0NsaXBPbkF4aXNGYWxzZSA/IG51bGwgOiBwbG90aW5mby5sYXllckNsaXBJZDtcbiAgICBEcmF3aW5nLnNldENsaXBVcmwocG9pbnRzLCBjbGlwVXJsLCBnZCk7XG4gICAgRHJhd2luZy5zZXRDbGlwVXJsKHRleHQsIGNsaXBVcmwsIGdkKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0TWFya2VycyhnZCwgaWR4LCBwbG90aW5mbywgY2RzY2F0dGVyLCBjZHNjYXR0ZXJBbGwpIHtcbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcbiAgICB2YXIgeHIgPSBkMy5leHRlbnQoTGliLnNpbXBsZU1hcCh4YS5yYW5nZSwgeGEucjJjKSk7XG4gICAgdmFyIHlyID0gZDMuZXh0ZW50KExpYi5zaW1wbGVNYXAoeWEucmFuZ2UsIHlhLnIyYykpO1xuXG4gICAgdmFyIHRyYWNlID0gY2RzY2F0dGVyWzBdLnRyYWNlO1xuICAgIGlmKCFzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlKSkgcmV0dXJuO1xuICAgIC8vIGlmIG1hcmtlci5tYXhkaXNwbGF5ZWQgaXMgdXNlZCwgc2VsZWN0IGEgbWF4aW11bSBvZlxuICAgIC8vIG1udW0gbWFya2VycyB0byBzaG93LCBmcm9tIHRoZSBzZXQgdGhhdCBhcmUgaW4gdGhlIHZpZXdwb3J0XG4gICAgdmFyIG1udW0gPSB0cmFjZS5tYXJrZXIubWF4ZGlzcGxheWVkO1xuXG4gICAgLy8gVE9ETzogcmVtb3ZlIHNvbWUgYXMgd2UgZ2V0IGF3YXkgZnJvbSB0aGUgdmlld3BvcnQ/XG4gICAgaWYobW51bSA9PT0gMCkgcmV0dXJuO1xuXG4gICAgdmFyIGNkID0gY2RzY2F0dGVyLmZpbHRlcihmdW5jdGlvbih2KSB7XG4gICAgICAgIHJldHVybiB2LnggPj0geHJbMF0gJiYgdi54IDw9IHhyWzFdICYmIHYueSA+PSB5clswXSAmJiB2LnkgPD0geXJbMV07XG4gICAgfSk7XG4gICAgdmFyIGluYyA9IE1hdGguY2VpbChjZC5sZW5ndGggLyBtbnVtKTtcbiAgICB2YXIgdG51bSA9IDA7XG4gICAgY2RzY2F0dGVyQWxsLmZvckVhY2goZnVuY3Rpb24oY2RqLCBqKSB7XG4gICAgICAgIHZhciB0cmFjZWkgPSBjZGpbMF0udHJhY2U7XG4gICAgICAgIGlmKHN1YlR5cGVzLmhhc01hcmtlcnModHJhY2VpKSAmJlxuICAgICAgICAgICAgICAgIHRyYWNlaS5tYXJrZXIubWF4ZGlzcGxheWVkID4gMCAmJiBqIDwgaWR4KSB7XG4gICAgICAgICAgICB0bnVtKys7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGlmIG11bHRpcGxlIHRyYWNlcyB1c2UgbWF4ZGlzcGxheWVkLCBzdGFnZ2VyIHdoaWNoIG1hcmtlcnMgd2VcbiAgICAvLyBkaXNwbGF5IHRoaXMgZm9ybXVsYSBvZmZzZXRzIHN1Y2Nlc3NpdmUgdHJhY2VzIGJ5IDEvMyBvZiB0aGVcbiAgICAvLyBpbmNyZW1lbnQsIGFkZGluZyBhbiBleHRyYSBzbWFsbCBhbW91bnQgYWZ0ZXIgZWFjaCB0cmlwbGV0IHNvXG4gICAgLy8gaXQncyBub3QgcXVpdGUgcGVyaW9kaWNcbiAgICB2YXIgaTAgPSBNYXRoLnJvdW5kKHRudW0gKiBpbmMgLyAzICsgTWF0aC5mbG9vcih0bnVtIC8gMykgKiBpbmMgLyA3LjEpO1xuXG4gICAgLy8gZm9yIGVycm9yIGJhcnM6IHNhdmUgaW4gY2Qgd2hpY2ggbWFya2VycyB0byBzaG93XG4gICAgLy8gc28gd2UgZG9uJ3QgaGF2ZSB0byByZXBlYXQgdGhpc1xuICAgIGNkc2NhdHRlci5mb3JFYWNoKGZ1bmN0aW9uKHYpIHsgZGVsZXRlIHYudmlzOyB9KTtcbiAgICBjZC5mb3JFYWNoKGZ1bmN0aW9uKHYsIGkpIHtcbiAgICAgICAgaWYoTWF0aC5yb3VuZCgoaSArIGkwKSAlIGluYykgPT09IDApIHYudmlzID0gdHJ1ZTtcbiAgICB9KTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3VidHlwZXMgPSByZXF1aXJlKCcuL3N1YnR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0UG9pbnRzKHNlYXJjaEluZm8sIHNlbGVjdGlvblRlc3Rlcikge1xuICAgIHZhciBjZCA9IHNlYXJjaEluZm8uY2Q7XG4gICAgdmFyIHhhID0gc2VhcmNoSW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBzZWFyY2hJbmZvLnlheGlzO1xuICAgIHZhciBzZWxlY3Rpb24gPSBbXTtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgaTtcbiAgICB2YXIgZGk7XG4gICAgdmFyIHg7XG4gICAgdmFyIHk7XG5cbiAgICB2YXIgaGFzT25seUxpbmVzID0gKCFzdWJ0eXBlcy5oYXNNYXJrZXJzKHRyYWNlKSAmJiAhc3VidHlwZXMuaGFzVGV4dCh0cmFjZSkpO1xuICAgIGlmKGhhc09ubHlMaW5lcykgcmV0dXJuIFtdO1xuXG4gICAgaWYoc2VsZWN0aW9uVGVzdGVyID09PSBmYWxzZSkgeyAvLyBjbGVhciBzZWxlY3Rpb25cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNkW2ldLnNlbGVjdGVkID0gMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkaSA9IGNkW2ldO1xuICAgICAgICAgICAgeCA9IHhhLmMycChkaS54KTtcbiAgICAgICAgICAgIHkgPSB5YS5jMnAoZGkueSk7XG5cbiAgICAgICAgICAgIGlmKChkaS5pICE9PSBudWxsKSAmJiBzZWxlY3Rpb25UZXN0ZXIuY29udGFpbnMoW3gsIHldLCBmYWxzZSwgaSwgc2VhcmNoSW5mbykpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50TnVtYmVyOiBkaS5pLFxuICAgICAgICAgICAgICAgICAgICB4OiB4YS5jMmQoZGkueCksXG4gICAgICAgICAgICAgICAgICAgIHk6IHlhLmMyZChkaS55KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRpLnNlbGVjdGVkID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGkuc2VsZWN0ZWQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9