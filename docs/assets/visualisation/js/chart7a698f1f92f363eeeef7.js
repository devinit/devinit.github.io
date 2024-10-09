(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_plots_cartesian_graph_interact_js"],{

/***/ "./node_modules/plotly.js/src/plots/cartesian/dragbox.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/dragbox.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
var supportsPassive = __webpack_require__(/*! has-passive-events */ "./node_modules/has-passive-events/index.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Axes = __webpack_require__(/*! ./axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var setCursor = __webpack_require__(/*! ../../lib/setcursor */ "./node_modules/plotly.js/src/lib/setcursor.js");
var dragElement = __webpack_require__(/*! ../../components/dragelement */ "./node_modules/plotly.js/src/components/dragelement/index.js");
var helpers = __webpack_require__(/*! ../../components/dragelement/helpers */ "./node_modules/plotly.js/src/components/dragelement/helpers.js");
var selectingOrDrawing = helpers.selectingOrDrawing;
var freeMode = helpers.freeMode;

var FROM_TL = __webpack_require__(/*! ../../constants/alignment */ "./node_modules/plotly.js/src/constants/alignment.js").FROM_TL;
var clearGlCanvases = __webpack_require__(/*! ../../lib/clear_gl_canvases */ "./node_modules/plotly.js/src/lib/clear_gl_canvases.js");
var redrawReglTraces = __webpack_require__(/*! ../../plot_api/subroutines */ "./node_modules/plotly.js/src/plot_api/subroutines.js").redrawReglTraces;

var Plots = __webpack_require__(/*! ../plots */ "./node_modules/plotly.js/src/plots/plots.js");

var getFromId = __webpack_require__(/*! ./axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js").getFromId;
var prepSelect = __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").prepSelect;
var clearSelect = __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").clearSelect;
var selectOnClick = __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").selectOnClick;
var scaleZoom = __webpack_require__(/*! ./scale_zoom */ "./node_modules/plotly.js/src/plots/cartesian/scale_zoom.js");

var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js");
var MINDRAG = constants.MINDRAG;
var MINZOOM = constants.MINZOOM;

// flag for showing "doubleclick to zoom out" only at the beginning
var SHOWZOOMOUTTIP = true;

// dragBox: create an element to drag one or more axis ends
// inputs:
//      plotinfo - which subplot are we making dragboxes on?
//      x,y,w,h - left, top, width, height of the box
//      ns - how does this drag the vertical axis?
//          'n' - top only
//          's' - bottom only
//          'ns' - top and bottom together, difference unchanged
//      ew - same for horizontal axis
function makeDragBox(gd, plotinfo, x, y, w, h, ns, ew) {
    // mouseDown stores ms of first mousedown event in the last
    // `gd._context.doubleClickDelay` ms on the drag bars
    // numClicks stores how many mousedowns have been seen
    // within `gd._context.doubleClickDelay` so we can check for click or doubleclick events
    // dragged stores whether a drag has occurred, so we don't have to
    // redraw unnecessarily, ie if no move bigger than MINDRAG or MINZOOM px
    var zoomlayer = gd._fullLayout._zoomlayer;
    var isMainDrag = (ns + ew === 'nsew');
    var singleEnd = (ns + ew).length === 1;

    // main subplot x and y (i.e. found in plotinfo - the main ones)
    var xa0, ya0;
    // {ax._id: ax} hash objects
    var xaHash, yaHash;
    // xaHash/yaHash values (arrays)
    var xaxes, yaxes;
    // main axis offsets
    var xs, ys;
    // main axis lengths
    var pw, ph;
    // contains keys 'xaHash', 'yaHash', 'xaxes', and 'yaxes'
    // which are the x/y {ax._id: ax} hash objects and their values
    // for linked axis relative to this subplot
    var links;
    // similar to `links` but for matching axes
    var matches;
    // set to ew/ns val when active, set to '' when inactive
    var xActive, yActive;
    // are all axes in this subplot are fixed?
    var allFixedRanges;
    // do we need to edit x/y ranges?
    var editX, editY;
    // graph-wide optimization flags
    var hasScatterGl, hasSplom, hasSVG;
    // collected changes to be made to the plot by relayout at the end
    var updates;

    function recomputeAxisLists() {
        xa0 = plotinfo.xaxis;
        ya0 = plotinfo.yaxis;
        pw = xa0._length;
        ph = ya0._length;
        xs = xa0._offset;
        ys = ya0._offset;

        xaHash = {};
        xaHash[xa0._id] = xa0;
        yaHash = {};
        yaHash[ya0._id] = ya0;

        // if we're dragging two axes at once, also drag overlays
        if(ns && ew) {
            var overlays = plotinfo.overlays;
            for(var i = 0; i < overlays.length; i++) {
                var xa = overlays[i].xaxis;
                xaHash[xa._id] = xa;
                var ya = overlays[i].yaxis;
                yaHash[ya._id] = ya;
            }
        }

        xaxes = hashValues(xaHash);
        yaxes = hashValues(yaHash);
        xActive = isDirectionActive(xaxes, ew);
        yActive = isDirectionActive(yaxes, ns);
        allFixedRanges = !yActive && !xActive;

        links = calcLinks(gd, gd._fullLayout._axisConstraintGroups, xaHash, yaHash);
        matches = calcLinks(gd, gd._fullLayout._axisMatchGroups, xaHash, yaHash);
        editX = ew || links.isSubplotConstrained || matches.isSubplotConstrained;
        editY = ns || links.isSubplotConstrained || matches.isSubplotConstrained;

        var fullLayout = gd._fullLayout;
        hasScatterGl = fullLayout._has('scattergl');
        hasSplom = fullLayout._has('splom');
        hasSVG = fullLayout._has('svg');
    }

    recomputeAxisLists();

    var cursor = getDragCursor(yActive + xActive, gd._fullLayout.dragmode, isMainDrag);
    var dragger = makeRectDragger(plotinfo, ns + ew + 'drag', cursor, x, y, w, h);

    // still need to make the element if the axes are disabled
    // but nuke its events (except for maindrag which needs them for hover)
    // and stop there
    if(allFixedRanges && !isMainDrag) {
        dragger.onmousedown = null;
        dragger.style.pointerEvents = 'none';
        return dragger;
    }

    var dragOptions = {
        element: dragger,
        gd: gd,
        plotinfo: plotinfo
    };

    dragOptions.prepFn = function(e, startX, startY) {
        var dragModePrev = dragOptions.dragmode;
        var dragModeNow = gd._fullLayout.dragmode;
        if(dragModeNow !== dragModePrev) {
            dragOptions.dragmode = dragModeNow;
        }

        recomputeAxisLists();

        if(!allFixedRanges) {
            if(isMainDrag) {
                // main dragger handles all drag modes, and changes
                // to pan (or to zoom if it already is pan) on shift
                if(e.shiftKey) {
                    if(dragModeNow === 'pan') dragModeNow = 'zoom';
                    else if(!selectingOrDrawing(dragModeNow)) dragModeNow = 'pan';
                } else if(e.ctrlKey) {
                    dragModeNow = 'pan';
                }
            } else {
                // all other draggers just pan
                dragModeNow = 'pan';
            }
        }

        if(freeMode(dragModeNow)) dragOptions.minDrag = 1;
        else dragOptions.minDrag = undefined;

        if(selectingOrDrawing(dragModeNow)) {
            dragOptions.xaxes = xaxes;
            dragOptions.yaxes = yaxes;
            // this attaches moveFn, clickFn, doneFn on dragOptions
            prepSelect(e, startX, startY, dragOptions, dragModeNow);
        } else {
            dragOptions.clickFn = clickFn;
            if(selectingOrDrawing(dragModePrev)) {
                // TODO Fix potential bug
                // Note: clearing / resetting selection state only happens, when user
                // triggers at least one interaction in pan/zoom mode. Otherwise, the
                // select/lasso outlines are deleted (in plots.js.cleanPlot) but the selection
                // cache isn't cleared. So when the user switches back to select/lasso and
                // 'adds to a selection' with Shift, the "old", seemingly removed outlines
                // are redrawn again because the selection cache still holds their coordinates.
                // However, this isn't easily solved, since plots.js would need
                // to have a reference to the dragOptions object (which holds the
                // selection cache).
                clearAndResetSelect();
            }

            if(!allFixedRanges) {
                if(dragModeNow === 'zoom') {
                    dragOptions.moveFn = zoomMove;
                    dragOptions.doneFn = zoomDone;

                    // zoomMove takes care of the threshold, but we need to
                    // minimize this so that constrained zoom boxes will flip
                    // orientation at the right place
                    dragOptions.minDrag = 1;

                    zoomPrep(e, startX, startY);
                } else if(dragModeNow === 'pan') {
                    dragOptions.moveFn = plotDrag;
                    dragOptions.doneFn = dragTail;
                }
            }
        }

        gd._fullLayout._redrag = function() {
            var dragDataNow = gd._dragdata;

            if(dragDataNow && dragDataNow.element === dragger) {
                var dragModeNow = gd._fullLayout.dragmode;

                if(!selectingOrDrawing(dragModeNow)) {
                    recomputeAxisLists();
                    updateSubplots([0, 0, pw, ph]);
                    dragOptions.moveFn(dragDataNow.dx, dragDataNow.dy);
                }

                // TODO should we try to "re-select" under select/lasso modes?
                // probably best to wait for https://github.com/plotly/plotly.js/issues/1851
            }
        };
    };

    function clearAndResetSelect() {
        // clear selection polygon cache (if any)
        dragOptions.plotinfo.selection = false;
        // clear selection outlines
        clearSelect(gd);
    }

    function clickFn(numClicks, evt) {
        var gd = dragOptions.gd;
        if(gd._fullLayout._activeShapeIndex >= 0) {
            gd._fullLayout._deactivateShape(gd);
            return;
        }

        var clickmode = gd._fullLayout.clickmode;

        removeZoombox(gd);

        if(numClicks === 2 && !singleEnd) doubleClick();

        if(isMainDrag) {
            if(clickmode.indexOf('select') > -1) {
                selectOnClick(evt, gd, xaxes, yaxes, plotinfo.id, dragOptions);
            }

            if(clickmode.indexOf('event') > -1) {
                Fx.click(gd, evt, plotinfo.id);
            }
        } else if(numClicks === 1 && singleEnd) {
            var ax = ns ? ya0 : xa0;
            var end = (ns === 's' || ew === 'w') ? 0 : 1;
            var attrStr = ax._name + '.range[' + end + ']';
            var initialText = getEndText(ax, end);
            var hAlign = 'left';
            var vAlign = 'middle';

            if(ax.fixedrange) return;

            if(ns) {
                vAlign = (ns === 'n') ? 'top' : 'bottom';
                if(ax.side === 'right') hAlign = 'right';
            } else if(ew === 'e') hAlign = 'right';

            if(gd._context.showAxisRangeEntryBoxes) {
                d3.select(dragger)
                    .call(svgTextUtils.makeEditable, {
                        gd: gd,
                        immediate: true,
                        background: gd._fullLayout.paper_bgcolor,
                        text: String(initialText),
                        fill: ax.tickfont ? ax.tickfont.color : '#444',
                        horizontalAlign: hAlign,
                        verticalAlign: vAlign
                    })
                    .on('edit', function(text) {
                        var v = ax.d2r(text);
                        if(v !== undefined) {
                            Registry.call('_guiRelayout', gd, attrStr, v);
                        }
                    });
            }
        }
    }

    dragElement.init(dragOptions);

    // x/y px position at start of drag
    var x0, y0;
    // bbox object of the zoombox
    var box;
    // luminance of bg behind zoombox
    var lum;
    // zoombox path outline
    var path0;
    // is zoombox dimmed (during drag)
    var dimmed;
    // 'x'-only, 'y' or 'xy' zooming
    var zoomMode;
    // zoombox d3 selection
    var zb;
    // zoombox corner d3 selection
    var corners;
    // zoom takes over minDrag, so it also has to take over gd._dragged
    var zoomDragged;

    function zoomPrep(e, startX, startY) {
        var dragBBox = dragger.getBoundingClientRect();
        x0 = startX - dragBBox.left;
        y0 = startY - dragBBox.top;
        box = {l: x0, r: x0, w: 0, t: y0, b: y0, h: 0};
        lum = gd._hmpixcount ?
            (gd._hmlumcount / gd._hmpixcount) :
            tinycolor(gd._fullLayout.plot_bgcolor).getLuminance();
        path0 = 'M0,0H' + pw + 'V' + ph + 'H0V0';
        dimmed = false;
        zoomMode = 'xy';
        zoomDragged = false;
        zb = makeZoombox(zoomlayer, lum, xs, ys, path0);
        corners = makeCorners(zoomlayer, xs, ys);
    }

    function zoomMove(dx0, dy0) {
        if(gd._transitioningWithDuration) {
            return false;
        }

        var x1 = Math.max(0, Math.min(pw, dx0 + x0));
        var y1 = Math.max(0, Math.min(ph, dy0 + y0));
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);

        box.l = Math.min(x0, x1);
        box.r = Math.max(x0, x1);
        box.t = Math.min(y0, y1);
        box.b = Math.max(y0, y1);

        function noZoom() {
            zoomMode = '';
            box.r = box.l;
            box.t = box.b;
            corners.attr('d', 'M0,0Z');
        }

        if(links.isSubplotConstrained) {
            if(dx > MINZOOM || dy > MINZOOM) {
                zoomMode = 'xy';
                if(dx / pw > dy / ph) {
                    dy = dx * ph / pw;
                    if(y0 > y1) box.t = y0 - dy;
                    else box.b = y0 + dy;
                } else {
                    dx = dy * pw / ph;
                    if(x0 > x1) box.l = x0 - dx;
                    else box.r = x0 + dx;
                }
                corners.attr('d', xyCorners(box));
            } else {
                noZoom();
            }
        } else if(matches.isSubplotConstrained) {
            if(dx > MINZOOM || dy > MINZOOM) {
                zoomMode = 'xy';

                var r0 = Math.min(box.l / pw, (ph - box.b) / ph);
                var r1 = Math.max(box.r / pw, (ph - box.t) / ph);

                box.l = r0 * pw;
                box.r = r1 * pw;
                box.b = (1 - r0) * ph;
                box.t = (1 - r1) * ph;
                corners.attr('d', xyCorners(box));
            } else {
                noZoom();
            }
        } else if(!yActive || dy < Math.min(Math.max(dx * 0.6, MINDRAG), MINZOOM)) {
            // look for small drags in one direction or the other,
            // and only drag the other axis

            if(dx < MINDRAG || !xActive) {
                noZoom();
            } else {
                box.t = 0;
                box.b = ph;
                zoomMode = 'x';
                corners.attr('d', xCorners(box, y0));
            }
        } else if(!xActive || dx < Math.min(dy * 0.6, MINZOOM)) {
            box.l = 0;
            box.r = pw;
            zoomMode = 'y';
            corners.attr('d', yCorners(box, x0));
        } else {
            zoomMode = 'xy';
            corners.attr('d', xyCorners(box));
        }
        box.w = box.r - box.l;
        box.h = box.b - box.t;

        if(zoomMode) zoomDragged = true;
        gd._dragged = zoomDragged;

        updateZoombox(zb, corners, box, path0, dimmed, lum);
        computeZoomUpdates();
        gd.emit('plotly_relayouting', updates);
        dimmed = true;
    }

    function computeZoomUpdates() {
        updates = {};

        // TODO: edit linked axes in zoomAxRanges and in dragTail
        if(zoomMode === 'xy' || zoomMode === 'x') {
            zoomAxRanges(xaxes, box.l / pw, box.r / pw, updates, links.xaxes);
            updateMatchedAxRange('x', updates);
        }
        if(zoomMode === 'xy' || zoomMode === 'y') {
            zoomAxRanges(yaxes, (ph - box.b) / ph, (ph - box.t) / ph, updates, links.yaxes);
            updateMatchedAxRange('y', updates);
        }
    }

    function zoomDone() {
        computeZoomUpdates();
        removeZoombox(gd);
        dragTail();
        showDoubleClickNotifier(gd);
    }

    // scroll zoom, on all draggers except corners
    var scrollViewBox = [0, 0, pw, ph];
    // wait a little after scrolling before redrawing
    var redrawTimer = null;
    var REDRAWDELAY = constants.REDRAWDELAY;
    var mainplot = plotinfo.mainplot ? gd._fullLayout._plots[plotinfo.mainplot] : plotinfo;

    function zoomWheel(e) {
        // deactivate mousewheel scrolling on embedded graphs
        // devs can override this with layout._enablescrollzoom,
        // but _ ensures this setting won't leave their page
        if(!gd._context._scrollZoom.cartesian && !gd._fullLayout._enablescrollzoom) {
            return;
        }

        clearAndResetSelect();

        // If a transition is in progress, then disable any behavior:
        if(gd._transitioningWithDuration) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        recomputeAxisLists();

        clearTimeout(redrawTimer);

        var wheelDelta = -e.deltaY;
        if(!isFinite(wheelDelta)) wheelDelta = e.wheelDelta / 10;
        if(!isFinite(wheelDelta)) {
            Lib.log('Did not find wheel motion attributes: ', e);
            return;
        }

        var zoom = Math.exp(-Math.min(Math.max(wheelDelta, -20), 20) / 200);
        var gbb = mainplot.draglayer.select('.nsewdrag').node().getBoundingClientRect();
        var xfrac = (e.clientX - gbb.left) / gbb.width;
        var yfrac = (gbb.bottom - e.clientY) / gbb.height;
        var i;

        function zoomWheelOneAxis(ax, centerFraction, zoom) {
            if(ax.fixedrange) return;

            var axRange = Lib.simpleMap(ax.range, ax.r2l);
            var v0 = axRange[0] + (axRange[1] - axRange[0]) * centerFraction;
            function doZoom(v) { return ax.l2r(v0 + (v - v0) * zoom); }
            ax.range = axRange.map(doZoom);
        }

        if(editX) {
            // if we're only zooming this axis because of constraints,
            // zoom it about the center
            if(!ew) xfrac = 0.5;

            for(i = 0; i < xaxes.length; i++) {
                zoomWheelOneAxis(xaxes[i], xfrac, zoom);
            }
            updateMatchedAxRange('x');

            scrollViewBox[2] *= zoom;
            scrollViewBox[0] += scrollViewBox[2] * xfrac * (1 / zoom - 1);
        }
        if(editY) {
            if(!ns) yfrac = 0.5;

            for(i = 0; i < yaxes.length; i++) {
                zoomWheelOneAxis(yaxes[i], yfrac, zoom);
            }
            updateMatchedAxRange('y');

            scrollViewBox[3] *= zoom;
            scrollViewBox[1] += scrollViewBox[3] * (1 - yfrac) * (1 / zoom - 1);
        }

        // viewbox redraw at first
        updateSubplots(scrollViewBox);
        ticksAndAnnotations();

        gd.emit('plotly_relayouting', updates);

        // then replot after a delay to make sure
        // no more scrolling is coming
        redrawTimer = setTimeout(function() {
            scrollViewBox = [0, 0, pw, ph];
            dragTail();
        }, REDRAWDELAY);

        e.preventDefault();
        return;
    }

    // everything but the corners gets wheel zoom
    if(ns.length * ew.length !== 1) {
        attachWheelEventHandler(dragger, zoomWheel);
    }

    // plotDrag: move the plot in response to a drag
    function plotDrag(dx, dy) {
        // If a transition is in progress, then disable any behavior:
        if(gd._transitioningWithDuration) {
            return;
        }

        // prevent axis drawing from monkeying with margins until we're done
        gd._fullLayout._replotting = true;

        if(xActive === 'ew' || yActive === 'ns') {
            if(xActive) {
                dragAxList(xaxes, dx);
                updateMatchedAxRange('x');
            }
            if(yActive) {
                dragAxList(yaxes, dy);
                updateMatchedAxRange('y');
            }
            updateSubplots([xActive ? -dx : 0, yActive ? -dy : 0, pw, ph]);
            ticksAndAnnotations();
            gd.emit('plotly_relayouting', updates);
            return;
        }

        // dz: set a new value for one end (0 or 1) of an axis array axArray,
        // and return a pixel shift for that end for the viewbox
        // based on pixel drag distance d
        // TODO: this makes (generally non-fatal) errors when you get
        // near floating point limits
        function dz(axArray, end, d) {
            var otherEnd = 1 - end;
            var movedAx;
            var newLinearizedEnd;
            for(var i = 0; i < axArray.length; i++) {
                var axi = axArray[i];
                if(axi.fixedrange) continue;
                movedAx = axi;
                newLinearizedEnd = axi._rl[otherEnd] +
                    (axi._rl[end] - axi._rl[otherEnd]) / dZoom(d / axi._length);
                var newEnd = axi.l2r(newLinearizedEnd);

                // if l2r comes back false or undefined, it means we've dragged off
                // the end of valid ranges - so stop.
                if(newEnd !== false && newEnd !== undefined) axi.range[end] = newEnd;
            }
            return movedAx._length * (movedAx._rl[end] - newLinearizedEnd) /
                (movedAx._rl[end] - movedAx._rl[otherEnd]);
        }

        if(links.isSubplotConstrained && xActive && yActive) {
            // dragging a corner of a constrained subplot:
            // respect the fixed corner, but harmonize dx and dy
            var dxySign = ((xActive === 'w') === (yActive === 'n')) ? 1 : -1;
            var dxyFraction = (dx / pw + dxySign * dy / ph) / 2;
            dx = dxyFraction * pw;
            dy = dxySign * dxyFraction * ph;
        }

        if(xActive === 'w') dx = dz(xaxes, 0, dx);
        else if(xActive === 'e') dx = dz(xaxes, 1, -dx);
        else if(!xActive) dx = 0;

        if(yActive === 'n') dy = dz(yaxes, 1, dy);
        else if(yActive === 's') dy = dz(yaxes, 0, -dy);
        else if(!yActive) dy = 0;

        var xStart = (xActive === 'w') ? dx : 0;
        var yStart = (yActive === 'n') ? dy : 0;

        if(links.isSubplotConstrained) {
            var i;
            if(!xActive && yActive.length === 1) {
                // dragging one end of the y axis of a constrained subplot
                // scale the other axis the same about its middle
                for(i = 0; i < xaxes.length; i++) {
                    xaxes[i].range = xaxes[i]._r.slice();
                    scaleZoom(xaxes[i], 1 - dy / ph);
                }
                dx = dy * pw / ph;
                xStart = dx / 2;
            }
            if(!yActive && xActive.length === 1) {
                for(i = 0; i < yaxes.length; i++) {
                    yaxes[i].range = yaxes[i]._r.slice();
                    scaleZoom(yaxes[i], 1 - dx / pw);
                }
                dy = dx * ph / pw;
                yStart = dy / 2;
            }
        }

        updateMatchedAxRange('x');
        updateMatchedAxRange('y');
        updateSubplots([xStart, yStart, pw - dx, ph - dy]);
        ticksAndAnnotations();
        gd.emit('plotly_relayouting', updates);
    }

    function updateMatchedAxRange(axLetter, out) {
        var matchedAxes = matches.isSubplotConstrained ?
            {x: yaxes, y: xaxes}[axLetter] :
            matches[axLetter + 'axes'];

        var constrainedAxes = matches.isSubplotConstrained ?
            {x: xaxes, y: yaxes}[axLetter] :
            [];

        for(var i = 0; i < matchedAxes.length; i++) {
            var ax = matchedAxes[i];
            var axId = ax._id;
            var axId2 = matches.xLinks[axId] || matches.yLinks[axId];
            var ax2 = constrainedAxes[0] || xaHash[axId2] || yaHash[axId2];

            if(ax2) {
                if(out) {
                    // zoombox case - don't mutate 'range', just add keys in 'updates'
                    out[ax._name + '.range[0]'] = out[ax2._name + '.range[0]'];
                    out[ax._name + '.range[1]'] = out[ax2._name + '.range[1]'];
                } else {
                    ax.range = ax2.range.slice();
                }
            }
        }
    }

    // Draw ticks and annotations (and other components) when ranges change.
    // Also records the ranges that have changed for use by update at the end.
    function ticksAndAnnotations() {
        var activeAxIds = [];
        var i;

        function pushActiveAxIds(axList) {
            for(i = 0; i < axList.length; i++) {
                if(!axList[i].fixedrange) activeAxIds.push(axList[i]._id);
            }
        }

        if(editX) {
            pushActiveAxIds(xaxes);
            pushActiveAxIds(links.xaxes);
            pushActiveAxIds(matches.xaxes);
        }
        if(editY) {
            pushActiveAxIds(yaxes);
            pushActiveAxIds(links.yaxes);
            pushActiveAxIds(matches.yaxes);
        }

        updates = {};
        for(i = 0; i < activeAxIds.length; i++) {
            var axId = activeAxIds[i];
            var ax = getFromId(gd, axId);
            Axes.drawOne(gd, ax, {skipTitle: true});
            updates[ax._name + '.range[0]'] = ax.range[0];
            updates[ax._name + '.range[1]'] = ax.range[1];
        }

        Axes.redrawComponents(gd, activeAxIds);
    }

    function doubleClick() {
        if(gd._transitioningWithDuration) return;

        var doubleClickConfig = gd._context.doubleClick;

        var axList = [];
        if(xActive) axList = axList.concat(xaxes);
        if(yActive) axList = axList.concat(yaxes);
        if(matches.xaxes) axList = axList.concat(matches.xaxes);
        if(matches.yaxes) axList = axList.concat(matches.yaxes);

        var attrs = {};
        var ax, i, rangeInitial;

        // For reset+autosize mode:
        // If *any* of the main axes is not at its initial range
        // (or autoranged, if we have no initial range, to match the logic in
        // doubleClickConfig === 'reset' below), we reset.
        // If they are *all* at their initial ranges, then we autosize.
        if(doubleClickConfig === 'reset+autosize') {
            doubleClickConfig = 'autosize';

            for(i = 0; i < axList.length; i++) {
                ax = axList[i];
                if((ax._rangeInitial && (
                        ax.range[0] !== ax._rangeInitial[0] ||
                        ax.range[1] !== ax._rangeInitial[1]
                    )) ||
                    (!ax._rangeInitial && !ax.autorange)
                ) {
                    doubleClickConfig = 'reset';
                    break;
                }
            }
        }

        if(doubleClickConfig === 'autosize') {
            // don't set the linked axes here, so relayout marks them as shrinkable
            // and we autosize just to the requested axis/axes
            for(i = 0; i < axList.length; i++) {
                ax = axList[i];
                if(!ax.fixedrange) attrs[ax._name + '.autorange'] = true;
            }
        } else if(doubleClickConfig === 'reset') {
            // when we're resetting, reset all linked axes too, so we get back
            // to the fully-auto-with-constraints situation
            if(xActive || links.isSubplotConstrained) axList = axList.concat(links.xaxes);
            if(yActive && !links.isSubplotConstrained) axList = axList.concat(links.yaxes);

            if(links.isSubplotConstrained) {
                if(!xActive) axList = axList.concat(xaxes);
                else if(!yActive) axList = axList.concat(yaxes);
            }

            for(i = 0; i < axList.length; i++) {
                ax = axList[i];

                if(!ax.fixedrange) {
                    if(!ax._rangeInitial) {
                        attrs[ax._name + '.autorange'] = true;
                    } else {
                        rangeInitial = ax._rangeInitial;
                        attrs[ax._name + '.range[0]'] = rangeInitial[0];
                        attrs[ax._name + '.range[1]'] = rangeInitial[1];
                    }
                }
            }
        }

        gd.emit('plotly_doubleclick', null);
        Registry.call('_guiRelayout', gd, attrs);
    }

    // dragTail - finish a drag event with a redraw
    function dragTail() {
        // put the subplot viewboxes back to default (Because we're going to)
        // be repositioning the data in the relayout. But DON'T call
        // ticksAndAnnotations again - it's unnecessary and would overwrite `updates`
        updateSubplots([0, 0, pw, ph]);

        // since we may have been redrawing some things during the drag, we may have
        // accumulated MathJax promises - wait for them before we relayout.
        Lib.syncOrAsync([
            Plots.previousPromises,
            function() {
                gd._fullLayout._replotting = false;
                Registry.call('_guiRelayout', gd, updates);
            }
        ], gd);
    }

    // updateSubplots - find all plot viewboxes that should be
    // affected by this drag, and update them. look for all plots
    // sharing an affected axis (including the one being dragged),
    // includes also scattergl and splom logic.
    function updateSubplots(viewBox) {
        var fullLayout = gd._fullLayout;
        var plotinfos = fullLayout._plots;
        var subplots = fullLayout._subplots.cartesian;
        var i, sp, xa, ya;

        if(hasSplom) {
            Registry.subplotsRegistry.splom.drag(gd);
        }

        if(hasScatterGl) {
            for(i = 0; i < subplots.length; i++) {
                sp = plotinfos[subplots[i]];
                xa = sp.xaxis;
                ya = sp.yaxis;

                if(sp._scene) {
                    var xrng = Lib.simpleMap(xa.range, xa.r2l);
                    var yrng = Lib.simpleMap(ya.range, ya.r2l);
                    sp._scene.update({range: [xrng[0], yrng[0], xrng[1], yrng[1]]});
                }
            }
        }

        if(hasSplom || hasScatterGl) {
            clearGlCanvases(gd);
            redrawReglTraces(gd);
        }

        if(hasSVG) {
            var xScaleFactor = viewBox[2] / xa0._length;
            var yScaleFactor = viewBox[3] / ya0._length;

            for(i = 0; i < subplots.length; i++) {
                sp = plotinfos[subplots[i]];
                xa = sp.xaxis;
                ya = sp.yaxis;

                var editX2 = editX && !xa.fixedrange && xaHash[xa._id];
                var editY2 = editY && !ya.fixedrange && yaHash[ya._id];

                var xScaleFactor2, yScaleFactor2;
                var clipDx, clipDy;

                if(editX2) {
                    xScaleFactor2 = xScaleFactor;
                    clipDx = ew ? viewBox[0] : getShift(xa, xScaleFactor2);
                } else if(matches.xaHash[xa._id]) {
                    xScaleFactor2 = xScaleFactor;
                    clipDx = viewBox[0] * xa._length / xa0._length;
                } else if(matches.yaHash[xa._id]) {
                    xScaleFactor2 = yScaleFactor;
                    clipDx = yActive === 'ns' ?
                        -viewBox[1] * xa._length / ya0._length :
                        getShift(xa, xScaleFactor2, {n: 'top', s: 'bottom'}[yActive]);
                } else {
                    xScaleFactor2 = getLinkedScaleFactor(xa, xScaleFactor, yScaleFactor);
                    clipDx = scaleAndGetShift(xa, xScaleFactor2);
                }

                if(editY2) {
                    yScaleFactor2 = yScaleFactor;
                    clipDy = ns ? viewBox[1] : getShift(ya, yScaleFactor2);
                } else if(matches.yaHash[ya._id]) {
                    yScaleFactor2 = yScaleFactor;
                    clipDy = viewBox[1] * ya._length / ya0._length;
                } else if(matches.xaHash[ya._id]) {
                    yScaleFactor2 = xScaleFactor;
                    clipDy = xActive === 'ew' ?
                        -viewBox[0] * ya._length / xa0._length :
                        getShift(ya, yScaleFactor2, {e: 'right', w: 'left'}[xActive]);
                } else {
                    yScaleFactor2 = getLinkedScaleFactor(ya, xScaleFactor, yScaleFactor);
                    clipDy = scaleAndGetShift(ya, yScaleFactor2);
                }

                // don't scale at all if neither axis is scalable here
                if(!xScaleFactor2 && !yScaleFactor2) {
                    continue;
                }

                // but if only one is, reset the other axis scaling
                if(!xScaleFactor2) xScaleFactor2 = 1;
                if(!yScaleFactor2) yScaleFactor2 = 1;

                var plotDx = xa._offset - clipDx / xScaleFactor2;
                var plotDy = ya._offset - clipDy / yScaleFactor2;

                // TODO could be more efficient here:
                // setTranslate and setScale do a lot of extra work
                // when working independently, should perhaps combine
                // them into a single routine.
                sp.clipRect
                    .call(Drawing.setTranslate, clipDx, clipDy)
                    .call(Drawing.setScale, xScaleFactor2, yScaleFactor2);

                sp.plot
                    .call(Drawing.setTranslate, plotDx, plotDy)
                    .call(Drawing.setScale, 1 / xScaleFactor2, 1 / yScaleFactor2);

                // apply an inverse scale to individual points to counteract
                // the scale of the trace group.
                // apply only when scale changes, as adjusting the scale of
                // all the points can be expansive.
                if(xScaleFactor2 !== sp.xScaleFactor || yScaleFactor2 !== sp.yScaleFactor) {
                    Drawing.setPointGroupScale(sp.zoomScalePts, xScaleFactor2, yScaleFactor2);
                    Drawing.setTextPointsScale(sp.zoomScaleTxt, xScaleFactor2, yScaleFactor2);
                }

                Drawing.hideOutsideRangePoints(sp.clipOnAxisFalseTraces, sp);

                // update x/y scaleFactor stash
                sp.xScaleFactor = xScaleFactor2;
                sp.yScaleFactor = yScaleFactor2;
            }
        }
    }

    // Find the appropriate scaling for this axis, if it's linked to the
    // dragged axes by constraints. 0 is special, it means this axis shouldn't
    // ever be scaled (will be converted to 1 if the other axis is scaled)
    function getLinkedScaleFactor(ax, xScaleFactor, yScaleFactor) {
        if(ax.fixedrange) return 0;

        if(editX && links.xaHash[ax._id]) {
            return xScaleFactor;
        }
        if(editY && (links.isSubplotConstrained ? links.xaHash : links.yaHash)[ax._id]) {
            return yScaleFactor;
        }
        return 0;
    }

    function scaleAndGetShift(ax, scaleFactor) {
        if(scaleFactor) {
            ax.range = ax._r.slice();
            scaleZoom(ax, scaleFactor);
            return getShift(ax, scaleFactor);
        }
        return 0;
    }

    function getShift(ax, scaleFactor, from) {
        return ax._length * (1 - scaleFactor) * FROM_TL[from || ax.constraintoward || 'middle'];
    }

    return dragger;
}

function makeDragger(plotinfo, nodeName, dragClass, cursor) {
    var dragger3 = Lib.ensureSingle(plotinfo.draglayer, nodeName, dragClass, function(s) {
        s.classed('drag', true)
            .style({fill: 'transparent', 'stroke-width': 0})
            .attr('data-subplot', plotinfo.id);
    });

    dragger3.call(setCursor, cursor);

    return dragger3.node();
}

function makeRectDragger(plotinfo, dragClass, cursor, x, y, w, h) {
    var dragger = makeDragger(plotinfo, 'rect', dragClass, cursor);
    d3.select(dragger).call(Drawing.setRect, x, y, w, h);
    return dragger;
}

function isDirectionActive(axList, activeVal) {
    for(var i = 0; i < axList.length; i++) {
        if(!axList[i].fixedrange) return activeVal;
    }
    return '';
}

function getEndText(ax, end) {
    var initialVal = ax.range[end];
    var diff = Math.abs(initialVal - ax.range[1 - end]);
    var dig;

    // TODO: this should basically be ax.r2d but we're doing extra
    // rounding here... can we clean up at all?
    if(ax.type === 'date') {
        return initialVal;
    } else if(ax.type === 'log') {
        dig = Math.ceil(Math.max(0, -Math.log(diff) / Math.LN10)) + 3;
        return d3.format('.' + dig + 'g')(Math.pow(10, initialVal));
    } else { // linear numeric (or category... but just show numbers here)
        dig = Math.floor(Math.log(Math.abs(initialVal)) / Math.LN10) -
            Math.floor(Math.log(diff) / Math.LN10) + 4;
        return d3.format('.' + String(dig) + 'g')(initialVal);
    }
}

function zoomAxRanges(axList, r0Fraction, r1Fraction, updates, linkedAxes) {
    for(var i = 0; i < axList.length; i++) {
        var axi = axList[i];
        if(axi.fixedrange) continue;

        if(axi.rangebreaks) {
            var isY = axi._id.charAt(0) === 'y';
            var r0F = isY ? (1 - r0Fraction) : r0Fraction;
            var r1F = isY ? (1 - r1Fraction) : r1Fraction;

            updates[axi._name + '.range[0]'] = axi.l2r(axi.p2l(r0F * axi._length));
            updates[axi._name + '.range[1]'] = axi.l2r(axi.p2l(r1F * axi._length));
        } else {
            var axRangeLinear0 = axi._rl[0];
            var axRangeLinearSpan = axi._rl[1] - axRangeLinear0;
            updates[axi._name + '.range[0]'] = axi.l2r(axRangeLinear0 + axRangeLinearSpan * r0Fraction);
            updates[axi._name + '.range[1]'] = axi.l2r(axRangeLinear0 + axRangeLinearSpan * r1Fraction);
        }
    }

    // zoom linked axes about their centers
    if(linkedAxes && linkedAxes.length) {
        var linkedR0Fraction = (r0Fraction + (1 - r1Fraction)) / 2;
        zoomAxRanges(linkedAxes, linkedR0Fraction, 1 - linkedR0Fraction, updates, []);
    }
}

function dragAxList(axList, pix) {
    for(var i = 0; i < axList.length; i++) {
        var axi = axList[i];
        if(!axi.fixedrange) {
            if(axi.rangebreaks) {
                var p0 = 0;
                var p1 = axi._length;
                var d0 = axi.p2l(p0 + pix) - axi.p2l(p0);
                var d1 = axi.p2l(p1 + pix) - axi.p2l(p1);
                var delta = (d0 + d1) / 2;

                axi.range = [
                    axi.l2r(axi._rl[0] - delta),
                    axi.l2r(axi._rl[1] - delta)
                ];
            } else {
                axi.range = [
                    axi.l2r(axi._rl[0] - pix / axi._m),
                    axi.l2r(axi._rl[1] - pix / axi._m)
                ];
            }
        }
    }
}

// common transform for dragging one end of an axis
// d>0 is compressing scale (cursor is over the plot,
//  the axis end should move with the cursor)
// d<0 is expanding (cursor is off the plot, axis end moves
//  nonlinearly so you can expand far)
function dZoom(d) {
    return 1 - ((d >= 0) ? Math.min(d, 0.9) :
        1 / (1 / Math.max(d, -0.3) + 3.222));
}

function getDragCursor(nsew, dragmode, isMainDrag) {
    if(!nsew) return 'pointer';
    if(nsew === 'nsew') {
        // in this case here, clear cursor and
        // use the cursor style set on <g .draglayer>
        if(isMainDrag) return '';
        if(dragmode === 'pan') return 'move';
        return 'crosshair';
    }
    return nsew.toLowerCase() + '-resize';
}

function makeZoombox(zoomlayer, lum, xs, ys, path0) {
    return zoomlayer.append('path')
        .attr('class', 'zoombox')
        .style({
            'fill': lum > 0.2 ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)',
            'stroke-width': 0
        })
        .attr('transform', 'translate(' + xs + ', ' + ys + ')')
        .attr('d', path0 + 'Z');
}

