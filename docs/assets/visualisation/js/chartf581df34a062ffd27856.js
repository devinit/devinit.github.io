(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_carpet_js"],{

/***/ "./node_modules/plotly.js/lib/carpet.js":
/*!**********************************************!*\
  !*** ./node_modules/plotly.js/lib/carpet.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/carpet */ "./node_modules/plotly.js/src/traces/carpet/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/ab_defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/ab_defaults.js ***!
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



var handleAxisDefaults = __webpack_require__(/*! ./axis_defaults */ "./node_modules/plotly.js/src/traces/carpet/axis_defaults.js");
var Template = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");

module.exports = function handleABDefaults(traceIn, traceOut, fullLayout, coerce, dfltColor) {
    var a = coerce('a');

    if(!a) {
        coerce('da');
        coerce('a0');
    }

    var b = coerce('b');

    if(!b) {
        coerce('db');
        coerce('b0');
    }

    mimickAxisDefaults(traceIn, traceOut, fullLayout, dfltColor);
};

function mimickAxisDefaults(traceIn, traceOut, fullLayout, dfltColor) {
    var axesList = ['aaxis', 'baxis'];

    axesList.forEach(function(axName) {
        var axLetter = axName.charAt(0);
        var axIn = traceIn[axName] || {};
        var axOut = Template.newContainer(traceOut, axName);

        var defaultOptions = {
            tickfont: 'x',
            id: axLetter + 'axis',
            letter: axLetter,
            font: traceOut.font,
            name: axName,
            data: traceIn[axLetter],
            calendar: traceOut.calendar,
            dfltColor: dfltColor,
            bgColor: fullLayout.paper_bgcolor,
            fullLayout: fullLayout
        };

        handleAxisDefaults(axIn, axOut, defaultOptions);
        axOut._categories = axOut._categories || [];

        // so we don't have to repeat autotype unnecessarily,
        // copy an autotype back to traceIn
        if(!traceIn[axName] && axIn.type !== '-') {
            traceIn[axName] = {type: axIn.type};
        }
    });
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/array_minmax.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/array_minmax.js ***!
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



var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

module.exports = function(a) {
    return minMax(a, 0);
};

function minMax(a, depth) {
    // Limit to ten dimensional datasets. This seems *exceedingly* unlikely to
    // ever cause problems or even be a concern. It's include strictly so that
    // circular arrays could never cause this to loop.
    if(!isArrayOrTypedArray(a) || depth >= 10) {
        return null;
    }

    var min = Infinity;
    var max = -Infinity;
    var n = a.length;
    for(var i = 0; i < n; i++) {
        var datum = a[i];

        if(isArrayOrTypedArray(datum)) {
            var result = minMax(datum, depth + 1);

            if(result) {
                min = Math.min(result[0], min);
                max = Math.max(result[1], max);
            }
        } else {
            min = Math.min(datum, min);
            max = Math.max(datum, max);
        }
    }

    return [min, max];
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/attributes.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/attributes.js ***!
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



var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var axisAttrs = __webpack_require__(/*! ./axis_attributes */ "./node_modules/plotly.js/src/traces/carpet/axis_attributes.js");
var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");

var carpetFont = fontAttrs({
    editType: 'calc',
    description: 'The default font used for axis & tick labels on this carpet'
});
// TODO: inherit from global font
carpetFont.family.dflt = '"Open Sans", verdana, arial, sans-serif';
carpetFont.size.dflt = 12;
carpetFont.color.dflt = colorAttrs.defaultLine;

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
    x: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'A two dimensional array of x coordinates at each carpet point.',
            'If ommitted, the plot is a cheater plot and the xaxis is hidden',
            'by default.'
        ].join(' ')
    },
    y: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: 'A two dimensional array of y coordinates at each carpet point.'
    },
    a: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'An array containing values of the first parameter value'
        ].join(' ')
    },
    a0: {
        valType: 'number',
        dflt: 0,
        role: 'info',
        editType: 'calc',
        description: [
            'Alternate to `a`.',
            'Builds a linear space of a coordinates.',
            'Use with `da`',
            'where `a0` is the starting coordinate and `da` the step.'
        ].join(' ')
    },
    da: {
        valType: 'number',
        dflt: 1,
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the a coordinate step.',
            'See `a0` for more info.'
        ].join(' ')
    },
    b: {
        valType: 'data_array',
        editType: 'calc',
        description: 'A two dimensional array of y coordinates at each carpet point.'
    },
    b0: {
        valType: 'number',
        dflt: 0,
        role: 'info',
        editType: 'calc',
        description: [
            'Alternate to `b`.',
            'Builds a linear space of a coordinates.',
            'Use with `db`',
            'where `b0` is the starting coordinate and `db` the step.'
        ].join(' ')
    },
    db: {
        valType: 'number',
        dflt: 1,
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the b coordinate step.',
            'See `b0` for more info.'
        ].join(' ')
    },
    cheaterslope: {
        valType: 'number',
        role: 'info',
        dflt: 1,
        editType: 'calc',
        description: [
            'The shift applied to each successive row of data in creating a cheater plot.',
            'Only used if `x` is been ommitted.'
        ].join(' ')
    },
    aaxis: axisAttrs,
    baxis: axisAttrs,
    font: carpetFont,
    color: {
        valType: 'color',
        dflt: colorAttrs.defaultLine,
        role: 'style',
        editType: 'plot',
        description: [
            'Sets default for all colors associated with this axis',
            'all at once: line, font, tick, and grid colors.',
            'Grid color is lightened by blending this with the plot background',
            'Individual pieces can override this.'
        ].join(' ')
    },
    transforms: undefined
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/axis_attributes.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/axis_attributes.js ***!
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



var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");
var axesAttrs = __webpack_require__(/*! ../../plots/cartesian/layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var FORMAT_LINK = __webpack_require__(/*! ../../constants/docs */ "./node_modules/plotly.js/src/constants/docs.js").FORMAT_LINK;
var DATE_FORMAT_LINK = __webpack_require__(/*! ../../constants/docs */ "./node_modules/plotly.js/src/constants/docs.js").TIME_FORMAT_LINK;

module.exports = {
    color: {
        valType: 'color',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets default for all colors associated with this axis',
            'all at once: line, font, tick, and grid colors.',
            'Grid color is lightened by blending this with the plot background',
            'Individual pieces can override this.'
        ].join(' ')
    },
    smoothing: {
        valType: 'number',
        dflt: 1,
        min: 0,
        max: 1.3,
        role: 'info',
        editType: 'calc'
    },
    title: {
        text: {
            valType: 'string',
            dflt: '',
            role: 'info',
            editType: 'calc',
            description: [
                'Sets the title of this axis.',
                'Note that before the existence of `title.text`, the title\'s',
                'contents used to be defined as the `title` attribute itself.',
                'This behavior has been deprecated.'
            ].join(' ')
        },
        font: fontAttrs({
            editType: 'calc',
            description: [
                'Sets this axis\' title font.',
                'Note that the title\'s font used to be set',
                'by the now deprecated `titlefont` attribute.'
            ].join(' ')
        }),
        // TODO how is this different than `title.standoff`
        offset: {
            valType: 'number',
            role: 'info',
            dflt: 10,
            editType: 'calc',
            description: [
                'An additional amount by which to offset the title from the tick',
                'labels, given in pixels.',
                'Note that this used to be set',
                'by the now deprecated `titleoffset` attribute.'
            ].join(' '),
        },
        editType: 'calc',
    },
    type: {
        valType: 'enumerated',
        // '-' means we haven't yet run autotype or couldn't find any data
        // it gets turned into linear in gd._fullLayout but not copied back
        // to gd.data like the others are.
        values: ['-', 'linear', 'date', 'category'],
        dflt: '-',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the axis type.',
            'By default, plotly attempts to determined the axis type',
            'by looking into the data of the traces that referenced',
            'the axis in question.'
        ].join(' ')
    },
    autorange: {
        valType: 'enumerated',
        values: [true, false, 'reversed'],
        dflt: true,
        role: 'style',
        editType: 'calc',
        description: [
            'Determines whether or not the range of this axis is',
            'computed in relation to the input data.',
            'See `rangemode` for more info.',
            'If `range` is provided, then `autorange` is set to *false*.'
        ].join(' ')
    },
    rangemode: {
        valType: 'enumerated',
        values: ['normal', 'tozero', 'nonnegative'],
        dflt: 'normal',
        role: 'style',
        editType: 'calc',
        description: [
            'If *normal*, the range is computed in relation to the extrema',
            'of the input data.',
            'If *tozero*`, the range extends to 0,',
            'regardless of the input data',
            'If *nonnegative*, the range is non-negative,',
            'regardless of the input data.'
        ].join(' ')
    },
    range: {
        valType: 'info_array',
        role: 'info',
        editType: 'calc',
        items: [
            {valType: 'any', editType: 'calc'},
            {valType: 'any', editType: 'calc'}
        ],
        description: [
            'Sets the range of this axis.',
            'If the axis `type` is *log*, then you must take the log of your',
            'desired range (e.g. to set the range from 1 to 100,',
            'set the range from 0 to 2).',
            'If the axis `type` is *date*, it should be date strings,',
            'like date data, though Date objects and unix milliseconds',
            'will be accepted and converted to strings.',
            'If the axis `type` is *category*, it should be numbers,',
            'using the scale where each category is assigned a serial',
            'number from zero in the order it appears.'
        ].join(' ')
    },

    fixedrange: {
        valType: 'boolean',
        dflt: false,
        role: 'info',
        editType: 'calc',
        description: [
            'Determines whether or not this axis is zoom-able.',
            'If true, then zoom is disabled.'
        ].join(' ')
    },
    cheatertype: {
        valType: 'enumerated',
        values: ['index', 'value'],
        dflt: 'value',
        role: 'info',
        editType: 'calc'
    },
    tickmode: {
        valType: 'enumerated',
        values: ['linear', 'array'],
        dflt: 'array',
        role: 'info',
        editType: 'calc'
    },
    nticks: {
        valType: 'integer',
        min: 0,
        dflt: 0,
        role: 'style',
        editType: 'calc',
        description: [
            'Specifies the maximum number of ticks for the particular axis.',
            'The actual number of ticks will be chosen automatically to be',
            'less than or equal to `nticks`.',
            'Has an effect only if `tickmode` is set to *auto*.'
        ].join(' ')
    },
    tickvals: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the values at which ticks on this axis appear.',
            'Only has an effect if `tickmode` is set to *array*.',
            'Used with `ticktext`.'
        ].join(' ')
    },
    ticktext: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the text displayed at the ticks position via `tickvals`.',
            'Only has an effect if `tickmode` is set to *array*.',
            'Used with `tickvals`.'
        ].join(' ')
    },
    showticklabels: {
        valType: 'enumerated',
        values: ['start', 'end', 'both', 'none'],
        dflt: 'start',
        role: 'style',
        editType: 'calc',
        description: [
            'Determines whether axis labels are drawn on the low side,',
            'the high side, both, or neither side of the axis.'
        ].join(' ')
    },
    tickfont: fontAttrs({
        editType: 'calc',
        description: 'Sets the tick font.'
    }),
    tickangle: {
        valType: 'angle',
        dflt: 'auto',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the angle of the tick labels with respect to the horizontal.',
            'For example, a `tickangle` of -90 draws the tick labels',
            'vertically.'
        ].join(' ')
    },
    tickprefix: {
        valType: 'string',
        dflt: '',
        role: 'style',
        editType: 'calc',
        description: 'Sets a tick label prefix.'
    },
    showtickprefix: {
        valType: 'enumerated',
        values: ['all', 'first', 'last', 'none'],
        dflt: 'all',
        role: 'style',
        editType: 'calc',
        description: [
            'If *all*, all tick labels are displayed with a prefix.',
            'If *first*, only the first tick is displayed with a prefix.',
            'If *last*, only the last tick is displayed with a suffix.',
            'If *none*, tick prefixes are hidden.'
        ].join(' ')
    },
    ticksuffix: {
        valType: 'string',
        dflt: '',
        role: 'style',
        editType: 'calc',
        description: 'Sets a tick label suffix.'
    },
    showticksuffix: {
        valType: 'enumerated',
        values: ['all', 'first', 'last', 'none'],
        dflt: 'all',
        role: 'style',
        editType: 'calc',
        description: 'Same as `showtickprefix` but for tick suffixes.'
    },
    showexponent: {
        valType: 'enumerated',
        values: ['all', 'first', 'last', 'none'],
        dflt: 'all',
        role: 'style',
        editType: 'calc',
        description: [
            'If *all*, all exponents are shown besides their significands.',
            'If *first*, only the exponent of the first tick is shown.',
            'If *last*, only the exponent of the last tick is shown.',
            'If *none*, no exponents appear.'
        ].join(' ')
    },
    exponentformat: {
        valType: 'enumerated',
        values: ['none', 'e', 'E', 'power', 'SI', 'B'],
        dflt: 'B',
        role: 'style',
        editType: 'calc',
        description: [
            'Determines a formatting rule for the tick exponents.',
            'For example, consider the number 1,000,000,000.',
            'If *none*, it appears as 1,000,000,000.',
            'If *e*, 1e+9.',
            'If *E*, 1E+9.',
            'If *power*, 1x10^9 (with 9 in a super script).',
            'If *SI*, 1G.',
            'If *B*, 1B.'
        ].join(' ')
    },
    separatethousands: {
        valType: 'boolean',
        dflt: false,
        role: 'style',
        editType: 'calc',
        description: [
            'If "true", even 4-digit integers are separated'
        ].join(' ')
    },
    tickformat: {
        valType: 'string',
        dflt: '',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the tick label formatting rule using d3 formatting mini-languages',
            'which are very similar to those in Python. For numbers, see:',
            FORMAT_LINK,
            'And for dates see:',
            DATE_FORMAT_LINK,
            'We add one item to d3\'s date formatter: *%{n}f* for fractional seconds',
            'with n digits. For example, *2016-10-13 09:15:23.456* with tickformat',
            '*%H~%M~%S.%2f* would display *09~15~23.46*'
        ].join(' ')
    },
    tickformatstops: overrideAll(axesAttrs.tickformatstops, 'calc', 'from-root'),
    categoryorder: {
        valType: 'enumerated',
        values: [
            'trace', 'category ascending', 'category descending', 'array'
            /* , 'value ascending', 'value descending'*/ // value ascending / descending to be implemented later
        ],
        dflt: 'trace',
        role: 'info',
        editType: 'calc',
        description: [
            'Specifies the ordering logic for the case of categorical variables.',
            'By default, plotly uses *trace*, which specifies the order that is present in the data supplied.',
            'Set `categoryorder` to *category ascending* or *category descending* if order should be determined by',
            'the alphanumerical order of the category names.',
            /* 'Set `categoryorder` to *value ascending* or *value descending* if order should be determined by the',
            'numerical order of the values.',*/ // // value ascending / descending to be implemented later
            'Set `categoryorder` to *array* to derive the ordering from the attribute `categoryarray`. If a category',
            'is not found in the `categoryarray` array, the sorting behavior for that attribute will be identical to',
            'the *trace* mode. The unspecified categories will follow the categories in `categoryarray`.'
        ].join(' ')
    },
    categoryarray: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the order in which categories on this axis appear.',
            'Only has an effect if `categoryorder` is set to *array*.',
            'Used with `categoryorder`.'
        ].join(' ')
    },
    labelpadding: {
        valType: 'integer',
        role: 'style',
        dflt: 10,
        editType: 'calc',
        description: 'Extra padding between label and the axis'
    },
    labelprefix: {
        valType: 'string',
        role: 'style',
        editType: 'calc',
        description: 'Sets a axis label prefix.'
    },
    labelsuffix: {
        valType: 'string',
        dflt: '',
        role: 'style',
        editType: 'calc',
        description: 'Sets a axis label suffix.'
    },
    // lines and grids
    showline: {
        valType: 'boolean',
        dflt: false,
        role: 'style',
        editType: 'calc',
        description: [
            'Determines whether or not a line bounding this axis is drawn.'
        ].join(' ')
    },
    linecolor: {
        valType: 'color',
        dflt: colorAttrs.defaultLine,
        role: 'style',
        editType: 'calc',
        description: 'Sets the axis line color.'
    },
    linewidth: {
        valType: 'number',
        min: 0,
        dflt: 1,
        role: 'style',
        editType: 'calc',
        description: 'Sets the width (in px) of the axis line.'
    },
    gridcolor: {
        valType: 'color',
        role: 'style',
        editType: 'calc',
        description: 'Sets the axis line color.'
    },
    gridwidth: {
        valType: 'number',
        min: 0,
        dflt: 1,
        role: 'style',
        editType: 'calc',
        description: 'Sets the width (in px) of the axis line.'
    },
    showgrid: {
        valType: 'boolean',
        role: 'style',
        dflt: true,
        editType: 'calc',
        description: [
            'Determines whether or not grid lines are drawn.',
            'If *true*, the grid lines are drawn at every tick mark.'
        ].join(' ')
    },
    minorgridcount: {
        valType: 'integer',
        min: 0,
        dflt: 0,
        role: 'info',
        editType: 'calc',
        description: 'Sets the number of minor grid ticks per major grid tick'
    },
    minorgridwidth: {
        valType: 'number',
        min: 0,
        dflt: 1,
        role: 'style',
        editType: 'calc',
        description: 'Sets the width (in px) of the grid lines.'
    },
    minorgridcolor: {
        valType: 'color',
        dflt: colorAttrs.lightLine,
        role: 'style',
        editType: 'calc',
        description: 'Sets the color of the grid lines.'
    },
    startline: {
        valType: 'boolean',
        role: 'style',
        editType: 'calc',
        description: [
            'Determines whether or not a line is drawn at along the starting value',
            'of this axis.',
            'If *true*, the start line is drawn on top of the grid lines.'
        ].join(' ')
    },
    startlinecolor: {
        valType: 'color',
        role: 'style',
        editType: 'calc',
        description: 'Sets the line color of the start line.'
    },
    startlinewidth: {
        valType: 'number',
        dflt: 1,
        role: 'style',
        editType: 'calc',
        description: 'Sets the width (in px) of the start line.'
    },
    endline: {
        valType: 'boolean',
        role: 'style',
        editType: 'calc',
        description: [
            'Determines whether or not a line is drawn at along the final value',
            'of this axis.',
            'If *true*, the end line is drawn on top of the grid lines.'
        ].join(' ')
    },
    endlinewidth: {
        valType: 'number',
        dflt: 1,
        role: 'style',
        editType: 'calc',
        description: 'Sets the width (in px) of the end line.'
    },
    endlinecolor: {
        valType: 'color',
        role: 'style',
        editType: 'calc',
        description: 'Sets the line color of the end line.'
    },
    tick0: {
        valType: 'number',
        min: 0,
        dflt: 0,
        role: 'info',
        editType: 'calc',
        description: 'The starting index of grid lines along the axis'
    },
    dtick: {
        valType: 'number',
        min: 0,
        dflt: 1,
        role: 'info',
        editType: 'calc',
        description: 'The stride between grid lines along the axis'
    },
    arraytick0: {
        valType: 'integer',
        min: 0,
        dflt: 0,
        role: 'info',
        editType: 'calc',
        description: 'The starting index of grid lines along the axis'
    },
    arraydtick: {
        valType: 'integer',
        min: 1,
        dflt: 1,
        role: 'info',
        editType: 'calc',
        description: 'The stride between grid lines along the axis'
    },

    _deprecated: {
        title: {
            valType: 'string',
            role: 'info',
            editType: 'calc',
            description: [
                'Deprecated in favor of `title.text`.',
                'Note that value of `title` is no longer a simple',
                '*string* but a set of sub-attributes.'
            ].join(' ')
        },
        titlefont: fontAttrs({
            editType: 'calc',
            description: 'Deprecated in favor of `title.font`.'
        }),
        titleoffset: {
            valType: 'number',
            role: 'info',
            dflt: 10,
            editType: 'calc',
            description: 'Deprecated in favor of `title.offset`.'
        }
    },

    editType: 'calc'
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/axis_defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/axis_defaults.js ***!
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



var carpetAttrs = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/carpet/attributes.js");

var addOpacity = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js").addOpacity;
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var handleTickValueDefaults = __webpack_require__(/*! ../../plots/cartesian/tick_value_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_value_defaults.js");
var handleTickLabelDefaults = __webpack_require__(/*! ../../plots/cartesian/tick_label_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_label_defaults.js");
var handleCategoryOrderDefaults = __webpack_require__(/*! ../../plots/cartesian/category_order_defaults */ "./node_modules/plotly.js/src/plots/cartesian/category_order_defaults.js");
var setConvert = __webpack_require__(/*! ../../plots/cartesian/set_convert */ "./node_modules/plotly.js/src/plots/cartesian/set_convert.js");
var autoType = __webpack_require__(/*! ../../plots/cartesian/axis_autotype */ "./node_modules/plotly.js/src/plots/cartesian/axis_autotype.js");

/**
 * options: object containing:
 *
 *  letter: 'a' or 'b'
 *  title: name of the axis (ie 'Colorbar') to go in default title
 *  name: axis object name (ie 'xaxis') if one should be stored
 *  font: the default font to inherit
 *  outerTicks: boolean, should ticks default to outside?
 *  showGrid: boolean, should gridlines be shown by default?
 *  data: the plot data to use in choosing auto type
 *  bgColor: the plot background color, to calculate default gridline colors
 */
module.exports = function handleAxisDefaults(containerIn, containerOut, options) {
    var letter = options.letter;
    var font = options.font || {};
    var attributes = carpetAttrs[letter + 'axis'];

    function coerce(attr, dflt) {
        return Lib.coerce(containerIn, containerOut, attributes, attr, dflt);
    }

    function coerce2(attr, dflt) {
        return Lib.coerce2(containerIn, containerOut, attributes, attr, dflt);
    }

    // set up some private properties
    if(options.name) {
        containerOut._name = options.name;
        containerOut._id = options.name;
    }

    // now figure out type and do some more initialization
    var axType = coerce('type');
    if(axType === '-') {
        if(options.data) setAutoType(containerOut, options.data);

        if(containerOut.type === '-') {
            containerOut.type = 'linear';
        } else {
            // copy autoType back to input axis
            // note that if this object didn't exist
            // in the input layout, we have to put it in
            // this happens in the main supplyDefaults function
            axType = containerIn.type = containerOut.type;
        }
    }

    coerce('smoothing');
    coerce('cheatertype');

    coerce('showticklabels');
    coerce('labelprefix', letter + ' = ');
    coerce('labelsuffix');
    coerce('showtickprefix');
    coerce('showticksuffix');

    coerce('separatethousands');
    coerce('tickformat');
    coerce('exponentformat');
    coerce('showexponent');
    coerce('categoryorder');

    coerce('tickmode');
    coerce('tickvals');
    coerce('ticktext');
    coerce('tick0');
    coerce('dtick');

    if(containerOut.tickmode === 'array') {
        coerce('arraytick0');
        coerce('arraydtick');
    }

    coerce('labelpadding');

    containerOut._hovertitle = letter;


    if(axType === 'date') {
        var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleDefaults');
        handleCalendarDefaults(containerIn, containerOut, 'calendar', options.calendar);
    }

    // we need some of the other functions setConvert attaches, but for
    // path finding, override pixel scaling to simple passthrough (identity)
    setConvert(containerOut, options.fullLayout);
    containerOut.c2p = Lib.identity;

    var dfltColor = coerce('color', options.dfltColor);
    // if axis.color was provided, use it for fonts too; otherwise,
    // inherit from global font color in case that was provided.
    var dfltFontColor = (dfltColor === containerIn.color) ? dfltColor : font.color;

    var title = coerce('title.text');
    if(title) {
        Lib.coerceFont(coerce, 'title.font', {
            family: font.family,
            size: Math.round(font.size * 1.2),
            color: dfltFontColor
        });
        coerce('title.offset');
    }

    coerce('tickangle');

    var autoRange = coerce('autorange', !containerOut.isValidRange(containerIn.range));

    if(autoRange) coerce('rangemode');

    coerce('range');
    containerOut.cleanRange();

    coerce('fixedrange');

    handleTickValueDefaults(containerIn, containerOut, coerce, axType);
    handleTickLabelDefaults(containerIn, containerOut, coerce, axType, options);
    handleCategoryOrderDefaults(containerIn, containerOut, coerce, {
        data: options.data,
        dataAttr: letter
    });

    var gridColor = coerce2('gridcolor', addOpacity(dfltColor, 0.3));
    var gridWidth = coerce2('gridwidth');
    var showGrid = coerce('showgrid');

    if(!showGrid) {
        delete containerOut.gridcolor;
        delete containerOut.gridwidth;
    }

    var startLineColor = coerce2('startlinecolor', dfltColor);
    var startLineWidth = coerce2('startlinewidth', gridWidth);
    var showStartLine = coerce('startline', containerOut.showgrid || !!startLineColor || !!startLineWidth);

    if(!showStartLine) {
        delete containerOut.startlinecolor;
        delete containerOut.startlinewidth;
    }

    var endLineColor = coerce2('endlinecolor', dfltColor);
    var endLineWidth = coerce2('endlinewidth', gridWidth);
    var showEndLine = coerce('endline', containerOut.showgrid || !!endLineColor || !!endLineWidth);

    if(!showEndLine) {
        delete containerOut.endlinecolor;
        delete containerOut.endlinewidth;
    }

    if(!showGrid) {
        delete containerOut.gridcolor;
        delete containerOut.gridWidth;
    } else {
        coerce('minorgridcount');
        coerce('minorgridwidth', gridWidth);
        coerce('minorgridcolor', addOpacity(gridColor, 0.06));

        if(!containerOut.minorgridcount) {
            delete containerOut.minorgridwidth;
            delete containerOut.minorgridcolor;
        }
    }

    if(containerOut.showticklabels === 'none') {
        delete containerOut.tickfont;
        delete containerOut.tickangle;
        delete containerOut.showexponent;
        delete containerOut.exponentformat;
        delete containerOut.tickformat;
        delete containerOut.showticksuffix;
        delete containerOut.showtickprefix;
    }

    if(!containerOut.showticksuffix) {
        delete containerOut.ticksuffix;
    }

    if(!containerOut.showtickprefix) {
        delete containerOut.tickprefix;
    }

    // It needs to be coerced, then something above overrides this deep in the axis code,
    // but no, we *actually* want to coerce this.
    coerce('tickmode');

    return containerOut;
};

function setAutoType(ax, data) {
    // new logic: let people specify any type they want,
    // only autotype if type is '-'
    if(ax.type !== '-') return;

    var id = ax._id;
    var axLetter = id.charAt(0);

    var calAttr = axLetter + 'calendar';
    var calendar = ax[calAttr];

    ax.type = autoType(data, calendar);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/calc.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/calc.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var isArray1D = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArray1D;
var cheaterBasis = __webpack_require__(/*! ./cheater_basis */ "./node_modules/plotly.js/src/traces/carpet/cheater_basis.js");
var arrayMinmax = __webpack_require__(/*! ./array_minmax */ "./node_modules/plotly.js/src/traces/carpet/array_minmax.js");
var calcGridlines = __webpack_require__(/*! ./calc_gridlines */ "./node_modules/plotly.js/src/traces/carpet/calc_gridlines.js");
var calcLabels = __webpack_require__(/*! ./calc_labels */ "./node_modules/plotly.js/src/traces/carpet/calc_labels.js");
var calcClipPath = __webpack_require__(/*! ./calc_clippath */ "./node_modules/plotly.js/src/traces/carpet/calc_clippath.js");
var clean2dArray = __webpack_require__(/*! ../heatmap/clean_2d_array */ "./node_modules/plotly.js/src/traces/heatmap/clean_2d_array.js");
var smoothFill2dArray = __webpack_require__(/*! ./smooth_fill_2d_array */ "./node_modules/plotly.js/src/traces/carpet/smooth_fill_2d_array.js");
var convertColumnData = __webpack_require__(/*! ../heatmap/convert_column_xyz */ "./node_modules/plotly.js/src/traces/heatmap/convert_column_xyz.js");
var setConvert = __webpack_require__(/*! ./set_convert */ "./node_modules/plotly.js/src/traces/carpet/set_convert.js");

module.exports = function calc(gd, trace) {
    var xa = Axes.getFromId(gd, trace.xaxis);
    var ya = Axes.getFromId(gd, trace.yaxis);
    var aax = trace.aaxis;
    var bax = trace.baxis;

    var x = trace.x;
    var y = trace.y;
    var cols = [];
    if(x && isArray1D(x)) cols.push('x');
    if(y && isArray1D(y)) cols.push('y');

    if(cols.length) {
        convertColumnData(trace, aax, bax, 'a', 'b', cols);
    }

    var a = trace._a = trace._a || trace.a;
    var b = trace._b = trace._b || trace.b;
    x = trace._x || trace.x;
    y = trace._y || trace.y;

    var t = {};

    if(trace._cheater) {
        var avals = aax.cheatertype === 'index' ? a.length : a;
        var bvals = bax.cheatertype === 'index' ? b.length : b;
        x = cheaterBasis(avals, bvals, trace.cheaterslope);
    }

    trace._x = x = clean2dArray(x);
    trace._y = y = clean2dArray(y);

    // Fill in any undefined values with elliptic smoothing. This doesn't take
    // into account the spacing of the values. That is, the derivatives should
    // be modified to use a and b values. It's not that hard, but this is already
    // moderate overkill for just filling in missing values.
    smoothFill2dArray(x, a, b);
    smoothFill2dArray(y, a, b);

    setConvert(trace);

    // create conversion functions that depend on the data
    trace.setScale();

    // This is a rather expensive scan. Nothing guarantees monotonicity,
    // so we need to scan through all data to get proper ranges:
    var xrange = arrayMinmax(x);
    var yrange = arrayMinmax(y);

    var dx = 0.5 * (xrange[1] - xrange[0]);
    var xc = 0.5 * (xrange[1] + xrange[0]);

    var dy = 0.5 * (yrange[1] - yrange[0]);
    var yc = 0.5 * (yrange[1] + yrange[0]);

    // Expand the axes to fit the plot, except just grow it by a factor of 1.3
    // because the labels should be taken into account except that's difficult
    // hence 1.3.
    var grow = 1.3;
    xrange = [xc - dx * grow, xc + dx * grow];
    yrange = [yc - dy * grow, yc + dy * grow];

    trace._extremes[xa._id] = Axes.findExtremes(xa, xrange, {padded: true});
    trace._extremes[ya._id] = Axes.findExtremes(ya, yrange, {padded: true});

    // Enumerate the gridlines, both major and minor, and store them on the trace
    // object:
    calcGridlines(trace, 'a', 'b');
    calcGridlines(trace, 'b', 'a');

    // Calculate the text labels for each major gridline and store them on the
    // trace object:
    calcLabels(trace, aax);
    calcLabels(trace, bax);

    // Tabulate points for the four segments that bound the axes so that we can
    // map to pixel coordinates in the plot function and create a clip rect:
    t.clipsegments = calcClipPath(trace._xctrl, trace._yctrl, aax, bax);

    t.x = x;
    t.y = y;
    t.a = a;
    t.b = b;

    return [t];
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/calc_clippath.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/calc_clippath.js ***!
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




module.exports = function makeClipPath(xctrl, yctrl, aax, bax) {
    var i, x, y;
    var segments = [];

    var asmoothing = !!aax.smoothing;
    var bsmoothing = !!bax.smoothing;
    var nea1 = xctrl[0].length - 1;
    var neb1 = xctrl.length - 1;

    // Along the lower a axis:
    for(i = 0, x = [], y = []; i <= nea1; i++) {
        x[i] = xctrl[0][i];
        y[i] = yctrl[0][i];
    }
    segments.push({x: x, y: y, bicubic: asmoothing});

    // Along the upper b axis:
    for(i = 0, x = [], y = []; i <= neb1; i++) {
        x[i] = xctrl[i][nea1];
        y[i] = yctrl[i][nea1];
    }
    segments.push({x: x, y: y, bicubic: bsmoothing});

    // Backwards along the upper a axis:
    for(i = nea1, x = [], y = []; i >= 0; i--) {
        x[nea1 - i] = xctrl[neb1][i];
        y[nea1 - i] = yctrl[neb1][i];
    }
    segments.push({x: x, y: y, bicubic: asmoothing});

    // Backwards along the lower b axis:
    for(i = neb1, x = [], y = []; i >= 0; i--) {
        x[neb1 - i] = xctrl[i][0];
        y[neb1 - i] = yctrl[i][0];
    }
    segments.push({x: x, y: y, bicubic: bsmoothing});

    return segments;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/calc_gridlines.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/calc_gridlines.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = function calcGridlines(trace, axisLetter, crossAxisLetter) {
    var i, j, j0;
    var eps, bounds, n1, n2, n, value, v;
    var j1, v0, v1, d;

    var data = trace['_' + axisLetter];
    var axis = trace[axisLetter + 'axis'];

    var gridlines = axis._gridlines = [];
    var minorgridlines = axis._minorgridlines = [];
    var boundarylines = axis._boundarylines = [];

    var crossData = trace['_' + crossAxisLetter];
    var crossAxis = trace[crossAxisLetter + 'axis'];

    if(axis.tickmode === 'array') {
        axis.tickvals = data.slice();
    }

    var xcp = trace._xctrl;
    var ycp = trace._yctrl;
    var nea = xcp[0].length;
    var neb = xcp.length;
    var na = trace._a.length;
    var nb = trace._b.length;

    Axes.prepTicks(axis);

    // don't leave tickvals in axis looking like an attribute
    if(axis.tickmode === 'array') delete axis.tickvals;

    // The default is an empty array that will cause the join to remove the gridline if
    // it's just disappeared:
    // axis._startline = axis._endline = [];

    // If the cross axis uses bicubic interpolation, then the grid
    // lines fall once every three expanded grid row/cols:
    var stride = axis.smoothing ? 3 : 1;

    function constructValueGridline(value) {
        var i, j, j0, tj, pxy, i0, ti, xy, dxydi0, dxydi1, dxydj0, dxydj1;
        var xpoints = [];
        var ypoints = [];
        var ret = {};
        // Search for the fractional grid index giving this line:
        if(axisLetter === 'b') {
            // For the position we use just the i-j coordinates:
            j = trace.b2j(value);

            // The derivatives for catmull-rom splines are discontinuous across cell
            // boundaries though, so we need to provide both the cell and the position
            // within the cell separately:
            j0 = Math.floor(Math.max(0, Math.min(nb - 2, j)));
            tj = j - j0;

            ret.length = nb;
            ret.crossLength = na;

            ret.xy = function(i) {
                return trace.evalxy([], i, j);
            };

            ret.dxy = function(i0, ti) {
                return trace.dxydi([], i0, j0, ti, tj);
            };

            for(i = 0; i < na; i++) {
                i0 = Math.min(na - 2, i);
                ti = i - i0;
                xy = trace.evalxy([], i, j);

                if(crossAxis.smoothing && i > 0) {
                    // First control point:
                    dxydi0 = trace.dxydi([], i - 1, j0, 0, tj);
                    xpoints.push(pxy[0] + dxydi0[0] / 3);
                    ypoints.push(pxy[1] + dxydi0[1] / 3);

                    // Second control point:
                    dxydi1 = trace.dxydi([], i - 1, j0, 1, tj);
                    xpoints.push(xy[0] - dxydi1[0] / 3);
                    ypoints.push(xy[1] - dxydi1[1] / 3);
                }

                xpoints.push(xy[0]);
                ypoints.push(xy[1]);

                pxy = xy;
            }
        } else {
            i = trace.a2i(value);
            i0 = Math.floor(Math.max(0, Math.min(na - 2, i)));
            ti = i - i0;

            ret.length = na;
            ret.crossLength = nb;

            ret.xy = function(j) {
                return trace.evalxy([], i, j);
            };

            ret.dxy = function(j0, tj) {
                return trace.dxydj([], i0, j0, ti, tj);
            };

            for(j = 0; j < nb; j++) {
                j0 = Math.min(nb - 2, j);
                tj = j - j0;
                xy = trace.evalxy([], i, j);

                if(crossAxis.smoothing && j > 0) {
                    // First control point:
                    dxydj0 = trace.dxydj([], i0, j - 1, ti, 0);
                    xpoints.push(pxy[0] + dxydj0[0] / 3);
                    ypoints.push(pxy[1] + dxydj0[1] / 3);

                    // Second control point:
                    dxydj1 = trace.dxydj([], i0, j - 1, ti, 1);
                    xpoints.push(xy[0] - dxydj1[0] / 3);
                    ypoints.push(xy[1] - dxydj1[1] / 3);
                }

                xpoints.push(xy[0]);
                ypoints.push(xy[1]);

                pxy = xy;
            }
        }

        ret.axisLetter = axisLetter;
        ret.axis = axis;
        ret.crossAxis = crossAxis;
        ret.value = value;
        ret.constvar = crossAxisLetter;
        ret.index = n;
        ret.x = xpoints;
        ret.y = ypoints;
        ret.smoothing = crossAxis.smoothing;

        return ret;
    }

    function constructArrayGridline(idx) {
        var j, i0, j0, ti, tj;
        var xpoints = [];
        var ypoints = [];
        var ret = {};
        ret.length = data.length;
        ret.crossLength = crossData.length;

        if(axisLetter === 'b') {
            j0 = Math.max(0, Math.min(nb - 2, idx));
            tj = Math.min(1, Math.max(0, idx - j0));

            ret.xy = function(i) {
                return trace.evalxy([], i, idx);
            };

            ret.dxy = function(i0, ti) {
                return trace.dxydi([], i0, j0, ti, tj);
            };

            // In the tickmode: array case, this operation is a simple
            // transfer of data:
            for(j = 0; j < nea; j++) {
                xpoints[j] = xcp[idx * stride][j];
                ypoints[j] = ycp[idx * stride][j];
            }
        } else {
            i0 = Math.max(0, Math.min(na - 2, idx));
            ti = Math.min(1, Math.max(0, idx - i0));

            ret.xy = function(j) {
                return trace.evalxy([], idx, j);
            };

            ret.dxy = function(j0, tj) {
                return trace.dxydj([], i0, j0, ti, tj);
            };

            // In the tickmode: array case, this operation is a simple
            // transfer of data:
            for(j = 0; j < neb; j++) {
                xpoints[j] = xcp[j][idx * stride];
                ypoints[j] = ycp[j][idx * stride];
            }
        }

        ret.axisLetter = axisLetter;
        ret.axis = axis;
        ret.crossAxis = crossAxis;
        ret.value = data[idx];
        ret.constvar = crossAxisLetter;
        ret.index = idx;
        ret.x = xpoints;
        ret.y = ypoints;
        ret.smoothing = crossAxis.smoothing;

        return ret;
    }

    if(axis.tickmode === 'array') {
        // var j0 = axis.startline ? 1 : 0;
        // var j1 = data.length - (axis.endline ? 1 : 0);

        eps = 5e-15;
        bounds = [
            Math.floor(((data.length - 1) - axis.arraytick0) / axis.arraydtick * (1 + eps)),
            Math.ceil((- axis.arraytick0) / axis.arraydtick / (1 + eps))
        ].sort(function(a, b) {return a - b;});

        // Unpack sorted values so we can be sure to avoid infinite loops if something
        // is backwards:
        n1 = bounds[0] - 1;
        n2 = bounds[1] + 1;

        // If the axes fall along array lines, then this is a much simpler process since
        // we already have all the control points we need
        for(n = n1; n < n2; n++) {
            j = axis.arraytick0 + axis.arraydtick * n;
            if(j < 0 || j > data.length - 1) continue;
            gridlines.push(extendFlat(constructArrayGridline(j), {
                color: axis.gridcolor,
                width: axis.gridwidth
            }));
        }

        for(n = n1; n < n2; n++) {
            j0 = axis.arraytick0 + axis.arraydtick * n;
            j1 = Math.min(j0 + axis.arraydtick, data.length - 1);

            // TODO: fix the bounds computation so we don't have to do a large range and then throw
            // out unneeded numbers
            if(j0 < 0 || j0 > data.length - 1) continue;
            if(j1 < 0 || j1 > data.length - 1) continue;

            v0 = data[j0];
            v1 = data[j1];

            for(i = 0; i < axis.minorgridcount; i++) {
                d = j1 - j0;

                // TODO: fix the bounds computation so we don't have to do a large range and then throw
                // out unneeded numbers
                if(d <= 0) continue;

                // XXX: This calculation isn't quite right. Off by one somewhere?
                v = v0 + (v1 - v0) * (i + 1) / (axis.minorgridcount + 1) * (axis.arraydtick / d);

                // TODO: fix the bounds computation so we don't have to do a large range and then throw
                // out unneeded numbers
                if(v < data[0] || v > data[data.length - 1]) continue;
                minorgridlines.push(extendFlat(constructValueGridline(v), {
                    color: axis.minorgridcolor,
                    width: axis.minorgridwidth
                }));
            }
        }

        if(axis.startline) {
            boundarylines.push(extendFlat(constructArrayGridline(0), {
                color: axis.startlinecolor,
                width: axis.startlinewidth
            }));
        }

        if(axis.endline) {
            boundarylines.push(extendFlat(constructArrayGridline(data.length - 1), {
                color: axis.endlinecolor,
                width: axis.endlinewidth
            }));
        }
    } else {
        // If the lines do not fall along the axes, then we have to interpolate
        // the contro points and so some math to figure out where the lines are
        // in the first place.

        // Compute the integer boudns of tick0 + n * dtick that fall within the range
        // (roughly speaking):
        // Give this a nice generous epsilon. We use at as * (1 + eps) in order to make
        // inequalities a little tolerant in a more or less correct manner:
        eps = 5e-15;
        bounds = [
            Math.floor((data[data.length - 1] - axis.tick0) / axis.dtick * (1 + eps)),
            Math.ceil((data[0] - axis.tick0) / axis.dtick / (1 + eps))
        ].sort(function(a, b) {return a - b;});

        // Unpack sorted values so we can be sure to avoid infinite loops if something
        // is backwards:
        n1 = bounds[0];
        n2 = bounds[1];

        for(n = n1; n <= n2; n++) {
            value = axis.tick0 + axis.dtick * n;

            gridlines.push(extendFlat(constructValueGridline(value), {
                color: axis.gridcolor,
                width: axis.gridwidth
            }));
        }

        for(n = n1 - 1; n < n2 + 1; n++) {
            value = axis.tick0 + axis.dtick * n;

            for(i = 0; i < axis.minorgridcount; i++) {
                v = value + axis.dtick * (i + 1) / (axis.minorgridcount + 1);
                if(v < data[0] || v > data[data.length - 1]) continue;
                minorgridlines.push(extendFlat(constructValueGridline(v), {
                    color: axis.minorgridcolor,
                    width: axis.minorgridwidth
                }));
            }
        }

        if(axis.startline) {
            boundarylines.push(extendFlat(constructValueGridline(data[0]), {
                color: axis.startlinecolor,
                width: axis.startlinewidth
            }));
        }

        if(axis.endline) {
            boundarylines.push(extendFlat(constructValueGridline(data[data.length - 1]), {
                color: axis.endlinecolor,
                width: axis.endlinewidth
            }));
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/calc_labels.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/calc_labels.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = function calcLabels(trace, axis) {
    var i, tobj, prefix, suffix, gridline;

    var labels = axis._labels = [];
    var gridlines = axis._gridlines;

    for(i = 0; i < gridlines.length; i++) {
        gridline = gridlines[i];

        if(['start', 'both'].indexOf(axis.showticklabels) !== -1) {
            tobj = Axes.tickText(axis, gridline.value);

            extendFlat(tobj, {
                prefix: prefix,
                suffix: suffix,
                endAnchor: true,
                xy: gridline.xy(0),
                dxy: gridline.dxy(0, 0),
                axis: gridline.axis,
                length: gridline.crossAxis.length,
                font: gridline.axis.tickfont,
                isFirst: i === 0,
                isLast: i === gridlines.length - 1
            });

            labels.push(tobj);
        }

        if(['end', 'both'].indexOf(axis.showticklabels) !== -1) {
            tobj = Axes.tickText(axis, gridline.value);

            extendFlat(tobj, {
                endAnchor: false,
                xy: gridline.xy(gridline.crossLength - 1),
                dxy: gridline.dxy(gridline.crossLength - 2, 1),
                axis: gridline.axis,
                length: gridline.crossAxis.length,
                font: gridline.axis.tickfont,
                isFirst: i === 0,
                isLast: i === gridlines.length - 1
            });

            labels.push(tobj);
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/catmull_rom.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/catmull_rom.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



/*
 * Compute the tangent vector according to catmull-rom cubic splines (centripetal,
 * I think). That differs from the control point in two ways:
 *   1. It is a vector, not a position relative to the point
 *   2. the vector is longer than the position relative to p1 by a factor of 3
 *
 * Close to the boundaries, we'll use these as *quadratic control points, so that
 * to make a nice grid, we'll need to divide the tangent by 2 instead of 3. (The
 * math works out this way if you work through the bezier derivatives)
 */
var CatmullRomExp = 0.5;
module.exports = function makeControlPoints(p0, p1, p2, smoothness) {
    var d1x = p0[0] - p1[0];
    var d1y = p0[1] - p1[1];
    var d2x = p2[0] - p1[0];
    var d2y = p2[1] - p1[1];
    var d1a = Math.pow(d1x * d1x + d1y * d1y, CatmullRomExp / 2);
    var d2a = Math.pow(d2x * d2x + d2y * d2y, CatmullRomExp / 2);
    var numx = (d2a * d2a * d1x - d1a * d1a * d2x) * smoothness;
    var numy = (d2a * d2a * d1y - d1a * d1a * d2y) * smoothness;
    var denom1 = d2a * (d1a + d2a) * 3;
    var denom2 = d1a * (d1a + d2a) * 3;

    return [[
        p1[0] + (denom1 && numx / denom1),
        p1[1] + (denom1 && numy / denom1)
    ], [
        p1[0] - (denom2 && numx / denom2),
        p1[1] - (denom2 && numy / denom2)
    ]];
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/cheater_basis.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/cheater_basis.js ***!
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



var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

/*
 * Construct a 2D array of cheater values given a, b, and a slope.
 * If
 */
module.exports = function(a, b, cheaterslope) {
    var i, j, ascal, bscal, aval, bval;
    var data = [];

    var na = isArrayOrTypedArray(a) ? a.length : a;
    var nb = isArrayOrTypedArray(b) ? b.length : b;
    var adata = isArrayOrTypedArray(a) ? a : null;
    var bdata = isArrayOrTypedArray(b) ? b : null;

    // If we're using data, scale it so that for data that's just barely
    // not evenly spaced, the switch to value-based indexing is continuous.
    // This means evenly spaced data should look the same whether value
    // or index cheatertype.
    if(adata) {
        ascal = (adata.length - 1) / (adata[adata.length - 1] - adata[0]) / (na - 1);
    }

    if(bdata) {
        bscal = (bdata.length - 1) / (bdata[bdata.length - 1] - bdata[0]) / (nb - 1);
    }

    var xval;
    var xmin = Infinity;
    var xmax = -Infinity;
    for(j = 0; j < nb; j++) {
        data[j] = [];
        bval = bdata ? (bdata[j] - bdata[0]) * bscal : j / (nb - 1);
        for(i = 0; i < na; i++) {
            aval = adata ? (adata[i] - adata[0]) * ascal : i / (na - 1);
            xval = aval - bval * cheaterslope;
            xmin = Math.min(xval, xmin);
            xmax = Math.max(xval, xmax);
            data[j][i] = xval;
        }
    }

    // Normalize cheater values to the 0-1 range. This comes into play when you have
    // multiple cheater plots. After careful consideration, it seems better if cheater
    // values are normalized to a consistent range. Otherwise one cheater affects the
    // layout of other cheaters on the same axis.
    var slope = 1.0 / (xmax - xmin);
    var offset = -xmin * slope;
    for(j = 0; j < nb; j++) {
        for(i = 0; i < na; i++) {
            data[j][i] = slope * data[j][i] + offset;
        }
    }

    return data;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/compute_control_points.js":
/*!****************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/compute_control_points.js ***!
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



var makeControlPoints = __webpack_require__(/*! ./catmull_rom */ "./node_modules/plotly.js/src/traces/carpet/catmull_rom.js");
var ensureArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").ensureArray;

/*
 * Turns a coarse grid into a fine grid with control points.
 *
 * Here's an ASCII representation:
 *
 *       o ----- o ----- o ----- o
 *       |       |       |       |
 *       |       |       |       |
 *       |       |       |       |
 *       o ----- o ----- o ----- o
 *       |       |       |       |
 *       |       |       |       |
 *    ^  |       |       |       |
 *    |  o ----- o ----- o ----- o
 *  b |  |       |       |       |
 *    |  |       |       |       |
 *    |  |       |       |       |
 *       o ----- o ----- o ----- o
 *         ------>
 *           a
 *
 * First of all, note that we want to do this in *cartesian* space. This means
 * we might run into problems when there are extreme differences in x/y scaling,
 * but the alternative is that the topology of the contours might actually be
 * view-dependent, which seems worse. As a fallback, the only parameter that
 * actually affects the result is the *aspect ratio*, so that we can at least
 * improve the situation a bit without going all the way to screen coordinates.
 *
 * This function flattens the points + tangents  into a slightly denser grid of
 * *control points*. The resulting grid looks like this:
 *
 *       9 +--o-o--+ -o-o--+--o-o--+
 *       8 o  o o  o  o o  o  o o  o
 *         |       |       |       |
 *       7 o  o o  o  o o  o  o o  o
 *       6 +--o-o--+ -o-o--+--o-o--+
 *       5 o  o o  o  o o  o  o o  o
 *         |       |       |       |
 *    ^  4 o  o o  o  o o  o  o o  o
 *    |  3 +--o-o--+ -o-o--+--o-o--+
 *  b |  2 o  o o  o  o o  o  o o  o
 *    |    |       |       |       |
 *    |  1 o  o o  o  o o  o  o o  o
 *       0 +--o-o--+ -o-o--+--o-o--+
 *         0  1 2  3  4 5  6  7 8  9
 *         ------>
 *           a
 *
 * where `o`s represent newly-computed control points. the resulting dimension is
 *
 *     (m - 1) * 3 + 1
 *   = 3 * m - 2
 *
 * We could simply store the tangents separately, but that's a nightmare to organize
 * in two dimensions since we'll be slicing grid lines in both directions and since
 * that basically requires very nearly just as much storage as just storing the dense
 * grid.
 *
 * Wow!
 */


/*
 * Catmull-rom is biased at the boundaries toward the interior and we actually
 * can't use catmull-rom to compute the control point closest to (but inside)
 * the boundary.
 *
 * A note on plotly's spline interpolation. It uses the catmull rom control point
 * closest to the boundary *as* a quadratic control point. This seems incorrect,
 * so I've elected not to follow that. Given control points 0 and 1, regular plotly
 * splines give *equivalent* cubic control points:
 *
 * Input:
 *
 *   boundary
 *     |                    |
 *     p0           p2      p3    --> interior
 *     0.0          0.667   1.0
 *     |                    |
 *
 * Cubic-equivalent of what plotly splines draw::
 *
 *   boundary
 *     |                    |
 *     p0   p1      p2      p3    --> interior
 *     0.0  0.4444  0.8888  1.0
 *     |                    |
 *
 * What this function fills in:
 *
 *   boundary
 *     |                    |
 *     p0    p1     p2      p3    --> interior
 *     0.0   0.333  0.667   1.0
 *     |                    |
 *
 * Parameters:
 *   p0: boundary point
 *   p2: catmull rom point based on computation at p3
 *   p3: first grid point
 *
 * Of course it works whichever way it's oriented; you just need to interpret the
 * input/output accordingly.
 */
function inferCubicControlPoint(p0, p2, p3) {
    // Extend p1 away from p0 by 50%. This is the equivalent quadratic point that
    // would give the same slope as catmull rom at p0.
    var p2e0 = -0.5 * p3[0] + 1.5 * p2[0];
    var p2e1 = -0.5 * p3[1] + 1.5 * p2[1];

    return [
        (2 * p2e0 + p0[0]) / 3,
        (2 * p2e1 + p0[1]) / 3,
    ];
}

module.exports = function computeControlPoints(xe, ye, x, y, asmoothing, bsmoothing) {
    var i, j, ie, je, xej, yej, xj, yj, cp, p1;
    // At this point, we know these dimensions are correct and representative of
    // the whole 2D arrays:
    var na = x[0].length;
    var nb = x.length;

    // (n)umber of (e)xpanded points:
    var nea = asmoothing ? 3 * na - 2 : na;
    var neb = bsmoothing ? 3 * nb - 2 : nb;

    xe = ensureArray(xe, neb);
    ye = ensureArray(ye, neb);

    for(ie = 0; ie < neb; ie++) {
        xe[ie] = ensureArray(xe[ie], nea);
        ye[ie] = ensureArray(ye[ie], nea);
    }

    // This loop fills in the X'd points:
    //
    //    .       .       .       .
    //    .       .       .       .
    //    |       |       |       |
    //    |       |       |       |
    //    X ----- X ----- X ----- X
    //    |       |       |       |
    //    |       |       |       |
    //    |       |       |       |
    //    X ----- X ----- X ----- X
    //
    //
    // ie = (i) (e)xpanded:
    for(j = 0, je = 0; j < nb; j++, je += bsmoothing ? 3 : 1) {
        xej = xe[je];
        yej = ye[je];
        xj = x[j];
        yj = y[j];

        // je = (j) (e)xpanded:
        for(i = 0, ie = 0; i < na; i++, ie += asmoothing ? 3 : 1) {
            xej[ie] = xj[i];
            yej[ie] = yj[i];
        }
    }

    if(asmoothing) {
        // If there's a-smoothing, this loop fills in the X'd points with catmull-rom
        // control points computed along the a-axis:
        //     .       .       .       .
        //     .       .       .       .
        //     |       |       |       |
        //     |       |       |       |
        //     o -Y-X- o -X-X- o -X-Y- o
        //     |       |       |       |
        //     |       |       |       |
        //     |       |       |       |
        //     o -Y-X- o -X-X- o -X-Y- o
        //
        // i:  0       1       2       3
        // ie: 0  1 3  3  4 5  6  7 8  9
        //
        //           ------>
        //             a
        //
        for(j = 0, je = 0; j < nb; j++, je += bsmoothing ? 3 : 1) {
            // Fill in the points marked X for this a-row:
            for(i = 1, ie = 3; i < na - 1; i++, ie += 3) {
                cp = makeControlPoints(
                    [x[j][i - 1], y[j][i - 1]],
                    [x[j][i ], y[j][i]],
                    [x[j][i + 1], y[j][i + 1]],
                    asmoothing
                );

                xe[je][ie - 1] = cp[0][0];
                ye[je][ie - 1] = cp[0][1];
                xe[je][ie + 1] = cp[1][0];
                ye[je][ie + 1] = cp[1][1];
            }

            // The very first cubic interpolation point (to the left for i = 1 above) is
            // used as a *quadratic* interpolation point by the spline drawing function
            // which isn't really correct. But for the sake of consistency, we'll use it
            // as such. Since we're using cubic splines, that means we need to shorten the
            // tangent by 1/3 and also construct a new cubic spline control point 1/3 from
            // the original to the i = 0 point.
            p1 = inferCubicControlPoint(
                [xe[je][0], ye[je][0]],
                [xe[je][2], ye[je][2]],
                [xe[je][3], ye[je][3]]
            );
            xe[je][1] = p1[0];
            ye[je][1] = p1[1];

            // Ditto last points, sans explanation:
            p1 = inferCubicControlPoint(
                [xe[je][nea - 1], ye[je][nea - 1]],
                [xe[je][nea - 3], ye[je][nea - 3]],
                [xe[je][nea - 4], ye[je][nea - 4]]
            );
            xe[je][nea - 2] = p1[0];
            ye[je][nea - 2] = p1[1];
        }
    }

    if(bsmoothing) {
        // If there's a-smoothing, this loop fills in the X'd points with catmull-rom
        // control points computed along the b-axis:
        //     .       .       .       .
        //     X  X X  X  X X  X  X X  X
        //     |       |       |       |
        //     X  X X  X  X X  X  X X  X
        //     o -o-o- o -o-o- o -o-o- o
        //     X  X X  X  X X  X  X X  X
        //     |       |       |       |
        //     Y  Y Y  Y  Y Y  Y  Y Y  Y
        //     o -o-o- o -o-o- o -o-o- o
        //
        // i:  0       1       2       3
        // ie: 0  1 3  3  4 5  6  7 8  9
        //
        //           ------>
        //             a
        //
        for(ie = 0; ie < nea; ie++) {
            for(je = 3; je < neb - 3; je += 3) {
                cp = makeControlPoints(
                    [xe[je - 3][ie], ye[je - 3][ie]],
                    [xe[je][ie], ye[je][ie]],
                    [xe[je + 3][ie], ye[je + 3][ie]],
                    bsmoothing
                );

                xe[je - 1][ie] = cp[0][0];
                ye[je - 1][ie] = cp[0][1];
                xe[je + 1][ie] = cp[1][0];
                ye[je + 1][ie] = cp[1][1];
            }
            // Do the same boundary condition magic for these control points marked Y above:
            p1 = inferCubicControlPoint(
                [xe[0][ie], ye[0][ie]],
                [xe[2][ie], ye[2][ie]],
                [xe[3][ie], ye[3][ie]]
            );
            xe[1][ie] = p1[0];
            ye[1][ie] = p1[1];

            p1 = inferCubicControlPoint(
                [xe[neb - 1][ie], ye[neb - 1][ie]],
                [xe[neb - 3][ie], ye[neb - 3][ie]],
                [xe[neb - 4][ie], ye[neb - 4][ie]]
            );
            xe[neb - 2][ie] = p1[0];
            ye[neb - 2][ie] = p1[1];
        }
    }

    if(asmoothing && bsmoothing) {
        // Do one more pass, this time recomputing exactly what we just computed.
        // It's overdetermined since we're peforming catmull-rom in two directions,
        // so we'll just average the overdetermined. These points don't lie along the
        // grid lines, so note that only grid lines will follow normal plotly spline
        // interpolation.
        //
        // Unless of course there was no b smoothing. Then these intermediate points
        // don't actually exist and this section is bypassed.
        //     .       .       .       .
        //     o  X X  o  X X  o  X X  o
        //     |       |       |       |
        //     o  X X  o  X X  o  X X  o
        //     o -o-o- o -o-o- o -o-o- o
        //     o  X X  o  X X  o  X X  o
        //     |       |       |       |
        //     o  Y Y  o  Y Y  o  Y Y  o
        //     o -o-o- o -o-o- o -o-o- o
        //
        // i:  0       1       2       3
        // ie: 0  1 3  3  4 5  6  7 8  9
        //
        //           ------>
        //             a
        //
        for(je = 1; je < neb; je += (je + 1) % 3 === 0 ? 2 : 1) {
            // Fill in the points marked X for this a-row:
            for(ie = 3; ie < nea - 3; ie += 3) {
                cp = makeControlPoints(
                    [xe[je][ie - 3], ye[je][ie - 3]],
                    [xe[je][ie], ye[je][ie]],
                    [xe[je][ie + 3], ye[je][ie + 3]],
                    asmoothing
                );

                xe[je][ie - 1] = 0.5 * (xe[je][ie - 1] + cp[0][0]);
                ye[je][ie - 1] = 0.5 * (ye[je][ie - 1] + cp[0][1]);
                xe[je][ie + 1] = 0.5 * (xe[je][ie + 1] + cp[1][0]);
                ye[je][ie + 1] = 0.5 * (ye[je][ie + 1] + cp[1][1]);
            }

            // This case is just slightly different. The computation is the same,
            // but having computed this, we'll average with the existing result.
            p1 = inferCubicControlPoint(
                [xe[je][0], ye[je][0]],
                [xe[je][2], ye[je][2]],
                [xe[je][3], ye[je][3]]
            );
            xe[je][1] = 0.5 * (xe[je][1] + p1[0]);
            ye[je][1] = 0.5 * (ye[je][1] + p1[1]);

            p1 = inferCubicControlPoint(
                [xe[je][nea - 1], ye[je][nea - 1]],
                [xe[je][nea - 3], ye[je][nea - 3]],
                [xe[je][nea - 4], ye[je][nea - 4]]
            );
            xe[je][nea - 2] = 0.5 * (xe[je][nea - 2] + p1[0]);
            ye[je][nea - 2] = 0.5 * (ye[je][nea - 2] + p1[1]);
        }
    }

    return [xe, ye];
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/constants.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/constants.js ***!
  \***************************************************************/
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
    RELATIVE_CULL_TOLERANCE: 1e-6
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/create_i_derivative_evaluator.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/create_i_derivative_evaluator.js ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



/*
 * Evaluates the derivative of a list of control point arrays. That is, it expects an array or arrays
 * that are expanded relative to the raw data to include the bicubic control points, if applicable. If
 * only linear interpolation is desired, then the data points correspond 1-1 along that axis to the
 * data itself. Since it's catmull-rom splines in either direction note in particular that the
 * derivatives are discontinuous across cell boundaries. That's the reason you need both the *cell*
 * and the *point within the cell*.
 *
 * Also note that the discontinuity of the derivative is in magnitude only. The direction *is*
 * continuous across cell boundaries.
 *
 * For example, to compute the derivative of the xcoordinate halfway betwen the 7 and 8th i-gridpoints
 * and the 10th and 11th j-gridpoints given bicubic smoothing in both dimensions, you'd write:
 *
 *     var deriv = createIDerivativeEvaluator([x], 1, 1);
 *
 *     var dxdi = deriv([], 7, 10, 0.5, 0.5);
 *     // => [0.12345]
 *
 * Since there'd be a bunch of duplicate computation to compute multiple derivatives, you can double
 * this up by providing more arrays:
 *
 *     var deriv = createIDerivativeEvaluator([x, y], 1, 1);
 *
 *     var dxdi = deriv([], 7, 10, 0.5, 0.5);
 *     // => [0.12345, 0.78910]
 *
 * NB: It's presumed that at this point all data has been sanitized and is valid numerical data arrays
 * of the correct dimension.
 */
module.exports = function(arrays, asmoothing, bsmoothing) {
    if(asmoothing && bsmoothing) {
        return function(out, i0, j0, u, v) {
            if(!out) out = [];
            var f0, f1, f2, f3, ak, k;

            // Since it's a grid of control points, the actual indices are * 3:
            i0 *= 3;
            j0 *= 3;

            // Precompute some numbers:
            var u2 = u * u;
            var ou = 1 - u;
            var ou2 = ou * ou;
            var ouu2 = ou * u * 2;
            var a = -3 * ou2;
            var b = 3 * (ou2 - ouu2);
            var c = 3 * (ouu2 - u2);
            var d = 3 * u2;

            var v2 = v * v;
            var v3 = v2 * v;
            var ov = 1 - v;
            var ov2 = ov * ov;
            var ov3 = ov2 * ov;

            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                // Compute the derivatives in the u-direction:
                f0 = a * ak[j0 ][i0] + b * ak[j0 ][i0 + 1] + c * ak[j0 ][i0 + 2] + d * ak[j0 ][i0 + 3];
                f1 = a * ak[j0 + 1][i0] + b * ak[j0 + 1][i0 + 1] + c * ak[j0 + 1][i0 + 2] + d * ak[j0 + 1][i0 + 3];
                f2 = a * ak[j0 + 2][i0] + b * ak[j0 + 2][i0 + 1] + c * ak[j0 + 2][i0 + 2] + d * ak[j0 + 2][i0 + 3];
                f3 = a * ak[j0 + 3][i0] + b * ak[j0 + 3][i0 + 1] + c * ak[j0 + 3][i0 + 2] + d * ak[j0 + 3][i0 + 3];

                // Now just interpolate in the v-direction since it's all separable:
                out[k] = ov3 * f0 + 3 * (ov2 * v * f1 + ov * v2 * f2) + v3 * f3;
            }

            return out;
        };
    } else if(asmoothing) {
        // Handle smooth in the a-direction but linear in the b-direction by performing four
        // linear interpolations followed by one cubic interpolation of the result
        return function(out, i0, j0, u, v) {
            if(!out) out = [];
            var f0, f1, k, ak;
            i0 *= 3;
            var u2 = u * u;
            var ou = 1 - u;
            var ou2 = ou * ou;
            var ouu2 = ou * u * 2;
            var a = -3 * ou2;
            var b = 3 * (ou2 - ouu2);
            var c = 3 * (ouu2 - u2);
            var d = 3 * u2;
            var ov = 1 - v;
            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                f0 = a * ak[j0 ][i0] + b * ak[j0 ][i0 + 1] + c * ak[j0 ][i0 + 2] + d * ak[j0 ][i0 + 3];
                f1 = a * ak[j0 + 1][i0] + b * ak[j0 + 1][i0 + 1] + c * ak[j0 + 1][i0 + 2] + d * ak[j0 + 1][i0 + 3];

                out[k] = ov * f0 + v * f1;
            }
            return out;
        };
    } else if(bsmoothing) {
        // Same as the above case, except reversed. I've disabled the no-unused vars rule
        // so that this function is fully interpolation-agnostic. Otherwise it would need
        // to be called differently in different cases. Which wouldn't be the worst, but
        /* eslint-disable no-unused-vars */
        return function(out, i0, j0, u, v) {
        /* eslint-enable no-unused-vars */
            if(!out) out = [];
            var f0, f1, f2, f3, k, ak;
            j0 *= 3;
            var v2 = v * v;
            var v3 = v2 * v;
            var ov = 1 - v;
            var ov2 = ov * ov;
            var ov3 = ov2 * ov;
            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                f0 = ak[j0][i0 + 1] - ak[j0][i0];
                f1 = ak[j0 + 1][i0 + 1] - ak[j0 + 1][i0];
                f2 = ak[j0 + 2][i0 + 1] - ak[j0 + 2][i0];
                f3 = ak[j0 + 3][i0 + 1] - ak[j0 + 3][i0];

                out[k] = ov3 * f0 + 3 * (ov2 * v * f1 + ov * v2 * f2) + v3 * f3;
            }
            return out;
        };
    } else {
        // Finally, both directions are linear:
        /* eslint-disable no-unused-vars */
        return function(out, i0, j0, u, v) {
        /* eslint-enable no-unused-vars */
            if(!out) out = [];
            var f0, f1, k, ak;
            var ov = 1 - v;
            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                f0 = ak[j0][i0 + 1] - ak[j0][i0];
                f1 = ak[j0 + 1][i0 + 1] - ak[j0 + 1][i0];

                out[k] = ov * f0 + v * f1;
            }
            return out;
        };
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/create_j_derivative_evaluator.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/create_j_derivative_evaluator.js ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function(arrays, asmoothing, bsmoothing) {
    if(asmoothing && bsmoothing) {
        return function(out, i0, j0, u, v) {
            if(!out) out = [];
            var f0, f1, f2, f3, ak, k;

            // Since it's a grid of control points, the actual indices are * 3:
            i0 *= 3;
            j0 *= 3;

            // Precompute some numbers:
            var u2 = u * u;
            var u3 = u2 * u;
            var ou = 1 - u;
            var ou2 = ou * ou;
            var ou3 = ou2 * ou;

            var v2 = v * v;
            var ov = 1 - v;
            var ov2 = ov * ov;
            var ovv2 = ov * v * 2;
            var a = -3 * ov2;
            var b = 3 * (ov2 - ovv2);
            var c = 3 * (ovv2 - v2);
            var d = 3 * v2;

            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];

                // Compute the derivatives in the v-direction:
                f0 = a * ak[j0][i0] + b * ak[j0 + 1][i0] + c * ak[j0 + 2][i0] + d * ak[j0 + 3][i0];
                f1 = a * ak[j0][i0 + 1] + b * ak[j0 + 1][i0 + 1] + c * ak[j0 + 2][i0 + 1] + d * ak[j0 + 3][i0 + 1];
                f2 = a * ak[j0][i0 + 2] + b * ak[j0 + 1][i0 + 2] + c * ak[j0 + 2][i0 + 2] + d * ak[j0 + 3][i0 + 2];
                f3 = a * ak[j0][i0 + 3] + b * ak[j0 + 1][i0 + 3] + c * ak[j0 + 2][i0 + 3] + d * ak[j0 + 3][i0 + 3];

                // Now just interpolate in the v-direction since it's all separable:
                out[k] = ou3 * f0 + 3 * (ou2 * u * f1 + ou * u2 * f2) + u3 * f3;
            }

            return out;
        };
    } else if(asmoothing) {
        // Handle smooth in the a-direction but linear in the b-direction by performing four
        // linear interpolations followed by one cubic interpolation of the result
        return function(out, i0, j0, v, u) {
            if(!out) out = [];
            var f0, f1, f2, f3, k, ak;
            i0 *= 3;
            var u2 = u * u;
            var u3 = u2 * u;
            var ou = 1 - u;
            var ou2 = ou * ou;
            var ou3 = ou2 * ou;
            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];

                f0 = ak[j0 + 1][i0] - ak[j0][i0];
                f1 = ak[j0 + 1][i0 + 1] - ak[j0][i0 + 1];
                f2 = ak[j0 + 1][i0 + 2] - ak[j0][i0 + 2];
                f3 = ak[j0 + 1][i0 + 3] - ak[j0][i0 + 3];

                out[k] = ou3 * f0 + 3 * (ou2 * u * f1 + ou * u2 * f2) + u3 * f3;

                // mathematically equivalent:
                // f0 = ou3 * ak[j0    ][i0] + 3 * (ou2 * u * ak[j0    ][i0 + 1] + ou * u2 * ak[j0    ][i0 + 2]) + u3 * ak[j0    ][i0 + 3];
                // f1 = ou3 * ak[j0 + 1][i0] + 3 * (ou2 * u * ak[j0 + 1][i0 + 1] + ou * u2 * ak[j0 + 1][i0 + 2]) + u3 * ak[j0 + 1][i0 + 3];
                // out[k] = f1 - f0;
            }
            return out;
        };
    } else if(bsmoothing) {
        // Same as the above case, except reversed:
        /* eslint-disable no-unused-vars */
        return function(out, i0, j0, u, v) {
        /* eslint-enable no-unused-vars */
            if(!out) out = [];
            var f0, f1, k, ak;
            j0 *= 3;
            var ou = 1 - u;
            var v2 = v * v;
            var ov = 1 - v;
            var ov2 = ov * ov;
            var ovv2 = ov * v * 2;
            var a = -3 * ov2;
            var b = 3 * (ov2 - ovv2);
            var c = 3 * (ovv2 - v2);
            var d = 3 * v2;
            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                f0 = a * ak[j0][i0] + b * ak[j0 + 1][i0] + c * ak[j0 + 2][i0] + d * ak[j0 + 3][i0];
                f1 = a * ak[j0][i0 + 1] + b * ak[j0 + 1][i0 + 1] + c * ak[j0 + 2][i0 + 1] + d * ak[j0 + 3][i0 + 1];

                out[k] = ou * f0 + u * f1;
            }
            return out;
        };
    } else {
        // Finally, both directions are linear:
        /* eslint-disable no-unused-vars */
        return function(out, i0, j0, v, u) {
        /* eslint-enable no-unused-vars */
            if(!out) out = [];
            var f0, f1, k, ak;
            var ov = 1 - v;
            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                f0 = ak[j0 + 1][i0] - ak[j0][i0];
                f1 = ak[j0 + 1][i0 + 1] - ak[j0][i0 + 1];

                out[k] = ov * f0 + v * f1;
            }
            return out;
        };
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/create_spline_evaluator.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/create_spline_evaluator.js ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



/*
 * Return a function that evaluates a set of linear or bicubic control points.
 * This will get evaluated a lot, so we'll at least do a bit of extra work to
 * flatten some of the choices. In particular, we'll unroll the linear/bicubic
 * combinations and we'll allow computing results in parallel to cut down
 * on repeated arithmetic.
 *
 * Take note that we don't search for the correct range in this function. The
 * reason is for consistency due to the corrresponding derivative function. In
 * particular, the derivatives aren't continuous across cells, so it's important
 * to be able control whether the derivative at a cell boundary is approached
 * from one side or the other.
 */
module.exports = function(arrays, na, nb, asmoothing, bsmoothing) {
    var imax = na - 2;
    var jmax = nb - 2;

    if(asmoothing && bsmoothing) {
        return function(out, i, j) {
            if(!out) out = [];
            var f0, f1, f2, f3, ak, k;

            var i0 = Math.max(0, Math.min(Math.floor(i), imax));
            var j0 = Math.max(0, Math.min(Math.floor(j), jmax));
            var u = Math.max(0, Math.min(1, i - i0));
            var v = Math.max(0, Math.min(1, j - j0));

            // Since it's a grid of control points, the actual indices are * 3:
            i0 *= 3;
            j0 *= 3;

            // Precompute some numbers:
            var u2 = u * u;
            var u3 = u2 * u;
            var ou = 1 - u;
            var ou2 = ou * ou;
            var ou3 = ou2 * ou;

            var v2 = v * v;
            var v3 = v2 * v;
            var ov = 1 - v;
            var ov2 = ov * ov;
            var ov3 = ov2 * ov;

            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                f0 = ou3 * ak[j0][i0] + 3 * (ou2 * u * ak[j0][i0 + 1] + ou * u2 * ak[j0][i0 + 2]) + u3 * ak[j0][i0 + 3];
                f1 = ou3 * ak[j0 + 1][i0] + 3 * (ou2 * u * ak[j0 + 1][i0 + 1] + ou * u2 * ak[j0 + 1][i0 + 2]) + u3 * ak[j0 + 1][i0 + 3];
                f2 = ou3 * ak[j0 + 2][i0] + 3 * (ou2 * u * ak[j0 + 2][i0 + 1] + ou * u2 * ak[j0 + 2][i0 + 2]) + u3 * ak[j0 + 2][i0 + 3];
                f3 = ou3 * ak[j0 + 3][i0] + 3 * (ou2 * u * ak[j0 + 3][i0 + 1] + ou * u2 * ak[j0 + 3][i0 + 2]) + u3 * ak[j0 + 3][i0 + 3];
                out[k] = ov3 * f0 + 3 * (ov2 * v * f1 + ov * v2 * f2) + v3 * f3;
            }

            return out;
        };
    } else if(asmoothing) {
        // Handle smooth in the a-direction but linear in the b-direction by performing four
        // linear interpolations followed by one cubic interpolation of the result
        return function(out, i, j) {
            if(!out) out = [];

            var i0 = Math.max(0, Math.min(Math.floor(i), imax));
            var j0 = Math.max(0, Math.min(Math.floor(j), jmax));
            var u = Math.max(0, Math.min(1, i - i0));
            var v = Math.max(0, Math.min(1, j - j0));

            var f0, f1, f2, f3, k, ak;
            i0 *= 3;
            var u2 = u * u;
            var u3 = u2 * u;
            var ou = 1 - u;
            var ou2 = ou * ou;
            var ou3 = ou2 * ou;
            var ov = 1 - v;
            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                f0 = ov * ak[j0][i0] + v * ak[j0 + 1][i0];
                f1 = ov * ak[j0][i0 + 1] + v * ak[j0 + 1][i0 + 1];
                f2 = ov * ak[j0][i0 + 2] + v * ak[j0 + 1][i0 + 1];
                f3 = ov * ak[j0][i0 + 3] + v * ak[j0 + 1][i0 + 1];

                out[k] = ou3 * f0 + 3 * (ou2 * u * f1 + ou * u2 * f2) + u3 * f3;
            }
            return out;
        };
    } else if(bsmoothing) {
        // Same as the above case, except reversed:
        return function(out, i, j) {
            if(!out) out = [];

            var i0 = Math.max(0, Math.min(Math.floor(i), imax));
            var j0 = Math.max(0, Math.min(Math.floor(j), jmax));
            var u = Math.max(0, Math.min(1, i - i0));
            var v = Math.max(0, Math.min(1, j - j0));

            var f0, f1, f2, f3, k, ak;
            j0 *= 3;
            var v2 = v * v;
            var v3 = v2 * v;
            var ov = 1 - v;
            var ov2 = ov * ov;
            var ov3 = ov2 * ov;
            var ou = 1 - u;
            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                f0 = ou * ak[j0][i0] + u * ak[j0][i0 + 1];
                f1 = ou * ak[j0 + 1][i0] + u * ak[j0 + 1][i0 + 1];
                f2 = ou * ak[j0 + 2][i0] + u * ak[j0 + 2][i0 + 1];
                f3 = ou * ak[j0 + 3][i0] + u * ak[j0 + 3][i0 + 1];

                out[k] = ov3 * f0 + 3 * (ov2 * v * f1 + ov * v2 * f2) + v3 * f3;
            }
            return out;
        };
    } else {
        // Finally, both directions are linear:
        return function(out, i, j) {
            if(!out) out = [];

            var i0 = Math.max(0, Math.min(Math.floor(i), imax));
            var j0 = Math.max(0, Math.min(Math.floor(j), jmax));
            var u = Math.max(0, Math.min(1, i - i0));
            var v = Math.max(0, Math.min(1, j - j0));

            var f0, f1, k, ak;
            var ov = 1 - v;
            var ou = 1 - u;
            for(k = 0; k < arrays.length; k++) {
                ak = arrays[k];
                f0 = ou * ak[j0][i0] + u * ak[j0][i0 + 1];
                f1 = ou * ak[j0 + 1][i0] + u * ak[j0 + 1][i0 + 1];

                out[k] = ov * f0 + v * f1;
            }
            return out;
        };
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/defaults.js ***!
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
var handleXYDefaults = __webpack_require__(/*! ./xy_defaults */ "./node_modules/plotly.js/src/traces/carpet/xy_defaults.js");
var handleABDefaults = __webpack_require__(/*! ./ab_defaults */ "./node_modules/plotly.js/src/traces/carpet/ab_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/carpet/attributes.js");
var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, dfltColor, fullLayout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    traceOut._clipPathId = 'clip' + traceOut.uid + 'carpet';

    var defaultColor = coerce('color', colorAttrs.defaultLine);
    Lib.coerceFont(coerce, 'font');

    coerce('carpet');

    handleABDefaults(traceIn, traceOut, fullLayout, coerce, defaultColor);

    if(!traceOut.a || !traceOut.b) {
        traceOut.visible = false;
        return;
    }

    if(traceOut.a.length < 3) {
        traceOut.aaxis.smoothing = 0;
    }

    if(traceOut.b.length < 3) {
        traceOut.baxis.smoothing = 0;
    }

    // NB: the input is x/y arrays. You should know that the *first* dimension of x and y
    // corresponds to b and the second to a. This sounds backwards but ends up making sense
    // the important part to know is that when you write y[j][i], j goes from 0 to b.length - 1
    // and i goes from 0 to a.length - 1.
    var validData = handleXYDefaults(traceIn, traceOut, coerce);
    if(!validData) {
        traceOut.visible = false;
    }

    if(traceOut._cheater) {
        coerce('cheaterslope');
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/carpet/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/carpet/defaults.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/carpet/plot.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/carpet/calc.js"),
    animatable: true,
    isContainer: true, // so carpet traces get `calc` before other traces

    moduleType: 'trace',
    name: 'carpet',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', 'carpet', 'carpetAxis', 'notLegendIsolatable', 'noMultiCategory', 'noHover', 'noSortingByValue'],
    meta: {
        description: [
            'The data describing carpet axis layout is set in `y` and (optionally)',
            'also `x`. If only `y` is present, `x` the plot is interpreted as a',
            'cheater plot and is filled in using the `y` values.',

            '`x` and `y` may either be 2D arrays matching with each dimension matching',
            'that of `a` and `b`, or they may be 1D arrays with total length equal to',
            'that of `a` and `b`.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/makepath.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/makepath.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function makePath(xp, yp, isBicubic) {
    // Prevent d3 errors that would result otherwise:
    if(xp.length === 0) return '';

    var i;
    var path = [];
    var stride = isBicubic ? 3 : 1;
    for(i = 0; i < xp.length; i += stride) {
        path.push(xp[i] + ',' + yp[i]);

        if(isBicubic && i < xp.length - stride) {
            path.push('C');
            path.push([
                xp[i + 1] + ',' + yp[i + 1],
                xp[i + 2] + ',' + yp[i + 2] + ' ',
            ].join(' '));
        }
    }
    return path.join(isBicubic ? '' : 'L');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/map_1d_array.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/map_1d_array.js ***!
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



var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

/*
 * Map an array of x or y coordinates (c) to screen-space pixel coordinates (p).
 * The output array is optional, but if provided, it will be reused without
 * reallocation to the extent possible.
 */
module.exports = function mapArray(out, data, func) {
    var i;

    if(!isArrayOrTypedArray(out)) {
        // If not an array, make it an array:
        out = [];
    } else if(out.length > data.length) {
        // If too long, truncate. (If too short, it will grow
        // automatically so we don't care about that case)
        out = out.slice(0, data.length);
    }

    for(i = 0; i < data.length; i++) {
        out[i] = func(data[i]);
    }

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/orient_text.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/orient_text.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




module.exports = function orientText(trace, xaxis, yaxis, xy, dxy, refDxy) {
    var dx = dxy[0] * trace.dpdx(xaxis);
    var dy = dxy[1] * trace.dpdy(yaxis);
    var flip = 1;

    var offsetMultiplier = 1.0;
    if(refDxy) {
        var l1 = Math.sqrt(dxy[0] * dxy[0] + dxy[1] * dxy[1]);
        var l2 = Math.sqrt(refDxy[0] * refDxy[0] + refDxy[1] * refDxy[1]);
        var dot = (dxy[0] * refDxy[0] + dxy[1] * refDxy[1]) / l1 / l2;
        offsetMultiplier = Math.max(0.0, dot);
    }

    var angle = Math.atan2(dy, dx) * 180 / Math.PI;
    if(angle < -90) {
        angle += 180;
        flip = -flip;
    } else if(angle > 90) {
        angle -= 180;
        flip = -flip;
    }

    return {
        angle: angle,
        flip: flip,
        p: trace.c2p(xy, xaxis, yaxis),
        offsetMultplier: offsetMultiplier
    };
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/plot.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/plot.js ***!
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
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var map1dArray = __webpack_require__(/*! ./map_1d_array */ "./node_modules/plotly.js/src/traces/carpet/map_1d_array.js");
var makepath = __webpack_require__(/*! ./makepath */ "./node_modules/plotly.js/src/traces/carpet/makepath.js");
var orientText = __webpack_require__(/*! ./orient_text */ "./node_modules/plotly.js/src/traces/carpet/orient_text.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var alignmentConstants = __webpack_require__(/*! ../../constants/alignment */ "./node_modules/plotly.js/src/constants/alignment.js");

module.exports = function plot(gd, plotinfo, cdcarpet, carpetLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;
    var fullLayout = gd._fullLayout;
    var clipLayer = fullLayout._clips;

    Lib.makeTraceGroups(carpetLayer, cdcarpet, 'trace').each(function(cd) {
        var axisLayer = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;
        var aax = trace.aaxis;
        var bax = trace.baxis;

        var minorLayer = Lib.ensureSingle(axisLayer, 'g', 'minorlayer');
        var majorLayer = Lib.ensureSingle(axisLayer, 'g', 'majorlayer');
        var boundaryLayer = Lib.ensureSingle(axisLayer, 'g', 'boundarylayer');
        var labelLayer = Lib.ensureSingle(axisLayer, 'g', 'labellayer');

        axisLayer.style('opacity', trace.opacity);

        drawGridLines(xa, ya, majorLayer, aax, 'a', aax._gridlines, true);
        drawGridLines(xa, ya, majorLayer, bax, 'b', bax._gridlines, true);
        drawGridLines(xa, ya, minorLayer, aax, 'a', aax._minorgridlines, true);
        drawGridLines(xa, ya, minorLayer, bax, 'b', bax._minorgridlines, true);

        // NB: These are not ommitted if the lines are not active. The joins must be executed
        // in order for them to get cleaned up without a full redraw
        drawGridLines(xa, ya, boundaryLayer, aax, 'a-boundary', aax._boundarylines);
        drawGridLines(xa, ya, boundaryLayer, bax, 'b-boundary', bax._boundarylines);

        var labelOrientationA = drawAxisLabels(gd, xa, ya, trace, cd0, labelLayer, aax._labels, 'a-label');
        var labelOrientationB = drawAxisLabels(gd, xa, ya, trace, cd0, labelLayer, bax._labels, 'b-label');

        drawAxisTitles(gd, labelLayer, trace, cd0, xa, ya, labelOrientationA, labelOrientationB);

        drawClipPath(trace, cd0, clipLayer, xa, ya);
    });
};

function drawClipPath(trace, t, layer, xaxis, yaxis) {
    var seg, xp, yp, i;

    var clip = layer.select('#' + trace._clipPathId);

    if(!clip.size()) {
        clip = layer.append('clipPath')
            .classed('carpetclip', true);
    }

    var path = Lib.ensureSingle(clip, 'path', 'carpetboundary');
    var segments = t.clipsegments;
    var segs = [];

    for(i = 0; i < segments.length; i++) {
        seg = segments[i];
        xp = map1dArray([], seg.x, xaxis.c2p);
        yp = map1dArray([], seg.y, yaxis.c2p);
        segs.push(makepath(xp, yp, seg.bicubic));
    }

    // This could be optimized ever so slightly to avoid no-op L segments
    // at the corners, but it's so negligible that I don't think it's worth
    // the extra complexity
    var clipPathData = 'M' + segs.join('L') + 'Z';
    clip.attr('id', trace._clipPathId);
    path.attr('d', clipPathData);
}

function drawGridLines(xaxis, yaxis, layer, axis, axisLetter, gridlines) {
    var lineClass = 'const-' + axisLetter + '-lines';
    var gridJoin = layer.selectAll('.' + lineClass).data(gridlines);

    gridJoin.enter().append('path')
        .classed(lineClass, true)
        .style('vector-effect', 'non-scaling-stroke');

    gridJoin.each(function(d) {
        var gridline = d;
        var x = gridline.x;
        var y = gridline.y;

        var xp = map1dArray([], x, xaxis.c2p);
        var yp = map1dArray([], y, yaxis.c2p);

        var path = 'M' + makepath(xp, yp, gridline.smoothing);

        var el = d3.select(this);

        el.attr('d', path)
            .style('stroke-width', gridline.width)
            .style('stroke', gridline.color)
            .style('fill', 'none');
    });

    gridJoin.exit().remove();
}

function drawAxisLabels(gd, xaxis, yaxis, trace, t, layer, labels, labelClass) {
    var labelJoin = layer.selectAll('text.' + labelClass).data(labels);

    labelJoin.enter().append('text')
        .classed(labelClass, true);

    var maxExtent = 0;
    var labelOrientation = {};

    labelJoin.each(function(label, i) {
        // Most of the positioning is done in calc_labels. Only the parts that depend upon
        // the screen space representation of the x and y axes are here:
        var orientation;
        if(label.axis.tickangle === 'auto') {
            orientation = orientText(trace, xaxis, yaxis, label.xy, label.dxy);
        } else {
            var angle = (label.axis.tickangle + 180.0) * Math.PI / 180.0;
            orientation = orientText(trace, xaxis, yaxis, label.xy, [Math.cos(angle), Math.sin(angle)]);
        }

        if(!i) {
            // TODO: offsetMultiplier? Not currently used anywhere...
            labelOrientation = {angle: orientation.angle, flip: orientation.flip};
        }
        var direction = (label.endAnchor ? -1 : 1) * orientation.flip;

        var labelEl = d3.select(this)
            .attr({
                'text-anchor': direction > 0 ? 'start' : 'end',
                'data-notex': 1
            })
            .call(Drawing.font, label.font)
            .text(label.text)
            .call(svgTextUtils.convertToTspans, gd);

        var bbox = Drawing.bBox(this);

        labelEl.attr('transform',
                // Translate to the correct point:
                'translate(' + orientation.p[0] + ',' + orientation.p[1] + ') ' +
                // Rotate to line up with grid line tangent:
                'rotate(' + orientation.angle + ')' +
                // Adjust the baseline and indentation:
                'translate(' + label.axis.labelpadding * direction + ',' + bbox.height * 0.3 + ')'
            );

        maxExtent = Math.max(maxExtent, bbox.width + label.axis.labelpadding);
    });

    labelJoin.exit().remove();

    labelOrientation.maxExtent = maxExtent;
    return labelOrientation;
}

function drawAxisTitles(gd, layer, trace, t, xa, ya, labelOrientationA, labelOrientationB) {
    var a, b, xy, dxy;

    var aMin = Lib.aggNums(Math.min, null, trace.a);
    var aMax = Lib.aggNums(Math.max, null, trace.a);
    var bMin = Lib.aggNums(Math.min, null, trace.b);
    var bMax = Lib.aggNums(Math.max, null, trace.b);

    a = 0.5 * (aMin + aMax);
    b = bMin;
    xy = trace.ab2xy(a, b, true);
    dxy = trace.dxyda_rough(a, b);
    if(labelOrientationA.angle === undefined) {
        Lib.extendFlat(labelOrientationA, orientText(trace, xa, ya, xy, trace.dxydb_rough(a, b)));
    }
    drawAxisTitle(gd, layer, trace, t, xy, dxy, trace.aaxis, xa, ya, labelOrientationA, 'a-title');

    a = aMin;
    b = 0.5 * (bMin + bMax);
    xy = trace.ab2xy(a, b, true);
    dxy = trace.dxydb_rough(a, b);
    if(labelOrientationB.angle === undefined) {
        Lib.extendFlat(labelOrientationB, orientText(trace, xa, ya, xy, trace.dxyda_rough(a, b)));
    }
    drawAxisTitle(gd, layer, trace, t, xy, dxy, trace.baxis, xa, ya, labelOrientationB, 'b-title');
}

var lineSpacing = alignmentConstants.LINE_SPACING;
var midShift = ((1 - alignmentConstants.MID_SHIFT) / lineSpacing) + 1;

function drawAxisTitle(gd, layer, trace, t, xy, dxy, axis, xa, ya, labelOrientation, labelClass) {
    var data = [];
    if(axis.title.text) data.push(axis.title.text);
    var titleJoin = layer.selectAll('text.' + labelClass).data(data);
    var offset = labelOrientation.maxExtent;

    titleJoin.enter().append('text')
        .classed(labelClass, true);

    // There's only one, but we'll do it as a join so it's updated nicely:
    titleJoin.each(function() {
        var orientation = orientText(trace, xa, ya, xy, dxy);

        if(['start', 'both'].indexOf(axis.showticklabels) === -1) {
            offset = 0;
        }

        // In addition to the size of the labels, add on some extra padding:
        var titleSize = axis.title.font.size;
        offset += titleSize + axis.title.offset;

        var labelNorm = labelOrientation.angle + (labelOrientation.flip < 0 ? 180 : 0);
        var angleDiff = (labelNorm - orientation.angle + 450) % 360;
        var reverseTitle = angleDiff > 90 && angleDiff < 270;

        var el = d3.select(this);

        el.text(axis.title.text)
            .call(svgTextUtils.convertToTspans, gd);

        if(reverseTitle) {
            offset = (-svgTextUtils.lineCount(el) + midShift) * lineSpacing * titleSize - offset;
        }

        el.attr('transform',
                'translate(' + orientation.p[0] + ',' + orientation.p[1] + ') ' +
                'rotate(' + orientation.angle + ') ' +
                'translate(0,' + offset + ')'
            )
            .classed('user-select-none', true)
            .attr('text-anchor', 'middle')
            .call(Drawing.font, axis.title.font);
    });

    titleJoin.exit().remove();
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/set_convert.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/set_convert.js ***!
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



var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/carpet/constants.js");
var search = __webpack_require__(/*! ../../lib/search */ "./node_modules/plotly.js/src/lib/search.js").findBin;
var computeControlPoints = __webpack_require__(/*! ./compute_control_points */ "./node_modules/plotly.js/src/traces/carpet/compute_control_points.js");
var createSplineEvaluator = __webpack_require__(/*! ./create_spline_evaluator */ "./node_modules/plotly.js/src/traces/carpet/create_spline_evaluator.js");
var createIDerivativeEvaluator = __webpack_require__(/*! ./create_i_derivative_evaluator */ "./node_modules/plotly.js/src/traces/carpet/create_i_derivative_evaluator.js");
var createJDerivativeEvaluator = __webpack_require__(/*! ./create_j_derivative_evaluator */ "./node_modules/plotly.js/src/traces/carpet/create_j_derivative_evaluator.js");

/*
 * Create conversion functions to go from one basis to another. In particular the letter
 * abbreviations are:
 *
 *   i: i/j coordinates along the grid. Integer values correspond to data points
 *   a: real-valued coordinates along the a/b axes
 *   c: cartesian x-y coordinates
 *   p: screen-space pixel coordinates
 */
module.exports = function setConvert(trace) {
    var a = trace._a;
    var b = trace._b;
    var na = a.length;
    var nb = b.length;
    var aax = trace.aaxis;
    var bax = trace.baxis;

    // Grab the limits once rather than recomputing the bounds for every point
    // independently:
    var amin = a[0];
    var amax = a[na - 1];
    var bmin = b[0];
    var bmax = b[nb - 1];
    var arange = a[a.length - 1] - a[0];
    var brange = b[b.length - 1] - b[0];

    // Compute the tolerance so that points are visible slightly outside the
    // defined carpet axis:
    var atol = arange * constants.RELATIVE_CULL_TOLERANCE;
    var btol = brange * constants.RELATIVE_CULL_TOLERANCE;

    // Expand the limits to include the relative tolerance:
    amin -= atol;
    amax += atol;
    bmin -= btol;
    bmax += btol;

    trace.isVisible = function(a, b) {
        return a > amin && a < amax && b > bmin && b < bmax;
    };

    trace.isOccluded = function(a, b) {
        return a < amin || a > amax || b < bmin || b > bmax;
    };

    trace.setScale = function() {
        var x = trace._x;
        var y = trace._y;

        // This is potentially a very expensive step! It does the bulk of the work of constructing
        // an expanded basis of control points. Note in particular that it overwrites the existing
        // basis without creating a new array since that would potentially thrash the garbage
        // collector.
        var result = computeControlPoints(trace._xctrl, trace._yctrl, x, y, aax.smoothing, bax.smoothing);
        trace._xctrl = result[0];
        trace._yctrl = result[1];

        // This step is the second step in the process, but it's somewhat simpler. It just unrolls
        // some logic since it would be unnecessarily expensive to compute both interpolations
        // nearly identically but separately and to include a bunch of linear vs. bicubic logic in
        // every single call.
        trace.evalxy = createSplineEvaluator([trace._xctrl, trace._yctrl], na, nb, aax.smoothing, bax.smoothing);

        trace.dxydi = createIDerivativeEvaluator([trace._xctrl, trace._yctrl], aax.smoothing, bax.smoothing);
        trace.dxydj = createJDerivativeEvaluator([trace._xctrl, trace._yctrl], aax.smoothing, bax.smoothing);
    };

    /*
     * Convert from i/j data grid coordinates to a/b values. Note in particular that this
     * is *linear* interpolation, even if the data is interpolated bicubically.
     */
    trace.i2a = function(i) {
        var i0 = Math.max(0, Math.floor(i[0]), na - 2);
        var ti = i[0] - i0;
        return (1 - ti) * a[i0] + ti * a[i0 + 1];
    };

    trace.j2b = function(j) {
        var j0 = Math.max(0, Math.floor(j[1]), na - 2);
        var tj = j[1] - j0;
        return (1 - tj) * b[j0] + tj * b[j0 + 1];
    };

    trace.ij2ab = function(ij) {
        return [trace.i2a(ij[0]), trace.j2b(ij[1])];
    };

    /*
     * Convert from a/b coordinates to i/j grid-numbered coordinates. This requires searching
     * through the a/b data arrays and assumes they are monotonic, which is presumed to have
     * been enforced already.
     */
    trace.a2i = function(aval) {
        var i0 = Math.max(0, Math.min(search(aval, a), na - 2));
        var a0 = a[i0];
        var a1 = a[i0 + 1];
        return Math.max(0, Math.min(na - 1, i0 + (aval - a0) / (a1 - a0)));
    };

    trace.b2j = function(bval) {
        var j0 = Math.max(0, Math.min(search(bval, b), nb - 2));
        var b0 = b[j0];
        var b1 = b[j0 + 1];
        return Math.max(0, Math.min(nb - 1, j0 + (bval - b0) / (b1 - b0)));
    };

    trace.ab2ij = function(ab) {
        return [trace.a2i(ab[0]), trace.b2j(ab[1])];
    };

    /*
     * Convert from i/j coordinates to x/y caretesian coordinates. This means either bilinear
     * or bicubic spline evaluation, but the hard part is already done at this point.
     */
    trace.i2c = function(i, j) {
        return trace.evalxy([], i, j);
    };

    trace.ab2xy = function(aval, bval, extrapolate) {
        if(!extrapolate && (aval < a[0] || aval > a[na - 1] | bval < b[0] || bval > b[nb - 1])) {
            return [false, false];
        }
        var i = trace.a2i(aval);
        var j = trace.b2j(bval);

        var pt = trace.evalxy([], i, j);

        if(extrapolate) {
            // This section uses the boundary derivatives to extrapolate linearly outside
            // the defined range. Consider a scatter line with one point inside the carpet
            // axis and one point outside. If we don't extrapolate, we can't draw the line
            // at all.
            var iex = 0;
            var jex = 0;
            var der = [];

            var i0, ti, j0, tj;
            if(aval < a[0]) {
                i0 = 0;
                ti = 0;
                iex = (aval - a[0]) / (a[1] - a[0]);
            } else if(aval > a[na - 1]) {
                i0 = na - 2;
                ti = 1;
                iex = (aval - a[na - 1]) / (a[na - 1] - a[na - 2]);
            } else {
                i0 = Math.max(0, Math.min(na - 2, Math.floor(i)));
                ti = i - i0;
            }

            if(bval < b[0]) {
                j0 = 0;
                tj = 0;
                jex = (bval - b[0]) / (b[1] - b[0]);
            } else if(bval > b[nb - 1]) {
                j0 = nb - 2;
                tj = 1;
                jex = (bval - b[nb - 1]) / (b[nb - 1] - b[nb - 2]);
            } else {
                j0 = Math.max(0, Math.min(nb - 2, Math.floor(j)));
                tj = j - j0;
            }

            if(iex) {
                trace.dxydi(der, i0, j0, ti, tj);
                pt[0] += der[0] * iex;
                pt[1] += der[1] * iex;
            }

            if(jex) {
                trace.dxydj(der, i0, j0, ti, tj);
                pt[0] += der[0] * jex;
                pt[1] += der[1] * jex;
            }
        }

        return pt;
    };


    trace.c2p = function(xy, xa, ya) {
        return [xa.c2p(xy[0]), ya.c2p(xy[1])];
    };

    trace.p2x = function(p, xa, ya) {
        return [xa.p2c(p[0]), ya.p2c(p[1])];
    };

    trace.dadi = function(i /* , u*/) {
        // Right now only a piecewise linear a or b basis is permitted since smoother interpolation
        // would cause monotonicity problems. As a retult, u is entirely disregarded in this
        // computation, though we'll specify it as a parameter for the sake of completeness and
        // future-proofing. It would be possible to use monotonic cubic interpolation, for example.
        //
        // See: https://en.wikipedia.org/wiki/Monotone_cubic_interpolation

        // u = u || 0;

        var i0 = Math.max(0, Math.min(a.length - 2, i));

        // The step (demoninator) is implicitly 1 since that's the grid spacing.
        return a[i0 + 1] - a[i0];
    };

    trace.dbdj = function(j /* , v*/) {
        // See above caveats for dadi which also apply here
        var j0 = Math.max(0, Math.min(b.length - 2, j));

        // The step (demoninator) is implicitly 1 since that's the grid spacing.
        return b[j0 + 1] - b[j0];
    };

    // Takes: grid cell coordinate (i, j) and fractional grid cell coordinates (u, v)
    // Returns: (dx/da, dy/db)
    //
    // NB: separate grid cell + fractional grid cell coordinate format is due to the discontinuous
    // derivative, as described better in create_i_derivative_evaluator.js
    trace.dxyda = function(i0, j0, u, v) {
        var dxydi = trace.dxydi(null, i0, j0, u, v);
        var dadi = trace.dadi(i0, u);

        return [dxydi[0] / dadi, dxydi[1] / dadi];
    };

    trace.dxydb = function(i0, j0, u, v) {
        var dxydj = trace.dxydj(null, i0, j0, u, v);
        var dbdj = trace.dbdj(j0, v);

        return [dxydj[0] / dbdj, dxydj[1] / dbdj];
    };

    // Sometimes we don't care about precision and all we really want is decent rough
    // directions (as is the case with labels). In that case, we can do a very rough finite
    // difference and spare having to worry about precise grid coordinates:
    trace.dxyda_rough = function(a, b, reldiff) {
        var h = arange * (reldiff || 0.1);
        var plus = trace.ab2xy(a + h, b, true);
        var minus = trace.ab2xy(a - h, b, true);

        return [
            (plus[0] - minus[0]) * 0.5 / h,
            (plus[1] - minus[1]) * 0.5 / h
        ];
    };

    trace.dxydb_rough = function(a, b, reldiff) {
        var h = brange * (reldiff || 0.1);
        var plus = trace.ab2xy(a, b + h, true);
        var minus = trace.ab2xy(a, b - h, true);

        return [
            (plus[0] - minus[0]) * 0.5 / h,
            (plus[1] - minus[1]) * 0.5 / h
        ];
    };

    trace.dpdx = function(xa) {
        return xa._m;
    };

    trace.dpdy = function(ya) {
        return ya._m;
    };
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/smooth_fill_2d_array.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/smooth_fill_2d_array.js ***!
  \**************************************************************************/
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

/*
 * Given a 2D array as well as a basis in either direction, this function fills in the
 * 2D array using a combination of smoothing and extrapolation. This is rather important
 * for carpet plots since it's used for layout so that we can't simply omit or blank out
 * points. We need a reasonable guess so that the interpolation puts points somewhere
 * even if we were to somehow represent that the data was missing later on.
 *
 * input:
 *  - data: 2D array of arrays
 *  - a: array such that a.length === data[0].length
 *  - b: array such that b.length === data.length
 */
module.exports = function smoothFill2dArray(data, a, b) {
    var i, j, k;
    var ip = [];
    var jp = [];
    // var neighborCnts = [];

    var ni = data[0].length;
    var nj = data.length;

    function avgSurrounding(i, j) {
        // As a low-quality start, we can simply average surrounding points (in a not
        // non-uniform grid aware manner):
        var sum = 0.0;
        var val;
        var cnt = 0;
        if(i > 0 && (val = data[j][i - 1]) !== undefined) {
            cnt++;
            sum += val;
        }
        if(i < ni - 1 && (val = data[j][i + 1]) !== undefined) {
            cnt++;
            sum += val;
        }
        if(j > 0 && (val = data[j - 1][i]) !== undefined) {
            cnt++;
            sum += val;
        }
        if(j < nj - 1 && (val = data[j + 1][i]) !== undefined) {
            cnt++;
            sum += val;
        }
        return sum / Math.max(1, cnt);
    }

    // This loop iterates over all cells. Any cells that are null will be noted and those
    // are the only points we will loop over and update via laplace's equation. Points with
    // any neighbors will receive the average. If there are no neighboring points, then they
    // will be set to zero. Also as we go, track the maximum magnitude so that we can scale
    // our tolerance accordingly.
    var dmax = 0.0;
    for(i = 0; i < ni; i++) {
        for(j = 0; j < nj; j++) {
            if(data[j][i] === undefined) {
                ip.push(i);
                jp.push(j);

                data[j][i] = avgSurrounding(i, j);
                // neighborCnts.push(result.neighbors);
            }
            dmax = Math.max(dmax, Math.abs(data[j][i]));
        }
    }

    if(!ip.length) return data;

    // The tolerance doesn't need to be excessive. It's just for display positioning
    var dxp, dxm, dap, dam, dbp, dbm, c, d, diff, reldiff, overrelaxation;
    var tol = 1e-5;
    var resid = 0;
    var itermax = 100;
    var iter = 0;
    var n = ip.length;
    do {
        resid = 0;
        // Normally we'd loop in two dimensions, but not all points are blank and need
        // an update, so we instead loop only over the points that were tabulated above
        for(k = 0; k < n; k++) {
            i = ip[k];
            j = jp[k];
            // neighborCnt = neighborCnts[k];

            // Track a counter for how many contributions there are. We'll use this counter
            // to average at the end, which reduces to laplace's equation with neumann boundary
            // conditions on the first derivative (second derivative is zero so that we get
            // a nice linear extrapolation at the boundaries).
            var boundaryCnt = 0;
            var newVal = 0;

            var d0, d1, x0, x1, i0, j0;
            if(i === 0) {
                // If this lies along the i = 0 boundary, extrapolate from the two points
                // to the right of this point. Note that the finite differences take into
                // account non-uniform grid spacing:
                i0 = Math.min(ni - 1, 2);
                x0 = a[i0];
                x1 = a[1];
                d0 = data[j][i0];
                d1 = data[j][1];
                newVal += d1 + (d1 - d0) * (a[0] - x1) / (x1 - x0);
                boundaryCnt++;
            } else if(i === ni - 1) {
                // If along the high i boundary, extrapolate from the two points to the
                // left of this point
                i0 = Math.max(0, ni - 3);
                x0 = a[i0];
                x1 = a[ni - 2];
                d0 = data[j][i0];
                d1 = data[j][ni - 2];
                newVal += d1 + (d1 - d0) * (a[ni - 1] - x1) / (x1 - x0);
                boundaryCnt++;
            }

            if((i === 0 || i === ni - 1) && (j > 0 && j < nj - 1)) {
                // If along the min(i) or max(i) boundaries, also smooth vertically as long
                // as we're not in a corner. Note that the finite differences used here
                // are also aware of nonuniform grid spacing:
                dxp = b[j + 1] - b[j];
                dxm = b[j] - b[j - 1];
                newVal += (dxm * data[j + 1][i] + dxp * data[j - 1][i]) / (dxm + dxp);
                boundaryCnt++;
            }

            if(j === 0) {
                // If along the j = 0 boundary, extrpolate this point from the two points
                // above it
                j0 = Math.min(nj - 1, 2);
                x0 = b[j0];
                x1 = b[1];
                d0 = data[j0][i];
                d1 = data[1][i];
                newVal += d1 + (d1 - d0) * (b[0] - x1) / (x1 - x0);
                boundaryCnt++;
            } else if(j === nj - 1) {
                // Same for the max j boundary from the cells below it:
                j0 = Math.max(0, nj - 3);
                x0 = b[j0];
                x1 = b[nj - 2];
                d0 = data[j0][i];
                d1 = data[nj - 2][i];
                newVal += d1 + (d1 - d0) * (b[nj - 1] - x1) / (x1 - x0);
                boundaryCnt++;
            }

            if((j === 0 || j === nj - 1) && (i > 0 && i < ni - 1)) {
                // Now average points to the left/right as long as not in a corner:
                dxp = a[i + 1] - a[i];
                dxm = a[i] - a[i - 1];
                newVal += (dxm * data[j][i + 1] + dxp * data[j][i - 1]) / (dxm + dxp);
                boundaryCnt++;
            }

            if(!boundaryCnt) {
                // If none of the above conditions were triggered, then this is an interior
                // point and we can just do a laplace equation update. As above, these differences
                // are aware of nonuniform grid spacing:
                dap = a[i + 1] - a[i];
                dam = a[i] - a[i - 1];
                dbp = b[j + 1] - b[j];
                dbm = b[j] - b[j - 1];

                // These are just some useful constants for the iteration, which is perfectly
                // straightforward but a little long to derive from f_xx + f_yy = 0.
                c = dap * dam * (dap + dam);
                d = dbp * dbm * (dbp + dbm);

                newVal = (c * (dbm * data[j + 1][i] + dbp * data[j - 1][i]) +
                          d * (dam * data[j][i + 1] + dap * data[j][i - 1])) /
                          (d * (dam + dap) + c * (dbm + dbp));
            } else {
                // If we did have contributions from the boundary conditions, then average
                // the result from the various contributions:
                newVal /= boundaryCnt;
            }

            // Jacobi updates are ridiculously slow to converge, so this approach uses a
            // Gauss-seidel iteration which is dramatically faster.
            diff = newVal - data[j][i];
            reldiff = diff / dmax;
            resid += reldiff * reldiff;

            // Gauss-Seidel-ish iteration, omega chosen based on heuristics and some
            // quick tests.
            //
            // NB: Don't overrelax the boundarie. Otherwise set an overrelaxation factor
            // which is a little low but safely optimal-ish:
            overrelaxation = boundaryCnt ? 0 : 0.85;

            // If there are four non-null neighbors, then we want a simple average without
            // overrelaxation. If all the surrouding points are null, then we want the full
            // overrelaxation
            //
            // Based on experiments, this actually seems to slow down convergence just a bit.
            // I'll leave it here for reference in case this needs to be revisited, but
            // it seems to work just fine without this.
            // if (overrelaxation) overrelaxation *= (4 - neighborCnt) / 4;

            data[j][i] += diff * (1 + overrelaxation);
        }

        resid = Math.sqrt(resid);
    } while(iter++ < itermax && resid > tol);

    Lib.log('Smoother converged to', resid, 'after', iter, 'iterations');

    return data;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/xy_defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/xy_defaults.js ***!
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




var isArray1D = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArray1D;

module.exports = function handleXYDefaults(traceIn, traceOut, coerce) {
    var x = coerce('x');
    var hasX = x && x.length;
    var y = coerce('y');
    var hasY = y && y.length;
    if(!hasX && !hasY) return false;

    traceOut._cheater = !x;

    if((!hasX || isArray1D(x)) && (!hasY || isArray1D(y))) {
        var len = hasX ? x.length : Infinity;
        if(hasY) len = Math.min(len, y.length);
        if(traceOut.a && traceOut.a.length) len = Math.min(len, traceOut.a.length);
        if(traceOut.b && traceOut.b.length) len = Math.min(len, traceOut.b.length);
        traceOut._length = len;
    } else traceOut._length = null;

    return true;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvY2FycGV0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2FiX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2FycmF5X21pbm1heC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2F4aXNfYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9heGlzX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jYXJwZXQvY2FsY19jbGlwcGF0aC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9jYWxjX2dyaWRsaW5lcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9jYWxjX2xhYmVscy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9jYXRtdWxsX3JvbS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9jaGVhdGVyX2Jhc2lzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2NvbXB1dGVfY29udHJvbF9wb2ludHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jYXJwZXQvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2NyZWF0ZV9pX2Rlcml2YXRpdmVfZXZhbHVhdG9yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2NyZWF0ZV9qX2Rlcml2YXRpdmVfZXZhbHVhdG9yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2NyZWF0ZV9zcGxpbmVfZXZhbHVhdG9yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L21ha2VwYXRoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L21hcF8xZF9hcnJheS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9vcmllbnRfdGV4dC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L3NldF9jb252ZXJ0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L3Ntb290aF9maWxsXzJkX2FycmF5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2FycGV0L3h5X2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLHVIQUFnRDs7Ozs7Ozs7Ozs7O0FDVmhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLHlCQUF5QixtQkFBTyxDQUFDLG9GQUFpQjtBQUNsRCxlQUFlLG1CQUFPLENBQUMsNEZBQThCOztBQUVyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYiwwQkFBMEIscUdBQXdDOztBQUVsRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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QUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsRUFBRTtBQUMzRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFPLENBQUMsZ0ZBQWU7QUFDL0Msa0JBQWtCLDZGQUFnQzs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZUFBZSxVQUFVO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0EsOEJBQThCLFlBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3Qix1QkFBdUIsY0FBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQSx1QkFBdUIsY0FBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsbUJBQW1CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUJBQW1CO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLG1CQUFtQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUJBQW1CO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUJBQW1CO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Es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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsZ0JBQWdCLDJGQUE4Qjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSIsImZpbGUiOiJjaGFydGY1ODFkZjM0YTA2MmZmZDI3ODU2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvY2FycGV0Jyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoYW5kbGVBeGlzRGVmYXVsdHMgPSByZXF1aXJlKCcuL2F4aXNfZGVmYXVsdHMnKTtcbnZhciBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVBQkRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBmdWxsTGF5b3V0LCBjb2VyY2UsIGRmbHRDb2xvcikge1xuICAgIHZhciBhID0gY29lcmNlKCdhJyk7XG5cbiAgICBpZighYSkge1xuICAgICAgICBjb2VyY2UoJ2RhJyk7XG4gICAgICAgIGNvZXJjZSgnYTAnKTtcbiAgICB9XG5cbiAgICB2YXIgYiA9IGNvZXJjZSgnYicpO1xuXG4gICAgaWYoIWIpIHtcbiAgICAgICAgY29lcmNlKCdkYicpO1xuICAgICAgICBjb2VyY2UoJ2IwJyk7XG4gICAgfVxuXG4gICAgbWltaWNrQXhpc0RlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBmdWxsTGF5b3V0LCBkZmx0Q29sb3IpO1xufTtcblxuZnVuY3Rpb24gbWltaWNrQXhpc0RlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBmdWxsTGF5b3V0LCBkZmx0Q29sb3IpIHtcbiAgICB2YXIgYXhlc0xpc3QgPSBbJ2FheGlzJywgJ2JheGlzJ107XG5cbiAgICBheGVzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGF4TmFtZSkge1xuICAgICAgICB2YXIgYXhMZXR0ZXIgPSBheE5hbWUuY2hhckF0KDApO1xuICAgICAgICB2YXIgYXhJbiA9IHRyYWNlSW5bYXhOYW1lXSB8fCB7fTtcbiAgICAgICAgdmFyIGF4T3V0ID0gVGVtcGxhdGUubmV3Q29udGFpbmVyKHRyYWNlT3V0LCBheE5hbWUpO1xuXG4gICAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRpY2tmb250OiAneCcsXG4gICAgICAgICAgICBpZDogYXhMZXR0ZXIgKyAnYXhpcycsXG4gICAgICAgICAgICBsZXR0ZXI6IGF4TGV0dGVyLFxuICAgICAgICAgICAgZm9udDogdHJhY2VPdXQuZm9udCxcbiAgICAgICAgICAgIG5hbWU6IGF4TmFtZSxcbiAgICAgICAgICAgIGRhdGE6IHRyYWNlSW5bYXhMZXR0ZXJdLFxuICAgICAgICAgICAgY2FsZW5kYXI6IHRyYWNlT3V0LmNhbGVuZGFyLFxuICAgICAgICAgICAgZGZsdENvbG9yOiBkZmx0Q29sb3IsXG4gICAgICAgICAgICBiZ0NvbG9yOiBmdWxsTGF5b3V0LnBhcGVyX2JnY29sb3IsXG4gICAgICAgICAgICBmdWxsTGF5b3V0OiBmdWxsTGF5b3V0XG4gICAgICAgIH07XG5cbiAgICAgICAgaGFuZGxlQXhpc0RlZmF1bHRzKGF4SW4sIGF4T3V0LCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIGF4T3V0Ll9jYXRlZ29yaWVzID0gYXhPdXQuX2NhdGVnb3JpZXMgfHwgW107XG5cbiAgICAgICAgLy8gc28gd2UgZG9uJ3QgaGF2ZSB0byByZXBlYXQgYXV0b3R5cGUgdW5uZWNlc3NhcmlseSxcbiAgICAgICAgLy8gY29weSBhbiBhdXRvdHlwZSBiYWNrIHRvIHRyYWNlSW5cbiAgICAgICAgaWYoIXRyYWNlSW5bYXhOYW1lXSAmJiBheEluLnR5cGUgIT09ICctJykge1xuICAgICAgICAgICAgdHJhY2VJbltheE5hbWVdID0ge3R5cGU6IGF4SW4udHlwZX07XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGEpIHtcbiAgICByZXR1cm4gbWluTWF4KGEsIDApO1xufTtcblxuZnVuY3Rpb24gbWluTWF4KGEsIGRlcHRoKSB7XG4gICAgLy8gTGltaXQgdG8gdGVuIGRpbWVuc2lvbmFsIGRhdGFzZXRzLiBUaGlzIHNlZW1zICpleGNlZWRpbmdseSogdW5saWtlbHkgdG9cbiAgICAvLyBldmVyIGNhdXNlIHByb2JsZW1zIG9yIGV2ZW4gYmUgYSBjb25jZXJuLiBJdCdzIGluY2x1ZGUgc3RyaWN0bHkgc28gdGhhdFxuICAgIC8vIGNpcmN1bGFyIGFycmF5cyBjb3VsZCBuZXZlciBjYXVzZSB0aGlzIHRvIGxvb3AuXG4gICAgaWYoIWlzQXJyYXlPclR5cGVkQXJyYXkoYSkgfHwgZGVwdGggPj0gMTApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIG1pbiA9IEluZmluaXR5O1xuICAgIHZhciBtYXggPSAtSW5maW5pdHk7XG4gICAgdmFyIG4gPSBhLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHZhciBkYXR1bSA9IGFbaV07XG5cbiAgICAgICAgaWYoaXNBcnJheU9yVHlwZWRBcnJheShkYXR1bSkpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBtaW5NYXgoZGF0dW0sIGRlcHRoICsgMSk7XG5cbiAgICAgICAgICAgIGlmKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIG1pbiA9IE1hdGgubWluKHJlc3VsdFswXSwgbWluKTtcbiAgICAgICAgICAgICAgICBtYXggPSBNYXRoLm1heChyZXN1bHRbMV0sIG1heCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW4gPSBNYXRoLm1pbihkYXR1bSwgbWluKTtcbiAgICAgICAgICAgIG1heCA9IE1hdGgubWF4KGRhdHVtLCBtYXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFttaW4sIG1heF07XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBmb250QXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9mb250X2F0dHJpYnV0ZXMnKTtcbnZhciBheGlzQXR0cnMgPSByZXF1aXJlKCcuL2F4aXNfYXR0cmlidXRlcycpO1xudmFyIGNvbG9yQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yL2F0dHJpYnV0ZXMnKTtcblxudmFyIGNhcnBldEZvbnQgPSBmb250QXR0cnMoe1xuICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgZGVzY3JpcHRpb246ICdUaGUgZGVmYXVsdCBmb250IHVzZWQgZm9yIGF4aXMgJiB0aWNrIGxhYmVscyBvbiB0aGlzIGNhcnBldCdcbn0pO1xuLy8gVE9ETzogaW5oZXJpdCBmcm9tIGdsb2JhbCBmb250XG5jYXJwZXRGb250LmZhbWlseS5kZmx0ID0gJ1wiT3BlbiBTYW5zXCIsIHZlcmRhbmEsIGFyaWFsLCBzYW5zLXNlcmlmJztcbmNhcnBldEZvbnQuc2l6ZS5kZmx0ID0gMTI7XG5jYXJwZXRGb250LmNvbG9yLmRmbHQgPSBjb2xvckF0dHJzLmRlZmF1bHRMaW5lO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjYXJwZXQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdBbiBpZGVudGlmaWVyIGZvciB0aGlzIGNhcnBldCwgc28gdGhhdCBgc2NhdHRlcmNhcnBldGAgYW5kJyxcbiAgICAgICAgICAgICdgY29udG91cmNhcnBldGAgdHJhY2VzIGNhbiBzcGVjaWZ5IGEgY2FycGV0IHBsb3Qgb24gd2hpY2gnLFxuICAgICAgICAgICAgJ3RoZXkgbGllJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeDoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQSB0d28gZGltZW5zaW9uYWwgYXJyYXkgb2YgeCBjb29yZGluYXRlcyBhdCBlYWNoIGNhcnBldCBwb2ludC4nLFxuICAgICAgICAgICAgJ0lmIG9tbWl0dGVkLCB0aGUgcGxvdCBpcyBhIGNoZWF0ZXIgcGxvdCBhbmQgdGhlIHhheGlzIGlzIGhpZGRlbicsXG4gICAgICAgICAgICAnYnkgZGVmYXVsdC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdBIHR3byBkaW1lbnNpb25hbCBhcnJheSBvZiB5IGNvb3JkaW5hdGVzIGF0IGVhY2ggY2FycGV0IHBvaW50LidcbiAgICB9LFxuICAgIGE6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0FuIGFycmF5IGNvbnRhaW5pbmcgdmFsdWVzIG9mIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdmFsdWUnXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBhMDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0FsdGVybmF0ZSB0byBgYWAuJyxcbiAgICAgICAgICAgICdCdWlsZHMgYSBsaW5lYXIgc3BhY2Ugb2YgYSBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ1VzZSB3aXRoIGBkYWAnLFxuICAgICAgICAgICAgJ3doZXJlIGBhMGAgaXMgdGhlIHN0YXJ0aW5nIGNvb3JkaW5hdGUgYW5kIGBkYWAgdGhlIHN0ZXAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgZGE6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBhIGNvb3JkaW5hdGUgc3RlcC4nLFxuICAgICAgICAgICAgJ1NlZSBgYTBgIGZvciBtb3JlIGluZm8uJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYjoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQSB0d28gZGltZW5zaW9uYWwgYXJyYXkgb2YgeSBjb29yZGluYXRlcyBhdCBlYWNoIGNhcnBldCBwb2ludC4nXG4gICAgfSxcbiAgICBiMDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0FsdGVybmF0ZSB0byBgYmAuJyxcbiAgICAgICAgICAgICdCdWlsZHMgYSBsaW5lYXIgc3BhY2Ugb2YgYSBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ1VzZSB3aXRoIGBkYmAnLFxuICAgICAgICAgICAgJ3doZXJlIGBiMGAgaXMgdGhlIHN0YXJ0aW5nIGNvb3JkaW5hdGUgYW5kIGBkYmAgdGhlIHN0ZXAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgZGI6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBiIGNvb3JkaW5hdGUgc3RlcC4nLFxuICAgICAgICAgICAgJ1NlZSBgYjBgIGZvciBtb3JlIGluZm8uJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgY2hlYXRlcnNsb3BlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIHNoaWZ0IGFwcGxpZWQgdG8gZWFjaCBzdWNjZXNzaXZlIHJvdyBvZiBkYXRhIGluIGNyZWF0aW5nIGEgY2hlYXRlciBwbG90LicsXG4gICAgICAgICAgICAnT25seSB1c2VkIGlmIGB4YCBpcyBiZWVuIG9tbWl0dGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGFheGlzOiBheGlzQXR0cnMsXG4gICAgYmF4aXM6IGF4aXNBdHRycyxcbiAgICBmb250OiBjYXJwZXRGb250LFxuICAgIGNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIGRmbHQ6IGNvbG9yQXR0cnMuZGVmYXVsdExpbmUsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyBkZWZhdWx0IGZvciBhbGwgY29sb3JzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGF4aXMnLFxuICAgICAgICAgICAgJ2FsbCBhdCBvbmNlOiBsaW5lLCBmb250LCB0aWNrLCBhbmQgZ3JpZCBjb2xvcnMuJyxcbiAgICAgICAgICAgICdHcmlkIGNvbG9yIGlzIGxpZ2h0ZW5lZCBieSBibGVuZGluZyB0aGlzIHdpdGggdGhlIHBsb3QgYmFja2dyb3VuZCcsXG4gICAgICAgICAgICAnSW5kaXZpZHVhbCBwaWVjZXMgY2FuIG92ZXJyaWRlIHRoaXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgdHJhbnNmb3JtczogdW5kZWZpbmVkXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9udEF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZm9udF9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3IvYXR0cmlidXRlcycpO1xudmFyIGF4ZXNBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9sYXlvdXRfYXR0cmlidXRlcycpO1xudmFyIG92ZXJyaWRlQWxsID0gcmVxdWlyZSgnLi4vLi4vcGxvdF9hcGkvZWRpdF90eXBlcycpLm92ZXJyaWRlQWxsO1xuXG52YXIgRk9STUFUX0xJTksgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZG9jcycpLkZPUk1BVF9MSU5LO1xudmFyIERBVEVfRk9STUFUX0xJTksgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZG9jcycpLlRJTUVfRk9STUFUX0xJTks7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyBkZWZhdWx0IGZvciBhbGwgY29sb3JzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGF4aXMnLFxuICAgICAgICAgICAgJ2FsbCBhdCBvbmNlOiBsaW5lLCBmb250LCB0aWNrLCBhbmQgZ3JpZCBjb2xvcnMuJyxcbiAgICAgICAgICAgICdHcmlkIGNvbG9yIGlzIGxpZ2h0ZW5lZCBieSBibGVuZGluZyB0aGlzIHdpdGggdGhlIHBsb3QgYmFja2dyb3VuZCcsXG4gICAgICAgICAgICAnSW5kaXZpZHVhbCBwaWVjZXMgY2FuIG92ZXJyaWRlIHRoaXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgc21vb3RoaW5nOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBkZmx0OiAxLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMS4zLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgZGZsdDogJycsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdGl0bGUgb2YgdGhpcyBheGlzLicsXG4gICAgICAgICAgICAgICAgJ05vdGUgdGhhdCBiZWZvcmUgdGhlIGV4aXN0ZW5jZSBvZiBgdGl0bGUudGV4dGAsIHRoZSB0aXRsZVxcJ3MnLFxuICAgICAgICAgICAgICAgICdjb250ZW50cyB1c2VkIHRvIGJlIGRlZmluZWQgYXMgdGhlIGB0aXRsZWAgYXR0cmlidXRlIGl0c2VsZi4nLFxuICAgICAgICAgICAgICAgICdUaGlzIGJlaGF2aW9yIGhhcyBiZWVuIGRlcHJlY2F0ZWQuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgZm9udDogZm9udEF0dHJzKHtcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoaXMgYXhpc1xcJyB0aXRsZSBmb250LicsXG4gICAgICAgICAgICAgICAgJ05vdGUgdGhhdCB0aGUgdGl0bGVcXCdzIGZvbnQgdXNlZCB0byBiZSBzZXQnLFxuICAgICAgICAgICAgICAgICdieSB0aGUgbm93IGRlcHJlY2F0ZWQgYHRpdGxlZm9udGAgYXR0cmlidXRlLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuICAgICAgICAvLyBUT0RPIGhvdyBpcyB0aGlzIGRpZmZlcmVudCB0aGFuIGB0aXRsZS5zdGFuZG9mZmBcbiAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IDEwLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0FuIGFkZGl0aW9uYWwgYW1vdW50IGJ5IHdoaWNoIHRvIG9mZnNldCB0aGUgdGl0bGUgZnJvbSB0aGUgdGljaycsXG4gICAgICAgICAgICAgICAgJ2xhYmVscywgZ2l2ZW4gaW4gcGl4ZWxzLicsXG4gICAgICAgICAgICAgICAgJ05vdGUgdGhhdCB0aGlzIHVzZWQgdG8gYmUgc2V0JyxcbiAgICAgICAgICAgICAgICAnYnkgdGhlIG5vdyBkZXByZWNhdGVkIGB0aXRsZW9mZnNldGAgYXR0cmlidXRlLidcbiAgICAgICAgICAgIF0uam9pbignICcpLFxuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIC8vICctJyBtZWFucyB3ZSBoYXZlbid0IHlldCBydW4gYXV0b3R5cGUgb3IgY291bGRuJ3QgZmluZCBhbnkgZGF0YVxuICAgICAgICAvLyBpdCBnZXRzIHR1cm5lZCBpbnRvIGxpbmVhciBpbiBnZC5fZnVsbExheW91dCBidXQgbm90IGNvcGllZCBiYWNrXG4gICAgICAgIC8vIHRvIGdkLmRhdGEgbGlrZSB0aGUgb3RoZXJzIGFyZS5cbiAgICAgICAgdmFsdWVzOiBbJy0nLCAnbGluZWFyJywgJ2RhdGUnLCAnY2F0ZWdvcnknXSxcbiAgICAgICAgZGZsdDogJy0nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYXhpcyB0eXBlLicsXG4gICAgICAgICAgICAnQnkgZGVmYXVsdCwgcGxvdGx5IGF0dGVtcHRzIHRvIGRldGVybWluZWQgdGhlIGF4aXMgdHlwZScsXG4gICAgICAgICAgICAnYnkgbG9va2luZyBpbnRvIHRoZSBkYXRhIG9mIHRoZSB0cmFjZXMgdGhhdCByZWZlcmVuY2VkJyxcbiAgICAgICAgICAgICd0aGUgYXhpcyBpbiBxdWVzdGlvbi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBhdXRvcmFuZ2U6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFt0cnVlLCBmYWxzZSwgJ3JldmVyc2VkJ10sXG4gICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgcmFuZ2Ugb2YgdGhpcyBheGlzIGlzJyxcbiAgICAgICAgICAgICdjb21wdXRlZCBpbiByZWxhdGlvbiB0byB0aGUgaW5wdXQgZGF0YS4nLFxuICAgICAgICAgICAgJ1NlZSBgcmFuZ2Vtb2RlYCBmb3IgbW9yZSBpbmZvLicsXG4gICAgICAgICAgICAnSWYgYHJhbmdlYCBpcyBwcm92aWRlZCwgdGhlbiBgYXV0b3JhbmdlYCBpcyBzZXQgdG8gKmZhbHNlKi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICByYW5nZW1vZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnbm9ybWFsJywgJ3RvemVybycsICdub25uZWdhdGl2ZSddLFxuICAgICAgICBkZmx0OiAnbm9ybWFsJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdJZiAqbm9ybWFsKiwgdGhlIHJhbmdlIGlzIGNvbXB1dGVkIGluIHJlbGF0aW9uIHRvIHRoZSBleHRyZW1hJyxcbiAgICAgICAgICAgICdvZiB0aGUgaW5wdXQgZGF0YS4nLFxuICAgICAgICAgICAgJ0lmICp0b3plcm8qYCwgdGhlIHJhbmdlIGV4dGVuZHMgdG8gMCwnLFxuICAgICAgICAgICAgJ3JlZ2FyZGxlc3Mgb2YgdGhlIGlucHV0IGRhdGEnLFxuICAgICAgICAgICAgJ0lmICpub25uZWdhdGl2ZSosIHRoZSByYW5nZSBpcyBub24tbmVnYXRpdmUsJyxcbiAgICAgICAgICAgICdyZWdhcmRsZXNzIG9mIHRoZSBpbnB1dCBkYXRhLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHJhbmdlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge3ZhbFR5cGU6ICdhbnknLCBlZGl0VHlwZTogJ2NhbGMnfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnYW55JywgZWRpdFR5cGU6ICdjYWxjJ31cbiAgICAgICAgXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSByYW5nZSBvZiB0aGlzIGF4aXMuJyxcbiAgICAgICAgICAgICdJZiB0aGUgYXhpcyBgdHlwZWAgaXMgKmxvZyosIHRoZW4geW91IG11c3QgdGFrZSB0aGUgbG9nIG9mIHlvdXInLFxuICAgICAgICAgICAgJ2Rlc2lyZWQgcmFuZ2UgKGUuZy4gdG8gc2V0IHRoZSByYW5nZSBmcm9tIDEgdG8gMTAwLCcsXG4gICAgICAgICAgICAnc2V0IHRoZSByYW5nZSBmcm9tIDAgdG8gMikuJyxcbiAgICAgICAgICAgICdJZiB0aGUgYXhpcyBgdHlwZWAgaXMgKmRhdGUqLCBpdCBzaG91bGQgYmUgZGF0ZSBzdHJpbmdzLCcsXG4gICAgICAgICAgICAnbGlrZSBkYXRlIGRhdGEsIHRob3VnaCBEYXRlIG9iamVjdHMgYW5kIHVuaXggbWlsbGlzZWNvbmRzJyxcbiAgICAgICAgICAgICd3aWxsIGJlIGFjY2VwdGVkIGFuZCBjb252ZXJ0ZWQgdG8gc3RyaW5ncy4nLFxuICAgICAgICAgICAgJ0lmIHRoZSBheGlzIGB0eXBlYCBpcyAqY2F0ZWdvcnkqLCBpdCBzaG91bGQgYmUgbnVtYmVycywnLFxuICAgICAgICAgICAgJ3VzaW5nIHRoZSBzY2FsZSB3aGVyZSBlYWNoIGNhdGVnb3J5IGlzIGFzc2lnbmVkIGEgc2VyaWFsJyxcbiAgICAgICAgICAgICdudW1iZXIgZnJvbSB6ZXJvIGluIHRoZSBvcmRlciBpdCBhcHBlYXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgZml4ZWRyYW5nZToge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGF4aXMgaXMgem9vbS1hYmxlLicsXG4gICAgICAgICAgICAnSWYgdHJ1ZSwgdGhlbiB6b29tIGlzIGRpc2FibGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGNoZWF0ZXJ0eXBlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ2luZGV4JywgJ3ZhbHVlJ10sXG4gICAgICAgIGRmbHQ6ICd2YWx1ZScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sXG4gICAgdGlja21vZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnbGluZWFyJywgJ2FycmF5J10sXG4gICAgICAgIGRmbHQ6ICdhcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sXG4gICAgbnRpY2tzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NwZWNpZmllcyB0aGUgbWF4aW11bSBudW1iZXIgb2YgdGlja3MgZm9yIHRoZSBwYXJ0aWN1bGFyIGF4aXMuJyxcbiAgICAgICAgICAgICdUaGUgYWN0dWFsIG51bWJlciBvZiB0aWNrcyB3aWxsIGJlIGNob3NlbiBhdXRvbWF0aWNhbGx5IHRvIGJlJyxcbiAgICAgICAgICAgICdsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYG50aWNrc2AuJyxcbiAgICAgICAgICAgICdIYXMgYW4gZWZmZWN0IG9ubHkgaWYgYHRpY2ttb2RlYCBpcyBzZXQgdG8gKmF1dG8qLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHRpY2t2YWxzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB2YWx1ZXMgYXQgd2hpY2ggdGlja3Mgb24gdGhpcyBheGlzIGFwcGVhci4nLFxuICAgICAgICAgICAgJ09ubHkgaGFzIGFuIGVmZmVjdCBpZiBgdGlja21vZGVgIGlzIHNldCB0byAqYXJyYXkqLicsXG4gICAgICAgICAgICAnVXNlZCB3aXRoIGB0aWNrdGV4dGAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgdGlja3RleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHRleHQgZGlzcGxheWVkIGF0IHRoZSB0aWNrcyBwb3NpdGlvbiB2aWEgYHRpY2t2YWxzYC4nLFxuICAgICAgICAgICAgJ09ubHkgaGFzIGFuIGVmZmVjdCBpZiBgdGlja21vZGVgIGlzIHNldCB0byAqYXJyYXkqLicsXG4gICAgICAgICAgICAnVXNlZCB3aXRoIGB0aWNrdmFsc2AuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgc2hvd3RpY2tsYWJlbHM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnc3RhcnQnLCAnZW5kJywgJ2JvdGgnLCAnbm9uZSddLFxuICAgICAgICBkZmx0OiAnc3RhcnQnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBheGlzIGxhYmVscyBhcmUgZHJhd24gb24gdGhlIGxvdyBzaWRlLCcsXG4gICAgICAgICAgICAndGhlIGhpZ2ggc2lkZSwgYm90aCwgb3IgbmVpdGhlciBzaWRlIG9mIHRoZSBheGlzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHRpY2tmb250OiBmb250QXR0cnMoe1xuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHRpY2sgZm9udC4nXG4gICAgfSksXG4gICAgdGlja2FuZ2xlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbmdsZScsXG4gICAgICAgIGRmbHQ6ICdhdXRvJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBhbmdsZSBvZiB0aGUgdGljayBsYWJlbHMgd2l0aCByZXNwZWN0IHRvIHRoZSBob3Jpem9udGFsLicsXG4gICAgICAgICAgICAnRm9yIGV4YW1wbGUsIGEgYHRpY2thbmdsZWAgb2YgLTkwIGRyYXdzIHRoZSB0aWNrIGxhYmVscycsXG4gICAgICAgICAgICAndmVydGljYWxseS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB0aWNrcHJlZml4OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIGEgdGljayBsYWJlbCBwcmVmaXguJ1xuICAgIH0sXG4gICAgc2hvd3RpY2twcmVmaXg6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnYWxsJywgJ2ZpcnN0JywgJ2xhc3QnLCAnbm9uZSddLFxuICAgICAgICBkZmx0OiAnYWxsJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdJZiAqYWxsKiwgYWxsIHRpY2sgbGFiZWxzIGFyZSBkaXNwbGF5ZWQgd2l0aCBhIHByZWZpeC4nLFxuICAgICAgICAgICAgJ0lmICpmaXJzdCosIG9ubHkgdGhlIGZpcnN0IHRpY2sgaXMgZGlzcGxheWVkIHdpdGggYSBwcmVmaXguJyxcbiAgICAgICAgICAgICdJZiAqbGFzdCosIG9ubHkgdGhlIGxhc3QgdGljayBpcyBkaXNwbGF5ZWQgd2l0aCBhIHN1ZmZpeC4nLFxuICAgICAgICAgICAgJ0lmICpub25lKiwgdGljayBwcmVmaXhlcyBhcmUgaGlkZGVuLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHRpY2tzdWZmaXg6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgYSB0aWNrIGxhYmVsIHN1ZmZpeC4nXG4gICAgfSxcbiAgICBzaG93dGlja3N1ZmZpeDoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydhbGwnLCAnZmlyc3QnLCAnbGFzdCcsICdub25lJ10sXG4gICAgICAgIGRmbHQ6ICdhbGwnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NhbWUgYXMgYHNob3d0aWNrcHJlZml4YCBidXQgZm9yIHRpY2sgc3VmZml4ZXMuJ1xuICAgIH0sXG4gICAgc2hvd2V4cG9uZW50OiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ2FsbCcsICdmaXJzdCcsICdsYXN0JywgJ25vbmUnXSxcbiAgICAgICAgZGZsdDogJ2FsbCcsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgKmFsbCosIGFsbCBleHBvbmVudHMgYXJlIHNob3duIGJlc2lkZXMgdGhlaXIgc2lnbmlmaWNhbmRzLicsXG4gICAgICAgICAgICAnSWYgKmZpcnN0Kiwgb25seSB0aGUgZXhwb25lbnQgb2YgdGhlIGZpcnN0IHRpY2sgaXMgc2hvd24uJyxcbiAgICAgICAgICAgICdJZiAqbGFzdCosIG9ubHkgdGhlIGV4cG9uZW50IG9mIHRoZSBsYXN0IHRpY2sgaXMgc2hvd24uJyxcbiAgICAgICAgICAgICdJZiAqbm9uZSosIG5vIGV4cG9uZW50cyBhcHBlYXIuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgZXhwb25lbnRmb3JtYXQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnbm9uZScsICdlJywgJ0UnLCAncG93ZXInLCAnU0knLCAnQiddLFxuICAgICAgICBkZmx0OiAnQicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyBhIGZvcm1hdHRpbmcgcnVsZSBmb3IgdGhlIHRpY2sgZXhwb25lbnRzLicsXG4gICAgICAgICAgICAnRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZSBudW1iZXIgMSwwMDAsMDAwLDAwMC4nLFxuICAgICAgICAgICAgJ0lmICpub25lKiwgaXQgYXBwZWFycyBhcyAxLDAwMCwwMDAsMDAwLicsXG4gICAgICAgICAgICAnSWYgKmUqLCAxZSs5LicsXG4gICAgICAgICAgICAnSWYgKkUqLCAxRSs5LicsXG4gICAgICAgICAgICAnSWYgKnBvd2VyKiwgMXgxMF45ICh3aXRoIDkgaW4gYSBzdXBlciBzY3JpcHQpLicsXG4gICAgICAgICAgICAnSWYgKlNJKiwgMUcuJyxcbiAgICAgICAgICAgICdJZiAqQiosIDFCLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHNlcGFyYXRldGhvdXNhbmRzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGZsdDogZmFsc2UsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgXCJ0cnVlXCIsIGV2ZW4gNC1kaWdpdCBpbnRlZ2VycyBhcmUgc2VwYXJhdGVkJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgdGlja2Zvcm1hdDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgdGljayBsYWJlbCBmb3JtYXR0aW5nIHJ1bGUgdXNpbmcgZDMgZm9ybWF0dGluZyBtaW5pLWxhbmd1YWdlcycsXG4gICAgICAgICAgICAnd2hpY2ggYXJlIHZlcnkgc2ltaWxhciB0byB0aG9zZSBpbiBQeXRob24uIEZvciBudW1iZXJzLCBzZWU6JyxcbiAgICAgICAgICAgIEZPUk1BVF9MSU5LLFxuICAgICAgICAgICAgJ0FuZCBmb3IgZGF0ZXMgc2VlOicsXG4gICAgICAgICAgICBEQVRFX0ZPUk1BVF9MSU5LLFxuICAgICAgICAgICAgJ1dlIGFkZCBvbmUgaXRlbSB0byBkM1xcJ3MgZGF0ZSBmb3JtYXR0ZXI6ICole259ZiogZm9yIGZyYWN0aW9uYWwgc2Vjb25kcycsXG4gICAgICAgICAgICAnd2l0aCBuIGRpZ2l0cy4gRm9yIGV4YW1wbGUsICoyMDE2LTEwLTEzIDA5OjE1OjIzLjQ1Niogd2l0aCB0aWNrZm9ybWF0JyxcbiAgICAgICAgICAgICcqJUh+JU1+JVMuJTJmKiB3b3VsZCBkaXNwbGF5ICowOX4xNX4yMy40NionXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB0aWNrZm9ybWF0c3RvcHM6IG92ZXJyaWRlQWxsKGF4ZXNBdHRycy50aWNrZm9ybWF0c3RvcHMsICdjYWxjJywgJ2Zyb20tcm9vdCcpLFxuICAgIGNhdGVnb3J5b3JkZXI6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFtcbiAgICAgICAgICAgICd0cmFjZScsICdjYXRlZ29yeSBhc2NlbmRpbmcnLCAnY2F0ZWdvcnkgZGVzY2VuZGluZycsICdhcnJheSdcbiAgICAgICAgICAgIC8qICwgJ3ZhbHVlIGFzY2VuZGluZycsICd2YWx1ZSBkZXNjZW5kaW5nJyovIC8vIHZhbHVlIGFzY2VuZGluZyAvIGRlc2NlbmRpbmcgdG8gYmUgaW1wbGVtZW50ZWQgbGF0ZXJcbiAgICAgICAgXSxcbiAgICAgICAgZGZsdDogJ3RyYWNlJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NwZWNpZmllcyB0aGUgb3JkZXJpbmcgbG9naWMgZm9yIHRoZSBjYXNlIG9mIGNhdGVnb3JpY2FsIHZhcmlhYmxlcy4nLFxuICAgICAgICAgICAgJ0J5IGRlZmF1bHQsIHBsb3RseSB1c2VzICp0cmFjZSosIHdoaWNoIHNwZWNpZmllcyB0aGUgb3JkZXIgdGhhdCBpcyBwcmVzZW50IGluIHRoZSBkYXRhIHN1cHBsaWVkLicsXG4gICAgICAgICAgICAnU2V0IGBjYXRlZ29yeW9yZGVyYCB0byAqY2F0ZWdvcnkgYXNjZW5kaW5nKiBvciAqY2F0ZWdvcnkgZGVzY2VuZGluZyogaWYgb3JkZXIgc2hvdWxkIGJlIGRldGVybWluZWQgYnknLFxuICAgICAgICAgICAgJ3RoZSBhbHBoYW51bWVyaWNhbCBvcmRlciBvZiB0aGUgY2F0ZWdvcnkgbmFtZXMuJyxcbiAgICAgICAgICAgIC8qICdTZXQgYGNhdGVnb3J5b3JkZXJgIHRvICp2YWx1ZSBhc2NlbmRpbmcqIG9yICp2YWx1ZSBkZXNjZW5kaW5nKiBpZiBvcmRlciBzaG91bGQgYmUgZGV0ZXJtaW5lZCBieSB0aGUnLFxuICAgICAgICAgICAgJ251bWVyaWNhbCBvcmRlciBvZiB0aGUgdmFsdWVzLicsKi8gLy8gLy8gdmFsdWUgYXNjZW5kaW5nIC8gZGVzY2VuZGluZyB0byBiZSBpbXBsZW1lbnRlZCBsYXRlclxuICAgICAgICAgICAgJ1NldCBgY2F0ZWdvcnlvcmRlcmAgdG8gKmFycmF5KiB0byBkZXJpdmUgdGhlIG9yZGVyaW5nIGZyb20gdGhlIGF0dHJpYnV0ZSBgY2F0ZWdvcnlhcnJheWAuIElmIGEgY2F0ZWdvcnknLFxuICAgICAgICAgICAgJ2lzIG5vdCBmb3VuZCBpbiB0aGUgYGNhdGVnb3J5YXJyYXlgIGFycmF5LCB0aGUgc29ydGluZyBiZWhhdmlvciBmb3IgdGhhdCBhdHRyaWJ1dGUgd2lsbCBiZSBpZGVudGljYWwgdG8nLFxuICAgICAgICAgICAgJ3RoZSAqdHJhY2UqIG1vZGUuIFRoZSB1bnNwZWNpZmllZCBjYXRlZ29yaWVzIHdpbGwgZm9sbG93IHRoZSBjYXRlZ29yaWVzIGluIGBjYXRlZ29yeWFycmF5YC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBjYXRlZ29yeWFycmF5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIG9yZGVyIGluIHdoaWNoIGNhdGVnb3JpZXMgb24gdGhpcyBheGlzIGFwcGVhci4nLFxuICAgICAgICAgICAgJ09ubHkgaGFzIGFuIGVmZmVjdCBpZiBgY2F0ZWdvcnlvcmRlcmAgaXMgc2V0IHRvICphcnJheSouJyxcbiAgICAgICAgICAgICdVc2VkIHdpdGggYGNhdGVnb3J5b3JkZXJgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGxhYmVscGFkZGluZzoge1xuICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRmbHQ6IDEwLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0V4dHJhIHBhZGRpbmcgYmV0d2VlbiBsYWJlbCBhbmQgdGhlIGF4aXMnXG4gICAgfSxcbiAgICBsYWJlbHByZWZpeDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIGEgYXhpcyBsYWJlbCBwcmVmaXguJ1xuICAgIH0sXG4gICAgbGFiZWxzdWZmaXg6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgYSBheGlzIGxhYmVsIHN1ZmZpeC4nXG4gICAgfSxcbiAgICAvLyBsaW5lcyBhbmQgZ3JpZHNcbiAgICBzaG93bGluZToge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgYSBsaW5lIGJvdW5kaW5nIHRoaXMgYXhpcyBpcyBkcmF3bi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBsaW5lY29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgZGZsdDogY29sb3JBdHRycy5kZWZhdWx0TGluZSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBheGlzIGxpbmUgY29sb3IuJ1xuICAgIH0sXG4gICAgbGluZXdpZHRoOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgd2lkdGggKGluIHB4KSBvZiB0aGUgYXhpcyBsaW5lLidcbiAgICB9LFxuICAgIGdyaWRjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGF4aXMgbGluZSBjb2xvci4nXG4gICAgfSxcbiAgICBncmlkd2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB3aWR0aCAoaW4gcHgpIG9mIHRoZSBheGlzIGxpbmUuJ1xuICAgIH0sXG4gICAgc2hvd2dyaWQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBkZmx0OiB0cnVlLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgZ3JpZCBsaW5lcyBhcmUgZHJhd24uJyxcbiAgICAgICAgICAgICdJZiAqdHJ1ZSosIHRoZSBncmlkIGxpbmVzIGFyZSBkcmF3biBhdCBldmVyeSB0aWNrIG1hcmsuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgbWlub3JncmlkY291bnQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDAsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBudW1iZXIgb2YgbWlub3IgZ3JpZCB0aWNrcyBwZXIgbWFqb3IgZ3JpZCB0aWNrJ1xuICAgIH0sXG4gICAgbWlub3Jncmlkd2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB3aWR0aCAoaW4gcHgpIG9mIHRoZSBncmlkIGxpbmVzLidcbiAgICB9LFxuICAgIG1pbm9yZ3JpZGNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIGRmbHQ6IGNvbG9yQXR0cnMubGlnaHRMaW5lLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGNvbG9yIG9mIHRoZSBncmlkIGxpbmVzLidcbiAgICB9LFxuICAgIHN0YXJ0bGluZToge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBhIGxpbmUgaXMgZHJhd24gYXQgYWxvbmcgdGhlIHN0YXJ0aW5nIHZhbHVlJyxcbiAgICAgICAgICAgICdvZiB0aGlzIGF4aXMuJyxcbiAgICAgICAgICAgICdJZiAqdHJ1ZSosIHRoZSBzdGFydCBsaW5lIGlzIGRyYXduIG9uIHRvcCBvZiB0aGUgZ3JpZCBsaW5lcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBzdGFydGxpbmVjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGxpbmUgY29sb3Igb2YgdGhlIHN0YXJ0IGxpbmUuJ1xuICAgIH0sXG4gICAgc3RhcnRsaW5ld2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgd2lkdGggKGluIHB4KSBvZiB0aGUgc3RhcnQgbGluZS4nXG4gICAgfSxcbiAgICBlbmRsaW5lOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IGEgbGluZSBpcyBkcmF3biBhdCBhbG9uZyB0aGUgZmluYWwgdmFsdWUnLFxuICAgICAgICAgICAgJ29mIHRoaXMgYXhpcy4nLFxuICAgICAgICAgICAgJ0lmICp0cnVlKiwgdGhlIGVuZCBsaW5lIGlzIGRyYXduIG9uIHRvcCBvZiB0aGUgZ3JpZCBsaW5lcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBlbmRsaW5ld2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgd2lkdGggKGluIHB4KSBvZiB0aGUgZW5kIGxpbmUuJ1xuICAgIH0sXG4gICAgZW5kbGluZWNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgbGluZSBjb2xvciBvZiB0aGUgZW5kIGxpbmUuJ1xuICAgIH0sXG4gICAgdGljazA6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzdGFydGluZyBpbmRleCBvZiBncmlkIGxpbmVzIGFsb25nIHRoZSBheGlzJ1xuICAgIH0sXG4gICAgZHRpY2s6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzdHJpZGUgYmV0d2VlbiBncmlkIGxpbmVzIGFsb25nIHRoZSBheGlzJ1xuICAgIH0sXG4gICAgYXJyYXl0aWNrMDoge1xuICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzdGFydGluZyBpbmRleCBvZiBncmlkIGxpbmVzIGFsb25nIHRoZSBheGlzJ1xuICAgIH0sXG4gICAgYXJyYXlkdGljazoge1xuICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBzdHJpZGUgYmV0d2VlbiBncmlkIGxpbmVzIGFsb25nIHRoZSBheGlzJ1xuICAgIH0sXG5cbiAgICBfZGVwcmVjYXRlZDoge1xuICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgdGl0bGUudGV4dGAuJyxcbiAgICAgICAgICAgICAgICAnTm90ZSB0aGF0IHZhbHVlIG9mIGB0aXRsZWAgaXMgbm8gbG9uZ2VyIGEgc2ltcGxlJyxcbiAgICAgICAgICAgICAgICAnKnN0cmluZyogYnV0IGEgc2V0IG9mIHN1Yi1hdHRyaWJ1dGVzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlZm9udDogZm9udEF0dHJzKHtcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0RlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgYHRpdGxlLmZvbnRgLidcbiAgICAgICAgfSksXG4gICAgICAgIHRpdGxlb2Zmc2V0OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IDEwLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVwcmVjYXRlZCBpbiBmYXZvciBvZiBgdGl0bGUub2Zmc2V0YC4nXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZWRpdFR5cGU6ICdjYWxjJ1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhcnBldEF0dHJzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbnZhciBhZGRPcGFjaXR5ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpLmFkZE9wYWNpdHk7XG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGhhbmRsZVRpY2tWYWx1ZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL3RpY2tfdmFsdWVfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVUaWNrTGFiZWxEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi90aWNrX2xhYmVsX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlQ2F0ZWdvcnlPcmRlckRlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2NhdGVnb3J5X29yZGVyX2RlZmF1bHRzJyk7XG52YXIgc2V0Q29udmVydCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9zZXRfY29udmVydCcpO1xudmFyIGF1dG9UeXBlID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4aXNfYXV0b3R5cGUnKTtcblxuLyoqXG4gKiBvcHRpb25zOiBvYmplY3QgY29udGFpbmluZzpcbiAqXG4gKiAgbGV0dGVyOiAnYScgb3IgJ2InXG4gKiAgdGl0bGU6IG5hbWUgb2YgdGhlIGF4aXMgKGllICdDb2xvcmJhcicpIHRvIGdvIGluIGRlZmF1bHQgdGl0bGVcbiAqICBuYW1lOiBheGlzIG9iamVjdCBuYW1lIChpZSAneGF4aXMnKSBpZiBvbmUgc2hvdWxkIGJlIHN0b3JlZFxuICogIGZvbnQ6IHRoZSBkZWZhdWx0IGZvbnQgdG8gaW5oZXJpdFxuICogIG91dGVyVGlja3M6IGJvb2xlYW4sIHNob3VsZCB0aWNrcyBkZWZhdWx0IHRvIG91dHNpZGU/XG4gKiAgc2hvd0dyaWQ6IGJvb2xlYW4sIHNob3VsZCBncmlkbGluZXMgYmUgc2hvd24gYnkgZGVmYXVsdD9cbiAqICBkYXRhOiB0aGUgcGxvdCBkYXRhIHRvIHVzZSBpbiBjaG9vc2luZyBhdXRvIHR5cGVcbiAqICBiZ0NvbG9yOiB0aGUgcGxvdCBiYWNrZ3JvdW5kIGNvbG9yLCB0byBjYWxjdWxhdGUgZGVmYXVsdCBncmlkbGluZSBjb2xvcnNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVBeGlzRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgb3B0aW9ucykge1xuICAgIHZhciBsZXR0ZXIgPSBvcHRpb25zLmxldHRlcjtcbiAgICB2YXIgZm9udCA9IG9wdGlvbnMuZm9udCB8fCB7fTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IGNhcnBldEF0dHJzW2xldHRlciArICdheGlzJ107XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UyKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UyKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIC8vIHNldCB1cCBzb21lIHByaXZhdGUgcHJvcGVydGllc1xuICAgIGlmKG9wdGlvbnMubmFtZSkge1xuICAgICAgICBjb250YWluZXJPdXQuX25hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgICAgIGNvbnRhaW5lck91dC5faWQgPSBvcHRpb25zLm5hbWU7XG4gICAgfVxuXG4gICAgLy8gbm93IGZpZ3VyZSBvdXQgdHlwZSBhbmQgZG8gc29tZSBtb3JlIGluaXRpYWxpemF0aW9uXG4gICAgdmFyIGF4VHlwZSA9IGNvZXJjZSgndHlwZScpO1xuICAgIGlmKGF4VHlwZSA9PT0gJy0nKSB7XG4gICAgICAgIGlmKG9wdGlvbnMuZGF0YSkgc2V0QXV0b1R5cGUoY29udGFpbmVyT3V0LCBvcHRpb25zLmRhdGEpO1xuXG4gICAgICAgIGlmKGNvbnRhaW5lck91dC50eXBlID09PSAnLScpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lck91dC50eXBlID0gJ2xpbmVhcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb3B5IGF1dG9UeXBlIGJhY2sgdG8gaW5wdXQgYXhpc1xuICAgICAgICAgICAgLy8gbm90ZSB0aGF0IGlmIHRoaXMgb2JqZWN0IGRpZG4ndCBleGlzdFxuICAgICAgICAgICAgLy8gaW4gdGhlIGlucHV0IGxheW91dCwgd2UgaGF2ZSB0byBwdXQgaXQgaW5cbiAgICAgICAgICAgIC8vIHRoaXMgaGFwcGVucyBpbiB0aGUgbWFpbiBzdXBwbHlEZWZhdWx0cyBmdW5jdGlvblxuICAgICAgICAgICAgYXhUeXBlID0gY29udGFpbmVySW4udHlwZSA9IGNvbnRhaW5lck91dC50eXBlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29lcmNlKCdzbW9vdGhpbmcnKTtcbiAgICBjb2VyY2UoJ2NoZWF0ZXJ0eXBlJyk7XG5cbiAgICBjb2VyY2UoJ3Nob3d0aWNrbGFiZWxzJyk7XG4gICAgY29lcmNlKCdsYWJlbHByZWZpeCcsIGxldHRlciArICcgPSAnKTtcbiAgICBjb2VyY2UoJ2xhYmVsc3VmZml4Jyk7XG4gICAgY29lcmNlKCdzaG93dGlja3ByZWZpeCcpO1xuICAgIGNvZXJjZSgnc2hvd3RpY2tzdWZmaXgnKTtcblxuICAgIGNvZXJjZSgnc2VwYXJhdGV0aG91c2FuZHMnKTtcbiAgICBjb2VyY2UoJ3RpY2tmb3JtYXQnKTtcbiAgICBjb2VyY2UoJ2V4cG9uZW50Zm9ybWF0Jyk7XG4gICAgY29lcmNlKCdzaG93ZXhwb25lbnQnKTtcbiAgICBjb2VyY2UoJ2NhdGVnb3J5b3JkZXInKTtcblxuICAgIGNvZXJjZSgndGlja21vZGUnKTtcbiAgICBjb2VyY2UoJ3RpY2t2YWxzJyk7XG4gICAgY29lcmNlKCd0aWNrdGV4dCcpO1xuICAgIGNvZXJjZSgndGljazAnKTtcbiAgICBjb2VyY2UoJ2R0aWNrJyk7XG5cbiAgICBpZihjb250YWluZXJPdXQudGlja21vZGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgY29lcmNlKCdhcnJheXRpY2swJyk7XG4gICAgICAgIGNvZXJjZSgnYXJyYXlkdGljaycpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnbGFiZWxwYWRkaW5nJyk7XG5cbiAgICBjb250YWluZXJPdXQuX2hvdmVydGl0bGUgPSBsZXR0ZXI7XG5cblxuICAgIGlmKGF4VHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgIHZhciBoYW5kbGVDYWxlbmRhckRlZmF1bHRzID0gUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdjYWxlbmRhcnMnLCAnaGFuZGxlRGVmYXVsdHMnKTtcbiAgICAgICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCAnY2FsZW5kYXInLCBvcHRpb25zLmNhbGVuZGFyKTtcbiAgICB9XG5cbiAgICAvLyB3ZSBuZWVkIHNvbWUgb2YgdGhlIG90aGVyIGZ1bmN0aW9ucyBzZXRDb252ZXJ0IGF0dGFjaGVzLCBidXQgZm9yXG4gICAgLy8gcGF0aCBmaW5kaW5nLCBvdmVycmlkZSBwaXhlbCBzY2FsaW5nIHRvIHNpbXBsZSBwYXNzdGhyb3VnaCAoaWRlbnRpdHkpXG4gICAgc2V0Q29udmVydChjb250YWluZXJPdXQsIG9wdGlvbnMuZnVsbExheW91dCk7XG4gICAgY29udGFpbmVyT3V0LmMycCA9IExpYi5pZGVudGl0eTtcblxuICAgIHZhciBkZmx0Q29sb3IgPSBjb2VyY2UoJ2NvbG9yJywgb3B0aW9ucy5kZmx0Q29sb3IpO1xuICAgIC8vIGlmIGF4aXMuY29sb3Igd2FzIHByb3ZpZGVkLCB1c2UgaXQgZm9yIGZvbnRzIHRvbzsgb3RoZXJ3aXNlLFxuICAgIC8vIGluaGVyaXQgZnJvbSBnbG9iYWwgZm9udCBjb2xvciBpbiBjYXNlIHRoYXQgd2FzIHByb3ZpZGVkLlxuICAgIHZhciBkZmx0Rm9udENvbG9yID0gKGRmbHRDb2xvciA9PT0gY29udGFpbmVySW4uY29sb3IpID8gZGZsdENvbG9yIDogZm9udC5jb2xvcjtcblxuICAgIHZhciB0aXRsZSA9IGNvZXJjZSgndGl0bGUudGV4dCcpO1xuICAgIGlmKHRpdGxlKSB7XG4gICAgICAgIExpYi5jb2VyY2VGb250KGNvZXJjZSwgJ3RpdGxlLmZvbnQnLCB7XG4gICAgICAgICAgICBmYW1pbHk6IGZvbnQuZmFtaWx5LFxuICAgICAgICAgICAgc2l6ZTogTWF0aC5yb3VuZChmb250LnNpemUgKiAxLjIpLFxuICAgICAgICAgICAgY29sb3I6IGRmbHRGb250Q29sb3JcbiAgICAgICAgfSk7XG4gICAgICAgIGNvZXJjZSgndGl0bGUub2Zmc2V0Jyk7XG4gICAgfVxuXG4gICAgY29lcmNlKCd0aWNrYW5nbGUnKTtcblxuICAgIHZhciBhdXRvUmFuZ2UgPSBjb2VyY2UoJ2F1dG9yYW5nZScsICFjb250YWluZXJPdXQuaXNWYWxpZFJhbmdlKGNvbnRhaW5lckluLnJhbmdlKSk7XG5cbiAgICBpZihhdXRvUmFuZ2UpIGNvZXJjZSgncmFuZ2Vtb2RlJyk7XG5cbiAgICBjb2VyY2UoJ3JhbmdlJyk7XG4gICAgY29udGFpbmVyT3V0LmNsZWFuUmFuZ2UoKTtcblxuICAgIGNvZXJjZSgnZml4ZWRyYW5nZScpO1xuXG4gICAgaGFuZGxlVGlja1ZhbHVlRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCBheFR5cGUpO1xuICAgIGhhbmRsZVRpY2tMYWJlbERlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGNvZXJjZSwgYXhUeXBlLCBvcHRpb25zKTtcbiAgICBoYW5kbGVDYXRlZ29yeU9yZGVyRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCB7XG4gICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgZGF0YUF0dHI6IGxldHRlclxuICAgIH0pO1xuXG4gICAgdmFyIGdyaWRDb2xvciA9IGNvZXJjZTIoJ2dyaWRjb2xvcicsIGFkZE9wYWNpdHkoZGZsdENvbG9yLCAwLjMpKTtcbiAgICB2YXIgZ3JpZFdpZHRoID0gY29lcmNlMignZ3JpZHdpZHRoJyk7XG4gICAgdmFyIHNob3dHcmlkID0gY29lcmNlKCdzaG93Z3JpZCcpO1xuXG4gICAgaWYoIXNob3dHcmlkKSB7XG4gICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQuZ3JpZGNvbG9yO1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LmdyaWR3aWR0aDtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnRMaW5lQ29sb3IgPSBjb2VyY2UyKCdzdGFydGxpbmVjb2xvcicsIGRmbHRDb2xvcik7XG4gICAgdmFyIHN0YXJ0TGluZVdpZHRoID0gY29lcmNlMignc3RhcnRsaW5ld2lkdGgnLCBncmlkV2lkdGgpO1xuICAgIHZhciBzaG93U3RhcnRMaW5lID0gY29lcmNlKCdzdGFydGxpbmUnLCBjb250YWluZXJPdXQuc2hvd2dyaWQgfHwgISFzdGFydExpbmVDb2xvciB8fCAhIXN0YXJ0TGluZVdpZHRoKTtcblxuICAgIGlmKCFzaG93U3RhcnRMaW5lKSB7XG4gICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQuc3RhcnRsaW5lY29sb3I7XG4gICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQuc3RhcnRsaW5ld2lkdGg7XG4gICAgfVxuXG4gICAgdmFyIGVuZExpbmVDb2xvciA9IGNvZXJjZTIoJ2VuZGxpbmVjb2xvcicsIGRmbHRDb2xvcik7XG4gICAgdmFyIGVuZExpbmVXaWR0aCA9IGNvZXJjZTIoJ2VuZGxpbmV3aWR0aCcsIGdyaWRXaWR0aCk7XG4gICAgdmFyIHNob3dFbmRMaW5lID0gY29lcmNlKCdlbmRsaW5lJywgY29udGFpbmVyT3V0LnNob3dncmlkIHx8ICEhZW5kTGluZUNvbG9yIHx8ICEhZW5kTGluZVdpZHRoKTtcblxuICAgIGlmKCFzaG93RW5kTGluZSkge1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LmVuZGxpbmVjb2xvcjtcbiAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC5lbmRsaW5ld2lkdGg7XG4gICAgfVxuXG4gICAgaWYoIXNob3dHcmlkKSB7XG4gICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQuZ3JpZGNvbG9yO1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LmdyaWRXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb2VyY2UoJ21pbm9yZ3JpZGNvdW50Jyk7XG4gICAgICAgIGNvZXJjZSgnbWlub3Jncmlkd2lkdGgnLCBncmlkV2lkdGgpO1xuICAgICAgICBjb2VyY2UoJ21pbm9yZ3JpZGNvbG9yJywgYWRkT3BhY2l0eShncmlkQ29sb3IsIDAuMDYpKTtcblxuICAgICAgICBpZighY29udGFpbmVyT3V0Lm1pbm9yZ3JpZGNvdW50KSB7XG4gICAgICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0Lm1pbm9yZ3JpZHdpZHRoO1xuICAgICAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC5taW5vcmdyaWRjb2xvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKGNvbnRhaW5lck91dC5zaG93dGlja2xhYmVscyA9PT0gJ25vbmUnKSB7XG4gICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQudGlja2ZvbnQ7XG4gICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQudGlja2FuZ2xlO1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LnNob3dleHBvbmVudDtcbiAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC5leHBvbmVudGZvcm1hdDtcbiAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC50aWNrZm9ybWF0O1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LnNob3d0aWNrc3VmZml4O1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LnNob3d0aWNrcHJlZml4O1xuICAgIH1cblxuICAgIGlmKCFjb250YWluZXJPdXQuc2hvd3RpY2tzdWZmaXgpIHtcbiAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC50aWNrc3VmZml4O1xuICAgIH1cblxuICAgIGlmKCFjb250YWluZXJPdXQuc2hvd3RpY2twcmVmaXgpIHtcbiAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC50aWNrcHJlZml4O1xuICAgIH1cblxuICAgIC8vIEl0IG5lZWRzIHRvIGJlIGNvZXJjZWQsIHRoZW4gc29tZXRoaW5nIGFib3ZlIG92ZXJyaWRlcyB0aGlzIGRlZXAgaW4gdGhlIGF4aXMgY29kZSxcbiAgICAvLyBidXQgbm8sIHdlICphY3R1YWxseSogd2FudCB0byBjb2VyY2UgdGhpcy5cbiAgICBjb2VyY2UoJ3RpY2ttb2RlJyk7XG5cbiAgICByZXR1cm4gY29udGFpbmVyT3V0O1xufTtcblxuZnVuY3Rpb24gc2V0QXV0b1R5cGUoYXgsIGRhdGEpIHtcbiAgICAvLyBuZXcgbG9naWM6IGxldCBwZW9wbGUgc3BlY2lmeSBhbnkgdHlwZSB0aGV5IHdhbnQsXG4gICAgLy8gb25seSBhdXRvdHlwZSBpZiB0eXBlIGlzICctJ1xuICAgIGlmKGF4LnR5cGUgIT09ICctJykgcmV0dXJuO1xuXG4gICAgdmFyIGlkID0gYXguX2lkO1xuICAgIHZhciBheExldHRlciA9IGlkLmNoYXJBdCgwKTtcblxuICAgIHZhciBjYWxBdHRyID0gYXhMZXR0ZXIgKyAnY2FsZW5kYXInO1xuICAgIHZhciBjYWxlbmRhciA9IGF4W2NhbEF0dHJdO1xuXG4gICAgYXgudHlwZSA9IGF1dG9UeXBlKGRhdGEsIGNhbGVuZGFyKTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIGlzQXJyYXkxRCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmlzQXJyYXkxRDtcbnZhciBjaGVhdGVyQmFzaXMgPSByZXF1aXJlKCcuL2NoZWF0ZXJfYmFzaXMnKTtcbnZhciBhcnJheU1pbm1heCA9IHJlcXVpcmUoJy4vYXJyYXlfbWlubWF4Jyk7XG52YXIgY2FsY0dyaWRsaW5lcyA9IHJlcXVpcmUoJy4vY2FsY19ncmlkbGluZXMnKTtcbnZhciBjYWxjTGFiZWxzID0gcmVxdWlyZSgnLi9jYWxjX2xhYmVscycpO1xudmFyIGNhbGNDbGlwUGF0aCA9IHJlcXVpcmUoJy4vY2FsY19jbGlwcGF0aCcpO1xudmFyIGNsZWFuMmRBcnJheSA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvY2xlYW5fMmRfYXJyYXknKTtcbnZhciBzbW9vdGhGaWxsMmRBcnJheSA9IHJlcXVpcmUoJy4vc21vb3RoX2ZpbGxfMmRfYXJyYXknKTtcbnZhciBjb252ZXJ0Q29sdW1uRGF0YSA9IHJlcXVpcmUoJy4uL2hlYXRtYXAvY29udmVydF9jb2x1bW5feHl6Jyk7XG52YXIgc2V0Q29udmVydCA9IHJlcXVpcmUoJy4vc2V0X2NvbnZlcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciB4YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS54YXhpcyk7XG4gICAgdmFyIHlhID0gQXhlcy5nZXRGcm9tSWQoZ2QsIHRyYWNlLnlheGlzKTtcbiAgICB2YXIgYWF4ID0gdHJhY2UuYWF4aXM7XG4gICAgdmFyIGJheCA9IHRyYWNlLmJheGlzO1xuXG4gICAgdmFyIHggPSB0cmFjZS54O1xuICAgIHZhciB5ID0gdHJhY2UueTtcbiAgICB2YXIgY29scyA9IFtdO1xuICAgIGlmKHggJiYgaXNBcnJheTFEKHgpKSBjb2xzLnB1c2goJ3gnKTtcbiAgICBpZih5ICYmIGlzQXJyYXkxRCh5KSkgY29scy5wdXNoKCd5Jyk7XG5cbiAgICBpZihjb2xzLmxlbmd0aCkge1xuICAgICAgICBjb252ZXJ0Q29sdW1uRGF0YSh0cmFjZSwgYWF4LCBiYXgsICdhJywgJ2InLCBjb2xzKTtcbiAgICB9XG5cbiAgICB2YXIgYSA9IHRyYWNlLl9hID0gdHJhY2UuX2EgfHwgdHJhY2UuYTtcbiAgICB2YXIgYiA9IHRyYWNlLl9iID0gdHJhY2UuX2IgfHwgdHJhY2UuYjtcbiAgICB4ID0gdHJhY2UuX3ggfHwgdHJhY2UueDtcbiAgICB5ID0gdHJhY2UuX3kgfHwgdHJhY2UueTtcblxuICAgIHZhciB0ID0ge307XG5cbiAgICBpZih0cmFjZS5fY2hlYXRlcikge1xuICAgICAgICB2YXIgYXZhbHMgPSBhYXguY2hlYXRlcnR5cGUgPT09ICdpbmRleCcgPyBhLmxlbmd0aCA6IGE7XG4gICAgICAgIHZhciBidmFscyA9IGJheC5jaGVhdGVydHlwZSA9PT0gJ2luZGV4JyA/IGIubGVuZ3RoIDogYjtcbiAgICAgICAgeCA9IGNoZWF0ZXJCYXNpcyhhdmFscywgYnZhbHMsIHRyYWNlLmNoZWF0ZXJzbG9wZSk7XG4gICAgfVxuXG4gICAgdHJhY2UuX3ggPSB4ID0gY2xlYW4yZEFycmF5KHgpO1xuICAgIHRyYWNlLl95ID0geSA9IGNsZWFuMmRBcnJheSh5KTtcblxuICAgIC8vIEZpbGwgaW4gYW55IHVuZGVmaW5lZCB2YWx1ZXMgd2l0aCBlbGxpcHRpYyBzbW9vdGhpbmcuIFRoaXMgZG9lc24ndCB0YWtlXG4gICAgLy8gaW50byBhY2NvdW50IHRoZSBzcGFjaW5nIG9mIHRoZSB2YWx1ZXMuIFRoYXQgaXMsIHRoZSBkZXJpdmF0aXZlcyBzaG91bGRcbiAgICAvLyBiZSBtb2RpZmllZCB0byB1c2UgYSBhbmQgYiB2YWx1ZXMuIEl0J3Mgbm90IHRoYXQgaGFyZCwgYnV0IHRoaXMgaXMgYWxyZWFkeVxuICAgIC8vIG1vZGVyYXRlIG92ZXJraWxsIGZvciBqdXN0IGZpbGxpbmcgaW4gbWlzc2luZyB2YWx1ZXMuXG4gICAgc21vb3RoRmlsbDJkQXJyYXkoeCwgYSwgYik7XG4gICAgc21vb3RoRmlsbDJkQXJyYXkoeSwgYSwgYik7XG5cbiAgICBzZXRDb252ZXJ0KHRyYWNlKTtcblxuICAgIC8vIGNyZWF0ZSBjb252ZXJzaW9uIGZ1bmN0aW9ucyB0aGF0IGRlcGVuZCBvbiB0aGUgZGF0YVxuICAgIHRyYWNlLnNldFNjYWxlKCk7XG5cbiAgICAvLyBUaGlzIGlzIGEgcmF0aGVyIGV4cGVuc2l2ZSBzY2FuLiBOb3RoaW5nIGd1YXJhbnRlZXMgbW9ub3RvbmljaXR5LFxuICAgIC8vIHNvIHdlIG5lZWQgdG8gc2NhbiB0aHJvdWdoIGFsbCBkYXRhIHRvIGdldCBwcm9wZXIgcmFuZ2VzOlxuICAgIHZhciB4cmFuZ2UgPSBhcnJheU1pbm1heCh4KTtcbiAgICB2YXIgeXJhbmdlID0gYXJyYXlNaW5tYXgoeSk7XG5cbiAgICB2YXIgZHggPSAwLjUgKiAoeHJhbmdlWzFdIC0geHJhbmdlWzBdKTtcbiAgICB2YXIgeGMgPSAwLjUgKiAoeHJhbmdlWzFdICsgeHJhbmdlWzBdKTtcblxuICAgIHZhciBkeSA9IDAuNSAqICh5cmFuZ2VbMV0gLSB5cmFuZ2VbMF0pO1xuICAgIHZhciB5YyA9IDAuNSAqICh5cmFuZ2VbMV0gKyB5cmFuZ2VbMF0pO1xuXG4gICAgLy8gRXhwYW5kIHRoZSBheGVzIHRvIGZpdCB0aGUgcGxvdCwgZXhjZXB0IGp1c3QgZ3JvdyBpdCBieSBhIGZhY3RvciBvZiAxLjNcbiAgICAvLyBiZWNhdXNlIHRoZSBsYWJlbHMgc2hvdWxkIGJlIHRha2VuIGludG8gYWNjb3VudCBleGNlcHQgdGhhdCdzIGRpZmZpY3VsdFxuICAgIC8vIGhlbmNlIDEuMy5cbiAgICB2YXIgZ3JvdyA9IDEuMztcbiAgICB4cmFuZ2UgPSBbeGMgLSBkeCAqIGdyb3csIHhjICsgZHggKiBncm93XTtcbiAgICB5cmFuZ2UgPSBbeWMgLSBkeSAqIGdyb3csIHljICsgZHkgKiBncm93XTtcblxuICAgIHRyYWNlLl9leHRyZW1lc1t4YS5faWRdID0gQXhlcy5maW5kRXh0cmVtZXMoeGEsIHhyYW5nZSwge3BhZGRlZDogdHJ1ZX0pO1xuICAgIHRyYWNlLl9leHRyZW1lc1t5YS5faWRdID0gQXhlcy5maW5kRXh0cmVtZXMoeWEsIHlyYW5nZSwge3BhZGRlZDogdHJ1ZX0pO1xuXG4gICAgLy8gRW51bWVyYXRlIHRoZSBncmlkbGluZXMsIGJvdGggbWFqb3IgYW5kIG1pbm9yLCBhbmQgc3RvcmUgdGhlbSBvbiB0aGUgdHJhY2VcbiAgICAvLyBvYmplY3Q6XG4gICAgY2FsY0dyaWRsaW5lcyh0cmFjZSwgJ2EnLCAnYicpO1xuICAgIGNhbGNHcmlkbGluZXModHJhY2UsICdiJywgJ2EnKTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgdGV4dCBsYWJlbHMgZm9yIGVhY2ggbWFqb3IgZ3JpZGxpbmUgYW5kIHN0b3JlIHRoZW0gb24gdGhlXG4gICAgLy8gdHJhY2Ugb2JqZWN0OlxuICAgIGNhbGNMYWJlbHModHJhY2UsIGFheCk7XG4gICAgY2FsY0xhYmVscyh0cmFjZSwgYmF4KTtcblxuICAgIC8vIFRhYnVsYXRlIHBvaW50cyBmb3IgdGhlIGZvdXIgc2VnbWVudHMgdGhhdCBib3VuZCB0aGUgYXhlcyBzbyB0aGF0IHdlIGNhblxuICAgIC8vIG1hcCB0byBwaXhlbCBjb29yZGluYXRlcyBpbiB0aGUgcGxvdCBmdW5jdGlvbiBhbmQgY3JlYXRlIGEgY2xpcCByZWN0OlxuICAgIHQuY2xpcHNlZ21lbnRzID0gY2FsY0NsaXBQYXRoKHRyYWNlLl94Y3RybCwgdHJhY2UuX3ljdHJsLCBhYXgsIGJheCk7XG5cbiAgICB0LnggPSB4O1xuICAgIHQueSA9IHk7XG4gICAgdC5hID0gYTtcbiAgICB0LmIgPSBiO1xuXG4gICAgcmV0dXJuIFt0XTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYWtlQ2xpcFBhdGgoeGN0cmwsIHljdHJsLCBhYXgsIGJheCkge1xuICAgIHZhciBpLCB4LCB5O1xuICAgIHZhciBzZWdtZW50cyA9IFtdO1xuXG4gICAgdmFyIGFzbW9vdGhpbmcgPSAhIWFheC5zbW9vdGhpbmc7XG4gICAgdmFyIGJzbW9vdGhpbmcgPSAhIWJheC5zbW9vdGhpbmc7XG4gICAgdmFyIG5lYTEgPSB4Y3RybFswXS5sZW5ndGggLSAxO1xuICAgIHZhciBuZWIxID0geGN0cmwubGVuZ3RoIC0gMTtcblxuICAgIC8vIEFsb25nIHRoZSBsb3dlciBhIGF4aXM6XG4gICAgZm9yKGkgPSAwLCB4ID0gW10sIHkgPSBbXTsgaSA8PSBuZWExOyBpKyspIHtcbiAgICAgICAgeFtpXSA9IHhjdHJsWzBdW2ldO1xuICAgICAgICB5W2ldID0geWN0cmxbMF1baV07XG4gICAgfVxuICAgIHNlZ21lbnRzLnB1c2goe3g6IHgsIHk6IHksIGJpY3ViaWM6IGFzbW9vdGhpbmd9KTtcblxuICAgIC8vIEFsb25nIHRoZSB1cHBlciBiIGF4aXM6XG4gICAgZm9yKGkgPSAwLCB4ID0gW10sIHkgPSBbXTsgaSA8PSBuZWIxOyBpKyspIHtcbiAgICAgICAgeFtpXSA9IHhjdHJsW2ldW25lYTFdO1xuICAgICAgICB5W2ldID0geWN0cmxbaV1bbmVhMV07XG4gICAgfVxuICAgIHNlZ21lbnRzLnB1c2goe3g6IHgsIHk6IHksIGJpY3ViaWM6IGJzbW9vdGhpbmd9KTtcblxuICAgIC8vIEJhY2t3YXJkcyBhbG9uZyB0aGUgdXBwZXIgYSBheGlzOlxuICAgIGZvcihpID0gbmVhMSwgeCA9IFtdLCB5ID0gW107IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHhbbmVhMSAtIGldID0geGN0cmxbbmViMV1baV07XG4gICAgICAgIHlbbmVhMSAtIGldID0geWN0cmxbbmViMV1baV07XG4gICAgfVxuICAgIHNlZ21lbnRzLnB1c2goe3g6IHgsIHk6IHksIGJpY3ViaWM6IGFzbW9vdGhpbmd9KTtcblxuICAgIC8vIEJhY2t3YXJkcyBhbG9uZyB0aGUgbG93ZXIgYiBheGlzOlxuICAgIGZvcihpID0gbmViMSwgeCA9IFtdLCB5ID0gW107IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHhbbmViMSAtIGldID0geGN0cmxbaV1bMF07XG4gICAgICAgIHlbbmViMSAtIGldID0geWN0cmxbaV1bMF07XG4gICAgfVxuICAgIHNlZ21lbnRzLnB1c2goe3g6IHgsIHk6IHksIGJpY3ViaWM6IGJzbW9vdGhpbmd9KTtcblxuICAgIHJldHVybiBzZWdtZW50cztcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsY0dyaWRsaW5lcyh0cmFjZSwgYXhpc0xldHRlciwgY3Jvc3NBeGlzTGV0dGVyKSB7XG4gICAgdmFyIGksIGosIGowO1xuICAgIHZhciBlcHMsIGJvdW5kcywgbjEsIG4yLCBuLCB2YWx1ZSwgdjtcbiAgICB2YXIgajEsIHYwLCB2MSwgZDtcblxuICAgIHZhciBkYXRhID0gdHJhY2VbJ18nICsgYXhpc0xldHRlcl07XG4gICAgdmFyIGF4aXMgPSB0cmFjZVtheGlzTGV0dGVyICsgJ2F4aXMnXTtcblxuICAgIHZhciBncmlkbGluZXMgPSBheGlzLl9ncmlkbGluZXMgPSBbXTtcbiAgICB2YXIgbWlub3JncmlkbGluZXMgPSBheGlzLl9taW5vcmdyaWRsaW5lcyA9IFtdO1xuICAgIHZhciBib3VuZGFyeWxpbmVzID0gYXhpcy5fYm91bmRhcnlsaW5lcyA9IFtdO1xuXG4gICAgdmFyIGNyb3NzRGF0YSA9IHRyYWNlWydfJyArIGNyb3NzQXhpc0xldHRlcl07XG4gICAgdmFyIGNyb3NzQXhpcyA9IHRyYWNlW2Nyb3NzQXhpc0xldHRlciArICdheGlzJ107XG5cbiAgICBpZihheGlzLnRpY2ttb2RlID09PSAnYXJyYXknKSB7XG4gICAgICAgIGF4aXMudGlja3ZhbHMgPSBkYXRhLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgdmFyIHhjcCA9IHRyYWNlLl94Y3RybDtcbiAgICB2YXIgeWNwID0gdHJhY2UuX3ljdHJsO1xuICAgIHZhciBuZWEgPSB4Y3BbMF0ubGVuZ3RoO1xuICAgIHZhciBuZWIgPSB4Y3AubGVuZ3RoO1xuICAgIHZhciBuYSA9IHRyYWNlLl9hLmxlbmd0aDtcbiAgICB2YXIgbmIgPSB0cmFjZS5fYi5sZW5ndGg7XG5cbiAgICBBeGVzLnByZXBUaWNrcyhheGlzKTtcblxuICAgIC8vIGRvbid0IGxlYXZlIHRpY2t2YWxzIGluIGF4aXMgbG9va2luZyBsaWtlIGFuIGF0dHJpYnV0ZVxuICAgIGlmKGF4aXMudGlja21vZGUgPT09ICdhcnJheScpIGRlbGV0ZSBheGlzLnRpY2t2YWxzO1xuXG4gICAgLy8gVGhlIGRlZmF1bHQgaXMgYW4gZW1wdHkgYXJyYXkgdGhhdCB3aWxsIGNhdXNlIHRoZSBqb2luIHRvIHJlbW92ZSB0aGUgZ3JpZGxpbmUgaWZcbiAgICAvLyBpdCdzIGp1c3QgZGlzYXBwZWFyZWQ6XG4gICAgLy8gYXhpcy5fc3RhcnRsaW5lID0gYXhpcy5fZW5kbGluZSA9IFtdO1xuXG4gICAgLy8gSWYgdGhlIGNyb3NzIGF4aXMgdXNlcyBiaWN1YmljIGludGVycG9sYXRpb24sIHRoZW4gdGhlIGdyaWRcbiAgICAvLyBsaW5lcyBmYWxsIG9uY2UgZXZlcnkgdGhyZWUgZXhwYW5kZWQgZ3JpZCByb3cvY29sczpcbiAgICB2YXIgc3RyaWRlID0gYXhpcy5zbW9vdGhpbmcgPyAzIDogMTtcblxuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFZhbHVlR3JpZGxpbmUodmFsdWUpIHtcbiAgICAgICAgdmFyIGksIGosIGowLCB0aiwgcHh5LCBpMCwgdGksIHh5LCBkeHlkaTAsIGR4eWRpMSwgZHh5ZGowLCBkeHlkajE7XG4gICAgICAgIHZhciB4cG9pbnRzID0gW107XG4gICAgICAgIHZhciB5cG9pbnRzID0gW107XG4gICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgLy8gU2VhcmNoIGZvciB0aGUgZnJhY3Rpb25hbCBncmlkIGluZGV4IGdpdmluZyB0aGlzIGxpbmU6XG4gICAgICAgIGlmKGF4aXNMZXR0ZXIgPT09ICdiJykge1xuICAgICAgICAgICAgLy8gRm9yIHRoZSBwb3NpdGlvbiB3ZSB1c2UganVzdCB0aGUgaS1qIGNvb3JkaW5hdGVzOlxuICAgICAgICAgICAgaiA9IHRyYWNlLmIyaih2YWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIFRoZSBkZXJpdmF0aXZlcyBmb3IgY2F0bXVsbC1yb20gc3BsaW5lcyBhcmUgZGlzY29udGludW91cyBhY3Jvc3MgY2VsbFxuICAgICAgICAgICAgLy8gYm91bmRhcmllcyB0aG91Z2gsIHNvIHdlIG5lZWQgdG8gcHJvdmlkZSBib3RoIHRoZSBjZWxsIGFuZCB0aGUgcG9zaXRpb25cbiAgICAgICAgICAgIC8vIHdpdGhpbiB0aGUgY2VsbCBzZXBhcmF0ZWx5OlxuICAgICAgICAgICAgajAgPSBNYXRoLmZsb29yKE1hdGgubWF4KDAsIE1hdGgubWluKG5iIC0gMiwgaikpKTtcbiAgICAgICAgICAgIHRqID0gaiAtIGowO1xuXG4gICAgICAgICAgICByZXQubGVuZ3RoID0gbmI7XG4gICAgICAgICAgICByZXQuY3Jvc3NMZW5ndGggPSBuYTtcblxuICAgICAgICAgICAgcmV0Lnh5ID0gZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZS5ldmFseHkoW10sIGksIGopO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0LmR4eSA9IGZ1bmN0aW9uKGkwLCB0aSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZS5keHlkaShbXSwgaTAsIGowLCB0aSwgdGopO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbmE7IGkrKykge1xuICAgICAgICAgICAgICAgIGkwID0gTWF0aC5taW4obmEgLSAyLCBpKTtcbiAgICAgICAgICAgICAgICB0aSA9IGkgLSBpMDtcbiAgICAgICAgICAgICAgICB4eSA9IHRyYWNlLmV2YWx4eShbXSwgaSwgaik7XG5cbiAgICAgICAgICAgICAgICBpZihjcm9zc0F4aXMuc21vb3RoaW5nICYmIGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZpcnN0IGNvbnRyb2wgcG9pbnQ6XG4gICAgICAgICAgICAgICAgICAgIGR4eWRpMCA9IHRyYWNlLmR4eWRpKFtdLCBpIC0gMSwgajAsIDAsIHRqKTtcbiAgICAgICAgICAgICAgICAgICAgeHBvaW50cy5wdXNoKHB4eVswXSArIGR4eWRpMFswXSAvIDMpO1xuICAgICAgICAgICAgICAgICAgICB5cG9pbnRzLnB1c2gocHh5WzFdICsgZHh5ZGkwWzFdIC8gMyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU2Vjb25kIGNvbnRyb2wgcG9pbnQ6XG4gICAgICAgICAgICAgICAgICAgIGR4eWRpMSA9IHRyYWNlLmR4eWRpKFtdLCBpIC0gMSwgajAsIDEsIHRqKTtcbiAgICAgICAgICAgICAgICAgICAgeHBvaW50cy5wdXNoKHh5WzBdIC0gZHh5ZGkxWzBdIC8gMyk7XG4gICAgICAgICAgICAgICAgICAgIHlwb2ludHMucHVzaCh4eVsxXSAtIGR4eWRpMVsxXSAvIDMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHhwb2ludHMucHVzaCh4eVswXSk7XG4gICAgICAgICAgICAgICAgeXBvaW50cy5wdXNoKHh5WzFdKTtcblxuICAgICAgICAgICAgICAgIHB4eSA9IHh5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSA9IHRyYWNlLmEyaSh2YWx1ZSk7XG4gICAgICAgICAgICBpMCA9IE1hdGguZmxvb3IoTWF0aC5tYXgoMCwgTWF0aC5taW4obmEgLSAyLCBpKSkpO1xuICAgICAgICAgICAgdGkgPSBpIC0gaTA7XG5cbiAgICAgICAgICAgIHJldC5sZW5ndGggPSBuYTtcbiAgICAgICAgICAgIHJldC5jcm9zc0xlbmd0aCA9IG5iO1xuXG4gICAgICAgICAgICByZXQueHkgPSBmdW5jdGlvbihqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlLmV2YWx4eShbXSwgaSwgaik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXQuZHh5ID0gZnVuY3Rpb24oajAsIHRqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlLmR4eWRqKFtdLCBpMCwgajAsIHRpLCB0aik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBuYjsgaisrKSB7XG4gICAgICAgICAgICAgICAgajAgPSBNYXRoLm1pbihuYiAtIDIsIGopO1xuICAgICAgICAgICAgICAgIHRqID0gaiAtIGowO1xuICAgICAgICAgICAgICAgIHh5ID0gdHJhY2UuZXZhbHh5KFtdLCBpLCBqKTtcblxuICAgICAgICAgICAgICAgIGlmKGNyb3NzQXhpcy5zbW9vdGhpbmcgJiYgaiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRmlyc3QgY29udHJvbCBwb2ludDpcbiAgICAgICAgICAgICAgICAgICAgZHh5ZGowID0gdHJhY2UuZHh5ZGooW10sIGkwLCBqIC0gMSwgdGksIDApO1xuICAgICAgICAgICAgICAgICAgICB4cG9pbnRzLnB1c2gocHh5WzBdICsgZHh5ZGowWzBdIC8gMyk7XG4gICAgICAgICAgICAgICAgICAgIHlwb2ludHMucHVzaChweHlbMV0gKyBkeHlkajBbMV0gLyAzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBTZWNvbmQgY29udHJvbCBwb2ludDpcbiAgICAgICAgICAgICAgICAgICAgZHh5ZGoxID0gdHJhY2UuZHh5ZGooW10sIGkwLCBqIC0gMSwgdGksIDEpO1xuICAgICAgICAgICAgICAgICAgICB4cG9pbnRzLnB1c2goeHlbMF0gLSBkeHlkajFbMF0gLyAzKTtcbiAgICAgICAgICAgICAgICAgICAgeXBvaW50cy5wdXNoKHh5WzFdIC0gZHh5ZGoxWzFdIC8gMyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgeHBvaW50cy5wdXNoKHh5WzBdKTtcbiAgICAgICAgICAgICAgICB5cG9pbnRzLnB1c2goeHlbMV0pO1xuXG4gICAgICAgICAgICAgICAgcHh5ID0geHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXQuYXhpc0xldHRlciA9IGF4aXNMZXR0ZXI7XG4gICAgICAgIHJldC5heGlzID0gYXhpcztcbiAgICAgICAgcmV0LmNyb3NzQXhpcyA9IGNyb3NzQXhpcztcbiAgICAgICAgcmV0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldC5jb25zdHZhciA9IGNyb3NzQXhpc0xldHRlcjtcbiAgICAgICAgcmV0LmluZGV4ID0gbjtcbiAgICAgICAgcmV0LnggPSB4cG9pbnRzO1xuICAgICAgICByZXQueSA9IHlwb2ludHM7XG4gICAgICAgIHJldC5zbW9vdGhpbmcgPSBjcm9zc0F4aXMuc21vb3RoaW5nO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uc3RydWN0QXJyYXlHcmlkbGluZShpZHgpIHtcbiAgICAgICAgdmFyIGosIGkwLCBqMCwgdGksIHRqO1xuICAgICAgICB2YXIgeHBvaW50cyA9IFtdO1xuICAgICAgICB2YXIgeXBvaW50cyA9IFtdO1xuICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgIHJldC5sZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgcmV0LmNyb3NzTGVuZ3RoID0gY3Jvc3NEYXRhLmxlbmd0aDtcblxuICAgICAgICBpZihheGlzTGV0dGVyID09PSAnYicpIHtcbiAgICAgICAgICAgIGowID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obmIgLSAyLCBpZHgpKTtcbiAgICAgICAgICAgIHRqID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgaWR4IC0gajApKTtcblxuICAgICAgICAgICAgcmV0Lnh5ID0gZnVuY3Rpb24oaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZS5ldmFseHkoW10sIGksIGlkeCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXQuZHh5ID0gZnVuY3Rpb24oaTAsIHRpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlLmR4eWRpKFtdLCBpMCwgajAsIHRpLCB0aik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBJbiB0aGUgdGlja21vZGU6IGFycmF5IGNhc2UsIHRoaXMgb3BlcmF0aW9uIGlzIGEgc2ltcGxlXG4gICAgICAgICAgICAvLyB0cmFuc2ZlciBvZiBkYXRhOlxuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbmVhOyBqKyspIHtcbiAgICAgICAgICAgICAgICB4cG9pbnRzW2pdID0geGNwW2lkeCAqIHN0cmlkZV1bal07XG4gICAgICAgICAgICAgICAgeXBvaW50c1tqXSA9IHljcFtpZHggKiBzdHJpZGVdW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaTAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihuYSAtIDIsIGlkeCkpO1xuICAgICAgICAgICAgdGkgPSBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCBpZHggLSBpMCkpO1xuXG4gICAgICAgICAgICByZXQueHkgPSBmdW5jdGlvbihqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlLmV2YWx4eShbXSwgaWR4LCBqKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldC5keHkgPSBmdW5jdGlvbihqMCwgdGopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2UuZHh5ZGooW10sIGkwLCBqMCwgdGksIHRqKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIEluIHRoZSB0aWNrbW9kZTogYXJyYXkgY2FzZSwgdGhpcyBvcGVyYXRpb24gaXMgYSBzaW1wbGVcbiAgICAgICAgICAgIC8vIHRyYW5zZmVyIG9mIGRhdGE6XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBuZWI7IGorKykge1xuICAgICAgICAgICAgICAgIHhwb2ludHNbal0gPSB4Y3Bbal1baWR4ICogc3RyaWRlXTtcbiAgICAgICAgICAgICAgICB5cG9pbnRzW2pdID0geWNwW2pdW2lkeCAqIHN0cmlkZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXQuYXhpc0xldHRlciA9IGF4aXNMZXR0ZXI7XG4gICAgICAgIHJldC5heGlzID0gYXhpcztcbiAgICAgICAgcmV0LmNyb3NzQXhpcyA9IGNyb3NzQXhpcztcbiAgICAgICAgcmV0LnZhbHVlID0gZGF0YVtpZHhdO1xuICAgICAgICByZXQuY29uc3R2YXIgPSBjcm9zc0F4aXNMZXR0ZXI7XG4gICAgICAgIHJldC5pbmRleCA9IGlkeDtcbiAgICAgICAgcmV0LnggPSB4cG9pbnRzO1xuICAgICAgICByZXQueSA9IHlwb2ludHM7XG4gICAgICAgIHJldC5zbW9vdGhpbmcgPSBjcm9zc0F4aXMuc21vb3RoaW5nO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgaWYoYXhpcy50aWNrbW9kZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAvLyB2YXIgajAgPSBheGlzLnN0YXJ0bGluZSA/IDEgOiAwO1xuICAgICAgICAvLyB2YXIgajEgPSBkYXRhLmxlbmd0aCAtIChheGlzLmVuZGxpbmUgPyAxIDogMCk7XG5cbiAgICAgICAgZXBzID0gNWUtMTU7XG4gICAgICAgIGJvdW5kcyA9IFtcbiAgICAgICAgICAgIE1hdGguZmxvb3IoKChkYXRhLmxlbmd0aCAtIDEpIC0gYXhpcy5hcnJheXRpY2swKSAvIGF4aXMuYXJyYXlkdGljayAqICgxICsgZXBzKSksXG4gICAgICAgICAgICBNYXRoLmNlaWwoKC0gYXhpcy5hcnJheXRpY2swKSAvIGF4aXMuYXJyYXlkdGljayAvICgxICsgZXBzKSlcbiAgICAgICAgXS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtyZXR1cm4gYSAtIGI7fSk7XG5cbiAgICAgICAgLy8gVW5wYWNrIHNvcnRlZCB2YWx1ZXMgc28gd2UgY2FuIGJlIHN1cmUgdG8gYXZvaWQgaW5maW5pdGUgbG9vcHMgaWYgc29tZXRoaW5nXG4gICAgICAgIC8vIGlzIGJhY2t3YXJkczpcbiAgICAgICAgbjEgPSBib3VuZHNbMF0gLSAxO1xuICAgICAgICBuMiA9IGJvdW5kc1sxXSArIDE7XG5cbiAgICAgICAgLy8gSWYgdGhlIGF4ZXMgZmFsbCBhbG9uZyBhcnJheSBsaW5lcywgdGhlbiB0aGlzIGlzIGEgbXVjaCBzaW1wbGVyIHByb2Nlc3Mgc2luY2VcbiAgICAgICAgLy8gd2UgYWxyZWFkeSBoYXZlIGFsbCB0aGUgY29udHJvbCBwb2ludHMgd2UgbmVlZFxuICAgICAgICBmb3IobiA9IG4xOyBuIDwgbjI7IG4rKykge1xuICAgICAgICAgICAgaiA9IGF4aXMuYXJyYXl0aWNrMCArIGF4aXMuYXJyYXlkdGljayAqIG47XG4gICAgICAgICAgICBpZihqIDwgMCB8fCBqID4gZGF0YS5sZW5ndGggLSAxKSBjb250aW51ZTtcbiAgICAgICAgICAgIGdyaWRsaW5lcy5wdXNoKGV4dGVuZEZsYXQoY29uc3RydWN0QXJyYXlHcmlkbGluZShqKSwge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBheGlzLmdyaWRjb2xvcixcbiAgICAgICAgICAgICAgICB3aWR0aDogYXhpcy5ncmlkd2lkdGhcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihuID0gbjE7IG4gPCBuMjsgbisrKSB7XG4gICAgICAgICAgICBqMCA9IGF4aXMuYXJyYXl0aWNrMCArIGF4aXMuYXJyYXlkdGljayAqIG47XG4gICAgICAgICAgICBqMSA9IE1hdGgubWluKGowICsgYXhpcy5hcnJheWR0aWNrLCBkYXRhLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBmaXggdGhlIGJvdW5kcyBjb21wdXRhdGlvbiBzbyB3ZSBkb24ndCBoYXZlIHRvIGRvIGEgbGFyZ2UgcmFuZ2UgYW5kIHRoZW4gdGhyb3dcbiAgICAgICAgICAgIC8vIG91dCB1bm5lZWRlZCBudW1iZXJzXG4gICAgICAgICAgICBpZihqMCA8IDAgfHwgajAgPiBkYXRhLmxlbmd0aCAtIDEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYoajEgPCAwIHx8IGoxID4gZGF0YS5sZW5ndGggLSAxKSBjb250aW51ZTtcblxuICAgICAgICAgICAgdjAgPSBkYXRhW2owXTtcbiAgICAgICAgICAgIHYxID0gZGF0YVtqMV07XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGF4aXMubWlub3JncmlkY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGQgPSBqMSAtIGowO1xuXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZml4IHRoZSBib3VuZHMgY29tcHV0YXRpb24gc28gd2UgZG9uJ3QgaGF2ZSB0byBkbyBhIGxhcmdlIHJhbmdlIGFuZCB0aGVuIHRocm93XG4gICAgICAgICAgICAgICAgLy8gb3V0IHVubmVlZGVkIG51bWJlcnNcbiAgICAgICAgICAgICAgICBpZihkIDw9IDApIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgLy8gWFhYOiBUaGlzIGNhbGN1bGF0aW9uIGlzbid0IHF1aXRlIHJpZ2h0LiBPZmYgYnkgb25lIHNvbWV3aGVyZT9cbiAgICAgICAgICAgICAgICB2ID0gdjAgKyAodjEgLSB2MCkgKiAoaSArIDEpIC8gKGF4aXMubWlub3JncmlkY291bnQgKyAxKSAqIChheGlzLmFycmF5ZHRpY2sgLyBkKTtcblxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGZpeCB0aGUgYm91bmRzIGNvbXB1dGF0aW9uIHNvIHdlIGRvbid0IGhhdmUgdG8gZG8gYSBsYXJnZSByYW5nZSBhbmQgdGhlbiB0aHJvd1xuICAgICAgICAgICAgICAgIC8vIG91dCB1bm5lZWRlZCBudW1iZXJzXG4gICAgICAgICAgICAgICAgaWYodiA8IGRhdGFbMF0gfHwgdiA+IGRhdGFbZGF0YS5sZW5ndGggLSAxXSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgbWlub3JncmlkbGluZXMucHVzaChleHRlbmRGbGF0KGNvbnN0cnVjdFZhbHVlR3JpZGxpbmUodiksIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGF4aXMubWlub3JncmlkY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBheGlzLm1pbm9yZ3JpZHdpZHRoXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoYXhpcy5zdGFydGxpbmUpIHtcbiAgICAgICAgICAgIGJvdW5kYXJ5bGluZXMucHVzaChleHRlbmRGbGF0KGNvbnN0cnVjdEFycmF5R3JpZGxpbmUoMCksIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogYXhpcy5zdGFydGxpbmVjb2xvcixcbiAgICAgICAgICAgICAgICB3aWR0aDogYXhpcy5zdGFydGxpbmV3aWR0aFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYXhpcy5lbmRsaW5lKSB7XG4gICAgICAgICAgICBib3VuZGFyeWxpbmVzLnB1c2goZXh0ZW5kRmxhdChjb25zdHJ1Y3RBcnJheUdyaWRsaW5lKGRhdGEubGVuZ3RoIC0gMSksIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogYXhpcy5lbmRsaW5lY29sb3IsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGF4aXMuZW5kbGluZXdpZHRoXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiB0aGUgbGluZXMgZG8gbm90IGZhbGwgYWxvbmcgdGhlIGF4ZXMsIHRoZW4gd2UgaGF2ZSB0byBpbnRlcnBvbGF0ZVxuICAgICAgICAvLyB0aGUgY29udHJvIHBvaW50cyBhbmQgc28gc29tZSBtYXRoIHRvIGZpZ3VyZSBvdXQgd2hlcmUgdGhlIGxpbmVzIGFyZVxuICAgICAgICAvLyBpbiB0aGUgZmlyc3QgcGxhY2UuXG5cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgaW50ZWdlciBib3VkbnMgb2YgdGljazAgKyBuICogZHRpY2sgdGhhdCBmYWxsIHdpdGhpbiB0aGUgcmFuZ2VcbiAgICAgICAgLy8gKHJvdWdobHkgc3BlYWtpbmcpOlxuICAgICAgICAvLyBHaXZlIHRoaXMgYSBuaWNlIGdlbmVyb3VzIGVwc2lsb24uIFdlIHVzZSBhdCBhcyAqICgxICsgZXBzKSBpbiBvcmRlciB0byBtYWtlXG4gICAgICAgIC8vIGluZXF1YWxpdGllcyBhIGxpdHRsZSB0b2xlcmFudCBpbiBhIG1vcmUgb3IgbGVzcyBjb3JyZWN0IG1hbm5lcjpcbiAgICAgICAgZXBzID0gNWUtMTU7XG4gICAgICAgIGJvdW5kcyA9IFtcbiAgICAgICAgICAgIE1hdGguZmxvb3IoKGRhdGFbZGF0YS5sZW5ndGggLSAxXSAtIGF4aXMudGljazApIC8gYXhpcy5kdGljayAqICgxICsgZXBzKSksXG4gICAgICAgICAgICBNYXRoLmNlaWwoKGRhdGFbMF0gLSBheGlzLnRpY2swKSAvIGF4aXMuZHRpY2sgLyAoMSArIGVwcykpXG4gICAgICAgIF0uc29ydChmdW5jdGlvbihhLCBiKSB7cmV0dXJuIGEgLSBiO30pO1xuXG4gICAgICAgIC8vIFVucGFjayBzb3J0ZWQgdmFsdWVzIHNvIHdlIGNhbiBiZSBzdXJlIHRvIGF2b2lkIGluZmluaXRlIGxvb3BzIGlmIHNvbWV0aGluZ1xuICAgICAgICAvLyBpcyBiYWNrd2FyZHM6XG4gICAgICAgIG4xID0gYm91bmRzWzBdO1xuICAgICAgICBuMiA9IGJvdW5kc1sxXTtcblxuICAgICAgICBmb3IobiA9IG4xOyBuIDw9IG4yOyBuKyspIHtcbiAgICAgICAgICAgIHZhbHVlID0gYXhpcy50aWNrMCArIGF4aXMuZHRpY2sgKiBuO1xuXG4gICAgICAgICAgICBncmlkbGluZXMucHVzaChleHRlbmRGbGF0KGNvbnN0cnVjdFZhbHVlR3JpZGxpbmUodmFsdWUpLCB7XG4gICAgICAgICAgICAgICAgY29sb3I6IGF4aXMuZ3JpZGNvbG9yLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBheGlzLmdyaWR3aWR0aFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKG4gPSBuMSAtIDE7IG4gPCBuMiArIDE7IG4rKykge1xuICAgICAgICAgICAgdmFsdWUgPSBheGlzLnRpY2swICsgYXhpcy5kdGljayAqIG47XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGF4aXMubWlub3JncmlkY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHYgPSB2YWx1ZSArIGF4aXMuZHRpY2sgKiAoaSArIDEpIC8gKGF4aXMubWlub3JncmlkY291bnQgKyAxKTtcbiAgICAgICAgICAgICAgICBpZih2IDwgZGF0YVswXSB8fCB2ID4gZGF0YVtkYXRhLmxlbmd0aCAtIDFdKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBtaW5vcmdyaWRsaW5lcy5wdXNoKGV4dGVuZEZsYXQoY29uc3RydWN0VmFsdWVHcmlkbGluZSh2KSwge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogYXhpcy5taW5vcmdyaWRjb2xvcixcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGF4aXMubWlub3Jncmlkd2lkdGhcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihheGlzLnN0YXJ0bGluZSkge1xuICAgICAgICAgICAgYm91bmRhcnlsaW5lcy5wdXNoKGV4dGVuZEZsYXQoY29uc3RydWN0VmFsdWVHcmlkbGluZShkYXRhWzBdKSwge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBheGlzLnN0YXJ0bGluZWNvbG9yLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBheGlzLnN0YXJ0bGluZXdpZHRoXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihheGlzLmVuZGxpbmUpIHtcbiAgICAgICAgICAgIGJvdW5kYXJ5bGluZXMucHVzaChleHRlbmRGbGF0KGNvbnN0cnVjdFZhbHVlR3JpZGxpbmUoZGF0YVtkYXRhLmxlbmd0aCAtIDFdKSwge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBheGlzLmVuZGxpbmVjb2xvcixcbiAgICAgICAgICAgICAgICB3aWR0aDogYXhpcy5lbmRsaW5ld2lkdGhcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsY0xhYmVscyh0cmFjZSwgYXhpcykge1xuICAgIHZhciBpLCB0b2JqLCBwcmVmaXgsIHN1ZmZpeCwgZ3JpZGxpbmU7XG5cbiAgICB2YXIgbGFiZWxzID0gYXhpcy5fbGFiZWxzID0gW107XG4gICAgdmFyIGdyaWRsaW5lcyA9IGF4aXMuX2dyaWRsaW5lcztcblxuICAgIGZvcihpID0gMDsgaSA8IGdyaWRsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBncmlkbGluZSA9IGdyaWRsaW5lc1tpXTtcblxuICAgICAgICBpZihbJ3N0YXJ0JywgJ2JvdGgnXS5pbmRleE9mKGF4aXMuc2hvd3RpY2tsYWJlbHMpICE9PSAtMSkge1xuICAgICAgICAgICAgdG9iaiA9IEF4ZXMudGlja1RleHQoYXhpcywgZ3JpZGxpbmUudmFsdWUpO1xuXG4gICAgICAgICAgICBleHRlbmRGbGF0KHRvYmosIHtcbiAgICAgICAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBzdWZmaXg6IHN1ZmZpeCxcbiAgICAgICAgICAgICAgICBlbmRBbmNob3I6IHRydWUsXG4gICAgICAgICAgICAgICAgeHk6IGdyaWRsaW5lLnh5KDApLFxuICAgICAgICAgICAgICAgIGR4eTogZ3JpZGxpbmUuZHh5KDAsIDApLFxuICAgICAgICAgICAgICAgIGF4aXM6IGdyaWRsaW5lLmF4aXMsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiBncmlkbGluZS5jcm9zc0F4aXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGZvbnQ6IGdyaWRsaW5lLmF4aXMudGlja2ZvbnQsXG4gICAgICAgICAgICAgICAgaXNGaXJzdDogaSA9PT0gMCxcbiAgICAgICAgICAgICAgICBpc0xhc3Q6IGkgPT09IGdyaWRsaW5lcy5sZW5ndGggLSAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGFiZWxzLnB1c2godG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICBpZihbJ2VuZCcsICdib3RoJ10uaW5kZXhPZihheGlzLnNob3d0aWNrbGFiZWxzKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRvYmogPSBBeGVzLnRpY2tUZXh0KGF4aXMsIGdyaWRsaW5lLnZhbHVlKTtcblxuICAgICAgICAgICAgZXh0ZW5kRmxhdCh0b2JqLCB7XG4gICAgICAgICAgICAgICAgZW5kQW5jaG9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB4eTogZ3JpZGxpbmUueHkoZ3JpZGxpbmUuY3Jvc3NMZW5ndGggLSAxKSxcbiAgICAgICAgICAgICAgICBkeHk6IGdyaWRsaW5lLmR4eShncmlkbGluZS5jcm9zc0xlbmd0aCAtIDIsIDEpLFxuICAgICAgICAgICAgICAgIGF4aXM6IGdyaWRsaW5lLmF4aXMsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiBncmlkbGluZS5jcm9zc0F4aXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGZvbnQ6IGdyaWRsaW5lLmF4aXMudGlja2ZvbnQsXG4gICAgICAgICAgICAgICAgaXNGaXJzdDogaSA9PT0gMCxcbiAgICAgICAgICAgICAgICBpc0xhc3Q6IGkgPT09IGdyaWRsaW5lcy5sZW5ndGggLSAxXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGFiZWxzLnB1c2godG9iaik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogQ29tcHV0ZSB0aGUgdGFuZ2VudCB2ZWN0b3IgYWNjb3JkaW5nIHRvIGNhdG11bGwtcm9tIGN1YmljIHNwbGluZXMgKGNlbnRyaXBldGFsLFxuICogSSB0aGluaykuIFRoYXQgZGlmZmVycyBmcm9tIHRoZSBjb250cm9sIHBvaW50IGluIHR3byB3YXlzOlxuICogICAxLiBJdCBpcyBhIHZlY3Rvciwgbm90IGEgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIHBvaW50XG4gKiAgIDIuIHRoZSB2ZWN0b3IgaXMgbG9uZ2VyIHRoYW4gdGhlIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHAxIGJ5IGEgZmFjdG9yIG9mIDNcbiAqXG4gKiBDbG9zZSB0byB0aGUgYm91bmRhcmllcywgd2UnbGwgdXNlIHRoZXNlIGFzICpxdWFkcmF0aWMgY29udHJvbCBwb2ludHMsIHNvIHRoYXRcbiAqIHRvIG1ha2UgYSBuaWNlIGdyaWQsIHdlJ2xsIG5lZWQgdG8gZGl2aWRlIHRoZSB0YW5nZW50IGJ5IDIgaW5zdGVhZCBvZiAzLiAoVGhlXG4gKiBtYXRoIHdvcmtzIG91dCB0aGlzIHdheSBpZiB5b3Ugd29yayB0aHJvdWdoIHRoZSBiZXppZXIgZGVyaXZhdGl2ZXMpXG4gKi9cbnZhciBDYXRtdWxsUm9tRXhwID0gMC41O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYWtlQ29udHJvbFBvaW50cyhwMCwgcDEsIHAyLCBzbW9vdGhuZXNzKSB7XG4gICAgdmFyIGQxeCA9IHAwWzBdIC0gcDFbMF07XG4gICAgdmFyIGQxeSA9IHAwWzFdIC0gcDFbMV07XG4gICAgdmFyIGQyeCA9IHAyWzBdIC0gcDFbMF07XG4gICAgdmFyIGQyeSA9IHAyWzFdIC0gcDFbMV07XG4gICAgdmFyIGQxYSA9IE1hdGgucG93KGQxeCAqIGQxeCArIGQxeSAqIGQxeSwgQ2F0bXVsbFJvbUV4cCAvIDIpO1xuICAgIHZhciBkMmEgPSBNYXRoLnBvdyhkMnggKiBkMnggKyBkMnkgKiBkMnksIENhdG11bGxSb21FeHAgLyAyKTtcbiAgICB2YXIgbnVteCA9IChkMmEgKiBkMmEgKiBkMXggLSBkMWEgKiBkMWEgKiBkMngpICogc21vb3RobmVzcztcbiAgICB2YXIgbnVteSA9IChkMmEgKiBkMmEgKiBkMXkgLSBkMWEgKiBkMWEgKiBkMnkpICogc21vb3RobmVzcztcbiAgICB2YXIgZGVub20xID0gZDJhICogKGQxYSArIGQyYSkgKiAzO1xuICAgIHZhciBkZW5vbTIgPSBkMWEgKiAoZDFhICsgZDJhKSAqIDM7XG5cbiAgICByZXR1cm4gW1tcbiAgICAgICAgcDFbMF0gKyAoZGVub20xICYmIG51bXggLyBkZW5vbTEpLFxuICAgICAgICBwMVsxXSArIChkZW5vbTEgJiYgbnVteSAvIGRlbm9tMSlcbiAgICBdLCBbXG4gICAgICAgIHAxWzBdIC0gKGRlbm9tMiAmJiBudW14IC8gZGVub20yKSxcbiAgICAgICAgcDFbMV0gLSAoZGVub20yICYmIG51bXkgLyBkZW5vbTIpXG4gICAgXV07XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheU9yVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmlzQXJyYXlPclR5cGVkQXJyYXk7XG5cbi8qXG4gKiBDb25zdHJ1Y3QgYSAyRCBhcnJheSBvZiBjaGVhdGVyIHZhbHVlcyBnaXZlbiBhLCBiLCBhbmQgYSBzbG9wZS5cbiAqIElmXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYSwgYiwgY2hlYXRlcnNsb3BlKSB7XG4gICAgdmFyIGksIGosIGFzY2FsLCBic2NhbCwgYXZhbCwgYnZhbDtcbiAgICB2YXIgZGF0YSA9IFtdO1xuXG4gICAgdmFyIG5hID0gaXNBcnJheU9yVHlwZWRBcnJheShhKSA/IGEubGVuZ3RoIDogYTtcbiAgICB2YXIgbmIgPSBpc0FycmF5T3JUeXBlZEFycmF5KGIpID8gYi5sZW5ndGggOiBiO1xuICAgIHZhciBhZGF0YSA9IGlzQXJyYXlPclR5cGVkQXJyYXkoYSkgPyBhIDogbnVsbDtcbiAgICB2YXIgYmRhdGEgPSBpc0FycmF5T3JUeXBlZEFycmF5KGIpID8gYiA6IG51bGw7XG5cbiAgICAvLyBJZiB3ZSdyZSB1c2luZyBkYXRhLCBzY2FsZSBpdCBzbyB0aGF0IGZvciBkYXRhIHRoYXQncyBqdXN0IGJhcmVseVxuICAgIC8vIG5vdCBldmVubHkgc3BhY2VkLCB0aGUgc3dpdGNoIHRvIHZhbHVlLWJhc2VkIGluZGV4aW5nIGlzIGNvbnRpbnVvdXMuXG4gICAgLy8gVGhpcyBtZWFucyBldmVubHkgc3BhY2VkIGRhdGEgc2hvdWxkIGxvb2sgdGhlIHNhbWUgd2hldGhlciB2YWx1ZVxuICAgIC8vIG9yIGluZGV4IGNoZWF0ZXJ0eXBlLlxuICAgIGlmKGFkYXRhKSB7XG4gICAgICAgIGFzY2FsID0gKGFkYXRhLmxlbmd0aCAtIDEpIC8gKGFkYXRhW2FkYXRhLmxlbmd0aCAtIDFdIC0gYWRhdGFbMF0pIC8gKG5hIC0gMSk7XG4gICAgfVxuXG4gICAgaWYoYmRhdGEpIHtcbiAgICAgICAgYnNjYWwgPSAoYmRhdGEubGVuZ3RoIC0gMSkgLyAoYmRhdGFbYmRhdGEubGVuZ3RoIC0gMV0gLSBiZGF0YVswXSkgLyAobmIgLSAxKTtcbiAgICB9XG5cbiAgICB2YXIgeHZhbDtcbiAgICB2YXIgeG1pbiA9IEluZmluaXR5O1xuICAgIHZhciB4bWF4ID0gLUluZmluaXR5O1xuICAgIGZvcihqID0gMDsgaiA8IG5iOyBqKyspIHtcbiAgICAgICAgZGF0YVtqXSA9IFtdO1xuICAgICAgICBidmFsID0gYmRhdGEgPyAoYmRhdGFbal0gLSBiZGF0YVswXSkgKiBic2NhbCA6IGogLyAobmIgLSAxKTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbmE7IGkrKykge1xuICAgICAgICAgICAgYXZhbCA9IGFkYXRhID8gKGFkYXRhW2ldIC0gYWRhdGFbMF0pICogYXNjYWwgOiBpIC8gKG5hIC0gMSk7XG4gICAgICAgICAgICB4dmFsID0gYXZhbCAtIGJ2YWwgKiBjaGVhdGVyc2xvcGU7XG4gICAgICAgICAgICB4bWluID0gTWF0aC5taW4oeHZhbCwgeG1pbik7XG4gICAgICAgICAgICB4bWF4ID0gTWF0aC5tYXgoeHZhbCwgeG1heCk7XG4gICAgICAgICAgICBkYXRhW2pdW2ldID0geHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE5vcm1hbGl6ZSBjaGVhdGVyIHZhbHVlcyB0byB0aGUgMC0xIHJhbmdlLiBUaGlzIGNvbWVzIGludG8gcGxheSB3aGVuIHlvdSBoYXZlXG4gICAgLy8gbXVsdGlwbGUgY2hlYXRlciBwbG90cy4gQWZ0ZXIgY2FyZWZ1bCBjb25zaWRlcmF0aW9uLCBpdCBzZWVtcyBiZXR0ZXIgaWYgY2hlYXRlclxuICAgIC8vIHZhbHVlcyBhcmUgbm9ybWFsaXplZCB0byBhIGNvbnNpc3RlbnQgcmFuZ2UuIE90aGVyd2lzZSBvbmUgY2hlYXRlciBhZmZlY3RzIHRoZVxuICAgIC8vIGxheW91dCBvZiBvdGhlciBjaGVhdGVycyBvbiB0aGUgc2FtZSBheGlzLlxuICAgIHZhciBzbG9wZSA9IDEuMCAvICh4bWF4IC0geG1pbik7XG4gICAgdmFyIG9mZnNldCA9IC14bWluICogc2xvcGU7XG4gICAgZm9yKGogPSAwOyBqIDwgbmI7IGorKykge1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBuYTsgaSsrKSB7XG4gICAgICAgICAgICBkYXRhW2pdW2ldID0gc2xvcGUgKiBkYXRhW2pdW2ldICsgb2Zmc2V0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWFrZUNvbnRyb2xQb2ludHMgPSByZXF1aXJlKCcuL2NhdG11bGxfcm9tJyk7XG52YXIgZW5zdXJlQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5lbnN1cmVBcnJheTtcblxuLypcbiAqIFR1cm5zIGEgY29hcnNlIGdyaWQgaW50byBhIGZpbmUgZ3JpZCB3aXRoIGNvbnRyb2wgcG9pbnRzLlxuICpcbiAqIEhlcmUncyBhbiBBU0NJSSByZXByZXNlbnRhdGlvbjpcbiAqXG4gKiAgICAgICBvIC0tLS0tIG8gLS0tLS0gbyAtLS0tLSBvXG4gKiAgICAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICAgICBvIC0tLS0tIG8gLS0tLS0gbyAtLS0tLSBvXG4gKiAgICAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICBeICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICB8ICBvIC0tLS0tIG8gLS0tLS0gbyAtLS0tLSBvXG4gKiAgYiB8ICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICB8ICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICB8ICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICAgICBvIC0tLS0tIG8gLS0tLS0gbyAtLS0tLSBvXG4gKiAgICAgICAgIC0tLS0tLT5cbiAqICAgICAgICAgICBhXG4gKlxuICogRmlyc3Qgb2YgYWxsLCBub3RlIHRoYXQgd2Ugd2FudCB0byBkbyB0aGlzIGluICpjYXJ0ZXNpYW4qIHNwYWNlLiBUaGlzIG1lYW5zXG4gKiB3ZSBtaWdodCBydW4gaW50byBwcm9ibGVtcyB3aGVuIHRoZXJlIGFyZSBleHRyZW1lIGRpZmZlcmVuY2VzIGluIHgveSBzY2FsaW5nLFxuICogYnV0IHRoZSBhbHRlcm5hdGl2ZSBpcyB0aGF0IHRoZSB0b3BvbG9neSBvZiB0aGUgY29udG91cnMgbWlnaHQgYWN0dWFsbHkgYmVcbiAqIHZpZXctZGVwZW5kZW50LCB3aGljaCBzZWVtcyB3b3JzZS4gQXMgYSBmYWxsYmFjaywgdGhlIG9ubHkgcGFyYW1ldGVyIHRoYXRcbiAqIGFjdHVhbGx5IGFmZmVjdHMgdGhlIHJlc3VsdCBpcyB0aGUgKmFzcGVjdCByYXRpbyosIHNvIHRoYXQgd2UgY2FuIGF0IGxlYXN0XG4gKiBpbXByb3ZlIHRoZSBzaXR1YXRpb24gYSBiaXQgd2l0aG91dCBnb2luZyBhbGwgdGhlIHdheSB0byBzY3JlZW4gY29vcmRpbmF0ZXMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBmbGF0dGVucyB0aGUgcG9pbnRzICsgdGFuZ2VudHMgIGludG8gYSBzbGlnaHRseSBkZW5zZXIgZ3JpZCBvZlxuICogKmNvbnRyb2wgcG9pbnRzKi4gVGhlIHJlc3VsdGluZyBncmlkIGxvb2tzIGxpa2UgdGhpczpcbiAqXG4gKiAgICAgICA5ICstLW8tby0tKyAtby1vLS0rLS1vLW8tLStcbiAqICAgICAgIDggbyAgbyBvICBvICBvIG8gIG8gIG8gbyAgb1xuICogICAgICAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gKiAgICAgICA3IG8gIG8gbyAgbyAgbyBvICBvICBvIG8gIG9cbiAqICAgICAgIDYgKy0tby1vLS0rIC1vLW8tLSstLW8tby0tK1xuICogICAgICAgNSBvICBvIG8gIG8gIG8gbyAgbyAgbyBvICBvXG4gKiAgICAgICAgIHwgICAgICAgfCAgICAgICB8ICAgICAgIHxcbiAqICAgIF4gIDQgbyAgbyBvICBvICBvIG8gIG8gIG8gbyAgb1xuICogICAgfCAgMyArLS1vLW8tLSsgLW8tby0tKy0tby1vLS0rXG4gKiAgYiB8ICAyIG8gIG8gbyAgbyAgbyBvICBvICBvIG8gIG9cbiAqICAgIHwgICAgfCAgICAgICB8ICAgICAgIHwgICAgICAgfFxuICogICAgfCAgMSBvICBvIG8gIG8gIG8gbyAgbyAgbyBvICBvXG4gKiAgICAgICAwICstLW8tby0tKyAtby1vLS0rLS1vLW8tLStcbiAqICAgICAgICAgMCAgMSAyICAzICA0IDUgIDYgIDcgOCAgOVxuICogICAgICAgICAtLS0tLS0+XG4gKiAgICAgICAgICAgYVxuICpcbiAqIHdoZXJlIGBvYHMgcmVwcmVzZW50IG5ld2x5LWNvbXB1dGVkIGNvbnRyb2wgcG9pbnRzLiB0aGUgcmVzdWx0aW5nIGRpbWVuc2lvbiBpc1xuICpcbiAqICAgICAobSAtIDEpICogMyArIDFcbiAqICAgPSAzICogbSAtIDJcbiAqXG4gKiBXZSBjb3VsZCBzaW1wbHkgc3RvcmUgdGhlIHRhbmdlbnRzIHNlcGFyYXRlbHksIGJ1dCB0aGF0J3MgYSBuaWdodG1hcmUgdG8gb3JnYW5pemVcbiAqIGluIHR3byBkaW1lbnNpb25zIHNpbmNlIHdlJ2xsIGJlIHNsaWNpbmcgZ3JpZCBsaW5lcyBpbiBib3RoIGRpcmVjdGlvbnMgYW5kIHNpbmNlXG4gKiB0aGF0IGJhc2ljYWxseSByZXF1aXJlcyB2ZXJ5IG5lYXJseSBqdXN0IGFzIG11Y2ggc3RvcmFnZSBhcyBqdXN0IHN0b3JpbmcgdGhlIGRlbnNlXG4gKiBncmlkLlxuICpcbiAqIFdvdyFcbiAqL1xuXG5cbi8qXG4gKiBDYXRtdWxsLXJvbSBpcyBiaWFzZWQgYXQgdGhlIGJvdW5kYXJpZXMgdG93YXJkIHRoZSBpbnRlcmlvciBhbmQgd2UgYWN0dWFsbHlcbiAqIGNhbid0IHVzZSBjYXRtdWxsLXJvbSB0byBjb21wdXRlIHRoZSBjb250cm9sIHBvaW50IGNsb3Nlc3QgdG8gKGJ1dCBpbnNpZGUpXG4gKiB0aGUgYm91bmRhcnkuXG4gKlxuICogQSBub3RlIG9uIHBsb3RseSdzIHNwbGluZSBpbnRlcnBvbGF0aW9uLiBJdCB1c2VzIHRoZSBjYXRtdWxsIHJvbSBjb250cm9sIHBvaW50XG4gKiBjbG9zZXN0IHRvIHRoZSBib3VuZGFyeSAqYXMqIGEgcXVhZHJhdGljIGNvbnRyb2wgcG9pbnQuIFRoaXMgc2VlbXMgaW5jb3JyZWN0LFxuICogc28gSSd2ZSBlbGVjdGVkIG5vdCB0byBmb2xsb3cgdGhhdC4gR2l2ZW4gY29udHJvbCBwb2ludHMgMCBhbmQgMSwgcmVndWxhciBwbG90bHlcbiAqIHNwbGluZXMgZ2l2ZSAqZXF1aXZhbGVudCogY3ViaWMgY29udHJvbCBwb2ludHM6XG4gKlxuICogSW5wdXQ6XG4gKlxuICogICBib3VuZGFyeVxuICogICAgIHwgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICBwMCAgICAgICAgICAgcDIgICAgICBwMyAgICAtLT4gaW50ZXJpb3JcbiAqICAgICAwLjAgICAgICAgICAgMC42NjcgICAxLjBcbiAqICAgICB8ICAgICAgICAgICAgICAgICAgICB8XG4gKlxuICogQ3ViaWMtZXF1aXZhbGVudCBvZiB3aGF0IHBsb3RseSBzcGxpbmVzIGRyYXc6OlxuICpcbiAqICAgYm91bmRhcnlcbiAqICAgICB8ICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgcDAgICBwMSAgICAgIHAyICAgICAgcDMgICAgLS0+IGludGVyaW9yXG4gKiAgICAgMC4wICAwLjQ0NDQgIDAuODg4OCAgMS4wXG4gKiAgICAgfCAgICAgICAgICAgICAgICAgICAgfFxuICpcbiAqIFdoYXQgdGhpcyBmdW5jdGlvbiBmaWxscyBpbjpcbiAqXG4gKiAgIGJvdW5kYXJ5XG4gKiAgICAgfCAgICAgICAgICAgICAgICAgICAgfFxuICogICAgIHAwICAgIHAxICAgICBwMiAgICAgIHAzICAgIC0tPiBpbnRlcmlvclxuICogICAgIDAuMCAgIDAuMzMzICAwLjY2NyAgIDEuMFxuICogICAgIHwgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKiBQYXJhbWV0ZXJzOlxuICogICBwMDogYm91bmRhcnkgcG9pbnRcbiAqICAgcDI6IGNhdG11bGwgcm9tIHBvaW50IGJhc2VkIG9uIGNvbXB1dGF0aW9uIGF0IHAzXG4gKiAgIHAzOiBmaXJzdCBncmlkIHBvaW50XG4gKlxuICogT2YgY291cnNlIGl0IHdvcmtzIHdoaWNoZXZlciB3YXkgaXQncyBvcmllbnRlZDsgeW91IGp1c3QgbmVlZCB0byBpbnRlcnByZXQgdGhlXG4gKiBpbnB1dC9vdXRwdXQgYWNjb3JkaW5nbHkuXG4gKi9cbmZ1bmN0aW9uIGluZmVyQ3ViaWNDb250cm9sUG9pbnQocDAsIHAyLCBwMykge1xuICAgIC8vIEV4dGVuZCBwMSBhd2F5IGZyb20gcDAgYnkgNTAlLiBUaGlzIGlzIHRoZSBlcXVpdmFsZW50IHF1YWRyYXRpYyBwb2ludCB0aGF0XG4gICAgLy8gd291bGQgZ2l2ZSB0aGUgc2FtZSBzbG9wZSBhcyBjYXRtdWxsIHJvbSBhdCBwMC5cbiAgICB2YXIgcDJlMCA9IC0wLjUgKiBwM1swXSArIDEuNSAqIHAyWzBdO1xuICAgIHZhciBwMmUxID0gLTAuNSAqIHAzWzFdICsgMS41ICogcDJbMV07XG5cbiAgICByZXR1cm4gW1xuICAgICAgICAoMiAqIHAyZTAgKyBwMFswXSkgLyAzLFxuICAgICAgICAoMiAqIHAyZTEgKyBwMFsxXSkgLyAzLFxuICAgIF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcHV0ZUNvbnRyb2xQb2ludHMoeGUsIHllLCB4LCB5LCBhc21vb3RoaW5nLCBic21vb3RoaW5nKSB7XG4gICAgdmFyIGksIGosIGllLCBqZSwgeGVqLCB5ZWosIHhqLCB5aiwgY3AsIHAxO1xuICAgIC8vIEF0IHRoaXMgcG9pbnQsIHdlIGtub3cgdGhlc2UgZGltZW5zaW9ucyBhcmUgY29ycmVjdCBhbmQgcmVwcmVzZW50YXRpdmUgb2ZcbiAgICAvLyB0aGUgd2hvbGUgMkQgYXJyYXlzOlxuICAgIHZhciBuYSA9IHhbMF0ubGVuZ3RoO1xuICAgIHZhciBuYiA9IHgubGVuZ3RoO1xuXG4gICAgLy8gKG4pdW1iZXIgb2YgKGUpeHBhbmRlZCBwb2ludHM6XG4gICAgdmFyIG5lYSA9IGFzbW9vdGhpbmcgPyAzICogbmEgLSAyIDogbmE7XG4gICAgdmFyIG5lYiA9IGJzbW9vdGhpbmcgPyAzICogbmIgLSAyIDogbmI7XG5cbiAgICB4ZSA9IGVuc3VyZUFycmF5KHhlLCBuZWIpO1xuICAgIHllID0gZW5zdXJlQXJyYXkoeWUsIG5lYik7XG5cbiAgICBmb3IoaWUgPSAwOyBpZSA8IG5lYjsgaWUrKykge1xuICAgICAgICB4ZVtpZV0gPSBlbnN1cmVBcnJheSh4ZVtpZV0sIG5lYSk7XG4gICAgICAgIHllW2llXSA9IGVuc3VyZUFycmF5KHllW2llXSwgbmVhKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGxvb3AgZmlsbHMgaW4gdGhlIFgnZCBwb2ludHM6XG4gICAgLy9cbiAgICAvLyAgICAuICAgICAgIC4gICAgICAgLiAgICAgICAuXG4gICAgLy8gICAgLiAgICAgICAuICAgICAgIC4gICAgICAgLlxuICAgIC8vICAgIHwgICAgICAgfCAgICAgICB8ICAgICAgIHxcbiAgICAvLyAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gICAgLy8gICAgWCAtLS0tLSBYIC0tLS0tIFggLS0tLS0gWFxuICAgIC8vICAgIHwgICAgICAgfCAgICAgICB8ICAgICAgIHxcbiAgICAvLyAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gICAgLy8gICAgfCAgICAgICB8ICAgICAgIHwgICAgICAgfFxuICAgIC8vICAgIFggLS0tLS0gWCAtLS0tLSBYIC0tLS0tIFhcbiAgICAvL1xuICAgIC8vXG4gICAgLy8gaWUgPSAoaSkgKGUpeHBhbmRlZDpcbiAgICBmb3IoaiA9IDAsIGplID0gMDsgaiA8IG5iOyBqKyssIGplICs9IGJzbW9vdGhpbmcgPyAzIDogMSkge1xuICAgICAgICB4ZWogPSB4ZVtqZV07XG4gICAgICAgIHllaiA9IHllW2plXTtcbiAgICAgICAgeGogPSB4W2pdO1xuICAgICAgICB5aiA9IHlbal07XG5cbiAgICAgICAgLy8gamUgPSAoaikgKGUpeHBhbmRlZDpcbiAgICAgICAgZm9yKGkgPSAwLCBpZSA9IDA7IGkgPCBuYTsgaSsrLCBpZSArPSBhc21vb3RoaW5nID8gMyA6IDEpIHtcbiAgICAgICAgICAgIHhlaltpZV0gPSB4altpXTtcbiAgICAgICAgICAgIHllaltpZV0gPSB5altpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKGFzbW9vdGhpbmcpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhLXNtb290aGluZywgdGhpcyBsb29wIGZpbGxzIGluIHRoZSBYJ2QgcG9pbnRzIHdpdGggY2F0bXVsbC1yb21cbiAgICAgICAgLy8gY29udHJvbCBwb2ludHMgY29tcHV0ZWQgYWxvbmcgdGhlIGEtYXhpczpcbiAgICAgICAgLy8gICAgIC4gICAgICAgLiAgICAgICAuICAgICAgIC5cbiAgICAgICAgLy8gICAgIC4gICAgICAgLiAgICAgICAuICAgICAgIC5cbiAgICAgICAgLy8gICAgIHwgICAgICAgfCAgICAgICB8ICAgICAgIHxcbiAgICAgICAgLy8gICAgIHwgICAgICAgfCAgICAgICB8ICAgICAgIHxcbiAgICAgICAgLy8gICAgIG8gLVktWC0gbyAtWC1YLSBvIC1YLVktIG9cbiAgICAgICAgLy8gICAgIHwgICAgICAgfCAgICAgICB8ICAgICAgIHxcbiAgICAgICAgLy8gICAgIHwgICAgICAgfCAgICAgICB8ICAgICAgIHxcbiAgICAgICAgLy8gICAgIHwgICAgICAgfCAgICAgICB8ICAgICAgIHxcbiAgICAgICAgLy8gICAgIG8gLVktWC0gbyAtWC1YLSBvIC1YLVktIG9cbiAgICAgICAgLy9cbiAgICAgICAgLy8gaTogIDAgICAgICAgMSAgICAgICAyICAgICAgIDNcbiAgICAgICAgLy8gaWU6IDAgIDEgMyAgMyAgNCA1ICA2ICA3IDggIDlcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICAgIC0tLS0tLT5cbiAgICAgICAgLy8gICAgICAgICAgICAgYVxuICAgICAgICAvL1xuICAgICAgICBmb3IoaiA9IDAsIGplID0gMDsgaiA8IG5iOyBqKyssIGplICs9IGJzbW9vdGhpbmcgPyAzIDogMSkge1xuICAgICAgICAgICAgLy8gRmlsbCBpbiB0aGUgcG9pbnRzIG1hcmtlZCBYIGZvciB0aGlzIGEtcm93OlxuICAgICAgICAgICAgZm9yKGkgPSAxLCBpZSA9IDM7IGkgPCBuYSAtIDE7IGkrKywgaWUgKz0gMykge1xuICAgICAgICAgICAgICAgIGNwID0gbWFrZUNvbnRyb2xQb2ludHMoXG4gICAgICAgICAgICAgICAgICAgIFt4W2pdW2kgLSAxXSwgeVtqXVtpIC0gMV1dLFxuICAgICAgICAgICAgICAgICAgICBbeFtqXVtpIF0sIHlbal1baV1dLFxuICAgICAgICAgICAgICAgICAgICBbeFtqXVtpICsgMV0sIHlbal1baSArIDFdXSxcbiAgICAgICAgICAgICAgICAgICAgYXNtb290aGluZ1xuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB4ZVtqZV1baWUgLSAxXSA9IGNwWzBdWzBdO1xuICAgICAgICAgICAgICAgIHllW2plXVtpZSAtIDFdID0gY3BbMF1bMV07XG4gICAgICAgICAgICAgICAgeGVbamVdW2llICsgMV0gPSBjcFsxXVswXTtcbiAgICAgICAgICAgICAgICB5ZVtqZV1baWUgKyAxXSA9IGNwWzFdWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUaGUgdmVyeSBmaXJzdCBjdWJpYyBpbnRlcnBvbGF0aW9uIHBvaW50ICh0byB0aGUgbGVmdCBmb3IgaSA9IDEgYWJvdmUpIGlzXG4gICAgICAgICAgICAvLyB1c2VkIGFzIGEgKnF1YWRyYXRpYyogaW50ZXJwb2xhdGlvbiBwb2ludCBieSB0aGUgc3BsaW5lIGRyYXdpbmcgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIHdoaWNoIGlzbid0IHJlYWxseSBjb3JyZWN0LiBCdXQgZm9yIHRoZSBzYWtlIG9mIGNvbnNpc3RlbmN5LCB3ZSdsbCB1c2UgaXRcbiAgICAgICAgICAgIC8vIGFzIHN1Y2guIFNpbmNlIHdlJ3JlIHVzaW5nIGN1YmljIHNwbGluZXMsIHRoYXQgbWVhbnMgd2UgbmVlZCB0byBzaG9ydGVuIHRoZVxuICAgICAgICAgICAgLy8gdGFuZ2VudCBieSAxLzMgYW5kIGFsc28gY29uc3RydWN0IGEgbmV3IGN1YmljIHNwbGluZSBjb250cm9sIHBvaW50IDEvMyBmcm9tXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgdG8gdGhlIGkgPSAwIHBvaW50LlxuICAgICAgICAgICAgcDEgPSBpbmZlckN1YmljQ29udHJvbFBvaW50KFxuICAgICAgICAgICAgICAgIFt4ZVtqZV1bMF0sIHllW2plXVswXV0sXG4gICAgICAgICAgICAgICAgW3hlW2plXVsyXSwgeWVbamVdWzJdXSxcbiAgICAgICAgICAgICAgICBbeGVbamVdWzNdLCB5ZVtqZV1bM11dXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgeGVbamVdWzFdID0gcDFbMF07XG4gICAgICAgICAgICB5ZVtqZV1bMV0gPSBwMVsxXTtcblxuICAgICAgICAgICAgLy8gRGl0dG8gbGFzdCBwb2ludHMsIHNhbnMgZXhwbGFuYXRpb246XG4gICAgICAgICAgICBwMSA9IGluZmVyQ3ViaWNDb250cm9sUG9pbnQoXG4gICAgICAgICAgICAgICAgW3hlW2plXVtuZWEgLSAxXSwgeWVbamVdW25lYSAtIDFdXSxcbiAgICAgICAgICAgICAgICBbeGVbamVdW25lYSAtIDNdLCB5ZVtqZV1bbmVhIC0gM11dLFxuICAgICAgICAgICAgICAgIFt4ZVtqZV1bbmVhIC0gNF0sIHllW2plXVtuZWEgLSA0XV1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB4ZVtqZV1bbmVhIC0gMl0gPSBwMVswXTtcbiAgICAgICAgICAgIHllW2plXVtuZWEgLSAyXSA9IHAxWzFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoYnNtb290aGluZykge1xuICAgICAgICAvLyBJZiB0aGVyZSdzIGEtc21vb3RoaW5nLCB0aGlzIGxvb3AgZmlsbHMgaW4gdGhlIFgnZCBwb2ludHMgd2l0aCBjYXRtdWxsLXJvbVxuICAgICAgICAvLyBjb250cm9sIHBvaW50cyBjb21wdXRlZCBhbG9uZyB0aGUgYi1heGlzOlxuICAgICAgICAvLyAgICAgLiAgICAgICAuICAgICAgIC4gICAgICAgLlxuICAgICAgICAvLyAgICAgWCAgWCBYICBYICBYIFggIFggIFggWCAgWFxuICAgICAgICAvLyAgICAgfCAgICAgICB8ICAgICAgIHwgICAgICAgfFxuICAgICAgICAvLyAgICAgWCAgWCBYICBYICBYIFggIFggIFggWCAgWFxuICAgICAgICAvLyAgICAgbyAtby1vLSBvIC1vLW8tIG8gLW8tby0gb1xuICAgICAgICAvLyAgICAgWCAgWCBYICBYICBYIFggIFggIFggWCAgWFxuICAgICAgICAvLyAgICAgfCAgICAgICB8ICAgICAgIHwgICAgICAgfFxuICAgICAgICAvLyAgICAgWSAgWSBZICBZICBZIFkgIFkgIFkgWSAgWVxuICAgICAgICAvLyAgICAgbyAtby1vLSBvIC1vLW8tIG8gLW8tby0gb1xuICAgICAgICAvL1xuICAgICAgICAvLyBpOiAgMCAgICAgICAxICAgICAgIDIgICAgICAgM1xuICAgICAgICAvLyBpZTogMCAgMSAzICAzICA0IDUgIDYgIDcgOCAgOVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgICAgLS0tLS0tPlxuICAgICAgICAvLyAgICAgICAgICAgICBhXG4gICAgICAgIC8vXG4gICAgICAgIGZvcihpZSA9IDA7IGllIDwgbmVhOyBpZSsrKSB7XG4gICAgICAgICAgICBmb3IoamUgPSAzOyBqZSA8IG5lYiAtIDM7IGplICs9IDMpIHtcbiAgICAgICAgICAgICAgICBjcCA9IG1ha2VDb250cm9sUG9pbnRzKFxuICAgICAgICAgICAgICAgICAgICBbeGVbamUgLSAzXVtpZV0sIHllW2plIC0gM11baWVdXSxcbiAgICAgICAgICAgICAgICAgICAgW3hlW2plXVtpZV0sIHllW2plXVtpZV1dLFxuICAgICAgICAgICAgICAgICAgICBbeGVbamUgKyAzXVtpZV0sIHllW2plICsgM11baWVdXSxcbiAgICAgICAgICAgICAgICAgICAgYnNtb290aGluZ1xuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB4ZVtqZSAtIDFdW2llXSA9IGNwWzBdWzBdO1xuICAgICAgICAgICAgICAgIHllW2plIC0gMV1baWVdID0gY3BbMF1bMV07XG4gICAgICAgICAgICAgICAgeGVbamUgKyAxXVtpZV0gPSBjcFsxXVswXTtcbiAgICAgICAgICAgICAgICB5ZVtqZSArIDFdW2llXSA9IGNwWzFdWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG8gdGhlIHNhbWUgYm91bmRhcnkgY29uZGl0aW9uIG1hZ2ljIGZvciB0aGVzZSBjb250cm9sIHBvaW50cyBtYXJrZWQgWSBhYm92ZTpcbiAgICAgICAgICAgIHAxID0gaW5mZXJDdWJpY0NvbnRyb2xQb2ludChcbiAgICAgICAgICAgICAgICBbeGVbMF1baWVdLCB5ZVswXVtpZV1dLFxuICAgICAgICAgICAgICAgIFt4ZVsyXVtpZV0sIHllWzJdW2llXV0sXG4gICAgICAgICAgICAgICAgW3hlWzNdW2llXSwgeWVbM11baWVdXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHhlWzFdW2llXSA9IHAxWzBdO1xuICAgICAgICAgICAgeWVbMV1baWVdID0gcDFbMV07XG5cbiAgICAgICAgICAgIHAxID0gaW5mZXJDdWJpY0NvbnRyb2xQb2ludChcbiAgICAgICAgICAgICAgICBbeGVbbmViIC0gMV1baWVdLCB5ZVtuZWIgLSAxXVtpZV1dLFxuICAgICAgICAgICAgICAgIFt4ZVtuZWIgLSAzXVtpZV0sIHllW25lYiAtIDNdW2llXV0sXG4gICAgICAgICAgICAgICAgW3hlW25lYiAtIDRdW2llXSwgeWVbbmViIC0gNF1baWVdXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHhlW25lYiAtIDJdW2llXSA9IHAxWzBdO1xuICAgICAgICAgICAgeWVbbmViIC0gMl1baWVdID0gcDFbMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihhc21vb3RoaW5nICYmIGJzbW9vdGhpbmcpIHtcbiAgICAgICAgLy8gRG8gb25lIG1vcmUgcGFzcywgdGhpcyB0aW1lIHJlY29tcHV0aW5nIGV4YWN0bHkgd2hhdCB3ZSBqdXN0IGNvbXB1dGVkLlxuICAgICAgICAvLyBJdCdzIG92ZXJkZXRlcm1pbmVkIHNpbmNlIHdlJ3JlIHBlZm9ybWluZyBjYXRtdWxsLXJvbSBpbiB0d28gZGlyZWN0aW9ucyxcbiAgICAgICAgLy8gc28gd2UnbGwganVzdCBhdmVyYWdlIHRoZSBvdmVyZGV0ZXJtaW5lZC4gVGhlc2UgcG9pbnRzIGRvbid0IGxpZSBhbG9uZyB0aGVcbiAgICAgICAgLy8gZ3JpZCBsaW5lcywgc28gbm90ZSB0aGF0IG9ubHkgZ3JpZCBsaW5lcyB3aWxsIGZvbGxvdyBub3JtYWwgcGxvdGx5IHNwbGluZVxuICAgICAgICAvLyBpbnRlcnBvbGF0aW9uLlxuICAgICAgICAvL1xuICAgICAgICAvLyBVbmxlc3Mgb2YgY291cnNlIHRoZXJlIHdhcyBubyBiIHNtb290aGluZy4gVGhlbiB0aGVzZSBpbnRlcm1lZGlhdGUgcG9pbnRzXG4gICAgICAgIC8vIGRvbid0IGFjdHVhbGx5IGV4aXN0IGFuZCB0aGlzIHNlY3Rpb24gaXMgYnlwYXNzZWQuXG4gICAgICAgIC8vICAgICAuICAgICAgIC4gICAgICAgLiAgICAgICAuXG4gICAgICAgIC8vICAgICBvICBYIFggIG8gIFggWCAgbyAgWCBYICBvXG4gICAgICAgIC8vICAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gICAgICAgIC8vICAgICBvICBYIFggIG8gIFggWCAgbyAgWCBYICBvXG4gICAgICAgIC8vICAgICBvIC1vLW8tIG8gLW8tby0gbyAtby1vLSBvXG4gICAgICAgIC8vICAgICBvICBYIFggIG8gIFggWCAgbyAgWCBYICBvXG4gICAgICAgIC8vICAgICB8ICAgICAgIHwgICAgICAgfCAgICAgICB8XG4gICAgICAgIC8vICAgICBvICBZIFkgIG8gIFkgWSAgbyAgWSBZICBvXG4gICAgICAgIC8vICAgICBvIC1vLW8tIG8gLW8tby0gbyAtby1vLSBvXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGk6ICAwICAgICAgIDEgICAgICAgMiAgICAgICAzXG4gICAgICAgIC8vIGllOiAwICAxIDMgIDMgIDQgNSAgNiAgNyA4ICA5XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgICAtLS0tLS0+XG4gICAgICAgIC8vICAgICAgICAgICAgIGFcbiAgICAgICAgLy9cbiAgICAgICAgZm9yKGplID0gMTsgamUgPCBuZWI7IGplICs9IChqZSArIDEpICUgMyA9PT0gMCA/IDIgOiAxKSB7XG4gICAgICAgICAgICAvLyBGaWxsIGluIHRoZSBwb2ludHMgbWFya2VkIFggZm9yIHRoaXMgYS1yb3c6XG4gICAgICAgICAgICBmb3IoaWUgPSAzOyBpZSA8IG5lYSAtIDM7IGllICs9IDMpIHtcbiAgICAgICAgICAgICAgICBjcCA9IG1ha2VDb250cm9sUG9pbnRzKFxuICAgICAgICAgICAgICAgICAgICBbeGVbamVdW2llIC0gM10sIHllW2plXVtpZSAtIDNdXSxcbiAgICAgICAgICAgICAgICAgICAgW3hlW2plXVtpZV0sIHllW2plXVtpZV1dLFxuICAgICAgICAgICAgICAgICAgICBbeGVbamVdW2llICsgM10sIHllW2plXVtpZSArIDNdXSxcbiAgICAgICAgICAgICAgICAgICAgYXNtb290aGluZ1xuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB4ZVtqZV1baWUgLSAxXSA9IDAuNSAqICh4ZVtqZV1baWUgLSAxXSArIGNwWzBdWzBdKTtcbiAgICAgICAgICAgICAgICB5ZVtqZV1baWUgLSAxXSA9IDAuNSAqICh5ZVtqZV1baWUgLSAxXSArIGNwWzBdWzFdKTtcbiAgICAgICAgICAgICAgICB4ZVtqZV1baWUgKyAxXSA9IDAuNSAqICh4ZVtqZV1baWUgKyAxXSArIGNwWzFdWzBdKTtcbiAgICAgICAgICAgICAgICB5ZVtqZV1baWUgKyAxXSA9IDAuNSAqICh5ZVtqZV1baWUgKyAxXSArIGNwWzFdWzFdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVGhpcyBjYXNlIGlzIGp1c3Qgc2xpZ2h0bHkgZGlmZmVyZW50LiBUaGUgY29tcHV0YXRpb24gaXMgdGhlIHNhbWUsXG4gICAgICAgICAgICAvLyBidXQgaGF2aW5nIGNvbXB1dGVkIHRoaXMsIHdlJ2xsIGF2ZXJhZ2Ugd2l0aCB0aGUgZXhpc3RpbmcgcmVzdWx0LlxuICAgICAgICAgICAgcDEgPSBpbmZlckN1YmljQ29udHJvbFBvaW50KFxuICAgICAgICAgICAgICAgIFt4ZVtqZV1bMF0sIHllW2plXVswXV0sXG4gICAgICAgICAgICAgICAgW3hlW2plXVsyXSwgeWVbamVdWzJdXSxcbiAgICAgICAgICAgICAgICBbeGVbamVdWzNdLCB5ZVtqZV1bM11dXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgeGVbamVdWzFdID0gMC41ICogKHhlW2plXVsxXSArIHAxWzBdKTtcbiAgICAgICAgICAgIHllW2plXVsxXSA9IDAuNSAqICh5ZVtqZV1bMV0gKyBwMVsxXSk7XG5cbiAgICAgICAgICAgIHAxID0gaW5mZXJDdWJpY0NvbnRyb2xQb2ludChcbiAgICAgICAgICAgICAgICBbeGVbamVdW25lYSAtIDFdLCB5ZVtqZV1bbmVhIC0gMV1dLFxuICAgICAgICAgICAgICAgIFt4ZVtqZV1bbmVhIC0gM10sIHllW2plXVtuZWEgLSAzXV0sXG4gICAgICAgICAgICAgICAgW3hlW2plXVtuZWEgLSA0XSwgeWVbamVdW25lYSAtIDRdXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHhlW2plXVtuZWEgLSAyXSA9IDAuNSAqICh4ZVtqZV1bbmVhIC0gMl0gKyBwMVswXSk7XG4gICAgICAgICAgICB5ZVtqZV1bbmVhIC0gMl0gPSAwLjUgKiAoeWVbamVdW25lYSAtIDJdICsgcDFbMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFt4ZSwgeWVdO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBSRUxBVElWRV9DVUxMX1RPTEVSQU5DRTogMWUtNlxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLypcbiAqIEV2YWx1YXRlcyB0aGUgZGVyaXZhdGl2ZSBvZiBhIGxpc3Qgb2YgY29udHJvbCBwb2ludCBhcnJheXMuIFRoYXQgaXMsIGl0IGV4cGVjdHMgYW4gYXJyYXkgb3IgYXJyYXlzXG4gKiB0aGF0IGFyZSBleHBhbmRlZCByZWxhdGl2ZSB0byB0aGUgcmF3IGRhdGEgdG8gaW5jbHVkZSB0aGUgYmljdWJpYyBjb250cm9sIHBvaW50cywgaWYgYXBwbGljYWJsZS4gSWZcbiAqIG9ubHkgbGluZWFyIGludGVycG9sYXRpb24gaXMgZGVzaXJlZCwgdGhlbiB0aGUgZGF0YSBwb2ludHMgY29ycmVzcG9uZCAxLTEgYWxvbmcgdGhhdCBheGlzIHRvIHRoZVxuICogZGF0YSBpdHNlbGYuIFNpbmNlIGl0J3MgY2F0bXVsbC1yb20gc3BsaW5lcyBpbiBlaXRoZXIgZGlyZWN0aW9uIG5vdGUgaW4gcGFydGljdWxhciB0aGF0IHRoZVxuICogZGVyaXZhdGl2ZXMgYXJlIGRpc2NvbnRpbnVvdXMgYWNyb3NzIGNlbGwgYm91bmRhcmllcy4gVGhhdCdzIHRoZSByZWFzb24geW91IG5lZWQgYm90aCB0aGUgKmNlbGwqXG4gKiBhbmQgdGhlICpwb2ludCB3aXRoaW4gdGhlIGNlbGwqLlxuICpcbiAqIEFsc28gbm90ZSB0aGF0IHRoZSBkaXNjb250aW51aXR5IG9mIHRoZSBkZXJpdmF0aXZlIGlzIGluIG1hZ25pdHVkZSBvbmx5LiBUaGUgZGlyZWN0aW9uICppcypcbiAqIGNvbnRpbnVvdXMgYWNyb3NzIGNlbGwgYm91bmRhcmllcy5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgdG8gY29tcHV0ZSB0aGUgZGVyaXZhdGl2ZSBvZiB0aGUgeGNvb3JkaW5hdGUgaGFsZndheSBiZXR3ZW4gdGhlIDcgYW5kIDh0aCBpLWdyaWRwb2ludHNcbiAqIGFuZCB0aGUgMTB0aCBhbmQgMTF0aCBqLWdyaWRwb2ludHMgZ2l2ZW4gYmljdWJpYyBzbW9vdGhpbmcgaW4gYm90aCBkaW1lbnNpb25zLCB5b3UnZCB3cml0ZTpcbiAqXG4gKiAgICAgdmFyIGRlcml2ID0gY3JlYXRlSURlcml2YXRpdmVFdmFsdWF0b3IoW3hdLCAxLCAxKTtcbiAqXG4gKiAgICAgdmFyIGR4ZGkgPSBkZXJpdihbXSwgNywgMTAsIDAuNSwgMC41KTtcbiAqICAgICAvLyA9PiBbMC4xMjM0NV1cbiAqXG4gKiBTaW5jZSB0aGVyZSdkIGJlIGEgYnVuY2ggb2YgZHVwbGljYXRlIGNvbXB1dGF0aW9uIHRvIGNvbXB1dGUgbXVsdGlwbGUgZGVyaXZhdGl2ZXMsIHlvdSBjYW4gZG91YmxlXG4gKiB0aGlzIHVwIGJ5IHByb3ZpZGluZyBtb3JlIGFycmF5czpcbiAqXG4gKiAgICAgdmFyIGRlcml2ID0gY3JlYXRlSURlcml2YXRpdmVFdmFsdWF0b3IoW3gsIHldLCAxLCAxKTtcbiAqXG4gKiAgICAgdmFyIGR4ZGkgPSBkZXJpdihbXSwgNywgMTAsIDAuNSwgMC41KTtcbiAqICAgICAvLyA9PiBbMC4xMjM0NSwgMC43ODkxMF1cbiAqXG4gKiBOQjogSXQncyBwcmVzdW1lZCB0aGF0IGF0IHRoaXMgcG9pbnQgYWxsIGRhdGEgaGFzIGJlZW4gc2FuaXRpemVkIGFuZCBpcyB2YWxpZCBudW1lcmljYWwgZGF0YSBhcnJheXNcbiAqIG9mIHRoZSBjb3JyZWN0IGRpbWVuc2lvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnJheXMsIGFzbW9vdGhpbmcsIGJzbW9vdGhpbmcpIHtcbiAgICBpZihhc21vb3RoaW5nICYmIGJzbW9vdGhpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG91dCwgaTAsIGowLCB1LCB2KSB7XG4gICAgICAgICAgICBpZighb3V0KSBvdXQgPSBbXTtcbiAgICAgICAgICAgIHZhciBmMCwgZjEsIGYyLCBmMywgYWssIGs7XG5cbiAgICAgICAgICAgIC8vIFNpbmNlIGl0J3MgYSBncmlkIG9mIGNvbnRyb2wgcG9pbnRzLCB0aGUgYWN0dWFsIGluZGljZXMgYXJlICogMzpcbiAgICAgICAgICAgIGkwICo9IDM7XG4gICAgICAgICAgICBqMCAqPSAzO1xuXG4gICAgICAgICAgICAvLyBQcmVjb21wdXRlIHNvbWUgbnVtYmVyczpcbiAgICAgICAgICAgIHZhciB1MiA9IHUgKiB1O1xuICAgICAgICAgICAgdmFyIG91ID0gMSAtIHU7XG4gICAgICAgICAgICB2YXIgb3UyID0gb3UgKiBvdTtcbiAgICAgICAgICAgIHZhciBvdXUyID0gb3UgKiB1ICogMjtcbiAgICAgICAgICAgIHZhciBhID0gLTMgKiBvdTI7XG4gICAgICAgICAgICB2YXIgYiA9IDMgKiAob3UyIC0gb3V1Mik7XG4gICAgICAgICAgICB2YXIgYyA9IDMgKiAob3V1MiAtIHUyKTtcbiAgICAgICAgICAgIHZhciBkID0gMyAqIHUyO1xuXG4gICAgICAgICAgICB2YXIgdjIgPSB2ICogdjtcbiAgICAgICAgICAgIHZhciB2MyA9IHYyICogdjtcbiAgICAgICAgICAgIHZhciBvdiA9IDEgLSB2O1xuICAgICAgICAgICAgdmFyIG92MiA9IG92ICogb3Y7XG4gICAgICAgICAgICB2YXIgb3YzID0gb3YyICogb3Y7XG5cbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IGFycmF5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGFrID0gYXJyYXlzW2tdO1xuICAgICAgICAgICAgICAgIC8vIENvbXB1dGUgdGhlIGRlcml2YXRpdmVzIGluIHRoZSB1LWRpcmVjdGlvbjpcbiAgICAgICAgICAgICAgICBmMCA9IGEgKiBha1tqMCBdW2kwXSArIGIgKiBha1tqMCBdW2kwICsgMV0gKyBjICogYWtbajAgXVtpMCArIDJdICsgZCAqIGFrW2owIF1baTAgKyAzXTtcbiAgICAgICAgICAgICAgICBmMSA9IGEgKiBha1tqMCArIDFdW2kwXSArIGIgKiBha1tqMCArIDFdW2kwICsgMV0gKyBjICogYWtbajAgKyAxXVtpMCArIDJdICsgZCAqIGFrW2owICsgMV1baTAgKyAzXTtcbiAgICAgICAgICAgICAgICBmMiA9IGEgKiBha1tqMCArIDJdW2kwXSArIGIgKiBha1tqMCArIDJdW2kwICsgMV0gKyBjICogYWtbajAgKyAyXVtpMCArIDJdICsgZCAqIGFrW2owICsgMl1baTAgKyAzXTtcbiAgICAgICAgICAgICAgICBmMyA9IGEgKiBha1tqMCArIDNdW2kwXSArIGIgKiBha1tqMCArIDNdW2kwICsgMV0gKyBjICogYWtbajAgKyAzXVtpMCArIDJdICsgZCAqIGFrW2owICsgM11baTAgKyAzXTtcblxuICAgICAgICAgICAgICAgIC8vIE5vdyBqdXN0IGludGVycG9sYXRlIGluIHRoZSB2LWRpcmVjdGlvbiBzaW5jZSBpdCdzIGFsbCBzZXBhcmFibGU6XG4gICAgICAgICAgICAgICAgb3V0W2tdID0gb3YzICogZjAgKyAzICogKG92MiAqIHYgKiBmMSArIG92ICogdjIgKiBmMikgKyB2MyAqIGYzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZihhc21vb3RoaW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBzbW9vdGggaW4gdGhlIGEtZGlyZWN0aW9uIGJ1dCBsaW5lYXIgaW4gdGhlIGItZGlyZWN0aW9uIGJ5IHBlcmZvcm1pbmcgZm91clxuICAgICAgICAvLyBsaW5lYXIgaW50ZXJwb2xhdGlvbnMgZm9sbG93ZWQgYnkgb25lIGN1YmljIGludGVycG9sYXRpb24gb2YgdGhlIHJlc3VsdFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCBpMCwgajAsIHUsIHYpIHtcbiAgICAgICAgICAgIGlmKCFvdXQpIG91dCA9IFtdO1xuICAgICAgICAgICAgdmFyIGYwLCBmMSwgaywgYWs7XG4gICAgICAgICAgICBpMCAqPSAzO1xuICAgICAgICAgICAgdmFyIHUyID0gdSAqIHU7XG4gICAgICAgICAgICB2YXIgb3UgPSAxIC0gdTtcbiAgICAgICAgICAgIHZhciBvdTIgPSBvdSAqIG91O1xuICAgICAgICAgICAgdmFyIG91dTIgPSBvdSAqIHUgKiAyO1xuICAgICAgICAgICAgdmFyIGEgPSAtMyAqIG91MjtcbiAgICAgICAgICAgIHZhciBiID0gMyAqIChvdTIgLSBvdXUyKTtcbiAgICAgICAgICAgIHZhciBjID0gMyAqIChvdXUyIC0gdTIpO1xuICAgICAgICAgICAgdmFyIGQgPSAzICogdTI7XG4gICAgICAgICAgICB2YXIgb3YgPSAxIC0gdjtcbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IGFycmF5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGFrID0gYXJyYXlzW2tdO1xuICAgICAgICAgICAgICAgIGYwID0gYSAqIGFrW2owIF1baTBdICsgYiAqIGFrW2owIF1baTAgKyAxXSArIGMgKiBha1tqMCBdW2kwICsgMl0gKyBkICogYWtbajAgXVtpMCArIDNdO1xuICAgICAgICAgICAgICAgIGYxID0gYSAqIGFrW2owICsgMV1baTBdICsgYiAqIGFrW2owICsgMV1baTAgKyAxXSArIGMgKiBha1tqMCArIDFdW2kwICsgMl0gKyBkICogYWtbajAgKyAxXVtpMCArIDNdO1xuXG4gICAgICAgICAgICAgICAgb3V0W2tdID0gb3YgKiBmMCArIHYgKiBmMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmKGJzbW9vdGhpbmcpIHtcbiAgICAgICAgLy8gU2FtZSBhcyB0aGUgYWJvdmUgY2FzZSwgZXhjZXB0IHJldmVyc2VkLiBJJ3ZlIGRpc2FibGVkIHRoZSBuby11bnVzZWQgdmFycyBydWxlXG4gICAgICAgIC8vIHNvIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBmdWxseSBpbnRlcnBvbGF0aW9uLWFnbm9zdGljLiBPdGhlcndpc2UgaXQgd291bGQgbmVlZFxuICAgICAgICAvLyB0byBiZSBjYWxsZWQgZGlmZmVyZW50bHkgaW4gZGlmZmVyZW50IGNhc2VzLiBXaGljaCB3b3VsZG4ndCBiZSB0aGUgd29yc3QsIGJ1dFxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCBpMCwgajAsIHUsIHYpIHtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgICAgICAgICAgaWYoIW91dCkgb3V0ID0gW107XG4gICAgICAgICAgICB2YXIgZjAsIGYxLCBmMiwgZjMsIGssIGFrO1xuICAgICAgICAgICAgajAgKj0gMztcbiAgICAgICAgICAgIHZhciB2MiA9IHYgKiB2O1xuICAgICAgICAgICAgdmFyIHYzID0gdjIgKiB2O1xuICAgICAgICAgICAgdmFyIG92ID0gMSAtIHY7XG4gICAgICAgICAgICB2YXIgb3YyID0gb3YgKiBvdjtcbiAgICAgICAgICAgIHZhciBvdjMgPSBvdjIgKiBvdjtcbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IGFycmF5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGFrID0gYXJyYXlzW2tdO1xuICAgICAgICAgICAgICAgIGYwID0gYWtbajBdW2kwICsgMV0gLSBha1tqMF1baTBdO1xuICAgICAgICAgICAgICAgIGYxID0gYWtbajAgKyAxXVtpMCArIDFdIC0gYWtbajAgKyAxXVtpMF07XG4gICAgICAgICAgICAgICAgZjIgPSBha1tqMCArIDJdW2kwICsgMV0gLSBha1tqMCArIDJdW2kwXTtcbiAgICAgICAgICAgICAgICBmMyA9IGFrW2owICsgM11baTAgKyAxXSAtIGFrW2owICsgM11baTBdO1xuXG4gICAgICAgICAgICAgICAgb3V0W2tdID0gb3YzICogZjAgKyAzICogKG92MiAqIHYgKiBmMSArIG92ICogdjIgKiBmMikgKyB2MyAqIGYzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGaW5hbGx5LCBib3RoIGRpcmVjdGlvbnMgYXJlIGxpbmVhcjpcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG91dCwgaTAsIGowLCB1LCB2KSB7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICAgICAgICAgIGlmKCFvdXQpIG91dCA9IFtdO1xuICAgICAgICAgICAgdmFyIGYwLCBmMSwgaywgYWs7XG4gICAgICAgICAgICB2YXIgb3YgPSAxIC0gdjtcbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IGFycmF5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGFrID0gYXJyYXlzW2tdO1xuICAgICAgICAgICAgICAgIGYwID0gYWtbajBdW2kwICsgMV0gLSBha1tqMF1baTBdO1xuICAgICAgICAgICAgICAgIGYxID0gYWtbajAgKyAxXVtpMCArIDFdIC0gYWtbajAgKyAxXVtpMF07XG5cbiAgICAgICAgICAgICAgICBvdXRba10gPSBvdiAqIGYwICsgdiAqIGYxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfTtcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFycmF5cywgYXNtb290aGluZywgYnNtb290aGluZykge1xuICAgIGlmKGFzbW9vdGhpbmcgJiYgYnNtb290aGluZykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCBpMCwgajAsIHUsIHYpIHtcbiAgICAgICAgICAgIGlmKCFvdXQpIG91dCA9IFtdO1xuICAgICAgICAgICAgdmFyIGYwLCBmMSwgZjIsIGYzLCBhaywgaztcblxuICAgICAgICAgICAgLy8gU2luY2UgaXQncyBhIGdyaWQgb2YgY29udHJvbCBwb2ludHMsIHRoZSBhY3R1YWwgaW5kaWNlcyBhcmUgKiAzOlxuICAgICAgICAgICAgaTAgKj0gMztcbiAgICAgICAgICAgIGowICo9IDM7XG5cbiAgICAgICAgICAgIC8vIFByZWNvbXB1dGUgc29tZSBudW1iZXJzOlxuICAgICAgICAgICAgdmFyIHUyID0gdSAqIHU7XG4gICAgICAgICAgICB2YXIgdTMgPSB1MiAqIHU7XG4gICAgICAgICAgICB2YXIgb3UgPSAxIC0gdTtcbiAgICAgICAgICAgIHZhciBvdTIgPSBvdSAqIG91O1xuICAgICAgICAgICAgdmFyIG91MyA9IG91MiAqIG91O1xuXG4gICAgICAgICAgICB2YXIgdjIgPSB2ICogdjtcbiAgICAgICAgICAgIHZhciBvdiA9IDEgLSB2O1xuICAgICAgICAgICAgdmFyIG92MiA9IG92ICogb3Y7XG4gICAgICAgICAgICB2YXIgb3Z2MiA9IG92ICogdiAqIDI7XG4gICAgICAgICAgICB2YXIgYSA9IC0zICogb3YyO1xuICAgICAgICAgICAgdmFyIGIgPSAzICogKG92MiAtIG92djIpO1xuICAgICAgICAgICAgdmFyIGMgPSAzICogKG92djIgLSB2Mik7XG4gICAgICAgICAgICB2YXIgZCA9IDMgKiB2MjtcblxuICAgICAgICAgICAgZm9yKGsgPSAwOyBrIDwgYXJyYXlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgYWsgPSBhcnJheXNba107XG5cbiAgICAgICAgICAgICAgICAvLyBDb21wdXRlIHRoZSBkZXJpdmF0aXZlcyBpbiB0aGUgdi1kaXJlY3Rpb246XG4gICAgICAgICAgICAgICAgZjAgPSBhICogYWtbajBdW2kwXSArIGIgKiBha1tqMCArIDFdW2kwXSArIGMgKiBha1tqMCArIDJdW2kwXSArIGQgKiBha1tqMCArIDNdW2kwXTtcbiAgICAgICAgICAgICAgICBmMSA9IGEgKiBha1tqMF1baTAgKyAxXSArIGIgKiBha1tqMCArIDFdW2kwICsgMV0gKyBjICogYWtbajAgKyAyXVtpMCArIDFdICsgZCAqIGFrW2owICsgM11baTAgKyAxXTtcbiAgICAgICAgICAgICAgICBmMiA9IGEgKiBha1tqMF1baTAgKyAyXSArIGIgKiBha1tqMCArIDFdW2kwICsgMl0gKyBjICogYWtbajAgKyAyXVtpMCArIDJdICsgZCAqIGFrW2owICsgM11baTAgKyAyXTtcbiAgICAgICAgICAgICAgICBmMyA9IGEgKiBha1tqMF1baTAgKyAzXSArIGIgKiBha1tqMCArIDFdW2kwICsgM10gKyBjICogYWtbajAgKyAyXVtpMCArIDNdICsgZCAqIGFrW2owICsgM11baTAgKyAzXTtcblxuICAgICAgICAgICAgICAgIC8vIE5vdyBqdXN0IGludGVycG9sYXRlIGluIHRoZSB2LWRpcmVjdGlvbiBzaW5jZSBpdCdzIGFsbCBzZXBhcmFibGU6XG4gICAgICAgICAgICAgICAgb3V0W2tdID0gb3UzICogZjAgKyAzICogKG91MiAqIHUgKiBmMSArIG91ICogdTIgKiBmMikgKyB1MyAqIGYzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZihhc21vb3RoaW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBzbW9vdGggaW4gdGhlIGEtZGlyZWN0aW9uIGJ1dCBsaW5lYXIgaW4gdGhlIGItZGlyZWN0aW9uIGJ5IHBlcmZvcm1pbmcgZm91clxuICAgICAgICAvLyBsaW5lYXIgaW50ZXJwb2xhdGlvbnMgZm9sbG93ZWQgYnkgb25lIGN1YmljIGludGVycG9sYXRpb24gb2YgdGhlIHJlc3VsdFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCBpMCwgajAsIHYsIHUpIHtcbiAgICAgICAgICAgIGlmKCFvdXQpIG91dCA9IFtdO1xuICAgICAgICAgICAgdmFyIGYwLCBmMSwgZjIsIGYzLCBrLCBhaztcbiAgICAgICAgICAgIGkwICo9IDM7XG4gICAgICAgICAgICB2YXIgdTIgPSB1ICogdTtcbiAgICAgICAgICAgIHZhciB1MyA9IHUyICogdTtcbiAgICAgICAgICAgIHZhciBvdSA9IDEgLSB1O1xuICAgICAgICAgICAgdmFyIG91MiA9IG91ICogb3U7XG4gICAgICAgICAgICB2YXIgb3UzID0gb3UyICogb3U7XG4gICAgICAgICAgICBmb3IoayA9IDA7IGsgPCBhcnJheXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBhayA9IGFycmF5c1trXTtcblxuICAgICAgICAgICAgICAgIGYwID0gYWtbajAgKyAxXVtpMF0gLSBha1tqMF1baTBdO1xuICAgICAgICAgICAgICAgIGYxID0gYWtbajAgKyAxXVtpMCArIDFdIC0gYWtbajBdW2kwICsgMV07XG4gICAgICAgICAgICAgICAgZjIgPSBha1tqMCArIDFdW2kwICsgMl0gLSBha1tqMF1baTAgKyAyXTtcbiAgICAgICAgICAgICAgICBmMyA9IGFrW2owICsgMV1baTAgKyAzXSAtIGFrW2owXVtpMCArIDNdO1xuXG4gICAgICAgICAgICAgICAgb3V0W2tdID0gb3UzICogZjAgKyAzICogKG91MiAqIHUgKiBmMSArIG91ICogdTIgKiBmMikgKyB1MyAqIGYzO1xuXG4gICAgICAgICAgICAgICAgLy8gbWF0aGVtYXRpY2FsbHkgZXF1aXZhbGVudDpcbiAgICAgICAgICAgICAgICAvLyBmMCA9IG91MyAqIGFrW2owICAgIF1baTBdICsgMyAqIChvdTIgKiB1ICogYWtbajAgICAgXVtpMCArIDFdICsgb3UgKiB1MiAqIGFrW2owICAgIF1baTAgKyAyXSkgKyB1MyAqIGFrW2owICAgIF1baTAgKyAzXTtcbiAgICAgICAgICAgICAgICAvLyBmMSA9IG91MyAqIGFrW2owICsgMV1baTBdICsgMyAqIChvdTIgKiB1ICogYWtbajAgKyAxXVtpMCArIDFdICsgb3UgKiB1MiAqIGFrW2owICsgMV1baTAgKyAyXSkgKyB1MyAqIGFrW2owICsgMV1baTAgKyAzXTtcbiAgICAgICAgICAgICAgICAvLyBvdXRba10gPSBmMSAtIGYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYoYnNtb290aGluZykge1xuICAgICAgICAvLyBTYW1lIGFzIHRoZSBhYm92ZSBjYXNlLCBleGNlcHQgcmV2ZXJzZWQ6XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvdXQsIGkwLCBqMCwgdSwgdikge1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gICAgICAgICAgICBpZighb3V0KSBvdXQgPSBbXTtcbiAgICAgICAgICAgIHZhciBmMCwgZjEsIGssIGFrO1xuICAgICAgICAgICAgajAgKj0gMztcbiAgICAgICAgICAgIHZhciBvdSA9IDEgLSB1O1xuICAgICAgICAgICAgdmFyIHYyID0gdiAqIHY7XG4gICAgICAgICAgICB2YXIgb3YgPSAxIC0gdjtcbiAgICAgICAgICAgIHZhciBvdjIgPSBvdiAqIG92O1xuICAgICAgICAgICAgdmFyIG92djIgPSBvdiAqIHYgKiAyO1xuICAgICAgICAgICAgdmFyIGEgPSAtMyAqIG92MjtcbiAgICAgICAgICAgIHZhciBiID0gMyAqIChvdjIgLSBvdnYyKTtcbiAgICAgICAgICAgIHZhciBjID0gMyAqIChvdnYyIC0gdjIpO1xuICAgICAgICAgICAgdmFyIGQgPSAzICogdjI7XG4gICAgICAgICAgICBmb3IoayA9IDA7IGsgPCBhcnJheXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBhayA9IGFycmF5c1trXTtcbiAgICAgICAgICAgICAgICBmMCA9IGEgKiBha1tqMF1baTBdICsgYiAqIGFrW2owICsgMV1baTBdICsgYyAqIGFrW2owICsgMl1baTBdICsgZCAqIGFrW2owICsgM11baTBdO1xuICAgICAgICAgICAgICAgIGYxID0gYSAqIGFrW2owXVtpMCArIDFdICsgYiAqIGFrW2owICsgMV1baTAgKyAxXSArIGMgKiBha1tqMCArIDJdW2kwICsgMV0gKyBkICogYWtbajAgKyAzXVtpMCArIDFdO1xuXG4gICAgICAgICAgICAgICAgb3V0W2tdID0gb3UgKiBmMCArIHUgKiBmMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmluYWxseSwgYm90aCBkaXJlY3Rpb25zIGFyZSBsaW5lYXI6XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvdXQsIGkwLCBqMCwgdiwgdSkge1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gICAgICAgICAgICBpZighb3V0KSBvdXQgPSBbXTtcbiAgICAgICAgICAgIHZhciBmMCwgZjEsIGssIGFrO1xuICAgICAgICAgICAgdmFyIG92ID0gMSAtIHY7XG4gICAgICAgICAgICBmb3IoayA9IDA7IGsgPCBhcnJheXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBhayA9IGFycmF5c1trXTtcbiAgICAgICAgICAgICAgICBmMCA9IGFrW2owICsgMV1baTBdIC0gYWtbajBdW2kwXTtcbiAgICAgICAgICAgICAgICBmMSA9IGFrW2owICsgMV1baTAgKyAxXSAtIGFrW2owXVtpMCArIDFdO1xuXG4gICAgICAgICAgICAgICAgb3V0W2tdID0gb3YgKiBmMCArIHYgKiBmMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH07XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLypcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgZXZhbHVhdGVzIGEgc2V0IG9mIGxpbmVhciBvciBiaWN1YmljIGNvbnRyb2wgcG9pbnRzLlxuICogVGhpcyB3aWxsIGdldCBldmFsdWF0ZWQgYSBsb3QsIHNvIHdlJ2xsIGF0IGxlYXN0IGRvIGEgYml0IG9mIGV4dHJhIHdvcmsgdG9cbiAqIGZsYXR0ZW4gc29tZSBvZiB0aGUgY2hvaWNlcy4gSW4gcGFydGljdWxhciwgd2UnbGwgdW5yb2xsIHRoZSBsaW5lYXIvYmljdWJpY1xuICogY29tYmluYXRpb25zIGFuZCB3ZSdsbCBhbGxvdyBjb21wdXRpbmcgcmVzdWx0cyBpbiBwYXJhbGxlbCB0byBjdXQgZG93blxuICogb24gcmVwZWF0ZWQgYXJpdGhtZXRpYy5cbiAqXG4gKiBUYWtlIG5vdGUgdGhhdCB3ZSBkb24ndCBzZWFyY2ggZm9yIHRoZSBjb3JyZWN0IHJhbmdlIGluIHRoaXMgZnVuY3Rpb24uIFRoZVxuICogcmVhc29uIGlzIGZvciBjb25zaXN0ZW5jeSBkdWUgdG8gdGhlIGNvcnJyZXNwb25kaW5nIGRlcml2YXRpdmUgZnVuY3Rpb24uIEluXG4gKiBwYXJ0aWN1bGFyLCB0aGUgZGVyaXZhdGl2ZXMgYXJlbid0IGNvbnRpbnVvdXMgYWNyb3NzIGNlbGxzLCBzbyBpdCdzIGltcG9ydGFudFxuICogdG8gYmUgYWJsZSBjb250cm9sIHdoZXRoZXIgdGhlIGRlcml2YXRpdmUgYXQgYSBjZWxsIGJvdW5kYXJ5IGlzIGFwcHJvYWNoZWRcbiAqIGZyb20gb25lIHNpZGUgb3IgdGhlIG90aGVyLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFycmF5cywgbmEsIG5iLCBhc21vb3RoaW5nLCBic21vb3RoaW5nKSB7XG4gICAgdmFyIGltYXggPSBuYSAtIDI7XG4gICAgdmFyIGptYXggPSBuYiAtIDI7XG5cbiAgICBpZihhc21vb3RoaW5nICYmIGJzbW9vdGhpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG91dCwgaSwgaikge1xuICAgICAgICAgICAgaWYoIW91dCkgb3V0ID0gW107XG4gICAgICAgICAgICB2YXIgZjAsIGYxLCBmMiwgZjMsIGFrLCBrO1xuXG4gICAgICAgICAgICB2YXIgaTAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihNYXRoLmZsb29yKGkpLCBpbWF4KSk7XG4gICAgICAgICAgICB2YXIgajAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihNYXRoLmZsb29yKGopLCBqbWF4KSk7XG4gICAgICAgICAgICB2YXIgdSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIGkgLSBpMCkpO1xuICAgICAgICAgICAgdmFyIHYgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBqIC0gajApKTtcblxuICAgICAgICAgICAgLy8gU2luY2UgaXQncyBhIGdyaWQgb2YgY29udHJvbCBwb2ludHMsIHRoZSBhY3R1YWwgaW5kaWNlcyBhcmUgKiAzOlxuICAgICAgICAgICAgaTAgKj0gMztcbiAgICAgICAgICAgIGowICo9IDM7XG5cbiAgICAgICAgICAgIC8vIFByZWNvbXB1dGUgc29tZSBudW1iZXJzOlxuICAgICAgICAgICAgdmFyIHUyID0gdSAqIHU7XG4gICAgICAgICAgICB2YXIgdTMgPSB1MiAqIHU7XG4gICAgICAgICAgICB2YXIgb3UgPSAxIC0gdTtcbiAgICAgICAgICAgIHZhciBvdTIgPSBvdSAqIG91O1xuICAgICAgICAgICAgdmFyIG91MyA9IG91MiAqIG91O1xuXG4gICAgICAgICAgICB2YXIgdjIgPSB2ICogdjtcbiAgICAgICAgICAgIHZhciB2MyA9IHYyICogdjtcbiAgICAgICAgICAgIHZhciBvdiA9IDEgLSB2O1xuICAgICAgICAgICAgdmFyIG92MiA9IG92ICogb3Y7XG4gICAgICAgICAgICB2YXIgb3YzID0gb3YyICogb3Y7XG5cbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IGFycmF5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGFrID0gYXJyYXlzW2tdO1xuICAgICAgICAgICAgICAgIGYwID0gb3UzICogYWtbajBdW2kwXSArIDMgKiAob3UyICogdSAqIGFrW2owXVtpMCArIDFdICsgb3UgKiB1MiAqIGFrW2owXVtpMCArIDJdKSArIHUzICogYWtbajBdW2kwICsgM107XG4gICAgICAgICAgICAgICAgZjEgPSBvdTMgKiBha1tqMCArIDFdW2kwXSArIDMgKiAob3UyICogdSAqIGFrW2owICsgMV1baTAgKyAxXSArIG91ICogdTIgKiBha1tqMCArIDFdW2kwICsgMl0pICsgdTMgKiBha1tqMCArIDFdW2kwICsgM107XG4gICAgICAgICAgICAgICAgZjIgPSBvdTMgKiBha1tqMCArIDJdW2kwXSArIDMgKiAob3UyICogdSAqIGFrW2owICsgMl1baTAgKyAxXSArIG91ICogdTIgKiBha1tqMCArIDJdW2kwICsgMl0pICsgdTMgKiBha1tqMCArIDJdW2kwICsgM107XG4gICAgICAgICAgICAgICAgZjMgPSBvdTMgKiBha1tqMCArIDNdW2kwXSArIDMgKiAob3UyICogdSAqIGFrW2owICsgM11baTAgKyAxXSArIG91ICogdTIgKiBha1tqMCArIDNdW2kwICsgMl0pICsgdTMgKiBha1tqMCArIDNdW2kwICsgM107XG4gICAgICAgICAgICAgICAgb3V0W2tdID0gb3YzICogZjAgKyAzICogKG92MiAqIHYgKiBmMSArIG92ICogdjIgKiBmMikgKyB2MyAqIGYzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZihhc21vb3RoaW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBzbW9vdGggaW4gdGhlIGEtZGlyZWN0aW9uIGJ1dCBsaW5lYXIgaW4gdGhlIGItZGlyZWN0aW9uIGJ5IHBlcmZvcm1pbmcgZm91clxuICAgICAgICAvLyBsaW5lYXIgaW50ZXJwb2xhdGlvbnMgZm9sbG93ZWQgYnkgb25lIGN1YmljIGludGVycG9sYXRpb24gb2YgdGhlIHJlc3VsdFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCBpLCBqKSB7XG4gICAgICAgICAgICBpZighb3V0KSBvdXQgPSBbXTtcblxuICAgICAgICAgICAgdmFyIGkwID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oTWF0aC5mbG9vcihpKSwgaW1heCkpO1xuICAgICAgICAgICAgdmFyIGowID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oTWF0aC5mbG9vcihqKSwgam1heCkpO1xuICAgICAgICAgICAgdmFyIHUgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBpIC0gaTApKTtcbiAgICAgICAgICAgIHZhciB2ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgaiAtIGowKSk7XG5cbiAgICAgICAgICAgIHZhciBmMCwgZjEsIGYyLCBmMywgaywgYWs7XG4gICAgICAgICAgICBpMCAqPSAzO1xuICAgICAgICAgICAgdmFyIHUyID0gdSAqIHU7XG4gICAgICAgICAgICB2YXIgdTMgPSB1MiAqIHU7XG4gICAgICAgICAgICB2YXIgb3UgPSAxIC0gdTtcbiAgICAgICAgICAgIHZhciBvdTIgPSBvdSAqIG91O1xuICAgICAgICAgICAgdmFyIG91MyA9IG91MiAqIG91O1xuICAgICAgICAgICAgdmFyIG92ID0gMSAtIHY7XG4gICAgICAgICAgICBmb3IoayA9IDA7IGsgPCBhcnJheXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBhayA9IGFycmF5c1trXTtcbiAgICAgICAgICAgICAgICBmMCA9IG92ICogYWtbajBdW2kwXSArIHYgKiBha1tqMCArIDFdW2kwXTtcbiAgICAgICAgICAgICAgICBmMSA9IG92ICogYWtbajBdW2kwICsgMV0gKyB2ICogYWtbajAgKyAxXVtpMCArIDFdO1xuICAgICAgICAgICAgICAgIGYyID0gb3YgKiBha1tqMF1baTAgKyAyXSArIHYgKiBha1tqMCArIDFdW2kwICsgMV07XG4gICAgICAgICAgICAgICAgZjMgPSBvdiAqIGFrW2owXVtpMCArIDNdICsgdiAqIGFrW2owICsgMV1baTAgKyAxXTtcblxuICAgICAgICAgICAgICAgIG91dFtrXSA9IG91MyAqIGYwICsgMyAqIChvdTIgKiB1ICogZjEgKyBvdSAqIHUyICogZjIpICsgdTMgKiBmMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmKGJzbW9vdGhpbmcpIHtcbiAgICAgICAgLy8gU2FtZSBhcyB0aGUgYWJvdmUgY2FzZSwgZXhjZXB0IHJldmVyc2VkOlxuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3V0LCBpLCBqKSB7XG4gICAgICAgICAgICBpZighb3V0KSBvdXQgPSBbXTtcblxuICAgICAgICAgICAgdmFyIGkwID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oTWF0aC5mbG9vcihpKSwgaW1heCkpO1xuICAgICAgICAgICAgdmFyIGowID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oTWF0aC5mbG9vcihqKSwgam1heCkpO1xuICAgICAgICAgICAgdmFyIHUgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBpIC0gaTApKTtcbiAgICAgICAgICAgIHZhciB2ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgaiAtIGowKSk7XG5cbiAgICAgICAgICAgIHZhciBmMCwgZjEsIGYyLCBmMywgaywgYWs7XG4gICAgICAgICAgICBqMCAqPSAzO1xuICAgICAgICAgICAgdmFyIHYyID0gdiAqIHY7XG4gICAgICAgICAgICB2YXIgdjMgPSB2MiAqIHY7XG4gICAgICAgICAgICB2YXIgb3YgPSAxIC0gdjtcbiAgICAgICAgICAgIHZhciBvdjIgPSBvdiAqIG92O1xuICAgICAgICAgICAgdmFyIG92MyA9IG92MiAqIG92O1xuICAgICAgICAgICAgdmFyIG91ID0gMSAtIHU7XG4gICAgICAgICAgICBmb3IoayA9IDA7IGsgPCBhcnJheXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBhayA9IGFycmF5c1trXTtcbiAgICAgICAgICAgICAgICBmMCA9IG91ICogYWtbajBdW2kwXSArIHUgKiBha1tqMF1baTAgKyAxXTtcbiAgICAgICAgICAgICAgICBmMSA9IG91ICogYWtbajAgKyAxXVtpMF0gKyB1ICogYWtbajAgKyAxXVtpMCArIDFdO1xuICAgICAgICAgICAgICAgIGYyID0gb3UgKiBha1tqMCArIDJdW2kwXSArIHUgKiBha1tqMCArIDJdW2kwICsgMV07XG4gICAgICAgICAgICAgICAgZjMgPSBvdSAqIGFrW2owICsgM11baTBdICsgdSAqIGFrW2owICsgM11baTAgKyAxXTtcblxuICAgICAgICAgICAgICAgIG91dFtrXSA9IG92MyAqIGYwICsgMyAqIChvdjIgKiB2ICogZjEgKyBvdiAqIHYyICogZjIpICsgdjMgKiBmMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmluYWxseSwgYm90aCBkaXJlY3Rpb25zIGFyZSBsaW5lYXI6XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvdXQsIGksIGopIHtcbiAgICAgICAgICAgIGlmKCFvdXQpIG91dCA9IFtdO1xuXG4gICAgICAgICAgICB2YXIgaTAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihNYXRoLmZsb29yKGkpLCBpbWF4KSk7XG4gICAgICAgICAgICB2YXIgajAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihNYXRoLmZsb29yKGopLCBqbWF4KSk7XG4gICAgICAgICAgICB2YXIgdSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIGkgLSBpMCkpO1xuICAgICAgICAgICAgdmFyIHYgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBqIC0gajApKTtcblxuICAgICAgICAgICAgdmFyIGYwLCBmMSwgaywgYWs7XG4gICAgICAgICAgICB2YXIgb3YgPSAxIC0gdjtcbiAgICAgICAgICAgIHZhciBvdSA9IDEgLSB1O1xuICAgICAgICAgICAgZm9yKGsgPSAwOyBrIDwgYXJyYXlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgYWsgPSBhcnJheXNba107XG4gICAgICAgICAgICAgICAgZjAgPSBvdSAqIGFrW2owXVtpMF0gKyB1ICogYWtbajBdW2kwICsgMV07XG4gICAgICAgICAgICAgICAgZjEgPSBvdSAqIGFrW2owICsgMV1baTBdICsgdSAqIGFrW2owICsgMV1baTAgKyAxXTtcblxuICAgICAgICAgICAgICAgIG91dFtrXSA9IG92ICogZjAgKyB2ICogZjE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9O1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGhhbmRsZVhZRGVmYXVsdHMgPSByZXF1aXJlKCcuL3h5X2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlQUJEZWZhdWx0cyA9IHJlcXVpcmUoJy4vYWJfZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3IvYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZmx0Q29sb3IsIGZ1bGxMYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdHJhY2VPdXQuX2NsaXBQYXRoSWQgPSAnY2xpcCcgKyB0cmFjZU91dC51aWQgKyAnY2FycGV0JztcblxuICAgIHZhciBkZWZhdWx0Q29sb3IgPSBjb2VyY2UoJ2NvbG9yJywgY29sb3JBdHRycy5kZWZhdWx0TGluZSk7XG4gICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAnZm9udCcpO1xuXG4gICAgY29lcmNlKCdjYXJwZXQnKTtcblxuICAgIGhhbmRsZUFCRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGZ1bGxMYXlvdXQsIGNvZXJjZSwgZGVmYXVsdENvbG9yKTtcblxuICAgIGlmKCF0cmFjZU91dC5hIHx8ICF0cmFjZU91dC5iKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKHRyYWNlT3V0LmEubGVuZ3RoIDwgMykge1xuICAgICAgICB0cmFjZU91dC5hYXhpcy5zbW9vdGhpbmcgPSAwO1xuICAgIH1cblxuICAgIGlmKHRyYWNlT3V0LmIubGVuZ3RoIDwgMykge1xuICAgICAgICB0cmFjZU91dC5iYXhpcy5zbW9vdGhpbmcgPSAwO1xuICAgIH1cblxuICAgIC8vIE5COiB0aGUgaW5wdXQgaXMgeC95IGFycmF5cy4gWW91IHNob3VsZCBrbm93IHRoYXQgdGhlICpmaXJzdCogZGltZW5zaW9uIG9mIHggYW5kIHlcbiAgICAvLyBjb3JyZXNwb25kcyB0byBiIGFuZCB0aGUgc2Vjb25kIHRvIGEuIFRoaXMgc291bmRzIGJhY2t3YXJkcyBidXQgZW5kcyB1cCBtYWtpbmcgc2Vuc2VcbiAgICAvLyB0aGUgaW1wb3J0YW50IHBhcnQgdG8ga25vdyBpcyB0aGF0IHdoZW4geW91IHdyaXRlIHlbal1baV0sIGogZ29lcyBmcm9tIDAgdG8gYi5sZW5ndGggLSAxXG4gICAgLy8gYW5kIGkgZ29lcyBmcm9tIDAgdG8gYS5sZW5ndGggLSAxLlxuICAgIHZhciB2YWxpZERhdGEgPSBoYW5kbGVYWURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UpO1xuICAgIGlmKCF2YWxpZERhdGEpIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmKHRyYWNlT3V0Ll9jaGVhdGVyKSB7XG4gICAgICAgIGNvZXJjZSgnY2hlYXRlcnNsb3BlJyk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBhbmltYXRhYmxlOiB0cnVlLFxuICAgIGlzQ29udGFpbmVyOiB0cnVlLCAvLyBzbyBjYXJwZXQgdHJhY2VzIGdldCBgY2FsY2AgYmVmb3JlIG90aGVyIHRyYWNlc1xuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnY2FycGV0JyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydjYXJ0ZXNpYW4nLCAnc3ZnJywgJ2NhcnBldCcsICdjYXJwZXRBeGlzJywgJ25vdExlZ2VuZElzb2xhdGFibGUnLCAnbm9NdWx0aUNhdGVnb3J5JywgJ25vSG92ZXInLCAnbm9Tb3J0aW5nQnlWYWx1ZSddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgZGF0YSBkZXNjcmliaW5nIGNhcnBldCBheGlzIGxheW91dCBpcyBzZXQgaW4gYHlgIGFuZCAob3B0aW9uYWxseSknLFxuICAgICAgICAgICAgJ2Fsc28gYHhgLiBJZiBvbmx5IGB5YCBpcyBwcmVzZW50LCBgeGAgdGhlIHBsb3QgaXMgaW50ZXJwcmV0ZWQgYXMgYScsXG4gICAgICAgICAgICAnY2hlYXRlciBwbG90IGFuZCBpcyBmaWxsZWQgaW4gdXNpbmcgdGhlIGB5YCB2YWx1ZXMuJyxcblxuICAgICAgICAgICAgJ2B4YCBhbmQgYHlgIG1heSBlaXRoZXIgYmUgMkQgYXJyYXlzIG1hdGNoaW5nIHdpdGggZWFjaCBkaW1lbnNpb24gbWF0Y2hpbmcnLFxuICAgICAgICAgICAgJ3RoYXQgb2YgYGFgIGFuZCBgYmAsIG9yIHRoZXkgbWF5IGJlIDFEIGFycmF5cyB3aXRoIHRvdGFsIGxlbmd0aCBlcXVhbCB0bycsXG4gICAgICAgICAgICAndGhhdCBvZiBgYWAgYW5kIGBiYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYWtlUGF0aCh4cCwgeXAsIGlzQmljdWJpYykge1xuICAgIC8vIFByZXZlbnQgZDMgZXJyb3JzIHRoYXQgd291bGQgcmVzdWx0IG90aGVyd2lzZTpcbiAgICBpZih4cC5sZW5ndGggPT09IDApIHJldHVybiAnJztcblxuICAgIHZhciBpO1xuICAgIHZhciBwYXRoID0gW107XG4gICAgdmFyIHN0cmlkZSA9IGlzQmljdWJpYyA/IDMgOiAxO1xuICAgIGZvcihpID0gMDsgaSA8IHhwLmxlbmd0aDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgcGF0aC5wdXNoKHhwW2ldICsgJywnICsgeXBbaV0pO1xuXG4gICAgICAgIGlmKGlzQmljdWJpYyAmJiBpIDwgeHAubGVuZ3RoIC0gc3RyaWRlKSB7XG4gICAgICAgICAgICBwYXRoLnB1c2goJ0MnKTtcbiAgICAgICAgICAgIHBhdGgucHVzaChbXG4gICAgICAgICAgICAgICAgeHBbaSArIDFdICsgJywnICsgeXBbaSArIDFdLFxuICAgICAgICAgICAgICAgIHhwW2kgKyAyXSArICcsJyArIHlwW2kgKyAyXSArICcgJyxcbiAgICAgICAgICAgIF0uam9pbignICcpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGF0aC5qb2luKGlzQmljdWJpYyA/ICcnIDogJ0wnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5T3JUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuaXNBcnJheU9yVHlwZWRBcnJheTtcblxuLypcbiAqIE1hcCBhbiBhcnJheSBvZiB4IG9yIHkgY29vcmRpbmF0ZXMgKGMpIHRvIHNjcmVlbi1zcGFjZSBwaXhlbCBjb29yZGluYXRlcyAocCkuXG4gKiBUaGUgb3V0cHV0IGFycmF5IGlzIG9wdGlvbmFsLCBidXQgaWYgcHJvdmlkZWQsIGl0IHdpbGwgYmUgcmV1c2VkIHdpdGhvdXRcbiAqIHJlYWxsb2NhdGlvbiB0byB0aGUgZXh0ZW50IHBvc3NpYmxlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hcEFycmF5KG91dCwgZGF0YSwgZnVuYykge1xuICAgIHZhciBpO1xuXG4gICAgaWYoIWlzQXJyYXlPclR5cGVkQXJyYXkob3V0KSkge1xuICAgICAgICAvLyBJZiBub3QgYW4gYXJyYXksIG1ha2UgaXQgYW4gYXJyYXk6XG4gICAgICAgIG91dCA9IFtdO1xuICAgIH0gZWxzZSBpZihvdXQubGVuZ3RoID4gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgLy8gSWYgdG9vIGxvbmcsIHRydW5jYXRlLiAoSWYgdG9vIHNob3J0LCBpdCB3aWxsIGdyb3dcbiAgICAgICAgLy8gYXV0b21hdGljYWxseSBzbyB3ZSBkb24ndCBjYXJlIGFib3V0IHRoYXQgY2FzZSlcbiAgICAgICAgb3V0ID0gb3V0LnNsaWNlKDAsIGRhdGEubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG91dFtpXSA9IGZ1bmMoZGF0YVtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvcmllbnRUZXh0KHRyYWNlLCB4YXhpcywgeWF4aXMsIHh5LCBkeHksIHJlZkR4eSkge1xuICAgIHZhciBkeCA9IGR4eVswXSAqIHRyYWNlLmRwZHgoeGF4aXMpO1xuICAgIHZhciBkeSA9IGR4eVsxXSAqIHRyYWNlLmRwZHkoeWF4aXMpO1xuICAgIHZhciBmbGlwID0gMTtcblxuICAgIHZhciBvZmZzZXRNdWx0aXBsaWVyID0gMS4wO1xuICAgIGlmKHJlZkR4eSkge1xuICAgICAgICB2YXIgbDEgPSBNYXRoLnNxcnQoZHh5WzBdICogZHh5WzBdICsgZHh5WzFdICogZHh5WzFdKTtcbiAgICAgICAgdmFyIGwyID0gTWF0aC5zcXJ0KHJlZkR4eVswXSAqIHJlZkR4eVswXSArIHJlZkR4eVsxXSAqIHJlZkR4eVsxXSk7XG4gICAgICAgIHZhciBkb3QgPSAoZHh5WzBdICogcmVmRHh5WzBdICsgZHh5WzFdICogcmVmRHh5WzFdKSAvIGwxIC8gbDI7XG4gICAgICAgIG9mZnNldE11bHRpcGxpZXIgPSBNYXRoLm1heCgwLjAsIGRvdCk7XG4gICAgfVxuXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpICogMTgwIC8gTWF0aC5QSTtcbiAgICBpZihhbmdsZSA8IC05MCkge1xuICAgICAgICBhbmdsZSArPSAxODA7XG4gICAgICAgIGZsaXAgPSAtZmxpcDtcbiAgICB9IGVsc2UgaWYoYW5nbGUgPiA5MCkge1xuICAgICAgICBhbmdsZSAtPSAxODA7XG4gICAgICAgIGZsaXAgPSAtZmxpcDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhbmdsZTogYW5nbGUsXG4gICAgICAgIGZsaXA6IGZsaXAsXG4gICAgICAgIHA6IHRyYWNlLmMycCh4eSwgeGF4aXMsIHlheGlzKSxcbiAgICAgICAgb2Zmc2V0TXVsdHBsaWVyOiBvZmZzZXRNdWx0aXBsaWVyXG4gICAgfTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgbWFwMWRBcnJheSA9IHJlcXVpcmUoJy4vbWFwXzFkX2FycmF5Jyk7XG52YXIgbWFrZXBhdGggPSByZXF1aXJlKCcuL21ha2VwYXRoJyk7XG52YXIgb3JpZW50VGV4dCA9IHJlcXVpcmUoJy4vb3JpZW50X3RleHQnKTtcbnZhciBzdmdUZXh0VXRpbHMgPSByZXF1aXJlKCcuLi8uLi9saWIvc3ZnX3RleHRfdXRpbHMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBhbGlnbm1lbnRDb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvYWxpZ25tZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGxvdChnZCwgcGxvdGluZm8sIGNkY2FycGV0LCBjYXJwZXRMYXllcikge1xuICAgIHZhciB4YSA9IHBsb3RpbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHBsb3RpbmZvLnlheGlzO1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGNsaXBMYXllciA9IGZ1bGxMYXlvdXQuX2NsaXBzO1xuXG4gICAgTGliLm1ha2VUcmFjZUdyb3VwcyhjYXJwZXRMYXllciwgY2RjYXJwZXQsICd0cmFjZScpLmVhY2goZnVuY3Rpb24oY2QpIHtcbiAgICAgICAgdmFyIGF4aXNMYXllciA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGNkMCA9IGNkWzBdO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG4gICAgICAgIHZhciBhYXggPSB0cmFjZS5hYXhpcztcbiAgICAgICAgdmFyIGJheCA9IHRyYWNlLmJheGlzO1xuXG4gICAgICAgIHZhciBtaW5vckxheWVyID0gTGliLmVuc3VyZVNpbmdsZShheGlzTGF5ZXIsICdnJywgJ21pbm9ybGF5ZXInKTtcbiAgICAgICAgdmFyIG1ham9yTGF5ZXIgPSBMaWIuZW5zdXJlU2luZ2xlKGF4aXNMYXllciwgJ2cnLCAnbWFqb3JsYXllcicpO1xuICAgICAgICB2YXIgYm91bmRhcnlMYXllciA9IExpYi5lbnN1cmVTaW5nbGUoYXhpc0xheWVyLCAnZycsICdib3VuZGFyeWxheWVyJyk7XG4gICAgICAgIHZhciBsYWJlbExheWVyID0gTGliLmVuc3VyZVNpbmdsZShheGlzTGF5ZXIsICdnJywgJ2xhYmVsbGF5ZXInKTtcblxuICAgICAgICBheGlzTGF5ZXIuc3R5bGUoJ29wYWNpdHknLCB0cmFjZS5vcGFjaXR5KTtcblxuICAgICAgICBkcmF3R3JpZExpbmVzKHhhLCB5YSwgbWFqb3JMYXllciwgYWF4LCAnYScsIGFheC5fZ3JpZGxpbmVzLCB0cnVlKTtcbiAgICAgICAgZHJhd0dyaWRMaW5lcyh4YSwgeWEsIG1ham9yTGF5ZXIsIGJheCwgJ2InLCBiYXguX2dyaWRsaW5lcywgdHJ1ZSk7XG4gICAgICAgIGRyYXdHcmlkTGluZXMoeGEsIHlhLCBtaW5vckxheWVyLCBhYXgsICdhJywgYWF4Ll9taW5vcmdyaWRsaW5lcywgdHJ1ZSk7XG4gICAgICAgIGRyYXdHcmlkTGluZXMoeGEsIHlhLCBtaW5vckxheWVyLCBiYXgsICdiJywgYmF4Ll9taW5vcmdyaWRsaW5lcywgdHJ1ZSk7XG5cbiAgICAgICAgLy8gTkI6IFRoZXNlIGFyZSBub3Qgb21taXR0ZWQgaWYgdGhlIGxpbmVzIGFyZSBub3QgYWN0aXZlLiBUaGUgam9pbnMgbXVzdCBiZSBleGVjdXRlZFxuICAgICAgICAvLyBpbiBvcmRlciBmb3IgdGhlbSB0byBnZXQgY2xlYW5lZCB1cCB3aXRob3V0IGEgZnVsbCByZWRyYXdcbiAgICAgICAgZHJhd0dyaWRMaW5lcyh4YSwgeWEsIGJvdW5kYXJ5TGF5ZXIsIGFheCwgJ2EtYm91bmRhcnknLCBhYXguX2JvdW5kYXJ5bGluZXMpO1xuICAgICAgICBkcmF3R3JpZExpbmVzKHhhLCB5YSwgYm91bmRhcnlMYXllciwgYmF4LCAnYi1ib3VuZGFyeScsIGJheC5fYm91bmRhcnlsaW5lcyk7XG5cbiAgICAgICAgdmFyIGxhYmVsT3JpZW50YXRpb25BID0gZHJhd0F4aXNMYWJlbHMoZ2QsIHhhLCB5YSwgdHJhY2UsIGNkMCwgbGFiZWxMYXllciwgYWF4Ll9sYWJlbHMsICdhLWxhYmVsJyk7XG4gICAgICAgIHZhciBsYWJlbE9yaWVudGF0aW9uQiA9IGRyYXdBeGlzTGFiZWxzKGdkLCB4YSwgeWEsIHRyYWNlLCBjZDAsIGxhYmVsTGF5ZXIsIGJheC5fbGFiZWxzLCAnYi1sYWJlbCcpO1xuXG4gICAgICAgIGRyYXdBeGlzVGl0bGVzKGdkLCBsYWJlbExheWVyLCB0cmFjZSwgY2QwLCB4YSwgeWEsIGxhYmVsT3JpZW50YXRpb25BLCBsYWJlbE9yaWVudGF0aW9uQik7XG5cbiAgICAgICAgZHJhd0NsaXBQYXRoKHRyYWNlLCBjZDAsIGNsaXBMYXllciwgeGEsIHlhKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGRyYXdDbGlwUGF0aCh0cmFjZSwgdCwgbGF5ZXIsIHhheGlzLCB5YXhpcykge1xuICAgIHZhciBzZWcsIHhwLCB5cCwgaTtcblxuICAgIHZhciBjbGlwID0gbGF5ZXIuc2VsZWN0KCcjJyArIHRyYWNlLl9jbGlwUGF0aElkKTtcblxuICAgIGlmKCFjbGlwLnNpemUoKSkge1xuICAgICAgICBjbGlwID0gbGF5ZXIuYXBwZW5kKCdjbGlwUGF0aCcpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY2FycGV0Y2xpcCcsIHRydWUpO1xuICAgIH1cblxuICAgIHZhciBwYXRoID0gTGliLmVuc3VyZVNpbmdsZShjbGlwLCAncGF0aCcsICdjYXJwZXRib3VuZGFyeScpO1xuICAgIHZhciBzZWdtZW50cyA9IHQuY2xpcHNlZ21lbnRzO1xuICAgIHZhciBzZWdzID0gW107XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzZWcgPSBzZWdtZW50c1tpXTtcbiAgICAgICAgeHAgPSBtYXAxZEFycmF5KFtdLCBzZWcueCwgeGF4aXMuYzJwKTtcbiAgICAgICAgeXAgPSBtYXAxZEFycmF5KFtdLCBzZWcueSwgeWF4aXMuYzJwKTtcbiAgICAgICAgc2Vncy5wdXNoKG1ha2VwYXRoKHhwLCB5cCwgc2VnLmJpY3ViaWMpKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGNvdWxkIGJlIG9wdGltaXplZCBldmVyIHNvIHNsaWdodGx5IHRvIGF2b2lkIG5vLW9wIEwgc2VnbWVudHNcbiAgICAvLyBhdCB0aGUgY29ybmVycywgYnV0IGl0J3Mgc28gbmVnbGlnaWJsZSB0aGF0IEkgZG9uJ3QgdGhpbmsgaXQncyB3b3J0aFxuICAgIC8vIHRoZSBleHRyYSBjb21wbGV4aXR5XG4gICAgdmFyIGNsaXBQYXRoRGF0YSA9ICdNJyArIHNlZ3Muam9pbignTCcpICsgJ1onO1xuICAgIGNsaXAuYXR0cignaWQnLCB0cmFjZS5fY2xpcFBhdGhJZCk7XG4gICAgcGF0aC5hdHRyKCdkJywgY2xpcFBhdGhEYXRhKTtcbn1cblxuZnVuY3Rpb24gZHJhd0dyaWRMaW5lcyh4YXhpcywgeWF4aXMsIGxheWVyLCBheGlzLCBheGlzTGV0dGVyLCBncmlkbGluZXMpIHtcbiAgICB2YXIgbGluZUNsYXNzID0gJ2NvbnN0LScgKyBheGlzTGV0dGVyICsgJy1saW5lcyc7XG4gICAgdmFyIGdyaWRKb2luID0gbGF5ZXIuc2VsZWN0QWxsKCcuJyArIGxpbmVDbGFzcykuZGF0YShncmlkbGluZXMpO1xuXG4gICAgZ3JpZEpvaW4uZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAuY2xhc3NlZChsaW5lQ2xhc3MsIHRydWUpXG4gICAgICAgIC5zdHlsZSgndmVjdG9yLWVmZmVjdCcsICdub24tc2NhbGluZy1zdHJva2UnKTtcblxuICAgIGdyaWRKb2luLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgZ3JpZGxpbmUgPSBkO1xuICAgICAgICB2YXIgeCA9IGdyaWRsaW5lLng7XG4gICAgICAgIHZhciB5ID0gZ3JpZGxpbmUueTtcblxuICAgICAgICB2YXIgeHAgPSBtYXAxZEFycmF5KFtdLCB4LCB4YXhpcy5jMnApO1xuICAgICAgICB2YXIgeXAgPSBtYXAxZEFycmF5KFtdLCB5LCB5YXhpcy5jMnApO1xuXG4gICAgICAgIHZhciBwYXRoID0gJ00nICsgbWFrZXBhdGgoeHAsIHlwLCBncmlkbGluZS5zbW9vdGhpbmcpO1xuXG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICBlbC5hdHRyKCdkJywgcGF0aClcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgZ3JpZGxpbmUud2lkdGgpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGdyaWRsaW5lLmNvbG9yKVxuICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKTtcbiAgICB9KTtcblxuICAgIGdyaWRKb2luLmV4aXQoKS5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gZHJhd0F4aXNMYWJlbHMoZ2QsIHhheGlzLCB5YXhpcywgdHJhY2UsIHQsIGxheWVyLCBsYWJlbHMsIGxhYmVsQ2xhc3MpIHtcbiAgICB2YXIgbGFiZWxKb2luID0gbGF5ZXIuc2VsZWN0QWxsKCd0ZXh0LicgKyBsYWJlbENsYXNzKS5kYXRhKGxhYmVscyk7XG5cbiAgICBsYWJlbEpvaW4uZW50ZXIoKS5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAuY2xhc3NlZChsYWJlbENsYXNzLCB0cnVlKTtcblxuICAgIHZhciBtYXhFeHRlbnQgPSAwO1xuICAgIHZhciBsYWJlbE9yaWVudGF0aW9uID0ge307XG5cbiAgICBsYWJlbEpvaW4uZWFjaChmdW5jdGlvbihsYWJlbCwgaSkge1xuICAgICAgICAvLyBNb3N0IG9mIHRoZSBwb3NpdGlvbmluZyBpcyBkb25lIGluIGNhbGNfbGFiZWxzLiBPbmx5IHRoZSBwYXJ0cyB0aGF0IGRlcGVuZCB1cG9uXG4gICAgICAgIC8vIHRoZSBzY3JlZW4gc3BhY2UgcmVwcmVzZW50YXRpb24gb2YgdGhlIHggYW5kIHkgYXhlcyBhcmUgaGVyZTpcbiAgICAgICAgdmFyIG9yaWVudGF0aW9uO1xuICAgICAgICBpZihsYWJlbC5heGlzLnRpY2thbmdsZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudFRleHQodHJhY2UsIHhheGlzLCB5YXhpcywgbGFiZWwueHksIGxhYmVsLmR4eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYW5nbGUgPSAobGFiZWwuYXhpcy50aWNrYW5nbGUgKyAxODAuMCkgKiBNYXRoLlBJIC8gMTgwLjA7XG4gICAgICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudFRleHQodHJhY2UsIHhheGlzLCB5YXhpcywgbGFiZWwueHksIFtNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWkpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IG9mZnNldE11bHRpcGxpZXI/IE5vdCBjdXJyZW50bHkgdXNlZCBhbnl3aGVyZS4uLlxuICAgICAgICAgICAgbGFiZWxPcmllbnRhdGlvbiA9IHthbmdsZTogb3JpZW50YXRpb24uYW5nbGUsIGZsaXA6IG9yaWVudGF0aW9uLmZsaXB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSAobGFiZWwuZW5kQW5jaG9yID8gLTEgOiAxKSAqIG9yaWVudGF0aW9uLmZsaXA7XG5cbiAgICAgICAgdmFyIGxhYmVsRWwgPSBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiBkaXJlY3Rpb24gPiAwID8gJ3N0YXJ0JyA6ICdlbmQnLFxuICAgICAgICAgICAgICAgICdkYXRhLW5vdGV4JzogMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgbGFiZWwuZm9udClcbiAgICAgICAgICAgIC50ZXh0KGxhYmVsLnRleHQpXG4gICAgICAgICAgICAuY2FsbChzdmdUZXh0VXRpbHMuY29udmVydFRvVHNwYW5zLCBnZCk7XG5cbiAgICAgICAgdmFyIGJib3ggPSBEcmF3aW5nLmJCb3godGhpcyk7XG5cbiAgICAgICAgbGFiZWxFbC5hdHRyKCd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgIC8vIFRyYW5zbGF0ZSB0byB0aGUgY29ycmVjdCBwb2ludDpcbiAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyBvcmllbnRhdGlvbi5wWzBdICsgJywnICsgb3JpZW50YXRpb24ucFsxXSArICcpICcgK1xuICAgICAgICAgICAgICAgIC8vIFJvdGF0ZSB0byBsaW5lIHVwIHdpdGggZ3JpZCBsaW5lIHRhbmdlbnQ6XG4gICAgICAgICAgICAgICAgJ3JvdGF0ZSgnICsgb3JpZW50YXRpb24uYW5nbGUgKyAnKScgK1xuICAgICAgICAgICAgICAgIC8vIEFkanVzdCB0aGUgYmFzZWxpbmUgYW5kIGluZGVudGF0aW9uOlxuICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoJyArIGxhYmVsLmF4aXMubGFiZWxwYWRkaW5nICogZGlyZWN0aW9uICsgJywnICsgYmJveC5oZWlnaHQgKiAwLjMgKyAnKSdcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgbWF4RXh0ZW50ID0gTWF0aC5tYXgobWF4RXh0ZW50LCBiYm94LndpZHRoICsgbGFiZWwuYXhpcy5sYWJlbHBhZGRpbmcpO1xuICAgIH0pO1xuXG4gICAgbGFiZWxKb2luLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIGxhYmVsT3JpZW50YXRpb24ubWF4RXh0ZW50ID0gbWF4RXh0ZW50O1xuICAgIHJldHVybiBsYWJlbE9yaWVudGF0aW9uO1xufVxuXG5mdW5jdGlvbiBkcmF3QXhpc1RpdGxlcyhnZCwgbGF5ZXIsIHRyYWNlLCB0LCB4YSwgeWEsIGxhYmVsT3JpZW50YXRpb25BLCBsYWJlbE9yaWVudGF0aW9uQikge1xuICAgIHZhciBhLCBiLCB4eSwgZHh5O1xuXG4gICAgdmFyIGFNaW4gPSBMaWIuYWdnTnVtcyhNYXRoLm1pbiwgbnVsbCwgdHJhY2UuYSk7XG4gICAgdmFyIGFNYXggPSBMaWIuYWdnTnVtcyhNYXRoLm1heCwgbnVsbCwgdHJhY2UuYSk7XG4gICAgdmFyIGJNaW4gPSBMaWIuYWdnTnVtcyhNYXRoLm1pbiwgbnVsbCwgdHJhY2UuYik7XG4gICAgdmFyIGJNYXggPSBMaWIuYWdnTnVtcyhNYXRoLm1heCwgbnVsbCwgdHJhY2UuYik7XG5cbiAgICBhID0gMC41ICogKGFNaW4gKyBhTWF4KTtcbiAgICBiID0gYk1pbjtcbiAgICB4eSA9IHRyYWNlLmFiMnh5KGEsIGIsIHRydWUpO1xuICAgIGR4eSA9IHRyYWNlLmR4eWRhX3JvdWdoKGEsIGIpO1xuICAgIGlmKGxhYmVsT3JpZW50YXRpb25BLmFuZ2xlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgTGliLmV4dGVuZEZsYXQobGFiZWxPcmllbnRhdGlvbkEsIG9yaWVudFRleHQodHJhY2UsIHhhLCB5YSwgeHksIHRyYWNlLmR4eWRiX3JvdWdoKGEsIGIpKSk7XG4gICAgfVxuICAgIGRyYXdBeGlzVGl0bGUoZ2QsIGxheWVyLCB0cmFjZSwgdCwgeHksIGR4eSwgdHJhY2UuYWF4aXMsIHhhLCB5YSwgbGFiZWxPcmllbnRhdGlvbkEsICdhLXRpdGxlJyk7XG5cbiAgICBhID0gYU1pbjtcbiAgICBiID0gMC41ICogKGJNaW4gKyBiTWF4KTtcbiAgICB4eSA9IHRyYWNlLmFiMnh5KGEsIGIsIHRydWUpO1xuICAgIGR4eSA9IHRyYWNlLmR4eWRiX3JvdWdoKGEsIGIpO1xuICAgIGlmKGxhYmVsT3JpZW50YXRpb25CLmFuZ2xlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgTGliLmV4dGVuZEZsYXQobGFiZWxPcmllbnRhdGlvbkIsIG9yaWVudFRleHQodHJhY2UsIHhhLCB5YSwgeHksIHRyYWNlLmR4eWRhX3JvdWdoKGEsIGIpKSk7XG4gICAgfVxuICAgIGRyYXdBeGlzVGl0bGUoZ2QsIGxheWVyLCB0cmFjZSwgdCwgeHksIGR4eSwgdHJhY2UuYmF4aXMsIHhhLCB5YSwgbGFiZWxPcmllbnRhdGlvbkIsICdiLXRpdGxlJyk7XG59XG5cbnZhciBsaW5lU3BhY2luZyA9IGFsaWdubWVudENvbnN0YW50cy5MSU5FX1NQQUNJTkc7XG52YXIgbWlkU2hpZnQgPSAoKDEgLSBhbGlnbm1lbnRDb25zdGFudHMuTUlEX1NISUZUKSAvIGxpbmVTcGFjaW5nKSArIDE7XG5cbmZ1bmN0aW9uIGRyYXdBeGlzVGl0bGUoZ2QsIGxheWVyLCB0cmFjZSwgdCwgeHksIGR4eSwgYXhpcywgeGEsIHlhLCBsYWJlbE9yaWVudGF0aW9uLCBsYWJlbENsYXNzKSB7XG4gICAgdmFyIGRhdGEgPSBbXTtcbiAgICBpZihheGlzLnRpdGxlLnRleHQpIGRhdGEucHVzaChheGlzLnRpdGxlLnRleHQpO1xuICAgIHZhciB0aXRsZUpvaW4gPSBsYXllci5zZWxlY3RBbGwoJ3RleHQuJyArIGxhYmVsQ2xhc3MpLmRhdGEoZGF0YSk7XG4gICAgdmFyIG9mZnNldCA9IGxhYmVsT3JpZW50YXRpb24ubWF4RXh0ZW50O1xuXG4gICAgdGl0bGVKb2luLmVudGVyKCkuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLmNsYXNzZWQobGFiZWxDbGFzcywgdHJ1ZSk7XG5cbiAgICAvLyBUaGVyZSdzIG9ubHkgb25lLCBidXQgd2UnbGwgZG8gaXQgYXMgYSBqb2luIHNvIGl0J3MgdXBkYXRlZCBuaWNlbHk6XG4gICAgdGl0bGVKb2luLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcmllbnRhdGlvbiA9IG9yaWVudFRleHQodHJhY2UsIHhhLCB5YSwgeHksIGR4eSk7XG5cbiAgICAgICAgaWYoWydzdGFydCcsICdib3RoJ10uaW5kZXhPZihheGlzLnNob3d0aWNrbGFiZWxzKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbiBhZGRpdGlvbiB0byB0aGUgc2l6ZSBvZiB0aGUgbGFiZWxzLCBhZGQgb24gc29tZSBleHRyYSBwYWRkaW5nOlxuICAgICAgICB2YXIgdGl0bGVTaXplID0gYXhpcy50aXRsZS5mb250LnNpemU7XG4gICAgICAgIG9mZnNldCArPSB0aXRsZVNpemUgKyBheGlzLnRpdGxlLm9mZnNldDtcblxuICAgICAgICB2YXIgbGFiZWxOb3JtID0gbGFiZWxPcmllbnRhdGlvbi5hbmdsZSArIChsYWJlbE9yaWVudGF0aW9uLmZsaXAgPCAwID8gMTgwIDogMCk7XG4gICAgICAgIHZhciBhbmdsZURpZmYgPSAobGFiZWxOb3JtIC0gb3JpZW50YXRpb24uYW5nbGUgKyA0NTApICUgMzYwO1xuICAgICAgICB2YXIgcmV2ZXJzZVRpdGxlID0gYW5nbGVEaWZmID4gOTAgJiYgYW5nbGVEaWZmIDwgMjcwO1xuXG4gICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICBlbC50ZXh0KGF4aXMudGl0bGUudGV4dClcbiAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcblxuICAgICAgICBpZihyZXZlcnNlVGl0bGUpIHtcbiAgICAgICAgICAgIG9mZnNldCA9ICgtc3ZnVGV4dFV0aWxzLmxpbmVDb3VudChlbCkgKyBtaWRTaGlmdCkgKiBsaW5lU3BhY2luZyAqIHRpdGxlU2l6ZSAtIG9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLmF0dHIoJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgJ3RyYW5zbGF0ZSgnICsgb3JpZW50YXRpb24ucFswXSArICcsJyArIG9yaWVudGF0aW9uLnBbMV0gKyAnKSAnICtcbiAgICAgICAgICAgICAgICAncm90YXRlKCcgKyBvcmllbnRhdGlvbi5hbmdsZSArICcpICcgK1xuICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoMCwnICsgb2Zmc2V0ICsgJyknXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuY2xhc3NlZCgndXNlci1zZWxlY3Qtbm9uZScsIHRydWUpXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgYXhpcy50aXRsZS5mb250KTtcbiAgICB9KTtcblxuICAgIHRpdGxlSm9pbi5leGl0KCkucmVtb3ZlKCk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xudmFyIHNlYXJjaCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zZWFyY2gnKS5maW5kQmluO1xudmFyIGNvbXB1dGVDb250cm9sUG9pbnRzID0gcmVxdWlyZSgnLi9jb21wdXRlX2NvbnRyb2xfcG9pbnRzJyk7XG52YXIgY3JlYXRlU3BsaW5lRXZhbHVhdG9yID0gcmVxdWlyZSgnLi9jcmVhdGVfc3BsaW5lX2V2YWx1YXRvcicpO1xudmFyIGNyZWF0ZUlEZXJpdmF0aXZlRXZhbHVhdG9yID0gcmVxdWlyZSgnLi9jcmVhdGVfaV9kZXJpdmF0aXZlX2V2YWx1YXRvcicpO1xudmFyIGNyZWF0ZUpEZXJpdmF0aXZlRXZhbHVhdG9yID0gcmVxdWlyZSgnLi9jcmVhdGVfal9kZXJpdmF0aXZlX2V2YWx1YXRvcicpO1xuXG4vKlxuICogQ3JlYXRlIGNvbnZlcnNpb24gZnVuY3Rpb25zIHRvIGdvIGZyb20gb25lIGJhc2lzIHRvIGFub3RoZXIuIEluIHBhcnRpY3VsYXIgdGhlIGxldHRlclxuICogYWJicmV2aWF0aW9ucyBhcmU6XG4gKlxuICogICBpOiBpL2ogY29vcmRpbmF0ZXMgYWxvbmcgdGhlIGdyaWQuIEludGVnZXIgdmFsdWVzIGNvcnJlc3BvbmQgdG8gZGF0YSBwb2ludHNcbiAqICAgYTogcmVhbC12YWx1ZWQgY29vcmRpbmF0ZXMgYWxvbmcgdGhlIGEvYiBheGVzXG4gKiAgIGM6IGNhcnRlc2lhbiB4LXkgY29vcmRpbmF0ZXNcbiAqICAgcDogc2NyZWVuLXNwYWNlIHBpeGVsIGNvb3JkaW5hdGVzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0Q29udmVydCh0cmFjZSkge1xuICAgIHZhciBhID0gdHJhY2UuX2E7XG4gICAgdmFyIGIgPSB0cmFjZS5fYjtcbiAgICB2YXIgbmEgPSBhLmxlbmd0aDtcbiAgICB2YXIgbmIgPSBiLmxlbmd0aDtcbiAgICB2YXIgYWF4ID0gdHJhY2UuYWF4aXM7XG4gICAgdmFyIGJheCA9IHRyYWNlLmJheGlzO1xuXG4gICAgLy8gR3JhYiB0aGUgbGltaXRzIG9uY2UgcmF0aGVyIHRoYW4gcmVjb21wdXRpbmcgdGhlIGJvdW5kcyBmb3IgZXZlcnkgcG9pbnRcbiAgICAvLyBpbmRlcGVuZGVudGx5OlxuICAgIHZhciBhbWluID0gYVswXTtcbiAgICB2YXIgYW1heCA9IGFbbmEgLSAxXTtcbiAgICB2YXIgYm1pbiA9IGJbMF07XG4gICAgdmFyIGJtYXggPSBiW25iIC0gMV07XG4gICAgdmFyIGFyYW5nZSA9IGFbYS5sZW5ndGggLSAxXSAtIGFbMF07XG4gICAgdmFyIGJyYW5nZSA9IGJbYi5sZW5ndGggLSAxXSAtIGJbMF07XG5cbiAgICAvLyBDb21wdXRlIHRoZSB0b2xlcmFuY2Ugc28gdGhhdCBwb2ludHMgYXJlIHZpc2libGUgc2xpZ2h0bHkgb3V0c2lkZSB0aGVcbiAgICAvLyBkZWZpbmVkIGNhcnBldCBheGlzOlxuICAgIHZhciBhdG9sID0gYXJhbmdlICogY29uc3RhbnRzLlJFTEFUSVZFX0NVTExfVE9MRVJBTkNFO1xuICAgIHZhciBidG9sID0gYnJhbmdlICogY29uc3RhbnRzLlJFTEFUSVZFX0NVTExfVE9MRVJBTkNFO1xuXG4gICAgLy8gRXhwYW5kIHRoZSBsaW1pdHMgdG8gaW5jbHVkZSB0aGUgcmVsYXRpdmUgdG9sZXJhbmNlOlxuICAgIGFtaW4gLT0gYXRvbDtcbiAgICBhbWF4ICs9IGF0b2w7XG4gICAgYm1pbiAtPSBidG9sO1xuICAgIGJtYXggKz0gYnRvbDtcblxuICAgIHRyYWNlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPiBhbWluICYmIGEgPCBhbWF4ICYmIGIgPiBibWluICYmIGIgPCBibWF4O1xuICAgIH07XG5cbiAgICB0cmFjZS5pc09jY2x1ZGVkID0gZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gYSA8IGFtaW4gfHwgYSA+IGFtYXggfHwgYiA8IGJtaW4gfHwgYiA+IGJtYXg7XG4gICAgfTtcblxuICAgIHRyYWNlLnNldFNjYWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4ID0gdHJhY2UuX3g7XG4gICAgICAgIHZhciB5ID0gdHJhY2UuX3k7XG5cbiAgICAgICAgLy8gVGhpcyBpcyBwb3RlbnRpYWxseSBhIHZlcnkgZXhwZW5zaXZlIHN0ZXAhIEl0IGRvZXMgdGhlIGJ1bGsgb2YgdGhlIHdvcmsgb2YgY29uc3RydWN0aW5nXG4gICAgICAgIC8vIGFuIGV4cGFuZGVkIGJhc2lzIG9mIGNvbnRyb2wgcG9pbnRzLiBOb3RlIGluIHBhcnRpY3VsYXIgdGhhdCBpdCBvdmVyd3JpdGVzIHRoZSBleGlzdGluZ1xuICAgICAgICAvLyBiYXNpcyB3aXRob3V0IGNyZWF0aW5nIGEgbmV3IGFycmF5IHNpbmNlIHRoYXQgd291bGQgcG90ZW50aWFsbHkgdGhyYXNoIHRoZSBnYXJiYWdlXG4gICAgICAgIC8vIGNvbGxlY3Rvci5cbiAgICAgICAgdmFyIHJlc3VsdCA9IGNvbXB1dGVDb250cm9sUG9pbnRzKHRyYWNlLl94Y3RybCwgdHJhY2UuX3ljdHJsLCB4LCB5LCBhYXguc21vb3RoaW5nLCBiYXguc21vb3RoaW5nKTtcbiAgICAgICAgdHJhY2UuX3hjdHJsID0gcmVzdWx0WzBdO1xuICAgICAgICB0cmFjZS5feWN0cmwgPSByZXN1bHRbMV07XG5cbiAgICAgICAgLy8gVGhpcyBzdGVwIGlzIHRoZSBzZWNvbmQgc3RlcCBpbiB0aGUgcHJvY2VzcywgYnV0IGl0J3Mgc29tZXdoYXQgc2ltcGxlci4gSXQganVzdCB1bnJvbGxzXG4gICAgICAgIC8vIHNvbWUgbG9naWMgc2luY2UgaXQgd291bGQgYmUgdW5uZWNlc3NhcmlseSBleHBlbnNpdmUgdG8gY29tcHV0ZSBib3RoIGludGVycG9sYXRpb25zXG4gICAgICAgIC8vIG5lYXJseSBpZGVudGljYWxseSBidXQgc2VwYXJhdGVseSBhbmQgdG8gaW5jbHVkZSBhIGJ1bmNoIG9mIGxpbmVhciB2cy4gYmljdWJpYyBsb2dpYyBpblxuICAgICAgICAvLyBldmVyeSBzaW5nbGUgY2FsbC5cbiAgICAgICAgdHJhY2UuZXZhbHh5ID0gY3JlYXRlU3BsaW5lRXZhbHVhdG9yKFt0cmFjZS5feGN0cmwsIHRyYWNlLl95Y3RybF0sIG5hLCBuYiwgYWF4LnNtb290aGluZywgYmF4LnNtb290aGluZyk7XG5cbiAgICAgICAgdHJhY2UuZHh5ZGkgPSBjcmVhdGVJRGVyaXZhdGl2ZUV2YWx1YXRvcihbdHJhY2UuX3hjdHJsLCB0cmFjZS5feWN0cmxdLCBhYXguc21vb3RoaW5nLCBiYXguc21vb3RoaW5nKTtcbiAgICAgICAgdHJhY2UuZHh5ZGogPSBjcmVhdGVKRGVyaXZhdGl2ZUV2YWx1YXRvcihbdHJhY2UuX3hjdHJsLCB0cmFjZS5feWN0cmxdLCBhYXguc21vb3RoaW5nLCBiYXguc21vb3RoaW5nKTtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBDb252ZXJ0IGZyb20gaS9qIGRhdGEgZ3JpZCBjb29yZGluYXRlcyB0byBhL2IgdmFsdWVzLiBOb3RlIGluIHBhcnRpY3VsYXIgdGhhdCB0aGlzXG4gICAgICogaXMgKmxpbmVhciogaW50ZXJwb2xhdGlvbiwgZXZlbiBpZiB0aGUgZGF0YSBpcyBpbnRlcnBvbGF0ZWQgYmljdWJpY2FsbHkuXG4gICAgICovXG4gICAgdHJhY2UuaTJhID0gZnVuY3Rpb24oaSkge1xuICAgICAgICB2YXIgaTAgPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKGlbMF0pLCBuYSAtIDIpO1xuICAgICAgICB2YXIgdGkgPSBpWzBdIC0gaTA7XG4gICAgICAgIHJldHVybiAoMSAtIHRpKSAqIGFbaTBdICsgdGkgKiBhW2kwICsgMV07XG4gICAgfTtcblxuICAgIHRyYWNlLmoyYiA9IGZ1bmN0aW9uKGopIHtcbiAgICAgICAgdmFyIGowID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihqWzFdKSwgbmEgLSAyKTtcbiAgICAgICAgdmFyIHRqID0galsxXSAtIGowO1xuICAgICAgICByZXR1cm4gKDEgLSB0aikgKiBiW2owXSArIHRqICogYltqMCArIDFdO1xuICAgIH07XG5cbiAgICB0cmFjZS5pajJhYiA9IGZ1bmN0aW9uKGlqKSB7XG4gICAgICAgIHJldHVybiBbdHJhY2UuaTJhKGlqWzBdKSwgdHJhY2UuajJiKGlqWzFdKV07XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogQ29udmVydCBmcm9tIGEvYiBjb29yZGluYXRlcyB0byBpL2ogZ3JpZC1udW1iZXJlZCBjb29yZGluYXRlcy4gVGhpcyByZXF1aXJlcyBzZWFyY2hpbmdcbiAgICAgKiB0aHJvdWdoIHRoZSBhL2IgZGF0YSBhcnJheXMgYW5kIGFzc3VtZXMgdGhleSBhcmUgbW9ub3RvbmljLCB3aGljaCBpcyBwcmVzdW1lZCB0byBoYXZlXG4gICAgICogYmVlbiBlbmZvcmNlZCBhbHJlYWR5LlxuICAgICAqL1xuICAgIHRyYWNlLmEyaSA9IGZ1bmN0aW9uKGF2YWwpIHtcbiAgICAgICAgdmFyIGkwID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oc2VhcmNoKGF2YWwsIGEpLCBuYSAtIDIpKTtcbiAgICAgICAgdmFyIGEwID0gYVtpMF07XG4gICAgICAgIHZhciBhMSA9IGFbaTAgKyAxXTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKG5hIC0gMSwgaTAgKyAoYXZhbCAtIGEwKSAvIChhMSAtIGEwKSkpO1xuICAgIH07XG5cbiAgICB0cmFjZS5iMmogPSBmdW5jdGlvbihidmFsKSB7XG4gICAgICAgIHZhciBqMCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHNlYXJjaChidmFsLCBiKSwgbmIgLSAyKSk7XG4gICAgICAgIHZhciBiMCA9IGJbajBdO1xuICAgICAgICB2YXIgYjEgPSBiW2owICsgMV07XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihuYiAtIDEsIGowICsgKGJ2YWwgLSBiMCkgLyAoYjEgLSBiMCkpKTtcbiAgICB9O1xuXG4gICAgdHJhY2UuYWIyaWogPSBmdW5jdGlvbihhYikge1xuICAgICAgICByZXR1cm4gW3RyYWNlLmEyaShhYlswXSksIHRyYWNlLmIyaihhYlsxXSldO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIENvbnZlcnQgZnJvbSBpL2ogY29vcmRpbmF0ZXMgdG8geC95IGNhcmV0ZXNpYW4gY29vcmRpbmF0ZXMuIFRoaXMgbWVhbnMgZWl0aGVyIGJpbGluZWFyXG4gICAgICogb3IgYmljdWJpYyBzcGxpbmUgZXZhbHVhdGlvbiwgYnV0IHRoZSBoYXJkIHBhcnQgaXMgYWxyZWFkeSBkb25lIGF0IHRoaXMgcG9pbnQuXG4gICAgICovXG4gICAgdHJhY2UuaTJjID0gZnVuY3Rpb24oaSwgaikge1xuICAgICAgICByZXR1cm4gdHJhY2UuZXZhbHh5KFtdLCBpLCBqKTtcbiAgICB9O1xuXG4gICAgdHJhY2UuYWIyeHkgPSBmdW5jdGlvbihhdmFsLCBidmFsLCBleHRyYXBvbGF0ZSkge1xuICAgICAgICBpZighZXh0cmFwb2xhdGUgJiYgKGF2YWwgPCBhWzBdIHx8IGF2YWwgPiBhW25hIC0gMV0gfCBidmFsIDwgYlswXSB8fCBidmFsID4gYltuYiAtIDFdKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtmYWxzZSwgZmFsc2VdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpID0gdHJhY2UuYTJpKGF2YWwpO1xuICAgICAgICB2YXIgaiA9IHRyYWNlLmIyaihidmFsKTtcblxuICAgICAgICB2YXIgcHQgPSB0cmFjZS5ldmFseHkoW10sIGksIGopO1xuXG4gICAgICAgIGlmKGV4dHJhcG9sYXRlKSB7XG4gICAgICAgICAgICAvLyBUaGlzIHNlY3Rpb24gdXNlcyB0aGUgYm91bmRhcnkgZGVyaXZhdGl2ZXMgdG8gZXh0cmFwb2xhdGUgbGluZWFybHkgb3V0c2lkZVxuICAgICAgICAgICAgLy8gdGhlIGRlZmluZWQgcmFuZ2UuIENvbnNpZGVyIGEgc2NhdHRlciBsaW5lIHdpdGggb25lIHBvaW50IGluc2lkZSB0aGUgY2FycGV0XG4gICAgICAgICAgICAvLyBheGlzIGFuZCBvbmUgcG9pbnQgb3V0c2lkZS4gSWYgd2UgZG9uJ3QgZXh0cmFwb2xhdGUsIHdlIGNhbid0IGRyYXcgdGhlIGxpbmVcbiAgICAgICAgICAgIC8vIGF0IGFsbC5cbiAgICAgICAgICAgIHZhciBpZXggPSAwO1xuICAgICAgICAgICAgdmFyIGpleCA9IDA7XG4gICAgICAgICAgICB2YXIgZGVyID0gW107XG5cbiAgICAgICAgICAgIHZhciBpMCwgdGksIGowLCB0ajtcbiAgICAgICAgICAgIGlmKGF2YWwgPCBhWzBdKSB7XG4gICAgICAgICAgICAgICAgaTAgPSAwO1xuICAgICAgICAgICAgICAgIHRpID0gMDtcbiAgICAgICAgICAgICAgICBpZXggPSAoYXZhbCAtIGFbMF0pIC8gKGFbMV0gLSBhWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihhdmFsID4gYVtuYSAtIDFdKSB7XG4gICAgICAgICAgICAgICAgaTAgPSBuYSAtIDI7XG4gICAgICAgICAgICAgICAgdGkgPSAxO1xuICAgICAgICAgICAgICAgIGlleCA9IChhdmFsIC0gYVtuYSAtIDFdKSAvIChhW25hIC0gMV0gLSBhW25hIC0gMl0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpMCA9IE1hdGgubWF4KDAsIE1hdGgubWluKG5hIC0gMiwgTWF0aC5mbG9vcihpKSkpO1xuICAgICAgICAgICAgICAgIHRpID0gaSAtIGkwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihidmFsIDwgYlswXSkge1xuICAgICAgICAgICAgICAgIGowID0gMDtcbiAgICAgICAgICAgICAgICB0aiA9IDA7XG4gICAgICAgICAgICAgICAgamV4ID0gKGJ2YWwgLSBiWzBdKSAvIChiWzFdIC0gYlswXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYnZhbCA+IGJbbmIgLSAxXSkge1xuICAgICAgICAgICAgICAgIGowID0gbmIgLSAyO1xuICAgICAgICAgICAgICAgIHRqID0gMTtcbiAgICAgICAgICAgICAgICBqZXggPSAoYnZhbCAtIGJbbmIgLSAxXSkgLyAoYltuYiAtIDFdIC0gYltuYiAtIDJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgajAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihuYiAtIDIsIE1hdGguZmxvb3IoaikpKTtcbiAgICAgICAgICAgICAgICB0aiA9IGogLSBqMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaWV4KSB7XG4gICAgICAgICAgICAgICAgdHJhY2UuZHh5ZGkoZGVyLCBpMCwgajAsIHRpLCB0aik7XG4gICAgICAgICAgICAgICAgcHRbMF0gKz0gZGVyWzBdICogaWV4O1xuICAgICAgICAgICAgICAgIHB0WzFdICs9IGRlclsxXSAqIGlleDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoamV4KSB7XG4gICAgICAgICAgICAgICAgdHJhY2UuZHh5ZGooZGVyLCBpMCwgajAsIHRpLCB0aik7XG4gICAgICAgICAgICAgICAgcHRbMF0gKz0gZGVyWzBdICogamV4O1xuICAgICAgICAgICAgICAgIHB0WzFdICs9IGRlclsxXSAqIGpleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwdDtcbiAgICB9O1xuXG5cbiAgICB0cmFjZS5jMnAgPSBmdW5jdGlvbih4eSwgeGEsIHlhKSB7XG4gICAgICAgIHJldHVybiBbeGEuYzJwKHh5WzBdKSwgeWEuYzJwKHh5WzFdKV07XG4gICAgfTtcblxuICAgIHRyYWNlLnAyeCA9IGZ1bmN0aW9uKHAsIHhhLCB5YSkge1xuICAgICAgICByZXR1cm4gW3hhLnAyYyhwWzBdKSwgeWEucDJjKHBbMV0pXTtcbiAgICB9O1xuXG4gICAgdHJhY2UuZGFkaSA9IGZ1bmN0aW9uKGkgLyogLCB1Ki8pIHtcbiAgICAgICAgLy8gUmlnaHQgbm93IG9ubHkgYSBwaWVjZXdpc2UgbGluZWFyIGEgb3IgYiBiYXNpcyBpcyBwZXJtaXR0ZWQgc2luY2Ugc21vb3RoZXIgaW50ZXJwb2xhdGlvblxuICAgICAgICAvLyB3b3VsZCBjYXVzZSBtb25vdG9uaWNpdHkgcHJvYmxlbXMuIEFzIGEgcmV0dWx0LCB1IGlzIGVudGlyZWx5IGRpc3JlZ2FyZGVkIGluIHRoaXNcbiAgICAgICAgLy8gY29tcHV0YXRpb24sIHRob3VnaCB3ZSdsbCBzcGVjaWZ5IGl0IGFzIGEgcGFyYW1ldGVyIGZvciB0aGUgc2FrZSBvZiBjb21wbGV0ZW5lc3MgYW5kXG4gICAgICAgIC8vIGZ1dHVyZS1wcm9vZmluZy4gSXQgd291bGQgYmUgcG9zc2libGUgdG8gdXNlIG1vbm90b25pYyBjdWJpYyBpbnRlcnBvbGF0aW9uLCBmb3IgZXhhbXBsZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Nb25vdG9uZV9jdWJpY19pbnRlcnBvbGF0aW9uXG5cbiAgICAgICAgLy8gdSA9IHUgfHwgMDtcblxuICAgICAgICB2YXIgaTAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihhLmxlbmd0aCAtIDIsIGkpKTtcblxuICAgICAgICAvLyBUaGUgc3RlcCAoZGVtb25pbmF0b3IpIGlzIGltcGxpY2l0bHkgMSBzaW5jZSB0aGF0J3MgdGhlIGdyaWQgc3BhY2luZy5cbiAgICAgICAgcmV0dXJuIGFbaTAgKyAxXSAtIGFbaTBdO1xuICAgIH07XG5cbiAgICB0cmFjZS5kYmRqID0gZnVuY3Rpb24oaiAvKiAsIHYqLykge1xuICAgICAgICAvLyBTZWUgYWJvdmUgY2F2ZWF0cyBmb3IgZGFkaSB3aGljaCBhbHNvIGFwcGx5IGhlcmVcbiAgICAgICAgdmFyIGowID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oYi5sZW5ndGggLSAyLCBqKSk7XG5cbiAgICAgICAgLy8gVGhlIHN0ZXAgKGRlbW9uaW5hdG9yKSBpcyBpbXBsaWNpdGx5IDEgc2luY2UgdGhhdCdzIHRoZSBncmlkIHNwYWNpbmcuXG4gICAgICAgIHJldHVybiBiW2owICsgMV0gLSBiW2owXTtcbiAgICB9O1xuXG4gICAgLy8gVGFrZXM6IGdyaWQgY2VsbCBjb29yZGluYXRlIChpLCBqKSBhbmQgZnJhY3Rpb25hbCBncmlkIGNlbGwgY29vcmRpbmF0ZXMgKHUsIHYpXG4gICAgLy8gUmV0dXJuczogKGR4L2RhLCBkeS9kYilcbiAgICAvL1xuICAgIC8vIE5COiBzZXBhcmF0ZSBncmlkIGNlbGwgKyBmcmFjdGlvbmFsIGdyaWQgY2VsbCBjb29yZGluYXRlIGZvcm1hdCBpcyBkdWUgdG8gdGhlIGRpc2NvbnRpbnVvdXNcbiAgICAvLyBkZXJpdmF0aXZlLCBhcyBkZXNjcmliZWQgYmV0dGVyIGluIGNyZWF0ZV9pX2Rlcml2YXRpdmVfZXZhbHVhdG9yLmpzXG4gICAgdHJhY2UuZHh5ZGEgPSBmdW5jdGlvbihpMCwgajAsIHUsIHYpIHtcbiAgICAgICAgdmFyIGR4eWRpID0gdHJhY2UuZHh5ZGkobnVsbCwgaTAsIGowLCB1LCB2KTtcbiAgICAgICAgdmFyIGRhZGkgPSB0cmFjZS5kYWRpKGkwLCB1KTtcblxuICAgICAgICByZXR1cm4gW2R4eWRpWzBdIC8gZGFkaSwgZHh5ZGlbMV0gLyBkYWRpXTtcbiAgICB9O1xuXG4gICAgdHJhY2UuZHh5ZGIgPSBmdW5jdGlvbihpMCwgajAsIHUsIHYpIHtcbiAgICAgICAgdmFyIGR4eWRqID0gdHJhY2UuZHh5ZGoobnVsbCwgaTAsIGowLCB1LCB2KTtcbiAgICAgICAgdmFyIGRiZGogPSB0cmFjZS5kYmRqKGowLCB2KTtcblxuICAgICAgICByZXR1cm4gW2R4eWRqWzBdIC8gZGJkaiwgZHh5ZGpbMV0gLyBkYmRqXTtcbiAgICB9O1xuXG4gICAgLy8gU29tZXRpbWVzIHdlIGRvbid0IGNhcmUgYWJvdXQgcHJlY2lzaW9uIGFuZCBhbGwgd2UgcmVhbGx5IHdhbnQgaXMgZGVjZW50IHJvdWdoXG4gICAgLy8gZGlyZWN0aW9ucyAoYXMgaXMgdGhlIGNhc2Ugd2l0aCBsYWJlbHMpLiBJbiB0aGF0IGNhc2UsIHdlIGNhbiBkbyBhIHZlcnkgcm91Z2ggZmluaXRlXG4gICAgLy8gZGlmZmVyZW5jZSBhbmQgc3BhcmUgaGF2aW5nIHRvIHdvcnJ5IGFib3V0IHByZWNpc2UgZ3JpZCBjb29yZGluYXRlczpcbiAgICB0cmFjZS5keHlkYV9yb3VnaCA9IGZ1bmN0aW9uKGEsIGIsIHJlbGRpZmYpIHtcbiAgICAgICAgdmFyIGggPSBhcmFuZ2UgKiAocmVsZGlmZiB8fCAwLjEpO1xuICAgICAgICB2YXIgcGx1cyA9IHRyYWNlLmFiMnh5KGEgKyBoLCBiLCB0cnVlKTtcbiAgICAgICAgdmFyIG1pbnVzID0gdHJhY2UuYWIyeHkoYSAtIGgsIGIsIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAocGx1c1swXSAtIG1pbnVzWzBdKSAqIDAuNSAvIGgsXG4gICAgICAgICAgICAocGx1c1sxXSAtIG1pbnVzWzFdKSAqIDAuNSAvIGhcbiAgICAgICAgXTtcbiAgICB9O1xuXG4gICAgdHJhY2UuZHh5ZGJfcm91Z2ggPSBmdW5jdGlvbihhLCBiLCByZWxkaWZmKSB7XG4gICAgICAgIHZhciBoID0gYnJhbmdlICogKHJlbGRpZmYgfHwgMC4xKTtcbiAgICAgICAgdmFyIHBsdXMgPSB0cmFjZS5hYjJ4eShhLCBiICsgaCwgdHJ1ZSk7XG4gICAgICAgIHZhciBtaW51cyA9IHRyYWNlLmFiMnh5KGEsIGIgLSBoLCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgKHBsdXNbMF0gLSBtaW51c1swXSkgKiAwLjUgLyBoLFxuICAgICAgICAgICAgKHBsdXNbMV0gLSBtaW51c1sxXSkgKiAwLjUgLyBoXG4gICAgICAgIF07XG4gICAgfTtcblxuICAgIHRyYWNlLmRwZHggPSBmdW5jdGlvbih4YSkge1xuICAgICAgICByZXR1cm4geGEuX207XG4gICAgfTtcblxuICAgIHRyYWNlLmRwZHkgPSBmdW5jdGlvbih5YSkge1xuICAgICAgICByZXR1cm4geWEuX207XG4gICAgfTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuLypcbiAqIEdpdmVuIGEgMkQgYXJyYXkgYXMgd2VsbCBhcyBhIGJhc2lzIGluIGVpdGhlciBkaXJlY3Rpb24sIHRoaXMgZnVuY3Rpb24gZmlsbHMgaW4gdGhlXG4gKiAyRCBhcnJheSB1c2luZyBhIGNvbWJpbmF0aW9uIG9mIHNtb290aGluZyBhbmQgZXh0cmFwb2xhdGlvbi4gVGhpcyBpcyByYXRoZXIgaW1wb3J0YW50XG4gKiBmb3IgY2FycGV0IHBsb3RzIHNpbmNlIGl0J3MgdXNlZCBmb3IgbGF5b3V0IHNvIHRoYXQgd2UgY2FuJ3Qgc2ltcGx5IG9taXQgb3IgYmxhbmsgb3V0XG4gKiBwb2ludHMuIFdlIG5lZWQgYSByZWFzb25hYmxlIGd1ZXNzIHNvIHRoYXQgdGhlIGludGVycG9sYXRpb24gcHV0cyBwb2ludHMgc29tZXdoZXJlXG4gKiBldmVuIGlmIHdlIHdlcmUgdG8gc29tZWhvdyByZXByZXNlbnQgdGhhdCB0aGUgZGF0YSB3YXMgbWlzc2luZyBsYXRlciBvbi5cbiAqXG4gKiBpbnB1dDpcbiAqICAtIGRhdGE6IDJEIGFycmF5IG9mIGFycmF5c1xuICogIC0gYTogYXJyYXkgc3VjaCB0aGF0IGEubGVuZ3RoID09PSBkYXRhWzBdLmxlbmd0aFxuICogIC0gYjogYXJyYXkgc3VjaCB0aGF0IGIubGVuZ3RoID09PSBkYXRhLmxlbmd0aFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNtb290aEZpbGwyZEFycmF5KGRhdGEsIGEsIGIpIHtcbiAgICB2YXIgaSwgaiwgaztcbiAgICB2YXIgaXAgPSBbXTtcbiAgICB2YXIganAgPSBbXTtcbiAgICAvLyB2YXIgbmVpZ2hib3JDbnRzID0gW107XG5cbiAgICB2YXIgbmkgPSBkYXRhWzBdLmxlbmd0aDtcbiAgICB2YXIgbmogPSBkYXRhLmxlbmd0aDtcblxuICAgIGZ1bmN0aW9uIGF2Z1N1cnJvdW5kaW5nKGksIGopIHtcbiAgICAgICAgLy8gQXMgYSBsb3ctcXVhbGl0eSBzdGFydCwgd2UgY2FuIHNpbXBseSBhdmVyYWdlIHN1cnJvdW5kaW5nIHBvaW50cyAoaW4gYSBub3RcbiAgICAgICAgLy8gbm9uLXVuaWZvcm0gZ3JpZCBhd2FyZSBtYW5uZXIpOlxuICAgICAgICB2YXIgc3VtID0gMC4wO1xuICAgICAgICB2YXIgdmFsO1xuICAgICAgICB2YXIgY250ID0gMDtcbiAgICAgICAgaWYoaSA+IDAgJiYgKHZhbCA9IGRhdGFbal1baSAtIDFdKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgIHN1bSArPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaSA8IG5pIC0gMSAmJiAodmFsID0gZGF0YVtqXVtpICsgMV0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgc3VtICs9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICBpZihqID4gMCAmJiAodmFsID0gZGF0YVtqIC0gMV1baV0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgc3VtICs9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICBpZihqIDwgbmogLSAxICYmICh2YWwgPSBkYXRhW2ogKyAxXVtpXSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICBzdW0gKz0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW0gLyBNYXRoLm1heCgxLCBjbnQpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgbG9vcCBpdGVyYXRlcyBvdmVyIGFsbCBjZWxscy4gQW55IGNlbGxzIHRoYXQgYXJlIG51bGwgd2lsbCBiZSBub3RlZCBhbmQgdGhvc2VcbiAgICAvLyBhcmUgdGhlIG9ubHkgcG9pbnRzIHdlIHdpbGwgbG9vcCBvdmVyIGFuZCB1cGRhdGUgdmlhIGxhcGxhY2UncyBlcXVhdGlvbi4gUG9pbnRzIHdpdGhcbiAgICAvLyBhbnkgbmVpZ2hib3JzIHdpbGwgcmVjZWl2ZSB0aGUgYXZlcmFnZS4gSWYgdGhlcmUgYXJlIG5vIG5laWdoYm9yaW5nIHBvaW50cywgdGhlbiB0aGV5XG4gICAgLy8gd2lsbCBiZSBzZXQgdG8gemVyby4gQWxzbyBhcyB3ZSBnbywgdHJhY2sgdGhlIG1heGltdW0gbWFnbml0dWRlIHNvIHRoYXQgd2UgY2FuIHNjYWxlXG4gICAgLy8gb3VyIHRvbGVyYW5jZSBhY2NvcmRpbmdseS5cbiAgICB2YXIgZG1heCA9IDAuMDtcbiAgICBmb3IoaSA9IDA7IGkgPCBuaTsgaSsrKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IG5qOyBqKyspIHtcbiAgICAgICAgICAgIGlmKGRhdGFbal1baV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlwLnB1c2goaSk7XG4gICAgICAgICAgICAgICAganAucHVzaChqKTtcblxuICAgICAgICAgICAgICAgIGRhdGFbal1baV0gPSBhdmdTdXJyb3VuZGluZyhpLCBqKTtcbiAgICAgICAgICAgICAgICAvLyBuZWlnaGJvckNudHMucHVzaChyZXN1bHQubmVpZ2hib3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRtYXggPSBNYXRoLm1heChkbWF4LCBNYXRoLmFicyhkYXRhW2pdW2ldKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZighaXAubGVuZ3RoKSByZXR1cm4gZGF0YTtcblxuICAgIC8vIFRoZSB0b2xlcmFuY2UgZG9lc24ndCBuZWVkIHRvIGJlIGV4Y2Vzc2l2ZS4gSXQncyBqdXN0IGZvciBkaXNwbGF5IHBvc2l0aW9uaW5nXG4gICAgdmFyIGR4cCwgZHhtLCBkYXAsIGRhbSwgZGJwLCBkYm0sIGMsIGQsIGRpZmYsIHJlbGRpZmYsIG92ZXJyZWxheGF0aW9uO1xuICAgIHZhciB0b2wgPSAxZS01O1xuICAgIHZhciByZXNpZCA9IDA7XG4gICAgdmFyIGl0ZXJtYXggPSAxMDA7XG4gICAgdmFyIGl0ZXIgPSAwO1xuICAgIHZhciBuID0gaXAubGVuZ3RoO1xuICAgIGRvIHtcbiAgICAgICAgcmVzaWQgPSAwO1xuICAgICAgICAvLyBOb3JtYWxseSB3ZSdkIGxvb3AgaW4gdHdvIGRpbWVuc2lvbnMsIGJ1dCBub3QgYWxsIHBvaW50cyBhcmUgYmxhbmsgYW5kIG5lZWRcbiAgICAgICAgLy8gYW4gdXBkYXRlLCBzbyB3ZSBpbnN0ZWFkIGxvb3Agb25seSBvdmVyIHRoZSBwb2ludHMgdGhhdCB3ZXJlIHRhYnVsYXRlZCBhYm92ZVxuICAgICAgICBmb3IoayA9IDA7IGsgPCBuOyBrKyspIHtcbiAgICAgICAgICAgIGkgPSBpcFtrXTtcbiAgICAgICAgICAgIGogPSBqcFtrXTtcbiAgICAgICAgICAgIC8vIG5laWdoYm9yQ250ID0gbmVpZ2hib3JDbnRzW2tdO1xuXG4gICAgICAgICAgICAvLyBUcmFjayBhIGNvdW50ZXIgZm9yIGhvdyBtYW55IGNvbnRyaWJ1dGlvbnMgdGhlcmUgYXJlLiBXZSdsbCB1c2UgdGhpcyBjb3VudGVyXG4gICAgICAgICAgICAvLyB0byBhdmVyYWdlIGF0IHRoZSBlbmQsIHdoaWNoIHJlZHVjZXMgdG8gbGFwbGFjZSdzIGVxdWF0aW9uIHdpdGggbmV1bWFubiBib3VuZGFyeVxuICAgICAgICAgICAgLy8gY29uZGl0aW9ucyBvbiB0aGUgZmlyc3QgZGVyaXZhdGl2ZSAoc2Vjb25kIGRlcml2YXRpdmUgaXMgemVybyBzbyB0aGF0IHdlIGdldFxuICAgICAgICAgICAgLy8gYSBuaWNlIGxpbmVhciBleHRyYXBvbGF0aW9uIGF0IHRoZSBib3VuZGFyaWVzKS5cbiAgICAgICAgICAgIHZhciBib3VuZGFyeUNudCA9IDA7XG4gICAgICAgICAgICB2YXIgbmV3VmFsID0gMDtcblxuICAgICAgICAgICAgdmFyIGQwLCBkMSwgeDAsIHgxLCBpMCwgajA7XG4gICAgICAgICAgICBpZihpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBsaWVzIGFsb25nIHRoZSBpID0gMCBib3VuZGFyeSwgZXh0cmFwb2xhdGUgZnJvbSB0aGUgdHdvIHBvaW50c1xuICAgICAgICAgICAgICAgIC8vIHRvIHRoZSByaWdodCBvZiB0aGlzIHBvaW50LiBOb3RlIHRoYXQgdGhlIGZpbml0ZSBkaWZmZXJlbmNlcyB0YWtlIGludG9cbiAgICAgICAgICAgICAgICAvLyBhY2NvdW50IG5vbi11bmlmb3JtIGdyaWQgc3BhY2luZzpcbiAgICAgICAgICAgICAgICBpMCA9IE1hdGgubWluKG5pIC0gMSwgMik7XG4gICAgICAgICAgICAgICAgeDAgPSBhW2kwXTtcbiAgICAgICAgICAgICAgICB4MSA9IGFbMV07XG4gICAgICAgICAgICAgICAgZDAgPSBkYXRhW2pdW2kwXTtcbiAgICAgICAgICAgICAgICBkMSA9IGRhdGFbal1bMV07XG4gICAgICAgICAgICAgICAgbmV3VmFsICs9IGQxICsgKGQxIC0gZDApICogKGFbMF0gLSB4MSkgLyAoeDEgLSB4MCk7XG4gICAgICAgICAgICAgICAgYm91bmRhcnlDbnQrKztcbiAgICAgICAgICAgIH0gZWxzZSBpZihpID09PSBuaSAtIDEpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBhbG9uZyB0aGUgaGlnaCBpIGJvdW5kYXJ5LCBleHRyYXBvbGF0ZSBmcm9tIHRoZSB0d28gcG9pbnRzIHRvIHRoZVxuICAgICAgICAgICAgICAgIC8vIGxlZnQgb2YgdGhpcyBwb2ludFxuICAgICAgICAgICAgICAgIGkwID0gTWF0aC5tYXgoMCwgbmkgLSAzKTtcbiAgICAgICAgICAgICAgICB4MCA9IGFbaTBdO1xuICAgICAgICAgICAgICAgIHgxID0gYVtuaSAtIDJdO1xuICAgICAgICAgICAgICAgIGQwID0gZGF0YVtqXVtpMF07XG4gICAgICAgICAgICAgICAgZDEgPSBkYXRhW2pdW25pIC0gMl07XG4gICAgICAgICAgICAgICAgbmV3VmFsICs9IGQxICsgKGQxIC0gZDApICogKGFbbmkgLSAxXSAtIHgxKSAvICh4MSAtIHgwKTtcbiAgICAgICAgICAgICAgICBib3VuZGFyeUNudCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigoaSA9PT0gMCB8fCBpID09PSBuaSAtIDEpICYmIChqID4gMCAmJiBqIDwgbmogLSAxKSkge1xuICAgICAgICAgICAgICAgIC8vIElmIGFsb25nIHRoZSBtaW4oaSkgb3IgbWF4KGkpIGJvdW5kYXJpZXMsIGFsc28gc21vb3RoIHZlcnRpY2FsbHkgYXMgbG9uZ1xuICAgICAgICAgICAgICAgIC8vIGFzIHdlJ3JlIG5vdCBpbiBhIGNvcm5lci4gTm90ZSB0aGF0IHRoZSBmaW5pdGUgZGlmZmVyZW5jZXMgdXNlZCBoZXJlXG4gICAgICAgICAgICAgICAgLy8gYXJlIGFsc28gYXdhcmUgb2Ygbm9udW5pZm9ybSBncmlkIHNwYWNpbmc6XG4gICAgICAgICAgICAgICAgZHhwID0gYltqICsgMV0gLSBiW2pdO1xuICAgICAgICAgICAgICAgIGR4bSA9IGJbal0gLSBiW2ogLSAxXTtcbiAgICAgICAgICAgICAgICBuZXdWYWwgKz0gKGR4bSAqIGRhdGFbaiArIDFdW2ldICsgZHhwICogZGF0YVtqIC0gMV1baV0pIC8gKGR4bSArIGR4cCk7XG4gICAgICAgICAgICAgICAgYm91bmRhcnlDbnQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIElmIGFsb25nIHRoZSBqID0gMCBib3VuZGFyeSwgZXh0cnBvbGF0ZSB0aGlzIHBvaW50IGZyb20gdGhlIHR3byBwb2ludHNcbiAgICAgICAgICAgICAgICAvLyBhYm92ZSBpdFxuICAgICAgICAgICAgICAgIGowID0gTWF0aC5taW4obmogLSAxLCAyKTtcbiAgICAgICAgICAgICAgICB4MCA9IGJbajBdO1xuICAgICAgICAgICAgICAgIHgxID0gYlsxXTtcbiAgICAgICAgICAgICAgICBkMCA9IGRhdGFbajBdW2ldO1xuICAgICAgICAgICAgICAgIGQxID0gZGF0YVsxXVtpXTtcbiAgICAgICAgICAgICAgICBuZXdWYWwgKz0gZDEgKyAoZDEgLSBkMCkgKiAoYlswXSAtIHgxKSAvICh4MSAtIHgwKTtcbiAgICAgICAgICAgICAgICBib3VuZGFyeUNudCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGogPT09IG5qIC0gMSkge1xuICAgICAgICAgICAgICAgIC8vIFNhbWUgZm9yIHRoZSBtYXggaiBib3VuZGFyeSBmcm9tIHRoZSBjZWxscyBiZWxvdyBpdDpcbiAgICAgICAgICAgICAgICBqMCA9IE1hdGgubWF4KDAsIG5qIC0gMyk7XG4gICAgICAgICAgICAgICAgeDAgPSBiW2owXTtcbiAgICAgICAgICAgICAgICB4MSA9IGJbbmogLSAyXTtcbiAgICAgICAgICAgICAgICBkMCA9IGRhdGFbajBdW2ldO1xuICAgICAgICAgICAgICAgIGQxID0gZGF0YVtuaiAtIDJdW2ldO1xuICAgICAgICAgICAgICAgIG5ld1ZhbCArPSBkMSArIChkMSAtIGQwKSAqIChiW25qIC0gMV0gLSB4MSkgLyAoeDEgLSB4MCk7XG4gICAgICAgICAgICAgICAgYm91bmRhcnlDbnQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoKGogPT09IDAgfHwgaiA9PT0gbmogLSAxKSAmJiAoaSA+IDAgJiYgaSA8IG5pIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3cgYXZlcmFnZSBwb2ludHMgdG8gdGhlIGxlZnQvcmlnaHQgYXMgbG9uZyBhcyBub3QgaW4gYSBjb3JuZXI6XG4gICAgICAgICAgICAgICAgZHhwID0gYVtpICsgMV0gLSBhW2ldO1xuICAgICAgICAgICAgICAgIGR4bSA9IGFbaV0gLSBhW2kgLSAxXTtcbiAgICAgICAgICAgICAgICBuZXdWYWwgKz0gKGR4bSAqIGRhdGFbal1baSArIDFdICsgZHhwICogZGF0YVtqXVtpIC0gMV0pIC8gKGR4bSArIGR4cCk7XG4gICAgICAgICAgICAgICAgYm91bmRhcnlDbnQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIWJvdW5kYXJ5Q250KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgbm9uZSBvZiB0aGUgYWJvdmUgY29uZGl0aW9ucyB3ZXJlIHRyaWdnZXJlZCwgdGhlbiB0aGlzIGlzIGFuIGludGVyaW9yXG4gICAgICAgICAgICAgICAgLy8gcG9pbnQgYW5kIHdlIGNhbiBqdXN0IGRvIGEgbGFwbGFjZSBlcXVhdGlvbiB1cGRhdGUuIEFzIGFib3ZlLCB0aGVzZSBkaWZmZXJlbmNlc1xuICAgICAgICAgICAgICAgIC8vIGFyZSBhd2FyZSBvZiBub251bmlmb3JtIGdyaWQgc3BhY2luZzpcbiAgICAgICAgICAgICAgICBkYXAgPSBhW2kgKyAxXSAtIGFbaV07XG4gICAgICAgICAgICAgICAgZGFtID0gYVtpXSAtIGFbaSAtIDFdO1xuICAgICAgICAgICAgICAgIGRicCA9IGJbaiArIDFdIC0gYltqXTtcbiAgICAgICAgICAgICAgICBkYm0gPSBiW2pdIC0gYltqIC0gMV07XG5cbiAgICAgICAgICAgICAgICAvLyBUaGVzZSBhcmUganVzdCBzb21lIHVzZWZ1bCBjb25zdGFudHMgZm9yIHRoZSBpdGVyYXRpb24sIHdoaWNoIGlzIHBlcmZlY3RseVxuICAgICAgICAgICAgICAgIC8vIHN0cmFpZ2h0Zm9yd2FyZCBidXQgYSBsaXR0bGUgbG9uZyB0byBkZXJpdmUgZnJvbSBmX3h4ICsgZl95eSA9IDAuXG4gICAgICAgICAgICAgICAgYyA9IGRhcCAqIGRhbSAqIChkYXAgKyBkYW0pO1xuICAgICAgICAgICAgICAgIGQgPSBkYnAgKiBkYm0gKiAoZGJwICsgZGJtKTtcblxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IChjICogKGRibSAqIGRhdGFbaiArIDFdW2ldICsgZGJwICogZGF0YVtqIC0gMV1baV0pICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZCAqIChkYW0gKiBkYXRhW2pdW2kgKyAxXSArIGRhcCAqIGRhdGFbal1baSAtIDFdKSkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAoZCAqIChkYW0gKyBkYXApICsgYyAqIChkYm0gKyBkYnApKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZGlkIGhhdmUgY29udHJpYnV0aW9ucyBmcm9tIHRoZSBib3VuZGFyeSBjb25kaXRpb25zLCB0aGVuIGF2ZXJhZ2VcbiAgICAgICAgICAgICAgICAvLyB0aGUgcmVzdWx0IGZyb20gdGhlIHZhcmlvdXMgY29udHJpYnV0aW9uczpcbiAgICAgICAgICAgICAgICBuZXdWYWwgLz0gYm91bmRhcnlDbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEphY29iaSB1cGRhdGVzIGFyZSByaWRpY3Vsb3VzbHkgc2xvdyB0byBjb252ZXJnZSwgc28gdGhpcyBhcHByb2FjaCB1c2VzIGFcbiAgICAgICAgICAgIC8vIEdhdXNzLXNlaWRlbCBpdGVyYXRpb24gd2hpY2ggaXMgZHJhbWF0aWNhbGx5IGZhc3Rlci5cbiAgICAgICAgICAgIGRpZmYgPSBuZXdWYWwgLSBkYXRhW2pdW2ldO1xuICAgICAgICAgICAgcmVsZGlmZiA9IGRpZmYgLyBkbWF4O1xuICAgICAgICAgICAgcmVzaWQgKz0gcmVsZGlmZiAqIHJlbGRpZmY7XG5cbiAgICAgICAgICAgIC8vIEdhdXNzLVNlaWRlbC1pc2ggaXRlcmF0aW9uLCBvbWVnYSBjaG9zZW4gYmFzZWQgb24gaGV1cmlzdGljcyBhbmQgc29tZVxuICAgICAgICAgICAgLy8gcXVpY2sgdGVzdHMuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gTkI6IERvbid0IG92ZXJyZWxheCB0aGUgYm91bmRhcmllLiBPdGhlcndpc2Ugc2V0IGFuIG92ZXJyZWxheGF0aW9uIGZhY3RvclxuICAgICAgICAgICAgLy8gd2hpY2ggaXMgYSBsaXR0bGUgbG93IGJ1dCBzYWZlbHkgb3B0aW1hbC1pc2g6XG4gICAgICAgICAgICBvdmVycmVsYXhhdGlvbiA9IGJvdW5kYXJ5Q250ID8gMCA6IDAuODU7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBmb3VyIG5vbi1udWxsIG5laWdoYm9ycywgdGhlbiB3ZSB3YW50IGEgc2ltcGxlIGF2ZXJhZ2Ugd2l0aG91dFxuICAgICAgICAgICAgLy8gb3ZlcnJlbGF4YXRpb24uIElmIGFsbCB0aGUgc3Vycm91ZGluZyBwb2ludHMgYXJlIG51bGwsIHRoZW4gd2Ugd2FudCB0aGUgZnVsbFxuICAgICAgICAgICAgLy8gb3ZlcnJlbGF4YXRpb25cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBCYXNlZCBvbiBleHBlcmltZW50cywgdGhpcyBhY3R1YWxseSBzZWVtcyB0byBzbG93IGRvd24gY29udmVyZ2VuY2UganVzdCBhIGJpdC5cbiAgICAgICAgICAgIC8vIEknbGwgbGVhdmUgaXQgaGVyZSBmb3IgcmVmZXJlbmNlIGluIGNhc2UgdGhpcyBuZWVkcyB0byBiZSByZXZpc2l0ZWQsIGJ1dFxuICAgICAgICAgICAgLy8gaXQgc2VlbXMgdG8gd29yayBqdXN0IGZpbmUgd2l0aG91dCB0aGlzLlxuICAgICAgICAgICAgLy8gaWYgKG92ZXJyZWxheGF0aW9uKSBvdmVycmVsYXhhdGlvbiAqPSAoNCAtIG5laWdoYm9yQ250KSAvIDQ7XG5cbiAgICAgICAgICAgIGRhdGFbal1baV0gKz0gZGlmZiAqICgxICsgb3ZlcnJlbGF4YXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzaWQgPSBNYXRoLnNxcnQocmVzaWQpO1xuICAgIH0gd2hpbGUoaXRlcisrIDwgaXRlcm1heCAmJiByZXNpZCA+IHRvbCk7XG5cbiAgICBMaWIubG9nKCdTbW9vdGhlciBjb252ZXJnZWQgdG8nLCByZXNpZCwgJ2FmdGVyJywgaXRlciwgJ2l0ZXJhdGlvbnMnKTtcblxuICAgIHJldHVybiBkYXRhO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheTFEID0gcmVxdWlyZSgnLi4vLi4vbGliJykuaXNBcnJheTFEO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVhZRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSkge1xuICAgIHZhciB4ID0gY29lcmNlKCd4Jyk7XG4gICAgdmFyIGhhc1ggPSB4ICYmIHgubGVuZ3RoO1xuICAgIHZhciB5ID0gY29lcmNlKCd5Jyk7XG4gICAgdmFyIGhhc1kgPSB5ICYmIHkubGVuZ3RoO1xuICAgIGlmKCFoYXNYICYmICFoYXNZKSByZXR1cm4gZmFsc2U7XG5cbiAgICB0cmFjZU91dC5fY2hlYXRlciA9ICF4O1xuXG4gICAgaWYoKCFoYXNYIHx8IGlzQXJyYXkxRCh4KSkgJiYgKCFoYXNZIHx8IGlzQXJyYXkxRCh5KSkpIHtcbiAgICAgICAgdmFyIGxlbiA9IGhhc1ggPyB4Lmxlbmd0aCA6IEluZmluaXR5O1xuICAgICAgICBpZihoYXNZKSBsZW4gPSBNYXRoLm1pbihsZW4sIHkubGVuZ3RoKTtcbiAgICAgICAgaWYodHJhY2VPdXQuYSAmJiB0cmFjZU91dC5hLmxlbmd0aCkgbGVuID0gTWF0aC5taW4obGVuLCB0cmFjZU91dC5hLmxlbmd0aCk7XG4gICAgICAgIGlmKHRyYWNlT3V0LmIgJiYgdHJhY2VPdXQuYi5sZW5ndGgpIGxlbiA9IE1hdGgubWluKGxlbiwgdHJhY2VPdXQuYi5sZW5ndGgpO1xuICAgICAgICB0cmFjZU91dC5fbGVuZ3RoID0gbGVuO1xuICAgIH0gZWxzZSB0cmFjZU91dC5fbGVuZ3RoID0gbnVsbDtcblxuICAgIHJldHVybiB0cnVlO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=