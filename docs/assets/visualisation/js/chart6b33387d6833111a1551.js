(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_violin_js"],{

/***/ "./node_modules/plotly.js/lib/violin.js":
/*!**********************************************!*\
  !*** ./node_modules/plotly.js/lib/violin.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/violin */ "./node_modules/plotly.js/src/traces/violin/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/attributes.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/attributes.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var boxAttrs = __webpack_require__(/*! ../box/attributes */ "./node_modules/plotly.js/src/traces/box/attributes.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = {
    y: boxAttrs.y,
    x: boxAttrs.x,
    x0: boxAttrs.x0,
    y0: boxAttrs.y0,
    name: extendFlat({}, boxAttrs.name, {
        description: [
            'Sets the trace name.',
            'The trace name appear as the legend item and on hover.',
            'For violin traces, the name will also be used for the position',
            'coordinate, if `x` and `x0` (`y` and `y0` if horizontal) are',
            'missing and the position axis is categorical.',
            'Note that the trace name is also used as a default value',
            'for attribute `scalegroup` (please see its description for details).'
        ].join(' ')
    }),
    orientation: extendFlat({}, boxAttrs.orientation, {
        description: [
            'Sets the orientation of the violin(s).',
            'If *v* (*h*), the distribution is visualized along',
            'the vertical (horizontal).'
        ].join(' ')
    }),

    bandwidth: {
        valType: 'number',
        min: 0,
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the bandwidth used to compute the kernel density estimate.',
            'By default, the bandwidth is determined by Silverman\'s rule of thumb.'
        ].join(' ')
    },

    scalegroup: {
        valType: 'string',
        role: 'info',
        dflt: '',
        editType: 'calc',
        description: [
            'If there are multiple violins that should be sized according to',
            'to some metric (see `scalemode`), link them by providing a non-empty group id here',
            'shared by every trace in the same group.',
            'If a violin\'s `width` is undefined, `scalegroup` will default to the trace\'s name.',
            'In this case, violins with the same names will be linked together'
        ].join(' ')
    },
    scalemode: {
        valType: 'enumerated',
        values: ['width', 'count'],
        dflt: 'width',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the metric by which the width of each violin is determined.',
            '*width* means each violin has the same (max) width',
            '*count* means the violins are scaled by the number of sample points making',
            'up each violin.'
        ].join('')
    },

    spanmode: {
        valType: 'enumerated',
        values: ['soft', 'hard', 'manual'],
        dflt: 'soft',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the method by which the span in data space where the density function will be computed.',
            '*soft* means the span goes from the sample\'s minimum value minus two bandwidths',
            'to the sample\'s maximum value plus two bandwidths.',
            '*hard* means the span goes from the sample\'s minimum to its maximum value.',
            'For custom span settings, use mode *manual* and fill in the `span` attribute.'
        ].join(' ')
    },
    span: {
        valType: 'info_array',
        items: [
            {valType: 'any', editType: 'calc'},
            {valType: 'any', editType: 'calc'}
        ],
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the span in data space for which the density function will be computed.',
            'Has an effect only when `spanmode` is set to *manual*.'
        ].join(' ')
    },

    line: {
        color: {
            valType: 'color',
            role: 'style',
            editType: 'style',
            description: 'Sets the color of line bounding the violin(s).'
        },
        width: {
            valType: 'number',
            role: 'style',
            min: 0,
            dflt: 2,
            editType: 'style',
            description: 'Sets the width (in px) of line bounding the violin(s).'
        },
        editType: 'plot'
    },
    fillcolor: boxAttrs.fillcolor,

    points: extendFlat({}, boxAttrs.boxpoints, {
        description: [
            'If *outliers*, only the sample points lying outside the whiskers',
            'are shown',
            'If *suspectedoutliers*, the outlier points are shown and',
            'points either less than 4*Q1-3*Q3 or greater than 4*Q3-3*Q1',
            'are highlighted (see `outliercolor`)',
            'If *all*, all sample points are shown',
            'If *false*, only the violins are shown with no sample points.',
            'Defaults to *suspectedoutliers* when `marker.outliercolor` or',
            '`marker.line.outliercolor` is set,',
            'otherwise defaults to *outliers*.'
        ].join(' ')
    }),
    jitter: extendFlat({}, boxAttrs.jitter, {
        description: [
            'Sets the amount of jitter in the sample points drawn.',
            'If *0*, the sample points align along the distribution axis.',
            'If *1*, the sample points are drawn in a random jitter of width',
            'equal to the width of the violins.'
        ].join(' ')
    }),
    pointpos: extendFlat({}, boxAttrs.pointpos, {
        description: [
            'Sets the position of the sample points in relation to the violins.',
            'If *0*, the sample points are places over the center of the violins.',
            'Positive (negative) values correspond to positions to the',
            'right (left) for vertical violins and above (below) for horizontal violins.'
        ].join(' ')
    }),

    width: extendFlat({}, boxAttrs.width, {
        description: [
            'Sets the width of the violin in data coordinates.',
            'If *0* (default value) the width is automatically selected based on the positions',
            'of other violin traces in the same subplot.',
        ].join(' ')
    }),

    marker: boxAttrs.marker,
    text: boxAttrs.text,
    hovertext: boxAttrs.hovertext,
    hovertemplate: boxAttrs.hovertemplate,

    box: {
        visible: {
            valType: 'boolean',
            dflt: false,
            role: 'info',
            editType: 'plot',
            description: [
                'Determines if an miniature box plot is drawn inside the violins. '
            ].join(' ')
        },
        width: {
            valType: 'number',
            min: 0,
            max: 1,
            dflt: 0.25,
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the width of the inner box plots relative to',
                'the violins\' width.',
                'For example, with 1, the inner box plots are as wide as the violins.'
            ].join(' ')
        },
        fillcolor: {
            valType: 'color',
            role: 'style',
            editType: 'style',
            description: 'Sets the inner box plot fill color.'
        },
        line: {
            color: {
                valType: 'color',
                role: 'style',
                editType: 'style',
                description: 'Sets the inner box plot bounding line color.'
            },
            width: {
                valType: 'number',
                min: 0,
                role: 'style',
                editType: 'style',
                description: 'Sets the inner box plot bounding line width.'
            },
            editType: 'style'
        },
        editType: 'plot'
    },

    meanline: {
        visible: {
            valType: 'boolean',
            dflt: false,
            role: 'info',
            editType: 'plot',
            description: [
                'Determines if a line corresponding to the sample\'s mean is shown',
                'inside the violins.',
                'If `box.visible` is turned on, the mean line is drawn inside the inner box.',
                'Otherwise, the mean line is drawn from one side of the violin to other.'
            ].join(' ')
        },
        color: {
            valType: 'color',
            role: 'style',
            editType: 'style',
            description: 'Sets the mean line color.'
        },
        width: {
            valType: 'number',
            min: 0,
            role: 'style',
            editType: 'style',
            description: 'Sets the mean line width.'
        },
        editType: 'plot'
    },

    side: {
        valType: 'enumerated',
        values: ['both', 'positive', 'negative'],
        dflt: 'both',
        role: 'info',
        editType: 'calc',
        description: [
            'Determines on which side of the position value the density function making up',
            'one half of a violin is plotted.',
            'Useful when comparing two violin traces under *overlay* mode, where one trace',
            'has `side` set to *positive* and the other to *negative*.'
        ].join(' ')
    },

    offsetgroup: boxAttrs.offsetgroup,
    alignmentgroup: boxAttrs.alignmentgroup,

    selected: boxAttrs.selected,
    unselected: boxAttrs.unselected,

    hoveron: {
        valType: 'flaglist',
        flags: ['violins', 'points', 'kde'],
        dflt: 'violins+points+kde',
        extras: ['all'],
        role: 'info',
        editType: 'style',
        description: [
            'Do the hover effects highlight individual violins',
            'or sample points or the kernel density estimate or any combination of them?'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/calc.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/calc.js ***!
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
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var boxCalc = __webpack_require__(/*! ../box/calc */ "./node_modules/plotly.js/src/traces/box/calc.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/violin/helpers.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function calc(gd, trace) {
    var cd = boxCalc(gd, trace);

    if(cd[0].t.empty) return cd;

    var fullLayout = gd._fullLayout;
    var valAxis = Axes.getFromId(
        gd,
        trace[trace.orientation === 'h' ? 'xaxis' : 'yaxis']
    );

    var spanMin = Infinity;
    var spanMax = -Infinity;
    var maxKDE = 0;
    var maxCount = 0;

    for(var i = 0; i < cd.length; i++) {
        var cdi = cd[i];
        var vals = cdi.pts.map(helpers.extractVal);

        var bandwidth = cdi.bandwidth = calcBandwidth(trace, cdi, vals);
        var span = cdi.span = calcSpan(trace, cdi, valAxis, bandwidth);

        if(cdi.min === cdi.max && bandwidth === 0) {
            // if span is zero and bandwidth is zero, we want a violin with zero width
            span = cdi.span = [cdi.min, cdi.max];
            cdi.density = [{v: 1, t: span[0]}];
            cdi.bandwidth = bandwidth;
            maxKDE = Math.max(maxKDE, 1);
        } else {
            // step that well covers the bandwidth and is multiple of span distance
            var dist = span[1] - span[0];
            var n = Math.ceil(dist / (bandwidth / 3));
            var step = dist / n;

            if(!isFinite(step) || !isFinite(n)) {
                Lib.error('Something went wrong with computing the violin span');
                cd[0].t.empty = true;
                return cd;
            }

            var kde = helpers.makeKDE(cdi, trace, vals);
            cdi.density = new Array(n);

            for(var k = 0, t = span[0]; t < (span[1] + step / 2); k++, t += step) {
                var v = kde(t);
                cdi.density[k] = {v: v, t: t};
                maxKDE = Math.max(maxKDE, v);
            }
        }

        maxCount = Math.max(maxCount, vals.length);
        spanMin = Math.min(spanMin, span[0]);
        spanMax = Math.max(spanMax, span[1]);
    }

    var extremes = Axes.findExtremes(valAxis, [spanMin, spanMax], {padded: true});
    trace._extremes[valAxis._id] = extremes;

    if(trace.width) {
        cd[0].t.maxKDE = maxKDE;
    } else {
        var violinScaleGroupStats = fullLayout._violinScaleGroupStats;
        var scaleGroup = trace.scalegroup;
        var groupStats = violinScaleGroupStats[scaleGroup];

        if(groupStats) {
            groupStats.maxKDE = Math.max(groupStats.maxKDE, maxKDE);
            groupStats.maxCount = Math.max(groupStats.maxCount, maxCount);
        } else {
            violinScaleGroupStats[scaleGroup] = {
                maxKDE: maxKDE,
                maxCount: maxCount
            };
        }
    }

    cd[0].t.labels.kde = Lib._(gd, 'kde:');

    return cd;
};

// Default to Silveman's rule of thumb
// - https://stats.stackexchange.com/a/6671
// - https://en.wikipedia.org/wiki/Kernel_density_estimation#A_rule-of-thumb_bandwidth_estimator
// - https://github.com/statsmodels/statsmodels/blob/master/statsmodels/nonparametric/bandwidths.py
function silvermanRule(len, ssd, iqr) {
    var a = Math.min(ssd, iqr / 1.349);
    return 1.059 * a * Math.pow(len, -0.2);
}

function calcBandwidth(trace, cdi, vals) {
    var span = cdi.max - cdi.min;

    // If span is zero
    if(!span) {
        if(trace.bandwidth) {
            return trace.bandwidth;
        } else {
            // if span is zero and no bandwidth is specified
            // it returns zero bandwidth which is a special case
            return 0;
        }
    }

    // Limit how small the bandwidth can be.
    //
    // Silverman's rule of thumb can be "very" small
    // when IQR does a poor job at describing the spread
    // of the distribution.
    // We also want to limit custom bandwidths
    // to not blow up kde computations.

    if(trace.bandwidth) {
        return Math.max(trace.bandwidth, span / 1e4);
    } else {
        var len = vals.length;
        var ssd = Lib.stdev(vals, len - 1, cdi.mean);
        return Math.max(
            silvermanRule(len, ssd, cdi.q3 - cdi.q1),
            span / 100
        );
    }
}

function calcSpan(trace, cdi, valAxis, bandwidth) {
    var spanmode = trace.spanmode;
    var spanIn = trace.span || [];
    var spanTight = [cdi.min, cdi.max];
    var spanLoose = [cdi.min - 2 * bandwidth, cdi.max + 2 * bandwidth];
    var spanOut;

    function calcSpanItem(index) {
        var s = spanIn[index];
        var sc = valAxis.type === 'multicategory' ?
            valAxis.r2c(s) :
            valAxis.d2c(s, 0, trace[cdi.valLetter + 'calendar']);
        return sc === BADNUM ? spanLoose[index] : sc;
    }

    if(spanmode === 'soft') {
        spanOut = spanLoose;
    } else if(spanmode === 'hard') {
        spanOut = spanTight;
    } else {
        spanOut = [calcSpanItem(0), calcSpanItem(1)];
    }

    // to reuse the equal-range-item block
    var dummyAx = {
        type: 'linear',
        range: spanOut
    };
    Axes.setConvert(dummyAx);
    dummyAx.cleanRange();

    return spanOut;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/cross_trace_calc.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/cross_trace_calc.js ***!
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



var setPositionOffset = __webpack_require__(/*! ../box/cross_trace_calc */ "./node_modules/plotly.js/src/traces/box/cross_trace_calc.js").setPositionOffset;
var orientations = ['v', 'h'];

module.exports = function crossTraceCalc(gd, plotinfo) {
    var calcdata = gd.calcdata;
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    for(var i = 0; i < orientations.length; i++) {
        var orientation = orientations[i];
        var posAxis = orientation === 'h' ? ya : xa;
        var violinList = [];

        for(var j = 0; j < calcdata.length; j++) {
            var cd = calcdata[j];
            var t = cd[0].t;
            var trace = cd[0].trace;

            if(trace.visible === true && trace.type === 'violin' &&
                    !t.empty &&
                    trace.orientation === orientation &&
                    trace.xaxis === xa._id &&
                    trace.yaxis === ya._id
              ) {
                violinList.push(j);
            }
        }

        setPositionOffset('violin', gd, violinList, posAxis);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/defaults.js ***!
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var boxDefaults = __webpack_require__(/*! ../box/defaults */ "./node_modules/plotly.js/src/traces/box/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/violin/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }
    function coerce2(attr, dflt) {
        return Lib.coerce2(traceIn, traceOut, attributes, attr, dflt);
    }

    boxDefaults.handleSampleDefaults(traceIn, traceOut, coerce, layout);
    if(traceOut.visible === false) return;

    coerce('bandwidth');
    coerce('side');

    var width = coerce('width');
    if(!width) {
        coerce('scalegroup', traceOut.name);
        coerce('scalemode');
    }

    var span = coerce('span');
    var spanmodeDflt;
    if(Array.isArray(span)) spanmodeDflt = 'manual';
    coerce('spanmode', spanmodeDflt);

    var lineColor = coerce('line.color', (traceIn.marker || {}).color || defaultColor);
    var lineWidth = coerce('line.width');
    var fillColor = coerce('fillcolor', Color.addOpacity(traceOut.line.color, 0.5));

    boxDefaults.handlePointsDefaults(traceIn, traceOut, coerce, {prefix: ''});

    var boxWidth = coerce2('box.width');
    var boxFillColor = coerce2('box.fillcolor', fillColor);
    var boxLineColor = coerce2('box.line.color', lineColor);
    var boxLineWidth = coerce2('box.line.width', lineWidth);
    var boxVisible = coerce('box.visible', Boolean(boxWidth || boxFillColor || boxLineColor || boxLineWidth));
    if(!boxVisible) traceOut.box = {visible: false};

    var meanLineColor = coerce2('meanline.color', lineColor);
    var meanLineWidth = coerce2('meanline.width', lineWidth);
    var meanLineVisible = coerce('meanline.visible', Boolean(meanLineColor || meanLineWidth));
    if(!meanLineVisible) traceOut.meanline = {visible: false};
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/helpers.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/helpers.js ***!
  \*************************************************************/
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

// Maybe add kernels more down the road,
// but note that the default `spanmode: 'soft'` bounds might have
// to become kernel-dependent
var kernels = {
    gaussian: function(v) {
        return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * v * v);
    }
};

exports.makeKDE = function(calcItem, trace, vals) {
    var len = vals.length;
    var kernel = kernels.gaussian;
    var bandwidth = calcItem.bandwidth;
    var factor = 1 / (len * bandwidth);

    // don't use Lib.aggNums to skip isNumeric checks
    return function(x) {
        var sum = 0;
        for(var i = 0; i < len; i++) {
            sum += kernel((x - vals[i]) / bandwidth);
        }
        return factor * sum;
    };
};

exports.getPositionOnKdePath = function(calcItem, trace, valuePx) {
    var posLetter, valLetter;

    if(trace.orientation === 'h') {
        posLetter = 'y';
        valLetter = 'x';
    } else {
        posLetter = 'x';
        valLetter = 'y';
    }

    var pointOnPath = Lib.findPointOnPath(
        calcItem.path,
        valuePx,
        valLetter,
        {pathLength: calcItem.pathLength}
    );

    var posCenterPx = calcItem.posCenterPx;
    var posOnPath0 = pointOnPath[posLetter];
    var posOnPath1 = trace.side === 'both' ?
        2 * posCenterPx - posOnPath0 :
        posCenterPx;

    return [posOnPath0, posOnPath1];
};

exports.getKdeValue = function(calcItem, trace, valueDist) {
    var vals = calcItem.pts.map(exports.extractVal);
    var kde = exports.makeKDE(calcItem, trace, vals);
    return kde(valueDist) / calcItem.posDensityScale;
};

exports.extractVal = function(o) { return o.v; };


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/hover.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/hover.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var boxHoverPoints = __webpack_require__(/*! ../box/hover */ "./node_modules/plotly.js/src/traces/box/hover.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/violin/helpers.js");

module.exports = function hoverPoints(pointData, xval, yval, hovermode, hoverLayer) {
    var cd = pointData.cd;
    var trace = cd[0].trace;
    var hoveron = trace.hoveron;
    var hasHoveronViolins = hoveron.indexOf('violins') !== -1;
    var hasHoveronKDE = hoveron.indexOf('kde') !== -1;
    var closeData = [];
    var closePtData;
    var violinLineAttrs;

    if(hasHoveronViolins || hasHoveronKDE) {
        var closeBoxData = boxHoverPoints.hoverOnBoxes(pointData, xval, yval, hovermode);

        if(hasHoveronKDE && closeBoxData.length > 0) {
            var xa = pointData.xa;
            var ya = pointData.ya;
            var pLetter, vLetter, pAxis, vAxis, vVal;

            if(trace.orientation === 'h') {
                vVal = xval;
                pLetter = 'y';
                pAxis = ya;
                vLetter = 'x';
                vAxis = xa;
            } else {
                vVal = yval;
                pLetter = 'x';
                pAxis = xa;
                vLetter = 'y';
                vAxis = ya;
            }

            var di = cd[pointData.index];

            if(vVal >= di.span[0] && vVal <= di.span[1]) {
                var kdePointData = Lib.extendFlat({}, pointData);
                var vValPx = vAxis.c2p(vVal, true);
                var kdeVal = helpers.getKdeValue(di, trace, vVal);
                var pOnPath = helpers.getPositionOnKdePath(di, trace, vValPx);
                var paOffset = pAxis._offset;
                var paLength = pAxis._length;

                kdePointData[pLetter + '0'] = pOnPath[0];
                kdePointData[pLetter + '1'] = pOnPath[1];
                kdePointData[vLetter + '0'] = kdePointData[vLetter + '1'] = vValPx;
                kdePointData[vLetter + 'Label'] = vLetter + ': ' + Axes.hoverLabelText(vAxis, vVal) + ', ' + cd[0].t.labels.kde + ' ' + kdeVal.toFixed(3);

                // move the spike to the KDE point
                kdePointData.spikeDistance = closeBoxData[0].spikeDistance;
                var spikePosAttr = pLetter + 'Spike';
                kdePointData[spikePosAttr] = closeBoxData[0][spikePosAttr];
                closeBoxData[0].spikeDistance = undefined;
                closeBoxData[0][spikePosAttr] = undefined;

                // no hovertemplate support yet
                kdePointData.hovertemplate = false;

                closeData.push(kdePointData);

                violinLineAttrs = {stroke: pointData.color};
                violinLineAttrs[pLetter + '1'] = Lib.constrain(paOffset + pOnPath[0], paOffset, paOffset + paLength);
                violinLineAttrs[pLetter + '2'] = Lib.constrain(paOffset + pOnPath[1], paOffset, paOffset + paLength);
                violinLineAttrs[vLetter + '1'] = violinLineAttrs[vLetter + '2'] = vAxis._offset + vValPx;
            }
        }

        if(hasHoveronViolins) {
            closeData = closeData.concat(closeBoxData);
        }
    }

    if(hoveron.indexOf('points') !== -1) {
        closePtData = boxHoverPoints.hoverOnPoints(pointData, xval, yval);
    }

    // update violin line (if any)
    var violinLine = hoverLayer.selectAll('.violinline-' + trace.uid)
        .data(violinLineAttrs ? [0] : []);
    violinLine.enter().append('line')
        .classed('violinline-' + trace.uid, true)
        .attr('stroke-width', 1.5);
    violinLine.exit().remove();
    violinLine.attr(violinLineAttrs);

    // same combine logic as box hoverPoints
    if(hovermode === 'closest') {
        if(closePtData) return [closePtData];
        return closeData;
    }
    if(closePtData) {
        closeData.push(closePtData);
        return closeData;
    }
    return closeData;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/violin/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/violin/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/violin/defaults.js"),
    crossTraceDefaults: __webpack_require__(/*! ../box/defaults */ "./node_modules/plotly.js/src/traces/box/defaults.js").crossTraceDefaults,
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/violin/layout_defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/violin/calc.js"),
    crossTraceCalc: __webpack_require__(/*! ./cross_trace_calc */ "./node_modules/plotly.js/src/traces/violin/cross_trace_calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/violin/plot.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/violin/style.js"),
    styleOnSelect: __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/violin/hover.js"),
    selectPoints: __webpack_require__(/*! ../box/select */ "./node_modules/plotly.js/src/traces/box/select.js"),

    moduleType: 'trace',
    name: 'violin',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', 'symbols', 'oriented', 'box-violin', 'showLegend', 'violinLayout', 'zoomScale'],
    meta: {
        description: [
            'In vertical (horizontal) violin plots,',
            'statistics are computed using `y` (`x`) values.',
            'By supplying an `x` (`y`) array, one violin per distinct x (y) value',
            'is drawn',
            'If no `x` (`y`) {array} is provided, a single violin is drawn.',
            'That violin position is then positioned with',
            'with `name` or with `x0` (`y0`) if provided.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/layout_attributes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/layout_attributes.js ***!
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



var boxLayoutAttrs = __webpack_require__(/*! ../box/layout_attributes */ "./node_modules/plotly.js/src/traces/box/layout_attributes.js");
var extendFlat = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").extendFlat;

module.exports = {
    violinmode: extendFlat({}, boxLayoutAttrs.boxmode, {
        description: [
            'Determines how violins at the same location coordinate',
            'are displayed on the graph.',
            'If *group*, the violins are plotted next to one another',
            'centered around the shared location.',
            'If *overlay*, the violins are plotted over one another,',
            'you might need to set *opacity* to see them multiple violins.',
            'Has no effect on traces that have *width* set.'
        ].join(' ')
    }),
    violingap: extendFlat({}, boxLayoutAttrs.boxgap, {
        description: [
            'Sets the gap (in plot fraction) between violins of',
            'adjacent location coordinates.',
            'Has no effect on traces that have *width* set.'
        ].join(' ')
    }),
    violingroupgap: extendFlat({}, boxLayoutAttrs.boxgroupgap, {
        description: [
            'Sets the gap (in plot fraction) between violins of',
            'the same location coordinate.',
            'Has no effect on traces that have *width* set.'
        ].join(' ')
    })
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/layout_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/layout_defaults.js ***!
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
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/violin/layout_attributes.js");
var boxLayoutDefaults = __webpack_require__(/*! ../box/layout_defaults */ "./node_modules/plotly.js/src/traces/box/layout_defaults.js");

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut, fullData) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }
    boxLayoutDefaults._supply(layoutIn, layoutOut, fullData, coerce, 'violin');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/plot.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/plot.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");

var boxPlot = __webpack_require__(/*! ../box/plot */ "./node_modules/plotly.js/src/traces/box/plot.js");
var linePoints = __webpack_require__(/*! ../scatter/line_points */ "./node_modules/plotly.js/src/traces/scatter/line_points.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/violin/helpers.js");

module.exports = function plot(gd, plotinfo, cdViolins, violinLayer) {
    var fullLayout = gd._fullLayout;
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    function makePath(pts) {
        var segments = linePoints(pts, {
            xaxis: xa,
            yaxis: ya,
            connectGaps: true,
            baseTolerance: 0.75,
            shape: 'spline',
            simplify: true,
            linearized: true
        });
        return Drawing.smoothopen(segments[0], 1);
    }

    Lib.makeTraceGroups(violinLayer, cdViolins, 'trace violins').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var t = cd0.t;
        var trace = cd0.trace;

        if(trace.visible !== true || t.empty) {
            plotGroup.remove();
            return;
        }

        var bPos = t.bPos;
        var bdPos = t.bdPos;
        var valAxis = plotinfo[t.valLetter + 'axis'];
        var posAxis = plotinfo[t.posLetter + 'axis'];
        var hasBothSides = trace.side === 'both';
        var hasPositiveSide = hasBothSides || trace.side === 'positive';
        var hasNegativeSide = hasBothSides || trace.side === 'negative';

        var violins = plotGroup.selectAll('path.violin').data(Lib.identity);

        violins.enter().append('path')
            .style('vector-effect', 'non-scaling-stroke')
            .attr('class', 'violin');

        violins.exit().remove();

        violins.each(function(d) {
            var pathSel = d3.select(this);
            var density = d.density;
            var len = density.length;
            var posCenter = posAxis.c2l(d.pos + bPos, true);
            var posCenterPx = posAxis.l2p(posCenter);

            var scale;
            if(trace.width) {
                scale = t.maxKDE / bdPos;
            } else {
                var groupStats = fullLayout._violinScaleGroupStats[trace.scalegroup];
                scale = trace.scalemode === 'count' ?
                    (groupStats.maxKDE / bdPos) * (groupStats.maxCount / d.pts.length) :
                    groupStats.maxKDE / bdPos;
            }

            var pathPos, pathNeg, path;
            var i, k, pts, pt;

            if(hasPositiveSide) {
                pts = new Array(len);
                for(i = 0; i < len; i++) {
                    pt = pts[i] = {};
                    pt[t.posLetter] = posCenter + (density[i].v / scale);
                    pt[t.valLetter] = valAxis.c2l(density[i].t, true);
                }
                pathPos = makePath(pts);
            }

            if(hasNegativeSide) {
                pts = new Array(len);
                for(k = 0, i = len - 1; k < len; k++, i--) {
                    pt = pts[k] = {};
                    pt[t.posLetter] = posCenter - (density[i].v / scale);
                    pt[t.valLetter] = valAxis.c2l(density[i].t, true);
                }
                pathNeg = makePath(pts);
            }

            if(hasBothSides) {
                path = pathPos + 'L' + pathNeg.substr(1) + 'Z';
            } else {
                var startPt = [posCenterPx, valAxis.c2p(density[0].t)];
                var endPt = [posCenterPx, valAxis.c2p(density[len - 1].t)];

                if(trace.orientation === 'h') {
                    startPt.reverse();
                    endPt.reverse();
                }

                if(hasPositiveSide) {
                    path = 'M' + startPt + 'L' + pathPos.substr(1) + 'L' + endPt;
                } else {
                    path = 'M' + endPt + 'L' + pathNeg.substr(1) + 'L' + startPt;
                }
            }
            pathSel.attr('d', path);

            // save a few things used in getPositionOnKdePath, getKdeValue
            // on hover and for meanline draw block below
            d.posCenterPx = posCenterPx;
            d.posDensityScale = scale * bdPos;
            d.path = pathSel.node();
            d.pathLength = d.path.getTotalLength() / (hasBothSides ? 2 : 1);
        });

        var boxAttrs = trace.box;
        var boxWidth = boxAttrs.width;
        var boxLineWidth = (boxAttrs.line || {}).width;
        var bdPosScaled;
        var bPosPxOffset;

        if(hasBothSides) {
            bdPosScaled = bdPos * boxWidth;
            bPosPxOffset = 0;
        } else if(hasPositiveSide) {
            bdPosScaled = [0, bdPos * boxWidth / 2];
            bPosPxOffset = boxLineWidth * {x: 1, y: -1}[t.posLetter];
        } else {
            bdPosScaled = [bdPos * boxWidth / 2, 0];
            bPosPxOffset = boxLineWidth * {x: -1, y: 1}[t.posLetter];
        }

        // inner box
        boxPlot.plotBoxAndWhiskers(plotGroup, {pos: posAxis, val: valAxis}, trace, {
            bPos: bPos,
            bdPos: bdPosScaled,
            bPosPxOffset: bPosPxOffset
        });

        // meanline insider box
        boxPlot.plotBoxMean(plotGroup, {pos: posAxis, val: valAxis}, trace, {
            bPos: bPos,
            bdPos: bdPosScaled,
            bPosPxOffset: bPosPxOffset
        });

        var fn;
        if(!trace.box.visible && trace.meanline.visible) {
            fn = Lib.identity;
        }

        // N.B. use different class name than boxPlot.plotBoxMean,
        // to avoid selectAll conflict
        var meanPaths = plotGroup.selectAll('path.meanline').data(fn || []);
        meanPaths.enter().append('path')
            .attr('class', 'meanline')
            .style('fill', 'none')
            .style('vector-effect', 'non-scaling-stroke');
        meanPaths.exit().remove();
        meanPaths.each(function(d) {
            var v = valAxis.c2p(d.mean, true);
            var p = helpers.getPositionOnKdePath(d, trace, v);

            d3.select(this).attr('d',
                trace.orientation === 'h' ?
                    'M' + v + ',' + p[0] + 'V' + p[1] :
                    'M' + p[0] + ',' + v + 'H' + p[1]
            );
        });

        boxPlot.plotPoints(plotGroup, {x: xa, y: ya}, trace, t);
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/violin/style.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/violin/style.js ***!
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var stylePoints = __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js").stylePoints;

module.exports = function style(gd) {
    var s = d3.select(gd).selectAll('g.trace.violins');

    s.style('opacity', function(d) { return d[0].trace.opacity; });

    s.each(function(d) {
        var trace = d[0].trace;
        var sel = d3.select(this);
        var box = trace.box || {};
        var boxLine = box.line || {};
        var meanline = trace.meanline || {};
        var meanLineWidth = meanline.width;

        sel.selectAll('path.violin')
            .style('stroke-width', trace.line.width + 'px')
            .call(Color.stroke, trace.line.color)
            .call(Color.fill, trace.fillcolor);

        sel.selectAll('path.box')
            .style('stroke-width', boxLine.width + 'px')
            .call(Color.stroke, boxLine.color)
            .call(Color.fill, box.fillcolor);

        var meanLineStyle = {
            'stroke-width': meanLineWidth + 'px',
            'stroke-dasharray': (2 * meanLineWidth) + 'px,' + meanLineWidth + 'px'
        };

        sel.selectAll('path.mean')
            .style(meanLineStyle)
            .call(Color.stroke, meanline.color);

        sel.selectAll('path.meanline')
            .style(meanLineStyle)
            .call(Color.stroke, meanline.color);

        stylePoints(sel, trace, gd);
    });
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvdmlvbGluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdmlvbGluL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy92aW9saW4vY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3Zpb2xpbi9jcm9zc190cmFjZV9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdmlvbGluL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdmlvbGluL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy92aW9saW4vaG92ZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy92aW9saW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy92aW9saW4vbGF5b3V0X2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy92aW9saW4vbGF5b3V0X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdmlvbGluL3Bsb3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy92aW9saW4vc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsdUhBQWdEOzs7Ozs7Ozs7Ozs7QUNWaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLGdGQUFtQjtBQUMxQyxpQkFBaUIsb0dBQXNDOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFhLGlDQUFpQztBQUM5QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCx1Q0FBdUMsYUFBYTtBQUNwRCxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7OztBQzNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxrQkFBa0IsK0dBQXVDOztBQUV6RDtBQUNBOztBQUVBLG9DQUFvQywyQkFBMkIsRUFBRTs7QUFFakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCIsImZpbGUiOiJjaGFydDZiMzMzODdkNjgzMzExMWExNTUxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvdmlvbGluJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBib3hBdHRycyA9IHJlcXVpcmUoJy4uL2JveC9hdHRyaWJ1dGVzJyk7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB5OiBib3hBdHRycy55LFxuICAgIHg6IGJveEF0dHJzLngsXG4gICAgeDA6IGJveEF0dHJzLngwLFxuICAgIHkwOiBib3hBdHRycy55MCxcbiAgICBuYW1lOiBleHRlbmRGbGF0KHt9LCBib3hBdHRycy5uYW1lLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgdHJhY2UgbmFtZS4nLFxuICAgICAgICAgICAgJ1RoZSB0cmFjZSBuYW1lIGFwcGVhciBhcyB0aGUgbGVnZW5kIGl0ZW0gYW5kIG9uIGhvdmVyLicsXG4gICAgICAgICAgICAnRm9yIHZpb2xpbiB0cmFjZXMsIHRoZSBuYW1lIHdpbGwgYWxzbyBiZSB1c2VkIGZvciB0aGUgcG9zaXRpb24nLFxuICAgICAgICAgICAgJ2Nvb3JkaW5hdGUsIGlmIGB4YCBhbmQgYHgwYCAoYHlgIGFuZCBgeTBgIGlmIGhvcml6b250YWwpIGFyZScsXG4gICAgICAgICAgICAnbWlzc2luZyBhbmQgdGhlIHBvc2l0aW9uIGF4aXMgaXMgY2F0ZWdvcmljYWwuJyxcbiAgICAgICAgICAgICdOb3RlIHRoYXQgdGhlIHRyYWNlIG5hbWUgaXMgYWxzbyB1c2VkIGFzIGEgZGVmYXVsdCB2YWx1ZScsXG4gICAgICAgICAgICAnZm9yIGF0dHJpYnV0ZSBgc2NhbGVncm91cGAgKHBsZWFzZSBzZWUgaXRzIGRlc2NyaXB0aW9uIGZvciBkZXRhaWxzKS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgb3JpZW50YXRpb246IGV4dGVuZEZsYXQoe30sIGJveEF0dHJzLm9yaWVudGF0aW9uLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgb3JpZW50YXRpb24gb2YgdGhlIHZpb2xpbihzKS4nLFxuICAgICAgICAgICAgJ0lmICp2KiAoKmgqKSwgdGhlIGRpc3RyaWJ1dGlvbiBpcyB2aXN1YWxpemVkIGFsb25nJyxcbiAgICAgICAgICAgICd0aGUgdmVydGljYWwgKGhvcml6b250YWwpLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcblxuICAgIGJhbmR3aWR0aDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYmFuZHdpZHRoIHVzZWQgdG8gY29tcHV0ZSB0aGUga2VybmVsIGRlbnNpdHkgZXN0aW1hdGUuJyxcbiAgICAgICAgICAgICdCeSBkZWZhdWx0LCB0aGUgYmFuZHdpZHRoIGlzIGRldGVybWluZWQgYnkgU2lsdmVybWFuXFwncyBydWxlIG9mIHRodW1iLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgc2NhbGVncm91cDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdJZiB0aGVyZSBhcmUgbXVsdGlwbGUgdmlvbGlucyB0aGF0IHNob3VsZCBiZSBzaXplZCBhY2NvcmRpbmcgdG8nLFxuICAgICAgICAgICAgJ3RvIHNvbWUgbWV0cmljIChzZWUgYHNjYWxlbW9kZWApLCBsaW5rIHRoZW0gYnkgcHJvdmlkaW5nIGEgbm9uLWVtcHR5IGdyb3VwIGlkIGhlcmUnLFxuICAgICAgICAgICAgJ3NoYXJlZCBieSBldmVyeSB0cmFjZSBpbiB0aGUgc2FtZSBncm91cC4nLFxuICAgICAgICAgICAgJ0lmIGEgdmlvbGluXFwncyBgd2lkdGhgIGlzIHVuZGVmaW5lZCwgYHNjYWxlZ3JvdXBgIHdpbGwgZGVmYXVsdCB0byB0aGUgdHJhY2VcXCdzIG5hbWUuJyxcbiAgICAgICAgICAgICdJbiB0aGlzIGNhc2UsIHZpb2xpbnMgd2l0aCB0aGUgc2FtZSBuYW1lcyB3aWxsIGJlIGxpbmtlZCB0b2dldGhlcidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHNjYWxlbW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWyd3aWR0aCcsICdjb3VudCddLFxuICAgICAgICBkZmx0OiAnd2lkdGgnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgbWV0cmljIGJ5IHdoaWNoIHRoZSB3aWR0aCBvZiBlYWNoIHZpb2xpbiBpcyBkZXRlcm1pbmVkLicsXG4gICAgICAgICAgICAnKndpZHRoKiBtZWFucyBlYWNoIHZpb2xpbiBoYXMgdGhlIHNhbWUgKG1heCkgd2lkdGgnLFxuICAgICAgICAgICAgJypjb3VudCogbWVhbnMgdGhlIHZpb2xpbnMgYXJlIHNjYWxlZCBieSB0aGUgbnVtYmVyIG9mIHNhbXBsZSBwb2ludHMgbWFraW5nJyxcbiAgICAgICAgICAgICd1cCBlYWNoIHZpb2xpbi4nXG4gICAgICAgIF0uam9pbignJylcbiAgICB9LFxuXG4gICAgc3Bhbm1vZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnc29mdCcsICdoYXJkJywgJ21hbnVhbCddLFxuICAgICAgICBkZmx0OiAnc29mdCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBtZXRob2QgYnkgd2hpY2ggdGhlIHNwYW4gaW4gZGF0YSBzcGFjZSB3aGVyZSB0aGUgZGVuc2l0eSBmdW5jdGlvbiB3aWxsIGJlIGNvbXB1dGVkLicsXG4gICAgICAgICAgICAnKnNvZnQqIG1lYW5zIHRoZSBzcGFuIGdvZXMgZnJvbSB0aGUgc2FtcGxlXFwncyBtaW5pbXVtIHZhbHVlIG1pbnVzIHR3byBiYW5kd2lkdGhzJyxcbiAgICAgICAgICAgICd0byB0aGUgc2FtcGxlXFwncyBtYXhpbXVtIHZhbHVlIHBsdXMgdHdvIGJhbmR3aWR0aHMuJyxcbiAgICAgICAgICAgICcqaGFyZCogbWVhbnMgdGhlIHNwYW4gZ29lcyBmcm9tIHRoZSBzYW1wbGVcXCdzIG1pbmltdW0gdG8gaXRzIG1heGltdW0gdmFsdWUuJyxcbiAgICAgICAgICAgICdGb3IgY3VzdG9tIHNwYW4gc2V0dGluZ3MsIHVzZSBtb2RlICptYW51YWwqIGFuZCBmaWxsIGluIHRoZSBgc3BhbmAgYXR0cmlidXRlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHNwYW46IHtcbiAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge3ZhbFR5cGU6ICdhbnknLCBlZGl0VHlwZTogJ2NhbGMnfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnYW55JywgZWRpdFR5cGU6ICdjYWxjJ31cbiAgICAgICAgXSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHNwYW4gaW4gZGF0YSBzcGFjZSBmb3Igd2hpY2ggdGhlIGRlbnNpdHkgZnVuY3Rpb24gd2lsbCBiZSBjb21wdXRlZC4nLFxuICAgICAgICAgICAgJ0hhcyBhbiBlZmZlY3Qgb25seSB3aGVuIGBzcGFubW9kZWAgaXMgc2V0IHRvICptYW51YWwqLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgbGluZToge1xuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29sb3Igb2YgbGluZSBib3VuZGluZyB0aGUgdmlvbGluKHMpLidcbiAgICAgICAgfSxcbiAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDIsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgd2lkdGggKGluIHB4KSBvZiBsaW5lIGJvdW5kaW5nIHRoZSB2aW9saW4ocykuJ1xuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgfSxcbiAgICBmaWxsY29sb3I6IGJveEF0dHJzLmZpbGxjb2xvcixcblxuICAgIHBvaW50czogZXh0ZW5kRmxhdCh7fSwgYm94QXR0cnMuYm94cG9pbnRzLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgKm91dGxpZXJzKiwgb25seSB0aGUgc2FtcGxlIHBvaW50cyBseWluZyBvdXRzaWRlIHRoZSB3aGlza2VycycsXG4gICAgICAgICAgICAnYXJlIHNob3duJyxcbiAgICAgICAgICAgICdJZiAqc3VzcGVjdGVkb3V0bGllcnMqLCB0aGUgb3V0bGllciBwb2ludHMgYXJlIHNob3duIGFuZCcsXG4gICAgICAgICAgICAncG9pbnRzIGVpdGhlciBsZXNzIHRoYW4gNCpRMS0zKlEzIG9yIGdyZWF0ZXIgdGhhbiA0KlEzLTMqUTEnLFxuICAgICAgICAgICAgJ2FyZSBoaWdobGlnaHRlZCAoc2VlIGBvdXRsaWVyY29sb3JgKScsXG4gICAgICAgICAgICAnSWYgKmFsbCosIGFsbCBzYW1wbGUgcG9pbnRzIGFyZSBzaG93bicsXG4gICAgICAgICAgICAnSWYgKmZhbHNlKiwgb25seSB0aGUgdmlvbGlucyBhcmUgc2hvd24gd2l0aCBubyBzYW1wbGUgcG9pbnRzLicsXG4gICAgICAgICAgICAnRGVmYXVsdHMgdG8gKnN1c3BlY3RlZG91dGxpZXJzKiB3aGVuIGBtYXJrZXIub3V0bGllcmNvbG9yYCBvcicsXG4gICAgICAgICAgICAnYG1hcmtlci5saW5lLm91dGxpZXJjb2xvcmAgaXMgc2V0LCcsXG4gICAgICAgICAgICAnb3RoZXJ3aXNlIGRlZmF1bHRzIHRvICpvdXRsaWVycyouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIGppdHRlcjogZXh0ZW5kRmxhdCh7fSwgYm94QXR0cnMuaml0dGVyLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYW1vdW50IG9mIGppdHRlciBpbiB0aGUgc2FtcGxlIHBvaW50cyBkcmF3bi4nLFxuICAgICAgICAgICAgJ0lmICowKiwgdGhlIHNhbXBsZSBwb2ludHMgYWxpZ24gYWxvbmcgdGhlIGRpc3RyaWJ1dGlvbiBheGlzLicsXG4gICAgICAgICAgICAnSWYgKjEqLCB0aGUgc2FtcGxlIHBvaW50cyBhcmUgZHJhd24gaW4gYSByYW5kb20gaml0dGVyIG9mIHdpZHRoJyxcbiAgICAgICAgICAgICdlcXVhbCB0byB0aGUgd2lkdGggb2YgdGhlIHZpb2xpbnMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIHBvaW50cG9zOiBleHRlbmRGbGF0KHt9LCBib3hBdHRycy5wb2ludHBvcywge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBzYW1wbGUgcG9pbnRzIGluIHJlbGF0aW9uIHRvIHRoZSB2aW9saW5zLicsXG4gICAgICAgICAgICAnSWYgKjAqLCB0aGUgc2FtcGxlIHBvaW50cyBhcmUgcGxhY2VzIG92ZXIgdGhlIGNlbnRlciBvZiB0aGUgdmlvbGlucy4nLFxuICAgICAgICAgICAgJ1Bvc2l0aXZlIChuZWdhdGl2ZSkgdmFsdWVzIGNvcnJlc3BvbmQgdG8gcG9zaXRpb25zIHRvIHRoZScsXG4gICAgICAgICAgICAncmlnaHQgKGxlZnQpIGZvciB2ZXJ0aWNhbCB2aW9saW5zIGFuZCBhYm92ZSAoYmVsb3cpIGZvciBob3Jpem9udGFsIHZpb2xpbnMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuXG4gICAgd2lkdGg6IGV4dGVuZEZsYXQoe30sIGJveEF0dHJzLndpZHRoLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgd2lkdGggb2YgdGhlIHZpb2xpbiBpbiBkYXRhIGNvb3JkaW5hdGVzLicsXG4gICAgICAgICAgICAnSWYgKjAqIChkZWZhdWx0IHZhbHVlKSB0aGUgd2lkdGggaXMgYXV0b21hdGljYWxseSBzZWxlY3RlZCBiYXNlZCBvbiB0aGUgcG9zaXRpb25zJyxcbiAgICAgICAgICAgICdvZiBvdGhlciB2aW9saW4gdHJhY2VzIGluIHRoZSBzYW1lIHN1YnBsb3QuJyxcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcblxuICAgIG1hcmtlcjogYm94QXR0cnMubWFya2VyLFxuICAgIHRleHQ6IGJveEF0dHJzLnRleHQsXG4gICAgaG92ZXJ0ZXh0OiBib3hBdHRycy5ob3ZlcnRleHQsXG4gICAgaG92ZXJ0ZW1wbGF0ZTogYm94QXR0cnMuaG92ZXJ0ZW1wbGF0ZSxcblxuICAgIGJveDoge1xuICAgICAgICB2aXNpYmxlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIGlmIGFuIG1pbmlhdHVyZSBib3ggcGxvdCBpcyBkcmF3biBpbnNpZGUgdGhlIHZpb2xpbnMuICdcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICAgIGRmbHQ6IDAuMjUsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgd2lkdGggb2YgdGhlIGlubmVyIGJveCBwbG90cyByZWxhdGl2ZSB0bycsXG4gICAgICAgICAgICAgICAgJ3RoZSB2aW9saW5zXFwnIHdpZHRoLicsXG4gICAgICAgICAgICAgICAgJ0ZvciBleGFtcGxlLCB3aXRoIDEsIHRoZSBpbm5lciBib3ggcGxvdHMgYXJlIGFzIHdpZGUgYXMgdGhlIHZpb2xpbnMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbGNvbG9yOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBpbm5lciBib3ggcGxvdCBmaWxsIGNvbG9yLidcbiAgICAgICAgfSxcbiAgICAgICAgbGluZToge1xuICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBpbm5lciBib3ggcGxvdCBib3VuZGluZyBsaW5lIGNvbG9yLidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgaW5uZXIgYm94IHBsb3QgYm91bmRpbmcgbGluZSB3aWR0aC4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgIH0sXG5cbiAgICBtZWFubGluZToge1xuICAgICAgICB2aXNpYmxlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIGlmIGEgbGluZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBzYW1wbGVcXCdzIG1lYW4gaXMgc2hvd24nLFxuICAgICAgICAgICAgICAgICdpbnNpZGUgdGhlIHZpb2xpbnMuJyxcbiAgICAgICAgICAgICAgICAnSWYgYGJveC52aXNpYmxlYCBpcyB0dXJuZWQgb24sIHRoZSBtZWFuIGxpbmUgaXMgZHJhd24gaW5zaWRlIHRoZSBpbm5lciBib3guJyxcbiAgICAgICAgICAgICAgICAnT3RoZXJ3aXNlLCB0aGUgbWVhbiBsaW5lIGlzIGRyYXduIGZyb20gb25lIHNpZGUgb2YgdGhlIHZpb2xpbiB0byBvdGhlci4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgbWVhbiBsaW5lIGNvbG9yLidcbiAgICAgICAgfSxcbiAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBtZWFuIGxpbmUgd2lkdGguJ1xuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgfSxcblxuICAgIHNpZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnYm90aCcsICdwb3NpdGl2ZScsICduZWdhdGl2ZSddLFxuICAgICAgICBkZmx0OiAnYm90aCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIG9uIHdoaWNoIHNpZGUgb2YgdGhlIHBvc2l0aW9uIHZhbHVlIHRoZSBkZW5zaXR5IGZ1bmN0aW9uIG1ha2luZyB1cCcsXG4gICAgICAgICAgICAnb25lIGhhbGYgb2YgYSB2aW9saW4gaXMgcGxvdHRlZC4nLFxuICAgICAgICAgICAgJ1VzZWZ1bCB3aGVuIGNvbXBhcmluZyB0d28gdmlvbGluIHRyYWNlcyB1bmRlciAqb3ZlcmxheSogbW9kZSwgd2hlcmUgb25lIHRyYWNlJyxcbiAgICAgICAgICAgICdoYXMgYHNpZGVgIHNldCB0byAqcG9zaXRpdmUqIGFuZCB0aGUgb3RoZXIgdG8gKm5lZ2F0aXZlKi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIG9mZnNldGdyb3VwOiBib3hBdHRycy5vZmZzZXRncm91cCxcbiAgICBhbGlnbm1lbnRncm91cDogYm94QXR0cnMuYWxpZ25tZW50Z3JvdXAsXG5cbiAgICBzZWxlY3RlZDogYm94QXR0cnMuc2VsZWN0ZWQsXG4gICAgdW5zZWxlY3RlZDogYm94QXR0cnMudW5zZWxlY3RlZCxcblxuICAgIGhvdmVyb246IHtcbiAgICAgICAgdmFsVHlwZTogJ2ZsYWdsaXN0JyxcbiAgICAgICAgZmxhZ3M6IFsndmlvbGlucycsICdwb2ludHMnLCAna2RlJ10sXG4gICAgICAgIGRmbHQ6ICd2aW9saW5zK3BvaW50cytrZGUnLFxuICAgICAgICBleHRyYXM6IFsnYWxsJ10sXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRG8gdGhlIGhvdmVyIGVmZmVjdHMgaGlnaGxpZ2h0IGluZGl2aWR1YWwgdmlvbGlucycsXG4gICAgICAgICAgICAnb3Igc2FtcGxlIHBvaW50cyBvciB0aGUga2VybmVsIGRlbnNpdHkgZXN0aW1hdGUgb3IgYW55IGNvbWJpbmF0aW9uIG9mIHRoZW0/J1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBib3hDYWxjID0gcmVxdWlyZSgnLi4vYm94L2NhbGMnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBjZCA9IGJveENhbGMoZ2QsIHRyYWNlKTtcblxuICAgIGlmKGNkWzBdLnQuZW1wdHkpIHJldHVybiBjZDtcblxuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIHZhbEF4aXMgPSBBeGVzLmdldEZyb21JZChcbiAgICAgICAgZ2QsXG4gICAgICAgIHRyYWNlW3RyYWNlLm9yaWVudGF0aW9uID09PSAnaCcgPyAneGF4aXMnIDogJ3lheGlzJ11cbiAgICApO1xuXG4gICAgdmFyIHNwYW5NaW4gPSBJbmZpbml0eTtcbiAgICB2YXIgc3Bhbk1heCA9IC1JbmZpbml0eTtcbiAgICB2YXIgbWF4S0RFID0gMDtcbiAgICB2YXIgbWF4Q291bnQgPSAwO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjZGkgPSBjZFtpXTtcbiAgICAgICAgdmFyIHZhbHMgPSBjZGkucHRzLm1hcChoZWxwZXJzLmV4dHJhY3RWYWwpO1xuXG4gICAgICAgIHZhciBiYW5kd2lkdGggPSBjZGkuYmFuZHdpZHRoID0gY2FsY0JhbmR3aWR0aCh0cmFjZSwgY2RpLCB2YWxzKTtcbiAgICAgICAgdmFyIHNwYW4gPSBjZGkuc3BhbiA9IGNhbGNTcGFuKHRyYWNlLCBjZGksIHZhbEF4aXMsIGJhbmR3aWR0aCk7XG5cbiAgICAgICAgaWYoY2RpLm1pbiA9PT0gY2RpLm1heCAmJiBiYW5kd2lkdGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIGlmIHNwYW4gaXMgemVybyBhbmQgYmFuZHdpZHRoIGlzIHplcm8sIHdlIHdhbnQgYSB2aW9saW4gd2l0aCB6ZXJvIHdpZHRoXG4gICAgICAgICAgICBzcGFuID0gY2RpLnNwYW4gPSBbY2RpLm1pbiwgY2RpLm1heF07XG4gICAgICAgICAgICBjZGkuZGVuc2l0eSA9IFt7djogMSwgdDogc3BhblswXX1dO1xuICAgICAgICAgICAgY2RpLmJhbmR3aWR0aCA9IGJhbmR3aWR0aDtcbiAgICAgICAgICAgIG1heEtERSA9IE1hdGgubWF4KG1heEtERSwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzdGVwIHRoYXQgd2VsbCBjb3ZlcnMgdGhlIGJhbmR3aWR0aCBhbmQgaXMgbXVsdGlwbGUgb2Ygc3BhbiBkaXN0YW5jZVxuICAgICAgICAgICAgdmFyIGRpc3QgPSBzcGFuWzFdIC0gc3BhblswXTtcbiAgICAgICAgICAgIHZhciBuID0gTWF0aC5jZWlsKGRpc3QgLyAoYmFuZHdpZHRoIC8gMykpO1xuICAgICAgICAgICAgdmFyIHN0ZXAgPSBkaXN0IC8gbjtcblxuICAgICAgICAgICAgaWYoIWlzRmluaXRlKHN0ZXApIHx8ICFpc0Zpbml0ZShuKSkge1xuICAgICAgICAgICAgICAgIExpYi5lcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2l0aCBjb21wdXRpbmcgdGhlIHZpb2xpbiBzcGFuJyk7XG4gICAgICAgICAgICAgICAgY2RbMF0udC5lbXB0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIga2RlID0gaGVscGVycy5tYWtlS0RFKGNkaSwgdHJhY2UsIHZhbHMpO1xuICAgICAgICAgICAgY2RpLmRlbnNpdHkgPSBuZXcgQXJyYXkobik7XG5cbiAgICAgICAgICAgIGZvcih2YXIgayA9IDAsIHQgPSBzcGFuWzBdOyB0IDwgKHNwYW5bMV0gKyBzdGVwIC8gMik7IGsrKywgdCArPSBzdGVwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSBrZGUodCk7XG4gICAgICAgICAgICAgICAgY2RpLmRlbnNpdHlba10gPSB7djogdiwgdDogdH07XG4gICAgICAgICAgICAgICAgbWF4S0RFID0gTWF0aC5tYXgobWF4S0RFLCB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1heENvdW50ID0gTWF0aC5tYXgobWF4Q291bnQsIHZhbHMubGVuZ3RoKTtcbiAgICAgICAgc3Bhbk1pbiA9IE1hdGgubWluKHNwYW5NaW4sIHNwYW5bMF0pO1xuICAgICAgICBzcGFuTWF4ID0gTWF0aC5tYXgoc3Bhbk1heCwgc3BhblsxXSk7XG4gICAgfVxuXG4gICAgdmFyIGV4dHJlbWVzID0gQXhlcy5maW5kRXh0cmVtZXModmFsQXhpcywgW3NwYW5NaW4sIHNwYW5NYXhdLCB7cGFkZGVkOiB0cnVlfSk7XG4gICAgdHJhY2UuX2V4dHJlbWVzW3ZhbEF4aXMuX2lkXSA9IGV4dHJlbWVzO1xuXG4gICAgaWYodHJhY2Uud2lkdGgpIHtcbiAgICAgICAgY2RbMF0udC5tYXhLREUgPSBtYXhLREU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHZpb2xpblNjYWxlR3JvdXBTdGF0cyA9IGZ1bGxMYXlvdXQuX3Zpb2xpblNjYWxlR3JvdXBTdGF0cztcbiAgICAgICAgdmFyIHNjYWxlR3JvdXAgPSB0cmFjZS5zY2FsZWdyb3VwO1xuICAgICAgICB2YXIgZ3JvdXBTdGF0cyA9IHZpb2xpblNjYWxlR3JvdXBTdGF0c1tzY2FsZUdyb3VwXTtcblxuICAgICAgICBpZihncm91cFN0YXRzKSB7XG4gICAgICAgICAgICBncm91cFN0YXRzLm1heEtERSA9IE1hdGgubWF4KGdyb3VwU3RhdHMubWF4S0RFLCBtYXhLREUpO1xuICAgICAgICAgICAgZ3JvdXBTdGF0cy5tYXhDb3VudCA9IE1hdGgubWF4KGdyb3VwU3RhdHMubWF4Q291bnQsIG1heENvdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpb2xpblNjYWxlR3JvdXBTdGF0c1tzY2FsZUdyb3VwXSA9IHtcbiAgICAgICAgICAgICAgICBtYXhLREU6IG1heEtERSxcbiAgICAgICAgICAgICAgICBtYXhDb3VudDogbWF4Q291bnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjZFswXS50LmxhYmVscy5rZGUgPSBMaWIuXyhnZCwgJ2tkZTonKTtcblxuICAgIHJldHVybiBjZDtcbn07XG5cbi8vIERlZmF1bHQgdG8gU2lsdmVtYW4ncyBydWxlIG9mIHRodW1iXG4vLyAtIGh0dHBzOi8vc3RhdHMuc3RhY2tleGNoYW5nZS5jb20vYS82NjcxXG4vLyAtIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0tlcm5lbF9kZW5zaXR5X2VzdGltYXRpb24jQV9ydWxlLW9mLXRodW1iX2JhbmR3aWR0aF9lc3RpbWF0b3Jcbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL3N0YXRzbW9kZWxzL3N0YXRzbW9kZWxzL2Jsb2IvbWFzdGVyL3N0YXRzbW9kZWxzL25vbnBhcmFtZXRyaWMvYmFuZHdpZHRocy5weVxuZnVuY3Rpb24gc2lsdmVybWFuUnVsZShsZW4sIHNzZCwgaXFyKSB7XG4gICAgdmFyIGEgPSBNYXRoLm1pbihzc2QsIGlxciAvIDEuMzQ5KTtcbiAgICByZXR1cm4gMS4wNTkgKiBhICogTWF0aC5wb3cobGVuLCAtMC4yKTtcbn1cblxuZnVuY3Rpb24gY2FsY0JhbmR3aWR0aCh0cmFjZSwgY2RpLCB2YWxzKSB7XG4gICAgdmFyIHNwYW4gPSBjZGkubWF4IC0gY2RpLm1pbjtcblxuICAgIC8vIElmIHNwYW4gaXMgemVyb1xuICAgIGlmKCFzcGFuKSB7XG4gICAgICAgIGlmKHRyYWNlLmJhbmR3aWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNlLmJhbmR3aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHNwYW4gaXMgemVybyBhbmQgbm8gYmFuZHdpZHRoIGlzIHNwZWNpZmllZFxuICAgICAgICAgICAgLy8gaXQgcmV0dXJucyB6ZXJvIGJhbmR3aWR0aCB3aGljaCBpcyBhIHNwZWNpYWwgY2FzZVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBMaW1pdCBob3cgc21hbGwgdGhlIGJhbmR3aWR0aCBjYW4gYmUuXG4gICAgLy9cbiAgICAvLyBTaWx2ZXJtYW4ncyBydWxlIG9mIHRodW1iIGNhbiBiZSBcInZlcnlcIiBzbWFsbFxuICAgIC8vIHdoZW4gSVFSIGRvZXMgYSBwb29yIGpvYiBhdCBkZXNjcmliaW5nIHRoZSBzcHJlYWRcbiAgICAvLyBvZiB0aGUgZGlzdHJpYnV0aW9uLlxuICAgIC8vIFdlIGFsc28gd2FudCB0byBsaW1pdCBjdXN0b20gYmFuZHdpZHRoc1xuICAgIC8vIHRvIG5vdCBibG93IHVwIGtkZSBjb21wdXRhdGlvbnMuXG5cbiAgICBpZih0cmFjZS5iYW5kd2lkdGgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KHRyYWNlLmJhbmR3aWR0aCwgc3BhbiAvIDFlNCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGxlbiA9IHZhbHMubGVuZ3RoO1xuICAgICAgICB2YXIgc3NkID0gTGliLnN0ZGV2KHZhbHMsIGxlbiAtIDEsIGNkaS5tZWFuKTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICAgICAgc2lsdmVybWFuUnVsZShsZW4sIHNzZCwgY2RpLnEzIC0gY2RpLnExKSxcbiAgICAgICAgICAgIHNwYW4gLyAxMDBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbGNTcGFuKHRyYWNlLCBjZGksIHZhbEF4aXMsIGJhbmR3aWR0aCkge1xuICAgIHZhciBzcGFubW9kZSA9IHRyYWNlLnNwYW5tb2RlO1xuICAgIHZhciBzcGFuSW4gPSB0cmFjZS5zcGFuIHx8IFtdO1xuICAgIHZhciBzcGFuVGlnaHQgPSBbY2RpLm1pbiwgY2RpLm1heF07XG4gICAgdmFyIHNwYW5Mb29zZSA9IFtjZGkubWluIC0gMiAqIGJhbmR3aWR0aCwgY2RpLm1heCArIDIgKiBiYW5kd2lkdGhdO1xuICAgIHZhciBzcGFuT3V0O1xuXG4gICAgZnVuY3Rpb24gY2FsY1NwYW5JdGVtKGluZGV4KSB7XG4gICAgICAgIHZhciBzID0gc3BhbkluW2luZGV4XTtcbiAgICAgICAgdmFyIHNjID0gdmFsQXhpcy50eXBlID09PSAnbXVsdGljYXRlZ29yeScgP1xuICAgICAgICAgICAgdmFsQXhpcy5yMmMocykgOlxuICAgICAgICAgICAgdmFsQXhpcy5kMmMocywgMCwgdHJhY2VbY2RpLnZhbExldHRlciArICdjYWxlbmRhciddKTtcbiAgICAgICAgcmV0dXJuIHNjID09PSBCQUROVU0gPyBzcGFuTG9vc2VbaW5kZXhdIDogc2M7XG4gICAgfVxuXG4gICAgaWYoc3Bhbm1vZGUgPT09ICdzb2Z0Jykge1xuICAgICAgICBzcGFuT3V0ID0gc3Bhbkxvb3NlO1xuICAgIH0gZWxzZSBpZihzcGFubW9kZSA9PT0gJ2hhcmQnKSB7XG4gICAgICAgIHNwYW5PdXQgPSBzcGFuVGlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3Bhbk91dCA9IFtjYWxjU3Bhbkl0ZW0oMCksIGNhbGNTcGFuSXRlbSgxKV07XG4gICAgfVxuXG4gICAgLy8gdG8gcmV1c2UgdGhlIGVxdWFsLXJhbmdlLWl0ZW0gYmxvY2tcbiAgICB2YXIgZHVtbXlBeCA9IHtcbiAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgIHJhbmdlOiBzcGFuT3V0XG4gICAgfTtcbiAgICBBeGVzLnNldENvbnZlcnQoZHVtbXlBeCk7XG4gICAgZHVtbXlBeC5jbGVhblJhbmdlKCk7XG5cbiAgICByZXR1cm4gc3Bhbk91dDtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNldFBvc2l0aW9uT2Zmc2V0ID0gcmVxdWlyZSgnLi4vYm94L2Nyb3NzX3RyYWNlX2NhbGMnKS5zZXRQb3NpdGlvbk9mZnNldDtcbnZhciBvcmllbnRhdGlvbnMgPSBbJ3YnLCAnaCddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyb3NzVHJhY2VDYWxjKGdkLCBwbG90aW5mbykge1xuICAgIHZhciBjYWxjZGF0YSA9IGdkLmNhbGNkYXRhO1xuICAgIHZhciB4YSA9IHBsb3RpbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHBsb3RpbmZvLnlheGlzO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG9yaWVudGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbnNbaV07XG4gICAgICAgIHZhciBwb3NBeGlzID0gb3JpZW50YXRpb24gPT09ICdoJyA/IHlhIDogeGE7XG4gICAgICAgIHZhciB2aW9saW5MaXN0ID0gW107XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGNhbGNkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgY2QgPSBjYWxjZGF0YVtqXTtcbiAgICAgICAgICAgIHZhciB0ID0gY2RbMF0udDtcbiAgICAgICAgICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuXG4gICAgICAgICAgICBpZih0cmFjZS52aXNpYmxlID09PSB0cnVlICYmIHRyYWNlLnR5cGUgPT09ICd2aW9saW4nICYmXG4gICAgICAgICAgICAgICAgICAgICF0LmVtcHR5ICYmXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlLm9yaWVudGF0aW9uID09PSBvcmllbnRhdGlvbiAmJlxuICAgICAgICAgICAgICAgICAgICB0cmFjZS54YXhpcyA9PT0geGEuX2lkICYmXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlLnlheGlzID09PSB5YS5faWRcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdmlvbGluTGlzdC5wdXNoKGopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0UG9zaXRpb25PZmZzZXQoJ3Zpb2xpbicsIGdkLCB2aW9saW5MaXN0LCBwb3NBeGlzKTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG5cbnZhciBib3hEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2JveC9kZWZhdWx0cycpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvZXJjZTIoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZTIodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGJveERlZmF1bHRzLmhhbmRsZVNhbXBsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCk7XG4gICAgaWYodHJhY2VPdXQudmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIGNvZXJjZSgnYmFuZHdpZHRoJyk7XG4gICAgY29lcmNlKCdzaWRlJyk7XG5cbiAgICB2YXIgd2lkdGggPSBjb2VyY2UoJ3dpZHRoJyk7XG4gICAgaWYoIXdpZHRoKSB7XG4gICAgICAgIGNvZXJjZSgnc2NhbGVncm91cCcsIHRyYWNlT3V0Lm5hbWUpO1xuICAgICAgICBjb2VyY2UoJ3NjYWxlbW9kZScpO1xuICAgIH1cblxuICAgIHZhciBzcGFuID0gY29lcmNlKCdzcGFuJyk7XG4gICAgdmFyIHNwYW5tb2RlRGZsdDtcbiAgICBpZihBcnJheS5pc0FycmF5KHNwYW4pKSBzcGFubW9kZURmbHQgPSAnbWFudWFsJztcbiAgICBjb2VyY2UoJ3NwYW5tb2RlJywgc3Bhbm1vZGVEZmx0KTtcblxuICAgIHZhciBsaW5lQ29sb3IgPSBjb2VyY2UoJ2xpbmUuY29sb3InLCAodHJhY2VJbi5tYXJrZXIgfHwge30pLmNvbG9yIHx8IGRlZmF1bHRDb2xvcik7XG4gICAgdmFyIGxpbmVXaWR0aCA9IGNvZXJjZSgnbGluZS53aWR0aCcpO1xuICAgIHZhciBmaWxsQ29sb3IgPSBjb2VyY2UoJ2ZpbGxjb2xvcicsIENvbG9yLmFkZE9wYWNpdHkodHJhY2VPdXQubGluZS5jb2xvciwgMC41KSk7XG5cbiAgICBib3hEZWZhdWx0cy5oYW5kbGVQb2ludHNEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCB7cHJlZml4OiAnJ30pO1xuXG4gICAgdmFyIGJveFdpZHRoID0gY29lcmNlMignYm94LndpZHRoJyk7XG4gICAgdmFyIGJveEZpbGxDb2xvciA9IGNvZXJjZTIoJ2JveC5maWxsY29sb3InLCBmaWxsQ29sb3IpO1xuICAgIHZhciBib3hMaW5lQ29sb3IgPSBjb2VyY2UyKCdib3gubGluZS5jb2xvcicsIGxpbmVDb2xvcik7XG4gICAgdmFyIGJveExpbmVXaWR0aCA9IGNvZXJjZTIoJ2JveC5saW5lLndpZHRoJywgbGluZVdpZHRoKTtcbiAgICB2YXIgYm94VmlzaWJsZSA9IGNvZXJjZSgnYm94LnZpc2libGUnLCBCb29sZWFuKGJveFdpZHRoIHx8IGJveEZpbGxDb2xvciB8fCBib3hMaW5lQ29sb3IgfHwgYm94TGluZVdpZHRoKSk7XG4gICAgaWYoIWJveFZpc2libGUpIHRyYWNlT3V0LmJveCA9IHt2aXNpYmxlOiBmYWxzZX07XG5cbiAgICB2YXIgbWVhbkxpbmVDb2xvciA9IGNvZXJjZTIoJ21lYW5saW5lLmNvbG9yJywgbGluZUNvbG9yKTtcbiAgICB2YXIgbWVhbkxpbmVXaWR0aCA9IGNvZXJjZTIoJ21lYW5saW5lLndpZHRoJywgbGluZVdpZHRoKTtcbiAgICB2YXIgbWVhbkxpbmVWaXNpYmxlID0gY29lcmNlKCdtZWFubGluZS52aXNpYmxlJywgQm9vbGVhbihtZWFuTGluZUNvbG9yIHx8IG1lYW5MaW5lV2lkdGgpKTtcbiAgICBpZighbWVhbkxpbmVWaXNpYmxlKSB0cmFjZU91dC5tZWFubGluZSA9IHt2aXNpYmxlOiBmYWxzZX07XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbi8vIE1heWJlIGFkZCBrZXJuZWxzIG1vcmUgZG93biB0aGUgcm9hZCxcbi8vIGJ1dCBub3RlIHRoYXQgdGhlIGRlZmF1bHQgYHNwYW5tb2RlOiAnc29mdCdgIGJvdW5kcyBtaWdodCBoYXZlXG4vLyB0byBiZWNvbWUga2VybmVsLWRlcGVuZGVudFxudmFyIGtlcm5lbHMgPSB7XG4gICAgZ2F1c3NpYW46IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgcmV0dXJuICgxIC8gTWF0aC5zcXJ0KDIgKiBNYXRoLlBJKSkgKiBNYXRoLmV4cCgtMC41ICogdiAqIHYpO1xuICAgIH1cbn07XG5cbmV4cG9ydHMubWFrZUtERSA9IGZ1bmN0aW9uKGNhbGNJdGVtLCB0cmFjZSwgdmFscykge1xuICAgIHZhciBsZW4gPSB2YWxzLmxlbmd0aDtcbiAgICB2YXIga2VybmVsID0ga2VybmVscy5nYXVzc2lhbjtcbiAgICB2YXIgYmFuZHdpZHRoID0gY2FsY0l0ZW0uYmFuZHdpZHRoO1xuICAgIHZhciBmYWN0b3IgPSAxIC8gKGxlbiAqIGJhbmR3aWR0aCk7XG5cbiAgICAvLyBkb24ndCB1c2UgTGliLmFnZ051bXMgdG8gc2tpcCBpc051bWVyaWMgY2hlY2tzXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgc3VtICs9IGtlcm5lbCgoeCAtIHZhbHNbaV0pIC8gYmFuZHdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFjdG9yICogc3VtO1xuICAgIH07XG59O1xuXG5leHBvcnRzLmdldFBvc2l0aW9uT25LZGVQYXRoID0gZnVuY3Rpb24oY2FsY0l0ZW0sIHRyYWNlLCB2YWx1ZVB4KSB7XG4gICAgdmFyIHBvc0xldHRlciwgdmFsTGV0dGVyO1xuXG4gICAgaWYodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICBwb3NMZXR0ZXIgPSAneSc7XG4gICAgICAgIHZhbExldHRlciA9ICd4JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBwb3NMZXR0ZXIgPSAneCc7XG4gICAgICAgIHZhbExldHRlciA9ICd5JztcbiAgICB9XG5cbiAgICB2YXIgcG9pbnRPblBhdGggPSBMaWIuZmluZFBvaW50T25QYXRoKFxuICAgICAgICBjYWxjSXRlbS5wYXRoLFxuICAgICAgICB2YWx1ZVB4LFxuICAgICAgICB2YWxMZXR0ZXIsXG4gICAgICAgIHtwYXRoTGVuZ3RoOiBjYWxjSXRlbS5wYXRoTGVuZ3RofVxuICAgICk7XG5cbiAgICB2YXIgcG9zQ2VudGVyUHggPSBjYWxjSXRlbS5wb3NDZW50ZXJQeDtcbiAgICB2YXIgcG9zT25QYXRoMCA9IHBvaW50T25QYXRoW3Bvc0xldHRlcl07XG4gICAgdmFyIHBvc09uUGF0aDEgPSB0cmFjZS5zaWRlID09PSAnYm90aCcgP1xuICAgICAgICAyICogcG9zQ2VudGVyUHggLSBwb3NPblBhdGgwIDpcbiAgICAgICAgcG9zQ2VudGVyUHg7XG5cbiAgICByZXR1cm4gW3Bvc09uUGF0aDAsIHBvc09uUGF0aDFdO1xufTtcblxuZXhwb3J0cy5nZXRLZGVWYWx1ZSA9IGZ1bmN0aW9uKGNhbGNJdGVtLCB0cmFjZSwgdmFsdWVEaXN0KSB7XG4gICAgdmFyIHZhbHMgPSBjYWxjSXRlbS5wdHMubWFwKGV4cG9ydHMuZXh0cmFjdFZhbCk7XG4gICAgdmFyIGtkZSA9IGV4cG9ydHMubWFrZUtERShjYWxjSXRlbSwgdHJhY2UsIHZhbHMpO1xuICAgIHJldHVybiBrZGUodmFsdWVEaXN0KSAvIGNhbGNJdGVtLnBvc0RlbnNpdHlTY2FsZTtcbn07XG5cbmV4cG9ydHMuZXh0cmFjdFZhbCA9IGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8udjsgfTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIGJveEhvdmVyUG9pbnRzID0gcmVxdWlyZSgnLi4vYm94L2hvdmVyJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlLCBob3ZlckxheWVyKSB7XG4gICAgdmFyIGNkID0gcG9pbnREYXRhLmNkO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciBob3Zlcm9uID0gdHJhY2UuaG92ZXJvbjtcbiAgICB2YXIgaGFzSG92ZXJvblZpb2xpbnMgPSBob3Zlcm9uLmluZGV4T2YoJ3Zpb2xpbnMnKSAhPT0gLTE7XG4gICAgdmFyIGhhc0hvdmVyb25LREUgPSBob3Zlcm9uLmluZGV4T2YoJ2tkZScpICE9PSAtMTtcbiAgICB2YXIgY2xvc2VEYXRhID0gW107XG4gICAgdmFyIGNsb3NlUHREYXRhO1xuICAgIHZhciB2aW9saW5MaW5lQXR0cnM7XG5cbiAgICBpZihoYXNIb3Zlcm9uVmlvbGlucyB8fCBoYXNIb3Zlcm9uS0RFKSB7XG4gICAgICAgIHZhciBjbG9zZUJveERhdGEgPSBib3hIb3ZlclBvaW50cy5ob3Zlck9uQm94ZXMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpO1xuXG4gICAgICAgIGlmKGhhc0hvdmVyb25LREUgJiYgY2xvc2VCb3hEYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciB4YSA9IHBvaW50RGF0YS54YTtcbiAgICAgICAgICAgIHZhciB5YSA9IHBvaW50RGF0YS55YTtcbiAgICAgICAgICAgIHZhciBwTGV0dGVyLCB2TGV0dGVyLCBwQXhpcywgdkF4aXMsIHZWYWw7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgICAgICAgICB2VmFsID0geHZhbDtcbiAgICAgICAgICAgICAgICBwTGV0dGVyID0gJ3knO1xuICAgICAgICAgICAgICAgIHBBeGlzID0geWE7XG4gICAgICAgICAgICAgICAgdkxldHRlciA9ICd4JztcbiAgICAgICAgICAgICAgICB2QXhpcyA9IHhhO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2VmFsID0geXZhbDtcbiAgICAgICAgICAgICAgICBwTGV0dGVyID0gJ3gnO1xuICAgICAgICAgICAgICAgIHBBeGlzID0geGE7XG4gICAgICAgICAgICAgICAgdkxldHRlciA9ICd5JztcbiAgICAgICAgICAgICAgICB2QXhpcyA9IHlhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGkgPSBjZFtwb2ludERhdGEuaW5kZXhdO1xuXG4gICAgICAgICAgICBpZih2VmFsID49IGRpLnNwYW5bMF0gJiYgdlZhbCA8PSBkaS5zcGFuWzFdKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtkZVBvaW50RGF0YSA9IExpYi5leHRlbmRGbGF0KHt9LCBwb2ludERhdGEpO1xuICAgICAgICAgICAgICAgIHZhciB2VmFsUHggPSB2QXhpcy5jMnAodlZhbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdmFyIGtkZVZhbCA9IGhlbHBlcnMuZ2V0S2RlVmFsdWUoZGksIHRyYWNlLCB2VmFsKTtcbiAgICAgICAgICAgICAgICB2YXIgcE9uUGF0aCA9IGhlbHBlcnMuZ2V0UG9zaXRpb25PbktkZVBhdGgoZGksIHRyYWNlLCB2VmFsUHgpO1xuICAgICAgICAgICAgICAgIHZhciBwYU9mZnNldCA9IHBBeGlzLl9vZmZzZXQ7XG4gICAgICAgICAgICAgICAgdmFyIHBhTGVuZ3RoID0gcEF4aXMuX2xlbmd0aDtcblxuICAgICAgICAgICAgICAgIGtkZVBvaW50RGF0YVtwTGV0dGVyICsgJzAnXSA9IHBPblBhdGhbMF07XG4gICAgICAgICAgICAgICAga2RlUG9pbnREYXRhW3BMZXR0ZXIgKyAnMSddID0gcE9uUGF0aFsxXTtcbiAgICAgICAgICAgICAgICBrZGVQb2ludERhdGFbdkxldHRlciArICcwJ10gPSBrZGVQb2ludERhdGFbdkxldHRlciArICcxJ10gPSB2VmFsUHg7XG4gICAgICAgICAgICAgICAga2RlUG9pbnREYXRhW3ZMZXR0ZXIgKyAnTGFiZWwnXSA9IHZMZXR0ZXIgKyAnOiAnICsgQXhlcy5ob3ZlckxhYmVsVGV4dCh2QXhpcywgdlZhbCkgKyAnLCAnICsgY2RbMF0udC5sYWJlbHMua2RlICsgJyAnICsga2RlVmFsLnRvRml4ZWQoMyk7XG5cbiAgICAgICAgICAgICAgICAvLyBtb3ZlIHRoZSBzcGlrZSB0byB0aGUgS0RFIHBvaW50XG4gICAgICAgICAgICAgICAga2RlUG9pbnREYXRhLnNwaWtlRGlzdGFuY2UgPSBjbG9zZUJveERhdGFbMF0uc3Bpa2VEaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB2YXIgc3Bpa2VQb3NBdHRyID0gcExldHRlciArICdTcGlrZSc7XG4gICAgICAgICAgICAgICAga2RlUG9pbnREYXRhW3NwaWtlUG9zQXR0cl0gPSBjbG9zZUJveERhdGFbMF1bc3Bpa2VQb3NBdHRyXTtcbiAgICAgICAgICAgICAgICBjbG9zZUJveERhdGFbMF0uc3Bpa2VEaXN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjbG9zZUJveERhdGFbMF1bc3Bpa2VQb3NBdHRyXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIC8vIG5vIGhvdmVydGVtcGxhdGUgc3VwcG9ydCB5ZXRcbiAgICAgICAgICAgICAgICBrZGVQb2ludERhdGEuaG92ZXJ0ZW1wbGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY2xvc2VEYXRhLnB1c2goa2RlUG9pbnREYXRhKTtcblxuICAgICAgICAgICAgICAgIHZpb2xpbkxpbmVBdHRycyA9IHtzdHJva2U6IHBvaW50RGF0YS5jb2xvcn07XG4gICAgICAgICAgICAgICAgdmlvbGluTGluZUF0dHJzW3BMZXR0ZXIgKyAnMSddID0gTGliLmNvbnN0cmFpbihwYU9mZnNldCArIHBPblBhdGhbMF0sIHBhT2Zmc2V0LCBwYU9mZnNldCArIHBhTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2aW9saW5MaW5lQXR0cnNbcExldHRlciArICcyJ10gPSBMaWIuY29uc3RyYWluKHBhT2Zmc2V0ICsgcE9uUGF0aFsxXSwgcGFPZmZzZXQsIHBhT2Zmc2V0ICsgcGFMZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZpb2xpbkxpbmVBdHRyc1t2TGV0dGVyICsgJzEnXSA9IHZpb2xpbkxpbmVBdHRyc1t2TGV0dGVyICsgJzInXSA9IHZBeGlzLl9vZmZzZXQgKyB2VmFsUHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihoYXNIb3Zlcm9uVmlvbGlucykge1xuICAgICAgICAgICAgY2xvc2VEYXRhID0gY2xvc2VEYXRhLmNvbmNhdChjbG9zZUJveERhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoaG92ZXJvbi5pbmRleE9mKCdwb2ludHMnKSAhPT0gLTEpIHtcbiAgICAgICAgY2xvc2VQdERhdGEgPSBib3hIb3ZlclBvaW50cy5ob3Zlck9uUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHZpb2xpbiBsaW5lIChpZiBhbnkpXG4gICAgdmFyIHZpb2xpbkxpbmUgPSBob3ZlckxheWVyLnNlbGVjdEFsbCgnLnZpb2xpbmxpbmUtJyArIHRyYWNlLnVpZClcbiAgICAgICAgLmRhdGEodmlvbGluTGluZUF0dHJzID8gWzBdIDogW10pO1xuICAgIHZpb2xpbkxpbmUuZW50ZXIoKS5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAuY2xhc3NlZCgndmlvbGlubGluZS0nICsgdHJhY2UudWlkLCB0cnVlKVxuICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMS41KTtcbiAgICB2aW9saW5MaW5lLmV4aXQoKS5yZW1vdmUoKTtcbiAgICB2aW9saW5MaW5lLmF0dHIodmlvbGluTGluZUF0dHJzKTtcblxuICAgIC8vIHNhbWUgY29tYmluZSBsb2dpYyBhcyBib3ggaG92ZXJQb2ludHNcbiAgICBpZihob3Zlcm1vZGUgPT09ICdjbG9zZXN0Jykge1xuICAgICAgICBpZihjbG9zZVB0RGF0YSkgcmV0dXJuIFtjbG9zZVB0RGF0YV07XG4gICAgICAgIHJldHVybiBjbG9zZURhdGE7XG4gICAgfVxuICAgIGlmKGNsb3NlUHREYXRhKSB7XG4gICAgICAgIGNsb3NlRGF0YS5wdXNoKGNsb3NlUHREYXRhKTtcbiAgICAgICAgcmV0dXJuIGNsb3NlRGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGNsb3NlRGF0YTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNyb3NzVHJhY2VEZWZhdWx0czogcmVxdWlyZSgnLi4vYm94L2RlZmF1bHRzJykuY3Jvc3NUcmFjZURlZmF1bHRzLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIGNyb3NzVHJhY2VDYWxjOiByZXF1aXJlKCcuL2Nyb3NzX3RyYWNlX2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuICAgIHN0eWxlT25TZWxlY3Q6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvc3R5bGUnKS5zdHlsZU9uU2VsZWN0LFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuLi9ib3gvc2VsZWN0JyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICd2aW9saW4nLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4nKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2NhcnRlc2lhbicsICdzdmcnLCAnc3ltYm9scycsICdvcmllbnRlZCcsICdib3gtdmlvbGluJywgJ3Nob3dMZWdlbmQnLCAndmlvbGluTGF5b3V0JywgJ3pvb21TY2FsZSddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdJbiB2ZXJ0aWNhbCAoaG9yaXpvbnRhbCkgdmlvbGluIHBsb3RzLCcsXG4gICAgICAgICAgICAnc3RhdGlzdGljcyBhcmUgY29tcHV0ZWQgdXNpbmcgYHlgIChgeGApIHZhbHVlcy4nLFxuICAgICAgICAgICAgJ0J5IHN1cHBseWluZyBhbiBgeGAgKGB5YCkgYXJyYXksIG9uZSB2aW9saW4gcGVyIGRpc3RpbmN0IHggKHkpIHZhbHVlJyxcbiAgICAgICAgICAgICdpcyBkcmF3bicsXG4gICAgICAgICAgICAnSWYgbm8gYHhgIChgeWApIHthcnJheX0gaXMgcHJvdmlkZWQsIGEgc2luZ2xlIHZpb2xpbiBpcyBkcmF3bi4nLFxuICAgICAgICAgICAgJ1RoYXQgdmlvbGluIHBvc2l0aW9uIGlzIHRoZW4gcG9zaXRpb25lZCB3aXRoJyxcbiAgICAgICAgICAgICd3aXRoIGBuYW1lYCBvciB3aXRoIGB4MGAgKGB5MGApIGlmIHByb3ZpZGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYm94TGF5b3V0QXR0cnMgPSByZXF1aXJlKCcuLi9ib3gvbGF5b3V0X2F0dHJpYnV0ZXMnKTtcbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuZXh0ZW5kRmxhdDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdmlvbGlubW9kZTogZXh0ZW5kRmxhdCh7fSwgYm94TGF5b3V0QXR0cnMuYm94bW9kZSwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaG93IHZpb2xpbnMgYXQgdGhlIHNhbWUgbG9jYXRpb24gY29vcmRpbmF0ZScsXG4gICAgICAgICAgICAnYXJlIGRpc3BsYXllZCBvbiB0aGUgZ3JhcGguJyxcbiAgICAgICAgICAgICdJZiAqZ3JvdXAqLCB0aGUgdmlvbGlucyBhcmUgcGxvdHRlZCBuZXh0IHRvIG9uZSBhbm90aGVyJyxcbiAgICAgICAgICAgICdjZW50ZXJlZCBhcm91bmQgdGhlIHNoYXJlZCBsb2NhdGlvbi4nLFxuICAgICAgICAgICAgJ0lmICpvdmVybGF5KiwgdGhlIHZpb2xpbnMgYXJlIHBsb3R0ZWQgb3ZlciBvbmUgYW5vdGhlciwnLFxuICAgICAgICAgICAgJ3lvdSBtaWdodCBuZWVkIHRvIHNldCAqb3BhY2l0eSogdG8gc2VlIHRoZW0gbXVsdGlwbGUgdmlvbGlucy4nLFxuICAgICAgICAgICAgJ0hhcyBubyBlZmZlY3Qgb24gdHJhY2VzIHRoYXQgaGF2ZSAqd2lkdGgqIHNldC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgdmlvbGluZ2FwOiBleHRlbmRGbGF0KHt9LCBib3hMYXlvdXRBdHRycy5ib3hnYXAsIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBnYXAgKGluIHBsb3QgZnJhY3Rpb24pIGJldHdlZW4gdmlvbGlucyBvZicsXG4gICAgICAgICAgICAnYWRqYWNlbnQgbG9jYXRpb24gY29vcmRpbmF0ZXMuJyxcbiAgICAgICAgICAgICdIYXMgbm8gZWZmZWN0IG9uIHRyYWNlcyB0aGF0IGhhdmUgKndpZHRoKiBzZXQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIHZpb2xpbmdyb3VwZ2FwOiBleHRlbmRGbGF0KHt9LCBib3hMYXlvdXRBdHRycy5ib3hncm91cGdhcCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGdhcCAoaW4gcGxvdCBmcmFjdGlvbikgYmV0d2VlbiB2aW9saW5zIG9mJyxcbiAgICAgICAgICAgICd0aGUgc2FtZSBsb2NhdGlvbiBjb29yZGluYXRlLicsXG4gICAgICAgICAgICAnSGFzIG5vIGVmZmVjdCBvbiB0cmFjZXMgdGhhdCBoYXZlICp3aWR0aCogc2V0LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGxheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG52YXIgYm94TGF5b3V0RGVmYXVsdHMgPSByZXF1aXJlKCcuLi9ib3gvbGF5b3V0X2RlZmF1bHRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5TGF5b3V0RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShsYXlvdXRJbiwgbGF5b3V0T3V0LCBsYXlvdXRBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG4gICAgYm94TGF5b3V0RGVmYXVsdHMuX3N1cHBseShsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSwgY29lcmNlLCAndmlvbGluJyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcblxudmFyIGJveFBsb3QgPSByZXF1aXJlKCcuLi9ib3gvcGxvdCcpO1xudmFyIGxpbmVQb2ludHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2xpbmVfcG9pbnRzJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ2QsIHBsb3RpbmZvLCBjZFZpb2xpbnMsIHZpb2xpbkxheWVyKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcblxuICAgIGZ1bmN0aW9uIG1ha2VQYXRoKHB0cykge1xuICAgICAgICB2YXIgc2VnbWVudHMgPSBsaW5lUG9pbnRzKHB0cywge1xuICAgICAgICAgICAgeGF4aXM6IHhhLFxuICAgICAgICAgICAgeWF4aXM6IHlhLFxuICAgICAgICAgICAgY29ubmVjdEdhcHM6IHRydWUsXG4gICAgICAgICAgICBiYXNlVG9sZXJhbmNlOiAwLjc1LFxuICAgICAgICAgICAgc2hhcGU6ICdzcGxpbmUnLFxuICAgICAgICAgICAgc2ltcGxpZnk6IHRydWUsXG4gICAgICAgICAgICBsaW5lYXJpemVkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRHJhd2luZy5zbW9vdGhvcGVuKHNlZ21lbnRzWzBdLCAxKTtcbiAgICB9XG5cbiAgICBMaWIubWFrZVRyYWNlR3JvdXBzKHZpb2xpbkxheWVyLCBjZFZpb2xpbnMsICd0cmFjZSB2aW9saW5zJykuZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICB2YXIgcGxvdEdyb3VwID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgY2QwID0gY2RbMF07XG4gICAgICAgIHZhciB0ID0gY2QwLnQ7XG4gICAgICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcblxuICAgICAgICBpZih0cmFjZS52aXNpYmxlICE9PSB0cnVlIHx8IHQuZW1wdHkpIHtcbiAgICAgICAgICAgIHBsb3RHcm91cC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBiUG9zID0gdC5iUG9zO1xuICAgICAgICB2YXIgYmRQb3MgPSB0LmJkUG9zO1xuICAgICAgICB2YXIgdmFsQXhpcyA9IHBsb3RpbmZvW3QudmFsTGV0dGVyICsgJ2F4aXMnXTtcbiAgICAgICAgdmFyIHBvc0F4aXMgPSBwbG90aW5mb1t0LnBvc0xldHRlciArICdheGlzJ107XG4gICAgICAgIHZhciBoYXNCb3RoU2lkZXMgPSB0cmFjZS5zaWRlID09PSAnYm90aCc7XG4gICAgICAgIHZhciBoYXNQb3NpdGl2ZVNpZGUgPSBoYXNCb3RoU2lkZXMgfHwgdHJhY2Uuc2lkZSA9PT0gJ3Bvc2l0aXZlJztcbiAgICAgICAgdmFyIGhhc05lZ2F0aXZlU2lkZSA9IGhhc0JvdGhTaWRlcyB8fCB0cmFjZS5zaWRlID09PSAnbmVnYXRpdmUnO1xuXG4gICAgICAgIHZhciB2aW9saW5zID0gcGxvdEdyb3VwLnNlbGVjdEFsbCgncGF0aC52aW9saW4nKS5kYXRhKExpYi5pZGVudGl0eSk7XG5cbiAgICAgICAgdmlvbGlucy5lbnRlcigpLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd2aW9saW4nKTtcblxuICAgICAgICB2aW9saW5zLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgICB2aW9saW5zLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHBhdGhTZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICB2YXIgZGVuc2l0eSA9IGQuZGVuc2l0eTtcbiAgICAgICAgICAgIHZhciBsZW4gPSBkZW5zaXR5Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBwb3NDZW50ZXIgPSBwb3NBeGlzLmMybChkLnBvcyArIGJQb3MsIHRydWUpO1xuICAgICAgICAgICAgdmFyIHBvc0NlbnRlclB4ID0gcG9zQXhpcy5sMnAocG9zQ2VudGVyKTtcblxuICAgICAgICAgICAgdmFyIHNjYWxlO1xuICAgICAgICAgICAgaWYodHJhY2Uud2lkdGgpIHtcbiAgICAgICAgICAgICAgICBzY2FsZSA9IHQubWF4S0RFIC8gYmRQb3M7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBncm91cFN0YXRzID0gZnVsbExheW91dC5fdmlvbGluU2NhbGVHcm91cFN0YXRzW3RyYWNlLnNjYWxlZ3JvdXBdO1xuICAgICAgICAgICAgICAgIHNjYWxlID0gdHJhY2Uuc2NhbGVtb2RlID09PSAnY291bnQnID9cbiAgICAgICAgICAgICAgICAgICAgKGdyb3VwU3RhdHMubWF4S0RFIC8gYmRQb3MpICogKGdyb3VwU3RhdHMubWF4Q291bnQgLyBkLnB0cy5sZW5ndGgpIDpcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBTdGF0cy5tYXhLREUgLyBiZFBvcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhdGhQb3MsIHBhdGhOZWcsIHBhdGg7XG4gICAgICAgICAgICB2YXIgaSwgaywgcHRzLCBwdDtcblxuICAgICAgICAgICAgaWYoaGFzUG9zaXRpdmVTaWRlKSB7XG4gICAgICAgICAgICAgICAgcHRzID0gbmV3IEFycmF5KGxlbik7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcHQgPSBwdHNbaV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgcHRbdC5wb3NMZXR0ZXJdID0gcG9zQ2VudGVyICsgKGRlbnNpdHlbaV0udiAvIHNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgcHRbdC52YWxMZXR0ZXJdID0gdmFsQXhpcy5jMmwoZGVuc2l0eVtpXS50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aFBvcyA9IG1ha2VQYXRoKHB0cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGhhc05lZ2F0aXZlU2lkZSkge1xuICAgICAgICAgICAgICAgIHB0cyA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICAgICAgICAgIGZvcihrID0gMCwgaSA9IGxlbiAtIDE7IGsgPCBsZW47IGsrKywgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHB0ID0gcHRzW2tdID0ge307XG4gICAgICAgICAgICAgICAgICAgIHB0W3QucG9zTGV0dGVyXSA9IHBvc0NlbnRlciAtIChkZW5zaXR5W2ldLnYgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIHB0W3QudmFsTGV0dGVyXSA9IHZhbEF4aXMuYzJsKGRlbnNpdHlbaV0udCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGhOZWcgPSBtYWtlUGF0aChwdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihoYXNCb3RoU2lkZXMpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aFBvcyArICdMJyArIHBhdGhOZWcuc3Vic3RyKDEpICsgJ1onO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRQdCA9IFtwb3NDZW50ZXJQeCwgdmFsQXhpcy5jMnAoZGVuc2l0eVswXS50KV07XG4gICAgICAgICAgICAgICAgdmFyIGVuZFB0ID0gW3Bvc0NlbnRlclB4LCB2YWxBeGlzLmMycChkZW5zaXR5W2xlbiAtIDFdLnQpXTtcblxuICAgICAgICAgICAgICAgIGlmKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRQdC5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVuZFB0LnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihoYXNQb3NpdGl2ZVNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9ICdNJyArIHN0YXJ0UHQgKyAnTCcgKyBwYXRoUG9zLnN1YnN0cigxKSArICdMJyArIGVuZFB0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSAnTScgKyBlbmRQdCArICdMJyArIHBhdGhOZWcuc3Vic3RyKDEpICsgJ0wnICsgc3RhcnRQdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXRoU2VsLmF0dHIoJ2QnLCBwYXRoKTtcblxuICAgICAgICAgICAgLy8gc2F2ZSBhIGZldyB0aGluZ3MgdXNlZCBpbiBnZXRQb3NpdGlvbk9uS2RlUGF0aCwgZ2V0S2RlVmFsdWVcbiAgICAgICAgICAgIC8vIG9uIGhvdmVyIGFuZCBmb3IgbWVhbmxpbmUgZHJhdyBibG9jayBiZWxvd1xuICAgICAgICAgICAgZC5wb3NDZW50ZXJQeCA9IHBvc0NlbnRlclB4O1xuICAgICAgICAgICAgZC5wb3NEZW5zaXR5U2NhbGUgPSBzY2FsZSAqIGJkUG9zO1xuICAgICAgICAgICAgZC5wYXRoID0gcGF0aFNlbC5ub2RlKCk7XG4gICAgICAgICAgICBkLnBhdGhMZW5ndGggPSBkLnBhdGguZ2V0VG90YWxMZW5ndGgoKSAvIChoYXNCb3RoU2lkZXMgPyAyIDogMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBib3hBdHRycyA9IHRyYWNlLmJveDtcbiAgICAgICAgdmFyIGJveFdpZHRoID0gYm94QXR0cnMud2lkdGg7XG4gICAgICAgIHZhciBib3hMaW5lV2lkdGggPSAoYm94QXR0cnMubGluZSB8fCB7fSkud2lkdGg7XG4gICAgICAgIHZhciBiZFBvc1NjYWxlZDtcbiAgICAgICAgdmFyIGJQb3NQeE9mZnNldDtcblxuICAgICAgICBpZihoYXNCb3RoU2lkZXMpIHtcbiAgICAgICAgICAgIGJkUG9zU2NhbGVkID0gYmRQb3MgKiBib3hXaWR0aDtcbiAgICAgICAgICAgIGJQb3NQeE9mZnNldCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZihoYXNQb3NpdGl2ZVNpZGUpIHtcbiAgICAgICAgICAgIGJkUG9zU2NhbGVkID0gWzAsIGJkUG9zICogYm94V2lkdGggLyAyXTtcbiAgICAgICAgICAgIGJQb3NQeE9mZnNldCA9IGJveExpbmVXaWR0aCAqIHt4OiAxLCB5OiAtMX1bdC5wb3NMZXR0ZXJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmRQb3NTY2FsZWQgPSBbYmRQb3MgKiBib3hXaWR0aCAvIDIsIDBdO1xuICAgICAgICAgICAgYlBvc1B4T2Zmc2V0ID0gYm94TGluZVdpZHRoICoge3g6IC0xLCB5OiAxfVt0LnBvc0xldHRlcl07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbm5lciBib3hcbiAgICAgICAgYm94UGxvdC5wbG90Qm94QW5kV2hpc2tlcnMocGxvdEdyb3VwLCB7cG9zOiBwb3NBeGlzLCB2YWw6IHZhbEF4aXN9LCB0cmFjZSwge1xuICAgICAgICAgICAgYlBvczogYlBvcyxcbiAgICAgICAgICAgIGJkUG9zOiBiZFBvc1NjYWxlZCxcbiAgICAgICAgICAgIGJQb3NQeE9mZnNldDogYlBvc1B4T2Zmc2V0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIG1lYW5saW5lIGluc2lkZXIgYm94XG4gICAgICAgIGJveFBsb3QucGxvdEJveE1lYW4ocGxvdEdyb3VwLCB7cG9zOiBwb3NBeGlzLCB2YWw6IHZhbEF4aXN9LCB0cmFjZSwge1xuICAgICAgICAgICAgYlBvczogYlBvcyxcbiAgICAgICAgICAgIGJkUG9zOiBiZFBvc1NjYWxlZCxcbiAgICAgICAgICAgIGJQb3NQeE9mZnNldDogYlBvc1B4T2Zmc2V0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBmbjtcbiAgICAgICAgaWYoIXRyYWNlLmJveC52aXNpYmxlICYmIHRyYWNlLm1lYW5saW5lLnZpc2libGUpIHtcbiAgICAgICAgICAgIGZuID0gTGliLmlkZW50aXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTi5CLiB1c2UgZGlmZmVyZW50IGNsYXNzIG5hbWUgdGhhbiBib3hQbG90LnBsb3RCb3hNZWFuLFxuICAgICAgICAvLyB0byBhdm9pZCBzZWxlY3RBbGwgY29uZmxpY3RcbiAgICAgICAgdmFyIG1lYW5QYXRocyA9IHBsb3RHcm91cC5zZWxlY3RBbGwoJ3BhdGgubWVhbmxpbmUnKS5kYXRhKGZuIHx8IFtdKTtcbiAgICAgICAgbWVhblBhdGhzLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdtZWFubGluZScpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgICAgICAuc3R5bGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJyk7XG4gICAgICAgIG1lYW5QYXRocy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIG1lYW5QYXRocy5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciB2ID0gdmFsQXhpcy5jMnAoZC5tZWFuLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciBwID0gaGVscGVycy5nZXRQb3NpdGlvbk9uS2RlUGF0aChkLCB0cmFjZSwgdik7XG5cbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkJyxcbiAgICAgICAgICAgICAgICB0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnID9cbiAgICAgICAgICAgICAgICAgICAgJ00nICsgdiArICcsJyArIHBbMF0gKyAnVicgKyBwWzFdIDpcbiAgICAgICAgICAgICAgICAgICAgJ00nICsgcFswXSArICcsJyArIHYgKyAnSCcgKyBwWzFdXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBib3hQbG90LnBsb3RQb2ludHMocGxvdEdyb3VwLCB7eDogeGEsIHk6IHlhfSwgdHJhY2UsIHQpO1xuICAgIH0pO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBzdHlsZVBvaW50cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvc3R5bGUnKS5zdHlsZVBvaW50cztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHlsZShnZCkge1xuICAgIHZhciBzID0gZDMuc2VsZWN0KGdkKS5zZWxlY3RBbGwoJ2cudHJhY2UudmlvbGlucycpO1xuXG4gICAgcy5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRbMF0udHJhY2Uub3BhY2l0eTsgfSk7XG5cbiAgICBzLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgdHJhY2UgPSBkWzBdLnRyYWNlO1xuICAgICAgICB2YXIgc2VsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgYm94ID0gdHJhY2UuYm94IHx8IHt9O1xuICAgICAgICB2YXIgYm94TGluZSA9IGJveC5saW5lIHx8IHt9O1xuICAgICAgICB2YXIgbWVhbmxpbmUgPSB0cmFjZS5tZWFubGluZSB8fCB7fTtcbiAgICAgICAgdmFyIG1lYW5MaW5lV2lkdGggPSBtZWFubGluZS53aWR0aDtcblxuICAgICAgICBzZWwuc2VsZWN0QWxsKCdwYXRoLnZpb2xpbicpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIHRyYWNlLmxpbmUud2lkdGggKyAncHgnKVxuICAgICAgICAgICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCB0cmFjZS5saW5lLmNvbG9yKVxuICAgICAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgdHJhY2UuZmlsbGNvbG9yKTtcblxuICAgICAgICBzZWwuc2VsZWN0QWxsKCdwYXRoLmJveCcpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGJveExpbmUud2lkdGggKyAncHgnKVxuICAgICAgICAgICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCBib3hMaW5lLmNvbG9yKVxuICAgICAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgYm94LmZpbGxjb2xvcik7XG5cbiAgICAgICAgdmFyIG1lYW5MaW5lU3R5bGUgPSB7XG4gICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogbWVhbkxpbmVXaWR0aCArICdweCcsXG4gICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6ICgyICogbWVhbkxpbmVXaWR0aCkgKyAncHgsJyArIG1lYW5MaW5lV2lkdGggKyAncHgnXG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsLnNlbGVjdEFsbCgncGF0aC5tZWFuJylcbiAgICAgICAgICAgIC5zdHlsZShtZWFuTGluZVN0eWxlKVxuICAgICAgICAgICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCBtZWFubGluZS5jb2xvcik7XG5cbiAgICAgICAgc2VsLnNlbGVjdEFsbCgncGF0aC5tZWFubGluZScpXG4gICAgICAgICAgICAuc3R5bGUobWVhbkxpbmVTdHlsZSlcbiAgICAgICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgbWVhbmxpbmUuY29sb3IpO1xuXG4gICAgICAgIHN0eWxlUG9pbnRzKHNlbCwgdHJhY2UsIGdkKTtcbiAgICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9