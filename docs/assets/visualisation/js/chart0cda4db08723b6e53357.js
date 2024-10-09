(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_parcoords_js"],{

/***/ "./node_modules/plotly.js/lib/parcoords.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/parcoords.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/parcoords */ "./node_modules/plotly.js/src/traces/parcoords/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/lib/gup.js":
/*!***********************************************!*\
  !*** ./node_modules/plotly.js/src/lib/gup.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var identity = __webpack_require__(/*! ./identity */ "./node_modules/plotly.js/src/lib/identity.js");

function wrap(d) {return [d];}

module.exports = {

    // The D3 data binding concept and the General Update Pattern promotes the idea of
    // traversing into the scenegraph by using the `.data(fun, keyFun)` call.
    // The `fun` is most often a `repeat`, ie. the elements beneath a `<g>` element need
    // access to the same data, or a `descend`, which fans a scenegraph node into a bunch of
    // of elements, e.g. points, lines, rows, requiring an array as input.
    // The role of the `keyFun` is to identify what elements are being entered/exited/updated,
    // otherwise D3 reverts to using a plain index which would screw up `transition`s.
    keyFun: function(d) {return d.key;},
    repeat: wrap,
    descend: identity,

    // Plotly.js uses a convention of storing the actual contents of the `calcData` as the
    // element zero of a container array. These helpers are just used for clarity as a
    // newcomer to the codebase may not know what the `[0]` is, and whether there can be further
    // elements (not atm).
    wrap: wrap,
    unwrap: function(d) {return d[0];}
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/attributes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/attributes.js ***!
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



var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var axesAttrs = __webpack_require__(/*! ../../plots/cartesian/layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");
var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var templatedArray = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js").templatedArray;

module.exports = {
    domain: domainAttrs({name: 'parcoords', trace: true, editType: 'plot'}),

    labelangle: {
        valType: 'angle',
        dflt: 0,
        role: 'info',
        editType: 'plot',
        description: [
            'Sets the angle of the labels with respect to the horizontal.',
            'For example, a `tickangle` of -90 draws the labels vertically.',
            'Tilted labels with *labelangle* may be positioned better',
            'inside margins when `labelposition` is set to *bottom*.'
        ].join(' ')
    },

    labelside: {
        valType: 'enumerated',
        role: 'info',
        values: ['top', 'bottom'],
        dflt: 'top',
        editType: 'plot',
        description: [
            'Specifies the location of the `label`.',
            '*top* positions labels above, next to the title',
            '*bottom* positions labels below the graph',
            'Tilted labels with *labelangle* may be positioned better',
            'inside margins when `labelposition` is set to *bottom*.'
        ].join(' ')
    },

    labelfont: fontAttrs({
        editType: 'plot',
        description: 'Sets the font for the `dimension` labels.'
    }),
    tickfont: fontAttrs({
        editType: 'plot',
        description: 'Sets the font for the `dimension` tick values.'
    }),
    rangefont: fontAttrs({
        editType: 'plot',
        description: 'Sets the font for the `dimension` range values.'
    }),

    dimensions: templatedArray('dimension', {
        label: {
            valType: 'string',
            role: 'info',
            editType: 'plot',
            description: 'The shown name of the dimension.'
        },
        // TODO: better way to determine ordinal vs continuous axes,
        // so users can use tickvals/ticktext with a continuous axis.
        tickvals: extendFlat({}, axesAttrs.tickvals, {
            editType: 'plot',
            description: [
                'Sets the values at which ticks on this axis appear.'
            ].join(' ')
        }),
        ticktext: extendFlat({}, axesAttrs.ticktext, {
            editType: 'plot',
            description: [
                'Sets the text displayed at the ticks position via `tickvals`.'
            ].join(' ')
        }),
        tickformat: extendFlat({}, axesAttrs.tickformat, {
            editType: 'plot'
        }),
        visible: {
            valType: 'boolean',
            dflt: true,
            role: 'info',
            editType: 'plot',
            description: 'Shows the dimension when set to `true` (the default). Hides the dimension for `false`.'
        },
        range: {
            valType: 'info_array',
            role: 'info',
            items: [
                {valType: 'number', editType: 'plot'},
                {valType: 'number', editType: 'plot'}
            ],
            editType: 'plot',
            description: [
                'The domain range that represents the full, shown axis extent. Defaults to the `values` extent.',
                'Must be an array of `[fromValue, toValue]` with finite numbers as elements.'
            ].join(' ')
        },
        constraintrange: {
            valType: 'info_array',
            role: 'info',
            freeLength: true,
            dimensions: '1-2',
            items: [
                {valType: 'number', editType: 'plot'},
                {valType: 'number', editType: 'plot'}
            ],
            editType: 'plot',
            description: [
                'The domain range to which the filter on the dimension is constrained. Must be an array',
                'of `[fromValue, toValue]` with `fromValue <= toValue`, or if `multiselect` is not',
                'disabled, you may give an array of arrays, where each inner array is `[fromValue, toValue]`.'
            ].join(' ')
        },
        multiselect: {
            valType: 'boolean',
            dflt: true,
            role: 'info',
            editType: 'plot',
            description: 'Do we allow multiple selection ranges or just a single range?'
        },
        values: {
            valType: 'data_array',
            role: 'info',
            editType: 'calc',
            description: [
                'Dimension values. `values[n]` represents the value of the `n`th point in the dataset,',
                'therefore the `values` vector for all dimensions must be the same (longer vectors',
                'will be truncated). Each value must be a finite number.'
            ].join(' ')
        },
        editType: 'calc',
        description: 'The dimensions (variables) of the parallel coordinates chart. 2..60 dimensions are supported.'
    }),

    line: extendFlat({editType: 'calc'},
        colorScaleAttrs('line', {
            // the default autocolorscale isn't quite usable for parcoords due to context ambiguity around 0 (grey, off-white)
            // autocolorscale therefore defaults to false too, to avoid being overridden by the blue-white-red autocolor palette
            colorscaleDflt: 'Viridis',
            autoColorDflt: false,
            editTypeOverride: 'calc'
        })
    )
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/axisbrush.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/axisbrush.js ***!
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



var c = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/parcoords/constants.js");
var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var keyFun = __webpack_require__(/*! ../../lib/gup */ "./node_modules/plotly.js/src/lib/gup.js").keyFun;
var repeat = __webpack_require__(/*! ../../lib/gup */ "./node_modules/plotly.js/src/lib/gup.js").repeat;
var sortAsc = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").sorterAsc;

var snapRatio = c.bar.snapRatio;
function snapOvershoot(v, vAdjacent) { return v * (1 - snapRatio) + vAdjacent * snapRatio; }

var snapClose = c.bar.snapClose;
function closeToCovering(v, vAdjacent) { return v * (1 - snapClose) + vAdjacent * snapClose; }

// snap for the low end of a range on an ordinal scale
// on an ordinal scale, always show some overshoot from the exact value,
// so it's clear we're covering it
// find the interval we're in, and snap to 1/4 the distance to the next
// these two could be unified at a slight loss of readability / perf
function ordinalScaleSnap(isHigh, a, v, existingRanges) {
    if(overlappingExisting(v, existingRanges)) return v;

    var dir = isHigh ? -1 : 1;

    var first = 0;
    var last = a.length - 1;
    if(dir < 0) {
        var tmp = first;
        first = last;
        last = tmp;
    }

    var aHere = a[first];
    var aPrev = aHere;
    for(var i = first; dir * i < dir * last; i += dir) {
        var nextI = i + dir;
        var aNext = a[nextI];

        // very close to the previous - snap down to it
        if(dir * v < dir * closeToCovering(aHere, aNext)) return snapOvershoot(aHere, aPrev);
        if(dir * v < dir * aNext || nextI === last) return snapOvershoot(aNext, aHere);

        aPrev = aHere;
        aHere = aNext;
    }
}

function overlappingExisting(v, existingRanges) {
    for(var i = 0; i < existingRanges.length; i++) {
        if(v >= existingRanges[i][0] && v <= existingRanges[i][1]) return true;
    }
    return false;
}

function barHorizontalSetup(selection) {
    selection
        .attr('x', -c.bar.captureWidth / 2)
        .attr('width', c.bar.captureWidth);
}

function backgroundBarHorizontalSetup(selection) {
    selection
        .attr('visibility', 'visible')
        .style('visibility', 'visible')
        .attr('fill', 'yellow')
        .attr('opacity', 0);
}

function setHighlight(d) {
    if(!d.brush.filterSpecified) {
        return '0,' + d.height;
    }

    var pixelRanges = unitToPx(d.brush.filter.getConsolidated(), d.height);
    var dashArray = [0]; // we start with a 0 length selection as filter ranges are inclusive, not exclusive
    var p, sectionHeight, iNext;
    var currentGap = pixelRanges.length ? pixelRanges[0][0] : null;
    for(var i = 0; i < pixelRanges.length; i++) {
        p = pixelRanges[i];
        sectionHeight = p[1] - p[0];
        dashArray.push(currentGap);
        dashArray.push(sectionHeight);
        iNext = i + 1;
        if(iNext < pixelRanges.length) {
            currentGap = pixelRanges[iNext][0] - p[1];
        }
    }
    dashArray.push(d.height);
    // d.height is added at the end to ensure that (1) we have an even number of dasharray points, MDN page says
    // "If an odd number of values is provided, then the list of values is repeated to yield an even number of values."
    // and (2) it's _at least_ as long as the full height (even if range is minuscule and at the bottom) though this
    // may not be necessary, maybe duplicating the last point would do too. But no harm in a longer dasharray than line.
    return dashArray;
}

function unitToPx(unitRanges, height) {
    return unitRanges.map(function(pr) {
        return pr.map(function(v) { return Math.max(0, v * height); }).sort(sortAsc);
    });
}

// is the cursor over the north, middle, or south of a bar?
// the end handles extend over the last 10% of the bar
function getRegion(fPix, y) {
    var pad = c.bar.handleHeight;
    if(y > fPix[1] + pad || y < fPix[0] - pad) return;
    if(y >= 0.9 * fPix[1] + 0.1 * fPix[0]) return 'n';
    if(y <= 0.9 * fPix[0] + 0.1 * fPix[1]) return 's';
    return 'ns';
}

function clearCursor() {
    d3.select(document.body)
        .style('cursor', null);
}

function styleHighlight(selection) {
    // stroke-dasharray is used to minimize the number of created DOM nodes, because the requirement calls for up to
    // 1000 individual selections on an axis, and there can be 60 axes per parcoords, and multiple parcoords per
    // dashboard. The technique is similar to https://codepen.io/monfera/pen/rLYqWR and using a `polyline` with
    // multiple sections, or a `path` element via its `d` attribute would also be DOM-sparing alternatives.
    selection.attr('stroke-dasharray', setHighlight);
}

function renderHighlight(root, tweenCallback) {
    var bar = d3.select(root).selectAll('.highlight, .highlight-shadow');
    var barToStyle = tweenCallback ? bar.transition().duration(c.bar.snapDuration).each('end', tweenCallback) : bar;
    styleHighlight(barToStyle);
}

function getInterval(d, y) {
    var b = d.brush;
    var active = b.filterSpecified;
    var closestInterval = NaN;
    var out = {};
    var i;

    if(active) {
        var height = d.height;
        var intervals = b.filter.getConsolidated();
        var pixIntervals = unitToPx(intervals, height);
        var hoveredInterval = NaN;
        var previousInterval = NaN;
        var nextInterval = NaN;
        for(i = 0; i <= pixIntervals.length; i++) {
            var p = pixIntervals[i];
            if(p && p[0] <= y && y <= p[1]) {
                // over a bar
                hoveredInterval = i;
                break;
            } else {
                // between bars, or before/after the first/last bar
                previousInterval = i ? i - 1 : NaN;
                if(p && p[0] > y) {
                    nextInterval = i;
                    break; // no point continuing as intervals are non-overlapping and sorted; could use log search
                }
            }
        }

        closestInterval = hoveredInterval;
        if(isNaN(closestInterval)) {
            if(isNaN(previousInterval) || isNaN(nextInterval)) {
                closestInterval = isNaN(previousInterval) ? nextInterval : previousInterval;
            } else {
                closestInterval = (y - pixIntervals[previousInterval][1] < pixIntervals[nextInterval][0] - y) ?
                    previousInterval : nextInterval;
            }
        }

        if(!isNaN(closestInterval)) {
            var fPix = pixIntervals[closestInterval];
            var region = getRegion(fPix, y);

            if(region) {
                out.interval = intervals[closestInterval];
                out.intervalPix = fPix;
                out.region = region;
            }
        }
    }

    if(d.ordinal && !out.region) {
        var a = d.unitTickvals;
        var unitLocation = d.unitToPaddedPx.invert(y);
        for(i = 0; i < a.length; i++) {
            var rangei = [
                a[Math.max(i - 1, 0)] * 0.25 + a[i] * 0.75,
                a[Math.min(i + 1, a.length - 1)] * 0.25 + a[i] * 0.75
            ];
            if(unitLocation >= rangei[0] && unitLocation <= rangei[1]) {
                out.clickableOrdinalRange = rangei;
                break;
            }
        }
    }

    return out;
}

function dragstart(lThis, d) {
    d3.event.sourceEvent.stopPropagation();
    var y = d.height - d3.mouse(lThis)[1] - 2 * c.verticalPadding;
    var unitLocation = d.unitToPaddedPx.invert(y);
    var b = d.brush;
    var interval = getInterval(d, y);
    var unitRange = interval.interval;
    var s = b.svgBrush;
    s.wasDragged = false; // we start assuming there won't be a drag - useful for reset
    s.grabbingBar = interval.region === 'ns';
    if(s.grabbingBar) {
        var pixelRange = unitRange.map(d.unitToPaddedPx);
        s.grabPoint = y - pixelRange[0] - c.verticalPadding;
        s.barLength = pixelRange[1] - pixelRange[0];
    }
    s.clickableOrdinalRange = interval.clickableOrdinalRange;
    s.stayingIntervals = (d.multiselect && b.filterSpecified) ? b.filter.getConsolidated() : [];
    if(unitRange) {
        s.stayingIntervals = s.stayingIntervals.filter(function(int2) {
            return int2[0] !== unitRange[0] && int2[1] !== unitRange[1];
        });
    }
    s.startExtent = interval.region ? unitRange[interval.region === 's' ? 1 : 0] : unitLocation;
    d.parent.inBrushDrag = true;
    s.brushStartCallback();
}

function drag(lThis, d) {
    d3.event.sourceEvent.stopPropagation();
    var y = d.height - d3.mouse(lThis)[1] - 2 * c.verticalPadding;
    var s = d.brush.svgBrush;
    s.wasDragged = true;
    s._dragging = true;

    if(s.grabbingBar) { // moving the bar
        s.newExtent = [y - s.grabPoint, y + s.barLength - s.grabPoint].map(d.unitToPaddedPx.invert);
    } else { // south/north drag or new bar creation
        s.newExtent = [s.startExtent, d.unitToPaddedPx.invert(y)].sort(sortAsc);
    }

    d.brush.filterSpecified = true;
    s.extent = s.stayingIntervals.concat([s.newExtent]);
    s.brushCallback(d);
    renderHighlight(lThis.parentNode);
}

function dragend(lThis, d) {
    var brush = d.brush;
    var filter = brush.filter;
    var s = brush.svgBrush;

    if(!s._dragging) { // i.e. click
        // mock zero drag
        mousemove(lThis, d);
        drag(lThis, d);
        // remember it is a click not a drag
        d.brush.svgBrush.wasDragged = false;
    }
    s._dragging = false;

    var e = d3.event;
    e.sourceEvent.stopPropagation();
    var grabbingBar = s.grabbingBar;
    s.grabbingBar = false;
    s.grabLocation = undefined;
    d.parent.inBrushDrag = false;
    clearCursor(); // instead of clearing, a nicer thing would be to set it according to current location
    if(!s.wasDragged) { // a click+release on the same spot (ie. w/o dragging) means a bar or full reset
        s.wasDragged = undefined; // logic-wise unneeded, just shows `wasDragged` has no longer a meaning
        if(s.clickableOrdinalRange) {
            if(brush.filterSpecified && d.multiselect) {
                s.extent.push(s.clickableOrdinalRange);
            } else {
                s.extent = [s.clickableOrdinalRange];
                brush.filterSpecified = true;
            }
        } else if(grabbingBar) {
            s.extent = s.stayingIntervals;
            if(s.extent.length === 0) {
                brushClear(brush);
            }
        } else {
            brushClear(brush);
        }
        s.brushCallback(d);
        renderHighlight(lThis.parentNode);
        s.brushEndCallback(brush.filterSpecified ? filter.getConsolidated() : []);
        return; // no need to fuse intervals or snap to ordinals, so we can bail early
    }

    var mergeIntervals = function() {
        // Key piece of logic: once the button is released, possibly overlapping intervals will be fused:
        // Here it's done immediately on click release while on ordinal snap transition it's done at the end
        filter.set(filter.getConsolidated());
    };

    if(d.ordinal) {
        var a = d.unitTickvals;
        if(a[a.length - 1] < a[0]) a.reverse();
        s.newExtent = [
            ordinalScaleSnap(0, a, s.newExtent[0], s.stayingIntervals),
            ordinalScaleSnap(1, a, s.newExtent[1], s.stayingIntervals)
        ];
        var hasNewExtent = s.newExtent[1] > s.newExtent[0];
        s.extent = s.stayingIntervals.concat(hasNewExtent ? [s.newExtent] : []);
        if(!s.extent.length) {
            brushClear(brush);
        }
        s.brushCallback(d);
        if(hasNewExtent) {
            // merging intervals post the snap tween
            renderHighlight(lThis.parentNode, mergeIntervals);
        } else {
            // if no new interval, don't animate, just redraw the highlight immediately
            mergeIntervals();
            renderHighlight(lThis.parentNode);
        }
    } else {
        mergeIntervals(); // merging intervals immediately
    }
    s.brushEndCallback(brush.filterSpecified ? filter.getConsolidated() : []);
}

function mousemove(lThis, d) {
    var y = d.height - d3.mouse(lThis)[1] - 2 * c.verticalPadding;
    var interval = getInterval(d, y);

    var cursor = 'crosshair';
    if(interval.clickableOrdinalRange) cursor = 'pointer';
    else if(interval.region) cursor = interval.region + '-resize';
    d3.select(document.body)
        .style('cursor', cursor);
}

function attachDragBehavior(selection) {
    // There's some fiddling with pointer cursor styling so that the cursor preserves its shape while dragging a brush
    // even if the cursor strays from the interacting bar, which is bound to happen as bars are thin and the user
    // will inevitably leave the hotspot strip. In this regard, it does something similar to what the D3 brush would do.
    selection
        .on('mousemove', function(d) {
            d3.event.preventDefault();
            if(!d.parent.inBrushDrag) mousemove(this, d);
        })
        .on('mouseleave', function(d) {
            if(!d.parent.inBrushDrag) clearCursor();
        })
        .call(d3.behavior.drag()
            .on('dragstart', function(d) { dragstart(this, d); })
            .on('drag', function(d) { drag(this, d); })
            .on('dragend', function(d) { dragend(this, d); })
        );
}

function startAsc(a, b) { return a[0] - b[0]; }

function renderAxisBrush(axisBrush) {
    var background = axisBrush.selectAll('.background').data(repeat);

    background.enter()
        .append('rect')
        .classed('background', true)
        .call(barHorizontalSetup)
        .call(backgroundBarHorizontalSetup)
        .style('pointer-events', 'auto') // parent pointer events are disabled; we must have it to register events
        .attr('transform', 'translate(0 ' + c.verticalPadding + ')');

    background
        .call(attachDragBehavior)
        .attr('height', function(d) {
            return d.height - c.verticalPadding;
        });

    var highlightShadow = axisBrush.selectAll('.highlight-shadow').data(repeat); // we have a set here, can't call it `extent`

    highlightShadow.enter()
        .append('line')
        .classed('highlight-shadow', true)
        .attr('x', -c.bar.width / 2)
        .attr('stroke-width', c.bar.width + c.bar.strokeWidth)
        .attr('stroke', c.bar.strokeColor)
        .attr('opacity', c.bar.strokeOpacity)
        .attr('stroke-linecap', 'butt');

    highlightShadow
        .attr('y1', function(d) { return d.height; })
        .call(styleHighlight);

    var highlight = axisBrush.selectAll('.highlight').data(repeat); // we have a set here, can't call it `extent`

    highlight.enter()
        .append('line')
        .classed('highlight', true)
        .attr('x', -c.bar.width / 2)
        .attr('stroke-width', c.bar.width - c.bar.strokeWidth)
        .attr('stroke', c.bar.fillColor)
        .attr('opacity', c.bar.fillOpacity)
        .attr('stroke-linecap', 'butt');

    highlight
        .attr('y1', function(d) { return d.height; })
        .call(styleHighlight);
}

function ensureAxisBrush(axisOverlays) {
    var axisBrush = axisOverlays.selectAll('.' + c.cn.axisBrush)
        .data(repeat, keyFun);

    axisBrush.enter()
        .append('g')
        .classed(c.cn.axisBrush, true);

    renderAxisBrush(axisBrush);
}

function getBrushExtent(brush) {
    return brush.svgBrush.extent.map(function(e) {return e.slice();});
}

function brushClear(brush) {
    brush.filterSpecified = false;
    brush.svgBrush.extent = [[-Infinity, Infinity]];
}

function axisBrushMoved(callback) {
    return function axisBrushMoved(dimension) {
        var brush = dimension.brush;
        var extent = getBrushExtent(brush);
        var newExtent = extent.slice();
        brush.filter.set(newExtent);
        callback();
    };
}

function dedupeRealRanges(intervals) {
    // Fuses elements of intervals if they overlap, yielding discontiguous intervals, results.length <= intervals.length
    // Currently uses closed intervals, ie. dedupeRealRanges([[400, 800], [300, 400]]) -> [300, 800]
    var queue = intervals.slice();
    var result = [];
    var currentInterval;
    var current = queue.shift();
    while(current) { // [].shift === undefined, so we don't descend into an empty array
        currentInterval = current.slice();
        while((current = queue.shift()) && current[0] <= /* right-open interval would need `<` */ currentInterval[1]) {
            currentInterval[1] = Math.max(currentInterval[1], current[1]);
        }
        result.push(currentInterval);
    }

    if(
        result.length === 1 &&
        result[0][0] > result[0][1]
    ) {
        // discard result
        result = [];
    }

    return result;
}

function makeFilter() {
    var filter = [];
    var consolidated;
    var bounds;
    return {
        set: function(a) {
            filter = a
                .map(function(d) { return d.slice().sort(sortAsc); })
                .sort(startAsc);

            // handle unselected case
            if(filter.length === 1 &&
                filter[0][0] === -Infinity &&
                filter[0][1] === Infinity) {
                filter = [[0, -1]];
            }

            consolidated = dedupeRealRanges(filter);
            bounds = filter.reduce(function(p, n) {
                return [Math.min(p[0], n[0]), Math.max(p[1], n[1])];
            }, [Infinity, -Infinity]);
        },
        get: function() { return filter.slice(); },
        getConsolidated: function() { return consolidated; },
        getBounds: function() { return bounds; }
    };
}

function makeBrush(state, rangeSpecified, initialRange, brushStartCallback, brushCallback, brushEndCallback) {
    var filter = makeFilter();
    filter.set(initialRange);
    return {
        filter: filter,
        filterSpecified: rangeSpecified, // there's a difference between not filtering and filtering a non-proper subset
        svgBrush: {
            extent: [], // this is where the svgBrush writes contents into
            brushStartCallback: brushStartCallback,
            brushCallback: axisBrushMoved(brushCallback),
            brushEndCallback: brushEndCallback
        }
    };
}

// for use by supplyDefaults, but it needed tons of pieces from here so
// seemed to make more sense just to put the whole routine here
function cleanRanges(ranges, dimension) {
    if(Array.isArray(ranges[0])) {
        ranges = ranges.map(function(ri) { return ri.sort(sortAsc); });

        if(!dimension.multiselect) ranges = [ranges[0]];
        else ranges = dedupeRealRanges(ranges.sort(startAsc));
    } else ranges = [ranges.sort(sortAsc)];

    // ordinal snapping
    if(dimension.tickvals) {
        var sortedTickVals = dimension.tickvals.slice().sort(sortAsc);
        ranges = ranges.map(function(ri) {
            var rSnapped = [
                ordinalScaleSnap(0, sortedTickVals, ri[0], []),
                ordinalScaleSnap(1, sortedTickVals, ri[1], [])
            ];
            if(rSnapped[1] > rSnapped[0]) return rSnapped;
        })
        .filter(function(ri) { return ri; });

        if(!ranges.length) return;
    }
    return ranges.length > 1 ? ranges : ranges[0];
}

module.exports = {
    makeBrush: makeBrush,
    ensureAxisBrush: ensureAxisBrush,
    cleanRanges: cleanRanges
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/base_plot.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/base_plot.js ***!
  \******************************************************************/
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
var getModuleCalcData = __webpack_require__(/*! ../../plots/get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getModuleCalcData;
var parcoordsPlot = __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/parcoords/plot.js");
var xmlnsNamespaces = __webpack_require__(/*! ../../constants/xmlns_namespaces */ "./node_modules/plotly.js/src/constants/xmlns_namespaces.js");

exports.name = 'parcoords';

exports.plot = function(gd) {
    var calcData = getModuleCalcData(gd.calcdata, 'parcoords')[0];
    if(calcData.length) parcoordsPlot(gd, calcData);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var hadParcoords = (oldFullLayout._has && oldFullLayout._has('parcoords'));
    var hasParcoords = (newFullLayout._has && newFullLayout._has('parcoords'));

    if(hadParcoords && !hasParcoords) {
        oldFullLayout._paperdiv.selectAll('.parcoords').remove();
        oldFullLayout._glimages.selectAll('*').remove();
    }
};

exports.toSVG = function(gd) {
    var imageRoot = gd._fullLayout._glimages;
    var root = d3.select(gd).selectAll('.svg-container');
    var canvases = root.filter(function(d, i) {return i === root.size() - 1;})
        .selectAll('.gl-canvas-context, .gl-canvas-focus');

    function canvasToImage() {
        var canvas = this;
        var imageData = canvas.toDataURL('image/png');
        var image = imageRoot.append('svg:image');

        image.attr({
            xmlns: xmlnsNamespaces.svg,
            'xlink:href': imageData,
            preserveAspectRatio: 'none',
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height
        });
    }

    canvases.each(canvasToImage);

    // Chrome / Safari bug workaround - browser apparently loses connection to the defined pattern
    // Without the workaround, these browsers 'lose' the filter brush styling (color etc.) after a snapshot
    // on a subsequent interaction.
    // Firefox works fine without this workaround
    window.setTimeout(function() {
        d3.selectAll('#filterBarPattern')
            .attr('id', 'filterBarPattern');
    }, 60);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/calc.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/calc.js ***!
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



var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;
var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var wrap = __webpack_require__(/*! ../../lib/gup */ "./node_modules/plotly.js/src/lib/gup.js").wrap;

module.exports = function calc(gd, trace) {
    var lineColor;
    var cscale;

    if(Colorscale.hasColorscale(trace, 'line') && isArrayOrTypedArray(trace.line.color)) {
        lineColor = trace.line.color;
        cscale = Colorscale.extractOpts(trace.line).colorscale;

        Colorscale.calc(gd, trace, {
            vals: lineColor,
            containerStr: 'line',
            cLetter: 'c'
        });
    } else {
        lineColor = constHalf(trace._length);
        cscale = [[0, trace.line.color], [1, trace.line.color]];
    }

    return wrap({lineColor: lineColor, cscale: cscale});
};

function constHalf(len) {
    var out = new Array(len);
    for(var i = 0; i < len; i++) {
        out[i] = 0.5;
    }
    return out;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/constants.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/constants.js ***!
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




module.exports = {
    maxDimensionCount: 60, // this cannot be increased without WebGL code refactoring
    overdrag: 45,
    verticalPadding: 2, // otherwise, horizontal lines on top or bottom are of lower width
    tickDistance: 50,
    canvasPixelRatio: 1,
    blockLineCount: 5000,
    layers: ['contextLineLayer', 'focusLineLayer', 'pickLineLayer'],
    axisTitleOffset: 28,
    axisExtentOffset: 10,
    deselectedLineColor: '#777',
    bar: {
        width: 4, // Visible width of the filter bar
        captureWidth: 10, // Mouse-sensitive width for interaction (Fitts law)
        fillColor: 'magenta', // Color of the filter bar fill
        fillOpacity: 1, // Filter bar fill opacity
        snapDuration: 150, // tween duration in ms for brush snap for ordinal axes
        snapRatio: 0.25, // ratio of bar extension relative to the distance between two adjacent ordinal values
        snapClose: 0.01, // fraction of inter-value distance to snap to the closer one, even if you're not over it
        strokeColor: 'white', // Color of the filter bar side lines
        strokeOpacity: 1, // Filter bar side stroke opacity
        strokeWidth: 1, // Filter bar side stroke width in pixels
        handleHeight: 8, // Height of the filter bar vertical resize areas on top and bottom
        handleOpacity: 1, // Opacity of the filter bar vertical resize areas on top and bottom
        handleOverlap: 0 // A larger than 0 value causes overlaps with the filter bar, represented as pixels
    },
    cn: {
        axisExtentText: 'axis-extent-text',
        parcoordsLineLayers: 'parcoords-line-layers',
        parcoordsLineLayer: 'parcoords-lines',
        parcoords: 'parcoords',
        parcoordsControlView: 'parcoords-control-view',
        yAxis: 'y-axis',
        axisOverlays: 'axis-overlays',
        axis: 'axis',
        axisHeading: 'axis-heading',
        axisTitle: 'axis-title',
        axisExtent: 'axis-extent',
        axisExtentTop: 'axis-extent-top',
        axisExtentTopText: 'axis-extent-top-text',
        axisExtentBottom: 'axis-extent-bottom',
        axisExtentBottomText: 'axis-extent-bottom-text',
        axisBrush: 'axis-brush'
    },
    id: {
        filterBarPattern: 'filter-bar-pattern'

    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;
var handleArrayContainerDefaults = __webpack_require__(/*! ../../plots/array_container_defaults */ "./node_modules/plotly.js/src/plots/array_container_defaults.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/parcoords/attributes.js");
var axisBrush = __webpack_require__(/*! ./axisbrush */ "./node_modules/plotly.js/src/traces/parcoords/axisbrush.js");
var maxDimensionCount = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/parcoords/constants.js").maxDimensionCount;
var mergeLength = __webpack_require__(/*! ./merge_length */ "./node_modules/plotly.js/src/traces/parcoords/merge_length.js");

function handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce) {
    var lineColor = coerce('line.color', defaultColor);

    if(hasColorscale(traceIn, 'line') && Lib.isArrayOrTypedArray(lineColor)) {
        if(lineColor.length) {
            coerce('line.colorscale');
            colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'line.', cLetter: 'c'});
            // TODO: I think it would be better to keep showing lines beyond the last line color
            // but I'm not sure what color to give these lines - probably black or white
            // depending on the background color?
            return lineColor.length;
        } else {
            traceOut.line.color = defaultColor;
        }
    }
    return Infinity;
}

function dimensionDefaults(dimensionIn, dimensionOut, parentOut, opts) {
    function coerce(attr, dflt) {
        return Lib.coerce(dimensionIn, dimensionOut, attributes.dimensions, attr, dflt);
    }

    var values = coerce('values');
    var visible = coerce('visible');
    if(!(values && values.length)) {
        visible = dimensionOut.visible = false;
    }

    if(visible) {
        coerce('label');
        coerce('tickvals');
        coerce('ticktext');
        coerce('tickformat');
        var range = coerce('range');

        dimensionOut._ax = {
            _id: 'y',
            type: 'linear',
            showexponent: 'all',
            exponentformat: 'B',
            range: range
        };

        Axes.setConvert(dimensionOut._ax, opts.layout);

        coerce('multiselect');
        var constraintRange = coerce('constraintrange');
        if(constraintRange) {
            dimensionOut.constraintrange = axisBrush.cleanRanges(constraintRange, dimensionOut);
        }
    }
}

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var dimensionsIn = traceIn.dimensions;
    if(Array.isArray(dimensionsIn) && dimensionsIn.length > maxDimensionCount) {
        Lib.log('parcoords traces support up to ' + maxDimensionCount + ' dimensions at the moment');
        dimensionsIn.splice(maxDimensionCount);
    }

    var dimensions = handleArrayContainerDefaults(traceIn, traceOut, {
        name: 'dimensions',
        layout: layout,
        handleItemDefaults: dimensionDefaults
    });

    var len = handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);

    handleDomainDefaults(traceOut, layout, coerce);

    if(!Array.isArray(dimensions) || !dimensions.length) {
        traceOut.visible = false;
    }

    mergeLength(traceOut, dimensions, 'values', len);

    // make default font size 10px (default is 12),
    // scale linearly with global font size
    var fontDflt = {
        family: layout.font.family,
        size: Math.round(layout.font.size / 1.2),
        color: layout.font.color
    };

    Lib.coerceFont(coerce, 'labelfont', fontDflt);
    Lib.coerceFont(coerce, 'tickfont', fontDflt);
    Lib.coerceFont(coerce, 'rangefont', fontDflt);

    coerce('labelangle');
    coerce('labelside');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/helpers.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/helpers.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var isTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isTypedArray;

exports.convertTypedArray = function(a) {
    return isTypedArray(a) ? Array.prototype.slice.call(a) : a;
};

exports.isOrdinal = function(dimension) {
    return !!dimension.tickvals;
};

exports.isVisible = function(dimension) {
    return dimension.visible || !('visible' in dimension);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/parcoords/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/parcoords/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/parcoords/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/parcoords/plot.js"),
    colorbar: {
        container: 'line',
        min: 'cmin',
        max: 'cmax'
    },

    moduleType: 'trace',
    name: 'parcoords',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/parcoords/base_plot.js"),
    categories: ['gl', 'regl', 'noOpacity', 'noHover'],
    meta: {
        description: [
            'Parallel coordinates for multidimensional exploratory data analysis.',
            'The samples are specified in `dimensions`.',
            'The colors are set in `line.color`.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/lines.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/lines.js ***!
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



var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js");
var vertexShaderSource = glslify('./shaders/vertex.glsl');
var fragmentShaderSource = glslify('./shaders/fragment.glsl');
var maxDim = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/parcoords/constants.js").maxDimensionCount;

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

// don't change; otherwise near/far plane lines are lost
var depthLimitEpsilon = 1e-6;

// precision of multiselect is the full range divided into this many parts
var maskHeight = 2048;

var dummyPixel = new Uint8Array(4);
var dataPixel = new Uint8Array(4);

var paletteTextureConfig = {
    shape: [256, 1],
    format: 'rgba',
    type: 'uint8',
    mag: 'nearest',
    min: 'nearest'
};

function ensureDraw(regl) {
    regl.read({
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        data: dummyPixel
    });
}

function clear(regl, x, y, width, height) {
    var gl = regl._gl;
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(x, y, width, height);
    regl.clear({color: [0, 0, 0, 0], depth: 1}); // clearing is done in scissored panel only
}

function renderBlock(regl, glAes, renderState, blockLineCount, sampleCount, item) {
    var rafKey = item.key;

    function render(blockNumber) {
        var count = Math.min(blockLineCount, sampleCount - blockNumber * blockLineCount);

        if(blockNumber === 0) {
            // stop drawing possibly stale glyphs before clearing
            window.cancelAnimationFrame(renderState.currentRafs[rafKey]);
            delete renderState.currentRafs[rafKey];
            clear(regl, item.scissorX, item.scissorY, item.scissorWidth, item.viewBoxSize[1]);
        }

        if(renderState.clearOnly) {
            return;
        }

        item.count = 2 * count;
        item.offset = 2 * blockNumber * blockLineCount;
        glAes(item);

        if(blockNumber * blockLineCount + count < sampleCount) {
            renderState.currentRafs[rafKey] = window.requestAnimationFrame(function() {
                render(blockNumber + 1);
            });
        }

        renderState.drawCompleted = false;
    }

    if(!renderState.drawCompleted) {
        ensureDraw(regl);
        renderState.drawCompleted = true;
    }

    // start with rendering item 0; recursion handles the rest
    render(0);
}

function adjustDepth(d) {
    // WebGL matrix operations use floats with limited precision, potentially causing a number near a border of [0, 1]
    // to end up slightly outside the border. With an epsilon, we reduce the chance that a line gets clipped by the
    // near or the far plane.
    return Math.max(depthLimitEpsilon, Math.min(1 - depthLimitEpsilon, d));
}

function palette(unitToColor, opacity) {
    var result = new Array(256);
    for(var i = 0; i < 256; i++) {
        result[i] = unitToColor(i / 255).concat(opacity);
    }
    return result;
}

// Maps the sample index [0...sampleCount - 1] to a range of [0, 1] as the shader expects colors in the [0, 1] range.
// but first it shifts the sample index by 0, 8 or 16 bits depending on rgbIndex [0..2]
// with the end result that each line will be of a unique color, making it possible for the pick handler
// to uniquely identify which line is hovered over (bijective mapping).
// The inverse, i.e. readPixel is invoked from 'parcoords.js'
function calcPickColor(i, rgbIndex) {
    return (i >>> 8 * rgbIndex) % 256 / 255;
}

function makePoints(sampleCount, dims, color) {
    var points = new Array(sampleCount * (maxDim + 4));
    var n = 0;
    for(var i = 0; i < sampleCount; i++) {
        for(var k = 0; k < maxDim; k++) {
            points[n++] = (k < dims.length) ? dims[k].paddedUnitValues[i] : 0.5;
        }
        points[n++] = calcPickColor(i, 2);
        points[n++] = calcPickColor(i, 1);
        points[n++] = calcPickColor(i, 0);
        points[n++] = adjustDepth(color[i]);
    }
    return points;
}

function makeVecAttr(vecIndex, sampleCount, points) {
    var pointPairs = new Array(sampleCount * 8);
    var n = 0;
    for(var i = 0; i < sampleCount; i++) {
        for(var j = 0; j < 2; j++) {
            for(var k = 0; k < 4; k++) {
                var q = vecIndex * 4 + k;
                var v = points[i * 64 + q];
                if(q === 63 && j === 0) {
                    v *= -1;
                }
                pointPairs[n++] = v;
            }
        }
    }
    return pointPairs;
}

function pad2(num) {
    var s = '0' + num;
    return s.substr(s.length - 2);
}

function getAttrName(i) {
    return (i < maxDim) ? 'p' + pad2(i + 1) + '_' + pad2(i + 4) : 'colors';
}

function setAttributes(attributes, sampleCount, points) {
    for(var i = 0; i <= maxDim; i += 4) {
        attributes[getAttrName(i)](makeVecAttr(i / 4, sampleCount, points));
    }
}

function emptyAttributes(regl) {
    var attributes = {};
    for(var i = 0; i <= maxDim; i += 4) {
        attributes[getAttrName(i)] = regl.buffer({usage: 'dynamic', type: 'float', data: new Uint8Array(0)});
    }
    return attributes;
}

function makeItem(model, leftmost, rightmost, itemNumber, i0, i1, x, y, panelSizeX, panelSizeY, crossfilterDimensionIndex, drwLayer, constraints) {
    var dims = [[], []];
    for(var k = 0; k < 64; k++) {
        dims[0][k] = (k === i0) ? 1 : 0;
        dims[1][k] = (k === i1) ? 1 : 0;
    }

    var overdrag = model.lines.canvasOverdrag;
    var domain = model.domain;
    var canvasWidth = model.canvasWidth;
    var canvasHeight = model.canvasHeight;

    var deselectedLinesColor = model.deselectedLines.color;

    var itemModel = Lib.extendFlat({
        key: crossfilterDimensionIndex,
        resolution: [canvasWidth, canvasHeight],
        viewBoxPos: [x + overdrag, y],
        viewBoxSize: [panelSizeX, panelSizeY],
        i0: i0,
        i1: i1,

        dim0A: dims[0].slice(0, 16),
        dim0B: dims[0].slice(16, 32),
        dim0C: dims[0].slice(32, 48),
        dim0D: dims[0].slice(48, 64),
        dim1A: dims[1].slice(0, 16),
        dim1B: dims[1].slice(16, 32),
        dim1C: dims[1].slice(32, 48),
        dim1D: dims[1].slice(48, 64),

        drwLayer: drwLayer,
        contextColor: [
            deselectedLinesColor[0] / 255,
            deselectedLinesColor[1] / 255,
            deselectedLinesColor[2] / 255,
            deselectedLinesColor[3] < 1 ?
                deselectedLinesColor[3] :
                Math.max(1 / 255, Math.pow(1 / model.lines.color.length, 1 / 3))
        ],

        scissorX: (itemNumber === leftmost ? 0 : x + overdrag) + (model.pad.l - overdrag) + model.layoutWidth * domain.x[0],
        scissorWidth: (itemNumber === rightmost ? canvasWidth - x + overdrag : panelSizeX + 0.5) + (itemNumber === leftmost ? x + overdrag : 0),
        scissorY: y + model.pad.b + model.layoutHeight * domain.y[0],
        scissorHeight: panelSizeY,

        viewportX: model.pad.l - overdrag + model.layoutWidth * domain.x[0],
        viewportY: model.pad.b + model.layoutHeight * domain.y[0],
        viewportWidth: canvasWidth,
        viewportHeight: canvasHeight
    }, constraints);

    return itemModel;
}

function expandedPixelRange(bounds) {
    var dh = maskHeight - 1;
    var a = Math.max(0, Math.floor(bounds[0] * dh), 0);
    var b = Math.min(dh, Math.ceil(bounds[1] * dh), dh);
    return [
        Math.min(a, b),
        Math.max(a, b)
    ];
}

module.exports = function(canvasGL, d) {
    // context & pick describe which canvas we're talking about - won't change with new data
    var isContext = d.context;
    var isPick = d.pick;

    var regl = d.regl;

    var renderState = {
        currentRafs: {},
        drawCompleted: true,
        clearOnly: false
    };

    // state to be set by update and used later
    var model;
    var vm;
    var initialDims;
    var sampleCount;
    var attributes = emptyAttributes(regl);
    var maskTexture;
    var paletteTexture = regl.texture(paletteTextureConfig);

    var prevAxisOrder = [];

    update(d);

    var glAes = regl({

        profile: false,

        blend: {
            enable: isContext,
            func: {
                srcRGB: 'src alpha',
                dstRGB: 'one minus src alpha',
                srcAlpha: 1,
                dstAlpha: 1 // 'one minus src alpha'
            },
            equation: {
                rgb: 'add',
                alpha: 'add'
            },
            color: [0, 0, 0, 0]
        },

        depth: {
            enable: !isContext,
            mask: true,
            func: 'less',
            range: [0, 1]
        },

        // for polygons
        cull: {
            enable: true,
            face: 'back'
        },

        scissor: {
            enable: true,
            box: {
                x: regl.prop('scissorX'),
                y: regl.prop('scissorY'),
                width: regl.prop('scissorWidth'),
                height: regl.prop('scissorHeight')
            }
        },

        viewport: {
            x: regl.prop('viewportX'),
            y: regl.prop('viewportY'),
            width: regl.prop('viewportWidth'),
            height: regl.prop('viewportHeight')
        },

        dither: false,

        vert: vertexShaderSource,

        frag: fragmentShaderSource,

        primitive: 'lines',
        lineWidth: 1,
        attributes: attributes,
        uniforms: {
            resolution: regl.prop('resolution'),
            viewBoxPos: regl.prop('viewBoxPos'),
            viewBoxSize: regl.prop('viewBoxSize'),
            dim0A: regl.prop('dim0A'),
            dim1A: regl.prop('dim1A'),
            dim0B: regl.prop('dim0B'),
            dim1B: regl.prop('dim1B'),
            dim0C: regl.prop('dim0C'),
            dim1C: regl.prop('dim1C'),
            dim0D: regl.prop('dim0D'),
            dim1D: regl.prop('dim1D'),
            loA: regl.prop('loA'),
            hiA: regl.prop('hiA'),
            loB: regl.prop('loB'),
            hiB: regl.prop('hiB'),
            loC: regl.prop('loC'),
            hiC: regl.prop('hiC'),
            loD: regl.prop('loD'),
            hiD: regl.prop('hiD'),
            palette: paletteTexture,
            contextColor: regl.prop('contextColor'),
            mask: regl.prop('maskTexture'),
            drwLayer: regl.prop('drwLayer'),
            maskHeight: regl.prop('maskHeight')
        },
        offset: regl.prop('offset'),
        count: regl.prop('count')
    });

    function update(dNew) {
        model = dNew.model;
        vm = dNew.viewModel;
        initialDims = vm.dimensions.slice();
        sampleCount = initialDims[0] ? initialDims[0].values.length : 0;

        var lines = model.lines;
        var color = isPick ? lines.color.map(function(_, i) {return i / lines.color.length;}) : lines.color;

        var points = makePoints(sampleCount, initialDims, color);
        setAttributes(attributes, sampleCount, points);

        if(!isContext && !isPick) {
            paletteTexture = regl.texture(Lib.extendFlat({
                data: palette(model.unitToColor, 255)
            }, paletteTextureConfig));
        }
    }

    function makeConstraints(isContext) {
        var i, j, k;

        var limits = [[], []];
        for(k = 0; k < 64; k++) {
            var p = (!isContext && k < initialDims.length) ?
                initialDims[k].brush.filter.getBounds() : [-Infinity, Infinity];

            limits[0][k] = p[0];
            limits[1][k] = p[1];
        }

        var len = maskHeight * 8;
        var mask = new Array(len);
        for(i = 0; i < len; i++) {
            mask[i] = 255;
        }
        if(!isContext) {
            for(i = 0; i < initialDims.length; i++) {
                var u = i % 8;
                var v = (i - u) / 8;
                var bitMask = Math.pow(2, u);
                var dim = initialDims[i];
                var ranges = dim.brush.filter.get();
                if(ranges.length < 2) continue; // bail if the bounding box based filter is sufficient

                var prevEnd = expandedPixelRange(ranges[0])[1];
                for(j = 1; j < ranges.length; j++) {
                    var nextRange = expandedPixelRange(ranges[j]);
                    for(k = prevEnd + 1; k < nextRange[0]; k++) {
                        mask[k * 8 + v] &= ~bitMask;
                    }
                    prevEnd = Math.max(prevEnd, nextRange[1]);
                }
            }
        }

        var textureData = {
            // 8 units x 8 bits = 64 bits, just sufficient for the almost 64 dimensions we support
            shape: [8, maskHeight],
            format: 'alpha',
            type: 'uint8',
            mag: 'nearest',
            min: 'nearest',
            data: mask
        };
        if(maskTexture) maskTexture(textureData);
        else maskTexture = regl.texture(textureData);

        return {
            maskTexture: maskTexture,
            maskHeight: maskHeight,
            loA: limits[0].slice(0, 16),
            loB: limits[0].slice(16, 32),
            loC: limits[0].slice(32, 48),
            loD: limits[0].slice(48, 64),
            hiA: limits[1].slice(0, 16),
            hiB: limits[1].slice(16, 32),
            hiC: limits[1].slice(32, 48),
            hiD: limits[1].slice(48, 64),
        };
    }

    function renderGLParcoords(panels, setChanged, clearOnly) {
        var panelCount = panels.length;
        var i;

        var leftmost;
        var rightmost;
        var lowestX = Infinity;
        var highestX = -Infinity;

        for(i = 0; i < panelCount; i++) {
            if(panels[i].dim0.canvasX < lowestX) {
                lowestX = panels[i].dim0.canvasX;
                leftmost = i;
            }
            if(panels[i].dim1.canvasX > highestX) {
                highestX = panels[i].dim1.canvasX;
                rightmost = i;
            }
        }

        if(panelCount === 0) {
            // clear canvas here, as the panel iteration below will not enter the loop body
            clear(regl, 0, 0, model.canvasWidth, model.canvasHeight);
        }
        var constraints = makeConstraints(isContext);

        for(i = 0; i < panelCount; i++) {
            var p = panels[i];
            var i0 = p.dim0.crossfilterDimensionIndex;
            var i1 = p.dim1.crossfilterDimensionIndex;
            var x = p.canvasX;
            var y = p.canvasY;
            var nextX = x + p.panelSizeX;
            if(setChanged ||
                !prevAxisOrder[i0] ||
                prevAxisOrder[i0][0] !== x ||
                prevAxisOrder[i0][1] !== nextX
            ) {
                prevAxisOrder[i0] = [x, nextX];

                var item = makeItem(
                    model,
                    leftmost, rightmost, i, i0, i1, x, y,
                    p.panelSizeX, p.panelSizeY,
                    p.dim0.crossfilterDimensionIndex,
                    isContext ? 0 : isPick ? 2 : 1,
                    constraints
                );

                renderState.clearOnly = clearOnly;

                var blockLineCount = setChanged ? model.lines.blockLineCount : sampleCount;
                renderBlock(
                    regl, glAes, renderState, blockLineCount, sampleCount, item
                );
            }
        }
    }

    function readPixel(canvasX, canvasY) {
        regl.read({
            x: canvasX,
            y: canvasY,
            width: 1,
            height: 1,
            data: dataPixel
        });
        return dataPixel;
    }

    function readPixels(canvasX, canvasY, width, height) {
        var pixelArray = new Uint8Array(4 * width * height);
        regl.read({
            x: canvasX,
            y: canvasY,
            width: width,
            height: height,
            data: pixelArray
        });
        return pixelArray;
    }

    function destroy() {
        canvasGL.style['pointer-events'] = 'none';
        paletteTexture.destroy();
        if(maskTexture) maskTexture.destroy();
        for(var k in attributes) attributes[k].destroy();
    }

    return {
        render: renderGLParcoords,
        readPixel: readPixel,
        readPixels: readPixels,
        destroy: destroy,
        update: update
    };
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/merge_length.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/merge_length.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



/**
 * mergeLength: set trace length as the minimum of all dimension data lengths
 *     and propagates this length into each dimension
 *
 * @param {object} traceOut: the fullData trace
 * @param {Array(object)} dimensions: array of dimension objects
 * @param {string} dataAttr: the attribute of each dimension containing the data
 * @param {integer} len: an already-existing length from other attributes
 */
module.exports = function(traceOut, dimensions, dataAttr, len) {
    if(!len) len = Infinity;
    var i, dimi;
    for(i = 0; i < dimensions.length; i++) {
        dimi = dimensions[i];
        if(dimi.visible) len = Math.min(len, dimi[dataAttr].length);
    }
    if(len === Infinity) len = 0;

    traceOut._length = len;
    for(i = 0; i < dimensions.length; i++) {
        dimi = dimensions[i];
        if(dimi.visible) dimi._length = len;
    }

    return len;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/parcoords.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/parcoords.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var rgba = __webpack_require__(/*! color-rgba */ "./node_modules/color-rgba/index.js");

var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");

var gup = __webpack_require__(/*! ../../lib/gup */ "./node_modules/plotly.js/src/lib/gup.js");
var keyFun = gup.keyFun;
var repeat = gup.repeat;
var unwrap = gup.unwrap;

var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/parcoords/helpers.js");
var c = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/parcoords/constants.js");
var brush = __webpack_require__(/*! ./axisbrush */ "./node_modules/plotly.js/src/traces/parcoords/axisbrush.js");
var lineLayerMaker = __webpack_require__(/*! ./lines */ "./node_modules/plotly.js/src/traces/parcoords/lines.js");

function findExtreme(fn, values, len) {
    return Lib.aggNums(fn, null, values, len);
}

function findExtremes(values, len) {
    return fixExtremes(
        findExtreme(Math.min, values, len),
        findExtreme(Math.max, values, len)
    );
}

function dimensionExtent(dimension) {
    var range = dimension.range;
    return range ?
        fixExtremes(range[0], range[1]) :
        findExtremes(dimension.values, dimension._length);
}

function fixExtremes(lo, hi) {
    if(isNaN(lo) || !isFinite(lo)) {
        lo = 0;
    }

    if(isNaN(hi) || !isFinite(hi)) {
        hi = 0;
    }

    // avoid a degenerate (zero-width) domain
    if(lo === hi) {
        if(lo === 0) {
            // no use to multiplying zero, so add/subtract in this case
            lo -= 1;
            hi += 1;
        } else {
            // this keeps the range in the order of magnitude of the data
            lo *= 0.9;
            hi *= 1.1;
        }
    }

    return [lo, hi];
}

function toText(formatter, texts) {
    if(texts) {
        return function(v, i) {
            var text = texts[i];
            if(text === null || text === undefined) return formatter(v);
            return text;
        };
    }
    return formatter;
}

function domainScale(height, padding, dimension, tickvals, ticktext) {
    var extent = dimensionExtent(dimension);
    if(tickvals) {
        return d3.scale.ordinal()
            .domain(tickvals.map(toText(d3.format(dimension.tickformat), ticktext)))
            .range(tickvals
                .map(function(d) {
                    var unitVal = (d - extent[0]) / (extent[1] - extent[0]);
                    return (height - padding + unitVal * (2 * padding - height));
                })
            );
    }
    return d3.scale.linear()
        .domain(extent)
        .range([height - padding, padding]);
}

function unitToPaddedPx(height, padding) {
    return d3.scale.linear().range([padding, height - padding]);
}

function domainToPaddedUnitScale(dimension, padFraction) {
    return d3.scale.linear()
        .domain(dimensionExtent(dimension))
        .range([padFraction, 1 - padFraction]);
}

function ordinalScale(dimension) {
    if(!dimension.tickvals) return;

    var extent = dimensionExtent(dimension);
    return d3.scale.ordinal()
        .domain(dimension.tickvals)
        .range(dimension.tickvals.map(function(d) {
            return (d - extent[0]) / (extent[1] - extent[0]);
        }));
}

function unitToColorScale(cscale) {
    var colorStops = cscale.map(function(d) { return d[0]; });
    var colorTuples = cscale.map(function(d) {
        var RGBA = rgba(d[1]);
        return d3.rgb('rgb(' + RGBA[0] + ',' + RGBA[1] + ',' + RGBA[2] + ')');
    });
    var prop = function(n) { return function(o) { return o[n]; }; };

    // We can't use d3 color interpolation as we may have non-uniform color palette raster
    // (various color stop distances).
    var polylinearUnitScales = 'rgb'.split('').map(function(key) {
        return d3.scale.linear()
            .clamp(true)
            .domain(colorStops)
            .range(colorTuples.map(prop(key)));
    });

    return function(d) {
        return polylinearUnitScales.map(function(s) {
            return s(d);
        });
    };
}

function someFiltersActive(view) {
    return view.dimensions.some(function(p) {
        return p.brush.filterSpecified;
    });
}

function model(layout, d, i) {
    var cd0 = unwrap(d);
    var trace = cd0.trace;
    var lineColor = helpers.convertTypedArray(cd0.lineColor);
    var line = trace.line;
    var deselectedLines = {color: rgba(c.deselectedLineColor)};
    var cOpts = Colorscale.extractOpts(line);
    var cscale = cOpts.reversescale ? Colorscale.flipScale(cd0.cscale) : cd0.cscale;
    var domain = trace.domain;
    var dimensions = trace.dimensions;
    var width = layout.width;
    var labelAngle = trace.labelangle;
    var labelSide = trace.labelside;
    var labelFont = trace.labelfont;
    var tickFont = trace.tickfont;
    var rangeFont = trace.rangefont;

    var lines = Lib.extendDeepNoArrays({}, line, {
        color: lineColor.map(d3.scale.linear().domain(
            dimensionExtent({
                values: lineColor,
                range: [cOpts.min, cOpts.max],
                _length: trace._length
            })
        )),
        blockLineCount: c.blockLineCount,
        canvasOverdrag: c.overdrag * c.canvasPixelRatio
    });

    var groupWidth = Math.floor(width * (domain.x[1] - domain.x[0]));
    var groupHeight = Math.floor(layout.height * (domain.y[1] - domain.y[0]));

    var pad = layout.margin || {l: 80, r: 80, t: 100, b: 80};
    var rowContentWidth = groupWidth;
    var rowHeight = groupHeight;

    return {
        key: i,
        colCount: dimensions.filter(helpers.isVisible).length,
        dimensions: dimensions,
        tickDistance: c.tickDistance,
        unitToColor: unitToColorScale(cscale),
        lines: lines,
        deselectedLines: deselectedLines,
        labelAngle: labelAngle,
        labelSide: labelSide,
        labelFont: labelFont,
        tickFont: tickFont,
        rangeFont: rangeFont,
        layoutWidth: width,
        layoutHeight: layout.height,
        domain: domain,
        translateX: domain.x[0] * width,
        translateY: layout.height - domain.y[1] * layout.height,
        pad: pad,
        canvasWidth: rowContentWidth * c.canvasPixelRatio + 2 * lines.canvasOverdrag,
        canvasHeight: rowHeight * c.canvasPixelRatio,
        width: rowContentWidth,
        height: rowHeight,
        canvasPixelRatio: c.canvasPixelRatio
    };
}

function viewModel(state, callbacks, model) {
    var width = model.width;
    var height = model.height;
    var dimensions = model.dimensions;
    var canvasPixelRatio = model.canvasPixelRatio;

    var xScale = function(d) {return width * d / Math.max(1, model.colCount - 1);};

    var unitPad = c.verticalPadding / height;
    var _unitToPaddedPx = unitToPaddedPx(height, c.verticalPadding);

    var vm = {
        key: model.key,
        xScale: xScale,
        model: model,
        inBrushDrag: false // consider factoring it out and putting it in a centralized global-ish gesture state object
    };

    var uniqueKeys = {};

    vm.dimensions = dimensions.filter(helpers.isVisible).map(function(dimension, i) {
        var domainToPaddedUnit = domainToPaddedUnitScale(dimension, unitPad);
        var foundKey = uniqueKeys[dimension.label];
        uniqueKeys[dimension.label] = (foundKey || 0) + 1;
        var key = dimension.label + (foundKey ? '__' + foundKey : '');
        var specifiedConstraint = dimension.constraintrange;
        var filterRangeSpecified = specifiedConstraint && specifiedConstraint.length;
        if(filterRangeSpecified && !Array.isArray(specifiedConstraint[0])) {
            specifiedConstraint = [specifiedConstraint];
        }
        var filterRange = filterRangeSpecified ?
            specifiedConstraint.map(function(d) { return d.map(domainToPaddedUnit); }) :
            [[-Infinity, Infinity]];
        var brushMove = function() {
            var p = vm;
            p.focusLayer && p.focusLayer.render(p.panels, true);
            var filtersActive = someFiltersActive(p);
            if(!state.contextShown() && filtersActive) {
                p.contextLayer && p.contextLayer.render(p.panels, true);
                state.contextShown(true);
            } else if(state.contextShown() && !filtersActive) {
                p.contextLayer && p.contextLayer.render(p.panels, true, true);
                state.contextShown(false);
            }
        };

        var truncatedValues = dimension.values;
        if(truncatedValues.length > dimension._length) {
            truncatedValues = truncatedValues.slice(0, dimension._length);
        }

        var tickvals = dimension.tickvals;
        var ticktext;
        function makeTickItem(v, i) { return {val: v, text: ticktext[i]}; }
        function sortTickItem(a, b) { return a.val - b.val; }
        if(Array.isArray(tickvals) && tickvals.length) {
            ticktext = dimension.ticktext;

            // ensure ticktext and tickvals have same length
            if(!Array.isArray(ticktext) || !ticktext.length) {
                ticktext = tickvals.map(d3.format(dimension.tickformat));
            } else if(ticktext.length > tickvals.length) {
                ticktext = ticktext.slice(0, tickvals.length);
            } else if(tickvals.length > ticktext.length) {
                tickvals = tickvals.slice(0, ticktext.length);
            }

            // check if we need to sort tickvals/ticktext
            for(var j = 1; j < tickvals.length; j++) {
                if(tickvals[j] < tickvals[j - 1]) {
                    var tickItems = tickvals.map(makeTickItem).sort(sortTickItem);
                    for(var k = 0; k < tickvals.length; k++) {
                        tickvals[k] = tickItems[k].val;
                        ticktext[k] = tickItems[k].text;
                    }
                    break;
                }
            }
        } else tickvals = undefined;

        truncatedValues = helpers.convertTypedArray(truncatedValues);

        return {
            key: key,
            label: dimension.label,
            tickFormat: dimension.tickformat,
            tickvals: tickvals,
            ticktext: ticktext,
            ordinal: helpers.isOrdinal(dimension),
            multiselect: dimension.multiselect,
            xIndex: i,
            crossfilterDimensionIndex: i,
            visibleIndex: dimension._index,
            height: height,
            values: truncatedValues,
            paddedUnitValues: truncatedValues.map(domainToPaddedUnit),
            unitTickvals: tickvals && tickvals.map(domainToPaddedUnit),
            xScale: xScale,
            x: xScale(i),
            canvasX: xScale(i) * canvasPixelRatio,
            unitToPaddedPx: _unitToPaddedPx,
            domainScale: domainScale(height, c.verticalPadding, dimension, tickvals, ticktext),
            ordinalScale: ordinalScale(dimension),
            parent: vm,
            model: model,
            brush: brush.makeBrush(
                state,
                filterRangeSpecified,
                filterRange,
                function() {
                    state.linePickActive(false);
                },
                brushMove,
                function(f) {
                    vm.focusLayer.render(vm.panels, true);
                    vm.pickLayer && vm.pickLayer.render(vm.panels, true);
                    state.linePickActive(true);
                    if(callbacks && callbacks.filterChanged) {
                        var invScale = domainToPaddedUnit.invert;

                        // update gd.data as if a Plotly.restyle were fired
                        var newRanges = f.map(function(r) {
                            return r.map(invScale).sort(Lib.sorterAsc);
                        }).sort(function(a, b) { return a[0] - b[0]; });
                        callbacks.filterChanged(vm.key, dimension._index, newRanges);
                    }
                }
            )
        };
    });

    return vm;
}

function styleExtentTexts(selection) {
    selection
        .classed(c.cn.axisExtentText, true)
        .attr('text-anchor', 'middle')
        .style('cursor', 'default')
        .style('user-select', 'none');
}

function parcoordsInteractionState() {
    var linePickActive = true;
    var contextShown = false;
    return {
        linePickActive: function(val) {return arguments.length ? linePickActive = !!val : linePickActive;},
        contextShown: function(val) {return arguments.length ? contextShown = !!val : contextShown;}
    };
}

function calcTilt(angle, position) {
    var dir = (position === 'top') ? 1 : -1;
    var radians = angle * Math.PI / 180;
    var dx = Math.sin(radians);
    var dy = Math.cos(radians);
    return {
        dir: dir,
        dx: dx,
        dy: dy,
        degrees: angle
    };
}

function updatePanelLayout(yAxis, vm) {
    var panels = vm.panels || (vm.panels = []);
    var data = yAxis.data();
    for(var i = 0; i < data.length - 1; i++) {
        var p = panels[i] || (panels[i] = {});
        var dim0 = data[i];
        var dim1 = data[i + 1];
        p.dim0 = dim0;
        p.dim1 = dim1;
        p.canvasX = dim0.canvasX;
        p.panelSizeX = dim1.canvasX - dim0.canvasX;
        p.panelSizeY = vm.model.canvasHeight;
        p.y = 0;
        p.canvasY = 0;
    }
}

function calcAllTicks(cd) {
    for(var i = 0; i < cd.length; i++) {
        for(var j = 0; j < cd[i].length; j++) {
            var trace = cd[i][j].trace;
            var dimensions = trace.dimensions;

            for(var k = 0; k < dimensions.length; k++) {
                var values = dimensions[k].values;
                var dim = dimensions[k]._ax;

                if(dim) {
                    if(!dim.range) {
                        dim.range = findExtremes(values, trace._length);
                    } else {
                        dim.range = fixExtremes(dim.range[0], dim.range[1]);
                    }

                    if(!dim.dtick) {
                        dim.dtick = 0.01 * (Math.abs(dim.range[1] - dim.range[0]) || 1);
                    }

                    dim.tickformat = dimensions[k].tickformat;
                    Axes.calcTicks(dim);
                    dim.cleanRange();
                }
            }
        }
    }
}

function linearFormat(dim, v) {
    return Axes.tickText(dim._ax, v, false).text;
}

function extremeText(d, isTop) {
    if(d.ordinal) return '';
    var domain = d.domainScale.domain();
    var v = (domain[isTop ? domain.length - 1 : 0]);

    return linearFormat(d.model.dimensions[d.visibleIndex], v);
}


module.exports = function parcoords(gd, cdModule, layout, callbacks) {
    var fullLayout = gd._fullLayout;
    var svg = fullLayout._toppaper;
    var glContainer = fullLayout._glcontainer;

    calcAllTicks(cdModule);

    var state = parcoordsInteractionState();

    var vm = cdModule
        .filter(function(d) { return unwrap(d).trace.visible; })
        .map(model.bind(0, layout))
        .map(viewModel.bind(0, state, callbacks));

    glContainer.each(function(d, i) {
        return Lib.extendFlat(d, vm[i]);
    });

    var glLayers = glContainer.selectAll('.gl-canvas')
        .each(function(d) {
            // FIXME: figure out how to handle multiple instances
            d.viewModel = vm[0];
            d.model = d.viewModel ? d.viewModel.model : null;
        });

    var lastHovered = null;

    var pickLayer = glLayers.filter(function(d) {return d.pick;});

    // emit hover / unhover event
    pickLayer
        .style('pointer-events', 'auto')
        .on('mousemove', function(d) {
            if(state.linePickActive() && d.lineLayer && callbacks && callbacks.hover) {
                var event = d3.event;
                var cw = this.width;
                var ch = this.height;
                var pointer = d3.mouse(this);
                var x = pointer[0];
                var y = pointer[1];

                if(x < 0 || y < 0 || x >= cw || y >= ch) {
                    return;
                }
                var pixel = d.lineLayer.readPixel(x, ch - 1 - y);
                var found = pixel[3] !== 0;
                // inverse of the calcPickColor in `lines.js`; detailed comment there
                var curveNumber = found ? pixel[2] + 256 * (pixel[1] + 256 * pixel[0]) : null;
                var eventData = {
                    x: x,
                    y: y,
                    clientX: event.clientX,
                    clientY: event.clientY,
                    dataIndex: d.model.key,
                    curveNumber: curveNumber
                };
                if(curveNumber !== lastHovered) { // don't unnecessarily repeat the same hit (or miss)
                    if(found) {
                        callbacks.hover(eventData);
                    } else if(callbacks.unhover) {
                        callbacks.unhover(eventData);
                    }
                    lastHovered = curveNumber;
                }
            }
        });

    glLayers
        .style('opacity', function(d) {return d.pick ? 0 : 1;});

    svg.style('background', 'rgba(255, 255, 255, 0)');
    var controlOverlay = svg.selectAll('.' + c.cn.parcoords)
        .data(vm, keyFun);

    controlOverlay.exit().remove();

    controlOverlay.enter()
        .append('g')
        .classed(c.cn.parcoords, true)
        .style('shape-rendering', 'crispEdges')
        .style('pointer-events', 'none');

    controlOverlay.attr('transform', function(d) {
        return 'translate(' + d.model.translateX + ',' + d.model.translateY + ')';
    });

    var parcoordsControlView = controlOverlay.selectAll('.' + c.cn.parcoordsControlView)
        .data(repeat, keyFun);

    parcoordsControlView.enter()
        .append('g')
        .classed(c.cn.parcoordsControlView, true);

    parcoordsControlView.attr('transform', function(d) {
        return 'translate(' + d.model.pad.l + ',' + d.model.pad.t + ')';
    });

    var yAxis = parcoordsControlView.selectAll('.' + c.cn.yAxis)
        .data(function(p) { return p.dimensions; }, keyFun);

    yAxis.enter()
        .append('g')
        .classed(c.cn.yAxis, true);

    parcoordsControlView.each(function(p) {
        updatePanelLayout(yAxis, p);
    });

    glLayers
        .each(function(d) {
            if(d.viewModel) {
                if(!d.lineLayer || callbacks) { // recreate in case of having callbacks e.g. restyle. Should we test for callback to be a restyle?
                    d.lineLayer = lineLayerMaker(this, d);
                } else d.lineLayer.update(d);

                if(d.key || d.key === 0) d.viewModel[d.key] = d.lineLayer;

                var setChanged = (!d.context || // don't update background
                                  callbacks);   // unless there is a callback on the context layer. Should we test the callback?

                d.lineLayer.render(d.viewModel.panels, setChanged);
            }
        });

    yAxis.attr('transform', function(d) {
        return 'translate(' + d.xScale(d.xIndex) + ', 0)';
    });

    // drag column for reordering columns
    yAxis.call(d3.behavior.drag()
        .origin(function(d) { return d; })
        .on('drag', function(d) {
            var p = d.parent;
            state.linePickActive(false);
            d.x = Math.max(-c.overdrag, Math.min(d.model.width + c.overdrag, d3.event.x));
            d.canvasX = d.x * d.model.canvasPixelRatio;
            yAxis
                .sort(function(a, b) { return a.x - b.x; })
                .each(function(e, i) {
                    e.xIndex = i;
                    e.x = d === e ? e.x : e.xScale(e.xIndex);
                    e.canvasX = e.x * e.model.canvasPixelRatio;
                });

            updatePanelLayout(yAxis, p);

            yAxis.filter(function(e) { return Math.abs(d.xIndex - e.xIndex) !== 0; })
                .attr('transform', function(d) { return 'translate(' + d.xScale(d.xIndex) + ', 0)'; });
            d3.select(this).attr('transform', 'translate(' + d.x + ', 0)');
            yAxis.each(function(e, i0, i1) { if(i1 === d.parent.key) p.dimensions[i0] = e; });
            p.contextLayer && p.contextLayer.render(p.panels, false, !someFiltersActive(p));
            p.focusLayer.render && p.focusLayer.render(p.panels);
        })
        .on('dragend', function(d) {
            var p = d.parent;
            d.x = d.xScale(d.xIndex);
            d.canvasX = d.x * d.model.canvasPixelRatio;
            updatePanelLayout(yAxis, p);
            d3.select(this)
                .attr('transform', function(d) { return 'translate(' + d.x + ', 0)'; });
            p.contextLayer && p.contextLayer.render(p.panels, false, !someFiltersActive(p));
            p.focusLayer && p.focusLayer.render(p.panels);
            p.pickLayer && p.pickLayer.render(p.panels, true);
            state.linePickActive(true);

            if(callbacks && callbacks.axesMoved) {
                callbacks.axesMoved(p.key, p.dimensions.map(function(e) {return e.crossfilterDimensionIndex;}));
            }
        })
    );

    yAxis.exit()
        .remove();

    var axisOverlays = yAxis.selectAll('.' + c.cn.axisOverlays)
        .data(repeat, keyFun);

    axisOverlays.enter()
        .append('g')
        .classed(c.cn.axisOverlays, true);

    axisOverlays.selectAll('.' + c.cn.axis).remove();

    var axis = axisOverlays.selectAll('.' + c.cn.axis)
        .data(repeat, keyFun);

    axis.enter()
        .append('g')
        .classed(c.cn.axis, true);

    axis
        .each(function(d) {
            var wantedTickCount = d.model.height / d.model.tickDistance;
            var scale = d.domainScale;
            var sdom = scale.domain();
            d3.select(this)
                .call(d3.svg.axis()
                    .orient('left')
                    .tickSize(4)
                    .outerTickSize(2)
                    .ticks(wantedTickCount, d.tickFormat) // works for continuous scales only...
                    .tickValues(d.ordinal ? // and this works for ordinal scales
                        sdom :
                        null)
                    .tickFormat(function(v) {
                        return helpers.isOrdinal(d) ? v : linearFormat(d.model.dimensions[d.visibleIndex], v);
                    })
                    .scale(scale));
            Drawing.font(axis.selectAll('text'), d.model.tickFont);
        });

    axis.selectAll('.domain, .tick>line')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-opacity', 0.25)
        .attr('stroke-width', '1px');

    axis.selectAll('text')
        .style('text-shadow', '1px 1px 1px #fff, -1px -1px 1px #fff, 1px -1px 1px #fff, -1px 1px 1px #fff')
        .style('cursor', 'default')
        .style('user-select', 'none');

    var axisHeading = axisOverlays.selectAll('.' + c.cn.axisHeading)
        .data(repeat, keyFun);

    axisHeading.enter()
        .append('g')
        .classed(c.cn.axisHeading, true);

    var axisTitle = axisHeading.selectAll('.' + c.cn.axisTitle)
        .data(repeat, keyFun);

    axisTitle.enter()
        .append('text')
        .classed(c.cn.axisTitle, true)
        .attr('text-anchor', 'middle')
        .style('cursor', 'ew-resize')
        .style('user-select', 'none')
        .style('pointer-events', 'auto');

    axisTitle
        .text(function(d) { return d.label; })
        .each(function(d) {
            var e = d3.select(this);
            Drawing.font(e, d.model.labelFont);
            svgTextUtils.convertToTspans(e, gd);
        })
        .attr('transform', function(d) {
            var tilt = calcTilt(d.model.labelAngle, d.model.labelSide);
            var r = c.axisTitleOffset;
            return (
                (tilt.dir > 0 ? '' : 'translate(0,' + (2 * r + d.model.height) + ')') +
                'rotate(' + tilt.degrees + ')' +
                'translate(' + (-r * tilt.dx) + ',' + (-r * tilt.dy) + ')'
            );
        })
        .attr('text-anchor', function(d) {
            var tilt = calcTilt(d.model.labelAngle, d.model.labelSide);
            var adx = Math.abs(tilt.dx);
            var ady = Math.abs(tilt.dy);

            if(2 * adx > ady) {
                return (tilt.dir * tilt.dx < 0) ? 'start' : 'end';
            } else {
                return 'middle';
            }
        });

    var axisExtent = axisOverlays.selectAll('.' + c.cn.axisExtent)
        .data(repeat, keyFun);

    axisExtent.enter()
        .append('g')
        .classed(c.cn.axisExtent, true);

    var axisExtentTop = axisExtent.selectAll('.' + c.cn.axisExtentTop)
        .data(repeat, keyFun);

    axisExtentTop.enter()
        .append('g')
        .classed(c.cn.axisExtentTop, true);

    axisExtentTop
        .attr('transform', 'translate(' + 0 + ',' + -c.axisExtentOffset + ')');

    var axisExtentTopText = axisExtentTop.selectAll('.' + c.cn.axisExtentTopText)
        .data(repeat, keyFun);

    axisExtentTopText.enter()
        .append('text')
        .classed(c.cn.axisExtentTopText, true)
        .call(styleExtentTexts);

    axisExtentTopText
        .text(function(d) { return extremeText(d, true); })
        .each(function(d) { Drawing.font(d3.select(this), d.model.rangeFont); });

    var axisExtentBottom = axisExtent.selectAll('.' + c.cn.axisExtentBottom)
        .data(repeat, keyFun);

    axisExtentBottom.enter()
        .append('g')
        .classed(c.cn.axisExtentBottom, true);

    axisExtentBottom
        .attr('transform', function(d) {
            return 'translate(' + 0 + ',' + (d.model.height + c.axisExtentOffset) + ')';
        });

    var axisExtentBottomText = axisExtentBottom.selectAll('.' + c.cn.axisExtentBottomText)
        .data(repeat, keyFun);

    axisExtentBottomText.enter()
        .append('text')
        .classed(c.cn.axisExtentBottomText, true)
        .attr('dy', '0.75em')
        .call(styleExtentTexts);

    axisExtentBottomText
        .text(function(d) { return extremeText(d, false); })
        .each(function(d) { Drawing.font(d3.select(this), d.model.rangeFont); });

    brush.ensureAxisBrush(axisOverlays);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcoords/plot.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcoords/plot.js ***!
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



var parcoords = __webpack_require__(/*! ./parcoords */ "./node_modules/plotly.js/src/traces/parcoords/parcoords.js");
var prepareRegl = __webpack_require__(/*! ../../lib/prepare_regl */ "./node_modules/plotly.js/src/lib/prepare_regl.js");
var isVisible = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/parcoords/helpers.js").isVisible;

function newIndex(visibleIndices, orig, dim) {
    var origIndex = orig.indexOf(dim);
    var currentIndex = visibleIndices.indexOf(origIndex);
    if(currentIndex === -1) {
        // invisible dimensions initially go to the end
        currentIndex += orig.length;
    }
    return currentIndex;
}

function sorter(visibleIndices, orig) {
    return function sorter(d1, d2) {
        return (
            newIndex(visibleIndices, orig, d1) -
            newIndex(visibleIndices, orig, d2)
        );
    };
}

module.exports = function plot(gd, cdModule) {
    var fullLayout = gd._fullLayout;

    var success = prepareRegl(gd);
    if(!success) return;

    var currentDims = {};
    var initialDims = {};
    var fullIndices = {};
    var inputIndices = {};

    var size = fullLayout._size;

    cdModule.forEach(function(d, i) {
        var trace = d[0].trace;
        fullIndices[i] = trace.index;
        var iIn = inputIndices[i] = trace._fullInput.index;
        currentDims[i] = gd.data[iIn].dimensions;
        initialDims[i] = gd.data[iIn].dimensions.slice();
    });

    var filterChanged = function(i, initialDimIndex, newRanges) {
        // Have updated `constraintrange` data on `gd.data` and raise `Plotly.restyle` event
        // without having to incur heavy UI blocking due to an actual `Plotly.restyle` call

        var dim = initialDims[i][initialDimIndex];
        var newConstraints = newRanges.map(function(r) { return r.slice(); });

        // Store constraint range in preGUI
        // This one doesn't work if it's stored in pieces in _storeDirectGUIEdit
        // because it's an array of variable dimensionality. So store the whole
        // thing at once manually.
        var aStr = 'dimensions[' + initialDimIndex + '].constraintrange';
        var preGUI = fullLayout._tracePreGUI[gd._fullData[fullIndices[i]]._fullInput.uid];
        if(preGUI[aStr] === undefined) {
            var initialVal = dim.constraintrange;
            preGUI[aStr] = initialVal || null;
        }

        var fullDimension = gd._fullData[fullIndices[i]].dimensions[initialDimIndex];

        if(!newConstraints.length) {
            delete dim.constraintrange;
            delete fullDimension.constraintrange;
            newConstraints = null;
        } else {
            if(newConstraints.length === 1) newConstraints = newConstraints[0];
            dim.constraintrange = newConstraints;
            fullDimension.constraintrange = newConstraints.slice();
            // wrap in another array for restyle event data
            newConstraints = [newConstraints];
        }

        var restyleData = {};
        restyleData[aStr] = newConstraints;
        gd.emit('plotly_restyle', [restyleData, [inputIndices[i]]]);
    };

    var hover = function(eventData) {
        gd.emit('plotly_hover', eventData);
    };

    var unhover = function(eventData) {
        gd.emit('plotly_unhover', eventData);
    };

    var axesMoved = function(i, visibleIndices) {
        // Have updated order data on `gd.data` and raise `Plotly.restyle` event
        // without having to incur heavy UI blocking due to an actual `Plotly.restyle` call

        // drag&drop sorting of the visible dimensions
        var orig = sorter(visibleIndices, initialDims[i].filter(isVisible));
        currentDims[i].sort(orig);

        // invisible dimensions are not interpreted in the context of drag&drop sorting as an invisible dimension
        // cannot be dragged; they're interspersed into their original positions by this subsequent merging step
        initialDims[i].filter(function(d) {return !isVisible(d);})
             .sort(function(d) {
                 // subsequent splicing to be done left to right, otherwise indices may be incorrect
                 return initialDims[i].indexOf(d);
             })
            .forEach(function(d) {
                currentDims[i].splice(currentDims[i].indexOf(d), 1); // remove from the end
                currentDims[i].splice(initialDims[i].indexOf(d), 0, d); // insert at original index
            });

        // TODO: we can't really store this part of the interaction state
        // directly as below, since it incudes data arrays. If we want to
        // persist column order we may have to do something special for this
        // case to just store the order itself.
        // Registry.call('_storeDirectGUIEdit',
        //     gd.data[inputIndices[i]],
        //     fullLayout._tracePreGUI[gd._fullData[fullIndices[i]]._fullInput.uid],
        //     {dimensions: currentDims[i]}
        // );

        gd.emit('plotly_restyle', [{dimensions: [currentDims[i]]}, [inputIndices[i]]]);
    };

    parcoords(
        gd,
        cdModule,
        { // layout
            width: size.w,
            height: size.h,
            margin: {
                t: size.t,
                r: size.r,
                b: size.b,
                l: size.l
            }
        },
        { // callbacks
            filterChanged: filterChanged,
            hover: hover,
            unhover: unhover,
            axesMoved: axesMoved
        }
    );
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvcGFyY29vcmRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9saWIvZ3VwLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGFyY29vcmRzL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9wYXJjb29yZHMvYXhpc2JydXNoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGFyY29vcmRzL2Jhc2VfcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BhcmNvb3Jkcy9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGFyY29vcmRzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BhcmNvb3Jkcy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BhcmNvb3Jkcy9oZWxwZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGFyY29vcmRzL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGFyY29vcmRzL2xpbmVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGFyY29vcmRzL21lcmdlX2xlbmd0aC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BhcmNvb3Jkcy9wYXJjb29yZHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9wYXJjb29yZHMvcGxvdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYiw2SEFBbUQ7Ozs7Ozs7Ozs7OztBQ1ZuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsZ0VBQVk7O0FBRW5DLGtCQUFrQjs7QUFFbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsY0FBYztBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixzQkFBc0IsbUJBQU8sQ0FBQyxnSEFBd0M7QUFDdEUsZ0JBQWdCLG1CQUFPLENBQUMsa0hBQXlDO0FBQ2pFLGdCQUFnQixtQkFBTyxDQUFDLDBGQUE2QjtBQUNyRCxrQkFBa0Isd0dBQXdDOztBQUUxRCxpQkFBaUIsb0dBQXNDO0FBQ3ZELHFCQUFxQixnSUFBc0Q7O0FBRTNFO0FBQ0EseUJBQXlCLGlEQUFpRDs7QUFFMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FB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dCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9wYXJjb29yZHMnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG5mdW5jdGlvbiB3cmFwKGQpIHtyZXR1cm4gW2RdO31cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvLyBUaGUgRDMgZGF0YSBiaW5kaW5nIGNvbmNlcHQgYW5kIHRoZSBHZW5lcmFsIFVwZGF0ZSBQYXR0ZXJuIHByb21vdGVzIHRoZSBpZGVhIG9mXG4gICAgLy8gdHJhdmVyc2luZyBpbnRvIHRoZSBzY2VuZWdyYXBoIGJ5IHVzaW5nIHRoZSBgLmRhdGEoZnVuLCBrZXlGdW4pYCBjYWxsLlxuICAgIC8vIFRoZSBgZnVuYCBpcyBtb3N0IG9mdGVuIGEgYHJlcGVhdGAsIGllLiB0aGUgZWxlbWVudHMgYmVuZWF0aCBhIGA8Zz5gIGVsZW1lbnQgbmVlZFxuICAgIC8vIGFjY2VzcyB0byB0aGUgc2FtZSBkYXRhLCBvciBhIGBkZXNjZW5kYCwgd2hpY2ggZmFucyBhIHNjZW5lZ3JhcGggbm9kZSBpbnRvIGEgYnVuY2ggb2ZcbiAgICAvLyBvZiBlbGVtZW50cywgZS5nLiBwb2ludHMsIGxpbmVzLCByb3dzLCByZXF1aXJpbmcgYW4gYXJyYXkgYXMgaW5wdXQuXG4gICAgLy8gVGhlIHJvbGUgb2YgdGhlIGBrZXlGdW5gIGlzIHRvIGlkZW50aWZ5IHdoYXQgZWxlbWVudHMgYXJlIGJlaW5nIGVudGVyZWQvZXhpdGVkL3VwZGF0ZWQsXG4gICAgLy8gb3RoZXJ3aXNlIEQzIHJldmVydHMgdG8gdXNpbmcgYSBwbGFpbiBpbmRleCB3aGljaCB3b3VsZCBzY3JldyB1cCBgdHJhbnNpdGlvbmBzLlxuICAgIGtleUZ1bjogZnVuY3Rpb24oZCkge3JldHVybiBkLmtleTt9LFxuICAgIHJlcGVhdDogd3JhcCxcbiAgICBkZXNjZW5kOiBpZGVudGl0eSxcblxuICAgIC8vIFBsb3RseS5qcyB1c2VzIGEgY29udmVudGlvbiBvZiBzdG9yaW5nIHRoZSBhY3R1YWwgY29udGVudHMgb2YgdGhlIGBjYWxjRGF0YWAgYXMgdGhlXG4gICAgLy8gZWxlbWVudCB6ZXJvIG9mIGEgY29udGFpbmVyIGFycmF5LiBUaGVzZSBoZWxwZXJzIGFyZSBqdXN0IHVzZWQgZm9yIGNsYXJpdHkgYXMgYVxuICAgIC8vIG5ld2NvbWVyIHRvIHRoZSBjb2RlYmFzZSBtYXkgbm90IGtub3cgd2hhdCB0aGUgYFswXWAgaXMsIGFuZCB3aGV0aGVyIHRoZXJlIGNhbiBiZSBmdXJ0aGVyXG4gICAgLy8gZWxlbWVudHMgKG5vdCBhdG0pLlxuICAgIHdyYXA6IHdyYXAsXG4gICAgdW53cmFwOiBmdW5jdGlvbihkKSB7cmV0dXJuIGRbMF07fVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG52YXIgYXhlc0F0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG52YXIgZm9udEF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZm9udF9hdHRyaWJ1dGVzJyk7XG52YXIgZG9tYWluQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9kb21haW4nKS5hdHRyaWJ1dGVzO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xudmFyIHRlbXBsYXRlZEFycmF5ID0gcmVxdWlyZSgnLi4vLi4vcGxvdF9hcGkvcGxvdF90ZW1wbGF0ZScpLnRlbXBsYXRlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkb21haW46IGRvbWFpbkF0dHJzKHtuYW1lOiAncGFyY29vcmRzJywgdHJhY2U6IHRydWUsIGVkaXRUeXBlOiAncGxvdCd9KSxcblxuICAgIGxhYmVsYW5nbGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2FuZ2xlJyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGFuZ2xlIG9mIHRoZSBsYWJlbHMgd2l0aCByZXNwZWN0IHRvIHRoZSBob3Jpem9udGFsLicsXG4gICAgICAgICAgICAnRm9yIGV4YW1wbGUsIGEgYHRpY2thbmdsZWAgb2YgLTkwIGRyYXdzIHRoZSBsYWJlbHMgdmVydGljYWxseS4nLFxuICAgICAgICAgICAgJ1RpbHRlZCBsYWJlbHMgd2l0aCAqbGFiZWxhbmdsZSogbWF5IGJlIHBvc2l0aW9uZWQgYmV0dGVyJyxcbiAgICAgICAgICAgICdpbnNpZGUgbWFyZ2lucyB3aGVuIGBsYWJlbHBvc2l0aW9uYCBpcyBzZXQgdG8gKmJvdHRvbSouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBsYWJlbHNpZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIHZhbHVlczogWyd0b3AnLCAnYm90dG9tJ10sXG4gICAgICAgIGRmbHQ6ICd0b3AnLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NwZWNpZmllcyB0aGUgbG9jYXRpb24gb2YgdGhlIGBsYWJlbGAuJyxcbiAgICAgICAgICAgICcqdG9wKiBwb3NpdGlvbnMgbGFiZWxzIGFib3ZlLCBuZXh0IHRvIHRoZSB0aXRsZScsXG4gICAgICAgICAgICAnKmJvdHRvbSogcG9zaXRpb25zIGxhYmVscyBiZWxvdyB0aGUgZ3JhcGgnLFxuICAgICAgICAgICAgJ1RpbHRlZCBsYWJlbHMgd2l0aCAqbGFiZWxhbmdsZSogbWF5IGJlIHBvc2l0aW9uZWQgYmV0dGVyJyxcbiAgICAgICAgICAgICdpbnNpZGUgbWFyZ2lucyB3aGVuIGBsYWJlbHBvc2l0aW9uYCBpcyBzZXQgdG8gKmJvdHRvbSouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBsYWJlbGZvbnQ6IGZvbnRBdHRycyh7XG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZm9udCBmb3IgdGhlIGBkaW1lbnNpb25gIGxhYmVscy4nXG4gICAgfSksXG4gICAgdGlja2ZvbnQ6IGZvbnRBdHRycyh7XG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZm9udCBmb3IgdGhlIGBkaW1lbnNpb25gIHRpY2sgdmFsdWVzLidcbiAgICB9KSxcbiAgICByYW5nZWZvbnQ6IGZvbnRBdHRycyh7XG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZm9udCBmb3IgdGhlIGBkaW1lbnNpb25gIHJhbmdlIHZhbHVlcy4nXG4gICAgfSksXG5cbiAgICBkaW1lbnNpb25zOiB0ZW1wbGF0ZWRBcnJheSgnZGltZW5zaW9uJywge1xuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgc2hvd24gbmFtZSBvZiB0aGUgZGltZW5zaW9uLidcbiAgICAgICAgfSxcbiAgICAgICAgLy8gVE9ETzogYmV0dGVyIHdheSB0byBkZXRlcm1pbmUgb3JkaW5hbCB2cyBjb250aW51b3VzIGF4ZXMsXG4gICAgICAgIC8vIHNvIHVzZXJzIGNhbiB1c2UgdGlja3ZhbHMvdGlja3RleHQgd2l0aCBhIGNvbnRpbnVvdXMgYXhpcy5cbiAgICAgICAgdGlja3ZhbHM6IGV4dGVuZEZsYXQoe30sIGF4ZXNBdHRycy50aWNrdmFscywge1xuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHZhbHVlcyBhdCB3aGljaCB0aWNrcyBvbiB0aGlzIGF4aXMgYXBwZWFyLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuICAgICAgICB0aWNrdGV4dDogZXh0ZW5kRmxhdCh7fSwgYXhlc0F0dHJzLnRpY2t0ZXh0LCB7XG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdGV4dCBkaXNwbGF5ZWQgYXQgdGhlIHRpY2tzIHBvc2l0aW9uIHZpYSBgdGlja3ZhbHNgLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuICAgICAgICB0aWNrZm9ybWF0OiBleHRlbmRGbGF0KHt9LCBheGVzQXR0cnMudGlja2Zvcm1hdCwge1xuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgICAgICB9KSxcbiAgICAgICAgdmlzaWJsZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Nob3dzIHRoZSBkaW1lbnNpb24gd2hlbiBzZXQgdG8gYHRydWVgICh0aGUgZGVmYXVsdCkuIEhpZGVzIHRoZSBkaW1lbnNpb24gZm9yIGBmYWxzZWAuJ1xuICAgICAgICB9LFxuICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIGVkaXRUeXBlOiAncGxvdCd9LFxuICAgICAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgZWRpdFR5cGU6ICdwbG90J31cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnVGhlIGRvbWFpbiByYW5nZSB0aGF0IHJlcHJlc2VudHMgdGhlIGZ1bGwsIHNob3duIGF4aXMgZXh0ZW50LiBEZWZhdWx0cyB0byB0aGUgYHZhbHVlc2AgZXh0ZW50LicsXG4gICAgICAgICAgICAgICAgJ011c3QgYmUgYW4gYXJyYXkgb2YgYFtmcm9tVmFsdWUsIHRvVmFsdWVdYCB3aXRoIGZpbml0ZSBudW1iZXJzIGFzIGVsZW1lbnRzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnN0cmFpbnRyYW5nZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZnJlZUxlbmd0aDogdHJ1ZSxcbiAgICAgICAgICAgIGRpbWVuc2lvbnM6ICcxLTInLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIGVkaXRUeXBlOiAncGxvdCd9LFxuICAgICAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgZWRpdFR5cGU6ICdwbG90J31cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnVGhlIGRvbWFpbiByYW5nZSB0byB3aGljaCB0aGUgZmlsdGVyIG9uIHRoZSBkaW1lbnNpb24gaXMgY29uc3RyYWluZWQuIE11c3QgYmUgYW4gYXJyYXknLFxuICAgICAgICAgICAgICAgICdvZiBgW2Zyb21WYWx1ZSwgdG9WYWx1ZV1gIHdpdGggYGZyb21WYWx1ZSA8PSB0b1ZhbHVlYCwgb3IgaWYgYG11bHRpc2VsZWN0YCBpcyBub3QnLFxuICAgICAgICAgICAgICAgICdkaXNhYmxlZCwgeW91IG1heSBnaXZlIGFuIGFycmF5IG9mIGFycmF5cywgd2hlcmUgZWFjaCBpbm5lciBhcnJheSBpcyBgW2Zyb21WYWx1ZSwgdG9WYWx1ZV1gLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIG11bHRpc2VsZWN0OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZmx0OiB0cnVlLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRG8gd2UgYWxsb3cgbXVsdGlwbGUgc2VsZWN0aW9uIHJhbmdlcyBvciBqdXN0IGEgc2luZ2xlIHJhbmdlPydcbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGltZW5zaW9uIHZhbHVlcy4gYHZhbHVlc1tuXWAgcmVwcmVzZW50cyB0aGUgdmFsdWUgb2YgdGhlIGBuYHRoIHBvaW50IGluIHRoZSBkYXRhc2V0LCcsXG4gICAgICAgICAgICAgICAgJ3RoZXJlZm9yZSB0aGUgYHZhbHVlc2AgdmVjdG9yIGZvciBhbGwgZGltZW5zaW9ucyBtdXN0IGJlIHRoZSBzYW1lIChsb25nZXIgdmVjdG9ycycsXG4gICAgICAgICAgICAgICAgJ3dpbGwgYmUgdHJ1bmNhdGVkKS4gRWFjaCB2YWx1ZSBtdXN0IGJlIGEgZmluaXRlIG51bWJlci4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBkaW1lbnNpb25zICh2YXJpYWJsZXMpIG9mIHRoZSBwYXJhbGxlbCBjb29yZGluYXRlcyBjaGFydC4gMi4uNjAgZGltZW5zaW9ucyBhcmUgc3VwcG9ydGVkLidcbiAgICB9KSxcblxuICAgIGxpbmU6IGV4dGVuZEZsYXQoe2VkaXRUeXBlOiAnY2FsYyd9LFxuICAgICAgICBjb2xvclNjYWxlQXR0cnMoJ2xpbmUnLCB7XG4gICAgICAgICAgICAvLyB0aGUgZGVmYXVsdCBhdXRvY29sb3JzY2FsZSBpc24ndCBxdWl0ZSB1c2FibGUgZm9yIHBhcmNvb3JkcyBkdWUgdG8gY29udGV4dCBhbWJpZ3VpdHkgYXJvdW5kIDAgKGdyZXksIG9mZi13aGl0ZSlcbiAgICAgICAgICAgIC8vIGF1dG9jb2xvcnNjYWxlIHRoZXJlZm9yZSBkZWZhdWx0cyB0byBmYWxzZSB0b28sIHRvIGF2b2lkIGJlaW5nIG92ZXJyaWRkZW4gYnkgdGhlIGJsdWUtd2hpdGUtcmVkIGF1dG9jb2xvciBwYWxldHRlXG4gICAgICAgICAgICBjb2xvcnNjYWxlRGZsdDogJ1ZpcmlkaXMnLFxuICAgICAgICAgICAgYXV0b0NvbG9yRGZsdDogZmFsc2UsXG4gICAgICAgICAgICBlZGl0VHlwZU92ZXJyaWRlOiAnY2FsYydcbiAgICAgICAgfSlcbiAgICApXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIGtleUZ1biA9IHJlcXVpcmUoJy4uLy4uL2xpYi9ndXAnKS5rZXlGdW47XG52YXIgcmVwZWF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2d1cCcpLnJlcGVhdDtcbnZhciBzb3J0QXNjID0gcmVxdWlyZSgnLi4vLi4vbGliJykuc29ydGVyQXNjO1xuXG52YXIgc25hcFJhdGlvID0gYy5iYXIuc25hcFJhdGlvO1xuZnVuY3Rpb24gc25hcE92ZXJzaG9vdCh2LCB2QWRqYWNlbnQpIHsgcmV0dXJuIHYgKiAoMSAtIHNuYXBSYXRpbykgKyB2QWRqYWNlbnQgKiBzbmFwUmF0aW87IH1cblxudmFyIHNuYXBDbG9zZSA9IGMuYmFyLnNuYXBDbG9zZTtcbmZ1bmN0aW9uIGNsb3NlVG9Db3ZlcmluZyh2LCB2QWRqYWNlbnQpIHsgcmV0dXJuIHYgKiAoMSAtIHNuYXBDbG9zZSkgKyB2QWRqYWNlbnQgKiBzbmFwQ2xvc2U7IH1cblxuLy8gc25hcCBmb3IgdGhlIGxvdyBlbmQgb2YgYSByYW5nZSBvbiBhbiBvcmRpbmFsIHNjYWxlXG4vLyBvbiBhbiBvcmRpbmFsIHNjYWxlLCBhbHdheXMgc2hvdyBzb21lIG92ZXJzaG9vdCBmcm9tIHRoZSBleGFjdCB2YWx1ZSxcbi8vIHNvIGl0J3MgY2xlYXIgd2UncmUgY292ZXJpbmcgaXRcbi8vIGZpbmQgdGhlIGludGVydmFsIHdlJ3JlIGluLCBhbmQgc25hcCB0byAxLzQgdGhlIGRpc3RhbmNlIHRvIHRoZSBuZXh0XG4vLyB0aGVzZSB0d28gY291bGQgYmUgdW5pZmllZCBhdCBhIHNsaWdodCBsb3NzIG9mIHJlYWRhYmlsaXR5IC8gcGVyZlxuZnVuY3Rpb24gb3JkaW5hbFNjYWxlU25hcChpc0hpZ2gsIGEsIHYsIGV4aXN0aW5nUmFuZ2VzKSB7XG4gICAgaWYob3ZlcmxhcHBpbmdFeGlzdGluZyh2LCBleGlzdGluZ1JhbmdlcykpIHJldHVybiB2O1xuXG4gICAgdmFyIGRpciA9IGlzSGlnaCA/IC0xIDogMTtcblxuICAgIHZhciBmaXJzdCA9IDA7XG4gICAgdmFyIGxhc3QgPSBhLmxlbmd0aCAtIDE7XG4gICAgaWYoZGlyIDwgMCkge1xuICAgICAgICB2YXIgdG1wID0gZmlyc3Q7XG4gICAgICAgIGZpcnN0ID0gbGFzdDtcbiAgICAgICAgbGFzdCA9IHRtcDtcbiAgICB9XG5cbiAgICB2YXIgYUhlcmUgPSBhW2ZpcnN0XTtcbiAgICB2YXIgYVByZXYgPSBhSGVyZTtcbiAgICBmb3IodmFyIGkgPSBmaXJzdDsgZGlyICogaSA8IGRpciAqIGxhc3Q7IGkgKz0gZGlyKSB7XG4gICAgICAgIHZhciBuZXh0SSA9IGkgKyBkaXI7XG4gICAgICAgIHZhciBhTmV4dCA9IGFbbmV4dEldO1xuXG4gICAgICAgIC8vIHZlcnkgY2xvc2UgdG8gdGhlIHByZXZpb3VzIC0gc25hcCBkb3duIHRvIGl0XG4gICAgICAgIGlmKGRpciAqIHYgPCBkaXIgKiBjbG9zZVRvQ292ZXJpbmcoYUhlcmUsIGFOZXh0KSkgcmV0dXJuIHNuYXBPdmVyc2hvb3QoYUhlcmUsIGFQcmV2KTtcbiAgICAgICAgaWYoZGlyICogdiA8IGRpciAqIGFOZXh0IHx8IG5leHRJID09PSBsYXN0KSByZXR1cm4gc25hcE92ZXJzaG9vdChhTmV4dCwgYUhlcmUpO1xuXG4gICAgICAgIGFQcmV2ID0gYUhlcmU7XG4gICAgICAgIGFIZXJlID0gYU5leHQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvdmVybGFwcGluZ0V4aXN0aW5nKHYsIGV4aXN0aW5nUmFuZ2VzKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nUmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKHYgPj0gZXhpc3RpbmdSYW5nZXNbaV1bMF0gJiYgdiA8PSBleGlzdGluZ1Jhbmdlc1tpXVsxXSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYmFySG9yaXpvbnRhbFNldHVwKHNlbGVjdGlvbikge1xuICAgIHNlbGVjdGlvblxuICAgICAgICAuYXR0cigneCcsIC1jLmJhci5jYXB0dXJlV2lkdGggLyAyKVxuICAgICAgICAuYXR0cignd2lkdGgnLCBjLmJhci5jYXB0dXJlV2lkdGgpO1xufVxuXG5mdW5jdGlvbiBiYWNrZ3JvdW5kQmFySG9yaXpvbnRhbFNldHVwKHNlbGVjdGlvbikge1xuICAgIHNlbGVjdGlvblxuICAgICAgICAuYXR0cigndmlzaWJpbGl0eScsICd2aXNpYmxlJylcbiAgICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuICAgICAgICAuYXR0cignZmlsbCcsICd5ZWxsb3cnKVxuICAgICAgICAuYXR0cignb3BhY2l0eScsIDApO1xufVxuXG5mdW5jdGlvbiBzZXRIaWdobGlnaHQoZCkge1xuICAgIGlmKCFkLmJydXNoLmZpbHRlclNwZWNpZmllZCkge1xuICAgICAgICByZXR1cm4gJzAsJyArIGQuaGVpZ2h0O1xuICAgIH1cblxuICAgIHZhciBwaXhlbFJhbmdlcyA9IHVuaXRUb1B4KGQuYnJ1c2guZmlsdGVyLmdldENvbnNvbGlkYXRlZCgpLCBkLmhlaWdodCk7XG4gICAgdmFyIGRhc2hBcnJheSA9IFswXTsgLy8gd2Ugc3RhcnQgd2l0aCBhIDAgbGVuZ3RoIHNlbGVjdGlvbiBhcyBmaWx0ZXIgcmFuZ2VzIGFyZSBpbmNsdXNpdmUsIG5vdCBleGNsdXNpdmVcbiAgICB2YXIgcCwgc2VjdGlvbkhlaWdodCwgaU5leHQ7XG4gICAgdmFyIGN1cnJlbnRHYXAgPSBwaXhlbFJhbmdlcy5sZW5ndGggPyBwaXhlbFJhbmdlc1swXVswXSA6IG51bGw7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHBpeGVsUmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHAgPSBwaXhlbFJhbmdlc1tpXTtcbiAgICAgICAgc2VjdGlvbkhlaWdodCA9IHBbMV0gLSBwWzBdO1xuICAgICAgICBkYXNoQXJyYXkucHVzaChjdXJyZW50R2FwKTtcbiAgICAgICAgZGFzaEFycmF5LnB1c2goc2VjdGlvbkhlaWdodCk7XG4gICAgICAgIGlOZXh0ID0gaSArIDE7XG4gICAgICAgIGlmKGlOZXh0IDwgcGl4ZWxSYW5nZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50R2FwID0gcGl4ZWxSYW5nZXNbaU5leHRdWzBdIC0gcFsxXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkYXNoQXJyYXkucHVzaChkLmhlaWdodCk7XG4gICAgLy8gZC5oZWlnaHQgaXMgYWRkZWQgYXQgdGhlIGVuZCB0byBlbnN1cmUgdGhhdCAoMSkgd2UgaGF2ZSBhbiBldmVuIG51bWJlciBvZiBkYXNoYXJyYXkgcG9pbnRzLCBNRE4gcGFnZSBzYXlzXG4gICAgLy8gXCJJZiBhbiBvZGQgbnVtYmVyIG9mIHZhbHVlcyBpcyBwcm92aWRlZCwgdGhlbiB0aGUgbGlzdCBvZiB2YWx1ZXMgaXMgcmVwZWF0ZWQgdG8geWllbGQgYW4gZXZlbiBudW1iZXIgb2YgdmFsdWVzLlwiXG4gICAgLy8gYW5kICgyKSBpdCdzIF9hdCBsZWFzdF8gYXMgbG9uZyBhcyB0aGUgZnVsbCBoZWlnaHQgKGV2ZW4gaWYgcmFuZ2UgaXMgbWludXNjdWxlIGFuZCBhdCB0aGUgYm90dG9tKSB0aG91Z2ggdGhpc1xuICAgIC8vIG1heSBub3QgYmUgbmVjZXNzYXJ5LCBtYXliZSBkdXBsaWNhdGluZyB0aGUgbGFzdCBwb2ludCB3b3VsZCBkbyB0b28uIEJ1dCBubyBoYXJtIGluIGEgbG9uZ2VyIGRhc2hhcnJheSB0aGFuIGxpbmUuXG4gICAgcmV0dXJuIGRhc2hBcnJheTtcbn1cblxuZnVuY3Rpb24gdW5pdFRvUHgodW5pdFJhbmdlcywgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIHVuaXRSYW5nZXMubWFwKGZ1bmN0aW9uKHByKSB7XG4gICAgICAgIHJldHVybiBwci5tYXAoZnVuY3Rpb24odikgeyByZXR1cm4gTWF0aC5tYXgoMCwgdiAqIGhlaWdodCk7IH0pLnNvcnQoc29ydEFzYyk7XG4gICAgfSk7XG59XG5cbi8vIGlzIHRoZSBjdXJzb3Igb3ZlciB0aGUgbm9ydGgsIG1pZGRsZSwgb3Igc291dGggb2YgYSBiYXI/XG4vLyB0aGUgZW5kIGhhbmRsZXMgZXh0ZW5kIG92ZXIgdGhlIGxhc3QgMTAlIG9mIHRoZSBiYXJcbmZ1bmN0aW9uIGdldFJlZ2lvbihmUGl4LCB5KSB7XG4gICAgdmFyIHBhZCA9IGMuYmFyLmhhbmRsZUhlaWdodDtcbiAgICBpZih5ID4gZlBpeFsxXSArIHBhZCB8fCB5IDwgZlBpeFswXSAtIHBhZCkgcmV0dXJuO1xuICAgIGlmKHkgPj0gMC45ICogZlBpeFsxXSArIDAuMSAqIGZQaXhbMF0pIHJldHVybiAnbic7XG4gICAgaWYoeSA8PSAwLjkgKiBmUGl4WzBdICsgMC4xICogZlBpeFsxXSkgcmV0dXJuICdzJztcbiAgICByZXR1cm4gJ25zJztcbn1cblxuZnVuY3Rpb24gY2xlYXJDdXJzb3IoKSB7XG4gICAgZDMuc2VsZWN0KGRvY3VtZW50LmJvZHkpXG4gICAgICAgIC5zdHlsZSgnY3Vyc29yJywgbnVsbCk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlSGlnaGxpZ2h0KHNlbGVjdGlvbikge1xuICAgIC8vIHN0cm9rZS1kYXNoYXJyYXkgaXMgdXNlZCB0byBtaW5pbWl6ZSB0aGUgbnVtYmVyIG9mIGNyZWF0ZWQgRE9NIG5vZGVzLCBiZWNhdXNlIHRoZSByZXF1aXJlbWVudCBjYWxscyBmb3IgdXAgdG9cbiAgICAvLyAxMDAwIGluZGl2aWR1YWwgc2VsZWN0aW9ucyBvbiBhbiBheGlzLCBhbmQgdGhlcmUgY2FuIGJlIDYwIGF4ZXMgcGVyIHBhcmNvb3JkcywgYW5kIG11bHRpcGxlIHBhcmNvb3JkcyBwZXJcbiAgICAvLyBkYXNoYm9hcmQuIFRoZSB0ZWNobmlxdWUgaXMgc2ltaWxhciB0byBodHRwczovL2NvZGVwZW4uaW8vbW9uZmVyYS9wZW4vckxZcVdSIGFuZCB1c2luZyBhIGBwb2x5bGluZWAgd2l0aFxuICAgIC8vIG11bHRpcGxlIHNlY3Rpb25zLCBvciBhIGBwYXRoYCBlbGVtZW50IHZpYSBpdHMgYGRgIGF0dHJpYnV0ZSB3b3VsZCBhbHNvIGJlIERPTS1zcGFyaW5nIGFsdGVybmF0aXZlcy5cbiAgICBzZWxlY3Rpb24uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIHNldEhpZ2hsaWdodCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckhpZ2hsaWdodChyb290LCB0d2VlbkNhbGxiYWNrKSB7XG4gICAgdmFyIGJhciA9IGQzLnNlbGVjdChyb290KS5zZWxlY3RBbGwoJy5oaWdobGlnaHQsIC5oaWdobGlnaHQtc2hhZG93Jyk7XG4gICAgdmFyIGJhclRvU3R5bGUgPSB0d2VlbkNhbGxiYWNrID8gYmFyLnRyYW5zaXRpb24oKS5kdXJhdGlvbihjLmJhci5zbmFwRHVyYXRpb24pLmVhY2goJ2VuZCcsIHR3ZWVuQ2FsbGJhY2spIDogYmFyO1xuICAgIHN0eWxlSGlnaGxpZ2h0KGJhclRvU3R5bGUpO1xufVxuXG5mdW5jdGlvbiBnZXRJbnRlcnZhbChkLCB5KSB7XG4gICAgdmFyIGIgPSBkLmJydXNoO1xuICAgIHZhciBhY3RpdmUgPSBiLmZpbHRlclNwZWNpZmllZDtcbiAgICB2YXIgY2xvc2VzdEludGVydmFsID0gTmFOO1xuICAgIHZhciBvdXQgPSB7fTtcbiAgICB2YXIgaTtcblxuICAgIGlmKGFjdGl2ZSkge1xuICAgICAgICB2YXIgaGVpZ2h0ID0gZC5oZWlnaHQ7XG4gICAgICAgIHZhciBpbnRlcnZhbHMgPSBiLmZpbHRlci5nZXRDb25zb2xpZGF0ZWQoKTtcbiAgICAgICAgdmFyIHBpeEludGVydmFscyA9IHVuaXRUb1B4KGludGVydmFscywgaGVpZ2h0KTtcbiAgICAgICAgdmFyIGhvdmVyZWRJbnRlcnZhbCA9IE5hTjtcbiAgICAgICAgdmFyIHByZXZpb3VzSW50ZXJ2YWwgPSBOYU47XG4gICAgICAgIHZhciBuZXh0SW50ZXJ2YWwgPSBOYU47XG4gICAgICAgIGZvcihpID0gMDsgaSA8PSBwaXhJbnRlcnZhbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwID0gcGl4SW50ZXJ2YWxzW2ldO1xuICAgICAgICAgICAgaWYocCAmJiBwWzBdIDw9IHkgJiYgeSA8PSBwWzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gb3ZlciBhIGJhclxuICAgICAgICAgICAgICAgIGhvdmVyZWRJbnRlcnZhbCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGJldHdlZW4gYmFycywgb3IgYmVmb3JlL2FmdGVyIHRoZSBmaXJzdC9sYXN0IGJhclxuICAgICAgICAgICAgICAgIHByZXZpb3VzSW50ZXJ2YWwgPSBpID8gaSAtIDEgOiBOYU47XG4gICAgICAgICAgICAgICAgaWYocCAmJiBwWzBdID4geSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0SW50ZXJ2YWwgPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gbm8gcG9pbnQgY29udGludWluZyBhcyBpbnRlcnZhbHMgYXJlIG5vbi1vdmVybGFwcGluZyBhbmQgc29ydGVkOyBjb3VsZCB1c2UgbG9nIHNlYXJjaFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsb3Nlc3RJbnRlcnZhbCA9IGhvdmVyZWRJbnRlcnZhbDtcbiAgICAgICAgaWYoaXNOYU4oY2xvc2VzdEludGVydmFsKSkge1xuICAgICAgICAgICAgaWYoaXNOYU4ocHJldmlvdXNJbnRlcnZhbCkgfHwgaXNOYU4obmV4dEludGVydmFsKSkge1xuICAgICAgICAgICAgICAgIGNsb3Nlc3RJbnRlcnZhbCA9IGlzTmFOKHByZXZpb3VzSW50ZXJ2YWwpID8gbmV4dEludGVydmFsIDogcHJldmlvdXNJbnRlcnZhbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xvc2VzdEludGVydmFsID0gKHkgLSBwaXhJbnRlcnZhbHNbcHJldmlvdXNJbnRlcnZhbF1bMV0gPCBwaXhJbnRlcnZhbHNbbmV4dEludGVydmFsXVswXSAtIHkpID9cbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNJbnRlcnZhbCA6IG5leHRJbnRlcnZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFpc05hTihjbG9zZXN0SW50ZXJ2YWwpKSB7XG4gICAgICAgICAgICB2YXIgZlBpeCA9IHBpeEludGVydmFsc1tjbG9zZXN0SW50ZXJ2YWxdO1xuICAgICAgICAgICAgdmFyIHJlZ2lvbiA9IGdldFJlZ2lvbihmUGl4LCB5KTtcblxuICAgICAgICAgICAgaWYocmVnaW9uKSB7XG4gICAgICAgICAgICAgICAgb3V0LmludGVydmFsID0gaW50ZXJ2YWxzW2Nsb3Nlc3RJbnRlcnZhbF07XG4gICAgICAgICAgICAgICAgb3V0LmludGVydmFsUGl4ID0gZlBpeDtcbiAgICAgICAgICAgICAgICBvdXQucmVnaW9uID0gcmVnaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoZC5vcmRpbmFsICYmICFvdXQucmVnaW9uKSB7XG4gICAgICAgIHZhciBhID0gZC51bml0VGlja3ZhbHM7XG4gICAgICAgIHZhciB1bml0TG9jYXRpb24gPSBkLnVuaXRUb1BhZGRlZFB4LmludmVydCh5KTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHJhbmdlaSA9IFtcbiAgICAgICAgICAgICAgICBhW01hdGgubWF4KGkgLSAxLCAwKV0gKiAwLjI1ICsgYVtpXSAqIDAuNzUsXG4gICAgICAgICAgICAgICAgYVtNYXRoLm1pbihpICsgMSwgYS5sZW5ndGggLSAxKV0gKiAwLjI1ICsgYVtpXSAqIDAuNzVcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZih1bml0TG9jYXRpb24gPj0gcmFuZ2VpWzBdICYmIHVuaXRMb2NhdGlvbiA8PSByYW5nZWlbMV0pIHtcbiAgICAgICAgICAgICAgICBvdXQuY2xpY2thYmxlT3JkaW5hbFJhbmdlID0gcmFuZ2VpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gZHJhZ3N0YXJ0KGxUaGlzLCBkKSB7XG4gICAgZDMuZXZlbnQuc291cmNlRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdmFyIHkgPSBkLmhlaWdodCAtIGQzLm1vdXNlKGxUaGlzKVsxXSAtIDIgKiBjLnZlcnRpY2FsUGFkZGluZztcbiAgICB2YXIgdW5pdExvY2F0aW9uID0gZC51bml0VG9QYWRkZWRQeC5pbnZlcnQoeSk7XG4gICAgdmFyIGIgPSBkLmJydXNoO1xuICAgIHZhciBpbnRlcnZhbCA9IGdldEludGVydmFsKGQsIHkpO1xuICAgIHZhciB1bml0UmFuZ2UgPSBpbnRlcnZhbC5pbnRlcnZhbDtcbiAgICB2YXIgcyA9IGIuc3ZnQnJ1c2g7XG4gICAgcy53YXNEcmFnZ2VkID0gZmFsc2U7IC8vIHdlIHN0YXJ0IGFzc3VtaW5nIHRoZXJlIHdvbid0IGJlIGEgZHJhZyAtIHVzZWZ1bCBmb3IgcmVzZXRcbiAgICBzLmdyYWJiaW5nQmFyID0gaW50ZXJ2YWwucmVnaW9uID09PSAnbnMnO1xuICAgIGlmKHMuZ3JhYmJpbmdCYXIpIHtcbiAgICAgICAgdmFyIHBpeGVsUmFuZ2UgPSB1bml0UmFuZ2UubWFwKGQudW5pdFRvUGFkZGVkUHgpO1xuICAgICAgICBzLmdyYWJQb2ludCA9IHkgLSBwaXhlbFJhbmdlWzBdIC0gYy52ZXJ0aWNhbFBhZGRpbmc7XG4gICAgICAgIHMuYmFyTGVuZ3RoID0gcGl4ZWxSYW5nZVsxXSAtIHBpeGVsUmFuZ2VbMF07XG4gICAgfVxuICAgIHMuY2xpY2thYmxlT3JkaW5hbFJhbmdlID0gaW50ZXJ2YWwuY2xpY2thYmxlT3JkaW5hbFJhbmdlO1xuICAgIHMuc3RheWluZ0ludGVydmFscyA9IChkLm11bHRpc2VsZWN0ICYmIGIuZmlsdGVyU3BlY2lmaWVkKSA/IGIuZmlsdGVyLmdldENvbnNvbGlkYXRlZCgpIDogW107XG4gICAgaWYodW5pdFJhbmdlKSB7XG4gICAgICAgIHMuc3RheWluZ0ludGVydmFscyA9IHMuc3RheWluZ0ludGVydmFscy5maWx0ZXIoZnVuY3Rpb24oaW50Mikge1xuICAgICAgICAgICAgcmV0dXJuIGludDJbMF0gIT09IHVuaXRSYW5nZVswXSAmJiBpbnQyWzFdICE9PSB1bml0UmFuZ2VbMV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzLnN0YXJ0RXh0ZW50ID0gaW50ZXJ2YWwucmVnaW9uID8gdW5pdFJhbmdlW2ludGVydmFsLnJlZ2lvbiA9PT0gJ3MnID8gMSA6IDBdIDogdW5pdExvY2F0aW9uO1xuICAgIGQucGFyZW50LmluQnJ1c2hEcmFnID0gdHJ1ZTtcbiAgICBzLmJydXNoU3RhcnRDYWxsYmFjaygpO1xufVxuXG5mdW5jdGlvbiBkcmFnKGxUaGlzLCBkKSB7XG4gICAgZDMuZXZlbnQuc291cmNlRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdmFyIHkgPSBkLmhlaWdodCAtIGQzLm1vdXNlKGxUaGlzKVsxXSAtIDIgKiBjLnZlcnRpY2FsUGFkZGluZztcbiAgICB2YXIgcyA9IGQuYnJ1c2guc3ZnQnJ1c2g7XG4gICAgcy53YXNEcmFnZ2VkID0gdHJ1ZTtcbiAgICBzLl9kcmFnZ2luZyA9IHRydWU7XG5cbiAgICBpZihzLmdyYWJiaW5nQmFyKSB7IC8vIG1vdmluZyB0aGUgYmFyXG4gICAgICAgIHMubmV3RXh0ZW50ID0gW3kgLSBzLmdyYWJQb2ludCwgeSArIHMuYmFyTGVuZ3RoIC0gcy5ncmFiUG9pbnRdLm1hcChkLnVuaXRUb1BhZGRlZFB4LmludmVydCk7XG4gICAgfSBlbHNlIHsgLy8gc291dGgvbm9ydGggZHJhZyBvciBuZXcgYmFyIGNyZWF0aW9uXG4gICAgICAgIHMubmV3RXh0ZW50ID0gW3Muc3RhcnRFeHRlbnQsIGQudW5pdFRvUGFkZGVkUHguaW52ZXJ0KHkpXS5zb3J0KHNvcnRBc2MpO1xuICAgIH1cblxuICAgIGQuYnJ1c2guZmlsdGVyU3BlY2lmaWVkID0gdHJ1ZTtcbiAgICBzLmV4dGVudCA9IHMuc3RheWluZ0ludGVydmFscy5jb25jYXQoW3MubmV3RXh0ZW50XSk7XG4gICAgcy5icnVzaENhbGxiYWNrKGQpO1xuICAgIHJlbmRlckhpZ2hsaWdodChsVGhpcy5wYXJlbnROb2RlKTtcbn1cblxuZnVuY3Rpb24gZHJhZ2VuZChsVGhpcywgZCkge1xuICAgIHZhciBicnVzaCA9IGQuYnJ1c2g7XG4gICAgdmFyIGZpbHRlciA9IGJydXNoLmZpbHRlcjtcbiAgICB2YXIgcyA9IGJydXNoLnN2Z0JydXNoO1xuXG4gICAgaWYoIXMuX2RyYWdnaW5nKSB7IC8vIGkuZS4gY2xpY2tcbiAgICAgICAgLy8gbW9jayB6ZXJvIGRyYWdcbiAgICAgICAgbW91c2Vtb3ZlKGxUaGlzLCBkKTtcbiAgICAgICAgZHJhZyhsVGhpcywgZCk7XG4gICAgICAgIC8vIHJlbWVtYmVyIGl0IGlzIGEgY2xpY2sgbm90IGEgZHJhZ1xuICAgICAgICBkLmJydXNoLnN2Z0JydXNoLndhc0RyYWdnZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgcy5fZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIHZhciBlID0gZDMuZXZlbnQ7XG4gICAgZS5zb3VyY2VFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB2YXIgZ3JhYmJpbmdCYXIgPSBzLmdyYWJiaW5nQmFyO1xuICAgIHMuZ3JhYmJpbmdCYXIgPSBmYWxzZTtcbiAgICBzLmdyYWJMb2NhdGlvbiA9IHVuZGVmaW5lZDtcbiAgICBkLnBhcmVudC5pbkJydXNoRHJhZyA9IGZhbHNlO1xuICAgIGNsZWFyQ3Vyc29yKCk7IC8vIGluc3RlYWQgb2YgY2xlYXJpbmcsIGEgbmljZXIgdGhpbmcgd291bGQgYmUgdG8gc2V0IGl0IGFjY29yZGluZyB0byBjdXJyZW50IGxvY2F0aW9uXG4gICAgaWYoIXMud2FzRHJhZ2dlZCkgeyAvLyBhIGNsaWNrK3JlbGVhc2Ugb24gdGhlIHNhbWUgc3BvdCAoaWUuIHcvbyBkcmFnZ2luZykgbWVhbnMgYSBiYXIgb3IgZnVsbCByZXNldFxuICAgICAgICBzLndhc0RyYWdnZWQgPSB1bmRlZmluZWQ7IC8vIGxvZ2ljLXdpc2UgdW5uZWVkZWQsIGp1c3Qgc2hvd3MgYHdhc0RyYWdnZWRgIGhhcyBubyBsb25nZXIgYSBtZWFuaW5nXG4gICAgICAgIGlmKHMuY2xpY2thYmxlT3JkaW5hbFJhbmdlKSB7XG4gICAgICAgICAgICBpZihicnVzaC5maWx0ZXJTcGVjaWZpZWQgJiYgZC5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgICAgIHMuZXh0ZW50LnB1c2gocy5jbGlja2FibGVPcmRpbmFsUmFuZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzLmV4dGVudCA9IFtzLmNsaWNrYWJsZU9yZGluYWxSYW5nZV07XG4gICAgICAgICAgICAgICAgYnJ1c2guZmlsdGVyU3BlY2lmaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKGdyYWJiaW5nQmFyKSB7XG4gICAgICAgICAgICBzLmV4dGVudCA9IHMuc3RheWluZ0ludGVydmFscztcbiAgICAgICAgICAgIGlmKHMuZXh0ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJydXNoQ2xlYXIoYnJ1c2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJ1c2hDbGVhcihicnVzaCk7XG4gICAgICAgIH1cbiAgICAgICAgcy5icnVzaENhbGxiYWNrKGQpO1xuICAgICAgICByZW5kZXJIaWdobGlnaHQobFRoaXMucGFyZW50Tm9kZSk7XG4gICAgICAgIHMuYnJ1c2hFbmRDYWxsYmFjayhicnVzaC5maWx0ZXJTcGVjaWZpZWQgPyBmaWx0ZXIuZ2V0Q29uc29saWRhdGVkKCkgOiBbXSk7XG4gICAgICAgIHJldHVybjsgLy8gbm8gbmVlZCB0byBmdXNlIGludGVydmFscyBvciBzbmFwIHRvIG9yZGluYWxzLCBzbyB3ZSBjYW4gYmFpbCBlYXJseVxuICAgIH1cblxuICAgIHZhciBtZXJnZUludGVydmFscyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBLZXkgcGllY2Ugb2YgbG9naWM6IG9uY2UgdGhlIGJ1dHRvbiBpcyByZWxlYXNlZCwgcG9zc2libHkgb3ZlcmxhcHBpbmcgaW50ZXJ2YWxzIHdpbGwgYmUgZnVzZWQ6XG4gICAgICAgIC8vIEhlcmUgaXQncyBkb25lIGltbWVkaWF0ZWx5IG9uIGNsaWNrIHJlbGVhc2Ugd2hpbGUgb24gb3JkaW5hbCBzbmFwIHRyYW5zaXRpb24gaXQncyBkb25lIGF0IHRoZSBlbmRcbiAgICAgICAgZmlsdGVyLnNldChmaWx0ZXIuZ2V0Q29uc29saWRhdGVkKCkpO1xuICAgIH07XG5cbiAgICBpZihkLm9yZGluYWwpIHtcbiAgICAgICAgdmFyIGEgPSBkLnVuaXRUaWNrdmFscztcbiAgICAgICAgaWYoYVthLmxlbmd0aCAtIDFdIDwgYVswXSkgYS5yZXZlcnNlKCk7XG4gICAgICAgIHMubmV3RXh0ZW50ID0gW1xuICAgICAgICAgICAgb3JkaW5hbFNjYWxlU25hcCgwLCBhLCBzLm5ld0V4dGVudFswXSwgcy5zdGF5aW5nSW50ZXJ2YWxzKSxcbiAgICAgICAgICAgIG9yZGluYWxTY2FsZVNuYXAoMSwgYSwgcy5uZXdFeHRlbnRbMV0sIHMuc3RheWluZ0ludGVydmFscylcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGhhc05ld0V4dGVudCA9IHMubmV3RXh0ZW50WzFdID4gcy5uZXdFeHRlbnRbMF07XG4gICAgICAgIHMuZXh0ZW50ID0gcy5zdGF5aW5nSW50ZXJ2YWxzLmNvbmNhdChoYXNOZXdFeHRlbnQgPyBbcy5uZXdFeHRlbnRdIDogW10pO1xuICAgICAgICBpZighcy5leHRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBicnVzaENsZWFyKGJydXNoKTtcbiAgICAgICAgfVxuICAgICAgICBzLmJydXNoQ2FsbGJhY2soZCk7XG4gICAgICAgIGlmKGhhc05ld0V4dGVudCkge1xuICAgICAgICAgICAgLy8gbWVyZ2luZyBpbnRlcnZhbHMgcG9zdCB0aGUgc25hcCB0d2VlblxuICAgICAgICAgICAgcmVuZGVySGlnaGxpZ2h0KGxUaGlzLnBhcmVudE5vZGUsIG1lcmdlSW50ZXJ2YWxzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIG5ldyBpbnRlcnZhbCwgZG9uJ3QgYW5pbWF0ZSwganVzdCByZWRyYXcgdGhlIGhpZ2hsaWdodCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgbWVyZ2VJbnRlcnZhbHMoKTtcbiAgICAgICAgICAgIHJlbmRlckhpZ2hsaWdodChsVGhpcy5wYXJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG1lcmdlSW50ZXJ2YWxzKCk7IC8vIG1lcmdpbmcgaW50ZXJ2YWxzIGltbWVkaWF0ZWx5XG4gICAgfVxuICAgIHMuYnJ1c2hFbmRDYWxsYmFjayhicnVzaC5maWx0ZXJTcGVjaWZpZWQgPyBmaWx0ZXIuZ2V0Q29uc29saWRhdGVkKCkgOiBbXSk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlbW92ZShsVGhpcywgZCkge1xuICAgIHZhciB5ID0gZC5oZWlnaHQgLSBkMy5tb3VzZShsVGhpcylbMV0gLSAyICogYy52ZXJ0aWNhbFBhZGRpbmc7XG4gICAgdmFyIGludGVydmFsID0gZ2V0SW50ZXJ2YWwoZCwgeSk7XG5cbiAgICB2YXIgY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgaWYoaW50ZXJ2YWwuY2xpY2thYmxlT3JkaW5hbFJhbmdlKSBjdXJzb3IgPSAncG9pbnRlcic7XG4gICAgZWxzZSBpZihpbnRlcnZhbC5yZWdpb24pIGN1cnNvciA9IGludGVydmFsLnJlZ2lvbiArICctcmVzaXplJztcbiAgICBkMy5zZWxlY3QoZG9jdW1lbnQuYm9keSlcbiAgICAgICAgLnN0eWxlKCdjdXJzb3InLCBjdXJzb3IpO1xufVxuXG5mdW5jdGlvbiBhdHRhY2hEcmFnQmVoYXZpb3Ioc2VsZWN0aW9uKSB7XG4gICAgLy8gVGhlcmUncyBzb21lIGZpZGRsaW5nIHdpdGggcG9pbnRlciBjdXJzb3Igc3R5bGluZyBzbyB0aGF0IHRoZSBjdXJzb3IgcHJlc2VydmVzIGl0cyBzaGFwZSB3aGlsZSBkcmFnZ2luZyBhIGJydXNoXG4gICAgLy8gZXZlbiBpZiB0aGUgY3Vyc29yIHN0cmF5cyBmcm9tIHRoZSBpbnRlcmFjdGluZyBiYXIsIHdoaWNoIGlzIGJvdW5kIHRvIGhhcHBlbiBhcyBiYXJzIGFyZSB0aGluIGFuZCB0aGUgdXNlclxuICAgIC8vIHdpbGwgaW5ldml0YWJseSBsZWF2ZSB0aGUgaG90c3BvdCBzdHJpcC4gSW4gdGhpcyByZWdhcmQsIGl0IGRvZXMgc29tZXRoaW5nIHNpbWlsYXIgdG8gd2hhdCB0aGUgRDMgYnJ1c2ggd291bGQgZG8uXG4gICAgc2VsZWN0aW9uXG4gICAgICAgIC5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmKCFkLnBhcmVudC5pbkJydXNoRHJhZykgbW91c2Vtb3ZlKHRoaXMsIGQpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBpZighZC5wYXJlbnQuaW5CcnVzaERyYWcpIGNsZWFyQ3Vyc29yKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYWxsKGQzLmJlaGF2aW9yLmRyYWcoKVxuICAgICAgICAgICAgLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihkKSB7IGRyYWdzdGFydCh0aGlzLCBkKTsgfSlcbiAgICAgICAgICAgIC5vbignZHJhZycsIGZ1bmN0aW9uKGQpIHsgZHJhZyh0aGlzLCBkKTsgfSlcbiAgICAgICAgICAgIC5vbignZHJhZ2VuZCcsIGZ1bmN0aW9uKGQpIHsgZHJhZ2VuZCh0aGlzLCBkKTsgfSlcbiAgICAgICAgKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRBc2MoYSwgYikgeyByZXR1cm4gYVswXSAtIGJbMF07IH1cblxuZnVuY3Rpb24gcmVuZGVyQXhpc0JydXNoKGF4aXNCcnVzaCkge1xuICAgIHZhciBiYWNrZ3JvdW5kID0gYXhpc0JydXNoLnNlbGVjdEFsbCgnLmJhY2tncm91bmQnKS5kYXRhKHJlcGVhdCk7XG5cbiAgICBiYWNrZ3JvdW5kLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5jbGFzc2VkKCdiYWNrZ3JvdW5kJywgdHJ1ZSlcbiAgICAgICAgLmNhbGwoYmFySG9yaXpvbnRhbFNldHVwKVxuICAgICAgICAuY2FsbChiYWNrZ3JvdW5kQmFySG9yaXpvbnRhbFNldHVwKVxuICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKSAvLyBwYXJlbnQgcG9pbnRlciBldmVudHMgYXJlIGRpc2FibGVkOyB3ZSBtdXN0IGhhdmUgaXQgdG8gcmVnaXN0ZXIgZXZlbnRzXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAgJyArIGMudmVydGljYWxQYWRkaW5nICsgJyknKTtcblxuICAgIGJhY2tncm91bmRcbiAgICAgICAgLmNhbGwoYXR0YWNoRHJhZ0JlaGF2aW9yKVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuaGVpZ2h0IC0gYy52ZXJ0aWNhbFBhZGRpbmc7XG4gICAgICAgIH0pO1xuXG4gICAgdmFyIGhpZ2hsaWdodFNoYWRvdyA9IGF4aXNCcnVzaC5zZWxlY3RBbGwoJy5oaWdobGlnaHQtc2hhZG93JykuZGF0YShyZXBlYXQpOyAvLyB3ZSBoYXZlIGEgc2V0IGhlcmUsIGNhbid0IGNhbGwgaXQgYGV4dGVudGBcblxuICAgIGhpZ2hsaWdodFNoYWRvdy5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAuY2xhc3NlZCgnaGlnaGxpZ2h0LXNoYWRvdycsIHRydWUpXG4gICAgICAgIC5hdHRyKCd4JywgLWMuYmFyLndpZHRoIC8gMilcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGMuYmFyLndpZHRoICsgYy5iYXIuc3Ryb2tlV2lkdGgpXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBjLmJhci5zdHJva2VDb2xvcilcbiAgICAgICAgLmF0dHIoJ29wYWNpdHknLCBjLmJhci5zdHJva2VPcGFjaXR5KVxuICAgICAgICAuYXR0cignc3Ryb2tlLWxpbmVjYXAnLCAnYnV0dCcpO1xuXG4gICAgaGlnaGxpZ2h0U2hhZG93XG4gICAgICAgIC5hdHRyKCd5MScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuaGVpZ2h0OyB9KVxuICAgICAgICAuY2FsbChzdHlsZUhpZ2hsaWdodCk7XG5cbiAgICB2YXIgaGlnaGxpZ2h0ID0gYXhpc0JydXNoLnNlbGVjdEFsbCgnLmhpZ2hsaWdodCcpLmRhdGEocmVwZWF0KTsgLy8gd2UgaGF2ZSBhIHNldCBoZXJlLCBjYW4ndCBjYWxsIGl0IGBleHRlbnRgXG5cbiAgICBoaWdobGlnaHQuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgLmNsYXNzZWQoJ2hpZ2hsaWdodCcsIHRydWUpXG4gICAgICAgIC5hdHRyKCd4JywgLWMuYmFyLndpZHRoIC8gMilcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGMuYmFyLndpZHRoIC0gYy5iYXIuc3Ryb2tlV2lkdGgpXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBjLmJhci5maWxsQ29sb3IpXG4gICAgICAgIC5hdHRyKCdvcGFjaXR5JywgYy5iYXIuZmlsbE9wYWNpdHkpXG4gICAgICAgIC5hdHRyKCdzdHJva2UtbGluZWNhcCcsICdidXR0Jyk7XG5cbiAgICBoaWdobGlnaHRcbiAgICAgICAgLmF0dHIoJ3kxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5oZWlnaHQ7IH0pXG4gICAgICAgIC5jYWxsKHN0eWxlSGlnaGxpZ2h0KTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlQXhpc0JydXNoKGF4aXNPdmVybGF5cykge1xuICAgIHZhciBheGlzQnJ1c2ggPSBheGlzT3ZlcmxheXMuc2VsZWN0QWxsKCcuJyArIGMuY24uYXhpc0JydXNoKVxuICAgICAgICAuZGF0YShyZXBlYXQsIGtleUZ1bik7XG5cbiAgICBheGlzQnJ1c2guZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5heGlzQnJ1c2gsIHRydWUpO1xuXG4gICAgcmVuZGVyQXhpc0JydXNoKGF4aXNCcnVzaCk7XG59XG5cbmZ1bmN0aW9uIGdldEJydXNoRXh0ZW50KGJydXNoKSB7XG4gICAgcmV0dXJuIGJydXNoLnN2Z0JydXNoLmV4dGVudC5tYXAoZnVuY3Rpb24oZSkge3JldHVybiBlLnNsaWNlKCk7fSk7XG59XG5cbmZ1bmN0aW9uIGJydXNoQ2xlYXIoYnJ1c2gpIHtcbiAgICBicnVzaC5maWx0ZXJTcGVjaWZpZWQgPSBmYWxzZTtcbiAgICBicnVzaC5zdmdCcnVzaC5leHRlbnQgPSBbWy1JbmZpbml0eSwgSW5maW5pdHldXTtcbn1cblxuZnVuY3Rpb24gYXhpc0JydXNoTW92ZWQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYXhpc0JydXNoTW92ZWQoZGltZW5zaW9uKSB7XG4gICAgICAgIHZhciBicnVzaCA9IGRpbWVuc2lvbi5icnVzaDtcbiAgICAgICAgdmFyIGV4dGVudCA9IGdldEJydXNoRXh0ZW50KGJydXNoKTtcbiAgICAgICAgdmFyIG5ld0V4dGVudCA9IGV4dGVudC5zbGljZSgpO1xuICAgICAgICBicnVzaC5maWx0ZXIuc2V0KG5ld0V4dGVudCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZGVkdXBlUmVhbFJhbmdlcyhpbnRlcnZhbHMpIHtcbiAgICAvLyBGdXNlcyBlbGVtZW50cyBvZiBpbnRlcnZhbHMgaWYgdGhleSBvdmVybGFwLCB5aWVsZGluZyBkaXNjb250aWd1b3VzIGludGVydmFscywgcmVzdWx0cy5sZW5ndGggPD0gaW50ZXJ2YWxzLmxlbmd0aFxuICAgIC8vIEN1cnJlbnRseSB1c2VzIGNsb3NlZCBpbnRlcnZhbHMsIGllLiBkZWR1cGVSZWFsUmFuZ2VzKFtbNDAwLCA4MDBdLCBbMzAwLCA0MDBdXSkgLT4gWzMwMCwgODAwXVxuICAgIHZhciBxdWV1ZSA9IGludGVydmFscy5zbGljZSgpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgY3VycmVudEludGVydmFsO1xuICAgIHZhciBjdXJyZW50ID0gcXVldWUuc2hpZnQoKTtcbiAgICB3aGlsZShjdXJyZW50KSB7IC8vIFtdLnNoaWZ0ID09PSB1bmRlZmluZWQsIHNvIHdlIGRvbid0IGRlc2NlbmQgaW50byBhbiBlbXB0eSBhcnJheVxuICAgICAgICBjdXJyZW50SW50ZXJ2YWwgPSBjdXJyZW50LnNsaWNlKCk7XG4gICAgICAgIHdoaWxlKChjdXJyZW50ID0gcXVldWUuc2hpZnQoKSkgJiYgY3VycmVudFswXSA8PSAvKiByaWdodC1vcGVuIGludGVydmFsIHdvdWxkIG5lZWQgYDxgICovIGN1cnJlbnRJbnRlcnZhbFsxXSkge1xuICAgICAgICAgICAgY3VycmVudEludGVydmFsWzFdID0gTWF0aC5tYXgoY3VycmVudEludGVydmFsWzFdLCBjdXJyZW50WzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChjdXJyZW50SW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGlmKFxuICAgICAgICByZXN1bHQubGVuZ3RoID09PSAxICYmXG4gICAgICAgIHJlc3VsdFswXVswXSA+IHJlc3VsdFswXVsxXVxuICAgICkge1xuICAgICAgICAvLyBkaXNjYXJkIHJlc3VsdFxuICAgICAgICByZXN1bHQgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtYWtlRmlsdGVyKCkge1xuICAgIHZhciBmaWx0ZXIgPSBbXTtcbiAgICB2YXIgY29uc29saWRhdGVkO1xuICAgIHZhciBib3VuZHM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbihhKSB7XG4gICAgICAgICAgICBmaWx0ZXIgPSBhXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLnNsaWNlKCkuc29ydChzb3J0QXNjKTsgfSlcbiAgICAgICAgICAgICAgICAuc29ydChzdGFydEFzYyk7XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSB1bnNlbGVjdGVkIGNhc2VcbiAgICAgICAgICAgIGlmKGZpbHRlci5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICAgICAgICBmaWx0ZXJbMF1bMF0gPT09IC1JbmZpbml0eSAmJlxuICAgICAgICAgICAgICAgIGZpbHRlclswXVsxXSA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBbWzAsIC0xXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGlkYXRlZCA9IGRlZHVwZVJlYWxSYW5nZXMoZmlsdGVyKTtcbiAgICAgICAgICAgIGJvdW5kcyA9IGZpbHRlci5yZWR1Y2UoZnVuY3Rpb24ocCwgbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbTWF0aC5taW4ocFswXSwgblswXSksIE1hdGgubWF4KHBbMV0sIG5bMV0pXTtcbiAgICAgICAgICAgIH0sIFtJbmZpbml0eSwgLUluZmluaXR5XSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBmaWx0ZXIuc2xpY2UoKTsgfSxcbiAgICAgICAgZ2V0Q29uc29saWRhdGVkOiBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnNvbGlkYXRlZDsgfSxcbiAgICAgICAgZ2V0Qm91bmRzOiBmdW5jdGlvbigpIHsgcmV0dXJuIGJvdW5kczsgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VCcnVzaChzdGF0ZSwgcmFuZ2VTcGVjaWZpZWQsIGluaXRpYWxSYW5nZSwgYnJ1c2hTdGFydENhbGxiYWNrLCBicnVzaENhbGxiYWNrLCBicnVzaEVuZENhbGxiYWNrKSB7XG4gICAgdmFyIGZpbHRlciA9IG1ha2VGaWx0ZXIoKTtcbiAgICBmaWx0ZXIuc2V0KGluaXRpYWxSYW5nZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIGZpbHRlclNwZWNpZmllZDogcmFuZ2VTcGVjaWZpZWQsIC8vIHRoZXJlJ3MgYSBkaWZmZXJlbmNlIGJldHdlZW4gbm90IGZpbHRlcmluZyBhbmQgZmlsdGVyaW5nIGEgbm9uLXByb3BlciBzdWJzZXRcbiAgICAgICAgc3ZnQnJ1c2g6IHtcbiAgICAgICAgICAgIGV4dGVudDogW10sIC8vIHRoaXMgaXMgd2hlcmUgdGhlIHN2Z0JydXNoIHdyaXRlcyBjb250ZW50cyBpbnRvXG4gICAgICAgICAgICBicnVzaFN0YXJ0Q2FsbGJhY2s6IGJydXNoU3RhcnRDYWxsYmFjayxcbiAgICAgICAgICAgIGJydXNoQ2FsbGJhY2s6IGF4aXNCcnVzaE1vdmVkKGJydXNoQ2FsbGJhY2spLFxuICAgICAgICAgICAgYnJ1c2hFbmRDYWxsYmFjazogYnJ1c2hFbmRDYWxsYmFja1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gZm9yIHVzZSBieSBzdXBwbHlEZWZhdWx0cywgYnV0IGl0IG5lZWRlZCB0b25zIG9mIHBpZWNlcyBmcm9tIGhlcmUgc29cbi8vIHNlZW1lZCB0byBtYWtlIG1vcmUgc2Vuc2UganVzdCB0byBwdXQgdGhlIHdob2xlIHJvdXRpbmUgaGVyZVxuZnVuY3Rpb24gY2xlYW5SYW5nZXMocmFuZ2VzLCBkaW1lbnNpb24pIHtcbiAgICBpZihBcnJheS5pc0FycmF5KHJhbmdlc1swXSkpIHtcbiAgICAgICAgcmFuZ2VzID0gcmFuZ2VzLm1hcChmdW5jdGlvbihyaSkgeyByZXR1cm4gcmkuc29ydChzb3J0QXNjKTsgfSk7XG5cbiAgICAgICAgaWYoIWRpbWVuc2lvbi5tdWx0aXNlbGVjdCkgcmFuZ2VzID0gW3Jhbmdlc1swXV07XG4gICAgICAgIGVsc2UgcmFuZ2VzID0gZGVkdXBlUmVhbFJhbmdlcyhyYW5nZXMuc29ydChzdGFydEFzYykpO1xuICAgIH0gZWxzZSByYW5nZXMgPSBbcmFuZ2VzLnNvcnQoc29ydEFzYyldO1xuXG4gICAgLy8gb3JkaW5hbCBzbmFwcGluZ1xuICAgIGlmKGRpbWVuc2lvbi50aWNrdmFscykge1xuICAgICAgICB2YXIgc29ydGVkVGlja1ZhbHMgPSBkaW1lbnNpb24udGlja3ZhbHMuc2xpY2UoKS5zb3J0KHNvcnRBc2MpO1xuICAgICAgICByYW5nZXMgPSByYW5nZXMubWFwKGZ1bmN0aW9uKHJpKSB7XG4gICAgICAgICAgICB2YXIgclNuYXBwZWQgPSBbXG4gICAgICAgICAgICAgICAgb3JkaW5hbFNjYWxlU25hcCgwLCBzb3J0ZWRUaWNrVmFscywgcmlbMF0sIFtdKSxcbiAgICAgICAgICAgICAgICBvcmRpbmFsU2NhbGVTbmFwKDEsIHNvcnRlZFRpY2tWYWxzLCByaVsxXSwgW10pXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYoclNuYXBwZWRbMV0gPiByU25hcHBlZFswXSkgcmV0dXJuIHJTbmFwcGVkO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKHJpKSB7IHJldHVybiByaTsgfSk7XG5cbiAgICAgICAgaWYoIXJhbmdlcy5sZW5ndGgpIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHJhbmdlcy5sZW5ndGggPiAxID8gcmFuZ2VzIDogcmFuZ2VzWzBdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtYWtlQnJ1c2g6IG1ha2VCcnVzaCxcbiAgICBlbnN1cmVBeGlzQnJ1c2g6IGVuc3VyZUF4aXNCcnVzaCxcbiAgICBjbGVhblJhbmdlczogY2xlYW5SYW5nZXNcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgZ2V0TW9kdWxlQ2FsY0RhdGEgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9nZXRfZGF0YScpLmdldE1vZHVsZUNhbGNEYXRhO1xudmFyIHBhcmNvb3Jkc1Bsb3QgPSByZXF1aXJlKCcuL3Bsb3QnKTtcbnZhciB4bWxuc05hbWVzcGFjZXMgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMveG1sbnNfbmFtZXNwYWNlcycpO1xuXG5leHBvcnRzLm5hbWUgPSAncGFyY29vcmRzJztcblxuZXhwb3J0cy5wbG90ID0gZnVuY3Rpb24oZ2QpIHtcbiAgICB2YXIgY2FsY0RhdGEgPSBnZXRNb2R1bGVDYWxjRGF0YShnZC5jYWxjZGF0YSwgJ3BhcmNvb3JkcycpWzBdO1xuICAgIGlmKGNhbGNEYXRhLmxlbmd0aCkgcGFyY29vcmRzUGxvdChnZCwgY2FsY0RhdGEpO1xufTtcblxuZXhwb3J0cy5jbGVhbiA9IGZ1bmN0aW9uKG5ld0Z1bGxEYXRhLCBuZXdGdWxsTGF5b3V0LCBvbGRGdWxsRGF0YSwgb2xkRnVsbExheW91dCkge1xuICAgIHZhciBoYWRQYXJjb29yZHMgPSAob2xkRnVsbExheW91dC5faGFzICYmIG9sZEZ1bGxMYXlvdXQuX2hhcygncGFyY29vcmRzJykpO1xuICAgIHZhciBoYXNQYXJjb29yZHMgPSAobmV3RnVsbExheW91dC5faGFzICYmIG5ld0Z1bGxMYXlvdXQuX2hhcygncGFyY29vcmRzJykpO1xuXG4gICAgaWYoaGFkUGFyY29vcmRzICYmICFoYXNQYXJjb29yZHMpIHtcbiAgICAgICAgb2xkRnVsbExheW91dC5fcGFwZXJkaXYuc2VsZWN0QWxsKCcucGFyY29vcmRzJykucmVtb3ZlKCk7XG4gICAgICAgIG9sZEZ1bGxMYXlvdXQuX2dsaW1hZ2VzLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuICAgIH1cbn07XG5cbmV4cG9ydHMudG9TVkcgPSBmdW5jdGlvbihnZCkge1xuICAgIHZhciBpbWFnZVJvb3QgPSBnZC5fZnVsbExheW91dC5fZ2xpbWFnZXM7XG4gICAgdmFyIHJvb3QgPSBkMy5zZWxlY3QoZ2QpLnNlbGVjdEFsbCgnLnN2Zy1jb250YWluZXInKTtcbiAgICB2YXIgY2FudmFzZXMgPSByb290LmZpbHRlcihmdW5jdGlvbihkLCBpKSB7cmV0dXJuIGkgPT09IHJvb3Quc2l6ZSgpIC0gMTt9KVxuICAgICAgICAuc2VsZWN0QWxsKCcuZ2wtY2FudmFzLWNvbnRleHQsIC5nbC1jYW52YXMtZm9jdXMnKTtcblxuICAgIGZ1bmN0aW9uIGNhbnZhc1RvSW1hZ2UoKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSB0aGlzO1xuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgICAgIHZhciBpbWFnZSA9IGltYWdlUm9vdC5hcHBlbmQoJ3N2ZzppbWFnZScpO1xuXG4gICAgICAgIGltYWdlLmF0dHIoe1xuICAgICAgICAgICAgeG1sbnM6IHhtbG5zTmFtZXNwYWNlcy5zdmcsXG4gICAgICAgICAgICAneGxpbms6aHJlZic6IGltYWdlRGF0YSxcbiAgICAgICAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW86ICdub25lJyxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgd2lkdGg6IGNhbnZhcy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogY2FudmFzLmhlaWdodFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW52YXNlcy5lYWNoKGNhbnZhc1RvSW1hZ2UpO1xuXG4gICAgLy8gQ2hyb21lIC8gU2FmYXJpIGJ1ZyB3b3JrYXJvdW5kIC0gYnJvd3NlciBhcHBhcmVudGx5IGxvc2VzIGNvbm5lY3Rpb24gdG8gdGhlIGRlZmluZWQgcGF0dGVyblxuICAgIC8vIFdpdGhvdXQgdGhlIHdvcmthcm91bmQsIHRoZXNlIGJyb3dzZXJzICdsb3NlJyB0aGUgZmlsdGVyIGJydXNoIHN0eWxpbmcgKGNvbG9yIGV0Yy4pIGFmdGVyIGEgc25hcHNob3RcbiAgICAvLyBvbiBhIHN1YnNlcXVlbnQgaW50ZXJhY3Rpb24uXG4gICAgLy8gRmlyZWZveCB3b3JrcyBmaW5lIHdpdGhvdXQgdGhpcyB3b3JrYXJvdW5kXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGQzLnNlbGVjdEFsbCgnI2ZpbHRlckJhclBhdHRlcm4nKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2ZpbHRlckJhclBhdHRlcm4nKTtcbiAgICB9LCA2MCk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheU9yVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmlzQXJyYXlPclR5cGVkQXJyYXk7XG52YXIgQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpO1xudmFyIHdyYXAgPSByZXF1aXJlKCcuLi8uLi9saWIvZ3VwJykud3JhcDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBsaW5lQ29sb3I7XG4gICAgdmFyIGNzY2FsZTtcblxuICAgIGlmKENvbG9yc2NhbGUuaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ2xpbmUnKSAmJiBpc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlLmxpbmUuY29sb3IpKSB7XG4gICAgICAgIGxpbmVDb2xvciA9IHRyYWNlLmxpbmUuY29sb3I7XG4gICAgICAgIGNzY2FsZSA9IENvbG9yc2NhbGUuZXh0cmFjdE9wdHModHJhY2UubGluZSkuY29sb3JzY2FsZTtcblxuICAgICAgICBDb2xvcnNjYWxlLmNhbGMoZ2QsIHRyYWNlLCB7XG4gICAgICAgICAgICB2YWxzOiBsaW5lQ29sb3IsXG4gICAgICAgICAgICBjb250YWluZXJTdHI6ICdsaW5lJyxcbiAgICAgICAgICAgIGNMZXR0ZXI6ICdjJ1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsaW5lQ29sb3IgPSBjb25zdEhhbGYodHJhY2UuX2xlbmd0aCk7XG4gICAgICAgIGNzY2FsZSA9IFtbMCwgdHJhY2UubGluZS5jb2xvcl0sIFsxLCB0cmFjZS5saW5lLmNvbG9yXV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXAoe2xpbmVDb2xvcjogbGluZUNvbG9yLCBjc2NhbGU6IGNzY2FsZX0pO1xufTtcblxuZnVuY3Rpb24gY29uc3RIYWxmKGxlbikge1xuICAgIHZhciBvdXQgPSBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgb3V0W2ldID0gMC41O1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1heERpbWVuc2lvbkNvdW50OiA2MCwgLy8gdGhpcyBjYW5ub3QgYmUgaW5jcmVhc2VkIHdpdGhvdXQgV2ViR0wgY29kZSByZWZhY3RvcmluZ1xuICAgIG92ZXJkcmFnOiA0NSxcbiAgICB2ZXJ0aWNhbFBhZGRpbmc6IDIsIC8vIG90aGVyd2lzZSwgaG9yaXpvbnRhbCBsaW5lcyBvbiB0b3Agb3IgYm90dG9tIGFyZSBvZiBsb3dlciB3aWR0aFxuICAgIHRpY2tEaXN0YW5jZTogNTAsXG4gICAgY2FudmFzUGl4ZWxSYXRpbzogMSxcbiAgICBibG9ja0xpbmVDb3VudDogNTAwMCxcbiAgICBsYXllcnM6IFsnY29udGV4dExpbmVMYXllcicsICdmb2N1c0xpbmVMYXllcicsICdwaWNrTGluZUxheWVyJ10sXG4gICAgYXhpc1RpdGxlT2Zmc2V0OiAyOCxcbiAgICBheGlzRXh0ZW50T2Zmc2V0OiAxMCxcbiAgICBkZXNlbGVjdGVkTGluZUNvbG9yOiAnIzc3NycsXG4gICAgYmFyOiB7XG4gICAgICAgIHdpZHRoOiA0LCAvLyBWaXNpYmxlIHdpZHRoIG9mIHRoZSBmaWx0ZXIgYmFyXG4gICAgICAgIGNhcHR1cmVXaWR0aDogMTAsIC8vIE1vdXNlLXNlbnNpdGl2ZSB3aWR0aCBmb3IgaW50ZXJhY3Rpb24gKEZpdHRzIGxhdylcbiAgICAgICAgZmlsbENvbG9yOiAnbWFnZW50YScsIC8vIENvbG9yIG9mIHRoZSBmaWx0ZXIgYmFyIGZpbGxcbiAgICAgICAgZmlsbE9wYWNpdHk6IDEsIC8vIEZpbHRlciBiYXIgZmlsbCBvcGFjaXR5XG4gICAgICAgIHNuYXBEdXJhdGlvbjogMTUwLCAvLyB0d2VlbiBkdXJhdGlvbiBpbiBtcyBmb3IgYnJ1c2ggc25hcCBmb3Igb3JkaW5hbCBheGVzXG4gICAgICAgIHNuYXBSYXRpbzogMC4yNSwgLy8gcmF0aW8gb2YgYmFyIGV4dGVuc2lvbiByZWxhdGl2ZSB0byB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gYWRqYWNlbnQgb3JkaW5hbCB2YWx1ZXNcbiAgICAgICAgc25hcENsb3NlOiAwLjAxLCAvLyBmcmFjdGlvbiBvZiBpbnRlci12YWx1ZSBkaXN0YW5jZSB0byBzbmFwIHRvIHRoZSBjbG9zZXIgb25lLCBldmVuIGlmIHlvdSdyZSBub3Qgb3ZlciBpdFxuICAgICAgICBzdHJva2VDb2xvcjogJ3doaXRlJywgLy8gQ29sb3Igb2YgdGhlIGZpbHRlciBiYXIgc2lkZSBsaW5lc1xuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLCAvLyBGaWx0ZXIgYmFyIHNpZGUgc3Ryb2tlIG9wYWNpdHlcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDEsIC8vIEZpbHRlciBiYXIgc2lkZSBzdHJva2Ugd2lkdGggaW4gcGl4ZWxzXG4gICAgICAgIGhhbmRsZUhlaWdodDogOCwgLy8gSGVpZ2h0IG9mIHRoZSBmaWx0ZXIgYmFyIHZlcnRpY2FsIHJlc2l6ZSBhcmVhcyBvbiB0b3AgYW5kIGJvdHRvbVxuICAgICAgICBoYW5kbGVPcGFjaXR5OiAxLCAvLyBPcGFjaXR5IG9mIHRoZSBmaWx0ZXIgYmFyIHZlcnRpY2FsIHJlc2l6ZSBhcmVhcyBvbiB0b3AgYW5kIGJvdHRvbVxuICAgICAgICBoYW5kbGVPdmVybGFwOiAwIC8vIEEgbGFyZ2VyIHRoYW4gMCB2YWx1ZSBjYXVzZXMgb3ZlcmxhcHMgd2l0aCB0aGUgZmlsdGVyIGJhciwgcmVwcmVzZW50ZWQgYXMgcGl4ZWxzXG4gICAgfSxcbiAgICBjbjoge1xuICAgICAgICBheGlzRXh0ZW50VGV4dDogJ2F4aXMtZXh0ZW50LXRleHQnLFxuICAgICAgICBwYXJjb29yZHNMaW5lTGF5ZXJzOiAncGFyY29vcmRzLWxpbmUtbGF5ZXJzJyxcbiAgICAgICAgcGFyY29vcmRzTGluZUxheWVyOiAncGFyY29vcmRzLWxpbmVzJyxcbiAgICAgICAgcGFyY29vcmRzOiAncGFyY29vcmRzJyxcbiAgICAgICAgcGFyY29vcmRzQ29udHJvbFZpZXc6ICdwYXJjb29yZHMtY29udHJvbC12aWV3JyxcbiAgICAgICAgeUF4aXM6ICd5LWF4aXMnLFxuICAgICAgICBheGlzT3ZlcmxheXM6ICdheGlzLW92ZXJsYXlzJyxcbiAgICAgICAgYXhpczogJ2F4aXMnLFxuICAgICAgICBheGlzSGVhZGluZzogJ2F4aXMtaGVhZGluZycsXG4gICAgICAgIGF4aXNUaXRsZTogJ2F4aXMtdGl0bGUnLFxuICAgICAgICBheGlzRXh0ZW50OiAnYXhpcy1leHRlbnQnLFxuICAgICAgICBheGlzRXh0ZW50VG9wOiAnYXhpcy1leHRlbnQtdG9wJyxcbiAgICAgICAgYXhpc0V4dGVudFRvcFRleHQ6ICdheGlzLWV4dGVudC10b3AtdGV4dCcsXG4gICAgICAgIGF4aXNFeHRlbnRCb3R0b206ICdheGlzLWV4dGVudC1ib3R0b20nLFxuICAgICAgICBheGlzRXh0ZW50Qm90dG9tVGV4dDogJ2F4aXMtZXh0ZW50LWJvdHRvbS10ZXh0JyxcbiAgICAgICAgYXhpc0JydXNoOiAnYXhpcy1icnVzaCdcbiAgICB9LFxuICAgIGlkOiB7XG4gICAgICAgIGZpbHRlckJhclBhdHRlcm46ICdmaWx0ZXItYmFyLXBhdHRlcm4nXG5cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2RvbWFpbicpLmRlZmF1bHRzO1xudmFyIGhhbmRsZUFycmF5Q29udGFpbmVyRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hcnJheV9jb250YWluZXJfZGVmYXVsdHMnKTtcbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcblxudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBheGlzQnJ1c2ggPSByZXF1aXJlKCcuL2F4aXNicnVzaCcpO1xudmFyIG1heERpbWVuc2lvbkNvdW50ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKS5tYXhEaW1lbnNpb25Db3VudDtcbnZhciBtZXJnZUxlbmd0aCA9IHJlcXVpcmUoJy4vbWVyZ2VfbGVuZ3RoJyk7XG5cbmZ1bmN0aW9uIGhhbmRsZUxpbmVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSkge1xuICAgIHZhciBsaW5lQ29sb3IgPSBjb2VyY2UoJ2xpbmUuY29sb3InLCBkZWZhdWx0Q29sb3IpO1xuXG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZUluLCAnbGluZScpICYmIExpYi5pc0FycmF5T3JUeXBlZEFycmF5KGxpbmVDb2xvcikpIHtcbiAgICAgICAgaWYobGluZUNvbG9yLmxlbmd0aCkge1xuICAgICAgICAgICAgY29lcmNlKCdsaW5lLmNvbG9yc2NhbGUnKTtcbiAgICAgICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdsaW5lLicsIGNMZXR0ZXI6ICdjJ30pO1xuICAgICAgICAgICAgLy8gVE9ETzogSSB0aGluayBpdCB3b3VsZCBiZSBiZXR0ZXIgdG8ga2VlcCBzaG93aW5nIGxpbmVzIGJleW9uZCB0aGUgbGFzdCBsaW5lIGNvbG9yXG4gICAgICAgICAgICAvLyBidXQgSSdtIG5vdCBzdXJlIHdoYXQgY29sb3IgdG8gZ2l2ZSB0aGVzZSBsaW5lcyAtIHByb2JhYmx5IGJsYWNrIG9yIHdoaXRlXG4gICAgICAgICAgICAvLyBkZXBlbmRpbmcgb24gdGhlIGJhY2tncm91bmQgY29sb3I/XG4gICAgICAgICAgICByZXR1cm4gbGluZUNvbG9yLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYWNlT3V0LmxpbmUuY29sb3IgPSBkZWZhdWx0Q29sb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEluZmluaXR5O1xufVxuXG5mdW5jdGlvbiBkaW1lbnNpb25EZWZhdWx0cyhkaW1lbnNpb25JbiwgZGltZW5zaW9uT3V0LCBwYXJlbnRPdXQsIG9wdHMpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShkaW1lbnNpb25JbiwgZGltZW5zaW9uT3V0LCBhdHRyaWJ1dGVzLmRpbWVuc2lvbnMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBjb2VyY2UoJ3ZhbHVlcycpO1xuICAgIHZhciB2aXNpYmxlID0gY29lcmNlKCd2aXNpYmxlJyk7XG4gICAgaWYoISh2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCkpIHtcbiAgICAgICAgdmlzaWJsZSA9IGRpbWVuc2lvbk91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYodmlzaWJsZSkge1xuICAgICAgICBjb2VyY2UoJ2xhYmVsJyk7XG4gICAgICAgIGNvZXJjZSgndGlja3ZhbHMnKTtcbiAgICAgICAgY29lcmNlKCd0aWNrdGV4dCcpO1xuICAgICAgICBjb2VyY2UoJ3RpY2tmb3JtYXQnKTtcbiAgICAgICAgdmFyIHJhbmdlID0gY29lcmNlKCdyYW5nZScpO1xuXG4gICAgICAgIGRpbWVuc2lvbk91dC5fYXggPSB7XG4gICAgICAgICAgICBfaWQ6ICd5JyxcbiAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgc2hvd2V4cG9uZW50OiAnYWxsJyxcbiAgICAgICAgICAgIGV4cG9uZW50Zm9ybWF0OiAnQicsXG4gICAgICAgICAgICByYW5nZTogcmFuZ2VcbiAgICAgICAgfTtcblxuICAgICAgICBBeGVzLnNldENvbnZlcnQoZGltZW5zaW9uT3V0Ll9heCwgb3B0cy5sYXlvdXQpO1xuXG4gICAgICAgIGNvZXJjZSgnbXVsdGlzZWxlY3QnKTtcbiAgICAgICAgdmFyIGNvbnN0cmFpbnRSYW5nZSA9IGNvZXJjZSgnY29uc3RyYWludHJhbmdlJyk7XG4gICAgICAgIGlmKGNvbnN0cmFpbnRSYW5nZSkge1xuICAgICAgICAgICAgZGltZW5zaW9uT3V0LmNvbnN0cmFpbnRyYW5nZSA9IGF4aXNCcnVzaC5jbGVhblJhbmdlcyhjb25zdHJhaW50UmFuZ2UsIGRpbWVuc2lvbk91dCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBkaW1lbnNpb25zSW4gPSB0cmFjZUluLmRpbWVuc2lvbnM7XG4gICAgaWYoQXJyYXkuaXNBcnJheShkaW1lbnNpb25zSW4pICYmIGRpbWVuc2lvbnNJbi5sZW5ndGggPiBtYXhEaW1lbnNpb25Db3VudCkge1xuICAgICAgICBMaWIubG9nKCdwYXJjb29yZHMgdHJhY2VzIHN1cHBvcnQgdXAgdG8gJyArIG1heERpbWVuc2lvbkNvdW50ICsgJyBkaW1lbnNpb25zIGF0IHRoZSBtb21lbnQnKTtcbiAgICAgICAgZGltZW5zaW9uc0luLnNwbGljZShtYXhEaW1lbnNpb25Db3VudCk7XG4gICAgfVxuXG4gICAgdmFyIGRpbWVuc2lvbnMgPSBoYW5kbGVBcnJheUNvbnRhaW5lckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCB7XG4gICAgICAgIG5hbWU6ICdkaW1lbnNpb25zJyxcbiAgICAgICAgbGF5b3V0OiBsYXlvdXQsXG4gICAgICAgIGhhbmRsZUl0ZW1EZWZhdWx0czogZGltZW5zaW9uRGVmYXVsdHNcbiAgICB9KTtcblxuICAgIHZhciBsZW4gPSBoYW5kbGVMaW5lRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UpO1xuXG4gICAgaGFuZGxlRG9tYWluRGVmYXVsdHModHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcblxuICAgIGlmKCFBcnJheS5pc0FycmF5KGRpbWVuc2lvbnMpIHx8ICFkaW1lbnNpb25zLmxlbmd0aCkge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbWVyZ2VMZW5ndGgodHJhY2VPdXQsIGRpbWVuc2lvbnMsICd2YWx1ZXMnLCBsZW4pO1xuXG4gICAgLy8gbWFrZSBkZWZhdWx0IGZvbnQgc2l6ZSAxMHB4IChkZWZhdWx0IGlzIDEyKSxcbiAgICAvLyBzY2FsZSBsaW5lYXJseSB3aXRoIGdsb2JhbCBmb250IHNpemVcbiAgICB2YXIgZm9udERmbHQgPSB7XG4gICAgICAgIGZhbWlseTogbGF5b3V0LmZvbnQuZmFtaWx5LFxuICAgICAgICBzaXplOiBNYXRoLnJvdW5kKGxheW91dC5mb250LnNpemUgLyAxLjIpLFxuICAgICAgICBjb2xvcjogbGF5b3V0LmZvbnQuY29sb3JcbiAgICB9O1xuXG4gICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAnbGFiZWxmb250JywgZm9udERmbHQpO1xuICAgIExpYi5jb2VyY2VGb250KGNvZXJjZSwgJ3RpY2tmb250JywgZm9udERmbHQpO1xuICAgIExpYi5jb2VyY2VGb250KGNvZXJjZSwgJ3JhbmdlZm9udCcsIGZvbnREZmx0KTtcblxuICAgIGNvZXJjZSgnbGFiZWxhbmdsZScpO1xuICAgIGNvZXJjZSgnbGFiZWxzaWRlJyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuaXNUeXBlZEFycmF5O1xuXG5leHBvcnRzLmNvbnZlcnRUeXBlZEFycmF5ID0gZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBpc1R5cGVkQXJyYXkoYSkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhKSA6IGE7XG59O1xuXG5leHBvcnRzLmlzT3JkaW5hbCA9IGZ1bmN0aW9uKGRpbWVuc2lvbikge1xuICAgIHJldHVybiAhIWRpbWVuc2lvbi50aWNrdmFscztcbn07XG5cbmV4cG9ydHMuaXNWaXNpYmxlID0gZnVuY3Rpb24oZGltZW5zaW9uKSB7XG4gICAgcmV0dXJuIGRpbWVuc2lvbi52aXNpYmxlIHx8ICEoJ3Zpc2libGUnIGluIGRpbWVuc2lvbik7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLFxuICAgIGNvbG9yYmFyOiB7XG4gICAgICAgIGNvbnRhaW5lcjogJ2xpbmUnLFxuICAgICAgICBtaW46ICdjbWluJyxcbiAgICAgICAgbWF4OiAnY21heCdcbiAgICB9LFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAncGFyY29vcmRzJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi9iYXNlX3Bsb3QnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2dsJywgJ3JlZ2wnLCAnbm9PcGFjaXR5JywgJ25vSG92ZXInXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnUGFyYWxsZWwgY29vcmRpbmF0ZXMgZm9yIG11bHRpZGltZW5zaW9uYWwgZXhwbG9yYXRvcnkgZGF0YSBhbmFseXNpcy4nLFxuICAgICAgICAgICAgJ1RoZSBzYW1wbGVzIGFyZSBzcGVjaWZpZWQgaW4gYGRpbWVuc2lvbnNgLicsXG4gICAgICAgICAgICAnVGhlIGNvbG9ycyBhcmUgc2V0IGluIGBsaW5lLmNvbG9yYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGdsc2xpZnkgPSByZXF1aXJlKCdnbHNsaWZ5Jyk7XG52YXIgdmVydGV4U2hhZGVyU291cmNlID0gZ2xzbGlmeSgnLi9zaGFkZXJzL3ZlcnRleC5nbHNsJyk7XG52YXIgZnJhZ21lbnRTaGFkZXJTb3VyY2UgPSBnbHNsaWZ5KCcuL3NoYWRlcnMvZnJhZ21lbnQuZ2xzbCcpO1xudmFyIG1heERpbSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJykubWF4RGltZW5zaW9uQ291bnQ7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuLy8gZG9uJ3QgY2hhbmdlOyBvdGhlcndpc2UgbmVhci9mYXIgcGxhbmUgbGluZXMgYXJlIGxvc3RcbnZhciBkZXB0aExpbWl0RXBzaWxvbiA9IDFlLTY7XG5cbi8vIHByZWNpc2lvbiBvZiBtdWx0aXNlbGVjdCBpcyB0aGUgZnVsbCByYW5nZSBkaXZpZGVkIGludG8gdGhpcyBtYW55IHBhcnRzXG52YXIgbWFza0hlaWdodCA9IDIwNDg7XG5cbnZhciBkdW1teVBpeGVsID0gbmV3IFVpbnQ4QXJyYXkoNCk7XG52YXIgZGF0YVBpeGVsID0gbmV3IFVpbnQ4QXJyYXkoNCk7XG5cbnZhciBwYWxldHRlVGV4dHVyZUNvbmZpZyA9IHtcbiAgICBzaGFwZTogWzI1NiwgMV0sXG4gICAgZm9ybWF0OiAncmdiYScsXG4gICAgdHlwZTogJ3VpbnQ4JyxcbiAgICBtYWc6ICduZWFyZXN0JyxcbiAgICBtaW46ICduZWFyZXN0J1xufTtcblxuZnVuY3Rpb24gZW5zdXJlRHJhdyhyZWdsKSB7XG4gICAgcmVnbC5yZWFkKHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgZGF0YTogZHVtbXlQaXhlbFxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjbGVhcihyZWdsLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGdsID0gcmVnbC5fZ2w7XG4gICAgZ2wuZW5hYmxlKGdsLlNDSVNTT1JfVEVTVCk7XG4gICAgZ2wuc2Npc3Nvcih4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICByZWdsLmNsZWFyKHtjb2xvcjogWzAsIDAsIDAsIDBdLCBkZXB0aDogMX0pOyAvLyBjbGVhcmluZyBpcyBkb25lIGluIHNjaXNzb3JlZCBwYW5lbCBvbmx5XG59XG5cbmZ1bmN0aW9uIHJlbmRlckJsb2NrKHJlZ2wsIGdsQWVzLCByZW5kZXJTdGF0ZSwgYmxvY2tMaW5lQ291bnQsIHNhbXBsZUNvdW50LCBpdGVtKSB7XG4gICAgdmFyIHJhZktleSA9IGl0ZW0ua2V5O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyKGJsb2NrTnVtYmVyKSB7XG4gICAgICAgIHZhciBjb3VudCA9IE1hdGgubWluKGJsb2NrTGluZUNvdW50LCBzYW1wbGVDb3VudCAtIGJsb2NrTnVtYmVyICogYmxvY2tMaW5lQ291bnQpO1xuXG4gICAgICAgIGlmKGJsb2NrTnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICAvLyBzdG9wIGRyYXdpbmcgcG9zc2libHkgc3RhbGUgZ2x5cGhzIGJlZm9yZSBjbGVhcmluZ1xuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlbmRlclN0YXRlLmN1cnJlbnRSYWZzW3JhZktleV0pO1xuICAgICAgICAgICAgZGVsZXRlIHJlbmRlclN0YXRlLmN1cnJlbnRSYWZzW3JhZktleV07XG4gICAgICAgICAgICBjbGVhcihyZWdsLCBpdGVtLnNjaXNzb3JYLCBpdGVtLnNjaXNzb3JZLCBpdGVtLnNjaXNzb3JXaWR0aCwgaXRlbS52aWV3Qm94U2l6ZVsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihyZW5kZXJTdGF0ZS5jbGVhck9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uY291bnQgPSAyICogY291bnQ7XG4gICAgICAgIGl0ZW0ub2Zmc2V0ID0gMiAqIGJsb2NrTnVtYmVyICogYmxvY2tMaW5lQ291bnQ7XG4gICAgICAgIGdsQWVzKGl0ZW0pO1xuXG4gICAgICAgIGlmKGJsb2NrTnVtYmVyICogYmxvY2tMaW5lQ291bnQgKyBjb3VudCA8IHNhbXBsZUNvdW50KSB7XG4gICAgICAgICAgICByZW5kZXJTdGF0ZS5jdXJyZW50UmFmc1tyYWZLZXldID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZW5kZXIoYmxvY2tOdW1iZXIgKyAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyU3RhdGUuZHJhd0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmKCFyZW5kZXJTdGF0ZS5kcmF3Q29tcGxldGVkKSB7XG4gICAgICAgIGVuc3VyZURyYXcocmVnbCk7XG4gICAgICAgIHJlbmRlclN0YXRlLmRyYXdDb21wbGV0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHN0YXJ0IHdpdGggcmVuZGVyaW5nIGl0ZW0gMDsgcmVjdXJzaW9uIGhhbmRsZXMgdGhlIHJlc3RcbiAgICByZW5kZXIoMCk7XG59XG5cbmZ1bmN0aW9uIGFkanVzdERlcHRoKGQpIHtcbiAgICAvLyBXZWJHTCBtYXRyaXggb3BlcmF0aW9ucyB1c2UgZmxvYXRzIHdpdGggbGltaXRlZCBwcmVjaXNpb24sIHBvdGVudGlhbGx5IGNhdXNpbmcgYSBudW1iZXIgbmVhciBhIGJvcmRlciBvZiBbMCwgMV1cbiAgICAvLyB0byBlbmQgdXAgc2xpZ2h0bHkgb3V0c2lkZSB0aGUgYm9yZGVyLiBXaXRoIGFuIGVwc2lsb24sIHdlIHJlZHVjZSB0aGUgY2hhbmNlIHRoYXQgYSBsaW5lIGdldHMgY2xpcHBlZCBieSB0aGVcbiAgICAvLyBuZWFyIG9yIHRoZSBmYXIgcGxhbmUuXG4gICAgcmV0dXJuIE1hdGgubWF4KGRlcHRoTGltaXRFcHNpbG9uLCBNYXRoLm1pbigxIC0gZGVwdGhMaW1pdEVwc2lsb24sIGQpKTtcbn1cblxuZnVuY3Rpb24gcGFsZXR0ZSh1bml0VG9Db2xvciwgb3BhY2l0eSkge1xuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoMjU2KTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gdW5pdFRvQ29sb3IoaSAvIDI1NSkuY29uY2F0KG9wYWNpdHkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBNYXBzIHRoZSBzYW1wbGUgaW5kZXggWzAuLi5zYW1wbGVDb3VudCAtIDFdIHRvIGEgcmFuZ2Ugb2YgWzAsIDFdIGFzIHRoZSBzaGFkZXIgZXhwZWN0cyBjb2xvcnMgaW4gdGhlIFswLCAxXSByYW5nZS5cbi8vIGJ1dCBmaXJzdCBpdCBzaGlmdHMgdGhlIHNhbXBsZSBpbmRleCBieSAwLCA4IG9yIDE2IGJpdHMgZGVwZW5kaW5nIG9uIHJnYkluZGV4IFswLi4yXVxuLy8gd2l0aCB0aGUgZW5kIHJlc3VsdCB0aGF0IGVhY2ggbGluZSB3aWxsIGJlIG9mIGEgdW5pcXVlIGNvbG9yLCBtYWtpbmcgaXQgcG9zc2libGUgZm9yIHRoZSBwaWNrIGhhbmRsZXJcbi8vIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHdoaWNoIGxpbmUgaXMgaG92ZXJlZCBvdmVyIChiaWplY3RpdmUgbWFwcGluZykuXG4vLyBUaGUgaW52ZXJzZSwgaS5lLiByZWFkUGl4ZWwgaXMgaW52b2tlZCBmcm9tICdwYXJjb29yZHMuanMnXG5mdW5jdGlvbiBjYWxjUGlja0NvbG9yKGksIHJnYkluZGV4KSB7XG4gICAgcmV0dXJuIChpID4+PiA4ICogcmdiSW5kZXgpICUgMjU2IC8gMjU1O1xufVxuXG5mdW5jdGlvbiBtYWtlUG9pbnRzKHNhbXBsZUNvdW50LCBkaW1zLCBjb2xvcikge1xuICAgIHZhciBwb2ludHMgPSBuZXcgQXJyYXkoc2FtcGxlQ291bnQgKiAobWF4RGltICsgNCkpO1xuICAgIHZhciBuID0gMDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2FtcGxlQ291bnQ7IGkrKykge1xuICAgICAgICBmb3IodmFyIGsgPSAwOyBrIDwgbWF4RGltOyBrKyspIHtcbiAgICAgICAgICAgIHBvaW50c1tuKytdID0gKGsgPCBkaW1zLmxlbmd0aCkgPyBkaW1zW2tdLnBhZGRlZFVuaXRWYWx1ZXNbaV0gOiAwLjU7XG4gICAgICAgIH1cbiAgICAgICAgcG9pbnRzW24rK10gPSBjYWxjUGlja0NvbG9yKGksIDIpO1xuICAgICAgICBwb2ludHNbbisrXSA9IGNhbGNQaWNrQ29sb3IoaSwgMSk7XG4gICAgICAgIHBvaW50c1tuKytdID0gY2FsY1BpY2tDb2xvcihpLCAwKTtcbiAgICAgICAgcG9pbnRzW24rK10gPSBhZGp1c3REZXB0aChjb2xvcltpXSk7XG4gICAgfVxuICAgIHJldHVybiBwb2ludHM7XG59XG5cbmZ1bmN0aW9uIG1ha2VWZWNBdHRyKHZlY0luZGV4LCBzYW1wbGVDb3VudCwgcG9pbnRzKSB7XG4gICAgdmFyIHBvaW50UGFpcnMgPSBuZXcgQXJyYXkoc2FtcGxlQ291bnQgKiA4KTtcbiAgICB2YXIgbiA9IDA7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHNhbXBsZUNvdW50OyBpKyspIHtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IDI7IGorKykge1xuICAgICAgICAgICAgZm9yKHZhciBrID0gMDsgayA8IDQ7IGsrKykge1xuICAgICAgICAgICAgICAgIHZhciBxID0gdmVjSW5kZXggKiA0ICsgaztcbiAgICAgICAgICAgICAgICB2YXIgdiA9IHBvaW50c1tpICogNjQgKyBxXTtcbiAgICAgICAgICAgICAgICBpZihxID09PSA2MyAmJiBqID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHYgKj0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvaW50UGFpcnNbbisrXSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBvaW50UGFpcnM7XG59XG5cbmZ1bmN0aW9uIHBhZDIobnVtKSB7XG4gICAgdmFyIHMgPSAnMCcgKyBudW07XG4gICAgcmV0dXJuIHMuc3Vic3RyKHMubGVuZ3RoIC0gMik7XG59XG5cbmZ1bmN0aW9uIGdldEF0dHJOYW1lKGkpIHtcbiAgICByZXR1cm4gKGkgPCBtYXhEaW0pID8gJ3AnICsgcGFkMihpICsgMSkgKyAnXycgKyBwYWQyKGkgKyA0KSA6ICdjb2xvcnMnO1xufVxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMsIHNhbXBsZUNvdW50LCBwb2ludHMpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDw9IG1heERpbTsgaSArPSA0KSB7XG4gICAgICAgIGF0dHJpYnV0ZXNbZ2V0QXR0ck5hbWUoaSldKG1ha2VWZWNBdHRyKGkgLyA0LCBzYW1wbGVDb3VudCwgcG9pbnRzKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBlbXB0eUF0dHJpYnV0ZXMocmVnbCkge1xuICAgIHZhciBhdHRyaWJ1dGVzID0ge307XG4gICAgZm9yKHZhciBpID0gMDsgaSA8PSBtYXhEaW07IGkgKz0gNCkge1xuICAgICAgICBhdHRyaWJ1dGVzW2dldEF0dHJOYW1lKGkpXSA9IHJlZ2wuYnVmZmVyKHt1c2FnZTogJ2R5bmFtaWMnLCB0eXBlOiAnZmxvYXQnLCBkYXRhOiBuZXcgVWludDhBcnJheSgwKX0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRlcztcbn1cblxuZnVuY3Rpb24gbWFrZUl0ZW0obW9kZWwsIGxlZnRtb3N0LCByaWdodG1vc3QsIGl0ZW1OdW1iZXIsIGkwLCBpMSwgeCwgeSwgcGFuZWxTaXplWCwgcGFuZWxTaXplWSwgY3Jvc3NmaWx0ZXJEaW1lbnNpb25JbmRleCwgZHJ3TGF5ZXIsIGNvbnN0cmFpbnRzKSB7XG4gICAgdmFyIGRpbXMgPSBbW10sIFtdXTtcbiAgICBmb3IodmFyIGsgPSAwOyBrIDwgNjQ7IGsrKykge1xuICAgICAgICBkaW1zWzBdW2tdID0gKGsgPT09IGkwKSA/IDEgOiAwO1xuICAgICAgICBkaW1zWzFdW2tdID0gKGsgPT09IGkxKSA/IDEgOiAwO1xuICAgIH1cblxuICAgIHZhciBvdmVyZHJhZyA9IG1vZGVsLmxpbmVzLmNhbnZhc092ZXJkcmFnO1xuICAgIHZhciBkb21haW4gPSBtb2RlbC5kb21haW47XG4gICAgdmFyIGNhbnZhc1dpZHRoID0gbW9kZWwuY2FudmFzV2lkdGg7XG4gICAgdmFyIGNhbnZhc0hlaWdodCA9IG1vZGVsLmNhbnZhc0hlaWdodDtcblxuICAgIHZhciBkZXNlbGVjdGVkTGluZXNDb2xvciA9IG1vZGVsLmRlc2VsZWN0ZWRMaW5lcy5jb2xvcjtcblxuICAgIHZhciBpdGVtTW9kZWwgPSBMaWIuZXh0ZW5kRmxhdCh7XG4gICAgICAgIGtleTogY3Jvc3NmaWx0ZXJEaW1lbnNpb25JbmRleCxcbiAgICAgICAgcmVzb2x1dGlvbjogW2NhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHRdLFxuICAgICAgICB2aWV3Qm94UG9zOiBbeCArIG92ZXJkcmFnLCB5XSxcbiAgICAgICAgdmlld0JveFNpemU6IFtwYW5lbFNpemVYLCBwYW5lbFNpemVZXSxcbiAgICAgICAgaTA6IGkwLFxuICAgICAgICBpMTogaTEsXG5cbiAgICAgICAgZGltMEE6IGRpbXNbMF0uc2xpY2UoMCwgMTYpLFxuICAgICAgICBkaW0wQjogZGltc1swXS5zbGljZSgxNiwgMzIpLFxuICAgICAgICBkaW0wQzogZGltc1swXS5zbGljZSgzMiwgNDgpLFxuICAgICAgICBkaW0wRDogZGltc1swXS5zbGljZSg0OCwgNjQpLFxuICAgICAgICBkaW0xQTogZGltc1sxXS5zbGljZSgwLCAxNiksXG4gICAgICAgIGRpbTFCOiBkaW1zWzFdLnNsaWNlKDE2LCAzMiksXG4gICAgICAgIGRpbTFDOiBkaW1zWzFdLnNsaWNlKDMyLCA0OCksXG4gICAgICAgIGRpbTFEOiBkaW1zWzFdLnNsaWNlKDQ4LCA2NCksXG5cbiAgICAgICAgZHJ3TGF5ZXI6IGRyd0xheWVyLFxuICAgICAgICBjb250ZXh0Q29sb3I6IFtcbiAgICAgICAgICAgIGRlc2VsZWN0ZWRMaW5lc0NvbG9yWzBdIC8gMjU1LFxuICAgICAgICAgICAgZGVzZWxlY3RlZExpbmVzQ29sb3JbMV0gLyAyNTUsXG4gICAgICAgICAgICBkZXNlbGVjdGVkTGluZXNDb2xvclsyXSAvIDI1NSxcbiAgICAgICAgICAgIGRlc2VsZWN0ZWRMaW5lc0NvbG9yWzNdIDwgMSA/XG4gICAgICAgICAgICAgICAgZGVzZWxlY3RlZExpbmVzQ29sb3JbM10gOlxuICAgICAgICAgICAgICAgIE1hdGgubWF4KDEgLyAyNTUsIE1hdGgucG93KDEgLyBtb2RlbC5saW5lcy5jb2xvci5sZW5ndGgsIDEgLyAzKSlcbiAgICAgICAgXSxcblxuICAgICAgICBzY2lzc29yWDogKGl0ZW1OdW1iZXIgPT09IGxlZnRtb3N0ID8gMCA6IHggKyBvdmVyZHJhZykgKyAobW9kZWwucGFkLmwgLSBvdmVyZHJhZykgKyBtb2RlbC5sYXlvdXRXaWR0aCAqIGRvbWFpbi54WzBdLFxuICAgICAgICBzY2lzc29yV2lkdGg6IChpdGVtTnVtYmVyID09PSByaWdodG1vc3QgPyBjYW52YXNXaWR0aCAtIHggKyBvdmVyZHJhZyA6IHBhbmVsU2l6ZVggKyAwLjUpICsgKGl0ZW1OdW1iZXIgPT09IGxlZnRtb3N0ID8geCArIG92ZXJkcmFnIDogMCksXG4gICAgICAgIHNjaXNzb3JZOiB5ICsgbW9kZWwucGFkLmIgKyBtb2RlbC5sYXlvdXRIZWlnaHQgKiBkb21haW4ueVswXSxcbiAgICAgICAgc2Npc3NvckhlaWdodDogcGFuZWxTaXplWSxcblxuICAgICAgICB2aWV3cG9ydFg6IG1vZGVsLnBhZC5sIC0gb3ZlcmRyYWcgKyBtb2RlbC5sYXlvdXRXaWR0aCAqIGRvbWFpbi54WzBdLFxuICAgICAgICB2aWV3cG9ydFk6IG1vZGVsLnBhZC5iICsgbW9kZWwubGF5b3V0SGVpZ2h0ICogZG9tYWluLnlbMF0sXG4gICAgICAgIHZpZXdwb3J0V2lkdGg6IGNhbnZhc1dpZHRoLFxuICAgICAgICB2aWV3cG9ydEhlaWdodDogY2FudmFzSGVpZ2h0XG4gICAgfSwgY29uc3RyYWludHMpO1xuXG4gICAgcmV0dXJuIGl0ZW1Nb2RlbDtcbn1cblxuZnVuY3Rpb24gZXhwYW5kZWRQaXhlbFJhbmdlKGJvdW5kcykge1xuICAgIHZhciBkaCA9IG1hc2tIZWlnaHQgLSAxO1xuICAgIHZhciBhID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihib3VuZHNbMF0gKiBkaCksIDApO1xuICAgIHZhciBiID0gTWF0aC5taW4oZGgsIE1hdGguY2VpbChib3VuZHNbMV0gKiBkaCksIGRoKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBNYXRoLm1pbihhLCBiKSxcbiAgICAgICAgTWF0aC5tYXgoYSwgYilcbiAgICBdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNhbnZhc0dMLCBkKSB7XG4gICAgLy8gY29udGV4dCAmIHBpY2sgZGVzY3JpYmUgd2hpY2ggY2FudmFzIHdlJ3JlIHRhbGtpbmcgYWJvdXQgLSB3b24ndCBjaGFuZ2Ugd2l0aCBuZXcgZGF0YVxuICAgIHZhciBpc0NvbnRleHQgPSBkLmNvbnRleHQ7XG4gICAgdmFyIGlzUGljayA9IGQucGljaztcblxuICAgIHZhciByZWdsID0gZC5yZWdsO1xuXG4gICAgdmFyIHJlbmRlclN0YXRlID0ge1xuICAgICAgICBjdXJyZW50UmFmczoge30sXG4gICAgICAgIGRyYXdDb21wbGV0ZWQ6IHRydWUsXG4gICAgICAgIGNsZWFyT25seTogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gc3RhdGUgdG8gYmUgc2V0IGJ5IHVwZGF0ZSBhbmQgdXNlZCBsYXRlclxuICAgIHZhciBtb2RlbDtcbiAgICB2YXIgdm07XG4gICAgdmFyIGluaXRpYWxEaW1zO1xuICAgIHZhciBzYW1wbGVDb3VudDtcbiAgICB2YXIgYXR0cmlidXRlcyA9IGVtcHR5QXR0cmlidXRlcyhyZWdsKTtcbiAgICB2YXIgbWFza1RleHR1cmU7XG4gICAgdmFyIHBhbGV0dGVUZXh0dXJlID0gcmVnbC50ZXh0dXJlKHBhbGV0dGVUZXh0dXJlQ29uZmlnKTtcblxuICAgIHZhciBwcmV2QXhpc09yZGVyID0gW107XG5cbiAgICB1cGRhdGUoZCk7XG5cbiAgICB2YXIgZ2xBZXMgPSByZWdsKHtcblxuICAgICAgICBwcm9maWxlOiBmYWxzZSxcblxuICAgICAgICBibGVuZDoge1xuICAgICAgICAgICAgZW5hYmxlOiBpc0NvbnRleHQsXG4gICAgICAgICAgICBmdW5jOiB7XG4gICAgICAgICAgICAgICAgc3JjUkdCOiAnc3JjIGFscGhhJyxcbiAgICAgICAgICAgICAgICBkc3RSR0I6ICdvbmUgbWludXMgc3JjIGFscGhhJyxcbiAgICAgICAgICAgICAgICBzcmNBbHBoYTogMSxcbiAgICAgICAgICAgICAgICBkc3RBbHBoYTogMSAvLyAnb25lIG1pbnVzIHNyYyBhbHBoYSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcXVhdGlvbjoge1xuICAgICAgICAgICAgICAgIHJnYjogJ2FkZCcsXG4gICAgICAgICAgICAgICAgYWxwaGE6ICdhZGQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3I6IFswLCAwLCAwLCAwXVxuICAgICAgICB9LFxuXG4gICAgICAgIGRlcHRoOiB7XG4gICAgICAgICAgICBlbmFibGU6ICFpc0NvbnRleHQsXG4gICAgICAgICAgICBtYXNrOiB0cnVlLFxuICAgICAgICAgICAgZnVuYzogJ2xlc3MnLFxuICAgICAgICAgICAgcmFuZ2U6IFswLCAxXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGZvciBwb2x5Z29uc1xuICAgICAgICBjdWxsOiB7XG4gICAgICAgICAgICBlbmFibGU6IHRydWUsXG4gICAgICAgICAgICBmYWNlOiAnYmFjaydcbiAgICAgICAgfSxcblxuICAgICAgICBzY2lzc29yOiB7XG4gICAgICAgICAgICBlbmFibGU6IHRydWUsXG4gICAgICAgICAgICBib3g6IHtcbiAgICAgICAgICAgICAgICB4OiByZWdsLnByb3AoJ3NjaXNzb3JYJyksXG4gICAgICAgICAgICAgICAgeTogcmVnbC5wcm9wKCdzY2lzc29yWScpLFxuICAgICAgICAgICAgICAgIHdpZHRoOiByZWdsLnByb3AoJ3NjaXNzb3JXaWR0aCcpLFxuICAgICAgICAgICAgICAgIGhlaWdodDogcmVnbC5wcm9wKCdzY2lzc29ySGVpZ2h0JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB2aWV3cG9ydDoge1xuICAgICAgICAgICAgeDogcmVnbC5wcm9wKCd2aWV3cG9ydFgnKSxcbiAgICAgICAgICAgIHk6IHJlZ2wucHJvcCgndmlld3BvcnRZJyksXG4gICAgICAgICAgICB3aWR0aDogcmVnbC5wcm9wKCd2aWV3cG9ydFdpZHRoJyksXG4gICAgICAgICAgICBoZWlnaHQ6IHJlZ2wucHJvcCgndmlld3BvcnRIZWlnaHQnKVxuICAgICAgICB9LFxuXG4gICAgICAgIGRpdGhlcjogZmFsc2UsXG5cbiAgICAgICAgdmVydDogdmVydGV4U2hhZGVyU291cmNlLFxuXG4gICAgICAgIGZyYWc6IGZyYWdtZW50U2hhZGVyU291cmNlLFxuXG4gICAgICAgIHByaW1pdGl2ZTogJ2xpbmVzJyxcbiAgICAgICAgbGluZVdpZHRoOiAxLFxuICAgICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgICAgICB1bmlmb3Jtczoge1xuICAgICAgICAgICAgcmVzb2x1dGlvbjogcmVnbC5wcm9wKCdyZXNvbHV0aW9uJyksXG4gICAgICAgICAgICB2aWV3Qm94UG9zOiByZWdsLnByb3AoJ3ZpZXdCb3hQb3MnKSxcbiAgICAgICAgICAgIHZpZXdCb3hTaXplOiByZWdsLnByb3AoJ3ZpZXdCb3hTaXplJyksXG4gICAgICAgICAgICBkaW0wQTogcmVnbC5wcm9wKCdkaW0wQScpLFxuICAgICAgICAgICAgZGltMUE6IHJlZ2wucHJvcCgnZGltMUEnKSxcbiAgICAgICAgICAgIGRpbTBCOiByZWdsLnByb3AoJ2RpbTBCJyksXG4gICAgICAgICAgICBkaW0xQjogcmVnbC5wcm9wKCdkaW0xQicpLFxuICAgICAgICAgICAgZGltMEM6IHJlZ2wucHJvcCgnZGltMEMnKSxcbiAgICAgICAgICAgIGRpbTFDOiByZWdsLnByb3AoJ2RpbTFDJyksXG4gICAgICAgICAgICBkaW0wRDogcmVnbC5wcm9wKCdkaW0wRCcpLFxuICAgICAgICAgICAgZGltMUQ6IHJlZ2wucHJvcCgnZGltMUQnKSxcbiAgICAgICAgICAgIGxvQTogcmVnbC5wcm9wKCdsb0EnKSxcbiAgICAgICAgICAgIGhpQTogcmVnbC5wcm9wKCdoaUEnKSxcbiAgICAgICAgICAgIGxvQjogcmVnbC5wcm9wKCdsb0InKSxcbiAgICAgICAgICAgIGhpQjogcmVnbC5wcm9wKCdoaUInKSxcbiAgICAgICAgICAgIGxvQzogcmVnbC5wcm9wKCdsb0MnKSxcbiAgICAgICAgICAgIGhpQzogcmVnbC5wcm9wKCdoaUMnKSxcbiAgICAgICAgICAgIGxvRDogcmVnbC5wcm9wKCdsb0QnKSxcbiAgICAgICAgICAgIGhpRDogcmVnbC5wcm9wKCdoaUQnKSxcbiAgICAgICAgICAgIHBhbGV0dGU6IHBhbGV0dGVUZXh0dXJlLFxuICAgICAgICAgICAgY29udGV4dENvbG9yOiByZWdsLnByb3AoJ2NvbnRleHRDb2xvcicpLFxuICAgICAgICAgICAgbWFzazogcmVnbC5wcm9wKCdtYXNrVGV4dHVyZScpLFxuICAgICAgICAgICAgZHJ3TGF5ZXI6IHJlZ2wucHJvcCgnZHJ3TGF5ZXInKSxcbiAgICAgICAgICAgIG1hc2tIZWlnaHQ6IHJlZ2wucHJvcCgnbWFza0hlaWdodCcpXG4gICAgICAgIH0sXG4gICAgICAgIG9mZnNldDogcmVnbC5wcm9wKCdvZmZzZXQnKSxcbiAgICAgICAgY291bnQ6IHJlZ2wucHJvcCgnY291bnQnKVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKGROZXcpIHtcbiAgICAgICAgbW9kZWwgPSBkTmV3Lm1vZGVsO1xuICAgICAgICB2bSA9IGROZXcudmlld01vZGVsO1xuICAgICAgICBpbml0aWFsRGltcyA9IHZtLmRpbWVuc2lvbnMuc2xpY2UoKTtcbiAgICAgICAgc2FtcGxlQ291bnQgPSBpbml0aWFsRGltc1swXSA/IGluaXRpYWxEaW1zWzBdLnZhbHVlcy5sZW5ndGggOiAwO1xuXG4gICAgICAgIHZhciBsaW5lcyA9IG1vZGVsLmxpbmVzO1xuICAgICAgICB2YXIgY29sb3IgPSBpc1BpY2sgPyBsaW5lcy5jb2xvci5tYXAoZnVuY3Rpb24oXywgaSkge3JldHVybiBpIC8gbGluZXMuY29sb3IubGVuZ3RoO30pIDogbGluZXMuY29sb3I7XG5cbiAgICAgICAgdmFyIHBvaW50cyA9IG1ha2VQb2ludHMoc2FtcGxlQ291bnQsIGluaXRpYWxEaW1zLCBjb2xvcik7XG4gICAgICAgIHNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcywgc2FtcGxlQ291bnQsIHBvaW50cyk7XG5cbiAgICAgICAgaWYoIWlzQ29udGV4dCAmJiAhaXNQaWNrKSB7XG4gICAgICAgICAgICBwYWxldHRlVGV4dHVyZSA9IHJlZ2wudGV4dHVyZShMaWIuZXh0ZW5kRmxhdCh7XG4gICAgICAgICAgICAgICAgZGF0YTogcGFsZXR0ZShtb2RlbC51bml0VG9Db2xvciwgMjU1KVxuICAgICAgICAgICAgfSwgcGFsZXR0ZVRleHR1cmVDb25maWcpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VDb25zdHJhaW50cyhpc0NvbnRleHQpIHtcbiAgICAgICAgdmFyIGksIGosIGs7XG5cbiAgICAgICAgdmFyIGxpbWl0cyA9IFtbXSwgW11dO1xuICAgICAgICBmb3IoayA9IDA7IGsgPCA2NDsgaysrKSB7XG4gICAgICAgICAgICB2YXIgcCA9ICghaXNDb250ZXh0ICYmIGsgPCBpbml0aWFsRGltcy5sZW5ndGgpID9cbiAgICAgICAgICAgICAgICBpbml0aWFsRGltc1trXS5icnVzaC5maWx0ZXIuZ2V0Qm91bmRzKCkgOiBbLUluZmluaXR5LCBJbmZpbml0eV07XG5cbiAgICAgICAgICAgIGxpbWl0c1swXVtrXSA9IHBbMF07XG4gICAgICAgICAgICBsaW1pdHNbMV1ba10gPSBwWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxlbiA9IG1hc2tIZWlnaHQgKiA4O1xuICAgICAgICB2YXIgbWFzayA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbWFza1tpXSA9IDI1NTtcbiAgICAgICAgfVxuICAgICAgICBpZighaXNDb250ZXh0KSB7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBpbml0aWFsRGltcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB1ID0gaSAlIDg7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSAoaSAtIHUpIC8gODtcbiAgICAgICAgICAgICAgICB2YXIgYml0TWFzayA9IE1hdGgucG93KDIsIHUpO1xuICAgICAgICAgICAgICAgIHZhciBkaW0gPSBpbml0aWFsRGltc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2VzID0gZGltLmJydXNoLmZpbHRlci5nZXQoKTtcbiAgICAgICAgICAgICAgICBpZihyYW5nZXMubGVuZ3RoIDwgMikgY29udGludWU7IC8vIGJhaWwgaWYgdGhlIGJvdW5kaW5nIGJveCBiYXNlZCBmaWx0ZXIgaXMgc3VmZmljaWVudFxuXG4gICAgICAgICAgICAgICAgdmFyIHByZXZFbmQgPSBleHBhbmRlZFBpeGVsUmFuZ2UocmFuZ2VzWzBdKVsxXTtcbiAgICAgICAgICAgICAgICBmb3IoaiA9IDE7IGogPCByYW5nZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRSYW5nZSA9IGV4cGFuZGVkUGl4ZWxSYW5nZShyYW5nZXNbal0pO1xuICAgICAgICAgICAgICAgICAgICBmb3IoayA9IHByZXZFbmQgKyAxOyBrIDwgbmV4dFJhbmdlWzBdOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tbayAqIDggKyB2XSAmPSB+Yml0TWFzaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcmV2RW5kID0gTWF0aC5tYXgocHJldkVuZCwgbmV4dFJhbmdlWzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGV4dHVyZURhdGEgPSB7XG4gICAgICAgICAgICAvLyA4IHVuaXRzIHggOCBiaXRzID0gNjQgYml0cywganVzdCBzdWZmaWNpZW50IGZvciB0aGUgYWxtb3N0IDY0IGRpbWVuc2lvbnMgd2Ugc3VwcG9ydFxuICAgICAgICAgICAgc2hhcGU6IFs4LCBtYXNrSGVpZ2h0XSxcbiAgICAgICAgICAgIGZvcm1hdDogJ2FscGhhJyxcbiAgICAgICAgICAgIHR5cGU6ICd1aW50OCcsXG4gICAgICAgICAgICBtYWc6ICduZWFyZXN0JyxcbiAgICAgICAgICAgIG1pbjogJ25lYXJlc3QnLFxuICAgICAgICAgICAgZGF0YTogbWFza1xuICAgICAgICB9O1xuICAgICAgICBpZihtYXNrVGV4dHVyZSkgbWFza1RleHR1cmUodGV4dHVyZURhdGEpO1xuICAgICAgICBlbHNlIG1hc2tUZXh0dXJlID0gcmVnbC50ZXh0dXJlKHRleHR1cmVEYXRhKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWFza1RleHR1cmU6IG1hc2tUZXh0dXJlLFxuICAgICAgICAgICAgbWFza0hlaWdodDogbWFza0hlaWdodCxcbiAgICAgICAgICAgIGxvQTogbGltaXRzWzBdLnNsaWNlKDAsIDE2KSxcbiAgICAgICAgICAgIGxvQjogbGltaXRzWzBdLnNsaWNlKDE2LCAzMiksXG4gICAgICAgICAgICBsb0M6IGxpbWl0c1swXS5zbGljZSgzMiwgNDgpLFxuICAgICAgICAgICAgbG9EOiBsaW1pdHNbMF0uc2xpY2UoNDgsIDY0KSxcbiAgICAgICAgICAgIGhpQTogbGltaXRzWzFdLnNsaWNlKDAsIDE2KSxcbiAgICAgICAgICAgIGhpQjogbGltaXRzWzFdLnNsaWNlKDE2LCAzMiksXG4gICAgICAgICAgICBoaUM6IGxpbWl0c1sxXS5zbGljZSgzMiwgNDgpLFxuICAgICAgICAgICAgaGlEOiBsaW1pdHNbMV0uc2xpY2UoNDgsIDY0KSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJHTFBhcmNvb3JkcyhwYW5lbHMsIHNldENoYW5nZWQsIGNsZWFyT25seSkge1xuICAgICAgICB2YXIgcGFuZWxDb3VudCA9IHBhbmVscy5sZW5ndGg7XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIHZhciBsZWZ0bW9zdDtcbiAgICAgICAgdmFyIHJpZ2h0bW9zdDtcbiAgICAgICAgdmFyIGxvd2VzdFggPSBJbmZpbml0eTtcbiAgICAgICAgdmFyIGhpZ2hlc3RYID0gLUluZmluaXR5O1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IHBhbmVsQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgaWYocGFuZWxzW2ldLmRpbTAuY2FudmFzWCA8IGxvd2VzdFgpIHtcbiAgICAgICAgICAgICAgICBsb3dlc3RYID0gcGFuZWxzW2ldLmRpbTAuY2FudmFzWDtcbiAgICAgICAgICAgICAgICBsZWZ0bW9zdCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwYW5lbHNbaV0uZGltMS5jYW52YXNYID4gaGlnaGVzdFgpIHtcbiAgICAgICAgICAgICAgICBoaWdoZXN0WCA9IHBhbmVsc1tpXS5kaW0xLmNhbnZhc1g7XG4gICAgICAgICAgICAgICAgcmlnaHRtb3N0ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHBhbmVsQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGNsZWFyIGNhbnZhcyBoZXJlLCBhcyB0aGUgcGFuZWwgaXRlcmF0aW9uIGJlbG93IHdpbGwgbm90IGVudGVyIHRoZSBsb29wIGJvZHlcbiAgICAgICAgICAgIGNsZWFyKHJlZ2wsIDAsIDAsIG1vZGVsLmNhbnZhc1dpZHRoLCBtb2RlbC5jYW52YXNIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb25zdHJhaW50cyA9IG1ha2VDb25zdHJhaW50cyhpc0NvbnRleHQpO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IHBhbmVsQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIHAgPSBwYW5lbHNbaV07XG4gICAgICAgICAgICB2YXIgaTAgPSBwLmRpbTAuY3Jvc3NmaWx0ZXJEaW1lbnNpb25JbmRleDtcbiAgICAgICAgICAgIHZhciBpMSA9IHAuZGltMS5jcm9zc2ZpbHRlckRpbWVuc2lvbkluZGV4O1xuICAgICAgICAgICAgdmFyIHggPSBwLmNhbnZhc1g7XG4gICAgICAgICAgICB2YXIgeSA9IHAuY2FudmFzWTtcbiAgICAgICAgICAgIHZhciBuZXh0WCA9IHggKyBwLnBhbmVsU2l6ZVg7XG4gICAgICAgICAgICBpZihzZXRDaGFuZ2VkIHx8XG4gICAgICAgICAgICAgICAgIXByZXZBeGlzT3JkZXJbaTBdIHx8XG4gICAgICAgICAgICAgICAgcHJldkF4aXNPcmRlcltpMF1bMF0gIT09IHggfHxcbiAgICAgICAgICAgICAgICBwcmV2QXhpc09yZGVyW2kwXVsxXSAhPT0gbmV4dFhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHByZXZBeGlzT3JkZXJbaTBdID0gW3gsIG5leHRYXTtcblxuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbWFrZUl0ZW0oXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0bW9zdCwgcmlnaHRtb3N0LCBpLCBpMCwgaTEsIHgsIHksXG4gICAgICAgICAgICAgICAgICAgIHAucGFuZWxTaXplWCwgcC5wYW5lbFNpemVZLFxuICAgICAgICAgICAgICAgICAgICBwLmRpbTAuY3Jvc3NmaWx0ZXJEaW1lbnNpb25JbmRleCxcbiAgICAgICAgICAgICAgICAgICAgaXNDb250ZXh0ID8gMCA6IGlzUGljayA/IDIgOiAxLFxuICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50c1xuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZW5kZXJTdGF0ZS5jbGVhck9ubHkgPSBjbGVhck9ubHk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYmxvY2tMaW5lQ291bnQgPSBzZXRDaGFuZ2VkID8gbW9kZWwubGluZXMuYmxvY2tMaW5lQ291bnQgOiBzYW1wbGVDb3VudDtcbiAgICAgICAgICAgICAgICByZW5kZXJCbG9jayhcbiAgICAgICAgICAgICAgICAgICAgcmVnbCwgZ2xBZXMsIHJlbmRlclN0YXRlLCBibG9ja0xpbmVDb3VudCwgc2FtcGxlQ291bnQsIGl0ZW1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZFBpeGVsKGNhbnZhc1gsIGNhbnZhc1kpIHtcbiAgICAgICAgcmVnbC5yZWFkKHtcbiAgICAgICAgICAgIHg6IGNhbnZhc1gsXG4gICAgICAgICAgICB5OiBjYW52YXNZLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBkYXRhOiBkYXRhUGl4ZWxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkYXRhUGl4ZWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZFBpeGVscyhjYW52YXNYLCBjYW52YXNZLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHZhciBwaXhlbEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoNCAqIHdpZHRoICogaGVpZ2h0KTtcbiAgICAgICAgcmVnbC5yZWFkKHtcbiAgICAgICAgICAgIHg6IGNhbnZhc1gsXG4gICAgICAgICAgICB5OiBjYW52YXNZLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICBkYXRhOiBwaXhlbEFycmF5XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGl4ZWxBcnJheTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBjYW52YXNHTC5zdHlsZVsncG9pbnRlci1ldmVudHMnXSA9ICdub25lJztcbiAgICAgICAgcGFsZXR0ZVRleHR1cmUuZGVzdHJveSgpO1xuICAgICAgICBpZihtYXNrVGV4dHVyZSkgbWFza1RleHR1cmUuZGVzdHJveSgpO1xuICAgICAgICBmb3IodmFyIGsgaW4gYXR0cmlidXRlcykgYXR0cmlidXRlc1trXS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXJHTFBhcmNvb3JkcyxcbiAgICAgICAgcmVhZFBpeGVsOiByZWFkUGl4ZWwsXG4gICAgICAgIHJlYWRQaXhlbHM6IHJlYWRQaXhlbHMsXG4gICAgICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgICAgIHVwZGF0ZTogdXBkYXRlXG4gICAgfTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogbWVyZ2VMZW5ndGg6IHNldCB0cmFjZSBsZW5ndGggYXMgdGhlIG1pbmltdW0gb2YgYWxsIGRpbWVuc2lvbiBkYXRhIGxlbmd0aHNcbiAqICAgICBhbmQgcHJvcGFnYXRlcyB0aGlzIGxlbmd0aCBpbnRvIGVhY2ggZGltZW5zaW9uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRyYWNlT3V0OiB0aGUgZnVsbERhdGEgdHJhY2VcbiAqIEBwYXJhbSB7QXJyYXkob2JqZWN0KX0gZGltZW5zaW9uczogYXJyYXkgb2YgZGltZW5zaW9uIG9iamVjdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhQXR0cjogdGhlIGF0dHJpYnV0ZSBvZiBlYWNoIGRpbWVuc2lvbiBjb250YWluaW5nIHRoZSBkYXRhXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGxlbjogYW4gYWxyZWFkeS1leGlzdGluZyBsZW5ndGggZnJvbSBvdGhlciBhdHRyaWJ1dGVzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odHJhY2VPdXQsIGRpbWVuc2lvbnMsIGRhdGFBdHRyLCBsZW4pIHtcbiAgICBpZighbGVuKSBsZW4gPSBJbmZpbml0eTtcbiAgICB2YXIgaSwgZGltaTtcbiAgICBmb3IoaSA9IDA7IGkgPCBkaW1lbnNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRpbWkgPSBkaW1lbnNpb25zW2ldO1xuICAgICAgICBpZihkaW1pLnZpc2libGUpIGxlbiA9IE1hdGgubWluKGxlbiwgZGltaVtkYXRhQXR0cl0ubGVuZ3RoKTtcbiAgICB9XG4gICAgaWYobGVuID09PSBJbmZpbml0eSkgbGVuID0gMDtcblxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG4gICAgZm9yKGkgPSAwOyBpIDwgZGltZW5zaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkaW1pID0gZGltZW5zaW9uc1tpXTtcbiAgICAgICAgaWYoZGltaS52aXNpYmxlKSBkaW1pLl9sZW5ndGggPSBsZW47XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlbjtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgcmdiYSA9IHJlcXVpcmUoJ2NvbG9yLXJnYmEnKTtcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHN2Z1RleHRVdGlscyA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zdmdfdGV4dF91dGlscycpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciBDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJyk7XG5cbnZhciBndXAgPSByZXF1aXJlKCcuLi8uLi9saWIvZ3VwJyk7XG52YXIga2V5RnVuID0gZ3VwLmtleUZ1bjtcbnZhciByZXBlYXQgPSBndXAucmVwZWF0O1xudmFyIHVud3JhcCA9IGd1cC51bndyYXA7XG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG52YXIgYyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgYnJ1c2ggPSByZXF1aXJlKCcuL2F4aXNicnVzaCcpO1xudmFyIGxpbmVMYXllck1ha2VyID0gcmVxdWlyZSgnLi9saW5lcycpO1xuXG5mdW5jdGlvbiBmaW5kRXh0cmVtZShmbiwgdmFsdWVzLCBsZW4pIHtcbiAgICByZXR1cm4gTGliLmFnZ051bXMoZm4sIG51bGwsIHZhbHVlcywgbGVuKTtcbn1cblxuZnVuY3Rpb24gZmluZEV4dHJlbWVzKHZhbHVlcywgbGVuKSB7XG4gICAgcmV0dXJuIGZpeEV4dHJlbWVzKFxuICAgICAgICBmaW5kRXh0cmVtZShNYXRoLm1pbiwgdmFsdWVzLCBsZW4pLFxuICAgICAgICBmaW5kRXh0cmVtZShNYXRoLm1heCwgdmFsdWVzLCBsZW4pXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gZGltZW5zaW9uRXh0ZW50KGRpbWVuc2lvbikge1xuICAgIHZhciByYW5nZSA9IGRpbWVuc2lvbi5yYW5nZTtcbiAgICByZXR1cm4gcmFuZ2UgP1xuICAgICAgICBmaXhFeHRyZW1lcyhyYW5nZVswXSwgcmFuZ2VbMV0pIDpcbiAgICAgICAgZmluZEV4dHJlbWVzKGRpbWVuc2lvbi52YWx1ZXMsIGRpbWVuc2lvbi5fbGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gZml4RXh0cmVtZXMobG8sIGhpKSB7XG4gICAgaWYoaXNOYU4obG8pIHx8ICFpc0Zpbml0ZShsbykpIHtcbiAgICAgICAgbG8gPSAwO1xuICAgIH1cblxuICAgIGlmKGlzTmFOKGhpKSB8fCAhaXNGaW5pdGUoaGkpKSB7XG4gICAgICAgIGhpID0gMDtcbiAgICB9XG5cbiAgICAvLyBhdm9pZCBhIGRlZ2VuZXJhdGUgKHplcm8td2lkdGgpIGRvbWFpblxuICAgIGlmKGxvID09PSBoaSkge1xuICAgICAgICBpZihsbyA9PT0gMCkge1xuICAgICAgICAgICAgLy8gbm8gdXNlIHRvIG11bHRpcGx5aW5nIHplcm8sIHNvIGFkZC9zdWJ0cmFjdCBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgIGxvIC09IDE7XG4gICAgICAgICAgICBoaSArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyBrZWVwcyB0aGUgcmFuZ2UgaW4gdGhlIG9yZGVyIG9mIG1hZ25pdHVkZSBvZiB0aGUgZGF0YVxuICAgICAgICAgICAgbG8gKj0gMC45O1xuICAgICAgICAgICAgaGkgKj0gMS4xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFtsbywgaGldO1xufVxuXG5mdW5jdGlvbiB0b1RleHQoZm9ybWF0dGVyLCB0ZXh0cykge1xuICAgIGlmKHRleHRzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2LCBpKSB7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IHRleHRzW2ldO1xuICAgICAgICAgICAgaWYodGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWQpIHJldHVybiBmb3JtYXR0ZXIodik7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdHRlcjtcbn1cblxuZnVuY3Rpb24gZG9tYWluU2NhbGUoaGVpZ2h0LCBwYWRkaW5nLCBkaW1lbnNpb24sIHRpY2t2YWxzLCB0aWNrdGV4dCkge1xuICAgIHZhciBleHRlbnQgPSBkaW1lbnNpb25FeHRlbnQoZGltZW5zaW9uKTtcbiAgICBpZih0aWNrdmFscykge1xuICAgICAgICByZXR1cm4gZDMuc2NhbGUub3JkaW5hbCgpXG4gICAgICAgICAgICAuZG9tYWluKHRpY2t2YWxzLm1hcCh0b1RleHQoZDMuZm9ybWF0KGRpbWVuc2lvbi50aWNrZm9ybWF0KSwgdGlja3RleHQpKSlcbiAgICAgICAgICAgIC5yYW5nZSh0aWNrdmFsc1xuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdW5pdFZhbCA9IChkIC0gZXh0ZW50WzBdKSAvIChleHRlbnRbMV0gLSBleHRlbnRbMF0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGhlaWdodCAtIHBhZGRpbmcgKyB1bml0VmFsICogKDIgKiBwYWRkaW5nIC0gaGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAuZG9tYWluKGV4dGVudClcbiAgICAgICAgLnJhbmdlKFtoZWlnaHQgLSBwYWRkaW5nLCBwYWRkaW5nXSk7XG59XG5cbmZ1bmN0aW9uIHVuaXRUb1BhZGRlZFB4KGhlaWdodCwgcGFkZGluZykge1xuICAgIHJldHVybiBkMy5zY2FsZS5saW5lYXIoKS5yYW5nZShbcGFkZGluZywgaGVpZ2h0IC0gcGFkZGluZ10pO1xufVxuXG5mdW5jdGlvbiBkb21haW5Ub1BhZGRlZFVuaXRTY2FsZShkaW1lbnNpb24sIHBhZEZyYWN0aW9uKSB7XG4gICAgcmV0dXJuIGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgIC5kb21haW4oZGltZW5zaW9uRXh0ZW50KGRpbWVuc2lvbikpXG4gICAgICAgIC5yYW5nZShbcGFkRnJhY3Rpb24sIDEgLSBwYWRGcmFjdGlvbl0pO1xufVxuXG5mdW5jdGlvbiBvcmRpbmFsU2NhbGUoZGltZW5zaW9uKSB7XG4gICAgaWYoIWRpbWVuc2lvbi50aWNrdmFscykgcmV0dXJuO1xuXG4gICAgdmFyIGV4dGVudCA9IGRpbWVuc2lvbkV4dGVudChkaW1lbnNpb24pO1xuICAgIHJldHVybiBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAgICAgLmRvbWFpbihkaW1lbnNpb24udGlja3ZhbHMpXG4gICAgICAgIC5yYW5nZShkaW1lbnNpb24udGlja3ZhbHMubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiAoZCAtIGV4dGVudFswXSkgLyAoZXh0ZW50WzFdIC0gZXh0ZW50WzBdKTtcbiAgICAgICAgfSkpO1xufVxuXG5mdW5jdGlvbiB1bml0VG9Db2xvclNjYWxlKGNzY2FsZSkge1xuICAgIHZhciBjb2xvclN0b3BzID0gY3NjYWxlLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkWzBdOyB9KTtcbiAgICB2YXIgY29sb3JUdXBsZXMgPSBjc2NhbGUubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIFJHQkEgPSByZ2JhKGRbMV0pO1xuICAgICAgICByZXR1cm4gZDMucmdiKCdyZ2IoJyArIFJHQkFbMF0gKyAnLCcgKyBSR0JBWzFdICsgJywnICsgUkdCQVsyXSArICcpJyk7XG4gICAgfSk7XG4gICAgdmFyIHByb3AgPSBmdW5jdGlvbihuKSB7IHJldHVybiBmdW5jdGlvbihvKSB7IHJldHVybiBvW25dOyB9OyB9O1xuXG4gICAgLy8gV2UgY2FuJ3QgdXNlIGQzIGNvbG9yIGludGVycG9sYXRpb24gYXMgd2UgbWF5IGhhdmUgbm9uLXVuaWZvcm0gY29sb3IgcGFsZXR0ZSByYXN0ZXJcbiAgICAvLyAodmFyaW91cyBjb2xvciBzdG9wIGRpc3RhbmNlcykuXG4gICAgdmFyIHBvbHlsaW5lYXJVbml0U2NhbGVzID0gJ3JnYicuc3BsaXQoJycpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAuY2xhbXAodHJ1ZSlcbiAgICAgICAgICAgIC5kb21haW4oY29sb3JTdG9wcylcbiAgICAgICAgICAgIC5yYW5nZShjb2xvclR1cGxlcy5tYXAocHJvcChrZXkpKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gcG9seWxpbmVhclVuaXRTY2FsZXMubWFwKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzKGQpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzb21lRmlsdGVyc0FjdGl2ZSh2aWV3KSB7XG4gICAgcmV0dXJuIHZpZXcuZGltZW5zaW9ucy5zb21lKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgcmV0dXJuIHAuYnJ1c2guZmlsdGVyU3BlY2lmaWVkO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBtb2RlbChsYXlvdXQsIGQsIGkpIHtcbiAgICB2YXIgY2QwID0gdW53cmFwKGQpO1xuICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcbiAgICB2YXIgbGluZUNvbG9yID0gaGVscGVycy5jb252ZXJ0VHlwZWRBcnJheShjZDAubGluZUNvbG9yKTtcbiAgICB2YXIgbGluZSA9IHRyYWNlLmxpbmU7XG4gICAgdmFyIGRlc2VsZWN0ZWRMaW5lcyA9IHtjb2xvcjogcmdiYShjLmRlc2VsZWN0ZWRMaW5lQ29sb3IpfTtcbiAgICB2YXIgY09wdHMgPSBDb2xvcnNjYWxlLmV4dHJhY3RPcHRzKGxpbmUpO1xuICAgIHZhciBjc2NhbGUgPSBjT3B0cy5yZXZlcnNlc2NhbGUgPyBDb2xvcnNjYWxlLmZsaXBTY2FsZShjZDAuY3NjYWxlKSA6IGNkMC5jc2NhbGU7XG4gICAgdmFyIGRvbWFpbiA9IHRyYWNlLmRvbWFpbjtcbiAgICB2YXIgZGltZW5zaW9ucyA9IHRyYWNlLmRpbWVuc2lvbnM7XG4gICAgdmFyIHdpZHRoID0gbGF5b3V0LndpZHRoO1xuICAgIHZhciBsYWJlbEFuZ2xlID0gdHJhY2UubGFiZWxhbmdsZTtcbiAgICB2YXIgbGFiZWxTaWRlID0gdHJhY2UubGFiZWxzaWRlO1xuICAgIHZhciBsYWJlbEZvbnQgPSB0cmFjZS5sYWJlbGZvbnQ7XG4gICAgdmFyIHRpY2tGb250ID0gdHJhY2UudGlja2ZvbnQ7XG4gICAgdmFyIHJhbmdlRm9udCA9IHRyYWNlLnJhbmdlZm9udDtcblxuICAgIHZhciBsaW5lcyA9IExpYi5leHRlbmREZWVwTm9BcnJheXMoe30sIGxpbmUsIHtcbiAgICAgICAgY29sb3I6IGxpbmVDb2xvci5tYXAoZDMuc2NhbGUubGluZWFyKCkuZG9tYWluKFxuICAgICAgICAgICAgZGltZW5zaW9uRXh0ZW50KHtcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IGxpbmVDb2xvcixcbiAgICAgICAgICAgICAgICByYW5nZTogW2NPcHRzLm1pbiwgY09wdHMubWF4XSxcbiAgICAgICAgICAgICAgICBfbGVuZ3RoOiB0cmFjZS5fbGVuZ3RoXG4gICAgICAgICAgICB9KVxuICAgICAgICApKSxcbiAgICAgICAgYmxvY2tMaW5lQ291bnQ6IGMuYmxvY2tMaW5lQ291bnQsXG4gICAgICAgIGNhbnZhc092ZXJkcmFnOiBjLm92ZXJkcmFnICogYy5jYW52YXNQaXhlbFJhdGlvXG4gICAgfSk7XG5cbiAgICB2YXIgZ3JvdXBXaWR0aCA9IE1hdGguZmxvb3Iod2lkdGggKiAoZG9tYWluLnhbMV0gLSBkb21haW4ueFswXSkpO1xuICAgIHZhciBncm91cEhlaWdodCA9IE1hdGguZmxvb3IobGF5b3V0LmhlaWdodCAqIChkb21haW4ueVsxXSAtIGRvbWFpbi55WzBdKSk7XG5cbiAgICB2YXIgcGFkID0gbGF5b3V0Lm1hcmdpbiB8fCB7bDogODAsIHI6IDgwLCB0OiAxMDAsIGI6IDgwfTtcbiAgICB2YXIgcm93Q29udGVudFdpZHRoID0gZ3JvdXBXaWR0aDtcbiAgICB2YXIgcm93SGVpZ2h0ID0gZ3JvdXBIZWlnaHQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGksXG4gICAgICAgIGNvbENvdW50OiBkaW1lbnNpb25zLmZpbHRlcihoZWxwZXJzLmlzVmlzaWJsZSkubGVuZ3RoLFxuICAgICAgICBkaW1lbnNpb25zOiBkaW1lbnNpb25zLFxuICAgICAgICB0aWNrRGlzdGFuY2U6IGMudGlja0Rpc3RhbmNlLFxuICAgICAgICB1bml0VG9Db2xvcjogdW5pdFRvQ29sb3JTY2FsZShjc2NhbGUpLFxuICAgICAgICBsaW5lczogbGluZXMsXG4gICAgICAgIGRlc2VsZWN0ZWRMaW5lczogZGVzZWxlY3RlZExpbmVzLFxuICAgICAgICBsYWJlbEFuZ2xlOiBsYWJlbEFuZ2xlLFxuICAgICAgICBsYWJlbFNpZGU6IGxhYmVsU2lkZSxcbiAgICAgICAgbGFiZWxGb250OiBsYWJlbEZvbnQsXG4gICAgICAgIHRpY2tGb250OiB0aWNrRm9udCxcbiAgICAgICAgcmFuZ2VGb250OiByYW5nZUZvbnQsXG4gICAgICAgIGxheW91dFdpZHRoOiB3aWR0aCxcbiAgICAgICAgbGF5b3V0SGVpZ2h0OiBsYXlvdXQuaGVpZ2h0LFxuICAgICAgICBkb21haW46IGRvbWFpbixcbiAgICAgICAgdHJhbnNsYXRlWDogZG9tYWluLnhbMF0gKiB3aWR0aCxcbiAgICAgICAgdHJhbnNsYXRlWTogbGF5b3V0LmhlaWdodCAtIGRvbWFpbi55WzFdICogbGF5b3V0LmhlaWdodCxcbiAgICAgICAgcGFkOiBwYWQsXG4gICAgICAgIGNhbnZhc1dpZHRoOiByb3dDb250ZW50V2lkdGggKiBjLmNhbnZhc1BpeGVsUmF0aW8gKyAyICogbGluZXMuY2FudmFzT3ZlcmRyYWcsXG4gICAgICAgIGNhbnZhc0hlaWdodDogcm93SGVpZ2h0ICogYy5jYW52YXNQaXhlbFJhdGlvLFxuICAgICAgICB3aWR0aDogcm93Q29udGVudFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IHJvd0hlaWdodCxcbiAgICAgICAgY2FudmFzUGl4ZWxSYXRpbzogYy5jYW52YXNQaXhlbFJhdGlvXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdmlld01vZGVsKHN0YXRlLCBjYWxsYmFja3MsIG1vZGVsKSB7XG4gICAgdmFyIHdpZHRoID0gbW9kZWwud2lkdGg7XG4gICAgdmFyIGhlaWdodCA9IG1vZGVsLmhlaWdodDtcbiAgICB2YXIgZGltZW5zaW9ucyA9IG1vZGVsLmRpbWVuc2lvbnM7XG4gICAgdmFyIGNhbnZhc1BpeGVsUmF0aW8gPSBtb2RlbC5jYW52YXNQaXhlbFJhdGlvO1xuXG4gICAgdmFyIHhTY2FsZSA9IGZ1bmN0aW9uKGQpIHtyZXR1cm4gd2lkdGggKiBkIC8gTWF0aC5tYXgoMSwgbW9kZWwuY29sQ291bnQgLSAxKTt9O1xuXG4gICAgdmFyIHVuaXRQYWQgPSBjLnZlcnRpY2FsUGFkZGluZyAvIGhlaWdodDtcbiAgICB2YXIgX3VuaXRUb1BhZGRlZFB4ID0gdW5pdFRvUGFkZGVkUHgoaGVpZ2h0LCBjLnZlcnRpY2FsUGFkZGluZyk7XG5cbiAgICB2YXIgdm0gPSB7XG4gICAgICAgIGtleTogbW9kZWwua2V5LFxuICAgICAgICB4U2NhbGU6IHhTY2FsZSxcbiAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICBpbkJydXNoRHJhZzogZmFsc2UgLy8gY29uc2lkZXIgZmFjdG9yaW5nIGl0IG91dCBhbmQgcHV0dGluZyBpdCBpbiBhIGNlbnRyYWxpemVkIGdsb2JhbC1pc2ggZ2VzdHVyZSBzdGF0ZSBvYmplY3RcbiAgICB9O1xuXG4gICAgdmFyIHVuaXF1ZUtleXMgPSB7fTtcblxuICAgIHZtLmRpbWVuc2lvbnMgPSBkaW1lbnNpb25zLmZpbHRlcihoZWxwZXJzLmlzVmlzaWJsZSkubWFwKGZ1bmN0aW9uKGRpbWVuc2lvbiwgaSkge1xuICAgICAgICB2YXIgZG9tYWluVG9QYWRkZWRVbml0ID0gZG9tYWluVG9QYWRkZWRVbml0U2NhbGUoZGltZW5zaW9uLCB1bml0UGFkKTtcbiAgICAgICAgdmFyIGZvdW5kS2V5ID0gdW5pcXVlS2V5c1tkaW1lbnNpb24ubGFiZWxdO1xuICAgICAgICB1bmlxdWVLZXlzW2RpbWVuc2lvbi5sYWJlbF0gPSAoZm91bmRLZXkgfHwgMCkgKyAxO1xuICAgICAgICB2YXIga2V5ID0gZGltZW5zaW9uLmxhYmVsICsgKGZvdW5kS2V5ID8gJ19fJyArIGZvdW5kS2V5IDogJycpO1xuICAgICAgICB2YXIgc3BlY2lmaWVkQ29uc3RyYWludCA9IGRpbWVuc2lvbi5jb25zdHJhaW50cmFuZ2U7XG4gICAgICAgIHZhciBmaWx0ZXJSYW5nZVNwZWNpZmllZCA9IHNwZWNpZmllZENvbnN0cmFpbnQgJiYgc3BlY2lmaWVkQ29uc3RyYWludC5sZW5ndGg7XG4gICAgICAgIGlmKGZpbHRlclJhbmdlU3BlY2lmaWVkICYmICFBcnJheS5pc0FycmF5KHNwZWNpZmllZENvbnN0cmFpbnRbMF0pKSB7XG4gICAgICAgICAgICBzcGVjaWZpZWRDb25zdHJhaW50ID0gW3NwZWNpZmllZENvbnN0cmFpbnRdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaWx0ZXJSYW5nZSA9IGZpbHRlclJhbmdlU3BlY2lmaWVkID9cbiAgICAgICAgICAgIHNwZWNpZmllZENvbnN0cmFpbnQubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubWFwKGRvbWFpblRvUGFkZGVkVW5pdCk7IH0pIDpcbiAgICAgICAgICAgIFtbLUluZmluaXR5LCBJbmZpbml0eV1dO1xuICAgICAgICB2YXIgYnJ1c2hNb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcCA9IHZtO1xuICAgICAgICAgICAgcC5mb2N1c0xheWVyICYmIHAuZm9jdXNMYXllci5yZW5kZXIocC5wYW5lbHMsIHRydWUpO1xuICAgICAgICAgICAgdmFyIGZpbHRlcnNBY3RpdmUgPSBzb21lRmlsdGVyc0FjdGl2ZShwKTtcbiAgICAgICAgICAgIGlmKCFzdGF0ZS5jb250ZXh0U2hvd24oKSAmJiBmaWx0ZXJzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcC5jb250ZXh0TGF5ZXIgJiYgcC5jb250ZXh0TGF5ZXIucmVuZGVyKHAucGFuZWxzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5jb250ZXh0U2hvd24odHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoc3RhdGUuY29udGV4dFNob3duKCkgJiYgIWZpbHRlcnNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBwLmNvbnRleHRMYXllciAmJiBwLmNvbnRleHRMYXllci5yZW5kZXIocC5wYW5lbHMsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIHN0YXRlLmNvbnRleHRTaG93bihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRydW5jYXRlZFZhbHVlcyA9IGRpbWVuc2lvbi52YWx1ZXM7XG4gICAgICAgIGlmKHRydW5jYXRlZFZhbHVlcy5sZW5ndGggPiBkaW1lbnNpb24uX2xlbmd0aCkge1xuICAgICAgICAgICAgdHJ1bmNhdGVkVmFsdWVzID0gdHJ1bmNhdGVkVmFsdWVzLnNsaWNlKDAsIGRpbWVuc2lvbi5fbGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0aWNrdmFscyA9IGRpbWVuc2lvbi50aWNrdmFscztcbiAgICAgICAgdmFyIHRpY2t0ZXh0O1xuICAgICAgICBmdW5jdGlvbiBtYWtlVGlja0l0ZW0odiwgaSkgeyByZXR1cm4ge3ZhbDogdiwgdGV4dDogdGlja3RleHRbaV19OyB9XG4gICAgICAgIGZ1bmN0aW9uIHNvcnRUaWNrSXRlbShhLCBiKSB7IHJldHVybiBhLnZhbCAtIGIudmFsOyB9XG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkodGlja3ZhbHMpICYmIHRpY2t2YWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGlja3RleHQgPSBkaW1lbnNpb24udGlja3RleHQ7XG5cbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aWNrdGV4dCBhbmQgdGlja3ZhbHMgaGF2ZSBzYW1lIGxlbmd0aFxuICAgICAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkodGlja3RleHQpIHx8ICF0aWNrdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aWNrdGV4dCA9IHRpY2t2YWxzLm1hcChkMy5mb3JtYXQoZGltZW5zaW9uLnRpY2tmb3JtYXQpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aWNrdGV4dC5sZW5ndGggPiB0aWNrdmFscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aWNrdGV4dCA9IHRpY2t0ZXh0LnNsaWNlKDAsIHRpY2t2YWxzLmxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGlja3ZhbHMubGVuZ3RoID4gdGlja3RleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGlja3ZhbHMgPSB0aWNrdmFscy5zbGljZSgwLCB0aWNrdGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBuZWVkIHRvIHNvcnQgdGlja3ZhbHMvdGlja3RleHRcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCB0aWNrdmFscy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmKHRpY2t2YWxzW2pdIDwgdGlja3ZhbHNbaiAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aWNrSXRlbXMgPSB0aWNrdmFscy5tYXAobWFrZVRpY2tJdGVtKS5zb3J0KHNvcnRUaWNrSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgayA9IDA7IGsgPCB0aWNrdmFscy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlja3ZhbHNba10gPSB0aWNrSXRlbXNba10udmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlja3RleHRba10gPSB0aWNrSXRlbXNba10udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB0aWNrdmFscyA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0cnVuY2F0ZWRWYWx1ZXMgPSBoZWxwZXJzLmNvbnZlcnRUeXBlZEFycmF5KHRydW5jYXRlZFZhbHVlcyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgbGFiZWw6IGRpbWVuc2lvbi5sYWJlbCxcbiAgICAgICAgICAgIHRpY2tGb3JtYXQ6IGRpbWVuc2lvbi50aWNrZm9ybWF0LFxuICAgICAgICAgICAgdGlja3ZhbHM6IHRpY2t2YWxzLFxuICAgICAgICAgICAgdGlja3RleHQ6IHRpY2t0ZXh0LFxuICAgICAgICAgICAgb3JkaW5hbDogaGVscGVycy5pc09yZGluYWwoZGltZW5zaW9uKSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiBkaW1lbnNpb24ubXVsdGlzZWxlY3QsXG4gICAgICAgICAgICB4SW5kZXg6IGksXG4gICAgICAgICAgICBjcm9zc2ZpbHRlckRpbWVuc2lvbkluZGV4OiBpLFxuICAgICAgICAgICAgdmlzaWJsZUluZGV4OiBkaW1lbnNpb24uX2luZGV4LFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICB2YWx1ZXM6IHRydW5jYXRlZFZhbHVlcyxcbiAgICAgICAgICAgIHBhZGRlZFVuaXRWYWx1ZXM6IHRydW5jYXRlZFZhbHVlcy5tYXAoZG9tYWluVG9QYWRkZWRVbml0KSxcbiAgICAgICAgICAgIHVuaXRUaWNrdmFsczogdGlja3ZhbHMgJiYgdGlja3ZhbHMubWFwKGRvbWFpblRvUGFkZGVkVW5pdCksXG4gICAgICAgICAgICB4U2NhbGU6IHhTY2FsZSxcbiAgICAgICAgICAgIHg6IHhTY2FsZShpKSxcbiAgICAgICAgICAgIGNhbnZhc1g6IHhTY2FsZShpKSAqIGNhbnZhc1BpeGVsUmF0aW8sXG4gICAgICAgICAgICB1bml0VG9QYWRkZWRQeDogX3VuaXRUb1BhZGRlZFB4LFxuICAgICAgICAgICAgZG9tYWluU2NhbGU6IGRvbWFpblNjYWxlKGhlaWdodCwgYy52ZXJ0aWNhbFBhZGRpbmcsIGRpbWVuc2lvbiwgdGlja3ZhbHMsIHRpY2t0ZXh0KSxcbiAgICAgICAgICAgIG9yZGluYWxTY2FsZTogb3JkaW5hbFNjYWxlKGRpbWVuc2lvbiksXG4gICAgICAgICAgICBwYXJlbnQ6IHZtLFxuICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgYnJ1c2g6IGJydXNoLm1ha2VCcnVzaChcbiAgICAgICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJSYW5nZVNwZWNpZmllZCxcbiAgICAgICAgICAgICAgICBmaWx0ZXJSYW5nZSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUubGluZVBpY2tBY3RpdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnJ1c2hNb3ZlLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICAgICAgICAgICAgdm0uZm9jdXNMYXllci5yZW5kZXIodm0ucGFuZWxzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdm0ucGlja0xheWVyICYmIHZtLnBpY2tMYXllci5yZW5kZXIodm0ucGFuZWxzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUubGluZVBpY2tBY3RpdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrcyAmJiBjYWxsYmFja3MuZmlsdGVyQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGludlNjYWxlID0gZG9tYWluVG9QYWRkZWRVbml0LmludmVydDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIGdkLmRhdGEgYXMgaWYgYSBQbG90bHkucmVzdHlsZSB3ZXJlIGZpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UmFuZ2VzID0gZi5tYXAoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByLm1hcChpbnZTY2FsZSkuc29ydChMaWIuc29ydGVyQXNjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYVswXSAtIGJbMF07IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLmZpbHRlckNoYW5nZWQodm0ua2V5LCBkaW1lbnNpb24uX2luZGV4LCBuZXdSYW5nZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZtO1xufVxuXG5mdW5jdGlvbiBzdHlsZUV4dGVudFRleHRzKHNlbGVjdGlvbikge1xuICAgIHNlbGVjdGlvblxuICAgICAgICAuY2xhc3NlZChjLmNuLmF4aXNFeHRlbnRUZXh0LCB0cnVlKVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgLnN0eWxlKCdjdXJzb3InLCAnZGVmYXVsdCcpXG4gICAgICAgIC5zdHlsZSgndXNlci1zZWxlY3QnLCAnbm9uZScpO1xufVxuXG5mdW5jdGlvbiBwYXJjb29yZHNJbnRlcmFjdGlvblN0YXRlKCkge1xuICAgIHZhciBsaW5lUGlja0FjdGl2ZSA9IHRydWU7XG4gICAgdmFyIGNvbnRleHRTaG93biA9IGZhbHNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxpbmVQaWNrQWN0aXZlOiBmdW5jdGlvbih2YWwpIHtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IGxpbmVQaWNrQWN0aXZlID0gISF2YWwgOiBsaW5lUGlja0FjdGl2ZTt9LFxuICAgICAgICBjb250ZXh0U2hvd246IGZ1bmN0aW9uKHZhbCkge3JldHVybiBhcmd1bWVudHMubGVuZ3RoID8gY29udGV4dFNob3duID0gISF2YWwgOiBjb250ZXh0U2hvd247fVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNhbGNUaWx0KGFuZ2xlLCBwb3NpdGlvbikge1xuICAgIHZhciBkaXIgPSAocG9zaXRpb24gPT09ICd0b3AnKSA/IDEgOiAtMTtcbiAgICB2YXIgcmFkaWFucyA9IGFuZ2xlICogTWF0aC5QSSAvIDE4MDtcbiAgICB2YXIgZHggPSBNYXRoLnNpbihyYWRpYW5zKTtcbiAgICB2YXIgZHkgPSBNYXRoLmNvcyhyYWRpYW5zKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgZHg6IGR4LFxuICAgICAgICBkeTogZHksXG4gICAgICAgIGRlZ3JlZXM6IGFuZ2xlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUGFuZWxMYXlvdXQoeUF4aXMsIHZtKSB7XG4gICAgdmFyIHBhbmVscyA9IHZtLnBhbmVscyB8fCAodm0ucGFuZWxzID0gW10pO1xuICAgIHZhciBkYXRhID0geUF4aXMuZGF0YSgpO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB2YXIgcCA9IHBhbmVsc1tpXSB8fCAocGFuZWxzW2ldID0ge30pO1xuICAgICAgICB2YXIgZGltMCA9IGRhdGFbaV07XG4gICAgICAgIHZhciBkaW0xID0gZGF0YVtpICsgMV07XG4gICAgICAgIHAuZGltMCA9IGRpbTA7XG4gICAgICAgIHAuZGltMSA9IGRpbTE7XG4gICAgICAgIHAuY2FudmFzWCA9IGRpbTAuY2FudmFzWDtcbiAgICAgICAgcC5wYW5lbFNpemVYID0gZGltMS5jYW52YXNYIC0gZGltMC5jYW52YXNYO1xuICAgICAgICBwLnBhbmVsU2l6ZVkgPSB2bS5tb2RlbC5jYW52YXNIZWlnaHQ7XG4gICAgICAgIHAueSA9IDA7XG4gICAgICAgIHAuY2FudmFzWSA9IDA7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxjQWxsVGlja3MoY2QpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGNkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2UgPSBjZFtpXVtqXS50cmFjZTtcbiAgICAgICAgICAgIHZhciBkaW1lbnNpb25zID0gdHJhY2UuZGltZW5zaW9ucztcblxuICAgICAgICAgICAgZm9yKHZhciBrID0gMDsgayA8IGRpbWVuc2lvbnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gZGltZW5zaW9uc1trXS52YWx1ZXM7XG4gICAgICAgICAgICAgICAgdmFyIGRpbSA9IGRpbWVuc2lvbnNba10uX2F4O1xuXG4gICAgICAgICAgICAgICAgaWYoZGltKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkaW0ucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpbS5yYW5nZSA9IGZpbmRFeHRyZW1lcyh2YWx1ZXMsIHRyYWNlLl9sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGltLnJhbmdlID0gZml4RXh0cmVtZXMoZGltLnJhbmdlWzBdLCBkaW0ucmFuZ2VbMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIWRpbS5kdGljaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGltLmR0aWNrID0gMC4wMSAqIChNYXRoLmFicyhkaW0ucmFuZ2VbMV0gLSBkaW0ucmFuZ2VbMF0pIHx8IDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGltLnRpY2tmb3JtYXQgPSBkaW1lbnNpb25zW2tdLnRpY2tmb3JtYXQ7XG4gICAgICAgICAgICAgICAgICAgIEF4ZXMuY2FsY1RpY2tzKGRpbSk7XG4gICAgICAgICAgICAgICAgICAgIGRpbS5jbGVhblJhbmdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsaW5lYXJGb3JtYXQoZGltLCB2KSB7XG4gICAgcmV0dXJuIEF4ZXMudGlja1RleHQoZGltLl9heCwgdiwgZmFsc2UpLnRleHQ7XG59XG5cbmZ1bmN0aW9uIGV4dHJlbWVUZXh0KGQsIGlzVG9wKSB7XG4gICAgaWYoZC5vcmRpbmFsKSByZXR1cm4gJyc7XG4gICAgdmFyIGRvbWFpbiA9IGQuZG9tYWluU2NhbGUuZG9tYWluKCk7XG4gICAgdmFyIHYgPSAoZG9tYWluW2lzVG9wID8gZG9tYWluLmxlbmd0aCAtIDEgOiAwXSk7XG5cbiAgICByZXR1cm4gbGluZWFyRm9ybWF0KGQubW9kZWwuZGltZW5zaW9uc1tkLnZpc2libGVJbmRleF0sIHYpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyY29vcmRzKGdkLCBjZE1vZHVsZSwgbGF5b3V0LCBjYWxsYmFja3MpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBzdmcgPSBmdWxsTGF5b3V0Ll90b3BwYXBlcjtcbiAgICB2YXIgZ2xDb250YWluZXIgPSBmdWxsTGF5b3V0Ll9nbGNvbnRhaW5lcjtcblxuICAgIGNhbGNBbGxUaWNrcyhjZE1vZHVsZSk7XG5cbiAgICB2YXIgc3RhdGUgPSBwYXJjb29yZHNJbnRlcmFjdGlvblN0YXRlKCk7XG5cbiAgICB2YXIgdm0gPSBjZE1vZHVsZVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHVud3JhcChkKS50cmFjZS52aXNpYmxlOyB9KVxuICAgICAgICAubWFwKG1vZGVsLmJpbmQoMCwgbGF5b3V0KSlcbiAgICAgICAgLm1hcCh2aWV3TW9kZWwuYmluZCgwLCBzdGF0ZSwgY2FsbGJhY2tzKSk7XG5cbiAgICBnbENvbnRhaW5lci5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIExpYi5leHRlbmRGbGF0KGQsIHZtW2ldKTtcbiAgICB9KTtcblxuICAgIHZhciBnbExheWVycyA9IGdsQ29udGFpbmVyLnNlbGVjdEFsbCgnLmdsLWNhbnZhcycpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIC8vIEZJWE1FOiBmaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgbXVsdGlwbGUgaW5zdGFuY2VzXG4gICAgICAgICAgICBkLnZpZXdNb2RlbCA9IHZtWzBdO1xuICAgICAgICAgICAgZC5tb2RlbCA9IGQudmlld01vZGVsID8gZC52aWV3TW9kZWwubW9kZWwgOiBudWxsO1xuICAgICAgICB9KTtcblxuICAgIHZhciBsYXN0SG92ZXJlZCA9IG51bGw7XG5cbiAgICB2YXIgcGlja0xheWVyID0gZ2xMYXllcnMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5waWNrO30pO1xuXG4gICAgLy8gZW1pdCBob3ZlciAvIHVuaG92ZXIgZXZlbnRcbiAgICBwaWNrTGF5ZXJcbiAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJylcbiAgICAgICAgLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBpZihzdGF0ZS5saW5lUGlja0FjdGl2ZSgpICYmIGQubGluZUxheWVyICYmIGNhbGxiYWNrcyAmJiBjYWxsYmFja3MuaG92ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgICAgICAgICB2YXIgY3cgPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHZhciBwb2ludGVyID0gZDMubW91c2UodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBwb2ludGVyWzBdO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gcG9pbnRlclsxXTtcblxuICAgICAgICAgICAgICAgIGlmKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gY3cgfHwgeSA+PSBjaCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwaXhlbCA9IGQubGluZUxheWVyLnJlYWRQaXhlbCh4LCBjaCAtIDEgLSB5KTtcbiAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBwaXhlbFszXSAhPT0gMDtcbiAgICAgICAgICAgICAgICAvLyBpbnZlcnNlIG9mIHRoZSBjYWxjUGlja0NvbG9yIGluIGBsaW5lcy5qc2A7IGRldGFpbGVkIGNvbW1lbnQgdGhlcmVcbiAgICAgICAgICAgICAgICB2YXIgY3VydmVOdW1iZXIgPSBmb3VuZCA/IHBpeGVsWzJdICsgMjU2ICogKHBpeGVsWzFdICsgMjU2ICogcGl4ZWxbMF0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRYOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICBkYXRhSW5kZXg6IGQubW9kZWwua2V5LFxuICAgICAgICAgICAgICAgICAgICBjdXJ2ZU51bWJlcjogY3VydmVOdW1iZXJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmKGN1cnZlTnVtYmVyICE9PSBsYXN0SG92ZXJlZCkgeyAvLyBkb24ndCB1bm5lY2Vzc2FyaWx5IHJlcGVhdCB0aGUgc2FtZSBoaXQgKG9yIG1pc3MpXG4gICAgICAgICAgICAgICAgICAgIGlmKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MuaG92ZXIoZXZlbnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNhbGxiYWNrcy51bmhvdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3MudW5ob3ZlcihldmVudERhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxhc3RIb3ZlcmVkID0gY3VydmVOdW1iZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIGdsTGF5ZXJzXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5waWNrID8gMCA6IDE7fSk7XG5cbiAgICBzdmcuc3R5bGUoJ2JhY2tncm91bmQnLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwKScpO1xuICAgIHZhciBjb250cm9sT3ZlcmxheSA9IHN2Zy5zZWxlY3RBbGwoJy4nICsgYy5jbi5wYXJjb29yZHMpXG4gICAgICAgIC5kYXRhKHZtLCBrZXlGdW4pO1xuXG4gICAgY29udHJvbE92ZXJsYXkuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgY29udHJvbE92ZXJsYXkuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5wYXJjb29yZHMsIHRydWUpXG4gICAgICAgIC5zdHlsZSgnc2hhcGUtcmVuZGVyaW5nJywgJ2NyaXNwRWRnZXMnKVxuICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblxuICAgIGNvbnRyb2xPdmVybGF5LmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQubW9kZWwudHJhbnNsYXRlWCArICcsJyArIGQubW9kZWwudHJhbnNsYXRlWSArICcpJztcbiAgICB9KTtcblxuICAgIHZhciBwYXJjb29yZHNDb250cm9sVmlldyA9IGNvbnRyb2xPdmVybGF5LnNlbGVjdEFsbCgnLicgKyBjLmNuLnBhcmNvb3Jkc0NvbnRyb2xWaWV3KVxuICAgICAgICAuZGF0YShyZXBlYXQsIGtleUZ1bik7XG5cbiAgICBwYXJjb29yZHNDb250cm9sVmlldy5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLnBhcmNvb3Jkc0NvbnRyb2xWaWV3LCB0cnVlKTtcblxuICAgIHBhcmNvb3Jkc0NvbnRyb2xWaWV3LmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQubW9kZWwucGFkLmwgKyAnLCcgKyBkLm1vZGVsLnBhZC50ICsgJyknO1xuICAgIH0pO1xuXG4gICAgdmFyIHlBeGlzID0gcGFyY29vcmRzQ29udHJvbFZpZXcuc2VsZWN0QWxsKCcuJyArIGMuY24ueUF4aXMpXG4gICAgICAgIC5kYXRhKGZ1bmN0aW9uKHApIHsgcmV0dXJuIHAuZGltZW5zaW9uczsgfSwga2V5RnVuKTtcblxuICAgIHlBeGlzLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24ueUF4aXMsIHRydWUpO1xuXG4gICAgcGFyY29vcmRzQ29udHJvbFZpZXcuZWFjaChmdW5jdGlvbihwKSB7XG4gICAgICAgIHVwZGF0ZVBhbmVsTGF5b3V0KHlBeGlzLCBwKTtcbiAgICB9KTtcblxuICAgIGdsTGF5ZXJzXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGlmKGQudmlld01vZGVsKSB7XG4gICAgICAgICAgICAgICAgaWYoIWQubGluZUxheWVyIHx8IGNhbGxiYWNrcykgeyAvLyByZWNyZWF0ZSBpbiBjYXNlIG9mIGhhdmluZyBjYWxsYmFja3MgZS5nLiByZXN0eWxlLiBTaG91bGQgd2UgdGVzdCBmb3IgY2FsbGJhY2sgdG8gYmUgYSByZXN0eWxlP1xuICAgICAgICAgICAgICAgICAgICBkLmxpbmVMYXllciA9IGxpbmVMYXllck1ha2VyKHRoaXMsIGQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBkLmxpbmVMYXllci51cGRhdGUoZCk7XG5cbiAgICAgICAgICAgICAgICBpZihkLmtleSB8fCBkLmtleSA9PT0gMCkgZC52aWV3TW9kZWxbZC5rZXldID0gZC5saW5lTGF5ZXI7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2V0Q2hhbmdlZCA9ICghZC5jb250ZXh0IHx8IC8vIGRvbid0IHVwZGF0ZSBiYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzKTsgICAvLyB1bmxlc3MgdGhlcmUgaXMgYSBjYWxsYmFjayBvbiB0aGUgY29udGV4dCBsYXllci4gU2hvdWxkIHdlIHRlc3QgdGhlIGNhbGxiYWNrP1xuXG4gICAgICAgICAgICAgICAgZC5saW5lTGF5ZXIucmVuZGVyKGQudmlld01vZGVsLnBhbmVscywgc2V0Q2hhbmdlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgeUF4aXMuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54U2NhbGUoZC54SW5kZXgpICsgJywgMCknO1xuICAgIH0pO1xuXG4gICAgLy8gZHJhZyBjb2x1bW4gZm9yIHJlb3JkZXJpbmcgY29sdW1uc1xuICAgIHlBeGlzLmNhbGwoZDMuYmVoYXZpb3IuZHJhZygpXG4gICAgICAgIC5vcmlnaW4oZnVuY3Rpb24oZCkgeyByZXR1cm4gZDsgfSlcbiAgICAgICAgLm9uKCdkcmFnJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHAgPSBkLnBhcmVudDtcbiAgICAgICAgICAgIHN0YXRlLmxpbmVQaWNrQWN0aXZlKGZhbHNlKTtcbiAgICAgICAgICAgIGQueCA9IE1hdGgubWF4KC1jLm92ZXJkcmFnLCBNYXRoLm1pbihkLm1vZGVsLndpZHRoICsgYy5vdmVyZHJhZywgZDMuZXZlbnQueCkpO1xuICAgICAgICAgICAgZC5jYW52YXNYID0gZC54ICogZC5tb2RlbC5jYW52YXNQaXhlbFJhdGlvO1xuICAgICAgICAgICAgeUF4aXNcbiAgICAgICAgICAgICAgICAuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLnggLSBiLng7IH0pXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oZSwgaSkge1xuICAgICAgICAgICAgICAgICAgICBlLnhJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGUueCA9IGQgPT09IGUgPyBlLnggOiBlLnhTY2FsZShlLnhJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGUuY2FudmFzWCA9IGUueCAqIGUubW9kZWwuY2FudmFzUGl4ZWxSYXRpbztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXBkYXRlUGFuZWxMYXlvdXQoeUF4aXMsIHApO1xuXG4gICAgICAgICAgICB5QXhpcy5maWx0ZXIoZnVuY3Rpb24oZSkgeyByZXR1cm4gTWF0aC5hYnMoZC54SW5kZXggLSBlLnhJbmRleCkgIT09IDA7IH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueFNjYWxlKGQueEluZGV4KSArICcsIDApJzsgfSk7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywgMCknKTtcbiAgICAgICAgICAgIHlBeGlzLmVhY2goZnVuY3Rpb24oZSwgaTAsIGkxKSB7IGlmKGkxID09PSBkLnBhcmVudC5rZXkpIHAuZGltZW5zaW9uc1tpMF0gPSBlOyB9KTtcbiAgICAgICAgICAgIHAuY29udGV4dExheWVyICYmIHAuY29udGV4dExheWVyLnJlbmRlcihwLnBhbmVscywgZmFsc2UsICFzb21lRmlsdGVyc0FjdGl2ZShwKSk7XG4gICAgICAgICAgICBwLmZvY3VzTGF5ZXIucmVuZGVyICYmIHAuZm9jdXNMYXllci5yZW5kZXIocC5wYW5lbHMpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2RyYWdlbmQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICB2YXIgcCA9IGQucGFyZW50O1xuICAgICAgICAgICAgZC54ID0gZC54U2NhbGUoZC54SW5kZXgpO1xuICAgICAgICAgICAgZC5jYW52YXNYID0gZC54ICogZC5tb2RlbC5jYW52YXNQaXhlbFJhdGlvO1xuICAgICAgICAgICAgdXBkYXRlUGFuZWxMYXlvdXQoeUF4aXMsIHApO1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQueCArICcsIDApJzsgfSk7XG4gICAgICAgICAgICBwLmNvbnRleHRMYXllciAmJiBwLmNvbnRleHRMYXllci5yZW5kZXIocC5wYW5lbHMsIGZhbHNlLCAhc29tZUZpbHRlcnNBY3RpdmUocCkpO1xuICAgICAgICAgICAgcC5mb2N1c0xheWVyICYmIHAuZm9jdXNMYXllci5yZW5kZXIocC5wYW5lbHMpO1xuICAgICAgICAgICAgcC5waWNrTGF5ZXIgJiYgcC5waWNrTGF5ZXIucmVuZGVyKHAucGFuZWxzLCB0cnVlKTtcbiAgICAgICAgICAgIHN0YXRlLmxpbmVQaWNrQWN0aXZlKHRydWUpO1xuXG4gICAgICAgICAgICBpZihjYWxsYmFja3MgJiYgY2FsbGJhY2tzLmF4ZXNNb3ZlZCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5heGVzTW92ZWQocC5rZXksIHAuZGltZW5zaW9ucy5tYXAoZnVuY3Rpb24oZSkge3JldHVybiBlLmNyb3NzZmlsdGVyRGltZW5zaW9uSW5kZXg7fSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICk7XG5cbiAgICB5QXhpcy5leGl0KClcbiAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgdmFyIGF4aXNPdmVybGF5cyA9IHlBeGlzLnNlbGVjdEFsbCgnLicgKyBjLmNuLmF4aXNPdmVybGF5cylcbiAgICAgICAgLmRhdGEocmVwZWF0LCBrZXlGdW4pO1xuXG4gICAgYXhpc092ZXJsYXlzLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uYXhpc092ZXJsYXlzLCB0cnVlKTtcblxuICAgIGF4aXNPdmVybGF5cy5zZWxlY3RBbGwoJy4nICsgYy5jbi5heGlzKS5yZW1vdmUoKTtcblxuICAgIHZhciBheGlzID0gYXhpc092ZXJsYXlzLnNlbGVjdEFsbCgnLicgKyBjLmNuLmF4aXMpXG4gICAgICAgIC5kYXRhKHJlcGVhdCwga2V5RnVuKTtcblxuICAgIGF4aXMuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5heGlzLCB0cnVlKTtcblxuICAgIGF4aXNcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHdhbnRlZFRpY2tDb3VudCA9IGQubW9kZWwuaGVpZ2h0IC8gZC5tb2RlbC50aWNrRGlzdGFuY2U7XG4gICAgICAgICAgICB2YXIgc2NhbGUgPSBkLmRvbWFpblNjYWxlO1xuICAgICAgICAgICAgdmFyIHNkb20gPSBzY2FsZS5kb21haW4oKTtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jYWxsKGQzLnN2Zy5heGlzKClcbiAgICAgICAgICAgICAgICAgICAgLm9yaWVudCgnbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgIC50aWNrU2l6ZSg0KVxuICAgICAgICAgICAgICAgICAgICAub3V0ZXJUaWNrU2l6ZSgyKVxuICAgICAgICAgICAgICAgICAgICAudGlja3Mod2FudGVkVGlja0NvdW50LCBkLnRpY2tGb3JtYXQpIC8vIHdvcmtzIGZvciBjb250aW51b3VzIHNjYWxlcyBvbmx5Li4uXG4gICAgICAgICAgICAgICAgICAgIC50aWNrVmFsdWVzKGQub3JkaW5hbCA/IC8vIGFuZCB0aGlzIHdvcmtzIGZvciBvcmRpbmFsIHNjYWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgc2RvbSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsKVxuICAgICAgICAgICAgICAgICAgICAudGlja0Zvcm1hdChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGVscGVycy5pc09yZGluYWwoZCkgPyB2IDogbGluZWFyRm9ybWF0KGQubW9kZWwuZGltZW5zaW9uc1tkLnZpc2libGVJbmRleF0sIHYpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc2NhbGUoc2NhbGUpKTtcbiAgICAgICAgICAgIERyYXdpbmcuZm9udChheGlzLnNlbGVjdEFsbCgndGV4dCcpLCBkLm1vZGVsLnRpY2tGb250KTtcbiAgICAgICAgfSk7XG5cbiAgICBheGlzLnNlbGVjdEFsbCgnLmRvbWFpbiwgLnRpY2s+bGluZScpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAuYXR0cignc3Ryb2tlJywgJ2JsYWNrJylcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgMC4yNSlcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsICcxcHgnKTtcblxuICAgIGF4aXMuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgLnN0eWxlKCd0ZXh0LXNoYWRvdycsICcxcHggMXB4IDFweCAjZmZmLCAtMXB4IC0xcHggMXB4ICNmZmYsIDFweCAtMXB4IDFweCAjZmZmLCAtMXB4IDFweCAxcHggI2ZmZicpXG4gICAgICAgIC5zdHlsZSgnY3Vyc29yJywgJ2RlZmF1bHQnKVxuICAgICAgICAuc3R5bGUoJ3VzZXItc2VsZWN0JywgJ25vbmUnKTtcblxuICAgIHZhciBheGlzSGVhZGluZyA9IGF4aXNPdmVybGF5cy5zZWxlY3RBbGwoJy4nICsgYy5jbi5heGlzSGVhZGluZylcbiAgICAgICAgLmRhdGEocmVwZWF0LCBrZXlGdW4pO1xuXG4gICAgYXhpc0hlYWRpbmcuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5heGlzSGVhZGluZywgdHJ1ZSk7XG5cbiAgICB2YXIgYXhpc1RpdGxlID0gYXhpc0hlYWRpbmcuc2VsZWN0QWxsKCcuJyArIGMuY24uYXhpc1RpdGxlKVxuICAgICAgICAuZGF0YShyZXBlYXQsIGtleUZ1bik7XG5cbiAgICBheGlzVGl0bGUuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5heGlzVGl0bGUsIHRydWUpXG4gICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAuc3R5bGUoJ2N1cnNvcicsICdldy1yZXNpemUnKVxuICAgICAgICAuc3R5bGUoJ3VzZXItc2VsZWN0JywgJ25vbmUnKVxuICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcblxuICAgIGF4aXNUaXRsZVxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7IHJldHVybiBkLmxhYmVsOyB9KVxuICAgICAgICAuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICB2YXIgZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIERyYXdpbmcuZm9udChlLCBkLm1vZGVsLmxhYmVsRm9udCk7XG4gICAgICAgICAgICBzdmdUZXh0VXRpbHMuY29udmVydFRvVHNwYW5zKGUsIGdkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciB0aWx0ID0gY2FsY1RpbHQoZC5tb2RlbC5sYWJlbEFuZ2xlLCBkLm1vZGVsLmxhYmVsU2lkZSk7XG4gICAgICAgICAgICB2YXIgciA9IGMuYXhpc1RpdGxlT2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAodGlsdC5kaXIgPiAwID8gJycgOiAndHJhbnNsYXRlKDAsJyArICgyICogciArIGQubW9kZWwuaGVpZ2h0KSArICcpJykgK1xuICAgICAgICAgICAgICAgICdyb3RhdGUoJyArIHRpbHQuZGVncmVlcyArICcpJyArXG4gICAgICAgICAgICAgICAgJ3RyYW5zbGF0ZSgnICsgKC1yICogdGlsdC5keCkgKyAnLCcgKyAoLXIgKiB0aWx0LmR5KSArICcpJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHRpbHQgPSBjYWxjVGlsdChkLm1vZGVsLmxhYmVsQW5nbGUsIGQubW9kZWwubGFiZWxTaWRlKTtcbiAgICAgICAgICAgIHZhciBhZHggPSBNYXRoLmFicyh0aWx0LmR4KTtcbiAgICAgICAgICAgIHZhciBhZHkgPSBNYXRoLmFicyh0aWx0LmR5KTtcblxuICAgICAgICAgICAgaWYoMiAqIGFkeCA+IGFkeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGlsdC5kaXIgKiB0aWx0LmR4IDwgMCkgPyAnc3RhcnQnIDogJ2VuZCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbWlkZGxlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB2YXIgYXhpc0V4dGVudCA9IGF4aXNPdmVybGF5cy5zZWxlY3RBbGwoJy4nICsgYy5jbi5heGlzRXh0ZW50KVxuICAgICAgICAuZGF0YShyZXBlYXQsIGtleUZ1bik7XG5cbiAgICBheGlzRXh0ZW50LmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uYXhpc0V4dGVudCwgdHJ1ZSk7XG5cbiAgICB2YXIgYXhpc0V4dGVudFRvcCA9IGF4aXNFeHRlbnQuc2VsZWN0QWxsKCcuJyArIGMuY24uYXhpc0V4dGVudFRvcClcbiAgICAgICAgLmRhdGEocmVwZWF0LCBrZXlGdW4pO1xuXG4gICAgYXhpc0V4dGVudFRvcC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLmF4aXNFeHRlbnRUb3AsIHRydWUpO1xuXG4gICAgYXhpc0V4dGVudFRvcFxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgMCArICcsJyArIC1jLmF4aXNFeHRlbnRPZmZzZXQgKyAnKScpO1xuXG4gICAgdmFyIGF4aXNFeHRlbnRUb3BUZXh0ID0gYXhpc0V4dGVudFRvcC5zZWxlY3RBbGwoJy4nICsgYy5jbi5heGlzRXh0ZW50VG9wVGV4dClcbiAgICAgICAgLmRhdGEocmVwZWF0LCBrZXlGdW4pO1xuXG4gICAgYXhpc0V4dGVudFRvcFRleHQuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5heGlzRXh0ZW50VG9wVGV4dCwgdHJ1ZSlcbiAgICAgICAgLmNhbGwoc3R5bGVFeHRlbnRUZXh0cyk7XG5cbiAgICBheGlzRXh0ZW50VG9wVGV4dFxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7IHJldHVybiBleHRyZW1lVGV4dChkLCB0cnVlKTsgfSlcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCkgeyBEcmF3aW5nLmZvbnQoZDMuc2VsZWN0KHRoaXMpLCBkLm1vZGVsLnJhbmdlRm9udCk7IH0pO1xuXG4gICAgdmFyIGF4aXNFeHRlbnRCb3R0b20gPSBheGlzRXh0ZW50LnNlbGVjdEFsbCgnLicgKyBjLmNuLmF4aXNFeHRlbnRCb3R0b20pXG4gICAgICAgIC5kYXRhKHJlcGVhdCwga2V5RnVuKTtcblxuICAgIGF4aXNFeHRlbnRCb3R0b20uZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5heGlzRXh0ZW50Qm90dG9tLCB0cnVlKTtcblxuICAgIGF4aXNFeHRlbnRCb3R0b21cbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyAwICsgJywnICsgKGQubW9kZWwuaGVpZ2h0ICsgYy5heGlzRXh0ZW50T2Zmc2V0KSArICcpJztcbiAgICAgICAgfSk7XG5cbiAgICB2YXIgYXhpc0V4dGVudEJvdHRvbVRleHQgPSBheGlzRXh0ZW50Qm90dG9tLnNlbGVjdEFsbCgnLicgKyBjLmNuLmF4aXNFeHRlbnRCb3R0b21UZXh0KVxuICAgICAgICAuZGF0YShyZXBlYXQsIGtleUZ1bik7XG5cbiAgICBheGlzRXh0ZW50Qm90dG9tVGV4dC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLmF4aXNFeHRlbnRCb3R0b21UZXh0LCB0cnVlKVxuICAgICAgICAuYXR0cignZHknLCAnMC43NWVtJylcbiAgICAgICAgLmNhbGwoc3R5bGVFeHRlbnRUZXh0cyk7XG5cbiAgICBheGlzRXh0ZW50Qm90dG9tVGV4dFxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7IHJldHVybiBleHRyZW1lVGV4dChkLCBmYWxzZSk7IH0pXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHsgRHJhd2luZy5mb250KGQzLnNlbGVjdCh0aGlzKSwgZC5tb2RlbC5yYW5nZUZvbnQpOyB9KTtcblxuICAgIGJydXNoLmVuc3VyZUF4aXNCcnVzaChheGlzT3ZlcmxheXMpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHBhcmNvb3JkcyA9IHJlcXVpcmUoJy4vcGFyY29vcmRzJyk7XG52YXIgcHJlcGFyZVJlZ2wgPSByZXF1aXJlKCcuLi8uLi9saWIvcHJlcGFyZV9yZWdsJyk7XG52YXIgaXNWaXNpYmxlID0gcmVxdWlyZSgnLi9oZWxwZXJzJykuaXNWaXNpYmxlO1xuXG5mdW5jdGlvbiBuZXdJbmRleCh2aXNpYmxlSW5kaWNlcywgb3JpZywgZGltKSB7XG4gICAgdmFyIG9yaWdJbmRleCA9IG9yaWcuaW5kZXhPZihkaW0pO1xuICAgIHZhciBjdXJyZW50SW5kZXggPSB2aXNpYmxlSW5kaWNlcy5pbmRleE9mKG9yaWdJbmRleCk7XG4gICAgaWYoY3VycmVudEluZGV4ID09PSAtMSkge1xuICAgICAgICAvLyBpbnZpc2libGUgZGltZW5zaW9ucyBpbml0aWFsbHkgZ28gdG8gdGhlIGVuZFxuICAgICAgICBjdXJyZW50SW5kZXggKz0gb3JpZy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG59XG5cbmZ1bmN0aW9uIHNvcnRlcih2aXNpYmxlSW5kaWNlcywgb3JpZykge1xuICAgIHJldHVybiBmdW5jdGlvbiBzb3J0ZXIoZDEsIGQyKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBuZXdJbmRleCh2aXNpYmxlSW5kaWNlcywgb3JpZywgZDEpIC1cbiAgICAgICAgICAgIG5ld0luZGV4KHZpc2libGVJbmRpY2VzLCBvcmlnLCBkMilcbiAgICAgICAgKTtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ2QsIGNkTW9kdWxlKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIHZhciBzdWNjZXNzID0gcHJlcGFyZVJlZ2woZ2QpO1xuICAgIGlmKCFzdWNjZXNzKSByZXR1cm47XG5cbiAgICB2YXIgY3VycmVudERpbXMgPSB7fTtcbiAgICB2YXIgaW5pdGlhbERpbXMgPSB7fTtcbiAgICB2YXIgZnVsbEluZGljZXMgPSB7fTtcbiAgICB2YXIgaW5wdXRJbmRpY2VzID0ge307XG5cbiAgICB2YXIgc2l6ZSA9IGZ1bGxMYXlvdXQuX3NpemU7XG5cbiAgICBjZE1vZHVsZS5mb3JFYWNoKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZFswXS50cmFjZTtcbiAgICAgICAgZnVsbEluZGljZXNbaV0gPSB0cmFjZS5pbmRleDtcbiAgICAgICAgdmFyIGlJbiA9IGlucHV0SW5kaWNlc1tpXSA9IHRyYWNlLl9mdWxsSW5wdXQuaW5kZXg7XG4gICAgICAgIGN1cnJlbnREaW1zW2ldID0gZ2QuZGF0YVtpSW5dLmRpbWVuc2lvbnM7XG4gICAgICAgIGluaXRpYWxEaW1zW2ldID0gZ2QuZGF0YVtpSW5dLmRpbWVuc2lvbnMuc2xpY2UoKTtcbiAgICB9KTtcblxuICAgIHZhciBmaWx0ZXJDaGFuZ2VkID0gZnVuY3Rpb24oaSwgaW5pdGlhbERpbUluZGV4LCBuZXdSYW5nZXMpIHtcbiAgICAgICAgLy8gSGF2ZSB1cGRhdGVkIGBjb25zdHJhaW50cmFuZ2VgIGRhdGEgb24gYGdkLmRhdGFgIGFuZCByYWlzZSBgUGxvdGx5LnJlc3R5bGVgIGV2ZW50XG4gICAgICAgIC8vIHdpdGhvdXQgaGF2aW5nIHRvIGluY3VyIGhlYXZ5IFVJIGJsb2NraW5nIGR1ZSB0byBhbiBhY3R1YWwgYFBsb3RseS5yZXN0eWxlYCBjYWxsXG5cbiAgICAgICAgdmFyIGRpbSA9IGluaXRpYWxEaW1zW2ldW2luaXRpYWxEaW1JbmRleF07XG4gICAgICAgIHZhciBuZXdDb25zdHJhaW50cyA9IG5ld1Jhbmdlcy5tYXAoZnVuY3Rpb24ocikgeyByZXR1cm4gci5zbGljZSgpOyB9KTtcblxuICAgICAgICAvLyBTdG9yZSBjb25zdHJhaW50IHJhbmdlIGluIHByZUdVSVxuICAgICAgICAvLyBUaGlzIG9uZSBkb2Vzbid0IHdvcmsgaWYgaXQncyBzdG9yZWQgaW4gcGllY2VzIGluIF9zdG9yZURpcmVjdEdVSUVkaXRcbiAgICAgICAgLy8gYmVjYXVzZSBpdCdzIGFuIGFycmF5IG9mIHZhcmlhYmxlIGRpbWVuc2lvbmFsaXR5LiBTbyBzdG9yZSB0aGUgd2hvbGVcbiAgICAgICAgLy8gdGhpbmcgYXQgb25jZSBtYW51YWxseS5cbiAgICAgICAgdmFyIGFTdHIgPSAnZGltZW5zaW9uc1snICsgaW5pdGlhbERpbUluZGV4ICsgJ10uY29uc3RyYWludHJhbmdlJztcbiAgICAgICAgdmFyIHByZUdVSSA9IGZ1bGxMYXlvdXQuX3RyYWNlUHJlR1VJW2dkLl9mdWxsRGF0YVtmdWxsSW5kaWNlc1tpXV0uX2Z1bGxJbnB1dC51aWRdO1xuICAgICAgICBpZihwcmVHVUlbYVN0cl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIGluaXRpYWxWYWwgPSBkaW0uY29uc3RyYWludHJhbmdlO1xuICAgICAgICAgICAgcHJlR1VJW2FTdHJdID0gaW5pdGlhbFZhbCB8fCBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZ1bGxEaW1lbnNpb24gPSBnZC5fZnVsbERhdGFbZnVsbEluZGljZXNbaV1dLmRpbWVuc2lvbnNbaW5pdGlhbERpbUluZGV4XTtcblxuICAgICAgICBpZighbmV3Q29uc3RyYWludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgZGltLmNvbnN0cmFpbnRyYW5nZTtcbiAgICAgICAgICAgIGRlbGV0ZSBmdWxsRGltZW5zaW9uLmNvbnN0cmFpbnRyYW5nZTtcbiAgICAgICAgICAgIG5ld0NvbnN0cmFpbnRzID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKG5ld0NvbnN0cmFpbnRzLmxlbmd0aCA9PT0gMSkgbmV3Q29uc3RyYWludHMgPSBuZXdDb25zdHJhaW50c1swXTtcbiAgICAgICAgICAgIGRpbS5jb25zdHJhaW50cmFuZ2UgPSBuZXdDb25zdHJhaW50cztcbiAgICAgICAgICAgIGZ1bGxEaW1lbnNpb24uY29uc3RyYWludHJhbmdlID0gbmV3Q29uc3RyYWludHMuc2xpY2UoKTtcbiAgICAgICAgICAgIC8vIHdyYXAgaW4gYW5vdGhlciBhcnJheSBmb3IgcmVzdHlsZSBldmVudCBkYXRhXG4gICAgICAgICAgICBuZXdDb25zdHJhaW50cyA9IFtuZXdDb25zdHJhaW50c107XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdHlsZURhdGEgPSB7fTtcbiAgICAgICAgcmVzdHlsZURhdGFbYVN0cl0gPSBuZXdDb25zdHJhaW50cztcbiAgICAgICAgZ2QuZW1pdCgncGxvdGx5X3Jlc3R5bGUnLCBbcmVzdHlsZURhdGEsIFtpbnB1dEluZGljZXNbaV1dXSk7XG4gICAgfTtcblxuICAgIHZhciBob3ZlciA9IGZ1bmN0aW9uKGV2ZW50RGF0YSkge1xuICAgICAgICBnZC5lbWl0KCdwbG90bHlfaG92ZXInLCBldmVudERhdGEpO1xuICAgIH07XG5cbiAgICB2YXIgdW5ob3ZlciA9IGZ1bmN0aW9uKGV2ZW50RGF0YSkge1xuICAgICAgICBnZC5lbWl0KCdwbG90bHlfdW5ob3ZlcicsIGV2ZW50RGF0YSk7XG4gICAgfTtcblxuICAgIHZhciBheGVzTW92ZWQgPSBmdW5jdGlvbihpLCB2aXNpYmxlSW5kaWNlcykge1xuICAgICAgICAvLyBIYXZlIHVwZGF0ZWQgb3JkZXIgZGF0YSBvbiBgZ2QuZGF0YWAgYW5kIHJhaXNlIGBQbG90bHkucmVzdHlsZWAgZXZlbnRcbiAgICAgICAgLy8gd2l0aG91dCBoYXZpbmcgdG8gaW5jdXIgaGVhdnkgVUkgYmxvY2tpbmcgZHVlIHRvIGFuIGFjdHVhbCBgUGxvdGx5LnJlc3R5bGVgIGNhbGxcblxuICAgICAgICAvLyBkcmFnJmRyb3Agc29ydGluZyBvZiB0aGUgdmlzaWJsZSBkaW1lbnNpb25zXG4gICAgICAgIHZhciBvcmlnID0gc29ydGVyKHZpc2libGVJbmRpY2VzLCBpbml0aWFsRGltc1tpXS5maWx0ZXIoaXNWaXNpYmxlKSk7XG4gICAgICAgIGN1cnJlbnREaW1zW2ldLnNvcnQob3JpZyk7XG5cbiAgICAgICAgLy8gaW52aXNpYmxlIGRpbWVuc2lvbnMgYXJlIG5vdCBpbnRlcnByZXRlZCBpbiB0aGUgY29udGV4dCBvZiBkcmFnJmRyb3Agc29ydGluZyBhcyBhbiBpbnZpc2libGUgZGltZW5zaW9uXG4gICAgICAgIC8vIGNhbm5vdCBiZSBkcmFnZ2VkOyB0aGV5J3JlIGludGVyc3BlcnNlZCBpbnRvIHRoZWlyIG9yaWdpbmFsIHBvc2l0aW9ucyBieSB0aGlzIHN1YnNlcXVlbnQgbWVyZ2luZyBzdGVwXG4gICAgICAgIGluaXRpYWxEaW1zW2ldLmZpbHRlcihmdW5jdGlvbihkKSB7cmV0dXJuICFpc1Zpc2libGUoZCk7fSlcbiAgICAgICAgICAgICAuc29ydChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgIC8vIHN1YnNlcXVlbnQgc3BsaWNpbmcgdG8gYmUgZG9uZSBsZWZ0IHRvIHJpZ2h0LCBvdGhlcndpc2UgaW5kaWNlcyBtYXkgYmUgaW5jb3JyZWN0XG4gICAgICAgICAgICAgICAgIHJldHVybiBpbml0aWFsRGltc1tpXS5pbmRleE9mKGQpO1xuICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudERpbXNbaV0uc3BsaWNlKGN1cnJlbnREaW1zW2ldLmluZGV4T2YoZCksIDEpOyAvLyByZW1vdmUgZnJvbSB0aGUgZW5kXG4gICAgICAgICAgICAgICAgY3VycmVudERpbXNbaV0uc3BsaWNlKGluaXRpYWxEaW1zW2ldLmluZGV4T2YoZCksIDAsIGQpOyAvLyBpbnNlcnQgYXQgb3JpZ2luYWwgaW5kZXhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRPRE86IHdlIGNhbid0IHJlYWxseSBzdG9yZSB0aGlzIHBhcnQgb2YgdGhlIGludGVyYWN0aW9uIHN0YXRlXG4gICAgICAgIC8vIGRpcmVjdGx5IGFzIGJlbG93LCBzaW5jZSBpdCBpbmN1ZGVzIGRhdGEgYXJyYXlzLiBJZiB3ZSB3YW50IHRvXG4gICAgICAgIC8vIHBlcnNpc3QgY29sdW1uIG9yZGVyIHdlIG1heSBoYXZlIHRvIGRvIHNvbWV0aGluZyBzcGVjaWFsIGZvciB0aGlzXG4gICAgICAgIC8vIGNhc2UgdG8ganVzdCBzdG9yZSB0aGUgb3JkZXIgaXRzZWxmLlxuICAgICAgICAvLyBSZWdpc3RyeS5jYWxsKCdfc3RvcmVEaXJlY3RHVUlFZGl0JyxcbiAgICAgICAgLy8gICAgIGdkLmRhdGFbaW5wdXRJbmRpY2VzW2ldXSxcbiAgICAgICAgLy8gICAgIGZ1bGxMYXlvdXQuX3RyYWNlUHJlR1VJW2dkLl9mdWxsRGF0YVtmdWxsSW5kaWNlc1tpXV0uX2Z1bGxJbnB1dC51aWRdLFxuICAgICAgICAvLyAgICAge2RpbWVuc2lvbnM6IGN1cnJlbnREaW1zW2ldfVxuICAgICAgICAvLyApO1xuXG4gICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9yZXN0eWxlJywgW3tkaW1lbnNpb25zOiBbY3VycmVudERpbXNbaV1dfSwgW2lucHV0SW5kaWNlc1tpXV1dKTtcbiAgICB9O1xuXG4gICAgcGFyY29vcmRzKFxuICAgICAgICBnZCxcbiAgICAgICAgY2RNb2R1bGUsXG4gICAgICAgIHsgLy8gbGF5b3V0XG4gICAgICAgICAgICB3aWR0aDogc2l6ZS53LFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmgsXG4gICAgICAgICAgICBtYXJnaW46IHtcbiAgICAgICAgICAgICAgICB0OiBzaXplLnQsXG4gICAgICAgICAgICAgICAgcjogc2l6ZS5yLFxuICAgICAgICAgICAgICAgIGI6IHNpemUuYixcbiAgICAgICAgICAgICAgICBsOiBzaXplLmxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyAvLyBjYWxsYmFja3NcbiAgICAgICAgICAgIGZpbHRlckNoYW5nZWQ6IGZpbHRlckNoYW5nZWQsXG4gICAgICAgICAgICBob3ZlcjogaG92ZXIsXG4gICAgICAgICAgICB1bmhvdmVyOiB1bmhvdmVyLFxuICAgICAgICAgICAgYXhlc01vdmVkOiBheGVzTW92ZWRcbiAgICAgICAgfVxuICAgICk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==