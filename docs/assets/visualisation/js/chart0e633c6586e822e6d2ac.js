(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_plotly_js_lib_pie_js"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvcGllLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9kb21haW4uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXIvdW5pZm9ybV90ZXh0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGllL2Jhc2VfcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9sYXlvdXRfYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BpZS9sYXlvdXRfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9waWUvc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUhBQTZDOzs7Ozs7Ozs7Ozs7QUNWN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUJBQWlCLGlHQUFtQzs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtB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QTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7O0FBRXJCLGVBQWUsbUJBQU8sQ0FBQyx5RUFBYTtBQUNwQyxpQkFBaUIsb0hBQXlDOztBQUUxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLHVCQUF1Qjs7QUFFckQ7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wiLCJmaWxlIjoiY2hhcnQwZTYzM2M2NTg2ZTgyMmU2ZDJhYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL3BpZScpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG4vKipcbiAqIE1ha2UgYSB4eSBkb21haW4gYXR0cmlidXRlIGdyb3VwXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5uYW1lOiBuYW1lIHRvIGJlIGluc2VydGVkIGluIHRoZSBkZWZhdWx0IGRlc2NyaXB0aW9uXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLnRyYWNlOiBzZXQgdG8gdHJ1ZSBmb3IgdHJhY2UgY29udGFpbmVyc1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLmVkaXRUeXBlOiBlZGl0VHlwZSBmb3IgYWxsIHBpZWNlc1xuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy5ub0dyaWRDZWxsOiBzZXQgdG8gdHJ1ZSB0byBvbWl0IGByb3dgIGFuZCBgY29sdW1uYFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRyYVxuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBleHRyYS5kZXNjcmlwdGlvbjogZXh0cmEgZGVzY3JpcHRpb24uIE4uQiB3ZSB1c2VcbiAqICAgICBhIHNlcGFyYXRlIGV4dHJhIGNvbnRhaW5lciB0byBtYWtlIGl0IGNvbXBhdGlibGUgd2l0aFxuICogICAgIHRoZSBjb21wcmVzc19hdHRyaWJ1dGVzIHRyYW5zZm9ybS5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IGF0dHJpYnV0ZXMgb2JqZWN0IGNvbnRhaW5pbmcge3gseX0gYXMgc3BlY2lmaWVkXG4gKi9cbmV4cG9ydHMuYXR0cmlidXRlcyA9IGZ1bmN0aW9uKG9wdHMsIGV4dHJhKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgZXh0cmEgPSBleHRyYSB8fCB7fTtcblxuICAgIHZhciBiYXNlID0ge1xuICAgICAgICB2YWxUeXBlOiAnaW5mb19hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX0sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIG1pbjogMCwgbWF4OiAxLCBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZX1cbiAgICAgICAgXSxcbiAgICAgICAgZGZsdDogWzAsIDFdXG4gICAgfTtcblxuICAgIHZhciBuYW1lUGFydCA9IG9wdHMubmFtZSA/IG9wdHMubmFtZSArICcgJyA6ICcnO1xuICAgIHZhciBjb250UGFydCA9IG9wdHMudHJhY2UgPyAndHJhY2UgJyA6ICdzdWJwbG90ICc7XG4gICAgdmFyIGRlc2NQYXJ0ID0gZXh0cmEuZGVzY3JpcHRpb24gPyAnICcgKyBleHRyYS5kZXNjcmlwdGlvbiA6ICcnO1xuXG4gICAgdmFyIG91dCA9IHtcbiAgICAgICAgeDogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgaG9yaXpvbnRhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgeTogZXh0ZW5kRmxhdCh7fSwgYmFzZSwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdmVydGljYWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlXG4gICAgfTtcblxuICAgIGlmKCFvcHRzLm5vR3JpZENlbGwpIHtcbiAgICAgICAgb3V0LnJvdyA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIHJvdyBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgICAgICBvdXQuY29sdW1uID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgY29sdW1uIGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBmdW5jdGlvbihjb250YWluZXJPdXQsIGxheW91dCwgY29lcmNlLCBkZmx0RG9tYWlucykge1xuICAgIHZhciBkZmx0WCA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy54KSB8fCBbMCwgMV07XG4gICAgdmFyIGRmbHRZID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLnkpIHx8IFswLCAxXTtcblxuICAgIHZhciBncmlkID0gbGF5b3V0LmdyaWQ7XG4gICAgaWYoZ3JpZCkge1xuICAgICAgICB2YXIgY29sdW1uID0gY29lcmNlKCdkb21haW4uY29sdW1uJyk7XG4gICAgICAgIGlmKGNvbHVtbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihjb2x1bW4gPCBncmlkLmNvbHVtbnMpIGRmbHRYID0gZ3JpZC5fZG9tYWlucy54W2NvbHVtbl07XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLmNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3cgPSBjb2VyY2UoJ2RvbWFpbi5yb3cnKTtcbiAgICAgICAgaWYocm93ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKHJvdyA8IGdyaWQucm93cykgZGZsdFkgPSBncmlkLl9kb21haW5zLnlbcm93XTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4ucm93O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHggPSBjb2VyY2UoJ2RvbWFpbi54JywgZGZsdFgpO1xuICAgIHZhciB5ID0gY29lcmNlKCdkb21haW4ueScsIGRmbHRZKTtcblxuICAgIC8vIGRvbid0IGFjY2VwdCBiYWQgaW5wdXQgZGF0YVxuICAgIGlmKCEoeFswXSA8IHhbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnggPSBkZmx0WC5zbGljZSgpO1xuICAgIGlmKCEoeVswXSA8IHlbMV0pKSBjb250YWluZXJPdXQuZG9tYWluLnkgPSBkZmx0WS5zbGljZSgpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxuZnVuY3Rpb24gcmVzaXplVGV4dChnZCwgZ1RyYWNlLCB0cmFjZVR5cGUpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBtaW5TaXplID0gZnVsbExheW91dFsnXycgKyB0cmFjZVR5cGUgKyAnVGV4dF9taW5zaXplJ107XG4gICAgaWYobWluU2l6ZSkge1xuICAgICAgICB2YXIgc2hvdWxkSGlkZSA9IGZ1bGxMYXlvdXQudW5pZm9ybXRleHQubW9kZSA9PT0gJ2hpZGUnO1xuXG4gICAgICAgIHZhciBzZWxlY3RvcjtcbiAgICAgICAgc3dpdGNoKHRyYWNlVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZnVubmVsYXJlYScgOlxuICAgICAgICAgICAgY2FzZSAncGllJyA6XG4gICAgICAgICAgICBjYXNlICdzdW5idXJzdCcgOlxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJ2cuc2xpY2UnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndHJlZW1hcCcgOlxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJ2cuc2xpY2UsIGcucGF0aGJhcic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICdnLnBvaW50cyA+IGcucG9pbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgZ1RyYWNlLnNlbGVjdEFsbChzZWxlY3RvcikuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtID0gZC50cmFuc2Zvcm07XG4gICAgICAgICAgICBpZih0cmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0uc2NhbGUgPSAoc2hvdWxkSGlkZSAmJiB0cmFuc2Zvcm0uaGlkZSkgPyAwIDogbWluU2l6ZSAvIHRyYW5zZm9ybS5mb250U2l6ZTtcblxuICAgICAgICAgICAgICAgIHZhciBlbCA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3QoJ3RleHQnKTtcbiAgICAgICAgICAgICAgICBlbC5hdHRyKCd0cmFuc2Zvcm0nLCBMaWIuZ2V0VGV4dFRyYW5zZm9ybSh0cmFuc2Zvcm0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZWNvcmRNaW5UZXh0U2l6ZShcbiAgICB0cmFjZVR5cGUsIC8vIGluXG4gICAgdHJhbnNmb3JtLCAvLyBpbm91dFxuICAgIGZ1bGxMYXlvdXQgLy8gaW5vdXRcbikge1xuICAgIGlmKGZ1bGxMYXlvdXQudW5pZm9ybXRleHQubW9kZSkge1xuICAgICAgICB2YXIgbWluS2V5ID0gZ2V0TWluS2V5KHRyYWNlVHlwZSk7XG4gICAgICAgIHZhciBtaW5TaXplID0gZnVsbExheW91dC51bmlmb3JtdGV4dC5taW5zaXplO1xuICAgICAgICB2YXIgc2l6ZSA9IHRyYW5zZm9ybS5zY2FsZSAqIHRyYW5zZm9ybS5mb250U2l6ZTtcblxuICAgICAgICB0cmFuc2Zvcm0uaGlkZSA9IHNpemUgPCBtaW5TaXplO1xuXG4gICAgICAgIGZ1bGxMYXlvdXRbbWluS2V5XSA9IGZ1bGxMYXlvdXRbbWluS2V5XSB8fCBJbmZpbml0eTtcbiAgICAgICAgaWYoIXRyYW5zZm9ybS5oaWRlKSB7XG4gICAgICAgICAgICBmdWxsTGF5b3V0W21pbktleV0gPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBmdWxsTGF5b3V0W21pbktleV0sXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoc2l6ZSwgbWluU2l6ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyTWluVGV4dFNpemUoXG4gICAgdHJhY2VUeXBlLCAvLyBpblxuICAgIGZ1bGxMYXlvdXQgLy8gaW5vdXRcbikge1xuICAgIHZhciBtaW5LZXkgPSBnZXRNaW5LZXkodHJhY2VUeXBlKTtcbiAgICBmdWxsTGF5b3V0W21pbktleV0gPSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGdldE1pbktleSh0cmFjZVR5cGUpIHtcbiAgICByZXR1cm4gJ18nICsgdHJhY2VUeXBlICsgJ1RleHRfbWluc2l6ZSc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJlY29yZE1pblRleHRTaXplOiByZWNvcmRNaW5UZXh0U2l6ZSxcbiAgICBjbGVhck1pblRleHRTaXplOiBjbGVhck1pblRleHRTaXplLFxuICAgIHJlc2l6ZVRleHQ6IHJlc2l6ZVRleHRcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwbG90cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3Bsb3RzJyk7XG5cbmV4cG9ydHMubmFtZSA9ICdwaWUnO1xuXG5leHBvcnRzLnBsb3QgPSBmdW5jdGlvbihnZCwgdHJhY2VzLCB0cmFuc2l0aW9uT3B0cywgbWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgIHBsb3RzLnBsb3RCYXNlUGxvdChleHBvcnRzLm5hbWUsIGdkLCB0cmFjZXMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKTtcbn07XG5cbmV4cG9ydHMuY2xlYW4gPSBmdW5jdGlvbihuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpIHtcbiAgICBwbG90cy5jbGVhbkJhc2VQbG90KGV4cG9ydHMubmFtZSwgbmV3RnVsbERhdGEsIG5ld0Z1bGxMYXlvdXQsIG9sZEZ1bGxEYXRhLCBvbGRGdWxsTGF5b3V0KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBoYW5kbGVEb21haW5EZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2RvbWFpbicpLmRlZmF1bHRzO1xudmFyIGhhbmRsZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvZGVmYXVsdHMnKS5oYW5kbGVUZXh0O1xuXG5mdW5jdGlvbiBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZXMpIHtcbiAgICB2YXIgaGFzTGFiZWxzID0gQXJyYXkuaXNBcnJheShsYWJlbHMpO1xuICAgIHZhciBoYXNWYWx1ZXMgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh2YWx1ZXMpO1xuICAgIHZhciBsZW4gPSBNYXRoLm1pbihcbiAgICAgICAgaGFzTGFiZWxzID8gbGFiZWxzLmxlbmd0aCA6IEluZmluaXR5LFxuICAgICAgICBoYXNWYWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogSW5maW5pdHlcbiAgICApO1xuXG4gICAgaWYoIWlzRmluaXRlKGxlbikpIGxlbiA9IDA7XG5cbiAgICBpZihsZW4gJiYgaGFzVmFsdWVzKSB7XG4gICAgICAgIHZhciBoYXNQb3NpdGl2ZTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHZhbHVlc1tpXTtcbiAgICAgICAgICAgIGlmKGlzTnVtZXJpYyh2KSAmJiB2ID4gMCkge1xuICAgICAgICAgICAgICAgIGhhc1Bvc2l0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighaGFzUG9zaXRpdmUpIGxlbiA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaGFzTGFiZWxzOiBoYXNMYWJlbHMsXG4gICAgICAgIGhhc1ZhbHVlczogaGFzVmFsdWVzLFxuICAgICAgICBsZW46IGxlblxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGFiZWxzID0gY29lcmNlKCdsYWJlbHMnKTtcbiAgICB2YXIgdmFsdWVzID0gY29lcmNlKCd2YWx1ZXMnKTtcblxuICAgIHZhciByZXMgPSBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZXMpO1xuICAgIHZhciBsZW4gPSByZXMubGVuO1xuICAgIHRyYWNlT3V0Ll9oYXNMYWJlbHMgPSByZXMuaGFzTGFiZWxzO1xuICAgIHRyYWNlT3V0Ll9oYXNWYWx1ZXMgPSByZXMuaGFzVmFsdWVzO1xuXG4gICAgaWYoIXRyYWNlT3V0Ll9oYXNMYWJlbHMgJiZcbiAgICAgICAgdHJhY2VPdXQuX2hhc1ZhbHVlc1xuICAgICkge1xuICAgICAgICBjb2VyY2UoJ2xhYmVsMCcpO1xuICAgICAgICBjb2VyY2UoJ2RsYWJlbCcpO1xuICAgIH1cblxuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICB2YXIgbGluZVdpZHRoID0gY29lcmNlKCdtYXJrZXIubGluZS53aWR0aCcpO1xuICAgIGlmKGxpbmVXaWR0aCkgY29lcmNlKCdtYXJrZXIubGluZS5jb2xvcicpO1xuXG4gICAgY29lcmNlKCdtYXJrZXIuY29sb3JzJyk7XG5cbiAgICBjb2VyY2UoJ3NjYWxlZ3JvdXAnKTtcbiAgICAvLyBUT0RPOiBob2xlIG5lZWRzIHRvIGJlIGNvZXJjZWQgdG8gdGhlIHNhbWUgdmFsdWUgd2l0aGluIGEgc2NhbGVlZ3JvdXBcblxuICAgIHZhciB0ZXh0RGF0YSA9IGNvZXJjZSgndGV4dCcpO1xuICAgIHZhciB0ZXh0VGVtcGxhdGUgPSBjb2VyY2UoJ3RleHR0ZW1wbGF0ZScpO1xuICAgIHZhciB0ZXh0SW5mbztcbiAgICBpZighdGV4dFRlbXBsYXRlKSB0ZXh0SW5mbyA9IGNvZXJjZSgndGV4dGluZm8nLCBBcnJheS5pc0FycmF5KHRleHREYXRhKSA/ICd0ZXh0K3BlcmNlbnQnIDogJ3BlcmNlbnQnKTtcblxuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICBpZih0ZXh0VGVtcGxhdGUgfHwgKHRleHRJbmZvICYmIHRleHRJbmZvICE9PSAnbm9uZScpKSB7XG4gICAgICAgIHZhciB0ZXh0cG9zaXRpb24gPSBjb2VyY2UoJ3RleHRwb3NpdGlvbicpO1xuICAgICAgICBoYW5kbGVUZXh0KHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwgdGV4dHBvc2l0aW9uLCB7XG4gICAgICAgICAgICBtb2R1bGVIYXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNVbnNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZHVsZUhhc0NvbnN0cmFpbjogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNDbGlwb25heGlzOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZHVsZUhhc1RleHRhbmdsZTogZmFsc2UsXG4gICAgICAgICAgICBtb2R1bGVIYXNJbnNpZGVhbmNob3I6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBoYXNCb3RoID0gQXJyYXkuaXNBcnJheSh0ZXh0cG9zaXRpb24pIHx8IHRleHRwb3NpdGlvbiA9PT0gJ2F1dG8nO1xuICAgICAgICB2YXIgaGFzT3V0c2lkZSA9IGhhc0JvdGggfHwgdGV4dHBvc2l0aW9uID09PSAnb3V0c2lkZSc7XG4gICAgICAgIGlmKGhhc091dHNpZGUpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnYXV0b21hcmdpbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGV4dHBvc2l0aW9uID09PSAnaW5zaWRlJyB8fCB0ZXh0cG9zaXRpb24gPT09ICdhdXRvJyB8fCBBcnJheS5pc0FycmF5KHRleHRwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnaW5zaWRldGV4dG9yaWVudGF0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEb21haW5EZWZhdWx0cyh0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuXG4gICAgdmFyIGhvbGUgPSBjb2VyY2UoJ2hvbGUnKTtcbiAgICB2YXIgdGl0bGUgPSBjb2VyY2UoJ3RpdGxlLnRleHQnKTtcbiAgICBpZih0aXRsZSkge1xuICAgICAgICB2YXIgdGl0bGVQb3NpdGlvbiA9IGNvZXJjZSgndGl0bGUucG9zaXRpb24nLCBob2xlID8gJ21pZGRsZSBjZW50ZXInIDogJ3RvcCBjZW50ZXInKTtcbiAgICAgICAgaWYoIWhvbGUgJiYgdGl0bGVQb3NpdGlvbiA9PT0gJ21pZGRsZSBjZW50ZXInKSB0cmFjZU91dC50aXRsZS5wb3NpdGlvbiA9ICd0b3AgY2VudGVyJztcbiAgICAgICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAndGl0bGUuZm9udCcsIGxheW91dC5mb250KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3NvcnQnKTtcbiAgICBjb2VyY2UoJ2RpcmVjdGlvbicpO1xuICAgIGNvZXJjZSgncm90YXRpb24nKTtcbiAgICBjb2VyY2UoJ3B1bGwnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaGFuZGxlTGFiZWxzQW5kVmFsdWVzOiBoYW5kbGVMYWJlbHNBbmRWYWx1ZXMsXG4gICAgc3VwcGx5RGVmYXVsdHM6IHN1cHBseURlZmF1bHRzXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLnN1cHBseURlZmF1bHRzLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcblxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLmNhbGMsXG4gICAgY3Jvc3NUcmFjZUNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLmNyb3NzVHJhY2VDYWxjLFxuXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JykucGxvdCxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuICAgIHN0eWxlT25lOiByZXF1aXJlKCcuL3N0eWxlX29uZScpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAncGllJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi9iYXNlX3Bsb3QnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ3BpZS1saWtlJywgJ3BpZScsICdzaG93TGVnZW5kJ10sXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0EgZGF0YSB2aXN1YWxpemVkIGJ5IHRoZSBzZWN0b3JzIG9mIHRoZSBwaWUgaXMgc2V0IGluIGB2YWx1ZXNgLicsXG4gICAgICAgICAgICAnVGhlIHNlY3RvciBsYWJlbHMgYXJlIHNldCBpbiBgbGFiZWxzYC4nLFxuICAgICAgICAgICAgJ1RoZSBzZWN0b3IgY29sb3JzIGFyZSBzZXQgaW4gYG1hcmtlci5jb2xvcnNgJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGhpZGRlbmxhYmVsczoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdoaWRkZW5sYWJlbHMgaXMgdGhlIGZ1bm5lbGFyZWEgJiBwaWUgY2hhcnQgYW5hbG9nIG9mJyxcbiAgICAgICAgICAgICd2aXNpYmxlOlxcJ2xlZ2VuZG9ubHlcXCcnLFxuICAgICAgICAgICAgJ2J1dCBpdCBjYW4gY29udGFpbiBtYW55IGxhYmVscywgYW5kIGNhbiBzaW11bHRhbmVvdXNseScsXG4gICAgICAgICAgICAnaGlkZSBzbGljZXMgZnJvbSBzZXZlcmFsIHBpZXMvZnVubmVsYXJlYSBjaGFydHMnXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBwaWVjb2xvcndheToge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3JsaXN0JyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBkZWZhdWx0IHBpZSBzbGljZSBjb2xvcnMuIERlZmF1bHRzIHRvIHRoZSBtYWluJyxcbiAgICAgICAgICAgICdgY29sb3J3YXlgIHVzZWQgZm9yIHRyYWNlIGNvbG9ycy4gSWYgeW91IHNwZWNpZnkgYSBuZXcnLFxuICAgICAgICAgICAgJ2xpc3QgaGVyZSBpdCBjYW4gc3RpbGwgYmUgZXh0ZW5kZWQgd2l0aCBsaWdodGVyIGFuZCBkYXJrZXInLFxuICAgICAgICAgICAgJ2NvbG9ycywgc2VlIGBleHRlbmRwaWVjb2xvcnNgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGV4dGVuZHBpZWNvbG9yczoge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSWYgYHRydWVgLCB0aGUgcGllIHNsaWNlIGNvbG9ycyAod2hldGhlciBnaXZlbiBieSBgcGllY29sb3J3YXlgIG9yJyxcbiAgICAgICAgICAgICdpbmhlcml0ZWQgZnJvbSBgY29sb3J3YXlgKSB3aWxsIGJlIGV4dGVuZGVkIHRvIHRocmVlIHRpbWVzIGl0cycsXG4gICAgICAgICAgICAnb3JpZ2luYWwgbGVuZ3RoIGJ5IGZpcnN0IHJlcGVhdGluZyBldmVyeSBjb2xvciAyMCUgbGlnaHRlciB0aGVuJyxcbiAgICAgICAgICAgICdlYWNoIGNvbG9yIDIwJSBkYXJrZXIuIFRoaXMgaXMgaW50ZW5kZWQgdG8gcmVkdWNlIHRoZSBsaWtlbGlob29kJyxcbiAgICAgICAgICAgICdvZiByZXVzaW5nIHRoZSBzYW1lIGNvbG9yIHdoZW4geW91IGhhdmUgbWFueSBzbGljZXMsIGJ1dCB5b3UgY2FuJyxcbiAgICAgICAgICAgICdzZXQgYGZhbHNlYCB0byBkaXNhYmxlLicsXG4gICAgICAgICAgICAnQ29sb3JzIHByb3ZpZGVkIGluIHRoZSB0cmFjZSwgdXNpbmcgYG1hcmtlci5jb2xvcnNgLCBhcmUgbmV2ZXInLFxuICAgICAgICAgICAgJ2V4dGVuZGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBsYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseUxheW91dERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShsYXlvdXRJbiwgbGF5b3V0T3V0LCBsYXlvdXRBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2hpZGRlbmxhYmVscycpO1xuICAgIGNvZXJjZSgncGllY29sb3J3YXknLCBsYXlvdXRPdXQuY29sb3J3YXkpO1xuICAgIGNvZXJjZSgnZXh0ZW5kcGllY29sb3JzJyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgc3R5bGVPbmUgPSByZXF1aXJlKCcuL3N0eWxlX29uZScpO1xudmFyIHJlc2l6ZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvdW5pZm9ybV90ZXh0JykucmVzaXplVGV4dDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHlsZShnZCkge1xuICAgIHZhciBzID0gZ2QuX2Z1bGxMYXlvdXQuX3BpZWxheWVyLnNlbGVjdEFsbCgnLnRyYWNlJyk7XG4gICAgcmVzaXplVGV4dChnZCwgcywgJ3BpZScpO1xuXG4gICAgcy5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuICAgICAgICB2YXIgdHJhY2VTZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgdHJhY2VTZWxlY3Rpb24uc3R5bGUoe29wYWNpdHk6IHRyYWNlLm9wYWNpdHl9KTtcblxuICAgICAgICB0cmFjZVNlbGVjdGlvbi5zZWxlY3RBbGwoJ3BhdGguc3VyZmFjZScpLmVhY2goZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKHN0eWxlT25lLCBwdCwgdHJhY2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9