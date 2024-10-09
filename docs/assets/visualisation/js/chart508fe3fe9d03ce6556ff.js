(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_index-basic_js"],{

/***/ "./node_modules/plotly.js/lib/bar.js":
/*!*******************************************!*\
  !*** ./node_modules/plotly.js/lib/bar.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/bar */ "./node_modules/plotly.js/src/traces/bar/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/index-basic.js":
/*!***************************************************!*\
  !*** ./node_modules/plotly.js/lib/index-basic.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Plotly = __webpack_require__(/*! ./core */ "./node_modules/plotly.js/lib/core.js");

Plotly.register([
    __webpack_require__(/*! ./bar */ "./node_modules/plotly.js/lib/bar.js"),
    __webpack_require__(/*! ./pie */ "./node_modules/plotly.js/lib/pie.js")
]);

module.exports = Plotly;


/***/ }),

/***/ "./node_modules/plotly.js/lib/pie.js":
/*!*******************************************!*\
  !*** ./node_modules/plotly.js/lib/pie.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/pie */ "./node_modules/plotly.js/src/traces/pie/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js ***!
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

// arrayOk attributes, merge them into calcdata array
module.exports = function arraysToCalcdata(cd, trace) {
    for(var i = 0; i < cd.length; i++) cd[i].i = i;

    Lib.mergeArray(trace.text, cd, 'tx');
    Lib.mergeArray(trace.hovertext, cd, 'htx');

    var marker = trace.marker;
    if(marker) {
        Lib.mergeArray(marker.opacity, cd, 'mo', true);
        Lib.mergeArray(marker.color, cd, 'mc');

        var markerLine = marker.line;
        if(markerLine) {
            Lib.mergeArray(markerLine.color, cd, 'mlc');
            Lib.mergeArrayCastPositive(markerLine.width, cd, 'mlw');
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/calc.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/calc.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");
var arraysToCalcdata = __webpack_require__(/*! ./arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");

module.exports = function calc(gd, trace) {
    var xa = Axes.getFromId(gd, trace.xaxis || 'x');
    var ya = Axes.getFromId(gd, trace.yaxis || 'y');
    var size, pos;

    var sizeOpts = {
        msUTC: !!(trace.base || trace.base === 0)
    };

    if(trace.orientation === 'h') {
        size = xa.makeCalcdata(trace, 'x', sizeOpts);
        pos = ya.makeCalcdata(trace, 'y');
    } else {
        size = ya.makeCalcdata(trace, 'y', sizeOpts);
        pos = xa.makeCalcdata(trace, 'x');
    }

    // create the "calculated data" to plot
    var serieslen = Math.min(pos.length, size.length);
    var cd = new Array(serieslen);

    // set position and size
    for(var i = 0; i < serieslen; i++) {
        cd[i] = { p: pos[i], s: size[i] };

        if(trace.ids) {
            cd[i].id = String(trace.ids[i]);
        }
    }

    // auto-z and autocolorscale if applicable
    if(hasColorscale(trace, 'marker')) {
        colorscaleCalc(gd, trace, {
            vals: trace.marker.color,
            containerStr: 'marker',
            cLetter: 'c'
        });
    }
    if(hasColorscale(trace, 'marker.line')) {
        colorscaleCalc(gd, trace, {
            vals: trace.marker.line.color,
            containerStr: 'marker.line',
            cLetter: 'c'
        });
    }

    arraysToCalcdata(cd, trace);
    calcSelection(cd, trace);

    return cd;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/event_data.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/event_data.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function eventData(out, pt, trace) {
    // standard cartesian event data
    out.x = 'xVal' in pt ? pt.xVal : pt.x;
    out.y = 'yVal' in pt ? pt.yVal : pt.y;
    if(pt.xa) out.xaxis = pt.xa;
    if(pt.ya) out.yaxis = pt.ya;

    if(trace.orientation === 'h') {
        out.label = out.y;
        out.value = out.x;
    } else {
        out.label = out.x;
        out.value = out.y;
    }

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/index.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/index.js ***!
  \********************************************************/
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/bar/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").supplyDefaults,
    crossTraceDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").crossTraceDefaults,
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/bar/layout_defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/bar/calc.js"),
    crossTraceCalc: __webpack_require__(/*! ./cross_trace_calc */ "./node_modules/plotly.js/src/traces/bar/cross_trace_calc.js").crossTraceCalc,
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    arraysToCalcdata: __webpack_require__(/*! ./arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/bar/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/bar/style.js").style,
    styleOnSelect: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/bar/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/bar/hover.js").hoverPoints,
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/bar/event_data.js"),
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/bar/select.js"),

    moduleType: 'trace',
    name: 'bar',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['bar-like', 'cartesian', 'svg', 'bar', 'oriented', 'errorBarsOK', 'showLegend', 'zoomScale'],
    animatable: true,
    meta: {
        description: [
            'The data visualized by the span of the bars is set in `y`',
            'if `orientation` is set th *v* (the default)',
            'and the labels are set in `x`.',
            'By setting `orientation` to *h*, the roles are interchanged.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/layout_attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/layout_attributes.js ***!
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
    barmode: {
        valType: 'enumerated',
        values: ['stack', 'group', 'overlay', 'relative'],
        dflt: 'group',
        role: 'info',
        editType: 'calc',
        description: [
            'Determines how bars at the same location coordinate',
            'are displayed on the graph.',
            'With *stack*, the bars are stacked on top of one another',
            'With *relative*, the bars are stacked on top of one another,',
            'with negative values below the axis, positive values above',
            'With *group*, the bars are plotted next to one another',
            'centered around the shared location.',
            'With *overlay*, the bars are plotted over one another,',
            'you might need to an *opacity* to see multiple bars.'
        ].join(' ')
    },
    barnorm: {
        valType: 'enumerated',
        values: ['', 'fraction', 'percent'],
        dflt: '',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the normalization for bar traces on the graph.',
            'With *fraction*, the value of each bar is divided by the sum of all',
            'values at that location coordinate.',
            '*percent* is the same but multiplied by 100 to show percentages.'
        ].join(' ')
    },
    bargap: {
        valType: 'number',
        min: 0,
        max: 1,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the gap (in plot fraction) between bars of',
            'adjacent location coordinates.'
        ].join(' ')
    },
    bargroupgap: {
        valType: 'number',
        min: 0,
        max: 1,
        dflt: 0,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the gap (in plot fraction) between bars of',
            'the same location coordinate.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/layout_defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/layout_defaults.js ***!
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
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/bar/layout_attributes.js");

module.exports = function(layoutIn, layoutOut, fullData) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    var hasBars = false;
    var shouldBeGapless = false;
    var gappedAnyway = false;
    var usedSubplots = {};

    var mode = coerce('barmode');

    for(var i = 0; i < fullData.length; i++) {
        var trace = fullData[i];
        if(Registry.traceIs(trace, 'bar') && trace.visible) hasBars = true;
        else continue;

        // if we have at least 2 grouped bar traces on the same subplot,
        // we should default to a gap anyway, even if the data is histograms
        if(mode === 'group') {
            var subploti = trace.xaxis + trace.yaxis;
            if(usedSubplots[subploti]) gappedAnyway = true;
            usedSubplots[subploti] = true;
        }

        if(trace.visible && trace.type === 'histogram') {
            var pa = Axes.getFromId({_fullLayout: layoutOut},
                        trace[trace.orientation === 'v' ? 'xaxis' : 'yaxis']);
            if(pa.type !== 'category') shouldBeGapless = true;
        }
    }

    if(!hasBars) {
        delete layoutOut.barmode;
        return;
    }

    if(mode !== 'overlay') coerce('barnorm');

    coerce('bargap', (shouldBeGapless && !gappedAnyway) ? 0 : 0.2);
    coerce('bargroupgap');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/base_plot.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/base_plot.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var plots = __webpack_require__(/*! ../../plots/plots */ "./node_modules/plotly.js/src/plots/plots.js");

exports.name = 'pie';

exports.plot = function(gd, traces, transitionOpts, makeOnCompleteCallback) {
    plots.plotBasePlot(exports.name, gd, traces, transitionOpts, makeOnCompleteCallback);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    plots.cleanBasePlot(exports.name, newFullData, newFullLayout, oldFullData, oldFullLayout);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/defaults.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/defaults.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/pie/attributes.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;
var handleText = __webpack_require__(/*! ../bar/defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").handleText;

function handleLabelsAndValues(labels, values) {
    var hasLabels = Array.isArray(labels);
    var hasValues = Lib.isArrayOrTypedArray(values);
    var len = Math.min(
        hasLabels ? labels.length : Infinity,
        hasValues ? values.length : Infinity
    );

    if(!isFinite(len)) len = 0;

    if(len && hasValues) {
        var hasPositive;
        for(var i = 0; i < len; i++) {
            var v = values[i];
            if(isNumeric(v) && v > 0) {
                hasPositive = true;
                break;
            }
        }
        if(!hasPositive) len = 0;
    }

    return {
        hasLabels: hasLabels,
        hasValues: hasValues,
        len: len
    };
}

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var labels = coerce('labels');
    var values = coerce('values');

    var res = handleLabelsAndValues(labels, values);
    var len = res.len;
    traceOut._hasLabels = res.hasLabels;
    traceOut._hasValues = res.hasValues;

    if(!traceOut._hasLabels &&
        traceOut._hasValues
    ) {
        coerce('label0');
        coerce('dlabel');
    }

    if(!len) {
        traceOut.visible = false;
        return;
    }
    traceOut._length = len;

    var lineWidth = coerce('marker.line.width');
    if(lineWidth) coerce('marker.line.color');

    coerce('marker.colors');

    coerce('scalegroup');
    // TODO: hole needs to be coerced to the same value within a scaleegroup

    var textData = coerce('text');
    var textTemplate = coerce('texttemplate');
    var textInfo;
    if(!textTemplate) textInfo = coerce('textinfo', Array.isArray(textData) ? 'text+percent' : 'percent');

    coerce('hovertext');
    coerce('hovertemplate');

    if(textTemplate || (textInfo && textInfo !== 'none')) {
        var textposition = coerce('textposition');
        handleText(traceIn, traceOut, layout, coerce, textposition, {
            moduleHasSelected: false,
            moduleHasUnselected: false,
            moduleHasConstrain: false,
            moduleHasCliponaxis: false,
            moduleHasTextangle: false,
            moduleHasInsideanchor: false
        });

        var hasBoth = Array.isArray(textposition) || textposition === 'auto';
        var hasOutside = hasBoth || textposition === 'outside';
        if(hasOutside) {
            coerce('automargin');
        }

        if(textposition === 'inside' || textposition === 'auto' || Array.isArray(textposition)) {
            coerce('insidetextorientation');
        }
    }

    handleDomainDefaults(traceOut, layout, coerce);

    var hole = coerce('hole');
    var title = coerce('title.text');
    if(title) {
        var titlePosition = coerce('title.position', hole ? 'middle center' : 'top center');
        if(!hole && titlePosition === 'middle center') traceOut.title.position = 'top center';
        Lib.coerceFont(coerce, 'title.font', layout.font);
    }

    coerce('sort');
    coerce('direction');
    coerce('rotation');
    coerce('pull');
}

module.exports = {
    handleLabelsAndValues: handleLabelsAndValues,
    supplyDefaults: supplyDefaults
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/index.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/index.js ***!
  \********************************************************/
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/pie/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/pie/defaults.js").supplyDefaults,
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/pie/layout_defaults.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/pie/layout_attributes.js"),

    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/pie/calc.js").calc,
    crossTraceCalc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/pie/calc.js").crossTraceCalc,

    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/pie/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/pie/style.js"),
    styleOne: __webpack_require__(/*! ./style_one */ "./node_modules/plotly.js/src/traces/pie/style_one.js"),

    moduleType: 'trace',
    name: 'pie',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/pie/base_plot.js"),
    categories: ['pie-like', 'pie', 'showLegend'],
    meta: {
        description: [
            'A data visualized by the sectors of the pie is set in `values`.',
            'The sector labels are set in `labels`.',
            'The sector colors are set in `marker.colors`'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/layout_attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/layout_attributes.js ***!
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
    hiddenlabels: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc',
        description: [
            'hiddenlabels is the funnelarea & pie chart analog of',
            'visible:\'legendonly\'',
            'but it can contain many labels, and can simultaneously',
            'hide slices from several pies/funnelarea charts'
        ].join(' ')
    },
    piecolorway: {
        valType: 'colorlist',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the default pie slice colors. Defaults to the main',
            '`colorway` used for trace colors. If you specify a new',
            'list here it can still be extended with lighter and darker',
            'colors, see `extendpiecolors`.'
        ].join(' ')
    },
    extendpiecolors: {
        valType: 'boolean',
        dflt: true,
        role: 'style',
        editType: 'calc',
        description: [
            'If `true`, the pie slice colors (whether given by `piecolorway` or',
            'inherited from `colorway`) will be extended to three times its',
            'original length by first repeating every color 20% lighter then',
            'each color 20% darker. This is intended to reduce the likelihood',
            'of reusing the same color when you have many slices, but you can',
            'set `false` to disable.',
            'Colors provided in the trace, using `marker.colors`, are never',
            'extended.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/layout_defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/layout_defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/pie/layout_attributes.js");

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }

    coerce('hiddenlabels');
    coerce('piecolorway', layoutOut.colorway);
    coerce('extendpiecolors');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pie/style.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pie/style.js ***!
  \********************************************************/
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

var styleOne = __webpack_require__(/*! ./style_one */ "./node_modules/plotly.js/src/traces/pie/style_one.js");
var resizeText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").resizeText;

module.exports = function style(gd) {
    var s = gd._fullLayout._pielayer.selectAll('.trace');
    resizeText(gd, s, 'pie');

    s.each(function(cd) {
        var cd0 = cd[0];
        var trace = cd0.trace;
        var traceSelection = d3.select(this);

        traceSelection.style({opacity: trace.opacity});

        traceSelection.selectAll('path.surface').each(function(pt) {
            d3.select(this).call(styleOne, pt, trace);
        });
    });
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvYmFyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL2xpYi9pbmRleC1iYXNpYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvcGllLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2FycmF5c190b19jYWxjZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2V2ZW50X2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvbGF5b3V0X2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvbGF5b3V0X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGllL2Jhc2VfcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9sYXlvdXRfYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9sYXlvdXRfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9waWUvc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUhBQTZDOzs7Ozs7Ozs7Ozs7QUNWN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLG9EQUFROztBQUU3QjtBQUNBLElBQUksbUJBQU8sQ0FBQyxrREFBTztBQUNuQixJQUFJLG1CQUFPLENBQUMsa0RBQU87QUFDbkI7O0FBRUE7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixpSEFBNkM7Ozs7Ozs7Ozs7OztBQ1Y3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCO0FBQ0E7QUFDQSxrQkFBa0IsZUFBZTs7QUFFakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyx3RkFBNEI7QUFDL0Msb0JBQW9CLDZJQUE0RDtBQUNoRixxQkFBcUIsbUJBQU8sQ0FBQyxvR0FBa0M7QUFDL0QsdUJBQXVCLG1CQUFPLENBQUMsMkZBQXNCO0FBQ3JELG9C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QkFBb0IsbUdBQWdDOztBQUVwRCxVQUFVLHlGQUFzQjtBQUNoQyxXQUFXLG1CQUFPLENBQUMsaUVBQVM7QUFDNUIsY0FBYyxtQkFBTyxDQUFDLHlFQUFhOztBQUVuQztBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMseUVBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3Qix1QkFBdUIsbUJBQU8sQ0FBQyx5RkFBcUI7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLG1DQUFJOztBQUVyQixlQUFlLG1CQUFPLENBQUMseUVBQWE7QUFDcEMsaUJBQWlCLG9IQUF5Qzs7QUFFMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qix1QkFBdUI7O0FBRXJEO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMIiwiZmlsZSI6ImNoYXJ0NTA4ZmUzZmU5ZDAzY2U2NTU2ZmYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9iYXInKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFBsb3RseSA9IHJlcXVpcmUoJy4vY29yZScpO1xuXG5QbG90bHkucmVnaXN0ZXIoW1xuICAgIHJlcXVpcmUoJy4vYmFyJyksXG4gICAgcmVxdWlyZSgnLi9waWUnKVxuXSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxvdGx5O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvcGllJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuLy8gYXJyYXlPayBhdHRyaWJ1dGVzLCBtZXJnZSB0aGVtIGludG8gY2FsY2RhdGEgYXJyYXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIGNkW2ldLmkgPSBpO1xuXG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dCwgY2QsICd0eCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLmhvdmVydGV4dCwgY2QsICdodHgnKTtcblxuICAgIHZhciBtYXJrZXIgPSB0cmFjZS5tYXJrZXI7XG4gICAgaWYobWFya2VyKSB7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5vcGFjaXR5LCBjZCwgJ21vJywgdHJ1ZSk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5jb2xvciwgY2QsICdtYycpO1xuXG4gICAgICAgIHZhciBtYXJrZXJMaW5lID0gbWFya2VyLmxpbmU7XG4gICAgICAgIGlmKG1hcmtlckxpbmUpIHtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckxpbmUuY29sb3IsIGNkLCAnbWxjJyk7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXJMaW5lLndpZHRoLCBjZCwgJ21sdycpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIGhhc0NvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvaGVscGVycycpLmhhc0NvbG9yc2NhbGU7XG52YXIgY29sb3JzY2FsZUNhbGMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvY2FsYycpO1xudmFyIGFycmF5c1RvQ2FsY2RhdGEgPSByZXF1aXJlKCcuL2FycmF5c190b19jYWxjZGF0YScpO1xudmFyIGNhbGNTZWxlY3Rpb24gPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NhbGNfc2VsZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgeGEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueGF4aXMgfHwgJ3gnKTtcbiAgICB2YXIgeWEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueWF4aXMgfHwgJ3knKTtcbiAgICB2YXIgc2l6ZSwgcG9zO1xuXG4gICAgdmFyIHNpemVPcHRzID0ge1xuICAgICAgICBtc1VUQzogISEodHJhY2UuYmFzZSB8fCB0cmFjZS5iYXNlID09PSAwKVxuICAgIH07XG5cbiAgICBpZih0cmFjZS5vcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICAgIHNpemUgPSB4YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd4Jywgc2l6ZU9wdHMpO1xuICAgICAgICBwb3MgPSB5YS5tYWtlQ2FsY2RhdGEodHJhY2UsICd5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2l6ZSA9IHlhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3knLCBzaXplT3B0cyk7XG4gICAgICAgIHBvcyA9IHhhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3gnKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGhlIFwiY2FsY3VsYXRlZCBkYXRhXCIgdG8gcGxvdFxuICAgIHZhciBzZXJpZXNsZW4gPSBNYXRoLm1pbihwb3MubGVuZ3RoLCBzaXplLmxlbmd0aCk7XG4gICAgdmFyIGNkID0gbmV3IEFycmF5KHNlcmllc2xlbik7XG5cbiAgICAvLyBzZXQgcG9zaXRpb24gYW5kIHNpemVcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VyaWVzbGVuOyBpKyspIHtcbiAgICAgICAgY2RbaV0gPSB7IHA6IHBvc1tpXSwgczogc2l6ZVtpXSB9O1xuXG4gICAgICAgIGlmKHRyYWNlLmlkcykge1xuICAgICAgICAgICAgY2RbaV0uaWQgPSBTdHJpbmcodHJhY2UuaWRzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGF1dG8teiBhbmQgYXV0b2NvbG9yc2NhbGUgaWYgYXBwbGljYWJsZVxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXInKSkge1xuICAgICAgICBjb2xvcnNjYWxlQ2FsYyhnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgIHZhbHM6IHRyYWNlLm1hcmtlci5jb2xvcixcbiAgICAgICAgICAgIGNvbnRhaW5lclN0cjogJ21hcmtlcicsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXIubGluZScpKSB7XG4gICAgICAgIGNvbG9yc2NhbGVDYWxjKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgdmFsczogdHJhY2UubWFya2VyLmxpbmUuY29sb3IsXG4gICAgICAgICAgICBjb250YWluZXJTdHI6ICdtYXJrZXIubGluZScsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpO1xuICAgIGNhbGNTZWxlY3Rpb24oY2QsIHRyYWNlKTtcblxuICAgIHJldHVybiBjZDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlbnREYXRhKG91dCwgcHQsIHRyYWNlKSB7XG4gICAgLy8gc3RhbmRhcmQgY2FydGVzaWFuIGV2ZW50IGRhdGFcbiAgICBvdXQueCA9ICd4VmFsJyBpbiBwdCA/IHB0LnhWYWwgOiBwdC54O1xuICAgIG91dC55ID0gJ3lWYWwnIGluIHB0ID8gcHQueVZhbCA6IHB0Lnk7XG4gICAgaWYocHQueGEpIG91dC54YXhpcyA9IHB0LnhhO1xuICAgIGlmKHB0LnlhKSBvdXQueWF4aXMgPSBwdC55YTtcblxuICAgIGlmKHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgb3V0LmxhYmVsID0gb3V0Lnk7XG4gICAgICAgIG91dC52YWx1ZSA9IG91dC54O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dC5sYWJlbCA9IG91dC54O1xuICAgICAgICBvdXQudmFsdWUgPSBvdXQueTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgbGF5b3V0QXR0cmlidXRlczogcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJykuc3VwcGx5RGVmYXVsdHMsXG4gICAgY3Jvc3NUcmFjZURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJykuY3Jvc3NUcmFjZURlZmF1bHRzLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIGNyb3NzVHJhY2VDYWxjOiByZXF1aXJlKCcuL2Nyb3NzX3RyYWNlX2NhbGMnKS5jcm9zc1RyYWNlQ2FsYyxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi4vc2NhdHRlci9tYXJrZXJfY29sb3JiYXInKSxcbiAgICBhcnJheXNUb0NhbGNkYXRhOiByZXF1aXJlKCcuL2FycmF5c190b19jYWxjZGF0YScpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vcGxvdCcpLnBsb3QsXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKS5zdHlsZSxcbiAgICBzdHlsZU9uU2VsZWN0OiByZXF1aXJlKCcuL3N0eWxlJykuc3R5bGVPblNlbGVjdCxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLmhvdmVyUG9pbnRzLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi9ldmVudF9kYXRhJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuL3NlbGVjdCcpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnYmFyJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydiYXItbGlrZScsICdjYXJ0ZXNpYW4nLCAnc3ZnJywgJ2JhcicsICdvcmllbnRlZCcsICdlcnJvckJhcnNPSycsICdzaG93TGVnZW5kJywgJ3pvb21TY2FsZSddLFxuICAgIGFuaW1hdGFibGU6IHRydWUsXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBkYXRhIHZpc3VhbGl6ZWQgYnkgdGhlIHNwYW4gb2YgdGhlIGJhcnMgaXMgc2V0IGluIGB5YCcsXG4gICAgICAgICAgICAnaWYgYG9yaWVudGF0aW9uYCBpcyBzZXQgdGggKnYqICh0aGUgZGVmYXVsdCknLFxuICAgICAgICAgICAgJ2FuZCB0aGUgbGFiZWxzIGFyZSBzZXQgaW4gYHhgLicsXG4gICAgICAgICAgICAnQnkgc2V0dGluZyBgb3JpZW50YXRpb25gIHRvICpoKiwgdGhlIHJvbGVzIGFyZSBpbnRlcmNoYW5nZWQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYmFybW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydzdGFjaycsICdncm91cCcsICdvdmVybGF5JywgJ3JlbGF0aXZlJ10sXG4gICAgICAgIGRmbHQ6ICdncm91cCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIGhvdyBiYXJzIGF0IHRoZSBzYW1lIGxvY2F0aW9uIGNvb3JkaW5hdGUnLFxuICAgICAgICAgICAgJ2FyZSBkaXNwbGF5ZWQgb24gdGhlIGdyYXBoLicsXG4gICAgICAgICAgICAnV2l0aCAqc3RhY2sqLCB0aGUgYmFycyBhcmUgc3RhY2tlZCBvbiB0b3Agb2Ygb25lIGFub3RoZXInLFxuICAgICAgICAgICAgJ1dpdGggKnJlbGF0aXZlKiwgdGhlIGJhcnMgYXJlIHN0YWNrZWQgb24gdG9wIG9mIG9uZSBhbm90aGVyLCcsXG4gICAgICAgICAgICAnd2l0aCBuZWdhdGl2ZSB2YWx1ZXMgYmVsb3cgdGhlIGF4aXMsIHBvc2l0aXZlIHZhbHVlcyBhYm92ZScsXG4gICAgICAgICAgICAnV2l0aCAqZ3JvdXAqLCB0aGUgYmFycyBhcmUgcGxvdHRlZCBuZXh0IHRvIG9uZSBhbm90aGVyJyxcbiAgICAgICAgICAgICdjZW50ZXJlZCBhcm91bmQgdGhlIHNoYXJlZCBsb2NhdGlvbi4nLFxuICAgICAgICAgICAgJ1dpdGggKm92ZXJsYXkqLCB0aGUgYmFycyBhcmUgcGxvdHRlZCBvdmVyIG9uZSBhbm90aGVyLCcsXG4gICAgICAgICAgICAneW91IG1pZ2h0IG5lZWQgdG8gYW4gKm9wYWNpdHkqIHRvIHNlZSBtdWx0aXBsZSBiYXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJhcm5vcm06IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnJywgJ2ZyYWN0aW9uJywgJ3BlcmNlbnQnXSxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBub3JtYWxpemF0aW9uIGZvciBiYXIgdHJhY2VzIG9uIHRoZSBncmFwaC4nLFxuICAgICAgICAgICAgJ1dpdGggKmZyYWN0aW9uKiwgdGhlIHZhbHVlIG9mIGVhY2ggYmFyIGlzIGRpdmlkZWQgYnkgdGhlIHN1bSBvZiBhbGwnLFxuICAgICAgICAgICAgJ3ZhbHVlcyBhdCB0aGF0IGxvY2F0aW9uIGNvb3JkaW5hdGUuJyxcbiAgICAgICAgICAgICcqcGVyY2VudCogaXMgdGhlIHNhbWUgYnV0IG11bHRpcGxpZWQgYnkgMTAwIHRvIHNob3cgcGVyY2VudGFnZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYmFyZ2FwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBnYXAgKGluIHBsb3QgZnJhY3Rpb24pIGJldHdlZW4gYmFycyBvZicsXG4gICAgICAgICAgICAnYWRqYWNlbnQgbG9jYXRpb24gY29vcmRpbmF0ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYmFyZ3JvdXBnYXA6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGdhcCAoaW4gcGxvdCBmcmFjdGlvbikgYmV0d2VlbiBiYXJzIG9mJyxcbiAgICAgICAgICAgICd0aGUgc2FtZSBsb2NhdGlvbiBjb29yZGluYXRlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgbGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGxheW91dEluLCBsYXlvdXRPdXQsIGxheW91dEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBoYXNCYXJzID0gZmFsc2U7XG4gICAgdmFyIHNob3VsZEJlR2FwbGVzcyA9IGZhbHNlO1xuICAgIHZhciBnYXBwZWRBbnl3YXkgPSBmYWxzZTtcbiAgICB2YXIgdXNlZFN1YnBsb3RzID0ge307XG5cbiAgICB2YXIgbW9kZSA9IGNvZXJjZSgnYmFybW9kZScpO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IGZ1bGxEYXRhW2ldO1xuICAgICAgICBpZihSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAnYmFyJykgJiYgdHJhY2UudmlzaWJsZSkgaGFzQmFycyA9IHRydWU7XG4gICAgICAgIGVsc2UgY29udGludWU7XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhdCBsZWFzdCAyIGdyb3VwZWQgYmFyIHRyYWNlcyBvbiB0aGUgc2FtZSBzdWJwbG90LFxuICAgICAgICAvLyB3ZSBzaG91bGQgZGVmYXVsdCB0byBhIGdhcCBhbnl3YXksIGV2ZW4gaWYgdGhlIGRhdGEgaXMgaGlzdG9ncmFtc1xuICAgICAgICBpZihtb2RlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICB2YXIgc3VicGxvdGkgPSB0cmFjZS54YXhpcyArIHRyYWNlLnlheGlzO1xuICAgICAgICAgICAgaWYodXNlZFN1YnBsb3RzW3N1YnBsb3RpXSkgZ2FwcGVkQW55d2F5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHVzZWRTdWJwbG90c1tzdWJwbG90aV0gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJhY2UudmlzaWJsZSAmJiB0cmFjZS50eXBlID09PSAnaGlzdG9ncmFtJykge1xuICAgICAgICAgICAgdmFyIHBhID0gQXhlcy5nZXRGcm9tSWQoe19mdWxsTGF5b3V0OiBsYXlvdXRPdXR9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VbdHJhY2Uub3JpZW50YXRpb24gPT09ICd2JyA/ICd4YXhpcycgOiAneWF4aXMnXSk7XG4gICAgICAgICAgICBpZihwYS50eXBlICE9PSAnY2F0ZWdvcnknKSBzaG91bGRCZUdhcGxlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIWhhc0JhcnMpIHtcbiAgICAgICAgZGVsZXRlIGxheW91dE91dC5iYXJtb2RlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYobW9kZSAhPT0gJ292ZXJsYXknKSBjb2VyY2UoJ2Jhcm5vcm0nKTtcblxuICAgIGNvZXJjZSgnYmFyZ2FwJywgKHNob3VsZEJlR2FwbGVzcyAmJiAhZ2FwcGVkQW55d2F5KSA/IDAgOiAwLjIpO1xuICAgIGNvZXJjZSgnYmFyZ3JvdXBnYXAnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwbG90cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3Bsb3RzJyk7XG5cbmV4cG9ydHMubmFtZSA9ICdwaWUnO1xuXG5leHBvcnRzLnBsb3QgPSBmdW5jdGlvbihnZCwgdHJhY2VzLCB0cmFuc2l0aW9uT3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgIHBsb3RzLnBsb3RCYXNlUGxvdChleHBvcnRzLm5hbWUsIGdkLCB0cmFjZXMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydHMuY2xlYW4gPSBmdW5jdGlvbihuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpIHtcbiAgICBwbG90cy5jbGVhbkJhc2VQbG90KGV4cG9ydHMubmFtZSwgbmV3RnVsbERhdGEsIG5ld0Z1bGxMYXlvdXQsIG9sZEZ1bGxEYXRhLCBvbGRGdWxsTGF5b3V0KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2RvbWFpbicpLmRlZmF1bHRzO1xudmFyIGhhbmRsZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvZGVmYXVsdHMnKS5oYW5kbGVUZXh0O1xuXG5mdW5jdGlvbiBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZXMpIHtcbiAgICB2YXIgaGFzTGFiZWxzID0gQXJyYXkuaXNBcnJheShsYWJlbHMpO1xuICAgIHZhciBoYXNWYWx1ZXMgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh2YWx1ZXMpO1xuICAgIHZhciBsZW4gPSBNYXRoLm1pbihcbiAgICAgICAgaGFzTGFiZWxzID8gbGFiZWxzLmxlbmd0aCA6IEluZmluaXR5LFxuICAgICAgICBoYXNWYWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogSW5maW5pdHlcbiAgICApO1xuXG4gICAgaWYoIWlzRmluaXRlKGxlbikpIGxlbiA9IDA7XG5cbiAgICBpZihsZW4gJiYgaGFzVmFsdWVzKSB7XG4gICAgICAgIHZhciBoYXNQb3NpdGl2ZTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHZhbHVlc1tpXTtcbiAgICAgICAgICAgIGlmKGlzTnVtZXJpYyh2KSAmJiB2ID4gMCkge1xuICAgICAgICAgICAgICAgIGhhc1Bvc2l0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighaGFzUG9zaXRpdmUpIGxlbiA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGFzTGFiZWxzOiBoYXNMYWJlbHMsXG4gICAgICAgIGhhc1ZhbHVlczogaGFzVmFsdWVzLFxuICAgICAgICBsZW46IGxlblxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGFiZWxzID0gY29lcmNlKCdsYWJlbHMnKTtcbiAgICB2YXIgdmFsdWVzID0gY29lcmNlKCd2YWx1ZXMnKTtcblxuICAgIHZhciByZXMgPSBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZXMpO1xuICAgIHZhciBsZW4gPSByZXMubGVuO1xuICAgIHRyYWNlT3V0Ll9oYXNMYWJlbHMgPSByZXMuaGFzTGFiZWxzO1xuICAgIHRyYWNlT3V0Ll9oYXNWYWx1ZXMgPSByZXMuaGFzVmFsdWVzO1xuXG4gICAgaWYoIXRyYWNlT3V0Ll9oYXNMYWJlbHMgJiZcbiAgICAgICAgdHJhY2VPdXQuX2hhc1ZhbHVlc1xuICAgICkge1xuICAgICAgICBjb2VyY2UoJ2xhYmVsMCcpO1xuICAgICAgICBjb2VyY2UoJ2RsYWJlbCcpO1xuICAgIH1cblxuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICB2YXIgbGluZVdpZHRoID0gY29lcmNlKCdtYXJrZXIubGluZS53aWR0aCcpO1xuICAgIGlmKGxpbmVXaWR0aCkgY29lcmNlKCdtYXJrZXIubGluZS5jb2xvcicpO1xuXG4gICAgY29lcmNlKCdtYXJrZXIuY29sb3JzJyk7XG5cbiAgICBjb2VyY2UoJ3NjYWxlZ3JvdXAnKTtcbiAgICAvLyBUT0RPOiBob2xlIG5lZWRzIHRvIGJlIGNvZXJjZWQgdG8gdGhlIHNhbWUgdmFsdWUgd2l0aGluIGEgc2NhbGVlZ3JvdXBcblxuICAgIHZhciB0ZXh0RGF0YSA9IGNvZXJjZSgndGV4dCcpO1xuICAgIHZhciB0ZXh0VGVtcGxhdGUgPSBjb2VyY2UoJ3RleHR0ZW1wbGF0ZScpO1xuICAgIHZhciB0ZXh0SW5mbztcbiAgICBpZighdGV4dFRlbXBsYXRlKSB0ZXh0SW5mbyA9IGNvZXJjZSgndGV4dGluZm8nLCBBcnJheS5pc0FycmF5KHRleHREYXRhKSA/ICd0ZXh0K3BlcmNlbnQnIDogJ3BlcmNlbnQnKTtcblxuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICBpZih0ZXh0VGVtcGxhdGUgfHwgKHRleHRJbmZvICYmIHRleHRJbmZvICE9PSAnbm9uZScpKSB7XG4gICAgICAgIHZhciB0ZXh0cG9zaXRpb24gPSBjb2VyY2UoJ3RleHRwb3NpdGlvbicpO1xuICAgICAgICBoYW5kbGVUZXh0KHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgdGV4dHBvc2l0aW9uLCB7XG4gICAgICAgICAgICBtb2R1bGVIYXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNVbnNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZHVsZUhhc0NvbnN0cmFpbjogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNDbGlwb25heGlzOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZHVsZUhhc1RleHRhbmdsZTogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNJbnNpZGVhbmNob3I6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBoYXNCb3RoID0gQXJyYXkuaXNBcnJheSh0ZXh0cG9zaXRpb24pIHx8IHRleHRwb3NpdGlvbiA9PT0gJ2F1dG8nO1xuICAgICAgICB2YXIgaGFzT3V0c2lkZSA9IGhhc0JvdGggfHwgdGV4dHBvc2l0aW9uID09PSAnb3V0c2lkZSc7XG4gICAgICAgIGlmKGhhc091dHNpZGUpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnYXV0b21hcmdpbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGV4dHBvc2l0aW9uID09PSAnaW5zaWRlJyB8fCB0ZXh0cG9zaXRpb24gPT09ICdhdXRvJyB8fCBBcnJheS5pc0FycmF5KHRleHRwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnaW5zaWRldGV4dG9yaWVudGF0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEb21haW5EZWZhdWx0cyh0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuXG4gICAgdmFyIGhvbGUgPSBjb2VyY2UoJ2hvbGUnKTtcbiAgICB2YXIgdGl0bGUgPSBjb2VyY2UoJ3RpdGxlLnRleHQnKTtcbiAgICBpZih0aXRsZSkge1xuICAgICAgICB2YXIgdGl0bGVQb3NpdGlvbiA9IGNvZXJjZSgndGl0bGUucG9zaXRpb24nLCBob2xlID8gJ21pZGRsZSBjZW50ZXInIDogJ3RvcCBjZW50ZXInKTtcbiAgICAgICAgaWYoIWhvbGUgJiYgdGl0bGVQb3NpdGlvbiA9PT0gJ21pZGRsZSBjZW50ZXInKSB0cmFjZU91dC50aXRsZS5wb3NpdGlvbiA9ICd0b3AgY2VudGVyJztcbiAgICAgICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAndGl0bGUuZm9udCcsIGxheW91dC5mb250KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3NvcnQnKTtcbiAgICBjb2VyY2UoJ2RpcmVjdGlvbicpO1xuICAgIGNvZXJjZSgncm90YXRpb24nKTtcbiAgICBjb2VyY2UoJ3B1bGwnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaGFuZGxlTGFiZWxzQW5kVmFsdWVzOiBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMsXG4gICAgc3VwcGx5RGVmYXVsdHM6IHN1cHBseURlZmF1bHRzXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLnN1cHBseURlZmF1bHRzLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcblxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLmNhbGMsXG4gICAgY3Jvc3NUcmFjZUNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLmNyb3NzVHJhY2VDYWxjLFxuXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JykucGxvdCxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuICAgIHN0eWxlT25lOiByZXF1aXJlKCcuL3N0eWxlX29uZScpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAncGllJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi9iYXNlX3Bsb3QnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ3BpZS1saWtlJywgJ3BpZScsICdzaG93TGVnZW5kJ10sXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0EgZGF0YSB2aXN1YWxpemVkIGJ5IHRoZSBzZWN0b3JzIG9mIHRoZSBwaWUgaXMgc2V0IGluIGB2YWx1ZXNgLicsXG4gICAgICAgICAgICAnVGhlIHNlY3RvciBsYWJlbHMgYXJlIHNldCBpbiBgbGFiZWxzYC4nLFxuICAgICAgICAgICAgJ1RoZSBzZWN0b3IgY29sb3JzIGFyZSBzZXQgaW4gYG1hcmtlci5jb2xvcnNgJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGhpZGRlbmxhYmVsczoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdoaWRkZW5sYWJlbHMgaXMgdGhlIGZ1bm5lbGFyZWEgJiBwaWUgY2hhcnQgYW5hbG9nIG9mJyxcbiAgICAgICAgICAgICd2aXNpYmxlOlxcJ2xlZ2VuZG9ubHlcXCcnLFxuICAgICAgICAgICAgJ2J1dCBpdCBjYW4gY29udGFpbiBtYW55IGxhYmVscywgYW5kIGNhbiBzaW11bHRhbmVvdXNseScsXG4gICAgICAgICAgICAnaGlkZSBzbGljZXMgZnJvbSBzZXZlcmFsIHBpZXMvZnVubmVsYXJlYSBjaGFydHMnXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBwaWVjb2xvcndheToge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3JsaXN0JyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBkZWZhdWx0IHBpZSBzbGljZSBjb2xvcnMuIERlZmF1bHRzIHRvIHRoZSBtYWluJyxcbiAgICAgICAgICAgICdgY29sb3J3YXlgIHVzZWQgZm9yIHRyYWNlIGNvbG9ycy4gSWYgeW91IHNwZWNpZnkgYSBuZXcnLFxuICAgICAgICAgICAgJ2xpc3QgaGVyZSBpdCBjYW4gc3RpbGwgYmUgZXh0ZW5kZWQgd2l0aCBsaWdodGVyIGFuZCBkYXJrZXInLFxuICAgICAgICAgICAgJ2NvbG9ycywgc2VlIGBleHRlbmRwaWVjb2xvcnNgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGV4dGVuZHBpZWNvbG9yczoge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgYHRydWVgLCB0aGUgcGllIHNsaWNlIGNvbG9ycyAod2hldGhlciBnaXZlbiBieSBgcGllY29sb3J3YXlgIG9yJyxcbiAgICAgICAgICAgICdpbmhlcml0ZWQgZnJvbSBgY29sb3J3YXlgKSB3aWxsIGJlIGV4dGVuZGVkIHRvIHRocmVlIHRpbWVzIGl0cycsXG4gICAgICAgICAgICAnb3JpZ2luYWwgbGVuZ3RoIGJ5IGZpcnN0IHJlcGVhdGluZyBldmVyeSBjb2xvciAyMCUgbGlnaHRlciB0aGVuJyxcbiAgICAgICAgICAgICdlYWNoIGNvbG9yIDIwJSBkYXJrZXIuIFRoaXMgaXMgaW50ZW5kZWQgdG8gcmVkdWNlIHRoZSBsaWtlbGlob29kJyxcbiAgICAgICAgICAgICdvZiByZXVzaW5nIHRoZSBzYW1lIGNvbG9yIHdoZW4geW91IGhhdmUgbWFueSBzbGljZXMsIGJ1dCB5b3UgY2FuJyxcbiAgICAgICAgICAgICdzZXQgYGZhbHNlYCB0byBkaXNhYmxlLicsXG4gICAgICAgICAgICAnQ29sb3JzIHByb3ZpZGVkIGluIHRoZSB0cmFjZSwgdXNpbmcgYG1hcmtlci5jb2xvcnNgLCBhcmUgbmV2ZXInLFxuICAgICAgICAgICAgJ2V4dGVuZGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBsYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseUxheW91dERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShsYXlvdXRJbiwgbGF5b3V0T3V0LCBsYXlvdXRBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2hpZGRlbmxhYmVscycpO1xuICAgIGNvZXJjZSgncGllY29sb3J3YXknLCBsYXlvdXRPdXQuY29sb3J3YXkpO1xuICAgIGNvZXJjZSgnZXh0ZW5kcGllY29sb3JzJyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgc3R5bGVPbmUgPSByZXF1aXJlKCcuL3N0eWxlX29uZScpO1xudmFyIHJlc2l6ZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvdW5pZm9ybV90ZXh0JykucmVzaXplVGV4dDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHlsZShnZCkge1xuICAgIHZhciBzID0gZ2QuX2Z1bGxMYXlvdXQuX3BpZWxheWVyLnNlbGVjdEFsbCgnLnRyYWNlJyk7XG4gICAgcmVzaXplVGV4dChnZCwgcywgJ3BpZScpO1xuXG4gICAgcy5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuICAgICAgICB2YXIgdHJhY2VTZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgdHJhY2VTZWxlY3Rpb24uc3R5bGUoe29wYWNpdHk6IHRyYWNlLm9wYWNpdHl9KTtcblxuICAgICAgICB0cmFjZVNlbGVjdGlvbi5zZWxlY3RBbGwoJ3BhdGguc3VyZmFjZScpLmVhY2goZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKHN0eWxlT25lLCBwdCwgdHJhY2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9