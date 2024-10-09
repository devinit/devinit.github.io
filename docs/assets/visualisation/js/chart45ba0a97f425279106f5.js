(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_pie_attributes_js-node_modules_plotly_js_src_traces-5e1811"],{

/***/ "./node_modules/plotly.js/src/traces/pie/attributes.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/attributes.js ***!
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



var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var textFontAttrs = fontAttrs({
    editType: 'plot',
    arrayOk: true,
    colorEditType: 'plot',
    description: 'Sets the font used for `textinfo`.'
});

module.exports = {
    labels: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the sector labels.',
            'If `labels` entries are duplicated, we sum associated `values`',
            'or simply count occurrences if `values` is not provided.',
            'For other array attributes (including color) we use the first',
            'non-empty entry among all occurrences of the label.'
        ].join(' ')
    },
    // equivalent of x0 and dx, if label is missing
    label0: {
        valType: 'number',
        role: 'info',
        dflt: 0,
        editType: 'calc',
        description: [
            'Alternate to `labels`.',
            'Builds a numeric set of labels.',
            'Use with `dlabel`',
            'where `label0` is the starting label and `dlabel` the step.'
        ].join(' ')
    },
    dlabel: {
        valType: 'number',
        role: 'info',
        dflt: 1,
        editType: 'calc',
        description: 'Sets the label step. See `label0` for more info.'
    },

    values: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the values of the sectors.',
            'If omitted, we count occurrences of each label.'
        ].join(' ')
    },

    marker: {
        colors: {
            valType: 'data_array',  // TODO 'color_array' ?
            editType: 'calc',
            description: [
                'Sets the color of each sector.',
                'If not specified, the default trace color set is used',
                'to pick the sector colors.'
            ].join(' ')
        },

        line: {
            color: {
                valType: 'color',
                role: 'style',
                dflt: colorAttrs.defaultLine,
                arrayOk: true,
                editType: 'style',
                description: [
                    'Sets the color of the line enclosing each sector.'
                ].join(' ')
            },
            width: {
                valType: 'number',
                role: 'style',
                min: 0,
                dflt: 0,
                arrayOk: true,
                editType: 'style',
                description: [
                    'Sets the width (in px) of the line enclosing each sector.'
                ].join(' ')
            },
            editType: 'calc'
        },
        editType: 'calc'
    },

    text: {
        valType: 'data_array',
        editType: 'plot',
        description: [
            'Sets text elements associated with each sector.',
            'If trace `textinfo` contains a *text* flag, these elements will be seen',
            'on the chart.',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    },
    hovertext: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        editType: 'style',
        description: [
            'Sets hover text elements associated with each sector.',
            'If a single string, the same string appears for',
            'all data points.',
            'If an array of string, the items are mapped in order of',
            'this trace\'s sectors.',
            'To be seen, trace `hoverinfo` must contain a *text* flag.'
        ].join(' ')
    },