function makeCorners(zoomlayer, xs, ys) {
    return zoomlayer.append('path')
        .attr('class', 'zoombox-corners')
        .style({
            fill: Color.background,
            stroke: Color.defaultLine,
            'stroke-width': 1,
            opacity: 0
        })
        .attr('transform', 'translate(' + xs + ', ' + ys + ')')
        .attr('d', 'M0,0Z');
}

function updateZoombox(zb, corners, box, path0, dimmed, lum) {
    zb.attr('d',
        path0 + 'M' + (box.l) + ',' + (box.t) + 'v' + (box.h) +
        'h' + (box.w) + 'v-' + (box.h) + 'h-' + (box.w) + 'Z');
    transitionZoombox(zb, corners, dimmed, lum);
}

function transitionZoombox(zb, corners, dimmed, lum) {
    if(!dimmed) {
        zb.transition()
            .style('fill', lum > 0.2 ? 'rgba(0,0,0,0.4)' :
                'rgba(255,255,255,0.3)')
            .duration(200);
        corners.transition()
            .style('opacity', 1)
            .duration(200);
    }
}

function removeZoombox(gd) {
    d3.select(gd)
        .selectAll('.zoombox,.js-zoombox-backdrop,.js-zoombox-menu,.zoombox-corners')
        .remove();
}

function showDoubleClickNotifier(gd) {
    if(SHOWZOOMOUTTIP && gd.data && gd._context.showTips) {
        Lib.notifier(Lib._(gd, 'Double-click to zoom back out'), 'long');
        SHOWZOOMOUTTIP = false;
    }
}

function xCorners(box, y0) {
    return 'M' +
        (box.l - 0.5) + ',' + (y0 - MINZOOM - 0.5) +
        'h-3v' + (2 * MINZOOM + 1) + 'h3ZM' +
        (box.r + 0.5) + ',' + (y0 - MINZOOM - 0.5) +
        'h3v' + (2 * MINZOOM + 1) + 'h-3Z';
}

function yCorners(box, x0) {
    return 'M' +
        (x0 - MINZOOM - 0.5) + ',' + (box.t - 0.5) +
        'v-3h' + (2 * MINZOOM + 1) + 'v3ZM' +
        (x0 - MINZOOM - 0.5) + ',' + (box.b + 0.5) +
        'v3h' + (2 * MINZOOM + 1) + 'v-3Z';
}

function xyCorners(box) {
    var clen = Math.floor(Math.min(box.b - box.t, box.r - box.l, MINZOOM) / 2);
    return 'M' +
        (box.l - 3.5) + ',' + (box.t - 0.5 + clen) + 'h3v' + (-clen) +
            'h' + clen + 'v-3h-' + (clen + 3) + 'ZM' +
        (box.r + 3.5) + ',' + (box.t - 0.5 + clen) + 'h-3v' + (-clen) +
            'h' + (-clen) + 'v-3h' + (clen + 3) + 'ZM' +
        (box.r + 3.5) + ',' + (box.b + 0.5 - clen) + 'h-3v' + clen +
            'h' + (-clen) + 'v3h' + (clen + 3) + 'ZM' +
        (box.l - 3.5) + ',' + (box.b + 0.5 - clen) + 'h3v' + clen +
            'h' + clen + 'v3h-' + (clen + 3) + 'Z';
}

function calcLinks(gd, groups, xaHash, yaHash) {
    var isSubplotConstrained = false;
    var xLinks = {};
    var yLinks = {};
    var xID, yID, xLinkID, yLinkID;

    for(var i = 0; i < groups.length; i++) {
        var group = groups[i];
        // check if any of the x axes we're dragging is in this constraint group
        for(xID in xaHash) {
            if(group[xID]) {
                // put the rest of these axes into xLinks, if we're not already
                // dragging them, so we know to scale these axes automatically too
                // to match the changes in the dragged x axes
                for(xLinkID in group) {
                    if(!(xLinkID.charAt(0) === 'x' ? xaHash : yaHash)[xLinkID]) {
                        xLinks[xLinkID] = xID;
                    }
                }

                // check if the x and y axes of THIS drag are linked
                for(yID in yaHash) {
                    if(group[yID]) isSubplotConstrained = true;
                }
            }
        }

        // now check if any of the y axes we're dragging is in this constraint group
        // only look for outside links, as we've already checked for links within the dragger
        for(yID in yaHash) {
            if(group[yID]) {
                for(yLinkID in group) {
                    if(!(yLinkID.charAt(0) === 'x' ? xaHash : yaHash)[yLinkID]) {
                        yLinks[yLinkID] = yID;
                    }
                }
            }
        }
    }

    if(isSubplotConstrained) {
        // merge xLinks and yLinks if the subplot is constrained,
        // since we'll always apply both anyway and the two will contain
        // duplicates
        Lib.extendFlat(xLinks, yLinks);
        yLinks = {};
    }

    var xaHashLinked = {};
    var xaxesLinked = [];
    for(xLinkID in xLinks) {
        var xa = getFromId(gd, xLinkID);
        xaxesLinked.push(xa);
        xaHashLinked[xa._id] = xa;
    }

    var yaHashLinked = {};
    var yaxesLinked = [];
    for(yLinkID in yLinks) {
        var ya = getFromId(gd, yLinkID);
        yaxesLinked.push(ya);
        yaHashLinked[ya._id] = ya;
    }

    return {
        xaHash: xaHashLinked,
        yaHash: yaHashLinked,
        xaxes: xaxesLinked,
        yaxes: yaxesLinked,
        xLinks: xLinks,
        yLinks: yLinks,
        isSubplotConstrained: isSubplotConstrained
    };
}

// still seems to be some confusion about onwheel vs onmousewheel...
function attachWheelEventHandler(element, handler) {
    if(!supportsPassive) {
        if(element.onwheel !== undefined) element.onwheel = handler;
        else if(element.onmousewheel !== undefined) element.onmousewheel = handler;
        else if(!element.isAddedWheelEvent) {
            element.isAddedWheelEvent = true;
            element.addEventListener('wheel', handler, {passive: false});
        }
    } else {
        var wheelEventName = element.onwheel !== undefined ? 'wheel' : 'mousewheel';

        if(element._onwheel) {
            element.removeEventListener(wheelEventName, element._onwheel);
        }
        element._onwheel = handler;

        element.addEventListener(wheelEventName, handler, {passive: false});
    }
}

function hashValues(hash) {
    var out = [];
    for(var k in hash) out.push(hash[k]);
    return out;
}

