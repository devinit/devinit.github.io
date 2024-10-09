(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_scattercarpet_js"],{

/***/ "./node_modules/plotly.js/lib/scattercarpet.js":
/*!*****************************************************!*\
  !*** ./node_modules/plotly.js/lib/scattercarpet.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/scattercarpet */ "./node_modules/plotly.js/src/traces/scattercarpet/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattercarpet/attributes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattercarpet/attributes.js ***!
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



var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var scatterMarkerAttrs = scatterAttrs.marker;
var scatterLineAttrs = scatterAttrs.line;
var scatterMarkerLineAttrs = scatterMarkerAttrs.line;

module.exports = {
    carpet: {
        valType: 'string',
        role: 'info',
        editType: 'calc',
        description: [
            'An identifier for this carpet, so that `scattercarpet` and',
            '`contourcarpet` traces can specify a carpet plot on which',
            'they lie'
        ].join(' ')
    },
    a: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the a-axis coordinates.'
    },
    b: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the b-axis coordinates.'
    },
    mode: extendFlat({}, scatterAttrs.mode, {dflt: 'markers'}),
    text: extendFlat({}, scatterAttrs.text, {
        description: [
            'Sets text elements associated with each (a,b) point.',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of strings, the items are mapped in order to the',
            'the data points in (a,b).',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    }),
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: ['a', 'b', 'text']
    }),
    hovertext: extendFlat({}, scatterAttrs.hovertext, {
        description: [
            'Sets hover text elements associated with each (a,b) point.',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of strings, the items are mapped in order to the',
            'the data points in (a,b).',
            'To be seen, trace `hoverinfo` must contain a *text* flag.'
        ].join(' ')
    }),
    line: {
        color: scatterLineAttrs.color,
        width: scatterLineAttrs.width,
        dash: scatterLineAttrs.dash,
        shape: extendFlat({}, scatterLineAttrs.shape,
            {values: ['linear', 'spline']}),
        smoothing: scatterLineAttrs.smoothing,
        editType: 'calc'
    },
    connectgaps: scatterAttrs.connectgaps,
    fill: extendFlat({}, scatterAttrs.fill, {
        values: ['none', 'toself', 'tonext'],
        dflt: 'none',
        description: [
            'Sets the area to fill with a solid color.',
            'Use with `fillcolor` if not *none*.',
            'scatterternary has a subset of the options available to scatter.',
            '*toself* connects the endpoints of the trace (or each segment',
            'of the trace if it has gaps) into a closed shape.',
            '*tonext* fills the space between two traces if one completely',
            'encloses the other (eg consecutive contour lines), and behaves like',
            '*toself* if there is no trace before it. *tonext* should not be',
            'used if one trace does not enclose the other.'
        ].join(' ')
    }),
    fillcolor: scatterAttrs.fillcolor,
    marker: extendFlat({
        symbol: scatterMarkerAttrs.symbol,
        opacity: scatterMarkerAttrs.opacity,
        maxdisplayed: scatterMarkerAttrs.maxdisplayed,
        size: scatterMarkerAttrs.size,
        sizeref: scatterMarkerAttrs.sizeref,
        sizemin: scatterMarkerAttrs.sizemin,
        sizemode: scatterMarkerAttrs.sizemode,
        line: extendFlat({
            width: scatterMarkerLineAttrs.width,
            editType: 'calc'
        },
            colorScaleAttrs('marker.line')
        ),
        gradient: scatterMarkerAttrs.gradient,
        editType: 'calc'
    },
        colorScaleAttrs('marker')
    ),

    textfont: scatterAttrs.textfont,
    textposition: scatterAttrs.textposition,

    selected: scatterAttrs.selected,
    unselected: scatterAttrs.unselected,

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['a', 'b', 'text', 'name']
    }),
    hoveron: scatterAttrs.hoveron,
    hovertemplate: hovertemplateAttrs()
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattercarpet/calc.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattercarpet/calc.js ***!
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