// 'see eg:'
// 'https://www.e-education.psu.edu/natureofgeoinfo/sites/www.e-education.psu.edu.natureofgeoinfo/files/image/hisp_pies.gif',
// '(this example involves a map too - may someday be a whole trace type',
// 'of its own. but the point is the size of the whole pie is important.)'
    scalegroup: {
        valType: 'string',
        role: 'info',
        dflt: '',
        editType: 'calc',
        description: [
            'If there are multiple pie charts that should be sized according to',
            'their totals, link them by providing a non-empty group id here',
            'shared by every trace in the same group.'
        ].join(' ')
    },

    // labels (legend is handled by plots.attributes.showlegend and layout.hiddenlabels)
    textinfo: {
        valType: 'flaglist',
        role: 'info',
        flags: ['label', 'text', 'value', 'percent'],
        extras: ['none'],
        editType: 'calc',
        description: [
            'Determines which trace information appear on the graph.'
        ].join(' ')
    },
    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['label', 'text', 'value', 'percent', 'name']
    }),
    hovertemplate: hovertemplateAttrs({}, {
        keys: ['label', 'color', 'value', 'percent', 'text']
    }),
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: ['label', 'color', 'value', 'percent', 'text']
    }),
    textposition: {
        valType: 'enumerated',
        role: 'info',
        values: ['inside', 'outside', 'auto', 'none'],
        dflt: 'auto',
        arrayOk: true,
        editType: 'plot',
        description: [
            'Specifies the location of the `textinfo`.'
        ].join(' ')
    },
    textfont: extendFlat({}, textFontAttrs, {
        description: 'Sets the font used for `textinfo`.'
    }),
    insidetextorientation: {
        valType: 'enumerated',
        role: 'info',
        values: ['horizontal', 'radial', 'tangential', 'auto'],
        dflt: 'auto',
        editType: 'plot',
        description: [
            'Controls the orientation of the text inside chart sectors.',
            'When set to *auto*, text may be oriented in any direction in order',
            'to be as big as possible in the middle of a sector.',
            'The *horizontal* option orients text to be parallel with the bottom',
            'of the chart, and may make text smaller in order to achieve that goal.',
            'The *radial* option orients text along the radius of the sector.',
            'The *tangential* option orients text perpendicular to the radius of the sector.'
        ].join(' ')
    },
    insidetextfont: extendFlat({}, textFontAttrs, {
        description: 'Sets the font used for `textinfo` lying inside the sector.'
    }),
    outsidetextfont: extendFlat({}, textFontAttrs, {
        description: 'Sets the font used for `textinfo` lying outside the sector.'
    }),
    automargin: {
        valType: 'boolean',
        dflt: false,
        role: 'info',
        editType: 'plot',
        description: [
            'Determines whether outside text labels can push the margins.'
        ].join(' ')
    },

    title: {
        text: {
            valType: 'string',
            dflt: '',
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the title of the chart.',
                'If it is empty, no title is displayed.',
                'Note that before the existence of `title.text`, the title\'s',
                'contents used to be defined as the `title` attribute itself.',
                'This behavior has been deprecated.'
            ].join(' ')
        },
        font: extendFlat({}, textFontAttrs, {
            description: [
                'Sets the font used for `title`.',
                'Note that the title\'s font used to be set',
                'by the now deprecated `titlefont` attribute.'
            ].join(' ')
        }),
        position: {
            valType: 'enumerated',
            values: [
                'top left', 'top center', 'top right',
                'middle center',
                'bottom left', 'bottom center', 'bottom right'
            ],
            role: 'info',
            editType: 'plot',
            description: [
                'Specifies the location of the `title`.',
                'Note that the title\'s position used to be set',
                'by the now deprecated `titleposition` attribute.'
            ].join(' ')
        },

        editType: 'plot'
    },

    // position and shape
    domain: domainAttrs({name: 'pie', trace: true, editType: 'calc'}),

    hole: {
        valType: 'number',
        role: 'style',
        min: 0,
        max: 1,
        dflt: 0,
        editType: 'calc',
        description: [
            'Sets the fraction of the radius to cut out of the pie.',
            'Use this to make a donut chart.'
        ].join(' ')
    },

    // ordering and direction
    sort: {
        valType: 'boolean',
        role: 'style',
        dflt: true,
        editType: 'calc',
        description: [
            'Determines whether or not the sectors are reordered',
            'from largest to smallest.'
        ].join(' ')
    },
    direction: {
        /**
         * there are two common conventions, both of which place the first
         * (largest, if sorted) slice with its left edge at 12 o'clock but
         * succeeding slices follow either cw or ccw from there.
         *
         * see http://visage.co/data-visualization-101-pie-charts/
         */
        valType: 'enumerated',
        values: ['clockwise', 'counterclockwise'],
        role: 'style',
        dflt: 'counterclockwise',
        editType: 'calc',
        description: [
            'Specifies the direction at which succeeding sectors follow',
            'one another.'
        ].join(' ')
    },
    rotation: {
        valType: 'number',
        role: 'style',
        min: -360,
        max: 360,
        dflt: 0,
        editType: 'calc',
        description: [
            'Instead of the first slice starting at 12 o\'clock,',
            'rotate to some other angle.'
        ].join(' ')
    },

    pull: {
        valType: 'number',
        role: 'style',
        min: 0,
        max: 1,
        dflt: 0,
        arrayOk: true,
        editType: 'calc',
        description: [
            'Sets the fraction of larger radius to pull the sectors',
            'out from the center. This can be a constant',
            'to pull all slices apart from each other equally',
            'or an array to highlight one or more slices.'
        ].join(' ')
    },

    _deprecated: {
        title: {
            valType: 'string',
            dflt: '',
            role: 'info',
            editType: 'calc',
            description: [
                'Deprecated in favor of `title.text`.',
                'Note that value of `title` is no longer a simple',
                '*string* but a set of sub-attributes.'
            ].join(' ')
        },
        titlefont: extendFlat({}, textFontAttrs, {
            description: 'Deprecated in favor of `title.font`.'
        }),
        titleposition: {
            valType: 'enumerated',
            values: [
                'top left', 'top center', 'top right',
                'middle center',
                'bottom left', 'bottom center', 'bottom right'
            ],
            role: 'info',
            editType: 'calc',
            description: 'Deprecated in favor of `title.position`.'
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/calc.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/calc.js ***!
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
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");

var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var extendedColorWayList = {};

function calc(gd, trace) {
    var cd = [];

    var fullLayout = gd._fullLayout;
    var hiddenLabels = fullLayout.hiddenlabels || [];

    var labels = trace.labels;
    var colors = trace.marker.colors || [];
    var vals = trace.values;
    var len = trace._length;
    var hasValues = trace._hasValues && len;

    var i, pt;

    if(trace.dlabel) {
        labels = new Array(len);
        for(i = 0; i < len; i++) {
            labels[i] = String(trace.label0 + i * trace.dlabel);
        }
    }

    var allThisTraceLabels = {};
    var pullColor = makePullColorFn(fullLayout['_' + trace.type + 'colormap']);
    var vTotal = 0;
    var isAggregated = false;

    for(i = 0; i < len; i++) {
        var v, label, hidden;
        if(hasValues) {
            v = vals[i];
            if(!isNumeric(v)) continue;
            v = +v;
            if(v < 0) continue;
        } else v = 1;

        label = labels[i];
        if(label === undefined || label === '') label = i;
        label = String(label);

        var thisLabelIndex = allThisTraceLabels[label];
        if(thisLabelIndex === undefined) {
            allThisTraceLabels[label] = cd.length;

            hidden = hiddenLabels.indexOf(label) !== -1;

            if(!hidden) vTotal += v;

            cd.push({
                v: v,
                label: label,
                color: pullColor(colors[i], label),
                i: i,
                pts: [i],
                hidden: hidden
            });
        } else {
            isAggregated = true;

            pt = cd[thisLabelIndex];
            pt.v += v;
            pt.pts.push(i);
            if(!pt.hidden) vTotal += v;

            if(pt.color === false && colors[i]) {
                pt.color = pullColor(colors[i], label);
            }
        }
    }

    var shouldSort = (trace.type === 'funnelarea') ? isAggregated : trace.sort;
    if(shouldSort) cd.sort(function(a, b) { return b.v - a.v; });

    // include the sum of all values in the first point
    if(cd[0]) cd[0].vTotal = vTotal;

    return cd;
}

function makePullColorFn(colorMap) {
    return function pullColor(color, id) {
        if(!color) return false;

        color = tinycolor(color);
        if(!color.isValid()) return false;

        color = Color.addOpacity(color, color.getAlpha());
        if(!colorMap[id]) colorMap[id] = color;

        return color;
    };
}

/*
 * `calc` filled in (and collated) explicit colors.
 * Now we need to propagate these explicit colors to other traces,
 * and fill in default colors.
 * This is done after sorting, so we pick defaults
 * in the order slices will be displayed
 */
function crossTraceCalc(gd, plotinfo) { // TODO: should we name the second argument opts?
    var desiredType = (plotinfo || {}).type;
    if(!desiredType) desiredType = 'pie';

    var fullLayout = gd._fullLayout;
    var calcdata = gd.calcdata;
    var colorWay = fullLayout[desiredType + 'colorway'];
    var colorMap = fullLayout['_' + desiredType + 'colormap'];

    if(fullLayout['extend' + desiredType + 'colors']) {
        colorWay = generateExtendedColors(colorWay, extendedColorWayList);
    }
    var dfltColorCount = 0;

    for(var i = 0; i < calcdata.length; i++) {
        var cd = calcdata[i];
        var traceType = cd[0].trace.type;
        if(traceType !== desiredType) continue;

        for(var j = 0; j < cd.length; j++) {
            var pt = cd[j];
            if(pt.color === false) {
                // have we seen this label and assigned a color to it in a previous trace?
                if(colorMap[pt.label]) {
                    pt.color = colorMap[pt.label];
                } else {
                    colorMap[pt.label] = pt.color = colorWay[dfltColorCount % colorWay.length];
                    dfltColorCount++;
                }
            }
        }
    }
}

/**
 * pick a default color from the main default set, augmented by
 * itself lighter then darker before repeating
 */
function generateExtendedColors(colorList, extendedColorWays) {
    var i;
    var colorString = JSON.stringify(colorList);
    var colors = extendedColorWays[colorString];
    if(!colors) {
        colors = colorList.slice();

        for(i = 0; i < colorList.length; i++) {
            colors.push(tinycolor(colorList[i]).lighten(20).toHexString());
        }

        for(i = 0; i < colorList.length; i++) {
            colors.push(tinycolor(colorList[i]).darken(20).toHexString());
        }
        extendedColorWays[colorString] = colors;
    }

    return colors;
}

module.exports = {
    calc: calc,
    crossTraceCalc: crossTraceCalc,

    makePullColorFn: makePullColorFn,
    generateExtendedColors: generateExtendedColors
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/event_data.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/event_data.js ***!
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



var appendArrayMultiPointValues = __webpack_require__(/*! ../../components/fx/helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").appendArrayMultiPointValues;

// Note: like other eventData routines, this creates the data for hover/unhover/click events
// but it has a different API and goes through a totally different pathway.
// So to ensure it doesn't get misused, it's not attached to the Pie module.
module.exports = function eventData(pt, trace) {
    var out = {
        curveNumber: trace.index,
        pointNumbers: pt.pts,
        data: trace._input,
        fullData: trace,
        label: pt.label,
        color: pt.color,
        value: pt.v,
        percent: pt.percent,
        text: pt.text,

        // pt.v (and pt.i below) for backward compatibility
        v: pt.v
    };

    // Only include pointNumber if it's unambiguous
    if(pt.pts.length === 1) out.pointNumber = out.i = pt.pts[0];

    // Add extra data arrays to the output
    // notice that this is the multi-point version ('s' on the end!)
    // so added data will be arrays matching the pointNumbers array.
    appendArrayMultiPointValues(out, trace, pt.pts);

    // don't include obsolete fields in new funnelarea traces
    if(trace.type === 'funnelarea') {
        delete out.v;
        delete out.i;
    }

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/plot.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/plot.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Plots = __webpack_require__(/*! ../../plots/plots */ "./node_modules/plotly.js/src/plots/plots.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var uniformText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js");
var recordMinTextSize = uniformText.recordMinTextSize;
var clearMinTextSize = uniformText.clearMinTextSize;
var TEXTPAD = __webpack_require__(/*! ../bar/constants */ "./node_modules/plotly.js/src/traces/bar/constants.js").TEXTPAD;

var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/pie/helpers.js");
var eventData = __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/pie/event_data.js");
var isValidTextValue = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isValidTextValue;

function plot(gd, cdModule) {
    var fullLayout = gd._fullLayout;
    var gs = fullLayout._size;

    clearMinTextSize('pie', fullLayout);

    prerenderTitles(cdModule, gd);
    layoutAreas(cdModule, gs);

    var plotGroups = Lib.makeTraceGroups(fullLayout._pielayer, cdModule, 'trace').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;

        setCoords(cd);

        // TODO: miter might look better but can sometimes cause problems
        // maybe miter with a small-ish stroke-miterlimit?
        plotGroup.attr('stroke-linejoin', 'round');

        plotGroup.each(function() {
            var slices = d3.select(this).selectAll('g.slice').data(cd);

            slices.enter().append('g')
                .classed('slice', true);
            slices.exit().remove();

            var quadrants = [
                [[], []], // y<0: x<0, x>=0
                [[], []] // y>=0: x<0, x>=0
            ];
            var hasOutsideText = false;

            slices.each(function(pt, i) {
                if(pt.hidden) {
                    d3.select(this).selectAll('path,g').remove();
                    return;
                }

                // to have consistent event data compared to other traces
                pt.pointNumber = pt.i;
                pt.curveNumber = trace.index;

                quadrants[pt.pxmid[1] < 0 ? 0 : 1][pt.pxmid[0] < 0 ? 0 : 1].push(pt);

                var cx = cd0.cx;
                var cy = cd0.cy;
                var sliceTop = d3.select(this);
                var slicePath = sliceTop.selectAll('path.surface').data([pt]);

                slicePath.enter().append('path')
                    .classed('surface', true)
                    .style({'pointer-events': 'all'});

                sliceTop.call(attachFxHandlers, gd, cd);

                if(trace.pull) {
                    var pull = +helpers.castOption(trace.pull, pt.pts) || 0;
                    if(pull > 0) {
                        cx += pull * pt.pxmid[0];
                        cy += pull * pt.pxmid[1];
                    }
                }

                pt.cxFinal = cx;
                pt.cyFinal = cy;

                function arc(start, finish, cw, scale) {
                    var dx = scale * (finish[0] - start[0]);
                    var dy = scale * (finish[1] - start[1]);

                    return 'a' +
                        (scale * cd0.r) + ',' + (scale * cd0.r) + ' 0 ' +
                        pt.largeArc + (cw ? ' 1 ' : ' 0 ') + dx + ',' + dy;
                }

                var hole = trace.hole;
                if(pt.v === cd0.vTotal) { // 100% fails bcs arc start and end are identical
                    var outerCircle = 'M' + (cx + pt.px0[0]) + ',' + (cy + pt.px0[1]) +
                        arc(pt.px0, pt.pxmid, true, 1) +
                        arc(pt.pxmid, pt.px0, true, 1) + 'Z';
                    if(hole) {
                        slicePath.attr('d',
                            'M' + (cx + hole * pt.px0[0]) + ',' + (cy + hole * pt.px0[1]) +
                            arc(pt.px0, pt.pxmid, false, hole) +
                            arc(pt.pxmid, pt.px0, false, hole) +
                            'Z' + outerCircle);
                    } else slicePath.attr('d', outerCircle);
                } else {
                    var outerArc = arc(pt.px0, pt.px1, true, 1);

                    if(hole) {
                        var rim = 1 - hole;
                        slicePath.attr('d',
                            'M' + (cx + hole * pt.px1[0]) + ',' + (cy + hole * pt.px1[1]) +
                            arc(pt.px1, pt.px0, false, hole) +
                            'l' + (rim * pt.px0[0]) + ',' + (rim * pt.px0[1]) +
                            outerArc +
                            'Z');
                    } else {
                        slicePath.attr('d',
                            'M' + cx + ',' + cy +
                            'l' + pt.px0[0] + ',' + pt.px0[1] +
                            outerArc +
                            'Z');
                    }
                }

                // add text
                formatSliceLabel(gd, pt, cd0);
                var textPosition = helpers.castOption(trace.textposition, pt.pts);
                var sliceTextGroup = sliceTop.selectAll('g.slicetext')
                    .data(pt.text && (textPosition !== 'none') ? [0] : []);

                sliceTextGroup.enter().append('g')
                    .classed('slicetext', true);
                sliceTextGroup.exit().remove();

                sliceTextGroup.each(function() {
                    var sliceText = Lib.ensureSingle(d3.select(this), 'text', '', function(s) {
                        // prohibit tex interpretation until we can handle
                        // tex and regular text together
                        s.attr('data-notex', 1);
                    });

                    var font = Lib.ensureUniformFontSize(gd, textPosition === 'outside' ?
                        determineOutsideTextFont(trace, pt, fullLayout.font) :
                        determineInsideTextFont(trace, pt, fullLayout.font)
                    );

                    sliceText.text(pt.text)
                        .attr({
                            'class': 'slicetext',
                            transform: '',
                            'text-anchor': 'middle'
                        })
                        .call(Drawing.font, font)
                        .call(svgTextUtils.convertToTspans, gd);

                    // position the text relative to the slice
                    var textBB = Drawing.bBox(sliceText.node());
                    var transform;

                    if(textPosition === 'outside') {
                        transform = transformOutsideText(textBB, pt);
                    } else {
                        transform = transformInsideText(textBB, pt, cd0);
                        if(textPosition === 'auto' && transform.scale < 1) {
                            var newFont = Lib.ensureUniformFontSize(gd, trace.outsidetextfont);

                            sliceText.call(Drawing.font, newFont);
                            textBB = Drawing.bBox(sliceText.node());

                            transform = transformOutsideText(textBB, pt);
                        }
                    }

                    var textPosAngle = transform.textPosAngle;
                    var textXY = textPosAngle === undefined ? pt.pxmid : getCoords(cd0.r, textPosAngle);
                    transform.targetX = cx + textXY[0] * transform.rCenter + (transform.x || 0);
                    transform.targetY = cy + textXY[1] * transform.rCenter + (transform.y || 0);
                    computeTransform(transform, textBB);

                    // save some stuff to use later ensure no labels overlap
                    if(transform.outside) {
                        var targetY = transform.targetY;
                        pt.yLabelMin = targetY - textBB.height / 2;
                        pt.yLabelMid = targetY;
                        pt.yLabelMax = targetY + textBB.height / 2;
                        pt.labelExtraX = 0;
                        pt.labelExtraY = 0;
                        hasOutsideText = true;
                    }

                    transform.fontSize = font.size;
                    recordMinTextSize(trace.type, transform, fullLayout);
                    cd[i].transform = transform;

                    sliceText.attr('transform', Lib.getTextTransform(transform));
                });
            });

            // add the title
            var titleTextGroup = d3.select(this).selectAll('g.titletext')
                .data(trace.title.text ? [0] : []);

            titleTextGroup.enter().append('g')
                .classed('titletext', true);
            titleTextGroup.exit().remove();

            titleTextGroup.each(function() {
                var titleText = Lib.ensureSingle(d3.select(this), 'text', '', function(s) {
                    // prohibit tex interpretation as above
                    s.attr('data-notex', 1);
                });

                var txt = trace.title.text;
                if(trace._meta) {
                    txt = Lib.templateString(txt, trace._meta);
                }

                titleText.text(txt)
                    .attr({
                        'class': 'titletext',
                        transform: '',
                        'text-anchor': 'middle',
                    })
                .call(Drawing.font, trace.title.font)
                .call(svgTextUtils.convertToTspans, gd);

                var transform;

                if(trace.title.position === 'middle center') {
                    transform = positionTitleInside(cd0);
                } else {
                    transform = positionTitleOutside(cd0, gs);
                }

                titleText.attr('transform',
                    'translate(' + transform.x + ',' + transform.y + ')' +
                    (transform.scale < 1 ? ('scale(' + transform.scale + ')') : '') +
                    'translate(' + transform.tx + ',' + transform.ty + ')');
            });

            // now make sure no labels overlap (at least within one pie)
            if(hasOutsideText) scootLabels(quadrants, trace);

            plotTextLines(slices, trace);

            if(hasOutsideText && trace.automargin) {
                // TODO if we ever want to improve perf,
                // we could reuse the textBB computed above together
                // with the sliceText transform info
                var traceBbox = Drawing.bBox(plotGroup.node());

                var domain = trace.domain;
                var vpw = gs.w * (domain.x[1] - domain.x[0]);
                var vph = gs.h * (domain.y[1] - domain.y[0]);
                var xgap = (0.5 * vpw - cd0.r) / gs.w;
                var ygap = (0.5 * vph - cd0.r) / gs.h;

                Plots.autoMargin(gd, 'pie.' + trace.uid + '.automargin', {
                    xl: domain.x[0] - xgap,
                    xr: domain.x[1] + xgap,
                    yb: domain.y[0] - ygap,
                    yt: domain.y[1] + ygap,
                    l: Math.max(cd0.cx - cd0.r - traceBbox.left, 0),
                    r: Math.max(traceBbox.right - (cd0.cx + cd0.r), 0),
                    b: Math.max(traceBbox.bottom - (cd0.cy + cd0.r), 0),
                    t: Math.max(cd0.cy - cd0.r - traceBbox.top, 0),
                    pad: 5
                });
            }
        });
    });

    // This is for a bug in Chrome (as of 2015-07-22, and does not affect FF)
    // if insidetextfont and outsidetextfont are different sizes, sometimes the size
    // of an "em" gets taken from the wrong element at first so lines are
    // spaced wrong. You just have to tell it to try again later and it gets fixed.
    // I have no idea why we haven't seen this in other contexts. Also, sometimes
    // it gets the initial draw correct but on redraw it gets confused.
    setTimeout(function() {
        plotGroups.selectAll('tspan').each(function() {
            var s = d3.select(this);
            if(s.attr('dy')) s.attr('dy', s.attr('dy'));
        });
    }, 0);
}

// TODO add support for transition
function plotTextLines(slices, trace) {
    slices.each(function(pt) {
        var sliceTop = d3.select(this);

        if(!pt.labelExtraX && !pt.labelExtraY) {
            sliceTop.select('path.textline').remove();
            return;
        }

        // first move the text to its new location
        var sliceText = sliceTop.select('g.slicetext text');

        pt.transform.targetX += pt.labelExtraX;
        pt.transform.targetY += pt.labelExtraY;

        sliceText.attr('transform', Lib.getTextTransform(pt.transform));

        // then add a line to the new location
        var lineStartX = pt.cxFinal + pt.pxmid[0];
        var lineStartY = pt.cyFinal + pt.pxmid[1];
        var textLinePath = 'M' + lineStartX + ',' + lineStartY;
        var finalX = (pt.yLabelMax - pt.yLabelMin) * (pt.pxmid[0] < 0 ? -1 : 1) / 4;

        if(pt.labelExtraX) {
            var yFromX = pt.labelExtraX * pt.pxmid[1] / pt.pxmid[0];
            var yNet = pt.yLabelMid + pt.labelExtraY - (pt.cyFinal + pt.pxmid[1]);

            if(Math.abs(yFromX) > Math.abs(yNet)) {
                textLinePath +=
                    'l' + (yNet * pt.pxmid[0] / pt.pxmid[1]) + ',' + yNet +
                    'H' + (lineStartX + pt.labelExtraX + finalX);
            } else {
                textLinePath += 'l' + pt.labelExtraX + ',' + yFromX +
                    'v' + (yNet - yFromX) +
                    'h' + finalX;
            }
        } else {
            textLinePath +=
                'V' + (pt.yLabelMid + pt.labelExtraY) +
                'h' + finalX;
        }

        Lib.ensureSingle(sliceTop, 'path', 'textline')
            .call(Color.stroke, trace.outsidetextfont.color)
            .attr({
                'stroke-width': Math.min(2, trace.outsidetextfont.size / 8),
                d: textLinePath,
                fill: 'none'
            });
    });
}

function attachFxHandlers(sliceTop, gd, cd) {
    var cd0 = cd[0];
    var trace = cd0.trace;
    var cx = cd0.cx;
    var cy = cd0.cy;

    // hover state vars
    // have we drawn a hover label, so it should be cleared later
    if(!('_hasHoverLabel' in trace)) trace._hasHoverLabel = false;
    // have we emitted a hover event, so later an unhover event should be emitted
    // note that click events do not depend on this - you can still get them
    // with hovermode: false or if you were earlier dragging, then clicked
    // in the same slice that you moused up in
    if(!('_hasHoverEvent' in trace)) trace._hasHoverEvent = false;

    sliceTop.on('mouseover', function(pt) {
        // in case fullLayout or fullData has changed without a replot
        var fullLayout2 = gd._fullLayout;
        var trace2 = gd._fullData[trace.index];

        if(gd._dragging || fullLayout2.hovermode === false) return;

        var hoverinfo = trace2.hoverinfo;
        if(Array.isArray(hoverinfo)) {
            // super hacky: we need to pull out the *first* hoverinfo from
            // pt.pts, then put it back into an array in a dummy trace
            // and call castHoverinfo on that.
            // TODO: do we want to have Fx.castHoverinfo somehow handle this?
            // it already takes an array for index, for 2D, so this seems tricky.
            hoverinfo = Fx.castHoverinfo({
                hoverinfo: [helpers.castOption(hoverinfo, pt.pts)],
                _module: trace._module
            }, fullLayout2, 0);
        }

        if(hoverinfo === 'all') hoverinfo = 'label+text+value+percent+name';

        // in case we dragged over the pie from another subplot,
        // or if hover is turned off
        if(trace2.hovertemplate || (hoverinfo !== 'none' && hoverinfo !== 'skip' && hoverinfo)) {
            var rInscribed = pt.rInscribed || 0;
            var hoverCenterX = cx + pt.pxmid[0] * (1 - rInscribed);
            var hoverCenterY = cy + pt.pxmid[1] * (1 - rInscribed);
            var separators = fullLayout2.separators;
            var text = [];

            if(hoverinfo && hoverinfo.indexOf('label') !== -1) text.push(pt.label);
            pt.text = helpers.castOption(trace2.hovertext || trace2.text, pt.pts);
            if(hoverinfo && hoverinfo.indexOf('text') !== -1) {
                var tx = pt.text;
                if(Lib.isValidTextValue(tx)) text.push(tx);
            }
            pt.value = pt.v;
            pt.valueLabel = helpers.formatPieValue(pt.v, separators);
            if(hoverinfo && hoverinfo.indexOf('value') !== -1) text.push(pt.valueLabel);
            pt.percent = pt.v / cd0.vTotal;
            pt.percentLabel = helpers.formatPiePercent(pt.percent, separators);
            if(hoverinfo && hoverinfo.indexOf('percent') !== -1) text.push(pt.percentLabel);

            var hoverLabel = trace2.hoverlabel;
            var hoverFont = hoverLabel.font;

            Fx.loneHover({
                trace: trace,
                x0: hoverCenterX - rInscribed * cd0.r,
                x1: hoverCenterX + rInscribed * cd0.r,
                y: hoverCenterY,
                text: text.join('<br>'),
                name: (trace2.hovertemplate || hoverinfo.indexOf('name') !== -1) ? trace2.name : undefined,
                idealAlign: pt.pxmid[0] < 0 ? 'left' : 'right',
                color: helpers.castOption(hoverLabel.bgcolor, pt.pts) || pt.color,
                borderColor: helpers.castOption(hoverLabel.bordercolor, pt.pts),
                fontFamily: helpers.castOption(hoverFont.family, pt.pts),
                fontSize: helpers.castOption(hoverFont.size, pt.pts),
                fontColor: helpers.castOption(hoverFont.color, pt.pts),
                nameLength: helpers.castOption(hoverLabel.namelength, pt.pts),
                textAlign: helpers.castOption(hoverLabel.align, pt.pts),
                hovertemplate: helpers.castOption(trace2.hovertemplate, pt.pts),
                hovertemplateLabels: pt,
                eventData: [eventData(pt, trace2)]
            }, {
                container: fullLayout2._hoverlayer.node(),
                outerContainer: fullLayout2._paper.node(),
                gd: gd
            });

            trace._hasHoverLabel = true;
        }

        trace._hasHoverEvent = true;
        gd.emit('plotly_hover', {
            points: [eventData(pt, trace2)],
            event: d3.event
        });
    });

    sliceTop.on('mouseout', function(evt) {
        var fullLayout2 = gd._fullLayout;
        var trace2 = gd._fullData[trace.index];
        var pt = d3.select(this).datum();

        if(trace._hasHoverEvent) {
            evt.originalEvent = d3.event;
            gd.emit('plotly_unhover', {
                points: [eventData(pt, trace2)],
                event: d3.event
            });
            trace._hasHoverEvent = false;
        }

        if(trace._hasHoverLabel) {
            Fx.loneUnhover(fullLayout2._hoverlayer.node());
            trace._hasHoverLabel = false;
        }
    });

    sliceTop.on('click', function(pt) {
        // TODO: this does not support right-click. If we want to support it, we
        // would likely need to change pie to use dragElement instead of straight
        // mapbox event binding. Or perhaps better, make a simple wrapper with the
        // right mousedown, mousemove, and mouseup handlers just for a left/right click
        // mapbox would use this too.
        var fullLayout2 = gd._fullLayout;
        var trace2 = gd._fullData[trace.index];

        if(gd._dragging || fullLayout2.hovermode === false) return;

        gd._hoverdata = [eventData(pt, trace2)];
        Fx.click(gd, d3.event);
    });
}

function determineOutsideTextFont(trace, pt, layoutFont) {
    var color =
        helpers.castOption(trace.outsidetextfont.color, pt.pts) ||
        helpers.castOption(trace.textfont.color, pt.pts) ||
        layoutFont.color;

    var family =
        helpers.castOption(trace.outsidetextfont.family, pt.pts) ||
        helpers.castOption(trace.textfont.family, pt.pts) ||
        layoutFont.family;

    var size =
        helpers.castOption(trace.outsidetextfont.size, pt.pts) ||
        helpers.castOption(trace.textfont.size, pt.pts) ||
        layoutFont.size;

    return {
        color: color,
        family: family,
        size: size
    };
}

function determineInsideTextFont(trace, pt, layoutFont) {
    var customColor = helpers.castOption(trace.insidetextfont.color, pt.pts);
    if(!customColor && trace._input.textfont) {
        // Why not simply using trace.textfont? Because if not set, it
        // defaults to layout.font which has a default color. But if
        // textfont.color and insidetextfont.color don't supply a value,
        // a contrasting color shall be used.
        customColor = helpers.castOption(trace._input.textfont.color, pt.pts);
    }

    var family =
        helpers.castOption(trace.insidetextfont.family, pt.pts) ||
        helpers.castOption(trace.textfont.family, pt.pts) ||
        layoutFont.family;

    var size =
        helpers.castOption(trace.insidetextfont.size, pt.pts) ||
        helpers.castOption(trace.textfont.size, pt.pts) ||
        layoutFont.size;

    return {
        color: customColor || Color.contrast(pt.color),
        family: family,
        size: size
    };
}

function prerenderTitles(cdModule, gd) {
    var cd0, trace;

    // Determine the width and height of the title for each pie.
    for(var i = 0; i < cdModule.length; i++) {
        cd0 = cdModule[i][0];
        trace = cd0.trace;

        if(trace.title.text) {
            var txt = trace.title.text;
            if(trace._meta) {
                txt = Lib.templateString(txt, trace._meta);
            }

            var dummyTitle = Drawing.tester.append('text')
              .attr('data-notex', 1)
              .text(txt)
              .call(Drawing.font, trace.title.font)
              .call(svgTextUtils.convertToTspans, gd);
            var bBox = Drawing.bBox(dummyTitle.node(), true);
            cd0.titleBox = {
                width: bBox.width,
                height: bBox.height,
            };
            dummyTitle.remove();
        }
    }
}

function transformInsideText(textBB, pt, cd0) {
    var r = cd0.r || pt.rpx1;
    var rInscribed = pt.rInscribed;

    var isEmpty = pt.startangle === pt.stopangle;
    if(isEmpty) {
        return {
            rCenter: 1 - rInscribed,
            scale: 0,
            rotate: 0,
            textPosAngle: 0
        };
    }

    var ring = pt.ring;
    var isCircle = (ring === 1) && (Math.abs(pt.startangle - pt.stopangle) === Math.PI * 2);

    var halfAngle = pt.halfangle;
    var midAngle = pt.midangle;

    var orientation = cd0.trace.insidetextorientation;
    var isHorizontal = orientation === 'horizontal';
    var isTangential = orientation === 'tangential';
    var isRadial = orientation === 'radial';
    var isAuto = orientation === 'auto';

    var allTransforms = [];
    var newT;

    if(!isAuto) {
        // max size if text is placed (horizontally) at the top or bottom of the arc

        var considerCrossing = function(angle, key) {
            if(isCrossing(pt, angle)) {
                var dStart = Math.abs(angle - pt.startangle);
                var dStop = Math.abs(angle - pt.stopangle);

                var closestEdge = dStart < dStop ? dStart : dStop;

                if(key === 'tan') {
                    newT = calcTanTransform(textBB, r, ring, closestEdge, 0);
                } else { // case of 'rad'
                    newT = calcRadTransform(textBB, r, ring, closestEdge, Math.PI / 2);
                }
                newT.textPosAngle = angle;

                allTransforms.push(newT);
            }
        };

        // to cover all cases with trace.rotation added
        var i;
        if(isHorizontal || isTangential) {
            // top
            for(i = 4; i >= -4; i -= 2) considerCrossing(Math.PI * i, 'tan');
            // bottom
            for(i = 4; i >= -4; i -= 2) considerCrossing(Math.PI * (i + 1), 'tan');
        }
        if(isHorizontal || isRadial) {
            // left
            for(i = 4; i >= -4; i -= 2) considerCrossing(Math.PI * (i + 1.5), 'rad');
            // right
            for(i = 4; i >= -4; i -= 2) considerCrossing(Math.PI * (i + 0.5), 'rad');
        }
    }

    if(isCircle || isAuto || isHorizontal) {
        // max size text can be inserted inside without rotating it
        // this inscribes the text rectangle in a circle, which is then inscribed
        // in the slice, so it will be an underestimate, which some day we may want
        // to improve so this case can get more use
        var textDiameter = Math.sqrt(textBB.width * textBB.width + textBB.height * textBB.height);

        newT = {
            scale: rInscribed * r * 2 / textDiameter,

            // and the center position and rotation in this case
            rCenter: 1 - rInscribed,
            rotate: 0
        };

        newT.textPosAngle = (pt.startangle + pt.stopangle) / 2;
        if(newT.scale >= 1) return newT;

        allTransforms.push(newT);
    }

    if(isAuto || isRadial) {
        newT = calcRadTransform(textBB, r, ring, halfAngle, midAngle);
        newT.textPosAngle = (pt.startangle + pt.stopangle) / 2;
        allTransforms.push(newT);
    }

    if(isAuto || isTangential) {
        newT = calcTanTransform(textBB, r, ring, halfAngle, midAngle);
        newT.textPosAngle = (pt.startangle + pt.stopangle) / 2;
        allTransforms.push(newT);
    }

    var id = 0;
    var maxScale = 0;
    for(var k = 0; k < allTransforms.length; k++) {
        var s = allTransforms[k].scale;
        if(maxScale < s) {
            maxScale = s;
            id = k;
        }

        if(!isAuto && maxScale >= 1) {
            // respect test order for non-auto options
            break;
        }
    }
    return allTransforms[id];
}

function isCrossing(pt, angle) {
    var start = pt.startangle;
    var stop = pt.stopangle;
    return (
        (start > angle && angle > stop) ||
        (start < angle && angle < stop)
    );
}

function calcRadTransform(textBB, r, ring, halfAngle, midAngle) {
    r = Math.max(0, r - 2 * TEXTPAD);

    // max size if text is rotated radially
    var a = textBB.width / textBB.height;
    var s = calcMaxHalfSize(a, halfAngle, r, ring);
    return {
        scale: s * 2 / textBB.height,
        rCenter: calcRCenter(a, s / r),
        rotate: calcRotate(midAngle)
    };
}

function calcTanTransform(textBB, r, ring, halfAngle, midAngle) {
    r = Math.max(0, r - 2 * TEXTPAD);

    // max size if text is rotated tangentially
    var a = textBB.height / textBB.width;
    var s = calcMaxHalfSize(a, halfAngle, r, ring);
    return {
        scale: s * 2 / textBB.width,
        rCenter: calcRCenter(a, s / r),
        rotate: calcRotate(midAngle + Math.PI / 2)
    };
}

function calcRCenter(a, b) {
    return Math.cos(b) - a * b;
}

function calcRotate(t) {
    return (180 / Math.PI * t + 720) % 180 - 90;
}

function calcMaxHalfSize(a, halfAngle, r, ring) {
    var q = a + 1 / (2 * Math.tan(halfAngle));
    return r * Math.min(
        1 / (Math.sqrt(q * q + 0.5) + q),
        ring / (Math.sqrt(a * a + ring / 2) + a)
    );
}

function getInscribedRadiusFraction(pt, cd0) {
    if(pt.v === cd0.vTotal && !cd0.trace.hole) return 1;// special case of 100% with no hole

    return Math.min(1 / (1 + 1 / Math.sin(pt.halfangle)), pt.ring / 2);
}

function transformOutsideText(textBB, pt) {
    var x = pt.pxmid[0];
    var y = pt.pxmid[1];
    var dx = textBB.width / 2;
    var dy = textBB.height / 2;

    if(x < 0) dx *= -1;
    if(y < 0) dy *= -1;

    return {
        scale: 1,
        rCenter: 1,
        rotate: 0,
        x: dx + Math.abs(dy) * (dx > 0 ? 1 : -1) / 2,
        y: dy / (1 + x * x / (y * y)),
        outside: true
    };
}

function positionTitleInside(cd0) {
    var textDiameter =
        Math.sqrt(cd0.titleBox.width * cd0.titleBox.width + cd0.titleBox.height * cd0.titleBox.height);
    return {
        x: cd0.cx,
        y: cd0.cy,
        scale: cd0.trace.hole * cd0.r * 2 / textDiameter,
        tx: 0,
        ty: - cd0.titleBox.height / 2 + cd0.trace.title.font.size
    };
}

function positionTitleOutside(cd0, plotSize) {
    var scaleX = 1;
    var scaleY = 1;
    var maxPull;

    var trace = cd0.trace;
    // position of the baseline point of the text box in the plot, before scaling.
    // we anchored the text in the middle, so the baseline is on the bottom middle
    // of the first line of text.
    var topMiddle = {
        x: cd0.cx,
        y: cd0.cy
    };
    // relative translation of the text box after scaling
    var translate = {
        tx: 0,
        ty: 0
    };

    // we reason below as if the baseline is the top middle point of the text box.
    // so we must add the font size to approximate the y-coord. of the top.
    // note that this correction must happen after scaling.
    translate.ty += trace.title.font.size;
    maxPull = getMaxPull(trace);

    if(trace.title.position.indexOf('top') !== -1) {
        topMiddle.y -= (1 + maxPull) * cd0.r;
        translate.ty -= cd0.titleBox.height;
    } else if(trace.title.position.indexOf('bottom') !== -1) {
        topMiddle.y += (1 + maxPull) * cd0.r;
    }

    var rx = applyAspectRatio(cd0.r, cd0.trace.aspectratio);

    var maxWidth = plotSize.w * (trace.domain.x[1] - trace.domain.x[0]) / 2;
    if(trace.title.position.indexOf('left') !== -1) {
        // we start the text at the left edge of the pie
        maxWidth = maxWidth + rx;
        topMiddle.x -= (1 + maxPull) * rx;
        translate.tx += cd0.titleBox.width / 2;
    } else if(trace.title.position.indexOf('center') !== -1) {
        maxWidth *= 2;
    } else if(trace.title.position.indexOf('right') !== -1) {
        maxWidth = maxWidth + rx;
        topMiddle.x += (1 + maxPull) * rx;
        translate.tx -= cd0.titleBox.width / 2;
    }
    scaleX = maxWidth / cd0.titleBox.width;
    scaleY = getTitleSpace(cd0, plotSize) / cd0.titleBox.height;
    return {
        x: topMiddle.x,
        y: topMiddle.y,
        scale: Math.min(scaleX, scaleY),
        tx: translate.tx,
        ty: translate.ty
    };
}

function applyAspectRatio(x, aspectratio) {
    return x / ((aspectratio === undefined) ? 1 : aspectratio);
}

function getTitleSpace(cd0, plotSize) {
    var trace = cd0.trace;
    var pieBoxHeight = plotSize.h * (trace.domain.y[1] - trace.domain.y[0]);
    // use at most half of the plot for the title
    return Math.min(cd0.titleBox.height, pieBoxHeight / 2);
}

function getMaxPull(trace) {
    var maxPull = trace.pull;
    if(!maxPull) return 0;

    var j;
    if(Array.isArray(maxPull)) {
        maxPull = 0;
        for(j = 0; j < trace.pull.length; j++) {
            if(trace.pull[j] > maxPull) maxPull = trace.pull[j];
        }
    }
    return maxPull;
}

function scootLabels(quadrants, trace) {
    var xHalf, yHalf, equatorFirst, farthestX, farthestY,
        xDiffSign, yDiffSign, thisQuad, oppositeQuad,
        wholeSide, i, thisQuadOutside, firstOppositeOutsidePt;

    function topFirst(a, b) { return a.pxmid[1] - b.pxmid[1]; }
    function bottomFirst(a, b) { return b.pxmid[1] - a.pxmid[1]; }

    function scootOneLabel(thisPt, prevPt) {
        if(!prevPt) prevPt = {};

        var prevOuterY = prevPt.labelExtraY + (yHalf ? prevPt.yLabelMax : prevPt.yLabelMin);
        var thisInnerY = yHalf ? thisPt.yLabelMin : thisPt.yLabelMax;
        var thisOuterY = yHalf ? thisPt.yLabelMax : thisPt.yLabelMin;
        var thisSliceOuterY = thisPt.cyFinal + farthestY(thisPt.px0[1], thisPt.px1[1]);
        var newExtraY = prevOuterY - thisInnerY;

        var xBuffer, i, otherPt, otherOuterY, otherOuterX, newExtraX;

        // make sure this label doesn't overlap other labels
        // this *only* has us move these labels vertically
        if(newExtraY * yDiffSign > 0) thisPt.labelExtraY = newExtraY;

        // make sure this label doesn't overlap any slices
        if(!Array.isArray(trace.pull)) return; // this can only happen with array pulls

        for(i = 0; i < wholeSide.length; i++) {
            otherPt = wholeSide[i];

            // overlap can only happen if the other point is pulled more than this one
            if(otherPt === thisPt || (
                (helpers.castOption(trace.pull, thisPt.pts) || 0) >=
                (helpers.castOption(trace.pull, otherPt.pts) || 0))
            ) {
                continue;
            }

            if((thisPt.pxmid[1] - otherPt.pxmid[1]) * yDiffSign > 0) {
                // closer to the equator - by construction all of these happen first
                // move the text vertically to get away from these slices
                otherOuterY = otherPt.cyFinal + farthestY(otherPt.px0[1], otherPt.px1[1]);
                newExtraY = otherOuterY - thisInnerY - thisPt.labelExtraY;

                if(newExtraY * yDiffSign > 0) thisPt.labelExtraY += newExtraY;
            } else if((thisOuterY + thisPt.labelExtraY - thisSliceOuterY) * yDiffSign > 0) {
                // farther from the equator - happens after we've done all the
                // vertical moving we're going to do
                // move horizontally to get away from these more polar slices

                // if we're moving horz. based on a slice that's several slices away from this one
                // then we need some extra space for the lines to labels between them
                xBuffer = 3 * xDiffSign * Math.abs(i - wholeSide.indexOf(thisPt));

                otherOuterX = otherPt.cxFinal + farthestX(otherPt.px0[0], otherPt.px1[0]);
                newExtraX = otherOuterX + xBuffer - (thisPt.cxFinal + thisPt.pxmid[0]) - thisPt.labelExtraX;

                if(newExtraX * xDiffSign > 0) thisPt.labelExtraX += newExtraX;
            }
        }
    }

    for(yHalf = 0; yHalf < 2; yHalf++) {
        equatorFirst = yHalf ? topFirst : bottomFirst;
        farthestY = yHalf ? Math.max : Math.min;
        yDiffSign = yHalf ? 1 : -1;

        for(xHalf = 0; xHalf < 2; xHalf++) {
            farthestX = xHalf ? Math.max : Math.min;
            xDiffSign = xHalf ? 1 : -1;

            // first sort the array
            // note this is a copy of cd, so cd itself doesn't get sorted
            // but we can still modify points in place.
            thisQuad = quadrants[yHalf][xHalf];
            thisQuad.sort(equatorFirst);

            oppositeQuad = quadrants[1 - yHalf][xHalf];
            wholeSide = oppositeQuad.concat(thisQuad);

            thisQuadOutside = [];
            for(i = 0; i < thisQuad.length; i++) {
                if(thisQuad[i].yLabelMid !== undefined) thisQuadOutside.push(thisQuad[i]);
            }

            firstOppositeOutsidePt = false;
            for(i = 0; yHalf && i < oppositeQuad.length; i++) {
                if(oppositeQuad[i].yLabelMid !== undefined) {
                    firstOppositeOutsidePt = oppositeQuad[i];
                    break;
                }
            }

            // each needs to avoid the previous
            for(i = 0; i < thisQuadOutside.length; i++) {
                var prevPt = i && thisQuadOutside[i - 1];
                // bottom half needs to avoid the first label of the top half
                // top half we still need to call scootOneLabel on the first slice
                // so we can avoid other slices, but we don't pass a prevPt
                if(firstOppositeOutsidePt && !i) prevPt = firstOppositeOutsidePt;
                scootOneLabel(thisQuadOutside[i], prevPt);
            }
        }
    }
}

function layoutAreas(cdModule, plotSize) {
    var scaleGroups = [];

    // figure out the center and maximum radius
    for(var i = 0; i < cdModule.length; i++) {
        var cd0 = cdModule[i][0];
        var trace = cd0.trace;

        var domain = trace.domain;
        var width = plotSize.w * (domain.x[1] - domain.x[0]);
        var height = plotSize.h * (domain.y[1] - domain.y[0]);
        // leave some space for the title, if it will be displayed outside
        if(trace.title.text && trace.title.position !== 'middle center') {
            height -= getTitleSpace(cd0, plotSize);
        }

        var rx = width / 2;
        var ry = height / 2;
        if(trace.type === 'funnelarea' && !trace.scalegroup) {
            ry /= trace.aspectratio;
        }

        cd0.r = Math.min(rx, ry) / (1 + getMaxPull(trace));

        cd0.cx = plotSize.l + plotSize.w * (trace.domain.x[1] + trace.domain.x[0]) / 2;
        cd0.cy = plotSize.t + plotSize.h * (1 - trace.domain.y[0]) - height / 2;
        if(trace.title.text && trace.title.position.indexOf('bottom') !== -1) {
            cd0.cy -= getTitleSpace(cd0, plotSize);
        }

        if(trace.scalegroup && scaleGroups.indexOf(trace.scalegroup) === -1) {
            scaleGroups.push(trace.scalegroup);
        }
    }

    groupScale(cdModule, scaleGroups);
}

function groupScale(cdModule, scaleGroups) {
    var cd0, i, trace;

    // scale those that are grouped
    for(var k = 0; k < scaleGroups.length; k++) {
        var min = Infinity;
        var g = scaleGroups[k];

        for(i = 0; i < cdModule.length; i++) {
            cd0 = cdModule[i][0];
            trace = cd0.trace;

            if(trace.scalegroup === g) {
                var area;
                if(trace.type === 'pie') {
                    area = cd0.r * cd0.r;
                } else if(trace.type === 'funnelarea') {
                    var rx, ry;

                    if(trace.aspectratio > 1) {
                        rx = cd0.r;
                        ry = rx / trace.aspectratio;
                    } else {
                        ry = cd0.r;
                        rx = ry * trace.aspectratio;
                    }

                    rx *= (1 + trace.baseratio) / 2;

                    area = rx * ry;
                }

                min = Math.min(min, area / cd0.vTotal);
            }
        }

        for(i = 0; i < cdModule.length; i++) {
            cd0 = cdModule[i][0];
            trace = cd0.trace;
            if(trace.scalegroup === g) {
                var v = min * cd0.vTotal;
                if(trace.type === 'funnelarea') {
                    v /= (1 + trace.baseratio) / 2;
                    v /= trace.aspectratio;
                }

                cd0.r = Math.sqrt(v);
            }
        }
    }
}

function setCoords(cd) {
    var cd0 = cd[0];
    var r = cd0.r;
    var trace = cd0.trace;
    var currentAngle = trace.rotation * Math.PI / 180;
    var angleFactor = 2 * Math.PI / cd0.vTotal;
    var firstPt = 'px0';
    var lastPt = 'px1';

    var i, cdi, currentCoords;

    if(trace.direction === 'counterclockwise') {
        for(i = 0; i < cd.length; i++) {
            if(!cd[i].hidden) break; // find the first non-hidden slice
        }
        if(i === cd.length) return; // all slices hidden

        currentAngle += angleFactor * cd[i].v;
        angleFactor *= -1;
        firstPt = 'px1';
        lastPt = 'px0';
    }

    currentCoords = getCoords(r, currentAngle);

    for(i = 0; i < cd.length; i++) {
        cdi = cd[i];
        if(cdi.hidden) continue;

        cdi[firstPt] = currentCoords;

        cdi.startangle = currentAngle;
        currentAngle += angleFactor * cdi.v / 2;
        cdi.pxmid = getCoords(r, currentAngle);
        cdi.midangle = currentAngle;
        currentAngle += angleFactor * cdi.v / 2;
        currentCoords = getCoords(r, currentAngle);
        cdi.stopangle = currentAngle;

        cdi[lastPt] = currentCoords;

        cdi.largeArc = (cdi.v > cd0.vTotal / 2) ? 1 : 0;

        cdi.halfangle = Math.PI * Math.min(cdi.v / cd0.vTotal, 0.5);
        cdi.ring = 1 - trace.hole;
        cdi.rInscribed = getInscribedRadiusFraction(cdi, cd0);
    }
}

function getCoords(r, angle) {
    return [r * Math.sin(angle), -r * Math.cos(angle)];
}

function formatSliceLabel(gd, pt, cd0) {
    var fullLayout = gd._fullLayout;
    var trace = cd0.trace;
    // look for textemplate
    var texttemplate = trace.texttemplate;

    // now insert text
    var textinfo = trace.textinfo;
    if(!texttemplate && textinfo && textinfo !== 'none') {
        var parts = textinfo.split('+');
        var hasFlag = function(flag) { return parts.indexOf(flag) !== -1; };
        var hasLabel = hasFlag('label');
        var hasText = hasFlag('text');
        var hasValue = hasFlag('value');
        var hasPercent = hasFlag('percent');

        var separators = fullLayout.separators;
        var text;

        text = hasLabel ? [pt.label] : [];
        if(hasText) {
            var tx = helpers.getFirstFilled(trace.text, pt.pts);
            if(isValidTextValue(tx)) text.push(tx);
        }
        if(hasValue) text.push(helpers.formatPieValue(pt.v, separators));
        if(hasPercent) text.push(helpers.formatPiePercent(pt.v / cd0.vTotal, separators));
        pt.text = text.join('<br>');
    }

    function makeTemplateVariables(pt) {
        return {
            label: pt.label,
            value: pt.v,
            valueLabel: helpers.formatPieValue(pt.v, fullLayout.separators),
            percent: pt.v / cd0.vTotal,
            percentLabel: helpers.formatPiePercent(pt.v / cd0.vTotal, fullLayout.separators),
            color: pt.color,
            text: pt.text,
            customdata: Lib.castOption(trace, pt.i, 'customdata')
        };
    }

    if(texttemplate) {
        var txt = Lib.castOption(trace, pt.i, 'texttemplate');
        if(!txt) {
            pt.text = '';
        } else {
            var obj = makeTemplateVariables(pt);
            var ptTx = helpers.getFirstFilled(trace.text, pt.pts);
            if(isValidTextValue(ptTx) || ptTx === '') obj.text = ptTx;
            pt.text = Lib.texttemplateString(txt, obj, gd._fullLayout._d3locale, obj, trace._meta || {});
        }
    }
}

function computeTransform(
    transform,  // inout
    textBB      // in
) {
    var a = transform.rotate * Math.PI / 180;
    var cosA = Math.cos(a);
    var sinA = Math.sin(a);
    var midX = (textBB.left + textBB.right) / 2;
    var midY = (textBB.top + textBB.bottom) / 2;
    transform.textX = midX * cosA - midY * sinA;
    transform.textY = midX * sinA + midY * cosA;
    transform.noCenter = true;
}

module.exports = {
    plot: plot,
    formatSliceLabel: formatSliceLabel,
    transformInsideText: transformInsideText,
    determineInsideTextFont: determineInsideTextFont,
    positionTitleOutside: positionTitleOutside,
    prerenderTitles: prerenderTitles,
    layoutAreas: layoutAreas,
    attachFxHandlers: attachFxHandlers,
    computeTransform: computeTransform
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGllL2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9waWUvZXZlbnRfZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9wbG90LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLGdGQUF3QjtBQUNoRCxrQkFBa0Isd0dBQXdDO0FBQzFELGdCQUFnQixtQkFBTyxDQUFDLDBGQUE2QjtBQUNyRCxpQkFBaUIsbUJBQU8sQ0FBQyxzR0FBbUM7QUFDNUQseUJBQXlCLDBJQUE2RDtBQUN0Rix3QkFBd0IseUlBQTREOztBQUVwRixpQkFBaUIsb0dBQXNDOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw0QkFBNEI7QUFDNUI7QUFDQSxLQUFLO0FBQ0wsd0NBQXdDO0FBQ3hDO0FBQ0EsS0FBSztBQUNMLHFDQUFxQyxpQkFBaUI7QUFDdEQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsMkJBQTJCO0FBQzNCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxpQ0FBaUM7QUFDakM7QUFDQSxLQUFLO0FBQ0wsa0NBQWtDO0FBQ2xDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLHlCQUF5QiwyQ0FBMkM7O0FBRXBFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxnQ0FBZ0M7QUFDaEM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw4REFBZ0I7QUFDeEMsZ0JBQWdCLG1CQUFPLENBQUMsMERBQVk7O0FBRXBDLFlBQVksbUJBQU8sQ0FBQyxzRkFBd0I7O0FBRTVDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxrQkFBa0IsRUFBRTs7QUFFL0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLHFDQUFxQztBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IscUJBQXFCO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsZUFBZTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTs7QUFFQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGtDQUFrQywySUFBa0U7O0FBRXBHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLG1DQUFJOztBQUVyQixZQUFZLG1CQUFPLENBQUMsc0VBQW1CO0FBQ3ZDLFNBQVMsbUJBQU8sQ0FBQyxnRkFBcUI7QUFDdEMsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxjQUFjLG1CQUFPLENBQUMsMEZBQTBCO0FBQ2hELFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixtQkFBbUIsbUJBQU8sQ0FBQyxvRkFBMEI7QUFDckQsa0JBQWtCLG1CQUFPLENBQUMsb0ZBQXFCO0FBQy9DO0FBQ0E7QUFDQSxjQUFjLDJHQUFtQzs7QUFFakQsY0FBYyxtQkFBTyxDQUFDLHFFQUFXO0FBQ2pDLGdCQUFnQixtQkFBTyxDQUFDLDJFQUFjO0FBQ3RDLHVCQUF1QixrR0FBcUM7O0FBRTVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsd0JBQXdCOztBQUVwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IscUJBQXFCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFNBQVM7QUFDL0I7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLDBCQUEwQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdEQUF3RDs7QUFFeEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsdUJBQXVCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLGdDQUFnQztBQUM3RCxnQ0FBZ0MsZ0NBQWdDOztBQUVoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOENBQThDOztBQUU5QyxrQkFBa0Isc0JBQXNCO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixXQUFXO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsV0FBVztBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixxQkFBcUI7QUFDM0M7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixrQ0FBa0M7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiw0QkFBNEI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixxQkFBcUI7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBOztBQUVBLGtCQUFrQixxQkFBcUI7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixxQkFBcUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxrQkFBa0IsZUFBZTtBQUNqQyxvQ0FBb0M7QUFDcEM7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsY0FBYyxlQUFlO0FBQzdCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxtQ0FBbUM7QUFDekU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHVHQUF1RztBQUN2RztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDQ1YmEwYTk3ZjQyNTI3OTEwNmY1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmFzZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvYXR0cmlidXRlcycpO1xudmFyIGRvbWFpbkF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZG9tYWluJykuYXR0cmlidXRlcztcbnZhciBmb250QXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9mb250X2F0dHJpYnV0ZXMnKTtcbnZhciBjb2xvckF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvci9hdHRyaWJ1dGVzJyk7XG52YXIgaG92ZXJ0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLmhvdmVydGVtcGxhdGVBdHRycztcbnZhciB0ZXh0dGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS50ZXh0dGVtcGxhdGVBdHRycztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxudmFyIHRleHRGb250QXR0cnMgPSBmb250QXR0cnMoe1xuICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgYXJyYXlPazogdHJ1ZSxcbiAgICBjb2xvckVkaXRUeXBlOiAncGxvdCcsXG4gICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBmb250IHVzZWQgZm9yIGB0ZXh0aW5mb2AuJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxhYmVsczoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgc2VjdG9yIGxhYmVscy4nLFxuICAgICAgICAgICAgJ0lmIGBsYWJlbHNgIGVudHJpZXMgYXJlIGR1cGxpY2F0ZWQsIHdlIHN1bSBhc3NvY2lhdGVkIGB2YWx1ZXNgJyxcbiAgICAgICAgICAgICdvciBzaW1wbHkgY291bnQgb2NjdXJyZW5jZXMgaWYgYHZhbHVlc2AgaXMgbm90IHByb3ZpZGVkLicsXG4gICAgICAgICAgICAnRm9yIG90aGVyIGFycmF5IGF0dHJpYnV0ZXMgKGluY2x1ZGluZyBjb2xvcikgd2UgdXNlIHRoZSBmaXJzdCcsXG4gICAgICAgICAgICAnbm9uLWVtcHR5IGVudHJ5IGFtb25nIGFsbCBvY2N1cnJlbmNlcyBvZiB0aGUgbGFiZWwuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgLy8gZXF1aXZhbGVudCBvZiB4MCBhbmQgZHgsIGlmIGxhYmVsIGlzIG1pc3NpbmdcbiAgICBsYWJlbDA6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdBbHRlcm5hdGUgdG8gYGxhYmVsc2AuJyxcbiAgICAgICAgICAgICdCdWlsZHMgYSBudW1lcmljIHNldCBvZiBsYWJlbHMuJyxcbiAgICAgICAgICAgICdVc2Ugd2l0aCBgZGxhYmVsYCcsXG4gICAgICAgICAgICAnd2hlcmUgYGxhYmVsMGAgaXMgdGhlIHN0YXJ0aW5nIGxhYmVsIGFuZCBgZGxhYmVsYCB0aGUgc3RlcC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBkbGFiZWw6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBsYWJlbCBzdGVwLiBTZWUgYGxhYmVsMGAgZm9yIG1vcmUgaW5mby4nXG4gICAgfSxcblxuICAgIHZhbHVlczoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgdmFsdWVzIG9mIHRoZSBzZWN0b3JzLicsXG4gICAgICAgICAgICAnSWYgb21pdHRlZCwgd2UgY291bnQgb2NjdXJyZW5jZXMgb2YgZWFjaCBsYWJlbC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIG1hcmtlcjoge1xuICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JywgIC8vIFRPRE8gJ2NvbG9yX2FycmF5JyA/XG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgY29sb3Igb2YgZWFjaCBzZWN0b3IuJyxcbiAgICAgICAgICAgICAgICAnSWYgbm90IHNwZWNpZmllZCwgdGhlIGRlZmF1bHQgdHJhY2UgY29sb3Igc2V0IGlzIHVzZWQnLFxuICAgICAgICAgICAgICAgICd0byBwaWNrIHRoZSBzZWN0b3IgY29sb3JzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG5cbiAgICAgICAgbGluZToge1xuICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZGZsdDogY29sb3JBdHRycy5kZWZhdWx0TGluZSxcbiAgICAgICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgbGluZSBlbmNsb3NpbmcgZWFjaCBzZWN0b3IuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIHdpZHRoIChpbiBweCkgb2YgdGhlIGxpbmUgZW5jbG9zaW5nIGVhY2ggc2VjdG9yLidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sXG5cbiAgICB0ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggc2VjdG9yLicsXG4gICAgICAgICAgICAnSWYgdHJhY2UgYHRleHRpbmZvYCBjb250YWlucyBhICp0ZXh0KiBmbGFnLCB0aGVzZSBlbGVtZW50cyB3aWxsIGJlIHNlZW4nLFxuICAgICAgICAgICAgJ29uIHRoZSBjaGFydC4nLFxuICAgICAgICAgICAgJ0lmIHRyYWNlIGBob3ZlcmluZm9gIGNvbnRhaW5zIGEgKnRleHQqIGZsYWcgYW5kICpob3ZlcnRleHQqIGlzIG5vdCBzZXQsJyxcbiAgICAgICAgICAgICd0aGVzZSBlbGVtZW50cyB3aWxsIGJlIHNlZW4gaW4gdGhlIGhvdmVyIGxhYmVscy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBob3ZlcnRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgaG92ZXIgdGV4dCBlbGVtZW50cyBhc3NvY2lhdGVkIHdpdGggZWFjaCBzZWN0b3IuJyxcbiAgICAgICAgICAgICdJZiBhIHNpbmdsZSBzdHJpbmcsIHRoZSBzYW1lIHN0cmluZyBhcHBlYXJzIGZvcicsXG4gICAgICAgICAgICAnYWxsIGRhdGEgcG9pbnRzLicsXG4gICAgICAgICAgICAnSWYgYW4gYXJyYXkgb2Ygc3RyaW5nLCB0aGUgaXRlbXMgYXJlIG1hcHBlZCBpbiBvcmRlciBvZicsXG4gICAgICAgICAgICAndGhpcyB0cmFjZVxcJ3Mgc2VjdG9ycy4nLFxuICAgICAgICAgICAgJ1RvIGJlIHNlZW4sIHRyYWNlIGBob3ZlcmluZm9gIG11c3QgY29udGFpbiBhICp0ZXh0KiBmbGFnLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4vLyAnc2VlIGVnOidcbi8vICdodHRwczovL3d3dy5lLWVkdWNhdGlvbi5wc3UuZWR1L25hdHVyZW9mZ2VvaW5mby9zaXRlcy93d3cuZS1lZHVjYXRpb24ucHN1LmVkdS5uYXR1cmVvZmdlb2luZm8vZmlsZXMvaW1hZ2UvaGlzcF9waWVzLmdpZicsXG4vLyAnKHRoaXMgZXhhbXBsZSBpbnZvbHZlcyBhIG1hcCB0b28gLSBtYXkgc29tZWRheSBiZSBhIHdob2xlIHRyYWNlIHR5cGUnLFxuLy8gJ29mIGl0cyBvd24uIGJ1dCB0aGUgcG9pbnQgaXMgdGhlIHNpemUgb2YgdGhlIHdob2xlIHBpZSBpcyBpbXBvcnRhbnQuKSdcbiAgICBzY2FsZWdyb3VwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0lmIHRoZXJlIGFyZSBtdWx0aXBsZSBwaWUgY2hhcnRzIHRoYXQgc2hvdWxkIGJlIHNpemVkIGFjY29yZGluZyB0bycsXG4gICAgICAgICAgICAndGhlaXIgdG90YWxzLCBsaW5rIHRoZW0gYnkgcHJvdmlkaW5nIGEgbm9uLWVtcHR5IGdyb3VwIGlkIGhlcmUnLFxuICAgICAgICAgICAgJ3NoYXJlZCBieSBldmVyeSB0cmFjZSBpbiB0aGUgc2FtZSBncm91cC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIC8vIGxhYmVscyAobGVnZW5kIGlzIGhhbmRsZWQgYnkgcGxvdHMuYXR0cmlidXRlcy5zaG93bGVnZW5kIGFuZCBsYXlvdXQuaGlkZGVubGFiZWxzKVxuICAgIHRleHRpbmZvOiB7XG4gICAgICAgIHZhbFR5cGU6ICdmbGFnbGlzdCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZmxhZ3M6IFsnbGFiZWwnLCAndGV4dCcsICd2YWx1ZScsICdwZXJjZW50J10sXG4gICAgICAgIGV4dHJhczogWydub25lJ10sXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGljaCB0cmFjZSBpbmZvcm1hdGlvbiBhcHBlYXIgb24gdGhlIGdyYXBoLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbywge1xuICAgICAgICBmbGFnczogWydsYWJlbCcsICd0ZXh0JywgJ3ZhbHVlJywgJ3BlcmNlbnQnLCAnbmFtZSddXG4gICAgfSksXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHt9LCB7XG4gICAgICAgIGtleXM6IFsnbGFiZWwnLCAnY29sb3InLCAndmFsdWUnLCAncGVyY2VudCcsICd0ZXh0J11cbiAgICB9KSxcbiAgICB0ZXh0dGVtcGxhdGU6IHRleHR0ZW1wbGF0ZUF0dHJzKHtlZGl0VHlwZTogJ3Bsb3QnfSwge1xuICAgICAgICBrZXlzOiBbJ2xhYmVsJywgJ2NvbG9yJywgJ3ZhbHVlJywgJ3BlcmNlbnQnLCAndGV4dCddXG4gICAgfSksXG4gICAgdGV4dHBvc2l0aW9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICB2YWx1ZXM6IFsnaW5zaWRlJywgJ291dHNpZGUnLCAnYXV0bycsICdub25lJ10sXG4gICAgICAgIGRmbHQ6ICdhdXRvJyxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTcGVjaWZpZXMgdGhlIGxvY2F0aW9uIG9mIHRoZSBgdGV4dGluZm9gLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHRleHRmb250OiBleHRlbmRGbGF0KHt9LCB0ZXh0Rm9udEF0dHJzLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZm9udCB1c2VkIGZvciBgdGV4dGluZm9gLidcbiAgICB9KSxcbiAgICBpbnNpZGV0ZXh0b3JpZW50YXRpb246IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIHZhbHVlczogWydob3Jpem9udGFsJywgJ3JhZGlhbCcsICd0YW5nZW50aWFsJywgJ2F1dG8nXSxcbiAgICAgICAgZGZsdDogJ2F1dG8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0NvbnRyb2xzIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgdGV4dCBpbnNpZGUgY2hhcnQgc2VjdG9ycy4nLFxuICAgICAgICAgICAgJ1doZW4gc2V0IHRvICphdXRvKiwgdGV4dCBtYXkgYmUgb3JpZW50ZWQgaW4gYW55IGRpcmVjdGlvbiBpbiBvcmRlcicsXG4gICAgICAgICAgICAndG8gYmUgYXMgYmlnIGFzIHBvc3NpYmxlIGluIHRoZSBtaWRkbGUgb2YgYSBzZWN0b3IuJyxcbiAgICAgICAgICAgICdUaGUgKmhvcml6b250YWwqIG9wdGlvbiBvcmllbnRzIHRleHQgdG8gYmUgcGFyYWxsZWwgd2l0aCB0aGUgYm90dG9tJyxcbiAgICAgICAgICAgICdvZiB0aGUgY2hhcnQsIGFuZCBtYXkgbWFrZSB0ZXh0IHNtYWxsZXIgaW4gb3JkZXIgdG8gYWNoaWV2ZSB0aGF0IGdvYWwuJyxcbiAgICAgICAgICAgICdUaGUgKnJhZGlhbCogb3B0aW9uIG9yaWVudHMgdGV4dCBhbG9uZyB0aGUgcmFkaXVzIG9mIHRoZSBzZWN0b3IuJyxcbiAgICAgICAgICAgICdUaGUgKnRhbmdlbnRpYWwqIG9wdGlvbiBvcmllbnRzIHRleHQgcGVycGVuZGljdWxhciB0byB0aGUgcmFkaXVzIG9mIHRoZSBzZWN0b3IuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgaW5zaWRldGV4dGZvbnQ6IGV4dGVuZEZsYXQoe30sIHRleHRGb250QXR0cnMsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBmb250IHVzZWQgZm9yIGB0ZXh0aW5mb2AgbHlpbmcgaW5zaWRlIHRoZSBzZWN0b3IuJ1xuICAgIH0pLFxuICAgIG91dHNpZGV0ZXh0Zm9udDogZXh0ZW5kRmxhdCh7fSwgdGV4dEZvbnRBdHRycywge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGZvbnQgdXNlZCBmb3IgYHRleHRpbmZvYCBseWluZyBvdXRzaWRlIHRoZSBzZWN0b3IuJ1xuICAgIH0pLFxuICAgIGF1dG9tYXJnaW46IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvdXRzaWRlIHRleHQgbGFiZWxzIGNhbiBwdXNoIHRoZSBtYXJnaW5zLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgdGl0bGU6IHtcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB0aXRsZSBvZiB0aGUgY2hhcnQuJyxcbiAgICAgICAgICAgICAgICAnSWYgaXQgaXMgZW1wdHksIG5vIHRpdGxlIGlzIGRpc3BsYXllZC4nLFxuICAgICAgICAgICAgICAgICdOb3RlIHRoYXQgYmVmb3JlIHRoZSBleGlzdGVuY2Ugb2YgYHRpdGxlLnRleHRgLCB0aGUgdGl0bGVcXCdzJyxcbiAgICAgICAgICAgICAgICAnY29udGVudHMgdXNlZCB0byBiZSBkZWZpbmVkIGFzIHRoZSBgdGl0bGVgIGF0dHJpYnV0ZSBpdHNlbGYuJyxcbiAgICAgICAgICAgICAgICAnVGhpcyBiZWhhdmlvciBoYXMgYmVlbiBkZXByZWNhdGVkLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGZvbnQ6IGV4dGVuZEZsYXQoe30sIHRleHRGb250QXR0cnMsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGZvbnQgdXNlZCBmb3IgYHRpdGxlYC4nLFxuICAgICAgICAgICAgICAgICdOb3RlIHRoYXQgdGhlIHRpdGxlXFwncyBmb250IHVzZWQgdG8gYmUgc2V0JyxcbiAgICAgICAgICAgICAgICAnYnkgdGhlIG5vdyBkZXByZWNhdGVkIGB0aXRsZWZvbnRgIGF0dHJpYnV0ZS4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9KSxcbiAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgICAgICd0b3AgbGVmdCcsICd0b3AgY2VudGVyJywgJ3RvcCByaWdodCcsXG4gICAgICAgICAgICAgICAgJ21pZGRsZSBjZW50ZXInLFxuICAgICAgICAgICAgICAgICdib3R0b20gbGVmdCcsICdib3R0b20gY2VudGVyJywgJ2JvdHRvbSByaWdodCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU3BlY2lmaWVzIHRoZSBsb2NhdGlvbiBvZiB0aGUgYHRpdGxlYC4nLFxuICAgICAgICAgICAgICAgICdOb3RlIHRoYXQgdGhlIHRpdGxlXFwncyBwb3NpdGlvbiB1c2VkIHRvIGJlIHNldCcsXG4gICAgICAgICAgICAgICAgJ2J5IHRoZSBub3cgZGVwcmVjYXRlZCBgdGl0bGVwb3NpdGlvbmAgYXR0cmlidXRlLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgIH0sXG5cbiAgICAvLyBwb3NpdGlvbiBhbmQgc2hhcGVcbiAgICBkb21haW46IGRvbWFpbkF0dHJzKHtuYW1lOiAncGllJywgdHJhY2U6IHRydWUsIGVkaXRUeXBlOiAnY2FsYyd9KSxcblxuICAgIGhvbGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGZyYWN0aW9uIG9mIHRoZSByYWRpdXMgdG8gY3V0IG91dCBvZiB0aGUgcGllLicsXG4gICAgICAgICAgICAnVXNlIHRoaXMgdG8gbWFrZSBhIGRvbnV0IGNoYXJ0LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgLy8gb3JkZXJpbmcgYW5kIGRpcmVjdGlvblxuICAgIHNvcnQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBkZmx0OiB0cnVlLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIHNlY3RvcnMgYXJlIHJlb3JkZXJlZCcsXG4gICAgICAgICAgICAnZnJvbSBsYXJnZXN0IHRvIHNtYWxsZXN0LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGRpcmVjdGlvbjoge1xuICAgICAgICAvKipcbiAgICAgICAgICogdGhlcmUgYXJlIHR3byBjb21tb24gY29udmVudGlvbnMsIGJvdGggb2Ygd2hpY2ggcGxhY2UgdGhlIGZpcnN0XG4gICAgICAgICAqIChsYXJnZXN0LCBpZiBzb3J0ZWQpIHNsaWNlIHdpdGggaXRzIGxlZnQgZWRnZSBhdCAxMiBvJ2Nsb2NrIGJ1dFxuICAgICAgICAgKiBzdWNjZWVkaW5nIHNsaWNlcyBmb2xsb3cgZWl0aGVyIGN3IG9yIGNjdyBmcm9tIHRoZXJlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBzZWUgaHR0cDovL3Zpc2FnZS5jby9kYXRhLXZpc3VhbGl6YXRpb24tMTAxLXBpZS1jaGFydHMvXG4gICAgICAgICAqL1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydjbG9ja3dpc2UnLCAnY291bnRlcmNsb2Nrd2lzZSddLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBkZmx0OiAnY291bnRlcmNsb2Nrd2lzZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU3BlY2lmaWVzIHRoZSBkaXJlY3Rpb24gYXQgd2hpY2ggc3VjY2VlZGluZyBzZWN0b3JzIGZvbGxvdycsXG4gICAgICAgICAgICAnb25lIGFub3RoZXIuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgcm90YXRpb246IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIG1pbjogLTM2MCxcbiAgICAgICAgbWF4OiAzNjAsXG4gICAgICAgIGRmbHQ6IDAsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSW5zdGVhZCBvZiB0aGUgZmlyc3Qgc2xpY2Ugc3RhcnRpbmcgYXQgMTIgb1xcJ2Nsb2NrLCcsXG4gICAgICAgICAgICAncm90YXRlIHRvIHNvbWUgb3RoZXIgYW5nbGUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBwdWxsOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBmcmFjdGlvbiBvZiBsYXJnZXIgcmFkaXVzIHRvIHB1bGwgdGhlIHNlY3RvcnMnLFxuICAgICAgICAgICAgJ291dCBmcm9tIHRoZSBjZW50ZXIuIFRoaXMgY2FuIGJlIGEgY29uc3RhbnQnLFxuICAgICAgICAgICAgJ3RvIHB1bGwgYWxsIHNsaWNlcyBhcGFydCBmcm9tIGVhY2ggb3RoZXIgZXF1YWxseScsXG4gICAgICAgICAgICAnb3IgYW4gYXJyYXkgdG8gaGlnaGxpZ2h0IG9uZSBvciBtb3JlIHNsaWNlcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIF9kZXByZWNhdGVkOiB7XG4gICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0RlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgYHRpdGxlLnRleHRgLicsXG4gICAgICAgICAgICAgICAgJ05vdGUgdGhhdCB2YWx1ZSBvZiBgdGl0bGVgIGlzIG5vIGxvbmdlciBhIHNpbXBsZScsXG4gICAgICAgICAgICAgICAgJypzdHJpbmcqIGJ1dCBhIHNldCBvZiBzdWItYXR0cmlidXRlcy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICB0aXRsZWZvbnQ6IGV4dGVuZEZsYXQoe30sIHRleHRGb250QXR0cnMsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgdGl0bGUuZm9udGAuJ1xuICAgICAgICB9KSxcbiAgICAgICAgdGl0bGVwb3NpdGlvbjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbXG4gICAgICAgICAgICAgICAgJ3RvcCBsZWZ0JywgJ3RvcCBjZW50ZXInLCAndG9wIHJpZ2h0JyxcbiAgICAgICAgICAgICAgICAnbWlkZGxlIGNlbnRlcicsXG4gICAgICAgICAgICAgICAgJ2JvdHRvbSBsZWZ0JywgJ2JvdHRvbSBjZW50ZXInLCAnYm90dG9tIHJpZ2h0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgYHRpdGxlLnBvc2l0aW9uYC4nXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcbnZhciB0aW55Y29sb3IgPSByZXF1aXJlKCd0aW55Y29sb3IyJyk7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcblxudmFyIGV4dGVuZGVkQ29sb3JXYXlMaXN0ID0ge307XG5cbmZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIGNkID0gW107XG5cbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBoaWRkZW5MYWJlbHMgPSBmdWxsTGF5b3V0LmhpZGRlbmxhYmVscyB8fCBbXTtcblxuICAgIHZhciBsYWJlbHMgPSB0cmFjZS5sYWJlbHM7XG4gICAgdmFyIGNvbG9ycyA9IHRyYWNlLm1hcmtlci5jb2xvcnMgfHwgW107XG4gICAgdmFyIHZhbHMgPSB0cmFjZS52YWx1ZXM7XG4gICAgdmFyIGxlbiA9IHRyYWNlLl9sZW5ndGg7XG4gICAgdmFyIGhhc1ZhbHVlcyA9IHRyYWNlLl9oYXNWYWx1ZXMgJiYgbGVuO1xuXG4gICAgdmFyIGksIHB0O1xuXG4gICAgaWYodHJhY2UuZGxhYmVsKSB7XG4gICAgICAgIGxhYmVscyA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGFiZWxzW2ldID0gU3RyaW5nKHRyYWNlLmxhYmVsMCArIGkgKiB0cmFjZS5kbGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFsbFRoaXNUcmFjZUxhYmVscyA9IHt9O1xuICAgIHZhciBwdWxsQ29sb3IgPSBtYWtlUHVsbENvbG9yRm4oZnVsbExheW91dFsnXycgKyB0cmFjZS50eXBlICsgJ2NvbG9ybWFwJ10pO1xuICAgIHZhciB2VG90YWwgPSAwO1xuICAgIHZhciBpc0FnZ3JlZ2F0ZWQgPSBmYWxzZTtcblxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB2LCBsYWJlbCwgaGlkZGVuO1xuICAgICAgICBpZihoYXNWYWx1ZXMpIHtcbiAgICAgICAgICAgIHYgPSB2YWxzW2ldO1xuICAgICAgICAgICAgaWYoIWlzTnVtZXJpYyh2KSkgY29udGludWU7XG4gICAgICAgICAgICB2ID0gK3Y7XG4gICAgICAgICAgICBpZih2IDwgMCkgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB2ID0gMTtcblxuICAgICAgICBsYWJlbCA9IGxhYmVsc1tpXTtcbiAgICAgICAgaWYobGFiZWwgPT09IHVuZGVmaW5lZCB8fCBsYWJlbCA9PT0gJycpIGxhYmVsID0gaTtcbiAgICAgICAgbGFiZWwgPSBTdHJpbmcobGFiZWwpO1xuXG4gICAgICAgIHZhciB0aGlzTGFiZWxJbmRleCA9IGFsbFRoaXNUcmFjZUxhYmVsc1tsYWJlbF07XG4gICAgICAgIGlmKHRoaXNMYWJlbEluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFsbFRoaXNUcmFjZUxhYmVsc1tsYWJlbF0gPSBjZC5sZW5ndGg7XG5cbiAgICAgICAgICAgIGhpZGRlbiA9IGhpZGRlbkxhYmVscy5pbmRleE9mKGxhYmVsKSAhPT0gLTE7XG5cbiAgICAgICAgICAgIGlmKCFoaWRkZW4pIHZUb3RhbCArPSB2O1xuXG4gICAgICAgICAgICBjZC5wdXNoKHtcbiAgICAgICAgICAgICAgICB2OiB2LFxuICAgICAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgICAgICBjb2xvcjogcHVsbENvbG9yKGNvbG9yc1tpXSwgbGFiZWwpLFxuICAgICAgICAgICAgICAgIGk6IGksXG4gICAgICAgICAgICAgICAgcHRzOiBbaV0sXG4gICAgICAgICAgICAgICAgaGlkZGVuOiBoaWRkZW5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNBZ2dyZWdhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgcHQgPSBjZFt0aGlzTGFiZWxJbmRleF07XG4gICAgICAgICAgICBwdC52ICs9IHY7XG4gICAgICAgICAgICBwdC5wdHMucHVzaChpKTtcbiAgICAgICAgICAgIGlmKCFwdC5oaWRkZW4pIHZUb3RhbCArPSB2O1xuXG4gICAgICAgICAgICBpZihwdC5jb2xvciA9PT0gZmFsc2UgJiYgY29sb3JzW2ldKSB7XG4gICAgICAgICAgICAgICAgcHQuY29sb3IgPSBwdWxsQ29sb3IoY29sb3JzW2ldLCBsYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2hvdWxkU29ydCA9ICh0cmFjZS50eXBlID09PSAnZnVubmVsYXJlYScpID8gaXNBZ2dyZWdhdGVkIDogdHJhY2Uuc29ydDtcbiAgICBpZihzaG91bGRTb3J0KSBjZC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGIudiAtIGEudjsgfSk7XG5cbiAgICAvLyBpbmNsdWRlIHRoZSBzdW0gb2YgYWxsIHZhbHVlcyBpbiB0aGUgZmlyc3QgcG9pbnRcbiAgICBpZihjZFswXSkgY2RbMF0udlRvdGFsID0gdlRvdGFsO1xuXG4gICAgcmV0dXJuIGNkO1xufVxuXG5mdW5jdGlvbiBtYWtlUHVsbENvbG9yRm4oY29sb3JNYXApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gcHVsbENvbG9yKGNvbG9yLCBpZCkge1xuICAgICAgICBpZighY29sb3IpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb2xvciA9IHRpbnljb2xvcihjb2xvcik7XG4gICAgICAgIGlmKCFjb2xvci5pc1ZhbGlkKCkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb2xvciA9IENvbG9yLmFkZE9wYWNpdHkoY29sb3IsIGNvbG9yLmdldEFscGhhKCkpO1xuICAgICAgICBpZighY29sb3JNYXBbaWRdKSBjb2xvck1hcFtpZF0gPSBjb2xvcjtcblxuICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgfTtcbn1cblxuLypcbiAqIGBjYWxjYCBmaWxsZWQgaW4gKGFuZCBjb2xsYXRlZCkgZXhwbGljaXQgY29sb3JzLlxuICogTm93IHdlIG5lZWQgdG8gcHJvcGFnYXRlIHRoZXNlIGV4cGxpY2l0IGNvbG9ycyB0byBvdGhlciB0cmFjZXMsXG4gKiBhbmQgZmlsbCBpbiBkZWZhdWx0IGNvbG9ycy5cbiAqIFRoaXMgaXMgZG9uZSBhZnRlciBzb3J0aW5nLCBzbyB3ZSBwaWNrIGRlZmF1bHRzXG4gKiBpbiB0aGUgb3JkZXIgc2xpY2VzIHdpbGwgYmUgZGlzcGxheWVkXG4gKi9cbmZ1bmN0aW9uIGNyb3NzVHJhY2VDYWxjKGdkLCBwbG90aW5mbykgeyAvLyBUT0RPOiBzaG91bGQgd2UgbmFtZSB0aGUgc2Vjb25kIGFyZ3VtZW50IG9wdHM/XG4gICAgdmFyIGRlc2lyZWRUeXBlID0gKHBsb3RpbmZvIHx8IHt9KS50eXBlO1xuICAgIGlmKCFkZXNpcmVkVHlwZSkgZGVzaXJlZFR5cGUgPSAncGllJztcblxuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGNhbGNkYXRhID0gZ2QuY2FsY2RhdGE7XG4gICAgdmFyIGNvbG9yV2F5ID0gZnVsbExheW91dFtkZXNpcmVkVHlwZSArICdjb2xvcndheSddO1xuICAgIHZhciBjb2xvck1hcCA9IGZ1bGxMYXlvdXRbJ18nICsgZGVzaXJlZFR5cGUgKyAnY29sb3JtYXAnXTtcblxuICAgIGlmKGZ1bGxMYXlvdXRbJ2V4dGVuZCcgKyBkZXNpcmVkVHlwZSArICdjb2xvcnMnXSkge1xuICAgICAgICBjb2xvcldheSA9IGdlbmVyYXRlRXh0ZW5kZWRDb2xvcnMoY29sb3JXYXksIGV4dGVuZGVkQ29sb3JXYXlMaXN0KTtcbiAgICB9XG4gICAgdmFyIGRmbHRDb2xvckNvdW50ID0gMDtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYWxjZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2QgPSBjYWxjZGF0YVtpXTtcbiAgICAgICAgdmFyIHRyYWNlVHlwZSA9IGNkWzBdLnRyYWNlLnR5cGU7XG4gICAgICAgIGlmKHRyYWNlVHlwZSAhPT0gZGVzaXJlZFR5cGUpIGNvbnRpbnVlO1xuXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIHB0ID0gY2Rbal07XG4gICAgICAgICAgICBpZihwdC5jb2xvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBoYXZlIHdlIHNlZW4gdGhpcyBsYWJlbCBhbmQgYXNzaWduZWQgYSBjb2xvciB0byBpdCBpbiBhIHByZXZpb3VzIHRyYWNlP1xuICAgICAgICAgICAgICAgIGlmKGNvbG9yTWFwW3B0LmxhYmVsXSkge1xuICAgICAgICAgICAgICAgICAgICBwdC5jb2xvciA9IGNvbG9yTWFwW3B0LmxhYmVsXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb2xvck1hcFtwdC5sYWJlbF0gPSBwdC5jb2xvciA9IGNvbG9yV2F5W2RmbHRDb2xvckNvdW50ICUgY29sb3JXYXkubGVuZ3RoXTtcbiAgICAgICAgICAgICAgICAgICAgZGZsdENvbG9yQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogcGljayBhIGRlZmF1bHQgY29sb3IgZnJvbSB0aGUgbWFpbiBkZWZhdWx0IHNldCwgYXVnbWVudGVkIGJ5XG4gKiBpdHNlbGYgbGlnaHRlciB0aGVuIGRhcmtlciBiZWZvcmUgcmVwZWF0aW5nXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlRXh0ZW5kZWRDb2xvcnMoY29sb3JMaXN0LCBleHRlbmRlZENvbG9yV2F5cykge1xuICAgIHZhciBpO1xuICAgIHZhciBjb2xvclN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGNvbG9yTGlzdCk7XG4gICAgdmFyIGNvbG9ycyA9IGV4dGVuZGVkQ29sb3JXYXlzW2NvbG9yU3RyaW5nXTtcbiAgICBpZighY29sb3JzKSB7XG4gICAgICAgIGNvbG9ycyA9IGNvbG9yTGlzdC5zbGljZSgpO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNvbG9yTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29sb3JzLnB1c2godGlueWNvbG9yKGNvbG9yTGlzdFtpXSkubGlnaHRlbigyMCkudG9IZXhTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjb2xvckxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKHRpbnljb2xvcihjb2xvckxpc3RbaV0pLmRhcmtlbigyMCkudG9IZXhTdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZXh0ZW5kZWRDb2xvcldheXNbY29sb3JTdHJpbmddID0gY29sb3JzO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xvcnM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNhbGM6IGNhbGMsXG4gICAgY3Jvc3NUcmFjZUNhbGM6IGNyb3NzVHJhY2VDYWxjLFxuXG4gICAgbWFrZVB1bGxDb2xvckZuOiBtYWtlUHVsbENvbG9yRm4sXG4gICAgZ2VuZXJhdGVFeHRlbmRlZENvbG9yczogZ2VuZXJhdGVFeHRlbmRlZENvbG9yc1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFwcGVuZEFycmF5TXVsdGlQb2ludFZhbHVlcyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngvaGVscGVycycpLmFwcGVuZEFycmF5TXVsdGlQb2ludFZhbHVlcztcblxuLy8gTm90ZTogbGlrZSBvdGhlciBldmVudERhdGEgcm91dGluZXMsIHRoaXMgY3JlYXRlcyB0aGUgZGF0YSBmb3IgaG92ZXIvdW5ob3Zlci9jbGljayBldmVudHNcbi8vIGJ1dCBpdCBoYXMgYSBkaWZmZXJlbnQgQVBJIGFuZCBnb2VzIHRocm91Z2ggYSB0b3RhbGx5IGRpZmZlcmVudCBwYXRod2F5LlxuLy8gU28gdG8gZW5zdXJlIGl0IGRvZXNuJ3QgZ2V0IG1pc3VzZWQsIGl0J3Mgbm90IGF0dGFjaGVkIHRvIHRoZSBQaWUgbW9kdWxlLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBldmVudERhdGEocHQsIHRyYWNlKSB7XG4gICAgdmFyIG91dCA9IHtcbiAgICAgICAgY3VydmVOdW1iZXI6IHRyYWNlLmluZGV4LFxuICAgICAgICBwb2ludE51bWJlcnM6IHB0LnB0cyxcbiAgICAgICAgZGF0YTogdHJhY2UuX2lucHV0LFxuICAgICAgICBmdWxsRGF0YTogdHJhY2UsXG4gICAgICAgIGxhYmVsOiBwdC5sYWJlbCxcbiAgICAgICAgY29sb3I6IHB0LmNvbG9yLFxuICAgICAgICB2YWx1ZTogcHQudixcbiAgICAgICAgcGVyY2VudDogcHQucGVyY2VudCxcbiAgICAgICAgdGV4dDogcHQudGV4dCxcblxuICAgICAgICAvLyBwdC52IChhbmQgcHQuaSBiZWxvdykgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgdjogcHQudlxuICAgIH07XG5cbiAgICAvLyBPbmx5IGluY2x1ZGUgcG9pbnROdW1iZXIgaWYgaXQncyB1bmFtYmlndW91c1xuICAgIGlmKHB0LnB0cy5sZW5ndGggPT09IDEpIG91dC5wb2ludE51bWJlciA9IG91dC5pID0gcHQucHRzWzBdO1xuXG4gICAgLy8gQWRkIGV4dHJhIGRhdGEgYXJyYXlzIHRvIHRoZSBvdXRwdXRcbiAgICAvLyBub3RpY2UgdGhhdCB0aGlzIGlzIHRoZSBtdWx0aS1wb2ludCB2ZXJzaW9uICgncycgb24gdGhlIGVuZCEpXG4gICAgLy8gc28gYWRkZWQgZGF0YSB3aWxsIGJlIGFycmF5cyBtYXRjaGluZyB0aGUgcG9pbnROdW1iZXJzIGFycmF5LlxuICAgIGFwcGVuZEFycmF5TXVsdGlQb2ludFZhbHVlcyhvdXQsIHRyYWNlLCBwdC5wdHMpO1xuXG4gICAgLy8gZG9uJ3QgaW5jbHVkZSBvYnNvbGV0ZSBmaWVsZHMgaW4gbmV3IGZ1bm5lbGFyZWEgdHJhY2VzXG4gICAgaWYodHJhY2UudHlwZSA9PT0gJ2Z1bm5lbGFyZWEnKSB7XG4gICAgICAgIGRlbGV0ZSBvdXQudjtcbiAgICAgICAgZGVsZXRlIG91dC5pO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgUGxvdHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9wbG90cycpO1xudmFyIEZ4ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meCcpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBzdmdUZXh0VXRpbHMgPSByZXF1aXJlKCcuLi8uLi9saWIvc3ZnX3RleHRfdXRpbHMnKTtcbnZhciB1bmlmb3JtVGV4dCA9IHJlcXVpcmUoJy4uL2Jhci91bmlmb3JtX3RleHQnKTtcbnZhciByZWNvcmRNaW5UZXh0U2l6ZSA9IHVuaWZvcm1UZXh0LnJlY29yZE1pblRleHRTaXplO1xudmFyIGNsZWFyTWluVGV4dFNpemUgPSB1bmlmb3JtVGV4dC5jbGVhck1pblRleHRTaXplO1xudmFyIFRFWFRQQUQgPSByZXF1aXJlKCcuLi9iYXIvY29uc3RhbnRzJykuVEVYVFBBRDtcblxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcbnZhciBldmVudERhdGEgPSByZXF1aXJlKCcuL2V2ZW50X2RhdGEnKTtcbnZhciBpc1ZhbGlkVGV4dFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vbGliJykuaXNWYWxpZFRleHRWYWx1ZTtcblxuZnVuY3Rpb24gcGxvdChnZCwgY2RNb2R1bGUpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBncyA9IGZ1bGxMYXlvdXQuX3NpemU7XG5cbiAgICBjbGVhck1pblRleHRTaXplKCdwaWUnLCBmdWxsTGF5b3V0KTtcblxuICAgIHByZXJlbmRlclRpdGxlcyhjZE1vZHVsZSwgZ2QpO1xuICAgIGxheW91dEFyZWFzKGNkTW9kdWxlLCBncyk7XG5cbiAgICB2YXIgcGxvdEdyb3VwcyA9IExpYi5tYWtlVHJhY2VHcm91cHMoZnVsbExheW91dC5fcGllbGF5ZXIsIGNkTW9kdWxlLCAndHJhY2UnKS5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgIHZhciBwbG90R3JvdXAgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuXG4gICAgICAgIHNldENvb3JkcyhjZCk7XG5cbiAgICAgICAgLy8gVE9ETzogbWl0ZXIgbWlnaHQgbG9vayBiZXR0ZXIgYnV0IGNhbiBzb21ldGltZXMgY2F1c2UgcHJvYmxlbXNcbiAgICAgICAgLy8gbWF5YmUgbWl0ZXIgd2l0aCBhIHNtYWxsLWlzaCBzdHJva2UtbWl0ZXJsaW1pdD9cbiAgICAgICAgcGxvdEdyb3VwLmF0dHIoJ3N0cm9rZS1saW5lam9pbicsICdyb3VuZCcpO1xuXG4gICAgICAgIHBsb3RHcm91cC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNsaWNlcyA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ2cuc2xpY2UnKS5kYXRhKGNkKTtcblxuICAgICAgICAgICAgc2xpY2VzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgnc2xpY2UnLCB0cnVlKTtcbiAgICAgICAgICAgIHNsaWNlcy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIHZhciBxdWFkcmFudHMgPSBbXG4gICAgICAgICAgICAgICAgW1tdLCBbXV0sIC8vIHk8MDogeDwwLCB4Pj0wXG4gICAgICAgICAgICAgICAgW1tdLCBbXV0gLy8geT49MDogeDwwLCB4Pj0wXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdmFyIGhhc091dHNpZGVUZXh0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHNsaWNlcy5lYWNoKGZ1bmN0aW9uKHB0LCBpKSB7XG4gICAgICAgICAgICAgICAgaWYocHQuaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ3BhdGgsZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdG8gaGF2ZSBjb25zaXN0ZW50IGV2ZW50IGRhdGEgY29tcGFyZWQgdG8gb3RoZXIgdHJhY2VzXG4gICAgICAgICAgICAgICAgcHQucG9pbnROdW1iZXIgPSBwdC5pO1xuICAgICAgICAgICAgICAgIHB0LmN1cnZlTnVtYmVyID0gdHJhY2UuaW5kZXg7XG5cbiAgICAgICAgICAgICAgICBxdWFkcmFudHNbcHQucHhtaWRbMV0gPCAwID8gMCA6IDFdW3B0LnB4bWlkWzBdIDwgMCA/IDAgOiAxXS5wdXNoKHB0KTtcblxuICAgICAgICAgICAgICAgIHZhciBjeCA9IGNkMC5jeDtcbiAgICAgICAgICAgICAgICB2YXIgY3kgPSBjZDAuY3k7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWNlVG9wID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBzbGljZVBhdGggPSBzbGljZVRvcC5zZWxlY3RBbGwoJ3BhdGguc3VyZmFjZScpLmRhdGEoW3B0XSk7XG5cbiAgICAgICAgICAgICAgICBzbGljZVBhdGguZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnc3VyZmFjZScsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh7J3BvaW50ZXItZXZlbnRzJzogJ2FsbCd9KTtcblxuICAgICAgICAgICAgICAgIHNsaWNlVG9wLmNhbGwoYXR0YWNoRnhIYW5kbGVycywgZ2QsIGNkKTtcblxuICAgICAgICAgICAgICAgIGlmKHRyYWNlLnB1bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHB1bGwgPSAraGVscGVycy5jYXN0T3B0aW9uKHRyYWNlLnB1bGwsIHB0LnB0cykgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgaWYocHVsbCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN4ICs9IHB1bGwgKiBwdC5weG1pZFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN5ICs9IHB1bGwgKiBwdC5weG1pZFsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHB0LmN4RmluYWwgPSBjeDtcbiAgICAgICAgICAgICAgICBwdC5jeUZpbmFsID0gY3k7XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhcmMoc3RhcnQsIGZpbmlzaCwgY3csIHNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkeCA9IHNjYWxlICogKGZpbmlzaFswXSAtIHN0YXJ0WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR5ID0gc2NhbGUgKiAoZmluaXNoWzFdIC0gc3RhcnRbMV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHNjYWxlICogY2QwLnIpICsgJywnICsgKHNjYWxlICogY2QwLnIpICsgJyAwICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgcHQubGFyZ2VBcmMgKyAoY3cgPyAnIDEgJyA6ICcgMCAnKSArIGR4ICsgJywnICsgZHk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGhvbGUgPSB0cmFjZS5ob2xlO1xuICAgICAgICAgICAgICAgIGlmKHB0LnYgPT09IGNkMC52VG90YWwpIHsgLy8gMTAwJSBmYWlscyBiY3MgYXJjIHN0YXJ0IGFuZCBlbmQgYXJlIGlkZW50aWNhbFxuICAgICAgICAgICAgICAgICAgICB2YXIgb3V0ZXJDaXJjbGUgPSAnTScgKyAoY3ggKyBwdC5weDBbMF0pICsgJywnICsgKGN5ICsgcHQucHgwWzFdKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmMocHQucHgwLCBwdC5weG1pZCwgdHJ1ZSwgMSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJjKHB0LnB4bWlkLCBwdC5weDAsIHRydWUsIDEpICsgJ1onO1xuICAgICAgICAgICAgICAgICAgICBpZihob2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZVBhdGguYXR0cignZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ00nICsgKGN4ICsgaG9sZSAqIHB0LnB4MFswXSkgKyAnLCcgKyAoY3kgKyBob2xlICogcHQucHgwWzFdKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJjKHB0LnB4MCwgcHQucHhtaWQsIGZhbHNlLCBob2xlKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJjKHB0LnB4bWlkLCBwdC5weDAsIGZhbHNlLCBob2xlKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1onICsgb3V0ZXJDaXJjbGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugc2xpY2VQYXRoLmF0dHIoJ2QnLCBvdXRlckNpcmNsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG91dGVyQXJjID0gYXJjKHB0LnB4MCwgcHQucHgxLCB0cnVlLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihob2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmltID0gMSAtIGhvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZVBhdGguYXR0cignZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ00nICsgKGN4ICsgaG9sZSAqIHB0LnB4MVswXSkgKyAnLCcgKyAoY3kgKyBob2xlICogcHQucHgxWzFdKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJjKHB0LnB4MSwgcHQucHgwLCBmYWxzZSwgaG9sZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsJyArIChyaW0gKiBwdC5weDBbMF0pICsgJywnICsgKHJpbSAqIHB0LnB4MFsxXSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyQXJjICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnWicpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2VQYXRoLmF0dHIoJ2QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdNJyArIGN4ICsgJywnICsgY3kgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsJyArIHB0LnB4MFswXSArICcsJyArIHB0LnB4MFsxXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJBcmMgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdaJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdGV4dFxuICAgICAgICAgICAgICAgIGZvcm1hdFNsaWNlTGFiZWwoZ2QsIHB0LCBjZDApO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0UG9zaXRpb24gPSBoZWxwZXJzLmNhc3RPcHRpb24odHJhY2UudGV4dHBvc2l0aW9uLCBwdC5wdHMpO1xuICAgICAgICAgICAgICAgIHZhciBzbGljZVRleHRHcm91cCA9IHNsaWNlVG9wLnNlbGVjdEFsbCgnZy5zbGljZXRleHQnKVxuICAgICAgICAgICAgICAgICAgICAuZGF0YShwdC50ZXh0ICYmICh0ZXh0UG9zaXRpb24gIT09ICdub25lJykgPyBbMF0gOiBbXSk7XG5cbiAgICAgICAgICAgICAgICBzbGljZVRleHRHcm91cC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdzbGljZXRleHQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzbGljZVRleHRHcm91cC5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICBzbGljZVRleHRHcm91cC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpY2VUZXh0ID0gTGliLmVuc3VyZVNpbmdsZShkMy5zZWxlY3QodGhpcyksICd0ZXh0JywgJycsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb2hpYml0IHRleCBpbnRlcnByZXRhdGlvbiB1bnRpbCB3ZSBjYW4gaGFuZGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXggYW5kIHJlZ3VsYXIgdGV4dCB0b2dldGhlclxuICAgICAgICAgICAgICAgICAgICAgICAgcy5hdHRyKCdkYXRhLW5vdGV4JywgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb250ID0gTGliLmVuc3VyZVVuaWZvcm1Gb250U2l6ZShnZCwgdGV4dFBvc2l0aW9uID09PSAnb3V0c2lkZScgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZGV0ZXJtaW5lT3V0c2lkZVRleHRGb250KHRyYWNlLCBwdCwgZnVsbExheW91dC5mb250KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRlcm1pbmVJbnNpZGVUZXh0Rm9udCh0cmFjZSwgcHQsIGZ1bGxMYXlvdXQuZm9udClcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICBzbGljZVRleHQudGV4dChwdC50ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbGFzcyc6ICdzbGljZXRleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQtYW5jaG9yJzogJ21pZGRsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLmZvbnQsIGZvbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMuY29udmVydFRvVHNwYW5zLCBnZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcG9zaXRpb24gdGhlIHRleHQgcmVsYXRpdmUgdG8gdGhlIHNsaWNlXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0QkIgPSBEcmF3aW5nLmJCb3goc2xpY2VUZXh0Lm5vZGUoKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGV4dFBvc2l0aW9uID09PSAnb3V0c2lkZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybU91dHNpZGVUZXh0KHRleHRCQiwgcHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gdHJhbnNmb3JtSW5zaWRlVGV4dCh0ZXh0QkIsIHB0LCBjZDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGV4dFBvc2l0aW9uID09PSAnYXV0bycgJiYgdHJhbnNmb3JtLnNjYWxlIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdGb250ID0gTGliLmVuc3VyZVVuaWZvcm1Gb250U2l6ZShnZCwgdHJhY2Uub3V0c2lkZXRleHRmb250KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlVGV4dC5jYWxsKERyYXdpbmcuZm9udCwgbmV3Rm9udCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEJCID0gRHJhd2luZy5iQm94KHNsaWNlVGV4dC5ub2RlKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gdHJhbnNmb3JtT3V0c2lkZVRleHQodGV4dEJCLCBwdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dFBvc0FuZ2xlID0gdHJhbnNmb3JtLnRleHRQb3NBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRYWSA9IHRleHRQb3NBbmdsZSA9PT0gdW5kZWZpbmVkID8gcHQucHhtaWQgOiBnZXRDb29yZHMoY2QwLnIsIHRleHRQb3NBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS50YXJnZXRYID0gY3ggKyB0ZXh0WFlbMF0gKiB0cmFuc2Zvcm0uckNlbnRlciArICh0cmFuc2Zvcm0ueCB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnRhcmdldFkgPSBjeSArIHRleHRYWVsxXSAqIHRyYW5zZm9ybS5yQ2VudGVyICsgKHRyYW5zZm9ybS55IHx8IDApO1xuICAgICAgICAgICAgICAgICAgICBjb21wdXRlVHJhbnNmb3JtKHRyYW5zZm9ybSwgdGV4dEJCKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIHNvbWUgc3R1ZmYgdG8gdXNlIGxhdGVyIGVuc3VyZSBubyBsYWJlbHMgb3ZlcmxhcFxuICAgICAgICAgICAgICAgICAgICBpZih0cmFuc2Zvcm0ub3V0c2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldFkgPSB0cmFuc2Zvcm0udGFyZ2V0WTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB0LnlMYWJlbE1pbiA9IHRhcmdldFkgLSB0ZXh0QkIuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB0LnlMYWJlbE1pZCA9IHRhcmdldFk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdC55TGFiZWxNYXggPSB0YXJnZXRZICsgdGV4dEJCLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdC5sYWJlbEV4dHJhWCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdC5sYWJlbEV4dHJhWSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNPdXRzaWRlVGV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uZm9udFNpemUgPSBmb250LnNpemU7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZE1pblRleHRTaXplKHRyYWNlLnR5cGUsIHRyYW5zZm9ybSwgZnVsbExheW91dCk7XG4gICAgICAgICAgICAgICAgICAgIGNkW2ldLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcblxuICAgICAgICAgICAgICAgICAgICBzbGljZVRleHQuYXR0cigndHJhbnNmb3JtJywgTGliLmdldFRleHRUcmFuc2Zvcm0odHJhbnNmb3JtKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSB0aXRsZVxuICAgICAgICAgICAgdmFyIHRpdGxlVGV4dEdyb3VwID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdEFsbCgnZy50aXRsZXRleHQnKVxuICAgICAgICAgICAgICAgIC5kYXRhKHRyYWNlLnRpdGxlLnRleHQgPyBbMF0gOiBbXSk7XG5cbiAgICAgICAgICAgIHRpdGxlVGV4dEdyb3VwLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAuY2xhc3NlZCgndGl0bGV0ZXh0JywgdHJ1ZSk7XG4gICAgICAgICAgICB0aXRsZVRleHRHcm91cC5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIHRpdGxlVGV4dEdyb3VwLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlVGV4dCA9IExpYi5lbnN1cmVTaW5nbGUoZDMuc2VsZWN0KHRoaXMpLCAndGV4dCcsICcnLCBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHByb2hpYml0IHRleCBpbnRlcnByZXRhdGlvbiBhcyBhYm92ZVxuICAgICAgICAgICAgICAgICAgICBzLmF0dHIoJ2RhdGEtbm90ZXgnLCAxKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciB0eHQgPSB0cmFjZS50aXRsZS50ZXh0O1xuICAgICAgICAgICAgICAgIGlmKHRyYWNlLl9tZXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHR4dCA9IExpYi50ZW1wbGF0ZVN0cmluZyh0eHQsIHRyYWNlLl9tZXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aXRsZVRleHQudGV4dCh0eHQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjbGFzcyc6ICd0aXRsZXRleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgdHJhY2UudGl0bGUuZm9udClcbiAgICAgICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMuY29udmVydFRvVHNwYW5zLCBnZCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNmb3JtO1xuXG4gICAgICAgICAgICAgICAgaWYodHJhY2UudGl0bGUucG9zaXRpb24gPT09ICdtaWRkbGUgY2VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBwb3NpdGlvblRpdGxlSW5zaWRlKGNkMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gcG9zaXRpb25UaXRsZU91dHNpZGUoY2QwLCBncyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGl0bGVUZXh0LmF0dHIoJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoJyArIHRyYW5zZm9ybS54ICsgJywnICsgdHJhbnNmb3JtLnkgKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAodHJhbnNmb3JtLnNjYWxlIDwgMSA/ICgnc2NhbGUoJyArIHRyYW5zZm9ybS5zY2FsZSArICcpJykgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyB0cmFuc2Zvcm0udHggKyAnLCcgKyB0cmFuc2Zvcm0udHkgKyAnKScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIG5vdyBtYWtlIHN1cmUgbm8gbGFiZWxzIG92ZXJsYXAgKGF0IGxlYXN0IHdpdGhpbiBvbmUgcGllKVxuICAgICAgICAgICAgaWYoaGFzT3V0c2lkZVRleHQpIHNjb290TGFiZWxzKHF1YWRyYW50cywgdHJhY2UpO1xuXG4gICAgICAgICAgICBwbG90VGV4dExpbmVzKHNsaWNlcywgdHJhY2UpO1xuXG4gICAgICAgICAgICBpZihoYXNPdXRzaWRlVGV4dCAmJiB0cmFjZS5hdXRvbWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBpZiB3ZSBldmVyIHdhbnQgdG8gaW1wcm92ZSBwZXJmLFxuICAgICAgICAgICAgICAgIC8vIHdlIGNvdWxkIHJldXNlIHRoZSB0ZXh0QkIgY29tcHV0ZWQgYWJvdmUgdG9nZXRoZXJcbiAgICAgICAgICAgICAgICAvLyB3aXRoIHRoZSBzbGljZVRleHQgdHJhbnNmb3JtIGluZm9cbiAgICAgICAgICAgICAgICB2YXIgdHJhY2VCYm94ID0gRHJhd2luZy5iQm94KHBsb3RHcm91cC5ub2RlKCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRvbWFpbiA9IHRyYWNlLmRvbWFpbjtcbiAgICAgICAgICAgICAgICB2YXIgdnB3ID0gZ3MudyAqIChkb21haW4ueFsxXSAtIGRvbWFpbi54WzBdKTtcbiAgICAgICAgICAgICAgICB2YXIgdnBoID0gZ3MuaCAqIChkb21haW4ueVsxXSAtIGRvbWFpbi55WzBdKTtcbiAgICAgICAgICAgICAgICB2YXIgeGdhcCA9ICgwLjUgKiB2cHcgLSBjZDAucikgLyBncy53O1xuICAgICAgICAgICAgICAgIHZhciB5Z2FwID0gKDAuNSAqIHZwaCAtIGNkMC5yKSAvIGdzLmg7XG5cbiAgICAgICAgICAgICAgICBQbG90cy5hdXRvTWFyZ2luKGdkLCAncGllLicgKyB0cmFjZS51aWQgKyAnLmF1dG9tYXJnaW4nLCB7XG4gICAgICAgICAgICAgICAgICAgIHhsOiBkb21haW4ueFswXSAtIHhnYXAsXG4gICAgICAgICAgICAgICAgICAgIHhyOiBkb21haW4ueFsxXSArIHhnYXAsXG4gICAgICAgICAgICAgICAgICAgIHliOiBkb21haW4ueVswXSAtIHlnYXAsXG4gICAgICAgICAgICAgICAgICAgIHl0OiBkb21haW4ueVsxXSArIHlnYXAsXG4gICAgICAgICAgICAgICAgICAgIGw6IE1hdGgubWF4KGNkMC5jeCAtIGNkMC5yIC0gdHJhY2VCYm94LmxlZnQsIDApLFxuICAgICAgICAgICAgICAgICAgICByOiBNYXRoLm1heCh0cmFjZUJib3gucmlnaHQgLSAoY2QwLmN4ICsgY2QwLnIpLCAwKSxcbiAgICAgICAgICAgICAgICAgICAgYjogTWF0aC5tYXgodHJhY2VCYm94LmJvdHRvbSAtIChjZDAuY3kgKyBjZDAuciksIDApLFxuICAgICAgICAgICAgICAgICAgICB0OiBNYXRoLm1heChjZDAuY3kgLSBjZDAuciAtIHRyYWNlQmJveC50b3AsIDApLFxuICAgICAgICAgICAgICAgICAgICBwYWQ6IDVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBUaGlzIGlzIGZvciBhIGJ1ZyBpbiBDaHJvbWUgKGFzIG9mIDIwMTUtMDctMjIsIGFuZCBkb2VzIG5vdCBhZmZlY3QgRkYpXG4gICAgLy8gaWYgaW5zaWRldGV4dGZvbnQgYW5kIG91dHNpZGV0ZXh0Zm9udCBhcmUgZGlmZmVyZW50IHNpemVzLCBzb21ldGltZXMgdGhlIHNpemVcbiAgICAvLyBvZiBhbiBcImVtXCIgZ2V0cyB0YWtlbiBmcm9tIHRoZSB3cm9uZyBlbGVtZW50IGF0IGZpcnN0IHNvIGxpbmVzIGFyZVxuICAgIC8vIHNwYWNlZCB3cm9uZy4gWW91IGp1c3QgaGF2ZSB0byB0ZWxsIGl0IHRvIHRyeSBhZ2FpbiBsYXRlciBhbmQgaXQgZ2V0cyBmaXhlZC5cbiAgICAvLyBJIGhhdmUgbm8gaWRlYSB3aHkgd2UgaGF2ZW4ndCBzZWVuIHRoaXMgaW4gb3RoZXIgY29udGV4dHMuIEFsc28sIHNvbWV0aW1lc1xuICAgIC8vIGl0IGdldHMgdGhlIGluaXRpYWwgZHJhdyBjb3JyZWN0IGJ1dCBvbiByZWRyYXcgaXQgZ2V0cyBjb25mdXNlZC5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwbG90R3JvdXBzLnNlbGVjdEFsbCgndHNwYW4nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHMgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICBpZihzLmF0dHIoJ2R5JykpIHMuYXR0cignZHknLCBzLmF0dHIoJ2R5JykpO1xuICAgICAgICB9KTtcbiAgICB9LCAwKTtcbn1cblxuLy8gVE9ETyBhZGQgc3VwcG9ydCBmb3IgdHJhbnNpdGlvblxuZnVuY3Rpb24gcGxvdFRleHRMaW5lcyhzbGljZXMsIHRyYWNlKSB7XG4gICAgc2xpY2VzLmVhY2goZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgdmFyIHNsaWNlVG9wID0gZDMuc2VsZWN0KHRoaXMpO1xuXG4gICAgICAgIGlmKCFwdC5sYWJlbEV4dHJhWCAmJiAhcHQubGFiZWxFeHRyYVkpIHtcbiAgICAgICAgICAgIHNsaWNlVG9wLnNlbGVjdCgncGF0aC50ZXh0bGluZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlyc3QgbW92ZSB0aGUgdGV4dCB0byBpdHMgbmV3IGxvY2F0aW9uXG4gICAgICAgIHZhciBzbGljZVRleHQgPSBzbGljZVRvcC5zZWxlY3QoJ2cuc2xpY2V0ZXh0IHRleHQnKTtcblxuICAgICAgICBwdC50cmFuc2Zvcm0udGFyZ2V0WCArPSBwdC5sYWJlbEV4dHJhWDtcbiAgICAgICAgcHQudHJhbnNmb3JtLnRhcmdldFkgKz0gcHQubGFiZWxFeHRyYVk7XG5cbiAgICAgICAgc2xpY2VUZXh0LmF0dHIoJ3RyYW5zZm9ybScsIExpYi5nZXRUZXh0VHJhbnNmb3JtKHB0LnRyYW5zZm9ybSkpO1xuXG4gICAgICAgIC8vIHRoZW4gYWRkIGEgbGluZSB0byB0aGUgbmV3IGxvY2F0aW9uXG4gICAgICAgIHZhciBsaW5lU3RhcnRYID0gcHQuY3hGaW5hbCArIHB0LnB4bWlkWzBdO1xuICAgICAgICB2YXIgbGluZVN0YXJ0WSA9IHB0LmN5RmluYWwgKyBwdC5weG1pZFsxXTtcbiAgICAgICAgdmFyIHRleHRMaW5lUGF0aCA9ICdNJyArIGxpbmVTdGFydFggKyAnLCcgKyBsaW5lU3RhcnRZO1xuICAgICAgICB2YXIgZmluYWxYID0gKHB0LnlMYWJlbE1heCAtIHB0LnlMYWJlbE1pbikgKiAocHQucHhtaWRbMF0gPCAwID8gLTEgOiAxKSAvIDQ7XG5cbiAgICAgICAgaWYocHQubGFiZWxFeHRyYVgpIHtcbiAgICAgICAgICAgIHZhciB5RnJvbVggPSBwdC5sYWJlbEV4dHJhWCAqIHB0LnB4bWlkWzFdIC8gcHQucHhtaWRbMF07XG4gICAgICAgICAgICB2YXIgeU5ldCA9IHB0LnlMYWJlbE1pZCArIHB0LmxhYmVsRXh0cmFZIC0gKHB0LmN5RmluYWwgKyBwdC5weG1pZFsxXSk7XG5cbiAgICAgICAgICAgIGlmKE1hdGguYWJzKHlGcm9tWCkgPiBNYXRoLmFicyh5TmV0KSkge1xuICAgICAgICAgICAgICAgIHRleHRMaW5lUGF0aCArPVxuICAgICAgICAgICAgICAgICAgICAnbCcgKyAoeU5ldCAqIHB0LnB4bWlkWzBdIC8gcHQucHhtaWRbMV0pICsgJywnICsgeU5ldCArXG4gICAgICAgICAgICAgICAgICAgICdIJyArIChsaW5lU3RhcnRYICsgcHQubGFiZWxFeHRyYVggKyBmaW5hbFgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXh0TGluZVBhdGggKz0gJ2wnICsgcHQubGFiZWxFeHRyYVggKyAnLCcgKyB5RnJvbVggK1xuICAgICAgICAgICAgICAgICAgICAndicgKyAoeU5ldCAtIHlGcm9tWCkgK1xuICAgICAgICAgICAgICAgICAgICAnaCcgKyBmaW5hbFg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXh0TGluZVBhdGggKz1cbiAgICAgICAgICAgICAgICAnVicgKyAocHQueUxhYmVsTWlkICsgcHQubGFiZWxFeHRyYVkpICtcbiAgICAgICAgICAgICAgICAnaCcgKyBmaW5hbFg7XG4gICAgICAgIH1cblxuICAgICAgICBMaWIuZW5zdXJlU2luZ2xlKHNsaWNlVG9wLCAncGF0aCcsICd0ZXh0bGluZScpXG4gICAgICAgICAgICAuY2FsbChDb2xvci5zdHJva2UsIHRyYWNlLm91dHNpZGV0ZXh0Zm9udC5jb2xvcilcbiAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogTWF0aC5taW4oMiwgdHJhY2Uub3V0c2lkZXRleHRmb250LnNpemUgLyA4KSxcbiAgICAgICAgICAgICAgICBkOiB0ZXh0TGluZVBhdGgsXG4gICAgICAgICAgICAgICAgZmlsbDogJ25vbmUnXG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYXR0YWNoRnhIYW5kbGVycyhzbGljZVRvcCwgZ2QsIGNkKSB7XG4gICAgdmFyIGNkMCA9IGNkWzBdO1xuICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcbiAgICB2YXIgY3ggPSBjZDAuY3g7XG4gICAgdmFyIGN5ID0gY2QwLmN5O1xuXG4gICAgLy8gaG92ZXIgc3RhdGUgdmFyc1xuICAgIC8vIGhhdmUgd2UgZHJhd24gYSBob3ZlciBsYWJlbCwgc28gaXQgc2hvdWxkIGJlIGNsZWFyZWQgbGF0ZXJcbiAgICBpZighKCdfaGFzSG92ZXJMYWJlbCcgaW4gdHJhY2UpKSB0cmFjZS5faGFzSG92ZXJMYWJlbCA9IGZhbHNlO1xuICAgIC8vIGhhdmUgd2UgZW1pdHRlZCBhIGhvdmVyIGV2ZW50LCBzbyBsYXRlciBhbiB1bmhvdmVyIGV2ZW50IHNob3VsZCBiZSBlbWl0dGVkXG4gICAgLy8gbm90ZSB0aGF0IGNsaWNrIGV2ZW50cyBkbyBub3QgZGVwZW5kIG9uIHRoaXMgLSB5b3UgY2FuIHN0aWxsIGdldCB0aGVtXG4gICAgLy8gd2l0aCBob3Zlcm1vZGU6IGZhbHNlIG9yIGlmIHlvdSB3ZXJlIGVhcmxpZXIgZHJhZ2dpbmcsIHRoZW4gY2xpY2tlZFxuICAgIC8vIGluIHRoZSBzYW1lIHNsaWNlIHRoYXQgeW91IG1vdXNlZCB1cCBpblxuICAgIGlmKCEoJ19oYXNIb3ZlckV2ZW50JyBpbiB0cmFjZSkpIHRyYWNlLl9oYXNIb3ZlckV2ZW50ID0gZmFsc2U7XG5cbiAgICBzbGljZVRvcC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgLy8gaW4gY2FzZSBmdWxsTGF5b3V0IG9yIGZ1bGxEYXRhIGhhcyBjaGFuZ2VkIHdpdGhvdXQgYSByZXBsb3RcbiAgICAgICAgdmFyIGZ1bGxMYXlvdXQyID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgICAgIHZhciB0cmFjZTIgPSBnZC5fZnVsbERhdGFbdHJhY2UuaW5kZXhdO1xuXG4gICAgICAgIGlmKGdkLl9kcmFnZ2luZyB8fCBmdWxsTGF5b3V0Mi5ob3Zlcm1vZGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGhvdmVyaW5mbyA9IHRyYWNlMi5ob3ZlcmluZm87XG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoaG92ZXJpbmZvKSkge1xuICAgICAgICAgICAgLy8gc3VwZXIgaGFja3k6IHdlIG5lZWQgdG8gcHVsbCBvdXQgdGhlICpmaXJzdCogaG92ZXJpbmZvIGZyb21cbiAgICAgICAgICAgIC8vIHB0LnB0cywgdGhlbiBwdXQgaXQgYmFjayBpbnRvIGFuIGFycmF5IGluIGEgZHVtbXkgdHJhY2VcbiAgICAgICAgICAgIC8vIGFuZCBjYWxsIGNhc3RIb3ZlcmluZm8gb24gdGhhdC5cbiAgICAgICAgICAgIC8vIFRPRE86IGRvIHdlIHdhbnQgdG8gaGF2ZSBGeC5jYXN0SG92ZXJpbmZvIHNvbWVob3cgaGFuZGxlIHRoaXM/XG4gICAgICAgICAgICAvLyBpdCBhbHJlYWR5IHRha2VzIGFuIGFycmF5IGZvciBpbmRleCwgZm9yIDJELCBzbyB0aGlzIHNlZW1zIHRyaWNreS5cbiAgICAgICAgICAgIGhvdmVyaW5mbyA9IEZ4LmNhc3RIb3ZlcmluZm8oe1xuICAgICAgICAgICAgICAgIGhvdmVyaW5mbzogW2hlbHBlcnMuY2FzdE9wdGlvbihob3ZlcmluZm8sIHB0LnB0cyldLFxuICAgICAgICAgICAgICAgIF9tb2R1bGU6IHRyYWNlLl9tb2R1bGVcbiAgICAgICAgICAgIH0sIGZ1bGxMYXlvdXQyLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGhvdmVyaW5mbyA9PT0gJ2FsbCcpIGhvdmVyaW5mbyA9ICdsYWJlbCt0ZXh0K3ZhbHVlK3BlcmNlbnQrbmFtZSc7XG5cbiAgICAgICAgLy8gaW4gY2FzZSB3ZSBkcmFnZ2VkIG92ZXIgdGhlIHBpZSBmcm9tIGFub3RoZXIgc3VicGxvdCxcbiAgICAgICAgLy8gb3IgaWYgaG92ZXIgaXMgdHVybmVkIG9mZlxuICAgICAgICBpZih0cmFjZTIuaG92ZXJ0ZW1wbGF0ZSB8fCAoaG92ZXJpbmZvICE9PSAnbm9uZScgJiYgaG92ZXJpbmZvICE9PSAnc2tpcCcgJiYgaG92ZXJpbmZvKSkge1xuICAgICAgICAgICAgdmFyIHJJbnNjcmliZWQgPSBwdC5ySW5zY3JpYmVkIHx8IDA7XG4gICAgICAgICAgICB2YXIgaG92ZXJDZW50ZXJYID0gY3ggKyBwdC5weG1pZFswXSAqICgxIC0gckluc2NyaWJlZCk7XG4gICAgICAgICAgICB2YXIgaG92ZXJDZW50ZXJZID0gY3kgKyBwdC5weG1pZFsxXSAqICgxIC0gckluc2NyaWJlZCk7XG4gICAgICAgICAgICB2YXIgc2VwYXJhdG9ycyA9IGZ1bGxMYXlvdXQyLnNlcGFyYXRvcnM7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IFtdO1xuXG4gICAgICAgICAgICBpZihob3ZlcmluZm8gJiYgaG92ZXJpbmZvLmluZGV4T2YoJ2xhYmVsJykgIT09IC0xKSB0ZXh0LnB1c2gocHQubGFiZWwpO1xuICAgICAgICAgICAgcHQudGV4dCA9IGhlbHBlcnMuY2FzdE9wdGlvbih0cmFjZTIuaG92ZXJ0ZXh0IHx8IHRyYWNlMi50ZXh0LCBwdC5wdHMpO1xuICAgICAgICAgICAgaWYoaG92ZXJpbmZvICYmIGhvdmVyaW5mby5pbmRleE9mKCd0ZXh0JykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFyIHR4ID0gcHQudGV4dDtcbiAgICAgICAgICAgICAgICBpZihMaWIuaXNWYWxpZFRleHRWYWx1ZSh0eCkpIHRleHQucHVzaCh0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwdC52YWx1ZSA9IHB0LnY7XG4gICAgICAgICAgICBwdC52YWx1ZUxhYmVsID0gaGVscGVycy5mb3JtYXRQaWVWYWx1ZShwdC52LCBzZXBhcmF0b3JzKTtcbiAgICAgICAgICAgIGlmKGhvdmVyaW5mbyAmJiBob3ZlcmluZm8uaW5kZXhPZigndmFsdWUnKSAhPT0gLTEpIHRleHQucHVzaChwdC52YWx1ZUxhYmVsKTtcbiAgICAgICAgICAgIHB0LnBlcmNlbnQgPSBwdC52IC8gY2QwLnZUb3RhbDtcbiAgICAgICAgICAgIHB0LnBlcmNlbnRMYWJlbCA9IGhlbHBlcnMuZm9ybWF0UGllUGVyY2VudChwdC5wZXJjZW50LCBzZXBhcmF0b3JzKTtcbiAgICAgICAgICAgIGlmKGhvdmVyaW5mbyAmJiBob3ZlcmluZm8uaW5kZXhPZigncGVyY2VudCcpICE9PSAtMSkgdGV4dC5wdXNoKHB0LnBlcmNlbnRMYWJlbCk7XG5cbiAgICAgICAgICAgIHZhciBob3ZlckxhYmVsID0gdHJhY2UyLmhvdmVybGFiZWw7XG4gICAgICAgICAgICB2YXIgaG92ZXJGb250ID0gaG92ZXJMYWJlbC5mb250O1xuXG4gICAgICAgICAgICBGeC5sb25lSG92ZXIoe1xuICAgICAgICAgICAgICAgIHRyYWNlOiB0cmFjZSxcbiAgICAgICAgICAgICAgICB4MDogaG92ZXJDZW50ZXJYIC0gckluc2NyaWJlZCAqIGNkMC5yLFxuICAgICAgICAgICAgICAgIHgxOiBob3ZlckNlbnRlclggKyBySW5zY3JpYmVkICogY2QwLnIsXG4gICAgICAgICAgICAgICAgeTogaG92ZXJDZW50ZXJZLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQuam9pbignPGJyPicpLFxuICAgICAgICAgICAgICAgIG5hbWU6ICh0cmFjZTIuaG92ZXJ0ZW1wbGF0ZSB8fCBob3ZlcmluZm8uaW5kZXhPZignbmFtZScpICE9PSAtMSkgPyB0cmFjZTIubmFtZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpZGVhbEFsaWduOiBwdC5weG1pZFswXSA8IDAgPyAnbGVmdCcgOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBoZWxwZXJzLmNhc3RPcHRpb24oaG92ZXJMYWJlbC5iZ2NvbG9yLCBwdC5wdHMpIHx8IHB0LmNvbG9yLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBoZWxwZXJzLmNhc3RPcHRpb24oaG92ZXJMYWJlbC5ib3JkZXJjb2xvciwgcHQucHRzKSxcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiBoZWxwZXJzLmNhc3RPcHRpb24oaG92ZXJGb250LmZhbWlseSwgcHQucHRzKSxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogaGVscGVycy5jYXN0T3B0aW9uKGhvdmVyRm9udC5zaXplLCBwdC5wdHMpLFxuICAgICAgICAgICAgICAgIGZvbnRDb2xvcjogaGVscGVycy5jYXN0T3B0aW9uKGhvdmVyRm9udC5jb2xvciwgcHQucHRzKSxcbiAgICAgICAgICAgICAgICBuYW1lTGVuZ3RoOiBoZWxwZXJzLmNhc3RPcHRpb24oaG92ZXJMYWJlbC5uYW1lbGVuZ3RoLCBwdC5wdHMpLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogaGVscGVycy5jYXN0T3B0aW9uKGhvdmVyTGFiZWwuYWxpZ24sIHB0LnB0cyksXG4gICAgICAgICAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogaGVscGVycy5jYXN0T3B0aW9uKHRyYWNlMi5ob3ZlcnRlbXBsYXRlLCBwdC5wdHMpLFxuICAgICAgICAgICAgICAgIGhvdmVydGVtcGxhdGVMYWJlbHM6IHB0LFxuICAgICAgICAgICAgICAgIGV2ZW50RGF0YTogW2V2ZW50RGF0YShwdCwgdHJhY2UyKV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IGZ1bGxMYXlvdXQyLl9ob3ZlcmxheWVyLm5vZGUoKSxcbiAgICAgICAgICAgICAgICBvdXRlckNvbnRhaW5lcjogZnVsbExheW91dDIuX3BhcGVyLm5vZGUoKSxcbiAgICAgICAgICAgICAgICBnZDogZ2RcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0cmFjZS5faGFzSG92ZXJMYWJlbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0cmFjZS5faGFzSG92ZXJFdmVudCA9IHRydWU7XG4gICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9ob3ZlcicsIHtcbiAgICAgICAgICAgIHBvaW50czogW2V2ZW50RGF0YShwdCwgdHJhY2UyKV0sXG4gICAgICAgICAgICBldmVudDogZDMuZXZlbnRcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzbGljZVRvcC5vbignbW91c2VvdXQnLCBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgdmFyIGZ1bGxMYXlvdXQyID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgICAgIHZhciB0cmFjZTIgPSBnZC5fZnVsbERhdGFbdHJhY2UuaW5kZXhdO1xuICAgICAgICB2YXIgcHQgPSBkMy5zZWxlY3QodGhpcykuZGF0dW0oKTtcblxuICAgICAgICBpZih0cmFjZS5faGFzSG92ZXJFdmVudCkge1xuICAgICAgICAgICAgZXZ0Lm9yaWdpbmFsRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgICAgIGdkLmVtaXQoJ3Bsb3RseV91bmhvdmVyJywge1xuICAgICAgICAgICAgICAgIHBvaW50czogW2V2ZW50RGF0YShwdCwgdHJhY2UyKV0sXG4gICAgICAgICAgICAgICAgZXZlbnQ6IGQzLmV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyYWNlLl9oYXNIb3ZlckV2ZW50ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cmFjZS5faGFzSG92ZXJMYWJlbCkge1xuICAgICAgICAgICAgRngubG9uZVVuaG92ZXIoZnVsbExheW91dDIuX2hvdmVybGF5ZXIubm9kZSgpKTtcbiAgICAgICAgICAgIHRyYWNlLl9oYXNIb3ZlckxhYmVsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNsaWNlVG9wLm9uKCdjbGljaycsIGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgIC8vIFRPRE86IHRoaXMgZG9lcyBub3Qgc3VwcG9ydCByaWdodC1jbGljay4gSWYgd2Ugd2FudCB0byBzdXBwb3J0IGl0LCB3ZVxuICAgICAgICAvLyB3b3VsZCBsaWtlbHkgbmVlZCB0byBjaGFuZ2UgcGllIHRvIHVzZSBkcmFnRWxlbWVudCBpbnN0ZWFkIG9mIHN0cmFpZ2h0XG4gICAgICAgIC8vIG1hcGJveCBldmVudCBiaW5kaW5nLiBPciBwZXJoYXBzIGJldHRlciwgbWFrZSBhIHNpbXBsZSB3cmFwcGVyIHdpdGggdGhlXG4gICAgICAgIC8vIHJpZ2h0IG1vdXNlZG93biwgbW91c2Vtb3ZlLCBhbmQgbW91c2V1cCBoYW5kbGVycyBqdXN0IGZvciBhIGxlZnQvcmlnaHQgY2xpY2tcbiAgICAgICAgLy8gbWFwYm94IHdvdWxkIHVzZSB0aGlzIHRvby5cbiAgICAgICAgdmFyIGZ1bGxMYXlvdXQyID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgICAgIHZhciB0cmFjZTIgPSBnZC5fZnVsbERhdGFbdHJhY2UuaW5kZXhdO1xuXG4gICAgICAgIGlmKGdkLl9kcmFnZ2luZyB8fCBmdWxsTGF5b3V0Mi5ob3Zlcm1vZGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgZ2QuX2hvdmVyZGF0YSA9IFtldmVudERhdGEocHQsIHRyYWNlMildO1xuICAgICAgICBGeC5jbGljayhnZCwgZDMuZXZlbnQpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZXRlcm1pbmVPdXRzaWRlVGV4dEZvbnQodHJhY2UsIHB0LCBsYXlvdXRGb250KSB7XG4gICAgdmFyIGNvbG9yID1cbiAgICAgICAgaGVscGVycy5jYXN0T3B0aW9uKHRyYWNlLm91dHNpZGV0ZXh0Zm9udC5jb2xvciwgcHQucHRzKSB8fFxuICAgICAgICBoZWxwZXJzLmNhc3RPcHRpb24odHJhY2UudGV4dGZvbnQuY29sb3IsIHB0LnB0cykgfHxcbiAgICAgICAgbGF5b3V0Rm9udC5jb2xvcjtcblxuICAgIHZhciBmYW1pbHkgPVxuICAgICAgICBoZWxwZXJzLmNhc3RPcHRpb24odHJhY2Uub3V0c2lkZXRleHRmb250LmZhbWlseSwgcHQucHRzKSB8fFxuICAgICAgICBoZWxwZXJzLmNhc3RPcHRpb24odHJhY2UudGV4dGZvbnQuZmFtaWx5LCBwdC5wdHMpIHx8XG4gICAgICAgIGxheW91dEZvbnQuZmFtaWx5O1xuXG4gICAgdmFyIHNpemUgPVxuICAgICAgICBoZWxwZXJzLmNhc3RPcHRpb24odHJhY2Uub3V0c2lkZXRleHRmb250LnNpemUsIHB0LnB0cykgfHxcbiAgICAgICAgaGVscGVycy5jYXN0T3B0aW9uKHRyYWNlLnRleHRmb250LnNpemUsIHB0LnB0cykgfHxcbiAgICAgICAgbGF5b3V0Rm9udC5zaXplO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICBmYW1pbHk6IGZhbWlseSxcbiAgICAgICAgc2l6ZTogc2l6ZVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRldGVybWluZUluc2lkZVRleHRGb250KHRyYWNlLCBwdCwgbGF5b3V0Rm9udCkge1xuICAgIHZhciBjdXN0b21Db2xvciA9IGhlbHBlcnMuY2FzdE9wdGlvbih0cmFjZS5pbnNpZGV0ZXh0Zm9udC5jb2xvciwgcHQucHRzKTtcbiAgICBpZighY3VzdG9tQ29sb3IgJiYgdHJhY2UuX2lucHV0LnRleHRmb250KSB7XG4gICAgICAgIC8vIFdoeSBub3Qgc2ltcGx5IHVzaW5nIHRyYWNlLnRleHRmb250PyBCZWNhdXNlIGlmIG5vdCBzZXQsIGl0XG4gICAgICAgIC8vIGRlZmF1bHRzIHRvIGxheW91dC5mb250IHdoaWNoIGhhcyBhIGRlZmF1bHQgY29sb3IuIEJ1dCBpZlxuICAgICAgICAvLyB0ZXh0Zm9udC5jb2xvciBhbmQgaW5zaWRldGV4dGZvbnQuY29sb3IgZG9uJ3Qgc3VwcGx5IGEgdmFsdWUsXG4gICAgICAgIC8vIGEgY29udHJhc3RpbmcgY29sb3Igc2hhbGwgYmUgdXNlZC5cbiAgICAgICAgY3VzdG9tQ29sb3IgPSBoZWxwZXJzLmNhc3RPcHRpb24odHJhY2UuX2lucHV0LnRleHRmb250LmNvbG9yLCBwdC5wdHMpO1xuICAgIH1cblxuICAgIHZhciBmYW1pbHkgPVxuICAgICAgICBoZWxwZXJzLmNhc3RPcHRpb24odHJhY2UuaW5zaWRldGV4dGZvbnQuZmFtaWx5LCBwdC5wdHMpIHx8XG4gICAgICAgIGhlbHBlcnMuY2FzdE9wdGlvbih0cmFjZS50ZXh0Zm9udC5mYW1pbHksIHB0LnB0cykgfHxcbiAgICAgICAgbGF5b3V0Rm9udC5mYW1pbHk7XG5cbiAgICB2YXIgc2l6ZSA9XG4gICAgICAgIGhlbHBlcnMuY2FzdE9wdGlvbih0cmFjZS5pbnNpZGV0ZXh0Zm9udC5zaXplLCBwdC5wdHMpIHx8XG4gICAgICAgIGhlbHBlcnMuY2FzdE9wdGlvbih0cmFjZS50ZXh0Zm9udC5zaXplLCBwdC5wdHMpIHx8XG4gICAgICAgIGxheW91dEZvbnQuc2l6ZTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbG9yOiBjdXN0b21Db2xvciB8fCBDb2xvci5jb250cmFzdChwdC5jb2xvciksXG4gICAgICAgIGZhbWlseTogZmFtaWx5LFxuICAgICAgICBzaXplOiBzaXplXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcHJlcmVuZGVyVGl0bGVzKGNkTW9kdWxlLCBnZCkge1xuICAgIHZhciBjZDAsIHRyYWNlO1xuXG4gICAgLy8gRGV0ZXJtaW5lIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSB0aXRsZSBmb3IgZWFjaCBwaWUuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNkTW9kdWxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNkMCA9IGNkTW9kdWxlW2ldWzBdO1xuICAgICAgICB0cmFjZSA9IGNkMC50cmFjZTtcblxuICAgICAgICBpZih0cmFjZS50aXRsZS50ZXh0KSB7XG4gICAgICAgICAgICB2YXIgdHh0ID0gdHJhY2UudGl0bGUudGV4dDtcbiAgICAgICAgICAgIGlmKHRyYWNlLl9tZXRhKSB7XG4gICAgICAgICAgICAgICAgdHh0ID0gTGliLnRlbXBsYXRlU3RyaW5nKHR4dCwgdHJhY2UuX21ldGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHVtbXlUaXRsZSA9IERyYXdpbmcudGVzdGVyLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAgIC5hdHRyKCdkYXRhLW5vdGV4JywgMSlcbiAgICAgICAgICAgICAgLnRleHQodHh0KVxuICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLmZvbnQsIHRyYWNlLnRpdGxlLmZvbnQpXG4gICAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcbiAgICAgICAgICAgIHZhciBiQm94ID0gRHJhd2luZy5iQm94KGR1bW15VGl0bGUubm9kZSgpLCB0cnVlKTtcbiAgICAgICAgICAgIGNkMC50aXRsZUJveCA9IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogYkJveC53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGJCb3guaGVpZ2h0LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGR1bW15VGl0bGUucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybUluc2lkZVRleHQodGV4dEJCLCBwdCwgY2QwKSB7XG4gICAgdmFyIHIgPSBjZDAuciB8fCBwdC5ycHgxO1xuICAgIHZhciBySW5zY3JpYmVkID0gcHQuckluc2NyaWJlZDtcblxuICAgIHZhciBpc0VtcHR5ID0gcHQuc3RhcnRhbmdsZSA9PT0gcHQuc3RvcGFuZ2xlO1xuICAgIGlmKGlzRW1wdHkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJDZW50ZXI6IDEgLSBySW5zY3JpYmVkLFxuICAgICAgICAgICAgc2NhbGU6IDAsXG4gICAgICAgICAgICByb3RhdGU6IDAsXG4gICAgICAgICAgICB0ZXh0UG9zQW5nbGU6IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgcmluZyA9IHB0LnJpbmc7XG4gICAgdmFyIGlzQ2lyY2xlID0gKHJpbmcgPT09IDEpICYmIChNYXRoLmFicyhwdC5zdGFydGFuZ2xlIC0gcHQuc3RvcGFuZ2xlKSA9PT0gTWF0aC5QSSAqIDIpO1xuXG4gICAgdmFyIGhhbGZBbmdsZSA9IHB0LmhhbGZhbmdsZTtcbiAgICB2YXIgbWlkQW5nbGUgPSBwdC5taWRhbmdsZTtcblxuICAgIHZhciBvcmllbnRhdGlvbiA9IGNkMC50cmFjZS5pbnNpZGV0ZXh0b3JpZW50YXRpb247XG4gICAgdmFyIGlzSG9yaXpvbnRhbCA9IG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgdmFyIGlzVGFuZ2VudGlhbCA9IG9yaWVudGF0aW9uID09PSAndGFuZ2VudGlhbCc7XG4gICAgdmFyIGlzUmFkaWFsID0gb3JpZW50YXRpb24gPT09ICdyYWRpYWwnO1xuICAgIHZhciBpc0F1dG8gPSBvcmllbnRhdGlvbiA9PT0gJ2F1dG8nO1xuXG4gICAgdmFyIGFsbFRyYW5zZm9ybXMgPSBbXTtcbiAgICB2YXIgbmV3VDtcblxuICAgIGlmKCFpc0F1dG8pIHtcbiAgICAgICAgLy8gbWF4IHNpemUgaWYgdGV4dCBpcyBwbGFjZWQgKGhvcml6b250YWxseSkgYXQgdGhlIHRvcCBvciBib3R0b20gb2YgdGhlIGFyY1xuXG4gICAgICAgIHZhciBjb25zaWRlckNyb3NzaW5nID0gZnVuY3Rpb24oYW5nbGUsIGtleSkge1xuICAgICAgICAgICAgaWYoaXNDcm9zc2luZyhwdCwgYW5nbGUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRTdGFydCA9IE1hdGguYWJzKGFuZ2xlIC0gcHQuc3RhcnRhbmdsZSk7XG4gICAgICAgICAgICAgICAgdmFyIGRTdG9wID0gTWF0aC5hYnMoYW5nbGUgLSBwdC5zdG9wYW5nbGUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNsb3Nlc3RFZGdlID0gZFN0YXJ0IDwgZFN0b3AgPyBkU3RhcnQgOiBkU3RvcDtcblxuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gJ3RhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VCA9IGNhbGNUYW5UcmFuc2Zvcm0odGV4dEJCLCByLCByaW5nLCBjbG9zZXN0RWRnZSwgMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gY2FzZSBvZiAncmFkJ1xuICAgICAgICAgICAgICAgICAgICBuZXdUID0gY2FsY1JhZFRyYW5zZm9ybSh0ZXh0QkIsIHIsIHJpbmcsIGNsb3Nlc3RFZGdlLCBNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld1QudGV4dFBvc0FuZ2xlID0gYW5nbGU7XG5cbiAgICAgICAgICAgICAgICBhbGxUcmFuc2Zvcm1zLnB1c2gobmV3VCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdG8gY292ZXIgYWxsIGNhc2VzIHdpdGggdHJhY2Uucm90YXRpb24gYWRkZWRcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGlmKGlzSG9yaXpvbnRhbCB8fCBpc1RhbmdlbnRpYWwpIHtcbiAgICAgICAgICAgIC8vIHRvcFxuICAgICAgICAgICAgZm9yKGkgPSA0OyBpID49IC00OyBpIC09IDIpIGNvbnNpZGVyQ3Jvc3NpbmcoTWF0aC5QSSAqIGksICd0YW4nKTtcbiAgICAgICAgICAgIC8vIGJvdHRvbVxuICAgICAgICAgICAgZm9yKGkgPSA0OyBpID49IC00OyBpIC09IDIpIGNvbnNpZGVyQ3Jvc3NpbmcoTWF0aC5QSSAqIChpICsgMSksICd0YW4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZihpc0hvcml6b250YWwgfHwgaXNSYWRpYWwpIHtcbiAgICAgICAgICAgIC8vIGxlZnRcbiAgICAgICAgICAgIGZvcihpID0gNDsgaSA+PSAtNDsgaSAtPSAyKSBjb25zaWRlckNyb3NzaW5nKE1hdGguUEkgKiAoaSArIDEuNSksICdyYWQnKTtcbiAgICAgICAgICAgIC8vIHJpZ2h0XG4gICAgICAgICAgICBmb3IoaSA9IDQ7IGkgPj0gLTQ7IGkgLT0gMikgY29uc2lkZXJDcm9zc2luZyhNYXRoLlBJICogKGkgKyAwLjUpLCAncmFkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihpc0NpcmNsZSB8fCBpc0F1dG8gfHwgaXNIb3Jpem9udGFsKSB7XG4gICAgICAgIC8vIG1heCBzaXplIHRleHQgY2FuIGJlIGluc2VydGVkIGluc2lkZSB3aXRob3V0IHJvdGF0aW5nIGl0XG4gICAgICAgIC8vIHRoaXMgaW5zY3JpYmVzIHRoZSB0ZXh0IHJlY3RhbmdsZSBpbiBhIGNpcmNsZSwgd2hpY2ggaXMgdGhlbiBpbnNjcmliZWRcbiAgICAgICAgLy8gaW4gdGhlIHNsaWNlLCBzbyBpdCB3aWxsIGJlIGFuIHVuZGVyZXN0aW1hdGUsIHdoaWNoIHNvbWUgZGF5IHdlIG1heSB3YW50XG4gICAgICAgIC8vIHRvIGltcHJvdmUgc28gdGhpcyBjYXNlIGNhbiBnZXQgbW9yZSB1c2VcbiAgICAgICAgdmFyIHRleHREaWFtZXRlciA9IE1hdGguc3FydCh0ZXh0QkIud2lkdGggKiB0ZXh0QkIud2lkdGggKyB0ZXh0QkIuaGVpZ2h0ICogdGV4dEJCLmhlaWdodCk7XG5cbiAgICAgICAgbmV3VCA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBySW5zY3JpYmVkICogciAqIDIgLyB0ZXh0RGlhbWV0ZXIsXG5cbiAgICAgICAgICAgIC8vIGFuZCB0aGUgY2VudGVyIHBvc2l0aW9uIGFuZCByb3RhdGlvbiBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgIHJDZW50ZXI6IDEgLSBySW5zY3JpYmVkLFxuICAgICAgICAgICAgcm90YXRlOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgbmV3VC50ZXh0UG9zQW5nbGUgPSAocHQuc3RhcnRhbmdsZSArIHB0LnN0b3BhbmdsZSkgLyAyO1xuICAgICAgICBpZihuZXdULnNjYWxlID49IDEpIHJldHVybiBuZXdUO1xuXG4gICAgICAgIGFsbFRyYW5zZm9ybXMucHVzaChuZXdUKTtcbiAgICB9XG5cbiAgICBpZihpc0F1dG8gfHwgaXNSYWRpYWwpIHtcbiAgICAgICAgbmV3VCA9IGNhbGNSYWRUcmFuc2Zvcm0odGV4dEJCLCByLCByaW5nLCBoYWxmQW5nbGUsIG1pZEFuZ2xlKTtcbiAgICAgICAgbmV3VC50ZXh0UG9zQW5nbGUgPSAocHQuc3RhcnRhbmdsZSArIHB0LnN0b3BhbmdsZSkgLyAyO1xuICAgICAgICBhbGxUcmFuc2Zvcm1zLnB1c2gobmV3VCk7XG4gICAgfVxuXG4gICAgaWYoaXNBdXRvIHx8IGlzVGFuZ2VudGlhbCkge1xuICAgICAgICBuZXdUID0gY2FsY1RhblRyYW5zZm9ybSh0ZXh0QkIsIHIsIHJpbmcsIGhhbGZBbmdsZSwgbWlkQW5nbGUpO1xuICAgICAgICBuZXdULnRleHRQb3NBbmdsZSA9IChwdC5zdGFydGFuZ2xlICsgcHQuc3RvcGFuZ2xlKSAvIDI7XG4gICAgICAgIGFsbFRyYW5zZm9ybXMucHVzaChuZXdUKTtcbiAgICB9XG5cbiAgICB2YXIgaWQgPSAwO1xuICAgIHZhciBtYXhTY2FsZSA9IDA7XG4gICAgZm9yKHZhciBrID0gMDsgayA8IGFsbFRyYW5zZm9ybXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIHMgPSBhbGxUcmFuc2Zvcm1zW2tdLnNjYWxlO1xuICAgICAgICBpZihtYXhTY2FsZSA8IHMpIHtcbiAgICAgICAgICAgIG1heFNjYWxlID0gcztcbiAgICAgICAgICAgIGlkID0gaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFpc0F1dG8gJiYgbWF4U2NhbGUgPj0gMSkge1xuICAgICAgICAgICAgLy8gcmVzcGVjdCB0ZXN0IG9yZGVyIGZvciBub24tYXV0byBvcHRpb25zXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWxsVHJhbnNmb3Jtc1tpZF07XG59XG5cbmZ1bmN0aW9uIGlzQ3Jvc3NpbmcocHQsIGFuZ2xlKSB7XG4gICAgdmFyIHN0YXJ0ID0gcHQuc3RhcnRhbmdsZTtcbiAgICB2YXIgc3RvcCA9IHB0LnN0b3BhbmdsZTtcbiAgICByZXR1cm4gKFxuICAgICAgICAoc3RhcnQgPiBhbmdsZSAmJiBhbmdsZSA+IHN0b3ApIHx8XG4gICAgICAgIChzdGFydCA8IGFuZ2xlICYmIGFuZ2xlIDwgc3RvcClcbiAgICApO1xufVxuXG5mdW5jdGlvbiBjYWxjUmFkVHJhbnNmb3JtKHRleHRCQiwgciwgcmluZywgaGFsZkFuZ2xlLCBtaWRBbmdsZSkge1xuICAgIHIgPSBNYXRoLm1heCgwLCByIC0gMiAqIFRFWFRQQUQpO1xuXG4gICAgLy8gbWF4IHNpemUgaWYgdGV4dCBpcyByb3RhdGVkIHJhZGlhbGx5XG4gICAgdmFyIGEgPSB0ZXh0QkIud2lkdGggLyB0ZXh0QkIuaGVpZ2h0O1xuICAgIHZhciBzID0gY2FsY01heEhhbGZTaXplKGEsIGhhbGZBbmdsZSwgciwgcmluZyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IHMgKiAyIC8gdGV4dEJCLmhlaWdodCxcbiAgICAgICAgckNlbnRlcjogY2FsY1JDZW50ZXIoYSwgcyAvIHIpLFxuICAgICAgICByb3RhdGU6IGNhbGNSb3RhdGUobWlkQW5nbGUpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY2FsY1RhblRyYW5zZm9ybSh0ZXh0QkIsIHIsIHJpbmcsIGhhbGZBbmdsZSwgbWlkQW5nbGUpIHtcbiAgICByID0gTWF0aC5tYXgoMCwgciAtIDIgKiBURVhUUEFEKTtcblxuICAgIC8vIG1heCBzaXplIGlmIHRleHQgaXMgcm90YXRlZCB0YW5nZW50aWFsbHlcbiAgICB2YXIgYSA9IHRleHRCQi5oZWlnaHQgLyB0ZXh0QkIud2lkdGg7XG4gICAgdmFyIHMgPSBjYWxjTWF4SGFsZlNpemUoYSwgaGFsZkFuZ2xlLCByLCByaW5nKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzY2FsZTogcyAqIDIgLyB0ZXh0QkIud2lkdGgsXG4gICAgICAgIHJDZW50ZXI6IGNhbGNSQ2VudGVyKGEsIHMgLyByKSxcbiAgICAgICAgcm90YXRlOiBjYWxjUm90YXRlKG1pZEFuZ2xlICsgTWF0aC5QSSAvIDIpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY2FsY1JDZW50ZXIoYSwgYikge1xuICAgIHJldHVybiBNYXRoLmNvcyhiKSAtIGEgKiBiO1xufVxuXG5mdW5jdGlvbiBjYWxjUm90YXRlKHQpIHtcbiAgICByZXR1cm4gKDE4MCAvIE1hdGguUEkgKiB0ICsgNzIwKSAlIDE4MCAtIDkwO1xufVxuXG5mdW5jdGlvbiBjYWxjTWF4SGFsZlNpemUoYSwgaGFsZkFuZ2xlLCByLCByaW5nKSB7XG4gICAgdmFyIHEgPSBhICsgMSAvICgyICogTWF0aC50YW4oaGFsZkFuZ2xlKSk7XG4gICAgcmV0dXJuIHIgKiBNYXRoLm1pbihcbiAgICAgICAgMSAvIChNYXRoLnNxcnQocSAqIHEgKyAwLjUpICsgcSksXG4gICAgICAgIHJpbmcgLyAoTWF0aC5zcXJ0KGEgKiBhICsgcmluZyAvIDIpICsgYSlcbiAgICApO1xufVxuXG5mdW5jdGlvbiBnZXRJbnNjcmliZWRSYWRpdXNGcmFjdGlvbihwdCwgY2QwKSB7XG4gICAgaWYocHQudiA9PT0gY2QwLnZUb3RhbCAmJiAhY2QwLnRyYWNlLmhvbGUpIHJldHVybiAxOy8vIHNwZWNpYWwgY2FzZSBvZiAxMDAlIHdpdGggbm8gaG9sZVxuXG4gICAgcmV0dXJuIE1hdGgubWluKDEgLyAoMSArIDEgLyBNYXRoLnNpbihwdC5oYWxmYW5nbGUpKSwgcHQucmluZyAvIDIpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1PdXRzaWRlVGV4dCh0ZXh0QkIsIHB0KSB7XG4gICAgdmFyIHggPSBwdC5weG1pZFswXTtcbiAgICB2YXIgeSA9IHB0LnB4bWlkWzFdO1xuICAgIHZhciBkeCA9IHRleHRCQi53aWR0aCAvIDI7XG4gICAgdmFyIGR5ID0gdGV4dEJCLmhlaWdodCAvIDI7XG5cbiAgICBpZih4IDwgMCkgZHggKj0gLTE7XG4gICAgaWYoeSA8IDApIGR5ICo9IC0xO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgIHJDZW50ZXI6IDEsXG4gICAgICAgIHJvdGF0ZTogMCxcbiAgICAgICAgeDogZHggKyBNYXRoLmFicyhkeSkgKiAoZHggPiAwID8gMSA6IC0xKSAvIDIsXG4gICAgICAgIHk6IGR5IC8gKDEgKyB4ICogeCAvICh5ICogeSkpLFxuICAgICAgICBvdXRzaWRlOiB0cnVlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25UaXRsZUluc2lkZShjZDApIHtcbiAgICB2YXIgdGV4dERpYW1ldGVyID1cbiAgICAgICAgTWF0aC5zcXJ0KGNkMC50aXRsZUJveC53aWR0aCAqIGNkMC50aXRsZUJveC53aWR0aCArIGNkMC50aXRsZUJveC5oZWlnaHQgKiBjZDAudGl0bGVCb3guaGVpZ2h0KTtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBjZDAuY3gsXG4gICAgICAgIHk6IGNkMC5jeSxcbiAgICAgICAgc2NhbGU6IGNkMC50cmFjZS5ob2xlICogY2QwLnIgKiAyIC8gdGV4dERpYW1ldGVyLFxuICAgICAgICB0eDogMCxcbiAgICAgICAgdHk6IC0gY2QwLnRpdGxlQm94LmhlaWdodCAvIDIgKyBjZDAudHJhY2UudGl0bGUuZm9udC5zaXplXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25UaXRsZU91dHNpZGUoY2QwLCBwbG90U2l6ZSkge1xuICAgIHZhciBzY2FsZVggPSAxO1xuICAgIHZhciBzY2FsZVkgPSAxO1xuICAgIHZhciBtYXhQdWxsO1xuXG4gICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBiYXNlbGluZSBwb2ludCBvZiB0aGUgdGV4dCBib3ggaW4gdGhlIHBsb3QsIGJlZm9yZSBzY2FsaW5nLlxuICAgIC8vIHdlIGFuY2hvcmVkIHRoZSB0ZXh0IGluIHRoZSBtaWRkbGUsIHNvIHRoZSBiYXNlbGluZSBpcyBvbiB0aGUgYm90dG9tIG1pZGRsZVxuICAgIC8vIG9mIHRoZSBmaXJzdCBsaW5lIG9mIHRleHQuXG4gICAgdmFyIHRvcE1pZGRsZSA9IHtcbiAgICAgICAgeDogY2QwLmN4LFxuICAgICAgICB5OiBjZDAuY3lcbiAgICB9O1xuICAgIC8vIHJlbGF0aXZlIHRyYW5zbGF0aW9uIG9mIHRoZSB0ZXh0IGJveCBhZnRlciBzY2FsaW5nXG4gICAgdmFyIHRyYW5zbGF0ZSA9IHtcbiAgICAgICAgdHg6IDAsXG4gICAgICAgIHR5OiAwXG4gICAgfTtcblxuICAgIC8vIHdlIHJlYXNvbiBiZWxvdyBhcyBpZiB0aGUgYmFzZWxpbmUgaXMgdGhlIHRvcCBtaWRkbGUgcG9pbnQgb2YgdGhlIHRleHQgYm94LlxuICAgIC8vIHNvIHdlIG11c3QgYWRkIHRoZSBmb250IHNpemUgdG8gYXBwcm94aW1hdGUgdGhlIHktY29vcmQuIG9mIHRoZSB0b3AuXG4gICAgLy8gbm90ZSB0aGF0IHRoaXMgY29ycmVjdGlvbiBtdXN0IGhhcHBlbiBhZnRlciBzY2FsaW5nLlxuICAgIHRyYW5zbGF0ZS50eSArPSB0cmFjZS50aXRsZS5mb250LnNpemU7XG4gICAgbWF4UHVsbCA9IGdldE1heFB1bGwodHJhY2UpO1xuXG4gICAgaWYodHJhY2UudGl0bGUucG9zaXRpb24uaW5kZXhPZigndG9wJykgIT09IC0xKSB7XG4gICAgICAgIHRvcE1pZGRsZS55IC09ICgxICsgbWF4UHVsbCkgKiBjZDAucjtcbiAgICAgICAgdHJhbnNsYXRlLnR5IC09IGNkMC50aXRsZUJveC5oZWlnaHQ7XG4gICAgfSBlbHNlIGlmKHRyYWNlLnRpdGxlLnBvc2l0aW9uLmluZGV4T2YoJ2JvdHRvbScpICE9PSAtMSkge1xuICAgICAgICB0b3BNaWRkbGUueSArPSAoMSArIG1heFB1bGwpICogY2QwLnI7XG4gICAgfVxuXG4gICAgdmFyIHJ4ID0gYXBwbHlBc3BlY3RSYXRpbyhjZDAuciwgY2QwLnRyYWNlLmFzcGVjdHJhdGlvKTtcblxuICAgIHZhciBtYXhXaWR0aCA9IHBsb3RTaXplLncgKiAodHJhY2UuZG9tYWluLnhbMV0gLSB0cmFjZS5kb21haW4ueFswXSkgLyAyO1xuICAgIGlmKHRyYWNlLnRpdGxlLnBvc2l0aW9uLmluZGV4T2YoJ2xlZnQnKSAhPT0gLTEpIHtcbiAgICAgICAgLy8gd2Ugc3RhcnQgdGhlIHRleHQgYXQgdGhlIGxlZnQgZWRnZSBvZiB0aGUgcGllXG4gICAgICAgIG1heFdpZHRoID0gbWF4V2lkdGggKyByeDtcbiAgICAgICAgdG9wTWlkZGxlLnggLT0gKDEgKyBtYXhQdWxsKSAqIHJ4O1xuICAgICAgICB0cmFuc2xhdGUudHggKz0gY2QwLnRpdGxlQm94LndpZHRoIC8gMjtcbiAgICB9IGVsc2UgaWYodHJhY2UudGl0bGUucG9zaXRpb24uaW5kZXhPZignY2VudGVyJykgIT09IC0xKSB7XG4gICAgICAgIG1heFdpZHRoICo9IDI7XG4gICAgfSBlbHNlIGlmKHRyYWNlLnRpdGxlLnBvc2l0aW9uLmluZGV4T2YoJ3JpZ2h0JykgIT09IC0xKSB7XG4gICAgICAgIG1heFdpZHRoID0gbWF4V2lkdGggKyByeDtcbiAgICAgICAgdG9wTWlkZGxlLnggKz0gKDEgKyBtYXhQdWxsKSAqIHJ4O1xuICAgICAgICB0cmFuc2xhdGUudHggLT0gY2QwLnRpdGxlQm94LndpZHRoIC8gMjtcbiAgICB9XG4gICAgc2NhbGVYID0gbWF4V2lkdGggLyBjZDAudGl0bGVCb3gud2lkdGg7XG4gICAgc2NhbGVZID0gZ2V0VGl0bGVTcGFjZShjZDAsIHBsb3RTaXplKSAvIGNkMC50aXRsZUJveC5oZWlnaHQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogdG9wTWlkZGxlLngsXG4gICAgICAgIHk6IHRvcE1pZGRsZS55LFxuICAgICAgICBzY2FsZTogTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpLFxuICAgICAgICB0eDogdHJhbnNsYXRlLnR4LFxuICAgICAgICB0eTogdHJhbnNsYXRlLnR5XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwbHlBc3BlY3RSYXRpbyh4LCBhc3BlY3RyYXRpbykge1xuICAgIHJldHVybiB4IC8gKChhc3BlY3RyYXRpbyA9PT0gdW5kZWZpbmVkKSA/IDEgOiBhc3BlY3RyYXRpbyk7XG59XG5cbmZ1bmN0aW9uIGdldFRpdGxlU3BhY2UoY2QwLCBwbG90U2l6ZSkge1xuICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcbiAgICB2YXIgcGllQm94SGVpZ2h0ID0gcGxvdFNpemUuaCAqICh0cmFjZS5kb21haW4ueVsxXSAtIHRyYWNlLmRvbWFpbi55WzBdKTtcbiAgICAvLyB1c2UgYXQgbW9zdCBoYWxmIG9mIHRoZSBwbG90IGZvciB0aGUgdGl0bGVcbiAgICByZXR1cm4gTWF0aC5taW4oY2QwLnRpdGxlQm94LmhlaWdodCwgcGllQm94SGVpZ2h0IC8gMik7XG59XG5cbmZ1bmN0aW9uIGdldE1heFB1bGwodHJhY2UpIHtcbiAgICB2YXIgbWF4UHVsbCA9IHRyYWNlLnB1bGw7XG4gICAgaWYoIW1heFB1bGwpIHJldHVybiAwO1xuXG4gICAgdmFyIGo7XG4gICAgaWYoQXJyYXkuaXNBcnJheShtYXhQdWxsKSkge1xuICAgICAgICBtYXhQdWxsID0gMDtcbiAgICAgICAgZm9yKGogPSAwOyBqIDwgdHJhY2UucHVsbC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYodHJhY2UucHVsbFtqXSA+IG1heFB1bGwpIG1heFB1bGwgPSB0cmFjZS5wdWxsW2pdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXhQdWxsO1xufVxuXG5mdW5jdGlvbiBzY29vdExhYmVscyhxdWFkcmFudHMsIHRyYWNlKSB7XG4gICAgdmFyIHhIYWxmLCB5SGFsZiwgZXF1YXRvckZpcnN0LCBmYXJ0aGVzdFgsIGZhcnRoZXN0WSxcbiAgICAgICAgeERpZmZTaWduLCB5RGlmZlNpZ24sIHRoaXNRdWFkLCBvcHBvc2l0ZVF1YWQsXG4gICAgICAgIHdob2xlU2lkZSwgaSwgdGhpc1F1YWRPdXRzaWRlLCBmaXJzdE9wcG9zaXRlT3V0c2lkZVB0O1xuXG4gICAgZnVuY3Rpb24gdG9wRmlyc3QoYSwgYikgeyByZXR1cm4gYS5weG1pZFsxXSAtIGIucHhtaWRbMV07IH1cbiAgICBmdW5jdGlvbiBib3R0b21GaXJzdChhLCBiKSB7IHJldHVybiBiLnB4bWlkWzFdIC0gYS5weG1pZFsxXTsgfVxuXG4gICAgZnVuY3Rpb24gc2Nvb3RPbmVMYWJlbCh0aGlzUHQsIHByZXZQdCkge1xuICAgICAgICBpZighcHJldlB0KSBwcmV2UHQgPSB7fTtcblxuICAgICAgICB2YXIgcHJldk91dGVyWSA9IHByZXZQdC5sYWJlbEV4dHJhWSArICh5SGFsZiA/IHByZXZQdC55TGFiZWxNYXggOiBwcmV2UHQueUxhYmVsTWluKTtcbiAgICAgICAgdmFyIHRoaXNJbm5lclkgPSB5SGFsZiA/IHRoaXNQdC55TGFiZWxNaW4gOiB0aGlzUHQueUxhYmVsTWF4O1xuICAgICAgICB2YXIgdGhpc091dGVyWSA9IHlIYWxmID8gdGhpc1B0LnlMYWJlbE1heCA6IHRoaXNQdC55TGFiZWxNaW47XG4gICAgICAgIHZhciB0aGlzU2xpY2VPdXRlclkgPSB0aGlzUHQuY3lGaW5hbCArIGZhcnRoZXN0WSh0aGlzUHQucHgwWzFdLCB0aGlzUHQucHgxWzFdKTtcbiAgICAgICAgdmFyIG5ld0V4dHJhWSA9IHByZXZPdXRlclkgLSB0aGlzSW5uZXJZO1xuXG4gICAgICAgIHZhciB4QnVmZmVyLCBpLCBvdGhlclB0LCBvdGhlck91dGVyWSwgb3RoZXJPdXRlclgsIG5ld0V4dHJhWDtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhpcyBsYWJlbCBkb2Vzbid0IG92ZXJsYXAgb3RoZXIgbGFiZWxzXG4gICAgICAgIC8vIHRoaXMgKm9ubHkqIGhhcyB1cyBtb3ZlIHRoZXNlIGxhYmVscyB2ZXJ0aWNhbGx5XG4gICAgICAgIGlmKG5ld0V4dHJhWSAqIHlEaWZmU2lnbiA+IDApIHRoaXNQdC5sYWJlbEV4dHJhWSA9IG5ld0V4dHJhWTtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhpcyBsYWJlbCBkb2Vzbid0IG92ZXJsYXAgYW55IHNsaWNlc1xuICAgICAgICBpZighQXJyYXkuaXNBcnJheSh0cmFjZS5wdWxsKSkgcmV0dXJuOyAvLyB0aGlzIGNhbiBvbmx5IGhhcHBlbiB3aXRoIGFycmF5IHB1bGxzXG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgd2hvbGVTaWRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvdGhlclB0ID0gd2hvbGVTaWRlW2ldO1xuXG4gICAgICAgICAgICAvLyBvdmVybGFwIGNhbiBvbmx5IGhhcHBlbiBpZiB0aGUgb3RoZXIgcG9pbnQgaXMgcHVsbGVkIG1vcmUgdGhhbiB0aGlzIG9uZVxuICAgICAgICAgICAgaWYob3RoZXJQdCA9PT0gdGhpc1B0IHx8IChcbiAgICAgICAgICAgICAgICAoaGVscGVycy5jYXN0T3B0aW9uKHRyYWNlLnB1bGwsIHRoaXNQdC5wdHMpIHx8IDApID49XG4gICAgICAgICAgICAgICAgKGhlbHBlcnMuY2FzdE9wdGlvbih0cmFjZS5wdWxsLCBvdGhlclB0LnB0cykgfHwgMCkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoKHRoaXNQdC5weG1pZFsxXSAtIG90aGVyUHQucHhtaWRbMV0pICogeURpZmZTaWduID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNsb3NlciB0byB0aGUgZXF1YXRvciAtIGJ5IGNvbnN0cnVjdGlvbiBhbGwgb2YgdGhlc2UgaGFwcGVuIGZpcnN0XG4gICAgICAgICAgICAgICAgLy8gbW92ZSB0aGUgdGV4dCB2ZXJ0aWNhbGx5IHRvIGdldCBhd2F5IGZyb20gdGhlc2Ugc2xpY2VzXG4gICAgICAgICAgICAgICAgb3RoZXJPdXRlclkgPSBvdGhlclB0LmN5RmluYWwgKyBmYXJ0aGVzdFkob3RoZXJQdC5weDBbMV0sIG90aGVyUHQucHgxWzFdKTtcbiAgICAgICAgICAgICAgICBuZXdFeHRyYVkgPSBvdGhlck91dGVyWSAtIHRoaXNJbm5lclkgLSB0aGlzUHQubGFiZWxFeHRyYVk7XG5cbiAgICAgICAgICAgICAgICBpZihuZXdFeHRyYVkgKiB5RGlmZlNpZ24gPiAwKSB0aGlzUHQubGFiZWxFeHRyYVkgKz0gbmV3RXh0cmFZO1xuICAgICAgICAgICAgfSBlbHNlIGlmKCh0aGlzT3V0ZXJZICsgdGhpc1B0LmxhYmVsRXh0cmFZIC0gdGhpc1NsaWNlT3V0ZXJZKSAqIHlEaWZmU2lnbiA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBmYXJ0aGVyIGZyb20gdGhlIGVxdWF0b3IgLSBoYXBwZW5zIGFmdGVyIHdlJ3ZlIGRvbmUgYWxsIHRoZVxuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2FsIG1vdmluZyB3ZSdyZSBnb2luZyB0byBkb1xuICAgICAgICAgICAgICAgIC8vIG1vdmUgaG9yaXpvbnRhbGx5IHRvIGdldCBhd2F5IGZyb20gdGhlc2UgbW9yZSBwb2xhciBzbGljZXNcblxuICAgICAgICAgICAgICAgIC8vIGlmIHdlJ3JlIG1vdmluZyBob3J6LiBiYXNlZCBvbiBhIHNsaWNlIHRoYXQncyBzZXZlcmFsIHNsaWNlcyBhd2F5IGZyb20gdGhpcyBvbmVcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHdlIG5lZWQgc29tZSBleHRyYSBzcGFjZSBmb3IgdGhlIGxpbmVzIHRvIGxhYmVscyBiZXR3ZWVuIHRoZW1cbiAgICAgICAgICAgICAgICB4QnVmZmVyID0gMyAqIHhEaWZmU2lnbiAqIE1hdGguYWJzKGkgLSB3aG9sZVNpZGUuaW5kZXhPZih0aGlzUHQpKTtcblxuICAgICAgICAgICAgICAgIG90aGVyT3V0ZXJYID0gb3RoZXJQdC5jeEZpbmFsICsgZmFydGhlc3RYKG90aGVyUHQucHgwWzBdLCBvdGhlclB0LnB4MVswXSk7XG4gICAgICAgICAgICAgICAgbmV3RXh0cmFYID0gb3RoZXJPdXRlclggKyB4QnVmZmVyIC0gKHRoaXNQdC5jeEZpbmFsICsgdGhpc1B0LnB4bWlkWzBdKSAtIHRoaXNQdC5sYWJlbEV4dHJhWDtcblxuICAgICAgICAgICAgICAgIGlmKG5ld0V4dHJhWCAqIHhEaWZmU2lnbiA+IDApIHRoaXNQdC5sYWJlbEV4dHJhWCArPSBuZXdFeHRyYVg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IoeUhhbGYgPSAwOyB5SGFsZiA8IDI7IHlIYWxmKyspIHtcbiAgICAgICAgZXF1YXRvckZpcnN0ID0geUhhbGYgPyB0b3BGaXJzdCA6IGJvdHRvbUZpcnN0O1xuICAgICAgICBmYXJ0aGVzdFkgPSB5SGFsZiA/IE1hdGgubWF4IDogTWF0aC5taW47XG4gICAgICAgIHlEaWZmU2lnbiA9IHlIYWxmID8gMSA6IC0xO1xuXG4gICAgICAgIGZvcih4SGFsZiA9IDA7IHhIYWxmIDwgMjsgeEhhbGYrKykge1xuICAgICAgICAgICAgZmFydGhlc3RYID0geEhhbGYgPyBNYXRoLm1heCA6IE1hdGgubWluO1xuICAgICAgICAgICAgeERpZmZTaWduID0geEhhbGYgPyAxIDogLTE7XG5cbiAgICAgICAgICAgIC8vIGZpcnN0IHNvcnQgdGhlIGFycmF5XG4gICAgICAgICAgICAvLyBub3RlIHRoaXMgaXMgYSBjb3B5IG9mIGNkLCBzbyBjZCBpdHNlbGYgZG9lc24ndCBnZXQgc29ydGVkXG4gICAgICAgICAgICAvLyBidXQgd2UgY2FuIHN0aWxsIG1vZGlmeSBwb2ludHMgaW4gcGxhY2UuXG4gICAgICAgICAgICB0aGlzUXVhZCA9IHF1YWRyYW50c1t5SGFsZl1beEhhbGZdO1xuICAgICAgICAgICAgdGhpc1F1YWQuc29ydChlcXVhdG9yRmlyc3QpO1xuXG4gICAgICAgICAgICBvcHBvc2l0ZVF1YWQgPSBxdWFkcmFudHNbMSAtIHlIYWxmXVt4SGFsZl07XG4gICAgICAgICAgICB3aG9sZVNpZGUgPSBvcHBvc2l0ZVF1YWQuY29uY2F0KHRoaXNRdWFkKTtcblxuICAgICAgICAgICAgdGhpc1F1YWRPdXRzaWRlID0gW107XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0aGlzUXVhZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXNRdWFkW2ldLnlMYWJlbE1pZCAhPT0gdW5kZWZpbmVkKSB0aGlzUXVhZE91dHNpZGUucHVzaCh0aGlzUXVhZFtpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcnN0T3Bwb3NpdGVPdXRzaWRlUHQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgeUhhbGYgJiYgaSA8IG9wcG9zaXRlUXVhZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKG9wcG9zaXRlUXVhZFtpXS55TGFiZWxNaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE9wcG9zaXRlT3V0c2lkZVB0ID0gb3Bwb3NpdGVRdWFkW2ldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGVhY2ggbmVlZHMgdG8gYXZvaWQgdGhlIHByZXZpb3VzXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0aGlzUXVhZE91dHNpZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldlB0ID0gaSAmJiB0aGlzUXVhZE91dHNpZGVbaSAtIDFdO1xuICAgICAgICAgICAgICAgIC8vIGJvdHRvbSBoYWxmIG5lZWRzIHRvIGF2b2lkIHRoZSBmaXJzdCBsYWJlbCBvZiB0aGUgdG9wIGhhbGZcbiAgICAgICAgICAgICAgICAvLyB0b3AgaGFsZiB3ZSBzdGlsbCBuZWVkIHRvIGNhbGwgc2Nvb3RPbmVMYWJlbCBvbiB0aGUgZmlyc3Qgc2xpY2VcbiAgICAgICAgICAgICAgICAvLyBzbyB3ZSBjYW4gYXZvaWQgb3RoZXIgc2xpY2VzLCBidXQgd2UgZG9uJ3QgcGFzcyBhIHByZXZQdFxuICAgICAgICAgICAgICAgIGlmKGZpcnN0T3Bwb3NpdGVPdXRzaWRlUHQgJiYgIWkpIHByZXZQdCA9IGZpcnN0T3Bwb3NpdGVPdXRzaWRlUHQ7XG4gICAgICAgICAgICAgICAgc2Nvb3RPbmVMYWJlbCh0aGlzUXVhZE91dHNpZGVbaV0sIHByZXZQdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxheW91dEFyZWFzKGNkTW9kdWxlLCBwbG90U2l6ZSkge1xuICAgIHZhciBzY2FsZUdyb3VwcyA9IFtdO1xuXG4gICAgLy8gZmlndXJlIG91dCB0aGUgY2VudGVyIGFuZCBtYXhpbXVtIHJhZGl1c1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjZE1vZHVsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2QwID0gY2RNb2R1bGVbaV1bMF07XG4gICAgICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcblxuICAgICAgICB2YXIgZG9tYWluID0gdHJhY2UuZG9tYWluO1xuICAgICAgICB2YXIgd2lkdGggPSBwbG90U2l6ZS53ICogKGRvbWFpbi54WzFdIC0gZG9tYWluLnhbMF0pO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gcGxvdFNpemUuaCAqIChkb21haW4ueVsxXSAtIGRvbWFpbi55WzBdKTtcbiAgICAgICAgLy8gbGVhdmUgc29tZSBzcGFjZSBmb3IgdGhlIHRpdGxlLCBpZiBpdCB3aWxsIGJlIGRpc3BsYXllZCBvdXRzaWRlXG4gICAgICAgIGlmKHRyYWNlLnRpdGxlLnRleHQgJiYgdHJhY2UudGl0bGUucG9zaXRpb24gIT09ICdtaWRkbGUgY2VudGVyJykge1xuICAgICAgICAgICAgaGVpZ2h0IC09IGdldFRpdGxlU3BhY2UoY2QwLCBwbG90U2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcnggPSB3aWR0aCAvIDI7XG4gICAgICAgIHZhciByeSA9IGhlaWdodCAvIDI7XG4gICAgICAgIGlmKHRyYWNlLnR5cGUgPT09ICdmdW5uZWxhcmVhJyAmJiAhdHJhY2Uuc2NhbGVncm91cCkge1xuICAgICAgICAgICAgcnkgLz0gdHJhY2UuYXNwZWN0cmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICBjZDAuciA9IE1hdGgubWluKHJ4LCByeSkgLyAoMSArIGdldE1heFB1bGwodHJhY2UpKTtcblxuICAgICAgICBjZDAuY3ggPSBwbG90U2l6ZS5sICsgcGxvdFNpemUudyAqICh0cmFjZS5kb21haW4ueFsxXSArIHRyYWNlLmRvbWFpbi54WzBdKSAvIDI7XG4gICAgICAgIGNkMC5jeSA9IHBsb3RTaXplLnQgKyBwbG90U2l6ZS5oICogKDEgLSB0cmFjZS5kb21haW4ueVswXSkgLSBoZWlnaHQgLyAyO1xuICAgICAgICBpZih0cmFjZS50aXRsZS50ZXh0ICYmIHRyYWNlLnRpdGxlLnBvc2l0aW9uLmluZGV4T2YoJ2JvdHRvbScpICE9PSAtMSkge1xuICAgICAgICAgICAgY2QwLmN5IC09IGdldFRpdGxlU3BhY2UoY2QwLCBwbG90U2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cmFjZS5zY2FsZWdyb3VwICYmIHNjYWxlR3JvdXBzLmluZGV4T2YodHJhY2Uuc2NhbGVncm91cCkgPT09IC0xKSB7XG4gICAgICAgICAgICBzY2FsZUdyb3Vwcy5wdXNoKHRyYWNlLnNjYWxlZ3JvdXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ3JvdXBTY2FsZShjZE1vZHVsZSwgc2NhbGVHcm91cHMpO1xufVxuXG5mdW5jdGlvbiBncm91cFNjYWxlKGNkTW9kdWxlLCBzY2FsZUdyb3Vwcykge1xuICAgIHZhciBjZDAsIGksIHRyYWNlO1xuXG4gICAgLy8gc2NhbGUgdGhvc2UgdGhhdCBhcmUgZ3JvdXBlZFxuICAgIGZvcih2YXIgayA9IDA7IGsgPCBzY2FsZUdyb3Vwcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgbWluID0gSW5maW5pdHk7XG4gICAgICAgIHZhciBnID0gc2NhbGVHcm91cHNba107XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2RNb2R1bGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNkMCA9IGNkTW9kdWxlW2ldWzBdO1xuICAgICAgICAgICAgdHJhY2UgPSBjZDAudHJhY2U7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlLnNjYWxlZ3JvdXAgPT09IGcpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJlYTtcbiAgICAgICAgICAgICAgICBpZih0cmFjZS50eXBlID09PSAncGllJykge1xuICAgICAgICAgICAgICAgICAgICBhcmVhID0gY2QwLnIgKiBjZDAucjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodHJhY2UudHlwZSA9PT0gJ2Z1bm5lbGFyZWEnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByeCwgcnk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodHJhY2UuYXNwZWN0cmF0aW8gPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByeCA9IGNkMC5yO1xuICAgICAgICAgICAgICAgICAgICAgICAgcnkgPSByeCAvIHRyYWNlLmFzcGVjdHJhdGlvO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnkgPSBjZDAucjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ4ID0gcnkgKiB0cmFjZS5hc3BlY3RyYXRpbztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJ4ICo9ICgxICsgdHJhY2UuYmFzZXJhdGlvKSAvIDI7XG5cbiAgICAgICAgICAgICAgICAgICAgYXJlYSA9IHJ4ICogcnk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWluID0gTWF0aC5taW4obWluLCBhcmVhIC8gY2QwLnZUb3RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjZE1vZHVsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2QwID0gY2RNb2R1bGVbaV1bMF07XG4gICAgICAgICAgICB0cmFjZSA9IGNkMC50cmFjZTtcbiAgICAgICAgICAgIGlmKHRyYWNlLnNjYWxlZ3JvdXAgPT09IGcpIHtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IG1pbiAqIGNkMC52VG90YWw7XG4gICAgICAgICAgICAgICAgaWYodHJhY2UudHlwZSA9PT0gJ2Z1bm5lbGFyZWEnKSB7XG4gICAgICAgICAgICAgICAgICAgIHYgLz0gKDEgKyB0cmFjZS5iYXNlcmF0aW8pIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgdiAvPSB0cmFjZS5hc3BlY3RyYXRpbztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjZDAuciA9IE1hdGguc3FydCh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0Q29vcmRzKGNkKSB7XG4gICAgdmFyIGNkMCA9IGNkWzBdO1xuICAgIHZhciByID0gY2QwLnI7XG4gICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuICAgIHZhciBjdXJyZW50QW5nbGUgPSB0cmFjZS5yb3RhdGlvbiAqIE1hdGguUEkgLyAxODA7XG4gICAgdmFyIGFuZ2xlRmFjdG9yID0gMiAqIE1hdGguUEkgLyBjZDAudlRvdGFsO1xuICAgIHZhciBmaXJzdFB0ID0gJ3B4MCc7XG4gICAgdmFyIGxhc3RQdCA9ICdweDEnO1xuXG4gICAgdmFyIGksIGNkaSwgY3VycmVudENvb3JkcztcblxuICAgIGlmKHRyYWNlLmRpcmVjdGlvbiA9PT0gJ2NvdW50ZXJjbG9ja3dpc2UnKSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZighY2RbaV0uaGlkZGVuKSBicmVhazsgLy8gZmluZCB0aGUgZmlyc3Qgbm9uLWhpZGRlbiBzbGljZVxuICAgICAgICB9XG4gICAgICAgIGlmKGkgPT09IGNkLmxlbmd0aCkgcmV0dXJuOyAvLyBhbGwgc2xpY2VzIGhpZGRlblxuXG4gICAgICAgIGN1cnJlbnRBbmdsZSArPSBhbmdsZUZhY3RvciAqIGNkW2ldLnY7XG4gICAgICAgIGFuZ2xlRmFjdG9yICo9IC0xO1xuICAgICAgICBmaXJzdFB0ID0gJ3B4MSc7XG4gICAgICAgIGxhc3RQdCA9ICdweDAnO1xuICAgIH1cblxuICAgIGN1cnJlbnRDb29yZHMgPSBnZXRDb29yZHMociwgY3VycmVudEFuZ2xlKTtcblxuICAgIGZvcihpID0gMDsgaSA8IGNkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNkaSA9IGNkW2ldO1xuICAgICAgICBpZihjZGkuaGlkZGVuKSBjb250aW51ZTtcblxuICAgICAgICBjZGlbZmlyc3RQdF0gPSBjdXJyZW50Q29vcmRzO1xuXG4gICAgICAgIGNkaS5zdGFydGFuZ2xlID0gY3VycmVudEFuZ2xlO1xuICAgICAgICBjdXJyZW50QW5nbGUgKz0gYW5nbGVGYWN0b3IgKiBjZGkudiAvIDI7XG4gICAgICAgIGNkaS5weG1pZCA9IGdldENvb3JkcyhyLCBjdXJyZW50QW5nbGUpO1xuICAgICAgICBjZGkubWlkYW5nbGUgPSBjdXJyZW50QW5nbGU7XG4gICAgICAgIGN1cnJlbnRBbmdsZSArPSBhbmdsZUZhY3RvciAqIGNkaS52IC8gMjtcbiAgICAgICAgY3VycmVudENvb3JkcyA9IGdldENvb3JkcyhyLCBjdXJyZW50QW5nbGUpO1xuICAgICAgICBjZGkuc3RvcGFuZ2xlID0gY3VycmVudEFuZ2xlO1xuXG4gICAgICAgIGNkaVtsYXN0UHRdID0gY3VycmVudENvb3JkcztcblxuICAgICAgICBjZGkubGFyZ2VBcmMgPSAoY2RpLnYgPiBjZDAudlRvdGFsIC8gMikgPyAxIDogMDtcblxuICAgICAgICBjZGkuaGFsZmFuZ2xlID0gTWF0aC5QSSAqIE1hdGgubWluKGNkaS52IC8gY2QwLnZUb3RhbCwgMC41KTtcbiAgICAgICAgY2RpLnJpbmcgPSAxIC0gdHJhY2UuaG9sZTtcbiAgICAgICAgY2RpLnJJbnNjcmliZWQgPSBnZXRJbnNjcmliZWRSYWRpdXNGcmFjdGlvbihjZGksIGNkMCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb29yZHMociwgYW5nbGUpIHtcbiAgICByZXR1cm4gW3IgKiBNYXRoLnNpbihhbmdsZSksIC1yICogTWF0aC5jb3MoYW5nbGUpXTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0U2xpY2VMYWJlbChnZCwgcHQsIGNkMCkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuICAgIC8vIGxvb2sgZm9yIHRleHRlbXBsYXRlXG4gICAgdmFyIHRleHR0ZW1wbGF0ZSA9IHRyYWNlLnRleHR0ZW1wbGF0ZTtcblxuICAgIC8vIG5vdyBpbnNlcnQgdGV4dFxuICAgIHZhciB0ZXh0aW5mbyA9IHRyYWNlLnRleHRpbmZvO1xuICAgIGlmKCF0ZXh0dGVtcGxhdGUgJiYgdGV4dGluZm8gJiYgdGV4dGluZm8gIT09ICdub25lJykge1xuICAgICAgICB2YXIgcGFydHMgPSB0ZXh0aW5mby5zcGxpdCgnKycpO1xuICAgICAgICB2YXIgaGFzRmxhZyA9IGZ1bmN0aW9uKGZsYWcpIHsgcmV0dXJuIHBhcnRzLmluZGV4T2YoZmxhZykgIT09IC0xOyB9O1xuICAgICAgICB2YXIgaGFzTGFiZWwgPSBoYXNGbGFnKCdsYWJlbCcpO1xuICAgICAgICB2YXIgaGFzVGV4dCA9IGhhc0ZsYWcoJ3RleHQnKTtcbiAgICAgICAgdmFyIGhhc1ZhbHVlID0gaGFzRmxhZygndmFsdWUnKTtcbiAgICAgICAgdmFyIGhhc1BlcmNlbnQgPSBoYXNGbGFnKCdwZXJjZW50Jyk7XG5cbiAgICAgICAgdmFyIHNlcGFyYXRvcnMgPSBmdWxsTGF5b3V0LnNlcGFyYXRvcnM7XG4gICAgICAgIHZhciB0ZXh0O1xuXG4gICAgICAgIHRleHQgPSBoYXNMYWJlbCA/IFtwdC5sYWJlbF0gOiBbXTtcbiAgICAgICAgaWYoaGFzVGV4dCkge1xuICAgICAgICAgICAgdmFyIHR4ID0gaGVscGVycy5nZXRGaXJzdEZpbGxlZCh0cmFjZS50ZXh0LCBwdC5wdHMpO1xuICAgICAgICAgICAgaWYoaXNWYWxpZFRleHRWYWx1ZSh0eCkpIHRleHQucHVzaCh0eCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaGFzVmFsdWUpIHRleHQucHVzaChoZWxwZXJzLmZvcm1hdFBpZVZhbHVlKHB0LnYsIHNlcGFyYXRvcnMpKTtcbiAgICAgICAgaWYoaGFzUGVyY2VudCkgdGV4dC5wdXNoKGhlbHBlcnMuZm9ybWF0UGllUGVyY2VudChwdC52IC8gY2QwLnZUb3RhbCwgc2VwYXJhdG9ycykpO1xuICAgICAgICBwdC50ZXh0ID0gdGV4dC5qb2luKCc8YnI+Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZVRlbXBsYXRlVmFyaWFibGVzKHB0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsYWJlbDogcHQubGFiZWwsXG4gICAgICAgICAgICB2YWx1ZTogcHQudixcbiAgICAgICAgICAgIHZhbHVlTGFiZWw6IGhlbHBlcnMuZm9ybWF0UGllVmFsdWUocHQudiwgZnVsbExheW91dC5zZXBhcmF0b3JzKSxcbiAgICAgICAgICAgIHBlcmNlbnQ6IHB0LnYgLyBjZDAudlRvdGFsLFxuICAgICAgICAgICAgcGVyY2VudExhYmVsOiBoZWxwZXJzLmZvcm1hdFBpZVBlcmNlbnQocHQudiAvIGNkMC52VG90YWwsIGZ1bGxMYXlvdXQuc2VwYXJhdG9ycyksXG4gICAgICAgICAgICBjb2xvcjogcHQuY29sb3IsXG4gICAgICAgICAgICB0ZXh0OiBwdC50ZXh0LFxuICAgICAgICAgICAgY3VzdG9tZGF0YTogTGliLmNhc3RPcHRpb24odHJhY2UsIHB0LmksICdjdXN0b21kYXRhJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZih0ZXh0dGVtcGxhdGUpIHtcbiAgICAgICAgdmFyIHR4dCA9IExpYi5jYXN0T3B0aW9uKHRyYWNlLCBwdC5pLCAndGV4dHRlbXBsYXRlJyk7XG4gICAgICAgIGlmKCF0eHQpIHtcbiAgICAgICAgICAgIHB0LnRleHQgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBtYWtlVGVtcGxhdGVWYXJpYWJsZXMocHQpO1xuICAgICAgICAgICAgdmFyIHB0VHggPSBoZWxwZXJzLmdldEZpcnN0RmlsbGVkKHRyYWNlLnRleHQsIHB0LnB0cyk7XG4gICAgICAgICAgICBpZihpc1ZhbGlkVGV4dFZhbHVlKHB0VHgpIHx8IHB0VHggPT09ICcnKSBvYmoudGV4dCA9IHB0VHg7XG4gICAgICAgICAgICBwdC50ZXh0ID0gTGliLnRleHR0ZW1wbGF0ZVN0cmluZyh0eHQsIG9iaiwgZ2QuX2Z1bGxMYXlvdXQuX2QzbG9jYWxlLCBvYmosIHRyYWNlLl9tZXRhIHx8IHt9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY29tcHV0ZVRyYW5zZm9ybShcbiAgICB0cmFuc2Zvcm0sICAvLyBpbm91dFxuICAgIHRleHRCQiAgICAgIC8vIGluXG4pIHtcbiAgICB2YXIgYSA9IHRyYW5zZm9ybS5yb3RhdGUgKiBNYXRoLlBJIC8gMTgwO1xuICAgIHZhciBjb3NBID0gTWF0aC5jb3MoYSk7XG4gICAgdmFyIHNpbkEgPSBNYXRoLnNpbihhKTtcbiAgICB2YXIgbWlkWCA9ICh0ZXh0QkIubGVmdCArIHRleHRCQi5yaWdodCkgLyAyO1xuICAgIHZhciBtaWRZID0gKHRleHRCQi50b3AgKyB0ZXh0QkIuYm90dG9tKSAvIDI7XG4gICAgdHJhbnNmb3JtLnRleHRYID0gbWlkWCAqIGNvc0EgLSBtaWRZICogc2luQTtcbiAgICB0cmFuc2Zvcm0udGV4dFkgPSBtaWRYICogc2luQSArIG1pZFkgKiBjb3NBO1xuICAgIHRyYW5zZm9ybS5ub0NlbnRlciA9IHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBsb3Q6IHBsb3QsXG4gICAgZm9ybWF0U2xpY2VMYWJlbDogZm9ybWF0U2xpY2VMYWJlbCxcbiAgICB0cmFuc2Zvcm1JbnNpZGVUZXh0OiB0cmFuc2Zvcm1JbnNpZGVUZXh0LFxuICAgIGRldGVybWluZUluc2lkZVRleHRGb250OiBkZXRlcm1pbmVJbnNpZGVUZXh0Rm9udCxcbiAgICBwb3NpdGlvblRpdGxlT3V0c2lkZTogcG9zaXRpb25UaXRsZU91dHNpZGUsXG4gICAgcHJlcmVuZGVyVGl0bGVzOiBwcmVyZW5kZXJUaXRsZXMsXG4gICAgbGF5b3V0QXJlYXM6IGxheW91dEFyZWFzLFxuICAgIGF0dGFjaEZ4SGFuZGxlcnM6IGF0dGFjaEZ4SGFuZGxlcnMsXG4gICAgY29tcHV0ZVRyYW5zZm9ybTogY29tcHV0ZVRyYW5zZm9ybVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=