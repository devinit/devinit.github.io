(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_box_attributes_js-node_modules_plotly_js_src_traces-963efa"],{

/***/ "./node_modules/plotly.js/src/traces/box/attributes.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/attributes.js ***!
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



var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var barAttrs = __webpack_require__(/*! ../bar/attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js");
var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var scatterMarkerAttrs = scatterAttrs.marker;
var scatterMarkerLineAttrs = scatterMarkerAttrs.line;

module.exports = {
    y: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the y sample data or coordinates.',
            'See overview for more info.'
        ].join(' ')
    },
    x: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the x sample data or coordinates.',
            'See overview for more info.'
        ].join(' ')
    },
    x0: {
        valType: 'any',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the x coordinate for single-box traces',
            'or the starting coordinate for multi-box traces',
            'set using q1/median/q3.',
            'See overview for more info.'
        ].join(' ')
    },
    y0: {
        valType: 'any',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the y coordinate for single-box traces',
            'or the starting coordinate for multi-box traces',
            'set using q1/median/q3.',
            'See overview for more info.'
        ].join(' ')
    },

    dx: {
        valType: 'number',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the x coordinate step for multi-box traces',
            'set using q1/median/q3.'
        ].join(' ')
    },
    dy: {
        valType: 'number',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the y coordinate step for multi-box traces',
            'set using q1/median/q3.'
        ].join(' ')
    },

    name: {
        valType: 'string',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the trace name.',
            'The trace name appear as the legend item and on hover.',
            'For box traces, the name will also be used for the position',
            'coordinate, if `x` and `x0` (`y` and `y0` if horizontal) are',
            'missing and the position axis is categorical'
        ].join(' ')
    },

    q1: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the Quartile 1 values.',
            'There should be as many items as the number of boxes desired.',
        ].join(' ')
    },
    median: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the median values.',
            'There should be as many items as the number of boxes desired.',
        ].join(' ')
    },
    q3: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the Quartile 3 values.',
            'There should be as many items as the number of boxes desired.',
        ].join(' ')
    },
    lowerfence: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the lower fence values.',
            'There should be as many items as the number of boxes desired.',
            'This attribute has effect only under the q1/median/q3 signature.',
            'If `lowerfence` is not provided but a sample (in `y` or `x`) is set,',
            'we compute the lower as the last sample point below 1.5 times the IQR.'
        ].join(' ')
    },
    upperfence: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the upper fence values.',
            'There should be as many items as the number of boxes desired.',
            'This attribute has effect only under the q1/median/q3 signature.',
            'If `upperfence` is not provided but a sample (in `y` or `x`) is set,',
            'we compute the lower as the last sample point above 1.5 times the IQR.'
        ].join(' ')
    },

    notched: {
        valType: 'boolean',
        role: 'info',
        editType: 'calc',
        description: [
            'Determines whether or not notches are drawn.',
            'Notches displays a confidence interval around the median.',
            'We compute the confidence interval as median +/- 1.57 * IQR / sqrt(N),',
            'where IQR is the interquartile range and N is the sample size.',
            'If two boxes\' notches do not overlap there is 95% confidence their medians differ.',
            'See https://sites.google.com/site/davidsstatistics/home/notched-box-plots for more info.',
            'Defaults to *false* unless `notchwidth` or `notchspan` is set.'
        ].join(' ')
    },
    notchwidth: {
        valType: 'number',
        min: 0,
        max: 0.5,
        dflt: 0.25,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the width of the notches relative to',
            'the box\' width.',
            'For example, with 0, the notches are as wide as the box(es).'
        ].join(' ')
    },
    notchspan: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the notch span from the boxes\' `median` values.',
            'There should be as many items as the number of boxes desired.',
            'This attribute has effect only under the q1/median/q3 signature.',
            'If `notchspan` is not provided but a sample (in `y` or `x`) is set,',
            'we compute it as 1.57 * IQR / sqrt(N),',
            'where N is the sample size.'
        ].join(' ')
    },

    // TODO
    // maybe add
    // - loweroutlierbound / upperoutlierbound
    // - lowersuspectedoutlierbound / uppersuspectedoutlierbound

    boxpoints: {
        valType: 'enumerated',
        values: ['all', 'outliers', 'suspectedoutliers', false],
        role: 'style',
        editType: 'calc',
        description: [
            'If *outliers*, only the sample points lying outside the whiskers',
            'are shown',
            'If *suspectedoutliers*, the outlier points are shown and',
            'points either less than 4*Q1-3*Q3 or greater than 4*Q3-3*Q1',
            'are highlighted (see `outliercolor`)',
            'If *all*, all sample points are shown',
            'If *false*, only the box(es) are shown with no sample points',
            'Defaults to *suspectedoutliers* when `marker.outliercolor` or',
            '`marker.line.outliercolor` is set.',
            'Defaults to *all* under the q1/median/q3 signature.',
            'Otherwise defaults to *outliers*.',
        ].join(' ')
    },
    jitter: {
        valType: 'number',
        min: 0,
        max: 1,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the amount of jitter in the sample points drawn.',
            'If *0*, the sample points align along the distribution axis.',
            'If *1*, the sample points are drawn in a random jitter of width',
            'equal to the width of the box(es).'
        ].join(' ')
    },
    pointpos: {
        valType: 'number',
        min: -2,
        max: 2,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the position of the sample points in relation to the box(es).',
            'If *0*, the sample points are places over the center of the box(es).',
            'Positive (negative) values correspond to positions to the',
            'right (left) for vertical boxes and above (below) for horizontal boxes'
        ].join(' ')
    },

    boxmean: {
        valType: 'enumerated',
        values: [true, 'sd', false],
        role: 'style',
        editType: 'calc',
        description: [
            'If *true*, the mean of the box(es)\' underlying distribution is',
            'drawn as a dashed line inside the box(es).',
            'If *sd* the standard deviation is also drawn.',
            'Defaults to *true* when `mean` is set.',
            'Defaults to *sd* when `sd` is set',
            'Otherwise defaults to *false*.'
        ].join(' ')
    },
    mean: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the mean values.',
            'There should be as many items as the number of boxes desired.',
            'This attribute has effect only under the q1/median/q3 signature.',
            'If `mean` is not provided but a sample (in `y` or `x`) is set,',
            'we compute the mean for each box using the sample values.'
        ].join(' ')
    },
    sd: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the standard deviation values.',
            'There should be as many items as the number of boxes desired.',
            'This attribute has effect only under the q1/median/q3 signature.',
            'If `sd` is not provided but a sample (in `y` or `x`) is set,',
            'we compute the standard deviation for each box using the sample values.'
        ].join(' ')
    },

    orientation: {
        valType: 'enumerated',
        values: ['v', 'h'],
        role: 'style',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the orientation of the box(es).',
            'If *v* (*h*), the distribution is visualized along',
            'the vertical (horizontal).'
        ].join(' ')
    },

    quartilemethod: {
        valType: 'enumerated',
        values: ['linear', 'exclusive', 'inclusive'],
        dflt: 'linear',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the method used to compute the sample\'s Q1 and Q3 quartiles.',

            'The *linear* method uses the 25th percentile for Q1 and 75th percentile for Q3',
            'as computed using method #10 (listed on http://www.amstat.org/publications/jse/v14n3/langford.html).',

            'The *exclusive* method uses the median to divide the ordered dataset into two halves',
            'if the sample is odd, it does not include the median in either half -',
            'Q1 is then the median of the lower half and',
            'Q3 the median of the upper half.',

            'The *inclusive* method also uses the median to divide the ordered dataset into two halves',
            'but if the sample is odd, it includes the median in both halves -',
            'Q1 is then the median of the lower half and',
            'Q3 the median of the upper half.'
        ].join(' ')
    },

    width: {
        valType: 'number',
        min: 0,
        role: 'info',
        dflt: 0,
        editType: 'calc',
        description: [
            'Sets the width of the box in data coordinate',
            'If *0* (default value) the width is automatically selected based on the positions',
            'of other box traces in the same subplot.'
        ].join(' ')
    },

    marker: {
        outliercolor: {
            valType: 'color',
            dflt: 'rgba(0, 0, 0, 0)',
            role: 'style',
            editType: 'style',
            description: 'Sets the color of the outlier sample points.'
        },
        symbol: extendFlat({}, scatterMarkerAttrs.symbol,
            {arrayOk: false, editType: 'plot'}),
        opacity: extendFlat({}, scatterMarkerAttrs.opacity,
            {arrayOk: false, dflt: 1, editType: 'style'}),
        size: extendFlat({}, scatterMarkerAttrs.size,
            {arrayOk: false, editType: 'calc'}),
        color: extendFlat({}, scatterMarkerAttrs.color,
            {arrayOk: false, editType: 'style'}),
        line: {
            color: extendFlat({}, scatterMarkerLineAttrs.color,
                {arrayOk: false, dflt: colorAttrs.defaultLine, editType: 'style'}
            ),
            width: extendFlat({}, scatterMarkerLineAttrs.width,
                {arrayOk: false, dflt: 0, editType: 'style'}
            ),
            outliercolor: {
                valType: 'color',
                role: 'style',
                editType: 'style',
                description: [
                    'Sets the border line color of the outlier sample points.',
                    'Defaults to marker.color'
                ].join(' ')
            },
            outlierwidth: {
                valType: 'number',
                min: 0,
                dflt: 1,
                role: 'style',
                editType: 'style',
                description: [
                    'Sets the border line width (in px) of the outlier sample points.'
                ].join(' ')
            },
            editType: 'style'
        },
        editType: 'plot'
    },

    line: {
        color: {
            valType: 'color',
            role: 'style',
            editType: 'style',
            description: 'Sets the color of line bounding the box(es).'
        },
        width: {
            valType: 'number',
            role: 'style',
            min: 0,
            dflt: 2,
            editType: 'style',
            description: 'Sets the width (in px) of line bounding the box(es).'
        },
        editType: 'plot'
    },

    fillcolor: scatterAttrs.fillcolor,

    whiskerwidth: {
        valType: 'number',
        min: 0,
        max: 1,
        dflt: 0.5,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the width of the whiskers relative to',
            'the box\' width.',
            'For example, with 1, the whiskers are as wide as the box(es).'
        ].join(' ')
    },

    offsetgroup: barAttrs.offsetgroup,
    alignmentgroup: barAttrs.alignmentgroup,

    selected: {
        marker: scatterAttrs.selected.marker,
        editType: 'style'
    },
    unselected: {
        marker: scatterAttrs.unselected.marker,
        editType: 'style'
    },

    text: extendFlat({}, scatterAttrs.text, {
        description: [
            'Sets the text elements associated with each sample value.',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (x,y) coordinates.',
            'To be seen, trace `hoverinfo` must contain a *text* flag.'
        ].join(' ')
    }),
    hovertext: extendFlat({}, scatterAttrs.hovertext, {
        description: 'Same as `text`.'
    }),
    hovertemplate: hovertemplateAttrs({
        description: [
            'N.B. This only has an effect when hovering on points.'
        ].join(' ')
    }),

    hoveron: {
        valType: 'flaglist',
        flags: ['boxes', 'points'],
        dflt: 'boxes+points',
        role: 'info',
        editType: 'style',
        description: [
            'Do the hover effects highlight individual boxes ',
            'or sample points or both?'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/cross_trace_calc.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/cross_trace_calc.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var getAxisGroup = __webpack_require__(/*! ../../plots/cartesian/axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js").getAxisGroup;

var orientations = ['v', 'h'];

function crossTraceCalc(gd, plotinfo) {
    var calcdata = gd.calcdata;
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    for(var i = 0; i < orientations.length; i++) {
        var orientation = orientations[i];
        var posAxis = orientation === 'h' ? ya : xa;
        var boxList = [];

        // make list of boxes / candlesticks
        // For backward compatibility, candlesticks are treated as if they *are* box traces here
        for(var j = 0; j < calcdata.length; j++) {
            var cd = calcdata[j];
            var t = cd[0].t;
            var trace = cd[0].trace;

            if(trace.visible === true &&
                    (trace.type === 'box' || trace.type === 'candlestick') &&
                    !t.empty &&
                    (trace.orientation || 'v') === orientation &&
                    trace.xaxis === xa._id &&
                    trace.yaxis === ya._id
              ) {
                boxList.push(j);
            }
        }

        setPositionOffset('box', gd, boxList, posAxis);
    }
}

function setPositionOffset(traceType, gd, boxList, posAxis) {
    var calcdata = gd.calcdata;
    var fullLayout = gd._fullLayout;
    var axId = posAxis._id;
    var axLetter = axId.charAt(0);

    var i, j, calcTrace;
    var pointList = [];
    var shownPts = 0;

    // make list of box points
    for(i = 0; i < boxList.length; i++) {
        calcTrace = calcdata[boxList[i]];
        for(j = 0; j < calcTrace.length; j++) {
            pointList.push(posAxis.c2l(calcTrace[j].pos, true));
            shownPts += (calcTrace[j].pts2 || []).length;
        }
    }

    if(!pointList.length) return;

    // box plots - update dPos based on multiple traces
    var boxdv = Lib.distinctVals(pointList);
    var dPos0 = boxdv.minDiff / 2;

    // check for forced minimum dtick
    Axes.minDtick(posAxis, boxdv.minDiff, boxdv.vals[0], true);

    var numKey = traceType === 'violin' ? '_numViolins' : '_numBoxes';
    var numTotal = fullLayout[numKey];
    var group = fullLayout[traceType + 'mode'] === 'group' && numTotal > 1;
    var groupFraction = 1 - fullLayout[traceType + 'gap'];
    var groupGapFraction = 1 - fullLayout[traceType + 'groupgap'];

    for(i = 0; i < boxList.length; i++) {
        calcTrace = calcdata[boxList[i]];

        var trace = calcTrace[0].trace;
        var t = calcTrace[0].t;
        var width = trace.width;
        var side = trace.side;

        // position coordinate delta
        var dPos;
        // box half width;
        var bdPos;
        // box center offset
        var bPos;
        // half-width within which to accept hover for this box/violin
        // always split the distance to the closest box/violin
        var wHover;

        if(width) {
            dPos = bdPos = wHover = width / 2;
            bPos = 0;
        } else {
            dPos = dPos0;

            if(group) {
                var groupId = getAxisGroup(fullLayout, posAxis._id) + trace.orientation;
                var alignmentGroups = fullLayout._alignmentOpts[groupId] || {};
                var alignmentGroupOpts = alignmentGroups[trace.alignmentgroup] || {};
                var nOffsetGroups = Object.keys(alignmentGroupOpts.offsetGroups || {}).length;
                var num = nOffsetGroups || numTotal;
                var shift = nOffsetGroups ? trace._offsetIndex : t.num;

                bdPos = dPos * groupFraction * groupGapFraction / num;
                bPos = 2 * dPos * (-0.5 + (shift + 0.5) / num) * groupFraction;
                wHover = dPos * groupFraction / num;
            } else {
                bdPos = dPos * groupFraction * groupGapFraction;
                bPos = 0;
                wHover = dPos;
            }
        }
        t.dPos = dPos;
        t.bPos = bPos;
        t.bdPos = bdPos;
        t.wHover = wHover;

        // box/violin-only value-space push value
        var pushplus;
        var pushminus;
        // edge of box/violin
        var edge = bPos + bdPos;
        var edgeplus;
        var edgeminus;
        // value-space padding
        var vpadplus;
        var vpadminus;
        // pixel-space padding
        var ppadplus;
        var ppadminus;
        // do we add 5% of both sides (more logic for points beyond box/violin below)
        var padded = Boolean(width);
        // does this trace show points?
        var hasPts = (trace.boxpoints || trace.points) && (shownPts > 0);

        if(side === 'positive') {
            pushplus = dPos * (width ? 1 : 0.5);
            edgeplus = edge;
            pushminus = edgeplus = bPos;
        } else if(side === 'negative') {
            pushplus = edgeplus = bPos;
            pushminus = dPos * (width ? 1 : 0.5);
            edgeminus = edge;
        } else {
            pushplus = pushminus = dPos;
            edgeplus = edgeminus = edge;
        }

        if(hasPts) {
            var pointpos = trace.pointpos;
            var jitter = trace.jitter;
            var ms = trace.marker.size / 2;

            var pp = 0;
            if((pointpos + jitter) >= 0) {
                pp = edge * (pointpos + jitter);
                if(pp > pushplus) {
                    // (++) beyond plus-value, use pp
                    padded = true;
                    ppadplus = ms;
                    vpadplus = pp;
                } else if(pp > edgeplus) {
                    // (+), use push-value (it's bigger), but add px-pad
                    ppadplus = ms;
                    vpadplus = pushplus;
                }
            }
            if(pp <= pushplus) {
                // (->) fallback to push value
                vpadplus = pushplus;
            }

            var pm = 0;
            if((pointpos - jitter) <= 0) {
                pm = -edge * (pointpos - jitter);
                if(pm > pushminus) {
                    // (--) beyond plus-value, use pp
                    padded = true;
                    ppadminus = ms;
                    vpadminus = pm;
                } else if(pm > edgeminus) {
                    // (-), use push-value (it's bigger), but add px-pad
                    ppadminus = ms;
                    vpadminus = pushminus;
                }
            }
            if(pm <= pushminus) {
                // (<-) fallback to push value
                vpadminus = pushminus;
            }
        } else {
            vpadplus = pushplus;
            vpadminus = pushminus;
        }

        var pos = new Array(calcTrace.length);
        for(j = 0; j < calcTrace.length; j++) {
            pos[j] = calcTrace[j].pos;
        }

        trace._extremes[axId] = Axes.findExtremes(posAxis, pos, {
            padded: padded,
            vpadminus: vpadminus,
            vpadplus: vpadplus,
            vpadLinearized: true,
            // N.B. SVG px-space positive/negative
            ppadminus: {x: ppadminus, y: ppadplus}[axLetter],
            ppadplus: {x: ppadplus, y: ppadminus}[axLetter],
        });
    }
}

module.exports = {
    crossTraceCalc: crossTraceCalc,
    setPositionOffset: setPositionOffset
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/layout_attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/layout_attributes.js ***!
  \********************************************************************/
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
    boxmode: {
        valType: 'enumerated',
        values: ['group', 'overlay'],
        dflt: 'overlay',
        role: 'info',
        editType: 'calc',
        description: [
            'Determines how boxes at the same location coordinate',
            'are displayed on the graph.',
            'If *group*, the boxes are plotted next to one another',
            'centered around the shared location.',
            'If *overlay*, the boxes are plotted over one another,',
            'you might need to set *opacity* to see them multiple boxes.',
            'Has no effect on traces that have *width* set.'
        ].join(' ')
    },
    boxgap: {
        valType: 'number',
        min: 0,
        max: 1,
        dflt: 0.3,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the gap (in plot fraction) between boxes of',
            'adjacent location coordinates.',
            'Has no effect on traces that have *width* set.'
        ].join(' ')
    },
    boxgroupgap: {
        valType: 'number',
        min: 0,
        max: 1,
        dflt: 0.3,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the gap (in plot fraction) between boxes of',
            'the same location coordinate.',
            'Has no effect on traces that have *width* set.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/layout_defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/layout_defaults.js ***!
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
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/box/layout_attributes.js");

function _supply(layoutIn, layoutOut, fullData, coerce, traceType) {
    var category = traceType + 'Layout';
    var hasTraceType = false;

    for(var i = 0; i < fullData.length; i++) {
        var trace = fullData[i];

        if(Registry.traceIs(trace, category)) {
            hasTraceType = true;
            break;
        }
    }
    if(!hasTraceType) return;

    coerce(traceType + 'mode');
    coerce(traceType + 'gap');
    coerce(traceType + 'groupgap');
}

function supplyLayoutDefaults(layoutIn, layoutOut, fullData) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }
    _supply(layoutIn, layoutOut, fullData, coerce, 'box');
}

