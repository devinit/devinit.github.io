(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_contourcarpet_js"],{

/***/ "./node_modules/plotly.js/lib/contourcarpet.js":
/*!*****************************************************!*\
  !*** ./node_modules/plotly.js/lib/contourcarpet.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/contourcarpet */ "./node_modules/plotly.js/src/traces/contourcarpet/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/axis_aligned_line.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/axis_aligned_line.js ***!
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



var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;

/* This function retrns a set of control points that define a curve aligned along
 * either the a or b axis. Exactly one of a or b must be an array defining the range
 * spanned.
 *
 * Honestly this is the most complicated function I've implemente here so far because
 * of the way it handles knot insertion and direction/axis-agnostic slices.
 */
module.exports = function(carpet, carpetcd, a, b) {
    var idx, tangent, tanIsoIdx, tanIsoPar, segment, refidx;
    var p0, p1, v0, v1, start, end, range;

    var axis = isArrayOrTypedArray(a) ? 'a' : 'b';
    var ax = axis === 'a' ? carpet.aaxis : carpet.baxis;
    var smoothing = ax.smoothing;
    var toIdx = axis === 'a' ? carpet.a2i : carpet.b2j;
    var pt = axis === 'a' ? a : b;
    var iso = axis === 'a' ? b : a;
    var n = axis === 'a' ? carpetcd.a.length : carpetcd.b.length;
    var m = axis === 'a' ? carpetcd.b.length : carpetcd.a.length;
    var isoIdx = Math.floor(axis === 'a' ? carpet.b2j(iso) : carpet.a2i(iso));

    var xy = axis === 'a' ? function(value) {
        return carpet.evalxy([], value, isoIdx);
    } : function(value) {
        return carpet.evalxy([], isoIdx, value);
    };

    if(smoothing) {
        tanIsoIdx = Math.max(0, Math.min(m - 2, isoIdx));
        tanIsoPar = isoIdx - tanIsoIdx;
        tangent = axis === 'a' ? function(i, ti) {
            return carpet.dxydi([], i, tanIsoIdx, ti, tanIsoPar);
        } : function(j, tj) {
            return carpet.dxydj([], tanIsoIdx, j, tanIsoPar, tj);
        };
    }

    var vstart = toIdx(pt[0]);
    var vend = toIdx(pt[1]);

    // So that we can make this work in two directions, flip all of the
    // math functions if the direction is from higher to lower indices:
    //
    // Note that the tolerance is directional!
    var dir = vstart < vend ? 1 : -1;
    var tol = (vend - vstart) * 1e-8;
    var dirfloor = dir > 0 ? Math.floor : Math.ceil;
    var dirceil = dir > 0 ? Math.ceil : Math.floor;
    var dirmin = dir > 0 ? Math.min : Math.max;
    var dirmax = dir > 0 ? Math.max : Math.min;

    var idx0 = dirfloor(vstart + tol);
    var idx1 = dirceil(vend - tol);

    p0 = xy(vstart);
    var segments = [[p0]];

    for(idx = idx0; idx * dir < idx1 * dir; idx += dir) {
        segment = [];
        start = dirmax(vstart, idx);
        end = dirmin(vend, idx + dir);
        range = end - start;

        // In order to figure out which cell we're in for the derivative (remember,
        // the derivatives are *not* constant across grid lines), let's just average
        // the start and end points. This cuts out just a tiny bit of logic and
        // there's really no computational difference:
        refidx = Math.max(0, Math.min(n - 2, Math.floor(0.5 * (start + end))));

        p1 = xy(end);
        if(smoothing) {
            v0 = tangent(refidx, start - refidx);
            v1 = tangent(refidx, end - refidx);

            segment.push([
                p0[0] + v0[0] / 3 * range,
                p0[1] + v0[1] / 3 * range
            ]);

            segment.push([
                p1[0] - v1[0] / 3 * range,
                p1[1] - v1[1] / 3 * range
            ]);
        }

        segment.push(p1);

        segments.push(segment);
        p0 = p1;
    }

    return segments;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/carpet/lookup_carpetid.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/carpet/lookup_carpetid.js ***!
  \*********************************************************************/
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
 * Given a trace, look up the carpet axis by carpet.
 */
module.exports = function(gd, trace) {
    var n = gd._fullData.length;
    var firstAxis;
    for(var i = 0; i < n; i++) {
        var maybeCarpet = gd._fullData[i];

        if(maybeCarpet.index === trace.index) continue;

        if(maybeCarpet.type === 'carpet') {
            if(!firstAxis) {
                firstAxis = maybeCarpet;
            }

            if(maybeCarpet.carpet === trace.carpet) {
                return maybeCarpet;
            }
        }
    }

    return firstAxis;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contour/constraint_defaults.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contour/constraint_defaults.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var handleLabelDefaults = __webpack_require__(/*! ./label_defaults */ "./node_modules/plotly.js/src/traces/contour/label_defaults.js");

var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var addOpacity = Color.addOpacity;
var opacity = Color.opacity;

var filterOps = __webpack_require__(/*! ../../constants/filter_ops */ "./node_modules/plotly.js/src/constants/filter_ops.js");
var CONSTRAINT_REDUCTION = filterOps.CONSTRAINT_REDUCTION;
var COMPARISON_OPS2 = filterOps.COMPARISON_OPS2;

module.exports = function handleConstraintDefaults(traceIn, traceOut, coerce, layout, defaultColor, opts) {
    var contours = traceOut.contours;
    var showLines, lineColor, fillColor;

    var operation = coerce('contours.operation');
    contours._operation = CONSTRAINT_REDUCTION[operation];

    handleConstraintValueDefaults(coerce, contours);

    if(operation === '=') {
        showLines = contours.showlines = true;
    } else {
        showLines = coerce('contours.showlines');
        fillColor = coerce('fillcolor', addOpacity(
            (traceIn.line || {}).color || defaultColor, 0.5
        ));
    }

    if(showLines) {
        var lineDfltColor = fillColor && opacity(fillColor) ?
            addOpacity(traceOut.fillcolor, 1) :
            defaultColor;
        lineColor = coerce('line.color', lineDfltColor);
        coerce('line.width', 2);
        coerce('line.dash');
    }

    coerce('line.smoothing');

    handleLabelDefaults(coerce, layout, lineColor, opts);
};

function handleConstraintValueDefaults(coerce, contours) {
    var zvalue;

    if(COMPARISON_OPS2.indexOf(contours.operation) === -1) {
        // Requires an array of two numbers:
        coerce('contours.value', [0, 1]);

        if(!Array.isArray(contours.value)) {
            if(isNumeric(contours.value)) {
                zvalue = parseFloat(contours.value);
                contours.value = [zvalue, zvalue + 1];
            }
        } else if(contours.value.length > 2) {
            contours.value = contours.value.slice(2);
        } else if(contours.length === 0) {
            contours.value = [0, 1];
        } else if(contours.length < 2) {
            zvalue = parseFloat(contours.value[0]);
            contours.value = [zvalue, zvalue + 1];
        } else {
            contours.value = [
                parseFloat(contours.value[0]),
                parseFloat(contours.value[1])
            ];
        }
    } else {
        // Requires a single scalar:
        coerce('contours.value', 0);

        if(!isNumeric(contours.value)) {
            if(Array.isArray(contours.value)) {
                contours.value = parseFloat(contours.value[0]);
            } else {
                contours.value = 0;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contourcarpet/attributes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contourcarpet/attributes.js ***!
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



var heatmapAttrs = __webpack_require__(/*! ../heatmap/attributes */ "./node_modules/plotly.js/src/traces/heatmap/attributes.js");
var contourAttrs = __webpack_require__(/*! ../contour/attributes */ "./node_modules/plotly.js/src/traces/contour/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var contourContourAttrs = contourAttrs.contours;

module.exports = extendFlat({
    carpet: {
        valType: 'string',
        role: 'info',
        editType: 'calc',
        description: [
            'The `carpet` of the carpet axes on which this contour trace lies'
        ].join(' ')
    },
    z: heatmapAttrs.z,
    a: heatmapAttrs.x,
    a0: heatmapAttrs.x0,
    da: heatmapAttrs.dx,
    b: heatmapAttrs.y,
    b0: heatmapAttrs.y0,
    db: heatmapAttrs.dy,
    text: heatmapAttrs.text,
    hovertext: heatmapAttrs.hovertext,
    transpose: heatmapAttrs.transpose,
    atype: heatmapAttrs.xtype,
    btype: heatmapAttrs.ytype,

    fillcolor: contourAttrs.fillcolor,

    autocontour: contourAttrs.autocontour,
    ncontours: contourAttrs.ncontours,

    contours: {
        type: contourContourAttrs.type,
        start: contourContourAttrs.start,
        end: contourContourAttrs.end,
        size: contourContourAttrs.size,
        coloring: {
            // from contourAttrs.contours.coloring but no 'heatmap' option
            valType: 'enumerated',
            values: ['fill', 'lines', 'none'],
            dflt: 'fill',
            role: 'style',
            editType: 'calc',
            description: [
                'Determines the coloring method showing the contour values.',
                'If *fill*, coloring is done evenly between each contour level',
                'If *lines*, coloring is done on the contour lines.',
                'If *none*, no coloring is applied on this trace.'
            ].join(' ')
        },
        showlines: contourContourAttrs.showlines,
        showlabels: contourContourAttrs.showlabels,
        labelfont: contourContourAttrs.labelfont,
        labelformat: contourContourAttrs.labelformat,
        operation: contourContourAttrs.operation,
        value: contourContourAttrs.value,
        editType: 'calc',
        impliedEdits: {'autocontour': false}
    },

    line: {
        color: contourAttrs.line.color,
        width: contourAttrs.line.width,
        dash: contourAttrs.line.dash,
        smoothing: contourAttrs.line.smoothing,
        editType: 'plot'
    },

    transforms: undefined
},

    colorScaleAttrs('', {
        cLetter: 'z',
        autoColorDflt: false
    })
);


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contourcarpet/calc.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contourcarpet/calc.js ***!
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



var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var convertColumnData = __webpack_require__(/*! ../heatmap/convert_column_xyz */ "./node_modules/plotly.js/src/traces/heatmap/convert_column_xyz.js");
var clean2dArray = __webpack_require__(/*! ../heatmap/clean_2d_array */ "./node_modules/plotly.js/src/traces/heatmap/clean_2d_array.js");
var interp2d = __webpack_require__(/*! ../heatmap/interp2d */ "./node_modules/plotly.js/src/traces/heatmap/interp2d.js");
var findEmpties = __webpack_require__(/*! ../heatmap/find_empties */ "./node_modules/plotly.js/src/traces/heatmap/find_empties.js");
var makeBoundArray = __webpack_require__(/*! ../heatmap/make_bound_array */ "./node_modules/plotly.js/src/traces/heatmap/make_bound_array.js");
var supplyDefaults = __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/contourcarpet/defaults.js");
var lookupCarpet = __webpack_require__(/*! ../carpet/lookup_carpetid */ "./node_modules/plotly.js/src/traces/carpet/lookup_carpetid.js");
var setContours = __webpack_require__(/*! ../contour/set_contours */ "./node_modules/plotly.js/src/traces/contour/set_contours.js");

// most is the same as heatmap calc, then adjust it
// though a few things inside heatmap calc still look for
// contour maps, because the makeBoundArray calls are too entangled
module.exports = function calc(gd, trace) {
    var carpet = trace._carpetTrace = lookupCarpet(gd, trace);
    if(!carpet || !carpet.visible || carpet.visible === 'legendonly') return;

    if(!trace.a || !trace.b) {
        // Look up the original incoming carpet data:
        var carpetdata = gd.data[carpet.index];

        // Look up the incoming trace data, *except* perform a shallow
        // copy so that we're not actually modifying it when we use it
        // to supply defaults:
        var tracedata = gd.data[trace.index];
        // var tracedata = extendFlat({}, gd.data[trace.index]);

        // If the data is not specified
        if(!tracedata.a) tracedata.a = carpetdata.a;
        if(!tracedata.b) tracedata.b = carpetdata.b;

        supplyDefaults(tracedata, trace, trace._defaultColor, gd._fullLayout);
    }

    var cd = heatmappishCalc(gd, trace);
    setContours(trace, trace._z);

    return cd;
};

function heatmappishCalc(gd, trace) {
    // prepare the raw data
    // run makeCalcdata on x and y even for heatmaps, in case of category mappings
    var carpet = trace._carpetTrace;
    var aax = carpet.aaxis;
    var bax = carpet.baxis;
    var a,
        a0,
        da,
        b,
        b0,
        db,
        z;

    // cancel minimum tick spacings (only applies to bars and boxes)
    aax._minDtick = 0;
    bax._minDtick = 0;

    if(Lib.isArray1D(trace.z)) convertColumnData(trace, aax, bax, 'a', 'b', ['z']);
    a = trace._a = trace._a || trace.a;
    b = trace._b = trace._b || trace.b;

    a = a ? aax.makeCalcdata(trace, '_a') : [];
    b = b ? bax.makeCalcdata(trace, '_b') : [];
    a0 = trace.a0 || 0;
    da = trace.da || 1;
    b0 = trace.b0 || 0;
    db = trace.db || 1;

    z = trace._z = clean2dArray(trace._z || trace.z, trace.transpose);

    trace._emptypoints = findEmpties(z);
    interp2d(z, trace._emptypoints);

    // create arrays of brick boundaries, to be used by autorange and heatmap.plot
    var xlen = Lib.maxRowLength(z);
    var xIn = trace.xtype === 'scaled' ? '' : a;
    var xArray = makeBoundArray(trace, xIn, a0, da, xlen, aax);
    var yIn = trace.ytype === 'scaled' ? '' : b;
    var yArray = makeBoundArray(trace, yIn, b0, db, z.length, bax);

    var cd0 = {
        a: xArray,
        b: yArray,
        z: z,
    };

    if(trace.contours.type === 'levels' && trace.contours.coloring !== 'none') {
        // auto-z and autocolorscale if applicable
        colorscaleCalc(gd, trace, {
            vals: z,
            containerStr: '',
            cLetter: 'z'
        });
    }

    return [cd0];
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contourcarpet/defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contourcarpet/defaults.js ***!
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

var handleXYZDefaults = __webpack_require__(/*! ../heatmap/xyz_defaults */ "./node_modules/plotly.js/src/traces/heatmap/xyz_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/contourcarpet/attributes.js");
var handleConstraintDefaults = __webpack_require__(/*! ../contour/constraint_defaults */ "./node_modules/plotly.js/src/traces/contour/constraint_defaults.js");
var handleContoursDefaults = __webpack_require__(/*! ../contour/contours_defaults */ "./node_modules/plotly.js/src/traces/contour/contours_defaults.js");
var handleStyleDefaults = __webpack_require__(/*! ../contour/style_defaults */ "./node_modules/plotly.js/src/traces/contour/style_defaults.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    function coerce2(attr) {
        return Lib.coerce2(traceIn, traceOut, attributes, attr);
    }

    coerce('carpet');

    // If either a or b is not present, then it's not a valid trace *unless* the carpet
    // axis has the a or b values we're looking for. So if these are not found, just defer
    // that decision until the calc step.
    //
    // NB: the calc step will modify the original data input by assigning whichever of
    // a or b are missing. This is necessary because panning goes right from supplyDefaults
    // to plot (skipping calc). That means on subsequent updates, this *will* need to be
    // able to find a and b.
    //
    // The long-term proper fix is that this should perhaps use underscored attributes to
    // at least modify the user input to a slightly lesser extent. Fully removing the
    // input mutation is challenging. The underscore approach is not currently taken since
    // it requires modification to all of the functions below that expect the coerced
    // attribute name to match the property name -- except '_a' !== 'a' so that is not
    // straightforward.
    if(traceIn.a && traceIn.b) {
        var len = handleXYZDefaults(traceIn, traceOut, coerce, layout, 'a', 'b');

        if(!len) {
            traceOut.visible = false;
            return;
        }

        coerce('text');
        var isConstraint = (coerce('contours.type') === 'constraint');

        if(isConstraint) {
            handleConstraintDefaults(traceIn, traceOut, coerce, layout, defaultColor, {hasHover: false});
        } else {
            handleContoursDefaults(traceIn, traceOut, coerce, coerce2);
            handleStyleDefaults(traceIn, traceOut, coerce, layout, {hasHover: false});
        }
    } else {
        traceOut._defaultColor = defaultColor;
        traceOut._length = null;
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contourcarpet/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contourcarpet/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/contourcarpet/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/contourcarpet/defaults.js"),
    colorbar: __webpack_require__(/*! ../contour/colorbar */ "./node_modules/plotly.js/src/traces/contour/colorbar.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/contourcarpet/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/contourcarpet/plot.js"),
    style: __webpack_require__(/*! ../contour/style */ "./node_modules/plotly.js/src/traces/contour/style.js"),

    moduleType: 'trace',
    name: 'contourcarpet',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', 'carpet', 'contour', 'symbols', 'showLegend', 'hasLines', 'carpetDependent', 'noHover', 'noSortingByValue'],
    meta: {
        hrName: 'contour_carpet',
        description: [
            'Plots contours on either the first carpet axis or the',
            'carpet axis with a matching `carpet` attribute. Data `z`',
            'is interpreted as matching that of the corresponding carpet',
            'axis.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/contourcarpet/plot.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/contourcarpet/plot.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var map1dArray = __webpack_require__(/*! ../carpet/map_1d_array */ "./node_modules/plotly.js/src/traces/carpet/map_1d_array.js");
var makepath = __webpack_require__(/*! ../carpet/makepath */ "./node_modules/plotly.js/src/traces/carpet/makepath.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var makeCrossings = __webpack_require__(/*! ../contour/make_crossings */ "./node_modules/plotly.js/src/traces/contour/make_crossings.js");
var findAllPaths = __webpack_require__(/*! ../contour/find_all_paths */ "./node_modules/plotly.js/src/traces/contour/find_all_paths.js");
var contourPlot = __webpack_require__(/*! ../contour/plot */ "./node_modules/plotly.js/src/traces/contour/plot.js");
var constants = __webpack_require__(/*! ../contour/constants */ "./node_modules/plotly.js/src/traces/contour/constants.js");
var convertToConstraints = __webpack_require__(/*! ../contour/convert_to_constraints */ "./node_modules/plotly.js/src/traces/contour/convert_to_constraints.js");
var emptyPathinfo = __webpack_require__(/*! ../contour/empty_pathinfo */ "./node_modules/plotly.js/src/traces/contour/empty_pathinfo.js");
var closeBoundaries = __webpack_require__(/*! ../contour/close_boundaries */ "./node_modules/plotly.js/src/traces/contour/close_boundaries.js");
var lookupCarpet = __webpack_require__(/*! ../carpet/lookup_carpetid */ "./node_modules/plotly.js/src/traces/carpet/lookup_carpetid.js");
var axisAlignedLine = __webpack_require__(/*! ../carpet/axis_aligned_line */ "./node_modules/plotly.js/src/traces/carpet/axis_aligned_line.js");

module.exports = function plot(gd, plotinfo, cdcontours, contourcarpetLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    Lib.makeTraceGroups(contourcarpetLayer, cdcontours, 'contour').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;

        var carpet = trace._carpetTrace = lookupCarpet(gd, trace);
        var carpetcd = gd.calcdata[carpet.index][0];

        if(!carpet.visible || carpet.visible === 'legendonly') return;

        var a = cd0.a;
        var b = cd0.b;
        var contours = trace.contours;
        var pathinfo = emptyPathinfo(contours, plotinfo, cd0);
        var isConstraint = contours.type === 'constraint';
        var operation = contours._operation;
        var coloring = isConstraint ? (operation === '=' ? 'lines' : 'fill') : contours.coloring;

        // Map [a, b] (data) --> [i, j] (pixels)
        function ab2p(ab) {
            var pt = carpet.ab2xy(ab[0], ab[1], true);
            return [xa.c2p(pt[0]), ya.c2p(pt[1])];
        }

        // Define the perimeter in a/b coordinates:
        var perimeter = [
            [a[0], b[b.length - 1]],
            [a[a.length - 1], b[b.length - 1]],
            [a[a.length - 1], b[0]],
            [a[0], b[0]]
        ];

        // Extract the contour levels:
        makeCrossings(pathinfo);
        var atol = (a[a.length - 1] - a[0]) * 1e-8;
        var btol = (b[b.length - 1] - b[0]) * 1e-8;
        findAllPaths(pathinfo, atol, btol);

        // Constraints might need to be draw inverted, which is not something contours
        // handle by default since they're assumed fully opaque so that they can be
        // drawn overlapping. This function flips the paths as necessary so that they're
        // drawn correctly.
        //
        // TODO: Perhaps this should be generalized and *all* paths should be drawn as
        // closed regions so that translucent contour levels would be valid.
        // See: https://github.com/plotly/plotly.js/issues/1356
        var fillPathinfo = pathinfo;
        if(contours.type === 'constraint') {
            fillPathinfo = convertToConstraints(pathinfo, operation);
        }

        // Map the paths in a/b coordinates to pixel coordinates:
        mapPathinfo(pathinfo, ab2p);

        // draw everything

        // Compute the boundary path
        var seg, xp, yp, i;
        var segs = [];
        for(i = carpetcd.clipsegments.length - 1; i >= 0; i--) {
            seg = carpetcd.clipsegments[i];
            xp = map1dArray([], seg.x, xa.c2p);
            yp = map1dArray([], seg.y, ya.c2p);
            xp.reverse();
            yp.reverse();
            segs.push(makepath(xp, yp, seg.bicubic));
        }

        var boundaryPath = 'M' + segs.join('L') + 'Z';

        // Draw the baseline background fill that fills in the space behind any other
        // contour levels:
        makeBackground(plotGroup, carpetcd.clipsegments, xa, ya, isConstraint, coloring);

        // Draw the specific contour fills. As a simplification, they're assumed to be
        // fully opaque so that it's easy to draw them simply overlapping. The alternative
        // would be to flip adjacent paths and draw closed paths for each level instead.
        makeFills(trace, plotGroup, xa, ya, fillPathinfo, perimeter, ab2p, carpet, carpetcd, coloring, boundaryPath);

        // Draw contour lines:
        makeLinesAndLabels(plotGroup, pathinfo, gd, cd0, contours, plotinfo, carpet);

        // Clip the boundary of the plot
        Drawing.setClipUrl(plotGroup, carpet._clipPathId, gd);
    });
};

function mapPathinfo(pathinfo, map) {
    var i, j, k, pi, pedgepaths, ppaths, pedgepath, ppath, path;

    for(i = 0; i < pathinfo.length; i++) {
        pi = pathinfo[i];
        pedgepaths = pi.pedgepaths = [];
        ppaths = pi.ppaths = [];
        for(j = 0; j < pi.edgepaths.length; j++) {
            path = pi.edgepaths[j];
            pedgepath = [];
            for(k = 0; k < path.length; k++) {
                pedgepath[k] = map(path[k]);
            }
            pedgepaths.push(pedgepath);
        }
        for(j = 0; j < pi.paths.length; j++) {
            path = pi.paths[j];
            ppath = [];
            for(k = 0; k < path.length; k++) {
                ppath[k] = map(path[k]);
            }
            ppaths.push(ppath);
        }
    }
}

function makeLinesAndLabels(plotgroup, pathinfo, gd, cd0, contours, plotinfo, carpet) {
    var lineContainer = Lib.ensureSingle(plotgroup, 'g', 'contourlines');
    var showLines = contours.showlines !== false;
    var showLabels = contours.showlabels;
    var clipLinesForLabels = showLines && showLabels;

    // Even if we're not going to show lines, we need to create them
    // if we're showing labels, because the fill paths include the perimeter
    // so can't be used to position the labels correctly.
    // In this case we'll remove the lines after making the labels.
    var linegroup = contourPlot.createLines(lineContainer, showLines || showLabels, pathinfo);

    var lineClip = contourPlot.createLineClip(lineContainer, clipLinesForLabels, gd, cd0.trace.uid);

    var labelGroup = plotgroup.selectAll('g.contourlabels')
        .data(showLabels ? [0] : []);

    labelGroup.exit().remove();

    labelGroup.enter().append('g')
        .classed('contourlabels', true);

    if(showLabels) {
        var xa = plotinfo.xaxis;
        var ya = plotinfo.yaxis;
        var xLen = xa._length;
        var yLen = ya._length;
        // for simplicity use the xy box for label clipping outline.
        var labelClipPathData = [[
            [0, 0],
            [xLen, 0],
            [xLen, yLen],
            [0, yLen]
        ]];


        var labelData = [];

        // invalidate the getTextLocation cache in case paths changed
        Lib.clearLocationCache();

        var contourFormat = contourPlot.labelFormatter(gd, cd0);

        var dummyText = Drawing.tester.append('text')
            .attr('data-notex', 1)
            .call(Drawing.font, contours.labelfont);

        // use `bounds` only to keep labels away from the x/y boundaries
        // `constrainToCarpet` below ensures labels don't go off the
        // carpet edges
        var bounds = {
            left: 0,
            right: xLen,
            center: xLen / 2,
            top: 0,
            bottom: yLen,
            middle: yLen / 2
        };

        var plotDiagonal = Math.sqrt(xLen * xLen + yLen * yLen);

        // the path length to use to scale the number of labels to draw:
        var normLength = constants.LABELDISTANCE * plotDiagonal /
            Math.max(1, pathinfo.length / constants.LABELINCREASE);

        linegroup.each(function(d) {
            var textOpts = contourPlot.calcTextOpts(d.level, contourFormat, dummyText, gd);

            d3.select(this).selectAll('path').each(function(pathData) {
                var path = this;
                var pathBounds = Lib.getVisibleSegment(path, bounds, textOpts.height / 2);
                if(!pathBounds) return;

                constrainToCarpet(path, pathData, d, pathBounds, carpet, textOpts.height);

                if(pathBounds.len < (textOpts.width + textOpts.height) * constants.LABELMIN) return;

                var maxLabels = Math.min(Math.ceil(pathBounds.len / normLength),
                    constants.LABELMAX);

                for(var i = 0; i < maxLabels; i++) {
                    var loc = contourPlot.findBestTextLocation(path, pathBounds, textOpts,
                        labelData, bounds);

                    if(!loc) break;

                    contourPlot.addLabelData(loc, textOpts, labelData, labelClipPathData);
                }
            });
        });

        dummyText.remove();

        contourPlot.drawLabels(labelGroup, labelData, gd, lineClip,
            clipLinesForLabels ? labelClipPathData : null);
    }

    if(showLabels && !showLines) linegroup.remove();
}

// figure out if this path goes off the edge of the carpet
// and shorten the part we call visible to keep labels away from the edge
function constrainToCarpet(path, pathData, levelData, pathBounds, carpet, textHeight) {
    var pathABData;
    for(var i = 0; i < levelData.pedgepaths.length; i++) {
        if(pathData === levelData.pedgepaths[i]) {
            pathABData = levelData.edgepaths[i];
        }
    }
    if(!pathABData) return;

    var aMin = carpet.a[0];
    var aMax = carpet.a[carpet.a.length - 1];
    var bMin = carpet.b[0];
    var bMax = carpet.b[carpet.b.length - 1];

    function getOffset(abPt, pathVector) {
        var offset = 0;
        var edgeVector;
        var dAB = 0.1;
        if(Math.abs(abPt[0] - aMin) < dAB || Math.abs(abPt[0] - aMax) < dAB) {
            edgeVector = normalizeVector(carpet.dxydb_rough(abPt[0], abPt[1], dAB));
            offset = Math.max(offset, textHeight * vectorTan(pathVector, edgeVector) / 2);
        }

        if(Math.abs(abPt[1] - bMin) < dAB || Math.abs(abPt[1] - bMax) < dAB) {
            edgeVector = normalizeVector(carpet.dxyda_rough(abPt[0], abPt[1], dAB));
            offset = Math.max(offset, textHeight * vectorTan(pathVector, edgeVector) / 2);
        }
        return offset;
    }

    var startVector = getUnitVector(path, 0, 1);
    var endVector = getUnitVector(path, pathBounds.total, pathBounds.total - 1);
    var minStart = getOffset(pathABData[0], startVector);
    var maxEnd = pathBounds.total - getOffset(pathABData[pathABData.length - 1], endVector);

    if(pathBounds.min < minStart) pathBounds.min = minStart;
    if(pathBounds.max > maxEnd) pathBounds.max = maxEnd;

    pathBounds.len = pathBounds.max - pathBounds.min;
}

function getUnitVector(path, p0, p1) {
    var pt0 = path.getPointAtLength(p0);
    var pt1 = path.getPointAtLength(p1);
    var dx = pt1.x - pt0.x;
    var dy = pt1.y - pt0.y;
    var len = Math.sqrt(dx * dx + dy * dy);
    return [dx / len, dy / len];
}

function normalizeVector(v) {
    var len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    return [v[0] / len, v[1] / len];
}

function vectorTan(v0, v1) {
    var cos = Math.abs(v0[0] * v1[0] + v0[1] * v1[1]);
    var sin = Math.sqrt(1 - cos * cos);
    return sin / cos;
}

function makeBackground(plotgroup, clipsegments, xaxis, yaxis, isConstraint, coloring) {
    var seg, xp, yp, i;
    var bggroup = Lib.ensureSingle(plotgroup, 'g', 'contourbg');

    var bgfill = bggroup.selectAll('path')
        .data((coloring === 'fill' && !isConstraint) ? [0] : []);
    bgfill.enter().append('path');
    bgfill.exit().remove();

    var segs = [];
    for(i = 0; i < clipsegments.length; i++) {
        seg = clipsegments[i];
        xp = map1dArray([], seg.x, xaxis.c2p);
        yp = map1dArray([], seg.y, yaxis.c2p);
        segs.push(makepath(xp, yp, seg.bicubic));
    }

    bgfill
        .attr('d', 'M' + segs.join('L') + 'Z')
        .style('stroke', 'none');
}

function makeFills(trace, plotgroup, xa, ya, pathinfo, perimeter, ab2p, carpet, carpetcd, coloring, boundaryPath) {
    var hasFills = coloring === 'fill';

    // fills prefixBoundary in pathinfo items
    if(hasFills) {
        closeBoundaries(pathinfo, trace.contours);
    }

    var fillgroup = Lib.ensureSingle(plotgroup, 'g', 'contourfill');
    var fillitems = fillgroup.selectAll('path').data(hasFills ? pathinfo : []);
    fillitems.enter().append('path');
    fillitems.exit().remove();
    fillitems.each(function(pi) {
        // join all paths for this level together into a single path
        // first follow clockwise around the perimeter to close any open paths
        // if the whole perimeter is above this level, start with a path
        // enclosing the whole thing. With all that, the parity should mean
        // that we always fill everything above the contour, nothing below
        var fullpath = (pi.prefixBoundary ? boundaryPath : '') +
            joinAllPaths(trace, pi, perimeter, ab2p, carpet, carpetcd, xa, ya);

        if(!fullpath) {
            d3.select(this).remove();
        } else {
            d3.select(this)
                .attr('d', fullpath)
                .style('stroke', 'none');
        }
    });
}

function joinAllPaths(trace, pi, perimeter, ab2p, carpet, carpetcd, xa, ya) {
    var i;
    var fullpath = '';

    var startsleft = pi.edgepaths.map(function(v, i) { return i; });
    var newloop = true;
    var endpt, newendpt, cnt, nexti, possiblei, addpath;

    var atol = Math.abs(perimeter[0][0] - perimeter[2][0]) * 1e-4;
    var btol = Math.abs(perimeter[0][1] - perimeter[2][1]) * 1e-4;

    function istop(pt) { return Math.abs(pt[1] - perimeter[0][1]) < btol; }
    function isbottom(pt) { return Math.abs(pt[1] - perimeter[2][1]) < btol; }
    function isleft(pt) { return Math.abs(pt[0] - perimeter[0][0]) < atol; }
    function isright(pt) { return Math.abs(pt[0] - perimeter[2][0]) < atol; }

    function pathto(pt0, pt1) {
        var i, j, segments, axis;
        var path = '';

        if((istop(pt0) && !isright(pt0)) || (isbottom(pt0) && !isleft(pt0))) {
            axis = carpet.aaxis;
            segments = axisAlignedLine(carpet, carpetcd, [pt0[0], pt1[0]], 0.5 * (pt0[1] + pt1[1]));
        } else {
            axis = carpet.baxis;
            segments = axisAlignedLine(carpet, carpetcd, 0.5 * (pt0[0] + pt1[0]), [pt0[1], pt1[1]]);
        }

        for(i = 1; i < segments.length; i++) {
            path += axis.smoothing ? 'C' : 'L';
            for(j = 0; j < segments[i].length; j++) {
                var pt = segments[i][j];
                path += [xa.c2p(pt[0]), ya.c2p(pt[1])] + ' ';
            }
        }

        return path;
    }

    i = 0;
    endpt = null;
    while(startsleft.length) {
        var startpt = pi.edgepaths[i][0];

        if(endpt) {
            fullpath += pathto(endpt, startpt);
        }

        addpath = Drawing.smoothopen(pi.edgepaths[i].map(ab2p), pi.smoothing);
        fullpath += newloop ? addpath : addpath.replace(/^M/, 'L');
        startsleft.splice(startsleft.indexOf(i), 1);
        endpt = pi.edgepaths[i][pi.edgepaths[i].length - 1];
        nexti = -1;

        // now loop through sides, moving our endpoint until we find a new start
        for(cnt = 0; cnt < 4; cnt++) { // just to prevent infinite loops
            if(!endpt) {
                Lib.log('Missing end?', i, pi);
                break;
            }

            if(istop(endpt) && !isright(endpt)) {
                newendpt = perimeter[1]; // left top ---> right top
            } else if(isleft(endpt)) {
                newendpt = perimeter[0]; // left bottom ---> left top
            } else if(isbottom(endpt)) {
                newendpt = perimeter[3]; // right bottom
            } else if(isright(endpt)) {
                newendpt = perimeter[2]; // left bottom
            }

            for(possiblei = 0; possiblei < pi.edgepaths.length; possiblei++) {
                var ptNew = pi.edgepaths[possiblei][0];
                // is ptNew on the (horz. or vert.) segment from endpt to newendpt?
                if(Math.abs(endpt[0] - newendpt[0]) < atol) {
                    if(Math.abs(endpt[0] - ptNew[0]) < atol &&
                            (ptNew[1] - endpt[1]) * (newendpt[1] - ptNew[1]) >= 0) {
                        newendpt = ptNew;
                        nexti = possiblei;
                    }
                } else if(Math.abs(endpt[1] - newendpt[1]) < btol) {
                    if(Math.abs(endpt[1] - ptNew[1]) < btol &&
                            (ptNew[0] - endpt[0]) * (newendpt[0] - ptNew[0]) >= 0) {
                        newendpt = ptNew;
                        nexti = possiblei;
                    }
                } else {
                    Lib.log('endpt to newendpt is not vert. or horz.', endpt, newendpt, ptNew);
                }
            }

            if(nexti >= 0) break;
            fullpath += pathto(endpt, newendpt);
            endpt = newendpt;
        }

        if(nexti === pi.edgepaths.length) {
            Lib.log('unclosed perimeter path');
            break;
        }

        i = nexti;

        // if we closed back on a loop we already included,
        // close it and start a new loop
        newloop = (startsleft.indexOf(i) === -1);
        if(newloop) {
            i = startsleft[0];
            fullpath += pathto(endpt, newendpt) + 'Z';
            endpt = null;
        }
    }

    // finally add the interior paths
    for(i = 0; i < pi.paths.length; i++) {
        fullpath += Drawing.smoothclosed(pi.paths[i].map(ab2p), pi.smoothing);
    }

    return fullpath;
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvY29udG91cmNhcnBldC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9heGlzX2FsaWduZWRfbGluZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NhcnBldC9sb29rdXBfY2FycGV0aWQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyL2NvbnN0cmFpbnRfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyY2FycGV0L2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyY2FycGV0L2NhbGMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jb250b3VyY2FycGV0L2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY29udG91cmNhcnBldC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2NvbnRvdXJjYXJwZXQvcGxvdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixxSUFBdUQ7Ozs7Ozs7Ozs7OztBQ1Z2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBOztBQUVBO0FBQ0E7O0FBRUEsd0JBQXdCLGlEQUFpRDtBQUN6RSwyQkFBMkIsaURBQWlEO0FBQzVFLHlCQUF5QixpREFBaUQ7QUFDMUUsMEJBQTBCLGlEQUFpRDs7QUFFM0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBLHNCQUFzQix3QkFBd0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixTQUFTLFNBQVM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0M7QUFDeEMsYUFBYTtBQUNiLHdDQUF3QztBQUN4QyxhQUFhO0FBQ2Isd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYix3Q0FBd0M7QUFDeEM7O0FBRUEsOEJBQThCLGlDQUFpQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMscUJBQXFCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydDljNWI5ZWVmODE4MDdiZTg2Y2UxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvY29udG91cmNhcnBldCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheU9yVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmlzQXJyYXlPclR5cGVkQXJyYXk7XG5cbi8qIFRoaXMgZnVuY3Rpb24gcmV0cm5zIGEgc2V0IG9mIGNvbnRyb2wgcG9pbnRzIHRoYXQgZGVmaW5lIGEgY3VydmUgYWxpZ25lZCBhbG9uZ1xuICogZWl0aGVyIHRoZSBhIG9yIGIgYXhpcy4gRXhhY3RseSBvbmUgb2YgYSBvciBiIG11c3QgYmUgYW4gYXJyYXkgZGVmaW5pbmcgdGhlIHJhbmdlXG4gKiBzcGFubmVkLlxuICpcbiAqIEhvbmVzdGx5IHRoaXMgaXMgdGhlIG1vc3QgY29tcGxpY2F0ZWQgZnVuY3Rpb24gSSd2ZSBpbXBsZW1lbnRlIGhlcmUgc28gZmFyIGJlY2F1c2VcbiAqIG9mIHRoZSB3YXkgaXQgaGFuZGxlcyBrbm90IGluc2VydGlvbiBhbmQgZGlyZWN0aW9uL2F4aXMtYWdub3N0aWMgc2xpY2VzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNhcnBldCwgY2FycGV0Y2QsIGEsIGIpIHtcbiAgICB2YXIgaWR4LCB0YW5nZW50LCB0YW5Jc29JZHgsIHRhbklzb1Bhciwgc2VnbWVudCwgcmVmaWR4O1xuICAgIHZhciBwMCwgcDEsIHYwLCB2MSwgc3RhcnQsIGVuZCwgcmFuZ2U7XG5cbiAgICB2YXIgYXhpcyA9IGlzQXJyYXlPclR5cGVkQXJyYXkoYSkgPyAnYScgOiAnYic7XG4gICAgdmFyIGF4ID0gYXhpcyA9PT0gJ2EnID8gY2FycGV0LmFheGlzIDogY2FycGV0LmJheGlzO1xuICAgIHZhciBzbW9vdGhpbmcgPSBheC5zbW9vdGhpbmc7XG4gICAgdmFyIHRvSWR4ID0gYXhpcyA9PT0gJ2EnID8gY2FycGV0LmEyaSA6IGNhcnBldC5iMmo7XG4gICAgdmFyIHB0ID0gYXhpcyA9PT0gJ2EnID8gYSA6IGI7XG4gICAgdmFyIGlzbyA9IGF4aXMgPT09ICdhJyA/IGIgOiBhO1xuICAgIHZhciBuID0gYXhpcyA9PT0gJ2EnID8gY2FycGV0Y2QuYS5sZW5ndGggOiBjYXJwZXRjZC5iLmxlbmd0aDtcbiAgICB2YXIgbSA9IGF4aXMgPT09ICdhJyA/IGNhcnBldGNkLmIubGVuZ3RoIDogY2FycGV0Y2QuYS5sZW5ndGg7XG4gICAgdmFyIGlzb0lkeCA9IE1hdGguZmxvb3IoYXhpcyA9PT0gJ2EnID8gY2FycGV0LmIyaihpc28pIDogY2FycGV0LmEyaShpc28pKTtcblxuICAgIHZhciB4eSA9IGF4aXMgPT09ICdhJyA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBjYXJwZXQuZXZhbHh5KFtdLCB2YWx1ZSwgaXNvSWR4KTtcbiAgICB9IDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNhcnBldC5ldmFseHkoW10sIGlzb0lkeCwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBpZihzbW9vdGhpbmcpIHtcbiAgICAgICAgdGFuSXNvSWR4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obSAtIDIsIGlzb0lkeCkpO1xuICAgICAgICB0YW5Jc29QYXIgPSBpc29JZHggLSB0YW5Jc29JZHg7XG4gICAgICAgIHRhbmdlbnQgPSBheGlzID09PSAnYScgPyBmdW5jdGlvbihpLCB0aSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhcnBldC5keHlkaShbXSwgaSwgdGFuSXNvSWR4LCB0aSwgdGFuSXNvUGFyKTtcbiAgICAgICAgfSA6IGZ1bmN0aW9uKGosIHRqKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FycGV0LmR4eWRqKFtdLCB0YW5Jc29JZHgsIGosIHRhbklzb1BhciwgdGopO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciB2c3RhcnQgPSB0b0lkeChwdFswXSk7XG4gICAgdmFyIHZlbmQgPSB0b0lkeChwdFsxXSk7XG5cbiAgICAvLyBTbyB0aGF0IHdlIGNhbiBtYWtlIHRoaXMgd29yayBpbiB0d28gZGlyZWN0aW9ucywgZmxpcCBhbGwgb2YgdGhlXG4gICAgLy8gbWF0aCBmdW5jdGlvbnMgaWYgdGhlIGRpcmVjdGlvbiBpcyBmcm9tIGhpZ2hlciB0byBsb3dlciBpbmRpY2VzOlxuICAgIC8vXG4gICAgLy8gTm90ZSB0aGF0IHRoZSB0b2xlcmFuY2UgaXMgZGlyZWN0aW9uYWwhXG4gICAgdmFyIGRpciA9IHZzdGFydCA8IHZlbmQgPyAxIDogLTE7XG4gICAgdmFyIHRvbCA9ICh2ZW5kIC0gdnN0YXJ0KSAqIDFlLTg7XG4gICAgdmFyIGRpcmZsb29yID0gZGlyID4gMCA/IE1hdGguZmxvb3IgOiBNYXRoLmNlaWw7XG4gICAgdmFyIGRpcmNlaWwgPSBkaXIgPiAwID8gTWF0aC5jZWlsIDogTWF0aC5mbG9vcjtcbiAgICB2YXIgZGlybWluID0gZGlyID4gMCA/IE1hdGgubWluIDogTWF0aC5tYXg7XG4gICAgdmFyIGRpcm1heCA9IGRpciA+IDAgPyBNYXRoLm1heCA6IE1hdGgubWluO1xuXG4gICAgdmFyIGlkeDAgPSBkaXJmbG9vcih2c3RhcnQgKyB0b2wpO1xuICAgIHZhciBpZHgxID0gZGlyY2VpbCh2ZW5kIC0gdG9sKTtcblxuICAgIHAwID0geHkodnN0YXJ0KTtcbiAgICB2YXIgc2VnbWVudHMgPSBbW3AwXV07XG5cbiAgICBmb3IoaWR4ID0gaWR4MDsgaWR4ICogZGlyIDwgaWR4MSAqIGRpcjsgaWR4ICs9IGRpcikge1xuICAgICAgICBzZWdtZW50ID0gW107XG4gICAgICAgIHN0YXJ0ID0gZGlybWF4KHZzdGFydCwgaWR4KTtcbiAgICAgICAgZW5kID0gZGlybWluKHZlbmQsIGlkeCArIGRpcik7XG4gICAgICAgIHJhbmdlID0gZW5kIC0gc3RhcnQ7XG5cbiAgICAgICAgLy8gSW4gb3JkZXIgdG8gZmlndXJlIG91dCB3aGljaCBjZWxsIHdlJ3JlIGluIGZvciB0aGUgZGVyaXZhdGl2ZSAocmVtZW1iZXIsXG4gICAgICAgIC8vIHRoZSBkZXJpdmF0aXZlcyBhcmUgKm5vdCogY29uc3RhbnQgYWNyb3NzIGdyaWQgbGluZXMpLCBsZXQncyBqdXN0IGF2ZXJhZ2VcbiAgICAgICAgLy8gdGhlIHN0YXJ0IGFuZCBlbmQgcG9pbnRzLiBUaGlzIGN1dHMgb3V0IGp1c3QgYSB0aW55IGJpdCBvZiBsb2dpYyBhbmRcbiAgICAgICAgLy8gdGhlcmUncyByZWFsbHkgbm8gY29tcHV0YXRpb25hbCBkaWZmZXJlbmNlOlxuICAgICAgICByZWZpZHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihuIC0gMiwgTWF0aC5mbG9vcigwLjUgKiAoc3RhcnQgKyBlbmQpKSkpO1xuXG4gICAgICAgIHAxID0geHkoZW5kKTtcbiAgICAgICAgaWYoc21vb3RoaW5nKSB7XG4gICAgICAgICAgICB2MCA9IHRhbmdlbnQocmVmaWR4LCBzdGFydCAtIHJlZmlkeCk7XG4gICAgICAgICAgICB2MSA9IHRhbmdlbnQocmVmaWR4LCBlbmQgLSByZWZpZHgpO1xuXG4gICAgICAgICAgICBzZWdtZW50LnB1c2goW1xuICAgICAgICAgICAgICAgIHAwWzBdICsgdjBbMF0gLyAzICogcmFuZ2UsXG4gICAgICAgICAgICAgICAgcDBbMV0gKyB2MFsxXSAvIDMgKiByYW5nZVxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIHNlZ21lbnQucHVzaChbXG4gICAgICAgICAgICAgICAgcDFbMF0gLSB2MVswXSAvIDMgKiByYW5nZSxcbiAgICAgICAgICAgICAgICBwMVsxXSAtIHYxWzFdIC8gMyAqIHJhbmdlXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlZ21lbnQucHVzaChwMSk7XG5cbiAgICAgICAgc2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgcDAgPSBwMTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogR2l2ZW4gYSB0cmFjZSwgbG9vayB1cCB0aGUgY2FycGV0IGF4aXMgYnkgY2FycGV0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGdkLCB0cmFjZSkge1xuICAgIHZhciBuID0gZ2QuX2Z1bGxEYXRhLmxlbmd0aDtcbiAgICB2YXIgZmlyc3RBeGlzO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgdmFyIG1heWJlQ2FycGV0ID0gZ2QuX2Z1bGxEYXRhW2ldO1xuXG4gICAgICAgIGlmKG1heWJlQ2FycGV0LmluZGV4ID09PSB0cmFjZS5pbmRleCkgY29udGludWU7XG5cbiAgICAgICAgaWYobWF5YmVDYXJwZXQudHlwZSA9PT0gJ2NhcnBldCcpIHtcbiAgICAgICAgICAgIGlmKCFmaXJzdEF4aXMpIHtcbiAgICAgICAgICAgICAgICBmaXJzdEF4aXMgPSBtYXliZUNhcnBldDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYobWF5YmVDYXJwZXQuY2FycGV0ID09PSB0cmFjZS5jYXJwZXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF5YmVDYXJwZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlyc3RBeGlzO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG5cbnZhciBoYW5kbGVMYWJlbERlZmF1bHRzID0gcmVxdWlyZSgnLi9sYWJlbF9kZWZhdWx0cycpO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgYWRkT3BhY2l0eSA9IENvbG9yLmFkZE9wYWNpdHk7XG52YXIgb3BhY2l0eSA9IENvbG9yLm9wYWNpdHk7XG5cbnZhciBmaWx0ZXJPcHMgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvZmlsdGVyX29wcycpO1xudmFyIENPTlNUUkFJTlRfUkVEVUNUSU9OID0gZmlsdGVyT3BzLkNPTlNUUkFJTlRfUkVEVUNUSU9OO1xudmFyIENPTVBBUklTT05fT1BTMiA9IGZpbHRlck9wcy5DT01QQVJJU09OX09QUzI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlQ29uc3RyYWludERlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCwgZGVmYXVsdENvbG9yLCBvcHRzKSB7XG4gICAgdmFyIGNvbnRvdXJzID0gdHJhY2VPdXQuY29udG91cnM7XG4gICAgdmFyIHNob3dMaW5lcywgbGluZUNvbG9yLCBmaWxsQ29sb3I7XG5cbiAgICB2YXIgb3BlcmF0aW9uID0gY29lcmNlKCdjb250b3Vycy5vcGVyYXRpb24nKTtcbiAgICBjb250b3Vycy5fb3BlcmF0aW9uID0gQ09OU1RSQUlOVF9SRURVQ1RJT05bb3BlcmF0aW9uXTtcblxuICAgIGhhbmRsZUNvbnN0cmFpbnRWYWx1ZURlZmF1bHRzKGNvZXJjZSwgY29udG91cnMpO1xuXG4gICAgaWYob3BlcmF0aW9uID09PSAnPScpIHtcbiAgICAgICAgc2hvd0xpbmVzID0gY29udG91cnMuc2hvd2xpbmVzID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaG93TGluZXMgPSBjb2VyY2UoJ2NvbnRvdXJzLnNob3dsaW5lcycpO1xuICAgICAgICBmaWxsQ29sb3IgPSBjb2VyY2UoJ2ZpbGxjb2xvcicsIGFkZE9wYWNpdHkoXG4gICAgICAgICAgICAodHJhY2VJbi5saW5lIHx8IHt9KS5jb2xvciB8fCBkZWZhdWx0Q29sb3IsIDAuNVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBpZihzaG93TGluZXMpIHtcbiAgICAgICAgdmFyIGxpbmVEZmx0Q29sb3IgPSBmaWxsQ29sb3IgJiYgb3BhY2l0eShmaWxsQ29sb3IpID9cbiAgICAgICAgICAgIGFkZE9wYWNpdHkodHJhY2VPdXQuZmlsbGNvbG9yLCAxKSA6XG4gICAgICAgICAgICBkZWZhdWx0Q29sb3I7XG4gICAgICAgIGxpbmVDb2xvciA9IGNvZXJjZSgnbGluZS5jb2xvcicsIGxpbmVEZmx0Q29sb3IpO1xuICAgICAgICBjb2VyY2UoJ2xpbmUud2lkdGgnLCAyKTtcbiAgICAgICAgY29lcmNlKCdsaW5lLmRhc2gnKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2xpbmUuc21vb3RoaW5nJyk7XG5cbiAgICBoYW5kbGVMYWJlbERlZmF1bHRzKGNvZXJjZSwgbGF5b3V0LCBsaW5lQ29sb3IsIG9wdHMpO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlQ29uc3RyYWludFZhbHVlRGVmYXVsdHMoY29lcmNlLCBjb250b3Vycykge1xuICAgIHZhciB6dmFsdWU7XG5cbiAgICBpZihDT01QQVJJU09OX09QUzIuaW5kZXhPZihjb250b3Vycy5vcGVyYXRpb24pID09PSAtMSkge1xuICAgICAgICAvLyBSZXF1aXJlcyBhbiBhcnJheSBvZiB0d28gbnVtYmVyczpcbiAgICAgICAgY29lcmNlKCdjb250b3Vycy52YWx1ZScsIFswLCAxXSk7XG5cbiAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkoY29udG91cnMudmFsdWUpKSB7XG4gICAgICAgICAgICBpZihpc051bWVyaWMoY29udG91cnMudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgenZhbHVlID0gcGFyc2VGbG9hdChjb250b3Vycy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29udG91cnMudmFsdWUgPSBbenZhbHVlLCB6dmFsdWUgKyAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKGNvbnRvdXJzLnZhbHVlLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIGNvbnRvdXJzLnZhbHVlID0gY29udG91cnMudmFsdWUuc2xpY2UoMik7XG4gICAgICAgIH0gZWxzZSBpZihjb250b3Vycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnRvdXJzLnZhbHVlID0gWzAsIDFdO1xuICAgICAgICB9IGVsc2UgaWYoY29udG91cnMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgenZhbHVlID0gcGFyc2VGbG9hdChjb250b3Vycy52YWx1ZVswXSk7XG4gICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IFt6dmFsdWUsIHp2YWx1ZSArIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udG91cnMudmFsdWUgPSBbXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChjb250b3Vycy52YWx1ZVswXSksXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChjb250b3Vycy52YWx1ZVsxXSlcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXF1aXJlcyBhIHNpbmdsZSBzY2FsYXI6XG4gICAgICAgIGNvZXJjZSgnY29udG91cnMudmFsdWUnLCAwKTtcblxuICAgICAgICBpZighaXNOdW1lcmljKGNvbnRvdXJzLnZhbHVlKSkge1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShjb250b3Vycy52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IHBhcnNlRmxvYXQoY29udG91cnMudmFsdWVbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250b3Vycy52YWx1ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoZWF0bWFwQXR0cnMgPSByZXF1aXJlKCcuLi9oZWF0bWFwL2F0dHJpYnV0ZXMnKTtcbnZhciBjb250b3VyQXR0cnMgPSByZXF1aXJlKCcuLi9jb250b3VyL2F0dHJpYnV0ZXMnKTtcbnZhciBjb2xvclNjYWxlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvYXR0cmlidXRlcycpO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG52YXIgY29udG91ckNvbnRvdXJBdHRycyA9IGNvbnRvdXJBdHRycy5jb250b3VycztcblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmRGbGF0KHtcbiAgICBjYXJwZXQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgYGNhcnBldGAgb2YgdGhlIGNhcnBldCBheGVzIG9uIHdoaWNoIHRoaXMgY29udG91ciB0cmFjZSBsaWVzJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgejogaGVhdG1hcEF0dHJzLnosXG4gICAgYTogaGVhdG1hcEF0dHJzLngsXG4gICAgYTA6IGhlYXRtYXBBdHRycy54MCxcbiAgICBkYTogaGVhdG1hcEF0dHJzLmR4LFxuICAgIGI6IGhlYXRtYXBBdHRycy55LFxuICAgIGIwOiBoZWF0bWFwQXR0cnMueTAsXG4gICAgZGI6IGhlYXRtYXBBdHRycy5keSxcbiAgICB0ZXh0OiBoZWF0bWFwQXR0cnMudGV4dCxcbiAgICBob3ZlcnRleHQ6IGhlYXRtYXBBdHRycy5ob3ZlcnRleHQsXG4gICAgdHJhbnNwb3NlOiBoZWF0bWFwQXR0cnMudHJhbnNwb3NlLFxuICAgIGF0eXBlOiBoZWF0bWFwQXR0cnMueHR5cGUsXG4gICAgYnR5cGU6IGhlYXRtYXBBdHRycy55dHlwZSxcblxuICAgIGZpbGxjb2xvcjogY29udG91ckF0dHJzLmZpbGxjb2xvcixcblxuICAgIGF1dG9jb250b3VyOiBjb250b3VyQXR0cnMuYXV0b2NvbnRvdXIsXG4gICAgbmNvbnRvdXJzOiBjb250b3VyQXR0cnMubmNvbnRvdXJzLFxuXG4gICAgY29udG91cnM6IHtcbiAgICAgICAgdHlwZTogY29udG91ckNvbnRvdXJBdHRycy50eXBlLFxuICAgICAgICBzdGFydDogY29udG91ckNvbnRvdXJBdHRycy5zdGFydCxcbiAgICAgICAgZW5kOiBjb250b3VyQ29udG91ckF0dHJzLmVuZCxcbiAgICAgICAgc2l6ZTogY29udG91ckNvbnRvdXJBdHRycy5zaXplLFxuICAgICAgICBjb2xvcmluZzoge1xuICAgICAgICAgICAgLy8gZnJvbSBjb250b3VyQXR0cnMuY29udG91cnMuY29sb3JpbmcgYnV0IG5vICdoZWF0bWFwJyBvcHRpb25cbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogWydmaWxsJywgJ2xpbmVzJywgJ25vbmUnXSxcbiAgICAgICAgICAgIGRmbHQ6ICdmaWxsJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGV0ZXJtaW5lcyB0aGUgY29sb3JpbmcgbWV0aG9kIHNob3dpbmcgdGhlIGNvbnRvdXIgdmFsdWVzLicsXG4gICAgICAgICAgICAgICAgJ0lmICpmaWxsKiwgY29sb3JpbmcgaXMgZG9uZSBldmVubHkgYmV0d2VlbiBlYWNoIGNvbnRvdXIgbGV2ZWwnLFxuICAgICAgICAgICAgICAgICdJZiAqbGluZXMqLCBjb2xvcmluZyBpcyBkb25lIG9uIHRoZSBjb250b3VyIGxpbmVzLicsXG4gICAgICAgICAgICAgICAgJ0lmICpub25lKiwgbm8gY29sb3JpbmcgaXMgYXBwbGllZCBvbiB0aGlzIHRyYWNlLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHNob3dsaW5lczogY29udG91ckNvbnRvdXJBdHRycy5zaG93bGluZXMsXG4gICAgICAgIHNob3dsYWJlbHM6IGNvbnRvdXJDb250b3VyQXR0cnMuc2hvd2xhYmVscyxcbiAgICAgICAgbGFiZWxmb250OiBjb250b3VyQ29udG91ckF0dHJzLmxhYmVsZm9udCxcbiAgICAgICAgbGFiZWxmb3JtYXQ6IGNvbnRvdXJDb250b3VyQXR0cnMubGFiZWxmb3JtYXQsXG4gICAgICAgIG9wZXJhdGlvbjogY29udG91ckNvbnRvdXJBdHRycy5vcGVyYXRpb24sXG4gICAgICAgIHZhbHVlOiBjb250b3VyQ29udG91ckF0dHJzLnZhbHVlLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBpbXBsaWVkRWRpdHM6IHsnYXV0b2NvbnRvdXInOiBmYWxzZX1cbiAgICB9LFxuXG4gICAgbGluZToge1xuICAgICAgICBjb2xvcjogY29udG91ckF0dHJzLmxpbmUuY29sb3IsXG4gICAgICAgIHdpZHRoOiBjb250b3VyQXR0cnMubGluZS53aWR0aCxcbiAgICAgICAgZGFzaDogY29udG91ckF0dHJzLmxpbmUuZGFzaCxcbiAgICAgICAgc21vb3RoaW5nOiBjb250b3VyQXR0cnMubGluZS5zbW9vdGhpbmcsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICB9LFxuXG4gICAgdHJhbnNmb3JtczogdW5kZWZpbmVkXG59LFxuXG4gICAgY29sb3JTY2FsZUF0dHJzKCcnLCB7XG4gICAgICAgIGNMZXR0ZXI6ICd6JyxcbiAgICAgICAgYXV0b0NvbG9yRGZsdDogZmFsc2VcbiAgICB9KVxuKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNvbG9yc2NhbGVDYWxjID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2NhbGMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxudmFyIGNvbnZlcnRDb2x1bW5EYXRhID0gcmVxdWlyZSgnLi4vaGVhdG1hcC9jb252ZXJ0X2NvbHVtbl94eXonKTtcbnZhciBjbGVhbjJkQXJyYXkgPSByZXF1aXJlKCcuLi9oZWF0bWFwL2NsZWFuXzJkX2FycmF5Jyk7XG52YXIgaW50ZXJwMmQgPSByZXF1aXJlKCcuLi9oZWF0bWFwL2ludGVycDJkJyk7XG52YXIgZmluZEVtcHRpZXMgPSByZXF1aXJlKCcuLi9oZWF0bWFwL2ZpbmRfZW1wdGllcycpO1xudmFyIG1ha2VCb3VuZEFycmF5ID0gcmVxdWlyZSgnLi4vaGVhdG1hcC9tYWtlX2JvdW5kX2FycmF5Jyk7XG52YXIgc3VwcGx5RGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG52YXIgbG9va3VwQ2FycGV0ID0gcmVxdWlyZSgnLi4vY2FycGV0L2xvb2t1cF9jYXJwZXRpZCcpO1xudmFyIHNldENvbnRvdXJzID0gcmVxdWlyZSgnLi4vY29udG91ci9zZXRfY29udG91cnMnKTtcblxuLy8gbW9zdCBpcyB0aGUgc2FtZSBhcyBoZWF0bWFwIGNhbGMsIHRoZW4gYWRqdXN0IGl0XG4vLyB0aG91Z2ggYSBmZXcgdGhpbmdzIGluc2lkZSBoZWF0bWFwIGNhbGMgc3RpbGwgbG9vayBmb3Jcbi8vIGNvbnRvdXIgbWFwcywgYmVjYXVzZSB0aGUgbWFrZUJvdW5kQXJyYXkgY2FsbHMgYXJlIHRvbyBlbnRhbmdsZWRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgY2FycGV0ID0gdHJhY2UuX2NhcnBldFRyYWNlID0gbG9va3VwQ2FycGV0KGdkLCB0cmFjZSk7XG4gICAgaWYoIWNhcnBldCB8fCAhY2FycGV0LnZpc2libGUgfHwgY2FycGV0LnZpc2libGUgPT09ICdsZWdlbmRvbmx5JykgcmV0dXJuO1xuXG4gICAgaWYoIXRyYWNlLmEgfHwgIXRyYWNlLmIpIHtcbiAgICAgICAgLy8gTG9vayB1cCB0aGUgb3JpZ2luYWwgaW5jb21pbmcgY2FycGV0IGRhdGE6XG4gICAgICAgIHZhciBjYXJwZXRkYXRhID0gZ2QuZGF0YVtjYXJwZXQuaW5kZXhdO1xuXG4gICAgICAgIC8vIExvb2sgdXAgdGhlIGluY29taW5nIHRyYWNlIGRhdGEsICpleGNlcHQqIHBlcmZvcm0gYSBzaGFsbG93XG4gICAgICAgIC8vIGNvcHkgc28gdGhhdCB3ZSdyZSBub3QgYWN0dWFsbHkgbW9kaWZ5aW5nIGl0IHdoZW4gd2UgdXNlIGl0XG4gICAgICAgIC8vIHRvIHN1cHBseSBkZWZhdWx0czpcbiAgICAgICAgdmFyIHRyYWNlZGF0YSA9IGdkLmRhdGFbdHJhY2UuaW5kZXhdO1xuICAgICAgICAvLyB2YXIgdHJhY2VkYXRhID0gZXh0ZW5kRmxhdCh7fSwgZ2QuZGF0YVt0cmFjZS5pbmRleF0pO1xuXG4gICAgICAgIC8vIElmIHRoZSBkYXRhIGlzIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgaWYoIXRyYWNlZGF0YS5hKSB0cmFjZWRhdGEuYSA9IGNhcnBldGRhdGEuYTtcbiAgICAgICAgaWYoIXRyYWNlZGF0YS5iKSB0cmFjZWRhdGEuYiA9IGNhcnBldGRhdGEuYjtcblxuICAgICAgICBzdXBwbHlEZWZhdWx0cyh0cmFjZWRhdGEsIHRyYWNlLCB0cmFjZS5fZGVmYXVsdENvbG9yLCBnZC5fZnVsbExheW91dCk7XG4gICAgfVxuXG4gICAgdmFyIGNkID0gaGVhdG1hcHBpc2hDYWxjKGdkLCB0cmFjZSk7XG4gICAgc2V0Q29udG91cnModHJhY2UsIHRyYWNlLl96KTtcblxuICAgIHJldHVybiBjZDtcbn07XG5cbmZ1bmN0aW9uIGhlYXRtYXBwaXNoQ2FsYyhnZCwgdHJhY2UpIHtcbiAgICAvLyBwcmVwYXJlIHRoZSByYXcgZGF0YVxuICAgIC8vIHJ1biBtYWtlQ2FsY2RhdGEgb24geCBhbmQgeSBldmVuIGZvciBoZWF0bWFwcywgaW4gY2FzZSBvZiBjYXRlZ29yeSBtYXBwaW5nc1xuICAgIHZhciBjYXJwZXQgPSB0cmFjZS5fY2FycGV0VHJhY2U7XG4gICAgdmFyIGFheCA9IGNhcnBldC5hYXhpcztcbiAgICB2YXIgYmF4ID0gY2FycGV0LmJheGlzO1xuICAgIHZhciBhLFxuICAgICAgICBhMCxcbiAgICAgICAgZGEsXG4gICAgICAgIGIsXG4gICAgICAgIGIwLFxuICAgICAgICBkYixcbiAgICAgICAgejtcblxuICAgIC8vIGNhbmNlbCBtaW5pbXVtIHRpY2sgc3BhY2luZ3MgKG9ubHkgYXBwbGllcyB0byBiYXJzIGFuZCBib3hlcylcbiAgICBhYXguX21pbkR0aWNrID0gMDtcbiAgICBiYXguX21pbkR0aWNrID0gMDtcblxuICAgIGlmKExpYi5pc0FycmF5MUQodHJhY2UueikpIGNvbnZlcnRDb2x1bW5EYXRhKHRyYWNlLCBhYXgsIGJheCwgJ2EnLCAnYicsIFsneiddKTtcbiAgICBhID0gdHJhY2UuX2EgPSB0cmFjZS5fYSB8fCB0cmFjZS5hO1xuICAgIGIgPSB0cmFjZS5fYiA9IHRyYWNlLl9iIHx8IHRyYWNlLmI7XG5cbiAgICBhID0gYSA/IGFheC5tYWtlQ2FsY2RhdGEodHJhY2UsICdfYScpIDogW107XG4gICAgYiA9IGIgPyBiYXgubWFrZUNhbGNkYXRhKHRyYWNlLCAnX2InKSA6IFtdO1xuICAgIGEwID0gdHJhY2UuYTAgfHwgMDtcbiAgICBkYSA9IHRyYWNlLmRhIHx8IDE7XG4gICAgYjAgPSB0cmFjZS5iMCB8fCAwO1xuICAgIGRiID0gdHJhY2UuZGIgfHwgMTtcblxuICAgIHogPSB0cmFjZS5feiA9IGNsZWFuMmRBcnJheSh0cmFjZS5feiB8fCB0cmFjZS56LCB0cmFjZS50cmFuc3Bvc2UpO1xuXG4gICAgdHJhY2UuX2VtcHR5cG9pbnRzID0gZmluZEVtcHRpZXMoeik7XG4gICAgaW50ZXJwMmQoeiwgdHJhY2UuX2VtcHR5cG9pbnRzKTtcblxuICAgIC8vIGNyZWF0ZSBhcnJheXMgb2YgYnJpY2sgYm91bmRhcmllcywgdG8gYmUgdXNlZCBieSBhdXRvcmFuZ2UgYW5kIGhlYXRtYXAucGxvdFxuICAgIHZhciB4bGVuID0gTGliLm1heFJvd0xlbmd0aCh6KTtcbiAgICB2YXIgeEluID0gdHJhY2UueHR5cGUgPT09ICdzY2FsZWQnID8gJycgOiBhO1xuICAgIHZhciB4QXJyYXkgPSBtYWtlQm91bmRBcnJheSh0cmFjZSwgeEluLCBhMCwgZGEsIHhsZW4sIGFheCk7XG4gICAgdmFyIHlJbiA9IHRyYWNlLnl0eXBlID09PSAnc2NhbGVkJyA/ICcnIDogYjtcbiAgICB2YXIgeUFycmF5ID0gbWFrZUJvdW5kQXJyYXkodHJhY2UsIHlJbiwgYjAsIGRiLCB6Lmxlbmd0aCwgYmF4KTtcblxuICAgIHZhciBjZDAgPSB7XG4gICAgICAgIGE6IHhBcnJheSxcbiAgICAgICAgYjogeUFycmF5LFxuICAgICAgICB6OiB6LFxuICAgIH07XG5cbiAgICBpZih0cmFjZS5jb250b3Vycy50eXBlID09PSAnbGV2ZWxzJyAmJiB0cmFjZS5jb250b3Vycy5jb2xvcmluZyAhPT0gJ25vbmUnKSB7XG4gICAgICAgIC8vIGF1dG8teiBhbmQgYXV0b2NvbG9yc2NhbGUgaWYgYXBwbGljYWJsZVxuICAgICAgICBjb2xvcnNjYWxlQ2FsYyhnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgIHZhbHM6IHosXG4gICAgICAgICAgICBjb250YWluZXJTdHI6ICcnLFxuICAgICAgICAgICAgY0xldHRlcjogJ3onXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBbY2QwXTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBoYW5kbGVYWVpEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2hlYXRtYXAveHl6X2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xudmFyIGhhbmRsZUNvbnN0cmFpbnREZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2NvbnRvdXIvY29uc3RyYWludF9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUNvbnRvdXJzRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9jb250b3VyL2NvbnRvdXJzX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlU3R5bGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2NvbnRvdXIvc3R5bGVfZGVmYXVsdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29lcmNlMihhdHRyKSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlMih0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0cik7XG4gICAgfVxuXG4gICAgY29lcmNlKCdjYXJwZXQnKTtcblxuICAgIC8vIElmIGVpdGhlciBhIG9yIGIgaXMgbm90IHByZXNlbnQsIHRoZW4gaXQncyBub3QgYSB2YWxpZCB0cmFjZSAqdW5sZXNzKiB0aGUgY2FycGV0XG4gICAgLy8gYXhpcyBoYXMgdGhlIGEgb3IgYiB2YWx1ZXMgd2UncmUgbG9va2luZyBmb3IuIFNvIGlmIHRoZXNlIGFyZSBub3QgZm91bmQsIGp1c3QgZGVmZXJcbiAgICAvLyB0aGF0IGRlY2lzaW9uIHVudGlsIHRoZSBjYWxjIHN0ZXAuXG4gICAgLy9cbiAgICAvLyBOQjogdGhlIGNhbGMgc3RlcCB3aWxsIG1vZGlmeSB0aGUgb3JpZ2luYWwgZGF0YSBpbnB1dCBieSBhc3NpZ25pbmcgd2hpY2hldmVyIG9mXG4gICAgLy8gYSBvciBiIGFyZSBtaXNzaW5nLiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHBhbm5pbmcgZ29lcyByaWdodCBmcm9tIHN1cHBseURlZmF1bHRzXG4gICAgLy8gdG8gcGxvdCAoc2tpcHBpbmcgY2FsYykuIFRoYXQgbWVhbnMgb24gc3Vic2VxdWVudCB1cGRhdGVzLCB0aGlzICp3aWxsKiBuZWVkIHRvIGJlXG4gICAgLy8gYWJsZSB0byBmaW5kIGEgYW5kIGIuXG4gICAgLy9cbiAgICAvLyBUaGUgbG9uZy10ZXJtIHByb3BlciBmaXggaXMgdGhhdCB0aGlzIHNob3VsZCBwZXJoYXBzIHVzZSB1bmRlcnNjb3JlZCBhdHRyaWJ1dGVzIHRvXG4gICAgLy8gYXQgbGVhc3QgbW9kaWZ5IHRoZSB1c2VyIGlucHV0IHRvIGEgc2xpZ2h0bHkgbGVzc2VyIGV4dGVudC4gRnVsbHkgcmVtb3ZpbmcgdGhlXG4gICAgLy8gaW5wdXQgbXV0YXRpb24gaXMgY2hhbGxlbmdpbmcuIFRoZSB1bmRlcnNjb3JlIGFwcHJvYWNoIGlzIG5vdCBjdXJyZW50bHkgdGFrZW4gc2luY2VcbiAgICAvLyBpdCByZXF1aXJlcyBtb2RpZmljYXRpb24gdG8gYWxsIG9mIHRoZSBmdW5jdGlvbnMgYmVsb3cgdGhhdCBleHBlY3QgdGhlIGNvZXJjZWRcbiAgICAvLyBhdHRyaWJ1dGUgbmFtZSB0byBtYXRjaCB0aGUgcHJvcGVydHkgbmFtZSAtLSBleGNlcHQgJ19hJyAhPT0gJ2EnIHNvIHRoYXQgaXMgbm90XG4gICAgLy8gc3RyYWlnaHRmb3J3YXJkLlxuICAgIGlmKHRyYWNlSW4uYSAmJiB0cmFjZUluLmIpIHtcbiAgICAgICAgdmFyIGxlbiA9IGhhbmRsZVhZWkRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCwgJ2EnLCAnYicpO1xuXG4gICAgICAgIGlmKCFsZW4pIHtcbiAgICAgICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvZXJjZSgndGV4dCcpO1xuICAgICAgICB2YXIgaXNDb25zdHJhaW50ID0gKGNvZXJjZSgnY29udG91cnMudHlwZScpID09PSAnY29uc3RyYWludCcpO1xuXG4gICAgICAgIGlmKGlzQ29uc3RyYWludCkge1xuICAgICAgICAgICAgaGFuZGxlQ29uc3RyYWludERlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGxheW91dCwgZGVmYXVsdENvbG9yLCB7aGFzSG92ZXI6IGZhbHNlfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVDb250b3Vyc0RlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UsIGNvZXJjZTIpO1xuICAgICAgICAgICAgaGFuZGxlU3R5bGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlLCBsYXlvdXQsIHtoYXNIb3ZlcjogZmFsc2V9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYWNlT3V0Ll9kZWZhdWx0Q29sb3IgPSBkZWZhdWx0Q29sb3I7XG4gICAgICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL2NvbnRvdXIvY29sb3JiYXInKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi4vY29udG91ci9zdHlsZScpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnY29udG91cmNhcnBldCcsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbicpLFxuICAgIGNhdGVnb3JpZXM6IFsnY2FydGVzaWFuJywgJ3N2ZycsICdjYXJwZXQnLCAnY29udG91cicsICdzeW1ib2xzJywgJ3Nob3dMZWdlbmQnLCAnaGFzTGluZXMnLCAnY2FycGV0RGVwZW5kZW50JywgJ25vSG92ZXInLCAnbm9Tb3J0aW5nQnlWYWx1ZSddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgaHJOYW1lOiAnY29udG91cl9jYXJwZXQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1Bsb3RzIGNvbnRvdXJzIG9uIGVpdGhlciB0aGUgZmlyc3QgY2FycGV0IGF4aXMgb3IgdGhlJyxcbiAgICAgICAgICAgICdjYXJwZXQgYXhpcyB3aXRoIGEgbWF0Y2hpbmcgYGNhcnBldGAgYXR0cmlidXRlLiBEYXRhIGB6YCcsXG4gICAgICAgICAgICAnaXMgaW50ZXJwcmV0ZWQgYXMgbWF0Y2hpbmcgdGhhdCBvZiB0aGUgY29ycmVzcG9uZGluZyBjYXJwZXQnLFxuICAgICAgICAgICAgJ2F4aXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgbWFwMWRBcnJheSA9IHJlcXVpcmUoJy4uL2NhcnBldC9tYXBfMWRfYXJyYXknKTtcbnZhciBtYWtlcGF0aCA9IHJlcXVpcmUoJy4uL2NhcnBldC9tYWtlcGF0aCcpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcblxudmFyIG1ha2VDcm9zc2luZ3MgPSByZXF1aXJlKCcuLi9jb250b3VyL21ha2VfY3Jvc3NpbmdzJyk7XG52YXIgZmluZEFsbFBhdGhzID0gcmVxdWlyZSgnLi4vY29udG91ci9maW5kX2FsbF9wYXRocycpO1xudmFyIGNvbnRvdXJQbG90ID0gcmVxdWlyZSgnLi4vY29udG91ci9wbG90Jyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29udG91ci9jb25zdGFudHMnKTtcbnZhciBjb252ZXJ0VG9Db25zdHJhaW50cyA9IHJlcXVpcmUoJy4uL2NvbnRvdXIvY29udmVydF90b19jb25zdHJhaW50cycpO1xudmFyIGVtcHR5UGF0aGluZm8gPSByZXF1aXJlKCcuLi9jb250b3VyL2VtcHR5X3BhdGhpbmZvJyk7XG52YXIgY2xvc2VCb3VuZGFyaWVzID0gcmVxdWlyZSgnLi4vY29udG91ci9jbG9zZV9ib3VuZGFyaWVzJyk7XG52YXIgbG9va3VwQ2FycGV0ID0gcmVxdWlyZSgnLi4vY2FycGV0L2xvb2t1cF9jYXJwZXRpZCcpO1xudmFyIGF4aXNBbGlnbmVkTGluZSA9IHJlcXVpcmUoJy4uL2NhcnBldC9heGlzX2FsaWduZWRfbGluZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ2QsIHBsb3RpbmZvLCBjZGNvbnRvdXJzLCBjb250b3VyY2FycGV0TGF5ZXIpIHtcbiAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBwbG90aW5mby55YXhpcztcblxuICAgIExpYi5tYWtlVHJhY2VHcm91cHMoY29udG91cmNhcnBldExheWVyLCBjZGNvbnRvdXJzLCAnY29udG91cicpLmVhY2goZnVuY3Rpb24oY2QpIHtcbiAgICAgICAgdmFyIHBsb3RHcm91cCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGNkMCA9IGNkWzBdO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG5cbiAgICAgICAgdmFyIGNhcnBldCA9IHRyYWNlLl9jYXJwZXRUcmFjZSA9IGxvb2t1cENhcnBldChnZCwgdHJhY2UpO1xuICAgICAgICB2YXIgY2FycGV0Y2QgPSBnZC5jYWxjZGF0YVtjYXJwZXQuaW5kZXhdWzBdO1xuXG4gICAgICAgIGlmKCFjYXJwZXQudmlzaWJsZSB8fCBjYXJwZXQudmlzaWJsZSA9PT0gJ2xlZ2VuZG9ubHknKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGEgPSBjZDAuYTtcbiAgICAgICAgdmFyIGIgPSBjZDAuYjtcbiAgICAgICAgdmFyIGNvbnRvdXJzID0gdHJhY2UuY29udG91cnM7XG4gICAgICAgIHZhciBwYXRoaW5mbyA9IGVtcHR5UGF0aGluZm8oY29udG91cnMsIHBsb3RpbmZvLCBjZDApO1xuICAgICAgICB2YXIgaXNDb25zdHJhaW50ID0gY29udG91cnMudHlwZSA9PT0gJ2NvbnN0cmFpbnQnO1xuICAgICAgICB2YXIgb3BlcmF0aW9uID0gY29udG91cnMuX29wZXJhdGlvbjtcbiAgICAgICAgdmFyIGNvbG9yaW5nID0gaXNDb25zdHJhaW50ID8gKG9wZXJhdGlvbiA9PT0gJz0nID8gJ2xpbmVzJyA6ICdmaWxsJykgOiBjb250b3Vycy5jb2xvcmluZztcblxuICAgICAgICAvLyBNYXAgW2EsIGJdIChkYXRhKSAtLT4gW2ksIGpdIChwaXhlbHMpXG4gICAgICAgIGZ1bmN0aW9uIGFiMnAoYWIpIHtcbiAgICAgICAgICAgIHZhciBwdCA9IGNhcnBldC5hYjJ4eShhYlswXSwgYWJbMV0sIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIFt4YS5jMnAocHRbMF0pLCB5YS5jMnAocHRbMV0pXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmluZSB0aGUgcGVyaW1ldGVyIGluIGEvYiBjb29yZGluYXRlczpcbiAgICAgICAgdmFyIHBlcmltZXRlciA9IFtcbiAgICAgICAgICAgIFthWzBdLCBiW2IubGVuZ3RoIC0gMV1dLFxuICAgICAgICAgICAgW2FbYS5sZW5ndGggLSAxXSwgYltiLmxlbmd0aCAtIDFdXSxcbiAgICAgICAgICAgIFthW2EubGVuZ3RoIC0gMV0sIGJbMF1dLFxuICAgICAgICAgICAgW2FbMF0sIGJbMF1dXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gRXh0cmFjdCB0aGUgY29udG91ciBsZXZlbHM6XG4gICAgICAgIG1ha2VDcm9zc2luZ3MocGF0aGluZm8pO1xuICAgICAgICB2YXIgYXRvbCA9IChhW2EubGVuZ3RoIC0gMV0gLSBhWzBdKSAqIDFlLTg7XG4gICAgICAgIHZhciBidG9sID0gKGJbYi5sZW5ndGggLSAxXSAtIGJbMF0pICogMWUtODtcbiAgICAgICAgZmluZEFsbFBhdGhzKHBhdGhpbmZvLCBhdG9sLCBidG9sKTtcblxuICAgICAgICAvLyBDb25zdHJhaW50cyBtaWdodCBuZWVkIHRvIGJlIGRyYXcgaW52ZXJ0ZWQsIHdoaWNoIGlzIG5vdCBzb21ldGhpbmcgY29udG91cnNcbiAgICAgICAgLy8gaGFuZGxlIGJ5IGRlZmF1bHQgc2luY2UgdGhleSdyZSBhc3N1bWVkIGZ1bGx5IG9wYXF1ZSBzbyB0aGF0IHRoZXkgY2FuIGJlXG4gICAgICAgIC8vIGRyYXduIG92ZXJsYXBwaW5nLiBUaGlzIGZ1bmN0aW9uIGZsaXBzIHRoZSBwYXRocyBhcyBuZWNlc3Nhcnkgc28gdGhhdCB0aGV5J3JlXG4gICAgICAgIC8vIGRyYXduIGNvcnJlY3RseS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVE9ETzogUGVyaGFwcyB0aGlzIHNob3VsZCBiZSBnZW5lcmFsaXplZCBhbmQgKmFsbCogcGF0aHMgc2hvdWxkIGJlIGRyYXduIGFzXG4gICAgICAgIC8vIGNsb3NlZCByZWdpb25zIHNvIHRoYXQgdHJhbnNsdWNlbnQgY29udG91ciBsZXZlbHMgd291bGQgYmUgdmFsaWQuXG4gICAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9wbG90bHkuanMvaXNzdWVzLzEzNTZcbiAgICAgICAgdmFyIGZpbGxQYXRoaW5mbyA9IHBhdGhpbmZvO1xuICAgICAgICBpZihjb250b3Vycy50eXBlID09PSAnY29uc3RyYWludCcpIHtcbiAgICAgICAgICAgIGZpbGxQYXRoaW5mbyA9IGNvbnZlcnRUb0NvbnN0cmFpbnRzKHBhdGhpbmZvLCBvcGVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFwIHRoZSBwYXRocyBpbiBhL2IgY29vcmRpbmF0ZXMgdG8gcGl4ZWwgY29vcmRpbmF0ZXM6XG4gICAgICAgIG1hcFBhdGhpbmZvKHBhdGhpbmZvLCBhYjJwKTtcblxuICAgICAgICAvLyBkcmF3IGV2ZXJ5dGhpbmdcblxuICAgICAgICAvLyBDb21wdXRlIHRoZSBib3VuZGFyeSBwYXRoXG4gICAgICAgIHZhciBzZWcsIHhwLCB5cCwgaTtcbiAgICAgICAgdmFyIHNlZ3MgPSBbXTtcbiAgICAgICAgZm9yKGkgPSBjYXJwZXRjZC5jbGlwc2VnbWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHNlZyA9IGNhcnBldGNkLmNsaXBzZWdtZW50c1tpXTtcbiAgICAgICAgICAgIHhwID0gbWFwMWRBcnJheShbXSwgc2VnLngsIHhhLmMycCk7XG4gICAgICAgICAgICB5cCA9IG1hcDFkQXJyYXkoW10sIHNlZy55LCB5YS5jMnApO1xuICAgICAgICAgICAgeHAucmV2ZXJzZSgpO1xuICAgICAgICAgICAgeXAucmV2ZXJzZSgpO1xuICAgICAgICAgICAgc2Vncy5wdXNoKG1ha2VwYXRoKHhwLCB5cCwgc2VnLmJpY3ViaWMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBib3VuZGFyeVBhdGggPSAnTScgKyBzZWdzLmpvaW4oJ0wnKSArICdaJztcblxuICAgICAgICAvLyBEcmF3IHRoZSBiYXNlbGluZSBiYWNrZ3JvdW5kIGZpbGwgdGhhdCBmaWxscyBpbiB0aGUgc3BhY2UgYmVoaW5kIGFueSBvdGhlclxuICAgICAgICAvLyBjb250b3VyIGxldmVsczpcbiAgICAgICAgbWFrZUJhY2tncm91bmQocGxvdEdyb3VwLCBjYXJwZXRjZC5jbGlwc2VnbWVudHMsIHhhLCB5YSwgaXNDb25zdHJhaW50LCBjb2xvcmluZyk7XG5cbiAgICAgICAgLy8gRHJhdyB0aGUgc3BlY2lmaWMgY29udG91ciBmaWxscy4gQXMgYSBzaW1wbGlmaWNhdGlvbiwgdGhleSdyZSBhc3N1bWVkIHRvIGJlXG4gICAgICAgIC8vIGZ1bGx5IG9wYXF1ZSBzbyB0aGF0IGl0J3MgZWFzeSB0byBkcmF3IHRoZW0gc2ltcGx5IG92ZXJsYXBwaW5nLiBUaGUgYWx0ZXJuYXRpdmVcbiAgICAgICAgLy8gd291bGQgYmUgdG8gZmxpcCBhZGphY2VudCBwYXRocyBhbmQgZHJhdyBjbG9zZWQgcGF0aHMgZm9yIGVhY2ggbGV2ZWwgaW5zdGVhZC5cbiAgICAgICAgbWFrZUZpbGxzKHRyYWNlLCBwbG90R3JvdXAsIHhhLCB5YSwgZmlsbFBhdGhpbmZvLCBwZXJpbWV0ZXIsIGFiMnAsIGNhcnBldCwgY2FycGV0Y2QsIGNvbG9yaW5nLCBib3VuZGFyeVBhdGgpO1xuXG4gICAgICAgIC8vIERyYXcgY29udG91ciBsaW5lczpcbiAgICAgICAgbWFrZUxpbmVzQW5kTGFiZWxzKHBsb3RHcm91cCwgcGF0aGluZm8sIGdkLCBjZDAsIGNvbnRvdXJzLCBwbG90aW5mbywgY2FycGV0KTtcblxuICAgICAgICAvLyBDbGlwIHRoZSBib3VuZGFyeSBvZiB0aGUgcGxvdFxuICAgICAgICBEcmF3aW5nLnNldENsaXBVcmwocGxvdEdyb3VwLCBjYXJwZXQuX2NsaXBQYXRoSWQsIGdkKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIG1hcFBhdGhpbmZvKHBhdGhpbmZvLCBtYXApIHtcbiAgICB2YXIgaSwgaiwgaywgcGksIHBlZGdlcGF0aHMsIHBwYXRocywgcGVkZ2VwYXRoLCBwcGF0aCwgcGF0aDtcblxuICAgIGZvcihpID0gMDsgaSA8IHBhdGhpbmZvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBpID0gcGF0aGluZm9baV07XG4gICAgICAgIHBlZGdlcGF0aHMgPSBwaS5wZWRnZXBhdGhzID0gW107XG4gICAgICAgIHBwYXRocyA9IHBpLnBwYXRocyA9IFtdO1xuICAgICAgICBmb3IoaiA9IDA7IGogPCBwaS5lZGdlcGF0aHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHBhdGggPSBwaS5lZGdlcGF0aHNbal07XG4gICAgICAgICAgICBwZWRnZXBhdGggPSBbXTtcbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IHBhdGgubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBwZWRnZXBhdGhba10gPSBtYXAocGF0aFtrXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwZWRnZXBhdGhzLnB1c2gocGVkZ2VwYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IoaiA9IDA7IGogPCBwaS5wYXRocy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcGF0aCA9IHBpLnBhdGhzW2pdO1xuICAgICAgICAgICAgcHBhdGggPSBbXTtcbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IHBhdGgubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBwcGF0aFtrXSA9IG1hcChwYXRoW2tdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBwYXRocy5wdXNoKHBwYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFrZUxpbmVzQW5kTGFiZWxzKHBsb3Rncm91cCwgcGF0aGluZm8sIGdkLCBjZDAsIGNvbnRvdXJzLCBwbG90aW5mbywgY2FycGV0KSB7XG4gICAgdmFyIGxpbmVDb250YWluZXIgPSBMaWIuZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ2cnLCAnY29udG91cmxpbmVzJyk7XG4gICAgdmFyIHNob3dMaW5lcyA9IGNvbnRvdXJzLnNob3dsaW5lcyAhPT0gZmFsc2U7XG4gICAgdmFyIHNob3dMYWJlbHMgPSBjb250b3Vycy5zaG93bGFiZWxzO1xuICAgIHZhciBjbGlwTGluZXNGb3JMYWJlbHMgPSBzaG93TGluZXMgJiYgc2hvd0xhYmVscztcblxuICAgIC8vIEV2ZW4gaWYgd2UncmUgbm90IGdvaW5nIHRvIHNob3cgbGluZXMsIHdlIG5lZWQgdG8gY3JlYXRlIHRoZW1cbiAgICAvLyBpZiB3ZSdyZSBzaG93aW5nIGxhYmVscywgYmVjYXVzZSB0aGUgZmlsbCBwYXRocyBpbmNsdWRlIHRoZSBwZXJpbWV0ZXJcbiAgICAvLyBzbyBjYW4ndCBiZSB1c2VkIHRvIHBvc2l0aW9uIHRoZSBsYWJlbHMgY29ycmVjdGx5LlxuICAgIC8vIEluIHRoaXMgY2FzZSB3ZSdsbCByZW1vdmUgdGhlIGxpbmVzIGFmdGVyIG1ha2luZyB0aGUgbGFiZWxzLlxuICAgIHZhciBsaW5lZ3JvdXAgPSBjb250b3VyUGxvdC5jcmVhdGVMaW5lcyhsaW5lQ29udGFpbmVyLCBzaG93TGluZXMgfHwgc2hvd0xhYmVscywgcGF0aGluZm8pO1xuXG4gICAgdmFyIGxpbmVDbGlwID0gY29udG91clBsb3QuY3JlYXRlTGluZUNsaXAobGluZUNvbnRhaW5lciwgY2xpcExpbmVzRm9yTGFiZWxzLCBnZCwgY2QwLnRyYWNlLnVpZCk7XG5cbiAgICB2YXIgbGFiZWxHcm91cCA9IHBsb3Rncm91cC5zZWxlY3RBbGwoJ2cuY29udG91cmxhYmVscycpXG4gICAgICAgIC5kYXRhKHNob3dMYWJlbHMgPyBbMF0gOiBbXSk7XG5cbiAgICBsYWJlbEdyb3VwLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIGxhYmVsR3JvdXAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZCgnY29udG91cmxhYmVscycsIHRydWUpO1xuXG4gICAgaWYoc2hvd0xhYmVscykge1xuICAgICAgICB2YXIgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICAgICAgdmFyIHlhID0gcGxvdGluZm8ueWF4aXM7XG4gICAgICAgIHZhciB4TGVuID0geGEuX2xlbmd0aDtcbiAgICAgICAgdmFyIHlMZW4gPSB5YS5fbGVuZ3RoO1xuICAgICAgICAvLyBmb3Igc2ltcGxpY2l0eSB1c2UgdGhlIHh5IGJveCBmb3IgbGFiZWwgY2xpcHBpbmcgb3V0bGluZS5cbiAgICAgICAgdmFyIGxhYmVsQ2xpcFBhdGhEYXRhID0gW1tcbiAgICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICAgIFt4TGVuLCAwXSxcbiAgICAgICAgICAgIFt4TGVuLCB5TGVuXSxcbiAgICAgICAgICAgIFswLCB5TGVuXVxuICAgICAgICBdXTtcblxuXG4gICAgICAgIHZhciBsYWJlbERhdGEgPSBbXTtcblxuICAgICAgICAvLyBpbnZhbGlkYXRlIHRoZSBnZXRUZXh0TG9jYXRpb24gY2FjaGUgaW4gY2FzZSBwYXRocyBjaGFuZ2VkXG4gICAgICAgIExpYi5jbGVhckxvY2F0aW9uQ2FjaGUoKTtcblxuICAgICAgICB2YXIgY29udG91ckZvcm1hdCA9IGNvbnRvdXJQbG90LmxhYmVsRm9ybWF0dGVyKGdkLCBjZDApO1xuXG4gICAgICAgIHZhciBkdW1teVRleHQgPSBEcmF3aW5nLnRlc3Rlci5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtbm90ZXgnLCAxKVxuICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5mb250LCBjb250b3Vycy5sYWJlbGZvbnQpO1xuXG4gICAgICAgIC8vIHVzZSBgYm91bmRzYCBvbmx5IHRvIGtlZXAgbGFiZWxzIGF3YXkgZnJvbSB0aGUgeC95IGJvdW5kYXJpZXNcbiAgICAgICAgLy8gYGNvbnN0cmFpblRvQ2FycGV0YCBiZWxvdyBlbnN1cmVzIGxhYmVscyBkb24ndCBnbyBvZmYgdGhlXG4gICAgICAgIC8vIGNhcnBldCBlZGdlc1xuICAgICAgICB2YXIgYm91bmRzID0ge1xuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHJpZ2h0OiB4TGVuLFxuICAgICAgICAgICAgY2VudGVyOiB4TGVuIC8gMixcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGJvdHRvbTogeUxlbixcbiAgICAgICAgICAgIG1pZGRsZTogeUxlbiAvIDJcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcGxvdERpYWdvbmFsID0gTWF0aC5zcXJ0KHhMZW4gKiB4TGVuICsgeUxlbiAqIHlMZW4pO1xuXG4gICAgICAgIC8vIHRoZSBwYXRoIGxlbmd0aCB0byB1c2UgdG8gc2NhbGUgdGhlIG51bWJlciBvZiBsYWJlbHMgdG8gZHJhdzpcbiAgICAgICAgdmFyIG5vcm1MZW5ndGggPSBjb25zdGFudHMuTEFCRUxESVNUQU5DRSAqIHBsb3REaWFnb25hbCAvXG4gICAgICAgICAgICBNYXRoLm1heCgxLCBwYXRoaW5mby5sZW5ndGggLyBjb25zdGFudHMuTEFCRUxJTkNSRUFTRSk7XG5cbiAgICAgICAgbGluZWdyb3VwLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHRleHRPcHRzID0gY29udG91clBsb3QuY2FsY1RleHRPcHRzKGQubGV2ZWwsIGNvbnRvdXJGb3JtYXQsIGR1bW15VGV4dCwgZ2QpO1xuXG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCdwYXRoJykuZWFjaChmdW5jdGlvbihwYXRoRGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgcGF0aEJvdW5kcyA9IExpYi5nZXRWaXNpYmxlU2VnbWVudChwYXRoLCBib3VuZHMsIHRleHRPcHRzLmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgICAgIGlmKCFwYXRoQm91bmRzKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBjb25zdHJhaW5Ub0NhcnBldChwYXRoLCBwYXRoRGF0YSwgZCwgcGF0aEJvdW5kcywgY2FycGV0LCB0ZXh0T3B0cy5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgaWYocGF0aEJvdW5kcy5sZW4gPCAodGV4dE9wdHMud2lkdGggKyB0ZXh0T3B0cy5oZWlnaHQpICogY29uc3RhbnRzLkxBQkVMTUlOKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB2YXIgbWF4TGFiZWxzID0gTWF0aC5taW4oTWF0aC5jZWlsKHBhdGhCb3VuZHMubGVuIC8gbm9ybUxlbmd0aCksXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0YW50cy5MQUJFTE1BWCk7XG5cbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbWF4TGFiZWxzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvYyA9IGNvbnRvdXJQbG90LmZpbmRCZXN0VGV4dExvY2F0aW9uKHBhdGgsIHBhdGhCb3VuZHMsIHRleHRPcHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxEYXRhLCBib3VuZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCFsb2MpIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRvdXJQbG90LmFkZExhYmVsRGF0YShsb2MsIHRleHRPcHRzLCBsYWJlbERhdGEsIGxhYmVsQ2xpcFBhdGhEYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZHVtbXlUZXh0LnJlbW92ZSgpO1xuXG4gICAgICAgIGNvbnRvdXJQbG90LmRyYXdMYWJlbHMobGFiZWxHcm91cCwgbGFiZWxEYXRhLCBnZCwgbGluZUNsaXAsXG4gICAgICAgICAgICBjbGlwTGluZXNGb3JMYWJlbHMgPyBsYWJlbENsaXBQYXRoRGF0YSA6IG51bGwpO1xuICAgIH1cblxuICAgIGlmKHNob3dMYWJlbHMgJiYgIXNob3dMaW5lcykgbGluZWdyb3VwLnJlbW92ZSgpO1xufVxuXG4vLyBmaWd1cmUgb3V0IGlmIHRoaXMgcGF0aCBnb2VzIG9mZiB0aGUgZWRnZSBvZiB0aGUgY2FycGV0XG4vLyBhbmQgc2hvcnRlbiB0aGUgcGFydCB3ZSBjYWxsIHZpc2libGUgdG8ga2VlcCBsYWJlbHMgYXdheSBmcm9tIHRoZSBlZGdlXG5mdW5jdGlvbiBjb25zdHJhaW5Ub0NhcnBldChwYXRoLCBwYXRoRGF0YSwgbGV2ZWxEYXRhLCBwYXRoQm91bmRzLCBjYXJwZXQsIHRleHRIZWlnaHQpIHtcbiAgICB2YXIgcGF0aEFCRGF0YTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGV2ZWxEYXRhLnBlZGdlcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYocGF0aERhdGEgPT09IGxldmVsRGF0YS5wZWRnZXBhdGhzW2ldKSB7XG4gICAgICAgICAgICBwYXRoQUJEYXRhID0gbGV2ZWxEYXRhLmVkZ2VwYXRoc1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighcGF0aEFCRGF0YSkgcmV0dXJuO1xuXG4gICAgdmFyIGFNaW4gPSBjYXJwZXQuYVswXTtcbiAgICB2YXIgYU1heCA9IGNhcnBldC5hW2NhcnBldC5hLmxlbmd0aCAtIDFdO1xuICAgIHZhciBiTWluID0gY2FycGV0LmJbMF07XG4gICAgdmFyIGJNYXggPSBjYXJwZXQuYltjYXJwZXQuYi5sZW5ndGggLSAxXTtcblxuICAgIGZ1bmN0aW9uIGdldE9mZnNldChhYlB0LCBwYXRoVmVjdG9yKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSAwO1xuICAgICAgICB2YXIgZWRnZVZlY3RvcjtcbiAgICAgICAgdmFyIGRBQiA9IDAuMTtcbiAgICAgICAgaWYoTWF0aC5hYnMoYWJQdFswXSAtIGFNaW4pIDwgZEFCIHx8IE1hdGguYWJzKGFiUHRbMF0gLSBhTWF4KSA8IGRBQikge1xuICAgICAgICAgICAgZWRnZVZlY3RvciA9IG5vcm1hbGl6ZVZlY3RvcihjYXJwZXQuZHh5ZGJfcm91Z2goYWJQdFswXSwgYWJQdFsxXSwgZEFCKSk7XG4gICAgICAgICAgICBvZmZzZXQgPSBNYXRoLm1heChvZmZzZXQsIHRleHRIZWlnaHQgKiB2ZWN0b3JUYW4ocGF0aFZlY3RvciwgZWRnZVZlY3RvcikgLyAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKE1hdGguYWJzKGFiUHRbMV0gLSBiTWluKSA8IGRBQiB8fCBNYXRoLmFicyhhYlB0WzFdIC0gYk1heCkgPCBkQUIpIHtcbiAgICAgICAgICAgIGVkZ2VWZWN0b3IgPSBub3JtYWxpemVWZWN0b3IoY2FycGV0LmR4eWRhX3JvdWdoKGFiUHRbMF0sIGFiUHRbMV0sIGRBQikpO1xuICAgICAgICAgICAgb2Zmc2V0ID0gTWF0aC5tYXgob2Zmc2V0LCB0ZXh0SGVpZ2h0ICogdmVjdG9yVGFuKHBhdGhWZWN0b3IsIGVkZ2VWZWN0b3IpIC8gMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnRWZWN0b3IgPSBnZXRVbml0VmVjdG9yKHBhdGgsIDAsIDEpO1xuICAgIHZhciBlbmRWZWN0b3IgPSBnZXRVbml0VmVjdG9yKHBhdGgsIHBhdGhCb3VuZHMudG90YWwsIHBhdGhCb3VuZHMudG90YWwgLSAxKTtcbiAgICB2YXIgbWluU3RhcnQgPSBnZXRPZmZzZXQocGF0aEFCRGF0YVswXSwgc3RhcnRWZWN0b3IpO1xuICAgIHZhciBtYXhFbmQgPSBwYXRoQm91bmRzLnRvdGFsIC0gZ2V0T2Zmc2V0KHBhdGhBQkRhdGFbcGF0aEFCRGF0YS5sZW5ndGggLSAxXSwgZW5kVmVjdG9yKTtcblxuICAgIGlmKHBhdGhCb3VuZHMubWluIDwgbWluU3RhcnQpIHBhdGhCb3VuZHMubWluID0gbWluU3RhcnQ7XG4gICAgaWYocGF0aEJvdW5kcy5tYXggPiBtYXhFbmQpIHBhdGhCb3VuZHMubWF4ID0gbWF4RW5kO1xuXG4gICAgcGF0aEJvdW5kcy5sZW4gPSBwYXRoQm91bmRzLm1heCAtIHBhdGhCb3VuZHMubWluO1xufVxuXG5mdW5jdGlvbiBnZXRVbml0VmVjdG9yKHBhdGgsIHAwLCBwMSkge1xuICAgIHZhciBwdDAgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgocDApO1xuICAgIHZhciBwdDEgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgocDEpO1xuICAgIHZhciBkeCA9IHB0MS54IC0gcHQwLng7XG4gICAgdmFyIGR5ID0gcHQxLnkgLSBwdDAueTtcbiAgICB2YXIgbGVuID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICByZXR1cm4gW2R4IC8gbGVuLCBkeSAvIGxlbl07XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZlY3Rvcih2KSB7XG4gICAgdmFyIGxlbiA9IE1hdGguc3FydCh2WzBdICogdlswXSArIHZbMV0gKiB2WzFdKTtcbiAgICByZXR1cm4gW3ZbMF0gLyBsZW4sIHZbMV0gLyBsZW5dO1xufVxuXG5mdW5jdGlvbiB2ZWN0b3JUYW4odjAsIHYxKSB7XG4gICAgdmFyIGNvcyA9IE1hdGguYWJzKHYwWzBdICogdjFbMF0gKyB2MFsxXSAqIHYxWzFdKTtcbiAgICB2YXIgc2luID0gTWF0aC5zcXJ0KDEgLSBjb3MgKiBjb3MpO1xuICAgIHJldHVybiBzaW4gLyBjb3M7XG59XG5cbmZ1bmN0aW9uIG1ha2VCYWNrZ3JvdW5kKHBsb3Rncm91cCwgY2xpcHNlZ21lbnRzLCB4YXhpcywgeWF4aXMsIGlzQ29uc3RyYWludCwgY29sb3JpbmcpIHtcbiAgICB2YXIgc2VnLCB4cCwgeXAsIGk7XG4gICAgdmFyIGJnZ3JvdXAgPSBMaWIuZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ2cnLCAnY29udG91cmJnJyk7XG5cbiAgICB2YXIgYmdmaWxsID0gYmdncm91cC5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAuZGF0YSgoY29sb3JpbmcgPT09ICdmaWxsJyAmJiAhaXNDb25zdHJhaW50KSA/IFswXSA6IFtdKTtcbiAgICBiZ2ZpbGwuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKTtcbiAgICBiZ2ZpbGwuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgdmFyIHNlZ3MgPSBbXTtcbiAgICBmb3IoaSA9IDA7IGkgPCBjbGlwc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2VnID0gY2xpcHNlZ21lbnRzW2ldO1xuICAgICAgICB4cCA9IG1hcDFkQXJyYXkoW10sIHNlZy54LCB4YXhpcy5jMnApO1xuICAgICAgICB5cCA9IG1hcDFkQXJyYXkoW10sIHNlZy55LCB5YXhpcy5jMnApO1xuICAgICAgICBzZWdzLnB1c2gobWFrZXBhdGgoeHAsIHlwLCBzZWcuYmljdWJpYykpO1xuICAgIH1cblxuICAgIGJnZmlsbFxuICAgICAgICAuYXR0cignZCcsICdNJyArIHNlZ3Muam9pbignTCcpICsgJ1onKVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJyk7XG59XG5cbmZ1bmN0aW9uIG1ha2VGaWxscyh0cmFjZSwgcGxvdGdyb3VwLCB4YSwgeWEsIHBhdGhpbmZvLCBwZXJpbWV0ZXIsIGFiMnAsIGNhcnBldCwgY2FycGV0Y2QsIGNvbG9yaW5nLCBib3VuZGFyeVBhdGgpIHtcbiAgICB2YXIgaGFzRmlsbHMgPSBjb2xvcmluZyA9PT0gJ2ZpbGwnO1xuXG4gICAgLy8gZmlsbHMgcHJlZml4Qm91bmRhcnkgaW4gcGF0aGluZm8gaXRlbXNcbiAgICBpZihoYXNGaWxscykge1xuICAgICAgICBjbG9zZUJvdW5kYXJpZXMocGF0aGluZm8sIHRyYWNlLmNvbnRvdXJzKTtcbiAgICB9XG5cbiAgICB2YXIgZmlsbGdyb3VwID0gTGliLmVuc3VyZVNpbmdsZShwbG90Z3JvdXAsICdnJywgJ2NvbnRvdXJmaWxsJyk7XG4gICAgdmFyIGZpbGxpdGVtcyA9IGZpbGxncm91cC5zZWxlY3RBbGwoJ3BhdGgnKS5kYXRhKGhhc0ZpbGxzID8gcGF0aGluZm8gOiBbXSk7XG4gICAgZmlsbGl0ZW1zLmVudGVyKCkuYXBwZW5kKCdwYXRoJyk7XG4gICAgZmlsbGl0ZW1zLmV4aXQoKS5yZW1vdmUoKTtcbiAgICBmaWxsaXRlbXMuZWFjaChmdW5jdGlvbihwaSkge1xuICAgICAgICAvLyBqb2luIGFsbCBwYXRocyBmb3IgdGhpcyBsZXZlbCB0b2dldGhlciBpbnRvIGEgc2luZ2xlIHBhdGhcbiAgICAgICAgLy8gZmlyc3QgZm9sbG93IGNsb2Nrd2lzZSBhcm91bmQgdGhlIHBlcmltZXRlciB0byBjbG9zZSBhbnkgb3BlbiBwYXRoc1xuICAgICAgICAvLyBpZiB0aGUgd2hvbGUgcGVyaW1ldGVyIGlzIGFib3ZlIHRoaXMgbGV2ZWwsIHN0YXJ0IHdpdGggYSBwYXRoXG4gICAgICAgIC8vIGVuY2xvc2luZyB0aGUgd2hvbGUgdGhpbmcuIFdpdGggYWxsIHRoYXQsIHRoZSBwYXJpdHkgc2hvdWxkIG1lYW5cbiAgICAgICAgLy8gdGhhdCB3ZSBhbHdheXMgZmlsbCBldmVyeXRoaW5nIGFib3ZlIHRoZSBjb250b3VyLCBub3RoaW5nIGJlbG93XG4gICAgICAgIHZhciBmdWxscGF0aCA9IChwaS5wcmVmaXhCb3VuZGFyeSA/IGJvdW5kYXJ5UGF0aCA6ICcnKSArXG4gICAgICAgICAgICBqb2luQWxsUGF0aHModHJhY2UsIHBpLCBwZXJpbWV0ZXIsIGFiMnAsIGNhcnBldCwgY2FycGV0Y2QsIHhhLCB5YSk7XG5cbiAgICAgICAgaWYoIWZ1bGxwYXRoKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykucmVtb3ZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bGxwYXRoKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ25vbmUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBqb2luQWxsUGF0aHModHJhY2UsIHBpLCBwZXJpbWV0ZXIsIGFiMnAsIGNhcnBldCwgY2FycGV0Y2QsIHhhLCB5YSkge1xuICAgIHZhciBpO1xuICAgIHZhciBmdWxscGF0aCA9ICcnO1xuXG4gICAgdmFyIHN0YXJ0c2xlZnQgPSBwaS5lZGdlcGF0aHMubWFwKGZ1bmN0aW9uKHYsIGkpIHsgcmV0dXJuIGk7IH0pO1xuICAgIHZhciBuZXdsb29wID0gdHJ1ZTtcbiAgICB2YXIgZW5kcHQsIG5ld2VuZHB0LCBjbnQsIG5leHRpLCBwb3NzaWJsZWksIGFkZHBhdGg7XG5cbiAgICB2YXIgYXRvbCA9IE1hdGguYWJzKHBlcmltZXRlclswXVswXSAtIHBlcmltZXRlclsyXVswXSkgKiAxZS00O1xuICAgIHZhciBidG9sID0gTWF0aC5hYnMocGVyaW1ldGVyWzBdWzFdIC0gcGVyaW1ldGVyWzJdWzFdKSAqIDFlLTQ7XG5cbiAgICBmdW5jdGlvbiBpc3RvcChwdCkgeyByZXR1cm4gTWF0aC5hYnMocHRbMV0gLSBwZXJpbWV0ZXJbMF1bMV0pIDwgYnRvbDsgfVxuICAgIGZ1bmN0aW9uIGlzYm90dG9tKHB0KSB7IHJldHVybiBNYXRoLmFicyhwdFsxXSAtIHBlcmltZXRlclsyXVsxXSkgPCBidG9sOyB9XG4gICAgZnVuY3Rpb24gaXNsZWZ0KHB0KSB7IHJldHVybiBNYXRoLmFicyhwdFswXSAtIHBlcmltZXRlclswXVswXSkgPCBhdG9sOyB9XG4gICAgZnVuY3Rpb24gaXNyaWdodChwdCkgeyByZXR1cm4gTWF0aC5hYnMocHRbMF0gLSBwZXJpbWV0ZXJbMl1bMF0pIDwgYXRvbDsgfVxuXG4gICAgZnVuY3Rpb24gcGF0aHRvKHB0MCwgcHQxKSB7XG4gICAgICAgIHZhciBpLCBqLCBzZWdtZW50cywgYXhpcztcbiAgICAgICAgdmFyIHBhdGggPSAnJztcblxuICAgICAgICBpZigoaXN0b3AocHQwKSAmJiAhaXNyaWdodChwdDApKSB8fCAoaXNib3R0b20ocHQwKSAmJiAhaXNsZWZ0KHB0MCkpKSB7XG4gICAgICAgICAgICBheGlzID0gY2FycGV0LmFheGlzO1xuICAgICAgICAgICAgc2VnbWVudHMgPSBheGlzQWxpZ25lZExpbmUoY2FycGV0LCBjYXJwZXRjZCwgW3B0MFswXSwgcHQxWzBdXSwgMC41ICogKHB0MFsxXSArIHB0MVsxXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXhpcyA9IGNhcnBldC5iYXhpcztcbiAgICAgICAgICAgIHNlZ21lbnRzID0gYXhpc0FsaWduZWRMaW5lKGNhcnBldCwgY2FycGV0Y2QsIDAuNSAqIChwdDBbMF0gKyBwdDFbMF0pLCBbcHQwWzFdLCBwdDFbMV1dKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpID0gMTsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXRoICs9IGF4aXMuc21vb3RoaW5nID8gJ0MnIDogJ0wnO1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgc2VnbWVudHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHQgPSBzZWdtZW50c1tpXVtqXTtcbiAgICAgICAgICAgICAgICBwYXRoICs9IFt4YS5jMnAocHRbMF0pLCB5YS5jMnAocHRbMV0pXSArICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIGVuZHB0ID0gbnVsbDtcbiAgICB3aGlsZShzdGFydHNsZWZ0Lmxlbmd0aCkge1xuICAgICAgICB2YXIgc3RhcnRwdCA9IHBpLmVkZ2VwYXRoc1tpXVswXTtcblxuICAgICAgICBpZihlbmRwdCkge1xuICAgICAgICAgICAgZnVsbHBhdGggKz0gcGF0aHRvKGVuZHB0LCBzdGFydHB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZHBhdGggPSBEcmF3aW5nLnNtb290aG9wZW4ocGkuZWRnZXBhdGhzW2ldLm1hcChhYjJwKSwgcGkuc21vb3RoaW5nKTtcbiAgICAgICAgZnVsbHBhdGggKz0gbmV3bG9vcCA/IGFkZHBhdGggOiBhZGRwYXRoLnJlcGxhY2UoL15NLywgJ0wnKTtcbiAgICAgICAgc3RhcnRzbGVmdC5zcGxpY2Uoc3RhcnRzbGVmdC5pbmRleE9mKGkpLCAxKTtcbiAgICAgICAgZW5kcHQgPSBwaS5lZGdlcGF0aHNbaV1bcGkuZWRnZXBhdGhzW2ldLmxlbmd0aCAtIDFdO1xuICAgICAgICBuZXh0aSA9IC0xO1xuXG4gICAgICAgIC8vIG5vdyBsb29wIHRocm91Z2ggc2lkZXMsIG1vdmluZyBvdXIgZW5kcG9pbnQgdW50aWwgd2UgZmluZCBhIG5ldyBzdGFydFxuICAgICAgICBmb3IoY250ID0gMDsgY250IDwgNDsgY250KyspIHsgLy8ganVzdCB0byBwcmV2ZW50IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICBpZighZW5kcHQpIHtcbiAgICAgICAgICAgICAgICBMaWIubG9nKCdNaXNzaW5nIGVuZD8nLCBpLCBwaSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGlzdG9wKGVuZHB0KSAmJiAhaXNyaWdodChlbmRwdCkpIHtcbiAgICAgICAgICAgICAgICBuZXdlbmRwdCA9IHBlcmltZXRlclsxXTsgLy8gbGVmdCB0b3AgLS0tPiByaWdodCB0b3BcbiAgICAgICAgICAgIH0gZWxzZSBpZihpc2xlZnQoZW5kcHQpKSB7XG4gICAgICAgICAgICAgICAgbmV3ZW5kcHQgPSBwZXJpbWV0ZXJbMF07IC8vIGxlZnQgYm90dG9tIC0tLT4gbGVmdCB0b3BcbiAgICAgICAgICAgIH0gZWxzZSBpZihpc2JvdHRvbShlbmRwdCkpIHtcbiAgICAgICAgICAgICAgICBuZXdlbmRwdCA9IHBlcmltZXRlclszXTsgLy8gcmlnaHQgYm90dG9tXG4gICAgICAgICAgICB9IGVsc2UgaWYoaXNyaWdodChlbmRwdCkpIHtcbiAgICAgICAgICAgICAgICBuZXdlbmRwdCA9IHBlcmltZXRlclsyXTsgLy8gbGVmdCBib3R0b21cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yKHBvc3NpYmxlaSA9IDA7IHBvc3NpYmxlaSA8IHBpLmVkZ2VwYXRocy5sZW5ndGg7IHBvc3NpYmxlaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHB0TmV3ID0gcGkuZWRnZXBhdGhzW3Bvc3NpYmxlaV1bMF07XG4gICAgICAgICAgICAgICAgLy8gaXMgcHROZXcgb24gdGhlIChob3J6LiBvciB2ZXJ0Likgc2VnbWVudCBmcm9tIGVuZHB0IHRvIG5ld2VuZHB0P1xuICAgICAgICAgICAgICAgIGlmKE1hdGguYWJzKGVuZHB0WzBdIC0gbmV3ZW5kcHRbMF0pIDwgYXRvbCkge1xuICAgICAgICAgICAgICAgICAgICBpZihNYXRoLmFicyhlbmRwdFswXSAtIHB0TmV3WzBdKSA8IGF0b2wgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHROZXdbMV0gLSBlbmRwdFsxXSkgKiAobmV3ZW5kcHRbMV0gLSBwdE5ld1sxXSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3ZW5kcHQgPSBwdE5ldztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRpID0gcG9zc2libGVpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKE1hdGguYWJzKGVuZHB0WzFdIC0gbmV3ZW5kcHRbMV0pIDwgYnRvbCkge1xuICAgICAgICAgICAgICAgICAgICBpZihNYXRoLmFicyhlbmRwdFsxXSAtIHB0TmV3WzFdKSA8IGJ0b2wgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHROZXdbMF0gLSBlbmRwdFswXSkgKiAobmV3ZW5kcHRbMF0gLSBwdE5ld1swXSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3ZW5kcHQgPSBwdE5ldztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRpID0gcG9zc2libGVpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTGliLmxvZygnZW5kcHQgdG8gbmV3ZW5kcHQgaXMgbm90IHZlcnQuIG9yIGhvcnouJywgZW5kcHQsIG5ld2VuZHB0LCBwdE5ldyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihuZXh0aSA+PSAwKSBicmVhaztcbiAgICAgICAgICAgIGZ1bGxwYXRoICs9IHBhdGh0byhlbmRwdCwgbmV3ZW5kcHQpO1xuICAgICAgICAgICAgZW5kcHQgPSBuZXdlbmRwdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG5leHRpID09PSBwaS5lZGdlcGF0aHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBMaWIubG9nKCd1bmNsb3NlZCBwZXJpbWV0ZXIgcGF0aCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpID0gbmV4dGk7XG5cbiAgICAgICAgLy8gaWYgd2UgY2xvc2VkIGJhY2sgb24gYSBsb29wIHdlIGFscmVhZHkgaW5jbHVkZWQsXG4gICAgICAgIC8vIGNsb3NlIGl0IGFuZCBzdGFydCBhIG5ldyBsb29wXG4gICAgICAgIG5ld2xvb3AgPSAoc3RhcnRzbGVmdC5pbmRleE9mKGkpID09PSAtMSk7XG4gICAgICAgIGlmKG5ld2xvb3ApIHtcbiAgICAgICAgICAgIGkgPSBzdGFydHNsZWZ0WzBdO1xuICAgICAgICAgICAgZnVsbHBhdGggKz0gcGF0aHRvKGVuZHB0LCBuZXdlbmRwdCkgKyAnWic7XG4gICAgICAgICAgICBlbmRwdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaW5hbGx5IGFkZCB0aGUgaW50ZXJpb3IgcGF0aHNcbiAgICBmb3IoaSA9IDA7IGkgPCBwaS5wYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmdWxscGF0aCArPSBEcmF3aW5nLnNtb290aGNsb3NlZChwaS5wYXRoc1tpXS5tYXAoYWIycCksIHBpLnNtb290aGluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bGxwYXRoO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==