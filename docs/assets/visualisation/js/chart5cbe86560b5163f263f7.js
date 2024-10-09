(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_src_plots_subplot_defaults_js-node_modules_plotly_js_src_traces_bar_ar-2fb8eb"],{

/***/ "./node_modules/plotly.js/src/plots/domain.js":
/*!****************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/domain.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var extendFlat = __webpack_require__(/*! ../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

/**
 * Make a xy domain attribute group
 *
 * @param {object} opts
 *   @param {string}
 *     opts.name: name to be inserted in the default description
 *   @param {boolean}
 *     opts.trace: set to true for trace containers
 *   @param {string}
 *     opts.editType: editType for all pieces
 *   @param {boolean}
 *     opts.noGridCell: set to true to omit `row` and `column`
 *
 * @param {object} extra
 *   @param {string}
 *     extra.description: extra description. N.B we use
 *     a separate extra container to make it compatible with
 *     the compress_attributes transform.
 *
 * @return {object} attributes object containing {x,y} as specified
 */
exports.attributes = function(opts, extra) {
    opts = opts || {};
    extra = extra || {};

    var base = {
        valType: 'info_array',
        role: 'info',
        editType: opts.editType,
        items: [
            {valType: 'number', min: 0, max: 1, editType: opts.editType},
            {valType: 'number', min: 0, max: 1, editType: opts.editType}
        ],
        dflt: [0, 1]
    };

    var namePart = opts.name ? opts.name + ' ' : '';
    var contPart = opts.trace ? 'trace ' : 'subplot ';
    var descPart = extra.description ? ' ' + extra.description : '';

    var out = {
        x: extendFlat({}, base, {
            description: [
                'Sets the horizontal domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        y: extendFlat({}, base, {
            description: [
                'Sets the vertical domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        editType: opts.editType
    };

    if(!opts.noGridCell) {
        out.row = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this row in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
        out.column = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this column in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
    }

    return out;
};

exports.defaults = function(containerOut, layout, coerce, dfltDomains) {
    var dfltX = (dfltDomains && dfltDomains.x) || [0, 1];
    var dfltY = (dfltDomains && dfltDomains.y) || [0, 1];

    var grid = layout.grid;
    if(grid) {
        var column = coerce('domain.column');
        if(column !== undefined) {
            if(column < grid.columns) dfltX = grid._domains.x[column];
            else delete containerOut.domain.column;
        }

        var row = coerce('domain.row');
        if(row !== undefined) {
            if(row < grid.rows) dfltY = grid._domains.y[row];
            else delete containerOut.domain.row;
        }
    }

    var x = coerce('domain.x', dfltX);
    var y = coerce('domain.y', dfltY);

    // don't accept bad input data
    if(!(x[0] < x[1])) containerOut.domain.x = dfltX.slice();
    if(!(y[0] < y[1])) containerOut.domain.y = dfltY.slice();
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/subplot_defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/subplot_defaults.js ***!
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




var Lib = __webpack_require__(/*! ../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Template = __webpack_require__(/*! ../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");
var handleDomainDefaults = __webpack_require__(/*! ./domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;


/**
 * Find and supply defaults to all subplots of a given type
 * This handles subplots that are contained within one container - so
 * gl3d, geo, ternary... but not 2d axes which have separate x and y axes
 * finds subplots, coerces their `domain` attributes, then calls the
 * given handleDefaults function to fill in everything else.
 *
 * layoutIn: the complete user-supplied input layout
 * layoutOut: the complete finished layout
 * fullData: the finished data array, used only to find subplots
 * opts: {
 *  type: subplot type string
 *  attributes: subplot attributes object
 *  partition: 'x' or 'y', which direction to divide domain space by default
 *      (default 'x', ie side-by-side subplots)
 *      TODO: this option is only here because 3D and geo made opposite
 *      choices in this regard previously and I didn't want to change it.
 *      Instead we should do:
 *      - something consistent
 *      - something more square (4 cuts 2x2, 5/6 cuts 2x3, etc.)
 *      - something that includes all subplot types in one arrangement,
 *        now that we can have them together!
 *  handleDefaults: function of (subplotLayoutIn, subplotLayoutOut, coerce, opts)
 *      this opts object is passed through to handleDefaults, so attach any
 *      additional items needed by this function here as well
 * }
 */
module.exports = function handleSubplotDefaults(layoutIn, layoutOut, fullData, opts) {
    var subplotType = opts.type;
    var subplotAttributes = opts.attributes;
    var handleDefaults = opts.handleDefaults;
    var partition = opts.partition || 'x';

    var ids = layoutOut._subplots[subplotType];
    var idsLength = ids.length;

    var baseId = idsLength && ids[0].replace(/\d+$/, '');

    var subplotLayoutIn, subplotLayoutOut;

    function coerce(attr, dflt) {
        return Lib.coerce(subplotLayoutIn, subplotLayoutOut, subplotAttributes, attr, dflt);
    }

    for(var i = 0; i < idsLength; i++) {
        var id = ids[i];

        // ternary traces get a layout ternary for free!
        if(layoutIn[id]) subplotLayoutIn = layoutIn[id];
        else subplotLayoutIn = layoutIn[id] = {};

        subplotLayoutOut = Template.newContainer(layoutOut, id, baseId);

        // All subplot containers get a `uirevision` inheriting from the base.
        // Currently all subplots containers have some user interaction
        // attributes, but if we ever add one that doesn't, we would need an
        // option to skip this step.
        coerce('uirevision', layoutOut.uirevision);

        var dfltDomains = {};
        dfltDomains[partition] = [i / idsLength, (i + 1) / idsLength];
        handleDomainDefaults(subplotLayoutOut, layoutOut, coerce, dfltDomains);

        opts.id = id;
        handleDefaults(subplotLayoutIn, subplotLayoutOut, coerce, opts);
    }
};


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

/***/ "./node_modules/plotly.js/src/traces/bar/helpers.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/helpers.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

exports.coerceString = function(attributeDefinition, value, defaultValue) {
    if(typeof value === 'string') {
        if(value || !attributeDefinition.noBlank) return value;
    } else if(typeof value === 'number' || value === true) {
        if(!attributeDefinition.strict) return String(value);
    }

    return (defaultValue !== undefined) ?
      defaultValue :
      attributeDefinition.dflt;
};

exports.coerceNumber = function(attributeDefinition, value, defaultValue) {
    if(isNumeric(value)) {
        value = +value;

        var min = attributeDefinition.min;
        var max = attributeDefinition.max;
        var isOutOfBounds = (min !== undefined && value < min) ||
              (max !== undefined && value > max);

        if(!isOutOfBounds) return value;
    }

    return (defaultValue !== undefined) ?
      defaultValue :
      attributeDefinition.dflt;
};

exports.coerceColor = function(attributeDefinition, value, defaultValue) {
    if(tinycolor(value).isValid()) return value;

    return (defaultValue !== undefined) ?
      defaultValue :
      attributeDefinition.dflt;
};

exports.coerceEnumerated = function(attributeDefinition, value, defaultValue) {
    if(attributeDefinition.coerceNumber) value = +value;

    if(attributeDefinition.values.indexOf(value) !== -1) return value;

    return (defaultValue !== undefined) ?
      defaultValue :
      attributeDefinition.dflt;
};

exports.getValue = function(arrayOrScalar, index) {
    var value;
    if(!Array.isArray(arrayOrScalar)) value = arrayOrScalar;
    else if(index < arrayOrScalar.length) value = arrayOrScalar[index];
    return value;
};

exports.getLineWidth = function(trace, di) {
    var w =
        (0 < di.mlw) ? di.mlw :
        !isArrayOrTypedArray(trace.marker.line.width) ? trace.marker.line.width :
        0;

    return w;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/style.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/style.js ***!
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
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

var resizeText = __webpack_require__(/*! ./uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").resizeText;
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js");
var attributeTextFont = attributes.textfont;
var attributeInsideTextFont = attributes.insidetextfont;
var attributeOutsideTextFont = attributes.outsidetextfont;
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/traces/bar/helpers.js");

function style(gd) {
    var s = d3.select(gd).selectAll('g.barlayer').selectAll('g.trace');
    resizeText(gd, s, 'bar');

    var barcount = s.size();
    var fullLayout = gd._fullLayout;

    // trace styling
    s.style('opacity', function(d) { return d[0].trace.opacity; })

    // for gapless (either stacked or neighboring grouped) bars use
    // crispEdges to turn off antialiasing so an artificial gap
    // isn't introduced.
    .each(function(d) {
        if((fullLayout.barmode === 'stack' && barcount > 1) ||
                (fullLayout.bargap === 0 &&
                 fullLayout.bargroupgap === 0 &&
                 !d[0].trace.marker.line.width)) {
            d3.select(this).attr('shape-rendering', 'crispEdges');
        }
    });

    s.selectAll('g.points').each(function(d) {
        var sel = d3.select(this);
        var trace = d[0].trace;
        stylePoints(sel, trace, gd);
    });

    Registry.getComponentMethod('errorbars', 'style')(s);
}

function stylePoints(sel, trace, gd) {
    Drawing.pointStyle(sel.selectAll('path'), trace, gd);
    styleTextPoints(sel, trace, gd);
}

function styleTextPoints(sel, trace, gd) {
    sel.selectAll('text').each(function(d) {
        var tx = d3.select(this);
        var font = Lib.ensureUniformFontSize(gd, determineFont(tx, d, trace, gd));

        Drawing.font(tx, font);
    });
}

function styleOnSelect(gd, cd, sel) {
    var trace = cd[0].trace;

    if(trace.selectedpoints) {
        stylePointsInSelectionMode(sel, trace, gd);
    } else {
        stylePoints(sel, trace, gd);
        Registry.getComponentMethod('errorbars', 'style')(sel);
    }
}

function stylePointsInSelectionMode(s, trace, gd) {
    Drawing.selectedPointStyle(s.selectAll('path'), trace);
    styleTextInSelectionMode(s.selectAll('text'), trace, gd);
}

function styleTextInSelectionMode(txs, trace, gd) {
    txs.each(function(d) {
        var tx = d3.select(this);
        var font;

        if(d.selected) {
            font = Lib.ensureUniformFontSize(gd, determineFont(tx, d, trace, gd));

            var selectedFontColor = trace.selected.textfont && trace.selected.textfont.color;
            if(selectedFontColor) {
                font.color = selectedFontColor;
            }

            Drawing.font(tx, font);
        } else {
            Drawing.selectedTextStyle(tx, trace);
        }
    });
}

function determineFont(tx, d, trace, gd) {
    var layoutFont = gd._fullLayout.font;
    var textFont = trace.textfont;

    if(tx.classed('bartext-inside')) {
        var barColor = getBarColor(d, trace);
        textFont = getInsideTextFont(trace, d.i, layoutFont, barColor);
    } else if(tx.classed('bartext-outside')) {
        textFont = getOutsideTextFont(trace, d.i, layoutFont);
    }

    return textFont;
}

function getTextFont(trace, index, defaultValue) {
    return getFontValue(
      attributeTextFont, trace.textfont, index, defaultValue);
}

function getInsideTextFont(trace, index, layoutFont, barColor) {
    var defaultFont = getTextFont(trace, index, layoutFont);

    var wouldFallBackToLayoutFont =
      (trace._input.textfont === undefined || trace._input.textfont.color === undefined) ||
      (Array.isArray(trace.textfont.color) && trace.textfont.color[index] === undefined);
    if(wouldFallBackToLayoutFont) {
        defaultFont = {
            color: Color.contrast(barColor),
            family: defaultFont.family,
            size: defaultFont.size
        };
    }

    return getFontValue(
      attributeInsideTextFont, trace.insidetextfont, index, defaultFont);
}

function getOutsideTextFont(trace, index, layoutFont) {
    var defaultFont = getTextFont(trace, index, layoutFont);
    return getFontValue(
      attributeOutsideTextFont, trace.outsidetextfont, index, defaultFont);
}

function getFontValue(attributeDefinition, attributeValue, index, defaultValue) {
    attributeValue = attributeValue || {};

    var familyValue = helpers.getValue(attributeValue.family, index);
    var sizeValue = helpers.getValue(attributeValue.size, index);
    var colorValue = helpers.getValue(attributeValue.color, index);

    return {
        family: helpers.coerceString(
          attributeDefinition.family, familyValue, defaultValue.family),
        size: helpers.coerceNumber(
          attributeDefinition.size, sizeValue, defaultValue.size),
        color: helpers.coerceColor(
          attributeDefinition.color, colorValue, defaultValue.color)
    };
}

function getBarColor(cd, trace) {
    if(trace.type === 'waterfall') {
        return trace[cd.dir].marker.color;
    }
    return cd.mc || trace.marker.color;
}

module.exports = {
    style: style,
    styleTextPoints: styleTextPoints,
    styleOnSelect: styleOnSelect,
    getInsideTextFont: getInsideTextFont,
    getOutsideTextFont: getOutsideTextFont,
    getBarColor: getBarColor,
    resizeText: resizeText
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/style_defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/style_defaults.js ***!
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



var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");

module.exports = function handleStyleDefaults(traceIn, traceOut, coerce, defaultColor, layout) {
    coerce('marker.color', defaultColor);

    if(hasColorscale(traceIn, 'marker')) {
        colorscaleDefaults(
            traceIn, traceOut, layout, coerce, {prefix: 'marker.', cLetter: 'c'}
        );
    }

    coerce('marker.line.color', Color.defaultLine);

    if(hasColorscale(traceIn, 'marker.line')) {
        colorscaleDefaults(
            traceIn, traceOut, layout, coerce, {prefix: 'marker.line.', cLetter: 'c'}
        );
    }

    coerce('marker.line.width');
    coerce('marker.opacity');
    coerce('selected.marker.color');
    coerce('unselected.marker.color');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/bar/uniform_text.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/uniform_text.js ***!
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
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

function resizeText(gd, gTrace, traceType) {
    var fullLayout = gd._fullLayout;
    var minSize = fullLayout['_' + traceType + 'Text_minsize'];
    if(minSize) {
        var shouldHide = fullLayout.uniformtext.mode === 'hide';

        var selector;
        switch(traceType) {
            case 'funnelarea' :
            case 'pie' :
            case 'sunburst' :
                selector = 'g.slice';
                break;
            case 'treemap' :
                selector = 'g.slice, g.pathbar';
                break;
            default :
                selector = 'g.points > g.point';
        }

        gTrace.selectAll(selector).each(function(d) {
            var transform = d.transform;
            if(transform) {
                transform.scale = (shouldHide && transform.hide) ? 0 : minSize / transform.fontSize;

                var el = d3.select(this).select('text');
                el.attr('transform', Lib.getTextTransform(transform));
            }
        });
    }
}

function recordMinTextSize(
    traceType, // in
    transform, // inout
    fullLayout // inout
) {
    if(fullLayout.uniformtext.mode) {
        var minKey = getMinKey(traceType);
        var minSize = fullLayout.uniformtext.minsize;
        var size = transform.scale * transform.fontSize;

        transform.hide = size < minSize;

        fullLayout[minKey] = fullLayout[minKey] || Infinity;
        if(!transform.hide) {
            fullLayout[minKey] = Math.min(
                fullLayout[minKey],
                Math.max(size, minSize)
            );
        }
    }
}

function clearMinTextSize(
    traceType, // in
    fullLayout // inout
) {
    var minKey = getMinKey(traceType);
    fullLayout[minKey] = undefined;
}

function getMinKey(traceType) {
    return '_' + traceType + 'Text_minsize';
}

module.exports = {
    recordMinTextSize: recordMinTextSize,
    clearMinTextSize: clearMinTextSize,
    resizeText: resizeText
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/calc_selection.js ***!
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

module.exports = function calcSelection(cd, trace) {
    if(Lib.isArrayOrTypedArray(trace.selectedpoints)) {
        Lib.tagSelected(cd, trace);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/get_trace_color.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/get_trace_color.js ***!
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




var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var subtypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");


module.exports = function getTraceColor(trace, di) {
    var lc, tc;

    // TODO: text modes

    if(trace.mode === 'lines') {
        lc = trace.line.color;
        return (lc && Color.opacity(lc)) ?
            lc : trace.fillcolor;
    } else if(trace.mode === 'none') {
        return trace.fill ? trace.fillcolor : '';
    } else {
        var mc = di.mcc || (trace.marker || {}).color;
        var mlc = di.mlcc || ((trace.marker || {}).line || {}).color;

        tc = (mc && Color.opacity(mc)) ? mc :
            (mlc && Color.opacity(mlc) &&
                (di.mlw || ((trace.marker || {}).line || {}).width)) ? mlc : '';

        if(tc) {
            // make sure the points aren't TOO transparent
            if(Color.opacity(tc) < 0.3) {
                return Color.addOpacity(tc, 0.3);
            } else return tc;
        } else {
            lc = (trace.line || {}).color;
            return (lc && Color.opacity(lc) &&
                subtypes.hasLines(trace) && trace.line.width) ?
                    lc : trace.fillcolor;
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js ***!
  \**********************************************************************/
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
    container: 'marker',
    min: 'cmin',
    max: 'cmax'
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/marker_defaults.js ***!
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



var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");

var subTypes = __webpack_require__(/*! ./subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");

/*
 * opts: object of flags to control features not all marker users support
 *   noLine: caller does not support marker lines
 *   gradient: caller supports gradients
 *   noSelect: caller does not support selected/unselected attribute containers
 */
module.exports = function markerDefaults(traceIn, traceOut, defaultColor, layout, coerce, opts) {
    var isBubble = subTypes.isBubble(traceIn);
    var lineColor = (traceIn.line || {}).color;
    var defaultMLC;

    opts = opts || {};

    // marker.color inherit from line.color (even if line.color is an array)
    if(lineColor) defaultColor = lineColor;

    coerce('marker.symbol');
    coerce('marker.opacity', isBubble ? 0.7 : 1);
    coerce('marker.size');

    coerce('marker.color', defaultColor);
    if(hasColorscale(traceIn, 'marker')) {
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'marker.', cLetter: 'c'});
    }

    if(!opts.noSelect) {
        coerce('selected.marker.color');
        coerce('unselected.marker.color');
        coerce('selected.marker.size');
        coerce('unselected.marker.size');
    }

    if(!opts.noLine) {
        // if there's a line with a different color than the marker, use
        // that line color as the default marker line color
        // (except when it's an array)
        // mostly this is for transparent markers to behave nicely
        if(lineColor && !Array.isArray(lineColor) && (traceOut.marker.color !== lineColor)) {
            defaultMLC = lineColor;
        } else if(isBubble) defaultMLC = Color.background;
        else defaultMLC = Color.defaultLine;

        coerce('marker.line.color', defaultMLC);
        if(hasColorscale(traceIn, 'marker.line')) {
            colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'marker.line.', cLetter: 'c'});
        }

        coerce('marker.line.width', isBubble ? 1 : 0);
    }

    if(isBubble) {
        coerce('marker.sizeref');
        coerce('marker.sizemin');
        coerce('marker.sizemode');
    }

    if(opts.gradient) {
        var gradientType = coerce('marker.gradient.type');
        if(gradientType !== 'none') {
            coerce('marker.gradient.color');
        }
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZG9tYWluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9zdWJwbG90X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2FycmF5c190b19jYWxjZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9oZWxwZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL3N0eWxlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL3N0eWxlX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL3VuaWZvcm1fdGV4dC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvY2FsY19zZWxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL2dldF90cmFjZV9jb2xvci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbWFya2VyX2NvbG9yYmFyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlci9tYXJrZXJfZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUJBQWlCLGlHQUFtQzs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTywrQkFBK0IsSUFBSTtBQUN0RDtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLDJEQUEyRDtBQUN4RSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QztBQUN4Rzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ1Y2JlODY1NjBiNTE2M2YyNjNmNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxuLyoqXG4gKiBNYWtlIGEgeHkgZG9tYWluIGF0dHJpYnV0ZSBncm91cFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMubmFtZTogbmFtZSB0byBiZSBpbnNlcnRlZCBpbiB0aGUgZGVmYXVsdCBkZXNjcmlwdGlvblxuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy50cmFjZTogc2V0IHRvIHRydWUgZm9yIHRyYWNlIGNvbnRhaW5lcnNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5lZGl0VHlwZTogZWRpdFR5cGUgZm9yIGFsbCBwaWVjZXNcbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMubm9HcmlkQ2VsbDogc2V0IHRvIHRydWUgdG8gb21pdCBgcm93YCBhbmQgYGNvbHVtbmBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0cmFcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgZXh0cmEuZGVzY3JpcHRpb246IGV4dHJhIGRlc2NyaXB0aW9uLiBOLkIgd2UgdXNlXG4gKiAgICAgYSBzZXBhcmF0ZSBleHRyYSBjb250YWluZXIgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGhcbiAqICAgICB0aGUgY29tcHJlc3NfYXR0cmlidXRlcyB0cmFuc2Zvcm0uXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBhdHRyaWJ1dGVzIG9iamVjdCBjb250YWluaW5nIHt4LHl9IGFzIHNwZWNpZmllZFxuICovXG5leHBvcnRzLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbihvcHRzLCBleHRyYSkge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGV4dHJhID0gZXh0cmEgfHwge307XG5cbiAgICB2YXIgYmFzZSA9IHtcbiAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9LFxuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9XG4gICAgICAgIF0sXG4gICAgICAgIGRmbHQ6IFswLCAxXVxuICAgIH07XG5cbiAgICB2YXIgbmFtZVBhcnQgPSBvcHRzLm5hbWUgPyBvcHRzLm5hbWUgKyAnICcgOiAnJztcbiAgICB2YXIgY29udFBhcnQgPSBvcHRzLnRyYWNlID8gJ3RyYWNlICcgOiAnc3VicGxvdCAnO1xuICAgIHZhciBkZXNjUGFydCA9IGV4dHJhLmRlc2NyaXB0aW9uID8gJyAnICsgZXh0cmEuZGVzY3JpcHRpb24gOiAnJztcblxuICAgIHZhciBvdXQgPSB7XG4gICAgICAgIHg6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGhvcml6b250YWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIHk6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHZlcnRpY2FsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZVxuICAgIH07XG5cbiAgICBpZighb3B0cy5ub0dyaWRDZWxsKSB7XG4gICAgICAgIG91dC5yb3cgPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyByb3cgaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICAgICAgb3V0LmNvbHVtbiA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIGNvbHVtbiBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5leHBvcnRzLmRlZmF1bHRzID0gZnVuY3Rpb24oY29udGFpbmVyT3V0LCBsYXlvdXQsIGNvZXJjZSwgZGZsdERvbWFpbnMpIHtcbiAgICB2YXIgZGZsdFggPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueCkgfHwgWzAsIDFdO1xuICAgIHZhciBkZmx0WSA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy55KSB8fCBbMCwgMV07XG5cbiAgICB2YXIgZ3JpZCA9IGxheW91dC5ncmlkO1xuICAgIGlmKGdyaWQpIHtcbiAgICAgICAgdmFyIGNvbHVtbiA9IGNvZXJjZSgnZG9tYWluLmNvbHVtbicpO1xuICAgICAgICBpZihjb2x1bW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoY29sdW1uIDwgZ3JpZC5jb2x1bW5zKSBkZmx0WCA9IGdyaWQuX2RvbWFpbnMueFtjb2x1bW5dO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5jb2x1bW47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm93ID0gY29lcmNlKCdkb21haW4ucm93Jyk7XG4gICAgICAgIGlmKHJvdyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihyb3cgPCBncmlkLnJvd3MpIGRmbHRZID0gZ3JpZC5fZG9tYWlucy55W3Jvd107XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLnJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB4ID0gY29lcmNlKCdkb21haW4ueCcsIGRmbHRYKTtcbiAgICB2YXIgeSA9IGNvZXJjZSgnZG9tYWluLnknLCBkZmx0WSk7XG5cbiAgICAvLyBkb24ndCBhY2NlcHQgYmFkIGlucHV0IGRhdGFcbiAgICBpZighKHhbMF0gPCB4WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi54ID0gZGZsdFguc2xpY2UoKTtcbiAgICBpZighKHlbMF0gPCB5WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi55ID0gZGZsdFkuc2xpY2UoKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uL2xpYicpO1xudmFyIFRlbXBsYXRlID0gcmVxdWlyZSgnLi4vcGxvdF9hcGkvcGxvdF90ZW1wbGF0ZScpO1xudmFyIGhhbmRsZURvbWFpbkRlZmF1bHRzID0gcmVxdWlyZSgnLi9kb21haW4nKS5kZWZhdWx0cztcblxuXG4vKipcbiAqIEZpbmQgYW5kIHN1cHBseSBkZWZhdWx0cyB0byBhbGwgc3VicGxvdHMgb2YgYSBnaXZlbiB0eXBlXG4gKiBUaGlzIGhhbmRsZXMgc3VicGxvdHMgdGhhdCBhcmUgY29udGFpbmVkIHdpdGhpbiBvbmUgY29udGFpbmVyIC0gc29cbiAqIGdsM2QsIGdlbywgdGVybmFyeS4uLiBidXQgbm90IDJkIGF4ZXMgd2hpY2ggaGF2ZSBzZXBhcmF0ZSB4IGFuZCB5IGF4ZXNcbiAqIGZpbmRzIHN1YnBsb3RzLCBjb2VyY2VzIHRoZWlyIGBkb21haW5gIGF0dHJpYnV0ZXMsIHRoZW4gY2FsbHMgdGhlXG4gKiBnaXZlbiBoYW5kbGVEZWZhdWx0cyBmdW5jdGlvbiB0byBmaWxsIGluIGV2ZXJ5dGhpbmcgZWxzZS5cbiAqXG4gKiBsYXlvdXRJbjogdGhlIGNvbXBsZXRlIHVzZXItc3VwcGxpZWQgaW5wdXQgbGF5b3V0XG4gKiBsYXlvdXRPdXQ6IHRoZSBjb21wbGV0ZSBmaW5pc2hlZCBsYXlvdXRcbiAqIGZ1bGxEYXRhOiB0aGUgZmluaXNoZWQgZGF0YSBhcnJheSwgdXNlZCBvbmx5IHRvIGZpbmQgc3VicGxvdHNcbiAqIG9wdHM6IHtcbiAqICB0eXBlOiBzdWJwbG90IHR5cGUgc3RyaW5nXG4gKiAgYXR0cmlidXRlczogc3VicGxvdCBhdHRyaWJ1dGVzIG9iamVjdFxuICogIHBhcnRpdGlvbjogJ3gnIG9yICd5Jywgd2hpY2ggZGlyZWN0aW9uIHRvIGRpdmlkZSBkb21haW4gc3BhY2UgYnkgZGVmYXVsdFxuICogICAgICAoZGVmYXVsdCAneCcsIGllIHNpZGUtYnktc2lkZSBzdWJwbG90cylcbiAqICAgICAgVE9ETzogdGhpcyBvcHRpb24gaXMgb25seSBoZXJlIGJlY2F1c2UgM0QgYW5kIGdlbyBtYWRlIG9wcG9zaXRlXG4gKiAgICAgIGNob2ljZXMgaW4gdGhpcyByZWdhcmQgcHJldmlvdXNseSBhbmQgSSBkaWRuJ3Qgd2FudCB0byBjaGFuZ2UgaXQuXG4gKiAgICAgIEluc3RlYWQgd2Ugc2hvdWxkIGRvOlxuICogICAgICAtIHNvbWV0aGluZyBjb25zaXN0ZW50XG4gKiAgICAgIC0gc29tZXRoaW5nIG1vcmUgc3F1YXJlICg0IGN1dHMgMngyLCA1LzYgY3V0cyAyeDMsIGV0Yy4pXG4gKiAgICAgIC0gc29tZXRoaW5nIHRoYXQgaW5jbHVkZXMgYWxsIHN1YnBsb3QgdHlwZXMgaW4gb25lIGFycmFuZ2VtZW50LFxuICogICAgICAgIG5vdyB0aGF0IHdlIGNhbiBoYXZlIHRoZW0gdG9nZXRoZXIhXG4gKiAgaGFuZGxlRGVmYXVsdHM6IGZ1bmN0aW9uIG9mIChzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIGNvZXJjZSwgb3B0cylcbiAqICAgICAgdGhpcyBvcHRzIG9iamVjdCBpcyBwYXNzZWQgdGhyb3VnaCB0byBoYW5kbGVEZWZhdWx0cywgc28gYXR0YWNoIGFueVxuICogICAgICBhZGRpdGlvbmFsIGl0ZW1zIG5lZWRlZCBieSB0aGlzIGZ1bmN0aW9uIGhlcmUgYXMgd2VsbFxuICogfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVN1YnBsb3REZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0LCBmdWxsRGF0YSwgb3B0cykge1xuICAgIHZhciBzdWJwbG90VHlwZSA9IG9wdHMudHlwZTtcbiAgICB2YXIgc3VicGxvdEF0dHJpYnV0ZXMgPSBvcHRzLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGhhbmRsZURlZmF1bHRzID0gb3B0cy5oYW5kbGVEZWZhdWx0cztcbiAgICB2YXIgcGFydGl0aW9uID0gb3B0cy5wYXJ0aXRpb24gfHwgJ3gnO1xuXG4gICAgdmFyIGlkcyA9IGxheW91dE91dC5fc3VicGxvdHNbc3VicGxvdFR5cGVdO1xuICAgIHZhciBpZHNMZW5ndGggPSBpZHMubGVuZ3RoO1xuXG4gICAgdmFyIGJhc2VJZCA9IGlkc0xlbmd0aCAmJiBpZHNbMF0ucmVwbGFjZSgvXFxkKyQvLCAnJyk7XG5cbiAgICB2YXIgc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0O1xuXG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2Uoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBzdWJwbG90QXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGlkc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IGlkc1tpXTtcblxuICAgICAgICAvLyB0ZXJuYXJ5IHRyYWNlcyBnZXQgYSBsYXlvdXQgdGVybmFyeSBmb3IgZnJlZSFcbiAgICAgICAgaWYobGF5b3V0SW5baWRdKSBzdWJwbG90TGF5b3V0SW4gPSBsYXlvdXRJbltpZF07XG4gICAgICAgIGVsc2Ugc3VicGxvdExheW91dEluID0gbGF5b3V0SW5baWRdID0ge307XG5cbiAgICAgICAgc3VicGxvdExheW91dE91dCA9IFRlbXBsYXRlLm5ld0NvbnRhaW5lcihsYXlvdXRPdXQsIGlkLCBiYXNlSWQpO1xuXG4gICAgICAgIC8vIEFsbCBzdWJwbG90IGNvbnRhaW5lcnMgZ2V0IGEgYHVpcmV2aXNpb25gIGluaGVyaXRpbmcgZnJvbSB0aGUgYmFzZS5cbiAgICAgICAgLy8gQ3VycmVudGx5IGFsbCBzdWJwbG90cyBjb250YWluZXJzIGhhdmUgc29tZSB1c2VyIGludGVyYWN0aW9uXG4gICAgICAgIC8vIGF0dHJpYnV0ZXMsIGJ1dCBpZiB3ZSBldmVyIGFkZCBvbmUgdGhhdCBkb2Vzbid0LCB3ZSB3b3VsZCBuZWVkIGFuXG4gICAgICAgIC8vIG9wdGlvbiB0byBza2lwIHRoaXMgc3RlcC5cbiAgICAgICAgY29lcmNlKCd1aXJldmlzaW9uJywgbGF5b3V0T3V0LnVpcmV2aXNpb24pO1xuXG4gICAgICAgIHZhciBkZmx0RG9tYWlucyA9IHt9O1xuICAgICAgICBkZmx0RG9tYWluc1twYXJ0aXRpb25dID0gW2kgLyBpZHNMZW5ndGgsIChpICsgMSkgLyBpZHNMZW5ndGhdO1xuICAgICAgICBoYW5kbGVEb21haW5EZWZhdWx0cyhzdWJwbG90TGF5b3V0T3V0LCBsYXlvdXRPdXQsIGNvZXJjZSwgZGZsdERvbWFpbnMpO1xuXG4gICAgICAgIG9wdHMuaWQgPSBpZDtcbiAgICAgICAgaGFuZGxlRGVmYXVsdHMoc3VicGxvdExheW91dEluLCBzdWJwbG90TGF5b3V0T3V0LCBjb2VyY2UsIG9wdHMpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuLy8gYXJyYXlPayBhdHRyaWJ1dGVzLCBtZXJnZSB0aGVtIGludG8gY2FsY2RhdGEgYXJyYXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIGNkW2ldLmkgPSBpO1xuXG4gICAgTGliLm1lcmdlQXJyYXkodHJhY2UudGV4dCwgY2QsICd0eCcpO1xuICAgIExpYi5tZXJnZUFycmF5KHRyYWNlLmhvdmVydGV4dCwgY2QsICdodHgnKTtcblxuICAgIHZhciBtYXJrZXIgPSB0cmFjZS5tYXJrZXI7XG4gICAgaWYobWFya2VyKSB7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5vcGFjaXR5LCBjZCwgJ21vJywgdHJ1ZSk7XG4gICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlci5jb2xvciwgY2QsICdtYycpO1xuXG4gICAgICAgIHZhciBtYXJrZXJMaW5lID0gbWFya2VyLmxpbmU7XG4gICAgICAgIGlmKG1hcmtlckxpbmUpIHtcbiAgICAgICAgICAgIExpYi5tZXJnZUFycmF5KG1hcmtlckxpbmUuY29sb3IsIGNkLCAnbWxjJyk7XG4gICAgICAgICAgICBMaWIubWVyZ2VBcnJheUNhc3RQb3NpdGl2ZShtYXJrZXJMaW5lLndpZHRoLCBjZCwgJ21sdycpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNjYXR0ZXJBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXR0cmlidXRlcycpO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgdGV4dHRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykudGV4dHRlbXBsYXRlQXR0cnM7XG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBmb250QXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9mb250X2F0dHJpYnV0ZXMnKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG52YXIgdGV4dEZvbnRBdHRycyA9IGZvbnRBdHRycyh7XG4gICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICBhcnJheU9rOiB0cnVlLFxuICAgIGNvbG9yRWRpdFR5cGU6ICdzdHlsZScsXG4gICAgZGVzY3JpcHRpb246ICcnXG59KTtcblxudmFyIHNjYXR0ZXJNYXJrZXJBdHRycyA9IHNjYXR0ZXJBdHRycy5tYXJrZXI7XG52YXIgc2NhdHRlck1hcmtlckxpbmVBdHRycyA9IHNjYXR0ZXJNYXJrZXJBdHRycy5saW5lO1xuXG52YXIgbWFya2VyTGluZVdpZHRoID0gZXh0ZW5kRmxhdCh7fSxcbiAgICBzY2F0dGVyTWFya2VyTGluZUF0dHJzLndpZHRoLCB7IGRmbHQ6IDAgfSk7XG5cbnZhciBtYXJrZXJMaW5lID0gZXh0ZW5kRmxhdCh7XG4gICAgd2lkdGg6IG1hcmtlckxpbmVXaWR0aCxcbiAgICBlZGl0VHlwZTogJ2NhbGMnXG59LCBjb2xvclNjYWxlQXR0cnMoJ21hcmtlci5saW5lJykpO1xuXG52YXIgbWFya2VyID0gZXh0ZW5kRmxhdCh7XG4gICAgbGluZTogbWFya2VyTGluZSxcbiAgICBlZGl0VHlwZTogJ2NhbGMnXG59LCBjb2xvclNjYWxlQXR0cnMoJ21hcmtlcicpLCB7XG4gICAgb3BhY2l0eToge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIG9wYWNpdHkgb2YgdGhlIGJhcnMuJ1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB4OiBzY2F0dGVyQXR0cnMueCxcbiAgICB4MDogc2NhdHRlckF0dHJzLngwLFxuICAgIGR4OiBzY2F0dGVyQXR0cnMuZHgsXG4gICAgeTogc2NhdHRlckF0dHJzLnksXG4gICAgeTA6IHNjYXR0ZXJBdHRycy55MCxcbiAgICBkeTogc2NhdHRlckF0dHJzLmR5LFxuXG4gICAgdGV4dDogc2NhdHRlckF0dHJzLnRleHQsXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdwbG90J30sIHtcbiAgICAgICAga2V5czogY29uc3RhbnRzLmV2ZW50RGF0YUtleXNcbiAgICB9KSxcbiAgICBob3ZlcnRleHQ6IHNjYXR0ZXJBdHRycy5ob3ZlcnRleHQsXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHt9LCB7XG4gICAgICAgIGtleXM6IGNvbnN0YW50cy5ldmVudERhdGFLZXlzXG4gICAgfSksXG5cbiAgICB0ZXh0cG9zaXRpb246IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIHZhbHVlczogWydpbnNpZGUnLCAnb3V0c2lkZScsICdhdXRvJywgJ25vbmUnXSxcbiAgICAgICAgZGZsdDogJ25vbmUnLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NwZWNpZmllcyB0aGUgbG9jYXRpb24gb2YgdGhlIGB0ZXh0YC4nLFxuICAgICAgICAgICAgJyppbnNpZGUqIHBvc2l0aW9ucyBgdGV4dGAgaW5zaWRlLCBuZXh0IHRvIHRoZSBiYXIgZW5kJyxcbiAgICAgICAgICAgICcocm90YXRlZCBhbmQgc2NhbGVkIGlmIG5lZWRlZCkuJyxcbiAgICAgICAgICAgICcqb3V0c2lkZSogcG9zaXRpb25zIGB0ZXh0YCBvdXRzaWRlLCBuZXh0IHRvIHRoZSBiYXIgZW5kJyxcbiAgICAgICAgICAgICcoc2NhbGVkIGlmIG5lZWRlZCksIHVubGVzcyB0aGVyZSBpcyBhbm90aGVyIGJhciBzdGFja2VkIG9uJyxcbiAgICAgICAgICAgICd0aGlzIG9uZSwgdGhlbiB0aGUgdGV4dCBnZXRzIHB1c2hlZCBpbnNpZGUuJyxcbiAgICAgICAgICAgICcqYXV0byogdHJpZXMgdG8gcG9zaXRpb24gYHRleHRgIGluc2lkZSB0aGUgYmFyLCBidXQgaWYnLFxuICAgICAgICAgICAgJ3RoZSBiYXIgaXMgdG9vIHNtYWxsIGFuZCBubyBiYXIgaXMgc3RhY2tlZCBvbiB0aGlzIG9uZScsXG4gICAgICAgICAgICAndGhlIHRleHQgaXMgbW92ZWQgb3V0c2lkZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGluc2lkZXRleHRhbmNob3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnZW5kJywgJ21pZGRsZScsICdzdGFydCddLFxuICAgICAgICBkZmx0OiAnZW5kJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaWYgdGV4dHMgYXJlIGtlcHQgYXQgY2VudGVyIG9yIHN0YXJ0L2VuZCBwb2ludHMgaW4gYHRleHRwb3NpdGlvbmAgKmluc2lkZSogbW9kZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHRleHRhbmdsZToge1xuICAgICAgICB2YWxUeXBlOiAnYW5nbGUnLFxuICAgICAgICBkZmx0OiAnYXV0bycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBhbmdsZSBvZiB0aGUgdGljayBsYWJlbHMgd2l0aCByZXNwZWN0IHRvIHRoZSBiYXIuJyxcbiAgICAgICAgICAgICdGb3IgZXhhbXBsZSwgYSBgdGlja2FuZ2xlYCBvZiAtOTAgZHJhd3MgdGhlIHRpY2sgbGFiZWxzJyxcbiAgICAgICAgICAgICd2ZXJ0aWNhbGx5LiBXaXRoICphdXRvKiB0aGUgdGV4dHMgbWF5IGF1dG9tYXRpY2FsbHkgYmUnLFxuICAgICAgICAgICAgJ3JvdGF0ZWQgdG8gZml0IHdpdGggdGhlIG1heGltdW0gc2l6ZSBpbiBiYXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgdGV4dGZvbnQ6IGV4dGVuZEZsYXQoe30sIHRleHRGb250QXR0cnMsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBmb250IHVzZWQgZm9yIGB0ZXh0YC4nXG4gICAgfSksXG5cbiAgICBpbnNpZGV0ZXh0Zm9udDogZXh0ZW5kRmxhdCh7fSwgdGV4dEZvbnRBdHRycywge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGZvbnQgdXNlZCBmb3IgYHRleHRgIGx5aW5nIGluc2lkZSB0aGUgYmFyLidcbiAgICB9KSxcblxuICAgIG91dHNpZGV0ZXh0Zm9udDogZXh0ZW5kRmxhdCh7fSwgdGV4dEZvbnRBdHRycywge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGZvbnQgdXNlZCBmb3IgYHRleHRgIGx5aW5nIG91dHNpZGUgdGhlIGJhci4nXG4gICAgfSksXG5cbiAgICBjb25zdHJhaW50ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ2luc2lkZScsICdvdXRzaWRlJywgJ2JvdGgnLCAnbm9uZSddLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICdib3RoJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdDb25zdHJhaW4gdGhlIHNpemUgb2YgdGV4dCBpbnNpZGUgb3Igb3V0c2lkZSBhIGJhciB0byBiZSBubycsXG4gICAgICAgICAgICAnbGFyZ2VyIHRoYW4gdGhlIGJhciBpdHNlbGYuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBjbGlwb25heGlzOiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMuY2xpcG9uYXhpcywge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciB0aGUgdGV4dCBub2RlcycsXG4gICAgICAgICAgICAnYXJlIGNsaXBwZWQgYWJvdXQgdGhlIHN1YnBsb3QgYXhlcy4nLFxuICAgICAgICAgICAgJ1RvIHNob3cgdGhlIHRleHQgbm9kZXMgYWJvdmUgYXhpcyBsaW5lcyBhbmQgdGljayBsYWJlbHMsJyxcbiAgICAgICAgICAgICdtYWtlIHN1cmUgdG8gc2V0IGB4YXhpcy5sYXllcmAgYW5kIGB5YXhpcy5sYXllcmAgdG8gKmJlbG93IHRyYWNlcyouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuXG4gICAgb3JpZW50YXRpb246IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIHZhbHVlczogWyd2JywgJ2gnXSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgYmFycy4nLFxuICAgICAgICAgICAgJ1dpdGggKnYqICgqaCopLCB0aGUgdmFsdWUgb2YgdGhlIGVhY2ggYmFyIHNwYW5zJyxcbiAgICAgICAgICAgICdhbG9uZyB0aGUgdmVydGljYWwgKGhvcml6b250YWwpLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgYmFzZToge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgd2hlcmUgdGhlIGJhciBiYXNlIGlzIGRyYXduIChpbiBwb3NpdGlvbiBheGlzIHVuaXRzKS4nLFxuICAgICAgICAgICAgJ0luICpzdGFjayogb3IgKnJlbGF0aXZlKiBiYXJtb2RlLCcsXG4gICAgICAgICAgICAndHJhY2VzIHRoYXQgc2V0ICpiYXNlKiB3aWxsIGJlIGV4Y2x1ZGVkJyxcbiAgICAgICAgICAgICdhbmQgZHJhd24gaW4gKm92ZXJsYXkqIG1vZGUgaW5zdGVhZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIG9mZnNldDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NoaWZ0cyB0aGUgcG9zaXRpb24gd2hlcmUgdGhlIGJhciBpcyBkcmF3bicsXG4gICAgICAgICAgICAnKGluIHBvc2l0aW9uIGF4aXMgdW5pdHMpLicsXG4gICAgICAgICAgICAnSW4gKmdyb3VwKiBiYXJtb2RlLCcsXG4gICAgICAgICAgICAndHJhY2VzIHRoYXQgc2V0ICpvZmZzZXQqIHdpbGwgYmUgZXhjbHVkZWQnLFxuICAgICAgICAgICAgJ2FuZCBkcmF3biBpbiAqb3ZlcmxheSogbW9kZSBpbnN0ZWFkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgd2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGJhciB3aWR0aCAoaW4gcG9zaXRpb24gYXhpcyB1bml0cykuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBtYXJrZXI6IG1hcmtlcixcblxuICAgIG9mZnNldGdyb3VwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldCBzZXZlcmFsIHRyYWNlcyBsaW5rZWQgdG8gdGhlIHNhbWUgcG9zaXRpb24gYXhpcycsXG4gICAgICAgICAgICAnb3IgbWF0Y2hpbmcgYXhlcyB0byB0aGUgc2FtZScsXG4gICAgICAgICAgICAnb2Zmc2V0Z3JvdXAgd2hlcmUgYmFycyBvZiB0aGUgc2FtZSBwb3NpdGlvbiBjb29yZGluYXRlIHdpbGwgbGluZSB1cC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBhbGlnbm1lbnRncm91cDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXQgc2V2ZXJhbCB0cmFjZXMgbGlua2VkIHRvIHRoZSBzYW1lIHBvc2l0aW9uIGF4aXMnLFxuICAgICAgICAgICAgJ29yIG1hdGNoaW5nIGF4ZXMgdG8gdGhlIHNhbWUnLFxuICAgICAgICAgICAgJ2FsaWdubWVudGdyb3VwLiBUaGlzIGNvbnRyb2xzIHdoZXRoZXIgYmFycyBjb21wdXRlIHRoZWlyIHBvc2l0aW9uYWwnLFxuICAgICAgICAgICAgJ3JhbmdlIGRlcGVuZGVudGx5IG9yIGluZGVwZW5kZW50bHkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBzZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IHNjYXR0ZXJBdHRycy5zZWxlY3RlZC5tYXJrZXIub3BhY2l0eSxcbiAgICAgICAgICAgIGNvbG9yOiBzY2F0dGVyQXR0cnMuc2VsZWN0ZWQubWFya2VyLmNvbG9yLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dGZvbnQ6IHNjYXR0ZXJBdHRycy5zZWxlY3RlZC50ZXh0Zm9udCxcbiAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICB9LFxuICAgIHVuc2VsZWN0ZWQ6IHtcbiAgICAgICAgbWFya2VyOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZC5tYXJrZXIub3BhY2l0eSxcbiAgICAgICAgICAgIGNvbG9yOiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZC5tYXJrZXIuY29sb3IsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgICAgICB9LFxuICAgICAgICB0ZXh0Zm9udDogc2NhdHRlckF0dHJzLnVuc2VsZWN0ZWQudGV4dGZvbnQsXG4gICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnXG4gICAgfSxcblxuICAgIHI6IHNjYXR0ZXJBdHRycy5yLFxuICAgIHQ6IHNjYXR0ZXJBdHRycy50LFxuXG4gICAgX2RlcHJlY2F0ZWQ6IHtcbiAgICAgICAgYmFyZGlyOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ3YnLCAnaCddLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZW5hbWVkIHRvIGBvcmllbnRhdGlvbmAuJ1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyBwYWRkaW5nIGluIHBpeGVscyBhcm91bmQgdGV4dFxuICAgIFRFWFRQQUQ6IDMsXG4gICAgLy8gJ3ZhbHVlJyBhbmQgJ2xhYmVsJyBhcmUgbm90IHJlYWxseSBuZWNlc3NhcnkgZm9yIGJhciB0cmFjZXMsXG4gICAgLy8gYnV0IHRoZXkgd2VyZSBtYWRlIGF2YWlsYWJsZSB0byBgdGV4dHRlbXBsYXRlYCAobWF5YmUgYnkgYWNjaWRlbnQpXG4gICAgLy8gdmlhIHRva2VucyBgJXt2YWx1ZX1gIGFuZCBgJXtsYWJlbH1gIHN0YXJ0aW5nIGluIDEuNTAuMCxcbiAgICAvLyBzbyBsZXQncyBpbmNsdWRlIHRoZW0gaW4gdGhlIGV2ZW50IGRhdGEgYWxzby5cbiAgICBldmVudERhdGFLZXlzOiBbJ3ZhbHVlJywgJ2xhYmVsJ11cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIHRpbnljb2xvciA9IHJlcXVpcmUoJ3Rpbnljb2xvcjInKTtcbnZhciBpc0FycmF5T3JUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliJykuaXNBcnJheU9yVHlwZWRBcnJheTtcblxuZXhwb3J0cy5jb2VyY2VTdHJpbmcgPSBmdW5jdGlvbihhdHRyaWJ1dGVEZWZpbml0aW9uLCB2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgaWYodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZih2YWx1ZSB8fCAhYXR0cmlidXRlRGVmaW5pdGlvbi5ub0JsYW5rKSByZXR1cm4gdmFsdWU7XG4gICAgfSBlbHNlIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaWYoIWF0dHJpYnV0ZURlZmluaXRpb24uc3RyaWN0KSByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICBkZWZhdWx0VmFsdWUgOlxuICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5kZmx0O1xufTtcblxuZXhwb3J0cy5jb2VyY2VOdW1iZXIgPSBmdW5jdGlvbihhdHRyaWJ1dGVEZWZpbml0aW9uLCB2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgaWYoaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcblxuICAgICAgICB2YXIgbWluID0gYXR0cmlidXRlRGVmaW5pdGlvbi5taW47XG4gICAgICAgIHZhciBtYXggPSBhdHRyaWJ1dGVEZWZpbml0aW9uLm1heDtcbiAgICAgICAgdmFyIGlzT3V0T2ZCb3VuZHMgPSAobWluICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgPCBtaW4pIHx8XG4gICAgICAgICAgICAgIChtYXggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+IG1heCk7XG5cbiAgICAgICAgaWYoIWlzT3V0T2ZCb3VuZHMpIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICBkZWZhdWx0VmFsdWUgOlxuICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5kZmx0O1xufTtcblxuZXhwb3J0cy5jb2VyY2VDb2xvciA9IGZ1bmN0aW9uKGF0dHJpYnV0ZURlZmluaXRpb24sIHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZih0aW55Y29sb3IodmFsdWUpLmlzVmFsaWQoKSkgcmV0dXJuIHZhbHVlO1xuXG4gICAgcmV0dXJuIChkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgZGVmYXVsdFZhbHVlIDpcbiAgICAgIGF0dHJpYnV0ZURlZmluaXRpb24uZGZsdDtcbn07XG5cbmV4cG9ydHMuY29lcmNlRW51bWVyYXRlZCA9IGZ1bmN0aW9uKGF0dHJpYnV0ZURlZmluaXRpb24sIHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZihhdHRyaWJ1dGVEZWZpbml0aW9uLmNvZXJjZU51bWJlcikgdmFsdWUgPSArdmFsdWU7XG5cbiAgICBpZihhdHRyaWJ1dGVEZWZpbml0aW9uLnZhbHVlcy5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHJldHVybiB2YWx1ZTtcblxuICAgIHJldHVybiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgIGRlZmF1bHRWYWx1ZSA6XG4gICAgICBhdHRyaWJ1dGVEZWZpbml0aW9uLmRmbHQ7XG59O1xuXG5leHBvcnRzLmdldFZhbHVlID0gZnVuY3Rpb24oYXJyYXlPclNjYWxhciwgaW5kZXgpIHtcbiAgICB2YXIgdmFsdWU7XG4gICAgaWYoIUFycmF5LmlzQXJyYXkoYXJyYXlPclNjYWxhcikpIHZhbHVlID0gYXJyYXlPclNjYWxhcjtcbiAgICBlbHNlIGlmKGluZGV4IDwgYXJyYXlPclNjYWxhci5sZW5ndGgpIHZhbHVlID0gYXJyYXlPclNjYWxhcltpbmRleF07XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0cy5nZXRMaW5lV2lkdGggPSBmdW5jdGlvbih0cmFjZSwgZGkpIHtcbiAgICB2YXIgdyA9XG4gICAgICAgICgwIDwgZGkubWx3KSA/IGRpLm1sdyA6XG4gICAgICAgICFpc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlLm1hcmtlci5saW5lLndpZHRoKSA/IHRyYWNlLm1hcmtlci5saW5lLndpZHRoIDpcbiAgICAgICAgMDtcblxuICAgIHJldHVybiB3O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xuXG52YXIgcmVzaXplVGV4dCA9IHJlcXVpcmUoJy4vdW5pZm9ybV90ZXh0JykucmVzaXplVGV4dDtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgYXR0cmlidXRlVGV4dEZvbnQgPSBhdHRyaWJ1dGVzLnRleHRmb250O1xudmFyIGF0dHJpYnV0ZUluc2lkZVRleHRGb250ID0gYXR0cmlidXRlcy5pbnNpZGV0ZXh0Zm9udDtcbnZhciBhdHRyaWJ1dGVPdXRzaWRlVGV4dEZvbnQgPSBhdHRyaWJ1dGVzLm91dHNpZGV0ZXh0Zm9udDtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbmZ1bmN0aW9uIHN0eWxlKGdkKSB7XG4gICAgdmFyIHMgPSBkMy5zZWxlY3QoZ2QpLnNlbGVjdEFsbCgnZy5iYXJsYXllcicpLnNlbGVjdEFsbCgnZy50cmFjZScpO1xuICAgIHJlc2l6ZVRleHQoZ2QsIHMsICdiYXInKTtcblxuICAgIHZhciBiYXJjb3VudCA9IHMuc2l6ZSgpO1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG5cbiAgICAvLyB0cmFjZSBzdHlsaW5nXG4gICAgcy5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGRbMF0udHJhY2Uub3BhY2l0eTsgfSlcblxuICAgIC8vIGZvciBnYXBsZXNzIChlaXRoZXIgc3RhY2tlZCBvciBuZWlnaGJvcmluZyBncm91cGVkKSBiYXJzIHVzZVxuICAgIC8vIGNyaXNwRWRnZXMgdG8gdHVybiBvZmYgYW50aWFsaWFzaW5nIHNvIGFuIGFydGlmaWNpYWwgZ2FwXG4gICAgLy8gaXNuJ3QgaW50cm9kdWNlZC5cbiAgICAuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmKChmdWxsTGF5b3V0LmJhcm1vZGUgPT09ICdzdGFjaycgJiYgYmFyY291bnQgPiAxKSB8fFxuICAgICAgICAgICAgICAgIChmdWxsTGF5b3V0LmJhcmdhcCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICBmdWxsTGF5b3V0LmJhcmdyb3VwZ2FwID09PSAwICYmXG4gICAgICAgICAgICAgICAgICFkWzBdLnRyYWNlLm1hcmtlci5saW5lLndpZHRoKSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ3NoYXBlLXJlbmRlcmluZycsICdjcmlzcEVkZ2VzJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHMuc2VsZWN0QWxsKCdnLnBvaW50cycpLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgc2VsID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgdHJhY2UgPSBkWzBdLnRyYWNlO1xuICAgICAgICBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCk7XG4gICAgfSk7XG5cbiAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdzdHlsZScpKHMpO1xufVxuXG5mdW5jdGlvbiBzdHlsZVBvaW50cyhzZWwsIHRyYWNlLCBnZCkge1xuICAgIERyYXdpbmcucG9pbnRTdHlsZShzZWwuc2VsZWN0QWxsKCdwYXRoJyksIHRyYWNlLCBnZCk7XG4gICAgc3R5bGVUZXh0UG9pbnRzKHNlbCwgdHJhY2UsIGdkKTtcbn1cblxuZnVuY3Rpb24gc3R5bGVUZXh0UG9pbnRzKHNlbCwgdHJhY2UsIGdkKSB7XG4gICAgc2VsLnNlbGVjdEFsbCgndGV4dCcpLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgdHggPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBmb250ID0gTGliLmVuc3VyZVVuaWZvcm1Gb250U2l6ZShnZCwgZGV0ZXJtaW5lRm9udCh0eCwgZCwgdHJhY2UsIGdkKSk7XG5cbiAgICAgICAgRHJhd2luZy5mb250KHR4LCBmb250KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3R5bGVPblNlbGVjdChnZCwgY2QsIHNlbCkge1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuXG4gICAgaWYodHJhY2Uuc2VsZWN0ZWRwb2ludHMpIHtcbiAgICAgICAgc3R5bGVQb2ludHNJblNlbGVjdGlvbk1vZGUoc2VsLCB0cmFjZSwgZ2QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlUG9pbnRzKHNlbCwgdHJhY2UsIGdkKTtcbiAgICAgICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdlcnJvcmJhcnMnLCAnc3R5bGUnKShzZWwpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3R5bGVQb2ludHNJblNlbGVjdGlvbk1vZGUocywgdHJhY2UsIGdkKSB7XG4gICAgRHJhd2luZy5zZWxlY3RlZFBvaW50U3R5bGUocy5zZWxlY3RBbGwoJ3BhdGgnKSwgdHJhY2UpO1xuICAgIHN0eWxlVGV4dEluU2VsZWN0aW9uTW9kZShzLnNlbGVjdEFsbCgndGV4dCcpLCB0cmFjZSwgZ2QpO1xufVxuXG5mdW5jdGlvbiBzdHlsZVRleHRJblNlbGVjdGlvbk1vZGUodHhzLCB0cmFjZSwgZ2QpIHtcbiAgICB0eHMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciB0eCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGZvbnQ7XG5cbiAgICAgICAgaWYoZC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgZm9udCA9IExpYi5lbnN1cmVVbmlmb3JtRm9udFNpemUoZ2QsIGRldGVybWluZUZvbnQodHgsIGQsIHRyYWNlLCBnZCkpO1xuXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRGb250Q29sb3IgPSB0cmFjZS5zZWxlY3RlZC50ZXh0Zm9udCAmJiB0cmFjZS5zZWxlY3RlZC50ZXh0Zm9udC5jb2xvcjtcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkRm9udENvbG9yKSB7XG4gICAgICAgICAgICAgICAgZm9udC5jb2xvciA9IHNlbGVjdGVkRm9udENvbG9yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBEcmF3aW5nLmZvbnQodHgsIGZvbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRHJhd2luZy5zZWxlY3RlZFRleHRTdHlsZSh0eCwgdHJhY2UpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRldGVybWluZUZvbnQodHgsIGQsIHRyYWNlLCBnZCkge1xuICAgIHZhciBsYXlvdXRGb250ID0gZ2QuX2Z1bGxMYXlvdXQuZm9udDtcbiAgICB2YXIgdGV4dEZvbnQgPSB0cmFjZS50ZXh0Zm9udDtcblxuICAgIGlmKHR4LmNsYXNzZWQoJ2JhcnRleHQtaW5zaWRlJykpIHtcbiAgICAgICAgdmFyIGJhckNvbG9yID0gZ2V0QmFyQ29sb3IoZCwgdHJhY2UpO1xuICAgICAgICB0ZXh0Rm9udCA9IGdldEluc2lkZVRleHRGb250KHRyYWNlLCBkLmksIGxheW91dEZvbnQsIGJhckNvbG9yKTtcbiAgICB9IGVsc2UgaWYodHguY2xhc3NlZCgnYmFydGV4dC1vdXRzaWRlJykpIHtcbiAgICAgICAgdGV4dEZvbnQgPSBnZXRPdXRzaWRlVGV4dEZvbnQodHJhY2UsIGQuaSwgbGF5b3V0Rm9udCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHRGb250O1xufVxuXG5mdW5jdGlvbiBnZXRUZXh0Rm9udCh0cmFjZSwgaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgIHJldHVybiBnZXRGb250VmFsdWUoXG4gICAgICBhdHRyaWJ1dGVUZXh0Rm9udCwgdHJhY2UudGV4dGZvbnQsIGluZGV4LCBkZWZhdWx0VmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXRJbnNpZGVUZXh0Rm9udCh0cmFjZSwgaW5kZXgsIGxheW91dEZvbnQsIGJhckNvbG9yKSB7XG4gICAgdmFyIGRlZmF1bHRGb250ID0gZ2V0VGV4dEZvbnQodHJhY2UsIGluZGV4LCBsYXlvdXRGb250KTtcblxuICAgIHZhciB3b3VsZEZhbGxCYWNrVG9MYXlvdXRGb250ID1cbiAgICAgICh0cmFjZS5faW5wdXQudGV4dGZvbnQgPT09IHVuZGVmaW5lZCB8fCB0cmFjZS5faW5wdXQudGV4dGZvbnQuY29sb3IgPT09IHVuZGVmaW5lZCkgfHxcbiAgICAgIChBcnJheS5pc0FycmF5KHRyYWNlLnRleHRmb250LmNvbG9yKSAmJiB0cmFjZS50ZXh0Zm9udC5jb2xvcltpbmRleF0gPT09IHVuZGVmaW5lZCk7XG4gICAgaWYod291bGRGYWxsQmFja1RvTGF5b3V0Rm9udCkge1xuICAgICAgICBkZWZhdWx0Rm9udCA9IHtcbiAgICAgICAgICAgIGNvbG9yOiBDb2xvci5jb250cmFzdChiYXJDb2xvciksXG4gICAgICAgICAgICBmYW1pbHk6IGRlZmF1bHRGb250LmZhbWlseSxcbiAgICAgICAgICAgIHNpemU6IGRlZmF1bHRGb250LnNpemVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0Rm9udFZhbHVlKFxuICAgICAgYXR0cmlidXRlSW5zaWRlVGV4dEZvbnQsIHRyYWNlLmluc2lkZXRleHRmb250LCBpbmRleCwgZGVmYXVsdEZvbnQpO1xufVxuXG5mdW5jdGlvbiBnZXRPdXRzaWRlVGV4dEZvbnQodHJhY2UsIGluZGV4LCBsYXlvdXRGb250KSB7XG4gICAgdmFyIGRlZmF1bHRGb250ID0gZ2V0VGV4dEZvbnQodHJhY2UsIGluZGV4LCBsYXlvdXRGb250KTtcbiAgICByZXR1cm4gZ2V0Rm9udFZhbHVlKFxuICAgICAgYXR0cmlidXRlT3V0c2lkZVRleHRGb250LCB0cmFjZS5vdXRzaWRldGV4dGZvbnQsIGluZGV4LCBkZWZhdWx0Rm9udCk7XG59XG5cbmZ1bmN0aW9uIGdldEZvbnRWYWx1ZShhdHRyaWJ1dGVEZWZpbml0aW9uLCBhdHRyaWJ1dGVWYWx1ZSwgaW5kZXgsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlVmFsdWUgfHwge307XG5cbiAgICB2YXIgZmFtaWx5VmFsdWUgPSBoZWxwZXJzLmdldFZhbHVlKGF0dHJpYnV0ZVZhbHVlLmZhbWlseSwgaW5kZXgpO1xuICAgIHZhciBzaXplVmFsdWUgPSBoZWxwZXJzLmdldFZhbHVlKGF0dHJpYnV0ZVZhbHVlLnNpemUsIGluZGV4KTtcbiAgICB2YXIgY29sb3JWYWx1ZSA9IGhlbHBlcnMuZ2V0VmFsdWUoYXR0cmlidXRlVmFsdWUuY29sb3IsIGluZGV4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZhbWlseTogaGVscGVycy5jb2VyY2VTdHJpbmcoXG4gICAgICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5mYW1pbHksIGZhbWlseVZhbHVlLCBkZWZhdWx0VmFsdWUuZmFtaWx5KSxcbiAgICAgICAgc2l6ZTogaGVscGVycy5jb2VyY2VOdW1iZXIoXG4gICAgICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5zaXplLCBzaXplVmFsdWUsIGRlZmF1bHRWYWx1ZS5zaXplKSxcbiAgICAgICAgY29sb3I6IGhlbHBlcnMuY29lcmNlQ29sb3IoXG4gICAgICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5jb2xvciwgY29sb3JWYWx1ZSwgZGVmYXVsdFZhbHVlLmNvbG9yKVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldEJhckNvbG9yKGNkLCB0cmFjZSkge1xuICAgIGlmKHRyYWNlLnR5cGUgPT09ICd3YXRlcmZhbGwnKSB7XG4gICAgICAgIHJldHVybiB0cmFjZVtjZC5kaXJdLm1hcmtlci5jb2xvcjtcbiAgICB9XG4gICAgcmV0dXJuIGNkLm1jIHx8IHRyYWNlLm1hcmtlci5jb2xvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIHN0eWxlVGV4dFBvaW50czogc3R5bGVUZXh0UG9pbnRzLFxuICAgIHN0eWxlT25TZWxlY3Q6IHN0eWxlT25TZWxlY3QsXG4gICAgZ2V0SW5zaWRlVGV4dEZvbnQ6IGdldEluc2lkZVRleHRGb250LFxuICAgIGdldE91dHNpZGVUZXh0Rm9udDogZ2V0T3V0c2lkZVRleHRGb250LFxuICAgIGdldEJhckNvbG9yOiBnZXRCYXJDb2xvcixcbiAgICByZXNpemVUZXh0OiByZXNpemVUZXh0XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVTdHlsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgY29lcmNlKCdtYXJrZXIuY29sb3InLCBkZWZhdWx0Q29sb3IpO1xuXG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZUluLCAnbWFya2VyJykpIHtcbiAgICAgICAgY29sb3JzY2FsZURlZmF1bHRzKFxuICAgICAgICAgICAgdHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnbWFya2VyLicsIGNMZXR0ZXI6ICdjJ31cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ21hcmtlci5saW5lLmNvbG9yJywgQ29sb3IuZGVmYXVsdExpbmUpO1xuXG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZUluLCAnbWFya2VyLmxpbmUnKSkge1xuICAgICAgICBjb2xvcnNjYWxlRGVmYXVsdHMoXG4gICAgICAgICAgICB0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdtYXJrZXIubGluZS4nLCBjTGV0dGVyOiAnYyd9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdtYXJrZXIubGluZS53aWR0aCcpO1xuICAgIGNvZXJjZSgnbWFya2VyLm9wYWNpdHknKTtcbiAgICBjb2VyY2UoJ3NlbGVjdGVkLm1hcmtlci5jb2xvcicpO1xuICAgIGNvZXJjZSgndW5zZWxlY3RlZC5tYXJrZXIuY29sb3InKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbmZ1bmN0aW9uIHJlc2l6ZVRleHQoZ2QsIGdUcmFjZSwgdHJhY2VUeXBlKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgbWluU2l6ZSA9IGZ1bGxMYXlvdXRbJ18nICsgdHJhY2VUeXBlICsgJ1RleHRfbWluc2l6ZSddO1xuICAgIGlmKG1pblNpemUpIHtcbiAgICAgICAgdmFyIHNob3VsZEhpZGUgPSBmdWxsTGF5b3V0LnVuaWZvcm10ZXh0Lm1vZGUgPT09ICdoaWRlJztcblxuICAgICAgICB2YXIgc2VsZWN0b3I7XG4gICAgICAgIHN3aXRjaCh0cmFjZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bm5lbGFyZWEnIDpcbiAgICAgICAgICAgIGNhc2UgJ3BpZScgOlxuICAgICAgICAgICAgY2FzZSAnc3VuYnVyc3QnIDpcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICdnLnNsaWNlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RyZWVtYXAnIDpcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICdnLnNsaWNlLCBnLnBhdGhiYXInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnZy5wb2ludHMgPiBnLnBvaW50JztcbiAgICAgICAgfVxuXG4gICAgICAgIGdUcmFjZS5zZWxlY3RBbGwoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IGQudHJhbnNmb3JtO1xuICAgICAgICAgICAgaWYodHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLnNjYWxlID0gKHNob3VsZEhpZGUgJiYgdHJhbnNmb3JtLmhpZGUpID8gMCA6IG1pblNpemUgLyB0cmFuc2Zvcm0uZm9udFNpemU7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgZWwuYXR0cigndHJhbnNmb3JtJywgTGliLmdldFRleHRUcmFuc2Zvcm0odHJhbnNmb3JtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVjb3JkTWluVGV4dFNpemUoXG4gICAgdHJhY2VUeXBlLCAvLyBpblxuICAgIHRyYW5zZm9ybSwgLy8gaW5vdXRcbiAgICBmdWxsTGF5b3V0IC8vIGlub3V0XG4pIHtcbiAgICBpZihmdWxsTGF5b3V0LnVuaWZvcm10ZXh0Lm1vZGUpIHtcbiAgICAgICAgdmFyIG1pbktleSA9IGdldE1pbktleSh0cmFjZVR5cGUpO1xuICAgICAgICB2YXIgbWluU2l6ZSA9IGZ1bGxMYXlvdXQudW5pZm9ybXRleHQubWluc2l6ZTtcbiAgICAgICAgdmFyIHNpemUgPSB0cmFuc2Zvcm0uc2NhbGUgKiB0cmFuc2Zvcm0uZm9udFNpemU7XG5cbiAgICAgICAgdHJhbnNmb3JtLmhpZGUgPSBzaXplIDwgbWluU2l6ZTtcblxuICAgICAgICBmdWxsTGF5b3V0W21pbktleV0gPSBmdWxsTGF5b3V0W21pbktleV0gfHwgSW5maW5pdHk7XG4gICAgICAgIGlmKCF0cmFuc2Zvcm0uaGlkZSkge1xuICAgICAgICAgICAgZnVsbExheW91dFttaW5LZXldID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgZnVsbExheW91dFttaW5LZXldLFxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHNpemUsIG1pblNpemUpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbGVhck1pblRleHRTaXplKFxuICAgIHRyYWNlVHlwZSwgLy8gaW5cbiAgICBmdWxsTGF5b3V0IC8vIGlub3V0XG4pIHtcbiAgICB2YXIgbWluS2V5ID0gZ2V0TWluS2V5KHRyYWNlVHlwZSk7XG4gICAgZnVsbExheW91dFttaW5LZXldID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRNaW5LZXkodHJhY2VUeXBlKSB7XG4gICAgcmV0dXJuICdfJyArIHRyYWNlVHlwZSArICdUZXh0X21pbnNpemUnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICByZWNvcmRNaW5UZXh0U2l6ZTogcmVjb3JkTWluVGV4dFNpemUsXG4gICAgY2xlYXJNaW5UZXh0U2l6ZTogY2xlYXJNaW5UZXh0U2l6ZSxcbiAgICByZXNpemVUZXh0OiByZXNpemVUZXh0XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsY1NlbGVjdGlvbihjZCwgdHJhY2UpIHtcbiAgICBpZihMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh0cmFjZS5zZWxlY3RlZHBvaW50cykpIHtcbiAgICAgICAgTGliLnRhZ1NlbGVjdGVkKGNkLCB0cmFjZSk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgc3VidHlwZXMgPSByZXF1aXJlKCcuL3N1YnR5cGVzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRUcmFjZUNvbG9yKHRyYWNlLCBkaSkge1xuICAgIHZhciBsYywgdGM7XG5cbiAgICAvLyBUT0RPOiB0ZXh0IG1vZGVzXG5cbiAgICBpZih0cmFjZS5tb2RlID09PSAnbGluZXMnKSB7XG4gICAgICAgIGxjID0gdHJhY2UubGluZS5jb2xvcjtcbiAgICAgICAgcmV0dXJuIChsYyAmJiBDb2xvci5vcGFjaXR5KGxjKSkgP1xuICAgICAgICAgICAgbGMgOiB0cmFjZS5maWxsY29sb3I7XG4gICAgfSBlbHNlIGlmKHRyYWNlLm1vZGUgPT09ICdub25lJykge1xuICAgICAgICByZXR1cm4gdHJhY2UuZmlsbCA/IHRyYWNlLmZpbGxjb2xvciA6ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtYyA9IGRpLm1jYyB8fCAodHJhY2UubWFya2VyIHx8IHt9KS5jb2xvcjtcbiAgICAgICAgdmFyIG1sYyA9IGRpLm1sY2MgfHwgKCh0cmFjZS5tYXJrZXIgfHwge30pLmxpbmUgfHwge30pLmNvbG9yO1xuXG4gICAgICAgIHRjID0gKG1jICYmIENvbG9yLm9wYWNpdHkobWMpKSA/IG1jIDpcbiAgICAgICAgICAgIChtbGMgJiYgQ29sb3Iub3BhY2l0eShtbGMpICYmXG4gICAgICAgICAgICAgICAgKGRpLm1sdyB8fCAoKHRyYWNlLm1hcmtlciB8fCB7fSkubGluZSB8fCB7fSkud2lkdGgpKSA/IG1sYyA6ICcnO1xuXG4gICAgICAgIGlmKHRjKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHBvaW50cyBhcmVuJ3QgVE9PIHRyYW5zcGFyZW50XG4gICAgICAgICAgICBpZihDb2xvci5vcGFjaXR5KHRjKSA8IDAuMykge1xuICAgICAgICAgICAgICAgIHJldHVybiBDb2xvci5hZGRPcGFjaXR5KHRjLCAwLjMpO1xuICAgICAgICAgICAgfSBlbHNlIHJldHVybiB0YztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxjID0gKHRyYWNlLmxpbmUgfHwge30pLmNvbG9yO1xuICAgICAgICAgICAgcmV0dXJuIChsYyAmJiBDb2xvci5vcGFjaXR5KGxjKSAmJlxuICAgICAgICAgICAgICAgIHN1YnR5cGVzLmhhc0xpbmVzKHRyYWNlKSAmJiB0cmFjZS5saW5lLndpZHRoKSA/XG4gICAgICAgICAgICAgICAgICAgIGxjIDogdHJhY2UuZmlsbGNvbG9yO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb250YWluZXI6ICdtYXJrZXInLFxuICAgIG1pbjogJ2NtaW4nLFxuICAgIG1heDogJ2NtYXgnXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcblxudmFyIHN1YlR5cGVzID0gcmVxdWlyZSgnLi9zdWJ0eXBlcycpO1xuXG4vKlxuICogb3B0czogb2JqZWN0IG9mIGZsYWdzIHRvIGNvbnRyb2wgZmVhdHVyZXMgbm90IGFsbCBtYXJrZXIgdXNlcnMgc3VwcG9ydFxuICogICBub0xpbmU6IGNhbGxlciBkb2VzIG5vdCBzdXBwb3J0IG1hcmtlciBsaW5lc1xuICogICBncmFkaWVudDogY2FsbGVyIHN1cHBvcnRzIGdyYWRpZW50c1xuICogICBub1NlbGVjdDogY2FsbGVyIGRvZXMgbm90IHN1cHBvcnQgc2VsZWN0ZWQvdW5zZWxlY3RlZCBhdHRyaWJ1dGUgY29udGFpbmVyc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hcmtlckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlLCBvcHRzKSB7XG4gICAgdmFyIGlzQnViYmxlID0gc3ViVHlwZXMuaXNCdWJibGUodHJhY2VJbik7XG4gICAgdmFyIGxpbmVDb2xvciA9ICh0cmFjZUluLmxpbmUgfHwge30pLmNvbG9yO1xuICAgIHZhciBkZWZhdWx0TUxDO1xuXG4gICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICAvLyBtYXJrZXIuY29sb3IgaW5oZXJpdCBmcm9tIGxpbmUuY29sb3IgKGV2ZW4gaWYgbGluZS5jb2xvciBpcyBhbiBhcnJheSlcbiAgICBpZihsaW5lQ29sb3IpIGRlZmF1bHRDb2xvciA9IGxpbmVDb2xvcjtcblxuICAgIGNvZXJjZSgnbWFya2VyLnN5bWJvbCcpO1xuICAgIGNvZXJjZSgnbWFya2VyLm9wYWNpdHknLCBpc0J1YmJsZSA/IDAuNyA6IDEpO1xuICAgIGNvZXJjZSgnbWFya2VyLnNpemUnKTtcblxuICAgIGNvZXJjZSgnbWFya2VyLmNvbG9yJywgZGVmYXVsdENvbG9yKTtcbiAgICBpZihoYXNDb2xvcnNjYWxlKHRyYWNlSW4sICdtYXJrZXInKSkge1xuICAgICAgICBjb2xvcnNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnbWFya2VyLicsIGNMZXR0ZXI6ICdjJ30pO1xuICAgIH1cblxuICAgIGlmKCFvcHRzLm5vU2VsZWN0KSB7XG4gICAgICAgIGNvZXJjZSgnc2VsZWN0ZWQubWFya2VyLmNvbG9yJyk7XG4gICAgICAgIGNvZXJjZSgndW5zZWxlY3RlZC5tYXJrZXIuY29sb3InKTtcbiAgICAgICAgY29lcmNlKCdzZWxlY3RlZC5tYXJrZXIuc2l6ZScpO1xuICAgICAgICBjb2VyY2UoJ3Vuc2VsZWN0ZWQubWFya2VyLnNpemUnKTtcbiAgICB9XG5cbiAgICBpZighb3B0cy5ub0xpbmUpIHtcbiAgICAgICAgLy8gaWYgdGhlcmUncyBhIGxpbmUgd2l0aCBhIGRpZmZlcmVudCBjb2xvciB0aGFuIHRoZSBtYXJrZXIsIHVzZVxuICAgICAgICAvLyB0aGF0IGxpbmUgY29sb3IgYXMgdGhlIGRlZmF1bHQgbWFya2VyIGxpbmUgY29sb3JcbiAgICAgICAgLy8gKGV4Y2VwdCB3aGVuIGl0J3MgYW4gYXJyYXkpXG4gICAgICAgIC8vIG1vc3RseSB0aGlzIGlzIGZvciB0cmFuc3BhcmVudCBtYXJrZXJzIHRvIGJlaGF2ZSBuaWNlbHlcbiAgICAgICAgaWYobGluZUNvbG9yICYmICFBcnJheS5pc0FycmF5KGxpbmVDb2xvcikgJiYgKHRyYWNlT3V0Lm1hcmtlci5jb2xvciAhPT0gbGluZUNvbG9yKSkge1xuICAgICAgICAgICAgZGVmYXVsdE1MQyA9IGxpbmVDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmKGlzQnViYmxlKSBkZWZhdWx0TUxDID0gQ29sb3IuYmFja2dyb3VuZDtcbiAgICAgICAgZWxzZSBkZWZhdWx0TUxDID0gQ29sb3IuZGVmYXVsdExpbmU7XG5cbiAgICAgICAgY29lcmNlKCdtYXJrZXIubGluZS5jb2xvcicsIGRlZmF1bHRNTEMpO1xuICAgICAgICBpZihoYXNDb2xvcnNjYWxlKHRyYWNlSW4sICdtYXJrZXIubGluZScpKSB7XG4gICAgICAgICAgICBjb2xvcnNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnbWFya2VyLmxpbmUuJywgY0xldHRlcjogJ2MnfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb2VyY2UoJ21hcmtlci5saW5lLndpZHRoJywgaXNCdWJibGUgPyAxIDogMCk7XG4gICAgfVxuXG4gICAgaWYoaXNCdWJibGUpIHtcbiAgICAgICAgY29lcmNlKCdtYXJrZXIuc2l6ZXJlZicpO1xuICAgICAgICBjb2VyY2UoJ21hcmtlci5zaXplbWluJyk7XG4gICAgICAgIGNvZXJjZSgnbWFya2VyLnNpemVtb2RlJyk7XG4gICAgfVxuXG4gICAgaWYob3B0cy5ncmFkaWVudCkge1xuICAgICAgICB2YXIgZ3JhZGllbnRUeXBlID0gY29lcmNlKCdtYXJrZXIuZ3JhZGllbnQudHlwZScpO1xuICAgICAgICBpZihncmFkaWVudFR5cGUgIT09ICdub25lJykge1xuICAgICAgICAgICAgY29lcmNlKCdtYXJrZXIuZ3JhZGllbnQuY29sb3InKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9