module.exports = {
    supplyLayoutDefaults: supplyLayoutDefaults,
    _supply: _supply
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/plot.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/plot.js ***!
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

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");

// constants for dynamic jitter (ie less jitter for sparser points)
var JITTERCOUNT = 5; // points either side of this to include
var JITTERSPREAD = 0.01; // fraction of IQR to count as "dense"

function plot(gd, plotinfo, cdbox, boxLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    Lib.makeTraceGroups(boxLayer, cdbox, 'trace boxes').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var t = cd0.t;
        var trace = cd0.trace;

        // whisker width
        t.wdPos = t.bdPos * trace.whiskerwidth;

        if(trace.visible !== true || t.empty) {
            plotGroup.remove();
            return;
        }

        var posAxis, valAxis;

        if(trace.orientation === 'h') {
            posAxis = ya;
            valAxis = xa;
        } else {
            posAxis = xa;
            valAxis = ya;
        }

        plotBoxAndWhiskers(plotGroup, {pos: posAxis, val: valAxis}, trace, t);
        plotPoints(plotGroup, {x: xa, y: ya}, trace, t);
        plotBoxMean(plotGroup, {pos: posAxis, val: valAxis}, trace, t);
    });
}

function plotBoxAndWhiskers(sel, axes, trace, t) {
    var isHorizontal = trace.orientation === 'h';
    var valAxis = axes.val;
    var posAxis = axes.pos;
    var posHasRangeBreaks = !!posAxis.rangebreaks;

    var bPos = t.bPos;
    var wdPos = t.wdPos || 0;
    var bPosPxOffset = t.bPosPxOffset || 0;
    var whiskerWidth = trace.whiskerwidth || 0;
    var notched = trace.notched || false;
    var nw = notched ? 1 - 2 * trace.notchwidth : 1;

    // to support for one-sided box
    var bdPos0;
    var bdPos1;
    if(Array.isArray(t.bdPos)) {
        bdPos0 = t.bdPos[0];
        bdPos1 = t.bdPos[1];
    } else {
        bdPos0 = t.bdPos;
        bdPos1 = t.bdPos;
    }

    var paths = sel.selectAll('path.box').data((
        trace.type !== 'violin' ||
        trace.box.visible
    ) ? Lib.identity : []);

    paths.enter().append('path')
        .style('vector-effect', 'non-scaling-stroke')
        .attr('class', 'box');

    paths.exit().remove();

    paths.each(function(d) {
        if(d.empty) return 'M0,0Z';

        var lcenter = posAxis.c2l(d.pos + bPos, true);

        var pos0 = posAxis.l2p(lcenter - bdPos0) + bPosPxOffset;
        var pos1 = posAxis.l2p(lcenter + bdPos1) + bPosPxOffset;
        var posc = posHasRangeBreaks ? (pos0 + pos1) / 2 : posAxis.l2p(lcenter) + bPosPxOffset;

        var r = trace.whiskerwidth;
        var posw0 = posHasRangeBreaks ? pos0 * r + (1 - r) * posc : posAxis.l2p(lcenter - wdPos) + bPosPxOffset;
        var posw1 = posHasRangeBreaks ? pos1 * r + (1 - r) * posc : posAxis.l2p(lcenter + wdPos) + bPosPxOffset;

        var posm0 = posAxis.l2p(lcenter - bdPos0 * nw) + bPosPxOffset;
        var posm1 = posAxis.l2p(lcenter + bdPos1 * nw) + bPosPxOffset;
        var q1 = valAxis.c2p(d.q1, true);
        var q3 = valAxis.c2p(d.q3, true);
        // make sure median isn't identical to either of the
        // quartiles, so we can see it
        var m = Lib.constrain(
            valAxis.c2p(d.med, true),
            Math.min(q1, q3) + 1, Math.max(q1, q3) - 1
        );

        // for compatibility with box, violin, and candlestick
        // perhaps we should put this into cd0.t instead so it's more explicit,
        // but what we have now is:
        // - box always has d.lf, but boxpoints can be anything
        // - violin has d.lf and should always use it (boxpoints is undefined)
        // - candlestick has only min/max
        var useExtremes = (d.lf === undefined) || (trace.boxpoints === false);
        var lf = valAxis.c2p(useExtremes ? d.min : d.lf, true);
        var uf = valAxis.c2p(useExtremes ? d.max : d.uf, true);
        var ln = valAxis.c2p(d.ln, true);
        var un = valAxis.c2p(d.un, true);

        if(isHorizontal) {
            d3.select(this).attr('d',
                'M' + m + ',' + posm0 + 'V' + posm1 + // median line
                'M' + q1 + ',' + pos0 + 'V' + pos1 + // left edge
                (notched ?
                    'H' + ln + 'L' + m + ',' + posm1 + 'L' + un + ',' + pos1 :
                    ''
                ) + // top notched edge
                'H' + q3 + // end of the top edge
                'V' + pos0 + // right edge
                (notched ? 'H' + un + 'L' + m + ',' + posm0 + 'L' + ln + ',' + pos0 : '') + // bottom notched edge
                'Z' + // end of the box
                'M' + q1 + ',' + posc + 'H' + lf + 'M' + q3 + ',' + posc + 'H' + uf + // whiskers
                (whiskerWidth === 0 ?
                    '' : // whisker caps
                    'M' + lf + ',' + posw0 + 'V' + posw1 + 'M' + uf + ',' + posw0 + 'V' + posw1
                )
            );
        } else {
            d3.select(this).attr('d',
                'M' + posm0 + ',' + m + 'H' + posm1 + // median line
                'M' + pos0 + ',' + q1 + 'H' + pos1 + // top of the box
                (notched ?
                    'V' + ln + 'L' + posm1 + ',' + m + 'L' + pos1 + ',' + un :
                    ''
                ) + // notched right edge
                'V' + q3 + // end of the right edge
                'H' + pos0 + // bottom of the box
                (notched ?
                    'V' + un + 'L' + posm0 + ',' + m + 'L' + pos0 + ',' + ln :
                    ''
                ) + // notched left edge
                'Z' + // end of the box
                'M' + posc + ',' + q1 + 'V' + lf + 'M' + posc + ',' + q3 + 'V' + uf + // whiskers
                (whiskerWidth === 0 ?
                    '' : // whisker caps
                    'M' + posw0 + ',' + lf + 'H' + posw1 + 'M' + posw0 + ',' + uf + 'H' + posw1
                )
            );
        }
    });
}