module.exports = {
    makeDragBox: makeDragBox,

    makeDragger: makeDragger,
    makeRectDragger: makeRectDragger,
    makeZoombox: makeZoombox,
    makeCorners: makeCorners,

    updateZoombox: updateZoombox,
    xyCorners: xyCorners,
    transitionZoombox: transitionZoombox,
    removeZoombox: removeZoombox,
    showDoubleClickNotifier: showDoubleClickNotifier,

    attachWheelEventHandler: attachWheelEventHandler
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/graph_interact.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/graph_interact.js ***!
  \**********************************************************************/
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

var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var dragElement = __webpack_require__(/*! ../../components/dragelement */ "./node_modules/plotly.js/src/components/dragelement/index.js");
var setCursor = __webpack_require__(/*! ../../lib/setcursor */ "./node_modules/plotly.js/src/lib/setcursor.js");

var makeDragBox = __webpack_require__(/*! ./dragbox */ "./node_modules/plotly.js/src/plots/cartesian/dragbox.js").makeDragBox;
var DRAGGERSIZE = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js").DRAGGERSIZE;

exports.initInteractions = function initInteractions(gd) {
    var fullLayout = gd._fullLayout;

    if(gd._context.staticPlot) {
        // this sweeps up more than just cartesian drag elements...
        d3.select(gd).selectAll('.drag').remove();
        return;
    }

    if(!fullLayout._has('cartesian') && !fullLayout._has('splom')) return;

    var subplots = Object.keys(fullLayout._plots || {}).sort(function(a, b) {
        // sort overlays last, then by x axis number, then y axis number
        if((fullLayout._plots[a].mainplot && true) ===
            (fullLayout._plots[b].mainplot && true)) {
            var aParts = a.split('y');
            var bParts = b.split('y');
            return (aParts[0] === bParts[0]) ?
                (Number(aParts[1] || 1) - Number(bParts[1] || 1)) :
                (Number(aParts[0] || 1) - Number(bParts[0] || 1));
        }
        return fullLayout._plots[a].mainplot ? 1 : -1;
    });

    subplots.forEach(function(subplot) {
        var plotinfo = fullLayout._plots[subplot];
        var xa = plotinfo.xaxis;
        var ya = plotinfo.yaxis;

        // main and corner draggers need not be repeated for
        // overlaid subplots - these draggers drag them all
        if(!plotinfo.mainplot) {
            // main dragger goes over the grids and data, so we use its
            // mousemove events for all data hover effects
            var maindrag = makeDragBox(gd, plotinfo, xa._offset, ya._offset,
                xa._length, ya._length, 'ns', 'ew');

            maindrag.onmousemove = function(evt) {
                // This is on `gd._fullLayout`, *not* fullLayout because the reference
                // changes by the time this is called again.
                gd._fullLayout._rehover = function() {
                    if((gd._fullLayout._hoversubplot === subplot) && gd._fullLayout._plots[subplot]) {
                        Fx.hover(gd, evt, subplot);
                    }
                };

                Fx.hover(gd, evt, subplot);

                // Note that we have *not* used the cached fullLayout variable here
                // since that may be outdated when this is called as a callback later on
                gd._fullLayout._lasthover = maindrag;
                gd._fullLayout._hoversubplot = subplot;
            };

            /*
             * IMPORTANT:
             * We must check for the presence of the drag cover here.
             * If we don't, a 'mouseout' event is triggered on the
             * maindrag before each 'click' event, which has the effect
             * of clearing the hoverdata; thus, cancelling the click event.
             */
            maindrag.onmouseout = function(evt) {
                if(gd._dragging) return;

                // When the mouse leaves this maindrag, unset the hovered subplot.
                // This may cause problems if it leaves the subplot directly *onto*
                // another subplot, but that's a tiny corner case at the moment.
                gd._fullLayout._hoversubplot = null;

                dragElement.unhover(gd, evt);
            };

            // corner draggers
            if(gd._context.showAxisDragHandles) {
                makeDragBox(gd, plotinfo, xa._offset - DRAGGERSIZE, ya._offset - DRAGGERSIZE,
                    DRAGGERSIZE, DRAGGERSIZE, 'n', 'w');
                makeDragBox(gd, plotinfo, xa._offset + xa._length, ya._offset - DRAGGERSIZE,
                    DRAGGERSIZE, DRAGGERSIZE, 'n', 'e');
                makeDragBox(gd, plotinfo, xa._offset - DRAGGERSIZE, ya._offset + ya._length,
                    DRAGGERSIZE, DRAGGERSIZE, 's', 'w');
                makeDragBox(gd, plotinfo, xa._offset + xa._length, ya._offset + ya._length,
                    DRAGGERSIZE, DRAGGERSIZE, 's', 'e');
            }
        }
        if(gd._context.showAxisDragHandles) {
            // x axis draggers - if you have overlaid plots,
            // these drag each axis separately
            if(subplot === xa._mainSubplot) {
                // the y position of the main x axis line
                var y0 = xa._mainLinePosition;
                if(xa.side === 'top') y0 -= DRAGGERSIZE;
                makeDragBox(gd, plotinfo, xa._offset + xa._length * 0.1, y0,
                    xa._length * 0.8, DRAGGERSIZE, '', 'ew');
                makeDragBox(gd, plotinfo, xa._offset, y0,
                    xa._length * 0.1, DRAGGERSIZE, '', 'w');
                makeDragBox(gd, plotinfo, xa._offset + xa._length * 0.9, y0,
                    xa._length * 0.1, DRAGGERSIZE, '', 'e');
            }
            // y axis draggers
            if(subplot === ya._mainSubplot) {
                // the x position of the main y axis line
                var x0 = ya._mainLinePosition;
                if(ya.side !== 'right') x0 -= DRAGGERSIZE;
                makeDragBox(gd, plotinfo, x0, ya._offset + ya._length * 0.1,
                    DRAGGERSIZE, ya._length * 0.8, 'ns', '');
                makeDragBox(gd, plotinfo, x0, ya._offset + ya._length * 0.9,
                    DRAGGERSIZE, ya._length * 0.1, 's', '');
                makeDragBox(gd, plotinfo, x0, ya._offset,
                    DRAGGERSIZE, ya._length * 0.1, 'n', '');
            }
        }
    });

    // In case you mousemove over some hovertext, send it to Fx.hover too
    // we do this so that we can put the hover text in front of everything,
    // but still be able to interact with everything as if it isn't there
    var hoverLayer = fullLayout._hoverlayer.node();

    hoverLayer.onmousemove = function(evt) {
        evt.target = gd._fullLayout._lasthover;
        Fx.hover(gd, evt, fullLayout._hoversubplot);
    };

    hoverLayer.onclick = function(evt) {
        evt.target = gd._fullLayout._lasthover;
        Fx.click(gd, evt);
    };

    // also delegate mousedowns... TODO: does this actually work?
    hoverLayer.onmousedown = function(evt) {
        gd._fullLayout._lasthover.onmousedown(evt);
    };

    exports.updateFx(gd);
};

// Minimal set of update needed on 'modebar' edits.
// We only need to update the <g .draglayer> cursor style.
//
// Note that changing the axis configuration and/or the fixedrange attribute
// should trigger a full initInteractions.
exports.updateFx = function(gd) {
    var fullLayout = gd._fullLayout;
    var cursor = fullLayout.dragmode === 'pan' ? 'move' : 'crosshair';
    setCursor(fullLayout._draggers, cursor);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL2RyYWdib3guanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2NhcnRlc2lhbi9ncmFwaF9pbnRlcmFjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsZ0JBQWdCLG1CQUFPLENBQUMsMERBQVk7QUFDcEMsc0JBQXNCLG1CQUFPLENBQUMsc0VBQW9COztBQUVsRCxlQUFlLG1CQUFPLENBQUMsZ0VBQWdCO0FBQ3ZDLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixtQkFBbUIsbUJBQU8sQ0FBQyxvRkFBMEI7QUFDckQsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxjQUFjLG1CQUFPLENBQUMsMEZBQTBCO0FBQ2hELFNBQVMsbUJBQU8sQ0FBQyxnRkFBcUI7QUFDdEMsV0FBVyxtQkFBTyxDQUFDLG9FQUFRO0FBQzNCLGdCQUFnQixtQkFBTyxDQUFDLDBFQUFxQjtBQUM3QyxrQkFBa0IsbUJBQU8sQ0FBQyxrR0FBOEI7QUFDeEQsY0FBYyxtQkFBTyxDQUFDLDRHQUFzQztBQUM1RDtBQUNBOztBQUVBLGNBQWMsbUhBQTRDO0FBQzFELHNCQUFzQixtQkFBTyxDQUFDLDBGQUE2QjtBQUMzRCx1QkFBdUIsOEhBQXNEOztBQUU3RSxZQUFZLG1CQUFPLENBQUMsNkRBQVU7O0FBRTlCLGdCQUFnQiwyR0FBK0I7QUFDL0MsaUJBQWlCLHdHQUE4QjtBQUMvQyxrQkFBa0IseUdBQStCO0FBQ2pELG9CQUFvQiwyR0FBaUM7QUFDckQsZ0JBQWdCLG1CQUFPLENBQUMsZ0ZBQWM7O0FBRXRDLGdCQUFnQixtQkFBTyxDQUFDLDhFQUFhO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxXQUFXO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsV0FBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtB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MEVBQXFCOztBQUU3QyxrQkFBa0IsMkdBQWdDO0FBQ2xELGtCQUFrQiwrR0FBa0M7O0FBRXBELHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ3YTY5OGYxZjkyZjM2M2VlZWVmNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciB0aW55Y29sb3IgPSByZXF1aXJlKCd0aW55Y29sb3IyJyk7XG52YXIgc3VwcG9ydHNQYXNzaXZlID0gcmVxdWlyZSgnaGFzLXBhc3NpdmUtZXZlbnRzJyk7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgc3ZnVGV4dFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vbGliL3N2Z190ZXh0X3V0aWxzJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIEZ4ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meCcpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuL2F4ZXMnKTtcbnZhciBzZXRDdXJzb3IgPSByZXF1aXJlKCcuLi8uLi9saWIvc2V0Y3Vyc29yJyk7XG52YXIgZHJhZ0VsZW1lbnQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYWdlbGVtZW50Jyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhZ2VsZW1lbnQvaGVscGVycycpO1xudmFyIHNlbGVjdGluZ09yRHJhd2luZyA9IGhlbHBlcnMuc2VsZWN0aW5nT3JEcmF3aW5nO1xudmFyIGZyZWVNb2RlID0gaGVscGVycy5mcmVlTW9kZTtcblxudmFyIEZST01fVEwgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvYWxpZ25tZW50JykuRlJPTV9UTDtcbnZhciBjbGVhckdsQ2FudmFzZXMgPSByZXF1aXJlKCcuLi8uLi9saWIvY2xlYXJfZ2xfY2FudmFzZXMnKTtcbnZhciByZWRyYXdSZWdsVHJhY2VzID0gcmVxdWlyZSgnLi4vLi4vcGxvdF9hcGkvc3Vicm91dGluZXMnKS5yZWRyYXdSZWdsVHJhY2VzO1xuXG52YXIgUGxvdHMgPSByZXF1aXJlKCcuLi9wbG90cycpO1xuXG52YXIgZ2V0RnJvbUlkID0gcmVxdWlyZSgnLi9heGlzX2lkcycpLmdldEZyb21JZDtcbnZhciBwcmVwU2VsZWN0ID0gcmVxdWlyZSgnLi9zZWxlY3QnKS5wcmVwU2VsZWN0O1xudmFyIGNsZWFyU2VsZWN0ID0gcmVxdWlyZSgnLi9zZWxlY3QnKS5jbGVhclNlbGVjdDtcbnZhciBzZWxlY3RPbkNsaWNrID0gcmVxdWlyZSgnLi9zZWxlY3QnKS5zZWxlY3RPbkNsaWNrO1xudmFyIHNjYWxlWm9vbSA9IHJlcXVpcmUoJy4vc2NhbGVfem9vbScpO1xuXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbnZhciBNSU5EUkFHID0gY29uc3RhbnRzLk1JTkRSQUc7XG52YXIgTUlOWk9PTSA9IGNvbnN0YW50cy5NSU5aT09NO1xuXG4vLyBmbGFnIGZvciBzaG93aW5nIFwiZG91YmxlY2xpY2sgdG8gem9vbSBvdXRcIiBvbmx5IGF0IHRoZSBiZWdpbm5pbmdcbnZhciBTSE9XWk9PTU9VVFRJUCA9IHRydWU7XG5cbi8vIGRyYWdCb3g6IGNyZWF0ZSBhbiBlbGVtZW50IHRvIGRyYWcgb25lIG9yIG1vcmUgYXhpcyBlbmRzXG4vLyBpbnB1dHM6XG4vLyAgICAgIHBsb3RpbmZvIC0gd2hpY2ggc3VicGxvdCBhcmUgd2UgbWFraW5nIGRyYWdib3hlcyBvbj9cbi8vICAgICAgeCx5LHcsaCAtIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCBvZiB0aGUgYm94XG4vLyAgICAgIG5zIC0gaG93IGRvZXMgdGhpcyBkcmFnIHRoZSB2ZXJ0aWNhbCBheGlzP1xuLy8gICAgICAgICAgJ24nIC0gdG9wIG9ubHlcbi8vICAgICAgICAgICdzJyAtIGJvdHRvbSBvbmx5XG4vLyAgICAgICAgICAnbnMnIC0gdG9wIGFuZCBib3R0b20gdG9nZXRoZXIsIGRpZmZlcmVuY2UgdW5jaGFuZ2VkXG4vLyAgICAgIGV3IC0gc2FtZSBmb3IgaG9yaXpvbnRhbCBheGlzXG5mdW5jdGlvbiBtYWtlRHJhZ0JveChnZCwgcGxvdGluZm8sIHgsIHksIHcsIGgsIG5zLCBldykge1xuICAgIC8vIG1vdXNlRG93biBzdG9yZXMgbXMgb2YgZmlyc3QgbW91c2Vkb3duIGV2ZW50IGluIHRoZSBsYXN0XG4gICAgLy8gYGdkLl9jb250ZXh0LmRvdWJsZUNsaWNrRGVsYXlgIG1zIG9uIHRoZSBkcmFnIGJhcnNcbiAgICAvLyBudW1DbGlja3Mgc3RvcmVzIGhvdyBtYW55IG1vdXNlZG93bnMgaGF2ZSBiZWVuIHNlZW5cbiAgICAvLyB3aXRoaW4gYGdkLl9jb250ZXh0LmRvdWJsZUNsaWNrRGVsYXlgIHNvIHdlIGNhbiBjaGVjayBmb3IgY2xpY2sgb3IgZG91YmxlY2xpY2sgZXZlbnRzXG4gICAgLy8gZHJhZ2dlZCBzdG9yZXMgd2hldGhlciBhIGRyYWcgaGFzIG9jY3VycmVkLCBzbyB3ZSBkb24ndCBoYXZlIHRvXG4gICAgLy8gcmVkcmF3IHVubmVjZXNzYXJpbHksIGllIGlmIG5vIG1vdmUgYmlnZ2VyIHRoYW4gTUlORFJBRyBvciBNSU5aT09NIHB4XG4gICAgdmFyIHpvb21sYXllciA9IGdkLl9mdWxsTGF5b3V0Ll96b29tbGF5ZXI7XG4gICAgdmFyIGlzTWFpbkRyYWcgPSAobnMgKyBldyA9PT0gJ25zZXcnKTtcbiAgICB2YXIgc2luZ2xlRW5kID0gKG5zICsgZXcpLmxlbmd0aCA9PT0gMTtcblxuICAgIC8vIG1haW4gc3VicGxvdCB4IGFuZCB5IChpLmUuIGZvdW5kIGluIHBsb3RpbmZvIC0gdGhlIG1haW4gb25lcylcbiAgICB2YXIgeGEwLCB5YTA7XG4gICAgLy8ge2F4Ll9pZDogYXh9IGhhc2ggb2JqZWN0c1xuICAgIHZhciB4YUhhc2gsIHlhSGFzaDtcbiAgICAvLyB4YUhhc2gveWFIYXNoIHZhbHVlcyAoYXJyYXlzKVxuICAgIHZhciB4YXhlcywgeWF4ZXM7XG4gICAgLy8gbWFpbiBheGlzIG9mZnNldHNcbiAgICB2YXIgeHMsIHlzO1xuICAgIC8vIG1haW4gYXhpcyBsZW5ndGhzXG4gICAgdmFyIHB3LCBwaDtcbiAgICAvLyBjb250YWlucyBrZXlzICd4YUhhc2gnLCAneWFIYXNoJywgJ3hheGVzJywgYW5kICd5YXhlcydcbiAgICAvLyB3aGljaCBhcmUgdGhlIHgveSB7YXguX2lkOiBheH0gaGFzaCBvYmplY3RzIGFuZCB0aGVpciB2YWx1ZXNcbiAgICAvLyBmb3IgbGlua2VkIGF4aXMgcmVsYXRpdmUgdG8gdGhpcyBzdWJwbG90XG4gICAgdmFyIGxpbmtzO1xuICAgIC8vIHNpbWlsYXIgdG8gYGxpbmtzYCBidXQgZm9yIG1hdGNoaW5nIGF4ZXNcbiAgICB2YXIgbWF0Y2hlcztcbiAgICAvLyBzZXQgdG8gZXcvbnMgdmFsIHdoZW4gYWN0aXZlLCBzZXQgdG8gJycgd2hlbiBpbmFjdGl2ZVxuICAgIHZhciB4QWN0aXZlLCB5QWN0aXZlO1xuICAgIC8vIGFyZSBhbGwgYXhlcyBpbiB0aGlzIHN1YnBsb3QgYXJlIGZpeGVkP1xuICAgIHZhciBhbGxGaXhlZFJhbmdlcztcbiAgICAvLyBkbyB3ZSBuZWVkIHRvIGVkaXQgeC95IHJhbmdlcz9cbiAgICB2YXIgZWRpdFgsIGVkaXRZO1xuICAgIC8vIGdyYXBoLXdpZGUgb3B0aW1pemF0aW9uIGZsYWdzXG4gICAgdmFyIGhhc1NjYXR0ZXJHbCwgaGFzU3Bsb20sIGhhc1NWRztcbiAgICAvLyBjb2xsZWN0ZWQgY2hhbmdlcyB0byBiZSBtYWRlIHRvIHRoZSBwbG90IGJ5IHJlbGF5b3V0IGF0IHRoZSBlbmRcbiAgICB2YXIgdXBkYXRlcztcblxuICAgIGZ1bmN0aW9uIHJlY29tcHV0ZUF4aXNMaXN0cygpIHtcbiAgICAgICAgeGEwID0gcGxvdGluZm8ueGF4aXM7XG4gICAgICAgIHlhMCA9IHBsb3RpbmZvLnlheGlzO1xuICAgICAgICBwdyA9IHhhMC5fbGVuZ3RoO1xuICAgICAgICBwaCA9IHlhMC5fbGVuZ3RoO1xuICAgICAgICB4cyA9IHhhMC5fb2Zmc2V0O1xuICAgICAgICB5cyA9IHlhMC5fb2Zmc2V0O1xuXG4gICAgICAgIHhhSGFzaCA9IHt9O1xuICAgICAgICB4YUhhc2hbeGEwLl9pZF0gPSB4YTA7XG4gICAgICAgIHlhSGFzaCA9IHt9O1xuICAgICAgICB5YUhhc2hbeWEwLl9pZF0gPSB5YTA7XG5cbiAgICAgICAgLy8gaWYgd2UncmUgZHJhZ2dpbmcgdHdvIGF4ZXMgYXQgb25jZSwgYWxzbyBkcmFnIG92ZXJsYXlzXG4gICAgICAgIGlmKG5zICYmIGV3KSB7XG4gICAgICAgICAgICB2YXIgb3ZlcmxheXMgPSBwbG90aW5mby5vdmVybGF5cztcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvdmVybGF5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB4YSA9IG92ZXJsYXlzW2ldLnhheGlzO1xuICAgICAgICAgICAgICAgIHhhSGFzaFt4YS5faWRdID0geGE7XG4gICAgICAgICAgICAgICAgdmFyIHlhID0gb3ZlcmxheXNbaV0ueWF4aXM7XG4gICAgICAgICAgICAgICAgeWFIYXNoW3lhLl9pZF0gPSB5YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHhheGVzID0gaGFzaFZhbHVlcyh4YUhhc2gpO1xuICAgICAgICB5YXhlcyA9IGhhc2hWYWx1ZXMoeWFIYXNoKTtcbiAgICAgICAgeEFjdGl2ZSA9IGlzRGlyZWN0aW9uQWN0aXZlKHhheGVzLCBldyk7XG4gICAgICAgIHlBY3RpdmUgPSBpc0RpcmVjdGlvbkFjdGl2ZSh5YXhlcywgbnMpO1xuICAgICAgICBhbGxGaXhlZFJhbmdlcyA9ICF5QWN0aXZlICYmICF4QWN0aXZlO1xuXG4gICAgICAgIGxpbmtzID0gY2FsY0xpbmtzKGdkLCBnZC5fZnVsbExheW91dC5fYXhpc0NvbnN0cmFpbnRHcm91cHMsIHhhSGFzaCwgeWFIYXNoKTtcbiAgICAgICAgbWF0Y2hlcyA9IGNhbGNMaW5rcyhnZCwgZ2QuX2Z1bGxMYXlvdXQuX2F4aXNNYXRjaEdyb3VwcywgeGFIYXNoLCB5YUhhc2gpO1xuICAgICAgICBlZGl0WCA9IGV3IHx8IGxpbmtzLmlzU3VicGxvdENvbnN0cmFpbmVkIHx8IG1hdGNoZXMuaXNTdWJwbG90Q29uc3RyYWluZWQ7XG4gICAgICAgIGVkaXRZID0gbnMgfHwgbGlua3MuaXNTdWJwbG90Q29uc3RyYWluZWQgfHwgbWF0Y2hlcy5pc1N1YnBsb3RDb25zdHJhaW5lZDtcblxuICAgICAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgICAgICBoYXNTY2F0dGVyR2wgPSBmdWxsTGF5b3V0Ll9oYXMoJ3NjYXR0ZXJnbCcpO1xuICAgICAgICBoYXNTcGxvbSA9IGZ1bGxMYXlvdXQuX2hhcygnc3Bsb20nKTtcbiAgICAgICAgaGFzU1ZHID0gZnVsbExheW91dC5faGFzKCdzdmcnKTtcbiAgICB9XG5cbiAgICByZWNvbXB1dGVBeGlzTGlzdHMoKTtcblxuICAgIHZhciBjdXJzb3IgPSBnZXREcmFnQ3Vyc29yKHlBY3RpdmUgKyB4QWN0aXZlLCBnZC5fZnVsbExheW91dC5kcmFnbW9kZSwgaXNNYWluRHJhZyk7XG4gICAgdmFyIGRyYWdnZXIgPSBtYWtlUmVjdERyYWdnZXIocGxvdGluZm8sIG5zICsgZXcgKyAnZHJhZycsIGN1cnNvciwgeCwgeSwgdywgaCk7XG5cbiAgICAvLyBzdGlsbCBuZWVkIHRvIG1ha2UgdGhlIGVsZW1lbnQgaWYgdGhlIGF4ZXMgYXJlIGRpc2FibGVkXG4gICAgLy8gYnV0IG51a2UgaXRzIGV2ZW50cyAoZXhjZXB0IGZvciBtYWluZHJhZyB3aGljaCBuZWVkcyB0aGVtIGZvciBob3ZlcilcbiAgICAvLyBhbmQgc3RvcCB0aGVyZVxuICAgIGlmKGFsbEZpeGVkUmFuZ2VzICYmICFpc01haW5EcmFnKSB7XG4gICAgICAgIGRyYWdnZXIub25tb3VzZWRvd24gPSBudWxsO1xuICAgICAgICBkcmFnZ2VyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgIHJldHVybiBkcmFnZ2VyO1xuICAgIH1cblxuICAgIHZhciBkcmFnT3B0aW9ucyA9IHtcbiAgICAgICAgZWxlbWVudDogZHJhZ2dlcixcbiAgICAgICAgZ2Q6IGdkLFxuICAgICAgICBwbG90aW5mbzogcGxvdGluZm9cbiAgICB9O1xuXG4gICAgZHJhZ09wdGlvbnMucHJlcEZuID0gZnVuY3Rpb24oZSwgc3RhcnRYLCBzdGFydFkpIHtcbiAgICAgICAgdmFyIGRyYWdNb2RlUHJldiA9IGRyYWdPcHRpb25zLmRyYWdtb2RlO1xuICAgICAgICB2YXIgZHJhZ01vZGVOb3cgPSBnZC5fZnVsbExheW91dC5kcmFnbW9kZTtcbiAgICAgICAgaWYoZHJhZ01vZGVOb3cgIT09IGRyYWdNb2RlUHJldikge1xuICAgICAgICAgICAgZHJhZ09wdGlvbnMuZHJhZ21vZGUgPSBkcmFnTW9kZU5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY29tcHV0ZUF4aXNMaXN0cygpO1xuXG4gICAgICAgIGlmKCFhbGxGaXhlZFJhbmdlcykge1xuICAgICAgICAgICAgaWYoaXNNYWluRHJhZykge1xuICAgICAgICAgICAgICAgIC8vIG1haW4gZHJhZ2dlciBoYW5kbGVzIGFsbCBkcmFnIG1vZGVzLCBhbmQgY2hhbmdlc1xuICAgICAgICAgICAgICAgIC8vIHRvIHBhbiAob3IgdG8gem9vbSBpZiBpdCBhbHJlYWR5IGlzIHBhbikgb24gc2hpZnRcbiAgICAgICAgICAgICAgICBpZihlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRyYWdNb2RlTm93ID09PSAncGFuJykgZHJhZ01vZGVOb3cgPSAnem9vbSc7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoIXNlbGVjdGluZ09yRHJhd2luZyhkcmFnTW9kZU5vdykpIGRyYWdNb2RlTm93ID0gJ3Bhbic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGUuY3RybEtleSkge1xuICAgICAgICAgICAgICAgICAgICBkcmFnTW9kZU5vdyA9ICdwYW4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYWxsIG90aGVyIGRyYWdnZXJzIGp1c3QgcGFuXG4gICAgICAgICAgICAgICAgZHJhZ01vZGVOb3cgPSAncGFuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGZyZWVNb2RlKGRyYWdNb2RlTm93KSkgZHJhZ09wdGlvbnMubWluRHJhZyA9IDE7XG4gICAgICAgIGVsc2UgZHJhZ09wdGlvbnMubWluRHJhZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZihzZWxlY3RpbmdPckRyYXdpbmcoZHJhZ01vZGVOb3cpKSB7XG4gICAgICAgICAgICBkcmFnT3B0aW9ucy54YXhlcyA9IHhheGVzO1xuICAgICAgICAgICAgZHJhZ09wdGlvbnMueWF4ZXMgPSB5YXhlcztcbiAgICAgICAgICAgIC8vIHRoaXMgYXR0YWNoZXMgbW92ZUZuLCBjbGlja0ZuLCBkb25lRm4gb24gZHJhZ09wdGlvbnNcbiAgICAgICAgICAgIHByZXBTZWxlY3QoZSwgc3RhcnRYLCBzdGFydFksIGRyYWdPcHRpb25zLCBkcmFnTW9kZU5vdyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmFnT3B0aW9ucy5jbGlja0ZuID0gY2xpY2tGbjtcbiAgICAgICAgICAgIGlmKHNlbGVjdGluZ09yRHJhd2luZyhkcmFnTW9kZVByZXYpKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBGaXggcG90ZW50aWFsIGJ1Z1xuICAgICAgICAgICAgICAgIC8vIE5vdGU6IGNsZWFyaW5nIC8gcmVzZXR0aW5nIHNlbGVjdGlvbiBzdGF0ZSBvbmx5IGhhcHBlbnMsIHdoZW4gdXNlclxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXJzIGF0IGxlYXN0IG9uZSBpbnRlcmFjdGlvbiBpbiBwYW4vem9vbSBtb2RlLiBPdGhlcndpc2UsIHRoZVxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdC9sYXNzbyBvdXRsaW5lcyBhcmUgZGVsZXRlZCAoaW4gcGxvdHMuanMuY2xlYW5QbG90KSBidXQgdGhlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIC8vIGNhY2hlIGlzbid0IGNsZWFyZWQuIFNvIHdoZW4gdGhlIHVzZXIgc3dpdGNoZXMgYmFjayB0byBzZWxlY3QvbGFzc28gYW5kXG4gICAgICAgICAgICAgICAgLy8gJ2FkZHMgdG8gYSBzZWxlY3Rpb24nIHdpdGggU2hpZnQsIHRoZSBcIm9sZFwiLCBzZWVtaW5nbHkgcmVtb3ZlZCBvdXRsaW5lc1xuICAgICAgICAgICAgICAgIC8vIGFyZSByZWRyYXduIGFnYWluIGJlY2F1c2UgdGhlIHNlbGVjdGlvbiBjYWNoZSBzdGlsbCBob2xkcyB0aGVpciBjb29yZGluYXRlcy5cbiAgICAgICAgICAgICAgICAvLyBIb3dldmVyLCB0aGlzIGlzbid0IGVhc2lseSBzb2x2ZWQsIHNpbmNlIHBsb3RzLmpzIHdvdWxkIG5lZWRcbiAgICAgICAgICAgICAgICAvLyB0byBoYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBkcmFnT3B0aW9ucyBvYmplY3QgKHdoaWNoIGhvbGRzIHRoZVxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBjYWNoZSkuXG4gICAgICAgICAgICAgICAgY2xlYXJBbmRSZXNldFNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighYWxsRml4ZWRSYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBpZihkcmFnTW9kZU5vdyA9PT0gJ3pvb20nKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdPcHRpb25zLm1vdmVGbiA9IHpvb21Nb3ZlO1xuICAgICAgICAgICAgICAgICAgICBkcmFnT3B0aW9ucy5kb25lRm4gPSB6b29tRG9uZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB6b29tTW92ZSB0YWtlcyBjYXJlIG9mIHRoZSB0aHJlc2hvbGQsIGJ1dCB3ZSBuZWVkIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIG1pbmltaXplIHRoaXMgc28gdGhhdCBjb25zdHJhaW5lZCB6b29tIGJveGVzIHdpbGwgZmxpcFxuICAgICAgICAgICAgICAgICAgICAvLyBvcmllbnRhdGlvbiBhdCB0aGUgcmlnaHQgcGxhY2VcbiAgICAgICAgICAgICAgICAgICAgZHJhZ09wdGlvbnMubWluRHJhZyA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgem9vbVByZXAoZSwgc3RhcnRYLCBzdGFydFkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihkcmFnTW9kZU5vdyA9PT0gJ3BhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ09wdGlvbnMubW92ZUZuID0gcGxvdERyYWc7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdPcHRpb25zLmRvbmVGbiA9IGRyYWdUYWlsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdkLl9mdWxsTGF5b3V0Ll9yZWRyYWcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkcmFnRGF0YU5vdyA9IGdkLl9kcmFnZGF0YTtcblxuICAgICAgICAgICAgaWYoZHJhZ0RhdGFOb3cgJiYgZHJhZ0RhdGFOb3cuZWxlbWVudCA9PT0gZHJhZ2dlcikge1xuICAgICAgICAgICAgICAgIHZhciBkcmFnTW9kZU5vdyA9IGdkLl9mdWxsTGF5b3V0LmRyYWdtb2RlO1xuXG4gICAgICAgICAgICAgICAgaWYoIXNlbGVjdGluZ09yRHJhd2luZyhkcmFnTW9kZU5vdykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb21wdXRlQXhpc0xpc3RzKCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN1YnBsb3RzKFswLCAwLCBwdywgcGhdKTtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ09wdGlvbnMubW92ZUZuKGRyYWdEYXRhTm93LmR4LCBkcmFnRGF0YU5vdy5keSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBzaG91bGQgd2UgdHJ5IHRvIFwicmUtc2VsZWN0XCIgdW5kZXIgc2VsZWN0L2xhc3NvIG1vZGVzP1xuICAgICAgICAgICAgICAgIC8vIHByb2JhYmx5IGJlc3QgdG8gd2FpdCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9wbG90bHkuanMvaXNzdWVzLzE4NTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xlYXJBbmRSZXNldFNlbGVjdCgpIHtcbiAgICAgICAgLy8gY2xlYXIgc2VsZWN0aW9uIHBvbHlnb24gY2FjaGUgKGlmIGFueSlcbiAgICAgICAgZHJhZ09wdGlvbnMucGxvdGluZm8uc2VsZWN0aW9uID0gZmFsc2U7XG4gICAgICAgIC8vIGNsZWFyIHNlbGVjdGlvbiBvdXRsaW5lc1xuICAgICAgICBjbGVhclNlbGVjdChnZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xpY2tGbihudW1DbGlja3MsIGV2dCkge1xuICAgICAgICB2YXIgZ2QgPSBkcmFnT3B0aW9ucy5nZDtcbiAgICAgICAgaWYoZ2QuX2Z1bGxMYXlvdXQuX2FjdGl2ZVNoYXBlSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgZ2QuX2Z1bGxMYXlvdXQuX2RlYWN0aXZhdGVTaGFwZShnZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2xpY2ttb2RlID0gZ2QuX2Z1bGxMYXlvdXQuY2xpY2ttb2RlO1xuXG4gICAgICAgIHJlbW92ZVpvb21ib3goZ2QpO1xuXG4gICAgICAgIGlmKG51bUNsaWNrcyA9PT0gMiAmJiAhc2luZ2xlRW5kKSBkb3VibGVDbGljaygpO1xuXG4gICAgICAgIGlmKGlzTWFpbkRyYWcpIHtcbiAgICAgICAgICAgIGlmKGNsaWNrbW9kZS5pbmRleE9mKCdzZWxlY3QnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0T25DbGljayhldnQsIGdkLCB4YXhlcywgeWF4ZXMsIHBsb3RpbmZvLmlkLCBkcmFnT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGNsaWNrbW9kZS5pbmRleE9mKCdldmVudCcpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBGeC5jbGljayhnZCwgZXZ0LCBwbG90aW5mby5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihudW1DbGlja3MgPT09IDEgJiYgc2luZ2xlRW5kKSB7XG4gICAgICAgICAgICB2YXIgYXggPSBucyA/IHlhMCA6IHhhMDtcbiAgICAgICAgICAgIHZhciBlbmQgPSAobnMgPT09ICdzJyB8fCBldyA9PT0gJ3cnKSA/IDAgOiAxO1xuICAgICAgICAgICAgdmFyIGF0dHJTdHIgPSBheC5fbmFtZSArICcucmFuZ2VbJyArIGVuZCArICddJztcbiAgICAgICAgICAgIHZhciBpbml0aWFsVGV4dCA9IGdldEVuZFRleHQoYXgsIGVuZCk7XG4gICAgICAgICAgICB2YXIgaEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgdmFyIHZBbGlnbiA9ICdtaWRkbGUnO1xuXG4gICAgICAgICAgICBpZihheC5maXhlZHJhbmdlKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmKG5zKSB7XG4gICAgICAgICAgICAgICAgdkFsaWduID0gKG5zID09PSAnbicpID8gJ3RvcCcgOiAnYm90dG9tJztcbiAgICAgICAgICAgICAgICBpZihheC5zaWRlID09PSAncmlnaHQnKSBoQWxpZ24gPSAncmlnaHQnO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGV3ID09PSAnZScpIGhBbGlnbiA9ICdyaWdodCc7XG5cbiAgICAgICAgICAgIGlmKGdkLl9jb250ZXh0LnNob3dBeGlzUmFuZ2VFbnRyeUJveGVzKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KGRyYWdnZXIpXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5tYWtlRWRpdGFibGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdkOiBnZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGdkLl9mdWxsTGF5b3V0LnBhcGVyX2JnY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBTdHJpbmcoaW5pdGlhbFRleHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogYXgudGlja2ZvbnQgPyBheC50aWNrZm9udC5jb2xvciA6ICcjNDQ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbjogaEFsaWduLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbjogdkFsaWduXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5vbignZWRpdCcsIGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2ID0gYXguZDJyKHRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVnaXN0cnkuY2FsbCgnX2d1aVJlbGF5b3V0JywgZ2QsIGF0dHJTdHIsIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYWdFbGVtZW50LmluaXQoZHJhZ09wdGlvbnMpO1xuXG4gICAgLy8geC95IHB4IHBvc2l0aW9uIGF0IHN0YXJ0IG9mIGRyYWdcbiAgICB2YXIgeDAsIHkwO1xuICAgIC8vIGJib3ggb2JqZWN0IG9mIHRoZSB6b29tYm94XG4gICAgdmFyIGJveDtcbiAgICAvLyBsdW1pbmFuY2Ugb2YgYmcgYmVoaW5kIHpvb21ib3hcbiAgICB2YXIgbHVtO1xuICAgIC8vIHpvb21ib3ggcGF0aCBvdXRsaW5lXG4gICAgdmFyIHBhdGgwO1xuICAgIC8vIGlzIHpvb21ib3ggZGltbWVkIChkdXJpbmcgZHJhZylcbiAgICB2YXIgZGltbWVkO1xuICAgIC8vICd4Jy1vbmx5LCAneScgb3IgJ3h5JyB6b29taW5nXG4gICAgdmFyIHpvb21Nb2RlO1xuICAgIC8vIHpvb21ib3ggZDMgc2VsZWN0aW9uXG4gICAgdmFyIHpiO1xuICAgIC8vIHpvb21ib3ggY29ybmVyIGQzIHNlbGVjdGlvblxuICAgIHZhciBjb3JuZXJzO1xuICAgIC8vIHpvb20gdGFrZXMgb3ZlciBtaW5EcmFnLCBzbyBpdCBhbHNvIGhhcyB0byB0YWtlIG92ZXIgZ2QuX2RyYWdnZWRcbiAgICB2YXIgem9vbURyYWdnZWQ7XG5cbiAgICBmdW5jdGlvbiB6b29tUHJlcChlLCBzdGFydFgsIHN0YXJ0WSkge1xuICAgICAgICB2YXIgZHJhZ0JCb3ggPSBkcmFnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB4MCA9IHN0YXJ0WCAtIGRyYWdCQm94LmxlZnQ7XG4gICAgICAgIHkwID0gc3RhcnRZIC0gZHJhZ0JCb3gudG9wO1xuICAgICAgICBib3ggPSB7bDogeDAsIHI6IHgwLCB3OiAwLCB0OiB5MCwgYjogeTAsIGg6IDB9O1xuICAgICAgICBsdW0gPSBnZC5faG1waXhjb3VudCA/XG4gICAgICAgICAgICAoZ2QuX2htbHVtY291bnQgLyBnZC5faG1waXhjb3VudCkgOlxuICAgICAgICAgICAgdGlueWNvbG9yKGdkLl9mdWxsTGF5b3V0LnBsb3RfYmdjb2xvcikuZ2V0THVtaW5hbmNlKCk7XG4gICAgICAgIHBhdGgwID0gJ00wLDBIJyArIHB3ICsgJ1YnICsgcGggKyAnSDBWMCc7XG4gICAgICAgIGRpbW1lZCA9IGZhbHNlO1xuICAgICAgICB6b29tTW9kZSA9ICd4eSc7XG4gICAgICAgIHpvb21EcmFnZ2VkID0gZmFsc2U7XG4gICAgICAgIHpiID0gbWFrZVpvb21ib3goem9vbWxheWVyLCBsdW0sIHhzLCB5cywgcGF0aDApO1xuICAgICAgICBjb3JuZXJzID0gbWFrZUNvcm5lcnMoem9vbWxheWVyLCB4cywgeXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHpvb21Nb3ZlKGR4MCwgZHkwKSB7XG4gICAgICAgIGlmKGdkLl90cmFuc2l0aW9uaW5nV2l0aER1cmF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeDEgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwdywgZHgwICsgeDApKTtcbiAgICAgICAgdmFyIHkxID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ocGgsIGR5MCArIHkwKSk7XG4gICAgICAgIHZhciBkeCA9IE1hdGguYWJzKHgxIC0geDApO1xuICAgICAgICB2YXIgZHkgPSBNYXRoLmFicyh5MSAtIHkwKTtcblxuICAgICAgICBib3gubCA9IE1hdGgubWluKHgwLCB4MSk7XG4gICAgICAgIGJveC5yID0gTWF0aC5tYXgoeDAsIHgxKTtcbiAgICAgICAgYm94LnQgPSBNYXRoLm1pbih5MCwgeTEpO1xuICAgICAgICBib3guYiA9IE1hdGgubWF4KHkwLCB5MSk7XG5cbiAgICAgICAgZnVuY3Rpb24gbm9ab29tKCkge1xuICAgICAgICAgICAgem9vbU1vZGUgPSAnJztcbiAgICAgICAgICAgIGJveC5yID0gYm94Lmw7XG4gICAgICAgICAgICBib3gudCA9IGJveC5iO1xuICAgICAgICAgICAgY29ybmVycy5hdHRyKCdkJywgJ00wLDBaJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihsaW5rcy5pc1N1YnBsb3RDb25zdHJhaW5lZCkge1xuICAgICAgICAgICAgaWYoZHggPiBNSU5aT09NIHx8IGR5ID4gTUlOWk9PTSkge1xuICAgICAgICAgICAgICAgIHpvb21Nb2RlID0gJ3h5JztcbiAgICAgICAgICAgICAgICBpZihkeCAvIHB3ID4gZHkgLyBwaCkge1xuICAgICAgICAgICAgICAgICAgICBkeSA9IGR4ICogcGggLyBwdztcbiAgICAgICAgICAgICAgICAgICAgaWYoeTAgPiB5MSkgYm94LnQgPSB5MCAtIGR5O1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGJveC5iID0geTAgKyBkeTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkeCA9IGR5ICogcHcgLyBwaDtcbiAgICAgICAgICAgICAgICAgICAgaWYoeDAgPiB4MSkgYm94LmwgPSB4MCAtIGR4O1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGJveC5yID0geDAgKyBkeDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29ybmVycy5hdHRyKCdkJywgeHlDb3JuZXJzKGJveCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub1pvb20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKG1hdGNoZXMuaXNTdWJwbG90Q29uc3RyYWluZWQpIHtcbiAgICAgICAgICAgIGlmKGR4ID4gTUlOWk9PTSB8fCBkeSA+IE1JTlpPT00pIHtcbiAgICAgICAgICAgICAgICB6b29tTW9kZSA9ICd4eSc7XG5cbiAgICAgICAgICAgICAgICB2YXIgcjAgPSBNYXRoLm1pbihib3gubCAvIHB3LCAocGggLSBib3guYikgLyBwaCk7XG4gICAgICAgICAgICAgICAgdmFyIHIxID0gTWF0aC5tYXgoYm94LnIgLyBwdywgKHBoIC0gYm94LnQpIC8gcGgpO1xuXG4gICAgICAgICAgICAgICAgYm94LmwgPSByMCAqIHB3O1xuICAgICAgICAgICAgICAgIGJveC5yID0gcjEgKiBwdztcbiAgICAgICAgICAgICAgICBib3guYiA9ICgxIC0gcjApICogcGg7XG4gICAgICAgICAgICAgICAgYm94LnQgPSAoMSAtIHIxKSAqIHBoO1xuICAgICAgICAgICAgICAgIGNvcm5lcnMuYXR0cignZCcsIHh5Q29ybmVycyhib3gpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9ab29tKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZigheUFjdGl2ZSB8fCBkeSA8IE1hdGgubWluKE1hdGgubWF4KGR4ICogMC42LCBNSU5EUkFHKSwgTUlOWk9PTSkpIHtcbiAgICAgICAgICAgIC8vIGxvb2sgZm9yIHNtYWxsIGRyYWdzIGluIG9uZSBkaXJlY3Rpb24gb3IgdGhlIG90aGVyLFxuICAgICAgICAgICAgLy8gYW5kIG9ubHkgZHJhZyB0aGUgb3RoZXIgYXhpc1xuXG4gICAgICAgICAgICBpZihkeCA8IE1JTkRSQUcgfHwgIXhBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBub1pvb20oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYm94LnQgPSAwO1xuICAgICAgICAgICAgICAgIGJveC5iID0gcGg7XG4gICAgICAgICAgICAgICAgem9vbU1vZGUgPSAneCc7XG4gICAgICAgICAgICAgICAgY29ybmVycy5hdHRyKCdkJywgeENvcm5lcnMoYm94LCB5MCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYoIXhBY3RpdmUgfHwgZHggPCBNYXRoLm1pbihkeSAqIDAuNiwgTUlOWk9PTSkpIHtcbiAgICAgICAgICAgIGJveC5sID0gMDtcbiAgICAgICAgICAgIGJveC5yID0gcHc7XG4gICAgICAgICAgICB6b29tTW9kZSA9ICd5JztcbiAgICAgICAgICAgIGNvcm5lcnMuYXR0cignZCcsIHlDb3JuZXJzKGJveCwgeDApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHpvb21Nb2RlID0gJ3h5JztcbiAgICAgICAgICAgIGNvcm5lcnMuYXR0cignZCcsIHh5Q29ybmVycyhib3gpKTtcbiAgICAgICAgfVxuICAgICAgICBib3gudyA9IGJveC5yIC0gYm94Lmw7XG4gICAgICAgIGJveC5oID0gYm94LmIgLSBib3gudDtcblxuICAgICAgICBpZih6b29tTW9kZSkgem9vbURyYWdnZWQgPSB0cnVlO1xuICAgICAgICBnZC5fZHJhZ2dlZCA9IHpvb21EcmFnZ2VkO1xuXG4gICAgICAgIHVwZGF0ZVpvb21ib3goemIsIGNvcm5lcnMsIGJveCwgcGF0aDAsIGRpbW1lZCwgbHVtKTtcbiAgICAgICAgY29tcHV0ZVpvb21VcGRhdGVzKCk7XG4gICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9yZWxheW91dGluZycsIHVwZGF0ZXMpO1xuICAgICAgICBkaW1tZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVab29tVXBkYXRlcygpIHtcbiAgICAgICAgdXBkYXRlcyA9IHt9O1xuXG4gICAgICAgIC8vIFRPRE86IGVkaXQgbGlua2VkIGF4ZXMgaW4gem9vbUF4UmFuZ2VzIGFuZCBpbiBkcmFnVGFpbFxuICAgICAgICBpZih6b29tTW9kZSA9PT0gJ3h5JyB8fCB6b29tTW9kZSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICB6b29tQXhSYW5nZXMoeGF4ZXMsIGJveC5sIC8gcHcsIGJveC5yIC8gcHcsIHVwZGF0ZXMsIGxpbmtzLnhheGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZU1hdGNoZWRBeFJhbmdlKCd4JywgdXBkYXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoem9vbU1vZGUgPT09ICd4eScgfHwgem9vbU1vZGUgPT09ICd5Jykge1xuICAgICAgICAgICAgem9vbUF4UmFuZ2VzKHlheGVzLCAocGggLSBib3guYikgLyBwaCwgKHBoIC0gYm94LnQpIC8gcGgsIHVwZGF0ZXMsIGxpbmtzLnlheGVzKTtcbiAgICAgICAgICAgIHVwZGF0ZU1hdGNoZWRBeFJhbmdlKCd5JywgdXBkYXRlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6b29tRG9uZSgpIHtcbiAgICAgICAgY29tcHV0ZVpvb21VcGRhdGVzKCk7XG4gICAgICAgIHJlbW92ZVpvb21ib3goZ2QpO1xuICAgICAgICBkcmFnVGFpbCgpO1xuICAgICAgICBzaG93RG91YmxlQ2xpY2tOb3RpZmllcihnZCk7XG4gICAgfVxuXG4gICAgLy8gc2Nyb2xsIHpvb20sIG9uIGFsbCBkcmFnZ2VycyBleGNlcHQgY29ybmVyc1xuICAgIHZhciBzY3JvbGxWaWV3Qm94ID0gWzAsIDAsIHB3LCBwaF07XG4gICAgLy8gd2FpdCBhIGxpdHRsZSBhZnRlciBzY3JvbGxpbmcgYmVmb3JlIHJlZHJhd2luZ1xuICAgIHZhciByZWRyYXdUaW1lciA9IG51bGw7XG4gICAgdmFyIFJFRFJBV0RFTEFZID0gY29uc3RhbnRzLlJFRFJBV0RFTEFZO1xuICAgIHZhciBtYWlucGxvdCA9IHBsb3RpbmZvLm1haW5wbG90ID8gZ2QuX2Z1bGxMYXlvdXQuX3Bsb3RzW3Bsb3RpbmZvLm1haW5wbG90XSA6IHBsb3RpbmZvO1xuXG4gICAgZnVuY3Rpb24gem9vbVdoZWVsKGUpIHtcbiAgICAgICAgLy8gZGVhY3RpdmF0ZSBtb3VzZXdoZWVsIHNjcm9sbGluZyBvbiBlbWJlZGRlZCBncmFwaHNcbiAgICAgICAgLy8gZGV2cyBjYW4gb3ZlcnJpZGUgdGhpcyB3aXRoIGxheW91dC5fZW5hYmxlc2Nyb2xsem9vbSxcbiAgICAgICAgLy8gYnV0IF8gZW5zdXJlcyB0aGlzIHNldHRpbmcgd29uJ3QgbGVhdmUgdGhlaXIgcGFnZVxuICAgICAgICBpZighZ2QuX2NvbnRleHQuX3Njcm9sbFpvb20uY2FydGVzaWFuICYmICFnZC5fZnVsbExheW91dC5fZW5hYmxlc2Nyb2xsem9vbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJBbmRSZXNldFNlbGVjdCgpO1xuXG4gICAgICAgIC8vIElmIGEgdHJhbnNpdGlvbiBpcyBpbiBwcm9ncmVzcywgdGhlbiBkaXNhYmxlIGFueSBiZWhhdmlvcjpcbiAgICAgICAgaWYoZ2QuX3RyYW5zaXRpb25pbmdXaXRoRHVyYXRpb24pIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWNvbXB1dGVBeGlzTGlzdHMoKTtcblxuICAgICAgICBjbGVhclRpbWVvdXQocmVkcmF3VGltZXIpO1xuXG4gICAgICAgIHZhciB3aGVlbERlbHRhID0gLWUuZGVsdGFZO1xuICAgICAgICBpZighaXNGaW5pdGUod2hlZWxEZWx0YSkpIHdoZWVsRGVsdGEgPSBlLndoZWVsRGVsdGEgLyAxMDtcbiAgICAgICAgaWYoIWlzRmluaXRlKHdoZWVsRGVsdGEpKSB7XG4gICAgICAgICAgICBMaWIubG9nKCdEaWQgbm90IGZpbmQgd2hlZWwgbW90aW9uIGF0dHJpYnV0ZXM6ICcsIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHpvb20gPSBNYXRoLmV4cCgtTWF0aC5taW4oTWF0aC5tYXgod2hlZWxEZWx0YSwgLTIwKSwgMjApIC8gMjAwKTtcbiAgICAgICAgdmFyIGdiYiA9IG1haW5wbG90LmRyYWdsYXllci5zZWxlY3QoJy5uc2V3ZHJhZycpLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHhmcmFjID0gKGUuY2xpZW50WCAtIGdiYi5sZWZ0KSAvIGdiYi53aWR0aDtcbiAgICAgICAgdmFyIHlmcmFjID0gKGdiYi5ib3R0b20gLSBlLmNsaWVudFkpIC8gZ2JiLmhlaWdodDtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgZnVuY3Rpb24gem9vbVdoZWVsT25lQXhpcyhheCwgY2VudGVyRnJhY3Rpb24sIHpvb20pIHtcbiAgICAgICAgICAgIGlmKGF4LmZpeGVkcmFuZ2UpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGF4UmFuZ2UgPSBMaWIuc2ltcGxlTWFwKGF4LnJhbmdlLCBheC5yMmwpO1xuICAgICAgICAgICAgdmFyIHYwID0gYXhSYW5nZVswXSArIChheFJhbmdlWzFdIC0gYXhSYW5nZVswXSkgKiBjZW50ZXJGcmFjdGlvbjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRvWm9vbSh2KSB7IHJldHVybiBheC5sMnIodjAgKyAodiAtIHYwKSAqIHpvb20pOyB9XG4gICAgICAgICAgICBheC5yYW5nZSA9IGF4UmFuZ2UubWFwKGRvWm9vbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihlZGl0WCkge1xuICAgICAgICAgICAgLy8gaWYgd2UncmUgb25seSB6b29taW5nIHRoaXMgYXhpcyBiZWNhdXNlIG9mIGNvbnN0cmFpbnRzLFxuICAgICAgICAgICAgLy8gem9vbSBpdCBhYm91dCB0aGUgY2VudGVyXG4gICAgICAgICAgICBpZighZXcpIHhmcmFjID0gMC41O1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB4YXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHpvb21XaGVlbE9uZUF4aXMoeGF4ZXNbaV0sIHhmcmFjLCB6b29tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZU1hdGNoZWRBeFJhbmdlKCd4Jyk7XG5cbiAgICAgICAgICAgIHNjcm9sbFZpZXdCb3hbMl0gKj0gem9vbTtcbiAgICAgICAgICAgIHNjcm9sbFZpZXdCb3hbMF0gKz0gc2Nyb2xsVmlld0JveFsyXSAqIHhmcmFjICogKDEgLyB6b29tIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZWRpdFkpIHtcbiAgICAgICAgICAgIGlmKCFucykgeWZyYWMgPSAwLjU7XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHlheGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgem9vbVdoZWVsT25lQXhpcyh5YXhlc1tpXSwgeWZyYWMsIHpvb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlTWF0Y2hlZEF4UmFuZ2UoJ3knKTtcblxuICAgICAgICAgICAgc2Nyb2xsVmlld0JveFszXSAqPSB6b29tO1xuICAgICAgICAgICAgc2Nyb2xsVmlld0JveFsxXSArPSBzY3JvbGxWaWV3Qm94WzNdICogKDEgLSB5ZnJhYykgKiAoMSAvIHpvb20gLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZpZXdib3ggcmVkcmF3IGF0IGZpcnN0XG4gICAgICAgIHVwZGF0ZVN1YnBsb3RzKHNjcm9sbFZpZXdCb3gpO1xuICAgICAgICB0aWNrc0FuZEFubm90YXRpb25zKCk7XG5cbiAgICAgICAgZ2QuZW1pdCgncGxvdGx5X3JlbGF5b3V0aW5nJywgdXBkYXRlcyk7XG5cbiAgICAgICAgLy8gdGhlbiByZXBsb3QgYWZ0ZXIgYSBkZWxheSB0byBtYWtlIHN1cmVcbiAgICAgICAgLy8gbm8gbW9yZSBzY3JvbGxpbmcgaXMgY29taW5nXG4gICAgICAgIHJlZHJhd1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjcm9sbFZpZXdCb3ggPSBbMCwgMCwgcHcsIHBoXTtcbiAgICAgICAgICAgIGRyYWdUYWlsKCk7XG4gICAgICAgIH0sIFJFRFJBV0RFTEFZKTtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBldmVyeXRoaW5nIGJ1dCB0aGUgY29ybmVycyBnZXRzIHdoZWVsIHpvb21cbiAgICBpZihucy5sZW5ndGggKiBldy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgYXR0YWNoV2hlZWxFdmVudEhhbmRsZXIoZHJhZ2dlciwgem9vbVdoZWVsKTtcbiAgICB9XG5cbiAgICAvLyBwbG90RHJhZzogbW92ZSB0aGUgcGxvdCBpbiByZXNwb25zZSB0byBhIGRyYWdcbiAgICBmdW5jdGlvbiBwbG90RHJhZyhkeCwgZHkpIHtcbiAgICAgICAgLy8gSWYgYSB0cmFuc2l0aW9uIGlzIGluIHByb2dyZXNzLCB0aGVuIGRpc2FibGUgYW55IGJlaGF2aW9yOlxuICAgICAgICBpZihnZC5fdHJhbnNpdGlvbmluZ1dpdGhEdXJhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJldmVudCBheGlzIGRyYXdpbmcgZnJvbSBtb25rZXlpbmcgd2l0aCBtYXJnaW5zIHVudGlsIHdlJ3JlIGRvbmVcbiAgICAgICAgZ2QuX2Z1bGxMYXlvdXQuX3JlcGxvdHRpbmcgPSB0cnVlO1xuXG4gICAgICAgIGlmKHhBY3RpdmUgPT09ICdldycgfHwgeUFjdGl2ZSA9PT0gJ25zJykge1xuICAgICAgICAgICAgaWYoeEFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGRyYWdBeExpc3QoeGF4ZXMsIGR4KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVNYXRjaGVkQXhSYW5nZSgneCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeUFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGRyYWdBeExpc3QoeWF4ZXMsIGR5KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVNYXRjaGVkQXhSYW5nZSgneScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlU3VicGxvdHMoW3hBY3RpdmUgPyAtZHggOiAwLCB5QWN0aXZlID8gLWR5IDogMCwgcHcsIHBoXSk7XG4gICAgICAgICAgICB0aWNrc0FuZEFubm90YXRpb25zKCk7XG4gICAgICAgICAgICBnZC5lbWl0KCdwbG90bHlfcmVsYXlvdXRpbmcnLCB1cGRhdGVzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGR6OiBzZXQgYSBuZXcgdmFsdWUgZm9yIG9uZSBlbmQgKDAgb3IgMSkgb2YgYW4gYXhpcyBhcnJheSBheEFycmF5LFxuICAgICAgICAvLyBhbmQgcmV0dXJuIGEgcGl4ZWwgc2hpZnQgZm9yIHRoYXQgZW5kIGZvciB0aGUgdmlld2JveFxuICAgICAgICAvLyBiYXNlZCBvbiBwaXhlbCBkcmFnIGRpc3RhbmNlIGRcbiAgICAgICAgLy8gVE9ETzogdGhpcyBtYWtlcyAoZ2VuZXJhbGx5IG5vbi1mYXRhbCkgZXJyb3JzIHdoZW4geW91IGdldFxuICAgICAgICAvLyBuZWFyIGZsb2F0aW5nIHBvaW50IGxpbWl0c1xuICAgICAgICBmdW5jdGlvbiBkeihheEFycmF5LCBlbmQsIGQpIHtcbiAgICAgICAgICAgIHZhciBvdGhlckVuZCA9IDEgLSBlbmQ7XG4gICAgICAgICAgICB2YXIgbW92ZWRBeDtcbiAgICAgICAgICAgIHZhciBuZXdMaW5lYXJpemVkRW5kO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGF4QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYXhpID0gYXhBcnJheVtpXTtcbiAgICAgICAgICAgICAgICBpZihheGkuZml4ZWRyYW5nZSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgbW92ZWRBeCA9IGF4aTtcbiAgICAgICAgICAgICAgICBuZXdMaW5lYXJpemVkRW5kID0gYXhpLl9ybFtvdGhlckVuZF0gK1xuICAgICAgICAgICAgICAgICAgICAoYXhpLl9ybFtlbmRdIC0gYXhpLl9ybFtvdGhlckVuZF0pIC8gZFpvb20oZCAvIGF4aS5fbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RW5kID0gYXhpLmwycihuZXdMaW5lYXJpemVkRW5kKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGwyciBjb21lcyBiYWNrIGZhbHNlIG9yIHVuZGVmaW5lZCwgaXQgbWVhbnMgd2UndmUgZHJhZ2dlZCBvZmZcbiAgICAgICAgICAgICAgICAvLyB0aGUgZW5kIG9mIHZhbGlkIHJhbmdlcyAtIHNvIHN0b3AuXG4gICAgICAgICAgICAgICAgaWYobmV3RW5kICE9PSBmYWxzZSAmJiBuZXdFbmQgIT09IHVuZGVmaW5lZCkgYXhpLnJhbmdlW2VuZF0gPSBuZXdFbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbW92ZWRBeC5fbGVuZ3RoICogKG1vdmVkQXguX3JsW2VuZF0gLSBuZXdMaW5lYXJpemVkRW5kKSAvXG4gICAgICAgICAgICAgICAgKG1vdmVkQXguX3JsW2VuZF0gLSBtb3ZlZEF4Ll9ybFtvdGhlckVuZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobGlua3MuaXNTdWJwbG90Q29uc3RyYWluZWQgJiYgeEFjdGl2ZSAmJiB5QWN0aXZlKSB7XG4gICAgICAgICAgICAvLyBkcmFnZ2luZyBhIGNvcm5lciBvZiBhIGNvbnN0cmFpbmVkIHN1YnBsb3Q6XG4gICAgICAgICAgICAvLyByZXNwZWN0IHRoZSBmaXhlZCBjb3JuZXIsIGJ1dCBoYXJtb25pemUgZHggYW5kIGR5XG4gICAgICAgICAgICB2YXIgZHh5U2lnbiA9ICgoeEFjdGl2ZSA9PT0gJ3cnKSA9PT0gKHlBY3RpdmUgPT09ICduJykpID8gMSA6IC0xO1xuICAgICAgICAgICAgdmFyIGR4eUZyYWN0aW9uID0gKGR4IC8gcHcgKyBkeHlTaWduICogZHkgLyBwaCkgLyAyO1xuICAgICAgICAgICAgZHggPSBkeHlGcmFjdGlvbiAqIHB3O1xuICAgICAgICAgICAgZHkgPSBkeHlTaWduICogZHh5RnJhY3Rpb24gKiBwaDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHhBY3RpdmUgPT09ICd3JykgZHggPSBkeih4YXhlcywgMCwgZHgpO1xuICAgICAgICBlbHNlIGlmKHhBY3RpdmUgPT09ICdlJykgZHggPSBkeih4YXhlcywgMSwgLWR4KTtcbiAgICAgICAgZWxzZSBpZigheEFjdGl2ZSkgZHggPSAwO1xuXG4gICAgICAgIGlmKHlBY3RpdmUgPT09ICduJykgZHkgPSBkeih5YXhlcywgMSwgZHkpO1xuICAgICAgICBlbHNlIGlmKHlBY3RpdmUgPT09ICdzJykgZHkgPSBkeih5YXhlcywgMCwgLWR5KTtcbiAgICAgICAgZWxzZSBpZigheUFjdGl2ZSkgZHkgPSAwO1xuXG4gICAgICAgIHZhciB4U3RhcnQgPSAoeEFjdGl2ZSA9PT0gJ3cnKSA/IGR4IDogMDtcbiAgICAgICAgdmFyIHlTdGFydCA9ICh5QWN0aXZlID09PSAnbicpID8gZHkgOiAwO1xuXG4gICAgICAgIGlmKGxpbmtzLmlzU3VicGxvdENvbnN0cmFpbmVkKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIGlmKCF4QWN0aXZlICYmIHlBY3RpdmUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gZHJhZ2dpbmcgb25lIGVuZCBvZiB0aGUgeSBheGlzIG9mIGEgY29uc3RyYWluZWQgc3VicGxvdFxuICAgICAgICAgICAgICAgIC8vIHNjYWxlIHRoZSBvdGhlciBheGlzIHRoZSBzYW1lIGFib3V0IGl0cyBtaWRkbGVcbiAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB4YXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB4YXhlc1tpXS5yYW5nZSA9IHhheGVzW2ldLl9yLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlWm9vbSh4YXhlc1tpXSwgMSAtIGR5IC8gcGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkeCA9IGR5ICogcHcgLyBwaDtcbiAgICAgICAgICAgICAgICB4U3RhcnQgPSBkeCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZigheUFjdGl2ZSAmJiB4QWN0aXZlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHlheGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHlheGVzW2ldLnJhbmdlID0geWF4ZXNbaV0uX3Iuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVab29tKHlheGVzW2ldLCAxIC0gZHggLyBwdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGR5ID0gZHggKiBwaCAvIHB3O1xuICAgICAgICAgICAgICAgIHlTdGFydCA9IGR5IC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZU1hdGNoZWRBeFJhbmdlKCd4Jyk7XG4gICAgICAgIHVwZGF0ZU1hdGNoZWRBeFJhbmdlKCd5Jyk7XG4gICAgICAgIHVwZGF0ZVN1YnBsb3RzKFt4U3RhcnQsIHlTdGFydCwgcHcgLSBkeCwgcGggLSBkeV0pO1xuICAgICAgICB0aWNrc0FuZEFubm90YXRpb25zKCk7XG4gICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9yZWxheW91dGluZycsIHVwZGF0ZXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1hdGNoZWRBeFJhbmdlKGF4TGV0dGVyLCBvdXQpIHtcbiAgICAgICAgdmFyIG1hdGNoZWRBeGVzID0gbWF0Y2hlcy5pc1N1YnBsb3RDb25zdHJhaW5lZCA/XG4gICAgICAgICAgICB7eDogeWF4ZXMsIHk6IHhheGVzfVtheExldHRlcl0gOlxuICAgICAgICAgICAgbWF0Y2hlc1theExldHRlciArICdheGVzJ107XG5cbiAgICAgICAgdmFyIGNvbnN0cmFpbmVkQXhlcyA9IG1hdGNoZXMuaXNTdWJwbG90Q29uc3RyYWluZWQgP1xuICAgICAgICAgICAge3g6IHhheGVzLCB5OiB5YXhlc31bYXhMZXR0ZXJdIDpcbiAgICAgICAgICAgIFtdO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtYXRjaGVkQXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGF4ID0gbWF0Y2hlZEF4ZXNbaV07XG4gICAgICAgICAgICB2YXIgYXhJZCA9IGF4Ll9pZDtcbiAgICAgICAgICAgIHZhciBheElkMiA9IG1hdGNoZXMueExpbmtzW2F4SWRdIHx8IG1hdGNoZXMueUxpbmtzW2F4SWRdO1xuICAgICAgICAgICAgdmFyIGF4MiA9IGNvbnN0cmFpbmVkQXhlc1swXSB8fCB4YUhhc2hbYXhJZDJdIHx8IHlhSGFzaFtheElkMl07XG5cbiAgICAgICAgICAgIGlmKGF4Mikge1xuICAgICAgICAgICAgICAgIGlmKG91dCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB6b29tYm94IGNhc2UgLSBkb24ndCBtdXRhdGUgJ3JhbmdlJywganVzdCBhZGQga2V5cyBpbiAndXBkYXRlcydcbiAgICAgICAgICAgICAgICAgICAgb3V0W2F4Ll9uYW1lICsgJy5yYW5nZVswXSddID0gb3V0W2F4Mi5fbmFtZSArICcucmFuZ2VbMF0nXTtcbiAgICAgICAgICAgICAgICAgICAgb3V0W2F4Ll9uYW1lICsgJy5yYW5nZVsxXSddID0gb3V0W2F4Mi5fbmFtZSArICcucmFuZ2VbMV0nXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBheC5yYW5nZSA9IGF4Mi5yYW5nZS5zbGljZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERyYXcgdGlja3MgYW5kIGFubm90YXRpb25zIChhbmQgb3RoZXIgY29tcG9uZW50cykgd2hlbiByYW5nZXMgY2hhbmdlLlxuICAgIC8vIEFsc28gcmVjb3JkcyB0aGUgcmFuZ2VzIHRoYXQgaGF2ZSBjaGFuZ2VkIGZvciB1c2UgYnkgdXBkYXRlIGF0IHRoZSBlbmQuXG4gICAgZnVuY3Rpb24gdGlja3NBbmRBbm5vdGF0aW9ucygpIHtcbiAgICAgICAgdmFyIGFjdGl2ZUF4SWRzID0gW107XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHB1c2hBY3RpdmVBeElkcyhheExpc3QpIHtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGF4TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKCFheExpc3RbaV0uZml4ZWRyYW5nZSkgYWN0aXZlQXhJZHMucHVzaChheExpc3RbaV0uX2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGVkaXRYKSB7XG4gICAgICAgICAgICBwdXNoQWN0aXZlQXhJZHMoeGF4ZXMpO1xuICAgICAgICAgICAgcHVzaEFjdGl2ZUF4SWRzKGxpbmtzLnhheGVzKTtcbiAgICAgICAgICAgIHB1c2hBY3RpdmVBeElkcyhtYXRjaGVzLnhheGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZihlZGl0WSkge1xuICAgICAgICAgICAgcHVzaEFjdGl2ZUF4SWRzKHlheGVzKTtcbiAgICAgICAgICAgIHB1c2hBY3RpdmVBeElkcyhsaW5rcy55YXhlcyk7XG4gICAgICAgICAgICBwdXNoQWN0aXZlQXhJZHMobWF0Y2hlcy55YXhlcyk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVzID0ge307XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGFjdGl2ZUF4SWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYXhJZCA9IGFjdGl2ZUF4SWRzW2ldO1xuICAgICAgICAgICAgdmFyIGF4ID0gZ2V0RnJvbUlkKGdkLCBheElkKTtcbiAgICAgICAgICAgIEF4ZXMuZHJhd09uZShnZCwgYXgsIHtza2lwVGl0bGU6IHRydWV9KTtcbiAgICAgICAgICAgIHVwZGF0ZXNbYXguX25hbWUgKyAnLnJhbmdlWzBdJ10gPSBheC5yYW5nZVswXTtcbiAgICAgICAgICAgIHVwZGF0ZXNbYXguX25hbWUgKyAnLnJhbmdlWzFdJ10gPSBheC5yYW5nZVsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIEF4ZXMucmVkcmF3Q29tcG9uZW50cyhnZCwgYWN0aXZlQXhJZHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvdWJsZUNsaWNrKCkge1xuICAgICAgICBpZihnZC5fdHJhbnNpdGlvbmluZ1dpdGhEdXJhdGlvbikgcmV0dXJuO1xuXG4gICAgICAgIHZhciBkb3VibGVDbGlja0NvbmZpZyA9IGdkLl9jb250ZXh0LmRvdWJsZUNsaWNrO1xuXG4gICAgICAgIHZhciBheExpc3QgPSBbXTtcbiAgICAgICAgaWYoeEFjdGl2ZSkgYXhMaXN0ID0gYXhMaXN0LmNvbmNhdCh4YXhlcyk7XG4gICAgICAgIGlmKHlBY3RpdmUpIGF4TGlzdCA9IGF4TGlzdC5jb25jYXQoeWF4ZXMpO1xuICAgICAgICBpZihtYXRjaGVzLnhheGVzKSBheExpc3QgPSBheExpc3QuY29uY2F0KG1hdGNoZXMueGF4ZXMpO1xuICAgICAgICBpZihtYXRjaGVzLnlheGVzKSBheExpc3QgPSBheExpc3QuY29uY2F0KG1hdGNoZXMueWF4ZXMpO1xuXG4gICAgICAgIHZhciBhdHRycyA9IHt9O1xuICAgICAgICB2YXIgYXgsIGksIHJhbmdlSW5pdGlhbDtcblxuICAgICAgICAvLyBGb3IgcmVzZXQrYXV0b3NpemUgbW9kZTpcbiAgICAgICAgLy8gSWYgKmFueSogb2YgdGhlIG1haW4gYXhlcyBpcyBub3QgYXQgaXRzIGluaXRpYWwgcmFuZ2VcbiAgICAgICAgLy8gKG9yIGF1dG9yYW5nZWQsIGlmIHdlIGhhdmUgbm8gaW5pdGlhbCByYW5nZSwgdG8gbWF0Y2ggdGhlIGxvZ2ljIGluXG4gICAgICAgIC8vIGRvdWJsZUNsaWNrQ29uZmlnID09PSAncmVzZXQnIGJlbG93KSwgd2UgcmVzZXQuXG4gICAgICAgIC8vIElmIHRoZXkgYXJlICphbGwqIGF0IHRoZWlyIGluaXRpYWwgcmFuZ2VzLCB0aGVuIHdlIGF1dG9zaXplLlxuICAgICAgICBpZihkb3VibGVDbGlja0NvbmZpZyA9PT0gJ3Jlc2V0K2F1dG9zaXplJykge1xuICAgICAgICAgICAgZG91YmxlQ2xpY2tDb25maWcgPSAnYXV0b3NpemUnO1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBheExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBheCA9IGF4TGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZigoYXguX3JhbmdlSW5pdGlhbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBheC5yYW5nZVswXSAhPT0gYXguX3JhbmdlSW5pdGlhbFswXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgYXgucmFuZ2VbMV0gIT09IGF4Ll9yYW5nZUluaXRpYWxbMV1cbiAgICAgICAgICAgICAgICAgICAgKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKCFheC5fcmFuZ2VJbml0aWFsICYmICFheC5hdXRvcmFuZ2UpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZUNsaWNrQ29uZmlnID0gJ3Jlc2V0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoZG91YmxlQ2xpY2tDb25maWcgPT09ICdhdXRvc2l6ZScpIHtcbiAgICAgICAgICAgIC8vIGRvbid0IHNldCB0aGUgbGlua2VkIGF4ZXMgaGVyZSwgc28gcmVsYXlvdXQgbWFya3MgdGhlbSBhcyBzaHJpbmthYmxlXG4gICAgICAgICAgICAvLyBhbmQgd2UgYXV0b3NpemUganVzdCB0byB0aGUgcmVxdWVzdGVkIGF4aXMvYXhlc1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgYXhMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYXggPSBheExpc3RbaV07XG4gICAgICAgICAgICAgICAgaWYoIWF4LmZpeGVkcmFuZ2UpIGF0dHJzW2F4Ll9uYW1lICsgJy5hdXRvcmFuZ2UnXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihkb3VibGVDbGlja0NvbmZpZyA9PT0gJ3Jlc2V0Jykge1xuICAgICAgICAgICAgLy8gd2hlbiB3ZSdyZSByZXNldHRpbmcsIHJlc2V0IGFsbCBsaW5rZWQgYXhlcyB0b28sIHNvIHdlIGdldCBiYWNrXG4gICAgICAgICAgICAvLyB0byB0aGUgZnVsbHktYXV0by13aXRoLWNvbnN0cmFpbnRzIHNpdHVhdGlvblxuICAgICAgICAgICAgaWYoeEFjdGl2ZSB8fCBsaW5rcy5pc1N1YnBsb3RDb25zdHJhaW5lZCkgYXhMaXN0ID0gYXhMaXN0LmNvbmNhdChsaW5rcy54YXhlcyk7XG4gICAgICAgICAgICBpZih5QWN0aXZlICYmICFsaW5rcy5pc1N1YnBsb3RDb25zdHJhaW5lZCkgYXhMaXN0ID0gYXhMaXN0LmNvbmNhdChsaW5rcy55YXhlcyk7XG5cbiAgICAgICAgICAgIGlmKGxpbmtzLmlzU3VicGxvdENvbnN0cmFpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYoIXhBY3RpdmUpIGF4TGlzdCA9IGF4TGlzdC5jb25jYXQoeGF4ZXMpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYoIXlBY3RpdmUpIGF4TGlzdCA9IGF4TGlzdC5jb25jYXQoeWF4ZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBheExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBheCA9IGF4TGlzdFtpXTtcblxuICAgICAgICAgICAgICAgIGlmKCFheC5maXhlZHJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFheC5fcmFuZ2VJbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyc1theC5fbmFtZSArICcuYXV0b3JhbmdlJ10gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbml0aWFsID0gYXguX3JhbmdlSW5pdGlhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzW2F4Ll9uYW1lICsgJy5yYW5nZVswXSddID0gcmFuZ2VJbml0aWFsWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnNbYXguX25hbWUgKyAnLnJhbmdlWzFdJ10gPSByYW5nZUluaXRpYWxbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZC5lbWl0KCdwbG90bHlfZG91YmxlY2xpY2snLCBudWxsKTtcbiAgICAgICAgUmVnaXN0cnkuY2FsbCgnX2d1aVJlbGF5b3V0JywgZ2QsIGF0dHJzKTtcbiAgICB9XG5cbiAgICAvLyBkcmFnVGFpbCAtIGZpbmlzaCBhIGRyYWcgZXZlbnQgd2l0aCBhIHJlZHJhd1xuICAgIGZ1bmN0aW9uIGRyYWdUYWlsKCkge1xuICAgICAgICAvLyBwdXQgdGhlIHN1YnBsb3Qgdmlld2JveGVzIGJhY2sgdG8gZGVmYXVsdCAoQmVjYXVzZSB3ZSdyZSBnb2luZyB0bylcbiAgICAgICAgLy8gYmUgcmVwb3NpdGlvbmluZyB0aGUgZGF0YSBpbiB0aGUgcmVsYXlvdXQuIEJ1dCBET04nVCBjYWxsXG4gICAgICAgIC8vIHRpY2tzQW5kQW5ub3RhdGlvbnMgYWdhaW4gLSBpdCdzIHVubmVjZXNzYXJ5IGFuZCB3b3VsZCBvdmVyd3JpdGUgYHVwZGF0ZXNgXG4gICAgICAgIHVwZGF0ZVN1YnBsb3RzKFswLCAwLCBwdywgcGhdKTtcblxuICAgICAgICAvLyBzaW5jZSB3ZSBtYXkgaGF2ZSBiZWVuIHJlZHJhd2luZyBzb21lIHRoaW5ncyBkdXJpbmcgdGhlIGRyYWcsIHdlIG1heSBoYXZlXG4gICAgICAgIC8vIGFjY3VtdWxhdGVkIE1hdGhKYXggcHJvbWlzZXMgLSB3YWl0IGZvciB0aGVtIGJlZm9yZSB3ZSByZWxheW91dC5cbiAgICAgICAgTGliLnN5bmNPckFzeW5jKFtcbiAgICAgICAgICAgIFBsb3RzLnByZXZpb3VzUHJvbWlzZXMsXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBnZC5fZnVsbExheW91dC5fcmVwbG90dGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIFJlZ2lzdHJ5LmNhbGwoJ19ndWlSZWxheW91dCcsIGdkLCB1cGRhdGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSwgZ2QpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZVN1YnBsb3RzIC0gZmluZCBhbGwgcGxvdCB2aWV3Ym94ZXMgdGhhdCBzaG91bGQgYmVcbiAgICAvLyBhZmZlY3RlZCBieSB0aGlzIGRyYWcsIGFuZCB1cGRhdGUgdGhlbS4gbG9vayBmb3IgYWxsIHBsb3RzXG4gICAgLy8gc2hhcmluZyBhbiBhZmZlY3RlZCBheGlzIChpbmNsdWRpbmcgdGhlIG9uZSBiZWluZyBkcmFnZ2VkKSxcbiAgICAvLyBpbmNsdWRlcyBhbHNvIHNjYXR0ZXJnbCBhbmQgc3Bsb20gbG9naWMuXG4gICAgZnVuY3Rpb24gdXBkYXRlU3VicGxvdHModmlld0JveCkge1xuICAgICAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgICAgICB2YXIgcGxvdGluZm9zID0gZnVsbExheW91dC5fcGxvdHM7XG4gICAgICAgIHZhciBzdWJwbG90cyA9IGZ1bGxMYXlvdXQuX3N1YnBsb3RzLmNhcnRlc2lhbjtcbiAgICAgICAgdmFyIGksIHNwLCB4YSwgeWE7XG5cbiAgICAgICAgaWYoaGFzU3Bsb20pIHtcbiAgICAgICAgICAgIFJlZ2lzdHJ5LnN1YnBsb3RzUmVnaXN0cnkuc3Bsb20uZHJhZyhnZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihoYXNTY2F0dGVyR2wpIHtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHN1YnBsb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3AgPSBwbG90aW5mb3Nbc3VicGxvdHNbaV1dO1xuICAgICAgICAgICAgICAgIHhhID0gc3AueGF4aXM7XG4gICAgICAgICAgICAgICAgeWEgPSBzcC55YXhpcztcblxuICAgICAgICAgICAgICAgIGlmKHNwLl9zY2VuZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgeHJuZyA9IExpYi5zaW1wbGVNYXAoeGEucmFuZ2UsIHhhLnIybCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5cm5nID0gTGliLnNpbXBsZU1hcCh5YS5yYW5nZSwgeWEucjJsKTtcbiAgICAgICAgICAgICAgICAgICAgc3AuX3NjZW5lLnVwZGF0ZSh7cmFuZ2U6IFt4cm5nWzBdLCB5cm5nWzBdLCB4cm5nWzFdLCB5cm5nWzFdXX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGhhc1NwbG9tIHx8IGhhc1NjYXR0ZXJHbCkge1xuICAgICAgICAgICAgY2xlYXJHbENhbnZhc2VzKGdkKTtcbiAgICAgICAgICAgIHJlZHJhd1JlZ2xUcmFjZXMoZ2QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaGFzU1ZHKSB7XG4gICAgICAgICAgICB2YXIgeFNjYWxlRmFjdG9yID0gdmlld0JveFsyXSAvIHhhMC5fbGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHlTY2FsZUZhY3RvciA9IHZpZXdCb3hbM10gLyB5YTAuX2xlbmd0aDtcblxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgc3VicGxvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzcCA9IHBsb3RpbmZvc1tzdWJwbG90c1tpXV07XG4gICAgICAgICAgICAgICAgeGEgPSBzcC54YXhpcztcbiAgICAgICAgICAgICAgICB5YSA9IHNwLnlheGlzO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVkaXRYMiA9IGVkaXRYICYmICF4YS5maXhlZHJhbmdlICYmIHhhSGFzaFt4YS5faWRdO1xuICAgICAgICAgICAgICAgIHZhciBlZGl0WTIgPSBlZGl0WSAmJiAheWEuZml4ZWRyYW5nZSAmJiB5YUhhc2hbeWEuX2lkXTtcblxuICAgICAgICAgICAgICAgIHZhciB4U2NhbGVGYWN0b3IyLCB5U2NhbGVGYWN0b3IyO1xuICAgICAgICAgICAgICAgIHZhciBjbGlwRHgsIGNsaXBEeTtcblxuICAgICAgICAgICAgICAgIGlmKGVkaXRYMikge1xuICAgICAgICAgICAgICAgICAgICB4U2NhbGVGYWN0b3IyID0geFNjYWxlRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBjbGlwRHggPSBldyA/IHZpZXdCb3hbMF0gOiBnZXRTaGlmdCh4YSwgeFNjYWxlRmFjdG9yMik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKG1hdGNoZXMueGFIYXNoW3hhLl9pZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgeFNjYWxlRmFjdG9yMiA9IHhTY2FsZUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgY2xpcER4ID0gdmlld0JveFswXSAqIHhhLl9sZW5ndGggLyB4YTAuX2xlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYobWF0Y2hlcy55YUhhc2hbeGEuX2lkXSkge1xuICAgICAgICAgICAgICAgICAgICB4U2NhbGVGYWN0b3IyID0geVNjYWxlRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBjbGlwRHggPSB5QWN0aXZlID09PSAnbnMnID9cbiAgICAgICAgICAgICAgICAgICAgICAgIC12aWV3Qm94WzFdICogeGEuX2xlbmd0aCAvIHlhMC5fbGVuZ3RoIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFNoaWZ0KHhhLCB4U2NhbGVGYWN0b3IyLCB7bjogJ3RvcCcsIHM6ICdib3R0b20nfVt5QWN0aXZlXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgeFNjYWxlRmFjdG9yMiA9IGdldExpbmtlZFNjYWxlRmFjdG9yKHhhLCB4U2NhbGVGYWN0b3IsIHlTY2FsZUZhY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGNsaXBEeCA9IHNjYWxlQW5kR2V0U2hpZnQoeGEsIHhTY2FsZUZhY3RvcjIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGVkaXRZMikge1xuICAgICAgICAgICAgICAgICAgICB5U2NhbGVGYWN0b3IyID0geVNjYWxlRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBjbGlwRHkgPSBucyA/IHZpZXdCb3hbMV0gOiBnZXRTaGlmdCh5YSwgeVNjYWxlRmFjdG9yMik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKG1hdGNoZXMueWFIYXNoW3lhLl9pZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgeVNjYWxlRmFjdG9yMiA9IHlTY2FsZUZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgY2xpcER5ID0gdmlld0JveFsxXSAqIHlhLl9sZW5ndGggLyB5YTAuX2xlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYobWF0Y2hlcy54YUhhc2hbeWEuX2lkXSkge1xuICAgICAgICAgICAgICAgICAgICB5U2NhbGVGYWN0b3IyID0geFNjYWxlRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBjbGlwRHkgPSB4QWN0aXZlID09PSAnZXcnID9cbiAgICAgICAgICAgICAgICAgICAgICAgIC12aWV3Qm94WzBdICogeWEuX2xlbmd0aCAvIHhhMC5fbGVuZ3RoIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFNoaWZ0KHlhLCB5U2NhbGVGYWN0b3IyLCB7ZTogJ3JpZ2h0JywgdzogJ2xlZnQnfVt4QWN0aXZlXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgeVNjYWxlRmFjdG9yMiA9IGdldExpbmtlZFNjYWxlRmFjdG9yKHlhLCB4U2NhbGVGYWN0b3IsIHlTY2FsZUZhY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGNsaXBEeSA9IHNjYWxlQW5kR2V0U2hpZnQoeWEsIHlTY2FsZUZhY3RvcjIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRvbid0IHNjYWxlIGF0IGFsbCBpZiBuZWl0aGVyIGF4aXMgaXMgc2NhbGFibGUgaGVyZVxuICAgICAgICAgICAgICAgIGlmKCF4U2NhbGVGYWN0b3IyICYmICF5U2NhbGVGYWN0b3IyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGJ1dCBpZiBvbmx5IG9uZSBpcywgcmVzZXQgdGhlIG90aGVyIGF4aXMgc2NhbGluZ1xuICAgICAgICAgICAgICAgIGlmKCF4U2NhbGVGYWN0b3IyKSB4U2NhbGVGYWN0b3IyID0gMTtcbiAgICAgICAgICAgICAgICBpZigheVNjYWxlRmFjdG9yMikgeVNjYWxlRmFjdG9yMiA9IDE7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGxvdER4ID0geGEuX29mZnNldCAtIGNsaXBEeCAvIHhTY2FsZUZhY3RvcjI7XG4gICAgICAgICAgICAgICAgdmFyIHBsb3REeSA9IHlhLl9vZmZzZXQgLSBjbGlwRHkgLyB5U2NhbGVGYWN0b3IyO1xuXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBjb3VsZCBiZSBtb3JlIGVmZmljaWVudCBoZXJlOlxuICAgICAgICAgICAgICAgIC8vIHNldFRyYW5zbGF0ZSBhbmQgc2V0U2NhbGUgZG8gYSBsb3Qgb2YgZXh0cmEgd29ya1xuICAgICAgICAgICAgICAgIC8vIHdoZW4gd29ya2luZyBpbmRlcGVuZGVudGx5LCBzaG91bGQgcGVyaGFwcyBjb21iaW5lXG4gICAgICAgICAgICAgICAgLy8gdGhlbSBpbnRvIGEgc2luZ2xlIHJvdXRpbmUuXG4gICAgICAgICAgICAgICAgc3AuY2xpcFJlY3RcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5zZXRUcmFuc2xhdGUsIGNsaXBEeCwgY2xpcER5KVxuICAgICAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFNjYWxlLCB4U2NhbGVGYWN0b3IyLCB5U2NhbGVGYWN0b3IyKTtcblxuICAgICAgICAgICAgICAgIHNwLnBsb3RcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5zZXRUcmFuc2xhdGUsIHBsb3REeCwgcGxvdER5KVxuICAgICAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFNjYWxlLCAxIC8geFNjYWxlRmFjdG9yMiwgMSAvIHlTY2FsZUZhY3RvcjIpO1xuXG4gICAgICAgICAgICAgICAgLy8gYXBwbHkgYW4gaW52ZXJzZSBzY2FsZSB0byBpbmRpdmlkdWFsIHBvaW50cyB0byBjb3VudGVyYWN0XG4gICAgICAgICAgICAgICAgLy8gdGhlIHNjYWxlIG9mIHRoZSB0cmFjZSBncm91cC5cbiAgICAgICAgICAgICAgICAvLyBhcHBseSBvbmx5IHdoZW4gc2NhbGUgY2hhbmdlcywgYXMgYWRqdXN0aW5nIHRoZSBzY2FsZSBvZlxuICAgICAgICAgICAgICAgIC8vIGFsbCB0aGUgcG9pbnRzIGNhbiBiZSBleHBhbnNpdmUuXG4gICAgICAgICAgICAgICAgaWYoeFNjYWxlRmFjdG9yMiAhPT0gc3AueFNjYWxlRmFjdG9yIHx8IHlTY2FsZUZhY3RvcjIgIT09IHNwLnlTY2FsZUZhY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBEcmF3aW5nLnNldFBvaW50R3JvdXBTY2FsZShzcC56b29tU2NhbGVQdHMsIHhTY2FsZUZhY3RvcjIsIHlTY2FsZUZhY3RvcjIpO1xuICAgICAgICAgICAgICAgICAgICBEcmF3aW5nLnNldFRleHRQb2ludHNTY2FsZShzcC56b29tU2NhbGVUeHQsIHhTY2FsZUZhY3RvcjIsIHlTY2FsZUZhY3RvcjIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIERyYXdpbmcuaGlkZU91dHNpZGVSYW5nZVBvaW50cyhzcC5jbGlwT25BeGlzRmFsc2VUcmFjZXMsIHNwKTtcblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB4L3kgc2NhbGVGYWN0b3Igc3Rhc2hcbiAgICAgICAgICAgICAgICBzcC54U2NhbGVGYWN0b3IgPSB4U2NhbGVGYWN0b3IyO1xuICAgICAgICAgICAgICAgIHNwLnlTY2FsZUZhY3RvciA9IHlTY2FsZUZhY3RvcjI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaW5kIHRoZSBhcHByb3ByaWF0ZSBzY2FsaW5nIGZvciB0aGlzIGF4aXMsIGlmIGl0J3MgbGlua2VkIHRvIHRoZVxuICAgIC8vIGRyYWdnZWQgYXhlcyBieSBjb25zdHJhaW50cy4gMCBpcyBzcGVjaWFsLCBpdCBtZWFucyB0aGlzIGF4aXMgc2hvdWxkbid0XG4gICAgLy8gZXZlciBiZSBzY2FsZWQgKHdpbGwgYmUgY29udmVydGVkIHRvIDEgaWYgdGhlIG90aGVyIGF4aXMgaXMgc2NhbGVkKVxuICAgIGZ1bmN0aW9uIGdldExpbmtlZFNjYWxlRmFjdG9yKGF4LCB4U2NhbGVGYWN0b3IsIHlTY2FsZUZhY3Rvcikge1xuICAgICAgICBpZihheC5maXhlZHJhbmdlKSByZXR1cm4gMDtcblxuICAgICAgICBpZihlZGl0WCAmJiBsaW5rcy54YUhhc2hbYXguX2lkXSkge1xuICAgICAgICAgICAgcmV0dXJuIHhTY2FsZUZhY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBpZihlZGl0WSAmJiAobGlua3MuaXNTdWJwbG90Q29uc3RyYWluZWQgPyBsaW5rcy54YUhhc2ggOiBsaW5rcy55YUhhc2gpW2F4Ll9pZF0pIHtcbiAgICAgICAgICAgIHJldHVybiB5U2NhbGVGYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhbGVBbmRHZXRTaGlmdChheCwgc2NhbGVGYWN0b3IpIHtcbiAgICAgICAgaWYoc2NhbGVGYWN0b3IpIHtcbiAgICAgICAgICAgIGF4LnJhbmdlID0gYXguX3Iuc2xpY2UoKTtcbiAgICAgICAgICAgIHNjYWxlWm9vbShheCwgc2NhbGVGYWN0b3IpO1xuICAgICAgICAgICAgcmV0dXJuIGdldFNoaWZ0KGF4LCBzY2FsZUZhY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2hpZnQoYXgsIHNjYWxlRmFjdG9yLCBmcm9tKSB7XG4gICAgICAgIHJldHVybiBheC5fbGVuZ3RoICogKDEgLSBzY2FsZUZhY3RvcikgKiBGUk9NX1RMW2Zyb20gfHwgYXguY29uc3RyYWludG93YXJkIHx8ICdtaWRkbGUnXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dlcjtcbn1cblxuZnVuY3Rpb24gbWFrZURyYWdnZXIocGxvdGluZm8sIG5vZGVOYW1lLCBkcmFnQ2xhc3MsIGN1cnNvcikge1xuICAgIHZhciBkcmFnZ2VyMyA9IExpYi5lbnN1cmVTaW5nbGUocGxvdGluZm8uZHJhZ2xheWVyLCBub2RlTmFtZSwgZHJhZ0NsYXNzLCBmdW5jdGlvbihzKSB7XG4gICAgICAgIHMuY2xhc3NlZCgnZHJhZycsIHRydWUpXG4gICAgICAgICAgICAuc3R5bGUoe2ZpbGw6ICd0cmFuc3BhcmVudCcsICdzdHJva2Utd2lkdGgnOiAwfSlcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXN1YnBsb3QnLCBwbG90aW5mby5pZCk7XG4gICAgfSk7XG5cbiAgICBkcmFnZ2VyMy5jYWxsKHNldEN1cnNvciwgY3Vyc29yKTtcblxuICAgIHJldHVybiBkcmFnZ2VyMy5ub2RlKCk7XG59XG5cbmZ1bmN0aW9uIG1ha2VSZWN0RHJhZ2dlcihwbG90aW5mbywgZHJhZ0NsYXNzLCBjdXJzb3IsIHgsIHksIHcsIGgpIHtcbiAgICB2YXIgZHJhZ2dlciA9IG1ha2VEcmFnZ2VyKHBsb3RpbmZvLCAncmVjdCcsIGRyYWdDbGFzcywgY3Vyc29yKTtcbiAgICBkMy5zZWxlY3QoZHJhZ2dlcikuY2FsbChEcmF3aW5nLnNldFJlY3QsIHgsIHksIHcsIGgpO1xuICAgIHJldHVybiBkcmFnZ2VyO1xufVxuXG5mdW5jdGlvbiBpc0RpcmVjdGlvbkFjdGl2ZShheExpc3QsIGFjdGl2ZVZhbCkge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBheExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoIWF4TGlzdFtpXS5maXhlZHJhbmdlKSByZXR1cm4gYWN0aXZlVmFsO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIGdldEVuZFRleHQoYXgsIGVuZCkge1xuICAgIHZhciBpbml0aWFsVmFsID0gYXgucmFuZ2VbZW5kXTtcbiAgICB2YXIgZGlmZiA9IE1hdGguYWJzKGluaXRpYWxWYWwgLSBheC5yYW5nZVsxIC0gZW5kXSk7XG4gICAgdmFyIGRpZztcblxuICAgIC8vIFRPRE86IHRoaXMgc2hvdWxkIGJhc2ljYWxseSBiZSBheC5yMmQgYnV0IHdlJ3JlIGRvaW5nIGV4dHJhXG4gICAgLy8gcm91bmRpbmcgaGVyZS4uLiBjYW4gd2UgY2xlYW4gdXAgYXQgYWxsP1xuICAgIGlmKGF4LnR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICByZXR1cm4gaW5pdGlhbFZhbDtcbiAgICB9IGVsc2UgaWYoYXgudHlwZSA9PT0gJ2xvZycpIHtcbiAgICAgICAgZGlnID0gTWF0aC5jZWlsKE1hdGgubWF4KDAsIC1NYXRoLmxvZyhkaWZmKSAvIE1hdGguTE4xMCkpICsgMztcbiAgICAgICAgcmV0dXJuIGQzLmZvcm1hdCgnLicgKyBkaWcgKyAnZycpKE1hdGgucG93KDEwLCBpbml0aWFsVmFsKSk7XG4gICAgfSBlbHNlIHsgLy8gbGluZWFyIG51bWVyaWMgKG9yIGNhdGVnb3J5Li4uIGJ1dCBqdXN0IHNob3cgbnVtYmVycyBoZXJlKVxuICAgICAgICBkaWcgPSBNYXRoLmZsb29yKE1hdGgubG9nKE1hdGguYWJzKGluaXRpYWxWYWwpKSAvIE1hdGguTE4xMCkgLVxuICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLmxvZyhkaWZmKSAvIE1hdGguTE4xMCkgKyA0O1xuICAgICAgICByZXR1cm4gZDMuZm9ybWF0KCcuJyArIFN0cmluZyhkaWcpICsgJ2cnKShpbml0aWFsVmFsKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHpvb21BeFJhbmdlcyhheExpc3QsIHIwRnJhY3Rpb24sIHIxRnJhY3Rpb24sIHVwZGF0ZXMsIGxpbmtlZEF4ZXMpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXhMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBheGkgPSBheExpc3RbaV07XG4gICAgICAgIGlmKGF4aS5maXhlZHJhbmdlKSBjb250aW51ZTtcblxuICAgICAgICBpZihheGkucmFuZ2VicmVha3MpIHtcbiAgICAgICAgICAgIHZhciBpc1kgPSBheGkuX2lkLmNoYXJBdCgwKSA9PT0gJ3knO1xuICAgICAgICAgICAgdmFyIHIwRiA9IGlzWSA/ICgxIC0gcjBGcmFjdGlvbikgOiByMEZyYWN0aW9uO1xuICAgICAgICAgICAgdmFyIHIxRiA9IGlzWSA/ICgxIC0gcjFGcmFjdGlvbikgOiByMUZyYWN0aW9uO1xuXG4gICAgICAgICAgICB1cGRhdGVzW2F4aS5fbmFtZSArICcucmFuZ2VbMF0nXSA9IGF4aS5sMnIoYXhpLnAybChyMEYgKiBheGkuX2xlbmd0aCkpO1xuICAgICAgICAgICAgdXBkYXRlc1theGkuX25hbWUgKyAnLnJhbmdlWzFdJ10gPSBheGkubDJyKGF4aS5wMmwocjFGICogYXhpLl9sZW5ndGgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBheFJhbmdlTGluZWFyMCA9IGF4aS5fcmxbMF07XG4gICAgICAgICAgICB2YXIgYXhSYW5nZUxpbmVhclNwYW4gPSBheGkuX3JsWzFdIC0gYXhSYW5nZUxpbmVhcjA7XG4gICAgICAgICAgICB1cGRhdGVzW2F4aS5fbmFtZSArICcucmFuZ2VbMF0nXSA9IGF4aS5sMnIoYXhSYW5nZUxpbmVhcjAgKyBheFJhbmdlTGluZWFyU3BhbiAqIHIwRnJhY3Rpb24pO1xuICAgICAgICAgICAgdXBkYXRlc1theGkuX25hbWUgKyAnLnJhbmdlWzFdJ10gPSBheGkubDJyKGF4UmFuZ2VMaW5lYXIwICsgYXhSYW5nZUxpbmVhclNwYW4gKiByMUZyYWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHpvb20gbGlua2VkIGF4ZXMgYWJvdXQgdGhlaXIgY2VudGVyc1xuICAgIGlmKGxpbmtlZEF4ZXMgJiYgbGlua2VkQXhlcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGxpbmtlZFIwRnJhY3Rpb24gPSAocjBGcmFjdGlvbiArICgxIC0gcjFGcmFjdGlvbikpIC8gMjtcbiAgICAgICAgem9vbUF4UmFuZ2VzKGxpbmtlZEF4ZXMsIGxpbmtlZFIwRnJhY3Rpb24sIDEgLSBsaW5rZWRSMEZyYWN0aW9uLCB1cGRhdGVzLCBbXSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFnQXhMaXN0KGF4TGlzdCwgcGl4KSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGF4TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXhpID0gYXhMaXN0W2ldO1xuICAgICAgICBpZighYXhpLmZpeGVkcmFuZ2UpIHtcbiAgICAgICAgICAgIGlmKGF4aS5yYW5nZWJyZWFrcykge1xuICAgICAgICAgICAgICAgIHZhciBwMCA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIHAxID0gYXhpLl9sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIGQwID0gYXhpLnAybChwMCArIHBpeCkgLSBheGkucDJsKHAwKTtcbiAgICAgICAgICAgICAgICB2YXIgZDEgPSBheGkucDJsKHAxICsgcGl4KSAtIGF4aS5wMmwocDEpO1xuICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IChkMCArIGQxKSAvIDI7XG5cbiAgICAgICAgICAgICAgICBheGkucmFuZ2UgPSBbXG4gICAgICAgICAgICAgICAgICAgIGF4aS5sMnIoYXhpLl9ybFswXSAtIGRlbHRhKSxcbiAgICAgICAgICAgICAgICAgICAgYXhpLmwycihheGkuX3JsWzFdIC0gZGVsdGEpXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXhpLnJhbmdlID0gW1xuICAgICAgICAgICAgICAgICAgICBheGkubDJyKGF4aS5fcmxbMF0gLSBwaXggLyBheGkuX20pLFxuICAgICAgICAgICAgICAgICAgICBheGkubDJyKGF4aS5fcmxbMV0gLSBwaXggLyBheGkuX20pXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gY29tbW9uIHRyYW5zZm9ybSBmb3IgZHJhZ2dpbmcgb25lIGVuZCBvZiBhbiBheGlzXG4vLyBkPjAgaXMgY29tcHJlc3Npbmcgc2NhbGUgKGN1cnNvciBpcyBvdmVyIHRoZSBwbG90LFxuLy8gIHRoZSBheGlzIGVuZCBzaG91bGQgbW92ZSB3aXRoIHRoZSBjdXJzb3IpXG4vLyBkPDAgaXMgZXhwYW5kaW5nIChjdXJzb3IgaXMgb2ZmIHRoZSBwbG90LCBheGlzIGVuZCBtb3Zlc1xuLy8gIG5vbmxpbmVhcmx5IHNvIHlvdSBjYW4gZXhwYW5kIGZhcilcbmZ1bmN0aW9uIGRab29tKGQpIHtcbiAgICByZXR1cm4gMSAtICgoZCA+PSAwKSA/IE1hdGgubWluKGQsIDAuOSkgOlxuICAgICAgICAxIC8gKDEgLyBNYXRoLm1heChkLCAtMC4zKSArIDMuMjIyKSk7XG59XG5cbmZ1bmN0aW9uIGdldERyYWdDdXJzb3IobnNldywgZHJhZ21vZGUsIGlzTWFpbkRyYWcpIHtcbiAgICBpZighbnNldykgcmV0dXJuICdwb2ludGVyJztcbiAgICBpZihuc2V3ID09PSAnbnNldycpIHtcbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIGhlcmUsIGNsZWFyIGN1cnNvciBhbmRcbiAgICAgICAgLy8gdXNlIHRoZSBjdXJzb3Igc3R5bGUgc2V0IG9uIDxnIC5kcmFnbGF5ZXI+XG4gICAgICAgIGlmKGlzTWFpbkRyYWcpIHJldHVybiAnJztcbiAgICAgICAgaWYoZHJhZ21vZGUgPT09ICdwYW4nKSByZXR1cm4gJ21vdmUnO1xuICAgICAgICByZXR1cm4gJ2Nyb3NzaGFpcic7XG4gICAgfVxuICAgIHJldHVybiBuc2V3LnRvTG93ZXJDYXNlKCkgKyAnLXJlc2l6ZSc7XG59XG5cbmZ1bmN0aW9uIG1ha2Vab29tYm94KHpvb21sYXllciwgbHVtLCB4cywgeXMsIHBhdGgwKSB7XG4gICAgcmV0dXJuIHpvb21sYXllci5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnem9vbWJveCcpXG4gICAgICAgIC5zdHlsZSh7XG4gICAgICAgICAgICAnZmlsbCc6IGx1bSA+IDAuMiA/ICdyZ2JhKDAsMCwwLDApJyA6ICdyZ2JhKDI1NSwyNTUsMjU1LDApJyxcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAwXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB4cyArICcsICcgKyB5cyArICcpJylcbiAgICAgICAgLmF0dHIoJ2QnLCBwYXRoMCArICdaJyk7XG59XG5cbmZ1bmN0aW9uIG1ha2VDb3JuZXJzKHpvb21sYXllciwgeHMsIHlzKSB7XG4gICAgcmV0dXJuIHpvb21sYXllci5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnem9vbWJveC1jb3JuZXJzJylcbiAgICAgICAgLnN0eWxlKHtcbiAgICAgICAgICAgIGZpbGw6IENvbG9yLmJhY2tncm91bmQsXG4gICAgICAgICAgICBzdHJva2U6IENvbG9yLmRlZmF1bHRMaW5lLFxuICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IDEsXG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB4cyArICcsICcgKyB5cyArICcpJylcbiAgICAgICAgLmF0dHIoJ2QnLCAnTTAsMFonKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlWm9vbWJveCh6YiwgY29ybmVycywgYm94LCBwYXRoMCwgZGltbWVkLCBsdW0pIHtcbiAgICB6Yi5hdHRyKCdkJyxcbiAgICAgICAgcGF0aDAgKyAnTScgKyAoYm94LmwpICsgJywnICsgKGJveC50KSArICd2JyArIChib3guaCkgK1xuICAgICAgICAnaCcgKyAoYm94LncpICsgJ3YtJyArIChib3guaCkgKyAnaC0nICsgKGJveC53KSArICdaJyk7XG4gICAgdHJhbnNpdGlvblpvb21ib3goemIsIGNvcm5lcnMsIGRpbW1lZCwgbHVtKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvblpvb21ib3goemIsIGNvcm5lcnMsIGRpbW1lZCwgbHVtKSB7XG4gICAgaWYoIWRpbW1lZCkge1xuICAgICAgICB6Yi50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGx1bSA+IDAuMiA/ICdyZ2JhKDAsMCwwLDAuNCknIDpcbiAgICAgICAgICAgICAgICAncmdiYSgyNTUsMjU1LDI1NSwwLjMpJylcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApO1xuICAgICAgICBjb3JuZXJzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlWm9vbWJveChnZCkge1xuICAgIGQzLnNlbGVjdChnZClcbiAgICAgICAgLnNlbGVjdEFsbCgnLnpvb21ib3gsLmpzLXpvb21ib3gtYmFja2Ryb3AsLmpzLXpvb21ib3gtbWVudSwuem9vbWJveC1jb3JuZXJzJylcbiAgICAgICAgLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBzaG93RG91YmxlQ2xpY2tOb3RpZmllcihnZCkge1xuICAgIGlmKFNIT1daT09NT1VUVElQICYmIGdkLmRhdGEgJiYgZ2QuX2NvbnRleHQuc2hvd1RpcHMpIHtcbiAgICAgICAgTGliLm5vdGlmaWVyKExpYi5fKGdkLCAnRG91YmxlLWNsaWNrIHRvIHpvb20gYmFjayBvdXQnKSwgJ2xvbmcnKTtcbiAgICAgICAgU0hPV1pPT01PVVRUSVAgPSBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHhDb3JuZXJzKGJveCwgeTApIHtcbiAgICByZXR1cm4gJ00nICtcbiAgICAgICAgKGJveC5sIC0gMC41KSArICcsJyArICh5MCAtIE1JTlpPT00gLSAwLjUpICtcbiAgICAgICAgJ2gtM3YnICsgKDIgKiBNSU5aT09NICsgMSkgKyAnaDNaTScgK1xuICAgICAgICAoYm94LnIgKyAwLjUpICsgJywnICsgKHkwIC0gTUlOWk9PTSAtIDAuNSkgK1xuICAgICAgICAnaDN2JyArICgyICogTUlOWk9PTSArIDEpICsgJ2gtM1onO1xufVxuXG5mdW5jdGlvbiB5Q29ybmVycyhib3gsIHgwKSB7XG4gICAgcmV0dXJuICdNJyArXG4gICAgICAgICh4MCAtIE1JTlpPT00gLSAwLjUpICsgJywnICsgKGJveC50IC0gMC41KSArXG4gICAgICAgICd2LTNoJyArICgyICogTUlOWk9PTSArIDEpICsgJ3YzWk0nICtcbiAgICAgICAgKHgwIC0gTUlOWk9PTSAtIDAuNSkgKyAnLCcgKyAoYm94LmIgKyAwLjUpICtcbiAgICAgICAgJ3YzaCcgKyAoMiAqIE1JTlpPT00gKyAxKSArICd2LTNaJztcbn1cblxuZnVuY3Rpb24geHlDb3JuZXJzKGJveCkge1xuICAgIHZhciBjbGVuID0gTWF0aC5mbG9vcihNYXRoLm1pbihib3guYiAtIGJveC50LCBib3guciAtIGJveC5sLCBNSU5aT09NKSAvIDIpO1xuICAgIHJldHVybiAnTScgK1xuICAgICAgICAoYm94LmwgLSAzLjUpICsgJywnICsgKGJveC50IC0gMC41ICsgY2xlbikgKyAnaDN2JyArICgtY2xlbikgK1xuICAgICAgICAgICAgJ2gnICsgY2xlbiArICd2LTNoLScgKyAoY2xlbiArIDMpICsgJ1pNJyArXG4gICAgICAgIChib3guciArIDMuNSkgKyAnLCcgKyAoYm94LnQgLSAwLjUgKyBjbGVuKSArICdoLTN2JyArICgtY2xlbikgK1xuICAgICAgICAgICAgJ2gnICsgKC1jbGVuKSArICd2LTNoJyArIChjbGVuICsgMykgKyAnWk0nICtcbiAgICAgICAgKGJveC5yICsgMy41KSArICcsJyArIChib3guYiArIDAuNSAtIGNsZW4pICsgJ2gtM3YnICsgY2xlbiArXG4gICAgICAgICAgICAnaCcgKyAoLWNsZW4pICsgJ3YzaCcgKyAoY2xlbiArIDMpICsgJ1pNJyArXG4gICAgICAgIChib3gubCAtIDMuNSkgKyAnLCcgKyAoYm94LmIgKyAwLjUgLSBjbGVuKSArICdoM3YnICsgY2xlbiArXG4gICAgICAgICAgICAnaCcgKyBjbGVuICsgJ3YzaC0nICsgKGNsZW4gKyAzKSArICdaJztcbn1cblxuZnVuY3Rpb24gY2FsY0xpbmtzKGdkLCBncm91cHMsIHhhSGFzaCwgeWFIYXNoKSB7XG4gICAgdmFyIGlzU3VicGxvdENvbnN0cmFpbmVkID0gZmFsc2U7XG4gICAgdmFyIHhMaW5rcyA9IHt9O1xuICAgIHZhciB5TGlua3MgPSB7fTtcbiAgICB2YXIgeElELCB5SUQsIHhMaW5rSUQsIHlMaW5rSUQ7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBncm91cCA9IGdyb3Vwc1tpXTtcbiAgICAgICAgLy8gY2hlY2sgaWYgYW55IG9mIHRoZSB4IGF4ZXMgd2UncmUgZHJhZ2dpbmcgaXMgaW4gdGhpcyBjb25zdHJhaW50IGdyb3VwXG4gICAgICAgIGZvcih4SUQgaW4geGFIYXNoKSB7XG4gICAgICAgICAgICBpZihncm91cFt4SURdKSB7XG4gICAgICAgICAgICAgICAgLy8gcHV0IHRoZSByZXN0IG9mIHRoZXNlIGF4ZXMgaW50byB4TGlua3MsIGlmIHdlJ3JlIG5vdCBhbHJlYWR5XG4gICAgICAgICAgICAgICAgLy8gZHJhZ2dpbmcgdGhlbSwgc28gd2Uga25vdyB0byBzY2FsZSB0aGVzZSBheGVzIGF1dG9tYXRpY2FsbHkgdG9vXG4gICAgICAgICAgICAgICAgLy8gdG8gbWF0Y2ggdGhlIGNoYW5nZXMgaW4gdGhlIGRyYWdnZWQgeCBheGVzXG4gICAgICAgICAgICAgICAgZm9yKHhMaW5rSUQgaW4gZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoISh4TGlua0lELmNoYXJBdCgwKSA9PT0gJ3gnID8geGFIYXNoIDogeWFIYXNoKVt4TGlua0lEXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeExpbmtzW3hMaW5rSURdID0geElEO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHggYW5kIHkgYXhlcyBvZiBUSElTIGRyYWcgYXJlIGxpbmtlZFxuICAgICAgICAgICAgICAgIGZvcih5SUQgaW4geWFIYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGdyb3VwW3lJRF0pIGlzU3VicGxvdENvbnN0cmFpbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3cgY2hlY2sgaWYgYW55IG9mIHRoZSB5IGF4ZXMgd2UncmUgZHJhZ2dpbmcgaXMgaW4gdGhpcyBjb25zdHJhaW50IGdyb3VwXG4gICAgICAgIC8vIG9ubHkgbG9vayBmb3Igb3V0c2lkZSBsaW5rcywgYXMgd2UndmUgYWxyZWFkeSBjaGVja2VkIGZvciBsaW5rcyB3aXRoaW4gdGhlIGRyYWdnZXJcbiAgICAgICAgZm9yKHlJRCBpbiB5YUhhc2gpIHtcbiAgICAgICAgICAgIGlmKGdyb3VwW3lJRF0pIHtcbiAgICAgICAgICAgICAgICBmb3IoeUxpbmtJRCBpbiBncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBpZighKHlMaW5rSUQuY2hhckF0KDApID09PSAneCcgPyB4YUhhc2ggOiB5YUhhc2gpW3lMaW5rSURdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5TGlua3NbeUxpbmtJRF0gPSB5SUQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihpc1N1YnBsb3RDb25zdHJhaW5lZCkge1xuICAgICAgICAvLyBtZXJnZSB4TGlua3MgYW5kIHlMaW5rcyBpZiB0aGUgc3VicGxvdCBpcyBjb25zdHJhaW5lZCxcbiAgICAgICAgLy8gc2luY2Ugd2UnbGwgYWx3YXlzIGFwcGx5IGJvdGggYW55d2F5IGFuZCB0aGUgdHdvIHdpbGwgY29udGFpblxuICAgICAgICAvLyBkdXBsaWNhdGVzXG4gICAgICAgIExpYi5leHRlbmRGbGF0KHhMaW5rcywgeUxpbmtzKTtcbiAgICAgICAgeUxpbmtzID0ge307XG4gICAgfVxuXG4gICAgdmFyIHhhSGFzaExpbmtlZCA9IHt9O1xuICAgIHZhciB4YXhlc0xpbmtlZCA9IFtdO1xuICAgIGZvcih4TGlua0lEIGluIHhMaW5rcykge1xuICAgICAgICB2YXIgeGEgPSBnZXRGcm9tSWQoZ2QsIHhMaW5rSUQpO1xuICAgICAgICB4YXhlc0xpbmtlZC5wdXNoKHhhKTtcbiAgICAgICAgeGFIYXNoTGlua2VkW3hhLl9pZF0gPSB4YTtcbiAgICB9XG5cbiAgICB2YXIgeWFIYXNoTGlua2VkID0ge307XG4gICAgdmFyIHlheGVzTGlua2VkID0gW107XG4gICAgZm9yKHlMaW5rSUQgaW4geUxpbmtzKSB7XG4gICAgICAgIHZhciB5YSA9IGdldEZyb21JZChnZCwgeUxpbmtJRCk7XG4gICAgICAgIHlheGVzTGlua2VkLnB1c2goeWEpO1xuICAgICAgICB5YUhhc2hMaW5rZWRbeWEuX2lkXSA9IHlhO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHhhSGFzaDogeGFIYXNoTGlua2VkLFxuICAgICAgICB5YUhhc2g6IHlhSGFzaExpbmtlZCxcbiAgICAgICAgeGF4ZXM6IHhheGVzTGlua2VkLFxuICAgICAgICB5YXhlczogeWF4ZXNMaW5rZWQsXG4gICAgICAgIHhMaW5rczogeExpbmtzLFxuICAgICAgICB5TGlua3M6IHlMaW5rcyxcbiAgICAgICAgaXNTdWJwbG90Q29uc3RyYWluZWQ6IGlzU3VicGxvdENvbnN0cmFpbmVkXG4gICAgfTtcbn1cblxuLy8gc3RpbGwgc2VlbXMgdG8gYmUgc29tZSBjb25mdXNpb24gYWJvdXQgb253aGVlbCB2cyBvbm1vdXNld2hlZWwuLi5cbmZ1bmN0aW9uIGF0dGFjaFdoZWVsRXZlbnRIYW5kbGVyKGVsZW1lbnQsIGhhbmRsZXIpIHtcbiAgICBpZighc3VwcG9ydHNQYXNzaXZlKSB7XG4gICAgICAgIGlmKGVsZW1lbnQub253aGVlbCAhPT0gdW5kZWZpbmVkKSBlbGVtZW50Lm9ud2hlZWwgPSBoYW5kbGVyO1xuICAgICAgICBlbHNlIGlmKGVsZW1lbnQub25tb3VzZXdoZWVsICE9PSB1bmRlZmluZWQpIGVsZW1lbnQub25tb3VzZXdoZWVsID0gaGFuZGxlcjtcbiAgICAgICAgZWxzZSBpZighZWxlbWVudC5pc0FkZGVkV2hlZWxFdmVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5pc0FkZGVkV2hlZWxFdmVudCA9IHRydWU7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgaGFuZGxlciwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgd2hlZWxFdmVudE5hbWUgPSBlbGVtZW50Lm9ud2hlZWwgIT09IHVuZGVmaW5lZCA/ICd3aGVlbCcgOiAnbW91c2V3aGVlbCc7XG5cbiAgICAgICAgaWYoZWxlbWVudC5fb253aGVlbCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHdoZWVsRXZlbnROYW1lLCBlbGVtZW50Ll9vbndoZWVsKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50Ll9vbndoZWVsID0gaGFuZGxlcjtcblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIod2hlZWxFdmVudE5hbWUsIGhhbmRsZXIsIHtwYXNzaXZlOiBmYWxzZX0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFzaFZhbHVlcyhoYXNoKSB7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIGZvcih2YXIgayBpbiBoYXNoKSBvdXQucHVzaChoYXNoW2tdKTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtYWtlRHJhZ0JveDogbWFrZURyYWdCb3gsXG5cbiAgICBtYWtlRHJhZ2dlcjogbWFrZURyYWdnZXIsXG4gICAgbWFrZVJlY3REcmFnZ2VyOiBtYWtlUmVjdERyYWdnZXIsXG4gICAgbWFrZVpvb21ib3g6IG1ha2Vab29tYm94LFxuICAgIG1ha2VDb3JuZXJzOiBtYWtlQ29ybmVycyxcblxuICAgIHVwZGF0ZVpvb21ib3g6IHVwZGF0ZVpvb21ib3gsXG4gICAgeHlDb3JuZXJzOiB4eUNvcm5lcnMsXG4gICAgdHJhbnNpdGlvblpvb21ib3g6IHRyYW5zaXRpb25ab29tYm94LFxuICAgIHJlbW92ZVpvb21ib3g6IHJlbW92ZVpvb21ib3gsXG4gICAgc2hvd0RvdWJsZUNsaWNrTm90aWZpZXI6IHNob3dEb3VibGVDbGlja05vdGlmaWVyLFxuXG4gICAgYXR0YWNoV2hlZWxFdmVudEhhbmRsZXI6IGF0dGFjaFdoZWVsRXZlbnRIYW5kbGVyXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbnZhciBGeCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngnKTtcbnZhciBkcmFnRWxlbWVudCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhZ2VsZW1lbnQnKTtcbnZhciBzZXRDdXJzb3IgPSByZXF1aXJlKCcuLi8uLi9saWIvc2V0Y3Vyc29yJyk7XG5cbnZhciBtYWtlRHJhZ0JveCA9IHJlcXVpcmUoJy4vZHJhZ2JveCcpLm1ha2VEcmFnQm94O1xudmFyIERSQUdHRVJTSVpFID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKS5EUkFHR0VSU0laRTtcblxuZXhwb3J0cy5pbml0SW50ZXJhY3Rpb25zID0gZnVuY3Rpb24gaW5pdEludGVyYWN0aW9ucyhnZCkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG5cbiAgICBpZihnZC5fY29udGV4dC5zdGF0aWNQbG90KSB7XG4gICAgICAgIC8vIHRoaXMgc3dlZXBzIHVwIG1vcmUgdGhhbiBqdXN0IGNhcnRlc2lhbiBkcmFnIGVsZW1lbnRzLi4uXG4gICAgICAgIGQzLnNlbGVjdChnZCkuc2VsZWN0QWxsKCcuZHJhZycpLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoIWZ1bGxMYXlvdXQuX2hhcygnY2FydGVzaWFuJykgJiYgIWZ1bGxMYXlvdXQuX2hhcygnc3Bsb20nKSkgcmV0dXJuO1xuXG4gICAgdmFyIHN1YnBsb3RzID0gT2JqZWN0LmtleXMoZnVsbExheW91dC5fcGxvdHMgfHwge30pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAvLyBzb3J0IG92ZXJsYXlzIGxhc3QsIHRoZW4gYnkgeCBheGlzIG51bWJlciwgdGhlbiB5IGF4aXMgbnVtYmVyXG4gICAgICAgIGlmKChmdWxsTGF5b3V0Ll9wbG90c1thXS5tYWlucGxvdCAmJiB0cnVlKSA9PT1cbiAgICAgICAgICAgIChmdWxsTGF5b3V0Ll9wbG90c1tiXS5tYWlucGxvdCAmJiB0cnVlKSkge1xuICAgICAgICAgICAgdmFyIGFQYXJ0cyA9IGEuc3BsaXQoJ3knKTtcbiAgICAgICAgICAgIHZhciBiUGFydHMgPSBiLnNwbGl0KCd5Jyk7XG4gICAgICAgICAgICByZXR1cm4gKGFQYXJ0c1swXSA9PT0gYlBhcnRzWzBdKSA/XG4gICAgICAgICAgICAgICAgKE51bWJlcihhUGFydHNbMV0gfHwgMSkgLSBOdW1iZXIoYlBhcnRzWzFdIHx8IDEpKSA6XG4gICAgICAgICAgICAgICAgKE51bWJlcihhUGFydHNbMF0gfHwgMSkgLSBOdW1iZXIoYlBhcnRzWzBdIHx8IDEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVsbExheW91dC5fcGxvdHNbYV0ubWFpbnBsb3QgPyAxIDogLTE7XG4gICAgfSk7XG5cbiAgICBzdWJwbG90cy5mb3JFYWNoKGZ1bmN0aW9uKHN1YnBsb3QpIHtcbiAgICAgICAgdmFyIHBsb3RpbmZvID0gZnVsbExheW91dC5fcGxvdHNbc3VicGxvdF07XG4gICAgICAgIHZhciB4YSA9IHBsb3RpbmZvLnhheGlzO1xuICAgICAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcblxuICAgICAgICAvLyBtYWluIGFuZCBjb3JuZXIgZHJhZ2dlcnMgbmVlZCBub3QgYmUgcmVwZWF0ZWQgZm9yXG4gICAgICAgIC8vIG92ZXJsYWlkIHN1YnBsb3RzIC0gdGhlc2UgZHJhZ2dlcnMgZHJhZyB0aGVtIGFsbFxuICAgICAgICBpZighcGxvdGluZm8ubWFpbnBsb3QpIHtcbiAgICAgICAgICAgIC8vIG1haW4gZHJhZ2dlciBnb2VzIG92ZXIgdGhlIGdyaWRzIGFuZCBkYXRhLCBzbyB3ZSB1c2UgaXRzXG4gICAgICAgICAgICAvLyBtb3VzZW1vdmUgZXZlbnRzIGZvciBhbGwgZGF0YSBob3ZlciBlZmZlY3RzXG4gICAgICAgICAgICB2YXIgbWFpbmRyYWcgPSBtYWtlRHJhZ0JveChnZCwgcGxvdGluZm8sIHhhLl9vZmZzZXQsIHlhLl9vZmZzZXQsXG4gICAgICAgICAgICAgICAgeGEuX2xlbmd0aCwgeWEuX2xlbmd0aCwgJ25zJywgJ2V3Jyk7XG5cbiAgICAgICAgICAgIG1haW5kcmFnLm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBvbiBgZ2QuX2Z1bGxMYXlvdXRgLCAqbm90KiBmdWxsTGF5b3V0IGJlY2F1c2UgdGhlIHJlZmVyZW5jZVxuICAgICAgICAgICAgICAgIC8vIGNoYW5nZXMgYnkgdGhlIHRpbWUgdGhpcyBpcyBjYWxsZWQgYWdhaW4uXG4gICAgICAgICAgICAgICAgZ2QuX2Z1bGxMYXlvdXQuX3JlaG92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoKGdkLl9mdWxsTGF5b3V0Ll9ob3ZlcnN1YnBsb3QgPT09IHN1YnBsb3QpICYmIGdkLl9mdWxsTGF5b3V0Ll9wbG90c1tzdWJwbG90XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRnguaG92ZXIoZ2QsIGV2dCwgc3VicGxvdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgRnguaG92ZXIoZ2QsIGV2dCwgc3VicGxvdCk7XG5cbiAgICAgICAgICAgICAgICAvLyBOb3RlIHRoYXQgd2UgaGF2ZSAqbm90KiB1c2VkIHRoZSBjYWNoZWQgZnVsbExheW91dCB2YXJpYWJsZSBoZXJlXG4gICAgICAgICAgICAgICAgLy8gc2luY2UgdGhhdCBtYXkgYmUgb3V0ZGF0ZWQgd2hlbiB0aGlzIGlzIGNhbGxlZCBhcyBhIGNhbGxiYWNrIGxhdGVyIG9uXG4gICAgICAgICAgICAgICAgZ2QuX2Z1bGxMYXlvdXQuX2xhc3Rob3ZlciA9IG1haW5kcmFnO1xuICAgICAgICAgICAgICAgIGdkLl9mdWxsTGF5b3V0Ll9ob3ZlcnN1YnBsb3QgPSBzdWJwbG90O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIElNUE9SVEFOVDpcbiAgICAgICAgICAgICAqIFdlIG11c3QgY2hlY2sgZm9yIHRoZSBwcmVzZW5jZSBvZiB0aGUgZHJhZyBjb3ZlciBoZXJlLlxuICAgICAgICAgICAgICogSWYgd2UgZG9uJ3QsIGEgJ21vdXNlb3V0JyBldmVudCBpcyB0cmlnZ2VyZWQgb24gdGhlXG4gICAgICAgICAgICAgKiBtYWluZHJhZyBiZWZvcmUgZWFjaCAnY2xpY2snIGV2ZW50LCB3aGljaCBoYXMgdGhlIGVmZmVjdFxuICAgICAgICAgICAgICogb2YgY2xlYXJpbmcgdGhlIGhvdmVyZGF0YTsgdGh1cywgY2FuY2VsbGluZyB0aGUgY2xpY2sgZXZlbnQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG1haW5kcmFnLm9ubW91c2VvdXQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICAgICBpZihnZC5fZHJhZ2dpbmcpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gdGhlIG1vdXNlIGxlYXZlcyB0aGlzIG1haW5kcmFnLCB1bnNldCB0aGUgaG92ZXJlZCBzdWJwbG90LlxuICAgICAgICAgICAgICAgIC8vIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIGlmIGl0IGxlYXZlcyB0aGUgc3VicGxvdCBkaXJlY3RseSAqb250bypcbiAgICAgICAgICAgICAgICAvLyBhbm90aGVyIHN1YnBsb3QsIGJ1dCB0aGF0J3MgYSB0aW55IGNvcm5lciBjYXNlIGF0IHRoZSBtb21lbnQuXG4gICAgICAgICAgICAgICAgZ2QuX2Z1bGxMYXlvdXQuX2hvdmVyc3VicGxvdCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBkcmFnRWxlbWVudC51bmhvdmVyKGdkLCBldnQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gY29ybmVyIGRyYWdnZXJzXG4gICAgICAgICAgICBpZihnZC5fY29udGV4dC5zaG93QXhpc0RyYWdIYW5kbGVzKSB7XG4gICAgICAgICAgICAgICAgbWFrZURyYWdCb3goZ2QsIHBsb3RpbmZvLCB4YS5fb2Zmc2V0IC0gRFJBR0dFUlNJWkUsIHlhLl9vZmZzZXQgLSBEUkFHR0VSU0laRSxcbiAgICAgICAgICAgICAgICAgICAgRFJBR0dFUlNJWkUsIERSQUdHRVJTSVpFLCAnbicsICd3Jyk7XG4gICAgICAgICAgICAgICAgbWFrZURyYWdCb3goZ2QsIHBsb3RpbmZvLCB4YS5fb2Zmc2V0ICsgeGEuX2xlbmd0aCwgeWEuX29mZnNldCAtIERSQUdHRVJTSVpFLFxuICAgICAgICAgICAgICAgICAgICBEUkFHR0VSU0laRSwgRFJBR0dFUlNJWkUsICduJywgJ2UnKTtcbiAgICAgICAgICAgICAgICBtYWtlRHJhZ0JveChnZCwgcGxvdGluZm8sIHhhLl9vZmZzZXQgLSBEUkFHR0VSU0laRSwgeWEuX29mZnNldCArIHlhLl9sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIERSQUdHRVJTSVpFLCBEUkFHR0VSU0laRSwgJ3MnLCAndycpO1xuICAgICAgICAgICAgICAgIG1ha2VEcmFnQm94KGdkLCBwbG90aW5mbywgeGEuX29mZnNldCArIHhhLl9sZW5ndGgsIHlhLl9vZmZzZXQgKyB5YS5fbGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBEUkFHR0VSU0laRSwgRFJBR0dFUlNJWkUsICdzJywgJ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihnZC5fY29udGV4dC5zaG93QXhpc0RyYWdIYW5kbGVzKSB7XG4gICAgICAgICAgICAvLyB4IGF4aXMgZHJhZ2dlcnMgLSBpZiB5b3UgaGF2ZSBvdmVybGFpZCBwbG90cyxcbiAgICAgICAgICAgIC8vIHRoZXNlIGRyYWcgZWFjaCBheGlzIHNlcGFyYXRlbHlcbiAgICAgICAgICAgIGlmKHN1YnBsb3QgPT09IHhhLl9tYWluU3VicGxvdCkge1xuICAgICAgICAgICAgICAgIC8vIHRoZSB5IHBvc2l0aW9uIG9mIHRoZSBtYWluIHggYXhpcyBsaW5lXG4gICAgICAgICAgICAgICAgdmFyIHkwID0geGEuX21haW5MaW5lUG9zaXRpb247XG4gICAgICAgICAgICAgICAgaWYoeGEuc2lkZSA9PT0gJ3RvcCcpIHkwIC09IERSQUdHRVJTSVpFO1xuICAgICAgICAgICAgICAgIG1ha2VEcmFnQm94KGdkLCBwbG90aW5mbywgeGEuX29mZnNldCArIHhhLl9sZW5ndGggKiAwLjEsIHkwLFxuICAgICAgICAgICAgICAgICAgICB4YS5fbGVuZ3RoICogMC44LCBEUkFHR0VSU0laRSwgJycsICdldycpO1xuICAgICAgICAgICAgICAgIG1ha2VEcmFnQm94KGdkLCBwbG90aW5mbywgeGEuX29mZnNldCwgeTAsXG4gICAgICAgICAgICAgICAgICAgIHhhLl9sZW5ndGggKiAwLjEsIERSQUdHRVJTSVpFLCAnJywgJ3cnKTtcbiAgICAgICAgICAgICAgICBtYWtlRHJhZ0JveChnZCwgcGxvdGluZm8sIHhhLl9vZmZzZXQgKyB4YS5fbGVuZ3RoICogMC45LCB5MCxcbiAgICAgICAgICAgICAgICAgICAgeGEuX2xlbmd0aCAqIDAuMSwgRFJBR0dFUlNJWkUsICcnLCAnZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8geSBheGlzIGRyYWdnZXJzXG4gICAgICAgICAgICBpZihzdWJwbG90ID09PSB5YS5fbWFpblN1YnBsb3QpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgeCBwb3NpdGlvbiBvZiB0aGUgbWFpbiB5IGF4aXMgbGluZVxuICAgICAgICAgICAgICAgIHZhciB4MCA9IHlhLl9tYWluTGluZVBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIGlmKHlhLnNpZGUgIT09ICdyaWdodCcpIHgwIC09IERSQUdHRVJTSVpFO1xuICAgICAgICAgICAgICAgIG1ha2VEcmFnQm94KGdkLCBwbG90aW5mbywgeDAsIHlhLl9vZmZzZXQgKyB5YS5fbGVuZ3RoICogMC4xLFxuICAgICAgICAgICAgICAgICAgICBEUkFHR0VSU0laRSwgeWEuX2xlbmd0aCAqIDAuOCwgJ25zJywgJycpO1xuICAgICAgICAgICAgICAgIG1ha2VEcmFnQm94KGdkLCBwbG90aW5mbywgeDAsIHlhLl9vZmZzZXQgKyB5YS5fbGVuZ3RoICogMC45LFxuICAgICAgICAgICAgICAgICAgICBEUkFHR0VSU0laRSwgeWEuX2xlbmd0aCAqIDAuMSwgJ3MnLCAnJyk7XG4gICAgICAgICAgICAgICAgbWFrZURyYWdCb3goZ2QsIHBsb3RpbmZvLCB4MCwgeWEuX29mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgRFJBR0dFUlNJWkUsIHlhLl9sZW5ndGggKiAwLjEsICduJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBJbiBjYXNlIHlvdSBtb3VzZW1vdmUgb3ZlciBzb21lIGhvdmVydGV4dCwgc2VuZCBpdCB0byBGeC5ob3ZlciB0b29cbiAgICAvLyB3ZSBkbyB0aGlzIHNvIHRoYXQgd2UgY2FuIHB1dCB0aGUgaG92ZXIgdGV4dCBpbiBmcm9udCBvZiBldmVyeXRoaW5nLFxuICAgIC8vIGJ1dCBzdGlsbCBiZSBhYmxlIHRvIGludGVyYWN0IHdpdGggZXZlcnl0aGluZyBhcyBpZiBpdCBpc24ndCB0aGVyZVxuICAgIHZhciBob3ZlckxheWVyID0gZnVsbExheW91dC5faG92ZXJsYXllci5ub2RlKCk7XG5cbiAgICBob3ZlckxheWVyLm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIGV2dC50YXJnZXQgPSBnZC5fZnVsbExheW91dC5fbGFzdGhvdmVyO1xuICAgICAgICBGeC5ob3ZlcihnZCwgZXZ0LCBmdWxsTGF5b3V0Ll9ob3ZlcnN1YnBsb3QpO1xuICAgIH07XG5cbiAgICBob3ZlckxheWVyLm9uY2xpY2sgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgZXZ0LnRhcmdldCA9IGdkLl9mdWxsTGF5b3V0Ll9sYXN0aG92ZXI7XG4gICAgICAgIEZ4LmNsaWNrKGdkLCBldnQpO1xuICAgIH07XG5cbiAgICAvLyBhbHNvIGRlbGVnYXRlIG1vdXNlZG93bnMuLi4gVE9ETzogZG9lcyB0aGlzIGFjdHVhbGx5IHdvcms/XG4gICAgaG92ZXJMYXllci5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBnZC5fZnVsbExheW91dC5fbGFzdGhvdmVyLm9ubW91c2Vkb3duKGV2dCk7XG4gICAgfTtcblxuICAgIGV4cG9ydHMudXBkYXRlRngoZ2QpO1xufTtcblxuLy8gTWluaW1hbCBzZXQgb2YgdXBkYXRlIG5lZWRlZCBvbiAnbW9kZWJhcicgZWRpdHMuXG4vLyBXZSBvbmx5IG5lZWQgdG8gdXBkYXRlIHRoZSA8ZyAuZHJhZ2xheWVyPiBjdXJzb3Igc3R5bGUuXG4vL1xuLy8gTm90ZSB0aGF0IGNoYW5naW5nIHRoZSBheGlzIGNvbmZpZ3VyYXRpb24gYW5kL29yIHRoZSBmaXhlZHJhbmdlIGF0dHJpYnV0ZVxuLy8gc2hvdWxkIHRyaWdnZXIgYSBmdWxsIGluaXRJbnRlcmFjdGlvbnMuXG5leHBvcnRzLnVwZGF0ZUZ4ID0gZnVuY3Rpb24oZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBjdXJzb3IgPSBmdWxsTGF5b3V0LmRyYWdtb2RlID09PSAncGFuJyA/ICdtb3ZlJyA6ICdjcm9zc2hhaXInO1xuICAgIHNldEN1cnNvcihmdWxsTGF5b3V0Ll9kcmFnZ2VycywgY3Vyc29yKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9