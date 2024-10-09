(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_bar_defaults_js"],{

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

/***/ "./node_modules/plotly.js/src/traces/bar/defaults.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/bar/defaults.js ***!
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
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

var handleXYDefaults = __webpack_require__(/*! ../scatter/xy_defaults */ "./node_modules/plotly.js/src/traces/scatter/xy_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ./style_defaults */ "./node_modules/plotly.js/src/traces/bar/style_defaults.js");
var getAxisGroup = __webpack_require__(/*! ../../plots/cartesian/axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js").getAxisGroup;
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js");

var coerceFont = Lib.coerceFont;

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleXYDefaults(traceIn, traceOut, layout, coerce);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('orientation', (traceOut.x && !traceOut.y) ? 'h' : 'v');
    coerce('base');
    coerce('offset');
    coerce('width');

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    var textposition = coerce('textposition');
    handleText(traceIn, traceOut, layout, coerce, textposition, {
        moduleHasSelected: true,
        moduleHasUnselected: true,
        moduleHasConstrain: true,
        moduleHasCliponaxis: true,
        moduleHasTextangle: true,
        moduleHasInsideanchor: true
    });

    handleStyleDefaults(traceIn, traceOut, coerce, defaultColor, layout);

    var lineColor = (traceOut.marker.line || {}).color;

    // override defaultColor for error bars with defaultLine
    var errorBarsSupplyDefaults = Registry.getComponentMethod('errorbars', 'supplyDefaults');
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || Color.defaultLine, {axis: 'y'});
    errorBarsSupplyDefaults(traceIn, traceOut, lineColor || Color.defaultLine, {axis: 'x', inherit: 'y'});

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
}

function handleGroupingDefaults(traceIn, traceOut, fullLayout, coerce) {
    var orientation = traceOut.orientation;
    // N.B. grouping is done across all trace types that support it
    var posAxId = traceOut[{v: 'x', h: 'y'}[orientation] + 'axis'];
    var groupId = getAxisGroup(fullLayout, posAxId) + orientation;

    var alignmentOpts = fullLayout._alignmentOpts || {};
    var alignmentgroup = coerce('alignmentgroup');

    var alignmentGroups = alignmentOpts[groupId];
    if(!alignmentGroups) alignmentGroups = alignmentOpts[groupId] = {};

    var alignmentGroupOpts = alignmentGroups[alignmentgroup];

    if(alignmentGroupOpts) {
        alignmentGroupOpts.traces.push(traceOut);
    } else {
        alignmentGroupOpts = alignmentGroups[alignmentgroup] = {
            traces: [traceOut],
            alignmentIndex: Object.keys(alignmentGroups).length,
            offsetGroups: {}
        };
    }

    var offsetgroup = coerce('offsetgroup');
    var offsetGroups = alignmentGroupOpts.offsetGroups;
    var offsetGroupOpts = offsetGroups[offsetgroup];

    if(offsetgroup) {
        if(!offsetGroupOpts) {
            offsetGroupOpts = offsetGroups[offsetgroup] = {
                offsetIndex: Object.keys(offsetGroups).length
            };
        }

        traceOut._offsetIndex = offsetGroupOpts.offsetIndex;
    }
}

function crossTraceDefaults(fullData, fullLayout) {
    var traceIn, traceOut;

    function coerce(attr) {
        return Lib.coerce(traceOut._input, traceOut, attributes, attr);
    }

    if(fullLayout.barmode === 'group') {
        for(var i = 0; i < fullData.length; i++) {
            traceOut = fullData[i];

            if(traceOut.type === 'bar') {
                traceIn = traceOut._input;
                handleGroupingDefaults(traceIn, traceOut, fullLayout, coerce);
            }
        }
    }
}

function handleText(traceIn, traceOut, layout, coerce, textposition, opts) {
    opts = opts || {};
    var moduleHasSelected = !(opts.moduleHasSelected === false);
    var moduleHasUnselected = !(opts.moduleHasUnselected === false);
    var moduleHasConstrain = !(opts.moduleHasConstrain === false);
    var moduleHasCliponaxis = !(opts.moduleHasCliponaxis === false);
    var moduleHasTextangle = !(opts.moduleHasTextangle === false);
    var moduleHasInsideanchor = !(opts.moduleHasInsideanchor === false);
    var hasPathbar = !!opts.hasPathbar;

    var hasBoth = Array.isArray(textposition) || textposition === 'auto';
    var hasInside = hasBoth || textposition === 'inside';
    var hasOutside = hasBoth || textposition === 'outside';

    if(hasInside || hasOutside) {
        var dfltFont = coerceFont(coerce, 'textfont', layout.font);

        // Note that coercing `insidetextfont` is always needed –
        // even if `textposition` is `outside` for each trace – since
        // an outside label can become an inside one, for example because
        // of a bar being stacked on top of it.
        var insideTextFontDefault = Lib.extendFlat({}, dfltFont);
        var isTraceTextfontColorSet = traceIn.textfont && traceIn.textfont.color;
        var isColorInheritedFromLayoutFont = !isTraceTextfontColorSet;
        if(isColorInheritedFromLayoutFont) {
            delete insideTextFontDefault.color;
        }
        coerceFont(coerce, 'insidetextfont', insideTextFontDefault);

        if(hasPathbar) {
            var pathbarTextFontDefault = Lib.extendFlat({}, dfltFont);
            if(isColorInheritedFromLayoutFont) {
                delete pathbarTextFontDefault.color;
            }
            coerceFont(coerce, 'pathbar.textfont', pathbarTextFontDefault);
        }

        if(hasOutside) coerceFont(coerce, 'outsidetextfont', dfltFont);

        if(moduleHasSelected) coerce('selected.textfont.color');
        if(moduleHasUnselected) coerce('unselected.textfont.color');
        if(moduleHasConstrain) coerce('constraintext');
        if(moduleHasCliponaxis) coerce('cliponaxis');
        if(moduleHasTextangle) coerce('textangle');

        coerce('texttemplate');
    }

    if(hasInside) {
        if(moduleHasInsideanchor) coerce('insidetextanchor');
    }
}

module.exports = {
    supplyDefaults: supplyDefaults,
    crossTraceDefaults: crossTraceDefaults,
    handleGroupingDefaults: handleGroupingDefaults,
    handleText: handleText
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

/***/ "./node_modules/plotly.js/src/traces/scatter/xy_defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatter/xy_defaults.js ***!
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
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

module.exports = function handleXYDefaults(traceIn, traceOut, layout, coerce) {
    var x = coerce('x');
    var y = coerce('y');
    var len;

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y'], layout);

    if(x) {
        var xlen = Lib.minRowLength(x);
        if(y) {
            len = Math.min(xlen, Lib.minRowLength(y));
        } else {
            len = xlen;
            coerce('y0');
            coerce('dy');
        }
    } else {
        if(!y) return 0;

        len = Lib.minRowLength(y);
        coerce('x0');
        coerce('dx');
    }

    traceOut._length = len;

    return len;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFyL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Jhci9zdHlsZV9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIveHlfZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsd0ZBQXVCO0FBQ2xELHlCQUF5QiwwSUFBNkQ7QUFDdEYsd0JBQXdCLHlJQUE0RDtBQUNwRixzQkFBc0IsbUJBQU8sQ0FBQyxnSEFBd0M7QUFDdEUsZ0JBQWdCLG1CQUFPLENBQUMsMEZBQTZCO0FBQ3JELGdCQUFnQixtQkFBTyxDQUFDLHlFQUFhOztBQUVyQyxpQkFBaUIsb0dBQXNDOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBLG1DQUFtQztBQUNuQyxtQ0FBbUMsVUFBVTs7QUFFN0M7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RUE7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydDJhZjYyMmUyNTMxMjMyNjY1Nzc0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NhdHRlckF0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hdHRyaWJ1dGVzJyk7XG52YXIgaG92ZXJ0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLmhvdmVydGVtcGxhdGVBdHRycztcbnZhciB0ZXh0dGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS50ZXh0dGVtcGxhdGVBdHRycztcbnZhciBjb2xvclNjYWxlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvYXR0cmlidXRlcycpO1xudmFyIGZvbnRBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2ZvbnRfYXR0cmlidXRlcycpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbnZhciB0ZXh0Rm9udEF0dHJzID0gZm9udEF0dHJzKHtcbiAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgIGFycmF5T2s6IHRydWUsXG4gICAgY29sb3JFZGl0VHlwZTogJ3N0eWxlJyxcbiAgICBkZXNjcmlwdGlvbjogJydcbn0pO1xuXG52YXIgc2NhdHRlck1hcmtlckF0dHJzID0gc2NhdHRlckF0dHJzLm1hcmtlcjtcbnZhciBzY2F0dGVyTWFya2VyTGluZUF0dHJzID0gc2NhdHRlck1hcmtlckF0dHJzLmxpbmU7XG5cbnZhciBtYXJrZXJMaW5lV2lkdGggPSBleHRlbmRGbGF0KHt9LFxuICAgIHNjYXR0ZXJNYXJrZXJMaW5lQXR0cnMud2lkdGgsIHsgZGZsdDogMCB9KTtcblxudmFyIG1hcmtlckxpbmUgPSBleHRlbmRGbGF0KHtcbiAgICB3aWR0aDogbWFya2VyTGluZVdpZHRoLFxuICAgIGVkaXRUeXBlOiAnY2FsYydcbn0sIGNvbG9yU2NhbGVBdHRycygnbWFya2VyLmxpbmUnKSk7XG5cbnZhciBtYXJrZXIgPSBleHRlbmRGbGF0KHtcbiAgICBsaW5lOiBtYXJrZXJMaW5lLFxuICAgIGVkaXRUeXBlOiAnY2FsYydcbn0sIGNvbG9yU2NhbGVBdHRycygnbWFya2VyJyksIHtcbiAgICBvcGFjaXR5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICBkZmx0OiAxLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgYmFycy4nXG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHg6IHNjYXR0ZXJBdHRycy54LFxuICAgIHgwOiBzY2F0dGVyQXR0cnMueDAsXG4gICAgZHg6IHNjYXR0ZXJBdHRycy5keCxcbiAgICB5OiBzY2F0dGVyQXR0cnMueSxcbiAgICB5MDogc2NhdHRlckF0dHJzLnkwLFxuICAgIGR5OiBzY2F0dGVyQXR0cnMuZHksXG5cbiAgICB0ZXh0OiBzY2F0dGVyQXR0cnMudGV4dCxcbiAgICB0ZXh0dGVtcGxhdGU6IHRleHR0ZW1wbGF0ZUF0dHJzKHtlZGl0VHlwZTogJ3Bsb3QnfSwge1xuICAgICAgICBrZXlzOiBjb25zdGFudHMuZXZlbnREYXRhS2V5c1xuICAgIH0pLFxuICAgIGhvdmVydGV4dDogc2NhdHRlckF0dHJzLmhvdmVydGV4dCxcbiAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlQXR0cnMoe30sIHtcbiAgICAgICAga2V5czogY29uc3RhbnRzLmV2ZW50RGF0YUtleXNcbiAgICB9KSxcblxuICAgIHRleHRwb3NpdGlvbjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgdmFsdWVzOiBbJ2luc2lkZScsICdvdXRzaWRlJywgJ2F1dG8nLCAnbm9uZSddLFxuICAgICAgICBkZmx0OiAnbm9uZScsXG4gICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU3BlY2lmaWVzIHRoZSBsb2NhdGlvbiBvZiB0aGUgYHRleHRgLicsXG4gICAgICAgICAgICAnKmluc2lkZSogcG9zaXRpb25zIGB0ZXh0YCBpbnNpZGUsIG5leHQgdG8gdGhlIGJhciBlbmQnLFxuICAgICAgICAgICAgJyhyb3RhdGVkIGFuZCBzY2FsZWQgaWYgbmVlZGVkKS4nLFxuICAgICAgICAgICAgJypvdXRzaWRlKiBwb3NpdGlvbnMgYHRleHRgIG91dHNpZGUsIG5leHQgdG8gdGhlIGJhciBlbmQnLFxuICAgICAgICAgICAgJyhzY2FsZWQgaWYgbmVlZGVkKSwgdW5sZXNzIHRoZXJlIGlzIGFub3RoZXIgYmFyIHN0YWNrZWQgb24nLFxuICAgICAgICAgICAgJ3RoaXMgb25lLCB0aGVuIHRoZSB0ZXh0IGdldHMgcHVzaGVkIGluc2lkZS4nLFxuICAgICAgICAgICAgJyphdXRvKiB0cmllcyB0byBwb3NpdGlvbiBgdGV4dGAgaW5zaWRlIHRoZSBiYXIsIGJ1dCBpZicsXG4gICAgICAgICAgICAndGhlIGJhciBpcyB0b28gc21hbGwgYW5kIG5vIGJhciBpcyBzdGFja2VkIG9uIHRoaXMgb25lJyxcbiAgICAgICAgICAgICd0aGUgdGV4dCBpcyBtb3ZlZCBvdXRzaWRlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgaW5zaWRldGV4dGFuY2hvcjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydlbmQnLCAnbWlkZGxlJywgJ3N0YXJ0J10sXG4gICAgICAgIGRmbHQ6ICdlbmQnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyBpZiB0ZXh0cyBhcmUga2VwdCBhdCBjZW50ZXIgb3Igc3RhcnQvZW5kIHBvaW50cyBpbiBgdGV4dHBvc2l0aW9uYCAqaW5zaWRlKiBtb2RlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgdGV4dGFuZ2xlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbmdsZScsXG4gICAgICAgIGRmbHQ6ICdhdXRvJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGFuZ2xlIG9mIHRoZSB0aWNrIGxhYmVscyB3aXRoIHJlc3BlY3QgdG8gdGhlIGJhci4nLFxuICAgICAgICAgICAgJ0ZvciBleGFtcGxlLCBhIGB0aWNrYW5nbGVgIG9mIC05MCBkcmF3cyB0aGUgdGljayBsYWJlbHMnLFxuICAgICAgICAgICAgJ3ZlcnRpY2FsbHkuIFdpdGggKmF1dG8qIHRoZSB0ZXh0cyBtYXkgYXV0b21hdGljYWxseSBiZScsXG4gICAgICAgICAgICAncm90YXRlZCB0byBmaXQgd2l0aCB0aGUgbWF4aW11bSBzaXplIGluIGJhcnMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICB0ZXh0Zm9udDogZXh0ZW5kRmxhdCh7fSwgdGV4dEZvbnRBdHRycywge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGZvbnQgdXNlZCBmb3IgYHRleHRgLidcbiAgICB9KSxcblxuICAgIGluc2lkZXRleHRmb250OiBleHRlbmRGbGF0KHt9LCB0ZXh0Rm9udEF0dHJzLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZm9udCB1c2VkIGZvciBgdGV4dGAgbHlpbmcgaW5zaWRlIHRoZSBiYXIuJ1xuICAgIH0pLFxuXG4gICAgb3V0c2lkZXRleHRmb250OiBleHRlbmRGbGF0KHt9LCB0ZXh0Rm9udEF0dHJzLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZm9udCB1c2VkIGZvciBgdGV4dGAgbHlpbmcgb3V0c2lkZSB0aGUgYmFyLidcbiAgICB9KSxcblxuICAgIGNvbnN0cmFpbnRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnaW5zaWRlJywgJ291dHNpZGUnLCAnYm90aCcsICdub25lJ10sXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogJ2JvdGgnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0NvbnN0cmFpbiB0aGUgc2l6ZSBvZiB0ZXh0IGluc2lkZSBvciBvdXRzaWRlIGEgYmFyIHRvIGJlIG5vJyxcbiAgICAgICAgICAgICdsYXJnZXIgdGhhbiB0aGUgYmFyIGl0c2VsZi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGNsaXBvbmF4aXM6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5jbGlwb25heGlzLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSB0ZXh0IG5vZGVzJyxcbiAgICAgICAgICAgICdhcmUgY2xpcHBlZCBhYm91dCB0aGUgc3VicGxvdCBheGVzLicsXG4gICAgICAgICAgICAnVG8gc2hvdyB0aGUgdGV4dCBub2RlcyBhYm92ZSBheGlzIGxpbmVzIGFuZCB0aWNrIGxhYmVscywnLFxuICAgICAgICAgICAgJ21ha2Ugc3VyZSB0byBzZXQgYHhheGlzLmxheWVyYCBhbmQgYHlheGlzLmxheWVyYCB0byAqYmVsb3cgdHJhY2VzKi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG5cbiAgICBvcmllbnRhdGlvbjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgdmFsdWVzOiBbJ3YnLCAnaCddLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBiYXJzLicsXG4gICAgICAgICAgICAnV2l0aCAqdiogKCpoKiksIHRoZSB2YWx1ZSBvZiB0aGUgZWFjaCBiYXIgc3BhbnMnLFxuICAgICAgICAgICAgJ2Fsb25nIHRoZSB2ZXJ0aWNhbCAoaG9yaXpvbnRhbCkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBiYXNlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICBkZmx0OiBudWxsLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB3aGVyZSB0aGUgYmFyIGJhc2UgaXMgZHJhd24gKGluIHBvc2l0aW9uIGF4aXMgdW5pdHMpLicsXG4gICAgICAgICAgICAnSW4gKnN0YWNrKiBvciAqcmVsYXRpdmUqIGJhcm1vZGUsJyxcbiAgICAgICAgICAgICd0cmFjZXMgdGhhdCBzZXQgKmJhc2UqIHdpbGwgYmUgZXhjbHVkZWQnLFxuICAgICAgICAgICAgJ2FuZCBkcmF3biBpbiAqb3ZlcmxheSogbW9kZSBpbnN0ZWFkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgb2Zmc2V0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBkZmx0OiBudWxsLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2hpZnRzIHRoZSBwb3NpdGlvbiB3aGVyZSB0aGUgYmFyIGlzIGRyYXduJyxcbiAgICAgICAgICAgICcoaW4gcG9zaXRpb24gYXhpcyB1bml0cykuJyxcbiAgICAgICAgICAgICdJbiAqZ3JvdXAqIGJhcm1vZGUsJyxcbiAgICAgICAgICAgICd0cmFjZXMgdGhhdCBzZXQgKm9mZnNldCogd2lsbCBiZSBleGNsdWRlZCcsXG4gICAgICAgICAgICAnYW5kIGRyYXduIGluICpvdmVybGF5KiBtb2RlIGluc3RlYWQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICB3aWR0aDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYmFyIHdpZHRoIChpbiBwb3NpdGlvbiBheGlzIHVuaXRzKS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIG1hcmtlcjogbWFya2VyLFxuXG4gICAgb2Zmc2V0Z3JvdXA6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0IHNldmVyYWwgdHJhY2VzIGxpbmtlZCB0byB0aGUgc2FtZSBwb3NpdGlvbiBheGlzJyxcbiAgICAgICAgICAgICdvciBtYXRjaGluZyBheGVzIHRvIHRoZSBzYW1lJyxcbiAgICAgICAgICAgICdvZmZzZXRncm91cCB3aGVyZSBiYXJzIG9mIHRoZSBzYW1lIHBvc2l0aW9uIGNvb3JkaW5hdGUgd2lsbCBsaW5lIHVwLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGFsaWdubWVudGdyb3VwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldCBzZXZlcmFsIHRyYWNlcyBsaW5rZWQgdG8gdGhlIHNhbWUgcG9zaXRpb24gYXhpcycsXG4gICAgICAgICAgICAnb3IgbWF0Y2hpbmcgYXhlcyB0byB0aGUgc2FtZScsXG4gICAgICAgICAgICAnYWxpZ25tZW50Z3JvdXAuIFRoaXMgY29udHJvbHMgd2hldGhlciBiYXJzIGNvbXB1dGUgdGhlaXIgcG9zaXRpb25hbCcsXG4gICAgICAgICAgICAncmFuZ2UgZGVwZW5kZW50bHkgb3IgaW5kZXBlbmRlbnRseS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHNlbGVjdGVkOiB7XG4gICAgICAgIG1hcmtlcjoge1xuICAgICAgICAgICAgb3BhY2l0eTogc2NhdHRlckF0dHJzLnNlbGVjdGVkLm1hcmtlci5vcGFjaXR5LFxuICAgICAgICAgICAgY29sb3I6IHNjYXR0ZXJBdHRycy5zZWxlY3RlZC5tYXJrZXIuY29sb3IsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgICAgICB9LFxuICAgICAgICB0ZXh0Zm9udDogc2NhdHRlckF0dHJzLnNlbGVjdGVkLnRleHRmb250LFxuICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJ1xuICAgIH0sXG4gICAgdW5zZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IHNjYXR0ZXJBdHRycy51bnNlbGVjdGVkLm1hcmtlci5vcGFjaXR5LFxuICAgICAgICAgICAgY29sb3I6IHNjYXR0ZXJBdHRycy51bnNlbGVjdGVkLm1hcmtlci5jb2xvcixcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnc3R5bGUnXG4gICAgICAgIH0sXG4gICAgICAgIHRleHRmb250OiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZC50ZXh0Zm9udCxcbiAgICAgICAgZWRpdFR5cGU6ICdzdHlsZSdcbiAgICB9LFxuXG4gICAgcjogc2NhdHRlckF0dHJzLnIsXG4gICAgdDogc2NhdHRlckF0dHJzLnQsXG5cbiAgICBfZGVwcmVjYXRlZDoge1xuICAgICAgICBiYXJkaXI6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICB2YWx1ZXM6IFsndicsICdoJ10sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JlbmFtZWQgdG8gYG9yaWVudGF0aW9uYC4nXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIHBhZGRpbmcgaW4gcGl4ZWxzIGFyb3VuZCB0ZXh0XG4gICAgVEVYVFBBRDogMyxcbiAgICAvLyAndmFsdWUnIGFuZCAnbGFiZWwnIGFyZSBub3QgcmVhbGx5IG5lY2Vzc2FyeSBmb3IgYmFyIHRyYWNlcyxcbiAgICAvLyBidXQgdGhleSB3ZXJlIG1hZGUgYXZhaWxhYmxlIHRvIGB0ZXh0dGVtcGxhdGVgIChtYXliZSBieSBhY2NpZGVudClcbiAgICAvLyB2aWEgdG9rZW5zIGAle3ZhbHVlfWAgYW5kIGAle2xhYmVsfWAgc3RhcnRpbmcgaW4gMS41MC4wLFxuICAgIC8vIHNvIGxldCdzIGluY2x1ZGUgdGhlbSBpbiB0aGUgZXZlbnQgZGF0YSBhbHNvLlxuICAgIGV2ZW50RGF0YUtleXM6IFsndmFsdWUnLCAnbGFiZWwnXVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxudmFyIGhhbmRsZVhZRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3h5X2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlU3R5bGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4vc3R5bGVfZGVmYXVsdHMnKTtcbnZhciBnZXRBeGlzR3JvdXAgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhpc19pZHMnKS5nZXRBeGlzR3JvdXA7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG52YXIgY29lcmNlRm9udCA9IExpYi5jb2VyY2VGb250O1xuXG5mdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIGxlbiA9IGhhbmRsZVhZRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcbiAgICBpZighbGVuKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgnb3JpZW50YXRpb24nLCAodHJhY2VPdXQueCAmJiAhdHJhY2VPdXQueSkgPyAnaCcgOiAndicpO1xuICAgIGNvZXJjZSgnYmFzZScpO1xuICAgIGNvZXJjZSgnb2Zmc2V0Jyk7XG4gICAgY29lcmNlKCd3aWR0aCcpO1xuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIHZhciB0ZXh0cG9zaXRpb24gPSBjb2VyY2UoJ3RleHRwb3NpdGlvbicpO1xuICAgIGhhbmRsZVRleHQodHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB0ZXh0cG9zaXRpb24sIHtcbiAgICAgICAgbW9kdWxlSGFzU2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgIG1vZHVsZUhhc1Vuc2VsZWN0ZWQ6IHRydWUsXG4gICAgICAgIG1vZHVsZUhhc0NvbnN0cmFpbjogdHJ1ZSxcbiAgICAgICAgbW9kdWxlSGFzQ2xpcG9uYXhpczogdHJ1ZSxcbiAgICAgICAgbW9kdWxlSGFzVGV4dGFuZ2xlOiB0cnVlLFxuICAgICAgICBtb2R1bGVIYXNJbnNpZGVhbmNob3I6IHRydWVcbiAgICB9KTtcblxuICAgIGhhbmRsZVN0eWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgZGVmYXVsdENvbG9yLCBsYXlvdXQpO1xuXG4gICAgdmFyIGxpbmVDb2xvciA9ICh0cmFjZU91dC5tYXJrZXIubGluZSB8fCB7fSkuY29sb3I7XG5cbiAgICAvLyBvdmVycmlkZSBkZWZhdWx0Q29sb3IgZm9yIGVycm9yIGJhcnMgd2l0aCBkZWZhdWx0TGluZVxuICAgIHZhciBlcnJvckJhcnNTdXBwbHlEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnZXJyb3JiYXJzJywgJ3N1cHBseURlZmF1bHRzJyk7XG4gICAgZXJyb3JCYXJzU3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxpbmVDb2xvciB8fCBDb2xvci5kZWZhdWx0TGluZSwge2F4aXM6ICd5J30pO1xuICAgIGVycm9yQmFyc1N1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsaW5lQ29sb3IgfHwgQ29sb3IuZGVmYXVsdExpbmUsIHtheGlzOiAneCcsIGluaGVyaXQ6ICd5J30pO1xuXG4gICAgTGliLmNvZXJjZVNlbGVjdGlvbk1hcmtlck9wYWNpdHkodHJhY2VPdXQsIGNvZXJjZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUdyb3VwaW5nRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGZ1bGxMYXlvdXQsIGNvZXJjZSkge1xuICAgIHZhciBvcmllbnRhdGlvbiA9IHRyYWNlT3V0Lm9yaWVudGF0aW9uO1xuICAgIC8vIE4uQi4gZ3JvdXBpbmcgaXMgZG9uZSBhY3Jvc3MgYWxsIHRyYWNlIHR5cGVzIHRoYXQgc3VwcG9ydCBpdFxuICAgIHZhciBwb3NBeElkID0gdHJhY2VPdXRbe3Y6ICd4JywgaDogJ3knfVtvcmllbnRhdGlvbl0gKyAnYXhpcyddO1xuICAgIHZhciBncm91cElkID0gZ2V0QXhpc0dyb3VwKGZ1bGxMYXlvdXQsIHBvc0F4SWQpICsgb3JpZW50YXRpb247XG5cbiAgICB2YXIgYWxpZ25tZW50T3B0cyA9IGZ1bGxMYXlvdXQuX2FsaWdubWVudE9wdHMgfHwge307XG4gICAgdmFyIGFsaWdubWVudGdyb3VwID0gY29lcmNlKCdhbGlnbm1lbnRncm91cCcpO1xuXG4gICAgdmFyIGFsaWdubWVudEdyb3VwcyA9IGFsaWdubWVudE9wdHNbZ3JvdXBJZF07XG4gICAgaWYoIWFsaWdubWVudEdyb3VwcykgYWxpZ25tZW50R3JvdXBzID0gYWxpZ25tZW50T3B0c1tncm91cElkXSA9IHt9O1xuXG4gICAgdmFyIGFsaWdubWVudEdyb3VwT3B0cyA9IGFsaWdubWVudEdyb3Vwc1thbGlnbm1lbnRncm91cF07XG5cbiAgICBpZihhbGlnbm1lbnRHcm91cE9wdHMpIHtcbiAgICAgICAgYWxpZ25tZW50R3JvdXBPcHRzLnRyYWNlcy5wdXNoKHRyYWNlT3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhbGlnbm1lbnRHcm91cE9wdHMgPSBhbGlnbm1lbnRHcm91cHNbYWxpZ25tZW50Z3JvdXBdID0ge1xuICAgICAgICAgICAgdHJhY2VzOiBbdHJhY2VPdXRdLFxuICAgICAgICAgICAgYWxpZ25tZW50SW5kZXg6IE9iamVjdC5rZXlzKGFsaWdubWVudEdyb3VwcykubGVuZ3RoLFxuICAgICAgICAgICAgb2Zmc2V0R3JvdXBzOiB7fVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBvZmZzZXRncm91cCA9IGNvZXJjZSgnb2Zmc2V0Z3JvdXAnKTtcbiAgICB2YXIgb2Zmc2V0R3JvdXBzID0gYWxpZ25tZW50R3JvdXBPcHRzLm9mZnNldEdyb3VwcztcbiAgICB2YXIgb2Zmc2V0R3JvdXBPcHRzID0gb2Zmc2V0R3JvdXBzW29mZnNldGdyb3VwXTtcblxuICAgIGlmKG9mZnNldGdyb3VwKSB7XG4gICAgICAgIGlmKCFvZmZzZXRHcm91cE9wdHMpIHtcbiAgICAgICAgICAgIG9mZnNldEdyb3VwT3B0cyA9IG9mZnNldEdyb3Vwc1tvZmZzZXRncm91cF0gPSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0SW5kZXg6IE9iamVjdC5rZXlzKG9mZnNldEdyb3VwcykubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhY2VPdXQuX29mZnNldEluZGV4ID0gb2Zmc2V0R3JvdXBPcHRzLm9mZnNldEluZGV4O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3Jvc3NUcmFjZURlZmF1bHRzKGZ1bGxEYXRhLCBmdWxsTGF5b3V0KSB7XG4gICAgdmFyIHRyYWNlSW4sIHRyYWNlT3V0O1xuXG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VPdXQuX2lucHV0LCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0cik7XG4gICAgfVxuXG4gICAgaWYoZnVsbExheW91dC5iYXJtb2RlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBmdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJhY2VPdXQgPSBmdWxsRGF0YVtpXTtcblxuICAgICAgICAgICAgaWYodHJhY2VPdXQudHlwZSA9PT0gJ2JhcicpIHtcbiAgICAgICAgICAgICAgICB0cmFjZUluID0gdHJhY2VPdXQuX2lucHV0O1xuICAgICAgICAgICAgICAgIGhhbmRsZUdyb3VwaW5nRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGZ1bGxMYXlvdXQsIGNvZXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVRleHQodHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB0ZXh0cG9zaXRpb24sIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgbW9kdWxlSGFzU2VsZWN0ZWQgPSAhKG9wdHMubW9kdWxlSGFzU2VsZWN0ZWQgPT09IGZhbHNlKTtcbiAgICB2YXIgbW9kdWxlSGFzVW5zZWxlY3RlZCA9ICEob3B0cy5tb2R1bGVIYXNVbnNlbGVjdGVkID09PSBmYWxzZSk7XG4gICAgdmFyIG1vZHVsZUhhc0NvbnN0cmFpbiA9ICEob3B0cy5tb2R1bGVIYXNDb25zdHJhaW4gPT09IGZhbHNlKTtcbiAgICB2YXIgbW9kdWxlSGFzQ2xpcG9uYXhpcyA9ICEob3B0cy5tb2R1bGVIYXNDbGlwb25heGlzID09PSBmYWxzZSk7XG4gICAgdmFyIG1vZHVsZUhhc1RleHRhbmdsZSA9ICEob3B0cy5tb2R1bGVIYXNUZXh0YW5nbGUgPT09IGZhbHNlKTtcbiAgICB2YXIgbW9kdWxlSGFzSW5zaWRlYW5jaG9yID0gIShvcHRzLm1vZHVsZUhhc0luc2lkZWFuY2hvciA9PT0gZmFsc2UpO1xuICAgIHZhciBoYXNQYXRoYmFyID0gISFvcHRzLmhhc1BhdGhiYXI7XG5cbiAgICB2YXIgaGFzQm90aCA9IEFycmF5LmlzQXJyYXkodGV4dHBvc2l0aW9uKSB8fCB0ZXh0cG9zaXRpb24gPT09ICdhdXRvJztcbiAgICB2YXIgaGFzSW5zaWRlID0gaGFzQm90aCB8fCB0ZXh0cG9zaXRpb24gPT09ICdpbnNpZGUnO1xuICAgIHZhciBoYXNPdXRzaWRlID0gaGFzQm90aCB8fCB0ZXh0cG9zaXRpb24gPT09ICdvdXRzaWRlJztcblxuICAgIGlmKGhhc0luc2lkZSB8fCBoYXNPdXRzaWRlKSB7XG4gICAgICAgIHZhciBkZmx0Rm9udCA9IGNvZXJjZUZvbnQoY29lcmNlLCAndGV4dGZvbnQnLCBsYXlvdXQuZm9udCk7XG5cbiAgICAgICAgLy8gTm90ZSB0aGF0IGNvZXJjaW5nIGBpbnNpZGV0ZXh0Zm9udGAgaXMgYWx3YXlzIG5lZWRlZCDigJNcbiAgICAgICAgLy8gZXZlbiBpZiBgdGV4dHBvc2l0aW9uYCBpcyBgb3V0c2lkZWAgZm9yIGVhY2ggdHJhY2Ug4oCTIHNpbmNlXG4gICAgICAgIC8vIGFuIG91dHNpZGUgbGFiZWwgY2FuIGJlY29tZSBhbiBpbnNpZGUgb25lLCBmb3IgZXhhbXBsZSBiZWNhdXNlXG4gICAgICAgIC8vIG9mIGEgYmFyIGJlaW5nIHN0YWNrZWQgb24gdG9wIG9mIGl0LlxuICAgICAgICB2YXIgaW5zaWRlVGV4dEZvbnREZWZhdWx0ID0gTGliLmV4dGVuZEZsYXQoe30sIGRmbHRGb250KTtcbiAgICAgICAgdmFyIGlzVHJhY2VUZXh0Zm9udENvbG9yU2V0ID0gdHJhY2VJbi50ZXh0Zm9udCAmJiB0cmFjZUluLnRleHRmb250LmNvbG9yO1xuICAgICAgICB2YXIgaXNDb2xvckluaGVyaXRlZEZyb21MYXlvdXRGb250ID0gIWlzVHJhY2VUZXh0Zm9udENvbG9yU2V0O1xuICAgICAgICBpZihpc0NvbG9ySW5oZXJpdGVkRnJvbUxheW91dEZvbnQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBpbnNpZGVUZXh0Rm9udERlZmF1bHQuY29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgY29lcmNlRm9udChjb2VyY2UsICdpbnNpZGV0ZXh0Zm9udCcsIGluc2lkZVRleHRGb250RGVmYXVsdCk7XG5cbiAgICAgICAgaWYoaGFzUGF0aGJhcikge1xuICAgICAgICAgICAgdmFyIHBhdGhiYXJUZXh0Rm9udERlZmF1bHQgPSBMaWIuZXh0ZW5kRmxhdCh7fSwgZGZsdEZvbnQpO1xuICAgICAgICAgICAgaWYoaXNDb2xvckluaGVyaXRlZEZyb21MYXlvdXRGb250KSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBhdGhiYXJUZXh0Rm9udERlZmF1bHQuY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2VyY2VGb250KGNvZXJjZSwgJ3BhdGhiYXIudGV4dGZvbnQnLCBwYXRoYmFyVGV4dEZvbnREZWZhdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGhhc091dHNpZGUpIGNvZXJjZUZvbnQoY29lcmNlLCAnb3V0c2lkZXRleHRmb250JywgZGZsdEZvbnQpO1xuXG4gICAgICAgIGlmKG1vZHVsZUhhc1NlbGVjdGVkKSBjb2VyY2UoJ3NlbGVjdGVkLnRleHRmb250LmNvbG9yJyk7XG4gICAgICAgIGlmKG1vZHVsZUhhc1Vuc2VsZWN0ZWQpIGNvZXJjZSgndW5zZWxlY3RlZC50ZXh0Zm9udC5jb2xvcicpO1xuICAgICAgICBpZihtb2R1bGVIYXNDb25zdHJhaW4pIGNvZXJjZSgnY29uc3RyYWludGV4dCcpO1xuICAgICAgICBpZihtb2R1bGVIYXNDbGlwb25heGlzKSBjb2VyY2UoJ2NsaXBvbmF4aXMnKTtcbiAgICAgICAgaWYobW9kdWxlSGFzVGV4dGFuZ2xlKSBjb2VyY2UoJ3RleHRhbmdsZScpO1xuXG4gICAgICAgIGNvZXJjZSgndGV4dHRlbXBsYXRlJyk7XG4gICAgfVxuXG4gICAgaWYoaGFzSW5zaWRlKSB7XG4gICAgICAgIGlmKG1vZHVsZUhhc0luc2lkZWFuY2hvcikgY29lcmNlKCdpbnNpZGV0ZXh0YW5jaG9yJyk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdXBwbHlEZWZhdWx0czogc3VwcGx5RGVmYXVsdHMsXG4gICAgY3Jvc3NUcmFjZURlZmF1bHRzOiBjcm9zc1RyYWNlRGVmYXVsdHMsXG4gICAgaGFuZGxlR3JvdXBpbmdEZWZhdWx0czogaGFuZGxlR3JvdXBpbmdEZWZhdWx0cyxcbiAgICBoYW5kbGVUZXh0OiBoYW5kbGVUZXh0XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVTdHlsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgY29lcmNlKCdtYXJrZXIuY29sb3InLCBkZWZhdWx0Q29sb3IpO1xuXG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZUluLCAnbWFya2VyJykpIHtcbiAgICAgICAgY29sb3JzY2FsZURlZmF1bHRzKFxuICAgICAgICAgICAgdHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnbWFya2VyLicsIGNMZXR0ZXI6ICdjJ31cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ21hcmtlci5saW5lLmNvbG9yJywgQ29sb3IuZGVmYXVsdExpbmUpO1xuXG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZUluLCAnbWFya2VyLmxpbmUnKSkge1xuICAgICAgICBjb2xvcnNjYWxlRGVmYXVsdHMoXG4gICAgICAgICAgICB0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdtYXJrZXIubGluZS4nLCBjTGV0dGVyOiAnYyd9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdtYXJrZXIubGluZS53aWR0aCcpO1xuICAgIGNvZXJjZSgnbWFya2VyLm9wYWNpdHknKTtcbiAgICBjb2VyY2UoJ3NlbGVjdGVkLm1hcmtlci5jb2xvcicpO1xuICAgIGNvZXJjZSgndW5zZWxlY3RlZC5tYXJrZXIuY29sb3InKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlWFlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpIHtcbiAgICB2YXIgeCA9IGNvZXJjZSgneCcpO1xuICAgIHZhciB5ID0gY29lcmNlKCd5Jyk7XG4gICAgdmFyIGxlbjtcblxuICAgIHZhciBoYW5kbGVDYWxlbmRhckRlZmF1bHRzID0gUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdjYWxlbmRhcnMnLCAnaGFuZGxlVHJhY2VEZWZhdWx0cycpO1xuICAgIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIFsneCcsICd5J10sIGxheW91dCk7XG5cbiAgICBpZih4KSB7XG4gICAgICAgIHZhciB4bGVuID0gTGliLm1pblJvd0xlbmd0aCh4KTtcbiAgICAgICAgaWYoeSkge1xuICAgICAgICAgICAgbGVuID0gTWF0aC5taW4oeGxlbiwgTGliLm1pblJvd0xlbmd0aCh5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZW4gPSB4bGVuO1xuICAgICAgICAgICAgY29lcmNlKCd5MCcpO1xuICAgICAgICAgICAgY29lcmNlKCdkeScpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIXkpIHJldHVybiAwO1xuXG4gICAgICAgIGxlbiA9IExpYi5taW5Sb3dMZW5ndGgoeSk7XG4gICAgICAgIGNvZXJjZSgneDAnKTtcbiAgICAgICAgY29lcmNlKCdkeCcpO1xuICAgIH1cblxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICByZXR1cm4gbGVuO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=