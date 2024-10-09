(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_indicator_js"],{

/***/ "./node_modules/plotly.js/lib/indicator.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/indicator.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/indicator */ "./node_modules/plotly.js/src/traces/indicator/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/indicator/attributes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/indicator/attributes.js ***!
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



var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var extendDeep = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendDeep;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;
var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var axesAttrs = __webpack_require__(/*! ../../plots/cartesian/layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");
var templatedArray = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js").templatedArray;
var delta = __webpack_require__(/*! ../../constants/delta.js */ "./node_modules/plotly.js/src/constants/delta.js");
var FORMAT_LINK = __webpack_require__(/*! ../../constants/docs */ "./node_modules/plotly.js/src/constants/docs.js").FORMAT_LINK;

var textFontAttrs = fontAttrs({
    editType: 'plot',
    colorEditType: 'plot'
});

var gaugeBarAttrs = {
    color: {
        valType: 'color',
        editType: 'plot',
        role: 'info',
        description: [
            'Sets the background color of the arc.'
        ].join(' ')
    },
    line: {
        color: {
            valType: 'color',
            role: 'info',
            dflt: colorAttrs.defaultLine,
            editType: 'plot',
            description: [
                'Sets the color of the line enclosing each sector.'
            ].join(' ')
        },
        width: {
            valType: 'number',
            role: 'info',
            min: 0,
            dflt: 0,
            editType: 'plot',
            description: [
                'Sets the width (in px) of the line enclosing each sector.'
            ].join(' ')
        },
        editType: 'calc'
    },
    thickness: {
        valType: 'number',
        role: 'info',
        min: 0,
        max: 1,
        dflt: 1,
        editType: 'plot',
        description: [
            'Sets the thickness of the bar as a fraction of the total thickness of the gauge.'
        ].join(' ')
    },
    editType: 'calc'
};

var rangeAttr = {
    valType: 'info_array',
    role: 'info',
    items: [
            {valType: 'number', editType: 'plot'},
            {valType: 'number', editType: 'plot'}
    ],
    editType: 'plot',
    description: [
        'Sets the range of this axis.'
        // TODO: add support for other axis type
        // 'If the axis `type` is *log*, then you must take the log of your',
        // 'desired range (e.g. to set the range from 1 to 100,',
        // 'set the range from 0 to 2).',
        // 'If the axis `type` is *date*, it should be date strings,',
        // 'like date data, though Date objects and unix milliseconds',
        // 'will be accepted and converted to strings.',
        // 'If the axis `type` is *category*, it should be numbers,',
        // 'using the scale where each category is assigned a serial',
        // 'number from zero in the order it appears.'
    ].join(' ')
};

var stepsAttrs = templatedArray('step', extendDeep({}, gaugeBarAttrs, {
    range: rangeAttr
}));

module.exports = {
    mode: {
        valType: 'flaglist',
        editType: 'calc',
        role: 'info',
        flags: ['number', 'delta', 'gauge'],
        dflt: 'number',
        description: [
            'Determines how the value is displayed on the graph.',
            '`number` displays the value numerically in text.',
            '`delta` displays the difference to a reference value in text.',
            'Finally, `gauge` displays the value graphically on an axis.',
        ].join(' ')
    },
    value: {
        valType: 'number',
        editType: 'calc',
        role: 'info',
        anim: true,
        description: [
            'Sets the number to be displayed.'
        ].join(' ')
    },
    align: {
        valType: 'enumerated',
        values: ['left', 'center', 'right'],
        role: 'info',
        editType: 'plot',
        description: [
            'Sets the horizontal alignment of the `text` within the box.',
            'Note that this attribute has no effect if an angular gauge is displayed:',
            'in this case, it is always centered'
        ].join(' ')
    },
    // position
    domain: domainAttrs({name: 'indicator', trace: true, editType: 'calc'}),

    title: {
        text: {
            valType: 'string',
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the title of this indicator.'
            ].join(' ')
        },
        align: {
            valType: 'enumerated',
            values: ['left', 'center', 'right'],
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the horizontal alignment of the title.',
                'It defaults to `center` except for bullet charts',
                'for which it defaults to right.'
            ].join(' ')
        },
        font: extendFlat({}, textFontAttrs, {
            description: [
                'Set the font used to display the title'
            ].join(' ')
        }),
        editType: 'plot'
    },
    number: {
        valueformat: {
            valType: 'string',
            dflt: '',
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the value formatting rule using d3 formatting mini-language',
                'which is similar to those of Python. See',
                FORMAT_LINK
            ].join(' ')
        },
        font: extendFlat({}, textFontAttrs, {
            description: [
                'Set the font used to display main number'
            ].join(' ')
        }),
        prefix: {
            valType: 'string',
            dflt: '',
            role: 'info',
            editType: 'plot',
            description: [
                'Sets a prefix appearing before the number.'
            ].join(' ')
        },
        suffix: {
            valType: 'string',
            dflt: '',
            role: 'info',
            editType: 'plot',
            description: [
                'Sets a suffix appearing next to the number.'
            ].join(' ')
        },
        editType: 'plot'
    },
    delta: {
        reference: {
            valType: 'number',
            role: 'info',
            editType: 'calc',
            description: [
                'Sets the reference value to compute the delta.',
                'By default, it is set to the current value.'
            ].join(' ')
        },
        position: {
            valType: 'enumerated',
            values: ['top', 'bottom', 'left', 'right'],
            role: 'info',
            dflt: 'bottom',
            editType: 'plot',
            description: [
                'Sets the position of delta with respect to the number.'
            ].join(' ')
        },
        relative: {
            valType: 'boolean',
            editType: 'plot',
            role: 'info',
            dflt: false,
            description: [
                'Show relative change'
            ].join(' ')
        },
        valueformat: {
            valType: 'string',
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the value formatting rule using d3 formatting mini-language',
                'which is similar to those of Python. See',
                FORMAT_LINK
            ].join(' ')
        },
        increasing: {
            symbol: {
                valType: 'string',
                role: 'info',
                dflt: delta.INCREASING.SYMBOL,
                editType: 'plot',
                description: [
                    'Sets the symbol to display for increasing value'
                ].join(' ')
            },
            color: {
                valType: 'color',
                role: 'info',
                dflt: delta.INCREASING.COLOR,
                editType: 'plot',
                description: [
                    'Sets the color for increasing value.'
                ].join(' ')
            },
            // TODO: add attribute to show sign
            editType: 'plot'
        },
        decreasing: {
            symbol: {
                valType: 'string',
                role: 'info',
                dflt: delta.DECREASING.SYMBOL,
                editType: 'plot',
                description: [
                    'Sets the symbol to display for increasing value'
                ].join(' ')
            },
            color: {
                valType: 'color',
                role: 'info',
                dflt: delta.DECREASING.COLOR,
                editType: 'plot',
                description: [
                    'Sets the color for increasing value.'
                ].join(' ')
            },
            // TODO: add attribute to hide sign
            editType: 'plot'
        },
        font: extendFlat({}, textFontAttrs, {
            description: [
                'Set the font used to display the delta'
            ].join(' ')
        }),
        editType: 'calc'
    },
    gauge: {
        shape: {
            valType: 'enumerated',
            editType: 'plot',
            role: 'info',
            dflt: 'angular',
            values: ['angular', 'bullet'],
            description: [
                'Set the shape of the gauge'
            ].join(' ')
        },
        bar: extendDeep({}, gaugeBarAttrs, {
            color: {dflt: 'green'},
            description: [
                'Set the appearance of the gauge\'s value'
            ].join(' ')
        }),
        // Background of the gauge
        bgcolor: {
            valType: 'color',
            role: 'info',
            editType: 'plot',
            description: 'Sets the gauge background color.'
        },
        bordercolor: {
            valType: 'color',
            dflt: colorAttrs.defaultLine,
            role: 'info',
            editType: 'plot',
            description: 'Sets the color of the border enclosing the gauge.'
        },
        borderwidth: {
            valType: 'number',
            min: 0,
            dflt: 1,
            role: 'info',
            editType: 'plot',
            description: 'Sets the width (in px) of the border enclosing the gauge.'
        },
        axis: overrideAll({
            range: rangeAttr,
            visible: extendFlat({}, axesAttrs.visible, {
                dflt: true
            }),
            // tick and title properties named and function exactly as in axes
            tickmode: axesAttrs.tickmode,
            nticks: axesAttrs.nticks,
            tick0: axesAttrs.tick0,
            dtick: axesAttrs.dtick,
            tickvals: axesAttrs.tickvals,
            ticktext: axesAttrs.ticktext,
            ticks: extendFlat({}, axesAttrs.ticks, {dflt: 'outside'}),
            ticklen: axesAttrs.ticklen,
            tickwidth: axesAttrs.tickwidth,
            tickcolor: axesAttrs.tickcolor,
            showticklabels: axesAttrs.showticklabels,
            tickfont: fontAttrs({
                description: 'Sets the color bar\'s tick label font'
            }),
            tickangle: axesAttrs.tickangle,
            tickformat: axesAttrs.tickformat,
            tickformatstops: axesAttrs.tickformatstops,
            tickprefix: axesAttrs.tickprefix,
            showtickprefix: axesAttrs.showtickprefix,
            ticksuffix: axesAttrs.ticksuffix,
            showticksuffix: axesAttrs.showticksuffix,
            separatethousands: axesAttrs.separatethousands,
            exponentformat: axesAttrs.exponentformat,
            showexponent: axesAttrs.showexponent,
            editType: 'plot'
        }, 'plot'),
        // Steps (or ranges) and thresholds
        steps: stepsAttrs,
        threshold: {
            line: {
                color: extendFlat({}, gaugeBarAttrs.line.color, {
                    description: [
                        'Sets the color of the threshold line.'
                    ].join(' ')
                }),
                width: extendFlat({}, gaugeBarAttrs.line.width, {
                    dflt: 1,
                    description: [
                        'Sets the width (in px) of the threshold line.'
                    ].join(' ')
                }),
                editType: 'plot'
            },
            thickness: extendFlat({}, gaugeBarAttrs.thickness, {
                dflt: 0.85,
                description: [
                    'Sets the thickness of the threshold line as a fraction of the thickness of the gauge.'
                ].join(' ')
            }),
            value: {
                valType: 'number',
                editType: 'calc',
                dflt: false,
                role: 'info',
                description: [
                    'Sets a treshold value drawn as a line.'
                ].join(' ')
            },
            editType: 'plot'
        },
        description: 'The gauge of the Indicator plot.',
        editType: 'plot'
        // TODO: in future version, add marker: (bar|needle)
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/indicator/base_plot.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/indicator/base_plot.js ***!
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



var plots = __webpack_require__(/*! ../../plots/plots */ "./node_modules/plotly.js/src/plots/plots.js");

exports.name = 'indicator';

exports.plot = function(gd, traces, transitionOpts, makeOnCompleteCallback) {
    plots.plotBasePlot(exports.name, gd, traces, transitionOpts, makeOnCompleteCallback);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    plots.cleanBasePlot(exports.name, newFullData, newFullLayout, oldFullData, oldFullLayout);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/indicator/calc.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/indicator/calc.js ***!
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



// var Lib = require('../../lib');

function calc(gd, trace) {
    var cd = [];

    var lastReading = trace.value;
    if(!(typeof trace._lastValue === 'number')) trace._lastValue = trace.value;
    var secondLastReading = trace._lastValue;
    var deltaRef = secondLastReading;
    if(trace._hasDelta && typeof trace.delta.reference === 'number') {
        deltaRef = trace.delta.reference;
    }
    cd[0] = {
        y: lastReading,
        lastY: secondLastReading,

        delta: lastReading - deltaRef,
        relativeDelta: (lastReading - deltaRef) / deltaRef,
    };
    return cd;
}

module.exports = {
    calc: calc
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/indicator/constants.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/indicator/constants.js ***!
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
    // Defaults for delta
    defaultNumberFontSize: 80,
    bulletNumberDomainSize: 0.25,
    bulletPadding: 0.025,
    innerRadius: 0.75,
    valueThickness: 0.5, // thickness of value bars relative to full thickness,
    titlePadding: 5,
    horizontalPadding: 10
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/indicator/defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/indicator/defaults.js ***!
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
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/indicator/attributes.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;
var Template = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");
var handleArrayContainerDefaults = __webpack_require__(/*! ../../plots/array_container_defaults */ "./node_modules/plotly.js/src/plots/array_container_defaults.js");
var cn = __webpack_require__(/*! ./constants.js */ "./node_modules/plotly.js/src/traces/indicator/constants.js");

var handleTickValueDefaults = __webpack_require__(/*! ../../plots/cartesian/tick_value_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_value_defaults.js");
var handleTickMarkDefaults = __webpack_require__(/*! ../../plots/cartesian/tick_mark_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_mark_defaults.js");
var handleTickLabelDefaults = __webpack_require__(/*! ../../plots/cartesian/tick_label_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_label_defaults.js");

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    handleDomainDefaults(traceOut, layout, coerce);

    // Mode
    coerce('mode');
    traceOut._hasNumber = traceOut.mode.indexOf('number') !== -1;
    traceOut._hasDelta = traceOut.mode.indexOf('delta') !== -1;
    traceOut._hasGauge = traceOut.mode.indexOf('gauge') !== -1;

    var value = coerce('value');
    traceOut._range = [0, (typeof value === 'number' ? 1.5 * value : 1)];

    // Number attributes
    var auto = new Array(2);
    var bignumberFontSize;
    if(traceOut._hasNumber) {
        coerce('number.valueformat');
        coerce('number.font.color', layout.font.color);
        coerce('number.font.family', layout.font.family);
        coerce('number.font.size');
        if(traceOut.number.font.size === undefined) {
            traceOut.number.font.size = cn.defaultNumberFontSize;
            auto[0] = true;
        }
        coerce('number.prefix');
        coerce('number.suffix');
        bignumberFontSize = traceOut.number.font.size;
    }

    // delta attributes
    var deltaFontSize;
    if(traceOut._hasDelta) {
        coerce('delta.font.color', layout.font.color);
        coerce('delta.font.family', layout.font.family);
        coerce('delta.font.size');
        if(traceOut.delta.font.size === undefined) {
            traceOut.delta.font.size = (traceOut._hasNumber ? 0.5 : 1) * (bignumberFontSize || cn.defaultNumberFontSize);
            auto[1] = true;
        }
        coerce('delta.reference', traceOut.value);
        coerce('delta.relative');
        coerce('delta.valueformat', traceOut.delta.relative ? '2%' : '');
        coerce('delta.increasing.symbol');
        coerce('delta.increasing.color');
        coerce('delta.decreasing.symbol');
        coerce('delta.decreasing.color');
        coerce('delta.position');
        deltaFontSize = traceOut.delta.font.size;
    }
    traceOut._scaleNumbers = (!traceOut._hasNumber || auto[0]) && (!traceOut._hasDelta || auto[1]) || false;

    // Title attributes
    coerce('title.font.color', layout.font.color);
    coerce('title.font.family', layout.font.family);
    coerce('title.font.size', 0.25 * (bignumberFontSize || deltaFontSize || cn.defaultNumberFontSize));
    coerce('title.text');

    // Gauge attributes
    var gaugeIn, gaugeOut, axisIn, axisOut;
    function coerceGauge(attr, dflt) {
        return Lib.coerce(gaugeIn, gaugeOut, attributes.gauge, attr, dflt);
    }
    function coerceGaugeAxis(attr, dflt) {
        return Lib.coerce(axisIn, axisOut, attributes.gauge.axis, attr, dflt);
    }

    if(traceOut._hasGauge) {
        gaugeIn = traceIn.gauge;
        if(!gaugeIn) gaugeIn = {};
        gaugeOut = Template.newContainer(traceOut, 'gauge');
        coerceGauge('shape');
        var isBullet = traceOut._isBullet = traceOut.gauge.shape === 'bullet';
        if(!isBullet) {
            coerce('title.align', 'center');
        }
        var isAngular = traceOut._isAngular = traceOut.gauge.shape === 'angular';
        if(!isAngular) {
            coerce('align', 'center');
        }

        // gauge background
        coerceGauge('bgcolor', layout.paper_bgcolor);
        coerceGauge('borderwidth');
        coerceGauge('bordercolor');

        // gauge bar indicator
        coerceGauge('bar.color');
        coerceGauge('bar.line.color');
        coerceGauge('bar.line.width');
        var defaultBarThickness = cn.valueThickness * (traceOut.gauge.shape === 'bullet' ? 0.5 : 1);
        coerceGauge('bar.thickness', defaultBarThickness);

        // Gauge steps
        handleArrayContainerDefaults(gaugeIn, gaugeOut, {
            name: 'steps',
            handleItemDefaults: stepDefaults
        });

        // Gauge threshold
        coerceGauge('threshold.value');
        coerceGauge('threshold.thickness');
        coerceGauge('threshold.line.width');
        coerceGauge('threshold.line.color');

        // Gauge axis
        axisIn = {};
        if(gaugeIn) axisIn = gaugeIn.axis || {};
        axisOut = Template.newContainer(gaugeOut, 'axis');
        coerceGaugeAxis('visible');
        traceOut._range = coerceGaugeAxis('range', traceOut._range);

        var opts = {outerTicks: true};
        handleTickValueDefaults(axisIn, axisOut, coerceGaugeAxis, 'linear');
        handleTickLabelDefaults(axisIn, axisOut, coerceGaugeAxis, 'linear', opts);
        handleTickMarkDefaults(axisIn, axisOut, coerceGaugeAxis, opts);
    } else {
        coerce('title.align', 'center');
        coerce('align', 'center');
        traceOut._isAngular = traceOut._isBullet = false;
    }

    // disable 1D transforms
    traceOut._length = null;
}

function stepDefaults(stepIn, stepOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(stepIn, stepOut, attributes.gauge.steps, attr, dflt);
    }

    coerce('color');
    coerce('line.color');
    coerce('line.width');
    coerce('range');
    coerce('thickness');
}

module.exports = {
    supplyDefaults: supplyDefaults
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/indicator/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/indicator/index.js ***!
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
    moduleType: 'trace',
    name: 'indicator',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/indicator/base_plot.js"),
    categories: ['svg', 'noOpacity', 'noHover'],
    animatable: true,

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/indicator/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/indicator/defaults.js").supplyDefaults,

    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/indicator/calc.js").calc,

    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/indicator/plot.js"),

    meta: {
        description: [
            'An indicator is used to visualize a single `value` along with some',
            'contextual information such as `steps` or a `threshold`, using a',
            'combination of three visual elements: a number, a delta, and/or a gauge.',
            'Deltas are taken with respect to a `reference`.',
            'Gauges can be either angular or bullet (aka linear) gauges.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/indicator/plot.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/indicator/plot.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var rad2deg = Lib.rad2deg;
var MID_SHIFT = __webpack_require__(/*! ../../constants/alignment */ "./node_modules/plotly.js/src/constants/alignment.js").MID_SHIFT;
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var cn = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/indicator/constants.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");

var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var handleAxisDefaults = __webpack_require__(/*! ../../plots/cartesian/axis_defaults */ "./node_modules/plotly.js/src/plots/cartesian/axis_defaults.js");
var handleAxisPositionDefaults = __webpack_require__(/*! ../../plots/cartesian/position_defaults */ "./node_modules/plotly.js/src/plots/cartesian/position_defaults.js");
var axisLayoutAttrs = __webpack_require__(/*! ../../plots/cartesian/layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");

var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var anchor = {
    'left': 'start',
    'center': 'middle',
    'right': 'end'
};
var position = {
    'left': 0,
    'center': 0.5,
    'right': 1
};

var SI_PREFIX = /[yzafpnµmkMGTPEZY]/;

function hasTransition(transitionOpts) {
    // If transition config is provided, then it is only a partial replot and traces not
    // updated are removed.
    return transitionOpts && transitionOpts.duration > 0;
}

module.exports = function plot(gd, cdModule, transitionOpts, makeOnCompleteCallback) {
    var fullLayout = gd._fullLayout;
    var onComplete;

    if(hasTransition(transitionOpts)) {
        if(makeOnCompleteCallback) {
            // If it was passed a callback to register completion, make a callback. If
            // this is created, then it must be executed on completion, otherwise the
            // pos-transition redraw will not execute:
            onComplete = makeOnCompleteCallback();
        }
    }

    Lib.makeTraceGroups(fullLayout._indicatorlayer, cdModule, 'trace').each(function(cd) {
        var cd0 = cd[0];
        var trace = cd0.trace;

        var plotGroup = d3.select(this);

        // Elements in trace
        var hasGauge = trace._hasGauge;
        var isAngular = trace._isAngular;
        var isBullet = trace._isBullet;

        // Domain size
        var domain = trace.domain;
        var size = {
            w: fullLayout._size.w * (domain.x[1] - domain.x[0]),
            h: fullLayout._size.h * (domain.y[1] - domain.y[0]),
            l: fullLayout._size.l + fullLayout._size.w * domain.x[0],
            r: fullLayout._size.r + fullLayout._size.w * (1 - domain.x[1]),
            t: fullLayout._size.t + fullLayout._size.h * (1 - domain.y[1]),
            b: fullLayout._size.b + fullLayout._size.h * (domain.y[0])
        };
        var centerX = size.l + size.w / 2;
        var centerY = size.t + size.h / 2;

        // Angular gauge size
        var radius = Math.min(size.w / 2, size.h); // fill domain
        var innerRadius = cn.innerRadius * radius;

        // Position numbers based on mode and set the scaling logic
        var numbersX, numbersY, numbersScaler;
        var numbersAlign = trace.align || 'center';

        numbersY = centerY;
        if(!hasGauge) {
            numbersX = size.l + position[numbersAlign] * size.w;
            numbersScaler = function(el) {
                return fitTextInsideBox(el, size.w, size.h);
            };
        } else {
            if(isAngular) {
                numbersX = centerX;
                numbersY = centerY + radius / 2;
                numbersScaler = function(el) {
                    return fitTextInsideCircle(el, 0.9 * innerRadius);
                };
            }
            if(isBullet) {
                var padding = cn.bulletPadding;
                var p = (1 - cn.bulletNumberDomainSize) + padding;
                numbersX = size.l + (p + (1 - p) * position[numbersAlign]) * size.w;
                numbersScaler = function(el) {
                    return fitTextInsideBox(el, (cn.bulletNumberDomainSize - padding) * size.w, size.h);
                };
            }
        }

        // Draw numbers
        drawNumbers(gd, plotGroup, cd, {
            numbersX: numbersX,
            numbersY: numbersY,
            numbersScaler: numbersScaler,
            transitionOpts: transitionOpts,
            onComplete: onComplete
        });

        // Reexpress our gauge background attributes for drawing
        var gaugeBg, gaugeOutline;
        if(hasGauge) {
            gaugeBg = {
                range: trace.gauge.axis.range,
                color: trace.gauge.bgcolor,
                line: {
                    color: trace.gauge.bordercolor,
                    width: 0
                },
                thickness: 1
            };

            gaugeOutline = {
                range: trace.gauge.axis.range,
                color: 'rgba(0, 0, 0, 0)',
                line: {
                    color: trace.gauge.bordercolor,
                    width: trace.gauge.borderwidth
                },
                thickness: 1
            };
        }

        // Prepare angular gauge layers
        var angularGauge = plotGroup.selectAll('g.angular').data(isAngular ? cd : []);
        angularGauge.exit().remove();
        var angularaxisLayer = plotGroup.selectAll('g.angularaxis').data(isAngular ? cd : []);
        angularaxisLayer.exit().remove();

        if(isAngular) {
            drawAngularGauge(gd, plotGroup, cd, {
                radius: radius,
                innerRadius: innerRadius,

                gauge: angularGauge,
                layer: angularaxisLayer,
                size: size,
                gaugeBg: gaugeBg,
                gaugeOutline: gaugeOutline,
                transitionOpts: transitionOpts,
                onComplete: onComplete
            });
        }

        // Prepare bullet layers
        var bulletGauge = plotGroup.selectAll('g.bullet').data(isBullet ? cd : []);
        bulletGauge.exit().remove();
        var bulletaxisLayer = plotGroup.selectAll('g.bulletaxis').data(isBullet ? cd : []);
        bulletaxisLayer.exit().remove();

        if(isBullet) {
            drawBulletGauge(gd, plotGroup, cd, {
                gauge: bulletGauge,
                layer: bulletaxisLayer,
                size: size,
                gaugeBg: gaugeBg,
                gaugeOutline: gaugeOutline,
                transitionOpts: transitionOpts,
                onComplete: onComplete
            });
        }

        // title
        var title = plotGroup.selectAll('text.title').data(cd);
        title.exit().remove();
        title.enter().append('text').classed('title', true);
        title
            .attr('text-anchor', function() {
                return isBullet ? anchor.right : anchor[trace.title.align];
            })
            .text(trace.title.text)
            .call(Drawing.font, trace.title.font)
            .call(svgTextUtils.convertToTspans, gd);

        // Position title
        title.attr('transform', function() {
            var titleX = size.l + size.w * position[trace.title.align];
            var titleY;
            var titlePadding = cn.titlePadding;
            var titlebBox = Drawing.bBox(title.node());
            if(hasGauge) {
                if(isAngular) {
                    // position above axis ticks/labels
                    if(trace.gauge.axis.visible) {
                        var bBox = Drawing.bBox(angularaxisLayer.node());
                        titleY = (bBox.top - titlePadding) - titlebBox.bottom;
                    } else {
                        titleY = size.t + size.h / 2 - radius / 2 - titlebBox.bottom - titlePadding;
                    }
                }
                if(isBullet) {
                    // position outside domain
                    titleY = numbersY - (titlebBox.top + titlebBox.bottom) / 2;
                    titleX = size.l - cn.bulletPadding * size.w; // Outside domain, on the left
                }
            } else {
                // position above numbers
                titleY = (trace._numbersTop - titlePadding) - titlebBox.bottom;
            }
            return strTranslate(titleX, titleY);
        });
    });
};

function drawBulletGauge(gd, plotGroup, cd, opts) {
    var trace = cd[0].trace;

    var bullet = opts.gauge;
    var axisLayer = opts.layer;
    var gaugeBg = opts.gaugeBg;
    var gaugeOutline = opts.gaugeOutline;
    var size = opts.size;
    var domain = trace.domain;

    var transitionOpts = opts.transitionOpts;
    var onComplete = opts.onComplete;

    // preparing axis
    var ax, vals, transFn, tickSign, shift;

    // Enter bullet, axis
    bullet.enter().append('g').classed('bullet', true);
    bullet.attr('transform', 'translate(' + size.l + ', ' + size.t + ')');

    axisLayer.enter().append('g')
        .classed('bulletaxis', true)
        .classed('crisp', true);
    axisLayer.selectAll('g.' + 'xbulletaxis' + 'tick,path,text').remove();

    // Draw bullet
    var bulletHeight = size.h; // use all vertical domain
    var innerBulletHeight = trace.gauge.bar.thickness * bulletHeight;
    var bulletLeft = domain.x[0];
    var bulletRight = domain.x[0] + (domain.x[1] - domain.x[0]) * ((trace._hasNumber || trace._hasDelta) ? (1 - cn.bulletNumberDomainSize) : 1);

    ax = mockAxis(gd, trace.gauge.axis);
    ax._id = 'xbulletaxis';
    ax.domain = [bulletLeft, bulletRight];
    ax.setScale();

    vals = Axes.calcTicks(ax);
    transFn = Axes.makeTransFn(ax);
    tickSign = Axes.getTickSigns(ax)[2];

    shift = size.t + size.h;
    if(ax.visible) {
        Axes.drawTicks(gd, ax, {
            vals: ax.ticks === 'inside' ? Axes.clipEnds(ax, vals) : vals,
            layer: axisLayer,
            path: Axes.makeTickPath(ax, shift, tickSign),
            transFn: transFn
        });

        Axes.drawLabels(gd, ax, {
            vals: vals,
            layer: axisLayer,
            transFn: transFn,
            labelFns: Axes.makeLabelFns(ax, shift)
        });
    }

    function drawRect(s) {
        s
            .attr('width', function(d) { return Math.max(0, ax.c2p(d.range[1]) - ax.c2p(d.range[0]));})
            .attr('x', function(d) { return ax.c2p(d.range[0]);})
            .attr('y', function(d) { return 0.5 * (1 - d.thickness) * bulletHeight;})
            .attr('height', function(d) { return d.thickness * bulletHeight; });
    }

    // Draw bullet background, steps
    var boxes = [gaugeBg].concat(trace.gauge.steps);
    var bgBullet = bullet.selectAll('g.bg-bullet').data(boxes);
    bgBullet.enter().append('g').classed('bg-bullet', true).append('rect');
    bgBullet.select('rect')
        .call(drawRect)
        .call(styleShape);
    bgBullet.exit().remove();

    // Draw value bar with transitions
    var fgBullet = bullet.selectAll('g.value-bullet').data([trace.gauge.bar]);
    fgBullet.enter().append('g').classed('value-bullet', true).append('rect');
    fgBullet.select('rect')
        .attr('height', innerBulletHeight)
        .attr('y', (bulletHeight - innerBulletHeight) / 2)
        .call(styleShape);
    if(hasTransition(transitionOpts)) {
        fgBullet.select('rect')
            .transition()
            .duration(transitionOpts.duration)
            .ease(transitionOpts.easing)
            .each('end', function() { onComplete && onComplete(); })
            .each('interrupt', function() { onComplete && onComplete(); })
            .attr('width', Math.max(0, ax.c2p(Math.min(trace.gauge.axis.range[1], cd[0].y))));
    } else {
        fgBullet.select('rect')
            .attr('width', typeof cd[0].y === 'number' ?
                Math.max(0, ax.c2p(Math.min(trace.gauge.axis.range[1], cd[0].y))) :
                0);
    }
    fgBullet.exit().remove();

    var data = cd.filter(function() {return trace.gauge.threshold.value;});
    var threshold = bullet.selectAll('g.threshold-bullet').data(data);
    threshold.enter().append('g').classed('threshold-bullet', true).append('line');
    threshold.select('line')
        .attr('x1', ax.c2p(trace.gauge.threshold.value))
        .attr('x2', ax.c2p(trace.gauge.threshold.value))
        .attr('y1', (1 - trace.gauge.threshold.thickness) / 2 * bulletHeight)
        .attr('y2', (1 - (1 - trace.gauge.threshold.thickness) / 2) * bulletHeight)
        .call(Color.stroke, trace.gauge.threshold.line.color)
        .style('stroke-width', trace.gauge.threshold.line.width);
    threshold.exit().remove();

    var bulletOutline = bullet.selectAll('g.gauge-outline').data([gaugeOutline]);
    bulletOutline.enter().append('g').classed('gauge-outline', true).append('rect');
    bulletOutline.select('rect')
        .call(drawRect)
        .call(styleShape);
    bulletOutline.exit().remove();
}

function drawAngularGauge(gd, plotGroup, cd, opts) {
    var trace = cd[0].trace;

    var size = opts.size;
    var radius = opts.radius;
    var innerRadius = opts.innerRadius;
    var gaugeBg = opts.gaugeBg;
    var gaugeOutline = opts.gaugeOutline;
    var gaugePosition = [size.l + size.w / 2, size.t + size.h / 2 + radius / 2];
    var gauge = opts.gauge;
    var axisLayer = opts.layer;

    var transitionOpts = opts.transitionOpts;
    var onComplete = opts.onComplete;

    // circular gauge
    var theta = Math.PI / 2;
    function valueToAngle(v) {
        var min = trace.gauge.axis.range[0];
        var max = trace.gauge.axis.range[1];
        var angle = (v - min) / (max - min) * Math.PI - theta;
        if(angle < -theta) return -theta;
        if(angle > theta) return theta;
        return angle;
    }

    function arcPathGenerator(size) {
        return d3.svg.arc()
                  .innerRadius((innerRadius + radius) / 2 - size / 2 * (radius - innerRadius))
                  .outerRadius((innerRadius + radius) / 2 + size / 2 * (radius - innerRadius))
                  .startAngle(-theta);
    }

    function drawArc(p) {
        p
            .attr('d', function(d) {
                return arcPathGenerator(d.thickness)
                  .startAngle(valueToAngle(d.range[0]))
                  .endAngle(valueToAngle(d.range[1]))();
            });
    }

    // preparing axis
    var ax, vals, transFn, tickSign;

    // Enter gauge and axis
    gauge.enter().append('g').classed('angular', true);
    gauge.attr('transform', strTranslate(gaugePosition[0], gaugePosition[1]));

    axisLayer.enter().append('g')
        .classed('angularaxis', true)
        .classed('crisp', true);
    axisLayer.selectAll('g.' + 'xangularaxis' + 'tick,path,text').remove();

    ax = mockAxis(gd, trace.gauge.axis);
    ax.type = 'linear';
    ax.range = trace.gauge.axis.range;
    ax._id = 'xangularaxis'; // or 'y', but I don't think this makes a difference here
    ax.setScale();

    // 't'ick to 'g'eometric radians is used all over the place here
    var t2g = function(d) {
        return (ax.range[0] - d.x) / (ax.range[1] - ax.range[0]) * Math.PI + Math.PI;
    };

    var labelFns = {};
    var out = Axes.makeLabelFns(ax, 0);
    var labelStandoff = out.labelStandoff;
    labelFns.xFn = function(d) {
        var rad = t2g(d);
        return Math.cos(rad) * labelStandoff;
    };
    labelFns.yFn = function(d) {
        var rad = t2g(d);
        var ff = Math.sin(rad) > 0 ? 0.2 : 1;
        return -Math.sin(rad) * (labelStandoff + d.fontSize * ff) +
                Math.abs(Math.cos(rad)) * (d.fontSize * MID_SHIFT);
    };
    labelFns.anchorFn = function(d) {
        var rad = t2g(d);
        var cos = Math.cos(rad);
        return Math.abs(cos) < 0.1 ?
                'middle' :
                (cos > 0 ? 'start' : 'end');
    };
    labelFns.heightFn = function(d, a, h) {
        var rad = t2g(d);
        return -0.5 * (1 + Math.sin(rad)) * h;
    };
    var _transFn = function(rad) {
        return strTranslate(
            gaugePosition[0] + radius * Math.cos(rad),
            gaugePosition[1] - radius * Math.sin(rad)
        );
    };
    transFn = function(d) {
        return _transFn(t2g(d));
    };
    var transFn2 = function(d) {
        var rad = t2g(d);
        return _transFn(rad) + 'rotate(' + -rad2deg(rad) + ')';
    };
    vals = Axes.calcTicks(ax);
    tickSign = Axes.getTickSigns(ax)[2];
    if(ax.visible) {
        tickSign = ax.ticks === 'inside' ? -1 : 1;
        var pad = (ax.linewidth || 1) / 2;
        Axes.drawTicks(gd, ax, {
            vals: vals,
            layer: axisLayer,
            path: 'M' + (tickSign * pad) + ',0h' + (tickSign * ax.ticklen),
            transFn: transFn2
        });
        Axes.drawLabels(gd, ax, {
            vals: vals,
            layer: axisLayer,
            transFn: transFn,
            labelFns: labelFns
        });
    }

    // Draw background + steps
    var arcs = [gaugeBg].concat(trace.gauge.steps);
    var bgArc = gauge.selectAll('g.bg-arc').data(arcs);
    bgArc.enter().append('g').classed('bg-arc', true).append('path');
    bgArc.select('path').call(drawArc).call(styleShape);
    bgArc.exit().remove();

    // Draw foreground with transition
    var valueArcPathGenerator = arcPathGenerator(trace.gauge.bar.thickness);
    var valueArc = gauge.selectAll('g.value-arc').data([trace.gauge.bar]);
    valueArc.enter().append('g').classed('value-arc', true).append('path');
    var valueArcPath = valueArc.select('path');
    if(hasTransition(transitionOpts)) {
        valueArcPath
            .transition()
            .duration(transitionOpts.duration)
            .ease(transitionOpts.easing)
            .each('end', function() { onComplete && onComplete(); })
            .each('interrupt', function() { onComplete && onComplete(); })
            .attrTween('d', arcTween(valueArcPathGenerator, valueToAngle(cd[0].lastY), valueToAngle(cd[0].y)));
        trace._lastValue = cd[0].y;
    } else {
        valueArcPath.attr('d', typeof cd[0].y === 'number' ?
            valueArcPathGenerator.endAngle(valueToAngle(cd[0].y)) :
            'M0,0Z');
    }
    valueArcPath.call(styleShape);
    valueArc.exit().remove();

    // Draw threshold
    arcs = [];
    var v = trace.gauge.threshold.value;
    if(v) {
        arcs.push({
            range: [v, v],
            color: trace.gauge.threshold.color,
            line: {
                color: trace.gauge.threshold.line.color,
                width: trace.gauge.threshold.line.width
            },
            thickness: trace.gauge.threshold.thickness
        });
    }
    var thresholdArc = gauge.selectAll('g.threshold-arc').data(arcs);
    thresholdArc.enter().append('g').classed('threshold-arc', true).append('path');
    thresholdArc.select('path').call(drawArc).call(styleShape);
    thresholdArc.exit().remove();

    // Draw border last
    var gaugeBorder = gauge.selectAll('g.gauge-outline').data([gaugeOutline]);
    gaugeBorder.enter().append('g').classed('gauge-outline', true).append('path');
    gaugeBorder.select('path').call(drawArc).call(styleShape);
    gaugeBorder.exit().remove();
}

function drawNumbers(gd, plotGroup, cd, opts) {
    var trace = cd[0].trace;

    var numbersX = opts.numbersX;
    var numbersY = opts.numbersY;
    var numbersAlign = trace.align || 'center';
    var numbersAnchor = anchor[numbersAlign];

    var transitionOpts = opts.transitionOpts;
    var onComplete = opts.onComplete;

    var numbers = Lib.ensureSingle(plotGroup, 'g', 'numbers');
    var bignumberbBox, deltabBox;
    var numbersbBox;

    var data = [];
    if(trace._hasNumber) data.push('number');
    if(trace._hasDelta) {
        data.push('delta');
        if(trace.delta.position === 'left') data.reverse();
    }
    var sel = numbers.selectAll('text').data(data);
    sel.enter().append('text');
    sel
        .attr('text-anchor', function() {return numbersAnchor;})
        .attr('class', function(d) { return d;})
        .attr('x', null)
        .attr('y', null)
        .attr('dx', null)
        .attr('dy', null);
    sel.exit().remove();

    // Function to override the number formatting used during transitions
    function transitionFormat(valueformat, fmt, from, to) {
        // For now, do not display SI prefix if start and end value do not have any
        if(valueformat.match('s') && // If using SI prefix
            (from >= 0 !== to >= 0) && // If sign change
            (!fmt(from).slice(-1).match(SI_PREFIX) && !fmt(to).slice(-1).match(SI_PREFIX)) // Has no SI prefix
        ) {
            var transitionValueFormat = valueformat.slice().replace('s', 'f').replace(/\d+/, function(m) { return parseInt(m) - 1;});
            var transitionAx = mockAxis(gd, {tickformat: transitionValueFormat});
            return function(v) {
                // Switch to fixed precision if number is smaller than one
                if(Math.abs(v) < 1) return Axes.tickText(transitionAx, v).text;
                return fmt(v);
            };
        } else {
            return fmt;
        }
    }

    function drawBignumber() {
        var bignumberAx = mockAxis(gd, {tickformat: trace.number.valueformat}, trace._range);
        bignumberAx.setScale();
        Axes.prepTicks(bignumberAx);

        var fmt = function(v) { return Axes.tickText(bignumberAx, v).text;};
        var bignumberSuffix = trace.number.suffix;
        var bignumberPrefix = trace.number.prefix;

        var number = numbers.select('text.number');

        function writeNumber() {
            var txt = typeof cd[0].y === 'number' ?
                bignumberPrefix + fmt(cd[0].y) + bignumberSuffix :
                '-';
            number.text(txt)
                .call(Drawing.font, trace.number.font)
                .call(svgTextUtils.convertToTspans, gd);
        }

        if(hasTransition(transitionOpts)) {
            number
                .transition()
                .duration(transitionOpts.duration)
                .ease(transitionOpts.easing)
                .each('end', function() { writeNumber(); onComplete && onComplete(); })
                .each('interrupt', function() { writeNumber(); onComplete && onComplete(); })
                .attrTween('text', function() {
                    var that = d3.select(this);
                    var interpolator = d3.interpolateNumber(cd[0].lastY, cd[0].y);
                    trace._lastValue = cd[0].y;

                    var transitionFmt = transitionFormat(trace.number.valueformat, fmt, cd[0].lastY, cd[0].y);
                    return function(t) {
                        that.text(bignumberPrefix + transitionFmt(interpolator(t)) + bignumberSuffix);
                    };
                });
        } else {
            writeNumber();
        }

        bignumberbBox = measureText(bignumberPrefix + fmt(cd[0].y) + bignumberSuffix, trace.number.font, numbersAnchor, gd);
        return number;
    }

    function drawDelta() {
        var deltaAx = mockAxis(gd, {tickformat: trace.delta.valueformat}, trace._range);
        deltaAx.setScale();
        Axes.prepTicks(deltaAx);

        var deltaFmt = function(v) { return Axes.tickText(deltaAx, v).text;};
        var deltaValue = function(d) {
            var value = trace.delta.relative ? d.relativeDelta : d.delta;
            return value;
        };
        var deltaFormatText = function(value, numberFmt) {
            if(value === 0 || typeof value !== 'number' || isNaN(value)) return '-';
            return (value > 0 ? trace.delta.increasing.symbol : trace.delta.decreasing.symbol) + numberFmt(value);
        };
        var deltaFill = function(d) {
            return d.delta >= 0 ? trace.delta.increasing.color : trace.delta.decreasing.color;
        };
        if(trace._deltaLastValue === undefined) {
            trace._deltaLastValue = deltaValue(cd[0]);
        }
        var delta = numbers.select('text.delta');
        delta
            .call(Drawing.font, trace.delta.font)
            .call(Color.fill, deltaFill({delta: trace._deltaLastValue}));

        function writeDelta() {
            delta.text(deltaFormatText(deltaValue(cd[0]), deltaFmt))
                .call(Color.fill, deltaFill(cd[0]))
                .call(svgTextUtils.convertToTspans, gd);
        }

        if(hasTransition(transitionOpts)) {
            delta
                .transition()
                .duration(transitionOpts.duration)
                .ease(transitionOpts.easing)
                .tween('text', function() {
                    var that = d3.select(this);
                    var to = deltaValue(cd[0]);
                    var from = trace._deltaLastValue;
                    var transitionFmt = transitionFormat(trace.delta.valueformat, deltaFmt, from, to);
                    var interpolator = d3.interpolateNumber(from, to);
                    trace._deltaLastValue = to;
                    return function(t) {
                        that.text(deltaFormatText(interpolator(t), transitionFmt));
                        that.call(Color.fill, deltaFill({delta: interpolator(t)}));
                    };
                })
                .each('end', function() { writeDelta(); onComplete && onComplete(); })
                .each('interrupt', function() { writeDelta(); onComplete && onComplete(); });
        } else {
            writeDelta();
        }

        deltabBox = measureText(deltaFormatText(deltaValue(cd[0]), deltaFmt), trace.delta.font, numbersAnchor, gd);
        return delta;
    }

    var key = trace.mode + trace.align;
    var delta;
    if(trace._hasDelta) {
        delta = drawDelta();
        key += trace.delta.position + trace.delta.font.size + trace.delta.font.family + trace.delta.valueformat;
        key += trace.delta.increasing.symbol + trace.delta.decreasing.symbol;
        numbersbBox = deltabBox;
    }
    if(trace._hasNumber) {
        drawBignumber();
        key += trace.number.font.size + trace.number.font.family + trace.number.valueformat + trace.number.suffix + trace.number.prefix;
        numbersbBox = bignumberbBox;
    }

    // Position delta relative to bignumber
    if(trace._hasDelta && trace._hasNumber) {
        var bignumberCenter = [
            (bignumberbBox.left + bignumberbBox.right) / 2,
            (bignumberbBox.top + bignumberbBox.bottom) / 2
        ];
        var deltaCenter = [
            (deltabBox.left + deltabBox.right) / 2,
            (deltabBox.top + deltabBox.bottom) / 2
        ];

        var dx, dy;
        var padding = 0.75 * trace.delta.font.size;
        if(trace.delta.position === 'left') {
            dx = cache(trace, 'deltaPos', 0, -1 * (bignumberbBox.width * (position[trace.align]) + deltabBox.width * (1 - position[trace.align]) + padding), key, Math.min);
            dy = bignumberCenter[1] - deltaCenter[1];

            numbersbBox = {
                width: bignumberbBox.width + deltabBox.width + padding,
                height: Math.max(bignumberbBox.height, deltabBox.height),
                left: deltabBox.left + dx,
                right: bignumberbBox.right,
                top: Math.min(bignumberbBox.top, deltabBox.top + dy),
                bottom: Math.max(bignumberbBox.bottom, deltabBox.bottom + dy)
            };
        }
        if(trace.delta.position === 'right') {
            dx = cache(trace, 'deltaPos', 0, bignumberbBox.width * (1 - position[trace.align]) + deltabBox.width * position[trace.align] + padding, key, Math.max);
            dy = bignumberCenter[1] - deltaCenter[1];

            numbersbBox = {
                width: bignumberbBox.width + deltabBox.width + padding,
                height: Math.max(bignumberbBox.height, deltabBox.height),
                left: bignumberbBox.left,
                right: deltabBox.right + dx,
                top: Math.min(bignumberbBox.top, deltabBox.top + dy),
                bottom: Math.max(bignumberbBox.bottom, deltabBox.bottom + dy)
            };
        }
        if(trace.delta.position === 'bottom') {
            dx = null;
            dy = deltabBox.height;

            numbersbBox = {
                width: Math.max(bignumberbBox.width, deltabBox.width),
                height: bignumberbBox.height + deltabBox.height,
                left: Math.min(bignumberbBox.left, deltabBox.left),
                right: Math.max(bignumberbBox.right, deltabBox.right),
                top: bignumberbBox.bottom - bignumberbBox.height,
                bottom: bignumberbBox.bottom + deltabBox.height
            };
        }
        if(trace.delta.position === 'top') {
            dx = null;
            dy = bignumberbBox.top;

            numbersbBox = {
                width: Math.max(bignumberbBox.width, deltabBox.width),
                height: bignumberbBox.height + deltabBox.height,
                left: Math.min(bignumberbBox.left, deltabBox.left),
                right: Math.max(bignumberbBox.right, deltabBox.right),
                top: bignumberbBox.bottom - bignumberbBox.height - deltabBox.height,
                bottom: bignumberbBox.bottom
            };
        }

        delta.attr({dx: dx, dy: dy});
    }

    // Resize numbers to fit within space and position
    if(trace._hasNumber || trace._hasDelta) {
        numbers.attr('transform', function() {
            var m = opts.numbersScaler(numbersbBox);
            key += m[2];
            var scaleRatio = cache(trace, 'numbersScale', 1, m[0], key, Math.min);
            var translateY;
            if(!trace._scaleNumbers) scaleRatio = 1;
            if(trace._isAngular) {
                // align vertically to bottom
                translateY = numbersY - scaleRatio * numbersbBox.bottom;
            } else {
                // align vertically to center
                translateY = numbersY - scaleRatio * (numbersbBox.top + numbersbBox.bottom) / 2;
            }

            // Stash the top position of numbersbBox for title positioning
            trace._numbersTop = scaleRatio * (numbersbBox.top) + translateY;

            var ref = numbersbBox[numbersAlign];
            if(numbersAlign === 'center') ref = (numbersbBox.left + numbersbBox.right) / 2;
            var translateX = numbersX - scaleRatio * ref;

            // Stash translateX
            translateX = cache(trace, 'numbersTranslate', 0, translateX, key, Math.max);
            return strTranslate(translateX, translateY) + ' scale(' + scaleRatio + ')';
        });
    }
}

// Apply fill, stroke, stroke-width to SVG shape
function styleShape(p) {
    p
        .each(function(d) { Color.stroke(d3.select(this), d.line.color);})
        .each(function(d) { Color.fill(d3.select(this), d.color);})
        .style('stroke-width', function(d) { return d.line.width;});
}

// Returns a tween for a transition’s "d" attribute, transitioning any selected
// arcs from their current angle to the specified new angle.
function arcTween(arc, endAngle, newAngle) {
    return function() {
        var interpolate = d3.interpolate(endAngle, newAngle);
        return function(t) {
            return arc.endAngle(interpolate(t))();
        };
    };
}

// mocks our axis
function mockAxis(gd, opts, zrange) {
    var fullLayout = gd._fullLayout;

    var axisIn = Lib.extendFlat({
        type: 'linear',
        ticks: 'outside',
        range: zrange,
        showline: true
    }, opts);

    var axisOut = {
        type: 'linear',
        _id: 'x' + opts._id
    };

    var axisOptions = {
        letter: 'x',
        font: fullLayout.font,
        noHover: true,
        noTickson: true
    };

    function coerce(attr, dflt) {
        return Lib.coerce(axisIn, axisOut, axisLayoutAttrs, attr, dflt);
    }

    handleAxisDefaults(axisIn, axisOut, coerce, axisOptions, fullLayout);
    handleAxisPositionDefaults(axisIn, axisOut, coerce, axisOptions);

    return axisOut;
}

function strTranslate(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

function fitTextInsideBox(textBB, width, height) {
    // compute scaling ratio to have text fit within specified width and height
    var ratio = Math.min(width / textBB.width, height / textBB.height);
    return [ratio, textBB, width + 'x' + height];
}

function fitTextInsideCircle(textBB, radius) {
    // compute scaling ratio to have text fit within specified radius
    var elRadius = Math.sqrt((textBB.width / 2) * (textBB.width / 2) + textBB.height * textBB.height);
    var ratio = radius / elRadius;
    return [ratio, textBB, radius];
}

function measureText(txt, font, textAnchor, gd) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    var sel = d3.select(element);
    sel.text(txt)
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', textAnchor)
      .attr('data-unformatted', txt)
      .call(svgTextUtils.convertToTspans, gd)
      .call(Drawing.font, font);
    return Drawing.bBox(sel.node());
}

function cache(trace, name, initialValue, value, key, fn) {
    var objName = '_cache' + name;
    if(!(trace[objName] && trace[objName].key === key)) {
        trace[objName] = {key: key, value: initialValue};
    }
    var v = Lib.aggNums(fn, null, [trace[objName].value, value], 2);
    trace[objName].value = v;

    return v;
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaW5kaWNhdG9yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaW5kaWNhdG9yL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9pbmRpY2F0b3IvYmFzZV9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaW5kaWNhdG9yL2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9pbmRpY2F0b3IvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaW5kaWNhdG9yL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaW5kaWNhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaW5kaWNhdG9yL3Bsb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsNkhBQW1EOzs7Ozs7Ozs7Ozs7QUNWbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUJBQWlCLG9HQUFzQztBQUN2RCxpQkFBaUIsb0dBQXNDO0FBQ3ZELGtCQUFrQix1SEFBZ0Q7QUFDbEUsZ0JBQWdCLG1CQUFPLENBQUMsMEZBQTZCO0FBQ3JELGlCQUFpQixtQkFBTyxDQUFDLHNHQUFtQztBQUM1RCxrQkFBa0Isd0dBQXdDO0FBQzFELGdCQUFnQixtQkFBTyxDQUFDLGtIQUF5QztBQUNqRSxxQkFBcUIsZ0lBQXNEO0FBQzNFLFlBQVksbUJBQU8sQ0FBQyxpRkFBMEI7QUFDOUMsa0JBQWtCLDZHQUEyQzs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsb0NBQW9DO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxREFBcUQ7QUFDckQ7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx5QkFBeUIsaURBQWlEOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVCwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDBCQUEwQjtBQUMxQixvQkFBb0IsY0FBYztBQUNsQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFF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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGVBQWU7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDhDQUE4QztBQUN6RSwyQkFBMkIsdUNBQXVDO0FBQ2xFLDRDQUE0QyxzQkFBc0I7QUFDbEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImNoYXJ0MWI1OWRjODhkNGE3MzNjNzg0YzYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9pbmRpY2F0b3InKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBleHRlbmREZWVwID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZERlZXA7XG52YXIgb3ZlcnJpZGVBbGwgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9lZGl0X3R5cGVzJykub3ZlcnJpZGVBbGw7XG52YXIgZm9udEF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZm9udF9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3IvYXR0cmlidXRlcycpO1xudmFyIGRvbWFpbkF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZG9tYWluJykuYXR0cmlidXRlcztcbnZhciBheGVzQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcbnZhciB0ZW1wbGF0ZWRBcnJheSA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKS50ZW1wbGF0ZWRBcnJheTtcbnZhciBkZWx0YSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9kZWx0YS5qcycpO1xudmFyIEZPUk1BVF9MSU5LID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL2RvY3MnKS5GT1JNQVRfTElOSztcblxudmFyIHRleHRGb250QXR0cnMgPSBmb250QXR0cnMoe1xuICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgY29sb3JFZGl0VHlwZTogJ3Bsb3QnXG59KTtcblxudmFyIGdhdWdlQmFyQXR0cnMgPSB7XG4gICAgY29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGFyYy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBsaW5lOiB7XG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogY29sb3JBdHRycy5kZWZhdWx0TGluZSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgbGluZSBlbmNsb3NpbmcgZWFjaCBzZWN0b3IuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB3aWR0aCAoaW4gcHgpIG9mIHRoZSBsaW5lIGVuY2xvc2luZyBlYWNoIHNlY3Rvci4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcbiAgICB0aGlja25lc3M6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgdGhpY2tuZXNzIG9mIHRoZSBiYXIgYXMgYSBmcmFjdGlvbiBvZiB0aGUgdG90YWwgdGhpY2tuZXNzIG9mIHRoZSBnYXVnZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBlZGl0VHlwZTogJ2NhbGMnXG59O1xuXG52YXIgcmFuZ2VBdHRyID0ge1xuICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICByb2xlOiAnaW5mbycsXG4gICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgZWRpdFR5cGU6ICdwbG90J30sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIGVkaXRUeXBlOiAncGxvdCd9XG4gICAgXSxcbiAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICdTZXRzIHRoZSByYW5nZSBvZiB0aGlzIGF4aXMuJ1xuICAgICAgICAvLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3Igb3RoZXIgYXhpcyB0eXBlXG4gICAgICAgIC8vICdJZiB0aGUgYXhpcyBgdHlwZWAgaXMgKmxvZyosIHRoZW4geW91IG11c3QgdGFrZSB0aGUgbG9nIG9mIHlvdXInLFxuICAgICAgICAvLyAnZGVzaXJlZCByYW5nZSAoZS5nLiB0byBzZXQgdGhlIHJhbmdlIGZyb20gMSB0byAxMDAsJyxcbiAgICAgICAgLy8gJ3NldCB0aGUgcmFuZ2UgZnJvbSAwIHRvIDIpLicsXG4gICAgICAgIC8vICdJZiB0aGUgYXhpcyBgdHlwZWAgaXMgKmRhdGUqLCBpdCBzaG91bGQgYmUgZGF0ZSBzdHJpbmdzLCcsXG4gICAgICAgIC8vICdsaWtlIGRhdGUgZGF0YSwgdGhvdWdoIERhdGUgb2JqZWN0cyBhbmQgdW5peCBtaWxsaXNlY29uZHMnLFxuICAgICAgICAvLyAnd2lsbCBiZSBhY2NlcHRlZCBhbmQgY29udmVydGVkIHRvIHN0cmluZ3MuJyxcbiAgICAgICAgLy8gJ0lmIHRoZSBheGlzIGB0eXBlYCBpcyAqY2F0ZWdvcnkqLCBpdCBzaG91bGQgYmUgbnVtYmVycywnLFxuICAgICAgICAvLyAndXNpbmcgdGhlIHNjYWxlIHdoZXJlIGVhY2ggY2F0ZWdvcnkgaXMgYXNzaWduZWQgYSBzZXJpYWwnLFxuICAgICAgICAvLyAnbnVtYmVyIGZyb20gemVybyBpbiB0aGUgb3JkZXIgaXQgYXBwZWFycy4nXG4gICAgXS5qb2luKCcgJylcbn07XG5cbnZhciBzdGVwc0F0dHJzID0gdGVtcGxhdGVkQXJyYXkoJ3N0ZXAnLCBleHRlbmREZWVwKHt9LCBnYXVnZUJhckF0dHJzLCB7XG4gICAgcmFuZ2U6IHJhbmdlQXR0clxufSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb2RlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdmbGFnbGlzdCcsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZmxhZ3M6IFsnbnVtYmVyJywgJ2RlbHRhJywgJ2dhdWdlJ10sXG4gICAgICAgIGRmbHQ6ICdudW1iZXInLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaG93IHRoZSB2YWx1ZSBpcyBkaXNwbGF5ZWQgb24gdGhlIGdyYXBoLicsXG4gICAgICAgICAgICAnYG51bWJlcmAgZGlzcGxheXMgdGhlIHZhbHVlIG51bWVyaWNhbGx5IGluIHRleHQuJyxcbiAgICAgICAgICAgICdgZGVsdGFgIGRpc3BsYXlzIHRoZSBkaWZmZXJlbmNlIHRvIGEgcmVmZXJlbmNlIHZhbHVlIGluIHRleHQuJyxcbiAgICAgICAgICAgICdGaW5hbGx5LCBgZ2F1Z2VgIGRpc3BsYXlzIHRoZSB2YWx1ZSBncmFwaGljYWxseSBvbiBhbiBheGlzLicsXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBhbmltOiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIG51bWJlciB0byBiZSBkaXNwbGF5ZWQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYWxpZ246IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnbGVmdCcsICdjZW50ZXInLCAncmlnaHQnXSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGhvcml6b250YWwgYWxpZ25tZW50IG9mIHRoZSBgdGV4dGAgd2l0aGluIHRoZSBib3guJyxcbiAgICAgICAgICAgICdOb3RlIHRoYXQgdGhpcyBhdHRyaWJ1dGUgaGFzIG5vIGVmZmVjdCBpZiBhbiBhbmd1bGFyIGdhdWdlIGlzIGRpc3BsYXllZDonLFxuICAgICAgICAgICAgJ2luIHRoaXMgY2FzZSwgaXQgaXMgYWx3YXlzIGNlbnRlcmVkJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgLy8gcG9zaXRpb25cbiAgICBkb21haW46IGRvbWFpbkF0dHJzKHtuYW1lOiAnaW5kaWNhdG9yJywgdHJhY2U6IHRydWUsIGVkaXRUeXBlOiAnY2FsYyd9KSxcblxuICAgIHRpdGxlOiB7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHRpdGxlIG9mIHRoaXMgaW5kaWNhdG9yLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGFsaWduOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICB2YWx1ZXM6IFsnbGVmdCcsICdjZW50ZXInLCAncmlnaHQnXSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgdGl0bGUuJyxcbiAgICAgICAgICAgICAgICAnSXQgZGVmYXVsdHMgdG8gYGNlbnRlcmAgZXhjZXB0IGZvciBidWxsZXQgY2hhcnRzJyxcbiAgICAgICAgICAgICAgICAnZm9yIHdoaWNoIGl0IGRlZmF1bHRzIHRvIHJpZ2h0LidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGZvbnQ6IGV4dGVuZEZsYXQoe30sIHRleHRGb250QXR0cnMsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldCB0aGUgZm9udCB1c2VkIHRvIGRpc3BsYXkgdGhlIHRpdGxlJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSksXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICB9LFxuICAgIG51bWJlcjoge1xuICAgICAgICB2YWx1ZWZvcm1hdDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB2YWx1ZSBmb3JtYXR0aW5nIHJ1bGUgdXNpbmcgZDMgZm9ybWF0dGluZyBtaW5pLWxhbmd1YWdlJyxcbiAgICAgICAgICAgICAgICAnd2hpY2ggaXMgc2ltaWxhciB0byB0aG9zZSBvZiBQeXRob24uIFNlZScsXG4gICAgICAgICAgICAgICAgRk9STUFUX0xJTktcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGZvbnQ6IGV4dGVuZEZsYXQoe30sIHRleHRGb250QXR0cnMsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldCB0aGUgZm9udCB1c2VkIHRvIGRpc3BsYXkgbWFpbiBudW1iZXInXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9KSxcbiAgICAgICAgcHJlZml4OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgYSBwcmVmaXggYXBwZWFyaW5nIGJlZm9yZSB0aGUgbnVtYmVyLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHN1ZmZpeDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIGEgc3VmZml4IGFwcGVhcmluZyBuZXh0IHRvIHRoZSBudW1iZXIuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgIH0sXG4gICAgZGVsdGE6IHtcbiAgICAgICAgcmVmZXJlbmNlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSByZWZlcmVuY2UgdmFsdWUgdG8gY29tcHV0ZSB0aGUgZGVsdGEuJyxcbiAgICAgICAgICAgICAgICAnQnkgZGVmYXVsdCwgaXQgaXMgc2V0IHRvIHRoZSBjdXJyZW50IHZhbHVlLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICB2YWx1ZXM6IFsndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0J10sXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZmx0OiAnYm90dG9tJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBwb3NpdGlvbiBvZiBkZWx0YSB3aXRoIHJlc3BlY3QgdG8gdGhlIG51bWJlci4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICByZWxhdGl2ZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2hvdyByZWxhdGl2ZSBjaGFuZ2UnXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICB2YWx1ZWZvcm1hdDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdmFsdWUgZm9ybWF0dGluZyBydWxlIHVzaW5nIGQzIGZvcm1hdHRpbmcgbWluaS1sYW5ndWFnZScsXG4gICAgICAgICAgICAgICAgJ3doaWNoIGlzIHNpbWlsYXIgdG8gdGhvc2Ugb2YgUHl0aG9uLiBTZWUnLFxuICAgICAgICAgICAgICAgIEZPUk1BVF9MSU5LXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBpbmNyZWFzaW5nOiB7XG4gICAgICAgICAgICBzeW1ib2w6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgZGZsdDogZGVsdGEuSU5DUkVBU0lORy5TWU1CT0wsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICAgICAnU2V0cyB0aGUgc3ltYm9sIHRvIGRpc3BsYXkgZm9yIGluY3JlYXNpbmcgdmFsdWUnXG4gICAgICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgIGRmbHQ6IGRlbHRhLklOQ1JFQVNJTkcuQ09MT1IsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICAgICAnU2V0cyB0aGUgY29sb3IgZm9yIGluY3JlYXNpbmcgdmFsdWUuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gVE9ETzogYWRkIGF0dHJpYnV0ZSB0byBzaG93IHNpZ25cbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICAgICAgfSxcbiAgICAgICAgZGVjcmVhc2luZzoge1xuICAgICAgICAgICAgc3ltYm9sOiB7XG4gICAgICAgICAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgIGRmbHQ6IGRlbHRhLkRFQ1JFQVNJTkcuU1lNQk9MLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIHN5bWJvbCB0byBkaXNwbGF5IGZvciBpbmNyZWFzaW5nIHZhbHVlJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICBkZmx0OiBkZWx0YS5ERUNSRUFTSU5HLkNPTE9SLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIGNvbG9yIGZvciBpbmNyZWFzaW5nIHZhbHVlLidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFRPRE86IGFkZCBhdHRyaWJ1dGUgdG8gaGlkZSBzaWduXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgICAgIH0sXG4gICAgICAgIGZvbnQ6IGV4dGVuZEZsYXQoe30sIHRleHRGb250QXR0cnMsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldCB0aGUgZm9udCB1c2VkIHRvIGRpc3BsYXkgdGhlIGRlbHRhJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSksXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICB9LFxuICAgIGdhdWdlOiB7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogJ2FuZ3VsYXInLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ2FuZ3VsYXInLCAnYnVsbGV0J10sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXQgdGhlIHNoYXBlIG9mIHRoZSBnYXVnZSdcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGJhcjogZXh0ZW5kRGVlcCh7fSwgZ2F1Z2VCYXJBdHRycywge1xuICAgICAgICAgICAgY29sb3I6IHtkZmx0OiAnZ3JlZW4nfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldCB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgZ2F1Z2VcXCdzIHZhbHVlJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSksXG4gICAgICAgIC8vIEJhY2tncm91bmQgb2YgdGhlIGdhdWdlXG4gICAgICAgIGJnY29sb3I6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBnYXVnZSBiYWNrZ3JvdW5kIGNvbG9yLidcbiAgICAgICAgfSxcbiAgICAgICAgYm9yZGVyY29sb3I6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICBkZmx0OiBjb2xvckF0dHJzLmRlZmF1bHRMaW5lLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29sb3Igb2YgdGhlIGJvcmRlciBlbmNsb3NpbmcgdGhlIGdhdWdlLidcbiAgICAgICAgfSxcbiAgICAgICAgYm9yZGVyd2lkdGg6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHdpZHRoIChpbiBweCkgb2YgdGhlIGJvcmRlciBlbmNsb3NpbmcgdGhlIGdhdWdlLidcbiAgICAgICAgfSxcbiAgICAgICAgYXhpczogb3ZlcnJpZGVBbGwoe1xuICAgICAgICAgICAgcmFuZ2U6IHJhbmdlQXR0cixcbiAgICAgICAgICAgIHZpc2libGU6IGV4dGVuZEZsYXQoe30sIGF4ZXNBdHRycy52aXNpYmxlLCB7XG4gICAgICAgICAgICAgICAgZGZsdDogdHJ1ZVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAvLyB0aWNrIGFuZCB0aXRsZSBwcm9wZXJ0aWVzIG5hbWVkIGFuZCBmdW5jdGlvbiBleGFjdGx5IGFzIGluIGF4ZXNcbiAgICAgICAgICAgIHRpY2ttb2RlOiBheGVzQXR0cnMudGlja21vZGUsXG4gICAgICAgICAgICBudGlja3M6IGF4ZXNBdHRycy5udGlja3MsXG4gICAgICAgICAgICB0aWNrMDogYXhlc0F0dHJzLnRpY2swLFxuICAgICAgICAgICAgZHRpY2s6IGF4ZXNBdHRycy5kdGljayxcbiAgICAgICAgICAgIHRpY2t2YWxzOiBheGVzQXR0cnMudGlja3ZhbHMsXG4gICAgICAgICAgICB0aWNrdGV4dDogYXhlc0F0dHJzLnRpY2t0ZXh0LFxuICAgICAgICAgICAgdGlja3M6IGV4dGVuZEZsYXQoe30sIGF4ZXNBdHRycy50aWNrcywge2RmbHQ6ICdvdXRzaWRlJ30pLFxuICAgICAgICAgICAgdGlja2xlbjogYXhlc0F0dHJzLnRpY2tsZW4sXG4gICAgICAgICAgICB0aWNrd2lkdGg6IGF4ZXNBdHRycy50aWNrd2lkdGgsXG4gICAgICAgICAgICB0aWNrY29sb3I6IGF4ZXNBdHRycy50aWNrY29sb3IsXG4gICAgICAgICAgICBzaG93dGlja2xhYmVsczogYXhlc0F0dHJzLnNob3d0aWNrbGFiZWxzLFxuICAgICAgICAgICAgdGlja2ZvbnQ6IGZvbnRBdHRycyh7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBjb2xvciBiYXJcXCdzIHRpY2sgbGFiZWwgZm9udCdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGlja2FuZ2xlOiBheGVzQXR0cnMudGlja2FuZ2xlLFxuICAgICAgICAgICAgdGlja2Zvcm1hdDogYXhlc0F0dHJzLnRpY2tmb3JtYXQsXG4gICAgICAgICAgICB0aWNrZm9ybWF0c3RvcHM6IGF4ZXNBdHRycy50aWNrZm9ybWF0c3RvcHMsXG4gICAgICAgICAgICB0aWNrcHJlZml4OiBheGVzQXR0cnMudGlja3ByZWZpeCxcbiAgICAgICAgICAgIHNob3d0aWNrcHJlZml4OiBheGVzQXR0cnMuc2hvd3RpY2twcmVmaXgsXG4gICAgICAgICAgICB0aWNrc3VmZml4OiBheGVzQXR0cnMudGlja3N1ZmZpeCxcbiAgICAgICAgICAgIHNob3d0aWNrc3VmZml4OiBheGVzQXR0cnMuc2hvd3RpY2tzdWZmaXgsXG4gICAgICAgICAgICBzZXBhcmF0ZXRob3VzYW5kczogYXhlc0F0dHJzLnNlcGFyYXRldGhvdXNhbmRzLFxuICAgICAgICAgICAgZXhwb25lbnRmb3JtYXQ6IGF4ZXNBdHRycy5leHBvbmVudGZvcm1hdCxcbiAgICAgICAgICAgIHNob3dleHBvbmVudDogYXhlc0F0dHJzLnNob3dleHBvbmVudCxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICAgICAgfSwgJ3Bsb3QnKSxcbiAgICAgICAgLy8gU3RlcHMgKG9yIHJhbmdlcykgYW5kIHRocmVzaG9sZHNcbiAgICAgICAgc3RlcHM6IHN0ZXBzQXR0cnMsXG4gICAgICAgIHRocmVzaG9sZDoge1xuICAgICAgICAgICAgbGluZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBleHRlbmRGbGF0KHt9LCBnYXVnZUJhckF0dHJzLmxpbmUuY29sb3IsIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgdGhyZXNob2xkIGxpbmUuJ1xuICAgICAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBleHRlbmRGbGF0KHt9LCBnYXVnZUJhckF0dHJzLmxpbmUud2lkdGgsIHtcbiAgICAgICAgICAgICAgICAgICAgZGZsdDogMSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSB3aWR0aCAoaW4gcHgpIG9mIHRoZSB0aHJlc2hvbGQgbGluZS4nXG4gICAgICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaWNrbmVzczogZXh0ZW5kRmxhdCh7fSwgZ2F1Z2VCYXJBdHRycy50aGlja25lc3MsIHtcbiAgICAgICAgICAgICAgICBkZmx0OiAwLjg1LFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSB0aGlja25lc3Mgb2YgdGhlIHRocmVzaG9sZCBsaW5lIGFzIGEgZnJhY3Rpb24gb2YgdGhlIHRoaWNrbmVzcyBvZiB0aGUgZ2F1Z2UuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgYSB0cmVzaG9sZCB2YWx1ZSBkcmF3biBhcyBhIGxpbmUuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgICAgICB9LFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBnYXVnZSBvZiB0aGUgSW5kaWNhdG9yIHBsb3QuJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgICAgICAvLyBUT0RPOiBpbiBmdXR1cmUgdmVyc2lvbiwgYWRkIG1hcmtlcjogKGJhcnxuZWVkbGUpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHBsb3RzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvcGxvdHMnKTtcblxuZXhwb3J0cy5uYW1lID0gJ2luZGljYXRvcic7XG5cbmV4cG9ydHMucGxvdCA9IGZ1bmN0aW9uKGdkLCB0cmFjZXMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgcGxvdHMucGxvdEJhc2VQbG90KGV4cG9ydHMubmFtZSwgZ2QsIHRyYWNlcywgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spO1xufTtcblxuZXhwb3J0cy5jbGVhbiA9IGZ1bmN0aW9uKG5ld0Z1bGxEYXRhLCBuZXdGdWxsTGF5b3V0LCBvbGRGdWxsRGF0YSwgb2xkRnVsbExheW91dCkge1xuICAgIHBsb3RzLmNsZWFuQmFzZVBsb3QoZXhwb3J0cy5uYW1lLCBuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gdmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG5mdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBjZCA9IFtdO1xuXG4gICAgdmFyIGxhc3RSZWFkaW5nID0gdHJhY2UudmFsdWU7XG4gICAgaWYoISh0eXBlb2YgdHJhY2UuX2xhc3RWYWx1ZSA9PT0gJ251bWJlcicpKSB0cmFjZS5fbGFzdFZhbHVlID0gdHJhY2UudmFsdWU7XG4gICAgdmFyIHNlY29uZExhc3RSZWFkaW5nID0gdHJhY2UuX2xhc3RWYWx1ZTtcbiAgICB2YXIgZGVsdGFSZWYgPSBzZWNvbmRMYXN0UmVhZGluZztcbiAgICBpZih0cmFjZS5faGFzRGVsdGEgJiYgdHlwZW9mIHRyYWNlLmRlbHRhLnJlZmVyZW5jZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgZGVsdGFSZWYgPSB0cmFjZS5kZWx0YS5yZWZlcmVuY2U7XG4gICAgfVxuICAgIGNkWzBdID0ge1xuICAgICAgICB5OiBsYXN0UmVhZGluZyxcbiAgICAgICAgbGFzdFk6IHNlY29uZExhc3RSZWFkaW5nLFxuXG4gICAgICAgIGRlbHRhOiBsYXN0UmVhZGluZyAtIGRlbHRhUmVmLFxuICAgICAgICByZWxhdGl2ZURlbHRhOiAobGFzdFJlYWRpbmcgLSBkZWx0YVJlZikgLyBkZWx0YVJlZixcbiAgICB9O1xuICAgIHJldHVybiBjZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2FsYzogY2FsY1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gRGVmYXVsdHMgZm9yIGRlbHRhXG4gICAgZGVmYXVsdE51bWJlckZvbnRTaXplOiA4MCxcbiAgICBidWxsZXROdW1iZXJEb21haW5TaXplOiAwLjI1LFxuICAgIGJ1bGxldFBhZGRpbmc6IDAuMDI1LFxuICAgIGlubmVyUmFkaXVzOiAwLjc1LFxuICAgIHZhbHVlVGhpY2tuZXNzOiAwLjUsIC8vIHRoaWNrbmVzcyBvZiB2YWx1ZSBiYXJzIHJlbGF0aXZlIHRvIGZ1bGwgdGhpY2tuZXNzLFxuICAgIHRpdGxlUGFkZGluZzogNSxcbiAgICBob3Jpem9udGFsUGFkZGluZzogMTBcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgaGFuZGxlRG9tYWluRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9kb21haW4nKS5kZWZhdWx0cztcbnZhciBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKTtcbnZhciBoYW5kbGVBcnJheUNvbnRhaW5lckRlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvYXJyYXlfY29udGFpbmVyX2RlZmF1bHRzJyk7XG52YXIgY24gPSByZXF1aXJlKCcuL2NvbnN0YW50cy5qcycpO1xuXG52YXIgaGFuZGxlVGlja1ZhbHVlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vdGlja192YWx1ZV9kZWZhdWx0cycpO1xudmFyIGhhbmRsZVRpY2tNYXJrRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vdGlja19tYXJrX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlVGlja0xhYmVsRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vdGlja19sYWJlbF9kZWZhdWx0cycpO1xuXG5mdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRG9tYWluRGVmYXVsdHModHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcblxuICAgIC8vIE1vZGVcbiAgICBjb2VyY2UoJ21vZGUnKTtcbiAgICB0cmFjZU91dC5faGFzTnVtYmVyID0gdHJhY2VPdXQubW9kZS5pbmRleE9mKCdudW1iZXInKSAhPT0gLTE7XG4gICAgdHJhY2VPdXQuX2hhc0RlbHRhID0gdHJhY2VPdXQubW9kZS5pbmRleE9mKCdkZWx0YScpICE9PSAtMTtcbiAgICB0cmFjZU91dC5faGFzR2F1Z2UgPSB0cmFjZU91dC5tb2RlLmluZGV4T2YoJ2dhdWdlJykgIT09IC0xO1xuXG4gICAgdmFyIHZhbHVlID0gY29lcmNlKCd2YWx1ZScpO1xuICAgIHRyYWNlT3V0Ll9yYW5nZSA9IFswLCAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IDEuNSAqIHZhbHVlIDogMSldO1xuXG4gICAgLy8gTnVtYmVyIGF0dHJpYnV0ZXNcbiAgICB2YXIgYXV0byA9IG5ldyBBcnJheSgyKTtcbiAgICB2YXIgYmlnbnVtYmVyRm9udFNpemU7XG4gICAgaWYodHJhY2VPdXQuX2hhc051bWJlcikge1xuICAgICAgICBjb2VyY2UoJ251bWJlci52YWx1ZWZvcm1hdCcpO1xuICAgICAgICBjb2VyY2UoJ251bWJlci5mb250LmNvbG9yJywgbGF5b3V0LmZvbnQuY29sb3IpO1xuICAgICAgICBjb2VyY2UoJ251bWJlci5mb250LmZhbWlseScsIGxheW91dC5mb250LmZhbWlseSk7XG4gICAgICAgIGNvZXJjZSgnbnVtYmVyLmZvbnQuc2l6ZScpO1xuICAgICAgICBpZih0cmFjZU91dC5udW1iZXIuZm9udC5zaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRyYWNlT3V0Lm51bWJlci5mb250LnNpemUgPSBjbi5kZWZhdWx0TnVtYmVyRm9udFNpemU7XG4gICAgICAgICAgICBhdXRvWzBdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb2VyY2UoJ251bWJlci5wcmVmaXgnKTtcbiAgICAgICAgY29lcmNlKCdudW1iZXIuc3VmZml4Jyk7XG4gICAgICAgIGJpZ251bWJlckZvbnRTaXplID0gdHJhY2VPdXQubnVtYmVyLmZvbnQuc2l6ZTtcbiAgICB9XG5cbiAgICAvLyBkZWx0YSBhdHRyaWJ1dGVzXG4gICAgdmFyIGRlbHRhRm9udFNpemU7XG4gICAgaWYodHJhY2VPdXQuX2hhc0RlbHRhKSB7XG4gICAgICAgIGNvZXJjZSgnZGVsdGEuZm9udC5jb2xvcicsIGxheW91dC5mb250LmNvbG9yKTtcbiAgICAgICAgY29lcmNlKCdkZWx0YS5mb250LmZhbWlseScsIGxheW91dC5mb250LmZhbWlseSk7XG4gICAgICAgIGNvZXJjZSgnZGVsdGEuZm9udC5zaXplJyk7XG4gICAgICAgIGlmKHRyYWNlT3V0LmRlbHRhLmZvbnQuc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0cmFjZU91dC5kZWx0YS5mb250LnNpemUgPSAodHJhY2VPdXQuX2hhc051bWJlciA/IDAuNSA6IDEpICogKGJpZ251bWJlckZvbnRTaXplIHx8IGNuLmRlZmF1bHROdW1iZXJGb250U2l6ZSk7XG4gICAgICAgICAgICBhdXRvWzFdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb2VyY2UoJ2RlbHRhLnJlZmVyZW5jZScsIHRyYWNlT3V0LnZhbHVlKTtcbiAgICAgICAgY29lcmNlKCdkZWx0YS5yZWxhdGl2ZScpO1xuICAgICAgICBjb2VyY2UoJ2RlbHRhLnZhbHVlZm9ybWF0JywgdHJhY2VPdXQuZGVsdGEucmVsYXRpdmUgPyAnMiUnIDogJycpO1xuICAgICAgICBjb2VyY2UoJ2RlbHRhLmluY3JlYXNpbmcuc3ltYm9sJyk7XG4gICAgICAgIGNvZXJjZSgnZGVsdGEuaW5jcmVhc2luZy5jb2xvcicpO1xuICAgICAgICBjb2VyY2UoJ2RlbHRhLmRlY3JlYXNpbmcuc3ltYm9sJyk7XG4gICAgICAgIGNvZXJjZSgnZGVsdGEuZGVjcmVhc2luZy5jb2xvcicpO1xuICAgICAgICBjb2VyY2UoJ2RlbHRhLnBvc2l0aW9uJyk7XG4gICAgICAgIGRlbHRhRm9udFNpemUgPSB0cmFjZU91dC5kZWx0YS5mb250LnNpemU7XG4gICAgfVxuICAgIHRyYWNlT3V0Ll9zY2FsZU51bWJlcnMgPSAoIXRyYWNlT3V0Ll9oYXNOdW1iZXIgfHwgYXV0b1swXSkgJiYgKCF0cmFjZU91dC5faGFzRGVsdGEgfHwgYXV0b1sxXSkgfHwgZmFsc2U7XG5cbiAgICAvLyBUaXRsZSBhdHRyaWJ1dGVzXG4gICAgY29lcmNlKCd0aXRsZS5mb250LmNvbG9yJywgbGF5b3V0LmZvbnQuY29sb3IpO1xuICAgIGNvZXJjZSgndGl0bGUuZm9udC5mYW1pbHknLCBsYXlvdXQuZm9udC5mYW1pbHkpO1xuICAgIGNvZXJjZSgndGl0bGUuZm9udC5zaXplJywgMC4yNSAqIChiaWdudW1iZXJGb250U2l6ZSB8fCBkZWx0YUZvbnRTaXplIHx8IGNuLmRlZmF1bHROdW1iZXJGb250U2l6ZSkpO1xuICAgIGNvZXJjZSgndGl0bGUudGV4dCcpO1xuXG4gICAgLy8gR2F1Z2UgYXR0cmlidXRlc1xuICAgIHZhciBnYXVnZUluLCBnYXVnZU91dCwgYXhpc0luLCBheGlzT3V0O1xuICAgIGZ1bmN0aW9uIGNvZXJjZUdhdWdlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UoZ2F1Z2VJbiwgZ2F1Z2VPdXQsIGF0dHJpYnV0ZXMuZ2F1Z2UsIGF0dHIsIGRmbHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb2VyY2VHYXVnZUF4aXMoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShheGlzSW4sIGF4aXNPdXQsIGF0dHJpYnV0ZXMuZ2F1Z2UuYXhpcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgaWYodHJhY2VPdXQuX2hhc0dhdWdlKSB7XG4gICAgICAgIGdhdWdlSW4gPSB0cmFjZUluLmdhdWdlO1xuICAgICAgICBpZighZ2F1Z2VJbikgZ2F1Z2VJbiA9IHt9O1xuICAgICAgICBnYXVnZU91dCA9IFRlbXBsYXRlLm5ld0NvbnRhaW5lcih0cmFjZU91dCwgJ2dhdWdlJyk7XG4gICAgICAgIGNvZXJjZUdhdWdlKCdzaGFwZScpO1xuICAgICAgICB2YXIgaXNCdWxsZXQgPSB0cmFjZU91dC5faXNCdWxsZXQgPSB0cmFjZU91dC5nYXVnZS5zaGFwZSA9PT0gJ2J1bGxldCc7XG4gICAgICAgIGlmKCFpc0J1bGxldCkge1xuICAgICAgICAgICAgY29lcmNlKCd0aXRsZS5hbGlnbicsICdjZW50ZXInKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNBbmd1bGFyID0gdHJhY2VPdXQuX2lzQW5ndWxhciA9IHRyYWNlT3V0LmdhdWdlLnNoYXBlID09PSAnYW5ndWxhcic7XG4gICAgICAgIGlmKCFpc0FuZ3VsYXIpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnYWxpZ24nLCAnY2VudGVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnYXVnZSBiYWNrZ3JvdW5kXG4gICAgICAgIGNvZXJjZUdhdWdlKCdiZ2NvbG9yJywgbGF5b3V0LnBhcGVyX2JnY29sb3IpO1xuICAgICAgICBjb2VyY2VHYXVnZSgnYm9yZGVyd2lkdGgnKTtcbiAgICAgICAgY29lcmNlR2F1Z2UoJ2JvcmRlcmNvbG9yJyk7XG5cbiAgICAgICAgLy8gZ2F1Z2UgYmFyIGluZGljYXRvclxuICAgICAgICBjb2VyY2VHYXVnZSgnYmFyLmNvbG9yJyk7XG4gICAgICAgIGNvZXJjZUdhdWdlKCdiYXIubGluZS5jb2xvcicpO1xuICAgICAgICBjb2VyY2VHYXVnZSgnYmFyLmxpbmUud2lkdGgnKTtcbiAgICAgICAgdmFyIGRlZmF1bHRCYXJUaGlja25lc3MgPSBjbi52YWx1ZVRoaWNrbmVzcyAqICh0cmFjZU91dC5nYXVnZS5zaGFwZSA9PT0gJ2J1bGxldCcgPyAwLjUgOiAxKTtcbiAgICAgICAgY29lcmNlR2F1Z2UoJ2Jhci50aGlja25lc3MnLCBkZWZhdWx0QmFyVGhpY2tuZXNzKTtcblxuICAgICAgICAvLyBHYXVnZSBzdGVwc1xuICAgICAgICBoYW5kbGVBcnJheUNvbnRhaW5lckRlZmF1bHRzKGdhdWdlSW4sIGdhdWdlT3V0LCB7XG4gICAgICAgICAgICBuYW1lOiAnc3RlcHMnLFxuICAgICAgICAgICAgaGFuZGxlSXRlbURlZmF1bHRzOiBzdGVwRGVmYXVsdHNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gR2F1Z2UgdGhyZXNob2xkXG4gICAgICAgIGNvZXJjZUdhdWdlKCd0aHJlc2hvbGQudmFsdWUnKTtcbiAgICAgICAgY29lcmNlR2F1Z2UoJ3RocmVzaG9sZC50aGlja25lc3MnKTtcbiAgICAgICAgY29lcmNlR2F1Z2UoJ3RocmVzaG9sZC5saW5lLndpZHRoJyk7XG4gICAgICAgIGNvZXJjZUdhdWdlKCd0aHJlc2hvbGQubGluZS5jb2xvcicpO1xuXG4gICAgICAgIC8vIEdhdWdlIGF4aXNcbiAgICAgICAgYXhpc0luID0ge307XG4gICAgICAgIGlmKGdhdWdlSW4pIGF4aXNJbiA9IGdhdWdlSW4uYXhpcyB8fCB7fTtcbiAgICAgICAgYXhpc091dCA9IFRlbXBsYXRlLm5ld0NvbnRhaW5lcihnYXVnZU91dCwgJ2F4aXMnKTtcbiAgICAgICAgY29lcmNlR2F1Z2VBeGlzKCd2aXNpYmxlJyk7XG4gICAgICAgIHRyYWNlT3V0Ll9yYW5nZSA9IGNvZXJjZUdhdWdlQXhpcygncmFuZ2UnLCB0cmFjZU91dC5fcmFuZ2UpO1xuXG4gICAgICAgIHZhciBvcHRzID0ge291dGVyVGlja3M6IHRydWV9O1xuICAgICAgICBoYW5kbGVUaWNrVmFsdWVEZWZhdWx0cyhheGlzSW4sIGF4aXNPdXQsIGNvZXJjZUdhdWdlQXhpcywgJ2xpbmVhcicpO1xuICAgICAgICBoYW5kbGVUaWNrTGFiZWxEZWZhdWx0cyhheGlzSW4sIGF4aXNPdXQsIGNvZXJjZUdhdWdlQXhpcywgJ2xpbmVhcicsIG9wdHMpO1xuICAgICAgICBoYW5kbGVUaWNrTWFya0RlZmF1bHRzKGF4aXNJbiwgYXhpc091dCwgY29lcmNlR2F1Z2VBeGlzLCBvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb2VyY2UoJ3RpdGxlLmFsaWduJywgJ2NlbnRlcicpO1xuICAgICAgICBjb2VyY2UoJ2FsaWduJywgJ2NlbnRlcicpO1xuICAgICAgICB0cmFjZU91dC5faXNBbmd1bGFyID0gdHJhY2VPdXQuX2lzQnVsbGV0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gZGlzYWJsZSAxRCB0cmFuc2Zvcm1zXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIHN0ZXBEZWZhdWx0cyhzdGVwSW4sIHN0ZXBPdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShzdGVwSW4sIHN0ZXBPdXQsIGF0dHJpYnV0ZXMuZ2F1Z2Uuc3RlcHMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnY29sb3InKTtcbiAgICBjb2VyY2UoJ2xpbmUuY29sb3InKTtcbiAgICBjb2VyY2UoJ2xpbmUud2lkdGgnKTtcbiAgICBjb2VyY2UoJ3JhbmdlJyk7XG4gICAgY29lcmNlKCd0aGlja25lc3MnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3VwcGx5RGVmYXVsdHM6IHN1cHBseURlZmF1bHRzXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdpbmRpY2F0b3InLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuL2Jhc2VfcGxvdCcpLFxuICAgIGNhdGVnb3JpZXM6IFsnc3ZnJywgJ25vT3BhY2l0eScsICdub0hvdmVyJ10sXG4gICAgYW5pbWF0YWJsZTogdHJ1ZSxcblxuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJykuc3VwcGx5RGVmYXVsdHMsXG5cbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKS5jYWxjLFxuXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JyksXG5cbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQW4gaW5kaWNhdG9yIGlzIHVzZWQgdG8gdmlzdWFsaXplIGEgc2luZ2xlIGB2YWx1ZWAgYWxvbmcgd2l0aCBzb21lJyxcbiAgICAgICAgICAgICdjb250ZXh0dWFsIGluZm9ybWF0aW9uIHN1Y2ggYXMgYHN0ZXBzYCBvciBhIGB0aHJlc2hvbGRgLCB1c2luZyBhJyxcbiAgICAgICAgICAgICdjb21iaW5hdGlvbiBvZiB0aHJlZSB2aXN1YWwgZWxlbWVudHM6IGEgbnVtYmVyLCBhIGRlbHRhLCBhbmQvb3IgYSBnYXVnZS4nLFxuICAgICAgICAgICAgJ0RlbHRhcyBhcmUgdGFrZW4gd2l0aCByZXNwZWN0IHRvIGEgYHJlZmVyZW5jZWAuJyxcbiAgICAgICAgICAgICdHYXVnZXMgY2FuIGJlIGVpdGhlciBhbmd1bGFyIG9yIGJ1bGxldCAoYWthIGxpbmVhcikgZ2F1Z2VzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgcmFkMmRlZyA9IExpYi5yYWQyZGVnO1xudmFyIE1JRF9TSElGVCA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9hbGlnbm1lbnQnKS5NSURfU0hJRlQ7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIGNuID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbnZhciBzdmdUZXh0VXRpbHMgPSByZXF1aXJlKCcuLi8uLi9saWIvc3ZnX3RleHRfdXRpbHMnKTtcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIGhhbmRsZUF4aXNEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGlzX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlQXhpc1Bvc2l0aW9uRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vcG9zaXRpb25fZGVmYXVsdHMnKTtcbnZhciBheGlzTGF5b3V0QXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIGFuY2hvciA9IHtcbiAgICAnbGVmdCc6ICdzdGFydCcsXG4gICAgJ2NlbnRlcic6ICdtaWRkbGUnLFxuICAgICdyaWdodCc6ICdlbmQnXG59O1xudmFyIHBvc2l0aW9uID0ge1xuICAgICdsZWZ0JzogMCxcbiAgICAnY2VudGVyJzogMC41LFxuICAgICdyaWdodCc6IDFcbn07XG5cbnZhciBTSV9QUkVGSVggPSAvW3l6YWZwbsK1bWtNR1RQRVpZXS87XG5cbmZ1bmN0aW9uIGhhc1RyYW5zaXRpb24odHJhbnNpdGlvbk9wdHMpIHtcbiAgICAvLyBJZiB0cmFuc2l0aW9uIGNvbmZpZyBpcyBwcm92aWRlZCwgdGhlbiBpdCBpcyBvbmx5IGEgcGFydGlhbCByZXBsb3QgYW5kIHRyYWNlcyBub3RcbiAgICAvLyB1cGRhdGVkIGFyZSByZW1vdmVkLlxuICAgIHJldHVybiB0cmFuc2l0aW9uT3B0cyAmJiB0cmFuc2l0aW9uT3B0cy5kdXJhdGlvbiA+IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGxvdChnZCwgY2RNb2R1bGUsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgb25Db21wbGV0ZTtcblxuICAgIGlmKGhhc1RyYW5zaXRpb24odHJhbnNpdGlvbk9wdHMpKSB7XG4gICAgICAgIGlmKG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIElmIGl0IHdhcyBwYXNzZWQgYSBjYWxsYmFjayB0byByZWdpc3RlciBjb21wbGV0aW9uLCBtYWtlIGEgY2FsbGJhY2suIElmXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGNyZWF0ZWQsIHRoZW4gaXQgbXVzdCBiZSBleGVjdXRlZCBvbiBjb21wbGV0aW9uLCBvdGhlcndpc2UgdGhlXG4gICAgICAgICAgICAvLyBwb3MtdHJhbnNpdGlvbiByZWRyYXcgd2lsbCBub3QgZXhlY3V0ZTpcbiAgICAgICAgICAgIG9uQ29tcGxldGUgPSBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBMaWIubWFrZVRyYWNlR3JvdXBzKGZ1bGxMYXlvdXQuX2luZGljYXRvcmxheWVyLCBjZE1vZHVsZSwgJ3RyYWNlJykuZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICB2YXIgY2QwID0gY2RbMF07XG4gICAgICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcblxuICAgICAgICB2YXIgcGxvdEdyb3VwID0gZDMuc2VsZWN0KHRoaXMpO1xuXG4gICAgICAgIC8vIEVsZW1lbnRzIGluIHRyYWNlXG4gICAgICAgIHZhciBoYXNHYXVnZSA9IHRyYWNlLl9oYXNHYXVnZTtcbiAgICAgICAgdmFyIGlzQW5ndWxhciA9IHRyYWNlLl9pc0FuZ3VsYXI7XG4gICAgICAgIHZhciBpc0J1bGxldCA9IHRyYWNlLl9pc0J1bGxldDtcblxuICAgICAgICAvLyBEb21haW4gc2l6ZVxuICAgICAgICB2YXIgZG9tYWluID0gdHJhY2UuZG9tYWluO1xuICAgICAgICB2YXIgc2l6ZSA9IHtcbiAgICAgICAgICAgIHc6IGZ1bGxMYXlvdXQuX3NpemUudyAqIChkb21haW4ueFsxXSAtIGRvbWFpbi54WzBdKSxcbiAgICAgICAgICAgIGg6IGZ1bGxMYXlvdXQuX3NpemUuaCAqIChkb21haW4ueVsxXSAtIGRvbWFpbi55WzBdKSxcbiAgICAgICAgICAgIGw6IGZ1bGxMYXlvdXQuX3NpemUubCArIGZ1bGxMYXlvdXQuX3NpemUudyAqIGRvbWFpbi54WzBdLFxuICAgICAgICAgICAgcjogZnVsbExheW91dC5fc2l6ZS5yICsgZnVsbExheW91dC5fc2l6ZS53ICogKDEgLSBkb21haW4ueFsxXSksXG4gICAgICAgICAgICB0OiBmdWxsTGF5b3V0Ll9zaXplLnQgKyBmdWxsTGF5b3V0Ll9zaXplLmggKiAoMSAtIGRvbWFpbi55WzFdKSxcbiAgICAgICAgICAgIGI6IGZ1bGxMYXlvdXQuX3NpemUuYiArIGZ1bGxMYXlvdXQuX3NpemUuaCAqIChkb21haW4ueVswXSlcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNlbnRlclggPSBzaXplLmwgKyBzaXplLncgLyAyO1xuICAgICAgICB2YXIgY2VudGVyWSA9IHNpemUudCArIHNpemUuaCAvIDI7XG5cbiAgICAgICAgLy8gQW5ndWxhciBnYXVnZSBzaXplXG4gICAgICAgIHZhciByYWRpdXMgPSBNYXRoLm1pbihzaXplLncgLyAyLCBzaXplLmgpOyAvLyBmaWxsIGRvbWFpblxuICAgICAgICB2YXIgaW5uZXJSYWRpdXMgPSBjbi5pbm5lclJhZGl1cyAqIHJhZGl1cztcblxuICAgICAgICAvLyBQb3NpdGlvbiBudW1iZXJzIGJhc2VkIG9uIG1vZGUgYW5kIHNldCB0aGUgc2NhbGluZyBsb2dpY1xuICAgICAgICB2YXIgbnVtYmVyc1gsIG51bWJlcnNZLCBudW1iZXJzU2NhbGVyO1xuICAgICAgICB2YXIgbnVtYmVyc0FsaWduID0gdHJhY2UuYWxpZ24gfHwgJ2NlbnRlcic7XG5cbiAgICAgICAgbnVtYmVyc1kgPSBjZW50ZXJZO1xuICAgICAgICBpZighaGFzR2F1Z2UpIHtcbiAgICAgICAgICAgIG51bWJlcnNYID0gc2l6ZS5sICsgcG9zaXRpb25bbnVtYmVyc0FsaWduXSAqIHNpemUudztcbiAgICAgICAgICAgIG51bWJlcnNTY2FsZXIgPSBmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaXRUZXh0SW5zaWRlQm94KGVsLCBzaXplLncsIHNpemUuaCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYoaXNBbmd1bGFyKSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyc1ggPSBjZW50ZXJYO1xuICAgICAgICAgICAgICAgIG51bWJlcnNZID0gY2VudGVyWSArIHJhZGl1cyAvIDI7XG4gICAgICAgICAgICAgICAgbnVtYmVyc1NjYWxlciA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXRUZXh0SW5zaWRlQ2lyY2xlKGVsLCAwLjkgKiBpbm5lclJhZGl1cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGlzQnVsbGV0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhZGRpbmcgPSBjbi5idWxsZXRQYWRkaW5nO1xuICAgICAgICAgICAgICAgIHZhciBwID0gKDEgLSBjbi5idWxsZXROdW1iZXJEb21haW5TaXplKSArIHBhZGRpbmc7XG4gICAgICAgICAgICAgICAgbnVtYmVyc1ggPSBzaXplLmwgKyAocCArICgxIC0gcCkgKiBwb3NpdGlvbltudW1iZXJzQWxpZ25dKSAqIHNpemUudztcbiAgICAgICAgICAgICAgICBudW1iZXJzU2NhbGVyID0gZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpdFRleHRJbnNpZGVCb3goZWwsIChjbi5idWxsZXROdW1iZXJEb21haW5TaXplIC0gcGFkZGluZykgKiBzaXplLncsIHNpemUuaCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERyYXcgbnVtYmVyc1xuICAgICAgICBkcmF3TnVtYmVycyhnZCwgcGxvdEdyb3VwLCBjZCwge1xuICAgICAgICAgICAgbnVtYmVyc1g6IG51bWJlcnNYLFxuICAgICAgICAgICAgbnVtYmVyc1k6IG51bWJlcnNZLFxuICAgICAgICAgICAgbnVtYmVyc1NjYWxlcjogbnVtYmVyc1NjYWxlcixcbiAgICAgICAgICAgIHRyYW5zaXRpb25PcHRzOiB0cmFuc2l0aW9uT3B0cyxcbiAgICAgICAgICAgIG9uQ29tcGxldGU6IG9uQ29tcGxldGVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVleHByZXNzIG91ciBnYXVnZSBiYWNrZ3JvdW5kIGF0dHJpYnV0ZXMgZm9yIGRyYXdpbmdcbiAgICAgICAgdmFyIGdhdWdlQmcsIGdhdWdlT3V0bGluZTtcbiAgICAgICAgaWYoaGFzR2F1Z2UpIHtcbiAgICAgICAgICAgIGdhdWdlQmcgPSB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHRyYWNlLmdhdWdlLmF4aXMucmFuZ2UsXG4gICAgICAgICAgICAgICAgY29sb3I6IHRyYWNlLmdhdWdlLmJnY29sb3IsXG4gICAgICAgICAgICAgICAgbGluZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdHJhY2UuZ2F1Z2UuYm9yZGVyY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aGlja25lc3M6IDFcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGdhdWdlT3V0bGluZSA9IHtcbiAgICAgICAgICAgICAgICByYW5nZTogdHJhY2UuZ2F1Z2UuYXhpcy5yYW5nZSxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICAgICAgICAgICAgICAgIGxpbmU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRyYWNlLmdhdWdlLmJvcmRlcmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogdHJhY2UuZ2F1Z2UuYm9yZGVyd2lkdGhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaWNrbmVzczogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZXBhcmUgYW5ndWxhciBnYXVnZSBsYXllcnNcbiAgICAgICAgdmFyIGFuZ3VsYXJHYXVnZSA9IHBsb3RHcm91cC5zZWxlY3RBbGwoJ2cuYW5ndWxhcicpLmRhdGEoaXNBbmd1bGFyID8gY2QgOiBbXSk7XG4gICAgICAgIGFuZ3VsYXJHYXVnZS5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHZhciBhbmd1bGFyYXhpc0xheWVyID0gcGxvdEdyb3VwLnNlbGVjdEFsbCgnZy5hbmd1bGFyYXhpcycpLmRhdGEoaXNBbmd1bGFyID8gY2QgOiBbXSk7XG4gICAgICAgIGFuZ3VsYXJheGlzTGF5ZXIuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGlzQW5ndWxhcikge1xuICAgICAgICAgICAgZHJhd0FuZ3VsYXJHYXVnZShnZCwgcGxvdEdyb3VwLCBjZCwge1xuICAgICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICAgICAgICAgIGlubmVyUmFkaXVzOiBpbm5lclJhZGl1cyxcblxuICAgICAgICAgICAgICAgIGdhdWdlOiBhbmd1bGFyR2F1Z2UsXG4gICAgICAgICAgICAgICAgbGF5ZXI6IGFuZ3VsYXJheGlzTGF5ZXIsXG4gICAgICAgICAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgICAgICAgICBnYXVnZUJnOiBnYXVnZUJnLFxuICAgICAgICAgICAgICAgIGdhdWdlT3V0bGluZTogZ2F1Z2VPdXRsaW5lLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25PcHRzOiB0cmFuc2l0aW9uT3B0cyxcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBvbkNvbXBsZXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZXBhcmUgYnVsbGV0IGxheWVyc1xuICAgICAgICB2YXIgYnVsbGV0R2F1Z2UgPSBwbG90R3JvdXAuc2VsZWN0QWxsKCdnLmJ1bGxldCcpLmRhdGEoaXNCdWxsZXQgPyBjZCA6IFtdKTtcbiAgICAgICAgYnVsbGV0R2F1Z2UuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgYnVsbGV0YXhpc0xheWVyID0gcGxvdEdyb3VwLnNlbGVjdEFsbCgnZy5idWxsZXRheGlzJykuZGF0YShpc0J1bGxldCA/IGNkIDogW10pO1xuICAgICAgICBidWxsZXRheGlzTGF5ZXIuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmKGlzQnVsbGV0KSB7XG4gICAgICAgICAgICBkcmF3QnVsbGV0R2F1Z2UoZ2QsIHBsb3RHcm91cCwgY2QsIHtcbiAgICAgICAgICAgICAgICBnYXVnZTogYnVsbGV0R2F1Z2UsXG4gICAgICAgICAgICAgICAgbGF5ZXI6IGJ1bGxldGF4aXNMYXllcixcbiAgICAgICAgICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICAgICAgICAgIGdhdWdlQmc6IGdhdWdlQmcsXG4gICAgICAgICAgICAgICAgZ2F1Z2VPdXRsaW5lOiBnYXVnZU91dGxpbmUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbk9wdHM6IHRyYW5zaXRpb25PcHRzLFxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IG9uQ29tcGxldGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGl0bGVcbiAgICAgICAgdmFyIHRpdGxlID0gcGxvdEdyb3VwLnNlbGVjdEFsbCgndGV4dC50aXRsZScpLmRhdGEoY2QpO1xuICAgICAgICB0aXRsZS5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIHRpdGxlLmVudGVyKCkuYXBwZW5kKCd0ZXh0JykuY2xhc3NlZCgndGl0bGUnLCB0cnVlKTtcbiAgICAgICAgdGl0bGVcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0J1bGxldCA/IGFuY2hvci5yaWdodCA6IGFuY2hvclt0cmFjZS50aXRsZS5hbGlnbl07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRleHQodHJhY2UudGl0bGUudGV4dClcbiAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgdHJhY2UudGl0bGUuZm9udClcbiAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcblxuICAgICAgICAvLyBQb3NpdGlvbiB0aXRsZVxuICAgICAgICB0aXRsZS5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0aXRsZVggPSBzaXplLmwgKyBzaXplLncgKiBwb3NpdGlvblt0cmFjZS50aXRsZS5hbGlnbl07XG4gICAgICAgICAgICB2YXIgdGl0bGVZO1xuICAgICAgICAgICAgdmFyIHRpdGxlUGFkZGluZyA9IGNuLnRpdGxlUGFkZGluZztcbiAgICAgICAgICAgIHZhciB0aXRsZWJCb3ggPSBEcmF3aW5nLmJCb3godGl0bGUubm9kZSgpKTtcbiAgICAgICAgICAgIGlmKGhhc0dhdWdlKSB7XG4gICAgICAgICAgICAgICAgaWYoaXNBbmd1bGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBvc2l0aW9uIGFib3ZlIGF4aXMgdGlja3MvbGFiZWxzXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYWNlLmdhdWdlLmF4aXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJCb3ggPSBEcmF3aW5nLmJCb3goYW5ndWxhcmF4aXNMYXllci5ub2RlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVZID0gKGJCb3gudG9wIC0gdGl0bGVQYWRkaW5nKSAtIHRpdGxlYkJveC5ib3R0b207XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZVkgPSBzaXplLnQgKyBzaXplLmggLyAyIC0gcmFkaXVzIC8gMiAtIHRpdGxlYkJveC5ib3R0b20gLSB0aXRsZVBhZGRpbmc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoaXNCdWxsZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9zaXRpb24gb3V0c2lkZSBkb21haW5cbiAgICAgICAgICAgICAgICAgICAgdGl0bGVZID0gbnVtYmVyc1kgLSAodGl0bGViQm94LnRvcCArIHRpdGxlYkJveC5ib3R0b20pIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVYID0gc2l6ZS5sIC0gY24uYnVsbGV0UGFkZGluZyAqIHNpemUudzsgLy8gT3V0c2lkZSBkb21haW4sIG9uIHRoZSBsZWZ0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwb3NpdGlvbiBhYm92ZSBudW1iZXJzXG4gICAgICAgICAgICAgICAgdGl0bGVZID0gKHRyYWNlLl9udW1iZXJzVG9wIC0gdGl0bGVQYWRkaW5nKSAtIHRpdGxlYkJveC5ib3R0b207XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyVHJhbnNsYXRlKHRpdGxlWCwgdGl0bGVZKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBkcmF3QnVsbGV0R2F1Z2UoZ2QsIHBsb3RHcm91cCwgY2QsIG9wdHMpIHtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcblxuICAgIHZhciBidWxsZXQgPSBvcHRzLmdhdWdlO1xuICAgIHZhciBheGlzTGF5ZXIgPSBvcHRzLmxheWVyO1xuICAgIHZhciBnYXVnZUJnID0gb3B0cy5nYXVnZUJnO1xuICAgIHZhciBnYXVnZU91dGxpbmUgPSBvcHRzLmdhdWdlT3V0bGluZTtcbiAgICB2YXIgc2l6ZSA9IG9wdHMuc2l6ZTtcbiAgICB2YXIgZG9tYWluID0gdHJhY2UuZG9tYWluO1xuXG4gICAgdmFyIHRyYW5zaXRpb25PcHRzID0gb3B0cy50cmFuc2l0aW9uT3B0cztcbiAgICB2YXIgb25Db21wbGV0ZSA9IG9wdHMub25Db21wbGV0ZTtcblxuICAgIC8vIHByZXBhcmluZyBheGlzXG4gICAgdmFyIGF4LCB2YWxzLCB0cmFuc0ZuLCB0aWNrU2lnbiwgc2hpZnQ7XG5cbiAgICAvLyBFbnRlciBidWxsZXQsIGF4aXNcbiAgICBidWxsZXQuZW50ZXIoKS5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdidWxsZXQnLCB0cnVlKTtcbiAgICBidWxsZXQuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgc2l6ZS5sICsgJywgJyArIHNpemUudCArICcpJyk7XG5cbiAgICBheGlzTGF5ZXIuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZCgnYnVsbGV0YXhpcycsIHRydWUpXG4gICAgICAgIC5jbGFzc2VkKCdjcmlzcCcsIHRydWUpO1xuICAgIGF4aXNMYXllci5zZWxlY3RBbGwoJ2cuJyArICd4YnVsbGV0YXhpcycgKyAndGljayxwYXRoLHRleHQnKS5yZW1vdmUoKTtcblxuICAgIC8vIERyYXcgYnVsbGV0XG4gICAgdmFyIGJ1bGxldEhlaWdodCA9IHNpemUuaDsgLy8gdXNlIGFsbCB2ZXJ0aWNhbCBkb21haW5cbiAgICB2YXIgaW5uZXJCdWxsZXRIZWlnaHQgPSB0cmFjZS5nYXVnZS5iYXIudGhpY2tuZXNzICogYnVsbGV0SGVpZ2h0O1xuICAgIHZhciBidWxsZXRMZWZ0ID0gZG9tYWluLnhbMF07XG4gICAgdmFyIGJ1bGxldFJpZ2h0ID0gZG9tYWluLnhbMF0gKyAoZG9tYWluLnhbMV0gLSBkb21haW4ueFswXSkgKiAoKHRyYWNlLl9oYXNOdW1iZXIgfHwgdHJhY2UuX2hhc0RlbHRhKSA/ICgxIC0gY24uYnVsbGV0TnVtYmVyRG9tYWluU2l6ZSkgOiAxKTtcblxuICAgIGF4ID0gbW9ja0F4aXMoZ2QsIHRyYWNlLmdhdWdlLmF4aXMpO1xuICAgIGF4Ll9pZCA9ICd4YnVsbGV0YXhpcyc7XG4gICAgYXguZG9tYWluID0gW2J1bGxldExlZnQsIGJ1bGxldFJpZ2h0XTtcbiAgICBheC5zZXRTY2FsZSgpO1xuXG4gICAgdmFscyA9IEF4ZXMuY2FsY1RpY2tzKGF4KTtcbiAgICB0cmFuc0ZuID0gQXhlcy5tYWtlVHJhbnNGbihheCk7XG4gICAgdGlja1NpZ24gPSBBeGVzLmdldFRpY2tTaWducyhheClbMl07XG5cbiAgICBzaGlmdCA9IHNpemUudCArIHNpemUuaDtcbiAgICBpZihheC52aXNpYmxlKSB7XG4gICAgICAgIEF4ZXMuZHJhd1RpY2tzKGdkLCBheCwge1xuICAgICAgICAgICAgdmFsczogYXgudGlja3MgPT09ICdpbnNpZGUnID8gQXhlcy5jbGlwRW5kcyhheCwgdmFscykgOiB2YWxzLFxuICAgICAgICAgICAgbGF5ZXI6IGF4aXNMYXllcixcbiAgICAgICAgICAgIHBhdGg6IEF4ZXMubWFrZVRpY2tQYXRoKGF4LCBzaGlmdCwgdGlja1NpZ24pLFxuICAgICAgICAgICAgdHJhbnNGbjogdHJhbnNGblxuICAgICAgICB9KTtcblxuICAgICAgICBBeGVzLmRyYXdMYWJlbHMoZ2QsIGF4LCB7XG4gICAgICAgICAgICB2YWxzOiB2YWxzLFxuICAgICAgICAgICAgbGF5ZXI6IGF4aXNMYXllcixcbiAgICAgICAgICAgIHRyYW5zRm46IHRyYW5zRm4sXG4gICAgICAgICAgICBsYWJlbEZuczogQXhlcy5tYWtlTGFiZWxGbnMoYXgsIHNoaWZ0KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3UmVjdChzKSB7XG4gICAgICAgIHNcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGgubWF4KDAsIGF4LmMycChkLnJhbmdlWzFdKSAtIGF4LmMycChkLnJhbmdlWzBdKSk7fSlcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gYXguYzJwKGQucmFuZ2VbMF0pO30pXG4gICAgICAgICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIDAuNSAqICgxIC0gZC50aGlja25lc3MpICogYnVsbGV0SGVpZ2h0O30pXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50aGlja25lc3MgKiBidWxsZXRIZWlnaHQ7IH0pO1xuICAgIH1cblxuICAgIC8vIERyYXcgYnVsbGV0IGJhY2tncm91bmQsIHN0ZXBzXG4gICAgdmFyIGJveGVzID0gW2dhdWdlQmddLmNvbmNhdCh0cmFjZS5nYXVnZS5zdGVwcyk7XG4gICAgdmFyIGJnQnVsbGV0ID0gYnVsbGV0LnNlbGVjdEFsbCgnZy5iZy1idWxsZXQnKS5kYXRhKGJveGVzKTtcbiAgICBiZ0J1bGxldC5lbnRlcigpLmFwcGVuZCgnZycpLmNsYXNzZWQoJ2JnLWJ1bGxldCcsIHRydWUpLmFwcGVuZCgncmVjdCcpO1xuICAgIGJnQnVsbGV0LnNlbGVjdCgncmVjdCcpXG4gICAgICAgIC5jYWxsKGRyYXdSZWN0KVxuICAgICAgICAuY2FsbChzdHlsZVNoYXBlKTtcbiAgICBiZ0J1bGxldC5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAvLyBEcmF3IHZhbHVlIGJhciB3aXRoIHRyYW5zaXRpb25zXG4gICAgdmFyIGZnQnVsbGV0ID0gYnVsbGV0LnNlbGVjdEFsbCgnZy52YWx1ZS1idWxsZXQnKS5kYXRhKFt0cmFjZS5nYXVnZS5iYXJdKTtcbiAgICBmZ0J1bGxldC5lbnRlcigpLmFwcGVuZCgnZycpLmNsYXNzZWQoJ3ZhbHVlLWJ1bGxldCcsIHRydWUpLmFwcGVuZCgncmVjdCcpO1xuICAgIGZnQnVsbGV0LnNlbGVjdCgncmVjdCcpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBpbm5lckJ1bGxldEhlaWdodClcbiAgICAgICAgLmF0dHIoJ3knLCAoYnVsbGV0SGVpZ2h0IC0gaW5uZXJCdWxsZXRIZWlnaHQpIC8gMilcbiAgICAgICAgLmNhbGwoc3R5bGVTaGFwZSk7XG4gICAgaWYoaGFzVHJhbnNpdGlvbih0cmFuc2l0aW9uT3B0cykpIHtcbiAgICAgICAgZmdCdWxsZXQuc2VsZWN0KCdyZWN0JylcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbih0cmFuc2l0aW9uT3B0cy5kdXJhdGlvbilcbiAgICAgICAgICAgIC5lYXNlKHRyYW5zaXRpb25PcHRzLmVhc2luZylcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHsgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7IH0pXG4gICAgICAgICAgICAuZWFjaCgnaW50ZXJydXB0JywgZnVuY3Rpb24oKSB7IG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZSgpOyB9KVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgTWF0aC5tYXgoMCwgYXguYzJwKE1hdGgubWluKHRyYWNlLmdhdWdlLmF4aXMucmFuZ2VbMV0sIGNkWzBdLnkpKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZnQnVsbGV0LnNlbGVjdCgncmVjdCcpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0eXBlb2YgY2RbMF0ueSA9PT0gJ251bWJlcicgP1xuICAgICAgICAgICAgICAgIE1hdGgubWF4KDAsIGF4LmMycChNYXRoLm1pbih0cmFjZS5nYXVnZS5heGlzLnJhbmdlWzFdLCBjZFswXS55KSkpIDpcbiAgICAgICAgICAgICAgICAwKTtcbiAgICB9XG4gICAgZmdCdWxsZXQuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgdmFyIGRhdGEgPSBjZC5maWx0ZXIoZnVuY3Rpb24oKSB7cmV0dXJuIHRyYWNlLmdhdWdlLnRocmVzaG9sZC52YWx1ZTt9KTtcbiAgICB2YXIgdGhyZXNob2xkID0gYnVsbGV0LnNlbGVjdEFsbCgnZy50aHJlc2hvbGQtYnVsbGV0JykuZGF0YShkYXRhKTtcbiAgICB0aHJlc2hvbGQuZW50ZXIoKS5hcHBlbmQoJ2cnKS5jbGFzc2VkKCd0aHJlc2hvbGQtYnVsbGV0JywgdHJ1ZSkuYXBwZW5kKCdsaW5lJyk7XG4gICAgdGhyZXNob2xkLnNlbGVjdCgnbGluZScpXG4gICAgICAgIC5hdHRyKCd4MScsIGF4LmMycCh0cmFjZS5nYXVnZS50aHJlc2hvbGQudmFsdWUpKVxuICAgICAgICAuYXR0cigneDInLCBheC5jMnAodHJhY2UuZ2F1Z2UudGhyZXNob2xkLnZhbHVlKSlcbiAgICAgICAgLmF0dHIoJ3kxJywgKDEgLSB0cmFjZS5nYXVnZS50aHJlc2hvbGQudGhpY2tuZXNzKSAvIDIgKiBidWxsZXRIZWlnaHQpXG4gICAgICAgIC5hdHRyKCd5MicsICgxIC0gKDEgLSB0cmFjZS5nYXVnZS50aHJlc2hvbGQudGhpY2tuZXNzKSAvIDIpICogYnVsbGV0SGVpZ2h0KVxuICAgICAgICAuY2FsbChDb2xvci5zdHJva2UsIHRyYWNlLmdhdWdlLnRocmVzaG9sZC5saW5lLmNvbG9yKVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIHRyYWNlLmdhdWdlLnRocmVzaG9sZC5saW5lLndpZHRoKTtcbiAgICB0aHJlc2hvbGQuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgdmFyIGJ1bGxldE91dGxpbmUgPSBidWxsZXQuc2VsZWN0QWxsKCdnLmdhdWdlLW91dGxpbmUnKS5kYXRhKFtnYXVnZU91dGxpbmVdKTtcbiAgICBidWxsZXRPdXRsaW5lLmVudGVyKCkuYXBwZW5kKCdnJykuY2xhc3NlZCgnZ2F1Z2Utb3V0bGluZScsIHRydWUpLmFwcGVuZCgncmVjdCcpO1xuICAgIGJ1bGxldE91dGxpbmUuc2VsZWN0KCdyZWN0JylcbiAgICAgICAgLmNhbGwoZHJhd1JlY3QpXG4gICAgICAgIC5jYWxsKHN0eWxlU2hhcGUpO1xuICAgIGJ1bGxldE91dGxpbmUuZXhpdCgpLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBkcmF3QW5ndWxhckdhdWdlKGdkLCBwbG90R3JvdXAsIGNkLCBvcHRzKSB7XG4gICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG5cbiAgICB2YXIgc2l6ZSA9IG9wdHMuc2l6ZTtcbiAgICB2YXIgcmFkaXVzID0gb3B0cy5yYWRpdXM7XG4gICAgdmFyIGlubmVyUmFkaXVzID0gb3B0cy5pbm5lclJhZGl1cztcbiAgICB2YXIgZ2F1Z2VCZyA9IG9wdHMuZ2F1Z2VCZztcbiAgICB2YXIgZ2F1Z2VPdXRsaW5lID0gb3B0cy5nYXVnZU91dGxpbmU7XG4gICAgdmFyIGdhdWdlUG9zaXRpb24gPSBbc2l6ZS5sICsgc2l6ZS53IC8gMiwgc2l6ZS50ICsgc2l6ZS5oIC8gMiArIHJhZGl1cyAvIDJdO1xuICAgIHZhciBnYXVnZSA9IG9wdHMuZ2F1Z2U7XG4gICAgdmFyIGF4aXNMYXllciA9IG9wdHMubGF5ZXI7XG5cbiAgICB2YXIgdHJhbnNpdGlvbk9wdHMgPSBvcHRzLnRyYW5zaXRpb25PcHRzO1xuICAgIHZhciBvbkNvbXBsZXRlID0gb3B0cy5vbkNvbXBsZXRlO1xuXG4gICAgLy8gY2lyY3VsYXIgZ2F1Z2VcbiAgICB2YXIgdGhldGEgPSBNYXRoLlBJIC8gMjtcbiAgICBmdW5jdGlvbiB2YWx1ZVRvQW5nbGUodikge1xuICAgICAgICB2YXIgbWluID0gdHJhY2UuZ2F1Z2UuYXhpcy5yYW5nZVswXTtcbiAgICAgICAgdmFyIG1heCA9IHRyYWNlLmdhdWdlLmF4aXMucmFuZ2VbMV07XG4gICAgICAgIHZhciBhbmdsZSA9ICh2IC0gbWluKSAvIChtYXggLSBtaW4pICogTWF0aC5QSSAtIHRoZXRhO1xuICAgICAgICBpZihhbmdsZSA8IC10aGV0YSkgcmV0dXJuIC10aGV0YTtcbiAgICAgICAgaWYoYW5nbGUgPiB0aGV0YSkgcmV0dXJuIHRoZXRhO1xuICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXJjUGF0aEdlbmVyYXRvcihzaXplKSB7XG4gICAgICAgIHJldHVybiBkMy5zdmcuYXJjKClcbiAgICAgICAgICAgICAgICAgIC5pbm5lclJhZGl1cygoaW5uZXJSYWRpdXMgKyByYWRpdXMpIC8gMiAtIHNpemUgLyAyICogKHJhZGl1cyAtIGlubmVyUmFkaXVzKSlcbiAgICAgICAgICAgICAgICAgIC5vdXRlclJhZGl1cygoaW5uZXJSYWRpdXMgKyByYWRpdXMpIC8gMiArIHNpemUgLyAyICogKHJhZGl1cyAtIGlubmVyUmFkaXVzKSlcbiAgICAgICAgICAgICAgICAgIC5zdGFydEFuZ2xlKC10aGV0YSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0FyYyhwKSB7XG4gICAgICAgIHBcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcmNQYXRoR2VuZXJhdG9yKGQudGhpY2tuZXNzKVxuICAgICAgICAgICAgICAgICAgLnN0YXJ0QW5nbGUodmFsdWVUb0FuZ2xlKGQucmFuZ2VbMF0pKVxuICAgICAgICAgICAgICAgICAgLmVuZEFuZ2xlKHZhbHVlVG9BbmdsZShkLnJhbmdlWzFdKSkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHByZXBhcmluZyBheGlzXG4gICAgdmFyIGF4LCB2YWxzLCB0cmFuc0ZuLCB0aWNrU2lnbjtcblxuICAgIC8vIEVudGVyIGdhdWdlIGFuZCBheGlzXG4gICAgZ2F1Z2UuZW50ZXIoKS5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdhbmd1bGFyJywgdHJ1ZSk7XG4gICAgZ2F1Z2UuYXR0cigndHJhbnNmb3JtJywgc3RyVHJhbnNsYXRlKGdhdWdlUG9zaXRpb25bMF0sIGdhdWdlUG9zaXRpb25bMV0pKTtcblxuICAgIGF4aXNMYXllci5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKCdhbmd1bGFyYXhpcycsIHRydWUpXG4gICAgICAgIC5jbGFzc2VkKCdjcmlzcCcsIHRydWUpO1xuICAgIGF4aXNMYXllci5zZWxlY3RBbGwoJ2cuJyArICd4YW5ndWxhcmF4aXMnICsgJ3RpY2sscGF0aCx0ZXh0JykucmVtb3ZlKCk7XG5cbiAgICBheCA9IG1vY2tBeGlzKGdkLCB0cmFjZS5nYXVnZS5heGlzKTtcbiAgICBheC50eXBlID0gJ2xpbmVhcic7XG4gICAgYXgucmFuZ2UgPSB0cmFjZS5nYXVnZS5heGlzLnJhbmdlO1xuICAgIGF4Ll9pZCA9ICd4YW5ndWxhcmF4aXMnOyAvLyBvciAneScsIGJ1dCBJIGRvbid0IHRoaW5rIHRoaXMgbWFrZXMgYSBkaWZmZXJlbmNlIGhlcmVcbiAgICBheC5zZXRTY2FsZSgpO1xuXG4gICAgLy8gJ3QnaWNrIHRvICdnJ2VvbWV0cmljIHJhZGlhbnMgaXMgdXNlZCBhbGwgb3ZlciB0aGUgcGxhY2UgaGVyZVxuICAgIHZhciB0MmcgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAoYXgucmFuZ2VbMF0gLSBkLngpIC8gKGF4LnJhbmdlWzFdIC0gYXgucmFuZ2VbMF0pICogTWF0aC5QSSArIE1hdGguUEk7XG4gICAgfTtcblxuICAgIHZhciBsYWJlbEZucyA9IHt9O1xuICAgIHZhciBvdXQgPSBBeGVzLm1ha2VMYWJlbEZucyhheCwgMCk7XG4gICAgdmFyIGxhYmVsU3RhbmRvZmYgPSBvdXQubGFiZWxTdGFuZG9mZjtcbiAgICBsYWJlbEZucy54Rm4gPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciByYWQgPSB0MmcoZCk7XG4gICAgICAgIHJldHVybiBNYXRoLmNvcyhyYWQpICogbGFiZWxTdGFuZG9mZjtcbiAgICB9O1xuICAgIGxhYmVsRm5zLnlGbiA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHJhZCA9IHQyZyhkKTtcbiAgICAgICAgdmFyIGZmID0gTWF0aC5zaW4ocmFkKSA+IDAgPyAwLjIgOiAxO1xuICAgICAgICByZXR1cm4gLU1hdGguc2luKHJhZCkgKiAobGFiZWxTdGFuZG9mZiArIGQuZm9udFNpemUgKiBmZikgK1xuICAgICAgICAgICAgICAgIE1hdGguYWJzKE1hdGguY29zKHJhZCkpICogKGQuZm9udFNpemUgKiBNSURfU0hJRlQpO1xuICAgIH07XG4gICAgbGFiZWxGbnMuYW5jaG9yRm4gPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciByYWQgPSB0MmcoZCk7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICByZXR1cm4gTWF0aC5hYnMoY29zKSA8IDAuMSA/XG4gICAgICAgICAgICAgICAgJ21pZGRsZScgOlxuICAgICAgICAgICAgICAgIChjb3MgPiAwID8gJ3N0YXJ0JyA6ICdlbmQnKTtcbiAgICB9O1xuICAgIGxhYmVsRm5zLmhlaWdodEZuID0gZnVuY3Rpb24oZCwgYSwgaCkge1xuICAgICAgICB2YXIgcmFkID0gdDJnKGQpO1xuICAgICAgICByZXR1cm4gLTAuNSAqICgxICsgTWF0aC5zaW4ocmFkKSkgKiBoO1xuICAgIH07XG4gICAgdmFyIF90cmFuc0ZuID0gZnVuY3Rpb24ocmFkKSB7XG4gICAgICAgIHJldHVybiBzdHJUcmFuc2xhdGUoXG4gICAgICAgICAgICBnYXVnZVBvc2l0aW9uWzBdICsgcmFkaXVzICogTWF0aC5jb3MocmFkKSxcbiAgICAgICAgICAgIGdhdWdlUG9zaXRpb25bMV0gLSByYWRpdXMgKiBNYXRoLnNpbihyYWQpXG4gICAgICAgICk7XG4gICAgfTtcbiAgICB0cmFuc0ZuID0gZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gX3RyYW5zRm4odDJnKGQpKTtcbiAgICB9O1xuICAgIHZhciB0cmFuc0ZuMiA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHJhZCA9IHQyZyhkKTtcbiAgICAgICAgcmV0dXJuIF90cmFuc0ZuKHJhZCkgKyAncm90YXRlKCcgKyAtcmFkMmRlZyhyYWQpICsgJyknO1xuICAgIH07XG4gICAgdmFscyA9IEF4ZXMuY2FsY1RpY2tzKGF4KTtcbiAgICB0aWNrU2lnbiA9IEF4ZXMuZ2V0VGlja1NpZ25zKGF4KVsyXTtcbiAgICBpZihheC52aXNpYmxlKSB7XG4gICAgICAgIHRpY2tTaWduID0gYXgudGlja3MgPT09ICdpbnNpZGUnID8gLTEgOiAxO1xuICAgICAgICB2YXIgcGFkID0gKGF4LmxpbmV3aWR0aCB8fCAxKSAvIDI7XG4gICAgICAgIEF4ZXMuZHJhd1RpY2tzKGdkLCBheCwge1xuICAgICAgICAgICAgdmFsczogdmFscyxcbiAgICAgICAgICAgIGxheWVyOiBheGlzTGF5ZXIsXG4gICAgICAgICAgICBwYXRoOiAnTScgKyAodGlja1NpZ24gKiBwYWQpICsgJywwaCcgKyAodGlja1NpZ24gKiBheC50aWNrbGVuKSxcbiAgICAgICAgICAgIHRyYW5zRm46IHRyYW5zRm4yXG4gICAgICAgIH0pO1xuICAgICAgICBBeGVzLmRyYXdMYWJlbHMoZ2QsIGF4LCB7XG4gICAgICAgICAgICB2YWxzOiB2YWxzLFxuICAgICAgICAgICAgbGF5ZXI6IGF4aXNMYXllcixcbiAgICAgICAgICAgIHRyYW5zRm46IHRyYW5zRm4sXG4gICAgICAgICAgICBsYWJlbEZuczogbGFiZWxGbnNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRHJhdyBiYWNrZ3JvdW5kICsgc3RlcHNcbiAgICB2YXIgYXJjcyA9IFtnYXVnZUJnXS5jb25jYXQodHJhY2UuZ2F1Z2Uuc3RlcHMpO1xuICAgIHZhciBiZ0FyYyA9IGdhdWdlLnNlbGVjdEFsbCgnZy5iZy1hcmMnKS5kYXRhKGFyY3MpO1xuICAgIGJnQXJjLmVudGVyKCkuYXBwZW5kKCdnJykuY2xhc3NlZCgnYmctYXJjJywgdHJ1ZSkuYXBwZW5kKCdwYXRoJyk7XG4gICAgYmdBcmMuc2VsZWN0KCdwYXRoJykuY2FsbChkcmF3QXJjKS5jYWxsKHN0eWxlU2hhcGUpO1xuICAgIGJnQXJjLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIC8vIERyYXcgZm9yZWdyb3VuZCB3aXRoIHRyYW5zaXRpb25cbiAgICB2YXIgdmFsdWVBcmNQYXRoR2VuZXJhdG9yID0gYXJjUGF0aEdlbmVyYXRvcih0cmFjZS5nYXVnZS5iYXIudGhpY2tuZXNzKTtcbiAgICB2YXIgdmFsdWVBcmMgPSBnYXVnZS5zZWxlY3RBbGwoJ2cudmFsdWUtYXJjJykuZGF0YShbdHJhY2UuZ2F1Z2UuYmFyXSk7XG4gICAgdmFsdWVBcmMuZW50ZXIoKS5hcHBlbmQoJ2cnKS5jbGFzc2VkKCd2YWx1ZS1hcmMnLCB0cnVlKS5hcHBlbmQoJ3BhdGgnKTtcbiAgICB2YXIgdmFsdWVBcmNQYXRoID0gdmFsdWVBcmMuc2VsZWN0KCdwYXRoJyk7XG4gICAgaWYoaGFzVHJhbnNpdGlvbih0cmFuc2l0aW9uT3B0cykpIHtcbiAgICAgICAgdmFsdWVBcmNQYXRoXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24odHJhbnNpdGlvbk9wdHMuZHVyYXRpb24pXG4gICAgICAgICAgICAuZWFzZSh0cmFuc2l0aW9uT3B0cy5lYXNpbmcpXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7IG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZSgpOyB9KVxuICAgICAgICAgICAgLmVhY2goJ2ludGVycnVwdCcsIGZ1bmN0aW9uKCkgeyBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoKTsgfSlcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ2QnLCBhcmNUd2Vlbih2YWx1ZUFyY1BhdGhHZW5lcmF0b3IsIHZhbHVlVG9BbmdsZShjZFswXS5sYXN0WSksIHZhbHVlVG9BbmdsZShjZFswXS55KSkpO1xuICAgICAgICB0cmFjZS5fbGFzdFZhbHVlID0gY2RbMF0ueTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZUFyY1BhdGguYXR0cignZCcsIHR5cGVvZiBjZFswXS55ID09PSAnbnVtYmVyJyA/XG4gICAgICAgICAgICB2YWx1ZUFyY1BhdGhHZW5lcmF0b3IuZW5kQW5nbGUodmFsdWVUb0FuZ2xlKGNkWzBdLnkpKSA6XG4gICAgICAgICAgICAnTTAsMFonKTtcbiAgICB9XG4gICAgdmFsdWVBcmNQYXRoLmNhbGwoc3R5bGVTaGFwZSk7XG4gICAgdmFsdWVBcmMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgLy8gRHJhdyB0aHJlc2hvbGRcbiAgICBhcmNzID0gW107XG4gICAgdmFyIHYgPSB0cmFjZS5nYXVnZS50aHJlc2hvbGQudmFsdWU7XG4gICAgaWYodikge1xuICAgICAgICBhcmNzLnB1c2goe1xuICAgICAgICAgICAgcmFuZ2U6IFt2LCB2XSxcbiAgICAgICAgICAgIGNvbG9yOiB0cmFjZS5nYXVnZS50aHJlc2hvbGQuY29sb3IsXG4gICAgICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHRyYWNlLmdhdWdlLnRocmVzaG9sZC5saW5lLmNvbG9yLFxuICAgICAgICAgICAgICAgIHdpZHRoOiB0cmFjZS5nYXVnZS50aHJlc2hvbGQubGluZS53aWR0aFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaWNrbmVzczogdHJhY2UuZ2F1Z2UudGhyZXNob2xkLnRoaWNrbmVzc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHRocmVzaG9sZEFyYyA9IGdhdWdlLnNlbGVjdEFsbCgnZy50aHJlc2hvbGQtYXJjJykuZGF0YShhcmNzKTtcbiAgICB0aHJlc2hvbGRBcmMuZW50ZXIoKS5hcHBlbmQoJ2cnKS5jbGFzc2VkKCd0aHJlc2hvbGQtYXJjJywgdHJ1ZSkuYXBwZW5kKCdwYXRoJyk7XG4gICAgdGhyZXNob2xkQXJjLnNlbGVjdCgncGF0aCcpLmNhbGwoZHJhd0FyYykuY2FsbChzdHlsZVNoYXBlKTtcbiAgICB0aHJlc2hvbGRBcmMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgLy8gRHJhdyBib3JkZXIgbGFzdFxuICAgIHZhciBnYXVnZUJvcmRlciA9IGdhdWdlLnNlbGVjdEFsbCgnZy5nYXVnZS1vdXRsaW5lJykuZGF0YShbZ2F1Z2VPdXRsaW5lXSk7XG4gICAgZ2F1Z2VCb3JkZXIuZW50ZXIoKS5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdnYXVnZS1vdXRsaW5lJywgdHJ1ZSkuYXBwZW5kKCdwYXRoJyk7XG4gICAgZ2F1Z2VCb3JkZXIuc2VsZWN0KCdwYXRoJykuY2FsbChkcmF3QXJjKS5jYWxsKHN0eWxlU2hhcGUpO1xuICAgIGdhdWdlQm9yZGVyLmV4aXQoKS5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gZHJhd051bWJlcnMoZ2QsIHBsb3RHcm91cCwgY2QsIG9wdHMpIHtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcblxuICAgIHZhciBudW1iZXJzWCA9IG9wdHMubnVtYmVyc1g7XG4gICAgdmFyIG51bWJlcnNZID0gb3B0cy5udW1iZXJzWTtcbiAgICB2YXIgbnVtYmVyc0FsaWduID0gdHJhY2UuYWxpZ24gfHwgJ2NlbnRlcic7XG4gICAgdmFyIG51bWJlcnNBbmNob3IgPSBhbmNob3JbbnVtYmVyc0FsaWduXTtcblxuICAgIHZhciB0cmFuc2l0aW9uT3B0cyA9IG9wdHMudHJhbnNpdGlvbk9wdHM7XG4gICAgdmFyIG9uQ29tcGxldGUgPSBvcHRzLm9uQ29tcGxldGU7XG5cbiAgICB2YXIgbnVtYmVycyA9IExpYi5lbnN1cmVTaW5nbGUocGxvdEdyb3VwLCAnZycsICdudW1iZXJzJyk7XG4gICAgdmFyIGJpZ251bWJlcmJCb3gsIGRlbHRhYkJveDtcbiAgICB2YXIgbnVtYmVyc2JCb3g7XG5cbiAgICB2YXIgZGF0YSA9IFtdO1xuICAgIGlmKHRyYWNlLl9oYXNOdW1iZXIpIGRhdGEucHVzaCgnbnVtYmVyJyk7XG4gICAgaWYodHJhY2UuX2hhc0RlbHRhKSB7XG4gICAgICAgIGRhdGEucHVzaCgnZGVsdGEnKTtcbiAgICAgICAgaWYodHJhY2UuZGVsdGEucG9zaXRpb24gPT09ICdsZWZ0JykgZGF0YS5yZXZlcnNlKCk7XG4gICAgfVxuICAgIHZhciBzZWwgPSBudW1iZXJzLnNlbGVjdEFsbCgndGV4dCcpLmRhdGEoZGF0YSk7XG4gICAgc2VsLmVudGVyKCkuYXBwZW5kKCd0ZXh0Jyk7XG4gICAgc2VsXG4gICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsIGZ1bmN0aW9uKCkge3JldHVybiBudW1iZXJzQW5jaG9yO30pXG4gICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQ7fSlcbiAgICAgICAgLmF0dHIoJ3gnLCBudWxsKVxuICAgICAgICAuYXR0cigneScsIG51bGwpXG4gICAgICAgIC5hdHRyKCdkeCcsIG51bGwpXG4gICAgICAgIC5hdHRyKCdkeScsIG51bGwpO1xuICAgIHNlbC5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAvLyBGdW5jdGlvbiB0byBvdmVycmlkZSB0aGUgbnVtYmVyIGZvcm1hdHRpbmcgdXNlZCBkdXJpbmcgdHJhbnNpdGlvbnNcbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRm9ybWF0KHZhbHVlZm9ybWF0LCBmbXQsIGZyb20sIHRvKSB7XG4gICAgICAgIC8vIEZvciBub3csIGRvIG5vdCBkaXNwbGF5IFNJIHByZWZpeCBpZiBzdGFydCBhbmQgZW5kIHZhbHVlIGRvIG5vdCBoYXZlIGFueVxuICAgICAgICBpZih2YWx1ZWZvcm1hdC5tYXRjaCgncycpICYmIC8vIElmIHVzaW5nIFNJIHByZWZpeFxuICAgICAgICAgICAgKGZyb20gPj0gMCAhPT0gdG8gPj0gMCkgJiYgLy8gSWYgc2lnbiBjaGFuZ2VcbiAgICAgICAgICAgICghZm10KGZyb20pLnNsaWNlKC0xKS5tYXRjaChTSV9QUkVGSVgpICYmICFmbXQodG8pLnNsaWNlKC0xKS5tYXRjaChTSV9QUkVGSVgpKSAvLyBIYXMgbm8gU0kgcHJlZml4XG4gICAgICAgICkge1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25WYWx1ZUZvcm1hdCA9IHZhbHVlZm9ybWF0LnNsaWNlKCkucmVwbGFjZSgncycsICdmJykucmVwbGFjZSgvXFxkKy8sIGZ1bmN0aW9uKG0pIHsgcmV0dXJuIHBhcnNlSW50KG0pIC0gMTt9KTtcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uQXggPSBtb2NrQXhpcyhnZCwge3RpY2tmb3JtYXQ6IHRyYW5zaXRpb25WYWx1ZUZvcm1hdH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICAvLyBTd2l0Y2ggdG8gZml4ZWQgcHJlY2lzaW9uIGlmIG51bWJlciBpcyBzbWFsbGVyIHRoYW4gb25lXG4gICAgICAgICAgICAgICAgaWYoTWF0aC5hYnModikgPCAxKSByZXR1cm4gQXhlcy50aWNrVGV4dCh0cmFuc2l0aW9uQXgsIHYpLnRleHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZtdCh2KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm10O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0JpZ251bWJlcigpIHtcbiAgICAgICAgdmFyIGJpZ251bWJlckF4ID0gbW9ja0F4aXMoZ2QsIHt0aWNrZm9ybWF0OiB0cmFjZS5udW1iZXIudmFsdWVmb3JtYXR9LCB0cmFjZS5fcmFuZ2UpO1xuICAgICAgICBiaWdudW1iZXJBeC5zZXRTY2FsZSgpO1xuICAgICAgICBBeGVzLnByZXBUaWNrcyhiaWdudW1iZXJBeCk7XG5cbiAgICAgICAgdmFyIGZtdCA9IGZ1bmN0aW9uKHYpIHsgcmV0dXJuIEF4ZXMudGlja1RleHQoYmlnbnVtYmVyQXgsIHYpLnRleHQ7fTtcbiAgICAgICAgdmFyIGJpZ251bWJlclN1ZmZpeCA9IHRyYWNlLm51bWJlci5zdWZmaXg7XG4gICAgICAgIHZhciBiaWdudW1iZXJQcmVmaXggPSB0cmFjZS5udW1iZXIucHJlZml4O1xuXG4gICAgICAgIHZhciBudW1iZXIgPSBudW1iZXJzLnNlbGVjdCgndGV4dC5udW1iZXInKTtcblxuICAgICAgICBmdW5jdGlvbiB3cml0ZU51bWJlcigpIHtcbiAgICAgICAgICAgIHZhciB0eHQgPSB0eXBlb2YgY2RbMF0ueSA9PT0gJ251bWJlcicgP1xuICAgICAgICAgICAgICAgIGJpZ251bWJlclByZWZpeCArIGZtdChjZFswXS55KSArIGJpZ251bWJlclN1ZmZpeCA6XG4gICAgICAgICAgICAgICAgJy0nO1xuICAgICAgICAgICAgbnVtYmVyLnRleHQodHh0KVxuICAgICAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgdHJhY2UubnVtYmVyLmZvbnQpXG4gICAgICAgICAgICAgICAgLmNhbGwoc3ZnVGV4dFV0aWxzLmNvbnZlcnRUb1RzcGFucywgZ2QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaGFzVHJhbnNpdGlvbih0cmFuc2l0aW9uT3B0cykpIHtcbiAgICAgICAgICAgIG51bWJlclxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24odHJhbnNpdGlvbk9wdHMuZHVyYXRpb24pXG4gICAgICAgICAgICAgICAgLmVhc2UodHJhbnNpdGlvbk9wdHMuZWFzaW5nKVxuICAgICAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHsgd3JpdGVOdW1iZXIoKTsgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7IH0pXG4gICAgICAgICAgICAgICAgLmVhY2goJ2ludGVycnVwdCcsIGZ1bmN0aW9uKCkgeyB3cml0ZU51bWJlcigpOyBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoKTsgfSlcbiAgICAgICAgICAgICAgICAuYXR0clR3ZWVuKCd0ZXh0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW50ZXJwb2xhdG9yID0gZDMuaW50ZXJwb2xhdGVOdW1iZXIoY2RbMF0ubGFzdFksIGNkWzBdLnkpO1xuICAgICAgICAgICAgICAgICAgICB0cmFjZS5fbGFzdFZhbHVlID0gY2RbMF0ueTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbkZtdCA9IHRyYW5zaXRpb25Gb3JtYXQodHJhY2UubnVtYmVyLnZhbHVlZm9ybWF0LCBmbXQsIGNkWzBdLmxhc3RZLCBjZFswXS55KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGV4dChiaWdudW1iZXJQcmVmaXggKyB0cmFuc2l0aW9uRm10KGludGVycG9sYXRvcih0KSkgKyBiaWdudW1iZXJTdWZmaXgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3JpdGVOdW1iZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJpZ251bWJlcmJCb3ggPSBtZWFzdXJlVGV4dChiaWdudW1iZXJQcmVmaXggKyBmbXQoY2RbMF0ueSkgKyBiaWdudW1iZXJTdWZmaXgsIHRyYWNlLm51bWJlci5mb250LCBudW1iZXJzQW5jaG9yLCBnZCk7XG4gICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0RlbHRhKCkge1xuICAgICAgICB2YXIgZGVsdGFBeCA9IG1vY2tBeGlzKGdkLCB7dGlja2Zvcm1hdDogdHJhY2UuZGVsdGEudmFsdWVmb3JtYXR9LCB0cmFjZS5fcmFuZ2UpO1xuICAgICAgICBkZWx0YUF4LnNldFNjYWxlKCk7XG4gICAgICAgIEF4ZXMucHJlcFRpY2tzKGRlbHRhQXgpO1xuXG4gICAgICAgIHZhciBkZWx0YUZtdCA9IGZ1bmN0aW9uKHYpIHsgcmV0dXJuIEF4ZXMudGlja1RleHQoZGVsdGFBeCwgdikudGV4dDt9O1xuICAgICAgICB2YXIgZGVsdGFWYWx1ZSA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRyYWNlLmRlbHRhLnJlbGF0aXZlID8gZC5yZWxhdGl2ZURlbHRhIDogZC5kZWx0YTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGRlbHRhRm9ybWF0VGV4dCA9IGZ1bmN0aW9uKHZhbHVlLCBudW1iZXJGbXQpIHtcbiAgICAgICAgICAgIGlmKHZhbHVlID09PSAwIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgaXNOYU4odmFsdWUpKSByZXR1cm4gJy0nO1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSA+IDAgPyB0cmFjZS5kZWx0YS5pbmNyZWFzaW5nLnN5bWJvbCA6IHRyYWNlLmRlbHRhLmRlY3JlYXNpbmcuc3ltYm9sKSArIG51bWJlckZtdCh2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBkZWx0YUZpbGwgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5kZWx0YSA+PSAwID8gdHJhY2UuZGVsdGEuaW5jcmVhc2luZy5jb2xvciA6IHRyYWNlLmRlbHRhLmRlY3JlYXNpbmcuY29sb3I7XG4gICAgICAgIH07XG4gICAgICAgIGlmKHRyYWNlLl9kZWx0YUxhc3RWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0cmFjZS5fZGVsdGFMYXN0VmFsdWUgPSBkZWx0YVZhbHVlKGNkWzBdKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsdGEgPSBudW1iZXJzLnNlbGVjdCgndGV4dC5kZWx0YScpO1xuICAgICAgICBkZWx0YVxuICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5mb250LCB0cmFjZS5kZWx0YS5mb250KVxuICAgICAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgZGVsdGFGaWxsKHtkZWx0YTogdHJhY2UuX2RlbHRhTGFzdFZhbHVlfSkpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRGVsdGEoKSB7XG4gICAgICAgICAgICBkZWx0YS50ZXh0KGRlbHRhRm9ybWF0VGV4dChkZWx0YVZhbHVlKGNkWzBdKSwgZGVsdGFGbXQpKVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLmZpbGwsIGRlbHRhRmlsbChjZFswXSkpXG4gICAgICAgICAgICAgICAgLmNhbGwoc3ZnVGV4dFV0aWxzLmNvbnZlcnRUb1RzcGFucywgZ2QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaGFzVHJhbnNpdGlvbih0cmFuc2l0aW9uT3B0cykpIHtcbiAgICAgICAgICAgIGRlbHRhXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbih0cmFuc2l0aW9uT3B0cy5kdXJhdGlvbilcbiAgICAgICAgICAgICAgICAuZWFzZSh0cmFuc2l0aW9uT3B0cy5lYXNpbmcpXG4gICAgICAgICAgICAgICAgLnR3ZWVuKCd0ZXh0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG8gPSBkZWx0YVZhbHVlKGNkWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZyb20gPSB0cmFjZS5fZGVsdGFMYXN0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uRm10ID0gdHJhbnNpdGlvbkZvcm1hdCh0cmFjZS5kZWx0YS52YWx1ZWZvcm1hdCwgZGVsdGFGbXQsIGZyb20sIHRvKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGludGVycG9sYXRvciA9IGQzLmludGVycG9sYXRlTnVtYmVyKGZyb20sIHRvKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2UuX2RlbHRhTGFzdFZhbHVlID0gdG87XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRleHQoZGVsdGFGb3JtYXRUZXh0KGludGVycG9sYXRvcih0KSwgdHJhbnNpdGlvbkZtdCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKENvbG9yLmZpbGwsIGRlbHRhRmlsbCh7ZGVsdGE6IGludGVycG9sYXRvcih0KX0pKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHsgd3JpdGVEZWx0YSgpOyBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoKTsgfSlcbiAgICAgICAgICAgICAgICAuZWFjaCgnaW50ZXJydXB0JywgZnVuY3Rpb24oKSB7IHdyaXRlRGVsdGEoKTsgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7IH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd3JpdGVEZWx0YSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsdGFiQm94ID0gbWVhc3VyZVRleHQoZGVsdGFGb3JtYXRUZXh0KGRlbHRhVmFsdWUoY2RbMF0pLCBkZWx0YUZtdCksIHRyYWNlLmRlbHRhLmZvbnQsIG51bWJlcnNBbmNob3IsIGdkKTtcbiAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgIH1cblxuICAgIHZhciBrZXkgPSB0cmFjZS5tb2RlICsgdHJhY2UuYWxpZ247XG4gICAgdmFyIGRlbHRhO1xuICAgIGlmKHRyYWNlLl9oYXNEZWx0YSkge1xuICAgICAgICBkZWx0YSA9IGRyYXdEZWx0YSgpO1xuICAgICAgICBrZXkgKz0gdHJhY2UuZGVsdGEucG9zaXRpb24gKyB0cmFjZS5kZWx0YS5mb250LnNpemUgKyB0cmFjZS5kZWx0YS5mb250LmZhbWlseSArIHRyYWNlLmRlbHRhLnZhbHVlZm9ybWF0O1xuICAgICAgICBrZXkgKz0gdHJhY2UuZGVsdGEuaW5jcmVhc2luZy5zeW1ib2wgKyB0cmFjZS5kZWx0YS5kZWNyZWFzaW5nLnN5bWJvbDtcbiAgICAgICAgbnVtYmVyc2JCb3ggPSBkZWx0YWJCb3g7XG4gICAgfVxuICAgIGlmKHRyYWNlLl9oYXNOdW1iZXIpIHtcbiAgICAgICAgZHJhd0JpZ251bWJlcigpO1xuICAgICAgICBrZXkgKz0gdHJhY2UubnVtYmVyLmZvbnQuc2l6ZSArIHRyYWNlLm51bWJlci5mb250LmZhbWlseSArIHRyYWNlLm51bWJlci52YWx1ZWZvcm1hdCArIHRyYWNlLm51bWJlci5zdWZmaXggKyB0cmFjZS5udW1iZXIucHJlZml4O1xuICAgICAgICBudW1iZXJzYkJveCA9IGJpZ251bWJlcmJCb3g7XG4gICAgfVxuXG4gICAgLy8gUG9zaXRpb24gZGVsdGEgcmVsYXRpdmUgdG8gYmlnbnVtYmVyXG4gICAgaWYodHJhY2UuX2hhc0RlbHRhICYmIHRyYWNlLl9oYXNOdW1iZXIpIHtcbiAgICAgICAgdmFyIGJpZ251bWJlckNlbnRlciA9IFtcbiAgICAgICAgICAgIChiaWdudW1iZXJiQm94LmxlZnQgKyBiaWdudW1iZXJiQm94LnJpZ2h0KSAvIDIsXG4gICAgICAgICAgICAoYmlnbnVtYmVyYkJveC50b3AgKyBiaWdudW1iZXJiQm94LmJvdHRvbSkgLyAyXG4gICAgICAgIF07XG4gICAgICAgIHZhciBkZWx0YUNlbnRlciA9IFtcbiAgICAgICAgICAgIChkZWx0YWJCb3gubGVmdCArIGRlbHRhYkJveC5yaWdodCkgLyAyLFxuICAgICAgICAgICAgKGRlbHRhYkJveC50b3AgKyBkZWx0YWJCb3guYm90dG9tKSAvIDJcbiAgICAgICAgXTtcblxuICAgICAgICB2YXIgZHgsIGR5O1xuICAgICAgICB2YXIgcGFkZGluZyA9IDAuNzUgKiB0cmFjZS5kZWx0YS5mb250LnNpemU7XG4gICAgICAgIGlmKHRyYWNlLmRlbHRhLnBvc2l0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIGR4ID0gY2FjaGUodHJhY2UsICdkZWx0YVBvcycsIDAsIC0xICogKGJpZ251bWJlcmJCb3gud2lkdGggKiAocG9zaXRpb25bdHJhY2UuYWxpZ25dKSArIGRlbHRhYkJveC53aWR0aCAqICgxIC0gcG9zaXRpb25bdHJhY2UuYWxpZ25dKSArIHBhZGRpbmcpLCBrZXksIE1hdGgubWluKTtcbiAgICAgICAgICAgIGR5ID0gYmlnbnVtYmVyQ2VudGVyWzFdIC0gZGVsdGFDZW50ZXJbMV07XG5cbiAgICAgICAgICAgIG51bWJlcnNiQm94ID0ge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBiaWdudW1iZXJiQm94LndpZHRoICsgZGVsdGFiQm94LndpZHRoICsgcGFkZGluZyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IE1hdGgubWF4KGJpZ251bWJlcmJCb3guaGVpZ2h0LCBkZWx0YWJCb3guaGVpZ2h0KSxcbiAgICAgICAgICAgICAgICBsZWZ0OiBkZWx0YWJCb3gubGVmdCArIGR4LFxuICAgICAgICAgICAgICAgIHJpZ2h0OiBiaWdudW1iZXJiQm94LnJpZ2h0LFxuICAgICAgICAgICAgICAgIHRvcDogTWF0aC5taW4oYmlnbnVtYmVyYkJveC50b3AsIGRlbHRhYkJveC50b3AgKyBkeSksXG4gICAgICAgICAgICAgICAgYm90dG9tOiBNYXRoLm1heChiaWdudW1iZXJiQm94LmJvdHRvbSwgZGVsdGFiQm94LmJvdHRvbSArIGR5KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZih0cmFjZS5kZWx0YS5wb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgZHggPSBjYWNoZSh0cmFjZSwgJ2RlbHRhUG9zJywgMCwgYmlnbnVtYmVyYkJveC53aWR0aCAqICgxIC0gcG9zaXRpb25bdHJhY2UuYWxpZ25dKSArIGRlbHRhYkJveC53aWR0aCAqIHBvc2l0aW9uW3RyYWNlLmFsaWduXSArIHBhZGRpbmcsIGtleSwgTWF0aC5tYXgpO1xuICAgICAgICAgICAgZHkgPSBiaWdudW1iZXJDZW50ZXJbMV0gLSBkZWx0YUNlbnRlclsxXTtcblxuICAgICAgICAgICAgbnVtYmVyc2JCb3ggPSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGJpZ251bWJlcmJCb3gud2lkdGggKyBkZWx0YWJCb3gud2lkdGggKyBwYWRkaW5nLFxuICAgICAgICAgICAgICAgIGhlaWdodDogTWF0aC5tYXgoYmlnbnVtYmVyYkJveC5oZWlnaHQsIGRlbHRhYkJveC5oZWlnaHQpLFxuICAgICAgICAgICAgICAgIGxlZnQ6IGJpZ251bWJlcmJCb3gubGVmdCxcbiAgICAgICAgICAgICAgICByaWdodDogZGVsdGFiQm94LnJpZ2h0ICsgZHgsXG4gICAgICAgICAgICAgICAgdG9wOiBNYXRoLm1pbihiaWdudW1iZXJiQm94LnRvcCwgZGVsdGFiQm94LnRvcCArIGR5KSxcbiAgICAgICAgICAgICAgICBib3R0b206IE1hdGgubWF4KGJpZ251bWJlcmJCb3guYm90dG9tLCBkZWx0YWJCb3guYm90dG9tICsgZHkpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmKHRyYWNlLmRlbHRhLnBvc2l0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgZHggPSBudWxsO1xuICAgICAgICAgICAgZHkgPSBkZWx0YWJCb3guaGVpZ2h0O1xuXG4gICAgICAgICAgICBudW1iZXJzYkJveCA9IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogTWF0aC5tYXgoYmlnbnVtYmVyYkJveC53aWR0aCwgZGVsdGFiQm94LndpZHRoKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGJpZ251bWJlcmJCb3guaGVpZ2h0ICsgZGVsdGFiQm94LmhlaWdodCxcbiAgICAgICAgICAgICAgICBsZWZ0OiBNYXRoLm1pbihiaWdudW1iZXJiQm94LmxlZnQsIGRlbHRhYkJveC5sZWZ0KSxcbiAgICAgICAgICAgICAgICByaWdodDogTWF0aC5tYXgoYmlnbnVtYmVyYkJveC5yaWdodCwgZGVsdGFiQm94LnJpZ2h0KSxcbiAgICAgICAgICAgICAgICB0b3A6IGJpZ251bWJlcmJCb3guYm90dG9tIC0gYmlnbnVtYmVyYkJveC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgYm90dG9tOiBiaWdudW1iZXJiQm94LmJvdHRvbSArIGRlbHRhYkJveC5oZWlnaHRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYodHJhY2UuZGVsdGEucG9zaXRpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICBkeCA9IG51bGw7XG4gICAgICAgICAgICBkeSA9IGJpZ251bWJlcmJCb3gudG9wO1xuXG4gICAgICAgICAgICBudW1iZXJzYkJveCA9IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogTWF0aC5tYXgoYmlnbnVtYmVyYkJveC53aWR0aCwgZGVsdGFiQm94LndpZHRoKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGJpZ251bWJlcmJCb3guaGVpZ2h0ICsgZGVsdGFiQm94LmhlaWdodCxcbiAgICAgICAgICAgICAgICBsZWZ0OiBNYXRoLm1pbihiaWdudW1iZXJiQm94LmxlZnQsIGRlbHRhYkJveC5sZWZ0KSxcbiAgICAgICAgICAgICAgICByaWdodDogTWF0aC5tYXgoYmlnbnVtYmVyYkJveC5yaWdodCwgZGVsdGFiQm94LnJpZ2h0KSxcbiAgICAgICAgICAgICAgICB0b3A6IGJpZ251bWJlcmJCb3guYm90dG9tIC0gYmlnbnVtYmVyYkJveC5oZWlnaHQgLSBkZWx0YWJCb3guaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGJvdHRvbTogYmlnbnVtYmVyYkJveC5ib3R0b21cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBkZWx0YS5hdHRyKHtkeDogZHgsIGR5OiBkeX0pO1xuICAgIH1cblxuICAgIC8vIFJlc2l6ZSBudW1iZXJzIHRvIGZpdCB3aXRoaW4gc3BhY2UgYW5kIHBvc2l0aW9uXG4gICAgaWYodHJhY2UuX2hhc051bWJlciB8fCB0cmFjZS5faGFzRGVsdGEpIHtcbiAgICAgICAgbnVtYmVycy5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtID0gb3B0cy5udW1iZXJzU2NhbGVyKG51bWJlcnNiQm94KTtcbiAgICAgICAgICAgIGtleSArPSBtWzJdO1xuICAgICAgICAgICAgdmFyIHNjYWxlUmF0aW8gPSBjYWNoZSh0cmFjZSwgJ251bWJlcnNTY2FsZScsIDEsIG1bMF0sIGtleSwgTWF0aC5taW4pO1xuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZVk7XG4gICAgICAgICAgICBpZighdHJhY2UuX3NjYWxlTnVtYmVycykgc2NhbGVSYXRpbyA9IDE7XG4gICAgICAgICAgICBpZih0cmFjZS5faXNBbmd1bGFyKSB7XG4gICAgICAgICAgICAgICAgLy8gYWxpZ24gdmVydGljYWxseSB0byBib3R0b21cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVZID0gbnVtYmVyc1kgLSBzY2FsZVJhdGlvICogbnVtYmVyc2JCb3guYm90dG9tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhbGlnbiB2ZXJ0aWNhbGx5IHRvIGNlbnRlclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVkgPSBudW1iZXJzWSAtIHNjYWxlUmF0aW8gKiAobnVtYmVyc2JCb3gudG9wICsgbnVtYmVyc2JCb3guYm90dG9tKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN0YXNoIHRoZSB0b3AgcG9zaXRpb24gb2YgbnVtYmVyc2JCb3ggZm9yIHRpdGxlIHBvc2l0aW9uaW5nXG4gICAgICAgICAgICB0cmFjZS5fbnVtYmVyc1RvcCA9IHNjYWxlUmF0aW8gKiAobnVtYmVyc2JCb3gudG9wKSArIHRyYW5zbGF0ZVk7XG5cbiAgICAgICAgICAgIHZhciByZWYgPSBudW1iZXJzYkJveFtudW1iZXJzQWxpZ25dO1xuICAgICAgICAgICAgaWYobnVtYmVyc0FsaWduID09PSAnY2VudGVyJykgcmVmID0gKG51bWJlcnNiQm94LmxlZnQgKyBudW1iZXJzYkJveC5yaWdodCkgLyAyO1xuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZVggPSBudW1iZXJzWCAtIHNjYWxlUmF0aW8gKiByZWY7XG5cbiAgICAgICAgICAgIC8vIFN0YXNoIHRyYW5zbGF0ZVhcbiAgICAgICAgICAgIHRyYW5zbGF0ZVggPSBjYWNoZSh0cmFjZSwgJ251bWJlcnNUcmFuc2xhdGUnLCAwLCB0cmFuc2xhdGVYLCBrZXksIE1hdGgubWF4KTtcbiAgICAgICAgICAgIHJldHVybiBzdHJUcmFuc2xhdGUodHJhbnNsYXRlWCwgdHJhbnNsYXRlWSkgKyAnIHNjYWxlKCcgKyBzY2FsZVJhdGlvICsgJyknO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIEFwcGx5IGZpbGwsIHN0cm9rZSwgc3Ryb2tlLXdpZHRoIHRvIFNWRyBzaGFwZVxuZnVuY3Rpb24gc3R5bGVTaGFwZShwKSB7XG4gICAgcFxuICAgICAgICAuZWFjaChmdW5jdGlvbihkKSB7IENvbG9yLnN0cm9rZShkMy5zZWxlY3QodGhpcyksIGQubGluZS5jb2xvcik7fSlcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCkgeyBDb2xvci5maWxsKGQzLnNlbGVjdCh0aGlzKSwgZC5jb2xvcik7fSlcbiAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmxpbmUud2lkdGg7fSk7XG59XG5cbi8vIFJldHVybnMgYSB0d2VlbiBmb3IgYSB0cmFuc2l0aW9u4oCZcyBcImRcIiBhdHRyaWJ1dGUsIHRyYW5zaXRpb25pbmcgYW55IHNlbGVjdGVkXG4vLyBhcmNzIGZyb20gdGhlaXIgY3VycmVudCBhbmdsZSB0byB0aGUgc3BlY2lmaWVkIG5ldyBhbmdsZS5cbmZ1bmN0aW9uIGFyY1R3ZWVuKGFyYywgZW5kQW5nbGUsIG5ld0FuZ2xlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaW50ZXJwb2xhdGUgPSBkMy5pbnRlcnBvbGF0ZShlbmRBbmdsZSwgbmV3QW5nbGUpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgcmV0dXJuIGFyYy5lbmRBbmdsZShpbnRlcnBvbGF0ZSh0KSkoKTtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG4vLyBtb2NrcyBvdXIgYXhpc1xuZnVuY3Rpb24gbW9ja0F4aXMoZ2QsIG9wdHMsIHpyYW5nZSkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG5cbiAgICB2YXIgYXhpc0luID0gTGliLmV4dGVuZEZsYXQoe1xuICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgdGlja3M6ICdvdXRzaWRlJyxcbiAgICAgICAgcmFuZ2U6IHpyYW5nZSxcbiAgICAgICAgc2hvd2xpbmU6IHRydWVcbiAgICB9LCBvcHRzKTtcblxuICAgIHZhciBheGlzT3V0ID0ge1xuICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgX2lkOiAneCcgKyBvcHRzLl9pZFxuICAgIH07XG5cbiAgICB2YXIgYXhpc09wdGlvbnMgPSB7XG4gICAgICAgIGxldHRlcjogJ3gnLFxuICAgICAgICBmb250OiBmdWxsTGF5b3V0LmZvbnQsXG4gICAgICAgIG5vSG92ZXI6IHRydWUsXG4gICAgICAgIG5vVGlja3NvbjogdHJ1ZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShheGlzSW4sIGF4aXNPdXQsIGF4aXNMYXlvdXRBdHRycywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgaGFuZGxlQXhpc0RlZmF1bHRzKGF4aXNJbiwgYXhpc091dCwgY29lcmNlLCBheGlzT3B0aW9ucywgZnVsbExheW91dCk7XG4gICAgaGFuZGxlQXhpc1Bvc2l0aW9uRGVmYXVsdHMoYXhpc0luLCBheGlzT3V0LCBjb2VyY2UsIGF4aXNPcHRpb25zKTtcblxuICAgIHJldHVybiBheGlzT3V0O1xufVxuXG5mdW5jdGlvbiBzdHJUcmFuc2xhdGUoeCwgeSkge1xuICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyB4ICsgJywnICsgeSArICcpJztcbn1cblxuZnVuY3Rpb24gZml0VGV4dEluc2lkZUJveCh0ZXh0QkIsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAvLyBjb21wdXRlIHNjYWxpbmcgcmF0aW8gdG8gaGF2ZSB0ZXh0IGZpdCB3aXRoaW4gc3BlY2lmaWVkIHdpZHRoIGFuZCBoZWlnaHRcbiAgICB2YXIgcmF0aW8gPSBNYXRoLm1pbih3aWR0aCAvIHRleHRCQi53aWR0aCwgaGVpZ2h0IC8gdGV4dEJCLmhlaWdodCk7XG4gICAgcmV0dXJuIFtyYXRpbywgdGV4dEJCLCB3aWR0aCArICd4JyArIGhlaWdodF07XG59XG5cbmZ1bmN0aW9uIGZpdFRleHRJbnNpZGVDaXJjbGUodGV4dEJCLCByYWRpdXMpIHtcbiAgICAvLyBjb21wdXRlIHNjYWxpbmcgcmF0aW8gdG8gaGF2ZSB0ZXh0IGZpdCB3aXRoaW4gc3BlY2lmaWVkIHJhZGl1c1xuICAgIHZhciBlbFJhZGl1cyA9IE1hdGguc3FydCgodGV4dEJCLndpZHRoIC8gMikgKiAodGV4dEJCLndpZHRoIC8gMikgKyB0ZXh0QkIuaGVpZ2h0ICogdGV4dEJCLmhlaWdodCk7XG4gICAgdmFyIHJhdGlvID0gcmFkaXVzIC8gZWxSYWRpdXM7XG4gICAgcmV0dXJuIFtyYXRpbywgdGV4dEJCLCByYWRpdXNdO1xufVxuXG5mdW5jdGlvbiBtZWFzdXJlVGV4dCh0eHQsIGZvbnQsIHRleHRBbmNob3IsIGdkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3RleHQnKTtcbiAgICB2YXIgc2VsID0gZDMuc2VsZWN0KGVsZW1lbnQpO1xuICAgIHNlbC50ZXh0KHR4dClcbiAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsIHRleHRBbmNob3IpXG4gICAgICAuYXR0cignZGF0YS11bmZvcm1hdHRlZCcsIHR4dClcbiAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKVxuICAgICAgLmNhbGwoRHJhd2luZy5mb250LCBmb250KTtcbiAgICByZXR1cm4gRHJhd2luZy5iQm94KHNlbC5ub2RlKCkpO1xufVxuXG5mdW5jdGlvbiBjYWNoZSh0cmFjZSwgbmFtZSwgaW5pdGlhbFZhbHVlLCB2YWx1ZSwga2V5LCBmbikge1xuICAgIHZhciBvYmpOYW1lID0gJ19jYWNoZScgKyBuYW1lO1xuICAgIGlmKCEodHJhY2Vbb2JqTmFtZV0gJiYgdHJhY2Vbb2JqTmFtZV0ua2V5ID09PSBrZXkpKSB7XG4gICAgICAgIHRyYWNlW29iak5hbWVdID0ge2tleToga2V5LCB2YWx1ZTogaW5pdGlhbFZhbHVlfTtcbiAgICB9XG4gICAgdmFyIHYgPSBMaWIuYWdnTnVtcyhmbiwgbnVsbCwgW3RyYWNlW29iak5hbWVdLnZhbHVlLCB2YWx1ZV0sIDIpO1xuICAgIHRyYWNlW29iak5hbWVdLnZhbHVlID0gdjtcblxuICAgIHJldHVybiB2O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==