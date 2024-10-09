(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_contour_attributes_js-node_modules_plotly_js_src_tr-6c2b09"],{

/***/ "./node_modules/plotly.js/src/traces/contour/attributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/attributes.js ***!
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



var heatmapAttrs = __webpack_require__(/*! ../heatmap/attributes */ "./node_modules/plotly.js/src/traces/heatmap/attributes.js");
var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var dash = __webpack_require__(/*! ../../components/drawing/attributes */ "./node_modules/plotly.js/src/components/drawing/attributes.js").dash;
var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var filterOps = __webpack_require__(/*! ../../constants/filter_ops */ "./node_modules/plotly.js/src/constants/filter_ops.js");
var COMPARISON_OPS2 = filterOps.COMPARISON_OPS2;
var INTERVAL_OPS = filterOps.INTERVAL_OPS;

var FORMAT_LINK = __webpack_require__(/*! ../../constants/docs */ "./node_modules/plotly.js/src/constants/docs.js").FORMAT_LINK;

var scatterLineAttrs = scatterAttrs.line;

module.exports = extendFlat({
    z: heatmapAttrs.z,
    x: heatmapAttrs.x,
    x0: heatmapAttrs.x0,
    dx: heatmapAttrs.dx,
    y: heatmapAttrs.y,
    y0: heatmapAttrs.y0,
    dy: heatmapAttrs.dy,
    text: heatmapAttrs.text,
    hovertext: heatmapAttrs.hovertext,
    transpose: heatmapAttrs.transpose,
    xtype: heatmapAttrs.xtype,
    ytype: heatmapAttrs.ytype,
    zhoverformat: heatmapAttrs.zhoverformat,
    hovertemplate: heatmapAttrs.hovertemplate,
    hoverongaps: heatmapAttrs.hoverongaps,
    connectgaps: extendFlat({}, heatmapAttrs.connectgaps, {
        description: [
            'Determines whether or not gaps',
            '(i.e. {nan} or missing values)',
            'in the `z` data are filled in.',
            'It is defaulted to true if `z` is a',
            'one dimensional array',
            'otherwise it is defaulted to false.'
        ].join(' ')
    }),

    fillcolor: {
        valType: 'color',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the fill color if `contours.type` is *constraint*.',
            'Defaults to a half-transparent variant of the line color,',
            'marker color, or marker line color, whichever is available.'
        ].join(' ')
    },

    autocontour: {
        valType: 'boolean',
        dflt: true,
        role: 'style',
        editType: 'calc',
        impliedEdits: {
            'contours.start': undefined,
            'contours.end': undefined,
            'contours.size': undefined
        },
        description: [
            'Determines whether or not the contour level attributes are',
            'picked by an algorithm.',
            'If *true*, the number of contour levels can be set in `ncontours`.',
            'If *false*, set the contour level attributes in `contours`.'
        ].join(' ')
    },
    ncontours: {
        valType: 'integer',
        dflt: 15,
        min: 1,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the maximum number of contour levels. The actual number',
            'of contours will be chosen automatically to be less than or',
            'equal to the value of `ncontours`.',
            'Has an effect only if `autocontour` is *true* or if',
            '`contours.size` is missing.'
        ].join(' ')
    },

    contours: {
        type: {
            valType: 'enumerated',
            values: ['levels', 'constraint'],
            dflt: 'levels',
            role: 'info',
            editType: 'calc',
            description: [
                'If `levels`, the data is represented as a contour plot with multiple',
                'levels displayed. If `constraint`, the data is represented as constraints',
                'with the invalid region shaded as specified by the `operation` and',
                '`value` parameters.'
            ].join(' ')
        },
        start: {
            valType: 'number',
            dflt: null,
            role: 'style',
            editType: 'plot',
            impliedEdits: {'^autocontour': false},
            description: [
                'Sets the starting contour level value.',
                'Must be less than `contours.end`'
            ].join(' ')
        },
        end: {
            valType: 'number',
            dflt: null,
            role: 'style',
            editType: 'plot',
            impliedEdits: {'^autocontour': false},
            description: [
                'Sets the end contour level value.',
                'Must be more than `contours.start`'
            ].join(' ')
        },
        size: {
            valType: 'number',
            dflt: null,
            min: 0,
            role: 'style',
            editType: 'plot',
            impliedEdits: {'^autocontour': false},
            description: [
                'Sets the step between each contour level.',
                'Must be positive.'
            ].join(' ')
        },
        coloring: {
            valType: 'enumerated',
            values: ['fill', 'heatmap', 'lines', 'none'],
            dflt: 'fill',
            role: 'style',
            editType: 'calc',
            description: [
                'Determines the coloring method showing the contour values.',
                'If *fill*, coloring is done evenly between each contour level',
                'If *heatmap*, a heatmap gradient coloring is applied',
                'between each contour level.',
                'If *lines*, coloring is done on the contour lines.',
                'If *none*, no coloring is applied on this trace.'
            ].join(' ')
        },
        showlines: {
            valType: 'boolean',
            dflt: true,
            role: 'style',
            editType: 'plot',
            description: [
                'Determines whether or not the contour lines are drawn.',
                'Has an effect only if `contours.coloring` is set to *fill*.'
            ].join(' ')
        },
        showlabels: {
            valType: 'boolean',
            dflt: false,
            role: 'style',
            editType: 'plot',
            description: [
                'Determines whether to label the contour lines with their values.'
            ].join(' ')
        },
        labelfont: fontAttrs({
            editType: 'plot',
            colorEditType: 'style',
            description: [
                'Sets the font used for labeling the contour levels.',
                'The default color comes from the lines, if shown.',
                'The default family and size come from `layout.font`.'
            ].join(' '),
        }),
        labelformat: {
            valType: 'string',
            dflt: '',
            role: 'style',
            editType: 'plot',
            description: [
                'Sets the contour label formatting rule using d3 formatting',
                'mini-language which is very similar to Python, see:',
                FORMAT_LINK
            ].join(' ')
        },
        operation: {
            valType: 'enumerated',
            values: [].concat(COMPARISON_OPS2).concat(INTERVAL_OPS),
            role: 'info',
            dflt: '=',
            editType: 'calc',
            description: [
                'Sets the constraint operation.',

                '*=* keeps regions equal to `value`',

                '*<* and *<=* keep regions less than `value`',

                '*>* and *>=* keep regions greater than `value`',

                '*[]*, *()*, *[)*, and *(]* keep regions inside `value[0]` to `value[1]`',

                '*][*, *)(*, *](*, *)[* keep regions outside `value[0]` to value[1]`',

                'Open vs. closed intervals make no difference to constraint display, but',
                'all versions are allowed for consistency with filter transforms.'
            ].join(' ')
        },
        value: {
            valType: 'any',
            dflt: 0,
            role: 'info',
            editType: 'calc',
            description: [
                'Sets the value or values of the constraint boundary.',

                'When `operation` is set to one of the comparison values',
                '(' + COMPARISON_OPS2 + ')',
                '*value* is expected to be a number.',

                'When `operation` is set to one of the interval values',
                '(' + INTERVAL_OPS + ')',
                '*value* is expected to be an array of two numbers where the first',
                'is the lower bound and the second is the upper bound.',
            ].join(' ')
        },
        editType: 'calc',
        impliedEdits: {'autocontour': false}
    },

    line: {
        color: extendFlat({}, scatterLineAttrs.color, {
            editType: 'style+colorbars',
            description: [
                'Sets the color of the contour level.',
                'Has no effect if `contours.coloring` is set to *lines*.'
            ].join(' ')
        }),
        width: {
            valType: 'number',
            min: 0,
            role: 'style',
            editType: 'style+colorbars',
            description: [
                'Sets the contour line width in (in px)',
                'Defaults to *0.5* when `contours.type` is *levels*.',
                'Defaults to *2* when `contour.type` is *constraint*.'
            ].join(' ')
        },
        dash: dash,
        smoothing: extendFlat({}, scatterLineAttrs.smoothing, {
            description: [
                'Sets the amount of smoothing for the contour lines,',
                'where *0* corresponds to no smoothing.'
            ].join(' ')
        }),
        editType: 'plot'
    }
},
    colorScaleAttrs('', {
        cLetter: 'z',
        autoColorDflt: false,
        editTypeOverride: 'calc'
    })
);


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/colorbar.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/colorbar.js ***!
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