function plotPoints(sel, axes, trace, t) {
    var xa = axes.x;
    var ya = axes.y;
    var bdPos = t.bdPos;
    var bPos = t.bPos;

    // to support violin points
    var mode = trace.boxpoints || trace.points;

    // repeatable pseudo-random number generator
    Lib.seedPseudoRandom();

    // since box plot points get an extra level of nesting, each
    // box needs the trace styling info
    var fn = function(d) {
        d.forEach(function(v) {
            v.t = t;
            v.trace = trace;
        });
        return d;
    };

    var gPoints = sel.selectAll('g.points')
        .data(mode ? fn : []);

    gPoints.enter().append('g')
        .attr('class', 'points');

    gPoints.exit().remove();

    var paths = gPoints.selectAll('path')
        .data(function(d) {
            var i;
            var pts = d.pts2;

            // normally use IQR, but if this is 0 or too small, use max-min
            var typicalSpread = Math.max((d.max - d.min) / 10, d.q3 - d.q1);
            var minSpread = typicalSpread * 1e-9;
            var spreadLimit = typicalSpread * JITTERSPREAD;
            var jitterFactors = [];
            var maxJitterFactor = 0;
            var newJitter;

            // dynamic jitter
            if(trace.jitter) {
                if(typicalSpread === 0) {
                    // edge case of no spread at all: fall back to max jitter
                    maxJitterFactor = 1;
                    jitterFactors = new Array(pts.length);
                    for(i = 0; i < pts.length; i++) {
                        jitterFactors[i] = 1;
                    }
                } else {
                    for(i = 0; i < pts.length; i++) {
                        var i0 = Math.max(0, i - JITTERCOUNT);
                        var pmin = pts[i0].v;
                        var i1 = Math.min(pts.length - 1, i + JITTERCOUNT);
                        var pmax = pts[i1].v;

                        if(mode !== 'all') {
                            if(pts[i].v < d.lf) pmax = Math.min(pmax, d.lf);
                            else pmin = Math.max(pmin, d.uf);
                        }

                        var jitterFactor = Math.sqrt(spreadLimit * (i1 - i0) / (pmax - pmin + minSpread)) || 0;
                        jitterFactor = Lib.constrain(Math.abs(jitterFactor), 0, 1);

                        jitterFactors.push(jitterFactor);
                        maxJitterFactor = Math.max(jitterFactor, maxJitterFactor);
                    }
                }
                newJitter = trace.jitter * 2 / (maxJitterFactor || 1);
            }

            // fills in 'x' and 'y' in calcdata 'pts' item
            for(i = 0; i < pts.length; i++) {
                var pt = pts[i];
                var v = pt.v;

                var jitterOffset = trace.jitter ?
                    (newJitter * jitterFactors[i] * (Lib.pseudoRandom() - 0.5)) :
                    0;

                var posPx = d.pos + bPos + bdPos * (trace.pointpos + jitterOffset);

                if(trace.orientation === 'h') {
                    pt.y = posPx;
                    pt.x = v;
                } else {
                    pt.x = posPx;
                    pt.y = v;
                }

                // tag suspected outliers
                if(mode === 'suspectedoutliers' && v < d.uo && v > d.lo) {
                    pt.so = true;
                }
            }

            return pts;
        });

    paths.enter().append('path')
        .classed('point', true);

    paths.exit().remove();

    paths.call(Drawing.translatePoints, xa, ya);
}

function plotBoxMean(sel, axes, trace, t) {
    var valAxis = axes.val;
    var posAxis = axes.pos;
    var posHasRangeBreaks = !!posAxis.rangebreaks;

    var bPos = t.bPos;
    var bPosPxOffset = t.bPosPxOffset || 0;

    // to support violin mean lines
    var mode = trace.boxmean || (trace.meanline || {}).visible;

    // to support for one-sided box
    var bdPos0;
    var bdPos1;
    if(Array.isArray(t.bdPos)) {
        bdPos0 = t.bdPos[0];
        bdPos1 = t.bdPos[1];
    } else {
        bdPos0 = t.bdPos;
        bdPos1 = t.bdPos;
    }

    var paths = sel.selectAll('path.mean').data((
        (trace.type === 'box' && trace.boxmean) ||
        (trace.type === 'violin' && trace.box.visible && trace.meanline.visible)
    ) ? Lib.identity : []);

    paths.enter().append('path')
        .attr('class', 'mean')
        .style({
            fill: 'none',
            'vector-effect': 'non-scaling-stroke'
        });

    paths.exit().remove();

    paths.each(function(d) {
        var lcenter = posAxis.c2l(d.pos + bPos, true);

        var pos0 = posAxis.l2p(lcenter - bdPos0) + bPosPxOffset;
        var pos1 = posAxis.l2p(lcenter + bdPos1) + bPosPxOffset;
        var posc = posHasRangeBreaks ? (pos0 + pos1) / 2 : posAxis.l2p(lcenter) + bPosPxOffset;

        var m = valAxis.c2p(d.mean, true);
        var sl = valAxis.c2p(d.mean - d.sd, true);
        var sh = valAxis.c2p(d.mean + d.sd, true);

        if(trace.orientation === 'h') {
            d3.select(this).attr('d',
                'M' + m + ',' + pos0 + 'V' + pos1 +
                (mode === 'sd' ?
                    'm0,0L' + sl + ',' + posc + 'L' + m + ',' + pos0 + 'L' + sh + ',' + posc + 'Z' :
                    '')
            );
        } else {
            d3.select(this).attr('d',
                'M' + pos0 + ',' + m + 'H' + pos1 +
                (mode === 'sd' ?
                    'm0,0L' + posc + ',' + sl + 'L' + pos0 + ',' + m + 'L' + posc + ',' + sh + 'Z' :
                    '')
            );
        }
    });
}

