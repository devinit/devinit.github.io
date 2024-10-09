(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_sunburst_js-node_modules_plotly_js_src_traces_bar_style_js"],{

/***/ "./node_modules/plotly.js/lib/sunburst.js":
/*!************************************************!*\
  !*** ./node_modules/plotly.js/lib/sunburst.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/sunburst */ "./node_modules/plotly.js/src/traces/sunburst/index.js");


/***/ }),

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

/***/ "./node_modules/plotly.js/src/traces/sunburst/base_plot.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/base_plot.js ***!
  \*****************************************************************/
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

exports.name = 'sunburst';

exports.plot = function(gd, traces, transitionOpts, makeOnCompleteCallback) {
    plots.plotBasePlot(exports.name, gd, traces, transitionOpts, makeOnCompleteCallback);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    plots.cleanBasePlot(exports.name, newFullData, newFullLayout, oldFullData, oldFullLayout);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/defaults.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/sunburst/attributes.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;
var handleText = __webpack_require__(/*! ../bar/defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").handleText;

var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var hasColorscale = Colorscale.hasColorscale;
var colorscaleDefaults = Colorscale.handleDefaults;

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var labels = coerce('labels');
    var parents = coerce('parents');

    if(!labels || !labels.length || !parents || !parents.length) {
        traceOut.visible = false;
        return;
    }

    var vals = coerce('values');
    if(vals && vals.length) {
        coerce('branchvalues');
    } else {
        coerce('count');
    }

    coerce('level');
    coerce('maxdepth');

    var lineWidth = coerce('marker.line.width');
    if(lineWidth) coerce('marker.line.color', layout.paper_bgcolor);

    coerce('marker.colors');
    var withColorscale = traceOut._hasColorscale = (
        hasColorscale(traceIn, 'marker', 'colors') ||
        (traceIn.marker || {}).coloraxis // N.B. special logic to consider "values" colorscales
    );
    if(withColorscale) {
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'marker.', cLetter: 'c'});
    }

    coerce('leaf.opacity', withColorscale ? 1 : 0.7);

    var text = coerce('text');
    coerce('texttemplate');
    if(!traceOut.texttemplate) coerce('textinfo', Array.isArray(text) ? 'text+label' : 'label');

    coerce('hovertext');
    coerce('hovertemplate');

    var textposition = 'auto';
    handleText(traceIn, traceOut, layout, coerce, textposition, {
        moduleHasSelected: false,
        moduleHasUnselected: false,
        moduleHasConstrain: false,
        moduleHasCliponaxis: false,
        moduleHasTextangle: false,
        moduleHasInsideanchor: false
    });

    coerce('insidetextorientation');

    handleDomainDefaults(traceOut, layout, coerce);

    // do not support transforms for now
    traceOut._length = null;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/index.js ***!
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



module.exports = {
    moduleType: 'trace',
    name: 'sunburst',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/sunburst/base_plot.js"),
    categories: [],
    animatable: true,

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/sunburst/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/sunburst/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/sunburst/defaults.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/sunburst/layout_defaults.js"),

    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/sunburst/calc.js").calc,
    crossTraceCalc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/sunburst/calc.js").crossTraceCalc,

    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/sunburst/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/sunburst/style.js").style,

    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),

    meta: {
        description: [
            'Visualize hierarchal data spanning outward radially from root to leaves.',
            'The sunburst sectors are determined by the entries in *labels* or *ids*',
            'and in *parents*.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/sunburst/layout_attributes.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/layout_attributes.js ***!
  \*************************************************************************/
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
    sunburstcolorway: {
        valType: 'colorlist',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the default sunburst slice colors. Defaults to the main',
            '`colorway` used for trace colors. If you specify a new',
            'list here it can still be extended with lighter and darker',
            'colors, see `extendsunburstcolors`.'
        ].join(' ')
    },
    extendsunburstcolors: {
        valType: 'boolean',
        dflt: true,
        role: 'style',
        editType: 'calc',
        description: [
            'If `true`, the sunburst slice colors (whether given by `sunburstcolorway` or',
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

/***/ "./node_modules/plotly.js/src/traces/sunburst/layout_defaults.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/sunburst/layout_defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/sunburst/layout_attributes.js");

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }
    coerce('sunburstcolorway', layoutOut.colorway);
    coerce('extendsunburstcolors');
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc3VuYnVyc3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2RvbWFpbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9oZWxwZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL3N0eWxlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL3VuaWZvcm1fdGV4dC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIvbWFya2VyX2NvbG9yYmFyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc3VuYnVyc3QvYmFzZV9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc3VuYnVyc3QvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zdW5idXJzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3N1bmJ1cnN0L2xheW91dF9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc3VuYnVyc3QvbGF5b3V0X2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLDJIQUFrRDs7Ozs7Ozs7Ozs7O0FDVmxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGlCQUFpQixpR0FBbUM7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU8sK0JBQStCLElBQUk7QUFDdEQ7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSwyREFBMkQ7QUFDeEUsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsZ0JBQWdCLG1CQUFPLENBQUMsOERBQWdCO0FBQ3hDLGdCQUFnQixtQkFBTyxDQUFDLDBEQUFZO0FBQ3BDLDBCQUEwQixxR0FBd0M7O0FBRWxFLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLG1DQUFJO0FBQ3JCLFlBQVksbUJBQU8sQ0FBQyxzRkFBd0I7QUFDNUMsY0FBYyxtQkFBTyxDQUFDLDBGQUEwQjtBQUNoRCxVQUFVLG1CQUFPLENBQUMsNERBQVc7QUFDN0IsZUFBZSxtQkFBTyxDQUFDLGdFQUFnQjs7QUFFdkMsaUJBQWlCLCtHQUFvQztBQUNyRCxpQkFBaUIsbUJBQU8sQ0FBQywyRUFBYztBQUN2QztBQUNBO0FBQ0E7QUFDQSxjQUFjLG1CQUFPLENBQUMscUVBQVc7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLDJCQUEyQixFQUFFOztBQUVqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLG1DQUFJO0FBQ3JCLFVBQVUsbUJBQU8sQ0FBQyw0REFBVzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxzRUFBbUI7O0FBRXZDLFlBQVk7O0FBRVosWUFBWTtBQUNaO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7QUFDN0IsaUJBQWlCLG1CQUFPLENBQUMsZ0ZBQWM7QUFDdkMsMkJBQTJCLHNHQUFzQztBQUNqRSxpQkFBaUIsNEdBQXFDOztBQUV0RCxpQkFBaUIsbUJBQU8sQ0FBQyxnR0FBNkI7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLCtEQUErRCxnQ0FBZ0M7QUFDL0Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsOEVBQWE7QUFDekM7QUFDQTs7QUFFQSxnQkFBZ0IsbUJBQU8sQ0FBQyxnRkFBYztBQUN0QyxzQkFBc0IsbUJBQU8sQ0FBQyw4RkFBcUI7QUFDbkQsb0JBQW9CLG1CQUFPLENBQUMsNEVBQVk7QUFDeEMsMEJBQTBCLG1CQUFPLENBQUMsMEZBQW1COztBQUVyRCxVQUFVLDhGQUFzQjtBQUNoQyxvQkFBb0Isd0dBQWdDOztBQUVwRCxVQUFVLDhGQUFzQjtBQUNoQyxXQUFXLGlHQUF3Qjs7QUFFbkMsY0FBYyxtQkFBTyxDQUFDLGtHQUE0Qjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3Qix1QkFBdUIsbUJBQU8sQ0FBQyw4RkFBcUI7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0YjM5YjVlZDJhNTRjMDI4ZGJhMjguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9zdW5idXJzdCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG4vKipcbiAqIE1ha2UgYSB4eSBkb21haW4gYXR0cmlidXRlIGdyb3VwXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5uYW1lOiBuYW1lIHRvIGJlIGluc2VydGVkIGluIHRoZSBkZWZhdWx0IGRlc2NyaXB0aW9uXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLnRyYWNlOiBzZXQgdG8gdHJ1ZSBmb3IgdHJhY2UgY29udGFpbmVyc1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLmVkaXRUeXBlOiBlZGl0VHlwZSBmb3IgYWxsIHBpZWNlc1xuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy5ub0dyaWRDZWxsOiBzZXQgdG8gdHJ1ZSB0byBvbWl0IGByb3dgIGFuZCBgY29sdW1uYFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRyYVxuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBleHRyYS5kZXNjcmlwdGlvbjogZXh0cmEgZGVzY3JpcHRpb24uIE4uQiB3ZSB1c2VcbiAqICAgICBhIHNlcGFyYXRlIGV4dHJhIGNvbnRhaW5lciB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aFxuICogICAgIHRoZSBjb21wcmVzc19hdHRyaWJ1dGVzIHRyYW5zZm9ybS5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IGF0dHJpYnV0ZXMgb2JqZWN0IGNvbnRhaW5pbmcge3gseX0gYXMgc3BlY2lmaWVkXG4gKi9cbmV4cG9ydHMuYXR0cmlidXRlcyA9IGZ1bmN0aW9uKG9wdHMsIGV4dHJhKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgZXh0cmEgPSBleHRyYSB8fCB7fTtcblxuICAgIHZhciBiYXNlID0ge1xuICAgICAgICB2YWxUeXBlOiAnaW5mb19hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX0sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX1cbiAgICAgICAgXSxcbiAgICAgICAgZGZsdDogWzAsIDFdXG4gICAgfTtcblxuICAgIHZhciBuYW1lUGFydCA9IG9wdHMubmFtZSA/IG9wdHMubmFtZSArICcgJyA6ICcnO1xuICAgIHZhciBjb250UGFydCA9IG9wdHMudHJhY2UgPyAndHJhY2UgJyA6ICdzdWJwbG90ICc7XG4gICAgdmFyIGRlc2NQYXJ0ID0gZXh0cmEuZGVzY3JpcHRpb24gPyAnICcgKyBleHRyYS5kZXNjcmlwdGlvbiA6ICcnO1xuXG4gICAgdmFyIG91dCA9IHtcbiAgICAgICAgeDogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgaG9yaXpvbnRhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgeTogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdmVydGljYWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlXG4gICAgfTtcblxuICAgIGlmKCFvcHRzLm5vR3JpZENlbGwpIHtcbiAgICAgICAgb3V0LnJvdyA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIHJvdyBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgICAgICBvdXQuY29sdW1uID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgY29sdW1uIGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBmdW5jdGlvbihjb250YWluZXJPdXQsIGxheW91dCwgY29lcmNlLCBkZmx0RG9tYWlucykge1xuICAgIHZhciBkZmx0WCA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy54KSB8fCBbMCwgMV07XG4gICAgdmFyIGRmbHRZID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLnkpIHx8IFswLCAxXTtcblxuICAgIHZhciBncmlkID0gbGF5b3V0LmdyaWQ7XG4gICAgaWYoZ3JpZCkge1xuICAgICAgICB2YXIgY29sdW1uID0gY29lcmNlKCdkb21haW4uY29sdW1uJyk7XG4gICAgICAgIGlmKGNvbHVtbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihjb2x1bW4gPCBncmlkLmNvbHVtbnMpIGRmbHRYID0gZ3JpZC5fZG9tYWlucy54W2NvbHVtbl07XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLmNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3cgPSBjb2VyY2UoJ2RvbWFpbi5yb3cnKTtcbiAgICAgICAgaWYocm93ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKHJvdyA8IGdyaWQucm93cykgZGZsdFkgPSBncmlkLl9kb21haW5zLnlbcm93XTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4ucm93O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHggPSBjb2VyY2UoJ2RvbWFpbi54JywgZGZsdFgpO1xuICAgIHZhciB5ID0gY29lcmNlKCdkb21haW4ueScsIGRmbHRZKTtcblxuICAgIC8vIGRvbid0IGFjY2VwdCBiYWQgaW5wdXQgZGF0YVxuICAgIGlmKCEoeFswXSA8IHhbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnggPSBkZmx0WC5zbGljZSgpO1xuICAgIGlmKCEoeVswXSA8IHlbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnkgPSBkZmx0WS5zbGljZSgpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG52YXIgdGlueWNvbG9yID0gcmVxdWlyZSgndGlueWNvbG9yMicpO1xudmFyIGlzQXJyYXlPclR5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi8uLi9saWInKS5pc0FycmF5T3JUeXBlZEFycmF5O1xuXG5leHBvcnRzLmNvZXJjZVN0cmluZyA9IGZ1bmN0aW9uKGF0dHJpYnV0ZURlZmluaXRpb24sIHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZih0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmKHZhbHVlIHx8ICFhdHRyaWJ1dGVEZWZpbml0aW9uLm5vQmxhbmspIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2UgaWYodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZighYXR0cmlidXRlRGVmaW5pdGlvbi5zdHJpY3QpIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgIGRlZmF1bHRWYWx1ZSA6XG4gICAgICBhdHRyaWJ1dGVEZWZpbml0aW9uLmRmbHQ7XG59O1xuXG5leHBvcnRzLmNvZXJjZU51bWJlciA9IGZ1bmN0aW9uKGF0dHJpYnV0ZURlZmluaXRpb24sIHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZihpc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuXG4gICAgICAgIHZhciBtaW4gPSBhdHRyaWJ1dGVEZWZpbml0aW9uLm1pbjtcbiAgICAgICAgdmFyIG1heCA9IGF0dHJpYnV0ZURlZmluaXRpb24ubWF4O1xuICAgICAgICB2YXIgaXNPdXRPZkJvdW5kcyA9IChtaW4gIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA8IG1pbikgfHxcbiAgICAgICAgICAgICAgKG1heCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlID4gbWF4KTtcblxuICAgICAgICBpZighaXNPdXRPZkJvdW5kcykgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpID9cbiAgICAgIGRlZmF1bHRWYWx1ZSA6XG4gICAgICBhdHRyaWJ1dGVEZWZpbml0aW9uLmRmbHQ7XG59O1xuXG5leHBvcnRzLmNvZXJjZUNvbG9yID0gZnVuY3Rpb24oYXR0cmlidXRlRGVmaW5pdGlvbiwgdmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmKHRpbnljb2xvcih2YWx1ZSkuaXNWYWxpZCgpKSByZXR1cm4gdmFsdWU7XG5cbiAgICByZXR1cm4gKGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICBkZWZhdWx0VmFsdWUgOlxuICAgICAgYXR0cmlidXRlRGVmaW5pdGlvbi5kZmx0O1xufTtcblxuZXhwb3J0cy5jb2VyY2VFbnVtZXJhdGVkID0gZnVuY3Rpb24oYXR0cmlidXRlRGVmaW5pdGlvbiwgdmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmKGF0dHJpYnV0ZURlZmluaXRpb24uY29lcmNlTnVtYmVyKSB2YWx1ZSA9ICt2YWx1ZTtcblxuICAgIGlmKGF0dHJpYnV0ZURlZmluaXRpb24udmFsdWVzLmluZGV4T2YodmFsdWUpICE9PSAtMSkgcmV0dXJuIHZhbHVlO1xuXG4gICAgcmV0dXJuIChkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgZGVmYXVsdFZhbHVlIDpcbiAgICAgIGF0dHJpYnV0ZURlZmluaXRpb24uZGZsdDtcbn07XG5cbmV4cG9ydHMuZ2V0VmFsdWUgPSBmdW5jdGlvbihhcnJheU9yU2NhbGFyLCBpbmRleCkge1xuICAgIHZhciB2YWx1ZTtcbiAgICBpZighQXJyYXkuaXNBcnJheShhcnJheU9yU2NhbGFyKSkgdmFsdWUgPSBhcnJheU9yU2NhbGFyO1xuICAgIGVsc2UgaWYoaW5kZXggPCBhcnJheU9yU2NhbGFyLmxlbmd0aCkgdmFsdWUgPSBhcnJheU9yU2NhbGFyW2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnRzLmdldExpbmVXaWR0aCA9IGZ1bmN0aW9uKHRyYWNlLCBkaSkge1xuICAgIHZhciB3ID1cbiAgICAgICAgKDAgPCBkaS5tbHcpID8gZGkubWx3IDpcbiAgICAgICAgIWlzQXJyYXlPclR5cGVkQXJyYXkodHJhY2UubWFya2VyLmxpbmUud2lkdGgpID8gdHJhY2UubWFya2VyLmxpbmUud2lkdGggOlxuICAgICAgICAwO1xuXG4gICAgcmV0dXJuIHc7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbnZhciByZXNpemVUZXh0ID0gcmVxdWlyZSgnLi91bmlmb3JtX3RleHQnKS5yZXNpemVUZXh0O1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBhdHRyaWJ1dGVUZXh0Rm9udCA9IGF0dHJpYnV0ZXMudGV4dGZvbnQ7XG52YXIgYXR0cmlidXRlSW5zaWRlVGV4dEZvbnQgPSBhdHRyaWJ1dGVzLmluc2lkZXRleHRmb250O1xudmFyIGF0dHJpYnV0ZU91dHNpZGVUZXh0Rm9udCA9IGF0dHJpYnV0ZXMub3V0c2lkZXRleHRmb250O1xudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxuZnVuY3Rpb24gc3R5bGUoZ2QpIHtcbiAgICB2YXIgcyA9IGQzLnNlbGVjdChnZCkuc2VsZWN0QWxsKCdnLmJhcmxheWVyJykuc2VsZWN0QWxsKCdnLnRyYWNlJyk7XG4gICAgcmVzaXplVGV4dChnZCwgcywgJ2JhcicpO1xuXG4gICAgdmFyIGJhcmNvdW50ID0gcy5zaXplKCk7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIC8vIHRyYWNlIHN0eWxpbmdcbiAgICBzLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZFswXS50cmFjZS5vcGFjaXR5OyB9KVxuXG4gICAgLy8gZm9yIGdhcGxlc3MgKGVpdGhlciBzdGFja2VkIG9yIG5laWdoYm9yaW5nIGdyb3VwZWQpIGJhcnMgdXNlXG4gICAgLy8gY3Jpc3BFZGdlcyB0byB0dXJuIG9mZiBhbnRpYWxpYXNpbmcgc28gYW4gYXJ0aWZpY2lhbCBnYXBcbiAgICAvLyBpc24ndCBpbnRyb2R1Y2VkLlxuICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgaWYoKGZ1bGxMYXlvdXQuYmFybW9kZSA9PT0gJ3N0YWNrJyAmJiBiYXJjb3VudCA+IDEpIHx8XG4gICAgICAgICAgICAgICAgKGZ1bGxMYXlvdXQuYmFyZ2FwID09PSAwICYmXG4gICAgICAgICAgICAgICAgIGZ1bGxMYXlvdXQuYmFyZ3JvdXBnYXAgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgIWRbMF0udHJhY2UubWFya2VyLmxpbmUud2lkdGgpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignc2hhcGUtcmVuZGVyaW5nJywgJ2NyaXNwRWRnZXMnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcy5zZWxlY3RBbGwoJ2cucG9pbnRzJykuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciB0cmFjZSA9IGRbMF0udHJhY2U7XG4gICAgICAgIHN0eWxlUG9pbnRzKHNlbCwgdHJhY2UsIGdkKTtcbiAgICB9KTtcblxuICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnZXJyb3JiYXJzJywgJ3N0eWxlJykocyk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlUG9pbnRzKHNlbCwgdHJhY2UsIGdkKSB7XG4gICAgRHJhd2luZy5wb2ludFN0eWxlKHNlbC5zZWxlY3RBbGwoJ3BhdGgnKSwgdHJhY2UsIGdkKTtcbiAgICBzdHlsZVRleHRQb2ludHMoc2VsLCB0cmFjZSwgZ2QpO1xufVxuXG5mdW5jdGlvbiBzdHlsZVRleHRQb2ludHMoc2VsLCB0cmFjZSwgZ2QpIHtcbiAgICBzZWwuc2VsZWN0QWxsKCd0ZXh0JykuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciB0eCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGZvbnQgPSBMaWIuZW5zdXJlVW5pZm9ybUZvbnRTaXplKGdkLCBkZXRlcm1pbmVGb250KHR4LCBkLCB0cmFjZSwgZ2QpKTtcblxuICAgICAgICBEcmF3aW5nLmZvbnQodHgsIGZvbnQpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzdHlsZU9uU2VsZWN0KGdkLCBjZCwgc2VsKSB7XG4gICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG5cbiAgICBpZih0cmFjZS5zZWxlY3RlZHBvaW50cykge1xuICAgICAgICBzdHlsZVBvaW50c0luU2VsZWN0aW9uTW9kZShzZWwsIHRyYWNlLCBnZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGVQb2ludHMoc2VsLCB0cmFjZSwgZ2QpO1xuICAgICAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Vycm9yYmFycycsICdzdHlsZScpKHNlbCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdHlsZVBvaW50c0luU2VsZWN0aW9uTW9kZShzLCB0cmFjZSwgZ2QpIHtcbiAgICBEcmF3aW5nLnNlbGVjdGVkUG9pbnRTdHlsZShzLnNlbGVjdEFsbCgncGF0aCcpLCB0cmFjZSk7XG4gICAgc3R5bGVUZXh0SW5TZWxlY3Rpb25Nb2RlKHMuc2VsZWN0QWxsKCd0ZXh0JyksIHRyYWNlLCBnZCk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlVGV4dEluU2VsZWN0aW9uTW9kZSh0eHMsIHRyYWNlLCBnZCkge1xuICAgIHR4cy5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHR4ID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgZm9udDtcblxuICAgICAgICBpZihkLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBmb250ID0gTGliLmVuc3VyZVVuaWZvcm1Gb250U2l6ZShnZCwgZGV0ZXJtaW5lRm9udCh0eCwgZCwgdHJhY2UsIGdkKSk7XG5cbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEZvbnRDb2xvciA9IHRyYWNlLnNlbGVjdGVkLnRleHRmb250ICYmIHRyYWNlLnNlbGVjdGVkLnRleHRmb250LmNvbG9yO1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWRGb250Q29sb3IpIHtcbiAgICAgICAgICAgICAgICBmb250LmNvbG9yID0gc2VsZWN0ZWRGb250Q29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIERyYXdpbmcuZm9udCh0eCwgZm9udCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBEcmF3aW5nLnNlbGVjdGVkVGV4dFN0eWxlKHR4LCB0cmFjZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGV0ZXJtaW5lRm9udCh0eCwgZCwgdHJhY2UsIGdkKSB7XG4gICAgdmFyIGxheW91dEZvbnQgPSBnZC5fZnVsbExheW91dC5mb250O1xuICAgIHZhciB0ZXh0Rm9udCA9IHRyYWNlLnRleHRmb250O1xuXG4gICAgaWYodHguY2xhc3NlZCgnYmFydGV4dC1pbnNpZGUnKSkge1xuICAgICAgICB2YXIgYmFyQ29sb3IgPSBnZXRCYXJDb2xvcihkLCB0cmFjZSk7XG4gICAgICAgIHRleHRGb250ID0gZ2V0SW5zaWRlVGV4dEZvbnQodHJhY2UsIGQuaSwgbGF5b3V0Rm9udCwgYmFyQ29sb3IpO1xuICAgIH0gZWxzZSBpZih0eC5jbGFzc2VkKCdiYXJ0ZXh0LW91dHNpZGUnKSkge1xuICAgICAgICB0ZXh0Rm9udCA9IGdldE91dHNpZGVUZXh0Rm9udCh0cmFjZSwgZC5pLCBsYXlvdXRGb250KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dEZvbnQ7XG59XG5cbmZ1bmN0aW9uIGdldFRleHRGb250KHRyYWNlLCBpbmRleCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIGdldEZvbnRWYWx1ZShcbiAgICAgIGF0dHJpYnV0ZVRleHRGb250LCB0cmFjZS50ZXh0Zm9udCwgaW5kZXgsIGRlZmF1bHRWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldEluc2lkZVRleHRGb250KHRyYWNlLCBpbmRleCwgbGF5b3V0Rm9udCwgYmFyQ29sb3IpIHtcbiAgICB2YXIgZGVmYXVsdEZvbnQgPSBnZXRUZXh0Rm9udCh0cmFjZSwgaW5kZXgsIGxheW91dEZvbnQpO1xuXG4gICAgdmFyIHdvdWxkRmFsbEJhY2tUb0xheW91dEZvbnQgPVxuICAgICAgKHRyYWNlLl9pbnB1dC50ZXh0Zm9udCA9PT0gdW5kZWZpbmVkIHx8IHRyYWNlLl9pbnB1dC50ZXh0Zm9udC5jb2xvciA9PT0gdW5kZWZpbmVkKSB8fFxuICAgICAgKEFycmF5LmlzQXJyYXkodHJhY2UudGV4dGZvbnQuY29sb3IpICYmIHRyYWNlLnRleHRmb250LmNvbG9yW2luZGV4XSA9PT0gdW5kZWZpbmVkKTtcbiAgICBpZih3b3VsZEZhbGxCYWNrVG9MYXlvdXRGb250KSB7XG4gICAgICAgIGRlZmF1bHRGb250ID0ge1xuICAgICAgICAgICAgY29sb3I6IENvbG9yLmNvbnRyYXN0KGJhckNvbG9yKSxcbiAgICAgICAgICAgIGZhbWlseTogZGVmYXVsdEZvbnQuZmFtaWx5LFxuICAgICAgICAgICAgc2l6ZTogZGVmYXVsdEZvbnQuc2l6ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBnZXRGb250VmFsdWUoXG4gICAgICBhdHRyaWJ1dGVJbnNpZGVUZXh0Rm9udCwgdHJhY2UuaW5zaWRldGV4dGZvbnQsIGluZGV4LCBkZWZhdWx0Rm9udCk7XG59XG5cbmZ1bmN0aW9uIGdldE91dHNpZGVUZXh0Rm9udCh0cmFjZSwgaW5kZXgsIGxheW91dEZvbnQpIHtcbiAgICB2YXIgZGVmYXVsdEZvbnQgPSBnZXRUZXh0Rm9udCh0cmFjZSwgaW5kZXgsIGxheW91dEZvbnQpO1xuICAgIHJldHVybiBnZXRGb250VmFsdWUoXG4gICAgICBhdHRyaWJ1dGVPdXRzaWRlVGV4dEZvbnQsIHRyYWNlLm91dHNpZGV0ZXh0Zm9udCwgaW5kZXgsIGRlZmF1bHRGb250KTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9udFZhbHVlKGF0dHJpYnV0ZURlZmluaXRpb24sIGF0dHJpYnV0ZVZhbHVlLCBpbmRleCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGVWYWx1ZSB8fCB7fTtcblxuICAgIHZhciBmYW1pbHlWYWx1ZSA9IGhlbHBlcnMuZ2V0VmFsdWUoYXR0cmlidXRlVmFsdWUuZmFtaWx5LCBpbmRleCk7XG4gICAgdmFyIHNpemVWYWx1ZSA9IGhlbHBlcnMuZ2V0VmFsdWUoYXR0cmlidXRlVmFsdWUuc2l6ZSwgaW5kZXgpO1xuICAgIHZhciBjb2xvclZhbHVlID0gaGVscGVycy5nZXRWYWx1ZShhdHRyaWJ1dGVWYWx1ZS5jb2xvciwgaW5kZXgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmFtaWx5OiBoZWxwZXJzLmNvZXJjZVN0cmluZyhcbiAgICAgICAgICBhdHRyaWJ1dGVEZWZpbml0aW9uLmZhbWlseSwgZmFtaWx5VmFsdWUsIGRlZmF1bHRWYWx1ZS5mYW1pbHkpLFxuICAgICAgICBzaXplOiBoZWxwZXJzLmNvZXJjZU51bWJlcihcbiAgICAgICAgICBhdHRyaWJ1dGVEZWZpbml0aW9uLnNpemUsIHNpemVWYWx1ZSwgZGVmYXVsdFZhbHVlLnNpemUpLFxuICAgICAgICBjb2xvcjogaGVscGVycy5jb2VyY2VDb2xvcihcbiAgICAgICAgICBhdHRyaWJ1dGVEZWZpbml0aW9uLmNvbG9yLCBjb2xvclZhbHVlLCBkZWZhdWx0VmFsdWUuY29sb3IpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0QmFyQ29sb3IoY2QsIHRyYWNlKSB7XG4gICAgaWYodHJhY2UudHlwZSA9PT0gJ3dhdGVyZmFsbCcpIHtcbiAgICAgICAgcmV0dXJuIHRyYWNlW2NkLmRpcl0ubWFya2VyLmNvbG9yO1xuICAgIH1cbiAgICByZXR1cm4gY2QubWMgfHwgdHJhY2UubWFya2VyLmNvbG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdHlsZTogc3R5bGUsXG4gICAgc3R5bGVUZXh0UG9pbnRzOiBzdHlsZVRleHRQb2ludHMsXG4gICAgc3R5bGVPblNlbGVjdDogc3R5bGVPblNlbGVjdCxcbiAgICBnZXRJbnNpZGVUZXh0Rm9udDogZ2V0SW5zaWRlVGV4dEZvbnQsXG4gICAgZ2V0T3V0c2lkZVRleHRGb250OiBnZXRPdXRzaWRlVGV4dEZvbnQsXG4gICAgZ2V0QmFyQ29sb3I6IGdldEJhckNvbG9yLFxuICAgIHJlc2l6ZVRleHQ6IHJlc2l6ZVRleHRcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbmZ1bmN0aW9uIHJlc2l6ZVRleHQoZ2QsIGdUcmFjZSwgdHJhY2VUeXBlKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgbWluU2l6ZSA9IGZ1bGxMYXlvdXRbJ18nICsgdHJhY2VUeXBlICsgJ1RleHRfbWluc2l6ZSddO1xuICAgIGlmKG1pblNpemUpIHtcbiAgICAgICAgdmFyIHNob3VsZEhpZGUgPSBmdWxsTGF5b3V0LnVuaWZvcm10ZXh0Lm1vZGUgPT09ICdoaWRlJztcblxuICAgICAgICB2YXIgc2VsZWN0b3I7XG4gICAgICAgIHN3aXRjaCh0cmFjZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bm5lbGFyZWEnIDpcbiAgICAgICAgICAgIGNhc2UgJ3BpZScgOlxuICAgICAgICAgICAgY2FzZSAnc3VuYnVyc3QnIDpcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICdnLnNsaWNlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RyZWVtYXAnIDpcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICdnLnNsaWNlLCBnLnBhdGhiYXInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSAnZy5wb2ludHMgPiBnLnBvaW50JztcbiAgICAgICAgfVxuXG4gICAgICAgIGdUcmFjZS5zZWxlY3RBbGwoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IGQudHJhbnNmb3JtO1xuICAgICAgICAgICAgaWYodHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLnNjYWxlID0gKHNob3VsZEhpZGUgJiYgdHJhbnNmb3JtLmhpZGUpID8gMCA6IG1pblNpemUgLyB0cmFuc2Zvcm0uZm9udFNpemU7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0KCd0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgZWwuYXR0cigndHJhbnNmb3JtJywgTGliLmdldFRleHRUcmFuc2Zvcm0odHJhbnNmb3JtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVjb3JkTWluVGV4dFNpemUoXG4gICAgdHJhY2VUeXBlLCAvLyBpblxuICAgIHRyYW5zZm9ybSwgLy8gaW5vdXRcbiAgICBmdWxsTGF5b3V0IC8vIGlub3V0XG4pIHtcbiAgICBpZihmdWxsTGF5b3V0LnVuaWZvcm10ZXh0Lm1vZGUpIHtcbiAgICAgICAgdmFyIG1pbktleSA9IGdldE1pbktleSh0cmFjZVR5cGUpO1xuICAgICAgICB2YXIgbWluU2l6ZSA9IGZ1bGxMYXlvdXQudW5pZm9ybXRleHQubWluc2l6ZTtcbiAgICAgICAgdmFyIHNpemUgPSB0cmFuc2Zvcm0uc2NhbGUgKiB0cmFuc2Zvcm0uZm9udFNpemU7XG5cbiAgICAgICAgdHJhbnNmb3JtLmhpZGUgPSBzaXplIDwgbWluU2l6ZTtcblxuICAgICAgICBmdWxsTGF5b3V0W21pbktleV0gPSBmdWxsTGF5b3V0W21pbktleV0gfHwgSW5maW5pdHk7XG4gICAgICAgIGlmKCF0cmFuc2Zvcm0uaGlkZSkge1xuICAgICAgICAgICAgZnVsbExheW91dFttaW5LZXldID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgZnVsbExheW91dFttaW5LZXldLFxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHNpemUsIG1pblNpemUpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbGVhck1pblRleHRTaXplKFxuICAgIHRyYWNlVHlwZSwgLy8gaW5cbiAgICBmdWxsTGF5b3V0IC8vIGlub3V0XG4pIHtcbiAgICB2YXIgbWluS2V5ID0gZ2V0TWluS2V5KHRyYWNlVHlwZSk7XG4gICAgZnVsbExheW91dFttaW5LZXldID0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRNaW5LZXkodHJhY2VUeXBlKSB7XG4gICAgcmV0dXJuICdfJyArIHRyYWNlVHlwZSArICdUZXh0X21pbnNpemUnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICByZWNvcmRNaW5UZXh0U2l6ZTogcmVjb3JkTWluVGV4dFNpemUsXG4gICAgY2xlYXJNaW5UZXh0U2l6ZTogY2xlYXJNaW5UZXh0U2l6ZSxcbiAgICByZXNpemVUZXh0OiByZXNpemVUZXh0XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRhaW5lcjogJ21hcmtlcicsXG4gICAgbWluOiAnY21pbicsXG4gICAgbWF4OiAnY21heCdcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwbG90cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3Bsb3RzJyk7XG5cbmV4cG9ydHMubmFtZSA9ICdzdW5idXJzdCc7XG5cbmV4cG9ydHMucGxvdCA9IGZ1bmN0aW9uKGdkLCB0cmFjZXMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgcGxvdHMucGxvdEJhc2VQbG90KGV4cG9ydHMubmFtZSwgZ2QsIHRyYWNlcywgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spO1xufTtcblxuZXhwb3J0cy5jbGVhbiA9IGZ1bmN0aW9uKG5ld0Z1bGxEYXRhLCBuZXdGdWxsTGF5b3V0LCBvbGRGdWxsRGF0YSwgb2xkRnVsbExheW91dCkge1xuICAgIHBsb3RzLmNsZWFuQmFzZVBsb3QoZXhwb3J0cy5uYW1lLCBuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2RvbWFpbicpLmRlZmF1bHRzO1xudmFyIGhhbmRsZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvZGVmYXVsdHMnKS5oYW5kbGVUZXh0O1xuXG52YXIgQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpO1xudmFyIGhhc0NvbG9yc2NhbGUgPSBDb2xvcnNjYWxlLmhhc0NvbG9yc2NhbGU7XG52YXIgY29sb3JzY2FsZURlZmF1bHRzID0gQ29sb3JzY2FsZS5oYW5kbGVEZWZhdWx0cztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIGxhYmVscyA9IGNvZXJjZSgnbGFiZWxzJyk7XG4gICAgdmFyIHBhcmVudHMgPSBjb2VyY2UoJ3BhcmVudHMnKTtcblxuICAgIGlmKCFsYWJlbHMgfHwgIWxhYmVscy5sZW5ndGggfHwgIXBhcmVudHMgfHwgIXBhcmVudHMubGVuZ3RoKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB2YWxzID0gY29lcmNlKCd2YWx1ZXMnKTtcbiAgICBpZih2YWxzICYmIHZhbHMubGVuZ3RoKSB7XG4gICAgICAgIGNvZXJjZSgnYnJhbmNodmFsdWVzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29lcmNlKCdjb3VudCcpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnbGV2ZWwnKTtcbiAgICBjb2VyY2UoJ21heGRlcHRoJyk7XG5cbiAgICB2YXIgbGluZVdpZHRoID0gY29lcmNlKCdtYXJrZXIubGluZS53aWR0aCcpO1xuICAgIGlmKGxpbmVXaWR0aCkgY29lcmNlKCdtYXJrZXIubGluZS5jb2xvcicsIGxheW91dC5wYXBlcl9iZ2NvbG9yKTtcblxuICAgIGNvZXJjZSgnbWFya2VyLmNvbG9ycycpO1xuICAgIHZhciB3aXRoQ29sb3JzY2FsZSA9IHRyYWNlT3V0Ll9oYXNDb2xvcnNjYWxlID0gKFxuICAgICAgICBoYXNDb2xvcnNjYWxlKHRyYWNlSW4sICdtYXJrZXInLCAnY29sb3JzJykgfHxcbiAgICAgICAgKHRyYWNlSW4ubWFya2VyIHx8IHt9KS5jb2xvcmF4aXMgLy8gTi5CLiBzcGVjaWFsIGxvZ2ljIHRvIGNvbnNpZGVyIFwidmFsdWVzXCIgY29sb3JzY2FsZXNcbiAgICApO1xuICAgIGlmKHdpdGhDb2xvcnNjYWxlKSB7XG4gICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdtYXJrZXIuJywgY0xldHRlcjogJ2MnfSk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdsZWFmLm9wYWNpdHknLCB3aXRoQ29sb3JzY2FsZSA/IDEgOiAwLjcpO1xuXG4gICAgdmFyIHRleHQgPSBjb2VyY2UoJ3RleHQnKTtcbiAgICBjb2VyY2UoJ3RleHR0ZW1wbGF0ZScpO1xuICAgIGlmKCF0cmFjZU91dC50ZXh0dGVtcGxhdGUpIGNvZXJjZSgndGV4dGluZm8nLCBBcnJheS5pc0FycmF5KHRleHQpID8gJ3RleHQrbGFiZWwnIDogJ2xhYmVsJyk7XG5cbiAgICBjb2VyY2UoJ2hvdmVydGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuXG4gICAgdmFyIHRleHRwb3NpdGlvbiA9ICdhdXRvJztcbiAgICBoYW5kbGVUZXh0KHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgdGV4dHBvc2l0aW9uLCB7XG4gICAgICAgIG1vZHVsZUhhc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgbW9kdWxlSGFzVW5zZWxlY3RlZDogZmFsc2UsXG4gICAgICAgIG1vZHVsZUhhc0NvbnN0cmFpbjogZmFsc2UsXG4gICAgICAgIG1vZHVsZUhhc0NsaXBvbmF4aXM6IGZhbHNlLFxuICAgICAgICBtb2R1bGVIYXNUZXh0YW5nbGU6IGZhbHNlLFxuICAgICAgICBtb2R1bGVIYXNJbnNpZGVhbmNob3I6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBjb2VyY2UoJ2luc2lkZXRleHRvcmllbnRhdGlvbicpO1xuXG4gICAgaGFuZGxlRG9tYWluRGVmYXVsdHModHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcblxuICAgIC8vIGRvIG5vdCBzdXBwb3J0IHRyYW5zZm9ybXMgZm9yIG5vd1xuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnc3VuYnVyc3QnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuL2Jhc2VfcGxvdCcpLFxuICAgIGNhdGVnb3JpZXM6IFtdLFxuICAgIGFuaW1hdGFibGU6IHRydWUsXG5cbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBsYXlvdXRBdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBzdXBwbHlMYXlvdXREZWZhdWx0czogcmVxdWlyZSgnLi9sYXlvdXRfZGVmYXVsdHMnKSxcblxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLmNhbGMsXG4gICAgY3Jvc3NUcmFjZUNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLmNyb3NzVHJhY2VDYWxjLFxuXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JykucGxvdCxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlLFxuXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFya2VyX2NvbG9yYmFyJyksXG5cbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVmlzdWFsaXplIGhpZXJhcmNoYWwgZGF0YSBzcGFubmluZyBvdXR3YXJkIHJhZGlhbGx5IGZyb20gcm9vdCB0byBsZWF2ZXMuJyxcbiAgICAgICAgICAgICdUaGUgc3VuYnVyc3Qgc2VjdG9ycyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgZW50cmllcyBpbiAqbGFiZWxzKiBvciAqaWRzKicsXG4gICAgICAgICAgICAnYW5kIGluICpwYXJlbnRzKi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3VuYnVyc3Rjb2xvcndheToge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3JsaXN0JyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBkZWZhdWx0IHN1bmJ1cnN0IHNsaWNlIGNvbG9ycy4gRGVmYXVsdHMgdG8gdGhlIG1haW4nLFxuICAgICAgICAgICAgJ2Bjb2xvcndheWAgdXNlZCBmb3IgdHJhY2UgY29sb3JzLiBJZiB5b3Ugc3BlY2lmeSBhIG5ldycsXG4gICAgICAgICAgICAnbGlzdCBoZXJlIGl0IGNhbiBzdGlsbCBiZSBleHRlbmRlZCB3aXRoIGxpZ2h0ZXIgYW5kIGRhcmtlcicsXG4gICAgICAgICAgICAnY29sb3JzLCBzZWUgYGV4dGVuZHN1bmJ1cnN0Y29sb3JzYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBleHRlbmRzdW5idXJzdGNvbG9yczoge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgYHRydWVgLCB0aGUgc3VuYnVyc3Qgc2xpY2UgY29sb3JzICh3aGV0aGVyIGdpdmVuIGJ5IGBzdW5idXJzdGNvbG9yd2F5YCBvcicsXG4gICAgICAgICAgICAnaW5oZXJpdGVkIGZyb20gYGNvbG9yd2F5YCkgd2lsbCBiZSBleHRlbmRlZCB0byB0aHJlZSB0aW1lcyBpdHMnLFxuICAgICAgICAgICAgJ29yaWdpbmFsIGxlbmd0aCBieSBmaXJzdCByZXBlYXRpbmcgZXZlcnkgY29sb3IgMjAlIGxpZ2h0ZXIgdGhlbicsXG4gICAgICAgICAgICAnZWFjaCBjb2xvciAyMCUgZGFya2VyLiBUaGlzIGlzIGludGVuZGVkIHRvIHJlZHVjZSB0aGUgbGlrZWxpaG9vZCcsXG4gICAgICAgICAgICAnb2YgcmV1c2luZyB0aGUgc2FtZSBjb2xvciB3aGVuIHlvdSBoYXZlIG1hbnkgc2xpY2VzLCBidXQgeW91IGNhbicsXG4gICAgICAgICAgICAnc2V0IGBmYWxzZWAgdG8gZGlzYWJsZS4nLFxuICAgICAgICAgICAgJ0NvbG9ycyBwcm92aWRlZCBpbiB0aGUgdHJhY2UsIHVzaW5nIGBtYXJrZXIuY29sb3JzYCwgYXJlIG5ldmVyJyxcbiAgICAgICAgICAgICdleHRlbmRlZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGxheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5TGF5b3V0RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGxheW91dEluLCBsYXlvdXRPdXQsIGxheW91dEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cbiAgICBjb2VyY2UoJ3N1bmJ1cnN0Y29sb3J3YXknLCBsYXlvdXRPdXQuY29sb3J3YXkpO1xuICAgIGNvZXJjZSgnZXh0ZW5kc3VuYnVyc3Rjb2xvcnMnKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9