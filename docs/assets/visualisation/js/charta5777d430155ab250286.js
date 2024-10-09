(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_candlestick_js-node_modules_plotly_js_src_traces_bar_attributes_js"],{

/***/ "./node_modules/plotly.js/lib/candlestick.js":
/*!***************************************************!*\
  !*** ./node_modules/plotly.js/lib/candlestick.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/candlestick */ "./node_modules/plotly.js/src/traces/candlestick/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/attributes.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/attributes.js ***!
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
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/bar/constants.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var textFontAttrs = fontAttrs({
    editType: 'calc',
    arrayOk: true,
    colorEditType: 'style',
    description: ''
});

var scatterMarkerAttrs = scatterAttrs.marker;
var scatterMarkerLineAttrs = scatterMarkerAttrs.line;

var markerLineWidth = extendFlat({},
    scatterMarkerLineAttrs.width, { dflt: 0 });

var markerLine = extendFlat({
    width: markerLineWidth,
    editType: 'calc'
}, colorScaleAttrs('marker.line'));

var marker = extendFlat({
    line: markerLine,
    editType: 'calc'
}, colorScaleAttrs('marker'), {
    opacity: {
        valType: 'number',
        arrayOk: true,
        dflt: 1,
        min: 0,
        max: 1,
        role: 'style',
        editType: 'style',
        description: 'Sets the opacity of the bars.'
    }
});

module.exports = {
    x: scatterAttrs.x,
    x0: scatterAttrs.x0,
    dx: scatterAttrs.dx,
    y: scatterAttrs.y,
    y0: scatterAttrs.y0,
    dy: scatterAttrs.dy,

    text: scatterAttrs.text,
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: constants.eventDataKeys
    }),
    hovertext: scatterAttrs.hovertext,
    hovertemplate: hovertemplateAttrs({}, {
        keys: constants.eventDataKeys
    }),

    textposition: {
        valType: 'enumerated',
        role: 'info',
        values: ['inside', 'outside', 'auto', 'none'],
        dflt: 'none',
        arrayOk: true,
        editType: 'calc',
        description: [
            'Specifies the location of the `text`.',
            '*inside* positions `text` inside, next to the bar end',
            '(rotated and scaled if needed).',
            '*outside* positions `text` outside, next to the bar end',
            '(scaled if needed), unless there is another bar stacked on',
            'this one, then the text gets pushed inside.',
            '*auto* tries to position `text` inside the bar, but if',
            'the bar is too small and no bar is stacked on this one',
            'the text is moved outside.'
        ].join(' ')
    },

    insidetextanchor: {
        valType: 'enumerated',
        values: ['end', 'middle', 'start'],
        dflt: 'end',
        role: 'info',
        editType: 'plot',
        description: [
            'Determines if texts are kept at center or start/end points in `textposition` *inside* mode.'
        ].join(' ')
    },

    textangle: {
        valType: 'angle',
        dflt: 'auto',
        role: 'info',
        editType: 'plot',
        description: [
            'Sets the angle of the tick labels with respect to the bar.',
            'For example, a `tickangle` of -90 draws the tick labels',
            'vertically. With *auto* the texts may automatically be',
            'rotated to fit with the maximum size in bars.'
        ].join(' ')
    },

    textfont: extendFlat({}, textFontAttrs, {
        description: 'Sets the font used for `text`.'
    }),

    insidetextfont: extendFlat({}, textFontAttrs, {
        description: 'Sets the font used for `text` lying inside the bar.'
    }),

    outsidetextfont: extendFlat({}, textFontAttrs, {
        description: 'Sets the font used for `text` lying outside the bar.'
    }),

    constraintext: {
        valType: 'enumerated',
        values: ['inside', 'outside', 'both', 'none'],
        role: 'info',
        dflt: 'both',
        editType: 'calc',
        description: [
            'Constrain the size of text inside or outside a bar to be no',
            'larger than the bar itself.'
        ].join(' ')
    },

    cliponaxis: extendFlat({}, scatterAttrs.cliponaxis, {
        description: [
            'Determines whether the text nodes',
            'are clipped about the subplot axes.',
            'To show the text nodes above axis lines and tick labels,',
            'make sure to set `xaxis.layer` and `yaxis.layer` to *below traces*.'
        ].join(' ')
    }),

    orientation: {
        valType: 'enumerated',
        role: 'info',
        values: ['v', 'h'],
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the orientation of the bars.',
            'With *v* (*h*), the value of the each bar spans',
            'along the vertical (horizontal).'
        ].join(' ')
    },

    base: {
        valType: 'any',
        dflt: null,
        arrayOk: true,
        role: 'info',
        editType: 'calc',
        description: [
            'Sets where the bar base is drawn (in position axis units).',
            'In *stack* or *relative* barmode,',
            'traces that set *base* will be excluded',
            'and drawn in *overlay* mode instead.'
        ].join(' ')
    },

    offset: {
        valType: 'number',
        dflt: null,
        arrayOk: true,
        role: 'info',
        editType: 'calc',
        description: [
            'Shifts the position where the bar is drawn',
            '(in position axis units).',
            'In *group* barmode,',
            'traces that set *offset* will be excluded',
            'and drawn in *overlay* mode instead.'
        ].join(' ')
    },

    width: {
        valType: 'number',
        dflt: null,
        min: 0,
        arrayOk: true,
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the bar width (in position axis units).'
        ].join(' ')
    },

    marker: marker,

    offsetgroup: {
        valType: 'string',
        role: 'info',
        dflt: '',
        editType: 'calc',
        description: [
            'Set several traces linked to the same position axis',
            'or matching axes to the same',
            'offsetgroup where bars of the same position coordinate will line up.'
        ].join(' ')
    },
    alignmentgroup: {
        valType: 'string',
        role: 'info',
        dflt: '',
        editType: 'calc',
        description: [
            'Set several traces linked to the same position axis',
            'or matching axes to the same',
            'alignmentgroup. This controls whether bars compute their positional',
            'range dependently or independently.'
        ].join(' ')
    },

    selected: {
        marker: {
            opacity: scatterAttrs.selected.marker.opacity,
            color: scatterAttrs.selected.marker.color,
            editType: 'style'
        },
        textfont: scatterAttrs.selected.textfont,
        editType: 'style'
    },
    unselected: {
        marker: {
            opacity: scatterAttrs.unselected.marker.opacity,
            color: scatterAttrs.unselected.marker.color,
            editType: 'style'
        },
        textfont: scatterAttrs.unselected.textfont,
        editType: 'style'
    },

    r: scatterAttrs.r,
    t: scatterAttrs.t,

    _deprecated: {
        bardir: {
            valType: 'enumerated',
            role: 'info',
            editType: 'calc',
            values: ['v', 'h'],
            description: 'Renamed to `orientation`.'
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/constants.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/constants.js ***!
  \************************************************************/
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
    // padding in pixels around text
    TEXTPAD: 3,
    // 'value' and 'label' are not really necessary for bar traces,
    // but they were made available to `texttemplate` (maybe by accident)
    // via tokens `%{value}` and `%{label}` starting in 1.50.0,
    // so let's include them in the event data also.
    eventDataKeys: ['value', 'label']
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/box/style.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/box/style.js ***!
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");

function style(gd, cd, sel) {
    var s = sel ? sel : d3.select(gd).selectAll('g.trace.boxes');

    s.style('opacity', function(d) { return d[0].trace.opacity; });

    s.each(function(d) {
        var el = d3.select(this);
        var trace = d[0].trace;
        var lineWidth = trace.line.width;

        function styleBox(boxSel, lineWidth, lineColor, fillColor) {
            boxSel.style('stroke-width', lineWidth + 'px')
                .call(Color.stroke, lineColor)
                .call(Color.fill, fillColor);
        }

        var allBoxes = el.selectAll('path.box');

        if(trace.type === 'candlestick') {
            allBoxes.each(function(boxData) {
                if(boxData.empty) return;

                var thisBox = d3.select(this);
                var container = trace[boxData.dir]; // dir = 'increasing' or 'decreasing'
                styleBox(thisBox, container.line.width, container.line.color, container.fillcolor);
                // TODO: custom selection style for candlesticks
                thisBox.style('opacity', trace.selectedpoints && !boxData.selected ? 0.3 : 1);
            });
        } else {
            styleBox(allBoxes, lineWidth, trace.line.color, trace.fillcolor);
            el.selectAll('path.mean')
                .style({
                    'stroke-width': lineWidth,
                    'stroke-dasharray': (2 * lineWidth) + 'px,' + lineWidth + 'px'
                })
                .call(Color.stroke, trace.line.color);

            var pts = el.selectAll('path.point');
            Drawing.pointStyle(pts, trace, gd);
        }
    });
}

function styleOnSelect(gd, cd, sel) {
    var trace = cd[0].trace;
    var pts = sel.selectAll('path.point');

    if(trace.selectedpoints) {
        Drawing.selectedPointStyle(pts, trace);
    } else {
        Drawing.pointStyle(pts, trace, gd);
    }
}

module.exports = {
    style: style,
    styleOnSelect: styleOnSelect
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/candlestick/attributes.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/candlestick/attributes.js ***!
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




var extendFlat = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").extendFlat;
var OHLCattrs = __webpack_require__(/*! ../ohlc/attributes */ "./node_modules/plotly.js/src/traces/ohlc/attributes.js");
var boxAttrs = __webpack_require__(/*! ../box/attributes */ "./node_modules/plotly.js/src/traces/box/attributes.js");

function directionAttrs(lineColorDefault) {
    return {
        line: {
            color: extendFlat({}, boxAttrs.line.color, {dflt: lineColorDefault}),
            width: boxAttrs.line.width,
            editType: 'style'
        },

        fillcolor: boxAttrs.fillcolor,
        editType: 'style'
    };
}

module.exports = {
    x: OHLCattrs.x,
    open: OHLCattrs.open,
    high: OHLCattrs.high,
    low: OHLCattrs.low,
    close: OHLCattrs.close,

    line: {
        width: extendFlat({}, boxAttrs.line.width, {
            description: [
                boxAttrs.line.width.description,
                'Note that this style setting can also be set per',
                'direction via `increasing.line.width` and',
                '`decreasing.line.width`.'
            ].join(' ')
        }),
        editType: 'style'
    },

    increasing: directionAttrs(OHLCattrs.increasing.line.color.dflt),

    decreasing: directionAttrs(OHLCattrs.decreasing.line.color.dflt),

    text: OHLCattrs.text,
    hovertext: OHLCattrs.hovertext,
    whiskerwidth: extendFlat({}, boxAttrs.whiskerwidth, { dflt: 0 }),

    hoverlabel: OHLCattrs.hoverlabel,
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/candlestick/calc.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/candlestick/calc.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

var calcCommon = __webpack_require__(/*! ../ohlc/calc */ "./node_modules/plotly.js/src/traces/ohlc/calc.js").calcCommon;

module.exports = function(gd, trace) {
    var fullLayout = gd._fullLayout;
    var xa = Axes.getFromId(gd, trace.xaxis);
    var ya = Axes.getFromId(gd, trace.yaxis);

    var x = xa.makeCalcdata(trace, 'x');

    var cd = calcCommon(gd, trace, x, ya, ptFunc);

    if(cd.length) {
        Lib.extendFlat(cd[0].t, {
            num: fullLayout._numBoxes,
            dPos: Lib.distinctVals(x).minDiff / 2,
            posLetter: 'x',
            valLetter: 'y',
        });

        fullLayout._numBoxes++;
        return cd;
    } else {
        return [{t: {empty: true}}];
    }
};

function ptFunc(o, h, l, c) {
    return {
        min: l,
        q1: Math.min(o, c),
        med: c,
        q3: Math.max(o, c),
        max: h,
    };
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/candlestick/defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/candlestick/defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var handleOHLC = __webpack_require__(/*! ../ohlc/ohlc_defaults */ "./node_modules/plotly.js/src/traces/ohlc/ohlc_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/candlestick/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleOHLC(traceIn, traceOut, coerce, layout);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('line.width');

    handleDirection(traceIn, traceOut, coerce, 'increasing');
    handleDirection(traceIn, traceOut, coerce, 'decreasing');

    coerce('text');
    coerce('hovertext');
    coerce('whiskerwidth');

    layout._requestRangeslider[traceOut.xaxis] = true;
};

function handleDirection(traceIn, traceOut, coerce, direction) {
    var lineColor = coerce(direction + '.line.color');
    coerce(direction + '.line.width', traceOut.line.width);
    coerce(direction + '.fillcolor', Color.addOpacity(lineColor, 0.5));
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/candlestick/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/candlestick/index.js ***!
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



module.exports = {
    moduleType: 'trace',
    name: 'candlestick',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', 'showLegend', 'candlestick', 'boxLayout'],
    meta: {
        description: [
            'The candlestick is a style of financial chart describing',
            'open, high, low and close for a given `x` coordinate (most likely time).',

            'The boxes represent the spread between the `open` and `close` values and',
            'the lines represent the spread between the `low` and `high` values',

            'Sample points where the close value is higher (lower) then the open',
            'value are called increasing (decreasing).',

            'By default, increasing candles are drawn in green whereas',
            'decreasing are drawn in red.'
        ].join(' ')
    },

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/candlestick/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ../box/layout_attributes */ "./node_modules/plotly.js/src/traces/box/layout_attributes.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ../box/layout_defaults */ "./node_modules/plotly.js/src/traces/box/layout_defaults.js").supplyLayoutDefaults,
    crossTraceCalc: __webpack_require__(/*! ../box/cross_trace_calc */ "./node_modules/plotly.js/src/traces/box/cross_trace_calc.js").crossTraceCalc,
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/candlestick/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/candlestick/calc.js"),
    plot: __webpack_require__(/*! ../box/plot */ "./node_modules/plotly.js/src/traces/box/plot.js").plot,
    layerName: 'boxlayer',
    style: __webpack_require__(/*! ../box/style */ "./node_modules/plotly.js/src/traces/box/style.js").style,
    hoverPoints: __webpack_require__(/*! ../ohlc/hover */ "./node_modules/plotly.js/src/traces/ohlc/hover.js").hoverPoints,
    selectPoints: __webpack_require__(/*! ../ohlc/select */ "./node_modules/plotly.js/src/traces/ohlc/select.js")
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvY2FuZGxlc3RpY2suanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9ib3gvc3R5bGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jYW5kbGVzdGljay9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FuZGxlc3RpY2svY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhbmRsZXN0aWNrL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FuZGxlc3RpY2svaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUlBQXFEOzs7Ozs7Ozs7Ozs7QUNWckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsd0ZBQXVCO0FBQ2xELHlCQUF5QiwwSUFBNkQ7QUFDdEYsd0JBQXdCLHlJQUE0RDtBQUNwRixzQkFBc0IsbUJBQU8sQ0FBQyxnSEFBd0M7QUFDdEUsZ0JBQWdCLG1C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QUMsNERBQVc7QUFDN0IsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxpQkFBaUIsbUJBQU8sQ0FBQyx3RkFBdUI7QUFDaEQsaUJBQWlCLG1CQUFPLENBQUMsbUZBQWM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsb0ZBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsZ0JBQWdCLG1CQUFPLENBQUMsbUZBQWM7QUFDdEMsc0JBQXNCLG1CQUFPLENBQUMsOEZBQTBCO0FBQ3hELDBCQUEwQixvSUFBc0Q7QUFDaEYsb0JBQW9CLGdJQUFpRDtBQUNyRSxvQkFBb0IsbUJBQU8sQ0FBQywrRUFBWTtBQUN4QyxVQUFVLG1CQUFPLENBQUMsdUVBQVE7QUFDMUIsVUFBVSw4RkFBMkI7QUFDckM7QUFDQSxXQUFXLGlHQUE2QjtBQUN4QyxpQkFBaUIseUdBQW9DO0FBQ3JELGtCQUFrQixtQkFBTyxDQUFDLDBFQUFnQjtBQUMxQyIsImZpbGUiOiJjaGFydGE1Nzc3ZDQzMDE1NWFiMjUwMjg2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvY2FuZGxlc3RpY2snKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNjYXR0ZXJBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXR0cmlidXRlcycpO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgdGV4dHRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykudGV4dHRlbXBsYXRlQXR0cnM7XG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBmb250QXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9mb250X2F0dHJpYnV0ZXMnKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG52YXIgdGV4dEZvbnRBdHRycyA9IGZvbnRBdHRycyh7XG4gICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICBhcnJheU9rOiB0cnVlLFxuICAgIGNvbG9yRWRpdFR5cGU6ICdzdHlsZScsXG4gICAgZGVzY3JpcHRpb246ICcnXG59KTtcblxudmFyIHNjYXR0ZXJNYXJrZXJBdHRycyA9IHNjYXR0ZXJBdHRycy5tYXJrZXI7XG52YXIgc2NhdHRlck1hcmtlckxpbmVBdHRycyA9IHNjYXR0ZXJNYXJrZXJBdHRycy5saW5lO1xuXG52YXIgbWFya2VyTGluZVdpZHRoID0gZXh0ZW5kRmxhdCh7fSxcbiAgICBzY2F0dGVyTWFya2VyTGluZUF0dHJzLndpZHRoLCB7IGRmbHQ6IDAgfSk7XG5cbnZhciBtYXJrZXJMaW5lID0gZXh0ZW5kRmxhdCh7XG4gICAgd2lkdGg6IG1hcmtlckxpbmVXaWR0aCxcbiAgICBlZGl0VHlwZTogJ2NhbGMnXG59LCBjb2xvclNjYWxlQXR0cnMoJ21hcmtlci5saW5lJykpO1xuXG52YXIgbWFya2VyID0gZXh0ZW5kRmxhdCh7XG4gICAgbGluZTogbWFya2VyTGluZSxcbiAgICBlZGl0VHlwZTogJ2NhbGMnXG59LCBjb2xvclNjYWxlQXR0cnMoJ21hcmtlcicpLCB7XG4gICAgb3BhY2l0eToge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIG9wYWNpdHkgb2YgdGhlIGJhcnMuJ1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB4OiBzY2F0dGVyQXR0cnMueCxcbiAgICB4MDogc2NhdHRlckF0dHJzLngwLFxuICAgIGR4OiBzY2F0dGVyQXR0cnMuZHgsXG4gICAgeTogc2NhdHRlckF0dHJzLnksXG4gICAgeTA6IHNjYXR0ZXJBdHRycy55MCxcbiAgICBkeTogc2NhdHRlckF0dHJzLmR5LFxuXG4gICAgdGV4dDogc2NhdHRlckF0dHJzLnRleHQsXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdwbG90J30sIHtcbiAgICAgICAga2V5czogY29uc3RhbnRzLmV2ZW50RGF0YUtleXNcbiAgICB9KSxcbiAgICBob3ZlcnRleHQ6IHNjYXR0ZXJBdHRycy5ob3ZlcnRleHQsXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHt9LCB7XG4gICAgICAgIGtleXM6IGNvbnN0YW50cy5ldmVudERhdGFLZXlzXG4gICAgfSksXG5cbiAgICB0ZXh0cG9zaXRpb246IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIHZhbHVlczogWydpbnNpZGUnLCAnb3V0c2lkZScsICdhdXRvJywgJ25vbmUnXSxcbiAgICAgICAgZGZsdDogJ25vbmUnLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NwZWNpZmllcyB0aGUgbG9jYXRpb24gb2YgdGhlIGB0ZXh0YC4nLFxuICAgICAgICAgICAgJyppbnNpZGUqIHBvc2l0aW9ucyBgdGV4dGAgaW5zaWRlLCBuZXh0IHRvIHRoZSBiYXIgZW5kJyxcbiAgICAgICAgICAgICcocm90YXRlZCBhbmQgc2NhbGVkIGlmIG5lZWRlZCkuJyxcbiAgICAgICAgICAgICcqb3V0c2lkZSogcG9zaXRpb25zIGB0ZXh0YCBvdXRzaWRlLCBuZXh0IHRvIHRoZSBiYXIgZW5kJyxcbiAgICAgICAgICAgICcoc2NhbGVkIGlmIG5lZWRlZCksIHVubGVzcyB0aGVyZSBpcyBhbm90aGVyIGJhciBzdGFja2VkIG9uJyxcbiAgICAgICAgICAgICd0aGlzIG9uZSwgdGhlbiB0aGUgdGV4dCBnZXRzIHB1c2hlZCBpbnNpZGUuJyxcbiAgICAgICAgICAgICcqYXV0byogdHJpZXMgdG8gcG9zaXRpb24gYHRleHRgIGluc2lkZSB0aGUgYmFyLCBidXQgaWYnLFxuICAgICAgICAgICAgJ3RoZSBiYXIgaXMgdG9vIHNtYWxsIGFuZCBubyBiYXIgaXMgc3RhY2tlZCBvbiB0aGlzIG9uZScsXG4gICAgICAgICAgICAndGhlIHRleHQgaXMgbW92ZWQgb3V0c2lkZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGluc2lkZXRleHRhbmNob3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnZW5kJywgJ21pZGRsZScsICdzdGFydCddLFxuICAgICAgICBkZmx0OiAnZW5kJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaWYgdGV4dHMgYXJlIGtlcHQgYXQgY2VudGVyIG9yIHN0YXJ0L2VuZCBwb2ludHMgaW4gYHRleHRwb3NpdGlvbmAgKmluc2lkZSogbW9kZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHRleHRhbmdsZToge1xuICAgICAgICB2YWxUeXBlOiAnYW5nbGUnLFxuICAgICAgICBkZmx0OiAnYXV0bycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBhbmdsZSBvZiB0aGUgdGljayBsYWJlbHMgd2l0aCByZXNwZWN0IHRvIHRoZSBiYXIuJyxcbiAgICAgICAgICAgICdGb3IgZXhhbXBsZSwgYSBgdGlja2FuZ2xlYCBvZiAtOTAgZHJhd3MgdGhlIHRpY2sgbGFiZWxzJyxcbiAgICAgICAgICAgICd2ZXJ0aWNhbGx5LiBXaXRoICphdXRvKiB0aGUgdGV4dHMgbWF5IGF1dG9tYXRpY2FsbHkgYmUnLFxuICAgICAgICAgICAgJ3JvdGF0ZWQgdG8gZml0IHdpdGggdGhlIG1heGltdW0gc2l6ZSBpbiBiYXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgdGV4dGZvbnQ6IGV4dGVuZEZsYXQoe30sIHRleHRGb250QXR0cnMsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBmb250IHVzZWQgZm9yIGB0ZXh0YC4nXG4gICAgfSksXG5cbiAgICBpbnNpZGV0ZXh0Zm9udDogZXh0ZW5kRmxhdCh7fSwgdGV4dEZvbnRBdHRycywge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGZvbnQgdXNlZCBmb3IgYHRleHRgIGx5aW5nIGluc2lkZSB0aGUgYmFyLidcbiAgICB9KSxcblxuICAgIG91dHNpZGV0ZXh0Zm9udDogZXh0ZW5kRmxhdCh7fSwgdGV4dEZvbnRBdHRycywge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGZvbnQgdXNlZCBmb3IgYHRleHRgIGx5aW5nIG91dHNpZGUgdGhlIGJhci4nXG4gICAgfSksXG5cbiAgICBjb25zdHJhaW50ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ2luc2lkZScsICdvdXRzaWRlJywgJ2JvdGgnLCAnbm9uZSddLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICdib3RoJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdDb25zdHJhaW4gdGhlIHNpemUgb2YgdGV4dCBpbnNpZGUgb3Igb3V0c2lkZSBhIGJhciB0byBiZSBubycsXG4gICAgICAgICAgICAnbGFyZ2VyIHRoYW4gdGhlIGJhciBpdHNlbGYuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBjbGlwb25heGlzOiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMuY2xpcG9uYXhpcywge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciB0aGUgdGV4dCBub2RlcycsXG4gICAgICAgICAgICAnYXJlIGNsaXBwZWQgYWJvdXQgdGhlIHN1YnBsb3QgYXhlcy4nLFxuICAgICAgICAgICAgJ1RvIHNob3cgdGhlIHRleHQgbm9kZXMgYWJvdmUgYXhpcyBsaW5lcyBhbmQgdGljayBsYWJlbHMsJyxcbiAgICAgICAgICAgICdtYWtlIHN1cmUgdG8gc2V0IGB4YXhpcy5sYXllcmAgYW5kIGB5YXhpcy5sYXllcmAgdG8gKmJlbG93IHRyYWNlcyouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuXG4gICAgb3JpZW50YXRpb246IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIHZhbHVlczogWyd2JywgJ2gnXSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgYmFycy4nLFxuICAgICAgICAgICAgJ1dpdGggKnYqICgqaCopLCB0aGUgdmFsdWUgb2YgdGhlIGVhY2ggYmFyIHNwYW5zJyxcbiAgICAgICAgICAgICdhbG9uZyB0aGUgdmVydGljYWwgKGhvcml6b250YWwpLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgYmFzZToge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgd2hlcmUgdGhlIGJhciBiYXNlIGlzIGRyYXduIChpbiBwb3NpdGlvbiBheGlzIHVuaXRzKS4nLFxuICAgICAgICAgICAgJ0luICpzdGFjayogb3IgKnJlbGF0aXZlKiBiYXJtb2RlLCcsXG4gICAgICAgICAgICAndHJhY2VzIHRoYXQgc2V0ICpiYXNlKiB3aWxsIGJlIGV4Y2x1ZGVkJyxcbiAgICAgICAgICAgICdhbmQgZHJhd24gaW4gKm92ZXJsYXkqIG1vZGUgaW5zdGVhZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIG9mZnNldDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NoaWZ0cyB0aGUgcG9zaXRpb24gd2hlcmUgdGhlIGJhciBpcyBkcmF3bicsXG4gICAgICAgICAgICAnKGluIHBvc2l0aW9uIGF4aXMgdW5pdHMpLicsXG4gICAgICAgICAgICAnSW4gKmdyb3VwKiBiYXJtb2RlLCcsXG4gICAgICAgICAgICAndHJhY2VzIHRoYXQgc2V0ICpvZmZzZXQqIHdpbGwgYmUgZXhjbHVkZWQnLFxuICAgICAgICAgICAgJ2FuZCBkcmF3biBpbiAqb3ZlcmxheSogbW9kZSBpbnN0ZWFkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgd2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGJhciB3aWR0aCAoaW4gcG9zaXRpb24gYXhpcyB1bml0cykuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBtYXJrZXI6IG1hcmtlcixcblxuICAgIG9mZnNldGdyb3VwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldCBzZXZlcmFsIHRyYWNlcyBsaW5rZWQgdG8gdGhlIHNhbWUgcG9zaXRpb24gYXhpcycsXG4gICAgICAgICAgICAnb3IgbWF0Y2hpbmcgYXhlcyB0byB0aGUgc2FtZScsXG4gICAgICAgICAgICAnb2Zmc2V0Z3JvdXAgd2hlcmUgYmFycyBvZiB0aGUgc2FtZSBwb3NpdGlvbiBjb29yZGluYXRlIHdpbGwgbGluZSB1cC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBhbGlnbm1lbnRncm91cDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXQgc2V2ZXJhbCB0cmFjZXMgbGlua2VkIHRvIHRoZSBzYW1lIHBvc2l0aW9uIGF4aXMnLFxuICAgICAgICAgICAgJ29yIG1hdGNoaW5nIGF4ZXMgdG8gdGhlIHNhbWUnLFxuICAgICAgICAgICAgJ2FsaWdubWVudGdyb3VwLiBUaGlzIGNvbnRyb2xzIHdoZXRoZXIgYmFycyBjb21wdXRlIHRoZWlyIHBvc2l0aW9uYWwnLFxuICAgICAgICAgICAgJ3JhbmdlIGRlcGVuZGVudGx5IG9yIGluZGVwZW5kZW50bHkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBzZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IHNjYXR0ZXJBdHRycy5zZWxlY3RlZC5tYXJrZXIub3BhY2l0eSxcbiAgICAgICAgICAgIGNvbG9yOiBzY2F0dGVyQXR0cnMuc2VsZWN0ZWQubWFya2VyLmNvbG9yLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dGZvbnQ6IHNjYXR0ZXJBdHRycy5zZWxlY3RlZC50ZXh0Zm9udCxcbiAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICB9LFxuICAgIHVuc2VsZWN0ZWQ6IHtcbiAgICAgICAgbWFya2VyOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZC5tYXJrZXIub3BhY2l0eSxcbiAgICAgICAgICAgIGNvbG9yOiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZC5tYXJrZXIuY29sb3IsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgICAgICB9LFxuICAgICAgICB0ZXh0Zm9udDogc2NhdHRlckF0dHJzLnVuc2VsZWN0ZWQudGV4dGZvbnQsXG4gICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnXG4gICAgfSxcblxuICAgIHI6IHNjYXR0ZXJBdHRycy5yLFxuICAgIHQ6IHNjYXR0ZXJBdHRycy50LFxuXG4gICAgX2RlcHJlY2F0ZWQ6IHtcbiAgICAgICAgYmFyZGlyOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ3YnLCAnaCddLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZW5hbWVkIHRvIGBvcmllbnRhdGlvbmAuJ1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyBwYWRkaW5nIGluIHBpeGVscyBhcm91bmQgdGV4dFxuICAgIFRFWFRQQUQ6IDMsXG4gICAgLy8gJ3ZhbHVlJyBhbmQgJ2xhYmVsJyBhcmUgbm90IHJlYWxseSBuZWNlc3NhcnkgZm9yIGJhciB0cmFjZXMsXG4gICAgLy8gYnV0IHRoZXkgd2VyZSBtYWRlIGF2YWlsYWJsZSB0byBgdGV4dHRlbXBsYXRlYCAobWF5YmUgYnkgYWNjaWRlbnQpXG4gICAgLy8gdmlhIHRva2VucyBgJXt2YWx1ZX1gIGFuZCBgJXtsYWJlbH1gIHN0YXJ0aW5nIGluIDEuNTAuMCxcbiAgICAvLyBzbyBsZXQncyBpbmNsdWRlIHRoZW0gaW4gdGhlIGV2ZW50IGRhdGEgYWxzby5cbiAgICBldmVudERhdGFLZXlzOiBbJ3ZhbHVlJywgJ2xhYmVsJ11cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xuXG5mdW5jdGlvbiBzdHlsZShnZCwgY2QsIHNlbCkge1xuICAgIHZhciBzID0gc2VsID8gc2VsIDogZDMuc2VsZWN0KGdkKS5zZWxlY3RBbGwoJ2cudHJhY2UuYm94ZXMnKTtcblxuICAgIHMuc3R5bGUoJ29wYWNpdHknLCBmdW5jdGlvbihkKSB7IHJldHVybiBkWzBdLnRyYWNlLm9wYWNpdHk7IH0pO1xuXG4gICAgcy5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIGVsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgdHJhY2UgPSBkWzBdLnRyYWNlO1xuICAgICAgICB2YXIgbGluZVdpZHRoID0gdHJhY2UubGluZS53aWR0aDtcblxuICAgICAgICBmdW5jdGlvbiBzdHlsZUJveChib3hTZWwsIGxpbmVXaWR0aCwgbGluZUNvbG9yLCBmaWxsQ29sb3IpIHtcbiAgICAgICAgICAgIGJveFNlbC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgbGluZVdpZHRoICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuY2FsbChDb2xvci5zdHJva2UsIGxpbmVDb2xvcilcbiAgICAgICAgICAgICAgICAuY2FsbChDb2xvci5maWxsLCBmaWxsQ29sb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFsbEJveGVzID0gZWwuc2VsZWN0QWxsKCdwYXRoLmJveCcpO1xuXG4gICAgICAgIGlmKHRyYWNlLnR5cGUgPT09ICdjYW5kbGVzdGljaycpIHtcbiAgICAgICAgICAgIGFsbEJveGVzLmVhY2goZnVuY3Rpb24oYm94RGF0YSkge1xuICAgICAgICAgICAgICAgIGlmKGJveERhdGEuZW1wdHkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHZhciB0aGlzQm94ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSB0cmFjZVtib3hEYXRhLmRpcl07IC8vIGRpciA9ICdpbmNyZWFzaW5nJyBvciAnZGVjcmVhc2luZydcbiAgICAgICAgICAgICAgICBzdHlsZUJveCh0aGlzQm94LCBjb250YWluZXIubGluZS53aWR0aCwgY29udGFpbmVyLmxpbmUuY29sb3IsIGNvbnRhaW5lci5maWxsY29sb3IpO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGN1c3RvbSBzZWxlY3Rpb24gc3R5bGUgZm9yIGNhbmRsZXN0aWNrc1xuICAgICAgICAgICAgICAgIHRoaXNCb3guc3R5bGUoJ29wYWNpdHknLCB0cmFjZS5zZWxlY3RlZHBvaW50cyAmJiAhYm94RGF0YS5zZWxlY3RlZCA/IDAuMyA6IDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZUJveChhbGxCb3hlcywgbGluZVdpZHRoLCB0cmFjZS5saW5lLmNvbG9yLCB0cmFjZS5maWxsY29sb3IpO1xuICAgICAgICAgICAgZWwuc2VsZWN0QWxsKCdwYXRoLm1lYW4nKVxuICAgICAgICAgICAgICAgIC5zdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICdzdHJva2UtZGFzaGFycmF5JzogKDIgKiBsaW5lV2lkdGgpICsgJ3B4LCcgKyBsaW5lV2lkdGggKyAncHgnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2FsbChDb2xvci5zdHJva2UsIHRyYWNlLmxpbmUuY29sb3IpO1xuXG4gICAgICAgICAgICB2YXIgcHRzID0gZWwuc2VsZWN0QWxsKCdwYXRoLnBvaW50Jyk7XG4gICAgICAgICAgICBEcmF3aW5nLnBvaW50U3R5bGUocHRzLCB0cmFjZSwgZ2QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlT25TZWxlY3QoZ2QsIGNkLCBzZWwpIHtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgcHRzID0gc2VsLnNlbGVjdEFsbCgncGF0aC5wb2ludCcpO1xuXG4gICAgaWYodHJhY2Uuc2VsZWN0ZWRwb2ludHMpIHtcbiAgICAgICAgRHJhd2luZy5zZWxlY3RlZFBvaW50U3R5bGUocHRzLCB0cmFjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgRHJhd2luZy5wb2ludFN0eWxlKHB0cywgdHJhY2UsIGdkKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBzdHlsZU9uU2VsZWN0OiBzdHlsZU9uU2VsZWN0XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuZXh0ZW5kRmxhdDtcbnZhciBPSExDYXR0cnMgPSByZXF1aXJlKCcuLi9vaGxjL2F0dHJpYnV0ZXMnKTtcbnZhciBib3hBdHRycyA9IHJlcXVpcmUoJy4uL2JveC9hdHRyaWJ1dGVzJyk7XG5cbmZ1bmN0aW9uIGRpcmVjdGlvbkF0dHJzKGxpbmVDb2xvckRlZmF1bHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgICBjb2xvcjogZXh0ZW5kRmxhdCh7fSwgYm94QXR0cnMubGluZS5jb2xvciwge2RmbHQ6IGxpbmVDb2xvckRlZmF1bHR9KSxcbiAgICAgICAgICAgIHdpZHRoOiBib3hBdHRycy5saW5lLndpZHRoLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICAgICAgfSxcblxuICAgICAgICBmaWxsY29sb3I6IGJveEF0dHJzLmZpbGxjb2xvcixcbiAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB4OiBPSExDYXR0cnMueCxcbiAgICBvcGVuOiBPSExDYXR0cnMub3BlbixcbiAgICBoaWdoOiBPSExDYXR0cnMuaGlnaCxcbiAgICBsb3c6IE9ITENhdHRycy5sb3csXG4gICAgY2xvc2U6IE9ITENhdHRycy5jbG9zZSxcblxuICAgIGxpbmU6IHtcbiAgICAgICAgd2lkdGg6IGV4dGVuZEZsYXQoe30sIGJveEF0dHJzLmxpbmUud2lkdGgsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgYm94QXR0cnMubGluZS53aWR0aC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAnTm90ZSB0aGF0IHRoaXMgc3R5bGUgc2V0dGluZyBjYW4gYWxzbyBiZSBzZXQgcGVyJyxcbiAgICAgICAgICAgICAgICAnZGlyZWN0aW9uIHZpYSBgaW5jcmVhc2luZy5saW5lLndpZHRoYCBhbmQnLFxuICAgICAgICAgICAgICAgICdgZGVjcmVhc2luZy5saW5lLndpZHRoYC4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICB9LFxuXG4gICAgaW5jcmVhc2luZzogZGlyZWN0aW9uQXR0cnMoT0hMQ2F0dHJzLmluY3JlYXNpbmcubGluZS5jb2xvci5kZmx0KSxcblxuICAgIGRlY3JlYXNpbmc6IGRpcmVjdGlvbkF0dHJzKE9ITENhdHRycy5kZWNyZWFzaW5nLmxpbmUuY29sb3IuZGZsdCksXG5cbiAgICB0ZXh0OiBPSExDYXR0cnMudGV4dCxcbiAgICBob3ZlcnRleHQ6IE9ITENhdHRycy5ob3ZlcnRleHQsXG4gICAgd2hpc2tlcndpZHRoOiBleHRlbmRGbGF0KHt9LCBib3hBdHRycy53aGlza2Vyd2lkdGgsIHsgZGZsdDogMCB9KSxcblxuICAgIGhvdmVybGFiZWw6IE9ITENhdHRycy5ob3ZlcmxhYmVsLFxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xuXG52YXIgY2FsY0NvbW1vbiA9IHJlcXVpcmUoJy4uL29obGMvY2FsYycpLmNhbGNDb21tb247XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZ2QsIHRyYWNlKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgeGEgPSBBeGVzLmdldEZyb21JZChnZCwgdHJhY2UueGF4aXMpO1xuICAgIHZhciB5YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS55YXhpcyk7XG5cbiAgICB2YXIgeCA9IHhhLm1ha2VDYWxjZGF0YSh0cmFjZSwgJ3gnKTtcblxuICAgIHZhciBjZCA9IGNhbGNDb21tb24oZ2QsIHRyYWNlLCB4LCB5YSwgcHRGdW5jKTtcblxuICAgIGlmKGNkLmxlbmd0aCkge1xuICAgICAgICBMaWIuZXh0ZW5kRmxhdChjZFswXS50LCB7XG4gICAgICAgICAgICBudW06IGZ1bGxMYXlvdXQuX251bUJveGVzLFxuICAgICAgICAgICAgZFBvczogTGliLmRpc3RpbmN0VmFscyh4KS5taW5EaWZmIC8gMixcbiAgICAgICAgICAgIHBvc0xldHRlcjogJ3gnLFxuICAgICAgICAgICAgdmFsTGV0dGVyOiAneScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bGxMYXlvdXQuX251bUJveGVzKys7XG4gICAgICAgIHJldHVybiBjZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW3t0OiB7ZW1wdHk6IHRydWV9fV07XG4gICAgfVxufTtcblxuZnVuY3Rpb24gcHRGdW5jKG8sIGgsIGwsIGMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtaW46IGwsXG4gICAgICAgIHExOiBNYXRoLm1pbihvLCBjKSxcbiAgICAgICAgbWVkOiBjLFxuICAgICAgICBxMzogTWF0aC5tYXgobywgYyksXG4gICAgICAgIG1heDogaCxcbiAgICB9O1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBoYW5kbGVPSExDID0gcmVxdWlyZSgnLi4vb2hsYy9vaGxjX2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gaGFuZGxlT0hMQyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQpO1xuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29lcmNlKCdsaW5lLndpZHRoJyk7XG5cbiAgICBoYW5kbGVEaXJlY3Rpb24odHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgJ2luY3JlYXNpbmcnKTtcbiAgICBoYW5kbGVEaXJlY3Rpb24odHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgJ2RlY3JlYXNpbmcnKTtcblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCd3aGlza2Vyd2lkdGgnKTtcblxuICAgIGxheW91dC5fcmVxdWVzdFJhbmdlc2xpZGVyW3RyYWNlT3V0LnhheGlzXSA9IHRydWU7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVEaXJlY3Rpb24odHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgZGlyZWN0aW9uKSB7XG4gICAgdmFyIGxpbmVDb2xvciA9IGNvZXJjZShkaXJlY3Rpb24gKyAnLmxpbmUuY29sb3InKTtcbiAgICBjb2VyY2UoZGlyZWN0aW9uICsgJy5saW5lLndpZHRoJywgdHJhY2VPdXQubGluZS53aWR0aCk7XG4gICAgY29lcmNlKGRpcmVjdGlvbiArICcuZmlsbGNvbG9yJywgQ29sb3IuYWRkT3BhY2l0eShsaW5lQ29sb3IsIDAuNSkpO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdjYW5kbGVzdGljaycsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbicpLFxuICAgIGNhdGVnb3JpZXM6IFsnY2FydGVzaWFuJywgJ3N2ZycsICdzaG93TGVnZW5kJywgJ2NhbmRsZXN0aWNrJywgJ2JveExheW91dCddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgY2FuZGxlc3RpY2sgaXMgYSBzdHlsZSBvZiBmaW5hbmNpYWwgY2hhcnQgZGVzY3JpYmluZycsXG4gICAgICAgICAgICAnb3BlbiwgaGlnaCwgbG93IGFuZCBjbG9zZSBmb3IgYSBnaXZlbiBgeGAgY29vcmRpbmF0ZSAobW9zdCBsaWtlbHkgdGltZSkuJyxcblxuICAgICAgICAgICAgJ1RoZSBib3hlcyByZXByZXNlbnQgdGhlIHNwcmVhZCBiZXR3ZWVuIHRoZSBgb3BlbmAgYW5kIGBjbG9zZWAgdmFsdWVzIGFuZCcsXG4gICAgICAgICAgICAndGhlIGxpbmVzIHJlcHJlc2VudCB0aGUgc3ByZWFkIGJldHdlZW4gdGhlIGBsb3dgIGFuZCBgaGlnaGAgdmFsdWVzJyxcblxuICAgICAgICAgICAgJ1NhbXBsZSBwb2ludHMgd2hlcmUgdGhlIGNsb3NlIHZhbHVlIGlzIGhpZ2hlciAobG93ZXIpIHRoZW4gdGhlIG9wZW4nLFxuICAgICAgICAgICAgJ3ZhbHVlIGFyZSBjYWxsZWQgaW5jcmVhc2luZyAoZGVjcmVhc2luZykuJyxcblxuICAgICAgICAgICAgJ0J5IGRlZmF1bHQsIGluY3JlYXNpbmcgY2FuZGxlcyBhcmUgZHJhd24gaW4gZ3JlZW4gd2hlcmVhcycsXG4gICAgICAgICAgICAnZGVjcmVhc2luZyBhcmUgZHJhd24gaW4gcmVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgbGF5b3V0QXR0cmlidXRlczogcmVxdWlyZSgnLi4vYm94L2xheW91dF9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5TGF5b3V0RGVmYXVsdHM6IHJlcXVpcmUoJy4uL2JveC9sYXlvdXRfZGVmYXVsdHMnKS5zdXBwbHlMYXlvdXREZWZhdWx0cyxcbiAgICBjcm9zc1RyYWNlQ2FsYzogcmVxdWlyZSgnLi4vYm94L2Nyb3NzX3RyYWNlX2NhbGMnKS5jcm9zc1RyYWNlQ2FsYyxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4uL2JveC9wbG90JykucGxvdCxcbiAgICBsYXllck5hbWU6ICdib3hsYXllcicsXG4gICAgc3R5bGU6IHJlcXVpcmUoJy4uL2JveC9zdHlsZScpLnN0eWxlLFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuLi9vaGxjL2hvdmVyJykuaG92ZXJQb2ludHMsXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuLi9vaGxjL3NlbGVjdCcpXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==