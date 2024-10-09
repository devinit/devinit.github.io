(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_components_fx_index_js"],{

/***/ "./node_modules/plotly.js/src/components/fx/calc.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/components/fx/calc.js ***!
  \**********************************************************/
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

module.exports = function calc(gd) {
    var calcdata = gd.calcdata;
    var fullLayout = gd._fullLayout;

    function makeCoerceHoverInfo(trace) {
        return function(val) {
            return Lib.coerceHoverinfo({hoverinfo: val}, {_module: trace._module}, fullLayout);
        };
    }

    for(var i = 0; i < calcdata.length; i++) {
        var cd = calcdata[i];
        var trace = cd[0].trace;

        // don't include hover calc fields for pie traces
        // as calcdata items might be sorted by value and
        // won't match the data array order.
        if(Registry.traceIs(trace, 'pie-like')) continue;

        var fillFn = Registry.traceIs(trace, '2dMap') ? paste : Lib.fillArray;

        fillFn(trace.hoverinfo, cd, 'hi', makeCoerceHoverInfo(trace));

        if(trace.hovertemplate) fillFn(trace.hovertemplate, cd, 'ht');

        if(!trace.hoverlabel) continue;

        fillFn(trace.hoverlabel.bgcolor, cd, 'hbg');
        fillFn(trace.hoverlabel.bordercolor, cd, 'hbc');
        fillFn(trace.hoverlabel.font.size, cd, 'hts');
        fillFn(trace.hoverlabel.font.color, cd, 'htc');
        fillFn(trace.hoverlabel.font.family, cd, 'htf');
        fillFn(trace.hoverlabel.namelength, cd, 'hnl');
        fillFn(trace.hoverlabel.align, cd, 'hta');
    }
};

function paste(traceAttr, cd, cdAttr, fn) {
    fn = fn || Lib.identity;

    if(Array.isArray(traceAttr)) {
        cd[0][cdAttr] = fn(traceAttr);
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/components/fx/click.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/components/fx/click.js ***!
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
var hover = __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/components/fx/hover.js").hover;

module.exports = function click(gd, evt, subplot) {
    var annotationsDone = Registry.getComponentMethod('annotations', 'onClick')(gd, gd._hoverdata);

    // fallback to fail-safe in case the plot type's hover method doesn't pass the subplot.
    // Ternary, for example, didn't, but it was caught because tested.
    if(subplot !== undefined) {
        // The true flag at the end causes it to re-run the hover computation to figure out *which*
        // point is being clicked. Without this, clicking is somewhat unreliable.
        hover(gd, evt, subplot, true);
    }

    function emitClick() { gd.emit('plotly_click', {points: gd._hoverdata, event: evt}); }

    if(gd._hoverdata && evt && evt.target) {
        if(annotationsDone && annotationsDone.then) {
            annotationsDone.then(emitClick);
        } else emitClick();

        // why do we get a double event without this???
        if(evt.stopImmediatePropagation) evt.stopImmediatePropagation();
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/fx/defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/fx/defaults.js ***!
  \**************************************************************/
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
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/components/fx/attributes.js");
var handleHoverLabelDefaults = __webpack_require__(/*! ./hoverlabel_defaults */ "./node_modules/plotly.js/src/components/fx/hoverlabel_defaults.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var opts = Lib.extendFlat({}, layout.hoverlabel);
    if(traceOut.hovertemplate) opts.namelength = -1;

    handleHoverLabelDefaults(traceIn, traceOut, coerce, opts);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/fx/hover.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/components/fx/hover.js ***!
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
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Events = __webpack_require__(/*! ../../lib/events */ "./node_modules/plotly.js/src/lib/events.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var overrideCursor = __webpack_require__(/*! ../../lib/override_cursor */ "./node_modules/plotly.js/src/lib/override_cursor.js");
var Drawing = __webpack_require__(/*! ../drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Color = __webpack_require__(/*! ../color */ "./node_modules/plotly.js/src/components/color/index.js");
var dragElement = __webpack_require__(/*! ../dragelement */ "./node_modules/plotly.js/src/components/dragelement/index.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/components/fx/constants.js");

var legendSupplyDefaults = __webpack_require__(/*! ../legend/defaults */ "./node_modules/plotly.js/src/components/legend/defaults.js");
var legendDraw = __webpack_require__(/*! ../legend/draw */ "./node_modules/plotly.js/src/components/legend/draw.js");

// hover labels for multiple horizontal bars get tilted by some angle,
// then need to be offset differently if they overlap
var YANGLE = constants.YANGLE;
var YA_RADIANS = Math.PI * YANGLE / 180;

// expansion of projected height
var YFACTOR = 1 / Math.sin(YA_RADIANS);

// to make the appropriate post-rotation x offset,
// you need both x and y offsets
var YSHIFTX = Math.cos(YA_RADIANS);
var YSHIFTY = Math.sin(YA_RADIANS);

// size and display constants for hover text
var HOVERARROWSIZE = constants.HOVERARROWSIZE;
var HOVERTEXTPAD = constants.HOVERTEXTPAD;

// fx.hover: highlight data on hover
// evt can be a mousemove event, or an object with data about what points
//   to hover on
//      {xpx,ypx[,hovermode]} - pixel locations from top left
//          (with optional overriding hovermode)
//      {xval,yval[,hovermode]} - data values
//      [{curveNumber,(pointNumber|xval and/or yval)}] -
//              array of specific points to highlight
//          pointNumber is a single integer if gd.data[curveNumber] is 1D,
//              or a two-element array if it's 2D
//          xval and yval are data values,
//              1D data may specify either or both,
//              2D data must specify both
// subplot is an id string (default "xy")
// makes use of gl.hovermode, which can be:
//      x (find the points with the closest x values, ie a column),
//      closest (find the single closest point)
//    internally there are two more that occasionally get used:
//      y (pick out a row - only used for multiple horizontal bar charts)
//      array (used when the user specifies an explicit
//          array of points to hover on)
//
// We wrap the hovers in a timer, to limit their frequency.
// The actual rendering is done by private function _hover.
exports.hover = function hover(gd, evt, subplot, noHoverEvent) {
    gd = Lib.getGraphDiv(gd);

    Lib.throttle(
        gd._fullLayout._uid + constants.HOVERID,
        constants.HOVERMINTIME,
        function() { _hover(gd, evt, subplot, noHoverEvent); }
    );
};

/*
 * Draw a single hover item or an array of hover item in a pre-existing svg container somewhere
 * hoverItem should have keys:
 *    - x and y (or x0, x1, y0, and y1):
 *      the pixel position to mark, relative to opts.container
 *    - xLabel, yLabel, zLabel, text, and name:
 *      info to go in the label
 *    - color:
 *      the background color for the label.
 *    - idealAlign (optional):
 *      'left' or 'right' for which side of the x/y box to try to put this on first
 *    - borderColor (optional):
 *      color for the border, defaults to strongest contrast with color
 *    - fontFamily (optional):
 *      string, the font for this label, defaults to constants.HOVERFONT
 *    - fontSize (optional):
 *      the label font size, defaults to constants.HOVERFONTSIZE
 *    - fontColor (optional):
 *      defaults to borderColor
 * opts should have keys:
 *    - bgColor:
 *      the background color this is against, used if the trace is
 *      non-opaque, and for the name, which goes outside the box
 *    - container:
 *      a <svg> or <g> element to add the hover label to
 *    - outerContainer:
 *      normally a parent of `container`, sets the bounding box to use to
 *      constrain the hover label and determine whether to show it on the left or right
 * opts can have optional keys:
 *    - anchorIndex:
        the index of the hover item used as an anchor for positioning.
        The other hover items will be pushed up or down to prevent overlap.
 */
exports.loneHover = function loneHover(hoverItems, opts) {
    var multiHover = true;
    if(!Array.isArray(hoverItems)) {
        multiHover = false;
        hoverItems = [hoverItems];
    }

    var pointsData = hoverItems.map(function(hoverItem) {
        return {
            color: hoverItem.color || Color.defaultLine,
            x0: hoverItem.x0 || hoverItem.x || 0,
            x1: hoverItem.x1 || hoverItem.x || 0,
            y0: hoverItem.y0 || hoverItem.y || 0,
            y1: hoverItem.y1 || hoverItem.y || 0,
            xLabel: hoverItem.xLabel,
            yLabel: hoverItem.yLabel,
            zLabel: hoverItem.zLabel,
            text: hoverItem.text,
            name: hoverItem.name,
            idealAlign: hoverItem.idealAlign,

            // optional extra bits of styling
            borderColor: hoverItem.borderColor,
            fontFamily: hoverItem.fontFamily,
            fontSize: hoverItem.fontSize,
            fontColor: hoverItem.fontColor,
            nameLength: hoverItem.nameLength,
            textAlign: hoverItem.textAlign,

            // filler to make createHoverText happy
            trace: hoverItem.trace || {
                index: 0,
                hoverinfo: ''
            },
            xa: {_offset: 0},
            ya: {_offset: 0},
            index: 0,

            hovertemplate: hoverItem.hovertemplate || false,
            eventData: hoverItem.eventData || false,
            hovertemplateLabels: hoverItem.hovertemplateLabels || false,
        };
    });

    var container3 = d3.select(opts.container);
    var outerContainer3 = opts.outerContainer ? d3.select(opts.outerContainer) : container3;

    var fullOpts = {
        hovermode: 'closest',
        rotateLabels: false,
        bgColor: opts.bgColor || Color.background,
        container: container3,
        outerContainer: outerContainer3
    };

    var hoverLabel = createHoverText(pointsData, fullOpts, opts.gd);

    // Fix vertical overlap
    var tooltipSpacing = 5;
    var lastBottomY = 0;
    var anchor = 0;
    hoverLabel
        .sort(function(a, b) {return a.y0 - b.y0;})
        .each(function(d, i) {
            var topY = d.y0 - d.by / 2;

            if((topY - tooltipSpacing) < lastBottomY) {
                d.offset = (lastBottomY - topY) + tooltipSpacing;
            } else {
                d.offset = 0;
            }

            lastBottomY = topY + d.by + d.offset;

            if(i === opts.anchorIndex || 0) anchor = d.offset;
        })
        .each(function(d) {
            d.offset -= anchor;
        });

    alignHoverText(hoverLabel, fullOpts.rotateLabels);

    return multiHover ? hoverLabel : hoverLabel.node();
};

// The actual implementation is here:
function _hover(gd, evt, subplot, noHoverEvent) {
    if(!subplot) subplot = 'xy';

    // if the user passed in an array of subplots,
    // use those instead of finding overlayed plots
    var subplots = Array.isArray(subplot) ? subplot : [subplot];

    var fullLayout = gd._fullLayout;
    var plots = fullLayout._plots || [];
    var plotinfo = plots[subplot];
    var hasCartesian = fullLayout._has('cartesian');

    // list of all overlaid subplots to look at
    if(plotinfo) {
        var overlayedSubplots = plotinfo.overlays.map(function(pi) {
            return pi.id;
        });

        subplots = subplots.concat(overlayedSubplots);
    }

    var len = subplots.length;
    var xaArray = new Array(len);
    var yaArray = new Array(len);
    var supportsCompare = false;

    for(var i = 0; i < len; i++) {
        var spId = subplots[i];

        if(plots[spId]) {
            // 'cartesian' case
            supportsCompare = true;
            xaArray[i] = plots[spId].xaxis;
            yaArray[i] = plots[spId].yaxis;
        } else if(fullLayout[spId] && fullLayout[spId]._subplot) {
            // other subplot types
            var _subplot = fullLayout[spId]._subplot;
            xaArray[i] = _subplot.xaxis;
            yaArray[i] = _subplot.yaxis;
        } else {
            Lib.warn('Unrecognized subplot: ' + spId);
            return;
        }
    }

    var hovermode = evt.hovermode || fullLayout.hovermode;

    if(hovermode && !supportsCompare) hovermode = 'closest';

    if(['x', 'y', 'closest', 'x unified', 'y unified'].indexOf(hovermode) === -1 || !gd.calcdata ||
            gd.querySelector('.zoombox') || gd._dragging) {
        return dragElement.unhoverRaw(gd, evt);
    }

    var hoverdistance = fullLayout.hoverdistance === -1 ? Infinity : fullLayout.hoverdistance;
    var spikedistance = fullLayout.spikedistance === -1 ? Infinity : fullLayout.spikedistance;

    // hoverData: the set of candidate points we've found to highlight
    var hoverData = [];

    // searchData: the data to search in. Mostly this is just a copy of
    // gd.calcdata, filtered to the subplot and overlays we're on
    // but if a point array is supplied it will be a mapping
    // of indicated curves
    var searchData = [];

    // [x|y]valArray: the axis values of the hover event
    // mapped onto each of the currently selected overlaid subplots
    var xvalArray, yvalArray;

    var itemnum, curvenum, cd, trace, subplotId, subploti, mode,
        xval, yval, pointData, closedataPreviousLength;

    // spikePoints: the set of candidate points we've found to draw spikes to
    var spikePoints = {
        hLinePoint: null,
        vLinePoint: null
    };

    // does subplot have one (or more) horizontal traces?
    // This is used to determine whether we rotate the labels or not
    var hasOneHorizontalTrace = false;

    // Figure out what we're hovering on:
    // mouse location or user-supplied data

    if(Array.isArray(evt)) {
        // user specified an array of points to highlight
        hovermode = 'array';
        for(itemnum = 0; itemnum < evt.length; itemnum++) {
            cd = gd.calcdata[evt[itemnum].curveNumber || 0];
            if(cd) {
                trace = cd[0].trace;
                if(cd[0].trace.hoverinfo !== 'skip') {
                    searchData.push(cd);
                    if(trace.orientation === 'h') {
                        hasOneHorizontalTrace = true;
                    }
                }
            }
        }
    } else {
        for(curvenum = 0; curvenum < gd.calcdata.length; curvenum++) {
            cd = gd.calcdata[curvenum];
            trace = cd[0].trace;
            if(trace.hoverinfo !== 'skip' && helpers.isTraceInSubplots(trace, subplots)) {
                searchData.push(cd);
                if(trace.orientation === 'h') {
                    hasOneHorizontalTrace = true;
                }
            }
        }

        // [x|y]px: the pixels (from top left) of the mouse location
        // on the currently selected plot area
        // add pointerX|Y property for drawing the spikes in spikesnap 'cursor' situation
        var hasUserCalledHover = !evt.target;
        var xpx, ypx;

        if(hasUserCalledHover) {
            if('xpx' in evt) xpx = evt.xpx;
            else xpx = xaArray[0]._length / 2;

            if('ypx' in evt) ypx = evt.ypx;
            else ypx = yaArray[0]._length / 2;
        } else {
            // fire the beforehover event and quit if it returns false
            // note that we're only calling this on real mouse events, so
            // manual calls to fx.hover will always run.
            if(Events.triggerHandler(gd, 'plotly_beforehover', evt) === false) {
                return;
            }

            var dbb = evt.target.getBoundingClientRect();

            xpx = evt.clientX - dbb.left;
            ypx = evt.clientY - dbb.top;

            // in case hover was called from mouseout into hovertext,
            // it's possible you're not actually over the plot anymore
            if(xpx < 0 || xpx > xaArray[0]._length || ypx < 0 || ypx > yaArray[0]._length) {
                return dragElement.unhoverRaw(gd, evt);
            }
        }

        evt.pointerX = xpx + xaArray[0]._offset;
        evt.pointerY = ypx + yaArray[0]._offset;

        if('xval' in evt) xvalArray = helpers.flat(subplots, evt.xval);
        else xvalArray = helpers.p2c(xaArray, xpx);

        if('yval' in evt) yvalArray = helpers.flat(subplots, evt.yval);
        else yvalArray = helpers.p2c(yaArray, ypx);

        if(!isNumeric(xvalArray[0]) || !isNumeric(yvalArray[0])) {
            Lib.warn('Fx.hover failed', evt, gd);
            return dragElement.unhoverRaw(gd, evt);
        }
    }

    // the pixel distance to beat as a matching point
    // in 'x' or 'y' mode this resets for each trace
    var distance = Infinity;

    // find the closest point in each trace
    // this is minimum dx and/or dy, depending on mode
    // and the pixel position for the label (labelXpx, labelYpx)
    function findHoverPoints(customXVal, customYVal) {
        for(curvenum = 0; curvenum < searchData.length; curvenum++) {
            cd = searchData[curvenum];

            // filter out invisible or broken data
            if(!cd || !cd[0] || !cd[0].trace) continue;

            trace = cd[0].trace;

            if(trace.visible !== true || trace._length === 0) continue;

            // Explicitly bail out for these two. I don't know how to otherwise prevent
            // the rest of this function from running and failing
            if(['carpet', 'contourcarpet'].indexOf(trace._module.name) !== -1) continue;

            if(trace.type === 'splom') {
                // splom traces do not generate overlay subplots,
                // it is safe to assume here splom traces correspond to the 0th subplot
                subploti = 0;
                subplotId = subplots[subploti];
            } else {
                subplotId = helpers.getSubplot(trace);
                subploti = subplots.indexOf(subplotId);
            }

            // within one trace mode can sometimes be overridden
            mode = hovermode;
            if(helpers.isUnifiedHover(mode)) {
                mode = mode.charAt(0);
            }

            // container for new point, also used to pass info into module.hoverPoints
            pointData = {
                // trace properties
                cd: cd,
                trace: trace,
                xa: xaArray[subploti],
                ya: yaArray[subploti],

                // max distances for hover and spikes - for points that want to show but do not
                // want to override other points, set distance/spikeDistance equal to max*Distance
                // and it will not get filtered out but it will be guaranteed to have a greater
                // distance than any point that calculated a real distance.
                maxHoverDistance: hoverdistance,
                maxSpikeDistance: spikedistance,

                // point properties - override all of these
                index: false, // point index in trace - only used by plotly.js hoverdata consumers
                distance: Math.min(distance, hoverdistance), // pixel distance or pseudo-distance

                // distance/pseudo-distance for spikes. This distance should always be calculated
                // as if in "closest" mode, and should only be set if this point should
                // generate a spike.
                spikeDistance: Infinity,

                // in some cases the spikes have different positioning from the hover label
                // they don't need x0/x1, just one position
                xSpike: undefined,
                ySpike: undefined,

                // where and how to display the hover label
                color: Color.defaultLine, // trace color
                name: trace.name,
                x0: undefined,
                x1: undefined,
                y0: undefined,
                y1: undefined,
                xLabelVal: undefined,
                yLabelVal: undefined,
                zLabelVal: undefined,
                text: undefined
            };

            // add ref to subplot object (non-cartesian case)
            if(fullLayout[subplotId]) {
                pointData.subplot = fullLayout[subplotId]._subplot;
            }
            // add ref to splom scene
            if(fullLayout._splomScenes && fullLayout._splomScenes[trace.uid]) {
                pointData.scene = fullLayout._splomScenes[trace.uid];
            }

            closedataPreviousLength = hoverData.length;

            // for a highlighting array, figure out what
            // we're searching for with this element
            if(mode === 'array') {
                var selection = evt[curvenum];
                if('pointNumber' in selection) {
                    pointData.index = selection.pointNumber;
                    mode = 'closest';
                } else {
                    mode = '';
                    if('xval' in selection) {
                        xval = selection.xval;
                        mode = 'x';
                    }
                    if('yval' in selection) {
                        yval = selection.yval;
                        mode = mode ? 'closest' : 'y';
                    }
                }
            } else if(customXVal !== undefined && customYVal !== undefined) {
                xval = customXVal;
                yval = customYVal;
            } else {
                xval = xvalArray[subploti];
                yval = yvalArray[subploti];
            }

            // Now if there is range to look in, find the points to hover.
            if(hoverdistance !== 0) {
                if(trace._module && trace._module.hoverPoints) {
                    var newPoints = trace._module.hoverPoints(pointData, xval, yval, mode, fullLayout._hoverlayer);
                    if(newPoints) {
                        var newPoint;
                        for(var newPointNum = 0; newPointNum < newPoints.length; newPointNum++) {
                            newPoint = newPoints[newPointNum];
                            if(isNumeric(newPoint.x0) && isNumeric(newPoint.y0)) {
                                hoverData.push(cleanPoint(newPoint, hovermode));
                            }
                        }
                    }
                } else {
                    Lib.log('Unrecognized trace type in hover:', trace);
                }
            }

            // in closest mode, remove any existing (farther) points
            // and don't look any farther than this latest point (or points, some
            // traces like box & violin make multiple hover labels at once)
            if(hovermode === 'closest' && hoverData.length > closedataPreviousLength) {
                hoverData.splice(0, closedataPreviousLength);
                distance = hoverData[0].distance;
            }

            // Now if there is range to look in, find the points to draw the spikelines
            // Do it only if there is no hoverData
            if(hasCartesian && (spikedistance !== 0)) {
                if(hoverData.length === 0) {
                    pointData.distance = spikedistance;
                    pointData.index = false;
                    var closestPoints = trace._module.hoverPoints(pointData, xval, yval, 'closest', fullLayout._hoverlayer);
                    if(closestPoints) {
                        closestPoints = closestPoints.filter(function(point) {
                            // some hover points, like scatter fills, do not allow spikes,
                            // so will generate a hover point but without a valid spikeDistance
                            return point.spikeDistance <= spikedistance;
                        });
                    }
                    if(closestPoints && closestPoints.length) {
                        var tmpPoint;
                        var closestVPoints = closestPoints.filter(function(point) {
                            return point.xa.showspikes && point.xa.spikesnap !== 'hovered data';
                        });
                        if(closestVPoints.length) {
                            var closestVPt = closestVPoints[0];
                            if(isNumeric(closestVPt.x0) && isNumeric(closestVPt.y0)) {
                                tmpPoint = fillSpikePoint(closestVPt);
                                if(!spikePoints.vLinePoint || (spikePoints.vLinePoint.spikeDistance > tmpPoint.spikeDistance)) {
                                    spikePoints.vLinePoint = tmpPoint;
                                }
                            }
                        }

                        var closestHPoints = closestPoints.filter(function(point) {
                            return point.ya.showspikes && point.ya.spikesnap !== 'hovered data';
                        });
                        if(closestHPoints.length) {
                            var closestHPt = closestHPoints[0];
                            if(isNumeric(closestHPt.x0) && isNumeric(closestHPt.y0)) {
                                tmpPoint = fillSpikePoint(closestHPt);
                                if(!spikePoints.hLinePoint || (spikePoints.hLinePoint.spikeDistance > tmpPoint.spikeDistance)) {
                                    spikePoints.hLinePoint = tmpPoint;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    findHoverPoints();

    function selectClosestPoint(pointsData, spikedistance) {
        var resultPoint = null;
        var minDistance = Infinity;
        var thisSpikeDistance;
        for(var i = 0; i < pointsData.length; i++) {
            thisSpikeDistance = pointsData[i].spikeDistance;
            if(thisSpikeDistance <= minDistance && thisSpikeDistance <= spikedistance) {
                resultPoint = pointsData[i];
                minDistance = thisSpikeDistance;
            }
        }
        return resultPoint;
    }

    function fillSpikePoint(point) {
        if(!point) return null;
        return {
            xa: point.xa,
            ya: point.ya,
            x: point.xSpike !== undefined ? point.xSpike : (point.x0 + point.x1) / 2,
            y: point.ySpike !== undefined ? point.ySpike : (point.y0 + point.y1) / 2,
            distance: point.distance,
            spikeDistance: point.spikeDistance,
            curveNumber: point.trace.index,
            color: point.color,
            pointNumber: point.index
        };
    }

    var spikelineOpts = {
        fullLayout: fullLayout,
        container: fullLayout._hoverlayer,
        outerContainer: fullLayout._paperdiv,
        event: evt
    };
    var oldspikepoints = gd._spikepoints;
    var newspikepoints = {
        vLinePoint: spikePoints.vLinePoint,
        hLinePoint: spikePoints.hLinePoint
    };
    gd._spikepoints = newspikepoints;

    // Now if it is not restricted by spikedistance option, set the points to draw the spikelines
    if(hasCartesian && (spikedistance !== 0)) {
        if(hoverData.length !== 0) {
            var tmpHPointData = hoverData.filter(function(point) {
                return point.ya.showspikes;
            });
            var tmpHPoint = selectClosestPoint(tmpHPointData, spikedistance);
            spikePoints.hLinePoint = fillSpikePoint(tmpHPoint);

            var tmpVPointData = hoverData.filter(function(point) {
                return point.xa.showspikes;
            });
            var tmpVPoint = selectClosestPoint(tmpVPointData, spikedistance);
            spikePoints.vLinePoint = fillSpikePoint(tmpVPoint);
        }
    }

    // if hoverData is empty check for the spikes to draw and quit if there are none
    if(hoverData.length === 0) {
        var result = dragElement.unhoverRaw(gd, evt);
        if(hasCartesian && ((spikePoints.hLinePoint !== null) || (spikePoints.vLinePoint !== null))) {
            if(spikesChanged(oldspikepoints)) {
                createSpikelines(gd, spikePoints, spikelineOpts);
            }
        }
        return result;
    }

    if(hasCartesian) {
        if(spikesChanged(oldspikepoints)) {
            createSpikelines(gd, spikePoints, spikelineOpts);
        }
    }

    hoverData.sort(function(d1, d2) { return d1.distance - d2.distance; });

    // If in compare mode, select every point at position
    if(
        helpers.isXYhover(mode) &&
        hoverData[0].length !== 0 &&
        hoverData[0].trace.type !== 'splom' // TODO: add support for splom
    ) {
        var hd = hoverData[0];
        var cd0 = hd.cd[hd.index];
        var isGrouped = (fullLayout.boxmode === 'group' || fullLayout.violinmode === 'group');

        var xVal = hd.xVal;
        var ax = hd.xa;
        if(ax.type === 'category') xVal = ax._categoriesMap[xVal];
        if(ax.type === 'date') xVal = ax.d2c(xVal);
        if(cd0 && cd0.t && cd0.t.posLetter === ax._id && isGrouped) {
            xVal += cd0.t.dPos;
        }

        var yVal = hd.yVal;
        ax = hd.ya;
        if(ax.type === 'category') yVal = ax._categoriesMap[yVal];
        if(ax.type === 'date') yVal = ax.d2c(yVal);
        if(cd0 && cd0.t && cd0.t.posLetter === ax._id && isGrouped) {
            yVal += cd0.t.dPos;
        }

        findHoverPoints(xVal, yVal);

        // Remove duplicated hoverData points
        // note that d3 also filters identical points in the rendering steps
        var repeated = {};
        hoverData = hoverData.filter(function(hd) {
            var key = hoverDataKey(hd);
            if(!repeated[key]) {
                repeated[key] = true;
                return repeated[key];
            }
        });
    }

    // lastly, emit custom hover/unhover events
    var oldhoverdata = gd._hoverdata;
    var newhoverdata = [];

    // pull out just the data that's useful to
    // other people and send it to the event
    for(itemnum = 0; itemnum < hoverData.length; itemnum++) {
        var pt = hoverData[itemnum];
        var eventData = helpers.makeEventData(pt, pt.trace, pt.cd);

        if(pt.hovertemplate !== false) {
            var ht = false;
            if(pt.cd[pt.index] && pt.cd[pt.index].ht) {
                ht = pt.cd[pt.index].ht;
            }
            pt.hovertemplate = ht || pt.trace.hovertemplate || false;
        }

        pt.eventData = [eventData];
        newhoverdata.push(eventData);
    }

    gd._hoverdata = newhoverdata;

    var rotateLabels = (
        (hovermode === 'y' && (searchData.length > 1 || hoverData.length > 1)) ||
        (hovermode === 'closest' && hasOneHorizontalTrace && hoverData.length > 1)
    );

    var bgColor = Color.combine(
        fullLayout.plot_bgcolor || Color.background,
        fullLayout.paper_bgcolor
    );

    var labelOpts = {
        hovermode: hovermode,
        rotateLabels: rotateLabels,
        bgColor: bgColor,
        container: fullLayout._hoverlayer,
        outerContainer: fullLayout._paperdiv,
        commonLabelOpts: fullLayout.hoverlabel,
        hoverdistance: fullLayout.hoverdistance
    };

    var hoverLabels = createHoverText(hoverData, labelOpts, gd);

    if(!helpers.isUnifiedHover(hovermode)) {
        hoverAvoidOverlaps(hoverLabels, rotateLabels ? 'xa' : 'ya', fullLayout);
        alignHoverText(hoverLabels, rotateLabels);
    }

    // TODO: tagName hack is needed to appease geo.js's hack of using evt.target=true
    // we should improve the "fx" API so other plots can use it without these hack.
    if(evt.target && evt.target.tagName) {
        var hasClickToShow = Registry.getComponentMethod('annotations', 'hasClickToShow')(gd, newhoverdata);
        overrideCursor(d3.select(evt.target), hasClickToShow ? 'pointer' : '');
    }

    // don't emit events if called manually
    if(!evt.target || noHoverEvent || !hoverChanged(gd, evt, oldhoverdata)) return;

    if(oldhoverdata) {
        gd.emit('plotly_unhover', {
            event: evt,
            points: oldhoverdata
        });
    }

    gd.emit('plotly_hover', {
        event: evt,
        points: gd._hoverdata,
        xaxes: xaArray,
        yaxes: yaArray,
        xvals: xvalArray,
        yvals: yvalArray
    });
}

function hoverDataKey(d) {
    return [d.trace.index, d.index, d.x0, d.y0, d.name, d.attr, d.xa, d.ya || ''].join(',');
}

var EXTRA_STRING_REGEX = /<extra>([\s\S]*)<\/extra>/;

function createHoverText(hoverData, opts, gd) {
    var fullLayout = gd._fullLayout;
    var hovermode = opts.hovermode;
    var rotateLabels = opts.rotateLabels;
    var bgColor = opts.bgColor;
    var container = opts.container;
    var outerContainer = opts.outerContainer;
    var commonLabelOpts = opts.commonLabelOpts || {};

    // opts.fontFamily/Size are used for the common label
    // and as defaults for each hover label, though the individual labels
    // can override this.
    var fontFamily = opts.fontFamily || constants.HOVERFONT;
    var fontSize = opts.fontSize || constants.HOVERFONTSIZE;

    var c0 = hoverData[0];
    var xa = c0.xa;
    var ya = c0.ya;
    var commonAttr = hovermode.charAt(0) === 'y' ? 'yLabel' : 'xLabel';
    var t0 = c0[commonAttr];
    var t00 = (String(t0) || '').split(' ')[0];
    var outerContainerBB = outerContainer.node().getBoundingClientRect();
    var outerTop = outerContainerBB.top;
    var outerWidth = outerContainerBB.width;
    var outerHeight = outerContainerBB.height;

    // show the common label, if any, on the axis
    // never show a common label in array mode,
    // even if sometimes there could be one
    var showCommonLabel = (
        (t0 !== undefined) &&
        (c0.distance <= opts.hoverdistance) &&
        (hovermode === 'x' || hovermode === 'y')
    );

    // all hover traces hoverinfo must contain the hovermode
    // to have common labels
    if(showCommonLabel) {
        var allHaveZ = true;
        var i, traceHoverinfo;
        for(i = 0; i < hoverData.length; i++) {
            if(allHaveZ && hoverData[i].zLabel === undefined) allHaveZ = false;

            traceHoverinfo = hoverData[i].hoverinfo || hoverData[i].trace.hoverinfo;
            if(traceHoverinfo) {
                var parts = Array.isArray(traceHoverinfo) ? traceHoverinfo : traceHoverinfo.split('+');
                if(parts.indexOf('all') === -1 &&
                    parts.indexOf(hovermode) === -1) {
                    showCommonLabel = false;
                    break;
                }
            }
        }

        // xyz labels put all info in their main label, so have no need of a common label
        if(allHaveZ) showCommonLabel = false;
    }

    var commonLabel = container.selectAll('g.axistext')
        .data(showCommonLabel ? [0] : []);
    commonLabel.enter().append('g')
        .classed('axistext', true);
    commonLabel.exit().remove();

    commonLabel.each(function() {
        var label = d3.select(this);
        var lpath = Lib.ensureSingle(label, 'path', '', function(s) {
            s.style({'stroke-width': '1px'});
        });
        var ltext = Lib.ensureSingle(label, 'text', '', function(s) {
            // prohibit tex interpretation until we can handle
            // tex and regular text together
            s.attr('data-notex', 1);
        });

        var commonBgColor = commonLabelOpts.bgcolor || Color.defaultLine;
        var commonStroke = commonLabelOpts.bordercolor || Color.contrast(commonBgColor);
        var contrastColor = Color.contrast(commonBgColor);
        var commonLabelFont = {
            family: commonLabelOpts.font.family || fontFamily,
            size: commonLabelOpts.font.size || fontSize,
            color: commonLabelOpts.font.color || contrastColor
        };

        lpath.style({
            fill: commonBgColor,
            stroke: commonStroke
        });

        ltext.text(t0)
            .call(Drawing.font, commonLabelFont)
            .call(svgTextUtils.positionText, 0, 0)
            .call(svgTextUtils.convertToTspans, gd);

        label.attr('transform', '');

        var tbb = ltext.node().getBoundingClientRect();
        var lx, ly;

        if(hovermode === 'x') {
            var topsign = xa.side === 'top' ? '-' : '';

            ltext.attr('text-anchor', 'middle')
                .call(svgTextUtils.positionText, 0, (xa.side === 'top' ?
                    (outerTop - tbb.bottom - HOVERARROWSIZE - HOVERTEXTPAD) :
                    (outerTop - tbb.top + HOVERARROWSIZE + HOVERTEXTPAD)));

            lx = xa._offset + (c0.x0 + c0.x1) / 2;
            ly = ya._offset + (xa.side === 'top' ? 0 : ya._length);

            var halfWidth = tbb.width / 2 + HOVERTEXTPAD;

            if(lx < halfWidth) {
                lx = halfWidth;

                lpath.attr('d', 'M-' + (halfWidth - HOVERARROWSIZE) + ',0' +
                    'L-' + (halfWidth - HOVERARROWSIZE * 2) + ',' + topsign + HOVERARROWSIZE +
                    'H' + (HOVERTEXTPAD + tbb.width / 2) +
                    'v' + topsign + (HOVERTEXTPAD * 2 + tbb.height) +
                    'H-' + halfWidth +
                    'V' + topsign + HOVERARROWSIZE +
                    'Z');
            } else if(lx > (fullLayout.width - halfWidth)) {
                lx = fullLayout.width - halfWidth;

                lpath.attr('d', 'M' + (halfWidth - HOVERARROWSIZE) + ',0' +
                    'L' + halfWidth + ',' + topsign + HOVERARROWSIZE +
                    'v' + topsign + (HOVERTEXTPAD * 2 + tbb.height) +
                    'H-' + halfWidth +
                    'V' + topsign + HOVERARROWSIZE +
                    'H' + (halfWidth - HOVERARROWSIZE * 2) + 'Z');
            } else {
                lpath.attr('d', 'M0,0' +
                    'L' + HOVERARROWSIZE + ',' + topsign + HOVERARROWSIZE +
                    'H' + (HOVERTEXTPAD + tbb.width / 2) +
                    'v' + topsign + (HOVERTEXTPAD * 2 + tbb.height) +
                    'H-' + (HOVERTEXTPAD + tbb.width / 2) +
                    'V' + topsign + HOVERARROWSIZE +
                    'H-' + HOVERARROWSIZE + 'Z');
            }
        } else {
            var anchor;
            var sgn;
            var leftsign;
            if(ya.side === 'right') {
                anchor = 'start';
                sgn = 1;
                leftsign = '';
                lx = xa._offset + xa._length;
            } else {
                anchor = 'end';
                sgn = -1;
                leftsign = '-';
                lx = xa._offset;
            }

            ly = ya._offset + (c0.y0 + c0.y1) / 2;

            ltext.attr('text-anchor', anchor);

            lpath.attr('d', 'M0,0' +
                'L' + leftsign + HOVERARROWSIZE + ',' + HOVERARROWSIZE +
                'V' + (HOVERTEXTPAD + tbb.height / 2) +
                'h' + leftsign + (HOVERTEXTPAD * 2 + tbb.width) +
                'V-' + (HOVERTEXTPAD + tbb.height / 2) +
                'H' + leftsign + HOVERARROWSIZE + 'V-' + HOVERARROWSIZE + 'Z');

            var halfHeight = tbb.height / 2;
            var lty = outerTop - tbb.top - halfHeight;
            var clipId = 'clip' + fullLayout._uid + 'commonlabel' + ya._id;
            var clipPath;

            if(lx < (tbb.width + 2 * HOVERTEXTPAD + HOVERARROWSIZE)) {
                clipPath = 'M-' + (HOVERARROWSIZE + HOVERTEXTPAD) + '-' + halfHeight +
                    'h-' + (tbb.width - HOVERTEXTPAD) +
                    'V' + halfHeight +
                    'h' + (tbb.width - HOVERTEXTPAD) + 'Z';

                var ltx = tbb.width - lx + HOVERTEXTPAD;
                svgTextUtils.positionText(ltext, ltx, lty);

                // shift each line (except the longest) so that start-of-line
                // is always visible
                if(anchor === 'end') {
                    ltext.selectAll('tspan').each(function() {
                        var s = d3.select(this);
                        var dummy = Drawing.tester.append('text')
                            .text(s.text())
                            .call(Drawing.font, commonLabelFont);
                        var dummyBB = dummy.node().getBoundingClientRect();
                        if(Math.round(dummyBB.width) < Math.round(tbb.width)) {
                            s.attr('x', ltx - dummyBB.width);
                        }
                        dummy.remove();
                    });
                }
            } else {
                svgTextUtils.positionText(ltext, sgn * (HOVERTEXTPAD + HOVERARROWSIZE), lty);
                clipPath = null;
            }

            var textClip = fullLayout._topclips.selectAll('#' + clipId).data(clipPath ? [0] : []);
            textClip.enter().append('clipPath').attr('id', clipId).append('path');
            textClip.exit().remove();
            textClip.select('path').attr('d', clipPath);
            Drawing.setClipUrl(ltext, clipPath ? clipId : null, gd);
        }

        label.attr('transform', 'translate(' + lx + ',' + ly + ')');

        // remove the "close but not quite" points
        // because of error bars, only take up to a space
        hoverData = filterClosePoints(hoverData);
    });

    function filterClosePoints(hoverData) {
        return hoverData.filter(function(d) {
            return (d.zLabelVal !== undefined) ||
                (d[commonAttr] || '').split(' ')[0] === t00;
        });
    }

    // Show a single hover label
    if(helpers.isUnifiedHover(hovermode)) {
        // Delete leftover hover labels from other hovermodes
        container.selectAll('g.hovertext').remove();

        // similarly to compare mode, we remove the "close but not quite together" points
        if((t0 !== undefined) && (c0.distance <= opts.hoverdistance)) hoverData = filterClosePoints(hoverData);

        // Return early if nothing is hovered on
        if(hoverData.length === 0) return;

        // mock legend
        var mockLayoutIn = {
            showlegend: true,
            legend: {
                title: {text: t0, font: fullLayout.hoverlabel.font},
                font: fullLayout.hoverlabel.font,
                bgcolor: fullLayout.hoverlabel.bgcolor,
                bordercolor: fullLayout.hoverlabel.bordercolor,
                borderwidth: 1,
                tracegroupgap: 7,
                traceorder: fullLayout.legend ? fullLayout.legend.traceorder : undefined,
                orientation: 'v'
            }
        };
        var mockLayoutOut = {};
        legendSupplyDefaults(mockLayoutIn, mockLayoutOut, gd._fullData);
        var legendOpts = mockLayoutOut.legend;

        // prepare items for the legend
        legendOpts.entries = [];
        for(var j = 0; j < hoverData.length; j++) {
            var texts = getHoverLabelText(hoverData[j], true, hovermode, fullLayout, t0);
            var text = texts[0];
            var name = texts[1];
            var pt = hoverData[j];
            pt.name = name;
            if(name !== '') {
                pt.text = name + ' : ' + text;
            } else {
                pt.text = text;
            }

            // pass through marker's calcdata to style legend items
            var cd = pt.cd[pt.index];
            if(cd) {
                if(cd.mc) pt.mc = cd.mc;
                if(cd.mcc) pt.mc = cd.mcc;
                if(cd.mlc) pt.mlc = cd.mlc;
                if(cd.mlcc) pt.mlc = cd.mlcc;
                if(cd.mlw) pt.mlw = cd.mlw;
                if(cd.mrc) pt.mrc = cd.mrc;
                if(cd.dir) pt.dir = cd.dir;
            }
            pt._distinct = true;

            legendOpts.entries.push([pt]);
        }
        legendOpts.entries.sort(function(a, b) { return a[0].trace.index - b[0].trace.index;});
        legendOpts.layer = container;

        // Draw unified hover label
        legendDraw(gd, legendOpts);

        // Position the hover
        var ly = Lib.mean(hoverData.map(function(c) {return (c.y0 + c.y1) / 2;}));
        var lx = Lib.mean(hoverData.map(function(c) {return (c.x0 + c.x1) / 2;}));
        var legendContainer = container.select('g.legend');
        var tbb = legendContainer.node().getBoundingClientRect();
        lx += xa._offset;
        ly += ya._offset - tbb.height / 2;

        // Change horizontal alignment to end up on screen
        var txWidth = tbb.width + 2 * HOVERTEXTPAD;
        var anchorStartOK = lx + txWidth <= outerWidth;
        var anchorEndOK = lx - txWidth >= 0;
        if(!anchorStartOK && anchorEndOK) {
            lx -= txWidth;
        } else {
            lx += 2 * HOVERTEXTPAD;
        }

        // Change vertical alignement to end up on screen
        var txHeight = tbb.height + 2 * HOVERTEXTPAD;
        var overflowTop = ly <= outerTop;
        var overflowBottom = ly + txHeight >= outerHeight;
        var canFit = txHeight <= outerHeight;
        if(canFit) {
            if(overflowTop) {
                ly = ya._offset + 2 * HOVERTEXTPAD;
            } else if(overflowBottom) {
                ly = outerHeight - txHeight;
            }
        }
        legendContainer.attr('transform', 'translate(' + lx + ',' + ly + ')');

        return legendContainer;
    }

    // show all the individual labels

    // first create the objects
    var hoverLabels = container.selectAll('g.hovertext')
        .data(hoverData, function(d) {
            // N.B. when multiple items have the same result key-function value,
            // only the first of those items in hoverData gets rendered
            return hoverDataKey(d);
        });
    hoverLabels.enter().append('g')
        .classed('hovertext', true)
        .each(function() {
            var g = d3.select(this);
            // trace name label (rect and text.name)
            g.append('rect')
                .call(Color.fill, Color.addOpacity(bgColor, 0.8));
            g.append('text').classed('name', true);
            // trace data label (path and text.nums)
            g.append('path')
                .style('stroke-width', '1px');
            g.append('text').classed('nums', true)
                .call(Drawing.font, fontFamily, fontSize);
        });
    hoverLabels.exit().remove();

    // then put the text in, position the pointer to the data,
    // and figure out sizes
    hoverLabels.each(function(d) {
        var g = d3.select(this).attr('transform', '');

        // combine possible non-opaque trace color with bgColor
        var color0 = d.bgcolor || d.color;
        // color for 'nums' part of the label
        var numsColor = Color.combine(
            Color.opacity(color0) ? color0 : Color.defaultLine,
            bgColor
        );
        // color for 'name' part of the label
        var nameColor = Color.combine(
            Color.opacity(d.color) ? d.color : Color.defaultLine,
            bgColor
        );
        // find a contrasting color for border and text
        var contrastColor = d.borderColor || Color.contrast(numsColor);

        var texts = getHoverLabelText(d, showCommonLabel, hovermode, fullLayout, t0, g);
        var text = texts[0];
        var name = texts[1];

        // main label
        var tx = g.select('text.nums')
            .call(Drawing.font,
                d.fontFamily || fontFamily,
                d.fontSize || fontSize,
                d.fontColor || contrastColor)
            .text(text)
            .attr('data-notex', 1)
            .call(svgTextUtils.positionText, 0, 0)
            .call(svgTextUtils.convertToTspans, gd);

        var tx2 = g.select('text.name');
        var tx2width = 0;
        var tx2height = 0;

        // secondary label for non-empty 'name'
        if(name && name !== text) {
            tx2.call(Drawing.font,
                    d.fontFamily || fontFamily,
                    d.fontSize || fontSize,
                    nameColor)
                .text(name)
                .attr('data-notex', 1)
                .call(svgTextUtils.positionText, 0, 0)
                .call(svgTextUtils.convertToTspans, gd);

            var t2bb = tx2.node().getBoundingClientRect();
            tx2width = t2bb.width + 2 * HOVERTEXTPAD;
            tx2height = t2bb.height + 2 * HOVERTEXTPAD;
        } else {
            tx2.remove();
            g.select('rect').remove();
        }

        g.select('path').style({
            fill: numsColor,
            stroke: contrastColor
        });

        var tbb = tx.node().getBoundingClientRect();
        var htx = d.xa._offset + (d.x0 + d.x1) / 2;
        var hty = d.ya._offset + (d.y0 + d.y1) / 2;
        var dx = Math.abs(d.x1 - d.x0);
        var dy = Math.abs(d.y1 - d.y0);
        var txTotalWidth = tbb.width + HOVERARROWSIZE + HOVERTEXTPAD + tx2width;
        var anchorStartOK, anchorEndOK;

        d.ty0 = outerTop - tbb.top;
        d.bx = tbb.width + 2 * HOVERTEXTPAD;
        d.by = Math.max(tbb.height + 2 * HOVERTEXTPAD, tx2height);
        d.anchor = 'start';
        d.txwidth = tbb.width;
        d.tx2width = tx2width;
        d.offset = 0;

        if(rotateLabels) {
            d.pos = htx;
            anchorStartOK = hty + dy / 2 + txTotalWidth <= outerHeight;
            anchorEndOK = hty - dy / 2 - txTotalWidth >= 0;
            if((d.idealAlign === 'top' || !anchorStartOK) && anchorEndOK) {
                hty -= dy / 2;
                d.anchor = 'end';
            } else if(anchorStartOK) {
                hty += dy / 2;
                d.anchor = 'start';
            } else d.anchor = 'middle';
        } else {
            d.pos = hty;
            anchorStartOK = htx + dx / 2 + txTotalWidth <= outerWidth;
            anchorEndOK = htx - dx / 2 - txTotalWidth >= 0;

            if((d.idealAlign === 'left' || !anchorStartOK) && anchorEndOK) {
                htx -= dx / 2;
                d.anchor = 'end';
            } else if(anchorStartOK) {
                htx += dx / 2;
                d.anchor = 'start';
            } else {
                d.anchor = 'middle';

                var txHalfWidth = txTotalWidth / 2;
                var overflowR = htx + txHalfWidth - outerWidth;
                var overflowL = htx - txHalfWidth;
                if(overflowR > 0) htx -= overflowR;
                if(overflowL < 0) htx += -overflowL;
            }
        }

        tx.attr('text-anchor', d.anchor);
        if(tx2width) tx2.attr('text-anchor', d.anchor);
        g.attr('transform', 'translate(' + htx + ',' + hty + ')' +
            (rotateLabels ? 'rotate(' + YANGLE + ')' : ''));
    });

    return hoverLabels;
}

function getHoverLabelText(d, showCommonLabel, hovermode, fullLayout, t0, g) {
    var name = '';
    var text = '';
    // to get custom 'name' labels pass cleanPoint
    if(d.nameOverride !== undefined) d.name = d.nameOverride;

    if(d.name) {
        if(d.trace._meta) {
            d.name = Lib.templateString(d.name, d.trace._meta);
        }
        name = plainText(d.name, d.nameLength);
    }

    if(d.zLabel !== undefined) {
        if(d.xLabel !== undefined) text += 'x: ' + d.xLabel + '<br>';
        if(d.yLabel !== undefined) text += 'y: ' + d.yLabel + '<br>';
        if(d.trace.type !== 'choropleth' && d.trace.type !== 'choroplethmapbox') {
            text += (text ? 'z: ' : '') + d.zLabel;
        }
    } else if(showCommonLabel && d[hovermode.charAt(0) + 'Label'] === t0) {
        text = d[(hovermode.charAt(0) === 'x' ? 'y' : 'x') + 'Label'] || '';
    } else if(d.xLabel === undefined) {
        if(d.yLabel !== undefined && d.trace.type !== 'scattercarpet') {
            text = d.yLabel;
        }
    } else if(d.yLabel === undefined) text = d.xLabel;
    else text = '(' + d.xLabel + ', ' + d.yLabel + ')';

    if((d.text || d.text === 0) && !Array.isArray(d.text)) {
        text += (text ? '<br>' : '') + d.text;
    }

    // used by other modules (initially just ternary) that
    // manage their own hoverinfo independent of cleanPoint
    // the rest of this will still apply, so such modules
    // can still put things in (x|y|z)Label, text, and name
    // and hoverinfo will still determine their visibility
    if(d.extraText !== undefined) text += (text ? '<br>' : '') + d.extraText;

    // if 'text' is empty at this point,
    // and hovertemplate is not defined,
    // put 'name' in main label and don't show secondary label
    if(g && text === '' && !d.hovertemplate) {
        // if 'name' is also empty, remove entire label
        if(name === '') g.remove();
        text = name;
    }

    // hovertemplate
    var d3locale = fullLayout._d3locale;
    var hovertemplate = d.hovertemplate || false;
    var hovertemplateLabels = d.hovertemplateLabels || d;
    var eventData = d.eventData[0] || {};
    if(hovertemplate) {
        text = Lib.hovertemplateString(
            hovertemplate,
            hovertemplateLabels,
            d3locale,
            eventData,
            d.trace._meta
        );

        text = text.replace(EXTRA_STRING_REGEX, function(match, extra) {
            // assign name for secondary text label
            name = plainText(extra, d.nameLength);
            // remove from main text label
            return '';
        });
    }
    return [text, name];
}

// Make groups of touching points, and within each group
// move each point so that no labels overlap, but the average
// label position is the same as it was before moving. Indicentally,
// this is equivalent to saying all the labels are on equal linear
// springs about their initial position. Initially, each point is
// its own group, but as we find overlaps we will clump the points.
//
// Also, there are hard constraints at the edges of the graphs,
// that push all groups to the middle so they are visible. I don't
// know what happens if the group spans all the way from one edge to
// the other, though it hardly matters - there's just too much
// information then.
function hoverAvoidOverlaps(hoverLabels, axKey, fullLayout) {
    var nummoves = 0;
    var axSign = 1;
    var nLabels = hoverLabels.size();

    // make groups of touching points
    var pointgroups = new Array(nLabels);
    var k = 0;

    hoverLabels.each(function(d) {
        var ax = d[axKey];
        var axIsX = ax._id.charAt(0) === 'x';
        var rng = ax.range;

        if(k === 0 && rng && ((rng[0] > rng[1]) !== axIsX)) {
            axSign = -1;
        }
        pointgroups[k++] = [{
            datum: d,
            traceIndex: d.trace.index,
            dp: 0,
            pos: d.pos,
            posref: d.posref,
            size: d.by * (axIsX ? YFACTOR : 1) / 2,
            pmin: 0,
            pmax: (axIsX ? fullLayout.width : fullLayout.height)
        }];
    });

    pointgroups.sort(function(a, b) {
        return (a[0].posref - b[0].posref) ||
            // for equal positions, sort trace indices increasing or decreasing
            // depending on whether the axis is reversed or not... so stacked
            // traces will generally keep their order even if one trace adds
            // nothing to the stack.
            (axSign * (b[0].traceIndex - a[0].traceIndex));
    });

    var donepositioning, topOverlap, bottomOverlap, i, j, pti, sumdp;

    function constrainGroup(grp) {
        var minPt = grp[0];
        var maxPt = grp[grp.length - 1];

        // overlap with the top - positive vals are overlaps
        topOverlap = minPt.pmin - minPt.pos - minPt.dp + minPt.size;

        // overlap with the bottom - positive vals are overlaps
        bottomOverlap = maxPt.pos + maxPt.dp + maxPt.size - minPt.pmax;

        // check for min overlap first, so that we always
        // see the largest labels
        // allow for .01px overlap, so we don't get an
        // infinite loop from rounding errors
        if(topOverlap > 0.01) {
            for(j = grp.length - 1; j >= 0; j--) grp[j].dp += topOverlap;
            donepositioning = false;
        }
        if(bottomOverlap < 0.01) return;
        if(topOverlap < -0.01) {
            // make sure we're not pushing back and forth
            for(j = grp.length - 1; j >= 0; j--) grp[j].dp -= bottomOverlap;
            donepositioning = false;
        }
        if(!donepositioning) return;

        // no room to fix positioning, delete off-screen points

        // first see how many points we need to delete
        var deleteCount = 0;
        for(i = 0; i < grp.length; i++) {
            pti = grp[i];
            if(pti.pos + pti.dp + pti.size > minPt.pmax) deleteCount++;
        }

        // start by deleting points whose data is off screen
        for(i = grp.length - 1; i >= 0; i--) {
            if(deleteCount <= 0) break;
            pti = grp[i];

            // pos has already been constrained to [pmin,pmax]
            // so look for points close to that to delete
            if(pti.pos > minPt.pmax - 1) {
                pti.del = true;
                deleteCount--;
            }
        }
        for(i = 0; i < grp.length; i++) {
            if(deleteCount <= 0) break;
            pti = grp[i];

            // pos has already been constrained to [pmin,pmax]
            // so look for points close to that to delete
            if(pti.pos < minPt.pmin + 1) {
                pti.del = true;
                deleteCount--;

                // shift the whole group minus into this new space
                bottomOverlap = pti.size * 2;
                for(j = grp.length - 1; j >= 0; j--) grp[j].dp -= bottomOverlap;
            }
        }
        // then delete points that go off the bottom
        for(i = grp.length - 1; i >= 0; i--) {
            if(deleteCount <= 0) break;
            pti = grp[i];
            if(pti.pos + pti.dp + pti.size > minPt.pmax) {
                pti.del = true;
                deleteCount--;
            }
        }
    }

    // loop through groups, combining them if they overlap,
    // until nothing moves
    while(!donepositioning && nummoves <= nLabels) {
        // to avoid infinite loops, don't move more times
        // than there are traces
        nummoves++;

        // assume nothing will move in this iteration,
        // reverse this if it does
        donepositioning = true;
        i = 0;
        while(i < pointgroups.length - 1) {
            // the higher (g0) and lower (g1) point group
            var g0 = pointgroups[i];
            var g1 = pointgroups[i + 1];

            // the lowest point in the higher group (p0)
            // the highest point in the lower group (p1)
            var p0 = g0[g0.length - 1];
            var p1 = g1[0];
            topOverlap = p0.pos + p0.dp + p0.size - p1.pos - p1.dp + p1.size;

            // Only group points that lie on the same axes
            if(topOverlap > 0.01 && (p0.pmin === p1.pmin) && (p0.pmax === p1.pmax)) {
                // push the new point(s) added to this group out of the way
                for(j = g1.length - 1; j >= 0; j--) g1[j].dp += topOverlap;

                // add them to the group
                g0.push.apply(g0, g1);
                pointgroups.splice(i + 1, 1);

                // adjust for minimum average movement
                sumdp = 0;
                for(j = g0.length - 1; j >= 0; j--) sumdp += g0[j].dp;
                bottomOverlap = sumdp / g0.length;
                for(j = g0.length - 1; j >= 0; j--) g0[j].dp -= bottomOverlap;
                donepositioning = false;
            } else i++;
        }

        // check if we're going off the plot on either side and fix
        pointgroups.forEach(constrainGroup);
    }

    // now put these offsets into hoverData
    for(i = pointgroups.length - 1; i >= 0; i--) {
        var grp = pointgroups[i];
        for(j = grp.length - 1; j >= 0; j--) {
            var pt = grp[j];
            var hoverPt = pt.datum;
            hoverPt.offset = pt.dp;
            hoverPt.del = pt.del;
        }
    }
}

function alignHoverText(hoverLabels, rotateLabels) {
    // finally set the text positioning relative to the data and draw the
    // box around it
    hoverLabels.each(function(d) {
        var g = d3.select(this);
        if(d.del) return g.remove();

        var tx = g.select('text.nums');
        var anchor = d.anchor;
        var horzSign = anchor === 'end' ? -1 : 1;
        var alignShift = {start: 1, end: -1, middle: 0}[anchor];
        var txx = alignShift * (HOVERARROWSIZE + HOVERTEXTPAD);
        var tx2x = txx + alignShift * (d.txwidth + HOVERTEXTPAD);
        var offsetX = 0;
        var offsetY = d.offset;

        if(anchor === 'middle') {
            txx -= d.tx2width / 2;
            tx2x += d.txwidth / 2 + HOVERTEXTPAD;
        }
        if(rotateLabels) {
            offsetY *= -YSHIFTY;
            offsetX = d.offset * YSHIFTX;
        }

        g.select('path').attr('d', anchor === 'middle' ?
            // middle aligned: rect centered on data
            ('M-' + (d.bx / 2 + d.tx2width / 2) + ',' + (offsetY - d.by / 2) +
              'h' + d.bx + 'v' + d.by + 'h-' + d.bx + 'Z') :
            // left or right aligned: side rect with arrow to data
            ('M0,0L' + (horzSign * HOVERARROWSIZE + offsetX) + ',' + (HOVERARROWSIZE + offsetY) +
                'v' + (d.by / 2 - HOVERARROWSIZE) +
                'h' + (horzSign * d.bx) +
                'v-' + d.by +
                'H' + (horzSign * HOVERARROWSIZE + offsetX) +
                'V' + (offsetY - HOVERARROWSIZE) +
                'Z'));

        var posX = txx + offsetX;
        var posY = offsetY + d.ty0 - d.by / 2 + HOVERTEXTPAD;
        var textAlign = d.textAlign || 'auto';

        if(textAlign !== 'auto') {
            if(textAlign === 'left' && anchor !== 'start') {
                tx.attr('text-anchor', 'start');
                posX = anchor === 'middle' ?
                    -d.bx / 2 - d.tx2width / 2 + HOVERTEXTPAD :
                    -d.bx - HOVERTEXTPAD;
            } else if(textAlign === 'right' && anchor !== 'end') {
                tx.attr('text-anchor', 'end');
                posX = anchor === 'middle' ?
                    d.bx / 2 - d.tx2width / 2 - HOVERTEXTPAD :
                    d.bx + HOVERTEXTPAD;
            }
        }

        tx.call(svgTextUtils.positionText, posX, posY);

        if(d.tx2width) {
            g.select('text.name')
                .call(svgTextUtils.positionText,
                    tx2x + alignShift * HOVERTEXTPAD + offsetX,
                    offsetY + d.ty0 - d.by / 2 + HOVERTEXTPAD);
            g.select('rect')
                .call(Drawing.setRect,
                    tx2x + (alignShift - 1) * d.tx2width / 2 + offsetX,
                    offsetY - d.by / 2 - 1,
                    d.tx2width, d.by + 2);
        }
    });
}

function cleanPoint(d, hovermode) {
    var index = d.index;
    var trace = d.trace || {};
    var cd0 = d.cd[0];
    var cd = d.cd[index] || {};

    function pass(v) {
        return v || (isNumeric(v) && v === 0);
    }

    var getVal = Array.isArray(index) ?
        function(calcKey, traceKey) {
            var v = Lib.castOption(cd0, index, calcKey);
            return pass(v) ? v : Lib.extractOption({}, trace, '', traceKey);
        } :
        function(calcKey, traceKey) {
            return Lib.extractOption(cd, trace, calcKey, traceKey);
        };

    function fill(key, calcKey, traceKey) {
        var val = getVal(calcKey, traceKey);
        if(pass(val)) d[key] = val;
    }

    fill('hoverinfo', 'hi', 'hoverinfo');
    fill('bgcolor', 'hbg', 'hoverlabel.bgcolor');
    fill('borderColor', 'hbc', 'hoverlabel.bordercolor');
    fill('fontFamily', 'htf', 'hoverlabel.font.family');
    fill('fontSize', 'hts', 'hoverlabel.font.size');
    fill('fontColor', 'htc', 'hoverlabel.font.color');
    fill('nameLength', 'hnl', 'hoverlabel.namelength');
    fill('textAlign', 'hta', 'hoverlabel.align');

    d.posref = (hovermode === 'y' || (hovermode === 'closest' && trace.orientation === 'h')) ?
        (d.xa._offset + (d.x0 + d.x1) / 2) :
        (d.ya._offset + (d.y0 + d.y1) / 2);

    // then constrain all the positions to be on the plot
    d.x0 = Lib.constrain(d.x0, 0, d.xa._length);
    d.x1 = Lib.constrain(d.x1, 0, d.xa._length);
    d.y0 = Lib.constrain(d.y0, 0, d.ya._length);
    d.y1 = Lib.constrain(d.y1, 0, d.ya._length);

    // and convert the x and y label values into formatted text
    if(d.xLabelVal !== undefined) {
        d.xLabel = ('xLabel' in d) ? d.xLabel : Axes.hoverLabelText(d.xa, d.xLabelVal);
        d.xVal = d.xa.c2d(d.xLabelVal);
    }
    if(d.yLabelVal !== undefined) {
        d.yLabel = ('yLabel' in d) ? d.yLabel : Axes.hoverLabelText(d.ya, d.yLabelVal);
        d.yVal = d.ya.c2d(d.yLabelVal);
    }

    // Traces like heatmaps generate the zLabel in their hoverPoints function
    if(d.zLabelVal !== undefined && d.zLabel === undefined) {
        d.zLabel = String(d.zLabelVal);
    }

    // for box means and error bars, add the range to the label
    if(!isNaN(d.xerr) && !(d.xa.type === 'log' && d.xerr <= 0)) {
        var xeText = Axes.tickText(d.xa, d.xa.c2l(d.xerr), 'hover').text;
        if(d.xerrneg !== undefined) {
            d.xLabel += ' +' + xeText + ' / -' +
                Axes.tickText(d.xa, d.xa.c2l(d.xerrneg), 'hover').text;
        } else d.xLabel += ' ± ' + xeText;

        // small distance penalty for error bars, so that if there are
        // traces with errors and some without, the error bar label will
        // hoist up to the point
        if(hovermode === 'x') d.distance += 1;
    }
    if(!isNaN(d.yerr) && !(d.ya.type === 'log' && d.yerr <= 0)) {
        var yeText = Axes.tickText(d.ya, d.ya.c2l(d.yerr), 'hover').text;
        if(d.yerrneg !== undefined) {
            d.yLabel += ' +' + yeText + ' / -' +
                Axes.tickText(d.ya, d.ya.c2l(d.yerrneg), 'hover').text;
        } else d.yLabel += ' ± ' + yeText;

        if(hovermode === 'y') d.distance += 1;
    }

    var infomode = d.hoverinfo || d.trace.hoverinfo;

    if(infomode && infomode !== 'all') {
        infomode = Array.isArray(infomode) ? infomode : infomode.split('+');
        if(infomode.indexOf('x') === -1) d.xLabel = undefined;
        if(infomode.indexOf('y') === -1) d.yLabel = undefined;
        if(infomode.indexOf('z') === -1) d.zLabel = undefined;
        if(infomode.indexOf('text') === -1) d.text = undefined;
        if(infomode.indexOf('name') === -1) d.name = undefined;
    }

    return d;
}

function createSpikelines(gd, closestPoints, opts) {
    var container = opts.container;
    var fullLayout = opts.fullLayout;
    var gs = fullLayout._size;
    var evt = opts.event;
    var showY = !!closestPoints.hLinePoint;
    var showX = !!closestPoints.vLinePoint;

    var xa, ya;

    // Remove old spikeline items
    container.selectAll('.spikeline').remove();

    if(!(showX || showY)) return;

    var contrastColor = Color.combine(fullLayout.plot_bgcolor, fullLayout.paper_bgcolor);

    // Horizontal line (to y-axis)
    if(showY) {
        var hLinePoint = closestPoints.hLinePoint;
        var hLinePointX, hLinePointY;

        xa = hLinePoint && hLinePoint.xa;
        ya = hLinePoint && hLinePoint.ya;
        var ySnap = ya.spikesnap;

        if(ySnap === 'cursor') {
            hLinePointX = evt.pointerX;
            hLinePointY = evt.pointerY;
        } else {
            hLinePointX = xa._offset + hLinePoint.x;
            hLinePointY = ya._offset + hLinePoint.y;
        }
        var dfltHLineColor = tinycolor.readability(hLinePoint.color, contrastColor) < 1.5 ?
            Color.contrast(contrastColor) : hLinePoint.color;
        var yMode = ya.spikemode;
        var yThickness = ya.spikethickness;
        var yColor = ya.spikecolor || dfltHLineColor;
        var xEdge = Axes.getPxPosition(gd, ya);
        var xBase, xEndSpike;

        if(yMode.indexOf('toaxis') !== -1 || yMode.indexOf('across') !== -1) {
            if(yMode.indexOf('toaxis') !== -1) {
                xBase = xEdge;
                xEndSpike = hLinePointX;
            }
            if(yMode.indexOf('across') !== -1) {
                var xAcross0 = ya._counterDomainMin;
                var xAcross1 = ya._counterDomainMax;
                if(ya.anchor === 'free') {
                    xAcross0 = Math.min(xAcross0, ya.position);
                    xAcross1 = Math.max(xAcross1, ya.position);
                }
                xBase = gs.l + xAcross0 * gs.w;
                xEndSpike = gs.l + xAcross1 * gs.w;
            }

            // Foreground horizontal line (to y-axis)
            container.insert('line', ':first-child')
                .attr({
                    x1: xBase,
                    x2: xEndSpike,
                    y1: hLinePointY,
                    y2: hLinePointY,
                    'stroke-width': yThickness,
                    stroke: yColor,
                    'stroke-dasharray': Drawing.dashStyle(ya.spikedash, yThickness)
                })
                .classed('spikeline', true)
                .classed('crisp', true);

            // Background horizontal Line (to y-axis)
            container.insert('line', ':first-child')
                .attr({
                    x1: xBase,
                    x2: xEndSpike,
                    y1: hLinePointY,
                    y2: hLinePointY,
                    'stroke-width': yThickness + 2,
                    stroke: contrastColor
                })
                .classed('spikeline', true)
                .classed('crisp', true);
        }
        // Y axis marker
        if(yMode.indexOf('marker') !== -1) {
            container.insert('circle', ':first-child')
                .attr({
                    cx: xEdge + (ya.side !== 'right' ? yThickness : -yThickness),
                    cy: hLinePointY,
                    r: yThickness,
                    fill: yColor
                })
                .classed('spikeline', true);
        }
    }

    if(showX) {
        var vLinePoint = closestPoints.vLinePoint;
        var vLinePointX, vLinePointY;

        xa = vLinePoint && vLinePoint.xa;
        ya = vLinePoint && vLinePoint.ya;
        var xSnap = xa.spikesnap;

        if(xSnap === 'cursor') {
            vLinePointX = evt.pointerX;
            vLinePointY = evt.pointerY;
        } else {
            vLinePointX = xa._offset + vLinePoint.x;
            vLinePointY = ya._offset + vLinePoint.y;
        }
        var dfltVLineColor = tinycolor.readability(vLinePoint.color, contrastColor) < 1.5 ?
            Color.contrast(contrastColor) : vLinePoint.color;
        var xMode = xa.spikemode;
        var xThickness = xa.spikethickness;
        var xColor = xa.spikecolor || dfltVLineColor;
        var yEdge = Axes.getPxPosition(gd, xa);
        var yBase, yEndSpike;

        if(xMode.indexOf('toaxis') !== -1 || xMode.indexOf('across') !== -1) {
            if(xMode.indexOf('toaxis') !== -1) {
                yBase = yEdge;
                yEndSpike = vLinePointY;
            }
            if(xMode.indexOf('across') !== -1) {
                var yAcross0 = xa._counterDomainMin;
                var yAcross1 = xa._counterDomainMax;
                if(xa.anchor === 'free') {
                    yAcross0 = Math.min(yAcross0, xa.position);
                    yAcross1 = Math.max(yAcross1, xa.position);
                }
                yBase = gs.t + (1 - yAcross1) * gs.h;
                yEndSpike = gs.t + (1 - yAcross0) * gs.h;
            }

            // Foreground vertical line (to x-axis)
            container.insert('line', ':first-child')
                .attr({
                    x1: vLinePointX,
                    x2: vLinePointX,
                    y1: yBase,
                    y2: yEndSpike,
                    'stroke-width': xThickness,
                    stroke: xColor,
                    'stroke-dasharray': Drawing.dashStyle(xa.spikedash, xThickness)
                })
                .classed('spikeline', true)
                .classed('crisp', true);

            // Background vertical line (to x-axis)
            container.insert('line', ':first-child')
                .attr({
                    x1: vLinePointX,
                    x2: vLinePointX,
                    y1: yBase,
                    y2: yEndSpike,
                    'stroke-width': xThickness + 2,
                    stroke: contrastColor
                })
                .classed('spikeline', true)
                .classed('crisp', true);
        }

        // X axis marker
        if(xMode.indexOf('marker') !== -1) {
            container.insert('circle', ':first-child')
                .attr({
                    cx: vLinePointX,
                    cy: yEdge - (xa.side !== 'top' ? xThickness : -xThickness),
                    r: xThickness,
                    fill: xColor
                })
                .classed('spikeline', true);
        }
    }
}

function hoverChanged(gd, evt, oldhoverdata) {
    // don't emit any events if nothing changed
    if(!oldhoverdata || oldhoverdata.length !== gd._hoverdata.length) return true;

    for(var i = oldhoverdata.length - 1; i >= 0; i--) {
        var oldPt = oldhoverdata[i];
        var newPt = gd._hoverdata[i];

        if(oldPt.curveNumber !== newPt.curveNumber ||
            String(oldPt.pointNumber) !== String(newPt.pointNumber) ||
            String(oldPt.pointNumbers) !== String(newPt.pointNumbers)
        ) {
            return true;
        }
    }
    return false;
}

function spikesChanged(gd, oldspikepoints) {
    // don't relayout the plot because of new spikelines if spikelines points didn't change
    if(!oldspikepoints) return true;
    if(oldspikepoints.vLinePoint !== gd._spikepoints.vLinePoint ||
        oldspikepoints.hLinePoint !== gd._spikepoints.hLinePoint
    ) return true;
    return false;
}

function plainText(s, len) {
    return svgTextUtils.plainText(s || '', {
        len: len,
        allowedTags: ['br', 'sub', 'sup', 'b', 'i', 'em']
    });
}


/***/ }),

/***/ "./node_modules/plotly.js/src/components/fx/hoverlabel_defaults.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/fx/hoverlabel_defaults.js ***!
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
var Color = __webpack_require__(/*! ../color */ "./node_modules/plotly.js/src/components/color/index.js");
var isUnifiedHover = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").isUnifiedHover;

module.exports = function handleHoverLabelDefaults(contIn, contOut, coerce, opts) {
    opts = opts || {};

    function inheritFontAttr(attr) {
        if(!opts.font[attr]) {
            opts.font[attr] = contOut.legend ? contOut.legend.font[attr] : contOut.font[attr];
        }
    }

    // In unified hover, inherit from layout.legend if available or layout
    if(contOut && isUnifiedHover(contOut.hovermode)) {
        if(!opts.font) opts.font = {};
        inheritFontAttr('size');
        inheritFontAttr('family');
        inheritFontAttr('color');

        if(contOut.legend) {
            if(!opts.bgcolor) opts.bgcolor = Color.combine(contOut.legend.bgcolor, contOut.paper_bgcolor);
            if(!opts.bordercolor) opts.bordercolor = contOut.legend.bordercolor;
        } else {
            if(!opts.bgcolor) opts.bgcolor = contOut.paper_bgcolor;
        }
    }

    coerce('hoverlabel.bgcolor', opts.bgcolor);
    coerce('hoverlabel.bordercolor', opts.bordercolor);
    coerce('hoverlabel.namelength', opts.namelength);
    Lib.coerceFont(coerce, 'hoverlabel.font', opts.font);
    coerce('hoverlabel.align', opts.align);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/fx/hovermode_defaults.js":
/*!************************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/fx/hovermode_defaults.js ***!
  \************************************************************************/
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
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/components/fx/layout_attributes.js");

module.exports = function handleHoverModeDefaults(layoutIn, layoutOut, fullData) {
    function coerce(attr, dflt) {
        // don't coerce if it is already coerced in other place e.g. in cartesian defaults
        if(layoutOut[attr] !== undefined) return layoutOut[attr];

        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    var clickmode = coerce('clickmode');

    var hovermodeDflt;
    if(layoutOut._has('cartesian')) {
        if(clickmode.indexOf('select') > -1) {
            hovermodeDflt = 'closest';
        } else {
            // flag for 'horizontal' plots:
            // determines the state of the mode bar 'compare' hovermode button
            layoutOut._isHoriz = isHoriz(fullData, layoutOut);
            hovermodeDflt = layoutOut._isHoriz ? 'y' : 'x';
        }
    } else hovermodeDflt = 'closest';

    return coerce('hovermode', hovermodeDflt);
};

function isHoriz(fullData, fullLayout) {
    var stackOpts = fullLayout._scatterStackOpts || {};

    for(var i = 0; i < fullData.length; i++) {
        var trace = fullData[i];
        var subplot = trace.xaxis + trace.yaxis;
        var subplotStackOpts = stackOpts[subplot] || {};
        var groupOpts = subplotStackOpts[trace.stackgroup] || {};

        if(trace.orientation !== 'h' && groupOpts.orientation !== 'h') {
            return false;
        }
    }

    return true;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/components/fx/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/components/fx/index.js ***!
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
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var dragElement = __webpack_require__(/*! ../dragelement */ "./node_modules/plotly.js/src/components/dragelement/index.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js");
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/components/fx/layout_attributes.js");
var hoverModule = __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/components/fx/hover.js");

module.exports = {
    moduleType: 'component',
    name: 'fx',

    constants: __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/components/fx/constants.js"),
    schema: {
        layout: layoutAttributes
    },

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/components/fx/attributes.js"),
    layoutAttributes: layoutAttributes,

    supplyLayoutGlobalDefaults: __webpack_require__(/*! ./layout_global_defaults */ "./node_modules/plotly.js/src/components/fx/layout_global_defaults.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/components/fx/defaults.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/components/fx/layout_defaults.js"),

    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/components/fx/calc.js"),

    getDistanceFunction: helpers.getDistanceFunction,
    getClosest: helpers.getClosest,
    inbox: helpers.inbox,
    quadrature: helpers.quadrature,
    appendArrayPointValue: helpers.appendArrayPointValue,

    castHoverOption: castHoverOption,
    castHoverinfo: castHoverinfo,

    hover: hoverModule.hover,
    unhover: dragElement.unhover,

    loneHover: hoverModule.loneHover,
    loneUnhover: loneUnhover,

    click: __webpack_require__(/*! ./click */ "./node_modules/plotly.js/src/components/fx/click.js")
};

function loneUnhover(containerOrSelection) {
    // duck type whether the arg is a d3 selection because ie9 doesn't
    // handle instanceof like modern browsers do.
    var selection = Lib.isD3Selection(containerOrSelection) ?
            containerOrSelection :
            d3.select(containerOrSelection);

    selection.selectAll('g.hovertext').remove();
    selection.selectAll('.spikeline').remove();
}

// helpers for traces that use Fx.loneHover

function castHoverOption(trace, ptNumber, attr) {
    return Lib.castOption(trace, ptNumber, 'hoverlabel.' + attr);
}

function castHoverinfo(trace, fullLayout, ptNumber) {
    function _coerce(val) {
        return Lib.coerceHoverinfo({hoverinfo: val}, {_module: trace._module}, fullLayout);
    }

    return Lib.castOption(trace, ptNumber, 'hoverinfo', _coerce);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/components/fx/layout_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/fx/layout_defaults.js ***!
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
var isUnifiedHover = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").isUnifiedHover;
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/components/fx/layout_attributes.js");
var handleHoverModeDefaults = __webpack_require__(/*! ./hovermode_defaults */ "./node_modules/plotly.js/src/components/fx/hovermode_defaults.js");
var handleHoverLabelDefaults = __webpack_require__(/*! ./hoverlabel_defaults */ "./node_modules/plotly.js/src/components/fx/hoverlabel_defaults.js");

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut, fullData) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    var hoverMode = handleHoverModeDefaults(layoutIn, layoutOut, fullData);
    if(hoverMode) {
        coerce('hoverdistance');
        coerce('spikedistance', isUnifiedHover(hoverMode) ? -1 : undefined);
    }

    var dragMode = coerce('dragmode');
    if(dragMode === 'select') coerce('selectdirection');

    // if only mapbox or geo subplots is present on graph,
    // reset 'zoom' dragmode to 'pan' until 'zoom' is implemented,
    // so that the correct modebar button is active
    var hasMapbox = layoutOut._has('mapbox');
    var hasGeo = layoutOut._has('geo');
    var len = layoutOut._basePlotModules.length;

    if(layoutOut.dragmode === 'zoom' && (
        ((hasMapbox || hasGeo) && len === 1) ||
        (hasMapbox && hasGeo && len === 2)
    )) {
        layoutOut.dragmode = 'pan';
    }

    handleHoverLabelDefaults(layoutIn, layoutOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/fx/layout_global_defaults.js":
/*!****************************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/fx/layout_global_defaults.js ***!
  \****************************************************************************/
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
var handleHoverLabelDefaults = __webpack_require__(/*! ./hoverlabel_defaults */ "./node_modules/plotly.js/src/components/fx/hoverlabel_defaults.js");
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/components/fx/layout_attributes.js");

module.exports = function supplyLayoutGlobalDefaults(layoutIn, layoutOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    handleHoverLabelDefaults(layoutIn, layoutOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/legend/attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/legend/attributes.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var colorAttrs = __webpack_require__(/*! ../color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");


module.exports = {
    bgcolor: {
        valType: 'color',
        role: 'style',
        editType: 'legend',
        description: [
            'Sets the legend background color.',
            'Defaults to `layout.paper_bgcolor`.'
        ].join(' ')
    },
    bordercolor: {
        valType: 'color',
        dflt: colorAttrs.defaultLine,
        role: 'style',
        editType: 'legend',
        description: 'Sets the color of the border enclosing the legend.'
    },
    borderwidth: {
        valType: 'number',
        min: 0,
        dflt: 0,
        role: 'style',
        editType: 'legend',
        description: 'Sets the width (in px) of the border enclosing the legend.'
    },
    font: fontAttrs({
        editType: 'legend',
        description: 'Sets the font used to text the legend items.'
    }),
    orientation: {
        valType: 'enumerated',
        values: ['v', 'h'],
        dflt: 'v',
        role: 'info',
        editType: 'legend',
        description: 'Sets the orientation of the legend.'
    },
    traceorder: {
        valType: 'flaglist',
        flags: ['reversed', 'grouped'],
        extras: ['normal'],
        role: 'style',
        editType: 'legend',
        description: [
            'Determines the order at which the legend items are displayed.',

            'If *normal*, the items are displayed top-to-bottom in the same',
            'order as the input data.',

            'If *reversed*, the items are displayed in the opposite order',
            'as *normal*.',

            'If *grouped*, the items are displayed in groups',
            '(when a trace `legendgroup` is provided).',

            'if *grouped+reversed*, the items are displayed in the opposite order',
            'as *grouped*.'
        ].join(' ')
    },
    tracegroupgap: {
        valType: 'number',
        min: 0,
        dflt: 10,
        role: 'style',
        editType: 'legend',
        description: [
            'Sets the amount of vertical space (in px) between legend groups.'
        ].join(' ')
    },
    itemsizing: {
        valType: 'enumerated',
        values: ['trace', 'constant'],
        dflt: 'trace',
        role: 'style',
        editType: 'legend',
        description: [
            'Determines if the legend items symbols scale with their corresponding *trace* attributes',
            'or remain *constant* independent of the symbol size on the graph.'
        ].join(' ')
    },

    itemclick: {
        valType: 'enumerated',
        values: ['toggle', 'toggleothers', false],
        dflt: 'toggle',
        role: 'info',
        editType: 'legend',
        description: [
            'Determines the behavior on legend item click.',
            '*toggle* toggles the visibility of the item clicked on the graph.',
            '*toggleothers* makes the clicked item the sole visible item on the graph.',
            '*false* disable legend item click interactions.'
        ].join(' ')
    },
    itemdoubleclick: {
        valType: 'enumerated',
        values: ['toggle', 'toggleothers', false],
        dflt: 'toggleothers',
        role: 'info',
        editType: 'legend',
        description: [
            'Determines the behavior on legend item double-click.',
            '*toggle* toggles the visibility of the item clicked on the graph.',
            '*toggleothers* makes the clicked item the sole visible item on the graph.',
            '*false* disable legend item double-click interactions.'
        ].join(' ')
    },

    x: {
        valType: 'number',
        min: -2,
        max: 3,
        role: 'style',
        editType: 'legend',
        description: [
            'Sets the x position (in normalized coordinates) of the legend.',
            'Defaults to *1.02* for vertical legends and',
            'defaults to *0* for horizontal legends.'
        ].join(' ')
    },
    xanchor: {
        valType: 'enumerated',
        values: ['auto', 'left', 'center', 'right'],
        dflt: 'left',
        role: 'info',
        editType: 'legend',
        description: [
            'Sets the legend\'s horizontal position anchor.',
            'This anchor binds the `x` position to the *left*, *center*',
            'or *right* of the legend.',
            'Value *auto* anchors legends to the right for `x` values greater than or equal to 2/3,',
            'anchors legends to the left for `x` values less than or equal to 1/3 and',
            'anchors legends with respect to their center otherwise.'
        ].join(' ')
    },
    y: {
        valType: 'number',
        min: -2,
        max: 3,
        role: 'style',
        editType: 'legend',
        description: [
            'Sets the y position (in normalized coordinates) of the legend.',
            'Defaults to *1* for vertical legends,',
            'defaults to *-0.1* for horizontal legends on graphs w/o range sliders and',
            'defaults to *1.1* for horizontal legends on graph with one or multiple range sliders.'
        ].join(' ')
    },
    yanchor: {
        valType: 'enumerated',
        values: ['auto', 'top', 'middle', 'bottom'],
        role: 'info',
        editType: 'legend',
        description: [
            'Sets the legend\'s vertical position anchor',
            'This anchor binds the `y` position to the *top*, *middle*',
            'or *bottom* of the legend.',
            'Value *auto* anchors legends at their bottom for `y` values less than or equal to 1/3,',
            'anchors legends to at their top for `y` values greater than or equal to 2/3 and',
            'anchors legends with respect to their middle otherwise.'
        ].join(' ')
    },
    uirevision: {
        valType: 'any',
        role: 'info',
        editType: 'none',
        description: [
            'Controls persistence of legend-driven changes in trace and pie label',
            'visibility. Defaults to `layout.uirevision`.'
        ].join(' ')
    },
    valign: {
        valType: 'enumerated',
        values: ['top', 'middle', 'bottom'],
        dflt: 'middle',
        role: 'style',
        editType: 'legend',
        description: [
            'Sets the vertical alignment of the symbols with respect to their associated text.',
        ].join(' ')
    },
    title: {
        text: {
            valType: 'string',
            dflt: '',
            role: 'info',
            editType: 'legend',
            description: [
                'Sets the title of the legend.'
            ].join(' ')
        },
        font: fontAttrs({
            editType: 'legend',
            description: [
                'Sets this legend\'s title font.'
            ].join(' '),
        }),
        side: {
            valType: 'enumerated',
            values: ['top', 'left', 'top left'],
            role: 'style',
            editType: 'legend',
            description: [
                'Determines the location of legend\'s title',
                'with respect to the legend items.',
                'Defaulted to *top* with `orientation` is *h*.',
                'Defaulted to *left* with `orientation` is *v*.',
                'The *top left* options could be used to expand',
                'legend area in both x and y sides.'
            ].join(' ')
        },
        editType: 'legend',
    },

    editType: 'legend'
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/legend/constants.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/legend/constants.js ***!
  \*******************************************************************/
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
    scrollBarWidth: 6,
    scrollBarMinHeight: 20,
    scrollBarColor: '#808BA4',
    scrollBarMargin: 4,
    scrollBarEnterAttrs: {rx: 20, ry: 3, width: 0, height: 0},

    // number of px between legend title and (left) side of legend (always in x direction and from inner border)
    titlePad: 2,
    // number of px between legend symbol and legend text (always in x direction)
    textGap: 40,
    // number of px between each legend item (x and/or y direction)
    itemGap: 5
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/legend/defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/legend/defaults.js ***!
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



var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Template = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/components/legend/attributes.js");
var basePlotLayoutAttributes = __webpack_require__(/*! ../../plots/layout_attributes */ "./node_modules/plotly.js/src/plots/layout_attributes.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/components/legend/helpers.js");


module.exports = function legendDefaults(layoutIn, layoutOut, fullData) {
    var containerIn = layoutIn.legend || {};

    var legendTraceCount = 0;
    var legendReallyHasATrace = false;
    var defaultOrder = 'normal';

    for(var i = 0; i < fullData.length; i++) {
        var trace = fullData[i];

        if(!trace.visible) continue;

        // Note that we explicitly count any trace that is either shown or
        // *would* be shown by default, toward the two traces you need to
        // ensure the legend is shown by default, because this can still help
        // disambiguate.
        if(trace.showlegend || (
            trace._dfltShowLegend && !(
                trace._module &&
                trace._module.attributes &&
                trace._module.attributes.showlegend &&
                trace._module.attributes.showlegend.dflt === false
            )
        )) {
            legendTraceCount++;
            if(trace.showlegend) {
                legendReallyHasATrace = true;
                // Always show the legend by default if there's a pie,
                // or if there's only one trace but it's explicitly shown
                if(Registry.traceIs(trace, 'pie-like') ||
                    trace._input.showlegend === true
                ) {
                    legendTraceCount++;
                }
            }
        }

        if((Registry.traceIs(trace, 'bar') && layoutOut.barmode === 'stack') ||
                ['tonextx', 'tonexty'].indexOf(trace.fill) !== -1) {
            defaultOrder = helpers.isGrouped({traceorder: defaultOrder}) ?
                'grouped+reversed' : 'reversed';
        }

        if(trace.legendgroup !== undefined && trace.legendgroup !== '') {
            defaultOrder = helpers.isReversed({traceorder: defaultOrder}) ?
                'reversed+grouped' : 'grouped';
        }
    }

    var showLegend = Lib.coerce(layoutIn, layoutOut,
        basePlotLayoutAttributes, 'showlegend',
        legendReallyHasATrace && legendTraceCount > 1);

    if(showLegend === false && !containerIn.uirevision) return;

    var containerOut = Template.newContainer(layoutOut, 'legend');

    function coerce(attr, dflt) {
        return Lib.coerce(containerIn, containerOut, attributes, attr, dflt);
    }

    coerce('uirevision', layoutOut.uirevision);

    if(showLegend === false) return;

    coerce('bgcolor', layoutOut.paper_bgcolor);
    coerce('bordercolor');
    coerce('borderwidth');
    Lib.coerceFont(coerce, 'font', layoutOut.font);

    var orientation = coerce('orientation');
    var defaultX, defaultY, defaultYAnchor;

    if(orientation === 'h') {
        defaultX = 0;

        if(Registry.getComponentMethod('rangeslider', 'isVisible')(layoutIn.xaxis)) {
            defaultY = 1.1;
            defaultYAnchor = 'bottom';
        } else {
            // maybe use y=1.1 / yanchor=bottom as above
            //   to avoid https://github.com/plotly/plotly.js/issues/1199
            //   in v2
            defaultY = -0.1;
            defaultYAnchor = 'top';
        }
    } else {
        defaultX = 1.02;
        defaultY = 1;
        defaultYAnchor = 'auto';
    }

    coerce('traceorder', defaultOrder);
    if(helpers.isGrouped(layoutOut.legend)) coerce('tracegroupgap');

    coerce('itemsizing');

    coerce('itemclick');
    coerce('itemdoubleclick');

    coerce('x', defaultX);
    coerce('xanchor');
    coerce('y', defaultY);
    coerce('yanchor', defaultYAnchor);
    coerce('valign');
    Lib.noneOrAll(containerIn, containerOut, ['x', 'y']);

    var titleText = coerce('title.text');
    if(titleText) {
        coerce('title.side', orientation === 'h' ? 'left' : 'top');
        Lib.coerceFont(coerce, 'title.font', layoutOut.font);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/legend/draw.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/legend/draw.js ***!
  \**************************************************************/
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

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Plots = __webpack_require__(/*! ../../plots/plots */ "./node_modules/plotly.js/src/plots/plots.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Events = __webpack_require__(/*! ../../lib/events */ "./node_modules/plotly.js/src/lib/events.js");
var dragElement = __webpack_require__(/*! ../dragelement */ "./node_modules/plotly.js/src/components/dragelement/index.js");
var Drawing = __webpack_require__(/*! ../drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Color = __webpack_require__(/*! ../color */ "./node_modules/plotly.js/src/components/color/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var handleClick = __webpack_require__(/*! ./handle_click */ "./node_modules/plotly.js/src/components/legend/handle_click.js");

var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/components/legend/constants.js");
var alignmentConstants = __webpack_require__(/*! ../../constants/alignment */ "./node_modules/plotly.js/src/constants/alignment.js");
var LINE_SPACING = alignmentConstants.LINE_SPACING;
var FROM_TL = alignmentConstants.FROM_TL;
var FROM_BR = alignmentConstants.FROM_BR;

var getLegendData = __webpack_require__(/*! ./get_legend_data */ "./node_modules/plotly.js/src/components/legend/get_legend_data.js");
var style = __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/components/legend/style.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/components/legend/helpers.js");

module.exports = function draw(gd, opts) {
    var fullLayout = gd._fullLayout;
    var clipId = 'legend' + fullLayout._uid;
    var layer;

    // Check whether this is the main legend (ie. called without any opts)
    if(!opts) {
        opts = fullLayout.legend || {};
        opts._main = true;
        layer = fullLayout._infolayer;
    } else {
        layer = opts.layer;
        clipId += '-hover';
    }

    if(!layer) return;

    if(!gd._legendMouseDownTime) gd._legendMouseDownTime = 0;

    var legendData;
    if(opts._main) {
        if(!gd.calcdata) return;
        legendData = fullLayout.showlegend && getLegendData(gd.calcdata, opts);
    } else {
        if(!opts.entries) return;
        legendData = getLegendData(opts.entries, opts);
    }

    var hiddenSlices = fullLayout.hiddenlabels || [];

    if(opts._main && (!fullLayout.showlegend || !legendData.length)) {
        layer.selectAll('.legend').remove();
        fullLayout._topdefs.select('#' + clipId).remove();
        return Plots.autoMargin(gd, 'legend');
    }

    var legend = Lib.ensureSingle(layer, 'g', 'legend', function(s) {
        if(opts._main) s.attr('pointer-events', 'all');
    });

    var clipPath = Lib.ensureSingleById(fullLayout._topdefs, 'clipPath', clipId, function(s) {
        s.append('rect');
    });

    var bg = Lib.ensureSingle(legend, 'rect', 'bg', function(s) {
        s.attr('shape-rendering', 'crispEdges');
    });
    bg.call(Color.stroke, opts.bordercolor)
        .call(Color.fill, opts.bgcolor)
        .style('stroke-width', opts.borderwidth + 'px');

    var scrollBox = Lib.ensureSingle(legend, 'g', 'scrollbox');

    var title = opts.title;
    opts._titleWidth = 0;
    opts._titleHeight = 0;
    if(title.text) {
        var titleEl = Lib.ensureSingle(scrollBox, 'text', 'legendtitletext');
        titleEl.attr('text-anchor', 'start')
            .classed('user-select-none', true)
            .call(Drawing.font, title.font)
            .text(title.text);

        textLayout(titleEl, scrollBox, gd, opts); // handle mathjax or multi-line text and compute title height
    } else {
        scrollBox.selectAll('.legendtitletext').remove();
    }

    var scrollBar = Lib.ensureSingle(legend, 'rect', 'scrollbar', function(s) {
        s.attr(constants.scrollBarEnterAttrs)
         .call(Color.fill, constants.scrollBarColor);
    });

    var groups = scrollBox.selectAll('g.groups').data(legendData);
    groups.enter().append('g').attr('class', 'groups');
    groups.exit().remove();

    var traces = groups.selectAll('g.traces').data(Lib.identity);
    traces.enter().append('g').attr('class', 'traces');
    traces.exit().remove();

    traces.style('opacity', function(d) {
        var trace = d[0].trace;
        if(Registry.traceIs(trace, 'pie-like')) {
            return hiddenSlices.indexOf(d[0].label) !== -1 ? 0.5 : 1;
        } else {
            return trace.visible === 'legendonly' ? 0.5 : 1;
        }
    })
    .each(function() { d3.select(this).call(drawTexts, gd, opts); })
    .call(style, gd, opts)
    .each(function() { if(opts._main) d3.select(this).call(setupTraceToggle, gd); });

    Lib.syncOrAsync([
        Plots.previousPromises,
        function() { return computeLegendDimensions(gd, groups, traces, opts); },
        function() {
            // IF expandMargin return a Promise (which is truthy),
            // we're under a doAutoMargin redraw, so we don't have to
            // draw the remaining pieces below
            if(opts._main && expandMargin(gd)) return;

            var gs = fullLayout._size;
            var bw = opts.borderwidth;

            var lx = gs.l + gs.w * opts.x - FROM_TL[getXanchor(opts)] * opts._width;
            var ly = gs.t + gs.h * (1 - opts.y) - FROM_TL[getYanchor(opts)] * opts._effHeight;

            if(opts._main && fullLayout.margin.autoexpand) {
                var lx0 = lx;
                var ly0 = ly;

                lx = Lib.constrain(lx, 0, fullLayout.width - opts._width);
                ly = Lib.constrain(ly, 0, fullLayout.height - opts._effHeight);

                if(lx !== lx0) {
                    Lib.log('Constrain legend.x to make legend fit inside graph');
                }
                if(ly !== ly0) {
                    Lib.log('Constrain legend.y to make legend fit inside graph');
                }
            }

            // Set size and position of all the elements that make up a legend:
            // legend, background and border, scroll box and scroll bar as well as title
            if(opts._main) Drawing.setTranslate(legend, lx, ly);

            // to be safe, remove previous listeners
            scrollBar.on('.drag', null);
            legend.on('wheel', null);

            if(!opts._main || opts._height <= opts._maxHeight || gd._context.staticPlot) {
                // if scrollbar should not be shown.
                var height = opts._effHeight;

                // if not the main legend, let it be its full size
                if(!opts._main) height = opts._height;

                bg.attr({
                    width: opts._width - bw,
                    height: height - bw,
                    x: bw / 2,
                    y: bw / 2
                });

                Drawing.setTranslate(scrollBox, 0, 0);

                clipPath.select('rect').attr({
                    width: opts._width - 2 * bw,
                    height: height - 2 * bw,
                    x: bw,
                    y: bw
                });

                Drawing.setClipUrl(scrollBox, clipId, gd);

                Drawing.setRect(scrollBar, 0, 0, 0, 0);
                delete opts._scrollY;
            } else {
                var scrollBarHeight = Math.max(constants.scrollBarMinHeight,
                    opts._effHeight * opts._effHeight / opts._height);
                var scrollBarYMax = opts._effHeight -
                    scrollBarHeight -
                    2 * constants.scrollBarMargin;
                var scrollBoxYMax = opts._height - opts._effHeight;
                var scrollRatio = scrollBarYMax / scrollBoxYMax;

                var scrollBoxY = Math.min(opts._scrollY || 0, scrollBoxYMax);

                // increase the background and clip-path width
                // by the scrollbar width and margin
                bg.attr({
                    width: opts._width -
                        2 * bw +
                        constants.scrollBarWidth +
                        constants.scrollBarMargin,
                    height: opts._effHeight - bw,
                    x: bw / 2,
                    y: bw / 2
                });

                clipPath.select('rect').attr({
                    width: opts._width -
                        2 * bw +
                        constants.scrollBarWidth +
                        constants.scrollBarMargin,
                    height: opts._effHeight - 2 * bw,
                    x: bw,
                    y: bw + scrollBoxY
                });

                Drawing.setClipUrl(scrollBox, clipId, gd);

                scrollHandler(scrollBoxY, scrollBarHeight, scrollRatio);

                // scroll legend by mousewheel or touchpad swipe up/down
                legend.on('wheel', function() {
                    scrollBoxY = Lib.constrain(
                        opts._scrollY +
                            ((d3.event.deltaY / scrollBarYMax) * scrollBoxYMax),
                        0, scrollBoxYMax);
                    scrollHandler(scrollBoxY, scrollBarHeight, scrollRatio);
                    if(scrollBoxY !== 0 && scrollBoxY !== scrollBoxYMax) {
                        d3.event.preventDefault();
                    }
                });

                var eventY0, eventY1, scrollBoxY0;

                var getScrollBarDragY = function(scrollBoxY0, eventY0, eventY1) {
                    var y = ((eventY1 - eventY0) / scrollRatio) + scrollBoxY0;
                    return Lib.constrain(y, 0, scrollBoxYMax);
                };

                var getNaturalDragY = function(scrollBoxY0, eventY0, eventY1) {
                    var y = ((eventY0 - eventY1) / scrollRatio) + scrollBoxY0;
                    return Lib.constrain(y, 0, scrollBoxYMax);
                };

                // scroll legend by dragging scrollBAR
                var scrollBarDrag = d3.behavior.drag()
                .on('dragstart', function() {
                    var e = d3.event.sourceEvent;
                    if(e.type === 'touchstart') {
                        eventY0 = e.changedTouches[0].clientY;
                    } else {
                        eventY0 = e.clientY;
                    }
                    scrollBoxY0 = scrollBoxY;
                })
                .on('drag', function() {
                    var e = d3.event.sourceEvent;
                    if(e.buttons === 2 || e.ctrlKey) return;
                    if(e.type === 'touchmove') {
                        eventY1 = e.changedTouches[0].clientY;
                    } else {
                        eventY1 = e.clientY;
                    }
                    scrollBoxY = getScrollBarDragY(scrollBoxY0, eventY0, eventY1);
                    scrollHandler(scrollBoxY, scrollBarHeight, scrollRatio);
                });
                scrollBar.call(scrollBarDrag);

                // scroll legend by touch-dragging scrollBOX
                var scrollBoxTouchDrag = d3.behavior.drag()
                .on('dragstart', function() {
                    var e = d3.event.sourceEvent;
                    if(e.type === 'touchstart') {
                        eventY0 = e.changedTouches[0].clientY;
                        scrollBoxY0 = scrollBoxY;
                    }
                })
                .on('drag', function() {
                    var e = d3.event.sourceEvent;
                    if(e.type === 'touchmove') {
                        eventY1 = e.changedTouches[0].clientY;
                        scrollBoxY = getNaturalDragY(scrollBoxY0, eventY0, eventY1);
                        scrollHandler(scrollBoxY, scrollBarHeight, scrollRatio);
                    }
                });
                scrollBox.call(scrollBoxTouchDrag);
            }

            function scrollHandler(scrollBoxY, scrollBarHeight, scrollRatio) {
                opts._scrollY = gd._fullLayout.legend._scrollY = scrollBoxY;
                Drawing.setTranslate(scrollBox, 0, -scrollBoxY);

                Drawing.setRect(
                    scrollBar,
                    opts._width,
                    constants.scrollBarMargin + scrollBoxY * scrollRatio,
                    constants.scrollBarWidth,
                    scrollBarHeight
                );
                clipPath.select('rect').attr('y', bw + scrollBoxY);
            }

            if(gd._context.edits.legendPosition) {
                var xf, yf, x0, y0;

                legend.classed('cursor-move', true);

                dragElement.init({
                    element: legend.node(),
                    gd: gd,
                    prepFn: function() {
                        var transform = Drawing.getTranslate(legend);
                        x0 = transform.x;
                        y0 = transform.y;
                    },
                    moveFn: function(dx, dy) {
                        var newX = x0 + dx;
                        var newY = y0 + dy;

                        Drawing.setTranslate(legend, newX, newY);

                        xf = dragElement.align(newX, 0, gs.l, gs.l + gs.w, opts.xanchor);
                        yf = dragElement.align(newY, 0, gs.t + gs.h, gs.t, opts.yanchor);
                    },
                    doneFn: function() {
                        if(xf !== undefined && yf !== undefined) {
                            Registry.call('_guiRelayout', gd, {'legend.x': xf, 'legend.y': yf});
                        }
                    },
                    clickFn: function(numClicks, e) {
                        var clickedTrace = layer.selectAll('g.traces').filter(function() {
                            var bbox = this.getBoundingClientRect();
                            return (
                                e.clientX >= bbox.left && e.clientX <= bbox.right &&
                                e.clientY >= bbox.top && e.clientY <= bbox.bottom
                            );
                        });
                        if(clickedTrace.size() > 0) {
                            clickOrDoubleClick(gd, legend, clickedTrace, numClicks, e);
                        }
                    }
                });
            }
        }], gd);
};

function clickOrDoubleClick(gd, legend, legendItem, numClicks, evt) {
    var trace = legendItem.data()[0][0].trace;
    var evtData = {
        event: evt,
        node: legendItem.node(),
        curveNumber: trace.index,
        expandedIndex: trace._expandedIndex,
        data: gd.data,
        layout: gd.layout,
        frames: gd._transitionData._frames,
        config: gd._context,
        fullData: gd._fullData,
        fullLayout: gd._fullLayout
    };

    if(trace._group) {
        evtData.group = trace._group;
    }
    if(Registry.traceIs(trace, 'pie-like')) {
        evtData.label = legendItem.datum()[0].label;
    }

    var clickVal = Events.triggerHandler(gd, 'plotly_legendclick', evtData);
    if(clickVal === false) return;

    if(numClicks === 1) {
        legend._clickTimeout = setTimeout(function() {
            handleClick(legendItem, gd, numClicks);
        }, gd._context.doubleClickDelay);
    } else if(numClicks === 2) {
        if(legend._clickTimeout) clearTimeout(legend._clickTimeout);
        gd._legendMouseDownTime = 0;

        var dblClickVal = Events.triggerHandler(gd, 'plotly_legenddoubleclick', evtData);
        if(dblClickVal !== false) handleClick(legendItem, gd, numClicks);
    }
}

function drawTexts(g, gd, opts) {
    var legendItem = g.data()[0][0];
    var trace = legendItem.trace;
    var isPieLike = Registry.traceIs(trace, 'pie-like');
    var traceIndex = trace.index;
    var isEditable = opts._main && gd._context.edits.legendText && !isPieLike;
    var maxNameLength = opts._maxNameLength;

    var name;
    if(!opts.entries) {
        name = isPieLike ? legendItem.label : trace.name;
        if(trace._meta) {
            name = Lib.templateString(name, trace._meta);
        }
    } else {
        name = legendItem.text;
    }

    var textEl = Lib.ensureSingle(g, 'text', 'legendtext');

    textEl.attr('text-anchor', 'start')
        .classed('user-select-none', true)
        .call(Drawing.font, opts.font)
        .text(isEditable ? ensureLength(name, maxNameLength) : name);

    svgTextUtils.positionText(textEl, constants.textGap, 0);

    if(isEditable) {
        textEl.call(svgTextUtils.makeEditable, {gd: gd, text: name})
            .call(textLayout, g, gd, opts)
            .on('edit', function(newName) {
                this.text(ensureLength(newName, maxNameLength))
                    .call(textLayout, g, gd, opts);

                var fullInput = legendItem.trace._fullInput || {};
                var update = {};

                if(Registry.hasTransform(fullInput, 'groupby')) {
                    var groupbyIndices = Registry.getTransformIndices(fullInput, 'groupby');
                    var index = groupbyIndices[groupbyIndices.length - 1];

                    var kcont = Lib.keyedContainer(fullInput, 'transforms[' + index + '].styles', 'target', 'value.name');

                    kcont.set(legendItem.trace._group, newName);

                    update = kcont.constructUpdate();
                } else {
                    update.name = newName;
                }

                return Registry.call('_guiRestyle', gd, update, traceIndex);
            });
    } else {
        textLayout(textEl, g, gd, opts);
    }
}

/*
 * Make sure we have a reasonably clickable region.
 * If this string is missing or very short, pad it with spaces out to at least
 * 4 characters, up to the max length of other labels, on the assumption that
 * most characters are wider than spaces so a string of spaces will usually be
 * no wider than the real labels.
 */
function ensureLength(str, maxLength) {
    var targetLength = Math.max(4, maxLength);
    if(str && str.trim().length >= targetLength / 2) return str;
    str = str || '';
    for(var i = targetLength - str.length; i > 0; i--) str += ' ';
    return str;
}

function setupTraceToggle(g, gd) {
    var doubleClickDelay = gd._context.doubleClickDelay;
    var newMouseDownTime;
    var numClicks = 1;

    var traceToggle = Lib.ensureSingle(g, 'rect', 'legendtoggle', function(s) {
        s.style('cursor', 'pointer')
            .attr('pointer-events', 'all')
            .call(Color.fill, 'rgba(0,0,0,0)');
    });

    traceToggle.on('mousedown', function() {
        newMouseDownTime = (new Date()).getTime();
        if(newMouseDownTime - gd._legendMouseDownTime < doubleClickDelay) {
            // in a click train
            numClicks += 1;
        } else {
            // new click train
            numClicks = 1;
            gd._legendMouseDownTime = newMouseDownTime;
        }
    });
    traceToggle.on('mouseup', function() {
        if(gd._dragged || gd._editing) return;
        var legend = gd._fullLayout.legend;

        if((new Date()).getTime() - gd._legendMouseDownTime > doubleClickDelay) {
            numClicks = Math.max(numClicks - 1, 1);
        }

        clickOrDoubleClick(gd, legend, g, numClicks, d3.event);
    });
}

function textLayout(s, g, gd, opts) {
    if(!opts._main) s.attr('data-notex', true); // do not process MathJax if not main
    svgTextUtils.convertToTspans(s, gd, function() {
        computeTextDimensions(g, gd, opts);
    });
}

function computeTextDimensions(g, gd, opts) {
    var legendItem = g.data()[0][0];
    if(opts._main && legendItem && !legendItem.trace.showlegend) {
        g.remove();
        return;
    }

    var mathjaxGroup = g.select('g[class*=math-group]');
    var mathjaxNode = mathjaxGroup.node();
    if(!opts) opts = gd._fullLayout.legend;
    var bw = opts.borderwidth;
    var lineHeight = (legendItem ? opts : opts.title).font.size * LINE_SPACING;
    var height, width;

    if(mathjaxNode) {
        var mathjaxBB = Drawing.bBox(mathjaxNode);

        height = mathjaxBB.height;
        width = mathjaxBB.width;

        if(legendItem) {
            Drawing.setTranslate(mathjaxGroup, 0, height * 0.25);
        } else { // case of title
            Drawing.setTranslate(mathjaxGroup, bw, height * 0.75 + bw);
        }
    } else {
        var textEl = g.select(legendItem ?
            '.legendtext' : '.legendtitletext'
        );
        var textLines = svgTextUtils.lineCount(textEl);
        var textNode = textEl.node();

        height = lineHeight * textLines;
        width = textNode ? Drawing.bBox(textNode).width : 0;

        // approximation to height offset to center the font
        // to avoid getBoundingClientRect
        var textY = lineHeight * ((textLines - 1) / 2 - 0.3);
        if(legendItem) {
            svgTextUtils.positionText(textEl, constants.textGap, -textY);
        } else { // case of title
            svgTextUtils.positionText(textEl, constants.titlePad + bw, lineHeight + bw);
        }
    }

    if(legendItem) {
        legendItem.lineHeight = lineHeight;
        legendItem.height = Math.max(height, 16) + 3;
        legendItem.width = width;
    } else { // case of title
        opts._titleWidth = width;
        opts._titleHeight = height;
    }
}

function getTitleSize(opts) {
    var w = 0;
    var h = 0;

    var side = opts.title.side;
    if(side) {
        if(side.indexOf('left') !== -1) {
            w = opts._titleWidth;
        }
        if(side.indexOf('top') !== -1) {
            h = opts._titleHeight;
        }
    }

    return [w, h];
}

/*
 * Computes in fullLayout.legend:
 *
 *  - _height: legend height including items past scrollbox height
 *  - _maxHeight: maximum legend height before scrollbox is required
 *  - _effHeight: legend height w/ or w/o scrollbox
 *
 *  - _width: legend width
 *  - _maxWidth (for orientation:h only): maximum width before starting new row
 */
function computeLegendDimensions(gd, groups, traces, opts) {
    var fullLayout = gd._fullLayout;
    if(!opts) opts = fullLayout.legend;
    var gs = fullLayout._size;

    var isVertical = helpers.isVertical(opts);
    var isGrouped = helpers.isGrouped(opts);

    var bw = opts.borderwidth;
    var bw2 = 2 * bw;
    var textGap = constants.textGap;
    var itemGap = constants.itemGap;
    var endPad = 2 * (bw + itemGap);

    var yanchor = getYanchor(opts);
    var isBelowPlotArea = opts.y < 0 || (opts.y === 0 && yanchor === 'top');
    var isAbovePlotArea = opts.y > 1 || (opts.y === 1 && yanchor === 'bottom');

    // - if below/above plot area, give it the maximum potential margin-push value
    // - otherwise, extend the height of the plot area
    opts._maxHeight = Math.max(
        (isBelowPlotArea || isAbovePlotArea) ? fullLayout.height / 2 : gs.h,
        30
    );

    var toggleRectWidth = 0;
    opts._width = 0;
    opts._height = 0;
    var titleSize = getTitleSize(opts);

    if(isVertical) {
        traces.each(function(d) {
            var h = d[0].height;
            Drawing.setTranslate(this,
                bw + titleSize[0],
                bw + titleSize[1] + opts._height + h / 2 + itemGap
            );
            opts._height += h;
            opts._width = Math.max(opts._width, d[0].width);
        });

        toggleRectWidth = textGap + opts._width;
        opts._width += itemGap + textGap + bw2;
        opts._height += endPad;

        if(isGrouped) {
            groups.each(function(d, i) {
                Drawing.setTranslate(this, 0, i * opts.tracegroupgap);
            });
            opts._height += (opts._lgroupsLength - 1) * opts.tracegroupgap;
        }
    } else {
        var xanchor = getXanchor(opts);
        var isLeftOfPlotArea = opts.x < 0 || (opts.x === 0 && xanchor === 'right');
        var isRightOfPlotArea = opts.x > 1 || (opts.x === 1 && xanchor === 'left');
        var isBeyondPlotAreaY = isAbovePlotArea || isBelowPlotArea;
        var hw = fullLayout.width / 2;

        // - if placed within x-margins, extend the width of the plot area
        // - else if below/above plot area and anchored in the margin, extend to opposite margin,
        // - otherwise give it the maximum potential margin-push value
        opts._maxWidth = Math.max(
            isLeftOfPlotArea ? ((isBeyondPlotAreaY && xanchor === 'left') ? gs.l + gs.w : hw) :
            isRightOfPlotArea ? ((isBeyondPlotAreaY && xanchor === 'right') ? gs.r + gs.w : hw) :
            gs.w,
        2 * textGap);
        var maxItemWidth = 0;
        var combinedItemWidth = 0;
        traces.each(function(d) {
            var w = d[0].width + textGap;
            maxItemWidth = Math.max(maxItemWidth, w);
            combinedItemWidth += w;
        });

        toggleRectWidth = null;
        var maxRowWidth = 0;

        if(isGrouped) {
            var maxGroupHeightInRow = 0;
            var groupOffsetX = 0;
            var groupOffsetY = 0;
            groups.each(function() {
                var maxWidthInGroup = 0;
                var offsetY = 0;
                d3.select(this).selectAll('g.traces').each(function(d) {
                    var h = d[0].height;
                    Drawing.setTranslate(this,
                        titleSize[0],
                        titleSize[1] + bw + itemGap + h / 2 + offsetY
                    );
                    offsetY += h;
                    maxWidthInGroup = Math.max(maxWidthInGroup, textGap + d[0].width);
                });
                maxGroupHeightInRow = Math.max(maxGroupHeightInRow, offsetY);

                var next = maxWidthInGroup + itemGap;

                if((next + bw + groupOffsetX) > opts._maxWidth) {
                    maxRowWidth = Math.max(maxRowWidth, groupOffsetX);
                    groupOffsetX = 0;
                    groupOffsetY += maxGroupHeightInRow + opts.tracegroupgap;
                    maxGroupHeightInRow = offsetY;
                }

                Drawing.setTranslate(this, groupOffsetX, groupOffsetY);

                groupOffsetX += next;
            });

            opts._width = Math.max(maxRowWidth, groupOffsetX) + bw;
            opts._height = groupOffsetY + maxGroupHeightInRow + endPad;
        } else {
            var nTraces = traces.size();
            var oneRowLegend = (combinedItemWidth + bw2 + (nTraces - 1) * itemGap) < opts._maxWidth;

            var maxItemHeightInRow = 0;
            var offsetX = 0;
            var offsetY = 0;
            var rowWidth = 0;
            traces.each(function(d) {
                var h = d[0].height;
                var w = textGap + d[0].width;
                var next = (oneRowLegend ? w : maxItemWidth) + itemGap;

                if((next + bw + offsetX) > opts._maxWidth) {
                    maxRowWidth = Math.max(maxRowWidth, rowWidth);
                    offsetX = 0;
                    offsetY += maxItemHeightInRow;
                    opts._height += maxItemHeightInRow;
                    maxItemHeightInRow = 0;
                }

                Drawing.setTranslate(this,
                    titleSize[0] + bw + offsetX,
                    titleSize[1] + bw + offsetY + h / 2 + itemGap
                );

                rowWidth = offsetX + w + itemGap;
                offsetX += next;
                maxItemHeightInRow = Math.max(maxItemHeightInRow, h);
            });

            if(oneRowLegend) {
                opts._width = offsetX + bw2;
                opts._height = maxItemHeightInRow + endPad;
            } else {
                opts._width = Math.max(maxRowWidth, rowWidth) + bw2;
                opts._height += maxItemHeightInRow + endPad;
            }
        }
    }

    opts._width = Math.ceil(
        Math.max(
            opts._width + titleSize[0],
            opts._titleWidth + 2 * (bw + constants.titlePad)
        )
    );

    opts._height = Math.ceil(
        Math.max(
            opts._height + titleSize[1],
            opts._titleHeight + 2 * (bw + constants.itemGap)
        )
    );

    opts._effHeight = Math.min(opts._height, opts._maxHeight);

    var edits = gd._context.edits;
    var isEditable = edits.legendText || edits.legendPosition;
    traces.each(function(d) {
        var traceToggle = d3.select(this).select('.legendtoggle');
        var h = d[0].height;
        var w = isEditable ? textGap : (toggleRectWidth || (textGap + d[0].width));
        if(!isVertical) w += itemGap / 2;
        Drawing.setRect(traceToggle, 0, -h / 2, w, h);
    });
}

function expandMargin(gd) {
    var fullLayout = gd._fullLayout;
    var opts = fullLayout.legend;
    var xanchor = getXanchor(opts);
    var yanchor = getYanchor(opts);

    return Plots.autoMargin(gd, 'legend', {
        x: opts.x,
        y: opts.y,
        l: opts._width * (FROM_TL[xanchor]),
        r: opts._width * (FROM_BR[xanchor]),
        b: opts._effHeight * (FROM_BR[yanchor]),
        t: opts._effHeight * (FROM_TL[yanchor])
    });
}

function getXanchor(opts) {
    return Lib.isRightAnchor(opts) ? 'right' :
        Lib.isCenterAnchor(opts) ? 'center' :
        'left';
}

function getYanchor(opts) {
    return Lib.isBottomAnchor(opts) ? 'bottom' :
        Lib.isMiddleAnchor(opts) ? 'middle' :
        'top';
}


/***/ }),

/***/ "./node_modules/plotly.js/src/components/legend/get_legend_data.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/legend/get_legend_data.js ***!
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



var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/components/legend/helpers.js");

module.exports = function getLegendData(calcdata, opts) {
    var lgroupToTraces = {};
    var lgroups = [];
    var hasOneNonBlankGroup = false;
    var slicesShown = {};
    var lgroupi = 0;
    var maxNameLength = 0;
    var i, j;
    var main = opts._main;

    function addOneItem(legendGroup, legendItem) {
        // each '' legend group is treated as a separate group
        if(legendGroup === '' || !helpers.isGrouped(opts)) {
            // TODO: check this against fullData legendgroups?
            var uniqueGroup = '~~i' + lgroupi;
            lgroups.push(uniqueGroup);
            lgroupToTraces[uniqueGroup] = [[legendItem]];
            lgroupi++;
        } else if(lgroups.indexOf(legendGroup) === -1) {
            lgroups.push(legendGroup);
            hasOneNonBlankGroup = true;
            lgroupToTraces[legendGroup] = [[legendItem]];
        } else {
            lgroupToTraces[legendGroup].push([legendItem]);
        }
    }

    // build an { legendgroup: [cd0, cd0], ... } object
    for(i = 0; i < calcdata.length; i++) {
        var cd = calcdata[i];
        var cd0 = cd[0];
        var trace = cd0.trace;
        var lgroup = trace.legendgroup;

        if(main && (!trace.visible || !trace.showlegend)) continue;

        if(Registry.traceIs(trace, 'pie-like')) {
            if(!slicesShown[lgroup]) slicesShown[lgroup] = {};

            for(j = 0; j < cd.length; j++) {
                var labelj = cd[j].label;

                if(!slicesShown[lgroup][labelj]) {
                    addOneItem(lgroup, {
                        label: labelj,
                        color: cd[j].color,
                        i: cd[j].i,
                        trace: trace,
                        pts: cd[j].pts
                    });

                    slicesShown[lgroup][labelj] = true;
                    maxNameLength = Math.max(maxNameLength, (labelj || '').length);
                }
            }
        } else {
            addOneItem(lgroup, cd0);
            maxNameLength = Math.max(maxNameLength, (trace.name || '').length);
        }
    }

    // won't draw a legend in this case
    if(!lgroups.length) return [];

    // rearrange lgroupToTraces into a d3-friendly array of arrays
    var lgroupsLength = lgroups.length;
    var ltraces;
    var legendData;

    if(hasOneNonBlankGroup && helpers.isGrouped(opts)) {
        legendData = new Array(lgroupsLength);

        for(i = 0; i < lgroupsLength; i++) {
            ltraces = lgroupToTraces[lgroups[i]];
            legendData[i] = helpers.isReversed(opts) ? ltraces.reverse() : ltraces;
        }
    } else {
        // collapse all groups into one if all groups are blank
        legendData = [new Array(lgroupsLength)];

        for(i = 0; i < lgroupsLength; i++) {
            ltraces = lgroupToTraces[lgroups[i]][0];
            legendData[0][helpers.isReversed(opts) ? lgroupsLength - i - 1 : i] = ltraces;
        }
        lgroupsLength = 1;
    }

    // number of legend groups - needed in legend/draw.js
    opts._lgroupsLength = lgroupsLength;
    // maximum name/label length - needed in legend/draw.js
    opts._maxNameLength = maxNameLength;

    return legendData;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/legend/handle_click.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/legend/handle_click.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

var SHOWISOLATETIP = true;

module.exports = function handleClick(g, gd, numClicks) {
    var fullLayout = gd._fullLayout;

    if(gd._dragged || gd._editing) return;

    var itemClick = fullLayout.legend.itemclick;
    var itemDoubleClick = fullLayout.legend.itemdoubleclick;

    if(numClicks === 1 && itemClick === 'toggle' && itemDoubleClick === 'toggleothers' &&
        SHOWISOLATETIP && gd.data && gd._context.showTips
    ) {
        Lib.notifier(Lib._(gd, 'Double-click on legend to isolate one trace'), 'long');
        SHOWISOLATETIP = false;
    } else {
        SHOWISOLATETIP = false;
    }

    var mode;
    if(numClicks === 1) mode = itemClick;
    else if(numClicks === 2) mode = itemDoubleClick;
    if(!mode) return;

    var hiddenSlices = fullLayout.hiddenlabels ?
        fullLayout.hiddenlabels.slice() :
        [];

    var legendItem = g.data()[0][0];
    var fullData = gd._fullData;
    var fullTrace = legendItem.trace;
    var legendgroup = fullTrace.legendgroup;

    var i, j, kcont, key, keys, val;
    var attrUpdate = {};
    var attrIndices = [];
    var carrs = [];
    var carrIdx = [];

    function insertUpdate(traceIndex, key, value) {
        var attrIndex = attrIndices.indexOf(traceIndex);
        var valueArray = attrUpdate[key];
        if(!valueArray) {
            valueArray = attrUpdate[key] = [];
        }

        if(attrIndices.indexOf(traceIndex) === -1) {
            attrIndices.push(traceIndex);
            attrIndex = attrIndices.length - 1;
        }

        valueArray[attrIndex] = value;

        return attrIndex;
    }

    function setVisibility(fullTrace, visibility) {
        var fullInput = fullTrace._fullInput;
        if(Registry.hasTransform(fullInput, 'groupby')) {
            var kcont = carrs[fullInput.index];
            if(!kcont) {
                var groupbyIndices = Registry.getTransformIndices(fullInput, 'groupby');
                var lastGroupbyIndex = groupbyIndices[groupbyIndices.length - 1];
                kcont = Lib.keyedContainer(fullInput, 'transforms[' + lastGroupbyIndex + '].styles', 'target', 'value.visible');
                carrs[fullInput.index] = kcont;
            }

            var curState = kcont.get(fullTrace._group);

            // If not specified, assume visible. This happens if there are other style
            // properties set for a group but not the visibility. There are many similar
            // ways to do this (e.g. why not just `curState = fullTrace.visible`??? The
            // answer is: because it breaks other things like groupby trace names in
            // subtle ways.)
            if(curState === undefined) {
                curState = true;
            }

            if(curState !== false) {
                // true -> legendonly. All others toggle to true:
                kcont.set(fullTrace._group, visibility);
            }
            carrIdx[fullInput.index] = insertUpdate(fullInput.index, 'visible', fullInput.visible === false ? false : true);
        } else {
            // false -> false (not possible since will not be visible in legend)
            // true -> legendonly
            // legendonly -> true
            var nextVisibility = fullInput.visible === false ? false : visibility;

            insertUpdate(fullInput.index, 'visible', nextVisibility);
        }
    }

    if(Registry.traceIs(fullTrace, 'pie-like')) {
        var thisLabel = legendItem.label;
        var thisLabelIndex = hiddenSlices.indexOf(thisLabel);

        if(mode === 'toggle') {
            if(thisLabelIndex === -1) hiddenSlices.push(thisLabel);
            else hiddenSlices.splice(thisLabelIndex, 1);
        } else if(mode === 'toggleothers') {
            hiddenSlices = [];
            gd.calcdata[0].forEach(function(d) {
                if(thisLabel !== d.label) {
                    hiddenSlices.push(d.label);
                }
            });
            if(gd._fullLayout.hiddenlabels && gd._fullLayout.hiddenlabels.length === hiddenSlices.length && thisLabelIndex === -1) {
                hiddenSlices = [];
            }
        }

        Registry.call('_guiRelayout', gd, 'hiddenlabels', hiddenSlices);
    } else {
        var hasLegendgroup = legendgroup && legendgroup.length;
        var traceIndicesInGroup = [];
        var tracei;
        if(hasLegendgroup) {
            for(i = 0; i < fullData.length; i++) {
                tracei = fullData[i];
                if(!tracei.visible) continue;
                if(tracei.legendgroup === legendgroup) {
                    traceIndicesInGroup.push(i);
                }
            }
        }

        if(mode === 'toggle') {
            var nextVisibility;

            switch(fullTrace.visible) {
                case true:
                    nextVisibility = 'legendonly';
                    break;
                case false:
                    nextVisibility = false;
                    break;
                case 'legendonly':
                    nextVisibility = true;
                    break;
            }

            if(hasLegendgroup) {
                for(i = 0; i < fullData.length; i++) {
                    if(fullData[i].visible !== false && fullData[i].legendgroup === legendgroup) {
                        setVisibility(fullData[i], nextVisibility);
                    }
                }
            } else {
                setVisibility(fullTrace, nextVisibility);
            }
        } else if(mode === 'toggleothers') {
            // Compute the clicked index. expandedIndex does what we want for expanded traces
            // but also culls hidden traces. That means we have some work to do.
            var isClicked, isInGroup, notInLegend, otherState;
            var isIsolated = true;
            for(i = 0; i < fullData.length; i++) {
                isClicked = fullData[i] === fullTrace;
                notInLegend = fullData[i].showlegend !== true;
                if(isClicked || notInLegend) continue;

                isInGroup = (hasLegendgroup && fullData[i].legendgroup === legendgroup);

                if(!isInGroup && fullData[i].visible === true && !Registry.traceIs(fullData[i], 'notLegendIsolatable')) {
                    isIsolated = false;
                    break;
                }
            }

            for(i = 0; i < fullData.length; i++) {
                // False is sticky; we don't change it.
                if(fullData[i].visible === false) continue;

                if(Registry.traceIs(fullData[i], 'notLegendIsolatable')) {
                    continue;
                }

                switch(fullTrace.visible) {
                    case 'legendonly':
                        setVisibility(fullData[i], true);
                        break;
                    case true:
                        otherState = isIsolated ? true : 'legendonly';
                        isClicked = fullData[i] === fullTrace;
                        // N.B. consider traces that have a set legendgroup as toggleable
                        notInLegend = (fullData[i].showlegend !== true && !fullData[i].legendgroup);
                        isInGroup = isClicked || (hasLegendgroup && fullData[i].legendgroup === legendgroup);
                        setVisibility(fullData[i], (isInGroup || notInLegend) ? true : otherState);
                        break;
                }
            }
        }

        for(i = 0; i < carrs.length; i++) {
            kcont = carrs[i];
            if(!kcont) continue;
            var update = kcont.constructUpdate();

            var updateKeys = Object.keys(update);
            for(j = 0; j < updateKeys.length; j++) {
                key = updateKeys[j];
                val = attrUpdate[key] = attrUpdate[key] || [];
                val[carrIdx[i]] = update[key];
            }
        }

        // The length of the value arrays should be equal and any unspecified
        // values should be explicitly undefined for them to get properly culled
        // as updates and not accidentally reset to the default value. This fills
        // out sparse arrays with the required number of undefined values:
        keys = Object.keys(attrUpdate);
        for(i = 0; i < keys.length; i++) {
            key = keys[i];
            for(j = 0; j < attrIndices.length; j++) {
                // Use hasOwnPropety to protect against falsey values:
                if(!attrUpdate[key].hasOwnProperty(j)) {
                    attrUpdate[key][j] = undefined;
                }
            }
        }

        Registry.call('_guiRestyle', gd, attrUpdate, attrIndices);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/legend/helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/legend/helpers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




exports.isGrouped = function isGrouped(legendLayout) {
    return (legendLayout.traceorder || '').indexOf('grouped') !== -1;
};

exports.isVertical = function isVertical(legendLayout) {
    return legendLayout.orientation !== 'h';
};

exports.isReversed = function isReversed(legendLayout) {
    return (legendLayout.traceorder || '').indexOf('reversed') !== -1;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/components/legend/style.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/legend/style.js ***!
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

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Drawing = __webpack_require__(/*! ../drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Color = __webpack_require__(/*! ../color */ "./node_modules/plotly.js/src/components/color/index.js");
var extractOpts = __webpack_require__(/*! ../colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").extractOpts;

var subTypes = __webpack_require__(/*! ../../traces/scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var stylePie = __webpack_require__(/*! ../../traces/pie/style_one */ "./node_modules/plotly.js/src/traces/pie/style_one.js");
var pieCastOption = __webpack_require__(/*! ../../traces/pie/helpers */ "./node_modules/plotly.js/src/traces/pie/helpers.js").castOption;

var CST_MARKER_SIZE = 12;
var CST_LINE_WIDTH = 5;
var CST_MARKER_LINE_WIDTH = 2;
var MAX_LINE_WIDTH = 10;
var MAX_MARKER_LINE_WIDTH = 5;

module.exports = function style(s, gd, legend) {
    var fullLayout = gd._fullLayout;
    if(!legend) legend = fullLayout.legend;
    var constantItemSizing = legend.itemsizing === 'constant';

    var boundLineWidth = function(mlw, cont, max, cst) {
        var v;
        if(mlw + 1) {
            v = mlw;
        } else if(cont && cont.width > 0) {
            v = cont.width;
        } else {
            return 0;
        }
        return constantItemSizing ? cst : Math.min(v, max);
    };

    s.each(function(d) {
        var traceGroup = d3.select(this);

        var layers = Lib.ensureSingle(traceGroup, 'g', 'layers');
        layers.style('opacity', d[0].trace.opacity);

        var valign = legend.valign;
        var lineHeight = d[0].lineHeight;
        var height = d[0].height;

        if(valign === 'middle' || !lineHeight || !height) {
            layers.attr('transform', null);
        } else {
            var factor = {top: 1, bottom: -1}[valign];
            var markerOffsetY = factor * (0.5 * (lineHeight - height + 3));
            layers.attr('transform', 'translate(0,' + markerOffsetY + ')');
        }

        var fill = layers
            .selectAll('g.legendfill')
                .data([d]);
        fill.enter().append('g')
            .classed('legendfill', true);

        var line = layers
            .selectAll('g.legendlines')
                .data([d]);
        line.enter().append('g')
            .classed('legendlines', true);

        var symbol = layers
            .selectAll('g.legendsymbols')
                .data([d]);
        symbol.enter().append('g')
            .classed('legendsymbols', true);

        symbol.selectAll('g.legendpoints')
            .data([d])
          .enter().append('g')
            .classed('legendpoints', true);
    })
    .each(styleSpatial)
    .each(styleWaterfalls)
    .each(styleFunnels)
    .each(styleBars)
    .each(styleBoxes)
    .each(styleFunnelareas)
    .each(stylePies)
    .each(styleLines)
    .each(stylePoints)
    .each(styleCandles)
    .each(styleOHLC);

    function styleLines(d) {
        var d0 = d[0];
        var trace = d0.trace;
        var showFill = trace.visible && trace.fill && trace.fill !== 'none';
        var showLine = subTypes.hasLines(trace);
        var contours = trace.contours;
        var showGradientLine = false;
        var showGradientFill = false;
        var dMod, tMod;

        var cOpts = extractOpts(trace);
        var colorscale = cOpts.colorscale;
        var reversescale = cOpts.reversescale;

        var fillGradient = function(s) {
            if(s.size()) {
                var gradientID = 'legendfill-' + trace.uid;
                Drawing.gradient(s, gd, gradientID,
                    getGradientDirection(reversescale),
                    colorscale, 'fill');
            }
        };

        var lineGradient = function(s) {
            if(s.size()) {
                var gradientID = 'legendline-' + trace.uid;
                Drawing.lineGroupStyle(s);
                Drawing.gradient(s, gd, gradientID,
                    getGradientDirection(reversescale),
                    colorscale, 'stroke');
            }
        };

        if(contours) {
            var coloring = contours.coloring;

            if(coloring === 'lines') {
                showGradientLine = true;
            } else {
                showLine = coloring === 'none' || coloring === 'heatmap' || contours.showlines;
            }

            if(contours.type === 'constraint') {
                showFill = contours._operation !== '=';
            } else if(coloring === 'fill' || coloring === 'heatmap') {
                showGradientFill = true;
            }
        }

        // with fill and no markers or text, move the line and fill up a bit
        // so it's more centered
        var markersOrText = subTypes.hasMarkers(trace) || subTypes.hasText(trace);
        var anyFill = showFill || showGradientFill;
        var anyLine = showLine || showGradientLine;
        var pathStart = (markersOrText || !anyFill) ? 'M5,0' :
            // with a line leave it slightly below center, to leave room for the
            // line thickness and because the line is usually more prominent
            anyLine ? 'M5,-2' : 'M5,-3';

        var this3 = d3.select(this);

        var fill = this3.select('.legendfill').selectAll('path')
            .data(showFill || showGradientFill ? [d] : []);
        fill.enter().append('path').classed('js-fill', true);
        fill.exit().remove();
        fill.attr('d', pathStart + 'h30v6h-30z')
            .call(showFill ? Drawing.fillGroupStyle : fillGradient);

        if(showLine || showGradientLine) {
            var lw = boundLineWidth(undefined, trace.line, MAX_LINE_WIDTH, CST_LINE_WIDTH);
            tMod = Lib.minExtend(trace, {line: {width: lw}});
            dMod = [Lib.minExtend(d0, {trace: tMod})];
        }

        var line = this3.select('.legendlines').selectAll('path')
            .data(showLine || showGradientLine ? [dMod] : []);
        line.enter().append('path').classed('js-line', true);
        line.exit().remove();

        // this is ugly... but you can't apply a gradient to a perfectly
        // horizontal or vertical line. Presumably because then
        // the system doesn't know how to scale vertical variation, even
        // though there *is* no vertical variation in this case.
        // so add an invisibly small angle to the line
        // This issue (and workaround) exist across (Mac) Chrome, FF, and Safari
        line.attr('d', pathStart + (showGradientLine ? 'l30,0.0001' : 'h30'))
            .call(showLine ? Drawing.lineGroupStyle : lineGradient);
    }

    function stylePoints(d) {
        var d0 = d[0];
        var trace = d0.trace;
        var showMarkers = subTypes.hasMarkers(trace);
        var showText = subTypes.hasText(trace);
        var showLines = subTypes.hasLines(trace);
        var dMod, tMod;

        // 'scatter3d' don't use gd.calcdata,
        // use d0.trace to infer arrayOk attributes

        function boundVal(attrIn, arrayToValFn, bounds, cst) {
            var valIn = Lib.nestedProperty(trace, attrIn).get();
            var valToBound = (Lib.isArrayOrTypedArray(valIn) && arrayToValFn) ?
                arrayToValFn(valIn) :
                valIn;

            if(constantItemSizing && valToBound && cst !== undefined) {
                valToBound = cst;
            }

            if(bounds) {
                if(valToBound < bounds[0]) return bounds[0];
                else if(valToBound > bounds[1]) return bounds[1];
            }
            return valToBound;
        }

        function pickFirst(array) {
            if(d0._distinct && d0.index && array[d0.index]) return array[d0.index];
            return array[0];
        }

        // constrain text, markers, etc so they'll fit on the legend
        if(showMarkers || showText || showLines) {
            var dEdit = {};
            var tEdit = {};

            if(showMarkers) {
                dEdit.mc = boundVal('marker.color', pickFirst);
                dEdit.mx = boundVal('marker.symbol', pickFirst);
                dEdit.mo = boundVal('marker.opacity', Lib.mean, [0.2, 1]);
                dEdit.mlc = boundVal('marker.line.color', pickFirst);
                dEdit.mlw = boundVal('marker.line.width', Lib.mean, [0, 5], CST_MARKER_LINE_WIDTH);
                tEdit.marker = {
                    sizeref: 1,
                    sizemin: 1,
                    sizemode: 'diameter'
                };

                var ms = boundVal('marker.size', Lib.mean, [2, 16], CST_MARKER_SIZE);
                dEdit.ms = ms;
                tEdit.marker.size = ms;
            }

            if(showLines) {
                tEdit.line = {
                    width: boundVal('line.width', pickFirst, [0, 10], CST_LINE_WIDTH)
                };
            }

            if(showText) {
                dEdit.tx = 'Aa';
                dEdit.tp = boundVal('textposition', pickFirst);
                dEdit.ts = 10;
                dEdit.tc = boundVal('textfont.color', pickFirst);
                dEdit.tf = boundVal('textfont.family', pickFirst);
            }

            dMod = [Lib.minExtend(d0, dEdit)];
            tMod = Lib.minExtend(trace, tEdit);

            // always show legend items in base state
            tMod.selectedpoints = null;

            // never show texttemplate
            tMod.texttemplate = null;
        }

        var ptgroup = d3.select(this).select('g.legendpoints');

        var pts = ptgroup.selectAll('path.scatterpts')
            .data(showMarkers ? dMod : []);
        // make sure marker is on the bottom, in case it enters after text
        pts.enter().insert('path', ':first-child')
            .classed('scatterpts', true)
            .attr('transform', 'translate(20,0)');
        pts.exit().remove();
        pts.call(Drawing.pointStyle, tMod, gd);

        // 'mrc' is set in pointStyle and used in textPointStyle:
        // constrain it here
        if(showMarkers) dMod[0].mrc = 3;

        var txt = ptgroup.selectAll('g.pointtext')
            .data(showText ? dMod : []);
        txt.enter()
            .append('g').classed('pointtext', true)
                .append('text').attr('transform', 'translate(20,0)');
        txt.exit().remove();
        txt.selectAll('text').call(Drawing.textPointStyle, tMod, gd);
    }

    function styleWaterfalls(d) {
        var trace = d[0].trace;
        var isWaterfall = trace.type === 'waterfall';

        if(d[0]._distinct && isWaterfall) {
            var cont = d[0].trace[d[0].dir].marker;
            d[0].mc = cont.color;
            d[0].mlw = cont.line.width;
            d[0].mlc = cont.line.color;
            return styleBarLike(d, this, 'waterfall');
        }

        var ptsData = [];
        if(trace.visible && isWaterfall) {
            ptsData = d[0].hasTotals ?
                [['increasing', 'M-6,-6V6H0Z'], ['totals', 'M6,6H0L-6,-6H-0Z'], ['decreasing', 'M6,6V-6H0Z']] :
                [['increasing', 'M-6,-6V6H6Z'], ['decreasing', 'M6,6V-6H-6Z']];
        }

        var pts = d3.select(this).select('g.legendpoints')
            .selectAll('path.legendwaterfall')
            .data(ptsData);
        pts.enter().append('path').classed('legendwaterfall', true)
            .attr('transform', 'translate(20,0)')
            .style('stroke-miterlimit', 1);
        pts.exit().remove();

        pts.each(function(dd) {
            var pt = d3.select(this);
            var cont = trace[dd[0]].marker;
            var lw = boundLineWidth(undefined, cont.line, MAX_MARKER_LINE_WIDTH, CST_MARKER_LINE_WIDTH);

            pt.attr('d', dd[1])
                .style('stroke-width', lw + 'px')
                .call(Color.fill, cont.color);

            if(lw) {
                pt.call(Color.stroke, cont.line.color);
            }
        });
    }

    function styleBars(d) {
        styleBarLike(d, this);
    }

    function styleFunnels(d) {
        styleBarLike(d, this, 'funnel');
    }

    function styleBarLike(d, lThis, desiredType) {
        var trace = d[0].trace;
        var marker = trace.marker || {};
        var markerLine = marker.line || {};

        var isVisible = (!desiredType) ? Registry.traceIs(trace, 'bar') :
            (trace.visible && trace.type === desiredType);

        var barpath = d3.select(lThis).select('g.legendpoints')
            .selectAll('path.legend' + desiredType)
            .data(isVisible ? [d] : []);
        barpath.enter().append('path').classed('legend' + desiredType, true)
            .attr('d', 'M6,6H-6V-6H6Z')
            .attr('transform', 'translate(20,0)');
        barpath.exit().remove();

        barpath.each(function(d) {
            var p = d3.select(this);
            var d0 = d[0];
            var w = boundLineWidth(d0.mlw, marker.line, MAX_MARKER_LINE_WIDTH, CST_MARKER_LINE_WIDTH);

            p.style('stroke-width', w + 'px')
                .call(Color.fill, d0.mc || marker.color);

            if(w) Color.stroke(p, d0.mlc || markerLine.color);
        });
    }

    function styleBoxes(d) {
        var trace = d[0].trace;

        var pts = d3.select(this).select('g.legendpoints')
            .selectAll('path.legendbox')
            .data(trace.visible && Registry.traceIs(trace, 'box-violin') ? [d] : []);
        pts.enter().append('path').classed('legendbox', true)
            // if we want the median bar, prepend M6,0H-6
            .attr('d', 'M6,6H-6V-6H6Z')
            .attr('transform', 'translate(20,0)');
        pts.exit().remove();

        pts.each(function() {
            var p = d3.select(this);

            if((trace.boxpoints === 'all' || trace.points === 'all') &&
                Color.opacity(trace.fillcolor) === 0 && Color.opacity((trace.line || {}).color) === 0
            ) {
                var tMod = Lib.minExtend(trace, {
                    marker: {
                        size: constantItemSizing ? CST_MARKER_SIZE : Lib.constrain(trace.marker.size, 2, 16),
                        sizeref: 1,
                        sizemin: 1,
                        sizemode: 'diameter'
                    }
                });
                pts.call(Drawing.pointStyle, tMod, gd);
            } else {
                var w = boundLineWidth(undefined, trace.line, MAX_MARKER_LINE_WIDTH, CST_MARKER_LINE_WIDTH);

                p.style('stroke-width', w + 'px')
                    .call(Color.fill, trace.fillcolor);

                if(w) Color.stroke(p, trace.line.color);
            }
        });
    }

    function styleCandles(d) {
        var trace = d[0].trace;

        var pts = d3.select(this).select('g.legendpoints')
            .selectAll('path.legendcandle')
            .data(trace.visible && trace.type === 'candlestick' ? [d, d] : []);
        pts.enter().append('path').classed('legendcandle', true)
            .attr('d', function(_, i) {
                if(i) return 'M-15,0H-8M-8,6V-6H8Z'; // increasing
                return 'M15,0H8M8,-6V6H-8Z'; // decreasing
            })
            .attr('transform', 'translate(20,0)')
            .style('stroke-miterlimit', 1);
        pts.exit().remove();

        pts.each(function(_, i) {
            var p = d3.select(this);
            var cont = trace[i ? 'increasing' : 'decreasing'];
            var w = boundLineWidth(undefined, cont.line, MAX_MARKER_LINE_WIDTH, CST_MARKER_LINE_WIDTH);

            p.style('stroke-width', w + 'px')
                .call(Color.fill, cont.fillcolor);

            if(w) Color.stroke(p, cont.line.color);
        });
    }

    function styleOHLC(d) {
        var trace = d[0].trace;

        var pts = d3.select(this).select('g.legendpoints')
            .selectAll('path.legendohlc')
            .data(trace.visible && trace.type === 'ohlc' ? [d, d] : []);
        pts.enter().append('path').classed('legendohlc', true)
            .attr('d', function(_, i) {
                if(i) return 'M-15,0H0M-8,-6V0'; // increasing
                return 'M15,0H0M8,6V0'; // decreasing
            })
            .attr('transform', 'translate(20,0)')
            .style('stroke-miterlimit', 1);
        pts.exit().remove();

        pts.each(function(_, i) {
            var p = d3.select(this);
            var cont = trace[i ? 'increasing' : 'decreasing'];
            var w = boundLineWidth(undefined, cont.line, MAX_MARKER_LINE_WIDTH, CST_MARKER_LINE_WIDTH);

            p.style('fill', 'none')
                .call(Drawing.dashLine, cont.line.dash, w);

            if(w) Color.stroke(p, cont.line.color);
        });
    }

    function stylePies(d) {
        stylePieLike(d, this, 'pie');
    }

    function styleFunnelareas(d) {
        stylePieLike(d, this, 'funnelarea');
    }

    function stylePieLike(d, lThis, desiredType) {
        var d0 = d[0];
        var trace = d0.trace;

        var isVisible = (!desiredType) ? Registry.traceIs(trace, desiredType) :
            (trace.visible && trace.type === desiredType);

        var pts = d3.select(lThis).select('g.legendpoints')
            .selectAll('path.legend' + desiredType)
            .data(isVisible ? [d] : []);
        pts.enter().append('path').classed('legend' + desiredType, true)
            .attr('d', 'M6,6H-6V-6H6Z')
            .attr('transform', 'translate(20,0)');
        pts.exit().remove();

        if(pts.size()) {
            var cont = (trace.marker || {}).line;
            var lw = boundLineWidth(pieCastOption(cont.width, d0.pts), cont, MAX_MARKER_LINE_WIDTH, CST_MARKER_LINE_WIDTH);

            var tMod = Lib.minExtend(trace, {marker: {line: {width: lw}}});
            // since minExtend do not slice more than 3 items we need to patch line.color here
            tMod.marker.line.color = cont.color;

            var d0Mod = Lib.minExtend(d0, {trace: tMod});

            stylePie(pts, d0Mod, tMod);
        }
    }

    function styleSpatial(d) { // i.e. maninly traces having z and colorscale
        var trace = d[0].trace;

        var useGradient;
        var ptsData = [];
        if(trace.visible) {
            switch(trace.type) {
                case 'histogram2d' :
                case 'heatmap' :
                    ptsData = [
                        ['M-15,-2V4H15V-2Z'] // similar to contour
                    ];
                    useGradient = true;
                    break;
                case 'choropleth' :
                case 'choroplethmapbox' :
                    ptsData = [
                        ['M-6,-6V6H6V-6Z']
                    ];
                    useGradient = true;
                    break;
                case 'densitymapbox' :
                    ptsData = [
                        ['M-6,0 a6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0']
                    ];
                    useGradient = 'radial';
                    break;
                case 'cone' :
                    ptsData = [
                        ['M-6,2 A2,2 0 0,0 -6,6 V6L6,4Z'],
                        ['M-6,-6 A2,2 0 0,0 -6,-2 L6,-4Z'],
                        ['M-6,-2 A2,2 0 0,0 -6,2 L6,0Z']
                    ];
                    useGradient = false;
                    break;
                case 'streamtube' :
                    ptsData = [
                        ['M-6,2 A2,2 0 0,0 -6,6 H6 A2,2 0 0,1 6,2 Z'],
                        ['M-6,-6 A2,2 0 0,0 -6,-2 H6 A2,2 0 0,1 6,-6 Z'],
                        ['M-6,-2 A2,2 0 0,0 -6,2 H6 A2,2 0 0,1 6,-2 Z']
                    ];
                    useGradient = false;
                    break;
                case 'surface' :
                    ptsData = [
                        ['M-6,-6 A2,3 0 0,0 -6,0 H6 A2,3 0 0,1 6,-6 Z'],
                        ['M-6,1 A2,3 0 0,1 -6,6 H6 A2,3 0 0,0 6,0 Z']
                    ];
                    useGradient = true;
                    break;
                case 'mesh3d' :
                    ptsData = [
                        ['M-6,6H0L-6,-6Z'],
                        ['M6,6H0L6,-6Z'],
                        ['M-6,-6H6L0,6Z']
                    ];
                    useGradient = false;
                    break;
                case 'volume' :
                    ptsData = [
                        ['M-6,6H0L-6,-6Z'],
                        ['M6,6H0L6,-6Z'],
                        ['M-6,-6H6L0,6Z']
                    ];
                    useGradient = true;
                    break;
                case 'isosurface':
                    ptsData = [
                        ['M-6,6H0L-6,-6Z'],
                        ['M6,6H0L6,-6Z'],
                        ['M-6,-6 A12,24 0 0,0 6,-6 L0,6Z']
                    ];
                    useGradient = false;
                    break;
            }
        }

        var pts = d3.select(this).select('g.legendpoints')
            .selectAll('path.legend3dandfriends')
            .data(ptsData);
        pts.enter().append('path').classed('legend3dandfriends', true)
            .attr('transform', 'translate(20,0)')
            .style('stroke-miterlimit', 1);
        pts.exit().remove();

        pts.each(function(dd, i) {
            var pt = d3.select(this);

            var cOpts = extractOpts(trace);
            var colorscale = cOpts.colorscale;
            var reversescale = cOpts.reversescale;
            var fillGradient = function(s) {
                if(s.size()) {
                    var gradientID = 'legendfill-' + trace.uid;
                    Drawing.gradient(s, gd, gradientID,
                        getGradientDirection(reversescale, useGradient === 'radial'),
                        colorscale, 'fill');
                }
            };

            var fillColor;
            if(!colorscale) {
                var color = trace.vertexcolor || trace.facecolor || trace.color;
                fillColor = Lib.isArrayOrTypedArray(color) ? (color[i] || color[0]) : color;
            } else {
                if(!useGradient) {
                    var len = colorscale.length;
                    fillColor =
                        i === 0 ? colorscale[reversescale ? len - 1 : 0][1] : // minimum
                        i === 1 ? colorscale[reversescale ? 0 : len - 1][1] : // maximum
                            colorscale[Math.floor((len - 1) / 2)][1]; // middle
                }
            }

            pt.attr('d', dd[0]);
            if(fillColor) {
                pt.call(Color.fill, fillColor);
            } else {
                pt.call(fillGradient);
            }
        });
    }
};

function getGradientDirection(reversescale, isRadial) {
    var str = isRadial ? 'radial' : 'horizontal';
    return str + (reversescale ? '' : 'reversed');
}


/***/ }),

/***/ "./node_modules/plotly.js/src/lib/override_cursor.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/override_cursor.js ***!
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




var setCursor = __webpack_require__(/*! ./setcursor */ "./node_modules/plotly.js/src/lib/setcursor.js");

var STASHATTR = 'data-savedcursor';
var NO_CURSOR = '!!';

/*
 * works with our CSS cursor classes (see css/_cursor.scss)
 * to override a previous cursor set on d3 single-element selections,
 * by moving the name of the original cursor to the data-savedcursor attr.
 * omit cursor to revert to the previously set value.
 */
module.exports = function overrideCursor(el3, csr) {
    var savedCursor = el3.attr(STASHATTR);
    if(csr) {
        if(!savedCursor) {
            var classes = (el3.attr('class') || '').split(' ');
            for(var i = 0; i < classes.length; i++) {
                var cls = classes[i];
                if(cls.indexOf('cursor-') === 0) {
                    el3.attr(STASHATTR, cls.substr(7))
                        .classed(cls, false);
                }
            }
            if(!el3.attr(STASHATTR)) {
                el3.attr(STASHATTR, NO_CURSOR);
            }
        }
        setCursor(el3, csr);
    } else if(savedCursor) {
        el3.attr(STASHATTR, null);

        if(savedCursor === NO_CURSOR) setCursor(el3);
        else setCursor(el3, savedCursor);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/helpers.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/helpers.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

exports.formatPiePercent = function formatPiePercent(v, separators) {
    var vRounded = (v * 100).toPrecision(3);
    if(vRounded.lastIndexOf('.') !== -1) {
        vRounded = vRounded.replace(/[.]?0+$/, '');
    }
    return Lib.numSeparate(vRounded, separators) + '%';
};

exports.formatPieValue = function formatPieValue(v, separators) {
    var vRounded = v.toPrecision(10);
    if(vRounded.lastIndexOf('.') !== -1) {
        vRounded = vRounded.replace(/[.]?0+$/, '');
    }
    return Lib.numSeparate(vRounded, separators);
};

exports.getFirstFilled = function getFirstFilled(array, indices) {
    if(!Array.isArray(array)) return;
    for(var i = 0; i < indices.length; i++) {
        var v = array[indices[i]];
        if(v || v === 0 || v === '') return v;
    }
};

exports.castOption = function castOption(item, indices) {
    if(Array.isArray(item)) return exports.getFirstFilled(item, indices);
    else if(item) return item;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/style_one.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/style_one.js ***!
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
var castOption = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/pie/helpers.js").castOption;

module.exports = function styleOne(s, pt, trace) {
    var line = trace.marker.line;
    var lineColor = castOption(line.color, pt.pts) || Color.defaultLine;
    var lineWidth = castOption(line.width, pt.pts) || 0;

    s.style('stroke-width', lineWidth)
        .call(Color.fill, pt.color)
        .call(Color.stroke, lineColor);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29tcG9uZW50cy9meC9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2Z4L2NsaWNrLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2Z4L2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2Z4L2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2Z4L2hvdmVybGFiZWxfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL2NvbXBvbmVudHMvZngvaG92ZXJtb2RlX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2Z4L2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2Z4L2xheW91dF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29tcG9uZW50cy9meC9sYXlvdXRfZ2xvYmFsX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2xlZ2VuZC9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2xlZ2VuZC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL2NvbXBvbmVudHMvbGVnZW5kL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2xlZ2VuZC9kcmF3LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL2xlZ2VuZC9nZXRfbGVnZW5kX2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL2NvbXBvbmVudHMvbGVnZW5kL2hhbmRsZV9jbGljay5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29tcG9uZW50cy9sZWdlbmQvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29tcG9uZW50cy9sZWdlbmQvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL2xpYi9vdmVycmlkZV9jdXJzb3IuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9waWUvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9zdHlsZV9vbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRXZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1QkFBdUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQyxrQ0FBa0MsRUFBRTs7QUFFekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwyQ0FBMkM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsNkNBQTZDO0FBQzdGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxREFBcUQsMEJBQTBCO0FBQy9FLHFEQUFxRCwwQkFBMEI7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxRQUFRO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLFFBQVE7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsUUFBUTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7O0FBRTlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBLCtCQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNkJBQTZCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JELFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1DQUFtQzs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsZ0VBQWdCO0FBQ3ZDLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixlQUFlLG1C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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsK0RBQStELCtCQUErQjtBQUM5RjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdEQUFnRCxtQkFBbUI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxhQUFhOztB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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1RkFBdUY7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0Y2E4YjNiMGYyOGM3MDM2MTVjN2IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCkge1xuICAgIHZhciBjYWxjZGF0YSA9IGdkLmNhbGNkYXRhO1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG5cbiAgICBmdW5jdGlvbiBtYWtlQ29lcmNlSG92ZXJJbmZvKHRyYWNlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBMaWIuY29lcmNlSG92ZXJpbmZvKHtob3ZlcmluZm86IHZhbH0sIHtfbW9kdWxlOiB0cmFjZS5fbW9kdWxlfSwgZnVsbExheW91dCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhbGNkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjZCA9IGNhbGNkYXRhW2ldO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcblxuICAgICAgICAvLyBkb24ndCBpbmNsdWRlIGhvdmVyIGNhbGMgZmllbGRzIGZvciBwaWUgdHJhY2VzXG4gICAgICAgIC8vIGFzIGNhbGNkYXRhIGl0ZW1zIG1pZ2h0IGJlIHNvcnRlZCBieSB2YWx1ZSBhbmRcbiAgICAgICAgLy8gd29uJ3QgbWF0Y2ggdGhlIGRhdGEgYXJyYXkgb3JkZXIuXG4gICAgICAgIGlmKFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsICdwaWUtbGlrZScpKSBjb250aW51ZTtcblxuICAgICAgICB2YXIgZmlsbEZuID0gUmVnaXN0cnkudHJhY2VJcyh0cmFjZSwgJzJkTWFwJykgPyBwYXN0ZSA6IExpYi5maWxsQXJyYXk7XG5cbiAgICAgICAgZmlsbEZuKHRyYWNlLmhvdmVyaW5mbywgY2QsICdoaScsIG1ha2VDb2VyY2VIb3ZlckluZm8odHJhY2UpKTtcblxuICAgICAgICBpZih0cmFjZS5ob3ZlcnRlbXBsYXRlKSBmaWxsRm4odHJhY2UuaG92ZXJ0ZW1wbGF0ZSwgY2QsICdodCcpO1xuXG4gICAgICAgIGlmKCF0cmFjZS5ob3ZlcmxhYmVsKSBjb250aW51ZTtcblxuICAgICAgICBmaWxsRm4odHJhY2UuaG92ZXJsYWJlbC5iZ2NvbG9yLCBjZCwgJ2hiZycpO1xuICAgICAgICBmaWxsRm4odHJhY2UuaG92ZXJsYWJlbC5ib3JkZXJjb2xvciwgY2QsICdoYmMnKTtcbiAgICAgICAgZmlsbEZuKHRyYWNlLmhvdmVybGFiZWwuZm9udC5zaXplLCBjZCwgJ2h0cycpO1xuICAgICAgICBmaWxsRm4odHJhY2UuaG92ZXJsYWJlbC5mb250LmNvbG9yLCBjZCwgJ2h0YycpO1xuICAgICAgICBmaWxsRm4odHJhY2UuaG92ZXJsYWJlbC5mb250LmZhbWlseSwgY2QsICdodGYnKTtcbiAgICAgICAgZmlsbEZuKHRyYWNlLmhvdmVybGFiZWwubmFtZWxlbmd0aCwgY2QsICdobmwnKTtcbiAgICAgICAgZmlsbEZuKHRyYWNlLmhvdmVybGFiZWwuYWxpZ24sIGNkLCAnaHRhJyk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gcGFzdGUodHJhY2VBdHRyLCBjZCwgY2RBdHRyLCBmbikge1xuICAgIGZuID0gZm4gfHwgTGliLmlkZW50aXR5O1xuXG4gICAgaWYoQXJyYXkuaXNBcnJheSh0cmFjZUF0dHIpKSB7XG4gICAgICAgIGNkWzBdW2NkQXR0cl0gPSBmbih0cmFjZUF0dHIpO1xuICAgIH1cbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBob3ZlciA9IHJlcXVpcmUoJy4vaG92ZXInKS5ob3ZlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjbGljayhnZCwgZXZ0LCBzdWJwbG90KSB7XG4gICAgdmFyIGFubm90YXRpb25zRG9uZSA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnYW5ub3RhdGlvbnMnLCAnb25DbGljaycpKGdkLCBnZC5faG92ZXJkYXRhKTtcblxuICAgIC8vIGZhbGxiYWNrIHRvIGZhaWwtc2FmZSBpbiBjYXNlIHRoZSBwbG90IHR5cGUncyBob3ZlciBtZXRob2QgZG9lc24ndCBwYXNzIHRoZSBzdWJwbG90LlxuICAgIC8vIFRlcm5hcnksIGZvciBleGFtcGxlLCBkaWRuJ3QsIGJ1dCBpdCB3YXMgY2F1Z2h0IGJlY2F1c2UgdGVzdGVkLlxuICAgIGlmKHN1YnBsb3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBUaGUgdHJ1ZSBmbGFnIGF0IHRoZSBlbmQgY2F1c2VzIGl0IHRvIHJlLXJ1biB0aGUgaG92ZXIgY29tcHV0YXRpb24gdG8gZmlndXJlIG91dCAqd2hpY2gqXG4gICAgICAgIC8vIHBvaW50IGlzIGJlaW5nIGNsaWNrZWQuIFdpdGhvdXQgdGhpcywgY2xpY2tpbmcgaXMgc29tZXdoYXQgdW5yZWxpYWJsZS5cbiAgICAgICAgaG92ZXIoZ2QsIGV2dCwgc3VicGxvdCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdENsaWNrKCkgeyBnZC5lbWl0KCdwbG90bHlfY2xpY2snLCB7cG9pbnRzOiBnZC5faG92ZXJkYXRhLCBldmVudDogZXZ0fSk7IH1cblxuICAgIGlmKGdkLl9ob3ZlcmRhdGEgJiYgZXZ0ICYmIGV2dC50YXJnZXQpIHtcbiAgICAgICAgaWYoYW5ub3RhdGlvbnNEb25lICYmIGFubm90YXRpb25zRG9uZS50aGVuKSB7XG4gICAgICAgICAgICBhbm5vdGF0aW9uc0RvbmUudGhlbihlbWl0Q2xpY2spO1xuICAgICAgICB9IGVsc2UgZW1pdENsaWNrKCk7XG5cbiAgICAgICAgLy8gd2h5IGRvIHdlIGdldCBhIGRvdWJsZSBldmVudCB3aXRob3V0IHRoaXM/Pz9cbiAgICAgICAgaWYoZXZ0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikgZXZ0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgaGFuZGxlSG92ZXJMYWJlbERlZmF1bHRzID0gcmVxdWlyZSgnLi9ob3ZlcmxhYmVsX2RlZmF1bHRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBvcHRzID0gTGliLmV4dGVuZEZsYXQoe30sIGxheW91dC5ob3ZlcmxhYmVsKTtcbiAgICBpZih0cmFjZU91dC5ob3ZlcnRlbXBsYXRlKSBvcHRzLm5hbWVsZW5ndGggPSAtMTtcblxuICAgIGhhbmRsZUhvdmVyTGFiZWxEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBvcHRzKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcbnZhciB0aW55Y29sb3IgPSByZXF1aXJlKCd0aW55Y29sb3IyJyk7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBFdmVudHMgPSByZXF1aXJlKCcuLi8uLi9saWIvZXZlbnRzJyk7XG52YXIgc3ZnVGV4dFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vbGliL3N2Z190ZXh0X3V0aWxzJyk7XG52YXIgb3ZlcnJpZGVDdXJzb3IgPSByZXF1aXJlKCcuLi8uLi9saWIvb3ZlcnJpZGVfY3Vyc29yJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uL2RyYXdpbmcnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uL2NvbG9yJyk7XG52YXIgZHJhZ0VsZW1lbnQgPSByZXF1aXJlKCcuLi9kcmFnZWxlbWVudCcpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG52YXIgbGVnZW5kU3VwcGx5RGVmYXVsdHMgPSByZXF1aXJlKCcuLi9sZWdlbmQvZGVmYXVsdHMnKTtcbnZhciBsZWdlbmREcmF3ID0gcmVxdWlyZSgnLi4vbGVnZW5kL2RyYXcnKTtcblxuLy8gaG92ZXIgbGFiZWxzIGZvciBtdWx0aXBsZSBob3Jpem9udGFsIGJhcnMgZ2V0IHRpbHRlZCBieSBzb21lIGFuZ2xlLFxuLy8gdGhlbiBuZWVkIHRvIGJlIG9mZnNldCBkaWZmZXJlbnRseSBpZiB0aGV5IG92ZXJsYXBcbnZhciBZQU5HTEUgPSBjb25zdGFudHMuWUFOR0xFO1xudmFyIFlBX1JBRElBTlMgPSBNYXRoLlBJICogWUFOR0xFIC8gMTgwO1xuXG4vLyBleHBhbnNpb24gb2YgcHJvamVjdGVkIGhlaWdodFxudmFyIFlGQUNUT1IgPSAxIC8gTWF0aC5zaW4oWUFfUkFESUFOUyk7XG5cbi8vIHRvIG1ha2UgdGhlIGFwcHJvcHJpYXRlIHBvc3Qtcm90YXRpb24geCBvZmZzZXQsXG4vLyB5b3UgbmVlZCBib3RoIHggYW5kIHkgb2Zmc2V0c1xudmFyIFlTSElGVFggPSBNYXRoLmNvcyhZQV9SQURJQU5TKTtcbnZhciBZU0hJRlRZID0gTWF0aC5zaW4oWUFfUkFESUFOUyk7XG5cbi8vIHNpemUgYW5kIGRpc3BsYXkgY29uc3RhbnRzIGZvciBob3ZlciB0ZXh0XG52YXIgSE9WRVJBUlJPV1NJWkUgPSBjb25zdGFudHMuSE9WRVJBUlJPV1NJWkU7XG52YXIgSE9WRVJURVhUUEFEID0gY29uc3RhbnRzLkhPVkVSVEVYVFBBRDtcblxuLy8gZnguaG92ZXI6IGhpZ2hsaWdodCBkYXRhIG9uIGhvdmVyXG4vLyBldnQgY2FuIGJlIGEgbW91c2Vtb3ZlIGV2ZW50LCBvciBhbiBvYmplY3Qgd2l0aCBkYXRhIGFib3V0IHdoYXQgcG9pbnRzXG4vLyAgIHRvIGhvdmVyIG9uXG4vLyAgICAgIHt4cHgseXB4Wyxob3Zlcm1vZGVdfSAtIHBpeGVsIGxvY2F0aW9ucyBmcm9tIHRvcCBsZWZ0XG4vLyAgICAgICAgICAod2l0aCBvcHRpb25hbCBvdmVycmlkaW5nIGhvdmVybW9kZSlcbi8vICAgICAge3h2YWwseXZhbFssaG92ZXJtb2RlXX0gLSBkYXRhIHZhbHVlc1xuLy8gICAgICBbe2N1cnZlTnVtYmVyLChwb2ludE51bWJlcnx4dmFsIGFuZC9vciB5dmFsKX1dIC1cbi8vICAgICAgICAgICAgICBhcnJheSBvZiBzcGVjaWZpYyBwb2ludHMgdG8gaGlnaGxpZ2h0XG4vLyAgICAgICAgICBwb2ludE51bWJlciBpcyBhIHNpbmdsZSBpbnRlZ2VyIGlmIGdkLmRhdGFbY3VydmVOdW1iZXJdIGlzIDFELFxuLy8gICAgICAgICAgICAgIG9yIGEgdHdvLWVsZW1lbnQgYXJyYXkgaWYgaXQncyAyRFxuLy8gICAgICAgICAgeHZhbCBhbmQgeXZhbCBhcmUgZGF0YSB2YWx1ZXMsXG4vLyAgICAgICAgICAgICAgMUQgZGF0YSBtYXkgc3BlY2lmeSBlaXRoZXIgb3IgYm90aCxcbi8vICAgICAgICAgICAgICAyRCBkYXRhIG11c3Qgc3BlY2lmeSBib3RoXG4vLyBzdWJwbG90IGlzIGFuIGlkIHN0cmluZyAoZGVmYXVsdCBcInh5XCIpXG4vLyBtYWtlcyB1c2Ugb2YgZ2wuaG92ZXJtb2RlLCB3aGljaCBjYW4gYmU6XG4vLyAgICAgIHggKGZpbmQgdGhlIHBvaW50cyB3aXRoIHRoZSBjbG9zZXN0IHggdmFsdWVzLCBpZSBhIGNvbHVtbiksXG4vLyAgICAgIGNsb3Nlc3QgKGZpbmQgdGhlIHNpbmdsZSBjbG9zZXN0IHBvaW50KVxuLy8gICAgaW50ZXJuYWxseSB0aGVyZSBhcmUgdHdvIG1vcmUgdGhhdCBvY2Nhc2lvbmFsbHkgZ2V0IHVzZWQ6XG4vLyAgICAgIHkgKHBpY2sgb3V0IGEgcm93IC0gb25seSB1c2VkIGZvciBtdWx0aXBsZSBob3Jpem9udGFsIGJhciBjaGFydHMpXG4vLyAgICAgIGFycmF5ICh1c2VkIHdoZW4gdGhlIHVzZXIgc3BlY2lmaWVzIGFuIGV4cGxpY2l0XG4vLyAgICAgICAgICBhcnJheSBvZiBwb2ludHMgdG8gaG92ZXIgb24pXG4vL1xuLy8gV2Ugd3JhcCB0aGUgaG92ZXJzIGluIGEgdGltZXIsIHRvIGxpbWl0IHRoZWlyIGZyZXF1ZW5jeS5cbi8vIFRoZSBhY3R1YWwgcmVuZGVyaW5nIGlzIGRvbmUgYnkgcHJpdmF0ZSBmdW5jdGlvbiBfaG92ZXIuXG5leHBvcnRzLmhvdmVyID0gZnVuY3Rpb24gaG92ZXIoZ2QsIGV2dCwgc3VicGxvdCwgbm9Ib3ZlckV2ZW50KSB7XG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuXG4gICAgTGliLnRocm90dGxlKFxuICAgICAgICBnZC5fZnVsbExheW91dC5fdWlkICsgY29uc3RhbnRzLkhPVkVSSUQsXG4gICAgICAgIGNvbnN0YW50cy5IT1ZFUk1JTlRJTUUsXG4gICAgICAgIGZ1bmN0aW9uKCkgeyBfaG92ZXIoZ2QsIGV2dCwgc3VicGxvdCwgbm9Ib3ZlckV2ZW50KTsgfVxuICAgICk7XG59O1xuXG4vKlxuICogRHJhdyBhIHNpbmdsZSBob3ZlciBpdGVtIG9yIGFuIGFycmF5IG9mIGhvdmVyIGl0ZW0gaW4gYSBwcmUtZXhpc3Rpbmcgc3ZnIGNvbnRhaW5lciBzb21ld2hlcmVcbiAqIGhvdmVySXRlbSBzaG91bGQgaGF2ZSBrZXlzOlxuICogICAgLSB4IGFuZCB5IChvciB4MCwgeDEsIHkwLCBhbmQgeTEpOlxuICogICAgICB0aGUgcGl4ZWwgcG9zaXRpb24gdG8gbWFyaywgcmVsYXRpdmUgdG8gb3B0cy5jb250YWluZXJcbiAqICAgIC0geExhYmVsLCB5TGFiZWwsIHpMYWJlbCwgdGV4dCwgYW5kIG5hbWU6XG4gKiAgICAgIGluZm8gdG8gZ28gaW4gdGhlIGxhYmVsXG4gKiAgICAtIGNvbG9yOlxuICogICAgICB0aGUgYmFja2dyb3VuZCBjb2xvciBmb3IgdGhlIGxhYmVsLlxuICogICAgLSBpZGVhbEFsaWduIChvcHRpb25hbCk6XG4gKiAgICAgICdsZWZ0JyBvciAncmlnaHQnIGZvciB3aGljaCBzaWRlIG9mIHRoZSB4L3kgYm94IHRvIHRyeSB0byBwdXQgdGhpcyBvbiBmaXJzdFxuICogICAgLSBib3JkZXJDb2xvciAob3B0aW9uYWwpOlxuICogICAgICBjb2xvciBmb3IgdGhlIGJvcmRlciwgZGVmYXVsdHMgdG8gc3Ryb25nZXN0IGNvbnRyYXN0IHdpdGggY29sb3JcbiAqICAgIC0gZm9udEZhbWlseSAob3B0aW9uYWwpOlxuICogICAgICBzdHJpbmcsIHRoZSBmb250IGZvciB0aGlzIGxhYmVsLCBkZWZhdWx0cyB0byBjb25zdGFudHMuSE9WRVJGT05UXG4gKiAgICAtIGZvbnRTaXplIChvcHRpb25hbCk6XG4gKiAgICAgIHRoZSBsYWJlbCBmb250IHNpemUsIGRlZmF1bHRzIHRvIGNvbnN0YW50cy5IT1ZFUkZPTlRTSVpFXG4gKiAgICAtIGZvbnRDb2xvciAob3B0aW9uYWwpOlxuICogICAgICBkZWZhdWx0cyB0byBib3JkZXJDb2xvclxuICogb3B0cyBzaG91bGQgaGF2ZSBrZXlzOlxuICogICAgLSBiZ0NvbG9yOlxuICogICAgICB0aGUgYmFja2dyb3VuZCBjb2xvciB0aGlzIGlzIGFnYWluc3QsIHVzZWQgaWYgdGhlIHRyYWNlIGlzXG4gKiAgICAgIG5vbi1vcGFxdWUsIGFuZCBmb3IgdGhlIG5hbWUsIHdoaWNoIGdvZXMgb3V0c2lkZSB0aGUgYm94XG4gKiAgICAtIGNvbnRhaW5lcjpcbiAqICAgICAgYSA8c3ZnPiBvciA8Zz4gZWxlbWVudCB0byBhZGQgdGhlIGhvdmVyIGxhYmVsIHRvXG4gKiAgICAtIG91dGVyQ29udGFpbmVyOlxuICogICAgICBub3JtYWxseSBhIHBhcmVudCBvZiBgY29udGFpbmVyYCwgc2V0cyB0aGUgYm91bmRpbmcgYm94IHRvIHVzZSB0b1xuICogICAgICBjb25zdHJhaW4gdGhlIGhvdmVyIGxhYmVsIGFuZCBkZXRlcm1pbmUgd2hldGhlciB0byBzaG93IGl0IG9uIHRoZSBsZWZ0IG9yIHJpZ2h0XG4gKiBvcHRzIGNhbiBoYXZlIG9wdGlvbmFsIGtleXM6XG4gKiAgICAtIGFuY2hvckluZGV4OlxuICAgICAgICB0aGUgaW5kZXggb2YgdGhlIGhvdmVyIGl0ZW0gdXNlZCBhcyBhbiBhbmNob3IgZm9yIHBvc2l0aW9uaW5nLlxuICAgICAgICBUaGUgb3RoZXIgaG92ZXIgaXRlbXMgd2lsbCBiZSBwdXNoZWQgdXAgb3IgZG93biB0byBwcmV2ZW50IG92ZXJsYXAuXG4gKi9cbmV4cG9ydHMubG9uZUhvdmVyID0gZnVuY3Rpb24gbG9uZUhvdmVyKGhvdmVySXRlbXMsIG9wdHMpIHtcbiAgICB2YXIgbXVsdGlIb3ZlciA9IHRydWU7XG4gICAgaWYoIUFycmF5LmlzQXJyYXkoaG92ZXJJdGVtcykpIHtcbiAgICAgICAgbXVsdGlIb3ZlciA9IGZhbHNlO1xuICAgICAgICBob3Zlckl0ZW1zID0gW2hvdmVySXRlbXNdO1xuICAgIH1cblxuICAgIHZhciBwb2ludHNEYXRhID0gaG92ZXJJdGVtcy5tYXAoZnVuY3Rpb24oaG92ZXJJdGVtKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogaG92ZXJJdGVtLmNvbG9yIHx8IENvbG9yLmRlZmF1bHRMaW5lLFxuICAgICAgICAgICAgeDA6IGhvdmVySXRlbS54MCB8fCBob3Zlckl0ZW0ueCB8fCAwLFxuICAgICAgICAgICAgeDE6IGhvdmVySXRlbS54MSB8fCBob3Zlckl0ZW0ueCB8fCAwLFxuICAgICAgICAgICAgeTA6IGhvdmVySXRlbS55MCB8fCBob3Zlckl0ZW0ueSB8fCAwLFxuICAgICAgICAgICAgeTE6IGhvdmVySXRlbS55MSB8fCBob3Zlckl0ZW0ueSB8fCAwLFxuICAgICAgICAgICAgeExhYmVsOiBob3Zlckl0ZW0ueExhYmVsLFxuICAgICAgICAgICAgeUxhYmVsOiBob3Zlckl0ZW0ueUxhYmVsLFxuICAgICAgICAgICAgekxhYmVsOiBob3Zlckl0ZW0uekxhYmVsLFxuICAgICAgICAgICAgdGV4dDogaG92ZXJJdGVtLnRleHQsXG4gICAgICAgICAgICBuYW1lOiBob3Zlckl0ZW0ubmFtZSxcbiAgICAgICAgICAgIGlkZWFsQWxpZ246IGhvdmVySXRlbS5pZGVhbEFsaWduLFxuXG4gICAgICAgICAgICAvLyBvcHRpb25hbCBleHRyYSBiaXRzIG9mIHN0eWxpbmdcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiBob3Zlckl0ZW0uYm9yZGVyQ29sb3IsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBob3Zlckl0ZW0uZm9udEZhbWlseSxcbiAgICAgICAgICAgIGZvbnRTaXplOiBob3Zlckl0ZW0uZm9udFNpemUsXG4gICAgICAgICAgICBmb250Q29sb3I6IGhvdmVySXRlbS5mb250Q29sb3IsXG4gICAgICAgICAgICBuYW1lTGVuZ3RoOiBob3Zlckl0ZW0ubmFtZUxlbmd0aCxcbiAgICAgICAgICAgIHRleHRBbGlnbjogaG92ZXJJdGVtLnRleHRBbGlnbixcblxuICAgICAgICAgICAgLy8gZmlsbGVyIHRvIG1ha2UgY3JlYXRlSG92ZXJUZXh0IGhhcHB5XG4gICAgICAgICAgICB0cmFjZTogaG92ZXJJdGVtLnRyYWNlIHx8IHtcbiAgICAgICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgICAgICBob3ZlcmluZm86ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeGE6IHtfb2Zmc2V0OiAwfSxcbiAgICAgICAgICAgIHlhOiB7X29mZnNldDogMH0sXG4gICAgICAgICAgICBpbmRleDogMCxcblxuICAgICAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJJdGVtLmhvdmVydGVtcGxhdGUgfHwgZmFsc2UsXG4gICAgICAgICAgICBldmVudERhdGE6IGhvdmVySXRlbS5ldmVudERhdGEgfHwgZmFsc2UsXG4gICAgICAgICAgICBob3ZlcnRlbXBsYXRlTGFiZWxzOiBob3Zlckl0ZW0uaG92ZXJ0ZW1wbGF0ZUxhYmVscyB8fCBmYWxzZSxcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIHZhciBjb250YWluZXIzID0gZDMuc2VsZWN0KG9wdHMuY29udGFpbmVyKTtcbiAgICB2YXIgb3V0ZXJDb250YWluZXIzID0gb3B0cy5vdXRlckNvbnRhaW5lciA/IGQzLnNlbGVjdChvcHRzLm91dGVyQ29udGFpbmVyKSA6IGNvbnRhaW5lcjM7XG5cbiAgICB2YXIgZnVsbE9wdHMgPSB7XG4gICAgICAgIGhvdmVybW9kZTogJ2Nsb3Nlc3QnLFxuICAgICAgICByb3RhdGVMYWJlbHM6IGZhbHNlLFxuICAgICAgICBiZ0NvbG9yOiBvcHRzLmJnQ29sb3IgfHwgQ29sb3IuYmFja2dyb3VuZCxcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIzLFxuICAgICAgICBvdXRlckNvbnRhaW5lcjogb3V0ZXJDb250YWluZXIzXG4gICAgfTtcblxuICAgIHZhciBob3ZlckxhYmVsID0gY3JlYXRlSG92ZXJUZXh0KHBvaW50c0RhdGEsIGZ1bGxPcHRzLCBvcHRzLmdkKTtcblxuICAgIC8vIEZpeCB2ZXJ0aWNhbCBvdmVybGFwXG4gICAgdmFyIHRvb2x0aXBTcGFjaW5nID0gNTtcbiAgICB2YXIgbGFzdEJvdHRvbVkgPSAwO1xuICAgIHZhciBhbmNob3IgPSAwO1xuICAgIGhvdmVyTGFiZWxcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24oYSwgYikge3JldHVybiBhLnkwIC0gYi55MDt9KVxuICAgICAgICAuZWFjaChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICB2YXIgdG9wWSA9IGQueTAgLSBkLmJ5IC8gMjtcblxuICAgICAgICAgICAgaWYoKHRvcFkgLSB0b29sdGlwU3BhY2luZykgPCBsYXN0Qm90dG9tWSkge1xuICAgICAgICAgICAgICAgIGQub2Zmc2V0ID0gKGxhc3RCb3R0b21ZIC0gdG9wWSkgKyB0b29sdGlwU3BhY2luZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZC5vZmZzZXQgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYXN0Qm90dG9tWSA9IHRvcFkgKyBkLmJ5ICsgZC5vZmZzZXQ7XG5cbiAgICAgICAgICAgIGlmKGkgPT09IG9wdHMuYW5jaG9ySW5kZXggfHwgMCkgYW5jaG9yID0gZC5vZmZzZXQ7XG4gICAgICAgIH0pXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGQub2Zmc2V0IC09IGFuY2hvcjtcbiAgICAgICAgfSk7XG5cbiAgICBhbGlnbkhvdmVyVGV4dChob3ZlckxhYmVsLCBmdWxsT3B0cy5yb3RhdGVMYWJlbHMpO1xuXG4gICAgcmV0dXJuIG11bHRpSG92ZXIgPyBob3ZlckxhYmVsIDogaG92ZXJMYWJlbC5ub2RlKCk7XG59O1xuXG4vLyBUaGUgYWN0dWFsIGltcGxlbWVudGF0aW9uIGlzIGhlcmU6XG5mdW5jdGlvbiBfaG92ZXIoZ2QsIGV2dCwgc3VicGxvdCwgbm9Ib3ZlckV2ZW50KSB7XG4gICAgaWYoIXN1YnBsb3QpIHN1YnBsb3QgPSAneHknO1xuXG4gICAgLy8gaWYgdGhlIHVzZXIgcGFzc2VkIGluIGFuIGFycmF5IG9mIHN1YnBsb3RzLFxuICAgIC8vIHVzZSB0aG9zZSBpbnN0ZWFkIG9mIGZpbmRpbmcgb3ZlcmxheWVkIHBsb3RzXG4gICAgdmFyIHN1YnBsb3RzID0gQXJyYXkuaXNBcnJheShzdWJwbG90KSA/IHN1YnBsb3QgOiBbc3VicGxvdF07XG5cbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBwbG90cyA9IGZ1bGxMYXlvdXQuX3Bsb3RzIHx8IFtdO1xuICAgIHZhciBwbG90aW5mbyA9IHBsb3RzW3N1YnBsb3RdO1xuICAgIHZhciBoYXNDYXJ0ZXNpYW4gPSBmdWxsTGF5b3V0Ll9oYXMoJ2NhcnRlc2lhbicpO1xuXG4gICAgLy8gbGlzdCBvZiBhbGwgb3ZlcmxhaWQgc3VicGxvdHMgdG8gbG9vayBhdFxuICAgIGlmKHBsb3RpbmZvKSB7XG4gICAgICAgIHZhciBvdmVybGF5ZWRTdWJwbG90cyA9IHBsb3RpbmZvLm92ZXJsYXlzLm1hcChmdW5jdGlvbihwaSkge1xuICAgICAgICAgICAgcmV0dXJuIHBpLmlkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdWJwbG90cyA9IHN1YnBsb3RzLmNvbmNhdChvdmVybGF5ZWRTdWJwbG90cyk7XG4gICAgfVxuXG4gICAgdmFyIGxlbiA9IHN1YnBsb3RzLmxlbmd0aDtcbiAgICB2YXIgeGFBcnJheSA9IG5ldyBBcnJheShsZW4pO1xuICAgIHZhciB5YUFycmF5ID0gbmV3IEFycmF5KGxlbik7XG4gICAgdmFyIHN1cHBvcnRzQ29tcGFyZSA9IGZhbHNlO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBzcElkID0gc3VicGxvdHNbaV07XG5cbiAgICAgICAgaWYocGxvdHNbc3BJZF0pIHtcbiAgICAgICAgICAgIC8vICdjYXJ0ZXNpYW4nIGNhc2VcbiAgICAgICAgICAgIHN1cHBvcnRzQ29tcGFyZSA9IHRydWU7XG4gICAgICAgICAgICB4YUFycmF5W2ldID0gcGxvdHNbc3BJZF0ueGF4aXM7XG4gICAgICAgICAgICB5YUFycmF5W2ldID0gcGxvdHNbc3BJZF0ueWF4aXM7XG4gICAgICAgIH0gZWxzZSBpZihmdWxsTGF5b3V0W3NwSWRdICYmIGZ1bGxMYXlvdXRbc3BJZF0uX3N1YnBsb3QpIHtcbiAgICAgICAgICAgIC8vIG90aGVyIHN1YnBsb3QgdHlwZXNcbiAgICAgICAgICAgIHZhciBfc3VicGxvdCA9IGZ1bGxMYXlvdXRbc3BJZF0uX3N1YnBsb3Q7XG4gICAgICAgICAgICB4YUFycmF5W2ldID0gX3N1YnBsb3QueGF4aXM7XG4gICAgICAgICAgICB5YUFycmF5W2ldID0gX3N1YnBsb3QueWF4aXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMaWIud2FybignVW5yZWNvZ25pemVkIHN1YnBsb3Q6ICcgKyBzcElkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBob3Zlcm1vZGUgPSBldnQuaG92ZXJtb2RlIHx8IGZ1bGxMYXlvdXQuaG92ZXJtb2RlO1xuXG4gICAgaWYoaG92ZXJtb2RlICYmICFzdXBwb3J0c0NvbXBhcmUpIGhvdmVybW9kZSA9ICdjbG9zZXN0JztcblxuICAgIGlmKFsneCcsICd5JywgJ2Nsb3Nlc3QnLCAneCB1bmlmaWVkJywgJ3kgdW5pZmllZCddLmluZGV4T2YoaG92ZXJtb2RlKSA9PT0gLTEgfHwgIWdkLmNhbGNkYXRhIHx8XG4gICAgICAgICAgICBnZC5xdWVyeVNlbGVjdG9yKCcuem9vbWJveCcpIHx8IGdkLl9kcmFnZ2luZykge1xuICAgICAgICByZXR1cm4gZHJhZ0VsZW1lbnQudW5ob3ZlclJhdyhnZCwgZXZ0KTtcbiAgICB9XG5cbiAgICB2YXIgaG92ZXJkaXN0YW5jZSA9IGZ1bGxMYXlvdXQuaG92ZXJkaXN0YW5jZSA9PT0gLTEgPyBJbmZpbml0eSA6IGZ1bGxMYXlvdXQuaG92ZXJkaXN0YW5jZTtcbiAgICB2YXIgc3Bpa2VkaXN0YW5jZSA9IGZ1bGxMYXlvdXQuc3Bpa2VkaXN0YW5jZSA9PT0gLTEgPyBJbmZpbml0eSA6IGZ1bGxMYXlvdXQuc3Bpa2VkaXN0YW5jZTtcblxuICAgIC8vIGhvdmVyRGF0YTogdGhlIHNldCBvZiBjYW5kaWRhdGUgcG9pbnRzIHdlJ3ZlIGZvdW5kIHRvIGhpZ2hsaWdodFxuICAgIHZhciBob3ZlckRhdGEgPSBbXTtcblxuICAgIC8vIHNlYXJjaERhdGE6IHRoZSBkYXRhIHRvIHNlYXJjaCBpbi4gTW9zdGx5IHRoaXMgaXMganVzdCBhIGNvcHkgb2ZcbiAgICAvLyBnZC5jYWxjZGF0YSwgZmlsdGVyZWQgdG8gdGhlIHN1YnBsb3QgYW5kIG92ZXJsYXlzIHdlJ3JlIG9uXG4gICAgLy8gYnV0IGlmIGEgcG9pbnQgYXJyYXkgaXMgc3VwcGxpZWQgaXQgd2lsbCBiZSBhIG1hcHBpbmdcbiAgICAvLyBvZiBpbmRpY2F0ZWQgY3VydmVzXG4gICAgdmFyIHNlYXJjaERhdGEgPSBbXTtcblxuICAgIC8vIFt4fHlddmFsQXJyYXk6IHRoZSBheGlzIHZhbHVlcyBvZiB0aGUgaG92ZXIgZXZlbnRcbiAgICAvLyBtYXBwZWQgb250byBlYWNoIG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgb3ZlcmxhaWQgc3VicGxvdHNcbiAgICB2YXIgeHZhbEFycmF5LCB5dmFsQXJyYXk7XG5cbiAgICB2YXIgaXRlbW51bSwgY3VydmVudW0sIGNkLCB0cmFjZSwgc3VicGxvdElkLCBzdWJwbG90aSwgbW9kZSxcbiAgICAgICAgeHZhbCwgeXZhbCwgcG9pbnREYXRhLCBjbG9zZWRhdGFQcmV2aW91c0xlbmd0aDtcblxuICAgIC8vIHNwaWtlUG9pbnRzOiB0aGUgc2V0IG9mIGNhbmRpZGF0ZSBwb2ludHMgd2UndmUgZm91bmQgdG8gZHJhdyBzcGlrZXMgdG9cbiAgICB2YXIgc3Bpa2VQb2ludHMgPSB7XG4gICAgICAgIGhMaW5lUG9pbnQ6IG51bGwsXG4gICAgICAgIHZMaW5lUG9pbnQ6IG51bGxcbiAgICB9O1xuXG4gICAgLy8gZG9lcyBzdWJwbG90IGhhdmUgb25lIChvciBtb3JlKSBob3Jpem9udGFsIHRyYWNlcz9cbiAgICAvLyBUaGlzIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgd2Ugcm90YXRlIHRoZSBsYWJlbHMgb3Igbm90XG4gICAgdmFyIGhhc09uZUhvcml6b250YWxUcmFjZSA9IGZhbHNlO1xuXG4gICAgLy8gRmlndXJlIG91dCB3aGF0IHdlJ3JlIGhvdmVyaW5nIG9uOlxuICAgIC8vIG1vdXNlIGxvY2F0aW9uIG9yIHVzZXItc3VwcGxpZWQgZGF0YVxuXG4gICAgaWYoQXJyYXkuaXNBcnJheShldnQpKSB7XG4gICAgICAgIC8vIHVzZXIgc3BlY2lmaWVkIGFuIGFycmF5IG9mIHBvaW50cyB0byBoaWdobGlnaHRcbiAgICAgICAgaG92ZXJtb2RlID0gJ2FycmF5JztcbiAgICAgICAgZm9yKGl0ZW1udW0gPSAwOyBpdGVtbnVtIDwgZXZ0Lmxlbmd0aDsgaXRlbW51bSsrKSB7XG4gICAgICAgICAgICBjZCA9IGdkLmNhbGNkYXRhW2V2dFtpdGVtbnVtXS5jdXJ2ZU51bWJlciB8fCAwXTtcbiAgICAgICAgICAgIGlmKGNkKSB7XG4gICAgICAgICAgICAgICAgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICAgICAgICAgICAgICBpZihjZFswXS50cmFjZS5ob3ZlcmluZm8gIT09ICdza2lwJykge1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hEYXRhLnB1c2goY2QpO1xuICAgICAgICAgICAgICAgICAgICBpZih0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNPbmVIb3Jpem9udGFsVHJhY2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKGN1cnZlbnVtID0gMDsgY3VydmVudW0gPCBnZC5jYWxjZGF0YS5sZW5ndGg7IGN1cnZlbnVtKyspIHtcbiAgICAgICAgICAgIGNkID0gZ2QuY2FsY2RhdGFbY3VydmVudW1dO1xuICAgICAgICAgICAgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICAgICAgICAgIGlmKHRyYWNlLmhvdmVyaW5mbyAhPT0gJ3NraXAnICYmIGhlbHBlcnMuaXNUcmFjZUluU3VicGxvdHModHJhY2UsIHN1YnBsb3RzKSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEucHVzaChjZCk7XG4gICAgICAgICAgICAgICAgaWYodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICAgICAgICAgICAgICBoYXNPbmVIb3Jpem9udGFsVHJhY2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFt4fHldcHg6IHRoZSBwaXhlbHMgKGZyb20gdG9wIGxlZnQpIG9mIHRoZSBtb3VzZSBsb2NhdGlvblxuICAgICAgICAvLyBvbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHBsb3QgYXJlYVxuICAgICAgICAvLyBhZGQgcG9pbnRlclh8WSBwcm9wZXJ0eSBmb3IgZHJhd2luZyB0aGUgc3Bpa2VzIGluIHNwaWtlc25hcCAnY3Vyc29yJyBzaXR1YXRpb25cbiAgICAgICAgdmFyIGhhc1VzZXJDYWxsZWRIb3ZlciA9ICFldnQudGFyZ2V0O1xuICAgICAgICB2YXIgeHB4LCB5cHg7XG5cbiAgICAgICAgaWYoaGFzVXNlckNhbGxlZEhvdmVyKSB7XG4gICAgICAgICAgICBpZigneHB4JyBpbiBldnQpIHhweCA9IGV2dC54cHg7XG4gICAgICAgICAgICBlbHNlIHhweCA9IHhhQXJyYXlbMF0uX2xlbmd0aCAvIDI7XG5cbiAgICAgICAgICAgIGlmKCd5cHgnIGluIGV2dCkgeXB4ID0gZXZ0LnlweDtcbiAgICAgICAgICAgIGVsc2UgeXB4ID0geWFBcnJheVswXS5fbGVuZ3RoIC8gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGZpcmUgdGhlIGJlZm9yZWhvdmVyIGV2ZW50IGFuZCBxdWl0IGlmIGl0IHJldHVybnMgZmFsc2VcbiAgICAgICAgICAgIC8vIG5vdGUgdGhhdCB3ZSdyZSBvbmx5IGNhbGxpbmcgdGhpcyBvbiByZWFsIG1vdXNlIGV2ZW50cywgc29cbiAgICAgICAgICAgIC8vIG1hbnVhbCBjYWxscyB0byBmeC5ob3ZlciB3aWxsIGFsd2F5cyBydW4uXG4gICAgICAgICAgICBpZihFdmVudHMudHJpZ2dlckhhbmRsZXIoZ2QsICdwbG90bHlfYmVmb3JlaG92ZXInLCBldnQpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRiYiA9IGV2dC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgIHhweCA9IGV2dC5jbGllbnRYIC0gZGJiLmxlZnQ7XG4gICAgICAgICAgICB5cHggPSBldnQuY2xpZW50WSAtIGRiYi50b3A7XG5cbiAgICAgICAgICAgIC8vIGluIGNhc2UgaG92ZXIgd2FzIGNhbGxlZCBmcm9tIG1vdXNlb3V0IGludG8gaG92ZXJ0ZXh0LFxuICAgICAgICAgICAgLy8gaXQncyBwb3NzaWJsZSB5b3UncmUgbm90IGFjdHVhbGx5IG92ZXIgdGhlIHBsb3QgYW55bW9yZVxuICAgICAgICAgICAgaWYoeHB4IDwgMCB8fCB4cHggPiB4YUFycmF5WzBdLl9sZW5ndGggfHwgeXB4IDwgMCB8fCB5cHggPiB5YUFycmF5WzBdLl9sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZHJhZ0VsZW1lbnQudW5ob3ZlclJhdyhnZCwgZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2dC5wb2ludGVyWCA9IHhweCArIHhhQXJyYXlbMF0uX29mZnNldDtcbiAgICAgICAgZXZ0LnBvaW50ZXJZID0geXB4ICsgeWFBcnJheVswXS5fb2Zmc2V0O1xuXG4gICAgICAgIGlmKCd4dmFsJyBpbiBldnQpIHh2YWxBcnJheSA9IGhlbHBlcnMuZmxhdChzdWJwbG90cywgZXZ0Lnh2YWwpO1xuICAgICAgICBlbHNlIHh2YWxBcnJheSA9IGhlbHBlcnMucDJjKHhhQXJyYXksIHhweCk7XG5cbiAgICAgICAgaWYoJ3l2YWwnIGluIGV2dCkgeXZhbEFycmF5ID0gaGVscGVycy5mbGF0KHN1YnBsb3RzLCBldnQueXZhbCk7XG4gICAgICAgIGVsc2UgeXZhbEFycmF5ID0gaGVscGVycy5wMmMoeWFBcnJheSwgeXB4KTtcblxuICAgICAgICBpZighaXNOdW1lcmljKHh2YWxBcnJheVswXSkgfHwgIWlzTnVtZXJpYyh5dmFsQXJyYXlbMF0pKSB7XG4gICAgICAgICAgICBMaWIud2FybignRnguaG92ZXIgZmFpbGVkJywgZXZ0LCBnZCk7XG4gICAgICAgICAgICByZXR1cm4gZHJhZ0VsZW1lbnQudW5ob3ZlclJhdyhnZCwgZXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoZSBwaXhlbCBkaXN0YW5jZSB0byBiZWF0IGFzIGEgbWF0Y2hpbmcgcG9pbnRcbiAgICAvLyBpbiAneCcgb3IgJ3knIG1vZGUgdGhpcyByZXNldHMgZm9yIGVhY2ggdHJhY2VcbiAgICB2YXIgZGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgIC8vIGZpbmQgdGhlIGNsb3Nlc3QgcG9pbnQgaW4gZWFjaCB0cmFjZVxuICAgIC8vIHRoaXMgaXMgbWluaW11bSBkeCBhbmQvb3IgZHksIGRlcGVuZGluZyBvbiBtb2RlXG4gICAgLy8gYW5kIHRoZSBwaXhlbCBwb3NpdGlvbiBmb3IgdGhlIGxhYmVsIChsYWJlbFhweCwgbGFiZWxZcHgpXG4gICAgZnVuY3Rpb24gZmluZEhvdmVyUG9pbnRzKGN1c3RvbVhWYWwsIGN1c3RvbVlWYWwpIHtcbiAgICAgICAgZm9yKGN1cnZlbnVtID0gMDsgY3VydmVudW0gPCBzZWFyY2hEYXRhLmxlbmd0aDsgY3VydmVudW0rKykge1xuICAgICAgICAgICAgY2QgPSBzZWFyY2hEYXRhW2N1cnZlbnVtXTtcblxuICAgICAgICAgICAgLy8gZmlsdGVyIG91dCBpbnZpc2libGUgb3IgYnJva2VuIGRhdGFcbiAgICAgICAgICAgIGlmKCFjZCB8fCAhY2RbMF0gfHwgIWNkWzBdLnRyYWNlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgdHJhY2UgPSBjZFswXS50cmFjZTtcblxuICAgICAgICAgICAgaWYodHJhY2UudmlzaWJsZSAhPT0gdHJ1ZSB8fCB0cmFjZS5fbGVuZ3RoID09PSAwKSBjb250aW51ZTtcblxuICAgICAgICAgICAgLy8gRXhwbGljaXRseSBiYWlsIG91dCBmb3IgdGhlc2UgdHdvLiBJIGRvbid0IGtub3cgaG93IHRvIG90aGVyd2lzZSBwcmV2ZW50XG4gICAgICAgICAgICAvLyB0aGUgcmVzdCBvZiB0aGlzIGZ1bmN0aW9uIGZyb20gcnVubmluZyBhbmQgZmFpbGluZ1xuICAgICAgICAgICAgaWYoWydjYXJwZXQnLCAnY29udG91cmNhcnBldCddLmluZGV4T2YodHJhY2UuX21vZHVsZS5uYW1lKSAhPT0gLTEpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZih0cmFjZS50eXBlID09PSAnc3Bsb20nKSB7XG4gICAgICAgICAgICAgICAgLy8gc3Bsb20gdHJhY2VzIGRvIG5vdCBnZW5lcmF0ZSBvdmVybGF5IHN1YnBsb3RzLFxuICAgICAgICAgICAgICAgIC8vIGl0IGlzIHNhZmUgdG8gYXNzdW1lIGhlcmUgc3Bsb20gdHJhY2VzIGNvcnJlc3BvbmQgdG8gdGhlIDB0aCBzdWJwbG90XG4gICAgICAgICAgICAgICAgc3VicGxvdGkgPSAwO1xuICAgICAgICAgICAgICAgIHN1YnBsb3RJZCA9IHN1YnBsb3RzW3N1YnBsb3RpXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VicGxvdElkID0gaGVscGVycy5nZXRTdWJwbG90KHRyYWNlKTtcbiAgICAgICAgICAgICAgICBzdWJwbG90aSA9IHN1YnBsb3RzLmluZGV4T2Yoc3VicGxvdElkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gd2l0aGluIG9uZSB0cmFjZSBtb2RlIGNhbiBzb21ldGltZXMgYmUgb3ZlcnJpZGRlblxuICAgICAgICAgICAgbW9kZSA9IGhvdmVybW9kZTtcbiAgICAgICAgICAgIGlmKGhlbHBlcnMuaXNVbmlmaWVkSG92ZXIobW9kZSkpIHtcbiAgICAgICAgICAgICAgICBtb2RlID0gbW9kZS5jaGFyQXQoMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbnRhaW5lciBmb3IgbmV3IHBvaW50LCBhbHNvIHVzZWQgdG8gcGFzcyBpbmZvIGludG8gbW9kdWxlLmhvdmVyUG9pbnRzXG4gICAgICAgICAgICBwb2ludERhdGEgPSB7XG4gICAgICAgICAgICAgICAgLy8gdHJhY2UgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgIGNkOiBjZCxcbiAgICAgICAgICAgICAgICB0cmFjZTogdHJhY2UsXG4gICAgICAgICAgICAgICAgeGE6IHhhQXJyYXlbc3VicGxvdGldLFxuICAgICAgICAgICAgICAgIHlhOiB5YUFycmF5W3N1YnBsb3RpXSxcblxuICAgICAgICAgICAgICAgIC8vIG1heCBkaXN0YW5jZXMgZm9yIGhvdmVyIGFuZCBzcGlrZXMgLSBmb3IgcG9pbnRzIHRoYXQgd2FudCB0byBzaG93IGJ1dCBkbyBub3RcbiAgICAgICAgICAgICAgICAvLyB3YW50IHRvIG92ZXJyaWRlIG90aGVyIHBvaW50cywgc2V0IGRpc3RhbmNlL3NwaWtlRGlzdGFuY2UgZXF1YWwgdG8gbWF4KkRpc3RhbmNlXG4gICAgICAgICAgICAgICAgLy8gYW5kIGl0IHdpbGwgbm90IGdldCBmaWx0ZXJlZCBvdXQgYnV0IGl0IHdpbGwgYmUgZ3VhcmFudGVlZCB0byBoYXZlIGEgZ3JlYXRlclxuICAgICAgICAgICAgICAgIC8vIGRpc3RhbmNlIHRoYW4gYW55IHBvaW50IHRoYXQgY2FsY3VsYXRlZCBhIHJlYWwgZGlzdGFuY2UuXG4gICAgICAgICAgICAgICAgbWF4SG92ZXJEaXN0YW5jZTogaG92ZXJkaXN0YW5jZSxcbiAgICAgICAgICAgICAgICBtYXhTcGlrZURpc3RhbmNlOiBzcGlrZWRpc3RhbmNlLFxuXG4gICAgICAgICAgICAgICAgLy8gcG9pbnQgcHJvcGVydGllcyAtIG92ZXJyaWRlIGFsbCBvZiB0aGVzZVxuICAgICAgICAgICAgICAgIGluZGV4OiBmYWxzZSwgLy8gcG9pbnQgaW5kZXggaW4gdHJhY2UgLSBvbmx5IHVzZWQgYnkgcGxvdGx5LmpzIGhvdmVyZGF0YSBjb25zdW1lcnNcbiAgICAgICAgICAgICAgICBkaXN0YW5jZTogTWF0aC5taW4oZGlzdGFuY2UsIGhvdmVyZGlzdGFuY2UpLCAvLyBwaXhlbCBkaXN0YW5jZSBvciBwc2V1ZG8tZGlzdGFuY2VcblxuICAgICAgICAgICAgICAgIC8vIGRpc3RhbmNlL3BzZXVkby1kaXN0YW5jZSBmb3Igc3Bpa2VzLiBUaGlzIGRpc3RhbmNlIHNob3VsZCBhbHdheXMgYmUgY2FsY3VsYXRlZFxuICAgICAgICAgICAgICAgIC8vIGFzIGlmIGluIFwiY2xvc2VzdFwiIG1vZGUsIGFuZCBzaG91bGQgb25seSBiZSBzZXQgaWYgdGhpcyBwb2ludCBzaG91bGRcbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBhIHNwaWtlLlxuICAgICAgICAgICAgICAgIHNwaWtlRGlzdGFuY2U6IEluZmluaXR5LFxuXG4gICAgICAgICAgICAgICAgLy8gaW4gc29tZSBjYXNlcyB0aGUgc3Bpa2VzIGhhdmUgZGlmZmVyZW50IHBvc2l0aW9uaW5nIGZyb20gdGhlIGhvdmVyIGxhYmVsXG4gICAgICAgICAgICAgICAgLy8gdGhleSBkb24ndCBuZWVkIHgwL3gxLCBqdXN0IG9uZSBwb3NpdGlvblxuICAgICAgICAgICAgICAgIHhTcGlrZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHlTcGlrZTogdW5kZWZpbmVkLFxuXG4gICAgICAgICAgICAgICAgLy8gd2hlcmUgYW5kIGhvdyB0byBkaXNwbGF5IHRoZSBob3ZlciBsYWJlbFxuICAgICAgICAgICAgICAgIGNvbG9yOiBDb2xvci5kZWZhdWx0TGluZSwgLy8gdHJhY2UgY29sb3JcbiAgICAgICAgICAgICAgICBuYW1lOiB0cmFjZS5uYW1lLFxuICAgICAgICAgICAgICAgIHgwOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgeDE6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB5MDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHkxOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgeExhYmVsVmFsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgeUxhYmVsVmFsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgekxhYmVsVmFsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdGV4dDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBhZGQgcmVmIHRvIHN1YnBsb3Qgb2JqZWN0IChub24tY2FydGVzaWFuIGNhc2UpXG4gICAgICAgICAgICBpZihmdWxsTGF5b3V0W3N1YnBsb3RJZF0pIHtcbiAgICAgICAgICAgICAgICBwb2ludERhdGEuc3VicGxvdCA9IGZ1bGxMYXlvdXRbc3VicGxvdElkXS5fc3VicGxvdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkZCByZWYgdG8gc3Bsb20gc2NlbmVcbiAgICAgICAgICAgIGlmKGZ1bGxMYXlvdXQuX3NwbG9tU2NlbmVzICYmIGZ1bGxMYXlvdXQuX3NwbG9tU2NlbmVzW3RyYWNlLnVpZF0pIHtcbiAgICAgICAgICAgICAgICBwb2ludERhdGEuc2NlbmUgPSBmdWxsTGF5b3V0Ll9zcGxvbVNjZW5lc1t0cmFjZS51aWRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbG9zZWRhdGFQcmV2aW91c0xlbmd0aCA9IGhvdmVyRGF0YS5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIGZvciBhIGhpZ2hsaWdodGluZyBhcnJheSwgZmlndXJlIG91dCB3aGF0XG4gICAgICAgICAgICAvLyB3ZSdyZSBzZWFyY2hpbmcgZm9yIHdpdGggdGhpcyBlbGVtZW50XG4gICAgICAgICAgICBpZihtb2RlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGV2dFtjdXJ2ZW51bV07XG4gICAgICAgICAgICAgICAgaWYoJ3BvaW50TnVtYmVyJyBpbiBzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnREYXRhLmluZGV4ID0gc2VsZWN0aW9uLnBvaW50TnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICBtb2RlID0gJ2Nsb3Nlc3QnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYoJ3h2YWwnIGluIHNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgeHZhbCA9IHNlbGVjdGlvbi54dmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9ICd4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZigneXZhbCcgaW4gc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5dmFsID0gc2VsZWN0aW9uLnl2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gbW9kZSA/ICdjbG9zZXN0JyA6ICd5JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZihjdXN0b21YVmFsICE9PSB1bmRlZmluZWQgJiYgY3VzdG9tWVZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgeHZhbCA9IGN1c3RvbVhWYWw7XG4gICAgICAgICAgICAgICAgeXZhbCA9IGN1c3RvbVlWYWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHh2YWwgPSB4dmFsQXJyYXlbc3VicGxvdGldO1xuICAgICAgICAgICAgICAgIHl2YWwgPSB5dmFsQXJyYXlbc3VicGxvdGldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBOb3cgaWYgdGhlcmUgaXMgcmFuZ2UgdG8gbG9vayBpbiwgZmluZCB0aGUgcG9pbnRzIHRvIGhvdmVyLlxuICAgICAgICAgICAgaWYoaG92ZXJkaXN0YW5jZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmKHRyYWNlLl9tb2R1bGUgJiYgdHJhY2UuX21vZHVsZS5ob3ZlclBvaW50cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UG9pbnRzID0gdHJhY2UuX21vZHVsZS5ob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIG1vZGUsIGZ1bGxMYXlvdXQuX2hvdmVybGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZihuZXdQb2ludHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgbmV3UG9pbnROdW0gPSAwOyBuZXdQb2ludE51bSA8IG5ld1BvaW50cy5sZW5ndGg7IG5ld1BvaW50TnVtKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb2ludCA9IG5ld1BvaW50c1tuZXdQb2ludE51bV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNOdW1lcmljKG5ld1BvaW50LngwKSAmJiBpc051bWVyaWMobmV3UG9pbnQueTApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVyRGF0YS5wdXNoKGNsZWFuUG9pbnQobmV3UG9pbnQsIGhvdmVybW9kZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIExpYi5sb2coJ1VucmVjb2duaXplZCB0cmFjZSB0eXBlIGluIGhvdmVyOicsIHRyYWNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGluIGNsb3Nlc3QgbW9kZSwgcmVtb3ZlIGFueSBleGlzdGluZyAoZmFydGhlcikgcG9pbnRzXG4gICAgICAgICAgICAvLyBhbmQgZG9uJ3QgbG9vayBhbnkgZmFydGhlciB0aGFuIHRoaXMgbGF0ZXN0IHBvaW50IChvciBwb2ludHMsIHNvbWVcbiAgICAgICAgICAgIC8vIHRyYWNlcyBsaWtlIGJveCAmIHZpb2xpbiBtYWtlIG11bHRpcGxlIGhvdmVyIGxhYmVscyBhdCBvbmNlKVxuICAgICAgICAgICAgaWYoaG92ZXJtb2RlID09PSAnY2xvc2VzdCcgJiYgaG92ZXJEYXRhLmxlbmd0aCA+IGNsb3NlZGF0YVByZXZpb3VzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaG92ZXJEYXRhLnNwbGljZSgwLCBjbG9zZWRhdGFQcmV2aW91c0xlbmd0aCk7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBob3ZlckRhdGFbMF0uZGlzdGFuY2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE5vdyBpZiB0aGVyZSBpcyByYW5nZSB0byBsb29rIGluLCBmaW5kIHRoZSBwb2ludHMgdG8gZHJhdyB0aGUgc3Bpa2VsaW5lc1xuICAgICAgICAgICAgLy8gRG8gaXQgb25seSBpZiB0aGVyZSBpcyBubyBob3ZlckRhdGFcbiAgICAgICAgICAgIGlmKGhhc0NhcnRlc2lhbiAmJiAoc3Bpa2VkaXN0YW5jZSAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICBpZihob3ZlckRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50RGF0YS5kaXN0YW5jZSA9IHNwaWtlZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50RGF0YS5pbmRleCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2xvc2VzdFBvaW50cyA9IHRyYWNlLl9tb2R1bGUuaG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCAnY2xvc2VzdCcsIGZ1bGxMYXlvdXQuX2hvdmVybGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZihjbG9zZXN0UG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UG9pbnRzID0gY2xvc2VzdFBvaW50cy5maWx0ZXIoZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzb21lIGhvdmVyIHBvaW50cywgbGlrZSBzY2F0dGVyIGZpbGxzLCBkbyBub3QgYWxsb3cgc3Bpa2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdpbGwgZ2VuZXJhdGUgYSBob3ZlciBwb2ludCBidXQgd2l0aG91dCBhIHZhbGlkIHNwaWtlRGlzdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnQuc3Bpa2VEaXN0YW5jZSA8PSBzcGlrZWRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoY2xvc2VzdFBvaW50cyAmJiBjbG9zZXN0UG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsb3Nlc3RWUG9pbnRzID0gY2xvc2VzdFBvaW50cy5maWx0ZXIoZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnQueGEuc2hvd3NwaWtlcyAmJiBwb2ludC54YS5zcGlrZXNuYXAgIT09ICdob3ZlcmVkIGRhdGEnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjbG9zZXN0VlBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xvc2VzdFZQdCA9IGNsb3Nlc3RWUG9pbnRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzTnVtZXJpYyhjbG9zZXN0VlB0LngwKSAmJiBpc051bWVyaWMoY2xvc2VzdFZQdC55MCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wUG9pbnQgPSBmaWxsU3Bpa2VQb2ludChjbG9zZXN0VlB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNwaWtlUG9pbnRzLnZMaW5lUG9pbnQgfHwgKHNwaWtlUG9pbnRzLnZMaW5lUG9pbnQuc3Bpa2VEaXN0YW5jZSA+IHRtcFBvaW50LnNwaWtlRGlzdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGlrZVBvaW50cy52TGluZVBvaW50ID0gdG1wUG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbG9zZXN0SFBvaW50cyA9IGNsb3Nlc3RQb2ludHMuZmlsdGVyKGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50LnlhLnNob3dzcGlrZXMgJiYgcG9pbnQueWEuc3Bpa2VzbmFwICE9PSAnaG92ZXJlZCBkYXRhJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xvc2VzdEhQb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsb3Nlc3RIUHQgPSBjbG9zZXN0SFBvaW50c1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc051bWVyaWMoY2xvc2VzdEhQdC54MCkgJiYgaXNOdW1lcmljKGNsb3Nlc3RIUHQueTApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcFBvaW50ID0gZmlsbFNwaWtlUG9pbnQoY2xvc2VzdEhQdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzcGlrZVBvaW50cy5oTGluZVBvaW50IHx8IChzcGlrZVBvaW50cy5oTGluZVBvaW50LnNwaWtlRGlzdGFuY2UgPiB0bXBQb2ludC5zcGlrZURpc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Bpa2VQb2ludHMuaExpbmVQb2ludCA9IHRtcFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZEhvdmVyUG9pbnRzKCk7XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RDbG9zZXN0UG9pbnQocG9pbnRzRGF0YSwgc3Bpa2VkaXN0YW5jZSkge1xuICAgICAgICB2YXIgcmVzdWx0UG9pbnQgPSBudWxsO1xuICAgICAgICB2YXIgbWluRGlzdGFuY2UgPSBJbmZpbml0eTtcbiAgICAgICAgdmFyIHRoaXNTcGlrZURpc3RhbmNlO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcG9pbnRzRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpc1NwaWtlRGlzdGFuY2UgPSBwb2ludHNEYXRhW2ldLnNwaWtlRGlzdGFuY2U7XG4gICAgICAgICAgICBpZih0aGlzU3Bpa2VEaXN0YW5jZSA8PSBtaW5EaXN0YW5jZSAmJiB0aGlzU3Bpa2VEaXN0YW5jZSA8PSBzcGlrZWRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0UG9pbnQgPSBwb2ludHNEYXRhW2ldO1xuICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gdGhpc1NwaWtlRGlzdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFBvaW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbGxTcGlrZVBvaW50KHBvaW50KSB7XG4gICAgICAgIGlmKCFwb2ludCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4YTogcG9pbnQueGEsXG4gICAgICAgICAgICB5YTogcG9pbnQueWEsXG4gICAgICAgICAgICB4OiBwb2ludC54U3Bpa2UgIT09IHVuZGVmaW5lZCA/IHBvaW50LnhTcGlrZSA6IChwb2ludC54MCArIHBvaW50LngxKSAvIDIsXG4gICAgICAgICAgICB5OiBwb2ludC55U3Bpa2UgIT09IHVuZGVmaW5lZCA/IHBvaW50LnlTcGlrZSA6IChwb2ludC55MCArIHBvaW50LnkxKSAvIDIsXG4gICAgICAgICAgICBkaXN0YW5jZTogcG9pbnQuZGlzdGFuY2UsXG4gICAgICAgICAgICBzcGlrZURpc3RhbmNlOiBwb2ludC5zcGlrZURpc3RhbmNlLFxuICAgICAgICAgICAgY3VydmVOdW1iZXI6IHBvaW50LnRyYWNlLmluZGV4LFxuICAgICAgICAgICAgY29sb3I6IHBvaW50LmNvbG9yLFxuICAgICAgICAgICAgcG9pbnROdW1iZXI6IHBvaW50LmluZGV4XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHNwaWtlbGluZU9wdHMgPSB7XG4gICAgICAgIGZ1bGxMYXlvdXQ6IGZ1bGxMYXlvdXQsXG4gICAgICAgIGNvbnRhaW5lcjogZnVsbExheW91dC5faG92ZXJsYXllcixcbiAgICAgICAgb3V0ZXJDb250YWluZXI6IGZ1bGxMYXlvdXQuX3BhcGVyZGl2LFxuICAgICAgICBldmVudDogZXZ0XG4gICAgfTtcbiAgICB2YXIgb2xkc3Bpa2Vwb2ludHMgPSBnZC5fc3Bpa2Vwb2ludHM7XG4gICAgdmFyIG5ld3NwaWtlcG9pbnRzID0ge1xuICAgICAgICB2TGluZVBvaW50OiBzcGlrZVBvaW50cy52TGluZVBvaW50LFxuICAgICAgICBoTGluZVBvaW50OiBzcGlrZVBvaW50cy5oTGluZVBvaW50XG4gICAgfTtcbiAgICBnZC5fc3Bpa2Vwb2ludHMgPSBuZXdzcGlrZXBvaW50cztcblxuICAgIC8vIE5vdyBpZiBpdCBpcyBub3QgcmVzdHJpY3RlZCBieSBzcGlrZWRpc3RhbmNlIG9wdGlvbiwgc2V0IHRoZSBwb2ludHMgdG8gZHJhdyB0aGUgc3Bpa2VsaW5lc1xuICAgIGlmKGhhc0NhcnRlc2lhbiAmJiAoc3Bpa2VkaXN0YW5jZSAhPT0gMCkpIHtcbiAgICAgICAgaWYoaG92ZXJEYXRhLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgdmFyIHRtcEhQb2ludERhdGEgPSBob3ZlckRhdGEuZmlsdGVyKGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50LnlhLnNob3dzcGlrZXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciB0bXBIUG9pbnQgPSBzZWxlY3RDbG9zZXN0UG9pbnQodG1wSFBvaW50RGF0YSwgc3Bpa2VkaXN0YW5jZSk7XG4gICAgICAgICAgICBzcGlrZVBvaW50cy5oTGluZVBvaW50ID0gZmlsbFNwaWtlUG9pbnQodG1wSFBvaW50KTtcblxuICAgICAgICAgICAgdmFyIHRtcFZQb2ludERhdGEgPSBob3ZlckRhdGEuZmlsdGVyKGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50LnhhLnNob3dzcGlrZXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciB0bXBWUG9pbnQgPSBzZWxlY3RDbG9zZXN0UG9pbnQodG1wVlBvaW50RGF0YSwgc3Bpa2VkaXN0YW5jZSk7XG4gICAgICAgICAgICBzcGlrZVBvaW50cy52TGluZVBvaW50ID0gZmlsbFNwaWtlUG9pbnQodG1wVlBvaW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIGhvdmVyRGF0YSBpcyBlbXB0eSBjaGVjayBmb3IgdGhlIHNwaWtlcyB0byBkcmF3IGFuZCBxdWl0IGlmIHRoZXJlIGFyZSBub25lXG4gICAgaWYoaG92ZXJEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZHJhZ0VsZW1lbnQudW5ob3ZlclJhdyhnZCwgZXZ0KTtcbiAgICAgICAgaWYoaGFzQ2FydGVzaWFuICYmICgoc3Bpa2VQb2ludHMuaExpbmVQb2ludCAhPT0gbnVsbCkgfHwgKHNwaWtlUG9pbnRzLnZMaW5lUG9pbnQgIT09IG51bGwpKSkge1xuICAgICAgICAgICAgaWYoc3Bpa2VzQ2hhbmdlZChvbGRzcGlrZXBvaW50cykpIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVTcGlrZWxpbmVzKGdkLCBzcGlrZVBvaW50cywgc3Bpa2VsaW5lT3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZihoYXNDYXJ0ZXNpYW4pIHtcbiAgICAgICAgaWYoc3Bpa2VzQ2hhbmdlZChvbGRzcGlrZXBvaW50cykpIHtcbiAgICAgICAgICAgIGNyZWF0ZVNwaWtlbGluZXMoZ2QsIHNwaWtlUG9pbnRzLCBzcGlrZWxpbmVPcHRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhvdmVyRGF0YS5zb3J0KGZ1bmN0aW9uKGQxLCBkMikgeyByZXR1cm4gZDEuZGlzdGFuY2UgLSBkMi5kaXN0YW5jZTsgfSk7XG5cbiAgICAvLyBJZiBpbiBjb21wYXJlIG1vZGUsIHNlbGVjdCBldmVyeSBwb2ludCBhdCBwb3NpdGlvblxuICAgIGlmKFxuICAgICAgICBoZWxwZXJzLmlzWFlob3Zlcihtb2RlKSAmJlxuICAgICAgICBob3ZlckRhdGFbMF0ubGVuZ3RoICE9PSAwICYmXG4gICAgICAgIGhvdmVyRGF0YVswXS50cmFjZS50eXBlICE9PSAnc3Bsb20nIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBzcGxvbVxuICAgICkge1xuICAgICAgICB2YXIgaGQgPSBob3ZlckRhdGFbMF07XG4gICAgICAgIHZhciBjZDAgPSBoZC5jZFtoZC5pbmRleF07XG4gICAgICAgIHZhciBpc0dyb3VwZWQgPSAoZnVsbExheW91dC5ib3htb2RlID09PSAnZ3JvdXAnIHx8IGZ1bGxMYXlvdXQudmlvbGlubW9kZSA9PT0gJ2dyb3VwJyk7XG5cbiAgICAgICAgdmFyIHhWYWwgPSBoZC54VmFsO1xuICAgICAgICB2YXIgYXggPSBoZC54YTtcbiAgICAgICAgaWYoYXgudHlwZSA9PT0gJ2NhdGVnb3J5JykgeFZhbCA9IGF4Ll9jYXRlZ29yaWVzTWFwW3hWYWxdO1xuICAgICAgICBpZihheC50eXBlID09PSAnZGF0ZScpIHhWYWwgPSBheC5kMmMoeFZhbCk7XG4gICAgICAgIGlmKGNkMCAmJiBjZDAudCAmJiBjZDAudC5wb3NMZXR0ZXIgPT09IGF4Ll9pZCAmJiBpc0dyb3VwZWQpIHtcbiAgICAgICAgICAgIHhWYWwgKz0gY2QwLnQuZFBvcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB5VmFsID0gaGQueVZhbDtcbiAgICAgICAgYXggPSBoZC55YTtcbiAgICAgICAgaWYoYXgudHlwZSA9PT0gJ2NhdGVnb3J5JykgeVZhbCA9IGF4Ll9jYXRlZ29yaWVzTWFwW3lWYWxdO1xuICAgICAgICBpZihheC50eXBlID09PSAnZGF0ZScpIHlWYWwgPSBheC5kMmMoeVZhbCk7XG4gICAgICAgIGlmKGNkMCAmJiBjZDAudCAmJiBjZDAudC5wb3NMZXR0ZXIgPT09IGF4Ll9pZCAmJiBpc0dyb3VwZWQpIHtcbiAgICAgICAgICAgIHlWYWwgKz0gY2QwLnQuZFBvcztcbiAgICAgICAgfVxuXG4gICAgICAgIGZpbmRIb3ZlclBvaW50cyh4VmFsLCB5VmFsKTtcblxuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlZCBob3ZlckRhdGEgcG9pbnRzXG4gICAgICAgIC8vIG5vdGUgdGhhdCBkMyBhbHNvIGZpbHRlcnMgaWRlbnRpY2FsIHBvaW50cyBpbiB0aGUgcmVuZGVyaW5nIHN0ZXBzXG4gICAgICAgIHZhciByZXBlYXRlZCA9IHt9O1xuICAgICAgICBob3ZlckRhdGEgPSBob3ZlckRhdGEuZmlsdGVyKGZ1bmN0aW9uKGhkKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gaG92ZXJEYXRhS2V5KGhkKTtcbiAgICAgICAgICAgIGlmKCFyZXBlYXRlZFtrZXldKSB7XG4gICAgICAgICAgICAgICAgcmVwZWF0ZWRba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcGVhdGVkW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGxhc3RseSwgZW1pdCBjdXN0b20gaG92ZXIvdW5ob3ZlciBldmVudHNcbiAgICB2YXIgb2xkaG92ZXJkYXRhID0gZ2QuX2hvdmVyZGF0YTtcbiAgICB2YXIgbmV3aG92ZXJkYXRhID0gW107XG5cbiAgICAvLyBwdWxsIG91dCBqdXN0IHRoZSBkYXRhIHRoYXQncyB1c2VmdWwgdG9cbiAgICAvLyBvdGhlciBwZW9wbGUgYW5kIHNlbmQgaXQgdG8gdGhlIGV2ZW50XG4gICAgZm9yKGl0ZW1udW0gPSAwOyBpdGVtbnVtIDwgaG92ZXJEYXRhLmxlbmd0aDsgaXRlbW51bSsrKSB7XG4gICAgICAgIHZhciBwdCA9IGhvdmVyRGF0YVtpdGVtbnVtXTtcbiAgICAgICAgdmFyIGV2ZW50RGF0YSA9IGhlbHBlcnMubWFrZUV2ZW50RGF0YShwdCwgcHQudHJhY2UsIHB0LmNkKTtcblxuICAgICAgICBpZihwdC5ob3ZlcnRlbXBsYXRlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIGh0ID0gZmFsc2U7XG4gICAgICAgICAgICBpZihwdC5jZFtwdC5pbmRleF0gJiYgcHQuY2RbcHQuaW5kZXhdLmh0KSB7XG4gICAgICAgICAgICAgICAgaHQgPSBwdC5jZFtwdC5pbmRleF0uaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwdC5ob3ZlcnRlbXBsYXRlID0gaHQgfHwgcHQudHJhY2UuaG92ZXJ0ZW1wbGF0ZSB8fCBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB0LmV2ZW50RGF0YSA9IFtldmVudERhdGFdO1xuICAgICAgICBuZXdob3ZlcmRhdGEucHVzaChldmVudERhdGEpO1xuICAgIH1cblxuICAgIGdkLl9ob3ZlcmRhdGEgPSBuZXdob3ZlcmRhdGE7XG5cbiAgICB2YXIgcm90YXRlTGFiZWxzID0gKFxuICAgICAgICAoaG92ZXJtb2RlID09PSAneScgJiYgKHNlYXJjaERhdGEubGVuZ3RoID4gMSB8fCBob3ZlckRhdGEubGVuZ3RoID4gMSkpIHx8XG4gICAgICAgIChob3Zlcm1vZGUgPT09ICdjbG9zZXN0JyAmJiBoYXNPbmVIb3Jpem9udGFsVHJhY2UgJiYgaG92ZXJEYXRhLmxlbmd0aCA+IDEpXG4gICAgKTtcblxuICAgIHZhciBiZ0NvbG9yID0gQ29sb3IuY29tYmluZShcbiAgICAgICAgZnVsbExheW91dC5wbG90X2JnY29sb3IgfHwgQ29sb3IuYmFja2dyb3VuZCxcbiAgICAgICAgZnVsbExheW91dC5wYXBlcl9iZ2NvbG9yXG4gICAgKTtcblxuICAgIHZhciBsYWJlbE9wdHMgPSB7XG4gICAgICAgIGhvdmVybW9kZTogaG92ZXJtb2RlLFxuICAgICAgICByb3RhdGVMYWJlbHM6IHJvdGF0ZUxhYmVscyxcbiAgICAgICAgYmdDb2xvcjogYmdDb2xvcixcbiAgICAgICAgY29udGFpbmVyOiBmdWxsTGF5b3V0Ll9ob3ZlcmxheWVyLFxuICAgICAgICBvdXRlckNvbnRhaW5lcjogZnVsbExheW91dC5fcGFwZXJkaXYsXG4gICAgICAgIGNvbW1vbkxhYmVsT3B0czogZnVsbExheW91dC5ob3ZlcmxhYmVsLFxuICAgICAgICBob3ZlcmRpc3RhbmNlOiBmdWxsTGF5b3V0LmhvdmVyZGlzdGFuY2VcbiAgICB9O1xuXG4gICAgdmFyIGhvdmVyTGFiZWxzID0gY3JlYXRlSG92ZXJUZXh0KGhvdmVyRGF0YSwgbGFiZWxPcHRzLCBnZCk7XG5cbiAgICBpZighaGVscGVycy5pc1VuaWZpZWRIb3Zlcihob3Zlcm1vZGUpKSB7XG4gICAgICAgIGhvdmVyQXZvaWRPdmVybGFwcyhob3ZlckxhYmVscywgcm90YXRlTGFiZWxzID8gJ3hhJyA6ICd5YScsIGZ1bGxMYXlvdXQpO1xuICAgICAgICBhbGlnbkhvdmVyVGV4dChob3ZlckxhYmVscywgcm90YXRlTGFiZWxzKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiB0YWdOYW1lIGhhY2sgaXMgbmVlZGVkIHRvIGFwcGVhc2UgZ2VvLmpzJ3MgaGFjayBvZiB1c2luZyBldnQudGFyZ2V0PXRydWVcbiAgICAvLyB3ZSBzaG91bGQgaW1wcm92ZSB0aGUgXCJmeFwiIEFQSSBzbyBvdGhlciBwbG90cyBjYW4gdXNlIGl0IHdpdGhvdXQgdGhlc2UgaGFjay5cbiAgICBpZihldnQudGFyZ2V0ICYmIGV2dC50YXJnZXQudGFnTmFtZSkge1xuICAgICAgICB2YXIgaGFzQ2xpY2tUb1Nob3cgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Fubm90YXRpb25zJywgJ2hhc0NsaWNrVG9TaG93JykoZ2QsIG5ld2hvdmVyZGF0YSk7XG4gICAgICAgIG92ZXJyaWRlQ3Vyc29yKGQzLnNlbGVjdChldnQudGFyZ2V0KSwgaGFzQ2xpY2tUb1Nob3cgPyAncG9pbnRlcicgOiAnJyk7XG4gICAgfVxuXG4gICAgLy8gZG9uJ3QgZW1pdCBldmVudHMgaWYgY2FsbGVkIG1hbnVhbGx5XG4gICAgaWYoIWV2dC50YXJnZXQgfHwgbm9Ib3ZlckV2ZW50IHx8ICFob3ZlckNoYW5nZWQoZ2QsIGV2dCwgb2xkaG92ZXJkYXRhKSkgcmV0dXJuO1xuXG4gICAgaWYob2xkaG92ZXJkYXRhKSB7XG4gICAgICAgIGdkLmVtaXQoJ3Bsb3RseV91bmhvdmVyJywge1xuICAgICAgICAgICAgZXZlbnQ6IGV2dCxcbiAgICAgICAgICAgIHBvaW50czogb2xkaG92ZXJkYXRhXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdkLmVtaXQoJ3Bsb3RseV9ob3ZlcicsIHtcbiAgICAgICAgZXZlbnQ6IGV2dCxcbiAgICAgICAgcG9pbnRzOiBnZC5faG92ZXJkYXRhLFxuICAgICAgICB4YXhlczogeGFBcnJheSxcbiAgICAgICAgeWF4ZXM6IHlhQXJyYXksXG4gICAgICAgIHh2YWxzOiB4dmFsQXJyYXksXG4gICAgICAgIHl2YWxzOiB5dmFsQXJyYXlcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaG92ZXJEYXRhS2V5KGQpIHtcbiAgICByZXR1cm4gW2QudHJhY2UuaW5kZXgsIGQuaW5kZXgsIGQueDAsIGQueTAsIGQubmFtZSwgZC5hdHRyLCBkLnhhLCBkLnlhIHx8ICcnXS5qb2luKCcsJyk7XG59XG5cbnZhciBFWFRSQV9TVFJJTkdfUkVHRVggPSAvPGV4dHJhPihbXFxzXFxTXSopPFxcL2V4dHJhPi87XG5cbmZ1bmN0aW9uIGNyZWF0ZUhvdmVyVGV4dChob3ZlckRhdGEsIG9wdHMsIGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgaG92ZXJtb2RlID0gb3B0cy5ob3Zlcm1vZGU7XG4gICAgdmFyIHJvdGF0ZUxhYmVscyA9IG9wdHMucm90YXRlTGFiZWxzO1xuICAgIHZhciBiZ0NvbG9yID0gb3B0cy5iZ0NvbG9yO1xuICAgIHZhciBjb250YWluZXIgPSBvcHRzLmNvbnRhaW5lcjtcbiAgICB2YXIgb3V0ZXJDb250YWluZXIgPSBvcHRzLm91dGVyQ29udGFpbmVyO1xuICAgIHZhciBjb21tb25MYWJlbE9wdHMgPSBvcHRzLmNvbW1vbkxhYmVsT3B0cyB8fCB7fTtcblxuICAgIC8vIG9wdHMuZm9udEZhbWlseS9TaXplIGFyZSB1c2VkIGZvciB0aGUgY29tbW9uIGxhYmVsXG4gICAgLy8gYW5kIGFzIGRlZmF1bHRzIGZvciBlYWNoIGhvdmVyIGxhYmVsLCB0aG91Z2ggdGhlIGluZGl2aWR1YWwgbGFiZWxzXG4gICAgLy8gY2FuIG92ZXJyaWRlIHRoaXMuXG4gICAgdmFyIGZvbnRGYW1pbHkgPSBvcHRzLmZvbnRGYW1pbHkgfHwgY29uc3RhbnRzLkhPVkVSRk9OVDtcbiAgICB2YXIgZm9udFNpemUgPSBvcHRzLmZvbnRTaXplIHx8IGNvbnN0YW50cy5IT1ZFUkZPTlRTSVpFO1xuXG4gICAgdmFyIGMwID0gaG92ZXJEYXRhWzBdO1xuICAgIHZhciB4YSA9IGMwLnhhO1xuICAgIHZhciB5YSA9IGMwLnlhO1xuICAgIHZhciBjb21tb25BdHRyID0gaG92ZXJtb2RlLmNoYXJBdCgwKSA9PT0gJ3knID8gJ3lMYWJlbCcgOiAneExhYmVsJztcbiAgICB2YXIgdDAgPSBjMFtjb21tb25BdHRyXTtcbiAgICB2YXIgdDAwID0gKFN0cmluZyh0MCkgfHwgJycpLnNwbGl0KCcgJylbMF07XG4gICAgdmFyIG91dGVyQ29udGFpbmVyQkIgPSBvdXRlckNvbnRhaW5lci5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIG91dGVyVG9wID0gb3V0ZXJDb250YWluZXJCQi50b3A7XG4gICAgdmFyIG91dGVyV2lkdGggPSBvdXRlckNvbnRhaW5lckJCLndpZHRoO1xuICAgIHZhciBvdXRlckhlaWdodCA9IG91dGVyQ29udGFpbmVyQkIuaGVpZ2h0O1xuXG4gICAgLy8gc2hvdyB0aGUgY29tbW9uIGxhYmVsLCBpZiBhbnksIG9uIHRoZSBheGlzXG4gICAgLy8gbmV2ZXIgc2hvdyBhIGNvbW1vbiBsYWJlbCBpbiBhcnJheSBtb2RlLFxuICAgIC8vIGV2ZW4gaWYgc29tZXRpbWVzIHRoZXJlIGNvdWxkIGJlIG9uZVxuICAgIHZhciBzaG93Q29tbW9uTGFiZWwgPSAoXG4gICAgICAgICh0MCAhPT0gdW5kZWZpbmVkKSAmJlxuICAgICAgICAoYzAuZGlzdGFuY2UgPD0gb3B0cy5ob3ZlcmRpc3RhbmNlKSAmJlxuICAgICAgICAoaG92ZXJtb2RlID09PSAneCcgfHwgaG92ZXJtb2RlID09PSAneScpXG4gICAgKTtcblxuICAgIC8vIGFsbCBob3ZlciB0cmFjZXMgaG92ZXJpbmZvIG11c3QgY29udGFpbiB0aGUgaG92ZXJtb2RlXG4gICAgLy8gdG8gaGF2ZSBjb21tb24gbGFiZWxzXG4gICAgaWYoc2hvd0NvbW1vbkxhYmVsKSB7XG4gICAgICAgIHZhciBhbGxIYXZlWiA9IHRydWU7XG4gICAgICAgIHZhciBpLCB0cmFjZUhvdmVyaW5mbztcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgaG92ZXJEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihhbGxIYXZlWiAmJiBob3ZlckRhdGFbaV0uekxhYmVsID09PSB1bmRlZmluZWQpIGFsbEhhdmVaID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRyYWNlSG92ZXJpbmZvID0gaG92ZXJEYXRhW2ldLmhvdmVyaW5mbyB8fCBob3ZlckRhdGFbaV0udHJhY2UuaG92ZXJpbmZvO1xuICAgICAgICAgICAgaWYodHJhY2VIb3ZlcmluZm8pIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBBcnJheS5pc0FycmF5KHRyYWNlSG92ZXJpbmZvKSA/IHRyYWNlSG92ZXJpbmZvIDogdHJhY2VIb3ZlcmluZm8uc3BsaXQoJysnKTtcbiAgICAgICAgICAgICAgICBpZihwYXJ0cy5pbmRleE9mKCdhbGwnKSA9PT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgcGFydHMuaW5kZXhPZihob3Zlcm1vZGUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzaG93Q29tbW9uTGFiZWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8geHl6IGxhYmVscyBwdXQgYWxsIGluZm8gaW4gdGhlaXIgbWFpbiBsYWJlbCwgc28gaGF2ZSBubyBuZWVkIG9mIGEgY29tbW9uIGxhYmVsXG4gICAgICAgIGlmKGFsbEhhdmVaKSBzaG93Q29tbW9uTGFiZWwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY29tbW9uTGFiZWwgPSBjb250YWluZXIuc2VsZWN0QWxsKCdnLmF4aXN0ZXh0JylcbiAgICAgICAgLmRhdGEoc2hvd0NvbW1vbkxhYmVsID8gWzBdIDogW10pO1xuICAgIGNvbW1vbkxhYmVsLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ2F4aXN0ZXh0JywgdHJ1ZSk7XG4gICAgY29tbW9uTGFiZWwuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgY29tbW9uTGFiZWwuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxhYmVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgbHBhdGggPSBMaWIuZW5zdXJlU2luZ2xlKGxhYmVsLCAncGF0aCcsICcnLCBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICBzLnN0eWxlKHsnc3Ryb2tlLXdpZHRoJzogJzFweCd9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBsdGV4dCA9IExpYi5lbnN1cmVTaW5nbGUobGFiZWwsICd0ZXh0JywgJycsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIC8vIHByb2hpYml0IHRleCBpbnRlcnByZXRhdGlvbiB1bnRpbCB3ZSBjYW4gaGFuZGxlXG4gICAgICAgICAgICAvLyB0ZXggYW5kIHJlZ3VsYXIgdGV4dCB0b2dldGhlclxuICAgICAgICAgICAgcy5hdHRyKCdkYXRhLW5vdGV4JywgMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjb21tb25CZ0NvbG9yID0gY29tbW9uTGFiZWxPcHRzLmJnY29sb3IgfHwgQ29sb3IuZGVmYXVsdExpbmU7XG4gICAgICAgIHZhciBjb21tb25TdHJva2UgPSBjb21tb25MYWJlbE9wdHMuYm9yZGVyY29sb3IgfHwgQ29sb3IuY29udHJhc3QoY29tbW9uQmdDb2xvcik7XG4gICAgICAgIHZhciBjb250cmFzdENvbG9yID0gQ29sb3IuY29udHJhc3QoY29tbW9uQmdDb2xvcik7XG4gICAgICAgIHZhciBjb21tb25MYWJlbEZvbnQgPSB7XG4gICAgICAgICAgICBmYW1pbHk6IGNvbW1vbkxhYmVsT3B0cy5mb250LmZhbWlseSB8fCBmb250RmFtaWx5LFxuICAgICAgICAgICAgc2l6ZTogY29tbW9uTGFiZWxPcHRzLmZvbnQuc2l6ZSB8fCBmb250U2l6ZSxcbiAgICAgICAgICAgIGNvbG9yOiBjb21tb25MYWJlbE9wdHMuZm9udC5jb2xvciB8fCBjb250cmFzdENvbG9yXG4gICAgICAgIH07XG5cbiAgICAgICAgbHBhdGguc3R5bGUoe1xuICAgICAgICAgICAgZmlsbDogY29tbW9uQmdDb2xvcixcbiAgICAgICAgICAgIHN0cm9rZTogY29tbW9uU3Ryb2tlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGx0ZXh0LnRleHQodDApXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLmZvbnQsIGNvbW1vbkxhYmVsRm9udClcbiAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5wb3NpdGlvblRleHQsIDAsIDApXG4gICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMuY29udmVydFRvVHNwYW5zLCBnZCk7XG5cbiAgICAgICAgbGFiZWwuYXR0cigndHJhbnNmb3JtJywgJycpO1xuXG4gICAgICAgIHZhciB0YmIgPSBsdGV4dC5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBseCwgbHk7XG5cbiAgICAgICAgaWYoaG92ZXJtb2RlID09PSAneCcpIHtcbiAgICAgICAgICAgIHZhciB0b3BzaWduID0geGEuc2lkZSA9PT0gJ3RvcCcgPyAnLScgOiAnJztcblxuICAgICAgICAgICAgbHRleHQuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMucG9zaXRpb25UZXh0LCAwLCAoeGEuc2lkZSA9PT0gJ3RvcCcgP1xuICAgICAgICAgICAgICAgICAgICAob3V0ZXJUb3AgLSB0YmIuYm90dG9tIC0gSE9WRVJBUlJPV1NJWkUgLSBIT1ZFUlRFWFRQQUQpIDpcbiAgICAgICAgICAgICAgICAgICAgKG91dGVyVG9wIC0gdGJiLnRvcCArIEhPVkVSQVJST1dTSVpFICsgSE9WRVJURVhUUEFEKSkpO1xuXG4gICAgICAgICAgICBseCA9IHhhLl9vZmZzZXQgKyAoYzAueDAgKyBjMC54MSkgLyAyO1xuICAgICAgICAgICAgbHkgPSB5YS5fb2Zmc2V0ICsgKHhhLnNpZGUgPT09ICd0b3AnID8gMCA6IHlhLl9sZW5ndGgpO1xuXG4gICAgICAgICAgICB2YXIgaGFsZldpZHRoID0gdGJiLndpZHRoIC8gMiArIEhPVkVSVEVYVFBBRDtcblxuICAgICAgICAgICAgaWYobHggPCBoYWxmV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBseCA9IGhhbGZXaWR0aDtcblxuICAgICAgICAgICAgICAgIGxwYXRoLmF0dHIoJ2QnLCAnTS0nICsgKGhhbGZXaWR0aCAtIEhPVkVSQVJST1dTSVpFKSArICcsMCcgK1xuICAgICAgICAgICAgICAgICAgICAnTC0nICsgKGhhbGZXaWR0aCAtIEhPVkVSQVJST1dTSVpFICogMikgKyAnLCcgKyB0b3BzaWduICsgSE9WRVJBUlJPV1NJWkUgK1xuICAgICAgICAgICAgICAgICAgICAnSCcgKyAoSE9WRVJURVhUUEFEICsgdGJiLndpZHRoIC8gMikgK1xuICAgICAgICAgICAgICAgICAgICAndicgKyB0b3BzaWduICsgKEhPVkVSVEVYVFBBRCAqIDIgKyB0YmIuaGVpZ2h0KSArXG4gICAgICAgICAgICAgICAgICAgICdILScgKyBoYWxmV2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAnVicgKyB0b3BzaWduICsgSE9WRVJBUlJPV1NJWkUgK1xuICAgICAgICAgICAgICAgICAgICAnWicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGx4ID4gKGZ1bGxMYXlvdXQud2lkdGggLSBoYWxmV2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgbHggPSBmdWxsTGF5b3V0LndpZHRoIC0gaGFsZldpZHRoO1xuXG4gICAgICAgICAgICAgICAgbHBhdGguYXR0cignZCcsICdNJyArIChoYWxmV2lkdGggLSBIT1ZFUkFSUk9XU0laRSkgKyAnLDAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0wnICsgaGFsZldpZHRoICsgJywnICsgdG9wc2lnbiArIEhPVkVSQVJST1dTSVpFICtcbiAgICAgICAgICAgICAgICAgICAgJ3YnICsgdG9wc2lnbiArIChIT1ZFUlRFWFRQQUQgKiAyICsgdGJiLmhlaWdodCkgK1xuICAgICAgICAgICAgICAgICAgICAnSC0nICsgaGFsZldpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgJ1YnICsgdG9wc2lnbiArIEhPVkVSQVJST1dTSVpFICtcbiAgICAgICAgICAgICAgICAgICAgJ0gnICsgKGhhbGZXaWR0aCAtIEhPVkVSQVJST1dTSVpFICogMikgKyAnWicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBscGF0aC5hdHRyKCdkJywgJ00wLDAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0wnICsgSE9WRVJBUlJPV1NJWkUgKyAnLCcgKyB0b3BzaWduICsgSE9WRVJBUlJPV1NJWkUgK1xuICAgICAgICAgICAgICAgICAgICAnSCcgKyAoSE9WRVJURVhUUEFEICsgdGJiLndpZHRoIC8gMikgK1xuICAgICAgICAgICAgICAgICAgICAndicgKyB0b3BzaWduICsgKEhPVkVSVEVYVFBBRCAqIDIgKyB0YmIuaGVpZ2h0KSArXG4gICAgICAgICAgICAgICAgICAgICdILScgKyAoSE9WRVJURVhUUEFEICsgdGJiLndpZHRoIC8gMikgK1xuICAgICAgICAgICAgICAgICAgICAnVicgKyB0b3BzaWduICsgSE9WRVJBUlJPV1NJWkUgK1xuICAgICAgICAgICAgICAgICAgICAnSC0nICsgSE9WRVJBUlJPV1NJWkUgKyAnWicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGFuY2hvcjtcbiAgICAgICAgICAgIHZhciBzZ247XG4gICAgICAgICAgICB2YXIgbGVmdHNpZ247XG4gICAgICAgICAgICBpZih5YS5zaWRlID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgYW5jaG9yID0gJ3N0YXJ0JztcbiAgICAgICAgICAgICAgICBzZ24gPSAxO1xuICAgICAgICAgICAgICAgIGxlZnRzaWduID0gJyc7XG4gICAgICAgICAgICAgICAgbHggPSB4YS5fb2Zmc2V0ICsgeGEuX2xlbmd0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5jaG9yID0gJ2VuZCc7XG4gICAgICAgICAgICAgICAgc2duID0gLTE7XG4gICAgICAgICAgICAgICAgbGVmdHNpZ24gPSAnLSc7XG4gICAgICAgICAgICAgICAgbHggPSB4YS5fb2Zmc2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBseSA9IHlhLl9vZmZzZXQgKyAoYzAueTAgKyBjMC55MSkgLyAyO1xuXG4gICAgICAgICAgICBsdGV4dC5hdHRyKCd0ZXh0LWFuY2hvcicsIGFuY2hvcik7XG5cbiAgICAgICAgICAgIGxwYXRoLmF0dHIoJ2QnLCAnTTAsMCcgK1xuICAgICAgICAgICAgICAgICdMJyArIGxlZnRzaWduICsgSE9WRVJBUlJPV1NJWkUgKyAnLCcgKyBIT1ZFUkFSUk9XU0laRSArXG4gICAgICAgICAgICAgICAgJ1YnICsgKEhPVkVSVEVYVFBBRCArIHRiYi5oZWlnaHQgLyAyKSArXG4gICAgICAgICAgICAgICAgJ2gnICsgbGVmdHNpZ24gKyAoSE9WRVJURVhUUEFEICogMiArIHRiYi53aWR0aCkgK1xuICAgICAgICAgICAgICAgICdWLScgKyAoSE9WRVJURVhUUEFEICsgdGJiLmhlaWdodCAvIDIpICtcbiAgICAgICAgICAgICAgICAnSCcgKyBsZWZ0c2lnbiArIEhPVkVSQVJST1dTSVpFICsgJ1YtJyArIEhPVkVSQVJST1dTSVpFICsgJ1onKTtcblxuICAgICAgICAgICAgdmFyIGhhbGZIZWlnaHQgPSB0YmIuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIHZhciBsdHkgPSBvdXRlclRvcCAtIHRiYi50b3AgLSBoYWxmSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIGNsaXBJZCA9ICdjbGlwJyArIGZ1bGxMYXlvdXQuX3VpZCArICdjb21tb25sYWJlbCcgKyB5YS5faWQ7XG4gICAgICAgICAgICB2YXIgY2xpcFBhdGg7XG5cbiAgICAgICAgICAgIGlmKGx4IDwgKHRiYi53aWR0aCArIDIgKiBIT1ZFUlRFWFRQQUQgKyBIT1ZFUkFSUk9XU0laRSkpIHtcbiAgICAgICAgICAgICAgICBjbGlwUGF0aCA9ICdNLScgKyAoSE9WRVJBUlJPV1NJWkUgKyBIT1ZFUlRFWFRQQUQpICsgJy0nICsgaGFsZkhlaWdodCArXG4gICAgICAgICAgICAgICAgICAgICdoLScgKyAodGJiLndpZHRoIC0gSE9WRVJURVhUUEFEKSArXG4gICAgICAgICAgICAgICAgICAgICdWJyArIGhhbGZIZWlnaHQgK1xuICAgICAgICAgICAgICAgICAgICAnaCcgKyAodGJiLndpZHRoIC0gSE9WRVJURVhUUEFEKSArICdaJztcblxuICAgICAgICAgICAgICAgIHZhciBsdHggPSB0YmIud2lkdGggLSBseCArIEhPVkVSVEVYVFBBRDtcbiAgICAgICAgICAgICAgICBzdmdUZXh0VXRpbHMucG9zaXRpb25UZXh0KGx0ZXh0LCBsdHgsIGx0eSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzaGlmdCBlYWNoIGxpbmUgKGV4Y2VwdCB0aGUgbG9uZ2VzdCkgc28gdGhhdCBzdGFydC1vZi1saW5lXG4gICAgICAgICAgICAgICAgLy8gaXMgYWx3YXlzIHZpc2libGVcbiAgICAgICAgICAgICAgICBpZihhbmNob3IgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGx0ZXh0LnNlbGVjdEFsbCgndHNwYW4nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVtbXkgPSBEcmF3aW5nLnRlc3Rlci5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHMudGV4dCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgY29tbW9uTGFiZWxGb250KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdW1teUJCID0gZHVtbXkubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTWF0aC5yb3VuZChkdW1teUJCLndpZHRoKSA8IE1hdGgucm91bmQodGJiLndpZHRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuYXR0cigneCcsIGx0eCAtIGR1bW15QkIud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3ZnVGV4dFV0aWxzLnBvc2l0aW9uVGV4dChsdGV4dCwgc2duICogKEhPVkVSVEVYVFBBRCArIEhPVkVSQVJST1dTSVpFKSwgbHR5KTtcbiAgICAgICAgICAgICAgICBjbGlwUGF0aCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0ZXh0Q2xpcCA9IGZ1bGxMYXlvdXQuX3RvcGNsaXBzLnNlbGVjdEFsbCgnIycgKyBjbGlwSWQpLmRhdGEoY2xpcFBhdGggPyBbMF0gOiBbXSk7XG4gICAgICAgICAgICB0ZXh0Q2xpcC5lbnRlcigpLmFwcGVuZCgnY2xpcFBhdGgnKS5hdHRyKCdpZCcsIGNsaXBJZCkuYXBwZW5kKCdwYXRoJyk7XG4gICAgICAgICAgICB0ZXh0Q2xpcC5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICB0ZXh0Q2xpcC5zZWxlY3QoJ3BhdGgnKS5hdHRyKCdkJywgY2xpcFBhdGgpO1xuICAgICAgICAgICAgRHJhd2luZy5zZXRDbGlwVXJsKGx0ZXh0LCBjbGlwUGF0aCA/IGNsaXBJZCA6IG51bGwsIGdkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxhYmVsLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGx4ICsgJywnICsgbHkgKyAnKScpO1xuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgXCJjbG9zZSBidXQgbm90IHF1aXRlXCIgcG9pbnRzXG4gICAgICAgIC8vIGJlY2F1c2Ugb2YgZXJyb3IgYmFycywgb25seSB0YWtlIHVwIHRvIGEgc3BhY2VcbiAgICAgICAgaG92ZXJEYXRhID0gZmlsdGVyQ2xvc2VQb2ludHMoaG92ZXJEYXRhKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGZpbHRlckNsb3NlUG9pbnRzKGhvdmVyRGF0YSkge1xuICAgICAgICByZXR1cm4gaG92ZXJEYXRhLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gKGQuekxhYmVsVmFsICE9PSB1bmRlZmluZWQpIHx8XG4gICAgICAgICAgICAgICAgKGRbY29tbW9uQXR0cl0gfHwgJycpLnNwbGl0KCcgJylbMF0gPT09IHQwMDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2hvdyBhIHNpbmdsZSBob3ZlciBsYWJlbFxuICAgIGlmKGhlbHBlcnMuaXNVbmlmaWVkSG92ZXIoaG92ZXJtb2RlKSkge1xuICAgICAgICAvLyBEZWxldGUgbGVmdG92ZXIgaG92ZXIgbGFiZWxzIGZyb20gb3RoZXIgaG92ZXJtb2Rlc1xuICAgICAgICBjb250YWluZXIuc2VsZWN0QWxsKCdnLmhvdmVydGV4dCcpLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIHNpbWlsYXJseSB0byBjb21wYXJlIG1vZGUsIHdlIHJlbW92ZSB0aGUgXCJjbG9zZSBidXQgbm90IHF1aXRlIHRvZ2V0aGVyXCIgcG9pbnRzXG4gICAgICAgIGlmKCh0MCAhPT0gdW5kZWZpbmVkKSAmJiAoYzAuZGlzdGFuY2UgPD0gb3B0cy5ob3ZlcmRpc3RhbmNlKSkgaG92ZXJEYXRhID0gZmlsdGVyQ2xvc2VQb2ludHMoaG92ZXJEYXRhKTtcblxuICAgICAgICAvLyBSZXR1cm4gZWFybHkgaWYgbm90aGluZyBpcyBob3ZlcmVkIG9uXG4gICAgICAgIGlmKGhvdmVyRGF0YS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICAvLyBtb2NrIGxlZ2VuZFxuICAgICAgICB2YXIgbW9ja0xheW91dEluID0ge1xuICAgICAgICAgICAgc2hvd2xlZ2VuZDogdHJ1ZSxcbiAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB7dGV4dDogdDAsIGZvbnQ6IGZ1bGxMYXlvdXQuaG92ZXJsYWJlbC5mb250fSxcbiAgICAgICAgICAgICAgICBmb250OiBmdWxsTGF5b3V0LmhvdmVybGFiZWwuZm9udCxcbiAgICAgICAgICAgICAgICBiZ2NvbG9yOiBmdWxsTGF5b3V0LmhvdmVybGFiZWwuYmdjb2xvcixcbiAgICAgICAgICAgICAgICBib3JkZXJjb2xvcjogZnVsbExheW91dC5ob3ZlcmxhYmVsLmJvcmRlcmNvbG9yLFxuICAgICAgICAgICAgICAgIGJvcmRlcndpZHRoOiAxLFxuICAgICAgICAgICAgICAgIHRyYWNlZ3JvdXBnYXA6IDcsXG4gICAgICAgICAgICAgICAgdHJhY2VvcmRlcjogZnVsbExheW91dC5sZWdlbmQgPyBmdWxsTGF5b3V0LmxlZ2VuZC50cmFjZW9yZGVyIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiAndidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG1vY2tMYXlvdXRPdXQgPSB7fTtcbiAgICAgICAgbGVnZW5kU3VwcGx5RGVmYXVsdHMobW9ja0xheW91dEluLCBtb2NrTGF5b3V0T3V0LCBnZC5fZnVsbERhdGEpO1xuICAgICAgICB2YXIgbGVnZW5kT3B0cyA9IG1vY2tMYXlvdXRPdXQubGVnZW5kO1xuXG4gICAgICAgIC8vIHByZXBhcmUgaXRlbXMgZm9yIHRoZSBsZWdlbmRcbiAgICAgICAgbGVnZW5kT3B0cy5lbnRyaWVzID0gW107XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBob3ZlckRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciB0ZXh0cyA9IGdldEhvdmVyTGFiZWxUZXh0KGhvdmVyRGF0YVtqXSwgdHJ1ZSwgaG92ZXJtb2RlLCBmdWxsTGF5b3V0LCB0MCk7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IHRleHRzWzBdO1xuICAgICAgICAgICAgdmFyIG5hbWUgPSB0ZXh0c1sxXTtcbiAgICAgICAgICAgIHZhciBwdCA9IGhvdmVyRGF0YVtqXTtcbiAgICAgICAgICAgIHB0Lm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgaWYobmFtZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBwdC50ZXh0ID0gbmFtZSArICcgOiAnICsgdGV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHQudGV4dCA9IHRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHBhc3MgdGhyb3VnaCBtYXJrZXIncyBjYWxjZGF0YSB0byBzdHlsZSBsZWdlbmQgaXRlbXNcbiAgICAgICAgICAgIHZhciBjZCA9IHB0LmNkW3B0LmluZGV4XTtcbiAgICAgICAgICAgIGlmKGNkKSB7XG4gICAgICAgICAgICAgICAgaWYoY2QubWMpIHB0Lm1jID0gY2QubWM7XG4gICAgICAgICAgICAgICAgaWYoY2QubWNjKSBwdC5tYyA9IGNkLm1jYztcbiAgICAgICAgICAgICAgICBpZihjZC5tbGMpIHB0Lm1sYyA9IGNkLm1sYztcbiAgICAgICAgICAgICAgICBpZihjZC5tbGNjKSBwdC5tbGMgPSBjZC5tbGNjO1xuICAgICAgICAgICAgICAgIGlmKGNkLm1sdykgcHQubWx3ID0gY2QubWx3O1xuICAgICAgICAgICAgICAgIGlmKGNkLm1yYykgcHQubXJjID0gY2QubXJjO1xuICAgICAgICAgICAgICAgIGlmKGNkLmRpcikgcHQuZGlyID0gY2QuZGlyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHQuX2Rpc3RpbmN0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgbGVnZW5kT3B0cy5lbnRyaWVzLnB1c2goW3B0XSk7XG4gICAgICAgIH1cbiAgICAgICAgbGVnZW5kT3B0cy5lbnRyaWVzLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYVswXS50cmFjZS5pbmRleCAtIGJbMF0udHJhY2UuaW5kZXg7fSk7XG4gICAgICAgIGxlZ2VuZE9wdHMubGF5ZXIgPSBjb250YWluZXI7XG5cbiAgICAgICAgLy8gRHJhdyB1bmlmaWVkIGhvdmVyIGxhYmVsXG4gICAgICAgIGxlZ2VuZERyYXcoZ2QsIGxlZ2VuZE9wdHMpO1xuXG4gICAgICAgIC8vIFBvc2l0aW9uIHRoZSBob3ZlclxuICAgICAgICB2YXIgbHkgPSBMaWIubWVhbihob3ZlckRhdGEubWFwKGZ1bmN0aW9uKGMpIHtyZXR1cm4gKGMueTAgKyBjLnkxKSAvIDI7fSkpO1xuICAgICAgICB2YXIgbHggPSBMaWIubWVhbihob3ZlckRhdGEubWFwKGZ1bmN0aW9uKGMpIHtyZXR1cm4gKGMueDAgKyBjLngxKSAvIDI7fSkpO1xuICAgICAgICB2YXIgbGVnZW5kQ29udGFpbmVyID0gY29udGFpbmVyLnNlbGVjdCgnZy5sZWdlbmQnKTtcbiAgICAgICAgdmFyIHRiYiA9IGxlZ2VuZENvbnRhaW5lci5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGx4ICs9IHhhLl9vZmZzZXQ7XG4gICAgICAgIGx5ICs9IHlhLl9vZmZzZXQgLSB0YmIuaGVpZ2h0IC8gMjtcblxuICAgICAgICAvLyBDaGFuZ2UgaG9yaXpvbnRhbCBhbGlnbm1lbnQgdG8gZW5kIHVwIG9uIHNjcmVlblxuICAgICAgICB2YXIgdHhXaWR0aCA9IHRiYi53aWR0aCArIDIgKiBIT1ZFUlRFWFRQQUQ7XG4gICAgICAgIHZhciBhbmNob3JTdGFydE9LID0gbHggKyB0eFdpZHRoIDw9IG91dGVyV2lkdGg7XG4gICAgICAgIHZhciBhbmNob3JFbmRPSyA9IGx4IC0gdHhXaWR0aCA+PSAwO1xuICAgICAgICBpZighYW5jaG9yU3RhcnRPSyAmJiBhbmNob3JFbmRPSykge1xuICAgICAgICAgICAgbHggLT0gdHhXaWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGx4ICs9IDIgKiBIT1ZFUlRFWFRQQUQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGFuZ2UgdmVydGljYWwgYWxpZ25lbWVudCB0byBlbmQgdXAgb24gc2NyZWVuXG4gICAgICAgIHZhciB0eEhlaWdodCA9IHRiYi5oZWlnaHQgKyAyICogSE9WRVJURVhUUEFEO1xuICAgICAgICB2YXIgb3ZlcmZsb3dUb3AgPSBseSA8PSBvdXRlclRvcDtcbiAgICAgICAgdmFyIG92ZXJmbG93Qm90dG9tID0gbHkgKyB0eEhlaWdodCA+PSBvdXRlckhlaWdodDtcbiAgICAgICAgdmFyIGNhbkZpdCA9IHR4SGVpZ2h0IDw9IG91dGVySGVpZ2h0O1xuICAgICAgICBpZihjYW5GaXQpIHtcbiAgICAgICAgICAgIGlmKG92ZXJmbG93VG9wKSB7XG4gICAgICAgICAgICAgICAgbHkgPSB5YS5fb2Zmc2V0ICsgMiAqIEhPVkVSVEVYVFBBRDtcbiAgICAgICAgICAgIH0gZWxzZSBpZihvdmVyZmxvd0JvdHRvbSkge1xuICAgICAgICAgICAgICAgIGx5ID0gb3V0ZXJIZWlnaHQgLSB0eEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZWdlbmRDb250YWluZXIuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbHggKyAnLCcgKyBseSArICcpJyk7XG5cbiAgICAgICAgcmV0dXJuIGxlZ2VuZENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvLyBzaG93IGFsbCB0aGUgaW5kaXZpZHVhbCBsYWJlbHNcblxuICAgIC8vIGZpcnN0IGNyZWF0ZSB0aGUgb2JqZWN0c1xuICAgIHZhciBob3ZlckxhYmVscyA9IGNvbnRhaW5lci5zZWxlY3RBbGwoJ2cuaG92ZXJ0ZXh0JylcbiAgICAgICAgLmRhdGEoaG92ZXJEYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAvLyBOLkIuIHdoZW4gbXVsdGlwbGUgaXRlbXMgaGF2ZSB0aGUgc2FtZSByZXN1bHQga2V5LWZ1bmN0aW9uIHZhbHVlLFxuICAgICAgICAgICAgLy8gb25seSB0aGUgZmlyc3Qgb2YgdGhvc2UgaXRlbXMgaW4gaG92ZXJEYXRhIGdldHMgcmVuZGVyZWRcbiAgICAgICAgICAgIHJldHVybiBob3ZlckRhdGFLZXkoZCk7XG4gICAgICAgIH0pO1xuICAgIGhvdmVyTGFiZWxzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ2hvdmVydGV4dCcsIHRydWUpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGcgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAvLyB0cmFjZSBuYW1lIGxhYmVsIChyZWN0IGFuZCB0ZXh0Lm5hbWUpXG4gICAgICAgICAgICBnLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgQ29sb3IuYWRkT3BhY2l0eShiZ0NvbG9yLCAwLjgpKTtcbiAgICAgICAgICAgIGcuYXBwZW5kKCd0ZXh0JykuY2xhc3NlZCgnbmFtZScsIHRydWUpO1xuICAgICAgICAgICAgLy8gdHJhY2UgZGF0YSBsYWJlbCAocGF0aCBhbmQgdGV4dC5udW1zKVxuICAgICAgICAgICAgZy5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgJzFweCcpO1xuICAgICAgICAgICAgZy5hcHBlbmQoJ3RleHQnKS5jbGFzc2VkKCdudW1zJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLmZvbnQsIGZvbnRGYW1pbHksIGZvbnRTaXplKTtcbiAgICAgICAgfSk7XG4gICAgaG92ZXJMYWJlbHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgLy8gdGhlbiBwdXQgdGhlIHRleHQgaW4sIHBvc2l0aW9uIHRoZSBwb2ludGVyIHRvIHRoZSBkYXRhLFxuICAgIC8vIGFuZCBmaWd1cmUgb3V0IHNpemVzXG4gICAgaG92ZXJMYWJlbHMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBnID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ3RyYW5zZm9ybScsICcnKTtcblxuICAgICAgICAvLyBjb21iaW5lIHBvc3NpYmxlIG5vbi1vcGFxdWUgdHJhY2UgY29sb3Igd2l0aCBiZ0NvbG9yXG4gICAgICAgIHZhciBjb2xvcjAgPSBkLmJnY29sb3IgfHwgZC5jb2xvcjtcbiAgICAgICAgLy8gY29sb3IgZm9yICdudW1zJyBwYXJ0IG9mIHRoZSBsYWJlbFxuICAgICAgICB2YXIgbnVtc0NvbG9yID0gQ29sb3IuY29tYmluZShcbiAgICAgICAgICAgIENvbG9yLm9wYWNpdHkoY29sb3IwKSA/IGNvbG9yMCA6IENvbG9yLmRlZmF1bHRMaW5lLFxuICAgICAgICAgICAgYmdDb2xvclxuICAgICAgICApO1xuICAgICAgICAvLyBjb2xvciBmb3IgJ25hbWUnIHBhcnQgb2YgdGhlIGxhYmVsXG4gICAgICAgIHZhciBuYW1lQ29sb3IgPSBDb2xvci5jb21iaW5lKFxuICAgICAgICAgICAgQ29sb3Iub3BhY2l0eShkLmNvbG9yKSA/IGQuY29sb3IgOiBDb2xvci5kZWZhdWx0TGluZSxcbiAgICAgICAgICAgIGJnQ29sb3JcbiAgICAgICAgKTtcbiAgICAgICAgLy8gZmluZCBhIGNvbnRyYXN0aW5nIGNvbG9yIGZvciBib3JkZXIgYW5kIHRleHRcbiAgICAgICAgdmFyIGNvbnRyYXN0Q29sb3IgPSBkLmJvcmRlckNvbG9yIHx8IENvbG9yLmNvbnRyYXN0KG51bXNDb2xvcik7XG5cbiAgICAgICAgdmFyIHRleHRzID0gZ2V0SG92ZXJMYWJlbFRleHQoZCwgc2hvd0NvbW1vbkxhYmVsLCBob3Zlcm1vZGUsIGZ1bGxMYXlvdXQsIHQwLCBnKTtcbiAgICAgICAgdmFyIHRleHQgPSB0ZXh0c1swXTtcbiAgICAgICAgdmFyIG5hbWUgPSB0ZXh0c1sxXTtcblxuICAgICAgICAvLyBtYWluIGxhYmVsXG4gICAgICAgIHZhciB0eCA9IGcuc2VsZWN0KCd0ZXh0Lm51bXMnKVxuICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5mb250LFxuICAgICAgICAgICAgICAgIGQuZm9udEZhbWlseSB8fCBmb250RmFtaWx5LFxuICAgICAgICAgICAgICAgIGQuZm9udFNpemUgfHwgZm9udFNpemUsXG4gICAgICAgICAgICAgICAgZC5mb250Q29sb3IgfHwgY29udHJhc3RDb2xvcilcbiAgICAgICAgICAgIC50ZXh0KHRleHQpXG4gICAgICAgICAgICAuYXR0cignZGF0YS1ub3RleCcsIDEpXG4gICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMucG9zaXRpb25UZXh0LCAwLCAwKVxuICAgICAgICAgICAgLmNhbGwoc3ZnVGV4dFV0aWxzLmNvbnZlcnRUb1RzcGFucywgZ2QpO1xuXG4gICAgICAgIHZhciB0eDIgPSBnLnNlbGVjdCgndGV4dC5uYW1lJyk7XG4gICAgICAgIHZhciB0eDJ3aWR0aCA9IDA7XG4gICAgICAgIHZhciB0eDJoZWlnaHQgPSAwO1xuXG4gICAgICAgIC8vIHNlY29uZGFyeSBsYWJlbCBmb3Igbm9uLWVtcHR5ICduYW1lJ1xuICAgICAgICBpZihuYW1lICYmIG5hbWUgIT09IHRleHQpIHtcbiAgICAgICAgICAgIHR4Mi5jYWxsKERyYXdpbmcuZm9udCxcbiAgICAgICAgICAgICAgICAgICAgZC5mb250RmFtaWx5IHx8IGZvbnRGYW1pbHksXG4gICAgICAgICAgICAgICAgICAgIGQuZm9udFNpemUgfHwgZm9udFNpemUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVDb2xvcilcbiAgICAgICAgICAgICAgICAudGV4dChuYW1lKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLW5vdGV4JywgMSlcbiAgICAgICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMucG9zaXRpb25UZXh0LCAwLCAwKVxuICAgICAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcblxuICAgICAgICAgICAgdmFyIHQyYmIgPSB0eDIubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdHgyd2lkdGggPSB0MmJiLndpZHRoICsgMiAqIEhPVkVSVEVYVFBBRDtcbiAgICAgICAgICAgIHR4MmhlaWdodCA9IHQyYmIuaGVpZ2h0ICsgMiAqIEhPVkVSVEVYVFBBRDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHR4Mi5yZW1vdmUoKTtcbiAgICAgICAgICAgIGcuc2VsZWN0KCdyZWN0JykucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnLnNlbGVjdCgncGF0aCcpLnN0eWxlKHtcbiAgICAgICAgICAgIGZpbGw6IG51bXNDb2xvcixcbiAgICAgICAgICAgIHN0cm9rZTogY29udHJhc3RDb2xvclxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdGJiID0gdHgubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgaHR4ID0gZC54YS5fb2Zmc2V0ICsgKGQueDAgKyBkLngxKSAvIDI7XG4gICAgICAgIHZhciBodHkgPSBkLnlhLl9vZmZzZXQgKyAoZC55MCArIGQueTEpIC8gMjtcbiAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMoZC54MSAtIGQueDApO1xuICAgICAgICB2YXIgZHkgPSBNYXRoLmFicyhkLnkxIC0gZC55MCk7XG4gICAgICAgIHZhciB0eFRvdGFsV2lkdGggPSB0YmIud2lkdGggKyBIT1ZFUkFSUk9XU0laRSArIEhPVkVSVEVYVFBBRCArIHR4MndpZHRoO1xuICAgICAgICB2YXIgYW5jaG9yU3RhcnRPSywgYW5jaG9yRW5kT0s7XG5cbiAgICAgICAgZC50eTAgPSBvdXRlclRvcCAtIHRiYi50b3A7XG4gICAgICAgIGQuYnggPSB0YmIud2lkdGggKyAyICogSE9WRVJURVhUUEFEO1xuICAgICAgICBkLmJ5ID0gTWF0aC5tYXgodGJiLmhlaWdodCArIDIgKiBIT1ZFUlRFWFRQQUQsIHR4MmhlaWdodCk7XG4gICAgICAgIGQuYW5jaG9yID0gJ3N0YXJ0JztcbiAgICAgICAgZC50eHdpZHRoID0gdGJiLndpZHRoO1xuICAgICAgICBkLnR4MndpZHRoID0gdHgyd2lkdGg7XG4gICAgICAgIGQub2Zmc2V0ID0gMDtcblxuICAgICAgICBpZihyb3RhdGVMYWJlbHMpIHtcbiAgICAgICAgICAgIGQucG9zID0gaHR4O1xuICAgICAgICAgICAgYW5jaG9yU3RhcnRPSyA9IGh0eSArIGR5IC8gMiArIHR4VG90YWxXaWR0aCA8PSBvdXRlckhlaWdodDtcbiAgICAgICAgICAgIGFuY2hvckVuZE9LID0gaHR5IC0gZHkgLyAyIC0gdHhUb3RhbFdpZHRoID49IDA7XG4gICAgICAgICAgICBpZigoZC5pZGVhbEFsaWduID09PSAndG9wJyB8fCAhYW5jaG9yU3RhcnRPSykgJiYgYW5jaG9yRW5kT0spIHtcbiAgICAgICAgICAgICAgICBodHkgLT0gZHkgLyAyO1xuICAgICAgICAgICAgICAgIGQuYW5jaG9yID0gJ2VuZCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYW5jaG9yU3RhcnRPSykge1xuICAgICAgICAgICAgICAgIGh0eSArPSBkeSAvIDI7XG4gICAgICAgICAgICAgICAgZC5hbmNob3IgPSAnc3RhcnQnO1xuICAgICAgICAgICAgfSBlbHNlIGQuYW5jaG9yID0gJ21pZGRsZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkLnBvcyA9IGh0eTtcbiAgICAgICAgICAgIGFuY2hvclN0YXJ0T0sgPSBodHggKyBkeCAvIDIgKyB0eFRvdGFsV2lkdGggPD0gb3V0ZXJXaWR0aDtcbiAgICAgICAgICAgIGFuY2hvckVuZE9LID0gaHR4IC0gZHggLyAyIC0gdHhUb3RhbFdpZHRoID49IDA7XG5cbiAgICAgICAgICAgIGlmKChkLmlkZWFsQWxpZ24gPT09ICdsZWZ0JyB8fCAhYW5jaG9yU3RhcnRPSykgJiYgYW5jaG9yRW5kT0spIHtcbiAgICAgICAgICAgICAgICBodHggLT0gZHggLyAyO1xuICAgICAgICAgICAgICAgIGQuYW5jaG9yID0gJ2VuZCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYW5jaG9yU3RhcnRPSykge1xuICAgICAgICAgICAgICAgIGh0eCArPSBkeCAvIDI7XG4gICAgICAgICAgICAgICAgZC5hbmNob3IgPSAnc3RhcnQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkLmFuY2hvciA9ICdtaWRkbGUnO1xuXG4gICAgICAgICAgICAgICAgdmFyIHR4SGFsZldpZHRoID0gdHhUb3RhbFdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICB2YXIgb3ZlcmZsb3dSID0gaHR4ICsgdHhIYWxmV2lkdGggLSBvdXRlcldpZHRoO1xuICAgICAgICAgICAgICAgIHZhciBvdmVyZmxvd0wgPSBodHggLSB0eEhhbGZXaWR0aDtcbiAgICAgICAgICAgICAgICBpZihvdmVyZmxvd1IgPiAwKSBodHggLT0gb3ZlcmZsb3dSO1xuICAgICAgICAgICAgICAgIGlmKG92ZXJmbG93TCA8IDApIGh0eCArPSAtb3ZlcmZsb3dMO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHguYXR0cigndGV4dC1hbmNob3InLCBkLmFuY2hvcik7XG4gICAgICAgIGlmKHR4MndpZHRoKSB0eDIuYXR0cigndGV4dC1hbmNob3InLCBkLmFuY2hvcik7XG4gICAgICAgIGcuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgaHR4ICsgJywnICsgaHR5ICsgJyknICtcbiAgICAgICAgICAgIChyb3RhdGVMYWJlbHMgPyAncm90YXRlKCcgKyBZQU5HTEUgKyAnKScgOiAnJykpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGhvdmVyTGFiZWxzO1xufVxuXG5mdW5jdGlvbiBnZXRIb3ZlckxhYmVsVGV4dChkLCBzaG93Q29tbW9uTGFiZWwsIGhvdmVybW9kZSwgZnVsbExheW91dCwgdDAsIGcpIHtcbiAgICB2YXIgbmFtZSA9ICcnO1xuICAgIHZhciB0ZXh0ID0gJyc7XG4gICAgLy8gdG8gZ2V0IGN1c3RvbSAnbmFtZScgbGFiZWxzIHBhc3MgY2xlYW5Qb2ludFxuICAgIGlmKGQubmFtZU92ZXJyaWRlICE9PSB1bmRlZmluZWQpIGQubmFtZSA9IGQubmFtZU92ZXJyaWRlO1xuXG4gICAgaWYoZC5uYW1lKSB7XG4gICAgICAgIGlmKGQudHJhY2UuX21ldGEpIHtcbiAgICAgICAgICAgIGQubmFtZSA9IExpYi50ZW1wbGF0ZVN0cmluZyhkLm5hbWUsIGQudHJhY2UuX21ldGEpO1xuICAgICAgICB9XG4gICAgICAgIG5hbWUgPSBwbGFpblRleHQoZC5uYW1lLCBkLm5hbWVMZW5ndGgpO1xuICAgIH1cblxuICAgIGlmKGQuekxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYoZC54TGFiZWwgIT09IHVuZGVmaW5lZCkgdGV4dCArPSAneDogJyArIGQueExhYmVsICsgJzxicj4nO1xuICAgICAgICBpZihkLnlMYWJlbCAhPT0gdW5kZWZpbmVkKSB0ZXh0ICs9ICd5OiAnICsgZC55TGFiZWwgKyAnPGJyPic7XG4gICAgICAgIGlmKGQudHJhY2UudHlwZSAhPT0gJ2Nob3JvcGxldGgnICYmIGQudHJhY2UudHlwZSAhPT0gJ2Nob3JvcGxldGhtYXBib3gnKSB7XG4gICAgICAgICAgICB0ZXh0ICs9ICh0ZXh0ID8gJ3o6ICcgOiAnJykgKyBkLnpMYWJlbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZihzaG93Q29tbW9uTGFiZWwgJiYgZFtob3Zlcm1vZGUuY2hhckF0KDApICsgJ0xhYmVsJ10gPT09IHQwKSB7XG4gICAgICAgIHRleHQgPSBkWyhob3Zlcm1vZGUuY2hhckF0KDApID09PSAneCcgPyAneScgOiAneCcpICsgJ0xhYmVsJ10gfHwgJyc7XG4gICAgfSBlbHNlIGlmKGQueExhYmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYoZC55TGFiZWwgIT09IHVuZGVmaW5lZCAmJiBkLnRyYWNlLnR5cGUgIT09ICdzY2F0dGVyY2FycGV0Jykge1xuICAgICAgICAgICAgdGV4dCA9IGQueUxhYmVsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKGQueUxhYmVsID09PSB1bmRlZmluZWQpIHRleHQgPSBkLnhMYWJlbDtcbiAgICBlbHNlIHRleHQgPSAnKCcgKyBkLnhMYWJlbCArICcsICcgKyBkLnlMYWJlbCArICcpJztcblxuICAgIGlmKChkLnRleHQgfHwgZC50ZXh0ID09PSAwKSAmJiAhQXJyYXkuaXNBcnJheShkLnRleHQpKSB7XG4gICAgICAgIHRleHQgKz0gKHRleHQgPyAnPGJyPicgOiAnJykgKyBkLnRleHQ7XG4gICAgfVxuXG4gICAgLy8gdXNlZCBieSBvdGhlciBtb2R1bGVzIChpbml0aWFsbHkganVzdCB0ZXJuYXJ5KSB0aGF0XG4gICAgLy8gbWFuYWdlIHRoZWlyIG93biBob3ZlcmluZm8gaW5kZXBlbmRlbnQgb2YgY2xlYW5Qb2ludFxuICAgIC8vIHRoZSByZXN0IG9mIHRoaXMgd2lsbCBzdGlsbCBhcHBseSwgc28gc3VjaCBtb2R1bGVzXG4gICAgLy8gY2FuIHN0aWxsIHB1dCB0aGluZ3MgaW4gKHh8eXx6KUxhYmVsLCB0ZXh0LCBhbmQgbmFtZVxuICAgIC8vIGFuZCBob3ZlcmluZm8gd2lsbCBzdGlsbCBkZXRlcm1pbmUgdGhlaXIgdmlzaWJpbGl0eVxuICAgIGlmKGQuZXh0cmFUZXh0ICE9PSB1bmRlZmluZWQpIHRleHQgKz0gKHRleHQgPyAnPGJyPicgOiAnJykgKyBkLmV4dHJhVGV4dDtcblxuICAgIC8vIGlmICd0ZXh0JyBpcyBlbXB0eSBhdCB0aGlzIHBvaW50LFxuICAgIC8vIGFuZCBob3ZlcnRlbXBsYXRlIGlzIG5vdCBkZWZpbmVkLFxuICAgIC8vIHB1dCAnbmFtZScgaW4gbWFpbiBsYWJlbCBhbmQgZG9uJ3Qgc2hvdyBzZWNvbmRhcnkgbGFiZWxcbiAgICBpZihnICYmIHRleHQgPT09ICcnICYmICFkLmhvdmVydGVtcGxhdGUpIHtcbiAgICAgICAgLy8gaWYgJ25hbWUnIGlzIGFsc28gZW1wdHksIHJlbW92ZSBlbnRpcmUgbGFiZWxcbiAgICAgICAgaWYobmFtZSA9PT0gJycpIGcucmVtb3ZlKCk7XG4gICAgICAgIHRleHQgPSBuYW1lO1xuICAgIH1cblxuICAgIC8vIGhvdmVydGVtcGxhdGVcbiAgICB2YXIgZDNsb2NhbGUgPSBmdWxsTGF5b3V0Ll9kM2xvY2FsZTtcbiAgICB2YXIgaG92ZXJ0ZW1wbGF0ZSA9IGQuaG92ZXJ0ZW1wbGF0ZSB8fCBmYWxzZTtcbiAgICB2YXIgaG92ZXJ0ZW1wbGF0ZUxhYmVscyA9IGQuaG92ZXJ0ZW1wbGF0ZUxhYmVscyB8fCBkO1xuICAgIHZhciBldmVudERhdGEgPSBkLmV2ZW50RGF0YVswXSB8fCB7fTtcbiAgICBpZihob3ZlcnRlbXBsYXRlKSB7XG4gICAgICAgIHRleHQgPSBMaWIuaG92ZXJ0ZW1wbGF0ZVN0cmluZyhcbiAgICAgICAgICAgIGhvdmVydGVtcGxhdGUsXG4gICAgICAgICAgICBob3ZlcnRlbXBsYXRlTGFiZWxzLFxuICAgICAgICAgICAgZDNsb2NhbGUsXG4gICAgICAgICAgICBldmVudERhdGEsXG4gICAgICAgICAgICBkLnRyYWNlLl9tZXRhXG4gICAgICAgICk7XG5cbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShFWFRSQV9TVFJJTkdfUkVHRVgsIGZ1bmN0aW9uKG1hdGNoLCBleHRyYSkge1xuICAgICAgICAgICAgLy8gYXNzaWduIG5hbWUgZm9yIHNlY29uZGFyeSB0ZXh0IGxhYmVsXG4gICAgICAgICAgICBuYW1lID0gcGxhaW5UZXh0KGV4dHJhLCBkLm5hbWVMZW5ndGgpO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gbWFpbiB0ZXh0IGxhYmVsXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gW3RleHQsIG5hbWVdO1xufVxuXG4vLyBNYWtlIGdyb3VwcyBvZiB0b3VjaGluZyBwb2ludHMsIGFuZCB3aXRoaW4gZWFjaCBncm91cFxuLy8gbW92ZSBlYWNoIHBvaW50IHNvIHRoYXQgbm8gbGFiZWxzIG92ZXJsYXAsIGJ1dCB0aGUgYXZlcmFnZVxuLy8gbGFiZWwgcG9zaXRpb24gaXMgdGhlIHNhbWUgYXMgaXQgd2FzIGJlZm9yZSBtb3ZpbmcuIEluZGljZW50YWxseSxcbi8vIHRoaXMgaXMgZXF1aXZhbGVudCB0byBzYXlpbmcgYWxsIHRoZSBsYWJlbHMgYXJlIG9uIGVxdWFsIGxpbmVhclxuLy8gc3ByaW5ncyBhYm91dCB0aGVpciBpbml0aWFsIHBvc2l0aW9uLiBJbml0aWFsbHksIGVhY2ggcG9pbnQgaXNcbi8vIGl0cyBvd24gZ3JvdXAsIGJ1dCBhcyB3ZSBmaW5kIG92ZXJsYXBzIHdlIHdpbGwgY2x1bXAgdGhlIHBvaW50cy5cbi8vXG4vLyBBbHNvLCB0aGVyZSBhcmUgaGFyZCBjb25zdHJhaW50cyBhdCB0aGUgZWRnZXMgb2YgdGhlIGdyYXBocyxcbi8vIHRoYXQgcHVzaCBhbGwgZ3JvdXBzIHRvIHRoZSBtaWRkbGUgc28gdGhleSBhcmUgdmlzaWJsZS4gSSBkb24ndFxuLy8ga25vdyB3aGF0IGhhcHBlbnMgaWYgdGhlIGdyb3VwIHNwYW5zIGFsbCB0aGUgd2F5IGZyb20gb25lIGVkZ2UgdG9cbi8vIHRoZSBvdGhlciwgdGhvdWdoIGl0IGhhcmRseSBtYXR0ZXJzIC0gdGhlcmUncyBqdXN0IHRvbyBtdWNoXG4vLyBpbmZvcm1hdGlvbiB0aGVuLlxuZnVuY3Rpb24gaG92ZXJBdm9pZE92ZXJsYXBzKGhvdmVyTGFiZWxzLCBheEtleSwgZnVsbExheW91dCkge1xuICAgIHZhciBudW1tb3ZlcyA9IDA7XG4gICAgdmFyIGF4U2lnbiA9IDE7XG4gICAgdmFyIG5MYWJlbHMgPSBob3ZlckxhYmVscy5zaXplKCk7XG5cbiAgICAvLyBtYWtlIGdyb3VwcyBvZiB0b3VjaGluZyBwb2ludHNcbiAgICB2YXIgcG9pbnRncm91cHMgPSBuZXcgQXJyYXkobkxhYmVscyk7XG4gICAgdmFyIGsgPSAwO1xuXG4gICAgaG92ZXJMYWJlbHMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBheCA9IGRbYXhLZXldO1xuICAgICAgICB2YXIgYXhJc1ggPSBheC5faWQuY2hhckF0KDApID09PSAneCc7XG4gICAgICAgIHZhciBybmcgPSBheC5yYW5nZTtcblxuICAgICAgICBpZihrID09PSAwICYmIHJuZyAmJiAoKHJuZ1swXSA+IHJuZ1sxXSkgIT09IGF4SXNYKSkge1xuICAgICAgICAgICAgYXhTaWduID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcG9pbnRncm91cHNbaysrXSA9IFt7XG4gICAgICAgICAgICBkYXR1bTogZCxcbiAgICAgICAgICAgIHRyYWNlSW5kZXg6IGQudHJhY2UuaW5kZXgsXG4gICAgICAgICAgICBkcDogMCxcbiAgICAgICAgICAgIHBvczogZC5wb3MsXG4gICAgICAgICAgICBwb3NyZWY6IGQucG9zcmVmLFxuICAgICAgICAgICAgc2l6ZTogZC5ieSAqIChheElzWCA/IFlGQUNUT1IgOiAxKSAvIDIsXG4gICAgICAgICAgICBwbWluOiAwLFxuICAgICAgICAgICAgcG1heDogKGF4SXNYID8gZnVsbExheW91dC53aWR0aCA6IGZ1bGxMYXlvdXQuaGVpZ2h0KVxuICAgICAgICB9XTtcbiAgICB9KTtcblxuICAgIHBvaW50Z3JvdXBzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gKGFbMF0ucG9zcmVmIC0gYlswXS5wb3NyZWYpIHx8XG4gICAgICAgICAgICAvLyBmb3IgZXF1YWwgcG9zaXRpb25zLCBzb3J0IHRyYWNlIGluZGljZXMgaW5jcmVhc2luZyBvciBkZWNyZWFzaW5nXG4gICAgICAgICAgICAvLyBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgYXhpcyBpcyByZXZlcnNlZCBvciBub3QuLi4gc28gc3RhY2tlZFxuICAgICAgICAgICAgLy8gdHJhY2VzIHdpbGwgZ2VuZXJhbGx5IGtlZXAgdGhlaXIgb3JkZXIgZXZlbiBpZiBvbmUgdHJhY2UgYWRkc1xuICAgICAgICAgICAgLy8gbm90aGluZyB0byB0aGUgc3RhY2suXG4gICAgICAgICAgICAoYXhTaWduICogKGJbMF0udHJhY2VJbmRleCAtIGFbMF0udHJhY2VJbmRleCkpO1xuICAgIH0pO1xuXG4gICAgdmFyIGRvbmVwb3NpdGlvbmluZywgdG9wT3ZlcmxhcCwgYm90dG9tT3ZlcmxhcCwgaSwgaiwgcHRpLCBzdW1kcDtcblxuICAgIGZ1bmN0aW9uIGNvbnN0cmFpbkdyb3VwKGdycCkge1xuICAgICAgICB2YXIgbWluUHQgPSBncnBbMF07XG4gICAgICAgIHZhciBtYXhQdCA9IGdycFtncnAubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgLy8gb3ZlcmxhcCB3aXRoIHRoZSB0b3AgLSBwb3NpdGl2ZSB2YWxzIGFyZSBvdmVybGFwc1xuICAgICAgICB0b3BPdmVybGFwID0gbWluUHQucG1pbiAtIG1pblB0LnBvcyAtIG1pblB0LmRwICsgbWluUHQuc2l6ZTtcblxuICAgICAgICAvLyBvdmVybGFwIHdpdGggdGhlIGJvdHRvbSAtIHBvc2l0aXZlIHZhbHMgYXJlIG92ZXJsYXBzXG4gICAgICAgIGJvdHRvbU92ZXJsYXAgPSBtYXhQdC5wb3MgKyBtYXhQdC5kcCArIG1heFB0LnNpemUgLSBtaW5QdC5wbWF4O1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciBtaW4gb3ZlcmxhcCBmaXJzdCwgc28gdGhhdCB3ZSBhbHdheXNcbiAgICAgICAgLy8gc2VlIHRoZSBsYXJnZXN0IGxhYmVsc1xuICAgICAgICAvLyBhbGxvdyBmb3IgLjAxcHggb3ZlcmxhcCwgc28gd2UgZG9uJ3QgZ2V0IGFuXG4gICAgICAgIC8vIGluZmluaXRlIGxvb3AgZnJvbSByb3VuZGluZyBlcnJvcnNcbiAgICAgICAgaWYodG9wT3ZlcmxhcCA+IDAuMDEpIHtcbiAgICAgICAgICAgIGZvcihqID0gZ3JwLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSBncnBbal0uZHAgKz0gdG9wT3ZlcmxhcDtcbiAgICAgICAgICAgIGRvbmVwb3NpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGJvdHRvbU92ZXJsYXAgPCAwLjAxKSByZXR1cm47XG4gICAgICAgIGlmKHRvcE92ZXJsYXAgPCAtMC4wMSkge1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlJ3JlIG5vdCBwdXNoaW5nIGJhY2sgYW5kIGZvcnRoXG4gICAgICAgICAgICBmb3IoaiA9IGdycC5sZW5ndGggLSAxOyBqID49IDA7IGotLSkgZ3JwW2pdLmRwIC09IGJvdHRvbU92ZXJsYXA7XG4gICAgICAgICAgICBkb25lcG9zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZighZG9uZXBvc2l0aW9uaW5nKSByZXR1cm47XG5cbiAgICAgICAgLy8gbm8gcm9vbSB0byBmaXggcG9zaXRpb25pbmcsIGRlbGV0ZSBvZmYtc2NyZWVuIHBvaW50c1xuXG4gICAgICAgIC8vIGZpcnN0IHNlZSBob3cgbWFueSBwb2ludHMgd2UgbmVlZCB0byBkZWxldGVcbiAgICAgICAgdmFyIGRlbGV0ZUNvdW50ID0gMDtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgZ3JwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwdGkgPSBncnBbaV07XG4gICAgICAgICAgICBpZihwdGkucG9zICsgcHRpLmRwICsgcHRpLnNpemUgPiBtaW5QdC5wbWF4KSBkZWxldGVDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RhcnQgYnkgZGVsZXRpbmcgcG9pbnRzIHdob3NlIGRhdGEgaXMgb2ZmIHNjcmVlblxuICAgICAgICBmb3IoaSA9IGdycC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYoZGVsZXRlQ291bnQgPD0gMCkgYnJlYWs7XG4gICAgICAgICAgICBwdGkgPSBncnBbaV07XG5cbiAgICAgICAgICAgIC8vIHBvcyBoYXMgYWxyZWFkeSBiZWVuIGNvbnN0cmFpbmVkIHRvIFtwbWluLHBtYXhdXG4gICAgICAgICAgICAvLyBzbyBsb29rIGZvciBwb2ludHMgY2xvc2UgdG8gdGhhdCB0byBkZWxldGVcbiAgICAgICAgICAgIGlmKHB0aS5wb3MgPiBtaW5QdC5wbWF4IC0gMSkge1xuICAgICAgICAgICAgICAgIHB0aS5kZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRlbGV0ZUNvdW50LS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgZ3JwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihkZWxldGVDb3VudCA8PSAwKSBicmVhaztcbiAgICAgICAgICAgIHB0aSA9IGdycFtpXTtcblxuICAgICAgICAgICAgLy8gcG9zIGhhcyBhbHJlYWR5IGJlZW4gY29uc3RyYWluZWQgdG8gW3BtaW4scG1heF1cbiAgICAgICAgICAgIC8vIHNvIGxvb2sgZm9yIHBvaW50cyBjbG9zZSB0byB0aGF0IHRvIGRlbGV0ZVxuICAgICAgICAgICAgaWYocHRpLnBvcyA8IG1pblB0LnBtaW4gKyAxKSB7XG4gICAgICAgICAgICAgICAgcHRpLmRlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGVsZXRlQ291bnQtLTtcblxuICAgICAgICAgICAgICAgIC8vIHNoaWZ0IHRoZSB3aG9sZSBncm91cCBtaW51cyBpbnRvIHRoaXMgbmV3IHNwYWNlXG4gICAgICAgICAgICAgICAgYm90dG9tT3ZlcmxhcCA9IHB0aS5zaXplICogMjtcbiAgICAgICAgICAgICAgICBmb3IoaiA9IGdycC5sZW5ndGggLSAxOyBqID49IDA7IGotLSkgZ3JwW2pdLmRwIC09IGJvdHRvbU92ZXJsYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlbiBkZWxldGUgcG9pbnRzIHRoYXQgZ28gb2ZmIHRoZSBib3R0b21cbiAgICAgICAgZm9yKGkgPSBncnAubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmKGRlbGV0ZUNvdW50IDw9IDApIGJyZWFrO1xuICAgICAgICAgICAgcHRpID0gZ3JwW2ldO1xuICAgICAgICAgICAgaWYocHRpLnBvcyArIHB0aS5kcCArIHB0aS5zaXplID4gbWluUHQucG1heCkge1xuICAgICAgICAgICAgICAgIHB0aS5kZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRlbGV0ZUNvdW50LS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZ3JvdXBzLCBjb21iaW5pbmcgdGhlbSBpZiB0aGV5IG92ZXJsYXAsXG4gICAgLy8gdW50aWwgbm90aGluZyBtb3Zlc1xuICAgIHdoaWxlKCFkb25lcG9zaXRpb25pbmcgJiYgbnVtbW92ZXMgPD0gbkxhYmVscykge1xuICAgICAgICAvLyB0byBhdm9pZCBpbmZpbml0ZSBsb29wcywgZG9uJ3QgbW92ZSBtb3JlIHRpbWVzXG4gICAgICAgIC8vIHRoYW4gdGhlcmUgYXJlIHRyYWNlc1xuICAgICAgICBudW1tb3ZlcysrO1xuXG4gICAgICAgIC8vIGFzc3VtZSBub3RoaW5nIHdpbGwgbW92ZSBpbiB0aGlzIGl0ZXJhdGlvbixcbiAgICAgICAgLy8gcmV2ZXJzZSB0aGlzIGlmIGl0IGRvZXNcbiAgICAgICAgZG9uZXBvc2l0aW9uaW5nID0gdHJ1ZTtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlKGkgPCBwb2ludGdyb3Vwcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAvLyB0aGUgaGlnaGVyIChnMCkgYW5kIGxvd2VyIChnMSkgcG9pbnQgZ3JvdXBcbiAgICAgICAgICAgIHZhciBnMCA9IHBvaW50Z3JvdXBzW2ldO1xuICAgICAgICAgICAgdmFyIGcxID0gcG9pbnRncm91cHNbaSArIDFdO1xuXG4gICAgICAgICAgICAvLyB0aGUgbG93ZXN0IHBvaW50IGluIHRoZSBoaWdoZXIgZ3JvdXAgKHAwKVxuICAgICAgICAgICAgLy8gdGhlIGhpZ2hlc3QgcG9pbnQgaW4gdGhlIGxvd2VyIGdyb3VwIChwMSlcbiAgICAgICAgICAgIHZhciBwMCA9IGcwW2cwLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgdmFyIHAxID0gZzFbMF07XG4gICAgICAgICAgICB0b3BPdmVybGFwID0gcDAucG9zICsgcDAuZHAgKyBwMC5zaXplIC0gcDEucG9zIC0gcDEuZHAgKyBwMS5zaXplO1xuXG4gICAgICAgICAgICAvLyBPbmx5IGdyb3VwIHBvaW50cyB0aGF0IGxpZSBvbiB0aGUgc2FtZSBheGVzXG4gICAgICAgICAgICBpZih0b3BPdmVybGFwID4gMC4wMSAmJiAocDAucG1pbiA9PT0gcDEucG1pbikgJiYgKHAwLnBtYXggPT09IHAxLnBtYXgpKSB7XG4gICAgICAgICAgICAgICAgLy8gcHVzaCB0aGUgbmV3IHBvaW50KHMpIGFkZGVkIHRvIHRoaXMgZ3JvdXAgb3V0IG9mIHRoZSB3YXlcbiAgICAgICAgICAgICAgICBmb3IoaiA9IGcxLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSBnMVtqXS5kcCArPSB0b3BPdmVybGFwO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZW0gdG8gdGhlIGdyb3VwXG4gICAgICAgICAgICAgICAgZzAucHVzaC5hcHBseShnMCwgZzEpO1xuICAgICAgICAgICAgICAgIHBvaW50Z3JvdXBzLnNwbGljZShpICsgMSwgMSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGp1c3QgZm9yIG1pbmltdW0gYXZlcmFnZSBtb3ZlbWVudFxuICAgICAgICAgICAgICAgIHN1bWRwID0gMDtcbiAgICAgICAgICAgICAgICBmb3IoaiA9IGcwLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSBzdW1kcCArPSBnMFtqXS5kcDtcbiAgICAgICAgICAgICAgICBib3R0b21PdmVybGFwID0gc3VtZHAgLyBnMC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yKGogPSBnMC5sZW5ndGggLSAxOyBqID49IDA7IGotLSkgZzBbal0uZHAgLT0gYm90dG9tT3ZlcmxhcDtcbiAgICAgICAgICAgICAgICBkb25lcG9zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSdyZSBnb2luZyBvZmYgdGhlIHBsb3Qgb24gZWl0aGVyIHNpZGUgYW5kIGZpeFxuICAgICAgICBwb2ludGdyb3Vwcy5mb3JFYWNoKGNvbnN0cmFpbkdyb3VwKTtcbiAgICB9XG5cbiAgICAvLyBub3cgcHV0IHRoZXNlIG9mZnNldHMgaW50byBob3ZlckRhdGFcbiAgICBmb3IoaSA9IHBvaW50Z3JvdXBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBncnAgPSBwb2ludGdyb3Vwc1tpXTtcbiAgICAgICAgZm9yKGogPSBncnAubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgIHZhciBwdCA9IGdycFtqXTtcbiAgICAgICAgICAgIHZhciBob3ZlclB0ID0gcHQuZGF0dW07XG4gICAgICAgICAgICBob3ZlclB0Lm9mZnNldCA9IHB0LmRwO1xuICAgICAgICAgICAgaG92ZXJQdC5kZWwgPSBwdC5kZWw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFsaWduSG92ZXJUZXh0KGhvdmVyTGFiZWxzLCByb3RhdGVMYWJlbHMpIHtcbiAgICAvLyBmaW5hbGx5IHNldCB0aGUgdGV4dCBwb3NpdGlvbmluZyByZWxhdGl2ZSB0byB0aGUgZGF0YSBhbmQgZHJhdyB0aGVcbiAgICAvLyBib3ggYXJvdW5kIGl0XG4gICAgaG92ZXJMYWJlbHMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBnID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICBpZihkLmRlbCkgcmV0dXJuIGcucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHR4ID0gZy5zZWxlY3QoJ3RleHQubnVtcycpO1xuICAgICAgICB2YXIgYW5jaG9yID0gZC5hbmNob3I7XG4gICAgICAgIHZhciBob3J6U2lnbiA9IGFuY2hvciA9PT0gJ2VuZCcgPyAtMSA6IDE7XG4gICAgICAgIHZhciBhbGlnblNoaWZ0ID0ge3N0YXJ0OiAxLCBlbmQ6IC0xLCBtaWRkbGU6IDB9W2FuY2hvcl07XG4gICAgICAgIHZhciB0eHggPSBhbGlnblNoaWZ0ICogKEhPVkVSQVJST1dTSVpFICsgSE9WRVJURVhUUEFEKTtcbiAgICAgICAgdmFyIHR4MnggPSB0eHggKyBhbGlnblNoaWZ0ICogKGQudHh3aWR0aCArIEhPVkVSVEVYVFBBRCk7XG4gICAgICAgIHZhciBvZmZzZXRYID0gMDtcbiAgICAgICAgdmFyIG9mZnNldFkgPSBkLm9mZnNldDtcblxuICAgICAgICBpZihhbmNob3IgPT09ICdtaWRkbGUnKSB7XG4gICAgICAgICAgICB0eHggLT0gZC50eDJ3aWR0aCAvIDI7XG4gICAgICAgICAgICB0eDJ4ICs9IGQudHh3aWR0aCAvIDIgKyBIT1ZFUlRFWFRQQUQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYocm90YXRlTGFiZWxzKSB7XG4gICAgICAgICAgICBvZmZzZXRZICo9IC1ZU0hJRlRZO1xuICAgICAgICAgICAgb2Zmc2V0WCA9IGQub2Zmc2V0ICogWVNISUZUWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGcuc2VsZWN0KCdwYXRoJykuYXR0cignZCcsIGFuY2hvciA9PT0gJ21pZGRsZScgP1xuICAgICAgICAgICAgLy8gbWlkZGxlIGFsaWduZWQ6IHJlY3QgY2VudGVyZWQgb24gZGF0YVxuICAgICAgICAgICAgKCdNLScgKyAoZC5ieCAvIDIgKyBkLnR4MndpZHRoIC8gMikgKyAnLCcgKyAob2Zmc2V0WSAtIGQuYnkgLyAyKSArXG4gICAgICAgICAgICAgICdoJyArIGQuYnggKyAndicgKyBkLmJ5ICsgJ2gtJyArIGQuYnggKyAnWicpIDpcbiAgICAgICAgICAgIC8vIGxlZnQgb3IgcmlnaHQgYWxpZ25lZDogc2lkZSByZWN0IHdpdGggYXJyb3cgdG8gZGF0YVxuICAgICAgICAgICAgKCdNMCwwTCcgKyAoaG9yelNpZ24gKiBIT1ZFUkFSUk9XU0laRSArIG9mZnNldFgpICsgJywnICsgKEhPVkVSQVJST1dTSVpFICsgb2Zmc2V0WSkgK1xuICAgICAgICAgICAgICAgICd2JyArIChkLmJ5IC8gMiAtIEhPVkVSQVJST1dTSVpFKSArXG4gICAgICAgICAgICAgICAgJ2gnICsgKGhvcnpTaWduICogZC5ieCkgK1xuICAgICAgICAgICAgICAgICd2LScgKyBkLmJ5ICtcbiAgICAgICAgICAgICAgICAnSCcgKyAoaG9yelNpZ24gKiBIT1ZFUkFSUk9XU0laRSArIG9mZnNldFgpICtcbiAgICAgICAgICAgICAgICAnVicgKyAob2Zmc2V0WSAtIEhPVkVSQVJST1dTSVpFKSArXG4gICAgICAgICAgICAgICAgJ1onKSk7XG5cbiAgICAgICAgdmFyIHBvc1ggPSB0eHggKyBvZmZzZXRYO1xuICAgICAgICB2YXIgcG9zWSA9IG9mZnNldFkgKyBkLnR5MCAtIGQuYnkgLyAyICsgSE9WRVJURVhUUEFEO1xuICAgICAgICB2YXIgdGV4dEFsaWduID0gZC50ZXh0QWxpZ24gfHwgJ2F1dG8nO1xuXG4gICAgICAgIGlmKHRleHRBbGlnbiAhPT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICBpZih0ZXh0QWxpZ24gPT09ICdsZWZ0JyAmJiBhbmNob3IgIT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICB0eC5hdHRyKCd0ZXh0LWFuY2hvcicsICdzdGFydCcpO1xuICAgICAgICAgICAgICAgIHBvc1ggPSBhbmNob3IgPT09ICdtaWRkbGUnID9cbiAgICAgICAgICAgICAgICAgICAgLWQuYnggLyAyIC0gZC50eDJ3aWR0aCAvIDIgKyBIT1ZFUlRFWFRQQUQgOlxuICAgICAgICAgICAgICAgICAgICAtZC5ieCAtIEhPVkVSVEVYVFBBRDtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0ZXh0QWxpZ24gPT09ICdyaWdodCcgJiYgYW5jaG9yICE9PSAnZW5kJykge1xuICAgICAgICAgICAgICAgIHR4LmF0dHIoJ3RleHQtYW5jaG9yJywgJ2VuZCcpO1xuICAgICAgICAgICAgICAgIHBvc1ggPSBhbmNob3IgPT09ICdtaWRkbGUnID9cbiAgICAgICAgICAgICAgICAgICAgZC5ieCAvIDIgLSBkLnR4MndpZHRoIC8gMiAtIEhPVkVSVEVYVFBBRCA6XG4gICAgICAgICAgICAgICAgICAgIGQuYnggKyBIT1ZFUlRFWFRQQUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0eC5jYWxsKHN2Z1RleHRVdGlscy5wb3NpdGlvblRleHQsIHBvc1gsIHBvc1kpO1xuXG4gICAgICAgIGlmKGQudHgyd2lkdGgpIHtcbiAgICAgICAgICAgIGcuc2VsZWN0KCd0ZXh0Lm5hbWUnKVxuICAgICAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5wb3NpdGlvblRleHQsXG4gICAgICAgICAgICAgICAgICAgIHR4MnggKyBhbGlnblNoaWZ0ICogSE9WRVJURVhUUEFEICsgb2Zmc2V0WCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSArIGQudHkwIC0gZC5ieSAvIDIgKyBIT1ZFUlRFWFRQQUQpO1xuICAgICAgICAgICAgZy5zZWxlY3QoJ3JlY3QnKVxuICAgICAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuc2V0UmVjdCxcbiAgICAgICAgICAgICAgICAgICAgdHgyeCArIChhbGlnblNoaWZ0IC0gMSkgKiBkLnR4MndpZHRoIC8gMiArIG9mZnNldFgsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgLSBkLmJ5IC8gMiAtIDEsXG4gICAgICAgICAgICAgICAgICAgIGQudHgyd2lkdGgsIGQuYnkgKyAyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjbGVhblBvaW50KGQsIGhvdmVybW9kZSkge1xuICAgIHZhciBpbmRleCA9IGQuaW5kZXg7XG4gICAgdmFyIHRyYWNlID0gZC50cmFjZSB8fCB7fTtcbiAgICB2YXIgY2QwID0gZC5jZFswXTtcbiAgICB2YXIgY2QgPSBkLmNkW2luZGV4XSB8fCB7fTtcblxuICAgIGZ1bmN0aW9uIHBhc3Modikge1xuICAgICAgICByZXR1cm4gdiB8fCAoaXNOdW1lcmljKHYpICYmIHYgPT09IDApO1xuICAgIH1cblxuICAgIHZhciBnZXRWYWwgPSBBcnJheS5pc0FycmF5KGluZGV4KSA/XG4gICAgICAgIGZ1bmN0aW9uKGNhbGNLZXksIHRyYWNlS2V5KSB7XG4gICAgICAgICAgICB2YXIgdiA9IExpYi5jYXN0T3B0aW9uKGNkMCwgaW5kZXgsIGNhbGNLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHBhc3ModikgPyB2IDogTGliLmV4dHJhY3RPcHRpb24oe30sIHRyYWNlLCAnJywgdHJhY2VLZXkpO1xuICAgICAgICB9IDpcbiAgICAgICAgZnVuY3Rpb24oY2FsY0tleSwgdHJhY2VLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBMaWIuZXh0cmFjdE9wdGlvbihjZCwgdHJhY2UsIGNhbGNLZXksIHRyYWNlS2V5KTtcbiAgICAgICAgfTtcblxuICAgIGZ1bmN0aW9uIGZpbGwoa2V5LCBjYWxjS2V5LCB0cmFjZUtleSkge1xuICAgICAgICB2YXIgdmFsID0gZ2V0VmFsKGNhbGNLZXksIHRyYWNlS2V5KTtcbiAgICAgICAgaWYocGFzcyh2YWwpKSBkW2tleV0gPSB2YWw7XG4gICAgfVxuXG4gICAgZmlsbCgnaG92ZXJpbmZvJywgJ2hpJywgJ2hvdmVyaW5mbycpO1xuICAgIGZpbGwoJ2JnY29sb3InLCAnaGJnJywgJ2hvdmVybGFiZWwuYmdjb2xvcicpO1xuICAgIGZpbGwoJ2JvcmRlckNvbG9yJywgJ2hiYycsICdob3ZlcmxhYmVsLmJvcmRlcmNvbG9yJyk7XG4gICAgZmlsbCgnZm9udEZhbWlseScsICdodGYnLCAnaG92ZXJsYWJlbC5mb250LmZhbWlseScpO1xuICAgIGZpbGwoJ2ZvbnRTaXplJywgJ2h0cycsICdob3ZlcmxhYmVsLmZvbnQuc2l6ZScpO1xuICAgIGZpbGwoJ2ZvbnRDb2xvcicsICdodGMnLCAnaG92ZXJsYWJlbC5mb250LmNvbG9yJyk7XG4gICAgZmlsbCgnbmFtZUxlbmd0aCcsICdobmwnLCAnaG92ZXJsYWJlbC5uYW1lbGVuZ3RoJyk7XG4gICAgZmlsbCgndGV4dEFsaWduJywgJ2h0YScsICdob3ZlcmxhYmVsLmFsaWduJyk7XG5cbiAgICBkLnBvc3JlZiA9IChob3Zlcm1vZGUgPT09ICd5JyB8fCAoaG92ZXJtb2RlID09PSAnY2xvc2VzdCcgJiYgdHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykpID9cbiAgICAgICAgKGQueGEuX29mZnNldCArIChkLngwICsgZC54MSkgLyAyKSA6XG4gICAgICAgIChkLnlhLl9vZmZzZXQgKyAoZC55MCArIGQueTEpIC8gMik7XG5cbiAgICAvLyB0aGVuIGNvbnN0cmFpbiBhbGwgdGhlIHBvc2l0aW9ucyB0byBiZSBvbiB0aGUgcGxvdFxuICAgIGQueDAgPSBMaWIuY29uc3RyYWluKGQueDAsIDAsIGQueGEuX2xlbmd0aCk7XG4gICAgZC54MSA9IExpYi5jb25zdHJhaW4oZC54MSwgMCwgZC54YS5fbGVuZ3RoKTtcbiAgICBkLnkwID0gTGliLmNvbnN0cmFpbihkLnkwLCAwLCBkLnlhLl9sZW5ndGgpO1xuICAgIGQueTEgPSBMaWIuY29uc3RyYWluKGQueTEsIDAsIGQueWEuX2xlbmd0aCk7XG5cbiAgICAvLyBhbmQgY29udmVydCB0aGUgeCBhbmQgeSBsYWJlbCB2YWx1ZXMgaW50byBmb3JtYXR0ZWQgdGV4dFxuICAgIGlmKGQueExhYmVsVmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZC54TGFiZWwgPSAoJ3hMYWJlbCcgaW4gZCkgPyBkLnhMYWJlbCA6IEF4ZXMuaG92ZXJMYWJlbFRleHQoZC54YSwgZC54TGFiZWxWYWwpO1xuICAgICAgICBkLnhWYWwgPSBkLnhhLmMyZChkLnhMYWJlbFZhbCk7XG4gICAgfVxuICAgIGlmKGQueUxhYmVsVmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZC55TGFiZWwgPSAoJ3lMYWJlbCcgaW4gZCkgPyBkLnlMYWJlbCA6IEF4ZXMuaG92ZXJMYWJlbFRleHQoZC55YSwgZC55TGFiZWxWYWwpO1xuICAgICAgICBkLnlWYWwgPSBkLnlhLmMyZChkLnlMYWJlbFZhbCk7XG4gICAgfVxuXG4gICAgLy8gVHJhY2VzIGxpa2UgaGVhdG1hcHMgZ2VuZXJhdGUgdGhlIHpMYWJlbCBpbiB0aGVpciBob3ZlclBvaW50cyBmdW5jdGlvblxuICAgIGlmKGQuekxhYmVsVmFsICE9PSB1bmRlZmluZWQgJiYgZC56TGFiZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkLnpMYWJlbCA9IFN0cmluZyhkLnpMYWJlbFZhbCk7XG4gICAgfVxuXG4gICAgLy8gZm9yIGJveCBtZWFucyBhbmQgZXJyb3IgYmFycywgYWRkIHRoZSByYW5nZSB0byB0aGUgbGFiZWxcbiAgICBpZighaXNOYU4oZC54ZXJyKSAmJiAhKGQueGEudHlwZSA9PT0gJ2xvZycgJiYgZC54ZXJyIDw9IDApKSB7XG4gICAgICAgIHZhciB4ZVRleHQgPSBBeGVzLnRpY2tUZXh0KGQueGEsIGQueGEuYzJsKGQueGVyciksICdob3ZlcicpLnRleHQ7XG4gICAgICAgIGlmKGQueGVycm5lZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkLnhMYWJlbCArPSAnICsnICsgeGVUZXh0ICsgJyAvIC0nICtcbiAgICAgICAgICAgICAgICBBeGVzLnRpY2tUZXh0KGQueGEsIGQueGEuYzJsKGQueGVycm5lZyksICdob3ZlcicpLnRleHQ7XG4gICAgICAgIH0gZWxzZSBkLnhMYWJlbCArPSAnIMKxICcgKyB4ZVRleHQ7XG5cbiAgICAgICAgLy8gc21hbGwgZGlzdGFuY2UgcGVuYWx0eSBmb3IgZXJyb3IgYmFycywgc28gdGhhdCBpZiB0aGVyZSBhcmVcbiAgICAgICAgLy8gdHJhY2VzIHdpdGggZXJyb3JzIGFuZCBzb21lIHdpdGhvdXQsIHRoZSBlcnJvciBiYXIgbGFiZWwgd2lsbFxuICAgICAgICAvLyBob2lzdCB1cCB0byB0aGUgcG9pbnRcbiAgICAgICAgaWYoaG92ZXJtb2RlID09PSAneCcpIGQuZGlzdGFuY2UgKz0gMTtcbiAgICB9XG4gICAgaWYoIWlzTmFOKGQueWVycikgJiYgIShkLnlhLnR5cGUgPT09ICdsb2cnICYmIGQueWVyciA8PSAwKSkge1xuICAgICAgICB2YXIgeWVUZXh0ID0gQXhlcy50aWNrVGV4dChkLnlhLCBkLnlhLmMybChkLnllcnIpLCAnaG92ZXInKS50ZXh0O1xuICAgICAgICBpZihkLnllcnJuZWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZC55TGFiZWwgKz0gJyArJyArIHllVGV4dCArICcgLyAtJyArXG4gICAgICAgICAgICAgICAgQXhlcy50aWNrVGV4dChkLnlhLCBkLnlhLmMybChkLnllcnJuZWcpLCAnaG92ZXInKS50ZXh0O1xuICAgICAgICB9IGVsc2UgZC55TGFiZWwgKz0gJyDCsSAnICsgeWVUZXh0O1xuXG4gICAgICAgIGlmKGhvdmVybW9kZSA9PT0gJ3knKSBkLmRpc3RhbmNlICs9IDE7XG4gICAgfVxuXG4gICAgdmFyIGluZm9tb2RlID0gZC5ob3ZlcmluZm8gfHwgZC50cmFjZS5ob3ZlcmluZm87XG5cbiAgICBpZihpbmZvbW9kZSAmJiBpbmZvbW9kZSAhPT0gJ2FsbCcpIHtcbiAgICAgICAgaW5mb21vZGUgPSBBcnJheS5pc0FycmF5KGluZm9tb2RlKSA/IGluZm9tb2RlIDogaW5mb21vZGUuc3BsaXQoJysnKTtcbiAgICAgICAgaWYoaW5mb21vZGUuaW5kZXhPZigneCcpID09PSAtMSkgZC54TGFiZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmKGluZm9tb2RlLmluZGV4T2YoJ3knKSA9PT0gLTEpIGQueUxhYmVsID0gdW5kZWZpbmVkO1xuICAgICAgICBpZihpbmZvbW9kZS5pbmRleE9mKCd6JykgPT09IC0xKSBkLnpMYWJlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYoaW5mb21vZGUuaW5kZXhPZigndGV4dCcpID09PSAtMSkgZC50ZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICBpZihpbmZvbW9kZS5pbmRleE9mKCduYW1lJykgPT09IC0xKSBkLm5hbWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNwaWtlbGluZXMoZ2QsIGNsb3Nlc3RQb2ludHMsIG9wdHMpIHtcbiAgICB2YXIgY29udGFpbmVyID0gb3B0cy5jb250YWluZXI7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBvcHRzLmZ1bGxMYXlvdXQ7XG4gICAgdmFyIGdzID0gZnVsbExheW91dC5fc2l6ZTtcbiAgICB2YXIgZXZ0ID0gb3B0cy5ldmVudDtcbiAgICB2YXIgc2hvd1kgPSAhIWNsb3Nlc3RQb2ludHMuaExpbmVQb2ludDtcbiAgICB2YXIgc2hvd1ggPSAhIWNsb3Nlc3RQb2ludHMudkxpbmVQb2ludDtcblxuICAgIHZhciB4YSwgeWE7XG5cbiAgICAvLyBSZW1vdmUgb2xkIHNwaWtlbGluZSBpdGVtc1xuICAgIGNvbnRhaW5lci5zZWxlY3RBbGwoJy5zcGlrZWxpbmUnKS5yZW1vdmUoKTtcblxuICAgIGlmKCEoc2hvd1ggfHwgc2hvd1kpKSByZXR1cm47XG5cbiAgICB2YXIgY29udHJhc3RDb2xvciA9IENvbG9yLmNvbWJpbmUoZnVsbExheW91dC5wbG90X2JnY29sb3IsIGZ1bGxMYXlvdXQucGFwZXJfYmdjb2xvcik7XG5cbiAgICAvLyBIb3Jpem9udGFsIGxpbmUgKHRvIHktYXhpcylcbiAgICBpZihzaG93WSkge1xuICAgICAgICB2YXIgaExpbmVQb2ludCA9IGNsb3Nlc3RQb2ludHMuaExpbmVQb2ludDtcbiAgICAgICAgdmFyIGhMaW5lUG9pbnRYLCBoTGluZVBvaW50WTtcblxuICAgICAgICB4YSA9IGhMaW5lUG9pbnQgJiYgaExpbmVQb2ludC54YTtcbiAgICAgICAgeWEgPSBoTGluZVBvaW50ICYmIGhMaW5lUG9pbnQueWE7XG4gICAgICAgIHZhciB5U25hcCA9IHlhLnNwaWtlc25hcDtcblxuICAgICAgICBpZih5U25hcCA9PT0gJ2N1cnNvcicpIHtcbiAgICAgICAgICAgIGhMaW5lUG9pbnRYID0gZXZ0LnBvaW50ZXJYO1xuICAgICAgICAgICAgaExpbmVQb2ludFkgPSBldnQucG9pbnRlclk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoTGluZVBvaW50WCA9IHhhLl9vZmZzZXQgKyBoTGluZVBvaW50Lng7XG4gICAgICAgICAgICBoTGluZVBvaW50WSA9IHlhLl9vZmZzZXQgKyBoTGluZVBvaW50Lnk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRmbHRITGluZUNvbG9yID0gdGlueWNvbG9yLnJlYWRhYmlsaXR5KGhMaW5lUG9pbnQuY29sb3IsIGNvbnRyYXN0Q29sb3IpIDwgMS41ID9cbiAgICAgICAgICAgIENvbG9yLmNvbnRyYXN0KGNvbnRyYXN0Q29sb3IpIDogaExpbmVQb2ludC5jb2xvcjtcbiAgICAgICAgdmFyIHlNb2RlID0geWEuc3Bpa2Vtb2RlO1xuICAgICAgICB2YXIgeVRoaWNrbmVzcyA9IHlhLnNwaWtldGhpY2tuZXNzO1xuICAgICAgICB2YXIgeUNvbG9yID0geWEuc3Bpa2Vjb2xvciB8fCBkZmx0SExpbmVDb2xvcjtcbiAgICAgICAgdmFyIHhFZGdlID0gQXhlcy5nZXRQeFBvc2l0aW9uKGdkLCB5YSk7XG4gICAgICAgIHZhciB4QmFzZSwgeEVuZFNwaWtlO1xuXG4gICAgICAgIGlmKHlNb2RlLmluZGV4T2YoJ3RvYXhpcycpICE9PSAtMSB8fCB5TW9kZS5pbmRleE9mKCdhY3Jvc3MnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmKHlNb2RlLmluZGV4T2YoJ3RvYXhpcycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHhCYXNlID0geEVkZ2U7XG4gICAgICAgICAgICAgICAgeEVuZFNwaWtlID0gaExpbmVQb2ludFg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih5TW9kZS5pbmRleE9mKCdhY3Jvc3MnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB2YXIgeEFjcm9zczAgPSB5YS5fY291bnRlckRvbWFpbk1pbjtcbiAgICAgICAgICAgICAgICB2YXIgeEFjcm9zczEgPSB5YS5fY291bnRlckRvbWFpbk1heDtcbiAgICAgICAgICAgICAgICBpZih5YS5hbmNob3IgPT09ICdmcmVlJykge1xuICAgICAgICAgICAgICAgICAgICB4QWNyb3NzMCA9IE1hdGgubWluKHhBY3Jvc3MwLCB5YS5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHhBY3Jvc3MxID0gTWF0aC5tYXgoeEFjcm9zczEsIHlhLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeEJhc2UgPSBncy5sICsgeEFjcm9zczAgKiBncy53O1xuICAgICAgICAgICAgICAgIHhFbmRTcGlrZSA9IGdzLmwgKyB4QWNyb3NzMSAqIGdzLnc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZvcmVncm91bmQgaG9yaXpvbnRhbCBsaW5lICh0byB5LWF4aXMpXG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0KCdsaW5lJywgJzpmaXJzdC1jaGlsZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICB4MTogeEJhc2UsXG4gICAgICAgICAgICAgICAgICAgIHgyOiB4RW5kU3Bpa2UsXG4gICAgICAgICAgICAgICAgICAgIHkxOiBoTGluZVBvaW50WSxcbiAgICAgICAgICAgICAgICAgICAgeTI6IGhMaW5lUG9pbnRZLFxuICAgICAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogeVRoaWNrbmVzcyxcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiB5Q29sb3IsXG4gICAgICAgICAgICAgICAgICAgICdzdHJva2UtZGFzaGFycmF5JzogRHJhd2luZy5kYXNoU3R5bGUoeWEuc3Bpa2VkYXNoLCB5VGhpY2tuZXNzKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3NwaWtlbGluZScsIHRydWUpXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2NyaXNwJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIEJhY2tncm91bmQgaG9yaXpvbnRhbCBMaW5lICh0byB5LWF4aXMpXG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0KCdsaW5lJywgJzpmaXJzdC1jaGlsZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICB4MTogeEJhc2UsXG4gICAgICAgICAgICAgICAgICAgIHgyOiB4RW5kU3Bpa2UsXG4gICAgICAgICAgICAgICAgICAgIHkxOiBoTGluZVBvaW50WSxcbiAgICAgICAgICAgICAgICAgICAgeTI6IGhMaW5lUG9pbnRZLFxuICAgICAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogeVRoaWNrbmVzcyArIDIsXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogY29udHJhc3RDb2xvclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3NwaWtlbGluZScsIHRydWUpXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2NyaXNwJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gWSBheGlzIG1hcmtlclxuICAgICAgICBpZih5TW9kZS5pbmRleE9mKCdtYXJrZXInKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnQoJ2NpcmNsZScsICc6Zmlyc3QtY2hpbGQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgY3g6IHhFZGdlICsgKHlhLnNpZGUgIT09ICdyaWdodCcgPyB5VGhpY2tuZXNzIDogLXlUaGlja25lc3MpLFxuICAgICAgICAgICAgICAgICAgICBjeTogaExpbmVQb2ludFksXG4gICAgICAgICAgICAgICAgICAgIHI6IHlUaGlja25lc3MsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHlDb2xvclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3NwaWtlbGluZScsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoc2hvd1gpIHtcbiAgICAgICAgdmFyIHZMaW5lUG9pbnQgPSBjbG9zZXN0UG9pbnRzLnZMaW5lUG9pbnQ7XG4gICAgICAgIHZhciB2TGluZVBvaW50WCwgdkxpbmVQb2ludFk7XG5cbiAgICAgICAgeGEgPSB2TGluZVBvaW50ICYmIHZMaW5lUG9pbnQueGE7XG4gICAgICAgIHlhID0gdkxpbmVQb2ludCAmJiB2TGluZVBvaW50LnlhO1xuICAgICAgICB2YXIgeFNuYXAgPSB4YS5zcGlrZXNuYXA7XG5cbiAgICAgICAgaWYoeFNuYXAgPT09ICdjdXJzb3InKSB7XG4gICAgICAgICAgICB2TGluZVBvaW50WCA9IGV2dC5wb2ludGVyWDtcbiAgICAgICAgICAgIHZMaW5lUG9pbnRZID0gZXZ0LnBvaW50ZXJZO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdkxpbmVQb2ludFggPSB4YS5fb2Zmc2V0ICsgdkxpbmVQb2ludC54O1xuICAgICAgICAgICAgdkxpbmVQb2ludFkgPSB5YS5fb2Zmc2V0ICsgdkxpbmVQb2ludC55O1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZmx0VkxpbmVDb2xvciA9IHRpbnljb2xvci5yZWFkYWJpbGl0eSh2TGluZVBvaW50LmNvbG9yLCBjb250cmFzdENvbG9yKSA8IDEuNSA/XG4gICAgICAgICAgICBDb2xvci5jb250cmFzdChjb250cmFzdENvbG9yKSA6IHZMaW5lUG9pbnQuY29sb3I7XG4gICAgICAgIHZhciB4TW9kZSA9IHhhLnNwaWtlbW9kZTtcbiAgICAgICAgdmFyIHhUaGlja25lc3MgPSB4YS5zcGlrZXRoaWNrbmVzcztcbiAgICAgICAgdmFyIHhDb2xvciA9IHhhLnNwaWtlY29sb3IgfHwgZGZsdFZMaW5lQ29sb3I7XG4gICAgICAgIHZhciB5RWRnZSA9IEF4ZXMuZ2V0UHhQb3NpdGlvbihnZCwgeGEpO1xuICAgICAgICB2YXIgeUJhc2UsIHlFbmRTcGlrZTtcblxuICAgICAgICBpZih4TW9kZS5pbmRleE9mKCd0b2F4aXMnKSAhPT0gLTEgfHwgeE1vZGUuaW5kZXhPZignYWNyb3NzJykgIT09IC0xKSB7XG4gICAgICAgICAgICBpZih4TW9kZS5pbmRleE9mKCd0b2F4aXMnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB5QmFzZSA9IHlFZGdlO1xuICAgICAgICAgICAgICAgIHlFbmRTcGlrZSA9IHZMaW5lUG9pbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeE1vZGUuaW5kZXhPZignYWNyb3NzJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFyIHlBY3Jvc3MwID0geGEuX2NvdW50ZXJEb21haW5NaW47XG4gICAgICAgICAgICAgICAgdmFyIHlBY3Jvc3MxID0geGEuX2NvdW50ZXJEb21haW5NYXg7XG4gICAgICAgICAgICAgICAgaWYoeGEuYW5jaG9yID09PSAnZnJlZScpIHtcbiAgICAgICAgICAgICAgICAgICAgeUFjcm9zczAgPSBNYXRoLm1pbih5QWNyb3NzMCwgeGEucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB5QWNyb3NzMSA9IE1hdGgubWF4KHlBY3Jvc3MxLCB4YS5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHlCYXNlID0gZ3MudCArICgxIC0geUFjcm9zczEpICogZ3MuaDtcbiAgICAgICAgICAgICAgICB5RW5kU3Bpa2UgPSBncy50ICsgKDEgLSB5QWNyb3NzMCkgKiBncy5oO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGb3JlZ3JvdW5kIHZlcnRpY2FsIGxpbmUgKHRvIHgtYXhpcylcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnQoJ2xpbmUnLCAnOmZpcnN0LWNoaWxkJylcbiAgICAgICAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIHgxOiB2TGluZVBvaW50WCxcbiAgICAgICAgICAgICAgICAgICAgeDI6IHZMaW5lUG9pbnRYLFxuICAgICAgICAgICAgICAgICAgICB5MTogeUJhc2UsXG4gICAgICAgICAgICAgICAgICAgIHkyOiB5RW5kU3Bpa2UsXG4gICAgICAgICAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiB4VGhpY2tuZXNzLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2U6IHhDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiBEcmF3aW5nLmRhc2hTdHlsZSh4YS5zcGlrZWRhc2gsIHhUaGlja25lc3MpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnc3Bpa2VsaW5lJywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnY3Jpc3AnLCB0cnVlKTtcblxuICAgICAgICAgICAgLy8gQmFja2dyb3VuZCB2ZXJ0aWNhbCBsaW5lICh0byB4LWF4aXMpXG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0KCdsaW5lJywgJzpmaXJzdC1jaGlsZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICB4MTogdkxpbmVQb2ludFgsXG4gICAgICAgICAgICAgICAgICAgIHgyOiB2TGluZVBvaW50WCxcbiAgICAgICAgICAgICAgICAgICAgeTE6IHlCYXNlLFxuICAgICAgICAgICAgICAgICAgICB5MjogeUVuZFNwaWtlLFxuICAgICAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogeFRoaWNrbmVzcyArIDIsXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogY29udHJhc3RDb2xvclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3NwaWtlbGluZScsIHRydWUpXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2NyaXNwJywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBYIGF4aXMgbWFya2VyXG4gICAgICAgIGlmKHhNb2RlLmluZGV4T2YoJ21hcmtlcicpICE9PSAtMSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmluc2VydCgnY2lyY2xlJywgJzpmaXJzdC1jaGlsZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICBjeDogdkxpbmVQb2ludFgsXG4gICAgICAgICAgICAgICAgICAgIGN5OiB5RWRnZSAtICh4YS5zaWRlICE9PSAndG9wJyA/IHhUaGlja25lc3MgOiAteFRoaWNrbmVzcyksXG4gICAgICAgICAgICAgICAgICAgIHI6IHhUaGlja25lc3MsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6IHhDb2xvclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3NwaWtlbGluZScsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBob3ZlckNoYW5nZWQoZ2QsIGV2dCwgb2xkaG92ZXJkYXRhKSB7XG4gICAgLy8gZG9uJ3QgZW1pdCBhbnkgZXZlbnRzIGlmIG5vdGhpbmcgY2hhbmdlZFxuICAgIGlmKCFvbGRob3ZlcmRhdGEgfHwgb2xkaG92ZXJkYXRhLmxlbmd0aCAhPT0gZ2QuX2hvdmVyZGF0YS5sZW5ndGgpIHJldHVybiB0cnVlO1xuXG4gICAgZm9yKHZhciBpID0gb2xkaG92ZXJkYXRhLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBvbGRQdCA9IG9sZGhvdmVyZGF0YVtpXTtcbiAgICAgICAgdmFyIG5ld1B0ID0gZ2QuX2hvdmVyZGF0YVtpXTtcblxuICAgICAgICBpZihvbGRQdC5jdXJ2ZU51bWJlciAhPT0gbmV3UHQuY3VydmVOdW1iZXIgfHxcbiAgICAgICAgICAgIFN0cmluZyhvbGRQdC5wb2ludE51bWJlcikgIT09IFN0cmluZyhuZXdQdC5wb2ludE51bWJlcikgfHxcbiAgICAgICAgICAgIFN0cmluZyhvbGRQdC5wb2ludE51bWJlcnMpICE9PSBTdHJpbmcobmV3UHQucG9pbnROdW1iZXJzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc3Bpa2VzQ2hhbmdlZChnZCwgb2xkc3Bpa2Vwb2ludHMpIHtcbiAgICAvLyBkb24ndCByZWxheW91dCB0aGUgcGxvdCBiZWNhdXNlIG9mIG5ldyBzcGlrZWxpbmVzIGlmIHNwaWtlbGluZXMgcG9pbnRzIGRpZG4ndCBjaGFuZ2VcbiAgICBpZighb2xkc3Bpa2Vwb2ludHMpIHJldHVybiB0cnVlO1xuICAgIGlmKG9sZHNwaWtlcG9pbnRzLnZMaW5lUG9pbnQgIT09IGdkLl9zcGlrZXBvaW50cy52TGluZVBvaW50IHx8XG4gICAgICAgIG9sZHNwaWtlcG9pbnRzLmhMaW5lUG9pbnQgIT09IGdkLl9zcGlrZXBvaW50cy5oTGluZVBvaW50XG4gICAgKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHBsYWluVGV4dChzLCBsZW4pIHtcbiAgICByZXR1cm4gc3ZnVGV4dFV0aWxzLnBsYWluVGV4dChzIHx8ICcnLCB7XG4gICAgICAgIGxlbjogbGVuLFxuICAgICAgICBhbGxvd2VkVGFnczogWydicicsICdzdWInLCAnc3VwJywgJ2InLCAnaScsICdlbSddXG4gICAgfSk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uL2NvbG9yJyk7XG52YXIgaXNVbmlmaWVkSG92ZXIgPSByZXF1aXJlKCcuL2hlbHBlcnMnKS5pc1VuaWZpZWRIb3ZlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVIb3ZlckxhYmVsRGVmYXVsdHMoY29udEluLCBjb250T3V0LCBjb2VyY2UsIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgIGZ1bmN0aW9uIGluaGVyaXRGb250QXR0cihhdHRyKSB7XG4gICAgICAgIGlmKCFvcHRzLmZvbnRbYXR0cl0pIHtcbiAgICAgICAgICAgIG9wdHMuZm9udFthdHRyXSA9IGNvbnRPdXQubGVnZW5kID8gY29udE91dC5sZWdlbmQuZm9udFthdHRyXSA6IGNvbnRPdXQuZm9udFthdHRyXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluIHVuaWZpZWQgaG92ZXIsIGluaGVyaXQgZnJvbSBsYXlvdXQubGVnZW5kIGlmIGF2YWlsYWJsZSBvciBsYXlvdXRcbiAgICBpZihjb250T3V0ICYmIGlzVW5pZmllZEhvdmVyKGNvbnRPdXQuaG92ZXJtb2RlKSkge1xuICAgICAgICBpZighb3B0cy5mb250KSBvcHRzLmZvbnQgPSB7fTtcbiAgICAgICAgaW5oZXJpdEZvbnRBdHRyKCdzaXplJyk7XG4gICAgICAgIGluaGVyaXRGb250QXR0cignZmFtaWx5Jyk7XG4gICAgICAgIGluaGVyaXRGb250QXR0cignY29sb3InKTtcblxuICAgICAgICBpZihjb250T3V0LmxlZ2VuZCkge1xuICAgICAgICAgICAgaWYoIW9wdHMuYmdjb2xvcikgb3B0cy5iZ2NvbG9yID0gQ29sb3IuY29tYmluZShjb250T3V0LmxlZ2VuZC5iZ2NvbG9yLCBjb250T3V0LnBhcGVyX2JnY29sb3IpO1xuICAgICAgICAgICAgaWYoIW9wdHMuYm9yZGVyY29sb3IpIG9wdHMuYm9yZGVyY29sb3IgPSBjb250T3V0LmxlZ2VuZC5ib3JkZXJjb2xvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKCFvcHRzLmJnY29sb3IpIG9wdHMuYmdjb2xvciA9IGNvbnRPdXQucGFwZXJfYmdjb2xvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvZXJjZSgnaG92ZXJsYWJlbC5iZ2NvbG9yJywgb3B0cy5iZ2NvbG9yKTtcbiAgICBjb2VyY2UoJ2hvdmVybGFiZWwuYm9yZGVyY29sb3InLCBvcHRzLmJvcmRlcmNvbG9yKTtcbiAgICBjb2VyY2UoJ2hvdmVybGFiZWwubmFtZWxlbmd0aCcsIG9wdHMubmFtZWxlbmd0aCk7XG4gICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAnaG92ZXJsYWJlbC5mb250Jywgb3B0cy5mb250KTtcbiAgICBjb2VyY2UoJ2hvdmVybGFiZWwuYWxpZ24nLCBvcHRzLmFsaWduKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBsYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZUhvdmVyTW9kZURlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhKSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgLy8gZG9uJ3QgY29lcmNlIGlmIGl0IGlzIGFscmVhZHkgY29lcmNlZCBpbiBvdGhlciBwbGFjZSBlLmcuIGluIGNhcnRlc2lhbiBkZWZhdWx0c1xuICAgICAgICBpZihsYXlvdXRPdXRbYXR0cl0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIGxheW91dE91dFthdHRyXTtcblxuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShsYXlvdXRJbiwgbGF5b3V0T3V0LCBsYXlvdXRBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgY2xpY2ttb2RlID0gY29lcmNlKCdjbGlja21vZGUnKTtcblxuICAgIHZhciBob3Zlcm1vZGVEZmx0O1xuICAgIGlmKGxheW91dE91dC5faGFzKCdjYXJ0ZXNpYW4nKSkge1xuICAgICAgICBpZihjbGlja21vZGUuaW5kZXhPZignc2VsZWN0JykgPiAtMSkge1xuICAgICAgICAgICAgaG92ZXJtb2RlRGZsdCA9ICdjbG9zZXN0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGZsYWcgZm9yICdob3Jpem9udGFsJyBwbG90czpcbiAgICAgICAgICAgIC8vIGRldGVybWluZXMgdGhlIHN0YXRlIG9mIHRoZSBtb2RlIGJhciAnY29tcGFyZScgaG92ZXJtb2RlIGJ1dHRvblxuICAgICAgICAgICAgbGF5b3V0T3V0Ll9pc0hvcml6ID0gaXNIb3JpeihmdWxsRGF0YSwgbGF5b3V0T3V0KTtcbiAgICAgICAgICAgIGhvdmVybW9kZURmbHQgPSBsYXlvdXRPdXQuX2lzSG9yaXogPyAneScgOiAneCc7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaG92ZXJtb2RlRGZsdCA9ICdjbG9zZXN0JztcblxuICAgIHJldHVybiBjb2VyY2UoJ2hvdmVybW9kZScsIGhvdmVybW9kZURmbHQpO1xufTtcblxuZnVuY3Rpb24gaXNIb3JpeihmdWxsRGF0YSwgZnVsbExheW91dCkge1xuICAgIHZhciBzdGFja09wdHMgPSBmdWxsTGF5b3V0Ll9zY2F0dGVyU3RhY2tPcHRzIHx8IHt9O1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IGZ1bGxEYXRhW2ldO1xuICAgICAgICB2YXIgc3VicGxvdCA9IHRyYWNlLnhheGlzICsgdHJhY2UueWF4aXM7XG4gICAgICAgIHZhciBzdWJwbG90U3RhY2tPcHRzID0gc3RhY2tPcHRzW3N1YnBsb3RdIHx8IHt9O1xuICAgICAgICB2YXIgZ3JvdXBPcHRzID0gc3VicGxvdFN0YWNrT3B0c1t0cmFjZS5zdGFja2dyb3VwXSB8fCB7fTtcblxuICAgICAgICBpZih0cmFjZS5vcmllbnRhdGlvbiAhPT0gJ2gnICYmIGdyb3VwT3B0cy5vcmllbnRhdGlvbiAhPT0gJ2gnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBkcmFnRWxlbWVudCA9IHJlcXVpcmUoJy4uL2RyYWdlbGVtZW50Jyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xudmFyIGxheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG52YXIgaG92ZXJNb2R1bGUgPSByZXF1aXJlKCcuL2hvdmVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vZHVsZVR5cGU6ICdjb21wb25lbnQnLFxuICAgIG5hbWU6ICdmeCcsXG5cbiAgICBjb25zdGFudHM6IHJlcXVpcmUoJy4vY29uc3RhbnRzJyksXG4gICAgc2NoZW1hOiB7XG4gICAgICAgIGxheW91dDogbGF5b3V0QXR0cmlidXRlc1xuICAgIH0sXG5cbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBsYXlvdXRBdHRyaWJ1dGVzOiBsYXlvdXRBdHRyaWJ1dGVzLFxuXG4gICAgc3VwcGx5TGF5b3V0R2xvYmFsRGVmYXVsdHM6IHJlcXVpcmUoJy4vbGF5b3V0X2dsb2JhbF9kZWZhdWx0cycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgc3VwcGx5TGF5b3V0RGVmYXVsdHM6IHJlcXVpcmUoJy4vbGF5b3V0X2RlZmF1bHRzJyksXG5cbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcblxuICAgIGdldERpc3RhbmNlRnVuY3Rpb246IGhlbHBlcnMuZ2V0RGlzdGFuY2VGdW5jdGlvbixcbiAgICBnZXRDbG9zZXN0OiBoZWxwZXJzLmdldENsb3Nlc3QsXG4gICAgaW5ib3g6IGhlbHBlcnMuaW5ib3gsXG4gICAgcXVhZHJhdHVyZTogaGVscGVycy5xdWFkcmF0dXJlLFxuICAgIGFwcGVuZEFycmF5UG9pbnRWYWx1ZTogaGVscGVycy5hcHBlbmRBcnJheVBvaW50VmFsdWUsXG5cbiAgICBjYXN0SG92ZXJPcHRpb246IGNhc3RIb3Zlck9wdGlvbixcbiAgICBjYXN0SG92ZXJpbmZvOiBjYXN0SG92ZXJpbmZvLFxuXG4gICAgaG92ZXI6IGhvdmVyTW9kdWxlLmhvdmVyLFxuICAgIHVuaG92ZXI6IGRyYWdFbGVtZW50LnVuaG92ZXIsXG5cbiAgICBsb25lSG92ZXI6IGhvdmVyTW9kdWxlLmxvbmVIb3ZlcixcbiAgICBsb25lVW5ob3ZlcjogbG9uZVVuaG92ZXIsXG5cbiAgICBjbGljazogcmVxdWlyZSgnLi9jbGljaycpXG59O1xuXG5mdW5jdGlvbiBsb25lVW5ob3Zlcihjb250YWluZXJPclNlbGVjdGlvbikge1xuICAgIC8vIGR1Y2sgdHlwZSB3aGV0aGVyIHRoZSBhcmcgaXMgYSBkMyBzZWxlY3Rpb24gYmVjYXVzZSBpZTkgZG9lc24ndFxuICAgIC8vIGhhbmRsZSBpbnN0YW5jZW9mIGxpa2UgbW9kZXJuIGJyb3dzZXJzIGRvLlxuICAgIHZhciBzZWxlY3Rpb24gPSBMaWIuaXNEM1NlbGVjdGlvbihjb250YWluZXJPclNlbGVjdGlvbikgP1xuICAgICAgICAgICAgY29udGFpbmVyT3JTZWxlY3Rpb24gOlxuICAgICAgICAgICAgZDMuc2VsZWN0KGNvbnRhaW5lck9yU2VsZWN0aW9uKTtcblxuICAgIHNlbGVjdGlvbi5zZWxlY3RBbGwoJ2cuaG92ZXJ0ZXh0JykucmVtb3ZlKCk7XG4gICAgc2VsZWN0aW9uLnNlbGVjdEFsbCgnLnNwaWtlbGluZScpLnJlbW92ZSgpO1xufVxuXG4vLyBoZWxwZXJzIGZvciB0cmFjZXMgdGhhdCB1c2UgRngubG9uZUhvdmVyXG5cbmZ1bmN0aW9uIGNhc3RIb3Zlck9wdGlvbih0cmFjZSwgcHROdW1iZXIsIGF0dHIpIHtcbiAgICByZXR1cm4gTGliLmNhc3RPcHRpb24odHJhY2UsIHB0TnVtYmVyLCAnaG92ZXJsYWJlbC4nICsgYXR0cik7XG59XG5cbmZ1bmN0aW9uIGNhc3RIb3ZlcmluZm8odHJhY2UsIGZ1bGxMYXlvdXQsIHB0TnVtYmVyKSB7XG4gICAgZnVuY3Rpb24gX2NvZXJjZSh2YWwpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2VIb3ZlcmluZm8oe2hvdmVyaW5mbzogdmFsfSwge19tb2R1bGU6IHRyYWNlLl9tb2R1bGV9LCBmdWxsTGF5b3V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTGliLmNhc3RPcHRpb24odHJhY2UsIHB0TnVtYmVyLCAnaG92ZXJpbmZvJywgX2NvZXJjZSk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBpc1VuaWZpZWRIb3ZlciA9IHJlcXVpcmUoJy4vaGVscGVycycpLmlzVW5pZmllZEhvdmVyO1xudmFyIGxheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG52YXIgaGFuZGxlSG92ZXJNb2RlRGVmYXVsdHMgPSByZXF1aXJlKCcuL2hvdmVybW9kZV9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUhvdmVyTGFiZWxEZWZhdWx0cyA9IHJlcXVpcmUoJy4vaG92ZXJsYWJlbF9kZWZhdWx0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseUxheW91dERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhKSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UobGF5b3V0SW4sIGxheW91dE91dCwgbGF5b3V0QXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIGhvdmVyTW9kZSA9IGhhbmRsZUhvdmVyTW9kZURlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhKTtcbiAgICBpZihob3Zlck1vZGUpIHtcbiAgICAgICAgY29lcmNlKCdob3ZlcmRpc3RhbmNlJyk7XG4gICAgICAgIGNvZXJjZSgnc3Bpa2VkaXN0YW5jZScsIGlzVW5pZmllZEhvdmVyKGhvdmVyTW9kZSkgPyAtMSA6IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgdmFyIGRyYWdNb2RlID0gY29lcmNlKCdkcmFnbW9kZScpO1xuICAgIGlmKGRyYWdNb2RlID09PSAnc2VsZWN0JykgY29lcmNlKCdzZWxlY3RkaXJlY3Rpb24nKTtcblxuICAgIC8vIGlmIG9ubHkgbWFwYm94IG9yIGdlbyBzdWJwbG90cyBpcyBwcmVzZW50IG9uIGdyYXBoLFxuICAgIC8vIHJlc2V0ICd6b29tJyBkcmFnbW9kZSB0byAncGFuJyB1bnRpbCAnem9vbScgaXMgaW1wbGVtZW50ZWQsXG4gICAgLy8gc28gdGhhdCB0aGUgY29ycmVjdCBtb2RlYmFyIGJ1dHRvbiBpcyBhY3RpdmVcbiAgICB2YXIgaGFzTWFwYm94ID0gbGF5b3V0T3V0Ll9oYXMoJ21hcGJveCcpO1xuICAgIHZhciBoYXNHZW8gPSBsYXlvdXRPdXQuX2hhcygnZ2VvJyk7XG4gICAgdmFyIGxlbiA9IGxheW91dE91dC5fYmFzZVBsb3RNb2R1bGVzLmxlbmd0aDtcblxuICAgIGlmKGxheW91dE91dC5kcmFnbW9kZSA9PT0gJ3pvb20nICYmIChcbiAgICAgICAgKChoYXNNYXBib3ggfHwgaGFzR2VvKSAmJiBsZW4gPT09IDEpIHx8XG4gICAgICAgIChoYXNNYXBib3ggJiYgaGFzR2VvICYmIGxlbiA9PT0gMilcbiAgICApKSB7XG4gICAgICAgIGxheW91dE91dC5kcmFnbW9kZSA9ICdwYW4nO1xuICAgIH1cblxuICAgIGhhbmRsZUhvdmVyTGFiZWxEZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0LCBjb2VyY2UpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGhhbmRsZUhvdmVyTGFiZWxEZWZhdWx0cyA9IHJlcXVpcmUoJy4vaG92ZXJsYWJlbF9kZWZhdWx0cycpO1xudmFyIGxheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5TGF5b3V0R2xvYmFsRGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGxheW91dEluLCBsYXlvdXRPdXQsIGxheW91dEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGhhbmRsZUhvdmVyTGFiZWxEZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0LCBjb2VyY2UpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGZvbnRBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2ZvbnRfYXR0cmlidXRlcycpO1xudmFyIGNvbG9yQXR0cnMgPSByZXF1aXJlKCcuLi9jb2xvci9hdHRyaWJ1dGVzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYmdjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2xlZ2VuZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgbGVnZW5kIGJhY2tncm91bmQgY29sb3IuJyxcbiAgICAgICAgICAgICdEZWZhdWx0cyB0byBgbGF5b3V0LnBhcGVyX2JnY29sb3JgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJvcmRlcmNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIGRmbHQ6IGNvbG9yQXR0cnMuZGVmYXVsdExpbmUsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnbGVnZW5kJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgYm9yZGVyIGVuY2xvc2luZyB0aGUgbGVnZW5kLidcbiAgICB9LFxuICAgIGJvcmRlcndpZHRoOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDAsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnbGVnZW5kJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB3aWR0aCAoaW4gcHgpIG9mIHRoZSBib3JkZXIgZW5jbG9zaW5nIHRoZSBsZWdlbmQuJ1xuICAgIH0sXG4gICAgZm9udDogZm9udEF0dHJzKHtcbiAgICAgICAgZWRpdFR5cGU6ICdsZWdlbmQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGZvbnQgdXNlZCB0byB0ZXh0IHRoZSBsZWdlbmQgaXRlbXMuJ1xuICAgIH0pLFxuICAgIG9yaWVudGF0aW9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ3YnLCAnaCddLFxuICAgICAgICBkZmx0OiAndicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdsZWdlbmQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBsZWdlbmQuJ1xuICAgIH0sXG4gICAgdHJhY2VvcmRlcjoge1xuICAgICAgICB2YWxUeXBlOiAnZmxhZ2xpc3QnLFxuICAgICAgICBmbGFnczogWydyZXZlcnNlZCcsICdncm91cGVkJ10sXG4gICAgICAgIGV4dHJhczogWydub3JtYWwnXSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdsZWdlbmQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgdGhlIG9yZGVyIGF0IHdoaWNoIHRoZSBsZWdlbmQgaXRlbXMgYXJlIGRpc3BsYXllZC4nLFxuXG4gICAgICAgICAgICAnSWYgKm5vcm1hbCosIHRoZSBpdGVtcyBhcmUgZGlzcGxheWVkIHRvcC10by1ib3R0b20gaW4gdGhlIHNhbWUnLFxuICAgICAgICAgICAgJ29yZGVyIGFzIHRoZSBpbnB1dCBkYXRhLicsXG5cbiAgICAgICAgICAgICdJZiAqcmV2ZXJzZWQqLCB0aGUgaXRlbXMgYXJlIGRpc3BsYXllZCBpbiB0aGUgb3Bwb3NpdGUgb3JkZXInLFxuICAgICAgICAgICAgJ2FzICpub3JtYWwqLicsXG5cbiAgICAgICAgICAgICdJZiAqZ3JvdXBlZCosIHRoZSBpdGVtcyBhcmUgZGlzcGxheWVkIGluIGdyb3VwcycsXG4gICAgICAgICAgICAnKHdoZW4gYSB0cmFjZSBgbGVnZW5kZ3JvdXBgIGlzIHByb3ZpZGVkKS4nLFxuXG4gICAgICAgICAgICAnaWYgKmdyb3VwZWQrcmV2ZXJzZWQqLCB0aGUgaXRlbXMgYXJlIGRpc3BsYXllZCBpbiB0aGUgb3Bwb3NpdGUgb3JkZXInLFxuICAgICAgICAgICAgJ2FzICpncm91cGVkKi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB0cmFjZWdyb3VwZ2FwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDEwLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2xlZ2VuZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYW1vdW50IG9mIHZlcnRpY2FsIHNwYWNlIChpbiBweCkgYmV0d2VlbiBsZWdlbmQgZ3JvdXBzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGl0ZW1zaXppbmc6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsndHJhY2UnLCAnY29uc3RhbnQnXSxcbiAgICAgICAgZGZsdDogJ3RyYWNlJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdsZWdlbmQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaWYgdGhlIGxlZ2VuZCBpdGVtcyBzeW1ib2xzIHNjYWxlIHdpdGggdGhlaXIgY29ycmVzcG9uZGluZyAqdHJhY2UqIGF0dHJpYnV0ZXMnLFxuICAgICAgICAgICAgJ29yIHJlbWFpbiAqY29uc3RhbnQqIGluZGVwZW5kZW50IG9mIHRoZSBzeW1ib2wgc2l6ZSBvbiB0aGUgZ3JhcGguJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBpdGVtY2xpY2s6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsndG9nZ2xlJywgJ3RvZ2dsZW90aGVycycsIGZhbHNlXSxcbiAgICAgICAgZGZsdDogJ3RvZ2dsZScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdsZWdlbmQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgdGhlIGJlaGF2aW9yIG9uIGxlZ2VuZCBpdGVtIGNsaWNrLicsXG4gICAgICAgICAgICAnKnRvZ2dsZSogdG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgaXRlbSBjbGlja2VkIG9uIHRoZSBncmFwaC4nLFxuICAgICAgICAgICAgJyp0b2dnbGVvdGhlcnMqIG1ha2VzIHRoZSBjbGlja2VkIGl0ZW0gdGhlIHNvbGUgdmlzaWJsZSBpdGVtIG9uIHRoZSBncmFwaC4nLFxuICAgICAgICAgICAgJypmYWxzZSogZGlzYWJsZSBsZWdlbmQgaXRlbSBjbGljayBpbnRlcmFjdGlvbnMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgaXRlbWRvdWJsZWNsaWNrOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ3RvZ2dsZScsICd0b2dnbGVvdGhlcnMnLCBmYWxzZV0sXG4gICAgICAgIGRmbHQ6ICd0b2dnbGVvdGhlcnMnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnbGVnZW5kJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHRoZSBiZWhhdmlvciBvbiBsZWdlbmQgaXRlbSBkb3VibGUtY2xpY2suJyxcbiAgICAgICAgICAgICcqdG9nZ2xlKiB0b2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBpdGVtIGNsaWNrZWQgb24gdGhlIGdyYXBoLicsXG4gICAgICAgICAgICAnKnRvZ2dsZW90aGVycyogbWFrZXMgdGhlIGNsaWNrZWQgaXRlbSB0aGUgc29sZSB2aXNpYmxlIGl0ZW0gb24gdGhlIGdyYXBoLicsXG4gICAgICAgICAgICAnKmZhbHNlKiBkaXNhYmxlIGxlZ2VuZCBpdGVtIGRvdWJsZS1jbGljayBpbnRlcmFjdGlvbnMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICB4OiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IC0yLFxuICAgICAgICBtYXg6IDMsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnbGVnZW5kJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB4IHBvc2l0aW9uIChpbiBub3JtYWxpemVkIGNvb3JkaW5hdGVzKSBvZiB0aGUgbGVnZW5kLicsXG4gICAgICAgICAgICAnRGVmYXVsdHMgdG8gKjEuMDIqIGZvciB2ZXJ0aWNhbCBsZWdlbmRzIGFuZCcsXG4gICAgICAgICAgICAnZGVmYXVsdHMgdG8gKjAqIGZvciBob3Jpem9udGFsIGxlZ2VuZHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeGFuY2hvcjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydhdXRvJywgJ2xlZnQnLCAnY2VudGVyJywgJ3JpZ2h0J10sXG4gICAgICAgIGRmbHQ6ICdsZWZ0JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2xlZ2VuZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgbGVnZW5kXFwncyBob3Jpem9udGFsIHBvc2l0aW9uIGFuY2hvci4nLFxuICAgICAgICAgICAgJ1RoaXMgYW5jaG9yIGJpbmRzIHRoZSBgeGAgcG9zaXRpb24gdG8gdGhlICpsZWZ0KiwgKmNlbnRlcionLFxuICAgICAgICAgICAgJ29yICpyaWdodCogb2YgdGhlIGxlZ2VuZC4nLFxuICAgICAgICAgICAgJ1ZhbHVlICphdXRvKiBhbmNob3JzIGxlZ2VuZHMgdG8gdGhlIHJpZ2h0IGZvciBgeGAgdmFsdWVzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAyLzMsJyxcbiAgICAgICAgICAgICdhbmNob3JzIGxlZ2VuZHMgdG8gdGhlIGxlZnQgZm9yIGB4YCB2YWx1ZXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEvMyBhbmQnLFxuICAgICAgICAgICAgJ2FuY2hvcnMgbGVnZW5kcyB3aXRoIHJlc3BlY3QgdG8gdGhlaXIgY2VudGVyIG90aGVyd2lzZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IC0yLFxuICAgICAgICBtYXg6IDMsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnbGVnZW5kJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB5IHBvc2l0aW9uIChpbiBub3JtYWxpemVkIGNvb3JkaW5hdGVzKSBvZiB0aGUgbGVnZW5kLicsXG4gICAgICAgICAgICAnRGVmYXVsdHMgdG8gKjEqIGZvciB2ZXJ0aWNhbCBsZWdlbmRzLCcsXG4gICAgICAgICAgICAnZGVmYXVsdHMgdG8gKi0wLjEqIGZvciBob3Jpem9udGFsIGxlZ2VuZHMgb24gZ3JhcGhzIHcvbyByYW5nZSBzbGlkZXJzIGFuZCcsXG4gICAgICAgICAgICAnZGVmYXVsdHMgdG8gKjEuMSogZm9yIGhvcml6b250YWwgbGVnZW5kcyBvbiBncmFwaCB3aXRoIG9uZSBvciBtdWx0aXBsZSByYW5nZSBzbGlkZXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHlhbmNob3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnYXV0bycsICd0b3AnLCAnbWlkZGxlJywgJ2JvdHRvbSddLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnbGVnZW5kJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBsZWdlbmRcXCdzIHZlcnRpY2FsIHBvc2l0aW9uIGFuY2hvcicsXG4gICAgICAgICAgICAnVGhpcyBhbmNob3IgYmluZHMgdGhlIGB5YCBwb3NpdGlvbiB0byB0aGUgKnRvcCosICptaWRkbGUqJyxcbiAgICAgICAgICAgICdvciAqYm90dG9tKiBvZiB0aGUgbGVnZW5kLicsXG4gICAgICAgICAgICAnVmFsdWUgKmF1dG8qIGFuY2hvcnMgbGVnZW5kcyBhdCB0aGVpciBib3R0b20gZm9yIGB5YCB2YWx1ZXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDEvMywnLFxuICAgICAgICAgICAgJ2FuY2hvcnMgbGVnZW5kcyB0byBhdCB0aGVpciB0b3AgZm9yIGB5YCB2YWx1ZXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDIvMyBhbmQnLFxuICAgICAgICAgICAgJ2FuY2hvcnMgbGVnZW5kcyB3aXRoIHJlc3BlY3QgdG8gdGhlaXIgbWlkZGxlIG90aGVyd2lzZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB1aXJldmlzaW9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnbm9uZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQ29udHJvbHMgcGVyc2lzdGVuY2Ugb2YgbGVnZW5kLWRyaXZlbiBjaGFuZ2VzIGluIHRyYWNlIGFuZCBwaWUgbGFiZWwnLFxuICAgICAgICAgICAgJ3Zpc2liaWxpdHkuIERlZmF1bHRzIHRvIGBsYXlvdXQudWlyZXZpc2lvbmAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgdmFsaWduOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ3RvcCcsICdtaWRkbGUnLCAnYm90dG9tJ10sXG4gICAgICAgIGRmbHQ6ICdtaWRkbGUnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2xlZ2VuZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgdmVydGljYWwgYWxpZ25tZW50IG9mIHRoZSBzeW1ib2xzIHdpdGggcmVzcGVjdCB0byB0aGVpciBhc3NvY2lhdGVkIHRleHQuJyxcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgZGZsdDogJycsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2xlZ2VuZCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB0aXRsZSBvZiB0aGUgbGVnZW5kLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGZvbnQ6IGZvbnRBdHRycyh7XG4gICAgICAgICAgICBlZGl0VHlwZTogJ2xlZ2VuZCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoaXMgbGVnZW5kXFwncyB0aXRsZSBmb250LidcbiAgICAgICAgICAgIF0uam9pbignICcpLFxuICAgICAgICB9KSxcbiAgICAgICAgc2lkZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ3RvcCcsICdsZWZ0JywgJ3RvcCBsZWZ0J10sXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdsZWdlbmQnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGV0ZXJtaW5lcyB0aGUgbG9jYXRpb24gb2YgbGVnZW5kXFwncyB0aXRsZScsXG4gICAgICAgICAgICAgICAgJ3dpdGggcmVzcGVjdCB0byB0aGUgbGVnZW5kIGl0ZW1zLicsXG4gICAgICAgICAgICAgICAgJ0RlZmF1bHRlZCB0byAqdG9wKiB3aXRoIGBvcmllbnRhdGlvbmAgaXMgKmgqLicsXG4gICAgICAgICAgICAgICAgJ0RlZmF1bHRlZCB0byAqbGVmdCogd2l0aCBgb3JpZW50YXRpb25gIGlzICp2Ki4nLFxuICAgICAgICAgICAgICAgICdUaGUgKnRvcCBsZWZ0KiBvcHRpb25zIGNvdWxkIGJlIHVzZWQgdG8gZXhwYW5kJyxcbiAgICAgICAgICAgICAgICAnbGVnZW5kIGFyZWEgaW4gYm90aCB4IGFuZCB5IHNpZGVzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRUeXBlOiAnbGVnZW5kJyxcbiAgICB9LFxuXG4gICAgZWRpdFR5cGU6ICdsZWdlbmQnXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzY3JvbGxCYXJXaWR0aDogNixcbiAgICBzY3JvbGxCYXJNaW5IZWlnaHQ6IDIwLFxuICAgIHNjcm9sbEJhckNvbG9yOiAnIzgwOEJBNCcsXG4gICAgc2Nyb2xsQmFyTWFyZ2luOiA0LFxuICAgIHNjcm9sbEJhckVudGVyQXR0cnM6IHtyeDogMjAsIHJ5OiAzLCB3aWR0aDogMCwgaGVpZ2h0OiAwfSxcblxuICAgIC8vIG51bWJlciBvZiBweCBiZXR3ZWVuIGxlZ2VuZCB0aXRsZSBhbmQgKGxlZnQpIHNpZGUgb2YgbGVnZW5kIChhbHdheXMgaW4geCBkaXJlY3Rpb24gYW5kIGZyb20gaW5uZXIgYm9yZGVyKVxuICAgIHRpdGxlUGFkOiAyLFxuICAgIC8vIG51bWJlciBvZiBweCBiZXR3ZWVuIGxlZ2VuZCBzeW1ib2wgYW5kIGxlZ2VuZCB0ZXh0IChhbHdheXMgaW4geCBkaXJlY3Rpb24pXG4gICAgdGV4dEdhcDogNDAsXG4gICAgLy8gbnVtYmVyIG9mIHB4IGJldHdlZW4gZWFjaCBsZWdlbmQgaXRlbSAoeCBhbmQvb3IgeSBkaXJlY3Rpb24pXG4gICAgaXRlbUdhcDogNVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKTtcblxudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBiYXNlUGxvdExheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9sYXlvdXRfYXR0cmlidXRlcycpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxlZ2VuZERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhKSB7XG4gICAgdmFyIGNvbnRhaW5lckluID0gbGF5b3V0SW4ubGVnZW5kIHx8IHt9O1xuXG4gICAgdmFyIGxlZ2VuZFRyYWNlQ291bnQgPSAwO1xuICAgIHZhciBsZWdlbmRSZWFsbHlIYXNBVHJhY2UgPSBmYWxzZTtcbiAgICB2YXIgZGVmYXVsdE9yZGVyID0gJ25vcm1hbCc7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZnVsbERhdGFbaV07XG5cbiAgICAgICAgaWYoIXRyYWNlLnZpc2libGUpIGNvbnRpbnVlO1xuXG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBleHBsaWNpdGx5IGNvdW50IGFueSB0cmFjZSB0aGF0IGlzIGVpdGhlciBzaG93biBvclxuICAgICAgICAvLyAqd291bGQqIGJlIHNob3duIGJ5IGRlZmF1bHQsIHRvd2FyZCB0aGUgdHdvIHRyYWNlcyB5b3UgbmVlZCB0b1xuICAgICAgICAvLyBlbnN1cmUgdGhlIGxlZ2VuZCBpcyBzaG93biBieSBkZWZhdWx0LCBiZWNhdXNlIHRoaXMgY2FuIHN0aWxsIGhlbHBcbiAgICAgICAgLy8gZGlzYW1iaWd1YXRlLlxuICAgICAgICBpZih0cmFjZS5zaG93bGVnZW5kIHx8IChcbiAgICAgICAgICAgIHRyYWNlLl9kZmx0U2hvd0xlZ2VuZCAmJiAhKFxuICAgICAgICAgICAgICAgIHRyYWNlLl9tb2R1bGUgJiZcbiAgICAgICAgICAgICAgICB0cmFjZS5fbW9kdWxlLmF0dHJpYnV0ZXMgJiZcbiAgICAgICAgICAgICAgICB0cmFjZS5fbW9kdWxlLmF0dHJpYnV0ZXMuc2hvd2xlZ2VuZCAmJlxuICAgICAgICAgICAgICAgIHRyYWNlLl9tb2R1bGUuYXR0cmlidXRlcy5zaG93bGVnZW5kLmRmbHQgPT09IGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgICkpIHtcbiAgICAgICAgICAgIGxlZ2VuZFRyYWNlQ291bnQrKztcbiAgICAgICAgICAgIGlmKHRyYWNlLnNob3dsZWdlbmQpIHtcbiAgICAgICAgICAgICAgICBsZWdlbmRSZWFsbHlIYXNBVHJhY2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIEFsd2F5cyBzaG93IHRoZSBsZWdlbmQgYnkgZGVmYXVsdCBpZiB0aGVyZSdzIGEgcGllLFxuICAgICAgICAgICAgICAgIC8vIG9yIGlmIHRoZXJlJ3Mgb25seSBvbmUgdHJhY2UgYnV0IGl0J3MgZXhwbGljaXRseSBzaG93blxuICAgICAgICAgICAgICAgIGlmKFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsICdwaWUtbGlrZScpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRyYWNlLl9pbnB1dC5zaG93bGVnZW5kID09PSB0cnVlXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZ2VuZFRyYWNlQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZigoUmVnaXN0cnkudHJhY2VJcyh0cmFjZSwgJ2JhcicpICYmIGxheW91dE91dC5iYXJtb2RlID09PSAnc3RhY2snKSB8fFxuICAgICAgICAgICAgICAgIFsndG9uZXh0eCcsICd0b25leHR5J10uaW5kZXhPZih0cmFjZS5maWxsKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGRlZmF1bHRPcmRlciA9IGhlbHBlcnMuaXNHcm91cGVkKHt0cmFjZW9yZGVyOiBkZWZhdWx0T3JkZXJ9KSA/XG4gICAgICAgICAgICAgICAgJ2dyb3VwZWQrcmV2ZXJzZWQnIDogJ3JldmVyc2VkJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRyYWNlLmxlZ2VuZGdyb3VwICE9PSB1bmRlZmluZWQgJiYgdHJhY2UubGVnZW5kZ3JvdXAgIT09ICcnKSB7XG4gICAgICAgICAgICBkZWZhdWx0T3JkZXIgPSBoZWxwZXJzLmlzUmV2ZXJzZWQoe3RyYWNlb3JkZXI6IGRlZmF1bHRPcmRlcn0pID9cbiAgICAgICAgICAgICAgICAncmV2ZXJzZWQrZ3JvdXBlZCcgOiAnZ3JvdXBlZCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2hvd0xlZ2VuZCA9IExpYi5jb2VyY2UobGF5b3V0SW4sIGxheW91dE91dCxcbiAgICAgICAgYmFzZVBsb3RMYXlvdXRBdHRyaWJ1dGVzLCAnc2hvd2xlZ2VuZCcsXG4gICAgICAgIGxlZ2VuZFJlYWxseUhhc0FUcmFjZSAmJiBsZWdlbmRUcmFjZUNvdW50ID4gMSk7XG5cbiAgICBpZihzaG93TGVnZW5kID09PSBmYWxzZSAmJiAhY29udGFpbmVySW4udWlyZXZpc2lvbikgcmV0dXJuO1xuXG4gICAgdmFyIGNvbnRhaW5lck91dCA9IFRlbXBsYXRlLm5ld0NvbnRhaW5lcihsYXlvdXRPdXQsICdsZWdlbmQnKTtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGNvZXJjZSgndWlyZXZpc2lvbicsIGxheW91dE91dC51aXJldmlzaW9uKTtcblxuICAgIGlmKHNob3dMZWdlbmQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICBjb2VyY2UoJ2JnY29sb3InLCBsYXlvdXRPdXQucGFwZXJfYmdjb2xvcik7XG4gICAgY29lcmNlKCdib3JkZXJjb2xvcicpO1xuICAgIGNvZXJjZSgnYm9yZGVyd2lkdGgnKTtcbiAgICBMaWIuY29lcmNlRm9udChjb2VyY2UsICdmb250JywgbGF5b3V0T3V0LmZvbnQpO1xuXG4gICAgdmFyIG9yaWVudGF0aW9uID0gY29lcmNlKCdvcmllbnRhdGlvbicpO1xuICAgIHZhciBkZWZhdWx0WCwgZGVmYXVsdFksIGRlZmF1bHRZQW5jaG9yO1xuXG4gICAgaWYob3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICBkZWZhdWx0WCA9IDA7XG5cbiAgICAgICAgaWYoUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdyYW5nZXNsaWRlcicsICdpc1Zpc2libGUnKShsYXlvdXRJbi54YXhpcykpIHtcbiAgICAgICAgICAgIGRlZmF1bHRZID0gMS4xO1xuICAgICAgICAgICAgZGVmYXVsdFlBbmNob3IgPSAnYm90dG9tJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG1heWJlIHVzZSB5PTEuMSAvIHlhbmNob3I9Ym90dG9tIGFzIGFib3ZlXG4gICAgICAgICAgICAvLyAgIHRvIGF2b2lkIGh0dHBzOi8vZ2l0aHViLmNvbS9wbG90bHkvcGxvdGx5LmpzL2lzc3Vlcy8xMTk5XG4gICAgICAgICAgICAvLyAgIGluIHYyXG4gICAgICAgICAgICBkZWZhdWx0WSA9IC0wLjE7XG4gICAgICAgICAgICBkZWZhdWx0WUFuY2hvciA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGVmYXVsdFggPSAxLjAyO1xuICAgICAgICBkZWZhdWx0WSA9IDE7XG4gICAgICAgIGRlZmF1bHRZQW5jaG9yID0gJ2F1dG8nO1xuICAgIH1cblxuICAgIGNvZXJjZSgndHJhY2VvcmRlcicsIGRlZmF1bHRPcmRlcik7XG4gICAgaWYoaGVscGVycy5pc0dyb3VwZWQobGF5b3V0T3V0LmxlZ2VuZCkpIGNvZXJjZSgndHJhY2Vncm91cGdhcCcpO1xuXG4gICAgY29lcmNlKCdpdGVtc2l6aW5nJyk7XG5cbiAgICBjb2VyY2UoJ2l0ZW1jbGljaycpO1xuICAgIGNvZXJjZSgnaXRlbWRvdWJsZWNsaWNrJyk7XG5cbiAgICBjb2VyY2UoJ3gnLCBkZWZhdWx0WCk7XG4gICAgY29lcmNlKCd4YW5jaG9yJyk7XG4gICAgY29lcmNlKCd5JywgZGVmYXVsdFkpO1xuICAgIGNvZXJjZSgneWFuY2hvcicsIGRlZmF1bHRZQW5jaG9yKTtcbiAgICBjb2VyY2UoJ3ZhbGlnbicpO1xuICAgIExpYi5ub25lT3JBbGwoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgWyd4JywgJ3knXSk7XG5cbiAgICB2YXIgdGl0bGVUZXh0ID0gY29lcmNlKCd0aXRsZS50ZXh0Jyk7XG4gICAgaWYodGl0bGVUZXh0KSB7XG4gICAgICAgIGNvZXJjZSgndGl0bGUuc2lkZScsIG9yaWVudGF0aW9uID09PSAnaCcgPyAnbGVmdCcgOiAndG9wJyk7XG4gICAgICAgIExpYi5jb2VyY2VGb250KGNvZXJjZSwgJ3RpdGxlLmZvbnQnLCBsYXlvdXRPdXQuZm9udCk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIFBsb3RzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvcGxvdHMnKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgRXZlbnRzID0gcmVxdWlyZSgnLi4vLi4vbGliL2V2ZW50cycpO1xudmFyIGRyYWdFbGVtZW50ID0gcmVxdWlyZSgnLi4vZHJhZ2VsZW1lbnQnKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vZHJhd2luZycpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vY29sb3InKTtcbnZhciBzdmdUZXh0VXRpbHMgPSByZXF1aXJlKCcuLi8uLi9saWIvc3ZnX3RleHRfdXRpbHMnKTtcbnZhciBoYW5kbGVDbGljayA9IHJlcXVpcmUoJy4vaGFuZGxlX2NsaWNrJyk7XG5cbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xudmFyIGFsaWdubWVudENvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9hbGlnbm1lbnQnKTtcbnZhciBMSU5FX1NQQUNJTkcgPSBhbGlnbm1lbnRDb25zdGFudHMuTElORV9TUEFDSU5HO1xudmFyIEZST01fVEwgPSBhbGlnbm1lbnRDb25zdGFudHMuRlJPTV9UTDtcbnZhciBGUk9NX0JSID0gYWxpZ25tZW50Q29uc3RhbnRzLkZST01fQlI7XG5cbnZhciBnZXRMZWdlbmREYXRhID0gcmVxdWlyZSgnLi9nZXRfbGVnZW5kX2RhdGEnKTtcbnZhciBzdHlsZSA9IHJlcXVpcmUoJy4vc3R5bGUnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZHJhdyhnZCwgb3B0cykge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGNsaXBJZCA9ICdsZWdlbmQnICsgZnVsbExheW91dC5fdWlkO1xuICAgIHZhciBsYXllcjtcblxuICAgIC8vIENoZWNrIHdoZXRoZXIgdGhpcyBpcyB0aGUgbWFpbiBsZWdlbmQgKGllLiBjYWxsZWQgd2l0aG91dCBhbnkgb3B0cylcbiAgICBpZighb3B0cykge1xuICAgICAgICBvcHRzID0gZnVsbExheW91dC5sZWdlbmQgfHwge307XG4gICAgICAgIG9wdHMuX21haW4gPSB0cnVlO1xuICAgICAgICBsYXllciA9IGZ1bGxMYXlvdXQuX2luZm9sYXllcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsYXllciA9IG9wdHMubGF5ZXI7XG4gICAgICAgIGNsaXBJZCArPSAnLWhvdmVyJztcbiAgICB9XG5cbiAgICBpZighbGF5ZXIpIHJldHVybjtcblxuICAgIGlmKCFnZC5fbGVnZW5kTW91c2VEb3duVGltZSkgZ2QuX2xlZ2VuZE1vdXNlRG93blRpbWUgPSAwO1xuXG4gICAgdmFyIGxlZ2VuZERhdGE7XG4gICAgaWYob3B0cy5fbWFpbikge1xuICAgICAgICBpZighZ2QuY2FsY2RhdGEpIHJldHVybjtcbiAgICAgICAgbGVnZW5kRGF0YSA9IGZ1bGxMYXlvdXQuc2hvd2xlZ2VuZCAmJiBnZXRMZWdlbmREYXRhKGdkLmNhbGNkYXRhLCBvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZighb3B0cy5lbnRyaWVzKSByZXR1cm47XG4gICAgICAgIGxlZ2VuZERhdGEgPSBnZXRMZWdlbmREYXRhKG9wdHMuZW50cmllcywgb3B0cyk7XG4gICAgfVxuXG4gICAgdmFyIGhpZGRlblNsaWNlcyA9IGZ1bGxMYXlvdXQuaGlkZGVubGFiZWxzIHx8IFtdO1xuXG4gICAgaWYob3B0cy5fbWFpbiAmJiAoIWZ1bGxMYXlvdXQuc2hvd2xlZ2VuZCB8fCAhbGVnZW5kRGF0YS5sZW5ndGgpKSB7XG4gICAgICAgIGxheWVyLnNlbGVjdEFsbCgnLmxlZ2VuZCcpLnJlbW92ZSgpO1xuICAgICAgICBmdWxsTGF5b3V0Ll90b3BkZWZzLnNlbGVjdCgnIycgKyBjbGlwSWQpLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gUGxvdHMuYXV0b01hcmdpbihnZCwgJ2xlZ2VuZCcpO1xuICAgIH1cblxuICAgIHZhciBsZWdlbmQgPSBMaWIuZW5zdXJlU2luZ2xlKGxheWVyLCAnZycsICdsZWdlbmQnLCBmdW5jdGlvbihzKSB7XG4gICAgICAgIGlmKG9wdHMuX21haW4pIHMuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJyk7XG4gICAgfSk7XG5cbiAgICB2YXIgY2xpcFBhdGggPSBMaWIuZW5zdXJlU2luZ2xlQnlJZChmdWxsTGF5b3V0Ll90b3BkZWZzLCAnY2xpcFBhdGgnLCBjbGlwSWQsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcy5hcHBlbmQoJ3JlY3QnKTtcbiAgICB9KTtcblxuICAgIHZhciBiZyA9IExpYi5lbnN1cmVTaW5nbGUobGVnZW5kLCAncmVjdCcsICdiZycsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcy5hdHRyKCdzaGFwZS1yZW5kZXJpbmcnLCAnY3Jpc3BFZGdlcycpO1xuICAgIH0pO1xuICAgIGJnLmNhbGwoQ29sb3Iuc3Ryb2tlLCBvcHRzLmJvcmRlcmNvbG9yKVxuICAgICAgICAuY2FsbChDb2xvci5maWxsLCBvcHRzLmJnY29sb3IpXG4gICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgb3B0cy5ib3JkZXJ3aWR0aCArICdweCcpO1xuXG4gICAgdmFyIHNjcm9sbEJveCA9IExpYi5lbnN1cmVTaW5nbGUobGVnZW5kLCAnZycsICdzY3JvbGxib3gnKTtcblxuICAgIHZhciB0aXRsZSA9IG9wdHMudGl0bGU7XG4gICAgb3B0cy5fdGl0bGVXaWR0aCA9IDA7XG4gICAgb3B0cy5fdGl0bGVIZWlnaHQgPSAwO1xuICAgIGlmKHRpdGxlLnRleHQpIHtcbiAgICAgICAgdmFyIHRpdGxlRWwgPSBMaWIuZW5zdXJlU2luZ2xlKHNjcm9sbEJveCwgJ3RleHQnLCAnbGVnZW5kdGl0bGV0ZXh0Jyk7XG4gICAgICAgIHRpdGxlRWwuYXR0cigndGV4dC1hbmNob3InLCAnc3RhcnQnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3VzZXItc2VsZWN0LW5vbmUnLCB0cnVlKVxuICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5mb250LCB0aXRsZS5mb250KVxuICAgICAgICAgICAgLnRleHQodGl0bGUudGV4dCk7XG5cbiAgICAgICAgdGV4dExheW91dCh0aXRsZUVsLCBzY3JvbGxCb3gsIGdkLCBvcHRzKTsgLy8gaGFuZGxlIG1hdGhqYXggb3IgbXVsdGktbGluZSB0ZXh0IGFuZCBjb21wdXRlIHRpdGxlIGhlaWdodFxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbEJveC5zZWxlY3RBbGwoJy5sZWdlbmR0aXRsZXRleHQnKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICB2YXIgc2Nyb2xsQmFyID0gTGliLmVuc3VyZVNpbmdsZShsZWdlbmQsICdyZWN0JywgJ3Njcm9sbGJhcicsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcy5hdHRyKGNvbnN0YW50cy5zY3JvbGxCYXJFbnRlckF0dHJzKVxuICAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgY29uc3RhbnRzLnNjcm9sbEJhckNvbG9yKTtcbiAgICB9KTtcblxuICAgIHZhciBncm91cHMgPSBzY3JvbGxCb3guc2VsZWN0QWxsKCdnLmdyb3VwcycpLmRhdGEobGVnZW5kRGF0YSk7XG4gICAgZ3JvdXBzLmVudGVyKCkuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAnZ3JvdXBzJyk7XG4gICAgZ3JvdXBzLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIHZhciB0cmFjZXMgPSBncm91cHMuc2VsZWN0QWxsKCdnLnRyYWNlcycpLmRhdGEoTGliLmlkZW50aXR5KTtcbiAgICB0cmFjZXMuZW50ZXIoKS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICd0cmFjZXMnKTtcbiAgICB0cmFjZXMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgdHJhY2VzLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgdHJhY2UgPSBkWzBdLnRyYWNlO1xuICAgICAgICBpZihSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAncGllLWxpa2UnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGhpZGRlblNsaWNlcy5pbmRleE9mKGRbMF0ubGFiZWwpICE9PSAtMSA/IDAuNSA6IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhY2UudmlzaWJsZSA9PT0gJ2xlZ2VuZG9ubHknID8gMC41IDogMTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLmVhY2goZnVuY3Rpb24oKSB7IGQzLnNlbGVjdCh0aGlzKS5jYWxsKGRyYXdUZXh0cywgZ2QsIG9wdHMpOyB9KVxuICAgIC5jYWxsKHN0eWxlLCBnZCwgb3B0cylcbiAgICAuZWFjaChmdW5jdGlvbigpIHsgaWYob3B0cy5fbWFpbikgZDMuc2VsZWN0KHRoaXMpLmNhbGwoc2V0dXBUcmFjZVRvZ2dsZSwgZ2QpOyB9KTtcblxuICAgIExpYi5zeW5jT3JBc3luYyhbXG4gICAgICAgIFBsb3RzLnByZXZpb3VzUHJvbWlzZXMsXG4gICAgICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gY29tcHV0ZUxlZ2VuZERpbWVuc2lvbnMoZ2QsIGdyb3VwcywgdHJhY2VzLCBvcHRzKTsgfSxcbiAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBJRiBleHBhbmRNYXJnaW4gcmV0dXJuIGEgUHJvbWlzZSAod2hpY2ggaXMgdHJ1dGh5KSxcbiAgICAgICAgICAgIC8vIHdlJ3JlIHVuZGVyIGEgZG9BdXRvTWFyZ2luIHJlZHJhdywgc28gd2UgZG9uJ3QgaGF2ZSB0b1xuICAgICAgICAgICAgLy8gZHJhdyB0aGUgcmVtYWluaW5nIHBpZWNlcyBiZWxvd1xuICAgICAgICAgICAgaWYob3B0cy5fbWFpbiAmJiBleHBhbmRNYXJnaW4oZ2QpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBncyA9IGZ1bGxMYXlvdXQuX3NpemU7XG4gICAgICAgICAgICB2YXIgYncgPSBvcHRzLmJvcmRlcndpZHRoO1xuXG4gICAgICAgICAgICB2YXIgbHggPSBncy5sICsgZ3MudyAqIG9wdHMueCAtIEZST01fVExbZ2V0WGFuY2hvcihvcHRzKV0gKiBvcHRzLl93aWR0aDtcbiAgICAgICAgICAgIHZhciBseSA9IGdzLnQgKyBncy5oICogKDEgLSBvcHRzLnkpIC0gRlJPTV9UTFtnZXRZYW5jaG9yKG9wdHMpXSAqIG9wdHMuX2VmZkhlaWdodDtcblxuICAgICAgICAgICAgaWYob3B0cy5fbWFpbiAmJiBmdWxsTGF5b3V0Lm1hcmdpbi5hdXRvZXhwYW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIGx4MCA9IGx4O1xuICAgICAgICAgICAgICAgIHZhciBseTAgPSBseTtcblxuICAgICAgICAgICAgICAgIGx4ID0gTGliLmNvbnN0cmFpbihseCwgMCwgZnVsbExheW91dC53aWR0aCAtIG9wdHMuX3dpZHRoKTtcbiAgICAgICAgICAgICAgICBseSA9IExpYi5jb25zdHJhaW4obHksIDAsIGZ1bGxMYXlvdXQuaGVpZ2h0IC0gb3B0cy5fZWZmSGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIGlmKGx4ICE9PSBseDApIHtcbiAgICAgICAgICAgICAgICAgICAgTGliLmxvZygnQ29uc3RyYWluIGxlZ2VuZC54IHRvIG1ha2UgbGVnZW5kIGZpdCBpbnNpZGUgZ3JhcGgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYobHkgIT09IGx5MCkge1xuICAgICAgICAgICAgICAgICAgICBMaWIubG9nKCdDb25zdHJhaW4gbGVnZW5kLnkgdG8gbWFrZSBsZWdlbmQgZml0IGluc2lkZSBncmFwaCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2V0IHNpemUgYW5kIHBvc2l0aW9uIG9mIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBtYWtlIHVwIGEgbGVnZW5kOlxuICAgICAgICAgICAgLy8gbGVnZW5kLCBiYWNrZ3JvdW5kIGFuZCBib3JkZXIsIHNjcm9sbCBib3ggYW5kIHNjcm9sbCBiYXIgYXMgd2VsbCBhcyB0aXRsZVxuICAgICAgICAgICAgaWYob3B0cy5fbWFpbikgRHJhd2luZy5zZXRUcmFuc2xhdGUobGVnZW5kLCBseCwgbHkpO1xuXG4gICAgICAgICAgICAvLyB0byBiZSBzYWZlLCByZW1vdmUgcHJldmlvdXMgbGlzdGVuZXJzXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJy5kcmFnJywgbnVsbCk7XG4gICAgICAgICAgICBsZWdlbmQub24oJ3doZWVsJywgbnVsbCk7XG5cbiAgICAgICAgICAgIGlmKCFvcHRzLl9tYWluIHx8IG9wdHMuX2hlaWdodCA8PSBvcHRzLl9tYXhIZWlnaHQgfHwgZ2QuX2NvbnRleHQuc3RhdGljUGxvdCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHNjcm9sbGJhciBzaG91bGQgbm90IGJlIHNob3duLlxuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBvcHRzLl9lZmZIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBub3QgdGhlIG1haW4gbGVnZW5kLCBsZXQgaXQgYmUgaXRzIGZ1bGwgc2l6ZVxuICAgICAgICAgICAgICAgIGlmKCFvcHRzLl9tYWluKSBoZWlnaHQgPSBvcHRzLl9oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBiZy5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG9wdHMuX3dpZHRoIC0gYncsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0IC0gYncsXG4gICAgICAgICAgICAgICAgICAgIHg6IGJ3IC8gMixcbiAgICAgICAgICAgICAgICAgICAgeTogYncgLyAyXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBEcmF3aW5nLnNldFRyYW5zbGF0ZShzY3JvbGxCb3gsIDAsIDApO1xuXG4gICAgICAgICAgICAgICAgY2xpcFBhdGguc2VsZWN0KCdyZWN0JykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvcHRzLl93aWR0aCAtIDIgKiBidyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgLSAyICogYncsXG4gICAgICAgICAgICAgICAgICAgIHg6IGJ3LFxuICAgICAgICAgICAgICAgICAgICB5OiBid1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgRHJhd2luZy5zZXRDbGlwVXJsKHNjcm9sbEJveCwgY2xpcElkLCBnZCk7XG5cbiAgICAgICAgICAgICAgICBEcmF3aW5nLnNldFJlY3Qoc2Nyb2xsQmFyLCAwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0cy5fc2Nyb2xsWTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEJhckhlaWdodCA9IE1hdGgubWF4KGNvbnN0YW50cy5zY3JvbGxCYXJNaW5IZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuX2VmZkhlaWdodCAqIG9wdHMuX2VmZkhlaWdodCAvIG9wdHMuX2hlaWdodCk7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEJhcllNYXggPSBvcHRzLl9lZmZIZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYXJIZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAyICogY29uc3RhbnRzLnNjcm9sbEJhck1hcmdpbjtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsQm94WU1heCA9IG9wdHMuX2hlaWdodCAtIG9wdHMuX2VmZkhlaWdodDtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsUmF0aW8gPSBzY3JvbGxCYXJZTWF4IC8gc2Nyb2xsQm94WU1heDtcblxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxCb3hZID0gTWF0aC5taW4ob3B0cy5fc2Nyb2xsWSB8fCAwLCBzY3JvbGxCb3hZTWF4KTtcblxuICAgICAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBiYWNrZ3JvdW5kIGFuZCBjbGlwLXBhdGggd2lkdGhcbiAgICAgICAgICAgICAgICAvLyBieSB0aGUgc2Nyb2xsYmFyIHdpZHRoIGFuZCBtYXJnaW5cbiAgICAgICAgICAgICAgICBiZy5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG9wdHMuX3dpZHRoIC1cbiAgICAgICAgICAgICAgICAgICAgICAgIDIgKiBidyArXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudHMuc2Nyb2xsQmFyV2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLnNjcm9sbEJhck1hcmdpbixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvcHRzLl9lZmZIZWlnaHQgLSBidyxcbiAgICAgICAgICAgICAgICAgICAgeDogYncgLyAyLFxuICAgICAgICAgICAgICAgICAgICB5OiBidyAvIDJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNsaXBQYXRoLnNlbGVjdCgncmVjdCcpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogb3B0cy5fd2lkdGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgMiAqIGJ3ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50cy5zY3JvbGxCYXJXaWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudHMuc2Nyb2xsQmFyTWFyZ2luLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG9wdHMuX2VmZkhlaWdodCAtIDIgKiBidyxcbiAgICAgICAgICAgICAgICAgICAgeDogYncsXG4gICAgICAgICAgICAgICAgICAgIHk6IGJ3ICsgc2Nyb2xsQm94WVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgRHJhd2luZy5zZXRDbGlwVXJsKHNjcm9sbEJveCwgY2xpcElkLCBnZCk7XG5cbiAgICAgICAgICAgICAgICBzY3JvbGxIYW5kbGVyKHNjcm9sbEJveFksIHNjcm9sbEJhckhlaWdodCwgc2Nyb2xsUmF0aW8pO1xuXG4gICAgICAgICAgICAgICAgLy8gc2Nyb2xsIGxlZ2VuZCBieSBtb3VzZXdoZWVsIG9yIHRvdWNocGFkIHN3aXBlIHVwL2Rvd25cbiAgICAgICAgICAgICAgICBsZWdlbmQub24oJ3doZWVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJveFkgPSBMaWIuY29uc3RyYWluKFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5fc2Nyb2xsWSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKChkMy5ldmVudC5kZWx0YVkgLyBzY3JvbGxCYXJZTWF4KSAqIHNjcm9sbEJveFlNYXgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgMCwgc2Nyb2xsQm94WU1heCk7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEhhbmRsZXIoc2Nyb2xsQm94WSwgc2Nyb2xsQmFySGVpZ2h0LCBzY3JvbGxSYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNjcm9sbEJveFkgIT09IDAgJiYgc2Nyb2xsQm94WSAhPT0gc2Nyb2xsQm94WU1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50WTAsIGV2ZW50WTEsIHNjcm9sbEJveFkwO1xuXG4gICAgICAgICAgICAgICAgdmFyIGdldFNjcm9sbEJhckRyYWdZID0gZnVuY3Rpb24oc2Nyb2xsQm94WTAsIGV2ZW50WTAsIGV2ZW50WTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSAoKGV2ZW50WTEgLSBldmVudFkwKSAvIHNjcm9sbFJhdGlvKSArIHNjcm9sbEJveFkwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTGliLmNvbnN0cmFpbih5LCAwLCBzY3JvbGxCb3hZTWF4KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIGdldE5hdHVyYWxEcmFnWSA9IGZ1bmN0aW9uKHNjcm9sbEJveFkwLCBldmVudFkwLCBldmVudFkxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB5ID0gKChldmVudFkwIC0gZXZlbnRZMSkgLyBzY3JvbGxSYXRpbykgKyBzY3JvbGxCb3hZMDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIExpYi5jb25zdHJhaW4oeSwgMCwgc2Nyb2xsQm94WU1heCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIHNjcm9sbCBsZWdlbmQgYnkgZHJhZ2dpbmcgc2Nyb2xsQkFSXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEJhckRyYWcgPSBkMy5iZWhhdmlvci5kcmFnKClcbiAgICAgICAgICAgICAgICAub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IGQzLmV2ZW50LnNvdXJjZUV2ZW50O1xuICAgICAgICAgICAgICAgICAgICBpZihlLnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRZMCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50WTAgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQm94WTAgPSBzY3JvbGxCb3hZO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdkcmFnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gZDMuZXZlbnQuc291cmNlRXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmKGUuYnV0dG9ucyA9PT0gMiB8fCBlLmN0cmxLZXkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYoZS50eXBlID09PSAndG91Y2htb3ZlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRZMSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50WTEgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQm94WSA9IGdldFNjcm9sbEJhckRyYWdZKHNjcm9sbEJveFkwLCBldmVudFkwLCBldmVudFkxKTtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSGFuZGxlcihzY3JvbGxCb3hZLCBzY3JvbGxCYXJIZWlnaHQsIHNjcm9sbFJhdGlvKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzY3JvbGxCYXIuY2FsbChzY3JvbGxCYXJEcmFnKTtcblxuICAgICAgICAgICAgICAgIC8vIHNjcm9sbCBsZWdlbmQgYnkgdG91Y2gtZHJhZ2dpbmcgc2Nyb2xsQk9YXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEJveFRvdWNoRHJhZyA9IGQzLmJlaGF2aW9yLmRyYWcoKVxuICAgICAgICAgICAgICAgIC5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gZDMuZXZlbnQuc291cmNlRXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFkwID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQm94WTAgPSBzY3JvbGxCb3hZO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ2RyYWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBkMy5ldmVudC5zb3VyY2VFdmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYoZS50eXBlID09PSAndG91Y2htb3ZlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRZMSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbEJveFkgPSBnZXROYXR1cmFsRHJhZ1koc2Nyb2xsQm94WTAsIGV2ZW50WTAsIGV2ZW50WTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSGFuZGxlcihzY3JvbGxCb3hZLCBzY3JvbGxCYXJIZWlnaHQsIHNjcm9sbFJhdGlvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNjcm9sbEJveC5jYWxsKHNjcm9sbEJveFRvdWNoRHJhZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNjcm9sbEhhbmRsZXIoc2Nyb2xsQm94WSwgc2Nyb2xsQmFySGVpZ2h0LCBzY3JvbGxSYXRpbykge1xuICAgICAgICAgICAgICAgIG9wdHMuX3Njcm9sbFkgPSBnZC5fZnVsbExheW91dC5sZWdlbmQuX3Njcm9sbFkgPSBzY3JvbGxCb3hZO1xuICAgICAgICAgICAgICAgIERyYXdpbmcuc2V0VHJhbnNsYXRlKHNjcm9sbEJveCwgMCwgLXNjcm9sbEJveFkpO1xuXG4gICAgICAgICAgICAgICAgRHJhd2luZy5zZXRSZWN0KFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYXIsXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuX3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICBjb25zdGFudHMuc2Nyb2xsQmFyTWFyZ2luICsgc2Nyb2xsQm94WSAqIHNjcm9sbFJhdGlvLFxuICAgICAgICAgICAgICAgICAgICBjb25zdGFudHMuc2Nyb2xsQmFyV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhckhlaWdodFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY2xpcFBhdGguc2VsZWN0KCdyZWN0JykuYXR0cigneScsIGJ3ICsgc2Nyb2xsQm94WSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGdkLl9jb250ZXh0LmVkaXRzLmxlZ2VuZFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHhmLCB5ZiwgeDAsIHkwO1xuXG4gICAgICAgICAgICAgICAgbGVnZW5kLmNsYXNzZWQoJ2N1cnNvci1tb3ZlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBkcmFnRWxlbWVudC5pbml0KHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogbGVnZW5kLm5vZGUoKSxcbiAgICAgICAgICAgICAgICAgICAgZ2Q6IGdkLFxuICAgICAgICAgICAgICAgICAgICBwcmVwRm46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IERyYXdpbmcuZ2V0VHJhbnNsYXRlKGxlZ2VuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB4MCA9IHRyYW5zZm9ybS54O1xuICAgICAgICAgICAgICAgICAgICAgICAgeTAgPSB0cmFuc2Zvcm0ueTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW92ZUZuOiBmdW5jdGlvbihkeCwgZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdYID0geDAgKyBkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdZID0geTAgKyBkeTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgRHJhd2luZy5zZXRUcmFuc2xhdGUobGVnZW5kLCBuZXdYLCBuZXdZKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeGYgPSBkcmFnRWxlbWVudC5hbGlnbihuZXdYLCAwLCBncy5sLCBncy5sICsgZ3Mudywgb3B0cy54YW5jaG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlmID0gZHJhZ0VsZW1lbnQuYWxpZ24obmV3WSwgMCwgZ3MudCArIGdzLmgsIGdzLnQsIG9wdHMueWFuY2hvcik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRvbmVGbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih4ZiAhPT0gdW5kZWZpbmVkICYmIHlmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWdpc3RyeS5jYWxsKCdfZ3VpUmVsYXlvdXQnLCBnZCwgeydsZWdlbmQueCc6IHhmLCAnbGVnZW5kLnknOiB5Zn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjbGlja0ZuOiBmdW5jdGlvbihudW1DbGlja3MsIGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGlja2VkVHJhY2UgPSBsYXllci5zZWxlY3RBbGwoJ2cudHJhY2VzJykuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiYm94ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmNsaWVudFggPj0gYmJveC5sZWZ0ICYmIGUuY2xpZW50WCA8PSBiYm94LnJpZ2h0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuY2xpZW50WSA+PSBiYm94LnRvcCAmJiBlLmNsaWVudFkgPD0gYmJveC5ib3R0b21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjbGlja2VkVHJhY2Uuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrT3JEb3VibGVDbGljayhnZCwgbGVnZW5kLCBjbGlja2VkVHJhY2UsIG51bUNsaWNrcywgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0sIGdkKTtcbn07XG5cbmZ1bmN0aW9uIGNsaWNrT3JEb3VibGVDbGljayhnZCwgbGVnZW5kLCBsZWdlbmRJdGVtLCBudW1DbGlja3MsIGV2dCkge1xuICAgIHZhciB0cmFjZSA9IGxlZ2VuZEl0ZW0uZGF0YSgpWzBdWzBdLnRyYWNlO1xuICAgIHZhciBldnREYXRhID0ge1xuICAgICAgICBldmVudDogZXZ0LFxuICAgICAgICBub2RlOiBsZWdlbmRJdGVtLm5vZGUoKSxcbiAgICAgICAgY3VydmVOdW1iZXI6IHRyYWNlLmluZGV4LFxuICAgICAgICBleHBhbmRlZEluZGV4OiB0cmFjZS5fZXhwYW5kZWRJbmRleCxcbiAgICAgICAgZGF0YTogZ2QuZGF0YSxcbiAgICAgICAgbGF5b3V0OiBnZC5sYXlvdXQsXG4gICAgICAgIGZyYW1lczogZ2QuX3RyYW5zaXRpb25EYXRhLl9mcmFtZXMsXG4gICAgICAgIGNvbmZpZzogZ2QuX2NvbnRleHQsXG4gICAgICAgIGZ1bGxEYXRhOiBnZC5fZnVsbERhdGEsXG4gICAgICAgIGZ1bGxMYXlvdXQ6IGdkLl9mdWxsTGF5b3V0XG4gICAgfTtcblxuICAgIGlmKHRyYWNlLl9ncm91cCkge1xuICAgICAgICBldnREYXRhLmdyb3VwID0gdHJhY2UuX2dyb3VwO1xuICAgIH1cbiAgICBpZihSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAncGllLWxpa2UnKSkge1xuICAgICAgICBldnREYXRhLmxhYmVsID0gbGVnZW5kSXRlbS5kYXR1bSgpWzBdLmxhYmVsO1xuICAgIH1cblxuICAgIHZhciBjbGlja1ZhbCA9IEV2ZW50cy50cmlnZ2VySGFuZGxlcihnZCwgJ3Bsb3RseV9sZWdlbmRjbGljaycsIGV2dERhdGEpO1xuICAgIGlmKGNsaWNrVmFsID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgaWYobnVtQ2xpY2tzID09PSAxKSB7XG4gICAgICAgIGxlZ2VuZC5fY2xpY2tUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGhhbmRsZUNsaWNrKGxlZ2VuZEl0ZW0sIGdkLCBudW1DbGlja3MpO1xuICAgICAgICB9LCBnZC5fY29udGV4dC5kb3VibGVDbGlja0RlbGF5KTtcbiAgICB9IGVsc2UgaWYobnVtQ2xpY2tzID09PSAyKSB7XG4gICAgICAgIGlmKGxlZ2VuZC5fY2xpY2tUaW1lb3V0KSBjbGVhclRpbWVvdXQobGVnZW5kLl9jbGlja1RpbWVvdXQpO1xuICAgICAgICBnZC5fbGVnZW5kTW91c2VEb3duVGltZSA9IDA7XG5cbiAgICAgICAgdmFyIGRibENsaWNrVmFsID0gRXZlbnRzLnRyaWdnZXJIYW5kbGVyKGdkLCAncGxvdGx5X2xlZ2VuZGRvdWJsZWNsaWNrJywgZXZ0RGF0YSk7XG4gICAgICAgIGlmKGRibENsaWNrVmFsICE9PSBmYWxzZSkgaGFuZGxlQ2xpY2sobGVnZW5kSXRlbSwgZ2QsIG51bUNsaWNrcyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmF3VGV4dHMoZywgZ2QsIG9wdHMpIHtcbiAgICB2YXIgbGVnZW5kSXRlbSA9IGcuZGF0YSgpWzBdWzBdO1xuICAgIHZhciB0cmFjZSA9IGxlZ2VuZEl0ZW0udHJhY2U7XG4gICAgdmFyIGlzUGllTGlrZSA9IFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsICdwaWUtbGlrZScpO1xuICAgIHZhciB0cmFjZUluZGV4ID0gdHJhY2UuaW5kZXg7XG4gICAgdmFyIGlzRWRpdGFibGUgPSBvcHRzLl9tYWluICYmIGdkLl9jb250ZXh0LmVkaXRzLmxlZ2VuZFRleHQgJiYgIWlzUGllTGlrZTtcbiAgICB2YXIgbWF4TmFtZUxlbmd0aCA9IG9wdHMuX21heE5hbWVMZW5ndGg7XG5cbiAgICB2YXIgbmFtZTtcbiAgICBpZighb3B0cy5lbnRyaWVzKSB7XG4gICAgICAgIG5hbWUgPSBpc1BpZUxpa2UgPyBsZWdlbmRJdGVtLmxhYmVsIDogdHJhY2UubmFtZTtcbiAgICAgICAgaWYodHJhY2UuX21ldGEpIHtcbiAgICAgICAgICAgIG5hbWUgPSBMaWIudGVtcGxhdGVTdHJpbmcobmFtZSwgdHJhY2UuX21ldGEpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmFtZSA9IGxlZ2VuZEl0ZW0udGV4dDtcbiAgICB9XG5cbiAgICB2YXIgdGV4dEVsID0gTGliLmVuc3VyZVNpbmdsZShnLCAndGV4dCcsICdsZWdlbmR0ZXh0Jyk7XG5cbiAgICB0ZXh0RWwuYXR0cigndGV4dC1hbmNob3InLCAnc3RhcnQnKVxuICAgICAgICAuY2xhc3NlZCgndXNlci1zZWxlY3Qtbm9uZScsIHRydWUpXG4gICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgb3B0cy5mb250KVxuICAgICAgICAudGV4dChpc0VkaXRhYmxlID8gZW5zdXJlTGVuZ3RoKG5hbWUsIG1heE5hbWVMZW5ndGgpIDogbmFtZSk7XG5cbiAgICBzdmdUZXh0VXRpbHMucG9zaXRpb25UZXh0KHRleHRFbCwgY29uc3RhbnRzLnRleHRHYXAsIDApO1xuXG4gICAgaWYoaXNFZGl0YWJsZSkge1xuICAgICAgICB0ZXh0RWwuY2FsbChzdmdUZXh0VXRpbHMubWFrZUVkaXRhYmxlLCB7Z2Q6IGdkLCB0ZXh0OiBuYW1lfSlcbiAgICAgICAgICAgIC5jYWxsKHRleHRMYXlvdXQsIGcsIGdkLCBvcHRzKVxuICAgICAgICAgICAgLm9uKCdlZGl0JywgZnVuY3Rpb24obmV3TmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dChlbnN1cmVMZW5ndGgobmV3TmFtZSwgbWF4TmFtZUxlbmd0aCkpXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKHRleHRMYXlvdXQsIGcsIGdkLCBvcHRzKTtcblxuICAgICAgICAgICAgICAgIHZhciBmdWxsSW5wdXQgPSBsZWdlbmRJdGVtLnRyYWNlLl9mdWxsSW5wdXQgfHwge307XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYoUmVnaXN0cnkuaGFzVHJhbnNmb3JtKGZ1bGxJbnB1dCwgJ2dyb3VwYnknKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBieUluZGljZXMgPSBSZWdpc3RyeS5nZXRUcmFuc2Zvcm1JbmRpY2VzKGZ1bGxJbnB1dCwgJ2dyb3VwYnknKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZ3JvdXBieUluZGljZXNbZ3JvdXBieUluZGljZXMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGtjb250ID0gTGliLmtleWVkQ29udGFpbmVyKGZ1bGxJbnB1dCwgJ3RyYW5zZm9ybXNbJyArIGluZGV4ICsgJ10uc3R5bGVzJywgJ3RhcmdldCcsICd2YWx1ZS5uYW1lJyk7XG5cbiAgICAgICAgICAgICAgICAgICAga2NvbnQuc2V0KGxlZ2VuZEl0ZW0udHJhY2UuX2dyb3VwLCBuZXdOYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICB1cGRhdGUgPSBrY29udC5jb25zdHJ1Y3RVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGUubmFtZSA9IG5ld05hbWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZ2lzdHJ5LmNhbGwoJ19ndWlSZXN0eWxlJywgZ2QsIHVwZGF0ZSwgdHJhY2VJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0TGF5b3V0KHRleHRFbCwgZywgZ2QsIG9wdHMpO1xuICAgIH1cbn1cblxuLypcbiAqIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgcmVhc29uYWJseSBjbGlja2FibGUgcmVnaW9uLlxuICogSWYgdGhpcyBzdHJpbmcgaXMgbWlzc2luZyBvciB2ZXJ5IHNob3J0LCBwYWQgaXQgd2l0aCBzcGFjZXMgb3V0IHRvIGF0IGxlYXN0XG4gKiA0IGNoYXJhY3RlcnMsIHVwIHRvIHRoZSBtYXggbGVuZ3RoIG9mIG90aGVyIGxhYmVscywgb24gdGhlIGFzc3VtcHRpb24gdGhhdFxuICogbW9zdCBjaGFyYWN0ZXJzIGFyZSB3aWRlciB0aGFuIHNwYWNlcyBzbyBhIHN0cmluZyBvZiBzcGFjZXMgd2lsbCB1c3VhbGx5IGJlXG4gKiBubyB3aWRlciB0aGFuIHRoZSByZWFsIGxhYmVscy5cbiAqL1xuZnVuY3Rpb24gZW5zdXJlTGVuZ3RoKHN0ciwgbWF4TGVuZ3RoKSB7XG4gICAgdmFyIHRhcmdldExlbmd0aCA9IE1hdGgubWF4KDQsIG1heExlbmd0aCk7XG4gICAgaWYoc3RyICYmIHN0ci50cmltKCkubGVuZ3RoID49IHRhcmdldExlbmd0aCAvIDIpIHJldHVybiBzdHI7XG4gICAgc3RyID0gc3RyIHx8ICcnO1xuICAgIGZvcih2YXIgaSA9IHRhcmdldExlbmd0aCAtIHN0ci5sZW5ndGg7IGkgPiAwOyBpLS0pIHN0ciArPSAnICc7XG4gICAgcmV0dXJuIHN0cjtcbn1cblxuZnVuY3Rpb24gc2V0dXBUcmFjZVRvZ2dsZShnLCBnZCkge1xuICAgIHZhciBkb3VibGVDbGlja0RlbGF5ID0gZ2QuX2NvbnRleHQuZG91YmxlQ2xpY2tEZWxheTtcbiAgICB2YXIgbmV3TW91c2VEb3duVGltZTtcbiAgICB2YXIgbnVtQ2xpY2tzID0gMTtcblxuICAgIHZhciB0cmFjZVRvZ2dsZSA9IExpYi5lbnN1cmVTaW5nbGUoZywgJ3JlY3QnLCAnbGVnZW5kdG9nZ2xlJywgZnVuY3Rpb24ocykge1xuICAgICAgICBzLnN0eWxlKCdjdXJzb3InLCAncG9pbnRlcicpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYWxsJylcbiAgICAgICAgICAgIC5jYWxsKENvbG9yLmZpbGwsICdyZ2JhKDAsMCwwLDApJyk7XG4gICAgfSk7XG5cbiAgICB0cmFjZVRvZ2dsZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIG5ld01vdXNlRG93blRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICBpZihuZXdNb3VzZURvd25UaW1lIC0gZ2QuX2xlZ2VuZE1vdXNlRG93blRpbWUgPCBkb3VibGVDbGlja0RlbGF5KSB7XG4gICAgICAgICAgICAvLyBpbiBhIGNsaWNrIHRyYWluXG4gICAgICAgICAgICBudW1DbGlja3MgKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG5ldyBjbGljayB0cmFpblxuICAgICAgICAgICAgbnVtQ2xpY2tzID0gMTtcbiAgICAgICAgICAgIGdkLl9sZWdlbmRNb3VzZURvd25UaW1lID0gbmV3TW91c2VEb3duVGltZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHRyYWNlVG9nZ2xlLm9uKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKGdkLl9kcmFnZ2VkIHx8IGdkLl9lZGl0aW5nKSByZXR1cm47XG4gICAgICAgIHZhciBsZWdlbmQgPSBnZC5fZnVsbExheW91dC5sZWdlbmQ7XG5cbiAgICAgICAgaWYoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtIGdkLl9sZWdlbmRNb3VzZURvd25UaW1lID4gZG91YmxlQ2xpY2tEZWxheSkge1xuICAgICAgICAgICAgbnVtQ2xpY2tzID0gTWF0aC5tYXgobnVtQ2xpY2tzIC0gMSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGlja09yRG91YmxlQ2xpY2soZ2QsIGxlZ2VuZCwgZywgbnVtQ2xpY2tzLCBkMy5ldmVudCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRleHRMYXlvdXQocywgZywgZ2QsIG9wdHMpIHtcbiAgICBpZighb3B0cy5fbWFpbikgcy5hdHRyKCdkYXRhLW5vdGV4JywgdHJ1ZSk7IC8vIGRvIG5vdCBwcm9jZXNzIE1hdGhKYXggaWYgbm90IG1haW5cbiAgICBzdmdUZXh0VXRpbHMuY29udmVydFRvVHNwYW5zKHMsIGdkLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29tcHV0ZVRleHREaW1lbnNpb25zKGcsIGdkLCBvcHRzKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVRleHREaW1lbnNpb25zKGcsIGdkLCBvcHRzKSB7XG4gICAgdmFyIGxlZ2VuZEl0ZW0gPSBnLmRhdGEoKVswXVswXTtcbiAgICBpZihvcHRzLl9tYWluICYmIGxlZ2VuZEl0ZW0gJiYgIWxlZ2VuZEl0ZW0udHJhY2Uuc2hvd2xlZ2VuZCkge1xuICAgICAgICBnLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG1hdGhqYXhHcm91cCA9IGcuc2VsZWN0KCdnW2NsYXNzKj1tYXRoLWdyb3VwXScpO1xuICAgIHZhciBtYXRoamF4Tm9kZSA9IG1hdGhqYXhHcm91cC5ub2RlKCk7XG4gICAgaWYoIW9wdHMpIG9wdHMgPSBnZC5fZnVsbExheW91dC5sZWdlbmQ7XG4gICAgdmFyIGJ3ID0gb3B0cy5ib3JkZXJ3aWR0aDtcbiAgICB2YXIgbGluZUhlaWdodCA9IChsZWdlbmRJdGVtID8gb3B0cyA6IG9wdHMudGl0bGUpLmZvbnQuc2l6ZSAqIExJTkVfU1BBQ0lORztcbiAgICB2YXIgaGVpZ2h0LCB3aWR0aDtcblxuICAgIGlmKG1hdGhqYXhOb2RlKSB7XG4gICAgICAgIHZhciBtYXRoamF4QkIgPSBEcmF3aW5nLmJCb3gobWF0aGpheE5vZGUpO1xuXG4gICAgICAgIGhlaWdodCA9IG1hdGhqYXhCQi5oZWlnaHQ7XG4gICAgICAgIHdpZHRoID0gbWF0aGpheEJCLndpZHRoO1xuXG4gICAgICAgIGlmKGxlZ2VuZEl0ZW0pIHtcbiAgICAgICAgICAgIERyYXdpbmcuc2V0VHJhbnNsYXRlKG1hdGhqYXhHcm91cCwgMCwgaGVpZ2h0ICogMC4yNSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGNhc2Ugb2YgdGl0bGVcbiAgICAgICAgICAgIERyYXdpbmcuc2V0VHJhbnNsYXRlKG1hdGhqYXhHcm91cCwgYncsIGhlaWdodCAqIDAuNzUgKyBidyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdGV4dEVsID0gZy5zZWxlY3QobGVnZW5kSXRlbSA/XG4gICAgICAgICAgICAnLmxlZ2VuZHRleHQnIDogJy5sZWdlbmR0aXRsZXRleHQnXG4gICAgICAgICk7XG4gICAgICAgIHZhciB0ZXh0TGluZXMgPSBzdmdUZXh0VXRpbHMubGluZUNvdW50KHRleHRFbCk7XG4gICAgICAgIHZhciB0ZXh0Tm9kZSA9IHRleHRFbC5ub2RlKCk7XG5cbiAgICAgICAgaGVpZ2h0ID0gbGluZUhlaWdodCAqIHRleHRMaW5lcztcbiAgICAgICAgd2lkdGggPSB0ZXh0Tm9kZSA/IERyYXdpbmcuYkJveCh0ZXh0Tm9kZSkud2lkdGggOiAwO1xuXG4gICAgICAgIC8vIGFwcHJveGltYXRpb24gdG8gaGVpZ2h0IG9mZnNldCB0byBjZW50ZXIgdGhlIGZvbnRcbiAgICAgICAgLy8gdG8gYXZvaWQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG4gICAgICAgIHZhciB0ZXh0WSA9IGxpbmVIZWlnaHQgKiAoKHRleHRMaW5lcyAtIDEpIC8gMiAtIDAuMyk7XG4gICAgICAgIGlmKGxlZ2VuZEl0ZW0pIHtcbiAgICAgICAgICAgIHN2Z1RleHRVdGlscy5wb3NpdGlvblRleHQodGV4dEVsLCBjb25zdGFudHMudGV4dEdhcCwgLXRleHRZKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gY2FzZSBvZiB0aXRsZVxuICAgICAgICAgICAgc3ZnVGV4dFV0aWxzLnBvc2l0aW9uVGV4dCh0ZXh0RWwsIGNvbnN0YW50cy50aXRsZVBhZCArIGJ3LCBsaW5lSGVpZ2h0ICsgYncpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYobGVnZW5kSXRlbSkge1xuICAgICAgICBsZWdlbmRJdGVtLmxpbmVIZWlnaHQgPSBsaW5lSGVpZ2h0O1xuICAgICAgICBsZWdlbmRJdGVtLmhlaWdodCA9IE1hdGgubWF4KGhlaWdodCwgMTYpICsgMztcbiAgICAgICAgbGVnZW5kSXRlbS53aWR0aCA9IHdpZHRoO1xuICAgIH0gZWxzZSB7IC8vIGNhc2Ugb2YgdGl0bGVcbiAgICAgICAgb3B0cy5fdGl0bGVXaWR0aCA9IHdpZHRoO1xuICAgICAgICBvcHRzLl90aXRsZUhlaWdodCA9IGhlaWdodDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFRpdGxlU2l6ZShvcHRzKSB7XG4gICAgdmFyIHcgPSAwO1xuICAgIHZhciBoID0gMDtcblxuICAgIHZhciBzaWRlID0gb3B0cy50aXRsZS5zaWRlO1xuICAgIGlmKHNpZGUpIHtcbiAgICAgICAgaWYoc2lkZS5pbmRleE9mKCdsZWZ0JykgIT09IC0xKSB7XG4gICAgICAgICAgICB3ID0gb3B0cy5fdGl0bGVXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZihzaWRlLmluZGV4T2YoJ3RvcCcpICE9PSAtMSkge1xuICAgICAgICAgICAgaCA9IG9wdHMuX3RpdGxlSGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFt3LCBoXTtcbn1cblxuLypcbiAqIENvbXB1dGVzIGluIGZ1bGxMYXlvdXQubGVnZW5kOlxuICpcbiAqICAtIF9oZWlnaHQ6IGxlZ2VuZCBoZWlnaHQgaW5jbHVkaW5nIGl0ZW1zIHBhc3Qgc2Nyb2xsYm94IGhlaWdodFxuICogIC0gX21heEhlaWdodDogbWF4aW11bSBsZWdlbmQgaGVpZ2h0IGJlZm9yZSBzY3JvbGxib3ggaXMgcmVxdWlyZWRcbiAqICAtIF9lZmZIZWlnaHQ6IGxlZ2VuZCBoZWlnaHQgdy8gb3Igdy9vIHNjcm9sbGJveFxuICpcbiAqICAtIF93aWR0aDogbGVnZW5kIHdpZHRoXG4gKiAgLSBfbWF4V2lkdGggKGZvciBvcmllbnRhdGlvbjpoIG9ubHkpOiBtYXhpbXVtIHdpZHRoIGJlZm9yZSBzdGFydGluZyBuZXcgcm93XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVMZWdlbmREaW1lbnNpb25zKGdkLCBncm91cHMsIHRyYWNlcywgb3B0cykge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgaWYoIW9wdHMpIG9wdHMgPSBmdWxsTGF5b3V0LmxlZ2VuZDtcbiAgICB2YXIgZ3MgPSBmdWxsTGF5b3V0Ll9zaXplO1xuXG4gICAgdmFyIGlzVmVydGljYWwgPSBoZWxwZXJzLmlzVmVydGljYWwob3B0cyk7XG4gICAgdmFyIGlzR3JvdXBlZCA9IGhlbHBlcnMuaXNHcm91cGVkKG9wdHMpO1xuXG4gICAgdmFyIGJ3ID0gb3B0cy5ib3JkZXJ3aWR0aDtcbiAgICB2YXIgYncyID0gMiAqIGJ3O1xuICAgIHZhciB0ZXh0R2FwID0gY29uc3RhbnRzLnRleHRHYXA7XG4gICAgdmFyIGl0ZW1HYXAgPSBjb25zdGFudHMuaXRlbUdhcDtcbiAgICB2YXIgZW5kUGFkID0gMiAqIChidyArIGl0ZW1HYXApO1xuXG4gICAgdmFyIHlhbmNob3IgPSBnZXRZYW5jaG9yKG9wdHMpO1xuICAgIHZhciBpc0JlbG93UGxvdEFyZWEgPSBvcHRzLnkgPCAwIHx8IChvcHRzLnkgPT09IDAgJiYgeWFuY2hvciA9PT0gJ3RvcCcpO1xuICAgIHZhciBpc0Fib3ZlUGxvdEFyZWEgPSBvcHRzLnkgPiAxIHx8IChvcHRzLnkgPT09IDEgJiYgeWFuY2hvciA9PT0gJ2JvdHRvbScpO1xuXG4gICAgLy8gLSBpZiBiZWxvdy9hYm92ZSBwbG90IGFyZWEsIGdpdmUgaXQgdGhlIG1heGltdW0gcG90ZW50aWFsIG1hcmdpbi1wdXNoIHZhbHVlXG4gICAgLy8gLSBvdGhlcndpc2UsIGV4dGVuZCB0aGUgaGVpZ2h0IG9mIHRoZSBwbG90IGFyZWFcbiAgICBvcHRzLl9tYXhIZWlnaHQgPSBNYXRoLm1heChcbiAgICAgICAgKGlzQmVsb3dQbG90QXJlYSB8fCBpc0Fib3ZlUGxvdEFyZWEpID8gZnVsbExheW91dC5oZWlnaHQgLyAyIDogZ3MuaCxcbiAgICAgICAgMzBcbiAgICApO1xuXG4gICAgdmFyIHRvZ2dsZVJlY3RXaWR0aCA9IDA7XG4gICAgb3B0cy5fd2lkdGggPSAwO1xuICAgIG9wdHMuX2hlaWdodCA9IDA7XG4gICAgdmFyIHRpdGxlU2l6ZSA9IGdldFRpdGxlU2l6ZShvcHRzKTtcblxuICAgIGlmKGlzVmVydGljYWwpIHtcbiAgICAgICAgdHJhY2VzLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIGggPSBkWzBdLmhlaWdodDtcbiAgICAgICAgICAgIERyYXdpbmcuc2V0VHJhbnNsYXRlKHRoaXMsXG4gICAgICAgICAgICAgICAgYncgKyB0aXRsZVNpemVbMF0sXG4gICAgICAgICAgICAgICAgYncgKyB0aXRsZVNpemVbMV0gKyBvcHRzLl9oZWlnaHQgKyBoIC8gMiArIGl0ZW1HYXBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBvcHRzLl9oZWlnaHQgKz0gaDtcbiAgICAgICAgICAgIG9wdHMuX3dpZHRoID0gTWF0aC5tYXgob3B0cy5fd2lkdGgsIGRbMF0ud2lkdGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0b2dnbGVSZWN0V2lkdGggPSB0ZXh0R2FwICsgb3B0cy5fd2lkdGg7XG4gICAgICAgIG9wdHMuX3dpZHRoICs9IGl0ZW1HYXAgKyB0ZXh0R2FwICsgYncyO1xuICAgICAgICBvcHRzLl9oZWlnaHQgKz0gZW5kUGFkO1xuXG4gICAgICAgIGlmKGlzR3JvdXBlZCkge1xuICAgICAgICAgICAgZ3JvdXBzLmVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIERyYXdpbmcuc2V0VHJhbnNsYXRlKHRoaXMsIDAsIGkgKiBvcHRzLnRyYWNlZ3JvdXBnYXApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvcHRzLl9oZWlnaHQgKz0gKG9wdHMuX2xncm91cHNMZW5ndGggLSAxKSAqIG9wdHMudHJhY2Vncm91cGdhcDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB4YW5jaG9yID0gZ2V0WGFuY2hvcihvcHRzKTtcbiAgICAgICAgdmFyIGlzTGVmdE9mUGxvdEFyZWEgPSBvcHRzLnggPCAwIHx8IChvcHRzLnggPT09IDAgJiYgeGFuY2hvciA9PT0gJ3JpZ2h0Jyk7XG4gICAgICAgIHZhciBpc1JpZ2h0T2ZQbG90QXJlYSA9IG9wdHMueCA+IDEgfHwgKG9wdHMueCA9PT0gMSAmJiB4YW5jaG9yID09PSAnbGVmdCcpO1xuICAgICAgICB2YXIgaXNCZXlvbmRQbG90QXJlYVkgPSBpc0Fib3ZlUGxvdEFyZWEgfHwgaXNCZWxvd1Bsb3RBcmVhO1xuICAgICAgICB2YXIgaHcgPSBmdWxsTGF5b3V0LndpZHRoIC8gMjtcblxuICAgICAgICAvLyAtIGlmIHBsYWNlZCB3aXRoaW4geC1tYXJnaW5zLCBleHRlbmQgdGhlIHdpZHRoIG9mIHRoZSBwbG90IGFyZWFcbiAgICAgICAgLy8gLSBlbHNlIGlmIGJlbG93L2Fib3ZlIHBsb3QgYXJlYSBhbmQgYW5jaG9yZWQgaW4gdGhlIG1hcmdpbiwgZXh0ZW5kIHRvIG9wcG9zaXRlIG1hcmdpbixcbiAgICAgICAgLy8gLSBvdGhlcndpc2UgZ2l2ZSBpdCB0aGUgbWF4aW11bSBwb3RlbnRpYWwgbWFyZ2luLXB1c2ggdmFsdWVcbiAgICAgICAgb3B0cy5fbWF4V2lkdGggPSBNYXRoLm1heChcbiAgICAgICAgICAgIGlzTGVmdE9mUGxvdEFyZWEgPyAoKGlzQmV5b25kUGxvdEFyZWFZICYmIHhhbmNob3IgPT09ICdsZWZ0JykgPyBncy5sICsgZ3MudyA6IGh3KSA6XG4gICAgICAgICAgICBpc1JpZ2h0T2ZQbG90QXJlYSA/ICgoaXNCZXlvbmRQbG90QXJlYVkgJiYgeGFuY2hvciA9PT0gJ3JpZ2h0JykgPyBncy5yICsgZ3MudyA6IGh3KSA6XG4gICAgICAgICAgICBncy53LFxuICAgICAgICAyICogdGV4dEdhcCk7XG4gICAgICAgIHZhciBtYXhJdGVtV2lkdGggPSAwO1xuICAgICAgICB2YXIgY29tYmluZWRJdGVtV2lkdGggPSAwO1xuICAgICAgICB0cmFjZXMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICB2YXIgdyA9IGRbMF0ud2lkdGggKyB0ZXh0R2FwO1xuICAgICAgICAgICAgbWF4SXRlbVdpZHRoID0gTWF0aC5tYXgobWF4SXRlbVdpZHRoLCB3KTtcbiAgICAgICAgICAgIGNvbWJpbmVkSXRlbVdpZHRoICs9IHc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRvZ2dsZVJlY3RXaWR0aCA9IG51bGw7XG4gICAgICAgIHZhciBtYXhSb3dXaWR0aCA9IDA7XG5cbiAgICAgICAgaWYoaXNHcm91cGVkKSB7XG4gICAgICAgICAgICB2YXIgbWF4R3JvdXBIZWlnaHRJblJvdyA9IDA7XG4gICAgICAgICAgICB2YXIgZ3JvdXBPZmZzZXRYID0gMDtcbiAgICAgICAgICAgIHZhciBncm91cE9mZnNldFkgPSAwO1xuICAgICAgICAgICAgZ3JvdXBzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1heFdpZHRoSW5Hcm91cCA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldFkgPSAwO1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ2cudHJhY2VzJykuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoID0gZFswXS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIERyYXdpbmcuc2V0VHJhbnNsYXRlKHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZVNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZVNpemVbMV0gKyBidyArIGl0ZW1HYXAgKyBoIC8gMiArIG9mZnNldFlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSArPSBoO1xuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aEluR3JvdXAgPSBNYXRoLm1heChtYXhXaWR0aEluR3JvdXAsIHRleHRHYXAgKyBkWzBdLndpZHRoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtYXhHcm91cEhlaWdodEluUm93ID0gTWF0aC5tYXgobWF4R3JvdXBIZWlnaHRJblJvdywgb2Zmc2V0WSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IG1heFdpZHRoSW5Hcm91cCArIGl0ZW1HYXA7XG5cbiAgICAgICAgICAgICAgICBpZigobmV4dCArIGJ3ICsgZ3JvdXBPZmZzZXRYKSA+IG9wdHMuX21heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heFJvd1dpZHRoID0gTWF0aC5tYXgobWF4Um93V2lkdGgsIGdyb3VwT2Zmc2V0WCk7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwT2Zmc2V0WCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwT2Zmc2V0WSArPSBtYXhHcm91cEhlaWdodEluUm93ICsgb3B0cy50cmFjZWdyb3VwZ2FwO1xuICAgICAgICAgICAgICAgICAgICBtYXhHcm91cEhlaWdodEluUm93ID0gb2Zmc2V0WTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBEcmF3aW5nLnNldFRyYW5zbGF0ZSh0aGlzLCBncm91cE9mZnNldFgsIGdyb3VwT2Zmc2V0WSk7XG5cbiAgICAgICAgICAgICAgICBncm91cE9mZnNldFggKz0gbmV4dDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBvcHRzLl93aWR0aCA9IE1hdGgubWF4KG1heFJvd1dpZHRoLCBncm91cE9mZnNldFgpICsgYnc7XG4gICAgICAgICAgICBvcHRzLl9oZWlnaHQgPSBncm91cE9mZnNldFkgKyBtYXhHcm91cEhlaWdodEluUm93ICsgZW5kUGFkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5UcmFjZXMgPSB0cmFjZXMuc2l6ZSgpO1xuICAgICAgICAgICAgdmFyIG9uZVJvd0xlZ2VuZCA9IChjb21iaW5lZEl0ZW1XaWR0aCArIGJ3MiArIChuVHJhY2VzIC0gMSkgKiBpdGVtR2FwKSA8IG9wdHMuX21heFdpZHRoO1xuXG4gICAgICAgICAgICB2YXIgbWF4SXRlbUhlaWdodEluUm93ID0gMDtcbiAgICAgICAgICAgIHZhciBvZmZzZXRYID0gMDtcbiAgICAgICAgICAgIHZhciBvZmZzZXRZID0gMDtcbiAgICAgICAgICAgIHZhciByb3dXaWR0aCA9IDA7XG4gICAgICAgICAgICB0cmFjZXMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGggPSBkWzBdLmhlaWdodDtcbiAgICAgICAgICAgICAgICB2YXIgdyA9IHRleHRHYXAgKyBkWzBdLndpZHRoO1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gKG9uZVJvd0xlZ2VuZCA/IHcgOiBtYXhJdGVtV2lkdGgpICsgaXRlbUdhcDtcblxuICAgICAgICAgICAgICAgIGlmKChuZXh0ICsgYncgKyBvZmZzZXRYKSA+IG9wdHMuX21heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heFJvd1dpZHRoID0gTWF0aC5tYXgobWF4Um93V2lkdGgsIHJvd1dpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFkgKz0gbWF4SXRlbUhlaWdodEluUm93O1xuICAgICAgICAgICAgICAgICAgICBvcHRzLl9oZWlnaHQgKz0gbWF4SXRlbUhlaWdodEluUm93O1xuICAgICAgICAgICAgICAgICAgICBtYXhJdGVtSGVpZ2h0SW5Sb3cgPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIERyYXdpbmcuc2V0VHJhbnNsYXRlKHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlU2l6ZVswXSArIGJ3ICsgb2Zmc2V0WCxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVTaXplWzFdICsgYncgKyBvZmZzZXRZICsgaCAvIDIgKyBpdGVtR2FwXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJvd1dpZHRoID0gb2Zmc2V0WCArIHcgKyBpdGVtR2FwO1xuICAgICAgICAgICAgICAgIG9mZnNldFggKz0gbmV4dDtcbiAgICAgICAgICAgICAgICBtYXhJdGVtSGVpZ2h0SW5Sb3cgPSBNYXRoLm1heChtYXhJdGVtSGVpZ2h0SW5Sb3csIGgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKG9uZVJvd0xlZ2VuZCkge1xuICAgICAgICAgICAgICAgIG9wdHMuX3dpZHRoID0gb2Zmc2V0WCArIGJ3MjtcbiAgICAgICAgICAgICAgICBvcHRzLl9oZWlnaHQgPSBtYXhJdGVtSGVpZ2h0SW5Sb3cgKyBlbmRQYWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdHMuX3dpZHRoID0gTWF0aC5tYXgobWF4Um93V2lkdGgsIHJvd1dpZHRoKSArIGJ3MjtcbiAgICAgICAgICAgICAgICBvcHRzLl9oZWlnaHQgKz0gbWF4SXRlbUhlaWdodEluUm93ICsgZW5kUGFkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3B0cy5fd2lkdGggPSBNYXRoLmNlaWwoXG4gICAgICAgIE1hdGgubWF4KFxuICAgICAgICAgICAgb3B0cy5fd2lkdGggKyB0aXRsZVNpemVbMF0sXG4gICAgICAgICAgICBvcHRzLl90aXRsZVdpZHRoICsgMiAqIChidyArIGNvbnN0YW50cy50aXRsZVBhZClcbiAgICAgICAgKVxuICAgICk7XG5cbiAgICBvcHRzLl9oZWlnaHQgPSBNYXRoLmNlaWwoXG4gICAgICAgIE1hdGgubWF4KFxuICAgICAgICAgICAgb3B0cy5faGVpZ2h0ICsgdGl0bGVTaXplWzFdLFxuICAgICAgICAgICAgb3B0cy5fdGl0bGVIZWlnaHQgKyAyICogKGJ3ICsgY29uc3RhbnRzLml0ZW1HYXApXG4gICAgICAgIClcbiAgICApO1xuXG4gICAgb3B0cy5fZWZmSGVpZ2h0ID0gTWF0aC5taW4ob3B0cy5faGVpZ2h0LCBvcHRzLl9tYXhIZWlnaHQpO1xuXG4gICAgdmFyIGVkaXRzID0gZ2QuX2NvbnRleHQuZWRpdHM7XG4gICAgdmFyIGlzRWRpdGFibGUgPSBlZGl0cy5sZWdlbmRUZXh0IHx8IGVkaXRzLmxlZ2VuZFBvc2l0aW9uO1xuICAgIHRyYWNlcy5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHRyYWNlVG9nZ2xlID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgnLmxlZ2VuZHRvZ2dsZScpO1xuICAgICAgICB2YXIgaCA9IGRbMF0uaGVpZ2h0O1xuICAgICAgICB2YXIgdyA9IGlzRWRpdGFibGUgPyB0ZXh0R2FwIDogKHRvZ2dsZVJlY3RXaWR0aCB8fCAodGV4dEdhcCArIGRbMF0ud2lkdGgpKTtcbiAgICAgICAgaWYoIWlzVmVydGljYWwpIHcgKz0gaXRlbUdhcCAvIDI7XG4gICAgICAgIERyYXdpbmcuc2V0UmVjdCh0cmFjZVRvZ2dsZSwgMCwgLWggLyAyLCB3LCBoKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kTWFyZ2luKGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgb3B0cyA9IGZ1bGxMYXlvdXQubGVnZW5kO1xuICAgIHZhciB4YW5jaG9yID0gZ2V0WGFuY2hvcihvcHRzKTtcbiAgICB2YXIgeWFuY2hvciA9IGdldFlhbmNob3Iob3B0cyk7XG5cbiAgICByZXR1cm4gUGxvdHMuYXV0b01hcmdpbihnZCwgJ2xlZ2VuZCcsIHtcbiAgICAgICAgeDogb3B0cy54LFxuICAgICAgICB5OiBvcHRzLnksXG4gICAgICAgIGw6IG9wdHMuX3dpZHRoICogKEZST01fVExbeGFuY2hvcl0pLFxuICAgICAgICByOiBvcHRzLl93aWR0aCAqIChGUk9NX0JSW3hhbmNob3JdKSxcbiAgICAgICAgYjogb3B0cy5fZWZmSGVpZ2h0ICogKEZST01fQlJbeWFuY2hvcl0pLFxuICAgICAgICB0OiBvcHRzLl9lZmZIZWlnaHQgKiAoRlJPTV9UTFt5YW5jaG9yXSlcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0WGFuY2hvcihvcHRzKSB7XG4gICAgcmV0dXJuIExpYi5pc1JpZ2h0QW5jaG9yKG9wdHMpID8gJ3JpZ2h0JyA6XG4gICAgICAgIExpYi5pc0NlbnRlckFuY2hvcihvcHRzKSA/ICdjZW50ZXInIDpcbiAgICAgICAgJ2xlZnQnO1xufVxuXG5mdW5jdGlvbiBnZXRZYW5jaG9yKG9wdHMpIHtcbiAgICByZXR1cm4gTGliLmlzQm90dG9tQW5jaG9yKG9wdHMpID8gJ2JvdHRvbScgOlxuICAgICAgICBMaWIuaXNNaWRkbGVBbmNob3Iob3B0cykgPyAnbWlkZGxlJyA6XG4gICAgICAgICd0b3AnO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRMZWdlbmREYXRhKGNhbGNkYXRhLCBvcHRzKSB7XG4gICAgdmFyIGxncm91cFRvVHJhY2VzID0ge307XG4gICAgdmFyIGxncm91cHMgPSBbXTtcbiAgICB2YXIgaGFzT25lTm9uQmxhbmtHcm91cCA9IGZhbHNlO1xuICAgIHZhciBzbGljZXNTaG93biA9IHt9O1xuICAgIHZhciBsZ3JvdXBpID0gMDtcbiAgICB2YXIgbWF4TmFtZUxlbmd0aCA9IDA7XG4gICAgdmFyIGksIGo7XG4gICAgdmFyIG1haW4gPSBvcHRzLl9tYWluO1xuXG4gICAgZnVuY3Rpb24gYWRkT25lSXRlbShsZWdlbmRHcm91cCwgbGVnZW5kSXRlbSkge1xuICAgICAgICAvLyBlYWNoICcnIGxlZ2VuZCBncm91cCBpcyB0cmVhdGVkIGFzIGEgc2VwYXJhdGUgZ3JvdXBcbiAgICAgICAgaWYobGVnZW5kR3JvdXAgPT09ICcnIHx8ICFoZWxwZXJzLmlzR3JvdXBlZChvcHRzKSkge1xuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgdGhpcyBhZ2FpbnN0IGZ1bGxEYXRhIGxlZ2VuZGdyb3Vwcz9cbiAgICAgICAgICAgIHZhciB1bmlxdWVHcm91cCA9ICd+fmknICsgbGdyb3VwaTtcbiAgICAgICAgICAgIGxncm91cHMucHVzaCh1bmlxdWVHcm91cCk7XG4gICAgICAgICAgICBsZ3JvdXBUb1RyYWNlc1t1bmlxdWVHcm91cF0gPSBbW2xlZ2VuZEl0ZW1dXTtcbiAgICAgICAgICAgIGxncm91cGkrKztcbiAgICAgICAgfSBlbHNlIGlmKGxncm91cHMuaW5kZXhPZihsZWdlbmRHcm91cCkgPT09IC0xKSB7XG4gICAgICAgICAgICBsZ3JvdXBzLnB1c2gobGVnZW5kR3JvdXApO1xuICAgICAgICAgICAgaGFzT25lTm9uQmxhbmtHcm91cCA9IHRydWU7XG4gICAgICAgICAgICBsZ3JvdXBUb1RyYWNlc1tsZWdlbmRHcm91cF0gPSBbW2xlZ2VuZEl0ZW1dXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxncm91cFRvVHJhY2VzW2xlZ2VuZEdyb3VwXS5wdXNoKFtsZWdlbmRJdGVtXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBidWlsZCBhbiB7IGxlZ2VuZGdyb3VwOiBbY2QwLCBjZDBdLCAuLi4gfSBvYmplY3RcbiAgICBmb3IoaSA9IDA7IGkgPCBjYWxjZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2QgPSBjYWxjZGF0YVtpXTtcbiAgICAgICAgdmFyIGNkMCA9IGNkWzBdO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgICAgIHZhciBsZ3JvdXAgPSB0cmFjZS5sZWdlbmRncm91cDtcblxuICAgICAgICBpZihtYWluICYmICghdHJhY2UudmlzaWJsZSB8fCAhdHJhY2Uuc2hvd2xlZ2VuZCkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmKFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsICdwaWUtbGlrZScpKSB7XG4gICAgICAgICAgICBpZighc2xpY2VzU2hvd25bbGdyb3VwXSkgc2xpY2VzU2hvd25bbGdyb3VwXSA9IHt9O1xuXG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBjZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbGogPSBjZFtqXS5sYWJlbDtcblxuICAgICAgICAgICAgICAgIGlmKCFzbGljZXNTaG93bltsZ3JvdXBdW2xhYmVsal0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkT25lSXRlbShsZ3JvdXAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsYWJlbGosXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogY2Rbal0uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBpOiBjZFtqXS5pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2U6IHRyYWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHRzOiBjZFtqXS5wdHNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpY2VzU2hvd25bbGdyb3VwXVtsYWJlbGpdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbWF4TmFtZUxlbmd0aCA9IE1hdGgubWF4KG1heE5hbWVMZW5ndGgsIChsYWJlbGogfHwgJycpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkT25lSXRlbShsZ3JvdXAsIGNkMCk7XG4gICAgICAgICAgICBtYXhOYW1lTGVuZ3RoID0gTWF0aC5tYXgobWF4TmFtZUxlbmd0aCwgKHRyYWNlLm5hbWUgfHwgJycpLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB3b24ndCBkcmF3IGEgbGVnZW5kIGluIHRoaXMgY2FzZVxuICAgIGlmKCFsZ3JvdXBzLmxlbmd0aCkgcmV0dXJuIFtdO1xuXG4gICAgLy8gcmVhcnJhbmdlIGxncm91cFRvVHJhY2VzIGludG8gYSBkMy1mcmllbmRseSBhcnJheSBvZiBhcnJheXNcbiAgICB2YXIgbGdyb3Vwc0xlbmd0aCA9IGxncm91cHMubGVuZ3RoO1xuICAgIHZhciBsdHJhY2VzO1xuICAgIHZhciBsZWdlbmREYXRhO1xuXG4gICAgaWYoaGFzT25lTm9uQmxhbmtHcm91cCAmJiBoZWxwZXJzLmlzR3JvdXBlZChvcHRzKSkge1xuICAgICAgICBsZWdlbmREYXRhID0gbmV3IEFycmF5KGxncm91cHNMZW5ndGgpO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxncm91cHNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbHRyYWNlcyA9IGxncm91cFRvVHJhY2VzW2xncm91cHNbaV1dO1xuICAgICAgICAgICAgbGVnZW5kRGF0YVtpXSA9IGhlbHBlcnMuaXNSZXZlcnNlZChvcHRzKSA/IGx0cmFjZXMucmV2ZXJzZSgpIDogbHRyYWNlcztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNvbGxhcHNlIGFsbCBncm91cHMgaW50byBvbmUgaWYgYWxsIGdyb3VwcyBhcmUgYmxhbmtcbiAgICAgICAgbGVnZW5kRGF0YSA9IFtuZXcgQXJyYXkobGdyb3Vwc0xlbmd0aCldO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxncm91cHNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbHRyYWNlcyA9IGxncm91cFRvVHJhY2VzW2xncm91cHNbaV1dWzBdO1xuICAgICAgICAgICAgbGVnZW5kRGF0YVswXVtoZWxwZXJzLmlzUmV2ZXJzZWQob3B0cykgPyBsZ3JvdXBzTGVuZ3RoIC0gaSAtIDEgOiBpXSA9IGx0cmFjZXM7XG4gICAgICAgIH1cbiAgICAgICAgbGdyb3Vwc0xlbmd0aCA9IDE7XG4gICAgfVxuXG4gICAgLy8gbnVtYmVyIG9mIGxlZ2VuZCBncm91cHMgLSBuZWVkZWQgaW4gbGVnZW5kL2RyYXcuanNcbiAgICBvcHRzLl9sZ3JvdXBzTGVuZ3RoID0gbGdyb3Vwc0xlbmd0aDtcbiAgICAvLyBtYXhpbXVtIG5hbWUvbGFiZWwgbGVuZ3RoIC0gbmVlZGVkIGluIGxlZ2VuZC9kcmF3LmpzXG4gICAgb3B0cy5fbWF4TmFtZUxlbmd0aCA9IG1heE5hbWVMZW5ndGg7XG5cbiAgICByZXR1cm4gbGVnZW5kRGF0YTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbnZhciBTSE9XSVNPTEFURVRJUCA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlQ2xpY2soZywgZ2QsIG51bUNsaWNrcykge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG5cbiAgICBpZihnZC5fZHJhZ2dlZCB8fCBnZC5fZWRpdGluZykgcmV0dXJuO1xuXG4gICAgdmFyIGl0ZW1DbGljayA9IGZ1bGxMYXlvdXQubGVnZW5kLml0ZW1jbGljaztcbiAgICB2YXIgaXRlbURvdWJsZUNsaWNrID0gZnVsbExheW91dC5sZWdlbmQuaXRlbWRvdWJsZWNsaWNrO1xuXG4gICAgaWYobnVtQ2xpY2tzID09PSAxICYmIGl0ZW1DbGljayA9PT0gJ3RvZ2dsZScgJiYgaXRlbURvdWJsZUNsaWNrID09PSAndG9nZ2xlb3RoZXJzJyAmJlxuICAgICAgICBTSE9XSVNPTEFURVRJUCAmJiBnZC5kYXRhICYmIGdkLl9jb250ZXh0LnNob3dUaXBzXG4gICAgKSB7XG4gICAgICAgIExpYi5ub3RpZmllcihMaWIuXyhnZCwgJ0RvdWJsZS1jbGljayBvbiBsZWdlbmQgdG8gaXNvbGF0ZSBvbmUgdHJhY2UnKSwgJ2xvbmcnKTtcbiAgICAgICAgU0hPV0lTT0xBVEVUSVAgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBTSE9XSVNPTEFURVRJUCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBtb2RlO1xuICAgIGlmKG51bUNsaWNrcyA9PT0gMSkgbW9kZSA9IGl0ZW1DbGljaztcbiAgICBlbHNlIGlmKG51bUNsaWNrcyA9PT0gMikgbW9kZSA9IGl0ZW1Eb3VibGVDbGljaztcbiAgICBpZighbW9kZSkgcmV0dXJuO1xuXG4gICAgdmFyIGhpZGRlblNsaWNlcyA9IGZ1bGxMYXlvdXQuaGlkZGVubGFiZWxzID9cbiAgICAgICAgZnVsbExheW91dC5oaWRkZW5sYWJlbHMuc2xpY2UoKSA6XG4gICAgICAgIFtdO1xuXG4gICAgdmFyIGxlZ2VuZEl0ZW0gPSBnLmRhdGEoKVswXVswXTtcbiAgICB2YXIgZnVsbERhdGEgPSBnZC5fZnVsbERhdGE7XG4gICAgdmFyIGZ1bGxUcmFjZSA9IGxlZ2VuZEl0ZW0udHJhY2U7XG4gICAgdmFyIGxlZ2VuZGdyb3VwID0gZnVsbFRyYWNlLmxlZ2VuZGdyb3VwO1xuXG4gICAgdmFyIGksIGosIGtjb250LCBrZXksIGtleXMsIHZhbDtcbiAgICB2YXIgYXR0clVwZGF0ZSA9IHt9O1xuICAgIHZhciBhdHRySW5kaWNlcyA9IFtdO1xuICAgIHZhciBjYXJycyA9IFtdO1xuICAgIHZhciBjYXJySWR4ID0gW107XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRVcGRhdGUodHJhY2VJbmRleCwga2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgYXR0ckluZGV4ID0gYXR0ckluZGljZXMuaW5kZXhPZih0cmFjZUluZGV4KTtcbiAgICAgICAgdmFyIHZhbHVlQXJyYXkgPSBhdHRyVXBkYXRlW2tleV07XG4gICAgICAgIGlmKCF2YWx1ZUFycmF5KSB7XG4gICAgICAgICAgICB2YWx1ZUFycmF5ID0gYXR0clVwZGF0ZVtrZXldID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZihhdHRySW5kaWNlcy5pbmRleE9mKHRyYWNlSW5kZXgpID09PSAtMSkge1xuICAgICAgICAgICAgYXR0ckluZGljZXMucHVzaCh0cmFjZUluZGV4KTtcbiAgICAgICAgICAgIGF0dHJJbmRleCA9IGF0dHJJbmRpY2VzLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZUFycmF5W2F0dHJJbmRleF0gPSB2YWx1ZTtcblxuICAgICAgICByZXR1cm4gYXR0ckluZGV4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFZpc2liaWxpdHkoZnVsbFRyYWNlLCB2aXNpYmlsaXR5KSB7XG4gICAgICAgIHZhciBmdWxsSW5wdXQgPSBmdWxsVHJhY2UuX2Z1bGxJbnB1dDtcbiAgICAgICAgaWYoUmVnaXN0cnkuaGFzVHJhbnNmb3JtKGZ1bGxJbnB1dCwgJ2dyb3VwYnknKSkge1xuICAgICAgICAgICAgdmFyIGtjb250ID0gY2FycnNbZnVsbElucHV0LmluZGV4XTtcbiAgICAgICAgICAgIGlmKCFrY29udCkge1xuICAgICAgICAgICAgICAgIHZhciBncm91cGJ5SW5kaWNlcyA9IFJlZ2lzdHJ5LmdldFRyYW5zZm9ybUluZGljZXMoZnVsbElucHV0LCAnZ3JvdXBieScpO1xuICAgICAgICAgICAgICAgIHZhciBsYXN0R3JvdXBieUluZGV4ID0gZ3JvdXBieUluZGljZXNbZ3JvdXBieUluZGljZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAga2NvbnQgPSBMaWIua2V5ZWRDb250YWluZXIoZnVsbElucHV0LCAndHJhbnNmb3Jtc1snICsgbGFzdEdyb3VwYnlJbmRleCArICddLnN0eWxlcycsICd0YXJnZXQnLCAndmFsdWUudmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIGNhcnJzW2Z1bGxJbnB1dC5pbmRleF0gPSBrY29udDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGN1clN0YXRlID0ga2NvbnQuZ2V0KGZ1bGxUcmFjZS5fZ3JvdXApO1xuXG4gICAgICAgICAgICAvLyBJZiBub3Qgc3BlY2lmaWVkLCBhc3N1bWUgdmlzaWJsZS4gVGhpcyBoYXBwZW5zIGlmIHRoZXJlIGFyZSBvdGhlciBzdHlsZVxuICAgICAgICAgICAgLy8gcHJvcGVydGllcyBzZXQgZm9yIGEgZ3JvdXAgYnV0IG5vdCB0aGUgdmlzaWJpbGl0eS4gVGhlcmUgYXJlIG1hbnkgc2ltaWxhclxuICAgICAgICAgICAgLy8gd2F5cyB0byBkbyB0aGlzIChlLmcuIHdoeSBub3QganVzdCBgY3VyU3RhdGUgPSBmdWxsVHJhY2UudmlzaWJsZWA/Pz8gVGhlXG4gICAgICAgICAgICAvLyBhbnN3ZXIgaXM6IGJlY2F1c2UgaXQgYnJlYWtzIG90aGVyIHRoaW5ncyBsaWtlIGdyb3VwYnkgdHJhY2UgbmFtZXMgaW5cbiAgICAgICAgICAgIC8vIHN1YnRsZSB3YXlzLilcbiAgICAgICAgICAgIGlmKGN1clN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGN1clN0YXRlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIC8vIHRydWUgLT4gbGVnZW5kb25seS4gQWxsIG90aGVycyB0b2dnbGUgdG8gdHJ1ZTpcbiAgICAgICAgICAgICAgICBrY29udC5zZXQoZnVsbFRyYWNlLl9ncm91cCwgdmlzaWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJySWR4W2Z1bGxJbnB1dC5pbmRleF0gPSBpbnNlcnRVcGRhdGUoZnVsbElucHV0LmluZGV4LCAndmlzaWJsZScsIGZ1bGxJbnB1dC52aXNpYmxlID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBmYWxzZSAtPiBmYWxzZSAobm90IHBvc3NpYmxlIHNpbmNlIHdpbGwgbm90IGJlIHZpc2libGUgaW4gbGVnZW5kKVxuICAgICAgICAgICAgLy8gdHJ1ZSAtPiBsZWdlbmRvbmx5XG4gICAgICAgICAgICAvLyBsZWdlbmRvbmx5IC0+IHRydWVcbiAgICAgICAgICAgIHZhciBuZXh0VmlzaWJpbGl0eSA9IGZ1bGxJbnB1dC52aXNpYmxlID09PSBmYWxzZSA/IGZhbHNlIDogdmlzaWJpbGl0eTtcblxuICAgICAgICAgICAgaW5zZXJ0VXBkYXRlKGZ1bGxJbnB1dC5pbmRleCwgJ3Zpc2libGUnLCBuZXh0VmlzaWJpbGl0eSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihSZWdpc3RyeS50cmFjZUlzKGZ1bGxUcmFjZSwgJ3BpZS1saWtlJykpIHtcbiAgICAgICAgdmFyIHRoaXNMYWJlbCA9IGxlZ2VuZEl0ZW0ubGFiZWw7XG4gICAgICAgIHZhciB0aGlzTGFiZWxJbmRleCA9IGhpZGRlblNsaWNlcy5pbmRleE9mKHRoaXNMYWJlbCk7XG5cbiAgICAgICAgaWYobW9kZSA9PT0gJ3RvZ2dsZScpIHtcbiAgICAgICAgICAgIGlmKHRoaXNMYWJlbEluZGV4ID09PSAtMSkgaGlkZGVuU2xpY2VzLnB1c2godGhpc0xhYmVsKTtcbiAgICAgICAgICAgIGVsc2UgaGlkZGVuU2xpY2VzLnNwbGljZSh0aGlzTGFiZWxJbmRleCwgMSk7XG4gICAgICAgIH0gZWxzZSBpZihtb2RlID09PSAndG9nZ2xlb3RoZXJzJykge1xuICAgICAgICAgICAgaGlkZGVuU2xpY2VzID0gW107XG4gICAgICAgICAgICBnZC5jYWxjZGF0YVswXS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzTGFiZWwgIT09IGQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuU2xpY2VzLnB1c2goZC5sYWJlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZihnZC5fZnVsbExheW91dC5oaWRkZW5sYWJlbHMgJiYgZ2QuX2Z1bGxMYXlvdXQuaGlkZGVubGFiZWxzLmxlbmd0aCA9PT0gaGlkZGVuU2xpY2VzLmxlbmd0aCAmJiB0aGlzTGFiZWxJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5TbGljZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFJlZ2lzdHJ5LmNhbGwoJ19ndWlSZWxheW91dCcsIGdkLCAnaGlkZGVubGFiZWxzJywgaGlkZGVuU2xpY2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaGFzTGVnZW5kZ3JvdXAgPSBsZWdlbmRncm91cCAmJiBsZWdlbmRncm91cC5sZW5ndGg7XG4gICAgICAgIHZhciB0cmFjZUluZGljZXNJbkdyb3VwID0gW107XG4gICAgICAgIHZhciB0cmFjZWk7XG4gICAgICAgIGlmKGhhc0xlZ2VuZGdyb3VwKSB7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBmdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRyYWNlaSA9IGZ1bGxEYXRhW2ldO1xuICAgICAgICAgICAgICAgIGlmKCF0cmFjZWkudmlzaWJsZSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYodHJhY2VpLmxlZ2VuZGdyb3VwID09PSBsZWdlbmRncm91cCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFjZUluZGljZXNJbkdyb3VwLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYobW9kZSA9PT0gJ3RvZ2dsZScpIHtcbiAgICAgICAgICAgIHZhciBuZXh0VmlzaWJpbGl0eTtcblxuICAgICAgICAgICAgc3dpdGNoKGZ1bGxUcmFjZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICAgICAgICBuZXh0VmlzaWJpbGl0eSA9ICdsZWdlbmRvbmx5JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgbmV4dFZpc2liaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVnZW5kb25seSc6XG4gICAgICAgICAgICAgICAgICAgIG5leHRWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGhhc0xlZ2VuZGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZnVsbERhdGFbaV0udmlzaWJsZSAhPT0gZmFsc2UgJiYgZnVsbERhdGFbaV0ubGVnZW5kZ3JvdXAgPT09IGxlZ2VuZGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWaXNpYmlsaXR5KGZ1bGxEYXRhW2ldLCBuZXh0VmlzaWJpbGl0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFZpc2liaWxpdHkoZnVsbFRyYWNlLCBuZXh0VmlzaWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihtb2RlID09PSAndG9nZ2xlb3RoZXJzJykge1xuICAgICAgICAgICAgLy8gQ29tcHV0ZSB0aGUgY2xpY2tlZCBpbmRleC4gZXhwYW5kZWRJbmRleCBkb2VzIHdoYXQgd2Ugd2FudCBmb3IgZXhwYW5kZWQgdHJhY2VzXG4gICAgICAgICAgICAvLyBidXQgYWxzbyBjdWxscyBoaWRkZW4gdHJhY2VzLiBUaGF0IG1lYW5zIHdlIGhhdmUgc29tZSB3b3JrIHRvIGRvLlxuICAgICAgICAgICAgdmFyIGlzQ2xpY2tlZCwgaXNJbkdyb3VwLCBub3RJbkxlZ2VuZCwgb3RoZXJTdGF0ZTtcbiAgICAgICAgICAgIHZhciBpc0lzb2xhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaXNDbGlja2VkID0gZnVsbERhdGFbaV0gPT09IGZ1bGxUcmFjZTtcbiAgICAgICAgICAgICAgICBub3RJbkxlZ2VuZCA9IGZ1bGxEYXRhW2ldLnNob3dsZWdlbmQgIT09IHRydWU7XG4gICAgICAgICAgICAgICAgaWYoaXNDbGlja2VkIHx8IG5vdEluTGVnZW5kKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlzSW5Hcm91cCA9IChoYXNMZWdlbmRncm91cCAmJiBmdWxsRGF0YVtpXS5sZWdlbmRncm91cCA9PT0gbGVnZW5kZ3JvdXApO1xuXG4gICAgICAgICAgICAgICAgaWYoIWlzSW5Hcm91cCAmJiBmdWxsRGF0YVtpXS52aXNpYmxlID09PSB0cnVlICYmICFSZWdpc3RyeS50cmFjZUlzKGZ1bGxEYXRhW2ldLCAnbm90TGVnZW5kSXNvbGF0YWJsZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzSXNvbGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBmdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIEZhbHNlIGlzIHN0aWNreTsgd2UgZG9uJ3QgY2hhbmdlIGl0LlxuICAgICAgICAgICAgICAgIGlmKGZ1bGxEYXRhW2ldLnZpc2libGUgPT09IGZhbHNlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmKFJlZ2lzdHJ5LnRyYWNlSXMoZnVsbERhdGFbaV0sICdub3RMZWdlbmRJc29sYXRhYmxlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoKGZ1bGxUcmFjZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xlZ2VuZG9ubHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmlzaWJpbGl0eShmdWxsRGF0YVtpXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJTdGF0ZSA9IGlzSXNvbGF0ZWQgPyB0cnVlIDogJ2xlZ2VuZG9ubHknO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNDbGlja2VkID0gZnVsbERhdGFbaV0gPT09IGZ1bGxUcmFjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE4uQi4gY29uc2lkZXIgdHJhY2VzIHRoYXQgaGF2ZSBhIHNldCBsZWdlbmRncm91cCBhcyB0b2dnbGVhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RJbkxlZ2VuZCA9IChmdWxsRGF0YVtpXS5zaG93bGVnZW5kICE9PSB0cnVlICYmICFmdWxsRGF0YVtpXS5sZWdlbmRncm91cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0luR3JvdXAgPSBpc0NsaWNrZWQgfHwgKGhhc0xlZ2VuZGdyb3VwICYmIGZ1bGxEYXRhW2ldLmxlZ2VuZGdyb3VwID09PSBsZWdlbmRncm91cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWaXNpYmlsaXR5KGZ1bGxEYXRhW2ldLCAoaXNJbkdyb3VwIHx8IG5vdEluTGVnZW5kKSA/IHRydWUgOiBvdGhlclN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNhcnJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrY29udCA9IGNhcnJzW2ldO1xuICAgICAgICAgICAgaWYoIWtjb250KSBjb250aW51ZTtcbiAgICAgICAgICAgIHZhciB1cGRhdGUgPSBrY29udC5jb25zdHJ1Y3RVcGRhdGUoKTtcblxuICAgICAgICAgICAgdmFyIHVwZGF0ZUtleXMgPSBPYmplY3Qua2V5cyh1cGRhdGUpO1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgdXBkYXRlS2V5cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGtleSA9IHVwZGF0ZUtleXNbal07XG4gICAgICAgICAgICAgICAgdmFsID0gYXR0clVwZGF0ZVtrZXldID0gYXR0clVwZGF0ZVtrZXldIHx8IFtdO1xuICAgICAgICAgICAgICAgIHZhbFtjYXJySWR4W2ldXSA9IHVwZGF0ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIGxlbmd0aCBvZiB0aGUgdmFsdWUgYXJyYXlzIHNob3VsZCBiZSBlcXVhbCBhbmQgYW55IHVuc3BlY2lmaWVkXG4gICAgICAgIC8vIHZhbHVlcyBzaG91bGQgYmUgZXhwbGljaXRseSB1bmRlZmluZWQgZm9yIHRoZW0gdG8gZ2V0IHByb3Blcmx5IGN1bGxlZFxuICAgICAgICAvLyBhcyB1cGRhdGVzIGFuZCBub3QgYWNjaWRlbnRhbGx5IHJlc2V0IHRvIHRoZSBkZWZhdWx0IHZhbHVlLiBUaGlzIGZpbGxzXG4gICAgICAgIC8vIG91dCBzcGFyc2UgYXJyYXlzIHdpdGggdGhlIHJlcXVpcmVkIG51bWJlciBvZiB1bmRlZmluZWQgdmFsdWVzOlxuICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMoYXR0clVwZGF0ZSk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBhdHRySW5kaWNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIC8vIFVzZSBoYXNPd25Qcm9wZXR5IHRvIHByb3RlY3QgYWdhaW5zdCBmYWxzZXkgdmFsdWVzOlxuICAgICAgICAgICAgICAgIGlmKCFhdHRyVXBkYXRlW2tleV0uaGFzT3duUHJvcGVydHkoaikpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0clVwZGF0ZVtrZXldW2pdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFJlZ2lzdHJ5LmNhbGwoJ19ndWlSZXN0eWxlJywgZ2QsIGF0dHJVcGRhdGUsIGF0dHJJbmRpY2VzKTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuaXNHcm91cGVkID0gZnVuY3Rpb24gaXNHcm91cGVkKGxlZ2VuZExheW91dCkge1xuICAgIHJldHVybiAobGVnZW5kTGF5b3V0LnRyYWNlb3JkZXIgfHwgJycpLmluZGV4T2YoJ2dyb3VwZWQnKSAhPT0gLTE7XG59O1xuXG5leHBvcnRzLmlzVmVydGljYWwgPSBmdW5jdGlvbiBpc1ZlcnRpY2FsKGxlZ2VuZExheW91dCkge1xuICAgIHJldHVybiBsZWdlbmRMYXlvdXQub3JpZW50YXRpb24gIT09ICdoJztcbn07XG5cbmV4cG9ydHMuaXNSZXZlcnNlZCA9IGZ1bmN0aW9uIGlzUmV2ZXJzZWQobGVnZW5kTGF5b3V0KSB7XG4gICAgcmV0dXJuIChsZWdlbmRMYXlvdXQudHJhY2VvcmRlciB8fCAnJykuaW5kZXhPZigncmV2ZXJzZWQnKSAhPT0gLTE7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi9kcmF3aW5nJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi9jb2xvcicpO1xudmFyIGV4dHJhY3RPcHRzID0gcmVxdWlyZSgnLi4vY29sb3JzY2FsZS9oZWxwZXJzJykuZXh0cmFjdE9wdHM7XG5cbnZhciBzdWJUeXBlcyA9IHJlcXVpcmUoJy4uLy4uL3RyYWNlcy9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgc3R5bGVQaWUgPSByZXF1aXJlKCcuLi8uLi90cmFjZXMvcGllL3N0eWxlX29uZScpO1xudmFyIHBpZUNhc3RPcHRpb24gPSByZXF1aXJlKCcuLi8uLi90cmFjZXMvcGllL2hlbHBlcnMnKS5jYXN0T3B0aW9uO1xuXG52YXIgQ1NUX01BUktFUl9TSVpFID0gMTI7XG52YXIgQ1NUX0xJTkVfV0lEVEggPSA1O1xudmFyIENTVF9NQVJLRVJfTElORV9XSURUSCA9IDI7XG52YXIgTUFYX0xJTkVfV0lEVEggPSAxMDtcbnZhciBNQVhfTUFSS0VSX0xJTkVfV0lEVEggPSA1O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0eWxlKHMsIGdkLCBsZWdlbmQpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIGlmKCFsZWdlbmQpIGxlZ2VuZCA9IGZ1bGxMYXlvdXQubGVnZW5kO1xuICAgIHZhciBjb25zdGFudEl0ZW1TaXppbmcgPSBsZWdlbmQuaXRlbXNpemluZyA9PT0gJ2NvbnN0YW50JztcblxuICAgIHZhciBib3VuZExpbmVXaWR0aCA9IGZ1bmN0aW9uKG1sdywgY29udCwgbWF4LCBjc3QpIHtcbiAgICAgICAgdmFyIHY7XG4gICAgICAgIGlmKG1sdyArIDEpIHtcbiAgICAgICAgICAgIHYgPSBtbHc7XG4gICAgICAgIH0gZWxzZSBpZihjb250ICYmIGNvbnQud2lkdGggPiAwKSB7XG4gICAgICAgICAgICB2ID0gY29udC53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25zdGFudEl0ZW1TaXppbmcgPyBjc3QgOiBNYXRoLm1pbih2LCBtYXgpO1xuICAgIH07XG5cbiAgICBzLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgdHJhY2VHcm91cCA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICB2YXIgbGF5ZXJzID0gTGliLmVuc3VyZVNpbmdsZSh0cmFjZUdyb3VwLCAnZycsICdsYXllcnMnKTtcbiAgICAgICAgbGF5ZXJzLnN0eWxlKCdvcGFjaXR5JywgZFswXS50cmFjZS5vcGFjaXR5KTtcblxuICAgICAgICB2YXIgdmFsaWduID0gbGVnZW5kLnZhbGlnbjtcbiAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSBkWzBdLmxpbmVIZWlnaHQ7XG4gICAgICAgIHZhciBoZWlnaHQgPSBkWzBdLmhlaWdodDtcblxuICAgICAgICBpZih2YWxpZ24gPT09ICdtaWRkbGUnIHx8ICFsaW5lSGVpZ2h0IHx8ICFoZWlnaHQpIHtcbiAgICAgICAgICAgIGxheWVycy5hdHRyKCd0cmFuc2Zvcm0nLCBudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmYWN0b3IgPSB7dG9wOiAxLCBib3R0b206IC0xfVt2YWxpZ25dO1xuICAgICAgICAgICAgdmFyIG1hcmtlck9mZnNldFkgPSBmYWN0b3IgKiAoMC41ICogKGxpbmVIZWlnaHQgLSBoZWlnaHQgKyAzKSk7XG4gICAgICAgICAgICBsYXllcnMuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyBtYXJrZXJPZmZzZXRZICsgJyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaWxsID0gbGF5ZXJzXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdnLmxlZ2VuZGZpbGwnKVxuICAgICAgICAgICAgICAgIC5kYXRhKFtkXSk7XG4gICAgICAgIGZpbGwuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2xlZ2VuZGZpbGwnLCB0cnVlKTtcblxuICAgICAgICB2YXIgbGluZSA9IGxheWVyc1xuICAgICAgICAgICAgLnNlbGVjdEFsbCgnZy5sZWdlbmRsaW5lcycpXG4gICAgICAgICAgICAgICAgLmRhdGEoW2RdKTtcbiAgICAgICAgbGluZS5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbGVnZW5kbGluZXMnLCB0cnVlKTtcblxuICAgICAgICB2YXIgc3ltYm9sID0gbGF5ZXJzXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdnLmxlZ2VuZHN5bWJvbHMnKVxuICAgICAgICAgICAgICAgIC5kYXRhKFtkXSk7XG4gICAgICAgIHN5bWJvbC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuY2xhc3NlZCgnbGVnZW5kc3ltYm9scycsIHRydWUpO1xuXG4gICAgICAgIHN5bWJvbC5zZWxlY3RBbGwoJ2cubGVnZW5kcG9pbnRzJylcbiAgICAgICAgICAgIC5kYXRhKFtkXSlcbiAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2xlZ2VuZHBvaW50cycsIHRydWUpO1xuICAgIH0pXG4gICAgLmVhY2goc3R5bGVTcGF0aWFsKVxuICAgIC5lYWNoKHN0eWxlV2F0ZXJmYWxscylcbiAgICAuZWFjaChzdHlsZUZ1bm5lbHMpXG4gICAgLmVhY2goc3R5bGVCYXJzKVxuICAgIC5lYWNoKHN0eWxlQm94ZXMpXG4gICAgLmVhY2goc3R5bGVGdW5uZWxhcmVhcylcbiAgICAuZWFjaChzdHlsZVBpZXMpXG4gICAgLmVhY2goc3R5bGVMaW5lcylcbiAgICAuZWFjaChzdHlsZVBvaW50cylcbiAgICAuZWFjaChzdHlsZUNhbmRsZXMpXG4gICAgLmVhY2goc3R5bGVPSExDKTtcblxuICAgIGZ1bmN0aW9uIHN0eWxlTGluZXMoZCkge1xuICAgICAgICB2YXIgZDAgPSBkWzBdO1xuICAgICAgICB2YXIgdHJhY2UgPSBkMC50cmFjZTtcbiAgICAgICAgdmFyIHNob3dGaWxsID0gdHJhY2UudmlzaWJsZSAmJiB0cmFjZS5maWxsICYmIHRyYWNlLmZpbGwgIT09ICdub25lJztcbiAgICAgICAgdmFyIHNob3dMaW5lID0gc3ViVHlwZXMuaGFzTGluZXModHJhY2UpO1xuICAgICAgICB2YXIgY29udG91cnMgPSB0cmFjZS5jb250b3VycztcbiAgICAgICAgdmFyIHNob3dHcmFkaWVudExpbmUgPSBmYWxzZTtcbiAgICAgICAgdmFyIHNob3dHcmFkaWVudEZpbGwgPSBmYWxzZTtcbiAgICAgICAgdmFyIGRNb2QsIHRNb2Q7XG5cbiAgICAgICAgdmFyIGNPcHRzID0gZXh0cmFjdE9wdHModHJhY2UpO1xuICAgICAgICB2YXIgY29sb3JzY2FsZSA9IGNPcHRzLmNvbG9yc2NhbGU7XG4gICAgICAgIHZhciByZXZlcnNlc2NhbGUgPSBjT3B0cy5yZXZlcnNlc2NhbGU7XG5cbiAgICAgICAgdmFyIGZpbGxHcmFkaWVudCA9IGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIGlmKHMuc2l6ZSgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdyYWRpZW50SUQgPSAnbGVnZW5kZmlsbC0nICsgdHJhY2UudWlkO1xuICAgICAgICAgICAgICAgIERyYXdpbmcuZ3JhZGllbnQocywgZ2QsIGdyYWRpZW50SUQsXG4gICAgICAgICAgICAgICAgICAgIGdldEdyYWRpZW50RGlyZWN0aW9uKHJldmVyc2VzY2FsZSksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yc2NhbGUsICdmaWxsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGxpbmVHcmFkaWVudCA9IGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIGlmKHMuc2l6ZSgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdyYWRpZW50SUQgPSAnbGVnZW5kbGluZS0nICsgdHJhY2UudWlkO1xuICAgICAgICAgICAgICAgIERyYXdpbmcubGluZUdyb3VwU3R5bGUocyk7XG4gICAgICAgICAgICAgICAgRHJhd2luZy5ncmFkaWVudChzLCBnZCwgZ3JhZGllbnRJRCxcbiAgICAgICAgICAgICAgICAgICAgZ2V0R3JhZGllbnREaXJlY3Rpb24ocmV2ZXJzZXNjYWxlKSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3JzY2FsZSwgJ3N0cm9rZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKGNvbnRvdXJzKSB7XG4gICAgICAgICAgICB2YXIgY29sb3JpbmcgPSBjb250b3Vycy5jb2xvcmluZztcblxuICAgICAgICAgICAgaWYoY29sb3JpbmcgPT09ICdsaW5lcycpIHtcbiAgICAgICAgICAgICAgICBzaG93R3JhZGllbnRMaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd0xpbmUgPSBjb2xvcmluZyA9PT0gJ25vbmUnIHx8IGNvbG9yaW5nID09PSAnaGVhdG1hcCcgfHwgY29udG91cnMuc2hvd2xpbmVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjb250b3Vycy50eXBlID09PSAnY29uc3RyYWludCcpIHtcbiAgICAgICAgICAgICAgICBzaG93RmlsbCA9IGNvbnRvdXJzLl9vcGVyYXRpb24gIT09ICc9JztcbiAgICAgICAgICAgIH0gZWxzZSBpZihjb2xvcmluZyA9PT0gJ2ZpbGwnIHx8IGNvbG9yaW5nID09PSAnaGVhdG1hcCcpIHtcbiAgICAgICAgICAgICAgICBzaG93R3JhZGllbnRGaWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdpdGggZmlsbCBhbmQgbm8gbWFya2VycyBvciB0ZXh0LCBtb3ZlIHRoZSBsaW5lIGFuZCBmaWxsIHVwIGEgYml0XG4gICAgICAgIC8vIHNvIGl0J3MgbW9yZSBjZW50ZXJlZFxuICAgICAgICB2YXIgbWFya2Vyc09yVGV4dCA9IHN1YlR5cGVzLmhhc01hcmtlcnModHJhY2UpIHx8IHN1YlR5cGVzLmhhc1RleHQodHJhY2UpO1xuICAgICAgICB2YXIgYW55RmlsbCA9IHNob3dGaWxsIHx8IHNob3dHcmFkaWVudEZpbGw7XG4gICAgICAgIHZhciBhbnlMaW5lID0gc2hvd0xpbmUgfHwgc2hvd0dyYWRpZW50TGluZTtcbiAgICAgICAgdmFyIHBhdGhTdGFydCA9IChtYXJrZXJzT3JUZXh0IHx8ICFhbnlGaWxsKSA/ICdNNSwwJyA6XG4gICAgICAgICAgICAvLyB3aXRoIGEgbGluZSBsZWF2ZSBpdCBzbGlnaHRseSBiZWxvdyBjZW50ZXIsIHRvIGxlYXZlIHJvb20gZm9yIHRoZVxuICAgICAgICAgICAgLy8gbGluZSB0aGlja25lc3MgYW5kIGJlY2F1c2UgdGhlIGxpbmUgaXMgdXN1YWxseSBtb3JlIHByb21pbmVudFxuICAgICAgICAgICAgYW55TGluZSA/ICdNNSwtMicgOiAnTTUsLTMnO1xuXG4gICAgICAgIHZhciB0aGlzMyA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICB2YXIgZmlsbCA9IHRoaXMzLnNlbGVjdCgnLmxlZ2VuZGZpbGwnKS5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoc2hvd0ZpbGwgfHwgc2hvd0dyYWRpZW50RmlsbCA/IFtkXSA6IFtdKTtcbiAgICAgICAgZmlsbC5lbnRlcigpLmFwcGVuZCgncGF0aCcpLmNsYXNzZWQoJ2pzLWZpbGwnLCB0cnVlKTtcbiAgICAgICAgZmlsbC5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIGZpbGwuYXR0cignZCcsIHBhdGhTdGFydCArICdoMzB2NmgtMzB6JylcbiAgICAgICAgICAgIC5jYWxsKHNob3dGaWxsID8gRHJhd2luZy5maWxsR3JvdXBTdHlsZSA6IGZpbGxHcmFkaWVudCk7XG5cbiAgICAgICAgaWYoc2hvd0xpbmUgfHwgc2hvd0dyYWRpZW50TGluZSkge1xuICAgICAgICAgICAgdmFyIGx3ID0gYm91bmRMaW5lV2lkdGgodW5kZWZpbmVkLCB0cmFjZS5saW5lLCBNQVhfTElORV9XSURUSCwgQ1NUX0xJTkVfV0lEVEgpO1xuICAgICAgICAgICAgdE1vZCA9IExpYi5taW5FeHRlbmQodHJhY2UsIHtsaW5lOiB7d2lkdGg6IGx3fX0pO1xuICAgICAgICAgICAgZE1vZCA9IFtMaWIubWluRXh0ZW5kKGQwLCB7dHJhY2U6IHRNb2R9KV07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGluZSA9IHRoaXMzLnNlbGVjdCgnLmxlZ2VuZGxpbmVzJykuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgICAgICAgIC5kYXRhKHNob3dMaW5lIHx8IHNob3dHcmFkaWVudExpbmUgPyBbZE1vZF0gOiBbXSk7XG4gICAgICAgIGxpbmUuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKS5jbGFzc2VkKCdqcy1saW5lJywgdHJ1ZSk7XG4gICAgICAgIGxpbmUuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgdWdseS4uLiBidXQgeW91IGNhbid0IGFwcGx5IGEgZ3JhZGllbnQgdG8gYSBwZXJmZWN0bHlcbiAgICAgICAgLy8gaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBsaW5lLiBQcmVzdW1hYmx5IGJlY2F1c2UgdGhlblxuICAgICAgICAvLyB0aGUgc3lzdGVtIGRvZXNuJ3Qga25vdyBob3cgdG8gc2NhbGUgdmVydGljYWwgdmFyaWF0aW9uLCBldmVuXG4gICAgICAgIC8vIHRob3VnaCB0aGVyZSAqaXMqIG5vIHZlcnRpY2FsIHZhcmlhdGlvbiBpbiB0aGlzIGNhc2UuXG4gICAgICAgIC8vIHNvIGFkZCBhbiBpbnZpc2libHkgc21hbGwgYW5nbGUgdG8gdGhlIGxpbmVcbiAgICAgICAgLy8gVGhpcyBpc3N1ZSAoYW5kIHdvcmthcm91bmQpIGV4aXN0IGFjcm9zcyAoTWFjKSBDaHJvbWUsIEZGLCBhbmQgU2FmYXJpXG4gICAgICAgIGxpbmUuYXR0cignZCcsIHBhdGhTdGFydCArIChzaG93R3JhZGllbnRMaW5lID8gJ2wzMCwwLjAwMDEnIDogJ2gzMCcpKVxuICAgICAgICAgICAgLmNhbGwoc2hvd0xpbmUgPyBEcmF3aW5nLmxpbmVHcm91cFN0eWxlIDogbGluZUdyYWRpZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHlsZVBvaW50cyhkKSB7XG4gICAgICAgIHZhciBkMCA9IGRbMF07XG4gICAgICAgIHZhciB0cmFjZSA9IGQwLnRyYWNlO1xuICAgICAgICB2YXIgc2hvd01hcmtlcnMgPSBzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlKTtcbiAgICAgICAgdmFyIHNob3dUZXh0ID0gc3ViVHlwZXMuaGFzVGV4dCh0cmFjZSk7XG4gICAgICAgIHZhciBzaG93TGluZXMgPSBzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZSk7XG4gICAgICAgIHZhciBkTW9kLCB0TW9kO1xuXG4gICAgICAgIC8vICdzY2F0dGVyM2QnIGRvbid0IHVzZSBnZC5jYWxjZGF0YSxcbiAgICAgICAgLy8gdXNlIGQwLnRyYWNlIHRvIGluZmVyIGFycmF5T2sgYXR0cmlidXRlc1xuXG4gICAgICAgIGZ1bmN0aW9uIGJvdW5kVmFsKGF0dHJJbiwgYXJyYXlUb1ZhbEZuLCBib3VuZHMsIGNzdCkge1xuICAgICAgICAgICAgdmFyIHZhbEluID0gTGliLm5lc3RlZFByb3BlcnR5KHRyYWNlLCBhdHRySW4pLmdldCgpO1xuICAgICAgICAgICAgdmFyIHZhbFRvQm91bmQgPSAoTGliLmlzQXJyYXlPclR5cGVkQXJyYXkodmFsSW4pICYmIGFycmF5VG9WYWxGbikgP1xuICAgICAgICAgICAgICAgIGFycmF5VG9WYWxGbih2YWxJbikgOlxuICAgICAgICAgICAgICAgIHZhbEluO1xuXG4gICAgICAgICAgICBpZihjb25zdGFudEl0ZW1TaXppbmcgJiYgdmFsVG9Cb3VuZCAmJiBjc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbFRvQm91bmQgPSBjc3Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGJvdW5kcykge1xuICAgICAgICAgICAgICAgIGlmKHZhbFRvQm91bmQgPCBib3VuZHNbMF0pIHJldHVybiBib3VuZHNbMF07XG4gICAgICAgICAgICAgICAgZWxzZSBpZih2YWxUb0JvdW5kID4gYm91bmRzWzFdKSByZXR1cm4gYm91bmRzWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbFRvQm91bmQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwaWNrRmlyc3QoYXJyYXkpIHtcbiAgICAgICAgICAgIGlmKGQwLl9kaXN0aW5jdCAmJiBkMC5pbmRleCAmJiBhcnJheVtkMC5pbmRleF0pIHJldHVybiBhcnJheVtkMC5pbmRleF07XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbMF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zdHJhaW4gdGV4dCwgbWFya2VycywgZXRjIHNvIHRoZXknbGwgZml0IG9uIHRoZSBsZWdlbmRcbiAgICAgICAgaWYoc2hvd01hcmtlcnMgfHwgc2hvd1RleHQgfHwgc2hvd0xpbmVzKSB7XG4gICAgICAgICAgICB2YXIgZEVkaXQgPSB7fTtcbiAgICAgICAgICAgIHZhciB0RWRpdCA9IHt9O1xuXG4gICAgICAgICAgICBpZihzaG93TWFya2Vycykge1xuICAgICAgICAgICAgICAgIGRFZGl0Lm1jID0gYm91bmRWYWwoJ21hcmtlci5jb2xvcicsIHBpY2tGaXJzdCk7XG4gICAgICAgICAgICAgICAgZEVkaXQubXggPSBib3VuZFZhbCgnbWFya2VyLnN5bWJvbCcsIHBpY2tGaXJzdCk7XG4gICAgICAgICAgICAgICAgZEVkaXQubW8gPSBib3VuZFZhbCgnbWFya2VyLm9wYWNpdHknLCBMaWIubWVhbiwgWzAuMiwgMV0pO1xuICAgICAgICAgICAgICAgIGRFZGl0Lm1sYyA9IGJvdW5kVmFsKCdtYXJrZXIubGluZS5jb2xvcicsIHBpY2tGaXJzdCk7XG4gICAgICAgICAgICAgICAgZEVkaXQubWx3ID0gYm91bmRWYWwoJ21hcmtlci5saW5lLndpZHRoJywgTGliLm1lYW4sIFswLCA1XSwgQ1NUX01BUktFUl9MSU5FX1dJRFRIKTtcbiAgICAgICAgICAgICAgICB0RWRpdC5tYXJrZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNpemVyZWY6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNpemVtaW46IDEsXG4gICAgICAgICAgICAgICAgICAgIHNpemVtb2RlOiAnZGlhbWV0ZXInXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBtcyA9IGJvdW5kVmFsKCdtYXJrZXIuc2l6ZScsIExpYi5tZWFuLCBbMiwgMTZdLCBDU1RfTUFSS0VSX1NJWkUpO1xuICAgICAgICAgICAgICAgIGRFZGl0Lm1zID0gbXM7XG4gICAgICAgICAgICAgICAgdEVkaXQubWFya2VyLnNpemUgPSBtcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2hvd0xpbmVzKSB7XG4gICAgICAgICAgICAgICAgdEVkaXQubGluZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGJvdW5kVmFsKCdsaW5lLndpZHRoJywgcGlja0ZpcnN0LCBbMCwgMTBdLCBDU1RfTElORV9XSURUSClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzaG93VGV4dCkge1xuICAgICAgICAgICAgICAgIGRFZGl0LnR4ID0gJ0FhJztcbiAgICAgICAgICAgICAgICBkRWRpdC50cCA9IGJvdW5kVmFsKCd0ZXh0cG9zaXRpb24nLCBwaWNrRmlyc3QpO1xuICAgICAgICAgICAgICAgIGRFZGl0LnRzID0gMTA7XG4gICAgICAgICAgICAgICAgZEVkaXQudGMgPSBib3VuZFZhbCgndGV4dGZvbnQuY29sb3InLCBwaWNrRmlyc3QpO1xuICAgICAgICAgICAgICAgIGRFZGl0LnRmID0gYm91bmRWYWwoJ3RleHRmb250LmZhbWlseScsIHBpY2tGaXJzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRNb2QgPSBbTGliLm1pbkV4dGVuZChkMCwgZEVkaXQpXTtcbiAgICAgICAgICAgIHRNb2QgPSBMaWIubWluRXh0ZW5kKHRyYWNlLCB0RWRpdCk7XG5cbiAgICAgICAgICAgIC8vIGFsd2F5cyBzaG93IGxlZ2VuZCBpdGVtcyBpbiBiYXNlIHN0YXRlXG4gICAgICAgICAgICB0TW9kLnNlbGVjdGVkcG9pbnRzID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gbmV2ZXIgc2hvdyB0ZXh0dGVtcGxhdGVcbiAgICAgICAgICAgIHRNb2QudGV4dHRlbXBsYXRlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwdGdyb3VwID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgnZy5sZWdlbmRwb2ludHMnKTtcblxuICAgICAgICB2YXIgcHRzID0gcHRncm91cC5zZWxlY3RBbGwoJ3BhdGguc2NhdHRlcnB0cycpXG4gICAgICAgICAgICAuZGF0YShzaG93TWFya2VycyA/IGRNb2QgOiBbXSk7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSBtYXJrZXIgaXMgb24gdGhlIGJvdHRvbSwgaW4gY2FzZSBpdCBlbnRlcnMgYWZ0ZXIgdGV4dFxuICAgICAgICBwdHMuZW50ZXIoKS5pbnNlcnQoJ3BhdGgnLCAnOmZpcnN0LWNoaWxkJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzY2F0dGVycHRzJywgdHJ1ZSlcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDIwLDApJyk7XG4gICAgICAgIHB0cy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHB0cy5jYWxsKERyYXdpbmcucG9pbnRTdHlsZSwgdE1vZCwgZ2QpO1xuXG4gICAgICAgIC8vICdtcmMnIGlzIHNldCBpbiBwb2ludFN0eWxlIGFuZCB1c2VkIGluIHRleHRQb2ludFN0eWxlOlxuICAgICAgICAvLyBjb25zdHJhaW4gaXQgaGVyZVxuICAgICAgICBpZihzaG93TWFya2VycykgZE1vZFswXS5tcmMgPSAzO1xuXG4gICAgICAgIHZhciB0eHQgPSBwdGdyb3VwLnNlbGVjdEFsbCgnZy5wb2ludHRleHQnKVxuICAgICAgICAgICAgLmRhdGEoc2hvd1RleHQgPyBkTW9kIDogW10pO1xuICAgICAgICB0eHQuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZycpLmNsYXNzZWQoJ3BvaW50dGV4dCcsIHRydWUpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMjAsMCknKTtcbiAgICAgICAgdHh0LmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgdHh0LnNlbGVjdEFsbCgndGV4dCcpLmNhbGwoRHJhd2luZy50ZXh0UG9pbnRTdHlsZSwgdE1vZCwgZ2QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0eWxlV2F0ZXJmYWxscyhkKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IGRbMF0udHJhY2U7XG4gICAgICAgIHZhciBpc1dhdGVyZmFsbCA9IHRyYWNlLnR5cGUgPT09ICd3YXRlcmZhbGwnO1xuXG4gICAgICAgIGlmKGRbMF0uX2Rpc3RpbmN0ICYmIGlzV2F0ZXJmYWxsKSB7XG4gICAgICAgICAgICB2YXIgY29udCA9IGRbMF0udHJhY2VbZFswXS5kaXJdLm1hcmtlcjtcbiAgICAgICAgICAgIGRbMF0ubWMgPSBjb250LmNvbG9yO1xuICAgICAgICAgICAgZFswXS5tbHcgPSBjb250LmxpbmUud2lkdGg7XG4gICAgICAgICAgICBkWzBdLm1sYyA9IGNvbnQubGluZS5jb2xvcjtcbiAgICAgICAgICAgIHJldHVybiBzdHlsZUJhckxpa2UoZCwgdGhpcywgJ3dhdGVyZmFsbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHB0c0RhdGEgPSBbXTtcbiAgICAgICAgaWYodHJhY2UudmlzaWJsZSAmJiBpc1dhdGVyZmFsbCkge1xuICAgICAgICAgICAgcHRzRGF0YSA9IGRbMF0uaGFzVG90YWxzID9cbiAgICAgICAgICAgICAgICBbWydpbmNyZWFzaW5nJywgJ00tNiwtNlY2SDBaJ10sIFsndG90YWxzJywgJ002LDZIMEwtNiwtNkgtMFonXSwgWydkZWNyZWFzaW5nJywgJ002LDZWLTZIMFonXV0gOlxuICAgICAgICAgICAgICAgIFtbJ2luY3JlYXNpbmcnLCAnTS02LC02VjZINlonXSwgWydkZWNyZWFzaW5nJywgJ002LDZWLTZILTZaJ11dO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHB0cyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ2cubGVnZW5kcG9pbnRzJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGgubGVnZW5kd2F0ZXJmYWxsJylcbiAgICAgICAgICAgIC5kYXRhKHB0c0RhdGEpO1xuICAgICAgICBwdHMuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKS5jbGFzc2VkKCdsZWdlbmR3YXRlcmZhbGwnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMjAsMCknKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UtbWl0ZXJsaW1pdCcsIDEpO1xuICAgICAgICBwdHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHB0cy5lYWNoKGZ1bmN0aW9uKGRkKSB7XG4gICAgICAgICAgICB2YXIgcHQgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICB2YXIgY29udCA9IHRyYWNlW2RkWzBdXS5tYXJrZXI7XG4gICAgICAgICAgICB2YXIgbHcgPSBib3VuZExpbmVXaWR0aCh1bmRlZmluZWQsIGNvbnQubGluZSwgTUFYX01BUktFUl9MSU5FX1dJRFRILCBDU1RfTUFSS0VSX0xJTkVfV0lEVEgpO1xuXG4gICAgICAgICAgICBwdC5hdHRyKCdkJywgZGRbMV0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBsdyArICdweCcpXG4gICAgICAgICAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgY29udC5jb2xvcik7XG5cbiAgICAgICAgICAgIGlmKGx3KSB7XG4gICAgICAgICAgICAgICAgcHQuY2FsbChDb2xvci5zdHJva2UsIGNvbnQubGluZS5jb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0eWxlQmFycyhkKSB7XG4gICAgICAgIHN0eWxlQmFyTGlrZShkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHlsZUZ1bm5lbHMoZCkge1xuICAgICAgICBzdHlsZUJhckxpa2UoZCwgdGhpcywgJ2Z1bm5lbCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0eWxlQmFyTGlrZShkLCBsVGhpcywgZGVzaXJlZFR5cGUpIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZFswXS50cmFjZTtcbiAgICAgICAgdmFyIG1hcmtlciA9IHRyYWNlLm1hcmtlciB8fCB7fTtcbiAgICAgICAgdmFyIG1hcmtlckxpbmUgPSBtYXJrZXIubGluZSB8fCB7fTtcblxuICAgICAgICB2YXIgaXNWaXNpYmxlID0gKCFkZXNpcmVkVHlwZSkgPyBSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAnYmFyJykgOlxuICAgICAgICAgICAgKHRyYWNlLnZpc2libGUgJiYgdHJhY2UudHlwZSA9PT0gZGVzaXJlZFR5cGUpO1xuXG4gICAgICAgIHZhciBiYXJwYXRoID0gZDMuc2VsZWN0KGxUaGlzKS5zZWxlY3QoJ2cubGVnZW5kcG9pbnRzJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGgubGVnZW5kJyArIGRlc2lyZWRUeXBlKVxuICAgICAgICAgICAgLmRhdGEoaXNWaXNpYmxlID8gW2RdIDogW10pO1xuICAgICAgICBiYXJwYXRoLmVudGVyKCkuYXBwZW5kKCdwYXRoJykuY2xhc3NlZCgnbGVnZW5kJyArIGRlc2lyZWRUeXBlLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCAnTTYsNkgtNlYtNkg2WicpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgyMCwwKScpO1xuICAgICAgICBiYXJwYXRoLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICBiYXJwYXRoLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHAgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICB2YXIgZDAgPSBkWzBdO1xuICAgICAgICAgICAgdmFyIHcgPSBib3VuZExpbmVXaWR0aChkMC5tbHcsIG1hcmtlci5saW5lLCBNQVhfTUFSS0VSX0xJTkVfV0lEVEgsIENTVF9NQVJLRVJfTElORV9XSURUSCk7XG5cbiAgICAgICAgICAgIHAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIHcgKyAncHgnKVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLmZpbGwsIGQwLm1jIHx8IG1hcmtlci5jb2xvcik7XG5cbiAgICAgICAgICAgIGlmKHcpIENvbG9yLnN0cm9rZShwLCBkMC5tbGMgfHwgbWFya2VyTGluZS5jb2xvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0eWxlQm94ZXMoZCkge1xuICAgICAgICB2YXIgdHJhY2UgPSBkWzBdLnRyYWNlO1xuXG4gICAgICAgIHZhciBwdHMgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCdnLmxlZ2VuZHBvaW50cycpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmxlZ2VuZGJveCcpXG4gICAgICAgICAgICAuZGF0YSh0cmFjZS52aXNpYmxlICYmIFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsICdib3gtdmlvbGluJykgPyBbZF0gOiBbXSk7XG4gICAgICAgIHB0cy5lbnRlcigpLmFwcGVuZCgncGF0aCcpLmNsYXNzZWQoJ2xlZ2VuZGJveCcsIHRydWUpXG4gICAgICAgICAgICAvLyBpZiB3ZSB3YW50IHRoZSBtZWRpYW4gYmFyLCBwcmVwZW5kIE02LDBILTZcbiAgICAgICAgICAgIC5hdHRyKCdkJywgJ002LDZILTZWLTZINlonKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMjAsMCknKTtcbiAgICAgICAgcHRzLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICBwdHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwID0gZDMuc2VsZWN0KHRoaXMpO1xuXG4gICAgICAgICAgICBpZigodHJhY2UuYm94cG9pbnRzID09PSAnYWxsJyB8fCB0cmFjZS5wb2ludHMgPT09ICdhbGwnKSAmJlxuICAgICAgICAgICAgICAgIENvbG9yLm9wYWNpdHkodHJhY2UuZmlsbGNvbG9yKSA9PT0gMCAmJiBDb2xvci5vcGFjaXR5KCh0cmFjZS5saW5lIHx8IHt9KS5jb2xvcikgPT09IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHZhciB0TW9kID0gTGliLm1pbkV4dGVuZCh0cmFjZSwge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IGNvbnN0YW50SXRlbVNpemluZyA/IENTVF9NQVJLRVJfU0laRSA6IExpYi5jb25zdHJhaW4odHJhY2UubWFya2VyLnNpemUsIDIsIDE2KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVyZWY6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplbWluOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZW1vZGU6ICdkaWFtZXRlcidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHB0cy5jYWxsKERyYXdpbmcucG9pbnRTdHlsZSwgdE1vZCwgZ2QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdyA9IGJvdW5kTGluZVdpZHRoKHVuZGVmaW5lZCwgdHJhY2UubGluZSwgTUFYX01BUktFUl9MSU5FX1dJRFRILCBDU1RfTUFSS0VSX0xJTkVfV0lEVEgpO1xuXG4gICAgICAgICAgICAgICAgcC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgdyArICdweCcpXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLmZpbGwsIHRyYWNlLmZpbGxjb2xvcik7XG5cbiAgICAgICAgICAgICAgICBpZih3KSBDb2xvci5zdHJva2UocCwgdHJhY2UubGluZS5jb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0eWxlQ2FuZGxlcyhkKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IGRbMF0udHJhY2U7XG5cbiAgICAgICAgdmFyIHB0cyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ2cubGVnZW5kcG9pbnRzJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGgubGVnZW5kY2FuZGxlJylcbiAgICAgICAgICAgIC5kYXRhKHRyYWNlLnZpc2libGUgJiYgdHJhY2UudHlwZSA9PT0gJ2NhbmRsZXN0aWNrJyA/IFtkLCBkXSA6IFtdKTtcbiAgICAgICAgcHRzLmVudGVyKCkuYXBwZW5kKCdwYXRoJykuY2xhc3NlZCgnbGVnZW5kY2FuZGxlJywgdHJ1ZSlcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oXywgaSkge1xuICAgICAgICAgICAgICAgIGlmKGkpIHJldHVybiAnTS0xNSwwSC04TS04LDZWLTZIOFonOyAvLyBpbmNyZWFzaW5nXG4gICAgICAgICAgICAgICAgcmV0dXJuICdNMTUsMEg4TTgsLTZWNkgtOFonOyAvLyBkZWNyZWFzaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMjAsMCknKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UtbWl0ZXJsaW1pdCcsIDEpO1xuICAgICAgICBwdHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHB0cy5lYWNoKGZ1bmN0aW9uKF8sIGkpIHtcbiAgICAgICAgICAgIHZhciBwID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgdmFyIGNvbnQgPSB0cmFjZVtpID8gJ2luY3JlYXNpbmcnIDogJ2RlY3JlYXNpbmcnXTtcbiAgICAgICAgICAgIHZhciB3ID0gYm91bmRMaW5lV2lkdGgodW5kZWZpbmVkLCBjb250LmxpbmUsIE1BWF9NQVJLRVJfTElORV9XSURUSCwgQ1NUX01BUktFUl9MSU5FX1dJRFRIKTtcblxuICAgICAgICAgICAgcC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgdyArICdweCcpXG4gICAgICAgICAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgY29udC5maWxsY29sb3IpO1xuXG4gICAgICAgICAgICBpZih3KSBDb2xvci5zdHJva2UocCwgY29udC5saW5lLmNvbG9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3R5bGVPSExDKGQpIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZFswXS50cmFjZTtcblxuICAgICAgICB2YXIgcHRzID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgnZy5sZWdlbmRwb2ludHMnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aC5sZWdlbmRvaGxjJylcbiAgICAgICAgICAgIC5kYXRhKHRyYWNlLnZpc2libGUgJiYgdHJhY2UudHlwZSA9PT0gJ29obGMnID8gW2QsIGRdIDogW10pO1xuICAgICAgICBwdHMuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKS5jbGFzc2VkKCdsZWdlbmRvaGxjJywgdHJ1ZSlcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oXywgaSkge1xuICAgICAgICAgICAgICAgIGlmKGkpIHJldHVybiAnTS0xNSwwSDBNLTgsLTZWMCc7IC8vIGluY3JlYXNpbmdcbiAgICAgICAgICAgICAgICByZXR1cm4gJ00xNSwwSDBNOCw2VjAnOyAvLyBkZWNyZWFzaW5nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMjAsMCknKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UtbWl0ZXJsaW1pdCcsIDEpO1xuICAgICAgICBwdHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHB0cy5lYWNoKGZ1bmN0aW9uKF8sIGkpIHtcbiAgICAgICAgICAgIHZhciBwID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgdmFyIGNvbnQgPSB0cmFjZVtpID8gJ2luY3JlYXNpbmcnIDogJ2RlY3JlYXNpbmcnXTtcbiAgICAgICAgICAgIHZhciB3ID0gYm91bmRMaW5lV2lkdGgodW5kZWZpbmVkLCBjb250LmxpbmUsIE1BWF9NQVJLRVJfTElORV9XSURUSCwgQ1NUX01BUktFUl9MSU5FX1dJRFRIKTtcblxuICAgICAgICAgICAgcC5zdHlsZSgnZmlsbCcsICdub25lJylcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLmRhc2hMaW5lLCBjb250LmxpbmUuZGFzaCwgdyk7XG5cbiAgICAgICAgICAgIGlmKHcpIENvbG9yLnN0cm9rZShwLCBjb250LmxpbmUuY29sb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHlsZVBpZXMoZCkge1xuICAgICAgICBzdHlsZVBpZUxpa2UoZCwgdGhpcywgJ3BpZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0eWxlRnVubmVsYXJlYXMoZCkge1xuICAgICAgICBzdHlsZVBpZUxpa2UoZCwgdGhpcywgJ2Z1bm5lbGFyZWEnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHlsZVBpZUxpa2UoZCwgbFRoaXMsIGRlc2lyZWRUeXBlKSB7XG4gICAgICAgIHZhciBkMCA9IGRbMF07XG4gICAgICAgIHZhciB0cmFjZSA9IGQwLnRyYWNlO1xuXG4gICAgICAgIHZhciBpc1Zpc2libGUgPSAoIWRlc2lyZWRUeXBlKSA/IFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsIGRlc2lyZWRUeXBlKSA6XG4gICAgICAgICAgICAodHJhY2UudmlzaWJsZSAmJiB0cmFjZS50eXBlID09PSBkZXNpcmVkVHlwZSk7XG5cbiAgICAgICAgdmFyIHB0cyA9IGQzLnNlbGVjdChsVGhpcykuc2VsZWN0KCdnLmxlZ2VuZHBvaW50cycpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLmxlZ2VuZCcgKyBkZXNpcmVkVHlwZSlcbiAgICAgICAgICAgIC5kYXRhKGlzVmlzaWJsZSA/IFtkXSA6IFtdKTtcbiAgICAgICAgcHRzLmVudGVyKCkuYXBwZW5kKCdwYXRoJykuY2xhc3NlZCgnbGVnZW5kJyArIGRlc2lyZWRUeXBlLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCAnTTYsNkgtNlYtNkg2WicpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgyMCwwKScpO1xuICAgICAgICBwdHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKHB0cy5zaXplKCkpIHtcbiAgICAgICAgICAgIHZhciBjb250ID0gKHRyYWNlLm1hcmtlciB8fCB7fSkubGluZTtcbiAgICAgICAgICAgIHZhciBsdyA9IGJvdW5kTGluZVdpZHRoKHBpZUNhc3RPcHRpb24oY29udC53aWR0aCwgZDAucHRzKSwgY29udCwgTUFYX01BUktFUl9MSU5FX1dJRFRILCBDU1RfTUFSS0VSX0xJTkVfV0lEVEgpO1xuXG4gICAgICAgICAgICB2YXIgdE1vZCA9IExpYi5taW5FeHRlbmQodHJhY2UsIHttYXJrZXI6IHtsaW5lOiB7d2lkdGg6IGx3fX19KTtcbiAgICAgICAgICAgIC8vIHNpbmNlIG1pbkV4dGVuZCBkbyBub3Qgc2xpY2UgbW9yZSB0aGFuIDMgaXRlbXMgd2UgbmVlZCB0byBwYXRjaCBsaW5lLmNvbG9yIGhlcmVcbiAgICAgICAgICAgIHRNb2QubWFya2VyLmxpbmUuY29sb3IgPSBjb250LmNvbG9yO1xuXG4gICAgICAgICAgICB2YXIgZDBNb2QgPSBMaWIubWluRXh0ZW5kKGQwLCB7dHJhY2U6IHRNb2R9KTtcblxuICAgICAgICAgICAgc3R5bGVQaWUocHRzLCBkME1vZCwgdE1vZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdHlsZVNwYXRpYWwoZCkgeyAvLyBpLmUuIG1hbmlubHkgdHJhY2VzIGhhdmluZyB6IGFuZCBjb2xvcnNjYWxlXG4gICAgICAgIHZhciB0cmFjZSA9IGRbMF0udHJhY2U7XG5cbiAgICAgICAgdmFyIHVzZUdyYWRpZW50O1xuICAgICAgICB2YXIgcHRzRGF0YSA9IFtdO1xuICAgICAgICBpZih0cmFjZS52aXNpYmxlKSB7XG4gICAgICAgICAgICBzd2l0Y2godHJhY2UudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hpc3RvZ3JhbTJkJyA6XG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhdG1hcCcgOlxuICAgICAgICAgICAgICAgICAgICBwdHNEYXRhID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgWydNLTE1LC0yVjRIMTVWLTJaJ10gLy8gc2ltaWxhciB0byBjb250b3VyXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIHVzZUdyYWRpZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2hvcm9wbGV0aCcgOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Nob3JvcGxldGhtYXBib3gnIDpcbiAgICAgICAgICAgICAgICAgICAgcHRzRGF0YSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTS02LC02VjZINlYtNlonXVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICB1c2VHcmFkaWVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RlbnNpdHltYXBib3gnIDpcbiAgICAgICAgICAgICAgICAgICAgcHRzRGF0YSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTS02LDAgYTYsNiAwIDEsMCAxMiwwIGEgNiw2IDAgMSwwIC0xMiwwJ11cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgdXNlR3JhZGllbnQgPSAncmFkaWFsJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29uZScgOlxuICAgICAgICAgICAgICAgICAgICBwdHNEYXRhID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgWydNLTYsMiBBMiwyIDAgMCwwIC02LDYgVjZMNiw0WiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydNLTYsLTYgQTIsMiAwIDAsMCAtNiwtMiBMNiwtNFonXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTS02LC0yIEEyLDIgMCAwLDAgLTYsMiBMNiwwWiddXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIHVzZUdyYWRpZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmVhbXR1YmUnIDpcbiAgICAgICAgICAgICAgICAgICAgcHRzRGF0YSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTS02LDIgQTIsMiAwIDAsMCAtNiw2IEg2IEEyLDIgMCAwLDEgNiwyIFonXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTS02LC02IEEyLDIgMCAwLDAgLTYsLTIgSDYgQTIsMiAwIDAsMSA2LC02IFonXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTS02LC0yIEEyLDIgMCAwLDAgLTYsMiBINiBBMiwyIDAgMCwxIDYsLTIgWiddXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIHVzZUdyYWRpZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N1cmZhY2UnIDpcbiAgICAgICAgICAgICAgICAgICAgcHRzRGF0YSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTS02LC02IEEyLDMgMCAwLDAgLTYsMCBINiBBMiwzIDAgMCwxIDYsLTYgWiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydNLTYsMSBBMiwzIDAgMCwxIC02LDYgSDYgQTIsMyAwIDAsMCA2LDAgWiddXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIHVzZUdyYWRpZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVzaDNkJyA6XG4gICAgICAgICAgICAgICAgICAgIHB0c0RhdGEgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ00tNiw2SDBMLTYsLTZaJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ002LDZIMEw2LC02WiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydNLTYsLTZINkwwLDZaJ11cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgdXNlR3JhZGllbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndm9sdW1lJyA6XG4gICAgICAgICAgICAgICAgICAgIHB0c0RhdGEgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ00tNiw2SDBMLTYsLTZaJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ002LDZIMEw2LC02WiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydNLTYsLTZINkwwLDZaJ11cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgdXNlR3JhZGllbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpc29zdXJmYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgcHRzRGF0YSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTS02LDZIMEwtNiwtNlonXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnTTYsNkgwTDYsLTZaJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ00tNiwtNiBBMTIsMjQgMCAwLDAgNiwtNiBMMCw2WiddXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIHVzZUdyYWRpZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHB0cyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ2cubGVnZW5kcG9pbnRzJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3BhdGgubGVnZW5kM2RhbmRmcmllbmRzJylcbiAgICAgICAgICAgIC5kYXRhKHB0c0RhdGEpO1xuICAgICAgICBwdHMuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKS5jbGFzc2VkKCdsZWdlbmQzZGFuZGZyaWVuZHMnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMjAsMCknKVxuICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UtbWl0ZXJsaW1pdCcsIDEpO1xuICAgICAgICBwdHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIHB0cy5lYWNoKGZ1bmN0aW9uKGRkLCBpKSB7XG4gICAgICAgICAgICB2YXIgcHQgPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgICAgIHZhciBjT3B0cyA9IGV4dHJhY3RPcHRzKHRyYWNlKTtcbiAgICAgICAgICAgIHZhciBjb2xvcnNjYWxlID0gY09wdHMuY29sb3JzY2FsZTtcbiAgICAgICAgICAgIHZhciByZXZlcnNlc2NhbGUgPSBjT3B0cy5yZXZlcnNlc2NhbGU7XG4gICAgICAgICAgICB2YXIgZmlsbEdyYWRpZW50ID0gZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgICAgIGlmKHMuc2l6ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBncmFkaWVudElEID0gJ2xlZ2VuZGZpbGwtJyArIHRyYWNlLnVpZDtcbiAgICAgICAgICAgICAgICAgICAgRHJhd2luZy5ncmFkaWVudChzLCBnZCwgZ3JhZGllbnRJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEdyYWRpZW50RGlyZWN0aW9uKHJldmVyc2VzY2FsZSwgdXNlR3JhZGllbnQgPT09ICdyYWRpYWwnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yc2NhbGUsICdmaWxsJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGZpbGxDb2xvcjtcbiAgICAgICAgICAgIGlmKCFjb2xvcnNjYWxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gdHJhY2UudmVydGV4Y29sb3IgfHwgdHJhY2UuZmFjZWNvbG9yIHx8IHRyYWNlLmNvbG9yO1xuICAgICAgICAgICAgICAgIGZpbGxDb2xvciA9IExpYi5pc0FycmF5T3JUeXBlZEFycmF5KGNvbG9yKSA/IChjb2xvcltpXSB8fCBjb2xvclswXSkgOiBjb2xvcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoIXVzZUdyYWRpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW4gPSBjb2xvcnNjYWxlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPT09IDAgPyBjb2xvcnNjYWxlW3JldmVyc2VzY2FsZSA/IGxlbiAtIDEgOiAwXVsxXSA6IC8vIG1pbmltdW1cbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPT09IDEgPyBjb2xvcnNjYWxlW3JldmVyc2VzY2FsZSA/IDAgOiBsZW4gLSAxXVsxXSA6IC8vIG1heGltdW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnNjYWxlW01hdGguZmxvb3IoKGxlbiAtIDEpIC8gMildWzFdOyAvLyBtaWRkbGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHB0LmF0dHIoJ2QnLCBkZFswXSk7XG4gICAgICAgICAgICBpZihmaWxsQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBwdC5jYWxsKENvbG9yLmZpbGwsIGZpbGxDb2xvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHB0LmNhbGwoZmlsbEdyYWRpZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZ2V0R3JhZGllbnREaXJlY3Rpb24ocmV2ZXJzZXNjYWxlLCBpc1JhZGlhbCkge1xuICAgIHZhciBzdHIgPSBpc1JhZGlhbCA/ICdyYWRpYWwnIDogJ2hvcml6b250YWwnO1xuICAgIHJldHVybiBzdHIgKyAocmV2ZXJzZXNjYWxlID8gJycgOiAncmV2ZXJzZWQnKTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2V0Q3Vyc29yID0gcmVxdWlyZSgnLi9zZXRjdXJzb3InKTtcblxudmFyIFNUQVNIQVRUUiA9ICdkYXRhLXNhdmVkY3Vyc29yJztcbnZhciBOT19DVVJTT1IgPSAnISEnO1xuXG4vKlxuICogd29ya3Mgd2l0aCBvdXIgQ1NTIGN1cnNvciBjbGFzc2VzIChzZWUgY3NzL19jdXJzb3Iuc2NzcylcbiAqIHRvIG92ZXJyaWRlIGEgcHJldmlvdXMgY3Vyc29yIHNldCBvbiBkMyBzaW5nbGUtZWxlbWVudCBzZWxlY3Rpb25zLFxuICogYnkgbW92aW5nIHRoZSBuYW1lIG9mIHRoZSBvcmlnaW5hbCBjdXJzb3IgdG8gdGhlIGRhdGEtc2F2ZWRjdXJzb3IgYXR0ci5cbiAqIG9taXQgY3Vyc29yIHRvIHJldmVydCB0byB0aGUgcHJldmlvdXNseSBzZXQgdmFsdWUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb3ZlcnJpZGVDdXJzb3IoZWwzLCBjc3IpIHtcbiAgICB2YXIgc2F2ZWRDdXJzb3IgPSBlbDMuYXR0cihTVEFTSEFUVFIpO1xuICAgIGlmKGNzcikge1xuICAgICAgICBpZighc2F2ZWRDdXJzb3IpIHtcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0gKGVsMy5hdHRyKCdjbGFzcycpIHx8ICcnKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gY2xhc3Nlc1tpXTtcbiAgICAgICAgICAgICAgICBpZihjbHMuaW5kZXhPZignY3Vyc29yLScpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsMy5hdHRyKFNUQVNIQVRUUiwgY2xzLnN1YnN0cig3KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKGNscywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCFlbDMuYXR0cihTVEFTSEFUVFIpKSB7XG4gICAgICAgICAgICAgICAgZWwzLmF0dHIoU1RBU0hBVFRSLCBOT19DVVJTT1IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldEN1cnNvcihlbDMsIGNzcik7XG4gICAgfSBlbHNlIGlmKHNhdmVkQ3Vyc29yKSB7XG4gICAgICAgIGVsMy5hdHRyKFNUQVNIQVRUUiwgbnVsbCk7XG5cbiAgICAgICAgaWYoc2F2ZWRDdXJzb3IgPT09IE5PX0NVUlNPUikgc2V0Q3Vyc29yKGVsMyk7XG4gICAgICAgIGVsc2Ugc2V0Q3Vyc29yKGVsMywgc2F2ZWRDdXJzb3IpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuZXhwb3J0cy5mb3JtYXRQaWVQZXJjZW50ID0gZnVuY3Rpb24gZm9ybWF0UGllUGVyY2VudCh2LCBzZXBhcmF0b3JzKSB7XG4gICAgdmFyIHZSb3VuZGVkID0gKHYgKiAxMDApLnRvUHJlY2lzaW9uKDMpO1xuICAgIGlmKHZSb3VuZGVkLmxhc3RJbmRleE9mKCcuJykgIT09IC0xKSB7XG4gICAgICAgIHZSb3VuZGVkID0gdlJvdW5kZWQucmVwbGFjZSgvWy5dPzArJC8sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIExpYi5udW1TZXBhcmF0ZSh2Um91bmRlZCwgc2VwYXJhdG9ycykgKyAnJSc7XG59O1xuXG5leHBvcnRzLmZvcm1hdFBpZVZhbHVlID0gZnVuY3Rpb24gZm9ybWF0UGllVmFsdWUodiwgc2VwYXJhdG9ycykge1xuICAgIHZhciB2Um91bmRlZCA9IHYudG9QcmVjaXNpb24oMTApO1xuICAgIGlmKHZSb3VuZGVkLmxhc3RJbmRleE9mKCcuJykgIT09IC0xKSB7XG4gICAgICAgIHZSb3VuZGVkID0gdlJvdW5kZWQucmVwbGFjZSgvWy5dPzArJC8sICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIExpYi5udW1TZXBhcmF0ZSh2Um91bmRlZCwgc2VwYXJhdG9ycyk7XG59O1xuXG5leHBvcnRzLmdldEZpcnN0RmlsbGVkID0gZnVuY3Rpb24gZ2V0Rmlyc3RGaWxsZWQoYXJyYXksIGluZGljZXMpIHtcbiAgICBpZighQXJyYXkuaXNBcnJheShhcnJheSkpIHJldHVybjtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW5kaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdiA9IGFycmF5W2luZGljZXNbaV1dO1xuICAgICAgICBpZih2IHx8IHYgPT09IDAgfHwgdiA9PT0gJycpIHJldHVybiB2O1xuICAgIH1cbn07XG5cbmV4cG9ydHMuY2FzdE9wdGlvbiA9IGZ1bmN0aW9uIGNhc3RPcHRpb24oaXRlbSwgaW5kaWNlcykge1xuICAgIGlmKEFycmF5LmlzQXJyYXkoaXRlbSkpIHJldHVybiBleHBvcnRzLmdldEZpcnN0RmlsbGVkKGl0ZW0sIGluZGljZXMpO1xuICAgIGVsc2UgaWYoaXRlbSkgcmV0dXJuIGl0ZW07XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgY2FzdE9wdGlvbiA9IHJlcXVpcmUoJy4vaGVscGVycycpLmNhc3RPcHRpb247XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3R5bGVPbmUocywgcHQsIHRyYWNlKSB7XG4gICAgdmFyIGxpbmUgPSB0cmFjZS5tYXJrZXIubGluZTtcbiAgICB2YXIgbGluZUNvbG9yID0gY2FzdE9wdGlvbihsaW5lLmNvbG9yLCBwdC5wdHMpIHx8IENvbG9yLmRlZmF1bHRMaW5lO1xuICAgIHZhciBsaW5lV2lkdGggPSBjYXN0T3B0aW9uKGxpbmUud2lkdGgsIHB0LnB0cykgfHwgMDtcblxuICAgIHMuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGxpbmVXaWR0aClcbiAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgcHQuY29sb3IpXG4gICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgbGluZUNvbG9yKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9