var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var makeColorMap = __webpack_require__(/*! ./make_color_map */ "./node_modules/plotly.js/src/traces/contour/make_color_map.js");
var endPlus = __webpack_require__(/*! ./end_plus */ "./node_modules/plotly.js/src/traces/contour/end_plus.js");

function calc(gd, trace, opts) {
    var contours = trace.contours;
    var line = trace.line;
    var cs = contours.size || 1;
    var coloring = contours.coloring;
    var colorMap = makeColorMap(trace, {isColorbar: true});

    if(coloring === 'heatmap') {
        var cOpts = Colorscale.extractOpts(trace);
        opts._fillgradient = cOpts.reversescale ?
            Colorscale.flipScale(cOpts.colorscale) :
            cOpts.colorscale;
        opts._zrange = [cOpts.min, cOpts.max];
    } else if(coloring === 'fill') {
        opts._fillcolor = colorMap;
    }

    opts._line = {
        color: coloring === 'lines' ? colorMap : line.color,
        width: contours.showlines !== false ? line.width : 0,
        dash: line.dash
    };

    opts._levels = {
        start: contours.start,
        end: endPlus(contours),
        size: cs
    };
}

module.exports = {
    min: 'zmin',
    max: 'zmax',
    calc: calc
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/contours_defaults.js":
/*!************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/contours_defaults.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function handleContourDefaults(traceIn, traceOut, coerce, coerce2) {
    var contourStart = coerce2('contours.start');
    var contourEnd = coerce2('contours.end');
    var missingEnd = (contourStart === false) || (contourEnd === false);

    // normally we only need size if autocontour is off. But contour.calc
    // pushes its calculated contour size back to the input trace, so for
    // things like restyle that can call supplyDefaults without calc
    // after the initial draw, we can just reuse the previous calculation
    var contourSize = coerce('contours.size');
    var autoContour;

    if(missingEnd) autoContour = traceOut.autocontour = true;
    else autoContour = coerce('autocontour', false);

    if(autoContour || !contourSize) coerce('ncontours');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/end_plus.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/end_plus.js ***!
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




/*
 * tiny helper to move the end of the contours a little to prevent
 * losing the last contour to rounding errors
 */
module.exports = function endPlus(contours) {
    return contours.end + contours.size / 1e6;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/label_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/label_defaults.js ***!
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

module.exports = function handleLabelDefaults(coerce, layout, lineColor, opts) {
    if(!opts) opts = {};
    var showLabels = coerce('contours.showlabels');
    if(showLabels) {
        var globalFont = layout.font;
        Lib.coerceFont(coerce, 'contours.labelfont', {
            family: globalFont.family,
            size: globalFont.size,
            color: lineColor
        });
        coerce('contours.labelformat');
    }

    if(opts.hasHover !== false) coerce('zhoverformat');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/make_color_map.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/make_color_map.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var endPlus = __webpack_require__(/*! ./end_plus */ "./node_modules/plotly.js/src/traces/contour/end_plus.js");

module.exports = function makeColorMap(trace) {
    var contours = trace.contours;
    var start = contours.start;
    var end = endPlus(contours);
    var cs = contours.size || 1;
    var nc = Math.floor((end - start) / cs) + 1;
    var extra = contours.coloring === 'lines' ? 0 : 1;
    var cOpts = Colorscale.extractOpts(trace);

    if(!isFinite(cs)) {
        cs = 1;
        nc = 1;
    }

    var scl = cOpts.reversescale ?
        Colorscale.flipScale(cOpts.colorscale) :
        cOpts.colorscale;

    var len = scl.length;
    var domain = new Array(len);
    var range = new Array(len);

    var si, i;

    if(contours.coloring === 'heatmap') {
        var zmin0 = cOpts.min;
        var zmax0 = cOpts.max;

        for(i = 0; i < len; i++) {
            si = scl[i];
            domain[i] = si[0] * (zmax0 - zmin0) + zmin0;
            range[i] = si[1];
        }

        // do the contours extend beyond the colorscale?
        // if so, extend the colorscale with constants
        var zRange = d3.extent([
            zmin0,
            zmax0,
            contours.start,
            contours.start + cs * (nc - 1)
        ]);
        var zmin = zRange[zmin0 < zmax0 ? 0 : 1];
        var zmax = zRange[zmin0 < zmax0 ? 1 : 0];

        if(zmin !== zmin0) {
            domain.splice(0, 0, zmin);
            range.splice(0, 0, range[0]);
        }

        if(zmax !== zmax0) {
            domain.push(zmax);
            range.push(range[range.length - 1]);
        }
    } else {
        for(i = 0; i < len; i++) {
            si = scl[i];
            domain[i] = (si[0] * (nc + extra - 1) - (extra / 2)) * cs + start;
            range[i] = si[1];
        }
    }

    return Colorscale.makeColorScaleFunc(
        {domain: domain, range: range},
        {noNumericCheck: true}
    );
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/set_contours.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/set_contours.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

module.exports = function setContours(trace, vals) {
    var contours = trace.contours;

    // check if we need to auto-choose contour levels
    if(trace.autocontour) {
        // N.B. do not try to use coloraxis cmin/cmax,
        // these values here are meant to remain "per-trace" for now
        var zmin = trace.zmin;
        var zmax = trace.zmax;
        if(trace.zauto || zmin === undefined) {
            zmin = Lib.aggNums(Math.min, null, vals);
        }
        if(trace.zauto || zmax === undefined) {
            zmax = Lib.aggNums(Math.max, null, vals);
        }

        var dummyAx = autoContours(zmin, zmax, trace.ncontours);
        contours.size = dummyAx.dtick;
        contours.start = Axes.tickFirst(dummyAx);
        dummyAx.range.reverse();
        contours.end = Axes.tickFirst(dummyAx);

        if(contours.start === zmin) contours.start += contours.size;
        if(contours.end === zmax) contours.end -= contours.size;

        // if you set a small ncontours, *and* the ends are exactly on zmin/zmax
        // there's an edge case where start > end now. Make sure there's at least
        // one meaningful contour, put it midway between the crossed values
        if(contours.start > contours.end) {
            contours.start = contours.end = (contours.start + contours.end) / 2;
        }

        // copy auto-contour info back to the source data.
        // previously we copied the whole contours object back, but that had
        // other info (coloring, showlines) that should be left to supplyDefaults
        if(!trace._input.contours) trace._input.contours = {};
        Lib.extendFlat(trace._input.contours, {
            start: contours.start,
            end: contours.end,
            size: contours.size
        });
        trace._input.autocontour = true;
    } else if(contours.type !== 'constraint') {
        // sanity checks on manually-supplied start/end/size
        var start = contours.start;
        var end = contours.end;
        var inputContours = trace._input.contours;

        if(start > end) {
            contours.start = inputContours.start = end;
            end = contours.end = inputContours.end = start;
            start = contours.start;
        }

        if(!(contours.size > 0)) {
            var sizeOut;
            if(start === end) sizeOut = 1;
            else sizeOut = autoContours(start, end, trace.ncontours).dtick;

            inputContours.size = contours.size = sizeOut;
        }
    }
};


/*
 * autoContours: make a dummy axis object with dtick we can use
 * as contours.size, and if needed we can use Axes.tickFirst
 * with this axis object to calculate the start and end too
 *
 * start: the value to start the contours at
 * end: the value to end at (must be > start)
 * ncontours: max number of contours to make, like roughDTick
 *
 * returns: an axis object
 */
function autoContours(start, end, ncontours) {
    var dummyAx = {
        type: 'linear',
        range: [start, end]
    };

    Axes.autoTicks(
        dummyAx,
        (end - start) / (ncontours || 15)
    );

    return dummyAx;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/style_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/style_defaults.js ***!
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




var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var handleLabelDefaults = __webpack_require__(/*! ./label_defaults */ "./node_modules/plotly.js/src/traces/contour/label_defaults.js");


module.exports = function handleStyleDefaults(traceIn, traceOut, coerce, layout, opts) {
    var coloring = coerce('contours.coloring');

    var showLines;
    var lineColor = '';
    if(coloring === 'fill') showLines = coerce('contours.showlines');

    if(showLines !== false) {
        if(coloring !== 'lines') lineColor = coerce('line.color', '#000');
        coerce('line.width', 0.5);
        coerce('line.dash');
    }

    if(coloring !== 'none') {
        // plots/plots always coerces showlegend to true, but in this case
        // we default to false and (by default) show a colorbar instead
        if(traceIn.showlegend !== true) traceOut.showlegend = false;
        traceOut._dfltShowLegend = false;

        colorscaleDefaults(
            traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'z'}
        );
    }

    coerce('line.smoothing');

    handleLabelDefaults(coerce, layout, lineColor, opts);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvY29sb3JiYXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL2NvbnRvdXJzX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY29udG91ci9lbmRfcGx1cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXIvbGFiZWxfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL21ha2VfY29sb3JfbWFwLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY29udG91ci9zZXRfY29udG91cnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL3N0eWxlX2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLHdGQUF1QjtBQUNsRCxtQkFBbUIsbUJBQU8sQ0FBQyx3RkFBdUI7QUFDbEQsc0JBQXNCLG1CQUFPLENBQUMsZ0hBQXdDO0FBQ3RFLFdBQVcsb0lBQW1EO0FBQzlELGdCQUFnQixtQkFBTyxDQUFDLDBG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Ozs7Ozs7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyx3RkFBNEI7QUFDL0MsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYix5QkFBeUIsbUJBQU8sQ0FBQyw0R0FBc0M7QUFDdkUsMEJBQTBCLG1CQUFPLENBQUMsdUZBQWtCOzs7QUFHcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydDcyMGQyODA0ZTBlMmEzZmUzMzNmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGVhdG1hcEF0dHJzID0gcmVxdWlyZSgnLi4vaGVhdG1hcC9hdHRyaWJ1dGVzJyk7XG52YXIgc2NhdHRlckF0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBkYXNoID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nL2F0dHJpYnV0ZXMnKS5kYXNoO1xudmFyIGZvbnRBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2ZvbnRfYXR0cmlidXRlcycpO1xudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxudmFyIGZpbHRlck9wcyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9maWx0ZXJfb3BzJyk7XG52YXIgQ09NUEFSSVNPTl9PUFMyID0gZmlsdGVyT3BzLkNPTVBBUklTT05fT1BTMjtcbnZhciBJTlRFUlZBTF9PUFMgPSBmaWx0ZXJPcHMuSU5URVJWQUxfT1BTO1xuXG52YXIgRk9STUFUX0xJTksgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZG9jcycpLkZPUk1BVF9MSU5LO1xuXG52YXIgc2NhdHRlckxpbmVBdHRycyA9IHNjYXR0ZXJBdHRycy5saW5lO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZEZsYXQoe1xuICAgIHo6IGhlYXRtYXBBdHRycy56LFxuICAgIHg6IGhlYXRtYXBBdHRycy54LFxuICAgIHgwOiBoZWF0bWFwQXR0cnMueDAsXG4gICAgZHg6IGhlYXRtYXBBdHRycy5keCxcbiAgICB5OiBoZWF0bWFwQXR0cnMueSxcbiAgICB5MDogaGVhdG1hcEF0dHJzLnkwLFxuICAgIGR5OiBoZWF0bWFwQXR0cnMuZHksXG4gICAgdGV4dDogaGVhdG1hcEF0dHJzLnRleHQsXG4gICAgaG92ZXJ0ZXh0OiBoZWF0bWFwQXR0cnMuaG92ZXJ0ZXh0LFxuICAgIHRyYW5zcG9zZTogaGVhdG1hcEF0dHJzLnRyYW5zcG9zZSxcbiAgICB4dHlwZTogaGVhdG1hcEF0dHJzLnh0eXBlLFxuICAgIHl0eXBlOiBoZWF0bWFwQXR0cnMueXR5cGUsXG4gICAgemhvdmVyZm9ybWF0OiBoZWF0bWFwQXR0cnMuemhvdmVyZm9ybWF0LFxuICAgIGhvdmVydGVtcGxhdGU6IGhlYXRtYXBBdHRycy5ob3ZlcnRlbXBsYXRlLFxuICAgIGhvdmVyb25nYXBzOiBoZWF0bWFwQXR0cnMuaG92ZXJvbmdhcHMsXG4gICAgY29ubmVjdGdhcHM6IGV4dGVuZEZsYXQoe30sIGhlYXRtYXBBdHRycy5jb25uZWN0Z2Fwcywge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgZ2FwcycsXG4gICAgICAgICAgICAnKGkuZS4ge25hbn0gb3IgbWlzc2luZyB2YWx1ZXMpJyxcbiAgICAgICAgICAgICdpbiB0aGUgYHpgIGRhdGEgYXJlIGZpbGxlZCBpbi4nLFxuICAgICAgICAgICAgJ0l0IGlzIGRlZmF1bHRlZCB0byB0cnVlIGlmIGB6YCBpcyBhJyxcbiAgICAgICAgICAgICdvbmUgZGltZW5zaW9uYWwgYXJyYXknLFxuICAgICAgICAgICAgJ290aGVyd2lzZSBpdCBpcyBkZWZhdWx0ZWQgdG8gZmFsc2UuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuXG4gICAgZmlsbGNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgZmlsbCBjb2xvciBpZiBgY29udG91cnMudHlwZWAgaXMgKmNvbnN0cmFpbnQqLicsXG4gICAgICAgICAgICAnRGVmYXVsdHMgdG8gYSBoYWxmLXRyYW5zcGFyZW50IHZhcmlhbnQgb2YgdGhlIGxpbmUgY29sb3IsJyxcbiAgICAgICAgICAgICdtYXJrZXIgY29sb3IsIG9yIG1hcmtlciBsaW5lIGNvbG9yLCB3aGljaGV2ZXIgaXMgYXZhaWxhYmxlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgYXV0b2NvbnRvdXI6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZmx0OiB0cnVlLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBpbXBsaWVkRWRpdHM6IHtcbiAgICAgICAgICAgICdjb250b3Vycy5zdGFydCc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICdjb250b3Vycy5lbmQnOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAnY29udG91cnMuc2l6ZSc6IHVuZGVmaW5lZFxuICAgICAgICB9LFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGNvbnRvdXIgbGV2ZWwgYXR0cmlidXRlcyBhcmUnLFxuICAgICAgICAgICAgJ3BpY2tlZCBieSBhbiBhbGdvcml0aG0uJyxcbiAgICAgICAgICAgICdJZiAqdHJ1ZSosIHRoZSBudW1iZXIgb2YgY29udG91ciBsZXZlbHMgY2FuIGJlIHNldCBpbiBgbmNvbnRvdXJzYC4nLFxuICAgICAgICAgICAgJ0lmICpmYWxzZSosIHNldCB0aGUgY29udG91ciBsZXZlbCBhdHRyaWJ1dGVzIGluIGBjb250b3Vyc2AuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgbmNvbnRvdXJzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgZGZsdDogMTUsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBjb250b3VyIGxldmVscy4gVGhlIGFjdHVhbCBudW1iZXInLFxuICAgICAgICAgICAgJ29mIGNvbnRvdXJzIHdpbGwgYmUgY2hvc2VuIGF1dG9tYXRpY2FsbHkgdG8gYmUgbGVzcyB0aGFuIG9yJyxcbiAgICAgICAgICAgICdlcXVhbCB0byB0aGUgdmFsdWUgb2YgYG5jb250b3Vyc2AuJyxcbiAgICAgICAgICAgICdIYXMgYW4gZWZmZWN0IG9ubHkgaWYgYGF1dG9jb250b3VyYCBpcyAqdHJ1ZSogb3IgaWYnLFxuICAgICAgICAgICAgJ2Bjb250b3Vycy5zaXplYCBpcyBtaXNzaW5nLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgY29udG91cnM6IHtcbiAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ2xldmVscycsICdjb25zdHJhaW50J10sXG4gICAgICAgICAgICBkZmx0OiAnbGV2ZWxzJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiBgbGV2ZWxzYCwgdGhlIGRhdGEgaXMgcmVwcmVzZW50ZWQgYXMgYSBjb250b3VyIHBsb3Qgd2l0aCBtdWx0aXBsZScsXG4gICAgICAgICAgICAgICAgJ2xldmVscyBkaXNwbGF5ZWQuIElmIGBjb25zdHJhaW50YCwgdGhlIGRhdGEgaXMgcmVwcmVzZW50ZWQgYXMgY29uc3RyYWludHMnLFxuICAgICAgICAgICAgICAgICd3aXRoIHRoZSBpbnZhbGlkIHJlZ2lvbiBzaGFkZWQgYXMgc3BlY2lmaWVkIGJ5IHRoZSBgb3BlcmF0aW9uYCBhbmQnLFxuICAgICAgICAgICAgICAgICdgdmFsdWVgIHBhcmFtZXRlcnMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgaW1wbGllZEVkaXRzOiB7J15hdXRvY29udG91cic6IGZhbHNlfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHN0YXJ0aW5nIGNvbnRvdXIgbGV2ZWwgdmFsdWUuJyxcbiAgICAgICAgICAgICAgICAnTXVzdCBiZSBsZXNzIHRoYW4gYGNvbnRvdXJzLmVuZGAnXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgaW1wbGllZEVkaXRzOiB7J15hdXRvY29udG91cic6IGZhbHNlfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGVuZCBjb250b3VyIGxldmVsIHZhbHVlLicsXG4gICAgICAgICAgICAgICAgJ011c3QgYmUgbW9yZSB0aGFuIGBjb250b3Vycy5zdGFydGAnXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGltcGxpZWRFZGl0czogeydeYXV0b2NvbnRvdXInOiBmYWxzZX0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBzdGVwIGJldHdlZW4gZWFjaCBjb250b3VyIGxldmVsLicsXG4gICAgICAgICAgICAgICAgJ011c3QgYmUgcG9zaXRpdmUuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgY29sb3Jpbmc6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogWydmaWxsJywgJ2hlYXRtYXAnLCAnbGluZXMnLCAnbm9uZSddLFxuICAgICAgICAgICAgZGZsdDogJ2ZpbGwnLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIHRoZSBjb2xvcmluZyBtZXRob2Qgc2hvd2luZyB0aGUgY29udG91ciB2YWx1ZXMuJyxcbiAgICAgICAgICAgICAgICAnSWYgKmZpbGwqLCBjb2xvcmluZyBpcyBkb25lIGV2ZW5seSBiZXR3ZWVuIGVhY2ggY29udG91ciBsZXZlbCcsXG4gICAgICAgICAgICAgICAgJ0lmICpoZWF0bWFwKiwgYSBoZWF0bWFwIGdyYWRpZW50IGNvbG9yaW5nIGlzIGFwcGxpZWQnLFxuICAgICAgICAgICAgICAgICdiZXR3ZWVuIGVhY2ggY29udG91ciBsZXZlbC4nLFxuICAgICAgICAgICAgICAgICdJZiAqbGluZXMqLCBjb2xvcmluZyBpcyBkb25lIG9uIHRoZSBjb250b3VyIGxpbmVzLicsXG4gICAgICAgICAgICAgICAgJ0lmICpub25lKiwgbm8gY29sb3JpbmcgaXMgYXBwbGllZCBvbiB0aGlzIHRyYWNlLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHNob3dsaW5lczoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgY29udG91ciBsaW5lcyBhcmUgZHJhd24uJyxcbiAgICAgICAgICAgICAgICAnSGFzIGFuIGVmZmVjdCBvbmx5IGlmIGBjb250b3Vycy5jb2xvcmluZ2AgaXMgc2V0IHRvICpmaWxsKi4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBzaG93bGFiZWxzOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIGxhYmVsIHRoZSBjb250b3VyIGxpbmVzIHdpdGggdGhlaXIgdmFsdWVzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsZm9udDogZm9udEF0dHJzKHtcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBjb2xvckVkaXRUeXBlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgZm9udCB1c2VkIGZvciBsYWJlbGluZyB0aGUgY29udG91ciBsZXZlbHMuJyxcbiAgICAgICAgICAgICAgICAnVGhlIGRlZmF1bHQgY29sb3IgY29tZXMgZnJvbSB0aGUgbGluZXMsIGlmIHNob3duLicsXG4gICAgICAgICAgICAgICAgJ1RoZSBkZWZhdWx0IGZhbWlseSBhbmQgc2l6ZSBjb21lIGZyb20gYGxheW91dC5mb250YC4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKSxcbiAgICAgICAgfSksXG4gICAgICAgIGxhYmVsZm9ybWF0OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjb250b3VyIGxhYmVsIGZvcm1hdHRpbmcgcnVsZSB1c2luZyBkMyBmb3JtYXR0aW5nJyxcbiAgICAgICAgICAgICAgICAnbWluaS1sYW5ndWFnZSB3aGljaCBpcyB2ZXJ5IHNpbWlsYXIgdG8gUHl0aG9uLCBzZWU6JyxcbiAgICAgICAgICAgICAgICBGT1JNQVRfTElOS1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgb3BlcmF0aW9uOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICB2YWx1ZXM6IFtdLmNvbmNhdChDT01QQVJJU09OX09QUzIpLmNvbmNhdChJTlRFUlZBTF9PUFMpLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogJz0nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGNvbnN0cmFpbnQgb3BlcmF0aW9uLicsXG5cbiAgICAgICAgICAgICAgICAnKj0qIGtlZXBzIHJlZ2lvbnMgZXF1YWwgdG8gYHZhbHVlYCcsXG5cbiAgICAgICAgICAgICAgICAnKjwqIGFuZCAqPD0qIGtlZXAgcmVnaW9ucyBsZXNzIHRoYW4gYHZhbHVlYCcsXG5cbiAgICAgICAgICAgICAgICAnKj4qIGFuZCAqPj0qIGtlZXAgcmVnaW9ucyBncmVhdGVyIHRoYW4gYHZhbHVlYCcsXG5cbiAgICAgICAgICAgICAgICAnKltdKiwgKigpKiwgKlspKiwgYW5kICooXSoga2VlcCByZWdpb25zIGluc2lkZSBgdmFsdWVbMF1gIHRvIGB2YWx1ZVsxXWAnLFxuXG4gICAgICAgICAgICAgICAgJypdWyosICopKCosICpdKCosICopWyoga2VlcCByZWdpb25zIG91dHNpZGUgYHZhbHVlWzBdYCB0byB2YWx1ZVsxXWAnLFxuXG4gICAgICAgICAgICAgICAgJ09wZW4gdnMuIGNsb3NlZCBpbnRlcnZhbHMgbWFrZSBubyBkaWZmZXJlbmNlIHRvIGNvbnN0cmFpbnQgZGlzcGxheSwgYnV0JyxcbiAgICAgICAgICAgICAgICAnYWxsIHZlcnNpb25zIGFyZSBhbGxvd2VkIGZvciBjb25zaXN0ZW5jeSB3aXRoIGZpbHRlciB0cmFuc2Zvcm1zLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgdmFsdWUgb3IgdmFsdWVzIG9mIHRoZSBjb25zdHJhaW50IGJvdW5kYXJ5LicsXG5cbiAgICAgICAgICAgICAgICAnV2hlbiBgb3BlcmF0aW9uYCBpcyBzZXQgdG8gb25lIG9mIHRoZSBjb21wYXJpc29uIHZhbHVlcycsXG4gICAgICAgICAgICAgICAgJygnICsgQ09NUEFSSVNPTl9PUFMyICsgJyknLFxuICAgICAgICAgICAgICAgICcqdmFsdWUqIGlzIGV4cGVjdGVkIHRvIGJlIGEgbnVtYmVyLicsXG5cbiAgICAgICAgICAgICAgICAnV2hlbiBgb3BlcmF0aW9uYCBpcyBzZXQgdG8gb25lIG9mIHRoZSBpbnRlcnZhbCB2YWx1ZXMnLFxuICAgICAgICAgICAgICAgICcoJyArIElOVEVSVkFMX09QUyArICcpJyxcbiAgICAgICAgICAgICAgICAnKnZhbHVlKiBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheSBvZiB0d28gbnVtYmVycyB3aGVyZSB0aGUgZmlyc3QnLFxuICAgICAgICAgICAgICAgICdpcyB0aGUgbG93ZXIgYm91bmQgYW5kIHRoZSBzZWNvbmQgaXMgdGhlIHVwcGVyIGJvdW5kLicsXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBpbXBsaWVkRWRpdHM6IHsnYXV0b2NvbnRvdXInOiBmYWxzZX1cbiAgICB9LFxuXG4gICAgbGluZToge1xuICAgICAgICBjb2xvcjogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckxpbmVBdHRycy5jb2xvciwge1xuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZStjb2xvcmJhcnMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgY29sb3Igb2YgdGhlIGNvbnRvdXIgbGV2ZWwuJyxcbiAgICAgICAgICAgICAgICAnSGFzIG5vIGVmZmVjdCBpZiBgY29udG91cnMuY29sb3JpbmdgIGlzIHNldCB0byAqbGluZXMqLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZStjb2xvcmJhcnMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgY29udG91ciBsaW5lIHdpZHRoIGluIChpbiBweCknLFxuICAgICAgICAgICAgICAgICdEZWZhdWx0cyB0byAqMC41KiB3aGVuIGBjb250b3Vycy50eXBlYCBpcyAqbGV2ZWxzKi4nLFxuICAgICAgICAgICAgICAgICdEZWZhdWx0cyB0byAqMiogd2hlbiBgY29udG91ci50eXBlYCBpcyAqY29uc3RyYWludCouJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgZGFzaDogZGFzaCxcbiAgICAgICAgc21vb3RoaW5nOiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyTGluZUF0dHJzLnNtb290aGluZywge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgYW1vdW50IG9mIHNtb290aGluZyBmb3IgdGhlIGNvbnRvdXIgbGluZXMsJyxcbiAgICAgICAgICAgICAgICAnd2hlcmUgKjAqIGNvcnJlc3BvbmRzIHRvIG5vIHNtb290aGluZy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgIH1cbn0sXG4gICAgY29sb3JTY2FsZUF0dHJzKCcnLCB7XG4gICAgICAgIGNMZXR0ZXI6ICd6JyxcbiAgICAgICAgYXV0b0NvbG9yRGZsdDogZmFsc2UsXG4gICAgICAgIGVkaXRUeXBlT3ZlcnJpZGU6ICdjYWxjJ1xuICAgIH0pXG4pO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpO1xudmFyIG1ha2VDb2xvck1hcCA9IHJlcXVpcmUoJy4vbWFrZV9jb2xvcl9tYXAnKTtcbnZhciBlbmRQbHVzID0gcmVxdWlyZSgnLi9lbmRfcGx1cycpO1xuXG5mdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSwgb3B0cykge1xuICAgIHZhciBjb250b3VycyA9IHRyYWNlLmNvbnRvdXJzO1xuICAgIHZhciBsaW5lID0gdHJhY2UubGluZTtcbiAgICB2YXIgY3MgPSBjb250b3Vycy5zaXplIHx8IDE7XG4gICAgdmFyIGNvbG9yaW5nID0gY29udG91cnMuY29sb3Jpbmc7XG4gICAgdmFyIGNvbG9yTWFwID0gbWFrZUNvbG9yTWFwKHRyYWNlLCB7aXNDb2xvcmJhcjogdHJ1ZX0pO1xuXG4gICAgaWYoY29sb3JpbmcgPT09ICdoZWF0bWFwJykge1xuICAgICAgICB2YXIgY09wdHMgPSBDb2xvcnNjYWxlLmV4dHJhY3RPcHRzKHRyYWNlKTtcbiAgICAgICAgb3B0cy5fZmlsbGdyYWRpZW50ID0gY09wdHMucmV2ZXJzZXNjYWxlID9cbiAgICAgICAgICAgIENvbG9yc2NhbGUuZmxpcFNjYWxlKGNPcHRzLmNvbG9yc2NhbGUpIDpcbiAgICAgICAgICAgIGNPcHRzLmNvbG9yc2NhbGU7XG4gICAgICAgIG9wdHMuX3pyYW5nZSA9IFtjT3B0cy5taW4sIGNPcHRzLm1heF07XG4gICAgfSBlbHNlIGlmKGNvbG9yaW5nID09PSAnZmlsbCcpIHtcbiAgICAgICAgb3B0cy5fZmlsbGNvbG9yID0gY29sb3JNYXA7XG4gICAgfVxuXG4gICAgb3B0cy5fbGluZSA9IHtcbiAgICAgICAgY29sb3I6IGNvbG9yaW5nID09PSAnbGluZXMnID8gY29sb3JNYXAgOiBsaW5lLmNvbG9yLFxuICAgICAgICB3aWR0aDogY29udG91cnMuc2hvd2xpbmVzICE9PSBmYWxzZSA/IGxpbmUud2lkdGggOiAwLFxuICAgICAgICBkYXNoOiBsaW5lLmRhc2hcbiAgICB9O1xuXG4gICAgb3B0cy5fbGV2ZWxzID0ge1xuICAgICAgICBzdGFydDogY29udG91cnMuc3RhcnQsXG4gICAgICAgIGVuZDogZW5kUGx1cyhjb250b3VycyksXG4gICAgICAgIHNpemU6IGNzXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWluOiAnem1pbicsXG4gICAgbWF4OiAnem1heCcsXG4gICAgY2FsYzogY2FsY1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVDb250b3VyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgY29lcmNlMikge1xuICAgIHZhciBjb250b3VyU3RhcnQgPSBjb2VyY2UyKCdjb250b3Vycy5zdGFydCcpO1xuICAgIHZhciBjb250b3VyRW5kID0gY29lcmNlMignY29udG91cnMuZW5kJyk7XG4gICAgdmFyIG1pc3NpbmdFbmQgPSAoY29udG91clN0YXJ0ID09PSBmYWxzZSkgfHwgKGNvbnRvdXJFbmQgPT09IGZhbHNlKTtcblxuICAgIC8vIG5vcm1hbGx5IHdlIG9ubHkgbmVlZCBzaXplIGlmIGF1dG9jb250b3VyIGlzIG9mZi4gQnV0IGNvbnRvdXIuY2FsY1xuICAgIC8vIHB1c2hlcyBpdHMgY2FsY3VsYXRlZCBjb250b3VyIHNpemUgYmFjayB0byB0aGUgaW5wdXQgdHJhY2UsIHNvIGZvclxuICAgIC8vIHRoaW5ncyBsaWtlIHJlc3R5bGUgdGhhdCBjYW4gY2FsbCBzdXBwbHlEZWZhdWx0cyB3aXRob3V0IGNhbGNcbiAgICAvLyBhZnRlciB0aGUgaW5pdGlhbCBkcmF3LCB3ZSBjYW4ganVzdCByZXVzZSB0aGUgcHJldmlvdXMgY2FsY3VsYXRpb25cbiAgICB2YXIgY29udG91clNpemUgPSBjb2VyY2UoJ2NvbnRvdXJzLnNpemUnKTtcbiAgICB2YXIgYXV0b0NvbnRvdXI7XG5cbiAgICBpZihtaXNzaW5nRW5kKSBhdXRvQ29udG91ciA9IHRyYWNlT3V0LmF1dG9jb250b3VyID0gdHJ1ZTtcbiAgICBlbHNlIGF1dG9Db250b3VyID0gY29lcmNlKCdhdXRvY29udG91cicsIGZhbHNlKTtcblxuICAgIGlmKGF1dG9Db250b3VyIHx8ICFjb250b3VyU2l6ZSkgY29lcmNlKCduY29udG91cnMnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxuLypcbiAqIHRpbnkgaGVscGVyIHRvIG1vdmUgdGhlIGVuZCBvZiB0aGUgY29udG91cnMgYSBsaXR0bGUgdG8gcHJldmVudFxuICogbG9zaW5nIHRoZSBsYXN0IGNvbnRvdXIgdG8gcm91bmRpbmcgZXJyb3JzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5kUGx1cyhjb250b3Vycykge1xuICAgIHJldHVybiBjb250b3Vycy5lbmQgKyBjb250b3Vycy5zaXplIC8gMWU2O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlTGFiZWxEZWZhdWx0cyhjb2VyY2UsIGxheW91dCwgbGluZUNvbG9yLCBvcHRzKSB7XG4gICAgaWYoIW9wdHMpIG9wdHMgPSB7fTtcbiAgICB2YXIgc2hvd0xhYmVscyA9IGNvZXJjZSgnY29udG91cnMuc2hvd2xhYmVscycpO1xuICAgIGlmKHNob3dMYWJlbHMpIHtcbiAgICAgICAgdmFyIGdsb2JhbEZvbnQgPSBsYXlvdXQuZm9udDtcbiAgICAgICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAnY29udG91cnMubGFiZWxmb250Jywge1xuICAgICAgICAgICAgZmFtaWx5OiBnbG9iYWxGb250LmZhbWlseSxcbiAgICAgICAgICAgIHNpemU6IGdsb2JhbEZvbnQuc2l6ZSxcbiAgICAgICAgICAgIGNvbG9yOiBsaW5lQ29sb3JcbiAgICAgICAgfSk7XG4gICAgICAgIGNvZXJjZSgnY29udG91cnMubGFiZWxmb3JtYXQnKTtcbiAgICB9XG5cbiAgICBpZihvcHRzLmhhc0hvdmVyICE9PSBmYWxzZSkgY29lcmNlKCd6aG92ZXJmb3JtYXQnKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbnZhciBDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJyk7XG52YXIgZW5kUGx1cyA9IHJlcXVpcmUoJy4vZW5kX3BsdXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYWtlQ29sb3JNYXAodHJhY2UpIHtcbiAgICB2YXIgY29udG91cnMgPSB0cmFjZS5jb250b3VycztcbiAgICB2YXIgc3RhcnQgPSBjb250b3Vycy5zdGFydDtcbiAgICB2YXIgZW5kID0gZW5kUGx1cyhjb250b3Vycyk7XG4gICAgdmFyIGNzID0gY29udG91cnMuc2l6ZSB8fCAxO1xuICAgIHZhciBuYyA9IE1hdGguZmxvb3IoKGVuZCAtIHN0YXJ0KSAvIGNzKSArIDE7XG4gICAgdmFyIGV4dHJhID0gY29udG91cnMuY29sb3JpbmcgPT09ICdsaW5lcycgPyAwIDogMTtcbiAgICB2YXIgY09wdHMgPSBDb2xvcnNjYWxlLmV4dHJhY3RPcHRzKHRyYWNlKTtcblxuICAgIGlmKCFpc0Zpbml0ZShjcykpIHtcbiAgICAgICAgY3MgPSAxO1xuICAgICAgICBuYyA9IDE7XG4gICAgfVxuXG4gICAgdmFyIHNjbCA9IGNPcHRzLnJldmVyc2VzY2FsZSA/XG4gICAgICAgIENvbG9yc2NhbGUuZmxpcFNjYWxlKGNPcHRzLmNvbG9yc2NhbGUpIDpcbiAgICAgICAgY09wdHMuY29sb3JzY2FsZTtcblxuICAgIHZhciBsZW4gPSBzY2wubGVuZ3RoO1xuICAgIHZhciBkb21haW4gPSBuZXcgQXJyYXkobGVuKTtcbiAgICB2YXIgcmFuZ2UgPSBuZXcgQXJyYXkobGVuKTtcblxuICAgIHZhciBzaSwgaTtcblxuICAgIGlmKGNvbnRvdXJzLmNvbG9yaW5nID09PSAnaGVhdG1hcCcpIHtcbiAgICAgICAgdmFyIHptaW4wID0gY09wdHMubWluO1xuICAgICAgICB2YXIgem1heDAgPSBjT3B0cy5tYXg7XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHNpID0gc2NsW2ldO1xuICAgICAgICAgICAgZG9tYWluW2ldID0gc2lbMF0gKiAoem1heDAgLSB6bWluMCkgKyB6bWluMDtcbiAgICAgICAgICAgIHJhbmdlW2ldID0gc2lbMV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkbyB0aGUgY29udG91cnMgZXh0ZW5kIGJleW9uZCB0aGUgY29sb3JzY2FsZT9cbiAgICAgICAgLy8gaWYgc28sIGV4dGVuZCB0aGUgY29sb3JzY2FsZSB3aXRoIGNvbnN0YW50c1xuICAgICAgICB2YXIgelJhbmdlID0gZDMuZXh0ZW50KFtcbiAgICAgICAgICAgIHptaW4wLFxuICAgICAgICAgICAgem1heDAsXG4gICAgICAgICAgICBjb250b3Vycy5zdGFydCxcbiAgICAgICAgICAgIGNvbnRvdXJzLnN0YXJ0ICsgY3MgKiAobmMgLSAxKVxuICAgICAgICBdKTtcbiAgICAgICAgdmFyIHptaW4gPSB6UmFuZ2Vbem1pbjAgPCB6bWF4MCA/IDAgOiAxXTtcbiAgICAgICAgdmFyIHptYXggPSB6UmFuZ2Vbem1pbjAgPCB6bWF4MCA/IDEgOiAwXTtcblxuICAgICAgICBpZih6bWluICE9PSB6bWluMCkge1xuICAgICAgICAgICAgZG9tYWluLnNwbGljZSgwLCAwLCB6bWluKTtcbiAgICAgICAgICAgIHJhbmdlLnNwbGljZSgwLCAwLCByYW5nZVswXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih6bWF4ICE9PSB6bWF4MCkge1xuICAgICAgICAgICAgZG9tYWluLnB1c2goem1heCk7XG4gICAgICAgICAgICByYW5nZS5wdXNoKHJhbmdlW3JhbmdlLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBzaSA9IHNjbFtpXTtcbiAgICAgICAgICAgIGRvbWFpbltpXSA9IChzaVswXSAqIChuYyArIGV4dHJhIC0gMSkgLSAoZXh0cmEgLyAyKSkgKiBjcyArIHN0YXJ0O1xuICAgICAgICAgICAgcmFuZ2VbaV0gPSBzaVsxXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBDb2xvcnNjYWxlLm1ha2VDb2xvclNjYWxlRnVuYyhcbiAgICAgICAge2RvbWFpbjogZG9tYWluLCByYW5nZTogcmFuZ2V9LFxuICAgICAgICB7bm9OdW1lcmljQ2hlY2s6IHRydWV9XG4gICAgKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXRDb250b3Vycyh0cmFjZSwgdmFscykge1xuICAgIHZhciBjb250b3VycyA9IHRyYWNlLmNvbnRvdXJzO1xuXG4gICAgLy8gY2hlY2sgaWYgd2UgbmVlZCB0byBhdXRvLWNob29zZSBjb250b3VyIGxldmVsc1xuICAgIGlmKHRyYWNlLmF1dG9jb250b3VyKSB7XG4gICAgICAgIC8vIE4uQi4gZG8gbm90IHRyeSB0byB1c2UgY29sb3JheGlzIGNtaW4vY21heCxcbiAgICAgICAgLy8gdGhlc2UgdmFsdWVzIGhlcmUgYXJlIG1lYW50IHRvIHJlbWFpbiBcInBlci10cmFjZVwiIGZvciBub3dcbiAgICAgICAgdmFyIHptaW4gPSB0cmFjZS56bWluO1xuICAgICAgICB2YXIgem1heCA9IHRyYWNlLnptYXg7XG4gICAgICAgIGlmKHRyYWNlLnphdXRvIHx8IHptaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgem1pbiA9IExpYi5hZ2dOdW1zKE1hdGgubWluLCBudWxsLCB2YWxzKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0cmFjZS56YXV0byB8fCB6bWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHptYXggPSBMaWIuYWdnTnVtcyhNYXRoLm1heCwgbnVsbCwgdmFscyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHVtbXlBeCA9IGF1dG9Db250b3Vycyh6bWluLCB6bWF4LCB0cmFjZS5uY29udG91cnMpO1xuICAgICAgICBjb250b3Vycy5zaXplID0gZHVtbXlBeC5kdGljaztcbiAgICAgICAgY29udG91cnMuc3RhcnQgPSBBeGVzLnRpY2tGaXJzdChkdW1teUF4KTtcbiAgICAgICAgZHVtbXlBeC5yYW5nZS5yZXZlcnNlKCk7XG4gICAgICAgIGNvbnRvdXJzLmVuZCA9IEF4ZXMudGlja0ZpcnN0KGR1bW15QXgpO1xuXG4gICAgICAgIGlmKGNvbnRvdXJzLnN0YXJ0ID09PSB6bWluKSBjb250b3Vycy5zdGFydCArPSBjb250b3Vycy5zaXplO1xuICAgICAgICBpZihjb250b3Vycy5lbmQgPT09IHptYXgpIGNvbnRvdXJzLmVuZCAtPSBjb250b3Vycy5zaXplO1xuXG4gICAgICAgIC8vIGlmIHlvdSBzZXQgYSBzbWFsbCBuY29udG91cnMsICphbmQqIHRoZSBlbmRzIGFyZSBleGFjdGx5IG9uIHptaW4vem1heFxuICAgICAgICAvLyB0aGVyZSdzIGFuIGVkZ2UgY2FzZSB3aGVyZSBzdGFydCA+IGVuZCBub3cuIE1ha2Ugc3VyZSB0aGVyZSdzIGF0IGxlYXN0XG4gICAgICAgIC8vIG9uZSBtZWFuaW5nZnVsIGNvbnRvdXIsIHB1dCBpdCBtaWR3YXkgYmV0d2VlbiB0aGUgY3Jvc3NlZCB2YWx1ZXNcbiAgICAgICAgaWYoY29udG91cnMuc3RhcnQgPiBjb250b3Vycy5lbmQpIHtcbiAgICAgICAgICAgIGNvbnRvdXJzLnN0YXJ0ID0gY29udG91cnMuZW5kID0gKGNvbnRvdXJzLnN0YXJ0ICsgY29udG91cnMuZW5kKSAvIDI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb3B5IGF1dG8tY29udG91ciBpbmZvIGJhY2sgdG8gdGhlIHNvdXJjZSBkYXRhLlxuICAgICAgICAvLyBwcmV2aW91c2x5IHdlIGNvcGllZCB0aGUgd2hvbGUgY29udG91cnMgb2JqZWN0IGJhY2ssIGJ1dCB0aGF0IGhhZFxuICAgICAgICAvLyBvdGhlciBpbmZvIChjb2xvcmluZywgc2hvd2xpbmVzKSB0aGF0IHNob3VsZCBiZSBsZWZ0IHRvIHN1cHBseURlZmF1bHRzXG4gICAgICAgIGlmKCF0cmFjZS5faW5wdXQuY29udG91cnMpIHRyYWNlLl9pbnB1dC5jb250b3VycyA9IHt9O1xuICAgICAgICBMaWIuZXh0ZW5kRmxhdCh0cmFjZS5faW5wdXQuY29udG91cnMsIHtcbiAgICAgICAgICAgIHN0YXJ0OiBjb250b3Vycy5zdGFydCxcbiAgICAgICAgICAgIGVuZDogY29udG91cnMuZW5kLFxuICAgICAgICAgICAgc2l6ZTogY29udG91cnMuc2l6ZVxuICAgICAgICB9KTtcbiAgICAgICAgdHJhY2UuX2lucHV0LmF1dG9jb250b3VyID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYoY29udG91cnMudHlwZSAhPT0gJ2NvbnN0cmFpbnQnKSB7XG4gICAgICAgIC8vIHNhbml0eSBjaGVja3Mgb24gbWFudWFsbHktc3VwcGxpZWQgc3RhcnQvZW5kL3NpemVcbiAgICAgICAgdmFyIHN0YXJ0ID0gY29udG91cnMuc3RhcnQ7XG4gICAgICAgIHZhciBlbmQgPSBjb250b3Vycy5lbmQ7XG4gICAgICAgIHZhciBpbnB1dENvbnRvdXJzID0gdHJhY2UuX2lucHV0LmNvbnRvdXJzO1xuXG4gICAgICAgIGlmKHN0YXJ0ID4gZW5kKSB7XG4gICAgICAgICAgICBjb250b3Vycy5zdGFydCA9IGlucHV0Q29udG91cnMuc3RhcnQgPSBlbmQ7XG4gICAgICAgICAgICBlbmQgPSBjb250b3Vycy5lbmQgPSBpbnB1dENvbnRvdXJzLmVuZCA9IHN0YXJ0O1xuICAgICAgICAgICAgc3RhcnQgPSBjb250b3Vycy5zdGFydDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEoY29udG91cnMuc2l6ZSA+IDApKSB7XG4gICAgICAgICAgICB2YXIgc2l6ZU91dDtcbiAgICAgICAgICAgIGlmKHN0YXJ0ID09PSBlbmQpIHNpemVPdXQgPSAxO1xuICAgICAgICAgICAgZWxzZSBzaXplT3V0ID0gYXV0b0NvbnRvdXJzKHN0YXJ0LCBlbmQsIHRyYWNlLm5jb250b3VycykuZHRpY2s7XG5cbiAgICAgICAgICAgIGlucHV0Q29udG91cnMuc2l6ZSA9IGNvbnRvdXJzLnNpemUgPSBzaXplT3V0O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG4vKlxuICogYXV0b0NvbnRvdXJzOiBtYWtlIGEgZHVtbXkgYXhpcyBvYmplY3Qgd2l0aCBkdGljayB3ZSBjYW4gdXNlXG4gKiBhcyBjb250b3Vycy5zaXplLCBhbmQgaWYgbmVlZGVkIHdlIGNhbiB1c2UgQXhlcy50aWNrRmlyc3RcbiAqIHdpdGggdGhpcyBheGlzIG9iamVjdCB0byBjYWxjdWxhdGUgdGhlIHN0YXJ0IGFuZCBlbmQgdG9vXG4gKlxuICogc3RhcnQ6IHRoZSB2YWx1ZSB0byBzdGFydCB0aGUgY29udG91cnMgYXRcbiAqIGVuZDogdGhlIHZhbHVlIHRvIGVuZCBhdCAobXVzdCBiZSA+IHN0YXJ0KVxuICogbmNvbnRvdXJzOiBtYXggbnVtYmVyIG9mIGNvbnRvdXJzIHRvIG1ha2UsIGxpa2Ugcm91Z2hEVGlja1xuICpcbiAqIHJldHVybnM6IGFuIGF4aXMgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGF1dG9Db250b3VycyhzdGFydCwgZW5kLCBuY29udG91cnMpIHtcbiAgICB2YXIgZHVtbXlBeCA9IHtcbiAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgIHJhbmdlOiBbc3RhcnQsIGVuZF1cbiAgICB9O1xuXG4gICAgQXhlcy5hdXRvVGlja3MoXG4gICAgICAgIGR1bW15QXgsXG4gICAgICAgIChlbmQgLSBzdGFydCkgLyAobmNvbnRvdXJzIHx8IDE1KVxuICAgICk7XG5cbiAgICByZXR1cm4gZHVtbXlBeDtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3JzY2FsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlTGFiZWxEZWZhdWx0cyA9IHJlcXVpcmUoJy4vbGFiZWxfZGVmYXVsdHMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVN0eWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgbGF5b3V0LCBvcHRzKSB7XG4gICAgdmFyIGNvbG9yaW5nID0gY29lcmNlKCdjb250b3Vycy5jb2xvcmluZycpO1xuXG4gICAgdmFyIHNob3dMaW5lcztcbiAgICB2YXIgbGluZUNvbG9yID0gJyc7XG4gICAgaWYoY29sb3JpbmcgPT09ICdmaWxsJykgc2hvd0xpbmVzID0gY29lcmNlKCdjb250b3Vycy5zaG93bGluZXMnKTtcblxuICAgIGlmKHNob3dMaW5lcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgaWYoY29sb3JpbmcgIT09ICdsaW5lcycpIGxpbmVDb2xvciA9IGNvZXJjZSgnbGluZS5jb2xvcicsICcjMDAwJyk7XG4gICAgICAgIGNvZXJjZSgnbGluZS53aWR0aCcsIDAuNSk7XG4gICAgICAgIGNvZXJjZSgnbGluZS5kYXNoJyk7XG4gICAgfVxuXG4gICAgaWYoY29sb3JpbmcgIT09ICdub25lJykge1xuICAgICAgICAvLyBwbG90cy9wbG90cyBhbHdheXMgY29lcmNlcyBzaG93bGVnZW5kIHRvIHRydWUsIGJ1dCBpbiB0aGlzIGNhc2VcbiAgICAgICAgLy8gd2UgZGVmYXVsdCB0byBmYWxzZSBhbmQgKGJ5IGRlZmF1bHQpIHNob3cgYSBjb2xvcmJhciBpbnN0ZWFkXG4gICAgICAgIGlmKHRyYWNlSW4uc2hvd2xlZ2VuZCAhPT0gdHJ1ZSkgdHJhY2VPdXQuc2hvd2xlZ2VuZCA9IGZhbHNlO1xuICAgICAgICB0cmFjZU91dC5fZGZsdFNob3dMZWdlbmQgPSBmYWxzZTtcblxuICAgICAgICBjb2xvcnNjYWxlRGVmYXVsdHMoXG4gICAgICAgICAgICB0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICcnLCBjTGV0dGVyOiAneid9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdsaW5lLnNtb290aGluZycpO1xuXG4gICAgaGFuZGxlTGFiZWxEZWZhdWx0cyhjb2VyY2UsIGxheW91dCwgbGluZUNvbG9yLCBvcHRzKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9