var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var calcColorscale = __webpack_require__(/*! ../scatter/colorscale_calc */ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js");
var arraysToCalcdata = __webpack_require__(/*! ../scatter/arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");
var calcMarkerSize = __webpack_require__(/*! ../scatter/calc */ "./node_modules/plotly.js/src/traces/scatter/calc.js").calcMarkerSize;
var lookupCarpet = __webpack_require__(/*! ../carpet/lookup_carpetid */ "./node_modules/plotly.js/src/traces/carpet/lookup_carpetid.js");

module.exports = function calc(gd, trace) {
    var carpet = trace._carpetTrace = lookupCarpet(gd, trace);
    if(!carpet || !carpet.visible || carpet.visible === 'legendonly') return;
    var i;

    // Transfer this over from carpet before plotting since this is a necessary
    // condition in order for cartesian to actually plot this trace:
    trace.xaxis = carpet.xaxis;
    trace.yaxis = carpet.yaxis;

    // make the calcdata array
    var serieslen = trace._length;
    var cd = new Array(serieslen);
    var a, b;
    var needsCull = false;
    for(i = 0; i < serieslen; i++) {
        a = trace.a[i];
        b = trace.b[i];
        if(isNumeric(a) && isNumeric(b)) {
            var xy = carpet.ab2xy(+a, +b, true);
            var visible = carpet.isVisible(+a, +b);
            if(!visible) needsCull = true;
            cd[i] = {x: xy[0], y: xy[1], a: a, b: b, vis: visible};
        } else cd[i] = {x: false, y: false};
    }

    trace._needsCull = needsCull;

    cd[0].carpet = carpet;
    cd[0].trace = trace;

    calcMarkerSize(trace, serieslen);
    calcColorscale(gd, trace);
    arraysToCalcdata(cd, trace);
    calcSelection(cd, trace);

    return cd;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattercarpet/defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattercarpet/defaults.js ***!
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

var constants = __webpack_require__(/*! ../scatter/constants */ "./node_modules/plotly.js/src/traces/scatter/constants.js");
var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var handleMarkerDefaults = __webpack_require__(/*! ../scatter/marker_defaults */ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js");
var handleLineDefaults = __webpack_require__(/*! ../scatter/line_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js");
var handleLineShapeDefaults = __webpack_require__(/*! ../scatter/line_shape_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_shape_defaults.js");
var handleTextDefaults = __webpack_require__(/*! ../scatter/text_defaults */ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js");
var handleFillColorDefaults = __webpack_require__(/*! ../scatter/fillcolor_defaults */ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js");

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scattercarpet/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    coerce('carpet');

    // XXX: Don't hard code this
    traceOut.xaxis = 'x';
    traceOut.yaxis = 'y';

    var a = coerce('a');
    var b = coerce('b');
    var len = Math.min(a.length, b.length);

    if(!len) {
        traceOut.visible = false;
        return;
    }

    traceOut._length = len;

    coerce('text');
    coerce('texttemplate');
    coerce('hovertext');

    var defaultMode = len < constants.PTS_LINESONLY ? 'lines+markers' : 'lines';
    coerce('mode', defaultMode);

    if(subTypes.hasLines(traceOut)) {
        handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);
        handleLineShapeDefaults(traceIn, traceOut, coerce);
        coerce('connectgaps');
    }

    if(subTypes.hasMarkers(traceOut)) {
        handleMarkerDefaults(traceIn, traceOut, defaultColor, layout, coerce, {gradient: true});
    }

    if(subTypes.hasText(traceOut)) {
        handleTextDefaults(traceIn, traceOut, layout, coerce);
    }

    var dfltHoverOn = [];

    if(subTypes.hasMarkers(traceOut) || subTypes.hasText(traceOut)) {
        coerce('marker.maxdisplayed');
        dfltHoverOn.push('points');
    }

    coerce('fill');
    if(traceOut.fill !== 'none') {
        handleFillColorDefaults(traceIn, traceOut, defaultColor, coerce);
        if(!subTypes.hasLines(traceOut)) handleLineShapeDefaults(traceIn, traceOut, coerce);
    }

    if(traceOut.fill === 'tonext' || traceOut.fill === 'toself') {
        dfltHoverOn.push('fills');
    }

    var hoverOn = coerce('hoveron', dfltHoverOn.join('+') || 'points');
    if(hoverOn !== 'fills') coerce('hovertemplate');

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattercarpet/event_data.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattercarpet/event_data.js ***!
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



module.exports = function eventData(out, pt, trace, cd, pointNumber) {
    var cdi = cd[pointNumber];

    out.a = cdi.a;
    out.b = cdi.b;
    out.y = cdi.y;

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattercarpet/format_labels.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattercarpet/format_labels.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function formatLabels(cdi, trace) {
    var labels = {};

    var carpet = trace._carpet;
    var ij = carpet.ab2ij([cdi.a, cdi.b]);
    var i0 = Math.floor(ij[0]);
    var ti = ij[0] - i0;
    var j0 = Math.floor(ij[1]);
    var tj = ij[1] - j0;
    var xy = carpet.evalxy([], i0, j0, ti, tj);

    labels.yLabel = xy[1].toFixed(3);

    return labels;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattercarpet/hover.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattercarpet/hover.js ***!
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



var scatterHover = __webpack_require__(/*! ../scatter/hover */ "./node_modules/plotly.js/src/traces/scatter/hover.js");
var fillText = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").fillText;

module.exports = function hoverPoints(pointData, xval, yval, hovermode) {
    var scatterPointData = scatterHover(pointData, xval, yval, hovermode);
    if(!scatterPointData || scatterPointData[0].index === false) return;

    var newPointData = scatterPointData[0];

    // if hovering on a fill, we don't show any point data so the label is
    // unchanged from what scatter gives us - except that it needs to
    // be constrained to the trianglular plot area, not just the rectangular
    // area defined by the synthetic x and y axes
    // TODO: in some cases the vertical middle of the shape is not within
    // the triangular viewport at all, so the label can become disconnected
    // from the shape entirely. But calculating what portion of the shape
    // is actually visible, as constrained by the diagonal axis lines, is not
    // so easy and anyway we lost the information we would have needed to do
    // this inside scatterHover.
    if(newPointData.index === undefined) {
        var yFracUp = 1 - (newPointData.y0 / pointData.ya._length);
        var xLen = pointData.xa._length;
        var xMin = xLen * yFracUp / 2;
        var xMax = xLen - xMin;
        newPointData.x0 = Math.max(Math.min(newPointData.x0, xMax), xMin);
        newPointData.x1 = Math.max(Math.min(newPointData.x1, xMax), xMin);
        return scatterPointData;
    }

    var cdi = newPointData.cd[newPointData.index];

    newPointData.a = cdi.a;
    newPointData.b = cdi.b;

    newPointData.xLabelVal = undefined;
    newPointData.yLabelVal = undefined;
    // TODO: nice formatting, and label by axis title, for a, b, and c?

    var trace = newPointData.trace;
    var carpet = trace._carpet;

    var labels = trace._module.formatLabels(cdi, trace);
    newPointData.yLabel = labels.yLabel;

    delete newPointData.text;
    var text = [];

    function textPart(ax, val) {
        var prefix;

        if(ax.labelprefix && ax.labelprefix.length > 0) {
            prefix = ax.labelprefix.replace(/ = $/, '');
        } else {
            prefix = ax._hovertitle;
        }

        text.push(prefix + ': ' + val.toFixed(3) + ax.labelsuffix);
    }


    if(!trace.hovertemplate) {
        var hoverinfo = cdi.hi || trace.hoverinfo;
        var parts = hoverinfo.split('+');

        if(parts.indexOf('all') !== -1) parts = ['a', 'b', 'text'];
        if(parts.indexOf('a') !== -1) textPart(carpet.aaxis, cdi.a);
        if(parts.indexOf('b') !== -1) textPart(carpet.baxis, cdi.b);

        text.push('y: ' + newPointData.yLabel);

        if(parts.indexOf('text') !== -1) {
            fillText(cdi, trace, text);
        }

        newPointData.extraText = text.join('<br>');
    }

    return scatterPointData;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattercarpet/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattercarpet/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scattercarpet/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/scattercarpet/defaults.js"),
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    formatLabels: __webpack_require__(/*! ./format_labels */ "./node_modules/plotly.js/src/traces/scattercarpet/format_labels.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/scattercarpet/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/scattercarpet/plot.js"),
    style: __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js").style,
    styleOnSelect: __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/scattercarpet/hover.js"),
    selectPoints: __webpack_require__(/*! ../scatter/select */ "./node_modules/plotly.js/src/traces/scatter/select.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/scattercarpet/event_data.js"),

    moduleType: 'trace',
    name: 'scattercarpet',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['svg', 'carpet', 'symbols', 'showLegend', 'carpetDependent', 'zoomScale'],
    meta: {
        hrName: 'scatter_carpet',
        description: [
            'Plots a scatter trace on either the first carpet axis or the',
            'carpet axis with a matching `carpet` attribute.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattercarpet/plot.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattercarpet/plot.js ***!
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




var scatterPlot = __webpack_require__(/*! ../scatter/plot */ "./node_modules/plotly.js/src/traces/scatter/plot.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");

module.exports = function plot(gd, plotinfoproxy, data, layer) {
    var i, trace, node;

    var carpet = data[0][0].carpet;
    // mimic cartesian plotinfo
    var plotinfo = {
        xaxis: Axes.getFromId(gd, carpet.xaxis || 'x'),
        yaxis: Axes.getFromId(gd, carpet.yaxis || 'y'),
        plot: plotinfoproxy.plot,
    };

    scatterPlot(gd, plotinfo, data, layer);

    for(i = 0; i < data.length; i++) {
        trace = data[i][0].trace;

        // Note: .select is adequate but seems to mutate the node data,
        // which is at least a bit suprising and causes problems elsewhere
        node = layer.selectAll('g.trace' + trace.uid + ' .js-line');

        // Note: it would be more efficient if this didn't need to be applied
        // separately to all scattercarpet traces, but that would require
        // lots of reorganization of scatter traces that is otherwise not
        // necessary. That makes this a potential optimization.
        Drawing.setClipUrl(node, data[i][0].carpet._clipPathId, gd);
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc2NhdHRlcmNhcnBldC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJjYXJwZXQvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJjYXJwZXQvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJjYXJwZXQvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyY2FycGV0L2V2ZW50X2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyY2FycGV0L2Zvcm1hdF9sYWJlbHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyY2FycGV0L2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcmNhcnBldC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJjYXJwZXQvcGxvdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixxSUFBdUQ7Ozs7Ozs7Ozs7OztBQ1Z2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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MUIsVUFBVSxtQkFBTyxDQUFDLHlFQUFRO0FBQzFCLFdBQVcseUdBQWlDO0FBQzVDLG1CQUFtQixpSEFBeUM7QUFDNUQsaUJBQWlCLG1CQUFPLENBQUMsMkVBQVM7QUFDbEMsa0JBQWtCLG1CQUFPLENBQUMsZ0ZBQW1CO0FBQzdDLGVBQWUsbUJBQU8sQ0FBQyxxRkFBYzs7QUFFckM7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLG9GQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsa0JBQWtCLG1CQUFPLENBQUMsNEVBQWlCO0FBQzNDLFdBQVcsbUJBQU8sQ0FBQyx3RkFBNEI7QUFDL0MsY0FBYyxtQkFBTyxDQUFDLDBGQUEwQjs7QUFFaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxjQUFjLGlCQUFpQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQxZmRiMDliYjMxNmFiMzVjMDE5Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL3NjYXR0ZXJjYXJwZXQnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNjYXR0ZXJBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXR0cmlidXRlcycpO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIHRleHR0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLnRleHR0ZW1wbGF0ZUF0dHJzO1xudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbnZhciBzY2F0dGVyTWFya2VyQXR0cnMgPSBzY2F0dGVyQXR0cnMubWFya2VyO1xudmFyIHNjYXR0ZXJMaW5lQXR0cnMgPSBzY2F0dGVyQXR0cnMubGluZTtcbnZhciBzY2F0dGVyTWFya2VyTGluZUF0dHJzID0gc2NhdHRlck1hcmtlckF0dHJzLmxpbmU7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNhcnBldDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0FuIGlkZW50aWZpZXIgZm9yIHRoaXMgY2FycGV0LCBzbyB0aGF0IGBzY2F0dGVyY2FycGV0YCBhbmQnLFxuICAgICAgICAgICAgJ2Bjb250b3VyY2FycGV0YCB0cmFjZXMgY2FuIHNwZWNpZnkgYSBjYXJwZXQgcGxvdCBvbiB3aGljaCcsXG4gICAgICAgICAgICAndGhleSBsaWUnXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBhOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBhLWF4aXMgY29vcmRpbmF0ZXMuJ1xuICAgIH0sXG4gICAgYjoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgYi1heGlzIGNvb3JkaW5hdGVzLidcbiAgICB9LFxuICAgIG1vZGU6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5tb2RlLCB7ZGZsdDogJ21hcmtlcnMnfSksXG4gICAgdGV4dDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLnRleHQsIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggKGEsYikgcG9pbnQuJyxcbiAgICAgICAgICAgICdJZiBhIHNpbmdsZSBzdHJpbmcsIHRoZSBzYW1lIHN0cmluZyBhcHBlYXJzIG92ZXInLFxuICAgICAgICAgICAgJ2FsbCB0aGUgZGF0YSBwb2ludHMuJyxcbiAgICAgICAgICAgICdJZiBhbiBhcnJheSBvZiBzdHJpbmdzLCB0aGUgaXRlbXMgYXJlIG1hcHBlZCBpbiBvcmRlciB0byB0aGUnLFxuICAgICAgICAgICAgJ3RoZSBkYXRhIHBvaW50cyBpbiAoYSxiKS4nLFxuICAgICAgICAgICAgJ0lmIHRyYWNlIGBob3ZlcmluZm9gIGNvbnRhaW5zIGEgKnRleHQqIGZsYWcgYW5kICpob3ZlcnRleHQqIGlzIG5vdCBzZXQsJyxcbiAgICAgICAgICAgICd0aGVzZSBlbGVtZW50cyB3aWxsIGJlIHNlZW4gaW4gdGhlIGhvdmVyIGxhYmVscy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdwbG90J30sIHtcbiAgICAgICAga2V5czogWydhJywgJ2InLCAndGV4dCddXG4gICAgfSksXG4gICAgaG92ZXJ0ZXh0OiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMuaG92ZXJ0ZXh0LCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyBob3ZlciB0ZXh0IGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIChhLGIpIHBvaW50LicsXG4gICAgICAgICAgICAnSWYgYSBzaW5nbGUgc3RyaW5nLCB0aGUgc2FtZSBzdHJpbmcgYXBwZWFycyBvdmVyJyxcbiAgICAgICAgICAgICdhbGwgdGhlIGRhdGEgcG9pbnRzLicsXG4gICAgICAgICAgICAnSWYgYW4gYXJyYXkgb2Ygc3RyaW5ncywgdGhlIGl0ZW1zIGFyZSBtYXBwZWQgaW4gb3JkZXIgdG8gdGhlJyxcbiAgICAgICAgICAgICd0aGUgZGF0YSBwb2ludHMgaW4gKGEsYikuJyxcbiAgICAgICAgICAgICdUbyBiZSBzZWVuLCB0cmFjZSBgaG92ZXJpbmZvYCBtdXN0IGNvbnRhaW4gYSAqdGV4dCogZmxhZy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgbGluZToge1xuICAgICAgICBjb2xvcjogc2NhdHRlckxpbmVBdHRycy5jb2xvcixcbiAgICAgICAgd2lkdGg6IHNjYXR0ZXJMaW5lQXR0cnMud2lkdGgsXG4gICAgICAgIGRhc2g6IHNjYXR0ZXJMaW5lQXR0cnMuZGFzaCxcbiAgICAgICAgc2hhcGU6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJMaW5lQXR0cnMuc2hhcGUsXG4gICAgICAgICAgICB7dmFsdWVzOiBbJ2xpbmVhcicsICdzcGxpbmUnXX0pLFxuICAgICAgICBzbW9vdGhpbmc6IHNjYXR0ZXJMaW5lQXR0cnMuc21vb3RoaW5nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcbiAgICBjb25uZWN0Z2Fwczogc2NhdHRlckF0dHJzLmNvbm5lY3RnYXBzLFxuICAgIGZpbGw6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5maWxsLCB7XG4gICAgICAgIHZhbHVlczogWydub25lJywgJ3Rvc2VsZicsICd0b25leHQnXSxcbiAgICAgICAgZGZsdDogJ25vbmUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGFyZWEgdG8gZmlsbCB3aXRoIGEgc29saWQgY29sb3IuJyxcbiAgICAgICAgICAgICdVc2Ugd2l0aCBgZmlsbGNvbG9yYCBpZiBub3QgKm5vbmUqLicsXG4gICAgICAgICAgICAnc2NhdHRlcnRlcm5hcnkgaGFzIGEgc3Vic2V0IG9mIHRoZSBvcHRpb25zIGF2YWlsYWJsZSB0byBzY2F0dGVyLicsXG4gICAgICAgICAgICAnKnRvc2VsZiogY29ubmVjdHMgdGhlIGVuZHBvaW50cyBvZiB0aGUgdHJhY2UgKG9yIGVhY2ggc2VnbWVudCcsXG4gICAgICAgICAgICAnb2YgdGhlIHRyYWNlIGlmIGl0IGhhcyBnYXBzKSBpbnRvIGEgY2xvc2VkIHNoYXBlLicsXG4gICAgICAgICAgICAnKnRvbmV4dCogZmlsbHMgdGhlIHNwYWNlIGJldHdlZW4gdHdvIHRyYWNlcyBpZiBvbmUgY29tcGxldGVseScsXG4gICAgICAgICAgICAnZW5jbG9zZXMgdGhlIG90aGVyIChlZyBjb25zZWN1dGl2ZSBjb250b3VyIGxpbmVzKSwgYW5kIGJlaGF2ZXMgbGlrZScsXG4gICAgICAgICAgICAnKnRvc2VsZiogaWYgdGhlcmUgaXMgbm8gdHJhY2UgYmVmb3JlIGl0LiAqdG9uZXh0KiBzaG91bGQgbm90IGJlJyxcbiAgICAgICAgICAgICd1c2VkIGlmIG9uZSB0cmFjZSBkb2VzIG5vdCBlbmNsb3NlIHRoZSBvdGhlci4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgZmlsbGNvbG9yOiBzY2F0dGVyQXR0cnMuZmlsbGNvbG9yLFxuICAgIG1hcmtlcjogZXh0ZW5kRmxhdCh7XG4gICAgICAgIHN5bWJvbDogc2NhdHRlck1hcmtlckF0dHJzLnN5bWJvbCxcbiAgICAgICAgb3BhY2l0eTogc2NhdHRlck1hcmtlckF0dHJzLm9wYWNpdHksXG4gICAgICAgIG1heGRpc3BsYXllZDogc2NhdHRlck1hcmtlckF0dHJzLm1heGRpc3BsYXllZCxcbiAgICAgICAgc2l6ZTogc2NhdHRlck1hcmtlckF0dHJzLnNpemUsXG4gICAgICAgIHNpemVyZWY6IHNjYXR0ZXJNYXJrZXJBdHRycy5zaXplcmVmLFxuICAgICAgICBzaXplbWluOiBzY2F0dGVyTWFya2VyQXR0cnMuc2l6ZW1pbixcbiAgICAgICAgc2l6ZW1vZGU6IHNjYXR0ZXJNYXJrZXJBdHRycy5zaXplbW9kZSxcbiAgICAgICAgbGluZTogZXh0ZW5kRmxhdCh7XG4gICAgICAgICAgICB3aWR0aDogc2NhdHRlck1hcmtlckxpbmVBdHRycy53aWR0aCxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yU2NhbGVBdHRycygnbWFya2VyLmxpbmUnKVxuICAgICAgICApLFxuICAgICAgICBncmFkaWVudDogc2NhdHRlck1hcmtlckF0dHJzLmdyYWRpZW50LFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcbiAgICAgICAgY29sb3JTY2FsZUF0dHJzKCdtYXJrZXInKVxuICAgICksXG5cbiAgICB0ZXh0Zm9udDogc2NhdHRlckF0dHJzLnRleHRmb250LFxuICAgIHRleHRwb3NpdGlvbjogc2NhdHRlckF0dHJzLnRleHRwb3NpdGlvbixcblxuICAgIHNlbGVjdGVkOiBzY2F0dGVyQXR0cnMuc2VsZWN0ZWQsXG4gICAgdW5zZWxlY3RlZDogc2NhdHRlckF0dHJzLnVuc2VsZWN0ZWQsXG5cbiAgICBob3ZlcmluZm86IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5ob3ZlcmluZm8sIHtcbiAgICAgICAgZmxhZ3M6IFsnYScsICdiJywgJ3RleHQnLCAnbmFtZSddXG4gICAgfSksXG4gICAgaG92ZXJvbjogc2NhdHRlckF0dHJzLmhvdmVyb24sXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKClcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG5cbnZhciBjYWxjQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvY29sb3JzY2FsZV9jYWxjJyk7XG52YXIgYXJyYXlzVG9DYWxjZGF0YSA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXJyYXlzX3RvX2NhbGNkYXRhJyk7XG52YXIgY2FsY1NlbGVjdGlvbiA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvY2FsY19zZWxlY3Rpb24nKTtcbnZhciBjYWxjTWFya2VyU2l6ZSA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvY2FsYycpLmNhbGNNYXJrZXJTaXplO1xudmFyIGxvb2t1cENhcnBldCA9IHJlcXVpcmUoJy4uL2NhcnBldC9sb29rdXBfY2FycGV0aWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBjYXJwZXQgPSB0cmFjZS5fY2FycGV0VHJhY2UgPSBsb29rdXBDYXJwZXQoZ2QsIHRyYWNlKTtcbiAgICBpZighY2FycGV0IHx8ICFjYXJwZXQudmlzaWJsZSB8fCBjYXJwZXQudmlzaWJsZSA9PT0gJ2xlZ2VuZG9ubHknKSByZXR1cm47XG4gICAgdmFyIGk7XG5cbiAgICAvLyBUcmFuc2ZlciB0aGlzIG92ZXIgZnJvbSBjYXJwZXQgYmVmb3JlIHBsb3R0aW5nIHNpbmNlIHRoaXMgaXMgYSBuZWNlc3NhcnlcbiAgICAvLyBjb25kaXRpb24gaW4gb3JkZXIgZm9yIGNhcnRlc2lhbiB0byBhY3R1YWxseSBwbG90IHRoaXMgdHJhY2U6XG4gICAgdHJhY2UueGF4aXMgPSBjYXJwZXQueGF4aXM7XG4gICAgdHJhY2UueWF4aXMgPSBjYXJwZXQueWF4aXM7XG5cbiAgICAvLyBtYWtlIHRoZSBjYWxjZGF0YSBhcnJheVxuICAgIHZhciBzZXJpZXNsZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciBjZCA9IG5ldyBBcnJheShzZXJpZXNsZW4pO1xuICAgIHZhciBhLCBiO1xuICAgIHZhciBuZWVkc0N1bGwgPSBmYWxzZTtcbiAgICBmb3IoaSA9IDA7IGkgPCBzZXJpZXNsZW47IGkrKykge1xuICAgICAgICBhID0gdHJhY2UuYVtpXTtcbiAgICAgICAgYiA9IHRyYWNlLmJbaV07XG4gICAgICAgIGlmKGlzTnVtZXJpYyhhKSAmJiBpc051bWVyaWMoYikpIHtcbiAgICAgICAgICAgIHZhciB4eSA9IGNhcnBldC5hYjJ4eSgrYSwgK2IsIHRydWUpO1xuICAgICAgICAgICAgdmFyIHZpc2libGUgPSBjYXJwZXQuaXNWaXNpYmxlKCthLCArYik7XG4gICAgICAgICAgICBpZighdmlzaWJsZSkgbmVlZHNDdWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGNkW2ldID0ge3g6IHh5WzBdLCB5OiB4eVsxXSwgYTogYSwgYjogYiwgdmlzOiB2aXNpYmxlfTtcbiAgICAgICAgfSBlbHNlIGNkW2ldID0ge3g6IGZhbHNlLCB5OiBmYWxzZX07XG4gICAgfVxuXG4gICAgdHJhY2UuX25lZWRzQ3VsbCA9IG5lZWRzQ3VsbDtcblxuICAgIGNkWzBdLmNhcnBldCA9IGNhcnBldDtcbiAgICBjZFswXS50cmFjZSA9IHRyYWNlO1xuXG4gICAgY2FsY01hcmtlclNpemUodHJhY2UsIHNlcmllc2xlbik7XG4gICAgY2FsY0NvbG9yc2NhbGUoZ2QsIHRyYWNlKTtcbiAgICBhcnJheXNUb0NhbGNkYXRhKGNkLCB0cmFjZSk7XG4gICAgY2FsY1NlbGVjdGlvbihjZCwgdHJhY2UpO1xuXG4gICAgcmV0dXJuIGNkO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NvbnN0YW50cycpO1xudmFyIHN1YlR5cGVzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9zdWJ0eXBlcycpO1xudmFyIGhhbmRsZU1hcmtlckRlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9tYXJrZXJfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVMaW5lRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2xpbmVfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVMaW5lU2hhcGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbGluZV9zaGFwZV9kZWZhdWx0cycpO1xudmFyIGhhbmRsZVRleHREZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvdGV4dF9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUZpbGxDb2xvckRlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9maWxsY29sb3JfZGVmYXVsdHMnKTtcblxudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdjYXJwZXQnKTtcblxuICAgIC8vIFhYWDogRG9uJ3QgaGFyZCBjb2RlIHRoaXNcbiAgICB0cmFjZU91dC54YXhpcyA9ICd4JztcbiAgICB0cmFjZU91dC55YXhpcyA9ICd5JztcblxuICAgIHZhciBhID0gY29lcmNlKCdhJyk7XG4gICAgdmFyIGIgPSBjb2VyY2UoJ2InKTtcbiAgICB2YXIgbGVuID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcblxuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IGxlbjtcblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgndGV4dHRlbXBsYXRlJyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcblxuICAgIHZhciBkZWZhdWx0TW9kZSA9IGxlbiA8IGNvbnN0YW50cy5QVFNfTElORVNPTkxZID8gJ2xpbmVzK21hcmtlcnMnIDogJ2xpbmVzJztcbiAgICBjb2VyY2UoJ21vZGUnLCBkZWZhdWx0TW9kZSk7XG5cbiAgICBpZihzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZU91dCkpIHtcbiAgICAgICAgaGFuZGxlTGluZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlKTtcbiAgICAgICAgaGFuZGxlTGluZVNoYXBlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSk7XG4gICAgICAgIGNvZXJjZSgnY29ubmVjdGdhcHMnKTtcbiAgICB9XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlT3V0KSkge1xuICAgICAgICBoYW5kbGVNYXJrZXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSwge2dyYWRpZW50OiB0cnVlfSk7XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzVGV4dCh0cmFjZU91dCkpIHtcbiAgICAgICAgaGFuZGxlVGV4dERlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIGRmbHRIb3Zlck9uID0gW107XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlT3V0KSB8fCBzdWJUeXBlcy5oYXNUZXh0KHRyYWNlT3V0KSkge1xuICAgICAgICBjb2VyY2UoJ21hcmtlci5tYXhkaXNwbGF5ZWQnKTtcbiAgICAgICAgZGZsdEhvdmVyT24ucHVzaCgncG9pbnRzJyk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdmaWxsJyk7XG4gICAgaWYodHJhY2VPdXQuZmlsbCAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGhhbmRsZUZpbGxDb2xvckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGNvZXJjZSk7XG4gICAgICAgIGlmKCFzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZU91dCkpIGhhbmRsZUxpbmVTaGFwZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UpO1xuICAgIH1cblxuICAgIGlmKHRyYWNlT3V0LmZpbGwgPT09ICd0b25leHQnIHx8IHRyYWNlT3V0LmZpbGwgPT09ICd0b3NlbGYnKSB7XG4gICAgICAgIGRmbHRIb3Zlck9uLnB1c2goJ2ZpbGxzJyk7XG4gICAgfVxuXG4gICAgdmFyIGhvdmVyT24gPSBjb2VyY2UoJ2hvdmVyb24nLCBkZmx0SG92ZXJPbi5qb2luKCcrJykgfHwgJ3BvaW50cycpO1xuICAgIGlmKGhvdmVyT24gIT09ICdmaWxscycpIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuXG4gICAgTGliLmNvZXJjZVNlbGVjdGlvbk1hcmtlck9wYWNpdHkodHJhY2VPdXQsIGNvZXJjZSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV2ZW50RGF0YShvdXQsIHB0LCB0cmFjZSwgY2QsIHBvaW50TnVtYmVyKSB7XG4gICAgdmFyIGNkaSA9IGNkW3BvaW50TnVtYmVyXTtcblxuICAgIG91dC5hID0gY2RpLmE7XG4gICAgb3V0LmIgPSBjZGkuYjtcbiAgICBvdXQueSA9IGNkaS55O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ybWF0TGFiZWxzKGNkaSwgdHJhY2UpIHtcbiAgICB2YXIgbGFiZWxzID0ge307XG5cbiAgICB2YXIgY2FycGV0ID0gdHJhY2UuX2NhcnBldDtcbiAgICB2YXIgaWogPSBjYXJwZXQuYWIyaWooW2NkaS5hLCBjZGkuYl0pO1xuICAgIHZhciBpMCA9IE1hdGguZmxvb3IoaWpbMF0pO1xuICAgIHZhciB0aSA9IGlqWzBdIC0gaTA7XG4gICAgdmFyIGowID0gTWF0aC5mbG9vcihpalsxXSk7XG4gICAgdmFyIHRqID0gaWpbMV0gLSBqMDtcbiAgICB2YXIgeHkgPSBjYXJwZXQuZXZhbHh5KFtdLCBpMCwgajAsIHRpLCB0aik7XG5cbiAgICBsYWJlbHMueUxhYmVsID0geHlbMV0udG9GaXhlZCgzKTtcblxuICAgIHJldHVybiBsYWJlbHM7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NhdHRlckhvdmVyID0gcmVxdWlyZSgnLi4vc2NhdHRlci9ob3ZlcicpO1xudmFyIGZpbGxUZXh0ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuZmlsbFRleHQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpIHtcbiAgICB2YXIgc2NhdHRlclBvaW50RGF0YSA9IHNjYXR0ZXJIb3Zlcihwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSk7XG4gICAgaWYoIXNjYXR0ZXJQb2ludERhdGEgfHwgc2NhdHRlclBvaW50RGF0YVswXS5pbmRleCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIHZhciBuZXdQb2ludERhdGEgPSBzY2F0dGVyUG9pbnREYXRhWzBdO1xuXG4gICAgLy8gaWYgaG92ZXJpbmcgb24gYSBmaWxsLCB3ZSBkb24ndCBzaG93IGFueSBwb2ludCBkYXRhIHNvIHRoZSBsYWJlbCBpc1xuICAgIC8vIHVuY2hhbmdlZCBmcm9tIHdoYXQgc2NhdHRlciBnaXZlcyB1cyAtIGV4Y2VwdCB0aGF0IGl0IG5lZWRzIHRvXG4gICAgLy8gYmUgY29uc3RyYWluZWQgdG8gdGhlIHRyaWFuZ2x1bGFyIHBsb3QgYXJlYSwgbm90IGp1c3QgdGhlIHJlY3Rhbmd1bGFyXG4gICAgLy8gYXJlYSBkZWZpbmVkIGJ5IHRoZSBzeW50aGV0aWMgeCBhbmQgeSBheGVzXG4gICAgLy8gVE9ETzogaW4gc29tZSBjYXNlcyB0aGUgdmVydGljYWwgbWlkZGxlIG9mIHRoZSBzaGFwZSBpcyBub3Qgd2l0aGluXG4gICAgLy8gdGhlIHRyaWFuZ3VsYXIgdmlld3BvcnQgYXQgYWxsLCBzbyB0aGUgbGFiZWwgY2FuIGJlY29tZSBkaXNjb25uZWN0ZWRcbiAgICAvLyBmcm9tIHRoZSBzaGFwZSBlbnRpcmVseS4gQnV0IGNhbGN1bGF0aW5nIHdoYXQgcG9ydGlvbiBvZiB0aGUgc2hhcGVcbiAgICAvLyBpcyBhY3R1YWxseSB2aXNpYmxlLCBhcyBjb25zdHJhaW5lZCBieSB0aGUgZGlhZ29uYWwgYXhpcyBsaW5lcywgaXMgbm90XG4gICAgLy8gc28gZWFzeSBhbmQgYW55d2F5IHdlIGxvc3QgdGhlIGluZm9ybWF0aW9uIHdlIHdvdWxkIGhhdmUgbmVlZGVkIHRvIGRvXG4gICAgLy8gdGhpcyBpbnNpZGUgc2NhdHRlckhvdmVyLlxuICAgIGlmKG5ld1BvaW50RGF0YS5pbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciB5RnJhY1VwID0gMSAtIChuZXdQb2ludERhdGEueTAgLyBwb2ludERhdGEueWEuX2xlbmd0aCk7XG4gICAgICAgIHZhciB4TGVuID0gcG9pbnREYXRhLnhhLl9sZW5ndGg7XG4gICAgICAgIHZhciB4TWluID0geExlbiAqIHlGcmFjVXAgLyAyO1xuICAgICAgICB2YXIgeE1heCA9IHhMZW4gLSB4TWluO1xuICAgICAgICBuZXdQb2ludERhdGEueDAgPSBNYXRoLm1heChNYXRoLm1pbihuZXdQb2ludERhdGEueDAsIHhNYXgpLCB4TWluKTtcbiAgICAgICAgbmV3UG9pbnREYXRhLngxID0gTWF0aC5tYXgoTWF0aC5taW4obmV3UG9pbnREYXRhLngxLCB4TWF4KSwgeE1pbik7XG4gICAgICAgIHJldHVybiBzY2F0dGVyUG9pbnREYXRhO1xuICAgIH1cblxuICAgIHZhciBjZGkgPSBuZXdQb2ludERhdGEuY2RbbmV3UG9pbnREYXRhLmluZGV4XTtcblxuICAgIG5ld1BvaW50RGF0YS5hID0gY2RpLmE7XG4gICAgbmV3UG9pbnREYXRhLmIgPSBjZGkuYjtcblxuICAgIG5ld1BvaW50RGF0YS54TGFiZWxWYWwgPSB1bmRlZmluZWQ7XG4gICAgbmV3UG9pbnREYXRhLnlMYWJlbFZhbCA9IHVuZGVmaW5lZDtcbiAgICAvLyBUT0RPOiBuaWNlIGZvcm1hdHRpbmcsIGFuZCBsYWJlbCBieSBheGlzIHRpdGxlLCBmb3IgYSwgYiwgYW5kIGM/XG5cbiAgICB2YXIgdHJhY2UgPSBuZXdQb2ludERhdGEudHJhY2U7XG4gICAgdmFyIGNhcnBldCA9IHRyYWNlLl9jYXJwZXQ7XG5cbiAgICB2YXIgbGFiZWxzID0gdHJhY2UuX21vZHVsZS5mb3JtYXRMYWJlbHMoY2RpLCB0cmFjZSk7XG4gICAgbmV3UG9pbnREYXRhLnlMYWJlbCA9IGxhYmVscy55TGFiZWw7XG5cbiAgICBkZWxldGUgbmV3UG9pbnREYXRhLnRleHQ7XG4gICAgdmFyIHRleHQgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHRleHRQYXJ0KGF4LCB2YWwpIHtcbiAgICAgICAgdmFyIHByZWZpeDtcblxuICAgICAgICBpZihheC5sYWJlbHByZWZpeCAmJiBheC5sYWJlbHByZWZpeC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwcmVmaXggPSBheC5sYWJlbHByZWZpeC5yZXBsYWNlKC8gPSAkLywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJlZml4ID0gYXguX2hvdmVydGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICB0ZXh0LnB1c2gocHJlZml4ICsgJzogJyArIHZhbC50b0ZpeGVkKDMpICsgYXgubGFiZWxzdWZmaXgpO1xuICAgIH1cblxuXG4gICAgaWYoIXRyYWNlLmhvdmVydGVtcGxhdGUpIHtcbiAgICAgICAgdmFyIGhvdmVyaW5mbyA9IGNkaS5oaSB8fCB0cmFjZS5ob3ZlcmluZm87XG4gICAgICAgIHZhciBwYXJ0cyA9IGhvdmVyaW5mby5zcGxpdCgnKycpO1xuXG4gICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ2FsbCcpICE9PSAtMSkgcGFydHMgPSBbJ2EnLCAnYicsICd0ZXh0J107XG4gICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ2EnKSAhPT0gLTEpIHRleHRQYXJ0KGNhcnBldC5hYXhpcywgY2RpLmEpO1xuICAgICAgICBpZihwYXJ0cy5pbmRleE9mKCdiJykgIT09IC0xKSB0ZXh0UGFydChjYXJwZXQuYmF4aXMsIGNkaS5iKTtcblxuICAgICAgICB0ZXh0LnB1c2goJ3k6ICcgKyBuZXdQb2ludERhdGEueUxhYmVsKTtcblxuICAgICAgICBpZihwYXJ0cy5pbmRleE9mKCd0ZXh0JykgIT09IC0xKSB7XG4gICAgICAgICAgICBmaWxsVGV4dChjZGksIHRyYWNlLCB0ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5ld1BvaW50RGF0YS5leHRyYVRleHQgPSB0ZXh0LmpvaW4oJzxicj4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NhdHRlclBvaW50RGF0YTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFya2VyX2NvbG9yYmFyJyksXG4gICAgZm9ybWF0TGFiZWxzOiByZXF1aXJlKCcuL2Zvcm1hdF9sYWJlbHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi4vc2NhdHRlci9zdHlsZScpLnN0eWxlLFxuICAgIHN0eWxlT25TZWxlY3Q6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvc3R5bGUnKS5zdHlsZU9uU2VsZWN0LFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuLi9zY2F0dGVyL3NlbGVjdCcpLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi9ldmVudF9kYXRhJyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdzY2F0dGVyY2FycGV0JyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydzdmcnLCAnY2FycGV0JywgJ3N5bWJvbHMnLCAnc2hvd0xlZ2VuZCcsICdjYXJwZXREZXBlbmRlbnQnLCAnem9vbVNjYWxlJ10sXG4gICAgbWV0YToge1xuICAgICAgICBock5hbWU6ICdzY2F0dGVyX2NhcnBldCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnUGxvdHMgYSBzY2F0dGVyIHRyYWNlIG9uIGVpdGhlciB0aGUgZmlyc3QgY2FycGV0IGF4aXMgb3IgdGhlJyxcbiAgICAgICAgICAgICdjYXJwZXQgYXhpcyB3aXRoIGEgbWF0Y2hpbmcgYGNhcnBldGAgYXR0cmlidXRlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzY2F0dGVyUGxvdCA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvcGxvdCcpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwbG90KGdkLCBwbG90aW5mb3Byb3h5LCBkYXRhLCBsYXllcikge1xuICAgIHZhciBpLCB0cmFjZSwgbm9kZTtcblxuICAgIHZhciBjYXJwZXQgPSBkYXRhWzBdWzBdLmNhcnBldDtcbiAgICAvLyBtaW1pYyBjYXJ0ZXNpYW4gcGxvdGluZm9cbiAgICB2YXIgcGxvdGluZm8gPSB7XG4gICAgICAgIHhheGlzOiBBeGVzLmdldEZyb21JZChnZCwgY2FycGV0LnhheGlzIHx8ICd4JyksXG4gICAgICAgIHlheGlzOiBBeGVzLmdldEZyb21JZChnZCwgY2FycGV0LnlheGlzIHx8ICd5JyksXG4gICAgICAgIHBsb3Q6IHBsb3RpbmZvcHJveHkucGxvdCxcbiAgICB9O1xuXG4gICAgc2NhdHRlclBsb3QoZ2QsIHBsb3RpbmZvLCBkYXRhLCBsYXllcik7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyYWNlID0gZGF0YVtpXVswXS50cmFjZTtcblxuICAgICAgICAvLyBOb3RlOiAuc2VsZWN0IGlzIGFkZXF1YXRlIGJ1dCBzZWVtcyB0byBtdXRhdGUgdGhlIG5vZGUgZGF0YSxcbiAgICAgICAgLy8gd2hpY2ggaXMgYXQgbGVhc3QgYSBiaXQgc3VwcmlzaW5nIGFuZCBjYXVzZXMgcHJvYmxlbXMgZWxzZXdoZXJlXG4gICAgICAgIG5vZGUgPSBsYXllci5zZWxlY3RBbGwoJ2cudHJhY2UnICsgdHJhY2UudWlkICsgJyAuanMtbGluZScpO1xuXG4gICAgICAgIC8vIE5vdGU6IGl0IHdvdWxkIGJlIG1vcmUgZWZmaWNpZW50IGlmIHRoaXMgZGlkbid0IG5lZWQgdG8gYmUgYXBwbGllZFxuICAgICAgICAvLyBzZXBhcmF0ZWx5IHRvIGFsbCBzY2F0dGVyY2FycGV0IHRyYWNlcywgYnV0IHRoYXQgd291bGQgcmVxdWlyZVxuICAgICAgICAvLyBsb3RzIG9mIHJlb3JnYW5pemF0aW9uIG9mIHNjYXR0ZXIgdHJhY2VzIHRoYXQgaXMgb3RoZXJ3aXNlIG5vdFxuICAgICAgICAvLyBuZWNlc3NhcnkuIFRoYXQgbWFrZXMgdGhpcyBhIHBvdGVudGlhbCBvcHRpbWl6YXRpb24uXG4gICAgICAgIERyYXdpbmcuc2V0Q2xpcFVybChub2RlLCBkYXRhW2ldWzBdLmNhcnBldC5fY2xpcFBhdGhJZCwgZ2QpO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9