module.exports = {
    plot: plot,
    plotBoxAndWhiskers: plotBoxAndWhiskers,
    plotPoints: plotPoints,
    plotBoxMean: plotBoxMean
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2JveC9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYm94L2Nyb3NzX3RyYWNlX2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9ib3gvbGF5b3V0X2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9ib3gvbGF5b3V0X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYm94L3Bsb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsd0ZBQXVCO0FBQ2xELGVBQWUsbUJBQU8sQ0FBQyxnRkFBbUI7QUFDMUMsaUJBQWlCLG1CQUFPLENBQUMsc0dBQW1DO0FBQzVELHlCQUF5QiwwSUFBNkQ7QUFDdEYsaUJBQWlCLG9HQUFzQzs7QUFFdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxREFBcUQ7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydGZiM2VhNzZkNmM2YWQ4NzFhZmI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NhdHRlckF0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hdHRyaWJ1dGVzJyk7XG52YXIgYmFyQXR0cnMgPSByZXF1aXJlKCcuLi9iYXIvYXR0cmlidXRlcycpO1xudmFyIGNvbG9yQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxudmFyIHNjYXR0ZXJNYXJrZXJBdHRycyA9IHNjYXR0ZXJBdHRycy5tYXJrZXI7XG52YXIgc2NhdHRlck1hcmtlckxpbmVBdHRycyA9IHNjYXR0ZXJNYXJrZXJBdHRycy5saW5lO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB5IHNhbXBsZSBkYXRhIG9yIGNvb3JkaW5hdGVzLicsXG4gICAgICAgICAgICAnU2VlIG92ZXJ2aWV3IGZvciBtb3JlIGluZm8uJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeDoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgeCBzYW1wbGUgZGF0YSBvciBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ1NlZSBvdmVydmlldyBmb3IgbW9yZSBpbmZvLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHgwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgeCBjb29yZGluYXRlIGZvciBzaW5nbGUtYm94IHRyYWNlcycsXG4gICAgICAgICAgICAnb3IgdGhlIHN0YXJ0aW5nIGNvb3JkaW5hdGUgZm9yIG11bHRpLWJveCB0cmFjZXMnLFxuICAgICAgICAgICAgJ3NldCB1c2luZyBxMS9tZWRpYW4vcTMuJyxcbiAgICAgICAgICAgICdTZWUgb3ZlcnZpZXcgZm9yIG1vcmUgaW5mby4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5MDoge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHkgY29vcmRpbmF0ZSBmb3Igc2luZ2xlLWJveCB0cmFjZXMnLFxuICAgICAgICAgICAgJ29yIHRoZSBzdGFydGluZyBjb29yZGluYXRlIGZvciBtdWx0aS1ib3ggdHJhY2VzJyxcbiAgICAgICAgICAgICdzZXQgdXNpbmcgcTEvbWVkaWFuL3EzLicsXG4gICAgICAgICAgICAnU2VlIG92ZXJ2aWV3IGZvciBtb3JlIGluZm8uJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBkeDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHggY29vcmRpbmF0ZSBzdGVwIGZvciBtdWx0aS1ib3ggdHJhY2VzJyxcbiAgICAgICAgICAgICdzZXQgdXNpbmcgcTEvbWVkaWFuL3EzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGR5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgeSBjb29yZGluYXRlIHN0ZXAgZm9yIG11bHRpLWJveCB0cmFjZXMnLFxuICAgICAgICAgICAgJ3NldCB1c2luZyBxMS9tZWRpYW4vcTMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBuYW1lOiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgdHJhY2UgbmFtZS4nLFxuICAgICAgICAgICAgJ1RoZSB0cmFjZSBuYW1lIGFwcGVhciBhcyB0aGUgbGVnZW5kIGl0ZW0gYW5kIG9uIGhvdmVyLicsXG4gICAgICAgICAgICAnRm9yIGJveCB0cmFjZXMsIHRoZSBuYW1lIHdpbGwgYWxzbyBiZSB1c2VkIGZvciB0aGUgcG9zaXRpb24nLFxuICAgICAgICAgICAgJ2Nvb3JkaW5hdGUsIGlmIGB4YCBhbmQgYHgwYCAoYHlgIGFuZCBgeTBgIGlmIGhvcml6b250YWwpIGFyZScsXG4gICAgICAgICAgICAnbWlzc2luZyBhbmQgdGhlIHBvc2l0aW9uIGF4aXMgaXMgY2F0ZWdvcmljYWwnXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHExOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIFF1YXJ0aWxlIDEgdmFsdWVzLicsXG4gICAgICAgICAgICAnVGhlcmUgc2hvdWxkIGJlIGFzIG1hbnkgaXRlbXMgYXMgdGhlIG51bWJlciBvZiBib3hlcyBkZXNpcmVkLicsXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBtZWRpYW46IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgbWVkaWFuIHZhbHVlcy4nLFxuICAgICAgICAgICAgJ1RoZXJlIHNob3VsZCBiZSBhcyBtYW55IGl0ZW1zIGFzIHRoZSBudW1iZXIgb2YgYm94ZXMgZGVzaXJlZC4nLFxuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgcTM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgUXVhcnRpbGUgMyB2YWx1ZXMuJyxcbiAgICAgICAgICAgICdUaGVyZSBzaG91bGQgYmUgYXMgbWFueSBpdGVtcyBhcyB0aGUgbnVtYmVyIG9mIGJveGVzIGRlc2lyZWQuJyxcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGxvd2VyZmVuY2U6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgbG93ZXIgZmVuY2UgdmFsdWVzLicsXG4gICAgICAgICAgICAnVGhlcmUgc2hvdWxkIGJlIGFzIG1hbnkgaXRlbXMgYXMgdGhlIG51bWJlciBvZiBib3hlcyBkZXNpcmVkLicsXG4gICAgICAgICAgICAnVGhpcyBhdHRyaWJ1dGUgaGFzIGVmZmVjdCBvbmx5IHVuZGVyIHRoZSBxMS9tZWRpYW4vcTMgc2lnbmF0dXJlLicsXG4gICAgICAgICAgICAnSWYgYGxvd2VyZmVuY2VgIGlzIG5vdCBwcm92aWRlZCBidXQgYSBzYW1wbGUgKGluIGB5YCBvciBgeGApIGlzIHNldCwnLFxuICAgICAgICAgICAgJ3dlIGNvbXB1dGUgdGhlIGxvd2VyIGFzIHRoZSBsYXN0IHNhbXBsZSBwb2ludCBiZWxvdyAxLjUgdGltZXMgdGhlIElRUi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB1cHBlcmZlbmNlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHVwcGVyIGZlbmNlIHZhbHVlcy4nLFxuICAgICAgICAgICAgJ1RoZXJlIHNob3VsZCBiZSBhcyBtYW55IGl0ZW1zIGFzIHRoZSBudW1iZXIgb2YgYm94ZXMgZGVzaXJlZC4nLFxuICAgICAgICAgICAgJ1RoaXMgYXR0cmlidXRlIGhhcyBlZmZlY3Qgb25seSB1bmRlciB0aGUgcTEvbWVkaWFuL3EzIHNpZ25hdHVyZS4nLFxuICAgICAgICAgICAgJ0lmIGB1cHBlcmZlbmNlYCBpcyBub3QgcHJvdmlkZWQgYnV0IGEgc2FtcGxlIChpbiBgeWAgb3IgYHhgKSBpcyBzZXQsJyxcbiAgICAgICAgICAgICd3ZSBjb21wdXRlIHRoZSBsb3dlciBhcyB0aGUgbGFzdCBzYW1wbGUgcG9pbnQgYWJvdmUgMS41IHRpbWVzIHRoZSBJUVIuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBub3RjaGVkOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3Qgbm90Y2hlcyBhcmUgZHJhd24uJyxcbiAgICAgICAgICAgICdOb3RjaGVzIGRpc3BsYXlzIGEgY29uZmlkZW5jZSBpbnRlcnZhbCBhcm91bmQgdGhlIG1lZGlhbi4nLFxuICAgICAgICAgICAgJ1dlIGNvbXB1dGUgdGhlIGNvbmZpZGVuY2UgaW50ZXJ2YWwgYXMgbWVkaWFuICsvLSAxLjU3ICogSVFSIC8gc3FydChOKSwnLFxuICAgICAgICAgICAgJ3doZXJlIElRUiBpcyB0aGUgaW50ZXJxdWFydGlsZSByYW5nZSBhbmQgTiBpcyB0aGUgc2FtcGxlIHNpemUuJyxcbiAgICAgICAgICAgICdJZiB0d28gYm94ZXNcXCcgbm90Y2hlcyBkbyBub3Qgb3ZlcmxhcCB0aGVyZSBpcyA5NSUgY29uZmlkZW5jZSB0aGVpciBtZWRpYW5zIGRpZmZlci4nLFxuICAgICAgICAgICAgJ1NlZSBodHRwczovL3NpdGVzLmdvb2dsZS5jb20vc2l0ZS9kYXZpZHNzdGF0aXN0aWNzL2hvbWUvbm90Y2hlZC1ib3gtcGxvdHMgZm9yIG1vcmUgaW5mby4nLFxuICAgICAgICAgICAgJ0RlZmF1bHRzIHRvICpmYWxzZSogdW5sZXNzIGBub3RjaHdpZHRoYCBvciBgbm90Y2hzcGFuYCBpcyBzZXQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgbm90Y2h3aWR0aDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDAuNSxcbiAgICAgICAgZGZsdDogMC4yNSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB3aWR0aCBvZiB0aGUgbm90Y2hlcyByZWxhdGl2ZSB0bycsXG4gICAgICAgICAgICAndGhlIGJveFxcJyB3aWR0aC4nLFxuICAgICAgICAgICAgJ0ZvciBleGFtcGxlLCB3aXRoIDAsIHRoZSBub3RjaGVzIGFyZSBhcyB3aWRlIGFzIHRoZSBib3goZXMpLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIG5vdGNoc3Bhbjoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBub3RjaCBzcGFuIGZyb20gdGhlIGJveGVzXFwnIGBtZWRpYW5gIHZhbHVlcy4nLFxuICAgICAgICAgICAgJ1RoZXJlIHNob3VsZCBiZSBhcyBtYW55IGl0ZW1zIGFzIHRoZSBudW1iZXIgb2YgYm94ZXMgZGVzaXJlZC4nLFxuICAgICAgICAgICAgJ1RoaXMgYXR0cmlidXRlIGhhcyBlZmZlY3Qgb25seSB1bmRlciB0aGUgcTEvbWVkaWFuL3EzIHNpZ25hdHVyZS4nLFxuICAgICAgICAgICAgJ0lmIGBub3RjaHNwYW5gIGlzIG5vdCBwcm92aWRlZCBidXQgYSBzYW1wbGUgKGluIGB5YCBvciBgeGApIGlzIHNldCwnLFxuICAgICAgICAgICAgJ3dlIGNvbXB1dGUgaXQgYXMgMS41NyAqIElRUiAvIHNxcnQoTiksJyxcbiAgICAgICAgICAgICd3aGVyZSBOIGlzIHRoZSBzYW1wbGUgc2l6ZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIC8vIFRPRE9cbiAgICAvLyBtYXliZSBhZGRcbiAgICAvLyAtIGxvd2Vyb3V0bGllcmJvdW5kIC8gdXBwZXJvdXRsaWVyYm91bmRcbiAgICAvLyAtIGxvd2Vyc3VzcGVjdGVkb3V0bGllcmJvdW5kIC8gdXBwZXJzdXNwZWN0ZWRvdXRsaWVyYm91bmRcblxuICAgIGJveHBvaW50czoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydhbGwnLCAnb3V0bGllcnMnLCAnc3VzcGVjdGVkb3V0bGllcnMnLCBmYWxzZV0sXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgKm91dGxpZXJzKiwgb25seSB0aGUgc2FtcGxlIHBvaW50cyBseWluZyBvdXRzaWRlIHRoZSB3aGlza2VycycsXG4gICAgICAgICAgICAnYXJlIHNob3duJyxcbiAgICAgICAgICAgICdJZiAqc3VzcGVjdGVkb3V0bGllcnMqLCB0aGUgb3V0bGllciBwb2ludHMgYXJlIHNob3duIGFuZCcsXG4gICAgICAgICAgICAncG9pbnRzIGVpdGhlciBsZXNzIHRoYW4gNCpRMS0zKlEzIG9yIGdyZWF0ZXIgdGhhbiA0KlEzLTMqUTEnLFxuICAgICAgICAgICAgJ2FyZSBoaWdobGlnaHRlZCAoc2VlIGBvdXRsaWVyY29sb3JgKScsXG4gICAgICAgICAgICAnSWYgKmFsbCosIGFsbCBzYW1wbGUgcG9pbnRzIGFyZSBzaG93bicsXG4gICAgICAgICAgICAnSWYgKmZhbHNlKiwgb25seSB0aGUgYm94KGVzKSBhcmUgc2hvd24gd2l0aCBubyBzYW1wbGUgcG9pbnRzJyxcbiAgICAgICAgICAgICdEZWZhdWx0cyB0byAqc3VzcGVjdGVkb3V0bGllcnMqIHdoZW4gYG1hcmtlci5vdXRsaWVyY29sb3JgIG9yJyxcbiAgICAgICAgICAgICdgbWFya2VyLmxpbmUub3V0bGllcmNvbG9yYCBpcyBzZXQuJyxcbiAgICAgICAgICAgICdEZWZhdWx0cyB0byAqYWxsKiB1bmRlciB0aGUgcTEvbWVkaWFuL3EzIHNpZ25hdHVyZS4nLFxuICAgICAgICAgICAgJ090aGVyd2lzZSBkZWZhdWx0cyB0byAqb3V0bGllcnMqLicsXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBqaXR0ZXI6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGFtb3VudCBvZiBqaXR0ZXIgaW4gdGhlIHNhbXBsZSBwb2ludHMgZHJhd24uJyxcbiAgICAgICAgICAgICdJZiAqMCosIHRoZSBzYW1wbGUgcG9pbnRzIGFsaWduIGFsb25nIHRoZSBkaXN0cmlidXRpb24gYXhpcy4nLFxuICAgICAgICAgICAgJ0lmICoxKiwgdGhlIHNhbXBsZSBwb2ludHMgYXJlIGRyYXduIGluIGEgcmFuZG9tIGppdHRlciBvZiB3aWR0aCcsXG4gICAgICAgICAgICAnZXF1YWwgdG8gdGhlIHdpZHRoIG9mIHRoZSBib3goZXMpLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHBvaW50cG9zOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IC0yLFxuICAgICAgICBtYXg6IDIsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIHNhbXBsZSBwb2ludHMgaW4gcmVsYXRpb24gdG8gdGhlIGJveChlcykuJyxcbiAgICAgICAgICAgICdJZiAqMCosIHRoZSBzYW1wbGUgcG9pbnRzIGFyZSBwbGFjZXMgb3ZlciB0aGUgY2VudGVyIG9mIHRoZSBib3goZXMpLicsXG4gICAgICAgICAgICAnUG9zaXRpdmUgKG5lZ2F0aXZlKSB2YWx1ZXMgY29ycmVzcG9uZCB0byBwb3NpdGlvbnMgdG8gdGhlJyxcbiAgICAgICAgICAgICdyaWdodCAobGVmdCkgZm9yIHZlcnRpY2FsIGJveGVzIGFuZCBhYm92ZSAoYmVsb3cpIGZvciBob3Jpem9udGFsIGJveGVzJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBib3htZWFuOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbdHJ1ZSwgJ3NkJywgZmFsc2VdLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0lmICp0cnVlKiwgdGhlIG1lYW4gb2YgdGhlIGJveChlcylcXCcgdW5kZXJseWluZyBkaXN0cmlidXRpb24gaXMnLFxuICAgICAgICAgICAgJ2RyYXduIGFzIGEgZGFzaGVkIGxpbmUgaW5zaWRlIHRoZSBib3goZXMpLicsXG4gICAgICAgICAgICAnSWYgKnNkKiB0aGUgc3RhbmRhcmQgZGV2aWF0aW9uIGlzIGFsc28gZHJhd24uJyxcbiAgICAgICAgICAgICdEZWZhdWx0cyB0byAqdHJ1ZSogd2hlbiBgbWVhbmAgaXMgc2V0LicsXG4gICAgICAgICAgICAnRGVmYXVsdHMgdG8gKnNkKiB3aGVuIGBzZGAgaXMgc2V0JyxcbiAgICAgICAgICAgICdPdGhlcndpc2UgZGVmYXVsdHMgdG8gKmZhbHNlKi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBtZWFuOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIG1lYW4gdmFsdWVzLicsXG4gICAgICAgICAgICAnVGhlcmUgc2hvdWxkIGJlIGFzIG1hbnkgaXRlbXMgYXMgdGhlIG51bWJlciBvZiBib3hlcyBkZXNpcmVkLicsXG4gICAgICAgICAgICAnVGhpcyBhdHRyaWJ1dGUgaGFzIGVmZmVjdCBvbmx5IHVuZGVyIHRoZSBxMS9tZWRpYW4vcTMgc2lnbmF0dXJlLicsXG4gICAgICAgICAgICAnSWYgYG1lYW5gIGlzIG5vdCBwcm92aWRlZCBidXQgYSBzYW1wbGUgKGluIGB5YCBvciBgeGApIGlzIHNldCwnLFxuICAgICAgICAgICAgJ3dlIGNvbXB1dGUgdGhlIG1lYW4gZm9yIGVhY2ggYm94IHVzaW5nIHRoZSBzYW1wbGUgdmFsdWVzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHNkOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHN0YW5kYXJkIGRldmlhdGlvbiB2YWx1ZXMuJyxcbiAgICAgICAgICAgICdUaGVyZSBzaG91bGQgYmUgYXMgbWFueSBpdGVtcyBhcyB0aGUgbnVtYmVyIG9mIGJveGVzIGRlc2lyZWQuJyxcbiAgICAgICAgICAgICdUaGlzIGF0dHJpYnV0ZSBoYXMgZWZmZWN0IG9ubHkgdW5kZXIgdGhlIHExL21lZGlhbi9xMyBzaWduYXR1cmUuJyxcbiAgICAgICAgICAgICdJZiBgc2RgIGlzIG5vdCBwcm92aWRlZCBidXQgYSBzYW1wbGUgKGluIGB5YCBvciBgeGApIGlzIHNldCwnLFxuICAgICAgICAgICAgJ3dlIGNvbXB1dGUgdGhlIHN0YW5kYXJkIGRldmlhdGlvbiBmb3IgZWFjaCBib3ggdXNpbmcgdGhlIHNhbXBsZSB2YWx1ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBvcmllbnRhdGlvbjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWyd2JywgJ2gnXSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgYm94KGVzKS4nLFxuICAgICAgICAgICAgJ0lmICp2KiAoKmgqKSwgdGhlIGRpc3RyaWJ1dGlvbiBpcyB2aXN1YWxpemVkIGFsb25nJyxcbiAgICAgICAgICAgICd0aGUgdmVydGljYWwgKGhvcml6b250YWwpLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgcXVhcnRpbGVtZXRob2Q6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnbGluZWFyJywgJ2V4Y2x1c2l2ZScsICdpbmNsdXNpdmUnXSxcbiAgICAgICAgZGZsdDogJ2xpbmVhcicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBtZXRob2QgdXNlZCB0byBjb21wdXRlIHRoZSBzYW1wbGVcXCdzIFExIGFuZCBRMyBxdWFydGlsZXMuJyxcblxuICAgICAgICAgICAgJ1RoZSAqbGluZWFyKiBtZXRob2QgdXNlcyB0aGUgMjV0aCBwZXJjZW50aWxlIGZvciBRMSBhbmQgNzV0aCBwZXJjZW50aWxlIGZvciBRMycsXG4gICAgICAgICAgICAnYXMgY29tcHV0ZWQgdXNpbmcgbWV0aG9kICMxMCAobGlzdGVkIG9uIGh0dHA6Ly93d3cuYW1zdGF0Lm9yZy9wdWJsaWNhdGlvbnMvanNlL3YxNG4zL2xhbmdmb3JkLmh0bWwpLicsXG5cbiAgICAgICAgICAgICdUaGUgKmV4Y2x1c2l2ZSogbWV0aG9kIHVzZXMgdGhlIG1lZGlhbiB0byBkaXZpZGUgdGhlIG9yZGVyZWQgZGF0YXNldCBpbnRvIHR3byBoYWx2ZXMnLFxuICAgICAgICAgICAgJ2lmIHRoZSBzYW1wbGUgaXMgb2RkLCBpdCBkb2VzIG5vdCBpbmNsdWRlIHRoZSBtZWRpYW4gaW4gZWl0aGVyIGhhbGYgLScsXG4gICAgICAgICAgICAnUTEgaXMgdGhlbiB0aGUgbWVkaWFuIG9mIHRoZSBsb3dlciBoYWxmIGFuZCcsXG4gICAgICAgICAgICAnUTMgdGhlIG1lZGlhbiBvZiB0aGUgdXBwZXIgaGFsZi4nLFxuXG4gICAgICAgICAgICAnVGhlICppbmNsdXNpdmUqIG1ldGhvZCBhbHNvIHVzZXMgdGhlIG1lZGlhbiB0byBkaXZpZGUgdGhlIG9yZGVyZWQgZGF0YXNldCBpbnRvIHR3byBoYWx2ZXMnLFxuICAgICAgICAgICAgJ2J1dCBpZiB0aGUgc2FtcGxlIGlzIG9kZCwgaXQgaW5jbHVkZXMgdGhlIG1lZGlhbiBpbiBib3RoIGhhbHZlcyAtJyxcbiAgICAgICAgICAgICdRMSBpcyB0aGVuIHRoZSBtZWRpYW4gb2YgdGhlIGxvd2VyIGhhbGYgYW5kJyxcbiAgICAgICAgICAgICdRMyB0aGUgbWVkaWFuIG9mIHRoZSB1cHBlciBoYWxmLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgd2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHdpZHRoIG9mIHRoZSBib3ggaW4gZGF0YSBjb29yZGluYXRlJyxcbiAgICAgICAgICAgICdJZiAqMCogKGRlZmF1bHQgdmFsdWUpIHRoZSB3aWR0aCBpcyBhdXRvbWF0aWNhbGx5IHNlbGVjdGVkIGJhc2VkIG9uIHRoZSBwb3NpdGlvbnMnLFxuICAgICAgICAgICAgJ29mIG90aGVyIGJveCB0cmFjZXMgaW4gdGhlIHNhbWUgc3VicGxvdC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIG1hcmtlcjoge1xuICAgICAgICBvdXRsaWVyY29sb3I6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICBkZmx0OiAncmdiYSgwLCAwLCAwLCAwKScsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGNvbG9yIG9mIHRoZSBvdXRsaWVyIHNhbXBsZSBwb2ludHMuJ1xuICAgICAgICB9LFxuICAgICAgICBzeW1ib2w6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJNYXJrZXJBdHRycy5zeW1ib2wsXG4gICAgICAgICAgICB7YXJyYXlPazogZmFsc2UsIGVkaXRUeXBlOiAncGxvdCd9KSxcbiAgICAgICAgb3BhY2l0eTogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlck1hcmtlckF0dHJzLm9wYWNpdHksXG4gICAgICAgICAgICB7YXJyYXlPazogZmFsc2UsIGRmbHQ6IDEsIGVkaXRUeXBlOiAnc3R5bGUnfSksXG4gICAgICAgIHNpemU6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJNYXJrZXJBdHRycy5zaXplLFxuICAgICAgICAgICAge2FycmF5T2s6IGZhbHNlLCBlZGl0VHlwZTogJ2NhbGMnfSksXG4gICAgICAgIGNvbG9yOiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyTWFya2VyQXR0cnMuY29sb3IsXG4gICAgICAgICAgICB7YXJyYXlPazogZmFsc2UsIGVkaXRUeXBlOiAnc3R5bGUnfSksXG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICAgIGNvbG9yOiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyTWFya2VyTGluZUF0dHJzLmNvbG9yLFxuICAgICAgICAgICAgICAgIHthcnJheU9rOiBmYWxzZSwgZGZsdDogY29sb3JBdHRycy5kZWZhdWx0TGluZSwgZWRpdFR5cGU6ICdzdHlsZSd9XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgd2lkdGg6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJNYXJrZXJMaW5lQXR0cnMud2lkdGgsXG4gICAgICAgICAgICAgICAge2FycmF5T2s6IGZhbHNlLCBkZmx0OiAwLCBlZGl0VHlwZTogJ3N0eWxlJ31cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvdXRsaWVyY29sb3I6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIGJvcmRlciBsaW5lIGNvbG9yIG9mIHRoZSBvdXRsaWVyIHNhbXBsZSBwb2ludHMuJyxcbiAgICAgICAgICAgICAgICAgICAgJ0RlZmF1bHRzIHRvIG1hcmtlci5jb2xvcidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dGxpZXJ3aWR0aDoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBkZmx0OiAxLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIGJvcmRlciBsaW5lIHdpZHRoIChpbiBweCkgb2YgdGhlIG91dGxpZXIgc2FtcGxlIHBvaW50cy4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgfSxcblxuICAgIGxpbmU6IHtcbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGNvbG9yIG9mIGxpbmUgYm91bmRpbmcgdGhlIGJveChlcykuJ1xuICAgICAgICB9LFxuICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMixcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB3aWR0aCAoaW4gcHgpIG9mIGxpbmUgYm91bmRpbmcgdGhlIGJveChlcykuJ1xuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgfSxcblxuICAgIGZpbGxjb2xvcjogc2NhdHRlckF0dHJzLmZpbGxjb2xvcixcblxuICAgIHdoaXNrZXJ3aWR0aDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIGRmbHQ6IDAuNSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB3aWR0aCBvZiB0aGUgd2hpc2tlcnMgcmVsYXRpdmUgdG8nLFxuICAgICAgICAgICAgJ3RoZSBib3hcXCcgd2lkdGguJyxcbiAgICAgICAgICAgICdGb3IgZXhhbXBsZSwgd2l0aCAxLCB0aGUgd2hpc2tlcnMgYXJlIGFzIHdpZGUgYXMgdGhlIGJveChlcykuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBvZmZzZXRncm91cDogYmFyQXR0cnMub2Zmc2V0Z3JvdXAsXG4gICAgYWxpZ25tZW50Z3JvdXA6IGJhckF0dHJzLmFsaWdubWVudGdyb3VwLFxuXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgbWFya2VyOiBzY2F0dGVyQXR0cnMuc2VsZWN0ZWQubWFya2VyLFxuICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgIH0sXG4gICAgdW5zZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHNjYXR0ZXJBdHRycy51bnNlbGVjdGVkLm1hcmtlcixcbiAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICB9LFxuXG4gICAgdGV4dDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLnRleHQsIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB0ZXh0IGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIHNhbXBsZSB2YWx1ZS4nLFxuICAgICAgICAgICAgJ0lmIGEgc2luZ2xlIHN0cmluZywgdGhlIHNhbWUgc3RyaW5nIGFwcGVhcnMgb3ZlcicsXG4gICAgICAgICAgICAnYWxsIHRoZSBkYXRhIHBvaW50cy4nLFxuICAgICAgICAgICAgJ0lmIGFuIGFycmF5IG9mIHN0cmluZywgdGhlIGl0ZW1zIGFyZSBtYXBwZWQgaW4gb3JkZXIgdG8gdGhlJyxcbiAgICAgICAgICAgICd0aGlzIHRyYWNlXFwncyAoeCx5KSBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ1RvIGJlIHNlZW4sIHRyYWNlIGBob3ZlcmluZm9gIG11c3QgY29udGFpbiBhICp0ZXh0KiBmbGFnLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcbiAgICBob3ZlcnRleHQ6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5ob3ZlcnRleHQsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdTYW1lIGFzIGB0ZXh0YC4nXG4gICAgfSksXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdOLkIuIFRoaXMgb25seSBoYXMgYW4gZWZmZWN0IHdoZW4gaG92ZXJpbmcgb24gcG9pbnRzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcblxuICAgIGhvdmVyb246IHtcbiAgICAgICAgdmFsVHlwZTogJ2ZsYWdsaXN0JyxcbiAgICAgICAgZmxhZ3M6IFsnYm94ZXMnLCAncG9pbnRzJ10sXG4gICAgICAgIGRmbHQ6ICdib3hlcytwb2ludHMnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RvIHRoZSBob3ZlciBlZmZlY3RzIGhpZ2hsaWdodCBpbmRpdmlkdWFsIGJveGVzICcsXG4gICAgICAgICAgICAnb3Igc2FtcGxlIHBvaW50cyBvciBib3RoPydcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgZ2V0QXhpc0dyb3VwID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4aXNfaWRzJykuZ2V0QXhpc0dyb3VwO1xuXG52YXIgb3JpZW50YXRpb25zID0gWyd2JywgJ2gnXTtcblxuZnVuY3Rpb24gY3Jvc3NUcmFjZUNhbGMoZ2QsIHBsb3RpbmZvKSB7XG4gICAgdmFyIGNhbGNkYXRhID0gZ2QuY2FsY2RhdGE7XG4gICAgdmFyIHhhID0gcGxvdGluZm8ueGF4aXM7XG4gICAgdmFyIHlhID0gcGxvdGluZm8ueWF4aXM7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgb3JpZW50YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tpXTtcbiAgICAgICAgdmFyIHBvc0F4aXMgPSBvcmllbnRhdGlvbiA9PT0gJ2gnID8geWEgOiB4YTtcbiAgICAgICAgdmFyIGJveExpc3QgPSBbXTtcblxuICAgICAgICAvLyBtYWtlIGxpc3Qgb2YgYm94ZXMgLyBjYW5kbGVzdGlja3NcbiAgICAgICAgLy8gRm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIGNhbmRsZXN0aWNrcyBhcmUgdHJlYXRlZCBhcyBpZiB0aGV5ICphcmUqIGJveCB0cmFjZXMgaGVyZVxuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgY2FsY2RhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBjZCA9IGNhbGNkYXRhW2pdO1xuICAgICAgICAgICAgdmFyIHQgPSBjZFswXS50O1xuICAgICAgICAgICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlLnZpc2libGUgPT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICAgICAgKHRyYWNlLnR5cGUgPT09ICdib3gnIHx8IHRyYWNlLnR5cGUgPT09ICdjYW5kbGVzdGljaycpICYmXG4gICAgICAgICAgICAgICAgICAgICF0LmVtcHR5ICYmXG4gICAgICAgICAgICAgICAgICAgICh0cmFjZS5vcmllbnRhdGlvbiB8fCAndicpID09PSBvcmllbnRhdGlvbiAmJlxuICAgICAgICAgICAgICAgICAgICB0cmFjZS54YXhpcyA9PT0geGEuX2lkICYmXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlLnlheGlzID09PSB5YS5faWRcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgYm94TGlzdC5wdXNoKGopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0UG9zaXRpb25PZmZzZXQoJ2JveCcsIGdkLCBib3hMaXN0LCBwb3NBeGlzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aW9uT2Zmc2V0KHRyYWNlVHlwZSwgZ2QsIGJveExpc3QsIHBvc0F4aXMpIHtcbiAgICB2YXIgY2FsY2RhdGEgPSBnZC5jYWxjZGF0YTtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBheElkID0gcG9zQXhpcy5faWQ7XG4gICAgdmFyIGF4TGV0dGVyID0gYXhJZC5jaGFyQXQoMCk7XG5cbiAgICB2YXIgaSwgaiwgY2FsY1RyYWNlO1xuICAgIHZhciBwb2ludExpc3QgPSBbXTtcbiAgICB2YXIgc2hvd25QdHMgPSAwO1xuXG4gICAgLy8gbWFrZSBsaXN0IG9mIGJveCBwb2ludHNcbiAgICBmb3IoaSA9IDA7IGkgPCBib3hMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNhbGNUcmFjZSA9IGNhbGNkYXRhW2JveExpc3RbaV1dO1xuICAgICAgICBmb3IoaiA9IDA7IGogPCBjYWxjVHJhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHBvaW50TGlzdC5wdXNoKHBvc0F4aXMuYzJsKGNhbGNUcmFjZVtqXS5wb3MsIHRydWUpKTtcbiAgICAgICAgICAgIHNob3duUHRzICs9IChjYWxjVHJhY2Vbal0ucHRzMiB8fCBbXSkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIXBvaW50TGlzdC5sZW5ndGgpIHJldHVybjtcblxuICAgIC8vIGJveCBwbG90cyAtIHVwZGF0ZSBkUG9zIGJhc2VkIG9uIG11bHRpcGxlIHRyYWNlc1xuICAgIHZhciBib3hkdiA9IExpYi5kaXN0aW5jdFZhbHMocG9pbnRMaXN0KTtcbiAgICB2YXIgZFBvczAgPSBib3hkdi5taW5EaWZmIC8gMjtcblxuICAgIC8vIGNoZWNrIGZvciBmb3JjZWQgbWluaW11bSBkdGlja1xuICAgIEF4ZXMubWluRHRpY2socG9zQXhpcywgYm94ZHYubWluRGlmZiwgYm94ZHYudmFsc1swXSwgdHJ1ZSk7XG5cbiAgICB2YXIgbnVtS2V5ID0gdHJhY2VUeXBlID09PSAndmlvbGluJyA/ICdfbnVtVmlvbGlucycgOiAnX251bUJveGVzJztcbiAgICB2YXIgbnVtVG90YWwgPSBmdWxsTGF5b3V0W251bUtleV07XG4gICAgdmFyIGdyb3VwID0gZnVsbExheW91dFt0cmFjZVR5cGUgKyAnbW9kZSddID09PSAnZ3JvdXAnICYmIG51bVRvdGFsID4gMTtcbiAgICB2YXIgZ3JvdXBGcmFjdGlvbiA9IDEgLSBmdWxsTGF5b3V0W3RyYWNlVHlwZSArICdnYXAnXTtcbiAgICB2YXIgZ3JvdXBHYXBGcmFjdGlvbiA9IDEgLSBmdWxsTGF5b3V0W3RyYWNlVHlwZSArICdncm91cGdhcCddO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgYm94TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjYWxjVHJhY2UgPSBjYWxjZGF0YVtib3hMaXN0W2ldXTtcblxuICAgICAgICB2YXIgdHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG4gICAgICAgIHZhciB0ID0gY2FsY1RyYWNlWzBdLnQ7XG4gICAgICAgIHZhciB3aWR0aCA9IHRyYWNlLndpZHRoO1xuICAgICAgICB2YXIgc2lkZSA9IHRyYWNlLnNpZGU7XG5cbiAgICAgICAgLy8gcG9zaXRpb24gY29vcmRpbmF0ZSBkZWx0YVxuICAgICAgICB2YXIgZFBvcztcbiAgICAgICAgLy8gYm94IGhhbGYgd2lkdGg7XG4gICAgICAgIHZhciBiZFBvcztcbiAgICAgICAgLy8gYm94IGNlbnRlciBvZmZzZXRcbiAgICAgICAgdmFyIGJQb3M7XG4gICAgICAgIC8vIGhhbGYtd2lkdGggd2l0aGluIHdoaWNoIHRvIGFjY2VwdCBob3ZlciBmb3IgdGhpcyBib3gvdmlvbGluXG4gICAgICAgIC8vIGFsd2F5cyBzcGxpdCB0aGUgZGlzdGFuY2UgdG8gdGhlIGNsb3Nlc3QgYm94L3Zpb2xpblxuICAgICAgICB2YXIgd0hvdmVyO1xuXG4gICAgICAgIGlmKHdpZHRoKSB7XG4gICAgICAgICAgICBkUG9zID0gYmRQb3MgPSB3SG92ZXIgPSB3aWR0aCAvIDI7XG4gICAgICAgICAgICBiUG9zID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRQb3MgPSBkUG9zMDtcblxuICAgICAgICAgICAgaWYoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB2YXIgZ3JvdXBJZCA9IGdldEF4aXNHcm91cChmdWxsTGF5b3V0LCBwb3NBeGlzLl9pZCkgKyB0cmFjZS5vcmllbnRhdGlvbjtcbiAgICAgICAgICAgICAgICB2YXIgYWxpZ25tZW50R3JvdXBzID0gZnVsbExheW91dC5fYWxpZ25tZW50T3B0c1tncm91cElkXSB8fCB7fTtcbiAgICAgICAgICAgICAgICB2YXIgYWxpZ25tZW50R3JvdXBPcHRzID0gYWxpZ25tZW50R3JvdXBzW3RyYWNlLmFsaWdubWVudGdyb3VwXSB8fCB7fTtcbiAgICAgICAgICAgICAgICB2YXIgbk9mZnNldEdyb3VwcyA9IE9iamVjdC5rZXlzKGFsaWdubWVudEdyb3VwT3B0cy5vZmZzZXRHcm91cHMgfHwge30pLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgbnVtID0gbk9mZnNldEdyb3VwcyB8fCBudW1Ub3RhbDtcbiAgICAgICAgICAgICAgICB2YXIgc2hpZnQgPSBuT2Zmc2V0R3JvdXBzID8gdHJhY2UuX29mZnNldEluZGV4IDogdC5udW07XG5cbiAgICAgICAgICAgICAgICBiZFBvcyA9IGRQb3MgKiBncm91cEZyYWN0aW9uICogZ3JvdXBHYXBGcmFjdGlvbiAvIG51bTtcbiAgICAgICAgICAgICAgICBiUG9zID0gMiAqIGRQb3MgKiAoLTAuNSArIChzaGlmdCArIDAuNSkgLyBudW0pICogZ3JvdXBGcmFjdGlvbjtcbiAgICAgICAgICAgICAgICB3SG92ZXIgPSBkUG9zICogZ3JvdXBGcmFjdGlvbiAvIG51bTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmRQb3MgPSBkUG9zICogZ3JvdXBGcmFjdGlvbiAqIGdyb3VwR2FwRnJhY3Rpb247XG4gICAgICAgICAgICAgICAgYlBvcyA9IDA7XG4gICAgICAgICAgICAgICAgd0hvdmVyID0gZFBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0LmRQb3MgPSBkUG9zO1xuICAgICAgICB0LmJQb3MgPSBiUG9zO1xuICAgICAgICB0LmJkUG9zID0gYmRQb3M7XG4gICAgICAgIHQud0hvdmVyID0gd0hvdmVyO1xuXG4gICAgICAgIC8vIGJveC92aW9saW4tb25seSB2YWx1ZS1zcGFjZSBwdXNoIHZhbHVlXG4gICAgICAgIHZhciBwdXNocGx1cztcbiAgICAgICAgdmFyIHB1c2htaW51cztcbiAgICAgICAgLy8gZWRnZSBvZiBib3gvdmlvbGluXG4gICAgICAgIHZhciBlZGdlID0gYlBvcyArIGJkUG9zO1xuICAgICAgICB2YXIgZWRnZXBsdXM7XG4gICAgICAgIHZhciBlZGdlbWludXM7XG4gICAgICAgIC8vIHZhbHVlLXNwYWNlIHBhZGRpbmdcbiAgICAgICAgdmFyIHZwYWRwbHVzO1xuICAgICAgICB2YXIgdnBhZG1pbnVzO1xuICAgICAgICAvLyBwaXhlbC1zcGFjZSBwYWRkaW5nXG4gICAgICAgIHZhciBwcGFkcGx1cztcbiAgICAgICAgdmFyIHBwYWRtaW51cztcbiAgICAgICAgLy8gZG8gd2UgYWRkIDUlIG9mIGJvdGggc2lkZXMgKG1vcmUgbG9naWMgZm9yIHBvaW50cyBiZXlvbmQgYm94L3Zpb2xpbiBiZWxvdylcbiAgICAgICAgdmFyIHBhZGRlZCA9IEJvb2xlYW4od2lkdGgpO1xuICAgICAgICAvLyBkb2VzIHRoaXMgdHJhY2Ugc2hvdyBwb2ludHM/XG4gICAgICAgIHZhciBoYXNQdHMgPSAodHJhY2UuYm94cG9pbnRzIHx8IHRyYWNlLnBvaW50cykgJiYgKHNob3duUHRzID4gMCk7XG5cbiAgICAgICAgaWYoc2lkZSA9PT0gJ3Bvc2l0aXZlJykge1xuICAgICAgICAgICAgcHVzaHBsdXMgPSBkUG9zICogKHdpZHRoID8gMSA6IDAuNSk7XG4gICAgICAgICAgICBlZGdlcGx1cyA9IGVkZ2U7XG4gICAgICAgICAgICBwdXNobWludXMgPSBlZGdlcGx1cyA9IGJQb3M7XG4gICAgICAgIH0gZWxzZSBpZihzaWRlID09PSAnbmVnYXRpdmUnKSB7XG4gICAgICAgICAgICBwdXNocGx1cyA9IGVkZ2VwbHVzID0gYlBvcztcbiAgICAgICAgICAgIHB1c2htaW51cyA9IGRQb3MgKiAod2lkdGggPyAxIDogMC41KTtcbiAgICAgICAgICAgIGVkZ2VtaW51cyA9IGVkZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdXNocGx1cyA9IHB1c2htaW51cyA9IGRQb3M7XG4gICAgICAgICAgICBlZGdlcGx1cyA9IGVkZ2VtaW51cyA9IGVkZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihoYXNQdHMpIHtcbiAgICAgICAgICAgIHZhciBwb2ludHBvcyA9IHRyYWNlLnBvaW50cG9zO1xuICAgICAgICAgICAgdmFyIGppdHRlciA9IHRyYWNlLmppdHRlcjtcbiAgICAgICAgICAgIHZhciBtcyA9IHRyYWNlLm1hcmtlci5zaXplIC8gMjtcblxuICAgICAgICAgICAgdmFyIHBwID0gMDtcbiAgICAgICAgICAgIGlmKChwb2ludHBvcyArIGppdHRlcikgPj0gMCkge1xuICAgICAgICAgICAgICAgIHBwID0gZWRnZSAqIChwb2ludHBvcyArIGppdHRlcik7XG4gICAgICAgICAgICAgICAgaWYocHAgPiBwdXNocGx1cykge1xuICAgICAgICAgICAgICAgICAgICAvLyAoKyspIGJleW9uZCBwbHVzLXZhbHVlLCB1c2UgcHBcbiAgICAgICAgICAgICAgICAgICAgcGFkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcHBhZHBsdXMgPSBtcztcbiAgICAgICAgICAgICAgICAgICAgdnBhZHBsdXMgPSBwcDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYocHAgPiBlZGdlcGx1cykge1xuICAgICAgICAgICAgICAgICAgICAvLyAoKyksIHVzZSBwdXNoLXZhbHVlIChpdCdzIGJpZ2dlciksIGJ1dCBhZGQgcHgtcGFkXG4gICAgICAgICAgICAgICAgICAgIHBwYWRwbHVzID0gbXM7XG4gICAgICAgICAgICAgICAgICAgIHZwYWRwbHVzID0gcHVzaHBsdXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocHAgPD0gcHVzaHBsdXMpIHtcbiAgICAgICAgICAgICAgICAvLyAoLT4pIGZhbGxiYWNrIHRvIHB1c2ggdmFsdWVcbiAgICAgICAgICAgICAgICB2cGFkcGx1cyA9IHB1c2hwbHVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcG0gPSAwO1xuICAgICAgICAgICAgaWYoKHBvaW50cG9zIC0gaml0dGVyKSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcG0gPSAtZWRnZSAqIChwb2ludHBvcyAtIGppdHRlcik7XG4gICAgICAgICAgICAgICAgaWYocG0gPiBwdXNobWludXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gKC0tKSBiZXlvbmQgcGx1cy12YWx1ZSwgdXNlIHBwXG4gICAgICAgICAgICAgICAgICAgIHBhZGRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHBwYWRtaW51cyA9IG1zO1xuICAgICAgICAgICAgICAgICAgICB2cGFkbWludXMgPSBwbTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYocG0gPiBlZGdlbWludXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gKC0pLCB1c2UgcHVzaC12YWx1ZSAoaXQncyBiaWdnZXIpLCBidXQgYWRkIHB4LXBhZFxuICAgICAgICAgICAgICAgICAgICBwcGFkbWludXMgPSBtcztcbiAgICAgICAgICAgICAgICAgICAgdnBhZG1pbnVzID0gcHVzaG1pbnVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBtIDw9IHB1c2htaW51cykge1xuICAgICAgICAgICAgICAgIC8vICg8LSkgZmFsbGJhY2sgdG8gcHVzaCB2YWx1ZVxuICAgICAgICAgICAgICAgIHZwYWRtaW51cyA9IHB1c2htaW51cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZwYWRwbHVzID0gcHVzaHBsdXM7XG4gICAgICAgICAgICB2cGFkbWludXMgPSBwdXNobWludXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9zID0gbmV3IEFycmF5KGNhbGNUcmFjZS5sZW5ndGgpO1xuICAgICAgICBmb3IoaiA9IDA7IGogPCBjYWxjVHJhY2UubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHBvc1tqXSA9IGNhbGNUcmFjZVtqXS5wb3M7XG4gICAgICAgIH1cblxuICAgICAgICB0cmFjZS5fZXh0cmVtZXNbYXhJZF0gPSBBeGVzLmZpbmRFeHRyZW1lcyhwb3NBeGlzLCBwb3MsIHtcbiAgICAgICAgICAgIHBhZGRlZDogcGFkZGVkLFxuICAgICAgICAgICAgdnBhZG1pbnVzOiB2cGFkbWludXMsXG4gICAgICAgICAgICB2cGFkcGx1czogdnBhZHBsdXMsXG4gICAgICAgICAgICB2cGFkTGluZWFyaXplZDogdHJ1ZSxcbiAgICAgICAgICAgIC8vIE4uQi4gU1ZHIHB4LXNwYWNlIHBvc2l0aXZlL25lZ2F0aXZlXG4gICAgICAgICAgICBwcGFkbWludXM6IHt4OiBwcGFkbWludXMsIHk6IHBwYWRwbHVzfVtheExldHRlcl0sXG4gICAgICAgICAgICBwcGFkcGx1czoge3g6IHBwYWRwbHVzLCB5OiBwcGFkbWludXN9W2F4TGV0dGVyXSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcm9zc1RyYWNlQ2FsYzogY3Jvc3NUcmFjZUNhbGMsXG4gICAgc2V0UG9zaXRpb25PZmZzZXQ6IHNldFBvc2l0aW9uT2Zmc2V0XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGJveG1vZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnZ3JvdXAnLCAnb3ZlcmxheSddLFxuICAgICAgICBkZmx0OiAnb3ZlcmxheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIGhvdyBib3hlcyBhdCB0aGUgc2FtZSBsb2NhdGlvbiBjb29yZGluYXRlJyxcbiAgICAgICAgICAgICdhcmUgZGlzcGxheWVkIG9uIHRoZSBncmFwaC4nLFxuICAgICAgICAgICAgJ0lmICpncm91cCosIHRoZSBib3hlcyBhcmUgcGxvdHRlZCBuZXh0IHRvIG9uZSBhbm90aGVyJyxcbiAgICAgICAgICAgICdjZW50ZXJlZCBhcm91bmQgdGhlIHNoYXJlZCBsb2NhdGlvbi4nLFxuICAgICAgICAgICAgJ0lmICpvdmVybGF5KiwgdGhlIGJveGVzIGFyZSBwbG90dGVkIG92ZXIgb25lIGFub3RoZXIsJyxcbiAgICAgICAgICAgICd5b3UgbWlnaHQgbmVlZCB0byBzZXQgKm9wYWNpdHkqIHRvIHNlZSB0aGVtIG11bHRpcGxlIGJveGVzLicsXG4gICAgICAgICAgICAnSGFzIG5vIGVmZmVjdCBvbiB0cmFjZXMgdGhhdCBoYXZlICp3aWR0aCogc2V0LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJveGdhcDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIGRmbHQ6IDAuMyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBnYXAgKGluIHBsb3QgZnJhY3Rpb24pIGJldHdlZW4gYm94ZXMgb2YnLFxuICAgICAgICAgICAgJ2FkamFjZW50IGxvY2F0aW9uIGNvb3JkaW5hdGVzLicsXG4gICAgICAgICAgICAnSGFzIG5vIGVmZmVjdCBvbiB0cmFjZXMgdGhhdCBoYXZlICp3aWR0aCogc2V0LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJveGdyb3VwZ2FwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgZGZsdDogMC4zLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGdhcCAoaW4gcGxvdCBmcmFjdGlvbikgYmV0d2VlbiBib3hlcyBvZicsXG4gICAgICAgICAgICAndGhlIHNhbWUgbG9jYXRpb24gY29vcmRpbmF0ZS4nLFxuICAgICAgICAgICAgJ0hhcyBubyBlZmZlY3Qgb24gdHJhY2VzIHRoYXQgaGF2ZSAqd2lkdGgqIHNldC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBsYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpO1xuXG5mdW5jdGlvbiBfc3VwcGx5KGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhLCBjb2VyY2UsIHRyYWNlVHlwZSkge1xuICAgIHZhciBjYXRlZ29yeSA9IHRyYWNlVHlwZSArICdMYXlvdXQnO1xuICAgIHZhciBoYXNUcmFjZVR5cGUgPSBmYWxzZTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBmdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhY2UgPSBmdWxsRGF0YVtpXTtcblxuICAgICAgICBpZihSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCBjYXRlZ29yeSkpIHtcbiAgICAgICAgICAgIGhhc1RyYWNlVHlwZSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighaGFzVHJhY2VUeXBlKSByZXR1cm47XG5cbiAgICBjb2VyY2UodHJhY2VUeXBlICsgJ21vZGUnKTtcbiAgICBjb2VyY2UodHJhY2VUeXBlICsgJ2dhcCcpO1xuICAgIGNvZXJjZSh0cmFjZVR5cGUgKyAnZ3JvdXBnYXAnKTtcbn1cblxuZnVuY3Rpb24gc3VwcGx5TGF5b3V0RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShsYXlvdXRJbiwgbGF5b3V0T3V0LCBsYXlvdXRBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG4gICAgX3N1cHBseShsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSwgY29lcmNlLCAnYm94Jyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiBzdXBwbHlMYXlvdXREZWZhdWx0cyxcbiAgICBfc3VwcGx5OiBfc3VwcGx5XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xuXG4vLyBjb25zdGFudHMgZm9yIGR5bmFtaWMgaml0dGVyIChpZSBsZXNzIGppdHRlciBmb3Igc3BhcnNlciBwb2ludHMpXG52YXIgSklUVEVSQ09VTlQgPSA1OyAvLyBwb2ludHMgZWl0aGVyIHNpZGUgb2YgdGhpcyB0byBpbmNsdWRlXG52YXIgSklUVEVSU1BSRUFEID0gMC4wMTsgLy8gZnJhY3Rpb24gb2YgSVFSIHRvIGNvdW50IGFzIFwiZGVuc2VcIlxuXG5mdW5jdGlvbiBwbG90KGdkLCBwbG90aW5mbywgY2Rib3gsIGJveExheWVyKSB7XG4gICAgdmFyIHhhID0gcGxvdGluZm8ueGF4aXM7XG4gICAgdmFyIHlhID0gcGxvdGluZm8ueWF4aXM7XG5cbiAgICBMaWIubWFrZVRyYWNlR3JvdXBzKGJveExheWVyLCBjZGJveCwgJ3RyYWNlIGJveGVzJykuZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICB2YXIgcGxvdEdyb3VwID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgY2QwID0gY2RbMF07XG4gICAgICAgIHZhciB0ID0gY2QwLnQ7XG4gICAgICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcblxuICAgICAgICAvLyB3aGlza2VyIHdpZHRoXG4gICAgICAgIHQud2RQb3MgPSB0LmJkUG9zICogdHJhY2Uud2hpc2tlcndpZHRoO1xuXG4gICAgICAgIGlmKHRyYWNlLnZpc2libGUgIT09IHRydWUgfHwgdC5lbXB0eSkge1xuICAgICAgICAgICAgcGxvdEdyb3VwLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvc0F4aXMsIHZhbEF4aXM7XG5cbiAgICAgICAgaWYodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICAgICAgcG9zQXhpcyA9IHlhO1xuICAgICAgICAgICAgdmFsQXhpcyA9IHhhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zQXhpcyA9IHhhO1xuICAgICAgICAgICAgdmFsQXhpcyA9IHlhO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxvdEJveEFuZFdoaXNrZXJzKHBsb3RHcm91cCwge3BvczogcG9zQXhpcywgdmFsOiB2YWxBeGlzfSwgdHJhY2UsIHQpO1xuICAgICAgICBwbG90UG9pbnRzKHBsb3RHcm91cCwge3g6IHhhLCB5OiB5YX0sIHRyYWNlLCB0KTtcbiAgICAgICAgcGxvdEJveE1lYW4ocGxvdEdyb3VwLCB7cG9zOiBwb3NBeGlzLCB2YWw6IHZhbEF4aXN9LCB0cmFjZSwgdCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHBsb3RCb3hBbmRXaGlza2VycyhzZWwsIGF4ZXMsIHRyYWNlLCB0KSB7XG4gICAgdmFyIGlzSG9yaXpvbnRhbCA9IHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCc7XG4gICAgdmFyIHZhbEF4aXMgPSBheGVzLnZhbDtcbiAgICB2YXIgcG9zQXhpcyA9IGF4ZXMucG9zO1xuICAgIHZhciBwb3NIYXNSYW5nZUJyZWFrcyA9ICEhcG9zQXhpcy5yYW5nZWJyZWFrcztcblxuICAgIHZhciBiUG9zID0gdC5iUG9zO1xuICAgIHZhciB3ZFBvcyA9IHQud2RQb3MgfHwgMDtcbiAgICB2YXIgYlBvc1B4T2Zmc2V0ID0gdC5iUG9zUHhPZmZzZXQgfHwgMDtcbiAgICB2YXIgd2hpc2tlcldpZHRoID0gdHJhY2Uud2hpc2tlcndpZHRoIHx8IDA7XG4gICAgdmFyIG5vdGNoZWQgPSB0cmFjZS5ub3RjaGVkIHx8IGZhbHNlO1xuICAgIHZhciBudyA9IG5vdGNoZWQgPyAxIC0gMiAqIHRyYWNlLm5vdGNod2lkdGggOiAxO1xuXG4gICAgLy8gdG8gc3VwcG9ydCBmb3Igb25lLXNpZGVkIGJveFxuICAgIHZhciBiZFBvczA7XG4gICAgdmFyIGJkUG9zMTtcbiAgICBpZihBcnJheS5pc0FycmF5KHQuYmRQb3MpKSB7XG4gICAgICAgIGJkUG9zMCA9IHQuYmRQb3NbMF07XG4gICAgICAgIGJkUG9zMSA9IHQuYmRQb3NbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmRQb3MwID0gdC5iZFBvcztcbiAgICAgICAgYmRQb3MxID0gdC5iZFBvcztcbiAgICB9XG5cbiAgICB2YXIgcGF0aHMgPSBzZWwuc2VsZWN0QWxsKCdwYXRoLmJveCcpLmRhdGEoKFxuICAgICAgICB0cmFjZS50eXBlICE9PSAndmlvbGluJyB8fFxuICAgICAgICB0cmFjZS5ib3gudmlzaWJsZVxuICAgICkgPyBMaWIuaWRlbnRpdHkgOiBbXSk7XG5cbiAgICBwYXRocy5lbnRlcigpLmFwcGVuZCgncGF0aCcpXG4gICAgICAgIC5zdHlsZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnYm94Jyk7XG5cbiAgICBwYXRocy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICBwYXRocy5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYoZC5lbXB0eSkgcmV0dXJuICdNMCwwWic7XG5cbiAgICAgICAgdmFyIGxjZW50ZXIgPSBwb3NBeGlzLmMybChkLnBvcyArIGJQb3MsIHRydWUpO1xuXG4gICAgICAgIHZhciBwb3MwID0gcG9zQXhpcy5sMnAobGNlbnRlciAtIGJkUG9zMCkgKyBiUG9zUHhPZmZzZXQ7XG4gICAgICAgIHZhciBwb3MxID0gcG9zQXhpcy5sMnAobGNlbnRlciArIGJkUG9zMSkgKyBiUG9zUHhPZmZzZXQ7XG4gICAgICAgIHZhciBwb3NjID0gcG9zSGFzUmFuZ2VCcmVha3MgPyAocG9zMCArIHBvczEpIC8gMiA6IHBvc0F4aXMubDJwKGxjZW50ZXIpICsgYlBvc1B4T2Zmc2V0O1xuXG4gICAgICAgIHZhciByID0gdHJhY2Uud2hpc2tlcndpZHRoO1xuICAgICAgICB2YXIgcG9zdzAgPSBwb3NIYXNSYW5nZUJyZWFrcyA/IHBvczAgKiByICsgKDEgLSByKSAqIHBvc2MgOiBwb3NBeGlzLmwycChsY2VudGVyIC0gd2RQb3MpICsgYlBvc1B4T2Zmc2V0O1xuICAgICAgICB2YXIgcG9zdzEgPSBwb3NIYXNSYW5nZUJyZWFrcyA/IHBvczEgKiByICsgKDEgLSByKSAqIHBvc2MgOiBwb3NBeGlzLmwycChsY2VudGVyICsgd2RQb3MpICsgYlBvc1B4T2Zmc2V0O1xuXG4gICAgICAgIHZhciBwb3NtMCA9IHBvc0F4aXMubDJwKGxjZW50ZXIgLSBiZFBvczAgKiBudykgKyBiUG9zUHhPZmZzZXQ7XG4gICAgICAgIHZhciBwb3NtMSA9IHBvc0F4aXMubDJwKGxjZW50ZXIgKyBiZFBvczEgKiBudykgKyBiUG9zUHhPZmZzZXQ7XG4gICAgICAgIHZhciBxMSA9IHZhbEF4aXMuYzJwKGQucTEsIHRydWUpO1xuICAgICAgICB2YXIgcTMgPSB2YWxBeGlzLmMycChkLnEzLCB0cnVlKTtcbiAgICAgICAgLy8gbWFrZSBzdXJlIG1lZGlhbiBpc24ndCBpZGVudGljYWwgdG8gZWl0aGVyIG9mIHRoZVxuICAgICAgICAvLyBxdWFydGlsZXMsIHNvIHdlIGNhbiBzZWUgaXRcbiAgICAgICAgdmFyIG0gPSBMaWIuY29uc3RyYWluKFxuICAgICAgICAgICAgdmFsQXhpcy5jMnAoZC5tZWQsIHRydWUpLFxuICAgICAgICAgICAgTWF0aC5taW4ocTEsIHEzKSArIDEsIE1hdGgubWF4KHExLCBxMykgLSAxXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBib3gsIHZpb2xpbiwgYW5kIGNhbmRsZXN0aWNrXG4gICAgICAgIC8vIHBlcmhhcHMgd2Ugc2hvdWxkIHB1dCB0aGlzIGludG8gY2QwLnQgaW5zdGVhZCBzbyBpdCdzIG1vcmUgZXhwbGljaXQsXG4gICAgICAgIC8vIGJ1dCB3aGF0IHdlIGhhdmUgbm93IGlzOlxuICAgICAgICAvLyAtIGJveCBhbHdheXMgaGFzIGQubGYsIGJ1dCBib3hwb2ludHMgY2FuIGJlIGFueXRoaW5nXG4gICAgICAgIC8vIC0gdmlvbGluIGhhcyBkLmxmIGFuZCBzaG91bGQgYWx3YXlzIHVzZSBpdCAoYm94cG9pbnRzIGlzIHVuZGVmaW5lZClcbiAgICAgICAgLy8gLSBjYW5kbGVzdGljayBoYXMgb25seSBtaW4vbWF4XG4gICAgICAgIHZhciB1c2VFeHRyZW1lcyA9IChkLmxmID09PSB1bmRlZmluZWQpIHx8ICh0cmFjZS5ib3hwb2ludHMgPT09IGZhbHNlKTtcbiAgICAgICAgdmFyIGxmID0gdmFsQXhpcy5jMnAodXNlRXh0cmVtZXMgPyBkLm1pbiA6IGQubGYsIHRydWUpO1xuICAgICAgICB2YXIgdWYgPSB2YWxBeGlzLmMycCh1c2VFeHRyZW1lcyA/IGQubWF4IDogZC51ZiwgdHJ1ZSk7XG4gICAgICAgIHZhciBsbiA9IHZhbEF4aXMuYzJwKGQubG4sIHRydWUpO1xuICAgICAgICB2YXIgdW4gPSB2YWxBeGlzLmMycChkLnVuLCB0cnVlKTtcblxuICAgICAgICBpZihpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkJyxcbiAgICAgICAgICAgICAgICAnTScgKyBtICsgJywnICsgcG9zbTAgKyAnVicgKyBwb3NtMSArIC8vIG1lZGlhbiBsaW5lXG4gICAgICAgICAgICAgICAgJ00nICsgcTEgKyAnLCcgKyBwb3MwICsgJ1YnICsgcG9zMSArIC8vIGxlZnQgZWRnZVxuICAgICAgICAgICAgICAgIChub3RjaGVkID9cbiAgICAgICAgICAgICAgICAgICAgJ0gnICsgbG4gKyAnTCcgKyBtICsgJywnICsgcG9zbTEgKyAnTCcgKyB1biArICcsJyArIHBvczEgOlxuICAgICAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICAgICkgKyAvLyB0b3Agbm90Y2hlZCBlZGdlXG4gICAgICAgICAgICAgICAgJ0gnICsgcTMgKyAvLyBlbmQgb2YgdGhlIHRvcCBlZGdlXG4gICAgICAgICAgICAgICAgJ1YnICsgcG9zMCArIC8vIHJpZ2h0IGVkZ2VcbiAgICAgICAgICAgICAgICAobm90Y2hlZCA/ICdIJyArIHVuICsgJ0wnICsgbSArICcsJyArIHBvc20wICsgJ0wnICsgbG4gKyAnLCcgKyBwb3MwIDogJycpICsgLy8gYm90dG9tIG5vdGNoZWQgZWRnZVxuICAgICAgICAgICAgICAgICdaJyArIC8vIGVuZCBvZiB0aGUgYm94XG4gICAgICAgICAgICAgICAgJ00nICsgcTEgKyAnLCcgKyBwb3NjICsgJ0gnICsgbGYgKyAnTScgKyBxMyArICcsJyArIHBvc2MgKyAnSCcgKyB1ZiArIC8vIHdoaXNrZXJzXG4gICAgICAgICAgICAgICAgKHdoaXNrZXJXaWR0aCA9PT0gMCA/XG4gICAgICAgICAgICAgICAgICAgICcnIDogLy8gd2hpc2tlciBjYXBzXG4gICAgICAgICAgICAgICAgICAgICdNJyArIGxmICsgJywnICsgcG9zdzAgKyAnVicgKyBwb3N3MSArICdNJyArIHVmICsgJywnICsgcG9zdzAgKyAnVicgKyBwb3N3MVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignZCcsXG4gICAgICAgICAgICAgICAgJ00nICsgcG9zbTAgKyAnLCcgKyBtICsgJ0gnICsgcG9zbTEgKyAvLyBtZWRpYW4gbGluZVxuICAgICAgICAgICAgICAgICdNJyArIHBvczAgKyAnLCcgKyBxMSArICdIJyArIHBvczEgKyAvLyB0b3Agb2YgdGhlIGJveFxuICAgICAgICAgICAgICAgIChub3RjaGVkID9cbiAgICAgICAgICAgICAgICAgICAgJ1YnICsgbG4gKyAnTCcgKyBwb3NtMSArICcsJyArIG0gKyAnTCcgKyBwb3MxICsgJywnICsgdW4gOlxuICAgICAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICAgICkgKyAvLyBub3RjaGVkIHJpZ2h0IGVkZ2VcbiAgICAgICAgICAgICAgICAnVicgKyBxMyArIC8vIGVuZCBvZiB0aGUgcmlnaHQgZWRnZVxuICAgICAgICAgICAgICAgICdIJyArIHBvczAgKyAvLyBib3R0b20gb2YgdGhlIGJveFxuICAgICAgICAgICAgICAgIChub3RjaGVkID9cbiAgICAgICAgICAgICAgICAgICAgJ1YnICsgdW4gKyAnTCcgKyBwb3NtMCArICcsJyArIG0gKyAnTCcgKyBwb3MwICsgJywnICsgbG4gOlxuICAgICAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgICAgICkgKyAvLyBub3RjaGVkIGxlZnQgZWRnZVxuICAgICAgICAgICAgICAgICdaJyArIC8vIGVuZCBvZiB0aGUgYm94XG4gICAgICAgICAgICAgICAgJ00nICsgcG9zYyArICcsJyArIHExICsgJ1YnICsgbGYgKyAnTScgKyBwb3NjICsgJywnICsgcTMgKyAnVicgKyB1ZiArIC8vIHdoaXNrZXJzXG4gICAgICAgICAgICAgICAgKHdoaXNrZXJXaWR0aCA9PT0gMCA/XG4gICAgICAgICAgICAgICAgICAgICcnIDogLy8gd2hpc2tlciBjYXBzXG4gICAgICAgICAgICAgICAgICAgICdNJyArIHBvc3cwICsgJywnICsgbGYgKyAnSCcgKyBwb3N3MSArICdNJyArIHBvc3cwICsgJywnICsgdWYgKyAnSCcgKyBwb3N3MVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcGxvdFBvaW50cyhzZWwsIGF4ZXMsIHRyYWNlLCB0KSB7XG4gICAgdmFyIHhhID0gYXhlcy54O1xuICAgIHZhciB5YSA9IGF4ZXMueTtcbiAgICB2YXIgYmRQb3MgPSB0LmJkUG9zO1xuICAgIHZhciBiUG9zID0gdC5iUG9zO1xuXG4gICAgLy8gdG8gc3VwcG9ydCB2aW9saW4gcG9pbnRzXG4gICAgdmFyIG1vZGUgPSB0cmFjZS5ib3hwb2ludHMgfHwgdHJhY2UucG9pbnRzO1xuXG4gICAgLy8gcmVwZWF0YWJsZSBwc2V1ZG8tcmFuZG9tIG51bWJlciBnZW5lcmF0b3JcbiAgICBMaWIuc2VlZFBzZXVkb1JhbmRvbSgpO1xuXG4gICAgLy8gc2luY2UgYm94IHBsb3QgcG9pbnRzIGdldCBhbiBleHRyYSBsZXZlbCBvZiBuZXN0aW5nLCBlYWNoXG4gICAgLy8gYm94IG5lZWRzIHRoZSB0cmFjZSBzdHlsaW5nIGluZm9cbiAgICB2YXIgZm4gPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIGQuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICB2LnQgPSB0O1xuICAgICAgICAgICAgdi50cmFjZSA9IHRyYWNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfTtcblxuICAgIHZhciBnUG9pbnRzID0gc2VsLnNlbGVjdEFsbCgnZy5wb2ludHMnKVxuICAgICAgICAuZGF0YShtb2RlID8gZm4gOiBbXSk7XG5cbiAgICBnUG9pbnRzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BvaW50cycpO1xuXG4gICAgZ1BvaW50cy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICB2YXIgcGF0aHMgPSBnUG9pbnRzLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAgIC5kYXRhKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgdmFyIHB0cyA9IGQucHRzMjtcblxuICAgICAgICAgICAgLy8gbm9ybWFsbHkgdXNlIElRUiwgYnV0IGlmIHRoaXMgaXMgMCBvciB0b28gc21hbGwsIHVzZSBtYXgtbWluXG4gICAgICAgICAgICB2YXIgdHlwaWNhbFNwcmVhZCA9IE1hdGgubWF4KChkLm1heCAtIGQubWluKSAvIDEwLCBkLnEzIC0gZC5xMSk7XG4gICAgICAgICAgICB2YXIgbWluU3ByZWFkID0gdHlwaWNhbFNwcmVhZCAqIDFlLTk7XG4gICAgICAgICAgICB2YXIgc3ByZWFkTGltaXQgPSB0eXBpY2FsU3ByZWFkICogSklUVEVSU1BSRUFEO1xuICAgICAgICAgICAgdmFyIGppdHRlckZhY3RvcnMgPSBbXTtcbiAgICAgICAgICAgIHZhciBtYXhKaXR0ZXJGYWN0b3IgPSAwO1xuICAgICAgICAgICAgdmFyIG5ld0ppdHRlcjtcblxuICAgICAgICAgICAgLy8gZHluYW1pYyBqaXR0ZXJcbiAgICAgICAgICAgIGlmKHRyYWNlLmppdHRlcikge1xuICAgICAgICAgICAgICAgIGlmKHR5cGljYWxTcHJlYWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZWRnZSBjYXNlIG9mIG5vIHNwcmVhZCBhdCBhbGw6IGZhbGwgYmFjayB0byBtYXggaml0dGVyXG4gICAgICAgICAgICAgICAgICAgIG1heEppdHRlckZhY3RvciA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGppdHRlckZhY3RvcnMgPSBuZXcgQXJyYXkocHRzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaml0dGVyRmFjdG9yc1tpXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpMCA9IE1hdGgubWF4KDAsIGkgLSBKSVRURVJDT1VOVCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG1pbiA9IHB0c1tpMF0udjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpMSA9IE1hdGgubWluKHB0cy5sZW5ndGggLSAxLCBpICsgSklUVEVSQ09VTlQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBtYXggPSBwdHNbaTFdLnY7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vZGUgIT09ICdhbGwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocHRzW2ldLnYgPCBkLmxmKSBwbWF4ID0gTWF0aC5taW4ocG1heCwgZC5sZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBwbWluID0gTWF0aC5tYXgocG1pbiwgZC51Zik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqaXR0ZXJGYWN0b3IgPSBNYXRoLnNxcnQoc3ByZWFkTGltaXQgKiAoaTEgLSBpMCkgLyAocG1heCAtIHBtaW4gKyBtaW5TcHJlYWQpKSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaml0dGVyRmFjdG9yID0gTGliLmNvbnN0cmFpbihNYXRoLmFicyhqaXR0ZXJGYWN0b3IpLCAwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaml0dGVyRmFjdG9ycy5wdXNoKGppdHRlckZhY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhKaXR0ZXJGYWN0b3IgPSBNYXRoLm1heChqaXR0ZXJGYWN0b3IsIG1heEppdHRlckZhY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3Sml0dGVyID0gdHJhY2Uuaml0dGVyICogMiAvIChtYXhKaXR0ZXJGYWN0b3IgfHwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpbGxzIGluICd4JyBhbmQgJ3knIGluIGNhbGNkYXRhICdwdHMnIGl0ZW1cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBwdCA9IHB0c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IHB0LnY7XG5cbiAgICAgICAgICAgICAgICB2YXIgaml0dGVyT2Zmc2V0ID0gdHJhY2Uuaml0dGVyID9cbiAgICAgICAgICAgICAgICAgICAgKG5ld0ppdHRlciAqIGppdHRlckZhY3RvcnNbaV0gKiAoTGliLnBzZXVkb1JhbmRvbSgpIC0gMC41KSkgOlxuICAgICAgICAgICAgICAgICAgICAwO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBvc1B4ID0gZC5wb3MgKyBiUG9zICsgYmRQb3MgKiAodHJhY2UucG9pbnRwb3MgKyBqaXR0ZXJPZmZzZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICAgICAgICAgICAgICBwdC55ID0gcG9zUHg7XG4gICAgICAgICAgICAgICAgICAgIHB0LnggPSB2O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHB0LnggPSBwb3NQeDtcbiAgICAgICAgICAgICAgICAgICAgcHQueSA9IHY7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdGFnIHN1c3BlY3RlZCBvdXRsaWVyc1xuICAgICAgICAgICAgICAgIGlmKG1vZGUgPT09ICdzdXNwZWN0ZWRvdXRsaWVycycgJiYgdiA8IGQudW8gJiYgdiA+IGQubG8pIHtcbiAgICAgICAgICAgICAgICAgICAgcHQuc28gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHB0cztcbiAgICAgICAgfSk7XG5cbiAgICBwYXRocy5lbnRlcigpLmFwcGVuZCgncGF0aCcpXG4gICAgICAgIC5jbGFzc2VkKCdwb2ludCcsIHRydWUpO1xuXG4gICAgcGF0aHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgcGF0aHMuY2FsbChEcmF3aW5nLnRyYW5zbGF0ZVBvaW50cywgeGEsIHlhKTtcbn1cblxuZnVuY3Rpb24gcGxvdEJveE1lYW4oc2VsLCBheGVzLCB0cmFjZSwgdCkge1xuICAgIHZhciB2YWxBeGlzID0gYXhlcy52YWw7XG4gICAgdmFyIHBvc0F4aXMgPSBheGVzLnBvcztcbiAgICB2YXIgcG9zSGFzUmFuZ2VCcmVha3MgPSAhIXBvc0F4aXMucmFuZ2VicmVha3M7XG5cbiAgICB2YXIgYlBvcyA9IHQuYlBvcztcbiAgICB2YXIgYlBvc1B4T2Zmc2V0ID0gdC5iUG9zUHhPZmZzZXQgfHwgMDtcblxuICAgIC8vIHRvIHN1cHBvcnQgdmlvbGluIG1lYW4gbGluZXNcbiAgICB2YXIgbW9kZSA9IHRyYWNlLmJveG1lYW4gfHwgKHRyYWNlLm1lYW5saW5lIHx8IHt9KS52aXNpYmxlO1xuXG4gICAgLy8gdG8gc3VwcG9ydCBmb3Igb25lLXNpZGVkIGJveFxuICAgIHZhciBiZFBvczA7XG4gICAgdmFyIGJkUG9zMTtcbiAgICBpZihBcnJheS5pc0FycmF5KHQuYmRQb3MpKSB7XG4gICAgICAgIGJkUG9zMCA9IHQuYmRQb3NbMF07XG4gICAgICAgIGJkUG9zMSA9IHQuYmRQb3NbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmRQb3MwID0gdC5iZFBvcztcbiAgICAgICAgYmRQb3MxID0gdC5iZFBvcztcbiAgICB9XG5cbiAgICB2YXIgcGF0aHMgPSBzZWwuc2VsZWN0QWxsKCdwYXRoLm1lYW4nKS5kYXRhKChcbiAgICAgICAgKHRyYWNlLnR5cGUgPT09ICdib3gnICYmIHRyYWNlLmJveG1lYW4pIHx8XG4gICAgICAgICh0cmFjZS50eXBlID09PSAndmlvbGluJyAmJiB0cmFjZS5ib3gudmlzaWJsZSAmJiB0cmFjZS5tZWFubGluZS52aXNpYmxlKVxuICAgICkgPyBMaWIuaWRlbnRpdHkgOiBbXSk7XG5cbiAgICBwYXRocy5lbnRlcigpLmFwcGVuZCgncGF0aCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdtZWFuJylcbiAgICAgICAgLnN0eWxlKHtcbiAgICAgICAgICAgIGZpbGw6ICdub25lJyxcbiAgICAgICAgICAgICd2ZWN0b3ItZWZmZWN0JzogJ25vbi1zY2FsaW5nLXN0cm9rZSdcbiAgICAgICAgfSk7XG5cbiAgICBwYXRocy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICBwYXRocy5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIGxjZW50ZXIgPSBwb3NBeGlzLmMybChkLnBvcyArIGJQb3MsIHRydWUpO1xuXG4gICAgICAgIHZhciBwb3MwID0gcG9zQXhpcy5sMnAobGNlbnRlciAtIGJkUG9zMCkgKyBiUG9zUHhPZmZzZXQ7XG4gICAgICAgIHZhciBwb3MxID0gcG9zQXhpcy5sMnAobGNlbnRlciArIGJkUG9zMSkgKyBiUG9zUHhPZmZzZXQ7XG4gICAgICAgIHZhciBwb3NjID0gcG9zSGFzUmFuZ2VCcmVha3MgPyAocG9zMCArIHBvczEpIC8gMiA6IHBvc0F4aXMubDJwKGxjZW50ZXIpICsgYlBvc1B4T2Zmc2V0O1xuXG4gICAgICAgIHZhciBtID0gdmFsQXhpcy5jMnAoZC5tZWFuLCB0cnVlKTtcbiAgICAgICAgdmFyIHNsID0gdmFsQXhpcy5jMnAoZC5tZWFuIC0gZC5zZCwgdHJ1ZSk7XG4gICAgICAgIHZhciBzaCA9IHZhbEF4aXMuYzJwKGQubWVhbiArIGQuc2QsIHRydWUpO1xuXG4gICAgICAgIGlmKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkJyxcbiAgICAgICAgICAgICAgICAnTScgKyBtICsgJywnICsgcG9zMCArICdWJyArIHBvczEgK1xuICAgICAgICAgICAgICAgIChtb2RlID09PSAnc2QnID9cbiAgICAgICAgICAgICAgICAgICAgJ20wLDBMJyArIHNsICsgJywnICsgcG9zYyArICdMJyArIG0gKyAnLCcgKyBwb3MwICsgJ0wnICsgc2ggKyAnLCcgKyBwb3NjICsgJ1onIDpcbiAgICAgICAgICAgICAgICAgICAgJycpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2QnLFxuICAgICAgICAgICAgICAgICdNJyArIHBvczAgKyAnLCcgKyBtICsgJ0gnICsgcG9zMSArXG4gICAgICAgICAgICAgICAgKG1vZGUgPT09ICdzZCcgP1xuICAgICAgICAgICAgICAgICAgICAnbTAsMEwnICsgcG9zYyArICcsJyArIHNsICsgJ0wnICsgcG9zMCArICcsJyArIG0gKyAnTCcgKyBwb3NjICsgJywnICsgc2ggKyAnWicgOlxuICAgICAgICAgICAgICAgICAgICAnJylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcGxvdDogcGxvdCxcbiAgICBwbG90Qm94QW5kV2hpc2tlcnM6IHBsb3RCb3hBbmRXaGlza2VycyxcbiAgICBwbG90UG9pbnRzOiBwbG90UG9pbnRzLFxuICAgIHBsb3RCb3hNZWFuOiBwbG90Qm94TWVhblxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=