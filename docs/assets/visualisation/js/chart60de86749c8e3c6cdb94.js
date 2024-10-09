(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_barpolar_js"],{

/***/ "./node_modules/plotly.js/lib/barpolar.js":
/*!************************************************!*\
  !*** ./node_modules/plotly.js/lib/barpolar.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/barpolar */ "./node_modules/plotly.js/src/traces/barpolar/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/barpolar/attributes.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/barpolar/attributes.js ***!
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



var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var scatterPolarAttrs = __webpack_require__(/*! ../scatterpolar/attributes */ "./node_modules/plotly.js/src/traces/scatterpolar/attributes.js");
var barAttrs = __webpack_require__(/*! ../bar/attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js");

module.exports = {
    r: scatterPolarAttrs.r,
    theta: scatterPolarAttrs.theta,
    r0: scatterPolarAttrs.r0,
    dr: scatterPolarAttrs.dr,
    theta0: scatterPolarAttrs.theta0,
    dtheta: scatterPolarAttrs.dtheta,
    thetaunit: scatterPolarAttrs.thetaunit,

    // orientation: {
    //     valType: 'enumerated',
    //     role: 'info',
    //     values: ['radial', 'angular'],
    //     editType: 'calc+clearAxisTypes',
    //     description: 'Sets the orientation of the bars.'
    // },

    base: extendFlat({}, barAttrs.base, {
        description: [
            'Sets where the bar base is drawn (in radial axis units).',
            'In *stack* barmode,',
            'traces that set *base* will be excluded',
            'and drawn in *overlay* mode instead.'
        ].join(' ')
    }),
    offset: extendFlat({}, barAttrs.offset, {
        description: [
            'Shifts the angular position where the bar is drawn',
            '(in *thetatunit* units).'
        ].join(' ')
    }),
    width: extendFlat({}, barAttrs.width, {
        description: [
            'Sets the bar angular width (in *thetaunit* units).'
        ].join(' ')
    }),

    text: extendFlat({}, barAttrs.text, {
        description: [
            'Sets hover text elements associated with each bar.',
            'If a single string, the same string appears over all bars.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s coordinates.'
        ].join(' ')
    }),
    hovertext: extendFlat({}, barAttrs.hovertext, {
        description: 'Same as `text`.'
    }),

    // textposition: {},
    // textfont: {},
    // insidetextfont: {},
    // outsidetextfont: {},
    // constraintext: {},
    // cliponaxis: extendFlat({}, barAttrs.cliponaxis, {dflt: false}),

    marker: barAttrs.marker,

    hoverinfo: scatterPolarAttrs.hoverinfo,
    hovertemplate: hovertemplateAttrs(),

    selected: barAttrs.selected,
    unselected: barAttrs.unselected

    // error_x (error_r, error_theta)
    // error_y
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/barpolar/calc.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/barpolar/calc.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");
var arraysToCalcdata = __webpack_require__(/*! ../bar/arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/bar/arrays_to_calcdata.js");
var setGroupPositions = __webpack_require__(/*! ../bar/cross_trace_calc */ "./node_modules/plotly.js/src/traces/bar/cross_trace_calc.js").setGroupPositions;
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");
var traceIs = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js").traceIs;
var extendFlat = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").extendFlat;

function calc(gd, trace) {
    var fullLayout = gd._fullLayout;
    var subplotId = trace.subplot;
    var radialAxis = fullLayout[subplotId].radialaxis;
    var angularAxis = fullLayout[subplotId].angularaxis;
    var rArray = radialAxis.makeCalcdata(trace, 'r');
    var thetaArray = angularAxis.makeCalcdata(trace, 'theta');
    var len = trace._length;
    var cd = new Array(len);

    // 'size' axis variables
    var sArray = rArray;
    // 'pos' axis variables
    var pArray = thetaArray;

    for(var i = 0; i < len; i++) {
        cd[i] = {p: pArray[i], s: sArray[i]};
    }

    // convert width and offset in 'c' coordinate,
    // set 'c' value(s) in trace._width and trace._offset,
    // to make Bar.crossTraceCalc "just work"
    function d2c(attr) {
        var val = trace[attr];
        if(val !== undefined) {
            trace['_' + attr] = Array.isArray(val) ?
                angularAxis.makeCalcdata(trace, attr) :
                angularAxis.d2c(val, trace.thetaunit);
        }
    }

    if(angularAxis.type === 'linear') {
        d2c('width');
        d2c('offset');
    }

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
}

function crossTraceCalc(gd, polarLayout, subplotId) {
    var calcdata = gd.calcdata;
    var barPolarCd = [];

    for(var i = 0; i < calcdata.length; i++) {
        var cdi = calcdata[i];
        var trace = cdi[0].trace;

        if(trace.visible === true && traceIs(trace, 'bar') &&
            trace.subplot === subplotId
        ) {
            barPolarCd.push(cdi);
        }
    }

    // to make _extremes is filled in correctly so that
    // polar._subplot.radialAxis can get auotrange'd
    // TODO clean up!
    // I think we want to call getAutorange on polar.radialaxis
    // NOT on polar._subplot.radialAxis
    var rAxis = extendFlat({}, polarLayout.radialaxis, {_id: 'x'});
    var aAxis = polarLayout.angularaxis;

    setGroupPositions(gd, aAxis, rAxis, barPolarCd, {
        mode: polarLayout.barmode,
        norm: polarLayout.barnorm,
        gap: polarLayout.bargap,
        groupgap: polarLayout.bargroupgap
    });
}

module.exports = {
    calc: calc,
    crossTraceCalc: crossTraceCalc
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/barpolar/defaults.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/barpolar/defaults.js ***!
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

var handleRThetaDefaults = __webpack_require__(/*! ../scatterpolar/defaults */ "./node_modules/plotly.js/src/traces/scatterpolar/defaults.js").handleRThetaDefaults;
var handleStyleDefaults = __webpack_require__(/*! ../bar/style_defaults */ "./node_modules/plotly.js/src/traces/bar/style_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/barpolar/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleRThetaDefaults(traceIn, traceOut, layout, coerce);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    // coerce('orientation', (traceOut.theta && !traceOut.r) ? 'angular' : 'radial');

    coerce('thetaunit');
    coerce('base');
    coerce('offset');
    coerce('width');

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    // var textPosition = coerce('textposition');
    // var hasBoth = Array.isArray(textPosition) || textPosition === 'auto';
    // var hasInside = hasBoth || textPosition === 'inside';
    // var hasOutside = hasBoth || textPosition === 'outside';

    // if(hasInside || hasOutside) {
    //     var textFont = coerceFont(coerce, 'textfont', layout.font);
    //     if(hasInside) coerceFont(coerce, 'insidetextfont', textFont);
    //     if(hasOutside) coerceFont(coerce, 'outsidetextfont', textFont);
    //     coerce('constraintext');
    //     coerce('selected.textfont.color');
    //     coerce('unselected.textfont.color');
    //     coerce('cliponaxis');
    // }

    handleStyleDefaults(traceIn, traceOut, coerce, defaultColor, layout);

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/barpolar/hover.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/barpolar/hover.js ***!
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



var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var getTraceColor = __webpack_require__(/*! ../bar/hover */ "./node_modules/plotly.js/src/traces/bar/hover.js").getTraceColor;
var fillText = Lib.fillText;
var makeHoverPointText = __webpack_require__(/*! ../scatterpolar/hover */ "./node_modules/plotly.js/src/traces/scatterpolar/hover.js").makeHoverPointText;
var isPtInsidePolygon = __webpack_require__(/*! ../../plots/polar/helpers */ "./node_modules/plotly.js/src/plots/polar/helpers.js").isPtInsidePolygon;

module.exports = function hoverPoints(pointData, xval, yval) {
    var cd = pointData.cd;
    var trace = cd[0].trace;

    var subplot = pointData.subplot;
    var radialAxis = subplot.radialAxis;
    var angularAxis = subplot.angularAxis;
    var vangles = subplot.vangles;
    var inboxFn = vangles ? isPtInsidePolygon : Lib.isPtInsideSector;
    var maxHoverDistance = pointData.maxHoverDistance;
    var period = angularAxis._period || 2 * Math.PI;

    var rVal = Math.abs(radialAxis.g2p(Math.sqrt(xval * xval + yval * yval)));
    var thetaVal = Math.atan2(yval, xval);

    // polar.(x|y)axis.p2c doesn't get the reversed radial axis range case right
    if(radialAxis.range[0] > radialAxis.range[1]) {
        thetaVal += Math.PI;
    }

    var distFn = function(di) {
        if(inboxFn(rVal, thetaVal, [di.rp0, di.rp1], [di.thetag0, di.thetag1], vangles)) {
            return maxHoverDistance +
                // add a little to the pseudo-distance for wider bars, so that like scatter,
                // if you are over two overlapping bars, the narrower one wins.
                Math.min(1, Math.abs(di.thetag1 - di.thetag0) / period) - 1 +
                // add a gradient so hovering near the end of a
                // bar makes it a little closer match
                (di.rp1 - rVal) / (di.rp1 - di.rp0) - 1;
        } else {
            return Infinity;
        }
    };

    Fx.getClosest(cd, distFn, pointData);
    if(pointData.index === false) return;

    var index = pointData.index;
    var cdi = cd[index];

    pointData.x0 = pointData.x1 = cdi.ct[0];
    pointData.y0 = pointData.y1 = cdi.ct[1];

    var _cdi = Lib.extendFlat({}, cdi, {r: cdi.s, theta: cdi.p});
    fillText(cdi, trace, pointData);
    makeHoverPointText(_cdi, trace, subplot, pointData);
    pointData.hovertemplate = trace.hovertemplate;
    pointData.color = getTraceColor(trace, cdi);
    pointData.xLabelVal = pointData.yLabelVal = undefined;

    if(cdi.s < 0) {
        pointData.idealAlign = 'left';
    }

    return [pointData];
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/barpolar/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/barpolar/index.js ***!
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
    name: 'barpolar',
    basePlotModule: __webpack_require__(/*! ../../plots/polar */ "./node_modules/plotly.js/src/plots/polar/index.js"),
    categories: ['polar', 'bar', 'showLegend'],

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/barpolar/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/barpolar/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/barpolar/defaults.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/barpolar/layout_defaults.js"),

    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/barpolar/calc.js").calc,
    crossTraceCalc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/barpolar/calc.js").crossTraceCalc,

    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/barpolar/plot.js"),
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    formatLabels: __webpack_require__(/*! ../scatterpolar/format_labels */ "./node_modules/plotly.js/src/traces/scatterpolar/format_labels.js"),

    style: __webpack_require__(/*! ../bar/style */ "./node_modules/plotly.js/src/traces/bar/style.js").style,
    styleOnSelect: __webpack_require__(/*! ../bar/style */ "./node_modules/plotly.js/src/traces/bar/style.js").styleOnSelect,

    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/barpolar/hover.js"),
    selectPoints: __webpack_require__(/*! ../bar/select */ "./node_modules/plotly.js/src/traces/bar/select.js"),

    meta: {
        hrName: 'bar_polar',
        description: [
            'The data visualized by the radial span of the bars is set in `r`'
            // 'if `orientation` is set th *radial* (the default)',
            // 'and the labels are set in `theta`.',
            // 'By setting `orientation` to *angular*, the roles are interchanged.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/barpolar/layout_attributes.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/barpolar/layout_attributes.js ***!
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
    barmode: {
        valType: 'enumerated',
        values: ['stack', 'overlay'],
        dflt: 'stack',
        role: 'info',
        editType: 'calc',
        description: [
            'Determines how bars at the same location coordinate',
            'are displayed on the graph.',
            'With *stack*, the bars are stacked on top of one another',
            'With *overlay*, the bars are plotted over one another,',
            'you might need to an *opacity* to see multiple bars.'
        ].join(' ')
    },
    bargap: {
        valType: 'number',
        dflt: 0.1,
        min: 0,
        max: 1,
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the gap between bars of',
            'adjacent location coordinates.',
            'Values are unitless, they represent fractions of the minimum difference',
            'in bar positions in the data.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/barpolar/layout_defaults.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/barpolar/layout_defaults.js ***!
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
var attrs = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/barpolar/layout_attributes.js");

module.exports = function(layoutIn, layoutOut, fullData) {
    var subplotsDone = {};
    var sp;

    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn[sp] || {}, layoutOut[sp], attrs, attr, dflt);
    }

    for(var i = 0; i < fullData.length; i++) {
        var trace = fullData[i];
        if(trace.type === 'barpolar' && trace.visible === true) {
            sp = trace.subplot;
            if(!subplotsDone[sp]) {
                coerce('barmode');
                coerce('bargap');
                subplotsDone[sp] = 1;
            }
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/barpolar/plot.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/barpolar/plot.js ***!
  \************************************************************/
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
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var helpers = __webpack_require__(/*! ../../plots/polar/helpers */ "./node_modules/plotly.js/src/plots/polar/helpers.js");

module.exports = function plot(gd, subplot, cdbar) {
    var xa = subplot.xaxis;
    var ya = subplot.yaxis;
    var radialAxis = subplot.radialAxis;
    var angularAxis = subplot.angularAxis;
    var pathFn = makePathFn(subplot);
    var barLayer = subplot.layers.frontplot.select('g.barlayer');

    Lib.makeTraceGroups(barLayer, cdbar, 'trace bars').each(function() {
        var plotGroup = d3.select(this);
        var pointGroup = Lib.ensureSingle(plotGroup, 'g', 'points');
        var bars = pointGroup.selectAll('g.point').data(Lib.identity);

        bars.enter().append('g')
            .style('vector-effect', 'non-scaling-stroke')
            .style('stroke-miterlimit', 2)
            .classed('point', true);

        bars.exit().remove();

        bars.each(function(di) {
            var bar = d3.select(this);

            var rp0 = di.rp0 = radialAxis.c2p(di.s0);
            var rp1 = di.rp1 = radialAxis.c2p(di.s1);
            var thetag0 = di.thetag0 = angularAxis.c2g(di.p0);
            var thetag1 = di.thetag1 = angularAxis.c2g(di.p1);

            var dPath;

            if(!isNumeric(rp0) || !isNumeric(rp1) ||
                !isNumeric(thetag0) || !isNumeric(thetag1) ||
                rp0 === rp1 || thetag0 === thetag1
            ) {
                // do not remove blank bars, to keep data-to-node
                // mapping intact during radial drag, that we
                // can skip calling _module.style during interactions
                dPath = 'M0,0Z';
            } else {
                // this 'center' pt is used for selections and hover labels
                var rg1 = radialAxis.c2g(di.s1);
                var thetagMid = (thetag0 + thetag1) / 2;
                di.ct = [
                    xa.c2p(rg1 * Math.cos(thetagMid)),
                    ya.c2p(rg1 * Math.sin(thetagMid))
                ];

                dPath = pathFn(rp0, rp1, thetag0, thetag1);
            }

            Lib.ensureSingle(bar, 'path').attr('d', dPath);
        });

        // clip plotGroup, when trace layer isn't clipped
        Drawing.setClipUrl(
            plotGroup,
            subplot._hasClipOnAxisFalse ? subplot.clipIds.forTraces : null,
            gd
        );
    });
};

function makePathFn(subplot) {
    var cxx = subplot.cxx;
    var cyy = subplot.cyy;

    if(subplot.vangles) {
        return function(r0, r1, _a0, _a1) {
            var a0, a1;

            if(Lib.angleDelta(_a0, _a1) > 0) {
                a0 = _a0;
                a1 = _a1;
            } else {
                a0 = _a1;
                a1 = _a0;
            }

            var va0 = helpers.findEnclosingVertexAngles(a0, subplot.vangles)[0];
            var va1 = helpers.findEnclosingVertexAngles(a1, subplot.vangles)[1];
            var vaBar = [va0, (a0 + a1) / 2, va1];
            return helpers.pathPolygonAnnulus(r0, r1, a0, a1, vaBar, cxx, cyy);
        };
    }

    return function(r0, r1, a0, a1) {
        return Lib.pathAnnulus(r0, r1, a0, a1, cxx, cyy);
    };
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvYmFycG9sYXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXJwb2xhci9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFycG9sYXIvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2JhcnBvbGFyL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFycG9sYXIvaG92ZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9iYXJwb2xhci9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2JhcnBvbGFyL2xheW91dF9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFycG9sYXIvbGF5b3V0X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvYmFycG9sYXIvcGxvdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYiwySEFBa0Q7Ozs7Ozs7Ozs7OztBQ1ZsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYix5QkFBeUIsMElBQTZEO0FBQ3RGLGlCQUFpQixvR0FBc0M7QUFDdkQsd0JBQXdCLG1CQUFPLENBQUMsa0dBQTRCO0FBQzVELGVBQWUsbUJBQU8sQ0FBQyxnRkFBbUI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUix1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDRCQUE0QjtBQUM1QjtBQUNBLEtBQUs7O0FBRUwsdUJBQXVCO0FBQ3ZCLG1CQUFtQjtBQUNuQix5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCLHdCQUF3QjtBQUN4QixnQ0FBZ0Msd0JBQXdCLFlBQVk7O0FBRXBFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixvQkFBb0IsNklBQTREO0FBQ2hGLHFCQUFxQixtQkFBTyxDQUFDLG9HQUFrQztBQUMvRCx1QkFBdUIsbUJBQU8sQ0FBQyxnR0FBMkI7QUFDMUQsd0JBQXdCLG1JQUFvRDtBQUM1RSxvQkFBb0IsbUJBQU8sQ0FBQyxnR0FBMkI7QUFDdkQsY0FBYyw2RkFBaUM7QUFDL0MsaUJBQWlCLDRGQUErQjs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDJCQUEyQixTQUFTO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCLDJCQUEyQix3SUFBd0Q7QUFDbkYsMEJBQTBCLG1CQUFPLENBQUMsd0ZBQXVCO0FBQ3pELGlCQUFpQixtQkFBTyxDQUFDLGdGQUFjOztBQUV2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxnRkFBcUI7QUFDdEMsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLG9CQUFvQix5R0FBcUM7QUFDekQ7QUFDQSx5QkFBeUIsZ0lBQW1EO0FBQzVFLHdCQUF3Qiw2SEFBc0Q7O0FBRTlFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0NBQWdDLFFBQVEsdUJBQXVCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyw0RUFBbUI7QUFDL0M7O0FBRUEsZ0JBQWdCLG1CQUFPLENBQUMsZ0ZBQWM7QUFDdEMsc0JBQXNCLG1CQUFPLENBQUMsOEZBQXFCO0FBQ25ELG9CQUFvQixtQkFBTyxDQUFDLDRFQUFZO0FBQ3hDLDBCQUEwQixtQkFBTyxDQUFDLDBGQUFtQjs7QUFFckQsVUFBVSw4RkFBc0I7QUFDaEMsb0JBQW9CLHdHQUFnQzs7QUFFcEQsVUFBVSxtQkFBTyxDQUFDLG9FQUFRO0FBQzFCLGNBQWMsbUJBQU8sQ0FBQyxrR0FBNEI7QUFDbEQsa0JBQWtCLG1CQUFPLENBQUMsd0dBQStCOztBQUV6RCxXQUFXLGlHQUE2QjtBQUN4QyxtQkFBbUIseUdBQXFDOztBQUV4RCxpQkFBaUIsbUJBQU8sQ0FBQyxzRUFBUztBQUNsQyxrQkFBa0IsbUJBQU8sQ0FBQyx3RUFBZTs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixZQUFZLG1CQUFPLENBQUMsOEZBQXFCOztBQUV6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7QUFDNUM7O0FBRUEsa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLG1DQUFJO0FBQ3JCLGdCQUFnQixtQkFBTyxDQUFDLDhEQUFnQjs7QUFFeEMsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGNBQWMsbUJBQU8sQ0FBQywwRkFBMEI7QUFDaEQsY0FBYyxtQkFBTyxDQUFDLHNGQUEyQjs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0NjBkZTg2NzQ5YzhlM2M2Y2RiOTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9iYXJwb2xhcicpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaG92ZXJ0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLmhvdmVydGVtcGxhdGVBdHRycztcbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG52YXIgc2NhdHRlclBvbGFyQXR0cnMgPSByZXF1aXJlKCcuLi9zY2F0dGVycG9sYXIvYXR0cmlidXRlcycpO1xudmFyIGJhckF0dHJzID0gcmVxdWlyZSgnLi4vYmFyL2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcjogc2NhdHRlclBvbGFyQXR0cnMucixcbiAgICB0aGV0YTogc2NhdHRlclBvbGFyQXR0cnMudGhldGEsXG4gICAgcjA6IHNjYXR0ZXJQb2xhckF0dHJzLnIwLFxuICAgIGRyOiBzY2F0dGVyUG9sYXJBdHRycy5kcixcbiAgICB0aGV0YTA6IHNjYXR0ZXJQb2xhckF0dHJzLnRoZXRhMCxcbiAgICBkdGhldGE6IHNjYXR0ZXJQb2xhckF0dHJzLmR0aGV0YSxcbiAgICB0aGV0YXVuaXQ6IHNjYXR0ZXJQb2xhckF0dHJzLnRoZXRhdW5pdCxcblxuICAgIC8vIG9yaWVudGF0aW9uOiB7XG4gICAgLy8gICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAvLyAgICAgcm9sZTogJ2luZm8nLFxuICAgIC8vICAgICB2YWx1ZXM6IFsncmFkaWFsJywgJ2FuZ3VsYXInXSxcbiAgICAvLyAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAvLyAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgYmFycy4nXG4gICAgLy8gfSxcblxuICAgIGJhc2U6IGV4dGVuZEZsYXQoe30sIGJhckF0dHJzLmJhc2UsIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHdoZXJlIHRoZSBiYXIgYmFzZSBpcyBkcmF3biAoaW4gcmFkaWFsIGF4aXMgdW5pdHMpLicsXG4gICAgICAgICAgICAnSW4gKnN0YWNrKiBiYXJtb2RlLCcsXG4gICAgICAgICAgICAndHJhY2VzIHRoYXQgc2V0ICpiYXNlKiB3aWxsIGJlIGV4Y2x1ZGVkJyxcbiAgICAgICAgICAgICdhbmQgZHJhd24gaW4gKm92ZXJsYXkqIG1vZGUgaW5zdGVhZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgb2Zmc2V0OiBleHRlbmRGbGF0KHt9LCBiYXJBdHRycy5vZmZzZXQsIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTaGlmdHMgdGhlIGFuZ3VsYXIgcG9zaXRpb24gd2hlcmUgdGhlIGJhciBpcyBkcmF3bicsXG4gICAgICAgICAgICAnKGluICp0aGV0YXR1bml0KiB1bml0cykuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIHdpZHRoOiBleHRlbmRGbGF0KHt9LCBiYXJBdHRycy53aWR0aCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGJhciBhbmd1bGFyIHdpZHRoIChpbiAqdGhldGF1bml0KiB1bml0cykuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuXG4gICAgdGV4dDogZXh0ZW5kRmxhdCh7fSwgYmFyQXR0cnMudGV4dCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgaG92ZXIgdGV4dCBlbGVtZW50cyBhc3NvY2lhdGVkIHdpdGggZWFjaCBiYXIuJyxcbiAgICAgICAgICAgICdJZiBhIHNpbmdsZSBzdHJpbmcsIHRoZSBzYW1lIHN0cmluZyBhcHBlYXJzIG92ZXIgYWxsIGJhcnMuJyxcbiAgICAgICAgICAgICdJZiBhbiBhcnJheSBvZiBzdHJpbmcsIHRoZSBpdGVtcyBhcmUgbWFwcGVkIGluIG9yZGVyIHRvIHRoZScsXG4gICAgICAgICAgICAndGhpcyB0cmFjZVxcJ3MgY29vcmRpbmF0ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIGhvdmVydGV4dDogZXh0ZW5kRmxhdCh7fSwgYmFyQXR0cnMuaG92ZXJ0ZXh0LCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2FtZSBhcyBgdGV4dGAuJ1xuICAgIH0pLFxuXG4gICAgLy8gdGV4dHBvc2l0aW9uOiB7fSxcbiAgICAvLyB0ZXh0Zm9udDoge30sXG4gICAgLy8gaW5zaWRldGV4dGZvbnQ6IHt9LFxuICAgIC8vIG91dHNpZGV0ZXh0Zm9udDoge30sXG4gICAgLy8gY29uc3RyYWludGV4dDoge30sXG4gICAgLy8gY2xpcG9uYXhpczogZXh0ZW5kRmxhdCh7fSwgYmFyQXR0cnMuY2xpcG9uYXhpcywge2RmbHQ6IGZhbHNlfSksXG5cbiAgICBtYXJrZXI6IGJhckF0dHJzLm1hcmtlcixcblxuICAgIGhvdmVyaW5mbzogc2NhdHRlclBvbGFyQXR0cnMuaG92ZXJpbmZvLFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycygpLFxuXG4gICAgc2VsZWN0ZWQ6IGJhckF0dHJzLnNlbGVjdGVkLFxuICAgIHVuc2VsZWN0ZWQ6IGJhckF0dHJzLnVuc2VsZWN0ZWRcblxuICAgIC8vIGVycm9yX3ggKGVycm9yX3IsIGVycm9yX3RoZXRhKVxuICAgIC8vIGVycm9yX3lcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoYXNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2hlbHBlcnMnKS5oYXNDb2xvcnNjYWxlO1xudmFyIGNvbG9yc2NhbGVDYWxjID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2NhbGMnKTtcbnZhciBhcnJheXNUb0NhbGNkYXRhID0gcmVxdWlyZSgnLi4vYmFyL2FycmF5c190b19jYWxjZGF0YScpO1xudmFyIHNldEdyb3VwUG9zaXRpb25zID0gcmVxdWlyZSgnLi4vYmFyL2Nyb3NzX3RyYWNlX2NhbGMnKS5zZXRHcm91cFBvc2l0aW9ucztcbnZhciBjYWxjU2VsZWN0aW9uID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jYWxjX3NlbGVjdGlvbicpO1xudmFyIHRyYWNlSXMgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpLnRyYWNlSXM7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmV4dGVuZEZsYXQ7XG5cbmZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgc3VicGxvdElkID0gdHJhY2Uuc3VicGxvdDtcbiAgICB2YXIgcmFkaWFsQXhpcyA9IGZ1bGxMYXlvdXRbc3VicGxvdElkXS5yYWRpYWxheGlzO1xuICAgIHZhciBhbmd1bGFyQXhpcyA9IGZ1bGxMYXlvdXRbc3VicGxvdElkXS5hbmd1bGFyYXhpcztcbiAgICB2YXIgckFycmF5ID0gcmFkaWFsQXhpcy5tYWtlQ2FsY2RhdGEodHJhY2UsICdyJyk7XG4gICAgdmFyIHRoZXRhQXJyYXkgPSBhbmd1bGFyQXhpcy5tYWtlQ2FsY2RhdGEodHJhY2UsICd0aGV0YScpO1xuICAgIHZhciBsZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciBjZCA9IG5ldyBBcnJheShsZW4pO1xuXG4gICAgLy8gJ3NpemUnIGF4aXMgdmFyaWFibGVzXG4gICAgdmFyIHNBcnJheSA9IHJBcnJheTtcbiAgICAvLyAncG9zJyBheGlzIHZhcmlhYmxlc1xuICAgIHZhciBwQXJyYXkgPSB0aGV0YUFycmF5O1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNkW2ldID0ge3A6IHBBcnJheVtpXSwgczogc0FycmF5W2ldfTtcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IHdpZHRoIGFuZCBvZmZzZXQgaW4gJ2MnIGNvb3JkaW5hdGUsXG4gICAgLy8gc2V0ICdjJyB2YWx1ZShzKSBpbiB0cmFjZS5fd2lkdGggYW5kIHRyYWNlLl9vZmZzZXQsXG4gICAgLy8gdG8gbWFrZSBCYXIuY3Jvc3NUcmFjZUNhbGMgXCJqdXN0IHdvcmtcIlxuICAgIGZ1bmN0aW9uIGQyYyhhdHRyKSB7XG4gICAgICAgIHZhciB2YWwgPSB0cmFjZVthdHRyXTtcbiAgICAgICAgaWYodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRyYWNlWydfJyArIGF0dHJdID0gQXJyYXkuaXNBcnJheSh2YWwpID9cbiAgICAgICAgICAgICAgICBhbmd1bGFyQXhpcy5tYWtlQ2FsY2RhdGEodHJhY2UsIGF0dHIpIDpcbiAgICAgICAgICAgICAgICBhbmd1bGFyQXhpcy5kMmModmFsLCB0cmFjZS50aGV0YXVuaXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoYW5ndWxhckF4aXMudHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgICAgZDJjKCd3aWR0aCcpO1xuICAgICAgICBkMmMoJ29mZnNldCcpO1xuICAgIH1cblxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXInKSkge1xuICAgICAgICBjb2xvcnNjYWxlQ2FsYyhnZCwgdHJhY2UsIHtcbiAgICAgICAgICAgIHZhbHM6IHRyYWNlLm1hcmtlci5jb2xvcixcbiAgICAgICAgICAgIGNvbnRhaW5lclN0cjogJ21hcmtlcicsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmKGhhc0NvbG9yc2NhbGUodHJhY2UsICdtYXJrZXIubGluZScpKSB7XG4gICAgICAgIGNvbG9yc2NhbGVDYWxjKGdkLCB0cmFjZSwge1xuICAgICAgICAgICAgdmFsczogdHJhY2UubWFya2VyLmxpbmUuY29sb3IsXG4gICAgICAgICAgICBjb250YWluZXJTdHI6ICdtYXJrZXIubGluZScsXG4gICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpO1xuICAgIGNhbGNTZWxlY3Rpb24oY2QsIHRyYWNlKTtcblxuICAgIHJldHVybiBjZDtcbn1cblxuZnVuY3Rpb24gY3Jvc3NUcmFjZUNhbGMoZ2QsIHBvbGFyTGF5b3V0LCBzdWJwbG90SWQpIHtcbiAgICB2YXIgY2FsY2RhdGEgPSBnZC5jYWxjZGF0YTtcbiAgICB2YXIgYmFyUG9sYXJDZCA9IFtdO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhbGNkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjZGkgPSBjYWxjZGF0YVtpXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2RpWzBdLnRyYWNlO1xuXG4gICAgICAgIGlmKHRyYWNlLnZpc2libGUgPT09IHRydWUgJiYgdHJhY2VJcyh0cmFjZSwgJ2JhcicpICYmXG4gICAgICAgICAgICB0cmFjZS5zdWJwbG90ID09PSBzdWJwbG90SWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBiYXJQb2xhckNkLnB1c2goY2RpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRvIG1ha2UgX2V4dHJlbWVzIGlzIGZpbGxlZCBpbiBjb3JyZWN0bHkgc28gdGhhdFxuICAgIC8vIHBvbGFyLl9zdWJwbG90LnJhZGlhbEF4aXMgY2FuIGdldCBhdW90cmFuZ2UnZFxuICAgIC8vIFRPRE8gY2xlYW4gdXAhXG4gICAgLy8gSSB0aGluayB3ZSB3YW50IHRvIGNhbGwgZ2V0QXV0b3JhbmdlIG9uIHBvbGFyLnJhZGlhbGF4aXNcbiAgICAvLyBOT1Qgb24gcG9sYXIuX3N1YnBsb3QucmFkaWFsQXhpc1xuICAgIHZhciByQXhpcyA9IGV4dGVuZEZsYXQoe30sIHBvbGFyTGF5b3V0LnJhZGlhbGF4aXMsIHtfaWQ6ICd4J30pO1xuICAgIHZhciBhQXhpcyA9IHBvbGFyTGF5b3V0LmFuZ3VsYXJheGlzO1xuXG4gICAgc2V0R3JvdXBQb3NpdGlvbnMoZ2QsIGFBeGlzLCByQXhpcywgYmFyUG9sYXJDZCwge1xuICAgICAgICBtb2RlOiBwb2xhckxheW91dC5iYXJtb2RlLFxuICAgICAgICBub3JtOiBwb2xhckxheW91dC5iYXJub3JtLFxuICAgICAgICBnYXA6IHBvbGFyTGF5b3V0LmJhcmdhcCxcbiAgICAgICAgZ3JvdXBnYXA6IHBvbGFyTGF5b3V0LmJhcmdyb3VwZ2FwXG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNhbGM6IGNhbGMsXG4gICAgY3Jvc3NUcmFjZUNhbGM6IGNyb3NzVHJhY2VDYWxjXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBoYW5kbGVSVGhldGFEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXJwb2xhci9kZWZhdWx0cycpLmhhbmRsZVJUaGV0YURlZmF1bHRzO1xudmFyIGhhbmRsZVN0eWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9iYXIvc3R5bGVfZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBoYW5kbGVSVGhldGFEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29lcmNlKCdvcmllbnRhdGlvbicsICh0cmFjZU91dC50aGV0YSAmJiAhdHJhY2VPdXQucikgPyAnYW5ndWxhcicgOiAncmFkaWFsJyk7XG5cbiAgICBjb2VyY2UoJ3RoZXRhdW5pdCcpO1xuICAgIGNvZXJjZSgnYmFzZScpO1xuICAgIGNvZXJjZSgnb2Zmc2V0Jyk7XG4gICAgY29lcmNlKCd3aWR0aCcpO1xuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIC8vIHZhciB0ZXh0UG9zaXRpb24gPSBjb2VyY2UoJ3RleHRwb3NpdGlvbicpO1xuICAgIC8vIHZhciBoYXNCb3RoID0gQXJyYXkuaXNBcnJheSh0ZXh0UG9zaXRpb24pIHx8IHRleHRQb3NpdGlvbiA9PT0gJ2F1dG8nO1xuICAgIC8vIHZhciBoYXNJbnNpZGUgPSBoYXNCb3RoIHx8IHRleHRQb3NpdGlvbiA9PT0gJ2luc2lkZSc7XG4gICAgLy8gdmFyIGhhc091dHNpZGUgPSBoYXNCb3RoIHx8IHRleHRQb3NpdGlvbiA9PT0gJ291dHNpZGUnO1xuXG4gICAgLy8gaWYoaGFzSW5zaWRlIHx8IGhhc091dHNpZGUpIHtcbiAgICAvLyAgICAgdmFyIHRleHRGb250ID0gY29lcmNlRm9udChjb2VyY2UsICd0ZXh0Zm9udCcsIGxheW91dC5mb250KTtcbiAgICAvLyAgICAgaWYoaGFzSW5zaWRlKSBjb2VyY2VGb250KGNvZXJjZSwgJ2luc2lkZXRleHRmb250JywgdGV4dEZvbnQpO1xuICAgIC8vICAgICBpZihoYXNPdXRzaWRlKSBjb2VyY2VGb250KGNvZXJjZSwgJ291dHNpZGV0ZXh0Zm9udCcsIHRleHRGb250KTtcbiAgICAvLyAgICAgY29lcmNlKCdjb25zdHJhaW50ZXh0Jyk7XG4gICAgLy8gICAgIGNvZXJjZSgnc2VsZWN0ZWQudGV4dGZvbnQuY29sb3InKTtcbiAgICAvLyAgICAgY29lcmNlKCd1bnNlbGVjdGVkLnRleHRmb250LmNvbG9yJyk7XG4gICAgLy8gICAgIGNvZXJjZSgnY2xpcG9uYXhpcycpO1xuICAgIC8vIH1cblxuICAgIGhhbmRsZVN0eWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSwgZGVmYXVsdENvbG9yLCBsYXlvdXQpO1xuXG4gICAgTGliLmNvZXJjZVNlbGVjdGlvbk1hcmtlck9wYWNpdHkodHJhY2VPdXQsIGNvZXJjZSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRnggPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Z4Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgZ2V0VHJhY2VDb2xvciA9IHJlcXVpcmUoJy4uL2Jhci9ob3ZlcicpLmdldFRyYWNlQ29sb3I7XG52YXIgZmlsbFRleHQgPSBMaWIuZmlsbFRleHQ7XG52YXIgbWFrZUhvdmVyUG9pbnRUZXh0ID0gcmVxdWlyZSgnLi4vc2NhdHRlcnBvbGFyL2hvdmVyJykubWFrZUhvdmVyUG9pbnRUZXh0O1xudmFyIGlzUHRJbnNpZGVQb2x5Z29uID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvcG9sYXIvaGVscGVycycpLmlzUHRJbnNpZGVQb2x5Z29uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCkge1xuICAgIHZhciBjZCA9IHBvaW50RGF0YS5jZDtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcblxuICAgIHZhciBzdWJwbG90ID0gcG9pbnREYXRhLnN1YnBsb3Q7XG4gICAgdmFyIHJhZGlhbEF4aXMgPSBzdWJwbG90LnJhZGlhbEF4aXM7XG4gICAgdmFyIGFuZ3VsYXJBeGlzID0gc3VicGxvdC5hbmd1bGFyQXhpcztcbiAgICB2YXIgdmFuZ2xlcyA9IHN1YnBsb3QudmFuZ2xlcztcbiAgICB2YXIgaW5ib3hGbiA9IHZhbmdsZXMgPyBpc1B0SW5zaWRlUG9seWdvbiA6IExpYi5pc1B0SW5zaWRlU2VjdG9yO1xuICAgIHZhciBtYXhIb3ZlckRpc3RhbmNlID0gcG9pbnREYXRhLm1heEhvdmVyRGlzdGFuY2U7XG4gICAgdmFyIHBlcmlvZCA9IGFuZ3VsYXJBeGlzLl9wZXJpb2QgfHwgMiAqIE1hdGguUEk7XG5cbiAgICB2YXIgclZhbCA9IE1hdGguYWJzKHJhZGlhbEF4aXMuZzJwKE1hdGguc3FydCh4dmFsICogeHZhbCArIHl2YWwgKiB5dmFsKSkpO1xuICAgIHZhciB0aGV0YVZhbCA9IE1hdGguYXRhbjIoeXZhbCwgeHZhbCk7XG5cbiAgICAvLyBwb2xhci4oeHx5KWF4aXMucDJjIGRvZXNuJ3QgZ2V0IHRoZSByZXZlcnNlZCByYWRpYWwgYXhpcyByYW5nZSBjYXNlIHJpZ2h0XG4gICAgaWYocmFkaWFsQXhpcy5yYW5nZVswXSA+IHJhZGlhbEF4aXMucmFuZ2VbMV0pIHtcbiAgICAgICAgdGhldGFWYWwgKz0gTWF0aC5QSTtcbiAgICB9XG5cbiAgICB2YXIgZGlzdEZuID0gZnVuY3Rpb24oZGkpIHtcbiAgICAgICAgaWYoaW5ib3hGbihyVmFsLCB0aGV0YVZhbCwgW2RpLnJwMCwgZGkucnAxXSwgW2RpLnRoZXRhZzAsIGRpLnRoZXRhZzFdLCB2YW5nbGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1heEhvdmVyRGlzdGFuY2UgK1xuICAgICAgICAgICAgICAgIC8vIGFkZCBhIGxpdHRsZSB0byB0aGUgcHNldWRvLWRpc3RhbmNlIGZvciB3aWRlciBiYXJzLCBzbyB0aGF0IGxpa2Ugc2NhdHRlcixcbiAgICAgICAgICAgICAgICAvLyBpZiB5b3UgYXJlIG92ZXIgdHdvIG92ZXJsYXBwaW5nIGJhcnMsIHRoZSBuYXJyb3dlciBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICBNYXRoLm1pbigxLCBNYXRoLmFicyhkaS50aGV0YWcxIC0gZGkudGhldGFnMCkgLyBwZXJpb2QpIC0gMSArXG4gICAgICAgICAgICAgICAgLy8gYWRkIGEgZ3JhZGllbnQgc28gaG92ZXJpbmcgbmVhciB0aGUgZW5kIG9mIGFcbiAgICAgICAgICAgICAgICAvLyBiYXIgbWFrZXMgaXQgYSBsaXR0bGUgY2xvc2VyIG1hdGNoXG4gICAgICAgICAgICAgICAgKGRpLnJwMSAtIHJWYWwpIC8gKGRpLnJwMSAtIGRpLnJwMCkgLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEZ4LmdldENsb3Nlc3QoY2QsIGRpc3RGbiwgcG9pbnREYXRhKTtcbiAgICBpZihwb2ludERhdGEuaW5kZXggPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICB2YXIgaW5kZXggPSBwb2ludERhdGEuaW5kZXg7XG4gICAgdmFyIGNkaSA9IGNkW2luZGV4XTtcblxuICAgIHBvaW50RGF0YS54MCA9IHBvaW50RGF0YS54MSA9IGNkaS5jdFswXTtcbiAgICBwb2ludERhdGEueTAgPSBwb2ludERhdGEueTEgPSBjZGkuY3RbMV07XG5cbiAgICB2YXIgX2NkaSA9IExpYi5leHRlbmRGbGF0KHt9LCBjZGksIHtyOiBjZGkucywgdGhldGE6IGNkaS5wfSk7XG4gICAgZmlsbFRleHQoY2RpLCB0cmFjZSwgcG9pbnREYXRhKTtcbiAgICBtYWtlSG92ZXJQb2ludFRleHQoX2NkaSwgdHJhY2UsIHN1YnBsb3QsIHBvaW50RGF0YSk7XG4gICAgcG9pbnREYXRhLmhvdmVydGVtcGxhdGUgPSB0cmFjZS5ob3ZlcnRlbXBsYXRlO1xuICAgIHBvaW50RGF0YS5jb2xvciA9IGdldFRyYWNlQ29sb3IodHJhY2UsIGNkaSk7XG4gICAgcG9pbnREYXRhLnhMYWJlbFZhbCA9IHBvaW50RGF0YS55TGFiZWxWYWwgPSB1bmRlZmluZWQ7XG5cbiAgICBpZihjZGkucyA8IDApIHtcbiAgICAgICAgcG9pbnREYXRhLmlkZWFsQWxpZ24gPSAnbGVmdCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtwb2ludERhdGFdO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnYmFycG9sYXInLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9wb2xhcicpLFxuICAgIGNhdGVnb3JpZXM6IFsncG9sYXInLCAnYmFyJywgJ3Nob3dMZWdlbmQnXSxcblxuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY2FsYyxcbiAgICBjcm9zc1RyYWNlQ2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY3Jvc3NUcmFjZUNhbGMsXG5cbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi4vc2NhdHRlci9tYXJrZXJfY29sb3JiYXInKSxcbiAgICBmb3JtYXRMYWJlbHM6IHJlcXVpcmUoJy4uL3NjYXR0ZXJwb2xhci9mb3JtYXRfbGFiZWxzJyksXG5cbiAgICBzdHlsZTogcmVxdWlyZSgnLi4vYmFyL3N0eWxlJykuc3R5bGUsXG4gICAgc3R5bGVPblNlbGVjdDogcmVxdWlyZSgnLi4vYmFyL3N0eWxlJykuc3R5bGVPblNlbGVjdCxcblxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuLi9iYXIvc2VsZWN0JyksXG5cbiAgICBtZXRhOiB7XG4gICAgICAgIGhyTmFtZTogJ2Jhcl9wb2xhcicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIGRhdGEgdmlzdWFsaXplZCBieSB0aGUgcmFkaWFsIHNwYW4gb2YgdGhlIGJhcnMgaXMgc2V0IGluIGByYCdcbiAgICAgICAgICAgIC8vICdpZiBgb3JpZW50YXRpb25gIGlzIHNldCB0aCAqcmFkaWFsKiAodGhlIGRlZmF1bHQpJyxcbiAgICAgICAgICAgIC8vICdhbmQgdGhlIGxhYmVscyBhcmUgc2V0IGluIGB0aGV0YWAuJyxcbiAgICAgICAgICAgIC8vICdCeSBzZXR0aW5nIGBvcmllbnRhdGlvbmAgdG8gKmFuZ3VsYXIqLCB0aGUgcm9sZXMgYXJlIGludGVyY2hhbmdlZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYmFybW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydzdGFjaycsICdvdmVybGF5J10sXG4gICAgICAgIGRmbHQ6ICdzdGFjaycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIGhvdyBiYXJzIGF0IHRoZSBzYW1lIGxvY2F0aW9uIGNvb3JkaW5hdGUnLFxuICAgICAgICAgICAgJ2FyZSBkaXNwbGF5ZWQgb24gdGhlIGdyYXBoLicsXG4gICAgICAgICAgICAnV2l0aCAqc3RhY2sqLCB0aGUgYmFycyBhcmUgc3RhY2tlZCBvbiB0b3Agb2Ygb25lIGFub3RoZXInLFxuICAgICAgICAgICAgJ1dpdGggKm92ZXJsYXkqLCB0aGUgYmFycyBhcmUgcGxvdHRlZCBvdmVyIG9uZSBhbm90aGVyLCcsXG4gICAgICAgICAgICAneW91IG1pZ2h0IG5lZWQgdG8gYW4gKm9wYWNpdHkqIHRvIHNlZSBtdWx0aXBsZSBiYXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJhcmdhcDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgZGZsdDogMC4xLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBnYXAgYmV0d2VlbiBiYXJzIG9mJyxcbiAgICAgICAgICAgICdhZGphY2VudCBsb2NhdGlvbiBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ1ZhbHVlcyBhcmUgdW5pdGxlc3MsIHRoZXkgcmVwcmVzZW50IGZyYWN0aW9ucyBvZiB0aGUgbWluaW11bSBkaWZmZXJlbmNlJyxcbiAgICAgICAgICAgICdpbiBiYXIgcG9zaXRpb25zIGluIHRoZSBkYXRhLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgYXR0cnMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEpIHtcbiAgICB2YXIgc3VicGxvdHNEb25lID0ge307XG4gICAgdmFyIHNwO1xuXG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UobGF5b3V0SW5bc3BdIHx8IHt9LCBsYXlvdXRPdXRbc3BdLCBhdHRycywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IGZ1bGxEYXRhW2ldO1xuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnYmFycG9sYXInICYmIHRyYWNlLnZpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHNwID0gdHJhY2Uuc3VicGxvdDtcbiAgICAgICAgICAgIGlmKCFzdWJwbG90c0RvbmVbc3BdKSB7XG4gICAgICAgICAgICAgICAgY29lcmNlKCdiYXJtb2RlJyk7XG4gICAgICAgICAgICAgICAgY29lcmNlKCdiYXJnYXAnKTtcbiAgICAgICAgICAgICAgICBzdWJwbG90c0RvbmVbc3BdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvcG9sYXIvaGVscGVycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ2QsIHN1YnBsb3QsIGNkYmFyKSB7XG4gICAgdmFyIHhhID0gc3VicGxvdC54YXhpcztcbiAgICB2YXIgeWEgPSBzdWJwbG90LnlheGlzO1xuICAgIHZhciByYWRpYWxBeGlzID0gc3VicGxvdC5yYWRpYWxBeGlzO1xuICAgIHZhciBhbmd1bGFyQXhpcyA9IHN1YnBsb3QuYW5ndWxhckF4aXM7XG4gICAgdmFyIHBhdGhGbiA9IG1ha2VQYXRoRm4oc3VicGxvdCk7XG4gICAgdmFyIGJhckxheWVyID0gc3VicGxvdC5sYXllcnMuZnJvbnRwbG90LnNlbGVjdCgnZy5iYXJsYXllcicpO1xuXG4gICAgTGliLm1ha2VUcmFjZUdyb3VwcyhiYXJMYXllciwgY2RiYXIsICd0cmFjZSBiYXJzJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBsb3RHcm91cCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIHBvaW50R3JvdXAgPSBMaWIuZW5zdXJlU2luZ2xlKHBsb3RHcm91cCwgJ2cnLCAncG9pbnRzJyk7XG4gICAgICAgIHZhciBiYXJzID0gcG9pbnRHcm91cC5zZWxlY3RBbGwoJ2cucG9pbnQnKS5kYXRhKExpYi5pZGVudGl0eSk7XG5cbiAgICAgICAgYmFycy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAuc3R5bGUoJ3ZlY3Rvci1lZmZlY3QnLCAnbm9uLXNjYWxpbmctc3Ryb2tlJylcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLW1pdGVybGltaXQnLCAyKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3BvaW50JywgdHJ1ZSk7XG5cbiAgICAgICAgYmFycy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgYmFycy5lYWNoKGZ1bmN0aW9uKGRpKSB7XG4gICAgICAgICAgICB2YXIgYmFyID0gZDMuc2VsZWN0KHRoaXMpO1xuXG4gICAgICAgICAgICB2YXIgcnAwID0gZGkucnAwID0gcmFkaWFsQXhpcy5jMnAoZGkuczApO1xuICAgICAgICAgICAgdmFyIHJwMSA9IGRpLnJwMSA9IHJhZGlhbEF4aXMuYzJwKGRpLnMxKTtcbiAgICAgICAgICAgIHZhciB0aGV0YWcwID0gZGkudGhldGFnMCA9IGFuZ3VsYXJBeGlzLmMyZyhkaS5wMCk7XG4gICAgICAgICAgICB2YXIgdGhldGFnMSA9IGRpLnRoZXRhZzEgPSBhbmd1bGFyQXhpcy5jMmcoZGkucDEpO1xuXG4gICAgICAgICAgICB2YXIgZFBhdGg7XG5cbiAgICAgICAgICAgIGlmKCFpc051bWVyaWMocnAwKSB8fCAhaXNOdW1lcmljKHJwMSkgfHxcbiAgICAgICAgICAgICAgICAhaXNOdW1lcmljKHRoZXRhZzApIHx8ICFpc051bWVyaWModGhldGFnMSkgfHxcbiAgICAgICAgICAgICAgICBycDAgPT09IHJwMSB8fCB0aGV0YWcwID09PSB0aGV0YWcxXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3QgcmVtb3ZlIGJsYW5rIGJhcnMsIHRvIGtlZXAgZGF0YS10by1ub2RlXG4gICAgICAgICAgICAgICAgLy8gbWFwcGluZyBpbnRhY3QgZHVyaW5nIHJhZGlhbCBkcmFnLCB0aGF0IHdlXG4gICAgICAgICAgICAgICAgLy8gY2FuIHNraXAgY2FsbGluZyBfbW9kdWxlLnN0eWxlIGR1cmluZyBpbnRlcmFjdGlvbnNcbiAgICAgICAgICAgICAgICBkUGF0aCA9ICdNMCwwWic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgJ2NlbnRlcicgcHQgaXMgdXNlZCBmb3Igc2VsZWN0aW9ucyBhbmQgaG92ZXIgbGFiZWxzXG4gICAgICAgICAgICAgICAgdmFyIHJnMSA9IHJhZGlhbEF4aXMuYzJnKGRpLnMxKTtcbiAgICAgICAgICAgICAgICB2YXIgdGhldGFnTWlkID0gKHRoZXRhZzAgKyB0aGV0YWcxKSAvIDI7XG4gICAgICAgICAgICAgICAgZGkuY3QgPSBbXG4gICAgICAgICAgICAgICAgICAgIHhhLmMycChyZzEgKiBNYXRoLmNvcyh0aGV0YWdNaWQpKSxcbiAgICAgICAgICAgICAgICAgICAgeWEuYzJwKHJnMSAqIE1hdGguc2luKHRoZXRhZ01pZCkpXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIGRQYXRoID0gcGF0aEZuKHJwMCwgcnAxLCB0aGV0YWcwLCB0aGV0YWcxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTGliLmVuc3VyZVNpbmdsZShiYXIsICdwYXRoJykuYXR0cignZCcsIGRQYXRoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2xpcCBwbG90R3JvdXAsIHdoZW4gdHJhY2UgbGF5ZXIgaXNuJ3QgY2xpcHBlZFxuICAgICAgICBEcmF3aW5nLnNldENsaXBVcmwoXG4gICAgICAgICAgICBwbG90R3JvdXAsXG4gICAgICAgICAgICBzdWJwbG90Ll9oYXNDbGlwT25BeGlzRmFsc2UgPyBzdWJwbG90LmNsaXBJZHMuZm9yVHJhY2VzIDogbnVsbCxcbiAgICAgICAgICAgIGdkXG4gICAgICAgICk7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBtYWtlUGF0aEZuKHN1YnBsb3QpIHtcbiAgICB2YXIgY3h4ID0gc3VicGxvdC5jeHg7XG4gICAgdmFyIGN5eSA9IHN1YnBsb3QuY3l5O1xuXG4gICAgaWYoc3VicGxvdC52YW5nbGVzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihyMCwgcjEsIF9hMCwgX2ExKSB7XG4gICAgICAgICAgICB2YXIgYTAsIGExO1xuXG4gICAgICAgICAgICBpZihMaWIuYW5nbGVEZWx0YShfYTAsIF9hMSkgPiAwKSB7XG4gICAgICAgICAgICAgICAgYTAgPSBfYTA7XG4gICAgICAgICAgICAgICAgYTEgPSBfYTE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGEwID0gX2ExO1xuICAgICAgICAgICAgICAgIGExID0gX2EwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmEwID0gaGVscGVycy5maW5kRW5jbG9zaW5nVmVydGV4QW5nbGVzKGEwLCBzdWJwbG90LnZhbmdsZXMpWzBdO1xuICAgICAgICAgICAgdmFyIHZhMSA9IGhlbHBlcnMuZmluZEVuY2xvc2luZ1ZlcnRleEFuZ2xlcyhhMSwgc3VicGxvdC52YW5nbGVzKVsxXTtcbiAgICAgICAgICAgIHZhciB2YUJhciA9IFt2YTAsIChhMCArIGExKSAvIDIsIHZhMV07XG4gICAgICAgICAgICByZXR1cm4gaGVscGVycy5wYXRoUG9seWdvbkFubnVsdXMocjAsIHIxLCBhMCwgYTEsIHZhQmFyLCBjeHgsIGN5eSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHIwLCByMSwgYTAsIGExKSB7XG4gICAgICAgIHJldHVybiBMaWIucGF0aEFubnVsdXMocjAsIHIxLCBhMCwgYTEsIGN4eCwgY3l5KTtcbiAgICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==